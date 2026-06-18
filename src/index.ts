// Public, browser-safe API. No node:* imports here — the web playground imports
// this file directly.
export { analyze } from "./analyze.js";
export { scoreFindings } from "./score.js";
export { toSegments } from "./highlight.js";
export type { Segment } from "./highlight.js";
export { PHRASES } from "./phrases.js";
export type { Phrase } from "./phrases.js";
export { CATEGORIES, normalizeConfig } from "./config.js";
export { CATEGORY_LABELS } from "./types.js";
export type {
  Band,
  Config,
  Finding,
  PACategory,
  Report,
  Verdict,
} from "./types.js";
