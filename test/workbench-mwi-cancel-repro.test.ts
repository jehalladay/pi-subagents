/**
 * wb-9v02 [MWI-cancel-repro]: EAT-R015 and EAT-R016 of the mechanical-workflows-interop-2026-11-04 program, measured.
 *
 * Requirement text: docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e (the triage tree stays master-only).
 *  - EAT-R015 "The cancellation experiment MUST measure skip at parked beforeDispatch." Acceptance: "Park the actual
 *    host beforeDispatch; issue runtime skip; release; retain sdk call count and settlement. Desired safety oracle is
 *    zero SDK starts and skipped result. Record observed violation or failed reproduction. Keep existing run-signal F10
 *    and no-abort one-call controls." Adversarial mutant: "Remove the parked barrier or replace skip with whole-run
 *    abort; experiment validation rejects the wrong seam."
 *  - EAT-R016 "The cancellation experiment MUST measure retry at parked beforeDispatch." Acceptance: "Park original
 *    startup, issue per-agent retry, release; record original and replacement attempt dispatch counts. Safety oracle:
 *    original zero starts and at most one separately authorized replacement. Repeat on resume startup." Adversarial
 *    mutant: "Count only final successes and hide the original query."
 * The bead is evidence-first (BEAD-PLAN B-cancel-repro): it lands a bounded experiment and a pending status, never a
 * production fix. A witnessed red authorizes a separate repair proposal and does not close slice PI-4.
 *
 * The experiment is test/helpers/parked-dispatch-experiment.ts: the real runWorkflow over the real
 * createClaudeWorkflowHost, with the host's own beforeDispatch option as the barrier and the fixture query seam as the
 * SDK. Each live cell first asserts that the reading passed the experiment's validation, then pins the reading and the
 * verdict measured at this tree. A repair cut changes these pins to the oracle reading (failed-reproduction) in the
 * commit that carries the fix, and keeps every cell.
 *
 * NOT CLAIMED: production reachability. Both beforeDispatch producers registered at this tree are synchronous
 * (src/index.ts, the workflow tool's identity re-check, and src/workbench/hosts/local-detached.ts, the detached basis
 * check), so in those wirings the parked window exists only as the one microtask turn of
 * `await config.beforeDispatch?.()`. This suite measures the host contract, whose option type admits an asynchronous
 * beforeDispatch. Native SDK teardown, a control issued at any other seam, and workflow-wide cancel beyond the F10
 * shape are NOT CLAIMED either.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { judgeParkedObservation, type ParkedObservation, runParkedDispatchExperiment } from "./helpers/parked-dispatch-experiment.js";

/** claude-host.ts: the post-await refusal a run abort produces. */
const WORKFLOW_ABORTED = "Workflow aborted.";

const PARKED_SKIP_SPAWN: ParkedObservation = {
  plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "parked" },
  parkedAtControl: true,
  queriesBeforeControl: 0,
  controlAccepted: true,
  hostAbortsWhileParked: 1,
  runAborted: false,
  authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
  sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 },
  sdkCallsRecorded: 1,
  hostSettlements: [{ ok: true, skipped: false }],
  finalRow: { state: "done", skipped: false, attempt: 1, reason: null },
  runStatus: "completed",
  scriptValue: "answer 0",
};

const PARKED_RETRY_SPAWN: ParkedObservation = {
  plan: { control: "retry", startup: "spawn", route: "per-agent", barrier: "parked" },
  parkedAtControl: true,
  queriesBeforeControl: 0,
  controlAccepted: true,
  hostAbortsWhileParked: 1,
  runAborted: false,
  authorizations: { setup: 0, original: 1, replacement: 1, extra: 0 },
  sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 },
  sdkCallsRecorded: 2,
  hostSettlements: [
    { ok: true, skipped: false },
    { ok: true, skipped: false },
  ],
  finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" },
  runStatus: "completed",
  scriptValue: "answer 1",
};

