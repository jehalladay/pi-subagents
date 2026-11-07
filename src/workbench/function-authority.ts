/**
 * function-authority.ts — the authority seam at the FINAL dispatch boundary of a function launch (wb-201v, MWI
 * B-authority, slice PI-1: EAT-R028..EAT-R031 of the mechanical-workflows-interop-2026-11-04 triage,
 * requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e; and EAT-R154 of the
 * mechanical-interoperability-audit-2026-11-06 triage, requirements/ATOMIC-REQUIREMENTS-DELTA.md, Nov-6 pins pi d7666a76
 * and mw 97e18068).
 *
 * Once decideExecute (execute.ts) admits a function request, its launch may wait (an admission queue, backpressure, an
 * operator hold) before its loader imports the pinned export and its provider runs.
 * dispatchFunctionWithAuthority is the boundary such a launch passes through: it decides the function's authority when
 * the request enters and again, from FRESH host reads, once the optional wait settles. Pinned final-boundary timing: a
 * host change queued as a microtask right after the wait settles, or queued by the final read itself with or without a
 * wait, lands after the one dispatch the final decision permits is invoked. Other scheduling forms are NOT CLAIMED. No
 * decision taken at entry is carried across the wait.
 *
 * Host authority, at the suite's listed forms only. In each host mode, the request for mechanical.development.develop.v1
 * under the pinned contract, carrying any of the suite's 7776 listed caller policies (each record holding each of grants,
 * permissions, authority, reviewed, actionGrant, principal, sessionId and identity absent or with one of its listed
 * values), ends each of the 12 listed boundary scenarios as listed (the same refusal stage, policy, category and
 * invocation, or one dispatch whose callback receives, and whose boundary returns, the listed authority read whole on the
 * same invocation and definition, resting on workbench:execute and the action under the same principal and session,
 * with the same value and the same park, loader and provider calls) and is decided at each of the 10 listed decision
 * readings as listed (the same refusal policy, category and invocation, or the listed authorization read whole), as it is
 * without a policy; so does that request without a policy carrying any of the 7776 listed inputs (those records added to
 * the plain task fields) at the 12 boundary scenarios. Read whole: each own key in order with its value, nested objects
 * and arrays included, each object's frozenness and any prototype other than the plain object's or the array's. At the
 * 13824 listed descriptor forms (three definitions, three contracts, two schema versions, two digests, three policies,
 * two inputs and the 32 subsets of five grants without workbench:execute, in each host mode, under the steady host
 * identity), a request refuses at entry as missing-execute-grant, with zero park, loader and provider calls. Other
 * request shapes, host scenarios, readings, descriptor forms and refusal reason texts are NOT CLAIMED, and so are the
 * boundary result's and the refusal's own keys beyond the fields named above.
 *   EAT-R028  pinned rows: the otherwise authorized request without workbench:execute refuses at entry, before any wait,
 *             as missing-execute-grant, with zero loader and provider calls, and so does that request holding each pinned
 *             stand-in in its place (workbench:detach, workbench:design, the shorter spelling workbench:exec,
 *             fixture-fn:execute, org.workbench:execute, workbench:execute extended by -all, .sub or 2). At decision, each
 *             spelling the suite's 10 extension forms make of it within 256 characters, held in its place, refuses as
 *             missing-execute-grant, and each one-character insertion, deletion or substitution of it over the grammar's
 *             38 characters refuses as missing-execute-grant or as unknown-permission-data. Other spellings and holdings
 *             are NOT CLAIMED.
 *   EAT-R029  at the pinned rows, the exact action grant the adopted contract binds to the definition, held with
 *             workbench:execute, passes, and each pinned stand-in held in its place refuses as
 *             missing-function-action-grant: the other bound function's grant, the sibling action fixture-fn:develop-read,
 *             the namespace sibling fixture-fn:write, the shorter spelling fixture-fn:develop, the adopted permission under
 *             the namespace other-fn, org.fixture-fn:develop-write, the exact action extended by -all, -admin, .sub, 2 or
 *             22, by 1 to 232 repeated letters a at either end, and by each of the suite's 10 extension forms (six at the
 *             tail and four at the head of its namespace and of its permission) at every length within 256 characters.
 *             Each one-character insertion, deletion or substitution of it over the grammar's 38 characters refuses, as
 *             missing-function-action-grant when adoption admits the spelling and as unknown-permission-data when it does
 *             not. Other spellings and holdings are NOT CLAIMED.
 *   EAT-R030  the effective principal and session at dispatch must each equal the one read at entry, field by field.
 *   EAT-R031  the grants are read again at dispatch, so a grant revoked during the wait refuses.
 *   EAT-R154  pinned at the suite's EAT-R154 rows only: its listed Beads-note fixture pairs (a plain note or one carrying
 *             the listed seat tokens, in the caller policy, the caller input or the host's identity read) leave the
 *             boundary's result, the authority its dispatch callback receives and the decision unchanged, read whole, and
 *             its static census finds none of its four listed reader forms in this module, execute.ts or the hosts. Other
 *             fixtures, reader forms and files, and any replay basis, are NOT CLAIMED.
 *
 * PARTIAL by plan (BEAD-PLAN.md, B-authority: "enforcement seams land now; exact action grammar blocked on
 * MW-CONTRACT"). No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch
 * refuses, and one that passes the earlier rules refuses as function-action-unadopted. The suite pins adoption against
 * workbench.capabilityGrants and the detached transport at its enumerated refusal rows, accepted rows, 256/257-character
 * boundary, head/tail character sweep, adjacent-dot, adjacent-hyphen and 100-character-namespace samples, and interior
 * sweep (each grammar character doubled inside a part; parts of 1 to 244 characters). Other spellings are NOT CLAIMED.
 * Only a contract adoptFunctionActions returned is ever honored.
 *
 * Not wired: each pinned workflow_execute request naming a function definition resolves and launches nothing. A host
 * grant read that is not known permission data (no read, a non-array read, or a list holding a spelling outside the
 * grammar, in the six pinned shapes) refuses as unknown-permission-data, held execute or not. In the eight pinned
 * known-permission rows, a request without workbench:execute refuses as missing-execute-grant, a detached request with it
 * but without workbench:detach refuses as missing-detach-grant, and the rest refuse as unsupported-definition-kind. Other
 * host reads are NOT CLAIMED. Routing a function launcher through this boundary is a later cut.
 *
 * The host supplies the two reads, the wait and the dispatch. Pinned fixed reasons: for each pinned pair of requests (the
 * seven pairs that differ in definition, invocation, identity and held grants, and the five pairs that differ only in
 * definition kind, the changed identity field, the shape of unknown permission data, the held-grant count or the schema
 * version), both requests carry one reason, and the first seven name none of their definition, action, invocation or
 * identity texts. Other pairs are NOT CLAIMED.
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

/** The seam's namespace:permission grammar for an action grant, judged against settings.ts at the suite's enumerated samples. */
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
/**
 * The workbench.capabilityGrants grammar a host grant read is judged by, as settings.ts spells it since landing 1019
 * (wb-wupg): a namespace:permission grant, or an exact Claude tool right claude:tool:<name>. A Claude tool right is
 * known permission data here and is never an action grant (adoption keeps GRANT). Pinned at the lists of
 * test/workbench-claude-tool-grants.test.ts and the suite's two landing-1019 contact rows only.
 */
