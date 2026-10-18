/**
 * Claude Agent SDK native control adapter (W16-D2, VC-1; docs/workbench/04 § "Cancellation and steering", docs/workbench/11
 * § "First public Pi tools"). It executes ONE permitted workbench.control/v1 decision minted by the landed core
 * (src/workbench/control.ts, decideControl) through the control channel of exactly one live query, which the host injects
 * for the agent() call that query serves: the vendored SDK's Query.interrupt() (@anthropic-ai/claude-agent-sdk 0.3.300,
 * sdk.d.ts:2882). It records the SDK's own answer through the core's acknowledge and, later, the call's terminal as the
 * observer reports it through the core's settle. It decides nothing: grants, scope, lifecycle ownership and operator
 * confirmation are the core's rules. It loads no SDK and no host, registers no tool and wires nothing: retaining the live
 * Query per call and exposing this seam through the host boundary is the host's wiring. Provenance comes first: only the very
 * decision object decideControl returned in this process executes (isCoreMintedDecision), so a copy, a decision replayed from
 * the audit or the journal and a hand-built look-alike never reach interrupt(), however exact their shape.
 *
 * - A ClaudeControlRefusal from executeClaudeControl always means interrupt() was not called; one from
 *   settleClaudeInterrupt means no result was minted.
 * - A returned execution always means exactly one interrupt() was issued. It is never re-issued and never replaced by the
 *   runtime's own cancellation: a rejection, a timeout and an unattributable answer park as uncertain for operator
 *   reconciliation.
 * - Transport success is never domain verification: a resolved interrupt() acknowledges and never settles. A result exists
 *   only once the observer reports the call's own terminal state.
 */
