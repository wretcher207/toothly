"""Check question structure and quoted source text, not clinical correctness.

Usage: python scripts/verify_questions.py "content/ice/*.json"
With no arguments, check the repository's ICE bank.
"""
import collections
import glob
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAINS = ("ICE-I", "ICE-II", "ICE-III", "ICE-IV")
STATUSES = {"draft", "reviewed", "flagged", "retired"}
REQUIRED = {
    "id": str, "exam": str, "domain": str, "subtopic": str, "stem": str,
    "choices": list, "correct_index": int, "explanation": str,
    "source_doc": str, "source_citation": str, "source_quote": str,
    "difficulty": int, "status": str, "reviewer": (str, type(None)),
    "flag_count": int,
}


def norm(text):
    text = re.sub(r"[\u2018\u2019\u201c\u201d\"']", "", text.lower())
    text = re.sub(r"[\u2010-\u2015\-]", "-", text)
    text = re.sub(r"-\s+", "-", text)
    return re.sub(r"\s+", " ", text).strip()


def load_bank(patterns=None, source_dir=None):
    """Return validated questions and source texts or raise ValueError/OSError."""
    if patterns is None:
        patterns = [str(ROOT / "content" / "ice" / "*.json")]
    paths = set()
    for pattern in patterns:
        matches = glob.glob(str(pattern))
        if not matches:
            raise ValueError(f"no question files match: {pattern}")
        paths.update(Path(match).resolve() for match in matches)
    if not paths:
        raise ValueError("no question files supplied")

    sources = {
        path.stem: path.read_text(encoding="utf-8")
        for path in Path(source_dir or ROOT / "reference" / "sources").glob("*.txt")
    }
    normalized_sources = {name: norm(text) for name, text in sources.items()}
    questions, errors, seen = [], [], set()
    for path in sorted(paths):
        try:
            rows = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise ValueError(f"{path.name}: invalid JSON: {error.msg}") from error
        if not isinstance(rows, list) or not rows:
            errors.append(f"{path.name}: expected a nonempty question array")
            continue
        for index, question in enumerate(rows, 1):
            label = f"{path.name}#{index}"
            if not isinstance(question, dict):
                errors.append(f"{label}: expected a question object")
                continue
            label = question.get("id", label)
            invalid = [
                key for key, expected in REQUIRED.items()
                if key not in question or not isinstance(question[key], expected)
                or (expected is int and type(question[key]) is not int)
            ]
            if invalid:
                errors.append(f"{label}: missing or wrong type: {', '.join(invalid)}")
                continue
            questions.append(question)

            def fail(message):
                errors.append(f"{label}: {message}")

            for key, expected in REQUIRED.items():
                if expected is str and not question[key].strip():
                    fail(f"empty {key}")
            if question["id"] in seen:
                fail("duplicate id")
            seen.add(question["id"])
            if question["exam"] != "ICE" or question["domain"] not in DOMAINS:
                fail("bad exam/domain")
            choices = question["choices"]
            valid_choices = len(choices) == 4 and all(
                isinstance(choice, str) and norm(choice) for choice in choices
            )
            if not valid_choices or len({norm(choice) for choice in choices}) != 4:
                fail("need 4 distinct nonempty text choices")
            if not 0 <= question["correct_index"] <= 3:
                fail("correct_index out of range")
            if question["difficulty"] not in (1, 2, 3):
                fail("difficulty must be 1-3")
            if question["flag_count"] < 0:
                fail("flag_count must be nonnegative")
            if question["status"] not in STATUSES:
                fail("bad status")
            if question["status"] == "reviewed" and not (question["reviewer"] or "").strip():
                fail("reviewed question needs a named reviewer")
            source = normalized_sources.get(question["source_doc"])
            quote = norm(question["source_quote"])
            if source is None:
                fail(f"unknown source_doc {question['source_doc']}")
            elif not quote or quote not in source:
                fail("source_quote not found in source text")
            if valid_choices:
                text = " ".join([question["stem"], question["explanation"], *choices])
                if "\u2014" in text or "\u2013" in text:
                    fail("em or en dash in learner-facing text")
                if re.search(r"(all|none) of the above", text, re.I):
                    fail("all/none of the above")
    if errors:
        raise ValueError("\n".join(errors))
    return questions, sources


def main(paths):
    try:
        questions, _ = load_bank(paths or None)
    except (ValueError, OSError) as error:
        print(f"FAIL {error}")
        return 1
    for field in ("domain", "correct_index", "difficulty", "status"):
        counts = collections.Counter(question[field] for question in questions)
        print(f"{field}: {dict(sorted(counts.items()))}")
    print(f"OK: {len(questions)} questions pass structure and source-quote checks.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
