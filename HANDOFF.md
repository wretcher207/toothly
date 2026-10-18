> status: active, **waitlist was down 2026-10-13 to 10-18 (Supabase paused it; David restored it 10-18); keep-alive written, awaiting OK to apply**, ICE review tools committed (`f506b9f`), 70 drafts await clinical review; lifetime-access offer confirmed, round-one reviewer emails sent to 8 programs 2026-10-16 | one-liner: DANB CDA exam prep app; waitlist at toothly.deadpixeldesign.com | next: restore the paused Supabase project and re-run Waitlist health; decide how to stop it pausing again; then watch for replies to the 8 reviewer emails (list in `.review/reviewer-shortlist.md`, local, ignored); follow up 2026-10-23 with the template in `content/review/outreach-email.md`; send a fresh packet to each yes after checking their credential; resolve their feedback before starter-deck release. Progress display and FSRS remain later app work.

## 2026-10-18: waitlist database paused again

- GitHub's Waitlist health check has failed every day since 2026-10-13
  (last pass 2026-10-12). The landing page still returns 200, but
  `ltamlswdkckutchlffkb.supabase.co` no longer resolves in DNS, so signups fail.
- The Supabase dashboard (David's Brave) shows: Project "toothly" is paused.
  Same free-tier inactivity pause as before the 2026-10-05 restore. The daily
  read-only `toothly_health` call evidently does not count as activity.
- David restored the project himself on 2026-10-18 and picked the free
  keep-alive over Supabase Pro.
- Written, not applied or committed yet:
  `supabase/migrations/20261018170000_toothly_keepalive.sql` (one-row table plus
  `toothly_keepalive()`, which updates it) and a call to it in
  `scripts/check_waitlist.py`, so the daily workflow writes instead of only reading.
- The saved Supabase PAT the 2026-10-05 entry mentions was not in Windows
  Credential Manager or env vars, so the SQL goes in through the dashboard SQL
  editor in David's Brave, with an insert into
  `supabase_migrations.schema_migrations` to keep history aligned.
- Order matters: apply the SQL, pass `check_waitlist.py` locally, then commit and
  push the script. Pushing the script first turns the workflow red.
- Untested hypothesis: that a daily write counts as activity when the read did
  not. Check around 2026-10-26: no pause means it works. If it pauses again,
  Supabase Pro is the remaining option.

## 2026-10-16: review tooling committed, reviewer outreach drafted

- The 2026-10-05 review tooling (`scripts/ice_review.py`, the `.bat`, tests,
  `content/review/`, verifier hardening, doc updates) landed on `main` in the
  workspace sweep's backup commit `f506b9f` and is on `origin/main`. Tree clean.
- Re-verified today: 18 tests pass; `verify_questions.py` passes all 70 ICE
  questions (all `draft`).
- `content/review/outreach-email.md` is the outreach: reviewer criteria, where to
  look (people David knows, CODA program director inboxes in Maine/New England,
  r/DentalAssistant and Facebook groups), program email, and a 7-day follow-up.
  It names no one; the named shortlist is `.review/reviewer-shortlist.md`
  (ignored). Two sessions drafted outreach in parallel; both were merged into this one and
  the duplicate `outreach.md` was removed.
- **Decided by David:** free lifetime access is the only offer (no pay, no
  credit). Round one is email to CODA program directors in Maine and New England,
  leading with the cited-source angle. Community posts and warm asks wait.
- `.review/reviewer-shortlist.md` lists all 13 CODA-accredited dental assisting
  programs in ME/NH/VT/MA/RI/CT from the CODA search, with director contacts as
  each school publishes them. Maine has one (UMA, Bangor/Lewiston). Tier 1 is 8
  programs with a published email; UMA and CT State contacts spot-checked live.
  It has a status table for logging sends and replies.
- Round one (David delegated the pick): all 8 Tier 1 programs. Sent 2026-10-16
  from david@deadpixeldesign.com with David's go-ahead, subject "70 infection
  control questions, every one cites its source"; all 8 confirmed in Zoho Sent.
  Drafts moved to Trash. No packets distributed, no access granted yet.
- Next: watch the Zoho inbox for replies. Follow up on 2026-10-23 with the
  template in `content/review/outreach-email.md` to anyone who hasn't answered,
  after David approves. Log replies in the shortlist's status table.
- `b741753` restored `outreach-email.md` after a parallel-session collision; pushed
  to `origin/main` 2026-10-16.

## 2026-10-05: ICE review preparation (committed 2026-10-16 in `f506b9f`)

- Verified the completed restoration at `9023160` (following `a75e001`).
  `python scripts/check_waitlist.py` passed against the live landing and database.
  GitHub run `37363383949` completed with success. The repository was clean on
  `main`, matching `origin/main`, with one registered worktree. No separate current
  phase plan exists; the top handoff and `CONTENT_TAXONOMY.md` specify ICE review next.
  The root README still described the old COA scaffold; this change corrects it.
- All 70 ICE questions remain `draft`, with no named reviewers. Session saving
  already exists in `app/lib/results.ts`; do not rebuild it as a new phase.
- Added `scripts/ice_review.py` and the double-click
  `scripts/prepare-ice-review.bat`. Export creates a new offline packet containing
  questions, source-order choices, draft keys, explanations, citations, source
  quotes, source copies, a CSV worksheet, and content fingerprints. The nine
  concerns from the September 14 handoff appear first. Their notes live in
  `content/review/ice-priorities.json`.
- Export refuses an existing output directory. Feedback checks reject duplicate,
  missing, or unknown rows, invalid decisions, unnamed reviewers, invalid dates,
  incomplete approval checks, and stale question or source text. Checking feedback
  never edits question status. `--require-complete` also rejects pending rows.
  These checks verify format and versions; a human must establish clinical accuracy
  and reviewer qualifications.
- Hardened `scripts/verify_questions.py`: quoted globs work in PowerShell, empty
  inputs fail, malformed records report errors, and status/reviewer metadata must
  match the documented schema. No clinical content or app design changed.
- Verification: 18 command-level tests pass with temporary banks and worksheets;
  all 70 real questions pass structure and source-quote checks. The real export
  contains 70 pending rows and nine priority items. Its format check passes and
  `--require-complete` fails with 70 pending, as intended.
- Local packet: `.review/ice-first-pass/`. Git ignores `.review/` so returned
  worksheets and reviewer names stay out of source control. Workflow and commands:
  `content/review/README.md`. Tests: `python -B -m unittest discover -s tests -v`.
- **Decision for David:** choose the working CDAs or dental-assisting instructors
  to approach, approve the outreach, and confirm whether to offer the lifetime
  access described in the existing plan. No outreach or access grants occurred.
  Human review remains open. The development app still serves draft questions;
  a learner release needs reviewed-content selection and release approval.
- Committed and pushed on 2026-10-16 in `f506b9f`. No deployment, remote database
  mutation, credential, account, or access change occurred in this phase.

The next app work after review is displaying saved progress and adding FSRS.
Keep real-account linking, paywalls, and career features outside this phase.

## 2026-10-05: waitlist restored and moved to Toothly's database

- Live: https://toothly.deadpixeldesign.com/. Netlify serves `landing/` with no build.
  Site `toothly-h5eh`, ID `743a1f73-2a4c-41b2-95b5-772751d89e45`.
  Fallback: https://toothly-h5eh.netlify.app/.
- The old Vercel landing returned HTTP 402. GoDaddy now points the `toothly`
  CNAME to `toothly-h5eh.netlify.app`; Netlify issued the HTTPS certificate.
  Other domain records remain unchanged. The Vercel project still exists but no
  longer serves the custom domain.
- Restored the paused Toothly Supabase project `ltamlswdkckutchlffkb`.
  Both study tables contained zero rows before and after the migration.
  The Supabase connector uses a different account and cannot access this project.
  Use the saved Supabase PAT in the machine's secret store with the Management API;
  never print it or commit it. The app's gitignored env file has the public key.
- Applied `supabase/migrations/20261005191421_toothly_waitlist.sql` through the
  Management API. Signups now go to Toothly's `public.toothly_waitlist`.
  Aligned its remote migration-history version with the CLI-created local filename.
  The older study-results migration predates recorded migration history. Do not run
  a blanket `db push` until its existing schema has been baselined in that history.
  The old Take table contained zero signups, so no subscriber migration was needed.
  Kept that old table intact.
- Public callers can insert the email column only. Database constraints require
  a normalized email and reject duplicates. RLS is enabled; public callers cannot
  read, update, or delete subscribers, or supply IDs and timestamps.
  Read signups through Toothly's SQL editor or Management API:
  `select email, created_at from public.toothly_waitlist order by created_at;`.
- The form disables its submit button while a request runs, permits retry after
  failure, and treats only a unique constraint conflict as an existing signup.
- Verified on the deployed page: a new signup returned 201 and persisted with a
  lowercase email; duplicates showed success; a simulated 503 showed the error
  message and allowed a successful retry. Checked desktop and 390px mobile output.
  Public GET/PATCH/DELETE and timestamp injection returned 401; invalid email
  returned 400. Removed the two exact QA rows; no subscriber rows remain.
  `/COPY.md` and `/vercel.json` return 404. Screenshots are under
  `.netlify/verification/` (local, ignored).
- `.github/workflows/waitlist-health.yml` checks the custom-domain page and the
  read-only `toothly_health` RPC daily at 13:23 UTC, on relevant pushes, and manually.
  It uses the public key from the page and creates no signup. It checks availability,
  not email delivery or a full signup. Inspect failed GitHub Actions runs; no custom
  notification channel has been configured. GitHub can disable schedules in public
  repositories after 60 days without repository activity.
- Deploy from the repository root:
  `netlify link --id 743a1f73-2a4c-41b2-95b5-772751d89e45`, then
  `netlify deploy --no-build --dir landing --prod --json`.
  This site uses manual deploys; a Git push alone does not update the landing page.
  Run `python scripts/check_waitlist.py` afterward.
- GitHub's first health run passed:
  https://github.com/wretcher207/toothly/actions/runs/37363383949.

Earlier deployment notes below describe historical state. This section supersedes
their Vercel hosting and Take waitlist instructions.

## 2026-09-14: session results saved to Supabase

- **Project:** `toothly` (ref `ltamlswdkckutchlffkb`, us-west-2) in the free **dpd207**
  org, which is David's second Supabase login. The other login's orgs can't create
  projects while Dead Pixel Design has overdue invoices. "Automatically expose new
  tables" is off and automatic RLS is on.
- **Schema:** `supabase/migrations/20260914000000_study_results.sql`, applied through the
  Management API. `study_sessions` has one row per finished set; `question_attempts`
  has one row per answer, with `selected_index` in source-file order, `correct`,
  `flagged` and `time_ms`. RLS lets a user insert and read only their own rows.
- **Identity:** anonymous sign-ins are enabled. `lib/supabase.ts` signs in anonymously
  on the first save, and the session persists in AsyncStorage. Link a real account
  later with `linkIdentity` / `updateUser` so history carries over.
- **App:** `lib/results.ts` saves when a set finishes. The summary shows "Results
  saved", or a tap-to-retry line if the save failed. With no env vars set, saving is
  skipped silently.
- **Keys:** `app/.env.local` (gitignored) holds `EXPO_PUBLIC_SUPABASE_URL` and the
  publishable key `EXPO_PUBLIC_SUPABASE_KEY`. `app/.env.example` documents both.
  Restart Expo after changing them.
- **Verified live:** a 10-question web run wrote 1 session and 10 attempts under an
  anonymous user. The saved choices matched the answer key, a second anonymous user
  read 0 rows, and a no-login read returned 401. Test rows and the second user
  were deleted.
- Free projects pause after a week with no activity.

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
