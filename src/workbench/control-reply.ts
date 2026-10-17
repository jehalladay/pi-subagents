/**
 * Pure, bounded reply builder for workflow_control (docs/workbench/11 § "First public Pi tools"). It RENDERS what the
 * landed decision core (control.ts) already decided or recorded: a ControlDecision (denied or permitted) or a
 * NativeControlReceipt in one of its three phases. It never decides, never calls decideControl/acknowledge/settle, never
 * touches a provider or SDK, and never registers a Pi tool; the shell owns the decision and any native call.
 *
 * requested, acknowledged and result are three distinct reply shapes carrying the receipt's own timestamps and native
 * echo refs verbatim. A request is not an accepted action and an accepted action is not its outcome, so an
 * acknowledged reply says completion is not established, and transport success is never labeled domain verification.
 * Every display string goes through the one shared helper (redaction.ts sanitizeWorkbenchText, "text" layout) exactly
 * once and before anything is cut, and the compact JSON is byte-capped with an honest truncated flag and a visible
 * truncation marker. A permit renders only when the core minted that very decision (isCoreMintedDecision, wb-5a7), and a
 * reference the core withheld renders as the core recorded it: the marker plus a fixed withheld record.
 */
import type { CapabilityErrorCategory, JsonValue } from "./capability-registry.js";
import {
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  CONTROL_REF_NOT_ADMITTED_REASON,
  CONTROL_REF_REFUSAL_POLICY,
  CONTROL_WITHHELD_REF,
  type ControlDecision,
  type ControlDenyPolicy,
  type ControlOutcome,
  type ControlRefField,
  DESTRUCTIVE_CONTROL_ACTIONS,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
} from "./control.js";
import { sanitizeWorkbenchText, type WorkbenchTextLayout } from "./redaction.js";

export const CONTROL_REPLY_CONTRACT_VERSION = "workbench.control-reply/v1";
export const DEFAULT_CONTROL_REPLY_BYTES = 4096;
export const MIN_CONTROL_REPLY_BYTES = 512;
export const MAX_CONTROL_REPLY_BYTES = 65536;

export interface ControlReplyOptions {
  /** Hard byte budget for the compact JSON text. Clamped to [MIN, MAX]; a non-finite value means the default. */
  maxBytes?: number;
}
export interface ControlReply {
  /** The sanitized compact JSON, never longer than the effective byte budget. */
  readonly text: string;
  readonly bytes: number;
  /**
   * True when anything was cut: the byte budget forced a smaller tier, or the shared text cap cut a string after
   * redaction. The same flag and a marker are inside the reply.
   */
  readonly truncated: boolean;
  /** The parsed form of `text`. */
  readonly reply: { readonly [key: string]: JsonValue };
}

type Body = { [key: string]: JsonValue };
type Detail = "full" | "compact";

/** A refusal policy of the decision core, or this builder's own malformed-input for input that is not a core product. */
type ReplyPolicy = ControlDenyPolicy | "malformed-input";

const DENY_POLICIES: readonly ControlDenyPolicy[] = [
  "unknown-permission-data", "observer-only", "malformed-request", "unknown-action", "missing-exact-grant", "cross-scope", "no-confirmed-ownership", "operator-confirmation",
];
const CATEGORIES: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const OUTCOMES: readonly ControlOutcome[] = ["completed", "failed", "cancelled", "unknown"];
/** Fixed refusal text per policy. Never derived from caller text, so a denial cannot echo a request. */
const REFUSAL_TEXT: Readonly<Record<ReplyPolicy, string>> = {
  "unknown-permission-data": "Permission data is not recognised; the request is denied.",
  "observer-only": "Observer grants never control; no control grant is present.",
  "malformed-request": "The control request is malformed.",
  "unknown-action": "The action is not an allowed native verb for this provider.",
  "missing-exact-grant": "The exact per-verb control grant is required.",
  "cross-scope": "The target is not observed in the requesting scope.",
  "no-confirmed-ownership": "No native-confirmed lifecycle ownership of the target.",
  "operator-confirmation": "Operator confirmation is required for this destructive action.",
  "malformed-input": "The reply input is not a control decision or receipt.",
};
const CONFIRMATION_LITERAL: JsonValue = { confirmed: true };
const NOTICES = {
  requested: "Requested only: the producer has not acknowledged this action, and completion is not established.",
  acknowledged: "Acknowledged by the producer; completion is not established. Observe the target for its outcome.",
  result: "The outcome is producer-reported and observed, not verified by Workbench; transport success is not domain verification.",
} as const;
const MISSING_GRANT = /^missing exact grant control:([a-z][a-z0-9-]*)\.([a-z][a-z0-9-]*)$/;
/**
 * The reply is model-facing text, so every display string takes the one helper's "text" layout: redaction reads every
 * unsafe unit both as a separator and as glue first, then whitespace controls become one space and every other unsafe
 * unit vanishes. Nothing is deleted or cut before the helper runs: deletion never precedes redaction (wb-952).
 */
