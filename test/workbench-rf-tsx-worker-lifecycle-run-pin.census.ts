/**
 * wb-jdpn cut #3 (owner ruling R762; rule 19(c), the frozen enumerate-the-resolvable form): the RUN PIN of
 * test/workbench-rf-tsx-worker-lifecycle-census.test.ts, a census-tier leg judged in wb-u62 REPORT MODE - judge() reads the gate's own
 * test report (DEFAULT_TIER_REPORT, written by the test step) and never re-executes the tier, and the .census.ts suffix keeps this file
 * out of the report it judges. It is that census's OUT-OF-FILE ANCHOR, the home of the quiet rows the census's own file cannot hold:
 * - R-ALL-SKIP (the census's named residual, a member of refusal #1's U1 class): every task of the census skipped at collection - ONE
 *   suite wrapping its three file-scope registrations (a describe in its skip, runIf(false) or skipIf(true) form), or `it` rebound to
 *   a skipping variant (test's skip form, or its own runIf(false) or skipIf(true) form) - reads 0 passed / 13 skipped at rc 0, and vitest then runs none
 *   of its judges and none of its hooks, so no row inside that file can see it. Here the report's record of the census must be exactly
 *   the 13 titles frozen below, under their describe paths, each passed (collected 13, passed 13), and judge() must read every title
 *   collected once, passed and asserting (the helper's three legs), so any collection-time skip of the census reds here, naming it.
 * - the census's coordinated self-hollows: its rows' pin ids, its 13 titles and its FAMILY vocabulary are frozen HERE, outside the census
 *   and its roster, so a pin removed from the census's ROWS, frozen literal, IMPL and roster together (absent from the report), or a
 *   FAMILY word moved to GENERIC with the roster's family and witnesses regenerated together, reds here.
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

const CENSUS = "test/workbench-rf-tsx-worker-lifecycle-census.test.ts";
const ROSTER = "test/fixtures/rf-tsx-worker-lifecycle-roster.json";
/** The census's one describe, holding rows A-C; its two judges sit at file scope, outside it. */
const SUITE = "wb-csbt.3 rf TSX worker lifecycle census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R3, standing posture pin)";
/** The judged set, registered first at file scope, and the closing case, registered last at file scope. */
const FIRST = "the judged set: the frozen shape, the out-of-file roster, the owner's filing and the cases agree";
const LAST = "registration: every case of this file is registered once, in roster order, in run mode, ran before this one and reached its witness compare";
/** Each row's id and its pins, in registration order: frozen here, outside the census and its roster. */
const ROWS: readonly (readonly [string, readonly string[]])[] = [
  ["A", ["A1", "A2", "A3"]],
  ["B", ["B1", "B2", "B3", "B4"]],
  ["C", ["C1", "C2", "C3", "C4"]],
];
/** The census's FAMILY, frozen here: its roster's family must equal it, word for word and in order. */
const FAMILY = ["deno", "tsx", "worker", "workers", "pool", "pools", "resident", "residents", "admission", "admissions", "admit", "admits"];

interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
interface Roster {
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly family: readonly string[];
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function titlesIn(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(entry => typeof entry === "string")) throw new Error(`${ROSTER} ${name} must be a list of strings`);
  return value.map(String);
}
/** The census's roster: its rows (id, label, pin ids), its tests list and its family, refused by name when one has the wrong shape. */
function rosterOf(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8"));
  if (!isRecord(raw) || !Array.isArray(raw.rows)) throw new Error(`${ROSTER} must hold rows`);
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isRecord(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`${ROSTER} rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown) => (isRecord(pin) && typeof pin.id === "string" ? pin.id : `<pin without an id in row ${row.id}>`));
    return { id: row.id, label: row.label, pins };
  });
  return { rows, tests: titlesIn(raw.tests, "tests"), family: titlesIn(raw.family, "family") };
}

/** The titles frozen here, in registration order: the judged set, every row's pins, the closing case. */
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

describe("wb-jdpn rf TSX worker lifecycle run pin: the census's out-of-file anchor, judged from the gate's own test report", () => {
  it("frozen shape: the rows, titles and FAMILY frozen here are exactly the census roster's", () => {
    const roster = rosterOf();
    expect(ROWS.map(([id, pins]) => `${id}:${pins.length}`)).toEqual(["A:3", "B:4", "C:4"]);
    expect({ rows: roster.rows.map(row => [row.id, [...row.pins]]), tests: [...roster.tests], family: [...roster.family] }).toStrictEqual({
      rows: ROWS.map(([id, pins]) => [id, [...pins]]),
      tests: [...TITLES],
      family: [...FAMILY],
    });
  });

  it("R-ALL-SKIP: the report records the census once, its cases exactly the 13 titles frozen here under their describe paths, each passed (collected 13, passed 13)", () => {
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
