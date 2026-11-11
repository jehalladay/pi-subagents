import { strict as assert } from "node:assert";
import { test } from "node:test";
import { validateRewriteBoundary } from "../dist/index.js";
import type { PolicyGraphManifest, RewriteCandidate, RewriteChange } from "../dist/index.js";

const parent: PolicyGraphManifest = {
  schema: "mw.policy-graph.v1", graphId: "g-1", revision: "g-1@4", parentRevision: "g-1@3", exactBasisPolicy: "fifo",
  requiredContracts: ["contract:budget-cap", "verifier:forge-gate"], implementationRefs: ["impl:fifo"],
  nodes: [{ id: "n-fifo", kind: "policy" }, { id: "n-guard", kind: "guard" }], edges: [{ from: "n-fifo", to: "n-guard", temporal: "instant" }],
};
const change = (kind: RewriteChange["kind"], id: string, op: RewriteChange["op"] = "modify"): RewriteChange => ({ kind, id, op });
function candidate(overrides: Partial<RewriteCandidate> = {}): RewriteCandidate {
  return { candidateId: "cand-1", parentRevision: "g-1@4", changes: [change("node", "n-heuristic", "add"), change("edge", "n-fifo->n-heuristic", "add"), change("port", "n-guard.in", "modify")], requiredCertificates: ["contract:budget-cap", "verifier:forge-gate"], ...overrides };
}
function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("a rewrite that changes only structure (nodes, ports, edges) and keeps every required certificate is within the writable surface", () => {
  const result = validateRewriteBoundary(candidate(), parent);
  assert.equal(result.schema, "mw.rewrite-boundary.v0");
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.writable, ["edge:n-fifo->n-heuristic", "node:n-heuristic", "port:n-guard.in"]);
});

test("a change to an authority check is outside every rewrite's writable surface, whatever the operation", () => {
  for (const op of ["add", "remove", "modify"] as const) {
    const result = validateRewriteBoundary(candidate({ changes: [change("authority", "authz:effect", op)] }), parent);
    assert.equal(result.ok, false);
    assert.deepEqual(result.refusals.map(r => [r.code, r.id]), [["REWRITE_TOUCHES_AUTHORITY", "authz:effect"]]);
    assert.deepEqual(result.writable, []);
  }
});

test("a change to a required native verifier or to the execution protocol is refused by its own code", () => {
  const result = validateRewriteBoundary(candidate({ changes: [change("protocol", "exec:indeterminate-exit-12"), change("verifier", "verifier:forge-gate", "remove"), change("node", "n-ok", "add")] }), parent);
  assert.deepEqual(result.refusals.map(r => [r.code, r.id]), [
    ["REWRITE_TOUCHES_PROTOCOL", "exec:indeterminate-exit-12"],
    ["REWRITE_TOUCHES_REQUIRED_CONTRACT", "verifier:forge-gate"],
    ["REWRITE_TOUCHES_VERIFIER", "verifier:forge-gate"],
  ]);
  assert.deepEqual(result.writable, ["node:n-ok"]);
});

test("a required contract of the parent graph cannot be touched through any change kind, not even one labelled as a node", () => {
  const result = validateRewriteBoundary(candidate({ changes: [change("node", "contract:budget-cap"), change("contract", "contract:budget-cap", "remove")] }), parent);
  assert.deepEqual(result.refusals.map(r => [r.code, r.id]), [["REWRITE_TOUCHES_REQUIRED_CONTRACT", "contract:budget-cap"], ["REWRITE_TOUCHES_REQUIRED_CONTRACT", "contract:budget-cap"]]);
  assert.equal(result.ok, false);
  assert.deepEqual(result.writable, []);
});

test("two refusals with the same code and id are ordered by detail, whatever order the changes arrive in", () => {
  const changes = [change("node", "contract:budget-cap"), change("contract", "contract:budget-cap", "remove")];
  const forward = validateRewriteBoundary(candidate({ changes }), parent);
  const backward = validateRewriteBoundary(candidate({ changes: [...changes].reverse() }), parent);
  assert.deepEqual(forward.refusals.map(r => r.detail.split(" ")[0]), ["modify", "remove"]);
  assert.deepEqual(backward.refusals, forward.refusals);
  assert.deepEqual(backward.writable, []);
});

