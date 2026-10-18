/**
 * forge-gate-catch.ts: drives the forge_gate_run catch in src/index.ts with arbitrary connection error text, for the
 * DIRECT-CALLER SITES row of test/workbench-sanitizer-corpus.test.ts (wb-a3s.1, the sibling of detached-peer.ts).
 *
 * The real extension boots once with the forge:run grant and a workspace sandbox. The caller (the corpus file, which
 * declares the vi.mock of @forge/sdk because a mock is registered per test file) makes ServerConnection.spawn().initialize()
 * reject with the text `setMessage` was last given; openForgeOperationConnection closes the spawned process and rethrows,
 * so the registered tool's catch hands the message to the one helper (text layout). Each call returns the reply text the
 * model receives, for a target that resolves inside the sandbox.
 *
 * Hermetic (wb-e6w): while the extension boots and while the tool runs, HOME is a scratch home directory the helper made, cwd is
 * the scratch workspace, and PI_CODING_AGENT_DIR is the scratch agent directory, so neither the boot nor the call can read the
 * invoking user's real HOME or cwd state. The host values are put back after each phase, and the scratch home is removed with
 * the rest of the sandbox.
 */
import { mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll } from "vitest";
import subagentsExtension from "../../src/index.js";
import { ctx, makePi, textOf } from "./boot-extension.js";
import { makeScratch, removeScratch } from "./scratch.js";

const SETTINGS = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["forge:run"] } };

interface Booted {
  readonly call: () => Promise<string>;
}

interface Pins {
  readonly home: string;
  readonly cwd: string;
  readonly agentDir: string;
}

/** Runs `run` with HOME, cwd and PI_CODING_AGENT_DIR pinned to `pins`, then puts the invoking process's values back. */
async function withPins<T>(pins: Pins, run: () => Promise<T> | T): Promise<T> {
  const previousHome = process.env.HOME;
  const previousAgentDir = process.env.PI_CODING_AGENT_DIR;
  const previousCwd = process.cwd();
  process.env.HOME = pins.home;
  process.env.PI_CODING_AGENT_DIR = pins.agentDir;
  process.chdir(pins.cwd);
  try {
    return await run();
  } finally {
    process.chdir(previousCwd);
    if (previousHome === undefined) delete process.env.HOME;
    else process.env.HOME = previousHome;
    if (previousAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = previousAgentDir;
  }
}

async function boot(): Promise<{ booted: Booted; dirs: string[] }> {
  const workspace = realpathSync(makeScratch("wb-fgate-ws-"));
  const agentDir = realpathSync(makeScratch("wb-fgate-agent-"));
  const home = realpathSync(makeScratch("wb-fgate-home-"));
  const dirs = [workspace, agentDir, home];
  mkdirSync(join(workspace, ".pi"), { recursive: true });
  writeFileSync(join(workspace, ".pi", "subagents.json"), JSON.stringify(SETTINGS));
  const target = join(workspace, "pkg");
  mkdirSync(target, { recursive: true });
  const pins: Pins = { home, cwd: workspace, agentDir };
  try {
    return await withPins(pins, async () => {
      const pi = makePi();
      subagentsExtension(pi.pi);
      const context = ctx({ cwd: workspace });
      await pi.lifecycle.get("session_start")?.({}, context);
      const tool = pi.tools.get("forge_gate_run");
      return {
        booted: { call: () => withPins(pins, async () => textOf(await tool.execute("fgate", { target }, undefined, undefined, context))) },
        dirs,
      };
    });
  } catch (error) {
    removeScratch(...dirs);
    throw error;
  }
}

/**
 * The corpus driver: each call hands `raw` to `setMessage` (the corpus file's mock seam), then returns the forge_gate_run
 * reply. Calls run one at a time. `register` (vitest's afterAll by default) removes the sandbox after the suite.
 */
export function forgeGateCatchDriver(setMessage: (raw: string) => void, register: (hook: () => void | Promise<void>) => void = afterAll): (raw: string) => Promise<string[]> {
  let started: Promise<{ booted: Booted; dirs: string[] }> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  register(async () => {
    const sandbox = await started?.catch(() => undefined);
    if (sandbox) removeScratch(...sandbox.dirs);
  });
  return raw => {
    const reply = queue.then(async () => {
      started ??= boot();
      const { booted } = await started;
      setMessage(raw);
      return [await booted.call()];
    });
    queue = reply.catch(() => undefined);
    return reply;
  };
}
