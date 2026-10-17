/**
 * wb-a2g.12 (VC-1/W16 residual): the pure receipt module of the live claude interrupt adverse cancellation journey
 * (test/workbench-claude-control-live.test.ts). It imports nothing and reads no I/O, clock or random source: the live
 * suite gathers the evidence from real Claude Agent SDK sessions in disposable /tmp scratch workspaces, and the offline
 * suite (test/workbench-claude-control-live-receipt.test.ts) hands this module hand-built evidence; either way only the
 * evidence is judged.
 *
 * Judged (bead wb-a2g.12): exactly one interrupt() per permit at the counted seam (A1/A4), denials and observer closes that
 * never reach the seam (A4), acknowledged and result phases echoing the SDK's own interrupt receipt and the observed
 * terminal, never minted (A2), an interrupt of a settled call that stays a typed outcome, never a retrofitted terminal (A3),
 * an uncertain outcome parked after one verb and never retried, a sibling session unchanged, and a receipt bound to a
 * committed tree with typed fields beside every capped text (wb-6hb.12). The measured terminal shape is recorded, never a
 * finding trigger: the rules judge the acceptance invariants, not which terminal a real interrupt reads. Unrealised steps
 * pre-empt findings: an unmeasured claim is never graded. The receipt refuses input carrying a credential-shaped value
 * (plain input hygiene) and stamps its non-claims from module constants, so an overclaim is a drift the assessor sees.
 */

export const CONTRACT = "workbench.claude-control-live/v1";
/** Never "fixture": every journey here ran against the real vendored SDK and the deployed gateway. */
export const EVIDENCE_CLASS = "live";
export const MARKER = "CLAUDE_CONTROL_LIVE_RECEIPT";
export const TEXT_CAP = 400;
/** The one text cap: a capped text in a receipt always sits beside typed fields or a typed record. */
export const capped = (text: string): string => text.slice(0, TEXT_CAP);
export const GRANT = "control:claude-agent-sdk.interrupt";
export const PROVIDER = "claude-agent-sdk";
/** nativeAckRef of an interrupt() that resolved without a receipt (src/workbench/claude-control.ts CLAUDE_INTERRUPT_NO_RECEIPT, drift-pinned offline). */
export const NO_RECEIPT = "claude-agent-sdk:interrupt:no-receipt";
export const RECEIPT_V1_PREFIX = "claude-agent-sdk:interrupt_receipt_v1:still_queued=";
export const RESULT_REF_PREFIX = "claude-agent-sdk:session:";
/** The adapter's reconciliation guidance (CLAUDE_CONTROL_RECONCILE), spelled out because this module imports nothing; drift-pinned offline. */
export const RECONCILE = "Claude interrupt outcome unknown: no usable answer to this interrupt was established, so the query may or "
  + "may not have stopped. It remains uncertain and is not retried automatically; observe the call's terminal state and reconcile before any new "
  + "control request.";
