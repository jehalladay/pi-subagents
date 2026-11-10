/**
 * wb-hhxs (the structural-exit child of wb-mit9, ruling R-B759): the historical requirement status ledger of the
 * mechanical-native-interoperability-2026-11-09 program (EAT-R202), test/fixtures/mechanical-historical-status-ledger.json,
 * judged by ledgerFindings of test/helpers/mechanical-status-ledger.ts. The requirement text is
 * docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 8cc7657b8b90 (that tree is master-only). Quoted:
 *  EAT-R202 AC1 "Assert every EAT-R001..R200 identifier has exactly one ledger row with Pi/MW source pin, real Beads id or
 *    explicit none, evidence link and class already-implemented/tested, partial/inert, or blocked; a tested class names its
 *    tested forms." AC2 "Assert rows for EAT-R001..R003, R012..R014 and the run-wide F10 control distinguish fixed, scoped
 *    forms from the witnessed pending parked per-agent skip/retry; no row says that WorktreePreservationFailedResult contains
 *    byte data." AC3 "Assert an unmapped B-* label or a fabricated wb-* id fails ledger validation; the 25-group total is not
 *    treated as 25 complete issues."
 *
 * Authored from scratch in the rule-14 enumerate-the-resolvable form (19(c)): each line below claims exactly what its cases
 * pin, each mode known to stay unpinned is a NAMED RESIDUAL with its pinned quiet row, and every other mode is NOT CLAIMED.
 * Each planted case edits one clone of the committed ledger (or of the export records, or a receipt text the reader returns)
 * and reads ledgerFindings; the expected findings are the whole list, compared exactly. The committed export is
 * .beads/issues.jsonl rehydrated by trackerExportText of qa/workbench/tracker-export.mjs; the committed receipts are the files
 * of docs/workbench/receipts; the docs reader is docsSection of test/helpers/census.ts, which this file memoizes on its whole
 * input (the markdown text, heading, depth and parent headings). The tested forms are judged in report mode by
 * test/workbench-mechanical-status-ledger.census.ts, which also reads that the cases this file registers are the ones the
 * lines below name.
 *
 * PINNED READER SET (one claim per line; each line names its cases before the colon; an input no case holds is NOT CLAIMED):
 *  - SL-LIVE: the committed ledger, judged with the committed export, the committed receipts and docsSection, gives no finding.
 *  - SL-SHAPE: per row its id, class, group, bead, tested-form count, evidence count and the sha256 (first 12 hex) of its JSON, and per control the same, equal the frozen list of this cut (rule 16).
 *  - SL-COUNTS: the committed ledger holds 200 rows, 75 already-implemented/tested, 31 partial/inert and 94 blocked, and its summary names B-detached-grants, B-replay and B-hx-evidence, in table order, as the complete plan groups.
 *  - SL-SCHEMA-NOT-OBJECT, SL-SCHEMA-NAME, SL-SCHEMA-PIN, SL-SCHEMA-PINS-ABSENT, SL-SCHEMA-ROWS, SL-SCHEMA-CONTROLS, SL-SCHEMA-ROW, SL-SCHEMA-CONTROL: a ledger that is an array, null or a string; another schema string; a pins.pi.commit or pins.mw.commit of 39 or 41 hex, with an upper-case letter, or that is an array holding the 40-hex pin (each row carrying the same value); a ledger without pins; rows or controls that are not arrays; and a row or a control that is not an object are refused (L-SCHEMA), each with exactly the findings its case lists.
 *  - SL-IDS: a row id deleted, duplicated, replaced by EAT-R201, two rows swapped, and a row EAT-R201 appended are each refused with the one L-IDS finding (EAT-R202 AC1).
 *  - SL-CLASS: a class outside the three is refused (L-CLASS).
 *  - SL-PIN: a row pin.pi or pin.mw that is another 40-hex commit, and a row without pin, are refused (L-PIN).
 *  - SL-BEAD-FABRICATED, SL-BEAD-NOT-STRING, SL-BEAD-NONE, SL-BEAD-OTHER-GROUP: a bead id the export does not hold and a bead that is a number are refused by L-BEAD and L-GROUP (EAT-R202 AC3); the bead none is quiet; a bead the export holds that is not the row's group's bead is refused by L-GROUP alone.
 *  - SL-GROUP-UNMAPPED, SL-GROUP-EXPORT-ABSENT, SL-GROUP-EXPORT-TITLE: a row group label outside the 27 mapped labels is refused (EAT-R202 AC3); an export without the B-hx-evidence bead wb-f3wd is refused by L-GROUP and by L-BEAD for EAT-R057; an export title of wb-f3wd with text, a space, a tab or a line break before [MWI-hx-evidence], one whose tag is in lower case, lacks its closing bracket or runs longer ([MWI-hx-evidencex]), and an empty one are refused (L-GROUP).
 *  - SL-TESTED-NONE, SL-TESTED-NOT-TESTED, SL-TESTED-NOT-ARRAY, SL-TESTED-FORM, SL-TESTED-SUITE-EMPTY: a tested row with no tested form, a blocked row naming a form, testedForms that is not an array, and a form that is a string, null, has a white-space file, a number file, no title or a suite that is a string or holds an empty string or a number are refused (L-TESTED); a form whose suite is the empty array is quiet. No case text is read here.
 *  - SL-PARTIAL-NONE, SL-PARTIAL-TEXT, SL-PARTIAL-SOURCE, SL-PARTIAL-CARRIED: a partial/inert row without partialBecause or with a string there, with a reason text that is white space or a number, whose source anchor its receipt section does not hold or whose source is absent, and a tested row carrying partialBecause are refused (L-PARTIAL).
 *  - SL-BLOCKED-NONE, SL-BLOCKED-KIND, SL-BLOCKED-DETAIL, SL-BLOCKED-CARRIED: a blocked row without blockedBy or with a string there, with a kind outside the four, with a detail that is empty, white space or a number, and a tested row carrying blockedBy are refused (L-BLOCKED).
 *  - SL-EVIDENCE-NONE, SL-EVIDENCE-NO-ANCHOR, SL-EVIDENCE-NEITHER, SL-EVIDENCE-RECEIPT-FIRST: evidence that is an empty array or a string, an item that is a string or null or whose anchor is empty, white space, a number or absent, and an item naming neither a receipt nor a bead (a path member beside its anchor is not read) are refused (L-EVIDENCE); an item whose receipt member is a string is read as a receipt anchor and a bead member beside it is not read, and one whose receipt member is a number is read as a bead anchor through its bead member.
 *  - SL-EVIDENCE-BEAD: a bead anchor naming a bead the export does not hold is refused; over a planted export record, an anchor held only by its title, its acceptance_criteria or its design, or split across its description and its notes, is refused, and one held by its description or by its notes is quiet (L-EVIDENCE).
 *  - SL-EVIDENCE-RECEIPT, SL-EVIDENCE-SECTION, SL-EVIDENCE-UNBOUND: a receipt name docs/workbench/receipts does not list, a receipt anchor without a section object or with a string there, with an empty heading, a depth of 1.5, 0 or 7, parents that are a string or hold an empty string, and a section docsSection does not bind are refused (L-EVIDENCE).
 *  - SL-EVIDENCE-BLOCK: over a planted receipt, an anchor in a paragraph, in one list item, in a code block, in a subsection heading or in a block quote of its section is quiet; one held only by the section's own heading, split across two list items, one only two list items joined by a space would hold, one only two paragraphs joined by a space or by a line break would hold, inside an HTML comment of a paragraph, inside an HTML block or in the next section is refused (L-EVIDENCE).
 *  - SL-AC2-FIXED, SL-AC2-FIXED-EMPTY, SL-AC2-FIXED-WORD, SL-AC2-ABSENT, SL-AC2-SENTENCE, SL-AC2-PENDING, SL-AC2-PENDING-VARIANT, SL-AC2-WITNESS: each of the six AC2 rows and the F10 control is refused without fixedForms and without pending; EAT-R001 is refused with fixedForms that are empty, hold an empty or white-space string, or are a string, and with a fixed form holding skip, Retry or skipped; EAT-R012 deleted is read by L-IDS alone; the judge's pending sentence is the one this file spells word for word (the AC2 rows, the type name and that sentence are spelled in this file, never read from the judge); EAT-R012 is refused with a pending sentence naming wb-9v02.1, ending in a space, or with one word changed; a wb-9v02 receipt whose 2026-11-06 section does not hold the pending witness is refused (L-AC2, EAT-R202 AC2), and so is EAT-R160, whose evidence[1] cites the same sentence (L-EVIDENCE).
 *  - SL-CONTROL-IDS, SL-CONTROL-CLASS, SL-CONTROL-FORMS: no control, a second control F11, a control renamed F11, a control that is partial/inert, and a control with no tested form are refused (L-CONTROL, L-TESTED).
 *  - SL-BYTES, SL-BYTES-CASE, SL-BYTES-PERIOD, SL-BYTES-SUBSTRING, SL-BYTES-QUIET: a string naming WorktreePreservationFailedResult and byte, planted in a row title, a blocked detail, a partial reason, a tested form title, a member of a row this ledger does not use, a nested array, a member name, the F10 control's title and its fixed form, is refused, in either letter case, across a period (inside a parenthesis naming a path or a version, the period of e.g., and a sentence break), and inside longer words (WorktreePreservationFailedResultSet, kilobytes, bytestream); the type alone, the byte word alone, a member named bytes whose value names the type (the type and byte in two strings, R-BYTES-SPLIT), and a number are quiet (L-BYTES, EAT-R202 AC2).
 *  - SL-BYTES-SPLIT-QUIET, SL-BYTES-WORDING-QUIET, SL-BYTES-WATCH: the quiet rows of R-BYTES-SPLIT and R-BYTES-WORDING below.
 *  - SL-SUMMARY-NOT-OBJECT, SL-SUMMARY-ROWS, SL-SUMMARY-CLASS, SL-SUMMARY-PLAN-GROUPS, SL-SUMMARY-COMPLETE, SL-SUMMARY-EMPTY-GROUP, SL-SUMMARY-UNTESTED-ROW: a summary that is absent; summary.rows of 199, 201 or the string 200; summary.byClass with a count one lower or higher, an extra key or a key missing; summary.planGroups of 24 or 26; summary.planGroupsComplete naming all 25 plan groups, one fewer, one more, or the three out of order; a plan group left with no row still counted complete; and a plan group counted complete after one of its rows is blocked are refused (L-SUMMARY, EAT-R202 AC3).
 *  - SL-EXPORT-LOAD, SL-RECEIPTS-READ: beadsFromExport throws a SyntaxError on a line that does not parse and its own refusal on a line that is an array, null, a number, a string or true, or an object whose id is a number, absent, null, true, an array or an object, skips empty lines and lines of spaces, reads a title, description or notes member that is a number, true, false, null, an object, an array of strings or an array of numbers, or that is absent, as empty while it reads the other two as written, and keeps an id's later line; receiptReader reads a listed receipt's text and gives null for an unlisted name, for ../README and for a name ending in .md.
 *
 * NAMED RESIDUALS (a named family with its pinned quiet row, rule 19(d); a residual is a known escape, not a pass):
 *  R-BYTES-SPLIT: L-BYTES reads one string at a time, so a row or control whose one string names the type and another string
 *    names byte data is not refused. Quiet rows: SL-BYTES-SPLIT-QUIET plants such a row and reads no finding; SL-BYTES-WATCH
 *    pins, in the committed ledger, the rows and controls that name the type (EAT-R001, EAT-R002 and EAT-R003, none other)
 *    and every string of theirs that holds byte, so a byte string added to one of them reds.
 *  R-BYTES-WORDING: a statement that a result carries byte data in words holding neither the type name nor byte (the
 *    preservation-failed result carries the edited octets) is not refused. Quiet rows: SL-BYTES-WORDING-QUIET plants one and
 *    reads no finding; SL-BYTES-WATCH pins the exact text of every committed string that names the type.
 *  R-HX-CONTEXT: the census leg's residual (test/workbench-mechanical-status-ledger.census.ts, quiet row TF-RESIDUAL).
 *
 * NOT CLAIMED by this file: that a row's class is the true state of the program (the class is this ledger's reading of the
 * receipts, tests and Beads records the row cites); that a row's bead or group is the one that tracks its requirement beyond
 * the group table the judge carries; that a tested form is registered, run, passed or asserting (the census leg reads that), or that a tested row's forms are every case that tests its requirement;
 * what an anchor proves; the requirement titles, the blocked details and the partial reasons as statements of fact; the pins
 * as the current tips of their refs (the receipt names the measurement); the re-pin record of EAT-R201 and the joint P00/M00
 * rulings of EAT-R203..EAT-R209, which this bead does not carry; Beads state outside the export files; that SL-LIVE stays
 * green over a later export (a bead anchor held only by the notes of a bead the export holds open or deferred is read again
 * from each later export, so a notes replace that drops it reds SL-LIVE once that export lands; the landing-order registry
 * names this file's reads, R-B761); any letter case folding beyond toLowerCase and any look-alike spelling of the type name
 * or of byte.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { type DocsSection, docsSection } from "./helpers/census.js";
import {
  type BeadText,
  beadsFromExport,
  LEDGER_PATH,
  type LedgerContext,
  ledgerFindings,
  PENDING,
  readBeads,
  readLedger,
  receiptReader,
} from "./helpers/mechanical-status-ledger.js";

/** Every case judges the whole ledger over the export and the receipts; each declares its own time budget (EAT-R168's form). */
const BUDGET = 120_000;
const REPO = join(import.meta.dirname, "..");

