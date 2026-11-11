// CACWC-EAT-R012: Reactive Fiber context rendered for revision r1 never drives implementation against r2.
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

const NO_CONTEXT = "RF_CONTEXT_UNESTABLISHED: missing task-grounded content, native evidence or model budget";
const DISAGREE = "RF_CONTEXT_UNESTABLISHED: rendered context and source basis did not agree";
const MODEL = "claude-opus-5";
const STALE = "d".repeat(40);
const task = "Fix parser";

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-rfbasis-"));
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
// A producer envelope whose rendered text is chosen by the caller; verified capability for MODEL.
const envelope = (text: string, verified = true) => ({
  schema: "reactive-fiber.cli/v1", ok: true, command: "context render", workspace: { root: "r", id: "rfw_1" },
  result: {
    render_id: "rfr-basis-1", workspace_id: "rfw_1", actor: "agent:camshaft-oe",
    output: { text, digest: "sha256:" + "b".repeat(64) },
    budget: { capability_snapshot: { model_id: MODEL, verified }, formula_terms: { available_context_tokens: 512 } },
    provenance: { graph_revision_id: "sha256:" + "c".repeat(64), sdk_versions: { rf: "1" } },
  },
  diagnostics: [],
});
const VERSION = { schema: "reactive-fiber.cli/v1", ok: true, command: "version", workspace: null, result: { version: "0.1.883", sdk_versions: { fiber_optics: "0.1.0" } }, diagnostics: [] };
const returning = (text: string, verified = true): RfExecutor => async argv => ({ stdout: JSON.stringify(argv.includes("--version") ? VERSION : envelope(text, verified)), stderr: "", exitCode: 0 });
// A producer that renders exactly the source text it was asked to render (the real task-grounded path).
const echoing: RfExecutor = async argv => {
  if (argv.includes("--version")) return { stdout: JSON.stringify(VERSION), stderr: "", exitCode: 0 };
  const asked = argv[argv.indexOf("--task") + 1];
  return { stdout: JSON.stringify(envelope(String(asked))), stderr: "", exitCode: 0 };
};
const identity = { rfWorkspaceId: "rfw_1", actor: "agent:camshaft-oe", cli: { version: "0.1.883", sdkVersions: {} } };
const refusedAs = (reason: string) => (e: unknown) => e instanceof Error && e.message === reason;

test("a render naming the task but not the requested source revision is RF_CONTEXT_UNESTABLISHED", async () => {
  const base = "a".repeat(40);
  await assert.rejects(() => renderTaskContext("/tmp/mw-rf", task, base, MODEL, returning("Task: " + task + "\n")), refusedAs(NO_CONTEXT));
});

test("a render of another revision r1 cannot serve requested revision r2, even when it names the task", async () => {
  const r2 = "a".repeat(40);
  await assert.rejects(() => renderTaskContext("/tmp/mw-rf", task, r2, MODEL, returning("Task: " + task + "\nSource revision: " + STALE + "\n")), refusedAs(NO_CONTEXT));
});

test("negative control: a render naming task and revision with a verified matching capability is accepted", async () => {
  const base = "a".repeat(40);
  const out = await renderTaskContext("/tmp/mw-rf", task, base, MODEL, echoing);
  assert.equal(out.basis.revision, base);
  assert.equal(out.model, MODEL);
  assert.equal(out.evidence?.id, "rfr-basis-1");
});

test("developLive refuses an RF render of a stale revision before the agent or Forge gate runs", () => withRepo(async root => {
  let calls = 0;
  await assert.rejects(() => developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: (cwd, t, revision, model) => renderTaskContext(cwd, t, revision, model, returning("Task: " + t + "\nSource revision: " + STALE + "\n")),
    agent: async () => { calls++; throw new Error("agent must not run"); },
    connectForge: (() => { calls++; throw new Error("must not connect"); }) as ConnectForge,
  }), refusedAs(NO_CONTEXT));
  assert.equal(calls, 0);
}));

