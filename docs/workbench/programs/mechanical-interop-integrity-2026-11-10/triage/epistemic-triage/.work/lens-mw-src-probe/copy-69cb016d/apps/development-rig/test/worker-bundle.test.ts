// MechanicalWorkflows-f3a (WP-O remainder): the remote worker bundle judgement. Fixture
// manifests exercise the JUDGE (pinned roles, digest pins, provider allowlist, bindings,
// absence-of-checkout); building real tarballs and the offline boot smoke stay in the
// harness (qa/integration/container-worker.sh is the single-library prior art).
import test from "node:test";
import assert from "node:assert/strict";
import { BUNDLE_ROLES, WORKER_PROVIDER_ALLOWLIST, judgeWorkerBundle, type BundleArtifact, type WorkerBundleInput } from "../dist/worker-bundle.js";

const digest = (seed: string): string => `sha256:${seed.repeat(64).slice(0, 64)}`;

const artifact = (role: string, extra?: Partial<BundleArtifact>): BundleArtifact => ({
  role,
  tarball: `${role}.tgz`,
  pinnedDigest: digest("a"),
  observedDigest: digest("a"),
  runtimeDependencies: role === "worker-entry" ? ["@mechanical/workflows-coordination", "@forge/sdk"] : [],
  ...extra,
});

const greenInput = (): WorkerBundleInput => ({
  artifacts: BUNDLE_ROLES.map((role) => artifact(role)),
  bindings: { nodeBinary: "/usr/local/bin/node", entryModule: "worker/entry.js" },
  install: { installDir: "/opt/worker", sawRepositoryCheckout: false },
});

test("a full pinned-digest bundle with clean bindings and a checkout-free install judges green", () => {
  assert.deepEqual([...BUNDLE_ROLES], ["workflows-coordination", "workflows-development", "worker-entry"]);
  const out = judgeWorkerBundle(greenInput());
  assert.deepEqual(out.refusals, []);
  assert.equal(out.ok, true);
  assert.deepEqual([...out.rolesJudged], [...BUNDLE_ROLES].sort());
  assert.ok(Object.isFrozen(out) && Object.isFrozen(out.rolesJudged));
});

test("negative: a missing pinned role and an unknown role each refuse by name", () => {
  const missing = judgeWorkerBundle({ ...greenInput(), artifacts: greenInput().artifacts.slice(0, 2) });
  assert.ok(missing.refusals.some((r) => r.code === "BUNDLE_ROLE_MISSING" && r.detail.includes("worker-entry")));
  const unknown = judgeWorkerBundle({ ...greenInput(), artifacts: [...greenInput().artifacts, artifact("sidecar-extras")] });
  assert.ok(unknown.refusals.some((r) => r.code === "BUNDLE_ROLE_UNKNOWN" && r.detail.includes("sidecar-extras")));
});

test("negative: an unpinned digest and a digest mismatch each refuse", () => {
  const unpinned = judgeWorkerBundle({ ...greenInput(), artifacts: greenInput().artifacts.map((a, i) => (i === 0 ? { ...a, pinnedDigest: "latest" } : a)) });
  assert.ok(unpinned.refusals.some((r) => r.code === "BUNDLE_DIGEST_UNPINNED"));
  const mismatch = judgeWorkerBundle({ ...greenInput(), artifacts: greenInput().artifacts.map((a, i) => (i === 1 ? { ...a, observedDigest: digest("b") } : a)) });
  assert.ok(mismatch.refusals.some((r) => r.code === "BUNDLE_DIGEST_MISMATCH" && r.detail.includes("workflows-development")));
});

test("negative: a runtime provider outside the allowlist refuses; internal workspace packages pass", () => {
  assert.deepEqual([...WORKER_PROVIDER_ALLOWLIST], ["@forge/sdk"]);
  const foreign = judgeWorkerBundle({ ...greenInput(), artifacts: greenInput().artifacts.map((a) => (a.role === "worker-entry" ? { ...a, runtimeDependencies: [...a.runtimeDependencies, "aws-sdk"] } : a)) });
  assert.ok(foreign.refusals.some((r) => r.code === "BUNDLE_PROVIDER_FORBIDDEN" && r.detail.includes("aws-sdk")));
});

test("negative: blank bindings refuse", () => {
  const blankNode = judgeWorkerBundle({ ...greenInput(), bindings: { nodeBinary: " ", entryModule: "worker/entry.js" } });
  assert.ok(blankNode.refusals.some((r) => r.code === "BUNDLE_BINDING_BLANK"));
  const blankEntry = judgeWorkerBundle({ ...greenInput(), bindings: { nodeBinary: "/bin/node", entryModule: "" } });
  assert.ok(blankEntry.refusals.some((r) => r.code === "BUNDLE_BINDING_BLANK"));
});

test("negative: an install witness that saw a repository checkout refuses: the worker boots from tarballs alone", () => {
  const out = judgeWorkerBundle({ ...greenInput(), install: { installDir: "/opt/worker", sawRepositoryCheckout: true } });
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "BUNDLE_CHECKOUT_PRESENT"));
});
