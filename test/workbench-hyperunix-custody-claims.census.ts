/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY: the run pin of the HyperUnix custody claims, judged in wb-u62 REPORT
 * MODE. It carries the "stay green" half of the acceptance row "Standing: the custody tests stay green and claim only call-custody,
 * never real-child termination." judge() (test/helpers/census.ts) reads the gate's own test report (DEFAULT_TIER_REPORT, written by
 * the test step) and never re-executes the tier; the .census.ts suffix keeps this file out of the report it judges.
 *
 * Pinned by exact title under the exact describe path, each collected once, passed in the test tier's report and asserting:
 *   - the three cases of the "HyperUnix SDK custody" suite of test/workbench-provider-lifecycle.test.ts, the custody tests the
 *     bead's rationale names (close-once on the first, abort-dispose and close after abort on the third; the second is the same
 *     suite's incomplete-coverage case). They are never re-tested, edited or mocked here: this leg only asks that each still ran,
 *     passed and asserted in the gate's report, so a skip, a todo, a fails inversion, a rename, a deletion or an exit before the
 *     first assertion reds here, naming the case;
 *   - every case of the claims census test/workbench-hyperunix-custody-claims.test.ts, so a collection-time skip of that census
 *     (a skipped describe, or its cases rebound to a skipping variant), which no row inside it can see, reds here.
 * The claims census holds this file to its own rows (its C9: these literals name the custody suite, every frozen custody case, the
 * census's suite and every census case), so neither file is edited alone. A liveness row proves the judge is not accept-all.
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads the report and the pinned sources.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each pinned file's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

const LIFECYCLE = "test/workbench-provider-lifecycle.test.ts";
const CUSTODY_SUITE = "HyperUnix SDK custody";
/** The custody suite's cases, exact titles as registered, in registration order. */
const CUSTODY_CASES: readonly string[] = [
  "delegates binary selection to SDK PATH discovery and enforces read grants",
  "preserves incomplete native coverage instead of inventing absence",
  "closes an SDK client when abort fires during asynchronous open, before find",
];

const CENSUS = "test/workbench-hyperunix-custody-claims.test.ts";
const CENSUS_SUITE = "wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)";
/** The claims census's cases, exact titles as registered, in registration order. */
const CENSUS_CASES: readonly string[] = [
  "frozen shape: the vocabulary, the case table, the custody map, the falsifier shapes, the exclusions and the near misses are exactly the frozen literals",
  "matcher: every vocabulary term is found in each case fold and separator spelling, and every near miss stays quiet",
  "C1 cases: the HyperUnix SDK custody suite holds exactly the three frozen cases, in order, with their ordered assertion signatures and no skip, only, todo or fails member",
  "C1 custody map: every lifecycle-call assertion of the suite is claimed by exactly one CUSTODY pin, and every claimed lifecycle call is one the provider makes",
  "C2 call custody only: every assertion in the suite is a mock-call assertion on a stand-in or an outcome assertion on the provider's own result",
  "C3 stand-in clients only: every case stubs HyperUnix.open with a mocked return before it drives the provider",
  "C4 no termination claim: the suite's title, case titles, comments and literals carry no termination term",
  "C4 calibration: the same collector and vocabulary find the termination claim of every RF case whose stand-in child ignores SIGTERM, naming every signal the RF provider sends, and every termination word those titles and the SDK's own termination prose use is a vocabulary term",
  "C5 Pi delegates: the HyperUnix provider disposes on abort and closes in finally, and never kills, reads a pid, names a signal or imports child_process",
  "C6 SDK-owned termination: the installed SDK transport kills the owned process group on abort, and every signal it or the RF provider sends is a vocabulary term",
  "C7 no hand-rolled kill falsifier: no test or qa file that drives HX carries a kill call, a pid read, a process-table probe or ESRCH",
  "C7 calibration: the falsifier detector finds the SDK transport's and the RF provider's own kill code and every shape in a planted control",
  "C8 docs: no docs/workbench clause pairs the HX side with a termination term unless it names the upstream HXGC-OPS-002 artifact",
  "C8 calibration: the clause reader finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs",
  "C9 run pin: the run pin's literals name the HX suite, every frozen case title, this file's suite and every case of this file",
];

function pinsOf(file: string, suite: string, titles: readonly string[]): CasePin[] {
  return titles.map(title => ({ file, title, suite: [suite], tier: DEFAULT_GATE_TIER }));
}
/** Each verdict that is not ok, or not collected exactly once, as its own attribution (the why names the title and the cause). */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe("wb-tz2.11 HyperUnix custody run pin: the custody cases and the claims census, judged from the gate's own test report", () => {
  it("frozen shape: three custody cases and fifteen census cases, every title distinct", () => {
    expect({ custody: CUSTODY_CASES.length, census: CENSUS_CASES.length, distinct: new Set([...CUSTODY_CASES, ...CENSUS_CASES]).size }).toStrictEqual({
      custody: 3,
      census: 15,
      distinct: 18,
    });
  });

  it("stay green: each HyperUnix SDK custody case was collected once, passed in the test tier's report and asserts", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(LIFECYCLE, CUSTODY_SUITE, CUSTODY_CASES));
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: CUSTODY_CASES.length,
      refused: [],
      codes: CUSTODY_CASES.map(() => "ok:1"),
    });
  });

  it("R-ALL-SKIP: every case of the claims census was collected once, passed in the test tier's report and asserts", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(CENSUS, CENSUS_SUITE, CENSUS_CASES));
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: CENSUS_CASES.length,
      refused: [],
      codes: CENSUS_CASES.map(() => "ok:1"),
    });
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: LIFECYCLE, title: "Z9 no such custody case", suite: [CUSTODY_SUITE], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("Z9 no such custody case") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });
});
