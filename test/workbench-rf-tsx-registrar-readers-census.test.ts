/**
 * wb-6fr4 registrar readers census (the rule-19 dependency-inversion child of wb-8avz: ruling R-B179 filed it, ruling R-B218
 * folded wb-8avz's refusal #4 member into it). SUBJECT: two readers of test/helpers/rf-tsx-registrar-readers.ts -
 * registrarBindings() and tierReadingOf() (which reports what refusedVitestImports() names) - moved byte for byte from
 * wb-8avz's FINAL cut #4 (tip b8cfd428). The parent's census at that tip differs from trunk's, which is the census its re-cut
 * landed (landing 800, tip 9497cb2d); its roster at that tip (test/fixtures/rf-tsx-remote-hook-roster.json) is trunk's byte
 * for byte since that landing. Neither is added nor
 * edited here; trunk's test/workbench-rf-tsx-remote-hook-census.test.ts, whose C2 imports tierReadingOf() from the helper
 * since the parent's R-B218 re-cut landed, is not read by this census. wb-ffz5, the R694 follow-up of wb-6fr4's landing 780
 * (its findings F3 and F4), anchors row R's pins to refusal #4 and the R-B218 fold and adds M2's probe after a leading vitest
 * import. Its cut #2, the respin of wb-ffz5's refusal #1, reads each pin's statement whole, up to its delimiter, holds ANCHOR's
 * checks to the nine witness plants of refusal #1 (Case READERS), and narrows ANCHOR's claims to the export as it stands and
 * those plants.
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
 * twoRefusedBesideRow and lateSuiteImportBesideRow are wb-6fr4's own and 'scan after the leading run and otherNamed' is
 * wb-ffz5's. The refusal text a tier probe reads ('... a vitest import declaration C2 refuses (...): NOT CLAIMED, wb-6fr4') is
 * the parent tip's reason string, held as the reader returns it.
 * - Row M, the registrarBindings() import-scan members of wb-8avz's refusal #3 that wb-6fr4's description carries. M1 (the
 *   import scan stops at the first statement that is no import declaration): eleven bindings probes, ten 'scan after <kind>'
 *   placing 'import { describe as test, it as describe } from "vitest";' after one statement that is no import declaration
 *   (a '"use strict";' directive, 'const title = "s";', 'setup();', 'type Api = unknown;', 'interface Api {}', 'function
 *   setup(): void {}', a function setup with a one-call body, ';', 'export { helper } from "./helpers/rows.js";' and 'import
 *   fs = require("node:fs");') and 'scan after the leading run' placing it after 'import { it } from "vitest";' and 'const
 *   title = "s";', each read as rows describe and it, suites suite and test, no namespace; and the tier probes dStmtFirst,
 *   dStmtFirstStep, dConstFirst and dStmtShadowPlant. M2 (the scan stops at the first import from another module): four
 *   bindings probes, three placing the same declaration after 'import { helper } from "./helpers/rows.js";', 'import type {
 *   Api } from "./helpers/rows.js";' and 'import "./helpers/setup.js";' and 'scan after the leading run and otherNamed'
 *   placing it after 'import { it } from "vitest";' and 'import { helper } from "./helpers/rows.js";', each read the same
 *   way; and the tier probes dOtherModuleFirst and dOtherShadowPlant. M3 (graded PLAUSIBLE at the refusal: a default
 *   import's local name is shadowed only when its clause binds nothing else): two bindings probes, 'import describe, { it }
 *   from "vitest";' and 'import describe, * as vt from "vitest";', each read with describe in no set; and the tier probes
 *   dDefaultCombined, dDefaultCombinedStep, dDefaultNsCombined and dDefaultShadowPlant.
 * - Row R, wb-8avz's refusal #4 member (its unmet U1) against cut #4's claim that a refused vitest import declaration reds C2
 *   whatever its rows read, its two gate-authored members each quoted as refusal #4 states it: N-A1 (the refusal is reported
 *   only where the module registers no row) and N-A3 (the refusal reported only where no registrar binding is referenced),
 *   one probe set - the tier probes dConstRow, dConstTwoRows, dDirectiveRow, dOtherModuleRow, dDefaultBesideRow,
 *   twoRefusedBesideRow (two refused declarations), lateSuiteImportBesideRow (a refused suite import after the leading run,
 *   the row registered through the leading import) and the three d*ShadowPlant probes - each holding one or two declarations
 *   the reader refuses beside at least one registered row, and each read with every such refusal in its unaccounted.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, the
 *   rows' pins in pin order, and every plant as `${id}:${the beads it edits}:${the checks that fail on it}`, each held to a
 *   literal.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as
 *   the expectation): on the export as it stands anchorFailures() returns no check. It runs twelve checks over wb-6fr4's row
 *   and wb-8avz's row, in this order. (1) items: the ids of wb-6fr4's description lines numbered '<n>. M<n>' are row M's pins,
 *   in order. (1) plants: each live plant one of those lines names is the plant of a probe of that line's pin. (2) record:
 *   wb-8avz's notes hold refusal #3 - from the first occurrence of its verdict opening (naming tip 5c2d32a5) up to the next
 *   RED line - beyond its opening. (2) statements: for each row M pin, the statements refusal #3 opens with '- <unmet>, <id>: '
 *   (M3's with ' (PLAUSIBLE)' after its id), each read up to the next '.', are its quote alone. (2) unmet: the UNMET ids on
 *   refusal #3's UNMET line, each read as its unmet item, its grade and the M<n> it names, are row M's pins', in order. (3)
 *   clauses: the rows-independence clauses ('a refused vitest import declaration ... whatever its rows read') of the cut #4
 *   delivery note - from 'wb-8avz cut #4 (seat ws-01' up to the next GATE VERDICT - are row R's label alone. (3) falsifiers:
 *   the live plants that note names as that claim's falsifiers are one or more, and each is the plant of a probe of every row
 *   R pin. (4) record: wb-8avz's notes hold refusal #4 - from the first occurrence of its verdict opening (naming tip
 *   b8cfd428) up to the next RED line - beyond its opening. (4) members: the ids refusal #4 spells 'N-A<n>' (/\bN-A\d+\b/),
 *   each once, in the order it first names them, are row R's pins. (4) statements: for each row R pin, the statements refusal
 *   #4 opens with '<id> is a gate-authored member: ', each read up to the next '.', and with '<id> (', each read up to the
 *   next ')', are its quote alone. (4) fold: the UNMET ids of the R-B218 fold in wb-6fr4's notes (from its 'RULE19 DEPENDENCY
 *   INVERSION R-B218' line up to its rule19-invert line) are the UNMET ids on refusal #4's UNMET line. (4) grades: row R's
 *   pins' unmet items and grades, each once, are the unmet item and grade each UNMET id on that line spells, in order. On the
 *   export as it stands each pin is stated once there: M1, M2 and M3 as '- U1, M1: <quote>.', '- U2, M2: <quote>.' and '- U3,
 *   M3 (PLAUSIBLE): <quote>.', N-A1 as 'N-A1 is a gate-authored member: <quote>.' and N-A3 as 'N-A3 (<quote>)'.
 * - Case READERS (refusal #1's witnesses, held in this file and built in memory): wb-ffz5's refusal #1 (its notes in the
 *   export, from 'BIND seat gate-prep-10, run g10-gate-s186' up to its RED line) names nine witness exports, W-A1, W-A2, W-A8,
 *   W-A6 and W-A7 in its U1 and W-A3, W-A4, W-A5 and W-A9 in its U2, each the export with wb-8avz's or wb-6fr4's row changed;
 *   the plants are those nine, read from that record in the order it first names them. Each plant makes its edits on the two
 *   rows as the export holds them (each edit replaces the first occurrence of the text written beside it), copied from refusal
 *   #1's gate (its archived leg2.py): W-A1 'members N-A1 and N-A3 survive' with the two ids swapped; W-A2 and W-A8 the same
 *   words with N-A2 or N-A10 named between them; W-A6 an extra UNMET id line in the fold; W-A7 a second UNMET id
 *   U2-LOW-PLAUSIBLE on refusal #4's UNMET line and in the fold; W-A3 N-A3's statement in brackets; W-A4 an 's' before N-A1's
 *   statement's period; W-A5 ' by name' before N-A3's statement's parenthesis; and W-A9 an earlier quoted copy of refusal #4's
 *   verdict opening, closed by a RED line, written just before that opening (the gate's witness wrote it at the start of the
 *   notes). On each plant anchorFailures() returns exactly the checks written beside it.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each named member changes a reading of its own pin's probes: the
 * cutting seat applies each member's own edit (its refusal gate's find and replace, verbatim, over a copy of the helper) and
 * reads the pin case named after it red; a pin whose probes stopped holding its form would read green there. (3) The tracker
 * export records each pin's id, unmet item, grade and quote, the order of each row's pins, row R's label, the plants wb-6fr4's
 * description items name (P-STMT for M1, P-OTHER for M2) and the plants the cut #4 note names for row R's claim (P-STMT,
 * P-OTHER and P-DEFAULT, each in every row R pin's probes): a row or a pin removed, one of these changed - a quote lengthened
 * or shortened among them, since each statement is read whole - or one of these plants removed from those probes, in one
 * literal or in every literal together, reds SHAPE, ANCHOR or READERS (standing rule 16's CT1-CT6 among them). (4) On the
 * export as it stands no ANCHOR check fails, and on each READERS plant exactly the checks written beside it fail: an
 * anchorFailures() edit that changes which checks fail on one of these ten inputs reds ANCHOR or READERS, and a plant removed
 * from PLANTS and from SHAPE's literal together reds READERS, because refusal #1 still names it. The cutting seat applied
 * refusal #1's nine reader members GA1-GA9 (its gate's archived edits, each carried onto the line of anchorFailures() or
 * sectionOf() that makes the same read) and read READERS red under each, where the cut #1 census read each at 0 failed; and
 * its five quote members GQ-N-A1, GQ-N-A3, GQ-M1, GQ-M2 and GQ-M3 (each pin's quote lengthened to the words its record holds
 * before the record's next delimiter) read ANCHOR and READERS red.
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a vitest
 * import declaration after a statement or module specifier the probes do not spell (a class, a let declaration, a call with an
 * argument, an export other than the re-export probed, a type-only or bare import from another module after a leading vitest
 * import), a default import beside other bindings in a clause the probes do not spell, a late type-only or bare vitest import,
 * a bare vitest import before another vitest import, three or more refused declarations, and which declarations
 * refusedVitestImports() names in a module that registers no row. Whether a reading equals what vitest itself collects from the
 * probe is NOT CLAIMED by this census. A pin's probes that carry no plant, removed or swapped in its probes and in SHAPE's
 * literal together, are NOT CLAIMED by this census: no outside record lists them; neither is M3's probe dDefaultShadowPlant,
 * removed from M3's probes and from SHAPE's literal together (wb-6fr4's description names no plant for M3, and P-DEFAULT is
 * held only in row R's probes). A row's id and row M's label are this file's own names: one changed in every literal together
 * is NOT CLAIMED by this census, nor is the order the rows are listed in, changed in every literal together. ANCHOR's checks,
 * and READERS' read of the witness ids refusal #1 names, are claimed on two kinds of input only: the tracker export as it
 * stands and READERS' nine plants, each made with the edits written here. What they read on any other export is NOT CLAIMED by
 * this census: every other order, count, repeat, spelling, width or position of the description's items, the records' ids and
 * statements, the UNMET lines, the fold's ids and refusal #1's witness ids - among them an id with a letter, a digit or an
 * underscore joined to either end, an id named again or added after the pins, an UNMET id removed from the fold or from an
 * UNMET line, a pin stated twice or in both forms, a statement with another delimiter or with none, an opening or a close
 * missing, a later occurrence of an opening or of a close, a record repeated elsewhere in the notes, and an export holding two
 * rows for one bead; and so is a plant made from any other export. Which edit a plant makes, changed to another edit on which
 * the same checks fail, is NOT CLAIMED by this census, and neither is a probe's source or a plant's edit changed together with
 * the reading or the checks written beside it, nor an anchorFailures() edit made together with the plant checks it changes. The
 * parent census's own header, cases and roster are NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read, and every plant is built in
 * memory; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
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
/** The opening of wb-8avz's refusal #4 verdict line (bead notes, append-only). */
const REFUSAL_4 = "refusal #4 on the R-B179 FINAL fail-closed-core cut #4 (b8cfd428dac615721006b468ce0984ceb6edc5a2";
/** The line that closes refusal #3 and refusal #4: each record runs from its opening up to the first one after it. */
const RECORD_END = "\nRED (record.red, verbatim)";
/** The first line of the R-B218 fold in wb-6fr4's notes (bead notes, append-only): the unmet ids it folds follow it. */
const FOLD = "RULE19 DEPENDENCY INVERSION R-B218 (ruling M:42493, refusal O:1590): members folded into wb-6fr4";
/** A refusal's unmet id: its item, severity and grade, then the rest of its words. */
const UNMET_ID = /\bU\d+-[A-Z]+-[A-Z]+-[A-Z0-9-]+/g;
/** The opening of wb-ffz5's refusal #1 record (its notes, append-only) and the line that closes it: its UNMET items name the
 * nine W-A witnesses the plants carry. */
