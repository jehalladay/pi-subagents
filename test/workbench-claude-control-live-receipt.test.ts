/**
 * wb-a2g.12 (VC-1/W16 residual): the live claude interrupt adverse cancellation journey receipt judges what it claims.
 *
 * Offline, no credential and no network: the pure assessor (test/helpers/claude-control-live-receipt.ts) is driven with an
 * evidence record that satisfies every rule and with one mutant per rule, so an assessor that returned a constant or
 * ignored a field would fail here. The live suite is read as text (its imports, its executor mirror of src/index.ts, its
 * retention-hook mirror and its tier wiring), never executed: it runs only from `forge run claude-control-live`.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CLAUDE_CONTROL_RECONCILE, CLAUDE_INTERRUPT_NO_RECEIPT, CLAUDE_INTERRUPT_OUTCOMES } from "../src/workbench/claude-control.js";
import {
  assess,
  type BootedBlock,
  buildReceipt,
  CONTRACT,
  DENY_POLICIES,
  EVIDENCE_CLASS,
  echoFromAckRef,
  FINDING_RULES,
  GRANT,
  MARKER,
  NO_RECEIPT,
  NON_CLAIMS,
  OUTCOME_BY_TERMINAL,
  OWNERSHIP_SOURCE,
  PHASES,
  type PhaseRecord,
  RECONCILE,
  REQUIRED_SCENARIOS,
  type ReceiptEvidence,
  SCENARIOS,
  STRICT_BOOTED_CITATIONS,
  truthLabelOf,
  UNREALISED_STEPS,
} from "./helpers/claude-control-live-receipt.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readRepo = (relative: string): string => readFileSync(join(ROOT, relative), "utf8");

const LIVE_SUITE = "test/workbench-claude-control-live.test.ts";
const HELPER = "test/helpers/claude-control-live-receipt.ts";
const LIVE_CONFIG = "vitest.claude-control-live.config.ts";
const FORGE_BLOCK = '[build.commands.claude-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.claude-control-live.config.ts"\ntimeout = 900\n';
const DETACHED_BLOCK = '[build.commands.detached-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.detached-control-live.config.ts"\ntimeout = 600\n';
const FURNACE_BLOCK = '[build.commands.furnace-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.furnace-control-live.config.ts"\ntimeout = 900\n';
const FORGE_CONTROL_BLOCK = '[build.commands.forge-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.forge-control-live.config.ts"\ntimeout = 600\n';
const GATE_LINE = 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]';

// Hand-built evidence. Every literal is a plain fake placeholder shaped like the live suite's recorded values; the
// measured block below carries the terminal shape the receipt of record measured (regenerated from it, never asserted).
const T = (second: number): string => `2026-10-17T13:00:${String(second).padStart(2, "0")}Z`;
const requestIdOf = (digit: string): string => `ctl_${digit.repeat(32)}`;
const sessionOf = (n: number): string => `11111111-2222-4333-8444-5555555555${String(n).padStart(2, "0")}`;
const POLICY = "exact-grant+confirmed-owner+operator-confirmed";
const SCOPE_WS = "/tmp/wb-ccl-fake000";
/**
 * The terminal shape the measurement run recorded (forge cmd_e5c184dc1c81, 2026-10-17, rows J1/J2/J8 identical): recorded
 * values the fixture carries, never asserted by a rule. A real SDK interrupt ends the turn as an error_during_execution result
 * (is_error true, stop_reason null, terminal_reason aborted_streaming, the assistant frame aborted), which the observer reads
 * as the failed terminal and the landed mapping settles as unknown; the SDK answered interrupt() with an empty
 * interrupt_receipt_v1 receipt.
 */
const MEASURED = {
  observerTerminal: "failed",
  freshness: "current",
  resultSubtype: "error_during_execution",
  isError: true,
  stopReason: null,
  terminalReason: "aborted_streaming",
  assistantAborted: true,
  hostOk: false,
  hostError: "Claude SDK query failed: Claude Code returned an error result: [ede_diagnostic] result_type=user last_content_type=n/a stop_reason=null",
  nativeAckRef: "claude-agent-sdk:interrupt_receipt_v1:still_queued=0",
  servedModel: "openai.gpt-6.1-sol",
  statsBefore: { nodes: 5, events: 72, edges: 5 },
  statsAfter: { nodes: 5, events: 73, edges: 5 },
  streamIngestsAcross: 1,
} as const;
const MEASURED_OUTCOME = OUTCOME_BY_TERMINAL[MEASURED.observerTerminal];

interface Row {
  scenario: string;
  session: number;
  requestDigit: string;
  tag: string;
}
const ROWS: readonly Row[] = [
  { scenario: SCENARIOS.adverse, session: 1, requestDigit: "a", tag: "a" },
  { scenario: SCENARIOS.sibling, session: 2, requestDigit: "b", tag: "b" },
  { scenario: SCENARIOS.settled, session: 6, requestDigit: "c", tag: "c" },
  { scenario: SCENARIOS.ambiguous, session: 7, requestDigit: "d", tag: "d" },
  { scenario: SCENARIOS.revoked, session: 8, requestDigit: "e", tag: "e" },
  { scenario: SCENARIOS.strictBooted, session: 10, requestDigit: "f", tag: "f" },
];
const rowOf = (scenario: string): Row => {
  const row = ROWS.find(candidate => candidate.scenario === scenario);
  if (row === undefined) throw new Error(`no fixture row for ${scenario}`);
  return row;
};
const SIBLING_SESSION = sessionOf(3);
const DENIED_SESSION = sessionOf(4);
const OBSERVER_SESSION = sessionOf(5);
const REVOKED_SECOND_SESSION = sessionOf(9);
const ackRefOf = (stillQueued: number): string => `claude-agent-sdk:interrupt_receipt_v1:still_queued=${stillQueued}`;
const resultRefOf = (session: string, terminal: string, second: number): string => `claude-agent-sdk:session:${session}:${terminal}@${T(second)}`;

