/**
 * Consumer-relative lane views (APO-012; 06 "Distinct consumers", D4 free/reserved/busy counterexample): one pinned
 * lane observation, three projections, no universal minimal interface. Admission reads an exact three-state answer at
 * an exact revision — free is available, reserved and busy are not, and an unknown occupancy stays unknown rather than
 * collapsing into either. Planning reads the phase and the release time: a native deadline is exact; a learned
 * forecast is advisory, carries its source and certifies no native outcome. Recovery reads the commitment and receipt
 * identity, and an occupied lane without one is unknown, not fabricated. Every view carries the same lane id and the
 * same exact revision; a blank revision makes no view exact, so it refuses. Pure projections: nothing here observes a
 * lane, admits an intent or forecasts anything.
 */
import { UNKNOWN } from "./episode.js";
import type { Maybe } from "./episode.js";

export type Occupancy = "free" | "reserved" | "busy";

export interface LaneCommitment {
  readonly decisionId: string;
  readonly receiptRef: string;
}

export interface ReleaseMass {
  readonly atOrBefore: string;
  readonly mass: number;
}

export type ReleaseForecast =
  | { readonly kind: "native"; readonly deadline: string }
  | { readonly kind: "learned"; readonly source: string; readonly distribution: readonly ReleaseMass[]; readonly certifies?: false };

export interface LaneObservation {
  readonly laneId: string;
  /** The exact source revision the observation was read at. */
  readonly revision: string;
  readonly occupancy: Maybe<Occupancy>;
  readonly holder?: string;
  readonly commitment?: LaneCommitment;
  readonly release?: ReleaseForecast;
}

export type LaneConsumer = "admission" | "planning" | "recovery";

export interface AdmissionView {
  readonly schema: "mw.lane-view.admission.v0";
  readonly kind: "admission";
  readonly laneId: string;
  readonly revision: string;
  readonly available: Maybe<boolean>;
}

export type ReleaseView =
  | { readonly kind: "native"; readonly deadline: string }
  | { readonly kind: "advisory"; readonly source: string; readonly distribution: readonly ReleaseMass[]; readonly certifies: false };

export interface PlanningView {
  readonly schema: "mw.lane-view.planning.v0";
  readonly kind: "planning";
  readonly laneId: string;
  readonly revision: string;
  readonly phase: Maybe<Occupancy>;
  readonly release: Maybe<ReleaseView>;
}

export interface RecoveryView {
  readonly schema: "mw.lane-view.recovery.v0";
  readonly kind: "recovery";
  readonly laneId: string;
  readonly revision: string;
  readonly commitment: Maybe<LaneCommitment>;
}

export type LaneView = AdmissionView | PlanningView | RecoveryView;

export type LaneViewRefusalCode = "LANE_VIEW_REVISION_MISSING" | "LANE_VIEW_CONSUMER_UNKNOWN" | "LANE_VIEW_FORECAST_CERTIFIES" | "LANE_VIEW_DISTRIBUTION_INVALID";

export type LaneViewResult =
  | { readonly kind: "view"; readonly view: LaneView }
  | { readonly kind: "refused"; readonly code: LaneViewRefusalCode; readonly detail: string };

/** The fields each consumer sees; the shared lane id and revision plus the consumer's own. */
export const LANE_VIEW_FIELDS: Readonly<Record<LaneConsumer, readonly string[]>> = Object.freeze({
  admission: Object.freeze(["schema", "kind", "laneId", "revision", "available"] as const),
  planning: Object.freeze(["schema", "kind", "laneId", "revision", "phase", "release"] as const),
  recovery: Object.freeze(["schema", "kind", "laneId", "revision", "commitment"] as const),
});

const releaseView = (forecast: ReleaseForecast | undefined): { readonly ok: true; readonly release: Maybe<ReleaseView> } | { readonly ok: false; readonly code: LaneViewRefusalCode; readonly detail: string } => {
  if (forecast === undefined) return { ok: true, release: UNKNOWN };
  if (forecast.kind === "native") return { ok: true, release: { kind: "native", deadline: forecast.deadline } };
  if ((forecast.certifies as unknown) === true) {
    return { ok: false, code: "LANE_VIEW_FORECAST_CERTIFIES", detail: `learned forecast from ${forecast.source} claims to certify a native outcome; a forecast is advisory only` };
  }
  let total = 0;
  for (const point of forecast.distribution) {
    if (!Number.isFinite(point.mass) || point.mass < 0) return { ok: false, code: "LANE_VIEW_DISTRIBUTION_INVALID", detail: `release mass at ${point.atOrBefore} is ${String(point.mass)}; masses are finite and non-negative` };
    total += point.mass;
  }
  if (total > 1 + 1e-9) return { ok: false, code: "LANE_VIEW_DISTRIBUTION_INVALID", detail: `release distribution from ${forecast.source} carries total mass ${total}; at most one` };
  return { ok: true, release: { kind: "advisory", source: forecast.source, distribution: forecast.distribution, certifies: false } };
};

export function projectLaneView(observation: LaneObservation, consumer: LaneConsumer): LaneViewResult {
  if (observation.revision.trim().length === 0) {
    return { kind: "refused", code: "LANE_VIEW_REVISION_MISSING", detail: `lane ${observation.laneId} was read without an exact revision; no consumer view is exact` };
  }
  const base = { laneId: observation.laneId, revision: observation.revision };
  switch (consumer) {
    case "admission": {
      const available: Maybe<boolean> = observation.occupancy === UNKNOWN ? UNKNOWN : observation.occupancy === "free";
      return { kind: "view", view: { schema: "mw.lane-view.admission.v0", kind: "admission", ...base, available } };
    }
    case "planning": {
      const release = releaseView(observation.release);
      if (!release.ok) return { kind: "refused", code: release.code, detail: release.detail };
      return { kind: "view", view: { schema: "mw.lane-view.planning.v0", kind: "planning", ...base, phase: observation.occupancy, release: release.release } };
    }
    case "recovery": {
      const commitment: Maybe<LaneCommitment> = observation.commitment === undefined ? UNKNOWN : { decisionId: observation.commitment.decisionId, receiptRef: observation.commitment.receiptRef };
      return { kind: "view", view: { schema: "mw.lane-view.recovery.v0", kind: "recovery", ...base, commitment } };
    }
    default:
      return { kind: "refused", code: "LANE_VIEW_CONSUMER_UNKNOWN", detail: `${String(consumer)} is not a lane consumer; admission, planning and recovery are` };
  }
}
