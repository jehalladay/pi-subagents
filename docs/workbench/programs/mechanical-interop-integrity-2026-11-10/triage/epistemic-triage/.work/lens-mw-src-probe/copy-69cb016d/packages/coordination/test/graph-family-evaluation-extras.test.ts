// MechanicalWorkflows-rev1.2 (GPC experiment, evaluation extras): an ADDITIVE instrument beside
// evaluateGraphFamilies reporting source-revision replay fidelity, stability across seeds, tail cost
// (p99 and max of the injected clock) and held-out graph sizes. Evidence grade FIXTURE throughout:
// mode "fixture", certified false. Absent inputs are the literal "unknown", never 0. This file
// asserts nothing about any arm generalizing, being stable or beating another (C037 stays UNDETERMINED).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateGraphFamilyExtras, evaluateGraphFamilies, toEpisode, digest,
  runLandingQueue, restackFirst, fifoLanding, recordDecisions, independentTestFirst,
} from "../dist/index.js";
import type { Episode, DecisionTape, DecisionDivergenceField, GraphFamilyExtrasArm } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));

const landing = (seed: number, candidates: number, policy: typeof restackFirst): Episode => toEpisode(runLandingQueue({ seed, candidates, lanes: 1, steps: 12, policy }));
const tapeOf = (policy: typeof restackFirst): DecisionTape => recordDecisions({ environment: "landing-queue", run: { seed: 7, candidates: 4, lanes: 1, steps: 12 }, policy });

const arm = (overrides: Partial<GraphFamilyExtrasArm> = {}): GraphFamilyExtrasArm => ({
  armId: "fifo",
  episodes: [landing(7, 4, fifoLanding), landing(8, 4, fifoLanding), landing(9, 6, fifoLanding)],
  wallClockMicro: [1_000, 2_000, 3_000],
  ...overrides,
});

test("A2: each metric embeds a one-sentence definition; the report names its schema, is fixture-mode and certified false, regenerates byte-identical and its digest re-verifies", () => {
  const input = { arms: [arm()], stabilitySeeds: [7, 8, 9], trainingSizes: [4] };
  const report = evaluateGraphFamilyExtras(input);
  assert.equal(report.schema, "mw.graph-family-evaluation-extras.v1");
  assert.equal(report.mode, "fixture");
  assert.equal(report.certified, false);
  for (const key of ["replayFidelity", "stability", "tailCost", "unseenSizes", "episodeSize"] as const) {
    assert.match(report.definitions[key], /^[^.]+\.$/, `${key} definition is one sentence`);
  }
  assert.equal(JSON.stringify(evaluateGraphFamilyExtras(input)), JSON.stringify(report), "regenerates byte-identical");
  const { reportDigest, ...body } = report;
  assert.equal(digest(body), reportDigest, "digest re-verifies");
});

test("A2: absent inputs yield the literal unknown and never 0", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm()] });
  const row = report.families[0]!.arms[0]!;
  assert.equal(row.replayFidelity, "unknown");
  assert.equal(row.stability, "unknown");
  assert.equal(report.families[0]!.heldOutSizes, "unknown");
  assert.equal(typeof row.tail.p99WallClockMicro, "number", "tail is computed from the always-supplied injected clock");
});

test("A3: changing only the injected clock moves only the tail fields", () => {
  const base = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [7, 8, 9], trainingSizes: [4] });
  const slow = evaluateGraphFamilyExtras({ arms: [arm({ wallClockMicro: [1_000, 2_000, 9_000_000] })], stabilitySeeds: [7, 8, 9], trainingSizes: [4] });
  const a = base.families[0]!.arms[0]!;
  const b = slow.families[0]!.arms[0]!;
  assert.notDeepEqual(a.tail, b.tail);
  assert.equal(b.tail.maxWallClockMicro, 9_000_000);
  assert.equal(b.tail.p99WallClockMicro, 9_000_000, "nearest-rank p99 of three values is the largest");
  assert.deepEqual({ ...a, tail: 0 }, { ...b, tail: 0 }, "every other field unchanged");
  assert.deepEqual(base.families[0]!.heldOutSizes, slow.families[0]!.heldOutSizes);
});

