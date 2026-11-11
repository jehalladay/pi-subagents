import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, affectedByScopeChange, classifyAbsence } from "../dist/index.js";
import type { CompletenessWitness, NegativeObservation } from "../dist/index.js";

function query(overrides: Partial<NegativeObservation> = {}): NegativeObservation {
  return { queryId: "q-1", domains: ["beads:MechanicalWorkflows", "ledger:candidates"], generation: "gen-7", matches: 0, ...overrides };
}
const witness = (overrides: Partial<CompletenessWitness> = {}): CompletenessWitness => ({ witnessId: "w-1", scope: ["ledger:candidates", "beads:MechanicalWorkflows"], generation: "gen-7", population: 108, ...overrides });

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("a positive observation is present and still records every domain it depended on, sorted and deduplicated", () => {
  const result = classifyAbsence(query({ matches: 3, domains: ["ledger:candidates", "beads:MechanicalWorkflows", "ledger:candidates"] }));
  assert.equal(result.schema, "mw.absence-classification.v0");
  assert.equal(result.status, "present");
  assert.equal(result.matches, 3);
  assert.deepEqual(result.dependsOn, ["beads:MechanicalWorkflows", "ledger:candidates"]);
  assert.equal(result.witness, UNKNOWN);
  assert.deepEqual(result.gaps, []);
});

test("a zero-match observation without a completeness witness stays UNKNOWN, and the queried domain is still a dependency", () => {
  const result = classifyAbsence(query());
  assert.equal(result.status, UNKNOWN);
  assert.deepEqual(result.gaps.map(g => g.code), ["ABSENCE_WITNESS_MISSING"]);
  assert.deepEqual(result.dependsOn, ["beads:MechanicalWorkflows", "ledger:candidates"]);
  assert.equal(result.witness, UNKNOWN);
});

test("a witness that enumerated every queried domain at the same generation turns zero matches into absence", () => {
  const result = classifyAbsence(query({ witness: witness() }));
  assert.equal(result.status, "absent");
  assert.equal(result.witness, "w-1");
  assert.deepEqual(result.gaps, []);
  const empty = classifyAbsence(query({ witness: witness({ population: 0 }) }));
  assert.equal(empty.status, "absent", "an enumerated empty population still has the power to detect absence");
});

test("a witness whose scope misses a queried domain leaves the observation UNKNOWN and names the uncovered domains", () => {
  const result = classifyAbsence(query({ domains: ["beads:MechanicalWorkflows", "ledger:candidates", "s3:artifacts"], witness: witness() }));
  assert.equal(result.status, UNKNOWN);
  assert.deepEqual(result.gaps.map(g => [g.code, g.detail]), [["ABSENCE_WITNESS_SCOPE_GAP", "s3:artifacts"]]);
  assert.equal(result.witness, "w-1", "the insufficient witness is still recorded, not hidden");
});

test("coverage and freshness are distinct: a complete witness from another generation does not certify this absence", () => {
  const result = classifyAbsence(query({ witness: witness({ generation: "gen-6" }) }));
  assert.equal(result.status, UNKNOWN);
  assert.deepEqual(result.gaps.map(g => g.code), ["ABSENCE_WITNESS_GENERATION_MISMATCH"]);
  assert.match(result.gaps[0]!.detail, /gen-6/);
  assert.match(result.gaps[0]!.detail, /gen-7/);
  const both = classifyAbsence(query({ domains: ["x:1"], witness: witness({ generation: "gen-6", scope: [] }) }));
  assert.deepEqual(both.gaps.map(g => g.code), ["ABSENCE_WITNESS_GENERATION_MISMATCH", "ABSENCE_WITNESS_SCOPE_GAP"]);
});

test("an interface rewrite that changes a depended-on domain invalidates the absence certificate and nothing else", () => {
  const absent = classifyAbsence(query({ witness: witness() }));
  assert.equal(affectedByScopeChange(absent, ["ledger:candidates"]), true);
  assert.equal(affectedByScopeChange(absent, ["s3:artifacts"]), false);
  assert.equal(affectedByScopeChange(absent, []), false);
  const unknown = classifyAbsence(query());
  assert.equal(affectedByScopeChange(unknown, ["ledger:candidates"]), false, "there is no certificate to invalidate");
  const present = classifyAbsence(query({ matches: 2 }));
  assert.equal(affectedByScopeChange(present, ["ledger:candidates"]), false);
});

