import { strict as assert } from "node:assert";
import { test } from "node:test";
import { TRUST_ZONE_OF, admitUnderTrust, collectorBoundary } from "../dist/index.js";
import type { AdvisoryValue, HardCheck, TrustAdmissionInput } from "../dist/index.js";

const hard = (overrides: Partial<HardCheck> = {}): HardCheck[] => [
  { kind: "protected-scope", passed: true, source: "reconcile", ...(overrides.kind === "protected-scope" ? overrides : {}) },
  { kind: "budget", passed: true, source: "reconcile", ...(overrides.kind === "budget" ? overrides : {}) },
  { kind: "native-gate", passed: true, source: "forge:cmd_1", ...(overrides.kind === "native-gate" ? overrides : {}) },
];
const advisories: AdvisoryValue[] = [
  { kind: "learned-score", source: "mp:policy@3", value: 0.97 },
  { kind: "predictor-output", source: "simulator:v2", value: "will-pass" },
];
const input = (overrides: Partial<TrustAdmissionInput> = {}): TrustAdmissionInput => ({ subject: "cand:7", hardChecks: hard(), advisories, ...overrides });

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("the trust table: learned scores, rewrites, collector and predictor outputs are advisory; protected scopes, budgets and native gates are hard", () => {
  assert.deepEqual(TRUST_ZONE_OF, {
    "learned-score": "advisory", "policy-rewrite": "advisory", "collector-output": "advisory", "predictor-output": "advisory",
    "protected-scope": "hard", "budget": "hard", "native-gate": "hard",
  });
});

test("admission is grounded on the hard checks alone; advisories ride along as advisory and never as grounds", () => {
  const result = admitUnderTrust(input());
  assert.equal(result.schema, "mw.trust-admission.v0");
  assert.equal(result.admitted, true);
  assert.deepEqual(result.groundedOn, ["budget", "native-gate", "protected-scope"]);
  assert.deepEqual(result.advisories, [{ kind: "learned-score", source: "mp:policy@3", zone: "advisory" }, { kind: "predictor-output", source: "simulator:v2", zone: "advisory" }]);
  assert.deepEqual(result.refusals, []);
  const without = admitUnderTrust(input({ advisories: [] }));
  assert.equal(without.admitted, true, "advisories are not required for admission");
});

test("one failed hard check refuses admission however good the advisories are", () => {
  const result = admitUnderTrust(input({ hardChecks: hard({ kind: "budget", passed: false, source: "reconcile" }), advisories: [{ kind: "learned-score", source: "mp:policy@3", value: 1.0 }] }));
  assert.equal(result.admitted, false);
  assert.deepEqual(result.groundedOn, []);
  assert.deepEqual(result.refusals.map(r => [r.code, r.kind]), [["TRUST_HARD_CHECK_FAILED", "budget"]]);
});

test("every hard check must be present: a missing protected-scope, budget or native-gate check refuses by name", () => {
  const result = admitUnderTrust(input({ hardChecks: hard().filter(c => c.kind !== "native-gate") }));
  assert.equal(result.admitted, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.kind]), [["TRUST_HARD_CHECK_MISSING", "native-gate"]]);
  const none = admitUnderTrust(input({ hardChecks: [] }));
  assert.deepEqual(none.refusals.map(r => r.kind), ["budget", "native-gate", "protected-scope"]);
});

test("an advisory cannot override: a learned value carrying override, force, admit or passed is refused and changes nothing", () => {
  const overriding: AdvisoryValue[] = [{ kind: "learned-score", source: "mp:policy@3", value: { score: 0.99, override: true } }, { kind: "policy-rewrite", source: "rewriter", value: { admit: true } }];
  const failed = admitUnderTrust(input({ hardChecks: hard({ kind: "protected-scope", passed: false, source: "reconcile" }), advisories: overriding }));
  assert.equal(failed.admitted, false);
  assert.deepEqual(failed.refusals.map(r => r.code), ["TRUST_ADVISORY_CANNOT_OVERRIDE", "TRUST_ADVISORY_CANNOT_OVERRIDE", "TRUST_HARD_CHECK_FAILED"]);
  const passed = admitUnderTrust(input({ advisories: overriding }));
  assert.equal(passed.admitted, false, "an override attempt is itself a refusal even when the hard checks pass");
  const confused = admitUnderTrust(input({ hardChecks: [...hard(), { kind: "learned-score" as never, passed: true, source: "mp" }] }));
  assert.deepEqual(confused.refusals.map(r => [r.code, r.kind]), [["TRUST_ZONE_CONFUSED", "learned-score"]]);
});

test("user-defined collector code runs only under an explicit trusted process boundary; absent, untrusted or inferred boundaries are refused", () => {
  assert.deepEqual(collectorBoundary({ collectorId: "c-1", boundary: { kind: "process", trusted: true, declaredBy: "host:furnace" } }), { ok: true, collectorId: "c-1", boundary: "process by host:furnace" });
  assert.deepEqual(collectorBoundary({ collectorId: "c-1" }), { ok: false, collectorId: "c-1", code: "TRUST_COLLECTOR_UNSANDBOXED", detail: "collector c-1 declares no trusted process boundary; user-defined collector code does not run in-process" });
  assert.equal(collectorBoundary({ collectorId: "c-1", boundary: { kind: "process", trusted: false, declaredBy: "host:furnace" } }).ok, false);
  const inferred = collectorBoundary({ collectorId: "c-1", boundary: { kind: "process", trusted: true, declaredBy: "host:furnace", inferred: true } });
  assert.equal(inferred.ok, false);
  if (!inferred.ok) assert.equal(inferred.code, "TRUST_COLLECTOR_BOUNDARY_INFERRED");
  const undeclared = collectorBoundary({ collectorId: "c-1", boundary: { kind: "process", trusted: true, declaredBy: "" } });
  assert.equal(undeclared.ok, false, "a boundary nobody declared is refused unconditionally");
  if (!undeclared.ok) assert.equal(undeclared.code, "TRUST_COLLECTOR_BOUNDARY_UNDECLARED");
});