test("A3: a tape replayed unchanged reports 0 divergences, and the counted fields are exactly the DecisionDivergenceField vocabulary", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm({ tapes: [{ environment: "landing-queue", tape: tapeOf(fifoLanding) }] })] });
  const fidelity = report.families[0]!.arms[0]!.replayFidelity;
  assert.notEqual(fidelity, "unknown");
  if (fidelity === "unknown") return;
  assert.equal(fidelity.tapes, 1);
  assert.equal(fidelity.divergences, 0);
  const vocabulary: DecisionDivergenceField[] = ["step", "observation", "intents", "admitted", "checkpoint", "length"];
  assert.deepEqual(Object.keys(fidelity.byField).sort(), [...vocabulary].sort());
  for (const field of vocabulary) assert.equal(fidelity.byField[field], 0, field);
});

test("A4(i): a tape with one forced divergence counts as 1 divergence in its field, never as fidelity", () => {
  const tape = tapeOf(fifoLanding);
  const mutated: DecisionTape = { ...tape, steps: tape.steps.map((step, index) => (index === 0 ? { ...step, admitted: ["forced-not-admitted"] } : step)) };
  const report = evaluateGraphFamilyExtras({ arms: [arm({ tapes: [{ environment: "landing-queue", tape: mutated }, { environment: "landing-queue", tape }] })] });
  const fidelity = report.families[0]!.arms[0]!.replayFidelity;
  assert.notEqual(fidelity, "unknown");
  if (fidelity === "unknown") return;
  assert.equal(fidelity.tapes, 2);
  assert.equal(fidelity.divergences, 1);
  assert.equal(fidelity.byField.admitted, 1);
  const total = Object.values(fidelity.byField).reduce((sum, count) => sum + count, 0);
  assert.equal(total, fidelity.divergences, "per-field counts sum to the divergence count");
});

test("a tape whose environment matches no family of its arm refuses rather than being silently dropped", () => {
  const quorumTape = recordDecisions({ environment: "quorum-evidence", run: { seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "authoritative" }, policy: independentTestFirst });
  assert.throws(() => evaluateGraphFamilyExtras({ arms: [arm({ tapes: [{ environment: "quorum-evidence", tape: quorumTape }] })] }),
    (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && /quorum-evidence/.test(error.message));
});

test("stability: spread of meanStepsMicro and the count of distinct landed orders over the supplied seed set; a single seed is unknown", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [7, 8, 9] });
  const stability = report.families[0]!.arms[0]!.stability;
  assert.notEqual(stability, "unknown");
  if (stability === "unknown") return;
  const episodes = arm().episodes;
  const steps = episodes.map(episode => episode.cost.steps * 1_000_000);
  assert.equal(stability.seeds, 3);
  assert.equal(stability.meanStepsSpreadMicro, Math.max(...steps) - Math.min(...steps));
  const orders = new Set(episodes.map(episode => episode.decisions.flatMap(decision => decision.eligibility.admitted).join(",")));
  assert.equal(stability.distinctLandedOrders, orders.size);
  const single = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [7] });
  assert.equal(single.families[0]!.arms[0]!.stability, "unknown", "A4(iii): one seed cannot show stability");
  const none = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [] });
  assert.equal(none.families[0]!.arms[0]!.stability, "unknown");
  const foreign = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [101, 102] });
  assert.equal(foreign.families[0]!.arms[0]!.stability, "unknown", "seeds absent from the arm's episodes leave stability unknown");
});

test("stability: a seed episode with a different step count widens the spread by exactly that difference", () => {
  const base = arm().episodes;
  const longer: Episode = { ...base[1]!, cost: { ...base[1]!.cost, steps: base[1]!.cost.steps + 3 } };
  const report = evaluateGraphFamilyExtras({ arms: [arm({ episodes: [base[0]!, longer, base[2]!] })], stabilitySeeds: [7, 8, 9] });
  const stability = report.families[0]!.arms[0]!.stability;
  assert.notEqual(stability, "unknown");
  if (stability === "unknown") return;
  assert.equal(stability.meanStepsSpreadMicro, 3_000_000, "spread is max minus min, never negative");
});

test("tail cost: nearest-rank p99 and max of the injected clock, per family and arm", () => {
  const costs = Array.from({ length: 100 }, (_, index) => (index + 1) * 10);
  const episodes = Array.from({ length: 100 }, (_, index) => landing(7 + (index % 3), 4, fifoLanding));
  const report = evaluateGraphFamilyExtras({ arms: [{ armId: "wide", episodes, wallClockMicro: costs }] });
  const tail = report.families[0]!.arms[0]!.tail;
  assert.equal(tail.p99WallClockMicro, 990, "ceil(0.99 * 100) = rank 99");
  assert.equal(tail.maxWallClockMicro, 1000);
});

