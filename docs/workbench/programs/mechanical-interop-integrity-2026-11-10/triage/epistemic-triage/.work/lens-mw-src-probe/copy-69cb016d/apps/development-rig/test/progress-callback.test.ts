import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { developLive } from "../dist/live-development.js";
import { receiptOf } from "../dist/receipt.js";
import { PROGRAM_STAGES, RIG_RECEIPT_STAGES, STAGE_MAP, assertKnownProgressStage, type ProgressEvent } from "../dist/progress-stages.js";
import type { ConnectForge } from "../dist/live-gate.js";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-progress-"));
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
function commitChange(root: string): string {
  writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
  return git(root, "rev-parse", "HEAD");
}
function frame(commit: string, status = "success"): Record<string, unknown> {
  return {
    operation_id: "op-" + commit.slice(0, 8), terminal_fact: status === "success" ? "completed" : "failed", status,
    forge_result: { status, envelope: { disposition: status === "success" ? "SUCCEEDED" : "FAILED", gated_commit: commit },
      data: { gate_verdict: status === "success" ? "PASS" : "FAIL", gate_passed: status === "success" } },
  };
}
function forge(root: string, status = "success"): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request() { return frame(git(root, "rev-parse", "HEAD"), status); },
    async close() { /* nothing to release */ },
  });
}
const session = { sessionId: "session-42", summary: "Changed parser", turns: 2, costUsd: 0.04 };

test("EAT-R015: a happy-path run records the seven stages in exactly the documented order with a non-null disposition each", () => withRepo(async root => {
  const events: ProgressEvent[] = [];
  const result = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: event => { events.push(event); },
  });
  assert.equal(result.workflow.kind, "verified_candidate");
  assert.deepEqual(events.map(e => e.stage), [...PROGRAM_STAGES]);
  assert.deepEqual([...PROGRAM_STAGES], ["discovery", "context", "sdk_startup", "first_edit", "commit", "gate_dispatch", "settlement"]);
  for (const event of events) {
    assert.ok(event.disposition === "none" || event.disposition === "uncertain" || event.disposition === "settled", event.stage);
    assert.equal(event.rigStage, STAGE_MAP[event.stage]);
  }
  assert.deepEqual(events.map(e => e.disposition), ["none", "none", "uncertain", "uncertain", "uncertain", "uncertain", "settled"]);
}));

test("EAT-R015: each event carries the latest native refs known at that stage and never a later one", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const events: ProgressEvent[] = [];
  let candidate = "";
  await developLive(root, "Improve parser", {
    agent: async () => { candidate = commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: event => { events.push(event); },
  });
  const by = Object.fromEntries(events.map(e => [e.stage, e.refs]));
  assert.equal(by["discovery"]?.baseCommit, base);
  assert.equal(by["context"]?.baseCommit, base);
  assert.equal(by["sdk_startup"]?.agentSessionId, null);
  assert.equal(by["commit"]?.agentSessionId, "session-42");
  assert.equal(by["commit"]?.candidateCommit, candidate);
  assert.equal(by["commit"]?.forgeOperationId, null);
  assert.equal(by["gate_dispatch"]?.forgeOperationId, null);
  assert.equal(by["settlement"]?.forgeOperationId, "op-" + candidate.slice(0, 8));
  assert.equal(by["settlement"]?.candidateCommit, candidate);
}));

test("EAT-R015: first_edit comes from the agent stream when the runner reports it and from the host Git diff when it does not, exactly once either way", () => withRepo(async root => {
  const viaStream: ProgressEvent[] = [];
  await developLive(root, "Improve parser", {
    agent: async (_cwd, _prompt, options) => { options.onFirstEdit?.(); options.onFirstEdit?.(); commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: event => { viaStream.push(event); },
  });
  const streamEdits = viaStream.filter(e => e.stage === "first_edit");
  assert.equal(streamEdits.length, 1);
  assert.equal(streamEdits[0]?.observedVia, "agent-stream");
  git(root, "reset", "-q", "--hard", "HEAD~1");
  const viaGit: ProgressEvent[] = [];
  await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: event => { viaGit.push(event); },
  });
  const gitEdits = viaGit.filter(e => e.stage === "first_edit");
  assert.equal(gitEdits.length, 1);
  assert.equal(gitEdits[0]?.observedVia, "host-git-diff");
  assert.deepEqual(viaGit.map(e => e.stage), [...PROGRAM_STAGES]);
}));

test("EAT-R015: a failed gate still settles and an unattributable gate stays uncertain", () => withRepo(async root => {
  const failed: ProgressEvent[] = [];
  const result = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: forge(root, "error"),
    onProgress: event => { failed.push(event); },
  });
  assert.equal(result.workflow.kind, "verification_failed");
  assert.equal(failed.at(-1)?.stage, "settlement");
  assert.equal(failed.at(-1)?.disposition, "settled");
  git(root, "reset", "-q", "--hard", "HEAD~1");
  const unknown: ProgressEvent[] = [];
  await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: () => ({
      async initialize() { return "compatible"; },
      async request() { return frame("0".repeat(40)); },
      async close() { /* nothing to release */ },
    }),
    onProgress: event => { unknown.push(event); },
  });
  assert.equal(unknown.at(-1)?.stage, "settlement");
  assert.equal(unknown.at(-1)?.disposition, "uncertain");
}));

