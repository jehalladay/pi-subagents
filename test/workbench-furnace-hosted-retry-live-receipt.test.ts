/**
 * wb-3hc (VC-7 / W18-D follow-up): offline judge for the LIVE furnace-hosted retry receipt, in the default gate.
 *
 * The live rows (test/workbench-furnace-hosted-real.test.ts, `forge run furnace-hosted-live`) measure a real Furnace Run
 * in a disposable /tmp workspace; this suite drives the pure judge they hand their observations to, with a clean observed
 * fixture shaped like that measurement and one mutant per rule, so a judge that reported a constant fails here.
 *
 * Spec lines pinned (wb-3hc, acceptance re-worded of record 2026-10-17):
 *  - "a real Furnace Run with an operator `work retry` (argv.d.ts-cited), proving from Furnace run status/events that
 *    establishment happens exactly once per Attempt and that no retry originates anywhere but the operator path"
 *  - "per-scenario outcomes (attempt ids, admission receipts and session instance ids, terminals, marker counts, identity
 *    violations, cancel/observe replies) bound to the committed revision; receipt labelled LIVE (never conflated with the
 *    fixture receipt)"
 *  - "the state change is read BOTH through the bridge's own Observe answer AND through Furnace run status/events, and
 *    the receipt records that the two readings agree (or names the disagreement as a finding)"
 *  - "An operator work retry is a NEW controller invocation ... EXPECTED but NOT YET MEASURED to open a new bridge
 *    connection and session: ... the receipt must record which it was ... without asserting either in advance"
 *  - "'Establishment exactly once per Attempt' is proven from Furnace's own records (attempt ids and executor_identity rows
 *    in run status/attempt inspect) and corroborated by the admission receipts the session roster records."
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { RETRY_FAULT_RECEIPT_CONTRACT, RETRY_FAULT_TIER } from "../qa/workbench/furnace-hosted-retry-fault-receipt.mjs";
import {
  assessRetryLive,
  buildRetryLiveReceipt,
  type FurnaceAttemptRecord,
  type FurnaceEventRecord,
  type OperatorRetryObservation,
  RETRY_LIVE_FINDING_RULES,
  RETRY_LIVE_LINE_MARKER,
  RETRY_LIVE_NON_CLAIMS,
  RETRY_LIVE_RECEIPT_CONTRACT,
  RETRY_LIVE_TIER,
  RETRY_LIVE_TIER_STATEMENT,
  RETRY_LIVE_UNREALISED_STEPS,
  type RetryLiveInput,
  type RetryLiveObserved,
  type RetryLiveRule,
  truthLabelOf,
  type UncertainParkObservation,
} from "./helpers/furnace-hosted-retry-live-receipt.js";

const clone = <T>(value: T): T => structuredClone(value);
/** A deep mutable view (distributes over unions such as `HostedReceipt | null`), for building mutants of a frozen-shaped fixture. */
type Mutable<T> = T extends object ? { -readonly [K in keyof T]: Mutable<T[K]> } : T;

// Obviously fake identifiers, shaped like the measurement: 32-hex session instance ids, 16-hex process tokens.
const S1 = "1".repeat(32);
const S2 = "2".repeat(32);
const S3 = "3".repeat(32);
const SOBS = "9".repeat(32);
const T1 = "0123456789abcdef";
const T2 = "fedcba9876543210";
const T3 = "00112233445566ff";
const R1 = `${S1}/${T1}/1`;
const R2 = `${S2}/${T2}/1`;
const R3 = `${S3}/${T3}/1`;
const LIMITS = { crashDurability: "none", observe: "session-word", identity: "per-attempt", replyBounds: "none", retry: "adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park" } as const;
const at = (seconds: number): string => new Date(Date.UTC(2026, 9, 17, 17, 0, 0) + seconds * 1000).toISOString();

function hostedAttempt(attemptId: string, ordinal: number, session: string, receipt: string, terminal: "success" | "failure" | "indeterminate" | "cancelled" | "pending", extra: Record<string, unknown> = {}) {
  return {
    invocation: ordinal,
    attemptId,
    ordinal,
    workId: "wk-live",
    runId: "frn-run-live",
    beadsRunId: "bd-run-live",
    sessionInstanceId: session,
    executionId: `frn-exe-${attemptId}`,
    admissionReceipt: receipt,
    terminal,
    cancel: { requested: false },
    unsettledAfterCancel: false,
    ...extra,
  };
}
function event(sequence: number, type: string, controllerSessionId: string, requestId: string, extra: Partial<FurnaceEventRecord> = {}): FurnaceEventRecord {
  return { sequence, type, attemptId: null, controllerSessionId, requestId, source: null, cause: null, timestamp: at(sequence / 10), ...extra };
}

