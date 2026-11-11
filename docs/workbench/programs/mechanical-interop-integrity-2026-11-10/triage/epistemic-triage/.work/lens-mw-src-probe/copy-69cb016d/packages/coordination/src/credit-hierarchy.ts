/**
 * Credit-assignment hierarchy discipline (APO 10, Credit hierarchy; carried by lo6k.1).
 *
 * Credit assignment advances strictly up the exact-to-causal ladder: reference exact
 * enumeration, one-step REINFORCE, multi-step actor-specific return, critic learned under
 * heldout prediction, factorized interaction critic with complete causal closure, controlled
 * artifact removal/replacement. A rung is never skipped, and each advance requires a passing
 * witness for the rung being left: every witness for the rung being left must pass; one failing
 * witness refuses, whatever its position in the list. Lineage from producer to consumer is dependency evidence,
 * never causal proof; replay cannot generate unseen counterfactual effects; RNN BPTT is
 * unsupported in the M0/M1 policy actor contract. The causal-rung gate itself is landed as
 * attachPerActorCredit (training-export.ts): per-actor credit requires an intervention or
 * counterfactual derivation. This module carries the ladder discipline around it.
 */

export const CREDIT_RUNGS: readonly string[] = Object.freeze([
  "exact-enumeration",
  "one-step-reinforce",
  "multi-step-actor-return",
  "heldout-critic",
  "factorized-interaction-critic",
  "controlled-artifact-intervention",
]);

export type CreditRefusalCode =
  | "CREDIT_RUNG_UNKNOWN"
  | "CREDIT_RUNG_SKIPPED"
  | "CREDIT_NOT_AN_ADVANCE"
  | "CREDIT_WITNESS_MISSING"
  | "CREDIT_WITNESS_FAILED"
  | "CREDIT_BPTT_UNSUPPORTED"
  | "CREDIT_LINEAGE_NOT_CAUSAL"
  | "CREDIT_REPLAY_NO_COUNTERFACTUAL"
  | "CREDIT_EVIDENCE_UNKNOWN";

export interface RungWitness {
  /** The rung this witness exercised — an advance needs a passing witness for the rung being left. */
  readonly rung: string;
  readonly method: string;
  readonly ok: boolean;
}

export type RungAdvance =
  | { readonly kind: "advanced"; readonly from: string; readonly to: string; readonly witness: RungWitness }
  | { readonly kind: "refused"; readonly code: CreditRefusalCode; readonly detail: string };

export function advanceCreditRung(from: string, to: string, witnesses: readonly RungWitness[]): RungAdvance {
  const fromIndex = CREDIT_RUNGS.indexOf(from);
  const toIndex = CREDIT_RUNGS.indexOf(to);
  if (fromIndex < 0) return { kind: "refused", code: "CREDIT_RUNG_UNKNOWN", detail: `rung ${from} is outside the hierarchy` };
  if (toIndex < 0) return { kind: "refused", code: "CREDIT_RUNG_UNKNOWN", detail: `rung ${to} is outside the hierarchy` };
  if (toIndex <= fromIndex) return { kind: "refused", code: "CREDIT_NOT_AN_ADVANCE", detail: `${to} is not above ${from}; credit assignment advances strictly up` };
  if (toIndex !== fromIndex + 1) return { kind: "refused", code: "CREDIT_RUNG_SKIPPED", detail: `${from} -> ${to} skips ${CREDIT_RUNGS[fromIndex + 1]}; never skip a rung` };
  for (const witness of witnesses) {
    if (witness.method === "rnn-bptt") return { kind: "refused", code: "CREDIT_BPTT_UNSUPPORTED", detail: "RNN BPTT is unsupported in the M0/M1 policy actor contract" };
  }
  const leaving = witnesses.filter((w) => w.rung === from);
  if (leaving.length === 0) return { kind: "refused", code: "CREDIT_WITNESS_MISSING", detail: `no witness exercised the rung being left (${from})` };
  const failedCount = leaving.filter((w) => !w.ok).length;
  if (failedCount > 0) return { kind: "refused", code: "CREDIT_WITNESS_FAILED", detail: `${failedCount} of ${leaving.length} witnesses for ${from} failed; a failing rung is not left upward` };
  // Every witness passed; the first listed one is a reporting detail, never a decision input.
  const witness = leaving[0] as RungWitness;
  return { kind: "advanced", from, to, witness };
}

export interface CreditEvidence {
  readonly kind: string;
  /** Replay evidence claiming effects never observed in the trace. */
  readonly claimsUnseenCounterfactual?: boolean;
}

export type CreditEvidenceClassification =
  | { readonly kind: "causal"; readonly basis: "intervention" | "counterfactual" }
  | { readonly kind: "dependency-evidence"; readonly code: "CREDIT_LINEAGE_NOT_CAUSAL"; readonly detail: string }
  | { readonly kind: "refused"; readonly code: CreditRefusalCode; readonly detail: string };

/** Lineage is dependency evidence, never causal proof; replay certifies nothing it did not see. */
export function classifyCreditEvidence(evidence: CreditEvidence): CreditEvidenceClassification {
  if (evidence.kind === "intervention" || evidence.kind === "counterfactual") {
    return { kind: "causal", basis: evidence.kind };
  }
  if (evidence.kind === "lineage") {
    return { kind: "dependency-evidence", code: "CREDIT_LINEAGE_NOT_CAUSAL", detail: "lineage from producer to consumer is dependency evidence, not causal proof of per-actor benefit" };
  }
  if (evidence.kind === "replay") {
    if (evidence.claimsUnseenCounterfactual === true) {
      return { kind: "refused", code: "CREDIT_REPLAY_NO_COUNTERFACTUAL", detail: "replay cannot generate unseen counterfactual effects" };
    }
    return { kind: "dependency-evidence", code: "CREDIT_LINEAGE_NOT_CAUSAL", detail: "a replay of the observed trace witnesses dependencies, not causation" };
  }
  return { kind: "refused", code: "CREDIT_EVIDENCE_UNKNOWN", detail: `evidence kind ${evidence.kind} is outside intervention/counterfactual/lineage/replay` };
}
