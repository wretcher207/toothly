# Toothly

DANB CDA exam prep + dental-assistant career companion. Native iOS + Android.

**One-liner:** The prep app that becomes your chairside reference.

## What it is

A native mobile app for dental assistants, starting with ICE study:

- **Phase 1 (prep):** cited questions, domain-tagged quizzes, and saved study sessions. Spaced repetition with FSRS, timed mocks, and a readiness score remain planned.
- **Phase 2 (career, planned):** instrument lookup, procedure checklists, English + Spanish patient scripts, case journal, and a CDE tracker.

## Stack

| Layer | Pick |
|---|---|
| App | Expo SDK 54 + React Native 0.81 + TypeScript |
| Routing | Expo Router |
| Styling | NativeWind v4 + Tailwind 3 |
| Type | Inter via @expo-google-fonts |
| Charts/Icons | react-native-svg, Expo Symbols |
| Backend | Supabase (anonymous study-session saves and waitlist) |
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

The waitlist runs on Netlify at https://toothly.deadpixeldesign.com/. The app has a
study flow with cited explanations and anonymous session saves. The 70 ICE seed
questions remain drafts awaiting clinical review. Local review tooling prepares
packets and checks feedback; see [the review workflow](content/review/README.md).

The next release step is reviewer selection and content review. Progress display,
FSRS, real-account linking, and subscriptions remain pending. Toothly has no
affiliation with DANB.

See `HANDOFF.md` for the live picture of what's done and what's next.

## Brand

- **Petrol** `#0E2A30` — deep teal, primary brand
- **Sand** `#F4E8D5` — warm cream background
- **Coral** `#E8744F` — primary accent
- **Mint** `#7CC2A7` — secondary accent
- **Tinted surfaces** — blush, sage, sky, sunshine, clay for color-zoned content

## License

Private. Dead Pixel Design.
