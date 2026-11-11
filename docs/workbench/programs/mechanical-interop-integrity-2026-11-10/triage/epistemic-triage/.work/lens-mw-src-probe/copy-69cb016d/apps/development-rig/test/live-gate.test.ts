import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { verifyExistingCandidate, cleanGitBasis } from "../dist/live-gate.js";
import type { GitBasis } from "../dist/live-gate.js";
type Frame = Record<string, unknown>;

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-gate-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Fixture");
    git(root, "config", "user.email", "fixture@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.txt"), "candidate\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "candidate");
    return await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
function frame(commit: string, overrides: Frame = {}): Frame {
  return {
    operation_id: "op-123",
    terminal_fact: "completed",
    status: "success",
    forge_result: {
      status: "success",
      envelope: { disposition: "SUCCEEDED", gated_commit: commit },
      data: { gate_verdict: "PASS", gate_passed: true },
    },
    ...overrides,
  };
}
test("full native gate contract classifies a matching clean commit", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const calls: string[] = [];
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { calls.push("init"); return "compatible"; },
    async request(method, params) { calls.push(method); assert.equal(params.root, root); assert.equal(params.require_complete, true); return frame(basis.commit); },
    async close() { calls.push("close"); },
  }));
  assert.equal(result.kind, "passed");
  assert.deepEqual(calls, ["init", "gate.run", "close"]);
}));
test("a matching native PASS with an empty or whitespace operation_id is indeterminate and carries no operation identity", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  for (const blank of ["", "  ", "\t\n"]) {
    const result = await verifyExistingCandidate(root, "forge", () => ({
      async initialize() { return "compatible"; },
      async request() { return frame(basis.commit, { operation_id: blank }); },
      async close() {},
    }));
    assert.equal(result.kind, "indeterminate", `blank operation_id ${JSON.stringify(blank)}`);
    assert.equal(result.reason, "FORGE_RESULT_UNREADABLE");
    assert.equal(result.operationId, null);
  }
  const control = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return frame(basis.commit); },
    async close() {},
  }));
  assert.equal(control.kind, "passed");
  assert.equal(control.operationId, "op-123");
}));
test("partial or gate PASS without committed basis never counts as verified", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  for (const bad of [
    { ...frame(basis.commit), status: "partial" },
    frame(basis.commit, { terminal_fact: "partial-indeterminate" }),
    frame("0".repeat(40)),
    { ...frame(basis.commit), forge_result: { status: "success", data: { gate_verdict: "PASS" }, envelope: { disposition: "SUCCEEDED" } } },
  ]) {
    const result = await verifyExistingCandidate(root, "forge", () => ({
      async initialize() { return "compatible"; },
      async request() { return bad; },
      async close() {},
    }));
    assert.equal(result.kind, "indeterminate");
  }
}));
test("real Forge negative verdict is a domain failure", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  // Forge reports a FAILED disposition under terminal fact "failed" (witnessed live:
  // qa/integration/evidence/2026-10-15-live-verify-fail.json and the Furnace process-host FAIL control).
  const failed = frame(b.commit, { status: "error", terminal_fact: "failed",
    forge_result: { status: "error", envelope: { disposition: "FAILED", gated_commit: b.commit }, data: { gate_verdict: "FAIL" } } });
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return failed; },
    async close() {},
  }));
  assert.equal(result.kind, "failed");
}));
test("dirty workspace refuses before launching SDK client", () => withRepo(async root => {
  writeFileSync(join(root, "main.txt"), "dirty\n");
  let called = false;
  await assert.rejects(() => verifyExistingCandidate(root, "forge", () => { called = true; throw Error("must not connect"); }), /WORKSPACE_NOT_CLEAN/);
  assert.equal(called, false);
}));
test("workspace changing during Forge call cannot claim PASS", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { writeFileSync(join(root, "main.txt"), "mutated\n"); return frame(b.commit); },
    async close() {},
  })).catch((error: unknown) => ({ kind: "indeterminate" as const, reason: error instanceof Error ? error.message : String(error) }));
  assert.equal(result.kind, "indeterminate");
}));
test("a clean new commit with an identical tree during the Forge call reports WORKSPACE_CHANGED_DURING_GATE", () => withRepo(async root => {
  const initial = await cleanGitBasis(root);
  const observe = (mutate: () => void) => verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { mutate(); return frame(initial.commit); },
    async close() {},
  }));
  // Control: nothing moves, so the identical frame passes and keeps its native operation identity.
  const unchanged = await observe(() => {});
  assert.equal(unchanged.kind, "passed");
  assert.equal(unchanged.operationId, "op-123");
  // Dirty control: an untracked file leaves the tree check to the clean-basis guard, not the commit comparison.
  writeFileSync(join(root, "dirty.txt"), "dirty\n");
  const dirty = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return frame(initial.commit); },
    async close() {},
  })).catch((error: unknown) => ({ kind: "refused" as const, reason: error instanceof Error ? error.message : String(error) }));
  assert.equal(dirty.kind, "refused");
  rmSync(join(root, "dirty.txt"));
  // Target: an empty commit made during the request moves HEAD but not the tree.
  const moved = await observe(() => git(root, "commit", "--allow-empty", "-qm", "same tree new commit"));
  const final = await cleanGitBasis(root);
  assert.notEqual(final.commit, initial.commit);
  assert.equal(final.tree, initial.tree);
  assert.equal(moved.kind, "indeterminate");
  assert.equal(moved.reason, "WORKSPACE_CHANGED_DURING_GATE");
  assert.equal(moved.operationId, "op-123");
}));
test("incompatible negotiation never runs gate, closes connection", () => withRepo(async root => {
  const calls: string[] = [];
  await assert.rejects(() => verifyExistingCandidate(root, "forge", () => ({
    async initialize() { calls.push("init"); return "unknown"; },
    async request() { throw Error("must not run"); },
    async close() { calls.push("close"); },
  })), /FORGE_PROTOCOL_COMPATIBILITY_UNESTABLISHED/);
  assert.deepEqual(calls, ["init", "close"]);
}));

import { mkdirSync, symlinkSync } from "node:fs";

function pinnedRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  return withRepo(async root => {
    writeFileSync(join(root, ".gitignore"), ".forge/\n");
    git(root, "add", ".gitignore");
    git(root, "commit", "-qm", "ignore forge state");
    return fn(root);
  });
}
function observe(root: string, frameValue: unknown) {
  return verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return frameValue; },
    async close() {},
  }));
}
function serverFrame(_basis: GitBasis, evidenceRef: string, sourceTree: string): Frame {
  return {
    operation_id: "op-server-1",
    terminal_fact: "completed",
    status: "success",
    forge_result: {
      status: "success",
      envelope: { disposition: "SUCCEEDED", gated_commit: null, gated_tree: null, evidence_ref: evidenceRef },
      data: { gate_verdict: "PASS", gate_passed: true, source_tree: sourceTree },
    },
  };
}
function writeRunRecord(root: string, record: Frame): string {
  const dir = join(root, ".forge", "state", "runs", "pkg-x");
  mkdirSync(dir, { recursive: true });
  const path = join(dir, "run.json");
  writeFileSync(path, JSON.stringify(record));
  return path;
}
test("app-server shape: null gated_commit pins through envelope-named run record and data.source_tree", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const ref = writeRunRecord(root, { revision: basis.commit, source_tree: basis.tree });
  const result = await observe(root, serverFrame(basis, ref, basis.tree));
  assert.equal(result.kind, "passed");
}));
test("run record disagreeing with the observed basis never passes", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const wrongCommit = writeRunRecord(root, { revision: "0".repeat(40), source_tree: basis.tree });
  assert.equal((await observe(root, serverFrame(basis, wrongCommit, basis.tree))).kind, "indeterminate");
  const okRecord = writeRunRecord(root, { revision: basis.commit, source_tree: basis.tree });
  assert.equal((await observe(root, serverFrame(basis, okRecord, "f".repeat(40)))).kind, "indeterminate");
}));
test("run record source_tree disagreeing with the basis fails on its own even when revision and data.source_tree agree", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const wrongTree = "e".repeat(40);
  // Positive control: the same shape with every carrier agreeing passes.
  const agreeing = writeRunRecord(root, { revision: basis.commit, source_tree: basis.tree });
  assert.equal((await observe(root, serverFrame(basis, agreeing, basis.tree))).kind, "passed");
  // Only the envelope-named record's own source_tree disagrees; revision and data.source_tree match the basis.
  const badTreeRecord = writeRunRecord(root, { revision: basis.commit, source_tree: wrongTree });
  const tree = await observe(root, serverFrame(basis, badTreeRecord, basis.tree));
  assert.equal(tree.kind, "indeterminate");
  assert.equal(tree.reason, "FORGE_GATED_TREE_MISMATCHED");
  assert.equal(tree.operationId, "op-server-1");
  // A record with a wrong revision still reports the commit diagnostic ahead of the tree one.
  const badCommitRecord = writeRunRecord(root, { revision: "0".repeat(40), source_tree: wrongTree });
  const commit = await observe(root, serverFrame(basis, badCommitRecord, basis.tree));
  assert.equal(commit.kind, "indeterminate");
  assert.equal(commit.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED");
}));
test("run record outside the package root is never trusted", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const outside = mkdtempSync(join(tmpdir(), "mw-outside-"));
  try {
    const ref = join(outside, "run.json");
    writeFileSync(ref, JSON.stringify({ revision: basis.commit, source_tree: basis.tree }));
    const result = await observe(root, serverFrame(basis, ref, basis.tree));
    assert.equal(result.kind, "indeterminate");
    assert.equal(result.reason, "FORGE_EVIDENCE_RECORD_OUTSIDE_ROOT");
  } finally { rmSync(outside, { recursive: true, force: true }); }
}));
test("missing or unreadable run record stays indeterminate", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const result = await observe(root, serverFrame(basis, join(root, ".forge", "absent.json"), basis.tree));
  assert.equal(result.kind, "indeterminate");
}));

