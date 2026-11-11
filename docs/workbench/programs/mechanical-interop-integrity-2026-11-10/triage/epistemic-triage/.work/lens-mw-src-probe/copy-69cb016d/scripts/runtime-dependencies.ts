import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

// No-new-runtime-dependency detector. A runtime dependency is any package.json entry under dependencies,
// optionalDependencies, peerDependencies or bundleDependencies; devDependencies are build-time only. Python ruling:
// the repository holds no Python dependency manifest (the python-consumer suite runs on the standard library), so
// ANY Python dependency manifest file counts as a new runtime dependency until the baseline names it.
const RUNTIME_SCOPES = ["dependencies", "optionalDependencies", "peerDependencies"] as const;
const BUNDLE_SCOPES = ["bundleDependencies", "bundledDependencies"] as const;
const PYTHON_MANIFEST = /^(?:requirements[^/]*\.txt|constraints[^/]*\.txt|pyproject\.toml|setup\.py|setup\.cfg|Pipfile|Pipfile\.lock|poetry\.lock|uv\.lock)$/;
const SKIPPED_DIRECTORIES = new Set(["node_modules", "dist", ".git"]);

export interface RuntimeDependencySnapshot {
  /** Sorted `manifest|scope|package|range` keys; a bundled name carries the literal range `bundled`. */
  entries: string[];
  /** Sorted repository-relative paths of Python dependency manifest files. */
  pythonManifests: string[];
}
export interface RuntimeDependencyDiff {
  added: string[];
  removed: string[];
  addedPythonManifests: string[];
  removedPythonManifests: string[];
}

function walk(root: string, dir: string, out: string[]): void {
  for (const item of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = dir === "" ? item.name : `${dir}/${item.name}`;
    if (item.isDirectory()) { if (!SKIPPED_DIRECTORIES.has(item.name)) walk(root, path, out); }
    else out.push(path);
  }
}

export function collectRuntimeDependencies(root: string): RuntimeDependencySnapshot {
  const files: string[] = [];
  if (existsSync(root)) walk(root, "", files);
  const entries: string[] = [];
  for (const file of files.filter(path => path === "package.json" || path.endsWith("/package.json"))) {
    const manifest = JSON.parse(readFileSync(join(root, file), "utf8")) as Record<string, unknown>;
    for (const scope of RUNTIME_SCOPES) {
      const declared = manifest[scope];
      if (declared === null || typeof declared !== "object") continue;
      for (const [name, range] of Object.entries(declared)) entries.push(`${file}|${scope}|${name}|${String(range)}`);
    }
    for (const scope of BUNDLE_SCOPES) {
      const declared = manifest[scope];
      if (Array.isArray(declared)) for (const name of declared) entries.push(`${file}|${scope}|${String(name)}|bundled`);
    }
  }
  const pythonManifests = files.filter(path => PYTHON_MANIFEST.test(path.slice(path.lastIndexOf("/") + 1)));
  return { entries: entries.sort(), pythonManifests: pythonManifests.sort() };
}

function without(left: readonly string[], right: readonly string[]): string[] {
  const known = new Set(right);
  return left.filter(item => !known.has(item));
}

export function diffRuntimeDependencies(baseline: RuntimeDependencySnapshot, current: RuntimeDependencySnapshot): RuntimeDependencyDiff {
  return {
    added: without(current.entries, baseline.entries),
    removed: without(baseline.entries, current.entries),
    addedPythonManifests: without(current.pythonManifests, baseline.pythonManifests),
    removedPythonManifests: without(baseline.pythonManifests, current.pythonManifests),
  };
}

function describe(entry: string): string {
  const [file, scope, name, range] = entry.split("|");
  return `${file} ${scope} ${name}@${range}`;
}

/** Throws a coded Error on the first violated rule; additions fail first, then a stale baseline. */
export function assertNoNewRuntimeDependency(baseline: RuntimeDependencySnapshot, current: RuntimeDependencySnapshot): void {
  const diff = diffRuntimeDependencies(baseline, current);
  assert.deepEqual(diff.added, [], `RUNTIME_DEPENDENCY_ADDED: ${diff.added.map(describe).join("; ")}`);
  assert.deepEqual(diff.addedPythonManifests, [], `PYTHON_DEPENDENCY_MANIFEST_ADDED: ${diff.addedPythonManifests.join(", ")}`);
  const stale = [...diff.removed.map(describe), ...diff.removedPythonManifests];
  assert.deepEqual(stale, [], `RUNTIME_DEPENDENCY_BASELINE_STALE: ${stale.join("; ")}`);
}
