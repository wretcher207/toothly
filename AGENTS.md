# Toothly

DANB CDA exam prep plus a dental-assistant career companion. Native iOS and Android (Expo React Native).

**Pitch in one line:** the prep app that becomes your chairside reference.

Current state and next steps: `HANDOFF.md` (status line and newest dated section at the top).

## Who

- **David Russell (Dead Pixel Harmonix):** builder and owner. No co-founder or subject-matter expert on the project (the original ortho-assistant SME is out of the picture as of 2026-08-31).
- **Reviewers (planned, unpaid):** 3-5 working CDAs or dental-assisting instructors, paid in free lifetime access. See `CONTENT_TAXONOMY.md`.

## What it is

Two-phase product, single app:

- **Phase 1 (prep):** spaced-repetition study weighted to DANB's published domain percentages, domain-tagged quizzes, timed mock exams matching each CDA component (GC, RHS, ICE). Readiness score.
- **Phase 2 (career):** instrument lookup, procedure checklists, English and Spanish patient scripts, case journal, CDE tracker for CDA renewal.

Same content, different surface. Career features retain subscribers past their exam date.

## Target cert

**DANB CDA (Certified Dental Assistant).** Pivoted from COA on 2026-08-31: about 1,000 COA holders ever vs 30,000+ active CDAs.

| Component | Questions | Minutes | Eligibility |
|---|---|---|---|
| GC: General Chairside | 95 | 75 | CODA-accredited program or 3,500 verified hours |
| RHS: Radiation Health and Safety | 75 | 60 | None |
| ICE: Infection Control | 75 | 60 | None |
| Bundled CDA | 245 | 195 | $450 application fee |

**ICE ships first.** No eligibility requirements, shared by NELDA, CDA and COA, and draftable from public CDC/OSHA documents. It is also the free-tier funnel (waitlist members were promised a free ICE starter deck). RHS second, GC last.

Official outlines live in `reference/`. Verify certification, eligibility and price claims against current DANB sources before putting them into the product.

## Content rules

- Every question carries a `source_citation` at draft time. No citation, no question.
- Questions are original. Never copy DANB practice items, DALE Foundation products or textbook question banks.
- Describe compatibility ("prep for DANB's CDA exam"), never affiliation. DANB, CDA, RHS, ICE and NELDA are DANB trademarks; include the non-affiliation disclaimer in the app and store listings.
- Clinical content goes through the reviewer and in-app flag process in `CONTENT_TAXONOMY.md`. Questions stay `draft` until a named, qualified reviewer approves them; scripts check format and source quotes, not clinical accuracy.
- Schema, domain weights and bank allocation: `CONTENT_TAXONOMY.md`. Review workflow and commands: `content/review/README.md`.

## Tech stack

| Layer | Pick |
|---|---|
| App | Expo SDK 54 + Expo Router + React Native + TypeScript (`app/`) |
| Styling | NativeWind |
| Backend | Supabase (Postgres, auth, storage), Toothly's own project |
| Waitlist landing | Static page in `landing/`, deployed by Netlify (`netlify.toml`) |
| IAP / subs (planned) | RevenueCat |
| Spaced repetition (planned) | FSRS |
| Analytics (planned) | PostHog |

`landing/vercel.json` and `scripts/*vercel*` are left over from the earlier Vercel hosting.

## Pricing (working assumption)

Founding price of $79/yr is promised to waitlist members on the live landing page. $9.99/mo is still the assumed monthly option. Free tier: ICE starter deck, limited reference. Paid: all three banks, unlimited mocks, all reference, case journal, CE tracker. RevenueCat handles Apple and Google compliance.

CDA prep is a crowded market compared with COA, so the edge has to be the product, not the niche: practice proportioned to DANB's published domain weights, FSRS scheduling, cited explanations, and a reference that stays useful after the exam.

## Key paths and checks

- `app/`: Expo project. `landing/`: waitlist page, live at toothly.deadpixeldesign.com (`landing/COPY.md` holds its copy and the promises it makes). `content/`: drafted question bank. `reference/`: DANB exam outline PDFs and sources. `scripts/`: Python tools and double-click `.bat` launchers.
- Question checks: `python scripts/verify_questions.py`. Waitlist health: `python scripts/check_waitlist.py`. Tests: `python -B -m unittest discover -s tests -v`.

## How David works here

- Windows-native (PowerShell); no WSL needed.
- When David needs a reusable operation, give him a `.bat` or `.ps1` he can double-click. Run ordinary development commands directly.
- Terse responses, no trailing summaries.
