import type { Band, Finding, Verdict } from "./types.js";

// Venom is the accumulated weight of passive-aggressive phrases, scaled and
// capped at 100. We deliberately do NOT normalize by length — "per my last
// email" is just as cutting in a one-liner as in a wall of text — so the score
// stays predictable and we can always show exactly which phrases produced it.
const K = 4.5;

const BANDS: { max: number; band: Band; label: string }[] = [
  { max: 20, band: "sincere", label: "Reads sincere" },
  { max: 45, band: "mild", label: "A little passive-aggressive" },
  { max: 70, band: "spicy", label: "Quite passive-aggressive" },
  { max: Infinity, band: "venom", label: "Weapons-grade passive-aggressive" },
];

export function scoreFindings(findings: Finding[], _words: number): Verdict {
  const raw = findings.reduce((sum, f) => sum + f.weight, 0);
  const score = Math.max(0, Math.min(100, Math.round(raw * K)));
  const hit = BANDS.find((b) => score < b.max) ?? BANDS[BANDS.length - 1]!;
  return { score, band: hit.band, label: hit.label };
}