test("the classification is pure, deterministic, mints no identifier and refuses a malformed match count", () => {
  const input = query({ witness: witness({ scope: ["ledger:candidates", "beads:MechanicalWorkflows", "s3:artifacts"] }) });
  const before = JSON.stringify(input);
  const first = classifyAbsence(input);
  const second = classifyAbsence({ ...input, domains: [...input.domains].reverse() });
  assert.equal(JSON.stringify(input), before);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  const known = new Set([...stringLeaves(input), first.schema, "absent", "present", UNKNOWN]);
  for (const leaf of [...first.dependsOn, first.witness, first.status]) assert.ok(known.has(leaf), `minted ${leaf}`);
  assert.throws(() => classifyAbsence(query({ matches: -1 })), /ABSENCE_MATCHES_INVALID/);
  assert.throws(() => classifyAbsence(query({ matches: 1.5 })), /ABSENCE_MATCHES_INVALID/);
  assert.throws(() => classifyAbsence(query({ witness: witness({ population: -3 }) })), /ABSENCE_WITNESS_POPULATION_INVALID/);
  assert.throws(() => classifyAbsence(query({ witness: witness({ population: 1.5 }) })), /ABSENCE_WITNESS_POPULATION_INVALID/, "a fractional row count is as malformed as a negative one");
});

test("a single match is already present: the boundary is one match, with or without a complete witness", () => {
  const bare = classifyAbsence(query({ matches: 1 }));
  assert.equal(bare.status, "present");
  assert.deepEqual(bare.gaps, []);
  const witnessed = classifyAbsence(query({ matches: 1, witness: witness() }));
  assert.equal(witnessed.status, "present");
  assert.deepEqual(witnessed.gaps, []);
});

test("the scope-gap detail names each uncovered domain once, sorted, whatever order or repetition the query listed them in", () => {
  const result = classifyAbsence(query({ domains: ["z:9", "a:1", "z:9", "m:5"], witness: witness({ scope: [] }) }));
  assert.equal(result.status, UNKNOWN);
  assert.deepEqual(result.gaps.map(g => [g.code, g.detail]), [["ABSENCE_WITNESS_SCOPE_GAP", "a:1, m:5, z:9"]]);
});

test("a zero-match observation that names no domain stays UNKNOWN with ABSENCE_QUERY_DOMAINS_EMPTY, never absent by vacuous scope coverage", () => {
  const result = classifyAbsence(query({ domains: [], witness: witness({ scope: [], population: 0 }) }));
  assert.equal(result.status, UNKNOWN);
  assert.deepEqual(result.gaps.map(g => g.code), ["ABSENCE_QUERY_DOMAINS_EMPTY"]);
  assert.match(result.gaps[0]!.detail, /q-1/);
  assert.deepEqual(result.dependsOn, []);
  assert.equal(result.witness, "w-1", "the insufficient witness is still recorded, not hidden");
  const twin = classifyAbsence(query({ domains: [] }));
  assert.equal(twin.status, UNKNOWN);
  assert.deepEqual(twin.gaps.map(g => g.code), ["ABSENCE_QUERY_DOMAINS_EMPTY", "ABSENCE_WITNESS_MISSING"], "the gaps stay the complete sorted account");
  assert.equal(twin.witness, UNKNOWN);
});

test("a zero-domain classification is not a certificate: affectedByScopeChange has nothing to invalidate, and the ruling binds zero-match observations only", () => {
  const zero = classifyAbsence(query({ domains: [], witness: witness({ scope: [], population: 0 }) }));
  assert.equal(affectedByScopeChange(zero, ["beads:MechanicalWorkflows"]), false);
  assert.equal(affectedByScopeChange(zero, []), false);
  const present = classifyAbsence(query({ matches: 3, domains: [] }));
  assert.equal(present.status, "present");
  assert.deepEqual(present.gaps, []);
  const scopeGap = classifyAbsence(query({ domains: ["beads:MechanicalWorkflows"], witness: witness({ scope: [] }) }));
  assert.equal(scopeGap.status, UNKNOWN);
  assert.deepEqual(scopeGap.gaps.map(g => [g.code, g.detail]), [["ABSENCE_WITNESS_SCOPE_GAP", "beads:MechanicalWorkflows"]], "an empty witness scope is a scope gap, never a domains-empty gap");
});
