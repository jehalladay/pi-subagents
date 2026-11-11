import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  alternative,
  exerciseContractOf,
  guarded,
  inhibit,
  initialRepeatedMemory,
  parallel,
  repeated,
  sequential,
} from "../dist/index.js";
import type {
  ExerciseComposition,
  Guard,
  Intent,
  Policy,
  RepeatedSpec,
  Selector,
  SequentialObservation,
} from "../dist/index.js";

interface Obs {
  readonly note: string;
}

type Seq = SequentialObservation<Obs, Intent, null>;

function echo<O = Obs>(id: string, revision: string): Policy<O, Intent, null> {
  return {
    id,
    revision,
    propose() {
      return {
        intents: [],
        memory: null,
        trace: [{ kind: "proposed", policyId: id, detail: id }],
      };
    },
  };
}

const leaf = (policyId: string, revision: string): ExerciseComposition => ({ kind: "leaf", policyId, revision });

const SIX_CODES = [
  "INTENT_AUTHORITY_EXCEEDED",
  "INTENT_BASIS_STALE",
  "INTENT_BUDGET_EXCEEDED",
  "INTENT_DUPLICATE",
  "INTENT_SCOPE_PROTECTED",
  "INTENT_WRITE_CONFLICT",
] as const;

test("a leaf contract passes the policy identity through and pins mandatory global validation to the resolver's six checks", () => {
  const contract = exerciseContractOf(leaf("p", "p-rev"));
  assert.equal(contract.exerciseId, "p");
  assert.equal(contract.revision, "p-rev");
  assert.deepEqual(contract.leafPolicyIds, ["p"]);
  assert.deepEqual(contract.combinators, []);
  assert.equal(contract.depth, 0);
  assert.equal(contract.wrapped, false);
  assert.equal(contract.validation.globalValidationMandatory, true);
  assert.equal(contract.validation.resolvedBy, "reconcile");
  assert.deepEqual(contract.validation.checks, SIX_CODES);
});

test("each of the five tree combinators derives the exact id and revision the real composed policy reports", () => {
  const p = echo("p", "p-rev");
  const q = echo("q", "q-rev");
  const qSeq = echo<Seq>("q", "q-rev");
  const guard: Guard<Intent, null> = { id: "g", revision: "g-rev", accept: () => true };
  const selector: Selector<Obs> = { id: "s", revision: "s-rev", select: () => "left" };
  const a = leaf("p", "p-rev");
  const b = leaf("q", "q-rev");
  const cases: ReadonlyArray<readonly [ExerciseComposition, Policy<Obs, Intent, readonly [null, null]>]> = [
    [{ kind: "sequential", first: a, second: b }, sequential(p, qSeq)],
    [{ kind: "parallel", first: a, second: b }, parallel(p, q)],
    [{ kind: "guarded", first: a, guard: { id: "g", revision: "g-rev" }, second: b }, guarded(p, guard, q)],
    [{ kind: "alternative", first: a, second: b, selector: { id: "s", revision: "s-rev" } }, alternative(p, q, selector)],
    [{ kind: "inhibit", first: a, second: b }, inhibit(p, q)],
  ];
  for (const [tree, composed] of cases) {
    const contract = exerciseContractOf(tree);
    assert.equal(contract.exerciseId, composed.id);
    assert.equal(contract.revision, composed.revision);
    assert.deepEqual(contract.leafPolicyIds, ["p", "q"]);
    assert.equal(contract.depth, 1);
    assert.equal(contract.wrapped, false);
  }
});

test("a nested tree derives the identity of the actually nested composition with leaves in order and depth counted", () => {
  const a = echo("a", "ra");
  const b = echo<Seq>("b", "rb");
  const c = echo("c", "rc");
  const d = echo("d", "rd");
  const guard: Guard<Intent, readonly [readonly [null, null], null]> = { id: "g", revision: "g-rev", accept: () => true };
  const composed = guarded(parallel(sequential(a, b), c), guard, d);
  const tree: ExerciseComposition = {
    kind: "guarded",
    first: {
      kind: "parallel",
      first: { kind: "sequential", first: leaf("a", "ra"), second: leaf("b", "rb") },
      second: leaf("c", "rc"),
    },
    guard: { id: "g", revision: "g-rev" },
    second: leaf("d", "rd"),
  };
  const contract = exerciseContractOf(tree);
  assert.equal(contract.exerciseId, composed.id);
  assert.equal(contract.exerciseId, "a;b||c>d");
  assert.equal(contract.revision, composed.revision);
  assert.deepEqual(contract.leafPolicyIds, ["a", "b", "c", "d"]);
  assert.equal(contract.depth, 3);
  assert.deepEqual(contract.combinators, ["guarded", "parallel", "sequential"]);
});

test("the repeated wrapper derives the real wrapped identity, marks the contract wrapped, and records the wrapper", () => {
  const p = echo("p", "p-rev");
  const q = echo("q", "q-rev");
  const spec: RepeatedSpec<Obs, Intent, readonly [null, null]> = {
    id: "spec",
    revision: "spec-rev",
    maxSteps: 2,
    hold: 0,
    initiate: () => true,
    terminate: () => true,
  };
  const composed = repeated(sequential(p, echo<Seq>("q", "q-rev")), spec);
  void q;
  void initialRepeatedMemory;
  const contract = exerciseContractOf(
    { kind: "sequential", first: leaf("p", "p-rev"), second: leaf("q", "q-rev") },
    { kind: "repeated", specId: "spec", specRevision: "spec-rev" },
  );
  assert.equal(contract.exerciseId, composed.id);
  assert.equal(contract.exerciseId, "p;q*");
  assert.equal(contract.revision, composed.revision);
  assert.equal(contract.wrapped, true);
  assert.deepEqual(contract.combinators, ["repeated", "sequential"]);
  assert.deepEqual(contract.leafPolicyIds, ["p", "q"]);
});

