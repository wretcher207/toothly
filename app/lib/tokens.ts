// Toothly design tokens. Source of truth for colors, spacing, radius, type.
// NativeWind theme in tailwind.config.js mirrors these.

export const colors = {
  // Brand
  petrol: "#0E2A30",        // primary, deep teal — used for type and hero blocks
  petrolDeep: "#072024",    // darker petrol
  petrolSoft: "#1F4750",    // softer petrol for accents on light bg

  // Surfaces — warm, lived-in
  sand: "#F4E8D5",          // primary bg, warm cream (was hospital cream)
  bone: "#FBF5E9",          // elevated surface, lighter than sand
  paper: "#FFFFFF",         // pure white reserved for high-contrast spots

  // Tinted surfaces (used for stat cards, callouts, section heroes)
  blush: "#F8DCCC",         // warm coral-tinted surface
  sage: "#DCE9DC",          // muted mint-tinted surface
  sky: "#D8E2E8",           // dusty blue-tinted surface
  sunshine: "#F5DDA5",      // soft amber-tinted surface
  clay: "#E8C9B5",          // terracotta-tinted surface

  // Accents — moderate saturation, not Duolingo
  coral: "#E8744F",         // primary accent, slightly deeper than before
  coralDeep: "#C75A38",     // pressed/active coral
  mint: "#7CC2A7",          // secondary accent, deeper mint
  amber: "#D69B3C",         // warm warning/highlight accent
  plum: "#7A4A5C",          // rare accent for specific moments

  // Ink (warm-shifted neutrals, not pure gray)
  ink: {
    0: "#FFFFFF",
    50: "#FAF6EE",
    100: "#EFE7D6",
    200: "#DCD0BA",
    300: "#BCAE96",
    400: "#8E826A",
    500: "#6A5F4C",
    600: "#4A4135",
    700: "#312A22",
    800: "#1C1812",
    900: "#0E0C08",
  },

  // Semantic
  success: "#3A8A6A",
  warning: "#D69B3C",
  danger: "#B94734",
  info: "#4F7B95",
} as const;

// Domain color assignments — each major content area gets a consistent accent
export const domainColors = {
  toothMovement:  { surface: "#F8DCCC", accent: "#E8744F" },  // blush + coral
  appliances:     { surface: "#DCE9DC", accent: "#7CC2A7" },  // sage + mint
  infectionCtrl:  { surface: "#D8E2E8", accent: "#4F7B95" },  // sky + info
  cephalometrics: { surface: "#F5DDA5", accent: "#D69B3C" },  // sunshine + amber
  patientCare:    { surface: "#E8C9B5", accent: "#7A4A5C" },  // clay + plum
  diagnostics:    { surface: "#DCE9DC", accent: "#3A8A6A" },  // sage + success
} as const;

export const space = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80,
} as const;

export const radius = {
  none: 0, sm: 6, md: 12, lg: 16, xl: 24, "2xl": 32, full: 9999,
} as const;