test("unseen sizes: rows whose size is absent from the training list are listed with the episode-derived size; sizes in the training list are not", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [4] });
  const held = report.families[0]!.heldOutSizes;
  assert.notEqual(held, "unknown");
  if (held === "unknown") return;
  const sizes = arm().episodes.map(episode => new Set(episode.decisions.flatMap(d => [...d.proposed, ...d.eligibility.admitted, ...d.eligibility.rejected.map(r => r.intentId)])).size);
  assert.deepEqual(held.map(row => row.episodeIndex), sizes.flatMap((size, index) => (size === 4 ? [] : [index])));
  for (const row of held) { assert.equal(row.armId, "fifo"); assert.equal(row.size, sizes[row.episodeIndex]); assert.notEqual(row.size, 4); }
  assert.ok(sizes.some(size => size !== 4) && held.length > 0, "the fixture really spans two sizes");
});

test("A4(ii): when every episode size appears in the training list the report REFUSES with GRAPH_EVALUATION_NO_HELD_OUT_SIZE", () => {
  const sizes = [...new Set(arm().episodes.map(episode => new Set(episode.decisions.flatMap(d => [...d.proposed, ...d.eligibility.admitted, ...d.eligibility.rejected.map(r => r.intentId)])).size))];
  assert.throws(() => evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: sizes }), (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_NO_HELD_OUT_SIZE: "));
  assert.throws(() => evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [] }), (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && /no training size/.test(error.message), "an empty training list names no split at all");
});

test("A4(iv): malformed inputs refuse with GRAPH_EVALUATION_INVALID naming the defect", () => {
  const cases: [string, () => unknown, RegExp][] = [
    ["no arms", () => evaluateGraphFamilyExtras({ arms: [] }), /no arms/],
    ["duplicate arm ids", () => evaluateGraphFamilyExtras({ arms: [arm(), arm()] }), /duplicate/],
    ["blank arm id", () => evaluateGraphFamilyExtras({ arms: [arm({ armId: " " })] }), /blank/],
    ["empty episodes", () => evaluateGraphFamilyExtras({ arms: [arm({ episodes: [], wallClockMicro: [] })] }), /no episode/],
    ["clock length mismatch", () => evaluateGraphFamilyExtras({ arms: [arm({ wallClockMicro: [1] })] }), /wall-clock/],
    ["negative clock", () => evaluateGraphFamilyExtras({ arms: [arm({ wallClockMicro: [-1, 2, 3] })] }), /non-finite or negative/],
    ["non-finite clock", () => evaluateGraphFamilyExtras({ arms: [arm({ wallClockMicro: [1, Number.POSITIVE_INFINITY, 3] })] }), /non-finite or negative/],
    ["foreign schema", () => evaluateGraphFamilyExtras({ arms: [arm({ episodes: [{ ...arm().episodes[0]!, schema: "other" as never }, ...arm().episodes.slice(1)] })] }), /schema/],
    ["non-integer training size", () => evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [1.5] }), /training size/],
    ["non-integer seed", () => evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [1.5] }), /seed/],
  ];
  for (const [label, run, pattern] of cases) {
    assert.throws(run, (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && pattern.test(error.message), label);
  }
});

test("A1: additive — evaluateGraphFamilies is unchanged, and neither evaluation module imports the extras module", () => {
  const report = evaluateGraphFamilies({ arms: [{ armId: "a", episodes: [landing(7, 4, restackFirst)], wallClockMicro: [1] }] });
  assert.equal(report.schema, "mw.graph-family-evaluation.v1");
  for (const name of ["graph-family-evaluation.ts", "evaluation.ts"]) {
    const source = readFileSync(join(here, "../src", name), "utf8");
    assert.equal(source.includes("graph-family-evaluation-extras"), false, `${name} never imports the extras module`);
  }
});

test("A5: the extras source asserts no arm generalizes, is stable or beats another", () => {
  const source = readFileSync(join(here, "../src/graph-family-evaluation-extras.ts"), "utf8");
  assert.equal(/\b(generalizes|outperforms|beats|better than|improves on)\b/i.test(source.replace(/\bnever (claims|asserts)[^\n]*/gi, "")), false);
  assert.match(source, /certified: false/);
});

