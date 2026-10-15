/** WB-017: keyboard-selected native details remain observational and terminal-safe. */
import { visibleWidth } from "@earendil-works/pi-tui";
import { describe, expect, it, vi } from "vitest";
import {
  handleWorkflowDialogKey,
  initialWorkflowDialogState,
  layoutWorkflowDialog,
  plainWorkflowDialogLines,
  resolveWorkflowDialog,
  WorkflowDialog,
  type WorkflowDialogInput,
  type WorkflowDialogState,
} from "../src/ui/workflow-dialog.js";
import type { WorkflowEntry, WorkflowNodeEntry } from "../src/workflow/progress.js";

const task = { status: "completed" as const, workflowName: "native", startTime: 1000, endTime: 2000 };
const node = (index: number, capabilityId: string, override: Partial<WorkflowNodeEntry> = {}): WorkflowNodeEntry => ({
  type: "workflow_node", index, callId: index + 1, capabilityId, label: `Node ${index}`,
  state: "done", domainStatus: "partial", nativeId: "shared", freshness: "stale",
  sourceBasis: "basis-1", evidenceRefs: ["evidence://gate/one"], ...override,
});
const progress: WorkflowEntry[] = [
  { type: "workflow_phase", index: 0, title: "Verify" },
  { type: "workflow_agent", index: 7, phaseIndex: 0, label: "legacy", state: "done", recordId: "rec-7" },
  node(0, "forge.gate.status", { phaseIndex: 0 }),
  node(1, "furnace.run.inspect", { phaseIndex: 0, domainStatus: "failed", error: "producer refused" }),
];
const input = (state: WorkflowDialogState, rows: readonly WorkflowEntry[] = progress, ascii = true, width = 80): WorkflowDialogInput => ({
  task, progress: rows, state, ascii, width, now: 2000, bodyRows: 12,
});
const render = (state: WorkflowDialogState, rows = progress, ascii = true, width = 80) =>
  plainWorkflowDialogLines(layoutWorkflowDialog(input(state, rows, ascii, width)));
const press = (key: string, state: WorkflowDialogState, rows = progress) =>
  handleWorkflowDialogKey(key, state, resolveWorkflowDialog(input(state, rows)));

