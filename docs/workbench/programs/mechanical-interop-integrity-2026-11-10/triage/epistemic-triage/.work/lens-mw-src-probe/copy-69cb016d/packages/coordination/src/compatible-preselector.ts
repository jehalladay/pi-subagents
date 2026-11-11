/**
 * Optional pure compatible-subset preselector (APO 09, Admission; carried by b677.1).
 *
 * The preselector proposes a conflict-free subset of the disclosed intents BEFORE reconcile,
 * and reconcile stays the sole admission authority: the subset is exactly the set reconcile
 * itself would admit, so running reconcile with or without the preselector admits identical
 * sets. It can only narrow — it never adds an intent, never reorders the disclosed order,
 * never touches basis, budget or protected scopes, and never rescues one party of a conflict
 * (that would bypass a rejection). A guard refuses any narrowed input that is not a pure
 * narrowing, and an equivalence witness re-runs reconcile both ways and refuses any admitted
 * delta.
 */

import type { Intent, Proposal } from "./contracts.js";
import { reconcile, type ResolverInput } from "./resolver.js";

export type PreselectRefusalCode =
  | "PRESELECT_INTENT_ADDED"
  | "PRESELECT_ORDER_CHANGED"
  | "PRESELECT_BASIS_TOUCHED"
  | "PRESELECT_BUDGET_TOUCHED"
  | "PRESELECT_SCOPES_TOUCHED"
  | "PRESELECT_ADMISSION_CHANGED";

export interface Preselection {
  readonly schema: "mw.compatible-preselection.v0";
  readonly input: ResolverInput;
  readonly dropped: ReadonlyArray<{ readonly intentId: string; readonly reason: string }>;
}

/** Narrow the disclosed proposals to the compatible subset reconcile itself admits; order preserved, nothing else touched. */
export function preselectCompatibleSubset(input: ResolverInput): Preselection {
  const resolution = reconcile(input);
  const keep = new Set(resolution.admitted.map((intent) => intent.intentId));
  const dropped = resolution.rejected.map((rejection) => ({ intentId: rejection.intent.intentId, reason: rejection.code }));
  const proposals: Proposal<Intent, unknown>[] = input.proposals.map((proposal) => ({
    ...proposal,
    intents: proposal.intents.filter((intent) => keep.has(intent.intentId)),
  }));
  return Object.freeze({
    schema: "mw.compatible-preselection.v0",
    input: { basis: input.basis, budget: input.budget, protectedScopes: input.protectedScopes, proposals },
    dropped: Object.freeze(dropped),
  });
}

export interface NarrowingCheck {
  readonly schema: "mw.preselect-narrowing.v0";
  readonly ok: boolean;
  readonly refusals: ReadonlyArray<{ readonly code: PreselectRefusalCode; readonly detail: string }>;
}

/** The only power a preselector has is removal: anything else refuses. */
export function assertPreselectionOnlyNarrows(original: ResolverInput, narrowed: ResolverInput): NarrowingCheck {
  const refusals: Array<{ code: PreselectRefusalCode; detail: string }> = [];
  if (narrowed.basis.revision !== original.basis.revision) {
    refusals.push({ code: "PRESELECT_BASIS_TOUCHED", detail: `basis revision ${original.basis.revision} became ${narrowed.basis.revision}` });
  }
  if (JSON.stringify(narrowed.budget) !== JSON.stringify(original.budget)) {
    refusals.push({ code: "PRESELECT_BUDGET_TOUCHED", detail: "the budget is reconcile's, not the preselector's" });
  }
  if (JSON.stringify([...narrowed.protectedScopes]) !== JSON.stringify([...original.protectedScopes])) {
    refusals.push({ code: "PRESELECT_SCOPES_TOUCHED", detail: "protected scopes are native authority, not preselector input" });
  }
  const originalIds = original.proposals.flatMap((p) => p.intents.map((intent) => intent.intentId));
  const narrowedIds = narrowed.proposals.flatMap((p) => p.intents.map((intent) => intent.intentId));
  const originalSet = new Set(originalIds);
  for (const id of narrowedIds) {
    if (!originalSet.has(id)) refusals.push({ code: "PRESELECT_INTENT_ADDED", detail: `intent ${id} was not in the disclosed proposals` });
  }
  const narrowedSet = new Set(narrowedIds);
  const expectedOrder = originalIds.filter((id) => narrowedSet.has(id));
  if (JSON.stringify(expectedOrder) !== JSON.stringify(narrowedIds.filter((id) => originalSet.has(id)))) {
    refusals.push({ code: "PRESELECT_ORDER_CHANGED", detail: "the disclosed admission order is part of reconcile's contract" });
  }
  return { schema: "mw.preselect-narrowing.v0", ok: refusals.length === 0, refusals };
}

export interface PreselectionEquivalence {
  readonly schema: "mw.preselect-equivalence.v0";
  readonly identical: boolean;
  readonly withoutPreselector: readonly string[];
  readonly withPreselector: readonly string[];
  readonly refusals: ReadonlyArray<{ readonly code: PreselectRefusalCode; readonly detail: string }>;
}

/** Run reconcile with and without the preselector (injectable so a buggy one is testable); any admitted delta refuses — a bug can only reduce proposals, never bypass a rejection. */
export function witnessPreselectionEquivalence(input: ResolverInput, preselect: (input: ResolverInput) => Preselection = preselectCompatibleSubset): PreselectionEquivalence {
  const without = reconcile(input).admitted.map((intent) => intent.intentId);
  const pre = preselect(input);
  const withPre = reconcile(pre.input).admitted.map((intent) => intent.intentId);
  const refusals: Array<{ code: PreselectRefusalCode; detail: string }> = [];
  if (JSON.stringify(without) !== JSON.stringify(withPre)) {
    refusals.push({ code: "PRESELECT_ADMISSION_CHANGED", detail: `without [${without.join(",")}] != with [${withPre.join(",")}]; the preselector weakened or bypassed reconcile` });
  }
  const narrowing = assertPreselectionOnlyNarrows(input, pre.input);
  refusals.push(...narrowing.refusals);
  return { schema: "mw.preselect-equivalence.v0", identical: refusals.length === 0, withoutPreselector: without, withPreselector: withPre, refusals };
}
