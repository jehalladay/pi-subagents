/**
 * function-authority.ts — the authority seam at the FINAL dispatch boundary of a function launch (wb-201v, MWI
 * B-authority, slice PI-1: EAT-R028..EAT-R031 of the mechanical-workflows-interop-2026-11-04 triage,
 * requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e).
 *
 * Once decideExecute (execute.ts) admits a function request, its launch may wait (an admission queue, backpressure, an
 * operator hold) before its loader imports the pinned export and its provider runs.
 * dispatchFunctionWithAuthority is the boundary such a launch passes through: it decides the function's authority when
 * the request enters and again, from FRESH host reads, once the wait settles, and nothing is awaited between that final
 * decision and the one dispatch it permits. No decision taken at entry is carried across the wait.
 *
 * Authority comes from the host alone: the grants the operator configured and the effective principal and session.
 * The request, its input, its JSON policy and the reviewed definition's metadata never confer a right.
 *   EAT-R028  workbench:execute must be held; a definition the adopted contract binds never confers it.
 *   EAT-R029  the exact host-issued action grant the adopted contract binds to the definition must be held, by string
 *             equality: another function's grant, a sibling action, the same permission under another namespace, or a
 *             longer or shorter spelling never stands in.
 *   EAT-R030  the effective principal and session at dispatch must each equal the one read at entry, field by field.
 *   EAT-R031  the grants are read again at dispatch, so a grant revoked during the wait refuses.
 *
 * PARTIAL by plan (BEAD-PLAN.md, B-authority: "enforcement seams land now; exact action grammar blocked on
 * MW-CONTRACT"). No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch
 * refuses, and one that passes the earlier rules refuses as function-action-unadopted. adoptFunctionActions accepts only a spelling Pi can carry through its grant
 * settings (workbench.capabilityGrants in settings.ts: namespace:permission, no wildcard) and its detached transport
 * (local-detached.ts admits a launch grant of at most 256 characters), and throws on any other, so no grammar is
 * bypassed silently; only a contract it returned is ever honored.
 *
 * Not wired: a well-formed workflow_execute request naming a function definition resolves and launches nothing. With
 * workbench:execute held (and workbench:detach as well for a detached request) it refuses as unsupported-definition-kind;
 * without workbench:execute it refuses as missing-execute-grant, and a detached request without workbench:detach refuses
 * as missing-detach-grant. Routing a function launcher through this boundary is a later cut.
 *
 * The host supplies the two reads, the wait and the dispatch. Each refusal reason is fixed text for its refusal policy:
 * no reason composes the definition, the invocation, the held grants or the identity.
 */
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import { EXECUTE_GRANT, type ExecuteAdmission } from "./execute.js";
import type { DefinitionRef } from "./identity.js";
import { stripUnsafeText } from "./redaction.js";

/** The producer contract that must bind the exact function action spelling before any function dispatch can pass. */
export const FUNCTION_ACTION_BLOCKER = "MW-CONTRACT";
/** One reviewed definition and the one exact action grant that authorizes dispatching it. */
export interface FunctionActionBinding {
  readonly definitionId: string;
  readonly actionGrant: string;
}
export type FunctionActionContract =
  | { readonly state: "unadopted"; readonly blockedOn: typeof FUNCTION_ACTION_BLOCKER }
  | { readonly state: "adopted"; readonly bindings: readonly Readonly<FunctionActionBinding>[] };
/** The contract in force: unadopted until MW-CONTRACT binds the exact action spelling. */
export const FUNCTION_ACTION_CONTRACT: FunctionActionContract = Object.freeze({ state: "unadopted", blockedOn: FUNCTION_ACTION_BLOCKER });

/** The effective identity behind a dispatch, as host context reports it (never as the request states it). */
export interface FunctionIdentity {
  readonly principal: string;
  readonly sessionId: string;
}
/** The two host reads the boundary makes; each is answered from host context on every call. */
export interface FunctionAuthorityHost {
  /** The operator's configured grants (workbench.capabilityGrants). */
  grants(): readonly string[] | undefined;
  /** The effective principal and session. */
  identity(): FunctionIdentity;
}
export type FunctionAuthorityRefusal =
  | "not-a-function-definition"
  | "unknown-identity-data"
  | "changed-effective-identity"
  | "unknown-permission-data"
  | "missing-execute-grant"
  | "function-action-unadopted"
  | "missing-function-action-grant";