import type { ClaudeNativeObservation } from "../workflow/progress.js";
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import {
  type AcknowledgedControlReceipt,
  acknowledge,
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  CONTROL_UNMINTED_REASON,
  type ControlDecision,
  type ControlDenyPolicy,
  type ControlOutcome,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "./control.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The workflow agent() call whose live query the seam reaches (docs/workbench/04: exactly one owned Claude invocation). */
export interface ClaudeControlCall {
  /** The workflow invocation that launched the call. */
  readonly invocationId: string;
  /** The call's index within that invocation (the host's ClaudeCallIdentity.index). */
  readonly index: number;
  /** The SDK session id the call's query reported; absent until the query reported one. */
  readonly sessionId?: string;
}
/**
 * The control channel of ONE live query, injected by the host for the call that query serves; tests inject a fake. The
 * retained SDK Query satisfies it unchanged (Query.interrupt() resolves the interrupt receipt or undefined, sdk.d.ts:2882),
 * and so does a wrapper that resolves nothing ({ interrupt(): Promise<void> }).
 */
export interface ClaudeInterruptSeam {
  interrupt(): Promise<unknown>;
}
export interface ClaudeControlDeps {
  readonly seam: ClaudeInterruptSeam;
  /** The call the seam serves. Its SDK session id must be the permit's target session. */
  readonly call: ClaudeControlCall;
  /** Host clock for the acknowledged phase. */
  readonly now: () => string;
  /** The bound on waiting for interrupt()'s answer. */
  readonly timeoutMs: number;
  /** Aborting stops the wait, never the interrupt already issued. */
  readonly signal?: AbortSignal;
}

export type ClaudeControlRefusalCode = "denied-decision" | "unvetted-decision" | "permit-consumed" | "unsupported-verb" | "unsupported-target" |
  "invalid-deps" | "unbound-session" | "foreign-session" | "aborted-before-issue" | "unvetted-execution" | "result-consumed" | "invalid-observation" |
  "foreign-observation" | "stale-observation" | "no-terminal" | "receipt-refused";
/** A typed refusal: from executeClaudeControl, interrupt() was not called; from settleClaudeInterrupt, nothing was settled. */
export class ClaudeControlRefusal extends CapabilityError {
  constructor(category: CapabilityErrorCategory, readonly refusal: ClaudeControlRefusalCode, message: string, readonly policy?: string) {
    super(category, message);
  }
}

export type ClaudeControlStatus = "acknowledged" | "settled" | "uncertain";
/** Why an interrupt's outcome is not established. Every reason is parked for operator reconciliation, never retried. */
export type ClaudeControlUncertainty = "seam-failure" | "wait-timeout" | "wait-aborted" | "unattributable-answer" | "receipt-refused";
/**
 * The category of a rejected interrupt(): the CLI answered the control request with an error (the SDK's
 * control_request_failed, with its own closed-vocabulary code), the query closed before the CLI answered, or anything else.
 * The SDK's message is never echoed; its code is shown as the one shared helper's label layout displays it, so a
 * credential-shaped code reads [REDACTED].
 */
export interface ClaudeControlFailure { readonly category: "sdk-refused" | "query-closed" | "transport"; readonly code?: string }
/** The SDK's answer as observed: counts, and only the survivor ids the one shared helper leaves unchanged. Observed, not verified. */
export interface ClaudeInterruptEcho {
  /** interrupt_receipt_v1 when interrupt() resolved the SDK's receipt (sdk.d.ts:4666-4678), none when it resolved undefined. */
  readonly receipt: "interrupt_receipt_v1" | "none";
  /** still_queued count: uuid-stamped commands that survive the interrupt and WILL still run unless cancelled (sdk.d.ts:4672). */
  readonly stillQueued?: number;
  /** At most 16 survivor ids, each exactly as the SDK listed it; any other id is withheld, never repaired. */
  readonly stillQueuedIds?: readonly string[];
  /** True when the receipt listed more survivors than stillQueuedIds shows. */
  readonly idsTruncated?: boolean;
  /** cancelled count, present only when the receipt carried the list (sdk.d.ts:4678); this adapter never asks for it. */
  readonly cancelled?: number;
}
type ClaudeTerminal = NonNullable<ClaudeNativeObservation["terminal"]>;
type ClaudeFreshness = ClaudeNativeObservation["freshness"];
/** What the observer reported for the interrupted call (claude-transcript.ts createClaudeObserver emits one per call). */
export interface ClaudeObservedTerminal {
  /** The call the observer sampled. */
  readonly call: Pick<ClaudeControlCall, "invocationId" | "index">;
  /** The observer's snapshot of that call; only provider, sessionId, freshness and terminal are read. */
  readonly observation: Pick<ClaudeNativeObservation, "provider" | "sessionId" | "freshness" | "terminal">;
  /** When the host received that snapshot, on the host clock that stamped the acknowledgement. */
  readonly observedAt: string;
}
export interface ClaudeControlExecution {
  readonly verb: string;
  /** settled once the observer reported the call's terminal, acknowledged once the SDK answered, else uncertain. */
  readonly status: ClaudeControlStatus;
  /** The result's outcome once settled; unknown before, never derived from the acknowledgement. */
  readonly outcome: ControlOutcome;
  readonly call: ClaudeControlCall;
  /** The latest phase the core minted. */
  readonly receipt: NativeControlReceipt;
  readonly requested: RequestedControlReceipt;
  readonly acknowledged?: AcknowledgedControlReceipt;
  readonly result?: ResultControlReceipt;
  readonly echo?: ClaudeInterruptEcho;
  /** The observed terminal a result was settled from. */
  readonly observed?: { readonly terminal: ClaudeTerminal; readonly freshness: ClaudeFreshness; readonly observedAt: string };
  readonly uncertainty?: { readonly reason: ClaudeControlUncertainty; readonly failure?: ClaudeControlFailure };
  readonly reconcileHint?: string;
}

const PROVIDER = "claude-agent-sdk";
/** The native target every Query control request acts on: the call's SDK session. */
const SESSION = "session";
/**
 * The seam method each verb executes, pinned to the vendored SDK's Query control requests (sdk.d.ts:2868-2882). It is called
 * as a method of the seam, because the SDK's own interrupt() reaches its query through `this`, and with no argument, so the
 * request never carries cancel_queued (sdk.d.ts:4656): queued commands survive and are reported, never cancelled.
 */
const ISSUE: Readonly<Record<string, (seam: ClaudeInterruptSeam) => Promise<unknown>>> = Object.freeze({
  interrupt: (seam: ClaudeInterruptSeam) => seam.interrupt(),
});
/** The executable verbs: exactly the landed core's verbs for this producer (NATIVE_CONTROL_ACTIONS) that have a seam method. */
export const CLAUDE_CONTROL_VERBS: readonly string[] = Object.freeze(NATIVE_CONTROL_ACTIONS[PROVIDER].filter(action => Object.hasOwn(ISSUE, action)));
/** nativeAckRef of an interrupt() that resolved without a receipt: older CLIs (sdk.d.ts:2880-2881) or a seam resolving nothing. */
export const CLAUDE_INTERRUPT_NO_RECEIPT = "claude-agent-sdk:interrupt:no-receipt";
/** The receipt CLIs advertising the interrupt_receipt_v1 capability resolve (sdk.d.ts:4666). */
const RECEIPT_V1 = "interrupt_receipt_v1";
/**
 * What the call's own terminal, as the observer reports it (ClaudeNativeObservation.terminal, claude-transcript.ts),
 * establishes about an acknowledged interrupt. Only the call's cancellation terminal is an interrupted ending; a call that
 * succeeded or failed ended on terms its terminal cannot attribute to the interrupt, and a lost stream establishes nothing.
 */
export const CLAUDE_INTERRUPT_OUTCOMES: Readonly<Record<ClaudeTerminal, ControlOutcome>> = Object.freeze({
  succeeded: "unknown",
  failed: "unknown",
  cancelled: "cancelled",
  observation_lost: "unknown",
});
/** The guidance every uncertain execution carries (docs/workbench/06 § "Current experimental policy surface"). */
export const CLAUDE_CONTROL_RECONCILE = "Claude interrupt outcome unknown: no usable answer to this interrupt was established, so the query may or "
  + "may not have stopped. It remains uncertain and is not retried automatically; observe the call's terminal state and reconcile before any new "
  + "control request.";

/** The core's request id shape (control.ts requestIdOf). */
const REQUEST_ID = /^ctl_[0-9a-f]{32}$/;
/** The closed-vocabulary shape the SDK itself admits for a control request's errorCode. */
const NATIVE_LABEL = /^[a-z][a-z0-9_]{0,63}$/;
/** The bound an errorCode is displayed under: the whole NATIVE_LABEL grammar fits, so the helper can only change it by redacting. */
const NATIVE_LABEL_TEXT = 64;
/**
 * The core's denial vocabulary, exactly ControlDenyPolicy (satisfies refuses a missing and an extra key alike): a denied
 * decision's policy is echoed only when it is one of these, so a look-alike denial never carries caller text into a refusal.
 */
const DENY_POLICIES: Readonly<Record<ControlDenyPolicy, true>> = Object.freeze({
  "unknown-permission-data": true,
  "observer-only": true,
  "malformed-request": true,
  "unknown-action": true,
  "missing-exact-grant": true,
  "cross-scope": true,
  "no-confirmed-ownership": true,
  "operator-confirmation": true,
} satisfies Record<ControlDenyPolicy, true>);
/** A survivor id shown verbatim: never flag-shaped, no whitespace, control, escape or bidi character. */
const SURVIVOR_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
/** An RFC 3339 instant. Date.parse alone also admits free text around a date. */
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
/** The SDK's own fixed text when the query closed before the CLI answered a control request; matched exactly, never echoed. */
const QUERY_CLOSED = "Query closed before response received";
const IDENTITY_BYTES = 256;
const SURVIVORS_SHOWN = 16;
/** Beyond this many entries a list is not an SDK receipt, which lists uuid-stamped main-thread commands only. */
const RECEIPT_ENTRIES = 1024;
const MAX_TIMER_MS = 2_147_483_647;
const UNVETTED = `Claude control executes only a permitted ${CONTROL_CONTRACT_VERSION} decision minted by the control core.`;
/** Receipts whose one interrupt() was issued: a permit executes once. */
const issued = new WeakSet<object>();
/** Acknowledged executions this module returned and has not settled, each with the acknowledged phase it settles from. */
const settleable = new WeakMap<object, AcknowledgedControlReceipt>();
/** Executions already settled, and the settled executions themselves. */
const settled = new WeakSet<object>();

/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string | number): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
function record(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function frozenRecord(value: unknown): value is object {
  return record(value) && Object.isFrozen(value);
}
/**
 * Bounded identity text the one shared helper leaves unchanged in its "text" layout (it normalizes, redacts and strips, in
 * that order, and nothing is deleted before it): used verbatim, never repaired. A value carrying an unsafe unit or a
 * credential never equals its display, so it is refused.
 */
function exact(value: unknown, maxBytes = IDENTITY_BYTES): value is string {
  return typeof value === "string" && value !== "" && value.trim() === value && Buffer.byteLength(value) <= maxBytes &&
    sanitizeWorkbenchText(value, maxBytes, "text") === value;
}
function instant(value: unknown): value is string {
  return typeof value === "string" && INSTANT.test(value) && Number.isFinite(Date.parse(value));
}
function isTerminal(value: unknown): value is ClaudeTerminal {
  return typeof value === "string" && Object.hasOwn(CLAUDE_INTERRUPT_OUTCOMES, value);
}
function isFreshness(value: unknown): value is ClaudeFreshness {
  return value === "current" || value === "unknown";
}
function isDenyPolicy(value: unknown): value is ControlDenyPolicy {
  return typeof value === "string" && Object.hasOwn(DENY_POLICIES, value);
}

function deniedRefusal(decision: object): ClaudeControlRefusal {
  const policy = own(decision, "policy");
  return new ClaudeControlRefusal(own(decision, "category") === "validation" ? "validation" : "authorization", "denied-decision",
    "Claude control refuses a denied decision; interrupt() was not called.", isDenyPolicy(policy) ? policy : undefined);
}
function consumedRefusal(): ClaudeControlRefusal {
  return new ClaudeControlRefusal("validation", "permit-consumed", "This control permit already issued its interrupt; a reissue needs a fresh decision.");
}
/**
 * Why a decision the core did not mint is refused. The core mints only permits, so a denial keeps its typed denied-decision
 * refusal and a re-wrapped receipt this adapter already issued stays permit-consumed; anything else, including a value whose
 * reads throw (a revoked or trapping proxy), gets the core's fixed text and echoes nothing. No branch calls interrupt().
 */
function unminted(decision: unknown): ClaudeControlRefusal {
  try {
    if (frozenRecord(decision)) {
      if (own(decision, "decision") === "denied") return deniedRefusal(decision);
      const receipt = own(decision, "receipt");
      if (record(receipt) && issued.has(receipt)) return consumedRefusal();
    }
  } catch {
    // A value whose reads throw is no decision the core minted.
  }
  return new ClaudeControlRefusal("validation", "unvetted-decision", CONTROL_UNMINTED_REASON);
}
/**
 * Structural vetting, the defense in depth behind provenance: the receipt of a decision shaped exactly as the core mints a
 * permit: frozen, requested, under the core's contract and policy, for an action the core admits for its provider, under the
 * canonical control:<provider>.<action> grant. Pure: it reads own data properties only (never an accessor), recomputes
 * nothing and calls nothing; a look-alike the core could not have minted is unvetted, a decision whose reads throw (a revoked
 * or trapping proxy) too, and a denial keeps its typed refusal. It vouches for shape, never for provenance: a structurally
 * exact copy passes it, which is why executeClaudeControl asks isCoreMintedDecision first and only then calls this.
 */
export function vetClaudeControlDecision(decision: unknown): RequestedControlReceipt {
  try {
    return vetted(decision);
  } catch (error) {
    if (error instanceof ClaudeControlRefusal) throw error;
    throw new ClaudeControlRefusal("validation", "unvetted-decision", UNVETTED);
  }
}
/**
 * The receipt of a permitted decision the core minted. Provenance first: only the very decision object decideControl minted
 * in this process passes on to structural vetting.
 */
function permitted(decision: unknown): RequestedControlReceipt {
  if (!isCoreMintedDecision(decision)) throw unminted(decision);
  return vetClaudeControlDecision(decision);
}
function vetted(decision: unknown): RequestedControlReceipt {
  if (!frozenRecord(decision)) throw new ClaudeControlRefusal("validation", "unvetted-decision", UNVETTED);
  const verdict = own(decision, "decision");
  if (verdict === "denied") throw deniedRefusal(decision);
  const receipt = own(decision, "receipt");
  const target = own(receipt, "target");
  const provider = own(target, "provider");
  const action = own(receipt, "action");
  const requestId = own(receipt, "requestId");
  if (verdict !== "permitted" || !frozenRecord(receipt) || !frozenRecord(target) || !frozenRecord(own(receipt, "scope")) ||
    !frozenRecord(own(receipt, "principal")) || own(receipt, "contractVersion") !== CONTROL_CONTRACT_VERSION || own(receipt, "phase") !== "requested" ||
    own(receipt, "policy") !== CONTROL_PERMIT_POLICY || typeof provider !== "string" || typeof action !== "string" ||
    !Object.hasOwn(NATIVE_CONTROL_ACTIONS, provider) || !NATIVE_CONTROL_ACTIONS[provider].includes(action) ||
    own(receipt, "grant") !== `control:${provider}.${action}` || typeof requestId !== "string" || !REQUEST_ID.test(requestId)) {
    throw new ClaudeControlRefusal("validation", "unvetted-decision", UNVETTED);
  }
  return receipt as RequestedControlReceipt;
}
interface Bound {
  readonly seam: ClaudeInterruptSeam;
  readonly call: ClaudeControlCall;
  readonly now: () => string;
  readonly timeoutMs: number;
  readonly signal: AbortSignal | undefined;
}
function validDeps(deps: ClaudeControlDeps): Bound {
  const invalid = (): ClaudeControlRefusal =>
    new ClaudeControlRefusal("validation", "invalid-deps", "Claude control requires a control seam, a bounded call identity, a host clock and a bounded timeout.");
  if (!record(deps)) throw invalid();
  const { seam, call, now, timeoutMs, signal } = deps;
  // The call identity is read through own data properties only; one whose reads throw (a revoked or trapping proxy) is invalid.
  let fields: { readonly channel: boolean; readonly isCall: boolean; readonly invocationId: unknown; readonly index: unknown; readonly reported: unknown };
  try {
    fields = { channel: record(seam) && typeof seam.interrupt === "function", isCall: record(call), invocationId: own(call, "invocationId"),
      index: own(call, "index"), reported: own(call, "sessionId") };
  } catch {
    throw invalid();
  }
  const { channel, isCall, invocationId, index, reported } = fields;
  const sessionId = reported === undefined ? undefined : exact(reported) ? reported : null;
  if (!channel || !isCall || !exact(invocationId) || typeof index !== "number" ||
    !Number.isSafeInteger(index) || index < 0 || sessionId === null || typeof now !== "function" || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 ||
    timeoutMs > MAX_TIMER_MS || (signal !== undefined && !(signal instanceof AbortSignal))) {
    throw invalid();
  }
  return { seam, call: Object.freeze({ invocationId, index, ...(sessionId !== undefined ? { sessionId } : {}) }), now, timeoutMs, signal };
}

type Answer = { readonly kind: "answered"; readonly value: unknown } | { readonly kind: "rejected"; readonly error: unknown } |
  { readonly kind: "wait-timeout" | "wait-aborted" };
/** The one interrupt(). A synchronous throw counts as a seam failure like a rejection: the request may have been sent. */
function issueOnce(issue: (seam: ClaudeInterruptSeam) => Promise<unknown>, seam: ClaudeInterruptSeam): Promise<unknown> {
  try {
    return Promise.resolve(issue(seam));
  } catch (error) {
    return Promise.reject(error);
  }
}
/** A bounded wait for the one answer. A timeout or an abort stops the wait, never the interrupt, and a late answer is discarded. */
function waitForAnswer(call: Promise<unknown>, timeoutMs: number, signal: AbortSignal | undefined): Promise<Answer> {
  return new Promise(resolve => {
    const finish = (answer: Answer): void => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", aborted);
      resolve(answer);
    };
    const aborted = (): void => finish({ kind: "wait-aborted" });
    const timer = setTimeout(() => finish({ kind: "wait-timeout" }), timeoutMs);
    signal?.addEventListener("abort", aborted, { once: true });
    // The seam itself may have aborted the signal while being issued, before the listener existed.
    if (signal?.aborted) aborted();
    call.then(value => finish({ kind: "answered", value }), (error: unknown) => finish({ kind: "rejected", error }));
  });
}

