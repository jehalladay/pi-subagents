import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, decidePromotion } from "../dist/index.js";
import type { GuaranteeProof, PromotionCandidate } from "../dist/index.js";

const HASH = "sha256:cand-7";
function proof(guaranteeId: string, overrides: Partial<GuaranteeProof> = {}): GuaranteeProof {
  return { guaranteeId, status: "proven", proofRef: `sha256:proof-${guaranteeId}`, provedAgainst: HASH, ...overrides };
}
function candidate(overrides: Partial<PromotionCandidate> = {}): PromotionCandidate {
  return { candidateId: "cand-7", candidateHash: HASH, requiredGuarantees: ["type-safe", "budget-bounded", "no-authority"], proofs: [proof("type-safe"), proof("budget-bounded"), proof("no-authority")], ...overrides };
}
function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("a candidate whose every required guarantee is proven, referenced and fresh is promoted as a record, not a status write", () => {
  const decision = decidePromotion(candidate());
  assert.equal(decision.schema, "mw.promotion-decision.v0");
  assert.equal(decision.decision, "promote");
  assert.equal(decision.authority, "record-only");
  assert.deepEqual(decision.refusals, []);
  assert.deepEqual(decision.guarantees, [
    { guaranteeId: "budget-bounded", status: "proven", proofRef: "sha256:proof-budget-bounded" },
    { guaranteeId: "no-authority", status: "proven", proofRef: "sha256:proof-no-authority" },
    { guaranteeId: "type-safe", status: "proven", proofRef: "sha256:proof-type-safe" },
  ]);
});

test("gate-negative: one unproven required guarantee refuses the promotion however many others are proven", () => {
  const decision = decidePromotion(candidate({ proofs: [proof("type-safe"), proof("budget-bounded", { status: "unproven" }), proof("no-authority")] }));
  assert.equal(decision.decision, "refuse");
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_UNPROVEN", "budget-bounded"]]);
  assert.deepEqual(decision.guarantees.map(g => g.status), ["unproven", "proven", "proven"]);
});

test("an invalid guarantee and a required guarantee with no proof record are each refused by name", () => {
  const decision = decidePromotion(candidate({ proofs: [proof("type-safe", { status: "invalid" }), proof("budget-bounded")] }));
  assert.equal(decision.decision, "refuse");
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [
    ["PROMOTION_GUARANTEE_INVALID", "type-safe"],
    ["PROMOTION_GUARANTEE_MISSING", "no-authority"],
  ]);
  assert.deepEqual(decision.guarantees.find(g => g.guaranteeId === "no-authority"), { guaranteeId: "no-authority", status: "missing", proofRef: UNKNOWN });
});

test("a proof taken against another candidate hash is stale, and a claim of proof without a reference is unproven", () => {
  const decision = decidePromotion(candidate({ proofs: [proof("type-safe", { provedAgainst: "sha256:cand-6" }), proof("budget-bounded", { proofRef: "" }), (({ proofRef: _dropped, ...rest }) => rest)(proof("no-authority"))] }));
  assert.equal(decision.decision, "refuse");
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [
    ["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"],
    ["PROMOTION_GUARANTEE_PROOF_UNREFERENCED", "budget-bounded"],
    ["PROMOTION_GUARANTEE_PROOF_UNREFERENCED", "no-authority"],
  ]);
  assert.match(decision.refusals[0]!.detail, /sha256:cand-6/);
  assert.match(decision.refusals[0]!.detail, /sha256:cand-7/);
  const refOf = (id: string) => decision.guarantees.find(g => g.guaranteeId === id)?.proofRef;
  assert.equal(refOf("budget-bounded"), UNKNOWN);
  assert.equal(refOf("no-authority"), UNKNOWN);
});