/** What an authorized dispatch rests on: exactly workbench:execute and the one adopted action grant, under the host identity. */
export interface FunctionDispatchAuthority {
  readonly invocationId: string;
  readonly definition: Readonly<DefinitionRef>;
  readonly grants: readonly [typeof EXECUTE_GRANT, string];
  readonly identity: FunctionIdentity;
}
export interface FunctionAuthorityRefused {
  readonly decision: "refused";
  readonly policy: FunctionAuthorityRefusal;
  readonly category: CapabilityErrorCategory;
  readonly reason: string;
  readonly invocationId: string;
}
export interface FunctionAuthorityAuthorized {
  readonly decision: "authorized";
  readonly authority: FunctionDispatchAuthority;
}
export type FunctionAuthorityDecision = FunctionAuthorityRefused | FunctionAuthorityAuthorized;
export interface FunctionAuthorityInput {
  /** workflow_execute's admission of the digest-pinned definition (decideExecute). */
  readonly admission: ExecuteAdmission;
  readonly contract: FunctionActionContract;
  /** The identity read from the host when the request entered the boundary. */
  readonly entered: FunctionIdentity | undefined;
  /** What the host reports now: its grants and its effective identity. */
  readonly current: { readonly grants: unknown; readonly identity: unknown };
}
export type FunctionDispatchStage = "entry" | "dispatch";
export type FunctionDispatchResult<T> =
  | { readonly status: "refused"; readonly stage: FunctionDispatchStage; readonly refusal: FunctionAuthorityRefused }
  | { readonly status: "dispatched"; readonly authority: FunctionDispatchAuthority; readonly value: T };
export interface FunctionDispatchOptions<T> {
  readonly admission: ExecuteAdmission;
  readonly contract: FunctionActionContract;
  readonly host: FunctionAuthorityHost;
  /** The admission wait (a queue, backpressure or an operator hold). The final decision is taken only after it settles. */
  readonly park?: () => Promise<void>;
  /** The loader and provider calls. Invoked at most once, and only on an authorized FINAL decision. */
  readonly dispatch: (authority: FunctionDispatchAuthority) => Promise<T>;
}

/** The workbench.capabilityGrants grammar settings.ts enforces: explicit namespace:permission, no wildcard. */
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
/** The longest grant local-detached.ts admits on a detached launch request. */
const TRANSPORT_GRANT_CHARS = 256;
/** Pi's own authorities (workbench:execute, workbench:detach and the rest) live here; none doubles as a function action. */
const PI_NAMESPACE = "workbench:";
const TEXT_BYTES = 256;
const MAX_BINDINGS = 64;
const BINDING_KEYS: readonly string[] = ["definitionId", "actionGrant"];
/** Only a contract adoptFunctionActions returned is honored; an object merely shaped like an adopted contract is not. */
const ADOPTED = new WeakSet<object>();

function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
/** An own data property's value, read through its property descriptor, so a getter is never invoked. */
function own(record: Record<string, unknown>, key: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, key);
  return descriptor && Object.hasOwn(descriptor, "value") ? descriptor.value : undefined;
}
/** At most 256 bytes of non-blank text that the shared sanitizer leaves unchanged. */
function cleanText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= TEXT_BYTES && stripUnsafeText(value) === value;
}
/** A spelling both the grant settings and the detached transport can carry. */
function representable(grant: unknown): grant is string {
  return typeof grant === "string" && grant.length <= TRANSPORT_GRANT_CHARS && GRANT.test(grant);
}
function invalid(message: string): never {
  throw new CapabilityError("validation", message);
}

/**
 * Adopts the exact action grants a producer contract binds, one per reviewed definition. Throws on a binding list that
 * is not an array of 1 to 64 bindings, on a binding that is not a plain object holding exactly definitionId and
 * actionGrant as own data properties, on a definition id that is not clean text, on a spelling Pi cannot carry, on a Pi
 * workbench grant and on a definition or grant bound twice. The returned contract, its binding list and each binding
 * are frozen, and only a contract returned here is honored by decideFunctionAuthority.
 */
export function adoptFunctionActions(bindings: readonly FunctionActionBinding[]): FunctionActionContract {
  if (!Array.isArray(bindings) || bindings.length === 0 || bindings.length > MAX_BINDINGS) invalid(`A function action contract binds 1 to ${MAX_BINDINGS} definitions.`);
  const adopted: Readonly<FunctionActionBinding>[] = [];
  for (const [index, binding] of Array.from(bindings as readonly unknown[]).entries()) {
    if (!plainObject(binding) || Reflect.ownKeys(binding).some(key => typeof key !== "string" || !BINDING_KEYS.includes(key))) {
      invalid(`Binding ${index} must hold exactly definitionId and actionGrant.`);
    }
    const definitionId = own(binding, "definitionId");
    const actionGrant = own(binding, "actionGrant");
    if (!cleanText(definitionId)) invalid(`Binding ${index} needs a clean definition id.`);
    if (!representable(actionGrant)) {
      invalid(`Binding ${index}: the action grant is not representable through workbench.capabilityGrants (namespace:permission, no wildcard) and the detached transport (at most ${TRANSPORT_GRANT_CHARS} characters).`);
    }
    if (actionGrant.startsWith(PI_NAMESPACE)) invalid(`Binding ${index}: a workbench grant is Pi's own authority and never doubles as a function action grant.`);
    if (adopted.some(prior => prior.definitionId === definitionId || prior.actionGrant === actionGrant)) invalid(`Binding ${index}: each definition and each action grant is bound once.`);
    adopted.push(Object.freeze({ definitionId, actionGrant }));
  }
  const contract: FunctionActionContract = Object.freeze({ state: "adopted", bindings: Object.freeze(adopted) });
  ADOPTED.add(contract);
  return contract;
}

