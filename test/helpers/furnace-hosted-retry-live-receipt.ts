/**
 * wb-3hc (VC-7 / W18-D follow-up, owner Q1(c)): the LIVE furnace-hosted retry receipt -- pure judgement and receipt
 * shaping over what the live rows in test/workbench-furnace-hosted-real.test.ts (`forge run furnace-hosted-live`)
 * observed of a real Furnace Run in a disposable /tmp workspace. This module does no I/O and reads no clock, random
 * source or environment; the live rows hand it plain records, and test/workbench-furnace-hosted-retry-live-receipt.test.ts
 * drives it offline with a clean observation and one mutant per rule.
 *
 * Acceptance model (wb-3hc, re-worded of record 2026-10-17): a Run's sequential Attempts share one kept bridge
 * connection and resident session; per-Attempt identity is the admission receipt <instance_id>/<process token>/<n>; an
 * operator `work retry` is a NEW controller invocation, EXPECTED but not presumed to open a new connection and session,
 * so the receipt MEASURES which it was (retrySessionReading) and asserts neither shape; claim 1 is the fixture judge's
 * own admission-receipt-plus-roster rule (retryAdmissionProblems), shared, never copied. "Establishment exactly once per
 * Attempt" is read from Furnace's own records (attempt.created / attempt.started events per Attempt, executor_identity)
 * and corroborated by the adapter's admission receipts and sessions roster. The state change is read BOTH through the
 * owner session's own Observe answers and terminal frames (the bridge) AND through Furnace's records; a disagreement is
 * a named finding (observe-disagreement), never smoothed over.
 */
import { EXPECTED_LIMITS, retryAdmissionProblems, retrySessionReading } from "../../qa/workbench/furnace-hosted-retry-fault-receipt.mjs";
import type { HostedAttemptReceipt, HostedReceipt, HostedSessionReceipt } from "../../src/workbench/hosts/furnace-hosted.js";

export const RETRY_LIVE_RECEIPT_CONTRACT = "workbench.furnace-hosted-retry-live/v1";
export const RETRY_LIVE_TIER = "live";
/** The receipt line the live rows print producer-side (straight to stdout), never through console.log. */
export const RETRY_LIVE_LINE_MARKER = "FURNACE_HOSTED_RETRY_LIVE_RECEIPT";
export const RETRY_LIVE_TIER_STATEMENT =
  "LIVE tier: a real Furnace binary and bd in a disposable /tmp workspace with fixture formulas, its own bd store and Furnace state directory (wisp mode); the landed wb-zmd adapter over its real EmbeddedHost bridge on the SHIPPED vendored @furnace/sdk; the operator's `attempt stop`, `run resume` and `work retry` issued through that SDK's client (argv.d.ts attemptStop / runResume / workRetry); Furnace run status, attempt records and events read back. Never the owner bead store, the rig or a candidate worktree; no furnace doctor, no capability probe, no --persistent. Not the FIXTURE receipt (workbench.furnace-hosted-retry-fault/v1, wb-0kg.4), whose scripted operator proves only that an observer gains no control.";
/** Measured semantic violations, in the order assessRetryLive reports them. */
export const RETRY_LIVE_FINDING_RULES = Object.freeze([
  "retry-session-reused",
  "establishment-not-exactly-once",
  "retry-not-operator-originated",
  "retry-not-settled",
  "uncertain-not-parked",
  "uncertain-reported-success",
  "observe-disagreement",
  "state-change-unseen",
  "observer-gained-control",
  "observe-faked",
  "identity-violation",
  "limits-misstated",
  "furnace-retry-premise",
  "parked-start-misreported",
  "operator-retry-unreachable",
  "uncommitted-tree",
] as const);
export type RetryLiveRule = (typeof RETRY_LIVE_FINDING_RULES)[number];
/** Steps whose absence makes the measurement "not realised": a gap, never a finding and never a pass. */
export const RETRY_LIVE_UNREALISED_STEPS = Object.freeze(["operator-retry", "uncertain-park", "bridge-observe", "observer", "furnace-events"] as const);
export type RetryLiveStep = (typeof RETRY_LIVE_UNREALISED_STEPS)[number];
/** What this receipt does not show, stated on every receipt. */
export const RETRY_LIVE_NON_CLAIMS = Object.freeze([
  "The owner session's Observe answers and terminal frames are read through a tap on the shipped ResidentSession (a subclass handed to the adapter as FurnaceHostedOptions.sdk) that records the frames the session reads and writes and changes none of them.",
  "No crash durability is measured or claimed: controller or Pi death leaves running Attempts needing operator recovery (limits.crashDurability 'none').",
  "One measurement on one Furnace build in one disposable /tmp workspace: the retry's session reading (new or kept) is recorded for this run and is no guarantee for another build, load or driver.",
  "The operator path exercised is the shipped SDK's Attempts.stop, Runs.resume and Work.retry (argv.d.ts attemptStop: `attempt stop <attempt> --json`; runResume: `run resume <run> --json`, default mode, issued for the parked Run before its retry because Furnace admits `work retry` only on an active Run; workRetry: `work retry <work> --run <run> --json`); no other retry path is driven.",
  "Transport success is not domain verification: a work_retry reply says Furnace accepted the retry; the outcome is read from Furnace's own attempt records and events.",
  "The observer is one non-owner bridge connection and Furnace read verbs: it shows that this observer gained no control and that the state change is readable without ownership, not that every possible client is refused.",
]);