test("contradictory native FAIL cannot be credited as established domain failure", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  for (const value of [
    { disposition: "COULD_NOT_JUDGE", commit: b.commit, terminal: "partial-indeterminate" },
    { disposition: "FAILED", commit: "f".repeat(40), terminal: "failed" },
    { disposition: "FAILED", commit: b.commit, terminal: "partial-indeterminate" },
    // A FAILED disposition under the "completed" fact contradicts Forge's own projection table.
    { disposition: "FAILED", commit: b.commit, terminal: "completed" },
    { disposition: "FAILED", commit: b.commit, terminal: "failed", gate_passed: true },
  ]) {
    const bad = frame(value.commit, { status: "error", terminal_fact: value.terminal,
      forge_result: { status: "error", envelope: { disposition: value.disposition, gated_commit: value.commit },
        data: { gate_verdict: "FAIL", gate_passed: value.gate_passed ?? false } } });
    const observed = await observe(root, bad);
    assert.equal(observed.kind, "indeterminate", JSON.stringify(value));
  }
}));
test("a non-FAILED disposition on an otherwise consistent failed gate stays indeterminate", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const failedFrame = (disposition: string, commit: string) => frame(commit, { status: "error", terminal_fact: "failed",
    forge_result: { status: "error", envelope: { disposition, gated_commit: commit },
      data: { gate_verdict: "FAIL", gate_passed: false } } });
  // Every axis except the disposition is valid: error status, FAIL verdict, failed terminal fact,
  // gate_passed false and a matching commit pin. Only the disposition guard can refuse these.
  for (const disposition of ["COULD_NOT_JUDGE", "SUCCEEDED", "PARTIAL"]) {
    const observed = await observe(root, failedFrame(disposition, b.commit));
    assert.equal(observed.kind, "indeterminate", disposition);
    assert.equal(observed.reason, "FORGE_GATE_FAILURE_UNESTABLISHED", disposition);
  }
  // Positive control: the same shape with the FAILED disposition is a measured domain failure.
  assert.equal((await observe(root, failedFrame("FAILED", b.commit))).kind, "failed");
  // A FAILED disposition under a different commit reports the pin diagnostic, not the disposition one.
  const wrong = await observe(root, failedFrame("FAILED", "f".repeat(40)));
  assert.equal(wrong.kind, "indeterminate");
  assert.equal(wrong.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED");
}));
test("an explicit envelope verdict that contradicts a data PASS is indeterminate, never passed", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const withEnvelopeVerdict = (commit: string, verdict?: unknown) => frame(commit, {
    forge_result: {
      status: "success",
      envelope: { disposition: "SUCCEEDED", gated_commit: commit, ...(verdict === undefined ? {} : { verdict }) },
      data: { gate_verdict: "PASS", gate_passed: true },
    },
  });
  // Arm 1: every other axis (success status, SUCCEEDED, completed fact, pinned commit, data PASS) is valid;
  // only the envelope's own verdict contradicts the data carrier.
  for (const verdict of ["FAIL", "COULD_NOT_JUDGE"]) {
    const observed = await observe(root, withEnvelopeVerdict(b.commit, verdict));
    assert.equal(observed.kind, "indeterminate", verdict);
    assert.equal(observed.reason, "FORGE_GATE_ENVELOPE_VERDICT_CONTRADICTED", verdict);
    assert.equal(observed.operationId, "op-123", verdict);
  }
  // Arm 2: a consistent envelope PASS still establishes the pass.
  assert.equal((await observe(root, withEnvelopeVerdict(b.commit, "PASS"))).kind, "passed");
  // Arm 3: a legacy envelope with no verdict field keeps the existing behavior.
  assert.equal((await observe(root, withEnvelopeVerdict(b.commit))).kind, "passed");
  // Different-failure control: a wrong gated commit still reports the pin diagnostic, not the verdict one.
  // The contradicting verdicts are the arms that pin the order (pin check first); a consistent PASS alone cannot.
  for (const verdict of ["PASS", "FAIL", "COULD_NOT_JUDGE"]) {
    const wrong = await observe(root, withEnvelopeVerdict("f".repeat(40), verdict));
    assert.equal(wrong.kind, "indeterminate", verdict);
    assert.equal(wrong.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED", verdict);
  }
}));
test("post-gate workspace mutation preserves native operation identity", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { writeFileSync(join(root, "main.txt"), "dirty after gate\n"); return frame(b.commit); },
    async close() {},
  }));
  assert.equal(result.kind, "indeterminate");
  assert.equal(result.operationId, "op-123");
}));
test("a gate that leaves the workspace unclean answers WORKSPACE_NOT_CLEAN_AFTER_GATE with the pre-gate basis, the native operation id and the returned frame", () => withRepo(async root => {
  const initial = await cleanGitBasis(root);
  const observe = (mutate: () => void, returned: Frame) => verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { mutate(); return returned; },
    async close() {},
  }));
  // Untracked file created during the request: the post-gate clean-basis guard throws, not the commit/tree comparison.
  const untrackedFrame = frame(initial.commit);
  const untracked = await observe(() => writeFileSync(join(root, "gate-output.txt"), "left behind\n"), untrackedFrame);
  assert.equal(untracked.kind, "indeterminate");
  assert.equal(untracked.reason, "WORKSPACE_NOT_CLEAN_AFTER_GATE");
  assert.deepEqual(untracked.basis, initial);
  assert.equal(untracked.operationId, "op-123");
  assert.deepEqual(untracked.native, untrackedFrame);
  rmSync(join(root, "gate-output.txt"));
  // Tracked-file modification during the request takes the status --porcelain path with the same carriers.
  const trackedFrame = frame(initial.commit);
  const tracked = await observe(() => writeFileSync(join(root, "main.txt"), "modified during gate\n"), trackedFrame);
  assert.equal(tracked.kind, "indeterminate");
  assert.equal(tracked.reason, "WORKSPACE_NOT_CLEAN_AFTER_GATE");
  assert.deepEqual(tracked.basis, initial);
  assert.equal(tracked.operationId, "op-123");
  assert.deepEqual(tracked.native, trackedFrame);
  git(root, "checkout", "--", "main.txt");
  // Control: a clean empty commit during the request is the other post-gate arm and must keep its own reason.
  const movedFrame = frame(initial.commit);
  const moved = await observe(() => git(root, "commit", "--allow-empty", "-qm", "same tree new commit"), movedFrame);
  assert.equal(moved.kind, "indeterminate");
  assert.equal(moved.reason, "WORKSPACE_CHANGED_DURING_GATE");
  assert.notEqual(moved.reason, untracked.reason);
}));
test("a basis that turns unreadable after the gate returned still answers WORKSPACE_NOT_CLEAN_AFTER_GATE with the pre-gate basis, the native operation id and the returned frame, not a GIT_BASIS_UNREADABLE throw", () => withRepo(async root => {
  const initial = await cleanGitBasis(root);
  const returned = frame(initial.commit);
  let restore: (() => void) | undefined;
  let unreadableDuringRequest: unknown;
  try {
    const result = await verifyExistingCandidate(root, "forge", () => ({
      async initialize() { return "compatible"; },
      async request() {
        // Only after the gate ran does git start answering rev-parse with prose; status stays clean, so only the unreadable arm can fire.
        restore = installGitShim("not a revision", "also prose", "").restore;
        unreadableDuringRequest = await cleanGitBasis(root).then(() => "resolved", (e: unknown) => e);
        return returned;
      },
      async close() {},
    }));
    assert.ok(unreadableDuringRequest instanceof Error, "the shim must make the post-gate basis unreadable");
    assert.match(unreadableDuringRequest.message, /^GIT_BASIS_UNREADABLE:/);
    assert.equal(result.kind, "indeterminate");
    assert.equal(result.reason, "WORKSPACE_NOT_CLEAN_AFTER_GATE");
    assert.deepEqual(result.basis, initial);
    assert.equal(result.operationId, "op-123");
    assert.deepEqual(result.native, returned);
  } finally {
    restore?.();
  }
  assert.match((await cleanGitBasis(root)).commit, /^[0-9a-f]{40}$/); // the real git is back on PATH
}));
test("connection-close uncertainty preserves a returned native operation ID", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return frame(b.commit); },
    async close() { throw Error("close failed"); },
  }));
  assert.equal(result.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
  assert.equal(result.operationId, "op-123");
}));
test("a close failure after a dispatched gate is indeterminate and issues exactly one gate.run, never a re-dispatch (MechanicalWorkflows-dalh)", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const calls: string[] = [];
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { calls.push("init"); return "compatible"; },
    async request(method) { calls.push(method); return frame(b.commit); },
    async close() { calls.push("close"); throw Error("close failed"); },
  }));
  assert.equal(result.kind, "indeterminate");
  assert.equal(result.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
  assert.equal(calls.filter(c => c === "gate.run").length, 1, "the gate is dispatched exactly once");
  assert.deepEqual(calls, ["init", "gate.run", "close"]);
}));
test("a close failure never lets a native FAIL or PASS stand: the observation stays indeterminate (MechanicalWorkflows-dalh)", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const failFrame = frame(b.commit, {
    status: "failure",
    forge_result: { status: "failure", envelope: { disposition: "FAILED", gated_commit: b.commit }, data: { gate_verdict: "FAIL", gate_passed: false } },
  });
  for (const raw of [failFrame, frame(b.commit)]) {
    let gateRuns = 0;
    const result = await verifyExistingCandidate(root, "forge", () => ({
      async initialize() { return "compatible"; },
      async request() { gateRuns++; return raw; },
      async close() { throw Error("close failed"); },
    }));
    assert.equal(result.kind, "indeterminate");
    assert.equal(result.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
    assert.equal(gateRuns, 1);
  }
}));
test("a lost dispatch response followed by a close failure names the close uncertainty, with no operation and exactly one gate.run (MechanicalWorkflows-dalh)", () => withRepo(async root => {
  let gateRuns = 0;
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { gateRuns++; throw Error("transport closed after dispatch"); },
    async close() { throw Error("close failed"); },
  }));
  assert.equal(result.kind, "indeterminate");
  assert.equal(result.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
  assert.equal(result.operationId, null);
  assert.equal(gateRuns, 1);
}));

