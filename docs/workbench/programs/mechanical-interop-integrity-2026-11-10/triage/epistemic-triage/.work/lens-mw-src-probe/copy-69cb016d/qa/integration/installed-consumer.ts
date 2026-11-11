/**
 * External package consumer. The shell builds/installs all three tarballs (development, coordination, rig) into an empty
 * directory first; this process must not import any sibling source checkout.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.argv[2];
assert.ok(root, "pass the external install directory");
const requireFrom = createRequire(join(root, "package.json"));
const libRoot = requireFrom.resolve("@mechanical/workflows-development");
assert.ok(libRoot.startsWith(join(root, "node_modules")), "library resolution escaped external install");
const { develop } = await import(pathToFileURL(libRoot).href);
assert.equal(typeof develop, "function");
const request = { task: "Inspect installed parser", workspaceId: "installed-consumer", baseRevision: "base-1" };
const b = { workspaceId: request.workspaceId, revision: request.baseRevision };
const c = { workspaceId: request.workspaceId, revision: "candidate-1" };
const services = {
  discover: async () => ({ basis: b, coverage: "partial", files: [] }),
  compileContext: async () => { throw Error("partial scope must not implement"); },
  implement: async () => { throw Error("partial scope must not implement"); },
  verify: async () => { throw Error("partial scope must not verify"); },
};
assert.equal((await develop(services, request)).kind, "needs_evidence");
const rig = join(root, "node_modules/@mechanical/development-rig/dist/cli.js");
function cli(args: readonly string[]) { return spawnSync(process.execPath, [rig, ...args], { cwd: root, encoding: "utf8" }); }
const fixture = cli(["--fixture", "--task", "Check installed package"]);
assert.equal(fixture.status, 0, fixture.stderr);
const value = JSON.parse(fixture.stdout);
assert.equal(value.mode, "fixture");
assert.equal(value.evidenceAuthority, "none");
const unopted = cli(["--live-develop", "--workspace", root, "--task", "Not allowed"]);
assert.equal(unopted.status, 2);
assert.match(unopted.stderr, /WRITE_OPT_IN_REQUIRED/);
const cleanPackage = process.argv[3];
if (!cleanPackage) throw new Error("INSTALLED_CONSUMER_USAGE: pass a clean Forge package path");
const missingSdk = cli(["--live-verify", "--workspace", cleanPackage]);
assert.equal(missingSdk.status, 2);
assert.match(missingSdk.stderr, /FORGE_SDK_NOT_INSTALLED/);
for (const name of ["@forge/sdk", "@furnace/sdk", "@hyperunix/sdk", "@anthropic-ai/claude-agent-sdk"]) {
  assert.throws(() => requireFrom.resolve(name), /MODULE_NOT_FOUND|Cannot find module/);
}
const rigPkg = JSON.parse(readFileSync(join(root, "node_modules/@mechanical/development-rig/package.json"), "utf8"));
// Literal list kept in step with the committed rig manifest by scripts/check-structure.ts (INSTALLED_CONSUMER_SMOKE_STALE).
const EXPECTED_RIG_DEPENDENCIES = ["@mechanical/workflows-coordination", "@mechanical/workflows-development"];
assert.deepEqual(Object.keys(rigPkg.dependencies).sort(), EXPECTED_RIG_DEPENDENCIES);
const sourceRoot = process.argv[4];
if (!sourceRoot) throw new Error("INSTALLED_CONSUMER_USAGE: pass the repository root as the fourth argument");
const committed = JSON.parse(readFileSync(join(sourceRoot, "apps/development-rig/package.json"), "utf8"));
assert.deepEqual(Object.keys(rigPkg.dependencies).sort(), Object.keys(committed.dependencies).sort(), "installed rig dependency set differs from the committed manifest");
for (const name of Object.keys(committed.dependencies)) {
  assert.ok(requireFrom.resolve(name).startsWith(join(root, "node_modules")), `${name} did not resolve from the external install`);
}
console.log(JSON.stringify({ mode: "installed-consumer", library: "loaded", coordination: "resolved", negativeScope: "needs_evidence", fixture: "synthetic", liveWithoutOptIn: "refused", optionalSdk: "not-installed" }));
