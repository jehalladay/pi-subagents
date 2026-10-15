/**
 * Furnace native control adapter (W16-D, VC-4; docs/workbench/07 § "Furnace provider", docs/workbench/11 § "First public
 * Pi tools"). It executes ONE permitted workbench.control/v1 decision minted by the landed core (src/workbench/control.ts,
 * decideControl) through the vendored @furnace/sdk control verbs, and records Furnace's own answers through the core's
 * acknowledge and settle. It decides nothing: grants, scope, lifecycle ownership and operator confirmation are the core's
 * rules, the caller owns the decision, and nothing here registers a tool or wires a host. Provenance comes first: only the
 * very decision object decideControl returned in this process executes (isCoreMintedDecision), so a copy, a decision
 * replayed from the audit or the journal and a hand-built look-alike never issue a verb, however exact their shape.
 *
 * - A FurnaceControlRefusal always means no native verb was issued.
 * - A returned execution always means exactly one native call was issued. It is never re-issued, whatever the answer:
 *   failure, timeout and indeterminate answers park as `uncertain` for operator reconciliation instead of retrying.
 * - Transport success is never domain verification: acknowledged needs the verb's own envelope echoing the receipt's
 *   request id, and a result needs the target's record echoing the state the verb settles in.
 */
import type { AttemptDto, CallOptions, Furnace, Response, ResponseKind, RunDto, RunResumeRequest, RunState } from "@furnace/sdk";
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import {
  type AcknowledgedControlReceipt,
  acknowledge,
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  CONTROL_UNMINTED_REASON,
  type ControlDecision,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "./control.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The vendored client's control surface. A real `Furnace` satisfies it unchanged; tests inject a fake. */
export interface FurnaceControlClient {
  runs: {
    pause(runId: string, call?: CallOptions): Promise<Response<RunDto>>;
    stop(runId: string, call?: CallOptions): Promise<Response<RunDto>>;
    resume(runId: string, request?: RunResumeRequest, call?: CallOptions): Promise<Response<RunDto>>;
  };
  attempts: { stop(attemptId: string, call?: CallOptions): Promise<Response<AttemptDto>> };
}
/** Compile-time pin: the vendored client is this seam, so production hands it over unchanged. */
type Seam<Client extends FurnaceControlClient> = Client;
export type VendoredFurnaceControlClient = Seam<Furnace>;

export type FurnaceControlCommand = "run pause" | "run stop" | "run resume" | "attempt stop";
/** One row of the vendored clientOperations table (@furnace/sdk dist/src/argv.d.ts), plus what its answer must echo. */
export interface FurnaceControlVerb {
  readonly command: FurnaceControlCommand;
  readonly builder: "runPause" | "runStop" | "runResume" | "attemptStop";
  readonly operation: "Runs.pause" | "Runs.stop" | "Runs.resume" | "Attempts.stop";
  readonly kind: ResponseKind;
  /** The record field that must echo the target's native id. */
  readonly echoes: "run_id" | "attempt_id";
  /**
   * The Run state Furnace's answer records once the action took effect. Absent, the answer only acknowledges:
   * attempt stop delivers one graceful signal, and the ending is the child's, observed later.
   */
  readonly settles?: RunState;
}
const verb = (spec: FurnaceControlVerb): FurnaceControlVerb => Object.freeze(spec);
/**
 * The closed allowlist, keyed by native target type and then core action, pinned to the measured vendored argv contract
 * (@furnace/sdk dist/src/argv.d.ts:105-160). Nothing else is ever forwarded (no start, adopt, retry, unlock or clear),
 * and a row executes only for an action the landed core admits too (NATIVE_CONTROL_ACTIONS.furnace).
 */
export const FURNACE_CONTROL_VERBS: Readonly<Record<string, Readonly<Record<string, FurnaceControlVerb>>>> = Object.freeze({
  run: Object.freeze({
    pause: verb({ command: "run pause", builder: "runPause", operation: "Runs.pause", kind: "run_pause", echoes: "run_id", settles: "paused" }),
    stop: verb({ command: "run stop", builder: "runStop", operation: "Runs.stop", kind: "run_stop", echoes: "run_id", settles: "stopped" }),
    resume: verb({ command: "run resume", builder: "runResume", operation: "Runs.resume", kind: "run_resume", echoes: "run_id", settles: "active" }),
  }),
  attempt: Object.freeze({
    stop: verb({ command: "attempt stop", builder: "attemptStop", operation: "Attempts.stop", kind: "attempt_stop", echoes: "attempt_id" }),
  }),
});
/** `run resume` reconciles and re-enables scheduling; a bounded control call never supervises (`--continue`). */
const RESUME: RunResumeRequest = Object.freeze({ continue: false });
const ISSUE: Readonly<Record<FurnaceControlCommand, (client: FurnaceControlClient, id: string, call: CallOptions) => Promise<unknown>>> = Object.freeze({
  "run pause": (client, id, call) => client.runs.pause(id, call),
  "run stop": (client, id, call) => client.runs.stop(id, call),
  "run resume": (client, id, call) => client.runs.resume(id, RESUME, call),
  "attempt stop": (client, id, call) => client.attempts.stop(id, call),
});

export type FurnaceControlRefusalCode = "denied-decision" | "unvetted-decision" | "permit-consumed" | "unsupported-verb" | "invalid-target" |
  "invalid-deps" | "foreign-workspace" | "aborted-before-issue";
/** A typed refusal raised before the native verb is issued; a refusal never follows a native call. */
export class FurnaceControlRefusal extends CapabilityError {
  constructor(category: CapabilityErrorCategory, readonly refusal: FurnaceControlRefusalCode, message: string, readonly policy?: string) {
    super(category, message);
  }
}

export type FurnaceControlStatus = "settled" | "acknowledged" | "uncertain";
/** Why the native effect is not established. Every reason is parked for operator reconciliation, never retried. */
export type FurnaceControlUncertainty = "seam-failure" | "wait-timeout" | "wait-aborted" | "unattributable-answer" | "no-target-echo" |
  "no-terminal-echo" | "receipt-refused";
/** Furnace's answer as observed, every string through the shared sanitizers; observed, not verified. */
export interface FurnaceControlEcho { readonly kind?: string; readonly requestId?: string; readonly id?: string; readonly state?: string }
export interface FurnaceControlExecution {
  readonly verb: FurnaceControlCommand;
  readonly status: FurnaceControlStatus;
  /** The latest phase the core minted: result when settled, otherwise acknowledged when Furnace accepted the verb, else requested. */
  readonly receipt: NativeControlReceipt;
  readonly requested: RequestedControlReceipt;
  readonly acknowledged?: AcknowledgedControlReceipt;
  readonly result?: ResultControlReceipt;
  readonly echo?: FurnaceControlEcho;
  readonly uncertainty?: { readonly reason: FurnaceControlUncertainty; readonly failure?: { readonly kind: string; readonly code?: string } };
}
export interface FurnaceControlDeps {
  /** The vendored client bound to workspaceRoot (Furnace's -C). */
  readonly client: FurnaceControlClient;
  readonly workspaceRoot: string;
  /** Host clock for the acknowledged and result phases. */
  readonly now: () => string;
  /** The bound on the one native call: the SDK's CallOptions.timeoutMs, and the bound on waiting for its answer. */
  readonly timeoutMs: number;
  /** Aborting stops the wait, never the verb already issued. */
  readonly signal?: AbortSignal;
}

/** The core's request id shape, which is also a valid Furnace --request-id (FRN-CLI-040). */
const REQUEST_ID = /^ctl_[0-9a-f]{32}$/;
/** A Furnace-minted identifier: never flag-shaped, so it cannot reach the argv as an option. */
const NATIVE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
/** A closed-vocabulary native label: an SDK error kind or an envelope error code. */
const NATIVE_LABEL = /^[a-z][a-z0-9_]{0,63}$/;
const DENY_POLICY = /^[a-z][a-z-]{0,63}$/;
/** Furnace's RFC 3339 instant (nanosecond fraction, offset-qualified). Date.parse alone also admits free text around a date. */
const NATIVE_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
const ECHO_TEXT = 256;
const MAX_TIMER_MS = 2_147_483_647;
const UNVETTED = "Furnace control executes only a permitted workbench.control/v1 decision minted by the control core.";
/** Receipts whose one native call was issued: a permit executes once. */
const issued = new WeakSet<object>();

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
function nativeInstant(value: unknown): value is string {
  return typeof value === "string" && NATIVE_INSTANT.test(value) && Number.isFinite(Date.parse(value));
}

function deniedRefusal(decision: object): FurnaceControlRefusal {
  const policy = own(decision, "policy");
  return new FurnaceControlRefusal(own(decision, "category") === "validation" ? "validation" : "authorization", "denied-decision",
    "Furnace control refuses a denied decision; no native verb was issued.", typeof policy === "string" && DENY_POLICY.test(policy) ? policy : undefined);
}
function consumedRefusal(): FurnaceControlRefusal {
  return new FurnaceControlRefusal("validation", "permit-consumed", "This control permit already issued its native verb; a reissue needs a fresh decision.");
}
/**
 * Why a decision the core did not mint is refused. The core mints only permits, so a denial keeps its typed denied-decision
 * refusal and a re-wrapped receipt this adapter already issued stays permit-consumed; anything else, including a value whose
 * reads throw (a revoked or trapping proxy), gets the core's fixed text and echoes nothing. No branch issues a native verb.
 */
function unminted(decision: unknown): FurnaceControlRefusal {
  try {
    if (frozenRecord(decision)) {
      if (own(decision, "decision") === "denied") return deniedRefusal(decision);
      const receipt = own(decision, "receipt");
      if (record(receipt) && issued.has(receipt)) return consumedRefusal();
    }
  } catch {
    // A value whose reads throw is no decision the core minted.
  }
  return new FurnaceControlRefusal("validation", "unvetted-decision", CONTROL_UNMINTED_REASON);
}
/**
 * The receipt of a permitted decision the core minted. Provenance first: only the very decision object decideControl minted
 * in this process passes. Structural vetting stays behind it as defense in depth: frozen, requested, under the core's
 * contract and policy, for an action the core admits for its provider, under the canonical control:<provider>.<action>
 * grant. Nothing is recomputed; a look-alike the core could not have minted is unvetted.
 */
function permitted(decision: unknown): RequestedControlReceipt {
  if (!isCoreMintedDecision(decision)) throw unminted(decision);
  if (!frozenRecord(decision)) throw new FurnaceControlRefusal("validation", "unvetted-decision", UNVETTED);
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
    throw new FurnaceControlRefusal("validation", "unvetted-decision", UNVETTED);
  }
  return receipt as RequestedControlReceipt;
}
function validDeps(deps: FurnaceControlDeps): FurnaceControlDeps {
  const invalid = (): FurnaceControlRefusal =>
    new FurnaceControlRefusal("validation", "invalid-deps", "Furnace control requires a control client, a workspace root, a host clock and a bounded timeout.");
  if (!record(deps)) throw invalid();
  const { client, workspaceRoot, now, timeoutMs, signal } = deps;
  const methods = [client?.runs?.pause, client?.runs?.stop, client?.runs?.resume, client?.attempts?.stop];
  if (!methods.every(method => typeof method === "function") || typeof workspaceRoot !== "string" || workspaceRoot === "" || typeof now !== "function" ||
    !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMER_MS || (signal !== undefined && !(signal instanceof AbortSignal))) {
    throw invalid();
  }
  return deps;
}