/** An own, dense array of strings within the receipt bound, read without invoking an accessor; anything else is not a receipt list. */
function strings(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value) || value.length > RECEIPT_ENTRIES) return undefined;
  const items: string[] = [];
  for (let index = 0; index < value.length; index++) {
    const item = own(value, index);
    if (typeof item !== "string") return undefined;
    items.push(item);
  }
  return items;
}
/**
 * What the one answer acknowledges, exactly as the SDK shapes it (sdk.mjs Query.interrupt resolves undefined or
 * { still_queued, cancelled? } of strings): the nativeAckRef carries counts only. Anything else is unattributable.
 */
function receiptOf(value: unknown): { readonly nativeAckRef: string; readonly echo: ClaudeInterruptEcho } | undefined {
  if (value === undefined) return { nativeAckRef: CLAUDE_INTERRUPT_NO_RECEIPT, echo: Object.freeze({ receipt: "none" }) };
  if (!record(value)) return undefined;
  const stillQueued = strings(own(value, "still_queued"));
  // The SDK sets cancelled only for a cancel_queued request (sdk.d.ts:4676), which this adapter never sends; echoed, never hidden.
  const listed = Object.hasOwn(value, "cancelled");
  const cancelled = listed ? strings(own(value, "cancelled")) : [];
  if (stillQueued === undefined || cancelled === undefined) return undefined;
  const ids = Object.freeze(stillQueued.filter(id => SURVIVOR_ID.test(id) && exact(id)).slice(0, SURVIVORS_SHOWN));
  const counts = `still_queued=${stillQueued.length}${listed ? `:cancelled=${cancelled.length}` : ""}`;
  return {
    nativeAckRef: `${PROVIDER}:${RECEIPT_V1}:${counts}`,
    echo: Object.freeze({ receipt: RECEIPT_V1, stillQueued: stillQueued.length, stillQueuedIds: ids, idsTruncated: ids.length < stillQueued.length,
      ...(listed ? { cancelled: cancelled.length } : {}) }),
  };
}
/** A bounded category from a rejection. Messages, stacks and details are never echoed. */
function failureOf(error: unknown): ClaudeControlFailure {
  if (own(error, "errorClass") === "control_request_failed") {
    const code = own(error, "errorCode");
    const failure: ClaudeControlFailure = { category: "sdk-refused",
      ...(typeof code === "string" && NATIVE_LABEL.test(code) ? { code: sanitizeWorkbenchText(code, NATIVE_LABEL_TEXT, "label") } : {}) };
    return Object.freeze(failure);
  }
  const failure: ClaudeControlFailure = { category: error instanceof Error && own(error, "message") === QUERY_CLOSED ? "query-closed" : "transport" };
  return Object.freeze(failure);
}
const TRANSPORT: ClaudeControlFailure = Object.freeze({ category: "transport" });
/** Reads untrusted answers: an accessor or proxy trap that throws yields the fallback, never an exception after issuing. */
function safely<T>(read: () => T, fallback: T): T {
  try {
    return read();
  } catch {
    return fallback;
  }
}
interface IssuedCall { readonly verb: string; readonly call: ClaudeControlCall; readonly requested: RequestedControlReceipt }
function uncertain({ verb, call, requested }: IssuedCall, reason: ClaudeControlUncertainty,
  { echo, failure }: { echo?: ClaudeInterruptEcho; failure?: ClaudeControlFailure } = {}): ClaudeControlExecution {
  return Object.freeze({
    verb, status: "uncertain", outcome: "unknown", call, receipt: requested, requested, ...(echo ? { echo } : {}),
    uncertainty: Object.freeze({ reason, ...(failure ? { failure } : {}) }), reconcileHint: CLAUDE_CONTROL_RECONCILE,
  });
}
/** Mints the acknowledged phase through the core from the SDK's one answer, never beyond what that answer states. Never throws. */
function conclude(issuedCall: IssuedCall, answer: Answer, now: () => string): ClaudeControlExecution {
  if (answer.kind === "rejected") return uncertain(issuedCall, "seam-failure", { failure: safely(() => failureOf(answer.error), TRANSPORT) });
  if (answer.kind !== "answered") return uncertain(issuedCall, answer.kind);
  const read = safely(() => receiptOf(answer.value), undefined);
  if (read === undefined) return uncertain(issuedCall, "unattributable-answer");
  let acknowledged: AcknowledgedControlReceipt;
  try {
    acknowledged = acknowledge(issuedCall.requested, { acknowledgedAt: now(), nativeAckRef: read.nativeAckRef });
  } catch {
    // The core refused to mint the acknowledged phase (for example from an unzoned host clock) after interrupt() was issued.
    return uncertain(issuedCall, "receipt-refused", { echo: read.echo });
  }
  const { verb, call, requested } = issuedCall;
  const execution: ClaudeControlExecution = Object.freeze({ verb, status: "acknowledged", outcome: "unknown", call, receipt: acknowledged, requested,
    acknowledged, echo: read.echo });
  settleable.set(execution, acknowledged);
  return execution;
}

