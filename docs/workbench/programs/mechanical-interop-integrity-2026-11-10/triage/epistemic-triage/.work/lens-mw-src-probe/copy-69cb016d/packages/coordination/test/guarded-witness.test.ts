import test from "node:test";
import assert from "node:assert/strict";
import { guardedWithWitness } from "../dist/index.js";
import type { GuardWitness, WitnessedGuard } from "../dist/index.js";
import type { Intent, Policy, PolicyContext, Proposal } from "../dist/index.js";

/** TW combinator law tw-guarded-composition-condition (MechanicalWorkflows-32ad.1): P guarded-by Q
 * requires the guard to carry a valid witness at the pinned basis (the observation digest the policies
 * are evaluated on) and the guard authorizes no effects: it can only gate Q's evaluation and append
 * trace, never mutate, add or re-authorize intents. GuardWitness is structurally distinct from the
 * exit-report liveWitness ({available, reference}). */

const DIGEST = "sha256:feedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedface";

function context(): PolicyContext {
  return {
    episodeId: "ep-1", actorId: "actor-1", observationDigest: DIGEST,
    budget: { compute: 10, workers: 2, queue: 4, latencyMs: 1000 },
    authority: "propose-only", policyRevision: "r1", seed: 7,
  };
}

function intent(id: string, authority?: "propose-only" | "authorized-effect"): Intent {
  return {
    intentId: id, policyId: "p", target: { kind: "bead", uri: "mw://bead/" + id },
    expectedRevision: "rev-1", effect: "comment",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 10 },
    evidenceRefs: ["ev-" + id], writeScopes: ["w/" + id], readScopes: ["r/" + id],
    ...(authority === undefined ? {} : { authority }),
  };
}

function policy(id: string, intents: readonly Intent[], counter?: { calls: number }): Policy<string, Intent, number> {
  return {
    id, revision: "1",
    propose(_observation, memory, _context): Proposal<Intent, number> {
      if (counter) counter.calls += 1;
      return { intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: id }] };
    },
  };
}

function witnessGuard(witness: GuardWitness | null): WitnessedGuard<Intent, number> {
  return { id: "g", revision: "2", witnessOf: () => witness };
}

const valid: GuardWitness = { reference: "receipt://guard/1", observationDigest: DIGEST };

test("a valid witness at the pinned basis admits Q and the trace names the guard and the witness reference", () => {
  const q = policy("q", [intent("iq")]);
  const composed = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(valid), q);
  assert.equal(composed.id, "p?q");
  assert.equal(composed.revision, "p@1;g@2;q@1");
  const out = composed.propose("obs", [0, 0], context());
  assert.deepEqual(out.intents.map(entry => entry.intentId), ["ip", "iq"]);
  assert.deepEqual(out.memory, [1, 1]);
  const accepted = out.trace.find(event => event.kind === "guard-accepted");
  assert.ok(accepted, "guard-accepted trace present");
  assert.ok(accepted.detail.includes("g@2") && accepted.detail.includes("receipt://guard/1"));
});

test("an absent witness rejects: Q is not evaluated, its memory is untouched, the detail says witness-absent", () => {
  const counter = { calls: 0 };
  const q = policy("q", [intent("iq")], counter);
  const composed = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(null), q);
  const out = composed.propose("obs", [0, 5], context());
  assert.equal(counter.calls, 0);
  assert.deepEqual(out.intents.map(entry => entry.intentId), ["ip"]);
  assert.deepEqual(out.memory, [1, 5]);
  const rejected = out.trace.find(event => event.kind === "guard-rejected");
  assert.ok(rejected && rejected.detail.includes("witness-absent"));
});

test("a witness taken at another observation digest is stale and rejects with witness-stale", () => {
  const counter = { calls: 0 };
  const stale: GuardWitness = { reference: "receipt://guard/1", observationDigest: "sha256:" + "0".repeat(64) };
  const composed = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(stale), policy("q", [intent("iq")], counter));
  const out = composed.propose("obs", [0, 0], context());
  assert.equal(counter.calls, 0);
  const rejected = out.trace.find(event => event.kind === "guard-rejected");
  assert.ok(rejected && rejected.detail.includes("witness-stale"));
});

test("a witness without a reference rejects with witness-unreferenced", () => {
  const empty: GuardWitness = { reference: "   ", observationDigest: DIGEST };
  const composed = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(empty), policy("q", [intent("iq")]));
  const out = composed.propose("obs", [0, 0], context());
  const rejected = out.trace.find(event => event.kind === "guard-rejected");
  assert.ok(rejected && rejected.detail.includes("witness-unreferenced"));
});

