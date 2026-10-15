/** Immutable implementation and caller basis for one logical Workbench invocation.
 * Native execution IDs are deliberately not manufactured here: they belong to
 * their owning providers and are attached to observations/results separately.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";

export type IdentityJson = null | boolean | number | string | IdentityJson[] | { [key: string]: IdentityJson };
/** The one definition schema literal every Workbench host emits for a workflow script; receipts of another schema are refused, never coerced. */
export const WORKFLOW_SCRIPT_SCHEMA_VERSION = "workflow-script/v1";
export interface DefinitionRef {
  readonly kind: "script" | "function" | "furnace-formula";
  readonly id: string;
  readonly schemaVersion: string;
  readonly artifactDigest: string;
}
export interface InvocationIdentity {
  readonly logicalInvocationId: string;
  readonly definition: DefinitionRef;
  readonly deploymentDigest: string;
  readonly parentInvocationId?: string;
  readonly subjectBasis: string;
}
export interface NativeRef {
  readonly provider: string;
  readonly type: string;
  readonly id: string;
  readonly scope?: string;
}
export interface ProviderContract {
  readonly id: string;
  readonly version: string;
  readonly contractSource: string;
  readonly inputSchema: IdentityJson;
  readonly outputSchema?: IdentityJson;
  readonly permissions?: readonly string[];
  readonly effectClass?: string;
  readonly supportedModes?: readonly string[];
}
export interface IdentityCaptureInput {
  readonly definition: Pick<DefinitionRef, "kind" | "id" | "schemaVersion">;
  readonly scriptPath: string;
  readonly packageRoot: string;
  /** Actual trusted host implementation files, scoped to packageRoot (not executable names). */
  readonly hostArtifacts: readonly string[];
  /** Resolved absolute runtime dependency files, including hoisted SDK modules. */
  readonly runtimeArtifacts: readonly string[];
  readonly logicalInvocationId: string;
  readonly parentInvocationId?: string;
  /** Values are supplied by an authenticated host, never by the workflow script. */
  readonly principal: { readonly issuer: string; readonly subject: string };
  /** Path is a scope locator; sourceBasis must be independently measured by its authority. */
  readonly workspace: { readonly path: string; readonly sourceBasis: string };
  readonly effectiveConfig: IdentityJson;
  readonly hostAbi: {
    readonly runtime: string;
    readonly version: string;
    readonly platform: string;
    readonly arch: string;
    readonly interfaceVersion: string;
  };
  readonly providerDescriptors: readonly ProviderContract[];
}
export interface PinnedArtifact {
  readonly path: string;
  readonly digest: string;
}
export interface InvocationSnapshot {
  readonly identity: InvocationIdentity;
  readonly scriptDigest: string;
  readonly dependencyDigest: string;
  readonly hostImplementationDigest: string;
  readonly hostArtifacts: readonly PinnedArtifact[];
  readonly runtimeArtifacts: readonly PinnedArtifact[];
  readonly runtimeArtifactDigest: string;
  readonly configurationDigest: string;
  readonly hostAbiDigest: string;
  readonly providerContractDigest: string;
  readonly dependencyArtifacts: readonly PinnedArtifact[];
  /** Exact script bytes observed when this snapshot was minted, for the interpreter to load. */
  readonly scriptSource: string;
}

export class IdentityConflictError extends Error {
  readonly code = "IDENTITY_CONFLICT";
  constructor(message: string) {
    super(message);
    this.name = "IdentityConflictError";
  }
}

function required(value: string, name: string): string {
  if (typeof value !== "string" || !value.trim() || /[\u0000-\u001f]/.test(value)) {
    throw new IdentityConflictError(`Missing or invalid ${name}; invocation identity cannot be established.`);
  }
  return value;
}

