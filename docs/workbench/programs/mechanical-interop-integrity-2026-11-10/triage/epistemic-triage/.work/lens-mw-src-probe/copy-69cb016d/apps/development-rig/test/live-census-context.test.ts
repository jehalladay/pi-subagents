/**
 * EAT-R028 / EAT-R029 residual (MechanicalWorkflows-i348s.2): what the Git tracked-file census
 * includes and excludes, and what the explicitly plain task context states, observed at the
 * developLive seam through the prompt an injected agent receives. The evidence record shapes
 * ({system:"git",kind:"tracked-file-census"} and {system:"mechanical-workflows",kind:"plain-context"})
 * never leave the develop() composition on the verified path, so no test here claims them.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import type { ConnectForge } from "../dist/live-gate.js";

const CENSUS_HEADER = "Tracked file census (first 400):";
const AGENT_RESULT = { sessionId: "session-census-1", summary: "", turns: 1, costUsd: 0 };

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(setup: (root: string) => void, fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-census-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    setup(root);
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function commitChange(root: string): void {
  writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
}
function forgeConnection(root: string): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request() {
      const head = git(root, "rev-parse", "HEAD");
      return {
        operation_id: "op-" + head.slice(0, 8), terminal_fact: "completed", status: "success",
        forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: head }, data: { gate_verdict: "PASS", gate_passed: true } },
      };
    },
    async close() {},
  });
}
/** Runs developLive with an agent that records its prompt and commits one change. */
async function promptSeenByAgent(root: string, task: string, extra: Record<string, unknown> = {}) {
  const prompts: string[] = [];
  const result = await developLive(root, task, {
    ...extra,
    agent: async (_cwd, prompt) => { prompts.push(prompt); commitChange(root); return AGENT_RESULT; },
    connectForge: forgeConnection(root),
  });
  assert.equal(prompts.length, 1, "the agent ran exactly once");
  return { prompt: prompts[0] as string, result };
}
/** The census lines the plain context lists: everything after the header up to the blank line that ends the context. */
function censusLines(prompt: string): string[] {
  const at = prompt.indexOf(CENSUS_HEADER);
  assert.ok(at >= 0, "the plain context carries the census header");
  return prompt.slice(at + CENSUS_HEADER.length).split("\n\n")[0]!.split("\n").filter(Boolean);
}

test("EAT-R028 ignored arm: a gitignored file on a clean tree never enters the census, tracked files all do", () => withRepo(root => {
  writeFileSync(join(root, ".gitignore"), "scratch.log\nbuild-output/\n");
  mkdirSync(join(root, "src"));
  writeFileSync(join(root, "src", "util.ts"), "export const util = 1;\n");
}, async root => {
  // The ignored paths exist on disk but git status stays clean, so the clean-basis preflight lets the run reach the census.
  writeFileSync(join(root, "scratch.log"), "ignored\n");
  mkdirSync(join(root, "build-output"));
  writeFileSync(join(root, "build-output", "artifact.js"), "ignored\n");
  assert.equal(git(root, "status", "--porcelain"), "");
  const { prompt } = await promptSeenByAgent(root, "Census exclusion probe");
  assert.ok(existsSync(join(root, "scratch.log")), "ignored file still on disk");
  const lines = censusLines(prompt);
  assert.deepEqual(lines, git(root, "ls-files").split("\n"), "the census is exactly the Git tracked-file listing");
  assert.deepEqual(lines, [".gitignore", "forge.toml", "main.ts", "src/util.ts"]);
  assert.doesNotMatch(prompt, /scratch\.log|build-output|artifact\.js/, "no ignored path appears anywhere in the context");
}));

test("EAT-R028 untracked arm: an untracked file is refused as WORKSPACE_NOT_CLEAN before any census, agent or Forge effect", () => withRepo(() => {}, async root => {
  writeFileSync(join(root, "stray.txt"), "untracked\n");
  let effects = 0;
  await assert.rejects(() => developLive(root, "Census exclusion probe", {
    agent: async () => { effects++; return AGENT_RESULT; },
    connectForge: () => { effects++; throw Error("must not connect"); },
  }), /WORKSPACE_NOT_CLEAN/);
  assert.equal(effects, 0, "no census-driven context reached an agent or a gate");
  assert.equal(git(root, "status", "--porcelain"), "?? stray.txt", "the refusal leaves the untracked file in place");
}));

test("EAT-R028 the census lists the first 400 tracked paths in Git order and no more", () => withRepo(root => {
  mkdirSync(join(root, "many"));
  for (let index = 0; index < 450; index++) writeFileSync(join(root, "many", "f" + String(index).padStart(3, "0") + ".txt"), "x\n");
}, async root => {
  const tracked = git(root, "ls-files").split("\n");
  assert.equal(tracked.length, 452, "forge.toml, main.ts and 450 fixtures");
  const { prompt } = await promptSeenByAgent(root, "Census bound probe");
  const lines = censusLines(prompt);
  assert.equal(lines.length, 400);
  assert.deepEqual(lines, tracked.slice(0, 400));
  assert.ok(!prompt.includes("many/f449.txt"), "a path beyond the bound is not listed");
}));

test("EAT-R029 the plain context states the exact task, base revision, root and census, and names no RF render", () => withRepo(() => {}, async root => {
  const base = git(root, "rev-parse", "HEAD");
  const task = "Plain context probe zq-" + base.slice(0, 6);
  let renders = 0;
  const renderContext = (async () => { renders++; throw Error("plain mode must never render through rf"); }) as never;
  for (const mode of [undefined, "plain" as const]) {
    const { prompt, result } = await promptSeenByAgent(root, task, { renderContext, ...(mode ? { contextMode: mode } : {}) });
    const lines = prompt.split("\n");
    assert.ok(lines.includes("Plain task context (NOT a ReactiveFiber render)."), "the context declares itself plain");
    assert.ok(lines.includes("Requested task: " + task), "exact task line");
    assert.ok(lines.includes("Git base commit: " + base), "exact base revision line");
    assert.ok(lines.includes("Repository root: " + realpathSync(root)), "exact repository root line");
    assert.ok(lines.includes(CENSUS_HEADER), "census header present");
    assert.deepEqual(censusLines(prompt), ["forge.toml", "main.ts"]);
    assert.doesNotMatch(prompt, /\brf[rosw]_[a-z0-9]{10,}/, "no RF render, operation, session or workspace id");
    assert.doesNotMatch(prompt, /render[ _-]?id/i, "no render id field");
    assert.equal(result.context, "plain-task-context");
    assert.equal("contextEvidence" in result, false, "plain mode records no RF render evidence");
    git(root, "reset", "-q", "--hard", base);
  }
  assert.equal(renders, 0, "rf render never invoked in plain mode");
}));