test("the worst record for a guarantee decides it, and a proof of an unrequired guarantee covers nothing", () => {
  const duplicated = decidePromotion(candidate({ proofs: [proof("type-safe"), proof("type-safe", { status: "unproven", proofRef: "sha256:ref-unproven" }), proof("budget-bounded"), proof("no-authority")] }));
  assert.deepEqual(duplicated.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_UNPROVEN", "type-safe"]]);
  assert.deepEqual(duplicated.guarantees.find(g => g.guaranteeId === "type-safe"), { guaranteeId: "type-safe", status: "unproven", proofRef: "sha256:ref-unproven" });
  const unrequired = decidePromotion(candidate({ proofs: [proof("type-safe"), proof("budget-bounded"), proof("extra-guarantee")] }));
  assert.deepEqual(unrequired.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_MISSING", "no-authority"]]);
  assert.ok(!unrequired.guarantees.some(g => g.guaranteeId === "extra-guarantee"));
});

test("a proof record that names no candidate hash is stale, never fresh", () => {
  const unbound = (({ provedAgainst: _dropped, ...rest }) => rest)(proof("budget-bounded"));
  const decision = decidePromotion(candidate({ proofs: [proof("type-safe"), unbound, proof("no-authority")] }));
  assert.equal(decision.decision, "refuse");
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "budget-bounded"]]);
  assert.match(decision.refusals[0]!.detail, /no candidate hash/);
});

test("an invalid record outranks an unproven one for the same guarantee, and the judgement cites the invalid record", () => {
  const records = [proof("type-safe", { status: "unproven", proofRef: "sha256:ref-A" }), proof("type-safe", { status: "invalid", proofRef: "sha256:ref-B" })];
  const decision = decidePromotion(candidate({ proofs: [...records, proof("budget-bounded"), proof("no-authority")] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_INVALID", "type-safe"]]);
  assert.deepEqual(decision.guarantees.find(g => g.guaranteeId === "type-safe"), { guaranteeId: "type-safe", status: "invalid", proofRef: "sha256:ref-B" });
});

test("a required guarantee named twice is judged once", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe", "type-safe", "budget-bounded", "no-authority"], proofs: [proof("budget-bounded"), proof("no-authority")] }));
  assert.equal(decision.guarantees.filter(g => g.guaranteeId === "type-safe").length, 1);
  assert.equal(decision.refusals.length, 1);
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_MISSING", "type-safe"]]);
});

test("there is no override: extra input fields change nothing, the record has no force or status surface", () => {
  const forced = decidePromotion({ ...candidate({ proofs: [proof("type-safe", { status: "unproven" }), proof("budget-bounded"), proof("no-authority")] }), force: true, override: "owner", status: "closed" } as unknown as PromotionCandidate);
  assert.equal(forced.decision, "refuse");
  assert.deepEqual(Object.keys(forced).sort(), ["authority", "candidateHash", "candidateId", "decision", "guarantees", "refusals", "schema"]);
  assert.ok(!JSON.stringify(forced).includes("closed"));
});

test("the decision is deterministic, pure and mints no identifier", () => {
  const input = candidate({ requiredGuarantees: ["no-authority", "type-safe", "budget-bounded"], proofs: [proof("no-authority"), proof("budget-bounded", { status: "unproven" }), proof("type-safe")] });
  const before = JSON.stringify(input);
  const first = decidePromotion(input);
  const second = decidePromotion({ ...input, requiredGuarantees: [...input.requiredGuarantees].reverse(), proofs: [...input.proofs].reverse() });
  assert.equal(JSON.stringify(input), before);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  const known = new Set([...stringLeaves(input), first.schema, "promote", "refuse", "record-only", "proven", "unproven", "invalid", "missing", "stale", "unreferenced", UNKNOWN]);
  for (const leaf of stringLeaves(first.guarantees)) assert.ok(known.has(leaf), `minted ${leaf}`);
  for (const refusal of first.refusals) assert.ok(known.has(refusal.guaranteeId));
});

test("the proven judgement cites the least proofRef whatever order the records arrive in (kills M18)", () => {
  const forward = [proof("type-safe", { proofRef: "sha256:proof-b" }), proof("type-safe", { proofRef: "sha256:proof-a" })];
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: forward }));
  assert.deepEqual(decision.guarantees, [{ guaranteeId: "type-safe", status: "proven", proofRef: "sha256:proof-a" }]);
  const reversed = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [...forward].reverse() }));
  assert.equal(JSON.stringify(decision), JSON.stringify(reversed));
});

