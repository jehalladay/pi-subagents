/**
 * native-load-notify.ts: drives the native-load notify path in src/index.ts with arbitrary load-error text, for the
 * DIRECT-CALLER SITES row of test/workbench-sanitizer-corpus.test.ts (wb-72c, the sibling of forge-gate-catch.ts).
 *
 * The real extension boots once with the Claude backend switched on. registerWorkbenchTools awaits loadWorkbenchNative(); the
 * caller (the corpus file, which declares the vi.mock of native-modules because a mock is registered per test file) makes that
 * promise reject with the text `setRejection` was last given, and the session_start handler tells the operator why. The
 * session is headless (no ui), so the text is the console.warn line the operator reads. A failed load leaves the tools
 * unregistered and lets the next session start try again, so each call is one more session_start on the same extension.
 *
 * Hermetic: while the extension boots and while session_start runs, HOME is a scratch home directory, cwd is the scratch
 * workspace and PI_CODING_AGENT_DIR is the scratch agent directory; the host values are put back after each phase and the
 * scratch directories are removed with the suite.
 */
import { mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, vi } from "vitest";
import subagentsExtension from "../../src/index.js";
import { ctx, makePi } from "./boot-extension.js";
import { makeScratch, removeScratch } from "./scratch.js";

const SETTINGS = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude" } };
const WARNING = "Workbench tools not registered";

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

interface Booted {
  readonly sessionStart: () => Promise<void>;
  readonly dirs: string[];
}

async function boot(): Promise<Booted> {
  const workspace = realpathSync(makeScratch("wb-nlnotify-ws-"));
  const agentDir = realpathSync(makeScratch("wb-nlnotify-agent-"));
  const home = realpathSync(makeScratch("wb-nlnotify-home-"));
  const dirs = [workspace, agentDir, home];
  mkdirSync(join(workspace, ".pi"), { recursive: true });
  writeFileSync(join(workspace, ".pi", "subagents.json"), JSON.stringify(SETTINGS));
  const pins: Pins = { home, cwd: workspace, agentDir };
  try {
    return await withPins(pins, () => {
      const pi = makePi();
      subagentsExtension(pi.pi);
      const context = ctx({ cwd: workspace });
      return { sessionStart: () => withPins(pins, async () => void (await pi.lifecycle.get("session_start")?.({}, context))), dirs };
    });
  } catch (error) {
    removeScratch(...dirs);
    throw error;
  }
}

/**
 * The corpus driver: each call hands `raw` to `setRejection` (the corpus file's mock seam), starts one session, clears the seam,
 * and returns the warning line the operator was shown. Calls run one at a time. `register` (vitest's afterAll by default)
 * removes the sandbox after the suite.
 */
export function nativeLoadNotifyDriver(setRejection: (raw: string | undefined) => void, register: (hook: () => void | Promise<void>) => void = afterAll): (raw: string) => Promise<string[]> {
  let started: Promise<Booted> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  register(async () => {
    const sandbox = await started?.catch(() => undefined);
    if (sandbox) removeScratch(...sandbox.dirs);
  });
  return raw => {
    const reply = queue.then(async () => {
      started ??= boot();
      const sandbox = await started;
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      setRejection(raw);
      let lines: string[];
      try {
        await sandbox.sessionStart();
      } finally {
        setRejection(undefined);
        lines = warn.mock.calls.map(call => String(call[0])).filter(line => line.includes(WARNING));
        warn.mockRestore();
      }
      if (lines.length !== 1) throw new Error(`wb-72c: expected one native-load warning, saw ${lines.length}`);
      return lines;
    });
    queue = reply.catch(() => undefined);
    return reply;
  };
}