export interface FurnaceAttemptRecord {
  readonly attemptId: string;
  readonly ordinal: number;
  readonly workId: string;
  /** Furnace's Attempt state (running, cancelled, succeeded, failed, needs_reconciliation, ...). */
  readonly state: string;
  readonly outcome: string | null;
  /** The controller session that created the Attempt. */
  readonly controllerSessionId: string;
  /** executor_identity as Furnace persisted it, or null when it recorded none. */
  readonly identity: { readonly hostInstanceId: string; readonly receipt: string; readonly executionId: string } | null;
  readonly cancel: { readonly reason: string; readonly requestedAt: string | null; readonly terminalObservedAt: string | null } | null;
  readonly finishedAt: string | null;
}
export interface FurnaceEventRecord {
  /** Furnace numbers events per controller session, so ordering is never read across sessions from this field. */
  readonly sequence: number;
  readonly type: string;
  readonly attemptId: string | null;
  readonly controllerSessionId: string;
  readonly requestId: string;
  /** controller.started only: the command that started the controller ("run start", "work retry", ...). */
  readonly source: string | null;
  /** controller.stopped only: why it stopped. */
  readonly cause: string | null;
  readonly timestamp: string;
}
/** One frame the owner bridge session wrote: an Observe answer (correlated to its request) or an Attempt's terminal. */
export interface BridgeReading {
  readonly session: string;
  readonly executionId: string;
  readonly kind: "observe" | "terminal";
  readonly status: string;
  readonly at: string;
}
/** A non-owner's reading of Furnace's attempt records. */
export interface FurnaceReading {
  readonly at: string;
  readonly attemptId: string;
  readonly state: string;
  readonly cancelRequested: boolean;
}
export type BridgeReply = Readonly<Record<string, unknown>>;
export interface ObserverRecord {
  readonly cancelRequestId: string;
  readonly observeRequestId: string;
  /** The observer connection's own Cancel and Observe replies for the owner's execution (null when not taken). */
  readonly cancelReply: BridgeReply | null;
  readonly observeReply: BridgeReply | null;
  /** True when the owner's workflow saw its abort signal before the operator's stop was issued. */
  readonly ownerAbortedBeforeStop: boolean;
  readonly readings: readonly FurnaceReading[];
}
/** Scenario 1: the uncertain Attempt is stopped by the operator, then retried by the operator through `work retry`. */
export interface OperatorRetryObservation {
  readonly start: { readonly resolved: boolean; readonly error: string | null };
  readonly stop: { readonly kind: string | null; readonly requestId: string | null };
  /** The operator's work retry: its reply kind, and the verb argv the SDK builds for it (argv.workRetry, global options left out). */
  readonly retry: { readonly kind: string | null; readonly ok: boolean; readonly code: string | null; readonly argv: readonly string[] };
  readonly receipt: HostedReceipt | null;
  readonly receiptAfterClose: HostedReceipt | null;
  /** The workflow's establishment markers: the Attempt ids it was entered for, in order. */
  readonly markers: readonly string[];
  readonly runStateAfterRetry: string | null;
  readonly furnaceAttempts: readonly FurnaceAttemptRecord[];
  readonly events: readonly FurnaceEventRecord[];
  /** False when Furnace's event page was incomplete; event-based rules are then not judged. */
  readonly eventsComplete: boolean;
  readonly bridge: readonly BridgeReading[];
  readonly observer: ObserverRecord;
}
/** Scenario 2: the first Attempt settles indeterminate, Furnace parks it, and the operator tries `work retry`. */
export interface UncertainParkObservation {
  readonly start: { readonly resolved: boolean; readonly error: string | null; readonly category: string | null };
  readonly receipt: HostedReceipt | null;
  readonly markers: readonly string[];
  /** The Run Furnace recorded in the scenario's own state directory, whatever the adapter reported. */
  readonly runId: string | null;
  readonly runState: string | null;
  /** The Attempt ids Furnace's run status lists for attention. */
  readonly attention: readonly string[];
  readonly furnaceAttempts: readonly FurnaceAttemptRecord[];
  readonly events: readonly FurnaceEventRecord[];
  readonly eventsComplete: boolean;
  readonly bridge: readonly BridgeReading[];
  /**
   * The operator's `run resume <run>` (default mode) before the retry (wb-0m7): Furnace 0.1.0 admits `work retry` only on an
   * active Run, and a parked Run's exit is that resume, which reconciles, re-enables scheduling and starts nothing. Whether
   * it was issued, whether it succeeded, its error code when it did not, and the Run state its reply reported.
   */
  readonly resume: { readonly attempted: boolean; readonly ok: boolean; readonly code: string | null; readonly state: string | null };
  readonly retry: { readonly attempted: boolean; readonly ok: boolean; readonly code: string | null; readonly kind: string | null };
  readonly attemptsAfterRetry: number | null;
}
export interface RetryLiveObserved {
  readonly operatorRetry: OperatorRetryObservation | null;
  readonly uncertainPark: UncertainParkObservation | null;
}
export interface RetryLiveFinding {
  readonly rule: RetryLiveRule;
  readonly detail: string;
}
export interface RetryLiveGap {
  readonly step: RetryLiveStep;
  readonly detail: string;
}
export interface RetryLiveMeasured {
  /** Whether the operator retry ran in the uncertain Attempt's kept session or a new one: measured, never asserted. */
  readonly retrySession: "kept" | "new" | "unknown";
  readonly firstSession: string | null;
  readonly retrySessionInstance: string | null;
  readonly firstReceipt: string | null;
  readonly retryReceipt: string | null;
  /** Whether the owner session's own answers and Furnace's records agree for the retry scenario. */
  readonly observeAgreement: "agree" | "disagree" | "not-read";
  readonly bridgeObserveAnswers: readonly string[];
  /** Whether the adapter reported the Run Furnace parked. */
  readonly parkedRunReport: "reported" | "misreported" | "not-measured";
  /** Whether the operator's work retry reached the parked Run's executor. */
  readonly parkRetry: "reached" | "unreachable" | "not-measured";
}
export interface RetryLiveAssessment {
  readonly findings: readonly RetryLiveFinding[];
  readonly unrealised: readonly RetryLiveGap[];
  readonly realised: boolean;
  readonly measured: RetryLiveMeasured;
}
export interface RetryLiveInput {
  readonly utc: string;
  /** The full sha of the COMMITTED tree the live rows ran from. */
  readonly revision: string;
  readonly dirty: boolean;
  readonly node: string;
  readonly furnace: { readonly version: string; readonly protocolVersion: number; readonly binaryRevision: string; readonly binaryDigest: string };
  readonly bd: string;
  readonly sdk: string;
  readonly observed: RetryLiveObserved;
}
export type RetryLiveTruthLabel = "LIVE pass" | "LIVE with findings" | "LIVE not realised";
export interface RetryLiveReceipt {
  readonly contract: typeof RETRY_LIVE_RECEIPT_CONTRACT;
  readonly tier: typeof RETRY_LIVE_TIER;
  readonly tierStatement: string;
  readonly truthLabel: RetryLiveTruthLabel;
  readonly utc: string;
  readonly revision: string;
  readonly dirty: boolean;
  readonly node: string;
  readonly furnace: RetryLiveInput["furnace"];
  readonly bd: string;
  readonly sdk: string;
  readonly nonClaims: readonly string[];
  readonly measured: RetryLiveMeasured;
  readonly scenarios: RetryLiveObserved;
  readonly findings: readonly RetryLiveFinding[];
  readonly unrealised: readonly RetryLiveGap[];
  readonly realised: boolean;
  readonly pass: boolean;
}

