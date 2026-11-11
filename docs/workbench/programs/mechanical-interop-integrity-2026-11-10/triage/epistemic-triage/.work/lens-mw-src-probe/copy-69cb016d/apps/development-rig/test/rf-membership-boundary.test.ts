import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { developCli } from "../dist/live-develop-cli.js";
import { developLive } from "../dist/live-development.js";
import type { LiveDevelopmentResult } from "../dist/live-development.js";
import type { ConnectForge } from "../dist/live-gate.js";

// CAC-WC boundary (README: "no automatic membership in Reactive Fiber. RF participation is opt-in
// through the explicit rf-context adapter (--context-mode rf)"). These laws pin the boundary at the
// CLI, at the development entry point, and structurally in the source tree.

type Develop = NonNullable<Parameters<typeof developCli>[1]>;
type DevelopArgs = Parameters<Develop>;
const here = dirname(fileURLToPath(import.meta.url));
const rigSrc = join(here, "..", "src");
const repoRoot = join(here, "..", "..", "..");

const canned: LiveDevelopmentResult = {
  mode: "live-claude-forge", discovery: "git-tracked-files", context: "plain-task-context",
  workflow: { kind: "indeterminate", reason: "AGENT_FAULT" }, agent: null, forge: null,
} as unknown as LiveDevelopmentResult;

async function cli(args: readonly string[]): Promise<{ code: number; calls: DevelopArgs[] }> {
  const calls: DevelopArgs[] = [];
  const develop: Develop = async (...a: DevelopArgs) => { calls.push(a); return canned; };
  const original = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  try { return { code: await developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...args], develop), calls }; }
  finally { process.stdout.write = original; }
}

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-rf-boundary-"));
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
function commitChange(root: string): void {
  writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
}
function forgeConnection(root: string): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request(_method, request) {
      assert.equal(request.root, root);
      const head = git(root, "rev-parse", "HEAD");
      return {
        operation_id: "op-" + head.slice(0, 8), terminal_fact: "completed", status: "success",
        forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: head }, data: { gate_verdict: "PASS", gate_passed: true } },
      };
    },
    async close() {},
  });
}
const agentSuccess = { sessionId: "session-42", summary: "Changed parser", turns: 2, costUsd: 0.04 };

test("the CLI's default context mode is plain: no flag, no model, and the development call receives plain", async () => {
  const r = await cli([]);
  assert.equal(r.calls.length, 1);
  const options = r.calls[0]![2] as { contextMode?: string; model?: string };
  assert.equal(options.contextMode, "plain");
  assert.equal(options.model, undefined);
});

test("RF membership is an explicit opt-in with an explicit cost: --context-mode rf demands --model, any other mode is refused, and only rf forwards rf", async () => {
  await assert.rejects(() => cli(["--context-mode", "rf"]), /RF_MODEL_REQUIRED/);
  await assert.rejects(() => cli(["--context-mode", "fiber"]), /INVALID_CONTEXT_MODE/);
  await assert.rejects(() => cli(["--context-mode", "reactive-fiber"]), /INVALID_CONTEXT_MODE/);
  const r = await cli(["--context-mode", "rf", "--model", "claude-opus-5"]);
  const options = r.calls[0]![2] as { contextMode?: string; model?: string };
  assert.equal(options.contextMode, "rf");
  assert.equal(options.model, "claude-opus-5");
});

test("only rf forwards rf: the RF knobs are refused in the default plain mode and never reach the development call", async () => {
  for (const knob of [["--rf-actor", "agent:x"], ["--rf-session", "rfs_1"], ["--rf-history-limit", "9"], ["--render-idempotency-key", "k1"]]) {
    await assert.rejects(() => cli(knob), /RF_OPTION_REQUIRES_RF_MODE/, knob[0]);
    await assert.rejects(() => cli(["--context-mode", "plain", ...knob]), /RF_OPTION_REQUIRES_RF_MODE/, knob[0]);
  }
  const r = await cli(["--context-mode", "rf", "--model", "claude-opus-5", "--rf-actor", "agent:x"]);
  assert.equal((r.calls[0]![2] as { rfActor?: string }).rfActor, "agent:x");
});

test("developLive without a context mode never consults the RF adapter and reports plain task context with no RF evidence", () => withRepo(async root => {
  let rendered = 0;
  const out = await developLive(root, "Implement parser", {
    renderContext: async () => { rendered += 1; throw new Error("RF adapter consulted without opt-in"); },
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root),
  });
  assert.equal(rendered, 0);
  assert.equal(out.context, "plain-task-context");
  assert.equal(Object.hasOwn(out, "contextEvidence"), false);
  assert.equal(out.workflow.kind, "verified_candidate");
}));

test("an explicit plain mode and an RF-looking environment both stay plain: membership is never inferred", () => withRepo(async root => {
  const saved = { ...process.env };
  process.env.MW_CONTEXT_MODE = "rf";
  process.env.RF_WORKSPACE = root;
  process.env.REACTIVE_FIBER = "1";
  try {
    let rendered = 0;
    const out = await developLive(root, "Implement parser", {
      contextMode: "plain",
      renderContext: async () => { rendered += 1; throw new Error("RF adapter consulted without opt-in"); },
      agent: async () => { commitChange(root); return agentSuccess; },
      connectForge: forgeConnection(root),
    });
    assert.equal(rendered, 0);
    assert.equal(out.context, "plain-task-context");
  } finally {
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  }
}));

