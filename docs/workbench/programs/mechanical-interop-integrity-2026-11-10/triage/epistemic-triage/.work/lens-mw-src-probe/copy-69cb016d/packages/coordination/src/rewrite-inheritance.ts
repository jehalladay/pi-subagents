/**
 * Rewrite state and parameter inheritance (APO-015; 07 "Rewrite lifecycle" line 13; ADR A08 CAS promotion): a
 * candidate inherits only named compatible parameters at their preserved source checkpoint, each content-addressed
 * by the canonical digest of (name, value, checkpoint); no raw wire-index migration. Memory strategies are reset,
 * verified partition or unchanged-schema identity. Open native leases and claims remain with the effect owner and are
 * never copied or transferred, and every open lease needs an explicit disposition. The graph alias advances only by
 * compare-and-swap against the validated parent (`commitDurable`), in the order stop/drain, snapshot, validate, commit,
 * resume; a rollback restores the snapshot alias and never rewinds a committed native action. Pure records: nothing
 * here stops an instance, swaps an alias or touches a lease.
 */
import { digest } from "./canonical.js";
import type { DurableOutcome, DurableState, DurableWrite } from "./durability.js";
import { commitDurable } from "./durability.js";

export interface InheritedParameter {
  readonly name: string;
  readonly value: unknown;
  /** The source checkpoint revision the value was taken from; it is preserved, never remapped. */
  readonly sourceCheckpoint: string;
  /** Canonical digest of { name, value, sourceCheckpoint }. */
  readonly digest: string;
}

export const parameterDigest = (parameter: Pick<InheritedParameter, "name" | "value" | "sourceCheckpoint">): string =>
  digest({ name: parameter.name, value: parameter.value, sourceCheckpoint: parameter.sourceCheckpoint });

export type MemoryStrategy = "reset" | "verified-partition" | "unchanged-schema-identity";

export interface MemoryInheritance {
  readonly nodeId: string;
  readonly strategy: MemoryStrategy;
  readonly partitionProof?: string;
  readonly schemaDigest?: { readonly parent: string; readonly candidate: string };
}

export type LeaseAction = "remain-with-owner" | "copy" | "transfer";

export interface LeaseDisposition {
  readonly leaseId: string;
  readonly action: LeaseAction;
}

export interface NativeLease {
  readonly leaseId: string;
  readonly owner: string;
  readonly state: "active" | "released";
}

export interface InheritanceDeclaration {
  readonly candidateId: string;
  readonly parentRevision: string;
  readonly parameters: readonly InheritedParameter[];
  readonly memory: readonly MemoryInheritance[];
  readonly leases: readonly LeaseDisposition[];
  /** Any raw wire-index remapping; its presence with members is a refusal. */
  readonly wireIndexMap?: readonly unknown[];
}

export interface InheritanceContext {
  readonly parentRevision: string;
  /** Named parameters the candidate may inherit, each at the checkpoint it must preserve. */
  readonly compatibleParameters: readonly { readonly name: string; readonly sourceCheckpoint: string }[];
  readonly activeLeases: readonly NativeLease[];
}

export type InheritanceRefusalCode =
  | "INHERITANCE_PARENT_MISMATCH"
  | "INHERITANCE_PARAMETER_UNNAMED"
  | "INHERITANCE_PARAMETER_INCOMPATIBLE"
  | "INHERITANCE_CHECKPOINT_NOT_PRESERVED"
  | "INHERITANCE_DIGEST_MISMATCH"
  | "INHERITANCE_WIRE_INDEX_MIGRATION"
  | "INHERITANCE_MEMORY_STRATEGY_UNKNOWN"
  | "INHERITANCE_PARTITION_UNVERIFIED"
  | "INHERITANCE_SCHEMA_CHANGED"
  | "INHERITANCE_LEASE_COPIED"
  | "INHERITANCE_LEASE_UNDISPOSED"
  | "INHERITANCE_LEASE_UNKNOWN";

export interface InheritanceRefusal {
  readonly code: InheritanceRefusalCode;
  readonly subject: string;
  readonly detail: string;
}

export interface InheritanceValidation {
  readonly schema: "mw.rewrite-inheritance.v0";
  readonly candidateId: string;
  readonly ok: boolean;
  readonly inherited: readonly { readonly name: string; readonly sourceCheckpoint: string; readonly digest: string }[];
  /** Open leases left with their effect owner. */
  readonly retainedLeases: readonly string[];
  readonly refusals: readonly InheritanceRefusal[];
}