type Obj = Record<string, unknown>;
const obj = (value: unknown): Obj => value as Obj;
const list = (value: unknown): unknown[] => value as unknown[];

const sections = new Map<string, DocsSection>();
/** docsSection memoized on its whole input: the same markdown, heading, depth and parents read once per file run. */
const section = (markdown: string, heading: string, depth: number, parents: readonly string[]): DocsSection => {
  const key = JSON.stringify([markdown, heading, depth, parents]);
  const known = sections.get(key);
  if (known !== undefined) return known;
  const read = docsSection(markdown, heading, depth, parents);
  sections.set(key, read);
  return read;
};

let beadsMemo: ReadonlyMap<string, BeadText> | undefined;
const beads = (): ReadonlyMap<string, BeadText> => {
  beadsMemo ??= readBeads(REPO);
  return beadsMemo;
};
const receipts = receiptReader(REPO);
let committedText: string | undefined;
/** A fresh parse of the committed ledger (read once per file run). */
const committed = (): Obj => {
  committedText ??= readFileSync(join(REPO, LEDGER_PATH), "utf8");
  return obj(JSON.parse(committedText));
};

const context = (over: Partial<LedgerContext> = {}): LedgerContext => ({ beads: beads(), readReceipt: receipts, section, ...over });
const rowsOf = (ledger: Obj): Obj[] => list(ledger.rows).map(obj);
const rowOf = (ledger: Obj, id: string): Obj => {
  const row = rowsOf(ledger).find(item => item.id === id);
  if (row === undefined) throw new Error(`the committed ledger holds no row ${id}`);
  return row;
};
const controlOf = (ledger: Obj): Obj => obj(list(ledger.controls)[0]);
const summaryOf = (ledger: Obj): Obj => obj(ledger.summary);
const byClassOf = (ledger: Obj): Obj => obj(summaryOf(ledger).byClass);
/** The findings for one clone of the committed ledger after `edit`, judged in `over`'s context. */
const plant = (edit: (ledger: Obj) => void, over: Partial<LedgerContext> = {}): string[] => {
  const ledger = committed();
  edit(ledger);
  return ledgerFindings(ledger, context(over));
};
/** The export records with `records` set over them (a planted record replaces the committed one of its id). */
const withBeads = (records: Readonly<Record<string, BeadText>>): ReadonlyMap<string, BeadText> => new Map([...beads(), ...Object.entries(records)]);
/** The receipts with `name` read as `text`. */
const withReceipt =
  (name: string, text: string) =>
  (asked: string): string | null =>
    asked === name ? text : receipts(asked);

/** EAT-R202 AC2: the type the requirement names, spelled here, never read from the judge. */
const TYPE_NAME = "WorktreePreservationFailedResult";
/** EAT-R202 AC2: the pending sentence, spelled here word for word, never read from the judge. */
const PENDING_SENTENCE =
  "Pending, outside these fixed forms: a per-agent skip or retry issued while beforeDispatch is parked (EAT-R015, EAT-R016) is a witnessed open violation (wb-9v02 receipt, status pending); these fixed forms do not cover it.";
const OTHER_SHA = "0123456789abcdef0123456789abcdef01234567";
const STATEMENT = `${TYPE_NAME} holds the edited bytes`;
const pinOf = (row: Obj): Obj => obj(row.pin);
const formOf = (row: Obj, index: number): Obj => obj(list(row.testedForms)[index]);
const evidenceOf = (row: Obj, index: number): Obj => obj(list(row.evidence)[index]);
const digest = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 12);
const shapeOf = (owner: Obj): string =>
  [owner.id, owner.class, owner.group ?? "-", owner.bead ?? "-", list(owner.testedForms).length, list(owner.evidence ?? []).length, digest(owner)].join(":");

describe("wb-hhxs EAT-R202: the committed status ledger, judged with the committed export and receipts", () => {
  it("SL-LIVE the committed ledger, judged with the committed export, the committed receipts and docsSection, gives no finding", { timeout: BUDGET }, () => {
    expect(ledgerFindings(readLedger(REPO), context())).toEqual([]);
  });

  it("SL-SHAPE the rows and the control hold the frozen shape of this cut (rule 16)", () => {
    const ledger = committed();
    expect([...rowsOf(ledger).map(shapeOf), ...list(ledger.controls).map(item => shapeOf(obj(item)))]).toEqual(FROZEN_SHAPE);
  });

  it("SL-COUNTS 200 rows: 75 already-implemented/tested, 31 partial/inert, 94 blocked; three plan groups complete", () => {
    const ledger = committed();
    const classes = rowsOf(ledger).map(row => row.class);
    expect({
      rows: classes.length,
      tested: classes.filter(item => item === "already-implemented/tested").length,
      partial: classes.filter(item => item === "partial/inert").length,
      blocked: classes.filter(item => item === "blocked").length,
      complete: summaryOf(ledger).planGroupsComplete,
    }).toEqual({ rows: 200, tested: 75, partial: 31, blocked: 94, complete: ["B-detached-grants", "B-replay", "B-hx-evidence"] });
  });
});