test("lost dispatch response is indeterminate and never retried", () => withRepo(async root => {
  let calls = 0;
  const observed = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { calls++; throw Error("transport closed after dispatch"); },
    async close() {},
  }));
  assert.equal(calls, 1);
  assert.equal(observed.kind, "indeterminate");
  assert.equal(observed.reason, "FORGE_DISPATCH_OUTCOME_UNKNOWN");
  assert.equal(observed.operationId, null);
}));
test("inconsistent native PASS axes never become a passing gate", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  for (const bad of [
    { status: "partial" },
    { status: "error" },
    { terminal_fact: "partial-indeterminate" },
    { forge_result: { status: "success", envelope: { disposition: "COULD_NOT_JUDGE", gated_commit: basis.commit }, data: { gate_verdict: "PASS", gate_passed: true } } },
    { forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: basis.commit }, data: { gate_verdict: "FAIL", gate_passed: true } } },
    { forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: basis.commit }, data: { gate_verdict: "PASS", gate_passed: false } } },
  ]) {
    const value = frame(basis.commit, bad);
    const out = await observe(root, value);
    assert.notEqual(out.kind, "passed", JSON.stringify(bad));
  }
}));

test("Forge gate response delivery loss remains indeterminate with one dispatch",()=>withRepo(async root=>{
 let calls=0;
 const response=await verifyExistingCandidate(root,"forge",()=>({
  async initialize(){return"compatible"},
  async request(){calls++;return{operation_id:"op-loss",terminal_fact:"completed",status:"success",delivery:{complete:false,dropped_count:2},forge_result:{status:"success",envelope:{disposition:"SUCCEEDED",gated_commit:git(root,"rev-parse","HEAD")},data:{gate_verdict:"PASS",gate_passed:true}}}},
  async close(){},
 }));
 assert.equal(calls,1);assert.equal(response.kind,"indeterminate");
}));

test("a cancelled-established bare result envelope is indeterminate with its native operation id, never a verdict",()=>withRepo(async root=>{
 const cancelled={command:"gate.run",status:"error",lifecycle_state:"TERMINAL",envelope:null,terminal_disposition:"cancelled-established",
  data:{answered:true,cancel_requested:true,cancellation:{establishment:"CANCELLED_CONFIRMED",requested:true},operation_id:"op-cancelled0000000000000000000000",outcome_class:"cancelled-established",terminal_disposition:"cancelled-established",delivery:{complete:true,dropped_count:0}},
  delivery:{complete:true,dropped_count:0},diagnostics:[]};
 const response=await verifyExistingCandidate(root,"forge",()=>({async initialize(){return"compatible"},async request(){return cancelled},async close(){}}));
 assert.equal(response.kind,"indeterminate");assert.equal(response.reason,"FORGE_OPERATION_CANCELLED");assert.equal(response.operationId,"op-cancelled0000000000000000000000");
}));
test("a bare result envelope shaped like a PASS without the app-server terminal wrapper is not a verdict",()=>withRepo(async root=>{
 const bare={command:"gate.run",status:"success",lifecycle_state:"TERMINAL",envelope:{disposition:"SUCCEEDED",gated_commit:git(root,"rev-parse","HEAD")},data:{gate_verdict:"PASS",gate_passed:true,operation_id:"op-bare000000000000000000000000000"},delivery:{complete:true,dropped_count:0}};
 const response=await verifyExistingCandidate(root,"forge",()=>({async initialize(){return"compatible"},async request(){return bare},async close(){}}));
 assert.notEqual(response.kind,"passed");assert.equal(response.kind,"indeterminate");assert.equal(response.operationId,"op-bare000000000000000000000000000");
}));

test("an evidence record inside the root that is a symlink to a matching record outside the root is never trusted", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const outside = mkdtempSync(join(tmpdir(), "mw-symlink-outside-"));
  try {
    // Control arm 1: a real matching record inside the root passes, so the escape arm below
    // differs from it only by the symlink hop.
    const real = writeRunRecord(root, { revision: basis.commit, source_tree: basis.tree });
    assert.equal((await observe(root, serverFrame(basis, real, basis.tree))).kind, "passed");
    // Escape arm: the evidence_ref path lexically sits inside the root and the file it reaches
    // carries a matching revision and tree, but it resolves outside the root. Only the
    // canonicalization of the evidence_ref can refuse it.
    const target = join(outside, "run.json");
    writeFileSync(target, JSON.stringify({ revision: basis.commit, source_tree: basis.tree }));
    const link = join(root, ".forge", "state", "runs", "pkg-x", "escape.json");
    symlinkSync(target, link);
    const escaped = await observe(root, serverFrame(basis, link, basis.tree));
    assert.equal(escaped.kind, "indeterminate");
    assert.equal(escaped.reason, "FORGE_EVIDENCE_RECORD_OUTSIDE_ROOT");
    // Control arm 2: a missing record fails differently, so the outside-root reason is not a catch-all.
    const missing = await observe(root, serverFrame(basis, join(root, ".forge", "state", "absent.json"), basis.tree));
    assert.equal(missing.kind, "indeterminate");
    assert.equal(missing.reason, "FORGE_EVIDENCE_RECORD_UNREADABLE");
  } finally { rmSync(outside, { recursive: true, force: true }); }
}));

