import test from "node:test";
import assert from "node:assert/strict";
import {
  applyControlUpdate,
  judgeWholePlant,
  validateSelectionPolicy,
  measureSelection,
  FAIRNESS_FLOOR_KINDS,
  type AdmissionObservation,
  type ControllerConfig,
  type ControllerState,
} from "../dist/index.js";

const config: ControllerConfig = { target: 10, gain: 1, hysteresisBand: 1, dwellTicks: 2, maxStep: 3, outputMin: 0, outputMax: 20 };
const state: ControllerState = { integral: 0, output: 10, lastUpdateTick: 0 };
const obs = (over: Partial<AdmissionObservation>): AdmissionObservation => ({ tick: 5, requested: 6, admitted: 4, refused: 2, basis: "observed", ...over });

test("an assumed-applied observation is refused: the integral advances only from observed admissions", () => {
  const r = applyControlUpdate(state, obs({ basis: "assumed" }), config);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "CONTROL_OBSERVATION_ASSUMED");
});

test("an inconsistent observed triple is refused", () => {
  const r = applyControlUpdate(state, obs({ admitted: 5 }), config);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "CONTROL_OBSERVATION_INCONSISTENT");
});

test("an observation from the actuation tick is refused: no instantaneous feedback cycle", () => {
  const r = applyControlUpdate(state, obs({ tick: 0, requested: 4, admitted: 4, refused: 0 }), config);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "CONTROL_SAME_TICK_FEEDBACK");
  const back = applyControlUpdate({ ...state, lastUpdateTick: 7 }, obs({ tick: 6 }), config);
  assert.equal(back.kind, "refused");
  if (back.kind === "refused") assert.equal(back.code, "CONTROL_TICK_NOT_ADVANCED");
});

test("an error inside the hysteresis band holds the controller unchanged", () => {
  const r = applyControlUpdate(state, obs({ requested: 10, admitted: 10, refused: 0 }), config);
  assert.equal(r.kind, "held");
  if (r.kind === "held") { assert.equal(r.reason, "hysteresis"); assert.deepEqual(r.state, state); }
});

test("an update inside the dwell window holds even when the error is large", () => {
  const r = applyControlUpdate({ ...state, lastUpdateTick: 4 }, obs({ tick: 5 }), config);
  assert.equal(r.kind, "held");
  if (r.kind === "held") assert.equal(r.reason, "dwell");
});

test("the step is bounded by maxStep and a saturated output freezes the integral", () => {
  const r = applyControlUpdate(state, obs({ requested: 30, admitted: 0, refused: 30 }), config);
  assert.equal(r.kind, "updated");
  if (r.kind === "updated") {
    assert.equal(r.state.output, 13);
    assert.equal(r.state.integral, 10);
    assert.equal(r.state.lastUpdateTick, 5);
  }
  const sat = applyControlUpdate({ integral: 2, output: 19, lastUpdateTick: 0 }, obs({ requested: 30, admitted: 0, refused: 30 }), config);
  assert.equal(sat.kind, "updated");
  if (sat.kind === "updated") {
    assert.equal(sat.state.output, 20);
    assert.equal(sat.state.integral, 2);
  }
});

test("nonfinite values and an invalid config are refused", () => {
  const nf = applyControlUpdate(state, obs({ admitted: Number.NaN }), config);
  assert.equal(nf.kind, "refused");
  if (nf.kind === "refused") assert.equal(nf.code, "CONTROL_VALUE_NONFINITE");
  const bad = applyControlUpdate(state, obs({}), { ...config, maxStep: 0 });
  assert.equal(bad.kind, "refused");
  if (bad.kind === "refused") assert.equal(bad.code, "CONTROL_CONFIG_INVALID");
});

test("linked queues with no joint witness refuse, and an uncovered link names itself", () => {
  const none = judgeWholePlant(["a", "b"], [{ from: "a", to: "b" }], []);
  assert.equal(none.ok, false);
  assert.ok(none.refusals.some((r) => r.code === "PLANT_WITNESS_MISSING"));
  const partial = judgeWholePlant(["a", "b", "c"], [{ from: "a", to: "b" }, { from: "b", to: "c" }], [{ covers: ["a", "b"], amplitudes: [3, 2, 1, 1] }]);
  assert.equal(partial.ok, false);
  const codes = partial.refusals.map((r) => r.code);
  assert.ok(codes.includes("PLANT_LINK_UNCOVERED"));
  assert.ok(partial.refusals.some((r) => r.subject === "b->c"));
});

