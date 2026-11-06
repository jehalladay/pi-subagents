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
 * SDK. Each cell that runs the experiment pins the whole reading measured at this tree and then its verdict; a verdict
 * other than invalid-experiment is a reading the experiment's validation accepted. In the judge cells (R015-SEAM,
 * R015-ORACLE, R016-ORACLE) each refused or breaching row varies one facet of a reading the judge otherwise accepts,
 * adjusting only the counts that keep its other checks quiet, so each validation reason and each oracle breach is pinned
 * alone. The cells' other rows are controls: R015-SEAM's two base readings, which the validation accepts, and the oracle
 * cells' readings that meet the oracle (the oracle reading itself, at resume startup, with the host settlements replaced,
 * and in R016-ORACLE with no replacement start).
 * The requirement's "skipped result" is read as the target row's final progress entry marked skipped and a null script
 * value; the host settlement is retained in the reading and is not judged. EAT-R015's "Keep existing run-signal F10
 * and no-abort one-call controls" is pinned outside this file, by test/workbench-mwi-cancel-repro.census.ts over the
 * gate's own test report.
 *
 * NOT CLAIMED: production reachability. Both beforeDispatch producers registered at this tree are synchronous
 * (src/index.ts, the workflow tool's identity re-check, and src/workbench/hosts/local-detached.ts, the detached basis
 * check), so in those wirings the parked window exists only as the one microtask turn of
 * `await config.beforeDispatch?.()`. This suite measures the host contract, whose option type admits an asynchronous
 * beforeDispatch. Native SDK teardown, a control issued at any other seam, and workflow-wide cancel beyond the F10
 * shape are NOT CLAIMED either.
 */
import { describe, expect, it } from "vitest";
import { judgeParkedObservation, type ParkedObservation, runParkedDispatchExperiment } from "./helpers/parked-dispatch-experiment.js";

/** claude-host.ts: the post-await refusal a run abort produces. */
const WORKFLOW_ABORTED = "Workflow aborted.";
/** claude-host.ts: every path that reports an SDK query the host stopped. */
const CANCELLED = "Claude SDK query was cancelled.";

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

const PARKED_SKIP_RESUME: ParkedObservation = {
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

/** The validation's reasons for a reading, or the verdict's kind when the validation accepts the reading. */
function reasonsOf(observation: ParkedObservation): readonly string[] {
  const verdict = judgeParkedObservation(observation);
  return verdict.kind === "invalid-experiment" ? verdict.reasons : [verdict.kind];
}

/** The oracle's breaches for a reading, or the verdict's kind when the reading breaks none or is refused. */
function breachesOf(observation: ParkedObservation): readonly string[] {
  const verdict = judgeParkedObservation(observation);
  return verdict.kind === "observed-violation" ? verdict.breaches : [verdict.kind];
}

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

    expect(observation).toEqual(PARKED_SKIP_RESUME);
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"],
    });
  });

  it("R015-NO-BARRIER mutant: a beforeDispatch that returns at once leaves nothing parked, and the experiment refuses the reading", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn", barrier: "absent" });

    // The target's query had already started when the skip was issued, and no abort reached the host while parked. The
    // rest of the reading is pinned as measured: the host settled the target skipped with the cancelled-query error,
    // the row ended as an error marked skipped, and the script received null.
    expect(observation).toEqual({
      plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "absent" },
      parkedAtControl: false,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 0,
      runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }],
      finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
      runStatus: "completed",
      scriptValue: null,
    });
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "invalid-experiment",
      reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"],
    });
  });

  it("R015-RUN-ABORT mutant: a whole-run abort in place of the skip is refused, while the instrument still reads the F10 shape (zero SDK starts, the host settling the target skipped as Workflow aborted.)", async () => {
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

  it("R015-ORACLE a valid skip reading meets the oracle only with no target SDK start, a present final row marked skipped and a null script value, and each breach alone is named", () => {
    const oracle: ParkedObservation = {
      ...PARKED_SKIP_SPAWN,
      sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
      sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }],
      finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
      scriptValue: null,
    };

    expect(breachesOf(oracle)).toEqual(["failed-reproduction"]);
    // At resume startup the origin agent's own SDK start is a setup start, not a target start.
    expect(
      breachesOf({
        ...oracle,
        plan: { ...oracle.plan, startup: "resume" },
        queriesBeforeControl: 1,
        authorizations: PARKED_SKIP_RESUME.authorizations,
        sdkStarts: { setup: 1, original: 0, replacement: 0, extra: 0 },
        sdkCallsRecorded: 1,
      }),
    ).toEqual(["failed-reproduction"]);
    // The host settlements are retained, not judged: replacing them leaves the verdict as it was.
    expect(breachesOf({ ...oracle, hostSettlements: [] })).toEqual(["failed-reproduction"]);
    expect(breachesOf({ ...oracle, hostSettlements: PARKED_SKIP_SPAWN.hostSettlements })).toEqual(["failed-reproduction"]);
    // One breach at a time, each read from its own field. An SDK start in each target attempt: the original, the
    // replacement and a later one.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 1 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    // A final row that is not marked skipped, and no final row at all.
    expect(breachesOf({ ...oracle, finalRow: PARKED_SKIP_SPAWN.finalRow })).toEqual(["not-settled-skipped"]);
    expect(breachesOf({ ...oracle, finalRow: undefined })).toEqual(["not-settled-skipped"]);
    // A script value other than null: an answer, undefined, and the other falsy values.
    expect(breachesOf({ ...oracle, scriptValue: "answer 0" })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: undefined })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: false })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: 0 })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: "" })).toEqual(["script-received-a-value"]);
  });

  it("R015-SEAM the validation refuses each wrong-seam facet alone by its one reason, before any oracle comparison (the setup and dispatch counts at both startups)", () => {
    // Controls: both base readings pass the validation (each is an observed violation), so each row below is refused
    // for the one facet it varies, and its oracle breaches are never reported.
    expect(reasonsOf(PARKED_SKIP_SPAWN)).toEqual(["observed-violation"]);
    expect(reasonsOf(PARKED_SKIP_RESUME)).toEqual(["observed-violation"]);

    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, parkedAtControl: false })).toEqual(["control-not-parked"]);
    // A target SDK start before the control, at each startup (at resume the origin agent's own start comes first).
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 1 })).toEqual(["dispatch-before-control"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 2 })).toEqual(["dispatch-before-control"]);
    // A whole-run abort, each facet alone: the run's own signal aborted, and the plan routing the control as a run abort.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, runAborted: true })).toEqual(["whole-run-abort"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route: "run-abort" } })).toEqual(["whole-run-abort"]);
    // No per-agent control, each facet alone: a "none" plan whatever the control's value reads, and a reading that holds
    // no value from a per-agent control.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, control: "none" } })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, control: "none" }, controlAccepted: false })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, controlAccepted: undefined })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, controlAccepted: false })).toEqual(["control-refused"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, hostAbortsWhileParked: 0 })).toEqual(["control-not-routed-to-host"]);
    // Setup agents that drifted, each facet alone: their beforeDispatch entries, and their SDK starts. One more than
    // the none expected at spawn; one more and one fewer than the one expected at resume.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, authorizations: { ...PARKED_SKIP_SPAWN.authorizations, setup: 1 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 1, sdkStarts: { ...PARKED_SKIP_SPAWN.sdkStarts, setup: 1 }, sdkCallsRecorded: 2 })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, authorizations: { ...PARKED_SKIP_RESUME.authorizations, setup: 2 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, authorizations: { ...PARKED_SKIP_RESUME.authorizations, setup: 0 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 2, sdkStarts: { ...PARKED_SKIP_RESUME.sdkStarts, setup: 2 }, sdkCallsRecorded: 3 })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 0, sdkStarts: { ...PARKED_SKIP_RESUME.sdkStarts, setup: 0 }, sdkCallsRecorded: 1 })).toEqual(["setup-drift"]);
    // An SDK start the per-attempt counts leave out.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, sdkCallsRecorded: 2 })).toEqual(["uncounted-sdk-start"]);
  });
});