/** The native statement the harness seeds the session-owns-call edge from: the SDK's own system/init session_id (owner ruling R1). */
export const OWNERSHIP_SOURCE = "system/init session_id";
/** The beads every strict booted-tool UNREALISED declaration must cite (owner ruling R2): the registration gap and the landed wiring bead. */
export const STRICT_BOOTED_CITATIONS: readonly string[] = Object.freeze(["wb-69g.4", "wb-hqa"]);
export const PHASES = Object.freeze(["requested", "acknowledged", "result", "denied", "uncertain", "observer-close", "sibling", "terminal-measurement"] as const);
export type Phase = (typeof PHASES)[number];
export const SCENARIOS = Object.freeze({
  preflight: "credential-preflight",
  adverse: "adverse-interrupt-mid-stream",
  sibling: "sibling-unaffected",
  denied: "denied-without-grant",
  observer: "observer-close-interrupts-nothing",
  crossScope: "cross-scope-denials",
  settled: "interrupt-of-settled-typed-outcome",
  ambiguous: "ambiguous-interrupt-parks-uncertain",
  revoked: "revoked-grant-denies-next",
  strictBooted: "strict-booted-tool-reading",
} as const);
/** Every scenario a realised receipt must have measured; the strict booted-tool reading is recorded unrealised by design. */
export const REQUIRED_SCENARIOS: readonly string[] = Object.freeze([
  SCENARIOS.preflight, SCENARIOS.adverse, SCENARIOS.sibling, SCENARIOS.denied, SCENARIOS.observer, SCENARIOS.crossScope, SCENARIOS.settled, SCENARIOS.ambiguous, SCENARIOS.revoked,
]);
/** The decision core's denial vocabulary (src/workbench/control.ts ControlDenyPolicy), spelled out because this module imports nothing. */
export const DENY_POLICIES: readonly string[] = Object.freeze([
  "unknown-permission-data", "observer-only", "malformed-request", "unknown-action", "missing-exact-grant", "cross-scope", "no-confirmed-ownership", "operator-confirmation",
]);
/** The observer's terminal roster (ClaudeNativeObservation.terminal). */
export const TERMINALS: readonly string[] = Object.freeze(["succeeded", "failed", "cancelled", "observation_lost"]);
/** The landed R2 mapping (CLAUDE_INTERRUPT_OUTCOMES, drift-pinned offline): only a cancelled terminal is an interrupted ending. */
export const OUTCOME_BY_TERMINAL: Readonly<Record<string, string>> = Object.freeze({
  succeeded: "unknown",
  failed: "unknown",
  cancelled: "cancelled",
  observation_lost: "unknown",
});
/** Measured violations, in the order assess reports them. */
export const FINDING_RULES = Object.freeze([
  "interrupt-verb-count",
  "control-call-on-observer-close",
  "denial-reached-seam",
  "acknowledged-not-echoed",
  "ack-not-sdk-shaped",
  "result-without-native-echo",
  "result-outcome-undisclosed",
  "terminal-shape-undetermined",
  "uncertain-retried",
  "sibling-changed",
  "session-affected-by-close",
  "settled-call-terminal-minted",
  "phase-fields-missing",
  "uncommitted-tree",
  "ownership-undisclosed",
  "label-mismatch",
  "credential-shaped",
] as const);
export type FindingRule = (typeof FINDING_RULES)[number];
/** Steps that did not run to the claimed measurement, in the order assess checks them. */
export const UNREALISED_STEPS = Object.freeze([
  "credentials-unavailable",
  "no-seam",
  "no-session-observed",
  "not-mid-stream",
  "projection-seed-refused",
  "scenario-unrealised",
  "harness-failure",
] as const);
export type UnrealisedStep = (typeof UNREALISED_STEPS)[number];
/** docs/workbench/14 "Truth labels and release gates" vocabulary: a live pass is distinct from a fixture pass. */
export type TruthLabel = "live SDK pass" | "live run with findings" | "not realised";
/**
 * W19 wording: what this receipt never claims, stamped from here. The live suite records the same list; a receipt whose
 * list differs carries an overclaim-class drift, reported under ownership-undisclosed.
 */
export const NON_CLAIMS: readonly string[] = Object.freeze([
  "no security claims beyond same-process authorization evidence",
  "no proof of Anthropic model inference: the served model is the gateway's answer recorded from an assistant frame",
  "no claim that Query.interrupt() is supported on string-prompt queries in general (one live measurement, wb-69g.4 stays BLOCKED)",
  "this tier's strict booted-tool reading is UNREALISED by construction: it mirrors the src/index.ts leg and boots no extension; the landed wiring (wb-hqa) is measured by the default-gate booted row; wb-69g.4 stays BLOCKED",
  "the result phases of this tier were settled by the harness tee from the teed execution (resultDrivenBy harness-tee), never by the production settle path this tier does not exercise",
  "completion never asserted; transport success is not domain verification",
]);

export interface NativeRef { provider: string; type: string; id: string; scope?: string }
/** The SDK's answer as the adapter observed it (ClaudeInterruptEcho). */
export interface InterruptEcho { receipt: "interrupt_receipt_v1" | "none"; stillQueued?: number; stillQueuedIds?: readonly string[]; idsTruncated?: boolean; cancelled?: number }
/** The host's WorkflowSpawnResult for the interrupted call, with its error through the one shared sanitizer. */
export interface HostResult { ok: boolean; skipped: boolean; errorSanitized: string }
export type PhaseFields =
  | { phase: "requested"; requestId: string; grant: string; policy: string; ownershipConfirmationRef: string; target: NativeRef; decidedAt: string; sessionObservedAt: string; midStreamBasis: { assistantCharacters: number } }
  | { phase: "acknowledged"; status: string; requestId: string; nativeAckRef: string; acknowledgedAt: string; echo: InterruptEcho }
  | { phase: "result"; requestId: string; outcome: string; nativeResultRef: string; settledAt: string; resultDrivenBy: "harness-tee" }
  | {
      phase: "terminal-measurement"; sessionId: string; observerTerminal: string; freshness: string; resultSubtype: string | null; isError: boolean | null; stopReason: string | null;
      terminalReason: string | null; assistantAborted: boolean; hostResult: HostResult; observedAt: string; ackToTerminalMs: number;
    }
  | { phase: "denied"; policy: string; category: string; status: string; invoked: boolean; seamCalls: number }
  | { phase: "uncertain"; requestId: string; status: string; reason: string; failure?: { category: string; code?: string }; seamCalls: number; retried: boolean }
  | { phase: "observer-close"; projectionStatsBefore: string; projectionStatsAfter: string; streamIngestsAcross: number; seamCalls: number; targetTerminalAfter: string }
  | { phase: "sibling"; siblingSessionId: string; targetSessionId: string; siblingTerminal: string; siblingSeamCalls: number; siblingOk: boolean };