test("structurally, RF is reachable only through the explicit adapter: a pinned importer allowlist, a type-only evidence import, no RF in the pure coordination library, and no RF package dependency", () => {
  const importers = readdirSync(rigSrc).filter(name => name.endsWith(".ts") && !name.startsWith("rf-"))
    .filter(name => /rf-(context|provision)\.js/.test(readFileSync(join(rigSrc, name), "utf8"))).sort();
  assert.deepEqual(importers, ["live-composition.ts", "live-development.ts", "live-evidence.ts"]);
  const composition = readFileSync(join(rigSrc, "live-composition.ts"), "utf8");
  for (const line of composition.split("\n").filter(l => /rf-context\.js/.test(l))) assert.match(line, /^import type /);
  const evidence = readFileSync(join(rigSrc, "live-evidence.ts"), "utf8");
  for (const line of evidence.split("\n").filter(l => /rf-context\.js/.test(l))) assert.match(line, /^import type /);
  const coordinationSrc = join(repoRoot, "packages", "coordination", "src");
  for (const name of readdirSync(coordinationSrc)) {
    assert.doesNotMatch(readFileSync(join(coordinationSrc, name), "utf8"), /reactive-fiber|rf-context|rf-provision/i, name);
  }
  for (const manifest of ["package.json", "apps/development-rig/package.json", "packages/coordination/package.json", "packages/development/package.json"]) {
    const parsed = JSON.parse(readFileSync(join(repoRoot, manifest), "utf8")) as Record<string, Record<string, string> | undefined>;
    for (const section of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
      for (const dep of Object.keys(parsed[section] ?? {})) assert.doesNotMatch(dep, /fiber|reactive/i, `${manifest} ${section} ${dep}`);
    }
  }
});

// Absent-mode and spelling cells: the explicit mode is the only door. Neither an RF-looking environment
// nor a model nor a case variant of a mode name opens it.

const rfLookingEnvironment = (root: string): Record<string, string> => ({ MW_CONTEXT_MODE: "rf", RF_WORKSPACE: root, REACTIVE_FIBER: "1" });

async function withEnvironment<T>(overrides: Record<string, string>, fn: () => Promise<T>): Promise<T> {
  const saved = { ...process.env };
  Object.assign(process.env, overrides);
  try { return await fn(); } finally {
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  }
}

async function developWithoutMode(root: string, extra: { model?: string }): Promise<{ rendered: number; out: LiveDevelopmentResult }> {
  let rendered = 0;
  const out = await developLive(root, "Implement parser", {
    ...extra,
    renderContext: async () => { rendered += 1; throw new Error("RF adapter consulted without opt-in"); },
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root),
  });
  return { rendered, out };
}

test("developLive with an RF-looking environment and no context mode stays plain, with and without a model", async () => {
  for (const extra of [{}, { model: "claude-opus-5" }]) {
    await withRepo(root => withEnvironment(rfLookingEnvironment(root), async () => {
      const { rendered, out } = await developWithoutMode(root, extra);
      assert.equal(rendered, 0, JSON.stringify(extra));
      assert.equal(out.context, "plain-task-context");
      assert.equal(Object.hasOwn(out, "contextEvidence"), false);
      assert.equal(out.workflow.kind, "verified_candidate");
    }));
  }
});

test("developLive with a model and no context mode and no environment never infers rf from the model", () => withRepo(async root => {
  const { rendered, out } = await developWithoutMode(root, { model: "claude-opus-5" });
  assert.equal(rendered, 0);
  assert.equal(out.context, "plain-task-context");
  assert.equal(Object.hasOwn(out, "contextEvidence"), false);
}));

test("developCli with MW_CONTEXT_MODE=rf and no flag, and with a model alone, forwards plain and never raises RF_MODEL_REQUIRED", async () => {
  await withEnvironment(rfLookingEnvironment("/ws"), async () => {
    for (const extra of [[], ["--model", "claude-opus-5"]]) {
      const r = await cli(extra);
      assert.equal(r.code, 3, extra.join(" "));
      assert.equal(r.calls.length, 1);
      const options = r.calls[0]![2] as { contextMode?: string; model?: string };
      assert.equal(options.contextMode, "plain", extra.join(" "));
      assert.equal(options.model, extra.length > 0 ? "claude-opus-5" : undefined);
    }
  });
});

test("developCli refuses every case variant of the mode names with INVALID_CONTEXT_MODE, before any development call", async () => {
  for (const spelling of ["RF", "Rf", "PLAIN", "Plain"]) {
    const calls: DevelopArgs[] = [];
    const develop: Develop = async (...a: DevelopArgs) => { calls.push(a); return canned; };
    await assert.rejects(() => developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", "--context-mode", spelling, "--model", "claude-opus-5"], develop), /INVALID_CONTEXT_MODE/, spelling);
    assert.equal(calls.length, 0, spelling);
  }
});
