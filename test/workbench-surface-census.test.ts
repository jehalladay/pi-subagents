/**
 * wb-cax.4 — registered Pi surface census across upstream, workbench-pi and workbench-claude modes.
 *
 * Pinned literals were re-measured at trunk f7b8045 (NINE workbench tools: the eight at b44f1ce plus workflow_inspect
 * from wb-h8f.4, unchanged since 4fc7a9d) by booting the REAL extension (src/index.ts default export) through
 * test/helpers/boot-extension.ts under each settings mode and reading the mock pi's registrations. Measuring invocation:
 *   ./node_modules/.bin/vitest run test/workbench-surface-census.test.ts
 * (it prints nothing on success; on a surface change the failure diff of the sorted BootedPi.tools / commands /
 * registeredFlags / lifecycle keys IS the measurement, and the literals below are exactly those keys).
 * Specs pinned:
 *   docs/workbench/16 § Migration acceptance: "no accidental duplication of tools or permission escalation."
 *   docs/workbench/16 § Compatibility feature control: "Tests must run in both upstream/Pi and new/Claude workbench modes".
 *   docs/workbench/02 WB-011: "The existing workflow tool remains available in Pi without collision or competing shadow tool names."
 *   docs/workbench/06: "Selecting Claude does not supply native grants." / "no 'everything registered = everything executable'."
 *   docs/workbench/17 § Install profile: "Keep standard upstream features working when Workbench is disabled."
 *   Owner approval constraint (wb-cax.4 relay + 14:59Z F1): the zero-grant mode asserts TYPED REFUSALS, so a tool that
 *   quietly drops its grant check fails here; mode D contrasts that no reply is a permission denial.
 * Native/provider-path witness (AC7 as reworded 14:59Z: "the test never reaches a native or provider path"). Exactly
 * what is asserted, and how it is seen:
 *   spawns          every child process created through the REAL node:child_process: ChildProcess.prototype.spawn (the
 *                   one funnel spawn, exec, execFile and fork share) plus the synchronous spawnSync, execSync, execFileSync.
 *   connects        every outbound socket opened through net.Socket.prototype.connect (net.connect, createConnection,
 *                   tls.connect and Node's http client all funnel there; the local-detached host socket is one).
 *   furnaceClients  every @furnace/sdk Furnace constructed through the module graph src imports.
 *   The first two are call-through Proxy apply traps on the builtins themselves, installed in vi.hoisted (above every
 *   import, so before any module under test loads) and synced into ESM named-import bindings, so they see
 *   vitest-transformed modules (src, the inlined pi packages) AND externalized packages alike: @forge/sdk
 *   (ServerConnection.spawn is the Forge provider's launch path, providers/forge.ts), @hyperunix/sdk, @furnace/sdk, the
 *   Claude Agent SDK and cross-spawn. The third is a call-through subclass: the real constructor runs. Real behaviour is
 *   preserved: a Proxy forwards every property (util.promisify.custom included) and exec/execFile are not wrapped at all.
 *   The witness is calibrated below: it must count a spawn and a spawnSync made inside @forge/sdk, a connect made inside
 *   Node's http client (to an absent socket in the hermetic sandbox) and a real Furnace construction; the calibration's
 *   only processes are `true` resolved on PATH (two inside @forge/sdk, one for the promisify pin), never a provider
 *   binary, and it opens no network socket. Every boot and reload in modes A-D and the workflowsEnabled=false
 *   variant, and every grant probe in modes C and D, must add zero to all three. Outside the witness: process creation
 *   that bypasses node:child_process (native addons, process.binding), a synchronous entry point captured before this
 *   file ran (vitest's own runtime only; nothing under test loads earlier), UDP (dgram) and DNS lookups. Every boot is
 *   hermetic (hermeticDir isolates HOME and the agent dir).
 * A later registration bead updates WORKBENCH_TOOLS in the same change (a one-line edit): that is the census doing its job.
 */