// MechanicalWorkflows-z091 (rev1.2 follow-up, test-only): five rows pinning the eleven laws the fourteen rows above leave unpinned.
test("z091 W01: an unsorted injected clock still yields the nearest-rank p99 and the max of the whole list", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm({ wallClockMicro: [3_000, 1_000, 2_000] })] });
  const tail = report.families[0]!.arms[0]!.tail;
  assert.equal(tail.p99WallClockMicro, 3_000, "nearest-rank sorts a copy, so the largest value is the p99 of three");
  assert.equal(tail.maxWallClockMicro, 3_000, "the max reads every value, not the last or the first");
});

test("z091 W02: two families and two arms report families sorted, arms sorted by id, each family block counting only its own episodes and omitting an arm with none", () => {
  const base = landing(8, 4, fifoLanding);
  const relabelled: Episode = { ...base, task: { ...base.task, family: "aa-alt" } };
  const zeta: GraphFamilyExtrasArm = { armId: "zeta", episodes: [landing(7, 4, fifoLanding), relabelled], wallClockMicro: [10, 20], tapes: [{ environment: "landing-queue", tape: tapeOf(fifoLanding) }] };
  const alpha: GraphFamilyExtrasArm = { armId: "alpha", episodes: [landing(9, 6, fifoLanding)], wallClockMicro: [30] };
  const report = evaluateGraphFamilyExtras({ arms: [zeta, alpha] });
  assert.deepEqual(report.families.map(block => block.family), ["aa-alt", "landing-queue"]);
  const [altBlock, queueBlock] = report.families;
  assert.deepEqual(altBlock!.arms.map(row => [row.armId, row.n, row.tail.p99WallClockMicro, row.tail.maxWallClockMicro, row.replayFidelity]), [["zeta", 1, 20, 20, "unknown"]], "alpha has no aa-alt episode and is omitted; zeta counts only its aa-alt episode with its own clock value");
  assert.deepEqual(queueBlock!.arms.map(row => [row.armId, row.n, row.tail.p99WallClockMicro, row.tail.maxWallClockMicro]), [["alpha", 1, 30, 30], ["zeta", 1, 10, 10]], "arms sort by id and each takes only its own landing-queue episode and clock value");
  assert.equal(queueBlock!.arms[0]!.replayFidelity, "unknown");
  const fidelity = queueBlock!.arms[1]!.replayFidelity;
  assert.notEqual(fidelity, "unknown");
  if (fidelity === "unknown") return;
  assert.equal(fidelity.tapes, 1);
  assert.equal(fidelity.divergences, 0);
});

test("z091 W03: two matching seeds are enough to report stability, and the row counts both", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm()], stabilitySeeds: [7, 8] });
  const stability = report.families[0]!.arms[0]!.stability;
  assert.notEqual(stability, "unknown", "two picked episodes meet the two-episode floor");
  if (stability === "unknown") return;
  assert.equal(stability.seeds, 2);
});

test("z091 W04: a negative training size refuses with GRAPH_EVALUATION_INVALID naming the training size", () => {
  assert.throws(() => evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [-1] }),
    (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && /training size/.test(error.message));
});

test("z091 W05: every held-out row carries stepsMicro equal to its episode's step count times one million", () => {
  const report = evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [4] });
  const held = report.families[0]!.heldOutSizes;
  assert.notEqual(held, "unknown");
  if (held === "unknown") return;
  assert.ok(held.length > 0, "the fixture holds out at least one episode");
  const episodes = arm().episodes;
  for (const row of held) {
    assert.ok(episodes[row.episodeIndex]!.cost.steps > 0, "a zero step count could not tell the multiplier from a constant");
    assert.equal(row.stepsMicro, episodes[row.episodeIndex]!.cost.steps * 1_000_000, `episode ${row.episodeIndex}`);
  }
});

test("gzor W01: a training size of 0 is a non-negative integer, so the call succeeds and holds out every fixture episode", () => {
  const episodes = arm().episodes;
  assert.ok(episodes.every(episode => episode.decisions.length > 0), "the fixture episodes each decide at least once");
  const report = evaluateGraphFamilyExtras({ arms: [arm()], trainingSizes: [0] });
  const held = report.families[0]!.heldOutSizes;
  assert.notEqual(held, "unknown");
  if (held === "unknown") return;
  assert.deepEqual(held.map(row => row.episodeIndex), [0, 1, 2], "no fixture episode has size 0, so all three are held out");
  assert.ok(held.every(row => row.size > 0), "every held-out size is above the zero training size");
});

