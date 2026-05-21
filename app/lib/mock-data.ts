import { domainColors } from "@/lib/tokens";

export const referenceSections = [
  {
    slug: "instruments",
    title: "Instruments",
    sub: "Bracket placement, ligation, banding, debonding",
    count: 48,
    surface: domainColors.toothMovement.surface,
    accent: domainColors.toothMovement.accent,
    items: [
      "Bracket positioning gauge",
      "Mathieu needle holder",
      "Distal end cutter",
      "Band pusher and bite stick",
    ],
  },
  {
    slug: "wires",
    title: "Wires",
    sub: "NiTi, stainless steel, TMA sizes and indications",
    count: 24,
    surface: domainColors.appliances.surface,
    accent: domainColors.appliances.accent,
    items: [
      ".014 NiTi initial alignment",
      ".018 stainless steel working wire",
      "TMA finishing bends",
      "Ligature tie sequence",
    ],
  },
  {
    slug: "brackets",
    title: "Brackets",
    sub: "MBT, Roth, Damon prescriptions and torque charts",
    count: 18,
    surface: domainColors.diagnostics.surface,
    accent: domainColors.diagnostics.accent,
    items: [
      "Upper central incisor torque",
      "Premolar bracket orientation",
      "Hook identification",
      "Bond failure checklist",
    ],
  },
  {
    slug: "procedures",
    title: "Procedures",
    sub: "Bonding, debonding, records, and emergency checks",
    count: 12,
    surface: domainColors.cephalometrics.surface,
    accent: domainColors.cephalometrics.accent,
    items: [
      "Direct bonding setup",
      "Archwire change",
      "Debond and polish",
      "Emergency poking wire visit",
    ],
  },
  {
    slug: "patient-scripts",
    title: "Patient scripts",
    sub: "Broken bracket, lost retainer, hygiene, EN / ES",
    count: 22,
    surface: domainColors.patientCare.surface,
    accent: domainColors.patientCare.accent,
    items: [
      "Broken bracket phone call",
      "Retainer wear reminder",
      "Elastics compliance",
      "Hygiene reset conversation",
    ],
  },
  {
    slug: "infection-control",
    title: "Infection control",
    sub: "PPE, sterilization, OSHA, CDC guidelines",
    count: 16,
    surface: domainColors.infectionCtrl.surface,
    accent: domainColors.infectionCtrl.accent,
    items: [
      "Instrument transport",
      "Autoclave cycle indicators",
      "Operatory turnover",
      "Exposure response basics",
    ],
  },
] as const;

export const sampleQuestion = {
  stem: "Which archwire is most commonly selected for initial alignment because it can flex and return toward its original shape?",
  domain: "Appliances",
  choices: [
    "Nickel titanium",
    "Stainless steel",
    "Beta titanium",
    "Elgiloy blue",
  ],
  correctIndex: 0,
  explanation:
    "Nickel titanium is commonly used early because its shape memory and elasticity help deliver light continuous force during initial alignment.",
};
