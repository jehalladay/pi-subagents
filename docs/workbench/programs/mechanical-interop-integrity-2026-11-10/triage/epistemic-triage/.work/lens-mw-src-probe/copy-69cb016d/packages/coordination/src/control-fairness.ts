/**
 * Control and fairness discipline for resource policies (APO 09, Control + Fairness).
 *
 * A controller integral advances only from OBSERVED request/admission/refusal triples — an
 * assumed-applied request is refused, so integral windup cannot accumulate on actuations that
 * never happened. Updates respect a hysteresis band, a dwell time and a bounded step, and an
 * observation from the controller's own actuation tick is refused: there is no instantaneous
 * feedback cycle. Linked queue systems are judged as one plant: stability witnesses for the
 * separate modules do not cover a link, and an uncovered link or a growing amplitude refuses
 * the plant. Selection utilities that are learned require a separately declared fairness floor
 * (aging, deficit or hard-min-service); selection itself is a deterministic pure function of
 * the queue and the scenario, measurable under overload and underload.
 */

export type ControlRefusalCode =
  | "CONTROL_OBSERVATION_ASSUMED"
  | "CONTROL_OBSERVATION_INCONSISTENT"
  | "CONTROL_TICK_NOT_ADVANCED"
  | "CONTROL_SAME_TICK_FEEDBACK"
  | "CONTROL_VALUE_NONFINITE"
  | "CONTROL_CONFIG_INVALID";

export interface AdmissionObservation {
  readonly tick: number;
  readonly requested: number;
  readonly admitted: number;
  readonly refused: number;
  /** Only "observed" advances the integral; "assumed" is the windup path and is refused. */
  readonly basis: "observed" | "assumed";
}

export interface ControllerState {
  readonly integral: number;
  readonly output: number;
  readonly lastUpdateTick: number;
}

export interface ControllerConfig {
  readonly target: number;
  readonly gain: number;
  readonly hysteresisBand: number;
  readonly dwellTicks: number;
  readonly maxStep: number;
  readonly outputMin: number;
  readonly outputMax: number;
}

export type ControlUpdate =
  | { readonly kind: "updated"; readonly state: ControllerState; readonly error: number }
  | { readonly kind: "held"; readonly state: ControllerState; readonly reason: "hysteresis" | "dwell" }
  | { readonly kind: "refused"; readonly code: ControlRefusalCode; readonly detail: string };

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);

export function applyControlUpdate(state: ControllerState, observation: AdmissionObservation, config: ControllerConfig): ControlUpdate {
  for (const [name, value] of Object.entries({ ...config })) {
    if (!finite(value)) return { kind: "refused", code: "CONTROL_CONFIG_INVALID", detail: `config.${name} is not a finite number` };
  }
  if (config.hysteresisBand < 0 || config.dwellTicks < 0 || config.maxStep <= 0 || config.outputMin > config.outputMax) {
    return { kind: "refused", code: "CONTROL_CONFIG_INVALID", detail: "band and dwell must be nonnegative, maxStep positive, outputMin <= outputMax" };
  }
  for (const [name, value] of Object.entries({ tick: observation.tick, requested: observation.requested, admitted: observation.admitted, refused: observation.refused, integral: state.integral, output: state.output, lastUpdateTick: state.lastUpdateTick })) {
    if (!finite(value)) return { kind: "refused", code: "CONTROL_VALUE_NONFINITE", detail: `${name} is not a finite number` };
  }
  if (observation.basis !== "observed") {
    return { kind: "refused", code: "CONTROL_OBSERVATION_ASSUMED", detail: "the integral advances only from observed admissions; an assumed-applied request is the windup path" };
  }
  if (observation.admitted + observation.refused !== observation.requested) {
    return { kind: "refused", code: "CONTROL_OBSERVATION_INCONSISTENT", detail: `admitted ${observation.admitted} + refused ${observation.refused} != requested ${observation.requested}` };
  }
  if (observation.tick < state.lastUpdateTick) {
    return { kind: "refused", code: "CONTROL_TICK_NOT_ADVANCED", detail: `observation tick ${observation.tick} is before the last update tick ${state.lastUpdateTick}` };
  }
  if (observation.tick === state.lastUpdateTick) {
    return { kind: "refused", code: "CONTROL_SAME_TICK_FEEDBACK", detail: "an observation from the actuation tick would close an instantaneous feedback cycle" };
  }
  const error = config.target - observation.admitted;
  if (Math.abs(error) <= config.hysteresisBand) return { kind: "held", state, reason: "hysteresis" };
  if (observation.tick - state.lastUpdateTick < config.dwellTicks) return { kind: "held", state, reason: "dwell" };
  const rawStep = config.gain * error;
  const step = Math.max(-config.maxStep, Math.min(config.maxStep, rawStep));
  const unclamped = state.output + step;
  const output = Math.max(config.outputMin, Math.min(config.outputMax, unclamped));
  const saturated = output !== unclamped;
  const integral = saturated ? state.integral : state.integral + error;
  return { kind: "updated", state: { integral, output, lastUpdateTick: observation.tick }, error };
}

