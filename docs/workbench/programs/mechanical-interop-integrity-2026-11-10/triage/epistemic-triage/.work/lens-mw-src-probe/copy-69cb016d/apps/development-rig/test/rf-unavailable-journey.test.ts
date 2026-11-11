// RFCA-MWX05-R002: an rf that cannot be started stays explicitly unavailable at journey level; no render is simulated.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { developLive } from "../dist/live-development.js";
import { renderTaskContext } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";
import type { ConnectForge } from "../dist/live-gate.js";

const cli = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/cli.js");
const MODEL = "claude-opus-5";
const task = "Fix parser";
const ENV = "MECHANICAL_RF_BINARY";

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
const porcelain = (root: string) => git(root, "status", "--porcelain", "--untracked-files=all");
async function withRepo<T>(fn: (root: string, scratch: string) => Promise<T> | T): Promise<T> {
  const scratch = mkdtempSync(join(tmpdir(), "mechanical-rfunavail-"));
  const root = join(scratch, "repo");
  try {
    assert.equal(spawnSync("git", ["init", "-q", root], { encoding: "utf8" }).status, 0);
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root, scratch);
  } finally { rmSync(scratch, { recursive: true, force: true }); }
}
// The two ways rf cannot start: no such file (ENOENT) and a present file without the execute bit (EACCES).
function unstartable(scratch: string): ReadonlyArray<readonly [string, string]> {
  const plain = join(scratch, "rf-not-executable");
  writeFileSync(plain, "#!/bin/sh\nexit 0\n");
  chmodSync(plain, 0o644);
  return [["absent", join(scratch, "rf-absent")], ["EACCES", plain]];
}
async function withRfBinary<T>(value: string, fn: () => Promise<T>): Promise<T> {
  const before = process.env[ENV];
  process.env[ENV] = value;
  try { return await fn(); } finally { if (before === undefined) delete process.env[ENV]; else process.env[ENV] = before; }
}

test("developLive with an unstartable rf rejects RF_UNAVAILABLE before any agent or Forge call and leaves the basis untouched", () => withRepo(async (root, scratch) => {
  const head = git(root, "rev-parse", "HEAD");
  for (const [arm, binary] of unstartable(scratch)) {
    const calls: string[] = [];
    const error = await withRfBinary(binary, () => developLive(root, task, {
      contextMode: "rf", model: MODEL,
      agent: async () => { calls.push("agent"); throw new Error("agent must not run"); },
      connectForge: (() => { calls.push("connectForge"); throw new Error("must not connect"); }) as ConnectForge,
    }).then(() => undefined, (e: unknown) => e));
    assert.ok(error instanceof Error, arm + ": developLive must reject");
    assert.equal((error as { code?: unknown }).code, "RF_UNAVAILABLE", arm + ": " + error.message);
    assert.match(error.message, /^RF_UNAVAILABLE: /);
    assert.doesNotMatch(error.message, /RF_RENDER_UNESTABLISHED|RF_CONTEXT_UNESTABLISHED/);
    assert.deepEqual(calls, [], arm);
    assert.equal(git(root, "rev-parse", "HEAD"), head, arm);
    assert.equal(porcelain(root), "", arm);
  }
}));

test("the live-develop process exits 2 naming RF_UNAVAILABLE, never an unestablished render, and leaves the basis untouched", () => withRepo(async (root, scratch) => {
  const head = git(root, "rev-parse", "HEAD");
  for (const [arm, binary] of unstartable(scratch)) {
    const p = spawnSync(process.execPath, [cli, "--live-develop", "--workspace", root, "--task", "t", "--allow-writes", "--context-mode", "rf", "--model", MODEL],
      { encoding: "utf8", timeout: 60_000, env: { ...process.env, [ENV]: binary } });
    assert.equal(p.status, 2, arm + ": " + p.stderr);
    assert.match(p.stderr, /RF_UNAVAILABLE/, arm);
    assert.doesNotMatch(p.stderr, /RF_RENDER_UNESTABLISHED|RF_CONTEXT_UNESTABLISHED/, arm);
    assert.equal(p.stdout, "", arm);
    assert.equal(git(root, "rev-parse", "HEAD"), head, arm);
    assert.equal(porcelain(root), "", arm);
  }
}));

test("negative control: the identical harness with a startable rf reaches the agent, so the refusals come from unavailability alone", () => withRepo(async (root, scratch) => {
  const version = { schema: "reactive-fiber.cli/v1", ok: true, command: "version", workspace: null, result: { version: "0.1.883", sdk_versions: {} }, diagnostics: [] };
  const echoing: RfExecutor = async argv => {
    if (argv.includes("--version")) return { stdout: JSON.stringify(version), stderr: "", exitCode: 0 };
    const asked = String(argv[argv.indexOf("--task") + 1]);
    return { stdout: JSON.stringify({
      schema: "reactive-fiber.cli/v1", ok: true, command: "context render", workspace: { root: "r", id: "rfw_1" },
      result: {
        render_id: "rfr-unavail-1", workspace_id: "rfw_1", actor: "agent:camshaft-oe",
        output: { text: asked, digest: "sha256:" + "b".repeat(64) },
        budget: { capability_snapshot: { model_id: MODEL, verified: true }, formula_terms: { available_context_tokens: 512 } },
        provenance: { graph_revision_id: "sha256:" + "c".repeat(64), sdk_versions: { rf: "1" } },
      },
      diagnostics: [],
    }), stderr: "", exitCode: 0 };
  };
  const [, binary] = unstartable(scratch)[0]!;
  const seen: string[] = [];
  const error = await withRfBinary(binary, () => developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: (cwd, t, revision, model, _execute, options) => renderTaskContext(cwd, t, revision, model, echoing, options),
    agent: async () => { seen.push("agent"); throw new Error("stop after context"); },
    connectForge: (() => { throw new Error("must not connect"); }) as ConnectForge,
  }).then(() => undefined, (e: unknown) => e));
  assert.ok(error instanceof Error);
  assert.match(error.message, /stop after context/);
  assert.notEqual((error as { code?: unknown }).code, "RF_UNAVAILABLE");
  assert.deepEqual(seen, ["agent"]);
}));