/** Strict canonical JSON: sorted object keys, preserved array order, no lossy values. */
export function canonicalJson(value: unknown): string {
  const ancestors = new Set<unknown>();
  function encode(item: unknown, depth: number): string {
    if (depth > 64) throw new IdentityConflictError("Identity JSON exceeds maximum nesting depth.");
    if (item === null || typeof item === "boolean" || typeof item === "string") return JSON.stringify(item);
    if (typeof item === "number" && Number.isFinite(item)) return JSON.stringify(item);
    if (typeof item !== "object") throw new IdentityConflictError("Identity input must be lossless JSON.");
    if (ancestors.has(item)) throw new IdentityConflictError("Cyclic identity input is not JSON.");
    const prototype = Object.getPrototypeOf(item);
    if (!Array.isArray(item) && prototype !== Object.prototype && prototype !== null) {
      throw new IdentityConflictError("Identity input must be a plain JSON object.");
    }
    ancestors.add(item);
    try {
      if (Array.isArray(item)) {
        const keys = Reflect.ownKeys(item).filter(key => key !== "length");
        if (keys.length !== item.length) throw new IdentityConflictError("Sparse or extended JSON array.");
        const values: string[] = [];
        for (let index = 0; index < item.length; index++) {
          const descriptor = Object.getOwnPropertyDescriptor(item, String(index));
          if (!descriptor || !Object.hasOwn(descriptor, "value") || !descriptor.enumerable) {
            throw new IdentityConflictError("Identity array requires ordinary enumerable values.");
          }
          values.push(encode(descriptor.value, depth + 1));
        }
        return `[${values.join(",")}]`;
      }
      const record = item as Record<string, unknown>;
      if (Reflect.ownKeys(record).length !== Object.keys(record).length) {
        throw new IdentityConflictError("Identity object has hidden or symbol keys.");
      }
      const fields = Object.keys(record).sort().map(key => {
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          throw new IdentityConflictError("Prototype-related identity key is forbidden.");
        }
        const descriptor = Object.getOwnPropertyDescriptor(record, key);
        if (!descriptor || !Object.hasOwn(descriptor, "value")) throw new IdentityConflictError("Identity input cannot contain accessors.");
        return `${JSON.stringify(key)}:${encode(descriptor.value, depth + 1)}`;
      });
      return `{${fields.join(",")}}`;
    } finally {
      ancestors.delete(item);
    }
  }
  const serialized = encode(value, 0);
  if (Buffer.byteLength(serialized, "utf8") > 1024 * 1024) throw new IdentityConflictError("Identity JSON exceeds 1 MiB.");
  return serialized;
}

/** Versioned, domain-separated canonical JSON SHA-256; artifact bytes use direct SHA-256. */
export function identityDigest(domain: string, value: unknown): string {
  required(domain, "digest domain");
  return `sha256:${createHash("sha256").update(`workbench.identity/v1\u0000${domain}\u0000${canonicalJson(value)}`, "utf8").digest("hex")}`;
}
function fileDigest(path: string): string {
  return `sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}`;
}
function jsonFile(path: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new IdentityConflictError(`Expected JSON object: ${path}`);
  canonicalJson(parsed);
  return parsed as Record<string, unknown>;
}
function entries(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new IdentityConflictError(`Missing or invalid ${name}.`);
  return value as Record<string, unknown>;
}
function localArtifact(root: string, input: string): string {
  const target = realpathSync(resolve(root, input));
  const rel = relative(realpathSync(root), target);
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new IdentityConflictError("Package artifact escapes package root.");
  }
  return target;
}
function dependencies(root: string): { digest: string; artifacts: PinnedArtifact[] } {
  const manifestPath = localArtifact(root, "package.json");
  // npm deliberately omits package-lock.json from packed distributions. The
  // shipped copy is an exact lock snapshot under vendor/, not a synthesized graph.
  const lockRelative = existsSync(resolve(root, "package-lock.json")) ? "package-lock.json" : "vendor/dependency-lock.json";
  const lockPath = localArtifact(root, lockRelative);
  const manifest = jsonFile(manifestPath);
  const lock = jsonFile(lockPath);
  const packages = entries(lock.packages, "package-lock packages");
  const lockRoot = entries(packages[""], "package-lock root entry");
  if (lock.lockfileVersion !== 3 || manifest.name !== lock.name || manifest.version !== lock.version || Object.keys(packages).length < 2) {
    throw new IdentityConflictError("Package manifest and lockfile do not identify the same resolved package.");
  }
  for (const section of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    if (canonicalJson(manifest[section] ?? {}) !== canonicalJson(lockRoot[section] ?? {})) {
      throw new IdentityConflictError(`Package manifest and lockfile disagree on ${section}.`);
    }
  }
  const artifacts: PinnedArtifact[] = [
    { path: "package.json", digest: fileDigest(manifestPath) },
    { path: lockRelative, digest: fileDigest(lockPath) },
  ];
  for (const [name, rawEntry] of Object.entries(packages)) {
    if (!name) continue;
    const entry = entries(rawEntry, `lock entry ${name}`);
    if (entry.link === true) throw new IdentityConflictError(`Unpinned linked dependency: ${name}.`);
    const resolved = required(entry.resolved as string, `resolved artifact ${name}`);
    const integrity = required(entry.integrity as string, `integrity ${name}`);
    if (!/^sha(256|384|512)-[A-Za-z0-9+/]+={0,2}$/.test(integrity)) {
      throw new IdentityConflictError(`Unsupported integrity for ${name}.`);
    }
    if (resolved.startsWith("file:")) {
      const rel = resolved.slice(5);
      if (!rel || isAbsolute(rel)) throw new IdentityConflictError(`Invalid local package artifact: ${name}.`);
      const path = localArtifact(root, rel);
      const algorithm = integrity.slice(0, integrity.indexOf("-"));
      const actual = createHash(algorithm).update(readFileSync(path)).digest("base64");
      if (`${algorithm}-${actual}` !== integrity) throw new IdentityConflictError(`Local package artifact integrity mismatch: ${name}.`);
      artifacts.push({ path: rel, digest: fileDigest(path) });
    }
  }
  artifacts.sort((left, right) => left.path < right.path ? -1 : left.path > right.path ? 1 : 0);
  return { artifacts, digest: identityDigest("dependencies", { artifacts, lockPackages: packages }) };
}