test("a growing joint amplitude refuses the plant; a damped one passes; separate stability does not substitute", () => {
  const grow = judgeWholePlant(["a", "b"], [{ from: "a", to: "b" }], [{ covers: ["a", "b"], amplitudes: [1, 1, 2, 3] }]);
  assert.equal(grow.ok, false);
  assert.ok(grow.refusals.some((r) => r.code === "PLANT_OSCILLATION_OBSERVED"));
  const damped = judgeWholePlant(["a", "b"], [{ from: "a", to: "b" }], [{ covers: ["a", "b"], amplitudes: [3, 2, 1, 1] }]);
  assert.equal(damped.ok, true);
  const nonfinite = judgeWholePlant(["a", "b"], [{ from: "a", to: "b" }], [{ covers: ["a", "b"], amplitudes: [1, Number.POSITIVE_INFINITY] }]);
  assert.equal(nonfinite.ok, false);
  assert.ok(nonfinite.refusals.some((r) => r.code === "PLANT_TRACE_NONFINITE"));
});

test("a learned utility without a declared floor is refused; declared floors validate kind and parameter", () => {
  const missing = validateSelectionPolicy({ utility: { kind: "learned" } });
  assert.equal(missing.kind, "refused");
  if (missing.kind === "refused") assert.equal(missing.code, "FAIRNESS_FLOOR_MISSING");
  const declared = validateSelectionPolicy({ utility: { kind: "declared" } });
  assert.equal(declared.kind, "valid");
  const unknown = validateSelectionPolicy({ utility: { kind: "learned" }, floor: { kind: "priority-boost", parameter: 1 } });
  assert.equal(unknown.kind, "refused");
  if (unknown.kind === "refused") assert.equal(unknown.code, "FAIRNESS_FLOOR_KIND_UNKNOWN");
  const badParam = validateSelectionPolicy({ utility: { kind: "learned" }, floor: { kind: "aging", parameter: 0 } });
  assert.equal(badParam.kind, "refused");
  if (badParam.kind === "refused") assert.equal(badParam.code, "FAIRNESS_FLOOR_PARAM_INVALID");
  assert.deepEqual([...FAIRNESS_FLOOR_KINDS], ["aging", "deficit", "hard-min-service"]);
});

test("selection is deterministic and reports the starved remainder under overload", () => {
  const tasks = [
    { taskId: "hard", utility: 1, waitedTicks: 9 },
    { taskId: "easy1", utility: 5, waitedTicks: 0 },
    { taskId: "easy2", utility: 5, waitedTicks: 0 },
  ];
  const policy = { utility: { kind: "learned" as const }, floor: { kind: "aging", parameter: 1 } };
  const first = measureSelection(policy, tasks, 2);
  const second = measureSelection(policy, tasks, 2);
  assert.deepEqual(first, second);
  assert.ok("scenario" in first);
  if ("scenario" in first) {
    assert.equal(first.scenario, "overload");
    assert.deepEqual(first.order, ["hard", "easy1"]);
    assert.deepEqual(first.starved, ["easy2"]);
  }
});

test("a hard-min-service floor forces a long-waited task to the front; underload runs everything", () => {
  const tasks = [
    { taskId: "starving", utility: 0, waitedTicks: 8 },
    { taskId: "rich", utility: 100, waitedTicks: 0 },
  ];
  const policy = { utility: { kind: "learned" as const }, floor: { kind: "hard-min-service", parameter: 5 } };
  const r = measureSelection(policy, tasks, 1);
  assert.ok("order" in r);
  if ("order" in r) assert.deepEqual(r.order, ["starving"]);
  const under = measureSelection(policy, tasks, 5);
  assert.ok("scenario" in under);
  if ("scenario" in under) { assert.equal(under.scenario, "underload"); assert.deepEqual(under.starved, []); }
});

test("selection refuses nonfinite task values and a fractional capacity", () => {
  const policy = { utility: { kind: "declared" as const } };
  const nf = measureSelection(policy, [{ taskId: "x", utility: Number.NaN, waitedTicks: 0 }], 1);
  assert.ok("kind" in nf && nf.kind === "refused");
  const frac = measureSelection(policy, [], 1.5);
  assert.ok("kind" in frac && frac.kind === "refused");
});

// o4kw: pins for the laws the landed 3l61.12 suite left unpinned (config validation, controller edges, plant edges, selection ranking).

const refusedCode = (r: { kind: string; code?: string }): string | undefined => (r.kind === "refused" ? r.code : undefined);