describe("EAT-R015 a runtime skip issued while the host's beforeDispatch is parked (wb-9v02)", () => {
  it("R015-SPAWN fresh spawn: the seam validates, and the skip is lost: one SDK start, settled done, the script got the answer", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn" });

    expect(observation).toEqual(PARKED_SKIP_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"],
    });
  });

  it("R015-RESUME resume startup: the seam validates, and the skip is lost the same way on the resumed row", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "resume" });

    expect(observation).toEqual({
      plan: { control: "skip", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 1,
      runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 },
      sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 },
      sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }],
      finalRow: { state: "done", skipped: false, attempt: 1, reason: null },
      runStatus: "completed",
      scriptValue: "answer 1",
    });
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"],
    });
  });

  it("R015-NO-BARRIER mutant: a beforeDispatch that returns at once leaves nothing parked, and the experiment refuses the reading", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn", barrier: "absent" });

    // The target's query had already started when the skip arrived, and no abort reached the host while parked. How
    // that skip then settles is a different seam (a cancel mid-stream) and is not this experiment's reading.
    expect(observation).toMatchObject({
      parkedAtControl: false,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 0,
      sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkCallsRecorded: 1,
    });
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "invalid-experiment",
      reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"],
    });
  });

  it("R015-RUN-ABORT mutant: a whole-run abort in place of the skip is refused, while the instrument still reads the F10 shape (zero SDK starts, settled skipped)", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn", route: "run-abort" });

    // The run's own abort fans out to its in-flight agents, so the host does see one abortAgent while parked; the
    // killed run writes no terminal row for the parked agent, whose host settlement is the F10 one.
    expect(observation).toEqual({
      plan: { control: "skip", startup: "spawn", route: "run-abort", barrier: "parked" },
      parkedAtControl: true,
      queriesBeforeControl: 0,
      controlAccepted: undefined,
      hostAbortsWhileParked: 1,
      runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
      sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }],
      finalRow: { state: "start", skipped: false, attempt: 1, reason: null },
      runStatus: "killed",
      scriptValue: undefined,
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] });
  });

  it("R015-NO-CONTROL control: the same parked sequence with no control starts exactly one query, and is never read as a reproduction", async () => {
    const observation = await runParkedDispatchExperiment({ control: "none", startup: "spawn" });

    expect(observation).toEqual({
      ...PARKED_SKIP_SPAWN,
      plan: { control: "none", startup: "spawn", route: "per-agent", barrier: "parked" },
      controlAccepted: undefined,
      hostAbortsWhileParked: 0,
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "invalid-experiment", reasons: ["control-not-issued", "control-not-routed-to-host"] });
  });

  it("R015-ORACLE the judge records a failed reproduction for a valid-seam skip with zero SDK starts and a skipped null settlement", () => {
    const oracle: ParkedObservation = {
      ...PARKED_SKIP_SPAWN,
      sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
      sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: "Claude SDK query was cancelled." }],
      finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
      scriptValue: null,
    };

    expect(judgeParkedObservation(oracle)).toEqual({ kind: "failed-reproduction" });
    // One breach at a time, each read from its own field.
    expect(judgeParkedObservation({ ...oracle, sdkStarts: PARKED_SKIP_SPAWN.sdkStarts, sdkCallsRecorded: 1 })).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip"],
    });
    // A skip that comes back as a later attempt still started the SDK.
    expect(judgeParkedObservation({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 })).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip"],
    });
    expect(judgeParkedObservation({ ...oracle, finalRow: PARKED_SKIP_SPAWN.finalRow })).toEqual({ kind: "observed-violation", breaches: ["not-settled-skipped"] });
    expect(judgeParkedObservation({ ...oracle, scriptValue: "answer 0" })).toEqual({ kind: "observed-violation", breaches: ["script-received-a-value"] });
  });

  it("R015-SEAM the validation refuses each wrong-seam reading by name, before any oracle comparison", () => {
    const reasonsOf = (observation: ParkedObservation): readonly string[] => {
      const verdict = judgeParkedObservation(observation);
      return verdict.kind === "invalid-experiment" ? verdict.reasons : [];
    };

    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, parkedAtControl: false })).toEqual(["control-not-parked"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 1 })).toEqual(["dispatch-before-control"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, controlAccepted: false })).toEqual(["control-refused"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, hostAbortsWhileParked: 0 })).toEqual(["control-not-routed-to-host"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, runAborted: true })).toEqual(["whole-run-abort"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, sdkCallsRecorded: 2 })).toEqual(["uncounted-sdk-start"]);
  });
});

