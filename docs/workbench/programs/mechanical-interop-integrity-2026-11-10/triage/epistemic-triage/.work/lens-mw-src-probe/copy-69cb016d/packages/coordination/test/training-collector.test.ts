import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, exportEpisodeForTraining, collectTrainingExamples } from "../dist/index.js";
import type { EnvironmentEpisode, TrainingExport, DecisionSidecar } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const srcDir = join(here, "../src");

const sources = [
  "landing-queue-seed7.json",
  "compaction-inheritance-seed7.json",
  "colony-resilience-seed29.json",
  "artifact-recovery-seed7.json",
  "quorum-evidence-independent-seed7.json",
];

const exportOf = (name: string): TrainingExport =>
  exportEpisodeForTraining(toEpisode(JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as EnvironmentEpisode));

/** A synthetic complete sidecar for every step of an export: support is the step's sampled intents, its admitted set and one padding id (a step may sample nothing, and an empty support is refused), the value is distinct per step. */
const syntheticSidecars = (exported: TrainingExport): DecisionSidecar[] =>
  exported.steps.map(step => ({
    episodeId: exported.episodeId,
    step: step.step,
    preSamplingSupport: [...new Set([...step.sampled, ...step.mask.admitted, "synthetic-pad"])],
    logProb: -0.1 * (step.step + 1) - 1 / 3,
  }));

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}

test("over every current fixture export with no sidecar the collector refuses each step with TRAINING_SUPPORT_UNKNOWN and emits zero examples", () => {
  for (const name of sources) {
    const exported = exportOf(name);
    assert.ok(exported.steps.length > 0, name);
    const result = collectTrainingExamples([exported]);
    assert.deepEqual(result.examples, [], name);
    assert.equal(result.refusals.length, exported.steps.length, name);
    result.refusals.forEach((refusal, index) => {
      assert.equal(refusal.code, "TRAINING_SUPPORT_UNKNOWN", name);
      assert.equal(refusal.episodeId, exported.episodeId, name);
      assert.equal(refusal.step, exported.steps[index]!.step, name);
      assert.deepEqual(refusal.reasons, ["logprob-unknown", "support-absent"], name);
    });
  }
});

test("a numeric step logProb with no sidecar is still refused: the value alone never stands in for the pre-sampling support", () => {
  const exported = exportOf(sources[0]!);
  const withValue: TrainingExport = { ...exported, steps: exported.steps.map(step => ({ ...step, logProb: -0.5 })) };
  const result = collectTrainingExamples([withValue]);
  assert.deepEqual(result.examples, []);
  assert.ok(result.refusals.every(refusal => refusal.code === "TRAINING_SUPPORT_UNKNOWN"));
  assert.ok(result.refusals.every(refusal => refusal.reasons.includes("support-absent") && refusal.reasons.includes("logprob-unknown")));
});

test("over a synthetic complete sidecar the collector emits one example per step whose logProb equals the sidecar value bit for bit", () => {
  for (const name of sources) {
    const exported = exportOf(name);
    const sidecars = syntheticSidecars(exported);
    const result = collectTrainingExamples([exported], sidecars);
    assert.deepEqual(result.refusals, [], name);
    assert.equal(result.examples.length, exported.steps.length, name);
    result.examples.forEach((example, index) => {
      assert.ok(Object.is(example.logProb, sidecars[index]!.logProb), `${name} step ${index} bits`);
      assert.deepEqual(example.preSamplingSupport, sidecars[index]!.preSamplingSupport, name);
      assert.deepEqual(example.sampled, exported.steps[index]!.sampled, name);
      assert.deepEqual(example.support, exported.steps[index]!.support, name);
      assert.equal(example.mode, exported.mode, `${name} keeps the mode label`);
      assert.equal(example.episodeId, exported.episodeId, name);
    });
  }
});

test("an explicit zero log probability in the sidecar passes through as zero and an explicit negative zero keeps its sign", () => {
  const exported = exportOf(sources[0]!);
  const sidecars = syntheticSidecars(exported).map((sidecar, index) => ({ ...sidecar, logProb: index === 0 ? 0 : index === 1 ? -0 : sidecar.logProb }));
  const result = collectTrainingExamples([exported], sidecars);
  assert.ok(Object.is(result.examples[0]!.logProb, 0));
  assert.ok(Object.is(result.examples[1]!.logProb, -0));
});

