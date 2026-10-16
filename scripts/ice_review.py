"""Prepare an offline ICE review packet and check returned CSV feedback.

These commands never edit question content, review status, or remote services.
"""
import argparse
import collections
import csv
import hashlib
import json
import re
import sys
from datetime import date
from pathlib import Path

from verify_questions import DOMAINS, ROOT, load_bank

FIELDS = (
    "question_id", "content_sha256", "verdict", "reviewer", "reviewed_on",
    "source_current", "one_best_answer", "explanation_supported", "notes",
)
CHECKS = ("source_current", "one_best_answer", "explanation_supported")
VERDICTS = ("pending", "approve", "revise", "retire")


def digest(value):
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def question_hash(question, sources):
    # Include source text so feedback cannot silently outlive a source revision.
    return digest(json.dumps(
        {"question": question, "source_text": sources[question["source_doc"]]},
        sort_keys=True, ensure_ascii=False, separators=(",", ":"),
    ))


def read_current(root):
    return load_bank(
        [str(root / "content" / "ice" / "*.json")],
        root / "reference" / "sources",
    )


def export_packet(root, output):
    questions, sources = read_current(root)
    priority_path = root / "content" / "review" / "ice-priorities.json"
    priorities = json.loads(priority_path.read_text(encoding="utf-8")) if priority_path.exists() else {}
    ids = {question["id"] for question in questions}
    if not isinstance(priorities, dict) or any(
        key not in ids or not isinstance(note, str) or not note.strip()
        for key, note in priorities.items()
    ):
        raise ValueError("review priorities must map current question IDs to nonempty notes")
    questions.sort(key=lambda question: (
        question["id"] not in priorities, DOMAINS.index(question["domain"]), question["id"],
    ))
    hashes = {question["id"]: question_hash(question, sources) for question in questions}
    bank_hash = digest(json.dumps(hashes, sort_keys=True, separators=(",", ":")))
    lines = [
        "# Toothly ICE draft review", "",
        f"{len(questions)} questions. Start with the {len(priorities)} priority items below.", "",
        "Check current authoritative guidance, the answer key, each distractor, and the explanation.",
        "The source copies document the drafts. Check for newer guidance before approving an item.",
        "Record your feedback in feedback.csv. Keep question_id and content_sha256 unchanged.", "",
        "Use one worksheet per reviewer and keep all rows. Leave unfinished rows as pending.",
        "For a decision, enter your name and reviewed_on as YYYY-MM-DD.",
        "Use approve, revise, or retire in verdict. For approve, enter yes in source_current,",
        "one_best_answer, and explanation_supported. For revise or retire, explain the issue in notes.",
        "Use notes for source links, proposed corrections, and concerns about the priority items.", "",
        "David must confirm reviewer qualifications and resolve feedback before changing question status.",
        "The checker verifies file structure and versions. It does not grant clinical or release approval.", "",
        f"Bank fingerprint: `{bank_hash}`", "",
        "Priority concerns come from HANDOFF.md, 2026-09-14. They remain open for human review.", "",
    ]
    for question in questions:
        qid = question["id"]
        lines += [
            f"## {qid}", "",
            f"Domain: {question['domain']} | Difficulty: {question['difficulty']} | Status: {question['status']}",
            f"Subtopic: {question['subtopic']}", "",
        ]
        if qid in priorities:
            lines += [f"Priority concern: {priorities[qid]}", ""]
        lines += [question["stem"], ""]
        lines += [f"{letter}. {choice}" for letter, choice in zip("ABCD", question["choices"])]
        lines += [
            "", f"Draft answer: {'ABCD'[question['correct_index']]}", "",
            question["explanation"], "", f"Citation: {question['source_citation']}", "",
            f"[Source copy](sources/{question['source_doc']}.txt)", "",
            *[f"> {line}" for line in question["source_quote"].splitlines()], "",
            f"Content fingerprint: `{hashes[qid]}`", "",
        ]
    # A new directory protects an existing reviewer's worksheet from regeneration.
    output.mkdir(parents=True, exist_ok=False)
    (output / "questions.md").write_text("\n".join(lines), encoding="utf-8")
    with (output / "feedback.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows({
            "question_id": question["id"], "content_sha256": hashes[question["id"]],
            "verdict": "pending",
        } for question in questions)
    (output / "sources").mkdir()
    source_names = sorted({question["source_doc"] for question in questions})
    for name in source_names:
        (output / "sources" / f"{name}.txt").write_text(sources[name], encoding="utf-8")
    manifest = {
        "schema_version": 1, "bank_sha256": bank_hash, "question_count": len(questions),
        "status_counts": dict(collections.Counter(question["status"] for question in questions)),
        "priority_ids": list(priorities), "question_hashes": hashes,
        "source_hashes": {name: digest(sources[name]) for name in source_names},
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Prepared {len(questions)} questions, {len(priorities)} priority items: {output}")


def check_feedback(root, path, require_complete=False):
    questions, sources = read_current(root)
    expected = {question["id"]: question_hash(question, sources) for question in questions}
    errors, seen, counts = [], set(), collections.Counter()
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle, strict=True)
        if reader.fieldnames is None or len(reader.fieldnames) != len(FIELDS) or set(reader.fieldnames) != set(FIELDS):
            raise ValueError("feedback columns must match the exported worksheet")
        for line, row in enumerate(reader, 2):
            if None in row or any(value is None for value in row.values()):
                errors.append(f"line {line}: wrong number of CSV cells")
                continue
            row = {key: value.strip() for key, value in row.items()}
            qid = row["question_id"]
            label = f"line {line} ({qid})"
            if qid not in expected:
                errors.append(f"{label}: unknown question ID")
                continue
            if qid in seen:
                errors.append(f"{label}: duplicate question ID")
            seen.add(qid)
            if row["content_sha256"] != expected[qid]:
                errors.append(f"{label}: stale question or source; export a fresh packet")
            verdict = row["verdict"]
            if verdict not in VERDICTS:
                errors.append(f"{label}: verdict must be pending, approve, revise, or retire")
                continue
            counts[verdict] += 1
            for field in CHECKS:
                if row[field] not in ("", "yes", "no"):
                    errors.append(f"{label}: {field} must be yes, no, or blank")
            if verdict == "pending":
                continue
            if not row["reviewer"]:
                errors.append(f"{label}: decision needs a named reviewer")
            try:
                if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", row["reviewed_on"]):
                    raise ValueError()
                if date.fromisoformat(row["reviewed_on"]) > date.today():
                    raise ValueError()
            except ValueError:
                errors.append(f"{label}: reviewed_on must be a valid YYYY-MM-DD date, today or earlier")
            if verdict == "approve" and any(row[field] != "yes" for field in CHECKS):
                errors.append(f"{label}: approval needs yes for all three checks")
            if verdict in ("revise", "retire") and not row["notes"]:
                errors.append(f"{label}: {verdict} needs notes")
    missing = sorted(set(expected) - seen)
    if missing:
        errors.append(f"missing question rows: {', '.join(missing)}")
    if require_complete and counts["pending"]:
        errors.append(f"{counts['pending']} questions still pending")
    if errors:
        raise ValueError("\n".join(errors))
    print("Feedback format and versions pass: " + ", ".join(f"{key}={counts[key]}" for key in VERDICTS))
    print("Question status is unchanged. David must confirm clinical signoff and release approval.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT, help="repository root (defaults to this checkout)")
    commands = parser.add_subparsers(dest="command", required=True)
    export = commands.add_parser("export", help="create a new review packet directory")
    export.add_argument("--out", type=Path, required=True)
    check = commands.add_parser("check", help="validate returned feedback without importing it")
    check.add_argument("feedback", type=Path)
    check.add_argument("--require-complete", action="store_true", help="fail if any rows remain pending")
    args = parser.parse_args()
    try:
        if args.command == "export":
            export_packet(args.root, args.out)
        else:
            check_feedback(args.root, args.feedback, args.require_complete)
    except (ValueError, OSError, csv.Error) as error:
        print(f"FAIL {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