test("an in-root evidence record whose read or JSON parse throws answers FORGE_EVIDENCE_RECORD_UNREADABLE, distinct from the missing-record and non-object arms (MechanicalWorkflows-bo92)", () => pinnedRepo(async root => {
  const basis = await cleanGitBasis(root);
  const runs = join(root, ".forge", "state", "runs", "pkg-x");
  mkdirSync(runs, { recursive: true });
  // Control arm (c): a matching record at the same frame shape passes, so the arms below differ
  // from it only by what sits at the evidence_ref path.
  const real = writeRunRecord(root, { revision: basis.commit, source_tree: basis.tree });
  assert.equal((await observe(root, serverFrame(basis, real, basis.tree))).kind, "passed");
  // Arm (a): an existing in-root file that is not JSON makes JSON.parse throw.
  const notJson = join(runs, "not-json.json");
  writeFileSync(notJson, "not json");
  const parseFailure = await observe(root, serverFrame(basis, notJson, basis.tree));
  assert.equal(parseFailure.kind, "indeterminate", "non-JSON in-root record");
  assert.equal(parseFailure.reason, "FORGE_EVIDENCE_RECORD_UNREADABLE", "non-JSON in-root record");
  // Arm (b): a directory at the path resolves inside the root (realpathSync succeeds) and
  // readFileSync throws EISDIR.
  const dirRef = join(runs, "a-directory.json");
  mkdirSync(dirRef);
  const readFailure = await observe(root, serverFrame(basis, dirRef, basis.tree));
  assert.equal(readFailure.kind, "indeterminate", "directory at the evidence_ref path");
  assert.equal(readFailure.reason, "FORGE_EVIDENCE_RECORD_UNREADABLE", "directory at the evidence_ref path");
  // Arm (d): a JSON array parses without throwing, object() answers null, and the commit is
  // missing, so UNREADABLE pins the read-or-parse failure only and is no catch-all.
  const arrayRecord = join(runs, "array.json");
  writeFileSync(arrayRecord, '["x"]');
  const nonObject = await observe(root, serverFrame(basis, arrayRecord, basis.tree));
  assert.equal(nonObject.kind, "indeterminate", "parsed non-object record");
  assert.equal(nonObject.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED", "parsed non-object record");
  // Arm (e), the missing-record arm, stays pinned by the symlink-escape test above.
}));

test("explicit native gated_tree statements in the envelope or data must each match the observed tree", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const wrongTree = "f".repeat(40);
  const treeFrame = (envelopeTree?: string, dataTree?: string) => frame(b.commit, {
    forge_result: {
      status: "success",
      envelope: { disposition: "SUCCEEDED", gated_commit: b.commit, ...(envelopeTree ? { gated_tree: envelopeTree } : {}) },
      data: { gate_verdict: "PASS", gate_passed: true, ...(dataTree ? { gated_tree: dataTree } : {}) },
    },
  });
  // Positive control: matching tree statements in both carriers still pass.
  assert.equal((await observe(root, treeFrame(b.tree, b.tree))).kind, "passed");
  // Independent arms: only the envelope, or only data, contradicts the observed tree.
  for (const [label, value] of [["envelope", treeFrame(wrongTree)], ["data", treeFrame(undefined, wrongTree)]] as const) {
    const observed = await observe(root, value);
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_GATED_TREE_MISMATCHED", label);
  }
}));

test("contradictory simultaneous native gated_commit statements never pin even when one carrier matches", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const wrongCommit = "f".repeat(40);
  const commitFrame = (envelopeCommit: string, dataCommit: string) => frame(b.commit, {
    forge_result: {
      status: "success",
      envelope: { disposition: "SUCCEEDED", gated_commit: envelopeCommit },
      data: { gate_verdict: "PASS", gate_passed: true, gated_commit: dataCommit },
    },
  });
  // Positive control: both carriers stating the observed commit still pass.
  assert.equal((await observe(root, commitFrame(b.commit, b.commit))).kind, "passed");
  // Each arm keeps one matching statement so a some->every weakening would wrongly pin it.
  for (const [label, value] of [
    ["envelope matches, data contradicts", commitFrame(b.commit, wrongCommit)],
    ["data matches, envelope contradicts", commitFrame(wrongCommit, b.commit)],
  ] as const) {
    const observed = await observe(root, value);
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED", label);
  }
}));

test("an incomplete delivery frame names FORGE_RESPONSE_DELIVERY_INCOMPLETE before any verdict axis is read", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  assert.equal((await observe(root, frame(b.commit, { delivery: { complete: true, dropped_count: 0 } }))).kind, "passed");
  for (const [label, delivery] of [
    ["complete false", { complete: false, dropped_count: 1 }],
    ["complete absent", { dropped_count: 0 }],
    ["complete non-boolean", { complete: "true" }],
  ] as const) {
    const observed = await observe(root, frame(b.commit, { delivery }));
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_RESPONSE_DELIVERY_INCOMPLETE", label);
    assert.equal(observed.operationId, "op-123", label);
  }
  // Precedence: a lossy delivery is reported even when the status axes also disagree.
  const both = await observe(root, frame(b.commit, { status: "error", delivery: { complete: false, dropped_count: 3 } }));
  assert.equal(both.kind, "indeterminate");
  assert.equal(both.reason, "FORGE_RESPONSE_DELIVERY_INCOMPLETE");
}));

test("status axes that disagree or fall outside Forge's result statuses name FORGE_RESULT_STATUS_INCONSISTENT", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const green = { envelope: { disposition: "SUCCEEDED", gated_commit: b.commit }, data: { gate_verdict: "PASS", gate_passed: true } };
  for (const [label, outer, inner] of [
    ["wrapper error, native success", "error", "success"],
    ["wrapper success, native error", "success", "error"],
    ["agreeing but unknown status", "succeeded", "succeeded"],
    ["native status missing", "success", undefined],
  ] as const) {
    const observed = await observe(root, frame(b.commit, { status: outer, forge_result: { status: inner, ...green } }));
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_RESULT_STATUS_INCONSISTENT", label);
    assert.equal(observed.operationId, "op-123", label);
  }
  // Agreeing known statuses clear this axis: partial/partial reaches the verdict logic and is simply not established.
  const partial = await observe(root, frame(b.commit, { status: "partial", forge_result: { status: "partial", ...green } }));
  assert.equal(partial.kind, "indeterminate");
  assert.equal(partial.reason, "FORGE_GATE_NOT_ESTABLISHED");
}));

test("a pinned green result whose completion is not established names FORGE_GATE_COMPLETION_UNESTABLISHED", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const pinnedPass = (data: Record<string, unknown>) => ({
    status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: b.commit }, data: { gate_verdict: "PASS", ...data },
  });
  for (const [label, overrides] of [
    ["gate_passed false", { forge_result: pinnedPass({ gate_passed: false }) }],
    ["terminal_fact partial-indeterminate", { terminal_fact: "partial-indeterminate" }],
    ["terminal_fact failed", { terminal_fact: "failed" }],
    ["terminal_fact absent", { terminal_fact: undefined }],
  ] as const) {
    const observed = await observe(root, frame(b.commit, overrides));
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_GATE_COMPLETION_UNESTABLISHED", label);
    assert.equal(observed.operationId, "op-123", label);
  }
}));

