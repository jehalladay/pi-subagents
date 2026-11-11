import { strict as assert } from "node:assert";
import { test } from "node:test";
import { GRAPH_NODE_KINDS, READER_SUPPORTED, UNKNOWN, readGraphRecord } from "../dist/index.js";

const graph = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  schema: "mw.policy-graph.v1",
  graphId: "g1",
  revision: "r7",
  parentRevision: "r6",
  exactBasisPolicy: "p:base",
  requiredContracts: ["c:budget"],
  implementationRefs: ["impl:a"],
  nodes: [{ id: "o", kind: "observation" }, { id: "p", kind: "numeric-policy" }, { id: "out", kind: "output" }],
  edges: [{ from: "o", to: "p", temporal: "instant" }, { from: "p", to: "out", temporal: "instant" }],
  ...overrides,
});
const ok = (value: unknown) => { const out = readGraphRecord(value); assert.equal(out.ok, true, JSON.stringify(out)); return out.ok ? out : (undefined as never); };
const refused = (value: unknown) => { const out = readGraphRecord(value); assert.equal(out.ok, false, JSON.stringify(out)); return out.ok ? (undefined as never) : out; };

test("the reader implements nine node kinds and three schema families at one major each; the tables are frozen", () => {
  assert.deepEqual([...GRAPH_NODE_KINDS], ["observation", "pure-transform", "numeric-policy", "deterministic-policy", "conditional-selector", "guard", "bounded-option", "composition", "output"]);
  assert.deepEqual(READER_SUPPORTED, { "mw.policy-graph": 1, "mw.episode": 1, "mw.training-export": 1 });
  assert.ok(Object.isFrozen(GRAPH_NODE_KINDS) && Object.isFrozen(READER_SUPPORTED));
});

test("a graph sidecar at the supported major reads its nodes as graph support, and additive members are kept out of the interpretation and reported by path, never dropped silently", () => {
  const out = ok(graph({ provenance: { author: "x" }, nodes: [{ id: "o", kind: "observation", freshness: "5m" }, { id: "p", kind: "numeric-policy" }], edges: [{ from: "o", to: "p", temporal: "instant", weight: 0.3 }] }));
  assert.equal(out.schema, "mw.graph-read.v0");
  assert.equal(out.family, "mw.policy-graph");
  assert.equal(out.major, 1);
  assert.equal(out.support, "graph");
  assert.deepEqual(out.nodes, [{ id: "o", kind: "observation" }, { id: "p", kind: "numeric-policy" }]);
  assert.deepEqual(out.unread, ["edges.0.weight", "nodes.0.freshness", "provenance"]);
  assert.deepEqual(ok(graph()).unread, []);
});

test("acceptance, fail closed on an unknown construct: a node kind outside the nine refuses with the construct's path, and so does an edge temporal operator outside instant/delayed", () => {
  const kind = refused(graph({ nodes: [{ id: "o", kind: "observation" }, { id: "z", kind: "learned-router" }] }));
  assert.equal(kind.code, "READER_CONSTRUCT_UNKNOWN");
  assert.equal(kind.path, "nodes.1.kind");
  const opcode = refused(graph({ edges: [{ from: "o", to: "p", temporal: "eventual" }] }));
  assert.equal(opcode.code, "READER_OPCODE_UNKNOWN");
  assert.equal(opcode.path, "edges.0.temporal");
  assert.equal(refused(graph({ nodes: ["not-a-node"] })).code, "READER_CONSTRUCT_UNKNOWN");
});

test("fail closed on version: a major the reader does not implement is refused rather than read as the nearest one; an unknown schema family is refused; a non-record is refused", () => {
  const major = refused(graph({ schema: "mw.policy-graph.v2" }));
  assert.equal(major.code, "READER_MAJOR_UNSUPPORTED");
  assert.equal(major.path, "schema");
  assert.equal(refused({ schema: "mw.policy-graph.v0" }).code, "READER_MAJOR_UNSUPPORTED");
  assert.equal(refused({ schema: "mw.quantum-graph.v1" }).code, "READER_SCHEMA_UNKNOWN");
  assert.equal(refused({ schema: "policy-graph" }).code, "READER_SCHEMA_UNKNOWN");
  assert.equal(refused({}).code, "READER_SCHEMA_UNKNOWN");
  assert.equal(refused("mw.policy-graph.v1").code, "READER_NOT_A_RECORD");
  assert.equal(refused(null).code, "READER_NOT_A_RECORD");
});

