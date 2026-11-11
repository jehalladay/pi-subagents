/**
 * Dependency audit and offline deterministic mode (APO-026, acceptance "package dependency audit"): MW takes no
 * new runtime requirement on Library or remote services, and an offline deterministic run is available.
 * `auditDependencies` judges already-parsed manifests and lock entries: a runtime dependency must be a workspace
 * package, a devDependency must be on the explicit toolchain allowlist, no peer/optional/bundled dependency is
 * admitted, a Library or micro-policy name is refused wherever it appears, and every lock entry must resolve
 * either to a workspace link or to the declared registry — a non-dev install that is not a workspace link is an
 * external runtime requirement. `OFFLINE_DETERMINISTIC_MODE` declares what the coordination core needs from its
 * host (pinned observations, recorded effects, a digest; node:crypto as the only host module) and what it refuses
 * (network, clock, randomness, filesystem, environment, subprocess); `admitOfflineDeterministicRun` admits a run
 * only when its declared capabilities and non-relative imports fit the mode. Pure: nothing here reads a file,
 * resolves a package or installs anything — the caller supplies what it read.
 */

export interface ManifestRecord {
  /** Repository-relative path of the manifest, e.g. "apps/development-rig/package.json". */
  readonly path: string;
  readonly name?: string;
  readonly dependencies?: Readonly<Record<string, string>>;
  readonly devDependencies?: Readonly<Record<string, string>>;
  readonly peerDependencies?: Readonly<Record<string, string>>;
  readonly optionalDependencies?: Readonly<Record<string, string>>;
  readonly bundleDependencies?: readonly string[] | boolean;
  readonly bundledDependencies?: readonly string[] | boolean;
}

export interface LockEntry {
  /** Lock package key, e.g. "node_modules/typescript"; "" is the root, workspace paths carry no resolved source. */
  readonly path: string;
  readonly resolved?: string;
  readonly link?: boolean;
  readonly dev?: boolean;
  readonly optional?: boolean;
}

export interface DependencyAuditInput {
  readonly workspacePackages: readonly string[];
  /** The explicit toolchain allowlist for devDependencies. */
  readonly toolchain: readonly string[];
  /** Registry URL prefix every non-link lock source must start with. */
  readonly registry: string;
  /** Lower-case name fragments refused anywhere (Library, micro-policy). */
  readonly forbidden: readonly string[];
  readonly manifests: readonly ManifestRecord[];
  readonly lock: readonly LockEntry[];
}

export type DependencyRefusalCode =
  | "DEPENDENCY_RUNTIME_EXTERNAL"
  | "DEPENDENCY_LIBRARY_FORBIDDEN"
  | "DEPENDENCY_TOOLCHAIN_UNLISTED"
  | "DEPENDENCY_KIND_UNSUPPORTED"
  | "DEPENDENCY_LOCK_SOURCE_UNTRUSTED"
  | "DEPENDENCY_LOCK_RUNTIME_EXTERNAL";

export interface DependencyRefusal {
  readonly code: DependencyRefusalCode;
  /** Manifest path or lock key the refusal is anchored to. */
  readonly site: string;
  readonly name: string;
  readonly detail: string;
}

export interface DependencyEdge {
  readonly manifest: string;
  readonly name: string;
  readonly range: string;
}

export interface DependencyAudit {
  readonly schema: "mw.dependency-audit.v0";
  readonly ok: boolean;
  /** Workspace-internal runtime dependencies found. */
  readonly runtime: readonly DependencyEdge[];
  /** Allowlisted toolchain dependencies found. */
  readonly toolchain: readonly DependencyEdge[];
  readonly refusals: readonly DependencyRefusal[];
}

const forbiddenFragment = (name: string, forbidden: readonly string[]): string | undefined => {
  const lower = name.toLowerCase();
  return forbidden.find(fragment => fragment.length > 0 && lower.includes(fragment.toLowerCase()));
};

const lockKeyName = (path: string): string => {
  const marker = "node_modules/";
  const at = path.lastIndexOf(marker);
  return at < 0 ? path : path.slice(at + marker.length);
};