test("every nonfinite config field and every nonfinite state field refuses with the field named", () => {
  for (const name of ["target", "gain", "hysteresisBand", "dwellTicks", "maxStep", "outputMin", "outputMax"] as const) {
    const r = applyControlUpdate(state, obs({}), { ...config, [name]: Number.NaN });
    assert.equal(refusedCode(r), "CONTROL_CONFIG_INVALID", name);
    if (r.kind === "refused") assert.equal(r.detail, `config.${name} is not a finite number`);
  }
  assert.equal(refusedCode(applyControlUpdate(state, obs({}), { ...config, gain: Number.POSITIVE_INFINITY })), "CONTROL_CONFIG_INVALID");
  for (const name of ["integral", "output", "lastUpdateTick"] as const) {
    const r = applyControlUpdate({ ...state, [name]: Number.NaN }, obs({}), config);
    assert.equal(refusedCode(r), "CONTROL_VALUE_NONFINITE", name);
    if (r.kind === "refused") assert.equal(r.detail, `${name} is not a finite number`);
  }
});

test("a negative hysteresis band, a negative dwell and an inverted output range each refuse as invalid config", () => {
  assert.equal(refusedCode(applyControlUpdate(state, obs({}), { ...config, hysteresisBand: -1 })), "CONTROL_CONFIG_INVALID");
  assert.equal(refusedCode(applyControlUpdate(state, obs({}), { ...config, dwellTicks: -1 })), "CONTROL_CONFIG_INVALID");
  assert.equal(refusedCode(applyControlUpdate(state, obs({}), { ...config, outputMin: 15, outputMax: 5 })), "CONTROL_CONFIG_INVALID");
  assert.equal(refusedCode(applyControlUpdate(state, obs({}), { ...config, maxStep: -2 })), "CONTROL_CONFIG_INVALID");
  assert.notEqual(refusedCode(applyControlUpdate(state, obs({}), { ...config, outputMin: 10, outputMax: 10 })), "CONTROL_CONFIG_INVALID");
  assert.notEqual(refusedCode(applyControlUpdate(state, obs({}), { ...config, hysteresisBand: 0, dwellTicks: 0 })), "CONTROL_CONFIG_INVALID");
});

test("only the literal basis observed advances the integral: any other basis value is refused as assumed", () => {
  const r = applyControlUpdate(state, obs({ basis: "inferred" as unknown as "assumed" }), config);
  assert.equal(refusedCode(r), "CONTROL_OBSERVATION_ASSUMED");
});

test("an error exactly at the hysteresis band holds, and a negative error beyond the band still updates", () => {
  const edge = applyControlUpdate(state, obs({ requested: 9, admitted: 9, refused: 0 }), config);
  assert.equal(edge.kind, "held");
  if (edge.kind === "held") assert.equal(edge.reason, "hysteresis");
  const negInside = applyControlUpdate(state, obs({ requested: 11, admitted: 11, refused: 0 }), config);
  assert.equal(negInside.kind, "held");
  const neg = applyControlUpdate(state, obs({ requested: 15, admitted: 15, refused: 0 }), config);
  assert.equal(neg.kind, "updated");
});

test("a negative error steps down by at most maxStep and subtracts from the integral", () => {
  const r = applyControlUpdate(state, obs({ requested: 15, admitted: 15, refused: 0 }), config);
  assert.equal(r.kind, "updated");
  if (r.kind === "updated") {
    assert.equal(r.error, -5);
    assert.equal(r.state.output, 7);
    assert.equal(r.state.integral, -5);
    assert.equal(r.state.lastUpdateTick, 5);
  }
});

test("the lower output clamp holds at outputMin and freezes the integral", () => {
  const r = applyControlUpdate({ integral: 4, output: 1, lastUpdateTick: 0 }, obs({ requested: 15, admitted: 15, refused: 0 }), config);
  assert.equal(r.kind, "updated");
  if (r.kind === "updated") {
    assert.equal(r.state.output, 0);
    assert.equal(r.state.integral, 4);
  }
});

test("an update exactly dwellTicks after the last update proceeds, one tick sooner holds", () => {
  const atEdge = applyControlUpdate({ ...state, lastUpdateTick: 3 }, obs({ tick: 5 }), config);
  assert.equal(atEdge.kind, "updated");
  const sooner = applyControlUpdate({ ...state, lastUpdateTick: 4 }, obs({ tick: 5 }), config);
  assert.equal(sooner.kind, "held");
  if (sooner.kind === "held") assert.equal(sooner.reason, "dwell");
});

