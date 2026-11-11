/**
 * Proposed application-host binding contract `mechanical.pi-host/v1` (EAT-R002) and the
 * Pi-representable function-action write grant (EAT-R003). This module is the single producer of
 * the TypeScript type; the committed JSON schema is contracts/schemas/mechanical-host-binding.v1.schema.json.
 * It is a data contract and a pure guard: it imports no loader, provider, process, file or network path,
 * and the status stays descriptor-only until an invocable package has separately passed joint ratification with Pi.
 */

export const HOST_BINDING_CONTRACT = "mechanical.pi-host/v1" as const;
export const HOST_BINDING_DESCRIPTOR_ID = "mechanical.development.develop.v1" as const;
export const EVIDENCE_PROFILES = ["git-census-v1", "hx-task-scope-v1"] as const;
export const CONTEXT_PROFILES = ["plain-v1", "rf-committed-v1"] as const;
/** Candidate grant spelling, not yet adopted jointly with Pi: exactly two colon-free segments. */
export const WRITE_GRANT = "mechanical:develop-write" as const;

export type EvidenceProfile = (typeof EVIDENCE_PROFILES)[number];
export type ContextProfile = (typeof CONTEXT_PROFILES)[number];

export interface MechanicalHostBindingV1 {
  contract: typeof HOST_BINDING_CONTRACT;
  descriptorId: typeof HOST_BINDING_DESCRIPTOR_ID;
  artifact: {
    package: "@mechanical/workflows-development";
    export: "develop";
    sha256: string;
    descriptorSha256: string;
  };
  source: {
    workspaceRealpath: string;
    baseCommit: string;
    baseTree: string;
    forgeManifestSha256: string;
  };
  invocationId: string;
  evidenceProfile: EvidenceProfile;
  contextProfile: ContextProfile;
  intent: {
    task: string;
    writer: "single";
    allowedEffects: readonly string[];
  };
}

export type HostBindingCode =
  | "HOST_BINDING_NOT_OBJECT"
  | "HOST_BINDING_FIELD_MISSING"
  | "HOST_BINDING_FIELD_EXTRA"
  | "HOST_BINDING_FIELD_INVALID"
  | "HOST_BINDING_VERSION_UNKNOWN"
  | "HOST_BINDING_PROFILE_UNKNOWN";

export type WriteGrantCode = "WRITE_GRANT_ABSENT" | "WRITE_GRANT_NOT_EXACT" | "WRITE_GRANT_UNREPRESENTABLE" | "WRITE_GRANT_REVOKED";

/** Typed refusal: `field` is the dotted path of the offending field. */
export class HostBindingError extends Error {
  readonly code: HostBindingCode | WriteGrantCode;
  readonly field: string;
  constructor(code: HostBindingCode | WriteGrantCode, field: string) {
    super(code + ": " + field);
    this.name = "HostBindingError";
    this.code = code;
    this.field = field;
  }
}

type Json = Record<string, unknown>;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const GIT_ID = /^[0-9a-f]{40}$/;
const object = (value: unknown): Json | null => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Json : null;

function closed(value: unknown, field: string, keys: readonly string[]): Json {
  const record = object(value);
  if (!record) throw new HostBindingError("HOST_BINDING_NOT_OBJECT", field);
  for (const key of keys) if (!(key in record)) throw new HostBindingError("HOST_BINDING_FIELD_MISSING", join(field, key));
  for (const key of Object.keys(record)) if (!keys.includes(key)) throw new HostBindingError("HOST_BINDING_FIELD_EXTRA", join(field, key));
  return record;
}
const join = (parent: string, key: string): string => parent === "" ? key : parent + "." + key;

function text(record: Json, parent: string, key: string, pattern?: RegExp): string {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0 || (pattern !== undefined && !pattern.test(value))) throw new HostBindingError("HOST_BINDING_FIELD_INVALID", join(parent, key));
  return value;
}
function literal<T extends string>(record: Json, parent: string, key: string, expected: T): T {
  if (record[key] !== expected) throw new HostBindingError("HOST_BINDING_FIELD_INVALID", join(parent, key));
  return expected;
}
function oneOf<T extends string>(record: Json, parent: string, key: string, allowed: readonly T[]): T {
  const value = record[key];
  if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) throw new HostBindingError("HOST_BINDING_PROFILE_UNKNOWN", join(parent, key));
  return value as T;
}

/**
 * Validate a serialized binding against the closed v1 shape. Order is deliberate: the version is judged first
 * so an unknown contract names `contract` even when other fields differ. Throws HostBindingError; never loads anything.
 */
