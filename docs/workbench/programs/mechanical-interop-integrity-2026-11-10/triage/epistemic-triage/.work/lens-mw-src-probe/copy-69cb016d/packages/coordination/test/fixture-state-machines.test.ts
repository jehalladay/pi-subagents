import { strict as assert } from "node:assert";
import { test } from "node:test";
import { alternative, guarded, inhibit, initialRepeatedMemory, parallel, repeated, sequential } from "../dist/index.js";
import type { Guard, Intent, Policy, PolicyContext, Proposal, RepeatedMemory, RepeatedSpec, Selector } from "../dist/index.js";

/**
 * CAC-WC QA (MechanicalWorkflows-9gaz.1): independent finite fixture state machines for the six P0 combinators.
 * Each reference below is an explicit table or automaton written from the declared operator semantics, never by
 * running the combinator; the suite compares the real combinator against it over enumerated inputs and then
 * proves the comparison has teeth with negative controls (deliberately wrong references that must disagree).
 * Everything is a fixture: no native receipt, no verified claim, and no library contract is touched.
 */

interface Obs { readonly guard: boolean; readonly choice: "left" | "right" }

const context: PolicyContext = {
  episodeId: "ep-fsm", actorId: "actor-fsm", observationDigest: "sha256:fixture", budget: { compute: 9, workers: 9, queue: 9, latencyMs: 9 },
  authority: "propose-only", policyRevision: "fsm-1", seed: 0,
};
const observe = (guard: boolean, choice: "left" | "right" = "left"): Obs => ({ guard, choice });

function mk(intentId: string, policyId: string, effect: string, target: Intent["target"], writeScopes: readonly string[], evidenceRefs: readonly string[]): Intent {
  return { intentId, policyId, target, expectedRevision: "rev-fsm", effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs, writeScopes, readScopes: [] };
}

/** A probe runs, proposes one write and counts its runs in memory; its trace is the single kind `ran`. */
function probe<O = Obs>(id: string): Policy<O, Intent, number> {
  return { id, revision: "r1", propose(_observation, memory) {
    return { intents: [mk(`${id}:${memory}`, id, "write", { kind: "candidate", uri: `cand:${id}` }, [`scope:${id}`], ["sha256:fixture"])], memory: memory + 1, trace: [{ kind: "ran", policyId: id, detail: String(memory) }] };
  } };
}

type InhibitMode = "none" | "evidence" | "no-evidence";
/** A controller that may emit one inhibition on `scope`, with or without evidence. */
function controller(mode: InhibitMode, scope: string): Policy<Obs, Intent, number> {
  return { id: "c", revision: "r1", propose(_observation, memory) {
    const intents = mode === "none" ? [] : [mk(`c:${memory}`, "c", "inhibit", { kind: "scope", uri: scope }, [], mode === "evidence" ? ["sha256:e1"] : [])];
    return { intents, memory: memory + 1, trace: [{ kind: "ran", policyId: "c", detail: String(memory) }] };
  } };
}

const guardThat = (accept: boolean): Guard<Intent, number> => ({ id: accept ? "g-accept" : "g-reject", revision: "r1", accept: () => accept });
const selector: Selector<Obs> = { id: "sel", revision: "r1", select: observation => observation.choice };

/** `policyIds` is the writer of each trace line in trace order, so a reference table sees operand order as well as kinds. */
interface Outcome { readonly kinds: readonly string[]; readonly policyIds: readonly string[]; readonly intents: readonly string[]; readonly memory: readonly [number, number] }
const outcomeOf = (proposal: Proposal<Intent, readonly [number, number]>): Outcome => ({ kinds: proposal.trace.map(t => t.kind), policyIds: proposal.trace.map(t => t.policyId), intents: proposal.intents.map(i => i.intentId), memory: proposal.memory });

function mismatches(expected: unknown, actual: unknown, label: string): string[] {
  return JSON.stringify(expected) === JSON.stringify(actual) ? [] : [`${label}: expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`];
}

