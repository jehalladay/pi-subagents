/**
 * APO-019 canonical baseline comparison on heldout seeds (10-training-experiments.md
 * Baselines; carried by de56.1).
 *
 * The comparator list is pinned by the program doc: every experiment report carries all
 * eight canonical baselines, once each, on ONE matched external event stream, with the
 * training/search and promotion costs stated per arm. An arm that trained on seeds may not
 * evaluate on them. A report missing a baseline, naming an unknown one, mixing streams,
 * overlapping trained seeds, or carrying a nonfinite metric or cost refuses outright.
 */

export const CANONICAL_BASELINES: readonly string[] = Object.freeze([
  "fixed-fifo",
  "restack-first",
  "installed-elastic-lane-heuristic",
  "exact-small-oracle",
  "greedy-compatible-subset-selector",
  "parameter-tuned-deterministic-rule",
  "learned-residual",
  "structurally-specialized-parent-child",
]);

export type ExperimentRefusalCode =
  | "EXPERIMENT_BASELINE_MISSING"
  | "EXPERIMENT_BASELINE_UNKNOWN"
  | "EXPERIMENT_BASELINE_DUPLICATE"
  | "EXPERIMENT_STREAM_MISMATCHED"
  | "EXPERIMENT_SEED_OVERLAP"
  | "EXPERIMENT_METRIC_NONFINITE"
  | "EXPERIMENT_COST_INVALID";

export interface ExperimentRefusal {
  readonly code: ExperimentRefusalCode;
  readonly detail: string;
}

export interface ArmCosts {
  readonly trainingSearch: number;
  readonly promotion: number;
}

export interface ExperimentArm {
  readonly baseline: string;
  readonly eventStreamId: string;
  readonly trainSeeds: readonly string[];
  readonly evaluationSeeds: readonly string[];
  readonly primaryMetric: number;
  readonly costs: ArmCosts;
}

export interface RankedArm {
  readonly baseline: string;
  readonly primaryMetric: number;
  readonly costs: ArmCosts;
}

export interface ExperimentReport {
  readonly schema: "mw.baseline-experiment.v0";
  readonly ok: boolean;
  readonly streamId?: string;
  readonly ranking: readonly RankedArm[];
  readonly refusals: readonly ExperimentRefusal[];
}

const isFiniteNumber = (value: number): boolean => Number.isFinite(value);

/** Run the APO-019 comparison discipline over supplied arms and seal the report. */
export function runBaselineComparison(arms: readonly ExperimentArm[]): ExperimentReport {
  const refusals: ExperimentRefusal[] = [];
  const seen = new Set<string>();
  for (const arm of arms) {
    if (!CANONICAL_BASELINES.includes(arm.baseline)) {
      refusals.push({ code: "EXPERIMENT_BASELINE_UNKNOWN", detail: `${arm.baseline} is not in the pinned canonical list` });
      continue;
    }
    if (seen.has(arm.baseline)) refusals.push({ code: "EXPERIMENT_BASELINE_DUPLICATE", detail: `${arm.baseline} appears twice` });
    seen.add(arm.baseline);
  }
  for (const name of CANONICAL_BASELINES) {
    if (!seen.has(name)) refusals.push({ code: "EXPERIMENT_BASELINE_MISSING", detail: `canonical baseline ${name} has no arm` });
  }
  const streams = new Set(arms.map((arm) => arm.eventStreamId));
  if (streams.size > 1) {
    refusals.push({ code: "EXPERIMENT_STREAM_MISMATCHED", detail: `arms span ${streams.size} event streams; the comparison is matched on one` });
  }
  for (const arm of arms) {
    const train = new Set(arm.trainSeeds);
    const overlap = arm.evaluationSeeds.filter((seed) => train.has(seed));
    if (arm.trainSeeds.length > 0 && overlap.length > 0) {
      refusals.push({ code: "EXPERIMENT_SEED_OVERLAP", detail: `${arm.baseline} evaluates on ${overlap.length} seed(s) it trained on; heldout means disjoint` });
    }
    if (!isFiniteNumber(arm.primaryMetric)) refusals.push({ code: "EXPERIMENT_METRIC_NONFINITE", detail: `${arm.baseline} primary metric is not finite` });
    if (!isFiniteNumber(arm.costs.trainingSearch) || arm.costs.trainingSearch < 0 || !isFiniteNumber(arm.costs.promotion) || arm.costs.promotion < 0) {
      refusals.push({ code: "EXPERIMENT_COST_INVALID", detail: `${arm.baseline} training/search or promotion cost is missing or negative` });
    }
  }
  if (refusals.length > 0) {
    return Object.freeze({ schema: "mw.baseline-experiment.v0", ok: false, ranking: Object.freeze([]), refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  const ranking = [...arms]
    .sort((a, b) => (b.primaryMetric - a.primaryMetric) || a.baseline.localeCompare(b.baseline))
    .map((arm) => Object.freeze({ baseline: arm.baseline, primaryMetric: arm.primaryMetric, costs: Object.freeze({ trainingSearch: arm.costs.trainingSearch, promotion: arm.costs.promotion }) }));
  const streamId = arms.length > 0 ? arms[0]!.eventStreamId : undefined;
  return Object.freeze({
    schema: "mw.baseline-experiment.v0",
    ok: true,
    ...(streamId === undefined ? {} : { streamId }),
    ranking: Object.freeze(ranking),
    refusals: Object.freeze([]),
  });
}