function retryObservation(): OperatorRetryObservation {
  const first = hostedAttempt("frn-atm-live-1", 1, S1, R1, "cancelled", { cancel: { requested: true, reason: "operator_stop" }, summary: "child Run establishment not acknowledged" });
  const retry = hostedAttempt("frn-atm-live-2", 2, S2, R2, "success", { summary: "operator retry" });
  const sessions = [
    { sessionInstanceId: S1, admissionReceipts: [R1] },
    { sessionInstanceId: SOBS, admissionReceipts: [] },
    { sessionInstanceId: S2, admissionReceipts: [R2] },
  ];
  const hosted = (state: "started" | "closed") => ({ contract: "workbench.furnace-hosted/v1" as const, executor: "pi-hosted-retry", state, run: { runId: "frn-run-live", beadsRunId: "bd-run-live", requestId: "frn-req-start" }, limits: { ...LIMITS }, attempts: [clone(first), clone(retry)], sessions: clone(sessions), identityViolations: [] });
  const furnaceAttempts: FurnaceAttemptRecord[] = [
    { attemptId: "frn-atm-live-1", ordinal: 1, workId: "wk-live", state: "cancelled", outcome: "cancelled", controllerSessionId: "ctl-start", identity: { hostInstanceId: S1, receipt: R1, executionId: "frn-exe-frn-atm-live-1" }, cancel: { reason: "operator_stop", requestedAt: at(2), terminalObservedAt: at(4) }, finishedAt: at(5) },
    { attemptId: "frn-atm-live-2", ordinal: 2, workId: "wk-live", state: "succeeded", outcome: "success", controllerSessionId: "ctl-retry", identity: { hostInstanceId: S2, receipt: R2, executionId: "frn-exe-frn-atm-live-2" }, cancel: null, finishedAt: at(8) },
  ];
  const events: FurnaceEventRecord[] = [
    event(8, "controller.started", "ctl-start", "frn-req-start", { source: "run start" }),
    event(14, "attempt.created", "ctl-start", "frn-req-start", { attemptId: "frn-atm-live-1" }),
    event(17, "attempt.started", "ctl-start", "frn-req-start", { attemptId: "frn-atm-live-1" }),
    event(20, "attempt.cancel_requested", "ctl-stop", "frn-req-stop", { attemptId: "frn-atm-live-1" }),
    event(30, "attempt.cancelled", "ctl-start", "frn-req-start", { attemptId: "frn-atm-live-1" }),
    event(40, "controller.stopped", "ctl-start", "frn-req-start", { cause: "waiting_on_beads" }),
    event(60, "controller.started", "ctl-retry", "frn-req-retry", { source: "work retry" }),
    event(63, "attempt.created", "ctl-retry", "frn-req-retry", { attemptId: "frn-atm-live-2" }),
    event(66, "attempt.started", "ctl-retry", "frn-req-retry", { attemptId: "frn-atm-live-2" }),
    event(70, "attempt.succeeded", "ctl-retry", "frn-req-retry", { attemptId: "frn-atm-live-2" }),
    event(74, "controller.stopped", "ctl-retry", "frn-req-retry", { cause: "retry_completed" }),
  ];
  return {
    start: { resolved: true, error: null },
    stop: { kind: "attempt_stop", requestId: "frn-req-stop" },
    retry: { kind: "work_retry", ok: true, code: null, argv: ["work", "retry", "wk-live", "--run", "frn-run-live", "--json"] },
    receipt: hosted("started"),
    receiptAfterClose: hosted("closed"),
    markers: ["frn-atm-live-1", "frn-atm-live-2"],
    runStateAfterRetry: "active",
    furnaceAttempts,
    events,
    eventsComplete: true,
    bridge: [
      { session: S1, executionId: "frn-exe-frn-atm-live-1", kind: "observe", status: "running", at: at(2.5) },
      { session: S1, executionId: "frn-exe-frn-atm-live-1", kind: "observe", status: "running", at: at(3) },
      { session: S1, executionId: "frn-exe-frn-atm-live-1", kind: "terminal", status: "cancelled", at: at(3.5) },
      { session: S2, executionId: "frn-exe-frn-atm-live-2", kind: "terminal", status: "success", at: at(7) },
    ],
    observer: {
      cancelRequestId: "observer-cancel",
      observeRequestId: "observer-observe",
      cancelReply: { protocol_version: 1, op: "cancel", request_id: "observer-cancel", output: { status: "unknown_execution" } },
      observeReply: { protocol_version: 1, op: "observe", request_id: "observer-observe", output: { status: "unknown" } },
      ownerAbortedBeforeStop: false,
      readings: [
        { at: at(1), attemptId: "frn-atm-live-1", state: "running", cancelRequested: false },
        { at: at(1.5), attemptId: "frn-atm-live-1", state: "running", cancelRequested: false },
        { at: at(6), attemptId: "frn-atm-live-1", state: "cancelled", cancelRequested: true },
        { at: at(9), attemptId: "frn-atm-live-2", state: "succeeded", cancelRequested: false },
      ],
    },
  };
}

