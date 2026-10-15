/** Native diagnostic previews never carry deployment credentials into Pi. */
import { describe, expect, it } from "vitest";
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from "../src/ui/workflow-dialog.js";
import { redactWorkbenchText } from "../src/workbench/redaction.js";

describe("Workbench credential redaction", () => {
  it.each([
    "Authorization: Bearer sk-ant-audit-fake-secret",
    "api_key=private-deployment-value",
    'password: "sensitive value with spaces"',
    "AWS_SECRET_ACCESS_KEY=private-aws-value",
    "access_token: token-value",
    '{"api_key":"private-deployment-value"}',
    '{"aws_secret_access_key":"private-aws-value"}',
  ])("removes sensitive diagnostic %s", raw => {
    const cleaned = redactWorkbenchText(raw);
    expect(cleaned).toContain("[REDACTED]");
    expect(cleaned).not.toMatch(/fake-secret|private-deployment|sensitive value|private-aws|token-value/);
  });
  it("retains actionable nonsecret native diagnostic codes", () => {
    expect(redactWorkbenchText("RF_WORKSPACE_NOT_FOUND: no initialized workspace")).toBe("RF_WORKSPACE_NOT_FOUND: no initialized workspace");
  });
  it("caps untrusted diagnostics before UI transport", () => {
    expect(redactWorkbenchText("x".repeat(100_000)).length).toBeLessThanOrEqual(2000);
  });
});

describe("native detail diagnostic hygiene", () => {
  it("does not render a producer credential in a selected error row", () => {
    const state = { ...initialWorkflowDialogState(), level: "node" as const, selectedNode: 0 };
    const layout = layoutWorkflowDialog({
      task: { status: "failed", workflowName: "secrets", startTime: 1, endTime: 2 },
      progress: [{ type: "workflow_node", index: 0, callId: 1, capabilityId: "forge.gate.status", label: "inspect", state: "error", error: "Authorization: Bearer sk-ant-audit-fake-secret" }],
      state, ascii: true, width: 100, now: 2, bodyRows: 16,
    });
    expect(plainWorkflowDialogLines(layout).join("\n")).not.toContain("sk-ant-audit-fake-secret");
  });
});