const LAYOUT: WorkbenchTextLayout = "text";
/** The shared text cap on one display string, applied by the helper after redaction. */
const REF_TEXT_LIMIT = 4200;
/** The compact tier's width for one echo string, in code points, cut only from the helper's output. */
const COMPACT_WIDTH = 64;
const CUT_MARKER = " [truncated]";
/** The blocks that echo receipt text: the only strings the compact tier cuts. */
const ECHO_BLOCKS = ["requested", "acknowledged", "result"] as const;

function plain(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string";
}
/** The grant a missing-exact-grant denial names, only when both halves are allowlisted verbs of the core. */
function requiredGrantOf(reason: unknown): string | undefined {
  const match = text(reason) ? MISSING_GRANT.exec(reason) : null;
  if (!match) return undefined;
  const [, provider, action] = match;
  return Object.hasOwn(NATIVE_CONTROL_ACTIONS, provider) && NATIVE_CONTROL_ACTIONS[provider].includes(action) ? `control:${provider}.${action}` : undefined;
}
function refusal(policy: ReplyPolicy, category: CapabilityErrorCategory, extra: Body = {}): Body {
  return { status: "denied", category, policy, effect: "none", reason: REFUSAL_TEXT[policy], ...extra };
}
function denied(decision: Extract<ControlDecision, { decision: "denied" }>): Body {
  const policy = DENY_POLICIES.find(known => known === decision.policy);
  const category = CATEGORIES.find(known => known === decision.category);
  if (!policy || !category) return refusal("malformed-input", "validation");
  const extra: Body = {};
  const grant = policy === "missing-exact-grant" ? requiredGrantOf(decision.reason) : undefined;
  if (grant) extra.requiredGrant = grant;
  if (policy === "operator-confirmation") {
    extra.requiredParams = CONFIRMATION_LITERAL;
    extra.hint = "Set params.confirmed to true (explicit operator confirmation) and request the action again.";
  }
  return refusal(policy, category, extra);
}
/** The keys of one refusal the core records for a withheld reference, sorted. */
const REFUSAL_KEYS = "category,field,policy,reason";
/** The reference fields of a receipt that hold the core's withheld marker, in the order the core records their refusals. */
function withheldFields(receipt: { readonly phase?: unknown; readonly nativeAckRef?: unknown; readonly nativeResultRef?: unknown }): ControlRefField[] {
  const fields: ControlRefField[] = [];
  if (receipt.phase !== "requested" && receipt.nativeAckRef === CONTROL_WITHHELD_REF) fields.push("nativeAckRef");
  if (receipt.phase === "result" && receipt.nativeResultRef === CONTROL_WITHHELD_REF) fields.push("nativeResultRef");
  return fields;
}
/**
 * The core's own account of what it withheld (control.ts admit): exactly one fixed refusal per field holding the marker, in
 * field order, and no record at all when nothing was withheld. Any other record is not a core product.
 */