/** One phase of one journey: a capped text for the eye and typed fields for the assessor, always together (wb-6hb.12). */
export interface PhaseRecord { scenario: string; phase: Phase; at: string; text: string; fields: PhaseFields }

/** How the harness seeded the ownership edge decideControl requires: disclosed, never presented as production-emitted. */
export interface Ownership { seededBy: "harness"; source: typeof OWNERSHIP_SOURCE; nativeConfirmationRef: string }
export interface NativeReferences { sessionIds: string[]; controlRequestIds: string[]; nativeAckRefs: string[]; nativeResultRefs: string[]; ownershipConfirmationRefs: string[] }
export interface Finding { rule: FindingRule; detail: string }
export interface Unrealised { step: UnrealisedStep; diagnostic: string }
/** Everything the live suite records; buildReceipt adds the judgement. */
export interface ReceiptEvidence {
  utc: string;
  command: string;
  revision: string;
  dirty: boolean | null;
  sources: Record<string, string>;
  toolchain: { node: string; vitest: string; sdk: string };
  host: { platform: string; arch: string; release: string; hostname: string; pid: number };
  requestedModel: string;
  /** From an assistant frame's message.model only: the gateway's answer, never the system/init echo. */
  servedModel: string | null;
  servedModelSource: "assistant" | null;
  /** The system/init model echo: recorded, never judged (relay honesty). */
  initModel: string | null;
  /** The disclosed bounds every wait ran under, and the retry cap (always 0). */
  constants: Record<string, number>;
  grants: { permitted: string[]; denied: string[][] };
  scenarios: Record<string, { realised: boolean; detail: string }>;
  phases: PhaseRecord[];
  nativeReferences: NativeReferences;
  verbCounts: { seam: { interrupt: number } };
  /** The exact tool-reply/v1 text the model would read: actual output. */
  replies: Array<{ scenario: string; raw: string }>;
  ownership: Ownership;
  strictBooted: { realised: false; detail: string };
  nonClaims: readonly string[];
  /** The disposable scratch workspaces every session ran in. */
  workspaces: string[];
  unrealised: Unrealised[];
}
export interface Receipt extends ReceiptEvidence {
  contract: typeof CONTRACT;
  evidenceClass: typeof EVIDENCE_CLASS;
  truthLabel: TruthLabel;
  findings: Finding[];
  realised: boolean;
  pass: boolean;
}
export interface Assessment { findings: Finding[]; unrealised: Unrealised[] }

