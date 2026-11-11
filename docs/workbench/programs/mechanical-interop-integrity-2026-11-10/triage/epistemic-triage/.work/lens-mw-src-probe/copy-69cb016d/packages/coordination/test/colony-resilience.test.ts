import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runColonyResilience, naiveRetry, receiptChecked, oracleColonyOutcome, colonyOutcome, classifyEvidence, colonyStateHash, labelColonyEpisode, digest, canonicalJson } from "../dist/index.js";
import type { ColonyEpisode, ColonyObservation, ColonyState } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../../../qa/integration/python-consumer/fixtures/colony-resilience-seed29.json");
const base = { workers: 4, compute: 4, steps: 16 };
const seeds = Array.from({ length: 24 }, (_, index) => index + 1);

test("receiptChecked ends every seeded episode with zero unsafe effects while naiveRetry ends with a positive count on the same seeds, and the independent oracle agrees with the harness on both", () => {
  let naiveUnsafe = 0;
  for (const seed of seeds) {
    const checked = runColonyResilience({ ...base, seed, policy: receiptChecked });
    const naive = runColonyResilience({ ...base, seed, policy: naiveRetry });
    assert.equal(colonyOutcome(checked.final).unsafeEffects, 0, `seed ${seed} receiptChecked acted unsafely`);
    assert.deepEqual(colonyOutcome(checked.final), oracleColonyOutcome({ ...base, seed, policy: "receipt-checked" }), `seed ${seed} oracle drift (receiptChecked)`);
    assert.deepEqual(colonyOutcome(naive.final), oracleColonyOutcome({ ...base, seed, policy: "naive-retry" }), `seed ${seed} oracle drift (naiveRetry)`);
    naiveUnsafe += colonyOutcome(naive.final).unsafeEffects;
  }
  assert.ok(naiveUnsafe > 0, "naiveRetry never acted on a poisoned signal or stale receipt across the fixture seeds");
});

test("a stale receipt and a nonauthoritative signal are classified unknown and never upgrade a candidate; only a fresh authoritative pair is verified", () => {
  assert.equal(classifyEvidence({ authority: "authoritative" }, { basis: "head-3" }, "head-3"), "verified");
  assert.equal(classifyEvidence({ authority: "authoritative" }, { basis: "head-2" }, "head-3"), "unknown");
  assert.equal(classifyEvidence({ authority: "nonauthoritative" }, { basis: "head-3" }, "head-3"), "unknown");
  for (const seed of seeds) {
    const episode = runColonyResilience({ ...base, seed, policy: receiptChecked });
    for (const worker of episode.final.workers) {
      if (worker.acceptedVia === "evidence") assert.equal(classifyEvidence(worker.signal, worker.receipt, episode.final.head), "verified", `seed ${seed} ${worker.id} accepted on unverified evidence`);
    }
  }
});

test("protected-scope mutation and budget overrun appear as resolver refusals in the history, never as silent skips", () => {
  const codes = new Set<string>();
  // The finalised stream reaches a budget overrun only past seed 25, so this scan runs seeds 1 to 40.
  for (const seed of Array.from({ length: 40 }, (_, index) => index + 1)) {
    const naive = runColonyResilience({ ...base, seed, policy: naiveRetry });
    const checked = runColonyResilience({ ...base, seed, policy: receiptChecked });
    for (const episode of [naive, checked]) {
      for (const step of episode.steps) {
        for (const rejection of step.resolution.rejected) {
          codes.add(rejection.code);
          assert.ok(step.events.some(event => event.kind === "refused" && event.detail.startsWith(`${rejection.code}:`)), `seed ${seed} step ${step.step} dropped ${rejection.code} from the history`);
        }
      }
    }
  }
  assert.ok(codes.has("INTENT_SCOPE_PROTECTED"), "no seed hit a protected scope");
  assert.ok(codes.has("INTENT_BUDGET_EXCEEDED"), "no seed overran the budget");
});

test("killed workers are recovered, or the episode halts with an explicit halted event; exhaustion halts receiptChecked", () => {
  let halted = 0;
  for (const seed of seeds) {
    const episode = runColonyResilience({ ...base, seed, policy: receiptChecked });
    const hasHalt = episode.final.events.some(event => event.kind === "halted");
    assert.equal(hasHalt, episode.final.halted);
    if (hasHalt) halted += 1;
    for (const worker of episode.final.workers.filter(w => w.initiallyKilled)) {
      assert.ok(worker.status === "recovered" || episode.final.halted, `seed ${seed} left ${worker.id} killed without a halted event`);
    }
  }
  assert.ok(halted > 0, "no seed exhausted the budget or hit a denied scope");
  const starved = runColonyResilience({ ...base, compute: 0, seed: 5, policy: receiptChecked });
  assert.ok(starved.final.halted, "zero compute must halt");
  assert.ok(starved.steps.some(step => step.resolution.admitted.some(intent => intent.effect === "halt")));
});