describe("wb-hhxs EAT-R202: L-SCHEMA, L-IDS, L-CLASS and L-PIN over planted ledgers", () => {
  it.each([
    ["an array", []],
    ["null", null],
    ["a string", "ledger"],
  ])("SL-SCHEMA-NOT-OBJECT a ledger that is %s is refused", (_name, value) => {
    expect(ledgerFindings(value, context())).toEqual(["L-SCHEMA: the ledger is not an object"]);
  });

  it("SL-SCHEMA-NAME another schema string is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (ledger.schema = "workbench.mechanical-status-ledger/v2"))).toEqual(["L-SCHEMA: schema is not workbench.mechanical-status-ledger/v1"]);
  });

  it.each([
    ["pi", "39 hex", "8".repeat(39)],
    ["pi", "41 hex", "8".repeat(41)],
    ["pi", "an upper-case letter", `A${"8".repeat(39)}`],
    ["pi", "an array holding the pin", ["8".repeat(40)]],
    ["mw", "39 hex", "9".repeat(39)],
    ["mw", "41 hex", "9".repeat(41)],
    ["mw", "an upper-case letter", `B${"9".repeat(39)}`],
    ["mw", "an array holding the pin", ["9".repeat(40)]],
  ])("SL-SCHEMA-PIN pins.%s.commit of %s, every row carrying the same value, is refused", { timeout: BUDGET }, (key, _name, value) => {
    const findings = plant(ledger => {
      obj(obj(ledger.pins)[key]).commit = value;
      for (const row of rowsOf(ledger)) pinOf(row)[key] = value;
    });
    expect(findings).toEqual([`L-SCHEMA: pins.${key}.commit is not 40 lower-case hex`]);
  });

  it("SL-SCHEMA-PINS-ABSENT a ledger without pins is refused, and every row's pin then differs from it", { timeout: BUDGET }, () => {
    const findings = plant(ledger => delete ledger.pins);
    expect(findings.slice(0, 2)).toEqual(["L-SCHEMA: pins.pi.commit is not 40 lower-case hex", "L-SCHEMA: pins.mw.commit is not 40 lower-case hex"]);
    expect(findings.slice(2)).toEqual(rowsOf(committed()).flatMap(row => [`L-PIN: ${row.id} pin.pi is not the ledger's pins.pi.commit`, `L-PIN: ${row.id} pin.mw is not the ledger's pins.mw.commit`]));
  });

  it("SL-SCHEMA-ROWS rows that are not an array are refused, and nothing else is read", () => {
    expect(plant(ledger => (ledger.rows = {}))).toEqual(["L-SCHEMA: rows is not an array"]);
  });

  it("SL-SCHEMA-CONTROLS controls that are not an array are refused, and nothing else is read", () => {
    expect(plant(ledger => (ledger.controls = "F10"))).toEqual(["L-SCHEMA: controls is not an array"]);
  });

  it("SL-SCHEMA-ROW a row that is not an object is refused; the ids and the summary then differ from the rows", { timeout: BUDGET }, () => {
    const findings = plant(ledger => (list(ledger.rows)[5] = "EAT-R006"));
    expect(findings).toEqual([
      "L-SCHEMA: rows[5] is not an object",
      "L-IDS: the row ids are not EAT-R001..EAT-R200, each once, in order (199 rows)",
      "L-SUMMARY: summary.rows is not 199",
      'L-SUMMARY: summary.byClass is not {"already-implemented/tested":75,"partial/inert":31,"blocked":93}',
    ]);
  });

  it("SL-SCHEMA-CONTROL a control that is not an object is refused, and the control ids then differ", { timeout: BUDGET }, () => {
    expect(plant(ledger => (list(ledger.controls)[0] = "F10"))).toEqual(["L-SCHEMA: controls[0] is not an object", "L-CONTROL: the control ids are not exactly F10"]);
  });

  it.each([
    [
      "deleted",
      (ledger: Obj) => {
        ledger.rows = rowsOf(ledger).filter(row => row.id !== "EAT-R100");
        summaryOf(ledger).rows = 199;
        byClassOf(ledger)["already-implemented/tested"] = 74;
      },
      199,
    ],
    ["duplicated", (ledger: Obj) => (rowOf(ledger, "EAT-R100").id = "EAT-R099"), 200],
    ["replaced by EAT-R201", (ledger: Obj) => (rowOf(ledger, "EAT-R100").id = "EAT-R201"), 200],
    [
      "swapped with its neighbour",
      (ledger: Obj) => {
        const rows = rowsOf(ledger);
        ledger.rows = [...rows.slice(0, 98), rows[99], rows[98], ...rows.slice(100)];
      },
      200,
    ],
    [
      "appended as EAT-R201",
      (ledger: Obj) => {
        ledger.rows = [...rowsOf(ledger), { ...rowOf(ledger, "EAT-R200"), id: "EAT-R201" }];
        summaryOf(ledger).rows = 201;
        byClassOf(ledger).blocked = 95;
      },
      201,
    ],
  ])("SL-IDS a row id %s is refused with the one L-IDS finding", { timeout: BUDGET }, (_name, edit, rows) => {
    expect(plant(edit)).toEqual([`L-IDS: the row ids are not EAT-R001..EAT-R200, each once, in order (${rows} rows)`]);
  });

  it("SL-CLASS a class outside the three is refused", { timeout: BUDGET }, () => {
    const findings = plant(ledger => {
      const row = rowOf(ledger, "EAT-R005");
      row.class = "blocked-ish";
      delete row.blockedBy;
      byClassOf(ledger).blocked = 93;
    });
    expect(findings).toEqual(["L-CLASS: EAT-R005 class is not one of already-implemented/tested, partial/inert, blocked"]);
  });

  it.each([
    ["pi", (row: Obj) => (pinOf(row).pi = OTHER_SHA), ["L-PIN: EAT-R057 pin.pi is not the ledger's pins.pi.commit"]],
    ["mw", (row: Obj) => (pinOf(row).mw = OTHER_SHA), ["L-PIN: EAT-R057 pin.mw is not the ledger's pins.mw.commit"]],
    ["both, the pin deleted", (row: Obj) => delete row.pin, ["L-PIN: EAT-R057 pin.pi is not the ledger's pins.pi.commit", "L-PIN: EAT-R057 pin.mw is not the ledger's pins.mw.commit"]],
  ])("SL-PIN a row pin differing from the ledger's (%s) is refused", { timeout: BUDGET }, (_name, edit, expected) => {
    expect(plant(ledger => edit(rowOf(ledger, "EAT-R057")))).toEqual(expected);
  });
});

describe("wb-hhxs EAT-R202 AC3: L-BEAD and L-GROUP over planted ledgers and export records", () => {
  it("SL-BEAD-FABRICATED a bead id the export does not hold is refused by L-BEAD and L-GROUP", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").bead = "wb-zz99"))).toEqual([
      "L-BEAD: EAT-R005 bead wb-zz99 is neither none nor an id the export holds",
      "L-GROUP: EAT-R005 bead wb-zz99 is neither none nor the bead wb-w8fk of its group B-contract-choice",
    ]);
  });

  it("SL-BEAD-NOT-STRING a bead that is a number is refused by L-BEAD and L-GROUP", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").bead = 5))).toEqual([
      "L-BEAD: EAT-R005 bead 5 is neither none nor an id the export holds",
      "L-GROUP: EAT-R005 bead 5 is neither none nor the bead wb-w8fk of its group B-contract-choice",
    ]);
  });

  it("SL-BEAD-NONE the bead none is quiet", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").bead = "none"))).toEqual([]);
  });

  it("SL-BEAD-OTHER-GROUP a bead the export holds that is not the row's group's bead is refused by L-GROUP alone", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").bead = "wb-5ik5"))).toEqual(["L-GROUP: EAT-R005 bead wb-5ik5 is neither none nor the bead wb-w8fk of its group B-contract-choice"]);
  });

  it("SL-GROUP-UNMAPPED a row group label outside the 27 mapped labels is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").group = "B-unplanned"))).toEqual(["L-GROUP: EAT-R005 group B-unplanned is not a mapped label"]);
  });

  it("SL-GROUP-EXPORT-ABSENT an export without wb-f3wd is refused by L-GROUP and by L-BEAD for EAT-R057", { timeout: BUDGET }, () => {
    const without = new Map([...beads()].filter(([id]) => id !== "wb-f3wd"));
    expect(plant(() => undefined, { beads: without })).toEqual([
      "L-GROUP: the export does not hold wb-f3wd, the bead of B-hx-evidence",
      "L-BEAD: EAT-R057 bead wb-f3wd is neither none nor an id the export holds",
    ]);
  });

  it.each([
    ["text before the tag", "x [MWI-hx-evidence] planted"],
    ["a longer tag", "[MWI-hx-evidencex] planted"],
    ["a space before the tag", " [MWI-hx-evidence] planted"],
    ["a tab before the tag", "\t[MWI-hx-evidence] planted"],
    ["a line break before the tag", "\n[MWI-hx-evidence] planted"],
    ["the tag in lower case", "[mwi-hx-evidence] planted"],
    ["the tag without its closing bracket", "[MWI-hx-evidence planted"],
    ["no text (an empty title)", ""],
  ])("SL-GROUP-EXPORT-TITLE an export title of wb-f3wd with %s is refused", { timeout: BUDGET }, (_name, title) => {
    const record = beads().get("wb-f3wd");
    if (record === undefined) throw new Error("the committed export holds no wb-f3wd");
    expect(plant(() => undefined, { beads: withBeads({ "wb-f3wd": { ...record, title } }) })).toEqual(["L-GROUP: the export title of wb-f3wd does not start with [MWI-hx-evidence]"]);
  });
});

describe("wb-hhxs EAT-R202 AC1: L-TESTED, L-PARTIAL and L-BLOCKED over planted ledgers", () => {
  it("SL-TESTED-NONE a tested row with no tested form is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R057").testedForms = []))).toEqual(["L-TESTED: EAT-R057 is tested but names no tested form"]);
  });

  it("SL-TESTED-NOT-TESTED a blocked row naming a tested form is refused", { timeout: BUDGET }, () => {
    const findings = plant(ledger => (rowOf(ledger, "EAT-R005").testedForms = [formOf(rowOf(ledger, "EAT-R057"), 0)]));
    expect(findings).toEqual(["L-TESTED: EAT-R005 is not tested but names a tested form"]);
  });

  it("SL-TESTED-NOT-ARRAY testedForms that is not an array is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R057").testedForms = "PF-R057"))).toEqual(["L-TESTED: EAT-R057 testedForms is not an array"]);
  });

  it.each([
    ["a string", () => "PF"],
    ["null", () => null],
    ["a white-space file", (form: Obj) => ({ ...form, file: "  " })],
    ["a number file", (form: Obj) => ({ ...form, file: 5 })],
    ["no title", (form: Obj) => ({ file: form.file, suite: form.suite })],
    ["a string suite", (form: Obj) => ({ ...form, suite: "suite" })],
    ["an empty suite entry", (form: Obj) => ({ ...form, suite: [""] })],
    ["a number suite entry", (form: Obj) => ({ ...form, suite: [5] })],
  ])("SL-TESTED-FORM a tested form that is %s is refused", { timeout: BUDGET }, (_name, replace) => {
    const findings = plant(ledger => {
      const row = rowOf(ledger, "EAT-R057");
      list(row.testedForms)[0] = replace(formOf(row, 0));
    });
    expect(findings).toEqual(["L-TESTED: EAT-R057 testedForms[0] is not an object with a non-empty string file and title and a suite of non-empty strings"]);
  });

  it("SL-TESTED-SUITE-EMPTY a tested form whose suite is the empty array is quiet", { timeout: BUDGET }, () => {
    expect(plant(ledger => (formOf(rowOf(ledger, "EAT-R057"), 0).suite = []))).toEqual([]);
  });

  it.each([
    ["deleted", (row: Obj) => delete row.partialBecause, ["L-PARTIAL: EAT-R004 is partial/inert without partialBecause"]],
    ["a string", (row: Obj) => (row.partialBecause = "inert"), ["L-PARTIAL: EAT-R004 is partial/inert without partialBecause"]],
  ])("SL-PARTIAL-NONE a partial/inert row whose partialBecause is %s is refused", { timeout: BUDGET }, (_name, edit, expected) => {
    expect(plant(ledger => edit(rowOf(ledger, "EAT-R004")))).toEqual(expected);
  });

  it.each([
    ["white space", "   "],
    ["a number", 5],
  ])("SL-PARTIAL-TEXT a partial/inert reason that is %s is refused", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (obj(rowOf(ledger, "EAT-R004").partialBecause).text = value))).toEqual(["L-PARTIAL: EAT-R004 partialBecause.text is not a non-empty string"]);
  });

  it.each([
    ["an anchor its section does not hold", (because: Obj) => (obj(because.source).anchor = "no receipt sentence says this"), "L-PARTIAL: EAT-R004 partialBecause.source anchor is in no block of the rendered section: no receipt sentence says this"],
    ["absent", (because: Obj) => delete because.source, "L-PARTIAL: EAT-R004 partialBecause.source has no anchor"],
  ])("SL-PARTIAL-SOURCE a partial/inert source that is %s is refused", { timeout: BUDGET }, (_name, edit, expected) => {
    expect(plant(ledger => edit(obj(rowOf(ledger, "EAT-R004").partialBecause)))).toEqual([expected]);
  });

  it("SL-PARTIAL-CARRIED a tested row carrying partialBecause is refused", { timeout: BUDGET }, () => {
    const findings = plant(ledger => (rowOf(ledger, "EAT-R057").partialBecause = rowOf(ledger, "EAT-R004").partialBecause));
    expect(findings).toEqual(["L-PARTIAL: EAT-R057 is not partial/inert but carries partialBecause"]);
  });

  it.each([
    ["deleted", (row: Obj) => delete row.blockedBy, "L-BLOCKED: EAT-R005 is blocked without blockedBy"],
    ["a string", (row: Obj) => (row.blockedBy = "unratified"), "L-BLOCKED: EAT-R005 is blocked without blockedBy"],
  ])("SL-BLOCKED-NONE a blocked row whose blockedBy is %s is refused", { timeout: BUDGET }, (_name, edit, expected) => {
    expect(plant(ledger => edit(rowOf(ledger, "EAT-R005")))).toEqual([expected]);
  });

  it("SL-BLOCKED-KIND a blocker kind outside the four is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (obj(rowOf(ledger, "EAT-R005").blockedBy).kind = "elsewhere"))).toEqual(["L-BLOCKED: EAT-R005 blockedBy.kind is not one of external, dependency, unratified, unowned"]);
  });

  it.each([
    ["empty", ""],
    ["white space", "  "],
    ["a number", 5],
  ])("SL-BLOCKED-DETAIL a blocker detail that is %s is refused", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (obj(rowOf(ledger, "EAT-R005").blockedBy).detail = value))).toEqual(["L-BLOCKED: EAT-R005 blockedBy.detail is not a non-empty string"]);
  });

  it("SL-BLOCKED-CARRIED a tested row carrying blockedBy is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R057").blockedBy = rowOf(ledger, "EAT-R005").blockedBy))).toEqual(["L-BLOCKED: EAT-R057 is not blocked but carries blockedBy"]);
  });
});