test("the stale refusal names every stale provedAgainst hash sorted, identically under any record order", () => {
  const records = [proof("type-safe", { provedAgainst: "sha256:cand-6" }), proof("type-safe", { provedAgainst: "sha256:cand-5" })];
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: records }));
  assert.equal(decision.refusals.length, 1);
  assert.equal(decision.refusals[0]!.code, "PROMOTION_GUARANTEE_PROOF_STALE");
  assert.ok(decision.refusals[0]!.detail.includes("sha256:cand-5, sha256:cand-6"));
  assert.ok(decision.refusals[0]!.detail.includes("sha256:cand-7"));
  assert.equal(decision.guarantees[0]!.status, "stale");
  const reversed = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [...records].reverse() }));
  assert.equal(reversed.refusals[0]!.detail, decision.refusals[0]!.detail);
  assert.equal(JSON.stringify(decision), JSON.stringify(reversed));
});

test("a refused guarantee never reads proven: the judgement names the refusal outcome (stale, unreferenced)", () => {
  const unreferenced = decidePromotion(candidate({ proofs: [proof("type-safe"), proof("budget-bounded"), proof("no-authority", { proofRef: "" })] }));
  assert.deepEqual(unreferenced.guarantees.find(g => g.guaranteeId === "no-authority"), { guaranteeId: "no-authority", status: "unreferenced", proofRef: UNKNOWN });
  assert.equal(unreferenced.refusals[0]!.code, "PROMOTION_GUARANTEE_PROOF_UNREFERENCED");
  const stale = decidePromotion(candidate({ proofs: [proof("type-safe", { provedAgainst: "sha256:cand-5" }), proof("budget-bounded"), proof("no-authority")] }));
  assert.equal(stale.guarantees.find(g => g.guaranteeId === "type-safe")!.status, "stale");
  for (const decision of [unreferenced, stale]) {
    const refused = new Set(decision.refusals.map(r => r.guaranteeId));
    for (const g of decision.guarantees) if (refused.has(g.guaranteeId)) assert.notEqual(g.status, "proven");
  }
});

test("a candidate that requires no guarantees promotes vacuously with guarantees and refusals empty (pinned as intended)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: [], proofs: [proof("type-safe", { status: "invalid" })] }));
  assert.deepEqual(decision, { schema: "mw.promotion-decision.v0", candidateId: "cand-7", candidateHash: HASH, decision: "promote", authority: "record-only", guarantees: [], refusals: [] });
});

test("multi-record guarantees are permutation-invariant in every field of the decision", () => {
  const proofs = [
    proof("type-safe", { proofRef: "sha256:proof-z" }), proof("type-safe", { proofRef: "sha256:proof-m" }),
    proof("budget-bounded", { provedAgainst: "sha256:cand-3" }), proof("budget-bounded", { provedAgainst: "sha256:cand-1" }), proof("budget-bounded", { provedAgainst: "sha256:cand-2" }),
    proof("no-authority"),
  ];
  const base = JSON.stringify(decidePromotion(candidate({ proofs })));
  const orders = [[...proofs].reverse(), [proofs[2]!, proofs[5]!, proofs[1]!, proofs[4]!, proofs[0]!, proofs[3]!], [proofs[3]!, proofs[0]!, proofs[4]!, proofs[1]!, proofs[5]!, proofs[2]!]];
  for (const order of orders) assert.equal(JSON.stringify(decidePromotion(candidate({ proofs: order, requiredGuarantees: ["no-authority", "budget-bounded", "type-safe"] }))), base);
  assert.ok(base.includes("sha256:cand-1, sha256:cand-2, sha256:cand-3"));
  assert.ok(base.includes("sha256:proof-m"));
});

