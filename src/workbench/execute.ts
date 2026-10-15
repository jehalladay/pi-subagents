/**
 * Pure admission decision and launch-level reply of workflow_execute (docs/workbench/11 § "First public Pi tools"):
 * "authorized launch; returns logical invocation and native references, not false completion". decideExecute admits
 * or refuses one launch request against an immutable digest and one exact execute-authority grant. The reply builder
 * renders an INJECTED launch outcome. The module never launches, never invokes a registry or SDK and never reads a
 * clock: a host launches natively and reports what the producer said, and a launch outcome can only ever say
 * accepted, launched or refused. Completion belongs to the producer's own later answer, never to this reply.
 */
import { CapabilityError, type CapabilityErrorCategory, type JsonValue } from "./capability-registry.js";
import { canonicalJson, type DefinitionRef, identityDigest } from "./identity.js";
import type { NativeRef } from "./observation.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchText, stripUnsafeText } from "./redaction.js";

export const EXECUTE_CONTRACT_VERSION = "workbench.execute/v1";
/** The one execute authority. It is its own grant: discover:/inspect:/observe:/control: and workbench:design/observe never admit a launch. */
export const EXECUTE_GRANT = "workbench:execute";
export const EXECUTE_ADMISSION_POLICY = "digest-pinned+exact-execute-grant";
/** docs/workbench/17 § "Install profile": the embedded Pi extension host and the detached headless executor. Nothing else is guessed. */
export const EXECUTE_HOST_MODES: readonly ExecuteHostMode[] = Object.freeze(["embedded", "detached"] as const);
export type ExecuteHostMode = "embedded" | "detached";

/** Tool parameters of workflow_execute(definitionRef,input,hostMode,policy?). hostMode is a plain string on the wire; the allowlist is checked at runtime. */
export interface WorkflowExecuteRequest {
  definitionRef: DefinitionRef;
  input: JsonValue;
  hostMode: string;
  policy?: JsonValue;
}
/** Host-bound facts the caller cannot supply: the grants held by the principal and the logical invocation reference the host minted for this call. */
export interface ExecuteHostContext {
  grants: readonly string[] | undefined;
  invocationId: string;
}

export type ExecuteRefusalPolicy = "malformed-request" | "non-digest-definition" | "unknown-host-mode" | "malformed-policy" | "unknown-permission-data" | "missing-execute-grant";

/** What was admitted. The input itself is never retained, only its digest; the policy is the caller's, copied and frozen. */
export interface ExecuteAdmission {
  readonly contractVersion: typeof EXECUTE_CONTRACT_VERSION;
  readonly invocationId: string;
  readonly definition: Readonly<DefinitionRef>;
  readonly inputDigest: string;
  readonly hostMode: ExecuteHostMode;
  readonly policy?: JsonValue;
  readonly grant: typeof EXECUTE_GRANT;
  readonly admissionPolicy: typeof EXECUTE_ADMISSION_POLICY;
}
export type ExecuteDecision =
  | { readonly decision: "refused"; readonly category: CapabilityErrorCategory; readonly reason: string; readonly policy: ExecuteRefusalPolicy; readonly invocationId?: string }
  | { readonly decision: "admitted"; readonly admission: ExecuteAdmission };

/** Launch-level statuses only. There is deliberately no completed, succeeded or failed: a launch outcome cannot assert one. */
export type LaunchStatus = "accepted" | "launched" | "refused";
/** What the host reports after attempting the launch. Only these members are ever read. */
export interface LaunchOutcome {
  status: LaunchStatus;
  nativeRefs?: readonly NativeRef[];
  reason?: string;
}
export interface WorkflowExecuteReply {
  readonly contractVersion: typeof EXECUTE_CONTRACT_VERSION;
  readonly status: LaunchStatus;
  /** Always "not-asserted": completion is the producer's later answer, not part of this reply. */
  readonly completion: "not-asserted";
  readonly invocationId?: string;
  readonly definition?: Readonly<DefinitionRef>;
  readonly hostMode?: ExecuteHostMode;
  readonly nativeRefs: readonly Readonly<NativeRef>[];
  readonly policy?: JsonValue;
  readonly reason?: string;
  readonly refusal?: { readonly category: CapabilityErrorCategory; readonly policy: ExecuteRefusalPolicy; readonly reason: string };
  readonly truncated: boolean;
  readonly truncation?: string;
}

