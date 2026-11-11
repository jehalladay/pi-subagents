import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  D0_BASELINE,
  D0_PROGRAM_PIN,
  checkBaselineInventory,
  type ObservedInventory,
  type DecisionEnvironment,
  type MicroPolicyDecisionReceipt,
} from "../dist/index.js";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/** Compile-time pins: the five environment literals must be exactly the DecisionEnvironment union, and the receipt shape must be the installed API subset. */
const ENVIRONMENTS: readonly DecisionEnvironment[] = ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"];
const sampleReceipt: MicroPolicyDecisionReceipt = {
  schema: "micropolicy.decision-receipt.v1",
  decisionId: "d-1",
  backend: "direct",
  programDigest: "prog",
  checkpointDigest: "ckpt",
  selection: {
    choices: [{ action: "hold", eligible: true, probability: "3fe0000000000000" }],
    action: "hold",
    rng: { algorithm: "pcg", seed: 1, draw: 0 },
    probability: "3fe0000000000000",
    logProbability: "bfe62e42fefa39ef",
  },
};

const observedFromRepo = (): ObservedInventory => ({
  sourcePaths: [...D0_BASELINE.sourceInventory].filter((p) => existsSync(path.join(repoRoot, p))),
  fixtureEnvironments: [...ENVIRONMENTS],
  receiptSchema: sampleReceipt.schema,
  receiptFields: {
    receipt: Object.keys(sampleReceipt),
    selection: Object.keys(sampleReceipt.selection),
    choice: Object.keys(sampleReceipt.selection.choices[0]!),
    rng: Object.keys(sampleReceipt.selection.rng!),
  },
});

test("the D0 pin names the program revision, the six derivation sources and the three neighbor owners", () => {
  assert.equal(D0_PROGRAM_PIN, "19ca8d48");
  assert.equal(D0_BASELINE.programPin, "19ca8d48");
  assert.equal(D0_BASELINE.sourceInventory.length, 6);
  assert.deepEqual([...D0_BASELINE.neighborOwners], ["MicroPolicyCli", "ReactiveQuerySDK", "FiberOpticsResearch"]);
  assert.ok(Object.isFrozen(D0_BASELINE) && Object.isFrozen(D0_BASELINE.receiptFields));
});

test("the real repository matches the D0 pin: sources exist, environments and receipt fields are exact", () => {
  const r = checkBaselineInventory(observedFromRepo());
  assert.deepEqual(r.refusals, []);
  assert.equal(r.ok, true);
  assert.equal(r.programPin, "19ca8d48");
  assert.deepEqual([...D0_BASELINE.fixtureEnvironments], [...ENVIRONMENTS]);
});

test("negative: a missing pinned source refuses by path", () => {
  const observed = observedFromRepo();
  const r = checkBaselineInventory({ ...observed, sourcePaths: observed.sourcePaths.filter((p) => !p.endsWith("resolver.ts")) });
  assert.equal(r.ok, false);
  assert.ok(r.refusals.some((x) => x.code === "BASELINE_SOURCE_MISSING" && x.subject === "packages/coordination/src/resolver.ts"));
  const missing = r.refusals.find((x) => x.code === "BASELINE_SOURCE_MISSING");
  assert.ok(missing !== undefined && missing.detail.includes("packages/coordination/src/resolver.ts") && missing.detail.includes("absent"), "the refusal detail names the missing path and says it is absent");
});

test("negative: a renamed, dropped or added fixture environment is drift in either direction", () => {
  const observed = observedFromRepo();
  const dropped = checkBaselineInventory({ ...observed, fixtureEnvironments: observed.fixtureEnvironments.filter((e) => e !== "quorum-evidence") });
  assert.ok(dropped.refusals.some((x) => x.code === "BASELINE_ENVIRONMENT_DRIFT" && x.subject === "quorum-evidence"));
  const added = checkBaselineInventory({ ...observed, fixtureEnvironments: [...observed.fixtureEnvironments, "elastic-lanes"] });
  assert.ok(added.refusals.some((x) => x.code === "BASELINE_ENVIRONMENT_DRIFT" && x.subject === "elastic-lanes"));
});

