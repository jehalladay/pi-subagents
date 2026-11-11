import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { assertRedactedProjection, classifyRedaction, projectForUntrustedSurface, taskDigestOf } from "../dist/rf-projection.js";

const label = "Task: t\nSource revision: r";
const digest = "sha256:" + createHash("sha256").update(label, "utf8").digest("hex");
const load = (name: string): any => JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8").replaceAll("@@TASK_DIGEST@@", digest));
const deepFreeze = <T>(v: T): T => { if (v && typeof v === "object") { Object.values(v).forEach(deepFreeze); Object.freeze(v); } return v; };

test("taskDigestOf is the unkeyed sha256 of the exact bytes and equals the fixture digest (positive oracle)", () => {
  assert.equal(taskDigestOf(label), digest);
  assert.equal(load("rf-explain-redact.fixture.json").judge_context.task_digest, taskDigestOf(label));
  assert.notEqual(taskDigestOf(label + "\n"), digest);
  assert.equal(taskDigestOf("é"), "sha256:" + createHash("sha256").update(Buffer.from("é", "utf8")).digest("hex"));
});

test("classifyRedaction lists the explain and history paths", () => {
  assert.deepEqual(classifyRedaction(load("rf-explain-redact.fixture.json")), { disclosesTaskLabel: true, paths: ["/judge_context/task_digest", "/report/why_rendered/task_digest"] });
  assert.deepEqual(classifyRedaction(load("rf-history-row.fixture.json")), { disclosesTaskLabel: true, paths: ["/items/0/task_digest"] });
  assert.deepEqual(classifyRedaction(load("rf-history-row.fixture.json").items[0]), { disclosesTaskLabel: true, paths: ["/task_digest"] });
});

test("projectForUntrustedSurface strips every task digest, keeps identities, and never mutates input", () => {
  const input = deepFreeze(load("rf-explain-redact.fixture.json"));
  const before = structuredClone(input);
  const { projection, removed } = projectForUntrustedSurface(input);
  assert.deepEqual(removed, ["/judge_context/task_digest", "/report/why_rendered/task_digest"]);
  assert.doesNotMatch(JSON.stringify(projection), /task_digest/);
  const p = projection as any;
  assert.equal(p.render_id, input.render_id);
  assert.equal(p.session_id, input.session_id);
  assert.equal(p.provenance.graph_revision_id, input.provenance.graph_revision_id);
  assert.equal(p.summary.final_document_digest, input.summary.final_document_digest);
  assert.equal(p.output.digest, input.output.digest);
  assert.deepEqual(p.judge_context.task_tags, []);
  assert.deepEqual(input, before);
  assert.notEqual(projection, input);
});

test("array members and the equal-valued task_blob_digest are classified and removed at their paths", () => {
  const show = { record: { task_digest: digest, task_blob_digest: digest, final_document_digest: "sha256:" + "a".repeat(64) } };
  assert.deepEqual(classifyRedaction(show).paths, ["/record/task_blob_digest", "/record/task_digest"]);
  const history = load("rf-history-row.fixture.json");
  const { projection, removed } = projectForUntrustedSurface(history);
  assert.deepEqual(removed, ["/items/0/task_digest"]);
  assert.deepEqual((projection as any).items[0].render_id, history.items[0].render_id);
  assert.equal(classifyRedaction(projection).disclosesTaskLabel, false);
});

test("pointer tokens escape ~ and / in member names", () => {
  assert.deepEqual(classifyRedaction({ "a/b": { "c~d": { task_digest: digest } } }).paths, ["/a~1b/c~0d/task_digest"]);
});

test("a protocol-shaped __proto__ member survives as data and is not polluted", () => {
  const input = JSON.parse('{"__proto__":{"task_digest":"sha256:x","keep":1}}');
  const { projection, removed } = projectForUntrustedSurface(input);
  assert.deepEqual(removed, ["/__proto__/task_digest"]);
  assert.equal(Object.getPrototypeOf(projection), Object.prototype);
  assert.deepEqual(JSON.parse(JSON.stringify(projection)), JSON.parse('{"__proto__":{"keep":1}}'));
  assert.equal(({} as any).keep, undefined);
});

test("negative control: identity digests alone do not disclose and project unchanged", () => {
  const clean = { render_id: "rfr_x", summary: { final_document_digest: "sha256:" + "b".repeat(64) }, output: { digest: "sha256:" + "c".repeat(64) }, provenance: { graph_revision_id: "sha256:" + "d".repeat(64) } };
  assert.deepEqual(classifyRedaction(clean), { disclosesTaskLabel: false, paths: [] });
  const { projection, removed } = projectForUntrustedSurface(clean);
  assert.deepEqual(removed, []);
  assert.deepEqual(projection, clean);
  assertRedactedProjection(clean);
});

test("assertRedactedProjection refuses a disclosing envelope and passes its projection", () => {
  const explain = load("rf-explain-redact.fixture.json");
  assert.throws(() => assertRedactedProjection(explain), /RF_REDACTION_DISCLOSES_TASK_LABEL: .*\/judge_context\/task_digest, \/report\/why_rendered\/task_digest/);
  assertRedactedProjection(projectForUntrustedSurface(explain).projection);
});

test("non-object envelopes and non-string task text refuse with RF_PROJECTION_INPUT_INVALID", () => {
  for (const bad of [null, undefined, "x", 3]) {
    assert.throws(() => classifyRedaction(bad), /RF_PROJECTION_INPUT_INVALID/);
    assert.throws(() => projectForUntrustedSurface(bad), /RF_PROJECTION_INPUT_INVALID/);
    assert.throws(() => assertRedactedProjection(bad), /RF_PROJECTION_INPUT_INVALID/);
  }
  assert.throws(() => taskDigestOf(undefined as unknown as string), /RF_PROJECTION_INPUT_INVALID/);
});
