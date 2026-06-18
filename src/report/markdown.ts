import type { Report } from "../types.js";
import { CATEGORY_LABELS } from "../types.js";

export function toMarkdown(r: Report): string {
  const L: string[] = [];
  L.push(`# is-this-passive-aggressive — ${r.verdict.score}/100`);
  L.push("");
  L.push(`> **${r.verdict.label}**`);
  L.push("");
  L.push(`${r.findings.length} passive-aggressive phrase${r.findings.length === 1 ? "" : "s"} in ${r.words} words.`);
  L.push("");
  if (r.topFlags.length > 0) {
    L.push("**What they said → what they really mean**");
    L.push("");
    L.push("| Phrase | Count | Category | What they really mean |");
    L.push("| --- | --- | --- | --- |");
    for (const t of r.topFlags) {
      L.push(`| \`${t.match}\` | ×${t.count} | ${CATEGORY_LABELS[t.category]} | ${t.decode} |`);
    }
    L.push("");
  } else {
    L.push("No passive-aggressive phrases from our database. Reads sincere. 🙂");
    L.push("");
  }
  L.push("---");
  L.push("<sub>scored locally by [is-this-passive-aggressive](https://github.com/didrod205/is-this-passive-aggressive) — rule-based, no AI, nothing uploaded. Tone is context.</sub>");
  return L.join("\n") + "\n";
}
