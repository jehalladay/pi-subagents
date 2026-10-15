/** W06: independent authorization and bounded provider boundary, tested before implementation. */
import { describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type InvocationContext } from "../src/workbench/capability-registry.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

const HEAD = 'export const meta={name:"registry-auth",description:"W06"};\n';
const context = (grants: readonly string[]): InvocationContext => ({ grants, signal: new AbortController().signal });
function fixture(effectClass: "read" | "external" = "read") {
  const registry = new CapabilityRegistry();
  const invoke = vi.fn(async () => ({ status: "partial", unknownProducerField: 42 }));
  const inspect = vi.fn(async () => ({ status: "unknown", ref: "native-1" }));
  registry.register({ descriptor: { id: "record.read", version: "1.0.0", description: "Read", inputSchema: { type: "object" }, effectClass, permissions: ["record:read"], supportedModes: ["invoke", "inspect"] }, invoke, inspect });
  return { registry, invoke, inspect };
}

describe("W06 capability boundary", () => {
  it("invocation permission alone never exposes catalog metadata", () => {
    expect(fixture().registry.discover(context(["record:read"]))).toEqual([]);
  });
  it("discovery alone exposes detached metadata but cannot invoke or inspect", async () => {
    const { registry, invoke, inspect } = fixture();
    const ctx = context(["discover:record.read"]);
    const catalog = registry.discover(ctx);
    expect(catalog.map(item => item.id)).toEqual(["record.read"]);
    catalog[0].inputSchema.type = "string";
    await expect(registry.invoke("record.read", {}, ctx)).rejects.toMatchObject({ category: "authorization" });
    await expect(registry.inspect("record.read", { ref: "native-1" }, ctx)).rejects.toMatchObject({ category: "authorization" });
    expect(invoke).not.toHaveBeenCalled();
    expect(inspect).not.toHaveBeenCalled();
  });
  it("inspect is independently granted and preserves native unknown fields", async () => {
    const { registry, invoke, inspect } = fixture();
    const ctx = context(["inspect:record.read"]);
    await expect(registry.inspect("record.read", { ref: "native-1" }, ctx)).resolves.toEqual({ status: "unknown", ref: "native-1" });
    await expect(registry.invoke("record.read", {}, ctx)).rejects.toMatchObject({ category: "authorization" });
    expect(inspect).toHaveBeenCalledTimes(1);
    expect(invoke).not.toHaveBeenCalled();
  });
  it("permission-free providers still require an explicit invocation grant", async () => {
    const registry = new CapabilityRegistry();
    const invoke = vi.fn(async () => null);
    registry.register({ descriptor: { id: "public.read", version: "1.0.0", description: "Read", inputSchema: { type: "object" }, effectClass: "read", permissions: [], supportedModes: ["invoke"] }, invoke });
    await expect(registry.invoke("public.read", {}, context([]))).rejects.toMatchObject({ category: "authorization" });
    await expect(registry.invoke("public.read", {}, context(["invoke:public.read"]))).resolves.toBeNull();
  });
  it("rejects oversized nesting and pollution before executing providers", async () => {
    const { registry, invoke } = fixture();
    const input: Record<string, unknown> = {};
    let cursor = input;
    for (let i = 0; i < 70; i++) { const nested = {}; cursor.child = nested; cursor = nested; }
    await expect(registry.invoke("record.read", input, context(["record:read"]))).rejects.toMatchObject({ category: "validation" });
    await expect(registry.invoke("record.read", JSON.parse('{"__proto__":{"polluted":true}}'), context(["record:read"]))).rejects.toMatchObject({ category: "validation" });
    expect(invoke).not.toHaveBeenCalled();
  });
  it.each(["read", "external"] as const)("bounds an unresponsive %s provider without retry", async effectClass => {
    const registry = new CapabilityRegistry({ deadlineMs: 15 });
    let signal: AbortSignal | undefined;
    const invoke = vi.fn(async (_input: unknown, ctx: InvocationContext) => { signal = ctx.signal; return await new Promise<null>(() => {}); });
    registry.register({ descriptor: { id: "slow.read", version: "1.0.0", description: "Slow", inputSchema: { type: "object" }, effectClass, permissions: ["read"], supportedModes: ["invoke"] }, invoke });
    await expect(registry.invoke("slow.read", {}, context(["read"]))).rejects.toMatchObject({ category: effectClass === "read" ? "transport" : "uncertain-effect" });
    expect(signal?.aborted).toBe(true);
    expect(invoke).toHaveBeenCalledTimes(1);
  });
  it("copies caller grants before asynchronous dispatch and never escalates another caller", async () => {
    const registry = new CapabilityRegistry();
    const grants = ["record:read"];
    const principal = { id: "operator", role: "reader" };
    const invoke = vi.fn(async (_input: unknown, ctx: InvocationContext) => {
      grants.push("write"); principal.id = "another-caller";
      await Promise.resolve();
      return { grants: [...ctx.grants], principal: ctx.principal?.id ?? null, workspace: ctx.workspace ?? null };
    });
    registry.register({ descriptor: { id: "record.read", version: "1.0.0", description: "Read", inputSchema: { type: "object" }, effectClass: "read", permissions: ["record:read"], supportedModes: ["invoke"] }, invoke });
    await expect(registry.invoke("record.read", {}, { ...context(grants), principal, workspace: "/workspace/a" })).resolves.toEqual({ grants: ["record:read"], principal: "operator", workspace: "/workspace/a" });
    await expect(registry.invoke("record.read", {}, context([]))).rejects.toMatchObject({ category: "authorization" });
    expect(invoke).toHaveBeenCalledTimes(1);
  });
  it("preserves category and instanceof CapabilityError in a real worker RPC", async () => {
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: async () => { throw new CapabilityError("authorization", "Denied by caller policy"); } };
    const result = await runWorkflow({ script: HEAD + 'try { await node("record.read", {}); } catch(error) { return {name:error.name,category:error.category,typed:error instanceof CapabilityError}; }', host });
    expect(result).toMatchObject({ status: "completed", value: { name: "CapabilityError", category: "authorization", typed: true } });
  });
  it("reports typed terminal diagnostics and local validation is not swallowed by parallel", async () => {
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: vi.fn(async () => null) };
    const result = await runWorkflow({ script: HEAD + 'return await parallel([()=>node("record.read", {value:NaN})]);', host });
    expect(result).toMatchObject({ status: "failed", capabilityError: { category: "validation" } });
    expect(host.callNode).not.toHaveBeenCalled();
  });
  it("rejects impersonation options before dispatch", async () => {
    const callNode = vi.fn(async () => ({ ok: true }));
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode };
    const denied = await runWorkflow({ script: HEAD + 'return await node("record.read", {}, {principal:"admin"});', host });
    expect(denied).toMatchObject({ status: "failed", capabilityError: { category: "validation" } });
    expect(callNode).not.toHaveBeenCalled();
  });
});