function refusalsHold(refusals: unknown, withheld: readonly ControlRefField[]): boolean {
  if (refusals === undefined) return withheld.length === 0;
  if (!Array.isArray(refusals) || withheld.length === 0 || refusals.length !== withheld.length) return false;
  const entries: readonly unknown[] = refusals;
  return entries.every((entry, at) => plain(entry) && Object.keys(entry).sort().join() === REFUSAL_KEYS && entry.policy === CONTROL_REF_REFUSAL_POLICY &&
    entry.category === "validation" && entry.field === withheld[at] && entry.reason === CONTROL_REF_NOT_ADMITTED_REASON);
}
function wellFormed(receipt: unknown): receipt is NativeControlReceipt {
  if (!plain(receipt) || receipt.contractVersion !== CONTROL_CONTRACT_VERSION) return false;
  const { target } = receipt;
  const core = [receipt.requestId, receipt.grant, receipt.policy, receipt.action, receipt.invocationId, receipt.ownershipConfirmationRef, receipt.requestedAt, receipt.decidedAt];
  if (!core.every(text) || receipt.policy !== CONTROL_PERMIT_POLICY || !plain(target) || !text(target.provider) || !text(target.type) || !text(target.id)) return false;
  if (target.scope !== undefined && !text(target.scope)) return false;
  if (!refusalsHold(receipt.refusals, withheldFields(receipt))) return false;
  if (receipt.phase === "requested") return true;
  if (!text(receipt.acknowledgedAt) || !text(receipt.nativeAckRef)) return false;
  if (receipt.phase === "acknowledged") return true;
  return receipt.phase === "result" && OUTCOMES.some(outcome => outcome === receipt.outcome) && text(receipt.nativeResultRef) && text(receipt.settledAt);
}
/** The receipt's audit core as raw text; render() sanitizes it and the compact tier cuts the helper's output. */
function requestedBlock(receipt: NativeControlReceipt, detail: Detail): Body {
  const { target } = receipt;
  const base: Body = {
    requestId: receipt.requestId,
    grant: receipt.grant,
    action: receipt.action,
    destructive: DESTRUCTIVE_CONTROL_ACTIONS.includes(receipt.action),
    target: { provider: target.provider, type: target.type, id: target.id, ...(target.scope !== undefined ? { scope: target.scope } : {}) },
    requestedAt: receipt.requestedAt,
  };
  if (detail !== "full") return base;
  return { ...base, policy: receipt.policy, invocationId: receipt.invocationId, ownershipConfirmationRef: receipt.ownershipConfirmationRef, decidedAt: receipt.decidedAt };
}
function phased(receipt: NativeControlReceipt, detail: Detail): Body {
  const body: Body = { status: receipt.phase, phase: receipt.phase, requested: requestedBlock(receipt, detail) };
  if (receipt.phase !== "requested") body.acknowledged = { acknowledgedAt: receipt.acknowledgedAt, nativeAckRef: receipt.nativeAckRef };
  if (receipt.phase === "result") body.result = { outcome: receipt.outcome, nativeResultRef: receipt.nativeResultRef, settledAt: receipt.settledAt };
  // The core's withheld record, rendered from module constants only: nothing of the receipt's own refusal text is echoed.
  const withheld = withheldFields(receipt);
  if (withheld.length > 0) body.withheld = { policy: CONTROL_REF_REFUSAL_POLICY, category: "validation", fields: withheld, reason: CONTROL_REF_NOT_ADMITTED_REASON };
  body.completionBasis = receipt.phase === "result" ? "producer-reported" : "not-established";
  body.verification = "not-performed";
  body.notice = NOTICES[receipt.phase];
  return body;
}
/** The smallest honest reply: identity of the outcome with every echo dropped; a withheld record is not an echo and stays. */
function minimal(body: Body): Body {
  const keep = ["status", "phase", "category", "policy", "completionBasis", "verification", "effect", "withheld"];
  return Object.fromEntries(keep.filter(key => key in body).map(key => [key, body[key]]));
}
function bodyOf(source: ControlDecision | NativeControlReceipt, detail: Detail): Body {
  if (plain(source) && "decision" in source) {
    if (source.decision === "denied") return denied(source);
    // A permit renders only when the core minted this very object: a copy, a replay or a look-alike, however exact, is not one.
    if (source.decision === "permitted" && isCoreMintedDecision(source) && wellFormed(source.receipt) && source.receipt.phase === "requested") return phased(source.receipt, detail);
    return refusal("malformed-input", "validation");
  }
  return wellFormed(source) ? phased(source, detail) : refusal("malformed-input", "validation");
}
function effectiveBudget(maxBytes: number | undefined): number {
  if (maxBytes === undefined || !Number.isFinite(maxBytes)) return DEFAULT_CONTROL_REPLY_BYTES;
  return Math.min(MAX_CONTROL_REPLY_BYTES, Math.max(MIN_CONTROL_REPLY_BYTES, Math.floor(maxBytes)));
}
/**
 * One display string, sanitized by the one helper at the named layout and never again. The shared text cap cuts after
 * redaction; whether it cut is read from the helper's own uncapped output, so the truncated flag keys on what the
 * helper produced.
 */
