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
/**
 * The named display layouts (F6 rule): every display string goes through the one shared helper, with its layout named here.
 * Identity text (the invocation reference, the definition id and schemaVersion, the native reference members) renders in
 * "text", so an identity is never collapsed or trimmed; a single-line diagnostic (a refusal or launch reason) renders in
 * "label". The policy echo goes through sanitizeWorkbenchJson, which names no layout; the sanitizer corpus drives it through
 * buildWorkflowExecuteReply as a DIRECT-CALLER row.
 */
function identityText(value: string): string {
  return sanitizeWorkbenchText(value, TEXT_BYTES, "text");
}
function diagnosticText(value: string, maxTextLength: number): string {
  return sanitizeWorkbenchText(value, maxTextLength, "label");
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
  return Object.freeze({ provider: identityText(provider), type: identityText(type), id: identityText(id), ...(typeof scope.value === "string" ? { scope: identityText(scope.value) } : {}) });
}
const encoder = new TextEncoder();
/** UTF-8 bytes of the serialized reply: TextEncoder bytes, never String.length. */
function utf8Bytes(value: unknown): number {
  return encoder.encode(JSON.stringify(value)).length;
}
/** A prefix of at most `limit` UTF-16 units that never ends between the halves of a surrogate pair. */
function cutText(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const high = limit > 0 ? value.charCodeAt(limit - 1) : 0;
  return value.slice(0, high >= 0xd800 && high <= 0xdbff ? limit - 1 : limit);
}
interface Fit {
  keep: number;
  policy: boolean;
  reasonChars: number;
  textChars: number;
  idChars: number;
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
      ...(decision.invocationId !== undefined ? { invocationId: identityText(decision.invocationId) } : {}),
      nativeRefs: Object.freeze([]),
      refusal: Object.freeze({ category: decision.category, policy: decision.policy, reason: diagnosticText(decision.reason, REASON_CHARS) }),
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
  const baseNotes: string[] = [];
  if (reportedRefs.length > refs.length) baseNotes.push(`${reportedRefs.length - refs.length} native references omitted`);
  let reason: string | undefined;
  if (reasonValue !== undefined) {
    reason = diagnosticText(reasonValue, REASON_CHARS);
    // The cut is keyed on what the shared sanitizer actually did to the redacted text, never on the raw length.
    if (reason !== diagnosticText(reasonValue, Number.MAX_SAFE_INTEGER)) baseNotes.push("reason cut");
  }
  let policy: JsonValue | undefined;
  if (admission.policy !== undefined) {
    policy = sanitizedJson(admission.policy);
    if (canonicalJson(policy) !== canonicalJson(sanitizeWorkbenchJson(admission.policy, Number.MAX_SAFE_INTEGER))) baseNotes.push("policy echo cut");
  }
  const shownInvocation = identityText(admission.invocationId);
  const shownDefinitionId = identityText(admission.definition.id);
  const shownSchemaVersion = identityText(admission.definition.schemaVersion);
  const shape = (fit: Fit): WorkflowExecuteReply => {
    const trimmed = new Set<string>();
    const text = (value: string, limit: number, what: string): string => {
      const cut = cutText(value, limit);
      if (cut !== value) trimmed.add(what);
      return cut;
    };
    const kept = refs.slice(0, fit.keep).map(ref =>
      Object.freeze({
        provider: text(ref.provider, fit.textChars, "native reference text"),
        type: text(ref.type, fit.textChars, "native reference text"),
        id: text(ref.id, fit.textChars, "native reference text"),
        ...(ref.scope !== undefined ? { scope: text(ref.scope, fit.textChars, "native reference text") } : {}),
      }),
    );
    const invocationId = text(shownInvocation, fit.idChars, "invocation reference");
    const definition = Object.freeze({
      kind: admission.definition.kind,
      id: text(shownDefinitionId, fit.textChars, "definition text"),
      schemaVersion: text(shownSchemaVersion, fit.textChars, "definition text"),
      artifactDigest: admission.definition.artifactDigest,
    });
    let shownReason: string | undefined;
    if (reason !== undefined) {
      if (fit.reasonChars === 0 && reason !== "") trimmed.add("reason");
      else shownReason = text(reason, fit.reasonChars, "reason");
    }
    const notes = [...baseNotes];
    if (policy !== undefined && !fit.policy) notes.push("policy echo omitted");
    if (fit.keep < refs.length) notes.push(`${refs.length - fit.keep} of ${refs.length} native references omitted`);
    for (const what of trimmed) notes.push(`${what} trimmed`);
    const withPolicy = fit.policy && policy !== undefined;
    return Object.freeze({
      contractVersion: EXECUTE_CONTRACT_VERSION,
      status: launchStatus,
      completion: "not-asserted",
      invocationId,
      definition,
      hostMode: admission.hostMode,
      nativeRefs: Object.freeze(kept),
      ...(withPolicy ? { policy } : {}),
      ...(shownReason !== undefined ? { reason: shownReason } : {}),
      truncated: notes.length > 0,
      ...(notes.length > 0 ? { truncation: `${MARKER} ${notes.join("; ")}` } : {}),
    });
  };
  // Squeeze in a fixed order until the FINAL serialized UTF-8 length fits: policy echo, then native references (halved),
  // then reason text, definition and reference text, whole references, and last the invocation text. Deterministic and
  // total: the last step leaves only constant members, so no accepted cap is ever exceeded. Since wb-952 the admission
  // refuses every unsafe unit in identity text, so text trimmed to 32 units with one reference kept always fits the
  // 2048-byte floor (bounded near 1.66 KB; the respin's sweep of 77,760 admissible maxima cases peaked at 1652 bytes):
  // the whole-reference and invocation steps are not reached today and stay only as the structural bound behind "total".
  const fits = (reply: WorkflowExecuteReply): boolean => utf8Bytes(reply) <= cap;
  let fit: Fit = { keep: refs.length, policy: true, reasonChars: REASON_CHARS, textChars: TEXT_BYTES, idChars: TEXT_BYTES };
  let reply = shape(fit);
  const attempt = (next: Fit): boolean => {
    fit = next;
    reply = shape(fit);
    return fits(reply);
  };
  if (fits(reply)) return reply;
  if (attempt({ ...fit, policy: false })) return reply;
  while (fit.keep > 1) if (attempt({ ...fit, keep: Math.max(1, Math.floor(fit.keep / 2)) })) return reply;
  while (fit.reasonChars > 0) if (attempt({ ...fit, reasonChars: Math.floor(fit.reasonChars / 2) })) return reply;
  while (fit.textChars > 32) if (attempt({ ...fit, textChars: Math.floor(fit.textChars / 2) })) return reply;
  if (attempt({ ...fit, keep: 0 })) return reply;
  while (fit.idChars > 0) if (attempt({ ...fit, idChars: Math.floor(fit.idChars / 2) })) return reply;
  return reply;
}
