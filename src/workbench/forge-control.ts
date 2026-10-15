/**
 * Forge native control adapter (W16-D3, VC-2; docs/workbench/11 § "First public Pi tools", docs/workbench/06 § "Optional
 * inspect/observe"). It executes ONE permitted workbench.control/v1 cancel decision minted by the landed core
 * (src/workbench/control.ts, decideControl) through the vendored @forge/sdk 0.1.0 cancel verb, and records Forge's own
 * answers through the core's acknowledge and settle. It decides nothing: grants, scope, lifecycle ownership and operator
 * confirmation are the core's rules, the caller owns the decision, and nothing here registers a tool or wires a host.
 *
 * The measured surface, the only native verb:
 * - OperationClient.cancel(operationId): Promise<CancelReceipt> (dist/operation.d.ts:77) writes exactly one
 *   operation.cancel {operation_id} frame (dist/operation.js:38, :108) and decodes Forge's answer (dist/cancellation.js:49-67).
 * - A CancelReceipt states what Forge recorded and whether it took the cancel on, never what happened:
 *   cancellationEstablished is the literal false (dist/cancellation.d.ts:43), and its operationId is the caller's own value,
 *   not Forge's echo (dist/cancellation.d.ts:38-39, cancellation.js:66). Forge's own echo is the payload's operation_id.
 * - Only the operation's own terminal frame can establish a cancellation, as terminal_disposition "cancelled-established"
 *   (dist/event_delivery_policy.d.ts:47-49), reaching a caller as an OperationEnd (dist/operation_stream.d.ts:100-106).
 * - A mode with no Forge-side cancel says so in its capability map: the one-shot CLI fallback states cancel unsupported, and
 *   its cancel(): never throws FORGE_UNSUPPORTED_CAPABILITY having sent nothing (dist/fallback.d.ts:106, fallback.js:76,
 *   dist/errors.d.ts:84-95).
 *
 * - A ForgeControlRefusal always means nothing reached Forge.
 * - A returned execution means exactly one cancel was handed to the seam. It is never re-sent, whatever the answer:
 *   failure, timeout and unattributable answers park as `uncertain` for operator reconciliation instead of retrying.
 * - Transport success is never domain verification: acknowledged needs Forge's own ACCEPTED answer echoing the target's
 *   operation_id, and a result needs the operation's own terminal frame (settleForgeControl).
 *
 * Every @forge/sdk import is type-only, so this module never loads the SDK: the host hands over the live client.
 */
