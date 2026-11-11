/**
 * The worked elastic-lane numeric candidate (APO 14; carried by b677.2).
 *
 * An app-local projection turns the elastic-lane observation into the four declared features —
 * ready count, stale count, available capacity, recent retry pressure — each carrying explicit
 * evidence status and an explicit normalization cap; an unobserved feature or an inferred cap
 * refuses. The MicroPolicy categorical policy chooses among hold, request-lane and
 * prioritize-restack using PRE-DECLARED eligible support computed from the projection, and the
 * adapter mapping turns the symbolic choice into the existing lane/work intent surface with
 * the exact expectedRevision and an explicit budget claim. A choice to request a lane is a
 * PROPOSAL: it is not a lane allocation until the native receipt. Pure; nothing here samples,
 * allocates or executes.
 */

import type { LandingObservation } from "./landing-queue.js";
import type { MicroPolicyActionSpec } from "./micropolicy-adapter.js";

export const NUMERIC_FEATURES: readonly string[] = Object.freeze(["readyCount", "staleCount", "availableCapacity", "recentRetryPressure"]);
export type ElasticAction = "hold" | "request-lane" | "prioritize-restack";
export const ELASTIC_ACTIONS: readonly ElasticAction[] = Object.freeze(["hold", "request-lane", "prioritize-restack"] as const);

export type NumericCandidateRefusalCode =
  | "CANDIDATE_FEATURE_MISSING"
  | "CANDIDATE_EVIDENCE_NOT_OBSERVED"
  | "CANDIDATE_CAP_INVALID"
  | "CANDIDATE_VALUE_NONFINITE"
  | "CANDIDATE_VALUE_NEGATIVE"
  | "CANDIDATE_ACTION_UNKNOWN"
  | "CANDIDATE_ACTION_INELIGIBLE"
  | "CANDIDATE_SUPPORT_INCONSISTENT"
  | "CANDIDATE_RESTACK_TARGET_MISSING"
  | "CANDIDATE_PROJECTION_MALFORMED";

export interface FeatureEvidence {
  readonly status: "observed" | "stale" | "absent";
  readonly raw: number;
  /** Explicit normalization cap; the projection never infers one. */
  readonly cap: number;
}

export type FeatureEvidenceMap = Readonly<Record<string, FeatureEvidence>>;

export interface NumericProjection {
  readonly schema: "mw.elastic-numeric-projection.v0";
  readonly features: readonly string[];
  /** Normalized to [0,1] by the declared caps, in NUMERIC_FEATURES order. */
  readonly values: readonly number[];
  readonly eligibleSupport: readonly ElasticAction[];
}

export type ProjectionOutcome =
  | { readonly kind: "projected"; readonly projection: NumericProjection }
  | { readonly kind: "refused"; readonly code: NumericCandidateRefusalCode; readonly detail: string };

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);

/** Project declared feature evidence into the normalized vector and the PRE-DECLARED eligible support. */
export function projectNumericObservation(evidence: FeatureEvidenceMap): ProjectionOutcome {
  const values: number[] = [];
  for (const feature of NUMERIC_FEATURES) {
    const row = evidence[feature];
    if (row === undefined) return { kind: "refused", code: "CANDIDATE_FEATURE_MISSING", detail: `feature ${feature} is missing from the projection evidence` };
    if (row.status !== "observed") return { kind: "refused", code: "CANDIDATE_EVIDENCE_NOT_OBSERVED", detail: `feature ${feature} carries status ${row.status}; the projection consumes observed evidence only` };
    if (!finite(row.raw)) return { kind: "refused", code: "CANDIDATE_VALUE_NONFINITE", detail: `feature ${feature} raw value is not a finite number` };
    if (row.raw < 0) return { kind: "refused", code: "CANDIDATE_VALUE_NEGATIVE", detail: `feature ${feature} raw value ${String(row.raw)} is negative; the projection consumes nonnegative evidence only` };
    if (!finite(row.cap) || row.cap <= 0) return { kind: "refused", code: "CANDIDATE_CAP_INVALID", detail: `feature ${feature} declares cap ${String(row.cap)}; the normalization cap is explicit and positive, never inferred` };
    values.push(Math.min(1, row.raw / row.cap));
  }
  const staleCount = evidence["staleCount"]!.raw;
  const availableCapacity = evidence["availableCapacity"]!.raw;
  const eligibleSupport = ELASTIC_ACTIONS.filter((action) => {
    if (action === "hold") return true;
    if (action === "request-lane") return availableCapacity > 0;
    return staleCount > 0;
  });
  return {
    kind: "projected",
    projection: Object.freeze({ schema: "mw.elastic-numeric-projection.v0", features: NUMERIC_FEATURES, values: Object.freeze(values), eligibleSupport: Object.freeze(eligibleSupport) }),
  };
}

