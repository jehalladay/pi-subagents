import { strict as assert } from "node:assert";
import { test } from "node:test";
import { MIGRATION_STEPS, commitGraphAlias, digest, initialDurableState, parameterDigest, rollbackInheritance, validateInheritance, validateMigrationOrder } from "../dist/index.js";
import type { GraphAlias, InheritanceContext, InheritanceDeclaration, InheritedParameter } from "../dist/index.js";

const param = (name: string, value: unknown, sourceCheckpoint = "ckpt:9"): InheritedParameter => ({ name, value, sourceCheckpoint, digest: parameterDigest({ name, value, sourceCheckpoint }) });

const ctx = (overrides: Partial<InheritanceContext> = {}): InheritanceContext => ({
  parentRevision: "r7",
  compatibleParameters: [{ name: "temperature", sourceCheckpoint: "ckpt:9" }, { name: "lane-weight", sourceCheckpoint: "ckpt:9" }],
  activeLeases: [{ leaseId: "lease:gate-slot", owner: "effect-owner:forge", state: "active" }, { leaseId: "lease:old", owner: "effect-owner:forge", state: "released" }],
  ...overrides,
});

const decl = (overrides: Partial<InheritanceDeclaration> = {}): InheritanceDeclaration => ({
  candidateId: "cand:1",
  parentRevision: "r7",
  parameters: [param("temperature", 0.7), param("lane-weight", [1, 2, 3])],
  memory: [{ nodeId: "m1", strategy: "reset" }, { nodeId: "m2", strategy: "verified-partition", partitionProof: "proof:partition-m2" }, { nodeId: "m3", strategy: "unchanged-schema-identity", schemaDigest: { parent: "s1", candidate: "s1" } }],
  leases: [{ leaseId: "lease:gate-slot", action: "remain-with-owner" }],
  ...overrides,
});

const codes = (out: { refusals: readonly { code: string }[] }): string[] => out.refusals.map(r => r.code).sort();

test("a well-formed declaration validates: named compatible parameters at their source checkpoint with matching content digests, three memory strategies, the active lease left with its owner", () => {
  const out = validateInheritance(decl(), ctx());
  assert.equal(out.schema, "mw.rewrite-inheritance.v0");
  assert.deepEqual(out.refusals, []);
  assert.equal(out.ok, true);
  assert.deepEqual(out.inherited.map(p => p.name), ["temperature", "lane-weight"]);
  assert.equal(out.inherited[0]!.digest, digest({ name: "temperature", value: 0.7, sourceCheckpoint: "ckpt:9" }));
  assert.deepEqual(out.retainedLeases, ["lease:gate-slot"]);
});

test("parameters inherit by name only: an unnamed, incompatible or checkpoint-shifted parameter is refused, and a content digest that does not match the value is refused", () => {
  assert.deepEqual(codes(validateInheritance(decl({ parameters: [param("", 1)] }), ctx())), ["INHERITANCE_PARAMETER_UNNAMED"]);
  assert.deepEqual(codes(validateInheritance(decl({ parameters: [param("hidden-bias", 1)] }), ctx())), ["INHERITANCE_PARAMETER_INCOMPATIBLE"]);
  assert.deepEqual(codes(validateInheritance(decl({ parameters: [param("temperature", 0.7, "ckpt:10")] }), ctx())), ["INHERITANCE_CHECKPOINT_NOT_PRESERVED"]);
  const tampered = { ...param("temperature", 0.7), value: 0.9 };
  const out = validateInheritance(decl({ parameters: [tampered] }), ctx());
  assert.deepEqual(codes(out), ["INHERITANCE_DIGEST_MISMATCH"]);
  assert.equal(out.refusals[0]!.subject, "temperature");
});

test("no raw wire-index migration: a declaration carrying an index map is refused however small", () => {
  const out = validateInheritance(decl({ wireIndexMap: [{ from: 0, to: 1 }] }), ctx());
  assert.deepEqual(codes(out), ["INHERITANCE_WIRE_INDEX_MIGRATION"]);
  assert.equal(validateInheritance(decl({ wireIndexMap: [] }), ctx()).ok, true, "an empty map migrates nothing");
});

test("memory strategies are reset, verified partition or unchanged-schema identity: an unknown strategy, an unverified partition or a changed schema under identity is refused", () => {
  assert.deepEqual(codes(validateInheritance(decl({ memory: [{ nodeId: "m1", strategy: "carry-over" as unknown as "reset" }] }), ctx())), ["INHERITANCE_MEMORY_STRATEGY_UNKNOWN"]);
  assert.deepEqual(codes(validateInheritance(decl({ memory: [{ nodeId: "m2", strategy: "verified-partition" }] }), ctx())), ["INHERITANCE_PARTITION_UNVERIFIED"]);
  assert.deepEqual(codes(validateInheritance(decl({ memory: [{ nodeId: "m3", strategy: "unchanged-schema-identity", schemaDigest: { parent: "s1", candidate: "s2" } }] }), ctx())), ["INHERITANCE_SCHEMA_CHANGED"]);
  assert.deepEqual(codes(validateInheritance(decl({ memory: [{ nodeId: "m3", strategy: "unchanged-schema-identity" }] }), ctx())), ["INHERITANCE_SCHEMA_CHANGED"], "identity without both digests is not an identity");
});