import type {
  CANCELLATION_DISPOSITION,
  CancelAcceptance,
  CancelIntent,
  CancelReceipt,
  CapabilityMap,
  CapabilityState,
  JsonValue as ForgeJsonValue,
  ForgeSdkErrorCode,
  OneShotCliConnection,
  OPERATION_ID_FIELD,
  OperationClient,
  OperationEnd,
  ServerConnection,
  TERMINAL_DISPOSITION_FIELD,
} from "@forge/sdk";
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import {
  type AcknowledgedControlReceipt,
  acknowledge,
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  type ControlDenyPolicy,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "./control.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The vendored operation client's one cancel verb. A real OperationClient satisfies it unchanged; tests inject a fake. */
export interface ForgeCancelOperations {
  cancel(operationId: string): Promise<CancelReceipt>;
}
/** The connection's negotiated capability statement. A real ServerConnection or OneShotCliConnection satisfies it unchanged. */
export interface ForgeCapabilitySource {
  readonly capabilities: CapabilityMap | null;
}
/** Compile-time pins: the vendored client and connections are these seams, so production hands them over unchanged. */
type OperationsSeam<Client extends ForgeCancelOperations> = Client;
type CapabilitySeam<Source extends ForgeCapabilitySource> = Source;
export type VendoredForgeCancelOperations = OperationsSeam<OperationClient>;
export type VendoredForgeConnection = CapabilitySeam<ServerConnection>;
/**
 * The one-shot fallback type-checks as BOTH seams (its cancel(): never is assignable), so the type system cannot refuse it.
 * Its capability map, which states cancel unsupported, does.
 */
export type VendoredForgeOneShot = OperationsSeam<OneShotCliConnection> & CapabilitySeam<OneShotCliConnection>;

/** One measured native verb: the wire method, the vendored call that writes it, its one param, and its facade name. */
export interface ForgeControlVerb {
  /** The wire method (dist/operation.js:38), also the name an app server enumerates for it in its capability map. */
  readonly method: "operation.cancel";
  /** The vendored call that writes it (dist/operation.d.ts:77). */
  readonly call: "OperationClient.cancel";
  /** The frame's one param (dist/operation.js:108). */
  readonly param: typeof OPERATION_ID_FIELD;
  /** The name the shared capability-map vocabulary gives the same verb (dist/errors.d.ts:86; fallback.js:76). */
  readonly facade: "cancel";
}
const verb = (spec: ForgeControlVerb): ForgeControlVerb => Object.freeze(spec);
/**
 * The closed allowlist, keyed by native target type and then core action, pinned to the measured vendored surface. Nothing
 * else is ever sent, and a row executes only for an action the landed core admits too (NATIVE_CONTROL_ACTIONS.forge).
 */
export const FORGE_CONTROL_VERBS: Readonly<Record<string, Readonly<Record<string, ForgeControlVerb>>>> = Object.freeze({
  operation: Object.freeze({
    cancel: verb({ method: "operation.cancel", call: "OperationClient.cancel", param: "operation_id", facade: "cancel" }),
  }),
});
/** The declaration every capability-unavailable refusal quotes. */
export const FORGE_CANCEL_DECLARATION =
  "@forge/sdk@0.1.0 dist/operation.d.ts:77 OperationClient.cancel(operationId: string): Promise<CancelReceipt> writes one operation.cancel {operation_id} frame (dist/operation.js:38, :108)";

/** The vendored literals this adapter compares against, each pinned to its declaration so a drift fails typecheck. */
const SUPPORTED: typeof CapabilityState.SUPPORTED = "supported";
const UNSUPPORTED: typeof CapabilityState.UNSUPPORTED = "unsupported";
const CANCELLED_ESTABLISHED: typeof CANCELLATION_DISPOSITION = "cancelled-established";
const DISPOSITION_FIELD: typeof TERMINAL_DISPOSITION_FIELD = "terminal_disposition";
const OPERATION_ID: typeof OPERATION_ID_FIELD = "operation_id";
const ACCEPTED: Extract<CancelAcceptance, "ACCEPTED"> = "ACCEPTED";
const FACADE_REFUSED: Extract<ForgeSdkErrorCode, "FORGE_UNSUPPORTED_CAPABILITY"> = "FORGE_UNSUPPORTED_CAPABILITY";
const SERVER_ERROR: Extract<ForgeSdkErrorCode, "FORGE_SERVER_ERROR"> = "FORGE_SERVER_ERROR";
/** The closed capability tri-state, exhaustive over the vendored CapabilityState union. */
const CAPABILITY_STATES: Readonly<Record<CapabilityState, true>> = Object.freeze({ supported: true, unsupported: true, unknown: true });
/** The intent each acceptance comes with, exhaustive over the vendored CancelAcceptance roster (dist/cancellation.d.ts:31). */
const INTENT_OF: Readonly<Record<CancelAcceptance, CancelIntent>> = Object.freeze({
  ACCEPTED: "CANCEL_REQUESTED",
  REFUSED_NOT_FOUND: "NOT_REQUESTED",
  REFUSED_NOT_CANCELLABLE: "NOT_REQUESTED",
  REFUSED_ALREADY_TERMINAL: "NOT_REQUESTED",
});
/**
 * Server refusal codes the Forge app server raises before any lookup or actuation (invalid_params for params naming no
 * string operation_id, operation_not_found for an id it holds no record of). The vendored SDK passes server codes through
 * verbatim and declares none, so any other code, or a renamed one, parks as uncertain: never a false "nothing happened".
 */
const PRE_EFFECT_SERVER_CODES: readonly string[] = Object.freeze(["operation_not_found", "invalid_params"]);

export type ForgeControlRefusalCode = "denied-decision" | "unvetted-decision" | "permit-consumed" | "unsupported-verb" | "invalid-target" |
  "invalid-deps" | "foreign-workspace" | "capability-unavailable" | "aborted-before-issue" | "not-settleable";
export type ForgeSurfaceState = CapabilityState | "no-capability-map" | "unreadable";
/** What was measured of the native cancel when it was refused: the receipt a capability-unavailable refusal carries. */
export interface ForgeCancelSurface {
  readonly declaration: typeof FORGE_CANCEL_DECLARATION;
  /** Whether the injected seam carries the vendored cancel function, or its facade refused when called (nothing sent). */
  readonly seamMethod: "present" | "absent" | "refused";
  /** The capability map's transport mode as the one shared helper displays it (shown); null when no map was readable. */
  readonly mode: string | null;
  /** The map's statement for the wire method (operation.cancel). */
  readonly state: ForgeSurfaceState;
  /** The map's statement for the facade name (cancel), which the one-shot fallback states unsupported. */
  readonly facadeState: ForgeSurfaceState;
}
/** A typed refusal raised before anything reached Forge; a refusal never follows a frame Forge received. */
export class ForgeControlRefusal extends CapabilityError {
  constructor(category: CapabilityErrorCategory, readonly refusal: ForgeControlRefusalCode, message: string, readonly policy?: string,
    readonly surface?: ForgeCancelSurface) {
    super(category, message);
  }
}

export type ForgeControlStatus = "acknowledged" | "not-accepted" | "settled" | "uncertain";
/** Why the native effect is not established. Every reason is parked for operator reconciliation, never retried. */
export type ForgeControlUncertainty = "seam-failure" | "wait-timeout" | "wait-aborted" | "unattributable-answer" | "contradictory-answer" |
  "receipt-refused" | "transport-terminal" | "no-terminal-echo";
/** Forge's answer as observed, every string as the one shared helper displays it (shown); observed, not verified. */
export interface ForgeControlEcho {
  readonly operationId?: string;
  readonly cancelIntent?: string;
  readonly cancelAcceptance?: string;
  readonly establishment?: string;
  readonly serverCode?: string;
  readonly terminalDisposition?: string;
}
/** A closed-vocabulary label of a native failure; messages, stderr, data and payloads are never echoed. */
export interface ForgeControlFailure { readonly code: string; readonly serverCode?: string }
export interface ForgeControlExecution {
  readonly verb: ForgeControlVerb["method"];
  readonly status: ForgeControlStatus;
  /** The latest phase the core minted: result when settled, acknowledged when Forge accepted the cancel, else requested. */
  readonly receipt: NativeControlReceipt;
  readonly requested: RequestedControlReceipt;
  readonly acknowledged?: AcknowledgedControlReceipt;
  readonly result?: ResultControlReceipt;
  readonly echo?: ForgeControlEcho;
  readonly uncertainty?: { readonly reason: ForgeControlUncertainty; readonly failure?: ForgeControlFailure };
}
export interface ForgeControlDeps {
  /** The vendored operation client over the connection that started the operation: Forge operation ids are per session. */
  readonly operations: ForgeCancelOperations;
  /** The same connection's negotiated capability statement. */
  readonly connection: ForgeCapabilitySource;
  /** The workspace the connection serves; a decision scoped elsewhere is refused. */
  readonly workspaceRoot: string;
  /** Host clock for the acknowledged phase. */
  readonly now: () => string;
  /** The bound on waiting for Forge's answer: the vendored request itself waits for as long as the connection lives. */
  readonly timeoutMs: number;
  /** Aborting stops the wait, never the cancel already handed to the seam. */
  readonly signal?: AbortSignal;
}

/** The core's request id shape. */
const REQUEST_ID = /^ctl_[0-9a-f]{32}$/;
/** A Forge operation id as the operations service allocates it (uuid4 hex) or a peer supplies it, within the forge-operation ref grammar. */
const NATIVE_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
/** A closed-vocabulary SDK error code, and a server error code; anything else is reported as unknown or omitted. */
const SDK_CODE = /^[A-Z][A-Z0-9_]{0,63}$/;
const SERVER_CODE = /^[a-z][a-z0-9_]{0,63}$/;
/** A terminal disposition in the event-delivery vocabulary (kebab-case, as "cancelled-established"). */
const DISPOSITION = /^[a-z][a-z0-9-]{0,63}$/;
/** The bound a disposition is vetted under: the whole grammar fits, so the helper can only change it by redacting. */
const DISPOSITION_TEXT = 64;
/**
 * What a result reference carries instead of a disposition the shared helper would change (a credential-shaped one): the
 * disposition is withheld, never repaired. The brackets keep it outside the kebab-case grammar, so it never reads as Forge's.
 */
const WITHHELD_DISPOSITION = "[withheld]";
/**
 * The core's denial vocabulary, exactly ControlDenyPolicy (satisfies refuses a missing and an extra key alike): a denied
 * decision's policy is echoed only when it is one of these, so a look-alike denial can never carry producer or caller text
 * into a refusal.
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
const ECHO_TEXT = 256;
const MAX_TIMER_MS = 2_147_483_647;
const UNVETTED = "Forge control executes only a permitted workbench.control/v1 decision minted by the control core.";
/** Receipts whose one cancel was handed to the seam: a permit executes once. */
const issued = new WeakSet<object>();
/** Acknowledged executions this module returned and has not settled: the only inputs settleForgeControl accepts. */
const awaiting = new WeakSet<object>();

/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
function record(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function frozenRecord(value: unknown): value is object {
  return record(value) && Object.isFrozen(value);
}
function isState(value: unknown): value is CapabilityState {
  return typeof value === "string" && Object.hasOwn(CAPABILITY_STATES, value);
}
function isAcceptance(value: string): value is CancelAcceptance {
  return Object.hasOwn(INTENT_OF, value);
}
function isDenyPolicy(value: unknown): value is ControlDenyPolicy {
  return typeof value === "string" && Object.hasOwn(DENY_POLICIES, value);
}
/**
 * Producer text bound for an operator: the one shared helper, which normalizes, redacts and strips in that order, in its "text"
 * layout (whitespace controls become one space, every other unsafe unit vanishes), bounded. Nothing is deleted before it, so
 * every reading of an unsafe unit reaches redaction (BOUNDARY 21:00Z display-path rule).
 */
function shown(value: string): string {
  return sanitizeWorkbenchText(value, ECHO_TEXT, "text");
}

/**
 * The receipt of a permitted decision as the core mints it: frozen, requested, under the core's contract and policy, for
 * an action the core admits for its provider, under the canonical control:<provider>.<action> grant. Nothing is
 * recomputed; a look-alike the core could not have minted is unvetted.
 */
function permitted(decision: unknown): RequestedControlReceipt {
  if (!frozenRecord(decision)) throw new ForgeControlRefusal("validation", "unvetted-decision", UNVETTED);
  const verdict = own(decision, "decision");
  if (verdict === "denied") {
    const policy = own(decision, "policy");
    throw new ForgeControlRefusal(own(decision, "category") === "validation" ? "validation" : "authorization", "denied-decision",
      "Forge control refuses a denied decision; nothing was sent.", isDenyPolicy(policy) ? policy : undefined);
  }
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
    throw new ForgeControlRefusal("validation", "unvetted-decision", UNVETTED);
  }
  return receipt as RequestedControlReceipt;
}
function validDeps(deps: ForgeControlDeps): ForgeControlDeps {
  const invalid = (): ForgeControlRefusal => new ForgeControlRefusal("validation", "invalid-deps",
    "Forge control requires an operation client, its connection, a workspace root, a host clock and a bounded timeout.");
  if (!record(deps)) throw invalid();
  const { operations, connection, workspaceRoot, now, timeoutMs, signal } = deps;
  if (!record(operations) || !record(connection) || typeof workspaceRoot !== "string" || workspaceRoot === "" || typeof now !== "function" ||
    !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMER_MS || (signal !== undefined && !(signal instanceof AbortSignal))) {
    throw invalid();
  }
  return deps;
}

/** The seam's cancel, read once so the function checked is the function called; a throwing or absent member reads as absent. */
function cancelOf(operations: ForgeCancelOperations): ForgeCancelOperations["cancel"] | undefined {
  try {
    const cancel = operations.cancel;
    return typeof cancel === "function" ? cancel : undefined;
  } catch {
    return undefined;
  }
}
interface Statement { readonly mode: string | null; readonly state: ForgeSurfaceState; readonly facadeState: ForgeSurfaceState }
/** The connection's negotiated statement for the verb; a throwing or malformed source is unreadable, never supported. */
function statementOf(connection: ForgeCapabilitySource, chosen: ForgeControlVerb): Statement {
  let map: CapabilityMap | null;
  try {
    map = connection.capabilities;
  } catch {
    return { mode: null, state: "unreadable", facadeState: "unreadable" };
  }
  if (map === null || map === undefined) return { mode: null, state: "no-capability-map", facadeState: "no-capability-map" };
  if (typeof map !== "object") return { mode: null, state: "unreadable", facadeState: "unreadable" };
  const source: Partial<CapabilityMap> = map;
  const read = (name: string): ForgeSurfaceState => {
    try {
      const state: unknown = source.stateOf?.(name);
      return isState(state) ? state : "unreadable";
    } catch {
      return "unreadable";
    }
  };
  let mode: unknown;
  try {
    mode = source.mode;
  } catch {
    mode = undefined;
  }
  return { mode: typeof mode === "string" ? shown(mode) : null, state: read(chosen.method), facadeState: read(chosen.facade) };
}
function unavailable(seamMethod: ForgeCancelSurface["seamMethod"], { mode, state, facadeState }: Statement): ForgeControlRefusal {
  const surface: ForgeCancelSurface = Object.freeze({ declaration: FORGE_CANCEL_DECLARATION, seamMethod, mode, state, facadeState });
  return new ForgeControlRefusal("unavailable", "capability-unavailable",
    "Forge offers no native cancel through this connection: nothing was sent, and no cancellation is requested or claimed.", undefined, surface);
}

type Answer = { readonly kind: "answered"; readonly value: unknown } | { readonly kind: "rejected"; readonly error: unknown } |
  { readonly kind: "wait-timeout" | "wait-aborted" };
/** The one cancel. A synchronous throw counts like a rejection: the frame may have been written. */
function issueOnce(cancel: ForgeCancelOperations["cancel"], operations: ForgeCancelOperations, operationId: string): Promise<unknown> {
  try {
    return Promise.resolve(cancel.call(operations, operationId));
  } catch (error) {
    return Promise.reject(error);
  }
}
/** A bounded wait for the one answer. A timeout or an abort stops the wait, never the cancel, and a late answer is discarded. */
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
    // The seam itself may have aborted the signal while being called, before the listener existed.
    if (signal?.aborted) aborted();
    call.then(value => finish({ kind: "answered", value }), (error: unknown) => finish({ kind: "rejected", error }));
  });
}

