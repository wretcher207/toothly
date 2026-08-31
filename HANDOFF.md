> status: active again, scaffold only | one-liner: dental exam prep app, RE-AIMED AT CDA (2026-08-31): scaffold plus design system v1 mocked, no backend yet, content taxonomy now real | next: waitlist landing page to test demand, then draft ICE seed questions from the cited public sources in CONTENT_TAXONOMY.md. Dashboard data is all mock and there is no auth, paywall, question flow or content yet.

## Pivot decision, 2026-08-31 (David's call)

- **Target changed from COA to CDA.** DANB counted ~1,000 COA holders EVER
  (cumulative, late 2022) vs 30,000+ active CDAs. The COA choice existed because
  of the SME co-founder; David is no longer in contact with her, so the narrow
  cert lost its only advantage.
- **ICE ships first** as the wedge: no eligibility requirements, shared across
  NELDA/CDA/COA, and draftable from public CDC/OSHA documents with citations.
- **No paid content review.** Cite-everything drafting + review-for-lifetime-access
  recruits (instructors preferred) + a beta "flag this question" button. Details in
  CONTENT_TAXONOMY.md.
- `CONTENT_TAXONOMY.md` is now real: full GC/RHS/ICE domain trees, DANB weightings,
  600-question allocation, question schema, and drafting-source order, built from
  the official outlines in `reference/` (downloaded 2026-08-31 from danb.org).
- CLAUDE.md still describes the COA target and SME workflow; it needs the same
  re-aim before the next build session.

# Toothly — Session Handoff

**Last updated:** 2026-05-20
**Repo:** local git, two commits on `main`. Push to GitHub via `scripts/push-to-github.bat`.

## Where we are

Scaffold + design system v1 in place. Dashboard and Reference screens mocked with the redesigned warm palette. No backend yet.

## Decisions locked

- **Cert target:** DANB COA (OA + ICE), 215q / 165min bundled, $450 fee
- **Positioning:** lead with COA prep, expand into career companion for retention
- **Platforms:** native iOS + Android, single Expo codebase
- **Stack:** Expo SDK 54, RN 0.81, TypeScript, NativeWind v4, Tailwind 3, react-native-svg, Inter via @expo-google-fonts, Expo Router
- **Backend (planned):** Supabase + RevenueCat + FSRS + PostHog
- **Name:** Toothly
- **Bundle ID:** `com.deadpixel.toothly`
- **Brand palette v2 (after David's "warmer, more color" pass):**
  - Petrol `#0E2A30` (deepened from `#123339`)
  - Sand `#F4E8D5` background (was cool cream)
  - Coral `#E8744F` primary accent (deepened from `#F68A63`)
  - Mint `#7CC2A7`, amber `#D69B3C`, plum `#7A4A5C`
  - Tinted surfaces: bone, blush, sage, sky, sunshine, clay — used as the default Card system, not white-on-cream
- **Domain color coding:** every major content domain has a consistent surface+accent pair (`domainColors` in `lib/tokens.ts`)

## Repo state

- Local git initialized on `main`
- Two commits: initial scaffold + push script
- **Not yet on GitHub** — gh auth was expired. David runs `scripts/push-to-github.bat` to re-auth and push.

## What lives where

```
toothly/
├── CLAUDE.md           project context for future sessions
├── HANDOFF.md          this file
├── README.md           public-facing intro
├── .gitignore
├── scripts/
│   ├── dev.bat            full Expo menu
│   ├── dev-web.bat        web preview (fastest)
│   ├── dev-tunnel.bat     phone via Expo Go on any network
│   ├── install.bat        npm install
│   ├── lint.bat           npm run lint
│   └── push-to-github.bat one-time GH auth + repo create + push
└── app/                Expo project
    ├── app/                Expo Router routes (Study + Reference tabs)
    ├── components/ui/      Button, Card, StatCard, ReadinessRing
    ├── lib/tokens.ts       design tokens source of truth
    ├── tailwind.config.js  NativeWind theme mirroring tokens
    ├── babel.config.js     NativeWind v4 preset
    ├── metro.config.js     withNativeWind
    └── nativewind-env.d.ts
```

## How to run it

Double-click **`scripts/dev-web.bat`**. When the menu appears, press **`w`** for browser preview.

For phone preview: **`scripts/dev-tunnel.bat`**, install Expo Go, scan the QR.

## Push to GitHub

Double-click **`scripts/push-to-github.bat`**. It will:
1. Log into GitHub (browser opens for OAuth)
2. Create `toothly` as a private repo
3. Push `main`

If repo already exists it tries to set the remote and push instead.

## Decisions pending

- David to confirm v2 palette direction after viewing the redesigned dashboard
- Pricing model lock ($9.99/mo + $79/yr is the working assumption)
- Free tier scope
- First 200 seed questions (SME friend authors)
- Logo mark (currently wordmark only)
- SME friend's contact preference (Figma comments vs. another channel)

## Still hardcoded / fake

- Dashboard data (streak, accuracy, domain progress, etc.) is all mock
- No auth, no paywall, no real question flow
- No content yet (taxonomy + 200 seed questions are next)

## Next session should

1. Confirm the v2 brand direction is good or get the next round of redirects
2. Build the question-answer flow: `/study/session` route with one-question UI, answer reveal, explanation card, next button
3. Set up Supabase project + schema (questions, domains, users, progress for FSRS, mock_exams, attempts)
4. Pull DANB OA + ICE exam outline PDFs to drive content taxonomy
5. Wire RevenueCat sandbox so paywall structure is in place

## Open tasks

See task system. #4 (design system) and #11 (Supabase) are next-up.

## Notes

- Expo template at scaffold time used SDK 54 + Reanimated 4 + NativeWind 4. Standard setup applied per the official docs.
- `app/AGENTS.md` (auto-generated by Expo) says "Expo HAS CHANGED. Read v54 docs before writing code." Honored.
- Inter font weights load but NativeWind's `font-semibold` etc apply CSS `fontWeight` only; if device rendering doesn't pick the right Inter file, add a Text wrapper that maps weight to font family name.
- `app/.git` from `create-expo-app` was removed so the repo is a single flat unit, not embedded.
