/** wb-6ze.17: the owner wiring slice — host-built EvidenceStore and the dialog's load-evidence/abortAll wiring. */
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { CLAUDE_TRANSCRIPT_GRANT } from "../src/workbench/evidence-producers.js";
import { createWorkbenchEvidenceStore, type WorkbenchEvidenceDeps } from "../src/workbench/evidence-wiring.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const scope: ObservationScope = { workspace: "/ws", principal: "local-operator:1:s1" };
const NOW = "2026-10-15T11:00:00Z";
const runRef: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: "/ws" };
const forgeRef: NativeRef = { provider: "forge", type: "gate-status", id: "workspace", scope: "/ws" };
const OPERATION = "op_8f2c41";
const CLAUDE_UUID = "11111111-2222-4333-8444-555555555555";
const CLAUDE_REF = `claude-message:${CLAUDE_UUID}`;
const claudeRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });

function projectionWithRun(): ObservationProjection {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 8 });
  projection.refresh({
    source: runRef, scope, capturedAt: NOW, observedAt: NOW,
    node: { title: "Run r1", type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const },
    trace: { invocationId: "wf-evidence-1" },
    evidenceRefs: ["frn-atm-a1"],
  });
  projection.refresh({
    source: forgeRef, scope, capturedAt: NOW, observedAt: NOW,
    node: { title: "Forge gate status /ws", type: "sdk-operation" as const, statusText: "success · FORGE_OK", statusTone: "success" as const },
    trace: { invocationId: "wf-evidence-1" },
    evidenceRefs: ["forge:gate.status:FORGE_OK", `forge-operation:${OPERATION}`],
  });
  // The two Claude session nodes the claude cases request on; ownership is each node's own listing (wb-idq).
  for (const id of ["sess-1", "sess-2"]) {
    projection.refresh({
      source: claudeRef(id), scope, capturedAt: NOW, observedAt: NOW,
      node: { title: `Claude ${id}`, type: "agent" as const, statusText: "running", statusTone: "active" as const },
      trace: { invocationId: "wf-evidence-1" },
      evidenceRefs: [CLAUDE_REF],
    });
  }
  return projection;
}

/** A forge.gate.status/v1 reading naming the operation, as the registered capability returns it. */
function forgeReading(packages: number, operation: string = OPERATION) {
  return {
    contract: "forge.gate.status/v1",
    protocolMethod: "gate.status",
    source: {
      status: "success", operation_id: operation, envelope: { verdict: null, reason_code: "FORGE_OK" },
      data: { packages: Array.from({ length: packages }, (_, index) => ({ ref: `code:p${index}`, last_result: "success", authoritative_current: true, verification_ref: "cmd_current" })) },
    },
  };
}

