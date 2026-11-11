import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import { DevelopmentAbortedAfterDispatchError, type PostDispatchUncertainty } from "../dist/post-dispatch-abort.js";
import { runClaudeImplementation } from "../dist/claude-implement.js";
import type { ConnectForge } from "../dist/live-gate.js";

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-abort-"));
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
function commitChange(root: string, content = "export const value = 2;\n"): string {
  writeFileSync(join(root, "main.ts"), content);
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
  return git(root, "rev-parse", "HEAD");
}
const OPERATION = "op-forge-operation-0001";
function frame(commit: string): Record<string, unknown> {
  return {
    operation_id: OPERATION, terminal_fact: "completed", status: "success",
    forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: commit }, data: { gate_verdict: "PASS", gate_passed: true } },
  };
}
/** Counts every Forge connection and gate request; onRequest runs inside the dispatched gate. */
function forge(root: string, seen: string[], onRequest: () => void = () => {}): ConnectForge {
  return () => ({
    async initialize() { seen.push("forge.init"); return "compatible"; },
    async request() { seen.push("forge.gate"); onRequest(); return frame(git(root, "rev-parse", "HEAD")); },
    async close() { seen.push("forge.close"); },
  });
}
const SESSION = "session-abort-1";
function uncertaintyOf(error: unknown): PostDispatchUncertainty {
  assert.ok(error instanceof DevelopmentAbortedAfterDispatchError, "typed post-dispatch abort error, got " + String(error));
  assert.match(error.message, /^DEVELOPMENT_ABORTED_AFTER_DISPATCH: /);
  // The abort is an acknowledgement, never a rollback, and never a pre-dispatch refusal.
  assert.doesNotMatch(error.message, /CANCELLED_BEFORE_DISPATCH|rolled back|reverted|undone/i);
  const u = error.uncertainty;
  assert.equal(u.marker, "UNCERTAIN_AFTER_ABORT");
  assert.equal(u.rollback, "not-attempted");
  assert.equal(u.reconciliationRequired, true);
  return u;
}
async function refusal(run: () => Promise<unknown>): Promise<PostDispatchUncertainty> {
  try { await run(); } catch (error) { return uncertaintyOf(error); }
  assert.fail("expected a typed post-dispatch abort refusal");
}

test("(a) abort during agent edits: the refusal names worktree, base, session and uncertainty, and the dirty bytes survive", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const seen: string[] = []; const controller = new AbortController();
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async (_cwd, _prompt, options) => {
      writeFileSync(join(root, "main.ts"), "uncommitted\n");
      writeFileSync(join(root, "scratch.txt"), "half written\n");
      controller.abort();
      assert.equal(options.signal?.aborted, true, "the agent observes the host signal mid-run");
      throw Object.assign(new Error("agent observed abort"), { sessionId: SESSION });
    },
    connectForge: forge(root, seen),
  }));
  assert.equal(u.phase, "during-agent-edits");
  assert.equal(u.worktree, root);
  assert.equal(u.gitRef.baseCommit, base);
  assert.equal(u.gitRef.headCommit, base);
  assert.equal(u.sessionId, SESSION);
  assert.equal(u.forgeOperationId, null);
  assert.equal(u.forgeDispatched, false);
  assert.equal(u.committedNotGated, false);
  assert.equal(u.agentIgnoredAbort, false);
  assert.deepEqual([...(u.dirtyPaths ?? [])].sort(), ["main.ts", "scratch.txt"]);
  // Recoverable: nothing was cleaned, reset or checked out.
  assert.equal(readFileSync(join(root, "main.ts"), "utf8"), "uncommitted\n");
  assert.equal(readFileSync(join(root, "scratch.txt"), "utf8"), "half written\n");
  assert.match(git(root, "status", "--porcelain"), /main\.ts/);
  assert.deepEqual(seen, [], "no Forge connection after an abort during edits");
}));

test("(a') an agent that fails for a reason other than the abort keeps its own refusal untouched", () => withRepo(async root => {
  const controller = new AbortController();
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { throw new Error("AGENT_OUTCOME_NOT_ESTABLISHED: boom"); },
    connectForge: forge(root, []),
  }), (error: Error) => {
    assert.equal(error instanceof DevelopmentAbortedAfterDispatchError, false);
    assert.match(error.message, /AGENT_OUTCOME_NOT_ESTABLISHED/);
    return true;
  });
}));

test("(a'') the non-abort dirty refusal keeps the uncommitted bytes on disk", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { writeFileSync(join(root, "main.ts"), "uncommitted\n"); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: () => { gates++; throw Error("must not connect"); },
  }), /WORKSPACE_NOT_CLEAN/);
  assert.equal(gates, 0);
  assert.equal(readFileSync(join(root, "main.ts"), "utf8"), "uncommitted\n");
  assert.match(git(root, "status", "--porcelain"), /M main\.ts/);
}));