function target(session: string): { provider: string; type: string; id: string } {
  return { provider: "claude-agent-sdk", type: "session", id: session };
}
function requested(row: Row, second = 10): PhaseRecord {
  const session = sessionOf(row.session);
  return {
    scenario: row.scenario, phase: "requested", at: T(second), text: `workflow_control interrupt of ${session}`,
    fields: {
      phase: "requested", requestId: requestIdOf(row.requestDigit), grant: GRANT, policy: POLICY, ownershipConfirmationRef: session, target: target(session),
      decidedAt: T(second), sessionObservedAt: T(second - 2), midStreamBasis: { assistantCharacters: 417 },
    },
  };
}
function acknowledged(row: Row, nativeAckRef: string = MEASURED.nativeAckRef): PhaseRecord {
  const echo = nativeAckRef === NO_RECEIPT ? { receipt: "none" as const } : { receipt: "interrupt_receipt_v1" as const, stillQueued: 0, stillQueuedIds: [], idsTruncated: false };
  return {
    scenario: row.scenario, phase: "acknowledged", at: T(11), text: "interrupt() answered; the tool reply echoed the adapter's nativeAckRef",
    fields: { phase: "acknowledged", status: "acknowledged", requestId: requestIdOf(row.requestDigit), nativeAckRef, acknowledgedAt: T(11), echo },
  };
}
function measurement(row: Row, ackToTerminalMs = 376): PhaseRecord {
  return {
    scenario: row.scenario, phase: "terminal-measurement", at: T(12), text: "the interrupted call's own terminal, as the observer reported it",
    fields: {
      phase: "terminal-measurement", sessionId: sessionOf(row.session), observerTerminal: MEASURED.observerTerminal, freshness: MEASURED.freshness, resultSubtype: MEASURED.resultSubtype,
      isError: MEASURED.isError, stopReason: MEASURED.stopReason, terminalReason: MEASURED.terminalReason, assistantAborted: MEASURED.assistantAborted,
      hostResult: { ok: MEASURED.hostOk, skipped: false, errorSanitized: MEASURED.hostError }, observedAt: T(12), ackToTerminalMs,
    },
  };
}
function result(row: Row, resultDrivenBy: "harness-tee" | "production-wiring" = "harness-tee"): PhaseRecord {
  const session = sessionOf(row.session);
  return {
    scenario: row.scenario, phase: "result", at: T(13),
    text: resultDrivenBy === "harness-tee" ? "settled by the harness tee from the observed terminal" : "settled by the production observer path from the call's own terminal",
    fields: {
      phase: "result", requestId: requestIdOf(row.requestDigit), outcome: MEASURED_OUTCOME, nativeResultRef: resultRefOf(session, MEASURED.observerTerminal, 12), settledAt: T(13),
      resultDrivenBy,
    },
  };
}
function denied(scenario: string, policy: string, category: string): PhaseRecord {
  return {
    scenario, phase: "denied", at: T(10), text: `typed ${policy} denial`,
    fields: { phase: "denied", policy, category, status: "refused", invoked: false, seamCalls: 0 },
  };
}
function uncertain(row: Row, reason: string, failure?: { category: string; code?: string }): PhaseRecord {
  return {
    scenario: row.scenario, phase: "uncertain", at: T(11), text: `parked ${reason}`,
    fields: { phase: "uncertain", requestId: requestIdOf(row.requestDigit), status: "uncertain", reason, ...(failure ? { failure } : {}), seamCalls: 1, retried: false },
  };
}
function observerClose(): PhaseRecord {
  return {
    scenario: SCENARIOS.observer, phase: "observer-close", at: T(12), text: "two projection reads then the view closed while the session streamed on",
    fields: {
      phase: "observer-close", projectionStatsBefore: JSON.stringify(MEASURED.statsBefore), projectionStatsAfter: JSON.stringify(MEASURED.statsAfter),
      streamIngestsAcross: MEASURED.streamIngestsAcross, seamCalls: 0, targetTerminalAfter: "succeeded",
    },
  };
}
function sibling(): PhaseRecord {
  const row = rowOf(SCENARIOS.sibling);
  return {
    scenario: SCENARIOS.sibling, phase: "sibling", at: T(14), text: "the sibling session reached its own terminal",
    fields: { phase: "sibling", siblingSessionId: SIBLING_SESSION, targetSessionId: sessionOf(row.session), siblingTerminal: "succeeded", siblingSeamCalls: 0, siblingOk: true },
  };
}
const STRICT_SESSION = sessionOf(10);
const STRICT_TASK = "wf_fake0000strict";
const STRICT_DETAIL = `REALISED by the booted strict row: the booted extension admitted ${STRICT_SESSION} after its system/init through the registered workflow_control and the production`
  + ` observer path settled the acknowledged interrupt from the call's own terminal. Citation: ${STRICT_BOOTED_CITATIONS.join(", ")}.`;