test("ha4y G1: two unproven records for one guarantee cite the least proofRef however the records arrive", () => {
  const records = [proof("type-safe", { status: "unproven", proofRef: "sha256:ref-b" }), proof("type-safe", { status: "unproven", proofRef: "sha256:ref-a" })];
  const forward = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: records }));
  assert.deepEqual(forward.guarantees, [{ guaranteeId: "type-safe", status: "unproven", proofRef: "sha256:ref-a" }]);
  assert.deepEqual(forward.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_UNPROVEN", "type-safe"]]);
  const reversed = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [...records].reverse() }));
  assert.deepEqual(reversed.guarantees, [{ guaranteeId: "type-safe", status: "unproven", proofRef: "sha256:ref-a" }]);
  assert.equal(JSON.stringify(forward), JSON.stringify(reversed));
});

test("ha4y G2: the stale detail states the exact stale record count with singular and plural wording", () => {
  const one = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { provedAgainst: "sha256:cand-6" })] }));
  assert.equal(one.refusals[0]!.detail, "guarantee type-safe has 1 stale proof record, proved against sha256:cand-6, this candidate is sha256:cand-7");
  const two = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { provedAgainst: "sha256:cand-6" }), proof("type-safe", { provedAgainst: "sha256:cand-5" })] }));
  assert.equal(two.refusals[0]!.detail, "guarantee type-safe has 2 stale proof records, proved against sha256:cand-5, sha256:cand-6, this candidate is sha256:cand-7");
});

test("ha4y G3: a fresh proven record beside a stale one stays out of the stale count and the stale hash list", () => {
  const fresh = proof("type-safe", { proofRef: "sha256:proof-fresh" });
  const stale = proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: "sha256:proof-stale" });
  const expected = "guarantee type-safe has 1 stale proof record, proved against sha256:cand-6, this candidate is sha256:cand-7";
  for (const proofs of [[fresh, stale], [stale, fresh]]) {
    const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs }));
    assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId, r.detail]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe", expected]]);
    assert.deepEqual(decision.guarantees, [{ guaranteeId: "type-safe", status: "stale", proofRef: "sha256:proof-stale" }]);
  }
});

test("s5ld N1: an unproven record outranks a stale one for the same guarantee under either record order", () => {
  const unproven = proof("type-safe", { status: "unproven", proofRef: "sha256:ref-u" });
  const stale = proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: "sha256:ref-s" });
  for (const proofs of [[unproven, stale], [stale, unproven]]) {
    const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs }));
    assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_UNPROVEN", "type-safe"]]);
    assert.deepEqual(decision.guarantees, [{ guaranteeId: "type-safe", status: "unproven", proofRef: "sha256:ref-u" }]);
  }
});

test("s5ld N2: a stale record outranks an unreferenced one for the same guarantee under either record order", () => {
  const stale = proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: "sha256:ref-s" });
  const unreferenced = proof("type-safe", { proofRef: "" });
  for (const proofs of [[stale, unreferenced], [unreferenced, stale]]) {
    const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs }));
    assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
    assert.deepEqual(decision.guarantees, [{ guaranteeId: "type-safe", status: "stale", proofRef: "sha256:ref-s" }]);
  }
});

test("s5ld N3: an unproven record proved against another candidate refuses UNPROVEN, not STALE (status is read before the hash)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { status: "unproven", provedAgainst: "sha256:cand-6" })] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_UNPROVEN", "type-safe"]]);
  assert.equal(decision.guarantees[0]!.status, "unproven");
});

test("s5ld N4: an invalid record proved against another candidate refuses INVALID, not STALE (status is read before the hash)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { status: "invalid", provedAgainst: "sha256:cand-6" })] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_INVALID", "type-safe"]]);
  assert.equal(decision.guarantees[0]!.status, "invalid");
});

test("s5ld N5: the UNPROVEN refusal detail reads exactly 'guarantee <id> is recorded unproven'", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { status: "unproven" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee type-safe is recorded unproven");
});

test("s5ld N6: the INVALID refusal detail reads exactly 'guarantee <id> is recorded invalid'", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { status: "invalid" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee type-safe is recorded invalid");
});