test("(b) abort between the agent commit and Forge: the commit is committed-not-gated and Forge is never dispatched", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const seen: string[] = []; const controller = new AbortController();
  let commit = "";
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    // The agent finishes normally and commits; the host abort lands before the reviewer/Forge step.
    agent: async () => { commit = commitChange(root); queueMicrotask(() => controller.abort()); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    reviewer: async (workspace, revision) => {
      seen.push("review");
      return { basis: { workspaceId: workspace, revision }, verdict: "approved", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "review-1" } } as never;
    },
    connectForge: forge(root, seen),
  }));
  assert.equal(u.phase, "committed-not-gated");
  assert.equal(u.committed, true);
  assert.equal(u.committedNotGated, true);
  assert.equal(u.gitRef.baseCommit, base);
  assert.equal(u.gitRef.headCommit, commit);
  assert.equal(u.sessionId, SESSION);
  assert.equal(u.forgeOperationId, null);
  assert.equal(u.forgeDispatched, false);
  assert.deepEqual(seen, [], "neither review nor Forge dispatched after the abort");
  assert.equal(git(root, "rev-parse", "HEAD"), commit, "the commit is left in place, not reset");
}));

test("(b') abort raised while the reviewer runs reports committed-not-gated and never dispatches Forge", () => withRepo(async root => {
  const seen: string[] = []; const controller = new AbortController();
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    reviewer: async () => { controller.abort(); throw new Error("review interrupted"); },
    connectForge: forge(root, seen),
  }));
  assert.equal(u.phase, "committed-not-gated");
  assert.equal(u.committedNotGated, true);
  assert.equal(u.agentIgnoredAbort, false, "the host saw the signal unaborted when the agent returned, so the agent ignored nothing");
  assert.deepEqual(seen, []);
}));

test("(b'') abort after the reviewer returns but before Forge dispatches nothing", () => withRepo(async root => {
  const seen: string[] = []; const controller = new AbortController();
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    reviewer: async (workspace, revision) => {
      controller.abort();
      return { basis: { workspaceId: workspace, revision }, verdict: "approved", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "review-1" } } as never;
    },
    connectForge: forge(root, seen),
  }));
  assert.equal(u.phase, "committed-not-gated");
  assert.equal(u.agentIgnoredAbort, false, "the host saw the signal unaborted when the agent returned, so the agent ignored nothing");
  assert.deepEqual(seen, []);
}));

test("(c) abort after Forge dispatch: exactly one gate request, the operation id is preserved, nothing is credited", () => withRepo(async root => {
  const seen: string[] = []; const controller = new AbortController();
  let agentRuns = 0; let commit = "";
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { agentRuns++; commit = commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: forge(root, seen, () => controller.abort()),
  }));
  assert.equal(u.phase, "after-forge-dispatch");
  assert.equal(u.forgeDispatched, true);
  assert.equal(u.forgeOperationId, OPERATION);
  assert.equal(u.sessionId, SESSION);
  assert.equal(u.gitRef.headCommit, commit);
  assert.equal(u.committedNotGated, false, "the commit reached a Forge dispatch");
  assert.equal(u.agentIgnoredAbort, false, "the host saw the signal unaborted when the agent returned, so the agent ignored nothing");
  assert.equal(seen.filter(s => s === "forge.gate").length, 1, "no second Forge dispatch");
  assert.equal(agentRuns, 1, "no agent re-run");
}));

test("(c') an abort-induced Forge transport failure still reports after-forge-dispatch with no operation id invented", () => withRepo(async root => {
  const seen: string[] = []; const controller = new AbortController();
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: () => ({
      async initialize() { seen.push("forge.init"); return "compatible"; },
      async request() { seen.push("forge.gate"); controller.abort(); throw new Error("transport aborted"); },
      async close() { seen.push("forge.close"); },
    }),
  }));
  assert.equal(u.phase, "after-forge-dispatch");
  assert.equal(u.forgeDispatched, true);
  assert.equal(u.forgeOperationId, null);
  assert.equal(seen.filter(s => s === "forge.gate").length, 1);
  assert.equal(u.agentIgnoredAbort, false, "an abort during the Forge request is not an ignored abort");
}));