test("compatibility: original mw.episode.v1 and mw.training-export.v1 bytes stay valid as legacy records whose behaviour support is unknown — never a defaulted graph, never zero", () => {
  const episode = ok({ schema: "mw.episode.v1", version: 1, mode: "fixture", steps: [] });
  assert.equal(episode.family, "mw.episode");
  assert.equal(episode.nodes, UNKNOWN);
  assert.equal(episode.support, UNKNOWN);
  assert.deepEqual(episode.unread, []);
  const training = ok({ schema: "mw.training-export.v1", version: 1, steps: [{ logProb: "unknown" }] });
  assert.equal(training.support, UNKNOWN);
  assert.notEqual(training.support, 0);
  assert.equal(refused({ schema: "mw.episode.v2" }).code, "READER_MAJOR_UNSUPPORTED");
});

test("the read is a pure record: every string leaf is an input leaf, a path the reader built from input keys, the unknown sentinel, a family or the schema", () => {
  const input = graph({ extra: 1, nodes: [{ id: "o", kind: "observation", note: "n" }] });
  const out = ok(input);
  const known = new Set<string>([...stringLeaves(input), ...Object.keys(input), "nodes.0.note", "mw.policy-graph", "graph", UNKNOWN, out.schema]);
  for (const leaf of stringLeaves(out)) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
});

test("an array is not a record anywhere the reader checks for one: an array value refuses READER_NOT_A_RECORD, an array node refuses READER_CONSTRUCT_UNKNOWN at its nodes path, and an array edge refuses READER_OPCODE_UNKNOWN at its edges path (u7gg SV1)", () => {
  const value = refused([]);
  assert.equal(value.code, "READER_NOT_A_RECORD");
  assert.equal(value.path, "");
  const node = refused(graph({ nodes: [{ id: "o", kind: "observation" }, []] }));
  assert.equal(node.code, "READER_CONSTRUCT_UNKNOWN");
  assert.equal(node.path, "nodes.1");
  const edge = refused(graph({ edges: [{ from: "o", to: "p", temporal: "instant" }, []] }));
  assert.equal(edge.code, "READER_OPCODE_UNKNOWN");
  assert.equal(edge.path, "edges.1");
});

test("a schema string must end at its major digits: text after the major refuses READER_SCHEMA_UNKNOWN at the schema path instead of reading as the nearest major (u7gg SV2)", () => {
  for (const schema of ["mw.episode.v1-beta", "mw.policy-graph.v1-beta", "mw.training-export.v1x"]) {
    const out = refused({ schema });
    assert.equal(out.code, "READER_SCHEMA_UNKNOWN", schema);
    assert.equal(out.path, "schema", schema);
  }
});

test("a node or edge that is not a record refuses at its own index, and a null node or null edge refuses rather than throwing (u7gg SV4, SV5)", () => {
  for (const bad of ["not-a-node", 7, null, true]) {
    const node = refused(graph({ nodes: [{ id: "o", kind: "observation" }, bad] }));
    assert.equal(node.code, "READER_CONSTRUCT_UNKNOWN", String(bad));
    assert.equal(node.path, "nodes.1", String(bad));
    const edge = refused(graph({ edges: [{ from: "o", to: "p", temporal: "instant" }, bad] }));
    assert.equal(edge.code, "READER_OPCODE_UNKNOWN", String(bad));
    assert.equal(edge.path, "edges.1", String(bad));
  }
  assert.doesNotThrow(() => readGraphRecord(graph({ nodes: [null] })));
  assert.doesNotThrow(() => readGraphRecord(graph({ edges: [null] })));
});