test("gzor W02: with one episode widened by 3 steps, each held-out row's stepsMicro equals its own episode's steps times one million", () => {
  const base = arm().episodes;
  const widened: Episode = { ...base[1]!, cost: { ...base[1]!.cost, steps: base[1]!.cost.steps + 3 } };
  const report = evaluateGraphFamilyExtras({ arms: [arm({ episodes: [base[0]!, widened, base[2]!] })], trainingSizes: [1_000_000] });
  const held = report.families[0]!.heldOutSizes;
  assert.notEqual(held, "unknown");
  if (held === "unknown") return;
  assert.deepEqual(held.map(row => row.episodeIndex), [0, 1, 2], "a training size no episode has holds out every episode");
  assert.notEqual(widened.cost.steps, base[0]!.cost.steps, "the widened episode differs from the arm's first episode");
  assert.deepEqual(held.map(row => row.stepsMicro), [base[0]!.cost.steps * 1_000_000, widened.cost.steps * 1_000_000, base[2]!.cost.steps * 1_000_000]);
});

// MechanicalWorkflows-b2y0 (gzor follow-up, test-only): three rows pinning the held-out laws of multi-family and multi-arm calls, which every row above leaves unexercised (each passes training sizes only on a one-family, one-arm call).
const sizeOfEpisode = (episode: Episode): number => new Set(episode.decisions.flatMap(d => [...d.proposed, ...d.eligibility.admitted, ...d.eligibility.rejected.map(r => r.intentId)])).size;
const relabelled = (episode: Episode, family: string): Episode => ({ ...episode, task: { ...episode.task, family } });

test("b2y0 W1: with two families in one arm, each family block lists held-out rows whose episodeIndex is the index within the whole arm of an episode of that family", () => {
  const base = arm().episodes;
  const crossed = arm({ episodes: [base[0]!, relabelled(base[1]!, "aa-alt"), base[2]!] });
  const report = evaluateGraphFamilyExtras({ arms: [crossed], trainingSizes: [1_000_000] });
  assert.deepEqual(report.families.map(block => block.family), ["aa-alt", "landing-queue"]);
  const lists = report.families.map(block => {
    assert.notEqual(block.heldOutSizes, "unknown");
    return [block.family, block.heldOutSizes === "unknown" ? [] : block.heldOutSizes.map(row => row.episodeIndex)];
  });
  assert.deepEqual(lists, [["aa-alt", [1]], ["landing-queue", [0, 2]]], "a training size no episode has holds out every episode, each in the block of its own family at its arm-level index");
});

test("b2y0 W2: held-out rows carry the id of the arm that owns the episode, listed in arm-id order whatever the input order", () => {
  const zeta: GraphFamilyExtrasArm = { armId: "zeta", episodes: [landing(7, 4, fifoLanding), landing(8, 4, fifoLanding)], wallClockMicro: [10, 20] };
  const alpha: GraphFamilyExtrasArm = { armId: "alpha", episodes: [landing(9, 6, fifoLanding)], wallClockMicro: [30] };
  const report = evaluateGraphFamilyExtras({ arms: [zeta, alpha], trainingSizes: [1_000_000] });
  const held = report.families[0]!.heldOutSizes;
  assert.notEqual(held, "unknown");
  if (held === "unknown") return;
  assert.deepEqual(held.map(row => [row.armId, row.episodeIndex]), [["alpha", 0], ["zeta", 0], ["zeta", 1]], "zeta is the first arm in the input, yet alpha's row comes first and each row names its own arm");
});