test("acceptance: an active native lease is never copied or transferred; it remains with the effect owner, and every active lease needs an explicit disposition", () => {
  for (const action of ["copy", "transfer"] as const) {
    const out = validateInheritance(decl({ leases: [{ leaseId: "lease:gate-slot", action }] }), ctx());
    assert.deepEqual(codes(out), ["INHERITANCE_LEASE_COPIED"], action);
    assert.equal(out.refusals[0]!.subject, "lease:gate-slot");
    assert.deepEqual(out.retainedLeases, []);
  }
  assert.deepEqual(codes(validateInheritance(decl({ leases: [] }), ctx())), ["INHERITANCE_LEASE_UNDISPOSED"]);
  assert.equal(validateInheritance(decl({ leases: [{ leaseId: "lease:gate-slot", action: "remain-with-owner" }, { leaseId: "lease:old", action: "copy" }] }), ctx()).ok, true, "a released lease is not open; its disposition is free");
  assert.deepEqual(codes(validateInheritance(decl({ leases: [{ leaseId: "lease:gate-slot", action: "remain-with-owner" }, { leaseId: "lease:ghost", action: "remain-with-owner" }] }), ctx())), ["INHERITANCE_LEASE_UNKNOWN"]);
});

test("the parent revision must be the one the declaration inherits from", () => {
  const out = validateInheritance(decl({ parentRevision: "r6" }), ctx());
  assert.deepEqual(codes(out), ["INHERITANCE_PARENT_MISMATCH"]);
  assert.equal(out.inherited.length, 0);
});

test("the graph alias advances only by CAS against the validated parent: a moved alias refuses with the durability code, an unvalidated declaration never commits", () => {
  const validation = validateInheritance(decl(), ctx());
  const state = initialDurableState<GraphAlias>("r7", { graphId: "g1", revision: "r7" });
  const write = { writeId: "w1", decisionId: "d1", expectedRevision: "r7", nextRevision: "r8", value: { graphId: "g1", revision: "r8" }, receipt: { status: "acknowledged" as const, nativeRef: "native:alias-swap" } };
  const advanced = commitGraphAlias(state, validation, write);
  assert.equal(advanced.kind, "advanced");
  if (advanced.kind !== "advanced") return;
  assert.equal(advanced.state.revision, "r8");
  assert.deepEqual(advanced.state.value, { graphId: "g1", revision: "r8" });
  const moved = initialDurableState<GraphAlias>("r7b", { graphId: "g1", revision: "r7b" });
  const stale = commitGraphAlias(moved, validation, write);
  assert.equal(stale.kind, "refused");
  if (stale.kind !== "refused") return;
  assert.equal(stale.code, "DURABILITY_CAS_MISMATCH");
  const unvalidated = commitGraphAlias(state, validateInheritance(decl({ leases: [] }), ctx()), write);
  assert.equal(unvalidated.kind, "refused");
  if (unvalidated.kind !== "refused") return;
  assert.equal(unvalidated.code, "INHERITANCE_UNVALIDATED");
  assert.equal(unvalidated.state, state, "the state is handed back untouched");
});

test("the migration order is stop/drain, snapshot, validate, commit alias CAS, resume: a commit before validation, a resume before commit, an unknown or missing step is refused", () => {
  assert.deepEqual([...MIGRATION_STEPS], ["stop-or-drain", "snapshot", "validate", "commit-alias-cas", "resume"]);
  assert.equal(validateMigrationOrder([...MIGRATION_STEPS]).ok, true);
  assert.deepEqual(codes(validateMigrationOrder(["stop-or-drain", "snapshot", "commit-alias-cas", "validate", "resume"])), ["INHERITANCE_ORDER_VIOLATED"]);
  assert.deepEqual(codes(validateMigrationOrder(["stop-or-drain", "snapshot", "validate", "resume", "commit-alias-cas"])), ["INHERITANCE_ORDER_VIOLATED"]);
  assert.deepEqual(codes(validateMigrationOrder(["stop-or-drain", "snapshot", "validate", "commit-alias-cas"])), ["INHERITANCE_STEP_MISSING"]);
  assert.deepEqual(codes(validateMigrationOrder([...MIGRATION_STEPS, "celebrate"])), ["INHERITANCE_STEP_UNKNOWN"]);
});

test("rollback restores the snapshot alias and never rewinds a committed native action; uncommitted actions are abandoned, not undone", () => {
  const snapshot = initialDurableState<GraphAlias>("r7", { graphId: "g1", revision: "r7" });
  const out = rollbackInheritance(snapshot, [{ actionId: "push:main", committed: true }, { actionId: "lease:renew", committed: false }]);
  assert.equal(out.schema, "mw.inheritance-rollback.v0");
  assert.deepEqual(out.alias, { graphId: "g1", revision: "r7" });
  assert.deepEqual(out.retainedNativeActions, ["push:main"]);
  assert.deepEqual(out.abandonedActions, ["lease:renew"]);
  assert.deepEqual(out.rewoundNativeActions, []);
});

test("the validation is a pure record: every string leaf is an input leaf, a declared code, a digest of an input parameter or the schema", () => {
  const input = decl({ parameters: [{ ...param("temperature", 0.7), value: 0.9 }], leases: [{ leaseId: "lease:gate-slot", action: "copy" }] });
  const context = ctx();
  const out = validateInheritance(input, context);
  const known = new Set<string>([...stringLeaves(input), ...stringLeaves(context), out.schema, ...out.refusals.map(r => r.code)]);
  for (const leaf of stringLeaves({ ...out, refusals: out.refusals.map(({ detail: _d, ...rest }) => rest) })) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
  for (const refusal of out.refusals) assert.ok(refusal.detail.includes(refusal.subject));
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
