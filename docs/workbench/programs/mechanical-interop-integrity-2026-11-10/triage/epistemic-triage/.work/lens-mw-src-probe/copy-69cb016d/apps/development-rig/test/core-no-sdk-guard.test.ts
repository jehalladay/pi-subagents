/**
 * EAT-R024 (bead loexn.5, M01): the public core package stays free of mandatory Pi, Furnace, Forge and Claude SDK dependencies.
 * A regression guard over packages/development/package.json and its compiled dist, with a mutant per surface so the guard cannot pass blindly.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = fileURLToPath(new URL("../../..", import.meta.url));
/** Package-name fragments that identify the forbidden SDK families. */
const FORBIDDEN = [/^@anthropic-ai\//, /claude-agent-sdk/, /^@earendil-works\//, /^pi-/, /(^|\/)pi-coding-agent/, /(^|\/)furnace/, /(^|\/)forge/];
/** Assembled at run time so this file itself names the SDK only as data, never as an import specifier. */
const SDK = ["@anthropic-ai", "claude-agent-sdk"].join("/");
const forbidden = (name: string): boolean => FORBIDDEN.some(pattern => pattern.test(name));

function forbiddenDependencies(manifest: Record<string, unknown>): string[] {
  const found: string[] = [];
  for (const section of ["dependencies", "peerDependencies", "optionalDependencies"]) {
    const table = manifest[section];
    if (table !== null && typeof table === "object") for (const name of Object.keys(table)) if (forbidden(name)) found.push(`${section}:${name}`);
  }
  return found;
}
const SPECIFIER = /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)["']([^"'./][^"']*)["']/g;
function forbiddenSpecifiers(source: string): string[] {
  return [...source.matchAll(SPECIFIER)].map(match => match[1] ?? "").filter(forbidden);
}
function distSources(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".js"))
    .map(entry => readFileSync(join(entry.parentPath, entry.name), "utf8"));
}

test("packages/development declares no forbidden dependency and its compiled dist imports none", () => {
  const manifest = JSON.parse(readFileSync(join(repo, "packages/development/package.json"), "utf8")) as Record<string, unknown>;
  assert.deepEqual(forbiddenDependencies(manifest), []);
  const sources = distSources(join(repo, "packages/development/dist"));
  assert.ok(sources.length > 0, "the core package must be built before this guard runs");
  for (const source of sources) assert.deepEqual(forbiddenSpecifiers(source), []);
});

test("negative mutants: the guard turns red for a declared dependency, a peer dependency and each import form", () => {
  assert.deepEqual(forbiddenDependencies({ dependencies: { [SDK]: "1.0.0" } }), [`dependencies:${SDK}`]);
  assert.deepEqual(forbiddenDependencies({ peerDependencies: { "@earendil-works/pi-coding-agent": "*" } }), ["peerDependencies:@earendil-works/pi-coding-agent"]);
  assert.deepEqual(forbiddenSpecifiers(`import { query } from "${SDK}";`), [SDK]);
  assert.deepEqual(forbiddenSpecifiers('const sdk = await import("@mechanical/forge-client");'), ["@mechanical/forge-client"]);
  assert.deepEqual(forbiddenSpecifiers('const sdk = require("furnace-sdk");'), ["furnace-sdk"]);
});

test("positive controls: legitimate relative imports and node builtins are not flagged", () => {
  assert.deepEqual(forbiddenSpecifiers('import { develop } from "./develop.js"; import { join } from "node:path";'), []);
  assert.deepEqual(forbiddenDependencies({ dependencies: { "left-pad": "1.0.0" } }), []);
});

test("the rig keeps the Claude SDK behind a runtime-only import and never inside packages/*", () => {
  for (const file of ["claude-implement.ts", "claude-review.ts"]) {
    const source = readFileSync(join(repo, "apps/development-rig/src", file), "utf8");
    assert.deepEqual(forbiddenSpecifiers(source), [], `${file} must not import the SDK statically`);
    assert.ok(source.includes(SDK), `${file} still names the SDK for its runtime-only load`);
  }
  const rigManifest = JSON.parse(readFileSync(join(repo, "apps/development-rig/package.json"), "utf8")) as Record<string, unknown>;
  assert.deepEqual(forbiddenDependencies(rigManifest), []);
  for (const pkg of ["development", "coordination"]) {
    const dir = join(repo, "packages", pkg, "src");
    for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".ts")) assert.ok(!readFileSync(join(entry.parentPath, entry.name), "utf8").includes("claude-agent-sdk"), `${pkg}/${entry.name} names the SDK`);
    }
  }
});
