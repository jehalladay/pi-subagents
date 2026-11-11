import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateBridge } from "@mechanical/workflows-development";
import type { BridgeCertificate, LocalValidation, VerificationResult } from "@mechanical/workflows-development";
import { developLive } from "../dist/live-development.js";
import type { ConnectForge } from "../dist/live-gate.js";

// CAC-WC 01 example 6 (claim test-two-receipts-need-bridge-oracle): two individual success receipts cannot
// prove global integration correctness without an explicit bridge certificate. The receipts here come out
// of the real development route (git repository, injected agent, injected Forge frames), so they are
// fixture-grade PASS receipts bound to their own candidate trees — never native PASS of anything composed.

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-two-receipts-"));
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

/** One real development run: the agent commits a change, the injected Forge gate passes, and the verification receipt binds that candidate tree. */
async function successReceipt(root: string, content: string): Promise<VerificationResult> {
  const out = await developLive(root, "Implement parser", {
    agent: async () => {
      writeFileSync(join(root, "main.ts"), content);
      git(root, "add", "main.ts");
      git(root, "commit", "-qm", "implementation");
      return agentSuccess;
    },
    connectForge: forgeConnection(root),
  });
  assert.equal(out.workflow.kind, "verified_candidate");
  if (out.workflow.kind !== "verified_candidate") throw new Error("unreachable");
  assert.equal(out.workflow.verification.verdict, "passed");
  return out.workflow.verification;
}

test("two real success receipts, each bound to its own candidate tree, establish no composed claim without a bridge, and no bridge can span two bases", () => withRepo(async left => withRepo(async right => {
  const a = await successReceipt(left, "export const value = 2;\n");
  const b = await successReceipt(right, "export const value = 3;\n");
  assert.notDeepEqual(a.basis, b.basis, "the two receipts are about two different trees");
  assert.equal(a.evidence?.system, "forge");
  assert.equal(b.evidence?.system, "forge");
  const locals: readonly LocalValidation[] = [{ step: "left", result: a }, { step: "right", result: b }];

  // Conjunction alone: both passed, both native-referenced, still nothing global — and the second
  // receipt is about another tree than the claim, which the validator reports as well.
  const conjunction = validateBridge({ id: "claim:left-and-right-integrate", basis: a.basis, locals });
  assert.equal(conjunction.established, false);
  if (!conjunction.established) assert.deepEqual(conjunction.refusals.map(r => r.code), ["BRIDGE_ABSENT", "BRIDGE_LOCAL_BASIS_MISMATCH"]);
  // Even with every receipt on the claim's basis the conjunction alone is refused: the bridge is the only path.
  const sameBasisConjunction = validateBridge({ id: "claim:left-verified-twice", basis: a.basis, locals: [locals[0]!, { step: "again", result: { ...a, evidence: { system: "forge", kind: "operation", id: "op-again" } } }] });
  assert.equal(sameBasisConjunction.established, false);
  if (!sameBasisConjunction.established) assert.deepEqual(sameBasisConjunction.refusals.map(r => r.code), ["BRIDGE_ABSENT"]);

  // A certificate that names both steps cannot make receipts about two bases speak for one claim.
  const bridge: BridgeCertificate = { id: "bridge:hand-waved", establishes: "claim:left-and-right-integrate", covers: ["left", "right"], basis: a.basis };
  const spanned = validateBridge({ id: "claim:left-and-right-integrate", basis: a.basis, locals, bridge });
  assert.equal(spanned.established, false);
  if (!spanned.established) {
    assert.deepEqual(spanned.refusals.map(r => r.code), ["BRIDGE_LOCAL_BASIS_MISMATCH"]);
    assert.match(spanned.refusals[0]!.detail, new RegExp(`^right validated .*${b.basis.revision}`));
  }
})));

test("the positive control: two receipts about the same candidate basis plus an explicit total bridge establish the composed claim, and dropping either receipt's PASS withdraws it", () => withRepo(async root => {
  const a = await successReceipt(root, "export const value = 2;\n");
  // A second, independent verification of the same candidate tree (a different verifier operation).
  const b: VerificationResult = { basis: a.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-second-verifier" } };
  const locals: readonly LocalValidation[] = [{ step: "gate", result: a }, { step: "second-verifier", result: b }];
  const bridge: BridgeCertificate = { id: "bridge:same-tree-two-verifiers", establishes: "claim:cand-verified-twice", covers: ["gate", "second-verifier"], basis: a.basis };
  const out = validateBridge({ id: "claim:cand-verified-twice", basis: a.basis, locals, bridge });
  assert.deepEqual(out, { established: true, claim: "claim:cand-verified-twice", bridge: "bridge:same-tree-two-verifiers", locals: ["gate", "second-verifier"] });

  const degraded = validateBridge({ id: "claim:cand-verified-twice", basis: a.basis, locals: [locals[0]!, { step: "second-verifier", result: { ...b, verdict: "partial" } }], bridge });
  assert.equal(degraded.established, false);
  if (!degraded.established) assert.deepEqual(degraded.refusals, [{ code: "BRIDGE_LOCAL_NOT_PASSED", detail: "second-verifier partial" }]);
}));

test("a receipt's own evidence reference never stands in for a bridge: naming the Forge operation as the certificate changes nothing about coverage or basis", () => withRepo(async left => withRepo(async right => {
  const a = await successReceipt(left, "export const value = 2;\n");
  const b = await successReceipt(right, "export const value = 3;\n");
  const locals: readonly LocalValidation[] = [{ step: "left", result: a }, { step: "right", result: b }];
  const asBridge: BridgeCertificate = { id: a.evidence!.id, establishes: "claim:left-and-right-integrate", covers: ["left"], basis: a.basis, evidence: a.evidence! };
  const out = validateBridge({ id: "claim:left-and-right-integrate", basis: a.basis, locals, bridge: asBridge });
  assert.equal(out.established, false);
  if (!out.established) assert.deepEqual(out.refusals.map(r => [r.code, r.detail.split(" ")[0]]), [["BRIDGE_COVERAGE_MISMATCH", "missing"], ["BRIDGE_LOCAL_BASIS_MISMATCH", "right"]]);
})));