describe("EAT-R016 a per-agent retry issued while the host's beforeDispatch is parked (wb-9v02)", () => {
  it("R016-SPAWN fresh spawn: the original attempt still starts its SDK query, then one replacement runs as attempt 2", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "spawn" });

    expect(observation).toEqual(PARKED_RETRY_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
  });

  it("R016-RESUME resume startup: the resumed row's original attempt still starts, then one replacement resumes the same session", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "resume" });

    expect(observation).toEqual({
      plan: { control: "retry", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 1,
      runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 },
      sdkStarts: { setup: 1, original: 1, replacement: 1, extra: 0 },
      sdkCallsRecorded: 3,
      hostSettlements: [
        { ok: true, skipped: false },
        { ok: true, skipped: false },
      ],
      finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" },
      runStatus: "completed",
      scriptValue: "answer 2",
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
  });

  it("R016-HIDDEN-ORIGINAL mutant: counting only the final success hides the original query, and the experiment refuses the reading", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "spawn" });
    // The fixture SDK's own call log saw both queries; the per-attempt count must account for each of them.
    expect(observation.sdkCallsRecorded).toBe(2);
    expect(observation.sdkStarts.original).toBe(1);

    const finalSuccessOnly: ParkedObservation = { ...observation, sdkStarts: { ...observation.sdkStarts, original: 0 } };
    expect(judgeParkedObservation(finalSuccessOnly)).toEqual({ kind: "invalid-experiment", reasons: ["uncounted-sdk-start"] });
  });

  it("R016-ORACLE the judge records a failed reproduction for original zero starts and one authorized replacement, and a violation past that", () => {
    const oracle: ParkedObservation = {
      ...PARKED_RETRY_SPAWN,
      sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 },
      sdkCallsRecorded: 1,
    };

    expect(judgeParkedObservation(oracle)).toEqual({ kind: "failed-reproduction" });
    // A retry that never re-runs is inside "at most one" as well.
    expect(
      judgeParkedObservation({ ...oracle, authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 0 }),
    ).toEqual({ kind: "failed-reproduction" });
    expect(judgeParkedObservation({ ...oracle, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2 })).toEqual({
      kind: "observed-violation",
      breaches: ["original-started-after-retry"],
    });
    expect(judgeParkedObservation({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 })).toEqual({
      kind: "observed-violation",
      breaches: ["more-than-one-replacement", "replacement-not-authorized"],
    });
    expect(judgeParkedObservation({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 })).toEqual({
      kind: "observed-violation",
      breaches: ["more-than-one-replacement"],
    });
  });
});

describe("the existing controls EAT-R015 keeps", () => {
  it("KEEP-F10 test/workbench-claude-cancel-faults.test.ts still holds the run-signal F10 case and its no-abort one-call control, once each", () => {
    const lines = readFileSync(new URL("./workbench-claude-cancel-faults.test.ts", import.meta.url), "utf8").split("\n").map(line => line.trim());
    const held = (title: string): number => lines.filter(line => line.startsWith(`it(${JSON.stringify(title)}, async () => {`)).length;

    expect(held("F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted")).toBe(1);
    expect(held("F10 control: the same sequence without the abort issues exactly one query")).toBe(1);
  });
});