/** Forge's own payload fields as observed. */
function echoOf(raw: unknown): ForgeControlEcho | undefined {
  if (!record(raw)) return undefined;
  const fields: readonly (readonly [keyof ForgeControlEcho, unknown])[] = [["operationId", own(raw, OPERATION_ID)],
    ["cancelIntent", own(raw, "cancel_intent")], ["cancelAcceptance", own(raw, "cancel_acceptance")], ["establishment", own(raw, "establishment")]];
  const echo: { -readonly [Key in keyof ForgeControlEcho]: string } = {};
  for (const [key, value] of fields) if (typeof value === "string") echo[key] = shown(value);
  return Object.freeze(echo);
}
function failureOf(error: unknown): ForgeControlFailure {
  const code = own(error, "code");
  const serverCode = own(error, "serverCode");
  const label = typeof code === "string" && SDK_CODE.test(code) ? shown(code) : "unknown";
  const server = label === SERVER_ERROR && typeof serverCode === "string" && SERVER_CODE.test(serverCode) ? shown(serverCode) : undefined;
  return Object.freeze({ code: label, ...(server !== undefined ? { serverCode: server } : {}) });
}
function uncertain(chosen: ForgeControlVerb, requested: RequestedControlReceipt, reason: ForgeControlUncertainty,
  { echo, failure }: { echo?: ForgeControlEcho; failure?: ForgeControlFailure } = {}): ForgeControlExecution {
  return Object.freeze({
    verb: chosen.method, status: "uncertain", receipt: requested, requested, ...(echo ? { echo } : {}),
    uncertainty: Object.freeze({ reason, ...(failure ? { failure } : {}) }),
  });
}
/** A rejected cancel: Forge's own pre-effect refusal frame is not-accepted; anything else may have reached Forge. */
function rejected(chosen: ForgeControlVerb, requested: RequestedControlReceipt, error: unknown): ForgeControlExecution {
  const serverCode = own(error, "serverCode");
  if (own(error, "code") === SERVER_ERROR && typeof serverCode === "string" && PRE_EFFECT_SERVER_CODES.includes(serverCode)) {
    return Object.freeze({ verb: chosen.method, status: "not-accepted", receipt: requested, requested, echo: Object.freeze({ serverCode: shown(serverCode) }) });
  }
  return uncertain(chosen, requested, "seam-failure", { failure: failureOf(error) });
}
/** Mints the acknowledged phase through the core from Forge's one answer, never beyond what that answer states. Never throws. */
function conclude(chosen: ForgeControlVerb, requested: RequestedControlReceipt, answer: Answer, now: () => string): ForgeControlExecution {
  if (answer.kind === "rejected") return rejected(chosen, requested, answer.error);
  if (answer.kind !== "answered") return uncertain(chosen, requested, answer.kind);
  const { value } = answer;
  const raw = own(value, "raw");
  const echo = echoOf(raw);
  const intent = own(value, "cancelIntent");
  const acceptance = own(value, "cancelAcceptance");
  const id = requested.target.id;
  // Attributable only when Forge's own payload echoes the target's operation_id and the decoded receipt is exactly that payload's.
  if (!record(value) || !record(raw) || own(value, "operationId") !== id || own(raw, OPERATION_ID) !== id ||
    own(value, "cancellationEstablished") !== false || own(raw, "cancellation_established") !== false || typeof intent !== "string" ||
    typeof acceptance !== "string" || own(raw, "cancel_intent") !== intent || own(raw, "cancel_acceptance") !== acceptance || !isAcceptance(acceptance)) {
    return uncertain(chosen, requested, "unattributable-answer", { echo });
  }
  if (INTENT_OF[acceptance] !== intent) return uncertain(chosen, requested, "contradictory-answer", { echo });
  if (acceptance !== ACCEPTED) return Object.freeze({ verb: chosen.method, status: "not-accepted", receipt: requested, requested, ...(echo ? { echo } : {}) });
  let acknowledged: AcknowledgedControlReceipt;
  try {
    acknowledged = acknowledge(requested, { acknowledgedAt: now(), nativeAckRef: `forge-operation:${id}:${chosen.method}:${intent}:${acceptance}` });
  } catch {
    // The core refused to mint the acknowledged phase (for example from an unzoned host clock) after the cancel was sent.
    return uncertain(chosen, requested, "receipt-refused", { echo });
  }
  const execution: ForgeControlExecution = Object.freeze({ verb: chosen.method, status: "acknowledged", receipt: acknowledged, requested, acknowledged,
    ...(echo ? { echo } : {}) });
  awaiting.add(execution);
  return execution;
}

