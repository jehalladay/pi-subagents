import test from "node:test";
import assert from "node:assert/strict";
import { validateBridge } from "../dist/index.js";
import type { BridgeCertificate, ComposedClaim, LocalValidation, SubjectBasis, VerificationResult } from "../dist/index.js";

// CAC-WC 01 (e) and example 6: two individual success receipts cannot prove global integration correctness
// without an explicit bridge invariant/certificate; the composed claim must name the bridge by which the
// step-local validations establish it. The validator checks that the named bridge is explicit and total;
// it never infers one, and it never upgrades a local verdict.

const basis: SubjectBasis = { workspaceId: "repo", revision: "cand-1" };
const other: SubjectBasis = { workspaceId: "repo", revision: "cand-2" };
const passed = (id: string, on: SubjectBasis = basis): VerificationResult => ({ basis: on, verdict: "passed", evidence: { system: "forge", kind: "operation", id } });
const locals: readonly LocalValidation[] = [
  { step: "build", result: passed("op-build") },
  { step: "deploy-check", result: passed("op-deploy") },
];
const bridge: BridgeCertificate = {
  id: "bridge:integration-invariant-7",
  establishes: "claim:integrated-on-cand-1",
  covers: ["build", "deploy-check"],
  basis,
  evidence: { system: "library-theory", kind: "certificate", id: "cert-7" },
};
const claim: ComposedClaim = { id: "claim:integrated-on-cand-1", basis, locals, bridge };
const codes = (claimed: ComposedClaim): string[] => {
  const out = validateBridge(claimed);
  assert.equal(out.established, false);
  return out.established ? [] : out.refusals.map(r => r.code);
};

test("two passed local validations establish nothing global without a named bridge", () => {
  const { bridge: _absent, ...withoutBridge } = claim;
  const out = validateBridge(withoutBridge);
  assert.equal(out.established, false);
  if (out.established) return;
  assert.deepEqual(out.refusals.map(r => r.code), ["BRIDGE_ABSENT"]);
  assert.equal(JSON.stringify(out).includes("bridge:"), false, "no bridge is fabricated");
});

test("an explicit bridge that names the claim, its basis and every local validation establishes the composed claim, echoing exactly what was supplied", () => {
  const out = validateBridge(claim);
  assert.deepEqual(out, { established: true, claim: "claim:integrated-on-cand-1", bridge: "bridge:integration-invariant-7", locals: ["build", "deploy-check"] });
});

test("the bridge must be total over the local validations: a missing or an extra covered step refuses with the names", () => {
  const missing = validateBridge({ ...claim, bridge: { ...bridge, covers: ["build"] } });
  assert.equal(missing.established, false);
  if (!missing.established) assert.deepEqual(missing.refusals, [{ code: "BRIDGE_COVERAGE_MISMATCH", detail: "missing deploy-check" }]);
  const extra = validateBridge({ ...claim, bridge: { ...bridge, covers: ["build", "deploy-check", "smoke"] } });
  assert.equal(extra.established, false);
  if (!extra.established) assert.deepEqual(extra.refusals, [{ code: "BRIDGE_COVERAGE_MISMATCH", detail: "extra smoke" }]);
});

test("only a passed local verdict bridges: partial, unknown and failed each refuse by step, and the validator never upgrades them", () => {
  for (const verdict of ["partial", "unknown", "failed"] as const) {
    const degraded: ComposedClaim = { ...claim, locals: [locals[0]!, { step: "deploy-check", result: { ...locals[1]!.result, verdict } }] };
    const out = validateBridge(degraded);
    assert.equal(out.established, false);
    if (!out.established) assert.deepEqual(out.refusals, [{ code: "BRIDGE_LOCAL_NOT_PASSED", detail: `deploy-check ${verdict}` }]);
  }
});

test("basis discipline: the bridge, the claim and every local validation must be about the same pinned basis, and the bridge must name this claim", () => {
  assert.deepEqual(codes({ ...claim, bridge: { ...bridge, basis: other } }), ["BRIDGE_BASIS_MISMATCH"]);
  assert.deepEqual(codes({ ...claim, locals: [locals[0]!, { step: "deploy-check", result: passed("op-deploy", other) }] }), ["BRIDGE_LOCAL_BASIS_MISMATCH"]);
  assert.deepEqual(codes({ ...claim, bridge: { ...bridge, establishes: "claim:other" } }), ["BRIDGE_CLAIM_MISMATCH"]);
});

test("refusals accumulate deterministically and the validator is pure", () => {
  const broken: ComposedClaim = {
    ...claim,
    locals: [locals[0]!, { step: "deploy-check", result: { ...passed("op-deploy", other), verdict: "partial" } }],
    bridge: { ...bridge, basis: other, covers: ["build"] },
  };
  const before = JSON.stringify(broken);
  const once = validateBridge(broken);
  const twice = validateBridge(broken);
  assert.deepEqual(once, twice);
  assert.equal(JSON.stringify(broken), before);
  assert.equal(once.established, false);
  if (!once.established) {
    assert.deepEqual(once.refusals.map(r => r.code), ["BRIDGE_BASIS_MISMATCH", "BRIDGE_COVERAGE_MISMATCH", "BRIDGE_LOCAL_BASIS_MISMATCH", "BRIDGE_LOCAL_NOT_PASSED"]);
  }
});