test("a sidecar whose log probability is not a finite non-positive number is refused as unknown, never coerced", () => {
  const exported = exportOf(sources[0]!);
  const base = syntheticSidecars(exported);
  for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0.5, "unknown", null, undefined, "-0.5"]) {
    const sidecars = base.map((sidecar, index) => (index === 0 ? ({ ...sidecar, logProb: bad } as unknown as DecisionSidecar) : sidecar));
    const result = collectTrainingExamples([exported], sidecars);
    assert.equal(result.examples.length, exported.steps.length - 1, String(bad));
    assert.equal(result.refusals.length, 1, String(bad));
    assert.equal(result.refusals[0]!.code, "TRAINING_SUPPORT_UNKNOWN", String(bad));
    assert.equal(result.refusals[0]!.step, exported.steps[0]!.step, String(bad));
    assert.deepEqual(result.refusals[0]!.reasons, ["logprob-unknown"], String(bad));
  }
});

test("a sidecar with an empty or non-list pre-sampling support is refused with TRAINING_SUPPORT_UNKNOWN and the reason support-absent", () => {
  const exported = exportOf(sources[0]!);
  const base = syntheticSidecars(exported);
  for (const bad of [[], null, undefined, "a", [1], ["ok", 2]]) {
    const sidecars = base.map((sidecar, index) => (index === 0 ? ({ ...sidecar, preSamplingSupport: bad } as unknown as DecisionSidecar) : sidecar));
    const result = collectTrainingExamples([exported], sidecars);
    assert.equal(result.refusals.length, 1, JSON.stringify(bad));
    assert.equal(result.refusals[0]!.code, "TRAINING_SUPPORT_UNKNOWN", JSON.stringify(bad));
    assert.deepEqual(result.refusals[0]!.reasons, ["support-absent"], JSON.stringify(bad));
  }
});

test("a step logProb that disagrees with the sidecar bit for bit is refused with TRAINING_SIDECAR_MISMATCH while an unknown step logProb is accepted", () => {
  const exported = exportOf(sources[0]!);
  const sidecars = syntheticSidecars(exported);
  const agree: TrainingExport = { ...exported, steps: exported.steps.map((step, index) => ({ ...step, logProb: sidecars[index]!.logProb })) };
  assert.deepEqual(collectTrainingExamples([agree], sidecars).refusals, []);
  const disagree: TrainingExport = { ...agree, steps: agree.steps.map((step, index) => (index === 0 ? { ...step, logProb: step.logProb === -0 ? 0 : (step.logProb as number) - 1e-12 } : step)) };
  const result = collectTrainingExamples([disagree], sidecars);
  assert.equal(result.refusals.length, 1);
  assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.deepEqual(result.refusals[0]!.reasons, ["logprob-differs"]);
  assert.equal(result.examples.length, exported.steps.length - 1);
});

test("a sampled intent outside the sidecar pre-sampling support is refused with TRAINING_SIDECAR_MISMATCH", () => {
  const exported = exportOf(sources[0]!);
  const first = exported.steps.find(step => step.sampled.length > 0)!;
  const sidecars = syntheticSidecars(exported).map(sidecar => (sidecar.step === first.step ? { ...sidecar, preSamplingSupport: ["not-a-sampled-intent"] } : sidecar));
  const result = collectTrainingExamples([exported], sidecars);
  assert.equal(result.refusals.length, 1);
  assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(result.refusals[0]!.step, first.step);
  assert.deepEqual(result.refusals[0]!.reasons, ["sampled-outside-support"]);
});

test("two sidecars for one episode and step are refused as ambiguous, never merged or first-wins", () => {
  const exported = exportOf(sources[0]!);
  const sidecars = syntheticSidecars(exported);
  const duplicated = [...sidecars, { ...sidecars[0]!, logProb: -9 }];
  const result = collectTrainingExamples([exported], duplicated);
  assert.equal(result.refusals.length, 1);
  assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(result.refusals[0]!.step, exported.steps[0]!.step);
  assert.deepEqual(result.refusals[0]!.reasons, ["duplicate-sidecar"]);
  assert.equal(result.examples.length, exported.steps.length - 1);
});

test("a sidecar for a different episode never satisfies a step", () => {
  const exported = exportOf(sources[0]!);
  const foreign = syntheticSidecars(exported).map(sidecar => ({ ...sidecar, episodeId: "some-other-episode" }));
  const result = collectTrainingExamples([exported], foreign);
  assert.deepEqual(result.examples, []);
  assert.ok(result.refusals.every(refusal => refusal.code === "TRAINING_SUPPORT_UNKNOWN"));
});

test("the collector is pure: frozen inputs are accepted, results are in input order and two runs give identical bytes", () => {
  const exports = sources.map(exportOf);
  const sidecars = exports.flatMap(syntheticSidecars);
  const frozenExports = deepFreeze(structuredClone(exports));
  const frozenSidecars = deepFreeze(structuredClone(sidecars));
  const a = collectTrainingExamples(frozenExports, frozenSidecars);
  const b = collectTrainingExamples(exports, sidecars);
  assert.equal(JSON.stringify(a), JSON.stringify(b));
  assert.deepEqual(a.examples.map(example => example.episodeId), exports.flatMap(exported => exported.steps.map(() => exported.episodeId)));
});