// ---- Reference tables (hand-written from the declared semantics) ----------------------------------------------

const binaryReference = {
  sequential: (mp: number, mq: number): Outcome => ({ kinds: ["ran", "ran", "sequential"], policyIds: ["p", "q", "p;q"], intents: [`p:${mp}`, `q:${mq}`], memory: [mp + 1, mq + 1] }),
  parallel: (mp: number, mq: number): Outcome => ({ kinds: ["ran", "ran", "parallel"], policyIds: ["p", "q", "p||q"], intents: [`p:${mp}`, `q:${mq}`], memory: [mp + 1, mq + 1] }),
  guarded: (accept: boolean, mp: number, mq: number): Outcome => accept
    ? { kinds: ["ran", "guard-accepted", "ran"], policyIds: ["p", "p>q", "q"], intents: [`p:${mp}`, `q:${mq}`], memory: [mp + 1, mq + 1] }
    : { kinds: ["ran", "guard-rejected"], policyIds: ["p", "p>q"], intents: [`p:${mp}`], memory: [mp + 1, mq] },
  alternative: (choice: "left" | "right", mp: number, mq: number): Outcome => choice === "left"
    ? { kinds: ["alternative-selected", "ran"], policyIds: ["p+q", "p"], intents: [`p:${mp}`], memory: [mp + 1, mq] }
    : { kinds: ["alternative-selected", "ran"], policyIds: ["p+q", "q"], intents: [`q:${mq}`], memory: [mp, mq + 1] },
  inhibit: (mode: InhibitMode, matches: boolean, mc: number, mq: number): Outcome => ({
    kinds: ["ran", "ran", ...(mode === "no-evidence" ? ["inhibition-ignored"] : mode === "evidence" && matches ? ["inhibited"] : [])],
    policyIds: ["c", "q", ...(mode === "no-evidence" || (mode === "evidence" && matches) ? ["c-|q"] : [])],
    intents: mode === "evidence" && matches ? [] : [`q:${mq}`],
    memory: [mc + 1, mq + 1],
  }),
};

interface RepeatedParams { readonly maxSteps: number; readonly hold: number; readonly terminateAt: number }
interface RepeatedStep { readonly kinds: readonly string[]; readonly intents: readonly string[]; readonly memory: RepeatedMemory<number> }

/** The declared automaton of P*: idle / active(steps, holdLeft) / latched, driven by the guard, one option repeat per active evaluation. */
function repeatedReference(guards: readonly boolean[], params: RepeatedParams): RepeatedStep[] {
  let state: RepeatedMemory<number> = initialRepeatedMemory(0);
  const out: RepeatedStep[] = [];
  for (const guard of guards) {
    const kinds: string[] = [];
    let intents: string[] = [];
    let { steps, holdLeft } = state;
    let run = true;
    if (!state.active) {
      if (!guard || state.latched) {
        kinds.push("repeated-not-initiated");
        state = state.latched && !guard ? { ...state, latched: false } : state;
        run = false;
      } else { steps = 0; holdLeft = params.hold; kinds.push("repeated-initiated"); }
    } else if (guard) { holdLeft = params.hold; }
    else if (holdLeft > 0) { holdLeft -= 1; kinds.push("repeated-hysteresis-held"); }
    else { kinds.push("repeated-released"); state = initialRepeatedMemory(state.option); run = false; }
    if (run) {
      const optionMemory = state.option + 1;
      kinds.push("ran");
      steps += 1;
      if (optionMemory >= params.terminateAt) { kinds.push("repeated-terminated"); intents = [`p:${state.option}`]; state = initialRepeatedMemory(optionMemory); }
      else if (steps >= params.maxSteps) { kinds.push("repeated-nonquiescent"); state = { ...initialRepeatedMemory(optionMemory), latched: true }; }
      else { kinds.push("repeated-continuing"); state = { active: true, steps, holdLeft, latched: false, option: optionMemory }; }
    }
    out.push({ kinds, intents, memory: state });
  }
  return out;
}

