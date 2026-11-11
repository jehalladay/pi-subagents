// MechanicalWorkflows-2e56 (hnqv.1 follow-up, test-only). Evidence grade FIXTURE: no assertion
// here earns a native grade. Pins four laws of pre-sampling-support.ts that the hnqv.1 rows left
// to mutation survivors: G01 the enumerator runs the graph check itself, G02 a permission counts
// only when it is exactly true, G05 an Object.prototype role name is an unknown role (never a bare
// TypeError), G06 the support follows vocabulary order, not capacity or permission key order.
import test from "node:test";
import assert from "node:assert/strict";
import { enumeratePreSamplingSupport, exportRoleAwareGraph, withPreSamplingSupport } from "../dist/index.js";
import type { GraphDataNode } from "../dist/index.js";

const nodes: GraphDataNode[] = [
  { sourceId: "agent:worker-1", kind: "agent" },
  { sourceId: "task:restack-c1", kind: "task" },
  { sourceId: "resource:lane-1", kind: "resource" },
];
const capacity = { "agent:worker-1": 1, "task:restack-c1": 1, "resource:lane-1": 1 };
const permitted = { "agent:worker-1": true, "task:restack-c1": true, "resource:lane-1": true };
const enumerate = (ns: unknown[], over: Record<string, unknown> = {}) =>
  enumeratePreSamplingSupport({ graph: { nodes: ns as GraphDataNode[] }, capacity, permitted, ...over } as never);

test("G01: the enumerator refuses a malformed graph itself, before it reads capacity or permission", () => {
  assert.throws(() => enumerate([{ sourceId: "a", kind: "mystery" }]), /GRAPH_DATA_INVALID/);
  assert.throws(() => enumerate([{ sourceId: " ", kind: "task" }]), /GRAPH_DATA_INVALID/);
  assert.throws(() => enumerate([{ sourceId: "a", kind: "task" }, { sourceId: "a", kind: "agent" }]), /GRAPH_DATA_INVALID/);
  assert.throws(() => enumerate([{ sourceId: "a", kind: "task", revision: "r9" }]), /GRAPH_ENTITY_REVISION_UNSUPPORTED/);
  assert.throws(() => enumerate([{ sourceId: "a", kind: "mystery" }], { capacity: undefined, permitted: undefined }), /GRAPH_DATA_INVALID/, "absent inputs do not bypass the graph check");
});

test("G02: a truthy permission that is not exactly true keeps the member out of the support", () => {
  for (const loose of [1, "true", "yes", {}, []]) {
    const result = enumerate(nodes, { permitted: { ...permitted, "task:restack-c1": loose } });
    assert.equal(result.ok, true, String(loose));
    assert.deepEqual(result.ok && result.support, ["agent:worker-1", "resource:lane-1"], `permission ${JSON.stringify(loose)} is not exactly true`);
  }
});

test("G05: an Object.prototype role name is an unknown role, refused by code and never a bare TypeError", () => {
  const roleKinds = { planner: ["task"] } as const;
  for (const role of ["toString", "constructor", "hasOwnProperty", "__proto__"]) {
    let thrown: unknown;
    try { exportRoleAwareGraph({ graph: { nodes }, role, roleKinds, maxNodes: 4 }); } catch (error) { thrown = error; }
    assert.ok(thrown instanceof RangeError, `${role} throws a RangeError, not ${String(thrown)}`);
    assert.match((thrown as Error).message, /GRAPH_EXPORT_ROLE_UNKNOWN/, role);
  }
});

test("G06: the support follows vocabulary order whatever order the capacity and permission keys arrive in", () => {
  const reversed = (record: Record<string, unknown>) => Object.fromEntries(Object.entries(record).reverse());
  const result = enumerate(nodes, { capacity: reversed(capacity), permitted: reversed(permitted) });
  assert.deepEqual(Object.keys(reversed(capacity)), ["resource:lane-1", "task:restack-c1", "agent:worker-1"], "control: the keys really arrive reversed");
  assert.deepEqual(result.ok && result.support, ["agent:worker-1", "task:restack-c1", "resource:lane-1"]);
});

