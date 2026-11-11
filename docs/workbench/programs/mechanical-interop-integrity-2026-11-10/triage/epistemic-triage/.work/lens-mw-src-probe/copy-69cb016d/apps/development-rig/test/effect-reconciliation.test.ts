import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import { DevelopmentAbortedAfterDispatchError, type GitText } from "../dist/post-dispatch-abort.js";
import {
  DevelopmentLostAcknowledgementError, reconcileUncertainEffect,
  type LostAckEffect, type LostAckUncertainty, type ReconcileRecord, type ReconcileSources,
} from "../dist/effect-reconciliation.js";
import type { ConnectForge } from "../dist/live-gate.js";

// EAT-R045 / EAT-R136 / EAT-R163: no blind retry after a lost acknowledgement. The claim effect kind is pinned by
// beads-claim.test.ts (MechanicalWorkflows-5qmm: a lost claim acknowledgement never triggers a second update); it is cited, not re-tested.

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-lostack-"));
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
const SESSION = "session-lostack-1";
const AGENT_OK = { sessionId: SESSION, summary: "", turns: 1, costUsd: 0 };

interface Counters { runner: number; forgeConnects: number; forgeGates: number }
function counters(): Counters { return { runner: 0, forgeConnects: 0, forgeGates: 0 }; }
/** Zero automatic retry: every invocation counter stays at or below one. Exported shape of the negative control (e). */
function assertZeroRetry(c: Counters): void {
  assert.ok(c.runner <= 1, "the writer runner ran " + c.runner + " times");
  assert.ok(c.forgeGates <= 1, "Forge received " + c.forgeGates + " gate requests");
  assert.ok(c.forgeConnects <= 1, "Forge was connected " + c.forgeConnects + " times");
}
/** A Forge connection whose gate request is dispatched (counted) and then loses its response. */
function lossyForge(c: Counters): ConnectForge {
  return () => {
    c.forgeConnects++;
    return {
      async initialize() { return "compatible"; },
      async request() { c.forgeGates++; throw new Error("transport lost the acknowledgement"); },
      async close() {},
    };
  };
}
function lostAckOf(error: unknown, effect: LostAckEffect): LostAckUncertainty {
  assert.ok(error instanceof DevelopmentLostAcknowledgementError, "typed lost acknowledgement, got " + String(error));
  assert.equal(error instanceof DevelopmentAbortedAfterDispatchError, false, "no abort was requested");
  assert.match(error.message, /^DEVELOPMENT_LOST_ACKNOWLEDGEMENT: outcome UNCERTAIN, no rollback attempted, no retry attempted/);
  assert.match(error.message, /reconciliation required before any agent re-run or Forge dispatch/);
  assert.doesNotMatch(error.message, /rolled back|reverted|undone/i);
  const u = error.uncertainty;
  assert.equal(u.marker, "UNCERTAIN_AFTER_LOST_ACK");
  assert.equal(u.effect, effect);
  assert.equal(u.rollback, "not-attempted");
  assert.equal(u.reconciliationRequired, true);
  return u;
}
async function lost(effect: LostAckEffect, run: () => Promise<unknown>): Promise<LostAckUncertainty> {
  try { await run(); } catch (error) { return lostAckOf(error, effect); }
  assert.fail("expected a typed lost acknowledgement");
}

test("(a) writer lost ack: an agent that commits then throws, with no abort, settles as typed uncertainty and the commit survives", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD"); const c = counters(); let commit = "";
  const u = await lost("writer", () => developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { c.runner++; commit = commitChange(root); throw Object.assign(new Error("ack lost after commit"), { sessionId: SESSION }); },
    connectForge: () => { c.forgeConnects++; throw new Error("must not connect"); },
  }));
  assert.equal(u.phase, "committed-not-gated");
  assert.equal(u.committed, true);
  assert.equal(u.gitRef.baseCommit, base);
  assert.equal(u.gitRef.headCommit, commit);
  assert.equal(u.sessionId, SESSION);
  assert.equal(u.forgeDispatched, false);
  assert.equal(u.forgeOperationId, null);
  assert.deepEqual(u.dirtyPaths, []);
  assert.equal(c.runner, 1);
  assert.equal(c.forgeConnects, 0);
  assert.equal(git(root, "rev-parse", "HEAD"), commit, "HEAD preserved");
  assert.equal(readFileSync(join(root, "main.ts"), "utf8"), "export const value = 2;\n", "the committed bytes stay on disk");
  assertZeroRetry(c);
}));

test("(a2) writer lost ack with uncommitted edits keeps the dirty bytes and lists the paths", () => withRepo(async root => {
  const c = counters();
  const u = await lost("writer", () => developLive(root, "Change parser", {
    agent: async () => { c.runner++; writeFileSync(join(root, "main.ts"), "half written\n"); throw new Error("ack lost mid-edit"); },
    connectForge: lossyForge(c),
  }));
  assert.equal(u.phase, "during-agent-edits");
  assert.equal(u.committed, false);
  assert.deepEqual(u.dirtyPaths, ["main.ts"]);
  assert.equal(readFileSync(join(root, "main.ts"), "utf8"), "half written\n");
  assert.equal(c.forgeConnects, 0);
  assertZeroRetry(c);
}));

