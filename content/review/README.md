# ICE review workflow

The next release step is a human review of the 70 ICE drafts. David needs to choose
reviewers and authorize outreach. The existing plan calls for 3-5 working CDAs or
dental-assisting instructors in exchange for lifetime access. No one has signed off
on these questions. Keep them in draft until a qualified reviewer checks them and
David resolves the feedback.

## Prepare a packet

Double-click `scripts/prepare-ice-review.bat`, or run from the repository root:

```powershell
python -B scripts/ice_review.py export --out .review/ice-first-pass
```

Use a new output directory for each export. The command refuses to overwrite an
existing directory so it cannot erase a reviewer's work.

The packet contains `questions.md`, `feedback.csv`, a fingerprint manifest, and
the four source text copies. Each question includes its choices in source order,
draft answer, explanation, citation, and quoted passage. The nine concerns from
the September 14 handoff appear first; `ice-priorities.json` stores those notes.

Keep generated packets and returned worksheets under `.review/`, which Git ignores.
The worksheet starts with 70 pending rows. Use a separate copy for each reviewer.
Distributing packets or recruiting reviewers requires David's scoped approval.
Reviewer criteria and outreach drafts: `outreach.md`.

## Record feedback

Keep the question IDs, fingerprints, and rows. Reviewers can leave unfinished rows
as `pending` and enter `approve`, `revise`, or `retire` for completed decisions.
Each decision needs a reviewer name and date in `YYYY-MM-DD` format. An approval
needs `yes` in all three check columns:

- `source_current`: the reviewer checked current authoritative guidance.
- `one_best_answer`: the key fits the stem and the distractors leave one best answer.
- `explanation_supported`: the citation supports the explanation.

Use `notes` for source links, corrections, and priority concerns. A revision or
retirement needs an explanation in that column. Source quotes establish provenance;
the reviewer still needs to check guidance published after the saved source copies.

```powershell
python -B scripts/ice_review.py check .review/ice-first-pass/feedback.csv
python -B scripts/ice_review.py check .review/ice-first-pass/feedback.csv --require-complete
```

The first command permits pending rows. The second requires a decision on each
question. Both reject missing or duplicate rows, malformed decisions, and feedback
whose question or source text has changed since export. After edits, export a new
packet and have reviewers check the affected items again. Preserve their old files.

The checks establish format and version consistency. They do not verify reviewer
identity or qualifications, settle disagreements, change question status, or approve
a release. David must confirm the reviewers and resolve their feedback before any
status changes. The app still loads draft questions for development; this tool does
not add a release filter to the app.

## Local checks

```powershell
python -B scripts/verify_questions.py "content/ice/*.json"
python -B -m unittest discover -s tests -v
```

The verifier checks required fields, choices, review metadata, and quotes against
the saved source text. Neither command assesses clinical correctness. The workflow
uses Python's standard library and makes no network requests.