/**
 * Re-derive the eligible support from the projection's normalized values (normalization preserves positivity).
 * The caller has already refused a values array whose length differs from NUMERIC_FEATURES.length, so both
 * indexed reads below name a real observation; no fallback mints one.
 */
function deriveSupport(projection: NumericProjection): readonly ElasticAction[] {
  const stale = projection.values[NUMERIC_FEATURES.indexOf("staleCount")]!;
  const capacity = projection.values[NUMERIC_FEATURES.indexOf("availableCapacity")]!;
  return ELASTIC_ACTIONS.filter((action) => action === "hold" || (action === "request-lane" ? capacity > 0 : stale > 0));
}

export type ParsedElasticAction =
  | { readonly kind: "action"; readonly action: ElasticAction }
  | { readonly kind: "refused"; readonly code: NumericCandidateRefusalCode; readonly detail: string };

/** Decode the MicroPolicy receipt's selected action string into the closed vocabulary; anything else refuses. */
export function parseElasticAction(selected: string): ParsedElasticAction {
  const found = ELASTIC_ACTIONS.find((candidate) => candidate === selected);
  if (found === undefined) return { kind: "refused", code: "CANDIDATE_ACTION_UNKNOWN", detail: `${selected} is outside hold/request-lane/prioritize-restack` };
  return { kind: "action", action: found };
}

export type ActionSpecOutcome =
  | { readonly kind: "spec"; readonly spec: MicroPolicyActionSpec; readonly note: "proposal-not-allocation" }
  | { readonly kind: "refused"; readonly code: NumericCandidateRefusalCode; readonly detail: string };

/**
 * Map a decoded symbolic choice (closed vocabulary, never a caller-chosen operation string)
 * onto the existing lane/work intent surface with the exact expectedRevision carried by the
 * observation's basis and an explicit claim. The eligible support is enforced here too:
 * it is re-derived from the projection's own values (a handed support that differs refuses
 * CANDIDATE_SUPPORT_INCONSISTENT) and a choice outside the derived support refuses. A handed projection whose
 * values.length differs from NUMERIC_FEATURES.length refuses CANDIDATE_PROJECTION_MALFORMED first, before any
 * derivation. A restack
 * choice with no ready candidate to name refuses CANDIDATE_RESTACK_TARGET_MISSING.
 */
export function numericCandidateActionSpec(observation: LandingObservation, projection: NumericProjection, choice: ElasticAction): ActionSpecOutcome {
  if (projection.values.length !== NUMERIC_FEATURES.length) {
    return { kind: "refused", code: "CANDIDATE_PROJECTION_MALFORMED", detail: `handed projection carries values.length ${String(projection.values.length)} but NUMERIC_FEATURES.length ${String(NUMERIC_FEATURES.length)}; one normalized value per declared feature is required` };
  }
  const derived = deriveSupport(projection);
  const handed = ELASTIC_ACTIONS.filter((action) => projection.eligibleSupport.includes(action));
  if (handed.length !== projection.eligibleSupport.length || handed.length !== derived.length || handed.some((action, i) => action !== derived[i])) {
    return { kind: "refused", code: "CANDIDATE_SUPPORT_INCONSISTENT", detail: `handed eligible support {${projection.eligibleSupport.join(", ")}} differs from the support {${derived.join(", ")}} derived from the projection values` };
  }
  if (!derived.includes(choice)) {
    return { kind: "refused", code: "CANDIDATE_ACTION_INELIGIBLE", detail: `${choice} is outside the pre-declared eligible support {${derived.join(", ")}}` };
  }
  if (choice === "hold") {
    return { kind: "spec", note: "proposal-not-allocation", spec: { target: { kind: "lane", uri: "lane:hold" }, effect: "lane.pause", claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: [`projection:${projection.values.join(",")}`], writeScopes: [], readScopes: ["lane:board"] } };
  }
  if (choice === "request-lane") {
    return { kind: "spec", note: "proposal-not-allocation", spec: { target: { kind: "lane", uri: "lane:new" }, effect: "lane.allocate", claim: { compute: 1, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [`projection:${projection.values.join(",")}`], writeScopes: ["lane:new"], readScopes: [] } };
  }
  const candidate = observation.ready[0]?.id;
  if (candidate === undefined) {
    return { kind: "refused", code: "CANDIDATE_RESTACK_TARGET_MISSING", detail: "prioritize-restack names the first ready candidate and the observation has none ready" };
  }
  return { kind: "spec", note: "proposal-not-allocation", spec: { target: { kind: "lane", uri: `lane:restack:cand:${candidate}` }, effect: "restack", claim: { compute: 1, workers: 1, queue: 0, latencyMs: 1 }, evidenceRefs: [`projection:${projection.values.join(",")}`], writeScopes: [`cand:${candidate}`], readScopes: ["lane:board"] } };
}
