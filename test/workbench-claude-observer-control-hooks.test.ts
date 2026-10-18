/**
 * wb-hqa (T2): createClaudeObserver's optional control hooks. The observer publishes the display snapshot of a frame
 * FIRST, then calls onInit on the system/init frame (and only that frame) with the SDK's own session_id, and onTerminal
 * after the terminal publish with the Pick of the terminal snapshot. The one-argument form is unchanged. Through the real
 * host and the fixture query seam the ordering the settle flow depends on is measured: onQueryDone (the live maps' deletion
 * in src/index.ts) precedes onTerminal, so a settle keyed on the live maps would always miss and the retention is separate.
 *
 * Rows H1-H5 of docs/workbench/receipts/wb-hqa.md. No SDK process is spawned: the host is driven through its documented
 * fixture query seam (test/helpers/claude-sdk-stream.ts).
 */
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type ClaudeObserverControlHooks, createClaudeControlObserver, createClaudeControlRetention } from "../src/workbench/claude-control-observer.js";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createClaudeObserver } from "../src/workbench/claude-transcript.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { ClaudeNativeObservation } from "../src/workflow/progress.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { sdkAssistantText, sdkResultSuccess, sdkSuccess } from "./helpers/claude-sdk-stream.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const call: ClaudeCallIdentity = { agentId: "one", index: 0, label: "first" };
const message = (value: unknown): SDKMessage => value as SDKMessage;
const init = (sessionId: string): SDKMessage => message({ type: "system", subtype: "init", session_id: sessionId, uuid: `init-${sessionId}`, model: "claude-opus-5-5", tools: [], permissionMode: "dontAsk" });
type TerminalPick = Pick<ClaudeNativeObservation, "provider" | "sessionId" | "freshness" | "terminal">;
function recorder(log: string[] = []): { hooks: ClaudeObserverControlHooks; log: string[]; inits: Array<[ClaudeCallIdentity, string]>; terminals: Array<[ClaudeCallIdentity, TerminalPick]> } {
  const inits: Array<[ClaudeCallIdentity, string]> = [];
  const terminals: Array<[ClaudeCallIdentity, TerminalPick]> = [];
  return {
    log, inits, terminals,
    hooks: {
      onInit: (identity, sessionId) => { inits.push([identity, sessionId]); log.push(`init:${sessionId}`); },
      onTerminal: (identity, observation) => { terminals.push([identity, { ...observation }]); log.push(`terminal:${observation.terminal ?? "none"}`); },
    },
  };
}
const spawnRequest = (over: Record<string, unknown> = {}) =>
  ({ agentId: call.agentId, index: call.index, prompt: "hello", label: call.label, agentType: "general-purpose", ...over }) as never;

