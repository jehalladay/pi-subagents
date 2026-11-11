/**
 * wb-vu3i: the RUN PIN of the rf censuses CENSUSES names (two at wb-vu3i, a third since wb-yght), a census-tier leg judged in wb-u62
 * REPORT MODE (judge() reads the gate's own test report, DEFAULT_TIER_REPORT, written by the test step, and never re-executes the tier;
 * the .census.ts suffix keeps this file out of the report it judges).
 *
 * Each census below holds its record in its own last case - the stamps census (wb-o4h0.5) its each-liveness, mode, second witness
 * compare and REACHED record; the edge-edit echo census (wb-pfxo.7) its registration record; the epistemic-status census (wb-grmo.2,
 * since wb-yght) its run-mode and REACHED seam record - so nothing outside that case could see it skipped or cut short: the o4h0.5
 * gate's F3 (G01 the record skipped, G02 an early return after its title checks, both green) and the
 * pfxo.7 gate's F1, which rides wb-vu3i (S11/S11b/S12: the registration record skipped or hollowed, rc 0). This leg pins EVERY title of
 * each census - collected exactly once, passed, and asserting on every static path, by the helper's three legs - and holds the report's
 * record of each file to the titles frozen HERE, exactly and in order, and to the census's roster. Each record case reads the task tree
 * inline and asserts once, as its last statement, so an exit anywhere before that assertion leaves a case without one: no-assertion
 * here, and --expect.requireAssertions fails it in the test tier.
 *
 * The titles are frozen in this file, outside each census and its roster, so a pin removed from a census and its roster together (the
 * stamps census's measured LIMIT, its gate's F12/CT6p) reds here, absent from the report. A liveness row proves the judge is not
 * accept-all. NOT pinned here: the landed wb-o4h0.3 census shares the exposure (the o4h0.5 gate's F3 names it), and its queued
 * follow-up re-cut (wb-dbpa) owns that file, so this cut leaves it alone rather than contact it.
 *
 * wb-56od (the wb-vu3i gate's F1, its R694 follow-up; hop 3 of the record self-liveness class): THIS FILE'S OWN JUDGED SET. CENSUSES
 * was self-anchored - no set-level frozen shape and no anchor outside this file - so one census cut from it (T5), or cut together with
 * its own record (T5x the pfxo.7 entry, T5y the stamps entry), stayed green. The judged rows here are the CENSUSES entries; each entry's
 * pins are its census's frozen titles. Now:
 *  THE JUDGED SET (the first case): CENSUSES holds exactly the frozen shape, an AC1-style literal of each census's file and its rows'
 *    `${id}:${pins.length}` (standing rule 16), and this file's task tree registers every case once, in frozen order (this case, each
 *    census's two cases, the liveness, reader and quiet rows, the record last), in run mode and not inverted, so a narrowed loop or a
 *    case taken out of run mode reds here;
 *  THE OUTSIDE ANCHOR: each census the table names reads the table back from its own judged-set case, in the test tier, through
 *    test/helpers/rf-census-run-pins.ts (a syntax-tree read: a comment, a string elsewhere or another declaration never counts) and
 *    requires its own file there exactly once, so a census cut from the table and the literal together (CT5), or from every literal of
 *    this file (CT6), reds in the census it drops; the reader row keeps that reader live, and the second quiet row reads its one
 *    statement in each census, inside that census's first case (the judged set its record never silences);
 *  THE RECORD (the last case): every case before it reached its end, in frozen order, and passed. This tier writes no report and no
 *    gate step reads it afterwards, so a case cut short reds only here; the judged set and the record hold each other (the first reads
 *    the record's registration, the record reads the first one's end), and each counts its own assertions.
 * NAMED RESIDUALS (each with its pinned quiet row below; no other escape is claimed absent):
 *  R-SELF-SILENCE the cases that read this file's own structure - the judged set, the record and this residual's quiet row - silenced
 *    together: nothing judges the census tier after it runs, and the outside anchor reads the table alone, so a narrowed loop under
 *    that silence reads quiet (its quiet row: this file with the judged set and the record cut and the loop narrowed);
 *  R-COORDINATED-ANCHOR a census cut from the table and the literal together with its own anchor statement (cut, or moved out of its
 *    first case): no other reader sees the cut (its quiet row: the cut page names the census to no reader but that statement, one per
 *    census in its first case, and the census page without it holds none).
 * NOT CLAIMED: what each census compares - an expected side rewritten to read its own actual (the W08 body-swap limit the wb-vu3i seat
 * disclosed) stays green here; this file judges registration, reaching and the report's record, never a comparison's content.
 * wb-yght (the wb-grmo.2 gate's F4, its R694 follow-up; the same self-record class): THE THIRD CENSUS. The rf epistemic-status census
 * held its record in its own last case as well, so the record skipped (G17a) or returning early after its title checks (G17b) stayed
 * green. It joins CENSUSES with every title frozen here; its record now reads the task tree inline and asserts once, as its last
 * statement, and its judged-set case reads this table back like the other two. That census titles each case by its pin id and what it
 * pins, so its rows here freeze each pin's whole title, and rosterOf reads a roster pin's title where the roster carries one (else its
 * id, as the other two rosters do).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it, type RunnerTask } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";
import { RUN_PIN_FILE, type RunPinnedEntry, runPinnedEntries, runPinnedFiles } from "./helpers/rf-census-run-pins.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each pinned file's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default (the docs09
 * census's judge row timed out at that default under load). */
