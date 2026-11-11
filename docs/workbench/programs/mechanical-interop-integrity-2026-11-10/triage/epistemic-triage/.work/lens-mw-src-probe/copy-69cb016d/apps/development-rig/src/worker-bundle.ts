/**
 * WP-O remote worker bundle (docs/09 WP-O remainder; carried by f3a).
 *
 * A worker deploys as a role-specific bundle of Forge-packaged npm tarballs with a pinned
 * digest manifest, a named node binary binding and a named entry module. The bundle judge
 * refuses a missing pinned role, an artifact whose observed digest is not the pinned one,
 * an unpinned or blank digest, a provider dependency outside the role allowlist, and an
 * install witness that saw a repository checkout: the worker must boot from tarballs alone.
 * The judge is pure; building tarballs and the offline boot smoke belong to the harness.
 */

export const BUNDLE_ROLES: readonly string[] = Object.freeze([
  "workflows-coordination",
  "workflows-development",
  "worker-entry",
]);

/** The only runtime provider the worker role may carry; everything else is unused weight. */
export const WORKER_PROVIDER_ALLOWLIST: readonly string[] = Object.freeze(["@forge/sdk"]);

export type BundleRefusalCode =
  | "BUNDLE_ROLE_MISSING"
  | "BUNDLE_ROLE_UNKNOWN"
  | "BUNDLE_DIGEST_UNPINNED"
  | "BUNDLE_DIGEST_MISMATCH"
  | "BUNDLE_PROVIDER_FORBIDDEN"
  | "BUNDLE_BINDING_BLANK"
  | "BUNDLE_CHECKOUT_PRESENT";

export interface BundleRefusal {
  readonly code: BundleRefusalCode;
  readonly detail: string;
}

export interface BundleArtifact {
  readonly role: string;
  readonly tarball: string;
  readonly pinnedDigest: string;
  readonly observedDigest: string;
  readonly runtimeDependencies: readonly string[];
}

export interface WorkerBindings {
  readonly nodeBinary: string;
  readonly entryModule: string;
}

export interface InstallWitness {
  readonly installDir: string;
  readonly sawRepositoryCheckout: boolean;
}

export interface WorkerBundleInput {
  readonly artifacts: readonly BundleArtifact[];
  readonly bindings: WorkerBindings;
  readonly install: InstallWitness;
}

export interface WorkerBundleJudgement {
  readonly schema: "mw.worker-bundle.v0";
  readonly ok: boolean;
  readonly rolesJudged: readonly string[];
  readonly refusals: readonly BundleRefusal[];
}

const blank = (value: string): boolean => value.trim() === "";
const DIGEST_SHAPE = /^sha256:[0-9a-f]{64}$/;

/** Judge one worker bundle against the WP-O bar; seal frozen or refuse with every bar named. */
export function judgeWorkerBundle(input: WorkerBundleInput): WorkerBundleJudgement {
  const refusals: BundleRefusal[] = [];
  const seen = new Set<string>();
  for (const artifact of input.artifacts) {
    if (!BUNDLE_ROLES.includes(artifact.role)) {
      refusals.push({ code: "BUNDLE_ROLE_UNKNOWN", detail: `artifact role ${artifact.role} is not a pinned worker role` });
      continue;
    }
    seen.add(artifact.role);
    if (!DIGEST_SHAPE.test(artifact.pinnedDigest)) {
      refusals.push({ code: "BUNDLE_DIGEST_UNPINNED", detail: `${artifact.role} carries no pinned sha256 digest` });
    } else if (artifact.observedDigest !== artifact.pinnedDigest) {
      refusals.push({ code: "BUNDLE_DIGEST_MISMATCH", detail: `${artifact.role} observed ${artifact.observedDigest.slice(0, 20)}... is not the pinned digest` });
    }
    for (const dependency of artifact.runtimeDependencies) {
      const internal = dependency.startsWith("@mechanical/");
      if (!internal && !WORKER_PROVIDER_ALLOWLIST.includes(dependency)) {
        refusals.push({ code: "BUNDLE_PROVIDER_FORBIDDEN", detail: `${artifact.role} carries runtime dependency ${dependency}; the worker ships no unused providers` });
      }
    }
  }
  for (const role of BUNDLE_ROLES) {
    if (!seen.has(role)) refusals.push({ code: "BUNDLE_ROLE_MISSING", detail: `pinned role ${role} has no artifact` });
  }
  if (blank(input.bindings.nodeBinary) || blank(input.bindings.entryModule)) {
    refusals.push({ code: "BUNDLE_BINDING_BLANK", detail: "the worker bindings name a node binary and an entry module" });
  }
  if (input.install.sawRepositoryCheckout) {
    refusals.push({ code: "BUNDLE_CHECKOUT_PRESENT", detail: `the install at ${input.install.installDir} saw a repository checkout; the worker boots from tarballs alone` });
  }
  return Object.freeze({
    schema: "mw.worker-bundle.v0",
    ok: refusals.length === 0,
    rolesJudged: Object.freeze([...seen].sort()),
    refusals: Object.freeze(refusals.map((r) => Object.freeze(r))),
  });
}
