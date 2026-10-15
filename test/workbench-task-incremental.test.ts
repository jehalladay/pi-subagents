/** A streaming update may touch its own counters, never refold historical entries. */
import { describe, expect, it } from "vitest";
import { createWorkflowTask, updateWorkflowProgressBatch } from "../src/workflow/task.js";

describe("incremental workflow task counters", () => {
  it("does not revisit old progress when a single live agent changes", () => {
    const task = createWorkflowTask({ id: "wf_incremental", script: "" });
    updateWorkflowProgressBatch(task, [{ type: "workflow_agent", index: 0, label: "a", state: "progress", tokens: 10, toolCalls: 1 }]);
    const first = task.workflowProgress[0];
    Object.defineProperty(first, "type", { get: () => { throw new Error("historical entry revisited"); } });
    updateWorkflowProgressBatch(task, [{ type: "workflow_agent", index: 0, label: "a", state: "done", tokens: 15, toolCalls: 2 }]);
    expect(task.totalTokens).toBe(15);
    expect(task.totalToolCalls).toBe(2);
    expect(task.doneCount).toBe(1);
    expect(task.agentCount).toBe(1);
  });
  it("replaces each agent's contribution and preserves scheduled totals", () => {
    const task = createWorkflowTask({ id: "wf_incremental", script: "" });
    task.agentCount = 20;
    updateWorkflowProgressBatch(task, [
      { type: "workflow_agent", index: 1, label: "a", state: "done", tokens: 10 },
      { type: "workflow_agent", index: 2, label: "b", state: "done", tokens: 20 },
    ]);
    updateWorkflowProgressBatch(task, [{ type: "workflow_agent", index: 1, label: "a", state: "error", tokens: 12 }]);
    expect(task.totalTokens).toBe(32);
    expect(task.doneCount).toBe(1);
    expect(task.agentCount).toBe(20);
  });
});