describe("W06 adverse runtime and registration", () => {
  it("cannot smuggle discovery into invocation permission requirements", () => {
    const registry = new CapabilityRegistry();
    expect(() => registry.register({ descriptor: { id: "bad.policy", version: "1.0.0", description: "Bad policy", inputSchema: { type: "object" }, effectClass: "read", permissions: ["discover:bad.policy"], supportedModes: ["invoke"] }, invoke: async () => null })).toThrow(/permission/i);
  });
  it("rejects deep JSON in the worker with a typed diagnostic before host dispatch", async () => {
    const callNode = vi.fn(async () => null);
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode };
    const result = await runWorkflow({ script: HEAD + 'const input={}; let c=input; for(let i=0;i<70;i++){c.child={};c=c.child;} return await node("record.read",input);', host });
    expect(result).toMatchObject({ status: "failed", capabilityError: { category: "validation" } });
    expect(callNode).not.toHaveBeenCalled();
  });
  it("classifies effectful cancellation as uncertain and aborts only the provider wait", async () => {
    const registry = new CapabilityRegistry();
    const controller = new AbortController();
    let providerSignal: AbortSignal | undefined;
    const invoke = vi.fn(async (_input: unknown, ctx: InvocationContext) => { providerSignal = ctx.signal; controller.abort(); return await new Promise<null>(() => {}); });
    registry.register({ descriptor: { id: "effect.wait", version: "1.0.0", description: "Write", inputSchema: { type: "object" }, effectClass: "external", permissions: ["write"], supportedModes: ["invoke"] }, invoke });
    await expect(registry.invoke("effect.wait", {}, { grants: ["write"], signal: controller.signal })).rejects.toMatchObject({ category: "uncertain-effect" });
    expect(providerSignal?.aborted).toBe(true);
    expect(invoke).toHaveBeenCalledTimes(1);
  });
  it("validates before invoking with an already cancelled wait, not an uncertain effect", async () => {
    const { registry, invoke } = fixture("external");
    const controller = new AbortController(); controller.abort();
    await expect(registry.invoke("record.read", {}, { grants: ["record:read"], signal: controller.signal })).rejects.toMatchObject({ category: "transport" });
    expect(invoke).not.toHaveBeenCalled();
  });
  it("preserves typed authorization against a crafted raw RPC that bypasses node checks", async () => {
    const { registry, invoke } = fixture();
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode: request => registry.invoke(request.capabilityId, request.input, context(["discover:record.read"])) };
    // vm is not hostile-JS isolation: this intentionally exercises the host check.
    const script = HEAD + 'const port=node.constructor("return require(\\"node:worker_threads\\").parentPort")(); return await new Promise(resolve=>{port.on("message",message=>{if(message.callId===999) resolve({ok:message.ok,error:message.capabilityError});});port.postMessage({type:"call",method:"node",callId:999,payload:{capabilityId:"record.read",input:{},label:"crafted",grants:["record:read"],principal:"admin"}});});';
    const result = await runWorkflow({ script, host });
    expect(result).toMatchObject({ status: "completed", value: { ok: false, error: { name: "CapabilityError", category: "authorization" } } });
    expect(invoke).not.toHaveBeenCalled();
  });
});

describe("node worker serializer snapshot", () => {
  it("does not execute inherited array toJSON inside script VM", async () => {
    const callNode = vi.fn(async (request: { input: unknown }) => request.input);
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true }), abortAgent: () => {}, callNode };
    const script = HEAD + 'let getters=0; class InputArray extends Array {get toJSON(){getters++;return ()=>"changed";}} const result=await node("record.read",{field:new InputArray("original")}); return {getters,result};';
    const result = await runWorkflow({ script, host });
    expect(result).toMatchObject({ status: "completed", value: { getters: 0, result: { field: ["original"] } } });
    expect(callNode).toHaveBeenCalledWith(expect.objectContaining({ input: { field: ["original"] } }));
  });
});
