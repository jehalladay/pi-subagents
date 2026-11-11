// MechanicalWorkflows-trys (GPC-EAT-R009): the executed synthetic vertical cut. One pinned report over
// tiny landing-queue and DAG fixtures with arms {exact-oracle, fifo, gp-scorer, restack}: the per-family
// successor schema (mw.graph-family-evaluation.v1) extended additively with mode "fixture" and provenance
// (instance sizes, regret definition, oracle witnesses, learned-arm configuration), certified false
// everywhere. The node leg regenerates the report from its seeds and asserts byte-identity with the
// committed fixture; the oracle is exact by enumeration (landing: the full two-action script space at
// n<=stepsCap; DAG: all 120 task-priority orders, with the found minimum equal to the ceil(5/2)=3
// lower bound, a per-instance exactness certificate).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  runVerticalCut, verticalCutBytes,
  VERTICAL_CUT_ARMS, VERTICAL_CUT_INSTANCES, VERTICAL_CUT_REGRET_DEFINITION,
  digest,
} from "../dist/index.js";
import type { VerticalCutReport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(here, "..", "..", "..", "qa", "integration", "python-consumer", "fixtures", "vertical-cut-seed7.json");

test("the report regenerates from its seeds byte-identical to the committed fixture, and twice over (pure)", () => {
  const report = runVerticalCut();
  assert.equal(verticalCutBytes(report), readFileSync(FIXTURE, "utf8"), "committed fixture bytes");
  assert.equal(runVerticalCut().reportDigest, report.reportDigest, "same seeds, same digest");
});

test("schema is the per-family successor, mode fixture, certified false everywhere, and the digest re-verifies", () => {
  const report: VerticalCutReport = runVerticalCut();
  assert.equal(report.schema, "mw.graph-family-evaluation.v1");
  assert.equal(report.mode, "fixture");
  assert.equal(report.certified, false);
  for (const block of report.families) {
    assert.equal(block.certified, false, block.family);
    for (const arm of block.arms) assert.equal(arm.certified, false, `${block.family}/${arm.armId}`);
  }
  const { reportDigest, ...body } = report;
  assert.equal(digest(body), reportDigest, "reportDigest covers the body");
});

test("both families are present, every block lists exactly the four canonical arms with the R010 metrics", () => {
  const report = runVerticalCut();
  assert.deepEqual(report.families.map(block => block.family), ["dag-assignment", "landing-queue"], "sorted family blocks");
  assert.deepEqual([...VERTICAL_CUT_ARMS], ["exact-oracle", "fifo", "gp-scorer", "restack"], "closed sorted arm list");
  for (const block of report.families) {
    assert.deepEqual(block.arms.map(arm => arm.armId), [...VERTICAL_CUT_ARMS], block.family);
    for (const arm of block.arms) {
      assert.equal(arm.n, 1, "one pinned instance per family per arm");
      assert.equal(typeof arm.regretMicro, "number", `${block.family}/${arm.armId} regret is measured, never unknown here`);
      assert.ok(Number.isInteger(arm.constraintViolations) && arm.constraintViolations >= 0);
      assert.ok(Number.isInteger(arm.invalidProposals) && arm.invalidProposals >= 0);
      assert.ok(Number.isInteger(arm.throughputMicro) && arm.throughputMicro >= 0);
      assert.ok(Number.isInteger(arm.p95WallClockMicro) && arm.p95WallClockMicro > 0);
    }
  }
});

test("the exact-oracle arm's regret is 0 in every family and no arm beats it (regret >= 0: exactness by enumeration)", () => {
  const report = runVerticalCut();
  assert.equal(report.oracleArm, "exact-oracle");
  for (const block of report.families) {
    const oracle = block.arms.find(arm => arm.armId === "exact-oracle")!;
    assert.equal(oracle.regretMicro, 0, block.family);
    for (const arm of block.arms) assert.ok((arm.regretMicro as number) >= 0, `${block.family}/${arm.armId} regret ${String(arm.regretMicro)} >= 0`);
  }
  const landing = report.families.find(block => block.family === "landing-queue")!;
  const fifo = landing.arms.find(arm => arm.armId === "fifo")!;
  assert.ok((fifo.regretMicro as number) > 0, "fifo starves once the head moves, so it never completes within the cap and carries positive regret");
});

test("provenance pins the instances, the regret definition, the oracle witnesses and the learned arm's configuration", () => {
  const report = runVerticalCut();
  assert.deepEqual(report.provenance.instances, VERTICAL_CUT_INSTANCES);
  assert.equal(report.provenance.regretDefinition, VERTICAL_CUT_REGRET_DEFINITION);
  assert.ok(VERTICAL_CUT_REGRET_DEFINITION.includes("minimal step count"), "the regret definition is fixed before the run (C034)");
  assert.equal(report.provenance.wallClockMicroPerStep, 1000, "deterministic injected clock, never a read one");
  assert.equal(report.provenance.oracle.dag.steps, 3, "found minimum equals the ceil(5 tasks / 2 workers) lower bound: exact at this instance");
  assert.match(report.provenance.oracle.landing.script, /^[01]+$/, "landing oracle witness is a two-action script");
  assert.equal(report.provenance.oracle.landing.steps, report.provenance.oracle.landing.script.length);
  assert.equal(report.provenance.learnedArm.mechanism, "graph-policy-host");
  assert.equal(report.provenance.learnedArm.landing.graphPolicy, "configured");
  assert.equal(report.provenance.learnedArm.dag.graphPolicy, "configured");
});

test("invalid instances and an impossible cap are refused with VERTICAL_CUT_INVALID, never a silent report", () => {
  assert.throws(() => runVerticalCut({ landing: { seed: 7, candidates: 4, lanes: 1, stepsCap: 0 }, dag: { seed: 7, stepsCap: 8 } }), /VERTICAL_CUT_INVALID/, "stepsCap 0");
  assert.throws(() => runVerticalCut({ landing: { seed: 7, candidates: 4, lanes: 1, stepsCap: 1 }, dag: { seed: 7, stepsCap: 8 } }), /VERTICAL_CUT_INVALID: no landing script completes/, "4 candidates cannot land in 1 step");
  assert.throws(() => runVerticalCut({ landing: { seed: -1, candidates: 4, lanes: 1, stepsCap: 12 }, dag: { seed: 7, stepsCap: 8 } }), /VERTICAL_CUT_INVALID/, "negative seed");
});

// MechanicalWorkflows-tmcd: six laws the byte-identity test alone leaves unpinned (mutants v1, v2, v5, v7, v8, v11
// of the 06-aup receipt). Pins 1 to 3 hold with the committed fixture; pins 4 and 5 hold even after a fixture
// regeneration from a mutant, because they name explicit numbers and a relation instead of reading the fixture.
const OK_LANDING = { seed: 7, candidates: 4, lanes: 1, stepsCap: 12 };
const OK_DAG = { seed: 7, stepsCap: 8 };

test("a negative dag seed is refused as VERTICAL_CUT_INVALID: dag.seed, never a later fixture-run error", () => {
  assert.throws(() => runVerticalCut({ landing: OK_LANDING, dag: { seed: -1, stepsCap: 8 } }), /VERTICAL_CUT_INVALID: dag\.seed/);
});

test("zero landing candidates and zero landing lanes are each refused by name, never a silent report", () => {
  assert.throws(() => runVerticalCut({ landing: { ...OK_LANDING, candidates: 0 }, dag: OK_DAG }), /VERTICAL_CUT_INVALID: landing\.candidates/);
  assert.throws(() => runVerticalCut({ landing: { ...OK_LANDING, lanes: 0 }, dag: OK_DAG }), /VERTICAL_CUT_INVALID: landing\.lanes/);
});

test("a dag stepsCap below the ceil(5/2)=3 bound is refused: no task-priority order completes the DAG", () => {
  assert.throws(() => runVerticalCut({ landing: OK_LANDING, dag: { seed: 7, stepsCap: 2 } }), /VERTICAL_CUT_INVALID: no task-priority order completes the DAG/);
});

test("per-arm landing steps are pinned as explicit numbers: oracle 8, fifo 12, gp-scorer 9, restack 11 (micro steps)", () => {
  const landing = runVerticalCut().families.find(block => block.family === "landing-queue")!;
  const steps = Object.fromEntries(landing.arms.map(arm => [arm.armId, arm.meanStepsMicro]));
  assert.deepEqual(steps, { "exact-oracle": 8000000, "fifo": 12000000, "gp-scorer": 9000000, "restack": 11000000 });
});

test("the learned arm is evaluated, not its fallback: gp-scorer completes the landing family in fewer steps than fifo", () => {
  const landing = runVerticalCut().families.find(block => block.family === "landing-queue")!;
  const gp = landing.arms.find(arm => arm.armId === "gp-scorer")!;
  const fifo = landing.arms.find(arm => arm.armId === "fifo")!;
  assert.ok((gp.meanStepsMicro as number) < (fifo.meanStepsMicro as number), "gp-scorer must differ from, and beat, its fifo fallback");
  assert.ok((gp.regretMicro as number) < (fifo.regretMicro as number), "regret falls with the learned arm");
});
