/**
 * wb-6fr4 registrar readers census (the rule-19 dependency-inversion child of wb-8avz: ruling R-B179 filed it, ruling R-B218
 * folded wb-8avz's refusal #4 member into it). SUBJECT: two readers of test/helpers/rf-tsx-registrar-readers.ts -
 * registrarBindings() and tierReadingOf() (which reports what refusedVitestImports() names) - moved byte for byte from
 * wb-8avz's FINAL cut #4 (tip b8cfd428). The parent's census and roster at that tip are not on trunk and are neither added nor
 * edited here; trunk's test/workbench-rf-tsx-remote-hook-census.test.ts keeps its own readers and is not read by this census.
 * The parent stays parked until this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-rf-tsx-registrar-readers-census.test.ts; observed at the cut: every case passes
 * on the moved readers, and each named member, applied to a copy of the helper with its refusal gate's own edit, reds the pin
 * case named after it). Each pin case is named "<member id>: <quote>" and asserts, for every probe it holds, that the reader
 * beside the probe returns exactly the literal reading written here (toEqual over the reader's whole output). A probe is a
 * synthetic module text read as test/probe.test.ts: the bindings reader is registrarBindings() over it (its rows, suites and
 * namespaces sets, each sorted) and the tier reader is tierReadingOf() over it (titles, unaccounted, claims). The probes
 * dStmtFirst, dStmtFirstStep, dConstFirst, dOtherModuleFirst, dDefaultCombined, dDefaultCombinedStep and dDefaultNsCombined
 * hold refusal #3 PREP's diagnostic sources, and dConstRow, dConstTwoRows, dDirectiveRow, dOtherModuleRow, dDefaultBesideRow,
 * dStmtShadowPlant, dOtherShadowPlant and dDefaultShadowPlant refusal #4 PREP's, as each wrote them; the three d*ShadowPlant
 * probes carry the form of the live tier plants P-STMT, P-OTHER and P-DEFAULT. 'scan after the leading run',
 * twoRefusedBesideRow and lateSuiteImportBesideRow are this cut's own. The refusal text a tier probe reads ('... a vitest import
 * declaration C2 refuses (...): NOT CLAIMED, wb-6fr4') is the parent tip's reason string, held as the reader returns it.
 * - Row M, the registrarBindings() import-scan members of wb-8avz's refusal #3 that wb-6fr4's description carries. M1 (the
 *   import scan stops at the first statement that is no import declaration): eleven bindings probes, ten 'scan after <kind>'
 *   placing 'import { describe as test, it as describe } from "vitest";' after one statement that is no import declaration
 *   (a '"use strict";' directive, 'const title = "s";', 'setup();', 'type Api = unknown;', 'interface Api {}', 'function
 *   setup(): void {}', a function setup with a one-call body, ';', 'export { helper } from "./helpers/rows.js";' and 'import
 *   fs = require("node:fs");') and 'scan after the leading run' placing it after 'import { it } from "vitest";' and 'const
 *   title = "s";', each read as rows describe and it, suites suite and test, no namespace; and the tier probes dStmtFirst,
 *   dStmtFirstStep, dConstFirst and dStmtShadowPlant. M2 (the scan stops at the first import from another module): three
 *   bindings probes placing the same declaration after 'import { helper } from "./helpers/rows.js";', 'import type { Api }
 *   from "./helpers/rows.js";' and 'import "./helpers/setup.js";', read the same way; and the tier probes dOtherModuleFirst
 *   and dOtherShadowPlant. M3 (graded PLAUSIBLE at the refusal: a default import's local name is shadowed only when its
 *   clause binds nothing else): two bindings probes, 'import describe, { it } from "vitest";' and 'import describe, * as vt
 *   from "vitest";', each read with describe in no set; and the tier probes dDefaultCombined, dDefaultCombinedStep,
 *   dDefaultNsCombined and dDefaultShadowPlant.
 * - Row R, wb-8avz's refusal #4 member against cut #4's claim that a refused vitest import declaration reds C2 whatever its
 *   rows read: N-A1 (the refusal is reported only where the module registers no row) and N-A3 (the refusal is reported only
 *   where no registrar binding is referenced), one probe set - the tier probes dConstRow, dConstTwoRows, dDirectiveRow,
 *   dOtherModuleRow, dDefaultBesideRow, twoRefusedBesideRow (two refused declarations), lateSuiteImportBesideRow (a refused
 *   suite import after the leading run, the row registered through the leading import) and the three d*ShadowPlant probes -
 *   each holding one or two declarations the reader refuses beside at least one registered row, and each read with every
 *   such refusal in its unaccounted.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, and the
 *   rows' pins in pin order, each held to a literal.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as
 *   the expectation): (1) wb-6fr4's description numbers exactly row M's pins, in order ('1. M1', '2. M2', '3. M3'), and each
 *   live plant an item names is the plant of one of that pin's probes; (2) in wb-8avz's notes, refusal #3 (from its verdict
 *   naming tip 5c2d32a5 up to its RED) states each row M pin as '- <unmet>, <id>: <quote>.', M3's with '(PLAUSIBLE)' after
 *   its id, and its UNMET ids name exactly row M's pins, in order, each with the pin's unmet item and grade; (3) in wb-8avz's
 *   notes, the cut #4 delivery note (from 'wb-8avz cut #4 (seat ws-01' up to the next GATE VERDICT) holds exactly the
 *   rows-independence clauses ('a refused vitest import declaration ... whatever its rows read') that this census's rows carry
 *   as labels (row R's), and each live plant that note names as the claim's falsifiers is the plant of a probe of every row R
 *   pin.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each named member changes a reading of its own pin's probes: the
 * cutting seat applies each member's own edit (its refusal gate's find and replace, verbatim, over a copy of the helper) and
 * reads the pin case named after it red; a pin whose probes stopped holding its form would read green there. (3) Row M's pins
 * with their unmet items, grades, quotes and plants, row R's label and the plants of row R's probes are the ones the tracker
 * export records: a row or a row M pin removed, swapped or relabelled - in one literal or in every literal together - reds
 * SHAPE or ANCHOR (standing rule 16's CT1-CT6), and a row R pin removed from one literal reds SHAPE.
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a vitest
 * import declaration after a statement or module specifier the probes do not spell (a class, a let declaration, a call with
 * an argument, an export other than the re-export probed), a default import beside other bindings in a clause the probes do
 * not spell, a late type-only or bare vitest import, a bare vitest import before another vitest import, three or more refused
 * declarations, and which declarations refusedVitestImports() names in a module that registers no row. Whether a reading
 * equals what vitest itself collects from the probe is NOT CLAIMED by this census. Row R's pin ids, quotes and grades are this
 * file's descriptions of refusal #4's members: the tracker export at this cut's base predates that refusal and no outside
 * anchor holds them, so a row R pin removed or relabelled in every literal together is NOT CLAIMED by this census. The parent
 * census's own header, cases and roster are NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is
 * edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { registrarBindings, tierReadingOf } from "./helpers/rf-tsx-registrar-readers.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The path every probe is read as. */
