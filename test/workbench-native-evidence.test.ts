/** Producer-specific metadata is a projection of actual fields, not a PASS or workspace pin. */
import { describe, expect, it, vi } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

describe("native evidence projection", () => {
  it("preserves Forge native operation and partial status but never workspace path as basis", () => {
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { operation_id: "native-operation", ids: { trace_id: "native-trace" }, status: "partial", envelope: { verdict: "COULD_NOT_JUDGE" }, data: { source_snapshot_id: "dirty-tree/v1:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", workspace_context: { root: "/workspace" } } } })).toEqual({ provider: "forge", nativeId: "native-operation", domainStatus: "partial", evidenceRefs: ["forge-operation:native-operation"], sourceBasis: "dirty-tree/v1:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" });
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
  it.each<JsonValue>([null, [], {}, { contract: "forge.gate.status/v1", source: { status: true, operation_id: 2 } }])("does not invent evidence for absent/malformed fields %j", value => {
    expect(nativeEvidence("unknown.capability", value)).toEqual({});
    expect(nativeEvidence("forge.gate.status", value)).not.toHaveProperty("nativeId");
    expect(nativeEvidence("forge.gate.status", value)).not.toHaveProperty("domainStatus");
    expect(nativeEvidence("forge.gate.status", value)).not.toHaveProperty("evidenceRefs");
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

describe("forge evidence references (contract ruling 5)", () => {
  const basis = `sha256:${"d".repeat(64)}`;
  const value = { contract: "forge.gate.status/v1", source: { operation_id: "forge-op-9", status: "partial", data: { source_snapshot_id: basis } } };
  it("emits exactly one forge-operation ref from a validated native operation id", () => {
    expect(nativeEvidence("forge.gate.status", value)).toEqual({ provider: "forge", nativeId: "forge-op-9", domainStatus: "partial", evidenceRefs: ["forge-operation:forge-op-9"], sourceBasis: basis });
  });
  it("emits no forge-operation ref without a validated operation id", () => {
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { status: "success", operation_id: "" } })).not.toHaveProperty("evidenceRefs");
    expect(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { status: "success", ids: { trace_id: "trace" } } })).not.toHaveProperty("evidenceRefs");
  });
  it("real worker result carries the forge ref into the node entry and its journal replay", async () => {
    const script = 'export const meta={name:"forge-evidence",description:"test"}; return await node("forge.gate.status",{target:"/ws"});';
    const recorded: WorkflowJournalEntry[] = [];
    const liveNode = vi.fn(async () => value);
    const live: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: liveNode, describeNodeEffect: () => "read" };
    const first = await runWorkflow({ script, host: live, journal: { append: entry => { recorded.push(entry); } } });
    expect(first.value).toEqual(value);
    expect(first.progress).toContainEqual(expect.objectContaining({ type: "workflow_node", state: "done", nativeId: "forge-op-9", domainStatus: "partial", sourceBasis: basis, freshness: "unknown", evidenceRefs: ["forge-operation:forge-op-9"] }));
    const journaled = recorded.find(entry => entry.kind === "node");
    expect(journaled).toMatchObject({ ok: true, capabilityId: "forge.gate.status", effectClass: "read" });
    expect(JSON.parse(journaled?.text ?? "null")).toEqual(value);
    const replayNode = vi.fn(async () => { throw new Error("a journaled read must not re-run"); });
    const replay: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: replayNode, describeNodeEffect: () => "read" };
    const second = await runWorkflow({ script, host: replay, journal: { entries: recorded } });
    expect(second.status).toBe("completed");
    expect(replayNode).not.toHaveBeenCalled();
    expect(second.progress).toContainEqual(expect.objectContaining({ type: "workflow_node", state: "done", freshness: "stale", evidenceRefs: ["forge-operation:forge-op-9"] }));
  });
});