test("EAT-R015: a refusal before dispatch emits no stage past the one reached, and an already-aborted signal emits none", () => withRepo(async root => {
  const controller = new AbortController();
  controller.abort();
  const none: ProgressEvent[] = [];
  await assert.rejects(developLive(root, "Improve parser", {
    signal: controller.signal, agent: async () => { throw new Error("must not run"); }, onProgress: event => { none.push(event); },
  }), /DEVELOPMENT_CANCELLED_BEFORE_DISPATCH/);
  assert.deepEqual(none, []);
  const reached: ProgressEvent[] = [];
  await assert.rejects(developLive(root, "Improve parser", {
    agent: async () => { throw new Error("AGENT_REFUSED_FOR_TEST"); }, onProgress: event => { reached.push(event); },
  }), /AGENT_REFUSED_FOR_TEST/);
  assert.deepEqual(reached.map(e => e.stage), ["discovery", "context", "sdk_startup"]);
}));

test("EAT-R015: a throwing or rejecting callback never changes the development outcome", () => withRepo(async root => {
  const result = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: () => { throw new Error("observer bug"); },
  });
  assert.equal(result.workflow.kind, "verified_candidate");
  git(root, "reset", "-q", "--hard", "HEAD~1");
  const again = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return session; },
    connectForge: forge(root),
    onProgress: () => Promise.reject(new Error("async observer bug")),
  });
  assert.equal(again.workflow.kind, "verified_candidate");
}));

test("EAT-R015: the stage map names only receipt stages and covers every program stage", () => withRepo(async root => {
  const result = await developLive(root, "Improve parser", { agent: async () => { commitChange(root); return session; }, connectForge: forge(root) });
  const receiptStages = Object.keys(receiptOf(result).stages).sort();
  assert.deepEqual([...RIG_RECEIPT_STAGES].sort(), receiptStages, "the rig vocabulary equals the receipt's stage keys");
  assert.deepEqual(Object.keys(STAGE_MAP).sort(), [...PROGRAM_STAGES].sort());
  for (const stage of PROGRAM_STAGES) assert.ok((RIG_RECEIPT_STAGES as readonly string[]).includes(STAGE_MAP[stage]), stage);
}));

test("EAT-R015: a stage in neither vocabulary is refused by name", () => {
  assert.throws(() => assertKnownProgressStage("rollback"), /PROGRESS_STAGE_UNKNOWN: rollback is in neither the program nor the rig receipt vocabulary/);
  assert.throws(() => assertKnownProgressStage("agent"), /PROGRESS_STAGE_UNKNOWN: agent/, "a receipt stage name alone is not a program stage");
  for (const stage of PROGRAM_STAGES) assert.doesNotThrow(() => assertKnownProgressStage(stage));
});

test("EAT-R015: every stage literal live-development emits is in the program vocabulary and all seven are emitted", () => {
  const source = readFileSync(join(repoRoot, "apps", "development-rig", "src", "live-development.ts"), "utf8");
  const emitted = [...source.matchAll(/emitProgress\("([a-z_]+)"/g)].map(m => m[1] as string);
  assert.ok(emitted.length >= PROGRAM_STAGES.length);
  for (const stage of emitted) assert.ok((PROGRAM_STAGES as readonly string[]).includes(stage), "emitted outside the vocabulary: " + stage);
  for (const stage of PROGRAM_STAGES) assert.ok(emitted.includes(stage), "never emitted: " + stage);
});

test("EAT-R015: docs/06 commits the stage mapping table and it equals STAGE_MAP row for row", () => {
  const docs = readFileSync(join(repoRoot, "docs", "06-sdk-integration-and-hosts.md"), "utf8");
  const rows = [...docs.matchAll(/^\| `([a-z_]+)` \| `([a-z]+)` \|/gm)].map(m => [m[1], m[2]] as const);
  assert.deepEqual(Object.fromEntries(rows), STAGE_MAP);
  assert.equal(rows.length, PROGRAM_STAGES.length);
});

test("EAT-R015: a caller-supplied onFirstEdit is chained after the host progress event on the first stream edit and cannot fail the run", () => withRepo(async root => {
  const order: string[] = [];
  const events: ProgressEvent[] = [];
  await developLive(root, "Improve parser", {
    agent: async (_cwd, _prompt, options) => { options.onFirstEdit?.(); commitChange(root); return session; },
    connectForge: forge(root),
    onFirstEdit: () => { order.push("caller:" + events.filter(e => e.stage === "first_edit").length); throw new Error("observer bug"); },
    onProgress: event => { events.push(event); },
  });
  assert.deepEqual(order, ["caller:1"], "the host event came first; the caller hook follows the first stream edit");
  assert.equal(events.filter(e => e.stage === "first_edit").length, 1);
}));

test("EAT-R015: a caller-supplied onFirstEdit that returns a rejecting promise settles quietly and cannot fail the run (HR-S4-D1)", () => withRepo(async root => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown): void => { unhandled.push(reason); };
  process.on("unhandledRejection", onUnhandled);
  try {
    const calls: string[] = [];
    const events: ProgressEvent[] = [];
    await developLive(root, "Improve parser", {
      agent: async (_cwd, _prompt, options) => { options.onFirstEdit?.(); commitChange(root); return session; },
      connectForge: forge(root),
      // A () => void field accepts an async function; its rejection must not escape the chain.
      onFirstEdit: (async () => { calls.push("caller"); throw new Error("async observer bug"); }) as () => void,
      onProgress: event => { events.push(event); },
    });
    await new Promise<void>(resolve => setImmediate(resolve));
    await new Promise<void>(resolve => setImmediate(resolve));
    assert.deepEqual(calls, ["caller"]);
    assert.deepEqual(unhandled, [], "no unhandled rejection reaches the process");
    assert.equal(events.filter(e => e.stage === "first_edit").length, 1);
    assert.equal(events.at(-1)?.stage, "settlement");
  } finally { process.off("unhandledRejection", onUnhandled); }
}));
