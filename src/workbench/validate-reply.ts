/**
 * Pure bounded reply builder for workflow_validate (docs/workbench/11 § "First public Pi tools"; docs/workbench/17
 * § "Experimental read-only source tools"). It RENDERS the landed designer validation core's result and never
 * re-decides it: it reads exact authorized source bytes already resolved by the host, checks their digest BEFORE any
 * content is assembled, runs the core (syntax compile without execution), and shapes the answer as compact sanitized
 * JSON under a byte cap. It never executes, edits or promotes source, never registers a Pi tool and never reads the
 * filesystem. Errors, warnings and uncertain conditions stay three distinct arrays, each count carrying its scope.
 */
import { createHash } from "node:crypto";
import type { CapabilityErrorCategory, CapabilityRegistry } from "./capability-registry.js";
import { CapabilityError } from "./capability-registry.js";
import { type DesignerDiagnostic, validateWorkflowSource, type WorkflowSource, type WorkflowValidation } from "./designer.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";

export const VALIDATE_REPLY_CONTRACT_VERSION = "workbench.validate-reply/v1";
/** Grant that opens the design tools; matched as an exact string, deny by default (docs/workbench/12). */
export const VALIDATE_REPLY_GRANT = "workbench:design";
export const VALIDATE_REPLY_MIN_BYTES = 4096;
export const VALIDATE_REPLY_DEFAULT_MAX_BYTES = 16384;
export const VALIDATE_REPLY_MAX_BYTES = 262144;
export const VALIDATE_REPLY_TRUNCATION_MARKER = "[truncated: reply byte cap reached]";

/** The `mode` values workflow_validate understands. The designer core has one: compile syntax, never execute. */
const SUPPORTED_MODES: readonly string[] = Object.freeze(["static"]);
/** The workbench.capabilityGrants grammar settings.ts enforces: explicit namespace:permission, no wildcard. */
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
const DIGEST = /^sha256:[0-9a-f]{64}$/;
/** Core warnings that say "this could not be established", which the reply reports as uncertain, never as a warning. */
const UNCERTAIN_DIAGNOSTIC_CODES: readonly string[] = Object.freeze(["NODE_UNAVAILABLE", "BINDINGS_UNCHECKED"]);

/** What the caller submitted. Identity fields are checked against the host-resolved source, never trusted. */
export interface WorkflowValidateRequest {
  sourceRef: string;
  /** The artifact digest the caller was shown for sourceRef (sha256:<64 hex>). */
  digest: string;
  mode?: "static";
  /** Accepted for the tool signature; the designer core has no input-schema check, so a supplied value is reported as uncertain. */
  inputs?: unknown;
  /** Accepted for the tool signature; the designer core takes its bindings from the registry snapshot only. */
  bindings?: unknown;
}

export interface BuildWorkflowValidateReplyInput {
  request: WorkflowValidateRequest;
  /** The host-resolved, authorized source snapshot (inspectWorkflowSource). */
  source: WorkflowSource;
  /** The grant snapshot the host bound to this call. Every capability decision derives from it alone. */
  grants: readonly string[] | undefined;
  registry?: CapabilityRegistry;
  maxBytes?: number;
  /** Injection seam for the designer core; defaults to the landed validateWorkflowSource. */
  validate?: (source: WorkflowSource, options: { registry?: CapabilityRegistry; grants?: readonly string[] }) => WorkflowValidation;
}

export type ValidateRefusalCode = "UNKNOWN_PERMISSION_DATA" | "MISSING_DESIGN_GRANT" | "UNSUPPORTED_MODE" | "SOURCE_REF_MISMATCH" | "DIGEST_MALFORMED" | "DIGEST_MISMATCH"
  | "SOURCE_BYTES_MISMATCH";

export interface ValidateRefusalReply {
  readonly contractVersion: typeof VALIDATE_REPLY_CONTRACT_VERSION;
  readonly status: "refused";
  readonly refusal: { readonly code: ValidateRefusalCode; readonly category: CapabilityErrorCategory; readonly reason: string };
  readonly executed: false;
}

export interface ValidateReplyItem {
  scope: "diagnostic" | "projection" | "request";
  code: string;
  message: string;
  dimension?: string;
  line?: number;
  column?: number;
}
export interface ValidateReplyCount { offered: number; returned: number; scope: string }
export interface ValidateReplyCall { primitive: "agent" | "node" | "workflow"; provenance: "declared"; line: number; column: number; conditional: boolean; capabilityId?: string }