/**
 * WorkbenchHost.requestControl's Forge leg (docs/workbench/13 § "Host boundary") for a decision the caller already obtained
 * from the control core. Refuses (ForgeControlRefusal, nothing sent) a denied, unvetted or spent decision, an action with no
 * measured Forge verb for its target type, a non-native operation id, invalid dependencies, a target outside the served
 * workspace, a connection that does not explicitly state operation.cancel supported, and a wait cancelled before sending;
 * otherwise hands exactly one cancel to the seam and resolves with what Forge's answer establishes, at most acknowledged.
 */
export async function executeForgeControl(decision: ControlDecision, deps: ForgeControlDeps): Promise<ForgeControlExecution> {
  const requested = permitted(decision);
  if (issued.has(requested)) {
    throw new ForgeControlRefusal("validation", "permit-consumed", "This control permit already sent its cancel; a reissue needs a fresh decision.");
  }
  const { target, action } = requested;
  const verbs = target.provider === "forge" && Object.hasOwn(FORGE_CONTROL_VERBS, target.type) ? FORGE_CONTROL_VERBS[target.type] : undefined;
  const chosen = verbs !== undefined && Object.hasOwn(verbs, action) ? verbs[action] : undefined;
  if (chosen === undefined) throw new ForgeControlRefusal("validation", "unsupported-verb", "No measured Forge control verb exists for this target type and action.");
  if (!NATIVE_ID.test(target.id)) throw new ForgeControlRefusal("validation", "invalid-target", "Forge control target is not a native Forge operation identifier.");
  const { operations, connection, workspaceRoot, now, timeoutMs, signal } = validDeps(deps);
  // The Pi host projects native SDK nodes unscoped (src/index.ts); a stated scope must be the workspace the connection serves.
  if (requested.scope.workspace !== workspaceRoot || (target.scope !== undefined && target.scope !== workspaceRoot)) {
    throw new ForgeControlRefusal("authorization", "foreign-workspace", "Forge control target is outside the workspace the connection serves.");
  }
  const cancel = cancelOf(operations);
  const statement = statementOf(connection, chosen);
  if (cancel === undefined) throw unavailable("absent", statement);
  // Only an explicit statement admits the verb: unknown is not unsupported, and it is not permission either.
  if (statement.state !== SUPPORTED || statement.facadeState === UNSUPPORTED) throw unavailable("present", statement);
  if (signal?.aborted) throw new ForgeControlRefusal("transport", "aborted-before-issue", "Forge control was cancelled before the cancel was sent.");
  // Spent before sending and in the same turn, so neither a concurrent nor a later submission can send it again.
  issued.add(requested);
  const answer = await waitForAnswer(issueOnce(cancel, operations, target.id), timeoutMs, signal);
  // The facade refused and sent nothing (dist/errors.d.ts:84-95): the same typed refusal, and the permit stays spent.
  if (answer.kind === "rejected" && own(answer.error, "code") === FACADE_REFUSED) throw unavailable("refused", statement);
  return conclude(chosen, requested, answer, now);
}