const FULL_SHA = /^[0-9a-f]{40}$/;
/** The Furnace Attempt state each owner-session terminal status corresponds to. */
const FURNACE_STATE_OF: Readonly<Record<string, string>> = { success: "succeeded", failure: "failed", cancelled: "cancelled", indeterminate: "needs_reconciliation" };

/** Is `reply` exactly {protocol_version: 1, op, request_id, output: {status}}: nothing echoed beside the status? */
function replyIs(reply: BridgeReply | null, op: string, requestId: string, status: string): boolean {
  if (reply === null || reply.op !== op || reply.request_id !== requestId || reply.protocol_version !== 1) return false;
  if (Object.keys(reply).sort().join(",") !== "op,output,protocol_version,request_id") return false;
  const output = reply.output;
  if (typeof output !== "object" || output === null || Array.isArray(output)) return false;
  return Object.keys(output).join(",") === "status" && (output as Record<string, unknown>).status === status;
}

/** Milliseconds since the epoch for an RFC 3339 stamp (nanosecond fractions truncate to the millisecond), or NaN. */
const instant = (stamp: string | null | undefined): number => (typeof stamp === "string" ? Date.parse(stamp) : Number.NaN);

/** The moment Furnace observed an Attempt's terminal: its cancel record's terminal observation, else its finish. */
function terminalSeenAt(row: FurnaceAttemptRecord): number {
  const observed = instant(row.cancel?.terminalObservedAt);
  return Number.isNaN(observed) ? instant(row.finishedAt) : observed;
}