const PROBE_PATH = "test/probe.test.ts";
/** The opening of wb-8avz's refusal #3 verdict line and of its cut #4 delivery note (bead notes, append-only). */
const REFUSAL_3 = "refusal #3 on the R-B139 enumerate-the-resolvable cut #3 (5c2d32a57c10d4c4c1fe86756778117f4bb3b54f";
const CUT_4 = "wb-8avz cut #4 (seat ws-01, run g10-work-s160;";

type ReaderId = "bindings" | "tier";
const READERS: Readonly<Record<ReaderId, (source: string) => unknown>> = {
  bindings: source => {
    const read = registrarBindings(ts.createSourceFile(PROBE_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
    return { rows: [...read.rows].sort(), suites: [...read.suites].sort(), namespaces: [...read.namespaces].sort() };
  },
  tier: source => tierReadingOf(PROBE_PATH, source),
};

interface Probe {
  readonly id: string;
  readonly reader: ReaderId;
  readonly source: string;
  /** The live tier plant of wb-8avz's refusals whose form the probe carries, if any. */
  readonly plant?: string;
  readonly reading: unknown;
}
interface Pin {
  readonly id: string;
  /** The member's unmet item and grade at its refusal. */
  readonly unmet: string;
  readonly grade: "CONFIRMED" | "PLAUSIBLE";
  readonly quote: string;
  readonly probes: readonly Probe[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  /** Where the tracker export records the row: wb-6fr4's description, or wb-8avz's cut #4 delivery note. */
  readonly anchor: "description" | "cut4";
  readonly pins: readonly string[];
}

/** The reason a tier probe reads for a vitest import declaration the reader refuses, and for a row that does not run once. */
const refused = (line: number): string =>
  `${PROBE_PATH}:${line} a vitest import declaration C2 refuses (after the leading run, or a default import beside other bindings): NOT CLAIMED, wb-6fr4`;
const notOnce = (line: number): string => `${PROBE_PATH}:${line} a row in a loop, a branch, a table suite, a row's callback or another function`;

/** The vitest import declaration every scan probe places after one other statement, and how the bindings reader reads it. */
const SCAN_DECLARATION = 'import { describe as test, it as describe } from "vitest";\n';
const SCAN_READING = { rows: ["describe", "it"], suites: ["suite", "test"], namespaces: [] };
const scan = (kind: string, statement: string): Probe => ({ id: `scan after ${kind}`, reader: "bindings", source: `${statement}${SCAN_DECLARATION}`, reading: SCAN_READING });
/** Statements that are no import declaration (M1), and imports from another module (M2), as wb-8avz's cut #4 spells them; M1's
 * last probe places the declaration after a statement that ends a leading vitest import (this cut's own). */
const AFTER_STATEMENTS: readonly Probe[] = [
  scan("directive", '"use strict";\n'),
  scan("constDeclaration", 'const title = "s";\n'),
  scan("call", "setup();\n"),
  scan("typeAlias", "type Api = unknown;\n"),
  scan("interface", "interface Api {}\n"),
  scan("functionDeclaration", "function setup(): void {}\n"),
  scan("functionWithBody", "function setup(): void {\n  run();\n}\n"),
  scan("empty", ";\n"),
  scan("reExport", 'export { helper } from "./helpers/rows.js";\n'),
  scan("importEquals", 'import fs = require("node:fs");\n'),
  {
    id: "scan after the leading run",
    reader: "bindings",
    source: `import { it } from "vitest";\nconst title = "s";\n${SCAN_DECLARATION}`,
    reading: SCAN_READING,
  },
];
const AFTER_OTHER_IMPORTS: readonly Probe[] = [
  scan("otherNamed", 'import { helper } from "./helpers/rows.js";\n'),
  scan("otherTypeOnly", 'import type { Api } from "./helpers/rows.js";\n'),
  scan("otherBare", 'import "./helpers/setup.js";\n'),
];

const STMT_PLANT: Probe = {
  id: "dStmtShadowPlant",
  reader: "tier",
  plant: "P-STMT",
  source: '"use strict";\nimport { describe, describe as test, expect, it } from "vitest";\ndescribe("s", () => {\n  test.concurrent("r1", () => {});\n  it("r2", () => {});\n});\n',
  reading: { titles: ["r2"], unaccounted: [refused(2)], claims: [] },
};
const OTHER_PLANT: Probe = {
  id: "dOtherShadowPlant",
  reader: "tier",
  plant: "P-OTHER",
  source:
    'import { helper } from "./helpers/rows.js";\nimport { describe, describe as test, expect, it } from "vitest";\ndescribe("s", () => {\n  test.concurrent("r1", () => {});\n  it("r2", () => {});\n});\n',
  reading: { titles: ["r2"], unaccounted: [refused(2)], claims: [] },
};
const DEFAULT_PLANT: Probe = {
  id: "dDefaultShadowPlant",
  reader: "tier",
  plant: "P-DEFAULT",
  source: 'import test, { describe, expect, it } from "vitest";\ndescribe("s", () => {\n  test("r1", () => {});\n  it("r2", () => {});\n});\n',
  reading: { titles: ["r2"], unaccounted: [refused(1)], claims: [] },
};
const REFUSED_BESIDE_ROWS: readonly Probe[] = [
  { id: "dConstRow", reader: "tier", source: 'const title = "s";\nimport { it } from "vitest";\nit("r1", () => {});\n', reading: { titles: ["r1"], unaccounted: [refused(2)], claims: [] } },
  {
    id: "dConstTwoRows",
    reader: "tier",
    source: 'const title = "s";\nimport { describe, it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n  it("r2", () => {});\n});\n',
    reading: { titles: ["r1", "r2"], unaccounted: [refused(2)], claims: [] },
  },
  { id: "dDirectiveRow", reader: "tier", source: '"use strict";\nimport { it } from "vitest";\nit("r1", () => {});\n', reading: { titles: ["r1"], unaccounted: [refused(2)], claims: [] } },
  {
    id: "dOtherModuleRow",
    reader: "tier",
    source: 'import { helper } from "./helpers/rows.js";\nimport { it } from "vitest";\nit("r1", () => {});\n',
    reading: { titles: ["r1"], unaccounted: [refused(2)], claims: [] },
  },
  { id: "dDefaultBesideRow", reader: "tier", source: 'import test, { it } from "vitest";\nit("r1", () => {});\n', reading: { titles: ["r1"], unaccounted: [refused(1)], claims: [] } },
  {
    id: "twoRefusedBesideRow",
    reader: "tier",
    source: 'const title = "s";\nimport { it } from "vitest";\nimport { describe } from "vitest";\nit("r1", () => {});\n',
    reading: { titles: ["r1"], unaccounted: [refused(2), refused(3)], claims: [] },
  },
  {
    id: "lateSuiteImportBesideRow",
    reader: "tier",
    source: 'import { it } from "vitest";\nconst title = "s";\nimport { describe } from "vitest";\nit("r1", () => {});\n',
    reading: { titles: ["r1"], unaccounted: [refused(3)], claims: [] },
  },
  STMT_PLANT,
  OTHER_PLANT,
  DEFAULT_PLANT,
];

const PINS: readonly Pin[] = [
  {
    id: "M1",
    unmet: "U1",
    grade: "CONFIRMED",
    quote: "the import scan stops at the first statement that is no import declaration",
    probes: [
      ...AFTER_STATEMENTS,
      {
        id: "dStmtFirst",
        reader: "tier",
        source: '"use strict";\nimport { it as describe } from "vitest";\ndescribe("r1", () => {\n  describe("r2", () => {});\n});\n',
        reading: { titles: ["r1"], unaccounted: [refused(2), notOnce(4)], claims: [] },
      },
      {
        id: "dStmtFirstStep",
        reader: "tier",
        source: '"use strict";\nimport { it as describe } from "vitest";\ndescribe.concurrent("r1", () => {\n  describe("r2", () => {});\n});\n',
        reading: { titles: ["r1"], unaccounted: [refused(2), notOnce(4)], claims: [] },
      },
      {
        id: "dConstFirst",
        reader: "tier",
        source: 'const title = "s";\nimport { describe as it, test } from "vitest";\nit(title, () => {\n  test("r1", () => {});\n});\n',
        reading: { titles: ["r1"], unaccounted: [refused(2)], claims: [] },
      },
      STMT_PLANT,
    ],
  },
  {
    id: "M2",
    unmet: "U2",
    grade: "CONFIRMED",
    quote: "the scan stops at the first import from another module",
    probes: [
      ...AFTER_OTHER_IMPORTS,
      {
        id: "dOtherModuleFirst",
        reader: "tier",
        source: 'import { helper } from "./helpers/rows.js";\nimport { it as describe } from "vitest";\ndescribe("r1", () => {\n  describe("r2", () => {});\n});\n',
        reading: { titles: ["r1"], unaccounted: [refused(2), notOnce(4)], claims: [] },
      },
      OTHER_PLANT,
    ],
  },
  {
    id: "M3",
    unmet: "U3",
    grade: "PLAUSIBLE",
    quote: "a default import's local name is shadowed only when its clause binds nothing else",
    probes: [
      { id: "scan default beside named", reader: "bindings", source: 'import describe, { it } from "vitest";\n', reading: { rows: ["it", "test"], suites: ["suite"], namespaces: [] } },
      { id: "scan default beside namespace", reader: "bindings", source: 'import describe, * as vt from "vitest";\n', reading: { rows: ["it", "test"], suites: ["suite"], namespaces: ["vt"] } },
      {
        id: "dDefaultCombined",
        reader: "tier",
        source: 'import describe, { it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n',
        reading: { titles: [], unaccounted: [refused(1), notOnce(3)], claims: [] },
      },
      {
        id: "dDefaultCombinedStep",
        reader: "tier",
        source: 'import describe, { it } from "vitest";\ndescribe.concurrent("s", () => {\n  it("r1", () => {});\n});\n',
        reading: { titles: [], unaccounted: [refused(1), notOnce(3)], claims: [] },
      },
      {
        id: "dDefaultNsCombined",
        reader: "tier",
        source: 'import describe, * as vt from "vitest";\ndescribe("s", () => {\n  vt.it("r1", () => {});\n});\n',
        reading: { titles: [], unaccounted: [refused(1), notOnce(3)], claims: [] },
      },
      DEFAULT_PLANT,
    ],
  },
  { id: "N-A1", unmet: "U1", grade: "CONFIRMED", quote: "the refusal is reported only where the module registers no row", probes: REFUSED_BESIDE_ROWS },
  { id: "N-A3", unmet: "U1", grade: "CONFIRMED", quote: "the refusal is reported only where no registrar binding is referenced", probes: REFUSED_BESIDE_ROWS },
];

const ROWS: readonly Row[] = [
  { id: "M", label: "the registrarBindings() import-scan members of wb-8avz's refusal #3 that wb-6fr4's description carries", anchor: "description", pins: ["M1", "M2", "M3"] },
  { id: "R", label: "a refused vitest import declaration in the tier is unaccounted, so C2 reds whatever its rows read", anchor: "cut4", pins: ["N-A1", "N-A3"] },
];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text from the first occurrence of open up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
const plantsOf = (text: string): string[] => text.match(/\bP-[A-Z]+\b/g) ?? [];
const probePlants = (pin: Pin): string[] => pin.probes.flatMap(probe => (probe.plant === undefined ? [] : [probe.plant]));

describe("wb-6fr4 registrar readers census (test/helpers/rf-tsx-registrar-readers.ts): five pin cases, each holding literal registrarBindings() or tierReadingOf() probe readings its named wb-8avz member changes, with SHAPE and ANCHOR", () => {
  it("SHAPE: the rows, their pins and each pin's probe ids stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["M:3", "R:2"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "M1:scan after directive,scan after constDeclaration,scan after call,scan after typeAlias,scan after interface,scan after functionDeclaration,scan after functionWithBody,scan after empty,scan after reExport,scan after importEquals,scan after the leading run,dStmtFirst,dStmtFirstStep,dConstFirst,dStmtShadowPlant",
      "M2:scan after otherNamed,scan after otherTypeOnly,scan after otherBare,dOtherModuleFirst,dOtherShadowPlant",
      "M3:scan default beside named,scan default beside namespace,dDefaultCombined,dDefaultCombinedStep,dDefaultNsCombined,dDefaultShadowPlant",
      "N-A1:dConstRow,dConstTwoRows,dDirectiveRow,dOtherModuleRow,dDefaultBesideRow,twoRefusedBesideRow,lateSuiteImportBesideRow,dStmtShadowPlant,dOtherShadowPlant,dDefaultShadowPlant",
      "N-A3:dConstRow,dConstTwoRows,dDirectiveRow,dOtherModuleRow,dDefaultBesideRow,twoRefusedBesideRow,lateSuiteImportBesideRow,dStmtShadowPlant,dOtherShadowPlant,dDefaultShadowPlant",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
  });

  it("ANCHOR: row M's pins, unmet items, grades, quotes and plants and row R's label and plants are the ones wb-6fr4's and wb-8avz's tracker-export rows record", () => {
    const child = exportRow("wb-6fr4");
    const parent = exportRow("wb-8avz");
    const members = child.description.split("\n").flatMap(line => {
      const match = /^\d+\. (M\d+)\b/.exec(line);
      return match?.[1] === undefined ? [] : [{ id: match[1], plants: plantsOf(line) }];
    });
    const described = ROWS.filter(row => row.anchor === "description").flatMap(row => row.pins);
    expect(
      members.map(member => member.id),
      "wb-6fr4's description numbers exactly the pins of the rows it anchors (row M), in order",
    ).toEqual(described);
    for (const member of members) {
      const plants = probePlants(pinOf(member.id));
      for (const plant of member.plants) expect(plants, `${member.id}: the plant ${plant} its description item names is a probe's`).toContain(plant);
    }
    const refusal3 = sectionOf(parent.notes, REFUSAL_3, "\nRED (record.red, verbatim)");
    expect(refusal3.length > REFUSAL_3.length, "wb-8avz's notes hold refusal #3's verdict").toBe(true);
    for (const id of described) {
      const pin = pinOf(id);
      const line = `- ${pin.unmet}, ${pin.id}${pin.grade === "PLAUSIBLE" ? " (PLAUSIBLE)" : ""}: ${pin.quote}.`;
      expect(refusal3, `refusal #3 states ${pin.id} as '${line}'`).toContain(line);
    }
    const unmetIds = sectionOf(refusal3, "\nUNMET (", "\n").match(/\bU\d+-[A-Z]+-[A-Z]+-[A-Z0-9-]+/g) ?? [];
    expect(
      unmetIds.map(unmet => `${unmet.split("-")[0]}:${unmet.split("-")[2]}:${/-(M\d+)-/.exec(unmet)?.[1] ?? unmet.slice(0, 24)}`),
      "refusal #3's UNMET ids name exactly row M's pins, in order, each with its unmet item and grade",
    ).toEqual(described.map(id => `${pinOf(id).unmet}:${pinOf(id).grade}:${id}`));
    const cut4 = sectionOf(parent.notes, CUT_4, "\nGATE VERDICT");
    const claimed = ROWS.filter(row => row.anchor === "cut4");
    expect(
      cut4.match(/a refused vitest import declaration[^.;:()]*?whatever its rows read/g) ?? [],
      "wb-8avz's cut #4 delivery note holds exactly the rows-independence clauses of the rows it anchors (row R), as their labels",
    ).toEqual(claimed.map(row => row.label));
    for (const row of claimed) {
      const falsifiers = plantsOf(sectionOf(cut4, `${row.label} (falsifiers:`, ")"));
      expect(falsifiers.length > 0, `the cut #4 note names falsifier plants for row ${row.id}'s claim`).toBe(true);
      for (const id of row.pins) {
        const plants = probePlants(pinOf(id));
        for (const plant of falsifiers) expect(plants, `${id}: the cut #4 claim's falsifier ${plant} is a probe's`).toContain(plant);
      }
    }
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const probe of pin.probes) {
        expect(READERS[probe.reader](probe.source), `${pin.id} / ${probe.id}: ${probe.reader} reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }
});
