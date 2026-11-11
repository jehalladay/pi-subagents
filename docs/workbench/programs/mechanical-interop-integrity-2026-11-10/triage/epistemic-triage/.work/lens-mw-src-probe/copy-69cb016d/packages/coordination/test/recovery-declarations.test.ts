import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, stepContractOf, validateRecoveryDeclarations } from "../dist/index.js";
import type { Basis, Intent, PolicyContext, StepContract } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws-1", revision: "rev-7" };

const context: PolicyContext = {
  episodeId: "ep-1",
  actorId: "actor-1",
  observationDigest: "sha256:obs-1",
  budget: { compute: 4, workers: 2, queue: 8, latencyMs: 1000 },
  authority: "propose-only",
  policyRevision: "fifo-rev-3",
  seed: 1,
};

function intent(overrides: Partial<Intent> & { intentId: string }): Intent {
  return {
    policyId: "fifo",
    target: { kind: "candidate", uri: "cand:a" },
    expectedRevision: basis.revision,
    effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 10 },
    evidenceRefs: ["sha256:receipt-1"],
    writeScopes: ["main"],
    readScopes: ["queue"],
    ...overrides,
  };
}

function step(intentId: string, retryContract?: string, overrides: Partial<Intent> = {}): StepContract {
  return stepContractOf(intent({ intentId, ...overrides }), context, retryContract === undefined ? {} : { retryContract });
}

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("the explicit unknown retry is admissible: the checkpoint is the step's input pin and retry is left to the native host", () => {
  const result = validateRecoveryDeclarations({ steps: [step("ep-1:a")] });
  assert.equal(result.schema, "mw.recovery-declarations.v0");
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.steps, [
    { intentId: "ep-1:a", checkpoint: { observationDigest: "sha256:obs-1", expectedRevision: "rev-7" }, retry: UNKNOWN, onUncertain: "indeterminate" },
  ]);
});

test("a named native retry contract reference is carried verbatim and never rewritten into a claim", () => {
  const result = validateRecoveryDeclarations({ steps: [step("ep-1:a", "furnace:work-retry"), step("ep-1:b", "furnace:run-resume")] });
  assert.equal(result.ok, true);
  assert.deepEqual(result.steps.map(s => s.retry), ["furnace:work-retry", "furnace:run-resume"]);
  assert.deepEqual(result.steps.map(s => s.onUncertain), ["indeterminate", "indeterminate"]);
});

test("a self-declared idempotency or retry claim is refused by name, whatever its casing", () => {
  const claims = ["idempotent", "Retryable", "safe-to-retry", "at-most-once", "AT-LEAST-ONCE", "exactly-once", "redispatch", "auto-retry"];
  const result = validateRecoveryDeclarations({ steps: claims.map((claim, index) => step(`ep-1:s${index}`, claim)) });
  assert.equal(result.ok, false);
  assert.equal(result.refusals.length, claims.length);
  for (const refusal of result.refusals) {
    assert.equal(refusal.code, "STEP_RETRY_SELF_DECLARED");
    assert.match(refusal.detail, /no producer at HEAD exposes an effect-idempotency contract/);
  }
  assert.deepEqual(result.refusals.map(r => r.intentId), claims.map((_, index) => `ep-1:s${index}`));
  assert.deepEqual(result.steps, []);
});

test("a reference must name a producer and a contract; a bare word, an empty half or a claim word behind a producer is refused", () => {
  const bad = [":work-retry", "furnace:", "work-retry", "effect:idempotent", "furnace:Idempotent", "Furnace:work-retry", "furnace:work retry"];
  const result = validateRecoveryDeclarations({ steps: bad.map((ref, index) => step(`ep-1:r${index}`, ref)) });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => r.code), bad.map(() => "STEP_RETRY_SELF_DECLARED"));
  assert.match(result.refusals[3]!.detail, /effect:idempotent/);
  const good = validateRecoveryDeclarations({ steps: [step("ep-1:g", "furnace:run-resume--continue"), step("ep-1:h", "beads:claim-retry.v1")] });
  assert.equal(good.ok, true);
});

test("a step without a pinned input has no checkpoint to resume from and is refused", () => {
  const noDigest = stepContractOf(intent({ intentId: "ep-1:nd" }), { ...context, observationDigest: "" });
  const noRevision = step("ep-1:nr", undefined, { expectedRevision: "" });
  const result = validateRecoveryDeclarations({ steps: [noDigest, noRevision, step("ep-1:ok")] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId]), [["STEP_CHECKPOINT_UNPINNED", "ep-1:nd"], ["STEP_CHECKPOINT_UNPINNED", "ep-1:nr"]]);
  assert.deepEqual(result.steps.map(s => s.intentId), ["ep-1:ok"]);
});

test("no declaration changes what happens on an uncertain outcome: every step is indeterminate, nothing re-dispatches", () => {
  const steps = [step("ep-1:a"), step("ep-1:b", "furnace:work-retry"), step("ep-1:c", "forge:gate-rerun")];
  const result = validateRecoveryDeclarations({ steps });
  assert.ok(result.steps.every(s => s.onUncertain === "indeterminate"));
  for (const entry of result.steps) assert.deepEqual(Object.keys(entry).sort(), ["checkpoint", "intentId", "onUncertain", "retry"]);
  assert.ok(!JSON.stringify(result).includes("redispatch"));
  assert.ok(!("retryPolicy" in result) && !("redispatch" in result));
});