/** The uncertain-park scenario as a FIXED adapter would report it: the Run stays reported and the operator retry is reachable. */
function parkObservation(): UncertainParkObservation {
  const first = hostedAttempt("frn-atm-park-1", 1, S3, R3, "indeterminate", { workId: "wk-park", runId: "frn-run-park", beadsRunId: "bd-run-park", summary: "child Run establishment not acknowledged" });
  return {
    start: { resolved: true, error: null, category: null },
    receipt: { contract: "workbench.furnace-hosted/v1", executor: "pi-hosted-park", state: "started", run: { runId: "frn-run-park", beadsRunId: "bd-run-park", requestId: "frn-req-park" }, limits: { ...LIMITS }, attempts: [first], sessions: [{ sessionInstanceId: S3, admissionReceipts: [R3] }], identityViolations: [] },
    markers: ["frn-atm-park-1"],
    runId: "frn-run-park",
    runState: "needs_attention",
    attention: ["frn-atm-park-1"],
    furnaceAttempts: [{ attemptId: "frn-atm-park-1", ordinal: 1, workId: "wk-park", state: "needs_reconciliation", outcome: null, controllerSessionId: "ctl-park", identity: { hostInstanceId: S3, receipt: R3, executionId: "frn-exe-frn-atm-park-1" }, cancel: null, finishedAt: at(3) }],
    events: [
      event(8, "controller.started", "ctl-park", "frn-req-park", { source: "run start" }),
      event(14, "attempt.created", "ctl-park", "frn-req-park", { attemptId: "frn-atm-park-1" }),
      event(17, "attempt.started", "ctl-park", "frn-req-park", { attemptId: "frn-atm-park-1" }),
      event(18, "attempt.needs_reconciliation", "ctl-park", "frn-req-park", { attemptId: "frn-atm-park-1" }),
      event(19, "run.needs_attention", "ctl-park", "frn-req-park"),
      event(20, "controller.stopped", "ctl-park", "frn-req-park", { cause: "needs_attention" }),
    ],
    eventsComplete: true,
    bridge: [{ session: S3, executionId: "frn-exe-frn-atm-park-1", kind: "terminal", status: "indeterminate", at: at(2) }],
    retry: { attempted: true, ok: true, code: null, kind: "work_retry" },
    attemptsAfterRetry: 2,
  };
}

function clean(): RetryLiveObserved {
  return { operatorRetry: retryObservation(), uncertainPark: parkObservation() };
}
/** The park scenario exactly as the 2026-10-17 exploration measured the landed adapter (F1). */
function measuredPark(): UncertainParkObservation {
  const park = clone(parkObservation()) as Mutable<UncertainParkObservation>;
  park.start = { resolved: false, error: "Furnace refused the run start (reconciliation_required); no Run was started.", category: "unavailable" };
  if (park.receipt) {
    park.receipt.state = "failed";
    delete park.receipt.run;
  }
  park.retry = { attempted: true, ok: false, code: "config_invalid", kind: null };
  park.attemptsAfterRetry = 1;
  return park;
}
function rules(observed: RetryLiveObserved): RetryLiveRule[] {
  return assessRetryLive(observed).findings.map((finding) => finding.rule);
}
function mutate(apply: (observed: Mutable<RetryLiveObserved>) => void): RetryLiveObserved {
  const observed = clone(clean()) as Mutable<RetryLiveObserved>;
  apply(observed);
  return observed;
}
const retryOf = (observed: Mutable<RetryLiveObserved>): Mutable<OperatorRetryObservation> => {
  if (!observed.operatorRetry) throw new Error("fixture lost its retry scenario");
  return observed.operatorRetry;
};
const parkOf = (observed: Mutable<RetryLiveObserved>): Mutable<UncertainParkObservation> => {
  if (!observed.uncertainPark) throw new Error("fixture lost its park scenario");
  return observed.uncertainPark;
};
function input(observed: RetryLiveObserved, extra: Partial<RetryLiveInput> = {}): RetryLiveInput {
  return {
    utc: "2026-10-17T17:30:00.000Z",
    revision: "0123456789abcdef0123456789abcdef01234567",
    dirty: false,
    node: "v24.20.0",
    furnace: { version: "0.1.0", protocolVersion: 1, binaryRevision: "9970621d87e0", binaryDigest: `sha256:${"a".repeat(64)}` },
    bd: "bd version 1.1.0-rc.1",
    sdk: "0.1.0",
    observed,
    ...extra,
  };
}

