/**
 * GPC staged enablement: opt-in canary with a tested rollback
 * (graph-policy-coordination stage claim; carried by hnqv.3).
 *
 * Graph-policy enablement moves one stage at a time up the shadow -> canary -> enabled
 * ladder, only behind an explicit opt-in, only after every pinned prerequisite (the
 * decision sidecar, the fixture families, the shadow adapter and the Forge integration
 * gate) is witnessed green, and only with a TESTED rollback path from the destination to an
 * earlier stage. A rollback move itself needs its tested witness and must go down the
 * ladder. Anything else refuses outright.
 */

export const CANARY_PREREQUISITES: readonly string[] = Object.freeze([
  "sidecar",
  "fixture-families",
  "shadow-adapter",
  "forge-integration-gate",
]);

export type CanaryStage = "shadow" | "canary" | "enabled";

export const CANARY_STAGES: readonly CanaryStage[] = Object.freeze(["shadow", "canary", "enabled"]);

/** Closed-union decoder: unknown stage text never reaches a step record. */
export function parseCanaryStage(value: string): CanaryStage | undefined {
  return (CANARY_STAGES as readonly string[]).includes(value) ? (value as CanaryStage) : undefined;
}

export type CanaryRefusalCode =
  | "CANARY_STAGE_UNKNOWN"
  | "CANARY_STAGE_SAME"
  | "CANARY_STAGE_SKIPPED"
  | "CANARY_OPT_IN_MISSING"
  | "CANARY_PREREQUISITE_MISSING"
  | "CANARY_PREREQUISITE_NOT_GREEN"
  | "CANARY_ROLLBACK_UNTESTED"
  | "CANARY_ROLLBACK_INVALID";

export interface CanaryRefusal {
  readonly code: CanaryRefusalCode;
  readonly detail: string;
}

export interface PrerequisiteWitness {
  readonly name: string;
  readonly green: boolean;
  readonly evidence: string;
}

export interface RollbackWitness {
  readonly fromStage: string;
  readonly toStage: string;
  readonly tested: boolean;
  readonly evidence: string;
}

export interface CanaryStepInput {
  readonly optIn: boolean;
  readonly from: string;
  readonly to: string;
  readonly prerequisites: readonly PrerequisiteWitness[];
  readonly rollback: RollbackWitness;
}

export interface CanaryStep {
  readonly schema: "mw.graph-canary-step.v0";
  readonly ok: boolean;
  readonly kind?: "advance" | "rollback";
  readonly from?: CanaryStage;
  readonly to?: CanaryStage;
  readonly refusals: readonly CanaryRefusal[];
}

const blank = (value: string): boolean => value.trim() === "";
const rank = (stage: CanaryStage): number => CANARY_STAGES.indexOf(stage);

/** Judge one enablement move; seal it frozen or refuse with every violated bar named. */
export function planCanaryStep(input: CanaryStepInput): CanaryStep {
  const refusals: CanaryRefusal[] = [];
  const from = parseCanaryStage(input.from);
  const to = parseCanaryStage(input.to);
  if (from === undefined) refusals.push({ code: "CANARY_STAGE_UNKNOWN", detail: `stage ${input.from} is outside the shadow/canary/enabled ladder` });
  if (to === undefined) refusals.push({ code: "CANARY_STAGE_UNKNOWN", detail: `stage ${input.to} is outside the shadow/canary/enabled ladder` });
  if (from !== undefined && to !== undefined && from === to) {
    refusals.push({ code: "CANARY_STAGE_SAME", detail: `a step from ${from} to ${to} moves nowhere` });
  }
  if (refusals.length > 0 || from === undefined || to === undefined) {
    return Object.freeze({ schema: "mw.graph-canary-step.v0", ok: false, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  const advancing = rank(to) > rank(from);
  if (advancing) {
    if (rank(to) - rank(from) > 1) {
      refusals.push({ code: "CANARY_STAGE_SKIPPED", detail: `${from} -> ${to} skips a stage; enablement moves one rung at a time` });
    }
    if (!input.optIn) {
      refusals.push({ code: "CANARY_OPT_IN_MISSING", detail: "an advance runs only behind the explicit opt-in" });
    }
    const byName = new Map(input.prerequisites.map((p) => [p.name, p]));
    for (const name of CANARY_PREREQUISITES) {
      const witness = byName.get(name);
      if (witness === undefined) {
        refusals.push({ code: "CANARY_PREREQUISITE_MISSING", detail: `prerequisite ${name} has no witness` });
        continue;
      }
      if (!witness.green || blank(witness.evidence)) {
        refusals.push({ code: "CANARY_PREREQUISITE_NOT_GREEN", detail: `prerequisite ${name} is not witnessed green with evidence` });
      }
    }
    const rb = input.rollback;
    const rbFrom = parseCanaryStage(rb.fromStage);
    const rbTo = parseCanaryStage(rb.toStage);
    const covers = rbFrom === to && rbTo !== undefined && rank(rbTo) < rank(to);
    if (!rb.tested || blank(rb.evidence) || !covers) {
      refusals.push({ code: "CANARY_ROLLBACK_UNTESTED", detail: `an advance to ${to} requires a TESTED rollback from ${to} to an earlier stage with evidence` });
    }
  } else {
    const rb = input.rollback;
    if (!rb.tested || blank(rb.evidence)) {
      refusals.push({ code: "CANARY_ROLLBACK_UNTESTED", detail: "a rollback move carries its tested witness and evidence" });
    }
    if (parseCanaryStage(rb.fromStage) !== from || parseCanaryStage(rb.toStage) !== to) {
      refusals.push({ code: "CANARY_ROLLBACK_INVALID", detail: `the rollback witness must cover ${from} -> ${to}` });
    }
  }
  if (refusals.length > 0) {
    return Object.freeze({ schema: "mw.graph-canary-step.v0", ok: false, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  return Object.freeze({ schema: "mw.graph-canary-step.v0", ok: true, kind: advancing ? "advance" : "rollback", from, to, refusals: Object.freeze([]) });
}