test("s5ld N7: the MISSING refusal detail reads exactly 'required guarantee <id> has no proof record'", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [] }));
  assert.equal(decision.refusals[0]!.detail, "required guarantee type-safe has no proof record");
});

test("s5ld N8: the UNREFERENCED refusal detail reads exactly 'guarantee <id> is claimed proven without a proof reference'", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [proof("type-safe", { proofRef: "" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee type-safe is claimed proven without a proof reference");
});

test("nak2 D1: the UNPROVEN refusal detail interpolates the refused guarantee id, not a fixed one (second id no-network)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["no-network"], proofs: [proof("no-network", { status: "unproven" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee no-network is recorded unproven");
});

test("nak2 D2: the INVALID refusal detail interpolates the refused guarantee id, not a fixed one (second id no-network)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["no-network"], proofs: [proof("no-network", { status: "invalid" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee no-network is recorded invalid");
});

test("nak2 D3: the MISSING refusal detail interpolates the required guarantee id, not a fixed one (second id no-network)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["no-network"], proofs: [] }));
  assert.equal(decision.refusals[0]!.detail, "required guarantee no-network has no proof record");
});

test("nak2 D4: the UNREFERENCED refusal detail interpolates the refused guarantee id, not a fixed one (second id no-network)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["no-network"], proofs: [proof("no-network", { proofRef: "" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee no-network is claimed proven without a proof reference");
});

test("1f4o WS1: the STALE refusal detail interpolates the refused guarantee id, not a fixed one (second id no-network)", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["no-network"], proofs: [proof("no-network", { provedAgainst: "sha256:cand-6" })] }));
  assert.equal(decision.refusals[0]!.detail, "guarantee no-network has 1 stale proof record, proved against sha256:cand-6, this candidate is sha256:cand-7");
});

test("1f4o WM1: two MISSING refusals in one candidate each name their own required guarantee", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe", "no-network"], proofs: [] }));
  assert.deepEqual(decision.refusals.map(r => [r.guaranteeId, r.detail]), [
    ["no-network", "required guarantee no-network has no proof record"],
    ["type-safe", "required guarantee type-safe has no proof record"],
  ]);
});

test("1f4o WM2: two UNPROVEN refusals in one candidate each name their own guarantee", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe", "no-network"], proofs: [proof("type-safe", { status: "unproven" }), proof("no-network", { status: "unproven" })] }));
  assert.deepEqual(decision.refusals.map(r => [r.guaranteeId, r.detail]), [
    ["no-network", "guarantee no-network is recorded unproven"],
    ["type-safe", "guarantee type-safe is recorded unproven"],
  ]);
});

test("1f4o WL1: every refusal detail names its own guarantee id when one candidate refuses all five ways", () => {
  const decision = decidePromotion(candidate({
    requiredGuarantees: ["a-invalid", "b-missing", "c-unproven", "d-stale", "e-unreferenced"],
    proofs: [proof("a-invalid", { status: "invalid" }), proof("c-unproven", { status: "unproven" }), proof("d-stale", { provedAgainst: "sha256:cand-6" }), proof("e-unreferenced", { proofRef: "" })],
  }));
  assert.deepEqual(decision.refusals.map(r => r.code).sort(), ["PROMOTION_GUARANTEE_INVALID", "PROMOTION_GUARANTEE_MISSING", "PROMOTION_GUARANTEE_PROOF_STALE", "PROMOTION_GUARANTEE_PROOF_UNREFERENCED", "PROMOTION_GUARANTEE_UNPROVEN"]);
  for (const refusal of decision.refusals) assert.ok(refusal.detail.includes(`guarantee ${refusal.guaranteeId} `), `${refusal.code}: ${refusal.detail}`);
});

