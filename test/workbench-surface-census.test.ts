/**
 * wb-cax.4 — registered Pi surface census across upstream, workbench-pi and workbench-claude modes.
 *
 * Pinned literals were measured at base b44f1ce by booting the REAL extension (src/index.ts default export)
 * through test/helpers/boot-extension.ts under each settings mode and reading the mock pi's registrations:
 *   ./node_modules/.bin/vitest run test/workbench-surface-census.test.ts   (the census itself prints nothing;
 *   the literals below are the sorted keys of BootedPi.tools / commands / registeredFlags / lifecycle).
 * Specs pinned:
 *   docs/workbench/16 § Migration acceptance: "no accidental duplication of tools or permission escalation."
 *   docs/workbench/16 § Compatibility feature control: "Tests must run in both upstream/Pi and new/Claude workbench modes".
 *   docs/workbench/02 WB-011: "The existing workflow tool remains available in Pi without collision or competing shadow tool names."
 *   docs/workbench/06: "Selecting Claude does not supply native grants." / "no 'everything registered = everything executable'."
 *   docs/workbench/17 § Install profile: "Keep standard upstream features working when Workbench is disabled."
 * The census never executes a registered tool, spawns a process or touches the network; every boot is hermetic.
 * A later registration bead updates WORKBENCH_TOOLS in the same change (a one-line edit): that is the census doing its job.
 */
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { type BootedPi, ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const LEGACY_TOOLS = ["Agent", "SubagentWorkflow", "get_subagent_result", "steer_subagent"];
const WORKBENCH_TOOLS = [
  "furnace_observe",
  "workbench_catalog",
  "workflow_catalog",
  "workflow_compare",
  "workflow_detached",
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
});