test("(a') an agent that throws with NO side effect keeps its own refusal untouched (not a lost ack)", () => withRepo(async root => {
  const c = counters();
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { c.runner++; throw new Error("AGENT_OUTCOME_NOT_ESTABLISHED: boom"); },
    connectForge: lossyForge(c),
  }), (error: Error) => {
    assert.equal(error instanceof DevelopmentLostAcknowledgementError, false);
    assert.match(error.message, /AGENT_OUTCOME_NOT_ESTABLISHED/);
    return true;
  });
  assertZeroRetry(c);
}));

test("(b) gate lost ack: the gate request is dispatched once, its response never arrives, and no second dispatch happens", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD"); const c = counters(); let commit = "";
  const u = await lost("gate", () => developLive(root, "Change parser", {
    signal: new AbortController().signal,
    agent: async () => { c.runner++; commit = commitChange(root); return AGENT_OK; },
    connectForge: lossyForge(c),
  }));
  assert.equal(u.phase, "after-forge-dispatch");
  assert.equal(u.forgeDispatched, true);
  assert.equal(u.forgeOperationId, null, "no operation id is invented");
  assert.equal(u.gitRef.baseCommit, base);
  assert.equal(u.gitRef.headCommit, commit);
  assert.equal(u.sessionId, SESSION);
  assert.equal(u.committedNotGated, false, "the commit reached a Forge dispatch");
  assert.equal(c.forgeGates, 1, "exactly one gate request");
  assert.equal(c.runner, 1);
  assertZeroRetry(c);
}));

test("(b') a Forge connection that fails BEFORE any request keeps its own refusal (no dispatch to lose)", () => withRepo(async root => {
  const c = counters();
  await assert.rejects(() => developLive(root, "Change parser", {
    agent: async () => { c.runner++; commitChange(root); return AGENT_OK; },
    connectForge: () => { c.forgeConnects++; return { async initialize() { throw new Error("FORGE_SPAWN_FAILED"); }, async request() { c.forgeGates++; return {}; }, async close() {} }; },
  }), (error: Error) => {
    assert.equal(error instanceof DevelopmentLostAcknowledgementError, false);
    assert.match(error.message, /FORGE_SPAWN_FAILED/);
    return true;
  });
  assert.equal(c.forgeGates, 0);
  assertZeroRetry(c);
}));

// (c) the reconcile decision point, parameterized over the effect kind (EAT-R136).
const EFFECTS: readonly LostAckEffect[] = ["writer", "gate"];
function recordFor(effect: LostAckEffect, worktree: string, base: string, forgeOperationId: string | null = null): ReconcileRecord {
  return { effect, worktree, gitRef: { baseCommit: base }, forgeOperationId };
}
const gitUnavailable: GitText = async () => null;
const forgeSeen: string[] = [];

for (const effect of EFFECTS) {
  test(`(c) reconcile ${effect}: the native record proves occurrence, so disposition is occurred and retry is not permitted`, () => withRepo(async root => {
    const base = git(root, "rev-parse", "HEAD"); const commit = commitChange(root);
    const sources: ReconcileSources = {
      git: async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; },
      forgeOperation: async id => { forgeSeen.push(String(id)); return { found: true, id: "op-forge-found-1" }; },
    };
    const result = await reconcileUncertainEffect(recordFor(effect, root, base, "op-forge-found-1"), sources);
    assert.equal(result.effect, effect);
    assert.equal(result.disposition, "occurred");
    assert.equal(result.retryPermitted, false);
    assert.deepEqual(result.evidence, effect === "writer" ? { system: "git", kind: "commit", id: commit } : { system: "forge", kind: "operation", id: "op-forge-found-1" });
  }));

  test(`(c) reconcile ${effect}: unavailable or inconclusive sources give unknown and no retry permission`, () => withRepo(async root => {
    const base = git(root, "rev-parse", "HEAD");
    const unavailable = await reconcileUncertainEffect(recordFor(effect, root, base), { git: gitUnavailable, forgeOperation: async () => null });
    assert.deepEqual(unavailable, { effect, disposition: "unknown", retryPermitted: false, evidence: null });
    const real: GitText = async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; };
    const nullLookup = await reconcileUncertainEffect(recordFor(effect, root, base), { git: effect === "writer" ? gitUnavailable : real, forgeOperation: async () => null });
    assert.equal(nullLookup.disposition, "unknown");
    assert.equal(nullLookup.retryPermitted, false);
    assert.equal(nullLookup.evidence, null);
    // A lookup that throws, a blank record id and a missing lookup are all inconclusive, never a permission.
    for (const forgeOperation of [async () => { throw new Error("forge store offline"); }, async () => ({ found: false, id: "  " }), undefined] as const) {
      const r = await reconcileUncertainEffect(recordFor("gate", root, base), { git: real, ...(forgeOperation ? { forgeOperation } : {}) });
      assert.equal(r.disposition, "unknown");
      assert.equal(r.retryPermitted, false);
      assert.equal(r.evidence, null);
    }
  }));

  test(`(c) reconcile ${effect}: retry is permitted only on a cited authoritative non-occurrence record, and the result cites that record id`, () => withRepo(async root => {
    const base = git(root, "rev-parse", "HEAD");
    const real: GitText = async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; };
    const lookups: Array<{ id: string | null; commit: string }> = [];
    const result = await reconcileUncertainEffect(recordFor(effect, root, base), {
      git: real,
      forgeOperation: async (id, subject) => { lookups.push({ id, commit: subject.commit }); return { found: false, id: "op-forge-absent-7" }; },
    });
    assert.equal(result.disposition, "not-occurred");
    assert.equal(result.retryPermitted, true);
    assert.ok(result.evidence !== null);
    if (effect === "gate") {
      assert.deepEqual(result.evidence, { system: "forge", kind: "operation", id: "op-forge-absent-7" });
      assert.deepEqual(lookups, [{ id: null, commit: base }], "the lookup receives the subject commit, not a fabricated operation id");
    } else {
      assert.deepEqual(result.evidence, { system: "git", kind: "head-at-base-clean-worktree", id: base });
      assert.deepEqual(lookups, [], "the writer decision reads Git only");
    }
  }));
}

