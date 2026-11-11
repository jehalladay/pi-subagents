import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { attachEffectRefs, openEffectIntent, settleEffectIntent, type EffectIntentRecord } from "../dist/effect-intent.js";
import { reconcileUncertainEffect, type ReconcileRecord } from "../dist/effect-reconciliation.js";
import type { GitText } from "../dist/post-dispatch-abort.js";

/**
 * MechanicalWorkflows-loexn.8 slice 5 (EAT-R016 remaining arms): a twice-delivered completion event records exactly one
 * settlement, and tracked plus untracked worktree bytes present before a process kill are byte-identical after the
 * read-only recovery (real files and a real SIGKILL, no mocks).
 */
const sha = (text: string): string => createHash("sha256").update(text).digest("hex");
const GIT = { commit: "a".repeat(40), tree: "b".repeat(40) };
const CANDIDATE = { commit: "c".repeat(40), tree: "d".repeat(40) };
const GATE = sha("forge.toml");
const withCandidate = (): EffectIntentRecord => attachEffectRefs(
  openEffectIntent({ intentId: "intent-once", workspace: "/w", taskSha256: sha("t"), base: GIT, gateDefinitionSha256: GATE }),
  { agentSessionId: "s-1", candidate: CANDIDATE },
);
type Observed = Parameters<typeof settleEffectIntent>[1];
const passed: Observed = { verdict: "passed", verifiedTree: CANDIDATE.tree, gateDefinitionSha256: GATE, forgeOperationId: "op-1" };

/** The delivery loop a host runs for each completion event: one durable write per settlement it actually changes. */
function deliver(start: EffectIntentRecord, events: readonly Observed[]): { final: EffectIntentRecord; settlementWrites: number } {
  let current = start, settlementWrites = 0;
  for (const event of events) {
    const next = settleEffectIntent(current, event);
    if (next.settlement !== null && current.settlement === null) settlementWrites++;
    current = next;
  }
  return { final: current, settlementWrites };
}

test("R016 a completion event delivered twice records exactly one settlement and the second delivery changes nothing", () => {
  const once = deliver(withCandidate(), [passed]);
  const twice = deliver(withCandidate(), [passed, passed]);
  assert.equal(once.settlementWrites, 1);
  assert.equal(twice.settlementWrites, 1, "exactly one settlement");
  assert.deepEqual(twice.final, once.final, "the duplicate leaves the record identical");
  assert.equal(twice.final.disposition, "settled");
  const settled = settleEffectIntent(withCandidate(), passed);
  assert.equal(settleEffectIntent(settled, passed), settled, "a duplicate returns the held record, not a rebuilt copy");
});

test("R016 mutant: a second, conflicting completion cannot replace the recorded settlement (EFFECT_INTENT_SETTLEMENT_CONFLICT)", () => {
  const settled = settleEffectIntent(withCandidate(), passed);
  const conflicting: Observed = { ...passed, verdict: "failed" };
  assert.throws(() => settleEffectIntent(settled, conflicting), /EFFECT_INTENT_SETTLEMENT_CONFLICT/);
  assert.equal(settled.settlement?.verdict, "passed", "the held settlement is untouched");
  const otherOp: Observed = { ...passed, forgeOperationId: "op-2" };
  assert.throws(() => settleEffectIntent(settled, otherOp), /EFFECT_INTENT_SETTLEMENT_CONFLICT/);
});

test("R016 a late non-matching or unknown completion after settlement never downgrades or alters the settlement", () => {
  const settled = settleEffectIntent(withCandidate(), passed);
  for (const late of [
    { ...passed, verdict: "unknown" as const },
    { ...passed, verifiedTree: "e".repeat(40) },
    { ...passed, forgeOperationId: null },
  ] as Observed[]) {
    const after = settleEffectIntent(settled, late);
    assert.equal(after.disposition, "settled");
    assert.deepEqual(after.settlement, settled.settlement);
  }
});

test("R016 a late non-settling observation naming a different Forge operation refuses and the held settlement stays (EFFECT_INTENT_REF_CONFLICT)", () => {
  const settled = settleEffectIntent(withCandidate(), passed);
  for (const late of [
    { ...passed, verifiedTree: "e".repeat(40), forgeOperationId: "op-2" },
    { ...passed, verdict: "unknown" as const, verifiedTree: null, forgeOperationId: "op-2" },
    { ...passed, gateDefinitionSha256: sha("other"), forgeOperationId: "op-2" },
  ] as Observed[]) {
    assert.throws(() => settleEffectIntent(settled, late), /EFFECT_INTENT_REF_CONFLICT/);
  }
  assert.equal(settled.settlement?.forgeOperationId, "op-1", "the held settlement is untouched");
  assert.equal(settleEffectIntent(settled, { ...passed, verifiedTree: "e".repeat(40), forgeOperationId: "op-1" }), settled, "the same operation id on a non-matching tree still returns the held record");
});

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
const realGit: GitText = async (r, ...args) => { const p = spawnSync("git", ["-C", r, ...args], { encoding: "utf8" }); return p.status === 0 ? p.stdout : null; };

test("R016 tracked and untracked bytes present before a real SIGKILL are byte-identical after read-only recovery", async () => {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-kill-bytes-")));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    const base = git(root, "rev-parse", "HEAD");
    // The writer child edits a tracked file, creates untracked files (one nested, one binary) and is killed mid-run.
    const script = `import { writeFileSync, mkdirSync } from "node:fs"; import { join } from "node:path";
      const root = ${JSON.stringify(root)};
      writeFileSync(join(root, "main.ts"), "export const value = 2; // half written\\n");
      mkdirSync(join(root, "nested"), { recursive: true });
      writeFileSync(join(root, "nested", "new.ts"), "export const fresh = true;\\n");
      writeFileSync(join(root, "blob.bin"), Buffer.from([0, 255, 1, 254, 2, 253]));
      process.kill(process.pid, "SIGKILL");`;
    const child = spawnSync(process.execPath, ["--input-type=module", "-e", script], { encoding: "utf8" });
    assert.equal(child.signal, "SIGKILL", "the writer died by kill: " + child.stderr);
    const files = ["main.ts", "nested/new.ts", "blob.bin"];
    const digest = (): Record<string, string> => Object.fromEntries(files.map(f => [f, createHash("sha256").update(readFileSync(join(root, f))).digest("hex")]));
    const before = digest();
    const statusBefore = git(root, "status", "--porcelain=v1", "--untracked-files=all");
    assert.match(statusBefore, /M main\.ts/);
    assert.match(statusBefore, /\?\? nested\/new\.ts/);
    const record: ReconcileRecord = { effect: "writer", worktree: root, gitRef: { baseCommit: base }, forgeOperationId: null };
    const first = await reconcileUncertainEffect(record, { git: realGit });
    const second = await reconcileUncertainEffect(record, { git: realGit });
    assert.equal(first.disposition, "occurred");
    assert.equal(first.retryPermitted, false, "no new dispatch while the kill left bytes behind");
    assert.deepEqual(second, first, "recovery is repeatable");
    assert.deepEqual(digest(), before, "every tracked and untracked byte is identical after recovery");
    assert.equal(git(root, "status", "--porcelain=v1", "--untracked-files=all"), statusBefore);
    assert.equal(git(root, "rev-parse", "HEAD"), base);
    assert.equal(existsSync(join(root, "blob.bin")), true);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
