/**
 * Invocation effect-identity record (EAT-R048, degenerate EAT-R049; MechanicalWorkflows-nfv9b.2). Pure digest
 * arithmetic plus one bounded file read for the host-named skill files. App-local replay evidence, not a cross-host
 * authority: it names what the host observed, and records an axis it could not observe as absent rather than guessing.
 */
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { join, posix, sep } from "node:path";

export const INVOCATION_IDENTITY_SCHEMA = "mechanical.invocation-identity/v1";
export const CLAUDE_AGENT_SDK_NAME = "@anthropic-ai/claude-agent-sdk";
/** Cross-host axes the host supplies or observes beyond the app-local ones (EAT-R012; MechanicalWorkflows-loexn.7). */
export const HOST_AXES = ["workspace", "task", "principal", "piInvocation", "descriptor", "tarball", "contextProfile", "evidenceProfile", "gateParameters"] as const;
export const INVOCATION_AXES = ["source", "sdk", "prompt", "settings", "gateManifest", "skills", ...HOST_AXES] as const;
export type InvocationAxis = typeof INVOCATION_AXES[number];
export type HostAxis = typeof HOST_AXES[number];

export interface SdkIdentity { readonly name: string; readonly version: string }
export interface SkillDigest { readonly path: string; readonly sha256: string }
/**
 * What the host can state about the logical invocation. A null or blank value is an axis the host could not
 * observe: it is recorded as missing and disallows replay, never defaulted. Strings are digests or opaque host ids.
 */
export interface HostIdentityInput {
  /** Canonical authorized workspace realpath. */
  readonly workspaceRealpath?: string | null | undefined;
  /** SHA-256 of the effective task text. */
  readonly taskSha256?: string | null | undefined;
  /** Principal and session the invocation ran as. */
  readonly principal?: string | null | undefined;
  /** The Pi invocation id that logically owns this run. */
  readonly piInvocationId?: string | null | undefined;
  /** SHA-256 of the entrypoint descriptor file bytes. */
  readonly descriptorSha256?: string | null | undefined;
  /** SHA-256 of the installed package tarball. */
  readonly tarballSha256?: string | null | undefined;
  /** Context profile id the compiled context came from. */
  readonly contextProfile?: string | null | undefined;
  /** Evidence profile id the run is judged under. */
  readonly evidenceProfile?: string | null | undefined;
  /** Selected native gate parameters (method, completeness requirement, executable). */
  readonly gateParameters?: unknown | undefined;
}
/** The recorded host block: every key present, an unobserved one null. */
export interface HostIdentity {
  readonly workspaceRealpath: string | null;
  readonly taskSha256: string | null;
  readonly principal: string | null;
  readonly piInvocationId: string | null;
  readonly descriptorSha256: string | null;
  readonly tarballSha256: string | null;
  readonly contextProfile: string | null;
  readonly evidenceProfile: string | null;
  readonly gateParameters: unknown;
}
export interface InvocationIdentityInput {
  /** The clean Git basis observed before the agent dispatched. */
  readonly source: { readonly commit: string; readonly tree: string };
  /** The installed SDK identity read from its manifest bytes; null when no manifest could be read. */
  readonly sdk: SdkIdentity | null;
  readonly promptSha256: string;
  readonly settingsSha256: string;
  readonly gateManifestSha256: string;
  /** Host-named instruction files in the order the host named them; empty by default. */
  readonly skills: readonly SkillDigest[];
  /** Cross-host axes; absent means every one of them is missing. */
  readonly host?: HostIdentityInput;
}
export interface InvocationIdentity extends Omit<InvocationIdentityInput, "host"> {
  readonly schema: typeof INVOCATION_IDENTITY_SCHEMA;
  readonly host: HostIdentity;
  /** Per-axis SHA-256 of the canonical serialization of that axis, so a mismatch can be named. */
  readonly axes: Readonly<Record<InvocationAxis, string>>;
  /** SHA-256 of the canonical preimage {schema, axes}. */
  readonly identitySha256: string;
  readonly complete: boolean;
  readonly missingAxes: readonly InvocationAxis[];
}

const sha256 = (data: string | Buffer): string => createHash("sha256").update(data).digest("hex");

/** Sorted-key, whitespace-free JSON with no locale, path or time input; arrays keep their order. */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return "{" + entries.map(([k, v]) => JSON.stringify(k) + ":" + canonicalJson(v)).join(",") + "}";
  }
  throw new Error("INVOCATION_IDENTITY_NOT_CANONICAL: " + typeof value + " has no canonical byte form");
}