const JUDGE_TIMEOUT = 240_000;
/** A row that parses sources (this file, each census) gets headroom on a loaded gate host too. */
const READ_TIMEOUT = 60_000;

interface Census {
  /** The census file and its roster, repository-relative. */
  readonly file: string;
  readonly roster: string;
  /** Its one top-level describe title, and the case before its rows and the record case after them. */
  readonly suite: string;
  readonly first: string;
  readonly last: string;
  /** Each row's id and the title each of its pins registers under, in registration order: frozen here, outside the census and its
   * roster (a pin's id, or the pin's whole title where the census titles its cases by more than the id). */
  readonly rows: readonly (readonly [string, readonly string[]])[];
}

const CENSUSES: readonly Census[] = [
  {
    file: "test/workbench-rf-federation-stamps-census.test.ts",
    roster: "test/fixtures/rf-federation-stamps-roster.json",
    suite: "wb-o4h0.5 rf federation stamps census (RF-FEDERATED-WORKSPACES-R7, absent-today leg)",
    first: "the judged set: the frozen shape, the out-of-file roster, the bead export's acceptance clauses and the cases agree",
    last: "the record: every registered test is in run mode and ran, and every pin reached its end with its pinned assertion count",
    rows: [
      ["A", ["A1", "A2", "A3", "A4", "A5"]],
      ["B", ["B1", "B2", "B3"]],
      ["C", ["C1", "C2", "C3"]],
      ["D", ["D1", "D2", "D3"]],
      ["E", ["E1", "E2"]],
    ],
  },
  {
    file: "test/workbench-rf-graph-edge-edit-echo-census.test.ts",
    roster: "test/fixtures/rf-graph-edge-edit-echo-roster.json",
    suite: "wb-pfxo.7 rf graph edge-edit echo census (RF-COMPOSITIONAL-ASSEMBLY-R8, absent-today leg)",
    first: "the judged set: the frozen shape, the out-of-file roster, the owner's acceptance clauses and the cases agree",
    last: "registration: every case of this file is registered once, in roster order, in run mode, and ran before this one",
    rows: [
      ["T", ["T1", "T2", "T3", "T4"]],
      ["A", ["A1", "A2", "A3", "A4", "A5"]],
      ["B", ["B1", "B2", "B3", "B4", "B5"]],
      ["C", ["C1", "C2", "C3"]],
    ],
  },
  {
    file: "test/workbench-rf-epistemic-status-census.test.ts",
    roster: "test/fixtures/rf-epistemic-status-roster.json",
    suite: "wb-grmo.2 RF epistemic-status freeze-and-flip census (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R2)",
    first: "the judged set: the frozen shape, the out-of-file roster and the cases agree",
    last: "the record: every registered test is in run mode and ran, and every pin reached its seams as the roster pins",
    rows: [
      [
        "T",
        [
          "T1 reads the SCG-R11 fixture roster: test/fixtures/rf-result-keys.json parses through readRfResultRoster as the captured, exhaustive roster, each key list at its floor",
          "T2 fails when a captured envelope names epistemic_status (ARMED): no key of the roster's four lists spells an epistemic form, and the roster diff reds a result-level one",
          "T3 or a scenario key (ARMED): no roster key spells scenario, uncertified or speculative or is the shipped notice key, and the roster diff reds a result-level one",
          "T4 before those cases exist (freeze-and-flip): the code of the observer suite the owed cases land in, read parse-aware (case titles, identifiers, strings; never a comment), spells no epistemic word, so this census stands in its frozen form",
        ],
      ],
      [
        "D",
        [
          "D1 docs/workbench/09 § Reader adapters gains one census-bound sentence: it renders there exactly once and the docs09 census binds it as half RA6/f",
          "D2 that an RF prediction renders as unverified context: the sentence opens with the owner's words verbatim",
          "D3 (fold into wb-973.17 if it lands first): wb-973.17 landed first, and the sentence closes the RF bullet that carries its clauses",
        ],
      ],
      [
        "Z",
        [
          "Z1 Pi claims nothing in code: no src module's identifiers, strings, templates or regexes spell an epistemic, scenario, uncertified or speculative word",
          "Z2 Pi composes no epistemic claim: an envelope marked with each RF-WM-001 word, the shipped block markers or the scenario form projects and evidences byte for byte as its unmarked twin",
        ],
      ],
      [
        "F",
        [
          "F1 the owner filing's until-then sentence is rows T and D joined, each label its pins' quotes, and the title holds row Z's clause once",
        ],
      ],
      [
        "Q",
        [
          "Q1 R-NESTED: a marker below the result level outside the speculative tripwire's names (a provenance key) passes the roster diff, so no re-capture brings it to the roster",
          "Q2 R-VALUE: an uncertified word carried as the value of a roster key passes the roster diff unseen",
          "Q3 R-VOCABULARY: a key outside the vocabulary that carries the same meaning (belief_state, what_if_view) reads quiet on T2 and T3",
          "Q4 R-SHARED-WORD: Z1 does not take hypothesis, which src code spells for Pi's own relation kind",
          "Q5 R-SCENARIO-CASE: an owed uncertified-scenario case that never spells epistemic reads quiet on T4, whose reader takes the epistemic word only",
        ],
      ],
    ],
  },
];

interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
interface Roster {
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** A census's roster: its rows (id, label, and the title each pin registers under) and its tests list, refused by name when either has
 * the wrong shape. A pin registers under its roster title when it carries one (wb-yght: the wb-grmo.2 census titles each case by its
 * pin id and what it pins), else under its id (the stamps and echo censuses register each pin by its id alone). */
function rosterOf(census: Census): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(ROOT, census.roster), "utf8"));
  if (!isRecord(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.tests) || !raw.tests.every(title => typeof title === "string")) {
    throw new Error(`${census.roster} must hold rows and a tests list of titles`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isRecord(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`${census.roster} rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown) => {
      if (!isRecord(pin) || typeof pin.id !== "string") return `<pin without an id in row ${row.id}>`;
      return typeof pin.title === "string" ? pin.title : pin.id;
    });
    return { id: row.id, label: row.label, pins };
  });
  return { rows, tests: raw.tests };
}

/** The titles frozen here, in registration order: the first case, every row's pins, the record case. */
function titlesOf(census: Census): string[] {
  return [census.first, ...census.rows.flatMap(([, pins]) => pins), census.last];
}
/** One CasePin per frozen title under its exact describe path; a pin sits under its row's describe, `${id} ${label}`, the label read
 * from the roster (the census registers it from the same row). */
function pinsOf(census: Census, roster: Roster): CasePin[] {
  const pin = (title: string, suite: readonly string[]): CasePin => ({ file: census.file, title, suite, tier: DEFAULT_GATE_TIER });
  const labelOf = (id: string): string => roster.rows.find(row => row.id === id)?.label ?? `<no roster row ${id}>`;
  return [
    pin(census.first, [census.suite]),
    ...census.rows.flatMap(([id, pins]) => pins.map(title => pin(title, [census.suite, `${id} ${labelOf(id)}`]))),
    pin(census.last, [census.suite]),
  ];
}

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly assertionResults?: readonly ReportCase[];
}
/** The report's files whose path ends with the census file. */
function reportFiles(census: Census): readonly ReportFile[] {
  const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
  return (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(`/${census.file}`));
}
/** Each verdict that is not ok, collected more than once or less, as its own attribution (the why names the pin and the cause). */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

/** wb-56od: a census's frozen shape on one line, its file and each row's `${id}:${pins.length}`. */
function shapeOf(census: Census): string {
  return `${census.file} ${census.rows.map(([id, pins]) => `${id}:${pins.length}`).join(" ")}`;
}

const JUDGED_TITLE = "the judged set: CENSUSES holds exactly the frozen shape, and every case of this file is registered once, in frozen order, in run mode";
const rowsTitle = (census: Census): string =>
  `${census.file}: the titles frozen here are its roster's rows and tests, and the report's record of the file, exactly and in order, every case passed`;
const judgeTitle = (census: Census): string => `${census.file}: every title was collected once, passed in the test tier's report and asserts`;
const LIVENESS_TITLE = "liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)";
const READER_TITLE = "the outside anchor's reader is live: it reads CENSUSES from this file's syntax tree, so a cut entry, an entry moved into a comment and a nested decoy are not named";
const SILENCE_TITLE = "RESIDUAL R-SELF-SILENCE quiet row: this file with the judged set and the record cut and its loop narrowed still names every census to the outside anchor, which reads the table alone";
const COORDINATED_TITLE = "RESIDUAL R-COORDINATED-ANCHOR quiet row: a census cut from the table and the literal is named to no reader but its own one anchor statement, in its first case";
const RECORD_TITLE = "the record: every case before this one reached its end, in frozen order, in run mode, and passed";
/** Every case of this file in registration order: the judged set reads all of it, the record all but itself. */
function frozenOrder(): string[] {
  return [JUDGED_TITLE, ...CENSUSES.flatMap(census => [rowsTitle(census), judgeTitle(census)]), LIVENESS_TITLE, READER_TITLE, SILENCE_TITLE, COORDINATED_TITLE, RECORD_TITLE];
}
/** Each case's title when it reached its end, in run order: the record reads it, since this tier writes no report. */
const REACHED: string[] = [];

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string;
  readonly self: boolean;
}
/** This file's registrations from its task tree, two levels deep (its one describe and that describe's cases; a deeper suite is read
 * by its name, so a frozen-order read reds on it rather than miss what it holds). */
function registered(tasks: readonly RunnerTask[], selfId: string): Registered[] {
  const read = (task: RunnerTask): Registered => ({
    name: task.type === "suite" ? `suite ${task.name}` : task.name,
    mode: task.mode,
    fails: task.type === "test" && task.fails === true,
    state: task.result?.state ?? "no result",
    self: task.id === selfId,
  });
  return tasks.flatMap(top => (top.type === "suite" ? top.tasks.map(read) : [read(top)]));
}
const shown = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state}`;

/** This file's source, as committed: every reader and quiet row reads it from disk. */
function ownSource(): string {
  return readFileSync(join(ROOT, RUN_PIN_FILE), "utf8");
}
type Edit = readonly [start: number, end: number, text: string];
/** The source with each edit applied, the last span first, so every span stays an offset into the source as read. */
function edited(source: string, edits: readonly Edit[]): string {
  return [...edits].sort((left, right) => right[0] - left[0]).reduce((text, [start, end, replacement]) => `${text.slice(0, start)}${replacement}${text.slice(end)}`, source);
}
/** An array element's span with its trailing comma, so cutting it leaves a well-formed array. */
function withComma(source: string, start: number, end: number): readonly [number, number] {
  const comma = /^\s*,/.exec(source.slice(end));
  return [start, end + (comma?.[0].length ?? 0)];
}
/** Every node of a source's syntax tree that a predicate accepts, in source order. */
function nodes(source: string, accept: (node: ts.Node) => boolean): ts.Node[] {
  const tree = ts.createSourceFile("source.ts", source, ts.ScriptTarget.Latest, true);
  const found: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    if (accept(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return found;
}
/** The spans of this file's `it(<constant>, ...)` statements, the constant named by its identifier. */
function caseStatements(source: string, constant: string): (readonly [number, number])[] {
  return nodes(
    source,
    node =>
      ts.isExpressionStatement(node) &&
      ts.isCallExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "it" &&
      node.expression.arguments[0] !== undefined &&
      ts.isIdentifier(node.expression.arguments[0]) &&
      node.expression.arguments[0].text === constant,
  ).map(node => [node.getStart(), node.getEnd()] as const);
}
/** The expression spans of every `for (... of CENSUSES)` loop over the bare table. */
function tableLoops(source: string): (readonly [number, number])[] {
  return nodes(source, node => ts.isForOfStatement(node) && ts.isIdentifier(node.expression) && node.expression.text === "CENSUSES").map(node => {
    const loop = node as ts.ForOfStatement;
    return [loop.expression.getStart(), loop.expression.getEnd()] as const;
  });
}
/** The spans of the string literals reading exactly `text` (the frozen literal's elements are such literals). */
function stringLiterals(source: string, text: string): (readonly [number, number])[] {
  return nodes(source, node => ts.isStringLiteral(node) && node.text === text).map(node => [node.getStart(), node.getEnd()] as const);
}
/** The statements of a census source that call runPinnedFiles - its outside anchor - each the innermost statement holding the call. */
function anchorStatements(source: string): (readonly [number, number])[] {
  return nodes(source, node => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "runPinnedFiles").map(node => {
    let statement: ts.Node = node;
    while (!ts.isExpressionStatement(statement) && !ts.isSourceFile(statement)) statement = statement.parent;
    return [statement.getStart(), statement.getEnd()] as const;
  });
}
/** The title of the innermost `it(...)` case holding a position of a census source: a string literal, or a top-level const naming
 * one (the stamps census titles its first case by JUDGED_TITLE); anything else is read as unresolved. */
function enclosingCase(source: string, position: number): string {
  const cases = nodes(source, node => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it" && node.getStart() <= position && position < node.getEnd());
  const call = cases.at(-1);
  const title = call !== undefined && ts.isCallExpression(call) ? call.arguments[0] : undefined;
  if (title === undefined) return "<no enclosing case>";
  if (ts.isStringLiteral(title)) return title.text;
  if (!ts.isIdentifier(title)) return "<unresolved title>";
  const named = nodes(source, node => ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === title.text && node.initializer !== undefined && ts.isStringLiteral(node.initializer));
  const [declaration] = named;
  return declaration !== undefined && ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined && ts.isStringLiteral(declaration.initializer) ? declaration.initializer.text : "<unresolved title>";
}
/** The last CENSUSES entry as this file's syntax tree reads it: every page below cuts or moves it. */
function lastEntry(source: string): RunPinnedEntry {
  const entry = runPinnedEntries(source).at(-1);
  if (entry === undefined) throw new Error(`${RUN_PIN_FILE} names no census`);
  return entry;
}

describe("wb-vu3i rf census run pins: every title of each census, judged from the gate's own test report", () => {
  it(JUDGED_TITLE, ({ task }) => {
    expect.assertions(2);
    expect(CENSUSES.map(shapeOf), "the frozen shape of CENSUSES (standing rule 16): each census's file and its rows' pin counts").toEqual([
      "test/workbench-rf-federation-stamps-census.test.ts A:5 B:3 C:3 D:3 E:2",
      "test/workbench-rf-graph-edge-edit-echo-census.test.ts T:4 A:5 B:5 C:3",
      "test/workbench-rf-epistemic-status-census.test.ts T:4 D:3 Z:2 F:1 Q:5",
    ]);
    const cases = registered(task.file.tasks, task.id);
    expect(
      { titles: cases.map(entry => entry.name), here: cases.findIndex(entry => entry.self), irregular: cases.filter(entry => entry.mode !== "run" || entry.fails).map(shown) },
      "every case of this file registered once, in frozen order, this one first, each in run mode and not inverted",
    ).toStrictEqual({ titles: frozenOrder(), here: 0, irregular: [] });
    REACHED.push(JUDGED_TITLE);
  });

  for (const census of CENSUSES) {
    it(rowsTitle(census), () => {
      const roster = rosterOf(census);
      const files = reportFiles(census);
      const cases = files[0]?.assertionResults ?? [];
      expect({
        reported: files.length,
        rosterRows: roster.rows.map(row => [row.id, [...row.pins]]),
        rosterTests: [...roster.tests],
        reportTitles: cases.map(entry => entry.title ?? "<untitled>"),
        reportSuites: cases.map(entry => (entry.ancestorTitles ?? [])[0] ?? "<no suite>"),
        reportStatuses: cases.map(entry => entry.status ?? "<no status>"),
      }).toStrictEqual({
        reported: 1,
        rosterRows: census.rows.map(([id, pins]) => [id, [...pins]]),
        rosterTests: titlesOf(census),
        reportTitles: titlesOf(census),
        reportSuites: titlesOf(census).map(() => census.suite),
        reportStatuses: titlesOf(census).map(() => "passed"),
      });
      REACHED.push(rowsTitle(census));
    });

    it(judgeTitle(census), { timeout: JUDGE_TIMEOUT }, () => {
      const pins = pinsOf(census, rosterOf(census));
      const verdicts = judge(REPORT, pins);
      // Two readings of the same verdicts: each refusal named with its cause, and every verdict's code and case count read directly.
      expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
        judged: titlesOf(census).length,
        refused: [],
        codes: titlesOf(census).map(() => "ok:1"),
      });
      REACHED.push(judgeTitle(census));
    });
  }

  it(LIVENESS_TITLE, { timeout: JUDGE_TIMEOUT }, () => {
    const census = CENSUSES[0];
    const [verdict] = census === undefined ? [] : judge(REPORT, [{ file: census.file, title: "Z9 no such pin", suite: [census.suite], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("Z9 no such pin") }).toStrictEqual({ ok: false, code: "absent", named: true });
    REACHED.push(LIVENESS_TITLE);
  });

  it(READER_TITLE, { timeout: READ_TIMEOUT }, () => {
    const own = ownSource();
    const last = lastEntry(own);
    const [start, end] = withComma(own, last.start, last.end);
    const cut = edited(own, [[start, end, ""]]);
    const commented = edited(own, [[start, end, `/* ${own.slice(start, end)} */`]]);
    const decoy = `${cut}\nfunction decoy(): readonly { readonly file: string }[] {\n  const CENSUSES = [{ file: ${JSON.stringify(last.file)} }];\n  return CENSUSES;\n}\n`;
    const kept = CENSUSES.slice(0, -1).map(census => census.file);
    expect({
      live: runPinnedFiles(own),
      cut: runPinnedFiles(cut),
      commented: runPinnedFiles(commented),
      decoy: runPinnedFiles(decoy),
      pagesHoldTheFile: [cut, commented, decoy].map(page => page.includes(JSON.stringify(last.file))),
    }).toStrictEqual({ live: CENSUSES.map(census => census.file), cut: kept, commented: kept, decoy: kept, pagesHoldTheFile: [false, true, true] });
    REACHED.push(READER_TITLE);
  });

  it(SILENCE_TITLE, { timeout: READ_TIMEOUT }, () => {
    const own = ownSource();
    const silenced = [...caseStatements(own, "JUDGED_TITLE"), ...caseStatements(own, "RECORD_TITLE")].map(([start, end]): Edit => [start, end, ""]);
    const narrowed = tableLoops(own).map(([start, end]): Edit => [start, end, "CENSUSES.slice(0, 1)"]);
    const page = edited(own, [...silenced, ...narrowed]);
    // Liveness: the page carries the whole silence - neither self-reading case is left, and no loop reads the whole table.
    expect({
      live: { judged: caseStatements(own, "JUDGED_TITLE").length, record: caseStatements(own, "RECORD_TITLE").length, loops: tableLoops(own).length },
      page: { judged: caseStatements(page, "JUDGED_TITLE").length, record: caseStatements(page, "RECORD_TITLE").length, loops: tableLoops(page).length },
      // The quiet reading: the outside anchor reads the table alone, so the page names every census, each to its own anchor.
      named: runPinnedFiles(page),
    }).toStrictEqual({ live: { judged: 1, record: 1, loops: 1 }, page: { judged: 0, record: 0, loops: 0 }, named: CENSUSES.map(census => census.file) });
    REACHED.push(SILENCE_TITLE);
  });

  it(COORDINATED_TITLE, { timeout: READ_TIMEOUT }, () => {
    const own = ownSource();
    const last = lastEntry(own);
    const lastCensus = CENSUSES.find(census => census.file === last.file);
    const literal = lastCensus === undefined ? [] : stringLiterals(own, shapeOf(lastCensus));
    const page = edited(own, [[...withComma(own, last.start, last.end), ""], ...literal.map(([start, end]): Edit => [...withComma(own, start, end), ""])]);
    const sources = Object.fromEntries(CENSUSES.map(census => [census.file, readFileSync(join(ROOT, census.file), "utf8")]));
    const lastSource = sources[last.file] ?? "";
    const censusPage = edited(lastSource, anchorStatements(lastSource).map(([start, end]): Edit => [start, end, ""]));
    const kept = CENSUSES.slice(0, -1).map(census => census.file);
    const table = runPinnedFiles(page);
    expect({
      // Liveness: the page cuts the census from the table and from the literal, and the census page drops its anchor statement.
      literal: { live: literal.length, page: lastCensus === undefined ? -1 : stringLiterals(page, shapeOf(lastCensus)).length },
      table,
      // Each census holds its anchor in ONE statement, inside its first case: the judged set its record never silences.
      anchors: CENSUSES.map(census => anchorStatements(sources[census.file] ?? "").map(([start]) => enclosingCase(sources[census.file] ?? "", start))),
      censusPage: anchorStatements(censusPage).length,
      // The quiet reading: every census the page still names reads itself there once; the cut census is named to no reader but its
      // own one anchor statement, so the page with that statement cut too holds no reader of the cut.
      quiet: kept.map(file => table.filter(entry => entry === file)),
    }).toStrictEqual({ literal: { live: 1, page: 0 }, table: kept, anchors: CENSUSES.map(census => [census.first]), censusPage: 0, quiet: kept.map(file => [file]) });
    REACHED.push(COORDINATED_TITLE);
  });

  it(RECORD_TITLE, ({ task }) => {
    expect.assertions(1);
    const cases = registered(task.file.tasks, task.id);
    const here = cases.findIndex(entry => entry.self);
    expect(
      { reached: [...REACHED], here, irregular: cases.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || entry.state !== "pass")).map(shown) },
      "the record: every case before this one reached its end in frozen order, in run mode, not inverted, and passed, this one registered last",
    ).toStrictEqual({ reached: frozenOrder().slice(0, -1), here: cases.length - 1, irregular: [] });
  });
});