test("negative: a receipt schema or field drift refuses by group and field", () => {
  const observed = observedFromRepo();
  const schema = checkBaselineInventory({ ...observed, receiptSchema: "micropolicy.decision-receipt.v2" });
  assert.ok(schema.refusals.some((x) => x.code === "BASELINE_RECEIPT_SCHEMA_DRIFT"));
  const drift = schema.refusals.find((x) => x.code === "BASELINE_RECEIPT_SCHEMA_DRIFT");
  assert.equal(drift?.subject, "micropolicy.decision-receipt.v2", "the subject is the observed schema, not the pinned one");
  assert.ok(drift !== undefined && drift.detail.includes("micropolicy.decision-receipt.v2") && drift.detail.includes("micropolicy.decision-receipt.v1"), "the detail names both the observed and the pinned schema");
  const dropped = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, selection: observed.receiptFields.selection.filter((f) => f !== "logProbability") } });
  assert.ok(dropped.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "selection.logProbability"));
  const added = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, receipt: [...observed.receiptFields.receipt, "rawScores"] } });
  assert.ok(added.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "receipt.rawScores"));
});

test("negative: choice and rng receipt-field drift refuses by group and field, so all four groups are pinned", () => {
  const observed = observedFromRepo();
  const choiceDropped = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, choice: observed.receiptFields.choice.filter((f) => f !== "eligible") } });
  assert.ok(choiceDropped.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "choice.eligible"));
  const choiceAdded = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, choice: [...observed.receiptFields.choice, "weight"] } });
  assert.ok(choiceAdded.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "choice.weight"));
  const rngDropped = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, rng: observed.receiptFields.rng.filter((f) => f !== "draw") } });
  assert.ok(rngDropped.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "rng.draw"));
  const rngAdded = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, rng: [...observed.receiptFields.rng, "stream"] } });
  assert.ok(rngAdded.refusals.some((x) => x.code === "BASELINE_RECEIPT_FIELD_DRIFT" && x.subject === "rng.stream"));
});

test("negative: environment, receipt-schema and receipt-field drift each flip ok to false on their own", () => {
  const observed = observedFromRepo();
  const env = checkBaselineInventory({ ...observed, fixtureEnvironments: observed.fixtureEnvironments.filter((e) => e !== "quorum-evidence") });
  assert.equal(env.ok, false);
  assert.deepEqual(env.refusals.map((x) => x.code), ["BASELINE_ENVIRONMENT_DRIFT"]);
  const schema = checkBaselineInventory({ ...observed, receiptSchema: "micropolicy.decision-receipt.v2" });
  assert.equal(schema.ok, false);
  assert.deepEqual(schema.refusals.map((x) => x.code), ["BASELINE_RECEIPT_SCHEMA_DRIFT"]);
  const field = checkBaselineInventory({ ...observed, receiptFields: { ...observed.receiptFields, selection: observed.receiptFields.selection.filter((f) => f !== "logProbability") } });
  assert.equal(field.ok, false);
  assert.deepEqual(field.refusals.map((x) => x.code), ["BASELINE_RECEIPT_FIELD_DRIFT"]);
});

test("the pin and the check carry their schema literals, downstream D1-D3 records key on them", () => {
  assert.equal(D0_BASELINE.schema, "mw.d0-baseline.v0");
  assert.equal(checkBaselineInventory(observedFromRepo()).schema, "mw.d0-baseline-check.v0");
});

test("the inner pinned arrays are frozen, so a runtime push cannot change what the check demands", () => {
  assert.ok(Object.isFrozen(D0_BASELINE.sourceInventory));
  assert.ok(Object.isFrozen(D0_BASELINE.neighborOwners));
  assert.ok(Object.isFrozen(D0_BASELINE.fixtureEnvironments));
  for (const group of ["receipt", "selection", "choice", "rng"] as const) assert.ok(Object.isFrozen(D0_BASELINE.receiptFields[group]), group);
});

test("the six derivation sources are pinned by name, not only by count", () => {
  assert.deepEqual([...D0_BASELINE.sourceInventory], [
    "packages/coordination/src/contracts.ts",
    "packages/coordination/src/combinators.ts",
    "packages/coordination/src/resolver.ts",
    "packages/coordination/src/episode.ts",
    "packages/coordination/src/training-export.ts",
    "packages/coordination/src/elastic-landing.ts",
  ]);
});
