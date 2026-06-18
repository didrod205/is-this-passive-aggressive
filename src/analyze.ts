import { PHRASES } from "./phrases.js";
import { scoreFindings } from "./score.js";
import type { Config, Finding, PACategory, Report } from "./types.js";

const DEFAULT_CONFIG: Config = { ignore: [] };

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// A phrase boundary that treats letters/digits as "inside a word". Gaps between
// words tolerate an optional comma ("no rush, but") and straight/curly
// apostrophes are interchangeable ("i'm" === "i’m").
function phraseRegex(text: string): RegExp {
  const body = escapeRe(text)
    .replace(/\s+/g, "[\\s,]+")
    .replace(/'/g, "['’]");
  return new RegExp(`(?<![A-Za-z0-9])${body}(?![A-Za-z0-9])`, "gi");
}

const COMPILED = PHRASES.map((p) => ({ ...p, re: phraseRegex(p.text) }));

function countWords(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

// Keep the longest / heaviest match when spans overlap, so "no rush but" wins
// over "no rush" and "as per my last email" wins over "as i mentioned".
function dedupe(found: Finding[]): Finding[] {
  const sorted = [...found].sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    const lenA = a.end - a.start;
    const lenB = b.end - b.start;
    if (lenA !== lenB) return lenB - lenA;
    return b.weight - a.weight;
  });
  const kept: Finding[] = [];
  let lastEnd = -1;
  for (const f of sorted) {
    if (f.start >= lastEnd) {
      kept.push(f);
      lastEnd = f.end;
    }
  }
  return kept;
}

export function analyze(text: string, config: Partial<Config> = {}): Report {
  const cfg: Config = { ...DEFAULT_CONFIG, ...config };
  const ignore = new Set<PACategory>(cfg.ignore);

  const raw: Finding[] = [];
  for (const p of COMPILED) {
    if (ignore.has(p.category)) continue;
    p.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = p.re.exec(text)) !== null) {
      raw.push({
        category: p.category,
        match: m[0],
        start: m.index,
        end: m.index + m[0].length,
        weight: p.weight,
        decode: p.decode,
      });
      if (m.index === p.re.lastIndex) p.re.lastIndex++;
    }
  }

  const findings = dedupe(raw).sort((a, b) => a.start - b.start);

  const byCategory: Record<PACategory, number> = {
    "fake-polite": 0,
    "blame-shift": 0,
    nudge: 0,
    condescend: 0,
    "veiled-threat": 0,
    cya: 0,
    "fake-deadline": 0,
    dismissive: 0,
  };
  for (const f of findings) byCategory[f.category]++;

  const groups = new Map<string, { match: string; count: number; category: PACategory; decode: string }>();
  for (const f of findings) {
    // collapse internal whitespace so a phrase caught across a line-wrap reads
    // as one phrase in the summary.
    const norm = f.match.replace(/\s+/g, " ");
    const key = norm.toLowerCase();
    const g = groups.get(key);
    if (g) g.count++;
    else groups.set(key, { match: norm, count: 1, category: f.category, decode: f.decode });
  }
  const topFlags = [...groups.values()].sort((a, b) => b.count - a.count || b.match.length - a.match.length);

  const words = countWords(text);
  const verdict = scoreFindings(findings, words);

  return { chars: text.length, words, findings, byCategory, topFlags, verdict };
}
