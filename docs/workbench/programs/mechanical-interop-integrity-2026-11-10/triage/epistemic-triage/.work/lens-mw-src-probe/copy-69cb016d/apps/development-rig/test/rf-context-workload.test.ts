import test from "node:test";
import assert from "node:assert/strict";
import { RfRenderRefusal, renderTaskContext } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";

// RFCA-MWX04-R002: the render adapter attaches the live workload observation and tags each domain refusal with its pressure
// class by diagnostic code. The executor is injected and answers from captured-shape fixtures, so nothing here counts as a
// native rf PASS.
const root = "/tmp/mw-rf-workload", task = "Fix parser", base = "a".repeat(40), model = "claude-opus-5";
const renderResult = {
  render_id: "rfr-1",
  workspace_id: "rfw_1",
  actor: "agent:camshaft-oe",
  output: { text: "Task: Fix parser\nSource revision: " + base + "\n", digest: "sha256:" + "b".repeat(64) },
  budget: { capability_snapshot: { model_id: model, verified: true }, formula_terms: { available_context_tokens: 512 } },
  provenance: { graph_revision_id: "sha256:" + "c".repeat(64) },
};
const envelope = (result: Record<string, unknown>) => JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: true, command: "context render", result, diagnostics: [] });
const refusalEnvelope = (code: string) => JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: false, command: "context render", diagnostics: [{ code, message: "something unrelated to the class" }] });
const versionEnvelope = JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: true, command: "version", workspace: null, result: { version: "0.1.883", sdk_versions: { fiber_optics: "0.1.0" } }, diagnostics: [] });
// The rf --version provenance probe is answered without counting: calls() counts only the render call under test.
function counting(reply: () => { stdout: string; stderr: string; exitCode: number }): { readonly execute: RfExecutor; readonly calls: () => number } {
  let calls = 0;
  return { execute: async argv => { if (argv.includes("--version")) return { stdout: versionEnvelope, stderr: "", exitCode: 0 }; calls++; return reply(); }, calls: () => calls };
}

test("a success envelope yields RfContext.workload with wall_ms, attempts 2, the superseded id and commit_seq", async () => {
  const rf = counting(() => ({ stdout: envelope({ ...renderResult, wall_ms: 412, attempts: 2, superseded_transaction_ids: ["rft_old"], commit_seq: 77, status: "success" }), stderr: "", exitCode: 0 }));
  const out = await renderTaskContext(root, task, base, model, rf.execute);
  assert.deepEqual(out.workload, {
    wallMs: 412, attempts: 2, retried: true, supersededTransactionIds: ["rft_old"], commitSeq: 77, status: "success", committed: true,
  });
  assert.equal(rf.calls(), 1);
});

test("absent workload fields read the literal unknown, never zero", async () => {
  const rf = counting(() => ({ stdout: envelope(renderResult), stderr: "", exitCode: 0 }));
  const out = await renderTaskContext(root, task, base, model, rf.execute);
  assert.equal(out.workload?.wallMs, "unknown");
  assert.equal(out.workload?.attempts, "unknown");
  assert.equal(out.workload?.commitSeq, "unknown");
  assert.deepEqual(out.workload?.supersededTransactionIds, "unknown");
});

test("exit 4 splits by diagnostic code: lock timeout is workload_pressure, currentness conflict is currentness_conflict", async () => {
  for (const [code, pressure] of [["RF_STORAGE_LOCK_TIMEOUT", "workload_pressure"], ["RF_CURRENTNESS_CONFLICT", "currentness_conflict"]] as const) {
    const rf = counting(() => ({ stdout: refusalEnvelope(code), stderr: "", exitCode: 4 }));
    await assert.rejects(() => renderTaskContext(root, task, base, model, rf.execute), (e: unknown) =>
      e instanceof RfRenderRefusal && e.exitCode === 4 && e.diagnosticCode === code && e.pressure === pressure && e.code === "RF_RENDER_UNESTABLISHED", code);
    assert.equal(rf.calls(), 1, code + ": the adapter issues exactly one rf call and no retry");
  }
});

test("the pressure class follows the code and not the message text", async () => {
  const lying = JSON.stringify({ ok: false, diagnostics: [{ code: "RF_STORAGE_LOCK_TIMEOUT", message: "currentness conflict: basis moved" }] });
  await assert.rejects(() => renderTaskContext(root, task, base, model, async () => ({ stdout: lying, stderr: "currentness conflict", exitCode: 4 })),
    (e: unknown) => e instanceof RfRenderRefusal && e.pressure === "workload_pressure");
});

test("other refusals carry their class: storage at exit 6, an unknown code, and a non-JSON stdout", async () => {
  const cases: ReadonlyArray<readonly [string, number, string]> = [
    [refusalEnvelope("RF_STORAGE_UNAVAILABLE"), 6, "storage_unavailable"],
    [refusalEnvelope("RF_SOMETHING_ELSE"), 2, "unclassified"],
    ["not json", 2, "unclassified"],
  ];
  for (const [stdout, exitCode, pressure] of cases) {
    const rf = counting(() => ({ stdout, stderr: "", exitCode }));
    await assert.rejects(() => renderTaskContext(root, task, base, model, rf.execute), (e: unknown) => e instanceof RfRenderRefusal && e.pressure === pressure, pressure);
    assert.equal(rf.calls(), 1);
  }
});

test("a reused recorded render carries no workload: no render was issued, so nothing was observed", async () => {
  const sourceText = "Task: " + task + "\nSource revision: " + base;
  const { createHash } = await import("node:crypto");
  const digest = "sha256:" + createHash("sha256").update(sourceText, "utf8").digest("hex");
  const execute: RfExecutor = async argv => {
    const verb = argv[1];
    const wrap = (result: unknown) => ({ stdout: JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: true, result, diagnostics: [] }), stderr: "", exitCode: 0 });
    if (verb === "history") return wrap({ items: [{ render_id: "rfr-1", status: "success", requested_model_id: model, replayability: "replayable_exact" }] });
    if (verb === "explain") return wrap({ judge_context: { task_digest: digest }, report: { trace_completeness: { replayability: "replayable_exact" } } });
    if (verb === "show") return wrap({ ...renderResult, record: { graph_revision_id: "sha256:" + "c".repeat(64), cli_version: "0.1.883", sdk_versions: { fiber_optics: "0.1.0" } } });
    throw new Error("unexpected rf verb " + String(verb));
  };
  const out = await renderTaskContext(root, task, base, model, execute, { sessionId: "rfs_sess1" });
  assert.equal(out.source, "reused");
  assert.equal(out.workload, undefined);
});
