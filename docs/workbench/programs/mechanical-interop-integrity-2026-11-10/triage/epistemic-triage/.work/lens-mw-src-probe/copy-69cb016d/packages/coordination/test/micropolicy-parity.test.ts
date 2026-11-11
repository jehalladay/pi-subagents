// MechanicalWorkflows-3l61.2 (APO-005 remainder, fixture grade): the in-process (direct) and
// precomputed (injected) MicroPolicy decision modes agree on the same basis, and a replay of a
// direct-mode receipt as an injected value reproduces the identical intent and resolution.
// The oracle is canonicalJson from the package index. This slice claims no MicroPolicy backend
// ran: every receipt is a fixture value, and the adapter stays edge code with no MP import.
// Refusal semantics are APO-EAT-R011 (iakc) and the vendored vocabulary is 8w9j; both stay
// pinned by micropolicy-adapter.test.ts and micropolicy-contract.test.ts, which this file
// does not edit.
import test from "node:test";
import assert from "node:assert/strict";
import { adaptMicroPolicyDecision, canonicalJson, reconcile } from "../dist/index.js";
import type { Basis, Budget, MicroPolicyAdapterOutcome, MicroPolicyDecisionReceipt, Resolution, ResolverInput } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws", revision: "r1" };
const budget: Budget = { compute: 3, workers: 3, queue: 3, latencyMs: 100 };
const PIN = "sha256:" + "c".repeat(64);
const OTHER_PIN = "sha256:" + "d".repeat(64);

const f64 = (n: number): string => { const b = Buffer.alloc(8); b.writeDoubleBE(n); return b.toString("hex"); };
const makeReceipt = (over: Partial<MicroPolicyDecisionReceipt> = {}, selectionOver: Partial<MicroPolicyDecisionReceipt["selection"]> = {}): MicroPolicyDecisionReceipt => ({
  schema: "micropolicy.decision-receipt.v1",
  decisionId: "decision:11:0",
  backend: "reference",
  programDigest: "sha256:" + "b".repeat(64),
  checkpointDigest: PIN,
  selection: {
    choices: [
      { action: "restack", probability: f64(0.7), eligible: true },
      { action: "pause", probability: f64(0.2), eligible: true },
      { action: "forbidden", probability: f64(0.1), eligible: false },
    ],
    action: "restack",
    rng: { algorithm: "fmix32-mp1", seed: 11, draw: 5 },
    probability: f64(0.7),
    logProbability: f64(-0.356),
    ...selectionOver,
  },
  ...over,
});

type Mode = "injected" | "direct";
interface Calls { reconcile: number; sample: number }

// One input per mode over the SAME receipt value R. The injected mode carries a spy sampler
// that must stay uncalled; the direct mode withholds the receipt and samples R once.
function run(mode: Mode, receipt: MicroPolicyDecisionReceipt, liveRevision: string = basis.revision, capabilityDigest: string = PIN): { outcome: MicroPolicyAdapterOutcome; calls: Calls } {
  const calls: Calls = { reconcile: 0, sample: 0 };
  const spyReconcile = (input: ResolverInput): Resolution => {
    calls.reconcile += 1;
    return reconcile({ ...input, basis: { workspaceId: basis.workspaceId, revision: liveRevision } });
  };
  const sampleDecision = (): MicroPolicyDecisionReceipt => { calls.sample += 1; return receipt; };
  const outcome = adaptMicroPolicyDecision({
    basis, budget, protectedScopes: [],
    policyId: "mp-parity",
    pinnedCheckpoint: PIN,
    capability: { checkpointDigest: capabilityDigest },
    ...(mode === "injected" ? { receipt } : {}),
    sampleDecision,
    action: (choiceId: string) => ({
      target: { kind: "artifact" as const, uri: `candidate:${choiceId}` },
      effect: `landing.${choiceId}`,
      claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
      evidenceRefs: [`mp:receipt:${choiceId}`],
      writeScopes: [`artifact:candidate:${choiceId}`],
      readScopes: [],
    }),
    reconcile: spyReconcile,
  });
  return { outcome, calls };
}

function proposed(outcome: MicroPolicyAdapterOutcome): Extract<MicroPolicyAdapterOutcome, { kind: "proposed" }> {
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("unreachable");
  return outcome;
}

