/**
 * W19 / WB-022 slice 4 of 4 (wb-ksz.6): the child-crash slice's title pins, judged in REPORT MODE.
 *
 * Owner sequencing (wb-u62 R1, wb-nl8 landed): a census over the default gate is judged over the gate's OWN vitest
 * JSON report (.forge/vitest-report.json, written by the test step) through the landed judge(); nothing is re-executed
 * here, and the .census.ts suffix keeps this file outside the default include, so the report never records it. This
 * replaces the removed bare-text readFileSync + toContain title census: a pin is now an exists / runs-where / asserts
 * verdict over the report, not a text match over a source file.
 *
 * What is pinned, by title in the test tier:
 *   - the four landed detached-host crash rows the slice's header CITES (route b, owner 06:1xZ: the rows are never
 *     re-tested, edited or mocked here; this leg only asks that each still ran, passed and asserted in the gate's
 *     report): three in test/workbench-detached-faults-receipt.test.ts (wb-0kg.1, 2dfa1f9) and one in
 *     test/workbench-local-detached-effects.test.ts (wb-6hb.1, 56275ad, NOT wb-0kg.1);
 *   - the slice's own five injected-death rows K1-K5 (test/workbench-child-crash-faults.test.ts), so a silently
 *     dropped row is red, naming it.
 * NOT pinned: the two it.todo REAL rows (todo cases are not passing cases), and the mocked Worker's stand-in
 * behaviour, which stays NOT a sandbox property (the real-child proof rides wb-ksz slice 3).
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);

const RECEIPT_FILE = "test/workbench-detached-faults-receipt.test.ts";
const EFFECTS_FILE = "test/workbench-local-detached-effects.test.ts";
const OWN_FILE = "test/workbench-child-crash-faults.test.ts";

const pin = (file: string, title: string): CasePin => ({ file, title, tier: DEFAULT_GATE_TIER });

/** The cited detached crash rows, exact titles as registered. */
const CITED: readonly CasePin[] = [
  pin(RECEIPT_FILE, "writes exactly one marker before the kill and nothing after it"),
  pin(RECEIPT_FILE, "flags a marker count of 2 under one invocation id as duplicate-effect"),
  pin(RECEIPT_FILE, "drives real signals and cleans every host and the workspace in finally"),
  pin(EFFECTS_FILE, "refuses a write whose first attempt lost its answer instead of retrying it"),
];

/** The slice's own injected-death rows, exact titles as registered. */
const OWN: readonly CasePin[] = [
  pin(OWN_FILE, "K1 'exit' alone settles only its run as the typed exited-before-completing failure"),
  pin(OWN_FILE, "K2 'error' then 'exit' settles once, with the error's own message"),
  pin(OWN_FILE, "K3 a non-Error 'error' payload is stringified into the same typed failure"),
  pin(OWN_FILE, "K4 frames and answers arriving after death change nothing and reach no one"),
  pin(OWN_FILE, "K5 a settled run's attached-but-inert error and exit listeners change nothing when fired again"),
];

const PINS: readonly CasePin[] = [...CITED, ...OWN];

describe("child-crash slice (wb-ksz.6): title pins judged on the gate's own report", () => {
  it("each-liveness: the roster holds the four cited detached rows and the five own rows, each once", () => {
    expect(CITED).toHaveLength(4);
    expect(OWN).toHaveLength(5);
    expect(new Set(PINS.map(p => `${p.file}\u0000${p.title}`)).size).toBe(PINS.length);
  });

  it("every pinned case was collected once, passed in the test tier's report, and asserts", () => {
    const verdicts = judge(REPORT, PINS);
    expect(verdicts).toHaveLength(PINS.length);
    for (const verdict of verdicts) {
      expect(verdict.ok, `${verdict.pin.file} :: ${verdict.pin.title}: ${verdict.why}`).toBe(true);
      expect(verdict.cases).toBe(1);
    }
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", () => {
    const [verdict] = judge(REPORT, [pin(OWN_FILE, "no such child-crash case")]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("absent");
    expect(verdict?.why).toContain("no such child-crash case");
  });
});
