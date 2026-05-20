# Toothly

DANB COA exam prep + ortho-assistant career companion. Native iOS + Android.

**One-liner:** The prep app that becomes your chairside reference.

## What it is

A native mobile app for orthodontic assistants:

- **Phase 1 (prep):** spaced-repetition study, domain-tagged quizzes, and timed mock exams matching the DANB OA (140q / 105min) and bundled COA (215q / 165min) formats. Readiness score driven by FSRS.
- **Phase 2 (career):** instrument lookup, wire chart, bracket prescriptions, procedure checklists, English + Spanish patient scripts, case journal, CDE tracker for COA recertification.

## Stack

| Layer | Pick |
|---|---|
| App | Expo SDK 54 + React Native 0.81 + TypeScript |
| Routing | Expo Router |
| Styling | NativeWind v4 + Tailwind 3 |
| Type | Inter via @expo-google-fonts |
| Charts/Icons | react-native-svg, Expo Symbols |
| Backend | Supabase (planned) |
| Subscriptions | RevenueCat (planned) |
| Spaced repetition | FSRS |
| Analytics | PostHog |

## Repo layout

```
toothly/
├── CLAUDE.md           project context for Claude Code sessions
├── HANDOFF.md          session-to-session continuation notes
├── scripts/            double-click .bat files for dev
└── app/                Expo project
    ├── app/                Expo Router routes
    ├── components/ui/      design system components
    ├── lib/tokens.ts       design tokens source of truth
    └── tailwind.config.js  NativeWind theme
```

## Running it

Double-click one of the scripts in `scripts/`:

- `dev-web.bat` — Expo dev server with browser preview (fastest)
- `dev-tunnel.bat` — tunnel mode for Expo Go on a phone
- `dev.bat` — full Expo CLI menu
- `install.bat` — refresh dependencies
- `lint.bat` — run linter

## Status

Phase 0 / 3 in progress. Scaffold built, design system in code, dashboard + reference screens mocked with hardcoded data. No backend, auth, or real question bank yet.

See `HANDOFF.md` for the live picture of what's done and what's next.

## Brand

- **Petrol** `#0E2A30` — deep teal, primary brand
- **Sand** `#F4E8D5` — warm cream background
- **Coral** `#E8744F` — primary accent
- **Mint** `#7CC2A7` — secondary accent
- **Tinted surfaces** — blush, sage, sky, sunshine, clay for color-zoned content

## License

Private. Dead Pixel Design.
