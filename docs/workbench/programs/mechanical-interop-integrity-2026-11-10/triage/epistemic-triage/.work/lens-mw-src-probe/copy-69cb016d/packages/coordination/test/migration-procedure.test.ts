import test from "node:test";
import assert from "node:assert/strict";
import {
  runMigrationProcedure,
  MIGRATION_STEPS,
  type MigrationPlan,
  type DurableState,
  type GraphAlias,
  type InheritanceValidation,
} from "../dist/index.js";

const alias: GraphAlias = { graphId: "g-1", revision: "graph-r7" };
const active: DurableState<GraphAlias> = { schema: "mw.durable-state.v0", revision: "d-3", value: alias, pending: [], committed: [] };
const validation = (ok: boolean): InheritanceValidation => ({ schema: "mw.rewrite-inheritance.v0", candidateId: "cand-1", ok, inherited: [], retainedLeases: [], refusals: ok ? [] : [{ code: "INHERITANCE_PARAMETER_INCOMPATIBLE", subject: "w", detail: "shape changed" } as InheritanceValidation["refusals"][number]] });
const plan = (over: Partial<MigrationPlan>): MigrationPlan => ({
  active,
  validation: validation(true),
  write: { writeId: "w-1", decisionId: "dec-1", expectedRevision: "d-3", nextRevision: "d-4", value: { graphId: "g-1", revision: "graph-r8" }, receipt: { status: "acknowledged", nativeRef: "beads:tx-9" } },
  instances: [
    { instanceId: "i-1", status: "drained" },
    { instanceId: "i-2", status: "stopped" },
  ],
  nativeActions: [
    { actionId: "act-committed", committed: true },
    { actionId: "act-open", committed: false },
  ],
  ...over,
});

test("the happy path migrates through the five steps in order and advances the alias", () => {
  const r = runMigrationProcedure(plan({}));
  assert.equal(r.kind, "migrated");
  if (r.kind !== "migrated") return;
  assert.deepEqual(r.transcript.map((row) => row.step), [...MIGRATION_STEPS]);
  assert.ok(r.transcript.every((row) => row.status === "done"));
  assert.equal(r.transcript[0]!.detail, "2 instance(s) drained or stopped");
  assert.equal(r.order.ok, true);
  assert.equal(r.state.revision, "d-4");
  assert.deepEqual(r.state.value, { graphId: "g-1", revision: "graph-r8" });
});

test("an active instance refuses before anything moves", () => {
  const r = runMigrationProcedure(plan({ instances: [{ instanceId: "i-hot", status: "active" }] }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") {
    assert.equal(r.code, "MIGRATION_INSTANCES_ACTIVE");
    assert.ok(r.detail.includes("i-hot"));
  }
});

test("an active instance anywhere in the list refuses, not only a lone or first one", () => {
  const r = runMigrationProcedure(plan({ instances: [{ instanceId: "i-1", status: "drained" }, { instanceId: "i-hot", status: "active" }] }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") {
    assert.equal(r.code, "MIGRATION_INSTANCES_ACTIVE");
    assert.ok(r.detail.includes("i-hot"));
  }
});

test("two active instances refuse with both ids named in the detail", () => {
  const r = runMigrationProcedure(plan({ instances: [{ instanceId: "i-a", status: "active" }, { instanceId: "i-b", status: "active" }] }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") {
    assert.ok(r.detail.includes("i-a"));
    assert.ok(r.detail.includes("i-b"));
  }
});

test("a refused validation fails the migration and the old graph stays active", () => {
  const r = runMigrationProcedure(plan({ validation: validation(false) }));
  assert.equal(r.kind, "failed");
  if (r.kind !== "failed") return;
  assert.equal(r.resolution.disposition, "left-inactive");
  assert.deepEqual(r.resolution.active, alias);
  assert.equal(r.resolution.candidateRevision, "graph-r8");
  assert.equal(r.resolution.failure, "inheritance validation refused");
  assert.deepEqual(r.transcript.map((row) => row.step), ["stop-or-drain", "snapshot", "validate"]);
  assert.equal(r.transcript[2]!.status, "refused");
});

test("rollback retains committed native actions and abandons open ones; nothing is rewound", () => {
  const r = runMigrationProcedure(plan({ validation: validation(false) }));
  assert.equal(r.kind, "failed");
  if (r.kind !== "failed") return;
  assert.deepEqual([...r.rollback.retainedNativeActions], ["act-committed"]);
  assert.deepEqual([...r.rollback.abandonedActions], ["act-open"]);
  assert.deepEqual([...r.rollback.rewoundNativeActions], []);
  assert.deepEqual(r.rollback.alias, alias);
  assert.equal(r.rollback.revision, "d-3");
});

test("a CAS mismatch fails the migration with the durability code and the old alias active", () => {
  const stale = plan({ write: { writeId: "w-1", decisionId: "dec-1", expectedRevision: "d-2", nextRevision: "d-4", value: { graphId: "g-1", revision: "graph-r8" }, receipt: { status: "acknowledged", nativeRef: "beads:tx-9" } } });
  const r = runMigrationProcedure(stale);
  assert.equal(r.kind, "failed");
  if (r.kind !== "failed") return;
  assert.ok(r.resolution.failure.includes("DURABILITY_CAS_MISMATCH"));
  assert.deepEqual(r.resolution.active, alias);
  assert.deepEqual([...r.rollback.retainedNativeActions], ["act-committed"]);
  assert.deepEqual([...r.rollback.abandonedActions], ["act-open"]);
  assert.deepEqual([...r.rollback.rewoundNativeActions], []);
  assert.equal(r.transcript.at(-1)!.step, "commit-alias-cas");
  assert.equal(r.transcript.at(-1)!.status, "refused");
});

test("a pending receipt holds before resume: no resume row, no rollback, pending recorded", () => {
  const pending = plan({ write: { writeId: "w-1", decisionId: "dec-1", expectedRevision: "d-3", nextRevision: "d-4", value: { graphId: "g-1", revision: "graph-r8" }, receipt: { status: "pending", nativeRef: "beads:tx-9" } } });
  const r = runMigrationProcedure(pending);
  assert.equal(r.kind, "held-pending-receipt");
  if (r.kind !== "held-pending-receipt") return;
  assert.ok(!r.transcript.some((row) => row.step === "resume"));
  assert.equal(r.transcript.at(-1)!.step, "commit-alias-cas");
  assert.equal(r.transcript.at(-1)!.status, "held");
  assert.equal(r.state.pending.length, 1);
  assert.equal(r.state.revision, "d-3");
});

test("an unvalidated declaration never reaches the CAS: the refusal happens at validate, not commit", () => {
  const r = runMigrationProcedure(plan({ validation: validation(false) }));
  assert.equal(r.kind, "failed");
  if (r.kind !== "failed") return;
  assert.ok(!r.transcript.some((row) => row.step === "commit-alias-cas"));
});
