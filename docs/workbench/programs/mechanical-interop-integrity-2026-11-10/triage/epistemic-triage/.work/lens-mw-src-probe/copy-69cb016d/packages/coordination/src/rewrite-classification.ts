/**
 * Rewrite classification (APO-014, ADR A09; 07 "Exact versus behavioral"): an exact refactor and a behavior-changing
 * adaptation are different things and pass different gates. An exact refactor is witnessed by observable trace or
 * declared contract equivalence — port equality alone is insufficient, and where the rewrite touches a stochastic
 * node, copying a random output differs from independent sampling, so the witness must say sampling stays
 * independent. An exact refactor preserves declared contracts, so a contract change is never one. A behavior change
 * needs no equivalence witness; it proves valid authority, resource and evidence contracts and a separate comparative
 * fitness against its parent. `classifyRewrite` records the class and the gates it requires; `gatePromotionByClass`
 * appends those gates to a promotion candidate's required guarantees so `decidePromotion` refuses when any gate has
 * no proof (the APO-014 acceptance: promotion refuses a missing gate). Pure records; no gate is evaluated here.
 */
import type { RewriteChange } from "./rewrite-boundary.js";
import type { PromotionCandidate } from "./promotion.js";

export type RewriteClass = "exact-refactor" | "behavior-changing";
export type EquivalenceWitnessKind = "trace" | "contract" | "port-equality";

export interface EquivalenceWitness {
  readonly kind: EquivalenceWitnessKind;
  /** What the equivalence was checked against: a replayed trace set, a declared contract id at a revision. */
  readonly basis: string;
  /** True only when the witness establishes that sampling stays independent rather than copied. */
  readonly independentSampling: boolean;
}

export interface RewriteClassificationInput {
  readonly candidateId: string;
  readonly declaredClass: RewriteClass;
  readonly changes: readonly RewriteChange[];
  /** Node ids whose implementation samples; a rewrite that changes one of them changes a random source. */
  readonly stochasticTargets: readonly string[];
  readonly equivalence?: EquivalenceWitness;
}

export type RewriteClassRefusalCode =
  | "REWRITE_CLASS_UNKNOWN"
  | "REWRITE_CLASS_EXACT_UNWITNESSED"
  | "REWRITE_CLASS_WITNESS_INSUFFICIENT"
  | "REWRITE_CLASS_STOCHASTIC_COPY"
  | "REWRITE_CLASS_CONTRACT_CHANGED"
  | "REWRITE_CLASS_UNRESOLVED"
  | "REWRITE_CLASS_CANDIDATE_MISMATCH";

export interface RewriteClassRefusal {
  readonly code: RewriteClassRefusalCode;
  /** The change id, node id, witness kind, class word or candidate id the refusal is about. */
  readonly subject: string;
  readonly detail: string;
}

export interface RewriteClassification {
  readonly schema: "mw.rewrite-classification.v0";
  readonly candidateId: string;
  readonly class: RewriteClass | "unclassified";
  /** Guarantee ids the class requires; empty when unclassified. */
  readonly requiredGates: readonly string[];
  readonly refusals: readonly RewriteClassRefusal[];
}

/** The distinct gate sets (ADR A09). Exact: equivalence proof and complete dependency footprint (07 line 16). Behavior: the three contracts and comparative fitness (07 line 10). */
export const REWRITE_CLASS_GATES: Readonly<Record<RewriteClass, readonly string[]>> = Object.freeze({
  "exact-refactor": Object.freeze(["gate:equivalence-proof", "gate:dependency-footprint"] as const),
  "behavior-changing": Object.freeze(["gate:authority-contract", "gate:resource-contract", "gate:evidence-contract", "gate:comparative-fitness"] as const),
});

const unclassified = (candidateId: string, refusals: readonly RewriteClassRefusal[]): RewriteClassification =>
  ({ schema: "mw.rewrite-classification.v0", candidateId, class: "unclassified", requiredGates: [], refusals });

export function classifyRewrite(input: RewriteClassificationInput): RewriteClassification {
  const refusals: RewriteClassRefusal[] = [];
  const declared: string = input.declaredClass;
  if (declared !== "exact-refactor" && declared !== "behavior-changing") {
    return unclassified(input.candidateId, [{ code: "REWRITE_CLASS_UNKNOWN", subject: declared, detail: `declared class ${declared} is neither exact-refactor nor behavior-changing` }]);
  }
  if (declared === "behavior-changing") {
    return { schema: "mw.rewrite-classification.v0", candidateId: input.candidateId, class: "behavior-changing", requiredGates: REWRITE_CLASS_GATES["behavior-changing"], refusals };
  }

  for (const change of input.changes) {
    if (change.kind === "contract") {
      refusals.push({ code: "REWRITE_CLASS_CONTRACT_CHANGED", subject: change.id, detail: `an exact refactor preserves declared contracts; ${change.id} is ${change.op === "add" ? "added" : change.op === "remove" ? "removed" : "modified"}` });
    }
  }
  const witness = input.equivalence;
  if (witness === undefined) {
    refusals.push({ code: "REWRITE_CLASS_EXACT_UNWITNESSED", subject: input.candidateId, detail: `${input.candidateId} claims an exact refactor without a trace or contract equivalence witness` });
  } else if (witness.kind !== "trace" && witness.kind !== "contract") {
    refusals.push({ code: "REWRITE_CLASS_WITNESS_INSUFFICIENT", subject: witness.kind, detail: `${witness.kind} alone does not witness equivalence; a trace or declared contract equivalence is required` });
  } else if (!witness.independentSampling) {
    const touched = input.changes.filter(change => change.kind === "node" && input.stochasticTargets.includes(change.id));
    for (const change of touched) {
      refusals.push({ code: "REWRITE_CLASS_STOCHASTIC_COPY", subject: change.id, detail: `${change.id} samples and is changed; the witness does not establish independent sampling, and a copied random output is not an equivalence` });
    }
  }
  if (refusals.length > 0) return unclassified(input.candidateId, refusals);
  return { schema: "mw.rewrite-classification.v0", candidateId: input.candidateId, class: "exact-refactor", requiredGates: REWRITE_CLASS_GATES["exact-refactor"], refusals };
}

export type GatedPromotion =
  | { readonly kind: "gated"; readonly candidate: PromotionCandidate }
  | { readonly kind: "refused"; readonly refusals: readonly RewriteClassRefusal[] };

/** Appends the class gates to the candidate's required guarantees, so a missing gate proof refuses promotion. */
export function gatePromotionByClass(classification: RewriteClassification, candidate: PromotionCandidate): GatedPromotion {
  if (classification.candidateId !== candidate.candidateId) {
    return { kind: "refused", refusals: [{ code: "REWRITE_CLASS_CANDIDATE_MISMATCH", subject: candidate.candidateId, detail: `classification is for ${classification.candidateId}, candidate is ${candidate.candidateId}` }] };
  }
  if (classification.class === "unclassified") {
    return { kind: "refused", refusals: [...classification.refusals, { code: "REWRITE_CLASS_UNRESOLVED", subject: candidate.candidateId, detail: `${candidate.candidateId} is unclassified; no gate set applies and promotion cannot be gated` }] };
  }
  const required = [...candidate.requiredGuarantees];
  for (const gate of classification.requiredGates) if (!required.includes(gate)) required.push(gate);
  return { kind: "gated", candidate: { ...candidate, requiredGuarantees: required } };
}
