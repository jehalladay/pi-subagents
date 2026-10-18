/**
 * wb-8bi: the display-safety oracle is ONE definition, test/helpers/unsafe-display.ts. Any other regular expression under test/
 * that behaves as that oracle must equal it byte for byte, and the suites that used to carry their own copy import it.
 *
 * Spec (bead wb-8bi): "UNSAFE_DISPLAY oracle drift: four sibling copies carry the unwidened form while graph-view, execute and
 * sanitizer-corpus carry the 19 wb-rqd units ... Cure shape: either hoist one shared oracle under test/helpers/ and import it from
 * every copy (parity pins become structural), or widen each copy with the 19 units plus a parity pin vs the sanitizer corpus.
 * Red-first: a unit the sanitizer rejects that an unwidened copy accepts."
 * Respin (gate row 478, R1(a) + R2(a) defaults): the control-reply, degradation-policy, detached-control and control-admission
 * copies migrate too, and the by-name line census is replaced by the by-body AST census in test/helpers/unsafe-display-census.ts,
 * which goes red on the gate's F1-F10 shapes, stays green on FR1/FR2, and ships the battery as its falsifier table (BATTERY).
 *
 * wb-85h (the row-514 follow-up; R484 moved wb-8bi's respin obligation here): the row-514 gate measured M-PARTIAL (deleting the
 * partial clause of the drift filter) surviving 89/89, the census header claiming more than the table pinned, the it.each
 * tables carrying no liveness pins, and the G23 empty-alternative collapse undisclosed. This table now adds the row-514 gate's
 * shapes (origin "row514", the gate's ids) and one sweep row per census clause a mutant battery found unkilled (origin
 * "sweep", W1-W23, each naming the mutant it kills), pins every origin's ids and the MIGRATED and PINNED_COPIES tables, pins the
 * census constants by value, and checks the census header against the table: the header cites only BATTERY rows, cites every
 * one, and lists each named residual with exactly the rows that pin it.
 */

import { mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";
import {
  CENSUS_EXTENSIONS,
  type CensusFile,
  censusOracles,
  censusRoot,
  importsValue,
  inCensusScope,
  ORACLE_CLASS_FLOOR,
  ORACLE_CLASSES,
  type OracleCensus,
  type Reading,
  readCensusFiles,
  readPattern,
  scanFile,
  TEXT_PROBES,
  WIDENING_NEIGHBOURS,
  WIDENING_UNITS,
} from "./helpers/unsafe-display-census.js";

const cp = (code: number): string => String.fromCodePoint(code);
const named = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;

/** The shared oracle's pattern body, and its unwidened twin: the body the seven drifted copies carried before wb-rqd widened it. */
const SHARED = UNSAFE_DISPLAY.source;
const LEGACY = String.raw`[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]`;
const WIDENED_RANGES = String.raw`\u{fff9}-\u{fffb}\u{13430}-\u{1343f}`;

describe("shared UNSAFE_DISPLAY oracle (wb-8bi)", () => {
  it("names all 19 wb-rqd units and 3 neighbours", () => {
    expect(WIDENING_UNITS).toHaveLength(19);
    expect(WIDENING_NEIGHBOURS).toHaveLength(3);
  });

  it.each(WIDENING_UNITS.map(code => [named(code), code] as const))("%s: the shared oracle flags it and stripUnsafeText drops it", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(true);
    expect(stripUnsafeText(cp(code))).toBe("");
  });

  it.each(WIDENING_NEIGHBOURS.map(code => [named(code), code] as const))("%s: the shared oracle and stripUnsafeText both keep it as text", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(false);
    expect(stripUnsafeText(cp(code))).toBe(cp(code));
  });
});

describe("census classifier calibration (wb-8bi respin)", () => {
  it("the classifier constants are the documented ones: five classes, a floor of four", () => {
    expect(ORACLE_CLASSES.map(oracleClass => oracleClass.name)).toEqual([
      "C0 controls",
      "DEL and C1 controls",
      "line and paragraph separators",
      "default-ignorable code points",
      "lone surrogates",
    ]);
    expect(ORACLE_CLASS_FLOOR).toBe(4);
  });

  it("the shared oracle refuses every sample of all five classes and keeps every text probe", () => {
    expect(readPattern(UNSAFE_DISPLAY.source, UNSAFE_DISPLAY.flags)).toEqual({ refused: ORACLE_CLASSES.map(oracleClass => oracleClass.name), keepsText: true });
  });

  it("every class sample is a unit the product sanitizer drops, and every text probe is one it keeps", () => {
    const survivors = ORACLE_CLASSES.flatMap(oracleClass => oracleClass.samples).filter(code => stripUnsafeText(`a${cp(code)}b`).includes(cp(code)));
    expect(survivors.map(named)).toEqual([]);
    expect(TEXT_PROBES.filter(code => stripUnsafeText(cp(code)) !== cp(code)).map(named)).toEqual([]);
  });

  it("the unwidened body is the shared body minus exactly the wb-rqd ranges", () => {
    expect(SHARED.includes(WIDENED_RANGES)).toBe(true);
    expect(SHARED.replace(WIDENED_RANGES, "")).toBe(LEGACY);
  });

  it("red-first: the unwidened body is still the oracle by behaviour, yet it accepts all 19 units the sanitizer rejects", () => {
    expect(readPattern(LEGACY, "u")).toEqual({ refused: ORACLE_CLASSES.map(oracleClass => oracleClass.name), keepsText: true });
    expect(WIDENING_UNITS.filter(code => stripUnsafeText(`a${cp(code)}b`) !== "ab").map(named)).toEqual([]);
    const census = censusOracles([{ path: "probe.test.ts", text: `export const UNSAFE = /${LEGACY}/u;\n` }], UNSAFE_DISPLAY);
    expect(census.drifted.map(drift => drift.detail)).toEqual([`accepts ${WIDENING_UNITS.map(named).join(" ")} (the shared oracle refuses them)`]);
  });

  it("F2: the census root is decoded, so a checkout path with a space still reads (new URL(...).pathname keeps %20)", () => {
    const moduleUrl = pathToFileURL("/tmp/a checkout/test/workbench-unsafe-display-oracle.test.ts").href;
    expect(new URL(".", moduleUrl).pathname).toBe("/tmp/a%20checkout/test/");
    expect(censusRoot(moduleUrl)).toBe("/tmp/a checkout/test");
  });
});

type Why =
  | "drift"
  | "not code"
  | "not the oracle"
  | "keeps no text"
  | "equal copy"
  | "out of scope"
  | "opaque"
  | "below the floor"
  | "uncompiled"
  | "residual"
  | "equal copies";

/** The census lists a row may pin by exact length (wb-85h). */
type Counted = "patterns" | "oracles" | "drifted" | "opaque" | "uncompiled";
const COUNTED: readonly Counted[] = ["patterns", "oracles", "drifted", "opaque", "uncompiled"];

/** One pattern a residual row pins: its holes and how the classifier read it. */
interface PlantedSite {
  readonly holes: number;
  readonly reading: Reading | undefined;
}