export type PlantRefusalCode = "PLANT_WITNESS_MISSING" | "PLANT_LINK_UNCOVERED" | "PLANT_OSCILLATION_OBSERVED" | "PLANT_TRACE_NONFINITE";

export interface QueueLink {
  readonly from: string;
  readonly to: string;
}

export interface OscillationWitness {
  /** Queues the witness exercised together; a whole-plant witness names them all. */
  readonly covers: readonly string[];
  /** Joint amplitude trace of the exercised plant, one sample per tick. */
  readonly amplitudes: readonly number[];
}

export interface PlantJudgement {
  readonly schema: "mw.whole-plant.v0";
  readonly ok: boolean;
  readonly refusals: ReadonlyArray<{ readonly code: PlantRefusalCode; readonly subject: string; readonly detail: string }>;
}

/** Linked queues are one plant: every link must be covered by a witness that exercised both ends jointly. */
export function judgeWholePlant(queues: readonly string[], links: readonly QueueLink[], witnesses: readonly OscillationWitness[]): PlantJudgement {
  const refusals: Array<{ code: PlantRefusalCode; subject: string; detail: string }> = [];
  if (links.length > 0 && witnesses.length === 0) {
    refusals.push({ code: "PLANT_WITNESS_MISSING", subject: "plant", detail: "linked queues require whole-plant oscillation witnesses; separately stable modules do not compose" });
  }
  for (const link of links) {
    const covered = witnesses.some((w) => w.covers.includes(link.from) && w.covers.includes(link.to));
    if (witnesses.length > 0 && !covered) {
      refusals.push({ code: "PLANT_LINK_UNCOVERED", subject: `${link.from}->${link.to}`, detail: "no witness exercised both ends of this link jointly" });
    }
  }
  for (const [index, witness] of witnesses.entries()) {
    if (witness.amplitudes.some((a) => !finite(a))) {
      refusals.push({ code: "PLANT_TRACE_NONFINITE", subject: `witnesses.${index}`, detail: "an amplitude sample is not a finite number" });
      continue;
    }
    const half = Math.floor(witness.amplitudes.length / 2);
    if (half >= 1) {
      const head = witness.amplitudes.slice(0, half);
      const tail = witness.amplitudes.slice(witness.amplitudes.length - half);
      const peak = (xs: readonly number[]): number => xs.reduce((m, x) => Math.max(m, Math.abs(x)), 0);
      if (peak(tail) > peak(head)) {
        refusals.push({ code: "PLANT_OSCILLATION_OBSERVED", subject: `witnesses.${index}`, detail: `late peak ${peak(tail)} exceeds early peak ${peak(head)}; amplitude grows` });
      }
    }
  }
  return { schema: "mw.whole-plant.v0", ok: refusals.length === 0, refusals };
}

export type FairnessRefusalCode = "FAIRNESS_FLOOR_MISSING" | "FAIRNESS_FLOOR_KIND_UNKNOWN" | "FAIRNESS_FLOOR_PARAM_INVALID";

export const FAIRNESS_FLOOR_KINDS: readonly string[] = Object.freeze(["aging", "deficit", "hard-min-service"]);