function strictAcknowledged(): PhaseRecord {
  const row = rowOf(SCENARIOS.strictBooted);
  return {
    scenario: row.scenario, phase: "acknowledged", at: T(11), text: "the booted tool reply echoed the adapter's nativeAckRef; the echo is parsed from that reply's own ref",
    fields: {
      phase: "acknowledged", status: "acknowledged", requestId: requestIdOf(row.requestDigit), nativeAckRef: MEASURED.nativeAckRef, acknowledgedAt: T(11),
      echo: { receipt: "interrupt_receipt_v1", stillQueued: 0 }, echoBasis: "parsed-from-ref",
    },
  };
}
function strictMeasurement(): PhaseRecord {
  const row = rowOf(SCENARIOS.strictBooted);
  return {
    scenario: row.scenario, phase: "terminal-measurement", at: T(12), text: "the booted call's own terminal as the production observer reported it; the raw SDK result frame is host-internal, so its fields are null",
    fields: {
      phase: "terminal-measurement", sessionId: STRICT_SESSION, observerTerminal: MEASURED.observerTerminal, freshness: MEASURED.freshness, resultSubtype: null,
      isError: null, stopReason: null, terminalReason: null, assistantAborted: null,
      hostResult: { ok: MEASURED.hostOk, skipped: false, errorSanitized: MEASURED.hostError }, observedAt: T(12), ackToTerminalMs: 376,
    },
  };
}
function bootedBlock(): BootedBlock {
  const row = rowOf(SCENARIOS.strictBooted);
  const requestId = requestIdOf(row.requestDigit);
  const nativeResultRef = resultRefOf(STRICT_SESSION, MEASURED.observerTerminal, 12);
  return {
    extension: "src/index.js", backend: "claude", tool: "workflow_control", taskId: STRICT_TASK, sessionId: STRICT_SESSION, requestId,
    nativeAckRef: MEASURED.nativeAckRef, auditPhases: ["requested", "acknowledged", "result"], outcome: MEASURED_OUTCOME, nativeResultRef,
    acknowledgedAt: T(11), settledAt: T(13), nodeFreshness: "stale", evidenceRefs: [`control-receipt:${requestId}`, `native-result:${nativeResultRef}`],
    logs: [], controlCalls: 1, seamBasis: "sdk-ack-echo", homeRestored: true,
    ownership: { statedBy: "production-observer", source: OWNERSHIP_SOURCE, nativeConfirmationRef: STRICT_SESSION, to: { provider: "pi-workflow", type: "agent-call", id: `${STRICT_TASK}:0` } },
  };
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
function replyOf(scenario: string, body: { [key: string]: Json }): { scenario: string; raw: string } {
  return { scenario, raw: JSON.stringify({ contract: "workbench.tool-reply/v1", tool: "workflow_control", completion: "not-asserted", ...body }) };
}
function acknowledgedReply(row: Row, nativeAckRef: string = MEASURED.nativeAckRef): { scenario: string; raw: string } {
  return replyOf(row.scenario, {
    ok: true, invoked: true, status: "acknowledged",
    control: { status: "acknowledged", phase: "acknowledged", requested: { requestId: requestIdOf(row.requestDigit), grant: GRANT, policy: POLICY }, acknowledged: { acknowledgedAt: T(11), nativeAckRef }, completionBasis: "not-established" },
  });
}
function deniedReply(scenario: string, policy: string, category: string): { scenario: string; raw: string } {
  return replyOf(scenario, { ok: false, invoked: false, status: "refused", control: { status: "denied", category, policy, effect: "none" }, error: { code: policy, category, message: "fixed refusal text" } });
}
function uncertainReply(row: Row): { scenario: string; raw: string } {
  return replyOf(row.scenario, { ok: true, invoked: true, status: "uncertain", control: { status: "requested", phase: "requested", requested: { requestId: requestIdOf(row.requestDigit) }, completionBasis: "not-established" } });
}
const NO_LIVE_QUERY_REPLY = replyOf(SCENARIOS.settled, {
  ok: false, invoked: true, status: "refused", control: { status: "requested", phase: "requested" },
  error: { code: "no-live-query", category: "unavailable", message: "No live Claude SDK query is retained in this process for the target session." },
});

function satisfying(): ReceiptEvidence {
  const adverse = rowOf(SCENARIOS.adverse);
  const strict = rowOf(SCENARIOS.strictBooted);
  const siblingRow = rowOf(SCENARIOS.sibling);
  const settled = rowOf(SCENARIOS.settled);
  const ambiguous = rowOf(SCENARIOS.ambiguous);
  const revoked = rowOf(SCENARIOS.revoked);
  const phases: PhaseRecord[] = [
    requested(adverse), acknowledged(adverse), measurement(adverse), result(adverse),
    requested(siblingRow), acknowledged(siblingRow), measurement(siblingRow, 364), result(siblingRow), sibling(),
    denied(SCENARIOS.denied, "observer-only", "authorization"), denied(SCENARIOS.denied, "missing-exact-grant", "authorization"), denied(SCENARIOS.denied, "operator-confirmation", "validation"),
    observerClose(),
    denied(SCENARIOS.crossScope, "cross-scope", "authorization"), denied(SCENARIOS.crossScope, "cross-scope", "authorization"), denied(SCENARIOS.crossScope, "cross-scope", "authorization"),
    requested(settled), uncertain(settled, "seam-failure", { category: "query-closed" }),
    measurement(ambiguous, -1), requested(ambiguous), uncertain(ambiguous, "wait-timeout"),
    requested(revoked), acknowledged(revoked), measurement(revoked, 362), result(revoked), denied(SCENARIOS.revoked, "missing-exact-grant", "authorization"),
    requested(strict), strictAcknowledged(), strictMeasurement(), result(strict, "production-wiring"),
  ];
  const scenarios: ReceiptEvidence["scenarios"] = {};
  for (const name of REQUIRED_SCENARIOS) scenarios[name] = { realised: true, detail: `${name} measured` };
  const strictBooted = { realised: true as const, detail: STRICT_DETAIL, booted: bootedBlock() };
  scenarios[SCENARIOS.strictBooted] = { realised: true, detail: STRICT_DETAIL };
  const sessions = [adverse, siblingRow, settled, ambiguous, revoked, strict].map(row => sessionOf(row.session));
  return {
    utc: T(30), command: "forge run claude-control-live (./node_modules/.bin/vitest run --config vitest.claude-control-live.config.ts)",
    revision: "0123456789abcdef0123456789abcdef01234567", dirty: false,
    sources: { [LIVE_SUITE]: "00".repeat(32), [HELPER]: "11".repeat(32) },
    toolchain: { node: "v24.0.0", vitest: "4.1.10", sdk: "@anthropic-ai/claude-agent-sdk@0.3.300" },
    host: { platform: "linux", arch: "x64", release: "0.0.0-fake", hostname: "fake-host", pid: 4242 },
    requestedModel: "claude-opus-5-5", servedModel: MEASURED.servedModel, servedModelSource: "assistant", initModel: "claude-opus-5-5",
    constants: { INIT_WATCHDOG_MS: 90_000, RUN_CEILING_MS: 120_000, ACK_WAIT_BOUND_MS: 20_000, SESSION_LOOKUP_BOUND_MS: 3_000, SETTLE_WAIT_BOUND_MS: 30_000, TEXT_CAP: 400, retries: 0 },
    grants: { permitted: [GRANT, "workbench:observe"], denied: [["workbench:observe"], ["control:forge.cancel"], [GRANT]] },
    scenarios,
    phases,
    nativeReferences: {
      sessionIds: [...sessions, SIBLING_SESSION, DENIED_SESSION, OBSERVER_SESSION, REVOKED_SECOND_SESSION],
      controlRequestIds: [adverse, siblingRow, settled, ambiguous, revoked, strict].map(row => requestIdOf(row.requestDigit)),
      nativeAckRefs: [MEASURED.nativeAckRef],
      nativeResultRefs: [adverse, siblingRow, revoked, strict].map(row => resultRefOf(sessionOf(row.session), MEASURED.observerTerminal, 12)),
      ownershipConfirmationRefs: [...sessions, SIBLING_SESSION, DENIED_SESSION, OBSERVER_SESSION, REVOKED_SECOND_SESSION],
    },
    verbCounts: { seam: { interrupt: 5 } },
    replies: [
      acknowledgedReply(adverse), acknowledgedReply(siblingRow),
      deniedReply(SCENARIOS.denied, "observer-only", "authorization"), deniedReply(SCENARIOS.denied, "missing-exact-grant", "authorization"), deniedReply(SCENARIOS.denied, "operator-confirmation", "validation"),
      deniedReply(SCENARIOS.crossScope, "cross-scope", "authorization"),
      NO_LIVE_QUERY_REPLY, uncertainReply(settled), uncertainReply(ambiguous),
      acknowledgedReply(revoked), deniedReply(SCENARIOS.revoked, "missing-exact-grant", "authorization"),
      acknowledgedReply(strict),
    ],
    ownership: { seededBy: "harness", source: OWNERSHIP_SOURCE, nativeConfirmationRef: sessionOf(adverse.session) },
    strictBooted,
    nonClaims: [...NON_CLAIMS],
    workspaces: [SCOPE_WS],
    unrealised: [],
  };
}

const rulesOf = (evidence: ReceiptEvidence & { truthLabel?: string }): string[] => assess(evidence).findings.map(finding => finding.rule);
const phase = (evidence: ReceiptEvidence, scenario: string, kind: string, nth = 0): PhaseRecord => {
  const found = evidence.phases.filter(entry => entry.scenario === scenario && entry.phase === kind)[nth];
  if (found === undefined) throw new Error(`no ${kind} phase ${nth} for ${scenario}`);
  return found;
};
type Fields<P extends PhaseRecord["fields"]["phase"]> = Extract<PhaseRecord["fields"], { phase: P }>;
function fieldsOf<P extends PhaseRecord["fields"]["phase"]>(evidence: ReceiptEvidence, scenario: string, kind: P, nth = 0): Fields<P> {
  const found = phase(evidence, scenario, kind, nth).fields;
  if (found.phase !== kind) throw new Error(`fields of ${scenario} ${kind} are typed ${found.phase}`);
  return found as Fields<P>;
}
/** Rewrites the acknowledged reply of a scenario so the reply still echoes a changed tee value (keeps the echo rule quiet). */
function reechoReply(evidence: ReceiptEvidence, scenario: string, requestId: string, nativeAckRef: string): void {
  const index = evidence.replies.findIndex(reply => reply.scenario === scenario && reply.raw.includes(requestId) && reply.raw.includes('"acknowledged"'));
  if (index < 0) throw new Error(`no acknowledged reply for ${scenario}`);
  const parsed = JSON.parse(evidence.replies[index]?.raw ?? "{}") as { control: { acknowledged: { nativeAckRef: string } } };
  parsed.control.acknowledged.nativeAckRef = nativeAckRef;
  evidence.replies[index] = { scenario, raw: JSON.stringify(parsed) };
}

describe("wb-a2g.12 live claude control receipt: assessor (O1)", () => {
  it("accepts evidence that satisfies every rule: realised, no findings, label live SDK pass, non-claims stamped", () => {
    const receipt = buildReceipt(satisfying());
    expect(receipt).toMatchObject({ contract: CONTRACT, evidenceClass: EVIDENCE_CLASS, realised: true, pass: true, findings: [], unrealised: [], truthLabel: "live SDK pass" });
    expect(receipt.nonClaims).toEqual([...NON_CLAIMS]);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.phases)).toBe(true);
    expect(truthLabelOf(receipt)).toBe("live SDK pass");
    expect(truthLabelOf({ realised: true, pass: false })).toBe("live run with findings");
    expect(truthLabelOf({ realised: false, pass: false })).toBe("not realised");
  });

  it("interrupt-verb-count: the counted seam equals one interrupt per MIRRORED acknowledged or uncertain phase; folding the strict booted verb into the total (6) or dropping a mirrored one (4) is a finding", () => {
    const extra = satisfying();
    extra.verbCounts.seam.interrupt = 6;
    expect(rulesOf(extra)).toEqual(["interrupt-verb-count"]);
    const missing = satisfying();
    missing.verbCounts.seam.interrupt = 4;
    expect(rulesOf(missing)).toEqual(["interrupt-verb-count"]);
  });

  it("control-call-on-observer-close: a seam call counted across the observer close is a finding", () => {
    const evidence = satisfying();
    fieldsOf(evidence, SCENARIOS.observer, "observer-close").seamCalls = 1;
    expect(rulesOf(evidence)).toEqual(["control-call-on-observer-close"]);
  });

  it("denial-reached-seam: a denial recorded with a seam call, invoked true, a status other than refused or a policy outside the core's is a finding", () => {
    for (const mutate of [
      (fields: Fields<"denied">) => { fields.seamCalls = 1; },
      (fields: Fields<"denied">) => { fields.invoked = true; },
      (fields: Fields<"denied">) => { fields.status = "acknowledged"; },
      (fields: Fields<"denied">) => { fields.policy = "made-up-policy"; },
    ]) {
      const evidence = satisfying();
      mutate(fieldsOf(evidence, SCENARIOS.denied, "denied"));
      expect(rulesOf(evidence)).toEqual(["denial-reached-seam"]);
    }
    expect([...DENY_POLICIES]).toEqual(["unknown-permission-data", "observer-only", "malformed-request", "unknown-action", "missing-exact-grant", "cross-scope", "no-confirmed-ownership", "operator-confirmation"]);
  });

  it("acknowledged-not-echoed: an acknowledged phase naming another request than its requested phase, or a tool reply whose nativeAckRef differs from the teed adapter's, is a finding", () => {
    const request = satisfying();
    fieldsOf(request, SCENARIOS.adverse, "acknowledged").requestId = requestIdOf("9");
    // The renamed acknowledgement also leaves the scenario's result without its acknowledged phase, so both rules speak.
    expect(rulesOf(request)).toEqual(["acknowledged-not-echoed", "result-without-native-echo"]);
    const reply = satisfying();
    reechoReply(reply, SCENARIOS.adverse, requestIdOf("a"), ackRefOf(2));
    expect(rulesOf(reply)).toEqual(["acknowledged-not-echoed"]);
    const silent = satisfying();
    silent.replies = silent.replies.filter(entry => entry.scenario !== SCENARIOS.adverse);
    expect(rulesOf(silent)).toEqual(["acknowledged-not-echoed"]);
  });

  it("ack-not-sdk-shaped: a nativeAckRef that is neither the no-receipt marker nor the interrupt_receipt_v1 count form, an echo that disagrees with it, or a flag-shaped survivor id is a finding", () => {
    const shape = satisfying();
    const minted = "claude-agent-sdk:interrupt_receipt_v1:still_queued=many";
    fieldsOf(shape, SCENARIOS.adverse, "acknowledged").nativeAckRef = minted;
    reechoReply(shape, SCENARIOS.adverse, requestIdOf("a"), minted);
    expect(rulesOf(shape)).toEqual(["ack-not-sdk-shaped"]);
    const echo = satisfying();
    fieldsOf(echo, SCENARIOS.sibling, "acknowledged").echo = { receipt: "interrupt_receipt_v1", stillQueued: 3, stillQueuedIds: [], idsTruncated: true };
    expect(rulesOf(echo)).toEqual(["ack-not-sdk-shaped"]);
    const kind = satisfying();
    fieldsOf(kind, SCENARIOS.adverse, "acknowledged").nativeAckRef = NO_RECEIPT;
    reechoReply(kind, SCENARIOS.adverse, requestIdOf("a"), NO_RECEIPT);
    expect(rulesOf(kind)).toEqual(["ack-not-sdk-shaped"]);
    const older = satisfying();
    fieldsOf(older, SCENARIOS.adverse, "acknowledged").nativeAckRef = NO_RECEIPT;
    fieldsOf(older, SCENARIOS.adverse, "acknowledged").echo = { receipt: "none" };
    reechoReply(older, SCENARIOS.adverse, requestIdOf("a"), NO_RECEIPT);
    expect(rulesOf(older)).toEqual([]);
    const survivor = satisfying();
    const ref = ackRefOf(1);
    fieldsOf(survivor, SCENARIOS.sibling, "acknowledged").nativeAckRef = ref;
    fieldsOf(survivor, SCENARIOS.sibling, "acknowledged").echo = { receipt: "interrupt_receipt_v1", stillQueued: 1, stillQueuedIds: ["--flag-shaped"], idsTruncated: false };
    reechoReply(survivor, SCENARIOS.sibling, requestIdOf("b"), ref);
    expect(rulesOf(survivor)).toEqual(["ack-not-sdk-shaped"]);
  });

  it("result-without-native-echo: a result lacking the session:<id>:<terminal>@<instant> reference, naming another terminal than the measured one, driven by the wrong settler (the strict row by anything but the production wiring, a mirrored one by anything but the harness tee), or standing without its acknowledged phase is a finding", () => {
    const ref = satisfying();
    fieldsOf(ref, SCENARIOS.adverse, "result").nativeResultRef = `claude-agent-sdk:session:${sessionOf(1)}:acknowledged`;
    expect(rulesOf(ref)).toEqual(["result-without-native-echo"]);
    const terminal = satisfying();
    fieldsOf(terminal, SCENARIOS.adverse, "result").nativeResultRef = resultRefOf(sessionOf(1), "observation_lost", 12);
    expect(rulesOf(terminal)).toEqual(["result-without-native-echo"]);
    const driver = satisfying() as ReceiptEvidence;
    (fieldsOf(driver, SCENARIOS.adverse, "result") as { resultDrivenBy: string }).resultDrivenBy = "production-wiring";
    expect(rulesOf(driver)).toEqual(["result-without-native-echo"]);
    const teeOnStrict = satisfying() as ReceiptEvidence;
    (fieldsOf(teeOnStrict, SCENARIOS.strictBooted, "result") as { resultDrivenBy: string }).resultDrivenBy = "harness-tee";
    expect(rulesOf(teeOnStrict)).toEqual(["result-without-native-echo"]);
    const orphan = satisfying();
    orphan.phases = orphan.phases.filter(entry => !(entry.scenario === SCENARIOS.adverse && entry.phase === "acknowledged"));
    orphan.verbCounts.seam.interrupt = 4;
    expect(rulesOf(orphan)).toEqual(["result-without-native-echo"]);
  });

  it("result-outcome-undisclosed: an outcome other than the landed mapping of the measured terminal (unknown unless the terminal read cancelled, unknown whenever freshness is not current) is a finding", () => {
    const retrofit = satisfying();
    fieldsOf(retrofit, SCENARIOS.adverse, "result").outcome = "cancelled";
    expect(rulesOf(retrofit)).toEqual(["result-outcome-undisclosed"]);
    const stale = satisfying();
    fieldsOf(stale, SCENARIOS.sibling, "terminal-measurement").freshness = "unknown";
    fieldsOf(stale, SCENARIOS.sibling, "terminal-measurement").observerTerminal = "cancelled";
    fieldsOf(stale, SCENARIOS.sibling, "result").nativeResultRef = resultRefOf(sessionOf(2), "cancelled", 12);
    fieldsOf(stale, SCENARIOS.sibling, "result").outcome = "cancelled";
    expect(rulesOf(stale)).toEqual(["result-outcome-undisclosed"]);
    const honest = satisfying();
    fieldsOf(honest, SCENARIOS.sibling, "terminal-measurement").observerTerminal = "cancelled";
    fieldsOf(honest, SCENARIOS.sibling, "result").nativeResultRef = resultRefOf(sessionOf(2), "cancelled", 12);
    fieldsOf(honest, SCENARIOS.sibling, "result").outcome = "cancelled";
    expect(rulesOf(honest)).toEqual([]);
    expect(OUTCOME_BY_TERMINAL).toEqual(CLAUDE_INTERRUPT_OUTCOMES);
  });

  it("terminal-shape-undetermined: an interrupted journey without its measurement record, or a record missing any raw field, is a finding; the strict row's assistantAborted admits null but nothing else non-boolean, and a mirrored null is still a finding", () => {
    const missing = satisfying();
    missing.phases = missing.phases.filter(entry => !(entry.scenario === SCENARIOS.adverse && entry.phase === "terminal-measurement"));
    expect(rulesOf(missing)).toEqual(["terminal-shape-undetermined"]);
    for (const key of ["observerTerminal", "freshness", "resultSubtype", "isError", "stopReason", "terminalReason", "assistantAborted", "hostResult", "observedAt", "ackToTerminalMs"]) {
      const evidence = satisfying();
      delete (fieldsOf(evidence, SCENARIOS.adverse, "terminal-measurement") as unknown as Record<string, unknown>)[key];
      expect(rulesOf(evidence), key).toEqual(["terminal-shape-undetermined"]);
    }
    // The strict-only null admission (Q5) is not a blanket admission: an invented non-boolean on the strict row, or a null on a mirrored row, is the same finding.
    const strictInvented = satisfying();
    (fieldsOf(strictInvented, SCENARIOS.strictBooted, "terminal-measurement") as unknown as Record<string, unknown>).assistantAborted = "aborted";
    expect(rulesOf(strictInvented), "strict assistantAborted neither null nor boolean").toEqual(["terminal-shape-undetermined"]);
    const strictAbsent = satisfying();
    delete (fieldsOf(strictAbsent, SCENARIOS.strictBooted, "terminal-measurement") as unknown as Record<string, unknown>).assistantAborted;
    expect(rulesOf(strictAbsent), "strict assistantAborted absent").toEqual(["terminal-shape-undetermined"]);
    const mirroredNull = satisfying();
    (fieldsOf(mirroredNull, SCENARIOS.adverse, "terminal-measurement") as unknown as Record<string, unknown>).assistantAborted = null;
    expect(rulesOf(mirroredNull), "mirrored assistantAborted null").toEqual(["terminal-shape-undetermined"]);
  });

  it("uncertain-retried: an uncertain phase with two seam calls, retried true, or a status other than uncertain is a finding", () => {
    const twice = satisfying();
    fieldsOf(twice, SCENARIOS.settled, "uncertain").seamCalls = 2;
    expect(rulesOf(twice)).toEqual(["uncertain-retried"]);
    const retried = satisfying();
    fieldsOf(retried, SCENARIOS.ambiguous, "uncertain").retried = true;
    expect(rulesOf(retried)).toEqual(["uncertain-retried"]);
    const status = satisfying();
    fieldsOf(status, SCENARIOS.ambiguous, "uncertain").status = "acknowledged";
    expect(rulesOf(status)).toEqual(["uncertain-retried"]);
  });

  it("sibling-changed: a sibling that did not reach its own succeeded terminal, a seam call naming it, a failed sibling result, or a sibling that is the target is a finding", () => {
    for (const mutate of [
      (fields: Fields<"sibling">) => { fields.siblingTerminal = "cancelled"; },
      (fields: Fields<"sibling">) => { fields.siblingSeamCalls = 1; },
      (fields: Fields<"sibling">) => { fields.siblingOk = false; },
      (fields: Fields<"sibling">) => { fields.siblingSessionId = fields.targetSessionId; },
    ]) {
      const evidence = satisfying();
      mutate(fieldsOf(evidence, SCENARIOS.sibling, "sibling"));
      expect(rulesOf(evidence)).toEqual(["sibling-changed"]);
    }
  });

  it("session-affected-by-close: a node or edge changed across the close, an event the watched stream did not ingest itself, or a watched session that read cancelled after the close, is a finding; the stream's own events are not", () => {
    const topology = satisfying();
    fieldsOf(topology, SCENARIOS.observer, "observer-close").projectionStatsAfter = JSON.stringify({ ...MEASURED.statsAfter, edges: MEASURED.statsAfter.edges + 1 });
    expect(rulesOf(topology)).toEqual(["session-affected-by-close"]);
    const unexplained = satisfying();
    fieldsOf(unexplained, SCENARIOS.observer, "observer-close").streamIngestsAcross = 0;
    expect(rulesOf(unexplained)).toEqual(["session-affected-by-close"]);
    const unreadable = satisfying();
    fieldsOf(unreadable, SCENARIOS.observer, "observer-close").projectionStatsBefore = "not stats";
    expect(rulesOf(unreadable)).toEqual(["session-affected-by-close"]);
    const cancelled = satisfying();
    fieldsOf(cancelled, SCENARIOS.observer, "observer-close").targetTerminalAfter = "cancelled";
    expect(rulesOf(cancelled)).toEqual(["session-affected-by-close"]);
    // The measured run: one claude.stream event ingested by the watched session across the window, nodes and edges unchanged.
    expect(rulesOf(satisfying())).toEqual([]);
  });

  it("settled-call-terminal-minted: the settled-call journey without its typed no-live-query refusal, with that refusal rewritten as ok, or with a result phase is a finding", () => {
    const missing = satisfying();
    missing.replies = missing.replies.filter(reply => !reply.raw.includes("no-live-query"));
    expect(rulesOf(missing)).toEqual(["settled-call-terminal-minted"]);
    const rewritten = satisfying();
    rewritten.replies = rewritten.replies.map(reply => (reply.raw.includes("no-live-query") ? { ...reply, raw: reply.raw.replace('"ok":false', '"ok":true') } : reply));
    expect(rulesOf(rewritten)).toEqual(["settled-call-terminal-minted"]);
    const minted = satisfying();
    minted.phases.push({ ...result(rowOf(SCENARIOS.settled)) });
    expect(rulesOf(minted)).toContain("settled-call-terminal-minted");
  });

  it("phase-fields-missing: a phase with capped text but no typed fields, or fields of another phase, is a finding", () => {
    const missing = satisfying();
    missing.phases.push({ scenario: SCENARIOS.adverse, phase: "result", at: T(12), text: "free text only" } as unknown as PhaseRecord);
    expect(rulesOf(missing)).toEqual(["phase-fields-missing"]);
    const mislabelled = satisfying();
    (phase(mislabelled, SCENARIOS.adverse, "acknowledged") as { phase: string }).phase = "result";
    expect(rulesOf(mislabelled)).toContain("phase-fields-missing");
  });

  it("uncommitted-tree: a dirty tree, or one whose status could not be read, is a finding; the label follows", () => {
    const dirty = satisfying();
    dirty.dirty = true;
    expect(rulesOf(dirty)).toEqual(["uncommitted-tree"]);
    const unknown = satisfying();
    unknown.dirty = null;
    expect(rulesOf(unknown)).toEqual(["uncommitted-tree"]);
    expect(buildReceipt(dirty)).toMatchObject({ realised: true, pass: false, truthLabel: "live run with findings" });
  });

  it("ownership-undisclosed: an ownership block not stating the harness seeding from the system/init session_id, a requested phase whose confirmation ref is not its target session, or drifted non-claims is a finding", () => {
    const production = satisfying();
    (production.ownership as { seededBy: string }).seededBy = "production";
    expect(rulesOf(production)).toEqual(["ownership-undisclosed"]);
    const source = satisfying();
    (source.ownership as { source: string }).source = "projectClaudeTopology";
    expect(rulesOf(source)).toEqual(["ownership-undisclosed"]);
    const foreign = satisfying();
    fieldsOf(foreign, SCENARIOS.adverse, "requested").ownershipConfirmationRef = "frn-req-attempts-01";
    expect(rulesOf(foreign)).toEqual(["ownership-undisclosed"]);
    const strictForeign = satisfying();
    fieldsOf(strictForeign, SCENARIOS.strictBooted, "requested").ownershipConfirmationRef = "frn-req-attempts-02";
    expect(rulesOf(strictForeign)).toEqual(["ownership-undisclosed"]);
    const drift = satisfying();
    drift.nonClaims = drift.nonClaims.map(claim => claim.replace("never", "always"));
    expect(rulesOf(drift)).toEqual(["ownership-undisclosed"]);
    const unlisted = satisfying();
    unlisted.nativeReferences.ownershipConfirmationRefs = [];
    expect(rulesOf(unlisted)).toEqual(["ownership-undisclosed"]);
  });

  it("label-mismatch: a record labelled live SDK pass that carries a finding is one finding more", () => {
    const evidence: ReceiptEvidence & { truthLabel?: string } = satisfying();
    evidence.dirty = true;
    evidence.truthLabel = "live SDK pass";
    expect(rulesOf(evidence)).toEqual(["uncommitted-tree", "label-mismatch"]);
    const honest = { ...satisfying(), truthLabel: "live SDK pass" };
    expect(rulesOf(honest)).toEqual([]);
  });

  it("booted-block-inconsistent: a realised strict block whose identities, audit phases, ownership edge, counts, logs, freshness, settle order (or a non-instant stamp), home restoration or seam basis disagree with the strict phases is a finding", () => {
    const bootedOf = (evidence: ReceiptEvidence): Record<string, unknown> => {
      const strict = evidence.strictBooted;
      if (strict.realised !== true) throw new Error("the fixture is not realised");
      return strict.booted as unknown as Record<string, unknown>;
    };
    const mutants: Array<[string, (evidence: ReceiptEvidence) => void]> = [
      ["session-vs-confirmation", evidence => { (bootedOf(evidence).ownership as Record<string, unknown>).nativeConfirmationRef = sessionOf(2); }],
      ["requestId-vs-phases", evidence => { bootedOf(evidence).requestId = requestIdOf("9"); }],
      ["audit-missing-result", evidence => { bootedOf(evidence).auditPhases = ["requested", "acknowledged"]; }],
      ["result-ref-foreign-session", evidence => { bootedOf(evidence).nativeResultRef = resultRefOf(sessionOf(2), MEASURED.observerTerminal, 12); }],
      ["ack-ref-not-sdk-shaped", evidence => { bootedOf(evidence).nativeAckRef = "minted:ack"; }],
      ["two-control-calls", evidence => { bootedOf(evidence).controlCalls = 2; }],
      ["diagnostic-logs", evidence => { bootedOf(evidence).logs = ["workflow_control ctl: result not established (stale-observation)"]; }],
      ["node-freshness-not-stale", evidence => { bootedOf(evidence).nodeFreshness = "current"; }],
      ["settled-before-acknowledged", evidence => { bootedOf(evidence).settledAt = T(5); }],
      // Date.parse of a non-instant is NaN and NaN < x is false: the order check alone would pass two unreadable stamps.
      ["settled-at-not-instant", evidence => { bootedOf(evidence).settledAt = "not-an-instant"; }],
      ["acknowledged-at-not-instant", evidence => { bootedOf(evidence).acknowledgedAt = "later"; }],
      ["ownership-to-claude", evidence => { ((bootedOf(evidence).ownership as Record<string, unknown>).to as Record<string, unknown>).provider = "claude-agent-sdk"; }],
      ["home-not-restored", evidence => { bootedOf(evidence).homeRestored = false; }],
      ["counted-seam-basis", evidence => { bootedOf(evidence).seamBasis = "counted-seam"; }],
    ];
    for (const [name, mutate] of mutants) {
      const evidence = satisfying();
      mutate(evidence);
      expect(rulesOf(evidence), name).toEqual(["booted-block-inconsistent"]);
    }
    expect(rulesOf(satisfying())).toEqual([]);
  });

  it("ack-not-sdk-shaped (echo basis): the strict acknowledged phase must disclose echoBasis parsed-from-ref with its echo equal to echoFromAckRef(nativeAckRef); a mirrored phase claiming the basis is the same finding; echoFromAckRef parses both SDK answer forms", () => {
    expect(echoFromAckRef(NO_RECEIPT)).toEqual({ receipt: "none" });
    expect(echoFromAckRef(ackRefOf(0))).toEqual({ receipt: "interrupt_receipt_v1", stillQueued: 0 });
    expect(echoFromAckRef("claude-agent-sdk:interrupt_receipt_v1:still_queued=2:cancelled=1")).toEqual({ receipt: "interrupt_receipt_v1", stillQueued: 2, cancelled: 1 });
    expect(echoFromAckRef("not-an-sdk-answer")).toEqual({ receipt: "none" });
    const missingBasis = satisfying();
    delete (fieldsOf(missingBasis, SCENARIOS.strictBooted, "acknowledged") as unknown as Record<string, unknown>).echoBasis;
    expect(rulesOf(missingBasis)).toEqual(["ack-not-sdk-shaped"]);
    const mirroredBasis = satisfying();
    (fieldsOf(mirroredBasis, SCENARIOS.adverse, "acknowledged") as unknown as Record<string, unknown>).echoBasis = "parsed-from-ref";
    expect(rulesOf(mirroredBasis)).toEqual(["ack-not-sdk-shaped"]);
    const disagreeing = satisfying();
    fieldsOf(disagreeing, SCENARIOS.strictBooted, "acknowledged").echo = { receipt: "interrupt_receipt_v1", stillQueued: 0, stillQueuedIds: [], idsTruncated: false };
    expect(rulesOf(disagreeing)).toEqual(["ack-not-sdk-shaped"]);
  });

  it("the strict interrupt must be provably mid-stream like the mirrored adverse rows: a strict requested phase without a session observation instant is no-session-observed and one with zero streamed characters is not-mid-stream", () => {
    const unobserved = satisfying();
    (fieldsOf(unobserved, SCENARIOS.strictBooted, "requested") as unknown as Record<string, unknown>).sessionObservedAt = "";
    expect(assess(unobserved).unrealised[0]).toMatchObject({ step: "no-session-observed" });
    const early = satisfying();
    fieldsOf(early, SCENARIOS.strictBooted, "requested").midStreamBasis = { assistantCharacters: 0 };
    expect(assess(early).unrealised[0]).toMatchObject({ step: "not-mid-stream" });
  });

  it("unrealised steps pre-empt findings: a recorded step, an unrealised or missing required scenario, an uncited, parked or block-less strict reading, no assistant-frame served model, or an interrupt not provably mid-stream is not realised, never graded", () => {
    const recorded = satisfying();
    recorded.unrealised.push({ step: "credentials-unavailable", diagnostic: "CLAUDE_AUTH_REQUIRED: the preflight turn was refused" });
    recorded.dirty = true;
    const receipt = buildReceipt(recorded);
    expect(receipt).toMatchObject({ realised: false, pass: false, findings: [], truthLabel: "not realised" });
    expect(receipt.unrealised[0]).toMatchObject({ step: "credentials-unavailable" });
    const scenario = satisfying();
    scenario.scenarios[SCENARIOS.sibling] = { realised: false, detail: "sibling never reached running" };
    expect(assess(scenario).unrealised[0]).toMatchObject({ step: "scenario-unrealised" });
    const absent = satisfying();
    delete absent.scenarios[SCENARIOS.observer];
    expect(assess(absent).unrealised[0]).toMatchObject({ step: "scenario-unrealised" });
    const uncited = satisfying();
    uncited.scenarios[SCENARIOS.strictBooted] = { realised: true, detail: "realised with no citations" };
    uncited.strictBooted = { realised: true, detail: "realised with no citations", booted: bootedBlock() };
    const uncitedStop = assess(uncited).unrealised[0];
    expect(uncitedStop).toMatchObject({ step: "scenario-unrealised" });
    expect(uncitedStop?.diagnostic).toContain("wb-69g.4");
    const parked = satisfying();
    parked.scenarios[SCENARIOS.strictBooted] = { realised: false, detail: `pending until the booted row runs. Citation: ${STRICT_BOOTED_CITATIONS.join(", ")}.` };
    parked.strictBooted = { realised: false, detail: `pending until the booted row runs. Citation: ${STRICT_BOOTED_CITATIONS.join(", ")}.` };
    expect(assess(parked).unrealised[0]).toMatchObject({ step: "scenario-unrealised" });
    const blockless = satisfying();
    blockless.strictBooted = { realised: true, detail: STRICT_DETAIL } as ReceiptEvidence["strictBooted"];
    expect(assess(blockless).unrealised[0]).toMatchObject({ step: "scenario-unrealised" });
    const relayed = satisfying();
    relayed.servedModelSource = null;
    relayed.servedModel = null;
    expect(assess(relayed).unrealised[0]).toMatchObject({ step: "credentials-unavailable" });
    const early = satisfying();
    fieldsOf(early, SCENARIOS.adverse, "requested").midStreamBasis = { assistantCharacters: 0 };
    expect(assess(early).unrealised[0]).toMatchObject({ step: "not-mid-stream" });
  });

  it("refuses receipt input carrying a credential-shaped value (plain input hygiene; every token below is an obvious fake, not a real secret)", () => {
    const shaped = satisfying();
    shaped.replies.push({ scenario: SCENARIOS.adverse, raw: "Authorization: Bearer fake-not-a-token-000000" });
    expect(() => buildReceipt(shaped)).toThrow(/credential/);
    const prefixed = satisfying();
    prefixed.replies.push({ scenario: SCENARIOS.adverse, raw: "sk-ant-fake-not-a-key-000000000000" });
    expect(() => buildReceipt(prefixed)).toThrow(/credential/);
    const glued = satisfying();
    glued.replies.push({ scenario: SCENARIOS.adverse, raw: "x1Bearer fake-not-a-token-000000" });
    expect(() => buildReceipt(glued)).toThrow(/credential/);
    const named = satisfying() as ReceiptEvidence & { api_key?: string };
    named.api_key = "placeholder";
    expect(() => buildReceipt(named)).toThrow(/credential/);
    let message = "";
    try {
      buildReceipt(shaped);
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }
    expect(message).not.toContain("fake-not-a-token");
    expect(message).toContain("replies");
  });

  it("names the rules, steps, phases and scenarios exactly so a quiet rename is caught, and its adapter constants equal the landed adapter's", () => {
    expect([...FINDING_RULES]).toEqual([
      "interrupt-verb-count", "control-call-on-observer-close", "denial-reached-seam", "acknowledged-not-echoed", "ack-not-sdk-shaped", "result-without-native-echo",
      "result-outcome-undisclosed", "terminal-shape-undetermined", "uncertain-retried", "sibling-changed", "session-affected-by-close", "settled-call-terminal-minted",
      "phase-fields-missing", "uncommitted-tree", "ownership-undisclosed", "label-mismatch", "credential-shaped", "booted-block-inconsistent",
    ]);
    expect([...UNREALISED_STEPS]).toEqual(["credentials-unavailable", "no-seam", "no-session-observed", "not-mid-stream", "projection-seed-refused", "scenario-unrealised", "harness-failure"]);
    expect([...PHASES]).toEqual(["requested", "acknowledged", "result", "denied", "uncertain", "observer-close", "sibling", "terminal-measurement"]);
    expect([...REQUIRED_SCENARIOS]).toEqual([
      "credential-preflight", "adverse-interrupt-mid-stream", "sibling-unaffected", "denied-without-grant", "observer-close-interrupts-nothing", "cross-scope-denials",
      "interrupt-of-settled-typed-outcome", "ambiguous-interrupt-parks-uncertain", "revoked-grant-denies-next", "strict-booted-tool-reading",
    ]);
    expect(SCENARIOS.strictBooted).toBe("strict-booted-tool-reading");
    expect([...STRICT_BOOTED_CITATIONS]).toEqual(["wb-69g.4", "wb-hqa"]);
    expect(CONTRACT).toBe("workbench.claude-control-live/v1");
    expect(EVIDENCE_CLASS).toBe("live");
    expect(MARKER).toBe("CLAUDE_CONTROL_LIVE_RECEIPT");
    expect(OWNERSHIP_SOURCE).toBe("system/init session_id");
    expect(NO_RECEIPT).toBe(CLAUDE_INTERRUPT_NO_RECEIPT);
    expect(RECONCILE).toBe(CLAUDE_CONTROL_RECONCILE);
    expect(NON_CLAIMS).toHaveLength(4);
    for (const claim of NON_CLAIMS) expect(claim).not.toMatch(/to be filed/);
    expect(NON_CLAIMS.some(claim => claim.includes("wb-69g.4"))).toBe(true);
  });
});

