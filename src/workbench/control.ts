/**
 * Pure decision core of workflow_control (docs/workbench/11 § "First public Pi tools"). It decides whether one
 * explicit native action may be requested and mints the immutable `requested` receipt. It never calls a provider,
 * never mutates the projection and never fabricates an acknowledgement or a result: a host executes a permitted
 * receipt natively and records the producer's answers through acknowledge() and settle(). A permit is provenance-bearing
 * in-process only: isCoreMintedDecision() answers by object identity, so an adapter executes exactly the decision
 * decideControl returned here, never a copy, a replay or a look-alike of it.
 */
import { createHash } from "node:crypto";
import { CapabilityError, type CapabilityErrorCategory, type JsonValue } from "./capability-registry.js";
import type { NativeRef, ObservationProjection, ObservationScope, Relation } from "./observation.js";
import { stripUnsafeText } from "./redaction.js";

export const CONTROL_CONTRACT_VERSION = "workbench.control/v1";
export const CONTROL_PERMIT_POLICY = "exact-grant+confirmed-owner+operator-confirmed";
/** The fixed text a control adapter refuses a decision the core did not mint with. It names no field of what it refuses. */
export const CONTROL_UNMINTED_REASON = "decision was not minted by the decision core";

/** The only native verbs Workbench may request, per producer. No universal control method exists (docs/workbench/06). */
export const NATIVE_CONTROL_ACTIONS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  furnace: Object.freeze(["stop"]),
  "claude-agent-sdk": Object.freeze(["interrupt"]),
  forge: Object.freeze(["cancel"]),
  // The Workbench-owned detached host: the reason-carrying DetachedCommand verbs (hosts/local-detached.ts:103-105),
  // executed by detached-control.ts.
  "local-detached": Object.freeze(["cancel", "shutdown"]),
});
/** Verbs that need explicit operator confirmation (docs/workbench/12 § "Authorization design"). */
export const DESTRUCTIVE_CONTROL_ACTIONS: readonly string[] = Object.freeze(["stop", "cancel", "interrupt", "kill", "delete", "shutdown"]);

/** Request shape of WorkbenchHost.requestControl (docs/workbench/13 § "Host boundary"); scope and principal are host-bound. */
export interface NativeControlRequest {
  scope: ObservationScope;
  principal: { id: string; role?: string };
  grants: readonly string[] | undefined;
  target: NativeRef;
  action: string;
  params?: JsonValue;
  invocationId: string;
  requestedAt: string;
}

export type ControlOutcome = "completed" | "failed" | "cancelled" | "unknown";
export type ControlDenyPolicy = "unknown-permission-data" | "observer-only" | "malformed-request" | "unknown-action" | "missing-exact-grant"
  | "cross-scope" | "no-confirmed-ownership" | "operator-confirmation";

/** Audit fields every phase carries (docs/workbench/12 § "Auditability"). */
interface ControlReceiptCore {
  readonly contractVersion: typeof CONTROL_CONTRACT_VERSION;
  readonly requestId: string;
  readonly scope: Readonly<ObservationScope>;
  readonly principal: Readonly<{ id: string; role?: string }>;
  readonly grant: string;
  readonly policy: typeof CONTROL_PERMIT_POLICY;
  readonly target: Readonly<NativeRef>;
  readonly action: string;
  readonly invocationId: string;
  readonly ownershipConfirmationRef: string;
  readonly requestedAt: string;
  readonly decidedAt: string;
}
export interface RequestedControlReceipt extends ControlReceiptCore { readonly phase: "requested" }
export interface AcknowledgedControlReceipt extends ControlReceiptCore {
  readonly phase: "acknowledged";
  readonly acknowledgedAt: string;
  readonly nativeAckRef: string;
}
export interface ResultControlReceipt extends ControlReceiptCore {
  readonly phase: "result";
  readonly acknowledgedAt: string;
  readonly nativeAckRef: string;
  readonly outcome: ControlOutcome;
  readonly nativeResultRef: string;
  readonly settledAt: string;
}
/** A request is not an accepted action, and an accepted action is not its outcome (docs/workbench/08 § "State/event semantics"). */
export type NativeControlReceipt = RequestedControlReceipt | AcknowledgedControlReceipt | ResultControlReceipt;
export type ControlDecision =
  | { readonly decision: "denied"; readonly category: CapabilityErrorCategory; readonly reason: string; readonly policy: ControlDenyPolicy }
  | { readonly decision: "permitted"; readonly receipt: RequestedControlReceipt };

/** The workbench.capabilityGrants grammar settings.ts enforces: explicit namespace:permission, no wildcard. */
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
const OUTCOMES: readonly ControlOutcome[] = Object.freeze(["completed", "failed", "cancelled", "unknown"]);
const NATIVE_REF_BYTES = 4096;
/**
 * In-process provenance (docs/workbench/12 § "Authorization design"): every permit decideControl mints, held weakly so a
 * dropped decision stays collectable. Membership is object identity, never shape, and nothing is written onto the decision,
 * so a copy, a JSON round-trip (a decision replayed from the audit or the journal) or a hand-built look-alike is never in it.
 */
