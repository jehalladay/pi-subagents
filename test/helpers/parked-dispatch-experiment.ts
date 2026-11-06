/**
 * wb-9v02 [MWI-cancel-repro]: the bounded parked-dispatch experiment behind EAT-R015 and EAT-R016 of the
 * mechanical-workflows-interop-2026-11-04 program (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master
 * 0b25e14e; the triage tree stays master-only). The cases are test/workbench-mwi-cancel-repro.test.ts.
 *
 * runParkedDispatchExperiment drives the REAL runWorkflow over the REAL createClaudeWorkflowHost through the host's
 * documented fixture query seam. The SDK module is never mocked, nothing is spawned, nothing touches the network, and
 * no timer runs: every wait is on an event the code under test emits. The barrier is the host's own beforeDispatch
 * option: the target attempt's call parks the host inside `await config.beforeDispatch?.()` until the experiment
 * releases it. While the host is parked the experiment issues the runtime's per-agent control (WorkflowControl.skip or
 * retry, by row index), then releases the barrier and records what followed. Every fixture query completes, so only
 * the host or the runtime can keep one from running (the F5 shape of test/workbench-claude-cancel-faults.test.ts).
 *
 * Recorded, never inferred: every beforeDispatch entry; every query() start, attributed to the attempt whose entry
 * preceded it; the fixture SDK's own call log, kept apart from that attribution; the abortAgent calls that reach the
 * host for the target while it is parked (the one observing wrapper; every other host member is the real host's own);
 * the host's settlement of each target attempt; the row's final progress entry; the run status; and the value the
 * script received.
 *
 * judgeParkedObservation is the experiment's validation, then its oracle. It refuses a reading taken at the wrong seam:
 * nothing parked when the control was issued, a target SDK start before the control, a whole-run abort, no per-agent
 * control, one the runtime refused, one that never reached the host, setup agents that drifted, or an SDK start the
 * per-attempt counts leave out. Only a valid reading meets the safety oracle the requirements state: for a skip, zero
 * SDK starts and a skipped null settlement; for a retry, zero starts of the original attempt and at most one separately
 * authorized replacement. The verdict is an observed violation or a failed reproduction. This module fixes nothing and
 * no production code imports it.
 */
import { fileURLToPath } from "node:url";
import type { SDKSessionInfo } from "@anthropic-ai/claude-agent-sdk";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../../src/workbench/claude-host.js";
import type { WorkflowAgentEntry } from "../../src/workflow/progress.js";
import { runWorkflow, type WorkflowControl, type WorkflowHost, type WorkflowRunResult } from "../../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./claude-sdk-stream.js";

/** What the experiment does while the target is parked; "none" is the no-control control. */
export type ParkedControl = "skip" | "retry" | "none";
/** Which startup the target attempt is: a fresh spawn, or the resume of a completed origin agent. */
export type ParkedStartup = "spawn" | "resume";
/** How the control reaches the run: the runtime's per-agent control, or (a wrong seam) a whole-run abort. */
export type ParkedRoute = "per-agent" | "run-abort";
/** Whether the target's beforeDispatch holds the host until released, or (a wrong seam) returns at once. */
export type ParkedBarrier = "parked" | "absent";

export interface ParkedPlan {
  readonly control: ParkedControl;
  readonly startup: ParkedStartup;
  /** Default "per-agent". */
  readonly route?: ParkedRoute;
  /** Default "parked". */
  readonly barrier?: ParkedBarrier;
}

/** A count split by attempt: setup agents before the target, its original attempt, the replacement, anything later. */
export interface AttemptCounts {
  readonly setup: number;
  readonly original: number;
  readonly replacement: number;
  readonly extra: number;
}

/** What the host's onSettled reported for one attempt of the target. */
export interface HostSettlement {
  readonly ok: boolean;
  readonly skipped: boolean;
  readonly error?: string;
}

/** The target row's last progress entry, as the run log holds it. */
export interface FinalRow {
  readonly state: string;
  readonly skipped: boolean;
  readonly attempt: number;
  /** lastAttemptReason, or null on a first attempt. */
  readonly reason: string | null;
}

export interface ParkedObservation {
  readonly plan: Required<ParkedPlan>;
  /** The target's beforeDispatch had been entered and had not returned when the control was issued. */
  readonly parkedAtControl: boolean;
  /** query() starts already made when the control was issued. */
  readonly queriesBeforeControl: number;
  /** What the runtime's skip() or retry() returned; undefined when no per-agent control was issued. */
  readonly controlAccepted: boolean | undefined;
  /** abortAgent calls naming the target that reached the host while its beforeDispatch was parked. */
  readonly hostAbortsWhileParked: number;
  /** The run's own signal was aborted. */
  readonly runAborted: boolean;
  /** beforeDispatch entries, by attempt. */
  readonly authorizations: AttemptCounts;
  /** query() starts, each attributed to the attempt whose beforeDispatch entry preceded it. */
  readonly sdkStarts: AttemptCounts;
  /** Every query() the fixture SDK recorded, independent of the attribution above. */
  readonly sdkCallsRecorded: number;
  /** The host's settlements of the target's attempts, in order. */
  readonly hostSettlements: readonly HostSettlement[];
  readonly finalRow: FinalRow | undefined;
  readonly runStatus: WorkflowRunResult["status"];
  /** The target agent() call's value as the script received it (the script returns it). */
  readonly scriptValue: unknown;
}

