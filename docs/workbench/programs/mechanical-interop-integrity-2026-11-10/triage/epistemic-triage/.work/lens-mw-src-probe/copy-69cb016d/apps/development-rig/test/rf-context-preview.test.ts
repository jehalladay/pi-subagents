// MW-R5 EAT-R088 (L1 leg): an RF preview-shaped (--no-commit) envelope is refused before the writer runs; only a committed render establishes context.
// Test-only over the shipped adapter: does not enable rf-committed-v1.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import { renderTaskContext } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";
import type { ConnectForge } from "../dist/live-gate.js";

const MODEL = "claude-opus-5";
const task = "Fix parser";
const NO_CONTEXT = "RF_CONTEXT_UNESTABLISHED: missing task-grounded content, native evidence or model budget";
const refusedAs = (reason: string) => (e: unknown) => e instanceof Error && e.message === reason;
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-rfpreview-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
// Echoes the task and source revision rf was asked to render, so only the commit fields distinguish a preview from a committed render.
function producing(commit: { render_id: string | null; commit_seq: number | null; ephemeral: boolean }): RfExecutor {
  return async argv => {
    if (argv.includes("--version")) {
      return { stdout: JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: true, command: "version", workspace: null, result: { version: "0.1.883", sdk_versions: { fiber_optics: "0.1.0" } }, diagnostics: [] }), stderr: "", exitCode: 0 };
    }
    const asked = String(argv[argv.indexOf("--task") + 1]);
    return {
      stdout: JSON.stringify({
        schema: "reactive-fiber.cli/v1", ok: true, command: "context render", workspace: { root: "r", id: "rfw-1" },
        result: {
          ...commit, workspace_id: "rfw_1", actor: "agent:camshaft-oe",
          output: { text: asked, digest: "sha256:" + "b".repeat(64) },
          budget: { capability_snapshot: { model_id: MODEL, verified: true }, formula_terms: { available_context_tokens: 512 } },
          provenance: { graph_revision_id: "sha256:" + "c".repeat(64), sdk_versions: { rf: "1" } },
        },
        diagnostics: [],
      }), stderr: "", exitCode: 0,
    };
  };
}
const preview = producing({ ephemeral: true, render_id: null, commit_seq: null });
const committed = producing({ ephemeral: false, render_id: "rfr-committed-1", commit_seq: 7 });

test("a preview-shaped envelope (ephemeral, no render id, no commit sequence) is RF_CONTEXT_UNESTABLISHED", async () => {
  await assert.rejects(() => renderTaskContext("/tmp/mw-rf", task, "a".repeat(40), MODEL, preview), refusedAs(NO_CONTEXT));
});

test("developLive refuses a preview-shaped render before the agent or Forge gate runs", () => withRepo(async root => {
  let calls = 0;
  await assert.rejects(() => developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: (cwd, t, revision, model) => renderTaskContext(cwd, t, revision, model, preview),
    agent: async () => { calls++; throw new Error("agent must not run"); },
    connectForge: (() => { calls++; throw new Error("must not connect"); }) as ConnectForge,
  }), refusedAs(NO_CONTEXT));
  assert.equal(calls, 0);
}));

test("negative control: the same envelope carrying a committed render id and commit sequence is admitted as committed", async () => {
  const out = await renderTaskContext("/tmp/mw-rf", task, "a".repeat(40), MODEL, committed);
  assert.equal(out.evidence?.id, "rfr-committed-1");
  assert.equal(out.acknowledgement, "committed");
  assert.equal(out.basis.revision, "a".repeat(40));
});