const REQUEST_KEYS: readonly string[] = ["definitionRef", "input", "hostMode", "policy"];
const DEFINITION_KEYS: readonly string[] = ["kind", "id", "schemaVersion", "artifactDigest"];
const DEFINITION_KINDS: readonly string[] = ["script", "function", "furnace-formula"];
const DIGEST = /^sha256:[0-9a-f]{64}$/;
/** The workbench.capabilityGrants grammar settings.ts enforces: explicit namespace:permission, no wildcard. */
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
const LAUNCH_STATUSES: readonly string[] = ["accepted", "launched", "refused"];
const INPUT_BYTES = 64 * 1024;
const POLICY_BYTES = 4096;
const TEXT_BYTES = 256;
const REASON_CHARS = 512;
const MAX_NATIVE_REFS = 256;
const DEFAULT_REPLY_BYTES = 8192;
const MIN_REPLY_BYTES = 2048;
const MARKER = "[truncated]";

const MALFORMED_REQUEST = "malformed execute request";

function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
/** An own data property's value; an inherited value is never read and a getter is never invoked. */
function own(record: Record<string, unknown>, key: string): { present: boolean; value?: unknown } {
  const descriptor = Object.getOwnPropertyDescriptor(record, key);
  return descriptor && Object.hasOwn(descriptor, "value") ? { present: true, value: descriptor.value } : { present: false };
}
/** Bounded, non-blank text the shared sanitizer leaves unchanged, so no control, escape or bidi character is admitted. */
function cleanText(value: unknown, maxBytes = TEXT_BYTES): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= maxBytes && stripUnsafeText(value) === value;
}
function refuse(policy: ExecuteRefusalPolicy, category: CapabilityErrorCategory, reason: string, invocationId?: string): ExecuteDecision {
  return Object.freeze({ decision: "refused", category, reason, policy, ...(invocationId !== undefined ? { invocationId } : {}) });
}
/** Canonical JSON text within a byte bound, or undefined when the value is not lossless plain JSON or is too large. */
function boundedJson(value: unknown, maxBytes: number): string | undefined {
  try {
    const text = canonicalJson(value);
    return Buffer.byteLength(text) <= maxBytes ? text : undefined;
  } catch {
    return undefined;
  }
}
function deepFreeze<T extends JsonValue>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
/** A snapshot of the grants, or undefined when any entry is unknown permission data (docs/workbench/12: treat it as deny). */
function grantList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string" && GRANT.test(grant)) ? grants : undefined;
}

/**
 * Synchronous and side-effect free. Rules apply in order and the first match wins: request shape, host invocation
 * reference, digest-pinned definition, hostMode allowlist, policy, input, then authority. The definition is checked
 * before any grant is consulted, so an unpinned reference is never authorized. Reasons never echo caller text.
 */
