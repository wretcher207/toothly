# Toothly

DANB CDA exam prep + dental-assistant career companion. Native iOS + Android (Expo RN).

**Pitch in one line:** the prep app that becomes your chairside reference.

## Who

- **David Russell (Dead Pixel Harmonix)** — builder/owner. No co-founder or SME
  on the project (the original ortho-assistant SME is out of the picture as of
  2026-08-31).
- **Reviewers (planned, unpaid):** 3-5 working CDAs or dental-assisting
  instructors, paid in free lifetime access. See `CONTENT_TAXONOMY.md`.

## What it is

Two-phase product, single app:

- **Phase 1 (prep):** spaced-repetition study weighted to DANB's published
  domain percentages, domain-tagged quizzes, timed mock exams matching each CDA
  component (GC, RHS, ICE). Readiness score.
- **Phase 2 (career):** instrument lookup, procedure checklists, English+Spanish
  patient scripts, case journal, CDE tracker for CDA renewal.

Same content, different surface. Career features retain subscribers past their exam date.

## Target cert

**DANB CDA (Certified Dental Assistant).** Pivoted from COA on 2026-08-31:
~1,000 COA holders ever vs 30,000+ active CDAs.

| Component | Questions | Minutes | Eligibility |
|---|---|---|---|
| GC — General Chairside | 95 | 75 | CODA-accredited program or 3,500 verified hours |
| RHS — Radiation Health and Safety | 75 | 60 | None |
| ICE — Infection Control | 75 | 60 | None |
| Bundled CDA | 245 | 195 | $450 application fee |

**ICE ships first.** No eligibility requirements, shared by NELDA, CDA, and COA,
and draftable from public CDC/OSHA documents. It is also the free-tier funnel
(waitlist members were promised a free ICE starter deck). RHS second, GC last.

Official outlines live in `reference/`. Verify certification, eligibility, and
price claims against current DANB sources before putting them into the product.

## Content rules

- Every question carries a `source_citation` at draft time. No citation, no question.
- Questions are original. Never copy DANB practice items, DALE Foundation
  products, or textbook question banks.
- Describe compatibility ("prep for DANB's CDA exam"), never affiliation. DANB,
  CDA, RHS, ICE, and NELDA are DANB trademarks; include the non-affiliation
  disclaimer in the app and store listings.
- Schema, domain weights, and bank allocation: `CONTENT_TAXONOMY.md`.

## Tech stack (locked unless we find a reason to change)

| Layer | Pick |
|---|---|
| App | Expo + React Native + TypeScript |
| Styling | NativeWind |
| Backend | Supabase (Postgres, auth, storage) |
| IAP / subs | RevenueCat |
| Spaced rep algorithm | FSRS |
| Analytics | PostHog |
| Design | Figma (Design file, not Sites) |
| Code repo | GitHub, this folder |

## Competitive picture

CDA prep is a crowded market compared with COA, so the edge has to be the
product, not the niche: practice proportioned to DANB's published domain
weights, FSRS scheduling, cited explanations, and a reference that stays useful
after the exam.

## Pricing (working assumption)

Founding price of $79/yr is promised to waitlist members on the live landing
page. $9.99/mo is still the assumed monthly option. Free tier: ICE starter deck,
limited reference. Paid: all three banks, unlimited mocks, all reference, case
journal, CE tracker. RevenueCat handles Apple + Google compliance.

## Status

See `HANDOFF.md` and current files for development state.

## Key paths

```
PROJECT  = C:\Users\wretc\workspace\toothly
APP      = app\            Expo project
LANDING  = landing\        waitlist page, live at toothly.deadpixeldesign.com
CONTENT  = content\        drafted question bank
OUTLINES = reference\      DANB exam outline PDFs
FIGMA    = (pending Design-file URL)
```

## How David works

- Windows-native (PowerShell), no WSL needed for this project
- Build scripts as .bat or .ps1 he can double-click
- Terse responses, no trailing summaries
- Create a double-click script when David needs a reusable operation; run ordinary development commands directly.

## See also

- `HANDOFF.md` — current session state, pick up here
- `CONTENT_TAXONOMY.md` — domain trees, weights, question schema, drafting sources, review plan
- `landing/COPY.md` — waitlist copy and the promises it makes

## Tasks

Use the current handoff and repository task records. Public/UI writing must pass
the appropriate voice profile. Clinical content must cite its source and goes
through the reviewer and in-app flag process in `CONTENT_TAXONOMY.md`.