const attemptsOf = (receipt: HostedReceipt | null): readonly HostedAttemptReceipt[] => receipt?.attempts ?? [];
const sessionsOf = (receipt: HostedReceipt | null): readonly HostedSessionReceipt[] => receipt?.sessions ?? [];

/** The `source` of each controller session's controller.started event. */
function controllerSources(events: readonly FurnaceEventRecord[]): Map<string, string | null> {
  const sources = new Map<string, string | null>();
  for (const row of events) if (row.type === "controller.started") sources.set(row.controllerSessionId, row.source);
  return sources;
}

interface Scenario {
  readonly name: "operatorRetry" | "uncertainPark";
  readonly receipts: ReadonlyArray<readonly [string, HostedReceipt | null]>;
  readonly markers: readonly string[];
  readonly furnaceAttempts: readonly FurnaceAttemptRecord[];
  readonly events: readonly FurnaceEventRecord[];
  readonly eventsComplete: boolean;
  readonly bridge: readonly BridgeReading[];
  /** How many `work retry` controllers the operator started in the observed window. */
  readonly operatorRetries: number;
}

/** Claims shared by both scenarios: limits, identity violations, establishment exactly once, operator-only origin, agreement. */
function judgeCommon(scenario: Scenario, add: (rule: RetryLiveRule, detail: string) => void): void {
  const { name } = scenario;
  for (const [phase, receipt] of scenario.receipts) {
    if (receipt === null) continue;
    const limits: Readonly<Record<string, string>> = receipt.limits;
    if (limits.retry !== EXPECTED_LIMITS.retry) add("furnace-retry-premise", `${name} ${phase}: limits.retry is ${limits.retry}, not ${EXPECTED_LIMITS.retry}.`);
    for (const key of ["crashDurability", "observe", "identity", "replyBounds"] as const) {
      if (limits[key] !== EXPECTED_LIMITS[key]) add("limits-misstated", `${name} ${phase}: limits.${key} is ${limits[key]}, not ${EXPECTED_LIMITS[key]}.`);
    }
    if (receipt.identityViolations.length > 0) add("identity-violation", `${name} ${phase}: ${receipt.identityViolations.join("; ")}`);
  }

  // Establishment exactly once per Attempt: the workflow's markers, Furnace's own created/started events, and the
  // executor_identity Furnace persisted, corroborated by the adapter's admission receipt and its sessions roster.
  const [, primary] = scenario.receipts[0] ?? ["", null];
  const adapterRows = attemptsOf(primary);
  const roster = sessionsOf(primary);
  const furnaceIds = scenario.furnaceAttempts.map((row) => row.attemptId);
  for (const row of scenario.furnaceAttempts) {
    const markers = scenario.markers.filter((marker) => marker === row.attemptId).length;
    if (markers !== 1) add("establishment-not-exactly-once", `${name}: ${row.attemptId} has ${markers} establishment markers; exactly one per Attempt.`);
    if (scenario.eventsComplete) {
      for (const type of ["attempt.created", "attempt.started"]) {
        const n = scenario.events.filter((event) => event.type === type && event.attemptId === row.attemptId).length;
        if (n !== 1) add("establishment-not-exactly-once", `${name}: Furnace recorded ${n} ${type} events for ${row.attemptId}; exactly one per Attempt.`);
      }
    }
    const adapter = adapterRows.find((candidate) => candidate.attemptId === row.attemptId);
    if (row.identity === null) {
      add("establishment-not-exactly-once", `${name}: Furnace persisted no executor_identity for ${row.attemptId}.`);
    } else if (!adapter) {
      add("establishment-not-exactly-once", `${name}: the adapter receipt has no row for ${row.attemptId}, which Furnace established on ${row.identity.receipt}.`);
    } else if (row.identity.hostInstanceId !== adapter.sessionInstanceId || row.identity.receipt !== adapter.admissionReceipt || row.identity.executionId !== adapter.executionId) {
      add(
        "establishment-not-exactly-once",
        `${name}: Furnace's executor_identity for ${row.attemptId} (${row.identity.hostInstanceId}, ${row.identity.receipt}, ${row.identity.executionId}) is not the adapter's admission (${adapter.sessionInstanceId}, ${adapter.admissionReceipt}, ${adapter.executionId}).`,
      );
    } else {
      const holders = roster.filter((session) => session.admissionReceipts.includes(adapter.admissionReceipt));
      if (holders.length !== 1 || holders[0]?.sessionInstanceId !== adapter.sessionInstanceId) {
        add("establishment-not-exactly-once", `${name}: the sessions roster does not list ${adapter.admissionReceipt} exactly once under ${adapter.sessionInstanceId}.`);
      }
    }
  }
  for (const marker of scenario.markers) {
    if (!furnaceIds.includes(marker)) add("establishment-not-exactly-once", `${name}: an establishment marker for ${marker}, an Attempt Furnace does not record.`);
  }
  for (const row of adapterRows) {
    if (!furnaceIds.includes(row.attemptId)) add("establishment-not-exactly-once", `${name}: the adapter admitted ${row.attemptId}, an Attempt Furnace does not record.`);
  }

  // No retry originates anywhere but the operator path: the first Attempt comes from the `run start` controller, and
  // every later Attempt from a `work retry` controller the operator started.
  if (scenario.eventsComplete) {
    const sources = controllerSources(scenario.events);
    for (const event of scenario.events) {
      if (event.type !== "attempt.created" || event.attemptId === null) continue;
      const source = sources.get(event.controllerSessionId) ?? null;
      const row = scenario.furnaceAttempts.find((candidate) => candidate.attemptId === event.attemptId);
      const first = row?.ordinal === 1;
      if (!(first && source === "run start") && source !== "work retry") {
        add("retry-not-operator-originated", `${name}: ${event.attemptId} (ordinal ${row?.ordinal ?? "unknown"}) was created by controller ${event.controllerSessionId}, started by ${source ?? "no recorded command"}; only the run start may create the first Attempt and only an operator work retry a later one.`);
      }
      if (row && row.controllerSessionId !== event.controllerSessionId) {
        add("retry-not-operator-originated", `${name}: ${event.attemptId} names controller ${row.controllerSessionId} but was created by ${event.controllerSessionId}.`);
      }
    }
    const retryControllers = [...sources.values()].filter((source) => source === "work retry").length;
    if (retryControllers > scenario.operatorRetries) add("retry-not-operator-originated", `${name}: ${retryControllers} work retry controllers ran, the operator issued ${scenario.operatorRetries}.`);
  }

  // The bridge's own answers against Furnace's record of the same execution.
  for (const reading of scenario.bridge) {
    const adapter = adapterRows.find((row) => row.executionId === reading.executionId);
    const furnace = scenario.furnaceAttempts.find((row) => row.identity?.executionId === reading.executionId || (adapter !== undefined && row.attemptId === adapter.attemptId));
    if (!adapter || !furnace) {
      add("observe-disagreement", `${name}: the owner session answered ${reading.kind} ${reading.status} for ${reading.executionId}, an execution the adapter or Furnace does not record.`);
      continue;
    }
    if (reading.session !== adapter.sessionInstanceId) add("observe-disagreement", `${name}: session ${reading.session} answered for ${reading.executionId}, which session ${adapter.sessionInstanceId} admitted.`);
    if (reading.kind === "observe") {
      if (reading.status === "unknown") add("observe-disagreement", `${name}: the owner session answered Observe unknown for its own admission ${adapter.admissionReceipt} (${furnace.attemptId}).`);
      const seen = terminalSeenAt(furnace);
      if (reading.status === "running" && instant(reading.at) > seen) {
        add("observe-disagreement", `${name}: the owner session answered running for ${furnace.attemptId} at ${reading.at}, after Furnace observed its terminal (${furnace.cancel?.terminalObservedAt ?? furnace.finishedAt}).`);
      }
    } else if (FURNACE_STATE_OF[reading.status] !== furnace.state) {
      add("observe-disagreement", `${name}: the owner session's terminal for ${furnace.attemptId} was ${reading.status}; Furnace records ${furnace.state}.`);
    }
  }
  for (const row of scenario.furnaceAttempts) {
    if (row.finishedAt === null) continue;
    const executionId = row.identity?.executionId ?? adapterRows.find((candidate) => candidate.attemptId === row.attemptId)?.executionId;
    if (!scenario.bridge.some((reading) => reading.kind === "terminal" && reading.executionId === executionId)) {
      add("observe-disagreement", `${name}: Furnace records ${row.attemptId} finished (${row.state}) but no terminal frame of the owner session was read for it.`);
    }
  }
}