test("the validation is deterministic, pure and mints no identifier", () => {
  const steps = [step("ep-1:c", "beads:claim-retry.v1"), step("ep-1:a"), step("ep-1:b", "idempotent")];
  const before = JSON.stringify(steps);
  const forward = validateRecoveryDeclarations({ steps });
  const backward = validateRecoveryDeclarations({ steps: [...steps].reverse() });
  assert.equal(JSON.stringify(steps), before);
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
  assert.deepEqual(forward.steps.map(s => s.intentId), ["ep-1:a", "ep-1:c"]);
  assert.deepEqual(forward.refusals.map(r => r.intentId), ["ep-1:b"]);
  const known = new Set([...stringLeaves(steps), forward.schema, "indeterminate", UNKNOWN]);
  for (const leaf of stringLeaves(forward.steps)) assert.ok(known.has(leaf), `minted identifier ${leaf}`);
  for (const refusal of forward.refusals) assert.ok(known.has(refusal.intentId));
});

test("a contract half must be lowercase: a non-claim uppercase contract is refused as naming no contract, a lowercase one stays admitted", () => {
  const result = validateRecoveryDeclarations({ steps: [step("ep-1:u", "furnace:Work-Retry")] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId]), [["STEP_RETRY_SELF_DECLARED", "ep-1:u"]]);
  assert.match(result.refusals[0]!.detail, /names no contract after the colon/);
  assert.deepEqual(result.steps, []);
  const control = validateRecoveryDeclarations({ steps: [step("ep-1:l", "furnace:work-retry")] });
  assert.equal(control.ok, true);
  assert.deepEqual(control.steps.map(s => s.retry), ["furnace:work-retry"]);
});

test("a claim word in the producer half is refused as asserting a property, a neutral contract behind a producer stays admitted", () => {
  const producerHalf = ["idempotent:v1", "retry:work-v1"];
  const result = validateRecoveryDeclarations({ steps: producerHalf.map((ref, index) => step(`ep-1:p${index}`, ref)) });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId]), [["STEP_RETRY_SELF_DECLARED", "ep-1:p0"], ["STEP_RETRY_SELF_DECLARED", "ep-1:p1"]]);
  for (const refusal of result.refusals) assert.match(refusal.detail, /asserts a property instead of naming a native contract/);
  assert.deepEqual(result.steps, []);
  const control = validateRecoveryDeclarations({ steps: [step("ep-1:c", "furnace:v1")] });
  assert.equal(control.ok, true);
});

test("refusals arrive sorted by code, then intent id, whatever the input order", () => {
  const unpinned = stepContractOf(intent({ intentId: "ep-1:z-unpinned" }), { ...context, observationDigest: "" });
  const two = [step("ep-1:z", "idempotent"), step("ep-1:a", "retryable")];
  const forward = validateRecoveryDeclarations({ steps: two });
  const backward = validateRecoveryDeclarations({ steps: [...two].reverse() });
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
  assert.deepEqual(forward.refusals.map(r => r.intentId), ["ep-1:a", "ep-1:z"]);
  const mixed = validateRecoveryDeclarations({ steps: [step("ep-1:a-claim", "idempotent"), unpinned] });
  assert.deepEqual(mixed.refusals.map(r => [r.code, r.intentId]), [["STEP_CHECKPOINT_UNPINNED", "ep-1:z-unpinned"], ["STEP_RETRY_SELF_DECLARED", "ep-1:a-claim"]]);
  const single = validateRecoveryDeclarations({ steps: [step("ep-1:only", "idempotent")] });
  assert.deepEqual(single.refusals.map(r => r.intentId), ["ep-1:only"]);
});

test("every one of the twelve claim words is refused behind a producer, and a neutral contract stays admitted", () => {
  const words = ["idempotent", "idempotency", "retryable", "retry", "safe", "safe-to-retry", "at-most-once", "at-least-once", "exactly-once", "redispatch", "re-dispatch", "auto-retry"];
  assert.equal(words.length, 12);
  const result = validateRecoveryDeclarations({ steps: words.map((word, index) => step(`ep-1:w${String(index).padStart(2, "0")}`, `effect:${word}`)) });
  assert.equal(result.ok, false);
  assert.equal(result.refusals.length, 12);
  for (const refusal of result.refusals) {
    assert.equal(refusal.code, "STEP_RETRY_SELF_DECLARED");
    assert.match(refusal.detail, /asserts a property instead of naming a native contract/);
  }
  assert.deepEqual(result.steps, []);
  const control = validateRecoveryDeclarations({ steps: [step("ep-1:v", "effect:v1")] });
  assert.equal(control.ok, true);
});

test("a producer half must begin with a lowercase letter: a digit or hyphen lead is refused as naming no producer, a letter lead with digits inside stays admitted", () => {
  const leads = ["9forge:gate", "-forge:gate"];
  const result = validateRecoveryDeclarations({ steps: leads.map((ref, index) => step(`ep-1:d${index}`, ref)) });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId]), [["STEP_RETRY_SELF_DECLARED", "ep-1:d0"], ["STEP_RETRY_SELF_DECLARED", "ep-1:d1"]]);
  for (const refusal of result.refusals) assert.match(refusal.detail, /names no producer before the colon/);
  assert.deepEqual(result.steps, []);
  const control = validateRecoveryDeclarations({ steps: [step("ep-1:c", "forge9:gate")] });
  assert.equal(control.ok, true);
  assert.deepEqual(control.steps.map(s => s.retry), ["forge9:gate"]);
});
