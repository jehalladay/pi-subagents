/**
 * wb-hqa (T3, the bead's row): the BOOTED extension admits a real-shaped Claude SDK session target through the registered
 * workflow_control once the production observer path has stated the session -> agent-call ownership edge from the SDK's
 * own system/init session_id, and settles the acknowledged interrupt into a result phase from the observer's report of the
 * call's own terminal. The extension (src/index.ts default export) is booted through test/helpers/boot-extension.ts with
 * the claude backend; the Claude Agent SDK's query() is replaced by a value-returning fixture (the one pre-existing
 * substitution test/workbench-pi-streaming.test.ts uses) whose stream exposes a function-valued own interrupt(), so the
 * host's own onQueryLive retention fires and every verb is counted at the seam. Fixture-class, default gate, no credential:
 * the live realised strict reading is Cut 2's receipt of record.
 *
 * Rows B1-B11 of docs/workbench/receipts/wb-hqa.md. Outcomes follow the landed mapping (ruling R2): a real-shaped interrupt
 * terminal (failed) settles unknown; only the runtime controller's own abort settles cancelled; nothing reads completed.
 */
import { realpathSync, writeFileSync } from "node:fs";
import { userInfo } from "node:os";
import { join } from "node:path";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { type NativeRef, ObservationProjection } from "../src/workbench/observation.js";
import { collapse } from "../src/workflow/progress.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import * as taskModule from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const native = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@anthropic-ai/claude-agent-sdk", async original => ({ ...await original(), query: native.query }));

const GRANT = "control:claude-agent-sdk.interrupt";
const OBSERVE = "workbench:observe";
const ACK_REF = "claude-agent-sdk:interrupt_receipt_v1:still_queued=0";
const POLICY = "exact-grant+confirmed-owner+operator-confirmed";
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/;
const HEAD = 'export const meta={name:"hqa-booted",description:"wb-hqa booted control row"};\n';
const ONE = 'return await agent("one",{label:"owned"});';
const TIMEOUT = 30_000;

const frame = (value: unknown): SDKMessage => value as SDKMessage;
const init = (id: string): SDKMessage => frame({ type: "system", subtype: "init", session_id: id, uuid: `init-${id}`, model: "claude-opus-5-5", tools: [], permissionMode: "dontAsk" });
const success = (id: string): SDKMessage => frame({ type: "result", subtype: "success", session_id: id, uuid: `result-${id}`, is_error: false, result: "done", modelUsage: {}, permission_denials: [] });
/** The terminal shape the a2g.12 receipt of record measured for a real mid-stream interrupt (docs/workbench/receipts/wb-a2g.12.md). */
const measuredAbort = (id: string): SDKMessage => frame({
  type: "result", subtype: "error_during_execution", session_id: id, uuid: `result-${id}`, is_error: true, errors: ["aborted"], stop_reason: null, terminal_reason: "aborted_streaming", permission_denials: [],
});
const assistant = (id: string, text: string): SDKMessage => frame({ type: "assistant", session_id: id, uuid: `asst-${id}`, parent_tool_use_id: null, message: { id: `msg-${id}`, role: "assistant", model: "claude-opus-5-5", content: [{ type: "text", text }] } });
const sessionRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
const interruptOf = (id: string, confirmed = true): Record<string, unknown> => ({ target: sessionRef(id), action: "interrupt", ...(confirmed ? { confirmed: true } : {}) });

type Interrupt = Mock<() => Promise<unknown>>;
type ParkedStream = AsyncIterable<SDKMessage> & { interrupt(): Promise<unknown> };
interface QueryInput { readonly prompt: string; readonly options: { abortController?: AbortController } }
interface Fixture {
  /** The function-valued own interrupt the host's onQueryLive retention reads; counted per query. */
  readonly interrupt: Interrupt;
  /** Releases the parked stream with its tail frames; the stream then ends. */
  release(tail: SDKMessage[]): void;
  readonly query: (input: QueryInput) => ParkedStream;
  readonly calls: number[];
}
/**
 * A value-returning query() stand-in: yields `before`, parks on a test-released promise, then yields the tail. The host's
 * own AbortController (the runtime controller's abort, or session_shutdown) rejects the parked read, as the SDK's abort does.
 */