describe("furnace-hosted LIVE retry receipt: judge falsifiers", () => {
  it("passes a clean observation of both scenarios, measures the retry's session reading, and exports a stable roster", () => {
    const assessed = assessRetryLive(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.unrealised).toEqual([]);
    expect(assessed.realised).toBe(true);
    expect(assessed.measured.retrySession).toBe("new");
    expect(assessed.measured.firstReceipt).toBe(R1);
    expect(assessed.measured.retryReceipt).toBe(R2);
    expect([...RETRY_LIVE_FINDING_RULES]).toEqual([
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
    ]);
    expect([...RETRY_LIVE_UNREALISED_STEPS]).toEqual(["operator-retry", "uncertain-park", "bridge-observe", "observer", "furnace-events"]);
  });

  it("records a kept-session retry (a further admission in the uncertain Attempt's session) without a finding: the measurement asserts neither shape", () => {
    const kept = mutate((observed) => {
      const retry = retryOf(observed);
      const R1b = `${S1}/${T1}/2`;
      for (const phase of [retry.receipt, retry.receiptAfterClose]) {
        if (!phase) continue;
        const second = phase.attempts[1];
        if (second) {
          second.sessionInstanceId = S1;
          second.admissionReceipt = R1b;
        }
        phase.sessions = [{ sessionInstanceId: S1, admissionReceipts: [R1, R1b] }, { sessionInstanceId: SOBS, admissionReceipts: [] }];
      }
      const furnaceRetry = retry.furnaceAttempts[1];
      if (furnaceRetry?.identity) furnaceRetry.identity = { ...furnaceRetry.identity, hostInstanceId: S1, receipt: R1b };
      const bridgeRetry = retry.bridge[3];
      if (bridgeRetry) bridgeRetry.session = S1;
    });
    expect(rules(kept)).toEqual([]);
    expect(assessRetryLive(kept).measured.retrySession).toBe("kept");
  });

  it("retry-session-reused: the retry's admission repeats the first's, is malformed, or is missing from or misplaced in the roster (never session-id inequality alone)", () => {
    const shapes: Array<(retry: Mutable<OperatorRetryObservation>) => void> = [
      (retry) => {
        const second = retry.receipt?.attempts[1];
        if (second) second.admissionReceipt = R1;
      },
      (retry) => {
        const second = retry.receipt?.attempts[1];
        if (second) second.admissionReceipt = `${S2}/not-a-hex-token/1`;
      },
      (retry) => {
        if (retry.receipt) retry.receipt.sessions = retry.receipt.sessions.filter((session) => session.sessionInstanceId !== S2);
      },
      (retry) => {
        if (retry.receiptAfterClose) retry.receiptAfterClose.sessions = [{ sessionInstanceId: S1, admissionReceipts: [R1, R2] }];
      },
    ];
    for (const shape of shapes) expect(rules(mutate((observed) => shape(retryOf(observed))))).toContain("retry-session-reused");
  });

  it("establishment-not-exactly-once: markers, Furnace attempt.created/attempt.started per Attempt, and executor_identity against the adapter's admission", () => {
    const shapes: Array<(observed: Mutable<RetryLiveObserved>) => void> = [
      (observed) => {
        retryOf(observed).markers = ["frn-atm-live-1", "frn-atm-live-1", "frn-atm-live-2"];
      },
      (observed) => {
        retryOf(observed).markers = ["frn-atm-live-2"];
      },
      (observed) => void retryOf(observed).events.push(event(64, "attempt.created", "ctl-retry", "frn-req-retry", { attemptId: "frn-atm-live-2" })),
      (observed) => {
        retryOf(observed).events = retryOf(observed).events.filter((row) => !(row.type === "attempt.started" && row.attemptId === "frn-atm-live-1"));
      },
      (observed) => {
        const row = retryOf(observed).furnaceAttempts[0];
        if (row?.identity) row.identity = { ...row.identity, receipt: R2 };
      },
      (observed) => {
        const row = retryOf(observed).furnaceAttempts[1];
        if (row) row.identity = null;
      },
      (observed) => {
        parkOf(observed).markers = [];
      },
      (observed) => {
        const row = parkOf(observed).furnaceAttempts[0];
        if (row?.identity) row.identity = { ...row.identity, hostInstanceId: S1 };
      },
    ];
    for (const shape of shapes) expect(rules(mutate(shape))).toContain("establishment-not-exactly-once");
  });

  it("retry-not-operator-originated: every Attempt Furnace created must trace to the run-start controller (first) or a work-retry controller (retry); nothing else may create one", () => {
    const shapes: Array<(observed: Mutable<RetryLiveObserved>) => void> = [
      (observed) => {
        const started = retryOf(observed).events.find((row) => row.type === "controller.started" && row.controllerSessionId === "ctl-retry");
        if (started) started.source = "run resume";
      },
      (observed) => {
        const created = retryOf(observed).events.find((row) => row.type === "attempt.created" && row.attemptId === "frn-atm-live-2");
        if (created) created.controllerSessionId = "ctl-start";
      },
      (observed) => {
        const retry = retryOf(observed);
        retry.events.push(event(80, "attempt.created", "ctl-start", "frn-req-start", { attemptId: "frn-atm-live-3" }));
        retry.furnaceAttempts.push({ attemptId: "frn-atm-live-3", ordinal: 3, workId: "wk-live", state: "succeeded", outcome: "success", controllerSessionId: "ctl-start", identity: null, cancel: null, finishedAt: at(10) });
      },
      (observed) => void parkOf(observed).events.push(event(21, "attempt.created", "ctl-park", "frn-req-park", { attemptId: "frn-atm-park-2" })),
    ];
    for (const shape of shapes) expect(rules(mutate(shape))).toContain("retry-not-operator-originated");
  });

  it("retry-not-settled: the operator retry reached its own success in the adapter, after close, and in Furnace", () => {
    const shapes: Array<(retry: Mutable<OperatorRetryObservation>) => void> = [
      (retry) => {
        const second = retry.receipt?.attempts[1];
        if (second) second.terminal = "failure";
      },
      (retry) => {
        const second = retry.receiptAfterClose?.attempts[1];
        if (second) second.terminal = "pending";
      },
      (retry) => {
        const row = retry.furnaceAttempts[1];
        if (row) row.state = "failed";
      },
    ];
    for (const shape of shapes) expect(rules(mutate((observed) => shape(retryOf(observed))))).toContain("retry-not-settled");
  });

  it("uncertain-not-parked and uncertain-reported-success: Furnace parks the indeterminate Attempt (needs_reconciliation, Run needs_attention, listed for attention) and nobody reads it as success", () => {
    const parked: Array<(park: Mutable<UncertainParkObservation>) => void> = [
      (park) => {
        const row = park.furnaceAttempts[0];
        if (row) row.state = "failed";
      },
      (park) => {
        park.runState = "active";
      },
      (park) => {
        park.attention = [];
      },
      (park) => {
        park.events = park.events.filter((row) => row.type !== "attempt.needs_reconciliation");
      },
      (park) => void park.furnaceAttempts.push({ attemptId: "frn-atm-park-2", ordinal: 2, workId: "wk-park", state: "succeeded", outcome: "success", controllerSessionId: "ctl-park", identity: null, cancel: null, finishedAt: at(4) }),
    ];
    for (const shape of parked) expect(rules(mutate((observed) => shape(parkOf(observed))))).toContain("uncertain-not-parked");
    const success: Array<(park: Mutable<UncertainParkObservation>) => void> = [
      (park) => {
        const first = park.receipt?.attempts[0];
        if (first) first.terminal = "success";
      },
      (park) => {
        const row = park.furnaceAttempts[0];
        if (row) row.state = "succeeded";
      },
      (park) => {
        const row = park.bridge[0];
        if (row) row.status = "success";
      },
    ];
    for (const shape of success) expect(rules(mutate((observed) => shape(parkOf(observed))))).toContain("uncertain-reported-success");
  });

  it("observe-disagreement: the bridge's own Observe answers and terminal events must agree with Furnace's record of the same Attempt", () => {
    const shapes: Array<(observed: Mutable<RetryLiveObserved>) => void> = [
      // the owner session answered running AFTER Furnace had observed the terminal
      (observed) => {
        const row = retryOf(observed).bridge[1];
        if (row) row.at = at(4.5);
      },
      // the owner session did not know its own admission
      (observed) => {
        const row = retryOf(observed).bridge[0];
        if (row) row.status = "unknown";
      },
      // the bridge terminal says success where Furnace recorded cancelled
      (observed) => {
        const row = retryOf(observed).bridge[2];
        if (row) row.status = "success";
      },
      // no bridge terminal for an Attempt Furnace records as finished
      (observed) => {
        retryOf(observed).bridge = retryOf(observed).bridge.filter((row) => row.executionId !== "frn-exe-frn-atm-live-2");
      },
      // the park terminal was not the indeterminate Furnace parked on
      (observed) => {
        const row = parkOf(observed).bridge[0];
        if (row) row.status = "failure";
      },
    ];
    for (const shape of shapes) expect(rules(mutate(shape))).toContain("observe-disagreement");
  });

  it("state-change-unseen: an observer without ownership reads running, then cancelled, then the retry's success through Furnace's records", () => {
    const shapes: Array<(retry: Mutable<OperatorRetryObservation>) => void> = [
      (retry) => {
        retry.observer.readings = retry.observer.readings.filter((row) => row.state !== "running");
      },
      (retry) => {
        retry.observer.readings = retry.observer.readings.filter((row) => row.state !== "cancelled");
      },
      (retry) => {
        retry.observer.readings = retry.observer.readings.filter((row) => row.attemptId !== "frn-atm-live-2");
      },
    ];
    for (const shape of shapes) expect(rules(mutate((observed) => shape(retryOf(observed))))).toContain("state-change-unseen");
  });

  it("observer-gained-control and observe-faked: the observer's own bridge cancel and Observe change and reveal nothing", () => {
    const control: Array<(retry: Mutable<OperatorRetryObservation>) => void> = [
      (retry) => {
        retry.observer.cancelReply = { protocol_version: 1, op: "cancel", request_id: "observer-cancel", output: { status: "request_received" } };
      },
      (retry) => {
        retry.observer.cancelReply = { protocol_version: 1, op: "cancel", request_id: "observer-cancel", output: { status: "unknown_execution", execution_id: "frn-exe-frn-atm-live-1" } };
      },
      (retry) => {
        retry.observer.ownerAbortedBeforeStop = true;
      },
      (retry) => void retry.events.push(event(19, "attempt.cancel_requested", "ctl-observer", "frn-req-observer", { attemptId: "frn-atm-live-1" })),
      (retry) => {
        const row = retry.furnaceAttempts[0];
        if (row?.cancel) row.cancel = { ...row.cancel, reason: "host_closed" };
      },
    ];
    for (const shape of control) expect(rules(mutate((observed) => shape(retryOf(observed))))).toContain("observer-gained-control");
    const faked: Array<(retry: Mutable<OperatorRetryObservation>) => void> = [
      (retry) => {
        retry.observer.observeReply = { protocol_version: 1, op: "observe", request_id: "observer-observe", output: { status: "running" } };
      },
      (retry) => {
        retry.observer.observeReply = { protocol_version: 1, op: "observe", request_id: "observer-observe", output: { status: "unknown", receipt: R1 } };
      },
    ];
    for (const shape of faked) expect(rules(mutate((observed) => shape(retryOf(observed))))).toContain("observe-faked");
  });

  it("identity-violation, limits-misstated and furnace-retry-premise on either scenario's adapter receipt", () => {
    expect(rules(mutate((observed) => void retryOf(observed).receipt?.identityViolations.push("attempt frn-atm-live-1 executed 2 times")))).toContain("identity-violation");
    expect(
      rules(
        mutate((observed) => {
          const receipt = parkOf(observed).receipt;
          if (receipt) receipt.limits = { ...receipt.limits, observe: "unsupported" as "session-word" };
        }),
      ),
    ).toContain("limits-misstated");
    expect(
      rules(
        mutate((observed) => {
          const receipt = retryOf(observed).receiptAfterClose;
          if (receipt) receipt.limits = { ...receipt.limits, retry: "furnace-retries" as typeof LIMITS.retry };
        }),
      ),
    ).toContain("furnace-retry-premise");
  });

  it("parked-start-misreported and operator-retry-unreachable name the measured adapter defect (F1): a parked Run reported as never started, and the operator's work retry without its executor", () => {
    const measured: RetryLiveObserved = { operatorRetry: retryObservation(), uncertainPark: measuredPark() };
    const found = assessRetryLive(measured);
    expect(found.realised).toBe(true);
    expect(found.findings.map((finding) => finding.rule)).toEqual(["parked-start-misreported", "operator-retry-unreachable"]);
    expect(found.findings[0]?.detail).toMatch(/no Run was started/);
    expect(found.findings[0]?.detail).toMatch(/frn-run-park/);
    expect(found.findings[0]?.detail).toMatch(/needs_attention/);
    expect(found.findings[1]?.detail).toMatch(/config_invalid/);
    // A run reported by the adapter is not the defect, whatever start returned.
    const reported = clone(measuredPark()) as Mutable<UncertainParkObservation>;
    if (reported.receipt) reported.receipt.run = { runId: "frn-run-park", beadsRunId: "bd-run-park", requestId: "frn-req-park" };
    expect(rules({ operatorRetry: retryObservation(), uncertainPark: reported })).not.toContain("parked-start-misreported");
  });
});