function shown(value: string, cut: { text: boolean }): string {
  const whole = sanitizeWorkbenchText(value, Number.POSITIVE_INFINITY, LAYOUT);
  if (whole.length <= REF_TEXT_LIMIT) return whole;
  cut.text = true;
  return sanitizeWorkbenchText(value, REF_TEXT_LIMIT, LAYOUT);
}
/** The reply's one sanitizing pass: every string of a shaped body, keys included, through shown(). */
function displayed(value: JsonValue, cut: { text: boolean }): JsonValue {
  if (typeof value === "string") return shown(value, cut);
  if (Array.isArray(value)) return value.map(child => displayed(child, cut));
  if (value !== null && typeof value === "object") {
    const result: Body = Object.create(null);
    for (const [key, child] of Object.entries(value)) result[shown(key, cut)] = displayed(child, cut);
    return result;
  }
  return value;
}
/**
 * The compact tier's cut of text the helper already sanitized, by code points so no surrogate pair is split. A cut
 * after redaction can only drop text, never expose what redaction covered.
 */
function clipped(value: JsonValue): JsonValue {
  if (typeof value === "string") {
    const points = Array.from(value);
    return points.length > COMPACT_WIDTH ? `${points.slice(0, COMPACT_WIDTH - CUT_MARKER.length).join("")}${CUT_MARKER}` : value;
  }
  if (Array.isArray(value)) return value.map(clipped);
  if (value !== null && typeof value === "object") {
    const result: Body = Object.create(null);
    for (const [key, child] of Object.entries(value)) result[key] = clipped(child);
    return result;
  }
  return value;
}
function compacted(body: Body): Body {
  const result: Body = { ...body };
  for (const block of ECHO_BLOCKS) if (block in body) result[block] = clipped(body[block]);
  return result;
}
/**
 * Renders one shaped body: the one sanitizing pass, then (compact tier) the cut of the echo blocks, then the envelope,
 * which adds only module constants, and compact JSON. Nothing is sanitized twice.
 */
function render(shaped: Body, detail: Detail, byteCut: boolean, maxBytes: number): ControlReply {
  const cut = { text: false };
  const sanitized = displayed(shaped, cut) as Body;
  const body = detail === "compact" ? compacted(sanitized) : sanitized;
  const truncation: Body | undefined = byteCut
    ? { reason: "byte-cap", maxBytes, ...(cut.text ? { textCap: REF_TEXT_LIMIT } : {}) }
    : cut.text
      ? { reason: "text-cap", maxChars: REF_TEXT_LIMIT }
      : undefined;
  const envelope: Body = { contractVersion: CONTROL_REPLY_CONTRACT_VERSION, kind: "control-reply", ...body, truncated: truncation !== undefined, ...(truncation ? { truncation } : {}) };
  const out = JSON.stringify(envelope);
  return { text: out, bytes: Buffer.byteLength(out, "utf8"), truncated: truncation !== undefined, reply: JSON.parse(out) as { [key: string]: JsonValue } };
}

/**
 * Renders one control decision or receipt as a compact, sanitized, byte-capped JSON reply. A pure function of its
 * inputs: input that is not a core product renders a typed malformed-input refusal, never an invented phase. The
 * truncated flag keys on the final cut: it is true whenever the byte budget forced a smaller tier or the shared text cap
 * cut any string after redaction.
 */
export function buildControlReply(source: ControlDecision | NativeControlReceipt, options: ControlReplyOptions = {}): ControlReply {
  const maxBytes = effectiveBudget(options.maxBytes);
  const full = render(bodyOf(source, "full"), "full", false, maxBytes);
  if (full.bytes <= maxBytes) return full;
  const compact = render(bodyOf(source, "compact"), "compact", true, maxBytes);
  if (compact.bytes <= maxBytes) return compact;
  return render(minimal(bodyOf(source, "compact")), "compact", true, maxBytes);
}