// MechanicalWorkflows-dsvb (2e56 follow-up, test-only): X01 the role-table kind check covers every role, G07 the export projects exactly sourceId and kind.
test("X01: an unknown kind under a role that was not requested still refuses the whole role table", () => {
  const request = (workerKinds: string[]) => ({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"], worker: workerKinds } as never, maxNodes: 4 });
  assert.throws(() => exportRoleAwareGraph(request(["mystery"])), /GRAPH_DATA_INVALID/, "an unknown kind under another role still refuses the table");
  const control = exportRoleAwareGraph(request(["agent"]));
  assert.deepEqual(control.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }], "control: the same table with a known worker kind exports for the requested role");
});

test("G07: the exported node carries exactly sourceId and kind, never an extra field the input node held", () => {
  const withExtra = [{ sourceId: "task:restack-c1", kind: "task", label: "extra" }] as never as GraphDataNode[];
  const out = exportRoleAwareGraph({ graph: { nodes: withExtra }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes: 4 });
  assert.deepEqual(out.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
  assert.deepEqual(Object.keys(out.graph.nodes[0]!).sort(), ["kind", "sourceId"]);
});

// MechanicalWorkflows-dvsk (dsvb follow-up, test-only): V01 the export echoes the requested bound, V02 the role-table refusal names the offending role and kind, V03 a single-key post-admission offer is refused by its own code.
test("V01: the export echoes the requested maxNodes, never the visible node count", () => {
  const one = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes: 4 });
  assert.equal(one.graph.nodes.length, 1, "control: one node is visible");
  assert.equal(one.maxNodes, 4, "the echoed bound is the requested 4, not the 1 visible node");
  const three = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["agent", "task", "resource"] }, maxNodes: 7 });
  assert.equal(three.graph.nodes.length, 3, "control: three nodes are visible");
  assert.equal(three.maxNodes, 7, "the echoed bound is the requested 7, not the 3 visible nodes");
});

test("V02: the role-table refusal names the offending role and its unknown kind", () => {
  const request = { graph: { nodes }, role: "planner", roleKinds: { planner: ["task"], worker: ["agent", "mystery"] } as never, maxNodes: 4 };
  assert.throws(
    () => exportRoleAwareGraph(request),
    (error: unknown) => error instanceof RangeError && error.message === "GRAPH_DATA_INVALID: role worker names a kind outside the closed enum: mystery",
  );
});

test("V03: a post-admission offer carrying only one of admitted or rejected is refused as post-admission, not as an invalid offer", () => {
  const receipt = { support: "unknown" } as never;
  for (const offered of [{ admitted: ["task:restack-c1"] }, { rejected: [] }]) {
    assert.throws(
      () => withPreSamplingSupport(receipt, offered as never),
      (error: unknown) => error instanceof RangeError && error.message.startsWith("PRE_SAMPLING_SUPPORT_POST_ADMISSION:"),
      JSON.stringify(offered),
    );
  }
  assert.throws(() => withPreSamplingSupport(receipt, {} as never), /PRE_SAMPLING_OFFER_INVALID/, "control: an object with neither key keeps the invalid-offer code");
});

// MechanicalWorkflows-sq9m (dvsk follow-up, test-only, wording-level): W1 the over-bound refusal names the role, the visible count and the bound, W2 the unknown-role refusal names the role, W3 an invalid bound is echoed in its refusal. Each pin reads the exact message and the RangeError class.
const refusal = (message: string) => (error: unknown) => error instanceof RangeError && error.message === message;

test("W1: the over-bound refusal names the role, the visible node count and the bound", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["agent", "task", "resource"] }, maxNodes: 2 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 3 nodes, over the bound 2"),
  );
  const control = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["agent", "task", "resource"] }, maxNodes: 3 });
  assert.equal(control.graph.nodes.length, 3, "control: a bound equal to the visible count exports instead of refusing");
});

test("W2: the unknown-role refusal names the role that has no declared node kinds", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "auditor", roleKinds: { planner: ["task"] }, maxNodes: 4 }),
    refusal("GRAPH_EXPORT_ROLE_UNKNOWN: role auditor has no declared node kinds"),
  );
});