test("the guard authorizes no effects: every intent passes through byte-identical and none gains authorized-effect", () => {
  const inputs = [intent("ip"), intent("ip2", "propose-only")];
  const qIntents = [intent("iq")];
  const composed = guardedWithWitness(policy("p", inputs), witnessGuard(valid), policy("q", qIntents));
  const out = composed.propose("obs", [0, 0], context());
  assert.deepEqual(out.intents, [...inputs, ...qIntents]);
  assert.ok(out.intents.every(entry => entry.authority !== "authorized-effect"));
});

test("the guard can only gate, never add: accepted length is p+q exactly and rejected is p exactly", () => {
  const composedAccepted = guardedWithWitness(policy("p", [intent("a"), intent("b")]), witnessGuard(valid), policy("q", [intent("c")]));
  assert.equal(composedAccepted.propose("obs", [0, 0], context()).intents.length, 3);
  const composedRejected = guardedWithWitness(policy("p", [intent("a"), intent("b")]), witnessGuard(null), policy("q", [intent("c")]));
  assert.equal(composedRejected.propose("obs", [0, 0], context()).intents.length, 2);
});

test("GuardWitness is structurally distinct from the exit-report liveWitness", () => {
  assert.deepEqual(Object.keys(valid).sort(), ["observationDigest", "reference"]);
  assert.ok(!("available" in valid), "a guard witness has no availability flag; it is evidence, not a probe");
});

/** MechanicalWorkflows-021l: six pins for guardedWithWitness behaviour the 32ad.1 tests left unobserved. */

function kinds(trace: readonly { readonly kind: string; readonly policyId: string }[]): string[] {
  return trace.map(event => `${event.kind}:${event.policyId}`);
}

test("a blank-reference rejection leaves Q unevaluated and its memory untouched", () => {
  const counter = { calls: 0 };
  const blank: GuardWitness = { reference: "  ", observationDigest: DIGEST };
  const composed = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(blank), policy("q", [intent("iq")], counter));
  const out = composed.propose("obs", [0, 5], context());
  assert.equal(counter.calls, 0);
  assert.deepEqual(out.memory, [1, 5]);
});

test("a rejection trace is P's trace plus exactly one guard-rejected event, in that order", () => {
  const out = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(null), policy("q", [intent("iq")])).propose("obs", [0, 0], context());
  assert.deepEqual(kinds(out.trace), ["proposed:p", "guard-rejected:p?q"]);
});

test("an acceptance trace is P's trace, then guard-accepted, then Q's trace, in that order", () => {
  const out = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(valid), policy("q", [intent("iq")])).propose("obs", [0, 0], context());
  assert.deepEqual(kinds(out.trace), ["proposed:p", "guard-accepted:p?q", "proposed:q"]);
});

test("every rejection detail is exactly the guard name and revision followed by the refusal reason", () => {
  const stale: GuardWitness = { reference: "receipt://guard/1", observationDigest: "sha256:" + "0".repeat(64) };
  const blank: GuardWitness = { reference: "   ", observationDigest: DIGEST };
  const cases: ReadonlyArray<readonly [GuardWitness | null, string]> = [
    [null, "g@2 witness-absent"], [stale, "g@2 witness-stale"], [blank, "g@2 witness-unreferenced"],
  ];
  for (const [witness, detail] of cases) {
    const out = guardedWithWitness(policy("p", [intent("ip")]), witnessGuard(witness), policy("q", [intent("iq")])).propose("obs", [0, 0], context());
    assert.equal(out.trace.find(event => event.kind === "guard-rejected")?.detail, detail);
  }
});

test("the guard is asked about P's own proposal at the context's observation digest, exactly once", () => {
  const seen: Array<{ ids: string[]; memory: number; digest: string }> = [];
  const recording: WitnessedGuard<Intent, number> = {
    id: "g", revision: "2",
    witnessOf(proposal, ctx) {
      seen.push({ ids: proposal.intents.map(entry => entry.intentId), memory: proposal.memory, digest: ctx.observationDigest });
      return valid;
    },
  };
  guardedWithWitness(policy("p", [intent("ip"), intent("ip2")]), recording, policy("q", [intent("iq")])).propose("obs", [3, 0], context());
  assert.deepEqual(seen, [{ ids: ["ip", "ip2"], memory: 4, digest: DIGEST }]);
});

test("GuardWitness declares exactly reference and observationDigest, checked by the type system", () => {
  // Record<keyof GuardWitness, true> fails typing on a missing or an extra member (typecheck:qa covers packages/*/test).
  const exactKeys: Record<keyof GuardWitness, true> = { reference: true, observationDigest: true };
  assert.deepEqual(Object.keys(exactKeys).sort(), ["observationDigest", "reference"]);
});