test("developLive refuses a render whose basis revision differs from the scope revision, naming the disagreement", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  let calls = 0;
  await assert.rejects(() => developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: async (cwd, t, _revision, model) => ({
      basis: { workspaceId: cwd, revision: STALE }, text: "Task: " + t + "\nSource revision: " + base,
      evidence: { system: "reactive-fiber", kind: "render", id: "rfr-basis-2" }, model, availableTokens: 1,
      graphRevision: "graph-1", outputDigest: "sha256:" + "a".repeat(64), ...identity,
    }),
    agent: async () => { calls++; throw new Error("agent must not run"); },
    connectForge: (() => { calls++; throw new Error("must not connect"); }) as ConnectForge,
  }), refusedAs(DISAGREE));
  assert.equal(calls, 0);
}));

test("developLive refuses an injected render at the right basis whose text omits the current revision", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  let calls = 0;
  await assert.rejects(() => developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: async (cwd, t, _revision, model) => ({
      basis: { workspaceId: cwd, revision: base }, text: "Task: " + t + "\nSource revision: " + STALE,
      evidence: { system: "reactive-fiber", kind: "render", id: "rfr-basis-3" }, model, availableTokens: 1,
      graphRevision: "graph-1", outputDigest: "sha256:" + "a".repeat(64), ...identity,
    }),
    agent: async () => { calls++; throw new Error("agent must not run"); },
    connectForge: (() => { calls++; throw new Error("must not connect"); }) as ConnectForge,
  }), refusedAs(DISAGREE));
  assert.equal(calls, 0);
}));

test("negative control: developLive proceeds to implement and the Forge gate on a render of the current revision", () => withRepo(async root => {
  const seen: string[] = [];
  const out = await developLive(root, task, {
    contextMode: "rf", model: MODEL,
    renderContext: (cwd, t, revision, model) => renderTaskContext(cwd, t, revision, model, echoing),
    agent: async (_cwd, prompt) => {
      seen.push("agent");
      assert.match(prompt, /Source revision: [0-9a-f]{40}/);
      writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
      git(root, "add", "main.ts");
      git(root, "commit", "-qm", "implementation");
      return { sessionId: "session-basis", summary: "Changed parser", turns: 1, costUsd: 0.01 };
    },
    connectForge: (() => ({
      async initialize() { seen.push("forge.init"); return "compatible"; },
      async request() {
        seen.push("forge.gate");
        const head = git(root, "rev-parse", "HEAD");
        return { operation_id: "op-" + head.slice(0, 8), terminal_fact: "completed", status: "success",
          forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: head }, data: { gate_verdict: "PASS", gate_passed: true } } };
      },
      async close() { seen.push("forge.close"); },
    })) as ConnectForge,
  });
  assert.equal(out.context, "reactive-fiber");
  assert.equal(out.workflow.kind, "verified_candidate");
  assert.deepEqual(seen, ["agent", "forge.init", "forge.gate", "forge.close"]);
}));

test("a verified:false capability snapshot refuses the render before implement, as RF_CONTEXT_UNESTABLISHED", async () => {
  const base = "a".repeat(40);
  await assert.rejects(() => renderTaskContext("/tmp/mw-rf", task, base, MODEL, returning("Task: " + task + "\nSource revision: " + base + "\n", false)), refusedAs(NO_CONTEXT));
});