/** Capture the bytes and effective host inputs before loading the workflow script. */
export function captureInvocationIdentity(input: IdentityCaptureInput): InvocationSnapshot {
  try {
    const { definition, principal, workspace, hostAbi } = input;
    if (!["script", "function", "furnace-formula"].includes(definition.kind)) throw new IdentityConflictError("Unknown definition kind.");
    required(definition.id, "definition id");
    required(definition.schemaVersion, "definition schema version");
    required(input.logicalInvocationId, "logical invocation id");
    if (input.parentInvocationId !== undefined) required(input.parentInvocationId, "parent invocation id");
    required(principal.issuer, "principal issuer");
    required(principal.subject, "principal subject");
    required(workspace.path, "workspace scope path");
    required(workspace.sourceBasis, "verified workspace source basis");
    for (const [key, value] of Object.entries(hostAbi)) required(value, `host ABI ${key}`);
    const providerIds = new Set<string>();
    for (const descriptor of input.providerDescriptors) {
      required(descriptor.id, "provider id");
      required(descriptor.version, "provider version");
      required(descriptor.contractSource, "provider contract source");
      canonicalJson(descriptor.inputSchema);
      if (providerIds.has(descriptor.id)) throw new IdentityConflictError(`Duplicate provider contract: ${descriptor.id}.`);
      providerIds.add(descriptor.id);
    }
    if (!Array.isArray(input.hostArtifacts) || input.hostArtifacts.length === 0 || input.hostArtifacts.length > 256) {
      throw new IdentityConflictError("Trusted host implementation artifacts must be declared.");
    }
    let hostBytes = 0;
    const hostArtifacts = input.hostArtifacts.map(path => {
      const absolute = localArtifact(input.packageRoot, path);
      const stats = statSync(absolute);
      if (!stats.isFile()) throw new IdentityConflictError("Host implementation artifact must be a regular file.");
      hostBytes += stats.size;
      if (hostBytes > 64 * 1024 * 1024) throw new IdentityConflictError("Host implementation files exceed 64 MiB identity budget.");
      return { path: relative(realpathSync(input.packageRoot), absolute).split(sep).join("/"), digest: fileDigest(absolute) };
    }).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
    if (new Set(hostArtifacts.map(artifact => artifact.path)).size !== hostArtifacts.length) {
      throw new IdentityConflictError("Duplicate host implementation artifact.");
    }
    const hostImplementationDigest = identityDigest("host-implementation", hostArtifacts);
    if (!Array.isArray(input.runtimeArtifacts) || input.runtimeArtifacts.length === 0 || input.runtimeArtifacts.length > 4096) {
      throw new IdentityConflictError("Resolved runtime SDK artifacts must be explicitly supplied (1-4096 files).");
    }
    let runtimeBytes = 0;
    const runtimeArtifacts = input.runtimeArtifacts.map(path => {
      if (!isAbsolute(path)) throw new IdentityConflictError("Runtime SDK artifact must be an absolute resolved path.");
      const absolute = realpathSync(path);
      const stats = statSync(absolute);
      if (!stats.isFile()) throw new IdentityConflictError("Runtime SDK artifact must be a regular file.");
      runtimeBytes += stats.size;
      if (runtimeBytes > 64 * 1024 * 1024) throw new IdentityConflictError("Resolved SDK artifacts exceed 64 MiB identity budget.");
      return { path: absolute, digest: fileDigest(absolute) };
    }).sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
    if (new Set(runtimeArtifacts.map(item => item.path)).size !== runtimeArtifacts.length) {
      throw new IdentityConflictError("Duplicate runtime SDK artifact.");
    }
    const runtimeArtifactDigest = identityDigest("runtime-artifacts", runtimeArtifacts);
    const scriptBytes = readFileSync(input.scriptPath);
    if (scriptBytes.length > 1024 * 1024) throw new IdentityConflictError("Workflow script exceeds 1 MiB snapshot limit.");
    const scriptDigest = `sha256:${createHash("sha256").update(scriptBytes).digest("hex")}`;
    const scriptSource = scriptBytes.toString("utf8");
    if (!Buffer.from(scriptSource, "utf8").equals(scriptBytes)) {
      throw new IdentityConflictError("Workflow script must be valid UTF-8.");
    }
    const { digest: dependencyDigest, artifacts: dependencyArtifacts } = dependencies(input.packageRoot);
    const configurationDigest = identityDigest("configuration", input.effectiveConfig);
    const hostAbiDigest = identityDigest("host-abi", hostAbi);
    const providerContractDigest = identityDigest("provider-contracts", [...input.providerDescriptors].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    const definitionRef: DefinitionRef = Object.freeze({ ...definition, artifactDigest: scriptDigest });
    const deploymentDigest = identityDigest("deployment", { definition: definitionRef, dependencyDigest, hostImplementationDigest, runtimeArtifactDigest, configurationDigest, hostAbiDigest, providerContractDigest });
    const subjectBasis = identityDigest("subject-basis", { principal, workspace: { scope: realpathSync(workspace.path), sourceBasis: workspace.sourceBasis } });
    const identity: InvocationIdentity = Object.freeze({
      logicalInvocationId: input.logicalInvocationId,
      definition: definitionRef,
      deploymentDigest,
      ...(input.parentInvocationId ? { parentInvocationId: input.parentInvocationId } : {}),
      subjectBasis,
    });
    return Object.freeze({ identity, scriptDigest, scriptSource, dependencyDigest, hostImplementationDigest, hostArtifacts: Object.freeze(hostArtifacts.map(artifact => Object.freeze(artifact))),
      runtimeArtifactDigest, runtimeArtifacts: Object.freeze(runtimeArtifacts.map(artifact => Object.freeze(artifact))), configurationDigest, hostAbiDigest, providerContractDigest,
      dependencyArtifacts: Object.freeze(dependencyArtifacts.map(artifact => Object.freeze(artifact))) });
  } catch (error) {
    if (error instanceof IdentityConflictError) throw error;
    throw new IdentityConflictError(`Cannot capture invocation basis: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/** Re-observe actual files and authenticated host basis before retry/resume/effect. */
export function verifyInvocationIdentity(snapshot: InvocationSnapshot, current: IdentityCaptureInput): InvocationIdentity {
  const observed = captureInvocationIdentity(current);
  if (canonicalJson(snapshot) !== canonicalJson(observed)) {
    throw new IdentityConflictError("Logical invocation basis changed: definition, artifacts, configuration, ABI, provider contract, principal or workspace source no longer matches its pinned snapshot.");
  }
  return snapshot.identity;
}
