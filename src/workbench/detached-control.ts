/**
 * Local-detached native control adapter (W16-J, VC-7; docs/workbench/11 § "First public Pi tools (proposed)",
 * docs/workbench/08 § "Optional local detached profile"). It executes ONE workbench.control/v1 decision of the landed
 * core (control.ts) through the Workbench-owned detached host's own control verbs, the reason-carrying members of the
 * DetachedCommand union (hosts/local-detached.ts:103-105), on the handle the wiring's connect(invocationId) factory builds
 * for the request's target invocation (the connectDetachedWorkflow handle, which opens no socket until one of its verbs is
 * called). The factory runs only after admission (decide-then-act, owner ruling C1): a denial or a precondition refusal
 * never builds a handle.
 *
 * It decides nothing: grants, scope, lifecycle ownership and operator confirmation are the core's ladder, consumed and
 * never re-derived. It launches and connects nothing, resolves no path and signals no process. Pi tool registration and
 * the launch permission list stay with the host wiring.
 *
 * - denied: the core's own denial, returned as-is. No factory or client method is called, so the socket never opens.
 * - refused: a permit the detached host cannot carry (refused before any client call), or a refusal the host or the
 *   client raised before acceptance (authorization or validation). The receipt stays requested; nothing is acknowledged.
 * - not-accepted: the host answered accepted false. The receipt stays requested and the outcome is failed.
 * - settled: the host answered accepted true, acknowledged verbatim, and its own terminalConfirmed (cancel) or
 *   unresolvedEffects (shutdown) answer settles the result: never minted, never polled.
 * - uncertain: no answer attributable to the request (a transport failure, a malformed answer, an unreported result or
 *   a later phase the core refused to mint). The outcome is unknown and the request is never retried.
 */
