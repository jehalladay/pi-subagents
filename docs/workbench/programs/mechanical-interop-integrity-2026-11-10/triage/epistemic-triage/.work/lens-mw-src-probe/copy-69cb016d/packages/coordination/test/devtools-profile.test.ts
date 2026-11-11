import test from "node:test";
import assert from "node:assert/strict";
import {
  PROFILE_AXES,
  VIEW_KINDS,
  parseProfileAxis,
  recordStageEightExit,
  type AxisMeasurement,
  type StageEightExitInput,
} from "../dist/index.js";

const measurement = (axis: string, metric: string, extra?: Partial<AxisMeasurement>): AxisMeasurement => ({
  axis,
  metric,
  value: 0.92,
  sampleCount: 12,
  method: "scripted task walkthrough",
  ...extra,
});

const greenInput = (): StageEightExitInput => ({
  surfaces: [{ name: "workbench", views: ["decision-graph", "why-not"], actuations: [] }],
  measurements: [measurement("ux", "task-success-rate"), measurement("dx", "time-to-first-trace"), measurement("lx", "why-not-coverage")],
  forgeEvidence: [{ commandId: "cmd-abc", operationId: "op-abc" }],
});

test("a measured three-axis exit with a read-only surface and forge evidence seals green", () => {
  assert.deepEqual([...PROFILE_AXES], ["ux", "dx", "lx"]);
  const exit = recordStageEightExit(greenInput());
  assert.equal(exit.ok, true);
  assert.equal(exit.schema, "mw.stage-eight-exit.v0");
  assert.equal(exit.measuredByAxis["ux"], 1);
  assert.ok(Object.isFrozen(exit) && Object.isFrozen(exit.measuredByAxis));
  assert.ok(greenInput().surfaces[0]!.views.every((v) => (VIEW_KINDS as readonly string[]).includes(v)));
});

test("negative: an unknown axis refuses and an axis with no valid measurement refuses", () => {
  const unknown = recordStageEightExit({ ...greenInput(), measurements: [...greenInput().measurements, measurement("ops", "x")] });
  assert.ok(unknown.refusals.some((r) => r.code === "DEVTOOLS_AXIS_UNKNOWN"));
  const missing = recordStageEightExit({ ...greenInput(), measurements: greenInput().measurements.filter((m) => m.axis !== "lx") });
  assert.equal(missing.ok, false);
  assert.ok(missing.refusals.some((r) => r.code === "DEVTOOLS_AXIS_UNMEASURED" && r.detail.includes("lx")));
  assert.equal(parseProfileAxis("ops"), undefined);
  assert.equal(parseProfileAxis("ux"), "ux");
});

test("negative: nonfinite values, zero samples and blank methods are invalid measurements, and an axis covered only by them stays unmeasured", () => {
  const base = greenInput();
  const bad = recordStageEightExit({
    ...base,
    measurements: [measurement("ux", "rate", { value: Number.NaN }), measurement("ux", "rate2", { sampleCount: 0 }), measurement("ux", "rate3", { method: " " }), measurement("dx", "t"), measurement("lx", "c")],
  });
  assert.equal(bad.ok, false);
  assert.equal(bad.refusals.filter((r) => r.code === "DEVTOOLS_MEASUREMENT_INVALID").length, 3);
  assert.ok(bad.refusals.some((r) => r.code === "DEVTOOLS_AXIS_UNMEASURED" && r.detail.includes("ux")));
  assert.equal(bad.measuredByAxis["ux"], 0);
});

test("negative: a surface declaring any actuation refuses under the APO-020 read-only law", () => {
  const input = greenInput();
  const exit = recordStageEightExit({ ...input, surfaces: [{ name: "workbench", views: ["credit"], actuations: ["requeue-intent"] }] });
  assert.equal(exit.ok, false);
  assert.ok(exit.refusals.some((r) => r.code === "DEVTOOLS_ACTUATION_FORBIDDEN" && r.detail.includes("workbench")));
});

