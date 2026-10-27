/**
 * wb-wf9m (owner ruling R758 point 1, LEAD = cure (c)): the RUN PIN of test/workbench-rf-external-authority-echo-census.test.ts, a
 * census-tier leg judged in wb-u62 REPORT MODE - judge() reads the gate's own test report (DEFAULT_TIER_REPORT, written by the test
 * step) and never re-executes the tier, and the .census.ts suffix keeps this file out of the report it judges. It is that census's
 * OUT-OF-FILE ANCHOR, the home of the quiet rows the census's own file cannot hold:
 * - R-ALL-SKIP (the census's disclosed collection-time class, the wb-45bx gate's F23): every task of the census skipped at collection
 *   reads 0 passed / 22 skipped at rc 0, and vitest then runs none of its judges and none of its hooks, so no row inside that file can
 *   see it. One line suffices: `it` rebound to a skipping variant at the vitest import (L2-REBIND-IT `const it = test.skip`,
 *   L2-REBIND-IT-SKIPIF `const it = vitestIt.skipIf(true)`), or two sites, a describe.skip wrap from before the judged set to EOF
 *   (L2-WRAP-SKIP). Here the report's record of the census must be exactly the 22 titles frozen below, under their describe paths,
 *   each passed (collected 22, passed 22), and judge() must read every title collected once, passed and asserting (the helper's three
 *   legs), so any collection-time skip of the census reds here, naming it.
 * - the census's coordinated self-hollows: its rows' pin ids and its 22 titles are frozen HERE, outside the census and its roster, so a
 *   pin removed from the census's ROWS, frozen literal, IMPL and roster together (absent from the report) reds here.
 * The census pins this file's bytes (their sha256, the roster's runPin) in both of its judges, so this file is never deleted or edited
 * alone. A liveness row proves the judge is not accept-all. NOT pinned here: anything the census's own header does not claim.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads the census's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

const CENSUS = "test/workbench-rf-external-authority-echo-census.test.ts";
const ROSTER = "test/fixtures/rf-external-authority-echo-roster.json";
/** The census's one describe, holding rows A, B, C and Q; its two judges sit at file scope, outside it. */
const SUITE = "wb-hs2j.9 rf external-authority echo census (RF-REACTIVE-CONTEXT-ASSEMBLY-R10, echo-only posture)";
/** The judged set, registered first at file scope, and the records case, registered last at file scope. */
const FIRST = "the judged set: the frozen shape, the out-of-file roster, the quoted excerpt, the bead export, the registration and the cases agree";
const LAST = "records: every registered test ran once in run mode in roster order, every case reached its end, and the pins' coverage meets the outside obligations";
/** Each row's id and its pins, in registration order: frozen here, outside the census and its roster. */
const ROWS: readonly (readonly [string, readonly string[]])[] = [
  ["A", ["A1", "A2", "A3", "A4"]],
  ["B", ["B1", "B2", "B3", "B4"]],
  ["C", ["C1", "C2", "C3", "C4", "C5"]],
  ["Q", ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"]],
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
/** The census's roster: its rows (id, label, pin ids) and its tests list, refused by name when either has the wrong shape. */
function rosterOf(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8"));
  if (!isRecord(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.tests) || !raw.tests.every(title => typeof title === "string")) {
    throw new Error(`${ROSTER} must hold rows and a tests list of titles`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isRecord(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`${ROSTER} rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown) => (isRecord(pin) && typeof pin.id === "string" ? pin.id : `<pin without an id in row ${row.id}>`));
    return { id: row.id, label: row.label, pins };
  });
  return { rows, tests: raw.tests.map(String) };
}

/** The titles frozen here, in registration order: the judged set, every row's pins, the records case. */
const TITLES: readonly string[] = [FIRST, ...ROWS.flatMap(([, pins]) => pins), LAST];
/** Each frozen title's exact describe path: the judges at file scope (no suite), a pin under `${id} ${label}` inside SUITE, the label
 * read from the roster (the census registers it from the same row and holds it to the owner's clause in the bead export). */
function pathsOf(roster: Roster): string[][] {
  const labelOf = (id: string): string => roster.rows.find(row => row.id === id)?.label ?? `<no roster row ${id}>`;
  return [[], ...ROWS.flatMap(([id, pins]) => pins.map(() => [SUITE, `${id} ${labelOf(id)}`])), []];
}
function pinsOf(roster: Roster): CasePin[] {
  const paths = pathsOf(roster);
  return TITLES.map((title, index) => ({ file: CENSUS, title, suite: paths[index] ?? [], tier: DEFAULT_GATE_TIER }));
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
function reportFiles(): readonly ReportFile[] {
  const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
  return (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(`/${CENSUS}`));
}
/** Each verdict that is not ok, or not collected exactly once, as its own attribution (the why names the title and the cause). */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe("wb-wf9m rf external-authority echo run pin: the census's out-of-file anchor, judged from the gate's own test report", () => {
  it("frozen shape: the rows and titles frozen here are exactly the census roster's", () => {
    const roster = rosterOf();
    expect(ROWS.map(([id, pins]) => `${id}:${pins.length}`)).toEqual(["A:4", "B:4", "C:5", "Q:7"]);
    expect({ rows: roster.rows.map(row => [row.id, [...row.pins]]), tests: [...roster.tests] }).toStrictEqual({
      rows: ROWS.map(([id, pins]) => [id, [...pins]]),
      tests: [...TITLES],
    });
  });

  it("R-ALL-SKIP: the report records the census once, its cases exactly the 22 titles frozen here under their describe paths, each passed (collected 22, passed 22)", () => {
    const files = reportFiles();
    const cases = files[0]?.assertionResults ?? [];
    const statuses = cases.map(entry => entry.status ?? "<no status>");
    expect({
      reported: files.length,
      titles: cases.map(entry => entry.title ?? "<untitled>"),
      paths: cases.map(entry => [...(entry.ancestorTitles ?? [])]),
      statuses,
      counts: { collected: cases.length, passed: statuses.filter(status => status === "passed").length },
    }).toStrictEqual({
      reported: 1,
      titles: [...TITLES],
      paths: pathsOf(rosterOf()),
      statuses: TITLES.map(() => "passed"),
      counts: { collected: TITLES.length, passed: TITLES.length },
    });
  });

  it("R-ALL-SKIP: judge() reads every frozen title collected once, passed in the test tier's report and asserting", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(rosterOf()));
    // Two readings of the same verdicts: each refusal named with its cause, and every verdict's code and case count read directly.
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: TITLES.length,
      refused: [],
      codes: TITLES.map(() => "ok:1"),
    });
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: CENSUS, title: "Z9 no such pin", suite: [SUITE], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("Z9 no such pin") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });
});