describe("WB-017 native inspector", () => {
  it("selects nodes without turning them into agents and preserves legacy conversation keys", () => {
    const overview = initialWorkflowDialogState();
    expect(render(overview).join("\n")).toContain("Node 0");
    const agent = press("\r", overview)?.state;
    expect(agent?.level).toBe("agent");
    expect(press("c", agent!)?.action).toEqual({ kind: "open", recordId: "rec-7" });
    const selected = press("j", agent!)?.state;
    expect(selected?.level).toBe("node");
    expect(press("c", selected!)).toBeUndefined();
    expect(press("s", selected!)).toBeUndefined();
    expect(press("r", selected!)).toBeUndefined();
    expect(press("j", selected!)?.state.selectedNode).toBe(1);
    expect(press("k", selected!)?.state.selectedNode).toBe(0);
    expect(press("k", press("k", selected!)!.state)?.state.level).toBe("agent");
  });

  it("opens a node-only phase and resolves provider-qualified same native IDs independently", () => {
    const rows = progress.filter(p => p.type !== "workflow_agent");
    const overview = initialWorkflowDialogState();
    const selected = press("\r", overview, rows)?.state;
    expect(selected?.level).toBe("node");
    expect(render(selected!, rows).join("\n")).toContain("forge.gate.status");
    expect(render(selected!, rows).join("\n")).not.toContain("Domain: failed");
    const next = press("j", selected!, rows)?.state;
    expect(render(next!, rows).join("\n")).toContain("furnace / shared");
    expect(render(next!, rows).join("\n")).toContain("producer refused");
  });

  it.each([true, false])("keeps transport and domain distinct, evidence visible, and frame bounded (ASCII=%s)", ascii => {
    const state = { ...initialWorkflowDialogState(), level: "node" as const };
    const lines = render(state, progress, ascii, 80);
    const text = lines.join("\n");
    expect(text).toContain("forge / shared");
    expect(text).toMatch(/Transport.*completed/);
    expect(text).toMatch(/Domain.*partial/);
    expect(text).toMatch(/Freshness.*stale/);
    expect(text).toMatch(/Basis.*basis-1/);
    expect(text).toContain("evidence://gate/one");
    expect(text).not.toContain("Verified");
    expect(text).toContain("? Node 0");
    expect(lines.length).toBeLessThanOrEqual(24);
    for (const line of lines) expect(visibleWidth(line)).toBeLessThanOrEqual(74);
    const resized = render(state, progress, ascii, 120).join("\n");
    expect(resized).toContain("forge / shared");
  });

  it("sanitizes native labels, identities, basis, evidence, and errors before theme or terminal receives them", () => {
    const hostile = node(0, "forge.gate.status", {
      label: "label\x1b]8;;https://bad.invalid\x07link\x1b]8;;\x07\rspoof",
      nativeId: "id\x1b[2J!", sourceBasis: "source\x1b[31m!", error: "bad\n\x1b[Hoverwrite",
      evidenceRefs: ["evidence\x1b[0m://ref"], state: "error",
    });
    const state = { ...initialWorkflowDialogState(), level: "node" as const };
    const lines = render(state, [hostile]);
    expect(lines.join("\n")).toContain("bad");
    expect(lines.join("\n")).toContain("evidence://ref");
    expect(lines.every(line => !/[\x00-\x1f\x7f-\x9f]/u.test(line))).toBe(true);
    expect(lines.join("\n")).not.toContain("https://bad.invalid");
    expect(lines.length).toBeLessThanOrEqual(24);
  });

  it("lists a forge-operation evidence ref in the node details pane", () => {
    const rows = [node(0, "forge.gate.status", { evidenceRefs: ["forge-operation:op-123"] })];
    const state = { ...initialWorkflowDialogState(), level: "node" as const };
    expect(render(state, rows, true, 120).join("\n")).toContain("forge-operation:op-123");
  });

  it("preserves selected node on resize and closes without invoking any runtime controls", () => {
    const controls = { onKill: vi.fn(), onSkipAgent: vi.fn(), onRetryAgent: vi.fn() };
    const done = vi.fn();
    const dialog = new WorkflowDialog({ requestRender: vi.fn(), terminal: { rows: 24, columns: 80 } } as never,
      () => ({ task, progress }), { fg: (_: string, text: string) => text, bold: (text: string) => text } as never,
      done, controls);
    dialog.handleInput("\r");
    dialog.handleInput("j");
    expect(dialog.render(80).join("\n")).toContain("forge / shared");
    expect(dialog.render(120).join("\n")).toContain("forge / shared");
    dialog.handleInput("\x1b");
    dialog.handleInput("\x1b");
    expect(done).toHaveBeenCalledTimes(1);
    expect(controls.onKill).not.toHaveBeenCalled();
    expect(controls.onSkipAgent).not.toHaveBeenCalled();
    expect(controls.onRetryAgent).not.toHaveBeenCalled();
    dialog.dispose();
  });
});

describe("WB-017 incremental component projection", () => {
  it("does not revisit old history on repeat render or appended node update", () => {
    const history = Array.from({ length: 100_000 }, (_, i): WorkflowNodeEntry =>
      node(i % 5, "forge.gate.status", { nativeId: `operation-${i}` }));
    let reads = 0;
    const watched = new Proxy(history, {
      get(target, key, receiver) {
        if (typeof key === "string" && /^\d+$/.test(key)) reads++;
        return Reflect.get(target, key, receiver);
      },
    });
    const dialog = new WorkflowDialog({ requestRender: vi.fn(), terminal: { rows: 24, columns: 80 } } as never,
      () => ({ task, progress: watched }), { fg: (_: string, text: string) => text, bold: (text: string) => text } as never,
      vi.fn());
    dialog.render(80);
    reads = 0;
    dialog.render(80);
    expect(reads).toBeLessThan(20);
    watched.push(node(1, "forge.gate.status", { nativeId: "latest" }));
    dialog.render(80);
    expect(reads).toBeLessThan(20);
    dialog.handleInput("\r");
    dialog.handleInput("j");
    expect(dialog.render(80).join("\n")).toContain("latest");
    dialog.dispose();
  });
});


