// Pure, browser-safe data model — powers the CLI and the web playground.

export type PACategory =
  | "fake-polite" // "friendly reminder", "with all due respect"
  | "blame-shift" // "per my last email", "as I mentioned"
  | "nudge" // "just following up", "circling back"
  | "condescend" // "to be clear", "as you may already know"
  | "veiled-threat" // "please advise", "going forward"
  | "cya" // "looping in your manager", "for the record"
  | "fake-deadline" // "at your earliest convenience", "no rush, but"
  | "dismissive"; // "noted", "it is what it is"

export interface Finding {
  category: PACategory;
  /** The matched phrase. */
  match: string;
  start: number;
  end: number;
  weight: number;
  /** What they really mean. */
  decode: string;
}

export type Band = "sincere" | "mild" | "spicy" | "venom";

export interface Verdict {
  /** 0–100; higher = more passive-aggressive. */
  score: number;
  band: Band;
  label: string;
}

export interface Report {
  chars: number;
  words: number;
  findings: Finding[];
  byCategory: Record<PACategory, number>;
  topFlags: { match: string; count: number; category: PACategory; decode: string }[];
  verdict: Verdict;
}

export interface Config {
  ignore: PACategory[];
}

export const CATEGORY_LABELS: Record<PACategory, string> = {
  "fake-polite": "Fake-polite",
  "blame-shift": "Blame-shift",
  nudge: "The nudge",
  condescend: "Condescension",
  "veiled-threat": "Veiled threat",
  cya: "Cover-your-ass",
  "fake-deadline": "Fake “no rush”",
  dismissive: "Dismissive",
};
