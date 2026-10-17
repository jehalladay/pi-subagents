import type { SessionMessage } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { readClaudeTranscript } from "../src/workbench/claude-transcript.js";
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

/**
 * wb-mrg respin (gate row 417; owner rulings R1-R3; closed-record cap MRGCAPTOKEN), W19 input hygiene: the gate's measured
 * battery. The first cut combined introducers only inside a cluster cut by RAW code-unit distance and read every other
 * cluster whole, so trunk's uniform all-alone reading left the set once the introducers fell into two clusters, although a
 * 7-bit CSI or a run of U+200B between them (units every reading removes) puts raw distance but no kept text between the
 * pieces. Every introducer, pad and invisible is built with String.fromCodePoint; every value is an obviously fake placeholder.
 */
const ESC = String.fromCodePoint(0x1b);
const ZWSP = String.fromCodePoint(0x200b);
/** A 7-bit CSI `width` code units long (ESC [ zeros m): one unit every reading removes. */
const csiPad = (width: number): string => `${ESC}[${"0".repeat(width - 3)}m`;
const SEVEN_BIT_CSI = new RegExp(`^${ESC}\\[[0-?]*[ -/]*[@-~]`);
const CSI_TAIL = /^[0-?]*[ -/]*[@-~]/;

/** A reference reader for these rows: each 8-bit CSI introducer whole or alone (whole first); a 7-bit CSI and U+200B removed in every reading. */
function keptReadings(text: string): string[] {
  const out: string[] = [];
  const walk = (at: number, shown: string): void => {
    if (at >= text.length) {
      out.push(shown);
      return;
    }
    const pad = SEVEN_BIT_CSI.exec(text.slice(at));
    if (pad) walk(at + pad[0].length, shown);
    else if (text[at] === ZWSP) walk(at + 1, shown);
    else if (text[at] === CSI) {
      const sequence = CSI_TAIL.exec(text.slice(at + 1));
      if (sequence) walk(at + 1 + sequence[0].length, shown);
      walk(at + 1, shown);
    } else walk(at + 1, shown + text[at]);
  };
  walk(0, "");
  return out;
}

/** The readings in which plain redaction hides `secret` although the reading holds it. */
const exposedKept = (raw: string, secret: string): string[] => keptReadings(raw).filter(reading => reading.includes(secret) && !redactWorkbenchText(reading).includes(secret));
/** Trunk's two uniform readings: every introducer whole, then every introducer alone. */
const uniformKept = (raw: string): readonly [string, string] => {
  const all = keptReadings(raw);
  return [all[0], all[all.length - 1]];
};
const shownIn = (raw: string, secret: string): string[] => LAYOUTS.filter(layout => sanitizeWorkbenchText(raw, 2000, layout).includes(secret));

/** Pads of 33 code units or more: one cluster at trunk distance, two at raw distance (gate P1 / P8b / P9 / K1 / K2). */
const FAR_PADS: readonly (readonly [name: string, pad: string])[] = [
  ["7-bit CSI 33", csiPad(33)],
  ["7-bit CSI 43", csiPad(43)],
  ["U+200B x33", ZWSP.repeat(33)],
  ["U+200B x40", ZWSP.repeat(40)],
];
/** The gate's controls: pads short enough to keep one raw cluster (23-unit 7-bit CSI, 10 x U+200B), and the adjacent form. */
const NEAR_PADS: readonly (readonly [name: string, pad: string])[] = [
  ["7-bit CSI 23", csiPad(23)],
  ["U+200B x10", ZWSP.repeat(10)],
  ["adjacent", ""],
];
const splitShapes = (pad: string): readonly Row[] => [
  { id: "scheme", raw: `Be${CSI}ar${pad}e${CSI}r FAKEPLACEHOLDERPONE`, secret: "FAKEPLACEHOLDERPONE" },
  { id: "key prefix", raw: `sk${CSI}-an${pad}${CSI}t-FAKEPLACEHOLDERPEIGHTB`, secret: "FAKEPLACEHOLDERPEIGHTB" },
  { id: "assignment", raw: `pa${CSI}ss${pad}wo${CSI}rd=FAKEPLACEHOLDERPNINE`, secret: "FAKEPLACEHOLDERPNINE" },
];
const splitKey = (pad: string): string => `pa${CSI}ss${pad}wo${CSI}rd`;
/** Whether `value` survives sanitizeWorkbenchJson as the value of `key`, in an object holding that key alone. */
const valueShown = (key: string, value: string): boolean => JSON.stringify(sanitizeWorkbenchJson({ [key]: value })).includes(value);