describe("EAT-R016 a per-agent retry issued while the host's beforeDispatch is parked (wb-9v02)", () => {
  it("R016-SPAWN fresh spawn: the original attempt still starts its SDK query, then one replacement runs as attempt 2", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "spawn" });

    expect(observation).toEqual(PARKED_RETRY_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
  });

  it("R016-RESUME resume startup: the resumed row's original attempt still starts its SDK query, then one replacement runs as attempt 2 and the script receives its answer", async () => {
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
    expect(observation).toEqual(PARKED_RETRY_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
    // The fixture SDK's own call log saw both queries; the per-attempt count must account for each of them.
    expect(observation.sdkCallsRecorded).toBe(2);
    expect(observation.sdkStarts.original).toBe(1);

    const finalSuccessOnly: ParkedObservation = { ...observation, sdkStarts: { ...observation.sdkStarts, original: 0 } };
    expect(judgeParkedObservation(finalSuccessOnly)).toEqual({ kind: "invalid-experiment", reasons: ["uncounted-sdk-start"] });
  });

  it("R016-ORACLE a valid retry reading meets the oracle only with no original start, at most one replacement start and none later, each replacement start authorized, and each breach alone is named", () => {
    const oracle: ParkedObservation = { ...PARKED_RETRY_SPAWN, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 };

    expect(breachesOf(oracle)).toEqual(["failed-reproduction"]);
    // A retry that never re-runs is inside "at most one" as well.
    expect(
      breachesOf({ ...oracle, authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 0 }),
    ).toEqual(["failed-reproduction"]);
    // At resume startup the origin agent's own SDK start is a setup start, not an original or a replacement one.
    expect(
      breachesOf({
        ...oracle,
        plan: { ...oracle.plan, startup: "resume" },
        queriesBeforeControl: 1,
        authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 },
        sdkStarts: { setup: 1, original: 0, replacement: 1, extra: 0 },
        sdkCallsRecorded: 2,
      }),
    ).toEqual(["failed-reproduction"]);
    // The host settlements are retained, not judged: replacing them leaves the verdict as it was.
    expect(breachesOf({ ...oracle, hostSettlements: [] })).toEqual(["failed-reproduction"]);
    // One breach at a time, each read from its own field.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2 })).toEqual(["original-started-after-retry"]);
    expect(
      breachesOf({ ...oracle, authorizations: { ...oracle.authorizations, replacement: 2 }, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 }),
    ).toEqual(["more-than-one-replacement"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 })).toEqual(["more-than-one-replacement"]);
    expect(breachesOf({ ...oracle, authorizations: { ...oracle.authorizations, replacement: 0 } })).toEqual(["replacement-not-authorized"]);
    // Two replacement starts under one replacement entry break both.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 })).toEqual([
      "more-than-one-replacement",
      "replacement-not-authorized",
    ]);
  });
});