/** SHA-256 of the canonical serialization of the effective agent configuration. */
export function settingsSha256(configuration: unknown): string {
  return sha256(canonicalJson(configuration));
}

/** Semantic Versioning 2.0.0 core, optional prerelease and optional build metadata, with no leading or trailing text. */
const SEMANTIC_VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/;

/** Reads the SDK identity from the installed package manifest bytes; never a literal. */
export function readSdkIdentity(manifestText: string): SdkIdentity {
  let parsed: unknown;
  try { parsed = JSON.parse(manifestText); } catch { parsed = null; }
  const record = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : null;
  const name = record?.["name"];
  const version = record?.["version"];
  if (name !== CLAUDE_AGENT_SDK_NAME || typeof version !== "string" || version.trim() === "") {
    throw new Error("CLAUDE_AGENT_SDK_MANIFEST_INVALID: the installed manifest names no " + CLAUDE_AGENT_SDK_NAME + " package with a version");
  }
  // EAT-R032: the recorded version is a semantic version read from the manifest, so a tag, range or partial version is no identity.
  if (!SEMANTIC_VERSION.test(version)) {
    throw new Error("CLAUDE_AGENT_SDK_MANIFEST_INVALID: the installed manifest version " + JSON.stringify(version) + " is not a semantic version");
  }
  return { name, version };
}

const present = (value: string | null | undefined): string | null =>
  typeof value === "string" && value.trim() !== "" ? value : null;
const presentJson = (value: unknown): unknown =>
  value === undefined || value === null || (typeof value === "string" && value.trim() === "") ? null : value;

function hostBlock(input: HostIdentityInput | undefined): HostIdentity {
  return {
    workspaceRealpath: present(input?.workspaceRealpath), taskSha256: present(input?.taskSha256), principal: present(input?.principal),
    piInvocationId: present(input?.piInvocationId), descriptorSha256: present(input?.descriptorSha256), tarballSha256: present(input?.tarballSha256),
    contextProfile: present(input?.contextProfile), evidenceProfile: present(input?.evidenceProfile), gateParameters: presentJson(input?.gateParameters),
  };
}

function missingOf(input: { readonly sdk: SdkIdentity | null; readonly host?: HostIdentityInput | undefined }): InvocationAxis[] {
  const host = hostBlock(input.host);
  const out: InvocationAxis[] = input.sdk === null ? ["sdk"] : [];
  if (host.workspaceRealpath === null) out.push("workspace");
  if (host.taskSha256 === null) out.push("task");
  if (host.principal === null) out.push("principal");
  if (host.piInvocationId === null) out.push("piInvocation");
  if (host.descriptorSha256 === null) out.push("descriptor");
  if (host.tarballSha256 === null) out.push("tarball");
  if (host.contextProfile === null) out.push("contextProfile");
  if (host.evidenceProfile === null) out.push("evidenceProfile");
  if (host.gateParameters === null) out.push("gateParameters");
  return out;
}

function axisDigests(input: { readonly source: InvocationIdentityInput["source"]; readonly sdk: SdkIdentity | null; readonly promptSha256: string;
    readonly settingsSha256: string; readonly gateManifestSha256: string; readonly skills: readonly SkillDigest[]; readonly host?: HostIdentityInput | undefined }): Record<InvocationAxis, string> {
  const host = hostBlock(input.host);
  return {
    source: sha256(canonicalJson({ commit: input.source.commit, tree: input.source.tree })),
    sdk: sha256(canonicalJson(input.sdk === null ? null : { name: input.sdk.name, version: input.sdk.version })),
    prompt: sha256(canonicalJson(input.promptSha256)),
    settings: sha256(canonicalJson(input.settingsSha256)),
    gateManifest: sha256(canonicalJson(input.gateManifestSha256)),
    skills: sha256(canonicalJson(input.skills.map(s => ({ path: s.path, sha256: s.sha256 })))),
    workspace: sha256(canonicalJson(host.workspaceRealpath)),
    task: sha256(canonicalJson(host.taskSha256)),
    principal: sha256(canonicalJson(host.principal)),
    piInvocation: sha256(canonicalJson(host.piInvocationId)),
    descriptor: sha256(canonicalJson(host.descriptorSha256)),
    tarball: sha256(canonicalJson(host.tarballSha256)),
    contextProfile: sha256(canonicalJson(host.contextProfile)),
    evidenceProfile: sha256(canonicalJson(host.evidenceProfile)),
    gateParameters: sha256(canonicalJson(host.gateParameters)),
  };
}
const identityDigest = (axes: Record<InvocationAxis, string>): string =>
  sha256(canonicalJson({ schema: INVOCATION_IDENTITY_SCHEMA, axes }));

