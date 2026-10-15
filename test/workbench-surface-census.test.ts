/**
 * wb-cax.4 — registered Pi surface census across upstream, workbench-pi and workbench-claude modes.
 *
 * Pinned literals were re-measured at trunk 4fc7a9d (NINE workbench tools: the eight at b44f1ce plus workflow_inspect
 * from wb-h8f.4) by booting the REAL extension (src/index.ts default export) through test/helpers/boot-extension.ts
 * under each settings mode and reading the mock pi's registrations. Measuring invocation:
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
 * The census never reaches a native or provider path (asserted: zero process spawns, zero Furnace clients); every boot
 * is hermetic (hermeticDir isolates HOME and the agent dir).
 * A later registration bead updates WORKBENCH_TOOLS in the same change (a one-line edit): that is the census doing its job.
 */
import type * as ChildProcess from "node:child_process";
import type * as FurnaceSdk from "@furnace/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { type BootedPi, ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

/** Native-path witnesses: any process spawn or Furnace client construction while a tool executes is a native path. */
const native = vi.hoisted(() => ({ spawns: 0, furnaceClients: 0 }));
vi.mock("node:child_process", async importOriginal => {
  const original = await importOriginal<typeof ChildProcess>();
  const count = <T extends (...args: never[]) => unknown>(fn: T): T => ((...args: Parameters<T>) => {
    native.spawns += 1;
    return fn(...args);
  }) as T;
  return { ...original, spawn: count(original.spawn), spawnSync: count(original.spawnSync), exec: count(original.exec),
    execSync: count(original.execSync), execFile: count(original.execFile), execFileSync: count(original.execFileSync),
    fork: count(original.fork) };
});
vi.mock("@furnace/sdk", async importOriginal => {
  const original = await importOriginal<typeof FurnaceSdk>();
  return { ...original, Furnace: class {
    constructor() { native.furnaceClients += 1; }
  } };
});

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

async function boot(settings: Record<string, unknown>): Promise<Census> {
  const sandbox = hermeticDir({ settings });
  sandboxes.push(sandbox);
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  const start = booted.lifecycle.get("session_start");
  await start?.({}, context);
  return {
    booted,
    tools: [...booted.tools.keys()].sort(),
    commands: [...booted.commands.keys()].sort(),
    flags: [...booted.registeredFlags.keys()].sort(),
    lifecycle: [...booted.lifecycle.keys()].sort(),
    registerToolCalls: booted.pi.registerTool.mock.calls.length,
    registerCommandCalls: booted.pi.registerCommand.mock.calls.length,
    reload: async () => {
      await start?.({}, context);
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
    const census = await boot({ workflowsEnabled: false, workbench: { workflowAgentBackend: "claude", capabilityGrants: [] } });
    expect(census.tools).not.toContain("SubagentWorkflow");
    expect(census.tools).toContain("Agent");
    expect(census.tools).toEqual(
      [...LEGACY_TOOLS.filter(name => name !== "SubagentWorkflow"), ...WORKBENCH_TOOLS].sort(),
    );
  });

  it("mode C (zero grants) answers every workbench tool with its exact typed refusal and reaches no native path", async () => {
    const census = await boot(MODES.C);
    const dir = sandboxes[sandboxes.length - 1].dir;
    expect(PROBES.map(probe => probe.tool).sort()).toEqual(WORKBENCH_TOOLS);
    native.spawns = 0;
    native.furnaceClients = 0;
    for (const probe of PROBES) expect(await reply(census, probe.tool, probe.params, dir), probe.tool).toBe(probe.zeroGrant);
    expect(native.spawns, "process spawns on the zero-grant refusal path").toBe(0);
    expect(native.furnaceClients, "Furnace clients constructed on the zero-grant refusal path").toBe(0);
  });

  it("mode D (every grant) answers no workbench tool with a permission denial and reaches no native path", async () => {
    const census = await boot(MODES.D);
    const dir = sandboxes[sandboxes.length - 1].dir;
    native.spawns = 0;
    native.furnaceClients = 0;
    for (const probe of PROBES) {
      const text = await reply(census, probe.tool, probe.params, dir);
      expect(text, `${probe.tool} must answer past the grant check`).not.toMatch(DENIAL);
      if (!probe.sameWhenUngranted) expect(text, `${probe.tool} must not equal its zero-grant refusal`).not.toBe(probe.zeroGrant);
    }
    expect(native.spawns, "process spawns on the granted probe path").toBe(0);
    expect(native.furnaceClients, "Furnace clients constructed on the granted probe path").toBe(0);
  });
});
