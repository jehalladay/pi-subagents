// MechanicalWorkflows-iakc (APO-EAT-R011): the MicroPolicy adapter refuses an out-of-support
// sampled action (ADAPTER_CHOICE_NOT_IN_SUPPORT) and a checkpoint mismatch
// (ADAPTER_CHECKPOINT_MISMATCH) BEFORE reconcile is invoked and WITHOUT resampling; an
// in-support action yields exactly one propose-only Intent at the pinned basis revision.
// The adapter is edge code: MW core imports no MicroPolicy package; the receipt is a value.
import test from "node:test";
import assert from "node:assert/strict";
import { adaptMicroPolicyDecision, reconcile } from "../dist/index.js";
import type { Basis, Budget, MicroPolicyDecisionReceipt, ResolverInput, Resolution } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws", revision: "r1" };
const budget: Budget = { compute: 3, workers: 3, queue: 3, latencyMs: 100 };
const PIN = "sha256:" + "c".repeat(64);

const f64 = (n: number): string => { const b = Buffer.alloc(8); b.writeDoubleBE(n); return b.toString("hex"); };
const receipt = (over: Partial<MicroPolicyDecisionReceipt> = {}, selectionOver: Partial<MicroPolicyDecisionReceipt["selection"]> = {}): MicroPolicyDecisionReceipt => ({
  schema: "micropolicy.decision-receipt.v1",
  decisionId: "decision:7:0",
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
    rng: { algorithm: "fmix32-mp1", seed: 7, draw: 42 },
    probability: f64(0.7),
    logProbability: f64(-0.356),
    ...selectionOver,
  },
  ...over,
});

function harness(over: Partial<Parameters<typeof adaptMicroPolicyDecision>[0]> = {}) {
  const calls = { reconcile: 0, sample: 0 };
  const spyReconcile = (input: ResolverInput): Resolution => { calls.reconcile += 1; return reconcile(input); };
  const spySample = (): MicroPolicyDecisionReceipt => { calls.sample += 1; return receipt(); };
  const input = {
    basis, budget, protectedScopes: [] as string[],
    policyId: "mp-adapter",
    pinnedCheckpoint: PIN,
    capability: { checkpointDigest: PIN },
    receipt: receipt(),
    sampleDecision: spySample,
    action: (choiceId: string) => ({
      target: { kind: "artifact" as const, uri: `candidate:${choiceId}` },
      effect: `landing.${choiceId}`,
      claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
      evidenceRefs: [`mp:receipt:${choiceId}`],
      writeScopes: [`artifact:candidate:${choiceId}`],
      readScopes: [],
    }),
    reconcile: spyReconcile,
    ...over,
  };
  return { input, calls };
}

test("a sampled action outside the recorded support is refused and reconcile is never invoked", () => {
  const { input, calls } = harness({ receipt: receipt({}, { action: "forbidden" }) });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.equal(outcome.code, "ADAPTER_CHOICE_NOT_IN_SUPPORT");
  assert.equal(calls.reconcile, 0);
  const unknown = adaptMicroPolicyDecision(harness({ receipt: receipt({}, { action: "never-offered" }) }).input);
  assert.equal(unknown.kind === "refused" && unknown.code, "ADAPTER_CHOICE_NOT_IN_SUPPORT");
});

test("an in-support action yields exactly one propose-only Intent at the pinned basis revision, and reconcile admits it", () => {
  const { input, calls } = harness();
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.equal(outcome.intent.expectedRevision, basis.revision);
  assert.notEqual(outcome.intent.authority, "authorized-effect");
  assert.equal(outcome.intent.authority, undefined, "absent authority means propose-only");
  assert.equal(outcome.intent.effect, "landing.restack");
  assert.deepEqual(outcome.intent.target, { kind: "artifact", uri: "candidate:restack" });
  assert.equal(calls.reconcile, 1);
  assert.equal(outcome.resolution.admitted.length, 1);
  assert.equal(outcome.resolution.admitted[0]!.intentId, outcome.intent.intentId);
  assert.equal(calls.sample, 0, "an injected receipt is used as the decision; no resample");
});