/** An RFC 3339 instant (the host clock's ISO form or a producer's offset-qualified instant). */
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
const REQUEST_ID = /^ctl_[0-9a-f]{32}$/;
/** The SDK's own session id form as the live tiers observed it. */
const SESSION_ID = /^[0-9a-f-]{36}$/;
const RECEIPT_V1_REF = /^claude-agent-sdk:interrupt_receipt_v1:still_queued=(\d+)(?::cancelled=(\d+))?$/;
const RESULT_REF = /^claude-agent-sdk:session:([0-9a-f-]{36}):(succeeded|failed|cancelled|observation_lost)@(.+)$/;
/** A survivor id the adapter shows verbatim (claude-control.ts SURVIVOR_ID). */
const SURVIVOR_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const SURVIVORS_SHOWN = 16;
// Input hygiene (plain): a scheme and a token, a vendor key prefix, or a secret-named assignment or field, anywhere in the
// JSON text, in a value or in a key. Nothing it reads is displayed, so an over-refusal costs an honest throw, never a leak.
const CREDENTIAL = /(?<![a-z0-9])(?:bearer|basic)\s+[^\s,;"']{6,}|(?:sk-ant-|sk-proj-|ghp_|github_pat_)[a-z0-9_-]|(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)["']?\s*[:=]/i;
const SECRET_FIELD = /^(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)$/i;
/**
 * The live-adverse receipt builder's backstop (qa/workbench/live-adverse-receipt.mjs SECRET). Bearer is deliberately
 * UNANCHORED, the J7 pattern verbatim (/Bearer\s+\S+/i): the shared helper anchors its BEARER rule by ruled policy, so a
 * word-glued or JSON-escaped token (authBearer, x1Bearer, a literal backslash-n or backslash-t before Bearer) passes a
 * display pass as plain text and this builder is its only refusal. Basic keeps its word boundary (an ordinary word ending
 * in "basic" is not a credential scheme).
 */
const SECRET = /Bearer\s+\S+|\bBasic\s+\S+|sk-ant-|sk-proj-|ghp_|github_pat_|api[_-]?key|access[_-]?token|refresh[_-]?token|aws_secret_access_key|aws_session_token|(?:password|secret)["']?\s*[=:]/i;

const finding = (rule: FindingRule, detail: string): Finding => ({ rule, detail });
const unrealised = (step: UnrealisedStep, diagnostic: string): Unrealised => ({ step, diagnostic });
const isInstant = (value: unknown): value is string => typeof value === "string" && INSTANT.test(value);
const nonblank = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";

/** The paths of every credential-shaped string in the value, values and keys alike (keys are judged as field names too). */
function credentialPaths(value: unknown, path = "input", out: string[] = []): string[] {
  if (typeof value === "string") {
    if (CREDENTIAL.test(value) || SECRET.test(value)) out.push(path);
  } else if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) credentialPaths(item, `${path}[${index}]`, out);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (SECRET_FIELD.test(key) || CREDENTIAL.test(key) || SECRET.test(key)) out.push(`${path}.${key}`);
      credentialPaths(item, `${path}.${key}`, out);
    }
  }
  return out;
}
function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const item of Object.values(value as Record<string, unknown>)) deepFreeze(item);
  }
  return value;
}

type FieldsOf<P extends Phase> = Extract<PhaseFields, { phase: P }>;
function phasesOf<P extends Phase>(record: ReceiptEvidence, phase: P): Array<PhaseRecord & { fields: FieldsOf<P> }> {
  const out: Array<PhaseRecord & { fields: FieldsOf<P> }> = [];
  for (const entry of record.phases) {
    if (entry.phase === phase && entry.fields !== undefined && entry.fields !== null && entry.fields.phase === phase) out.push(entry as PhaseRecord & { fields: FieldsOf<P> });
  }
  return out;
}
const requestedOf = (record: ReceiptEvidence, scenario: string, requestId: string): FieldsOf<"requested"> | undefined =>
  phasesOf(record, "requested").find(entry => entry.scenario === scenario && entry.fields.requestId === requestId)?.fields;

/** A tool reply's parsed form, read defensively: raw text is actual output, never trusted to be JSON. */
interface ParsedReply {
  ok?: unknown;
  invoked?: unknown;
  status?: unknown;
  control?: { phase?: unknown; requested?: { requestId?: unknown }; acknowledged?: { nativeAckRef?: unknown } };
  error?: { code?: unknown; category?: unknown };
}
function parsedReplies(record: ReceiptEvidence, scenario: string): ParsedReply[] {
  const out: ParsedReply[] = [];
  for (const reply of record.replies) {
    if (reply.scenario !== scenario) continue;
    try {
      const parsed: unknown = JSON.parse(reply.raw);
      if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) out.push(parsed as ParsedReply);
    } catch {
      // not JSON: no echo can be read from it
    }
  }
  return out;
}

/** Why a terminal-measurement record is not a complete raw reading, in field order; empty when every field is present and typed. */
function measurementProblems(fields: FieldsOf<"terminal-measurement">): string[] {
  const problems: string[] = [];
  const raw = fields as unknown as Record<string, unknown>;
  if (!nonblank(raw.sessionId)) problems.push("sessionId");
  if (typeof raw.observerTerminal !== "string" || !TERMINALS.includes(raw.observerTerminal)) problems.push("observerTerminal");
  if (raw.freshness !== "current" && raw.freshness !== "unknown") problems.push("freshness");
  if (raw.resultSubtype !== null && typeof raw.resultSubtype !== "string") problems.push("resultSubtype");
  if (raw.isError !== null && typeof raw.isError !== "boolean") problems.push("isError");
  if (raw.stopReason !== null && typeof raw.stopReason !== "string") problems.push("stopReason");
  if (raw.terminalReason !== null && typeof raw.terminalReason !== "string") problems.push("terminalReason");
  if (typeof raw.assistantAborted !== "boolean") problems.push("assistantAborted");
  const host = raw.hostResult as Partial<HostResult> | undefined;
  if (host === undefined || host === null || typeof host !== "object" || typeof host.ok !== "boolean" || typeof host.skipped !== "boolean" || typeof host.errorSanitized !== "string") problems.push("hostResult");
  if (!isInstant(raw.observedAt)) problems.push("observedAt");
  if (typeof raw.ackToTerminalMs !== "number" || !Number.isFinite(raw.ackToTerminalMs)) problems.push("ackToTerminalMs");
  return problems;
}
const measurementOf = (record: ReceiptEvidence, scenario: string): FieldsOf<"terminal-measurement"> | undefined =>
  phasesOf(record, "terminal-measurement").find(entry => entry.scenario === scenario)?.fields;

