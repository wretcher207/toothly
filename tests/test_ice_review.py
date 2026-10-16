"""Exercise the review commands with temporary question banks and feedback."""
import csv
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REVIEW = ROOT / "scripts" / "ice_review.py"
VERIFY = ROOT / "scripts" / "verify_questions.py"


class ReviewCommandsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in ("content/ice", "content/review", "reference/sources"):
            (self.root / name).mkdir(parents=True)
        self.questions = [{
            "id": f"{domain}-001", "exam": "ICE", "domain": domain,
            "subtopic": "Test fixture", "stem": "Which entry matches the reference?",
            "choices": ["Alpha", "Beta", "Gamma", "Delta"], "correct_index": 0,
            "explanation": "The reference identifies alpha.", "source_doc": "fixture",
            "source_citation": "Test reference, first sentence",
            "source_quote": "The reference identifies alpha.",
            "difficulty": 1, "status": "draft", "reviewer": None, "flag_count": 0,
        } for domain in ("ICE-I", "ICE-II")]
        self.bank = self.root / "content/ice/questions.json"
        self.write_bank()
        self.source = self.root / "reference/sources/fixture.txt"
        self.source.write_text("The reference identifies alpha.\n", encoding="utf-8")
        self.priority = self.root / "content/review/ice-priorities.json"
        self.priority.write_text(json.dumps({"ICE-II-001": "Check the distractors."}), encoding="utf-8")
        self.packet = self.root / "packet"

    def write_bank(self):
        self.bank.write_text(json.dumps(self.questions), encoding="utf-8")

    def run_review(self, *args, ok=True):
        result = subprocess.run(
            [sys.executable, "-B", str(REVIEW), "--root", str(self.root), *map(str, args)],
            capture_output=True, text=True, timeout=15,
        )
        self.assertEqual(result.returncode, 0 if ok else 1, result.stdout + result.stderr)
        self.assertNotIn("Traceback", result.stderr)
        return result.stdout + result.stderr

    def export(self):
        self.run_review("export", "--out", self.packet)

    def read_feedback(self):
        with (self.packet / "feedback.csv").open(encoding="utf-8-sig", newline="") as handle:
            reader = csv.DictReader(handle)
            self.fields = reader.fieldnames
            return list(reader)

    def write_feedback(self, rows):
        with (self.packet / "feedback.csv").open("w", encoding="utf-8-sig", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=self.fields)
            writer.writeheader()
            writer.writerows(rows)

    def check(self, *args, ok=True):
        return self.run_review("check", self.packet / "feedback.csv", *args, ok=ok)

    def decide(self, row, verdict="approve"):
        row.update(verdict=verdict, reviewer="Fixture Reviewer", reviewed_on="2026-01-01",
                   source_current="yes", one_best_answer="yes", explanation_supported="yes")

    def test_export_preserves_content_and_prioritizes_known_concerns(self):
        before = self.bank.read_bytes()
        self.export()
        rows = self.read_feedback()
        self.assertEqual([row["question_id"] for row in rows], ["ICE-II-001", "ICE-I-001"])
        self.assertTrue(all(row["verdict"] == "pending" and not row["reviewer"] for row in rows))
        packet = (self.packet / "questions.md").read_text(encoding="utf-8")
        for expected in ("A. Alpha", "B. Beta", "Draft answer: A", "Check the distractors.",
                         "Test reference, first sentence", "> The reference identifies alpha."):
            self.assertIn(expected, packet)
        self.assertEqual((self.packet / "sources/fixture.txt").read_bytes(), self.source.read_bytes())
        manifest = json.loads((self.packet / "manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["status_counts"], {"draft": 2})
        self.assertEqual(self.bank.read_bytes(), before)

    def test_pending_feedback_is_valid_but_incomplete(self):
        self.export()
        self.assertIn("pending=2", self.check())
        self.assertIn("2 questions still pending", self.check("--require-complete", ok=False))

    def test_complete_feedback_validates_without_changing_bank(self):
        self.export()
        before = self.bank.read_bytes()
        rows = self.read_feedback()
        self.decide(rows[0])
        self.decide(rows[1], "revise")
        rows[1]["notes"] = 'Clarify the wording, including "alpha".\nSecond line.'
        self.write_feedback(rows)
        self.assertIn("approve=1, revise=1", self.check("--require-complete"))
        self.assertEqual(self.bank.read_bytes(), before)

    def test_decisions_need_reviewer_date_and_checks(self):
        self.export()
        rows = self.read_feedback()
        rows[0]["verdict"] = "approve"
        self.write_feedback(rows)
        output = self.check(ok=False)
        for expected in ("named reviewer", "valid YYYY-MM-DD", "all three checks"):
            self.assertIn(expected, output)

    def test_future_and_non_iso_dates_are_rejected(self):
        self.export()
        rows = self.read_feedback()
        self.decide(rows[0])
        for value in ("9999-12-31", "20260101", "2026-02-30"):
            with self.subTest(value=value):
                rows[0]["reviewed_on"] = value
                self.write_feedback(rows)
                self.assertIn("valid YYYY-MM-DD", self.check(ok=False))

    def test_revision_and_retirement_need_notes(self):
        self.export()
        rows = self.read_feedback()
        for verdict in ("revise", "retire"):
            with self.subTest(verdict=verdict):
                self.decide(rows[0], verdict)
                self.write_feedback(rows)
                self.assertIn(f"{verdict} needs notes", self.check(ok=False))

    def test_unknown_verdict_and_check_values_are_rejected(self):
        self.export()
        rows = self.read_feedback()
        rows[0]["verdict"] = "approved"
        rows[1]["source_current"] = "maybe"
        self.write_feedback(rows)
        output = self.check(ok=False)
        self.assertIn("verdict must be", output)
        self.assertIn("must be yes, no, or blank", output)

    def test_question_edit_invalidates_feedback(self):
        self.export()
        self.questions[0]["choices"][1] = "Changed distractor"
        self.write_bank()
        self.assertIn("stale question or source", self.check(ok=False))

    def test_source_edit_invalidates_feedback(self):
        self.export()
        self.source.write_text("The reference identifies alpha. New context.\n", encoding="utf-8")
        self.assertIn("stale question or source", self.check(ok=False))

    def test_duplicate_missing_and_unknown_rows_are_rejected(self):
        self.export()
        rows = self.read_feedback()
        for bad_rows, message in (([rows[0], rows[0]], "duplicate question ID"),
                                  ([rows[0]], "missing question rows"),
                                  ([dict(rows[0], question_id="OTHER"), rows[1]], "unknown question ID")):
            with self.subTest(message=message):
                self.write_feedback(bad_rows)
                self.assertIn(message, self.check(ok=False))

    def test_csv_header_and_row_shape_errors_are_reported(self):
        self.export()
        worksheet = self.packet / "feedback.csv"
        original = worksheet.read_text(encoding="utf-8-sig")
        worksheet.write_text("wrong,header\nx,y\n", encoding="utf-8")
        self.assertIn("feedback columns", self.check(ok=False))
        worksheet.write_text(original + "ICE-I-001\n", encoding="utf-8")
        self.assertIn("wrong number of CSV cells", self.check(ok=False))
        worksheet.write_text(original + '\"unfinished quoted cell', encoding="utf-8")
        self.assertIn("unexpected end of data", self.check(ok=False))

    def test_export_refuses_to_overwrite_existing_feedback(self):
        self.export()
        worksheet = self.packet / "feedback.csv"
        worksheet.write_text("Reviewer work in progress", encoding="utf-8")
        self.run_review("export", "--out", self.packet, ok=False)
        self.assertEqual(worksheet.read_text(encoding="utf-8"), "Reviewer work in progress")

    def test_unknown_priority_fails_before_creating_packet(self):
        self.priority.write_text('{"ICE-IV-999": "Check this"}', encoding="utf-8")
        self.assertIn("review priorities", self.run_review("export", "--out", self.packet, ok=False))
        self.assertFalse(self.packet.exists())

    def test_invalid_bank_cannot_be_exported(self):
        for field, value in (("status", "approved"), ("source_quote", ""),
                             ("source_citation", " "), ("correct_index", True),
                             ("choices", ["Alpha", None, "Gamma", "Delta"]),
                             ("flag_count", -1), ("source_quote", "Missing quotation")):
            with self.subTest(field=field, value=value):
                original = self.questions[0][field]
                self.questions[0][field] = value
                self.write_bank()
                self.run_review("export", "--out", self.packet, ok=False)
                self.assertFalse(self.packet.exists())
                self.questions[0][field] = original

    def test_reviewed_status_requires_reviewer(self):
        self.questions[0]["status"] = "reviewed"
        self.write_bank()
        self.assertIn("named reviewer", self.run_review("export", "--out", self.packet, ok=False))

    def test_missing_nullable_reviewer_field_is_invalid(self):
        del self.questions[0]["reviewer"]
        self.write_bank()
        self.assertIn("missing or wrong type: reviewer", self.run_review("export", "--out", self.packet, ok=False))

    def test_empty_and_malformed_banks_fail_without_traceback(self):
        for text in ("[]", "{}", "[false]", "{bad json"):
            with self.subTest(text=text):
                self.bank.write_text(text, encoding="utf-8")
                self.run_review("export", "--out", self.packet, ok=False)

    def test_verifier_expands_quoted_globs_and_rejects_missing_files(self):
        # The real bank supplies the verifier's default source directory.
        for pattern, code in ((str(ROOT / "content/ice/*.json"), 0),
                              (str(self.root / "missing/*.json"), 1)):
            with self.subTest(pattern=pattern):
                result = subprocess.run([sys.executable, "-B", str(VERIFY), pattern],
                                        capture_output=True, text=True, timeout=15)
                self.assertEqual(result.returncode, code, result.stdout + result.stderr)
                self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