test("results that establish neither a pinned PASS nor a measured FAIL name FORGE_GATE_NOT_ESTABLISHED and keep the operation id", () => withRepo(async root => {
  const b = await cleanGitBasis(root);
  const native = (status: string, disposition: string, verdict: string | undefined, passed: boolean | undefined) => ({
    status, envelope: { disposition, gated_commit: b.commit }, data: { gate_verdict: verdict, gate_passed: passed },
  });
  for (const [label, overrides] of [
    ["PASS verdict under a COULD_NOT_JUDGE disposition", { forge_result: native("success", "COULD_NOT_JUDGE", "PASS", true) }],
    ["FAIL verdict under a success status is not a measured failure", { forge_result: native("success", "FAILED", "FAIL", false) }],
    ["error status with no verdict", { status: "error", terminal_fact: "failed", forge_result: native("error", "FAILED", undefined, false) }],
    ["usage_error on both axes", { status: "usage_error", terminal_fact: "failed", forge_result: native("usage_error", "REJECTED", undefined, undefined) }],
    ["partial on both axes", { status: "partial", terminal_fact: "partial-indeterminate", forge_result: native("partial", "PARTIAL", "PASS", true) }],
  ] as const) {
    const observed = await observe(root, frame(b.commit, overrides));
    assert.equal(observed.kind, "indeterminate", label);
    assert.equal(observed.reason, "FORGE_GATE_NOT_ESTABLISHED", label);
    assert.equal(observed.operationId, "op-123", label);
  }
}));
import { chmodSync } from "node:fs";
test("a git that answers rev-parse with anything but a 40-to-64 hex object name is GIT_BASIS_UNREADABLE, never a basis", () => withRepo(async root => {
  const bin = mkdtempSync(join(tmpdir(), "mw-git-shim-"));
  writeFileSync(join(bin, "git"), '#!/usr/bin/env bash\nfor a in "$@"; do case "$a" in rev-parse) printf "%s\\n" "$MW_GIT_SHIM_OBJECT"; exit 0;; status) exit 0;; esac; done\nexit 0\n');
  chmodSync(join(bin, "git"), 0o755);
  const saved = { path: process.env["PATH"], object: process.env["MW_GIT_SHIM_OBJECT"] };
  process.env["PATH"] = bin + ":" + (saved.path ?? "");
  try {
    for (const [label, object] of [["prose", "fatal: not a git repository"], ["short hex", "a".repeat(39)], ["upper-case hex", "A".repeat(40)], ["empty", ""]] as const) {
      process.env["MW_GIT_SHIM_OBJECT"] = object;
      await assert.rejects(() => cleanGitBasis(root), (e: unknown) => e instanceof Error && e.message.startsWith("GIT_BASIS_UNREADABLE"), label);
    }
  } finally {
    process.env["PATH"] = saved.path ?? "";
    if (saved.object === undefined) delete process.env["MW_GIT_SHIM_OBJECT"]; else process.env["MW_GIT_SHIM_OBJECT"] = saved.object;
    rmSync(bin, { recursive: true, force: true });
  }
  assert.match((await cleanGitBasis(root)).commit, /^[0-9a-f]{40}$/); // the real git is back on PATH
}));
import { loadForgeConnection } from "../dist/live-gate.js";
test("an installed @forge/sdk without a callable ServerConnection.spawn is FORGE_SDK_INCOMPATIBLE, a missing package is FORGE_SDK_NOT_INSTALLED, and a real one is bound as the connector", async () => {
  const incompatible: ReadonlyArray<readonly [string, unknown]> = [["empty module", {}], ["ServerConnection without spawn", { ServerConnection: {} }], ["non-function spawn", { ServerConnection: { spawn: "spawn" } }], ["null module", null]];
  for (const [label, sdk] of incompatible) {
    await assert.rejects(() => loadForgeConnection(async () => sdk), (e: unknown) => e instanceof Error && e.message.startsWith("FORGE_SDK_INCOMPATIBLE"), label);
  }
  await assert.rejects(() => loadForgeConnection(async () => { throw new Error("Cannot find package '@forge/sdk'"); }), (e: unknown) => e instanceof Error && e.message.startsWith("FORGE_SDK_NOT_INSTALLED"));
  const seen: { self: unknown; executable: string }[] = [];
  const connection = { async initialize() { return "compatible"; }, async request() { return {}; }, async close() {} };
  const connector = { spawn(this: unknown, executable: string) { seen.push({ self: this, executable }); return connection; } };
  let specifier = "";
  const connect = await loadForgeConnection(async s => { specifier = s; return { ServerConnection: connector }; });
  assert.equal(specifier, "@forge/sdk");
  assert.equal(connect("forge-x"), connection);
  assert.deepEqual(seen, [{ self: connector, executable: "forge-x" }]);
});

// Process-boundary fixture: an executable `git` shim first on PATH answers the three basis probes from the environment.
function installGitShim(commit: string, tree: string, status: string): { dir: string; restore: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "mechanical-git-shim-"));
  const saved = { PATH: process.env["PATH"], SHIM_COMMIT: process.env["SHIM_COMMIT"], SHIM_TREE: process.env["SHIM_TREE"], SHIM_STATUS: process.env["SHIM_STATUS"] };
  writeFileSync(join(dir, "git"), [
    "#!/bin/sh",
    'case "$*" in',
    "  *'rev-parse --verify HEAD^{tree}'*) printf '%s\\n' \"$SHIM_TREE\" ;;",
    "  *'rev-parse --verify HEAD'*) printf '%s\\n' \"$SHIM_COMMIT\" ;;",
    "  *'status --porcelain'*) printf '%s' \"$SHIM_STATUS\" ;;",
    "  *) echo \"unexpected git call: $*\" >&2; exit 97 ;;",
    "esac",
    "",
  ].join("\n"), { mode: 0o755 });
  process.env["PATH"] = `${dir}:${saved.PATH ?? ""}`;
  process.env["SHIM_COMMIT"] = commit; process.env["SHIM_TREE"] = tree; process.env["SHIM_STATUS"] = status;
  return {
    dir,
    restore: () => {
      for (const [key, value] of Object.entries(saved)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
      rmSync(dir, { recursive: true, force: true });
    },
  };
}
async function withGitShim<T>(commit: string, tree: string, status: string, fn: (root: string) => Promise<T>): Promise<T> {
  const shim = installGitShim(commit, tree, status);
  try { return await fn(shim.dir); } finally { shim.restore(); }
}
test("commit and tree answers are validated independently: either one malformed alone refuses as GIT_BASIS_UNREADABLE with the exact message, while two well-formed answers are a clean basis", async () => {
  const good = "a".repeat(40);
  const control = await withGitShim(good, "b".repeat(64), "", root => cleanGitBasis(root));
  assert.deepEqual(control, { commit: good, tree: "b".repeat(64), clean: true });
  const bad: [string, string, string][] = [
    ["empty commit", "", good],
    ["short commit", "abc123", good],
    ["39 character commit", "a".repeat(39), good],
    ["non-hex commit", "z".repeat(40), good],
    ["uppercase commit", "A".repeat(40), good],
    ["65 character commit", "a".repeat(65), good],
    ["empty tree", good, ""],
    ["non-hex tree", good, "g".repeat(40)],
    ["uppercase tree", good, "B".repeat(40)],
    ["short tree", good, "b".repeat(39)],
    ["65 character tree", good, "b".repeat(65)],
  ];
  for (const [label, commit, tree] of bad) {
    await withGitShim(commit, tree, "", async root => {
      await assert.rejects(() => cleanGitBasis(root), /^Error: GIT_BASIS_UNREADABLE: commit\/tree could not be verified$/, label);
    });
  }
});
test("an unreadable basis outranks a dirty status and a dirty status with a readable basis stays WORKSPACE_NOT_CLEAN", async () => {
  const good = "c".repeat(40);
  await withGitShim("nonsense", good, " M main.txt\n", async root => {
    await assert.rejects(() => cleanGitBasis(root), /^Error: GIT_BASIS_UNREADABLE:/);
  });
  await withGitShim(good, good, " M main.txt\n", async root => {
    await assert.rejects(() => cleanGitBasis(root), /^Error: WORKSPACE_NOT_CLEAN:/);
  });
});