/**
 * WorkbenchHost.requestControl's Claude leg (docs/workbench/13 § "Host boundary") for a decision the caller already obtained
 * from the control core. Refuses (ClaudeControlRefusal, interrupt() not called) a decision the core did not mint in this
 * process, a denied, unvetted or spent decision, an action with no Query control request, a target that is not an SDK
 * session, invalid dependencies, a seam not bound to the target session and a wait cancelled before issuing; otherwise calls
 * interrupt() exactly once and resolves with what the SDK's answer establishes: acknowledged at most, never a result.
 */
export async function executeClaudeControl(decision: ControlDecision, deps: ClaudeControlDeps): Promise<ClaudeControlExecution> {
  const requested = permitted(decision);
  if (issued.has(requested)) throw consumedRefusal();
  const { target, action } = requested;
  const issue = target.provider === PROVIDER && CLAUDE_CONTROL_VERBS.includes(action) ? ISSUE[action] : undefined;
  if (issue === undefined) throw new ClaudeControlRefusal("validation", "unsupported-verb", "No Claude Agent SDK control request exists for this action.");
  if (target.type !== SESSION) throw new ClaudeControlRefusal("validation", "unsupported-target", "Claude control acts only on an SDK session's live query.");
  const { seam, call, now, timeoutMs, signal } = validDeps(deps);
  if (call.sessionId === undefined) {
    throw new ClaudeControlRefusal("unavailable", "unbound-session", "The control seam's call has reported no SDK session, so it cannot be bound to the target session.");
  }
  if (call.sessionId !== target.id) throw new ClaudeControlRefusal("authorization", "foreign-session", "The control seam serves another SDK session than the target.");
  if (signal?.aborted) throw new ClaudeControlRefusal("transport", "aborted-before-issue", "Claude control was cancelled before interrupt() was called.");
  // Spent before issuing and in the same turn, so neither a concurrent nor a later submission can issue it again.
  issued.add(requested);
  const answer = await waitForAnswer(issueOnce(issue, seam), timeoutMs, signal);
  return conclude({ verb: action, call, requested }, answer, now);
}