describe("wb-a2g.12 tier wiring (O2)", () => {
  it("forge.toml ends with exactly one claude-control-live block appended after detached-control-live; the furnace adjacency and the gate line are unchanged", () => {
    const toml = readRepo("forge.toml");
    expect(toml.endsWith(`${DETACHED_BLOCK}\n${FORGE_BLOCK}\n[build.commands.census]\ncommand = "npm run test:census"\ntimeout = 300\nafter = ["test"]\nconsumes = ["test"]\n`)).toBe(true);
    expect(toml.match(/^\[build\.commands\.claude-control-live\]$/gm)).toHaveLength(1);
    expect(toml.match(/^\[build\.commands\.detached-control-live\]$/gm)).toHaveLength(1);
    expect(toml).toContain(`${FORGE_CONTROL_BLOCK}\n${FURNACE_BLOCK}`);
    expect(toml).toContain(`${GATE_LINE}\n`);
    expect(toml.match(/^gate = /gm)).toHaveLength(1);
    expect(/^gate = \[(.*)\]$/m.exec(toml)?.[0]).toBe(GATE_LINE);
  });

  it("vitest.config.ts excludes the live suite on its one exclude line beside the three control-live precedents and keeps allowOnly false", () => {
    const config = readRepo("vitest.config.ts");
    const excludeLines = config.split("\n").filter(line => line.includes("exclude:"));
    expect(excludeLines).toHaveLength(1);
    for (const file of [LIVE_SUITE, "test/workbench-forge-control-live.test.ts", "test/workbench-furnace-control-live.test.ts", "test/workbench-detached-control-live.test.ts"]) {
      expect(excludeLines[0]).toContain(`"${file}"`);
    }
    expect(config).toContain('include: ["test/**/*.test.ts"]');
    expect(config).toContain("allowOnly: false");
  });

  it("vitest.claude-control-live.config.ts is include-only for the live suite with the detached tier's stream-length timeouts, byte for byte", () => {
    expect(readRepo(LIVE_CONFIG)).toBe(`import { defineConfig } from "vitest/config";\nexport default defineConfig({ test: { include: ["${LIVE_SUITE}"], testTimeout: 240_000, hookTimeout: 120_000 } });\n`);
  });
});