export function validateHostBinding(raw: unknown): MechanicalHostBindingV1 {
  const top = object(raw);
  if (!top) throw new HostBindingError("HOST_BINDING_NOT_OBJECT", "");
  if (top["contract"] !== HOST_BINDING_CONTRACT) {
    throw new HostBindingError(typeof top["contract"] === "string" ? "HOST_BINDING_VERSION_UNKNOWN" : "contract" in top ? "HOST_BINDING_FIELD_INVALID" : "HOST_BINDING_FIELD_MISSING", "contract");
  }
  const root = closed(top, "", ["contract", "descriptorId", "artifact", "source", "invocationId", "evidenceProfile", "contextProfile", "intent"]);
  literal(root, "", "descriptorId", HOST_BINDING_DESCRIPTOR_ID);
  const artifact = closed(root["artifact"], "artifact", ["package", "export", "sha256", "descriptorSha256"]);
  literal(artifact, "artifact", "package", "@mechanical/workflows-development");
  literal(artifact, "artifact", "export", "develop");
  const artifactSha = text(artifact, "artifact", "sha256", SHA256);
  const descriptorSha = text(artifact, "artifact", "descriptorSha256", SHA256);
  const source = closed(root["source"], "source", ["workspaceRealpath", "baseCommit", "baseTree", "forgeManifestSha256"]);
  const workspaceRealpath = text(source, "source", "workspaceRealpath", /^\/[^\0]*$/);
  const baseCommit = text(source, "source", "baseCommit", GIT_ID);
  const baseTree = text(source, "source", "baseTree", GIT_ID);
  const forgeManifestSha256 = text(source, "source", "forgeManifestSha256", SHA256);
  const invocationId = text(root, "", "invocationId");
  const evidenceProfile = oneOf(root, "", "evidenceProfile", EVIDENCE_PROFILES);
  const contextProfile = oneOf(root, "", "contextProfile", CONTEXT_PROFILES);
  const intent = closed(root["intent"], "intent", ["task", "writer", "allowedEffects"]);
  const task = text(intent, "intent", "task");
  literal(intent, "intent", "writer", "single");
  const effects = intent["allowedEffects"];
  if (!Array.isArray(effects) || effects.some(effect => typeof effect !== "string" || effect.length === 0)) throw new HostBindingError("HOST_BINDING_FIELD_INVALID", "intent.allowedEffects");
  return {
    contract: HOST_BINDING_CONTRACT,
    descriptorId: HOST_BINDING_DESCRIPTOR_ID,
    artifact: { package: "@mechanical/workflows-development", export: "develop", sha256: artifactSha, descriptorSha256: descriptorSha },
    source: { workspaceRealpath, baseCommit, baseTree, forgeManifestSha256 },
    invocationId,
    evidenceProfile,
    contextProfile,
    intent: { task, writer: "single", allowedEffects: effects as string[] },
  };
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  const record = object(value);
  if (record) return "{" + Object.keys(record).sort().map(key => JSON.stringify(key) + ":" + canonical(record[key])).join(",") + "}";
  return JSON.stringify(value);
}
/** Key-order independent, whitespace free UTF-8 bytes of a binding. */
export function canonicalHostBindingBytes(binding: MechanicalHostBindingV1): Uint8Array {
  return new TextEncoder().encode(canonical(binding));
}

/**
 * Validate first; the injected loader runs only for a binding that passed, so a refused binding
 * cannot cause any loader or provider import.
 */
export async function admitHostBinding<T>(raw: unknown, load: (binding: MechanicalHostBindingV1) => Promise<T>): Promise<{ binding: MechanicalHostBindingV1; loaded: T }> {
  const binding = validateHostBinding(raw);
  return { binding, loaded: await load(binding) };
}

/** A grant token Pi's permission grammar can represent: exactly two segments, no third colon. */
export const isRepresentableGrant = (token: string): boolean => /^[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/.test(token);

/**
 * Final-boundary write check (EAT-R003). `admitted` is the host-owned grant set measured at admission;
 * `current` is re-read now. The writer starts only when the exact adopted spelling is present in `current()`;
 * a grant that was admitted and is gone now refuses as WRITE_GRANT_REVOKED, and a grant absent at admission
 * but present now dispatches (EAT-R003 does not require the admitted check).
 */
export async function dispatchWriteAtFinalBoundary<T>(admitted: readonly string[], current: () => readonly string[], writer: () => Promise<T>): Promise<T> {
  const now = current();
  if (!now.includes(WRITE_GRANT)) {
    if (admitted.includes(WRITE_GRANT)) throw new HostBindingError("WRITE_GRANT_REVOKED", WRITE_GRANT);
    const near = now.find(token => token.startsWith(WRITE_GRANT) || WRITE_GRANT.startsWith(token) && token.length > 0);
    if (near === undefined) throw new HostBindingError("WRITE_GRANT_ABSENT", WRITE_GRANT);
    throw new HostBindingError(isRepresentableGrant(near) ? "WRITE_GRANT_NOT_EXACT" : "WRITE_GRANT_UNREPRESENTABLE", near);
  }
  return writer();
}