export function auditDependencies(input: DependencyAuditInput): DependencyAudit {
  const refusals: DependencyRefusal[] = [];
  const runtime: DependencyEdge[] = [];
  const toolchain: DependencyEdge[] = [];
  const workspace = new Set(input.workspacePackages);
  const allowed = new Set(input.toolchain);

  for (const manifest of input.manifests) {
    const site = manifest.path;
    const everyName = [
      ...Object.keys(manifest.dependencies ?? {}),
      ...Object.keys(manifest.devDependencies ?? {}),
      ...Object.keys(manifest.peerDependencies ?? {}),
      ...Object.keys(manifest.optionalDependencies ?? {}),
    ];
    for (const name of everyName) {
      const fragment = forbiddenFragment(name, input.forbidden);
      if (fragment !== undefined) refusals.push({ code: "DEPENDENCY_LIBRARY_FORBIDDEN", site, name, detail: `${name} in ${site} matches the forbidden fragment "${fragment}"` });
    }
    for (const [name, range] of Object.entries(manifest.dependencies ?? {})) {
      if (workspace.has(name)) runtime.push({ manifest: site, name, range });
      else refusals.push({ code: "DEPENDENCY_RUNTIME_EXTERNAL", site, name, detail: `${name}@${range} in ${site} is a runtime dependency outside the workspace` });
    }
    for (const [name, range] of Object.entries(manifest.devDependencies ?? {})) {
      if (allowed.has(name)) toolchain.push({ manifest: site, name, range });
      else refusals.push({ code: "DEPENDENCY_TOOLCHAIN_UNLISTED", site, name, detail: `${name}@${range} in ${site} is a devDependency outside the toolchain allowlist` });
    }
    for (const name of Object.keys(manifest.peerDependencies ?? {})) {
      refusals.push({ code: "DEPENDENCY_KIND_UNSUPPORTED", site, name, detail: `${name} in ${site} is a peerDependency; only runtime and toolchain kinds are admitted` });
    }
    for (const name of Object.keys(manifest.optionalDependencies ?? {})) {
      refusals.push({ code: "DEPENDENCY_KIND_UNSUPPORTED", site, name, detail: `${name} in ${site} is an optionalDependency; only runtime and toolchain kinds are admitted` });
    }
    const bundled = manifest.bundleDependencies ?? manifest.bundledDependencies;
    if (bundled !== undefined && bundled !== false) {
      const names = Array.isArray(bundled) ? bundled : ["*"];
      for (const name of names) refusals.push({ code: "DEPENDENCY_KIND_UNSUPPORTED", site, name, detail: `${name} in ${site} is a bundled dependency; only runtime and toolchain kinds are admitted` });
    }
  }

  for (const entry of input.lock) {
    if (!entry.path.includes("node_modules/")) continue;
    const name = lockKeyName(entry.path);
    if (entry.link === true) continue;
    if (entry.resolved === undefined || !entry.resolved.startsWith(input.registry)) {
      refusals.push({ code: "DEPENDENCY_LOCK_SOURCE_UNTRUSTED", site: entry.path, name, detail: `${name} resolves to ${entry.resolved ?? "nothing"} rather than the registry ${input.registry}` });
    }
    if (entry.dev !== true) {
      refusals.push({ code: "DEPENDENCY_LOCK_RUNTIME_EXTERNAL", site: entry.path, name, detail: `${name} is installed for runtime and is not a workspace link` });
    }
  }

  return { schema: "mw.dependency-audit.v0", ok: refusals.length === 0, runtime, toolchain, refusals };
}

export type OfflineCapability =
  | "pinned-observations"
  | "recorded-effects"
  | "digest"
  | "network"
  | "clock"
  | "randomness"
  | "filesystem"
  | "process-environment"
  | "subprocess";

export interface OfflineDeterministicMode {
  readonly schema: "mw.offline-deterministic-mode.v0";
  readonly requires: readonly OfflineCapability[];
  readonly refuses: readonly OfflineCapability[];
  /** Non-relative module specifiers the core may import. */
  readonly hostModules: readonly string[];
}

export const OFFLINE_DETERMINISTIC_MODE: Readonly<OfflineDeterministicMode> = Object.freeze({
  schema: "mw.offline-deterministic-mode.v0",
  requires: Object.freeze(["pinned-observations", "recorded-effects", "digest"] as const),
  refuses: Object.freeze(["network", "clock", "randomness", "filesystem", "process-environment", "subprocess"] as const),
  hostModules: Object.freeze(["node:crypto"] as const),
});

export interface ModuleImport {
  readonly file: string;
  readonly specifier: string;
}

export interface OfflineRunDeclaration {
  readonly runId: string;
  /** Capabilities the host declares it will provide; strings, so an unknown word is a refusal rather than a type error. */
  readonly capabilities: readonly string[];
  readonly imports: readonly ModuleImport[];
}

export type OfflineRefusalCode = "OFFLINE_CAPABILITY_REFUSED" | "OFFLINE_CAPABILITY_MISSING" | "OFFLINE_CAPABILITY_UNKNOWN" | "OFFLINE_HOST_MODULE_OUTSIDE_MODE";

export interface OfflineRefusal {
  readonly code: OfflineRefusalCode;
  /** The capability word, or "file:specifier" for an import. */
  readonly subject: string;
  readonly detail: string;
}

export interface OfflineAdmission {
  readonly schema: "mw.offline-admission.v0";
  readonly runId: string;
  readonly admitted: boolean;
  readonly refusals: readonly OfflineRefusal[];
}

export function admitOfflineDeterministicRun(declaration: OfflineRunDeclaration, mode: OfflineDeterministicMode = OFFLINE_DETERMINISTIC_MODE): OfflineAdmission {
  const refusals: OfflineRefusal[] = [];
  const declared = new Set(declaration.capabilities);
  const requires = new Set<string>(mode.requires);
  const refuses = new Set<string>(mode.refuses);
  const hostModules = new Set(mode.hostModules);

  for (const capability of declaration.capabilities) {
    if (refuses.has(capability)) refusals.push({ code: "OFFLINE_CAPABILITY_REFUSED", subject: capability, detail: `${capability} is refused by the offline deterministic mode` });
    else if (!requires.has(capability)) refusals.push({ code: "OFFLINE_CAPABILITY_UNKNOWN", subject: capability, detail: `${capability} is not a capability the offline deterministic mode knows` });
  }
  for (const capability of mode.requires) {
    if (!declared.has(capability)) refusals.push({ code: "OFFLINE_CAPABILITY_MISSING", subject: capability, detail: `${capability} is required by the offline deterministic mode and was not declared` });
  }
  for (const entry of declaration.imports) {
    if (entry.specifier.startsWith(".")) continue;
    if (hostModules.has(entry.specifier)) continue;
    refusals.push({ code: "OFFLINE_HOST_MODULE_OUTSIDE_MODE", subject: `${entry.file}:${entry.specifier}`, detail: `${entry.file} imports ${entry.specifier}, a host module outside the offline deterministic mode` });
  }

  return { schema: "mw.offline-admission.v0", runId: declaration.runId, admitted: refusals.length === 0, refusals };
}
