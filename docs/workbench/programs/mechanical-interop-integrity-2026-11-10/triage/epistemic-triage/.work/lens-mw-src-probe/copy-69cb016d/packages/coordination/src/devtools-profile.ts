/**
 * D8 profiling and DevTools exit evidence (APO 12 D8; carried by lrzn.6).
 *
 * Stage D8 exits on MEASURED experience evidence, never assertion: every experience axis
 * (ux, dx, lx) carries at least one finite measurement with a stated method and sample
 * count, the exit cites forge evidence ids, and every declared DevTools surface obeys the
 * APO-020 read-only law: its views come from the pinned read-only view vocabulary and it
 * declares zero actuations. A surface that could actuate, a view outside the vocabulary,
 * an unmeasured axis or blank evidence refuses outright.
 */

import { VIEW_KINDS } from "./readonly-views.js";

export type ProfileAxis = "ux" | "dx" | "lx";

export const PROFILE_AXES: readonly ProfileAxis[] = Object.freeze(["ux", "dx", "lx"]);

/** Closed-union decoder: unknown axis text never reaches an exit record. */
export function parseProfileAxis(value: string): ProfileAxis | undefined {
  return (PROFILE_AXES as readonly string[]).includes(value) ? (value as ProfileAxis) : undefined;
}

export type DevtoolsRefusalCode =
  | "DEVTOOLS_AXIS_UNKNOWN"
  | "DEVTOOLS_AXIS_UNMEASURED"
  | "DEVTOOLS_MEASUREMENT_INVALID"
  | "DEVTOOLS_FORGE_EVIDENCE_MISSING"
  | "DEVTOOLS_SURFACE_MISSING"
  | "DEVTOOLS_VIEW_UNKNOWN"
  | "DEVTOOLS_ACTUATION_FORBIDDEN";

export interface DevtoolsRefusal {
  readonly code: DevtoolsRefusalCode;
  readonly detail: string;
}

export interface AxisMeasurement {
  readonly axis: string;
  readonly metric: string;
  readonly value: number;
  readonly sampleCount: number;
  readonly method: string;
}

export interface ForgeEvidenceRef {
  readonly commandId: string;
  readonly operationId: string;
}

export interface DevtoolsSurface {
  readonly name: string;
  readonly views: readonly string[];
  readonly actuations: readonly string[];
}

export interface StageEightExitInput {
  readonly surfaces: readonly DevtoolsSurface[];
  readonly measurements: readonly AxisMeasurement[];
  readonly forgeEvidence: readonly ForgeEvidenceRef[];
}

export interface StageEightExit {
  readonly schema: "mw.stage-eight-exit.v0";
  readonly ok: boolean;
  readonly measuredByAxis: Readonly<Record<string, number>>;
  readonly refusals: readonly DevtoolsRefusal[];
}

const blank = (value: string): boolean => value.trim() === "";

/** The D8 exit record: measured axes, forge-cited, read-only surfaces; anything less refuses. */
export function recordStageEightExit(input: StageEightExitInput): StageEightExit {
  const refusals: DevtoolsRefusal[] = [];
  const measured = new Map<ProfileAxis, number>([["ux", 0], ["dx", 0], ["lx", 0]]);
  for (const measurement of input.measurements) {
    const axis = parseProfileAxis(measurement.axis);
    if (axis === undefined) {
      refusals.push({ code: "DEVTOOLS_AXIS_UNKNOWN", detail: `measurement axis ${measurement.axis} is outside ux/dx/lx` });
      continue;
    }
    if (!Number.isFinite(measurement.value) || !Number.isInteger(measurement.sampleCount) || measurement.sampleCount < 1 || blank(measurement.method) || blank(measurement.metric)) {
      refusals.push({ code: "DEVTOOLS_MEASUREMENT_INVALID", detail: `${axis} measurement ${measurement.metric} needs a finite value, a sample count of at least one and a stated method` });
      continue;
    }
    measured.set(axis, (measured.get(axis) ?? 0) + 1);
  }
  for (const axis of PROFILE_AXES) {
    if ((measured.get(axis) ?? 0) === 0) {
      refusals.push({ code: "DEVTOOLS_AXIS_UNMEASURED", detail: `axis ${axis} has no valid measurement; D8 exits on measured evidence` });
    }
  }
  if (input.surfaces.length === 0) {
    refusals.push({ code: "DEVTOOLS_SURFACE_MISSING", detail: "D8 ships at least one DevTools surface" });
  }
  for (const surface of input.surfaces) {
    for (const view of surface.views) {
      if (!(VIEW_KINDS as readonly string[]).includes(view)) {
        refusals.push({ code: "DEVTOOLS_VIEW_UNKNOWN", detail: `surface ${surface.name} offers view ${view}, outside the pinned read-only vocabulary` });
      }
    }
    if (surface.actuations.length > 0) {
      refusals.push({ code: "DEVTOOLS_ACTUATION_FORBIDDEN", detail: `surface ${surface.name} declares ${surface.actuations.length} actuation(s); APO-020 views are snapshots with no actuation path` });
    }
  }
  const validEvidence = input.forgeEvidence.filter((ref) => !blank(ref.commandId) && !blank(ref.operationId));
  if (validEvidence.length === 0) {
    refusals.push({ code: "DEVTOOLS_FORGE_EVIDENCE_MISSING", detail: "the exit cites at least one forge command and operation id" });
  }
  const measuredByAxis: Record<string, number> = {};
  for (const [axis, count] of measured) measuredByAxis[axis] = count;
  return Object.freeze({
    schema: "mw.stage-eight-exit.v0",
    ok: refusals.length === 0,
    measuredByAxis: Object.freeze(measuredByAxis),
    refusals: Object.freeze(refusals.map((r) => Object.freeze(r))),
  });
}
