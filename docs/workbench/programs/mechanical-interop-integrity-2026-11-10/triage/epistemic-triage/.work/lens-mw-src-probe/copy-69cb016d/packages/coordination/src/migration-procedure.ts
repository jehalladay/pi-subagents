/**
 * The end-to-end rewrite migration procedure (APO 07, Migration; carried by b677.6).
 *
 * Stop-or-drain active instances, snapshot the durable alias state, validate inheritance,
 * commit the graph alias by CAS, then resume — in that order, self-witnessed by
 * validateMigrationOrder over the transcript. An active instance refuses before anything
 * moves. A validation or CAS failure resolves per 3l61.13: the old graph alias stays active
 * (left-inactive candidate), and rollback per 3l61.8 retains every committed native action —
 * a rollback never rewinds them — while abandoning the uncommitted ones. A pending CAS
 * receipt holds before resume: the procedure neither resumes nor rolls back on a receipt the
 * native owner has not resolved. Pure orchestration over the landed pieces; nothing here
 * performs a native write.
 */

import { commitGraphAlias, rollbackInheritance, validateMigrationOrder, MIGRATION_STEPS } from "./rewrite-inheritance.js";
import type { GraphAlias, InheritanceValidation, NativeActionRecord, InheritanceRollback, MigrationOrderValidation } from "./rewrite-inheritance.js";
import { resolveMigrationFailure } from "./failure-handling.js";
import type { MigrationFailureResolution } from "./failure-handling.js";
import type { DurableState, DurableWrite } from "./durability.js";

export type MigrationProcedureRefusalCode = "MIGRATION_INSTANCES_ACTIVE" | "MIGRATION_STEPS_UNORDERED";

export interface MigrationInstance {
  readonly instanceId: string;
  readonly status: "active" | "drained" | "stopped";
}

export interface MigrationPlan {
  readonly active: DurableState<GraphAlias>;
  readonly validation: InheritanceValidation;
  readonly write: DurableWrite<GraphAlias>;
  readonly instances: readonly MigrationInstance[];
  /** Native actions issued during the attempt; rollback retains the committed ones. */
  readonly nativeActions: readonly NativeActionRecord[];
}

export interface MigrationStepRecord {
  readonly step: string;
  readonly status: "done" | "refused" | "held";
  readonly detail: string;
}

export type MigrationProcedureOutcome =
  | { readonly kind: "migrated"; readonly state: DurableState<GraphAlias>; readonly transcript: readonly MigrationStepRecord[]; readonly order: MigrationOrderValidation }
  | { readonly kind: "held-pending-receipt"; readonly state: DurableState<GraphAlias>; readonly transcript: readonly MigrationStepRecord[] }
  | { readonly kind: "failed"; readonly transcript: readonly MigrationStepRecord[]; readonly resolution: MigrationFailureResolution; readonly rollback: InheritanceRollback }
  | { readonly kind: "refused"; readonly code: MigrationProcedureRefusalCode; readonly detail: string };

export function runMigrationProcedure(plan: MigrationPlan): MigrationProcedureOutcome {
  const transcript: MigrationStepRecord[] = [];
  const activeInstances = plan.instances.filter((instance) => instance.status === "active");
  if (activeInstances.length > 0) {
    return { kind: "refused", code: "MIGRATION_INSTANCES_ACTIVE", detail: `stop-or-drain first: ${activeInstances.map((i) => i.instanceId).join(", ")} still active; nothing moves` };
  }
  transcript.push({ step: "stop-or-drain", status: "done", detail: `${plan.instances.length} instance(s) drained or stopped` });
  const snapshot: DurableState<GraphAlias> = plan.active;
  transcript.push({ step: "snapshot", status: "done", detail: `alias ${snapshot.value.graphId}@${snapshot.value.revision} at durable revision ${snapshot.revision}` });
  const fail = (failure: string): MigrationProcedureOutcome => {
    const resolution = resolveMigrationFailure(snapshot.value, { candidateRevision: plan.write.value.revision, failure });
    const rollback = rollbackInheritance(snapshot, plan.nativeActions);
    return { kind: "failed", transcript, resolution, rollback };
  };
  if (!plan.validation.ok) {
    transcript.push({ step: "validate", status: "refused", detail: `${plan.validation.candidateId} carries ${plan.validation.refusals.length} inheritance refusal(s)` });
    return fail("inheritance validation refused");
  }
  transcript.push({ step: "validate", status: "done", detail: `${plan.validation.candidateId} validated` });
  const commit = commitGraphAlias(plan.active, plan.validation, plan.write);
  if (commit.kind === "refused") {
    transcript.push({ step: "commit-alias-cas", status: "refused", detail: `${commit.code}: ${commit.detail}` });
    return fail(`${commit.code}: ${commit.detail}`);
  }
  if (commit.kind === "pending") {
    transcript.push({ step: "commit-alias-cas", status: "held", detail: "the native receipt is pending; the procedure holds before resume and neither resumes nor rolls back" });
    return { kind: "held-pending-receipt", state: commit.state, transcript };
  }
  transcript.push({ step: "commit-alias-cas", status: "done", detail: `alias advanced to ${commit.state.value.graphId}@${commit.state.value.revision} at durable revision ${commit.state.revision}` });
  transcript.push({ step: "resume", status: "done", detail: "instances resume on the committed alias" });
  const order = validateMigrationOrder(transcript.map((row) => row.step));
  if (!order.ok) {
    return { kind: "refused", code: "MIGRATION_STEPS_UNORDERED", detail: order.refusals.map((r) => r.detail).join("; ") };
  }
  return { kind: "migrated", state: commit.state, transcript, order };
}

export { MIGRATION_STEPS };