describe("wb-hqa H1-H3: the hooks on recorded frames", () => {
  it("H1 only the init frame fires onInit, once, with the call and the SDK's session_id; frames carrying session_id that are not system/init never fire it; onTerminal fires once with the terminal Pick", () => {
    const { hooks, inits, terminals } = recorder();
    const observer = createClaudeObserver(() => undefined, hooks);
    observer.onMessage(init("s-hook"), call);
    observer.onMessage(message({ type: "user", uuid: "user-1", session_id: "s-hook", message: { role: "user", content: "hi" } }), call);
    observer.onMessage(message({ type: "assistant", uuid: "asst-1", session_id: "s-hook", message: { content: [{ type: "tool_use", id: "tool-1", name: "Read", input: {} }] } }), call);
    observer.onMessage(message({ type: "stream_event", uuid: "stream-frame", session_id: "s-hook", event: { type: "content_block_delta", delta: { type: "text_delta", text: "more" } } }), call);
    observer.onMessage(message({ type: "system", subtype: "permission_denied", session_id: "s-hook", uuid: "denied", tool_use_id: "t-2", tool_name: "Write", message: "no" }), call);
    observer.onMessage(message({ type: "result", uuid: "result-frame", session_id: "s-hook", subtype: "success" }), call);
    expect(inits).toEqual([[call, "s-hook"]]);
    expect(terminals).toEqual([]);
    observer.onSettled({ ok: true, sessionId: "s-hook" }, call);
    expect(inits).toHaveLength(1);
    expect(terminals).toEqual([[call, { provider: "claude-agent-sdk", sessionId: "s-hook", freshness: "current", terminal: "succeeded" }]]);
  });

  it("H2 emit before hook: the display emit of the init frame precedes onInit and the terminal emit precedes onTerminal; the hook payload is the Pick of the last emitted snapshot", () => {
    const log: string[] = [];
    let last: ClaudeNativeObservation | undefined;
    const { hooks, terminals } = recorder(log);
    const observer = createClaudeObserver((_, snapshot) => { last = snapshot; log.push(`emit:${snapshot.terminal ?? `live:${snapshot.observedMessages}`}`); }, hooks);
    observer.onMessage(init("s-hook"), call);
    expect(log).toEqual(["emit:live:1", "init:s-hook"]);
    observer.onMessage(message({ type: "assistant", uuid: "asst-1", session_id: "s-hook", message: { content: [{ type: "text", text: "answer" }] } }), call);
    observer.onMessage(message({ type: "result", uuid: "result-frame", session_id: "s-hook", subtype: "success" }), call);
    observer.onSettled({ ok: true, sessionId: "s-hook" }, call);
    expect(log.slice(-2)).toEqual(["emit:succeeded", "terminal:succeeded"]);
    expect(last).toBeDefined();
    const emitted = last as ClaudeNativeObservation;
    expect(terminals[0]?.[1]).toEqual({ provider: emitted.provider, sessionId: emitted.sessionId, freshness: emitted.freshness, terminal: emitted.terminal });
    expect(emitted.observedMessages).toBe(3);
  });

  it("H3 terminal derivation parity through the hooks: skipped is cancelled, no result frame is observation_lost with freshness unknown, a result frame then ok false is failed", () => {
    const cancelled = recorder();
    const first = createClaudeObserver(() => undefined, cancelled.hooks);
    first.onMessage(init("s-cancel"), call);
    first.onSettled({ ok: false, skipped: true, sessionId: "s-cancel", error: "Claude SDK query was cancelled." }, call);
    expect(cancelled.terminals).toEqual([[call, { provider: "claude-agent-sdk", sessionId: "s-cancel", freshness: "current", terminal: "cancelled" }]]);
    const lost = recorder();
    const second = createClaudeObserver(() => undefined, lost.hooks);
    second.onMessage(init("s-lost"), call);
    second.onSettled({ ok: false, sessionId: "s-lost", error: "Claude SDK stream ended without a result message." }, call);
    expect(lost.terminals).toEqual([[call, { provider: "claude-agent-sdk", sessionId: "s-lost", freshness: "unknown", terminal: "observation_lost" }]]);
    const failed = recorder();
    const third = createClaudeObserver(() => undefined, failed.hooks);
    third.onMessage(init("s-failed"), call);
    third.onMessage(message({ type: "result", uuid: "result-frame", session_id: "s-failed", subtype: "error_during_execution", is_error: true, errors: ["aborted"], permission_denials: [] }), call);
    third.onSettled({ ok: false, sessionId: "s-failed", error: "aborted" }, call);
    expect(failed.terminals).toEqual([[call, { provider: "claude-agent-sdk", sessionId: "s-failed", freshness: "current", terminal: "failed" }]]);
  });

  it("H3b the one-argument form is unchanged: createClaudeObserver(emit) still emits 65 snapshots over 200 frames plus settle, exactly as test/workbench-claude-observer.test.ts measures it", () => {
    const snapshots: ClaudeNativeObservation[] = [];
    const observer = createClaudeObserver((_, snapshot) => snapshots.push(snapshot));
    for (let n = 0; n < 200; n++) observer.onMessage(message({ type: "assistant", uuid: `m-${n}`, session_id: "native", message: { content: [{ type: "tool_use", id: `tool-${n}`, name: "Read", input: {} }] } }), call);
    observer.onSettled({ ok: true, sessionId: "native" }, call);
    expect(snapshots).toHaveLength(65);
    expect(snapshots.at(-1)).toMatchObject({ observedMessages: 200, terminal: "succeeded", toolsTruncated: true });
  });
});