test("A1 mode parity: one receipt through the injected and the direct mode gives one intent, one resolution and one receipt", () => {
  const R = makeReceipt();
  const injected = run("injected", R);
  const direct = run("direct", R);
  const a = proposed(injected.outcome);
  const b = proposed(direct.outcome);
  assert.deepEqual(a.intent, b.intent, "intentId and expectedRevision included");
  assert.equal(a.intent.intentId, "mp-parity:mp:decision:11:0:restack");
  assert.equal(a.intent.expectedRevision, basis.revision);
  assert.equal(b.intent.expectedRevision, basis.revision);
  assert.equal(canonicalJson(a.resolution), canonicalJson(b.resolution));
  assert.equal(canonicalJson(a.receipt), canonicalJson(b.receipt));
  assert.equal(a.resolution.admitted.length, 1);
  assert.equal(injected.calls.reconcile, 1);
  assert.equal(direct.calls.reconcile, 1);
});

test("A2 replay parity: a direct-mode receipt injected at the same basis reproduces the intent and resolution without resampling", () => {
  const R = makeReceipt();
  const first = run("direct", R);
  const once = proposed(first.outcome);
  assert.equal(first.calls.sample, 1, "direct mode samples exactly once");
  const replay = run("injected", once.receipt);
  const again = proposed(replay.outcome);
  assert.equal(canonicalJson(again.intent), canonicalJson(once.intent));
  assert.equal(canonicalJson(again.resolution), canonicalJson(once.resolution));
  assert.equal(replay.calls.sample, 0, "a replay never resamples");
  assert.equal(replay.calls.reconcile, 1);
  assert.equal(first.calls.reconcile, 1);
});

test("A3 stale replay: with the live revision moved to r2 both modes propose and reconcile rejects INTENT_BASIS_STALE with the same intentId", () => {
  const R = makeReceipt();
  const injected = run("injected", R, "r2");
  const direct = run("direct", R, "r2");
  const a = proposed(injected.outcome);
  const b = proposed(direct.outcome);
  for (const p of [a, b]) {
    assert.equal(p.resolution.admitted.length, 0);
    assert.equal(p.resolution.rejected[0]!.code, "INTENT_BASIS_STALE");
  }
  assert.equal(a.intent.intentId, b.intent.intentId);
  assert.equal(injected.calls.sample, 0);
  assert.equal(direct.calls.sample, 1);
});

test("A4 receipt immutability: neither mode mutates the receipt, and the outcome returns the very value it consumed", () => {
  for (const mode of ["injected", "direct"] as const) {
    const R = makeReceipt();
    const before = canonicalJson(R);
    const { outcome } = run(mode, R);
    const p = proposed(outcome);
    assert.equal(canonicalJson(R), before, `${mode}: receipt bytes unchanged`);
    assert.equal(p.receipt, R, `${mode}: same reference returned, not a copy`);
  }
});

test("A5 refusal parity: out-of-support, checkpoint mismatch and structurally invalid receipts refuse with the same code in both modes and never reach reconcile", () => {
  const fixtures: ReadonlyArray<{ name: string; receipt: MicroPolicyDecisionReceipt; code: string }> = [
    { name: "selected action outside the eligible support", receipt: makeReceipt({}, { action: "forbidden" }), code: "ADAPTER_CHOICE_NOT_IN_SUPPORT" },
    { name: "action never offered", receipt: makeReceipt({}, { action: "never-offered" }), code: "ADAPTER_CHOICE_NOT_IN_SUPPORT" },
    { name: "receipt checkpoint differs from the pin", receipt: makeReceipt({ checkpointDigest: OTHER_PIN }), code: "ADAPTER_CHECKPOINT_MISMATCH" },
    { name: "empty action support", receipt: makeReceipt({}, { choices: [] }), code: "ADAPTER_RECEIPT_INVALID" },
    { name: "malformed probability word", receipt: makeReceipt({}, { logProbability: "xyz" }), code: "ADAPTER_RECEIPT_INVALID" },
  ];
  for (const f of fixtures) {
    const injected = run("injected", f.receipt);
    const direct = run("direct", f.receipt);
    for (const [mode, r] of [["injected", injected], ["direct", direct]] as const) {
      assert.equal(r.outcome.kind, "refused", `${f.name} (${mode})`);
      assert.equal(r.outcome.kind === "refused" && r.outcome.code, f.code, `${f.name} (${mode})`);
      assert.equal(r.calls.reconcile, 0, `${f.name} (${mode}): reconcile never invoked`);
    }
  }
});

test("A5 refusal parity (capability): a capability checkpoint mismatch refuses in both modes before the sampler or reconcile runs", () => {
  const R = makeReceipt();
  for (const mode of ["injected", "direct"] as const) {
    const { outcome, calls } = run(mode, R, basis.revision, OTHER_PIN);
    assert.equal(outcome.kind === "refused" && outcome.code, "ADAPTER_CHECKPOINT_MISMATCH", mode);
    assert.equal(calls.sample, 0, `${mode}: no sampling after a capability mismatch`);
    assert.equal(calls.reconcile, 0);
  }
});