// MechanicalWorkflows-qlg6 (CACWC-EAT-R006): every observation records how commit, gate definition
// and environment are bound; the environment is never 'established' while execution_environment.pinned
// is false. Red-first: these tests assert the binding member the module does not yet carry.
import { readFileSync } from "node:fs";

const EVIDENCE = new URL("../../../qa/integration/evidence/2026-10-15-live-claude-forge-verified.json", import.meta.url);

test("the witnessed 2026-10-15 receipt binds its environment only as an unpinned descriptor (C024 instrumented)", () => {
  const witnessed = JSON.parse(readFileSync(EVIDENCE, "utf8"));
  const data = witnessed.forge.native.data;
  assert.equal(data.execution_environment.pinned, false, "pinned is false on the witnessed receipt");
  assert.equal(data.env_mode, "inherited", "env_mode is inherited on the witnessed receipt");
});

test("gated_commit/gated_tree null with an in-root evidence_ref run record binds the commit as run_record and passes", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  writeFileSync(join(root, "run-record.json"), JSON.stringify({ revision: basis.commit, source_tree: basis.tree }));
  const raw = frame(basis.commit, {});
  const result = (raw.forge_result as Frame);
  (result.envelope as Frame).gated_commit = null;
  (result.envelope as Frame).gated_tree = null;
  (result.envelope as Frame).evidence_ref = join(root, "run-record.json");
  (result.data as Frame).execution_environment = { pinned: false, kind: "host", fallback: null };
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "passed");
  const binding = observation.binding;
  assert.ok(binding, "every observation carries a binding record");
  assert.equal(binding.commit, "run_record");
  assert.equal(binding.environment, "descriptor", "pinned false never reads established");
}));

test("an out-of-root run record still refuses, and the refusal observation carries a binding record too", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const outside = mkdtempSync(join(tmpdir(), "mechanical-outside-"));
  try {
    writeFileSync(join(outside, "run-record.json"), JSON.stringify({ revision: basis.commit }));
    const raw = frame(basis.commit, {});
    const result = (raw.forge_result as Frame);
    (result.envelope as Frame).gated_commit = null;
    (result.envelope as Frame).evidence_ref = join(outside, "run-record.json");
    const { classifyGateResponse } = await import("../dist/live-gate.js");
    const observation = classifyGateResponse(raw, basis, root);
    assert.equal(observation.reason, "FORGE_EVIDENCE_RECORD_OUTSIDE_ROOT");
    assert.ok(observation.binding, "refusals record their binding as well");
  } finally {
    rmSync(outside, { recursive: true, force: true });
  }
}));

test("a native gated_commit binds the commit as native; a pinned-true environment is established; gate definition follows data.gate_definition", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const raw = frame(basis.commit, {});
  const result = (raw.forge_result as Frame);
  (result.data as Frame).execution_environment = { pinned: true, kind: "container", fallback: null };
  (result.data as Frame).gate_definition = { sha256: "abc" };
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "passed");
  const binding = observation.binding;
  assert.equal(binding.commit, "native");
  assert.equal(binding.environment, "established");
  assert.equal(binding.gateDefinition, "native");
}));

test("absent execution_environment and absent gate_definition bind as descriptor, never established", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const raw = frame(basis.commit, {});
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "passed");
  const binding = observation.binding;
  assert.equal(binding.commit, "native");
  assert.equal(binding.environment, "descriptor");
  assert.equal(binding.gateDefinition, "descriptor");
}));

// MechanicalWorkflows-bfg1: four live-gate binding laws that survived mutation at the landed qlg6 tree.
const ALL_DESCRIPTOR = { commit: "descriptor", gateDefinition: "descriptor", environment: "descriptor" };

test("only the literal boolean true establishes the environment: pinned 'false', 'true' (strings) and 1 all bind descriptor", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  for (const pinned of ["false", "true", 1, 0, null]) {
    const raw = frame(basis.commit, {});
    ((raw.forge_result as Frame).data as Frame).execution_environment = { pinned, kind: "host", fallback: null };
    const observation = classifyGateResponse(raw, basis, root);
    assert.equal(observation.kind, "passed", `pinned ${JSON.stringify(pinned)}`);
    assert.equal(observation.binding.environment, "descriptor", `pinned ${JSON.stringify(pinned)} never reads established`);
  }
  const control = frame(basis.commit, {});
  ((control.forge_result as Frame).data as Frame).execution_environment = { pinned: true, kind: "container", fallback: null };
  assert.equal(classifyGateResponse(control, basis, root).binding.environment, "established");
}));

test("a null gate_definition binds descriptor while a present one binds native", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const nulled = frame(basis.commit, {});
  ((nulled.forge_result as Frame).data as Frame).gate_definition = null;
  const nullObservation = classifyGateResponse(nulled, basis, root);
  assert.equal(nullObservation.kind, "passed");
  assert.equal(nullObservation.binding.gateDefinition, "descriptor", "null is absence, not a native statement");
  const present = frame(basis.commit, {});
  ((present.forge_result as Frame).data as Frame).gate_definition = { sha256: "abc" };
  assert.equal(classifyGateResponse(present, basis, root).binding.gateDefinition, "native");
}));

