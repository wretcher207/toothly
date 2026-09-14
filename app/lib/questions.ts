// Question bank loader. Reads the drafted JSON in ../content until Supabase exists.

import iceI from "../../content/ice/ICE-I.json";
import iceII from "../../content/ice/ICE-II.json";
import iceIII from "../../content/ice/ICE-III.json";
import iceIV from "../../content/ice/ICE-IV.json";

export type Domain = "ICE-I" | "ICE-II" | "ICE-III" | "ICE-IV";

export interface Question {
  id: string;
  exam: "ICE";
  domain: Domain;
  subtopic: string;
  stem: string;
  choices: string[];
  correct_index: number;
  explanation: string;
  source_doc: string;
  source_citation: string;
  source_quote: string;
  difficulty: 1 | 2 | 3;
  status: "draft" | "reviewed" | "flagged" | "retired";
}

/** A question as served in a session: choices shuffled, key remapped. */
export interface SessionQuestion extends Question {
  order: number[];
}

export const domainLabels: Record<Domain, string> = {
  "ICE-I": "Disease Transmission",
  "ICE-II": "Cross-contamination",
  "ICE-III": "Instrument Processing",
  "ICE-IV": "Safety and Administration",
};

/** Share of the real exam per domain, from DANB's ICE outline (effective 03/12/2025). */
export const domainWeights: Record<Domain, number> = {
  "ICE-I": 20,
  "ICE-II": 34,
  "ICE-III": 26,
  "ICE-IV": 20,
};

export const ICE_EXAM = { questions: 75, minutes: 60 };

export const allQuestions = [...iceI, ...iceII, ...iceIII, ...iceIV] as Question[];

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface SessionOptions {
  count?: number;
  domain?: Domain;
  ids?: string[];
}

export function buildSession({ count = 10, domain, ids }: SessionOptions = {}): SessionQuestion[] {
  let pool = allQuestions.filter((q) => q.status !== "retired");
  if (ids) pool = pool.filter((q) => ids.includes(q.id));
  else if (domain) pool = pool.filter((q) => q.domain === domain);

  return shuffle(pool)
    .slice(0, ids ? pool.length : count)
    .map((q) => {
      const order = shuffle(q.choices.map((_, i) => i));
      return {
        ...q,
        order,
        choices: order.map((i) => q.choices[i]),
        correct_index: order.indexOf(q.correct_index),
      };
    });
}

export function isDomain(value: unknown): value is Domain {
  return typeof value === "string" && value in domainLabels;
}

export const domains = Object.keys(domainLabels) as Domain[];

export function countByDomain(domain: Domain): number {
  return allQuestions.filter((q) => q.domain === domain && q.status !== "retired").length;
}