test("no source file under packages/coordination/src writes a zero log probability literal", () => {
  const offenders: string[] = [];
  for (const file of readdirSync(srcDir).filter(name => name.endsWith(".ts"))) {
    const text = readFileSync(join(srcDir, file), "utf8");
    if (/logProb\s*:\s*-?0(\.0+)?\s*[,}\s]/.test(text)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("every example is the whole twelve-member literal built from its step and its sidecar, with no member read from anywhere else", () => {
  for (const name of sources) {
    const exported = exportOf(name);
    const sidecars = syntheticSidecars(exported);
    const result = collectTrainingExamples([exported], sidecars);
    assert.deepEqual(result.refusals, [], name);
    assert.equal(result.examples.length, exported.steps.length, name);
    exported.steps.forEach((step, index) => {
      const sidecar = sidecars[index]!;
      assert.deepEqual(
        result.examples[index],
        {
          episodeId: exported.episodeId,
          mode: exported.mode,
          step: step.step,
          actorId: step.actorId,
          sampled: step.sampled,
          mask: step.mask,
          support: step.support,
          preSamplingSupport: sidecar.preSamplingSupport,
          logProb: sidecar.logProb,
          checkpoint: step.checkpoint,
          observationDigest: step.observationDigest,
          provenance: step.provenance,
        },
        `${name} step ${index}`,
      );
      assert.equal(Object.keys(result.examples[index]!).length, 12, `${name} step ${index} has exactly twelve members`);
    });
  }
});

test("a replay-labelled and a live-labelled export yield examples carrying that mode, never a fixed fixture label", () => {
  const exported = exportOf(sources[0]!);
  const sidecars = syntheticSidecars(exported);
  for (const mode of ["replay", "live"] as const) {
    const relabelled: TrainingExport = { ...exported, mode };
    const result = collectTrainingExamples([relabelled], sidecars);
    assert.deepEqual(result.refusals, [], mode);
    assert.equal(result.examples.length, exported.steps.length, mode);
    assert.ok(result.examples.every(example => example.mode === mode), mode);
  }
});

test("a step log probability of zero against a sidecar negative zero (and the reverse) is refused logprob-differs, while negative zero against negative zero keeps its sign", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;
  const oneStep = (stepValue: number): TrainingExport => ({ ...exported, steps: [{ ...firstStep, logProb: stepValue }] });
  const withSidecar = (value: number): DecisionSidecar[] => [{ ...firstSidecar, logProb: value }];

  for (const [stepValue, sidecarValue] of [[0, -0], [-0, 0]] as const) {
    const result = collectTrainingExamples([oneStep(stepValue)], withSidecar(sidecarValue));
    assert.deepEqual(result.examples, [], `${stepValue} vs ${sidecarValue}`);
    assert.equal(result.refusals.length, 1, `${stepValue} vs ${sidecarValue}`);
    assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
    assert.deepEqual(result.refusals[0]!.reasons, ["logprob-differs"]);
  }

  const same = collectTrainingExamples([oneStep(-0)], withSidecar(-0));
  assert.deepEqual(same.refusals, []);
  assert.equal(same.examples.length, 1);
  assert.ok(Object.is(same.examples[0]!.logProb, -0));
});

test("a step sampling two intents with only the second outside the pre-sampling support is refused sampled-outside-support", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;
  const twoSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled: ["inside-support", "outside-support"] }] };
  const sidecars: DecisionSidecar[] = [{ ...firstSidecar, preSamplingSupport: ["inside-support", "another-inside"] }];
  const result = collectTrainingExamples([twoSampled], sidecars);
  assert.deepEqual(result.examples, []);
  assert.equal(result.refusals.length, 1);
  assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(result.refusals[0]!.step, firstStep.step);
  assert.deepEqual(result.refusals[0]!.reasons, ["sampled-outside-support"]);

  const allInside = collectTrainingExamples([twoSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-support", "outside-support"] }]);
  assert.deepEqual(allInside.refusals, []);
  assert.equal(allInside.examples.length, 1);
});

