/**
 * wb-vu3i: the RUN PIN of two rf censuses, a census-tier leg judged in wb-u62 REPORT MODE (judge() reads the gate's own test report,
 * DEFAULT_TIER_REPORT, written by the test step, and never re-executes the tier; the .census.ts suffix keeps this file out of the
 * report it judges).
 *
 * Each census below holds its record in its own last case - the stamps census (wb-o4h0.5) its each-liveness, mode, second witness
 * compare and REACHED record; the edge-edit echo census (wb-pfxo.7) its registration record - so nothing outside that case could see it
 * skipped or cut short: the o4h0.5 gate's F3 (G01 the record skipped, G02 an early return after its title checks, both green) and the
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
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each pinned file's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default (the docs09
 * census's judge row timed out at that default under load). */
const JUDGE_TIMEOUT = 240_000;

interface Census {
  /** The census file and its roster, repository-relative. */
  readonly file: string;
  readonly roster: string;
  /** Its one top-level describe title, and the case before its rows and the record case after them. */
  readonly suite: string;
  readonly first: string;
  readonly last: string;
  /** Each row's id and its pins, in registration order: frozen here, outside the census and its roster. */
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
/** A census's roster: its rows (id, label, pin ids) and its tests list, refused by name when either has the wrong shape. */
function rosterOf(census: Census): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(ROOT, census.roster), "utf8"));
  if (!isRecord(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.tests) || !raw.tests.every(title => typeof title === "string")) {
    throw new Error(`${census.roster} must hold rows and a tests list of titles`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isRecord(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`${census.roster} rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown) => (isRecord(pin) && typeof pin.id === "string" ? pin.id : `<pin without an id in row ${row.id}>`));
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

describe("wb-vu3i rf census run pins: every title of each census, judged from the gate's own test report", () => {
  for (const census of CENSUSES) {
    it(`${census.file}: the titles frozen here are its roster's rows and tests, and the report's record of the file, exactly and in order, every case passed`, () => {
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
    });

    it(`${census.file}: every title was collected once, passed in the test tier's report and asserts`, { timeout: JUDGE_TIMEOUT }, () => {
      const pins = pinsOf(census, rosterOf(census));
      const verdicts = judge(REPORT, pins);
      // Two readings of the same verdicts: each refusal named with its cause, and every verdict's code and case count read directly.
      expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
        judged: titlesOf(census).length,
        refused: [],
        codes: titlesOf(census).map(() => "ok:1"),
      });
    });
  }

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const census = CENSUSES[0];
    const [verdict] = census === undefined ? [] : judge(REPORT, [{ file: census.file, title: "Z9 no such pin", suite: [census.suite], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("Z9 no such pin") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });
});