const DYNAMIC_LOAD = /await\s+import\s*\(|\brequire\s*\(|import\s*\(\s*["'`]/;
const specifiersOf = (source: string): string[] => [...source.matchAll(/^import\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)].map(match => match[1] ?? "").sort();
const trimmedLines = (source: string): Set<string> => new Set(source.split("\n").map(line => line.trim()));

describe("wb-a2g.12 the live suite and the helper, read as text (O3)", () => {
  const suiteText = (): string => readRepo(LIVE_SUITE);
  const helperText = (): string => readRepo(HELPER);

  it("the live suite imports only node, vitest, the vendored SDK, the workbench modules it exercises, the workflow runtime and types, and the test helpers", () => {
    const suite = suiteText();
    const allowed = new Set([
      "@anthropic-ai/claude-agent-sdk", "vitest", "../src/index.js", "../src/workbench/control-tool.js", "../src/workbench/claude-control.js", "../src/workbench/control.js",
      "../src/workbench/capability-registry.js", "../src/workbench/claude-host.js", "../src/workbench/claude-transcript.js", "../src/workbench/observation.js",
      "../src/workbench/redaction.js", "../src/workflow/runtime.js", "../src/workflow/task.js", "../src/workflow/progress.js", "./helpers/boot-extension.js",
      "./helpers/scratch.js", "./helpers/claude-control-live-receipt.js",
    ]);
    for (const specifier of specifiersOf(suite)) expect(specifier.startsWith("node:") || allowed.has(specifier), specifier).toBe(true);
    expect(specifiersOf(suite)).toContain("./helpers/claude-control-live-receipt.js");
    expect(specifiersOf(suite)).toContain("../src/workbench/claude-host.js");
    expect(specifiersOf(suite)).toContain("@anthropic-ai/claude-agent-sdk");
    expect(specifiersOf(suite)).toContain("../src/index.js");
    expect(specifiersOf(suite)).toContain("./helpers/boot-extension.js");
    expect(suite).not.toMatch(DYNAMIC_LOAD);
    expect(suite).not.toMatch(/:\s*any\b|as\s+any\b|<any>/);
  });

  it("the live suite keeps the host's real seam, never exits or signals a process, never names a reconcile override, and binds every fixture to a tracked scratch", () => {
    const suite = suiteText();
    expect(suite).not.toContain("query:");
    expect(suite).not.toContain("reconcile:");
    expect(suite).not.toMatch(/process\.exit\s*\(/);
    expect(suite).not.toContain("process.kill");
    expect(suite).toMatch(/installScratchLeakGuard\(\)/);
    expect(suite).toMatch(/trackScratch\(/);
    expect(suite).not.toMatch(/mkdtempSync\(\s*join\(\s*tmpdir\(\)/);
    expect(suite).not.toMatch(/cwd:\s*process\.cwd\(\)/);
  });

  it("the live suite emits its receipt producer-side on the marker line with process.stdout.write, never console.log, and reads the receipt path before the env scrub", () => {
    const suite = suiteText();
    expect(suite).toContain("CLAUDE_CONTROL_LIVE_RECEIPT ");
    expect(suite).toContain("process.stdout.write");
    expect(suite).not.toContain("console.log");
    const receiptRead = suite.indexOf("process.env.CLAUDE_CONTROL_LIVE_RECEIPT");
    const scrub = suite.indexOf("delete process.env[");
    expect(receiptRead).toBeGreaterThan(0);
    expect(scrub).toBeGreaterThan(receiptRead);
  });

  it("every capped text sits in a phase record beside typed fields (wb-6hb.12)", () => {
    const capped = suiteText().split("\n").filter(line => line.includes(".slice(0,"));
    expect(capped.length).toBeGreaterThan(0);
    for (const line of capped) expect(line, line).toContain("fields");
  });

  it("the helper is pure: no imports, no dynamic load, no clock, no random source, no process access", () => {
    const helper = helperText();
    expect(specifiersOf(helper)).toEqual([]);
    expect(helper).not.toMatch(/^import\s/m);
    expect(helper).not.toMatch(DYNAMIC_LOAD);
    expect(helper).not.toMatch(/Date\.now|new Date\(|Math\.random|process\./);
    expect(helper).not.toMatch(/:\s*any\b|as\s+any\b|<any>/);
  });

  it("the live suite and the helper carry no retired Cut 1 strings: the strict reading is realised by J8b, never declared unrealised by construction", () => {
    const suite = suiteText();
    expect(suite).not.toContain("UNREALISED by construction");
    expect(suite).not.toContain("boots no extension");
    expect(suite).not.toContain("the only way a result exists live");
    expect(helperText()).not.toContain("UNREALISED by construction");
  });
});

describe("wb-a2g.12 the suite's claude executor and retention hooks mirror src/index.ts (O4)", () => {
  const index = readRepo("src/index.ts");
  const indexLines = trimmedLines(index);
  const SHARED_LINES = [
    "const key = liveClaudeSessions.get(request.target.id);",
    "const live = key !== undefined ? liveClaudeQueries.get(key) : undefined;",
    'throw Object.assign(new CapabilityError("unavailable", "No live Claude SDK query is retained in this process for the target session."), { code: "no-live-query" });',
    "const execution = await executeClaudeControl(decision, {",
    "seam: live.seam,",
    "call: { invocationId: live.invocationId, index: live.call.index, ...(live.sessionId !== undefined ? { sessionId: live.sessionId } : {}) },",
    "now: controlNow, timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),",
    "return { receipt: execution.receipt, status: execution.status };",
    "interface LiveClaudeQuery { readonly invocationId: string; readonly call: ClaudeCallIdentity; readonly seam: { interrupt(): Promise<unknown> }; sessionId?: string }",
    "const liveClaudeQueries = new Map<string, LiveClaudeQuery>();",
    "const liveClaudeSessions = new Map<string, string>();",
    `const liveClaudeKey = (invocationId: string, call: ClaudeCallIdentity): string => \`\${invocationId}:\${call.index}\`;`,
    'if (message.type === "system" && message.subtype === "init") {',
    "const live = liveClaudeQueries.get(liveClaudeKey(task.id, call));",
    "if (live !== undefined) { live.sessionId = message.session_id; liveClaudeSessions.set(message.session_id, liveClaudeKey(task.id, call)); }",
    "observer.onMessage(message, call);",
    "const key = liveClaudeKey(task.id, call);",
    "const live = liveClaudeQueries.get(key);",
    "if (live?.sessionId !== undefined && liveClaudeSessions.get(live.sessionId) === key) liveClaudeSessions.delete(live.sessionId);",
    "liveClaudeQueries.delete(key);",
  ];

  it("both files carry the leg, the retention maps and the hook bodies line for line", () => {
    const suiteLines = trimmedLines(readRepo(LIVE_SUITE));
    for (const line of SHARED_LINES) {
      expect(indexLines.has(line), `index.ts: ${line}`).toBe(true);
      expect(suiteLines.has(line), `live suite: ${line}`).toBe(true);
    }
    expect(index.match(/"No live Claude SDK query is retained in this process for the target session\."/g)).toHaveLength(1);
  });

  it("the suite's two disclosed substitutions are exactly the counted seam at the retention insertion and the execution tee after the adapter call", () => {
    const suite = readRepo(LIVE_SUITE);
    const suiteLines = trimmedLines(suite);
    expect(indexLines.has("onQueryLive: (call, seam) => { liveClaudeQueries.set(liveClaudeKey(task.id, call), { invocationId: task.id, call, seam }); },")).toBe(true);
    expect(suiteLines.has("onQueryLive: (call, seam) => { liveClaudeQueries.set(liveClaudeKey(task.id, call), { invocationId: task.id, call, seam: counted(seam) }); },")).toBe(true);
    expect(suiteLines.has("executions.set(execution.requested.requestId, execution);")).toBe(true);
    expect(indexLines.has("executions.set(execution.requested.requestId, execution);")).toBe(false);
    expect(suite).toContain("counts.interrupt += 1;");
  });
});
