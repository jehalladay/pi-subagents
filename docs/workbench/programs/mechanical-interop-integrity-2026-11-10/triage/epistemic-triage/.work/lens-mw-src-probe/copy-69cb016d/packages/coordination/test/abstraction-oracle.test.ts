import test from "node:test";
import assert from "node:assert/strict";
import {
  enumerateLaneAutomaton,
  checkConservation,
  admissionCandidate,
  laneAbstractionOracle,
  LANE_OCCUPANCIES,
  LANE_INPUTS,
  ORACLE_MAX_LANES,
} from "../dist/index.js";

test("the enumeration is finite and total: 3^N states, 3N inputs per state, every input answered", () => {
  for (const n of [1, 2, 3]) {
    const r = enumerateLaneAutomaton(n);
    assert.equal(r.kind, "kernel");
    if (r.kind !== "kernel") return;
    assert.equal(r.kernel.states.length, 3 ** n);
    assert.equal(r.kernel.transitions.length, 3 ** n * 3 * n);
    for (const state of r.kernel.states) {
      const inputs: Set<string> = new Set(r.kernel.transitions.filter((t) => t.from === state).map((t) => t.input));
      assert.equal(inputs.size, 3 * n);
    }
  }
  assert.deepEqual([...LANE_OCCUPANCIES], ["free", "reserved", "busy"]);
  assert.deepEqual([...LANE_INPUTS], ["reserve", "acquire", "release"]);
  assert.equal(ORACLE_MAX_LANES, 3);
});

test("a disallowed input is a refused self-loop, and the allowed steps move exactly as modeled", () => {
  const r = enumerateLaneAutomaton(1);
  assert.equal(r.kind, "kernel");
  if (r.kind !== "kernel") return;
  const step = (from: string, input: string) => r.kernel.transitions.find((t) => t.from === from && t.input === `${input}:0`)!;
  assert.deepEqual([step("free", "reserve").to, step("free", "reserve").label], ["reserved", "ok"]);
  assert.deepEqual([step("reserved", "acquire").to, step("reserved", "acquire").label], ["busy", "ok"]);
  assert.deepEqual([step("reserved", "release").to, step("reserved", "release").label], ["free", "ok"]);
  assert.deepEqual([step("busy", "release").to, step("busy", "release").label], ["free", "ok"]);
  assert.deepEqual([step("busy", "acquire").to, step("busy", "acquire").label], ["busy", "refused"]);
  assert.deepEqual([step("free", "acquire").to, step("free", "acquire").label], ["free", "refused"]);
  assert.deepEqual([step("busy", "reserve").to, step("busy", "reserve").label], ["busy", "refused"]);
});

test("conservation holds on the enumeration and a forged kernel is refused", () => {
  const r = enumerateLaneAutomaton(2);
  assert.equal(r.kind, "kernel");
  if (r.kind !== "kernel") return;
  assert.equal(checkConservation(r.kernel, 2).ok, true);
  const forged = { states: [...r.kernel.states, "free|free|busy"], transitions: [...r.kernel.transitions, { from: "free|free", input: "acquire:0", label: "ok", to: "busy|busy", mass: 1 }] };
  const check = checkConservation(forged, 2);
  assert.equal(check.ok, false);
  assert.ok(check.refusals.some((x) => x.code === "ORACLE_CONSERVATION_VIOLATED" && x.subject === "free|free|busy"));
  assert.ok(check.refusals.some((x) => x.code === "ORACLE_CONSERVATION_VIOLATED" && x.subject === "free|free->busy|busy"));
});

test("the admission candidate lumps reserved with busy, and the oracle finds the free/reserved/busy counterexample", () => {
  const r = laneAbstractionOracle(1);
  assert.equal(r.kind, "verdict");
  if (r.kind !== "verdict") return;
  assert.deepEqual(r.candidate.map((b) => [...b].sort()), [["free"], ["busy", "reserved"]]);
  assert.equal(r.lumpable, false);
  assert.deepEqual(r.stable.map((b) => [...b].sort().join(",")).sort(), ["busy", "free", "reserved"]);
  assert.ok(r.counterexample);
  assert.deepEqual([...r.counterexample!.states].sort(), ["busy", "reserved"]);
  assert.equal(r.counterexample!.input, "acquire:0");
  assert.deepEqual([...r.counterexample!.labels].sort(), ["ok", "refused"]);
});

test("the two-lane oracle also refuses the admission lump and is deterministic", () => {
  const a = laneAbstractionOracle(2);
  const b = laneAbstractionOracle(2);
  assert.deepEqual(a, b);
  assert.equal(a.kind, "verdict");
  if (a.kind !== "verdict") return;
  assert.equal(a.lumpable, false);
  assert.ok(a.counterexample);
  const kernel = enumerateLaneAutomaton(2);
  if (kernel.kind === "kernel") assert.equal(admissionCandidate(kernel.kernel).length, 2);
});

test("a lane count outside 1..3 refuses: the reference enumeration is finite by design", () => {
  for (const n of [0, 4, 1.5, Number.NaN]) {
    const r = laneAbstractionOracle(n);
    assert.equal(r.kind, "refused");
    if (r.kind === "refused") assert.equal(r.code, "ORACLE_LANES_OUT_OF_RANGE");
  }
});

test("the enumerated kernel is normalized: every transition carries mass 1 and every (from, input) pair totals 1", () => {
  for (const n of [1, 2, 3]) {
    const r = enumerateLaneAutomaton(n);
    assert.equal(r.kind, "kernel");
    if (r.kind !== "kernel") return;
    const totals = new Map<string, number>();
    for (const t of r.kernel.transitions) {
      assert.equal(t.mass, 1, `lane count ${n}: ${t.from} --${t.input}--> ${t.to} carries mass ${String(t.mass)}`);
      const key = `${t.from}\u0000${t.input}`;
      totals.set(key, (totals.get(key) ?? 0) + t.mass);
    }
    assert.equal(totals.size, r.kernel.states.length * 3 * n);
    for (const [key, total] of totals) {
      assert.equal(total, 1, `lane count ${n}: pair ${key.replace("\u0000", " / ")} totals ${total}`);
    }
  }
});