function judgeOperatorRetry(observed: OperatorRetryObservation, add: (rule: RetryLiveRule, detail: string) => void): void {
  const name = "operatorRetry";
  judgeCommon(
    {
      name,
      receipts: [
        ["before close", observed.receipt],
        ["after close", observed.receiptAfterClose],
      ],
      markers: observed.markers,
      furnaceAttempts: observed.furnaceAttempts,
      events: observed.events,
      eventsComplete: observed.eventsComplete,
      bridge: observed.bridge,
      operatorRetries: 1,
    },
    add,
  );
  for (const [phase, receipt] of [
    ["before close", observed.receipt],
    ["after close", observed.receiptAfterClose],
  ] as const) {
    const [first, retry] = attemptsOf(receipt);
    if (!first || !retry) continue;
    const problems = retryAdmissionProblems(first, retry, receipt?.sessions);
    if (problems.length > 0) add("retry-session-reused", `${name} ${phase}: ${problems.join(" ")}`);
  }
  const [first, retry] = attemptsOf(observed.receipt);
  const [, retryAfter] = attemptsOf(observed.receiptAfterClose);
  const furnaceFirst = observed.furnaceAttempts.find((row) => row.attemptId === first?.attemptId);
  const furnaceRetry = observed.furnaceAttempts.find((row) => row.attemptId === retry?.attemptId);
  if (!retry || retry.terminal !== "success" || retryAfter?.terminal !== "success" || furnaceRetry?.state !== "succeeded") {
    add("retry-not-settled", `${name}: the operator retry ${retry?.attemptId ?? "(none)"} must reach its own success (before close ${retry?.terminal}, after close ${retryAfter?.terminal}, Furnace ${furnaceRetry?.state}).`);
  }
  // The uncertain Attempt ends by the operator's stop (cancelled), and nobody reads it as success.
  if (first && (first.terminal !== "cancelled" || furnaceFirst?.state !== "cancelled")) {
    add("uncertain-not-parked", `${name}: the uncertain ${first.attemptId} must end cancelled by the operator's stop (adapter ${first.terminal}, Furnace ${furnaceFirst?.state}).`);
  }
  const firstTerminals = observed.bridge.filter((reading) => reading.kind === "terminal" && reading.executionId === first?.executionId).map((reading) => reading.status);
  if (first && (first.terminal === "success" || attemptsOf(observed.receiptAfterClose)[0]?.terminal === "success" || furnaceFirst?.state === "succeeded" || firstTerminals.includes("success"))) {
    add("uncertain-reported-success", `${name}: the uncertain ${first.attemptId} was reported success (adapter ${first.terminal}, Furnace ${furnaceFirst?.state}, bridge ${firstTerminals.join("/") || "none"}).`);
  }

  // A non-owner reads the state change through Furnace's records: running, then cancelled, then the retry's success.
  const readings = observed.observer.readings;
  if (first && !readings.some((row) => row.attemptId === first.attemptId && row.state === "running")) add("state-change-unseen", `${name}: no observer reading saw ${first.attemptId} running.`);
  if (first && !readings.some((row) => row.attemptId === first.attemptId && row.state === "cancelled" && row.cancelRequested)) add("state-change-unseen", `${name}: no observer reading saw ${first.attemptId} cancelled by the stop.`);
  if (retry && !readings.some((row) => row.attemptId === retry.attemptId && row.state === "succeeded")) add("state-change-unseen", `${name}: no observer reading saw the retry ${retry.attemptId} succeed.`);

  // The observer gains no control: its own Cancel is unknown_execution, the owner was not aborted before the
  // operator's stop, Furnace recorded no cancel request but the operator's, and the stop is what ended the Attempt.
  const observer = observed.observer;
  if (observer.cancelReply !== null && !replyIs(observer.cancelReply, "cancel", observer.cancelRequestId, "unknown_execution")) {
    add("observer-gained-control", `${name}: the observer's cancel reply was not exactly unknown_execution (${JSON.stringify(observer.cancelReply)}).`);
  }
  if (observer.ownerAbortedBeforeStop) add("observer-gained-control", `${name}: the owner's workflow saw its abort before the operator's stop was issued.`);
  if (observed.eventsComplete) {
    for (const event of observed.events) {
      if (event.type === "attempt.cancel_requested" && event.requestId !== observed.stop.requestId) {
        add("observer-gained-control", `${name}: Furnace recorded a cancel request for ${event.attemptId} under ${event.requestId}, not the operator's stop ${observed.stop.requestId}.`);
      }
    }
  }
  if (furnaceFirst?.cancel && furnaceFirst.cancel.reason !== "operator_stop") add("observer-gained-control", `${name}: ${furnaceFirst.attemptId} was cancelled for ${furnaceFirst.cancel.reason}, not the operator's stop.`);
  if (observer.observeReply !== null && !replyIs(observer.observeReply, "observe", observer.observeRequestId, "unknown")) {
    add("observe-faked", `${name}: the observer's Observe reply was not exactly the session's own unknown answer (${JSON.stringify(observer.observeReply)}).`);
  }
}