test("the gain scales the step and the update returns the signed error", () => {
  const r = applyControlUpdate(state, obs({ requested: 4, admitted: 0, refused: 4 }), { ...config, gain: 0.25 });
  assert.equal(r.kind, "updated");
  if (r.kind === "updated") {
    assert.equal(r.error, 10);
    assert.equal(r.state.output, 12.5);
    assert.equal(r.state.integral, 10);
  }
  const e6 = applyControlUpdate(state, obs({}), config);
  assert.equal(e6.kind, "updated");
  if (e6.kind === "updated") assert.equal(e6.error, 6);
});

test("an unlinked plant needs no witness; a flat, an equal-peak and a damped negative trace pass", () => {
  const bare = judgeWholePlant(["a", "b"], [], []);
  assert.equal(bare.ok, true);
  assert.deepEqual(bare.refusals, []);
  const link = [{ from: "a", to: "b" }];
  for (const amplitudes of [[1, 1, 1, 1], [2, 1, 1, 2], [-5, -5, 1, 1]]) {
    const r = judgeWholePlant(["a", "b"], link, [{ covers: ["a", "b"], amplitudes }]);
    assert.equal(r.ok, true, JSON.stringify(amplitudes));
    assert.deepEqual(r.refusals, []);
  }
});

test("a two-sample growing trace and a growing negative trace both refuse as oscillation", () => {
  const link = [{ from: "a", to: "b" }];
  const two = judgeWholePlant(["a", "b"], link, [{ covers: ["a", "b"], amplitudes: [1, 2] }]);
  assert.deepEqual(two.refusals.map((r) => r.code), ["PLANT_OSCILLATION_OBSERVED"]);
  const neg = judgeWholePlant(["a", "b"], link, [{ covers: ["a", "b"], amplitudes: [1, 1, -5, -5] }]);
  assert.deepEqual(neg.refusals.map((r) => r.code), ["PLANT_OSCILLATION_OBSERVED"]);
  const one = judgeWholePlant(["a", "b"], link, [{ covers: ["a", "b"], amplitudes: [5] }]);
  assert.equal(one.ok, true);
});

test("a nonfinite trace refuses once as nonfinite and is not also judged for oscillation", () => {
  const r = judgeWholePlant(["a", "b"], [{ from: "a", to: "b" }], [{ covers: ["a", "b"], amplitudes: [1, Number.POSITIVE_INFINITY] }]);
  assert.deepEqual(r.refusals.map((x) => x.code), ["PLANT_TRACE_NONFINITE"]);
  assert.equal(r.refusals[0]?.subject, "witnesses.0");
});

test("both result schemas carry their versioned identifiers", () => {
  assert.equal(judgeWholePlant([], [], []).schema, "mw.whole-plant.v0");
  const m = measureSelection({ utility: { kind: "declared" } }, [], 1);
  assert.ok("schema" in m);
  if ("schema" in m) assert.equal(m.schema, "mw.selection-measurement.v0");
});

test("a nonfinite floor parameter is refused and the floor kinds list is frozen", () => {
  for (const parameter of [Number.NaN, Number.POSITIVE_INFINITY, -1]) {
    const r = validateSelectionPolicy({ utility: { kind: "learned" }, floor: { kind: "aging", parameter } });
    assert.equal(refusedCode(r), "FAIRNESS_FLOOR_PARAM_INVALID", String(parameter));
  }
  assert.equal(Object.isFrozen(FAIRNESS_FLOOR_KINDS), true);
});

test("measureSelection returns the policy refusal itself, and refuses a negative capacity and a nonfinite wait", () => {
  const tasks = [{ taskId: "x", utility: 1, waitedTicks: 0 }, { taskId: "y", utility: 2, waitedTicks: 0 }];
  const noFloor = measureSelection({ utility: { kind: "learned" } }, tasks, 1);
  assert.deepEqual(noFloor, validateSelectionPolicy({ utility: { kind: "learned" } }));
  assert.equal(refusedCode(noFloor as { kind: string; code?: string }), "FAIRNESS_FLOOR_MISSING");
  const policy = { utility: { kind: "declared" as const } };
  assert.equal(refusedCode(measureSelection(policy, tasks, -1) as { kind: string; code?: string }), "FAIRNESS_FLOOR_PARAM_INVALID");
  assert.equal(refusedCode(measureSelection(policy, [{ taskId: "x", utility: 1, waitedTicks: Number.NaN }], 1) as { kind: string; code?: string }), "FAIRNESS_FLOOR_PARAM_INVALID");
  assert.equal(refusedCode(measureSelection(policy, tasks, Number.NaN) as { kind: string; code?: string }), "FAIRNESS_FLOOR_PARAM_INVALID");
});

