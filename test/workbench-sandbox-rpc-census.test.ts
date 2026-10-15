/**
 * wb-ksz.5 (W19/WB-022 slice 2): sandbox RPC tool-surface census falsifier.
 *
 * Measurement only: src/ is untouched. The "child" here is the real workflow
 * Worker the runtime spawns; frames a hostile script could not send through the
 * VM are injected onto the host's side of that same Worker, so the HOST-side
 * handler under test is the real one.
 *
 * Quoted spec (docs/workbench/12-security.md):
 *   "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names."
 *   "Treat unknown permission data as deny."
 *   "Host-side deny even when script crafts raw RPC"
 *   "no serialized clients/private tokens across worker channel"
 *   "Disable untrusted script filesystem/network"
 */
import { createServer, type Server } from "node:net";
import { describe, expect, it, vi } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { WORKER_SOURCE } from "../src/workflow/worker-source.js";

type Frame = Record<string, unknown>;
type Spied = { emit(event: "message", frame: Frame): boolean; postMessage(message: unknown): void };

const spawned = vi.hoisted(() => ({ workers: [] as Spied[], sent: [] as Frame[] }));
vi.mock("node:worker_threads", async importOriginal => {
  const actual = await importOriginal<typeof import("node:worker_threads")>();
  class SpyWorker extends actual.Worker {
    constructor(...args: ConstructorParameters<typeof actual.Worker>) {
      super(...args);
      spawned.workers.push(this as unknown as Spied);
      const original = this.postMessage.bind(this);
      this.postMessage = ((message: unknown, ...rest: never[]) => {
        spawned.sent.push(message as Frame);
        return original(message, ...rest);
      }) as typeof this.postMessage;
    }
  }
  return { ...actual, Worker: SpyWorker };
});

const HEAD = 'export const meta={name:"rpc-census",description:"W19 slice 2"};\n';
const PROTECTED = "fixture.protected.read";
const REGISTERED = "fixture.registered.read";
const flush = async (): Promise<void> => { await new Promise(resolve => setTimeout(resolve, 40)); };

interface Rig { readonly invoked: ReturnType<typeof vi.fn>; readonly callNode: ReturnType<typeof vi.fn>; readonly host: WorkflowHost; readonly release: () => void }
/** A registry-backed host holding one granted and one ungranted capability; callNode is the REAL registry path. */
function rig(grants: readonly string[]): Rig {
  const registry = new CapabilityRegistry();
  const invoked = vi.fn(async () => ({ ok: true }));
  registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] }, invoke: invoked });
  registry.register({ descriptor: { id: PROTECTED, version: "1.0.0", description: "ungranted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:admin"], supportedModes: ["invoke"] }, invoke: invoked });
  let release: () => void = () => {};
  const parked = new Promise<void>(resolve => { release = resolve; });
  const callNode = vi.fn(async (request: { capabilityId: string; input: unknown; signal: AbortSignal }) =>
    registry.invoke(request.capabilityId, request.input, { grants, signal: request.signal }));
  const host: WorkflowHost = {
    spawnAgent: async () => { await parked; return { ok: true, text: "" }; },
    abortAgent: () => {},
    callNode,
  };
  return { invoked, callNode, host, release };
}

/** Run a script that parks on a real agent call, inject raw frames on the host side, then abort. */
async function withCraftedFrames(rg: Rig, frames: readonly Frame[]): Promise<{ replies: Frame[]; settle: Awaited<ReturnType<typeof runWorkflow>> }> {
  spawned.workers.length = 0; spawned.sent.length = 0;
  const controller = new AbortController();
  const run = runWorkflow({ script: HEAD + 'return await agent("park");', host: rg.host, signal: controller.signal });
  await flush();
  const worker = spawned.workers[0];
  expect(worker).toBeDefined();
  for (const frame of frames) worker.emit("message", frame);
  await flush();
  const replies = spawned.sent.filter(message => message.type === "response");
  controller.abort(); rg.release();
  return { replies, settle: await run };
}

