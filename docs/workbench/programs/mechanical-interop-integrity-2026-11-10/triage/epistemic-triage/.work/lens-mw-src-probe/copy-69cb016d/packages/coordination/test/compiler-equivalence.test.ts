import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalPlanBytes,
  compilePolicyGraph,
  judgeFixtureByteEquivalence,
  judgeReadOnlyTrace,
  recordStageTwoExit,
  witnessCompilerDeterminism,
  type PolicyGraphManifest,
} from "../dist/index.js";

const manifest: PolicyGraphManifest = {
  schema: "mw.policy-graph.v1",
  graphId: "g-eq",
  revision: "r2",
  parentRevision: "r1",
  exactBasisPolicy: "exact",
  requiredContracts: ["c1"],
  implementationRefs: ["ref1"],
  nodes: [
    { id: "a", kind: "conditional-selector" },
    { id: "b", kind: "numeric-policy" },
  ],
  edges: [{ from: "a", to: "b", temporal: "instant" }],
};

test("old/new fixture byte equivalence holds over real compiled plan bytes", () => {
  const oldBytes = canonicalPlanBytes(compilePolicyGraph(manifest));
  const newBytes = canonicalPlanBytes(compilePolicyGraph(manifest));
  const out = judgeFixtureByteEquivalence([
    { name: "plan", oldBytes, newBytes },
    { name: "aux", oldBytes: "x=1\n", newBytes: "x=1\n" },
  ]);
  assert.equal(out.ok, true);
  assert.equal(out.pairsJudged, 2);
  assert.ok(Object.isFrozen(out) && Object.isFrozen(out.refusals));
});

test("negative: a diverging pair refuses with the first divergent byte offset", () => {
  const out = judgeFixtureByteEquivalence([{ name: "p", oldBytes: "abcdef", newBytes: "abcXef" }]);
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "D2_EQUIV_PAIR_MISMATCH" && r.detail.includes("byte 3")));
  const shorter = judgeFixtureByteEquivalence([{ name: "q", oldBytes: "abc", newBytes: "abcd" }]);
  assert.ok(shorter.refusals.some((r) => r.code === "D2_EQUIV_PAIR_MISMATCH" && r.detail.includes("byte 3")));
});

test("negative: no pairs, a duplicate pair name and a blank side each refuse", () => {
  const empty = judgeFixtureByteEquivalence([]);
  assert.ok(empty.refusals.some((r) => r.code === "D2_EQUIV_NO_PAIRS"));
  const dup = judgeFixtureByteEquivalence([
    { name: "p", oldBytes: "a", newBytes: "a" },
    { name: "p", oldBytes: "b", newBytes: "b" },
  ]);
  assert.ok(dup.refusals.some((r) => r.code === "D2_EQUIV_NAME_DUPLICATE"));
  const blank = judgeFixtureByteEquivalence([{ name: "r", oldBytes: "", newBytes: "a" }]);
  assert.ok(blank.refusals.some((r) => r.code === "D2_EQUIV_BYTES_MISSING"));
});

test("the compiler witnesses deterministic over repeated trials, and a diverging compiler is refused", () => {
  const out = witnessCompilerDeterminism(manifest, 3);
  assert.equal(out.ok, true);
  assert.equal(out.trials, 3);
  assert.ok(out.canonicalBytes !== undefined && out.canonicalBytes.includes('"ok":true'));
  let calls = 0;
  const flaky = () => {
    calls += 1;
    return calls === 1 ? compilePolicyGraph(manifest) : { ok: false as const, code: "GRAPH_UNSUPPORTED_EDGE" as const, detail: "diverged" };
  };
  const diverged = witnessCompilerDeterminism(manifest, 2, flaky);
  assert.equal(diverged.ok, false);
  assert.ok(diverged.refusals.some((r) => r.code === "D2_DETERMINISM_DIVERGED"));
  const few = witnessCompilerDeterminism(manifest, 1);
  assert.ok(few.refusals.some((r) => r.code === "D2_DETERMINISM_TRIALS_INSUFFICIENT"));
});

test("the trace is read-only: reads pass, a write and an unknown kind refuse", () => {
  const ok = judgeReadOnlyTrace([
    { kind: "read", subject: "fixtures/old.json" },
    { kind: "read", subject: "fixtures/new.json" },
  ]);
  assert.equal(ok.ok, true);
  assert.equal(ok.opsJudged, 2);
  const wrote = judgeReadOnlyTrace([{ kind: "write", subject: "fixtures/old.json" }]);
  assert.ok(wrote.refusals.some((r) => r.code === "D2_TRACE_WRITE_OBSERVED"));
  const weird = judgeReadOnlyTrace([{ kind: "append", subject: "log" }]);
  assert.ok(weird.refusals.some((r) => r.code === "D2_TRACE_KIND_UNKNOWN"));
});

test("the D2 exit record composes the three witnesses and refuses any missing one", () => {
  const determinism = witnessCompilerDeterminism(manifest, 2);
  const bytes = canonicalPlanBytes(compilePolicyGraph(manifest));
  const equivalence = judgeFixtureByteEquivalence([{ name: "plan", oldBytes: bytes, newBytes: bytes }]);
  const trace = judgeReadOnlyTrace([{ kind: "read", subject: "fixtures/plan.json" }]);
  const exit = recordStageTwoExit({ determinism, equivalence, trace });
  assert.equal(exit.ok, true);
  assert.equal(exit.schema, "mw.stage-two-exit.v0");
  assert.ok(Object.isFrozen(exit));
  const badTrace = judgeReadOnlyTrace([{ kind: "write", subject: "x" }]);
  const refused = recordStageTwoExit({ determinism, equivalence, trace: badTrace });
  assert.equal(refused.ok, false);
  assert.ok(refused.refusals.some((r) => r.code === "D2_EXIT_WITNESS_MISSING" && r.detail.includes("trace")));
  assert.ok(refused.refusals.some((r) => r.code === "D2_TRACE_WRITE_OBSERVED"));
});