function judgeUncertainPark(observed: UncertainParkObservation, add: (rule: RetryLiveRule, detail: string) => void): void {
  const name = "uncertainPark";
  judgeCommon(
    {
      name,
      receipts: [["at park", observed.receipt]],
      markers: observed.markers,
      furnaceAttempts: observed.furnaceAttempts,
      events: observed.events,
      eventsComplete: observed.eventsComplete,
      bridge: observed.bridge,
      operatorRetries: 0,
    },
    add,
  );
  const [first] = attemptsOf(observed.receipt);
  const parked = observed.furnaceAttempts[0];
  if (!parked || parked.state !== "needs_reconciliation") add("uncertain-not-parked", `${name}: Furnace did not park the indeterminate Attempt (state ${parked?.state}).`);
  if (observed.runState !== "needs_attention") add("uncertain-not-parked", `${name}: the Run is ${observed.runState}, not needs_attention.`);
  if (parked && !observed.attention.includes(parked.attemptId)) add("uncertain-not-parked", `${name}: Furnace's run status does not list ${parked.attemptId} for attention.`);
  if (parked && observed.eventsComplete && !observed.events.some((event) => event.type === "attempt.needs_reconciliation" && event.attemptId === parked.attemptId)) {
    add("uncertain-not-parked", `${name}: no attempt.needs_reconciliation event for ${parked.attemptId}.`);
  }
  if (observed.furnaceAttempts.length !== 1) add("uncertain-not-parked", `${name}: ${observed.furnaceAttempts.length} Attempts exist while the first should be parked awaiting the operator.`);
  const terminals = observed.bridge.filter((reading) => reading.kind === "terminal").map((reading) => reading.status);
  if (first?.terminal === "success" || parked?.state === "succeeded" || terminals.includes("success")) {
    add("uncertain-reported-success", `${name}: the indeterminate Attempt was reported success (adapter ${first?.terminal}, Furnace ${parked?.state}, bridge ${terminals.join("/") || "none"}).`);
  }
  // The adapter's report of the parked start (wb-3hc F1): a Run Furnace parked must stay reported.
  const reported = observed.receipt?.run;
  if (observed.runId !== null && (!reported || reported.runId !== observed.runId)) {
    add(
      "parked-start-misreported",
      `${name}: Furnace parked Run ${observed.runId} (${observed.runState}) but the adapter ${reported ? `reports Run ${reported.runId}` : "reports no Run"} (start ${observed.start.resolved ? "resolved" : `rejected: ${observed.start.error}`}; receipt state ${observed.receipt?.state}).`,
    );
  }
  if (observed.retry.attempted && !observed.retry.ok && observed.receipt?.state !== "started") {
    add("operator-retry-unreachable", `${name}: the operator's work retry for the parked Run failed (${observed.retry.code}) after the adapter released its host (receipt state ${observed.receipt?.state}).`);
  }
}