const PLANT_RECORD = "BIND seat gate-prep-10, run g10-gate-s186, gen g10";
const PLANT_RECORD_END = "\nRED (record.prep.red, verbatim)";

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
/** Statements that are no import declaration (M1), and imports from another module (M2), as wb-8avz's cut #4 spells them; the
 * last probe of each places the declaration after a statement that ends a leading vitest import (M1's wb-6fr4's own, M2's
 * wb-ffz5's). */
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
  {
    id: "scan after the leading run and otherNamed",
    reader: "bindings",
    source: `import { it } from "vitest";\nimport { helper } from "./helpers/rows.js";\n${SCAN_DECLARATION}`,
    reading: SCAN_READING,
  },
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
  { id: "N-A3", unmet: "U1", grade: "CONFIRMED", quote: "the refusal reported only where no registrar binding is referenced", probes: REFUSED_BESIDE_ROWS },
];

const ROWS: readonly Row[] = [
  { id: "M", label: "the registrarBindings() import-scan members of wb-8avz's refusal #3 that wb-6fr4's description carries", anchor: "description", pins: ["M1", "M2", "M3"] },
  { id: "R", label: "a refused vitest import declaration in the tier is unaccounted, so C2 reds whatever its rows read", anchor: "cut4", pins: ["N-A1", "N-A3"] },
];