test("a receipt checkpoint that differs from the pinned checkpoint refuses without resampling", () => {
  const { input, calls } = harness({ receipt: receipt({ checkpointDigest: "sha256:" + "d".repeat(64) }) });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.equal(outcome.code, "ADAPTER_CHECKPOINT_MISMATCH");
  assert.equal(calls.sample, 0, "a checkpoint mismatch is a refusal, never a silent resample");
  assert.equal(calls.reconcile, 0);
});

test("a capability checkpoint mismatch refuses before any sampling happens (direct mode)", () => {
  const { input, calls } = harness({ receipt: undefined, capability: { checkpointDigest: "sha256:" + "e".repeat(64) } });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind === "refused" && outcome.code, "ADAPTER_CHECKPOINT_MISMATCH");
  assert.equal(calls.sample, 0);
  assert.equal(calls.reconcile, 0);
});

test("direct mode samples once through the provided function and proposes the sampled choice", () => {
  const { input, calls } = harness({ receipt: undefined });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  assert.equal(calls.sample, 1);
  assert.equal(calls.reconcile, 1);
});

test("a structurally invalid receipt is refused as ADAPTER_RECEIPT_INVALID before support or reconcile", () => {
  const bad = [
    receipt({ schema: "other.schema.v1" as never }),
    receipt({}, { choices: [] }),
    receipt({}, { action: "  " }),
    receipt({}, { choices: [{ action: "restack", probability: "not-a-word", eligible: true }] }),
    receipt({}, { logProbability: "xyz" }),
    receipt({ decisionId: " " }),
    // MechanicalWorkflows-4usd S1: duplicate choice actions are one ambiguous support entry.
    receipt({}, { choices: [
      { action: "restack", probability: f64(0.5), eligible: true },
      { action: "restack", probability: f64(0.2), eligible: true },
      { action: "pause", probability: f64(0.3), eligible: true },
    ] }),
    // S2: a blank choice action, even when that choice is ineligible and unselected.
    receipt({}, { choices: [
      { action: "restack", probability: f64(0.7), eligible: true },
      { action: "pause", probability: f64(0.2), eligible: true },
      { action: "  ", eligible: false },
    ] }),
    // S3: the FP64 word is exactly 16 hex (end anchor): 18 hex is malformed.
    receipt({}, { logProbability: f64(-0.356) + "ff" }),
    // S4: v1 $defs.f64 is ^[0-9a-f]{16}$, so upper-case hex is malformed.
    receipt({}, { logProbability: f64(-0.356).toUpperCase() }),
    // S5: the selection probability word is checked like the choice and log-probability words.
    receipt({}, { probability: "zz" }),
  ];
  for (const b of bad) {
    const { input, calls } = harness({ receipt: b });
    const outcome = adaptMicroPolicyDecision(input);
    assert.equal(outcome.kind === "refused" && outcome.code, "ADAPTER_RECEIPT_INVALID", JSON.stringify(b.selection.choices));
    assert.equal(calls.reconcile, 0);
  }
});

test("a sampled receipt at a foreign checkpoint refuses once, never resamples and never reaches reconcile (direct mode)", () => {
  // MechanicalWorkflows-4usd S6: the capability matches the pin, only the sampled receipt differs.
  const { input, calls } = harness({
    receipt: undefined,
    sampleDecision: () => { calls.sample += 1; return receipt({ checkpointDigest: "sha256:" + "d".repeat(64) }); },
  });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind === "refused" && outcome.code, "ADAPTER_CHECKPOINT_MISMATCH");
  assert.equal(calls.sample, 1, "the sampler is called exactly once; a mismatch is not retried");
  assert.equal(calls.reconcile, 0);
});