interface Row {
  readonly id: string;
  /**
   * "gate" rows re-author the 17 shapes row 478 names (the gate's planted texts were not available to this seat); "seat" rows
   * extend them; "row514" rows re-author the row-514 gate's shapes under its ids; "sweep" rows kill the census clauses a mutant
   * battery found unkilled (wb-85h).
   */
  readonly origin: "gate" | "seat" | "row514" | "sweep";
  readonly shape: string;
  readonly path: string;
  readonly text: string;
  readonly why: Why;
  /** For drift rows: a substring whose line the drift must name, and a substring of the drift detail. */
  readonly at?: string;
  readonly detail?: string;
  /** Exact census list lengths the row also pins (wb-85h). */
  readonly counts?: Readonly<Partial<Record<Counted, number>>>;
  /** The NAMED RESIDUAL of the census header the row pins (wb-85h): a blind mode whose silence the row holds, so a change either way is seen. */
  readonly residual?: string;
  /** For residual rows: every pattern the census read, in order. */
  readonly sites?: readonly PlantedSite[];
}

const quoted = (text: string): string => JSON.stringify(text);
/** The \uXXXX escape text of a code point, built from the number so no planted source (and no tool writing this file) carries the raw character. */
const escaped = (code: number): string => `\\u${code.toString(16).padStart(4, "0")}`;
const span = (from: number, to: number): string => `${escaped(from)}-${escaped(to)}`;
const suite = (...body: string[]): string =>
  ["import { describe, expect, it } from \"vitest\";", "", ...body, "", "describe(\"planted\", () => {", "  it(\"runs\", () => {", "    expect(\"text\").toMatch(/^text$/u);", "  });", "});", ""].join("\n");
const LEGACY_LITERAL = `/${LEGACY}/u`;
const ACCEPTS_RQD = `accepts ${WIDENING_UNITS.map(named).join(" ")}`;
const [CONTROLS, IGNORABLES, SURROGATES] = LEGACY.split("|") as [string, string, string];
const drift = (id: string, origin: Row["origin"], shape: string, text: string, at: string, detail = ACCEPTS_RQD, path = "workbench-planted.test.ts"): Row => ({
  id,
  origin,
  shape,
  path,
  text,
  why: "drift",
  at,
  detail,
});
const quiet = (id: string, origin: Row["origin"], shape: string, text: string, why: Exclude<Why, "drift">, path = "workbench-planted.test.ts"): Row => ({
  id,
  origin,
  shape,
  path,
  text,
  why,
});

/** wb-85h row builders: a residual row, an uncompiled row, a row with several equal copies, and the two decorations. */
const ALL_CLASSES = ORACLE_CLASSES.map(oracleClass => oracleClass.name);
const keepsNoText = (holes = 0): PlantedSite => ({ holes, reading: { refused: ALL_CLASSES, keepsText: false } });
const residual = (id: string, shape: string, text: string, name: string, sites: readonly PlantedSite[]): Row => ({
  id,
  origin: "row514",
  shape,
  path: "workbench-planted.test.ts",
  text,
  why: "residual",
  residual: name,
  sites,
});
const uncompiled = (id: string, origin: Row["origin"], shape: string, text: string): Row => ({ id, origin, shape, path: "workbench-planted.test.ts", text, why: "uncompiled", at: "new RegExp(" });
const equalCopies = (id: string, origin: Row["origin"], shape: string, text: string, oracles: number): Row => ({
  id,
  origin,
  shape,
  path: "workbench-planted.test.ts",
  text,
  why: "equal copies",
  counts: { oracles, drifted: 0, opaque: 0, uncompiled: 0 },
});
const counted = (row: Row, counts: Row["counts"]): Row => ({ ...row, counts });
const residualOf = (row: Row, name: string): Row => ({ ...row, residual: name });
const READ_CLEAN = { opaque: 0, uncompiled: 0 } as const;

/** Planted-text parts (wb-85h). Every escape is built from a number, so no planted text (and no tool writing this file) carries a raw character. */
const LEGACY_Q = quoted(LEGACY);
const SHARED_Q = quoted(SHARED);
const SHARED_LITERAL = `/${SHARED}/u`;
const [SHARED_CONTROLS, SHARED_IGNORABLES, SHARED_SURROGATES] = SHARED.split("|") as [string, string, string];
/** The text with every backslash doubled: what a template or a single-quoted string must spell to read back as the text. */
const doubled = (text: string): string => text.replace(/\\/g, "\\\\");
const SPELLED = "same verdict on every probe, spelled differently";
const partialDetail = (holes: number): string => `partial: ${holes} unread part(s) read as empty text`;
const RQD_REFUSED = `${ACCEPTS_RQD} (the shared oracle refuses them)`;
const IGNORABLE_SAMPLES = ORACLE_CLASSES.find(oracleClass => oracleClass.name === "default-ignorable code points")?.samples ?? [];
const pairEscaped = (code: number): string => escaped(0xd800 + ((code - 0x10000) >> 10)) + escaped(0xdc00 + ((code - 0x10000) & 0x3ff));
const HIGH_SURROGATES = `[${span(0xd800, 0xdbff)}]`;
const LOW_SURROGATES = `[${span(0xdc00, 0xdfff)}]`;
/**
 * A copy of the oracle that needs no u flag: BMP escapes, the default-ignorable samples listed (the astral ones as surrogate
 * pairs) and lone surrogates found by lookaround, so it keeps every text probe and refuses all five classes without flags.
 */
const U_LESS = [
  `[${span(0x00, 0x1f)}${span(0x7f, 0x9f)}${escaped(0x2028)}${escaped(0x2029)}]`,
  `[${IGNORABLE_SAMPLES.filter(code => code <= 0xffff)
    .map(escaped)
    .join("")}]`,
  ...IGNORABLE_SAMPLES.filter(code => code > 0xffff).map(pairEscaped),
  `${HIGH_SURROGATES}(?!${LOW_SURROGATES})`,
  `(?<!${HIGH_SURROGATES})${LOW_SURROGATES}`,
].join("|");
const chain = (empties: number): string => [...Array.from({ length: empties }, () => '""'), SHARED_Q].join(" + ");

