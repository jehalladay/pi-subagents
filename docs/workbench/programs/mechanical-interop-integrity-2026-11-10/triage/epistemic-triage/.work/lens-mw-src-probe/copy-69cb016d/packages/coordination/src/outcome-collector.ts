/**
 * The finalized outcome collector (APO 08; carried by b677.4).
 *
 * Training examples are produced only AFTER eligibility assessment, only inside a declared
 * trusted collector process boundary (4v6o.11's zone law runs first), with a baseline that is
 * independent of the sampled action, and with the two reward classes kept separate:
 * post-rejection coordination reward books only a reconcile-rejected decision, and executed
 * native reward books only an admitted decision whose native receipt is acknowledged. A
 * fixture-only outcome is never booked as native (do not mislabel synthetic outcome as a live
 * PASS). The hard refusal of unknown logProb/support is APO-EAT-R006 (165k); per-actor credit
 * stays behind attachPerActorCredit's intervention gate. Pure; nothing here runs collector
 * code or performs a native read.
 */

import { collectorBoundary } from "./trust-zones.js";
import type { CollectorRun, CollectorBoundaryCode } from "./trust-zones.js";

export const REWARD_CLASSES: readonly string[] = Object.freeze(["coordination-post-rejection", "native-executed"]);

export type CollectorRefusalCode =
  | CollectorBoundaryCode
  | "COLLECTOR_ELIGIBILITY_UNASSESSED"
  | "COLLECTOR_ELIGIBILITY_EXPIRED"
  | "COLLECTOR_ELIGIBILITY_INVALID"
  | "COLLECTOR_BASELINE_ACTION_DEPENDENT"
  | "COLLECTOR_REWARD_CLASS_UNKNOWN"
  | "COLLECTOR_REWARD_CLASS_MIXED"
  | "COLLECTOR_FIXTURE_AS_NATIVE"
  | "COLLECTOR_VALUE_NONFINITE";

export interface CollectedDecision {
  readonly decisionId: string;
  readonly decidedTick: number;
  readonly eligibilityWindowTicks: number;
  /** Explicit eligibility: an unassessed decision is never collected. */
  readonly eligibilityAssessed: boolean;
}

export interface ObservedOutcome {
  readonly observedTick: number;
  readonly admitted: boolean;
  readonly nativeStatus?: "acknowledged" | "pending" | "failed";
  /** True when the outcome derives from fixture-only state, never from a native verdict. */
  readonly fixtureOnly: boolean;
}

export interface RewardDeclaration {
  readonly rewardClass: string;
  readonly value: number;
}

export interface IndependentBaseline {
  readonly value: number;
  /** A baseline that depends on the sampled action biases the gradient; it is refused, not corrected. */
  readonly dependsOnSampledAction: boolean;
}

export interface TrainingOutcomeExample {
  readonly schema: "mw.training-outcome.v0";
  readonly decisionId: string;
  readonly rewardClass: string;
  readonly value: number;
  readonly advantage: number;
  readonly mode: "fixture" | "native";
  readonly eligibility: { readonly windowTicks: number; readonly latencyTicks: number };
}

export type CollectionOutcome =
  | { readonly kind: "example"; readonly example: TrainingOutcomeExample }
  | { readonly kind: "refused"; readonly code: CollectorRefusalCode; readonly detail: string };

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);

export function collectTrainingOutcome(run: CollectorRun, decision: CollectedDecision, outcome: ObservedOutcome, reward: RewardDeclaration, baseline: IndependentBaseline): CollectionOutcome {
  const boundary = collectorBoundary(run);
  if (!boundary.ok) {
    return { kind: "refused", code: boundary.code, detail: boundary.detail };
  }
  if (!decision.eligibilityAssessed) {
    return { kind: "refused", code: "COLLECTOR_ELIGIBILITY_UNASSESSED", detail: `${decision.decisionId} was never assessed for eligibility; collection runs after eligibility assessment, not instead of it` };
  }
  if (!finite(decision.decidedTick) || !finite(decision.eligibilityWindowTicks) || !finite(outcome.observedTick) || decision.eligibilityWindowTicks < 0) {
    return { kind: "refused", code: "COLLECTOR_ELIGIBILITY_INVALID", detail: `${decision.decisionId} carries a nonfinite or negative eligibility tick` };
  }
  const latency = outcome.observedTick - decision.decidedTick;
  if (latency < 0) {
    return { kind: "refused", code: "COLLECTOR_ELIGIBILITY_INVALID", detail: `${decision.decisionId} observed at tick ${outcome.observedTick} before it was decided at ${decision.decidedTick}` };
  }
  if (latency > decision.eligibilityWindowTicks) {
    return { kind: "refused", code: "COLLECTOR_ELIGIBILITY_EXPIRED", detail: `${decision.decisionId} observed ${latency} tick(s) after decision; the eligibility window is ${decision.eligibilityWindowTicks}` };
  }
  if (!finite(reward.value) || !finite(baseline.value)) {
    return { kind: "refused", code: "COLLECTOR_VALUE_NONFINITE", detail: `${decision.decisionId} carries a nonfinite reward or baseline value` };
  }
  if (baseline.dependsOnSampledAction) {
    return { kind: "refused", code: "COLLECTOR_BASELINE_ACTION_DEPENDENT", detail: "the baseline must not depend on the sampled action; an action-dependent baseline biases the gradient and is refused, not corrected" };
  }
  if (!REWARD_CLASSES.includes(reward.rewardClass)) {
    return { kind: "refused", code: "COLLECTOR_REWARD_CLASS_UNKNOWN", detail: `${reward.rewardClass} is outside coordination-post-rejection/native-executed` };
  }
  if (reward.rewardClass === "native-executed") {
    if (outcome.fixtureOnly) {
      return { kind: "refused", code: "COLLECTOR_FIXTURE_AS_NATIVE", detail: "a fixture-only outcome is never booked as executed native reward; synthetic outcome is not a live PASS" };
    }
    if (!outcome.admitted || outcome.nativeStatus !== "acknowledged") {
      return { kind: "refused", code: "COLLECTOR_REWARD_CLASS_MIXED", detail: `native-executed reward requires an admitted decision with an acknowledged native receipt (admitted=${outcome.admitted}, status=${String(outcome.nativeStatus)})` };
    }
  }
  if (reward.rewardClass === "coordination-post-rejection") {
    if (outcome.admitted) {
      return { kind: "refused", code: "COLLECTOR_REWARD_CLASS_MIXED", detail: "post-rejection coordination reward books only a rejected decision; an admitted or executed outcome belongs to the native class" };
    }
  }
  return {
    kind: "example",
    example: {
      schema: "mw.training-outcome.v0",
      decisionId: decision.decisionId,
      rewardClass: reward.rewardClass,
      value: reward.value,
      advantage: reward.value - baseline.value,
      mode: outcome.fixtureOnly ? "fixture" : "native",
      eligibility: { windowTicks: decision.eligibilityWindowTicks, latencyTicks: latency },
    },
  };
}