test("(d) adversarial: an agent that ignores the abort and commits anyway is reported as having committed under requested cancellation", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const seen: string[] = []; const controller = new AbortController();
  let commit = "";
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async (_cwd, _prompt, options) => {
      controller.abort();
      assert.equal(options.signal?.aborted, true);
      commit = commitChange(root); // ignores the signal entirely
      return { sessionId: SESSION, summary: "committed anyway", turns: 1, costUsd: 0 };
    },
    connectForge: forge(root, seen),
  }));
  assert.equal(u.phase, "committed-not-gated");
  assert.equal(u.agentIgnoredAbort, true);
  assert.equal(u.committed, true);
  assert.equal(u.gitRef.baseCommit, base);
  assert.equal(u.gitRef.headCommit, commit);
  assert.equal(u.sessionId, SESSION);
  assert.deepEqual(seen, [], "the ignored abort never reaches Forge");
}));

test("(d') an ignore-abort agent that wrote but did not commit leaves the dirty file and reports during-agent-edits", () => withRepo(async root => {
  const controller = new AbortController();
  const u = await refusal(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { controller.abort(); writeFileSync(join(root, "extra.ts"), "export {};\n"); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: forge(root, []),
  }));
  assert.equal(u.phase, "during-agent-edits");
  assert.equal(u.agentIgnoredAbort, true);
  assert.deepEqual(u.dirtyPaths, ["extra.ts"]);
  assert.equal(existsSync(join(root, "extra.ts")), true);
}));

test("(e) an unaborted signal leaves basis-drift and subject-change refusals exactly as before", () => withRepo(async root => {
  const controller = new AbortController();
  // SOURCE_BASIS_CHANGED family: a commit landing between the initial basis read and discovery.
  const result = await developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: () => ({
      async initialize() { return "compatible"; },
      async request() { commitChange(root, "export const value = 3;\n"); return frame(git(root, "rev-parse", "HEAD")); },
      async close() {},
    }),
  });
  assert.equal(result.workflow.kind, "indeterminate", "VERIFICATION_SUBJECT_CHANGED family preserved");
  assert.notEqual(result.forge?.kind, "passed");
  assert.equal(controller.signal.aborted, false);
}));

test("(e') after an async wait with an unaborted signal, a missing commit keeps AGENT_COMMIT_NOT_ESTABLISHED and gates nothing", () => withRepo(async root => {
  const seen: string[] = [];
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { await new Promise(resolve => setTimeout(resolve, 20)); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: forge(root, seen),
  }), (error: Error) => {
    assert.equal(error instanceof DevelopmentAbortedAfterDispatchError, false);
    assert.match(error.message, /AGENT_COMMIT_NOT_ESTABLISHED/);
    return true;
  });
  assert.deepEqual(seen, []);
}));

test("a clean end-to-end flow with an unaborted signal is unchanged and exposes no uncertainty", () => withRepo(async root => {
  const seen: string[] = [];
  const result = await developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { commitChange(root); return { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 }; },
    connectForge: forge(root, seen),
  });
  assert.equal(result.workflow.kind, "verified_candidate");
  assert.deepEqual(seen, ["forge.init", "forge.gate", "forge.close"]);
}));

type Sdk = { query: (input: unknown) => AsyncIterable<unknown> };
test("a runner whose SDK stream is interrupted by the host abort throws an error carrying the last seen session id", async () => {
  const controller = new AbortController();
  const sdk: Sdk = { query: () => (async function* () {
    yield { type: "system", session_id: "sess-from-init" };
    controller.abort();
    yield { type: "assistant", session_id: "sess-from-init" };
    yield { type: "result", subtype: "success", is_error: false, session_id: "sess-from-init", result: "done" };
  })() };
  await assert.rejects(() => runClaudeImplementation("/r", "p", { signal: controller.signal }, async () => sdk), (error: Error & { sessionId?: unknown }) => {
    assert.match(error.message, /^AGENT_ABORTED_DURING_RUN: /);
    assert.equal(error.sessionId, "sess-from-init");
    assert.doesNotMatch(error.message, /rolled back|reverted|undone/i);
    return true;
  });
});
test("a runner whose SDK stream throws after the abort carries the session id seen so far; without an abort the failure is untouched", async () => {
  const controller = new AbortController();
  const failing = (abort: boolean): Sdk => ({ query: () => (async function* () {
    yield { type: "system", session_id: "sess-2" };
    if (abort) controller.abort();
    throw new Error("stream died");
  })() });
  await assert.rejects(() => runClaudeImplementation("/r", "p", { signal: controller.signal }, async () => failing(true)),
    (error: Error & { sessionId?: unknown }) => error.sessionId === "sess-2" && /AGENT_ABORTED_DURING_RUN/.test(error.message));
  await assert.rejects(() => runClaudeImplementation("/r", "p", { signal: new AbortController().signal }, async () => failing(false)),
    (error: Error & { sessionId?: unknown }) => error.message === "stream died" && error.sessionId === undefined);
});
