// TW-EAT-R016 (MechanicalWorkflows-8nwv): the C3 comparison runs the deterministic fixed selector against an
// externally supplied learned selector over the same held-out episodes, every selection decision names the
// selector's id and version, and MW ships no in-repo trainer.
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as api from "../dist/index.js";
import {
  evaluate, fixedBaseline, fixedChecked, composedConfiguration, seedParitySelector,
} from "../dist/index.js";
import type { EvaluationInput, EvaluationScenario, EvaluationBudget, LandingObservation, PolicyContext } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const scenario: EvaluationScenario = {
  landing: { candidates: 6, lanes: 1, steps: 14 }, compactionTasks: 8, colony: { workers: 6, compute: 18, steps: 10 },
  recovery: { work: 8, steps: 14 }, quorum: { candidates: 4, reviewers: 3, steps: 12, budget: 20, gate: "authoritative" },
};
const budget: EvaluationBudget = { steps: 14, units: 200 };
const holdOut = [5, 6, 7, 8, 9, 10, 11, 12];

/** A scripted stand-in for a learned selector that MW did not train: a lookup table over seeds, versioned from outside. */
function scriptedLearnedSelector(calls: { seed: number; side: "left" | "right" }[]) {
  const table: Readonly<Record<number, "left" | "right">> = { 5: "left", 6: "right", 7: "right", 8: "left", 9: "left", 10: "right", 11: "right", 12: "left" };
  return {
    id: "external-learned", revision: "2026.10.3",
    select(_observation: never, context: PolicyContext): "left" | "right" {
      const side = table[context.seed] ?? "left";
      calls.push({ seed: context.seed, side });
      return side;
    },
  };
}

const context = (seed: number): PolicyContext => ({ episodeId: "e", actorId: "a", observationDigest: "d", budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, authority: "propose-only", policyRevision: "r", seed });
const observation: LandingObservation = { basis: { workspaceId: "w", revision: "head-1" }, head: "head-1", lanes: 1, ready: [{ id: "c1", base: "head-0", arrival: 0 }] };

test("TW-EAT-R016: an injected external learned selector runs against the deterministic fixed selector on matched held-out episodes and every selection record carries the selector id and version", () => {
  const calls: { seed: number; side: "left" | "right" }[] = [];
  const learned = scriptedLearnedSelector(calls);
  const fixedSelector = seedParitySelector<LandingObservation>();
  const learnedConfig = composedConfiguration("c3-learned", "1", fixedBaseline, fixedChecked, learned);
  const fixedConfig = composedConfiguration("c3-fixed", "1", fixedBaseline, fixedChecked, fixedSelector);
  const input: EvaluationInput = {
    entries: [{ configuration: fixedConfig, budget }, { configuration: learnedConfig, budget }],
    scenario, partition: { train: [1, 2, 3, 4], holdOut }, bootstrap: { seed: 11, resamples: 200 },
  };
  const report = evaluate(input);

  // Matched held-out episodes: both arms score exactly the declared hold-out seeds in every environment.
  const fixedRow = report.configurations.find(c => c.id === "c3-fixed")!;
  const learnedRow = report.configurations.find(c => c.id === "c3-learned")!;
  assert.ok(fixedRow.environments.length > 0);
  for (const [fixedEnv, learnedEnv] of fixedRow.environments.map((env, index) => [env, learnedRow.environments[index]!] as const)) {
    assert.equal(fixedEnv.environment, learnedEnv.environment);
    assert.deepEqual(fixedEnv.seeds, holdOut, `fixed arm scored the hold-out seeds in ${fixedEnv.environment}`);
    assert.deepEqual(learnedEnv.seeds, holdOut, `learned arm scored the same seeds in ${learnedEnv.environment}`);
  }
  assert.ok(calls.length > 0, "the externally supplied selector was consulted by the comparison");
  assert.ok(report.comparisons.some(c => c.reference === "c3-fixed" && c.versus === "c3-learned") || report.comparisons.some(c => c.versus === "c3-fixed" && c.reference === "c3-learned"), "the two selectors are compared pairwise");

  // The report names the external selector by id and revision, never a policy body.
  assert.deepEqual(learnedRow.provenance, { kind: "composition", combinator: "alternative", selector: { id: "external-learned", revision: "2026.10.3" }, parts: [fixedBaseline.configHash, fixedChecked.configHash] });
  assert.deepEqual(fixedRow.provenance, { kind: "composition", combinator: "alternative", selector: { id: "seed-parity", revision: "1" }, parts: [fixedBaseline.configHash, fixedChecked.configHash] });
  assert.notEqual(learnedRow.configHash, fixedRow.configHash, "a different selector version is a different configuration");

  // Every selection decision, one per hold-out seed, is the first trace line and names selector id@revision.
  for (const seed of holdOut) {
    const learnedProposal = learnedConfig.policies.landing.propose(observation, 0, context(seed));
    const fixedProposal = fixedConfig.policies.landing.propose(observation, 0, context(seed));
    assert.equal(learnedProposal.trace[0]!.kind, "alternative-selected");
    assert.match(learnedProposal.trace[0]!.detail, /^(left|right) by external-learned@2026\.10\.3$/, `seed ${seed}`);
    assert.equal(fixedProposal.trace[0]!.detail, `${seed % 2 === 0 ? "left" : "right"} by seed-parity@1`, `seed ${seed}`);
  }
  assert.equal(learnedConfig.policies.landing.revision.endsWith(";external-learned@2026.10.3"), true);
  assert.deepEqual(holdOut.map(seed => calls.filter(call => call.seed === seed).at(-1)!.side), ["left", "right", "right", "left", "left", "right", "right", "left"], "the recorded decisions are the scripted selector's own, not the fixed one's");
  assert.notDeepEqual(holdOut.map(seed => (seed % 2 === 0 ? "left" : "right")), holdOut.map(seed => calls.filter(call => call.seed === seed).at(-1)!.side), "the learned selector disagrees with the fixed parity selector somewhere");

  // A new selector version changes the recorded version in the trace and the configuration hash.
  const bumped = composedConfiguration("c3-learned", "1", fixedBaseline, fixedChecked, { ...scriptedLearnedSelector([]), revision: "2026.10.4" });
  assert.match(bumped.policies.landing.propose(observation, 0, context(5)).trace[0]!.detail, / by external-learned@2026\.10\.4$/);
  assert.notEqual(bumped.configHash, learnedConfig.configHash);
});

test("TW-EAT-R016: the package exports no trainer module or training API (training names are the export, import, partition, collector and pure estimator helpers only)", () => {
  const trainNamed = Object.keys(api).filter(name => /train|fit|learn|optimi[sz]|gradient|backprop/i.test(name)).sort();
  assert.deepEqual(trainNamed, [
    "collectTrainingExamples", "collectTrainingOutcome", "drawTrainingFamily", "estimateScoreFunctionGradient", "exportEpisodeForTraining",
    "exportEpisodesForTraining", "importTrainingExport", "labelTrainingMode", "trainingBytes", "trainingEpisodes",
  ], "only data export, import, partition, example-collector and pure gradient-estimator helpers carry a training name");
  const src = join(here, "../src");
  const files = readdirSync(src).filter(name => /train|fit|learn|optimi[sz]|gradient|backprop/i.test(name)).sort();
  assert.deepEqual(files, ["training-collector.ts", "training-export.ts", "training-import.ts"], "no trainer source file exists beside the collector, export and import modules");
});