/** The checks Case ANCHOR names, in the order anchorFailures() runs them. */
const CHECKS = [
  "(1) items",
  "(1) plants",
  "(2) record",
  "(2) statements",
  "(2) unmet",
  "(3) clauses",
  "(3) falsifiers",
  "(4) record",
  "(4) members",
  "(4) statements",
  "(4) fold",
  "(4) grades",
] as const;
type Check = (typeof CHECKS)[number];

type Bead = "wb-6fr4" | "wb-8avz";
interface Plant {
  /** The refusal #1 witness the plant carries. */
  readonly id: string;
  /** Its edits of an export row's notes, in order: each replaces the first occurrence of find with write. */
  readonly edits: readonly { readonly bead: Bead; readonly find: string; readonly write: string }[];
  /** The checks of Case ANCHOR that fail on the planted rows, in check order. */
  readonly fails: readonly Check[];
}
/** The words of refusal #4 the plants edit: its verdict on its two members, N-A1's and N-A3's statements, and the end of its
 * UNMET line; and the end of the R-B218 fold's id line in wb-6fr4's notes. */
const SURVIVE = "members N-A1 and N-A3 survive";
const N_A1_STATED = "member: the refusal is reported only where the module registers no row. The refusal loop";
const N_A3_STATED = "N-A3 (the refusal reported only where no registrar binding is referenced) reads";
const UNMET_END = "-NA1-10-OF-10-LIVE-PLANT-FALSE-GREEN)\n";
const FOLD_END = "-NA1-10-OF-10-LIVE-PLANT-FALSE-GREEN\nrule19-invert idem";
const PLANTS: readonly Plant[] = [
  { id: "W-A1", edits: [{ bead: "wb-8avz", find: SURVIVE, write: "members N-A3 and N-A1 survive" }], fails: ["(4) members"] },
  { id: "W-A2", edits: [{ bead: "wb-8avz", find: SURVIVE, write: "members N-A1, N-A2 and N-A3 survive" }], fails: ["(4) members"] },
  { id: "W-A8", edits: [{ bead: "wb-8avz", find: SURVIVE, write: "members N-A1, N-A10 and N-A3 survive" }], fails: ["(4) members"] },
  {
    id: "W-A6",
    edits: [{ bead: "wb-6fr4", find: FOLD_END, write: "-NA1-10-OF-10-LIVE-PLANT-FALSE-GREEN\nU2-LOW-CONFIRMED-FW-GP10-WITNESS-EXTRA\nrule19-invert idem" }],
    fails: ["(4) fold"],
  },
  {
    id: "W-A7",
    edits: [
      { bead: "wb-8avz", find: UNMET_END, write: "-NA1-10-OF-10-LIVE-PLANT-FALSE-GREEN, U2-LOW-PLAUSIBLE-FW-GP10-WITNESS-EXTRA)\n" },
      { bead: "wb-6fr4", find: FOLD_END, write: "-NA1-10-OF-10-LIVE-PLANT-FALSE-GREEN\nU2-LOW-PLAUSIBLE-FW-GP10-WITNESS-EXTRA\nrule19-invert idem" },
    ],
    fails: ["(4) grades"],
  },
  { id: "W-A3", edits: [{ bead: "wb-8avz", find: N_A3_STATED, write: "N-A3 [the refusal reported only where no registrar binding is referenced] reads" }], fails: ["(4) statements"] },
  { id: "W-A4", edits: [{ bead: "wb-8avz", find: N_A1_STATED, write: "member: the refusal is reported only where the module registers no rows. The refusal loop" }], fails: ["(4) statements"] },
  { id: "W-A5", edits: [{ bead: "wb-8avz", find: N_A3_STATED, write: "N-A3 (the refusal reported only where no registrar binding is referenced by name) reads" }], fails: ["(4) statements"] },
  {
    id: "W-A9",
    edits: [{ bead: "wb-8avz", find: REFUSAL_4, write: `${REFUSAL_4} (an earlier quoted mention)${RECORD_END}\n${REFUSAL_4}` }],
    fails: ["(4) members", "(4) statements", "(4) fold", "(4) grades"],
  },
];

