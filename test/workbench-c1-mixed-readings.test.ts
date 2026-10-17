import { describe, expect, it } from "vitest";
import { redactWorkbenchText, sanitizeWorkbenchJson, sanitizeWorkbenchText, type WorkbenchTextLayout } from "../src/workbench/redaction.js";

/**
 * wb-mrg (owner-ruled wb-xbq F3(a), W19 input hygiene): an 8-bit CSI introducer (U+009B) is either the start of a whole
 * sequence or one control a reader drops on its own, and a reader may take either reading at EACH introducer. The wb-xbq
 * cut covered the two uniform readings (every introducer whole, every introducer alone); a text whose introducers are read
 * differently from one another still showed the credential it holds. Every code point is built with String.fromCodePoint.
 * The credential-shaped values here are obviously fake placeholders.
 */
const CSI = String.fromCodePoint(0x9b);
const SGR = `${CSI}1m`;
const LAYOUTS: readonly WorkbenchTextLayout[] = ["text", "label", "terminal", "lines"];
const CAP_EXCEEDING_INTRODUCERS = 14;

/** A reference reader, independent of the helper: every reading of the CSI introducers, each whole or on its own. */
function readings(text: string): string[] {
  const out: string[] = [];
  const walk = (at: number, shown: string): void => {
    if (at >= text.length) {
      out.push(shown);
      return;
    }
    if (text[at] === CSI) {
      const sequence = /^[0-?]*[ -/]*[@-~]/.exec(text.slice(at + 1));
      if (sequence) walk(at + 1 + sequence[0].length, shown);
      walk(at + 1, shown);
      return;
    }
    walk(at + 1, shown + text[at]);
  };
  walk(0, "");
  return out;
}

/** The readings of `raw` in which plain redaction hides `secret` although the reading holds it, so a display must hide it too. */
const exposedIn = (raw: string, secret: string): string[] => readings(raw).filter(reading => reading.includes(secret) && !redactWorkbenchText(reading).includes(secret));
const uniform = (raw: string): readonly [string, string] => [raw.replaceAll(new RegExp(`${CSI}[0-?]*[ -/]*[@-~]`, "gu"), ""), raw.replaceAll(CSI, "")];

interface Row {
  readonly id: string;
  readonly raw: string;
  readonly secret: string;
}

/**
 * One keyword with the first introducer (an SGR sequence, read whole) before position `first` and the second (read alone,
 * its final byte a keyword letter) before position `second`: the other readings of the pair leave the keyword broken.
 */
function pair(name: string, keyword: string, tail: string, secret: string, first: number, second: number): Row {
  return { id: `${name} ${first}/${second}`, raw: `${keyword.slice(0, first)}${SGR}${keyword.slice(first, second)}${CSI}${keyword.slice(second)}${tail}`, secret };
}
const KEYWORDS: readonly (readonly [name: string, keyword: string, tail: string, secret: string])[] = [
  ["scheme", "Bearer", " ", "FAKEPLACEHOLDERSCHEME"],
  ["prefix", "sk-ant-", "", "FAKEPLACEHOLDERPREFIX"],
  ["ghp", "ghp_", "", "FAKEPLACEHOLDERGHP"],
  ["assignment", "password=", "", "FAKEPLACEHOLDERASSIGN"],
];
const PAIRS: readonly Row[] = KEYWORDS.flatMap(([name, keyword, tail, secret]) => {
  const rows: Row[] = [];
  for (let first = 0; first < keyword.length; first++) for (let second = first + 1; second < keyword.length; second++) rows.push(pair(name, keyword, tail, secret, first, second));
  return rows.map(row => ({ ...row, raw: `${row.raw}${secret}` }));
});

