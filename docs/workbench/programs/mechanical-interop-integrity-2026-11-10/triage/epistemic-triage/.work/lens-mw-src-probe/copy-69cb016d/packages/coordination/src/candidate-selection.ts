/**
 * Rewrite-candidate selection (APO 07 L19; carried by lo6k.2).
 *
 * A candidate carries exactly ONE proposed rewrite. Selection compares the candidate against
 * its parent on heldout workload regimes — every regime must be heldout with seeds disjoint
 * from training — across score, compute/search budget, tail risk and stability. A guard-axis
 * regression (budget, tail risk or stability beyond its declared tolerance) rejects; a
 * candidate that beats the parent's score on no regime rejects. Each guard axis carries a declared
 * direction (hvxt ruling Q1): computeBudget and tailRisk are lower-is-better, stability is
 * higher-is-better. The outcome is a selection
 * record, never a promotion: explicit promotion runs its required gates elsewhere. Every
 * evaluation — selected or rejected — is retained in an immutable lineage archive.
 */

export type SelectionRefusalCode =
  | "SELECTION_NO_REWRITE"
  | "SELECTION_MULTIPLE_REWRITES"
  | "SELECTION_REGIMES_EMPTY"
  | "SELECTION_REGIME_NOT_HELDOUT"
  | "SELECTION_METRIC_NONFINITE"
  | "SELECTION_METRIC_NEGATIVE"
  | "SELECTION_TOLERANCE_NEGATIVE"
  | "SELECTION_PARENT_MISMATCH"
  | "SELECTION_LINEAGE_DUPLICATE";

/**
 * Metrics of one candidate or parent on one heldout regime. `score` keeps its unconstrained finite contract.
 * The guard axes carry a declared direction (hvxt ruling Q1): `computeBudget` and `tailRisk` are
 * lower-is-better, `stability` is higher-is-better. Every guard metric must be finite and nonnegative
 * (hvxt ruling Q2): a negative finite guard metric refuses with SELECTION_METRIC_NEGATIVE. A zero parent on a
 * lower-is-better axis admits no increase at any relative tolerance.
 */
export interface MetricSet {
  readonly score: number;
  readonly computeBudget: number;
  readonly tailRisk: number;
  readonly stability: number;
}

export interface HeldoutRegime {
  readonly regime: string;
  readonly heldout: boolean;
  readonly seedsDisjointFromTraining: boolean;
  readonly candidate: MetricSet;
  readonly parent: MetricSet;
}

export interface SelectionInput {
  readonly candidateId: string;
  readonly parentId: string;
  readonly rewrites: readonly string[];
  readonly declaredParentId: string;
  readonly regimes: readonly HeldoutRegime[];
  /** Allowed relative worsening on each guard axis; 0 means no regression at all. */
  readonly tolerances: { readonly computeBudget: number; readonly tailRisk: number; readonly stability: number };
}

export interface SelectionRecord {
  readonly schema: "mw.candidate-selection.v0";
  readonly candidateId: string;
  readonly parentId: string;
  readonly decision: "selected" | "rejected";
  readonly scoreWins: readonly string[];
  readonly guardRegressions: ReadonlyArray<{ readonly regime: string; readonly axis: "computeBudget" | "tailRisk" | "stability"; readonly candidate: number; readonly parent: number }>;
  readonly promotion: "not-performed";
  readonly refusals: ReadonlyArray<{ readonly code: SelectionRefusalCode; readonly detail: string }>;
}

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);
const GUARD_AXES = ["computeBudget", "tailRisk", "stability"] as const;
/** Declared direction per guard axis (hvxt ruling Q1): the regression is a signed worsening against the parent. */
const GUARD_DIRECTIONS: Readonly<Record<(typeof GUARD_AXES)[number], "lower-is-better" | "higher-is-better">> = Object.freeze({
  computeBudget: "lower-is-better",
  tailRisk: "lower-is-better",
  stability: "higher-is-better",
});
const METRIC_KEYS = ["score", ...GUARD_AXES] as const;