test("two STALE guarantees in one candidate each carry their own id, stale count and sorted hash list in the refusal detail", () => {
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe", "no-network"], proofs: [proof("type-safe", { provedAgainst: "sha256:cand-6" }), proof("type-safe", { provedAgainst: "sha256:cand-3" }), proof("no-network", { provedAgainst: "sha256:cand-5" })] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId, r.detail]), [
    ["PROMOTION_GUARANTEE_PROOF_STALE", "no-network", "guarantee no-network has 1 stale proof record, proved against sha256:cand-5, this candidate is sha256:cand-7"],
    ["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe", "guarantee type-safe has 2 stale proof records, proved against sha256:cand-3, sha256:cand-6, this candidate is sha256:cand-7"],
  ]);
});

test("an unreferenced record beside a stale one stays out of the stale count and the stale hash list under both record orders", () => {
  const stale = proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: "sha256:proof-stale" });
  const unreferenced = proof("type-safe", { proofRef: "" });
  const expected = "guarantee type-safe has 1 stale proof record, proved against sha256:cand-6, this candidate is sha256:cand-7";
  for (const proofs of [[stale, unreferenced], [unreferenced, stale]]) {
    const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs }));
    assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId, r.detail]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe", expected]]);
  }
});

test("two stale records proved against one shared hash count as two stale proof records, not one distinct hash", () => {
  const stale = (ref: string) => proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: ref });
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [stale("sha256:proof-a"), stale("sha256:proof-b")] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
  assert.match(decision.refusals[0]!.detail, /^guarantee type-safe has 2 stale proof records, proved against sha256:cand-6(, sha256:cand-6)?, this candidate is sha256:cand-7$/);
});

test("two stale records that name no candidate hash count as two stale proof records, not one distinct hash", () => {
  const unbound = (ref: string) => (({ provedAgainst: _dropped, ...rest }) => rest)(proof("type-safe", { proofRef: ref }));
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [unbound("sha256:proof-a"), unbound("sha256:proof-b")] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
  assert.match(decision.refusals[0]!.detail, /^guarantee type-safe has 2 stale proof records, proved against no candidate hash(, no candidate hash)?, this candidate is sha256:cand-7$/);
});

test("two byte-identical stale records count as two stale proof records, not one distinct record", () => {
  const twin = () => proof("type-safe", { provedAgainst: "sha256:cand-6" });
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [twin(), twin()] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
  assert.match(decision.refusals[0]!.detail, /^guarantee type-safe has 2 stale proof records, proved against sha256:cand-6(, sha256:cand-6)?, this candidate is sha256:cand-7$/);
});

test("the same stale proof object listed twice counts as two stale proof records, not one distinct object", () => {
  const record = proof("type-safe", { provedAgainst: "sha256:cand-6" });
  const decision = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [record, record] }));
  assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
  assert.match(decision.refusals[0]!.detail, /^guarantee type-safe has 2 stale proof records, proved against sha256:cand-6(, sha256:cand-6)?, this candidate is sha256:cand-7$/);
});

test("a bound and an unbound stale record under one guarantee name the no-candidate-hash marker beside the sorted real hash, identically under both record orders (a5wy ruling on the w6cb mixed list)", () => {
  const bound = proof("type-safe", { provedAgainst: "sha256:cand-6", proofRef: "sha256:proof-a" });
  const unbound = (({ provedAgainst: _dropped, ...rest }) => rest)(proof("type-safe", { proofRef: "sha256:proof-b" }));
  const forward = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [bound, unbound] }));
  const reversed = decidePromotion(candidate({ requiredGuarantees: ["type-safe"], proofs: [unbound, bound] }));
  for (const decision of [forward, reversed]) {
    assert.equal(decision.decision, "refuse");
    assert.deepEqual(decision.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_PROOF_STALE", "type-safe"]]);
    assert.equal(decision.refusals[0]!.detail, "guarantee type-safe has 2 stale proof records, proved against no candidate hash, sha256:cand-6, this candidate is sha256:cand-7");
    assert.deepEqual(decision.guarantees, [{ guaranteeId: "type-safe", status: "stale", proofRef: "sha256:proof-a" }]);
  }
  assert.equal(JSON.stringify(forward), JSON.stringify(reversed));
});