test("the intentId carries the decisionId, so two decisions differing only in decisionId propose distinct intents", () => {
  // MechanicalWorkflows-4usd S7.
  const first = adaptMicroPolicyDecision(harness({ receipt: receipt({ decisionId: "decision:7:0" }) }).input);
  const second = adaptMicroPolicyDecision(harness({ receipt: receipt({ decisionId: "decision:7:1" }) }).input);
  assert.equal(first.kind, "proposed");
  assert.equal(second.kind, "proposed");
  if (first.kind !== "proposed" || second.kind !== "proposed") return;
  assert.notEqual(first.intent.intentId, second.intent.intentId);
  assert.ok(first.intent.intentId.includes("decision:7:0"), first.intent.intentId);
  assert.ok(second.intent.intentId.includes("decision:7:1"), second.intent.intentId);
});

test("a receipt whose choices omit the optional probability is proposed (v1 choice.required is action and eligible)", () => {
  // MechanicalWorkflows-4usd S8.
  const bare = receipt({}, { choices: [
    { action: "restack", eligible: true },
    { action: "pause", eligible: true },
  ] });
  const { input, calls } = harness({ receipt: bare });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  assert.equal(calls.reconcile, 1);
});

test("neither an injected receipt nor a sampler is a refusal of its own, before reconcile", () => {
  const { input, calls } = harness({ receipt: undefined, sampleDecision: undefined });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind === "refused" && outcome.code, "ADAPTER_SAMPLER_ABSENT");
  assert.equal(calls.reconcile, 0);
});

test("the proposed intent is stale-rejected by reconcile when the live basis moved, proving expectedRevision binds", () => {
  const { input } = harness();
  const outcome = adaptMicroPolicyDecision({ ...input, reconcile: (resolverInput: ResolverInput) => reconcile({ ...resolverInput, basis: { workspaceId: "ws", revision: "r2" } }) });
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.equal(outcome.resolution.admitted.length, 0);
  assert.equal(outcome.resolution.rejected[0]!.code, "INTENT_BASIS_STALE");
});

// MechanicalWorkflows-56r5 (iakc follow-up, test-only): pin the intent body the adapter builds and the
// arguments it hands reconcile. A recording reconcile stub makes each argument directly assertable.
type Spec = ReturnType<ReturnType<typeof harness>["input"]["action"]>;
function recording(over: Partial<Parameters<typeof adaptMicroPolicyDecision>[0]> = {}) {
  const seen: ResolverInput[] = [];
  const h = harness({
    reconcile: (resolverInput: ResolverInput): Resolution => { seen.push(resolverInput); return reconcile(resolverInput); },
    ...over,
  });
  return { ...h, seen };
}
const specOver = (over: Partial<Spec>) => (choiceId: string): Spec => ({
  target: { kind: "artifact", uri: `candidate:${choiceId}` },
  effect: `landing.${choiceId}`,
  claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
  evidenceRefs: [`mp:receipt:${choiceId}`],
  writeScopes: [`artifact:candidate:${choiceId}`],
  readScopes: [],
  ...over,
});

test("56r5 S1: reconcile receives the caller's protectedScopes and rejects a protected write scope", () => {
  const protectedScopes = ["artifact:candidate:restack"];
  const { input, seen } = recording({ protectedScopes });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.equal(seen.length, 1);
  assert.deepEqual(seen[0]!.protectedScopes, protectedScopes);
  assert.equal(outcome.resolution.admitted.length, 0);
  assert.equal(outcome.resolution.rejected[0]!.code, "INTENT_SCOPE_PROTECTED");
});

test("56r5 S2: reconcile receives the caller's budget and rejects a claim above it", () => {
  const tight: Budget = { compute: 0, workers: 3, queue: 3, latencyMs: 100 };
  const { input, seen } = recording({ budget: tight });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.deepEqual(seen[0]!.budget, tight);
  assert.equal(outcome.resolution.admitted.length, 0);
  assert.equal(outcome.resolution.rejected[0]!.code, "INTENT_BUDGET_EXCEEDED");
});

