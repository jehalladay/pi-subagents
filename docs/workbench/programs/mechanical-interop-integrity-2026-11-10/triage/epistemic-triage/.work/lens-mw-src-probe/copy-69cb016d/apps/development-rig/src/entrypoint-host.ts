/**
 * Optional *transient local* descriptor host. It verifies a pinned package
 * artifact before a caller-provided, already-authorized loader is entered;
 * it does not implement RPC, container hosting, or durable retries.
 */
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat } from "node:fs/promises";
import type { DevelopmentOutcome, DevelopmentRequest, DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";

export interface EntrypointDescriptor {
  readonly schema: string;
  readonly id: string;
  readonly implementation: { readonly package: string; readonly export: string };
  readonly inputSchema: string;
  readonly outputSchema: string;
  readonly bindings: readonly string[];
  readonly status: "descriptor-only";
  /** The single permitted optional annotation; never read as authority (PIWB-MW0-R002). */
  readonly note?: string;
}
export interface PinnedHostOptions {
  readonly artifactPath: string;
  readonly artifactDigest: string;
  readonly descriptor: EntrypointDescriptor;
  readonly entrypointId: string;
  readonly contractVersion: string;
  readonly services: DevelopmentServices;
  /** Host-owned loader: only load the checked artifact, never a floating package name. */
  readonly load: () => Promise<{ readonly develop: (services: DevelopmentServices, request: DevelopmentRequest) => Promise<unknown> }>;
}
const fields = ["task", "workspaceId", "baseRevision"] as const;
const bindings = ["discover", "compileContext", "implement", "verify"] as const;
/** Closed top-level descriptor field set: any other key is refused before load(). */
const descriptorKeys = new Set(["schema", "id", "implementation", "inputSchema", "outputSchema", "bindings", "status", "note"]);
const NAME = "mechanical.development.develop.v1";
export const SCHEMA = "mechanical-workflows/entrypoint/v1";
export function closedDescriptor(value: unknown): boolean {
  const d = object(value);
  return !!d && Object.keys(d).every(key => descriptorKeys.has(key)) && (d["note"] === undefined || typeof d["note"] === "string");
}
function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function basis(value: unknown): value is SubjectBasis {
  const b = object(value);
  return !!b && typeof b["workspaceId"] === "string" && !!b["workspaceId"].trim() &&
    typeof b["revision"] === "string" && !!b["revision"].trim();
}
function sameBasis(left: SubjectBasis, right: SubjectBasis): boolean {
  return left.workspaceId === right.workspaceId && left.revision === right.revision;
}
function evidence(value: unknown): boolean {
  const e = object(value);
  return !!e && ["system", "kind", "id"].every(key => typeof e[key] === "string" && !!(e[key] as string).trim());
}
function validOutcome(value: unknown, request: DevelopmentRequest): value is DevelopmentOutcome {
  const o = object(value);
  if (!o) return false;
  if (o["kind"] === "verified_candidate" || o["kind"] === "verification_failed") {
    const c = object(o["candidate"]), v = object(o["verification"]);
    if (!c || !v || !basis(c["parentBasis"]) || !basis(c["basis"]) || !basis(v["basis"])) return false;
    if (!sameBasis(c["parentBasis"], { workspaceId: request.workspaceId, revision: request.baseRevision }) ||
        c["basis"].revision === request.baseRevision || c["basis"].workspaceId !== request.workspaceId ||
        !sameBasis(c["basis"], v["basis"])) return false;
    return o["kind"] === "verified_candidate"
      ? v["verdict"] === "passed" && evidence(v["evidence"])
      : v["verdict"] === "failed";
  }
  if (o["kind"] === "needs_evidence") {
    const scope = object(o["scope"]);
    return o["reason"] === "SCOPE_INCOMPLETE" && !!scope && basis(scope["basis"]) &&
      scope["coverage"] !== "complete" && sameBasis(scope["basis"], {workspaceId:request.workspaceId,revision:request.baseRevision});
  }
  return o["kind"] === "indeterminate" && typeof o["reason"] === "string" && !!o["reason"].trim();
}
function validateInput(value: unknown): DevelopmentRequest {
  const v = object(value);
  if (!v || Object.keys(v).length !== fields.length || fields.some(key => typeof v[key] !== "string" || !(v[key] as string).trim())) {
    throw new Error("ENTRYPOINT_INPUT_INVALID: only nonempty task, workspaceId and baseRevision are accepted");
  }
  return v as unknown as DevelopmentRequest;
}
/**
 * Refuse an artifact path that is not a plain regular file before any read, copy or install:
 * control characters and dot-dot segments are refused by name, and symlinks, directories and FIFOs by lstat
 * (a FIFO would otherwise block the copy that follows).
 */
export async function assertArtifactFile(path: string): Promise<void> {
  if (typeof path !== "string" || path.length === 0 || /[\u0000-\u001f\u007f]/.test(path) || path.split(/[\\/]/).includes("..")) {
    throw new Error("ENTRYPOINT_ARTIFACT_PATH_INVALID: artifact path is empty, holds a control character or traverses upward");
  }
  const file = await lstat(path);
  if (file.isSymbolicLink() || !file.isFile()) throw new Error("ENTRYPOINT_ARTIFACT_INVALID: expected a regular artifact file");
}
export async function digestFile(path: string): Promise<string> {
  await assertArtifactFile(path);
  const hash = createHash("sha256");
  for await (const part of createReadStream(path)) hash.update(part);
  return "sha256:" + hash.digest("hex");
}
/** A successful return means only the local function's validated domain result. */
export async function invokePinnedDevelopment(options: PinnedHostOptions, input: unknown): Promise<DevelopmentOutcome> {
  const d = options.descriptor;
  if (!closedDescriptor(d) || d.schema !== SCHEMA || options.contractVersion !== SCHEMA || d.id !== NAME ||
      options.entrypointId !== NAME || d.implementation.package !== "@mechanical/workflows-development" ||
      d.implementation.export !== "develop" || d.status !== "descriptor-only" ||
      d.inputSchema !== "development-request.v1.schema.json" || d.outputSchema !== "development-outcome.v1.schema.json") {
    throw new Error("ENTRYPOINT_CONTRACT_INVALID: unsupported descriptor, schema or entrypoint");
  }
  if (d.bindings.length !== bindings.length || d.bindings.some((binding, index) => binding !== bindings[index]) ||
      Object.keys(options.services).length !== bindings.length || bindings.some(key => typeof options.services[key] !== "function")) {
    throw new Error("ENTRYPOINT_BINDING_INVALID: required application callbacks are missing");
  }
  const request = validateInput(input);
  if (!/^sha256:[a-f0-9]{64}$/.test(options.artifactDigest) || await digestFile(options.artifactPath) !== options.artifactDigest) {
    throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: immutable artifact digest differs");
  }
  // The host loader is trusted to consume this *pinned* artifact. Never retry
  // an unknown load or invocation outcome: the function may have side effects.
  const loaded = await options.load();
  if (typeof loaded?.develop !== "function") throw new Error("ENTRYPOINT_EXPORT_INVALID: expected develop function");
  const raw = await loaded.develop(options.services, request);
  if (!validOutcome(raw, request)) throw new Error("ENTRYPOINT_OUTPUT_INVALID: producer outcome is incomplete or inconsistent");
  return raw;
}
