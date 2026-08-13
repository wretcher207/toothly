# Toothly

DANB COA exam prep + ortho-assistant career companion. Native iOS + Android (Expo RN).

**Pitch in one line:** the prep app that becomes your chairside reference.

## Who

- **David Russell (Dead Pixel Harmonix)** — builder/owner
- **SME co-founder (David's friend)** — domain expert, former ortho assistant. Reviews content, writes question bank, validates clinical accuracy. Will interact with the project via Figma comments.

## What it is

Two-phase product, single app:

- **Phase 1 (prep):** spaced-repetition study, domain-tagged quizzes, timed mock exams matching DANB OA format (140q/105min) and full COA (215q/165min). Readiness score.
- **Phase 2 (career):** instrument lookup, wire chart, bracket prescriptions (MBT/Roth/Damon), procedure checklists, English+Spanish patient scripts, case journal, CDE tracker for COA recert.

Same content, different surface. Career features retain subscribers past their exam date.

## Target cert

**DANB COA (Certified Orthodontic Assistant).** Two components:
- **OA exam:** 140 questions, 105 minutes
- **ICE exam:** Infection Control
- **Bundled COA:** 215q, 165min, $450 application fee

Eligibility: 4 pathways, most common is 3,500 hrs verified ortho-assistant experience + current CPR/BLS.

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

COA-specific prep is underserved. Most DANB prep apps target the more popular CDA (general cert). Adjacent ortho apps (OrthoKit, IvoSmile, ADA Chairside) are clinician-facing or patient-education, not assistant-facing. Real gap.

## Pricing (working assumption)

Freemium with $9.99/mo or $79/yr subscription. Free tier: ~50 questions, limited reference. Paid: full bank, unlimited mocks, all reference, case journal, CE tracker. RevenueCat handles Apple + Google compliance.

## Status

**Phase 0 — Discovery.** SME friend interviewing her network to validate pain points and pricing. Figma file pending (initial URL was a Figma Sites file by mistake, need a Design file).

## Key paths

```
PROJECT = C:\Users\wretc\workspace\toothly
FIGMA   = (pending Design-file URL)
```

## How David works

Windows-native (PowerShell), no WSL. Build scripts as .bat or .ps1 he can
double-click rather than terminal commands to retype.

## See also

- `HANDOFF.md` — current session state, pick up here
- `MARKET_RESEARCH.md` — to be filled after Phase 0 interviews
- `CONTENT_TAXONOMY.md` — to be filled after DANB exam outlines parsed

## Tasks

Tracked in task system. Use TaskList to see current state.