test("56r5 S3: the intent carries the spec's evidenceRefs", () => {
  const evidenceRefs = ["mp:receipt:restack", "mp:extra:evidence"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ evidenceRefs }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.deepEqual(outcome.intent.evidenceRefs, evidenceRefs);
});

test("56r5 S4: the intent carries the spec's readScopes", () => {
  const readScopes = ["artifact:reads:alpha", "artifact:reads:beta"];
  const { input, seen } = recording({ action: specOver({ readScopes }) });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.deepEqual(outcome.intent.readScopes, readScopes);
  assert.deepEqual(seen[0]!.proposals[0]!.intents[0]!.readScopes, readScopes);
});

test("56r5 S5: the intent carries the spec's writeScopes", () => {
  const writeScopes = ["artifact:writes:alpha", "artifact:writes:beta"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ writeScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.deepEqual(outcome.intent.writeScopes, writeScopes);
});

test("56r5 S6: the intent's claim equals the spec's claim, not zero", () => {
  const claim = { compute: 2, workers: 1, queue: 3, latencyMs: 40 };
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ claim }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.deepEqual(outcome.intent.claim, claim);
  assert.deepEqual(outcome.resolution.budgetUsed, claim, "the claim is what reconcile accounts against the budget");
});

test("56r5 S7: the proposal handed to reconcile carries exactly one intent and no duplicate surfaces", () => {
  const { input, seen } = recording();
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.equal(seen[0]!.proposals.length, 1);
  assert.equal(seen[0]!.proposals[0]!.intents.length, 1);
  assert.deepEqual(outcome.resolution.rejected.map(r => r.code), []);
  assert.equal(outcome.resolution.admitted.length, 1);
});

test("56r5 S8: the intent's policyId and the intentId prefix equal the caller's policyId", () => {
  const { input, seen } = recording({ policyId: "caller-policy-9" });
  const outcome = adaptMicroPolicyDecision(input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  assert.equal(outcome.intent.policyId, "caller-policy-9");
  assert.ok(outcome.intent.intentId.startsWith("caller-policy-9:mp:"), outcome.intent.intentId);
  assert.equal(seen[0]!.proposals[0]!.intents[0]!.policyId, "caller-policy-9");
});

// MechanicalWorkflows-h6hc (x1gc follow-up): the action's claim and target objects stay the caller's. A write to
// either one after the call must never reach the built Intent, mirroring graph-policy-adapter toIntent (x1gc).
const aliasFixture = () => {
  const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
  const target = { kind: "artifact" as const, uri: "candidate:restack" };
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ claim, target }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  return { claim, target, outcome };
};

test("h6hc WM1: a post-call write to the action's claim never reaches the built Intent", () => {
  const { claim, outcome } = aliasFixture();
  claim.compute = 9;
  assert.deepEqual(outcome.intent.claim, { compute: 1, workers: 1, queue: 1, latencyMs: 1 });
  assert.notEqual(outcome.intent.claim, claim, "the Intent owns its own claim object");
});

test("h6hc WM2: a post-call write to the action's target never reaches the built Intent", () => {
  const { target, outcome } = aliasFixture();
  target.uri = "candidate:late";
  assert.equal(outcome.intent.target.uri, "candidate:restack");
  assert.notEqual(outcome.intent.target, target, "the Intent owns its own target object");
});

test("h6hc WM4: after a post-call claim write the returned Intent still reconciles and is admitted", () => {
  const { claim, outcome } = aliasFixture();
  assert.equal(outcome.resolution.admitted.length, 1, "the in-call resolution admitted the intent");
  claim.compute = 9;
  const again = reconcile({ basis, budget, protectedScopes: [], proposals: [{ intents: [outcome.intent], memory: null, trace: [] }] });
  assert.deepEqual(again.rejected.map(r => r.code), []);
  assert.deepEqual(again.admitted.map(a => a.intentId), [outcome.intent.intentId]);
});