describe("wb-mrg mixed per-introducer readings of 8-bit CSI", () => {
  it("the measured shape: one introducer whole and the other alone exposes the value, and no uniform reading does", () => {
    const raw = `${SGR}Bea${CSI}rer FAKEPLACEHOLDERX1`;
    expect(exposedIn(raw, "FAKEPLACEHOLDERX1").length).toBeGreaterThan(0);
    // Neither uniform reading is a credential to the plain redactor, so the wb-xbq cut left this text showing its value.
    for (const reading of uniform(raw)) expect(redactWorkbenchText(reading)).toBe(reading);
    const failures = LAYOUTS.filter(layout => sanitizeWorkbenchText(raw, 2000, layout).includes("FAKEPLACEHOLDERX1"));
    expect(failures).toEqual([]);
  });

  it("every keyword split by a whole sequence and a lone introducer is hidden in every layout, wherever the pair sits", () => {
    // Not vacuous: each row is exposed by a mixed reading and by neither uniform reading.
    const vacuous = PAIRS.filter(row => exposedIn(row.raw, row.secret).length === 0 || uniform(row.raw).some(reading => reading.includes(row.secret) && !redactWorkbenchText(reading).includes(row.secret)));
    const mixedOnly = PAIRS.filter(row => !vacuous.includes(row));
    expect(mixedOnly.length).toBeGreaterThanOrEqual(20);
    const failures: string[] = [];
    for (const row of mixedOnly) for (const layout of LAYOUTS) if (sanitizeWorkbenchText(row.raw, 2000, layout).includes(row.secret)) failures.push(`${row.id} (${layout})`);
    expect(failures).toEqual([]);
  });

  it("three introducers read three different ways are hidden too", () => {
    const rows: Row[] = [];
    for (const [name, keyword, tail, secret] of KEYWORDS) {
      for (let first = 0; first < keyword.length; first++) {
        for (let second = first + 1; second < keyword.length; second++) {
          for (let third = second + 1; third < keyword.length; third++) {
            const raw = `${keyword.slice(0, first)}${SGR}${keyword.slice(first, second)}${CSI}${keyword.slice(second, third)}${SGR}${keyword.slice(third)}${tail}${secret}`;
            if (exposedIn(raw, secret).length > 0) rows.push({ id: `${name} ${first}/${second}/${third}`, raw, secret });
          }
        }
      }
    }
    expect(rows.length).toBeGreaterThanOrEqual(10);
    const failures: string[] = [];
    for (const row of rows) for (const layout of LAYOUTS) if (sanitizeWorkbenchText(row.raw, 2000, layout).includes(row.secret)) failures.push(`${row.id} (${layout})`);
    expect(failures).toEqual([]);
  });

  it("a JSON key split by a whole sequence and a lone introducer is still a secret field", () => {
    const keys = [`${SGR}pass${CSI}word`, `${SGR}api${CSI}_key`, `${SGR}acc${CSI}ess_token`];
    const text = JSON.stringify(sanitizeWorkbenchJson(Object.fromEntries(keys.map((key, index) => [key, `opaque-mixed-value-${index}`]))));
    expect(keys.filter((_key, index) => text.includes(`opaque-mixed-value-${index}`))).toEqual([]);
  });

  it("text beyond the reading bound is hidden whole, and text within it keeps its visible stretches", () => {
    // More independent readings than the helper enumerates: it hides the whole text rather than guess at the rest.
    const many = `visible-before ${Array.from({ length: CAP_EXCEEDING_INTRODUCERS }, () => `${SGR}x${CSI}y`).join(" ")} ${SGR}Bea${CSI}rer FAKEPLACEHOLDERMANY`;
    for (const layout of LAYOUTS) {
      const shown = sanitizeWorkbenchText(many, 2000, layout);
      expect(shown, layout).not.toContain("FAKEPLACEHOLDERMANY");
      expect(shown, layout).toBe("[REDACTED]");
    }
    // Introducers far apart are read on their own, so many of them do not add up: the stretches stay visible and the value is hidden.
    const spread = `visible-before ${Array.from({ length: CAP_EXCEEDING_INTRODUCERS }, () => `${SGR}x${CSI}y${".".repeat(40)}`).join(" ")} ${SGR}Bea${CSI}rer FAKEPLACEHOLDERFAR visible-after`;
    for (const layout of LAYOUTS) {
      const shown = sanitizeWorkbenchText(spread, 2000, layout);
      expect(shown, layout).not.toContain("FAKEPLACEHOLDERFAR");
      expect(shown, layout).toContain("visible-before");
    }
    // Within the bound nothing else changes: the stretches around the introducers stay visible.
    const few = `visible-before ${SGR} visible-middle ${CSI}`;
    for (const layout of LAYOUTS) {
      const shown = sanitizeWorkbenchText(few, 2000, layout);
      for (const stretch of ["visible-before", "visible-middle"]) expect(shown, layout).toContain(stretch);
    }
  });
});
