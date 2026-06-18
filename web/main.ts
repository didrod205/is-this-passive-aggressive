import { analyze, toSegments, CATEGORY_LABELS } from "../src/index.js";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const input = $<HTMLTextAreaElement>("input");
const result = $<HTMLElement>("result");
const scoreEl = $<HTMLElement>("score");
const labelEl = $<HTMLElement>("label");
const subEl = $<HTMLElement>("sub");
const decoder = $<HTMLElement>("decoder");
const decoderTitle = $<HTMLElement>("decoder-title");
const highlighted = $<HTMLElement>("highlighted");
const card = document.querySelector(".scorecard") as HTMLElement;

const VENOM_SAMPLE = `Hi,

Per my last email, the report was due Friday. Just following up, as I mentioned this is now blocking the whole team. With all due respect, this should have been obvious.

As a reminder, going forward I'd appreciate it if deliverables landed on time. No rush, but sometime today would be great. I'm sure it's just an oversight.

I'm looping in your manager for visibility. Please advise.

Thanks in advance,
Dana`;

const SINCERE_SAMPLE = `Hi Dana,

Thanks for your patience — that one's on me. The report slipped because the data import broke on Thursday and I wanted to fix the root cause before sending numbers I didn't trust.

It's fixed now. I'll have the report to you by 2pm today, and I'll add a check so this can't happen silently again. If the timing is a problem, tell me and I'll send a partial version first.

Sorry for the wait, and thanks for flagging it.
Sam`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function render(): void {
  const text = input.value;
  if (text.trim() === "") {
    result.classList.add("hidden");
    return;
  }
  result.classList.remove("hidden");
  const r = analyze(text);

  scoreEl.textContent = String(r.verdict.score);
  labelEl.textContent = r.verdict.label;
  const n = r.findings.length;
  subEl.textContent = `${n} passive-aggressive phrase${n === 1 ? "" : "s"} in ${r.words} words`;
  card.className = "scorecard band-" + r.verdict.band;

  if (r.topFlags.length > 0) {
    decoderTitle.classList.remove("hidden");
    decoder.innerHTML = r.topFlags
      .map(
        (t) => `<div class="decode-row">
          <div class="said"><span class="q">“${escapeHtml(t.match)}”</span>${t.count > 1 ? ` <span class="x">×${t.count}</span>` : ""}<span class="cat">${escapeHtml(CATEGORY_LABELS[t.category])}</span></div>
          <div class="means">${escapeHtml(t.decode)}</div>
        </div>`,
      )
      .join("");
  } else {
    decoderTitle.classList.add("hidden");
    decoder.innerHTML = `<div class="empty">No passive-aggressive phrases from our database. Reads sincere. 🙂</div>`;
  }

  highlighted.innerHTML = toSegments(text, r.findings)
    .map((seg) =>
      seg.finding
        ? `<mark class="flag" title="${escapeHtml(seg.finding.decode)}">${escapeHtml(seg.text)}</mark>`
        : escapeHtml(seg.text),
    )
    .join("");
}

input.addEventListener("input", render);
$<HTMLButtonElement>("sample-venom").addEventListener("click", () => {
  input.value = VENOM_SAMPLE;
  render();
});
$<HTMLButtonElement>("sample-sincere").addEventListener("click", () => {
  input.value = SINCERE_SAMPLE;
  render();
});
$<HTMLButtonElement>("clear").addEventListener("click", () => {
  input.value = "";
  render();
  input.focus();
});

input.value = VENOM_SAMPLE;
render();