test("h6hc WM3 (control): a post-call push onto the action's evidenceRefs never reaches the built Intent", () => {
  const evidenceRefs = ["mp:receipt:restack"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ evidenceRefs }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") return;
  evidenceRefs.push("mp:late");
  assert.deepEqual(outcome.intent.evidenceRefs, ["mp:receipt:restack"]);
});

// MechanicalWorkflows-n4n0 (h6hc follow-up): the action's writeScopes and readScopes arrays stay the caller's. A push
// onto either one after the call must never reach the built Intent (K4/K5), beside the WM3 evidenceRefs control.
test("n4n0 W1: a post-call push onto the action's writeScopes never reaches the built Intent", () => {
  const writeScopes = ["artifact:candidate:restack"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ writeScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  writeScopes.push("artifact:late");
  assert.deepEqual(outcome.intent.writeScopes, ["artifact:candidate:restack"]);
});

test("n4n0 W2: a post-call push onto the action's readScopes never reaches the built Intent", () => {
  const readScopes = ["artifact:reads:alpha"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ readScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  readScopes.push("artifact:late");
  assert.deepEqual(outcome.intent.readScopes, ["artifact:reads:alpha"]);
});

test("n4n0 W3: after a post-call push of a protected scope onto the action's writeScopes the returned Intent still reconciles and is admitted", () => {
  const writeScopes = ["artifact:candidate:restack"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ writeScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  assert.equal(outcome.resolution.admitted.length, 1, "the in-call resolution admitted the intent");
  writeScopes.push("artifact:protected");
  const again = reconcile({ basis, budget, protectedScopes: ["artifact:protected"], proposals: [{ intents: [outcome.intent], memory: null, trace: [] }] });
  assert.deepEqual(again.rejected.map(r => r.code), []);
  assert.deepEqual(again.admitted.map(a => a.intentId), [outcome.intent.intentId]);
});

// MechanicalWorkflows-6zaf (n4n0 follow-up): the resolution side of the built Intent. outcome.resolution.admitted[0]
// carries the Intent that reconcile admitted; W1/W2 pin the scope copies on outcome.intent only, so a shallow copy
// handed to reconcile (M1/M2) or a value-equal copy (M3) stays green. These rows read the admitted side directly.
test("6zaf Y1: a post-call push onto the action's writeScopes never reaches the Intent the resolution admitted", () => {
  const writeScopes = ["artifact:candidate:restack"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ writeScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  assert.equal(outcome.resolution.admitted.length, 1, "the in-call resolution admitted the intent");
  writeScopes.push("artifact:late");
  assert.deepEqual(outcome.resolution.admitted[0]!.writeScopes, ["artifact:candidate:restack"]);
});

test("6zaf Y2: a post-call push onto the action's readScopes never reaches the Intent the resolution admitted", () => {
  const readScopes = ["artifact:reads:alpha"];
  const outcome = adaptMicroPolicyDecision(recording({ action: specOver({ readScopes }) }).input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  assert.equal(outcome.resolution.admitted.length, 1, "the in-call resolution admitted the intent");
  readScopes.push("artifact:late");
  assert.deepEqual(outcome.resolution.admitted[0]!.readScopes, ["artifact:reads:alpha"]);
});

test("6zaf Y3: the Intent the resolution admitted is the very object outcome.intent returns", () => {
  const outcome = adaptMicroPolicyDecision(recording().input);
  assert.equal(outcome.kind, "proposed");
  if (outcome.kind !== "proposed") throw new Error("expected a proposed outcome");
  assert.equal(outcome.resolution.admitted.length, 1, "the in-call resolution admitted the intent");
  assert.equal(outcome.resolution.admitted[0], outcome.intent, "one built Intent, reachable from outcome.intent and from the resolution");
});