test("b2y0 W3: held-out episodes in an earlier family count toward the total, so a later family with none held out does not make the report refuse", () => {
  const base = arm().episodes;
  const larger: Episode = { ...base[2]!, task: { ...base[2]!.task, family: "aa-alt" }, decisions: base[2]!.decisions.map((decision, index) => (index === 0 ? { ...decision, proposed: [...decision.proposed, "b2y0-extra-intent"] } : decision)) };
  const sizes = [base[0]!, base[1]!, larger].map(sizeOfEpisode);
  assert.equal(sizes[2], sizes[0]! + 1, "the extra proposed intent id makes the aa-alt episode one id larger than the other two");
  assert.equal(sizes[0], sizes[1], "the two landing-queue episodes share one size");
  const report = evaluateGraphFamilyExtras({ arms: [arm({ episodes: [base[0]!, base[1]!, larger] })], trainingSizes: [sizes[0]!] });
  assert.deepEqual(report.families.map(block => block.family), ["aa-alt", "landing-queue"]);
  const [altBlock, queueBlock] = report.families;
  assert.deepEqual(altBlock!.heldOutSizes, [{ armId: "fifo", episodeIndex: 2, size: sizes[2]!, stepsMicro: larger.cost.steps * 1_000_000 }], "the aa-alt family holds out its larger episode");
  assert.deepEqual(queueBlock!.heldOutSizes, [], "the last family has every episode in the training size, so its own held-out list is empty");
});

// MechanicalWorkflows-e96l (b2y0 follow-up, test-only): the mirror of W3, so the no-held-out total is pinned from both ends.
test("e96l R1: held-out episodes in a later family count toward the total, so an earlier family with none held out does not make the report refuse", () => {
  const base = arm().episodes;
  const larger: Episode = { ...base[2]!, decisions: base[2]!.decisions.map((decision, index) => (index === 0 ? { ...decision, proposed: [...decision.proposed, "e96l-extra-intent"] } : decision)) };
  const episodes = [relabelled(base[0]!, "aa-alt"), base[1]!, larger];
  const sizes = episodes.map(sizeOfEpisode);
  assert.equal(sizes[2], sizes[0]! + 1, "the extra proposed intent id makes the landing-queue episode one id larger than the aa-alt episode");
  assert.equal(sizes[0], sizes[1], "the aa-alt episode and the other landing-queue episode share one size");
  const report = evaluateGraphFamilyExtras({ arms: [arm({ episodes })], trainingSizes: [sizes[0]!] });
  assert.deepEqual(report.families.map(block => block.family), ["aa-alt", "landing-queue"]);
  const [altBlock, queueBlock] = report.families;
  assert.deepEqual(altBlock!.heldOutSizes, [], "the first-sorted family has every episode in the training size, so its own held-out list is empty");
  assert.deepEqual(queueBlock!.heldOutSizes, [{ armId: "fifo", episodeIndex: 2, size: sizes[2]!, stepsMicro: larger.cost.steps * 1_000_000 }], "the later family holds out its larger episode");
});

// MechanicalWorkflows-71st (e96l follow-up, test-only): W3 and R1 each build two families and hold out from one end; this row holds out only from the interior of three.
test("71st R1: a held-out episode in the interior family of three counts toward the total, so neither end holding none out makes the report refuse", () => {
  const base = arm().episodes;
  const larger: Episode = { ...base[2]!, decisions: base[2]!.decisions.map((decision, index) => (index === 0 ? { ...decision, proposed: [...decision.proposed, "71st-extra-intent"] } : decision)) };
  const episodes = [relabelled(base[0]!, "aa-alt"), relabelled(base[1]!, "zz-alt"), larger];
  const sizes = episodes.map(sizeOfEpisode);
  assert.equal(sizes[2], sizes[0]! + 1, "the extra proposed intent id makes the landing-queue episode one id larger than the other two");
  assert.equal(sizes[0], sizes[1], "the aa-alt and zz-alt episodes share one size");
  const report = evaluateGraphFamilyExtras({ arms: [arm({ episodes })], trainingSizes: [sizes[0]!] });
  assert.deepEqual(report.families.map(block => block.family), ["aa-alt", "landing-queue", "zz-alt"]);
  const [firstBlock, interiorBlock, lastBlock] = report.families;
  assert.deepEqual(firstBlock!.heldOutSizes, [], "the first-sorted family has its only episode in the training size");
  assert.deepEqual(interiorBlock!.heldOutSizes, [{ armId: "fifo", episodeIndex: 2, size: sizes[2]!, stepsMicro: larger.cost.steps * 1_000_000 }], "the interior family holds out its larger episode");
  assert.deepEqual(lastBlock!.heldOutSizes, [], "the last-sorted family has its only episode in the training size");
});