describe("operator reconcile provenance in the dialog (wb-g8f part B.4)", () => {
  const pending = node(0, "furnace.run.start", {
    state: "error", error: "uncertain", domainStatus: undefined, nativeId: undefined,
    freshness: undefined, sourceBasis: undefined, evidenceRefs: [],
    reconcile: {
      state: "pending", position: 0, capabilityId: "furnace.run.start", effectClass: "external", producer: "furnace",
      key: "k0", entryDigest: `sha256:${"a".repeat(64)}`,
      nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-r1" }],
      decisions: { acknowledged: 0, overridesLive: 0, overridesSpent: 0 },
    },
  } as never);
  const acknowledged = node(0, "furnace.run.start", {
    reconcile: {
      state: "acknowledged", acknowledgementId: `ack_${"b".repeat(32)}`, principal: "local-operator:1:s1",
      recordedAt: "2026-10-15T09:00:00Z", determination: "effect-confirmed", evidenceClass: "producer-confirmed",
    },
  } as never);
  const overridden = node(0, "furnace.run.start", {
    reconcile: {
      state: "overridden", overrideId: `ovr_${"c".repeat(32)}`, principal: "local-operator:1:s1",
      recordedAt: "2026-10-15T09:00:00Z", duplicateRisk: "known-duplicate", outcome: "re-run-ok",
    },
  } as never);

  it("marks the node rows with their reconcile state", () => {
    // Overview level: the node list sits in the wide pane, so the full
    // annotation is visible; the node-level detail pane carries it otherwise.
    const state = initialWorkflowDialogState();
    const phase = { type: "workflow_phase", index: 0, title: "Verify" } as const;
    const inPhase = (row: WorkflowNodeEntry): WorkflowEntry[] => [phase as never, { ...row, phaseIndex: 0 }];
    expect(render(state, inPhase(pending), true, 120).join("\n")).toContain("reconcile pending");
    expect(render(state, inPhase(acknowledged), true, 120).join("\n")).toContain("acknowledged by operator");
    expect(render(state, inPhase(overridden), true, 120).join("\n")).toContain("re-run by operator override");
  });

  it("shows a Reconcile detail row for each state", () => {
    const state = { ...initialWorkflowDialogState(), level: "node" as const };
    const ackText = render(state, [acknowledged], true, 120).join("\n");
    expect(ackText).toMatch(/Reconcile: acknowledged by local-operator:1:s1/);
    expect(ackText).toContain("effect-confirmed");
    const pendingText = render(state, [pending], true, 120).join("\n");
    expect(pendingText).toMatch(/Reconcile: pending/);
    expect(pendingText).toContain("workflow_reconcile");
    const overriddenText = render(state, [overridden], true, 120).join("\n");
    expect(overriddenText).toMatch(/Reconcile: re-run by operator override/);
    expect(overriddenText).toContain("re-run-ok");
  });

  it("carries the reconciled count into the header", () => {
    const lines = plainWorkflowDialogLines(layoutWorkflowDialog({
      task: { ...task, reconciledNodeCount: 1 } as never, progress, state: initialWorkflowDialogState(),
      ascii: true, width: 100, now: 2000, bodyRows: 12,
    }));
    expect(lines.join("\n")).toContain("reconciled: 1 node");
  });

  it("strips hostile text from a reconcile principal", () => {
    const hostile = node(0, "furnace.run.start", {
      reconcile: {
        state: "acknowledged", acknowledgementId: `ack_${"b".repeat(32)}`, principal: "op\u001b[31m\u202eevil",
        recordedAt: "2026-10-15T09:00:00Z", determination: "indeterminate", evidenceClass: "operator-asserted",
      },
    } as never);
    const state = { ...initialWorkflowDialogState(), level: "node" as const };
    expect(render(state, [hostile], true, 120).join("\n")).not.toMatch(/[\u001b\u202a-\u202e]/u);
  });
});
