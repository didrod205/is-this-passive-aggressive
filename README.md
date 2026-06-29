# is-this-passive-aggressive 😤

**Paste an email, Slack message or text. Get its passive-aggressive phrases decoded into what they actually mean — with zero AI.**

> “Per my last email” → *you ignored my last email.*
> “No rush, but…” → *rush.*
> “Noted.” → *I disagree and I’m done discussing it.*
> “Looping in your manager” → *I’m escalating because you didn’t respond.*

A tiny, **100% local, rule-based** tool that scans a message against a curated
database of corporate passive-aggression, scores its **venom 0–100**, and tells
you — for each phrase — *what they really mean.* No API key, no model, **nothing
leaves your machine.**

### 🌐 [**Try it in your browser →**](https://didrod205.github.io/is-this-passive-aggressive/)

Paste a message, watch the venom light up. Nothing is uploaded — the whole engine runs client-side.

```bash
npx is-this-passive-aggressive "Per my last email, please advise. No rush, but I need this today."
```

```
  100/100 ████████████████████ Weapons-grade passive-aggressive ☠️
  3 passive-aggressive phrases in 12 words

  What they said → what they really mean
    “Per my last email” · Blame-shift
      ↳ You ignored my last email.
    “No rush but” · Fake “no rush”
      ↳ Rush. Definitely rush.
    “please advise” · Veiled threat
      ↳ Do something. This is now your problem.
```

## Two ways to use it

1. **Before you send** — paste your own draft and de-venom it. That “friendly
   reminder” lands harder than you think. Use `--max-score` to gate it in CI.
2. **After you receive** — paste the message that made your eye twitch and get the
   subtext spelled out (and a laugh).

## Why

Workplace messages have a second language running under the first. The polite
surface (“just following up!”) carries a payload (“you’ve been ignoring me”).
This decodes that payload: it highlights the phrases, groups them by *type* of
passive-aggression, and translates each one.

It’s a **decoder, not a mind-reader.** Tone is context — a “friendly reminder”
from a friend is friendly; from the person whose deadline you blew, less so. Read
the clichés here; read the room yourself.

## Install

```bash
npm i -g is-this-passive-aggressive     # then:  is-this-passive-aggressive draft.txt
# or zero-install:
npx is-this-passive-aggressive draft.txt
```

## Usage

```bash
is-this-passive-aggressive "paste the message right here"   # a string
is-this-passive-aggressive draft.txt                        # a file
pbpaste | is-this-passive-aggressive                         # the clipboard (macOS)
is-this-passive-aggressive draft.txt --md > report.md        # Markdown table
is-this-passive-aggressive draft.txt --json                  # machine-readable
```

`passagg` is a shorter alias for the same command.

### Flags

| Flag | What it does |
| --- | --- |
| `--md [file]` | Markdown table (`What they said → what they really mean`) |
| `--json [file]` | Full report as JSON |
| `--max-score <n>` | Exit `1` if venom exceeds `n` — a CI gate for de-venoming your own drafts |
| `--ignore <category>` | Skip a category (repeatable) |
| `--quiet` | No pretty output (use with `--max-score`) |
| `--no-color` | Disable ANSI colors |

### Lint your own outbox

```bash
is-this-passive-aggressive drafts/reply-to-dana.txt --max-score 20 --quiet
```

## The categories

| Category | Signals |
| --- | --- |
| **Blame-shift** | “per my last email”, “as I mentioned”, “as previously discussed” |
| **The nudge** | “just following up”, “circling back”, “bumping this”, “any update?” |
| **Fake-polite** | “with all due respect”, “friendly reminder”, “thanks in advance” |
| **Condescension** | “to be clear”, “as you may already know”, “for future reference” |
| **Veiled threat** | “please advise”, “going forward”, “I’m sure it’s just an oversight” |
| **Cover-your-ass** | “looping in your manager”, “adding for visibility”, “for the record” |
| **Fake “no rush”** | “no rush, but”, “at your earliest convenience”, “whenever you have a moment” |
| **Dismissive** | “noted”, “it is what it is”, “sure, that’s fine”, “k” |

## Library

The core is pure and browser-safe (no `node:*`), so you can use it anywhere:

```ts
import { analyze } from "is-this-passive-aggressive";

const report = analyze("Per my last email, please advise.");
report.verdict.score;   // 100
report.verdict.band;    // "venom"
report.topFlags[0];     // { match: "Per my last email", category: "blame-shift", decode: "You ignored my last email.", count: 1 }
```

## How the score works

Each phrase carries a weight; venom is the accumulated weight, scaled and capped
at 100. We deliberately **don’t** normalize by length — “per my last email” is
just as cutting in a one-liner as in a wall of text — so the score stays
predictable and we can always show exactly which phrases produced it.

| Score | Band | |
| --- | --- | --- |
| 0–19 | **Reads sincere** | ✅ |
| 20–44 | **A little passive-aggressive** | 🙂 |
| 45–69 | **Quite passive-aggressive** | 😤 |
| 70–100 | **Weapons-grade passive-aggressive** | ☠️ |

## Privacy

Everything runs locally. The CLI reads your text, scores it in memory, and prints
the result. The web playground runs the **exact same engine** compiled to the
browser — open the network tab, you’ll see nothing leave. No telemetry, no
account, no upload. Ever. (Which matters a lot when the thing you’re pasting is
the email you’re furious about.)

## Contributing

The most useful contribution is **a new phrase** — the corporate-speak, the
category it belongs to, and an honest, funny-but-true decode. See
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT © [didrod205](https://github.com/didrod205)

---

<sub>A rule-based decoder, not a mind-reader. It reads the *clichés* — your judgment reads the room.</sub>

## 💖 Sponsor

Find this useful? [**Sponsor on GitHub**](https://github.com/sponsors/didrod205) — it keeps these projects maintained.

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-db61a2?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/didrod205)
