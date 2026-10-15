/**
 * wb-h8f.4 (W16-Cw/VC-6): Pi registration wiring for the landed wb-69g.2 reply
 * builders. The registered `workflow_inspect` tool (docs/workbench/11 "First
 * public Pi tools"; docs/workbench/06 exact `inspect:<capabilityId>` ACL) returns
 * the builder's bounded, sanitized, metadata-only reply.
 *
 * Owner ruling: `workbench_catalog` stays registered UNCHANGED; only
 * `workflow_inspect` is new. No provider invoke() or inspect() is ever called.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { type CapabilityProvider, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const SECRET = "h8f4-fixture-private-value";
const hostile = `\u001b[31mred\u001b[0m \u202eevil\u202c \u2066bidi\u2069 api_key=${SECRET}`;

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
});

const counts = { invoke: 0, inspect: 0 };
function fixtureProviders(): CapabilityProvider[] {
  const base = { version: "1.0.0", inputSchema: { type: "object" }, effectClass: "read" as const, permissions: [] as string[] };
  return [
    {
      descriptor: { ...base, id: "fixture.inspectable", description: `Inspectable ${hostile}`, supportedModes: ["invoke", "inspect"] },
      invoke: async () => { counts.invoke++; return null; },
      inspect: async () => { counts.inspect++; return null; },
    },
    {
      descriptor: { ...base, id: "fixture.no-inspect-mode", description: "invoke only", supportedModes: ["invoke"] },
      invoke: async () => { counts.invoke++; return null; },
    },
    {
      descriptor: { ...base, id: "fixture.advertised-unimplemented", description: "advertises inspect", supportedModes: ["invoke", "inspect"] },
      invoke: async () => { counts.invoke++; return null; },
    },
    {
      descriptor: {
        ...base, id: "fixture.huge", description: "large schema",
        inputSchema: { type: "object", properties: Object.fromEntries(Array.from({ length: 400 }, (_, i) => [`field${i}`, { type: "string", description: "x".repeat(64) }])) },
        supportedModes: ["invoke", "inspect"],
      },
      invoke: async () => { counts.invoke++; return null; },
      inspect: async () => { counts.inspect++; return null; },
    },
  ];
}

async function boot(rights: string[]) {
  counts.invoke = 0;
  counts.inspect = 0;
  const original = CapabilityRegistry.prototype.register;
  vi.spyOn(CapabilityRegistry.prototype, "register").mockImplementation(function (this: CapabilityRegistry, provider: CapabilityProvider) {
    original.call(this, provider);
    if (provider.descriptor.id === "forge.gate.status") for (const fixture of fixtureProviders()) original.call(this, fixture);
  });
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context };
}
async function inspect(pi: ReturnType<typeof makePi>, context: unknown, params: Record<string, unknown>) {
  const tool = pi.tools.get("workflow_inspect");
  expect(tool).toBeDefined();
  return JSON.parse(textOf(await tool.execute("h8f4", params, undefined, undefined, context)));
}

describe("workflow_inspect Pi registration (wb-h8f.4)", () => {
  it("registers workflow_inspect in claude mode and leaves workbench_catalog registered", async () => {
    const { pi } = await boot([]);
    expect(pi.tools.has("workflow_inspect")).toBe(true);
    expect(pi.tools.has("workbench_catalog")).toBe(true);
  });

  it("returns the builder's definition reply under the exact inspect:<id> grant, without calling any provider", async () => {
    const { pi, context } = await boot(["inspect:fixture.inspectable"]);
    const reply = await inspect(pi, context, { target: "fixture.inspectable" });
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_inspect", ok: true, invoked: false, target: "fixture.inspectable", view: "definition" });
    for (const view of ["definition", "schema", "operations"]) {
      const viewed = await inspect(pi, context, { target: "fixture.inspectable", view });
      expect(viewed.ok).toBe(true);
      expect(viewed.view).toBe(view);
    }
    // F2: metadata only, discovery never implies invoke or provider inspect.
    expect(counts).toEqual({ invoke: 0, inspect: 0 });
  });

  it("answers an ungranted target with not-granted whether or not it exists, and ignores caller-supplied grants", async () => {
    const { pi, context } = await boot(["discover:fixture.inspectable"]);
    const forged = { grants: ["*", "inspect:fixture.inspectable"], principal: "admin", workspace: "/foreign" };
    const real = await inspect(pi, context, { target: "fixture.inspectable", ...forged });
    const missing = await inspect(pi, context, { target: "fixture.not-there", ...forged });
    expect(real).toMatchObject({ ok: false, error: { code: "unavailable", reason: "not-granted" } });
    expect(missing).toEqual({ ...real, error: real.error });
    expect(counts).toEqual({ invoke: 0, inspect: 0 });
  });

  it("reports inspect-not-advertised and inspect-not-implemented as typed unavailable replies", async () => {
    const { pi, context } = await boot(["inspect:fixture.no-inspect-mode", "inspect:fixture.advertised-unimplemented", "inspect:fixture.absent"]);
    expect(await inspect(pi, context, { target: "fixture.no-inspect-mode" })).toMatchObject({ ok: false, error: { code: "unavailable", reason: "inspect-not-advertised" } });
    expect(await inspect(pi, context, { target: "fixture.advertised-unimplemented" })).toMatchObject({ ok: false, error: { code: "unavailable", reason: "inspect-not-implemented" } });
    expect(await inspect(pi, context, { target: "fixture.absent" })).toMatchObject({ ok: false, error: { code: "unknown-target" } });
  });

  it("returns the builder's typed error for an unknown view, never a thrown error reaching Pi (F5)", async () => {
    const { pi, context } = await boot(["inspect:fixture.inspectable"]);
    const tool = pi.tools.get("workflow_inspect");
    const result = await tool.execute("h8f4", { target: "fixture.inspectable", view: "source" }, undefined, undefined, context);
    expect(JSON.parse(textOf(result))).toMatchObject({ ok: false, error: { code: "unknown-view" } });
  });

  it("sanitizes hostile descriptor text: ANSI, bidi and secrets never reach the model (F3)", async () => {
    const { pi, context } = await boot(["inspect:fixture.inspectable"]);
    const tool = pi.tools.get("workflow_inspect");
    const text = textOf(await tool.execute("h8f4", { target: "fixture.inspectable" }, undefined, undefined, context));
    expect(text).not.toContain(SECRET);
    expect(text).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]|\\u001b/iu);
    expect(text).toContain("[REDACTED]");
  });

  it("bounds the reply bytes and marks truncation (F6)", async () => {
    const { pi, context } = await boot(["inspect:fixture.huge"]);
    const tool = pi.tools.get("workflow_inspect");
    const text = textOf(await tool.execute("h8f4", { target: "fixture.huge", view: "schema" }, undefined, undefined, context));
    expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(16 * 1024);
    expect(JSON.parse(text).truncated).toEqual({ reason: "byte-cap", maxBytes: 16 * 1024 });
  });

  it("does not register twice on a second session_start (F4)", async () => {
    const { pi, context } = await boot([]);
    const registrations = () => (pi.pi.registerTool.mock.calls as Array<[{ name: string }]>).filter(([tool]) => tool.name === "workflow_inspect").length;
    expect(registrations()).toBe(1);
    await pi.lifecycle.get("session_start")?.({}, context);
    expect(registrations()).toBe(1);
  });

  it("bounds the target schema (1..200) and derives view options from INSPECT_VIEWS", async () => {
    const { pi } = await boot([]);
    const schema = JSON.parse(JSON.stringify(pi.tools.get("workflow_inspect").parameters));
    expect(schema.properties.target).toMatchObject({ type: "string", minLength: 1, maxLength: 200 });
    const view = schema.properties.view;
    const literals = (view.anyOf ?? view.oneOf ?? [view]).flatMap((option: { const?: string; enum?: string[] }) => option.const ?? option.enum);
    expect([...literals].sort()).toEqual(["definition", "operations", "schema"]);
    expect(schema.required ?? []).not.toContain("view");
  });

  it("leaves workbench_catalog behavior unchanged: capability section only (owner ruling)", async () => {
    const { pi, context } = await boot(["discover:fixture.inspectable"]);
    const tool = pi.tools.get("workbench_catalog");
    const parsed = JSON.parse(textOf(await tool.execute("h8f4", {}, undefined, undefined, context)));
    expect(Object.keys(parsed)).toEqual(["capabilities"]);
    expect(parsed.capabilities.map((c: { id: string }) => c.id)).toEqual(["fixture.inspectable"]);
  });
});
