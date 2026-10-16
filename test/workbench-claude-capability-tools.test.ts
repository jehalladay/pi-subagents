/** External-client tier: actual pinned Anthropic server + actual MCP client.
 * Providers are explicitly local fixtures, NOT live Forge/Furnace evidence.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";
import { CAPABILITY_MAX_DEPTH, CapabilityError, CapabilityRegistry, findPrototypePollutionKey, type InvocationContext, isPrototypePollutionKey, type JsonValue } from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, type CuratedToolOptions, createCuratedTools } from "../src/workbench/claude-capability-tools.js";

const id = "fixture.status.read";
const grants = [`discover:${id}`, `inspect:${id}`, `invoke:${id}`, "fixture:read"];
const cleanup: Array<() => Promise<void>> = [];
afterEach(async () => { for (const close of cleanup.splice(0)) await close(); });

async function connect(overrides: Partial<CuratedToolOptions> = {}, invoke?: (context: InvocationContext) => Promise<JsonValue>) {
  const registry = new CapabilityRegistry();
  const calls: InvocationContext[] = [];
  registry.register({
    descriptor: { id, version: "1.0.0", description: "Explicit local native-status fixture", effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke", "inspect"], inputSchema: { type: "object", properties: { target: { type: "string" } }, required: ["target"], additionalProperties: false } },
    async invoke(_input, context) { calls.push(context); if (invoke) return invoke(context); return { native: { status: "PARTIAL", authoritative_current: false }, unknownProducerField: 17 }; },
    async inspect(ref, context) { calls.push(context); return { ref, nativeStatus: "WAITING" }; },
  });
  const controller = new AbortController();
  const options: CuratedToolOptions = { registry, allowedCapabilities: [id], grants, principal: { id: "host-user", role: "reviewer" }, workspace: "/fixture/authorized", invocationId: "fixture-agent-1", signal: controller.signal, ...overrides };
  const server = createCuratedTools(options);
  const client = new Client({ name: "external-test-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  cleanup.push(async () => { await client.close(); await server.instance.close(); });
  async function call(name: string, args: Record<string, unknown>) {
    const result = await client.callTool({ name, arguments: args });
    const content = result.content as Array<{ type: string; text: string }>;
    return { result, payload: JSON.parse(content[0].text) };
  }
  return { client, calls, call, controller, options };
}
const invocation = { capabilityId: id, capabilityVersion: "1.0.0", input: { target: "/fixture/authorized" } };

describe("curated actual SDK MCP provider boundary", () => {
  it("roundtrips three generic real MCP schemas, compact discovery, on-demand contract and native values", async () => {
    const { client, call, calls } = await connect();
    const list = await client.listTools();
    expect(list.tools.map(t => t.name)).toEqual([...CLAUDE_CAPABILITY_TOOL_NAMES]);
    expect(list.tools.every(t => t.inputSchema.type === "object")).toBe(true);
    const discovered = await call("capability_discover", {});
    expect(discovered.payload.capabilities).toEqual([expect.objectContaining({ id, version: "1.0.0", effectClass: "read" })]);
    expect(JSON.stringify(discovered.payload)).not.toContain("inputSchema");
    expect(calls).toHaveLength(0);
    const contract = await call("capability_contract", { capabilityId: id });
    expect(contract.payload.descriptor.inputSchema.required).toEqual(["target"]);
    const native = await call("capability_invoke", invocation);
    expect(native.result.isError).not.toBe(true);
    expect(native.payload).toMatchObject({ kind: "returned", value: { native: { status: "PARTIAL", authoritative_current: false }, unknownProducerField: 17 } });
    expect(JSON.stringify(native.payload)).not.toContain("PASS");
    expect(calls[0]).toMatchObject({ principal: { id: "host-user", role: "reviewer" }, workspace: "/fixture/authorized", invocationId: "fixture-agent-1" });
    expect(calls[0].signal).toBeInstanceOf(AbortSignal);
  });
  it("registration and discovery never authorize invocation", async () => {
    const { call, calls } = await connect({ grants: [`discover:${id}`] });
    expect((await call("capability_discover", {})).payload.capabilities).toHaveLength(1);
    expect((await call("capability_contract", { capabilityId: id })).payload.kind).toBe("contract");
    expect((await call("capability_invoke", invocation)).payload.category).toBe("authorization");
    expect(calls).toHaveLength(0);
  });
  it("requires BOTH role membership and exact invoke grant plus producer permission", async () => {
    for (const overrides of [{ allowedCapabilities: [] }, { grants: ["fixture:read"] }, { grants: [`invoke:${id}`] }]) {
      const { call, calls } = await connect(overrides);
      const denied = await call("capability_invoke", invocation);
      expect(denied.result.isError).toBe(true);
      expect(denied.payload.category).toBe("authorization");
      expect(calls).toHaveLength(0);
    }
  });
  it("discovery, contract and native inspect remain independently granted", async () => {
    const { call, calls } = await connect({ grants: [`inspect:${id}`] });
    expect((await call("capability_discover", {})).payload.capabilities).toEqual([]);
    expect((await call("capability_contract", { capabilityId: id })).payload.category).toBe("authorization");
    expect((await call("capability_contract", { capabilityId: id, mode: "inspect", capabilityVersion: "1.0.0", ref: { id: "native-fixture" } })).payload.value.nativeStatus).toBe("WAITING");
    expect(calls).toHaveLength(1);
  });
  it("rejects contract drift, malformed native payload, and impersonation before provider dispatch", async () => {
    const { call, calls } = await connect();
    expect((await call("capability_invoke", { ...invocation, capabilityVersion: "2.0.0" })).payload.category).toBe("validation");
    expect((await call("capability_invoke", { ...invocation, input: {} })).payload.category).toBe("validation");
    const forged = await call("capability_invoke", { ...invocation, input: { target: "/fixture/authorized", principal: { id: "admin" }, grants: ["*"] } });
    expect(forged.result.isError).toBe(true);
    expect(calls).toHaveLength(0);
  });
  it("pins immutable host authorization despite later config mutation", async () => {
    const mutable = [...grants];
    const principal = { id: "original", role: "reader" };
    const { call, calls } = await connect({ grants: mutable, principal });
    mutable.splice(0); principal.id = "forged";
    expect((await call("capability_invoke", invocation)).payload.kind).toBe("returned");
    expect(calls[0].principal?.id).toBe("original");
  });
  it("rechecks the host deployment pin for each call and redacts unexpected pin errors", async () => {
    let pins = 0;
    const { call, calls } = await connect({ beforeDispatch: () => { pins++; throw new Error('Authorization: Bearer private-token secret="hide-me"'); } });
    const failure = await call("capability_invoke", invocation);
    expect(failure.result.isError).toBe(true);
    expect(failure.payload.category).toBe("transport");
    expect(JSON.stringify(failure)).not.toContain("private-token");
    expect(JSON.stringify(failure)).not.toContain("hide-me");
    expect(pins).toBe(1); expect(calls).toHaveLength(0);
  });
  it("bounds serialized input/output and call counts without fake domain success", async () => {
    const { call, calls } = await connect({ maxOutputBytes: 256, maxInputBytes: 256, maxCalls: 2 });
    expect((await call("capability_invoke", { ...invocation, input: { target: "x".repeat(300) } })).payload.category).toBe("validation");
    expect((await call("capability_contract", { capabilityId: id })).payload.category).toBe("validation");
    expect((await call("capability_invoke", invocation)).payload.category).toBe("authorization");
    expect(calls).toHaveLength(0);
  });
  it("forwards cancellation from actual MCP request context to native invocation", async () => {
    let started!: () => void;
    const ready = new Promise<void>(resolve => { started = resolve; });
    let nativeSignal: AbortSignal | undefined;
    const { client } = await connect({}, async context => {
      nativeSignal = context.signal; started();
      return new Promise<never>((_resolve, reject) => context.signal.addEventListener("abort", () => reject(new CapabilityError("transport", "native wait cancelled")), { once: true }));
    });
    const controller = new AbortController();
    const waiting = client.callTool({ name: "capability_invoke", arguments: invocation }, undefined, { signal: controller.signal });
    await ready; controller.abort();
    await expect(waiting).rejects.toThrow();
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(nativeSignal?.aborted).toBe(true);
  });
  it("host cancellation prevents starting native operations", async () => {
    const { controller, call, calls } = await connect(); controller.abort();
    expect((await call("capability_invoke", invocation)).payload.category).toBe("transport");
    expect(calls).toHaveLength(0);
  });
  it("validates finite host policy and refuses wildcard or incomplete authority", async () => {
    const { options } = await connect();
    for (const overrides of [{ allowedCapabilities: ["*"] }, { allowedCapabilities: Array(33).fill(id) }, { grants: ["*"] }, { workspace: "relative" }, { principal: { id: "", role: "reader" } }, { maxCalls: 0 }]) {
      expect(() => createCuratedTools({ ...options, ...overrides })).toThrow(CapabilityError);
    }
  });
});

// Failure safety and producer outcomes through the same REAL MCP client path.
it("redacts successful native strings/secret fields and terminal escapes", async () => {
  const { call } = await connect({}, async () => ({ status: "UNKNOWN", password: "opaque-private", detail: "Bearer private-key \u001b[31mwarning", secret: "opaque-secret" }));
  const returned = await call("capability_invoke", invocation);
  expect(returned.payload.kind).toBe("returned");
  expect(returned.payload.value.status).toBe("UNKNOWN");
  expect(returned.payload.value.password).toBe("[REDACTED]");
  expect(JSON.stringify(returned)).not.toContain("opaque-private");
  expect(JSON.stringify(returned)).not.toContain("opaque-secret");
  expect(JSON.stringify(returned)).not.toContain("private-key");
  expect(JSON.stringify(returned)).not.toContain("\\u001b");
});
it("redacts unexpected provider errors and keeps authorization/resource failure native", async () => {
  for (const failure of [new Error("Bearer raw-secret"), new CapabilityError("authorization", "Other workspace refused")]) {
    const { call, calls } = await connect({}, async () => { throw failure; });
    const rejected = await call("capability_invoke", invocation);
    expect(rejected.result.isError).toBe(true);
    expect(rejected.payload.category).toBe(failure instanceof CapabilityError ? "authorization" : "transport");
    expect(JSON.stringify(rejected)).not.toContain("raw-secret");
    expect(calls).toHaveLength(1);
  }
});
it("rejects oversized native read answers instead of reporting a fabricated status", async () => {
  const { call } = await connect({ maxOutputBytes: 256 }, async () => ({ nativeStatus: "UNKNOWN", output: "x".repeat(400) }));
  const rejected = await call("capability_invoke", invocation);
  expect(rejected.result.isError).toBe(true);
  expect(rejected.payload.category).toBe("validation");
  expect(Buffer.byteLength(JSON.stringify(rejected.payload))).toBeLessThanOrEqual(256);
});
it("native inspection requires an explicit version and ref", async () => {
  const { call, calls } = await connect();
  for (const args of [{ capabilityId: id, mode: "inspect", ref: {} }, { capabilityId: id, mode: "inspect", capabilityVersion: "1.0.0" }]) {
    expect((await call("capability_contract", args)).payload.category).toBe("validation");
  }
  expect(calls).toHaveLength(0);
});
it("pins distinct logical IDs across concurrent asynchronous host checks", async () => {
  const { call, calls } = await connect({ beforeDispatch: async () => { await new Promise(resolve => setTimeout(resolve, 5)); } });
  await Promise.all([call("capability_invoke", invocation), call("capability_invoke", invocation)]);
  expect(new Set(calls.map(context => context.callId)).size).toBe(2);
});
it("does not accept SDK-stripped identity arguments as host authority", async () => {
  const { call, calls } = await connect();
  await call("capability_invoke", { ...invocation, principal: { id: "admin", role: "writer" }, workspace: "/other", grants: ["*"] });
  expect(calls[0]).toMatchObject({ principal: { id: "host-user", role: "reviewer" }, workspace: "/fixture/authorized", grants });
});
it("explicit effectful fixture retains uncertain-effect on oversized output and never retries", async () => {
  const registry = new CapabilityRegistry();
  let dispatched = 0;
  registry.register({ descriptor: { id, version: "1.0.0", description: "Explicit write FIXTURE, no real external effect", effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"], inputSchema: { type: "object" } }, async invoke() { dispatched++; return { status: "UNKNOWN", value: "x".repeat(500) }; } });
  const { call } = await connect({ registry, grants: [`invoke:${id}`, "fixture:write"], maxOutputBytes: 256 });
  const result = await call("capability_invoke", invocation);
  expect(result.result.isError).toBe(true);
  expect(result.payload.category).toBe("uncertain-effect");
  expect(dispatched).toBe(1);
});
it("a role list never turns a registered write fixture into an executable operation", async () => {
  const registry = new CapabilityRegistry();
  let dispatched = 0;
  registry.register({ descriptor: { id, version: "1.0.0", description: "Registered write fixture", effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"], inputSchema: { type: "object" } }, async invoke() { dispatched++; return { status: "UNKNOWN" }; } });
  const { call } = await connect({ registry, grants: [`discover:${id}`, "fixture:write"] });
  expect((await call("capability_invoke", invocation)).payload.category).toBe("authorization");
  expect(dispatched).toBe(0);
});
it("discovery is finite and does not enumerate provider registrations outside the role", async () => {
  const registry = new CapabilityRegistry();
  for (const capabilityId of [id, "fixture.hidden.read"]) registry.register({ descriptor: { id: capabilityId, version: "1.0.0", description: "Registered fixture", effectClass: "read", permissions: [], supportedModes: ["invoke"], inputSchema: { type: "object" } }, async invoke() { return null; } });
  const { call } = await connect({ registry, grants: [...grants, "discover:fixture.hidden.read", "invoke:fixture.hidden.read"] });
  expect((await call("capability_discover", {})).payload.capabilities.map((descriptor: { id: string }) => descriptor.id)).toEqual([id]);
  expect((await call("capability_contract", { capabilityId: "fixture.hidden.read" })).payload.category).toBe("authorization");
  expect((await call("capability_invoke", { ...invocation, capabilityId: "fixture.hidden.read" })).payload.category).toBe("authorization");
});

// wb-8i1. docs/workbench/06 "Conformance tests": "Same capability in workflow node() and Pi invocation uses
// identical authorization and input contracts."; docs/workbench/12 "Input and output hardening": "Prevent prototype
// pollution and weird structured-clone prototypes at RPC boundaries." zod's record parse drops a declared __proto__
// key before the handler runs, so capability_invoke scans the RAW input first and refuses with the oracle's own text.
describe("raw-input prototype keys refuse with the registry oracle's text (wb-8i1)", () => {
  // JSON.parse makes "__proto__" an own data key, exactly as the JSON transport delivers it.
  const polluted = [
    ["an own __proto__ key", '{"target":"/fixture/authorized","__proto__":{"polluted":true}}', "__proto__"],
    ["a nested __proto__ key", '{"target":"/fixture/authorized","nested":{"__proto__":{"polluted":true}}}', "__proto__"],
    ["a __proto__ key inside an array", '{"target":"/fixture/authorized","list":[1,{"__proto__":{"polluted":true}}]}', "__proto__"],
    ["an own constructor key", '{"target":"/fixture/authorized","constructor":{"prototype":{"polluted":true}}}', "constructor"],
    ["a nested prototype key", '{"target":"/fixture/authorized","nested":{"prototype":{"polluted":true}}}', "prototype"],
    ["the first key in the oracle's walk order", '{"target":"/fixture/authorized","nested":{"constructor":1},"__proto__":{"polluted":true}}', "constructor"],
  ] as const;
  async function oracleRefusal(registry: CapabilityRegistry, input: unknown): Promise<unknown> {
    try { await registry.invoke(id, input, { grants, signal: new AbortController().signal }); }
    catch (error) { return error; }
    throw new Error("the registry oracle permitted a prototype-key input");
  }
  for (const [name, json, key] of polluted) {
    it(`refuses ${name} with the oracle's exact text before any host work, and never calls the provider`, async () => {
      let pins = 0;
      const { call, calls, options } = await connect({ beforeDispatch: () => { pins++; } });
      const oracle = await oracleRefusal(options.registry, JSON.parse(json));
      expect(oracle).toBeInstanceOf(CapabilityError);
      expect(oracle).toMatchObject({ category: "validation", message: `Prototype pollution key at invoke(${id}) input.${key}.` });
      const refused = await call("capability_invoke", { ...invocation, input: JSON.parse(json) });
      expect(refused.result.isError).toBe(true);
      expect(refused.payload).toEqual({ kind: "rejected", category: "validation", diagnostic: (oracle as CapabilityError).message });
      expect(calls).toHaveLength(0);
      expect(pins).toBe(0);
    });
  }
  it("refuses the polluted call identically after a JSON round trip of the whole tool arguments", async () => {
    const { call, calls } = await connect();
    const args = JSON.parse(JSON.stringify({ ...invocation, input: JSON.parse('{"target":"/fixture/authorized","__proto__":{"grants":["fixture:write"]}}') }));
    const refused = await call("capability_invoke", args);
    expect(refused.payload).toEqual({ kind: "rejected", category: "validation", diagnostic: `Prototype pollution key at invoke(${id}) input.__proto__.` });
    expect(calls).toHaveLength(0);
  });
  it("leaves prototype-like values and look-alike keys to the provider untouched", async () => {
    const registry = new CapabilityRegistry();
    const received: JsonValue[] = [];
    registry.register({ descriptor: { id, version: "1.0.0", description: "Permissive read fixture", effectClass: "read", permissions: [], supportedModes: ["invoke"], inputSchema: { type: "object" } }, async invoke(input) { received.push(input); return { status: "UNKNOWN" }; } });
    const { call } = await connect({ registry, grants: [`invoke:${id}`] });
    // An object under the tool's own token field name is ordinary input: only a token the raw scan minted refuses.
    const input = { target: "__proto__", proto: "constructor", __proto: 1, Constructor: 2, prototypes: [{ _proto_: "prototype" }], rawPrototypeKey: {} };
    const returned = await call("capability_invoke", { ...invocation, input });
    expect(returned.payload).toEqual({ kind: "returned", value: { status: "UNKNOWN" } });
    expect(received).toEqual([input]);
  });
  it("keeps the advertised capability_invoke input schema unchanged", async () => {
    const { client } = await connect();
    const invoke = (await client.listTools()).tools.find(tool => tool.name === "capability_invoke");
    expect(invoke?.inputSchema.required).toEqual(["capabilityId", "capabilityVersion", "input"]);
    expect(invoke?.inputSchema.properties?.input).toEqual({ type: "object", propertyNames: { type: "string" }, additionalProperties: {} });
  });
  it("shares one exported key predicate and walk-order scan with the registry oracle", () => {
    expect(["__proto__", "constructor", "prototype"].every(key => isPrototypePollutionKey(key))).toBe(true);
    expect(["__proto", "proto", "Constructor", "prototypes", "toString", "hasOwnProperty", "", Symbol("__proto__")].some(key => isPrototypePollutionKey(key))).toBe(false);
    expect(findPrototypePollutionKey(JSON.parse('{"a":[{"b":{"prototype":1}}],"__proto__":{}}'))).toBe("prototype");
    expect(findPrototypePollutionKey({ a: { b: "__proto__" }, list: ["constructor"] })).toBeUndefined();
    let evaluated = 0;
    const accessor = Object.defineProperty({}, "inner", { enumerable: true, get() { evaluated++; return JSON.parse('{"__proto__":{}}'); } });
    expect(findPrototypePollutionKey(accessor)).toBeUndefined();
    expect(evaluated).toBe(0);
    const nested = (depth: number) => JSON.parse(`${'{"a":'.repeat(depth)}{"__proto__":{}}${"}".repeat(depth)}`);
    expect(findPrototypePollutionKey(nested(CAPABILITY_MAX_DEPTH))).toBe("__proto__");
    expect(findPrototypePollutionKey(nested(CAPABILITY_MAX_DEPTH + 1))).toBeUndefined();
  });
});
