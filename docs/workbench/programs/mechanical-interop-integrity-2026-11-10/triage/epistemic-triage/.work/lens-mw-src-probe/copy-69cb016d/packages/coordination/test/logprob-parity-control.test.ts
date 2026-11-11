import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, canonicalJson, digest, exportEpisodeForTraining, labelTrainingMode, trainingBytes } from "../dist/index.js";
import type { Episode, EnvironmentEpisode, TrainingExport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const controlName = "synthetic-logprob-control-landing-queue-seed7.json";

/** Hand-picked doubles whose shortest decimal form is not obvious, so a lossy round trip would show. */
const SYNTHETIC_LOG_PROBS: readonly number[] = [-0.1, -0.30000000000000004, -2.302585092994046, -1e-7];

interface ControlEnvelope {
  readonly schema: "mw.synthetic-logprob-control.v1";
  readonly provenance: { readonly logProb: string; readonly native: boolean; readonly producer: string; readonly reason: string; readonly revisit: string; readonly sourceFixture: string };
  readonly export: TrainingExport;
}

const syntheticLogProb = (index: number): number => SYNTHETIC_LOG_PROBS[index % SYNTHETIC_LOG_PROBS.length]!;

/** The control: the pinned landing-queue episode with a synthetic numeric log probability on every decision, exported for training. */
function buildControl(): ControlEnvelope {
  const source = JSON.parse(readFileSync(join(fixtureDir, "landing-queue-seed7.json"), "utf8")) as EnvironmentEpisode;
  const base: Episode = toEpisode(source);
  const synthetic: Episode = { ...base, decisions: base.decisions.map((decision, index) => ({ ...decision, logProb: syntheticLogProb(index) })) };
  return {
    schema: "mw.synthetic-logprob-control.v1",
    provenance: {
      logProb: "synthetic", native: false,
      producer: "hand-authored positive control in packages/coordination/test/logprob-parity-control.test.ts",
      reason: "no native producer emits a known logProb at HEAD: every native logProb is the literal unknown",
      revisit: "relabel this control when a native producer lands",
      sourceFixture: "landing-queue-seed7.json",
    },
    export: exportEpisodeForTraining(synthetic),
  };
}

/** True only when every numeric logProb in the envelope sits beside provenance that reads synthetic and not native. */
function labelsKnownLogProbAsSynthetic(envelope: ControlEnvelope): boolean {
  const hasKnown = envelope.export.steps.some(step => typeof step.logProb === "number");
  return !hasKnown || (envelope.provenance.logProb === "synthetic" && envelope.provenance.native === false);
}

const readControl = (): { readonly raw: string; readonly parsed: ControlEnvelope } => {
  const raw = readFileSync(join(fixtureDir, controlName), "utf8");
  return { raw, parsed: JSON.parse(raw) as ControlEnvelope };
};

test("the committed synthetic control equals its regeneration byte for byte, in canonical form", () => {
  const { raw } = readControl();
  assert.equal(raw, canonicalJson(buildControl()) + "\n");
  assert.equal(canonicalJson(JSON.parse(raw)), raw.trimEnd());
});

test("the synthetic control round trip preserves every numeric logProb exactly and keeps the export digest valid", () => {
  const { parsed } = readControl();
  assert.ok(parsed.export.steps.length >= SYNTHETIC_LOG_PROBS.length, "the control covers every distinct synthetic value");
  parsed.export.steps.forEach((step, index) => {
    assert.equal(typeof step.logProb, "number", `step ${index}`);
    assert.ok(Object.is(step.logProb, syntheticLogProb(index)), `step ${index} keeps ${syntheticLogProb(index)} bit for bit`);
  });
  const { digest: recorded, ...body } = parsed.export;
  assert.equal(recorded, digest(body));
  assert.equal(trainingBytes(parsed.export), canonicalJson(parsed.export) + "\n");
  assert.equal(canonicalJson(JSON.parse(trainingBytes(parsed.export))), canonicalJson(parsed.export));
});

test("the control's provenance metadata reads synthetic, never native, and its export stays labelled fixture", () => {
  const { parsed } = readControl();
  assert.equal(parsed.schema, "mw.synthetic-logprob-control.v1");
  assert.equal(parsed.provenance.logProb, "synthetic");
  assert.equal(parsed.provenance.native, false);
  assert.match(parsed.provenance.reason, /no native producer/);
  assert.equal(parsed.export.mode, "fixture");
  for (const upgrade of ["replay", "live"]) {
    assert.throws(() => labelTrainingMode(parsed.export, upgrade), /EPISODE_MODE_UPGRADE_FORBIDDEN/, upgrade);
  }
  assert.equal(labelsKnownLogProbAsSynthetic(parsed), true);
});

test("negative control: a numeric logProb whose provenance drops or changes the synthetic label is not accepted as labelled", () => {
  const { parsed } = readControl();
  const withProvenance = (patch: Partial<ControlEnvelope["provenance"]>): ControlEnvelope => ({ ...parsed, provenance: { ...parsed.provenance, ...patch } });
  assert.equal(labelsKnownLogProbAsSynthetic(withProvenance({ logProb: "native" })), false);
  assert.equal(labelsKnownLogProbAsSynthetic(withProvenance({ logProb: "" })), false);
  assert.equal(labelsKnownLogProbAsSynthetic(withProvenance({ native: true })), false);
});

test("native training-*.json fixtures keep the literal unknown, and among {training-*.json, the control} only the control carries a known logProb", () => {
  const trainingFixtures = readdirSync(fixtureDir).filter(name => name.startsWith("training-"));
  assert.ok(trainingFixtures.length >= 1);
  for (const name of trainingFixtures) {
    const exported = JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as TrainingExport;
    for (const step of exported.steps) assert.equal(step.logProb, "unknown", name);
  }
  // The set is scoped on purpose: decision and refusal fixtures from sibling lanes (coordination-decision-refusals.json) may carry a numeric logProb without touching this law.
  const scope = [...trainingFixtures, controlName].sort();
  const known = scope.filter(name => /"logProb": ?-?\d/.test(readFileSync(join(fixtureDir, name), "utf8")));
  assert.deepEqual(known, [controlName]);
});
