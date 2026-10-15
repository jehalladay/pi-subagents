/** Native diagnostic previews never carry deployment credentials into Pi. */
import { describe, expect, it } from "vitest";
import { safeWorkflowTerminalText } from "../src/ui/workflow-card.js";
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from "../src/ui/workflow-dialog.js";
import { redactWorkbenchText, sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";

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

describe("redactWorkbenchText idempotence (wb-3l3)", () => {
  // docs/20 ruling 2: "The double redaction in the sanitizer order is deliberate and idempotent."
  it.each([
    '{"password":"opaque"}',
    '{"api_key":"private-deployment-value"}',
    '{"aws_secret_access_key":"private-aws-value","note":"kept"}',
    '{"a":{"secret":"x"},"b":1}',
    "{'access_token': 'token-value'}",
    "password: opaque",
    "api_key=private-deployment-value; next=1",
    "Authorization: Bearer sk-ant-audit-fake-secret",
    "RF_WORKSPACE_NOT_FOUND: no initialized workspace",
  ])("redact(redact(x)) equals redact(x) for %s", raw => {
    const once = redactWorkbenchText(raw);
    expect(redactWorkbenchText(once)).toBe(once);
  });
  it("keeps the closing brace of a JSON-embedded secret on the second pass", () => {
    const once = redactWorkbenchText('{"password":"opaque"}');
    expect(once).toBe('{"password":[REDACTED]}');
    expect(redactWorkbenchText(once)).toBe('{"password":[REDACTED]}');
  });
  it("still redacts a raw value that merely follows an already-redacted marker field", () => {
    expect(redactWorkbenchText('password=[REDACTED] secret=leaky')).toBe("password=[REDACTED] secret=[REDACTED]");
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

/**
 * wb-952 probe corpus: six credentials each interrupted by an invisible
 * character. Redaction must see the reassembled secret, so strip runs first.
 * `leak` is the tail fragment that must never reach any display path.
 */
const ESC = String.fromCharCode(27);
const BEL = String.fromCharCode(7);
const PROBE_CORPUS: ReadonlyArray<{ name: string; raw: string; leak: string }> = [
  { name: "anthropic key split by CSI", raw: `sk-ant-aaaa${ESC}[0mTAILONE1234`, leak: "TAILONE1234" },
  { name: "bearer token split by ZWSP", raw: "Authorization: Bearer abc\u200bdefTAILTWO99", leak: "TAILTWO99" },
  { name: "github token split by BOM", raw: "ghp_aaaa\ufeffTAILTHREE33", leak: "TAILTHREE33" },
  { name: "keyword assignment split by ZWJ in value", raw: "api_key=abcd\u200dTAILFOUR44", leak: "TAILFOUR44" },
  { name: "password split by OSC", raw: `password=abcd${ESC}]0;title${BEL}TAILFIVE555`, leak: "TAILFIVE555" },
  { name: "fine-grained pat split by word joiner", raw: "github_pat_aaaa\u2060TAILSIX6666", leak: "TAILSIX6666" },
];

describe("wb-952 sanitizer drift: split credentials", () => {
  it.each(PROBE_CORPUS)("safeWorkflowTerminalText removes $name", ({ raw, leak }) => {
    const out = safeWorkflowTerminalText(raw);
    expect(out).toContain("[REDACTED]");
    expect(out).not.toContain(leak);
  });
  it.each(PROBE_CORPUS)("sanitizeWorkbenchText removes $name", ({ raw, leak }) => {
    const out = sanitizeWorkbenchText(raw);
    expect(out).toContain("[REDACTED]");
    expect(out).not.toContain(leak);
  });
  it.each(PROBE_CORPUS)("sanitizeWorkbenchJson / JsonText remove $name", ({ raw, leak }) => {
    expect(JSON.stringify(sanitizeWorkbenchJson({ note: [raw] }))).not.toContain(leak);
    expect(sanitizeWorkbenchJsonText({ note: raw })).not.toContain(leak);
  });
  // 16:44Z separator policy: a zero-width character is a separator before any deletion, so a visible replacement is kept.
  it("stripUnsafeText maps zero-width characters to the replacement like every other unsafe unit", () => {
    expect(stripUnsafeText("a\u200bb\u200cc\u200dd\ufeffe\u2060f", " ")).toBe("a b c d e f");
    expect(stripUnsafeText("a\u200bb\u200cc\u200dd\ufeffe\u2060f")).toBe("abcdef");
  });
  it("keeps layout separators for control characters that carry no credential", () => {
    expect(safeWorkflowTerminalText("alpha\nbeta\tgamma")).toBe("alpha beta gamma");
  });
  it("does not regress the redact-after-strip order the store pipeline uses", () => {
    for (const { raw, leak } of PROBE_CORPUS) {
      expect(redactWorkbenchText(stripUnsafeText(raw))).not.toContain(leak);
    }
  });
});