function gapsOf(observed: RetryLiveObserved): RetryLiveGap[] {
  const gaps: RetryLiveGap[] = [];
  const retry = observed.operatorRetry;
  if (retry === null) gaps.push({ step: "operator-retry", detail: "the operator-retry scenario was not observed." });
  else {
    if (!retry.start.resolved) gaps.push({ step: "operator-retry", detail: `the Run did not start (${retry.start.error}).` });
    if (retry.stop.kind !== "attempt_stop") gaps.push({ step: "operator-retry", detail: `the operator's attempt stop was not answered (${retry.stop.kind}).` });
    if (!retry.retry.ok || retry.retry.kind !== "work_retry") gaps.push({ step: "operator-retry", detail: `the operator's work retry did not complete (${retry.retry.kind ?? retry.retry.code}).` });
    if (!retry.bridge.some((reading) => reading.kind === "observe")) gaps.push({ step: "bridge-observe", detail: "no Observe answer of the owner session was read." });
    if (retry.observer.cancelReply === null || retry.observer.observeReply === null) gaps.push({ step: "observer", detail: "the observer's cancel or Observe reply was not read." });
    if (!retry.eventsComplete) gaps.push({ step: "furnace-events", detail: "operatorRetry: Furnace's event page was incomplete." });
  }
  const park = observed.uncertainPark;
  if (park === null) gaps.push({ step: "uncertain-park", detail: "the uncertain-park scenario was not observed." });
  else {
    if (park.runId === null) gaps.push({ step: "uncertain-park", detail: `Furnace recorded no Run for the scenario (start ${park.start.error ?? "resolved"}).` });
    if (!park.retry.attempted) gaps.push({ step: "uncertain-park", detail: "the operator's work retry for the parked Run was not attempted." });
    else if (!park.retry.ok && park.receipt?.state === "started") gaps.push({ step: "uncertain-park", detail: `the operator's work retry failed (${park.retry.code}) while the adapter still held its host.` });
    if (!park.eventsComplete) gaps.push({ step: "furnace-events", detail: "uncertainPark: Furnace's event page was incomplete." });
  }
  return gaps;
}