// MechanicalWorkflows-7pye (71st follow-up, test-only): A4(ii) (T11) pins the no-held-out refusal only for the one-family default arm; this row pins it when the arm spans three families.
test("7pye W1: with three families and every episode size in the training list the report still REFUSES with GRAPH_EVALUATION_NO_HELD_OUT_SIZE", () => {
  const base = arm().episodes;
  const episodes = [relabelled(base[0]!, "aa-alt"), base[1]!, relabelled(base[2]!, "zz-alt")];
  assert.deepEqual([...new Set(episodes.map(episode => episode.task.family))].sort(), ["aa-alt", "landing-queue", "zz-alt"], "three families, one episode each");
  const sizes = [...new Set(episodes.map(sizeOfEpisode))];
  assert.throws(() => evaluateGraphFamilyExtras({ arms: [arm({ episodes })], trainingSizes: sizes }), (error: Error) => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_NO_HELD_OUT_SIZE: "), "no family holds an episode out, so no generalization split exists");
});

// MechanicalWorkflows-ojvc (7pye follow-up, test-only): W1 (T27) and A4(ii) (T11) feed the no-held-out refusal one arm only, in one family or in three one-episode families; these rows feed the shapes they leave unfed, each with every episode size in the training list.
const refusesNoHeldOut = (error: Error): boolean => error instanceof RangeError && error.message.startsWith("GRAPH_EVALUATION_NO_HELD_OUT_SIZE: ");
const familiesOfArms = (arms: GraphFamilyExtrasArm[]): string[] => [...new Set(arms.flatMap(a => a.episodes.map(episode => episode.task.family)))].sort();
const sizesOfArms = (arms: GraphFamilyExtrasArm[]): number[] => [...new Set(arms.flatMap(a => a.episodes.map(sizeOfEpisode)))];

test("ojvc X1: two families in one arm, one of them holding two episodes, every size in training, REFUSES", () => {
  const base = arm().episodes;
  const arms = [arm({ episodes: [relabelled(base[0]!, "aa-alt"), base[1]!, base[2]!] })];
  assert.deepEqual(familiesOfArms(arms), ["aa-alt", "landing-queue"], "two families");
  assert.equal(arms[0]!.episodes.filter(episode => episode.task.family === "landing-queue").length, 2, "one family holds two episodes");
  assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes: sizesOfArms(arms) }), refusesNoHeldOut, "no family holds an episode out, so no generalization split exists");
});

test("ojvc X2: four families in one arm, one episode each, every size in training, REFUSES", () => {
  const base = [...arm().episodes, landing(10, 4, fifoLanding)];
  const arms = [arm({ episodes: [relabelled(base[0]!, "aa-alt"), relabelled(base[1]!, "bb-alt"), base[2]!, relabelled(base[3]!, "zz-alt")], wallClockMicro: [1_000, 2_000, 3_000, 4_000] })];
  assert.deepEqual(familiesOfArms(arms), ["aa-alt", "bb-alt", "landing-queue", "zz-alt"], "four families, one episode each");
  assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes: sizesOfArms(arms) }), refusesNoHeldOut, "no family holds an episode out, so no generalization split exists");
});

test("ojvc X3: two arms in one family, every size in training, REFUSES", () => {
  const arms = [arm({ armId: "alpha" }), arm({ armId: "zeta", wallClockMicro: [4_000, 5_000, 6_000] })];
  assert.deepEqual(familiesOfArms(arms), ["landing-queue"], "one family");
  assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes: sizesOfArms(arms) }), refusesNoHeldOut, "no arm holds an episode out, so no generalization split exists");
});

test("ojvc X4: two arms each in its own family, every size in training, REFUSES", () => {
  const base = arm().episodes;
  const arms = [arm({ armId: "alpha", episodes: [base[2]!], wallClockMicro: [1_000] }), arm({ armId: "zeta", episodes: [relabelled(base[0]!, "aa-alt")], wallClockMicro: [2_000] })];
  assert.deepEqual(familiesOfArms(arms), ["aa-alt", "landing-queue"], "two families, one per arm");
  assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes: sizesOfArms(arms) }), refusesNoHeldOut, "no family holds an episode out, so no generalization split exists");
});