/**
 * Records the operation's own end against an acknowledged cancel this module returned: a request is not an accepted action,
 * and an accepted action is not its outcome (docs/workbench/08 § "State/event semantics"). Only the terminal frame
 * establishes anything: its terminal_disposition "cancelled-established" settles cancelled; any other disposition settles
 * unknown, quoting Forge, unless the shared helper would change it (a credential-shaped disposition), which the result
 * reference withholds rather than repairs. A transport-terminal end, or a frame without the operation's own echo, parks as
 * uncertain and leaves the receipt settleable. A result is minted at most once.
 */
export function settleForgeControl(execution: ForgeControlExecution, end: OperationEnd<ForgeJsonValue>, now: () => string): ForgeControlExecution {
  const acknowledged = record(execution) && awaiting.has(execution) ? execution.acknowledged : undefined;
  if (acknowledged === undefined) {
    throw new ForgeControlRefusal("validation", "not-settleable", "Only an acknowledged Forge cancel this adapter returned can be settled, once.");
  }
  if (typeof now !== "function") throw new ForgeControlRefusal("validation", "invalid-deps", "Settling a Forge cancel requires a host clock.");
  const { requested, echo } = execution;
  const parked = (reason: ForgeControlUncertainty, failure?: ForgeControlFailure): ForgeControlExecution => Object.freeze({
    verb: execution.verb, status: "uncertain", receipt: acknowledged, requested, acknowledged, ...(echo ? { echo } : {}),
    uncertainty: Object.freeze({ reason, ...(failure ? { failure } : {}) }),
  });
  const terminality = own(end, "terminality");
  // The end of the stream is not a verdict (dist/operation_stream.d.ts:23-33).
  if (terminality === "transport_terminal") return parked("transport-terminal", failureOf(own(end, "error")));
  const result = own(end, "result");
  const disposition = own(result, DISPOSITION_FIELD);
  if (terminality !== "forge_terminal" || !record(result) || own(result, OPERATION_ID) !== requested.target.id || typeof disposition !== "string" ||
    !DISPOSITION.test(disposition)) {
    return parked("no-terminal-echo");
  }
  // The reference quotes Forge's disposition only when the shared helper would display it unchanged; otherwise it is withheld.
  const quoted = sanitizeWorkbenchText(disposition, DISPOSITION_TEXT, "label") === disposition ? disposition : WITHHELD_DISPOSITION;
  let settled: ResultControlReceipt;
  try {
    settled = settle(acknowledged, { outcome: disposition === CANCELLED_ESTABLISHED ? "cancelled" : "unknown",
      nativeResultRef: `forge-operation:${requested.target.id}:${DISPOSITION_FIELD}=${quoted}`, settledAt: now() });
  } catch {
    return parked("receipt-refused");
  }
  awaiting.delete(execution);
  return Object.freeze({ verb: execution.verb, status: "settled", receipt: settled, requested, acknowledged, result: settled,
    echo: Object.freeze({ ...echo, terminalDisposition: shown(disposition) }) });
}