type Answer = { readonly kind: "answered"; readonly value: unknown } | { readonly kind: "rejected"; readonly error: unknown } |
  { readonly kind: "wait-timeout" | "wait-aborted" };
/** The one native call. A synchronous throw counts as a seam failure like a rejection: the verb may have started. */
function issueOnce(command: FurnaceControlCommand, client: FurnaceControlClient, id: string, call: CallOptions): Promise<unknown> {
  try {
    return Promise.resolve(ISSUE[command](client, id, call));
  } catch (error) {
    return Promise.reject(error);
  }
}
/** A bounded wait for the one answer. A timeout or an abort stops the wait, never the verb, and a late answer is discarded. */
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

function echoOf(verb: FurnaceControlVerb, answer: unknown): FurnaceControlEcho | undefined {
  if (!record(answer)) return undefined;
  const data = own(answer, "data");
  const fields: readonly (readonly [keyof FurnaceControlEcho, unknown])[] =
    [["kind", own(answer, "kind")], ["requestId", own(answer, "requestId")], ["id", own(data, verb.echoes)], ["state", own(data, "state")]];
  const echo: Record<string, string> = {};
  for (const [key, value] of fields) if (typeof value === "string") echo[key] = sanitizeWorkbenchText(value, ECHO_TEXT);
  return Object.freeze(echo);
}
/** A bounded closed-vocabulary label from a native failure. Messages, stdout, stderr and details are never echoed. */
function failureOf(error: unknown): { readonly kind: string; readonly code?: string } {
  const label = (value: unknown): string | undefined => typeof value === "string" && NATIVE_LABEL.test(value) ? sanitizeWorkbenchText(value, ECHO_TEXT) : undefined;
  const kind = label(own(error, "kind"));
  const code = kind === "command_error" ? label(own(error, "code")) : undefined;
  return Object.freeze({ kind: kind ?? "unknown", ...(code !== undefined ? { code } : {}) });
}
function uncertain(verb: FurnaceControlVerb, requested: RequestedControlReceipt, reason: FurnaceControlUncertainty,
  { echo, acknowledged, failure }: { echo?: FurnaceControlEcho; acknowledged?: AcknowledgedControlReceipt; failure?: { readonly kind: string; readonly code?: string } } = {}): FurnaceControlExecution {
  return Object.freeze({
    verb: verb.command, status: "uncertain", receipt: acknowledged ?? requested, requested, ...(acknowledged ? { acknowledged } : {}), ...(echo ? { echo } : {}),
    uncertainty: Object.freeze({ reason, ...(failure ? { failure } : {}) }),
  });
}
/** Mints each later phase through the core from Furnace's one answer, never beyond what that answer states. Never throws. */
function conclude(verb: FurnaceControlVerb, requested: RequestedControlReceipt, answer: Answer, now: () => string): FurnaceControlExecution {
  if (answer.kind === "rejected") return uncertain(verb, requested, "seam-failure", { failure: failureOf(answer.error) });
  if (answer.kind !== "answered") return uncertain(verb, requested, answer.kind);
  const echo = echoOf(verb, answer.value);
  const data = own(answer.value, "data");
  // Only this verb's own success envelope echoing this receipt's request id (FRN-CLI-041) is Furnace accepting it.
  if (own(answer.value, "kind") !== verb.kind || own(answer.value, "requestId") !== requested.requestId || !record(data)) {
    return uncertain(verb, requested, "unattributable-answer", { echo });
  }
  let acknowledged: AcknowledgedControlReceipt | undefined;
  try {
    acknowledged = acknowledge(requested, { acknowledgedAt: now(), nativeAckRef: `${verb.kind}:${requested.requestId}` });
    if (own(data, verb.echoes) !== requested.target.id) return uncertain(verb, requested, "no-target-echo", { echo, acknowledged });
    if (verb.settles === undefined) {
      return Object.freeze({ verb: verb.command, status: "acknowledged", receipt: acknowledged, requested, acknowledged, ...(echo ? { echo } : {}) });
    }
    const since = own(data, "state_since");
    if (own(data, "state") !== verb.settles || !nativeInstant(since)) return uncertain(verb, requested, "no-terminal-echo", { echo, acknowledged });
    const result = settle(acknowledged, { outcome: "completed", nativeResultRef: `furnace-${requested.target.type}:${requested.target.id}:${verb.settles}@${since}`,
      settledAt: now() });
    return Object.freeze({ verb: verb.command, status: "settled", receipt: result, requested, acknowledged, result, ...(echo ? { echo } : {}) });
  } catch {
    // The core refused to mint a later phase (for example from an unzoned host clock) after the verb was issued.
    return uncertain(verb, requested, "receipt-refused", { echo, acknowledged });
  }
}