// 8qdk: laws the landed uyaz.3 suite left unpinned (lead survivors M01 M04 M05 M07 M09 M10).
const elsewhere: SubjectBasis = { workspaceId: "repo-b", revision: "cand-1" };

test("basis discipline covers the workspace half: the same revision in another workspace is another basis for the bridge and for a local", () => {
  assert.deepEqual(codes({ ...claim, bridge: { ...bridge, basis: elsewhere } }), ["BRIDGE_BASIS_MISMATCH"]);
  assert.deepEqual(codes({ ...claim, locals: [locals[0]!, { step: "deploy-check", result: passed("op-deploy", elsewhere) }] }), ["BRIDGE_LOCAL_BASIS_MISMATCH"]);
});

test("refusals sort by code, then by detail, and the order does not follow the input order of the locals", () => {
  const across = validateBridge({ ...claim, bridge: { ...bridge, establishes: "claim:other", basis: other } });
  assert.equal(across.established, false);
  if (!across.established) assert.deepEqual(across.refusals.map(r => r.code), ["BRIDGE_BASIS_MISMATCH", "BRIDGE_CLAIM_MISMATCH"]);
  const within = validateBridge({ ...claim, bridge: { ...bridge, covers: ["build", "smoke"] } });
  assert.equal(within.established, false);
  if (!within.established) {
    assert.deepEqual(within.refusals, [
      { code: "BRIDGE_COVERAGE_MISMATCH", detail: "extra smoke" },
      { code: "BRIDGE_COVERAGE_MISMATCH", detail: "missing deploy-check" },
    ]);
  }
  const failing = (step: string): LocalValidation => ({ step, result: { ...passed(`op-${step}`), verdict: "failed" } });
  const forward = validateBridge({ ...claim, locals: [failing("alpha"), failing("zeta")], bridge: { ...bridge, covers: ["alpha", "zeta"] } });
  const reverse = validateBridge({ ...claim, locals: [failing("zeta"), failing("alpha")], bridge: { ...bridge, covers: ["alpha", "zeta"] } });
  assert.equal(forward.established, false);
  assert.deepEqual(forward, reverse);
  if (!forward.established) {
    assert.deepEqual(forward.refusals, [
      { code: "BRIDGE_LOCAL_NOT_PASSED", detail: "alpha failed" },
      { code: "BRIDGE_LOCAL_NOT_PASSED", detail: "zeta failed" },
    ]);
  }
});

test("the validator does not reorder a caller's covers: an unsorted covers list validates and stays byte-identical", () => {
  const unsorted: ComposedClaim = { ...claim, bridge: { ...bridge, covers: ["deploy-check", "build"] } };
  const before = JSON.stringify(unsorted);
  assert.equal(validateBridge(unsorted).established, true);
  assert.equal(JSON.stringify(unsorted), before);
  const missingOnly: ComposedClaim = { ...claim, bridge: { ...bridge, covers: ["smoke", "build"] } };
  const beforeMissing = JSON.stringify(missingOnly);
  assert.equal(validateBridge(missingOnly).established, false);
  assert.equal(JSON.stringify(missingOnly), beforeMissing);
});

test("an established result echoes the claim's own locals order, whatever order the bridge lists its covers in", () => {
  const reversedCovers = validateBridge({ ...claim, bridge: { ...bridge, covers: ["deploy-check", "build"] } });
  assert.deepEqual(reversedCovers, { established: true, claim: claim.id, bridge: bridge.id, locals: ["build", "deploy-check"] });
  const unsortedLocals = validateBridge({ ...claim, locals: [locals[1]!, locals[0]!] });
  assert.deepEqual(unsortedLocals, { established: true, claim: claim.id, bridge: bridge.id, locals: ["deploy-check", "build"] });
});

test("a missing list is canonical: names sort ascending, not in the locals' order", () => {
  const out = validateBridge({
    ...claim,
    locals: [{ step: "zeta", result: passed("op-zeta") }, { step: "alpha", result: passed("op-alpha") }],
    bridge: { ...bridge, covers: [] },
  });
  assert.equal(out.established, false);
  if (!out.established) assert.deepEqual(out.refusals, [{ code: "BRIDGE_COVERAGE_MISMATCH", detail: "missing alpha zeta" }]);
  const extra = validateBridge({ ...claim, locals: [], bridge: { ...bridge, covers: ["zeta", "alpha"] } });
  assert.equal(extra.established, false);
  if (!extra.established) assert.deepEqual(extra.refusals, [{ code: "BRIDGE_COVERAGE_MISMATCH", detail: "extra alpha zeta" }]);
});
