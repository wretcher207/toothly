> status: active, waitlist LIVE, 70 ICE seed questions drafted, study session flow working | one-liner: DANB CDA exam prep app; waitlist at toothly.deadpixeldesign.com | next: recruit reviewers for the ICE drafts; persist results and flags (Supabase + FSRS). No auth, no paywall yet.


## 2026-09-14: study session flow

- Route `app/app/study/session.tsx`, opened by the dashboard's Spaced review **Start**
  button. Optional params `?domain=ICE-II&count=10`.
- One question at a time: pick a choice, **Check answer**, then a result card with the
  explanation, citation, expandable source quote and a **Flag this question** toggle.
  Summary at the end shows score by domain, retry-missed, and a new set.
- Choices are shuffled per session and the key remapped (`lib/questions.ts`), so answer
  position can't be memorized. Explanations never refer to letters.
- Questions load straight from `../content/ice/*.json`; `metro.config.js` adds
  `../content` to `watchFolders` for that.
- Nothing persists yet: results and flags live in component state only.
- Dashboard (`app/app/(tabs)/index.tsx`) now shows only real data: today's date, the
  ICE exam format (75q / 60 min), a mixed 10-question set, the biggest domain, and the
  four ICE domains with DANB weights and bank counts. Each domain row opens a
  domain-only session. No progress, streak or readiness numbers until results persist.
  `domainColors` in `lib/tokens.ts` is keyed by ICE domain; weights live in `lib/questions.ts`.
- Verified in Expo web at 375px: full 10-question run, wrong-answer reveal, quote
  toggle, flag, summary counts, retry-missed (9 of 9). `tsc` and `expo lint` clean.
- Web preview: `.claude/launch.json` entry `toothly-app-web` (port 8081), or
  `scripts/dev-web.bat`.

## 2026-09-14: ICE seed bank drafted, CLAUDE.md re-aimed

- `CLAUDE.md` and `AGENTS.md` now describe the CDA target, ICE-first plan, and
  no-SME review model (identical files).
- **70 ICE questions** in `content/ice/ICE-I..IV.json` (14/24/18/14, matching the
  seed allocation), all `status: draft`. Difficulty 20/30/20, answer keys evenly spread.
- Every question has `source_doc` + `source_quote`, an exact span from the plain-text
  copies of CDC 2003, CDC 2016, OSHA 1910.1030 and 1910.1200 in `reference/sources/`.
  `python scripts/verify_questions.py content/ice/*.json` checks schema, quotes,
  dashes and all/none-of-the-above. Passes.
- cdc.gov blocks scripted downloads; the CDC copies came from the Wayback Machine.
- Items a reviewer should look at first: I-005, I-007, I-008, I-013 (2003-era
  guidance not restated in 2016); II-016, II-017 (sources lack trap-cleaning text,
  so they test saliva-ejector backflow); III-013, III-017 (key goes one inference
  past the quote); IV-010 (HazCom file too thin on first aid; label rule is
  changing by 2026-11-20 but the English-label point is not).
- Not a substitute for review: quotes prove the key is sourced, not that the
  distractors are unarguable or that 2003 guidance is still current.

## Waitlist landing, deployed 2026-08-31

- Live: https://toothly-landing.vercel.app (Vercel project `toothly-landing`,
  team wretcher207s-projects, prj_ppLFsF9YJXLtptbHK54Q5oMjpCHt). Static, no build.
- Signups insert into `public.toothly_waitlist` in the **take** Supabase project
  (skrtgeptxlnsfeawxzik) via the publishable key embedded in the page. RLS lets
  anon INSERT only; the key cannot read the list. Verified live end to end
  (row landed from the deployed page; smoke-test rows deleted).
- Duplicate email = 409, shown to the visitor as success.
- Read the list: `select email, created_at from toothly_waitlist` in the take
  project's SQL editor. Move the table to a Toothly-owned project before launch.
- Source of truth: `landing/index.html` + `landing/COPY.md`. Redeploy via the
  Vercel MCP deploy (files upload), not git integration.
- Canonical/OG URLs point at https://toothly.deadpixeldesign.com/ — the domain
  is NOT yet attached (DNS at GoDaddy). Until David adds it, the vercel.app URL
  serves with a mismatched canonical, which is fine pre-announcement.

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

## 2026-09-11: the subdomain is live, and the DNS target that matters

`toothly.deadpixeldesign.com` is verified serving the waitlist over HTTPS: HTTP 200, a
Let's Encrypt cert issued for exactly that hostname, page title "DANB CDA Exam Prep App |
Toothly". David had already added the domain in Vercel.

**The CNAME target is `cname.vercel-dns-0.com`, not `cname.vercel-dns.com`.** The older
value still resolves into Vercel and the site works either way, but Vercel shows a
"DNS Change Recommended" banner against it. The two other Vercel subdomains on this domain,
`healingwithhannah` and `windsofharmony`, carried the same stale target and were updated to
match on 2026-09-11. The four Netlify subdomains on deadpixeldesign.com point at
`*.netlify.app` and are unrelated.


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

## 2026-09-10: agent instruction audit

Updated the local agent guidance to use task-relevant references and the shared autonomy/voice-profile agreement. Product and taste requirements remain in the instructions. Verified the instruction diff and reference paths; application behavior was not part of this documentation audit. Full file-by-file record: `C:/Users/wretc/workspace/AGENTS-AUDIT-2026-09-10.md`.