describe("W19 slice 2: the child RPC exposes exactly the registered, grant-gated surface", () => {
  it("R1 the worker can only emit the call verbs agent, node and workflow (M1: one extra verb goes red here)", () => {
    const verbs = [...WORKER_SOURCE.matchAll(/callHost\(\s*"([A-Za-z_]+)"/g)].map(match => match[1]);
    expect(new Set(verbs)).toEqual(new Set(["agent", "node", "workflow"]));
    const frameTypes = [...WORKER_SOURCE.matchAll(/port\.postMessage\(\{\s*type:\s*"([a-z]+)"/g)].map(match => match[1]);
    expect(new Set(frameTypes)).toEqual(new Set(["call", "progress", "complete", "error"]));
  });

  it("R2 a crafted frame for an unregistered verb is refused host-side with a fatal typed refusal and no handler runs", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9001, method: "exec", payload: { command: "id" } },
      { type: "call", callId: 9002, method: "constructor", payload: {} },
      { type: "call", callId: 9003, method: "__proto__", payload: {} },
    ]);
    for (const id of [9001, 9002, 9003]) {
      expect(replies.find(reply => reply.callId === id)).toMatchObject({ ok: false, fatal: true, error: expect.stringMatching(/^Unknown workflow host method/) });
    }
    expect(rg.callNode).not.toHaveBeenCalled();
    expect(rg.invoked).not.toHaveBeenCalled();
  });

  it("R3 a crafted node RPC for an unregistered capability is refused by the real registry and no provider runs", async () => {
    const rg = rig(["fixture:read", "fixture:admin"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9101, method: "node", payload: { capabilityId: "fixture.not.registered", label: "x", input: {} } },
    ]);
    expect(replies.find(reply => reply.callId === 9101)).toMatchObject({ ok: false, capabilityError: { name: "CapabilityError", category: "unavailable" } });
    expect(rg.invoked).not.toHaveBeenCalled();
  });

  it("R4 a crafted node RPC for a registered but UNGRANTED capability is denied host-side (policy after RPC, not tool-name hiding)", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9201, method: "node", payload: { capabilityId: PROTECTED, label: "x", input: {} } },
    ]);
    expect(replies.find(reply => reply.callId === 9201)).toMatchObject({ ok: false, capabilityError: { category: "authorization" } });
    expect(rg.invoked).not.toHaveBeenCalled();
  });

  it("R5 a crafted payload cannot carry its own grants or principal: the host passes only its own grant set", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9301, method: "node", payload: { capabilityId: PROTECTED, label: "x", input: {}, grants: ["fixture:admin"], principal: { id: "root" }, workspace: "/", scope: "admin" } },
    ]);
    expect(replies.find(reply => reply.callId === 9301)).toMatchObject({ ok: false, capabilityError: { category: "authorization" } });
    expect(rg.invoked).not.toHaveBeenCalled();
    for (const [request] of rg.callNode.mock.calls) {
      expect(Object.keys(request as object)).not.toEqual(expect.arrayContaining(["grants"]));
      expect(JSON.stringify(request)).not.toContain("root");
    }
  });

  it("R6 unknown or malformed permission data denies: a host with a non-array grant set cannot invoke", async () => {
    const registry = new CapabilityRegistry();
    const invoked = vi.fn(async () => ({ ok: true }));
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] }, invoke: invoked });
    for (const grants of [undefined, null, "fixture:read", { 0: "fixture:read" }, [42], [["fixture:read"]], ["FIXTURE:READ"]]) {
      await expect(registry.invoke(REGISTERED, {}, { grants: grants as never, signal: new AbortController().signal })).rejects.toMatchObject({ category: "authorization" });
    }
    expect(invoked).not.toHaveBeenCalled();
  });

  it("R7 malformed node frames are refused with a typed validation refusal before any host capability call", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9401, method: "node", payload: null },
      { type: "call", callId: 9402, method: "node", payload: { capabilityId: 7, label: "x", input: {} } },
      { type: "call", callId: 9403, method: "node", payload: { capabilityId: "A.B", label: "x", input: {} } },
      { type: "call", callId: 9404, method: "node", payload: { capabilityId: REGISTERED, label: "x".repeat(201), input: {} } },
    ]);
    for (const id of [9401, 9402, 9403, 9404]) {
      expect(replies.find(reply => reply.callId === id)).toMatchObject({ ok: false, fatal: true, capabilityError: { category: "validation" } });
    }
    expect(rg.callNode).not.toHaveBeenCalled();
  });

  it("R8 a provider output carrying a client-like function is refused at the JSON boundary and nothing of it crosses the worker channel", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ answer: 42, client: { send: () => "host-socket" } }) as never });
    spawned.sent.length = 0;
    const result = await runWorkflow({
      script: HEAD + 'return await node("fixture.registered.read", {});',
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal }) },
    });
    expect(result).toMatchObject({ status: "failed", capabilityError: { name: "CapabilityError", category: "validation" } });
    const wire = JSON.stringify(spawned.sent.filter(message => message.type === "response"));
    expect(wire).not.toContain("host-socket");
    expect(wire).not.toContain("send");
  });

  it("R9 a granted plain-JSON reply crosses the channel intact and carries no host-only member", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ answer: 42 }) });
    spawned.sent.length = 0;
    const result = await runWorkflow({
      script: HEAD + 'return await node("fixture.registered.read", {});',
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal }) },
    });
    expect(result).toMatchObject({ status: "completed", value: { answer: 42 } });
    const responses = spawned.sent.filter(message => message.type === "response");
    expect(responses).toHaveLength(1);
    expect(Object.keys(responses[0]).sort()).toEqual(["callId", "capabilityError", "error", "fatal", "ok", "spent", "type", "value"].filter(key => key in responses[0]).sort());
    expect(JSON.parse(JSON.stringify(responses[0]))).toEqual(expect.objectContaining({ ok: true, value: { answer: 42 } }));
  });
});

