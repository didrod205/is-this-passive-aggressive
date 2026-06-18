import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";

const read = (f: string) => readFileSync(resolve(__dirname, "..", "examples", f), "utf8");

describe("passive-aggressive detection", () => {
  it("flags 'per my last email' as blame-shift", () => {
    const r = analyze("Per my last email, the deck is attached.");
    expect(r.findings.some((f) => f.match.toLowerCase() === "per my last email" && f.category === "blame-shift")).toBe(true);
  });

  it("decodes 'noted'", () => {
    const r = analyze("Noted.");
    const f = r.findings.find((x) => x.match.toLowerCase() === "noted");
    expect(f?.category).toBe("dismissive");
    expect(f?.decode).toMatch(/disagree/i);
  });

  it("tolerates an internal comma: 'no rush, but'", () => {
    const r = analyze("No rush, but I need this today.");
    expect(r.findings.some((f) => f.match.toLowerCase().replace(/\s+/g, " ") === "no rush, but")).toBe(true);
  });

  it("treats a curly apostrophe the same as a straight one", () => {
    const r = analyze("Correct me if I’m wrong.");
    expect(r.findings.some((f) => f.category === "veiled-threat")).toBe(true);
  });

  it("prefers the longer overlapping phrase ('no rush but' > 'no rush')", () => {
    const r = analyze("No rush but please hurry.");
    const matches = r.findings.map((f) => f.match.toLowerCase().replace(/\s+/g, " "));
    expect(matches).toContain("no rush but");
    expect(matches).not.toContain("no rush");
  });

  it("does not fire inside larger words", () => {
    const r = analyze("I booked the kayak and parked the car. Anybody home?");
    // 'k', 'noted' etc. must not match inside 'kayak'/'parked'/'Anybody'
    expect(r.findings.length).toBe(0);
  });

  it("counts repeats in topFlags", () => {
    const r = analyze("noted. noted. noted.");
    const top = r.topFlags.find((t) => t.match.toLowerCase() === "noted");
    expect(top?.count).toBe(3);
  });

  it("respects ignored categories", () => {
    const r = analyze("Per my last email, noted.", { ignore: ["dismissive"] });
    const matches = r.findings.map((f) => f.match.toLowerCase());
    expect(matches).toContain("per my last email");
    expect(matches).not.toContain("noted");
  });

  it("produces non-overlapping, ordered spans", () => {
    const r = analyze(read("venomous.txt"));
    for (let i = 1; i < r.findings.length; i++) {
      expect(r.findings[i]!.start).toBeGreaterThanOrEqual(r.findings[i - 1]!.end);
    }
  });
});

describe("calibration", () => {
  it("a venom-stuffed email scores weapons-grade", () => {
    const r = analyze(read("venomous.txt"));
    expect(r.verdict.score).toBeGreaterThanOrEqual(70);
    expect(r.verdict.band).toBe("venom");
  });

  it("a genuinely sincere reply scores low", () => {
    const r = analyze(read("sincere.txt"));
    expect(r.verdict.score).toBeLessThan(20);
    expect(r.verdict.band).toBe("sincere");
  });

  it("empty text is sincere with no findings", () => {
    const r = analyze("");
    expect(r.findings).toHaveLength(0);
    expect(r.verdict.score).toBe(0);
  });
});
