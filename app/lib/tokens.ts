// Toothly design tokens. Source of truth for colors, spacing, radius, type.
// Mirrors the Open Design extraction in C:\Users\david\workspace\open-design-extraction.

import { Platform, type ViewStyle } from "react-native";

export const colors = {
  // Core Open Design palette
  paper: "#EFE7D2",
  paperWarm: "#ECE4CF",
  paperDark: "#DDD2B6",
  bone: "#F7F1DE",
  inkBase: "#15140F",
  inkSoft: "#2A2620",
  inkMute: "#5A5448",
  inkFaint: "#8B8676",
  white: "#FFFFFF",

  // Accents from the extracted site variables
  coral: "#ED6F5C",
  coralDeep: "#E4614D",
  coralSoft: "#F08E7C",
  coralWash: "#F7CFC6",
  mustard: "#E9B94A",
  mustardWash: "#F0DCAA",
  olive: "#6E7448",
  oliveWash: "#D9D9BC",

  // Warm ink ramp for app surfaces
  ink: {
    0: "#FFFFFF",
    50: "#F7F1DE",
    100: "#EFE7D2",
    200: "#DDD2B6",
    300: "#B9B098",
    400: "#8B8676",
    500: "#5A5448",
    600: "#3F392F",
    700: "#2A2620",
    800: "#1E1B16",
    900: "#15140F",
  },

  line: "rgba(21, 20, 15, 0.16)",
  lineSoft: "rgba(21, 20, 15, 0.08)",
  lineFaint: "rgba(21, 20, 15, 0.05)",

  // Semantic
  success: "#6E7448",
  warning: "#E9B94A",
  danger: "#B94734",
  info: "#5A5448",

  // Backward-compatible aliases while the app migrates off the v1 palette.
  sand: "#EFE7D2",
  petrol: "#15140F",
  petrolDeep: "#0F0E0A",
  petrolSoft: "#2A2620",
  blush: "#F7CFC6",
  sage: "#D9D9BC",
  sky: "#DDD2B6",
  sunshine: "#F0DCAA",
  clay: "#ECE4CF",
  mint: "#6E7448",
  amber: "#E9B94A",
  plum: "#5A5448",
} as const;

// Domain color assignments stay app-specific, but use the extracted palette.
export const domainColors = {
  toothMovement: { surface: "#F7CFC6", accent: "#ED6F5C" },
  appliances: { surface: "#D9D9BC", accent: "#6E7448" },
  infectionCtrl: { surface: "#ECE4CF", accent: "#5A5448" },
  cephalometrics: { surface: "#F0DCAA", accent: "#E9B94A" },
  patientCare: { surface: "#F7F1DE", accent: "#2A2620" },
  diagnostics: { surface: "#DDD2B6", accent: "#15140F" },
} as const;

export const space = {
  0: 0,
  1: 2,
  2: 8,
  3: 12,
  4: 18,
  5: 22,
  6: 28,
  8: 36,
  10: 44,
  12: 56,
  16: 70,
  20: 90,
} as const;

export const radius = {
  none: 0,
  xs: 2,
  sm: 6,
  md: 12,
  lg: 18,
  xl: 32,
  full: 999,
} as const;

function platformShadow(nativeShadow: ViewStyle, webShadow: string): ViewStyle {
  if (Platform.OS === "web") {
    return { boxShadow: webShadow } as unknown as ViewStyle;
  }

  return nativeShadow;
}

export const shadows = {
  card: platformShadow({
    shadowColor: colors.inkBase,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.18,
    shadowRadius: 60,
    elevation: 8,
  }, "0 30px 60px -30px rgba(21, 20, 15, 0.18)"),
  soft: platformShadow({
    shadowColor: colors.inkBase,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 36,
    elevation: 4,
  }, "0 12px 36px rgba(26, 26, 26, 0.08)"),
  coral: platformShadow({
    shadowColor: colors.coral,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 26,
    elevation: 5,
  }, "0 14px 26px -16px rgb(237, 111, 92)"),
} as const;