test("W3: an invalid bound is echoed in its refusal, zero, a fraction and NaN alike", () => {
  for (const [maxNodes, shown] of [[0, "0"], [2.5, "2.5"], [Number.NaN, "NaN"]] as const) {
    assert.throws(
      () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes }),
      refusal(`GRAPH_EXPORT_BOUND_INVALID: maxNodes ${shown} is not a positive safe integer`),
      `maxNodes ${shown}`,
    );
  }
});

// MechanicalWorkflows-d8b1 (sq9m follow-up, test-only): WB1 the over-bound refusal counts the nodes the role sees, not the whole vocabulary; WB2 a bound past the safe-integer range and an infinite bound are refused and echoed, so the check stays Number.isSafeInteger and never weakens to Number.isInteger.
test("WB1: the over-bound refusal counts the nodes the role sees, not the vocabulary", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("WB2: an unsafe-integer bound and an infinite bound are refused and echoed", () => {
  for (const [maxNodes, shown] of [[2 ** 53, "9007199254740992"], [Number.POSITIVE_INFINITY, "Infinity"]] as const) {
    assert.throws(
      () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes }),
      refusal(`GRAPH_EXPORT_BOUND_INVALID: maxNodes ${shown} is not a positive safe integer`),
      `maxNodes ${shown}`,
    );
  }
});

// MechanicalWorkflows-c6rm (d8b1 follow-up, test-only): K1 the over-bound count is the visible nodes, not the declared kinds; K2 it is the visible nodes, not the bound plus one; K3 the largest safe integer is an admitted bound and is echoed.
test("K1: the over-bound refusal counts the visible nodes, not the kinds the role declares", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource", "artifact"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("K2: the over-bound refusal counts the visible nodes, not the bound plus one", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["agent", "task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 3 nodes, over the bound 1"),
  );
});

test("K3: the largest safe integer is an admitted bound and the export echoes it", () => {
  const out = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes: Number.MAX_SAFE_INTEGER });
  assert.equal(out.maxNodes, 9007199254740991);
  assert.deepEqual(out.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

// MechanicalWorkflows-nws3 (c6rm follow-up, test-only): N1 the over-bound count is every visible node, not the distinct visible kinds; N2 it counts the kinds this role sees, not the kinds any declared role may see; N3 the bound echo carries digits only at four digits, never a locale-grouped form.
test("N1: the over-bound refusal counts every visible node, not the distinct kinds among them", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes: [...nodes, { sourceId: "agent:worker-2", kind: "agent" }] }, role: "planner", roleKinds: { planner: ["agent"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("N2: the over-bound refusal counts what this role sees, not what any declared role may see", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource"], worker: ["agent"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("N3: a four-digit bound is echoed as plain digits in the over-bound refusal", () => {
  const many: GraphDataNode[] = Array.from({ length: 1001 }, (_, index) => ({ sourceId: `task:bulk-${index}`, kind: "task" }));
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes: many }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes: 1000 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 1001 nodes, over the bound 1000"),
  );
});

