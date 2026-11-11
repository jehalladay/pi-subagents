import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// The committed 2026-10-21 replay report (docs/16 "Replay experiment") keeps the invariants the experiment claims:
// selection on the train split only, one evaluation per context per probabilistic arm, the recency probe tracking the
// newest-first host rule on both splits, theta0 below uniform on test, and a promotion record that changed no live config.
const here = dirname(fileURLToPath(import.meta.url));
const evidence = (name: string) => JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence", name), "utf8")) as Record<string, unknown>;
interface Arm { arm: string; train: { n: number; top1: number; mrr: number; meanLogLikelihood: number | null }; test: { n: number; top1: number; mrr: number; meanLogLikelihood: number | null } }

test("the replay report selected on train log-likelihood only, evaluated every context once per probabilistic arm and binds to gp's program identity", () => {
  const report = evidence("2026-10-21-gp-replay-report.json") as { schema: string; program: string; contexts: { total: number; train: number; test: number }; selection: { best: string; probes: number; perturbations: number }; arms: Arm[]; gp: { evaluations: number } };
  assert.equal(report.schema, "mw.graph-policy-replay-report.v1");
  assert.equal(report.contexts.total, report.contexts.train + report.contexts.test);
  const probabilistic = report.arms.filter(a => a.train.meanLogLikelihood !== null);
  assert.equal(probabilistic.length, 1 + report.selection.probes + report.selection.perturbations);
  assert.equal(report.gp.evaluations, report.contexts.total * probabilistic.length);
  const bestByTrain = [...probabilistic].sort((a, b) => (b.train.meanLogLikelihood ?? -Infinity) - (a.train.meanLogLikelihood ?? -Infinity))[0]!;
  assert.equal(report.selection.best, bestByTrain.arm);
  const bestByTest = [...probabilistic].sort((a, b) => b.test.top1 - a.test.top1)[0]!;
  assert.notEqual(report.selection.best, bestByTest.arm, "the test split did not pick the winner");
  assert.equal(report.program, "graphpolicy.program.c1:170a6b3937949a12a12037972e3ea9044e9fd818f9f69b8a6df7401fd8b6761f");
  for (const arm of report.arms) { assert.equal(arm.train.n, report.contexts.train); assert.equal(arm.test.n, report.contexts.test); }
});

test("the recency probe tracks the newest-first host rule on both splits, theta0 sits below uniform on test, and baselines carry no log-likelihood", () => {
  const report = evidence("2026-10-21-gp-replay-report.json") as { arms: Arm[] };
  const arm = (name: string): Arm => { const found = report.arms.find(a => a.arm === name); assert.ok(found, name); return found!; };
  const newest = arm("baseline:newest-first"); const probe = arm("theta-unit3-"); const theta0 = arm("theta0"); const uniform = arm("baseline:uniform");
  assert.ok(Math.abs(newest.train.top1 - probe.train.top1) < 0.03 && Math.abs(newest.test.top1 - probe.test.top1) < 0.01);
  assert.ok(newest.test.top1 > 0.2 && newest.train.top1 > 0.6);
  assert.ok(theta0.test.top1 <= uniform.test.top1 && (theta0.test.meanLogLikelihood ?? 0) < (uniform.test.meanLogLikelihood ?? 0));
  for (const baseline of report.arms.filter(a => a.arm.startsWith("baseline:"))) { assert.equal(baseline.train.meanLogLikelihood, null); assert.equal(baseline.test.meanLogLikelihood, null); }
  const best = arm("theta-seed2032");
  assert.ok((best.test.meanLogLikelihood ?? -Infinity) > (theta0.test.meanLogLikelihood ?? 0), "the selected theta improves imitation log-likelihood over theta0 on test");
  assert.ok(best.test.top1 < newest.test.top1, "no learned arm beat the newest-first rule on held-out data");
});

test("the promotion record identifies the candidate through gp, aliases it outside the live config and says so", () => {
  const promotion = evidence("2026-10-21-gp-replay-promotion.json") as { schema: string; live_config_changed: boolean; candidate: { arm: string; checkpoint: string; program_digest: string }; alias_store: { aliases: Record<string, { checkpoint: string; revision: string }> } };
  assert.equal(promotion.schema, "mw.graph-policy-replay-promotion.v1"); assert.equal(promotion.live_config_changed, false);
  assert.equal(promotion.candidate.arm, "theta-seed2032"); assert.match(promotion.candidate.checkpoint, /^graphpolicy\.checkpoint\.c1:[0-9a-f]{64}$/);
  assert.equal(promotion.candidate.program_digest, "170a6b3937949a12a12037972e3ea9044e9fd818f9f69b8a6df7401fd8b6761f");
  assert.deepEqual(Object.keys(promotion.alias_store.aliases), ["bead-scorer-replay-candidate"]);
  assert.equal(promotion.alias_store.aliases["bead-scorer-replay-candidate"]?.checkpoint, promotion.candidate.checkpoint);
  const config = JSON.parse(readFileSync(join(here, "../graph-policy/bead-scorer-v1/config.json"), "utf8")) as { checkpoint: string };
  assert.notEqual(config.checkpoint, promotion.candidate.checkpoint, "the live config still names theta0");
});
