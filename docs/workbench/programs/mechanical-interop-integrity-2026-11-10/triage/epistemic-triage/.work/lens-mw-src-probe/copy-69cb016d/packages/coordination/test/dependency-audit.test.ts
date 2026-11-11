import { strict as assert } from "node:assert";
import { test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OFFLINE_DETERMINISTIC_MODE, admitOfflineDeterministicRun, auditDependencies } from "../dist/index.js";
import type { DependencyAuditInput, LockEntry, ManifestRecord, OfflineRunDeclaration } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "../../..");
const srcDir = join(here, "../src");

const readJson = (relative: string): Record<string, unknown> => JSON.parse(readFileSync(join(repoRoot, relative), "utf8")) as Record<string, unknown>;

const HOUSE = {
  toolchain: ["typescript", "@types/node"],
  registry: "https://registry.npmjs.org/",
  forbidden: ["library", "micro-policy", "micropolicy"],
} as const;

function realManifests(): ManifestRecord[] {
  const root = readJson("package.json");
  const globs = root.workspaces as string[];
  const paths = ["package.json"];
  for (const glob of globs) {
    const dir = glob.replace(/\/\*$/, "");
    for (const entry of readdirSync(join(repoRoot, dir))) paths.push(`${dir}/${entry}/package.json`);
  }
  return paths.map(path => ({ path, ...(readJson(path) as Omit<ManifestRecord, "path">) }));
}

function realLock(): LockEntry[] {
  const lock = readJson("package-lock.json");
  const packages = lock.packages as Record<string, Record<string, unknown>>;
  return Object.entries(packages).map(([path, entry]) => ({
    path,
    ...(typeof entry.resolved === "string" ? { resolved: entry.resolved } : {}),
    ...(entry.link === true ? { link: true } : {}),
    ...(entry.dev === true ? { dev: true } : {}),
    ...(entry.optional === true ? { optional: true } : {}),
  }));
}

function realImports(): { file: string; specifier: string }[] {
  const out: { file: string; specifier: string }[] = [];
  for (const file of readdirSync(srcDir).filter(name => name.endsWith(".ts"))) {
    const source = readFileSync(join(srcDir, file), "utf8");
    for (const match of source.matchAll(/(?:from|import)\s+"([^"]+)"/g)) out.push({ file, specifier: match[1]! });
  }
  return out;
}

const realInput = (): DependencyAuditInput => {
  const manifests = realManifests();
  return {
    workspacePackages: manifests.filter(m => m.path !== "package.json").map(m => m.name!),
    toolchain: HOUSE.toolchain,
    registry: HOUSE.registry,
    forbidden: HOUSE.forbidden,
    manifests,
    lock: realLock(),
  };
};