export function decideExecute(request: WorkflowExecuteRequest, host: ExecuteHostContext): ExecuteDecision {
  const invocationId = plainObject(host) && cleanText(host.invocationId) ? host.invocationId : undefined;
  const malformed = (): ExecuteDecision => refuse("malformed-request", "validation", MALFORMED_REQUEST, invocationId);
  if (!plainObject(request) || invocationId === undefined) return malformed();
  if (Reflect.ownKeys(request).some(key => typeof key !== "string" || !REQUEST_KEYS.includes(key))) return malformed();
  const definitionRef = own(request, "definitionRef");
  const input = own(request, "input");
  const hostMode = own(request, "hostMode");
  const policy = own(request, "policy");
  if (!definitionRef.present || !input.present || !hostMode.present || (Object.hasOwn(request, "policy") && !policy.present)) return malformed();
  // Immutable digest: "execution against immutable digest" (docs/workbench/11). A name, path or version label is not a pinned reference.
  const ref = definitionRef.value;
  if (!plainObject(ref)) return refuse("non-digest-definition", "validation", "definitionRef must be digest-pinned", invocationId);
  if (Reflect.ownKeys(ref).some(key => typeof key !== "string" || !DEFINITION_KEYS.includes(key))) return malformed();
  const { value: artifactDigest } = own(ref, "artifactDigest");
  if (typeof artifactDigest !== "string" || !DIGEST.test(artifactDigest)) return refuse("non-digest-definition", "validation", "definitionRef must be digest-pinned", invocationId);
  const { value: kind } = own(ref, "kind");
  const { value: id } = own(ref, "id");
  const { value: schemaVersion } = own(ref, "schemaVersion");
  if (typeof kind !== "string" || !DEFINITION_KINDS.includes(kind) || !cleanText(id) || !cleanText(schemaVersion)) return malformed();
  // Closed allowlist: an unknown mode is refused, never defaulted.
  if (typeof hostMode.value !== "string" || !EXECUTE_HOST_MODES.some(mode => mode === hostMode.value)) {
    return refuse("unknown-host-mode", "validation", "unknown hostMode", invocationId);
  }
  const mode = hostMode.value as ExecuteHostMode;
  let policyCopy: JsonValue | undefined;
  if (policy.value !== undefined) {
    const text = plainObject(policy.value) ? boundedJson(policy.value, POLICY_BYTES) : undefined;
    if (text === undefined) return refuse("malformed-policy", "validation", "malformed execute policy", invocationId);
    policyCopy = deepFreeze(JSON.parse(text) as JsonValue);
  }
  const inputText = boundedJson(input.value, INPUT_BYTES);
  if (inputText === undefined) return malformed();
  const grants = grantList(host.grants);
  if (!grants) return refuse("unknown-permission-data", "authorization", "unknown permission data", invocationId);
  // list/inspect/observe/design/control never grant execute (docs/workbench/02 WB-034); only the exact literal admits.
  if (!grants.includes(EXECUTE_GRANT)) return refuse("missing-execute-grant", "authorization", `missing exact grant ${EXECUTE_GRANT}`, invocationId);
  const admission: ExecuteAdmission = Object.freeze({
    contractVersion: EXECUTE_CONTRACT_VERSION,
    invocationId,
    definition: Object.freeze({ kind: kind as DefinitionRef["kind"], id, schemaVersion, artifactDigest }),
    inputDigest: identityDigest("workflow-execute-input", JSON.parse(inputText)),
    hostMode: mode,
    ...(policyCopy !== undefined ? { policy: policyCopy } : {}),
    grant: EXECUTE_GRANT,
    admissionPolicy: EXECUTE_ADMISSION_POLICY,
  });
  return Object.freeze({ decision: "admitted", admission });
}

function fail(message: string): never {
  throw new CapabilityError("validation", message);
}
/** A native reference exactly as the producer reported it, copied member by member; a malformed one is a host defect, never guessed or dropped. */
function nativeRefOf(value: unknown): Readonly<NativeRef> {
  if (!plainObject(value)) return fail("Launch native reference must be an object.");
  const { value: provider } = own(value, "provider");
  const { value: type } = own(value, "type");
  const { value: id } = own(value, "id");
  const scope = own(value, "scope");
  if (!cleanText(provider) || !cleanText(type) || !cleanText(id) || (scope.value !== undefined && !cleanText(scope.value))) {
    return fail("Launch native reference requires clean provider, type and id (and scope when present).");
  }
  const clean = (text: string): string => sanitizeWorkbenchText(text, TEXT_BYTES);
  return Object.freeze({ provider: clean(provider), type: clean(type), id: clean(id), ...(typeof scope.value === "string" ? { scope: clean(scope.value) } : {}) });
}
function sanitizedJson(value: JsonValue): JsonValue {
  return deepFreeze(JSON.parse(JSON.stringify(sanitizeWorkbenchJson(value))) as JsonValue);
}

/**
 * Renders the reply for one decision and one INJECTED launch outcome. A refused decision renders as a refused reply
 * and the outcome is ignored. An admitted decision requires an outcome: nothing is accepted or launched on the host's
 * silence, a launch that claims `launched` must name at least one native reference, and a refused launch names none.
 * Only the documented outcome members are copied; the raw payload is never retained. Every string is redacted and
 * stripped, and the serialized reply is capped at maxBytes with a visible marker.
 */
