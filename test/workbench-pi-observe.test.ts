/**
 * wb-752.9 (W16-Bw/VC-4): the registered workflow_observe Pi tool adopts the wb-752.2 reply builder
 * (observeInvocation). Each case boots the REAL extension in claude mode and observes a deterministic
 * workflow through the registered tool, quoting the docs/workbench text it pins.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type * as FurnaceSdk from "@furnace/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

/** A furnace.run.inspect node that never settles: the workflow node stays active (last-known-running). */
vi.mock("@furnace/sdk", async importOriginal => {
  const original = await importOriginal<typeof FurnaceSdk>();
  return { ...original, Furnace: class {
    version = vi.fn(async () => ({ kind: "version", data: { furnace_version: "0.1.0" } }));
    runs = { get: () => ({ inspect: () => new Promise(() => undefined), status: vi.fn() }) };
    attempts = { list: vi.fn() };
    logs = { read: vi.fn() };
  } };
});

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; vi.restoreAllMocks(); });

async function boot(rights: string[] = ["workbench:observe", "furnace:inspect"]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } } });
  const pi = makePi(); subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context };
}

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 600; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

type Booted = Awaited<ReturnType<typeof boot>>;

/** Run `count` failing-but-journaled forge nodes (tone "failure", kind "native.node") to completion. */
async function runNodes(booted: Booted, count: number): Promise<string> {
  const script = `export const meta={name:"many",description:"local"}; for (let i=0;i<${count};i++) { try { await node("forge.gate.status",{}, {label:"n"+i}); } catch (e) {} }`;
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, booted.context);
  const id = launched.details.taskId as string;
  await waitFor(() => booted.pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(id)));
  return id;
}

async function observeText(booted: Booted, params: Record<string, unknown>): Promise<string> {
  const tool = booted.pi.tools.get("workflow_observe");
  return textOf(await tool.execute("o", params, undefined, undefined, booted.context as ExtensionContext));
}

async function observe(booted: Booted, params: Record<string, unknown>) {
  return JSON.parse(await observeText(booted, params)) as Record<string, any>;
}

const TIMEOUT = 60_000;