describe("wb-mrg respin: readings across clusters (gate row 417 battery, MRGCAPTOKEN record)", () => {
  it("U1: a keyword split by two lone introducers with a removed pad between them is hidden in every layout", () => {
    const failures: string[] = [];
    for (const [name, pad] of FAR_PADS) {
      for (const row of splitShapes(pad)) {
        // Not vacuous: the all-alone reading (trunk's coverLone) is a credential to the plain redactor.
        expect(redactWorkbenchText(uniformKept(row.raw)[1]), `${row.id} / ${name}`).not.toContain(row.secret);
        for (const layout of shownIn(row.raw, row.secret)) failures.push(`${row.id} / ${name} (${layout})`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("U1: a JSON key split the same way is still a secret field", () => {
    for (const [, pad] of FAR_PADS) expect(keptReadings(splitKey(pad))).toContain("password");
    // One object per key: the split keys display alike, so one object would keep only the last of them.
    expect(FAR_PADS.filter(([name, pad]) => valueShown(splitKey(pad), `opaque-split-key-value-${name}`)).map(([name]) => name)).toEqual([]);
  });

  it("the gate's controls stay hidden: short pads and the adjacent forms", () => {
    const failures: string[] = [];
    for (const [name, pad] of NEAR_PADS) for (const row of splitShapes(pad)) for (const layout of shownIn(row.raw, row.secret)) failures.push(`${row.id} / ${name} (${layout})`);
    expect(failures).toEqual([]);
    expect(NEAR_PADS.filter(([name, pad]) => valueShown(splitKey(pad), `opaque-near-key-value-${name}`)).map(([name]) => name)).toEqual([]);
  });

  it("F3 (folded, R3): a far-apart mixed shape that no uniform reading exposes is hidden", () => {
    for (const pad of [csiPad(43), ZWSP.repeat(40)]) {
      const raw = `Be${CSI}ar${pad}${SGR}e${CSI}r FAKEPLACEHOLDERRESID`;
      expect(exposedKept(raw, "FAKEPLACEHOLDERRESID").length).toBeGreaterThan(0);
      for (const reading of uniformKept(raw)) expect(redactWorkbenchText(reading)).toBe(reading);
      expect(shownIn(raw, "FAKEPLACEHOLDERRESID")).toEqual([]);
    }
  });

  it("the uniform all-alone reading is a member however far apart the introducers sit (kept spaces before the '=')", () => {
    // Kept text, not a removed pad, separates the two introducers: they stay two clusters, and only the all-alone reading
    // (trunk's coverLone) reads the key and the '=' together.
    const raw = `pass${CSI}word${" ".repeat(40)}${CSI}=XFAKEPLACEHOLDERSPACED`;
    expect(redactWorkbenchText(uniformKept(raw)[1])).not.toContain("FAKEPLACEHOLDERSPACED");
    expect(shownIn(raw, "FAKEPLACEHOLDERSPACED")).toEqual([]);
  });

  it(
    "U2: one cluster at the reading cap on a text whose readings x code units exceed the work bound is hidden whole",
    () => {
      // Ten independent introducers: 1024 readings, the most one cluster lists; with 20,040 code units that is 2.4 x 2^23.
      const cluster = Array.from("abcdefghij", letter => `${SGR}${letter}`).join("");
      const tail = (length: number): string => "benign-tail ".repeat(Math.ceil(length / 12)).slice(0, length);
      const over = `${cluster} ${tail(20_040 - cluster.length - 1)}`;
      expect(over.length).toBe(20_040);
      for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(over, 2000, layout), layout).toBe("[REDACTED]");
      // Within the bound the same cluster is read, not hidden: its visible tail is shown.
      const within = `${cluster} ${tail(300)}`;
      for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(within, 2000, layout), layout).toContain("benign-tail");
    },
    // The bound keeps this row fast; the budget only lets a build without the final check reach its assertions.
    120_000,
  );

  it("U2: the work bound counts every reading listed, the all-alone one after the last cluster included", () => {
    // 482 clusters of one introducer each, 33 kept code units apart, on 17,352 code units: the bound lets this text list
    // floor(2^23 / 17,352) = 483 readings, which the all-whole reading and the 482 cluster readings fill exactly, so the
    // all-alone reading appended after the last cluster is the one past the bound and the text is hidden whole.
    const text = `${SGR}${"0123456789abcdefghijklmnopqrstuvw"}`.repeat(482);
    expect(text.length).toBe(17_352);
    expect(Math.floor(2 ** 23 / text.length)).toBe(483);
    for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(text, 2000, layout), layout).toBe("[REDACTED]");
  });

  it("F4 record (over-refusal, safe direction): six 8-bit SGR-coloured words are hidden whole, five are shown", () => {
    const coloured = (words: readonly string[]): string => words.map(word => `${CSI}32m${word}${CSI}0m`).join(" ");
    const six = coloured(["ready", "build", "tests", "lints", "types", "bench"]);
    for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(six, 2000, layout), layout).toBe("[REDACTED]");
    const five = ["ready", "build", "tests", "lints", "types"];
    for (const layout of LAYOUTS) {
      const shown = sanitizeWorkbenchText(coloured(five), 2000, layout);
      for (const word of five) expect(shown, layout).toContain(word);
    }
  });
});

/**
 * wb-mrg respin 2 (gate row 436 U1; owner R1/R2 defaults: inside the closed MRGCAPTOKEN record), W19 input hygiene: the
 * record states that a cluster with more combinations than MAX_READINGS, or a text past MAX_READING_WORK, has no readings
 * to list and is hidden whole. The respin-1 walk recursed one frame per branching introducer before that bound was reached,
 * so one cluster of a few thousand introducers threw RangeError (Maximum call stack size exceeded) instead, in every layout,
 * through a JSON key, and through the landed transcript reader, whose whole read failed. Benign text only: no row here holds
 * a credential shape. Every introducer and control is built with String.fromCodePoint.
 */
const BEL = String.fromCodePoint(0x07);
/** One cluster of `count` introducers, each read whole (CSI m, nothing shown) or alone (a visible m). */
const deepCsi = (count: number): string => `${CSI}m`.repeat(count);
/** A coloured-words log of `words` 8-bit SGR-coloured words, one cluster (the gate's 6,000-word shape: 52,890 code units). */
const colouredLog = (words: number): string => Array.from({ length: words }, (_, index) => `${CSI}3${index % 8}mw${index}`).join("");
/** One assistant row as the SDK session reader returns it. */
const transcriptRow = (uuid: string, text: string): SessionMessage => ({
  type: "assistant",
  uuid,
  session_id: "fake-session-id",
  message: { role: "assistant", content: [{ type: "text", text }] },
  parent_tool_use_id: null,
  parent_agent_id: null,
});

describe("wb-mrg respin 2: a cluster past the reading bound is hidden whole at any size (gate row 436 U1, MRGCAPTOKEN record)", () => {
  it("U1 (a): one cluster of 5,000 introducers (10,000 code units) is hidden whole in every layout, as 4,000 are, and so is 50,000", () => {
    for (const count of [4_000, 5_000, 50_000]) {
      const text = deepCsi(count);
      for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(text, 2000, layout), `${count} / ${layout}`).toBe("[REDACTED]");
    }
  });

  it("U1 (b): a coloured-words log of 6,000 words (52,890 code units, one cluster) is hidden whole in every layout", () => {
    const log = colouredLog(6_000);
    expect(log.length).toBe(52_890);
    for (const layout of LAYOUTS) expect(sanitizeWorkbenchText(log, 2000, layout), layout).toBe("[REDACTED]");
  });

  it("U1 (c): through the landed transcript reader a row whose body is either deep cluster is hidden whole, and every row is read", async () => {
    for (const [name, body] of [
      ["<U+009B>m x 6,000", deepCsi(6_000)],
      ["6,000-word coloured log", colouredLog(6_000)],
    ] as const) {
      const rows = await readClaudeTranscript("fake-session-id", "/nonexistent-fake-cwd", 40, async () => [transcriptRow("row-before", "visible-row-before"), transcriptRow("row-deep", body)]);
      expect(
        rows.map(row => row.text),
        name,
      ).toEqual(["visible-row-before", "[REDACTED]"]);
    }
  });

  it("U1 (d): a JSON key of one deep cluster is still a secret field and is hidden itself, as a key of 3,000 introducers is", () => {
    for (const count of [3_000, 6_000]) {
      const sanitized = sanitizeWorkbenchJson({ [deepCsi(count)]: "opaque-deep-key-value" });
      expect(JSON.stringify(sanitized), String(count)).toBe(JSON.stringify({ "[REDACTED]": "[REDACTED]" }));
    }
  });

  it("guard (green before and after the cure): introducers that no reading reaches add no readings, so the text stays listed", () => {
    // A 7-bit OSC (ESC ] ... BEL) is one unit in every reading, so no reading reads the 5,000 introducers in its body on
    // their own; a bound that counted introducers rather than readings would hide this text whole.
    const text = `visible-before ${ESC}]${deepCsi(5_000)}${BEL} visible-after`;
    for (const layout of LAYOUTS) {
      const shown = sanitizeWorkbenchText(text, 2000, layout);
      for (const stretch of ["visible-before", "visible-after"]) expect(shown, layout).toContain(stretch);
    }
  });
});