test("all-success and all-fail terminal groups both appear across the fixture seeds, and unknown work stays distinct from failure", () => {
  const groups = new Set<string>();
  for (const seed of seeds) for (const policy of [naiveRetry, receiptChecked]) groups.add(colonyOutcome(runColonyResilience({ ...base, seed, policy }).final).group);
  assert.ok(groups.has("all-success"), [...groups].join(","));
  assert.ok(groups.has("all-fail"), [...groups].join(","));
  const episode = runColonyResilience({ ...base, seed: 5, compute: 0, policy: receiptChecked });
  assert.ok(episode.final.workers.some(w => w.acceptedVia === null), "a halted episode leaves unaccepted workers as unknown, not failed");
});

test("the fixture is pure and deterministic, labelled fixture, models Trail and Quorum as explicitly absent fakes, and refuses every relabel", () => {
  const a = runColonyResilience({ ...base, seed: 29, policy: receiptChecked });
  const b = runColonyResilience({ ...base, seed: 29, policy: receiptChecked });
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.finalHash, colonyStateHash(a.final));
  assert.notEqual(runColonyResilience({ ...base, seed: 4, policy: receiptChecked }).finalHash, a.finalHash);
  assert.equal(a.schema, "mw.colony-resilience.fixture.v1");
  assert.equal(a.mode, "fixture");
  assert.deepEqual(a.final.fakes, { trail: "absent", quorum: "absent" });
  assert.equal(labelColonyEpisode(a, "fixture").mode, "fixture");
  for (const mode of ["live", "replay", "live-verified"]) assert.throws(() => labelColonyEpisode(a, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*${mode}`));
});

test("the committed cross-language fixture equals the regenerated seed-1 receiptChecked episode byte for byte, and its final hash is the digest of its final state", () => {
  const committed = readFileSync(fixturePath, "utf8");
  const regenerated = runColonyResilience({ ...base, seed: 29, policy: receiptChecked });
  assert.equal(committed.trimEnd(), canonicalJson(regenerated));
  const parsed = JSON.parse(committed) as ColonyEpisode;
  assert.equal(parsed.finalHash, digest(parsed.final as ColonyState));
});

// Pins c2a-c2c: the apply() branches that neither shipped policy reaches (killed-worker verify refusal, non-colony effect refusal, denied de-duplication).

function pinPolicy(id: string, effect: string, worker: { readonly id: string; readonly scope: string }, compute: number) {
  return { id, revision: "pin-1", propose: (o: ColonyObservation, memory: number) => ({
    intents: [{ intentId: `${id}:${effect}:${worker.id}:${memory}`, policyId: id, target: { kind: "worker", uri: `worker:${worker.id}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [worker.scope], readScopes: [] }],
    memory: memory + 1, trace: [] }) };
}

test("pin c2a: a verify aimed at a killed worker is refused in the history and leaves the worker killed and unaccepted", () => {
  const pick = (seed: number) => runColonyResilience({ ...base, seed, steps: 0, policy: receiptChecked }).final.workers.find(w => w.status === "killed" && !w.scope.startsWith("graph:protected:"));
  const seed = seeds.find(s => pick(s) !== undefined)!;
  const target = pick(seed)!;
  const episode = runColonyResilience({ ...base, seed, steps: 1, policy: pinPolicy("verify-killed", "verify", target, 1) });
  const after = episode.final.workers.find(w => w.id === target.id)!;
  assert.equal(after.status, "killed", `seed ${seed} ${target.id} left the killed state on a verify`);
  assert.equal(after.acceptedVia, null, `seed ${seed} ${target.id} was accepted on a verify while killed`);
  assert.ok(episode.final.events.some(e => e.kind === "refused" && e.worker === target.id && e.detail === `${target.id} is killed and cannot be verified`), `seed ${seed} no killed-verify refusal`);
});

test("pin c2b: an effect that is not a colony effect is refused in the history, never skipped silently", () => {
  const live = runColonyResilience({ ...base, seed: 3, steps: 0, policy: receiptChecked }).final.workers.find(w => w.status === "alive" && !w.scope.startsWith("graph:protected:"))!;
  const episode = runColonyResilience({ ...base, seed: 3, steps: 1, policy: pinPolicy("odd", "teleport", live, 0) });
  assert.ok(episode.steps[0]!.resolution.admitted.some(intent => intent.effect === "teleport"), "the resolver did not admit the odd effect, so the clause is vacuous");
  assert.ok(episode.final.events.some(e => e.kind === "refused" && e.worker === live.id && e.detail === "effect teleport is not a colony effect"), "the odd effect left no refused event");
});

test("pin c2c: a worker refused on a protected scope is recorded in denied exactly once however often it is refused", () => {
  let repeated = 0;
  for (const seed of seeds) {
    const episode = runColonyResilience({ ...base, seed, policy: naiveRetry });
    const refusals = episode.steps.flatMap(s => s.resolution.rejected.filter(r => r.code === "INTENT_SCOPE_PROTECTED")).length;
    assert.equal(new Set(episode.final.denied).size, episode.final.denied.length, `seed ${seed} denied ${episode.final.denied.join(",")}`);
    if (refusals > episode.final.denied.length) repeated += 1;
  }
  assert.ok(repeated > 0, "no seed refused one protected worker twice, so the de-duplication clause is vacuous");
});