interface ObservedFields {
  readonly invocationId: unknown;
  readonly index: unknown;
  readonly provider: unknown;
  readonly sessionId: unknown;
  readonly terminal: unknown;
  readonly freshness: unknown;
  readonly observedAt: string;
}
/** The observer report's own fields, read without invoking an accessor; undefined when it is not shaped as a report. */
function readObserved(observed: unknown): ObservedFields | undefined {
  const observedCall = own(observed, "call");
  const observation = own(observed, "observation");
  const observedAt = own(observed, "observedAt");
  if (!record(observedCall) || !record(observation) || !instant(observedAt)) return undefined;
  return {
    invocationId: own(observedCall, "invocationId"), index: own(observedCall, "index"), provider: own(observation, "provider"),
    sessionId: own(observation, "sessionId"), terminal: own(observation, "terminal"), freshness: own(observation, "freshness"), observedAt,
  };
}
/**
 * Settles an acknowledged interrupt from the observer's report of the interrupted call's own terminal state, through the
 * core's settle (owner constraint: a result only from what the observer later reports, never from the acknowledgement).
 * Refuses (ClaudeControlRefusal, nothing settled) an execution this module did not acknowledge or already settled, an
 * observation of another call or session, one from before the acknowledgement, a call still running and a host clock the
 * core refuses. Each acknowledged execution settles at most once; the earlier execution is never rewritten.
 */