describe("furnace-hosted LIVE retry receipt: realisation", () => {
  it("is not realised, and produces no finding for the gap, when a scenario, the bridge Observe reading, the observer or Furnace's complete event page is missing", () => {
    const cases: Array<[string, RetryLiveObserved]> = [
      ["operator-retry", { ...clean(), operatorRetry: null }],
      ["uncertain-park", { ...clean(), uncertainPark: null }],
      ["operator-retry", mutate((observed) => {
        retryOf(observed).retry = { kind: null, ok: false, code: "command_error", argv: [] };
      })],
      ["bridge-observe", mutate((observed) => {
        retryOf(observed).bridge = retryOf(observed).bridge.filter((row) => row.kind !== "observe");
      })],
      ["observer", mutate((observed) => {
        retryOf(observed).observer.cancelReply = null;
      })],
      ["furnace-events", mutate((observed) => {
        retryOf(observed).eventsComplete = false;
      })],
      ["furnace-events", mutate((observed) => {
        parkOf(observed).eventsComplete = false;
      })],
      ["uncertain-park", mutate((observed) => {
        parkOf(observed).retry = { attempted: false, ok: false, code: null, kind: null };
      })],
    ];
    for (const [step, observed] of cases) {
      const assessed = assessRetryLive(observed);
      expect(assessed.realised, step).toBe(false);
      expect(assessed.unrealised.map((gap) => gap.step), step).toContain(step);
    }
    expect(assessRetryLive({ operatorRetry: null, uncertainPark: null }).findings).toEqual([]);
  });
});