import { CapabilityError } from "./capability-registry.js";
import {
  type AcknowledgedControlReceipt,
  acknowledge,
  CONTROL_CONTRACT_VERSION,
  type ControlDecision,
  type ControlOutcome,
  decideControl,
  type NativeControlRequest,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "./control.js";
import type { connectDetachedWorkflow, DetachedCommand } from "./hosts/local-detached.js";
import type { ObservationProjection } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The reason-carrying DetachedCommand verbs: the detached host's only control verbs (hosts/local-detached.ts:103-105). */
export type DetachedControlVerb = Extract<DetachedCommand, { reason: string }>["command"];
/** Exactly the handle's methods for those verbs; inspect and execute are unreachable through this type. */
export type DetachedControlClient = Pick<ReturnType<typeof connectDetachedWorkflow>, DetachedControlVerb>;
/** The wiring's factory, bound to the workspace root: builds the handle for one invocation id. Opens no socket by itself. */
export type DetachedControlConnect = (invocationId: string) => DetachedControlClient;

interface DetachedVerbRow {
  /** The host's answer field that settles the verb (hosts/local-detached.ts:653). */
  readonly settledBy: "terminalConfirmed" | "unresolvedEffects";
  /** The outcome each verbatim value of that field establishes. */
  readonly whenTrue: ControlOutcome;
  readonly whenFalse: ControlOutcome;
}
/**
 * One row per verb, keyed by the DetachedCommand union, so the table cannot drift from the host: a verb added to the
 * union without a row, or a row the union lacks, fails to compile. A row executes only for an action the core admits
 * too (NATIVE_CONTROL_ACTIONS["local-detached"]).
 */
export const DETACHED_CONTROL_VERBS: Readonly<Record<DetachedControlVerb, DetachedVerbRow>> = Object.freeze({
  // The host aborts the owned interpreter and answers terminalConfirmed only for an invocation already ended cancelled.
  cancel: Object.freeze({ settledBy: "terminalConfirmed", whenTrue: "cancelled", whenFalse: "unknown" }),
  // The host stops after replying; unresolvedEffects reports an interpreter still running, whose effects are unknown.
  shutdown: Object.freeze({ settledBy: "unresolvedEffects", whenTrue: "unknown", whenFalse: "completed" }),
});

/** The guidance every unknown outcome carries, after the host's own guidance for a lost answer (hosts/local-detached.ts:33). */
export const DETACHED_CONTROL_RECONCILE = "Detached control outcome unknown: the host's answer to this request was not established, so it may or may not "
  + "have acted. Never automatically retry it; inspect the invocation and reconcile known native effects with their producer before a new control request.";

export interface DetachedControlInput {
  /** The host-bound request: scope and principal are bound by the host, never by script payload (docs/workbench/12). */
  readonly request: NativeControlRequest;
  /** The projection the core decides against, read only through the core. */
  readonly deps: { readonly projection: ObservationProjection };
  /** Builds the detached handle for the request's target invocation, called once and only after admission with the receipt's target id. */
  readonly connect: DetachedControlConnect;
  /** The host clock for decidedAt, acknowledgedAt and settledAt. */
  readonly now: () => string;
}
export interface DetachedControlRefusal {
  readonly category: "authorization" | "validation";
  /** Fixed adapter text, or the host's or client's message through the shared sanitizers. */
  readonly diagnostic: string;
}
/** The host's one answer as observed: only its own boolean fields, copied verbatim. Observed, never verified. */
export interface DetachedControlEcho { readonly accepted?: boolean; readonly terminalConfirmed?: boolean; readonly unresolvedEffects?: boolean }
/** Why an outcome is unknown. Each reason is parked for operator reconciliation, never retried. */
export type DetachedControlUncertainty = "transport-failure" | "unattributable-answer" | "unreported-result" | "receipt-refused";
export type DetachedControlExecution =
  | { readonly status: "denied"; readonly decision: Extract<ControlDecision, { decision: "denied" }>; readonly clientCalls: 0 }
  | {
    readonly status: "refused"; readonly verb?: DetachedControlVerb; readonly receipt: RequestedControlReceipt; readonly requested: RequestedControlReceipt;
    readonly refusal: DetachedControlRefusal; readonly clientCalls: 0 | 1;
  }
  | {
    readonly status: "not-accepted"; readonly verb: DetachedControlVerb; readonly receipt: RequestedControlReceipt; readonly requested: RequestedControlReceipt;
    readonly outcome: "failed"; readonly echo: DetachedControlEcho; readonly clientCalls: 1;
  }
  | {
    readonly status: "settled"; readonly verb: DetachedControlVerb; readonly receipt: ResultControlReceipt; readonly requested: RequestedControlReceipt;
    readonly acknowledged: AcknowledgedControlReceipt; readonly result: ResultControlReceipt; readonly echo: DetachedControlEcho; readonly clientCalls: 1;
  }
  | {
    readonly status: "uncertain"; readonly verb: DetachedControlVerb; readonly receipt: RequestedControlReceipt | AcknowledgedControlReceipt;
    readonly requested: RequestedControlReceipt; readonly acknowledged?: AcknowledgedControlReceipt; readonly outcome: "unknown";
    readonly uncertainty: DetachedControlUncertainty; readonly diagnostic?: string; readonly echo?: DetachedControlEcho; readonly reconcileHint: string;
    readonly clientCalls: 1;
  };

const PROVIDER = "local-detached";
/** The host's invocation id grammar (hosts/local-detached.ts:32), which every detached frame and path requires. */
const INVOCATION_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
/** The reader's ownership confirmation (W13-G convention): local-detached:<hostInstanceId>:<pid>:<owner.id>. */
const CONFIRMATION = /^local-detached:([a-f0-9]{48}):[1-9][0-9]{0,9}:.+$/;
/** How the client renders the host's refusal frame (hosts/local-detached.ts:470); the host refuses only in these categories. */
const HOST_REFUSAL = /^Detached (authorization|validation): /;
/**
 * The client's own checks, each raised before any frame is written: private path and ancestor authorization (:159, :168),
 * the invocation id (:114), the command name (:119), the operator reason (:123), the directory (:164) and the socket path
 * bound (:178). Any other failure may follow dispatch, so it is never read as a refusal.
 */
const CLIENT_REFUSALS: readonly (readonly [RegExp, DetachedControlRefusal["category"]])[] = [
  [/^Authorization: /, "authorization"],
  [/^Invalid invocation ID \(no paths or shell syntax\)\.$/, "validation"],
  [/^Unsupported detached command; /, "validation"],
  [/^Control requires a bounded operator reason\.$/, "validation"],
  [/^Detached directory must be a canonical absolute path\.$/, "validation"],
  [/^Detached Unix socket path exceeds /, "validation"],
];
/** Operator note bound: the attributable prefix plus the note stays far inside the host's 512-character reason bound (:123). */
const NOTE_LENGTH = 400;
const DIAGNOSTIC_LENGTH = 300;
/** Untrusted text is cut before any pattern runs over it. */
const SCAN = 4096;
const MISWIRED = "Detached control requires a request, a projection, a connect factory and a host clock.";
const NO_HANDLE = "Detached control could not build a detached client with cancel and shutdown for the invocation.";
const NOT_DETACHED = "Detached control executes only a decision for a local-detached control verb.";
const NOT_INVOCATION = "Detached control acts only on a local-detached invocation whose id the host admits.";
const NO_HOST_INSTANCE = "Detached control requires the reader's ownership confirmation naming the host instance, process and owner.";
const MALFORMED_REASON = "Detached control params.reason must be a string when present.";
const HOST_REFUSED = "The detached host refused the command.";
const CLIENT_REFUSED = "The detached client refused the command before sending it.";
const NO_DIAGNOSTIC = "The detached client failed without a diagnostic.";

function plain(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function method(value: unknown, key: string): boolean {
  return typeof value === "object" && value !== null && typeof Reflect.get(value, key) === "function";
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
function ownBoolean(value: unknown, key: string): boolean | undefined {
  const field = plain(value) ? own(value, key) : undefined;
  return typeof field === "boolean" ? field : undefined;
}
function detachedVerb(action: string): action is DetachedControlVerb {
  return Object.hasOwn(DETACHED_CONTROL_VERBS, action);
}
/**
 * Untrusted text through the ONE shared helper (wb-952 census site 23), with the label layout: redaction reads every
 * reading of every gap (a unit between two tokens separates, the same unit inside a keyword or token glues) before
 * anything is stripped, then escapes, controls and separators render as one space, invisibles vanish, whitespace collapses
 * and the ends are trimmed, so the frame stays on one line (the host decoder, hosts/local-detached.ts:123, refuses any C0).
 * No local pre-pass: deletion never precedes redaction.
 */
function sanitized(value: string, maxLength: number): string {
  return sanitizeWorkbenchText(value.slice(0, SCAN), maxLength, "label").trim();
}
/** The optional operator note, params.reason as an own data string: "" when absent or blank once sanitized, undefined when malformed. */
function operatorNote(params: unknown): string | undefined {
  if (!plain(params)) return "";
  const descriptor = Object.getOwnPropertyDescriptor(params, "reason");
  if (descriptor === undefined) return "";
  return typeof descriptor.value === "string" ? sanitized(descriptor.value, NOTE_LENGTH) : undefined;
}
/** A refusal the host or the client raised before acceptance; anything else may have reached the host. */
function refusalOf(error: unknown): DetachedControlRefusal | undefined {
  const message = own(error, "message");
  if (typeof message !== "string") return undefined;
  const host = HOST_REFUSAL.exec(message);
  if (host) return { category: host[1] === "authorization" ? "authorization" : "validation", diagnostic: sanitized(message.slice(host[0].length), DIAGNOSTIC_LENGTH) || HOST_REFUSED };
  const code = own(error, "code");
  // A connect or path check the OS denied: the frame was never written.
  if (code === "EACCES" || code === "EPERM") return { category: "authorization", diagnostic: sanitized(message, DIAGNOSTIC_LENGTH) || CLIENT_REFUSED };
  const local = CLIENT_REFUSALS.find(([pattern]) => pattern.test(message));
  return local ? { category: local[1], diagnostic: sanitized(message, DIAGNOSTIC_LENGTH) || CLIENT_REFUSED } : undefined;
}
function diagnosticOf(error: unknown): string {
  const message = typeof error === "string" ? error : own(error, "message");
  return (typeof message === "string" ? sanitized(message, DIAGNOSTIC_LENGTH) : "") || NO_DIAGNOSTIC;
}
function wired(input: DetachedControlInput): DetachedControlInput {
  if (!plain(input) || !plain(input.request) || !plain(input.deps) || !method(input.deps.projection, "query") || !method(input.deps.projection, "relations")
    || typeof input.connect !== "function" || typeof input.now !== "function") {
    throw new CapabilityError("validation", MISWIRED);
  }
  return input;
}

function refused(requested: RequestedControlReceipt, verb: DetachedControlVerb | undefined, refusal: DetachedControlRefusal,
  clientCalls: 0 | 1): DetachedControlExecution {
  return Object.freeze({
    status: "refused", ...(verb !== undefined ? { verb } : {}), receipt: requested, requested,
    refusal: Object.freeze({ category: refusal.category, diagnostic: refusal.diagnostic }), clientCalls,
  });
}
function uncertain(verb: DetachedControlVerb, requested: RequestedControlReceipt, uncertainty: DetachedControlUncertainty,
  { echo, acknowledged, diagnostic }: { echo?: DetachedControlEcho; acknowledged?: AcknowledgedControlReceipt; diagnostic?: string } = {}): DetachedControlExecution {
  return Object.freeze({
    status: "uncertain", verb, receipt: acknowledged ?? requested, requested, ...(acknowledged ? { acknowledged } : {}), outcome: "unknown", uncertainty,
    ...(diagnostic !== undefined ? { diagnostic } : {}), ...(echo ? { echo } : {}), reconcileHint: DETACHED_CONTROL_RECONCILE, clientCalls: 1,
  });
}

type Answer = { readonly kind: "answered"; readonly value: unknown } | { readonly kind: "rejected"; readonly error: unknown };
/** The one native call. A synchronous throw counts as a rejection: the verb may have started. */
async function callOnce(client: DetachedControlClient, verb: DetachedControlVerb, reason: string): Promise<Answer> {
  try {
    return { kind: "answered", value: await (verb === "cancel" ? client.cancel(reason) : client.shutdown(reason)) };
  } catch (error) {
    return { kind: "rejected", error };
  }
}
/** Mints each later phase through the core from the host's one answer, never beyond what that answer states. Never throws. */
function conclude(verb: DetachedControlVerb, requested: RequestedControlReceipt, ref: string, answer: Answer, now: () => string): DetachedControlExecution {
  if (answer.kind === "rejected") {
    const refusal = refusalOf(answer.error);
    return refusal ? refused(requested, verb, refusal, 1) : uncertain(verb, requested, "transport-failure", { diagnostic: diagnosticOf(answer.error) });
  }
  const row = DETACHED_CONTROL_VERBS[verb];
  const accepted = ownBoolean(answer.value, "accepted");
  const settledBy = ownBoolean(answer.value, row.settledBy);
  const echo: DetachedControlEcho = Object.freeze({
    ...(accepted !== undefined ? { accepted } : {}),
    ...(settledBy === undefined ? {} : row.settledBy === "terminalConfirmed" ? { terminalConfirmed: settledBy } : { unresolvedEffects: settledBy }),
  });
  if (accepted === undefined) return uncertain(verb, requested, "unattributable-answer", { echo });
  if (!accepted) return Object.freeze({ status: "not-accepted", verb, receipt: requested, requested, outcome: "failed", echo, clientCalls: 1 });
  let acknowledged: AcknowledgedControlReceipt;
  try {
    acknowledged = acknowledge(requested, { acknowledgedAt: now(), nativeAckRef: `${ref}:${verb}:accepted` });
  } catch {
    // The core refused to mint the phase (for example from an unzoned host clock) after the verb was issued.
    return uncertain(verb, requested, "receipt-refused", { echo });
  }
  if (settledBy === undefined) return uncertain(verb, requested, "unreported-result", { echo, acknowledged });
  try {
    const result = settle(acknowledged, { outcome: settledBy ? row.whenTrue : row.whenFalse, nativeResultRef: `${ref}:${verb}:${row.settledBy}=${settledBy}`, settledAt: now() });
    return Object.freeze({ status: "settled", verb, receipt: result, requested, acknowledged, result, echo, clientCalls: 1 });
  } catch {
    return uncertain(verb, requested, "receipt-refused", { echo, acknowledged });
  }
}

/**
 * WorkbenchHost.requestControl's local-detached leg (docs/workbench/13 § "Host boundary"). Throws a validation
 * CapabilityError only before any client call: for a malformed call from the host wiring, or an unzoned host clock at
 * decision time. Every other path resolves, and calls at most one client verb at most once.
 */
export async function executeDetachedControl(input: DetachedControlInput): Promise<DetachedControlExecution> {
  const { request, deps, connect, now } = wired(input);
  const decision = decideControl(request, { projection: deps.projection, now });
  if (decision.decision === "denied") return Object.freeze({ status: "denied", decision, clientCalls: 0 });
  const requested = decision.receipt;
  const { target, action } = requested;
  if (target.provider !== PROVIDER || !detachedVerb(action)) return refused(requested, undefined, { category: "validation", diagnostic: NOT_DETACHED }, 0);
  // The reader's node convention: {provider:"local-detached", type:"invocation", id:<invocationId>}, never scoped.
  if (target.type !== "invocation" || target.scope !== undefined || !INVOCATION_ID.test(target.id)) {
    return refused(requested, action, { category: "validation", diagnostic: NOT_INVOCATION }, 0);
  }
  // Native refs come from the projected invocation and the producer-confirmed host instance, never from caller text.
  const hostInstanceId = CONFIRMATION.exec(requested.ownershipConfirmationRef)?.[1];
  if (hostInstanceId === undefined) return refused(requested, action, { category: "validation", diagnostic: NO_HOST_INSTANCE }, 0);
  const note = operatorNote(request.params);
  if (note === undefined) return refused(requested, action, { category: "validation", diagnostic: MALFORMED_REASON }, 0);
  // The host audits the reason with its owner; the request id makes that row attributable to this receipt.
  const reason = note === "" ? `${CONTROL_CONTRACT_VERSION} ${requested.requestId}` : `${CONTROL_CONTRACT_VERSION} ${requested.requestId}: ${note}`;
  // Decide-then-act: the handle is built only now, after every refusal above. A factory that fails or builds a handle
  // without both verbs has called nothing, so this is a refusal with zero client calls.
  let client: DetachedControlClient | undefined;
  try {
    client = connect(target.id);
  } catch {
    client = undefined;
  }
  if (!method(client, "cancel") || !method(client, "shutdown")) return refused(requested, action, { category: "validation", diagnostic: NO_HANDLE }, 0);
  return conclude(action, requested, `${PROVIDER}:${target.id}:${hostInstanceId}`, await callOnce(client as DetachedControlClient, action, reason), now);
}
