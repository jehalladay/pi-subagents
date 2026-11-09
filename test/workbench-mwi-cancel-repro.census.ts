/**
 * wb-9v02 [MWI-cancel-repro] cut #2: EAT-R015's keep clause, judged in wb-u62 REPORT MODE over the gate's own test report.
 *
 * EAT-R015's acceptance ends "Keep existing run-signal F10 and no-abort one-call controls" (ATOMIC-REQUIREMENTS.md at
 * pi-subagents master 0b25e14e; test/workbench-mwi-cancel-repro.test.ts quotes the whole entry). They are the two cases of
 * the F10 suite of test/workbench-claude-cancel-faults.test.ts (the subject), which this bead does not edit. This file is a
 * census-tier leg (vitest.census.config.ts, include test/**\/*.census.ts): it reads vitest's JSON report of the gate's test
 * step (DEFAULT_TIER_REPORT, written by `npm run test`) and runs no case of the subject; the .census.ts suffix keeps it out
 * of the report it reads. No case here reads the subject's source text; judge() reads it for its own legs. This replaces
 * the bare-text title count cut #1 carried (refusal #1, U1).
 *
 * PINNED READER SET, every case in this file, with the independent falsifiers measured red against it at cut time (one
 * edit each, restored byte-identical; the ids are the delivery note's, which carries the counts):
 * - KEEP-SHAPE (frozen shape): ROWS holds one row, KEEP, whose label is the clause above and whose pins are F10 and
 *   F10-CONTROL, in that order. Red under: a pin deleted from the row (CT1), the label shortened (CT2), the row deleted
 *   (CT4).
 * - KEEP-REPORT (the anchor outside this file's literals): the report holds one file entry whose path ends with the
 *   subject's, and the titles of the cases that entry lists with exactly the F10 suite as their describe path are the
 *   pinned titles, in the pins' order, each with status passed. Red under, in the subject: the F10 case inside a block
 *   comment (K1); the F10 suite given a skip modifier (K2); the control's body returning before its first assertion,
 *   under the gate's --expect.requireAssertions (K3); the control registered only under an unset environment variable
 *   (K4); the subject excluded from the default tier (K5); the control given skipIf(true) (K6); the F10 case given a skip
 *   modifier (KM1); the control renamed (KM2); the two cases registered in the other order (K8); a third case added to
 *   the F10 suite (K9); the control registered twice (K10). In this file: a pin deleted (CT1), a pin swapped for another
 *   passing case of the subject (CT3), the row deleted (CT4), the row deleted with its frozen-shape elements (CT5), the
 *   control's pin removed from every literal (CT6).
 * - KEEP-JUDGE: judge() (test/helpers/census.ts) reads each pin, under the F10 suite's describe path, collected once,
 *   passed in the test tier's report and asserting (the helper's three legs). Red under K1-K6, KM1, KM2, K10 and CT3, and
 *   under the K3 edit in a report run without --expect.requireAssertions (the helper's third leg reads the early return).
 * - KEEP-LIVENESS: while the report collects the subject, judge() reads one made-up title in the F10 suite, "F10 no such
 *   kept case", red, as absent, naming it: the judge is not accept-all (with the subject excluded, K5, judge() reads
 *   not-collected and this case reds as well).
 * Green under K7, a return type added to the control's arrow with the case still held and passing.
 *
 * NOT CLAIMED by this census: what either case asserts (an edit that keeps a case registered, passing and asserting while
 * changing what it checks stays green here); the subject's cases outside the F10 suite; any tier but the default test
 * tier; and every mode the shared helper names as its own residual (test/helpers/census.ts, the NAMED RESIDUALS in its
 * header), which bounds each judge() reading here.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads the subject's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

/** The subject file; this bead does not edit it. */
const SUBJECT = "test/workbench-claude-cancel-faults.test.ts";
/** The subject's F10 suite, at its file scope: the describe that holds both kept cases. */
const F10_SUITE = "an abort that lands during the host's pre-dispatch await (wb-a2g.5, live finding init-after-abort)";

interface KeepPin {
  readonly id: string;
  readonly title: string;
}
interface KeepRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly KeepPin[];
}

/** The judged set, frozen here: one row for the requirement clause, one pin per kept case, exact titles as registered. */
const ROWS: readonly KeepRow[] = [
  {
    id: "KEEP",
    label: "Keep existing run-signal F10 and no-abort one-call controls",
    pins: [
      { id: "F10", title: "F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted" },
      { id: "F10-CONTROL", title: "F10 control: the same sequence without the abort issues exactly one query" },
    ],
  },
];

const PINS: readonly CasePin[] = ROWS.flatMap(row => row.pins.map(pin => ({ file: SUBJECT, title: pin.title, suite: [F10_SUITE], tier: DEFAULT_GATE_TIER })));

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly assertionResults?: readonly ReportCase[];
}

/** The report's records of the subject: every file entry whose path ends with the subject's. */
function subjectRecords(): readonly ReportFile[] {
  const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
  return (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(`/${SUBJECT}`));
}

/** Each verdict that is not ok, or not collected exactly once, with the title and the cause the judge names. */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe("wb-9v02 EAT-R015 keep clause: the F10 case and its no-abort control in the cancel-faults file, judged from the gate's own test report", () => {
  it("KEEP-SHAPE frozen shape: one row, KEEP, carrying the requirement clause and the pins F10 and F10-CONTROL", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["KEEP:2"]);
    expect(ROWS.map(row => [row.id, row.label, row.pins.map(pin => pin.id)])).toEqual([["KEEP", "Keep existing run-signal F10 and no-abort one-call controls", ["F10", "F10-CONTROL"]]]);
  });

  it("KEEP-REPORT the report holds one entry for the subject, and the cases it lists under exactly the F10 suite are the pinned titles, in the pins' order, each passed", () => {
    const records = subjectRecords();
    const suiteCases = (records[0]?.assertionResults ?? []).filter(entry => JSON.stringify(entry.ancestorTitles ?? []) === JSON.stringify([F10_SUITE]));
    expect({
      recorded: records.length,
      titles: suiteCases.map(entry => entry.title ?? "<untitled>"),
      statuses: suiteCases.map(entry => entry.status ?? "<no status>"),
    }).toStrictEqual({
      recorded: 1,
      titles: PINS.map(pin => pin.title),
      statuses: PINS.map(() => "passed"),
    });
  });

  it("KEEP-JUDGE judge() reads each pin collected once, passed in the test tier's report and asserting", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, PINS);
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: PINS.length,
      refused: [],
      codes: PINS.map(() => "ok:1"),
    });
  });

  it("KEEP-LIVENESS judge() reads a made-up title in the F10 suite red, as absent, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: SUBJECT, title: "F10 no such kept case", suite: [F10_SUITE], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("F10 no such kept case") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });
});