function fixture(before: SDKMessage[], interrupt: Interrupt = vi.fn(async (): Promise<unknown> => ({ still_queued: [] }))): Fixture {
  let release: (tail: SDKMessage[]) => void = () => undefined;
  let abort: (error: Error) => void = () => undefined;
  const gate = new Promise<SDKMessage[]>((resolve, reject) => { release = resolve; abort = reject; });
  gate.catch(() => undefined);
  const calls: number[] = [];
  return {
    interrupt, calls,
    release: tail => release(tail),
    query: ({ options }) => {
      calls.push(Date.now());
      options.abortController?.signal.addEventListener("abort", () => abort(new Error("AbortError")), { once: true });
      const stream: ParkedStream = {
        interrupt: () => interrupt(),
        async *[Symbol.asyncIterator]() {
          yield* before;
          const tail = await gate;
          yield* tail;
        },
      };
      return stream;
    },
  };
}

type Reply = { ok: boolean; invoked: boolean; status: string; completion?: string; control?: { phase?: string; requiredGrant?: string; requested?: { requestId?: string; ownershipConfirmationRef?: string; policy?: string; grant?: string }; acknowledged?: { nativeAckRef?: string; acknowledgedAt?: string }; result?: unknown }; error?: { code: string; category?: string } };
interface Observed { taskId: string; status: string; nodes: Array<{ nativeRef: NativeRef; kind: string; freshness: string; evidenceRefs: string[] }> }
interface Booted {
  readonly dir: string;
  call(tool: string, params: Record<string, unknown>): Promise<string>;
  control(params: Record<string, unknown>): Promise<Reply>;
  observe(taskId: string): Promise<Observed>;
  launch(script: string): Promise<{ taskId: string; task: WorkflowTask }>;
  setGrants(grants: string[]): void;
  shutdown(): Promise<void>;
  readonly tools: Map<string, unknown>;
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
let booted: Booted | undefined;
afterEach(async () => {
  await booted?.shutdown();
  booted = undefined;
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
  native.query.mockReset();
});

const settingsFor = (backend: "claude" | "pi", grants: string[]): Record<string, unknown> =>
  ({ workflowsEnabled: true, workbench: { workflowAgentBackend: backend, model: "claude-opus-5-5", tools: [], capabilityGrants: grants } });

/** Boots the REAL extension (test/workbench-pi-forge-gate-run.test.ts shape) under the claude backend with the given grants. */
async function boot(grants: string[] = [GRANT, OBSERVE], backend: "claude" | "pi" = "claude"): Promise<Booted> {
  sandbox = hermeticDir({ settings: settingsFor(backend, grants) });
  const dir = sandbox.dir;
  // The task record is closure-private to the extension; the card renderer receives a copied subset without the control
  // audit, so the live record is read through a call-through spy on the one function that mints it.
  const created = vi.spyOn(taskModule, "createWorkflowTask");
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  let calls = 0;
  const call = async (tool: string, params: Record<string, unknown>): Promise<string> => {
    calls += 1;
    return textOf(await pi.tools.get(tool).execute(`hqa-${calls}`, params, undefined, undefined, context));
  };
  let shutdownDone = false;
  booted = {
    dir, tools: pi.tools, call,
    control: async params => JSON.parse(await call("workflow_control", params)) as Reply,
    observe: async taskId => JSON.parse(await call("workflow_observe", { taskId })) as Observed,
    async launch(script) {
      const reply = await pi.tools.get("SubagentWorkflow").execute("hqa-wf", { script: HEAD + script }, undefined, undefined, context);
      const taskId = (reply.details as { taskId?: string } | undefined)?.taskId;
      if (taskId === undefined) throw new Error(`SubagentWorkflow started no task: ${textOf(reply)}`);
      const task = created.mock.results.map(entry => (entry.type === "return" ? entry.value : undefined)).find(candidate => candidate?.id === taskId);
      if (task === undefined) throw new Error(`no task record minted for ${taskId}`);
      return { taskId, task };
    },
    setGrants(next) { writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify(settingsFor(backend, next))); },
    async shutdown() {
      if (shutdownDone) return;
      shutdownDone = true;
      await pi.lifecycle.get("session_shutdown")?.({}, context);
    },
  };
  return booted;
}
async function until(predicate: () => boolean | Promise<boolean>, what: string, ms = 10_000): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < ms) {
    if (await predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error(`timed out waiting for ${what}`);
}
const sessionNode = (observed: Observed, id: string) => observed.nodes.find(node => node.nativeRef.provider === "claude-agent-sdk" && node.nativeRef.type === "session" && node.nativeRef.id === id);
const phases = (task: WorkflowTask): string[] => (task.controlAudit?.receipts ?? []).map(receipt => receipt.phase);
const principal = (): string => `local-operator:${process.getuid?.() ?? userInfo().username}:s1`;

/** B1's steps: launch one owned call, wait for the production path to show its session, interrupt it through the registered tool. */
async function admit(client: Booted, fx: Fixture, sessionId = "native-ctl"): Promise<{ taskId: string; task: WorkflowTask; reply: Reply }> {
  native.query.mockImplementation(fx.query);
  const { taskId, task } = await client.launch(ONE);
  await until(async () => sessionNode(await client.observe(taskId), sessionId) !== undefined, `the session node ${sessionId}`);
  const reply = await client.control(interruptOf(sessionId));
  return { taskId, task, reply };
}

describe("wb-hqa booted row: admission and the result phase through the registered tools", () => {
  it("B1 admission after init through the registered tool: the production observer path states session -> agent-call ownership from the system/init session_id and workflow_control acknowledges exactly one interrupt", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const relate = vi.spyOn(ObservationProjection.prototype, "relate");
    const fx = fixture([init("native-ctl")]);
    const { taskId, reply } = await admit(client, fx);
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged", completion: "not-asserted" });
    expect(reply.error).toBeUndefined();
    expect(reply.control?.phase).toBe("acknowledged");
    expect(reply.control?.requested?.ownershipConfirmationRef).toBe("native-ctl");
    expect(reply.control?.requested?.policy).toBe(POLICY);
    expect(reply.control?.requested?.grant).toBe(GRANT);
    expect(reply.control?.requested?.requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
    expect(reply.control?.acknowledged?.nativeAckRef).toBe(ACK_REF);
    expect(reply.control?.result).toBeUndefined();
    expect(fx.interrupt).toHaveBeenCalledTimes(1);
    const witnessed = relate.mock.calls.filter(([input]) => input.kind === "ownership" && input.from.id === "native-ctl");
    expect(witnessed).toHaveLength(1);
    expect(witnessed[0]?.[0]).toEqual({
      scope: { workspace: realpathSync(client.dir), principal: principal() },
      from: sessionRef("native-ctl"), to: { provider: "pi-workflow", type: "agent-call", id: `${taskId}:0` }, kind: "ownership",
      provenance: { source: "claude-agent-sdk", observedAt: expect.stringMatching(INSTANT), nativeConfirmationRef: "native-ctl" },
    });
    fx.release([success("native-ctl")]);
  });

  it("B2 result phase from the measured terminal shape: the observer's failed terminal settles outcome unknown with the session-named nativeResultRef, recorded in the audit and on the session node; the tool reply is never amended", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const fx = fixture([init("native-ctl")]);
    const { taskId, task, reply } = await admit(client, fx);
    expect(reply.status).toBe("acknowledged");
    const requestId = reply.control?.requested?.requestId ?? "";
    expect(phases(task)).toEqual(["requested", "acknowledged"]);
    fx.release([measuredAbort("native-ctl")]);
    await until(() => phases(task).length === 3, "the result phase");
    const receipts = task.controlAudit?.receipts ?? [];
    expect(receipts.map(receipt => receipt.phase)).toEqual(["requested", "acknowledged", "result"]);
    expect(new Set(receipts.map(receipt => receipt.requestId))).toEqual(new Set([requestId]));
    const result = receipts[2];
    if (result === undefined || result.phase !== "result") throw new Error("expected a result receipt");
    expect(result.outcome).toBe("unknown");
    expect(result.nativeResultRef).toMatch(/^claude-agent-sdk:session:native-ctl:failed@\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/);
    expect(result.nativeAckRef).toBe(ACK_REF);
    expect(Date.parse(result.settledAt)).toBeGreaterThanOrEqual(Date.parse(result.acknowledgedAt));
    expect(result.ownershipConfirmationRef).toBe("native-ctl");
    const observed = await client.observe(taskId);
    const node = sessionNode(observed, "native-ctl");
    expect(node?.evidenceRefs).toEqual(expect.arrayContaining([`control-receipt:${requestId}`, `native-result:${result.nativeResultRef}`]));
    expect(node?.freshness).toBe("stale");
    expect(task.logs).toEqual([]);
    await until(() => task.status !== "running", "the run to settle");
    expect(collapse(task.workflowProgress).agents[0]?.nativeObservation?.terminal).toBe("failed");
    expect(phases(task)).toHaveLength(3);
  });

  it("B3 before init: the session is not observed, so the registered tool denies cross-scope and no verb reaches the seam", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const fx = fixture([]);
    native.query.mockImplementation(fx.query);
    const { taskId } = await client.launch(ONE);
    await until(() => fx.calls.length === 1, "the query to start");
    const reply = await client.control(interruptOf("native-ctl"));
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error).toMatchObject({ code: "cross-scope", category: "authorization" });
    expect(fx.interrupt).not.toHaveBeenCalled();
    expect((await client.observe(taskId)).nodes.filter(node => node.nativeRef.provider === "claude-agent-sdk")).toEqual([]);
    fx.release([init("native-ctl"), success("native-ctl")]);
  });

  it("B4 after the terminal: the ownership edge persists (identity, not liveness) and the leg answers the typed no-live-query refusal with no further verb", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const fx = fixture([init("native-ctl")]);
    const { task } = await admit(client, fx);
    fx.release([measuredAbort("native-ctl")]);
    await until(() => phases(task).length === 3, "the result phase");
    const late = await client.control(interruptOf("native-ctl"));
    expect(late).toMatchObject({ ok: false, invoked: true, status: "refused" });
    expect(late.error).toMatchObject({ code: "no-live-query", category: "unavailable" });
    expect(late.control?.phase).toBe("requested");
    expect(late.control?.requested?.ownershipConfirmationRef).toBe("native-ctl");
    expect(fx.interrupt).toHaveBeenCalledTimes(1);
  });

  it("B5 denials before the seam: observer-only, missing-exact-grant and operator-confirmation each refuse with zero verbs and zero audit growth", { timeout: TIMEOUT }, async () => {
    const client = await boot([OBSERVE]);
    const fx = fixture([init("native-ctl")]);
    native.query.mockImplementation(fx.query);
    const { taskId, task } = await client.launch(ONE);
    await until(async () => sessionNode(await client.observe(taskId), "native-ctl") !== undefined, "the session node");
    const denials: Array<{ grants: string[]; confirmed: boolean; code: string; category: string }> = [
      { grants: [OBSERVE], confirmed: true, code: "observer-only", category: "authorization" },
      { grants: ["control:forge.cancel", OBSERVE], confirmed: true, code: "missing-exact-grant", category: "authorization" },
      { grants: [GRANT, OBSERVE], confirmed: false, code: "operator-confirmation", category: "validation" },
    ];
    for (const denial of denials) {
      client.setGrants(denial.grants);
      const reply = await client.control(interruptOf("native-ctl", denial.confirmed));
      expect(reply, denial.code).toMatchObject({ ok: false, invoked: false, status: "refused" });
      expect(reply.error, denial.code).toMatchObject({ code: denial.code, category: denial.category });
      if (denial.code === "missing-exact-grant") expect(reply.control?.requiredGrant).toBe(GRANT);
      expect(fx.interrupt).not.toHaveBeenCalled();
      expect(task.controlAudit).toBeUndefined();
    }
    fx.release([success("native-ctl")]);
  });

  it("B6 the one definite outcome is the call's own cancellation: the runtime controller's skip aborts the call, the observer reads cancelled and the result settles cancelled", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const fx = fixture([init("native-ctl")]);
    const { task } = await admit(client, fx);
    expect(phases(task)).toEqual(["requested", "acknowledged"]);
    expect(task.control?.skip(0)).toBe(true);
    await until(() => phases(task).length === 3, "the result phase");
    const result = task.controlAudit?.receipts[2];
    if (result === undefined || result.phase !== "result") throw new Error("expected a result receipt");
    expect(result.outcome).toBe("cancelled");
    expect(result.nativeResultRef).toMatch(/^claude-agent-sdk:session:native-ctl:cancelled@/);
    expect(collapse(task.workflowProgress).agents[0]?.nativeObservation?.terminal).toBe("cancelled");
    expect(fx.interrupt).toHaveBeenCalledTimes(1);
    expect(task.logs).toEqual([]);
  });

  it("B7 shutdown is honest teardown: an acknowledged interrupt pending at session_shutdown settles no result anywhere, nothing throws, and the progress row still reads terminal cancelled", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const ingest = vi.spyOn(ObservationProjection.prototype, "ingest");
    const fx = fixture([init("native-ctl")]);
    const { task } = await admit(client, fx);
    expect(phases(task)).toEqual(["requested", "acknowledged"]);
    const progress = task.workflowProgress;
    await expect(client.shutdown()).resolves.toBeUndefined();
    await until(() => collapse(progress).agents[0]?.nativeObservation?.terminal === "cancelled", "the cancelled terminal");
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(phases(task)).toEqual(["requested", "acknowledged"]);
    expect(ingest.mock.calls.filter(([event]) => event.kind === "control.result")).toEqual([]);
    expect(task.logs).toEqual([]);
    expect(fx.interrupt).toHaveBeenCalledTimes(1);
  });

  it("B8 sibling unaffected: of two parallel calls only the interrupted session's query sees a verb; the sibling reaches succeeded with no control event, and each call's ownership names its own session id", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const relate = vi.spyOn(ObservationProjection.prototype, "relate");
    const ingest = vi.spyOn(ObservationProjection.prototype, "ingest");
    const a = fixture([init("sib-a")]);
    const b = fixture([init("sib-b")]);
    native.query.mockImplementation((input: QueryInput) => (input.prompt === "a" ? a.query(input) : b.query(input)));
    const { taskId, task } = await client.launch('return await parallel([()=>agent("a",{label:"a"}),()=>agent("b",{label:"b"})]);');
    await until(async () => { const seen = await client.observe(taskId); return sessionNode(seen, "sib-a") !== undefined && sessionNode(seen, "sib-b") !== undefined; }, "both sessions");
    const reply = await client.control(interruptOf("sib-a"));
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    expect(reply.control?.requested?.ownershipConfirmationRef).toBe("sib-a");
    expect(a.interrupt).toHaveBeenCalledTimes(1);
    expect(b.interrupt).not.toHaveBeenCalled();
    a.release([measuredAbort("sib-a")]);
    b.release([success("sib-b")]);
    await until(() => task.status !== "running", "the run to settle");
    await until(() => phases(task).length === 3, "the result phase");
    const agents = collapse(task.workflowProgress).agents;
    expect(agents.find(agent => agent.sessionId === "sib-b")?.nativeObservation?.terminal).toBe("succeeded");
    expect(agents.find(agent => agent.sessionId === "sib-a")?.nativeObservation?.terminal).toBe("failed");
    expect(b.interrupt).not.toHaveBeenCalled();
    expect(ingest.mock.calls.filter(([event]) => event.source.id === "sib-b" && event.kind.startsWith("control."))).toEqual([]);
    const edges = relate.mock.calls.map(([input]) => input).filter(input => input.kind === "ownership");
    expect(edges.map(input => input.provenance.nativeConfirmationRef).sort()).toEqual(["sib-a", "sib-b"]);
    for (const edge of edges) {
      expect(edge.from).toEqual(sessionRef(edge.provenance.nativeConfirmationRef ?? ""));
      expect(edge.to).toEqual({ provider: "pi-workflow", type: "agent-call", id: expect.stringMatching(new RegExp(`^${taskId}:[01]$`)) });
      expect(edge.provenance.source).toBe("claude-agent-sdk");
    }
    expect(new Set(edges.map(edge => edge.to.id)).size).toBe(2);
    expect(sessionNode(await client.observe(taskId), "sib-b")?.evidenceRefs.filter(ref => ref.startsWith("control-"))).toEqual([]);
  });

  it("B9 no system/init, no ownership: a stream that reports its session id only on assistant and result frames is observed but never owned, so the registered tool denies no-confirmed-ownership with zero verbs", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const fx = fixture([assistant("no-init", "hello")]);
    native.query.mockImplementation(fx.query);
    const { taskId } = await client.launch(ONE);
    await until(async () => sessionNode(await client.observe(taskId), "no-init") !== undefined, "the session node no-init");
    const reply = await client.control(interruptOf("no-init"));
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error).toMatchObject({ code: "no-confirmed-ownership", category: "authorization" });
    expect(fx.interrupt).not.toHaveBeenCalled();
    fx.release([success("no-init")]);
  });

  it("B10 terminal before retention: when the stream ends before interrupt() answers, the reply is still acknowledged, no result is minted, exactly one diagnostic line names the request id and stale-observation, and a later run behaves as B1", { timeout: TIMEOUT }, async () => {
    const client = await boot();
    const ingest = vi.spyOn(ObservationProjection.prototype, "ingest");
    let release: (tail: SDKMessage[]) => void = () => undefined;
    const interrupt = vi.fn((): Promise<unknown> => {
      release([measuredAbort("native-ctl")]);
      return new Promise(resolve => setTimeout(() => resolve({ still_queued: [] }), 20));
    });
    const fx = fixture([init("native-ctl")], interrupt);
    release = fx.release;
    const { task, reply } = await admit(client, fx);
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    const requestId = reply.control?.requested?.requestId ?? "";
    await until(() => task.logs.length === 1, "the diagnostic line");
    expect(task.logs).toEqual([`workflow_control ${requestId}: result not established (stale-observation)`]);
    expect(phases(task)).toEqual(["requested", "acknowledged"]);
    expect(ingest.mock.calls.filter(([event]) => event.kind === "control.result")).toEqual([]);
    await until(() => task.status !== "running", "the run to settle");
    expect(collapse(task.workflowProgress).agents[0]?.nativeObservation?.terminal).toBe("failed");
    // A later run on the same booted extension is unaffected: admitted and acknowledged as B1.
    const next = fixture([init("native-later")]);
    const later = await admit(client, next, "native-later");
    expect(later.reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    expect(later.reply.control?.requested?.ownershipConfirmationRef).toBe("native-later");
    expect(next.interrupt).toHaveBeenCalledTimes(1);
    next.release([success("native-later")]);
    expect(task.logs).toHaveLength(1);
  });

  it("B11 backend gating: under the pi backend no workflow_control is registered and the fixture query is never called", { timeout: TIMEOUT }, async () => {
    const client = await boot([GRANT, OBSERVE], "pi");
    expect(client.tools.get("workflow_control")).toBeUndefined();
    expect(client.tools.get("workflow_observe")).toBeUndefined();
    expect(client.tools.get("SubagentWorkflow")).toBeDefined();
    expect(native.query).not.toHaveBeenCalled();
  });
});