/** Why a reading was taken at the wrong seam; each names the field it reads. */
export type InvalidReason =
  | "whole-run-abort"
  | "control-not-parked"
  | "dispatch-before-control"
  | "control-not-issued"
  | "control-refused"
  | "control-not-routed-to-host"
  | "setup-drift"
  | "uncounted-sdk-start";

/** Which part of the safety oracle a valid reading breaks. */
export type Breach =
  | "sdk-started-after-skip"
  | "not-settled-skipped"
  | "script-received-a-value"
  | "original-started-after-retry"
  | "more-than-one-replacement"
  | "replacement-not-authorized";

export type ParkedVerdict =
  | { readonly kind: "invalid-experiment"; readonly reasons: readonly InvalidReason[] }
  | { readonly kind: "observed-violation"; readonly breaches: readonly Breach[] }
  | { readonly kind: "failed-reproduction" };

/** Where the target attempt's beforeDispatch stands: not yet entered, holding the host, or returned. */
type BarrierState = "waiting" | "parked" | "released";

/** Absolute and present, as the host requires; the fixture SDK never reads it. */
const CWD = fileURLToPath(new URL("../..", import.meta.url));

const HEAD = 'export const meta = { name: "parked-dispatch", description: "wb-9v02 parked beforeDispatch experiment" };\n';

/** Each startup's script returns the target row's value as the script received it. */
const SCRIPTS: Readonly<Record<ParkedStartup, string>> = {
  spawn: `${HEAD}return await agent("target");`,
  resume: `${HEAD}await agent("origin", { label: "origin" });\nreturn await agent("continue", { resume: "origin" });`,
};

/**
 * The row the control names, the agent id the runtime hands the host for it, and how many agents run before it. A
 * resumed call keeps its origin's agent id (runtime.ts), so the resumed row at index 1 is still wf-agent-0.
 */
const TARGETS: Readonly<Record<ParkedStartup, { readonly index: number; readonly agentId: string; readonly setup: number }>> = {
  spawn: { index: 0, agentId: "wf-agent-0", setup: 0 },
  resume: { index: 1, agentId: "wf-agent-0", setup: 1 },
};

/** A session the fixture store holds, for the resume path's lookup. */
function storedSession(sessionId: string): SDKSessionInfo {
  return { sessionId, summary: "parked-dispatch fixture session", lastModified: 0 };
}

/** Splits 1-based beforeDispatch ordinals into the attempts they belong to. */
function attemptCounts(ordinals: readonly number[], setup: number): AttemptCounts {
  const original = setup + 1;
  return {
    setup: ordinals.filter(ordinal => ordinal < original).length,
    original: ordinals.filter(ordinal => ordinal === original).length,
    replacement: ordinals.filter(ordinal => ordinal === original + 1).length,
    extra: ordinals.filter(ordinal => ordinal > original + 1).length,
  };
}