// MechanicalWorkflows-wco80: developLive binds one render idempotency key per invocation (or the host's own).
test("developLive hands renderContext one idempotency key: the host's when supplied, else a minted nonblank key", () => withRepo(async root => {
  const seen: Array<string | undefined> = [];
  const probe = async (_c: string, _t: string, _r: string, _m: string, _e?: RfExecutor, o?: { readonly idempotencyKey?: string }): Promise<never> => {
    seen.push(o?.idempotencyKey);
    throw new Error("probe stop");
  };
  const run = (extra: object) => developLive(root, task, {
    contextMode: "rf", model: MODEL, renderContext: probe as never,
    agent: async () => { throw new Error("agent must not run"); },
    connectForge: (() => { throw new Error("must not connect"); }) as ConnectForge, ...extra,
  }).catch(() => undefined);
  await run({ renderIdempotencyKey: "host-key-1" });
  await run({});
  await run({});
  assert.equal(seen[0], "host-key-1");
  assert.ok(typeof seen[1] === "string" && seen[1].trim() !== "" && seen[1] !== "host-key-1");
  assert.ok(typeof seen[2] === "string" && seen[2] !== seen[1], "a fresh invocation without a host key mints a fresh key");
}));
test("developLive reuses the one key across an in-invocation re-issue after a lost reply", () => withRepo(async root => {
  const argvs: string[][] = [];
  let n = 0;
  const lossy: RfExecutor = async argv => {
    argvs.push([...argv]);
    if (++n === 1) return { stdout: "", stderr: "lost", exitCode: 1, transport: "timeout" };
    return echoing(argv, root);
  };
  await developLive(root, task, {
    contextMode: "rf", model: MODEL, renderIdempotencyKey: "host-key-2",
    renderContext: (cwd, t, revision, model, _e, o) => renderTaskContext(cwd, t, revision, model, lossy, o),
    agent: async () => { throw new Error("stop after render"); },
    connectForge: (() => { throw new Error("must not connect"); }) as ConnectForge,
  }).catch(() => undefined);
  const renders = argvs.filter(argv => !argv.includes("--version"));
  assert.equal(renders.length, 2);
  assert.deepEqual(renders[0], renders[1]);
  assert.equal(argvs[0]![argvs[0]!.indexOf("--idempotency-key") + 1], "host-key-2");
}));
// MechanicalWorkflows-g00df (RFCA-MWX01-R002): the rf-mode cross-check gains the workspace-id and actor conjuncts.
test("developLive forwards rfActor to the render and proceeds only when the render actor matches it", () => withRepo(async root => {
  const seen: string[] = [];
  const out = await developLive(root, task, {
    contextMode: "rf", model: MODEL, rfActor: "agent:camshaft-oe",
    renderContext: (cwd, t, revision, model, _execute, renderOptions) => {
      assert.equal(renderOptions?.actor, "agent:camshaft-oe");
      assert.ok(renderOptions?.idempotencyKey);
      return renderTaskContext(cwd, t, revision, model, echoing, renderOptions);
    },
    agent: async (_cwd, _prompt) => { seen.push("agent"); throw new Error("stop after context"); },
    connectForge: (() => { throw new Error("must not connect"); }) as ConnectForge,
  }).catch((e: unknown) => e);
  assert.ok(out instanceof Error);
  assert.match(out.message, /stop after context/);
  assert.deepEqual(seen, ["agent"]);
}));
test("developLive refuses a render whose actor differs from the requested rfActor or whose workspace id is not rfw_", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  for (const [patch, rfActor] of [[{ actor: "user:other" }, "agent:camshaft-oe"], [{ rfWorkspaceId: "ws-1" }, undefined], [{ actor: "" }, undefined]] as const) {
    let calls = 0;
    await assert.rejects(() => developLive(root, task, {
      contextMode: "rf", model: MODEL, ...(rfActor === undefined ? {} : { rfActor }),
      renderContext: async (cwd, t, _revision, model) => ({
        basis: { workspaceId: cwd, revision: base }, text: "Task: " + t + "\nSource revision: " + base,
        evidence: { system: "reactive-fiber", kind: "render", id: "rfr-basis-4" }, model, availableTokens: 1,
        graphRevision: "graph-1", outputDigest: "sha256:" + "a".repeat(64), ...identity, ...patch,
      }),
      agent: async () => { calls++; throw new Error("agent must not run"); },
      connectForge: (() => { calls++; throw new Error("must not connect"); }) as ConnectForge,
    }), refusedAs(DISAGREE), JSON.stringify(patch));
    assert.equal(calls, 0);
  }
}));