test("an untrusted boundary reports its own refusal code even when nobody declared it", () => {
  const untrusted = collectorBoundary({ collectorId: "c-2", boundary: { kind: "process", trusted: false, declaredBy: "" } });
  assert.deepEqual(untrusted, { ok: false, collectorId: "c-2", code: "TRUST_COLLECTOR_UNSANDBOXED", detail: "collector c-2 declares no trusted process boundary; user-defined collector code does not run in-process" });
  const declaredUntrusted = collectorBoundary({ collectorId: "c-2", boundary: { kind: "process", trusted: false, declaredBy: "host:furnace" } });
  assert.equal(declaredUntrusted.ok, false);
  if (!declaredUntrusted.ok) assert.equal(declaredUntrusted.code, "TRUST_COLLECTOR_UNSANDBOXED");
});

test("each of the five override keys refuses on its own: override, force, admit, passed and admitted", () => {
  for (const key of ["override", "force", "admit", "passed", "admitted"]) {
    const result = admitUnderTrust(input({ advisories: [{ kind: "learned-score", source: "mp:policy@3", value: { score: 0.5, [key]: true } }] }));
    assert.equal(result.admitted, false, `${key} must refuse`);
    assert.deepEqual(result.refusals.map(r => [r.code, r.kind]), [["TRUST_ADVISORY_CANNOT_OVERRIDE", "learned-score"]], key);
    assert.ok(result.refusals[0]!.detail.includes(`carries ${key};`), `detail names ${key}`);
  }
  const benign = admitUnderTrust(input({ advisories: [{ kind: "learned-score", source: "mp:policy@3", value: { score: 0.5, note: "x" } }] }));
  assert.equal(benign.admitted, true, "a non-override key rides along as advisory");
});

test("a hard kind carried twice, one passing and one failing, still fails and names the failing sources sorted", () => {
  const checks: HardCheck[] = [...hard(), { kind: "budget", passed: false, source: "zeta-ledger" }, { kind: "budget", passed: false, source: "alpha-ledger" }];
  const result = admitUnderTrust(input({ hardChecks: checks }));
  assert.equal(result.admitted, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.kind]), [["TRUST_HARD_CHECK_FAILED", "budget"]]);
  assert.ok(result.refusals[0]!.detail.startsWith("budget failed (alpha-ledger, zeta-ledger);"), result.refusals[0]!.detail);
  const reversed = admitUnderTrust(input({ hardChecks: [...checks].reverse() }));
  assert.equal(JSON.stringify(reversed), JSON.stringify(result));
});

test("an unknown hard-check kind is a confusion of zones and is refused by its own name", () => {
  const result = admitUnderTrust(input({ hardChecks: [...hard(), { kind: "mystery-check" as never, passed: true, source: "x" }] }));
  assert.equal(result.admitted, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.kind]), [["TRUST_ZONE_CONFUSED", "mystery-check"]]);
  assert.ok(result.refusals[0]!.detail.startsWith("mystery-check is an advisory value"));
});

test("refusals sort by code then kind regardless of the order the confused kinds arrive in", () => {
  const confusedA = { kind: "zeta-kind" as never, passed: true, source: "x" };
  const confusedB = { kind: "alpha-kind" as never, passed: true, source: "x" };
  const forward = admitUnderTrust(input({ hardChecks: [...hard(), confusedA, confusedB] }));
  const backward = admitUnderTrust(input({ hardChecks: [...hard(), confusedB, confusedA] }));
  assert.deepEqual(forward.refusals.map(r => r.kind), ["alpha-kind", "zeta-kind"]);
  assert.equal(JSON.stringify(forward), JSON.stringify(backward));
});

test("admission leaves an unsorted advisories array in its given order", () => {
  const fresh: AdvisoryValue[] = [
    { kind: "predictor-output", source: "simulator:v2", value: "will-pass" },
    { kind: "learned-score", source: "mp:policy@3", value: 0.97 },
  ];
  const before = JSON.stringify(fresh);
  const result = admitUnderTrust(input({ advisories: fresh }));
  assert.equal(JSON.stringify(fresh), before, "the caller's array order is untouched");
  assert.deepEqual(result.advisories.map(a => a.kind), ["learned-score", "predictor-output"], "the output is sorted");
});

test("a null advisory value is tolerated as carrying no override keys", () => {
  const result = admitUnderTrust(input({ advisories: [{ kind: "learned-score", source: "mp:policy@3", value: null }, { kind: "policy-rewrite", source: "rewriter", value: undefined }] }));
  assert.equal(result.admitted, true);
  assert.deepEqual(result.refusals, []);
});

test("admission is deterministic, pure and mints no identifier", () => {
  const given = input();
  const before = JSON.stringify(given);
  const forward = admitUnderTrust(given);
  const backward = admitUnderTrust({ ...given, hardChecks: [...given.hardChecks].reverse(), advisories: [...given.advisories].reverse() });
  assert.equal(JSON.stringify(given), before);
  assert.equal(JSON.stringify(forward), JSON.stringify(backward));
  const known = new Set([...stringLeaves(given), forward.schema, "advisory", "hard"]);
  for (const leaf of [...forward.groundedOn, ...stringLeaves(forward.advisories)]) assert.ok(known.has(leaf), `minted ${leaf}`);
});