test("a step sampling two intents with only the first outside the pre-sampling support is refused sampled-outside-support, and three sampled with only the middle outside likewise (3lbu)", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;

  const twoSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled: ["outside-support", "inside-support"] }] };
  const result = collectTrainingExamples([twoSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-support", "another-inside"] }]);
  assert.deepEqual(result.examples, []);
  assert.equal(result.refusals.length, 1);
  assert.equal(result.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(result.refusals[0]!.step, firstStep.step);
  assert.deepEqual(result.refusals[0]!.reasons, ["sampled-outside-support"]);

  const allInside = collectTrainingExamples([twoSampled], [{ ...firstSidecar, preSamplingSupport: ["outside-support", "inside-support"] }]);
  assert.deepEqual(allInside.refusals, []);
  assert.equal(allInside.examples.length, 1);

  const threeSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled: ["inside-first", "outside-middle", "inside-last"] }] };
  const middle = collectTrainingExamples([threeSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-first", "inside-last", "another-inside"] }]);
  assert.deepEqual(middle.examples, []);
  assert.equal(middle.refusals.length, 1);
  assert.equal(middle.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.deepEqual(middle.refusals[0]!.reasons, ["sampled-outside-support"]);

  const threeInside = collectTrainingExamples([threeSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-first", "outside-middle", "inside-last"] }]);
  assert.deepEqual(threeInside.refusals, []);
  assert.equal(threeInside.examples.length, 1);
});

test("a step sampling three intents with only the last outside the pre-sampling support is refused sampled-outside-support, and the all-inside control is admitted (8f5x)", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;
  const threeSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled: ["inside-first", "inside-second", "outside-last"] }] };

  const last = collectTrainingExamples([threeSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-first", "inside-second", "another-inside"] }]);
  assert.deepEqual(last.examples, []);
  assert.equal(last.refusals.length, 1);
  assert.equal(last.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(last.refusals[0]!.step, firstStep.step);
  assert.deepEqual(last.refusals[0]!.reasons, ["sampled-outside-support"]);

  const allInside = collectTrainingExamples([threeSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-first", "inside-second", "outside-last"] }]);
  assert.deepEqual(allInside.refusals, []);
  assert.equal(allInside.examples.length, 1);
  assert.deepEqual(allInside.examples[0]!.sampled, ["inside-first", "inside-second", "outside-last"]);
});

test("a five-intent step whose single outside intent walks every index is refused sampled-outside-support at each index, and the all-inside control is admitted (8f5x)", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;
  const insideIds = ["inside-a", "inside-b", "inside-c", "inside-d"];
  for (let outsideIndex = 0; outsideIndex < 5; outsideIndex += 1) {
    const sampled = [...insideIds];
    sampled.splice(outsideIndex, 0, "outside-walker");
    assert.equal(sampled.length, 5);
    assert.equal(sampled.indexOf("outside-walker"), outsideIndex);
    const fiveSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled }] };
    const refused = collectTrainingExamples([fiveSampled], [{ ...firstSidecar, preSamplingSupport: [...insideIds, "another-inside"] }]);
    assert.deepEqual(refused.examples, [], `index ${outsideIndex}`);
    assert.equal(refused.refusals.length, 1, `index ${outsideIndex}`);
    assert.equal(refused.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH", `index ${outsideIndex}`);
    assert.deepEqual(refused.refusals[0]!.reasons, ["sampled-outside-support"], `index ${outsideIndex}`);

    const admitted = collectTrainingExamples([fiveSampled], [{ ...firstSidecar, preSamplingSupport: [...sampled, "another-inside"] }]);
    assert.deepEqual(admitted.refusals, [], `index ${outsideIndex}`);
    assert.equal(admitted.examples.length, 1, `index ${outsideIndex}`);
  }
});

test("a five-intent step with two outside intents is refused once with the single sampled-outside-support reason, and the all-inside control is admitted (516y)", () => {
  const exported = exportOf(sources[0]!);
  const firstStep = exported.steps[0]!;
  const firstSidecar = syntheticSidecars(exported)[0]!;
  const sampled = ["inside-a", "outside-b", "inside-c", "outside-d", "inside-e"];
  const fiveSampled: TrainingExport = { ...exported, steps: [{ ...firstStep, sampled }] };

  const refused = collectTrainingExamples([fiveSampled], [{ ...firstSidecar, preSamplingSupport: ["inside-a", "inside-c", "inside-e"] }]);
  assert.deepEqual(refused.examples, []);
  assert.equal(refused.refusals.length, 1);
  assert.equal(refused.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.equal(refused.refusals[0]!.step, firstStep.step);
  assert.deepEqual(refused.refusals[0]!.reasons, ["sampled-outside-support"]);

  const allInside = collectTrainingExamples([fiveSampled], [{ ...firstSidecar, preSamplingSupport: [...sampled, "another-inside"] }]);
  assert.deepEqual(allInside.refusals, []);
  assert.equal(allInside.examples.length, 1);

  const allOutside = collectTrainingExamples([fiveSampled], [{ ...firstSidecar, preSamplingSupport: ["another-inside"] }]);
  assert.deepEqual(allOutside.examples, []);
  assert.equal(allOutside.refusals.length, 1);
  assert.equal(allOutside.refusals[0]!.code, "TRAINING_SIDECAR_MISMATCH");
  assert.deepEqual(allOutside.refusals[0]!.reasons, ["sampled-outside-support"]);
});
