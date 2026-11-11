/**
 * Score-function (likelihood-ratio) gradient estimator validated against the exact two-claim
 * oracle (APO 10, Policy-gradient correctness; carried by de56.2).
 *
 * Two independent policies each claim one exclusive lane with probabilities p1 and p2. The
 * current resolver rejects both parties of a conflict, so the expected admitted count is
 * J = p1 + p2 - 2·p1·p2 with dJ/dp1 = 1 - 2·p2 and dJ/dp2 = 1 - 2·p1. The estimator samples
 * both claims from DISTINCT seeded streams — independence is caller-constructed, so a shared
 * stream is refused — weights the admitted reward by the score ∂/∂p log P(a), averages, and
 * reports the standard error. The exact table and the estimate must agree within the stated
 * number of standard errors; a disagreement is reported, never smoothed. Pure and seeded:
 * nothing here reads a clock or a global random source.
 */

export type EstimatorRefusalCode =
  | "ESTIMATOR_PROBABILITY_INVALID"
  | "ESTIMATOR_SAMPLES_INSUFFICIENT"
  | "ESTIMATOR_STREAMS_SHARED"
  | "ESTIMATOR_TOLERANCE_INVALID";

export interface ExactTwoClaimTable {
  readonly schema: "mw.two-claim-exact.v0";
  readonly p1: number;
  readonly p2: number;
  readonly objective: number;
  readonly dJdp1: number;
  readonly dJdp2: number;
}

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);
const openUnit = (p: number): boolean => finite(p) && p > 0 && p < 1;

/** The exact reference table: J = p1 + p2 - 2 p1 p2 under reject-both conflict. */
export function exactTwoClaimTable(p1: number, p2: number): ExactTwoClaimTable | { readonly kind: "refused"; readonly code: EstimatorRefusalCode; readonly detail: string } {
  if (!openUnit(p1) || !openUnit(p2)) {
    return { kind: "refused", code: "ESTIMATOR_PROBABILITY_INVALID", detail: "claim probabilities must lie strictly inside (0, 1); the score is undefined at the boundary" };
  }
  return { schema: "mw.two-claim-exact.v0", p1, p2, objective: p1 + p2 - 2 * p1 * p2, dJdp1: 1 - 2 * p2, dJdp2: 1 - 2 * p1 };
}

/** A deterministic 32-bit LCG stream; advancing returns the next stream, never mutating the old one. */
export interface SeededStream {
  readonly state: number;
}

export function seededStream(seed: number): SeededStream {
  return { state: (Math.trunc(seed) >>> 0) || 1 };
}

export function nextUniform(stream: SeededStream): { readonly value: number; readonly next: SeededStream } {
  const state = (Math.imul(1664525, stream.state) + 1013904223) >>> 0;
  return { value: (state + 0.5) / 4294967296, next: { state } };
}

export interface EstimatorInput {
  readonly p1: number;
  readonly p2: number;
  readonly samples: number;
  readonly streams: { readonly policy1: SeededStream; readonly policy2: SeededStream };
  /** Agreement bar in standard errors; the report says whether |estimate - exact| stays within it. */
  readonly toleranceStandardErrors: number;
}

export interface GradientEstimate {
  readonly schema: "mw.score-function-estimate.v0";
  readonly samples: number;
  readonly exact: ExactTwoClaimTable;
  readonly estimate: { readonly objective: number; readonly dJdp1: number; readonly dJdp2: number };
  readonly standardError: { readonly dJdp1: number; readonly dJdp2: number };
  readonly deviationInStandardErrors: { readonly dJdp1: number; readonly dJdp2: number };
  readonly agreesWithExact: boolean;
}

export type EstimatorOutcome =
  | { readonly kind: "estimate"; readonly estimate: GradientEstimate }
  | { readonly kind: "refused"; readonly code: EstimatorRefusalCode; readonly detail: string };

export function estimateScoreFunctionGradient(input: EstimatorInput): EstimatorOutcome {
  const exact = exactTwoClaimTable(input.p1, input.p2);
  if ("kind" in exact) return exact;
  if (!Number.isInteger(input.samples) || input.samples < 2) {
    return { kind: "refused", code: "ESTIMATOR_SAMPLES_INSUFFICIENT", detail: `samples must be an integer >= 2 to estimate a standard error; got ${String(input.samples)}` };
  }
  if (input.streams.policy1.state === input.streams.policy2.state) {
    return { kind: "refused", code: "ESTIMATOR_STREAMS_SHARED", detail: "the two policies share one RNG stream; independence is caller-constructed and a shared stream correlates the claims" };
  }
  if (!finite(input.toleranceStandardErrors) || input.toleranceStandardErrors <= 0) {
    return { kind: "refused", code: "ESTIMATOR_TOLERANCE_INVALID", detail: "the agreement tolerance is a positive number of standard errors" };
  }
  let s1 = input.streams.policy1;
  let s2 = input.streams.policy2;
  let sumReward = 0;
  let sumG1 = 0;
  let sumG2 = 0;
  let sumG1Sq = 0;
  let sumG2Sq = 0;
  for (let i = 0; i < input.samples; i++) {
    const u1 = nextUniform(s1);
    const u2 = nextUniform(s2);
    s1 = u1.next;
    s2 = u2.next;
    const a1 = u1.value < input.p1 ? 1 : 0;
    const a2 = u2.value < input.p2 ? 1 : 0;
    const reward = a1 + a2 === 1 ? 1 : 0;
    const score1 = a1 === 1 ? 1 / input.p1 : -1 / (1 - input.p1);
    const score2 = a2 === 1 ? 1 / input.p2 : -1 / (1 - input.p2);
    const g1 = reward * score1;
    const g2 = reward * score2;
    sumReward += reward;
    sumG1 += g1;
    sumG2 += g2;
    sumG1Sq += g1 * g1;
    sumG2Sq += g2 * g2;
  }
  const n = input.samples;
  const mean1 = sumG1 / n;
  const mean2 = sumG2 / n;
  const se = (sum: number, sumSq: number, mean: number): number => Math.sqrt(Math.max(0, sumSq / n - mean * mean) / (n - 1));
  const se1 = se(sumG1, sumG1Sq, mean1);
  const se2 = se(sumG2, sumG2Sq, mean2);
  const dev1 = se1 === 0 ? (mean1 === exact.dJdp1 ? 0 : Number.POSITIVE_INFINITY) : Math.abs(mean1 - exact.dJdp1) / se1;
  const dev2 = se2 === 0 ? (mean2 === exact.dJdp2 ? 0 : Number.POSITIVE_INFINITY) : Math.abs(mean2 - exact.dJdp2) / se2;
  return {
    kind: "estimate",
    estimate: {
      schema: "mw.score-function-estimate.v0",
      samples: n,
      exact,
      estimate: { objective: sumReward / n, dJdp1: mean1, dJdp2: mean2 },
      standardError: { dJdp1: se1, dJdp2: se2 },
      deviationInStandardErrors: { dJdp1: dev1, dJdp2: dev2 },
      agreesWithExact: dev1 <= input.toleranceStandardErrors && dev2 <= input.toleranceStandardErrors,
    },
  };
}
