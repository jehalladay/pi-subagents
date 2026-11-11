import { strict as assert } from "node:assert";
import { test } from "node:test";
import { MIGRATION_STEPS, commitGraphAlias, initialDurableState, parameterDigest, rollbackInheritance, validateInheritance, validateMigrationOrder } from "../dist/index.js";
import type { GraphAlias, InheritanceContext, InheritanceDeclaration, InheritedParameter } from "../dist/index.js";

// Pins for rewrite-inheritance laws the 3l61.8 suite left unpinned (bead MechanicalWorkflows-cn3r, mutants M4, M6, M7, M15, M23, M27, M31, M33).
// Test-only: the source stays as landed. Owner questions F5 (CAS binding to the validated parent), F6 (duplicate names and lease dispositions),
// F7 (a repeated step after resume) and F8 (runtime shape guards) are carried, not pinned here.

const param = (name: string, value: unknown, sourceCheckpoint = "ckpt:9"): InheritedParameter => ({ name, value, sourceCheckpoint, digest: parameterDigest({ name, value, sourceCheckpoint }) });

const ctx = (): InheritanceContext => ({
  parentRevision: "r7",
  compatibleParameters: [{ name: "temperature", sourceCheckpoint: "ckpt:9" }, { name: "lane-weight", sourceCheckpoint: "ckpt:9" }],
  activeLeases: [{ leaseId: "lease:gate-slot", owner: "effect-owner:forge", state: "active" }],
});

const decl = (overrides: Partial<InheritanceDeclaration> = {}): InheritanceDeclaration => ({
  candidateId: "cand:1",
  parentRevision: "r7",
  parameters: [param("temperature", 0.7)],
  memory: [{ nodeId: "m1", strategy: "reset" }],
  leases: [{ leaseId: "lease:gate-slot", action: "remain-with-owner" }],
  ...overrides,
});

const codes = (out: { refusals: readonly { code: string }[] }): string[] => out.refusals.map(r => r.code).sort();

test("M4: a wrong-parent declaration reports ok false, and the alias never moves for it", () => {
  const validation = validateInheritance(decl({ parentRevision: "r6" }), ctx());
  assert.equal(validation.ok, false);
  assert.deepEqual(codes(validation), ["INHERITANCE_PARENT_MISMATCH"]);
  const state = initialDurableState<GraphAlias>("r7", { graphId: "g1", revision: "r7" });
  const write = { writeId: "w1", decisionId: "d1", expectedRevision: "r7", nextRevision: "r8", value: { graphId: "g1", revision: "r8" }, receipt: { status: "acknowledged" as const, nativeRef: "native:alias-swap" } };
  const commit = commitGraphAlias(state, validation, write);
  assert.equal(commit.kind, "refused");
  if (commit.kind !== "refused") return;
  assert.equal(commit.code, "INHERITANCE_UNVALIDATED");
  assert.equal(commit.state, state, "the state is handed back untouched");
  assert.equal(commit.state.revision, "r7");
});

test("M31: the first adjacent pair is checked: snapshot before stop-or-drain refuses with snapshot as subject", () => {
  const out = validateMigrationOrder(["snapshot", "stop-or-drain", "validate", "commit-alias-cas", "resume"]);
  assert.equal(out.ok, false);
  assert.deepEqual(codes(out), ["INHERITANCE_ORDER_VIOLATED"]);
  assert.equal(out.refusals.length, 1);
  assert.equal(out.refusals[0]!.subject, "snapshot");
  assert.ok(out.refusals[0]!.detail.includes("snapshot runs before stop-or-drain"));
});

test("M6 and M7: a whitespace-only parameter name is unnamed, not incompatible, and its subject is the parameter's source checkpoint", () => {
  for (const name of [" ", "   ", "\t\n"]) {
    const out = validateInheritance(decl({ parameters: [param(name, 1, "ckpt:9")] }), ctx());
    assert.deepEqual(codes(out), ["INHERITANCE_PARAMETER_UNNAMED"], JSON.stringify(name));
    assert.equal(out.refusals[0]!.subject, "ckpt:9");
    assert.deepEqual(out.inherited, []);
  }
  const other = validateInheritance(decl({ parameters: [param(" ", 1, "ckpt:77")] }), ctx());
  assert.equal(other.refusals[0]!.subject, "ckpt:77", "the subject follows the declared checkpoint, not a constant");
});

test("M15: a verified partition with an empty partition proof is refused", () => {
  const out = validateInheritance(decl({ memory: [{ nodeId: "m2", strategy: "verified-partition", partitionProof: "" }] }), ctx());
  assert.deepEqual(codes(out), ["INHERITANCE_PARTITION_UNVERIFIED"]);
  assert.equal(out.refusals[0]!.subject, "m2");
  assert.equal(out.ok, false);
  assert.equal(validateInheritance(decl({ memory: [{ nodeId: "m2", strategy: "verified-partition", partitionProof: "p" }] }), ctx()).ok, true, "a non-empty proof admits");
});

test("M23: the lease refusal detail names the action: copied for copy, transferred for transfer", () => {
  const copy = validateInheritance(decl({ leases: [{ leaseId: "lease:gate-slot", action: "copy" }] }), ctx());
  const transfer = validateInheritance(decl({ leases: [{ leaseId: "lease:gate-slot", action: "transfer" }] }), ctx());
  assert.deepEqual(codes(copy), ["INHERITANCE_LEASE_COPIED"]);
  assert.deepEqual(codes(transfer), ["INHERITANCE_LEASE_COPIED"]);
  assert.ok(copy.refusals[0]!.detail.endsWith("never copied"), copy.refusals[0]!.detail);
  assert.ok(transfer.refusals[0]!.detail.endsWith("never transferred"), transfer.refusals[0]!.detail);
  assert.ok(!copy.refusals[0]!.detail.includes("transferred"));
  assert.ok(!transfer.refusals[0]!.detail.includes("copied"));
});

test("M27: the migration step list is frozen", () => {
  assert.equal(Object.isFrozen(MIGRATION_STEPS), true);
  assert.throws(() => { (MIGRATION_STEPS as string[]).push("celebrate"); }, TypeError);
  assert.deepEqual([...MIGRATION_STEPS], ["stop-or-drain", "snapshot", "validate", "commit-alias-cas", "resume"]);
});

test("M33: rollback reports the durable snapshot revision, distinct from the alias value's own revision", () => {
  const snapshot = initialDurableState<GraphAlias>("d5", { graphId: "g1", revision: "r7" });
  const out = rollbackInheritance(snapshot, []);
  assert.equal(out.revision, "d5");
  assert.equal(out.alias.revision, "r7");
  assert.notEqual(out.revision, out.alias.revision);
});
