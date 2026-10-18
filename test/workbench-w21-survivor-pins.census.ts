/**
 * wb-36l: the W21 survivor-pin census - the adoption carrier re-homed from wb-oq3 by the owner's oq3 R1 = (a) ruling
 * (landing-order registry entry 6, wb-9x5.6 docs-pinning, names this bead as the post-u62 adoption carrier).
 *
 * It adopts wb-u62's REPORT-MODE census helper: judge(DEFAULT_TIER_REPORT, pins) reads the JSON report the gate's own
 * test step writes (wb-nl8; npm run test, vitest's json reporter with task locations) and never re-executes the default
 * tier, so every survivor pin below holds only when the gate's own run collected the case exactly once, passed it, and
 * reached a matcher-bearing assertion on every static path of its body. The .census.ts suffix keeps this file outside
 * the default include, so the report can never record the judging file.
 *
 * Two survivor classes:
 * - the DOCS-FLOOR class: the cap-saturation receipt's docs pin, re-expressed through the u62 docs floor (rendered,
 *   unique-heading, parent-path, whole-section), and the five falsifier rows proving the floor kills the wb-9x5.6 gate's
 *   measured docs-pin survivors D1 (EOF-appendix relocation), D2 (HTML-comment wrap) and D3 (withdrawn-subsection
 *   insertion) plus the floor's own D9 (parent heading path) and D10 (heading-spanning block) shapes;
 * - the G6 class: the CLI comment-out class (wb-9x5.6 gate mutant CLI-G6, the publish line commented out; O1 M3, the
 *   --strict wiring; M10, the receipt-file write, which the CLI performs inside that one publish statement): every W21
 *   bench CLI's one real process.exitCode statement, and the cap-saturation CLI's publish and --strict statements.
 * A liveness row proves the judge this census relies on is not accept-all.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";
import { w21BenchClis } from "./helpers/w21-bench-clis.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);

const CAP_RECEIPT = "test/workbench-cap-saturation-receipt.test.ts";
const REVISION_HONESTY = "test/workbench-w21-revision-honesty.test.ts";
const pinned = (file: string, suite: string, title: string): CasePin => ({ file, title, suite: [suite], tier: DEFAULT_GATE_TIER });

const DOCS_PIN_SUITE = "W21-D pass plan and constants";
const DOCS_FLOOR_SUITE = "W21-D docs floor (wb-36l adoption carrier): the docs pin kills the wb-9x5.6 gate's D1-D3 survivors and the u62 floor's D9/D10 shapes";
/** The re-expressed docs pin itself (registry entry 6's census case, title unchanged). */
const DOCS_PIN = pinned(CAP_RECEIPT, DOCS_PIN_SUITE, "quotes the two docs sections it answers verbatim, so doc drift fails here");
const DOCS_FLOOR_PINS: readonly CasePin[] = [
  DOCS_PIN,
  pinned(CAP_RECEIPT, DOCS_FLOOR_SUITE, "D1 relocation: the first quoted clause moved out of its section into an EOF appendix keeps the raw includes form green and reddens the docs floor"),
  pinned(CAP_RECEIPT, DOCS_FLOOR_SUITE, "D2 HTML-comment wrap: the first quoted clause wrapped in an HTML comment inside its section keeps the raw includes form green and reddens the docs floor"),
  pinned(CAP_RECEIPT, DOCS_FLOOR_SUITE, "D3 withdrawn subsection: a weakening ### subsection inserted inside the section keeps the raw includes form green and reddens the docs floor"),
  pinned(CAP_RECEIPT, DOCS_FLOOR_SUITE, "D9 parent heading path: a non-normative level-1 heading inserted above the section keeps the raw includes form green and reddens the docs floor"),
  pinned(CAP_RECEIPT, DOCS_FLOOR_SUITE, "D10 spanning range: an HTML comment opened inside the section and closed past its closing heading keeps the raw includes form green and reddens the docs floor"),
];

const EXIT_CODE_SUITE = "every W21 bench CLI sets its exit code in one real statement (parse-aware; the gate's CLI-G6 comment-out class)";
const PUBLISH_SUITE = "inspector-cap-saturation-bench publishes and takes --strict through real statements (wb-9x5.6 O1 M3/M10; gate CLI-G6, CLI-M3)";
/** The G6 class over the W21 bench CLIs on this tree (the shared enumeration, so a later W21 bench joins by construction). */
const g6Pins = (clis: readonly string[]): CasePin[] => [
  ...clis.map(file => pinned(REVISION_HONESTY, EXIT_CODE_SUITE, `${file}: exactly one process.exitCode assignment, as a statement of its own`)),
  pinned(REVISION_HONESTY, PUBLISH_SUITE, "sets the exit code at module level, after the measuring try, from publishReceipt over the stamped receipt and the real writers"),
  pinned(REVISION_HONESTY, PUBLISH_SUITE, "hands runCapSaturationBench strict: process.argv.includes('--strict') as a real property, never a constant"),
];

/** Each verdict that is not ok, as its own attribution (the why names the pin and the cause). */
const refusals = (verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => verdict.why);

describe("W21 survivor pins (wb-36l): the gate's own test report, judged in report mode", () => {
  it("docs-floor class: the re-expressed docs pin and its D1/D2/D3/D9/D10 falsifier rows are each collected once, passed and asserting", () => {
    const verdicts = judge(REPORT, DOCS_FLOOR_PINS);
    expect(refusals(verdicts)).toEqual([]);
    expect(verdicts.map(verdict => [verdict.code, verdict.cases])).toEqual(DOCS_FLOOR_PINS.map(() => ["ok", 1]));
  });

  it("G6 class: every W21 bench CLI's one real exit-code statement and the cap-saturation CLI's publish and --strict statements are each collected once, passed and asserting", () => {
    const clis = w21BenchClis();
    expect(clis).toContain("qa/workbench/inspector-cap-saturation-bench.mjs");
    const pins = g6Pins(clis);
    const verdicts = judge(REPORT, pins);
    expect(refusals(verdicts)).toEqual([]);
    expect(verdicts.map(verdict => [verdict.code, verdict.cases])).toEqual(pins.map(() => ["ok", 1]));
  });

  it("liveness: a survivor pin the report cannot hold is red, naming it (an accept-all judge cannot pass this census)", () => {
    const [verdict] = judge(REPORT, [{ ...DOCS_PIN, title: "D0 no such survivor row" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("absent");
    expect(verdict?.why).toContain("D0 no such survivor row");
  });
});