describe("W19 slice 2: probes from the child position (recorded honestly, never a fabricated green)", () => {
  it("P1 a direct SDK import from the script position is refused", async () => {
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {}, callNode: async () => ({ ok: true }) };
    const result = await runWorkflow({ script: HEAD + 'try { const sdk = await import("@anthropic-ai/claude-agent-sdk"); return {imported: Object.keys(sdk).length}; } catch (error) { return {refused: error.name}; }', host });
    expect(result).toMatchObject({ status: "completed", value: { refused: expect.any(String) } });
  });

  it("P2 the script position has no network primitive and a loopback listener sees no connection attempt", async () => {
    let connections = 0;
    const server: Server = createServer(socket => { connections++; socket.destroy(); });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    try {
      const host: WorkflowHost = { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {}, callNode: async () => ({ ok: true }) };
      const result = await runWorkflow({ script: HEAD + `
        const present = {};
        try { present.fetch = typeof fetch; } catch (error) { present.fetch = error.name; }
        try { present.WebSocket = typeof WebSocket; } catch (error) { present.WebSocket = error.name; }
        try { present.XMLHttpRequest = typeof XMLHttpRequest; } catch (error) { present.XMLHttpRequest = error.name; }
        try { present.require = typeof require; } catch (error) { present.require = error.name; }
        try { present.process = typeof process; } catch (error) { present.process = error.name; }
        try { await fetch("http://127.0.0.1:${port}/"); present.reached = true; } catch (error) { present.fetchError = error.name; }
        return present;`, host });
      await flush();
      expect(result.status).toBe("completed");
      const seen = result.value as Record<string, unknown>;
      for (const name of ["fetch", "WebSocket", "XMLHttpRequest", "require", "process"]) expect(seen[name]).toBe("undefined");
      expect(seen.reached).toBeUndefined();
      expect(connections).toBe(0);
    } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
  });
});