export interface ValidateCompletedReply {
  readonly contractVersion: typeof VALIDATE_REPLY_CONTRACT_VERSION;
  /** The verdict. "valid" only when no error and no uncertain condition was offered; computed from offered counts, never returned ones. */
  readonly status: "valid" | "invalid" | "uncertain";
  /** The designer core's own status, rendered verbatim for audit. */
  readonly coreStatus: WorkflowValidation["status"];
  readonly syntax: WorkflowValidation["syntax"];
  readonly source: { sourceRef: string; kind: string; schemaVersion: string; artifactDigest: string; digestChecked: true };
  readonly meta?: { name?: string; description?: string };
  readonly errors: ValidateReplyItem[];
  readonly warnings: ValidateReplyItem[];
  readonly uncertain: ValidateReplyItem[];
  readonly possibleCalls: ValidateReplyCall[];
  readonly counts: { errors: ValidateReplyCount; warnings: ValidateReplyCount; uncertain: ValidateReplyCount; possibleCalls: ValidateReplyCount };
  readonly deployment: { registrySupplied: boolean; grantCount: number };
  readonly truncation?: { truncated: true; marker: string; maxBytes: number };
  readonly executed: false;
}
export type WorkflowValidateReply = ValidateRefusalReply | ValidateCompletedReply;

export interface BuiltWorkflowValidateReply {
  /** Compact sanitized JSON, at most the byte cap. */
  readonly text: string;
  readonly reply: WorkflowValidateReply;
  readonly bytes: number;
  readonly truncated: boolean;
}

const REFUSALS: Readonly<Record<ValidateRefusalCode, { category: CapabilityErrorCategory; reason: string }>> = Object.freeze({
  UNKNOWN_PERMISSION_DATA: { category: "authorization", reason: "unknown permission data" },
  MISSING_DESIGN_GRANT: { category: "authorization", reason: `missing exact grant ${VALIDATE_REPLY_GRANT}` },
  UNSUPPORTED_MODE: { category: "validation", reason: "unsupported mode" },
  SOURCE_REF_MISMATCH: { category: "validation", reason: "sourceRef is not the resolved source identity" },
  DIGEST_MALFORMED: { category: "validation", reason: "digest must be sha256:<64 lowercase hex>" },
  DIGEST_MISMATCH: { category: "validation", reason: "submitted digest does not match the validated source identity" },
  SOURCE_BYTES_MISMATCH: { category: "validation", reason: "source bytes do not match their pinned definition digest" },
});

const SCOPES = Object.freeze({
  errors: "validation diagnostics of severity error",
  warnings: "validation diagnostics of severity warning, excluding uncertainty codes",
  uncertain: "uncertainty diagnostics, dynamic or opaque source constructs, and unchecked request arguments",
  possibleCalls: "declared-source possible calls; observations, not a call graph",
});

function digestOf(source: string): string {
  return `sha256:${createHash("sha256").update(source, "utf8").digest("hex")}`;
}
function grantList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string" && GRANT.test(grant)) ? grants : undefined;
}
function refuse(code: ValidateRefusalCode): ValidateRefusalReply {
  const { category, reason } = REFUSALS[code];
  return Object.freeze({ contractVersion: VALIDATE_REPLY_CONTRACT_VERSION, status: "refused", refusal: Object.freeze({ code, category, reason }), executed: false });
}
function checkedCap(value: number | undefined): number {
  const cap = value ?? VALIDATE_REPLY_DEFAULT_MAX_BYTES;
  if (!Number.isSafeInteger(cap) || cap < VALIDATE_REPLY_MIN_BYTES || cap > VALIDATE_REPLY_MAX_BYTES) {
    throw new CapabilityError("validation", `maxBytes must be an integer from ${VALIDATE_REPLY_MIN_BYTES} to ${VALIDATE_REPLY_MAX_BYTES}.`);
  }
  return cap;
}
/** The decision that runs before any content is assembled. Authorization first, so an observer learns nothing about the source. */
function refusalFor(input: BuildWorkflowValidateReplyInput, grants: readonly string[] | undefined): ValidateRefusalReply | undefined {
  if (!grants) return refuse("UNKNOWN_PERMISSION_DATA");
  if (!grants.includes(VALIDATE_REPLY_GRANT)) return refuse("MISSING_DESIGN_GRANT");
  const { request, source } = input;
  if (request.mode !== undefined && !SUPPORTED_MODES.includes(request.mode)) return refuse("UNSUPPORTED_MODE");
  if (typeof request.sourceRef !== "string" || request.sourceRef !== source.sourceRef) return refuse("SOURCE_REF_MISMATCH");
  if (typeof request.digest !== "string" || !DIGEST.test(request.digest)) return refuse("DIGEST_MALFORMED");
  if (request.digest !== source.definition.artifactDigest) return refuse("DIGEST_MISMATCH");
  if (typeof source.source !== "string" || digestOf(source.source) !== source.definition.artifactDigest) return refuse("SOURCE_BYTES_MISMATCH");
  return undefined;
}

