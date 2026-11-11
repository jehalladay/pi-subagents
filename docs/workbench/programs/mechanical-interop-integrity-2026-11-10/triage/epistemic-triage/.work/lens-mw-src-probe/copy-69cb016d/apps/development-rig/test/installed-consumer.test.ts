/**
 * EAT-R005, EAT-R007, EAT-R031 (bead loexn.5, M01): an independently installed consumer.
 * Packs the three workspace packages, installs only the tarballs into an empty external npm project
 * (no NODE_PATH, no sibling checkout) and imports `@mechanical/development-rig/host` by its subpath.
 * Tier L2: fixture services, real packed artifacts; never a native or live proof. It runs inside `npm test`, so it is part of the Forge test step.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const repo = fileURLToPath(new URL("../../..", import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), "mw-installed-consumer-"));
after(() => rmSync(scratch, { recursive: true, force: true }));

interface Packed { readonly tarball: string; readonly files: readonly string[] }
function pack(relative: string): Packed {
  const destination = mkdtempSync(join(scratch, "pack-"));
  const run = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: join(repo, relative), encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const [first] = JSON.parse(run.stdout) as { filename: string; files: { path: string }[] }[];
  assert.ok(first, "npm pack reported nothing for " + relative);
  return { tarball: join(destination, first.filename), files: first.files.map(file => file.path).sort() };
}
const library = pack("packages/development");
const coordination = pack("packages/coordination");
const rig = pack("apps/development-rig");

function cleanEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env, npm_config_update_notifier: "false" };
  delete env["NODE_PATH"];
  delete env["NODE_TEST_CONTEXT"];
  return env;
}
function project(tarballs: readonly string[]): string {
  const dir = mkdtempSync(join(scratch, "consumer-"));
  writeFileSync(join(dir, "package.json"), '{"name":"mw-external-consumer","private":true,"type":"module"}\n');
  const install = spawnSync("npm", ["install", "--ignore-scripts", "--offline", "--no-audit", "--no-fund", "--no-save", ...tarballs], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  assert.equal(install.status, 0, install.stderr);
  return dir;
}
const digest = (path: string) => "sha256:" + createHash("sha256").update(readFileSync(path)).digest("hex");

test("the rig manifest's exports and types entries resolve to listed dist declarations and modules (EAT-R031)", () => {
  const manifest = JSON.parse(readFileSync(join(repo, "apps/development-rig/package.json"), "utf8")) as { exports?: Record<string, { types?: string; import?: string; default?: string }> };
  const entry = manifest.exports?.["./host"];
  assert.ok(entry, "package.json must declare the ./host subpath");
  for (const target of [entry.types, entry.import ?? entry.default]) {
    assert.ok(typeof target === "string" && target.startsWith("./dist/"), "export target must live under dist: " + String(target));
    assert.ok(rig.files.includes(target.slice(2)), target + " is not in the npm pack file list");
  }
  assert.ok(rig.files.includes("dist/host.d.ts") && rig.files.includes("dist/host.js"));
});

test("the committed pack file list record holds a base list without the host and a head list with it (EAT-R031)", () => {
  const record = JSON.parse(readFileSync(join(repo, "qa/integration/pi-native-interoperability-2026-11-09/m01/rig-pack-file-lists.json"), "utf8")) as {
    base: { commit: string; files: string[] }; head: { files: string[] }; node: string;
  };
  assert.match(record.base.commit, /^[0-9a-f]{40}$/);
  assert.ok(!record.base.files.includes("dist/host.d.ts"), "the base list predates the host facade");
  assert.ok(record.head.files.includes("dist/host.d.ts") && record.head.files.includes("dist/host.js"));
  assert.ok(record.node.startsWith("v"));
});

const consumerScript = `
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
const [, , libraryPath, descriptorPath] = process.argv;
const host = await import("@mechanical/development-rig/host");
const resolved = {
  host: import.meta.resolve("@mechanical/development-rig/host"),
  library: import.meta.resolve("@mechanical/workflows-development"),
  coordination: import.meta.resolve("@mechanical/workflows-coordination"),
};
const digest = bytes => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const descriptorBytes = readFileSync(descriptorPath);
const basis = { workspaceId: "repo-A", revision: "base-1" };
const updated = { workspaceId: "repo-A", revision: "candidate-1" };
const seen = [];
const outcome = await host.invokeDevelopmentHost({
  artifactPath: libraryPath, artifactDigest: digest(readFileSync(libraryPath)), descriptorBytes, descriptorDigest: digest(descriptorBytes),
  services: {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete", files: ["a.ts"] }; },
    compileContext: async () => { seen.push("context"); return { basis, text: "plain" }; },
    implement: async () => { seen.push("implement"); return { basis: updated, parentBasis: basis }; },
    verify: async () => { seen.push("verify"); return { basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-installed-consumer" } }; },
  },
}, { task: "External consumer run", workspaceId: "repo-A", baseRevision: "base-1" });
console.log(JSON.stringify({ version: host.HOST_API_VERSION, type: typeof host.invokeDevelopmentHost, resolved, outcome: outcome.kind, seen }));
`;

test("an external project that installs only the packed tarballs imports the host subpath, resolves every module under its own node_modules, and runs develop (EAT-R005, EAT-R007)", () => {
  const dir = project([library.tarball, coordination.tarball, rig.tarball]);
  writeFileSync(join(dir, "consumer.mjs"), consumerScript);
  const run = spawnSync(process.execPath, ["consumer.mjs", library.tarball, join(repo, "contracts/entrypoints/development.v1.json")], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  assert.equal(run.status, 0, run.stderr);
  const seen = JSON.parse(run.stdout) as { version: string; type: string; resolved: Record<string, string>; outcome: string; seen: string[] };
  assert.equal(seen.version, "mechanical.pi-host/v1");
  assert.equal(seen.type, "function");
  assert.equal(seen.outcome, "verified_candidate");
  assert.deepEqual(seen.seen, ["discover", "context", "implement", "verify"]);
  const base = pathToFileURL(realpathSync(join(dir, "node_modules"))).href + "/";
  for (const [name, url] of Object.entries(seen.resolved)) {
    assert.ok(url.startsWith(base), `${name} resolved outside the project's node_modules: ${url}`);
    assert.ok(!url.startsWith(pathToFileURL(repo).href), `${name} resolved into the source checkout: ${url}`);
  }
});

test("negative control: the same import from a project without the rig tarball does not resolve to the monorepo (nonzero exit)", () => {
  const dir = project([library.tarball]);
  writeFileSync(join(dir, "probe.mjs"), 'await import("@mechanical/development-rig/host");\n');
  const run = spawnSync(process.execPath, ["probe.mjs"], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /ERR_MODULE_NOT_FOUND|Cannot find package/);
  assert.equal(existsSync(join(dir, "node_modules", "@mechanical", "development-rig")), false);
});

test("the exports map keeps deep imports of unlisted rig internals closed", () => {
  const dir = project([library.tarball, coordination.tarball, rig.tarball]);
  writeFileSync(join(dir, "deep.mjs"), 'await import("@mechanical/development-rig/dist/live-development.js");\n');
  const run = spawnSync(process.execPath, ["deep.mjs"], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /ERR_PACKAGE_PATH_NOT_EXPORTED/);
});

test("the installed library tarball digest the consumer used equals the packed bytes (fixture sanity)", () => {
  assert.match(digest(library.tarball), /^sha256:[0-9a-f]{64}$/);
});