/** The falsifier table: the gate's 17 shapes (5 controls, F1-F10, FR1, FR2), the seat's extensions, and wb-85h's row-514 and sweep rows, each planted alone. */
const BATTERY: readonly Row[] = [
  drift("C1", "gate", "control: const UNSAFE_DISPLAY at top level", suite(`const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("C2", "gate", "control: export const", suite(`export const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("C3", "gate", "control: the DISPLAY_UNSAFE spelling", suite(`const DISPLAY_UNSAFE = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift(
    "C4",
    "gate",
    "control: indented inside a test",
    ["import { expect, it } from \"vitest\";", "", "it(\"checks\", () => {", `    const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`, "    expect(\"text\").not.toMatch(UNSAFE_DISPLAY);", "});", ""].join("\n"),
    LEGACY_LITERAL,
  ),
  drift("C5", "gate", "control: a type annotation on the binding", suite(`const UNSAFE_DISPLAY: RegExp = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F5", "gate", "the initializer on the next line", suite("const UNSAFE_DISPLAY =", `  ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F1", "gate", "another name: UNSAFE", suite(`const UNSAFE = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F2", "gate", "another name: UNSAFE_OUTCOME", suite(`const UNSAFE_OUTCOME = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F3", "gate", "let", suite(`let UNSAFE_DISPLAY = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F4", "gate", "var", suite(`var UNSAFE_DISPLAY = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  drift("F6", "gate", "new RegExp over a string literal", suite(`const UNSAFE_DISPLAY = new RegExp(${quoted(LEGACY)}, "u");`), "new RegExp("),
  drift("F7", "gate", "a trailing comment", suite(`const UNSAFE_DISPLAY = ${LEGACY_LITERAL}; // the display oracle`), LEGACY_LITERAL),
  drift("F8", "gate", "no semicolon", suite(`const UNSAFE_DISPLAY = ${LEGACY_LITERAL}`, "const NEXT = 1"), LEGACY_LITERAL),
  drift("F9", "gate", "a non-test helper module", `export const UNSAFE_DISPLAY = ${LEGACY_LITERAL};\n`, LEGACY_LITERAL, ACCEPTS_RQD, "helpers/planted-display.ts"),
  drift("F10", "gate", "a second statement on the line", suite(`const LIMIT = 3; const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`), LEGACY_LITERAL),
  quiet("FR1", "gate", "inside a block comment", ["/*", `const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`, "*/", "export const NOTHING = 0;", ""].join("\n"), "not code"),
  quiet("FR2", "gate", "inside a template literal", ["export const SNIPPET = `", `const UNSAFE_DISPLAY = ${LEGACY_LITERAL};`, "`;", ""].join("\n"), "not code"),
  drift("S1", "seat", "no binding at all: an expect argument", suite(`it("inline", () => expect("text").not.toMatch(${LEGACY_LITERAL}));`), LEGACY_LITERAL),
  drift("S2", "seat", "an object property value", suite(`const ORACLES = { display: ${LEGACY_LITERAL} };`), LEGACY_LITERAL),
  drift("S3", "seat", "a static class field", suite("class Probe {", `  static readonly unsafe = ${LEGACY_LITERAL};`, "}", "export { Probe };"), LEGACY_LITERAL),
  drift("S4", "seat", "RegExp called without new", suite(`const UNSAFE = RegExp(${quoted(LEGACY)}, "u");`), "RegExp("),
  drift("S5", "seat", "globalThis.RegExp", suite(`const UNSAFE = new globalThis.RegExp(${quoted(LEGACY)}, "u");`), "new globalThis.RegExp("),
  drift("S6", "seat", "a String.raw template argument", suite(`const UNSAFE = new RegExp(String.raw\`${LEGACY}\`, "u");`), "new RegExp("),
  drift("S7", "seat", "a same-file const string argument", suite(`const BODY = ${quoted(LEGACY)};`, "const UNSAFE = new RegExp(BODY, \"u\");"), "new RegExp("),
  drift(
    "S8",
    "seat",
    "three concatenated alternatives",
    suite(`const UNSAFE = new RegExp(${[CONTROLS, IGNORABLES, SURROGATES].map(quoted).join(" + \"|\" + ")}, "u");`),
    "new RegExp(",
  ),
  drift("S9", "seat", ".source of a planted literal (the literal itself is the drift row)", suite(`const BASE = ${LEGACY_LITERAL};`, "const GLOBAL = new RegExp(BASE.source, \"gu\");"), LEGACY_LITERAL),
  drift("S10", "seat", ".source of a planted literal (the derived construction drifts too)", suite(`const BASE = ${LEGACY_LITERAL};`, "const GLOBAL = new RegExp(BASE.source, \"gu\");"), "new RegExp("),
  drift(
    "S11",
    "seat",
    "partly widened: FFF9-FFFB without the hieroglyph controls",
    suite(`const UNSAFE = /${SHARED.replace(String.raw`\u{13430}-\u{1343f}`, "")}/u;`),
    "const UNSAFE",
    `accepts ${WIDENING_UNITS.slice(3).map(named).join(" ")}`,
  ),
  drift("S12", "seat", "narrowed: the surrogate alternative lost (4 of 5 classes)", suite(`const UNSAFE = /${CONTROLS}|${IGNORABLES}/u;`), "const UNSAFE", "accepts U+D800 U+DBFF U+DC00 U+DFFF"),
  drift("S13", "seat", "narrowed: the default-ignorable alternative lost (4 of 5 classes)", suite(`const UNSAFE = /${CONTROLS}|${SURROGATES}/u;`), "const UNSAFE", "accepts U+00AD"),
  drift(
    "S14",
    "seat",
    "the shared verdicts under the DI alias spelling",
    suite(`const UNSAFE = /${SHARED.replace("Default_Ignorable_Code_Point", "DI")}/u;`),
    "const UNSAFE",
    "same verdict on every probe, spelled differently",
  ),
  drift("S15", "seat", "a .mts module", `export const UNSAFE = ${LEGACY_LITERAL};\n`, LEGACY_LITERAL, ACCEPTS_RQD, "helpers/planted.mts"),
  drift("S16", "seat", "a .mjs fixture", `export const UNSAFE = ${LEGACY_LITERAL};\n`, LEGACY_LITERAL, ACCEPTS_RQD, "fixtures/planted.mjs"),
  quiet("S17", "seat", "an equal copy under another name", suite(`const SAFE = /${SHARED}/u;`), "equal copy"),
  quiet("S18", "seat", "an equal copy with the g flag (g, y and d do not change a verdict)", suite(`const SAFE = /${SHARED}/gu;`), "equal copy"),
  quiet("S19", "seat", "the bidi and control guard (two classes)", suite(`const GUARD = /[${span(0x00, 0x1f)}${span(0x7f, 0x9f)}${span(0x202a, 0x202e)}${span(0x2066, 0x2069)}]/;`), "not the oracle"),
  quiet(
    "S20",
    "seat",
    "an explicit control, separator and bidi list (three classes: one under the floor)",
    suite(`const LIST = /[${span(0x00, 0x1f)}${span(0x7f, 0x9f)}${span(0x202a, 0x202e)}${span(0x2066, 0x2069)}${[0x2028, 0x2029, 0xfeff, 0x200b].map(escaped).join("")}]/;`),
    "not the oracle",
  ),
  quiet("S21", "seat", "the default-ignorable property alone", suite(String.raw`const IGNORABLE = /\p{Default_Ignorable_Code_Point}/u;`), "not the oracle"),
  quiet("S22", "seat", "a one-character class that also refuses spaces", suite(String.raw`const SEPARATOR = /^[\p{Default_Ignorable_Code_Point}\p{Cc}\p{Cs}\p{Zs}\p{Zl}\p{Zp}]$/u;`), "keeps no text"),
  quiet("S23", "seat", "a negated class", suite("const OTHER = /[^A-Za-z0-9]/;"), "keeps no text"),
  quiet("S24", "seat", "a line comment", `// const UNSAFE = ${LEGACY_LITERAL};\nexport const NOTHING = 0;\n`, "not code"),
  quiet("S25", "seat", "a string literal", `export const NOTE = ${quoted(`const UNSAFE = ${LEGACY_LITERAL};`)};\n`, "not code"),
  quiet("S26", "seat", "a JSDoc comment", `/** e.g. const UNSAFE = ${LEGACY_LITERAL}; */\nexport const NOTHING = 0;\n`, "not code"),
  residualOf(quiet("S27", "seat", "a Markdown file (outside the census extensions)", `const UNSAFE = ${LEGACY_LITERAL};\n`, "out of scope", "notes/planted.md"), "R7"),
  residualOf(quiet("S28", "seat", "BLIND BY DESIGN: a pattern from a call result (opaque, listed not classified)", suite("const UNSAFE = new RegExp(loadPattern(), \"u\");"), "opaque"), "R5"),
  residualOf(
  quiet(
    "S29",
    "seat",
    "BLIND BY DESIGN: a pattern from an import (opaque, listed not classified)",
    suite("import { BODY } from \"./planted-body.js\";", "const UNSAFE = new RegExp(BODY, \"u\");"),
    "opaque",
  ),
  "R5",
  ),
  residualOf(quiet("S30", "seat", "BLIND BY DESIGN: narrowed below the floor (controls and separators only, three classes)", suite(`const UNSAFE = /${CONTROLS}/u;`), "below the floor"), "R4"),
  // wb-85h: the row-514 gate's shapes (its battery ids), re-authored here; the residual rows pin what the census does NOT catch.
  drift("G1a", "row514", "a .cts module", `export const UNSAFE = ${LEGACY_LITERAL};\n`, LEGACY_LITERAL, ACCEPTS_RQD, "helpers/planted.cts"),
  drift("G1b", "row514", "a .cjs module.exports property", `module.exports = { UNSAFE: ${LEGACY_LITERAL} };\n`, LEGACY_LITERAL, ACCEPTS_RQD, "fixtures/planted.cjs"),
  drift(
    "G1c",
    "row514",
    "a .tsx module with JSX",
    `const UNSAFE = ${LEGACY_LITERAL};\nexport const View = () => <div title="x">{String(UNSAFE)}</div>;\n`,
    LEGACY_LITERAL,
    ACCEPTS_RQD,
    "workbench-planted.test.tsx",
  ),
  drift("G1d", "row514", "a .jsx module with JSX", `const UNSAFE = ${LEGACY_LITERAL};\nexport const View = () => <span>{UNSAFE.source}</span>;\n`, LEGACY_LITERAL, ACCEPTS_RQD, "fixtures/planted.jsx"),
  drift("G2", "row514", "the i flag", suite(`const UNSAFE = /${LEGACY}/ui;`), `/${LEGACY}/ui`),
  drift("G3", "row514", "the v flag (unicode sets)", suite(`const UNSAFE = /${LEGACY}/v;`), `/${LEGACY}/v`),
  drift("G4", "row514", "the property-escape spelling (Cc, Cs)", suite(String.raw`const UNSAFE = /\p{Cc}|[\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|\p{Cs}/u;`), "const UNSAFE"),
  drift("G5", "row514", "a no-substitution template argument", suite(`const UNSAFE = new RegExp(\`${doubled(LEGACY)}\`, "u");`), "new RegExp("),
  drift("G6", "row514", "flags from a same-file const", suite('const FLAGS = "u";', `const BODY = ${LEGACY_Q};`, "const UNSAFE = new RegExp(BODY, FLAGS);"), "new RegExp("),
  residualOf(quiet("G7", "row514", "OPAQUE: String.prototype.concat over a binding", suite(`const BODY = ${LEGACY_Q};`, 'const UNSAFE = new RegExp("".concat(BODY), "u");'), "opaque"), "R5"),
  residualOf(
    quiet(
      "G8",
      "row514",
      "OPAQUE: join over a same-file const array binding (not an array literal)",
      suite(`const UNSAFE_PARTS = [${[CONTROLS, IGNORABLES, SURROGATES].map(quoted).join(", ")}];`, 'const UNSAFE = new RegExp(UNSAFE_PARTS.join("|"), "u");'),
      "opaque",
    ),
    "R5",
  ),
  residualOf(quiet("G9", "row514", "OPAQUE: a same-file factory over a parameter", suite('const oracle = (body: string): RegExp => new RegExp(body, "u");', `const UNSAFE = oracle(${LEGACY_Q});`), "opaque"), "R5"),
  residual("G10", "Reflect.construct(RegExp, ...) is not read at all", `export const UNSAFE = Reflect.construct(RegExp, [${LEGACY_Q}, "u"]) as RegExp;\n`, "R2", []),
  residual("G11", "an aliased constructor is not read at all", `const R = RegExp;\nexport const UNSAFE = new R(${LEGACY_Q}, "u");\n`, "R2", []),
  residual(
    "G12",
    "an oracle split across two patterns, each under the floor",
    [`const CONTROL = /${CONTROLS}/u;`, `const INVISIBLE = /${IGNORABLES}|${SURROGATES}/u;`, "export const unsafe = (text: string): boolean => CONTROL.test(text) || INVISIBLE.test(text);", ""].join("\n"),
    "R4",
    [
      { holes: 0, reading: { refused: ["C0 controls", "DEL and C1 controls", "line and paragraph separators"], keepsText: true } },
      { holes: 0, reading: { refused: ["default-ignorable code points", "lone surrogates"], keepsText: true } },
    ],
  ),
  residual("G13a", "the unwidened body plus combining marks refuses a text probe (U+0301)", `export const UNSAFE = /${LEGACY}|\\p{Mn}/u;\n`, "R3", [keepsNoText()]),
  residual("G13b", "the unwidened body plus emoji refuses a text probe (U+1F600)", `export const UNSAFE = /${LEGACY}|\\p{Extended_Pictographic}/u;\n`, "R3", [keepsNoText()]),
  residual("G13c", "the unwidened body plus a CJK block refuses a text probe (U+4E2D)", `export const UNSAFE = /${LEGACY}|[\\u{4e00}-\\u{9fff}]/u;\n`, "R3", [keepsNoText()]),
  drift(
    "G14",
    "row514",
    "a template whose substitution evaluates",
    suite(`const HEAD = ${quoted(CONTROLS)};`, `const UNSAFE = new RegExp(\`\${HEAD}|${doubled(IGNORABLES)}|${doubled(SURROGATES)}\`, "u");`),
    "new RegExp(",
  ),
  residual("G15", 'globalThis["RegExp"] is not read at all', `export const UNSAFE = new globalThis["RegExp"](${LEGACY_Q}, "u");\n`, "R2", []),
  counted(drift("G16", "row514", "a nested construction (both drift: the outer one is read through the inner)", suite(`const UNSAFE = new RegExp(new RegExp(${LEGACY_Q}, "u"));`), "new RegExp(new RegExp("), {
    drifted: 2,
    opaque: 0,
  }),
  drift("G17", "row514", "a satisfies wrapper on the literal", suite(`const UNSAFE = (${LEGACY_LITERAL}) satisfies RegExp;`), LEGACY_LITERAL),
  residualOf(uncompiled("G18", "row514", "UNCOMPILED: a legitimate regex-escape helper (a backslash plus a parameter)", 'export const escapedChar = (ch: string): RegExp => new RegExp("\\\\" + ch);\n'), "R6"),
  drift("G19", "row514", "partly widened: the hieroglyph controls without FFF9-FFFB", suite(`const UNSAFE = /${SHARED.replace(String.raw`\u{fff9}-\u{fffb}`, "")}/u;`), "const UNSAFE", `accepts ${WIDENING_UNITS.slice(0, 3).map(named).join(" ")}`),
  drift("G20", "row514", "over-widened by one unit (U+FFFC)", suite(`const UNSAFE = /${SHARED}|\\u{fffc}/u;`), "const UNSAFE", "refuses U+FFFC (the shared oracle keeps them)"),
  drift("G21", "row514", "inside an it.each table", ['describe("planted", () => {', `  it.each([[${LEGACY_LITERAL}]])("row", re => expect("a").not.toMatch(re));`, "});", ""].join("\n"), LEGACY_LITERAL),
  drift("G22", "row514", "a Map initializer entry", suite(`const LOOKUP = new Map<string, RegExp>([["display", ${LEGACY_LITERAL}]]);`), LEGACY_LITERAL),
  residual(
    "G23",
    'the empty-alternative collapse: BODY + "|" + a parameter reads as BODY|, an empty alternative that matches every input',
    `const BODY = ${LEGACY_Q};\nexport const build = (extra: string): RegExp => new RegExp(BODY + "|" + extra, "u");\n`,
    "R1",
    [keepsNoText(1)],
  ),
  drift(
    "G24",
    "row514",
    "PARTIAL: a hole inside the unwidened control class",
    `export const build = (extra: string): RegExp => new RegExp(${quoted(CONTROLS.slice(0, -1))} + extra + ${quoted(`]|${IGNORABLES}|${SURROGATES}`)}, "u");\n`,
    "new RegExp(",
    `${RQD_REFUSED}; ${partialDetail(1)}`,
  ),
  drift("G25", "row514", "PARTIAL: a parameter before the unwidened body", `export const build = (extra: string): RegExp => new RegExp(extra + ${LEGACY_Q}, "u");\n`, "new RegExp(", `${RQD_REFUSED}; ${partialDetail(1)}`),
  uncompiled("G26", "row514", "UNCOMPILED: flags from a parameter (the u-only body read without flags does not compile)", `export const build = (flags: string): RegExp => new RegExp(${LEGACY_Q}, flags);\n`),
  drift("G27", "row514", "PARTIAL: the shared body plus a parameter suffix (kills M-PARTIAL)", `export const build = (suffix: string): RegExp => new RegExp(${SHARED_Q} + suffix, "u");\n`, "new RegExp(", `${SPELLED}; ${partialDetail(1)}`),
  residualOf(
    quiet("N1", "row514", "OPAQUE: .source of the imported shared oracle (the legitimate derived global)", ['import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";', 'export const GLOBAL = new RegExp(UNSAFE_DISPLAY.source, "gu");', ""].join("\n"), "opaque"),
    "R5",
  ),
  counted(quiet("N2", "row514", "an equal copy through String.raw", `export const SAFE = new RegExp(String.raw\`${SHARED}\`, "u");\n`, "equal copy"), READ_CLEAN),
  counted(quiet("N3", "row514", "an equal copy through concatenation", `export const SAFE = new RegExp(${quoted(SHARED.slice(0, 20))} + ${quoted(SHARED.slice(20))}, "u");\n`, "equal copy"), READ_CLEAN),
  quiet("N4", "row514", "regex-looking JSX text in a .tsx module", `export const View = () => <div>${LEGACY_LITERAL}</div>;\n`, "not code", "workbench-planted-view.test.tsx"),
  quiet("N5", "row514", "a division chain", "const a = 4, b = 2, c = 1;\nexport const r = a / b / c;\n", "not code"),
  quiet("N6", "row514", "regex text inside a string inside a template substitution", `export const SNIPPET = \`\${'/* const UNSAFE = /${doubled(LEGACY)}/u; */'}\`;\n`, "not code"),
  quiet("HR3", "row514", "a line comment after code on the same line", `const a = 1; // const UNSAFE = ${LEGACY_LITERAL};\nexport { a };\n`, "not code"),
  // wb-85h sweep: one row per census clause the mutant battery found unkilled by the landed table, naming the mutant it kills.
  drift("W1", "sweep", "READ: a .js module (kills M-EXT.js)", `export const UNSAFE = ${LEGACY_LITERAL};\n`, LEGACY_LITERAL, ACCEPTS_RQD, "fixtures/planted.js"),
  quiet("W2", "sweep", "READ: JSX text in a .jsx module is not a pattern (kills M-KIND-JSX)", `export const View = () => <div>${LEGACY_LITERAL}</div>;\n`, "not code", "fixtures/planted-view.jsx"),
  quiet("W3", "sweep", "READ: JSX text in a .js module is not a pattern (kills M-KIND-JS)", `export const View = () => <div>${LEGACY_LITERAL}</div>;\n`, "not code", "fixtures/planted-view.js"),
  counted(
    quiet(
      "W4",
      "sweep",
      "EVALUATOR: every wrapper around a same-file binding: parentheses, a type assertion, as, satisfies, ! (kills M-UNWRAP-*, M-KIND-TS)",
      `const BODY = ${SHARED_Q};\nexport const SAFE = new RegExp(((<string>(BODY as string)) satisfies string)!, "u");\n`,
      "equal copy",
    ),
    READ_CLEAN,
  ),
  drift("W5", "sweep", "PATTERNS: a parenthesized RegExp callee (kills M-CALLEE-UNWRAP)", suite(`const UNSAFE = new (RegExp)(${LEGACY_Q}, "u");`), "new (RegExp)("),
  quiet("W6", "sweep", "PATTERNS: RegExp() with no argument reads as the empty pattern (kills M-NOARG)", "export const EMPTY = new RegExp();\n", "keeps no text"),
  counted(quiet("W7", "sweep", "EVALUATOR: a numeric-literal part (kills M-TXT-NUMERIC)", `export const SAFE = new RegExp(${SHARED.split("2028").map(quoted).join(" + 2028 + ")}, "u");\n`, "equal copy"), READ_CLEAN),
  counted(
    quiet(
      "W8",
      "sweep",
      "EVALUATOR: String.raw with a substitution (kills M-TXT-RAW-SPANS)",
      `const HEAD = ${quoted(SHARED_CONTROLS)};\nexport const SAFE = new RegExp(String.raw\`\${HEAD}|${SHARED_IGNORABLES}|${SHARED_SURROGATES}\`, "u");\n`,
      "equal copy",
    ),
    READ_CLEAN,
  ),
  residualOf(
    quiet(
      "W9",
      "sweep",
      "EVALUATOR: a name declared twice is a hole, so the construction is OPAQUE (kills M-EXACTLY-ONE)",
      ["export function other(): string {", '  const BODY = "x";', "  return BODY;", "}", `const BODY = ${SHARED_Q};`, 'export const COPY = new RegExp(BODY, "u");', ""].join("\n"),
      "opaque",
    ),
    "R5",
  ),
  equalCopies("W10", "sweep", "EVALUATOR: .flags of a same-file literal (kills M-TXT-FLAGS)", `const BASE = ${SHARED_LITERAL};\nexport const COPY = new RegExp(BASE.source, BASE.flags);\n`, 2),
  equalCopies("W11", "sweep", "EVALUATOR: .source of a same-file construction (kills M-REGEX-CONSTRUCTION)", `const BASE = new RegExp(${SHARED_Q}, "u");\nexport const COPY = new RegExp(BASE.source, "u");\n`, 2),
  equalCopies(
    "W12",
    "sweep",
    "EVALUATOR: a regular expression as the pattern argument, its flags replaced or kept (kills M-INNER, M-INNER-FLAGS)",
    `const BASE = ${SHARED_LITERAL};\nexport const GLOBAL = new RegExp(BASE, "gu");\nexport const SAME = new RegExp(BASE);\n`,
    3,
  ),
  counted(
    quiet(
      "W13",
      "sweep",
      'EVALUATOR: [...].join("|") over an array literal (kills M-JOIN, M-JOIN-SEP, M-TXT-CALL)',
      `export const SAFE = new RegExp([${[SHARED_CONTROLS, SHARED_IGNORABLES, SHARED_SURROGATES].map(quoted).join(", ")}].join("|"), "u");\n`,
      "equal copy",
    ),
    READ_CLEAN,
  ),
  drift(
    "W14",
    "sweep",
    "EVALUATOR: [...].join() reads its separator as a comma (kills M-JOIN-DEFAULT)",
    `export const COMMA = new RegExp([${quoted(SHARED.slice(0, SHARED.indexOf(String.raw`\u{fff9}`)))}, ${quoted(SHARED.slice(SHARED.indexOf(String.raw`\u{fff9}`)))}].join(), "u");\n`,
    "new RegExp(",
    SPELLED,
  ),
  counted(quiet("W15", "sweep", "EVALUATOR: String.fromCodePoint of numeric literals (kills M-FROMCODEPOINT)", `export const SAFE = new RegExp(String.fromCodePoint(91) + ${quoted(SHARED.slice(1))}, "u");\n`, "equal copy"), READ_CLEAN),
  counted(quiet("W16", "sweep", "EVALUATOR: String.fromCharCode of numeric literals (kills M-FROMCHARCODE)", `export const SAFE = new RegExp(String.fromCharCode(91) + ${quoted(SHARED.slice(1))}, "u");\n`, "equal copy"), READ_CLEAN),
  counted(quiet("W17", "sweep", "EVALUATOR: an eight-part + chain is read whole (the near side of the depth bound)", `export const SAFE = new RegExp(${chain(7)}, "u");\n`, "equal copy"), READ_CLEAN),
  drift("W18", "sweep", "PARTIAL: a nine-part + chain nests past the depth bound, so two parts are holes (kills M-DEPTH)", `export const DEEP = new RegExp(${chain(8)}, "u");\n`, "new RegExp(", `${SPELLED}; ${partialDetail(2)}`),
  drift("W19", "sweep", "PARTIAL: a parameter before the shared body (kills M-PARTIAL)", `export const build = (prefix: string): RegExp => new RegExp(prefix + ${SHARED_Q}, "u");\n`, "new RegExp(", `${SPELLED}; ${partialDetail(1)}`),
  drift(
    "W20",
    "sweep",
    "PARTIAL: a hole inside the shared body's control class (kills M-PARTIAL)",
    `export const build = (extra: string): RegExp => new RegExp(${quoted(SHARED_CONTROLS.slice(0, -1))} + extra + ${quoted(`]|${SHARED_IGNORABLES}|${SHARED_SURROGATES}`)}, "u");\n`,
    "new RegExp(",
    `${SPELLED}; ${partialDetail(1)}`,
  ),
  drift(
    "W21",
    "sweep",
    "PARTIAL: the unwidened body plus a parameter suffix names what it accepts and its hole (kills M-PARTIAL-DETAIL)",
    `export const build = (suffix: string): RegExp => new RegExp(${LEGACY_Q} + suffix, "u");\n`,
    "new RegExp(",
    `${RQD_REFUSED}; ${partialDetail(1)}`,
  ),
  drift(
    "W22",
    "sweep",
    "PARTIAL: a u-less copy whose flags come from a parameter: the flags hole counts (kills M-HOLES-FLAGS)",
    `export const build = (flags: string): RegExp => new RegExp(${quoted(U_LESS)}, flags);\n`,
    "new RegExp(",
    partialDetail(1),
  ),
  drift("W23", "sweep", "VERDICT: the shared body with the i flag drifts, flags being part of the pin (kills M-PIN-FLAGS)", `export const CASELESS = /${SHARED}/ui;\n`, "CASELESS", SPELLED),
];

const GATE_IDS = ["C1", "C2", "C3", "C4", "C5", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "FR1", "FR2"];
/** wb-85h U2 each-liveness: every origin's row ids, pinned in table order, so dropping or emptying any origin's rows goes red. */
const SEAT_IDS = Array.from({ length: 30 }, (_, at) => `S${at + 1}`);
const ROW514_IDS = [
  "G1a",
  "G1b",
  "G1c",
  "G1d",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "G8",
  "G9",
  "G10",
  "G11",
  "G12",
  "G13a",
  "G13b",
  "G13c",
  "G14",
  "G15",
  "G16",
  "G17",
  "G18",
  "G19",
  "G20",
  "G21",
  "G22",
  "G23",
  "G24",
  "G25",
  "G26",
  "G27",
  "N1",
  "N2",
  "N3",
  "N4",
  "N5",
  "N6",
  "HR3",
];
const SWEEP_IDS = Array.from({ length: 23 }, (_, at) => `W${at + 1}`);
/** The census header's NAMED RESIDUALS, in header order. */
const RESIDUAL_IDS = ["R1", "R2", "R3", "R4", "R5", "R6", "R7"];
const lineOf = (text: string, needle: string): number => text.slice(0, text.indexOf(needle)).split("\n").length;
const plant = (row: Row): OracleCensus => censusOracles([{ path: row.path, text: row.text }].filter(file => inCensusScope(file.path)), UNSAFE_DISPLAY);

describe("display-oracle census falsifier table (wb-8bi respin, R2(a))", () => {
  it("carries the gate's 17 shapes, each id once, and every row plants a non-empty file", () => {
    expect(BATTERY.filter(row => row.origin === "gate").map(row => row.id).sort()).toEqual([...GATE_IDS].sort());
    expect(new Set(BATTERY.map(row => row.id)).size).toBe(BATTERY.length);
    for (const row of BATTERY) expect(row.text.length, row.id).toBeGreaterThan(0);
  });

  it("pins every origin's rows by id in table order, so dropping or emptying any origin's rows goes red (wb-85h U2)", () => {
    const ids = (origin: Row["origin"]): string[] => BATTERY.filter(row => row.origin === origin).map(row => row.id);
    expect(ids("gate").sort()).toEqual([...GATE_IDS].sort());
    expect(ids("seat")).toEqual(SEAT_IDS);
    expect(ids("row514")).toEqual(ROW514_IDS);
    expect(ids("sweep")).toEqual(SWEEP_IDS);
    expect(BATTERY).toHaveLength(GATE_IDS.length + SEAT_IDS.length + ROW514_IDS.length + SWEEP_IDS.length);
    for (const row of BATTERY.filter(candidate => candidate.why === "residual")) expect(row.sites, row.id).toBeDefined();
  });

  it.each(BATTERY)("$id ($origin) $shape: $why", row => {
    const census = plant(row);
    switch (row.why) {
      case "drift": {
        const at = row.at ?? "";
        expect(row.text.includes(at), `${row.id}: the marker is in the planted text`).toBe(true);
        const sites = census.drifted.map(found => `${found.site.path}:${found.site.line}`);
        expect(sites, row.id).toContain(`${row.path}:${lineOf(row.text, at)}`);
        expect(census.drifted.map(found => found.detail).join(" | "), row.id).toContain(row.detail ?? "");
        break;
      }
      case "not code":
        expect(census.patterns, row.id).toEqual([]);
        expect(census.opaque, row.id).toEqual([]);
        break;
      case "not the oracle":
      case "keeps no text":
      case "below the floor": {
        const planted = census.patterns.filter(site => site.binding !== undefined);
        expect(planted, row.id).toHaveLength(1);
        expect(census.oracles, row.id).toEqual([]);
        const reading = readPattern(planted[0]?.source ?? "", planted[0]?.flags ?? "");
        if (row.why === "keeps no text") expect(reading?.keepsText, row.id).toBe(false);
        else expect(reading?.keepsText, row.id).toBe(true);
        if (row.why === "below the floor") expect(reading?.refused, row.id).toEqual(["C0 controls", "DEL and C1 controls", "line and paragraph separators"]);
        if (row.why === "not the oracle") expect(reading?.refused.length, row.id).toBeLessThan(ORACLE_CLASS_FLOOR);
        break;
      }
      case "equal copy":
        expect(census.oracles, row.id).toHaveLength(1);
        expect(census.drifted, row.id).toEqual([]);
        break;
      case "out of scope":
        expect(census.files, row.id).toEqual([]);
        expect(CENSUS_EXTENSIONS.includes(extname(row.path)), row.id).toBe(false);
        break;
      case "opaque":
        expect(census.opaque.map(site => site.line), row.id).toEqual([lineOf(row.text, "new RegExp(")]);
        expect(census.patterns.filter(site => site.via === "RegExp"), row.id).toEqual([]);
        break;
      case "uncompiled":
        expect(census.uncompiled.map(site => site.line), row.id).toEqual([lineOf(row.text, row.at ?? "")]);
        expect(census.oracles, row.id).toEqual([]);
        expect(census.opaque, row.id).toEqual([]);
        break;
      case "residual":
        expect(census.oracles, row.id).toEqual([]);
        expect(census.opaque, row.id).toEqual([]);
        expect(census.uncompiled, row.id).toEqual([]);
        expect(
          census.patterns.map(site => ({ holes: site.holes, reading: readPattern(site.source, site.flags) })),
          row.id,
        ).toEqual(row.sites);
        break;
      case "equal copies":
        expect(row.counts?.oracles, row.id).toBeGreaterThan(1);
        break;
    }
    for (const key of COUNTED) {
      const expected = row.counts?.[key];
      if (expected !== undefined) expect(census[key], `${row.id} ${key}`).toHaveLength(expected);
    }
    if (row.why !== "drift") expect(census.drifted, row.id).toEqual([]);
  });
});

const TEST_DIR = censusRoot(import.meta.url);
/** The four declarations that stay where they are (graph-view's sits in its verbatim corpus segment), pinned equal by the census. */
const PINNED_COPIES = ["workbench-sanitizer-corpus.test.ts", "workbench-execute.test.ts", "workbench-graph-view.test.ts", "workbench-forge-control.test.ts"];
/** The suites that carried their own copy and import the shared oracle instead: four from the first cut, four from the respin. */
const MIGRATED = [
  "workbench-claude-evidence.test.ts",
  "workbench-claude-transcript-privacy.test.ts",
  "workbench-inspector-timeline.test.ts",
  "workbench-pi-ingest-clamp.test.ts",
  "workbench-control-reply.test.ts",
  "workbench-degradation-policy.test.ts",
  "workbench-detached-control.test.ts",
  "workbench-control-admission.test.ts",
];

let files: CensusFile[] = [];
let census: OracleCensus;

describe("display-oracle copy census over test/ (wb-8bi respin)", () => {
  beforeAll(() => {
    files = readCensusFiles(TEST_DIR);
    census = censusOracles(files, UNSAFE_DISPLAY);
  }, 120_000);

  it("reads every module under test/ whatever its name or depth (an independent recursive listing agrees)", () => {
    const listed = readdirSync(TEST_DIR, { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && CENSUS_EXTENSIONS.includes(extname(entry.name)))
      .map(entry => `${entry.parentPath}/${entry.name}`.slice(TEST_DIR.length + 1))
      .sort();
    expect(files.map(file => file.path).sort()).toEqual(listed);
    for (const expected of ["helpers/unsafe-display.ts", "helpers/unsafe-display-census.ts", "helpers/scratch.ts", "perf/viewer.bench.ts", "fixtures/ext-alpha.mjs"]) {
      expect(census.files, expected).toContain(expected);
    }
  });

  it("finds the shared helper's own literal and the four pinned copies as oracles (never vacuous)", () => {
    const oracleFiles = new Set(census.oracles.map(site => site.path));
    for (const expected of ["helpers/unsafe-display.ts", ...PINNED_COPIES]) expect(oracleFiles.has(expected), expected).toBe(true);
  });

  it("every display-safety oracle under test/ equals test/helpers/unsafe-display.ts byte for byte, so no copy can lag a widening", () => {
    const drifted = census.drifted.map(found => `${found.site.path}:${found.site.line} ${found.site.binding ?? "(no binding)"} ${found.detail}`);
    expect(drifted).toEqual([]);
  });

  it.each(MIGRATED)("%s imports UNSAFE_DISPLAY from the shared helper and declares no oracle of its own", name => {
    const file = files.find(candidate => candidate.path === name);
    expect(file, name).toBeDefined();
    if (file === undefined) return;
    expect(importsValue(file, "./helpers/unsafe-display.js", "UNSAFE_DISPLAY")).toBe(true);
    expect(census.oracles.filter(site => site.path === name).map(site => `${site.line} ${site.binding ?? ""}`)).toEqual([]);
  });

  it("every pattern the census read compiles under its own flags (a partial read that does not compile is listed, never dropped)", () => {
    expect(census.uncompiled.map(site => `${site.path}:${site.line}`)).toEqual([]);
  });

  it("each-liveness (wb-85h U2): MIGRATED holds the eight migrated suites and PINNED_COPIES the four pinned copies, each once, so neither loop can empty unseen", () => {
    expect(MIGRATED).toHaveLength(8);
    expect(new Set(MIGRATED).size).toBe(MIGRATED.length);
    expect(PINNED_COPIES).toHaveLength(4);
    expect(new Set(PINNED_COPIES).size).toBe(PINNED_COPIES.length);
  });
});

describe("census helper contracts (wb-85h)", () => {
  it("the read extensions, the text probes and every class's samples are the documented ones, pinned by value (none can be dropped, emptied or thinned unseen)", () => {
    expect(CENSUS_EXTENSIONS).toEqual([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);
    expect(TEXT_PROBES).toEqual([0x61, 0x5a, 0x30, 0x20, 0x2d, 0x7e, 0xe9, 0x301, 0x3b1, 0x4e2d, 0x1f600]);
    expect(ORACLE_CLASSES.map(oracleClass => [oracleClass.name, oracleClass.samples])).toEqual([
      ["C0 controls", [0x00, 0x01, 0x07, 0x09, 0x0a, 0x0d, 0x1b, 0x1f]],
      ["DEL and C1 controls", [0x7f, 0x80, 0x85, 0x9b, 0x9f]],
      ["line and paragraph separators", [0x2028, 0x2029]],
      [
        "default-ignorable code points",
        [0xad, 0x34f, 0x61c, 0x115f, 0x17b4, 0x180e, 0x200b, 0x200e, 0x202a, 0x2060, 0x2066, 0x3164, 0xfe00, 0xfeff, 0xffa0, 0xfff0, 0x1bca0, 0x1d173, 0xe0001, 0xe0100, 0xe0fff],
      ],
      ["lone surrogates", [0xd800, 0xdbff, 0xdc00, 0xdfff]],
    ]);
  });

  it("names the binding a pattern initializes (a variable, a property, a class field, an assignment target, through wrappers) and none for an argument", () => {
    const text = [
      "export const VARIABLE = /a/u;",
      "export const OBJECT = { property: /b/u };",
      "export class Holder {",
      "  static field = /c/u;",
      "}",
      "export let target: RegExp | undefined;",
      "target = /d/u;",
      "export const WRAPPED = (/e/u) satisfies RegExp;",
      "export const CALLED = String(/f/u);",
      "",
    ].join("\n");
    expect(scanFile({ path: "bindings.ts", text }).patterns.map(site => [site.line, site.binding ?? null])).toEqual([
      [1, "VARIABLE"],
      [2, "property"],
      [4, "field"],
      [7, "target"],
      [8, "WRAPPED"],
      [9, null],
    ]);
  });

  it("importsValue reads a value import under any local alias, and never a type-only one, another module, another name or a namespace import", () => {
    const specifier = "./helpers/unsafe-display.js";
    const reads = (statement: string): boolean => importsValue({ path: "imports.ts", text: `${statement}\n` }, specifier, "UNSAFE_DISPLAY");
    expect(reads(`import { UNSAFE_DISPLAY } from "${specifier}";`)).toBe(true);
    expect(reads(`import { UNSAFE_DISPLAY as ORACLE } from "${specifier}";`)).toBe(true);
    expect(reads(`import type { UNSAFE_DISPLAY } from "${specifier}";`)).toBe(false);
    expect(reads(`import { type UNSAFE_DISPLAY } from "${specifier}";`)).toBe(false);
    expect(reads('import { UNSAFE_DISPLAY } from "./elsewhere.js";')).toBe(false);
    expect(reads(`import { OTHER as UNSAFE_DISPLAY } from "${specifier}";`)).toBe(false);
    expect(reads(`import * as oracle from "${specifier}";`)).toBe(false);
  });
});

installScratchLeakGuard();

describe("census READ over a planted tree (wb-85h)", () => {
  // U+1D400 sorts before U+FF21 by UTF-16 code unit (0xD835 < 0xFF21) and after it by UTF-8 byte (0xF0 > 0xEF)
  const ASTRAL = `${String.fromCodePoint(0x1d400)}.ts`;
  const FULLWIDTH = `${String.fromCodePoint(0xff21)}.ts`;
  let root = "";
  beforeAll(() => {
    root = makeScratch("wb-85h-census-");
    const inside = join(root, "census-root");
    const copy = `export const UNSAFE = ${LEGACY_LITERAL};\n`;
    // created out of name order; on Linux the directory read itself already returns byte order (libuv scandir sorts each
    // directory with strcmp), so these names alone cannot catch a dropped sort: the order-root pair below can
    mkdirSync(join(inside, "inner", "deeper"), { recursive: true });
    mkdirSync(join(root, "outside-dir"));
    writeFileSync(join(inside, "z.ts"), copy);
    writeFileSync(join(inside, "inner", "m.cts"), copy);
    writeFileSync(join(inside, "inner", "deeper", "k.mts"), copy);
    writeFileSync(join(inside, "notes.md"), copy);
    writeFileSync(join(inside, "a.ts"), "export const NOTHING = 0;\n");
    writeFileSync(join(root, "outside.ts"), copy);
    writeFileSync(join(root, "outside-dir", "x.ts"), copy);
    symlinkSync(join(root, "outside.ts"), join(inside, "link.ts"));
    symlinkSync(join(root, "outside-dir"), join(inside, "linked"));
    mkdirSync(join(root, "order-root"));
    writeFileSync(join(root, "order-root", FULLWIDTH), "export const NOTHING = 0;\n");
    writeFileSync(join(root, "order-root", ASTRAL), "export const NOTHING = 0;\n");
  });
  afterAll(() => removeScratch(root));

  it("reads every census-extension file under the root at any depth, in name order within each directory, and never a symbolic link, a file outside the root or another extension", () => {
    const planted = readCensusFiles(join(root, "census-root"));
    expect(planted.map(file => file.path)).toEqual(["a.ts", "inner/deeper/k.mts", "inner/m.cts", "z.ts"]);
    expect(censusOracles(planted, UNSAFE_DISPLAY).drifted.map(found => found.site.path)).toEqual(["inner/deeper/k.mts", "inner/m.cts", "z.ts"]);
  });

  it("orders each directory by UTF-16 code unit, which is not the byte order a directory read returns: U+1D400 before U+FF21, so a walk that dropped its sort goes red", () => {
    expect(readCensusFiles(join(root, "order-root")).map(file => file.path)).toEqual([ASTRAL, FULLWIDTH]);
  });
});

/** Every "(rows ...)" citation in a text, as row ids (a group may run onto the next comment line, so the leading "*" is skipped). */
const cited = (text: string): string[] => [...text.matchAll(/\(rows\s([^)]*)\)/g)].flatMap(match => (match[1] ?? "").split(/[\s,*]+/).filter(id => id !== ""));
/** The header's list items: each " * - " line with its continuation lines, up to a blank comment line. */
const headerItems = (header: string): string[] => header.split("\n * - ").slice(1).map(item => item.split("\n *\n")[0] ?? "");

describe("census header enumeration (wb-85h)", () => {
  const header = (): string => readFileSync(join(TEST_DIR, "helpers", "unsafe-display-census.ts"), "utf8").split("*/")[0] ?? "";

  it("the census header cites only BATTERY rows and cites every BATTERY row: it claims exactly what the falsifier table pins", () => {
    const ids = new Set(BATTERY.map(row => row.id));
    const citations = cited(header());
    expect(citations.filter(id => !ids.has(id))).toEqual([]);
    expect([...ids].filter(id => !citations.includes(id))).toEqual([]);
  });

  it("the census header lists every named residual with exactly the rows that pin it, and no row pins a residual the header does not list", () => {
    const residuals = headerItems(header())
      .filter(item => /^R\d+ /.test(item))
      .map(item => ({ name: item.split(" ")[0] ?? "", rows: cited(item) }));
    expect(residuals.map(item => item.name)).toEqual(RESIDUAL_IDS);
    for (const item of residuals) {
      expect([...item.rows].sort(), item.name).toEqual(
        BATTERY.filter(row => row.residual === item.name)
          .map(row => row.id)
          .sort(),
      );
    }
    expect(BATTERY.filter(row => row.residual !== undefined && !RESIDUAL_IDS.includes(row.residual)).map(row => row.id)).toEqual([]);
  });
});