export function compareOnHeldout(input: SelectionInput): SelectionRecord {
  const refusals: Array<{ code: SelectionRefusalCode; detail: string }> = [];
  if (input.rewrites.length === 0) refusals.push({ code: "SELECTION_NO_REWRITE", detail: "a candidate carries exactly one proposed rewrite; this one carries none" });
  if (input.rewrites.length > 1) refusals.push({ code: "SELECTION_MULTIPLE_REWRITES", detail: `a candidate carries exactly one proposed rewrite; this one carries ${input.rewrites.length}` });
  if (input.declaredParentId !== input.parentId) refusals.push({ code: "SELECTION_PARENT_MISMATCH", detail: `evaluated against ${input.parentId} but declared parent ${input.declaredParentId}` });
  if (input.regimes.length === 0) refusals.push({ code: "SELECTION_REGIMES_EMPTY", detail: "selection compares on heldout regimes; none were provided" });
  // Validate the DECLARED axes, never only the keys an input happens to carry: an absent key would read undefined,
  // make the guard threshold NaN and record no regression (fail-open). A missing tolerances object refuses too.
  const tolerances: Partial<Record<(typeof GUARD_AXES)[number], unknown>> | undefined =
    typeof input.tolerances === "object" && input.tolerances !== null ? input.tolerances : undefined;
  if (tolerances === undefined) {
    refusals.push({ code: "SELECTION_METRIC_NONFINITE", detail: "tolerances must be an object declaring computeBudget, tailRisk and stability; none was provided" });
  } else {
    for (const axis of GUARD_AXES) {
      const tol = tolerances[axis];
      if (!finite(tol)) refusals.push({ code: "SELECTION_METRIC_NONFINITE", detail: `tolerance ${axis} must be a finite number` });
      else if (tol < 0) refusals.push({ code: "SELECTION_TOLERANCE_NEGATIVE", detail: `tolerance ${axis} must be nonnegative; got ${tol}` });
    }
  }
  const scoreWins: string[] = [];
  const guardRegressions: Array<{ regime: string; axis: (typeof GUARD_AXES)[number]; candidate: number; parent: number }> = [];
  for (const regime of input.regimes) {
    if (!regime.heldout || !regime.seedsDisjointFromTraining) {
      refusals.push({ code: "SELECTION_REGIME_NOT_HELDOUT", detail: `regime ${regime.regime} is not heldout with training-disjoint seeds; comparison on it proves nothing` });
      continue;
    }
    const badMetrics: string[] = [];
    for (const side of ["candidate", "parent"] as const) {
      const set: Partial<Record<(typeof METRIC_KEYS)[number], unknown>> | undefined = typeof regime[side] === "object" && regime[side] !== null ? regime[side] : undefined;
      for (const key of METRIC_KEYS) if (!finite(set?.[key])) badMetrics.push(`${side}.${key}`);
    }
    // A negative guard metric is a sign-contract violation (hvxt ruling Q2); score stays unconstrained.
    const negatives: string[] = [];
    for (const side of ["candidate", "parent"] as const) {
      const set = regime[side] as Partial<Record<(typeof METRIC_KEYS)[number], unknown>> | undefined;
      for (const axis of GUARD_AXES) {
        const v = set?.[axis];
        if (finite(v) && v < 0) negatives.push(`${side}.${axis}=${v}`);
      }
    }
    if (badMetrics.length > 0) refusals.push({ code: "SELECTION_METRIC_NONFINITE", detail: `regime ${regime.regime} carries a nonfinite or missing metric: ${badMetrics.join(", ")}` });
    if (negatives.length > 0) refusals.push({ code: "SELECTION_METRIC_NEGATIVE", detail: `regime ${regime.regime} carries a negative guard metric: ${negatives.join(", ")}` });
    if (badMetrics.length > 0 || negatives.length > 0) continue;
    if (regime.candidate.score > regime.parent.score) scoreWins.push(regime.regime);
    for (const axis of GUARD_AXES) {
      const c = regime.candidate[axis];
      const p = regime.parent[axis];
      // Signed worsening against the declared direction; a regression is a worsening beyond tolerance * parent.
      const worsening = GUARD_DIRECTIONS[axis] === "higher-is-better" ? p - c : c - p;
      if (tolerances !== undefined && worsening > input.tolerances[axis] * p) guardRegressions.push({ regime: regime.regime, axis, candidate: c, parent: p });
    }
  }
  const decision: "selected" | "rejected" = refusals.length === 0 && guardRegressions.length === 0 && scoreWins.length > 0 ? "selected" : "rejected";
  return Object.freeze({ schema: "mw.candidate-selection.v0", candidateId: input.candidateId, parentId: input.parentId, decision, scoreWins: Object.freeze(scoreWins), guardRegressions: Object.freeze(guardRegressions), promotion: "not-performed", refusals: Object.freeze(refusals) });
}

export interface LineageArchive {
  readonly schema: "mw.selection-lineage.v0";
  readonly records: readonly SelectionRecord[];
}

export const EMPTY_LINEAGE: LineageArchive = Object.freeze({ schema: "mw.selection-lineage.v0", records: Object.freeze([]) });

export type LineageOutcome =
  | { readonly kind: "retained"; readonly lineage: LineageArchive }
  | { readonly kind: "refused"; readonly code: SelectionRefusalCode; readonly detail: string };

/** Every evaluation is retained — rejected ones included; re-recording a candidate id is refused, never overwritten. */
export function retainInLineage(archive: LineageArchive, record: SelectionRecord): LineageOutcome {
  if (archive.records.some((r) => r.candidateId === record.candidateId)) {
    return { kind: "refused", code: "SELECTION_LINEAGE_DUPLICATE", detail: `lineage already holds an evaluation for ${record.candidateId}; lineage is append-only and never overwritten` };
  }
  return { kind: "retained", lineage: Object.freeze({ schema: "mw.selection-lineage.v0", records: Object.freeze([...archive.records, record]) }) };
}
