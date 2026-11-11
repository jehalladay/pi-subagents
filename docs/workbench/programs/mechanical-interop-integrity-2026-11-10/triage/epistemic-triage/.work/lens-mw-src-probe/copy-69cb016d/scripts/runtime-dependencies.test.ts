import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import {
  collectRuntimeDependencies, diffRuntimeDependencies, assertNoNewRuntimeDependency,
  type RuntimeDependencySnapshot,
} from "./runtime-dependencies.ts";

const repoRoot = resolve(import.meta.dirname, "..");
const baselinePath = join(repoRoot, "scripts", "runtime-dependencies.baseline.json");

function fixture<T>(fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-runtime-deps-"));
  try { return fn(root); } finally { rmSync(root, { recursive: true, force: true }); }
}
function put(root: string, file: string, body: string): void {
  const dest = join(root, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, body);
}
const base = (): RuntimeDependencySnapshot => ({ entries: [], pythonManifests: [] });

test("the committed runtime dependency manifests equal the committed baseline snapshot", () => {
  const baseline = JSON.parse(readFileSync(baselinePath, "utf8")) as RuntimeDependencySnapshot;
  const diff = diffRuntimeDependencies(baseline, collectRuntimeDependencies(repoRoot));
  assert.deepEqual(diff, { added: [], removed: [], addedPythonManifests: [], removedPythonManifests: [] });
});

test("an added runtime dependency fails with RUNTIME_DEPENDENCY_ADDED naming the manifest, scope and package", () => fixture(root => {
  put(root, "package.json", JSON.stringify({ name: "demo", dependencies: { left: "1.0.0" } }));
  assert.throws(() => assertNoNewRuntimeDependency(base(), collectRuntimeDependencies(root)),
    /RUNTIME_DEPENDENCY_ADDED: package\.json dependencies left@1\.0\.0/);
}));

test("optional and peer dependencies count as runtime, and a changed range counts as an addition", () => fixture(root => {
  put(root, "packages/a/package.json", JSON.stringify({ optionalDependencies: { opt: "^2" }, peerDependencies: { peer: "*" } }));
  const current = collectRuntimeDependencies(root);
  assert.deepEqual(current.entries, ["packages/a/package.json|optionalDependencies|opt|^2", "packages/a/package.json|peerDependencies|peer|*"]);
  const baseline: RuntimeDependencySnapshot = { entries: ["packages/a/package.json|optionalDependencies|opt|^1"], pythonManifests: [] };
  assert.throws(() => assertNoNewRuntimeDependency(baseline, current), /RUNTIME_DEPENDENCY_ADDED: packages\/a\/package\.json optionalDependencies opt@\^2/);
}));

test("devDependencies are build-time only and do not count as runtime dependencies", () => fixture(root => {
  put(root, "package.json", JSON.stringify({ devDependencies: { typescript: "5.9.3" } }));
  assert.deepEqual(collectRuntimeDependencies(root), base());
  assert.doesNotThrow(() => assertNoNewRuntimeDependency(base(), collectRuntimeDependencies(root)));
}));

test("manifests under node_modules and dist are skipped", () => fixture(root => {
  put(root, "node_modules/x/package.json", JSON.stringify({ dependencies: { deep: "1" } }));
  put(root, "packages/a/dist/package.json", JSON.stringify({ dependencies: { built: "1" } }));
  assert.deepEqual(collectRuntimeDependencies(root), base());
}));

test("bundled dependency names count as runtime entries", () => fixture(root => {
  put(root, "package.json", JSON.stringify({ bundleDependencies: ["inlined"] }));
  assert.deepEqual(collectRuntimeDependencies(root).entries, ["package.json|bundleDependencies|inlined|bundled"]);
}));

test("a Python dependency manifest fails with PYTHON_DEPENDENCY_MANIFEST_ADDED (ruling: any manifest file is runtime)", () => fixture(root => {
  put(root, "qa/integration/python-consumer/requirements.txt", "requests\n");
  put(root, "pyproject.toml", "[project]\nname='x'\n");
  const current = collectRuntimeDependencies(root);
  assert.deepEqual(current.pythonManifests, ["pyproject.toml", "qa/integration/python-consumer/requirements.txt"]);
  assert.throws(() => assertNoNewRuntimeDependency(base(), current),
    /PYTHON_DEPENDENCY_MANIFEST_ADDED: pyproject\.toml, qa\/integration\/python-consumer\/requirements\.txt/);
}));

test("a removed baseline entry reports RUNTIME_DEPENDENCY_BASELINE_STALE so the snapshot never drifts silently", () => fixture(root => {
  put(root, "package.json", JSON.stringify({ name: "demo" }));
  const baseline: RuntimeDependencySnapshot = { entries: ["package.json|dependencies|gone|1"], pythonManifests: [] };
  assert.throws(() => assertNoNewRuntimeDependency(baseline, collectRuntimeDependencies(root)),
    /RUNTIME_DEPENDENCY_BASELINE_STALE: package\.json dependencies gone@1/);
}));

test("an unchanged tree matches its own snapshot", () => fixture(root => {
  put(root, "package.json", JSON.stringify({ dependencies: { same: "1" } }));
  const snapshot = collectRuntimeDependencies(root);
  assert.doesNotThrow(() => assertNoNewRuntimeDependency(snapshot, collectRuntimeDependencies(root)));
}));