const STRATEGIES: ReadonlySet<string> = new Set(["reset", "verified-partition", "unchanged-schema-identity"]);

export function validateInheritance(declaration: InheritanceDeclaration, context: InheritanceContext): InheritanceValidation {
  const base = { schema: "mw.rewrite-inheritance.v0" as const, candidateId: declaration.candidateId };
  if (declaration.parentRevision !== context.parentRevision) {
    return { ...base, ok: false, inherited: [], retainedLeases: [], refusals: [{ code: "INHERITANCE_PARENT_MISMATCH", subject: declaration.parentRevision, detail: `declaration inherits from ${declaration.parentRevision}; the parent is ${context.parentRevision}` }] };
  }
  const refusals: InheritanceRefusal[] = [];
  const inherited: { name: string; sourceCheckpoint: string; digest: string }[] = [];
  const compatible = new Map(context.compatibleParameters.map(p => [p.name, p.sourceCheckpoint]));

  for (const parameter of declaration.parameters) {
    if (parameter.name.trim().length === 0) {
      refusals.push({ code: "INHERITANCE_PARAMETER_UNNAMED", subject: parameter.sourceCheckpoint, detail: `a parameter from ${parameter.sourceCheckpoint} has no name; only named parameters inherit` });
      continue;
    }
    const checkpoint = compatible.get(parameter.name);
    if (checkpoint === undefined) {
      refusals.push({ code: "INHERITANCE_PARAMETER_INCOMPATIBLE", subject: parameter.name, detail: `${parameter.name} is not a named compatible parameter of the parent` });
      continue;
    }
    if (parameter.sourceCheckpoint !== checkpoint) {
      refusals.push({ code: "INHERITANCE_CHECKPOINT_NOT_PRESERVED", subject: parameter.name, detail: `${parameter.name} must preserve source checkpoint ${checkpoint}; the declaration carries ${parameter.sourceCheckpoint}` });
      continue;
    }
    const expected = parameterDigest(parameter);
    if (parameter.digest !== expected) {
      refusals.push({ code: "INHERITANCE_DIGEST_MISMATCH", subject: parameter.name, detail: `${parameter.name} claims digest ${parameter.digest}; its content gives ${expected}` });
      continue;
    }
    inherited.push({ name: parameter.name, sourceCheckpoint: parameter.sourceCheckpoint, digest: parameter.digest });
  }

  if (declaration.wireIndexMap !== undefined && declaration.wireIndexMap.length > 0) {
    refusals.push({ code: "INHERITANCE_WIRE_INDEX_MIGRATION", subject: declaration.candidateId, detail: `${declaration.candidateId} carries a raw wire-index map of ${declaration.wireIndexMap.length} entries; parameters inherit by name only` });
  }

  for (const memory of declaration.memory) {
    if (!STRATEGIES.has(memory.strategy)) {
      refusals.push({ code: "INHERITANCE_MEMORY_STRATEGY_UNKNOWN", subject: memory.nodeId, detail: `${memory.nodeId} declares memory strategy ${String(memory.strategy)}; only reset, verified-partition and unchanged-schema-identity exist` });
    } else if (memory.strategy === "verified-partition" && (memory.partitionProof === undefined || memory.partitionProof.length === 0)) {
      refusals.push({ code: "INHERITANCE_PARTITION_UNVERIFIED", subject: memory.nodeId, detail: `${memory.nodeId} declares a verified partition without a partition proof` });
    } else if (memory.strategy === "unchanged-schema-identity" && (memory.schemaDigest === undefined || memory.schemaDigest.parent !== memory.schemaDigest.candidate)) {
      refusals.push({ code: "INHERITANCE_SCHEMA_CHANGED", subject: memory.nodeId, detail: `${memory.nodeId} keeps memory by identity but its schema digest is not unchanged` });
    }
  }

  const retainedLeases: string[] = [];
  const open = new Map(context.activeLeases.filter(lease => lease.state === "active").map(lease => [lease.leaseId, lease]));
  const known = new Set(context.activeLeases.map(lease => lease.leaseId));
  const disposed = new Set<string>();
  for (const disposition of declaration.leases) {
    disposed.add(disposition.leaseId);
    if (!known.has(disposition.leaseId)) {
      refusals.push({ code: "INHERITANCE_LEASE_UNKNOWN", subject: disposition.leaseId, detail: `${disposition.leaseId} is not a lease the parent holds` });
      continue;
    }
    const lease = open.get(disposition.leaseId);
    if (lease === undefined) continue;
    if (disposition.action !== "remain-with-owner") {
      refusals.push({ code: "INHERITANCE_LEASE_COPIED", subject: disposition.leaseId, detail: `${disposition.leaseId} is an open native lease held by ${lease.owner}; it remains with the effect owner and is never ${disposition.action === "copy" ? "copied" : "transferred"}` });
      continue;
    }
    retainedLeases.push(disposition.leaseId);
  }
  for (const [leaseId, lease] of open) {
    if (!disposed.has(leaseId)) refusals.push({ code: "INHERITANCE_LEASE_UNDISPOSED", subject: leaseId, detail: `${leaseId} is an open native lease held by ${lease.owner} and the declaration says nothing about it` });
  }

  return { ...base, ok: refusals.length === 0, inherited, retainedLeases, refusals };
}

