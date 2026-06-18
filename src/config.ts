import type { Config, PACategory } from "./types.js";

export const CATEGORIES: PACategory[] = [
  "fake-polite",
  "blame-shift",
  "nudge",
  "condescend",
  "veiled-threat",
  "cya",
  "fake-deadline",
  "dismissive",
];

export function normalizeConfig(input: Partial<Config> | undefined): Config {
  const ignore = (input?.ignore ?? []).filter((c): c is PACategory =>
    CATEGORIES.includes(c as PACategory),
  );
  return { ignore };
}