describe("furnace-hosted LIVE retry receipt: evidence-grade shape", () => {
  it("builds a frozen LIVE receipt bound to a revision, never conflated with the fixture receipt", () => {
    const built = buildRetryLiveReceipt(input(clean()));
    expect(RETRY_LIVE_RECEIPT_CONTRACT).toBe("workbench.furnace-hosted-retry-live/v1");
    expect(RETRY_LIVE_RECEIPT_CONTRACT).not.toBe(RETRY_FAULT_RECEIPT_CONTRACT);
    expect(RETRY_LIVE_TIER).toBe("live");
    expect(RETRY_LIVE_TIER).not.toBe(RETRY_FAULT_TIER);
    expect(RETRY_LIVE_TIER_STATEMENT).toMatch(/^LIVE tier:/);
    expect(RETRY_LIVE_TIER_STATEMENT).toMatch(/disposable \/tmp workspace/);
    expect(RETRY_LIVE_TIER_STATEMENT).toMatch(/workbench\.furnace-hosted-retry-fault\/v1/);
    expect(RETRY_LIVE_LINE_MARKER).toBe("FURNACE_HOSTED_RETRY_LIVE_RECEIPT");
    expect(built.contract).toBe(RETRY_LIVE_RECEIPT_CONTRACT);
    expect(built.tier).toBe("live");
    expect(built.truthLabel).toBe("LIVE pass");
    expect(truthLabelOf(built)).toBe(built.truthLabel);
    expect(built.pass).toBe(true);
    expect(built.revision).toBe("0123456789abcdef0123456789abcdef01234567");
    expect(built.nonClaims).toEqual([...RETRY_LIVE_NON_CLAIMS]);
    expect(built.measured.retrySession).toBe("new");
    expect(Object.isFrozen(built)).toBe(true);
    expect(Object.isFrozen(built.scenarios.operatorRetry?.receipt?.attempts[0])).toBe(true);
    // per-scenario outcomes: attempt ids, admission receipts and session instance ids, terminals, markers, violations, replies
    expect(built.scenarios.operatorRetry?.receipt?.attempts.map((a) => [a.attemptId, a.sessionInstanceId, a.admissionReceipt, a.terminal])).toEqual([
      ["frn-atm-live-1", S1, R1, "cancelled"],
      ["frn-atm-live-2", S2, R2, "success"],
    ]);
    expect(built.scenarios.operatorRetry?.markers).toEqual(["frn-atm-live-1", "frn-atm-live-2"]);
    expect(built.scenarios.operatorRetry?.observer.cancelReply?.output).toEqual({ status: "unknown_execution" });
    expect(built.scenarios.uncertainPark?.furnaceAttempts.map((a) => a.state)).toEqual(["needs_reconciliation"]);
  });

  it("does not pass with findings, on a dirty tree, or when not realised, and labels each honestly", () => {
    const measured = buildRetryLiveReceipt(input({ operatorRetry: retryObservation(), uncertainPark: measuredPark() }));
    expect(measured.pass).toBe(false);
    expect(measured.realised).toBe(true);
    expect(measured.truthLabel).toBe("LIVE with findings");
    const dirty = buildRetryLiveReceipt(input(clean(), { dirty: true }));
    expect(dirty.findings.map((finding) => finding.rule)).toEqual(["uncommitted-tree"]);
    expect(dirty.pass).toBe(false);
    const unrealised = buildRetryLiveReceipt(input({ operatorRetry: null, uncertainPark: parkObservation() }));
    expect(unrealised.realised).toBe(false);
    expect(unrealised.truthLabel).toBe("LIVE not realised");
    expect(unrealised.pass).toBe(false);
  });

  it("refuses a receipt without its identifying fields or a full commit sha", () => {
    for (const field of ["utc", "node", "bd", "sdk"] as const) expect(() => buildRetryLiveReceipt(input(clean(), { [field]: "" }))).toThrow(new RegExp(field));
    expect(() => buildRetryLiveReceipt(input(clean(), { revision: "HEAD" }))).toThrow(/revision/);
    expect(() => buildRetryLiveReceipt(input(clean(), { revision: "0123456" }))).toThrow(/revision/);
  });
});