test("two refusals with the same code and different ids are ordered by id, whatever order the changes arrive in", () => {
  const changes = [change("authority", "authz:b", "add"), change("authority", "authz:a", "remove")];
  const forward = validateRewriteBoundary(candidate({ changes }), parent);
  const backward = validateRewriteBoundary(candidate({ changes: [...changes].reverse() }), parent);
  assert.deepEqual(forward.refusals.map(r => [r.code, r.id]), [["REWRITE_TOUCHES_AUTHORITY", "authz:a"], ["REWRITE_TOUCHES_AUTHORITY", "authz:b"]]);
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
});

test("a contract change the parent does not require is refused as not structure, with nothing writable", () => {
  const result = validateRewriteBoundary(candidate({ changes: [change("contract", "contract:latency-bound", "remove")] }), parent);
  assert.equal(result.ok, false);
  assert.deepEqual(result.writable, []);
  assert.equal(result.refusals.length, 1);
  assert.deepEqual([result.refusals[0]!.id], ["contract:latency-bound"]);
  assert.equal(result.refusals[0]!.code, "REWRITE_TOUCHES_REQUIRED_CONTRACT"); // the code is owner call Q8 on a5wy; move this one assertion if it changes
  assert.match(result.refusals[0]!.detail, /contracts are not structure/);
});

test("the required set is the parent's, not the candidate's: a dropped certificate modified as a node is refused for both reasons", () => {
  const result = validateRewriteBoundary(candidate({ requiredCertificates: ["verifier:forge-gate"], changes: [change("node", "contract:budget-cap")] }), parent);
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.id]), [["REWRITE_DROPS_REQUIRED_CERTIFICATE", "contract:budget-cap"], ["REWRITE_TOUCHES_REQUIRED_CONTRACT", "contract:budget-cap"]]);
  assert.deepEqual(result.writable, []);
});

test("a rewrite may add required certificates but never drop one the parent requires", () => {
  const dropped = validateRewriteBoundary(candidate({ requiredCertificates: ["contract:budget-cap"] }), parent);
  assert.deepEqual(dropped.refusals.map(r => [r.code, r.id]), [["REWRITE_DROPS_REQUIRED_CERTIFICATE", "verifier:forge-gate"]]);
  const added = validateRewriteBoundary(candidate({ requiredCertificates: ["verifier:forge-gate", "contract:budget-cap", "contract:latency-bound"] }), parent);
  assert.equal(added.ok, true);
});

test("a candidate rewriting another revision than the parent given is refused before anything else is judged", () => {
  const result = validateRewriteBoundary(candidate({ parentRevision: "g-1@3", changes: [change("authority", "authz:effect")] }), parent);
  assert.deepEqual(result.refusals.map(r => r.code), ["REWRITE_PARENT_MISMATCH"]);
  assert.match(result.refusals[0]!.detail, /g-1@3/);
  assert.match(result.refusals[0]!.detail, /g-1@4/);
  assert.equal(result.ok, false);
  assert.deepEqual(result.writable, []);
});

test("the validation is deterministic, pure and mints no identifier", () => {
  const input = candidate({ changes: [change("port", "n-guard.in"), change("authority", "authz:effect"), change("node", "n-heuristic", "add")], requiredCertificates: ["verifier:forge-gate"] });
  const before = JSON.stringify({ input, parent });
  const forward = validateRewriteBoundary(input, parent);
  const backward = validateRewriteBoundary({ ...input, changes: [...input.changes].reverse() }, parent);
  assert.equal(JSON.stringify({ input, parent }), before);
  assert.equal(JSON.stringify(forward), JSON.stringify(backward));
  assert.deepEqual(forward.refusals.map(r => r.code), ["REWRITE_DROPS_REQUIRED_CERTIFICATE", "REWRITE_TOUCHES_AUTHORITY"]);
  const known = new Set([...stringLeaves(input), ...stringLeaves(parent), forward.schema]);
  for (const entry of forward.writable) for (const part of entry.split(/:(.*)/s).filter(Boolean)) assert.ok(known.has(part), `minted ${part}`);
  for (const refusal of forward.refusals) assert.ok(known.has(refusal.id));
});