describe("wb-hqa H4-H5: through the real host and the fixture query seam", () => {
  let dir: string | undefined;
  afterEach(() => { removeScratch(dir); dir = undefined; });

  it("H4 the init hook sees the session id before the assistant frame and the terminal hook sees succeeded; with an interrupt-bearing stream onQueryDone fires BEFORE onTerminal", async () => {
    dir = makeScratch("wb-hqa-hooks-");
    const log: string[] = [];
    const { hooks, inits, terminals } = recorder(log);
    const observer = createClaudeObserver((_, snapshot) => { log.push(`emit:${snapshot.terminal ?? "live"}`); }, hooks);
    const plain = createClaudeWorkflowHost({
      cwd: dir, query: () => (async function* () { yield* sdkSuccess("sess-h4", "done"); })(),
      onMessage: (frame, identity) => { log.push(`frame:${frame.type}`); observer.onMessage(frame, identity); },
      onSettled: observer.onSettled,
    });
    const result = await plain.spawnAgent(spawnRequest());
    expect(result.ok).toBe(true);
    // The host hands every hook the spawn request as the call identity (claude-host.ts: request ?? previous.call), so the
    // identity is matched structurally on ClaudeCallIdentity's fields.
    expect(inits).toHaveLength(1);
    expect(inits[0]?.[0]).toMatchObject(call);
    expect(inits[0]?.[1]).toBe("sess-h4");
    expect(log.indexOf("init:sess-h4")).toBeGreaterThan(log.indexOf("frame:system"));
    expect(log.indexOf("init:sess-h4")).toBeLessThan(log.indexOf("frame:assistant"));
    expect(terminals).toHaveLength(1);
    expect(terminals[0]?.[0]).toMatchObject(call);
    expect(terminals[0]?.[1]).toEqual({ provider: "claude-agent-sdk", sessionId: "sess-h4", freshness: "current", terminal: "succeeded" });
    expect(log.at(-1)).toBe("terminal:succeeded");
    expect(log.at(-2)).toBe("emit:succeeded");
    // The ordering the settle flow (D6) depends on: the host's finally runs onQueryDone before spawnAgent fires onSettled.
    const order: string[] = [];
    const second = recorder(order);
    const retained = createClaudeObserver(() => undefined, second.hooks);
    const interrupt = vi.fn(async (): Promise<unknown> => ({ still_queued: [] }));
    const stream = { interrupt, async *[Symbol.asyncIterator]() { yield* sdkSuccess("sess-h4b", "done"); } };
    const host = createClaudeWorkflowHost({
      cwd: dir, query: () => stream, onMessage: retained.onMessage, onSettled: retained.onSettled,
      onQueryLive: () => { order.push("queryLive"); }, onQueryDone: () => { order.push("queryDone"); },
    });
    expect((await host.spawnAgent(spawnRequest())).ok).toBe(true);
    expect(order).toEqual(["queryLive", "init:sess-h4b", "queryDone", "terminal:succeeded"]);
    expect(interrupt).not.toHaveBeenCalled();
  });

  it("H5 a stream without system/init states no ownership: onInit never fires and the production hooks relate nothing; the production hooks over a refusing relate leave spawnAgent ok and count the refusal", async () => {
    dir = makeScratch("wb-hqa-noinit-");
    const scope: ObservationScope = { workspace: dir, principal: "operator" };
    const invocationId = "wf_hqah5000001";
    const sessionRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
    /** The production observer callback's ingest, mirrored: the session node appears before the hooks run. */
    function emitter(projection: ObservationProjection): (identity: ClaudeCallIdentity, snapshot: ClaudeNativeObservation) => void {
      let sequence = 0;
      return (identity, snapshot) => {
        sequence += 1;
        projection.ingest({
          projectionEventId: `${invocationId}:claude.stream:${sequence}`,
          source: snapshot.sessionId ? sessionRef(snapshot.sessionId) : { provider: "pi-workflow", type: "agent-call", id: `${invocationId}:${identity.index}` },
          scope, sourceSequence: sequence, observedAt: new Date().toISOString(), kind: "claude.stream",
          node: { presentation: { title: identity.label, type: "agent", statusText: snapshot.terminal ?? "observed-running", statusTone: snapshot.terminal ? "unknown" : "active" } },
          trace: { invocationId },
        });
      };
    }
    const projection = new ObservationProjection();
    const tasks = new Map<string, WorkflowTask>();
    const now = (): string => new Date().toISOString();
    const retention = createClaudeControlRetention({ projection, tasks, now });
    const hooks = createClaudeControlObserver({ invocationId, scope, projection, now, retention });
    const inits: string[] = [];
    const observer = createClaudeObserver(emitter(projection), {
      onInit: (_identity, sessionId) => { inits.push(sessionId); hooks.onInit(_identity, sessionId); },
      onTerminal: hooks.onTerminal,
    });
    const noInit = createClaudeWorkflowHost({
      cwd: dir, query: () => (async function* () { yield sdkAssistantText("no-init", "hello"); yield sdkResultSuccess("no-init", "hello"); })(),
      onMessage: observer.onMessage, onSettled: observer.onSettled,
    });
    const result = await noInit.spawnAgent(spawnRequest());
    expect(result.ok).toBe(true);
    expect(result.sessionId).toBe("no-init");
    expect(inits).toEqual([]);
    expect(projection.query({ scope, ref: sessionRef("no-init"), limit: 1 }).nodes).toHaveLength(1);
    expect(projection.relations({ scope })).toEqual([]);
    expect(hooks.diagnostics()).toEqual({ ownershipStated: 0, ownershipWithheld: 0, ownershipRefused: 0 });
    // A refusing relate: the node is observed, the statement is attempted and refused, nothing propagates into the stream.
    class RefusingProjection extends ObservationProjection {
      override relate(): void {
        throw new Error("relate refused");
      }
    }
    const refusing = new RefusingProjection();
    const refusingHooks = createClaudeControlObserver({ invocationId, scope, projection: refusing, now, retention: createClaudeControlRetention({ projection: refusing, tasks, now }) });
    const guarded = createClaudeObserver(emitter(refusing), refusingHooks);
    const host = createClaudeWorkflowHost({
      cwd: dir, query: () => (async function* () { yield* sdkSuccess("sess-h5", "done"); })(),
      onMessage: guarded.onMessage, onSettled: guarded.onSettled,
    });
    const outcome = await host.spawnAgent(spawnRequest({ agentId: "two", index: 1, label: "second" }));
    expect(outcome.ok).toBe(true);
    expect(refusingHooks.diagnostics()).toEqual({ ownershipStated: 0, ownershipWithheld: 0, ownershipRefused: 1 });
    expect(refusing.relations({ scope })).toEqual([]);
  });
});