export function settleClaudeInterrupt(execution: ClaudeControlExecution, observed: ClaudeObservedTerminal, deps: { readonly now: () => string }): ClaudeControlExecution {
  // The acknowledged phase is read from this module's own record of what it acknowledged, never from the execution object.
  const acknowledged = record(execution) ? settleable.get(execution) : undefined;
  if (acknowledged === undefined) {
    if (record(execution) && settled.has(execution)) {
      throw new ClaudeControlRefusal("validation", "result-consumed", "This interrupt was already settled; its result is never minted twice.");
    }
    throw new ClaudeControlRefusal("validation", "unvetted-execution", "Only an interrupt this adapter acknowledged can be settled.");
  }
  const { verb, call, requested, echo } = execution;
  if (!record(deps) || typeof deps.now !== "function") {
    throw new ClaudeControlRefusal("validation", "invalid-deps", "Settling a Claude interrupt requires a host clock.");
  }
  const invalid = (): ClaudeControlRefusal =>
    new ClaudeControlRefusal("validation", "invalid-observation", "A Claude interrupt settles only from the observer's report of the call's terminal state.");
  let read: ObservedFields | undefined;
  try {
    read = readObserved(observed);
  } catch {
    throw invalid();
  }
  if (read === undefined) throw invalid();
  const { invocationId, index, provider, sessionId, terminal, freshness, observedAt } = read;
  if (invocationId !== call.invocationId || index !== call.index || provider !== PROVIDER || sessionId !== requested.target.id) {
    throw new ClaudeControlRefusal("validation", "foreign-observation", "The observation reports another call or session than the interrupted one.");
  }
  if (terminal === undefined) throw new ClaudeControlRefusal("unavailable", "no-terminal", "The interrupted call has reported no terminal state yet; nothing was settled.");
  if (!isTerminal(terminal) || !isFreshness(freshness)) throw invalid();
  // Both are host clock readings. A session keeps its id across a resume, so an earlier terminal is never this interrupt's.
  if (Date.parse(observedAt) < Date.parse(acknowledged.acknowledgedAt)) {
    throw new ClaudeControlRefusal("validation", "stale-observation", "The observation predates the interrupt's acknowledgement, so it cannot be its terminal.");
  }
  // A terminal read from a lost stream is last-known, never established (docs/workbench/10 § Failure and deception defenses).
  const outcome = freshness === "current" ? CLAUDE_INTERRUPT_OUTCOMES[terminal] : "unknown";
  let result: ResultControlReceipt;
  try {
    result = settle(acknowledged, { outcome, nativeResultRef: `${PROVIDER}:${SESSION}:${requested.target.id}:${terminal}@${observedAt}`, settledAt: deps.now() });
  } catch {
    throw new ClaudeControlRefusal("validation", "receipt-refused", "The control core refused to mint the result from this host clock reading; nothing was settled.");
  }
  settleable.delete(execution);
  settled.add(execution);
  const next: ClaudeControlExecution = Object.freeze({ verb, status: "settled", outcome, call, receipt: result, requested, acknowledged, result,
    ...(echo ? { echo } : {}), observed: Object.freeze({ terminal, freshness, observedAt }) });
  settled.add(next);
  return next;
}
