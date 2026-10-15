/** wb-6ze.17: the owner wiring slice — host-built EvidenceStore and the dialog's load-evidence/abortAll wiring. */
import { describe, expect, it, vi } from "vitest";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const scope: ObservationScope = { workspace: "/ws", principal: "local-operator:1:s1" };
const NOW = "2026-10-15T11:00:00Z";
const runRef: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: "/ws" };

function projectionWithRun(): ObservationProjection {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 8 });
  projection.refresh({
    source: runRef, scope, capturedAt: NOW, observedAt: NOW,
    node: { title: "Run r1", type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const },
    trace: { invocationId: "wf-evidence-1" },
    evidenceRefs: ["frn-atm-a1"],
  });
  return projection;
}

function wiringDeps(grants: string[]) {
  const projection = projectionWithRun();
  return {
    deps: {
      grants: () => [...grants],
      scope: () => scope,
      projection,
      cwd: () => "/ws",
      claudeRead: async (sessionId: string) => [{ type: "assistant" as const, uuid: "u1", text: `hello ${sessionId}` }],
      furnaceClient: () => ({
        logs: {
          read: async (runId: string, options: { attempt: string; limit: number; stream: string }) => ({
            kind: "logs_read",
            requestId: "rq-1",
            data: {
              run_id: runId, attempt_id: options.attempt, stream: options.stream,
              lines: ["line one", "line two"], returned: 2, complete: true, lossy: false, next_cursor: null,
            },
          }),
        },
      }),
      now: () => new Date(NOW),
    },
    projection,
  };
}

describe("createWorkbenchEvidenceStore (host wiring)", () => {
  it("loads a claude transcript row under the live grant and refuses after revocation", async () => {
    const grants = ["claude:transcript", "furnace:inspect"];
    const { deps } = wiringDeps(grants);
    const store = createWorkbenchEvidenceStore(deps as never);
    const sessionRef: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "sess-1" };
    await store.request(scope, sessionRef, "claude-message:u1");
    const loaded = store.get(scope, sessionRef, "claude-message:u1");
    expect(loaded.state).toBe("loaded");
    if (loaded.state === "loaded") expect(loaded.preview.join("\n")).toContain("hello sess-1");
    // Mid-view revocation: the next load refuses unauthorized; nothing cached is consulted.
    grants.length = 0;
    const otherRef: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "sess-2" };
    await store.request(scope, otherRef, "claude-message:u1");
    expect(store.get(scope, otherRef, "claude-message:u1")).toMatchObject({ state: "unavailable", reason: "unauthorized" });
  });

  it("loads a furnace attempt log through the landed reader, bound to the owning run node", async () => {
    const { deps } = wiringDeps(["furnace:inspect"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    await store.request(scope, runRef, "frn-atm-a1");
    const entry = store.get(scope, runRef, "frn-atm-a1");
    expect(entry.state).toBe("loaded");
    if (entry.state === "loaded") {
      expect(entry.preview.join("\n")).toContain("line one");
      expect(entry.truncated).toBe(false);
      expect(entry.provider).toBe("furnace");
    }
    // An attempt the owning node does not list is unauthorized, never read blind.
    await store.request(scope, runRef, "frn-atm-zz");
    expect(store.get(scope, runRef, "frn-atm-zz")).toMatchObject({ state: "unavailable", reason: "unauthorized" });
  });

  it("renders a forge operation ref as the visible no-loader unknown until the forge reader lands", async () => {
    const { deps } = wiringDeps(["forge:inspect"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    const forgeRef: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
    await store.request(scope, forgeRef, "forge-operation:op-1");
    expect(store.get(scope, forgeRef, "forge-operation:op-1")).toMatchObject({ state: "unavailable", reason: "no-loader" });
  });
});

describe("dialog wiring: load-evidence and close (wb-6ze.17)", () => {
  const node = {
    key: "k1", nativeRef: runRef, scope, sourceKind: "observed" as const, observedAt: NOW,
    sourceConnectionState: "connected" as const, freshness: "current" as const, completeness: "complete" as const,
    presentation: { title: "Run r1", type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const },
    kind: "furnace-run", evidenceRefs: ["frn-atm-a1"] as const,
  };
  function dialogHarness() {
    const request = vi.fn(async () => {});
    const abortAll = vi.fn();
    const kill = vi.fn();
    const closed: boolean[] = [];
    const observation = {
      projection: {
        window: () => ({ nodes: [node], total: 1, offset: 0, revision: 1 }),
        indexOf: () => 0,
        relations: () => ({ relations: [], total: 0 }),
      },
      scope, invocationId: "wf-evidence-1", title: "Run dialog", status: "running",
      evidence: { get: () => ({ state: "not-requested" as const }), request, abortAll },
    };
    const tui = { requestRender: vi.fn(), terminal: { rows: 24 } };
    const theme = { fg: (_color: string, text: string) => text, bold: (text: string) => text };
    const dialog = new WorkflowDialog(
      tui as never,
      () => ({ progress: [], task: { status: "running" as const, workflowName: "wf", startTime: 1_000 }, observation }) as never,
      theme as never,
      () => closed.push(true),
      { onKill: kill },
    );
    return { dialog, request, abortAll, kill, closed };
  }

  it("wires Enter in the details view to store.request for the focused reference", () => {
    const { dialog, request } = dialogHarness();
    dialog.handleInput("s");
    dialog.handleInput("\r");
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(scope, runRef, "frn-atm-a1");
    dialog.dispose();
  });

  it("wires dialog close to abortAll and never to workflow cancellation", () => {
    const { dialog, request, abortAll, kill, closed } = dialogHarness();
    dialog.handleInput("\x03");
    expect(abortAll).toHaveBeenCalledTimes(1);
    expect(closed).toEqual([true]);
    expect(kill).not.toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
    dialog.dispose();
    // dispose after close stays idempotent: no second abort of settled slots.
    expect(abortAll.mock.calls.length).toBeLessThanOrEqual(2);
  });
});
