import type { PACategory } from "./types.js";

export interface Phrase {
  text: string;
  category: PACategory;
  weight: number;
  decode: string;
}

// The moat: a curated database of passive-aggressive phrases mapped to what the
// sender actually means. Pure data — the CLI and the playground share it.
export const PHRASES: Phrase[] = [
  // ── blame-shift ──
  { text: "per my last email", category: "blame-shift", weight: 4, decode: "You ignored my last email." },
  { text: "as per my last email", category: "blame-shift", weight: 4, decode: "READ. THE. EMAIL." },
  { text: "as per my previous email", category: "blame-shift", weight: 4, decode: "I already sent this. You didn't read it." },
  { text: "as i mentioned", category: "blame-shift", weight: 3, decode: "I already told you this." },
  { text: "as i said", category: "blame-shift", weight: 3, decode: "Were you listening the first time?" },
  { text: "as previously discussed", category: "blame-shift", weight: 3.5, decode: "We agreed on this; you forgot." },
  { text: "as previously mentioned", category: "blame-shift", weight: 3.5, decode: "Repeating myself, again." },
  { text: "as stated below", category: "blame-shift", weight: 3, decode: "It's literally right there. Scroll." },
  { text: "as noted below", category: "blame-shift", weight: 3, decode: "It's right there in the thread you didn't read." },
  { text: "to reiterate", category: "blame-shift", weight: 2.5, decode: "I shouldn't have to say this twice." },
  { text: "just to reiterate", category: "blame-shift", weight: 2.5, decode: "Saying it again because you missed it." },
  { text: "resending", category: "blame-shift", weight: 3, decode: "You ignored this the first time." },
  { text: "see below", category: "blame-shift", weight: 1.5, decode: "The answer was already there." },
  { text: "see my email below", category: "blame-shift", weight: 3, decode: "The answer is in the email you skipped." },

  // ── nudge / follow-up ──
  { text: "just following up", category: "nudge", weight: 2.5, decode: "You've been ignoring me." },
  { text: "following up on this", category: "nudge", weight: 2.5, decode: "Still waiting. Still ignored." },
  { text: "just circling back", category: "nudge", weight: 2.5, decode: "You went quiet, so here I am again." },
  { text: "circling back on this", category: "nudge", weight: 2.5, decode: "Round two of being ignored." },
  { text: "just checking in", category: "nudge", weight: 2, decode: "Why haven't you replied?" },
  { text: "checking in on this", category: "nudge", weight: 2, decode: "It's been a while. Hello?" },
  { text: "bumping this", category: "nudge", weight: 2.5, decode: "Look at my email. Please." },
  { text: "bumping this up", category: "nudge", weight: 2.5, decode: "Back to the top of your inbox you go." },
  { text: "gentle nudge", category: "nudge", weight: 2.5, decode: "Not gentle. A nudge." },
  { text: "gentle bump", category: "nudge", weight: 2.5, decode: "The opposite of gentle." },
  { text: "any update on this", category: "nudge", weight: 2, decode: "You said you'd do this and you didn't." },
  { text: "any update", category: "nudge", weight: 1.5, decode: "Where is it?" },
  { text: "did you get a chance to", category: "nudge", weight: 2, decode: "You didn't do it, did you?" },
  { text: "in case you missed it", category: "nudge", weight: 2.5, decode: "You missed it." },
  { text: "wanted to make sure this didn't slip", category: "nudge", weight: 2.5, decode: "It slipped. Because you dropped it." },

  // ── fake-polite ──
  { text: "with all due respect", category: "fake-polite", weight: 3.5, decode: "I'm about to disrespect you." },
  { text: "no offense but", category: "fake-polite", weight: 3, decode: "This will be offensive." },
  { text: "no offense", category: "fake-polite", weight: 2.5, decode: "Offense incoming." },
  { text: "friendly reminder", category: "fake-polite", weight: 3, decode: "This is your last friendly one." },
  { text: "just a friendly reminder", category: "fake-polite", weight: 3, decode: "The friendliness is running out." },
  { text: "gentle reminder", category: "fake-polite", weight: 2.5, decode: "I shouldn't have to remind you." },
  { text: "kind reminder", category: "fake-polite", weight: 2.5, decode: "Reminding you. Again." },
  { text: "just a reminder", category: "fake-polite", weight: 2, decode: "You forgot, so here it is." },
  { text: "thanks in advance", category: "fake-polite", weight: 2, decode: "You're doing this, and I'm not giving you the option to say no." },
  { text: "thanks in advance for your cooperation", category: "fake-polite", weight: 2.5, decode: "Comply." },
  { text: "i hope this email finds you well", category: "fake-polite", weight: 1.2, decode: "Boilerplate. Brace for the real message." },
  { text: "happy to discuss", category: "fake-polite", weight: 1.5, decode: "I'd rather not, but I'm being polite." },
  { text: "feel free to", category: "fake-polite", weight: 1, decode: "Mild — but often precedes an instruction dressed as an option." },

  // ── condescend ──
  { text: "as you may already know", category: "condescend", weight: 3, decode: "You should know this, but clearly don't." },
  { text: "as you are aware", category: "condescend", weight: 2.5, decode: "You are not aware, evidently." },
  { text: "just so we're on the same page", category: "condescend", weight: 2.5, decode: "You're on the wrong page." },
  { text: "to be clear", category: "condescend", weight: 2, decode: "You weren't listening." },
  { text: "let me be clear", category: "condescend", weight: 2.5, decode: "I'm done being subtle." },
  { text: "to clarify", category: "condescend", weight: 1.5, decode: "You misunderstood — that's on you." },
  { text: "for clarity", category: "condescend", weight: 1.5, decode: "Let me dumb this down." },
  { text: "as a reminder", category: "condescend", weight: 2, decode: "You forgot something you shouldn't have." },
  { text: "obviously", category: "condescend", weight: 2, decode: "It's not obvious to you, apparently." },
  { text: "needless to say", category: "condescend", weight: 2, decode: "And yet I'm saying it, for you." },
  { text: "for future reference", category: "condescend", weight: 2.5, decode: "Don't make me explain this again." },

  // ── veiled-threat ──
  { text: "please advise", category: "veiled-threat", weight: 3, decode: "Do something. This is now your problem." },
  { text: "please be advised", category: "veiled-threat", weight: 3, decode: "Consider yourself warned." },
  { text: "correct me if i'm wrong", category: "veiled-threat", weight: 2.5, decode: "I'm not wrong." },
  { text: "i'm sure it's just an oversight", category: "veiled-threat", weight: 3, decode: "I think you did this on purpose." },
  { text: "i assume", category: "veiled-threat", weight: 1.5, decode: "You'd better confirm what I just assumed." },
  { text: "going forward", category: "veiled-threat", weight: 2.5, decode: "You messed up; don't do it again." },
  { text: "moving forward", category: "veiled-threat", weight: 2.5, decode: "New rule, because of what you just did." },
  { text: "i would appreciate it if", category: "veiled-threat", weight: 2.5, decode: "Do it. This is not a request." },
  { text: "i'd appreciate it if", category: "veiled-threat", weight: 2.5, decode: "Do it. This is not a request." },
  { text: "i'd appreciate a response", category: "veiled-threat", weight: 2.5, decode: "Answer me. Now." },
  { text: "let's take this offline", category: "veiled-threat", weight: 2, decode: "We'll discuss why you did that in private." },

  // ── cya ──
  { text: "looping in", category: "cya", weight: 3, decode: "I'm escalating because you didn't respond." },
  { text: "adding for visibility", category: "cya", weight: 3, decode: "Now everyone can see you dropped this." },
  { text: "for visibility", category: "cya", weight: 2.5, decode: "Witnesses, in case this goes wrong." },
  { text: "cc'ing", category: "cya", weight: 2.5, decode: "Bringing in someone more important than you." },
  { text: "for the record", category: "cya", weight: 2.5, decode: "I'm documenting this for later." },
  { text: "just to document this", category: "cya", weight: 2.5, decode: "Building my case." },
  { text: "to keep everyone in the loop", category: "cya", weight: 2, decode: "To make your silence very public." },
  { text: "flagging this", category: "cya", weight: 1.5, decode: "Officially making this not-my-fault." },
  { text: "as discussed with", category: "cya", weight: 2, decode: "Someone above you already agrees with me." },

  // ── fake-deadline ──
  { text: "at your earliest convenience", category: "fake-deadline", weight: 2.5, decode: "Now." },
  { text: "when you get a chance", category: "fake-deadline", weight: 2, decode: "Now, but I'm pretending it's optional." },
  { text: "whenever you have a moment", category: "fake-deadline", weight: 2, decode: "This moment. The one you're in." },
  { text: "no rush", category: "fake-deadline", weight: 2.5, decode: "Rush." },
  { text: "no rush but", category: "fake-deadline", weight: 3, decode: "Rush. Definitely rush." },
  { text: "no pressure but", category: "fake-deadline", weight: 3, decode: "All of the pressure." },
  { text: "sometime today would be great", category: "fake-deadline", weight: 2.5, decode: "In the next hour. Ideally five minutes ago." },
  { text: "sooner rather than later", category: "fake-deadline", weight: 2.5, decode: "Now, and I'm annoyed I have to say it." },
  { text: "by eod", category: "fake-deadline", weight: 1.5, decode: "Drop what you're doing." },

  // ── dismissive ──
  { text: "noted", category: "dismissive", weight: 2.5, decode: "I disagree and I'm done discussing it." },
  { text: "well noted", category: "dismissive", weight: 2.5, decode: "Heard you. Ignoring you." },
  { text: "duly noted", category: "dismissive", weight: 2.5, decode: "Filed under 'never thinking about this again.'" },
  { text: "it is what it is", category: "dismissive", weight: 2, decode: "I've given up trying to change this." },
  { text: "anyway", category: "dismissive", weight: 1.5, decode: "Your point didn't matter; moving on." },
  { text: "regardless", category: "dismissive", weight: 1.5, decode: "I'm overriding whatever you just said." },
  { text: "as you wish", category: "dismissive", weight: 2, decode: "Fine. It's your funeral." },
  { text: "if that's what you want", category: "dismissive", weight: 2.5, decode: "It's the wrong call and I want it on record." },
  { text: "sure that's fine", category: "dismissive", weight: 2, decode: "It is not fine." },
  { text: "k", category: "dismissive", weight: 2, decode: "One letter of pure disappointment." },
  { text: "good for you", category: "dismissive", weight: 2.5, decode: "I could not care less." },
];