function diagnosticItem({ code, message, dimension }: DesignerDiagnostic): ValidateReplyItem {
  return { scope: "diagnostic", code: sanitizeWorkbenchText(code, 64), message: sanitizeWorkbenchText(message, 500), ...(dimension !== undefined ? { dimension: sanitizeWorkbenchText(dimension, 64) } : {}) };
}
function requestUncertain(request: WorkflowValidateRequest): ValidateReplyItem[] {
  const items: ValidateReplyItem[] = [];
  if (request.inputs !== undefined) items.push({ scope: "request", code: "INPUTS_UNCHECKED", message: "Supplied inputs were not validated: the designer core has no input-schema check." });
  if (request.bindings !== undefined) {
    items.push({ scope: "request", code: "BINDINGS_UNCHECKED_ARGUMENT", message: "Supplied bindings were not validated: deployment bindings come only from the registry snapshot." });
  }
  return items;
}

interface Parts {
  verdict: ValidateCompletedReply["status"];
  core: WorkflowValidation;
  source: ValidateCompletedReply["source"];
  meta: ValidateCompletedReply["meta"];
  errors: ValidateReplyItem[];
  warnings: ValidateReplyItem[];
  uncertain: ValidateReplyItem[];
  calls: ValidateReplyCall[];
  deployment: ValidateCompletedReply["deployment"];
}
interface Keep { errors: number; warnings: number; uncertain: number; calls: number }

function assemble(input: BuildWorkflowValidateReplyInput, grants: readonly string[]): Parts {
  const validate = input.validate ?? validateWorkflowSource;
  const core = validate(input.source, { ...(input.registry ? { registry: input.registry } : {}), grants });
  const errors = core.diagnostics.filter(item => item.severity === "error").map(diagnosticItem);
  const warnings = core.diagnostics.filter(item => item.severity === "warning" && !UNCERTAIN_DIAGNOSTIC_CODES.includes(item.code)).map(diagnosticItem);
  const uncertain: ValidateReplyItem[] = [
    ...core.diagnostics.filter(item => item.severity === "warning" && UNCERTAIN_DIAGNOSTIC_CODES.includes(item.code)).map(diagnosticItem),
    ...core.projection.unknown.map(({ reason, location }): ValidateReplyItem => ({
      scope: "projection", code: "DYNAMIC_OR_OPAQUE", message: sanitizeWorkbenchText(reason, 500), line: location.line, column: location.column,
    })),
    ...requestUncertain(input.request),
  ];
  // Never upgrade: an error or an invalid core is invalid, and an uncertain condition is never a pass.
  const verdict = errors.length > 0 || core.status === "invalid" || core.syntax === "invalid" ? "invalid" : uncertain.length > 0 || core.status === "uncertain" ? "uncertain" : "valid";
  const { definition } = input.source;
  const meta = core.meta
    ? {
      ...(typeof core.meta.name === "string" ? { name: sanitizeWorkbenchText(core.meta.name, 128) } : {}),
      ...(typeof core.meta.description === "string" ? { description: sanitizeWorkbenchText(core.meta.description, 200) } : {}),
    }
    : undefined;
  return {
    verdict,
    core,
    source: {
      sourceRef: sanitizeWorkbenchText(input.source.sourceRef, 512), kind: definition.kind, schemaVersion: sanitizeWorkbenchText(definition.schemaVersion, 64),
      artifactDigest: definition.artifactDigest, digestChecked: true,
    },
    meta,
    errors,
    warnings,
    uncertain,
    calls: core.projection.calls.map(({ primitive, location, conditional, capabilityId }): ValidateReplyCall => ({
      primitive, provenance: "declared", line: location.line, column: location.column, conditional,
      ...(capabilityId !== undefined ? { capabilityId: sanitizeWorkbenchText(capabilityId, 200) } : {}),
    })),
    deployment: { registrySupplied: input.registry !== undefined, grantCount: grants.length },
  };
}