function wiringDeps(grants: string[]) {
  const projection = projectionWithRun();
  return {
    deps: {
      grants: () => [...grants],
      scope: () => scope,
      projection,
      cwd: () => "/ws",
      claudeRead: async (sessionId: string) => [{ type: "assistant" as const, uuid: CLAUDE_UUID, text: `hello ${sessionId}` }],
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

function forgeDeps(grants: string[], reading: unknown = forgeReading(1), stale = false) {
  const { deps, projection } = wiringDeps(grants);
  if (stale) projection.markStale({ scope, ref: forgeRef });
  const invoke = vi.fn(async (_id: string, _input: unknown, _context: unknown) => reading);
  return { deps: { ...deps, registry: () => ({ invoke }) }, invoke, projection };
}

describe("createWorkbenchEvidenceStore (host wiring)", () => {
  it("loads a claude transcript row under the live grant and refuses after revocation", async () => {
    const grants = ["claude:transcript", "furnace:inspect"];
    const { deps } = wiringDeps(grants);
    const store = createWorkbenchEvidenceStore(deps as never);
    const sessionRef: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "sess-1" };
    await store.request(scope, sessionRef, CLAUDE_REF);
    const loaded = store.get(scope, sessionRef, CLAUDE_REF);
    expect(loaded.state).toBe("loaded");
    if (loaded.state === "loaded") expect(loaded.preview.join("\n")).toContain("hello sess-1");
    // Mid-view revocation: the next load refuses unauthorized; nothing cached is consulted.
    grants.length = 0;
    const otherRef: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "sess-2" };
    await store.request(scope, otherRef, CLAUDE_REF);
    expect(store.get(scope, otherRef, CLAUDE_REF)).toMatchObject({ state: "unavailable", reason: "unauthorized" });
  });

  it("wb-idq: the claude row is served by the claude-evidence module through the wiring: role prefix, module-bounded preview, the host's injected clock, the claude-message kind", async () => {
    const { deps } = wiringDeps(["claude:transcript"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    await store.request(scope, claudeRef("sess-1"), CLAUDE_REF);
    const loaded = store.get(scope, claudeRef("sess-1"), CLAUDE_REF);
    expect(loaded).toMatchObject({ state: "loaded", kind: "claude-message", provider: "claude-agent-sdk", freshness: "current", truncated: false, capturedAt: new Date(NOW).toISOString() });
    if (loaded.state === "loaded") expect(loaded.preview).toStrictEqual(["assistant:", "hello sess-1"]);
  });

  it("wb-idq: a clockless host cannot build the store (the type refuses it) and index.ts injects the host clock at the boot seam", () => {
    const { deps, projection } = wiringDeps(["claude:transcript"]);
    expect(deps.now).toBeTypeOf("function");
    const minimal: Omit<WorkbenchEvidenceDeps, "now"> = { grants: () => [], scope: () => scope, projection, cwd: () => "/ws" };
    // @ts-expect-error the wiring requires the host clock, so a clockless store is unrepresentable (wb-563 F4 follow-up, wb-idq)
    const build = () => createWorkbenchEvidenceStore(minimal);
    expect(build).toBeTypeOf("function");
    const source = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
    const call = source.slice(source.indexOf("evidence: createWorkbenchEvidenceStore({"));
    expect(call.slice(0, call.indexOf("}),"))).toMatch(/\bnow: \(\) => new Date\(\)/);
    // The gate's typing step compiles src only, so the type refusal above is also pinned at the source: the wiring's clock is
    // required, neither the wiring nor the producers keep a clock of their own, and a claude seam is typed together with the clock.
    const wiring = readFileSync(new URL("../src/workbench/evidence-wiring.ts", import.meta.url), "utf8");
    expect(wiring).toMatch(/^\s*now\(\): Date;/m);
    expect(wiring).not.toMatch(/\bnow\?\s*[(:]/);
    expect(wiring).not.toMatch(/new Date\(\)/);
    const producers = readFileSync(new URL("../src/workbench/evidence-producers.ts", import.meta.url), "utf8");
    expect(producers).toMatch(/\{ readonly claude: ClaudeEvidenceSeam; readonly now: \(\) => Date \}/);
    expect(producers).not.toMatch(/new Date\(\)/);
  });

  it("wb-idq: ownership is the requested node's own listing: a session that does not list the ref, an unobserved session and a tool-use node refuse unauthorized with no read", async () => {
    const { deps, projection } = wiringDeps(["claude:transcript"]);
    const readTranscript = vi.fn(async (sessionId: string) => [{ type: "assistant" as const, uuid: CLAUDE_UUID, text: `hello ${sessionId}` }]);
    const store = createWorkbenchEvidenceStore({ ...deps, claudeRead: readTranscript } as never);
    const silent = claudeRef("sess-silent");
    projection.refresh({ source: silent, scope, capturedAt: NOW, observedAt: NOW, node: { title: "Claude silent", type: "agent" as const, statusText: "running", statusTone: "active" as const }, trace: { invocationId: "wf-evidence-1" } });
    const toolUse: NativeRef = { provider: "claude-agent-sdk", type: "tool-use", id: "tool-1" };
    projection.refresh({ source: toolUse, scope, capturedAt: NOW, observedAt: NOW, node: { title: "Tool", type: "agent" as const, statusText: "running", statusTone: "active" as const }, trace: { invocationId: "wf-evidence-1" }, evidenceRefs: [CLAUDE_REF] });
    // A stale non-session node: the module's authorization refusal carries no freshness, exactly like the loader's own.
    projection.markStale({ scope, ref: toolUse });
    for (const requester of [silent, claudeRef("sess-unobserved"), toolUse]) {
      await store.request(scope, requester, CLAUDE_REF);
      expect(store.get(scope, requester, CLAUDE_REF), requester.id).toEqual({ state: "unavailable", reason: "unauthorized" });
    }
    expect(readTranscript).not.toHaveBeenCalled();
    await store.request(scope, claudeRef("sess-1"), CLAUDE_REF);
    expect(store.get(scope, claudeRef("sess-1"), CLAUDE_REF)).toMatchObject({ state: "loaded" });
    expect(readTranscript).toHaveBeenCalledTimes(1);
  });

  it("wb-idq: between sessions (no cwd) the claude row is a visible transport failure, never no-loader, and the transcript is never read", async () => {
    const { deps } = wiringDeps(["claude:transcript"]);
    const readTranscript = vi.fn(async () => []);
    const store = createWorkbenchEvidenceStore({ ...deps, cwd: () => undefined, claudeRead: readTranscript } as never);
    await store.request(scope, claudeRef("sess-1"), CLAUDE_REF);
    expect(store.get(scope, claudeRef("sess-1"), CLAUDE_REF)).toEqual({ state: "unavailable", reason: "transport" });
    expect(readTranscript).not.toHaveBeenCalled();
  });

  it("wb-idq: a failing transcript read on a stale owning node is transport plus stale with no native text; a clock seam that is not an instant is transport", async () => {
    const { deps, projection } = wiringDeps(["claude:transcript"]);
    projection.markStale({ scope, ref: claudeRef("sess-1") });
    const failing = createWorkbenchEvidenceStore({ ...deps, claudeRead: async () => { throw new Error("socket closed: token=abc"); } } as never);
    await failing.request(scope, claudeRef("sess-1"), CLAUDE_REF);
    const entry = failing.get(scope, claudeRef("sess-1"), CLAUDE_REF);
    expect(entry).toEqual({ state: "unavailable", reason: "transport", freshness: "stale" });
    expect(JSON.stringify(entry)).not.toContain("token=abc");
    const badClock = createWorkbenchEvidenceStore({ ...deps, now: () => new Date(Number.NaN) } as never);
    await badClock.request(scope, claudeRef("sess-2"), CLAUDE_REF);
    expect(badClock.get(scope, claudeRef("sess-2"), CLAUDE_REF)).toMatchObject({ state: "unavailable", reason: "transport" });
  });

  it("wb-idq: one visible truncation marker: a row the adapter clipped loads truncated with the store's [truncated] line only, and a whole row that merely ends in the module's marker text is kept verbatim", async () => {
    const { deps } = wiringDeps(["claude:transcript"]);
    const marker = "… truncated (bounded preview)";
    const clipped = createWorkbenchEvidenceStore({ ...deps, claudeRead: async () => [{ type: "assistant" as const, uuid: CLAUDE_UUID, text: "cut here", clipped: true as const }] } as never);
    await clipped.request(scope, claudeRef("sess-1"), CLAUDE_REF);
    const entry = clipped.get(scope, claudeRef("sess-1"), CLAUDE_REF);
    expect(entry).toMatchObject({ state: "loaded", truncated: true });
    if (entry.state === "loaded") {
      expect(entry.preview.filter(line => line === "[truncated]")).toEqual(["[truncated]"]);
      expect(entry.preview.some(line => line.startsWith("… truncated"))).toBe(false);
      expect(entry.preview.slice(0, 2)).toEqual(["assistant:", "cut here"]);
    }
    const literal = createWorkbenchEvidenceStore({ ...deps, claudeRead: async () => [{ type: "assistant" as const, uuid: CLAUDE_UUID, text: `line one\n${marker}` }] } as never);
    await literal.request(scope, claudeRef("sess-2"), CLAUDE_REF);
    expect(literal.get(scope, claudeRef("sess-2"), CLAUDE_REF)).toMatchObject({ state: "loaded", truncated: false, preview: ["assistant:", "line one", marker] });
  });

  it("wb-idq: the claude:transcript grant has one definition (claude-evidence.ts) and evidence-producers re-exports it", () => {
    const root = new URL("../src/workbench/", import.meta.url);
    const defining = ["claude-evidence.ts", "evidence-producers.ts", "evidence-wiring.ts", "claude-transcript.ts"]
      .filter(file => /export const CLAUDE_TRANSCRIPT_GRANT\b/.test(readFileSync(new URL(file, root), "utf8")));
    expect(defining).toEqual(["claude-evidence.ts"]);
    expect(readFileSync(new URL("evidence-producers.ts", root), "utf8")).toMatch(/export \{ CLAUDE_TRANSCRIPT_GRANT \} from "\.\/claude-evidence\.js"/);
    expect(CLAUDE_TRANSCRIPT_GRANT).toBe("claude:transcript");
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

  it("renders a forge operation ref as the visible no-loader unknown when the host supplies no registry", async () => {
    const { deps } = wiringDeps(["forge:inspect"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    await store.request(scope, forgeRef, `forge-operation:${OPERATION}`);
    expect(store.get(scope, forgeRef, `forge-operation:${OPERATION}`)).toMatchObject({ state: "unavailable", reason: "no-loader" });
  });

  it("re-reads a forge operation through the registered capability under the operator's grants and carries the reader's labels", async () => {
    const { deps, invoke } = forgeDeps(["forge:inspect"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    const ref = `forge-operation:${OPERATION}`;
    await store.request(scope, forgeRef, ref);
    const entry = store.get(scope, forgeRef, ref);
    expect(entry.state).toBe("loaded");
    if (entry.state === "loaded") {
      expect(entry.provider).toBe("forge");
      expect(entry.freshness).toBe("current");
      expect(entry.truncated).toBe(false);
      expect(entry.preview[0]).toBe(ref);
      expect(entry.preview.join("\n")).toContain("status: success · FORGE_OK · current gate passed");
      expect(entry.producerReceipt).toBe(OPERATION);
      expect(entry.capturedAt).toBe(new Date(NOW).toISOString());
    }
    expect(invoke).toHaveBeenCalledTimes(1);
    const [capabilityId, input, context] = invoke.mock.calls[0] as [string, { target: string }, { grants: string[]; workspace: string; principal: { id: string } }];
    expect(capabilityId).toBe("forge.gate.status");
    expect(input).toEqual({ target: "/ws" });
    expect(context.grants).toEqual(["forge:inspect"]);
    expect(context.workspace).toBe("/ws");
    expect(context.principal.id).toBe(scope.principal);
  });

  it("labels a forge read stale when the owning node is stale and truncated when the reader bounded it", async () => {
    const { deps } = forgeDeps(["forge:inspect"], forgeReading(60), true);
    const store = createWorkbenchEvidenceStore(deps as never);
    const ref = `forge-operation:${OPERATION}`;
    await store.request(scope, forgeRef, ref);
    const entry = store.get(scope, forgeRef, ref);
    expect(entry).toMatchObject({ state: "loaded", freshness: "stale", truncated: true });
    // Exactly one truncation marker: the store's, never the reader's as well.
    if (entry.state === "loaded") expect(entry.preview.filter(line => line === "[truncated]")).toEqual(["[truncated]"]);
  });

  it("refuses an unobserved forge operation and a denied capability read without fabricating anything", async () => {
    const { deps, invoke } = forgeDeps(["forge:inspect"]);
    const store = createWorkbenchEvidenceStore(deps as never);
    await store.request(scope, forgeRef, "forge-operation:op_unlisted");
    expect(store.get(scope, forgeRef, "forge-operation:op_unlisted")).toMatchObject({ state: "unavailable", reason: "unauthorized" });
    expect(invoke).not.toHaveBeenCalled();
    invoke.mockRejectedValueOnce(new CapabilityError("authorization", "Forge read denied outside the authorized workspace scope."));
    await store.request(scope, forgeRef, `forge-operation:${OPERATION}`);
    expect(store.get(scope, forgeRef, `forge-operation:${OPERATION}`)).toMatchObject({ state: "unavailable", reason: "unauthorized" });
    // A reading that names another operation is a visible transport failure, never a substituted result.
    invoke.mockResolvedValueOnce(forgeReading(1, "op_other"));
    const otherRef: NativeRef = { ...forgeRef, id: "second" };
    await store.request(scope, otherRef, `forge-operation:${OPERATION}`);
    expect(store.get(scope, otherRef, `forge-operation:${OPERATION}`)).toMatchObject({ state: "unavailable" });
    expect(JSON.stringify(store.get(scope, otherRef, `forge-operation:${OPERATION}`))).not.toContain("op_other");
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