export function buildWorkflowExecuteReply(decision: ExecuteDecision, outcome: LaunchOutcome | undefined, maxBytes = DEFAULT_REPLY_BYTES): WorkflowExecuteReply {
  const cap = Math.max(MIN_REPLY_BYTES, Number.isFinite(maxBytes) ? Math.floor(maxBytes) : DEFAULT_REPLY_BYTES);
  if (decision.decision === "refused") {
    return Object.freeze({
      contractVersion: EXECUTE_CONTRACT_VERSION,
      status: "refused",
      completion: "not-asserted",
      ...(decision.invocationId !== undefined ? { invocationId: sanitizeWorkbenchText(decision.invocationId, TEXT_BYTES) } : {}),
      nativeRefs: Object.freeze([]),
      refusal: Object.freeze({ category: decision.category, policy: decision.policy, reason: sanitizeWorkbenchText(decision.reason, REASON_CHARS) }),
      truncated: false,
    });
  }
  const { admission } = decision;
  if (!plainObject(outcome)) return fail("An admitted execute needs a launch outcome from the host.");
  const status = own(outcome, "status").value;
  if (typeof status !== "string" || !LAUNCH_STATUSES.includes(status)) return fail("Launch status must be accepted, launched or refused; a launch cannot assert completion.");
  const launchStatus = status as LaunchStatus;
  const reported = own(outcome, "nativeRefs").value;
  if (reported !== undefined && !Array.isArray(reported)) return fail("Launch native references must be an array.");
  const reportedRefs: unknown[] = reported === undefined ? [] : Array.from(reported as unknown[]);
  const reasonValue = own(outcome, "reason").value;
  if (reasonValue !== undefined && typeof reasonValue !== "string") return fail("Launch reason must be text.");
  if (launchStatus === "launched" && reportedRefs.length === 0) return fail("A launched reply requires at least one native reference.");
  if (launchStatus === "refused" && reportedRefs.length > 0) return fail("A refused launch carries no native references.");
  const refs = reportedRefs.slice(0, MAX_NATIVE_REFS).map(nativeRefOf);
  const notes: string[] = [];
  if (reportedRefs.length > refs.length) notes.push(`${reportedRefs.length - refs.length} native references omitted`);
  let reason: string | undefined;
  if (reasonValue !== undefined) {
    reason = sanitizeWorkbenchText(reasonValue, REASON_CHARS);
    if (reasonValue.length > REASON_CHARS) notes.push("reason cut");
  }
  const shape = (keep: number, withPolicy: boolean, extra: readonly string[]): WorkflowExecuteReply => {
    const kept = refs.slice(0, keep);
    const all = [...notes, ...extra];
    return Object.freeze({
      contractVersion: EXECUTE_CONTRACT_VERSION,
      status: launchStatus,
      completion: "not-asserted",
      invocationId: sanitizeWorkbenchText(admission.invocationId, TEXT_BYTES),
      definition: Object.freeze({
        kind: admission.definition.kind,
        id: sanitizeWorkbenchText(admission.definition.id, TEXT_BYTES),
        schemaVersion: sanitizeWorkbenchText(admission.definition.schemaVersion, TEXT_BYTES),
        artifactDigest: admission.definition.artifactDigest,
      }),
      hostMode: admission.hostMode,
      nativeRefs: Object.freeze(kept),
      ...(withPolicy && admission.policy !== undefined ? { policy: sanitizedJson(admission.policy) } : {}),
      ...(reason !== undefined ? { reason } : {}),
      truncated: all.length > 0,
      ...(all.length > 0 ? { truncation: `${MARKER} ${all.join("; ")}` } : {}),
    });
  };
  const size = (reply: WorkflowExecuteReply): number => Buffer.byteLength(JSON.stringify(reply));
  let reply = shape(refs.length, true, []);
  if (size(reply) <= cap) return reply;
  const policyNote = admission.policy !== undefined ? ["policy echo omitted"] : [];
  let keep = refs.length;
  reply = shape(keep, false, policyNote);
  while (size(reply) > cap && keep > 1) {
    keep = Math.max(1, Math.floor(keep / 2));
    reply = shape(keep, false, [...policyNote, `${refs.length - keep} of ${refs.length} native references omitted`]);
  }
  return reply;
}