const MINTED = new WeakSet<ControlDecision>();

/** Bounded, non-blank text the shared sanitizer leaves unchanged, so no control, escape or bidi character reaches a receipt. */
function cleanText(value: unknown, maxBytes = 256): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= maxBytes && stripUnsafeText(value) === value;
}
/** A timezone-qualified instant. Host and producer clocks differ, so phases are ordered by transition, never by timestamp (docs/workbench/13). */
function instant(value: unknown): value is string {
  return typeof value === "string" && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
}
function plainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function deny(policy: ControlDenyPolicy, category: CapabilityErrorCategory, reason: string): ControlDecision {
  return Object.freeze({ decision: "denied", category, reason, policy });
}
/** A snapshot of the grants, or undefined when any entry is unknown permission data (docs/workbench/12: treat it as deny). */
function grantList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string" && GRANT.test(grant)) ? grants : undefined;
}
function wellFormed({ scope, principal, target, invocationId, requestedAt }: NativeControlRequest): boolean {
  return plainObject(scope) && cleanText(scope.workspace) && cleanText(scope.principal) &&
    plainObject(principal) && cleanText(principal.id) && (principal.role === undefined || cleanText(principal.role)) &&
    plainObject(target) && cleanText(target.provider) && cleanText(target.type) && cleanText(target.id) && (target.scope === undefined || cleanText(target.scope)) &&
    cleanText(invocationId) && instant(requestedAt);
}
/**
 * The native confirmation of an ownership statement FROM the target, stated by the target's own producer. The
 * provenance is re-checked rather than trusting the relation kind. Causation, grouping, dependency and hypothesis
 * never qualify, and the owned child holds no owner rights: stopping the owner is what propagates cancellation
 * (docs/workbench/02 WB-010; docs/workbench/08 § "Cancellation and ownership").
 */
function confirmedOwnership(relations: readonly Relation[], owner: string, provider: string): string | undefined {
  return relations.find(({ kind, from, provenance }) => kind === "ownership" && from === owner && provenance.source === provider &&
    cleanText(provenance.nativeConfirmationRef, NATIVE_REF_BYTES))?.provenance.nativeConfirmationRef;
}
/**
 * Stable across retries of one logical invocation; a distinct intentional request carries a new invocationId
 * (docs/workbench/08). Only permitted requests get one, and those have principal.id === scope.principal.
 */
function requestIdOf({ scope, target, action, invocationId }: NativeControlRequest): string {
  const identity = [CONTROL_CONTRACT_VERSION, scope.workspace, scope.principal, target.provider, target.type, target.scope ?? null, target.id, action, invocationId];
  return `ctl_${createHash("sha256").update(JSON.stringify(identity)).digest("hex").slice(0, 32)}`;
}
/** Fresh frozen copies of the audit fields, so no phase shares a mutable object with its input. */
function core(receipt: Omit<ControlReceiptCore, "contractVersion" | "policy">): ControlReceiptCore {
  const { scope, principal, target } = receipt;
  return {
    contractVersion: CONTROL_CONTRACT_VERSION,
    requestId: receipt.requestId,
    scope: Object.freeze({ workspace: scope.workspace, principal: scope.principal }),
    principal: Object.freeze({ id: principal.id, ...(principal.role !== undefined ? { role: principal.role } : {}) }),
    grant: receipt.grant,
    policy: CONTROL_PERMIT_POLICY,
    target: Object.freeze({ provider: target.provider, type: target.type, id: target.id, ...(target.scope !== undefined ? { scope: target.scope } : {}) }),
    action: receipt.action,
    invocationId: receipt.invocationId,
    ownershipConfirmationRef: receipt.ownershipConfirmationRef,
    requestedAt: receipt.requestedAt,
    decidedAt: receipt.decidedAt,
  };
}

/**
 * Synchronous and side-effect free: it only reads the projection (query, relations), reads the host clock only to stamp
 * a permit, and records each permit it mints in the module-private provenance set (identity only, never on the object).
 * Rules apply in order and the first match wins. Authorization rules that need no projection read run first, so an
 * observer learns nothing about targets. Reasons never echo caller text.
 */