import { execFile } from "node:child_process";
import { request } from "node:http";
import { join } from "node:path";
import { promisify } from "node:util";
import { OneShotCliConnection, ServerConnection } from "@forge/sdk";
import type * as FurnaceSdk from "@furnace/sdk";
import { Furnace } from "@furnace/sdk";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { type BootedPi, ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

/** The native/provider-path witness described in the header. */
const native = vi.hoisted(() => {
  const witness = { spawns: 0, connects: 0, furnaceClients: 0, restore: () => {} };
  type Entry = (...args: never[]) => unknown;
  const restores: Array<() => void> = [];
  const count = <K extends string>(owner: Record<K, Entry>, key: K, counter: "spawns" | "connects"): void => {
    const original = owner[key];
    owner[key] = new Proxy(original, {
      apply(target, thisArg, args) {
        witness[counter] += 1;
        return Reflect.apply(target, thisArg, args);
      },
    });
    restores.push(() => {
      owner[key] = original;
    });
  };
  const childProcess = process.getBuiltinModule("node:child_process");
  count(childProcess.ChildProcess.prototype as unknown as Record<"spawn", Entry>, "spawn", "spawns");
  const syncEntries = childProcess as unknown as Record<"spawnSync" | "execSync" | "execFileSync", Entry>;
  for (const key of ["spawnSync", "execSync", "execFileSync"] as const) count(syncEntries, key, "spawns");
  count(process.getBuiltinModule("node:net").Socket.prototype as unknown as Record<"connect", Entry>, "connect", "connects");
  const { syncBuiltinESMExports } = process.getBuiltinModule("node:module");
  syncBuiltinESMExports();
  witness.restore = () => {
    for (const restore of restores.splice(0)) restore();
    syncBuiltinESMExports();
  };
  return witness;
});
vi.mock("@furnace/sdk", async importOriginal => {
  const original = await importOriginal<typeof FurnaceSdk>();
  /** Call-through subclass spy: the real constructor runs and the construction is counted; nothing else changes. */
  class CountedFurnace extends original.Furnace {
    constructor(...args: ConstructorParameters<typeof original.Furnace>) {
      super(...args);
      native.furnaceClients += 1;
    }
  }
  return { ...original, Furnace: CountedFurnace };
});
afterAll(() => native.restore());

interface NativeReach {
  spawns: number;
  connects: number;
  furnaceClients: number;
}
const NO_NATIVE: NativeReach = { spawns: 0, connects: 0, furnaceClients: 0 };
const reach = (): NativeReach => ({ spawns: native.spawns, connects: native.connects, furnaceClients: native.furnaceClients });
function reachedSince(before: NativeReach): NativeReach {
  const now = reach();
  return { spawns: now.spawns - before.spawns, connects: now.connects - before.connects, furnaceClients: now.furnaceClients - before.furnaceClients };
}
/** Asserts that nothing since `before` reached a native or provider path; the message carries the exact counts. */
function expectNoReach(before: NativeReach, where: string): void {
  const reached = reachedSince(before);
  expect(reached, `${where} reached a native or provider path: ${JSON.stringify(reached)}`).toEqual(NO_NATIVE);
}

const LEGACY_TOOLS = ["Agent", "SubagentWorkflow", "get_subagent_result", "steer_subagent"];
const WORKBENCH_TOOLS = [
  "furnace_observe",
  "workbench_catalog",
  "workflow_catalog",
  "workflow_compare",
  "workflow_detached",
  "workflow_inspect",
  "workflow_observe",
  "workflow_reconcile",
  "workflow_validate",
];
const COMMANDS = ["agents"];
const FLAGS = ["subagents-workflow-file"];
const LIFECYCLE = ["input", "session_before_switch", "session_shutdown", "session_start", "tool_execution_start"];
const GRANTS = [
  "workbench:design",
  "workbench:observe",
  "furnace:inspect",
  "forge:inspect",
  "claude:transcript",
  "discover:forge.gate.status",
  "invoke:forge.gate.status",
];
const MODES: Record<string, Record<string, unknown>> = {
  A: {},
  B: { workbench: { workflowAgentBackend: "pi" } },
  C: { workbench: { workflowAgentBackend: "claude", capabilityGrants: [] } },
  D: { workbench: { workflowAgentBackend: "claude", capabilityGrants: GRANTS } },
};
const WORKFLOWS_OFF_C = { workflowsEnabled: false, workbench: { workflowAgentBackend: "claude", capabilityGrants: [] } };

interface Census {
  booted: BootedPi;
  tools: string[];
  commands: string[];
  flags: string[];
  lifecycle: string[];
  registerToolCalls: number;
  registerCommandCalls: number;
  reload: () => Promise<void>;
}

const sandboxes: Array<ReturnType<typeof hermeticDir>> = [];
afterEach(() => {
  while (sandboxes.length) sandboxes.pop()?.restore();
});

/** Boots the real extension; activation plus session_start (and every later reload) must reach no native path. */
async function boot(settings: Record<string, unknown>): Promise<Census> {
  const before = reach();
  const sandbox = hermeticDir({ settings });
  sandboxes.push(sandbox);
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  const start = booted.lifecycle.get("session_start");
  await start?.({}, context);
  expectNoReach(before, `booting ${JSON.stringify(settings)}`);
  return {
    booted,
    tools: [...booted.tools.keys()].sort(),
    commands: [...booted.commands.keys()].sort(),
    flags: [...booted.registeredFlags.keys()].sort(),
    lifecycle: [...booted.lifecycle.keys()].sort(),
    registerToolCalls: booted.pi.registerTool.mock.calls.length,
    registerCommandCalls: booted.pi.registerCommand.mock.calls.length,
    reload: async () => {
      const reloading = reach();
      await start?.({}, context);
      expectNoReach(reloading, `reloading ${JSON.stringify(settings)}`);
    },
  };
}

/** Name, description, parameters JSON and every non-function key of a registered tool. */
function projection(census: Census, name: string): string {
  const tool = census.booted.tools.get(name);
  expect(tool, `tool ${name} must be registered before its definition is projected`).toBeDefined();
  const stable = Object.fromEntries(
    Object.entries(tool).filter(([, value]) => typeof value !== "function").sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify(stable).replace(HERMETIC_PATH, "<hermetic>");
}

function unexpected(names: string[], allowed: readonly string[]): string[] {
  return names.filter(name => !allowed.includes(name));
}

/** Each hermetic boot embeds its own random temp agent dir in tool descriptions; that is not surface. */
const HERMETIC_PATH = /pi-boot-(?:agentdir-)?[A-Za-z0-9]+/g;
const normalise = (name: string) => name.toLowerCase().replace(/[-_]/g, "");

type Params = Record<string, unknown>;
/** Parameters that pass TypeBox shape but fail on the first host check, so a granted call still reaches no native path. */
const PROBES: Array<{ tool: string; params: Params; zeroGrant: string; sameWhenUngranted?: true }> = [
  { tool: "workbench_catalog", params: {}, zeroGrant: '{"capabilities":[]}' },
  // Exact inspect:<id> grant (not in mode D's list) gates this tool, and the typed "unavailable" reply is deliberately
  // identical for every ungranted caller (non-disclosure), so mode D asserts only that it is not a permission denial.
  { tool: "workflow_inspect", sameWhenUngranted: true, params: { target: "forge.gate.status" }, zeroGrant: `{"contract":"workbench.tool-reply/v1","tool":"workflow_inspect","ok":false,"invoked":false,"error":{"code":"unavailable","reason":"not-granted","message":"Inspection is not available for this target."}}` },
  { tool: "workflow_validate", params: { name: "missing" }, zeroGrant: "Permission denied: workbench:design grant required." },
  { tool: "workflow_catalog", params: {}, zeroGrant: "Permission denied: workbench:design grant required." },
  { tool: "workflow_compare", params: { referenceTask: "wf_a", candidateTask: "wf_b" }, zeroGrant: "Permission denied: design and observe grants required." },
  { tool: "furnace_observe", params: { runId: "not-a-run" }, zeroGrant: "Permission denied: furnace:inspect grant required." },
  { tool: "workflow_detached", params: { action: "inspect", invocationId: "inv-census" }, zeroGrant: "Permission denied: explicit detached launch or observe grant required." },
  { tool: "workflow_observe", params: { taskId: "bad" }, zeroGrant: "Permission denied: workbench:observe grant required." },
  { tool: "workflow_reconcile", params: { taskId: "wf_abcdef123456", action: "inspect" }, zeroGrant: "Permission denied: workbench:observe grant required." },
];
const DENIAL = /Permission denied|grant required/i;

async function reply(census: Census, tool: string, params: Params, sandboxDir: string): Promise<string> {
  const registered = census.booted.tools.get(tool);
  expect(registered, `tool ${tool} must be registered before it is executed`).toBeDefined();
  return textOf(await registered.execute("census", params, undefined, undefined, ctx({ cwd: sandboxDir })));
}

describe("registered Pi surface census", () => {
  it("modes A and B register exactly the legacy tools and none of the workbench tools", async () => {
    for (const mode of ["A", "B"]) {
      const census = await boot(MODES[mode]);
      expect(census.tools, `mode ${mode}`).toEqual(LEGACY_TOOLS);
      for (const tool of WORKBENCH_TOOLS) expect(census.tools, `${mode} must not register ${tool}`).not.toContain(tool);
    }
  });

  it("modes C and D register exactly legacy plus workbench tools and nothing else", async () => {
    const expected = [...LEGACY_TOOLS, ...WORKBENCH_TOOLS].sort();
    for (const mode of ["C", "D"]) {
      const census = await boot(MODES[mode]);
      const allowed = [...LEGACY_TOOLS, ...WORKBENCH_TOOLS];
      expect(unexpected(census.tools, allowed), `unexpected registered tool in mode ${mode}`).toEqual([]);
      expect(census.tools).toEqual(expected);
    }
  });

  it("grants never change the registered surface (D equals C; B equals A)", async () => {
    const [a, b, c, d] = [await boot(MODES.A), await boot(MODES.B), await boot(MODES.C), await boot(MODES.D)];
    expect(b.tools).toEqual(a.tools);
    expect(d.tools).toEqual(c.tools);
    expect(d.commands).toEqual(c.commands);
    expect(d.flags).toEqual(c.flags);
    for (const name of c.tools) expect(projection(d, name), name).toBe(projection(c, name));
  });

  it("commands, flags and lifecycle handlers are identical across A-D and pinned", async () => {
    for (const mode of Object.keys(MODES)) {
      const census = await boot(MODES[mode]);
      expect(census.commands, mode).toEqual(COMMANDS);
      expect(census.flags, mode).toEqual(FLAGS);
      expect(census.lifecycle, mode).toEqual(LIFECYCLE);
    }
  });

  it("legacy and workbench names never collide, not even by case or underscore/hyphen", () => {
    expect(LEGACY_TOOLS.filter(name => WORKBENCH_TOOLS.includes(name))).toEqual([]);
    const legacy = new Set(LEGACY_TOOLS.map(normalise));
    expect(WORKBENCH_TOOLS.filter(name => legacy.has(normalise(name)))).toEqual([]);
    expect(LEGACY_TOOLS).toContain("SubagentWorkflow");
    expect(LEGACY_TOOLS).toContain("Agent");
  });

  it("registerTool and registerCommand call counts equal the distinct names registered (no double registration)", async () => {
    for (const mode of Object.keys(MODES)) {
      const census = await boot(MODES[mode]);
      expect(census.registerToolCalls, `${mode} tools`).toBe(census.tools.length);
      expect(census.registerCommandCalls, `${mode} commands`).toBe(census.commands.length);
    }
  });

  it("a second session_start (reload) registers nothing twice in every mode", async () => {
    for (const mode of Object.keys(MODES)) {
      const census = await boot(MODES[mode]);
      await census.reload();
      expect(census.booted.pi.registerTool.mock.calls.length, `${mode} tools`).toBe(census.registerToolCalls);
      expect(census.booted.pi.registerCommand.mock.calls.length, `${mode} commands`).toBe(census.registerCommandCalls);
      expect([...census.booted.tools.keys()].sort()).toEqual(census.tools);
    }
  });

  it("legacy tool definitions are deep-equal across A, C and D", async () => {
    const [a, c, d] = [await boot(MODES.A), await boot(MODES.C), await boot(MODES.D)];
    for (const name of LEGACY_TOOLS) {
      expect(projection(c, name), `${name} A vs C`).toBe(projection(a, name));
      expect(projection(d, name), `${name} C vs D`).toBe(projection(c, name));
    }
  });

  it("workflowsEnabled=false under mode C drops SubagentWorkflow and keeps Agent plus the pinned remainder", async () => {
    const census = await boot(WORKFLOWS_OFF_C);
    expect(census.tools).not.toContain("SubagentWorkflow");
    expect(census.tools).toContain("Agent");
    expect(census.tools).toEqual(
      [...LEGACY_TOOLS.filter(name => name !== "SubagentWorkflow"), ...WORKBENCH_TOOLS].sort(),
    );
  });

  it("every mode boots, and reloads, without reaching a native or provider path", async () => {
    // boot() and reload() assert the zero reach themselves; this walk names every mode, the workflowsEnabled=false
    // variant included, so no mode's boot goes unasserted.
    for (const settings of [...Object.values(MODES), WORKFLOWS_OFF_C]) {
      const census = await boot(settings);
      await census.reload();
    }
  });

  it("mode C (zero grants) answers every workbench tool with its exact typed refusal and reaches no native path", async () => {
    const census = await boot(MODES.C);
    const dir = sandboxes[sandboxes.length - 1].dir;
    expect(PROBES.map(probe => probe.tool).sort()).toEqual(WORKBENCH_TOOLS);
    const before = reach();
    for (const probe of PROBES) expect(await reply(census, probe.tool, probe.params, dir), probe.tool).toBe(probe.zeroGrant);
    expectNoReach(before, "the zero-grant refusal path");
  });

  it("mode D (every grant) answers no workbench tool with a permission denial and reaches no native path", async () => {
    const census = await boot(MODES.D);
    const dir = sandboxes[sandboxes.length - 1].dir;
    const before = reach();
    for (const probe of PROBES) {
      const text = await reply(census, probe.tool, probe.params, dir);
      expect(text, `${probe.tool} must answer past the grant check`).not.toMatch(DENIAL);
      if (!probe.sameWhenUngranted) expect(text, `${probe.tool} must not equal its zero-grant refusal`).not.toBe(probe.zeroGrant);
    }
    expectNoReach(before, "the granted probe path");
  });
});

describe("native-path witness calibration (the zero-reach assertions above can fail)", () => {
  it("counts a spawn and a spawnSync made inside externalized @forge/sdk and a connect made inside Node's http client", async () => {
    const before = reach();
    // providers/forge.ts launches the Forge server through ServerConnection.spawn; `true` stands in for `forge`.
    await ServerConnection.spawn("true").close();
    expect(reachedSince(before).spawns, "@forge/sdk ServerConnection.spawn (dist/transport.js imports spawn)").toBe(1);
    const oneShot = new OneShotCliConnection("true");
    oneShot.start();
    expect(() => oneShot.invoke("gate.status"), "true prints no result envelope").toThrow();
    expect(reachedSince(before).spawns, "@forge/sdk OneShotCliConnection.invoke (dist/fallback.js imports spawnSync)").toBe(2);
    const sandbox = hermeticDir();
    sandboxes.push(sandbox);
    await new Promise<void>(resolve => {
      const pending = request({ socketPath: join(sandbox.dir, "absent.sock") });
      pending.once("error", () => resolve());
      pending.end();
    });
    expect(reachedSince(before), "Node's http client connects through net.Socket.prototype.connect").toEqual({ spawns: 2, connects: 1, furnaceClients: 0 });
  });

  it("keeps child_process behaviour real: execFile still carries util.promisify.custom and promisifies to {stdout, stderr}", async () => {
    expect(Object.getOwnPropertySymbols(execFile), "util.promisify.custom on the execFile modules under test import").toContain(promisify.custom);
    expect(await promisify(execFile)("true")).toEqual({ stdout: "", stderr: "" });
  });

  it("counts Furnace clients through a call-through subclass: the real constructor runs", () => {
    const before = reach();
    const client = new Furnace({ binary: "furnace-census" });
    expect(client.binary, "the real Furnace constructor ran").toBe("furnace-census");
    expect(typeof client.version, "the real client surface is present").toBe("function");
    expect(reachedSince(before)).toEqual({ spawns: 0, connects: 0, furnaceClients: 1 });
  });
});