function assessVerbCount(record: ReceiptEvidence, findings: Finding[]): void {
  const permits = phasesOf(record, "acknowledged").length + phasesOf(record, "uncertain").length;
  const seam = record.verbCounts.seam.interrupt;
  if (seam !== permits) findings.push(finding("interrupt-verb-count", `the counted seam issued ${seam} interrupt() calls for ${permits} acknowledged or uncertain phases`));
}
/** The projection's stats() as the suite serialised them; undefined when the text is not that shape. */
function statsOf(text: string): { nodes: number; events: number; edges: number } | undefined {
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed === null || typeof parsed !== "object") return undefined;
    const { nodes, events, edges } = parsed as Record<string, unknown>;
    return typeof nodes === "number" && typeof events === "number" && typeof edges === "number" ? { nodes, events, edges } : undefined;
  } catch {
    return undefined;
  }
}
/**
 * What a view close must never explain: a node or edge the close added or removed, or an event the watched stream did not
 * itself ingest (the mirrored production emitter keeps ingesting claude.stream events while the session streams, so the
 * event count grows by exactly the stream's own ingests across the window: the session's progress, never the close's).
 */
function assessObserverClose(record: ReceiptEvidence, findings: Finding[]): void {
  const control: string[] = [];
  const affected: string[] = [];
  for (const { scenario, fields } of phasesOf(record, "observer-close")) {
    if (fields.seamCalls !== 0) control.push(`${scenario}: ${fields.seamCalls} seam calls across the close`);
    const before = statsOf(fields.projectionStatsBefore);
    const after = statsOf(fields.projectionStatsAfter);
    if (before === undefined || after === undefined) affected.push(`${scenario}: projection stats are not readable (${fields.projectionStatsBefore} -> ${fields.projectionStatsAfter})`);
    else {
      if (before.nodes !== after.nodes || before.edges !== after.edges) affected.push(`${scenario}: projection topology ${fields.projectionStatsBefore} -> ${fields.projectionStatsAfter} across the close`);
      if (after.events - before.events !== fields.streamIngestsAcross) {
        affected.push(`${scenario}: ${after.events - before.events} events appeared across the close while the watched stream ingested ${fields.streamIngestsAcross}`);
      }
    }
    if (fields.targetTerminalAfter === "cancelled") affected.push(`${scenario}: the watched session read cancelled after the close`);
    else if (!TERMINALS.includes(fields.targetTerminalAfter)) affected.push(`${scenario}: the watched session read ${fields.targetTerminalAfter}, not a terminal of its own`);
  }
  if (control.length > 0) findings.push(finding("control-call-on-observer-close", control.join("; ")));
  if (affected.length > 0) findings.push(finding("session-affected-by-close", affected.join("; ")));
}
function assessDenials(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const { scenario, fields } of phasesOf(record, "denied")) {
    if (fields.seamCalls !== 0) problems.push(`${scenario} ${fields.policy}: ${fields.seamCalls} seam calls`);
    if (fields.invoked !== false) problems.push(`${scenario} ${fields.policy}: invoked ${String(fields.invoked)}`);
    if (fields.status !== "refused") problems.push(`${scenario} ${fields.policy}: status ${fields.status}`);
    if (!DENY_POLICIES.includes(fields.policy)) problems.push(`${scenario}: policy ${fields.policy} is not the core's`);
  }
  if (problems.length > 0) findings.push(finding("denial-reached-seam", problems.join("; ")));
}
function assessAcknowledged(record: ReceiptEvidence, findings: Finding[]): void {
  const echoProblems: string[] = [];
  const shapeProblems: string[] = [];
  for (const entry of phasesOf(record, "acknowledged")) {
    const { scenario, fields } = entry;
    const requested = requestedOf(record, scenario, fields.requestId);
    if (requested === undefined) echoProblems.push(`${scenario}: acknowledged ${fields.requestId} has no requested phase`);
    if (!REQUEST_ID.test(fields.requestId)) echoProblems.push(`${scenario}: ${fields.requestId} is not a core request id`);
    const echoing = parsedReplies(record, scenario).find(reply => reply.control?.requested?.requestId === fields.requestId);
    if (echoing === undefined) echoProblems.push(`${scenario}: no tool reply names ${fields.requestId}`);
    else if (echoing.control?.acknowledged?.nativeAckRef !== fields.nativeAckRef) echoProblems.push(`${scenario}: the reply's nativeAckRef differs from the adapter's ${fields.nativeAckRef}`);
    const match = RECEIPT_V1_REF.exec(fields.nativeAckRef);
    if (fields.nativeAckRef === NO_RECEIPT) {
      if (fields.echo?.receipt !== "none") shapeProblems.push(`${scenario}: no-receipt answer echoed as ${JSON.stringify(fields.echo)}`);
    } else if (match === null) {
      shapeProblems.push(`${scenario}: nativeAckRef ${fields.nativeAckRef} is neither the no-receipt marker nor an interrupt_receipt_v1 count`);
    } else {
      const stillQueued = Number(match[1]);
      const echo = fields.echo;
      if (echo?.receipt !== "interrupt_receipt_v1" || echo.stillQueued !== stillQueued) shapeProblems.push(`${scenario}: echo ${JSON.stringify(echo)} disagrees with ${fields.nativeAckRef}`);
      if (match[2] !== undefined && echo?.cancelled !== Number(match[2])) shapeProblems.push(`${scenario}: cancelled count not echoed`);
      const ids = echo?.stillQueuedIds ?? [];
      if (ids.length > SURVIVORS_SHOWN) shapeProblems.push(`${scenario}: ${ids.length} survivor ids shown`);
      for (const id of ids) if (!SURVIVOR_ID.test(id)) shapeProblems.push(`${scenario}: a survivor id is not a plain identifier`);
      if ((echo?.idsTruncated === true) !== ids.length < stillQueued) shapeProblems.push(`${scenario}: idsTruncated disagrees with the ids shown`);
    }
  }
  if (echoProblems.length > 0) findings.push(finding("acknowledged-not-echoed", echoProblems.join("; ")));
  if (shapeProblems.length > 0) findings.push(finding("ack-not-sdk-shaped", shapeProblems.join("; ")));
}
function assessResults(record: ReceiptEvidence, findings: Finding[]): void {
  const echoProblems: string[] = [];
  const outcomeProblems: string[] = [];
  const shapeProblems: string[] = [];
  const measured = new Set<string>();
  for (const entry of phasesOf(record, "result")) {
    const { scenario, fields } = entry;
    const requested = requestedOf(record, scenario, fields.requestId);
    if (requested === undefined) echoProblems.push(`${scenario}: result ${fields.requestId} has no requested phase`);
    if (!phasesOf(record, "acknowledged").some(ack => ack.scenario === scenario && ack.fields.requestId === fields.requestId)) echoProblems.push(`${scenario}: result without a distinct acknowledged phase`);
    if (fields.resultDrivenBy !== "harness-tee") echoProblems.push(`${scenario}: result driven by ${String(fields.resultDrivenBy)}, not disclosed as the harness tee`);
    if (!isInstant(fields.settledAt)) echoProblems.push(`${scenario}: settledAt ${fields.settledAt} is not an instant`);
    const match = RESULT_REF.exec(fields.nativeResultRef);
    if (match === null || !isInstant(match[3])) {
      echoProblems.push(`${scenario}: nativeResultRef ${fields.nativeResultRef} is not ${RESULT_REF_PREFIX}<session>:<terminal>@<instant>`);
      continue;
    }
    if (requested !== undefined && match[1] !== requested.target.id) echoProblems.push(`${scenario}: nativeResultRef names session ${match[1]}, not the target ${requested.target.id}`);
    const measurement = measurementOf(record, scenario);
    measured.add(scenario);
    if (measurement === undefined) {
      shapeProblems.push(`${scenario}: no terminal-measurement record`);
      continue;
    }
    const problems = measurementProblems(measurement);
    if (problems.length > 0) {
      shapeProblems.push(`${scenario}: terminal-measurement lacks ${problems.join(", ")}`);
      continue;
    }
    if (match[2] !== measurement.observerTerminal) echoProblems.push(`${scenario}: nativeResultRef reads ${match[2]} where the observer measured ${measurement.observerTerminal}`);
    const expected = measurement.freshness === "current" ? OUTCOME_BY_TERMINAL[measurement.observerTerminal] : "unknown";
    if (fields.outcome !== expected) outcomeProblems.push(`${scenario}: outcome ${fields.outcome} for measured terminal ${measurement.observerTerminal} (freshness ${measurement.freshness}); the landed mapping settles ${expected}`);
  }
  if (!measured.has(SCENARIOS.adverse)) {
    const measurement = measurementOf(record, SCENARIOS.adverse);
    if (measurement === undefined) shapeProblems.push(`${SCENARIOS.adverse}: no terminal-measurement record`);
    else {
      const problems = measurementProblems(measurement);
      if (problems.length > 0) shapeProblems.push(`${SCENARIOS.adverse}: terminal-measurement lacks ${problems.join(", ")}`);
    }
  }
  if (echoProblems.length > 0) findings.push(finding("result-without-native-echo", echoProblems.join("; ")));
  if (outcomeProblems.length > 0) findings.push(finding("result-outcome-undisclosed", outcomeProblems.join("; ")));
  if (shapeProblems.length > 0) findings.push(finding("terminal-shape-undetermined", shapeProblems.join("; ")));
}
function assessUncertain(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const { scenario, fields } of phasesOf(record, "uncertain")) {
    if (requestedOf(record, scenario, fields.requestId) === undefined) problems.push(`${scenario}: uncertain without a requested phase`);
    if (fields.retried !== false) problems.push(`${scenario}: retried ${String(fields.retried)}`);
    if (fields.seamCalls !== 1) problems.push(`${scenario}: ${fields.seamCalls} seam calls`);
    if (fields.status !== "uncertain") problems.push(`${scenario}: status ${fields.status}`);
  }
  if (problems.length > 0) findings.push(finding("uncertain-retried", problems.join("; ")));
}
function assessSibling(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const { scenario, fields } of phasesOf(record, "sibling")) {
    if (fields.siblingTerminal !== "succeeded") problems.push(`${scenario}: sibling ${fields.siblingSessionId} read ${fields.siblingTerminal}`);
    if (fields.siblingOk !== true) problems.push(`${scenario}: sibling result ok ${String(fields.siblingOk)}`);
    if (fields.siblingSeamCalls !== 0) problems.push(`${scenario}: ${fields.siblingSeamCalls} seam calls named the sibling`);
    if (!nonblank(fields.siblingSessionId) || !nonblank(fields.targetSessionId) || fields.siblingSessionId === fields.targetSessionId) problems.push(`${scenario}: the sibling is not a distinct session`);
  }
  if (problems.length > 0) findings.push(finding("sibling-changed", problems.join("; ")));
}
function assessSettledCall(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  if (phasesOf(record, "result").some(entry => entry.scenario === SCENARIOS.settled)) problems.push("a result phase was minted for the interrupt of a settled call");
  const replies = parsedReplies(record, SCENARIOS.settled);
  const typed = replies.some(reply => reply.ok === false && reply.invoked === true && reply.status === "refused" && reply.error?.code === "no-live-query" && reply.error.category === "unavailable");
  if (!typed) problems.push("no tool reply carries the typed no-live-query refusal (ok false, invoked true, status refused, category unavailable)");
  if (replies.some(reply => reply.ok === true && reply.control?.phase === "result")) problems.push("a settled-call reply claims a result phase");
  if (problems.length > 0) findings.push(finding("settled-call-terminal-minted", problems.join("; ")));
}
function assessOwnership(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  const ownership = record.ownership as unknown as Record<string, unknown> | null | undefined;
  if (ownership === null || ownership === undefined || typeof ownership !== "object") problems.push("no ownership disclosure block");
  else {
    const keys = Object.keys(ownership).sort().join(",");
    if (keys !== "nativeConfirmationRef,seededBy,source") problems.push(`ownership block carries ${keys}`);
    if (ownership.seededBy !== "harness") problems.push(`ownership seededBy ${String(ownership.seededBy)}`);
    if (ownership.source !== OWNERSHIP_SOURCE) problems.push(`ownership source ${String(ownership.source)}`);
    const ref = ownership.nativeConfirmationRef;
    if (!nonblank(ref) || !SESSION_ID.test(ref)) problems.push("the disclosed nativeConfirmationRef is not an SDK session id");
    else if (!record.nativeReferences.ownershipConfirmationRefs.includes(ref)) problems.push("the disclosed nativeConfirmationRef is not among the recorded ownership confirmation refs");
  }
  for (const { scenario, fields } of phasesOf(record, "requested")) {
    if (fields.ownershipConfirmationRef !== fields.target.id) problems.push(`${scenario}: ownershipConfirmationRef is not the target session's own init id`);
    if (!record.nativeReferences.ownershipConfirmationRefs.includes(fields.ownershipConfirmationRef)) problems.push(`${scenario}: ownershipConfirmationRef is not recorded among the seeded refs`);
  }
  const claims = Array.isArray(record.nonClaims) ? record.nonClaims : [];
  if (claims.length !== NON_CLAIMS.length || claims.some((claim, index) => claim !== NON_CLAIMS[index])) problems.push("the recorded non-claims differ from the module's");
  if (problems.length > 0) findings.push(finding("ownership-undisclosed", problems.join("; ")));
}