export interface FairnessFloor {
  readonly kind: string;
  /** aging: perTickBoost > 0; deficit: quantum > 0; hard-min-service: everyTicks >= 1. */
  readonly parameter: number;
}

export interface SelectionPolicy {
  readonly utility: { readonly kind: "learned" | "declared" };
  readonly floor?: FairnessFloor;
}

export type PolicyValidation =
  | { readonly kind: "valid"; readonly floor: FairnessFloor | null }
  | { readonly kind: "refused"; readonly code: FairnessRefusalCode; readonly detail: string };

/** The floor is declared separately from the utility: a learned utility with no declared floor can starve difficult tasks. */
export function validateSelectionPolicy(policy: SelectionPolicy): PolicyValidation {
  const floor = policy.floor;
  if (floor === undefined) {
    if (policy.utility.kind === "learned") {
      return { kind: "refused", code: "FAIRNESS_FLOOR_MISSING", detail: "a learned utility requires a separately declared aging, deficit or hard-min-service floor" };
    }
    return { kind: "valid", floor: null };
  }
  if (!FAIRNESS_FLOOR_KINDS.includes(floor.kind)) {
    return { kind: "refused", code: "FAIRNESS_FLOOR_KIND_UNKNOWN", detail: `floor kind ${floor.kind} is outside aging/deficit/hard-min-service` };
  }
  if (!finite(floor.parameter) || floor.parameter <= 0) {
    return { kind: "refused", code: "FAIRNESS_FLOOR_PARAM_INVALID", detail: "the floor parameter must be a positive finite number" };
  }
  return { kind: "valid", floor };
}

export interface QueuedTask {
  readonly taskId: string;
  readonly utility: number;
  readonly waitedTicks: number;
}

export interface SelectionMeasurement {
  readonly schema: "mw.selection-measurement.v0";
  readonly scenario: "overload" | "underload";
  readonly order: readonly string[];
  readonly starved: readonly string[];
}

/**
 * Deterministic selection: tasks ordered by effective utility (utility + aging boost), ties by
 * waited ticks then task id. Under overload only `capacity` tasks run; anything beyond the
 * declared floor's reach is reported as starved rather than silently dropped.
 */
export function measureSelection(policy: SelectionPolicy, tasks: readonly QueuedTask[], capacity: number): SelectionMeasurement | PolicyValidation {
  const validation = validateSelectionPolicy(policy);
  if (validation.kind === "refused") return validation;
  if (!finite(capacity) || capacity < 0 || !Number.isInteger(capacity)) {
    return { kind: "refused", code: "FAIRNESS_FLOOR_PARAM_INVALID", detail: "capacity must be a nonnegative integer" };
  }
  for (const task of tasks) {
    if (!finite(task.utility) || !finite(task.waitedTicks)) {
      return { kind: "refused", code: "FAIRNESS_FLOOR_PARAM_INVALID", detail: `task ${task.taskId} carries a nonfinite utility or wait` };
    }
  }
  const floor = validation.floor;
  const boost = (task: QueuedTask): number => {
    if (floor === null) return task.utility;
    if (floor.kind === "aging") return task.utility + floor.parameter * task.waitedTicks;
    if (floor.kind === "deficit") return task.utility + Math.min(floor.parameter, task.waitedTicks);
    return task.waitedTicks >= floor.parameter ? Number.MAX_SAFE_INTEGER : task.utility;
  };
  const ranked = [...tasks].sort((a, b) => {
    const d = boost(b) - boost(a);
    if (d !== 0) return d;
    const w = b.waitedTicks - a.waitedTicks;
    if (w !== 0) return w;
    return a.taskId < b.taskId ? -1 : a.taskId > b.taskId ? 1 : 0;
  });
  const scenario: "overload" | "underload" = tasks.length > capacity ? "overload" : "underload";
  const order = ranked.slice(0, Math.min(capacity, ranked.length)).map((t) => t.taskId);
  const starved = ranked.slice(Math.min(capacity, ranked.length)).map((t) => t.taskId);
  return { schema: "mw.selection-measurement.v0", scenario, order, starved };
}
