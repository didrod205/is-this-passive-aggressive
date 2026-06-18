# Contributing to is-this-passive-aggressive

Thanks for your interest! The most welcome contribution is a **new phrase** — a
piece of passive-aggressive corporate-speak, the category it belongs to, and an
honest decode of what the sender really means.

## Getting started

```bash
git clone https://github.com/didrod205/is-this-passive-aggressive.git
cd is-this-passive-aggressive
npm install
npm test            # vitest
npm run typecheck
npm run build       # tsup → dist/
npm run dev         # the playground at localhost:5173
npm run example     # score the bundled venomous sample
```

## Project layout

```
src/
  phrases.ts    # the curated database: { text, category, weight, decode } (pure)
  analyze.ts    # run the phrases → findings with spans + dedupe overlaps (pure)
  score.ts      # weighted venom score + verdict bands (pure)
  highlight.ts  # findings → plain/flagged segments for rendering (pure)
  config.ts / load-config.ts
  report/       # console (decoded) / markdown (table) / json
  cli.ts        # cac CLI
web/            # the Vite playground (reuses src/ directly)
tests/          # detection + calibration + comma/apostrophe/span checks
```

## Adding a phrase

Add an entry to `PHRASES` in `src/phrases.ts`:

```ts
{ text: "as discussed", category: "blame-shift", weight: 2,
  decode: "We agreed on this — or so I'll claim." },
```

- **`text`** — lowercase, straight apostrophes (`'`). Spaces match any whitespace
  **and** an optional comma, so `"no rush but"` also catches `"no rush, but"`, and
  `i'm` matches `i’m`. No need to add comma/curly variants.
- **`category`** — `fake-polite | blame-shift | nudge | condescend | veiled-threat | cya | fake-deadline | dismissive`.
- **`weight`** — roughly 1 (mild) to 4 (cutting). `"per my last email"` is a 4.
- **`decode`** — the honest, funny-but-*true* translation. This is the heart of
  the project. Short and sharp beats wordy.

Add a test: the phrase fires on an obvious example, and the calibration tests stay
green (the venomous sample > 70, the sincere one < 20).

## The one rule

This is a **decoder, not a mind-reader.** Don’t add phrases that fire on warm,
sincere messages — a genuine, kind note must keep scoring near zero. A phrase
earns a place only if it’s a widely-recognized passive-aggressive tell *in
context*. Keep decodes honest: funny is great, but a decode that’s merely cynical
(not *true*) makes the tool dumber. False positives turn a fun tool into one that
makes people paranoid about normal politeness.

## Quality bar

- [ ] `npm run typecheck && npm test && npm run build` pass.
- [ ] Calibration holds (a sincere message stays low).
- [ ] The core imports no `node:*` — keep it browser-safe (the playground needs it).