function measure(observed: RetryLiveObserved, findings: readonly RetryLiveFinding[]): RetryLiveMeasured {
  const retry = observed.operatorRetry;
  const [first, second] = attemptsOf(retry?.receipt ?? null);
  const observeAnswers = retry?.bridge.filter((reading) => reading.kind === "observe").map((reading) => reading.status) ?? [];
  const park = observed.uncertainPark;
  return {
    retrySession: first && second ? retrySessionReading(first, second) : "unknown",
    firstSession: first?.sessionInstanceId ?? null,
    retrySessionInstance: second?.sessionInstanceId ?? null,
    firstReceipt: first?.admissionReceipt ?? null,
    retryReceipt: second?.admissionReceipt ?? null,
    observeAgreement: retry === null || observeAnswers.length === 0 ? "not-read" : findings.some((finding) => finding.rule === "observe-disagreement" && finding.detail.startsWith("operatorRetry")) ? "disagree" : "agree",
    bridgeObserveAnswers: observeAnswers,
    parkedRunReport: park === null || park.runId === null ? "not-measured" : findings.some((finding) => finding.rule === "parked-start-misreported") ? "misreported" : "reported",
    parkRetry: park === null || !park.retry.attempted ? "not-measured" : park.retry.ok ? "reached" : "unreachable",
  };
}

/** Findings in roster order (stable within a rule), so a receipt reads the same for the same observation. */
function ordered(findings: readonly RetryLiveFinding[]): RetryLiveFinding[] {
  return findings
    .map((finding, index) => ({ finding, index }))
    .sort((a, b) => RETRY_LIVE_FINDING_RULES.indexOf(a.finding.rule) - RETRY_LIVE_FINDING_RULES.indexOf(b.finding.rule) || a.index - b.index)
    .map(({ finding }) => finding);
}

/**
 * Judge both scenarios. A scenario whose own core step is missing (no observation, no Run, no completed operator verb)
 * is not judged and is reported unrealised; a missing Observe answer, observer reply or complete event page is
 * unrealised too, and the rules that need it are skipped. Unrealised never produces a pass and never a finding.
 */
export function assessRetryLive(observed: RetryLiveObserved): RetryLiveAssessment {
  const found: RetryLiveFinding[] = [];
  const add = (rule: RetryLiveRule, detail: string): void => void found.push({ rule, detail });
  const unrealised = gapsOf(observed);
  const blocked = (step: RetryLiveStep): boolean => unrealised.some((gap) => gap.step === step);
  if (observed.operatorRetry !== null && !blocked("operator-retry")) judgeOperatorRetry(observed.operatorRetry, add);
  if (observed.uncertainPark !== null && !blocked("uncertain-park")) judgeUncertainPark(observed.uncertainPark, add);
  const findings = ordered(found);
  return { findings, unrealised, realised: unrealised.length === 0, measured: measure(observed, findings) };
}

function requiredText(input: RetryLiveInput, field: "utc" | "node" | "bd" | "sdk"): string {
  const value = input[field];
  if (typeof value !== "string" || value.length === 0) throw new Error(`buildRetryLiveReceipt: ${field} is required.`);
  return value;
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

/** The honest one-line label: LIVE pass only when realised with no finding. */
export function truthLabelOf(receipt: Pick<RetryLiveReceipt, "realised" | "findings">): RetryLiveTruthLabel {
  if (!receipt.realised) return "LIVE not realised";
  return receipt.findings.length === 0 ? "LIVE pass" : "LIVE with findings";
}

/** Frozen evidence-grade LIVE receipt bound to the committed revision the live rows ran from. */
export function buildRetryLiveReceipt(input: RetryLiveInput): RetryLiveReceipt {
  const utc = requiredText(input, "utc");
  const node = requiredText(input, "node");
  const bd = requiredText(input, "bd");
  const sdk = requiredText(input, "sdk");
  if (typeof input.revision !== "string" || !FULL_SHA.test(input.revision)) throw new Error(`buildRetryLiveReceipt: revision must be a full 40-hex commit sha (${JSON.stringify(input.revision)}).`);
  const assessed = assessRetryLive(input.observed);
  const findings = input.dirty ? [...assessed.findings, { rule: "uncommitted-tree" as const, detail: `the live rows ran from a tree with uncommitted changes on ${input.revision}.` }] : [...assessed.findings];
  const realised = assessed.realised;
  return deepFreeze(
    structuredClone({
      contract: RETRY_LIVE_RECEIPT_CONTRACT,
      tier: RETRY_LIVE_TIER,
      tierStatement: RETRY_LIVE_TIER_STATEMENT,
      truthLabel: truthLabelOf({ realised, findings }),
      utc,
      revision: input.revision,
      dirty: input.dirty,
      node,
      furnace: { ...input.furnace },
      bd,
      sdk,
      nonClaims: [...RETRY_LIVE_NON_CLAIMS],
      measured: assessed.measured,
      scenarios: input.observed,
      findings,
      unrealised: assessed.unrealised,
      realised,
      pass: realised && findings.length === 0,
    }),
  );
}