test("repeated inside the tree is refused as wrapper-only, and an unknown combinator kind is refused by name", () => {
  const bad = { kind: "repeated", first: leaf("p", "p-rev"), second: leaf("q", "q-rev") } as unknown as ExerciseComposition;
  assert.throws(() => exerciseContractOf(bad), /EXERCISE_REPEATED_NOT_A_NODE/);
  const unknown = { kind: "zip", first: leaf("p", "p-rev"), second: leaf("q", "q-rev") } as unknown as ExerciseComposition;
  assert.throws(() => exerciseContractOf(unknown), /EXERCISE_UNKNOWN_COMBINATOR: zip/);
});

test("derivation is pure: identical trees derive deep-equal contracts, the input is not mutated, and no policy is consulted", () => {
  const tree: ExerciseComposition = Object.freeze({
    kind: "inhibit",
    first: Object.freeze(leaf("p", "p-rev")),
    second: Object.freeze(leaf("q", "q-rev")),
  }) as ExerciseComposition;
  const once = exerciseContractOf(tree);
  const twice = exerciseContractOf(tree);
  assert.deepEqual(once, twice);
  assert.equal(once.exerciseId, "p-|q");
  assert.equal(once.revision, "p@p-rev;q@q-rev");
});

test("an unknown combinator kind is refused by own key, so no Object.prototype key passes as a combinator", () => {
  for (const kind of ["constructor", "toString", "hasOwnProperty", "valueOf", "__proto__"]) {
    const node = { kind, first: leaf("p", "p-rev"), second: leaf("q", "q-rev") } as unknown as ExerciseComposition;
    assert.throws(() => exerciseContractOf(node), new RegExp(`EXERCISE_UNKNOWN_COMBINATOR: ${kind}`));
  }
});

test("depth follows the longest path through either operand, not the first operand or the node count", () => {
  const a = leaf("a", "ra");
  const b = leaf("b", "rb");
  const c = leaf("c", "rc");
  const d = leaf("d", "rd");
  const rightNested: ExerciseComposition = {
    kind: "sequential",
    first: a,
    second: { kind: "parallel", first: b, second: { kind: "sequential", first: c, second: d } },
  };
  assert.equal(exerciseContractOf(rightNested).depth, 3);
  const balanced: ExerciseComposition = {
    kind: "parallel",
    first: { kind: "sequential", first: a, second: b },
    second: { kind: "sequential", first: c, second: d },
  };
  assert.equal(exerciseContractOf(balanced).depth, 2);
});

test("combinator kinds and leaves are collected from the right operand too", () => {
  const tree: ExerciseComposition = {
    kind: "sequential",
    first: leaf("a", "ra"),
    second: { kind: "parallel", first: leaf("b", "rb"), second: leaf("c", "rc") },
  };
  const contract = exerciseContractOf(tree);
  assert.deepEqual(contract.combinators, ["parallel", "sequential"]);
  assert.deepEqual(contract.leafPolicyIds, ["a", "b", "c"]);
});

test("right-nested trees derive the id and revision of the real composed policy for five operator pairings", () => {
  const a = echo("a", "ra");
  const b = echo("b", "rb");
  const c = echo("c", "rc");
  const guard = { id: "g", revision: "g-rev", accept: () => true } as unknown as Guard<Intent, never>;
  const selector = { id: "s", revision: "s-rev", select: () => "left" } as unknown as Selector<Obs>;
  const ra = leaf("a", "ra");
  const rb = leaf("b", "rb");
  const rc = leaf("c", "rc");
  const g = { id: "g", revision: "g-rev" };
  const s = { id: "s", revision: "s-rev" };
  const loose = (policy: unknown): never => policy as never;
  const cases: ReadonlyArray<readonly [string, ExerciseComposition, { readonly id: string; readonly revision: string }]> = [
    [
      "seq_par",
      { kind: "sequential", first: ra, second: { kind: "parallel", first: rb, second: rc } },
      sequential(a, loose(parallel(b, c))),
    ],
    [
      "par_guard",
      { kind: "parallel", first: ra, second: { kind: "guarded", first: rb, guard: g, second: rc } },
      parallel(a, loose(guarded(b, loose(guard), c))),
    ],
    [
      "alt_inh",
      { kind: "alternative", first: ra, selector: s, second: { kind: "inhibit", first: rb, second: rc } },
      alternative(a, loose(inhibit(b, c)), selector),
    ],
    [
      "inh_seq",
      { kind: "inhibit", first: ra, second: { kind: "sequential", first: rb, second: rc } },
      inhibit(a, loose(sequential(b, loose(c)))),
    ],
    [
      "guard_alt",
      { kind: "guarded", first: ra, guard: g, second: { kind: "alternative", first: rb, second: rc, selector: s } },
      guarded(a, loose(guard), loose(alternative(b, c, selector))),
    ],
  ];
  for (const [name, tree, composed] of cases) {
    const contract = exerciseContractOf(tree);
    assert.equal(contract.exerciseId, composed.id, `${name} id`);
    assert.equal(contract.revision, composed.revision, `${name} revision`);
    assert.deepEqual(contract.leafPolicyIds, ["a", "b", "c"], `${name} leaves`);
    assert.equal(contract.depth, 2, `${name} depth`);
  }
});