test("w9x9 K30: a red determinism witness refuses the D2 exit with its own refusals attached", () => {
  const trace = judgeReadOnlyTrace([{ kind: "read", subject: "f" }]);
  const bytes = canonicalPlanBytes(compilePolicyGraph(manifest));
  const equivalence = judgeFixtureByteEquivalence([{ name: "plan", oldBytes: bytes, newBytes: bytes }]);
  const insufficient = recordStageTwoExit({ determinism: witnessCompilerDeterminism(manifest, 1), equivalence, trace });
  assert.equal(insufficient.ok, false);
  assert.ok(insufficient.refusals.some((r) => r.code === "D2_EXIT_WITNESS_MISSING" && r.detail === "witness determinism is not green"));
  assert.ok(insufficient.refusals.some((r) => r.code === "D2_DETERMINISM_TRIALS_INSUFFICIENT"));
  let calls = 0;
  const flaky = () => {
    calls += 1;
    return calls === 1 ? compilePolicyGraph(manifest) : { ok: false as const, code: "GRAPH_UNSUPPORTED_EDGE" as const, detail: "diverged" };
  };
  const diverged = recordStageTwoExit({ determinism: witnessCompilerDeterminism(manifest, 2, flaky), equivalence, trace });
  assert.equal(diverged.ok, false);
  assert.ok(diverged.refusals.some((r) => r.code === "D2_EXIT_WITNESS_MISSING" && r.detail.includes("determinism")));
  assert.ok(diverged.refusals.some((r) => r.code === "D2_DETERMINISM_DIVERGED"));
});

test("w9x9 K31: a red equivalence judgement refuses the D2 exit with its own refusals attached", () => {
  const determinism = witnessCompilerDeterminism(manifest, 2);
  const trace = judgeReadOnlyTrace([{ kind: "read", subject: "f" }]);
  const equivalence = judgeFixtureByteEquivalence([{ name: "p", oldBytes: "abc", newBytes: "abd" }]);
  assert.equal(equivalence.ok, false);
  const refused = recordStageTwoExit({ determinism, equivalence, trace });
  assert.equal(refused.ok, false);
  assert.ok(refused.refusals.some((r) => r.code === "D2_EXIT_WITNESS_MISSING" && r.detail.includes("equivalence")));
  assert.ok(refused.refusals.some((r) => r.code === "D2_EQUIV_PAIR_MISMATCH"));
});

test("w9x9 K2: canonicalPlanBytes pins the exact success bytes of a known plan", () => {
  assert.equal(canonicalPlanBytes(compilePolicyGraph(manifest)), '{"ok":true,"order":["a","b"]}');
});

test("w9x9 K3: canonicalPlanBytes pins the exact refusal bytes and distinguishes details", () => {
  const one = canonicalPlanBytes({ ok: false, code: "GRAPH_UNSUPPORTED_EDGE", detail: "d1" });
  const two = canonicalPlanBytes({ ok: false, code: "GRAPH_UNSUPPORTED_EDGE", detail: "d2" });
  assert.equal(one, '{"code":"GRAPH_UNSUPPORTED_EDGE","detail":"d1","ok":false}');
  assert.equal(two, '{"code":"GRAPH_UNSUPPORTED_EDGE","detail":"d2","ok":false}');
  assert.notEqual(one, two);
});

test("w9x9 K5: a pair diverging at the very first byte names byte 0", () => {
  const out = judgeFixtureByteEquivalence([{ name: "p", oldBytes: "abc", newBytes: "xbc" }]);
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "D2_EQUIV_PAIR_MISMATCH" && r.detail.includes("byte 0")));
});

test("w9x9 K10: a blank NEW side refuses exactly as a blank old side does", () => {
  const out = judgeFixtureByteEquivalence([{ name: "r", oldBytes: "a", newBytes: "" }]);
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "D2_EQUIV_BYTES_MISSING"));
  assert.ok(!out.refusals.some((r) => r.code === "D2_EQUIV_PAIR_MISMATCH"));
});

test("w9x9 K19: NaN and a fractional trial count each refuse as insufficient", () => {
  for (const trials of [Number.NaN, 2.5]) {
    const out = witnessCompilerDeterminism(manifest, trials);
    assert.equal(out.ok, false);
    assert.ok(out.refusals.some((r) => r.code === "D2_DETERMINISM_TRIALS_INSUFFICIENT"));
  }
});

test("w9x9 K16: every refusal entry of a refused equivalence judgement is frozen", () => {
  const out = judgeFixtureByteEquivalence([{ name: "p", oldBytes: "abc", newBytes: "abd" }]);
  assert.ok(out.refusals.length > 0);
  for (const r of out.refusals) assert.ok(Object.isFrozen(r));
});

test("w9x9 K24: a green determinism witness and its refusals list are frozen", () => {
  const out = witnessCompilerDeterminism(manifest, 2);
  assert.equal(out.ok, true);
  assert.ok(Object.isFrozen(out));
  assert.ok(Object.isFrozen(out.refusals));
});

test("w9x9 K29: a trace judgement, green and red, and its refusals list are frozen", () => {
  const green = judgeReadOnlyTrace([{ kind: "read", subject: "f" }]);
  assert.ok(Object.isFrozen(green) && Object.isFrozen(green.refusals));
  const red = judgeReadOnlyTrace([{ kind: "write", subject: "f" }]);
  assert.equal(red.ok, false);
  assert.ok(Object.isFrozen(red) && Object.isFrozen(red.refusals));
});