const HOST_GRANT = /^(?:[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*|claude:tool:[A-Za-z][A-Za-z0-9_-]{0,63})$/;
/** The seam's action-grant length bound, judged against local-detached.ts's launch-grant check at 256 and 257 characters. */
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
/**
 * The clean-text check, for a definition id, a principal and a session. Pinned readings: each Unicode code point, U+0000
 * to U+10FFFF, as the whole text of each of the three, is clean exactly when String.prototype.trim leaves it non-empty
 * and stripUnsafeText leaves it unchanged; inserted alone into the definition id fixture.<u>.v1, the principal
 * local-operator:1000:<u> and the session s<u>1, exactly when stripUnsafeText leaves the text unchanged; 1 to 512 ASCII
 * letters a and 1 to 256 characters U+00E9 are clean in each of the three exactly when they hold at most 256 bytes; the
 * suite's 52 texts made only of the 17 blanks stripUnsafeText keeps are refused in each of the three; and the listed
 * escape, control, bidi-override, default-ignorable, blank and byte-bound rows. Other texts are NOT CLAIMED.
 */
function cleanText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= TEXT_BYTES && stripUnsafeText(value) === value;
}
/** The seam's grammar and length test for an action grant. */
function representable(grant: unknown): grant is string {
  return typeof grant === "string" && grant.length <= TRANSPORT_GRANT_CHARS && GRANT.test(grant);
}
function invalid(message: string): never {
  throw new CapabilityError("validation", message);
}

/**
 * Adopts the exact action grants a producer contract binds, one per reviewed definition. Throws on a binding list that
 * is not an array of 1 to 64 bindings, on a binding that is not a plain object holding exactly definitionId and
 * actionGrant as own data properties, on a definition id the clean-text check refuses at its pinned readings, on a spelling outside the seam's grammar
 * or longer than 256 characters, on a Pi workbench grant and on a definition or grant bound twice. The returned contract,
 * its binding list and each binding
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
  return grants.every((grant): grant is string => typeof grant === "string" && HOST_GRANT.test(grant)) ? grants : undefined;
}
/** The exact action grant an adopted contract binds to the definition, or undefined when none is adopted for it. */
function boundAction(contract: FunctionActionContract, definitionId: string): string | undefined {
  if (!ADOPTED.has(contract) || contract.state !== "adopted") return undefined;
  return contract.bindings.find(binding => binding.definitionId === definitionId)?.actionGrant;
}

/**
 * Synchronous: it returns the decision itself and mutates nothing it is given. Its rules, in order: a function definition,
 * a known and unchanged effective identity, known permission data, workbench:execute, an adopted action for this
 * definition, then that exact action grant. Pinned order: each single fault, each of the 20 standard pairs, and the five
 * further rows (a script admission with no grant read, with a non-array grant read, or with an unknown entry identity; a
 * forged contract or an unbound definition without workbench:execute) report the earliest failing rule. Other fault forms
 * are NOT CLAIMED.
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
  // The FINAL boundary: both reads are fresh.
  const final = decideFunctionAuthority({ admission, contract, entered, current: { grants: host.grants(), identity: host.identity() } });
  if (final.decision === "refused") return Object.freeze({ status: "refused", stage: "dispatch", refusal: final });
  const value = await dispatch(final.authority);
  return Object.freeze({ status: "dispatched", authority: final.authority, value });
}