describe("workflow_observe adopts the workbench.observe/v1 reply builder (wb-752.9)", () => {
  it("B1/F1: cursor paging over a >limit workflow round-trips and the union of pages equals the window; a foreign or malformed cursor is refused typed", async () => {
    // docs/workbench/11-designer-and-operator.md § "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event window, aggregates, freshness, anomaly evidence."
    const booted = await boot();
    const id = await runNodes(booted, 25);
    const seen: string[] = [];
    let cursor: string | null = null;
    let pages = 0;
    do {
      const reply: Record<string, any> = await observe(booted, { taskId: id, limit: 10, ...(cursor === null ? {} : { cursor }) });
      expect(reply.contract).toBe("workbench.observe/v1");
      expect(reply.taskId).toBe(id);
      expect(reply.window.limit).toBe(10);
      for (const node of reply.nodes) seen.push(node.nativeRef.id);
      cursor = reply.window.nextCursor;
      pages += 1;
    } while (cursor !== null && pages < 10);
    expect(pages).toBe(3);
    expect(new Set(seen).size).toBe(25);
    expect(seen).toEqual(Array.from({ length: 25 }, (_unused, index) => `${id}:${index + 1}`));

    const first = await observe(booted, { taskId: id, limit: 10 });
    const other = await runNodes(booted, 12);
    const foreign = await observeText(booted, { taskId: other, limit: 10, cursor: first.window.nextCursor });
    expect(foreign).toMatch(/^Invalid observe request: /);
    expect(foreign).not.toMatch(/\bat .*\.ts:\d+/);
    expect(await observeText(booted, { taskId: id, cursor: "not-a-cursor" })).toMatch(/^Invalid observe request: /);
    expect(await observeText(booted, { taskId: id, cursor: "x".repeat(300) })).toMatch(/^Invalid observe request: /);
  }, TIMEOUT);

  it("F2: kind and tone selectors return only matching nodes and window.scanned explains the page", async () => {
    const booted = await boot();
    const id = await runNodes(booted, 8);
    const failure = await observe(booted, { taskId: id, limit: 5, selectors: { tone: "failure", kind: "native.node" } });
    expect(failure.nodes).toHaveLength(5);
    const none = await observe(booted, { taskId: id, limit: 5, selectors: { tone: "success" } });
    expect(none.nodes).toEqual([]);
    expect(none.window).toMatchObject({ scanned: 5, returned: 0, total: 8 });
    expect(none.window.nextCursor).toEqual(expect.any(String));
    const wrongKind = await observe(booted, { taskId: id, selectors: { kind: "workflow.group" } });
    expect(wrongKind.nodes).toEqual([]);
    expect(wrongKind.window.scanned).toBe(8);
  }, TIMEOUT);

  it("F3: selectors.relations counts relations reading at most one page per returned node", async () => {
    const booted = await boot();
    const id = await runNodes(booted, 6);
    const spy = vi.spyOn(ObservationProjection.prototype, "relations");
    const reply = await observe(booted, { taskId: id, limit: 4, selectors: { relations: true } });
    expect(reply.nodes).toHaveLength(4);
    expect(reply.relations.perNode).toHaveLength(4);
    expect(reply.relations.basis).toBe("returned-window-only");
    expect(spy).toHaveBeenCalledTimes(4);
    for (const [request] of spy.mock.calls) expect(request.limit).toBeLessThanOrEqual(40);
  }, TIMEOUT);

  it("B2/F4: a node left running reports last-known-running + stale in the freshness summary and no node is current", async () => {
    // docs/workbench/09-observation-and-provenance.md § "Freshness and ambiguity": "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance."
    const booted = await boot();
    const script = 'export const meta={name:"hang",description:"local"}; await node("furnace.run.inspect",{runId:"frn-run-r1"},{label:"hang"}); return 1;';
    const launched = await booted.pi.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, booted.context);
    const id = launched.details.taskId as string;
    let reply: Record<string, any> = {};
    for (let i = 0; i < 200 && !(reply.nodes?.length > 0); i++) {
      reply = await observe(booted, { taskId: id });
      if (!(reply.nodes?.length > 0)) await new Promise(resolve => setTimeout(resolve, 20));
    }
    expect(reply.status).toBe("running");
    expect(reply.nodes[0].presentation.statusTone).toBe("active");
    expect(reply.freshness.summary).toContain("last-known-running + stale");
    expect(reply.freshness.lastKnownRunningStale).toBe(1);
    expect(reply.freshness.current).toBe(0);
  }, TIMEOUT);

  it("B3/F5: the whole reply never exceeds the requested maxBytes; truncation is reported, never silent", async () => {
    // docs/workbench/15-implementation-program.md § "Independently assignable packages" W16 row: "compact bounded result and ACL".
    const booted = await boot();
    const id = await runNodes(booted, 30);
    const unbounded = await observeText(booted, { taskId: id, limit: 40 });
    expect(Buffer.byteLength(unbounded, "utf8")).toBeLessThanOrEqual(16_384);
    for (const maxBytes of [2_048, 4_096, 8_192]) {
      const text = await observeText(booted, { taskId: id, limit: 40, maxBytes });
      expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(maxBytes);
      const reply = JSON.parse(text);
      expect(reply.truncatedForBytes).toBe(true);
      expect(reply.droppedForBytes.nodes).toBeGreaterThan(0);
      expect(reply.window.nextCursor).toEqual(expect.any(String));
    }
    // At the schema floor the task envelope leaves under OBSERVE_MIN_MAX_BYTES for the reply: a typed refusal names the smallest maxBytes that fits, and that size is honored.
    const floor = await observeText(booted, { taskId: id, limit: 40, maxBytes: 1_024 });
    expect(Buffer.byteLength(floor, "utf8")).toBeLessThanOrEqual(1_024);
    const needed = Number(/at least (\d+) needed/.exec(floor)?.[1]);
    expect(floor).toMatch(/^Invalid observe request: maxBytes 1024 leaves under 1024 bytes/);
    expect(needed).toBeGreaterThan(1_024);
    const atFloor = await observeText(booted, { taskId: id, limit: 40, maxBytes: needed });
    expect(Buffer.byteLength(atFloor, "utf8")).toBeLessThanOrEqual(needed);
    expect(JSON.parse(atFloor)).toMatchObject({ contract: "workbench.observe/v1", truncatedForBytes: true, envelopeOmitted: expect.any(Array) });
    expect(await observeText(booted, { taskId: id, maxBytes: 512 })).toMatch(/^Invalid observe request: /);
    expect(await observeText(booted, { taskId: id, maxBytes: 70_000 })).toMatch(/^Invalid observe request: /);
  }, TIMEOUT);

  it("B4/F6: the three legacy refusal texts are byte-identical and evaluated in today's order before any projection read", async () => {
    // docs/workbench/12-security.md § "Authorization design": "Separate discover, inspect, observe, invoke and control grants."
    const denied = await boot([]);
    expect(await observeText(denied, { taskId: "bogus", cursor: "x", selectors: { kind: "k" } })).toBe("Permission denied: workbench:observe grant required.");
    sandbox?.restore();
    const booted = await boot();
    expect(await observeText(booted, { taskId: "bogus", cursor: "x" })).toBe("Invalid workflow task ID.");
    expect(await observeText(booted, { taskId: "wf_abcdef123456", cursor: "x" })).toBe("Workflow unavailable in this local operator/session/workspace scope.");
    expect(await observeText(booted, { taskId: "wf_abcdef123456", limit: 41 })).toBe("Invalid observation limit (1..40).");
  }, TIMEOUT);

  it("B3/F7: no spelled 20, 40, 16384 or 256 literal in the registration; the bounds derive from the exported OBSERVE_* constants", () => {
    const source = readFileSync(join(__dirname, "..", "src", "index.ts"), "utf8");
    const start = source.indexOf('name: "workflow_observe"');
    const end = source.indexOf("createWorkflowReconcileTool({", start);
    expect(start).toBeGreaterThan(0);
    expect(end).toBeGreaterThan(start);
    const block = source.slice(start, end);
    expect(block).not.toMatch(/(?<![\w.])(?:20|40|256|16_?384|1_?024|65_?536)(?![\w.])/);
    for (const name of ["OBSERVE_MAX_LIMIT", "OBSERVE_CURSOR_MAX_BYTES", "OBSERVE_MIN_MAX_BYTES", "OBSERVE_MAX_MAX_BYTES", "OBSERVE_DEFAULT_MAX_BYTES", "observeInvocation"]) expect(block).toContain(name);
  });
});
