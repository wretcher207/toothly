"""Check drafted question files against the schema and their cited sources.

Usage: python scripts/verify_questions.py content/ice/*.json

Every question must carry a source_quote that appears word for word (ignoring
whitespace, case, and quote/dash styling) in the plain-text copy of its
source_doc under reference/sources/.
"""
import collections
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCES = {p.stem: p for p in (ROOT / "reference" / "sources").glob("*.txt")}
DOMAINS = {"ICE-I", "ICE-II", "ICE-III", "ICE-IV"}
REQUIRED = {
    "id": str, "exam": str, "domain": str, "subtopic": str, "stem": str,
    "choices": list, "correct_index": int, "explanation": str,
    "source_doc": str, "source_citation": str, "source_quote": str,
    "difficulty": int, "status": str, "reviewer": (str, type(None)),
    "flag_count": int,
}


def norm(s):
    s = s.lower()
    s = re.sub(r"[‘’“”\"']", "", s)
    s = re.sub(r"[‐-―\-]", "-", s)
    s = re.sub(r"-\s+", "-", s)
    return re.sub(r"\s+", " ", s).strip()


def main(paths):
    texts = {k: norm(v.read_text(encoding="utf-8")) for k, v in SOURCES.items()}
    errors, seen = [], set()
    answers = collections.Counter()
    difficulty = collections.Counter()
    per_domain = collections.Counter()
    total = 0
    for path in paths:
        for q in json.loads(Path(path).read_text(encoding="utf-8")):
            total += 1
            qid = q.get("id", f"{path}#{total}")
            def err(msg):
                errors.append(f"{qid}: {msg}")
            for key, typ in REQUIRED.items():
                if not isinstance(q.get(key), typ):
                    err(f"missing or wrong type: {key}")
            if errors and errors[-1].startswith(f"{qid}: missing"):
                continue
            if qid in seen:
                err("duplicate id")
            seen.add(qid)
            if q["exam"] != "ICE" or q["domain"] not in DOMAINS:
                err("bad exam/domain")
            if len(q["choices"]) != 4 or len(set(map(norm, q["choices"]))) != 4:
                err("need 4 distinct choices")
            if not 0 <= q["correct_index"] <= 3:
                err("correct_index out of range")
            if q["difficulty"] not in (1, 2, 3):
                err("difficulty must be 1-3")
            if q["source_doc"] not in texts:
                err(f"unknown source_doc {q['source_doc']}")
            elif norm(q["source_quote"]) not in texts[q["source_doc"]]:
                err("source_quote not found in source text")
            blob = " ".join([q["stem"], q["explanation"], *q["choices"]])
            if "—" in blob or "–" in blob:
                err("em or en dash in learner-facing text")
            if re.search(r"(all|none) of the above", blob, re.I):
                err("all/none of the above")
            answers[q["correct_index"]] += 1
            difficulty[q["difficulty"]] += 1
            per_domain[q["domain"]] += 1
    print(f"{total} questions | by domain {dict(sorted(per_domain.items()))}")
    print(f"answer positions {dict(sorted(answers.items()))} | difficulty {dict(sorted(difficulty.items()))}")
    for e in errors:
        print("FAIL", e)
    print("OK" if not errors else f"{len(errors)} problem(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