const PLANTED_RECEIPT = "wb-zz99";
const PLANTED_SECTION = { heading: "S planted", depth: 2, parents: ["T planted"] };
const ANCHOR = "ANCHOR-PLANTED";
/** A planted receipt holding `body` under its planted section, and a next section holding `after`. */
const receiptText = (body: string, after = "after"): string => `# T planted\n\n## S planted\n\n${body}\n\n## Next planted\n\n${after}\n`;
/** EAT-R005's evidence replaced by one planted receipt anchor. */
const plantedReceiptRow = (ledger: Obj): void => {
  rowOf(ledger, "EAT-R005").evidence = [{ receipt: PLANTED_RECEIPT, section: PLANTED_SECTION, anchor: ANCHOR }];
};
const notInBlock = `L-EVIDENCE: EAT-R005 evidence[0] anchor is in no block of the rendered section: ${ANCHOR}`;

describe("wb-hhxs EAT-R202 AC1: L-EVIDENCE over planted ledgers, export records and receipts", () => {
  it.each([
    ["an empty array", []],
    ["a string", "EAT-R005"],
  ])("SL-EVIDENCE-NONE evidence that is %s is refused", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").evidence = value))).toEqual(["L-EVIDENCE: EAT-R005 evidence is not a non-empty array"]);
  });

  it.each([
    ["a string", "EAT-R005"],
    ["null", null],
    ["an empty anchor", { bead: "wb-w8fk", anchor: "" }],
    ["a white-space anchor", { bead: "wb-w8fk", anchor: "  " }],
    ["a number anchor", { bead: "wb-w8fk", anchor: 5 }],
    ["no anchor", { bead: "wb-w8fk" }],
  ])("SL-EVIDENCE-NO-ANCHOR an evidence item that is %s is refused", { timeout: BUDGET }, (_name, item) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").evidence = [item]))).toEqual(["L-EVIDENCE: EAT-R005 evidence[0] has no anchor"]);
  });

  it("SL-EVIDENCE-NEITHER an item naming neither a receipt nor a bead is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R005").evidence = [{ anchor: "EAT-R005", path: "docs/workbench/receipts/wb-w8fk.md" }]))).toEqual([
      "L-EVIDENCE: EAT-R005 evidence[0] names neither a receipt nor a bead",
    ]);
  });

  it("SL-EVIDENCE-RECEIPT-FIRST an item whose receipt member is a string is read as a receipt anchor; a bead member beside it is not read", { timeout: BUDGET }, () => {
    const findings = plant(ledger => (evidenceOf(rowOf(ledger, "EAT-R057"), 0).bead = "wb-zz99"));
    expect(findings).toEqual([]);
  });

  it("SL-EVIDENCE-RECEIPT-FIRST an item whose receipt member is a number is read as a bead anchor through its bead member", { timeout: BUDGET }, () => {
    const findings = plant(ledger => (evidenceOf(rowOf(ledger, "EAT-R005"), 0).receipt = 5));
    expect(findings).toEqual([]);
  });

  it("SL-EVIDENCE-BEAD a bead anchor naming a bead the export does not hold is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (evidenceOf(rowOf(ledger, "EAT-R005"), 0).bead = "wb-zz99"))).toEqual(["L-EVIDENCE: EAT-R005 evidence[0] names wb-zz99, which the export does not hold"]);
  });

  it.each([
    ["only its title", { title: ANCHOR, description: "", notes: "" }, false],
    ["only its acceptance_criteria", { title: "", description: "", notes: "", acceptance_criteria: ANCHOR }, false],
    ["only its design", { title: "", description: "", notes: "", design: ANCHOR }, false],
    ["split across its description and its notes", { title: "", description: "ANCHOR-", notes: "PLANTED" }, false],
    ["its description", { title: "", description: `before ${ANCHOR} after`, notes: "" }, true],
    ["its notes", { title: "", description: "", notes: `before ${ANCHOR} after` }, true],
  ])("SL-EVIDENCE-BEAD an anchor held by %s of a planted export record is read as the rule names", { timeout: BUDGET }, (_name, fields, quiet) => {
    const [[, record]] = [...beadsFromExport(`${JSON.stringify({ id: "wb-zz98", ...fields })}\n`)];
    const findings = plant(ledger => (rowOf(ledger, "EAT-R005").evidence = [{ bead: "wb-zz98", anchor: ANCHOR }]), { beads: withBeads({ "wb-zz98": record }) });
    expect(findings).toEqual(quiet ? [] : [`L-EVIDENCE: EAT-R005 evidence[0] anchor is in neither the description nor the notes of wb-zz98: ${ANCHOR}`]);
  });

  it("SL-EVIDENCE-RECEIPT a receipt name docs/workbench/receipts does not list is refused", { timeout: BUDGET }, () => {
    expect(plant(plantedReceiptRow)).toEqual([`L-EVIDENCE: EAT-R005 evidence[0] names the receipt ${PLANTED_RECEIPT}, which docs/workbench/receipts does not list`]);
  });

  it.each([
    ["absent", undefined],
    ["a string", "S planted"],
    ["an empty heading", { ...PLANTED_SECTION, heading: "" }],
    ["a depth of 1.5", { ...PLANTED_SECTION, depth: 1.5 }],
    ["a depth of 0", { ...PLANTED_SECTION, depth: 0 }],
    ["a depth of 7", { ...PLANTED_SECTION, depth: 7 }],
    ["string parents", { ...PLANTED_SECTION, parents: "T planted" }],
    ["an empty parent", { ...PLANTED_SECTION, parents: [""] }],
  ])("SL-EVIDENCE-SECTION a receipt anchor whose section is %s is refused", { timeout: BUDGET }, (_name, value) => {
    const findings = plant(
      ledger => {
        plantedReceiptRow(ledger);
        evidenceOf(rowOf(ledger, "EAT-R005"), 0).section = value;
      },
      { readReceipt: withReceipt(PLANTED_RECEIPT, receiptText(ANCHOR)) },
    );
    expect(findings).toEqual(["L-EVIDENCE: EAT-R005 evidence[0] names no section: a heading, a depth from 1 to 6 and parent headings"]);
  });

  it("SL-EVIDENCE-UNBOUND a section docsSection does not bind is refused, naming docsSection's cause", { timeout: BUDGET }, () => {
    const text = receiptText(ANCHOR).replace("# T planted", "# T other");
    const findings = plant(plantedReceiptRow, { readReceipt: withReceipt(PLANTED_RECEIPT, text) });
    const why = docsSection(text, PLANTED_SECTION.heading, PLANTED_SECTION.depth, PLANTED_SECTION.parents).why;
    expect({ findings, bound: why.length > 0 }).toEqual({ findings: [`L-EVIDENCE: EAT-R005 evidence[0] section is not bound: ${why}`], bound: true });
  });

  it.each([
    ["a paragraph", receiptText(`a paragraph holding ${ANCHOR} here`), true],
    ["one list item", receiptText(`- first item\n- an item holding ${ANCHOR}`), true],
    ["a code block", receiptText(`\`\`\`\ncode ${ANCHOR}\n\`\`\``), true],
    ["a subsection heading", receiptText(`### sub ${ANCHOR}\n\ntext`), true],
    ["a block quote", receiptText(`> quoted ${ANCHOR}`), true],
    ["two list items, split", receiptText("- ANCHOR-\n- PLANTED"), false],
    ["an HTML comment of a paragraph", receiptText(`a paragraph <!-- ${ANCHOR} --> here`), false],
    ["an HTML block", receiptText(`<div>\n${ANCHOR}\n</div>`), false],
    ["the next section", receiptText("text", ANCHOR), false],
  ])("SL-EVIDENCE-BLOCK an anchor in %s of a planted receipt is read as the rule names", { timeout: BUDGET }, (_name, text, quiet) => {
    expect(plant(plantedReceiptRow, { readReceipt: withReceipt(PLANTED_RECEIPT, text) })).toEqual(quiet ? [] : [notInBlock]);
  });

  it.each([
    ["two list items joined by a space", "- ANCHOR\n- PLANTED", "ANCHOR PLANTED"],
    ["two paragraphs joined by a space", "ANCHOR\n\nPLANTED", "ANCHOR PLANTED"],
    ["two paragraphs joined by a line break", "ANCHOR\n\nPLANTED", "ANCHOR\nPLANTED"],
  ])("SL-EVIDENCE-BLOCK an anchor that only %s would hold is refused", { timeout: BUDGET }, (_name, body, anchor) => {
    const findings = plant(
      ledger => {
        plantedReceiptRow(ledger);
        evidenceOf(rowOf(ledger, "EAT-R005"), 0).anchor = anchor;
      },
      { readReceipt: withReceipt(PLANTED_RECEIPT, receiptText(body)) },
    );
    expect(findings).toEqual([`L-EVIDENCE: EAT-R005 evidence[0] anchor is in no block of the rendered section: ${anchor}`]);
  });

  it("SL-EVIDENCE-BLOCK an anchor held only by the section's own heading is refused", { timeout: BUDGET }, () => {
    const heading = `S planted ${ANCHOR}`;
    const text = receiptText("text").replace("## S planted", `## ${heading}`);
    const findings = plant(
      ledger => {
        plantedReceiptRow(ledger);
        evidenceOf(rowOf(ledger, "EAT-R005"), 0).section = { ...PLANTED_SECTION, heading };
      },
      { readReceipt: withReceipt(PLANTED_RECEIPT, text) },
    );
    expect(findings).toEqual([notInBlock]);
  });
});

