import test from "node:test";
import assert from "node:assert/strict";
import {
  CANARY_PREREQUISITES,
  CANARY_STAGES,
  parseCanaryStage,
  planCanaryStep,
  type CanaryStepInput,
  type PrerequisiteWitness,
} from "../dist/index.js";

const greenPrereqs = (): PrerequisiteWitness[] => CANARY_PREREQUISITES.map((name) => ({ name, green: true, evidence: `gate ${name} PASS` }));

const advance = (overrides?: Partial<CanaryStepInput>): CanaryStepInput => ({
  optIn: true,
  from: "shadow",
  to: "canary",
  prerequisites: greenPrereqs(),
  rollback: { fromStage: "canary", toStage: "shadow", tested: true, evidence: "rollback drill receipt" },
  ...overrides,
});

test("an opted-in, fully-witnessed single-rung advance with a tested rollback seals green", () => {
  assert.deepEqual([...CANARY_STAGES], ["shadow", "canary", "enabled"]);
  assert.deepEqual([...CANARY_PREREQUISITES], ["sidecar", "fixture-families", "shadow-adapter", "forge-integration-gate"]);
  const step = planCanaryStep(advance());
  assert.equal(step.ok, true);
  assert.equal(step.kind, "advance");
  assert.equal(step.from, "shadow");
  assert.equal(step.to, "canary");
  assert.ok(Object.isFrozen(step) && Object.isFrozen(step.refusals));
});

test("negative: without the explicit opt-in an advance refuses", () => {
  const step = planCanaryStep(advance({ optIn: false }));
  assert.equal(step.ok, false);
  assert.ok(step.refusals.some((r) => r.code === "CANARY_OPT_IN_MISSING"));
});

test("negative: an unknown stage, a same-stage step and a rung skip each refuse", () => {
  assert.equal(parseCanaryStage("live"), undefined);
  const unknown = planCanaryStep(advance({ to: "live" }));
  assert.ok(unknown.refusals.some((r) => r.code === "CANARY_STAGE_UNKNOWN"));
  const same = planCanaryStep(advance({ to: "shadow" }));
  assert.ok(same.refusals.some((r) => r.code === "CANARY_STAGE_SAME"));
  const skipped = planCanaryStep(advance({ to: "enabled", rollback: { fromStage: "enabled", toStage: "canary", tested: true, evidence: "drill" } }));
  assert.ok(skipped.refusals.some((r) => r.code === "CANARY_STAGE_SKIPPED"));
});

test("negative: a missing or non-green prerequisite witness refuses by name", () => {
  const missing = planCanaryStep(advance({ prerequisites: greenPrereqs().filter((p) => p.name !== "shadow-adapter") }));
  assert.ok(missing.refusals.some((r) => r.code === "CANARY_PREREQUISITE_MISSING" && r.detail.includes("shadow-adapter")));
  const red = planCanaryStep(advance({ prerequisites: greenPrereqs().map((p) => (p.name === "sidecar" ? { ...p, green: false } : p)) }));
  assert.ok(red.refusals.some((r) => r.code === "CANARY_PREREQUISITE_NOT_GREEN" && r.detail.includes("sidecar")));
  const blankEvidence = planCanaryStep(advance({ prerequisites: greenPrereqs().map((p) => (p.name === "fixture-families" ? { ...p, evidence: " " } : p)) }));
  assert.ok(blankEvidence.refusals.some((r) => r.code === "CANARY_PREREQUISITE_NOT_GREEN" && r.detail.includes("fixture-families")));
});

test("negative: an advance without a TESTED rollback covering the destination refuses", () => {
  const untested = planCanaryStep(advance({ rollback: { fromStage: "canary", toStage: "shadow", tested: false, evidence: "planned only" } }));
  assert.ok(untested.refusals.some((r) => r.code === "CANARY_ROLLBACK_UNTESTED"));
  const wrongCover = planCanaryStep(advance({ rollback: { fromStage: "enabled", toStage: "canary", tested: true, evidence: "drill" } }));
  assert.ok(wrongCover.refusals.some((r) => r.code === "CANARY_ROLLBACK_UNTESTED"));
});

test("a rollback move needs its own tested witness over exactly that move, and then seals green", () => {
  const good = planCanaryStep(advance({ from: "canary", to: "shadow", rollback: { fromStage: "canary", toStage: "shadow", tested: true, evidence: "drill receipt" } }));
  assert.equal(good.ok, true);
  assert.equal(good.kind, "rollback");
  const untested = planCanaryStep(advance({ from: "canary", to: "shadow", rollback: { fromStage: "canary", toStage: "shadow", tested: false, evidence: "x" } }));
  assert.ok(untested.refusals.some((r) => r.code === "CANARY_ROLLBACK_UNTESTED"));
  const mismatched = planCanaryStep(advance({ from: "enabled", to: "shadow", rollback: { fromStage: "canary", toStage: "shadow", tested: true, evidence: "drill" } }));
  assert.ok(mismatched.refusals.some((r) => r.code === "CANARY_ROLLBACK_INVALID"));
});
