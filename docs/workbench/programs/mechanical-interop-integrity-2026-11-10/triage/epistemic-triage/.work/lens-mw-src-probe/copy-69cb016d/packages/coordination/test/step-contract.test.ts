import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, reconcile, stepContractOf } from "../dist/index.js";
import type { Basis, Intent, PolicyContext, StepContract } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws-1", revision: "rev-7" };

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

const context: PolicyContext = {
  episodeId: "ep-1",
  actorId: "actor-1",
  observationDigest: "sha256:obs-1",
  budget: { compute: 4, workers: 2, queue: 8, latencyMs: 1000 },
  authority: "propose-only",
  policyRevision: "fifo-rev-3",
  seed: 1,
};

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("the contract reuses native identifiers byte-identical and mints no new authoritative id", () => {
  const given = intent({ intentId: "ep-1:cand:a" });
  const contract = stepContractOf(given, context, { verifier: "forge-gate:sha256:gate-1", retryContract: "furnace:run-resume" });
  assert.equal(contract.schema, "mw.step-contract.v0");
  assert.deepEqual(contract.step, { intentId: "ep-1:cand:a", policyId: "fifo", policyRevision: "fifo-rev-3" });
  assert.deepEqual(contract.output, { target: { kind: "candidate", uri: "cand:a" }, effect: "land" });
  assert.deepEqual(contract.evidenceRefs, ["sha256:receipt-1"]);
  const allowed = new Set([...stringLeaves(given), ...stringLeaves(context), "forge-gate:sha256:gate-1", "furnace:run-resume", "mw.step-contract.v0", "propose-only", UNKNOWN]);
  for (const leaf of stringLeaves(contract)) assert.ok(allowed.has(leaf), `minted string ${leaf}`);
});

test("authority is propose-only: an absent or propose-only intent authority derives propose-only, and authorized-effect is refused exactly where the resolver refuses it", () => {
  assert.equal(stepContractOf(intent({ intentId: "i1" }), context).authority, "propose-only");
  assert.equal(stepContractOf(intent({ intentId: "i2", authority: "propose-only" }), context).authority, "propose-only");
  const overreach = intent({ intentId: "i3", authority: "authorized-effect" });
  assert.throws(() => stepContractOf(overreach, context), /STEP_CONTRACT_AUTHORITY_EXCEEDED/);
  const resolution = reconcile({ basis, budget: context.budget, protectedScopes: [], proposals: [{ intents: [overreach], memory: null, trace: [] }] });
  assert.deepEqual(resolution.rejected.map(rejection => rejection.code), ["INTENT_AUTHORITY_EXCEEDED"]);
});

test("retry/idempotency and the verifier are the explicit unknown when no native contract is supplied, and pass through when one is", () => {
  const bare = stepContractOf(intent({ intentId: "i1" }), context);
  assert.equal(bare.retry, UNKNOWN);
  assert.equal(bare.verifier, UNKNOWN);
  for (const leaf of stringLeaves(bare)) assert.equal(/idempot|retr/i.test(leaf), false, `defaulted retry vocabulary: ${leaf}`);
  const supplied = stepContractOf(intent({ intentId: "i1" }), context, { verifier: "forge-gate:sha256:gate-1", retryContract: "furnace:run-resume" });
  assert.equal(supplied.retry, "furnace:run-resume");
  assert.equal(supplied.verifier, "forge-gate:sha256:gate-1");
});

test("effect scope derives from the intent's declared scopes, copied and never widened or aliased", () => {
  const given = intent({ intentId: "i1", writeScopes: ["main", "board"], readScopes: ["queue"] });
  const contract = stepContractOf(given, context);
  assert.deepEqual(contract.effectScope, { write: ["main", "board"], read: ["queue"] });
  assert.notEqual(contract.effectScope.write, given.writeScopes);
  assert.notEqual(contract.effectScope.read, given.readScopes);
  const empty = stepContractOf(intent({ intentId: "i2", writeScopes: [], readScopes: [] }), context);
  assert.deepEqual(empty.effectScope, { write: [], read: [] });
});

test("typed I/O binds the input to the observation digest and the expected revision, and the output to the target and effect", () => {
  const given = intent({ intentId: "i1" });
  const first = stepContractOf(given, context);
  assert.deepEqual(first.input, { observationDigest: "sha256:obs-1", expectedRevision: "rev-7" });
  const second = stepContractOf(given, { ...context, observationDigest: "sha256:obs-2" });
  assert.equal(second.input.observationDigest, "sha256:obs-2");
  assert.deepEqual({ ...second, input: first.input }, first);
  const stale = stepContractOf(intent({ intentId: "i1", expectedRevision: "rev-6" }), context);
  assert.equal(stale.input.expectedRevision, "rev-6");
});

test("derivation is pure: identical inputs derive deep-equal contracts and neither the intent nor the context is mutated", () => {
  const given = intent({ intentId: "i1" });
  const before = JSON.stringify([given, context]);
  const once: StepContract = stepContractOf(given, context);
  const twice: StepContract = stepContractOf(given, context);
  assert.deepEqual(once, twice);
  assert.equal(JSON.stringify([given, context]), before);
});

test("authority parity with the resolver: bogus, null, empty and PROPOSE-ONLY authority are refused by the derivation exactly where reconcile rejects them", () => {
  for (const authority of ["bogus", null, "", "PROPOSE-ONLY"]) {
    const given = { ...intent({ intentId: "parity" }), authority } as unknown as Intent;
    assert.throws(() => stepContractOf(given, context), /STEP_CONTRACT_AUTHORITY_EXCEEDED/, `derivation accepted authority ${JSON.stringify(authority)}`);
    const resolution = reconcile({ basis, budget: context.budget, protectedScopes: [], proposals: [{ intents: [given], memory: null, trace: [] }] });
    assert.deepEqual(resolution.rejected.map(rejection => rejection.code), ["INTENT_AUTHORITY_EXCEEDED"], `reconcile accepted authority ${JSON.stringify(authority)}`);
  }
});

test("evidence references are copied, never aliased: a later push onto the intent's list leaves the derived contract unchanged", () => {
  const given = intent({ intentId: "i1", evidenceRefs: ["sha256:receipt-1"] });
  const contract = stepContractOf(given, context);
  assert.notEqual(contract.evidenceRefs, given.evidenceRefs);
  (given.evidenceRefs as string[]).push("sha256:late");
  assert.deepEqual(contract.evidenceRefs, ["sha256:receipt-1"]);
});

test("the output target projects to exactly kind and uri and is not the intent's own target object", () => {
  const given = intent({ intentId: "i1", target: { kind: "candidate", uri: "cand:a", extra: "leak" } as unknown as Intent["target"] });
  const contract = stepContractOf(given, context);
  assert.notEqual(contract.output.target, given.target);
  assert.deepEqual(Object.keys(contract.output.target).sort(), ["kind", "uri"]);
  assert.deepEqual(contract.output.target, { kind: "candidate", uri: "cand:a" });
});

test("the authority refusal names the intent id and the declared authority", () => {
  const given = intent({ intentId: "ep-9:cand:z", authority: "authorized-effect" });
  assert.throws(() => stepContractOf(given, context), (error: unknown) => {
    const message = (error as Error).message;
    return message.includes("ep-9:cand:z") && message.includes("authorized-effect");
  });
});
