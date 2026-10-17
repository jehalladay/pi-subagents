/**
 * wb-0kg.4 (VC-7 / W18-D): FIXTURE-tier receipt for Furnace Work retry while child Run establishment is uncertain.
 *
 * Spec lines pinned (docs/workbench/14-qa-and-benchmarks.md "Fault-injection locations"):
 *   "Parent Furnace Work retry while child Run establishment is uncertain."
 * wb-zmd constraint set: "one bridge host session per Attempt"; receipts must state "no crash durability
 *   (controller or Pi death leaves running Attempts needing operator recovery), Observe unsupported, per-Attempt identity".
 * Owner Q1 ruling (22:15Z): (a) a FIXTURE receipt per the W18 family pattern -- pure builder, runner, offline vitest and
 *   ONE additive forge command outside the default gate -- honestly labelled as driven through the REPAIRED SDK copy;
 *   (c) the LIVE receipt is wb-3hc.
 *
 * Offline: the pure judge is driven with a clean observed fixture and one mutant per rule, so a judge that reported a
 * constant would fail here. The runner and the journeys helper are read as text only; the journeys themselves run in
 * test/workbench-furnace-hosted-retry-fault.test.ts and through `forge run furnace-hosted-retry-fault`.
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  assessRetryFaultJourneys,
  buildRetryFaultReceipt,
  EXPECTED_LIMITS,
  exitCodeFor,
  RETRY_FAULT_FINDING_RULES,
  RETRY_FAULT_JOURNEYS,
  RETRY_FAULT_LIMITS_STATEMENT,
  RETRY_FAULT_RECEIPT_CONTRACT,
  RETRY_FAULT_TIER,
  RETRY_FAULT_TIER_STATEMENT,
} from "../qa/workbench/furnace-hosted-retry-fault-receipt.mjs";

interface Attempt {
  invocation: number;
  attemptId: string;
  ordinal: number;
  workId: string;
  runId: string;
  beadsRunId: string;
  sessionInstanceId: string;
  terminal: string;
  summary?: string;
  cancel: { requested: boolean; reason?: string };
  unsettledAfterCancel: boolean;
}
interface Receipt {
  contract: string;
  executor: string;
  state: string;
  run: { runId: string; beadsRunId: string; requestId: string };
  limits: Record<string, string>;
  attempts: Attempt[];
  identityViolations: string[];
}
interface Reply {
  protocol_version: number;
  op: string;
  request_id: string;
  output: Record<string, unknown>;
}
interface RetryJourney {
  armed: boolean;
  beforeClose: Receipt;
  markersBeforeClose: string[];
  afterClose: Receipt;
  markersAfterClose: string[];
}
interface Observed {
  sdk: { copy: string; repairedDigest: string; shippedManifestDigest: string };
  journeys: {
    lostConnectionRetry: RetryJourney & { droppedAfterStarted: boolean; retriedWireStatus: string | null };
    explicitUncertainRetry: RetryJourney & { wireStatuses: string[] };
    sameAttemptReexecution: { armed: boolean; wireStatuses: string[]; beforeClose: Receipt; afterClose: Receipt };
    observerNoControl: {
      armed: boolean;
      cancelRequestId: string;
      observeRequestId: string;
      cancelReply: Reply | null;
      observeReply: Reply | null;
      aborted: boolean | null;
      ownerWireStatus: string | null;
      beforeClose: Receipt;
      afterClose: Receipt;
    };
    dropBeforeAdmissionReply: RetryJourney & { droppedBeforeReply: boolean; admissionReplySeen: boolean; firstReachedHost: boolean; retriedWireStatus: string | null };
  };
}

const clone = <T>(value: T): T => structuredClone(value);
const LIMITS = { crashDurability: "none", observe: "unsupported", identity: "per-attempt", replyBounds: "none", retry: "adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park" };

function attempt(invocation: number, attemptId: string, ordinal: number, terminal: string, extra: Partial<Attempt> = {}): Attempt {
  return {
    invocation,
    attemptId,
    ordinal,
    workId: "bd-work-retry",
    runId: "frn-run-fake",
    beadsRunId: "bd-run-fake",
    sessionInstanceId: `session-${attemptId}`,
    terminal,
    cancel: { requested: false },
    unsettledAfterCancel: false,
    ...extra,
  };
}
function receipt(attempts: Attempt[], identityViolations: string[] = []): Receipt {
  return {
    contract: "workbench.furnace-hosted/v1",
    executor: "pi-hosted",
    state: "started",
    run: { runId: "frn-run-fake", beadsRunId: "bd-run-fake", requestId: "req-fake" },
    limits: { ...LIMITS },
    attempts,
    identityViolations,
  };
}
const closedByHost = { requested: true, reason: "host_closed" };
function parkedRetry(first: string, retry: string): RetryJourney {
  return {
    armed: true,
    beforeClose: receipt([attempt(1, first, 1, "pending"), attempt(2, retry, 2, "success", { summary: "retried attempt done" })]),
    markersBeforeClose: [first, retry],
    afterClose: receipt([
      attempt(1, first, 1, "indeterminate", { summary: "establishment not acknowledged", cancel: closedByHost }),
      attempt(2, retry, 2, "success", { summary: "retried attempt done" }),
    ]),
    markersAfterClose: [first, retry],
  };
}

function clean(): Observed {
  const sameA = attempt(1, "frn-atm-same", 1, "success", { sessionInstanceId: "session-a" });
  const sameB = attempt(2, "frn-atm-same", 1, "success", { sessionInstanceId: "session-b" });
  const owner = attempt(1, "frn-atm-o1", 1, "success");
  const uncertain = { summary: "run establishment may have happened" };
  return {
    sdk: { copy: "repaired", repairedDigest: `sha256:${"e".repeat(64)}`, shippedManifestDigest: `sha256:${"b".repeat(64)}` },
    journeys: {
      lostConnectionRetry: { ...parkedRetry("frn-atm-r1", "frn-atm-r2"), droppedAfterStarted: true, retriedWireStatus: "success" },
      explicitUncertainRetry: {
        armed: true,
        wireStatuses: ["indeterminate", "success"],
        beforeClose: receipt([attempt(1, "frn-atm-u1", 1, "indeterminate", uncertain), attempt(2, "frn-atm-u2", 2, "success")]),
        markersBeforeClose: ["frn-atm-u1", "frn-atm-u2"],
        afterClose: receipt([attempt(1, "frn-atm-u1", 1, "indeterminate", uncertain), attempt(2, "frn-atm-u2", 2, "success")]),
        markersAfterClose: ["frn-atm-u1", "frn-atm-u2"],
      },
      sameAttemptReexecution: {
        armed: true,
        wireStatuses: ["success", "success"],
        beforeClose: receipt([sameA, sameB], ["attempt frn-atm-same executed 2 times"]),
        afterClose: receipt([sameA, sameB], ["attempt frn-atm-same executed 2 times"]),
      },
      observerNoControl: {
        armed: true,
        cancelRequestId: "oc",
        observeRequestId: "oo",
        cancelReply: { protocol_version: 1, op: "cancel", request_id: "oc", output: { status: "unknown_execution" } },
        observeReply: { protocol_version: 1, op: "observe", request_id: "oo", output: { status: "unsupported" } },
        aborted: false,
        ownerWireStatus: "success",
        beforeClose: receipt([owner]),
        afterClose: receipt([owner]),
      },
      dropBeforeAdmissionReply: {
        ...parkedRetry("frn-atm-d1", "frn-atm-d2"),
        droppedBeforeReply: true,
        admissionReplySeen: false,
        firstReachedHost: true,
        retriedWireStatus: "success",
      },
    },
  };
}

function rules(observed: Observed): string[] {
  return assessRetryFaultJourneys(observed).findings.map((finding: { rule: string }) => finding.rule);
}
/** The furnace-retry-premise details alone, so a mutant row can pin WHICH journey and phase the judge flagged. */
function premiseDetails(observed: Observed): string[] {
  return assessRetryFaultJourneys(observed)
    .findings.filter((finding: { rule: string }) => finding.rule === "furnace-retry-premise")
    .map((finding: { detail: string }) => finding.detail);
}
function receiptInput(observed: Observed) {
  return {
    utc: "2026-10-15T23:30:00.000Z",
    revision: "0123456789abcdef0123456789abcdef01234567",
    revisionClean: true,
    node: "v24.20.0",
    arch: "x64",
    platform: "linux",
    scratch: { path: "/run/user/1000", source: "xdg-runtime-dir" },
    diagnostics: [],
    ...observed,
  };
}
function readRepo(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}
function specifiersOf(source: string): string[] {
  const found: string[] = [];
  for (const match of source.matchAll(/(?:^|[;\s])(?:import|export)\b[^'"`;]*?from\s*(['"])([^'"]+)\1/gm)) found.push(match[2]);
  for (const match of source.matchAll(/(?:^|[;\s])import\s*(['"])([^'"]+)\1/gm)) found.push(match[2]);
  return found;
}
function dynamicImportsOf(source: string): string[] {
  return [...source.matchAll(/\bimport\(\s*(['"])([^'"]+)\1\s*\)/g)].map((match) => match[2]);
}

describe("furnace-hosted retry-fault receipt: judge falsifiers", () => {
  it("passes a clean fixture covering all five journeys", () => {
    const assessed = assessRetryFaultJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
    expect([...RETRY_FAULT_JOURNEYS]).toEqual(["lostConnectionRetry", "explicitUncertainRetry", "sameAttemptReexecution", "observerNoControl", "dropBeforeAdmissionReply"]);
    expect(Object.keys(clean().journeys).sort()).toEqual([...RETRY_FAULT_JOURNEYS].sort());
  });

  it("exports a stable rule roster and the disclosed limits", () => {
    expect([...RETRY_FAULT_FINDING_RULES]).toEqual([
      "retry-session-reused",
      "establishment-not-exactly-once",
      "uncertain-reported-success",
      "uncertain-not-parked",
      "uncertain-merged",
      "retry-not-settled",
      "identity-violation",
      "reexecution-unrecorded",
      "furnace-retry-premise",
      "limits-misstated",
      "observer-gained-control",
      "observe-faked",
      "settled-attempt-cancelled-by-close",
    ]);
    expect({ ...EXPECTED_LIMITS }).toEqual(LIMITS);
  });

  it("flags an operator retry served by the uncertain Attempt's bridge session (claim 1)", () => {
    for (const name of ["lostConnectionRetry", "explicitUncertainRetry", "dropBeforeAdmissionReply"] as const) {
      const reused = clone(clean());
      const [first, retry] = reused.journeys[name].beforeClose.attempts;
      if (!first || !retry) throw new Error("fixture lost its attempts");
      retry.sessionInstanceId = first.sessionInstanceId;
      expect(rules(reused)).toContain("retry-session-reused");
    }
    const blank = clone(clean());
    const first = blank.journeys.lostConnectionRetry.beforeClose.attempts[0];
    if (!first) throw new Error("fixture lost its attempts");
    first.sessionInstanceId = "";
    expect(rules(blank)).toContain("retry-session-reused");
  });

  it("flags an establishment marker that is not exactly once per Attempt, before or after close (claim 2; gate mutants G3/G4)", () => {
    const rerunOnIndeterminate = clone(clean());
    rerunOnIndeterminate.journeys.lostConnectionRetry.markersAfterClose = ["frn-atm-r1", "frn-atm-r2", "frn-atm-r1"];
    expect(rules(rerunOnIndeterminate)).toContain("establishment-not-exactly-once");
    const rerunOnUncertain = clone(clean());
    rerunOnUncertain.journeys.explicitUncertainRetry.markersAfterClose = ["frn-atm-u1", "frn-atm-u1", "frn-atm-u2"];
    expect(rules(rerunOnUncertain)).toContain("establishment-not-exactly-once");
    const early = clone(clean());
    early.journeys.dropBeforeAdmissionReply.markersBeforeClose = ["frn-atm-d1", "frn-atm-d1", "frn-atm-d2"];
    expect(rules(early)).toContain("establishment-not-exactly-once");
    const missing = clone(clean());
    missing.journeys.explicitUncertainRetry.markersAfterClose = ["frn-atm-u2"];
    expect(rules(missing)).toContain("establishment-not-exactly-once");
    const stray = clone(clean());
    stray.journeys.lostConnectionRetry.markersAfterClose = ["frn-atm-r1", "frn-atm-r2", "frn-atm-r9"];
    expect(rules(stray)).toContain("establishment-not-exactly-once");
  });

  it("flags an uncertain first Attempt reported as success anywhere (claim 3)", () => {
    const afterClose = clone(clean());
    const closed = afterClose.journeys.lostConnectionRetry.afterClose.attempts[0];
    if (!closed) throw new Error("fixture lost its attempts");
    closed.terminal = "success";
    expect(rules(afterClose)).toContain("uncertain-reported-success");
    const wire = clone(clean());
    wire.journeys.explicitUncertainRetry.wireStatuses = ["success", "success"];
    expect(rules(wire)).toContain("uncertain-reported-success");
    const before = clone(clean());
    const parked = before.journeys.dropBeforeAdmissionReply.beforeClose.attempts[0];
    if (!parked) throw new Error("fixture lost its attempts");
    parked.terminal = "success";
    expect(rules(before)).toContain("uncertain-reported-success");
  });

  it("flags an uncertain first Attempt that did not stay parked until host close (claim 3)", () => {
    const resolvedEarly = clone(clean());
    const first = resolvedEarly.journeys.lostConnectionRetry.beforeClose.attempts[0];
    if (!first) throw new Error("fixture lost its attempts");
    first.terminal = "indeterminate";
    expect(rules(resolvedEarly)).toContain("uncertain-not-parked");
    const notIndeterminate = clone(clean());
    const closed = notIndeterminate.journeys.dropBeforeAdmissionReply.afterClose.attempts[0];
    if (!closed) throw new Error("fixture lost its attempts");
    closed.terminal = "cancelled";
    expect(rules(notIndeterminate)).toContain("uncertain-not-parked");
    const wrongReason = clone(clean());
    const cancelled = wrongReason.journeys.lostConnectionRetry.afterClose.attempts[0];
    if (!cancelled) throw new Error("fixture lost its attempts");
    cancelled.cancel = { requested: true, reason: "operator_stop" };
    expect(rules(wrongReason)).toContain("uncertain-not-parked");
    const failed = clone(clean());
    const explicit = failed.journeys.explicitUncertainRetry.beforeClose.attempts[0];
    if (!explicit) throw new Error("fixture lost its attempts");
    explicit.terminal = "failure";
    expect(rules(failed)).toContain("uncertain-not-parked");
  });

  it("flags an uncertain Attempt merged into, or folded together with, the operator retry (claim 3)", () => {
    const folded = clone(clean());
    folded.journeys.lostConnectionRetry.beforeClose.attempts.pop();
    expect(rules(folded)).toContain("uncertain-merged");
    const sameId = clone(clean());
    const retry = sameId.journeys.explicitUncertainRetry.beforeClose.attempts[1];
    if (!retry) throw new Error("fixture lost its attempts");
    retry.attemptId = "frn-atm-u1";
    expect(rules(sameId)).toContain("uncertain-merged");
    const summary = clone(clean());
    const first = summary.journeys.dropBeforeAdmissionReply.beforeClose.attempts[0];
    if (!first) throw new Error("fixture lost its attempts");
    first.summary = "retried attempt done";
    expect(rules(summary)).toContain("uncertain-merged");
    const reordered = clone(clean());
    reordered.journeys.lostConnectionRetry.afterClose.attempts.reverse();
    expect(rules(reordered)).toContain("uncertain-merged");
  });

  it("flags an Attempt that settled before the host closed yet carries a cancel after close (wb-21k: the stale close-abort listener)", () => {
    // Every settled Attempt the tier produces: each retry Attempt, the same-id pair, the observer owner, and the explicit
    // uncertain first Attempt that threw before close. One mutant each, stamped host_closed the way the unfixed adapter does.
    const settledAfterClose: readonly (readonly [keyof Observed["journeys"], number])[] = [
      ["lostConnectionRetry", 1],
      ["explicitUncertainRetry", 0],
      ["explicitUncertainRetry", 1],
      ["sameAttemptReexecution", 0],
      ["sameAttemptReexecution", 1],
      ["observerNoControl", 0],
      ["dropBeforeAdmissionReply", 1],
    ];
    for (const [name, index] of settledAfterClose) {
      const stale = clone(clean());
      const closed = stale.journeys[name].afterClose.attempts[index];
      if (!closed) throw new Error(`fixture lost ${name} attempt ${index}`);
      closed.cancel = closedByHost;
      const found = assessRetryFaultJourneys(stale).findings.filter((finding: { rule: string }) => finding.rule === "settled-attempt-cancelled-by-close");
      expect(found, `${name}[${index}]`).toHaveLength(1);
      expect(found[0].detail).toContain(closed.attemptId);
    }
    // a missing cancel record is not {requested:false} either
    const dropped = clone(clean());
    const bare = dropped.journeys.lostConnectionRetry.afterClose.attempts[1] as Partial<Attempt>;
    delete bare.cancel;
    expect(rules(dropped)).toContain("settled-attempt-cancelled-by-close");
    // controls: the clean fixture is silent, and an Attempt parked until the host closed keeps its host_closed cancel
    expect(rules(clean())).not.toContain("settled-attempt-cancelled-by-close");
    const parked = clean().journeys.dropBeforeAdmissionReply.afterClose.attempts[0];
    expect(parked?.cancel).toEqual(closedByHost);
    expect(rules(clean())).toEqual([]);
  });

  it("flags an operator retry that did not reach its own success", () => {
    const wire = clone(clean());
    wire.journeys.lostConnectionRetry.retriedWireStatus = "indeterminate";
    expect(rules(wire)).toContain("retry-not-settled");
    const record = clone(clean());
    const retry = record.journeys.dropBeforeAdmissionReply.beforeClose.attempts[1];
    if (!retry) throw new Error("fixture lost its attempts");
    retry.terminal = "failure";
    expect(rules(record)).toContain("retry-not-settled");
    const explicit = clone(clean());
    explicit.journeys.explicitUncertainRetry.wireStatuses = ["indeterminate", "failure"];
    expect(rules(explicit)).toContain("retry-not-settled");
  });

  it("flags any identity violation on the operator-retry and observer journeys", () => {
    for (const name of ["lostConnectionRetry", "explicitUncertainRetry", "observerNoControl", "dropBeforeAdmissionReply"] as const) {
      const violated = clone(clean());
      violated.journeys[name].afterClose.identityViolations = ["session session-x served 2 attempts"];
      expect(rules(violated)).toContain("identity-violation");
    }
  });

  it("flags a same-Attempt-id re-execution that was not recorded as a violation", () => {
    const silent = clone(clean());
    silent.journeys.sameAttemptReexecution.beforeClose.identityViolations = [];
    expect(rules(silent)).toContain("reexecution-unrecorded");
  });

  it("flags a Furnace-owned or adapter-owned retry premise in the disclosed limits", () => {
    const premise = clone(clean());
    premise.journeys.sameAttemptReexecution.beforeClose.limits.retry = "retries-once";
    expect(rules(premise)).toContain("furnace-retry-premise");
    const after = clone(clean());
    after.journeys.observerNoControl.afterClose.limits.retry = "furnace-retries";
    expect(rules(after)).toContain("furnace-retry-premise");
    // wb-lrz.1: the retired universal negative now misstates Furnace's recorded retry.* policy, so it is a flagged premise
    // too, and ONLY where it was planted: every clean journey and phase states the disclosed semantics.
    const retired = clone(clean());
    retired.journeys.lostConnectionRetry.beforeClose.limits.retry = "furnace-parks-never-retries";
    expect(premiseDetails(retired)).toEqual([`lostConnectionRetry before close: limits.retry is furnace-parks-never-retries, not ${LIMITS.retry}.`]);
    // wb-lrz.2: so is the opposite over-claim, Furnace retrying the two parked classes.
    const overClaim = clone(clean());
    overClaim.journeys.dropBeforeAdmissionReply.afterClose.limits.retry = "adapter-never-retries; furnace-auto-retries-work_failure-and-indeterminate";
    expect(premiseDetails(overClaim)).toEqual([`dropBeforeAdmissionReply after close: limits.retry is adapter-never-retries; furnace-auto-retries-work_failure-and-indeterminate, not ${LIMITS.retry}.`]);
  });

  it("flags limits that misstate crash durability, Observe, per-Attempt identity or reply bounds", () => {
    for (const [key, value] of [
      ["crashDurability", "durable"],
      ["observe", "supported"],
      ["identity", "per-run"],
      ["replyBounds", "bounded"],
    ] as const) {
      const misstated = clone(clean());
      misstated.journeys.lostConnectionRetry.beforeClose.limits[key] = value;
      expect(rules(misstated)).toContain("limits-misstated");
    }
  });

  it("flags an observer that gained control: an accepted or echoing cancel, an aborted workflow, a cancelled owner Attempt", () => {
    const accepted = clone(clean());
    accepted.journeys.observerNoControl.cancelReply = { protocol_version: 1, op: "cancel", request_id: "oc", output: { status: "request_received" } };
    expect(rules(accepted)).toContain("observer-gained-control");
    const echoed = clone(clean());
    echoed.journeys.observerNoControl.cancelReply = { protocol_version: 1, op: "cancel", request_id: "oc", output: { status: "unknown_execution", execution_id: "ex-frn-atm-o1" } };
    expect(rules(echoed)).toContain("observer-gained-control");
    const misrouted = clone(clean());
    misrouted.journeys.observerNoControl.cancelReply = { protocol_version: 1, op: "cancel", request_id: "other", output: { status: "unknown_execution" } };
    expect(rules(misrouted)).toContain("observer-gained-control");
    const aborted = clone(clean());
    aborted.journeys.observerNoControl.aborted = true;
    expect(rules(aborted)).toContain("observer-gained-control");
    const ownerCancelled = clone(clean());
    const owner = ownerCancelled.journeys.observerNoControl.beforeClose.attempts[0];
    if (!owner) throw new Error("fixture lost its attempts");
    owner.cancel = { requested: true, reason: "operator_stop" };
    owner.terminal = "cancelled";
    expect(rules(ownerCancelled)).toContain("observer-gained-control");
    const ownerWire = clone(clean());
    ownerWire.journeys.observerNoControl.ownerWireStatus = "cancelled";
    expect(rules(ownerWire)).toContain("observer-gained-control");
  });

  it("flags an Observe reply that is anything but the stated unsupported answer", () => {
    const faked = clone(clean());
    faked.journeys.observerNoControl.observeReply = { protocol_version: 1, op: "observe", request_id: "oo", output: { status: "success" } };
    expect(rules(faked)).toContain("observe-faked");
    const leaking = clone(clean());
    leaking.journeys.observerNoControl.observeReply = { protocol_version: 1, op: "observe", request_id: "oo", output: { status: "unsupported", execution_id: "ex-frn-atm-o1" } };
    expect(rules(leaking)).toContain("observe-faked");
    const wrongVersion = clone(clean());
    wrongVersion.journeys.observerNoControl.observeReply = { protocol_version: 2, op: "observe", request_id: "oo", output: { status: "unsupported" } };
    expect(rules(wrongVersion)).toContain("observe-faked");
  });

  it("is not realised when a journey is missing or unarmed or the SDK copy is not the recorded repaired one, and produces no finding for it", () => {
    for (const name of RETRY_FAULT_JOURNEYS as readonly (keyof Observed["journeys"])[]) {
      const unarmed = clone(clean());
      unarmed.journeys[name].armed = false;
      const assessed = assessRetryFaultJourneys(unarmed);
      expect(assessed.realised).toBe(false);
      expect(assessed.findings).toEqual([]);
      const missing = clone(clean()) as unknown as { sdk: Observed["sdk"]; journeys: Record<string, unknown> };
      delete missing.journeys[name];
      expect(assessRetryFaultJourneys(missing).realised).toBe(false);
    }
    const shipped = clone(clean());
    shipped.sdk.copy = "shipped";
    expect(assessRetryFaultJourneys(shipped).realised).toBe(false);
    const digest = clone(clean());
    digest.sdk.repairedDigest = "sha256:short";
    expect(assessRetryFaultJourneys(digest).realised).toBe(false);
    const noSdk = clone(clean()) as unknown as Partial<Observed>;
    delete noSdk.sdk;
    expect(assessRetryFaultJourneys(noSdk).realised).toBe(false);
    expect(assessRetryFaultJourneys({ journeys: {} }).realised).toBe(false);
    expect(assessRetryFaultJourneys(undefined as never).realised).toBe(false);
  });
});

describe("furnace-hosted retry-fault receipt: arming facts", () => {
  it("is not realised when a journey claims armed without the facts that show its fault was injected and observed", () => {
    const mutants: [string, (observed: Observed) => void][] = [
      ["lost connection never dropped", (o) => { o.journeys.lostConnectionRetry.droppedAfterStarted = false; }],
      ["lost-connection retry never answered", (o) => { o.journeys.lostConnectionRetry.retriedWireStatus = null; }],
      ["explicit-uncertain journey saw one terminal", (o) => { o.journeys.explicitUncertainRetry.wireStatuses = ["indeterminate"]; }],
      ["same-id journey saw one terminal", (o) => { o.journeys.sameAttemptReexecution.wireStatuses = ["success"]; }],
      ["observer cancel unanswered", (o) => { o.journeys.observerNoControl.cancelReply = null; }],
      ["observer observe unanswered", (o) => { o.journeys.observerNoControl.observeReply = null; }],
      ["owner workflow never ran", (o) => { o.journeys.observerNoControl.aborted = null; }],
      ["owner terminal never seen", (o) => { o.journeys.observerNoControl.ownerWireStatus = null; }],
      ["execute line never flushed and dropped", (o) => { o.journeys.dropBeforeAdmissionReply.droppedBeforeReply = false; }],
      ["admission reply was read before the drop", (o) => { o.journeys.dropBeforeAdmissionReply.admissionReplySeen = true; }],
      ["first Attempt never reached the host", (o) => { o.journeys.dropBeforeAdmissionReply.firstReachedHost = false; }],
      ["drop-before-reply retry never answered", (o) => { o.journeys.dropBeforeAdmissionReply.retriedWireStatus = null; }],
    ];
    for (const [label, mutate] of mutants) {
      const observed = clone(clean());
      mutate(observed);
      const assessed = assessRetryFaultJourneys(observed);
      expect({ label, realised: assessed.realised }).toEqual({ label, realised: false });
    }
  });
});

describe("furnace-hosted retry-fault receipt: evidence-grade shape", () => {
  it("builds a frozen passing FIXTURE-tier receipt that names the repaired SDK copy, the scratch rule and every per-scenario outcome", () => {
    const built = buildRetryFaultReceipt(receiptInput(clean()));
    expect(RETRY_FAULT_RECEIPT_CONTRACT).toBe("workbench.furnace-hosted-retry-fault/v1");
    expect(built.contract).toBe(RETRY_FAULT_RECEIPT_CONTRACT);
    expect(RETRY_FAULT_TIER).toBe("fixture");
    expect(built.tier).toBe("fixture");
    expect(built.tierStatement).toBe(RETRY_FAULT_TIER_STATEMENT);
    expect(RETRY_FAULT_TIER_STATEMENT).toMatch(/^FIXTURE tier:/);
    expect(RETRY_FAULT_TIER_STATEMENT).toMatch(/REPAIRED copy of the vendored @furnace\/sdk/);
    expect(RETRY_FAULT_TIER_STATEMENT).toMatch(/no Furnace binary, no live Run/);
    expect(RETRY_FAULT_TIER_STATEMENT).toMatch(/wb-3hc/);
    expect(built.limitsStatement).toBe("no crash durability (controller or Pi death leaves running Attempts needing operator recovery); Observe unsupported; per-Attempt identity");
    expect(RETRY_FAULT_LIMITS_STATEMENT).toBe(built.limitsStatement);
    for (const field of ["utc", "revision", "revisionClean", "node", "arch", "platform", "sdk", "scratch", "journeys", "findings", "diagnostics", "realised", "pass"]) {
      expect(built).toHaveProperty(field);
    }
    expect(built.revision).toBe("0123456789abcdef0123456789abcdef01234567");
    expect(built.revisionClean).toBe(true);
    expect(built.sdk).toEqual({ copy: "repaired", repairedDigest: `sha256:${"e".repeat(64)}`, shippedManifestDigest: `sha256:${"b".repeat(64)}` });
    expect(built.scratch).toEqual({ source: "xdg-runtime-dir" });
    expect(built.pass).toBe(true);
    expect(built.realised).toBe(true);
    expect(Object.isFrozen(built)).toBe(true);
    expect(Object.isFrozen(built.journeys)).toBe(true);
    expect(Object.isFrozen(built.journeys.lostConnectionRetry.afterClose.attempts[0])).toBe(true);
    // per-scenario outcomes: attempt ids, session ids, terminals, markers, identity violations and the observer replies
    expect(built.journeys.lostConnectionRetry.beforeClose.attempts.map((a: Attempt) => [a.attemptId, a.sessionInstanceId, a.terminal])).toEqual([
      ["frn-atm-r1", "session-frn-atm-r1", "pending"],
      ["frn-atm-r2", "session-frn-atm-r2", "success"],
    ]);
    expect(built.journeys.explicitUncertainRetry.markersAfterClose).toEqual(["frn-atm-u1", "frn-atm-u2"]);
    expect(built.journeys.sameAttemptReexecution.beforeClose.identityViolations).toEqual(["attempt frn-atm-same executed 2 times"]);
    expect(built.journeys.observerNoControl.cancelReply.output).toEqual({ status: "unknown_execution" });
    expect(built.journeys.observerNoControl.observeReply.output).toEqual({ status: "unsupported" });
  });

  it("records a /tmp fallback with its reason and never records the scratch path itself", () => {
    const fallback = buildRetryFaultReceipt({ ...receiptInput(clean()), scratch: { path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" } });
    expect(fallback.scratch).toEqual({ source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" });
    expect(JSON.stringify(buildRetryFaultReceipt(receiptInput(clean())))).not.toContain("/run/user/1000");
    expect(buildRetryFaultReceipt({ ...receiptInput(clean()), scratch: undefined }).scratch).toBeNull();
  });

  it("does not pass with findings, nor when not realised, and maps the runner exit codes 0/1/2", () => {
    const passing = buildRetryFaultReceipt(receiptInput(clean()));
    expect(exitCodeFor(passing)).toBe(0);
    const duplicate = clone(clean());
    duplicate.journeys.explicitUncertainRetry.markersAfterClose = ["frn-atm-u1", "frn-atm-u1", "frn-atm-u2"];
    const withFindings = buildRetryFaultReceipt(receiptInput(duplicate));
    expect(withFindings.realised).toBe(true);
    expect(withFindings.pass).toBe(false);
    expect(exitCodeFor(withFindings)).toBe(1);
    const unarmed = clone(clean());
    unarmed.journeys.observerNoControl.armed = false;
    const notRealised = buildRetryFaultReceipt(receiptInput(unarmed));
    expect(notRealised.realised).toBe(false);
    expect(notRealised.pass).toBe(false);
    expect(exitCodeFor(notRealised)).toBe(2);
  });

  it("reduces absolute paths in diagnostics to basenames and rejects a receipt without identifying fields", () => {
    const built = buildRetryFaultReceipt({ ...receiptInput(clean()), diagnostics: ["not realised: Cannot find module /work/tree/dist/workbench/hosts/furnace-hosted.js"] });
    const text = JSON.stringify(built);
    expect(text).not.toMatch(/\/work\/tree\//);
    expect(text).toContain("furnace-hosted.js");
    for (const field of ["utc", "revision", "node", "arch", "platform"]) {
      expect(() => buildRetryFaultReceipt({ ...receiptInput(clean()), [field]: "" })).toThrow(new RegExp(field));
    }
    expect(buildRetryFaultReceipt({ ...receiptInput(clean()), revisionClean: "yes" }).revisionClean).toBeNull();
  });
});

describe("furnace-hosted retry-fault receipt: module, runner and helper boundaries", () => {
  const receiptModule = readRepo("qa/workbench/furnace-hosted-retry-fault-receipt.mjs");
  const runner = readRepo("qa/workbench/furnace-hosted-retry-fault.mjs");
  const loader = readRepo("qa/workbench/furnace-hosted-repaired-sdk.mjs");
  const journeys = readRepo("test/helpers/furnace-hosted-retry-journeys.ts");

  it("keeps the receipt module pure: its only import is the wb-0kg.1 path scrubber, no clock or random source", () => {
    expect(specifiersOf(receiptModule)).toEqual(["./local-detached-faults-receipt.mjs"]);
    expect(receiptModule).toMatch(/import \{basenameOnly\} from '\.\/local-detached-faults-receipt\.mjs';/);
    expect(receiptModule).not.toMatch(/\brequire\s*\(|\bimport\s*\(/);
    expect(receiptModule).not.toMatch(/Date\.now|new Date\(|Math\.random|process\./);
  });

  it("drives the BUILT adapter through the default-gate journeys and the shared repaired-SDK loader; it reaches no Furnace binary, verb, doctor or probe", () => {
    expect(specifiersOf(runner).filter((specifier) => specifier.startsWith("."))).toEqual(["./furnace-hosted-retry-fault-receipt.mjs", "./furnace-hosted-repaired-sdk.mjs"]);
    // node can load these at runtime: dist is plain ESM and the journeys helper has type-only project imports. The wb-zmd
    // TypeScript helper is NOT loaded here (wb-g5o gives it runtime ./scratch.js -> vitest and src imports).
    expect(dynamicImportsOf(runner)).toEqual(["../../dist/workbench/hosts/furnace-hosted.js", "../../dist/workbench/capability-registry.js", "../../test/helpers/furnace-hosted-retry-journeys.ts"]);
    expect(runner).not.toContain("furnace-sdk-repaired.ts");
    expect(runner).not.toMatch(/\bsrc\//);
    expect(runner).not.toMatch(/\brequire\s*\(/);
    expect(runner).not.toMatch(/['"](?:doctor|furnace-capability-probe[\w-]*)['"]|spawn\(|execFile(?:Sync)?\(\s*['"]furnace/);
    expect(journeys).not.toMatch(/['"](?:doctor|furnace-capability-probe[\w-]*)['"]|spawn\(|execFile(?:Sync)?\(/);
    expect(runner).not.toMatch(/mkdtempSync|cpSync|smithy_model_digest/);
    expect(journeys).toContain("createClient");
    expect(journeys).not.toMatch(/new\s+\w*\.?Furnace\s*\(/);
  });

  it("keeps the repaired-SDK loader to node builtins and to ONE rewrite: the manifest's smithy_model_digest", () => {
    expect(specifiersOf(loader).every((specifier) => specifier.startsWith("node:"))).toBe(true);
    // its only dynamic import is computed: the three SDK modules inside the copied package, never a project file
    expect(dynamicImportsOf(loader)).toEqual([]);
    expect(loader.match(/\bimport\(/g)).toHaveLength(1);
    expect(loader).toContain("import(pathToFileURL(join(root, path)).href)");
    expect(loader).not.toMatch(/\brequire\s*\(\s*["']\./);
    expect(loader.match(/writeFileSync\(/g)).toHaveLength(1);
    expect(loader).toContain("writeFileSync(manifestPath, manifest.replace(shippedManifestDigest, repairedDigest));");
    expect(loader).toMatch(/smithy_model_digest/);
    expect(loader).toMatch(/dispose = \(\) => rmSync\(holder, \{recursive: true, force: true\}\)/);
    expect(loader).toMatch(/catch \(error\) \{\n\s*dispose\(\);\n\s*throw error;/);
  });

  it("prints the receipt BEFORE any file write, exits 3 when the write fails, and removes the repaired copy in finally", () => {
    expect(runner).toContain("FURNACE_HOSTED_RETRY_FAULT_RECEIPT");
    const printed = runner.indexOf("console.log(line)");
    const written = runner.indexOf("writeFileSync(target");
    expect(printed).toBeGreaterThan(0);
    expect(written).toBeGreaterThan(printed);
    expect(runner).toMatch(/return 3;/);
    expect(runner).toMatch(/finally\s*\{/);
    expect(runner).toMatch(/finally \{\n\s*if \(repaired\) repaired\.dispose\(\);/);
    expect(runner).toMatch(/chooseScratchBase\(process\.env\)/);
  });

  it("keeps the journeys helper to erasable TypeScript so node can strip it, and imports every adapter type as a type", () => {
    expect(journeys).not.toMatch(/^\s*(?:export\s+)?(?:const\s+)?enum\s/m);
    expect(journeys).not.toMatch(/^\s*(?:export\s+)?(?:declare\s+)?namespace\s/m);
    expect(journeys).not.toMatch(/constructor\s*\([^)]*\b(?:readonly|private|public|protected)\s/);
    const projectImports = [...journeys.matchAll(/^import\b.*from\s+"([^"]+)";$/gm)].filter((match) => !match[1].startsWith("node:"));
    expect(projectImports.length).toBeGreaterThan(0);
    for (const match of projectImports) expect(match[0]).toMatch(/^import type \{/);
  });

  it("registers the runner as ONE additive Forge command outside the default gate, between furnace-observe and furnace-hosted-live", () => {
    const forge = readRepo("forge.toml");
    const block = '[build.commands.furnace-hosted-retry-fault]\ncommand = "node qa/workbench/furnace-hosted-retry-fault.mjs"\ntimeout = 120\n';
    expect(forge).toContain(block);
    expect(forge.match(/\[build\.commands\.furnace-hosted-retry-fault\]/g)).toHaveLength(1);
    expect(forge).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).not.toContain("furnace-hosted-retry-fault");
    const at = forge.indexOf(block);
    expect(forge.indexOf("[build.commands.furnace-observe]")).toBeLessThan(at);
    expect(forge.indexOf("[build.commands.furnace-hosted-live]")).toBeGreaterThan(at);
  });
});

describe("furnace-hosted retry-fault receipt: runner exit paths (spawned, no built adapter)", () => {
  const QA_FILES = ["furnace-hosted-retry-fault.mjs", "furnace-hosted-retry-fault-receipt.mjs", "furnace-hosted-repaired-sdk.mjs", "local-detached-faults-receipt.mjs"];
  /** The runner and its qa imports in a scratch tree with no dist/ and no git repository above it. */
  function stage(): string {
    const root = mkdtempSync(join(tmpdir(), "pf04-runner-"));
    mkdirSync(join(root, "qa/workbench"), { recursive: true });
    for (const name of QA_FILES) copyFileSync(fileURLToPath(new URL(`../qa/workbench/${name}`, import.meta.url)), join(root, "qa/workbench", name));
    return root;
  }
  function run(root: string, receiptPath: string) {
    return spawnSync(process.execPath, [join(root, "qa/workbench/furnace-hosted-retry-fault.mjs")], {
      encoding: "utf8",
      timeout: 60_000,
      env: { ...process.env, FURNACE_HOSTED_RETRY_FAULT_RECEIPT: receiptPath, GIT_CEILING_DIRECTORIES: dirname(root) },
    });
  }

  it("prints ONE receipt line, exits 2 (not realised) when the built adapter is absent, and writes the same line to the receipt path", () => {
    const root = stage();
    try {
      const target = join(root, "receipt.json");
      const result = run(root, target);
      expect(result.status).toBe(2);
      const lines = result.stdout.trim().split("\n");
      expect(lines).toHaveLength(1);
      const receipt = JSON.parse(lines[0] ?? "{}");
      expect(receipt).toMatchObject({ contract: RETRY_FAULT_RECEIPT_CONTRACT, tier: "fixture", realised: false, pass: false, revision: "working-tree", revisionClean: null, sdk: null, scratch: null, journeys: {}, findings: [] });
      expect(receipt.diagnostics).toHaveLength(1);
      expect(receipt.diagnostics[0]).toMatch(/^not realised: .*furnace-hosted\.js/);
      expect(lines[0]).not.toContain(root);
      expect(readFileSync(target, "utf8")).toBe(`${lines[0]}\n`);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("still prints the receipt but exits 3 when the receipt path cannot be written", () => {
    const root = stage();
    try {
      const result = run(root, join(root, "missing-dir", "receipt.json"));
      expect(result.status).toBe(3);
      expect(JSON.parse(result.stdout.trim()).contract).toBe(RETRY_FAULT_RECEIPT_CONTRACT);
      expect(result.stderr).toContain("the receipt is printed above; writing it to $FURNACE_HOSTED_RETRY_FAULT_RECEIPT failed");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