export function buildInvocationIdentity(input: InvocationIdentityInput): InvocationIdentity {
  const axes = axisDigests(input);
  const missingAxes = missingOf(input);
  return {
    schema: INVOCATION_IDENTITY_SCHEMA,
    source: { commit: input.source.commit, tree: input.source.tree },
    sdk: input.sdk === null ? null : { name: input.sdk.name, version: input.sdk.version },
    promptSha256: input.promptSha256,
    settingsSha256: input.settingsSha256,
    gateManifestSha256: input.gateManifestSha256,
    skills: input.skills.map(s => ({ path: s.path, sha256: s.sha256 })),
    host: hostBlock(input.host),
    axes,
    identitySha256: identityDigest(axes),
    complete: missingAxes.length === 0,
    missingAxes,
  };
}

/** Thrown when replay or reuse is requested for an identity with a missing axis (EAT-R012). */
export class InvocationReplayRefusedError extends Error {
  readonly code = "INVOCATION_REPLAY_AXIS_MISSING";
  readonly axes: readonly InvocationAxis[];
  constructor(axes: readonly InvocationAxis[]) {
    super("INVOCATION_REPLAY_AXIS_MISSING: replay is refused; the invocation identity lacks the axis " + axes.join(", "));
    this.name = "InvocationReplayRefusedError";
    this.axes = axes;
  }
}

/** Refuses replay unless every axis is present, recomputed from the recorded inputs so a forged completeness flag does not help. */
export function assertReplayable(record: InvocationIdentity): void {
  const missing = missingOf(record);
  if (missing.length > 0) throw new InvocationReplayRefusedError(missing);
}

/** The cross-host axes the host itself cannot observe from `host`, in axis order (preflight check for a replay request). */
export function missingHostAxes(host: HostIdentityInput | undefined): HostAxis[] {
  return missingOf({ sdk: { name: "", version: "" }, host }).filter((a): a is HostAxis => (HOST_AXES as readonly string[]).includes(a));
}

/** The axes whose digests differ between two records, in axis order. */
export function differingAxes(a: InvocationIdentity, b: InvocationIdentity): InvocationAxis[] {
  return INVOCATION_AXES.filter(axis => a.axes[axis] !== b.axes[axis]);
}

/** Recomputes every digest from the recorded inputs; returns the axis names (then "identity") that disagree. */
export function verifyInvocationIdentity(record: InvocationIdentity): Array<InvocationAxis | "identity"> {
  const fresh = axisDigests(record);
  const bad: Array<InvocationAxis | "identity"> = INVOCATION_AXES.filter(axis => record.axes?.[axis] !== fresh[axis]);
  if (record.identitySha256 !== identityDigest(fresh)) bad.push("identity");
  return bad;
}

/** Hashes the bytes of host-named instruction files under `root`, in the supplied order. */
export function hashSkillFiles(root: string, paths: readonly string[]): SkillDigest[] {
  const rootReal = realpathSync(root);
  const seen = new Set<string>();
  return paths.map(raw => {
    if (typeof raw !== "string" || raw.trim() === "" || raw.includes("\0") || raw.includes("\\") || raw.startsWith("/") ||
        raw.split("/").includes("..")) {
      throw new Error("INVOCATION_IDENTITY_SKILL_PATH_INVALID: " + JSON.stringify(raw) + " is not a relative path inside the workspace");
    }
    const path = posix.normalize(raw);
    if (seen.has(path)) throw new Error("INVOCATION_IDENTITY_SKILL_DUPLICATE: " + path + " is named twice");
    seen.add(path);
    const full = join(root, path);
    let bytes: Buffer;
    try {
      if (!lstatSync(full).isFile()) throw new Error("not a regular file");
      const real = realpathSync(full);
      if (!real.startsWith(rootReal + sep)) throw new Error("outside the workspace");
      bytes = readFileSync(full);
    } catch (error) {
      throw new Error("INVOCATION_IDENTITY_SKILL_UNREADABLE: " + path + " (" + (error instanceof Error ? error.message : String(error)) + ")");
    }
    return { path, sha256: sha256(bytes) };
  });
}
