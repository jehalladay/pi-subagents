/**
 * Pure, bounded reply builder for workflow_control (docs/workbench/11 § "First public Pi tools"). It RENDERS what the
 * landed decision core (control.ts) already decided or recorded: a ControlDecision (denied or permitted) or a
 * NativeControlReceipt in one of its three phases. It never decides, never calls decideControl/acknowledge/settle, never
 * touches a provider or SDK, and never registers a Pi tool; the shell owns the decision and any native call.
 *
 * requested, acknowledged and result are three distinct reply shapes carrying the receipt's own timestamps and native
 * echo refs verbatim. A request is not an accepted action and an accepted action is not its outcome, so an
 * acknowledged reply says completion is not established, and transport success is never labeled domain verification.
 * Every string routes through the shared sanitizers (redaction.ts) and the compact JSON is byte-capped with an honest
 * truncated flag and a visible truncation marker.
 */
import type { CapabilityErrorCategory, JsonValue } from "./capability-registry.js";
import {
  CONTROL_CONTRACT_VERSION,
  type ControlDecision,
  type ControlDenyPolicy,
  type ControlOutcome,
  DESTRUCTIVE_CONTROL_ACTIONS,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
} from "./control.js";
import { sanitizeWorkbenchJson } from "./redaction.js";

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
  /** True when anything was cut to fit the budget; the same flag and a marker are inside the reply. */
  readonly truncated: boolean;
  /** The parsed form of `text`. */
  readonly reply: { readonly [key: string]: JsonValue };
}

type Body = { [key: string]: JsonValue };
type Detail = "full" | "compact" | "minimal";

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
/** Zero-width and BOM characters survive the shared terminal strip; they never belong in a model-facing reply. */
const ZERO_WIDTH = /[​-‏⁠﻿]/g;
const REF_TEXT_LIMIT = 4200;
const CLIP = { compact: 64 } as const;

function plain(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string";
}
function clip(value: string, detail: Detail): string {
  const limit = detail === "full" ? Number.POSITIVE_INFINITY : CLIP.compact;
  return value.length > limit ? `${value.slice(0, limit - 12)} [truncated]` : value;
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
function wellFormed(receipt: unknown): receipt is NativeControlReceipt {
  if (!plain(receipt) || receipt.contractVersion !== CONTROL_CONTRACT_VERSION) return false;
  const { target } = receipt;
  const core = [receipt.requestId, receipt.grant, receipt.policy, receipt.action, receipt.invocationId, receipt.ownershipConfirmationRef, receipt.requestedAt, receipt.decidedAt];
  if (!core.every(text) || !plain(target) || !text(target.provider) || !text(target.type) || !text(target.id)) return false;
  if (target.scope !== undefined && !text(target.scope)) return false;
  if (receipt.phase === "requested") return true;
  if (!text(receipt.acknowledgedAt) || !text(receipt.nativeAckRef)) return false;
  if (receipt.phase === "acknowledged") return true;
  return receipt.phase === "result" && OUTCOMES.some(outcome => outcome === receipt.outcome) && text(receipt.nativeResultRef) && text(receipt.settledAt);
}
function requestedBlock(receipt: NativeControlReceipt, detail: Detail): Body {
  const { target } = receipt;
  const base: Body = {
    requestId: clip(receipt.requestId, detail),
    grant: clip(receipt.grant, detail),
    action: clip(receipt.action, detail),
    destructive: DESTRUCTIVE_CONTROL_ACTIONS.includes(receipt.action),
    target: { provider: clip(target.provider, detail), type: clip(target.type, detail), id: clip(target.id, detail), ...(target.scope !== undefined ? { scope: clip(target.scope, detail) } : {}) },
    requestedAt: receipt.requestedAt,
  };
  if (detail !== "full") return base;
  return { ...base, policy: receipt.policy, invocationId: receipt.invocationId, ownershipConfirmationRef: receipt.ownershipConfirmationRef, decidedAt: receipt.decidedAt };
}
function phased(receipt: NativeControlReceipt, detail: Detail): Body {
  const body: Body = { status: receipt.phase, phase: receipt.phase, requested: requestedBlock(receipt, detail) };
  if (receipt.phase !== "requested") body.acknowledged = { acknowledgedAt: receipt.acknowledgedAt, nativeAckRef: clip(receipt.nativeAckRef, detail) };
  if (receipt.phase === "result") body.result = { outcome: receipt.outcome, nativeResultRef: clip(receipt.nativeResultRef, detail), settledAt: receipt.settledAt };
  body.completion = receipt.phase === "result" ? "producer-reported" : "not-established";
  body.verification = "not-performed";
  body.notice = NOTICES[receipt.phase];
  return body;
}
/** The smallest honest reply: identity of the outcome with every echo dropped. */
function minimal(body: Body): Body {
  const keep = ["status", "phase", "category", "policy", "completion", "verification", "effect"];
  return Object.fromEntries(keep.filter(key => key in body).map(key => [key, body[key]]));
}
function bodyOf(source: ControlDecision | NativeControlReceipt, detail: Detail): Body {
  if (plain(source) && "decision" in source) {
    if (source.decision === "denied") return denied(source);
    if (source.decision === "permitted" && wellFormed(source.receipt) && source.receipt.phase === "requested") return phased(source.receipt, detail);
    return refusal("malformed-input", "validation");
  }
  return wellFormed(source) ? phased(source, detail) : refusal("malformed-input", "validation");
}
function effectiveBudget(maxBytes: number | undefined): number {
  if (maxBytes === undefined || !Number.isFinite(maxBytes)) return DEFAULT_CONTROL_REPLY_BYTES;
  return Math.min(MAX_CONTROL_REPLY_BYTES, Math.max(MIN_CONTROL_REPLY_BYTES, Math.floor(maxBytes)));
}
/** Sanitize every string through the shared sanitizers, then serialize compactly. */
function serialize(body: Body): string {
  const clean = sanitizeWorkbenchJson(body, REF_TEXT_LIMIT);
  return JSON.stringify(clean).replace(ZERO_WIDTH, "");
}

/**
 * Renders one control decision or receipt as a compact, sanitized, byte-capped JSON reply. A pure function of its
 * inputs: input that is not a core product renders a typed malformed-input refusal, never an invented phase.
 */
export function buildControlReply(source: ControlDecision | NativeControlReceipt, options: ControlReplyOptions = {}): ControlReply {
  const maxBytes = effectiveBudget(options.maxBytes);
  const attempts: readonly Detail[] = ["full", "compact", "minimal"];
  for (const detail of attempts) {
    const shaped = detail === "minimal" ? minimal(bodyOf(source, "compact")) : bodyOf(source, detail);
    const cut = detail !== "full";
    const body: Body = {
      contractVersion: CONTROL_REPLY_CONTRACT_VERSION,
      kind: "control-reply",
      ...shaped,
      truncated: cut,
      ...(cut ? { truncation: { reason: "byte-cap", maxBytes } } : {}),
    };
    const out = serialize(body);
    const bytes = Buffer.byteLength(out, "utf8");
    if (bytes <= maxBytes) return { text: out, bytes, truncated: cut, reply: JSON.parse(out) as { [key: string]: JsonValue } };
  }
  const stub = JSON.stringify({ kind: "control-reply", truncated: true });
  return { text: stub, bytes: Buffer.byteLength(stub, "utf8"), truncated: true, reply: { kind: "control-reply", truncated: true } };
}