export interface GraphAlias {
  readonly graphId: string;
  readonly revision: string;
}

export type GraphAliasCommit =
  | DurableOutcome<GraphAlias>
  | { readonly kind: "refused"; readonly code: "INHERITANCE_UNVALIDATED"; readonly detail: string; readonly state: DurableState<GraphAlias> };

/** The alias swap is a CAS write; an unvalidated declaration never reaches it. */
export function commitGraphAlias(state: DurableState<GraphAlias>, validation: InheritanceValidation, write: DurableWrite<GraphAlias>): GraphAliasCommit {
  if (!validation.ok) {
    return { kind: "refused", code: "INHERITANCE_UNVALIDATED", detail: `${validation.candidateId} has ${validation.refusals.length} inheritance refusal(s); the alias does not move`, state };
  }
  return commitDurable(state, write);
}

export const MIGRATION_STEPS: readonly string[] = Object.freeze(["stop-or-drain", "snapshot", "validate", "commit-alias-cas", "resume"] as const);

export type MigrationOrderRefusalCode = "INHERITANCE_ORDER_VIOLATED" | "INHERITANCE_STEP_MISSING" | "INHERITANCE_STEP_UNKNOWN";

export interface MigrationOrderValidation {
  readonly ok: boolean;
  readonly refusals: readonly { readonly code: MigrationOrderRefusalCode; readonly subject: string; readonly detail: string }[];
}

export function validateMigrationOrder(steps: readonly string[]): MigrationOrderValidation {
  const refusals: MigrationOrderValidation["refusals"][number][] = [];
  for (const step of steps) {
    if (!MIGRATION_STEPS.includes(step)) refusals.push({ code: "INHERITANCE_STEP_UNKNOWN", subject: step, detail: `${step} is not a migration step` });
  }
  for (const step of MIGRATION_STEPS) {
    if (!steps.includes(step)) refusals.push({ code: "INHERITANCE_STEP_MISSING", subject: step, detail: `${step} is missing from the migration` });
  }
  if (refusals.length === 0) {
    const positions = MIGRATION_STEPS.map(step => steps.indexOf(step));
    for (let i = 1; i < positions.length; i++) {
      if (positions[i]! < positions[i - 1]!) {
        refusals.push({ code: "INHERITANCE_ORDER_VIOLATED", subject: MIGRATION_STEPS[i]!, detail: `${MIGRATION_STEPS[i]} runs before ${MIGRATION_STEPS[i - 1]}; the order is ${MIGRATION_STEPS.join(", ")}` });
      }
    }
  }
  return { ok: refusals.length === 0, refusals };
}

export interface NativeActionRecord {
  readonly actionId: string;
  readonly committed: boolean;
}

export interface InheritanceRollback {
  readonly schema: "mw.inheritance-rollback.v0";
  readonly alias: GraphAlias;
  readonly revision: string;
  /** Committed native actions stay committed; a rollback does not rewind them. */
  readonly retainedNativeActions: readonly string[];
  readonly abandonedActions: readonly string[];
  readonly rewoundNativeActions: readonly string[];
}

export function rollbackInheritance(snapshot: DurableState<GraphAlias>, actions: readonly NativeActionRecord[]): InheritanceRollback {
  return {
    schema: "mw.inheritance-rollback.v0",
    alias: snapshot.value,
    revision: snapshot.revision,
    retainedNativeActions: actions.filter(action => action.committed).map(action => action.actionId),
    abandonedActions: actions.filter(action => !action.committed).map(action => action.actionId),
    rewoundNativeActions: [],
  };
}