function repeatedActual(guards: readonly boolean[], params: RepeatedParams): RepeatedStep[] {
  const spec: RepeatedSpec<Obs, Intent, number> = { id: "spec", revision: "r1", initiate: observation => observation.guard, terminate: proposal => proposal.memory >= params.terminateAt, maxSteps: params.maxSteps, hold: params.hold };
  const policy = repeated(probe<Obs>("p"), spec);
  let memory = initialRepeatedMemory(0);
  return guards.map(guard => {
    const proposal = policy.propose(observe(guard), memory, context);
    memory = proposal.memory;
    return { kinds: proposal.trace.map(t => t.kind), intents: proposal.intents.map(i => i.intentId), memory };
  });
}

const guardSequences = (length: number): boolean[][] => Array.from({ length: 2 ** length }, (_, n) => Array.from({ length }, (_, bit) => ((n >> bit) & 1) === 1));
const REPEATED_PARAMS: readonly RepeatedParams[] = [{ maxSteps: 2, hold: 1, terminateAt: 2 }, { maxSteps: 3, hold: 0, terminateAt: 99 }, { maxSteps: 1, hold: 2, terminateAt: 1 }, { maxSteps: 4, hold: 1, terminateAt: 3 }];

// ---- Agreement over the enumerated alphabet ------------------------------------------------------------------

test("sequential and parallel agree with their reference tables for every memory start, and thread both memories", () => {
  const problems: string[] = [];
  for (const [mp, mq] of [[0, 0], [3, 5], [7, 1]] as const) {
    problems.push(...mismatches(binaryReference.sequential(mp, mq), outcomeOf(sequential(probe<Obs>("p"), probe("q")).propose(observe(true), [mp, mq], context)), `sequential ${mp},${mq}`));
    problems.push(...mismatches(binaryReference.parallel(mp, mq), outcomeOf(parallel(probe<Obs>("p"), probe<Obs>("q")).propose(observe(true), [mp, mq], context)), `parallel ${mp},${mq}`));
  }
  assert.deepEqual(problems, []);
});

test("guarded agrees with its two-row table: acceptance runs Q after the mark, rejection leaves Q's memory untouched", () => {
  const problems: string[] = [];
  for (const accept of [true, false]) for (const [mp, mq] of [[0, 0], [2, 5]] as const) {
    problems.push(...mismatches(binaryReference.guarded(accept, mp, mq), outcomeOf(guarded(probe<Obs>("p"), guardThat(accept), probe<Obs>("q")).propose(observe(true), [mp, mq], context)), `guarded ${accept} ${mp},${mq}`));
  }
  assert.deepEqual(problems, []);
});

test("alternative agrees with its two-row table: the selection mark leads and only the chosen memory advances", () => {
  const problems: string[] = [];
  for (const choice of ["left", "right"] as const) for (const [mp, mq] of [[0, 0], [4, 6]] as const) {
    problems.push(...mismatches(binaryReference.alternative(choice, mp, mq), outcomeOf(alternative(probe<Obs>("p"), probe<Obs>("q"), selector).propose(observe(true, choice), [mp, mq], context)), `alternative ${choice} ${mp},${mq}`));
  }
  assert.deepEqual(problems, []);
});

test("inhibit agrees with its four-row table: only an evidence-backed inhibition on a matching scope removes Q's write", () => {
  const problems: string[] = [];
  for (const mode of ["none", "evidence", "no-evidence"] as const) for (const matches of [true, false]) {
    const scope = matches ? "scope:q" : "scope:other";
    problems.push(...mismatches(binaryReference.inhibit(mode, matches, 0, 0), outcomeOf(inhibit(controller(mode, scope), probe<Obs>("q")).propose(observe(true), [0, 0], context)), `inhibit ${mode} ${matches}`));
  }
  assert.deepEqual(problems, []);
});