function render(parts: Parts, keep: Keep, maxBytes: number): ValidateCompletedReply {
  const count = (offered: number, returned: number, scope: string): ValidateReplyCount => ({ offered, returned, scope });
  const truncated = keep.errors < parts.errors.length || keep.warnings < parts.warnings.length || keep.uncertain < parts.uncertain.length || keep.calls < parts.calls.length;
  return {
    contractVersion: VALIDATE_REPLY_CONTRACT_VERSION,
    status: parts.verdict,
    coreStatus: parts.core.status,
    syntax: parts.core.syntax,
    source: parts.source,
    ...(parts.meta ? { meta: parts.meta } : {}),
    errors: parts.errors.slice(0, keep.errors),
    warnings: parts.warnings.slice(0, keep.warnings),
    uncertain: parts.uncertain.slice(0, keep.uncertain),
    possibleCalls: parts.calls.slice(0, keep.calls),
    counts: {
      errors: count(parts.errors.length, keep.errors, SCOPES.errors),
      warnings: count(parts.warnings.length, keep.warnings, SCOPES.warnings),
      uncertain: count(parts.uncertain.length, keep.uncertain, SCOPES.uncertain),
      possibleCalls: count(parts.calls.length, keep.calls, SCOPES.possibleCalls),
    },
    deployment: parts.deployment,
    ...(truncated ? { truncation: { truncated: true as const, marker: VALIDATE_REPLY_TRUNCATION_MARKER, maxBytes } } : {}),
    executed: false,
  };
}
function serialize(reply: WorkflowValidateReply): string {
  return sanitizeWorkbenchJsonText(reply);
}
function size(text: string): number {
  return Buffer.byteLength(text);
}

/** Drops possible calls first, then uncertain, then warnings, and errors last, keeping the longest prefix that fits. */
function fitToCap(parts: Parts, maxBytes: number): { reply: ValidateCompletedReply; text: string } {
  const keep: Keep = { errors: parts.errors.length, warnings: parts.warnings.length, uncertain: parts.uncertain.length, calls: parts.calls.length };
  const attempt = (): { reply: ValidateCompletedReply; text: string } => {
    const reply = render(parts, keep, maxBytes);
    return { reply, text: serialize(reply) };
  };
  let current = attempt();
  for (const field of ["calls", "uncertain", "warnings", "errors"] as const) {
    if (size(current.text) <= maxBytes) return current;
    const total = keep[field];
    let low = 0;
    let high = total - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      keep[field] = middle;
      if (size(attempt().text) <= maxBytes) low = middle;
      else high = middle - 1;
    }
    keep[field] = Math.max(0, low);
    current = attempt();
  }
  if (size(current.text) > maxBytes) throw new CapabilityError("validation", "The byte cap cannot hold the minimal validation reply.");
  return current;
}

/**
 * Synchronous and side-effect free apart from the injected designer core, which only reads the supplied source
 * snapshot. Rules apply in order and the first refusal wins; a refusal carries a fixed typed reason and never echoes
 * caller text, and the core is not entered at all.
 */
export function buildWorkflowValidateReply(input: BuildWorkflowValidateReplyInput): BuiltWorkflowValidateReply {
  const maxBytes = checkedCap(input.maxBytes);
  const grants = grantList(input.grants);
  const refusal = refusalFor(input, grants);
  if (refusal || !grants) {
    const reply = refusal ?? refuse("UNKNOWN_PERMISSION_DATA");
    const text = serialize(reply);
    return Object.freeze({ text, reply, bytes: size(text), truncated: false });
  }
  const { reply, text } = fitToCap(assemble(input, grants), maxBytes);
  return Object.freeze({ text, reply, bytes: size(text), truncated: reply.truncation !== undefined });
}