test("negative: a view outside the pinned read-only vocabulary refuses by name", () => {
  const exit = recordStageEightExit({ ...greenInput(), surfaces: [{ name: "workbench", views: ["live-editor"], actuations: [] }] });
  assert.ok(exit.refusals.some((r) => r.code === "DEVTOOLS_VIEW_UNKNOWN" && r.detail.includes("live-editor")));
});

test("negative: missing surfaces and blank forge evidence ids refuse", () => {
  const noSurface = recordStageEightExit({ ...greenInput(), surfaces: [] });
  assert.ok(noSurface.refusals.some((r) => r.code === "DEVTOOLS_SURFACE_MISSING"));
  const blankEvidence = recordStageEightExit({ ...greenInput(), forgeEvidence: [{ commandId: "  ", operationId: "op" }] });
  assert.ok(blankEvidence.refusals.some((r) => r.code === "DEVTOOLS_FORGE_EVIDENCE_MISSING"));
});

test("refusal details name the offending axis, measurement axis and surface", () => {
  const unknown = recordStageEightExit({ ...greenInput(), measurements: [...greenInput().measurements, measurement("ops", "x")] });
  assert.ok(unknown.refusals.some((r) => r.code === "DEVTOOLS_AXIS_UNKNOWN" && r.detail.includes("ops")));
  const invalid = recordStageEightExit({ ...greenInput(), measurements: [...greenInput().measurements, measurement("dx", "t2", { value: Number.NaN })] });
  assert.ok(invalid.refusals.some((r) => r.code === "DEVTOOLS_MEASUREMENT_INVALID" && r.detail.includes("dx")));
  const view = recordStageEightExit({ ...greenInput(), surfaces: [{ name: "inspector-pane", views: ["live-editor"], actuations: [] }] });
  assert.ok(view.refusals.some((r) => r.code === "DEVTOOLS_VIEW_UNKNOWN" && r.detail.includes("inspector-pane")));
});

test("negative: a fractional sample count and a blank metric each refuse as invalid measurements", () => {
  const fractional = recordStageEightExit({ ...greenInput(), measurements: [measurement("ux", "rate", { sampleCount: 1.5 }), measurement("dx", "t"), measurement("lx", "c")] });
  assert.equal(fractional.ok, false);
  assert.equal(fractional.refusals.filter((r) => r.code === "DEVTOOLS_MEASUREMENT_INVALID").length, 1);
  assert.equal(fractional.measuredByAxis["ux"], 0);
  const blankMetric = recordStageEightExit({ ...greenInput(), measurements: [measurement("ux", " "), measurement("dx", "t"), measurement("lx", "c")] });
  assert.equal(blankMetric.ok, false);
  assert.equal(blankMetric.refusals.filter((r) => r.code === "DEVTOOLS_MEASUREMENT_INVALID").length, 1);
  assert.equal(blankMetric.measuredByAxis["ux"], 0);
});

test("negative: a citation with a blank operation id does not count as forge evidence", () => {
  const exit = recordStageEightExit({ ...greenInput(), forgeEvidence: [{ commandId: "cmd", operationId: "  " }] });
  assert.equal(exit.ok, false);
  assert.ok(exit.refusals.some((r) => r.code === "DEVTOOLS_FORGE_EVIDENCE_MISSING"));
});

test("the profile axes, the exit refusals and every refusal row are frozen", () => {
  assert.ok(Object.isFrozen(PROFILE_AXES));
  const exit = recordStageEightExit({ ...greenInput(), surfaces: [], forgeEvidence: [] });
  assert.ok(exit.refusals.length >= 2);
  assert.ok(Object.isFrozen(exit.refusals));
  assert.ok(exit.refusals.every((r) => Object.isFrozen(r)));
});

test("an unmeasured lx axis reports a zero count with ux, dx, lx key order", () => {
  const exit = recordStageEightExit({ ...greenInput(), measurements: greenInput().measurements.filter((m) => m.axis !== "lx") });
  assert.equal(exit.measuredByAxis["lx"], 0);
  assert.deepEqual(Object.keys(exit.measuredByAxis), ["ux", "dx", "lx"]);
});
