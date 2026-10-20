/**
 * native-load-notify.ts: drives the native-load notify path in src/index.ts with arbitrary load-error text, for the
 * DIRECT-CALLER SITES row of test/workbench-sanitizer-corpus.test.ts and for test/workbench-native-load-notify.test.ts (wb-72c,
 * the sibling of forge-gate-catch.ts).
 *
 * Nothing is mocked (wb-72c respin, gate U1 under ORCH-REC-R595 and R590-owner): the real extension boots with the Claude backend
 * switched on, and the extension factory is handed the one dependency it takes besides Pi's API (src/index.ts
 * SubagentsExtensionInjection, loadWorkbenchNative), a loader that rejects with the text of the call in progress.
 * registerWorkbenchTools awaits it on session_start, and its own catch tells the operator why. No module is replaced: every
 * other import, native-modules.ts included, is the real one.
 *
 * Two operator surfaces, as registerWorkbenchTools picks them: an interactive session (hasUI) is shown the ctx.ui.notify line,
 * recorded by a plain object standing in for Pi's ui that decides nothing; a headless session is shown the console.warn line,
 * recorded by a vi.spyOn of console.warn that silences it for the call and is restored after it. A failed load leaves the tools
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
/** The fixed opening of the warning, the filter that picks it out of everything else the session reports. */
export const NATIVE_LOAD_WARNING = "Workbench tools not registered: native modules failed to load (";
/** What the injected loader rejects with if anything but a driver call ever awaits it. */
const OUTSIDE_A_CALL = "wb-72c: the injected loader ran outside a driver call";

/** Which of registerWorkbenchTools' two operator surfaces a driver reads. */
export type NativeLoadSurface = "interactive" | "headless";

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
  /** One session_start whose native load rejects with `raw`; resolves to every line the operator surface was given. */
  readonly sessionStart: (raw: string) => Promise<string[]>;
  readonly dirs: string[];
}

async function boot(surface: NativeLoadSurface): Promise<Booted> {
  const workspace = realpathSync(makeScratch("wb-nlnotify-ws-"));
  const agentDir = realpathSync(makeScratch("wb-nlnotify-agent-"));
  const home = realpathSync(makeScratch("wb-nlnotify-home-"));
  const dirs = [workspace, agentDir, home];
  mkdirSync(join(workspace, ".pi"), { recursive: true });
  writeFileSync(join(workspace, ".pi", "subagents.json"), JSON.stringify(SETTINGS));
  const pins: Pins = { home, cwd: workspace, agentDir };
  let current: string | undefined;
  const notified: string[] = [];
  // Pi's ui as registerWorkbenchTools and the session_start handler reach it: notify is recorded, the rest does nothing.
  const ui = {
    notify: (message: string) => void notified.push(message),
    setStatus: () => {},
    setWidget: () => {},
    addAutocompleteProvider: () => {},
    onTerminalInput: () => () => {},
  };
  try {
    return await withPins(pins, () => {
      const pi = makePi();
      subagentsExtension(pi.pi, { loadWorkbenchNative: () => Promise.reject(new Error(current ?? OUTSIDE_A_CALL)) });
      const context = surface === "interactive" ? ctx({ cwd: workspace, hasUI: true, ui }) : ctx({ cwd: workspace });
      const sessionStart = (raw: string): Promise<string[]> =>
        withPins(pins, async () => {
          notified.length = 0;
          const warn = surface === "headless" ? vi.spyOn(console, "warn").mockImplementation(() => {}) : undefined;
          current = raw;
          try {
            await pi.lifecycle.get("session_start")?.({}, context);
            return warn ? warn.mock.calls.map(call => String(call[0])) : [...notified];
          } finally {
            current = undefined;
            warn?.mockRestore();
          }
        });
      return { sessionStart, dirs };
    });
  } catch (error) {
    removeScratch(...dirs);
    throw error;
  }
}

/**
 * The driver: each call starts one session whose native load rejects with `raw` and returns the one warning line the chosen
 * operator surface was shown (as a one-element list, the SITES shape). A call that shows no such line, or more than one, throws
 * naming the count only, never the text. Calls run one at a time. `register` (vitest's afterAll by default) removes the
 * sandbox after the suite.
 */
export function nativeLoadNotifyDriver(surface: NativeLoadSurface = "interactive", register: (hook: () => void | Promise<void>) => void = afterAll): (raw: string) => Promise<string[]> {
  let started: Promise<Booted> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  register(async () => {
    const sandbox = await started?.catch(() => undefined);
    if (sandbox) removeScratch(...sandbox.dirs);
  });
  return raw => {
    const reply = queue.then(async () => {
      started ??= boot(surface);
      const sandbox = await started;
      const lines = (await sandbox.sessionStart(raw)).filter(line => line.includes(NATIVE_LOAD_WARNING));
      if (lines.length !== 1) throw new Error(`wb-72c: expected one native-load warning on the ${surface} surface, saw ${lines.length}`);
      return lines;
    });
    queue = reply.catch(() => undefined);
    return reply;
  };
}
