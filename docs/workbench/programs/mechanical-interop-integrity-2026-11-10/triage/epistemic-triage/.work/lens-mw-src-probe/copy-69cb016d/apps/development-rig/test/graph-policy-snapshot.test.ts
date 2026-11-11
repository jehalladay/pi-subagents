import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BEAD_GRAPH_SCHEMA, beadSchemaDigest, buildBeadSnapshot, legalSupport, parseReadyBeads, sha256Bytes, sha256Canonical } from "../dist/graph-policy-snapshot.js";

const here = dirname(fileURLToPath(import.meta.url));
const artifacts = join(here, "../graph-policy/bead-scorer-v1");
const NOW = "2026-10-21T07:00:00Z";
const ready = [
  { id: "MW-a", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-20T07:00:00Z", dependency_count: 1, dependent_count: 0, comment_count: 3,
    dependencies: [{ issue_id: "MW-a", depends_on_id: "MW-b", type: "blocks" }, { issue_id: "MW-a", depends_on_id: "MW-gone", type: "blocks" }] },
  { id: "MW-b", status: "open", issue_type: "bug", priority: 1, created_at: "2026-10-19T07:00:00Z", dependency_count: 0, dependent_count: 1, comment_count: 0, dependencies: [] },
  { id: "MW-c", status: "in_progress", issue_type: "task", priority: 3, created_at: "2026-10-21T06:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0, dependencies: null },
  { id: "MW-d", status: "open", issue_type: null, priority: null, created_at: null, dependency_count: null, dependent_count: null, comment_count: null, dependencies: null },
];

test("parseReadyBeads narrows native rows and refuses non-arrays, rows without id/status and duplicate ids", () => {
  const rows = parseReadyBeads(JSON.parse(JSON.stringify(ready)));
  assert.equal(rows.length, 4);
  assert.deepEqual(rows[0]?.dependencies, [{ issue_id: "MW-a", depends_on_id: "MW-b", type: "blocks" }, { issue_id: "MW-a", depends_on_id: "MW-gone", type: "blocks" }]);
  assert.equal(rows[3]?.priority, null);
  assert.throws(() => parseReadyBeads({ ok: true }), /BEADS_RESPONSE_INVALID/);
  assert.throws(() => parseReadyBeads([{ id: "x" }]), /BEADS_RESPONSE_INVALID/);
  assert.throws(() => parseReadyBeads([{ id: "x", status: "open" }, { id: "x", status: "open" }]), /BEADS_RESPONSE_INVALID: duplicate/);
});

test("legalSupport is native order ∩ open ∩ allowlist ∩ types; it never adds a bead Beads did not list", () => {
  const rows = parseReadyBeads(ready);
  assert.deepEqual(legalSupport(rows), ["MW-a", "MW-b", "MW-d"]);
  assert.deepEqual(legalSupport(rows, { allow: ["MW-b", "MW-zzz", "MW-c"] }), ["MW-b"]);
  assert.deepEqual(legalSupport(rows, { types: ["task"] }), ["MW-a"]);
  assert.deepEqual(legalSupport(rows, { allow: [] }), []);
});

test("buildBeadSnapshot projects features with explicit unknown status, keeps only in-set dependency edges and declares the coverage", () => {
  const rows = parseReadyBeads(ready);
  const support = legalSupport(rows);
  const { snapshot, stats } = buildBeadSnapshot({ ready: rows, support, now: NOW, store: "MechanicalWorkflows", readyDigest: "sha256:" + "0".repeat(64), extraRevisions: ["git:abc"] });
  assert.deepEqual(stats, { entities: 4, relationsKept: 1, relationsTotal: 2, support: 3 });
  assert.equal(snapshot.schema_ref.hash, beadSchemaDigest());
  assert.deepEqual(snapshot.observation.revisions, ["bd-ready:sha256:" + "0".repeat(64), "git:abc"]);
  assert.equal(snapshot.observation.scope, "beads://MechanicalWorkflows#ready");
  assert.deepEqual(snapshot.observation.completeness, { depends_on: { coverage: 0.5, complete: false } });
  assert.equal(snapshot.observation.timestamp, NOW);
  const a = snapshot.entities.find(e => e.id === "MW-a");
  assert.deepEqual(a?.features["age_days"], { status: "known", value: 1 });
  assert.deepEqual(a?.features["is_task"], { status: "known", value: 1 });
  assert.deepEqual(a?.features["priority"], { status: "known", value: 2 });
  const d = snapshot.entities.find(e => e.id === "MW-d");
  for (const slot of ["priority", "dependency_count", "dependent_count", "age_days", "is_task", "comment_count"]) assert.deepEqual(d?.features[slot], { status: "unknown" }, slot);
  assert.deepEqual(snapshot.relations.map(r => r.id), ["dep:MW-a->MW-b"]);
  assert.deepEqual(snapshot.relations[0]?.incidences.map(i => [i.participant, i.role]), [["MW-a", "dependent"], ["MW-b", "prerequisite"]]);
  assert.deepEqual(snapshot.relations[0]?.features["blocks"], { status: "known", value: 1 });
  assert.deepEqual(snapshot.candidates, { beads: { type: "beads", members: ["MW-a", "MW-b", "MW-d"] } });
  // The in_progress bead is observed as an entity but is outside the support: legality is the host's, not the projection's.
  assert.ok(snapshot.entities.some(e => e.id === "MW-c"));
});

test("a support member outside the ready set, a duplicate member or a malformed instant is refused", () => {
  const rows = parseReadyBeads(ready);
  const base = { ready: rows, now: NOW, store: "s", readyDigest: "sha256:" + "1".repeat(64) };
  assert.throws(() => buildBeadSnapshot({ ...base, support: ["MW-a", "MW-nope"] }), /GP_SUPPORT_OUTSIDE_SNAPSHOT/);
  assert.throws(() => buildBeadSnapshot({ ...base, support: ["MW-a", "MW-a"] }), /GP_SUPPORT_OUTSIDE_SNAPSHOT/);
  assert.throws(() => buildBeadSnapshot({ ...base, support: ["MW-a"], now: "yesterday" }), /GP_SNAPSHOT_INVALID/);
  const empty = buildBeadSnapshot({ ...base, support: [] });
  assert.deepEqual(empty.snapshot.candidates.beads.members, []);
  assert.deepEqual(empty.snapshot.observation.completeness, { depends_on: { coverage: 0.5, complete: false } });
});

test("the committed gp artifacts pin the schema constant, its digest and the program's graph_schema digest", () => {
  const schema = JSON.parse(readFileSync(join(artifacts, "schema.json"), "utf8")) as Record<string, unknown>;
  const { digest, ...rest } = schema;
  assert.deepEqual(rest, JSON.parse(JSON.stringify(BEAD_GRAPH_SCHEMA)));
  assert.equal(digest, beadSchemaDigest());
  const program = JSON.parse(readFileSync(join(artifacts, "program.json"), "utf8")) as { graph_schema: { digest: string; candidate_types: Record<string, unknown> }; outputs: Record<string, unknown> };
  assert.equal(program.graph_schema.digest, beadSchemaDigest());
  assert.deepEqual(program.graph_schema.candidate_types, { beads: { kind: "node", of: "bead" } });
  const config = JSON.parse(readFileSync(join(artifacts, "config.json"), "utf8")) as Record<string, unknown>;
  assert.equal(config["schema"], "mw.graph-policy-config.v1");
  assert.match(String(config["checkpoint"]), /^graphpolicy\.checkpoint\.c1:[0-9a-f]{64}$/);
  assert.equal(config["port"], "beadScore");
  assert.ok(config["port"] as string in program.outputs);
  const theta = JSON.parse(readFileSync(join(artifacts, "theta.json"), "utf8")) as { parameters: Record<string, number[]> };
  assert.deepEqual(Object.keys(theta.parameters).sort(), ["W0", "Wm", "Ws", "Wu", "b0"]);
  assert.equal(theta.parameters["W0"]?.length, 96);
});

test("digests are sha256 over canonical (sorted-key) JSON or exact bytes", () => {
  assert.equal(sha256Canonical({ b: 1, a: [1, { d: 2, c: 3 }] }), sha256Canonical({ a: [1, { c: 3, d: 2 }], b: 1 }));
  assert.equal(sha256Bytes(""), "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  assert.notEqual(sha256Bytes("{\"a\":1}"), sha256Bytes("{\"a\": 1}"));
});

const snapshotOf = (rows: unknown, support: string[] = []) => buildBeadSnapshot({ ready: parseReadyBeads(rows), support, now: NOW, store: "s", readyDigest: "sha256:" + "2".repeat(64) });
const bead = (id: string, extra: Record<string, unknown> = {}) => ({ id, status: "open", issue_type: "task", priority: 1, created_at: "2026-10-20T07:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0, dependencies: null, ...extra });

test("a bead created after the read instant has age_days known 0, clamped, never negative (SN7)", () => {
  const { snapshot } = snapshotOf([bead("MW-future", { created_at: "2026-10-22T07:00:00Z" })]);
  assert.deepEqual(snapshot.entities[0]?.features["age_days"], { status: "known", value: 0 });
});

test("a non-task issue_type reports is_task known 0 and a task reports known 1 (SN9)", () => {
  const { snapshot } = snapshotOf([bead("MW-bug", { issue_type: "bug" }), bead("MW-decision", { issue_type: "decision" }), bead("MW-task")]);
  const byId = (id: string) => snapshot.entities.find(entity => entity.id === id)?.features["is_task"];
  assert.deepEqual(byId("MW-bug"), { status: "known", value: 0 });
  assert.deepEqual(byId("MW-decision"), { status: "known", value: 0 });
  assert.deepEqual(byId("MW-task"), { status: "known", value: 1 });
});

test("a dependency row listed under bead X whose issue_id names Y is counted in the total and dropped from the relations (SN11)", () => {
  const { snapshot, stats } = snapshotOf([
    bead("MW-x", { dependencies: [{ issue_id: "MW-y", depends_on_id: "MW-z", type: "blocks" }] }), bead("MW-y"), bead("MW-z"),
  ]);
  assert.deepEqual(stats, { entities: 3, relationsKept: 0, relationsTotal: 1, support: 0 });
  assert.deepEqual(snapshot.relations, []);
  assert.deepEqual(snapshot.observation.completeness, { depends_on: { coverage: 0, complete: false } });
});

test("one dependency listed twice yields one relation while both rows count toward the total (SN12)", () => {
  const dep = { issue_id: "MW-x", depends_on_id: "MW-y", type: "blocks" };
  const { snapshot, stats } = snapshotOf([bead("MW-x", { dependencies: [dep, { ...dep }] }), bead("MW-y")]);
  assert.deepEqual(snapshot.relations.map(relation => relation.id), ["dep:MW-x->MW-y"]);
  assert.deepEqual(stats, { entities: 2, relationsKept: 1, relationsTotal: 2, support: 0 });
  assert.deepEqual(snapshot.observation.completeness, { depends_on: { coverage: 0.5, complete: false } });
});

test("a dependency whose type is not blocks carries blocks known 0, a blocks type known 1 (SN13)", () => {
  const { snapshot } = snapshotOf([
    bead("MW-x", { dependencies: [
      { issue_id: "MW-x", depends_on_id: "MW-r", type: "related" }, { issue_id: "MW-x", depends_on_id: "MW-d", type: "discovered-from" },
      { issue_id: "MW-x", depends_on_id: "MW-n" }, { issue_id: "MW-x", depends_on_id: "MW-b", type: "blocks" },
    ] }),
    bead("MW-r"), bead("MW-d"), bead("MW-n"), bead("MW-b"),
  ]);
  const blocks = (id: string) => snapshot.relations.find(relation => relation.id === id)?.features["blocks"];
  assert.equal(snapshot.relations.length, 4);
  assert.deepEqual(blocks("dep:MW-x->MW-r"), { status: "known", value: 0 });
  assert.deepEqual(blocks("dep:MW-x->MW-d"), { status: "known", value: 0 });
  assert.deepEqual(blocks("dep:MW-x->MW-n"), { status: "known", value: 0 });
  assert.deepEqual(blocks("dep:MW-x->MW-b"), { status: "known", value: 1 });
  assert.deepEqual(snapshot.observation.completeness, { depends_on: { coverage: 1, complete: true } });
});

test("a dependency-free ready set reports depends_on coverage 1 and complete true (SN14)", () => {
  const { snapshot, stats } = snapshotOf([bead("MW-a"), bead("MW-b")]);
  assert.equal(stats.relationsTotal, 0);
  assert.deepEqual(snapshot.observation.completeness, { depends_on: { coverage: 1, complete: true } });
});

test("a ready row whose id is only whitespace is refused BEADS_RESPONSE_INVALID (SN22)", () => {
  assert.throws(() => parseReadyBeads([{ id: "   ", status: "open" }]), /BEADS_RESPONSE_INVALID: ready row 0/);
  assert.throws(() => parseReadyBeads([{ id: "", status: "open" }]), /BEADS_RESPONSE_INVALID: ready row 0/);
});