/** Judge one evidence record. Unrealised steps pre-empt findings: an unmeasured claim is never graded. */
export function assess(record: ReceiptEvidence & { truthLabel?: string }): Assessment {
  const stop = (step: UnrealisedStep, diagnostic: string): Assessment => ({ findings: [], unrealised: [unrealised(step, diagnostic)] });
  if (record.unrealised.length > 0) return { findings: [], unrealised: record.unrealised.map(entry => ({ ...entry })) };
  if (record.servedModelSource !== "assistant" || !nonblank(record.servedModel)) return stop("credentials-unavailable", "no assistant frame reported a served model: the preflight turn produced no inference evidence");
  for (const name of REQUIRED_SCENARIOS) {
    const scenario = record.scenarios[name];
    if (scenario === undefined || scenario.realised !== true) return stop("scenario-unrealised", `${name}: ${scenario?.detail ?? "not recorded"}`);
  }
  const strict = record.scenarios[SCENARIOS.strictBooted];
  if (strict === undefined || strict.realised !== false || record.strictBooted?.realised !== false) {
    return stop("scenario-unrealised", `${SCENARIOS.strictBooted}: must be declared UNREALISED, never measured as realised`);
  }
  for (const citation of STRICT_BOOTED_CITATIONS) {
    if (!strict.detail.includes(citation) || !record.strictBooted.detail.includes(citation)) return stop("scenario-unrealised", `${SCENARIOS.strictBooted}: the declaration does not cite ${citation}`);
  }
  for (const { scenario, fields } of phasesOf(record, "requested")) {
    if (scenario !== SCENARIOS.adverse && scenario !== SCENARIOS.sibling && scenario !== SCENARIOS.revoked) continue;
    if (!isInstant(fields.sessionObservedAt)) return stop("no-session-observed", `${scenario}: no system/init session id was observed before the interrupt`);
    if (!(fields.midStreamBasis?.assistantCharacters > 0)) return stop("not-mid-stream", `${scenario}: the interrupt was issued before any assistant text streamed`);
  }
  const findings: Finding[] = [];
  const untyped = record.phases.filter(entry => entry.fields === undefined || entry.fields === null || entry.fields.phase !== entry.phase);
  if (untyped.length > 0) findings.push(finding("phase-fields-missing", untyped.map(entry => `${entry.scenario} ${entry.phase}`).join(", ")));
  assessVerbCount(record, findings);
  assessObserverClose(record, findings);
  assessDenials(record, findings);
  assessAcknowledged(record, findings);
  assessResults(record, findings);
  assessUncertain(record, findings);
  assessSibling(record, findings);
  assessSettledCall(record, findings);
  if (record.dirty !== false) findings.push(finding("uncommitted-tree", record.dirty === null ? "the tree's status could not be read" : "the receipt was produced from a tree with uncommitted changes"));
  assessOwnership(record, findings);
  if (record.truthLabel !== undefined && record.truthLabel !== truthLabelOf({ realised: true, pass: findings.length === 0 })) {
    findings.push(finding("label-mismatch", `labelled ${record.truthLabel} with ${findings.length} findings`));
  }
  findings.sort((left, right) => FINDING_RULES.indexOf(left.rule) - FINDING_RULES.indexOf(right.rule));
  return { findings, unrealised: [] };
}

export function truthLabelOf(receipt: { realised: boolean; pass: boolean }): TruthLabel {
  if (!receipt.realised) return "not realised";
  return receipt.pass ? "live SDK pass" : "live run with findings";
}

/** Build the evidence-grade receipt, deep-frozen. Refuses (throws naming the path, never echoing the value) input carrying a credential-shaped value. */
export function buildReceipt(input: ReceiptEvidence): Receipt {
  const paths = credentialPaths(input);
  if (paths.length > 0) throw new Error(`receipt input carries a credential-shaped value at ${paths.join(", ")}; refusing to record it`);
  const assessment = assess(input);
  const realised = assessment.unrealised.length === 0;
  const pass = realised && assessment.findings.length === 0;
  return deepFreeze({
    contract: CONTRACT,
    evidenceClass: EVIDENCE_CLASS,
    truthLabel: truthLabelOf({ realised, pass }),
    ...input,
    nonClaims: [...input.nonClaims],
    findings: assessment.findings,
    unrealised: assessment.unrealised,
    realised,
    pass,
  });
}