const ac2Owner = (ledger: Obj, where: string): Obj => (where === "control F10" ? controlOf(ledger) : rowOf(ledger, where));
/** EAT-R202 AC2: the six rows the requirement names and the run-wide control, spelled here, never read from the judge. */
const AC2_OWNERS: readonly string[] = ["EAT-R001", "EAT-R002", "EAT-R003", "EAT-R012", "EAT-R013", "EAT-R014", "control F10"];

describe("wb-hhxs EAT-R202 AC2: L-AC2 and L-CONTROL over planted ledgers and receipts", () => {
  it.each(AC2_OWNERS)("SL-AC2-FIXED %s without fixedForms is refused", { timeout: BUDGET }, where => {
    expect(plant(ledger => delete ac2Owner(ledger, where).fixedForms)).toEqual([`L-AC2: ${where} fixedForms is not a non-empty array of non-empty strings`]);
  });

  it.each([
    ["empty", []],
    ["holding an empty string", [""]],
    ["holding white space", ["   "]],
    ["a string", "the fixed form"],
  ])("SL-AC2-FIXED-EMPTY EAT-R001 with fixedForms %s is refused", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R001").fixedForms = value))).toEqual(["L-AC2: EAT-R001 fixedForms is not a non-empty array of non-empty strings"]);
  });

  it.each(["skip", "Retry", "skipped"])("SL-AC2-FIXED-WORD EAT-R001 with a fixed form holding %s is refused", { timeout: BUDGET }, word => {
    const findings = plant(ledger => {
      const forms = list(rowOf(ledger, "EAT-R001").fixedForms);
      forms[0] = `${String(forms[0])}; the ${word} is fixed too`;
    });
    expect(findings).toEqual(["L-AC2: EAT-R001 fixedForms[0] names skip or retry"]);
  });

  it("SL-AC2-ABSENT an AC2 row deleted is read by L-IDS alone", { timeout: BUDGET }, () => {
    const findings = plant(ledger => {
      ledger.rows = rowsOf(ledger).filter(row => row.id !== "EAT-R012");
      summaryOf(ledger).rows = 199;
      byClassOf(ledger)["already-implemented/tested"] = 74;
    });
    expect(findings).toEqual(["L-IDS: the row ids are not EAT-R001..EAT-R200, each once, in order (199 rows)"]);
  });

  it.each(AC2_OWNERS)("SL-AC2-PENDING %s without pending is refused", { timeout: BUDGET }, where => {
    expect(plant(ledger => delete ac2Owner(ledger, where).pending)).toEqual([`L-AC2: ${where} pending is not the pending sentence`]);
  });

  it("SL-AC2-SENTENCE the judge's pending sentence is the sentence this file spells, word for word", () => {
    expect(PENDING).toBe(PENDING_SENTENCE);
  });

  it.each([
    ["naming wb-9v02.1", PENDING.replace("wb-9v02", "wb-9v02.1")],
    ["ending in a space", `${PENDING} `],
    ["with one word changed", PENDING.replace("witnessed", "suspected")],
  ])("SL-AC2-PENDING-VARIANT EAT-R012 with a pending sentence %s is refused", { timeout: BUDGET }, (_name, pending) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R012").pending = pending))).toEqual(["L-AC2: EAT-R012 pending is not the pending sentence"]);
  });

  it("SL-AC2-WITNESS a wb-9v02 receipt whose 2026-11-06 section does not hold the pending witness is refused, with EAT-R160's evidence citing it", { timeout: BUDGET }, () => {
    const text = receipts("wb-9v02");
    if (text === null) throw new Error("docs/workbench/receipts lists no wb-9v02");
    const altered = text.replace("Status: pending. The red was witnessed", "Status: open. The red was witnessed");
    const findings = plant(() => undefined, { readReceipt: withReceipt("wb-9v02", altered) });
    expect({ changed: altered !== text, findings }).toEqual({
      changed: true,
      findings: [
        "L-EVIDENCE: EAT-R160 evidence[1] anchor is in no block of the rendered section: Status: pending. The red was witnessed, and this cut carries no fix",
        "L-AC2: the pending witness anchor is in no block of the rendered section: Status: pending. The red was witnessed, and this cut carries no fix",
      ],
    });
  });

  it.each([
    ["no control", (ledger: Obj) => (ledger.controls = [])],
    ["a second control F11", (ledger: Obj) => (ledger.controls = [controlOf(ledger), { ...controlOf(ledger), id: "F11" }])],
    ["the control renamed F11", (ledger: Obj) => (controlOf(ledger).id = "F11")],
  ])("SL-CONTROL-IDS %s is refused", { timeout: BUDGET }, (_name, edit) => {
    expect(plant(edit)).toEqual(["L-CONTROL: the control ids are not exactly F10"]);
  });

  it("SL-CONTROL-CLASS a control that is partial/inert is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (controlOf(ledger).class = "partial/inert"))).toEqual(["L-CONTROL: control F10 class is not already-implemented/tested"]);
  });

  it("SL-CONTROL-FORMS a control with no tested form is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (controlOf(ledger).testedForms = []))).toEqual(["L-TESTED: control F10 is tested but names no tested form"]);
  });
});

const bytesFinding = (where: string): string => `L-BYTES: ${where} names ${TYPE_NAME} and byte data`;

describe("wb-hhxs EAT-R202 AC2: L-BYTES over planted ledgers", () => {
  it.each([
    ["a row title", "EAT-R001.title", (ledger: Obj) => (rowOf(ledger, "EAT-R001").title = STATEMENT)],
    ["a blocked detail", "EAT-R005.blockedBy.detail", (ledger: Obj) => (obj(rowOf(ledger, "EAT-R005").blockedBy).detail = STATEMENT)],
    ["a partial reason", "EAT-R004.partialBecause.text", (ledger: Obj) => (obj(rowOf(ledger, "EAT-R004").partialBecause).text = STATEMENT)],
    ["a tested form title", "EAT-R057.testedForms[0].title", (ledger: Obj) => (formOf(rowOf(ledger, "EAT-R057"), 0).title = STATEMENT)],
    ["a member this ledger does not use", "EAT-R004.note", (ledger: Obj) => (rowOf(ledger, "EAT-R004").note = STATEMENT)],
    ["a nested array", "EAT-R004.extra[0][0].text", (ledger: Obj) => (rowOf(ledger, "EAT-R004").extra = [[{ text: STATEMENT }]])],
    ["a member name", `EAT-R004.note.${STATEMENT} (member name)`, (ledger: Obj) => (rowOf(ledger, "EAT-R004").note = { [STATEMENT]: "the kept path" })],
    ["the F10 control's title", "control F10.title", (ledger: Obj) => (controlOf(ledger).title = STATEMENT)],
    ["the F10 control's fixed form", "control F10.fixedForms[0]", (ledger: Obj) => (list(controlOf(ledger).fixedForms)[0] = STATEMENT)],
  ])("SL-BYTES a string naming the type and byte data in %s is refused", { timeout: BUDGET }, (_name, where, edit) => {
    expect(plant(edit)).toEqual([bytesFinding(where)]);
  });

  it.each([
    ["the type in lower case", "worktreepreservationfailedresult holds the edited bytes"],
    ["byte in upper case", `${TYPE_NAME} HOLDS THE EDITED BYTES`],
  ])("SL-BYTES-CASE %s is refused", { timeout: BUDGET }, (_name, text) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = text))).toEqual([bytesFinding("EAT-R004.note")]);
  });

  it.each([
    ["a parenthesis naming a path", `${TYPE_NAME} (see src/worktree.ts) contains the edited bytes`],
    ["a parenthesis naming a version", `; ${TYPE_NAME} (schema v1.2) contains the edited bytes`],
    ["e.g.", `${TYPE_NAME} contains e.g. the edited bytes`],
    ["a sentence break", `${TYPE_NAME} is returned. It contains the edited bytes`],
  ])("SL-BYTES-PERIOD a string naming the type and byte data across %s is refused", { timeout: BUDGET }, (_name, text) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = text))).toEqual([bytesFinding("EAT-R004.note")]);
  });

  it.each([
    ["a longer type name", `${TYPE_NAME}Set holds the edited bytes`],
    ["kilobytes", `${TYPE_NAME} holds kilobytes`],
    ["bytestream", `${TYPE_NAME} holds a bytestream`],
  ])("SL-BYTES-SUBSTRING %s is refused", { timeout: BUDGET }, (_name, text) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = text))).toEqual([bytesFinding("EAT-R004.note")]);
  });

  it.each([
    ["the type alone", `${TYPE_NAME} carries the kept path`],
    ["the byte word alone", "the edited bytes stay in the kept worktree"],
    ["a member named bytes whose value names the type", { bytes: TYPE_NAME }],
    ["a number", 5],
  ])("SL-BYTES-QUIET %s is quiet", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = value))).toEqual([]);
  });

  it("SL-BYTES-SPLIT-QUIET R-BYTES-SPLIT quiet row: the type in one string and byte data in another string of one row is not refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = [`${TYPE_NAME} is returned`, "it contains the edited bytes"]))).toEqual([]);
  });

  it("SL-BYTES-WORDING-QUIET R-BYTES-WORDING quiet row: byte data in words holding neither the type name nor byte is not refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => (rowOf(ledger, "EAT-R004").note = "the preservation-failed result carries the edited octets"))).toEqual([]);
  });

  it("SL-BYTES-WATCH R-BYTES-SPLIT and R-BYTES-WORDING quiet row: the committed strings that name the type, and every byte string of their rows", () => {
    const ledger = committed();
    const owners = [...rowsOf(ledger).map(row => [String(row.id), row] as const), ...list(ledger.controls).map(item => [`control ${String(obj(item).id)}`, obj(item)] as const)];
    const strings = (value: unknown, at: string): [string, string][] =>
      typeof value === "string" ? [[at, value]] : Array.isArray(value) ? value.flatMap((item, index) => strings(item, `${at}[${index}]`)) : value !== null && typeof value === "object" ? Object.entries(value).flatMap(([key, item]): [string, string][] => [[`${at}.${key} (member name)`, key], ...strings(item, `${at}.${key}`)]) : [];
    const typed = owners.filter(([where, owner]) => strings(owner, where).some(([, text]) => text.toLowerCase().includes(TYPE_NAME.toLowerCase())));
    expect({
      owners: typed.map(([where]) => where),
      typeStrings: typed.flatMap(([where, owner]) => strings(owner, where).filter(([, text]) => text.toLowerCase().includes(TYPE_NAME.toLowerCase()))),
      byteStrings: typed.flatMap(([where, owner]) => strings(owner, where).filter(([, text]) => text.toLowerCase().includes("byte"))),
    }).toEqual(BYTES_WATCH);
  });
});