function refuse(policy: FunctionAuthorityRefusal, category: CapabilityErrorCategory, reason: string, invocationId: string): FunctionAuthorityRefused {
  return Object.freeze({ decision: "refused", policy, category, reason, invocationId });
}
/** A frozen copy of a well-formed identity, or undefined for unknown identity data (treated as deny). */
function identityOf(value: unknown): FunctionIdentity | undefined {
  if (!plainObject(value)) return undefined;
  const principal = own(value, "principal");
  const sessionId = own(value, "sessionId");
  return cleanText(principal) && cleanText(sessionId) ? Object.freeze({ principal, sessionId }) : undefined;
}
/**
 * The grants as read, or undefined for unknown permission data: a read that is not an array, or an entry outside the
 * capabilityGrants grammar (docs/workbench/12-security.md: "Treat unknown permission data as deny.").
 */
function grantList(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string" && GRANT.test(grant)) ? grants : undefined;
}
/** The exact action grant an adopted contract binds to the definition, or undefined when none is adopted for it. */
function boundAction(contract: FunctionActionContract, definitionId: string): string | undefined {
  if (!ADOPTED.has(contract) || contract.state !== "adopted") return undefined;
  return contract.bindings.find(binding => binding.definitionId === definitionId)?.actionGrant;
}

/**
 * Synchronous: it returns the decision itself and mutates nothing it is given. Rules apply in order and the first match
 * wins: a function definition, a known and unchanged effective identity, known permission data, workbench:execute, an
 * adopted action for this definition, then that exact action grant.
 */
export function decideFunctionAuthority(input: FunctionAuthorityInput): FunctionAuthorityDecision {
  const { invocationId, definition } = input.admission;
  if (definition.kind !== "function") return refuse("not-a-function-definition", "validation", "only a function definition passes the function authority boundary", invocationId);
  const entered = identityOf(input.entered);
  const current = identityOf(input.current.identity);
  if (entered === undefined || current === undefined) return refuse("unknown-identity-data", "authorization", "unknown effective identity data", invocationId);
  if (current.principal !== entered.principal || current.sessionId !== entered.sessionId) {
    return refuse("changed-effective-identity", "authorization", "the effective principal or session changed after admission", invocationId);
  }
  const grants = grantList(input.current.grants);
  if (grants === undefined) return refuse("unknown-permission-data", "authorization", "unknown permission data", invocationId);
  if (!grants.includes(EXECUTE_GRANT)) return refuse("missing-execute-grant", "authorization", `missing exact grant ${EXECUTE_GRANT}`, invocationId);
  const actionGrant = boundAction(input.contract, definition.id);
  if (actionGrant === undefined) {
    return refuse("function-action-unadopted", "unavailable", `no exact function action grant is adopted for this definition (${FUNCTION_ACTION_BLOCKER})`, invocationId);
  }
  if (!grants.includes(actionGrant)) return refuse("missing-function-action-grant", "authorization", "missing the exact function action grant the adopted contract binds to this definition", invocationId);
  const authorized: readonly [typeof EXECUTE_GRANT, string] = Object.freeze([EXECUTE_GRANT, actionGrant] as const);
  return Object.freeze({ decision: "authorized", authority: Object.freeze({ invocationId, definition, grants: authorized, identity: current }) });
}

/**
 * The final dispatch boundary. Decides at entry (a refusal there never waits), awaits the admission wait, then decides
 * again from fresh host reads and dispatches at most once on that final decision. The entry identity is copied when
 * read, so a host that later mutates the object it returned cannot move the snapshot.
 */
export async function dispatchFunctionWithAuthority<T>(options: FunctionDispatchOptions<T>): Promise<FunctionDispatchResult<T>> {
  const { admission, contract, host, park, dispatch } = options;
  const entered = identityOf(host.identity());
  const entry = decideFunctionAuthority({ admission, contract, entered, current: { grants: host.grants(), identity: entered } });
  if (entry.decision === "refused") return Object.freeze({ status: "refused", stage: "entry", refusal: entry });
  if (park !== undefined) await park();
  // The FINAL boundary: both reads are fresh, and nothing is awaited between this decision and the dispatch.
  const final = decideFunctionAuthority({ admission, contract, entered, current: { grants: host.grants(), identity: host.identity() } });
  if (final.decision === "refused") return Object.freeze({ status: "refused", stage: "dispatch", refusal: final });
  const value = await dispatch(final.authority);
  return Object.freeze({ status: "dispatched", authority: final.authority, value });
}
