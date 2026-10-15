/** Producer-specific metadata is a projection of actual fields, not a PASS or workspace pin. */
import { describe, expect, it } from "vitest";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

describe("native evidence projection", () => {
  it("preserves Forge native operation and partial status but never workspace path as basis", () => {
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { operation_id: "native-operation", ids: { trace_id: "native-trace" }, status: "partial", envelope: { verdict: "COULD_NOT_JUDGE" }, data: { source_snapshot_id: "dirty-tree/v1:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", workspace_context: { root: "/workspace" } } } })).toEqual({ provider: "forge", nativeId: "native-operation", domainStatus: "partial", sourceBasis: "dirty-tree/v1:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" });
  });
  it("maps serialized HX execution identity and incomplete coverage without fabricated absence", () => {
    expect(nativeEvidence("hyperunix.find", { contract: "hyperunix.find/v1", source: { representation: "hyperunix.result/1", execution_id: "hx-execution", execution_status: { kind: "incomplete" }, digest: "sha256:native-query", evidence: { support_ids: ["support-1"], derivation_handles: ["derive-1"] }, workspace_root: "/workspace" } })).toEqual({ provider: "hyperunix", nativeId: "hx-execution", domainStatus: "incomplete", evidenceRefs: ["support-1", "derive-1"] });
  });
  it("maps Furnace Run identity/state, not request or workspace ID", () => {
    expect(nativeEvidence("furnace.run.inspect", { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", requestId: "request-1", data: { run_id: "frn-1", state: "needs_attention", workspace: "/workspace" } } })).toEqual({ provider: "furnace", nativeId: "frn-1", domainStatus: "needs_attention" });
  });
  it("maps RF ephemeral operation and graph provenance without inventing a durable render ID", () => {
    expect(nativeEvidence("reactivefiber.render.preview", { contract: "reactivefiber.render.preview/v1", source: { schema: "reactive-fiber.cli/v1", operation_id: "rf-operation", ok: true, command: "context.render", result: { ephemeral: true, render_id: null, provenance: { graph_revision_id: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" } } } })).toEqual({ provider: "reactivefiber", nativeId: "rf-operation", sourceBasis: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" });
  });
  it.each([null, [], {}, { contract: "forge.gate.status/v1", source: { status: true, operation_id: 2 } }])("does not invent evidence for absent/malformed fields %j", value => {
    expect(nativeEvidence("unknown.capability", value)).toEqual({});
    expect(nativeEvidence("forge.gate.status", value)).not.toHaveProperty("nativeId");
    expect(nativeEvidence("forge.gate.status", value)).not.toHaveProperty("domainStatus");
  });
  it("refuses mismatched contract metadata even when IDs look credible", () => {
    expect(nativeEvidence("hyperunix.find", { contract: "forge.gate.status/v1", source: { execution_id: "fake", execution_status: { kind: "complete" } } })).toEqual({});
  });
  it("real worker result carries Furnace metadata to progress without changing native value", async () => {
    const value = { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", data: { run_id: "frn-1", state: "needs_attention" } } };
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: async () => value };
    const result = await runWorkflow({ script: 'export const meta={name:"native-evidence",description:"test"}; return await node("furnace.run.inspect",{});', host });
    expect(result.value).toEqual(value);
    expect(result.progress).toContainEqual(expect.objectContaining({ type: "workflow_node", state: "done", nativeId: "frn-1", domainStatus: "needs_attention", freshness: "unknown" }));
  });
});

describe("immutable basis syntax", () => {
  it("refuses directory strings even in a producer digest field", () => {
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { data: { source_snapshot_id: "/workspace", gated_tree: "/workspace" } } })).not.toHaveProperty("sourceBasis");
    expect(nativeEvidence("reactivefiber.render.preview", { contract: "reactivefiber.render.preview/v1", source: { schema: "reactive-fiber.cli/v1", command: "context.render", result: { provenance: { graph_revision_id: "/workspace" } } } })).not.toHaveProperty("sourceBasis");
  });
});


describe("operation identity is not a trace", () => {
  it("never presents Forge correlation trace/run IDs as native operation identity", () => {
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { ids: { trace_id: "trace" }, envelope: { run_id: "correlation-run" }, status: "success" } })).toEqual({ provider: "forge", domainStatus: "success" });
  });
});