test("the schema refusals carry the schema path: an unknown family, an unversioned name and a missing schema each point at schema (u7gg SV8, SV9)", () => {
  for (const value of [{ schema: "mw.quantum-graph.v1" }, { schema: "policy-graph" }, {}, { schema: 3 }]) {
    const out = refused(value);
    assert.equal(out.code, "READER_SCHEMA_UNKNOWN", JSON.stringify(value));
    assert.equal(out.path, "schema", JSON.stringify(value));
  }
});

test("an edge member memory is known to the reader and is not reported as unread, while an unknown edge member still is (u7gg SV10)", () => {
  const out = ok(graph({ edges: [{ from: "o", to: "p", temporal: "instant", memory: "m:last" }, { from: "p", to: "out", temporal: "instant", weight: 1 }] }));
  assert.ok(!out.unread.includes("edges.0.memory"), JSON.stringify(out.unread));
  assert.deepEqual(out.unread, ["edges.1.weight"]);
});

test("a delayed edge reads ok: the temporal operator delayed is one of the two the reader implements (u7gg SV11)", () => {
  const out = ok(graph({ edges: [{ from: "o", to: "p", temporal: "delayed" }, { from: "p", to: "out", temporal: "instant" }] }));
  assert.equal(out.support, "graph");
  assert.deepEqual(out.unread, []);
});

test("a nodes or edges member that is present and not an array refuses READER_CONSTRUCT_UNKNOWN at that path, the detail naming the typeof (976l ikxu Q5, SV6 SV7)", () => {
  for (const [member, value, type] of [["nodes", { a: 1 }, "object"], ["nodes", "o", "string"], ["nodes", null, "null"], ["edges", { a: 1 }, "object"], ["edges", 7, "number"], ["edges", null, "null"]] as const) {
    const out = refused(graph({ [member]: value }));
    assert.equal(out.code, "READER_CONSTRUCT_UNKNOWN", member);
    assert.equal(out.path, member);
    assert.ok(out.detail.includes(type), `${member}: ${out.detail}`);
  }
});

test("an absent nodes or absent edges member refuses READER_CONSTRUCT_UNKNOWN at that path with the detail absent; the only empty graph is nodes: [] with edges: [] (976l ikxu Q5)", () => {
  for (const member of ["nodes", "edges"]) {
    const value = graph();
    delete value[member];
    const out = refused(value);
    assert.equal(out.code, "READER_CONSTRUCT_UNKNOWN", member);
    assert.equal(out.path, member);
    assert.ok(out.detail.includes("absent"), out.detail);
  }
  const empty = ok(graph({ nodes: [], edges: [] }));
  assert.deepEqual(empty.nodes, []);
  assert.equal(empty.support, "graph");
  assert.deepEqual(empty.unread, []);
});

test("a node whose id is absent or not a string refuses READER_CONSTRUCT_UNKNOWN at nodes.N.id and nothing is coerced; a string id passes unchanged (976l ikxu Q3, SV3)", () => {
  for (const [node, type] of [[{ kind: "observation" }, "absent"], [{ id: 7, kind: "observation" }, "number"], [{ id: null, kind: "observation" }, "null"], [{ id: { x: 1 }, kind: "observation" }, "object"]] as const) {
    const out = refused(graph({ nodes: [{ id: "ok", kind: "observation" }, node] }));
    assert.equal(out.code, "READER_CONSTRUCT_UNKNOWN", JSON.stringify(node));
    assert.equal(out.path, "nodes.1.id", JSON.stringify(node));
    assert.ok(out.detail.includes(type), `${JSON.stringify(node)}: ${out.detail}`);
  }
  assert.deepEqual(ok(graph({ nodes: [{ id: "7", kind: "observation" }] })).nodes, [{ id: "7", kind: "observation" }]);
});

test("no node the reader returns carries the minted string undefined or a coerced number (976l, T6 purity of the reader's own output)", () => {
  const out = ok(graph());
  assert.ok(out.nodes !== UNKNOWN);
  for (const node of out.nodes as readonly { id: unknown }[]) assert.equal(typeof node.id, "string");
  assert.ok(!stringLeaves(out).includes("undefined"));
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