test("the aging boost scales by its parameter: a fractional and a larger parameter rank differently", () => {
  const tasks = [{ taskId: "rich", utility: 5, waitedTicks: 0 }, { taskId: "old", utility: 0, waitedTicks: 3 }];
  const big = measureSelection({ utility: { kind: "learned" }, floor: { kind: "aging", parameter: 2 } }, tasks, 1);
  assert.ok("order" in big);
  if ("order" in big) assert.deepEqual(big.order, ["old"]);
  const small = measureSelection({ utility: { kind: "learned" }, floor: { kind: "aging", parameter: 0.1 } }, tasks, 1);
  assert.ok("order" in small);
  if ("order" in small) assert.deepEqual(small.order, ["rich"]);
});

test("the deficit floor boosts a waiting task by at most its quantum", () => {
  const capped = measureSelection({ utility: { kind: "learned" }, floor: { kind: "deficit", parameter: 2 } },
    [{ taskId: "waiter", utility: 0, waitedTicks: 5 }, { taskId: "mid", utility: 4, waitedTicks: 0 }], 1);
  assert.ok("order" in capped);
  if ("order" in capped) assert.deepEqual(capped.order, ["mid"]);
  const boosted = measureSelection({ utility: { kind: "learned" }, floor: { kind: "deficit", parameter: 5 } },
    [{ taskId: "mid", utility: 1, waitedTicks: 0 }, { taskId: "waiter", utility: 0, waitedTicks: 3 }], 1);
  assert.ok("order" in boosted);
  if ("order" in boosted) assert.deepEqual(boosted.order, ["waiter"]);
});

test("a hard-min-service floor forces a task whose wait equals the parameter exactly", () => {
  const r = measureSelection({ utility: { kind: "learned" }, floor: { kind: "hard-min-service", parameter: 5 } },
    [{ taskId: "rich", utility: 100, waitedTicks: 0 }, { taskId: "edge", utility: 0, waitedTicks: 5 }], 1);
  assert.ok("order" in r);
  if ("order" in r) assert.deepEqual(r.order, ["edge"]);
});

test("a declared utility with no floor ranks two or more tasks by utility", () => {
  const r = measureSelection({ utility: { kind: "declared" } },
    [{ taskId: "low", utility: 1, waitedTicks: 9 }, { taskId: "high", utility: 7, waitedTicks: 0 }, { taskId: "mid", utility: 3, waitedTicks: 0 }], 3);
  assert.ok("order" in r);
  if ("order" in r) assert.deepEqual(r.order, ["high", "mid", "low"]);
});

test("equal effective utility ties break by the longer wait, then by the lesser task id regardless of input order", () => {
  const declared = { utility: { kind: "declared" as const } };
  const waited = measureSelection(declared, [{ taskId: "a", utility: 5, waitedTicks: 0 }, { taskId: "b", utility: 5, waitedTicks: 4 }], 2);
  assert.ok("order" in waited);
  if ("order" in waited) assert.deepEqual(waited.order, ["b", "a"]);
  const forward = measureSelection(declared, [{ taskId: "easy1", utility: 5, waitedTicks: 0 }, { taskId: "easy2", utility: 5, waitedTicks: 0 }], 2);
  const reverse = measureSelection(declared, [{ taskId: "easy2", utility: 5, waitedTicks: 0 }, { taskId: "easy1", utility: 5, waitedTicks: 0 }], 2);
  assert.ok("order" in forward && "order" in reverse);
  if ("order" in forward && "order" in reverse) {
    assert.deepEqual(forward.order, ["easy1", "easy2"]);
    assert.deepEqual(reverse.order, ["easy1", "easy2"]);
  }
});

test("tasks equal to capacity is underload, one more task is overload", () => {
  const declared = { utility: { kind: "declared" as const } };
  const tasks = [{ taskId: "a", utility: 2, waitedTicks: 0 }, { taskId: "b", utility: 1, waitedTicks: 0 }];
  const equal = measureSelection(declared, tasks, 2);
  assert.ok("scenario" in equal);
  if ("scenario" in equal) { assert.equal(equal.scenario, "underload"); assert.deepEqual(equal.starved, []); }
  const over = measureSelection(declared, tasks, 1);
  assert.ok("scenario" in over);
  if ("scenario" in over) { assert.equal(over.scenario, "overload"); assert.deepEqual(over.starved, ["b"]); }
});