export async function runParkedDispatchExperiment(input: ParkedPlan): Promise<ParkedObservation> {
  const plan: Required<ParkedPlan> = { route: "per-agent", barrier: "parked", ...input };
  const target = TARGETS[plan.startup];
  const targetOrdinal = target.setup + 1;
  const run = new AbortController();
  const sdk = new FakeClaudeSdk({
    script: call => {
      // A resumed query reports the session it resumes, as the host requires.
      call.push(...sdkSuccess(call.options.resume ?? `sdk-parked-${call.index}`, `answer ${call.index}`));
      call.end();
    },
  });

  /** One ordinal per beforeDispatch entry, in order: 1, 2, ... */
  const authorized: number[] = [];
  /** For every query() the host made, the ordinal of the beforeDispatch entry that preceded it. */
  const starts: number[] = [];
  /** Every host settlement, with the ordinal current when it fired. */
  const settled: Array<{ readonly ordinal: number; readonly settlement: HostSettlement }> = [];
  let barrier: BarrierState = "waiting";
  // Read through a call, as runtime.ts reads `intent()`: the hooks below set it while this function is suspended at an
  // await, so control-flow narrowing across the awaits would be reasoning about a value that has since changed.
  const barrierState = (): BarrierState => barrier;
  let release = (): void => {};
  let markEntered = (): void => {};
  const entered = new Promise<void>(resolve => {
    markEntered = resolve;
  });
  let hostAbortsWhileParked = 0;

  const beforeDispatch = (): Promise<void> | undefined => {
    authorized.push(authorized.length + 1);
    if (authorized.length !== targetOrdinal) return undefined;
    if (plan.barrier === "absent") {
      barrier = "released";
      markEntered();
      return undefined;
    }
    barrier = "parked";
    markEntered();
    return new Promise<void>(resolve => {
      release = () => {
        barrier = "released";
        resolve();
      };
    });
  };
  const query: ClaudeQuery = params => {
    starts.push(authorized.length);
    return sdk.query(params);
  };
  const claude = createClaudeWorkflowHost({
    cwd: CWD,
    signal: run.signal,
    query,
    beforeDispatch,
    getSession: async sessionId => storedSession(sessionId),
    onSettled: result => {
      const settlement: HostSettlement = { ok: result.ok, skipped: result.skipped === true, ...(result.error !== undefined ? { error: result.error } : {}) };
      settled.push({ ordinal: authorized.length, settlement });
    },
  });
  const host: WorkflowHost = {
    ...claude,
    abortAgent(agentId) {
      if (agentId === target.agentId && barrier === "parked") hostAbortsWhileParked += 1;
      claude.abortAgent(agentId);
    },
  };

  let control: WorkflowControl | undefined;
  const outcome = runWorkflow({
    script: SCRIPTS[plan.startup],
    host,
    signal: run.signal,
    onControl: surface => {
      control = surface;
    },
  });
  // A run that settles before the target's beforeDispatch is entered leaves nothing parked; the reading says so.
  await Promise.race([entered, outcome]);
  const parkedAtControl = barrierState() === "parked";
  const queriesBeforeControl = starts.length;
  let controlAccepted: boolean | undefined;
  if (plan.control !== "none") {
    if (plan.route === "run-abort") run.abort();
    // The plan names the control: WorkflowControl's own method of that name, called on the run's surface.
    else controlAccepted = control?.[plan.control](target.index);
  }
  // The released attempt unwinds in microtasks, and runWorkflow resolves only once its worker thread is down, a later
  // turn: after a whole-run abort the parked attempt's own settlement is already recorded when the outcome arrives.
  release();
  const result = await outcome;

  const rows = result.progress.filter((entry): entry is WorkflowAgentEntry => entry.type === "workflow_agent" && entry.index === target.index);
  const last = rows.at(-1);
  return {
    plan,
    parkedAtControl,
    queriesBeforeControl,
    controlAccepted,
    hostAbortsWhileParked,
    runAborted: run.signal.aborted,
    authorizations: attemptCounts(authorized, target.setup),
    sdkStarts: attemptCounts(starts, target.setup),
    sdkCallsRecorded: sdk.calls.length,
    hostSettlements: settled.filter(entry => entry.ordinal >= targetOrdinal).map(entry => entry.settlement),
    finalRow:
      last === undefined
        ? undefined
        : { state: last.state, skipped: last.skipped === true, attempt: last.attempt ?? 1, reason: last.lastAttemptReason ?? null },
    runStatus: result.status,
    scriptValue: result.value,
  };
}

export function judgeParkedObservation(observation: ParkedObservation): ParkedVerdict {
  const { plan, sdkStarts, authorizations } = observation;
  const reasons: InvalidReason[] = [];
  if (plan.route !== "per-agent" || observation.runAborted) reasons.push("whole-run-abort");
  if (!observation.parkedAtControl) reasons.push("control-not-parked");
  if (observation.queriesBeforeControl !== sdkStarts.setup) reasons.push("dispatch-before-control");
  if (plan.control === "none" || observation.controlAccepted === undefined) reasons.push("control-not-issued");
  else if (!observation.controlAccepted) reasons.push("control-refused");
  if (observation.hostAbortsWhileParked === 0) reasons.push("control-not-routed-to-host");
  const setup = TARGETS[plan.startup].setup;
  if (sdkStarts.setup !== setup || authorizations.setup !== setup) reasons.push("setup-drift");
  if (sdkStarts.setup + sdkStarts.original + sdkStarts.replacement + sdkStarts.extra !== observation.sdkCallsRecorded) {
    reasons.push("uncounted-sdk-start");
  }
  if (reasons.length > 0) return { kind: "invalid-experiment", reasons };

  const breaches: Breach[] = [];
  if (plan.control === "skip") {
    if (sdkStarts.original + sdkStarts.replacement + sdkStarts.extra > 0) breaches.push("sdk-started-after-skip");
    if (observation.finalRow?.skipped !== true) breaches.push("not-settled-skipped");
    if (observation.scriptValue !== null) breaches.push("script-received-a-value");
  } else {
    if (sdkStarts.original > 0) breaches.push("original-started-after-retry");
    if (sdkStarts.replacement > 1 || sdkStarts.extra > 0) breaches.push("more-than-one-replacement");
    if (sdkStarts.replacement > authorizations.replacement) breaches.push("replacement-not-authorized");
  }
  return breaches.length > 0 ? { kind: "observed-violation", breaches } : { kind: "failed-reproduction" };
}