test("(c2) reconcile writer: dirty paths at the base are an occurred effect; an unreadable status stays unknown", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  writeFileSync(join(root, "extra.ts"), "export {};\n");
  const real: GitText = async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; };
  const dirty = await reconcileUncertainEffect(recordFor("writer", root, base), { git: real });
  assert.deepEqual(dirty, { effect: "writer", disposition: "occurred", retryPermitted: false, evidence: { system: "git", kind: "worktree-status", id: base } });
  const noStatus: GitText = async (r, ...args) => args[0] === "status" ? null : real(r, ...args);
  const unknown = await reconcileUncertainEffect(recordFor("writer", root, base), { git: noStatus });
  assert.deepEqual(unknown, { effect: "writer", disposition: "unknown", retryPermitted: false, evidence: null });
}));

test("(c3) reconcile executes no effect: the worktree bytes, HEAD and status are identical before and after", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD"); writeFileSync(join(root, "extra.ts"), "export {};\n");
  const snapshot = () => [git(root, "rev-parse", "HEAD"), git(root, "status", "--porcelain"), readFileSync(join(root, "extra.ts"), "utf8")];
  const before = snapshot();
  const real: GitText = async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; };
  for (const effect of EFFECTS) await reconcileUncertainEffect(recordFor(effect, root, base), { git: real, forgeOperation: async () => ({ found: false, id: "op-x" }) });
  assert.deepEqual(snapshot(), before);
}));

// (e) negative control: zero automatic retry across every lost-ack arm, plus the mutation witness.
test("(e) mutation witness: a fixture that re-invokes the runner once on a thrown error turns the zero-retry counters red", () => withRepo(async root => {
  const c = counters();
  const options = {
    agent: async () => { c.runner++; writeFileSync(join(root, "main.ts"), "half written\n"); throw new Error("ack lost mid-edit"); },
    connectForge: lossyForge(c),
  };
  // Mutant host: retries the whole run once when the first attempt throws.
  async function retryingMutant(): Promise<void> {
    try { await developLive(root, "Change parser", options); }
    catch { git(root, "checkout", "--", "main.ts"); await developLive(root, "Change parser", options).catch(() => undefined); }
  }
  await retryingMutant();
  assert.equal(c.runner, 2, "the mutant really retried");
  assert.throws(() => assertZeroRetry(c), /the writer runner ran 2 times/, "the zero-retry assertion catches the retry");
  // The real host: same fixture without the retry stays at one.
  const real = counters();
  git(root, "checkout", "--", "main.ts");
  await assert.rejects(() => developLive(root, "Change parser", {
    agent: async () => { real.runner++; writeFileSync(join(root, "main.ts"), "half written\n"); throw new Error("ack lost mid-edit"); },
    connectForge: lossyForge(real),
  }), DevelopmentLostAcknowledgementError);
  assertZeroRetry(real);
  assert.equal(real.runner, 1);
}));

// (f) The abort path and the clean gate path are unchanged: an abort still reports the abort marker, a returned frame is a domain verdict.
test("(f) regression: an abort still raises the abort uncertainty, never the lost-ack one", () => withRepo(async root => {
  const controller = new AbortController();
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { writeFileSync(join(root, "main.ts"), "uncommitted\n"); controller.abort(); throw new Error("agent observed abort"); },
    connectForge: lossyForge(counters()),
  }), (error: Error) => {
    assert.ok(error instanceof DevelopmentAbortedAfterDispatchError);
    assert.equal(error instanceof DevelopmentLostAcknowledgementError, false);
    return true;
  });
}));
