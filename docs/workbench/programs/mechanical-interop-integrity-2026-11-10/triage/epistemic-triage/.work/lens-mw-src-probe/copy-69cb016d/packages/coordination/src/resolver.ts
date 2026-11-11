import type { Basis, Budget, Intent, Proposal, ResourceClaim } from "./contracts.js";

/** Stable diagnostics a rejected intent carries; a consumer branches on the code, never on the detail text. */
export type RejectionCode =
  | "INTENT_BASIS_STALE"
  | "INTENT_SCOPE_PROTECTED"
  | "INTENT_WRITE_CONFLICT"
  | "INTENT_BUDGET_EXCEEDED"
  | "INTENT_DUPLICATE"
  | "INTENT_AUTHORITY_EXCEEDED"
  | "INTENT_CLAIM_INVALID";

export interface Rejection {
  readonly intent: Intent;
  readonly code: RejectionCode;
  readonly detail: string;
}

/** Two or more intents whose scopes interfere; every one of them is rejected, none is picked by a tie-breaker. */
export interface Conflict {
  readonly scope: string;
  readonly intentIds: readonly string[];
}

export interface ResolverInput {
  readonly basis: Basis;
  readonly budget: Budget;
  /** Write scopes no policy intent may touch (protected actor, task or global mutation scopes). */
  readonly protectedScopes: readonly string[];
  /** Disclosed admission order: proposals in the order given, intents in proposal order. */
  readonly proposals: readonly Proposal<Intent, unknown>[];
}

export interface Resolution {
  readonly basis: Basis;
  readonly budget: Budget;
  /** Admissible against this basis, these protected scopes and this budget; still not an authorized effect. */
  readonly admitted: readonly Intent[];
  readonly rejected: readonly Rejection[];
  readonly conflicts: readonly Conflict[];
  readonly budgetUsed: ResourceClaim;
}

const ZERO: ResourceClaim = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
const DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;

/** A claim dimension is a finite, non-negative number; NaN, a negative value and either infinity are not (contracts.ts declares the dimensions non-negative). */
function invalidDimension(claim: ResourceClaim): (typeof DIMENSIONS)[number] | undefined {
  return DIMENSIONS.find(dimension => !Number.isFinite(claim[dimension]) || claim[dimension] < 0);
}

function add(a: ResourceClaim, b: ResourceClaim): ResourceClaim {
  return { compute: a.compute + b.compute, workers: a.workers + b.workers, queue: a.queue + b.queue, latencyMs: a.latencyMs + b.latencyMs };
}

/**
 * Decide which proposed intents are admissible against one pinned basis.
 *
 * Checks run per intent in this order, and the first failure names the rejection: duplicate id, declared effect
 * authority, stale expected revision, protected write scope, invalid claim (a NaN, negative or infinite
 * dimension, which would otherwise poison the cumulative budget because `NaN > cap` is false); then the survivors are checked pairwise for scope
 * interference (a write against another intent's read or write of the same scope rejects every party and records
 * one `Conflict` per scope); then the budget is applied cumulatively in the disclosed order, rejecting the intent
 * that would cross any cap while later, cheaper intents may still fit. The aggregate demand is the per-dimension SUM of the
 * admitted claims (never the maximum): two proposals that each fit the budget alone cannot both pass when their sum crosses a
 * cap, and the later one in disclosed order is refused. Nothing here executes anything.
 */
export function reconcile(input: ResolverInput): Resolution {
  const { basis, budget, protectedScopes, proposals } = input;
  const rejected: Rejection[] = [];
  const survivors: Intent[] = [];
  const seen = new Set<string>();
  for (const proposal of proposals) {
    for (const intent of proposal.intents) {
      if (seen.has(intent.intentId)) {
        rejected.push({ intent, code: "INTENT_DUPLICATE", detail: `intent id ${intent.intentId} was already proposed in this batch` });
        continue;
      }
      seen.add(intent.intentId);
      if (intent.authority !== undefined && intent.authority !== "propose-only") {
        rejected.push({ intent, code: "INTENT_AUTHORITY_EXCEEDED", detail: `intent declares ${intent.authority}; a policy may only propose` });
        continue;
      }
      if (intent.expectedRevision !== basis.revision) {
        rejected.push({ intent, code: "INTENT_BASIS_STALE", detail: `intent expected revision ${intent.expectedRevision}, basis is ${basis.revision}` });
        continue;
      }
      const guarded = intent.writeScopes.find(scope => protectedScopes.includes(scope));
      if (guarded !== undefined) {
        rejected.push({ intent, code: "INTENT_SCOPE_PROTECTED", detail: `write scope ${guarded} is protected` });
        continue;
      }
      const badDimension = invalidDimension(intent.claim);
      if (badDimension !== undefined) {
        rejected.push({ intent, code: "INTENT_CLAIM_INVALID", detail: `claim ${badDimension} ${String(intent.claim[badDimension])} is not a finite non-negative number` });
        continue;
      }
      survivors.push(intent);
    }
  }
  // Scope interference: a writer against any other intent's read or write of the same scope.
  const conflicts: Conflict[] = [];
  const conflicted = new Set<string>();
  const scopeOrder: string[] = [];
  for (const intent of survivors) for (const scope of [...intent.writeScopes, ...intent.readScopes]) if (!scopeOrder.includes(scope)) scopeOrder.push(scope);
  for (const scope of scopeOrder) {
    const writers = survivors.filter(intent => intent.writeScopes.includes(scope));
    const touching = survivors.filter(intent => intent.writeScopes.includes(scope) || intent.readScopes.includes(scope));
    if (writers.length === 0 || touching.length < 2) continue;
    const intentIds = touching.map(intent => intent.intentId);
    conflicts.push({ scope, intentIds });
    for (const intent of touching) {
      if (conflicted.has(intent.intentId)) continue;
      conflicted.add(intent.intentId);
      const others = intentIds.filter(id => id !== intent.intentId).join(", ");
      rejected.push({ intent, code: "INTENT_WRITE_CONFLICT", detail: `scope ${scope} interferes with ${others}` });
    }
  }
  // Budget, cumulative in disclosed order.
  const admitted: Intent[] = [];
  let used = ZERO;
  for (const intent of survivors) {
    if (conflicted.has(intent.intentId)) continue;
    const next = add(used, intent.claim);
    const over = DIMENSIONS.filter(dimension => next[dimension] > budget[dimension]);
    if (over.length > 0) {
      const named = over.map(dimension => `${dimension} ${used[dimension]}+${intent.claim[dimension]} exceeds ${budget[dimension]}`).join("; ");
      rejected.push({ intent, code: "INTENT_BUDGET_EXCEEDED", detail: named });
      continue;
    }
    used = next;
    admitted.push(intent);
  }
  return { basis, budget, admitted, rejected, conflicts, budgetUsed: used };
}