export function decideControl(request: NativeControlRequest, deps: { projection: ObservationProjection; now: () => string }): ControlDecision {
  const grants = grantList(request.grants);
  if (!grants) return deny("unknown-permission-data", "authorization", "unknown permission data");
  // discover:/inspect:/observe: (or any non-control) grants never control, whatever the action spelling.
  if (!grants.some(grant => grant.startsWith("control:"))) return deny("observer-only", "authorization", "observer-only");
  if (!wellFormed(request)) return deny("malformed-request", "validation", "malformed control request");
  const { scope, principal, target, action } = request;
  // Own-property lookup, so __proto__, constructor and other unlisted names resolve no action.
  if (!Object.hasOwn(NATIVE_CONTROL_ACTIONS, target.provider) || !NATIVE_CONTROL_ACTIONS[target.provider].includes(action)) {
    return deny("unknown-action", "validation", "unknown action");
  }
  // Both parts are allowlisted constants at this point, so the required grant is safe to name.
  const grant = `control:${target.provider}.${action}`;
  if (!grants.includes(grant)) return deny("missing-exact-grant", "authorization", `missing exact grant ${grant}`);
  // The requester is the principal the host bound to the scope, and the target is observed in that scope.
  // An unobserved and a foreign target deny alike: the decision is no cross-scope existence oracle.
  const bound = { workspace: scope.workspace, principal: scope.principal };
  const node = principal.id === scope.principal ? deps.projection.query({ scope: bound, ref: { ...target }, limit: 1 }).nodes[0] : undefined;
  if (!node || node.scope.workspace !== scope.workspace || node.scope.principal !== scope.principal || node.nativeRef.provider !== target.provider ||
    node.nativeRef.type !== target.type || node.nativeRef.id !== target.id || node.nativeRef.scope !== target.scope) {
    return deny("cross-scope", "authorization", "cross-scope");
  }
  const ownershipConfirmationRef = confirmedOwnership(deps.projection.relations({ scope: bound, from: node.key }), node.key, target.provider);
  if (ownershipConfirmationRef === undefined) return deny("no-confirmed-ownership", "authorization", "no confirmed lifecycle ownership");
  // An own data property only: an inherited value never confirms and a getter is never invoked.
  const confirmed = plainObject(request.params) && Object.getOwnPropertyDescriptor(request.params, "confirmed")?.value === true;
  if (DESTRUCTIVE_CONTROL_ACTIONS.includes(action) && !confirmed) return deny("operator-confirmation", "validation", "operator confirmation required");
  const decidedAt = deps.now();
  if (!instant(decidedAt)) throw new CapabilityError("validation", "Control decisions require a timezone-qualified host clock.");
  const receipt: RequestedControlReceipt = Object.freeze({
    ...core({ requestId: requestIdOf(request), scope, principal, grant, target, action, invocationId: request.invocationId, ownershipConfirmationRef,
      requestedAt: request.requestedAt, decidedAt }),
    phase: "requested",
  });
  const permit: ControlDecision = Object.freeze({ decision: "permitted", receipt });
  MINTED.add(permit);
  return permit;
}

/**
 * Whether this exact object is a permitted decision decideControl minted in this process. An identity check that reads
 * nothing from its argument (no property, accessor or proxy trap is touched) and answers false for every copy, replay or
 * look-alike however exact its shape, and for every denial: only permits are minted. A control adapter asks this before
 * anything else and refuses a false answer with CONTROL_UNMINTED_REASON, keeping its structural vetting behind it.
 */
export function isCoreMintedDecision(decision: unknown): boolean {
  return typeof decision === "object" && decision !== null && MINTED.has(decision as ControlDecision);
}

/** Records the producer's acceptance of a requested action. Acknowledgement is not completion. */
export function acknowledge(receipt: NativeControlReceipt, ack: { acknowledgedAt: string; nativeAckRef: string }): AcknowledgedControlReceipt {
  if (receipt.contractVersion !== CONTROL_CONTRACT_VERSION || receipt.phase !== "requested") {
    throw new CapabilityError("validation", "Only a requested control receipt can be acknowledged.");
  }
  if (!cleanText(ack.nativeAckRef, NATIVE_REF_BYTES)) throw new CapabilityError("validation", "Control acknowledgement requires a native acknowledgement reference.");
  if (!instant(ack.acknowledgedAt)) throw new CapabilityError("validation", "Control acknowledgement requires a timezone-qualified acknowledgedAt.");
  return Object.freeze({ ...core(receipt), phase: "acknowledged", acknowledgedAt: ack.acknowledgedAt, nativeAckRef: ack.nativeAckRef });
}

/** Records the producer's outcome of an acknowledged action; a result never exists without its native reference. */
export function settle(receipt: NativeControlReceipt, result: { outcome: ControlOutcome; nativeResultRef: string; settledAt: string }): ResultControlReceipt {
  if (receipt.contractVersion !== CONTROL_CONTRACT_VERSION || receipt.phase !== "acknowledged" || !cleanText(receipt.nativeAckRef, NATIVE_REF_BYTES)) {
    throw new CapabilityError("validation", "Only an acknowledged control receipt can be settled.");
  }
  if (!OUTCOMES.includes(result.outcome)) throw new CapabilityError("validation", "Unknown control outcome.");
  if (!cleanText(result.nativeResultRef, NATIVE_REF_BYTES)) throw new CapabilityError("validation", "Control result requires a native result reference.");
  if (!instant(result.settledAt)) throw new CapabilityError("validation", "Control result requires a timezone-qualified settledAt.");
  return Object.freeze({
    ...core(receipt), phase: "result", acknowledgedAt: receipt.acknowledgedAt, nativeAckRef: receipt.nativeAckRef,
    outcome: result.outcome, nativeResultRef: result.nativeResultRef, settledAt: result.settledAt,
  });
}