// MechanicalWorkflows-z5kc (ojvc follow-up, test-only): the terminal law row for the no-held-out refusal. X1..X4 each feed one shape; this row loops every cell of 1..3 arms by 1..5 families, so a guard conditioned on an arm, family or episode count inside those bounds (reaching 15 episodes at the largest cell) cannot survive, and a control at the largest cell proves the refusal rather than an always-throwing guard.
test("z5kc L1: for every cell of 1..3 arms by 1..5 families with every episode size in training the report REFUSES, and at the largest cell an arm holding one larger episode per family lets it through", () => {
  const cellOf = (armCount: number, familyCount: number, enlargedLastArm: boolean): GraphFamilyExtrasArm[] => Array.from({ length: armCount }, (_, armIndex) => {
    const last = enlargedLastArm && armIndex === armCount - 1;
    const episodes = Array.from({ length: familyCount }, (_, familyIndex) => {
      const source = landing(7 + armIndex * 10 + familyIndex, 4, fifoLanding);
      const sized: Episode = last ? { ...source, decisions: source.decisions.map((decision, index) => (index === 0 ? { ...decision, proposed: [...decision.proposed, "z5kc-extra-intent"] } : decision)) } : source;
      return relabelled(sized, `family-${familyIndex + 1}`);
    });
    return { armId: `arm-${armIndex + 1}`, episodes, wallClockMicro: episodes.map((_, index) => 1_000 * (index + 1)) };
  });
  let largestTotal = 0;
  for (let armCount = 1; armCount <= 3; armCount += 1) {
    for (let familyCount = 1; familyCount <= 5; familyCount += 1) {
      const arms = cellOf(armCount, familyCount, false);
      assert.equal(familiesOfArms(arms).length, familyCount, `${armCount} arms x ${familyCount} families: the intended family count`);
      const total = arms.reduce((sum, a) => sum + a.episodes.length, 0);
      assert.equal(total, armCount * familyCount);
      largestTotal = Math.max(largestTotal, total);
      assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes: sizesOfArms(arms) }), refusesNoHeldOut, `${armCount} arms x ${familyCount} families, ${total} episodes, every size in training: no generalization split exists`);
    }
  }
  assert.equal(largestTotal, 15, "the loop reaches fifteen episodes, past every ojvc threshold of seven, three arms and five families");
  const control = cellOf(3, 5, true);
  const enlarged = control[2]!.episodes.map(sizeOfEpisode);
  const trainingSizes = sizesOfArms(control.slice(0, 2));
  assert.ok(enlarged.every(size => !trainingSizes.includes(size)), "only the last arm holds sizes outside the training list");
  const report = evaluateGraphFamilyExtras({ arms: control, trainingSizes });
  assert.deepEqual(report.families.map(block => block.family), ["family-1", "family-2", "family-3", "family-4", "family-5"]);
  assert.deepEqual(report.families.map(block => block.heldOutSizes === "unknown" ? -1 : block.heldOutSizes.map(row => row.armId).join(",")), ["arm-3", "arm-3", "arm-3", "arm-3", "arm-3"], "the last arm by id holds one episode out in each family, so the report is produced");
});

// MechanicalWorkflows-a3xd (z5kc follow-up, test-only): the terminal shape row for the no-held-out refusal. Every landed refusal row passes exactly the episode sizes as the training list; this row passes a strict superset (every episode size plus one size no episode has), so a guard that refuses only when every training size belongs to some episode cannot survive.
test("a3xd Y05: a training list holding every episode size plus one size no episode has still REFUSES with GRAPH_EVALUATION_NO_HELD_OUT_SIZE", () => {
  const arms: GraphFamilyExtrasArm[] = [0, 1].map(armIndex => {
    const episodes = [0, 1].map(familyIndex => relabelled(landing(7 + armIndex * 10 + familyIndex, 4, fifoLanding), `family-${familyIndex + 1}`));
    return { armId: `arm-${armIndex + 1}`, episodes, wallClockMicro: episodes.map((_, index) => 1_000 * (index + 1)) };
  });
  assert.equal(arms.length, 2, "two arms");
  assert.equal(familiesOfArms(arms).length, 2, "two families");
  const episodeSizes = sizesOfArms(arms);
  const unusedSize = Math.max(...episodeSizes) + 1;
  const trainingSizes = [...episodeSizes, unusedSize];
  assert.ok(episodeSizes.every(size => trainingSizes.includes(size)), "every episode size is in training, so no episode is held out");
  assert.ok(trainingSizes.some(size => !episodeSizes.includes(size)), "at least one training size belongs to no episode, so the list is a strict superset");
  assert.throws(() => evaluateGraphFamilyExtras({ arms, trainingSizes }), refusesNoHeldOut, "no episode is held out, so no generalization split exists whatever else the training list names");
});