const fixtureInput = (overrides: Partial<DependencyAuditInput> = {}): DependencyAuditInput => ({
  workspacePackages: ["@w/core", "@w/rig"],
  toolchain: ["typescript"],
  registry: "https://registry.npmjs.org/",
  forbidden: ["library", "micro-policy"],
  manifests: [
    { path: "package.json", devDependencies: { typescript: "5.9.3" } },
    { path: "packages/core/package.json", name: "@w/core" },
    { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" } },
  ],
  lock: [
    { path: "" },
    { path: "packages/core" },
    { path: "node_modules/@w/core", resolved: "packages/core", link: true },
    { path: "node_modules/typescript", resolved: "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz", dev: true },
  ],
  ...overrides,
});

const codes = (refusals: readonly { code: string }[]): string[] => refusals.map(r => r.code).sort();

test("the real repository passes the dependency audit: runtime dependencies are workspace-internal only, the toolchain is typescript and @types/node, every lock source is the registry or a workspace link", () => {
  const audit = auditDependencies(realInput());
  assert.equal(audit.schema, "mw.dependency-audit.v0");
  assert.deepEqual(audit.refusals, []);
  assert.equal(audit.ok, true);
  assert.deepEqual(audit.runtime.map(d => d.name).sort(), ["@mechanical/workflows-coordination", "@mechanical/workflows-development"]);
  assert.deepEqual(audit.toolchain.map(d => d.name).sort(), ["@types/node", "typescript"]);
  assert.ok(audit.runtime.every(d => d.manifest === "apps/development-rig/package.json"), "the development rig is the only runtime consumer");
});

test("the real coordination core runs in offline deterministic mode: its only host module is node:crypto and the mode admits it", () => {
  const imports = realImports();
  const external = [...new Set(imports.filter(i => !i.specifier.startsWith(".")).map(i => i.specifier))];
  assert.deepEqual(external, ["node:crypto"]);
  const admission = admitOfflineDeterministicRun({ runId: "core@head", capabilities: [...OFFLINE_DETERMINISTIC_MODE.requires], imports });
  assert.equal(admission.schema, "mw.offline-admission.v0");
  assert.deepEqual(admission.refusals, []);
  assert.equal(admission.admitted, true);
});

test("the mode is declared, not inferred: it requires pinned observations, recorded effects and a digest; it refuses network, clock, randomness, filesystem, environment and subprocess; node:crypto is its only host module", () => {
  assert.equal(OFFLINE_DETERMINISTIC_MODE.schema, "mw.offline-deterministic-mode.v0");
  assert.deepEqual([...OFFLINE_DETERMINISTIC_MODE.requires].sort(), ["digest", "pinned-observations", "recorded-effects"]);
  assert.deepEqual([...OFFLINE_DETERMINISTIC_MODE.refuses].sort(), ["clock", "filesystem", "network", "process-environment", "randomness", "subprocess"]);
  assert.deepEqual(OFFLINE_DETERMINISTIC_MODE.hostModules, ["node:crypto"]);
  assert.ok(Object.isFrozen(OFFLINE_DETERMINISTIC_MODE));
});

test("a runtime dependency outside the workspace is refused, as is a Library or micro-policy name anywhere", () => {
  const external = auditDependencies(fixtureInput({
    manifests: [
      { path: "package.json", devDependencies: { typescript: "5.9.3" } },
      { path: "packages/core/package.json", name: "@w/core", dependencies: { undici: "6.0.0" } },
      { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" } },
    ],
  }));
  assert.equal(external.ok, false);
  assert.deepEqual(codes(external.refusals), ["DEPENDENCY_RUNTIME_EXTERNAL"]);
  assert.equal(external.refusals[0]!.site, "packages/core/package.json");
  assert.equal(external.refusals[0]!.name, "undici");

  const library = auditDependencies(fixtureInput({
    toolchain: ["typescript", "@micro-policy/cli"],
    manifests: [
      { path: "package.json", devDependencies: { typescript: "5.9.3", "@micro-policy/cli": "1.0.0" } },
      { path: "packages/core/package.json", name: "@w/core", dependencies: { "@w/rig": "0.1.0", "some-library": "2.0.0" } },
      { path: "apps/rig/package.json", name: "@w/rig" },
    ],
  }));
  assert.deepEqual(codes(library.refusals), ["DEPENDENCY_LIBRARY_FORBIDDEN", "DEPENDENCY_LIBRARY_FORBIDDEN", "DEPENDENCY_RUNTIME_EXTERNAL"]);
  assert.deepEqual(library.refusals.filter(r => r.code === "DEPENDENCY_LIBRARY_FORBIDDEN").map(r => r.name).sort(), ["@micro-policy/cli", "some-library"]);
});

test("a devDependency outside the toolchain allowlist and any peer, optional or bundled dependency are refused", () => {
  const audit = auditDependencies(fixtureInput({
    manifests: [
      { path: "package.json", devDependencies: { typescript: "5.9.3", eslint: "9.0.0" } },
      { path: "packages/core/package.json", name: "@w/core", peerDependencies: { react: "19" } },
      { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" }, optionalDependencies: { fsevents: "2" } },
    ],
  }));
  assert.equal(audit.ok, false);
  assert.deepEqual(codes(audit.refusals), ["DEPENDENCY_KIND_UNSUPPORTED", "DEPENDENCY_KIND_UNSUPPORTED", "DEPENDENCY_TOOLCHAIN_UNLISTED"]);
  assert.deepEqual(audit.refusals.map(r => r.name).sort(), ["eslint", "fsevents", "react"]);
});

test("the lock is audited too: a non-registry source is untrusted and a non-dev install that is not a workspace link is an external runtime requirement", () => {
  const audit = auditDependencies(fixtureInput({
    lock: [
      { path: "" },
      { path: "node_modules/@w/core", resolved: "packages/core", link: true },
      { path: "node_modules/typescript", resolved: "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz", dev: true },
      { path: "node_modules/left-pad", resolved: "git+https://github.com/x/left-pad.git#abc", dev: true },
      { path: "node_modules/undici", resolved: "https://registry.npmjs.org/undici/-/undici-6.0.0.tgz" },
    ],
  }));
  assert.equal(audit.ok, false);
  assert.deepEqual(codes(audit.refusals), ["DEPENDENCY_LOCK_RUNTIME_EXTERNAL", "DEPENDENCY_LOCK_SOURCE_UNTRUSTED"]);
  assert.equal(audit.refusals.find(r => r.code === "DEPENDENCY_LOCK_SOURCE_UNTRUSTED")!.site, "node_modules/left-pad");
  assert.equal(audit.refusals.find(r => r.code === "DEPENDENCY_LOCK_RUNTIME_EXTERNAL")!.site, "node_modules/undici");
});

test("offline admission refuses a refused capability, a missing required capability, an unknown capability and a host module outside the mode; relative imports are internal", () => {
  const base: OfflineRunDeclaration = {
    runId: "run:1",
    capabilities: ["pinned-observations", "recorded-effects", "digest"],
    imports: [{ file: "a.ts", specifier: "./b.js" }, { file: "a.ts", specifier: "node:crypto" }],
  };
  assert.equal(admitOfflineDeterministicRun(base).admitted, true);
  const network = admitOfflineDeterministicRun({ ...base, capabilities: [...base.capabilities, "network"] });
  assert.deepEqual(codes(network.refusals), ["OFFLINE_CAPABILITY_REFUSED"]);
  assert.equal(network.admitted, false);
  const missing = admitOfflineDeterministicRun({ ...base, capabilities: ["pinned-observations", "digest"] });
  assert.deepEqual(codes(missing.refusals), ["OFFLINE_CAPABILITY_MISSING"]);
  assert.equal(missing.refusals[0]!.subject, "recorded-effects");
  const unknown = admitOfflineDeterministicRun({ ...base, capabilities: [...base.capabilities, "telemetry"] });
  assert.deepEqual(codes(unknown.refusals), ["OFFLINE_CAPABILITY_UNKNOWN"]);
  const fs = admitOfflineDeterministicRun({ ...base, imports: [...base.imports, { file: "c.ts", specifier: "node:fs" }] });
  assert.deepEqual(codes(fs.refusals), ["OFFLINE_HOST_MODULE_OUTSIDE_MODE"]);
  assert.equal(fs.refusals[0]!.subject, "c.ts:node:fs");
  const several = admitOfflineDeterministicRun({ runId: "run:2", capabilities: ["network", "clock"], imports: [{ file: "d.ts", specifier: "undici" }] });
  assert.deepEqual(codes(several.refusals), ["OFFLINE_CAPABILITY_MISSING", "OFFLINE_CAPABILITY_MISSING", "OFFLINE_CAPABILITY_MISSING", "OFFLINE_CAPABILITY_REFUSED", "OFFLINE_CAPABILITY_REFUSED", "OFFLINE_HOST_MODULE_OUTSIDE_MODE"]);
});

test("both verdicts are pure records: every string leaf is an input leaf, a declared code, a schema or the fixed detail vocabulary", () => {
  const input = fixtureInput({
    manifests: [
      { path: "package.json", devDependencies: { typescript: "5.9.3", eslint: "9.0.0" } },
      { path: "packages/core/package.json", name: "@w/core", dependencies: { undici: "6.0.0" } },
      { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" } },
    ],
  });
  const audit = auditDependencies(input);
  const known = new Set<string>([...stringLeaves(input, [], true), audit.schema, ...audit.refusals.map(r => r.code)]);
  for (const leaf of stringLeaves({ runtime: audit.runtime, toolchain: audit.toolchain, refusals: audit.refusals.map(({ detail: _d, ...rest }) => rest) })) {
    assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
  }
  for (const refusal of audit.refusals) assert.ok(refusal.detail.includes(refusal.name), `detail names the dependency: ${refusal.detail}`);
  const run = admitOfflineDeterministicRun({ runId: "run:3", capabilities: ["network"], imports: [{ file: "e.ts", specifier: "node:fs" }] });
  assert.equal(run.runId, "run:3");
  for (const refusal of run.refusals) assert.ok(["OFFLINE_CAPABILITY_REFUSED", "OFFLINE_CAPABILITY_MISSING", "OFFLINE_HOST_MODULE_OUTSIDE_MODE"].includes(refusal.code));
});

/** String leaves of a value; with `withKeys` the object keys count too (dependency names are keys in a manifest). */
function stringLeaves(value: unknown, out: string[] = [], withKeys = false): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out, withKeys);
  else if (value !== null && typeof value === "object") for (const [key, member] of Object.entries(value as Record<string, unknown>)) { if (withKeys) out.push(key); stringLeaves(member, out, withKeys); }
  return out;
}