describe("wb-hhxs EAT-R202 AC3: L-SUMMARY over planted ledgers", () => {
  it("SL-SUMMARY-NOT-OBJECT a ledger without a summary is refused", { timeout: BUDGET }, () => {
    expect(plant(ledger => delete ledger.summary)).toEqual(["L-SUMMARY: summary is not an object"]);
  });

  it.each([
    ["199", 199],
    ["201", 201],
    ["the string 200", "200"],
  ])("SL-SUMMARY-ROWS summary.rows of %s is refused", { timeout: BUDGET }, (_name, value) => {
    expect(plant(ledger => (summaryOf(ledger).rows = value))).toEqual(["L-SUMMARY: summary.rows is not 200"]);
  });

  it.each([
    ["a count one lower", (classes: Obj) => (classes["partial/inert"] = 30)],
    ["a count one higher", (classes: Obj) => (classes["partial/inert"] = 32)],
    ["an extra key", (classes: Obj) => (classes.other = 0)],
    ["a key missing", (classes: Obj) => delete classes.blocked],
  ])("SL-SUMMARY-CLASS summary.byClass with %s is refused", { timeout: BUDGET }, (_name, edit) => {
    expect(plant(ledger => edit(byClassOf(ledger)))).toEqual(['L-SUMMARY: summary.byClass is not {"already-implemented/tested":75,"partial/inert":31,"blocked":94}']);
  });

  it.each([24, 26])("SL-SUMMARY-PLAN-GROUPS summary.planGroups of %s is refused", { timeout: BUDGET }, value => {
    expect(plant(ledger => (summaryOf(ledger).planGroups = value))).toEqual(["L-SUMMARY: summary.planGroups is not 25"]);
  });

  const COMPLETE = '["B-detached-grants","B-replay","B-hx-evidence"]';
  it.each([
    ["all 25 plan groups (EAT-R202 AC3)", (summary: Obj) => (summary.planGroupsComplete = [...PLAN_GROUP_LABELS])],
    ["one fewer", (summary: Obj) => (summary.planGroupsComplete = ["B-detached-grants", "B-replay"])],
    ["one more", (summary: Obj) => (summary.planGroupsComplete = ["B-preserve", "B-detached-grants", "B-hx-evidence", "B-replay"])],
    ["the three out of order", (summary: Obj) => (summary.planGroupsComplete = ["B-replay", "B-detached-grants", "B-hx-evidence"])],
  ])("SL-SUMMARY-COMPLETE summary.planGroupsComplete naming %s is refused", { timeout: BUDGET }, (_name, edit) => {
    expect(plant(ledger => edit(summaryOf(ledger)))).toEqual([`L-SUMMARY: summary.planGroupsComplete is not ${COMPLETE}`]);
  });

  it("SL-SUMMARY-EMPTY-GROUP a plan group left with no row is not complete", { timeout: BUDGET }, () => {
    const findings = plant(ledger => {
      const row = rowOf(ledger, "EAT-R057");
      row.group = "B-replay";
      row.bead = "wb-413a";
    });
    expect(findings).toEqual(['L-SUMMARY: summary.planGroupsComplete is not ["B-detached-grants","B-replay"]']);
  });

  it("SL-SUMMARY-UNTESTED-ROW a plan group with a blocked row is not complete", { timeout: BUDGET }, () => {
    const findings = plant(ledger => {
      const row = rowOf(ledger, "EAT-R020");
      row.class = "blocked";
      row.testedForms = [];
      row.blockedBy = { kind: "unowned", detail: "planted" };
      byClassOf(ledger)["already-implemented/tested"] = 74;
      byClassOf(ledger).blocked = 95;
    });
    expect(findings).toEqual(['L-SUMMARY: summary.planGroupsComplete is not ["B-detached-grants","B-hx-evidence"]']);
  });
});

/** SL-EXPORT-LOAD: the three members beadsFromExport keeps, and one export record that writes each as a string. */
const EXPORT_MEMBERS: readonly string[] = ["title", "description", "notes"];
const WRITTEN_RECORD = { id: "wb-a", title: "T", description: "D", notes: "N" } as const;
const WRITTEN_TEXT = { title: "T", description: "D", notes: "N" } as const;
/** SL-EXPORT-LOAD: a value of every JSON kind but a string: a number, both booleans, null, an object and two arrays (of strings, of numbers). */
const NOT_STRING_VALUES: readonly (readonly [string, unknown])[] = [
  ["a number", 5],
  ["true", true],
  ["false", false],
  ["null", null],
  ["an object", { text: "planted" }],
  ["an array of strings", ["first line", "second line"]],
  ["an array of numbers", [1, 2]],
];
/** SL-EXPORT-LOAD: each kept member planted alone with each value of NOT_STRING_VALUES (member, kind, value). */
const EXPORT_MEMBER_PLANTS: [string, string, unknown][] = EXPORT_MEMBERS.flatMap(member => NOT_STRING_VALUES.map(([kind, value]): [string, string, unknown] => [member, kind, value]));

describe("wb-hhxs EAT-R202: the export and receipt readers", () => {
  it("SL-EXPORT-LOAD beadsFromExport throws a SyntaxError on a line that does not parse", () => {
    expect(() => beadsFromExport(`${JSON.stringify({ id: "wb-a" })}\nnot json\n`)).toThrow(SyntaxError);
  });

  it.each([
    ["a line without a string id", `${JSON.stringify({ id: 5, title: "x" })}\n`],
    ["a line that is an array", '["wb-a"]\n'],
    ["a line that is null", "null\n"],
    ["a line that is a number", "5\n"],
    ["a line that is a string", '"wb-a"\n'],
    ["a line that is true", "true\n"],
    ["a line whose id is absent", `${JSON.stringify({ title: "x" })}\n`],
    ["a line whose id is null", `${JSON.stringify({ id: null, title: "x" })}\n`],
    ["a line whose id is true", `${JSON.stringify({ id: true, title: "x" })}\n`],
    ["a line whose id is an array", `${JSON.stringify({ id: ["wb-a"], title: "x" })}\n`],
    ["a line whose id is an object", `${JSON.stringify({ id: { id: "wb-a" }, title: "x" })}\n`],
  ])("SL-EXPORT-LOAD beadsFromExport throws its own refusal on %s", (_name, text) => {
    expect(() => beadsFromExport(text)).toThrow(`an export line carries no string id: ${text.trimEnd()}`);
  });

  it("SL-EXPORT-LOAD beadsFromExport skips empty lines and lines of spaces, reads a member that is not a string as empty and keeps an id's later line", () => {
    const text = ["", JSON.stringify({ id: "wb-a", title: 5, description: "first", notes: null }), "   ", JSON.stringify({ id: "wb-b", title: "B" }), JSON.stringify({ id: "wb-a", title: "A", description: "second" }), ""].join("\n");
    expect(Object.fromEntries(beadsFromExport(text))).toEqual({
      "wb-a": { title: "A", description: "second", notes: "" },
      "wb-b": { title: "B", description: "", notes: "" },
    });
    expect(Object.fromEntries(beadsFromExport(JSON.stringify({ id: "wb-c", title: 5, description: ["d"], notes: 7 })))).toEqual({ "wb-c": { title: "", description: "", notes: "" } });
  });

  it.each(EXPORT_MEMBER_PLANTS)("SL-EXPORT-LOAD beadsFromExport reads a %s member that is %s as empty and the other two as written", (member, _kind, value) => {
    const line = JSON.stringify({ ...WRITTEN_RECORD, [member]: value });
    expect(Object.fromEntries(beadsFromExport(line))).toEqual({ "wb-a": { ...WRITTEN_TEXT, [member]: "" } });
  });

  it.each(EXPORT_MEMBERS)("SL-EXPORT-LOAD beadsFromExport reads an absent %s member as empty and the other two as written", member => {
    const line = JSON.stringify(Object.fromEntries(Object.entries(WRITTEN_RECORD).filter(([key]) => key !== member)));
    expect(Object.fromEntries(beadsFromExport(line))).toEqual({ "wb-a": { ...WRITTEN_TEXT, [member]: "" } });
  });

  it("SL-RECEIPTS-READ receiptReader reads a listed receipt and gives null for an unlisted name, ../README and a name ending in .md", () => {
    expect({
      listed: receipts("wb-5ik5") === readFileSync(join(REPO, "docs/workbench/receipts/wb-5ik5.md"), "utf8"),
      unlisted: receipts(PLANTED_RECEIPT),
      parent: receipts("../README"),
      suffixed: receipts("wb-5ik5.md"),
    }).toEqual({ listed: true, unlisted: null, parent: null, suffixed: null });
  });
});

/** The 25 BEAD-PLAN group labels, in the order the judge's group table holds them. */
const PLAN_GROUP_LABELS: readonly string[] = [
  "B-preserve",
  "B-docs",
  "B-unknowns",
  "B-release",
  "B-contract-choice",
  "B-descriptor",
  "B-source",
  "B-authority",
  "B-detached-grants",
  "B-replay",
  "B-cancel-repro",
  "B-limits",
  "B-dispatch",
  "B-outcomes",
  "B-effects",
  "B-controls",
  "B-observe",
  "B-telemetry",
  "B-git-census",
  "B-hx-evidence",
  "B-hx-admit",
  "B-rf-admit",
  "B-detached-function",
  "B-furnace-function",
  "B-coordination",
];

