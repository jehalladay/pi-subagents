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
 */

import { readdirSync } from "node:fs";
import { extname } from "node:path";
import { pathToFileURL } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { stripUnsafeText } from "../src/workbench/redaction.js";
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
  readCensusFiles,
  readPattern,
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

type Why = "drift" | "not code" | "not the oracle" | "keeps no text" | "equal copy" | "out of scope" | "opaque" | "below the floor";

interface Row {
  readonly id: string;
  /** "gate" rows re-author the 17 shapes row 478 names (the gate's planted texts were not available to this seat); "seat" rows extend them. */
  readonly origin: "gate" | "seat";
  readonly shape: string;
  readonly path: string;
  readonly text: string;
  readonly why: Why;
  /** For drift rows: a substring whose line the drift must name, and a substring of the drift detail. */
  readonly at?: string;
  readonly detail?: string;
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

/** The falsifier table: the gate's 17 shapes (5 controls, F1-F10, FR1, FR2) and the seat's extensions, each planted alone. */
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
  quiet("S27", "seat", "a Markdown file (outside the census extensions)", `const UNSAFE = ${LEGACY_LITERAL};\n`, "out of scope", "notes/planted.md"),
  quiet("S28", "seat", "BLIND BY DESIGN: a pattern from a call result (opaque, listed not classified)", suite("const UNSAFE = new RegExp(loadPattern(), \"u\");"), "opaque"),
  quiet(
    "S29",
    "seat",
    "BLIND BY DESIGN: a pattern from an import (opaque, listed not classified)",
    suite("import { BODY } from \"./planted-body.js\";", "const UNSAFE = new RegExp(BODY, \"u\");"),
    "opaque",
  ),
  quiet("S30", "seat", "BLIND BY DESIGN: narrowed below the floor (controls and separators only, three classes)", suite(`const UNSAFE = /${CONTROLS}/u;`), "below the floor"),
];

const GATE_IDS = ["C1", "C2", "C3", "C4", "C5", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "FR1", "FR2"];
const lineOf = (text: string, needle: string): number => text.slice(0, text.indexOf(needle)).split("\n").length;
const plant = (row: Row): OracleCensus => censusOracles([{ path: row.path, text: row.text }].filter(file => inCensusScope(file.path)), UNSAFE_DISPLAY);

describe("display-oracle census falsifier table (wb-8bi respin, R2(a))", () => {
  it("carries the gate's 17 shapes, each id once, and every row plants a non-empty file", () => {
    expect(BATTERY.filter(row => row.origin === "gate").map(row => row.id).sort()).toEqual([...GATE_IDS].sort());
    expect(new Set(BATTERY.map(row => row.id)).size).toBe(BATTERY.length);
    for (const row of BATTERY) expect(row.text.length, row.id).toBeGreaterThan(0);
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
});