describe("furnace-hosted LIVE retry receipt: module and live-tier boundaries", () => {
  const read = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const receiptModule = read("test/helpers/furnace-hosted-retry-live-receipt.ts");
  const live = read("test/workbench-furnace-hosted-real.test.ts");

  it("keeps the judge pure: no I/O, clock, random source or process access, and the shared claim-1 rule comes from the fixture judge", () => {
    const imports = [...receiptModule.matchAll(/^import\b[^;]*?from\s+"([^"]+)";$/gm)].map((match) => match[1]);
    expect(imports).toEqual(["../../qa/workbench/furnace-hosted-retry-fault-receipt.mjs", "../../src/workbench/hosts/furnace-hosted.js"]);
    expect(receiptModule).toMatch(/^import type \{[^}]*\} from "\.\.\/\.\.\/src\/workbench\/hosts\/furnace-hosted\.js";$/m);
    expect(receiptModule).toMatch(/\bretryAdmissionProblems\b/);
    expect(receiptModule).toMatch(/\bretrySessionReading\b/);
    expect(receiptModule).not.toMatch(/Date\.now|new Date\(|Math\.random|process\.|\brequire\(|\bimport\(/);
  });

  it("measures the live scenarios in the disposable /tmp workspace through the SDK's operator verbs and prints the receipt producer-side", () => {
    // argv.d.ts: workRetry(workId, request, options) -> `work retry <work> --run <run> --json`; attemptStop -> `attempt stop <attempt> --json`.
    expect(live).toMatch(/\.work\.retry\(/);
    expect(live).toMatch(/argv\.workRetry\(/);
    expect(live).toMatch(/\.attempts\.stop\(/);
    expect(live).toContain(`process.stdout.write(\`\\n\${RETRY_LIVE_LINE_MARKER} \${JSON.stringify(`);
    expect(live).not.toMatch(/console\.(?:log|info|error|warn)\(/);
    expect(live).toMatch(/expect\(workspace\)\.toMatch\(\/\^\\\/tmp\\\/pi-furnace-hosted\\\.\[\^\/\]\+\$\/\)/);
    // every Furnace client of the retry rows is pinned to the /tmp workspace and its own state directory
    for (const stateDir of [".furnace-hosted-state-retry", ".furnace-hosted-state-park"]) expect(live).toContain(`stateDir: join(workspace, "${stateDir}")`);
    expect(live).not.toMatch(/['"](?:doctor|--persistent)['"]|capability-probe/);
    expect(live).not.toMatch(/\b(?:it|describe|test)\.only\b/);
  });
});