const pinOf = (id: string): Pin | undefined => PINS.find(pin => pin.id === id);
/** A bead's description and notes, as its row in the tracked tracker export holds them. */
interface ExportRow {
  readonly description: string;
  readonly notes: string;
}
function exportRow(bead: string): ExportRow {
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
/** The statements text opens with opening: for each occurrence of opening, the words after it up to the first close after them
 * (to the end when close is absent), so a statement is read whole. */
function statementsOf(text: string, opening: string, close: string): string[] {
  const statements: string[] = [];
  for (let start = text.indexOf(opening); start >= 0; start = text.indexOf(opening, start + opening.length)) {
    const from = start + opening.length;
    const end = text.indexOf(close, from);
    statements.push(end < 0 ? text.slice(from) : text.slice(from, end));
  }
  return statements;
}
const plantsOf = (text: string): string[] => text.match(/\bP-[A-Z]+\b/g) ?? [];
const probePlants = (id: string): string[] => pinOf(id)?.probes.flatMap(probe => (probe.plant === undefined ? [] : [probe.plant])) ?? [];

/** The checks of Case ANCHOR that fail on wb-6fr4's export row (child) and wb-8avz's (parent), in check order. */
function anchorFailures(child: ExportRow, parent: ExportRow): Check[] {
  const failed = new Set<Check>();
  const hold = (check: Check, holds: boolean): void => {
    if (!holds) failed.add(check);
  };
  const described = ROWS.filter(row => row.anchor === "description").flatMap(row => row.pins);
  const claimed = ROWS.filter(row => row.anchor === "cut4");
  const answered = claimed.flatMap(row => row.pins);
  const items = child.description.split("\n").flatMap(line => {
    const match = /^\d+\. (M\d+)\b/.exec(line);
    return match?.[1] === undefined ? [] : [{ id: match[1], plants: plantsOf(line) }];
  });
  hold("(1) items", isDeepStrictEqual(items.map(item => item.id), described));
  hold("(1) plants", items.every(item => item.plants.every(plant => probePlants(item.id).includes(plant))));
  const refusal3 = sectionOf(parent.notes, REFUSAL_3, RECORD_END);
  hold("(2) record", refusal3.length > REFUSAL_3.length);
  hold(
    "(2) statements",
    described.every(id => {
      const pin = pinOf(id);
      return pin !== undefined && isDeepStrictEqual(statementsOf(refusal3, `- ${pin.unmet}, ${pin.id}${pin.grade === "PLAUSIBLE" ? " (PLAUSIBLE)" : ""}: `, "."), [pin.quote]);
    }),
  );
  const unmet3 = sectionOf(refusal3, "\nUNMET (", "\n").match(UNMET_ID) ?? [];
  hold(
    "(2) unmet",
    isDeepStrictEqual(
      unmet3.map(unmet => `${unmet.split("-")[0]}:${unmet.split("-")[2]}:${/-(M\d+)-/.exec(unmet)?.[1] ?? ""}`),
      described.map(id => `${pinOf(id)?.unmet}:${pinOf(id)?.grade}:${id}`),
    ),
  );
  const cut4 = sectionOf(parent.notes, CUT_4, "\nGATE VERDICT");
  hold("(3) clauses", isDeepStrictEqual(cut4.match(/a refused vitest import declaration[^.;:()]*?whatever its rows read/g) ?? [], claimed.map(row => row.label)));
  hold(
    "(3) falsifiers",
    claimed.every(row => {
      const falsifiers = plantsOf(sectionOf(cut4, `${row.label} (falsifiers:`, ")"));
      return falsifiers.length > 0 && row.pins.every(id => falsifiers.every(plant => probePlants(id).includes(plant)));
    }),
  );
  const refusal4 = sectionOf(parent.notes, REFUSAL_4, RECORD_END);
  hold("(4) record", refusal4.length > REFUSAL_4.length);
  hold("(4) members", isDeepStrictEqual([...new Set(refusal4.match(/\bN-A\d+\b/g) ?? [])], answered));
  hold(
    "(4) statements",
    answered.every(id => {
      const pin = pinOf(id);
      const statements = [...statementsOf(refusal4, `${id} is a gate-authored member: `, "."), ...statementsOf(refusal4, `${id} (`, ")")];
      return pin !== undefined && isDeepStrictEqual(statements, [pin.quote]);
    }),
  );
  const unmet4 = sectionOf(refusal4, "\nUNMET (", "\n").match(UNMET_ID) ?? [];
  hold("(4) fold", isDeepStrictEqual(sectionOf(child.notes, FOLD, "\nrule19-invert idem").match(UNMET_ID) ?? [], unmet4));
  hold(
    "(4) grades",
    isDeepStrictEqual([...new Set(answered.map(id => `${pinOf(id)?.unmet}:${pinOf(id)?.grade}`))], unmet4.map(unmet => `${unmet.split("-")[0]}:${unmet.split("-")[2]}`)),
  );
  return CHECKS.filter(check => failed.has(check));
}

describe("wb-6fr4 registrar readers census (test/helpers/rf-tsx-registrar-readers.ts): five pin cases, each holding literal registrarBindings() or tierReadingOf() probe readings its named wb-8avz member changes, with SHAPE, ANCHOR on the tracker export as it stands and READERS on refusal #1's nine witness plants", () => {
  it("SHAPE: the rows, their pins, each pin's probe ids and the plants stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["M:3", "R:2"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "M1:scan after directive,scan after constDeclaration,scan after call,scan after typeAlias,scan after interface,scan after functionDeclaration,scan after functionWithBody,scan after empty,scan after reExport,scan after importEquals,scan after the leading run,dStmtFirst,dStmtFirstStep,dConstFirst,dStmtShadowPlant",
      "M2:scan after otherNamed,scan after otherTypeOnly,scan after otherBare,scan after the leading run and otherNamed,dOtherModuleFirst,dOtherShadowPlant",
      "M3:scan default beside named,scan default beside namespace,dDefaultCombined,dDefaultCombinedStep,dDefaultNsCombined,dDefaultShadowPlant",
      "N-A1:dConstRow,dConstTwoRows,dDirectiveRow,dOtherModuleRow,dDefaultBesideRow,twoRefusedBesideRow,lateSuiteImportBesideRow,dStmtShadowPlant,dOtherShadowPlant,dDefaultShadowPlant",
      "N-A3:dConstRow,dConstTwoRows,dDirectiveRow,dOtherModuleRow,dDefaultBesideRow,twoRefusedBesideRow,lateSuiteImportBesideRow,dStmtShadowPlant,dOtherShadowPlant,dDefaultShadowPlant",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
    expect(PLANTS.map(plant => `${plant.id}:${plant.edits.map(edit => edit.bead).join("+")}:${plant.fails.join("+")}`)).toEqual([
      "W-A1:wb-8avz:(4) members",
      "W-A2:wb-8avz:(4) members",
      "W-A8:wb-8avz:(4) members",
      "W-A6:wb-6fr4:(4) fold",
      "W-A7:wb-8avz+wb-6fr4:(4) grades",
      "W-A3:wb-8avz:(4) statements",
      "W-A4:wb-8avz:(4) statements",
      "W-A5:wb-8avz:(4) statements",
      "W-A9:wb-8avz:(4) members+(4) statements+(4) fold+(4) grades",
    ]);
  });

  it("ANCHOR: on the tracker export as it stands no ANCHOR check fails - wb-6fr4's description items and their plants, refusal #3's row M statements and UNMET ids, the cut #4 note's row R clause and falsifier plants, refusal #4's N-A ids, row R statements and UNMET ids and the R-B218 fold's ids hold row M's and row R's pins with their unmet items, grades and quotes, row R's label and the plants those records name", () => {
    expect(anchorFailures(exportRow("wb-6fr4"), exportRow("wb-8avz")), "the ANCHOR checks that fail on the tracker export as it stands").toEqual([]);
  });

  it("READERS: the plants are the W-A witnesses wb-ffz5's refusal #1 names, in the order it first names them, and on each plant, made on wb-6fr4's and wb-8avz's export rows with its edits, exactly the ANCHOR checks written beside it fail", () => {
    const rows: Readonly<Record<Bead, ExportRow>> = { "wb-6fr4": exportRow("wb-6fr4"), "wb-8avz": exportRow("wb-8avz") };
    const witnesses = [...new Set(sectionOf(exportRow("wb-ffz5").notes, PLANT_RECORD, PLANT_RECORD_END).match(/\bW-A\d+\b/g) ?? [])];
    expect(
      PLANTS.map(plant => plant.id),
      "the plants are the W-A witnesses refusal #1 names, in the order it first names them",
    ).toEqual(witnesses);
    for (const plant of PLANTS) {
      const planted: Record<Bead, ExportRow> = { ...rows };
      for (const edit of plant.edits) {
        const row = planted[edit.bead];
        const at = row.notes.indexOf(edit.find);
        expect(at >= 0, `${plant.id}: ${edit.bead}'s notes hold the text its edit replaces`).toBe(true);
        planted[edit.bead] = { description: row.description, notes: `${row.notes.slice(0, at)}${edit.write}${row.notes.slice(at + edit.find.length)}` };
      }
      expect(anchorFailures(planted["wb-6fr4"], planted["wb-8avz"]), `${plant.id}: the ANCHOR checks that fail on the plant`).toEqual(plant.fails);
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