// MechanicalWorkflows-kis0 (nws3 follow-up, test-only): K4 the over-bound refusal names the requested role, not a fixed role; K5 a five-digit bound and count are echoed as plain digits, never a locale form that groups only from five digits.
test("K4: the over-bound refusal names the requested role, not a fixed role", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { worker: ["agent", "task"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("K5: a five-digit bound and count are echoed as plain digits in the over-bound refusal", () => {
  const many: GraphDataNode[] = Array.from({ length: 10001 }, (_, index) => ({ sourceId: `task:bulk5-${index}`, kind: "task" }));
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes: many }, role: "planner", roleKinds: { planner: ["task"] }, maxNodes: 10000 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 10001 nodes, over the bound 10000"),
  );
});

// MechanicalWorkflows-se73 (kis0 follow-up, test-only): OW1 the over-bound refusal names the requested role when it is the second declared role; OW2 it names the requested role when it is neither the first nor the last declared role. A refusal that names the first declared role of the table survives every earlier row, because each of those rows requests the first declared role or declares only the requested role.
test("OW1: the over-bound refusal names the requested role when it is the second declared role of the table", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task"], worker: ["agent", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("OW2: the over-bound refusal names the requested role when it is neither the first nor the last declared role", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task"], worker: ["agent", "resource"], auditor: ["artifact"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

// MechanicalWorkflows-8ooy (se73 follow-up, test-only): Z1 the over-bound refusal names the requested role although an earlier-declared role is over the bound too; Z2 the bound applies to the requested role only, so an unrequested role that sees more than maxNodes does not refuse the export. A refusal that scans the table for the first over-bound role survives OW1/OW2, whose earlier-declared role stays within the bound, and a trigger that fires when any role is over the bound survives every row that declares no unrequested over-bound role.
test("Z1: the over-bound refusal names the requested role although the earlier-declared role is over the bound too", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["agent", "task", "resource"], worker: ["agent", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("Z2: the bound applies to the requested role only, so an unrequested role over the bound does not refuse the export", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["agent", "task", "resource"], worker: ["task"] }, maxNodes: 1 });
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
  assert.equal(exported.role, "worker");
  assert.equal(exported.maxNodes, 1);
});

// MechanicalWorkflows-08hm (8ooy follow-up, test-only): WZ1 the over-bound refusal names the requested role when it is declared first and sees MORE nodes than a later over-bound role; WZ1b it names the requested role when it is declared between two over-bound roles; WR1 the success echo names the requested role when an earlier-declared role is within the bound. A refusal that names the last over-bound role of the table, or the over-bound role with the fewest nodes, survives Z1 (requested worker is last and smallest), and a success echo that names the first within-bound role survives Z2 (worker is the only within-bound role).
test("WZ1: the over-bound refusal names the requested role when it is declared first and sees more nodes than a later over-bound role", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["agent", "task", "resource"], worker: ["agent", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 3 nodes, over the bound 1"),
  );
});

test("WZ1b: the over-bound refusal names the requested role when it is declared between two over-bound roles", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["agent", "task"], worker: ["agent", "task", "resource"], auditor: ["agent", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 3 nodes, over the bound 1"),
  );
});

test("WR1: the success echo names the requested role when it is declared after a within-bound role and before another", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["agent"], worker: ["task"], auditor: ["resource"] }, maxNodes: 1 });
  assert.equal(exported.role, "worker");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