test("repeated agrees with the declared automaton over every guard sequence of length five under four parameter sets", () => {
  const problems: string[] = [];
  let compared = 0;
  for (const params of REPEATED_PARAMS) for (const guards of guardSequences(5)) {
    problems.push(...mismatches(repeatedReference(guards, params), repeatedActual(guards, params), `repeated ${JSON.stringify(params)} ${guards.map(Number).join("")}`));
    compared += 1;
  }
  assert.equal(compared, 4 * 32);
  assert.deepEqual(problems, []);
  const latched = guardSequences(5).filter(guards => repeatedReference(guards, { maxSteps: 3, hold: 0, terminateAt: 99 }).some(step => step.kinds.includes("repeated-nonquiescent")));
  assert.ok(latched.length >= 1, "the enumeration must reach the nonquiescent latch");
});

// ---- Negative controls: wrong references must be caught --------------------------------------------------------

test("negative control: swapping the operand order of the sequential or parallel trace is caught through the policy ids", () => {
  const swap = (outcome: Outcome): Outcome => ({ ...outcome, policyIds: [outcome.policyIds[1]!, outcome.policyIds[0]!, outcome.policyIds[2]!] });
  const sequentialActual = outcomeOf(sequential(probe<Obs>("p"), probe("q")).propose(observe(true), [0, 0], context));
  const parallelActual = outcomeOf(parallel(probe<Obs>("p"), probe<Obs>("q")).propose(observe(true), [0, 0], context));
  assert.deepEqual(sequentialActual.policyIds, ["p", "q", "p;q"]);
  assert.deepEqual(parallelActual.policyIds, ["p", "q", "p||q"]);
  assert.equal(mismatches(swap(binaryReference.sequential(0, 0)), sequentialActual, "swapped sequential").length, 1);
  assert.equal(mismatches(swap(binaryReference.parallel(0, 0)), parallelActual, "swapped parallel").length, 1);
});

test("negative control: an inverted guarded table disagrees with the combinator on every input", () => {
  const inverted = (accept: boolean, mp: number, mq: number) => binaryReference.guarded(!accept, mp, mq);
  for (const accept of [true, false]) {
    const problems = mismatches(inverted(accept, 0, 0), outcomeOf(guarded(probe<Obs>("p"), guardThat(accept), probe<Obs>("q")).propose(observe(true), [0, 0], context)), `inverted ${accept}`);
    assert.equal(problems.length, 1);
  }
});

test("negative control: a reference that honours an evidence-less inhibition is caught, and one with an off-by-one hold is caught", () => {
  const lenient = binaryReference.inhibit("evidence", true, 0, 0);
  const actual = outcomeOf(inhibit(controller("no-evidence", "scope:q"), probe<Obs>("q")).propose(observe(true), [0, 0], context));
  assert.equal(mismatches(lenient, actual, "lenient inhibit").length, 1);
  const wrongHold = (guards: readonly boolean[]) => repeatedReference(guards, { maxSteps: 4, hold: 2, terminateAt: 99 });
  const disagreements = guardSequences(5).filter(guards => mismatches(wrongHold(guards), repeatedActual(guards, { maxSteps: 4, hold: 1, terminateAt: 99 }), "hold").length > 0);
  assert.ok(disagreements.length >= 1, "an off-by-one hold must be visible on at least one guard sequence");
  assert.deepEqual(guardSequences(5).filter(guards => mismatches(repeatedReference(guards, { maxSteps: 4, hold: 1, terminateAt: 99 }), repeatedActual(guards, { maxSteps: 4, hold: 1, terminateAt: 99 }), "hold").length > 0), []);
});

test("every fixture outcome is a fixture: no native receipt digest, no verified claim and no authority word appears in any proposal", () => {
  const forbidden = /verified_candidate|authorized-effect|evidenceAuthority/;
  for (const proposal of [
    sequential(probe<Obs>("p"), probe("q")).propose(observe(true), [0, 0], context),
    inhibit(controller("evidence", "scope:q"), probe<Obs>("q")).propose(observe(true), [0, 0], context),
  ]) {
    assert.ok(!forbidden.test(JSON.stringify(proposal)));
    for (const intent of proposal.intents) assert.equal(intent.authority, undefined);
  }
});