test("a measured red keeps its commit binding: native with gated_commit, run_record with an in-root evidence_ref and null gated_commit", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const red = (commit: string | null, extra: Frame = {}): Frame => frame(basis.commit, {
    status: "error", terminal_fact: "failed",
    forge_result: {
      status: "error",
      envelope: { disposition: "FAILED", gated_commit: commit, ...extra },
      data: { gate_verdict: "FAIL", gate_passed: false },
    },
  });
  const native = classifyGateResponse(red(basis.commit), basis, root);
  assert.equal(native.kind, "failed");
  assert.equal(native.reason, "FORGE_GATE_FAIL");
  assert.equal(native.binding.commit, "native");
  writeFileSync(join(root, "run-record.json"), JSON.stringify({ revision: basis.commit, source_tree: basis.tree }));
  const recorded = classifyGateResponse(red(null, { evidence_ref: join(root, "run-record.json") }), basis, root);
  assert.equal(recorded.kind, "failed");
  assert.equal(recorded.binding.commit, "run_record");
}));

test("transport observations carry the all-descriptor binding: dispatch failure, close failure, workspace dirtied after, workspace commit changed", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const dispatchFailed = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request(): Promise<unknown> { throw new Error("socket reset"); },
    async close() {},
  }));
  assert.equal(dispatchFailed.reason, "FORGE_DISPATCH_OUTCOME_UNKNOWN");
  assert.deepStrictEqual(dispatchFailed.binding, ALL_DESCRIPTOR);

  const closeFailed = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return frame(basis.commit); },
    async close() { throw new Error("close refused"); },
  }));
  assert.equal(closeFailed.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
  assert.deepStrictEqual(closeFailed.binding, ALL_DESCRIPTOR);

  const dirtied = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { writeFileSync(join(root, "main.txt"), "dirtied\n"); return frame(basis.commit); },
    async close() {},
  }));
  assert.equal(dirtied.reason, "WORKSPACE_NOT_CLEAN_AFTER_GATE");
  assert.deepStrictEqual(dirtied.binding, ALL_DESCRIPTOR);
  git(root, "checkout", "--", "main.txt");

  const moved = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { git(root, "commit", "-q", "--allow-empty", "-m", "moved"); return frame(basis.commit); },
    async close() {},
  }));
  assert.equal(moved.reason, "WORKSPACE_CHANGED_DURING_GATE");
  assert.deepStrictEqual(moved.binding, ALL_DESCRIPTOR);
}));

// MechanicalWorkflows-m3mz: seven live-gate binding laws the bfg1 gap census proved unpinned.
// A rich frame carries a gate definition and a pinned-true environment in data; the transport
// observations still bind all-descriptor, and the tecq Reading A refusals keep the binding they earned.
const richFrame = (commit: string, overrides: Frame = {}): Frame => {
  const raw = frame(commit, overrides);
  const data = (raw.forge_result as Frame).data as Frame;
  data.gate_definition = { sha256: "abc" };
  data.execution_environment = { pinned: true, kind: "container", fallback: null };
  return raw;
};

test("a rich PASS frame still binds all-descriptor when the connection close is uncertain", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { return richFrame(basis.commit); },
    async close() { throw new Error("close refused"); },
  }));
  assert.equal(result.reason, "FORGE_CONNECTION_CLOSE_UNCERTAIN");
  assert.deepStrictEqual(result.binding, ALL_DESCRIPTOR);
}));

test("a rich PASS frame still binds all-descriptor when the workspace is dirtied during the gate", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { writeFileSync(join(root, "main.txt"), "dirtied\n"); return richFrame(basis.commit); },
    async close() {},
  }));
  assert.equal(result.reason, "WORKSPACE_NOT_CLEAN_AFTER_GATE");
  assert.deepStrictEqual(result.binding, ALL_DESCRIPTOR);
}));

test("a rich PASS frame still binds all-descriptor when the workspace commit moves during the gate", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const result = await verifyExistingCandidate(root, "forge", () => ({
    async initialize() { return "compatible"; },
    async request() { git(root, "commit", "-q", "--allow-empty", "-m", "moved"); return richFrame(basis.commit); },
    async close() {},
  }));
  assert.equal(result.reason, "WORKSPACE_CHANGED_DURING_GATE");
  assert.deepStrictEqual(result.binding, ALL_DESCRIPTOR);
}));

test("a measured red whose data carries the gate definition and a pinned-true environment binds native, native, established", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const raw = richFrame(basis.commit, {
    status: "error", terminal_fact: "failed",
    forge_result: {
      status: "error",
      envelope: { disposition: "FAILED", gated_commit: basis.commit },
      data: {
        gate_verdict: "FAIL", gate_passed: false,
        gate_definition: { sha256: "abc" },
        execution_environment: { pinned: true, kind: "container", fallback: null },
      },
    },
  });
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "failed");
  assert.equal(observation.reason, "FORGE_GATE_FAIL");
  assert.deepStrictEqual(observation.binding, { commit: "native", gateDefinition: "native", environment: "established" });
}));

test("a pinned rich PASS whose envelope verdict contradicts it keeps the native, native, established binding", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const raw = richFrame(basis.commit);
  ((raw.forge_result as Frame).envelope as Frame).verdict = "FAIL";
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "indeterminate");
  assert.equal(observation.reason, "FORGE_GATE_ENVELOPE_VERDICT_CONTRADICTED");
  assert.deepStrictEqual(observation.binding, { commit: "native", gateDefinition: "native", environment: "established" });
}));

test("a pinned rich PASS with gate_passed false keeps the native, native, established binding", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const raw = richFrame(basis.commit);
  ((raw.forge_result as Frame).data as Frame).gate_passed = false;
  const observation = classifyGateResponse(raw, basis, root);
  assert.equal(observation.kind, "indeterminate");
  assert.equal(observation.reason, "FORGE_GATE_COMPLETION_UNESTABLISHED");
  assert.deepStrictEqual(observation.binding, { commit: "native", gateDefinition: "native", environment: "established" });
}));

test("a rich frame whose gated_commit is forty zeros refuses with the commit descriptor and keeps the data-carrier bindings", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { classifyGateResponse } = await import("../dist/live-gate.js");
  const observation = classifyGateResponse(richFrame("0".repeat(40)), basis, root);
  assert.equal(observation.kind, "indeterminate");
  assert.equal(observation.reason, "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED");
  assert.deepStrictEqual(observation.binding, { commit: "descriptor", gateDefinition: "native", environment: "established" });
}));