/** SL-BYTES-WATCH: the committed owners naming the type, their type-naming strings and their byte strings. */
const BYTES_WATCH = {
  owners: ["EAT-R001", "EAT-R002", "EAT-R003"],
  typeStrings: [
    ["EAT-R001.fixedForms[0]", "a failed status, add, commit, HEAD rev-parse or branch-name step in cleanupWorktree keeps the edited worktree and returns WorktreePreservationFailedResult { hasChanges: true, preservationFailed: true, path, diagnostic }, whose path names the kept worktree; no destructive remove runs"],
    ["EAT-R002.fixedForms[0]", "a failed status, add, commit, HEAD rev-parse or branch-name step in cleanupWorktree keeps the edited worktree and returns WorktreePreservationFailedResult { hasChanges: true, preservationFailed: true, path, diagnostic }, whose path names the kept worktree; no destructive remove runs"],
    ["EAT-R003.fixedForms[0]", "a failed status, add, commit, HEAD rev-parse or branch-name step in cleanupWorktree keeps the edited worktree and returns WorktreePreservationFailedResult { hasChanges: true, preservationFailed: true, path, diagnostic }, whose path names the kept worktree; no destructive remove runs"],
  ],
  byteStrings: [
    ["EAT-R001.title", "Cleanup MUST retain recoverable edited bytes when preservation fails"],
    ["EAT-R001.testedForms[0].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
    ["EAT-R001.testedForms[0].title", "PF-R001-COMMIT: keeps the worktree and its exact bytes when the preservation commit fails"],
    ["EAT-R001.testedForms[1].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
    ["EAT-R001.testedForms[1].title", "PF-R001-BRANCH: keeps the worktree and its committed bytes when every branch name is refused"],
    ["EAT-R002.testedForms[0].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
    ["EAT-R002.testedForms[1].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
    ["EAT-R002.testedForms[2].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
    ["EAT-R002.testedForms[3].suite[0]", "cleanupWorktree \u2014 preservation failure keeps the edited bytes"],
  ],
};

/** SL-SHAPE: the frozen shape of this cut, per row and then the control. */
const FROZEN_SHAPE: readonly string[] = [
  "EAT-R001:already-implemented/tested:B-preserve:wb-5ik5:2:1:9a2c66a10b3c",
  "EAT-R002:already-implemented/tested:B-preserve:wb-5ik5:4:1:19108fc78278",
  "EAT-R003:already-implemented/tested:B-preserve:wb-5ik5:10:1:f15dfdd4ef6c",
  "EAT-R004:partial/inert:B-docs:wb-12x1:0:1:f7b4e7141645",
  "EAT-R005:blocked:B-contract-choice:wb-w8fk:0:1:57fed520ac04",
  "EAT-R006:blocked:B-contract-choice:wb-w8fk:0:1:579f073bc83b",
  "EAT-R007:partial/inert:B-descriptor:wb-ocie:0:1:275f987afa8b",
  "EAT-R008:partial/inert:B-descriptor:wb-ocie:0:1:957603d3e8a6",
  "EAT-R009:partial/inert:B-descriptor:wb-ocie:0:1:1e96b800c09c",
  "EAT-R010:partial/inert:B-descriptor:wb-ocie:0:1:891db796fdc0",
  "EAT-R011:partial/inert:B-descriptor:wb-ocie:0:1:833ae3bcac58",
  "EAT-R012:already-implemented/tested:B-detached-grants:wb-wupg:6:1:fb8055b8af91",
  "EAT-R013:already-implemented/tested:B-detached-grants:wb-wupg:4:1:b7718cdd46d8",
  "EAT-R014:already-implemented/tested:B-detached-grants:wb-wupg:4:1:02d688083cd1",
  "EAT-R015:already-implemented/tested:B-cancel-repro:wb-9v02:2:1:fec9596d8bcb",
  "EAT-R016:already-implemented/tested:B-cancel-repro:wb-9v02:2:1:ac7d96905819",
  "EAT-R017:already-implemented/tested:B-replay:wb-413a:1:1:c2c260d78510",
  "EAT-R018:already-implemented/tested:B-replay:wb-413a:1:1:5cdc107c4141",
  "EAT-R019:already-implemented/tested:B-replay:wb-413a:1:1:c60c327b0f1e",
  "EAT-R020:already-implemented/tested:B-replay:wb-413a:8:1:ae636a79717a",
  "EAT-R021:already-implemented/tested:B-replay:wb-413a:4:1:5521cfd9ab1e",
  "EAT-R022:partial/inert:B-source:wb-s8rm:0:2:c78a45dfb534",
  "EAT-R023:partial/inert:B-source:wb-s8rm:0:2:3f36c63ffe82",
  "EAT-R024:partial/inert:B-source:wb-s8rm:0:2:1d9161987e0a",
  "EAT-R025:partial/inert:B-source:wb-s8rm:0:2:4b640cfb7e3e",
  "EAT-R026:partial/inert:B-source:wb-s8rm:0:2:c6706dd80f7e",
  "EAT-R027:partial/inert:B-source:wb-s8rm:0:2:5e4fb698db67",
  "EAT-R028:partial/inert:B-authority:wb-201v:0:1:33bfc254da2e",
  "EAT-R029:partial/inert:B-authority:wb-201v:0:1:35edf1ae7cf3",
  "EAT-R030:partial/inert:B-authority:wb-201v:0:1:d822c496f640",
  "EAT-R031:partial/inert:B-authority:wb-201v:0:1:463c58480cb6",
  "EAT-R032:blocked:B-dispatch:wb-4bxo:0:1:c37ec281f794",
  "EAT-R033:blocked:B-dispatch:wb-4bxo:0:1:c3b0c82e4bb1",
  "EAT-R034:blocked:B-dispatch:wb-4bxo:0:1:ef23c4d82d49",
  "EAT-R035:blocked:B-dispatch:wb-4bxo:0:1:c8354b3d4fc2",
  "EAT-R036:blocked:B-outcomes:wb-9a1o:0:1:ce98c6fa8f36",
  "EAT-R037:blocked:B-outcomes:wb-9a1o:0:1:e7b9587726e8",
  "EAT-R038:blocked:B-outcomes:wb-9a1o:0:1:723035cb5afe",
  "EAT-R039:blocked:B-outcomes:wb-9a1o:0:1:35682a9fe664",
  "EAT-R040:blocked:B-outcomes:wb-9a1o:0:1:c645258c4f31",
  "EAT-R041:blocked:B-effects:wb-mwsy:0:1:f31e0233bbc5",
  "EAT-R042:blocked:B-effects:wb-mwsy:0:1:9f48d43a990b",
  "EAT-R043:blocked:B-effects:wb-mwsy:0:1:656a9a0e75a6",
  "EAT-R044:blocked:B-effects:wb-mwsy:0:1:593b223d0f22",
  "EAT-R045:blocked:B-controls:wb-5a7k:0:1:402c72af6a1e",
  "EAT-R046:blocked:B-controls:wb-5a7k:0:1:652aa3246f5a",
  "EAT-R047:blocked:B-controls:wb-5a7k:0:1:01f7c6f70947",
  "EAT-R048:blocked:B-controls:wb-5a7k:0:1:fbb331538d3e",
  "EAT-R049:blocked:B-controls:wb-5a7k:0:1:b153a81bc489",
  "EAT-R050:blocked:B-controls:wb-5a7k:0:1:e3116a6a49ed",
  "EAT-R051:blocked:B-observe:wb-upad:0:1:8c25ffb4892b",
  "EAT-R052:blocked:B-observe:wb-upad:0:1:b979b9e026ec",
  "EAT-R053:blocked:B-git-census:wb-p3i2:0:1:a3e28f9ceb1e",
  "EAT-R054:blocked:B-git-census:wb-p3i2:0:1:36973599dea1",
  "EAT-R055:blocked:B-git-census:wb-p3i2:0:1:78ee5b1af461",
  "EAT-R056:blocked:B-git-census:wb-p3i2:0:1:878b647f22af",
  "EAT-R057:already-implemented/tested:B-hx-evidence:wb-f3wd:3:1:911850edad1f",
  "EAT-R058:blocked:B-hx-admit:wb-pxvv:0:1:b7efd54495b1",
  "EAT-R059:blocked:B-hx-admit:wb-pxvv:0:1:e4cfb251a966",
  "EAT-R060:blocked:B-rf-admit:wb-669r:0:1:a09f1679b7fb",
  "EAT-R061:blocked:B-rf-admit:wb-669r:0:1:a358049215c6",
  "EAT-R062:blocked:B-rf-admit:wb-669r:0:1:33759f3f51a8",
  "EAT-R063:blocked:B-rf-admit:wb-669r:0:1:faa1b5895bcf",
  "EAT-R064:blocked:B-detached-function:wb-zswl:0:1:6f223ae68dc8",
  "EAT-R065:blocked:B-detached-function:wb-zswl:0:1:7874c3444737",
  "EAT-R066:blocked:B-detached-function:wb-zswl:0:1:93b01e9dd7d4",
  "EAT-R067:blocked:B-detached-function:wb-zswl:0:1:e70421fec220",
  "EAT-R068:blocked:B-furnace-function:wb-dlc6:0:1:9afc0511ea39",
  "EAT-R069:blocked:B-furnace-function:wb-dlc6:0:1:ea482838491b",
  "EAT-R070:blocked:B-furnace-function:wb-dlc6:0:1:826d6207cef2",
  "EAT-R071:partial/inert:B-coordination:wb-0gbh:0:1:789264c6a7d1",
  "EAT-R072:partial/inert:B-coordination:wb-0gbh:0:1:35106fc91c0c",
  "EAT-R073:already-implemented/tested:B-limits:wb-ny54:8:1:c986cc0e635c",
  "EAT-R074:partial/inert:B-limits:wb-ny54:0:2:dcf706d09f74",
  "EAT-R075:partial/inert:B-limits:wb-ny54:0:2:b466f9aa87dd",
  "EAT-R076:partial/inert:B-limits:wb-ny54:0:2:5561b24f8236",
  "EAT-R077:partial/inert:B-telemetry:wb-r5q2:0:2:2c25bc7652dc",
  "EAT-R078:partial/inert:B-telemetry:wb-r5q2:0:2:55f99073f639",
  "EAT-R079:partial/inert:B-telemetry:wb-r5q2:0:2:19fb091145a6",
  "EAT-R080:partial/inert:B-unknowns:wb-muip:0:2:847537f67959",
  "EAT-R081:partial/inert:B-unknowns:wb-muip:0:2:67458ff12ea7",
  "EAT-R082:already-implemented/tested:B-release:wb-j5y5:29:1:491d80432b0e",
  "EAT-R083:already-implemented/tested:B-release:wb-j5y5:22:1:77af95c7fbba",
  "EAT-R084:already-implemented/tested:B-release:wb-j5y5:27:1:0c114bd173bb",
  "EAT-R085:already-implemented/tested:B-release:wb-j5y5:21:1:223176c5404d",
  "EAT-R086:already-implemented/tested:B-release:wb-j5y5:30:1:4aceffa93079",
  "EAT-R087:already-implemented/tested:B-release:wb-j5y5:10:1:139a1b462307",
  "EAT-R088:blocked:mw-tracks:wb-1zn2:0:1:d920458a22de",
  "EAT-R089:blocked:mw-tracks:wb-1zn2:0:1:76fa22fb8bba",
  "EAT-R090:blocked:mw-tracks:wb-1zn2:0:1:ff6da3fbac89",
  "EAT-R091:blocked:mw-tracks:wb-1zn2:0:1:408e5b0240f8",
  "EAT-R092:blocked:mw-tracks:wb-1zn2:0:1:0738571ab673",
  "EAT-R093:blocked:mw-tracks:wb-1zn2:0:1:e7aadb00ebd3",
  "EAT-R094:already-implemented/tested:B-docs:wb-12x1:1:1:e1640ba3abba",
  "EAT-R095:already-implemented/tested:B-docs:wb-12x1:1:1:ca1bed34890c",
  "EAT-R096:already-implemented/tested:B-docs:wb-12x1:1:1:ee12bdf98926",
  "EAT-R097:already-implemented/tested:B-docs:wb-12x1:1:1:ddf5c0ccca46",
  "EAT-R098:already-implemented/tested:B-docs:wb-12x1:1:1:55f564b90cb2",
  "EAT-R099:already-implemented/tested:B-docs:wb-12x1:1:1:49150163263e",
  "EAT-R100:already-implemented/tested:B-docs:wb-12x1:1:1:7933dfbe156e",
  "EAT-R101:already-implemented/tested:B-docs:wb-12x1:1:1:da374e9ba056",
  "EAT-R102:already-implemented/tested:B-docs:wb-12x1:1:1:c218cf496dfd",
  "EAT-R103:already-implemented/tested:B-docs:wb-12x1:1:1:4410f646781c",
  "EAT-R104:already-implemented/tested:B-docs:wb-12x1:1:1:2617bb770371",
  "EAT-R105:already-implemented/tested:B-docs:wb-12x1:1:1:4be1c4c57e7c",
  "EAT-R106:already-implemented/tested:B-docs:wb-12x1:1:1:fcdfa74036cf",
  "EAT-R107:already-implemented/tested:B-docs:wb-12x1:1:1:a9b5724bea56",
  "EAT-R108:already-implemented/tested:B-docs:wb-12x1:1:1:f2cf437464f2",
  "EAT-R109:already-implemented/tested:B-docs:wb-12x1:1:1:8614477288f7",
  "EAT-R110:already-implemented/tested:B-docs:wb-12x1:1:1:ad77e76d1f9c",
  "EAT-R111:already-implemented/tested:B-docs:wb-12x1:1:1:2c7c7d7581be",
  "EAT-R112:already-implemented/tested:B-docs:wb-12x1:1:1:5ef6668d955c",
  "EAT-R113:already-implemented/tested:B-docs:wb-12x1:1:1:0c59bf7c4d32",
  "EAT-R114:already-implemented/tested:B-docs:wb-12x1:1:1:dece9a690464",
  "EAT-R115:already-implemented/tested:B-docs:wb-12x1:1:1:643d8e9715ad",
  "EAT-R116:already-implemented/tested:B-docs:wb-12x1:1:1:11f35ed13fbe",
  "EAT-R117:already-implemented/tested:B-docs:wb-12x1:1:1:cf4f4033b439",
  "EAT-R118:already-implemented/tested:B-docs:wb-12x1:1:1:ce4572a1bdfd",
  "EAT-R119:already-implemented/tested:B-docs:wb-12x1:1:1:17d1af21256f",
  "EAT-R120:already-implemented/tested:B-docs:wb-12x1:1:1:5a49fae7dcc9",
  "EAT-R121:already-implemented/tested:B-docs:wb-12x1:1:1:8e34d19f49c0",
  "EAT-R122:already-implemented/tested:B-docs:wb-12x1:1:1:cde247a080c1",
  "EAT-R123:already-implemented/tested:B-docs:wb-12x1:1:1:0e7dda7bad25",
  "EAT-R124:already-implemented/tested:B-docs:wb-12x1:1:1:36fb4bf72ec1",
  "EAT-R125:already-implemented/tested:B-docs:wb-12x1:1:1:b3b1e3e253db",
  "EAT-R126:already-implemented/tested:B-docs:wb-12x1:1:1:57e919de2189",
  "EAT-R127:already-implemented/tested:B-docs:wb-12x1:1:1:3acb326816f9",
  "EAT-R128:already-implemented/tested:B-docs:wb-12x1:1:1:a4d7d2797036",
  "EAT-R129:already-implemented/tested:B-docs:wb-12x1:1:1:d20c298537a0",
  "EAT-R130:already-implemented/tested:B-docs:wb-12x1:1:1:e8e26045613e",
  "EAT-R131:already-implemented/tested:B-docs:wb-12x1:1:1:f49dc5d99a8d",
  "EAT-R132:already-implemented/tested:B-docs:wb-12x1:1:1:32063e3edeb9",
  "EAT-R133:already-implemented/tested:B-docs:wb-12x1:1:1:8b0e3cbca9e8",
  "EAT-R134:already-implemented/tested:B-docs:wb-12x1:1:1:dac741fb7289",
  "EAT-R135:already-implemented/tested:B-docs:wb-12x1:1:1:eb4e19ff1e9e",
  "EAT-R136:already-implemented/tested:B-docs:wb-12x1:1:1:2fe32dc6410b",
  "EAT-R137:already-implemented/tested:B-docs:wb-12x1:1:1:9299a29ef0d8",
  "EAT-R138:already-implemented/tested:B-docs:wb-12x1:1:1:c88e7ced79b8",
  "EAT-R139:already-implemented/tested:B-docs:wb-12x1:1:1:e1ef38fe7c00",
  "EAT-R140:already-implemented/tested:B-docs:wb-12x1:1:1:e8d59c9c79c8",
  "EAT-R141:already-implemented/tested:B-docs:wb-12x1:1:1:ff31c442e04b",
  "EAT-R142:already-implemented/tested:B-docs:wb-12x1:1:1:99358560f00d",
  "EAT-R143:already-implemented/tested:B-docs:wb-12x1:1:1:35a6cadb857c",
  "EAT-R144:already-implemented/tested:B-preserve:wb-5ik5:5:1:50d672022d76",
  "EAT-R145:partial/inert:B-preserve:wb-5ik5:0:2:6c8404dbb6c6",
  "EAT-R146:already-implemented/tested:B-preserve:wb-5ik5:6:1:89e83e6b932f",
  "EAT-R147:blocked:B-docs:wb-12x1:0:1:2d1471becd9a",
  "EAT-R148:blocked:B-contract-choice:wb-w8fk:0:1:b2e7463a4b79",
  "EAT-R149:blocked:B-contract-choice:wb-w8fk:0:1:19e2ba6840d4",
  "EAT-R150:blocked:B-contract-choice:wb-w8fk:0:1:2b8ae5f86534",
  "EAT-R151:blocked:B-contract-choice:wb-w8fk:0:1:dcd4cf65d5ad",
  "EAT-R152:blocked:B-descriptor:wb-ocie:0:1:deeb58fb28f7",
  "EAT-R153:blocked:B-descriptor:wb-ocie:0:1:4d5343dee572",
  "EAT-R154:partial/inert:B-authority:wb-201v:0:1:349357241f0e",
  "EAT-R155:blocked:B-dispatch:wb-4bxo:0:1:f520a38c76b1",
  "EAT-R156:blocked:B-outcomes:wb-9a1o:0:1:6a7adb62ec3a",
  "EAT-R157:blocked:B-outcomes:wb-9a1o:0:1:8a985f25d6d0",
  "EAT-R158:blocked:B-outcomes:wb-9a1o:0:1:813c82dc928a",
  "EAT-R159:blocked:B-git-census:wb-p3i2:0:1:2f86a8297f43",
  "EAT-R160:blocked:B-cancel-repro:wb-9v02:0:2:d23c77f9ee33",
  "EAT-R161:already-implemented/tested:B-replay:wb-413a:10:1:4d573db0bf79",
  "EAT-R162:already-implemented/tested:B-replay:wb-413a:21:1:ee5f2e0ec963",
  "EAT-R163:blocked:B-hx-admit:wb-pxvv:0:1:e1b77b7af95e",
  "EAT-R164:partial/inert:B-telemetry:wb-r5q2:0:2:964b7cc7d88f",
  "EAT-R165:blocked:B-release:wb-j5y5:0:1:db96b8de7d66",
  "EAT-R166:blocked:B-release:wb-j5y5:0:1:3912162a845f",
  "EAT-R167:partial/inert:B-release:wb-j5y5:0:1:26b561a82b19",
  "EAT-R168:partial/inert:B-release:wb-j5y5:0:1:9002615da195",
  "EAT-R169:blocked:B-release:wb-j5y5:0:1:62b0ff376c66",
  "EAT-R170:blocked:B-release:wb-j5y5:0:1:3add679415f2",
  "EAT-R171:blocked:B-release:wb-j5y5:0:1:e3477e41ce80",
  "EAT-R172:blocked:master-recon:wb-cbt4:0:1:f2205e650193",
  "EAT-R173:blocked:mw-tracks:wb-1zn2:0:1:47e9aacdcc7d",
  "EAT-R174:blocked:mw-tracks:wb-1zn2:0:1:2e6d4a95543a",
  "EAT-R175:blocked:mw-tracks:wb-1zn2:0:1:ea737f75b9d9",
  "EAT-R176:blocked:mw-tracks:wb-1zn2:0:1:963c10167d50",
  "EAT-R177:blocked:mw-tracks:wb-1zn2:0:1:0cc0a2de75c1",
  "EAT-R178:blocked:B-docs:wb-12x1:0:1:ebd92c37ae80",
  "EAT-R179:blocked:B-docs:wb-12x1:0:1:dd006bb92444",
  "EAT-R180:blocked:B-docs:wb-12x1:0:1:4b4707ac86d8",
  "EAT-R181:blocked:B-docs:wb-12x1:0:1:35e048401a03",
  "EAT-R182:blocked:B-docs:wb-12x1:0:1:4995964548d2",
  "EAT-R183:blocked:B-docs:wb-12x1:0:1:7335c483662e",
  "EAT-R184:blocked:B-docs:wb-12x1:0:1:47dd6f4af813",
  "EAT-R185:blocked:B-docs:wb-12x1:0:1:1455bac3eba2",
  "EAT-R186:blocked:B-docs:wb-12x1:0:1:2b233e4460bd",
  "EAT-R187:blocked:B-docs:wb-12x1:0:1:9b032adc9a7c",
  "EAT-R188:blocked:B-docs:wb-12x1:0:1:ba94c1f81a4d",
  "EAT-R189:blocked:B-docs:wb-12x1:0:1:ed0e49c623a0",
  "EAT-R190:blocked:B-docs:wb-12x1:0:1:a3aa2a3c50e8",
  "EAT-R191:blocked:B-docs:wb-12x1:0:1:c31c6de2bd3d",
  "EAT-R192:blocked:B-docs:wb-12x1:0:1:0be94144bad3",
  "EAT-R193:blocked:B-docs:wb-12x1:0:1:8ce3341d1939",
  "EAT-R194:blocked:B-docs:wb-12x1:0:1:27f39f766909",
  "EAT-R195:blocked:B-docs:wb-12x1:0:1:057d749f0c4c",
  "EAT-R196:blocked:B-docs:wb-12x1:0:1:f39aabf31ab8",
  "EAT-R197:blocked:B-docs:wb-12x1:0:1:803ffb054bb0",
  "EAT-R198:blocked:B-docs:wb-12x1:0:1:83355acceaaf",
  "EAT-R199:blocked:B-docs:wb-12x1:0:1:dba5bf5c3ba8",
  "EAT-R200:blocked:B-docs:wb-12x1:0:1:f66033beff0a",
  "F10:already-implemented/tested:-:-:2:0:c464dab89a8c",
];