// MechanicalWorkflows-e3lp (08hm follow-up, test-only): G1 the over-bound refusal names the requested role when an earlier-declared over-bound role sees the SAME node count (a lookup of the first declared role with an equal count survives WZ1, WZ1b and Z1); G2 the success echo names the requested role when an earlier-declared role has the IDENTICAL visible set (a lookup of the first declared role with an equal visible set survives Z2 and WR1); G3 the success echo names the first declared role when it is the requested one (an echo of the second declared role survives the rows above and dies only in hnqv.1).
test("G1: the over-bound refusal names the requested role when an earlier-declared over-bound role sees the same node count", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["agent", "task"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("G2: the success echo names the requested role when an earlier-declared role has the identical visible set", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task"], worker: ["task"] }, maxNodes: 1 });
  assert.equal(exported.role, "worker");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

test("G3: the success echo names the first declared role when it is the requested role of a multi-role table", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"], worker: ["agent"] }, maxNodes: 1 });
  assert.equal(exported.role, "planner");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

// MechanicalWorkflows-q5r0 (e3lp follow-up, test-only): R1 the over-bound refusal names the requested role when an earlier-declared role sees the IDENTICAL node set through a DIFFERENT declared kinds list (a lookup of the first declared role with an equal visible set survives every row above and dies here and in R2); R2 the same refusal when an earlier-declared role has the IDENTICAL declared kinds list (a lookup of the first declared role with an equal kinds list dies only here).
test("R1: the over-bound refusal names the requested role when an earlier-declared role sees the identical node set through a different kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["resource", "task"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("R2: the over-bound refusal names the requested role when an earlier-declared role has the identical declared kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task", "resource"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

// MechanicalWorkflows-p9zw (q5r0 follow-up, test-only): the requested FIRST-declared role must be named by the over-bound refusal (S1, S2) and by the success echo (S3, S4) when a LATER-declared role shares its visible set or its declared kinds list (a lookup of the LAST declared role with an equal visible set or an equal kinds list survives every row above). S1 isolates the visible-set lookup in the refusal (different kinds lists, one node set); S2 kills both refusal lookups; S3 isolates the visible-set lookup in the echo; S4 kills both echo lookups.
test("S1: the over-bound refusal names the requested first-declared role when a later-declared role sees the identical node set through a different kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource"], worker: ["resource", "task"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("S2: the over-bound refusal names the requested first-declared role when a later-declared role has the identical declared kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("S3: the success echo names the requested first-declared role when a later-declared role sees the identical node set through a different kinds list", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "artifact"], worker: ["task"] }, maxNodes: 1 });
  assert.equal(exported.role, "planner");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

test("S4: the success echo names the requested first-declared role when a later-declared role has the identical declared kinds list", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"], worker: ["task"] }, maxNodes: 1 });
  assert.equal(exported.role, "planner");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

// MechanicalWorkflows-wva4 (p9zw follow-up, test-only): the requested role must be named by the over-bound refusal (U1, U2) and by the success echo (U3) when a sharer of the IDENTICAL visible set declares a strictly LONGER or strictly SHORTER kinds list (a sharer lookup keyed on the declared list length survives every row above, where every sharing pair declares lists of equal length, and dies here; 'artifact' matches no fixture node, so the longer list keeps the identical visible set). Source lead: p9zw-closes-q5r0-follow-up-lead run116 06-aup-acceptance-pack c6 (X1..X3).
test("U1: the over-bound refusal names the requested role when an earlier-declared sharer of its visible set declares a strictly longer kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task", "resource", "artifact"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("U2: the over-bound refusal names the requested role when a later-declared sharer of its visible set declares a strictly shorter kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource", "artifact"], worker: ["task", "resource"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("U3: the success echo names the requested role when an earlier-declared sharer of its visible set declares a strictly longer kinds list", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task", "artifact"], worker: ["task"] }, maxNodes: 1 });
  assert.equal(exported.role, "worker");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

// MechanicalWorkflows-z5zp (wva4 follow-up, test-only): the requested role must be named by the over-bound refusal (X1, X2) and by the success echo (X3, X4) when a sharer of the IDENTICAL visible set sits on the OTHER declaration side from U1..U3 (a sharer lookup keyed on the declared list length and confined to one declaration side survives U1..U3 and dies here): X1 and X3 request the earlier-declared role whose list is shorter than a later-declared sharer's, X2 and X4 request the later-declared role whose list is longer than an earlier-declared sharer's. Together with U1..U3 the sharer family is pinned at declaration side x list length x surface. Source lead: wva4-closes-p9zw-lead run117 06-aup-acceptance-pack c8 (X1..X4).
test("X1: the over-bound refusal names the requested role when a later-declared sharer of its visible set declares a strictly longer kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task", "resource"], worker: ["task", "resource", "artifact"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role planner sees 2 nodes, over the bound 1"),
  );
});

test("X2: the over-bound refusal names the requested role when an earlier-declared sharer of its visible set declares a strictly shorter kinds list", () => {
  assert.throws(
    () => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task", "resource"], worker: ["task", "resource", "artifact"] }, maxNodes: 1 }),
    refusal("GRAPH_EXPORT_OVER_BOUND: role worker sees 2 nodes, over the bound 1"),
  );
});

test("X3: the success echo names the requested role when a later-declared sharer of its visible set declares a strictly longer kinds list", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds: { planner: ["task"], worker: ["task", "artifact"] }, maxNodes: 1 });
  assert.equal(exported.role, "planner");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});

test("X4: the success echo names the requested role when an earlier-declared sharer of its visible set declares a strictly shorter kinds list", () => {
  const exported = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds: { planner: ["task"], worker: ["task", "artifact"] }, maxNodes: 1 });
  assert.equal(exported.role, "worker");
  assert.equal(exported.maxNodes, 1);
  assert.deepEqual(exported.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }]);
});