/**
 * WorkbenchHost.requestControl's Furnace leg (docs/workbench/13 § "Host boundary") for a decision the caller already
 * obtained from the control core. Refuses (FurnaceControlRefusal, nothing issued) a decision the core did not mint in this
 * process, a denied, unvetted or spent decision, an action with no measured Furnace verb for its target type, a flag-shaped
 * target id, invalid dependencies, a target outside the client's workspace and a wait cancelled before issuing; otherwise
 * issues exactly one native call and resolves with what Furnace's answer establishes.
 */
export async function executeFurnaceControl(decision: ControlDecision, deps: FurnaceControlDeps): Promise<FurnaceControlExecution> {
  const requested = permitted(decision);
  if (issued.has(requested)) throw consumedRefusal();
  const { target, action } = requested;
  const verbs = target.provider === "furnace" && Object.hasOwn(FURNACE_CONTROL_VERBS, target.type) ? FURNACE_CONTROL_VERBS[target.type] : undefined;
  const chosen = verbs !== undefined && Object.hasOwn(verbs, action) ? verbs[action] : undefined;
  if (chosen === undefined) throw new FurnaceControlRefusal("validation", "unsupported-verb", "No measured Furnace control verb exists for this target type and action.");
  if (!NATIVE_ID.test(target.id)) throw new FurnaceControlRefusal("validation", "invalid-target", "Furnace control target is not a native Furnace identifier.");
  const { client, workspaceRoot, now, timeoutMs, signal } = validDeps(deps);
  if (requested.scope.workspace !== workspaceRoot || target.scope !== workspaceRoot) {
    throw new FurnaceControlRefusal("authorization", "foreign-workspace", "Furnace control target is outside the workspace the control client is bound to.");
  }
  if (signal?.aborted) throw new FurnaceControlRefusal("transport", "aborted-before-issue", "Furnace control was cancelled before the native verb was issued.");
  // Spent before issuing and in the same turn, so neither a concurrent nor a later submission can issue it again.
  issued.add(requested);
  const answer = await waitForAnswer(issueOnce(chosen.command, client, target.id, { requestId: requested.requestId, timeoutMs }), timeoutMs, signal);
  return conclude(chosen, requested, answer, now);
}
