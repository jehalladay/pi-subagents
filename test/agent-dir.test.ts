/**
 * wb-nl8.3: src/workflow/saved.ts and src/memory.ts read the agent directory through the local src/agent-dir.ts
 * instead of importing `getAgentDir` from "@earendil-works/pi-coding-agent", so importing either module no longer
 * loads that package's 21 MB entry (nor the pi-ai copy nested under it).
 *
 * Owner bounds pinned here (bd wb-nl8.3, owner review 2026-10-18):
 *  (2) "a red-first row proving importing saved.ts / memory.ts does not load the 21 MB agent entry": each isolation
 *      row imports the module in a fresh Node process whose synchronous resolve hook (module.registerHooks) records
 *      every URL it resolves, calls the function that reads the agent directory, and pins that no URL lies under
 *      node_modules/@earendil-works/. The control row resolves the package itself through the same probe, so an
 *      empty result cannot be vacuous. A module that is never loaded cannot add a second pi-ai instance, so these two
 *      modules leave vitest.config.ts:4-13's single-instance guarantee where it was (the faux-provider e2e suites
 *      that depend on it are unchanged).
 *  (4) "no behavior change to getAgentDir's resolved value - pin value-equality against the eager import in the same
 *      red-first file": every value row compares the local function with the package's own getAgentDir, imported
 *      eagerly below, under the same environment, on the posix branch and on the win32 branch (process.platform is
 *      redefined for the call and restored).
 * No scratch directory is created: the probe's HOME is a path that is never created, and both functions only read.
 */
import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CONFIG_DIR_NAME, getAgentDir as eagerGetAgentDir, VERSION } from "@earendil-works/pi-coding-agent";
import { describe, expect, it } from "vitest";
import { getAgentDir } from "../src/agent-dir.js";

const ROOT = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
const PROBE_HOME = "/nonexistent-wb-nl8.3-home";
const PI_SCOPE = "/node_modules/@earendil-works/";

/** Runs in the child: records every resolution after registerHooks, maps a relative ".js" import to its ".ts" source. */
const PROBE = `
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
const resolved = [];
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && specifier.endsWith(".js") && context.parentURL?.startsWith("file:")) {
      const source = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(source))) {
        resolved.push(source.href);
        return { url: source.href, format: "module-typescript", shortCircuit: true };
      }
    }
    const result = nextResolve(specifier, context);
    resolved.push(result.url);
    return result.url.startsWith("file:") && result.url.endsWith(".ts") ? { ...result, format: "module-typescript" } : result;
  },
});
const [target, call] = process.argv.slice(1);
const loaded = await import(target.startsWith("/") ? pathToFileURL(target).href : target);
const value = call === "savedWorkflowRoots" ? loaded.savedWorkflowRoots(process.cwd())
  : call === "resolveMemoryDir" ? loaded.resolveMemoryDir("probe", "user", process.cwd())
  : loaded.getAgentDir();
process.stdout.write(JSON.stringify({ cwd: process.cwd(), resolved, value }));
`;

interface ProbeResult {
  cwd: string;
  resolved: string[];
  value: unknown;
}

function probe(target: string, call: string): { status: number | null; stderr: string; result: ProbeResult | undefined } {
  const child = spawnSync(
    process.execPath,
    ["--experimental-transform-types", "--disable-warning=ExperimentalWarning", "--input-type=module", "-e", PROBE, target, call],
    { cwd: ROOT, encoding: "utf8", env: { HOME: PROBE_HOME }, maxBuffer: 64 * 1024 * 1024, timeout: 50_000 },
  );
  let result: ProbeResult | undefined;
  try {
    result = JSON.parse(child.stdout) as ProbeResult;
  } catch {
    result = undefined;
  }
  return { status: child.status, stderr: child.stderr, result };
}

const srcUrl = (path: string) => pathToFileURL(join(ROOT, "src", path)).href;
/** Compact on red: how many resolutions fell under the Pi scope, and the first three of them. */
const piResolutions = (resolved: readonly string[]) => {
  const hits = resolved.filter(url => url.includes(PI_SCOPE));
  return { count: hits.length, first: hits.slice(0, 3) };
};

describe("importing saved.ts / memory.ts loads no @earendil-works package (wb-nl8.3 owner bound 2)", () => {
  it("src/workflow/saved.ts: import + savedWorkflowRoots resolves the saved-workflow graph and nothing under node_modules/@earendil-works/", { timeout: 60_000 }, () => {
    const run = probe(join(ROOT, "src/workflow/saved.ts"), "savedWorkflowRoots");
    expect(run.status, run.stderr).toBe(0);
    const resolved = run.result?.resolved ?? [];
    expect(resolved).toEqual(expect.arrayContaining([srcUrl("workflow/saved.ts"), srcUrl("memory.ts"), srcUrl("workflow/meta.ts")]));
    expect(piResolutions(resolved)).toEqual({ count: 0, first: [] });
    const cwd = run.result?.cwd ?? "";
    expect(run.result?.value).toEqual([join(cwd, ".pi", "workflows"), join(cwd, ".agents", "workflows"), join(PROBE_HOME, ".pi", "agent", "workflows")]);
  });

  it("src/memory.ts: import + resolveMemoryDir(user) resolves memory.ts and nothing under node_modules/@earendil-works/", { timeout: 60_000 }, () => {
    const run = probe(join(ROOT, "src/memory.ts"), "resolveMemoryDir");
    expect(run.status, run.stderr).toBe(0);
    const resolved = run.result?.resolved ?? [];
    expect(resolved).toContain(srcUrl("memory.ts"));
    expect(piResolutions(resolved)).toEqual({ count: 0, first: [] });
    expect(run.result?.value).toBe(join(PROBE_HOME, ".pi", "agent", "agent-memory", "probe"));
  });

  it("control: the same probe resolving @earendil-works/pi-coding-agent itself records its entry, so the empty rows above are not vacuous", { timeout: 60_000 }, () => {
    const run = probe("@earendil-works/pi-coding-agent", "getAgentDir");
    expect(run.status, run.stderr).toBe(0);
    const resolved = run.result?.resolved ?? [];
    expect(resolved).toContain(pathToFileURL(join(ROOT, "node_modules/@earendil-works/pi-coding-agent/dist/index.js")).href);
    expect(piResolutions(resolved).count).toBeGreaterThan(0);
    expect(run.result?.value).toBe(join(PROBE_HOME, ".pi", "agent"));
  });
});

interface Environment {
  readonly agentDir?: string;
  readonly home: string;
  readonly platform: NodeJS.Platform;
}
type Outcome = { readonly value: string } | { readonly code: string; readonly message: string };

/** Sets PI_CODING_AGENT_DIR (deleted when absent), HOME and process.platform for one call, then restores all three. */
function withEnvironment(environment: Environment, read: () => string): Outcome {
  const savedAgentDir = process.env.PI_CODING_AGENT_DIR;
  const savedHome = process.env.HOME;
  const platform = Object.getOwnPropertyDescriptor(process, "platform");
  if (platform === undefined) throw new Error("process.platform has no own property descriptor");
  try {
    if (environment.agentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = environment.agentDir;
    process.env.HOME = environment.home;
    Object.defineProperty(process, "platform", { ...platform, value: environment.platform });
    try {
      return { value: read() };
    } catch (error) {
      const code = (error as { code?: unknown }).code;
      return { code: typeof code === "string" ? code : String(error), message: error instanceof Error ? error.message : String(error) };
    }
  } finally {
    Object.defineProperty(process, "platform", platform);
    if (savedHome === undefined) delete process.env.HOME;
    else process.env.HOME = savedHome;
    if (savedAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = savedAgentDir;
  }
}

const HOME = "/home/wb-nl8-3";
const OTHER_HOME = "/home/wb-nl8-3-other";
/** [title, environment, the eager getAgentDir's value or error code under it] */
const CASES: ReadonlyArray<readonly [string, Environment, { readonly value: string } | { readonly code: string }]> = [
  ["posix, PI_CODING_AGENT_DIR unset: the home default", { home: HOME, platform: "linux" }, { value: join(HOME, ".pi", "agent") }],
  ["posix, PI_CODING_AGENT_DIR empty: the home default", { agentDir: "", home: HOME, platform: "linux" }, { value: join(HOME, ".pi", "agent") }],
  ["posix, absolute path unchanged", { agentDir: "/srv/pi-agent", home: HOME, platform: "linux" }, { value: "/srv/pi-agent" }],
  ["posix, bare ~ is the home directory", { agentDir: "~", home: HOME, platform: "linux" }, { value: HOME }],
  ["posix, ~/ is the home directory", { agentDir: "~/", home: HOME, platform: "linux" }, { value: HOME }],
  ["posix, ~/custom/agent joins the home directory", { agentDir: "~/custom/agent", home: HOME, platform: "linux" }, { value: join(HOME, "custom", "agent") }],
  ["posix, ~other/agent is not expanded", { agentDir: "~other/agent", home: HOME, platform: "linux" }, { value: "~other/agent" }],
  ["posix, ~~ is not expanded", { agentDir: "~~", home: HOME, platform: "linux" }, { value: "~~" }],
  ["posix, a relative path is returned as given", { agentDir: "relative/agent", home: HOME, platform: "linux" }, { value: "relative/agent" }],
  ["posix, surrounding spaces are kept (no trim)", { agentDir: "  /padded/agent  ", home: HOME, platform: "linux" }, { value: "  /padded/agent  " }],
  ["posix, file:/// URL becomes its path", { agentDir: "file:///opt/pi/agent", home: HOME, platform: "linux" }, { value: "/opt/pi/agent" }],
  ["posix, file URL percent-escapes are decoded", { agentDir: "file:///opt/pi%20agent", home: HOME, platform: "linux" }, { value: "/opt/pi agent" }],
  ["posix, FILE:/// (upper case) is not a file URL", { agentDir: "FILE:///opt/pi", home: HOME, platform: "linux" }, { value: "FILE:///opt/pi" }],
  ["posix, a file URL with a host throws the same error", { agentDir: "file://host.example/agent", home: HOME, platform: "linux" }, { code: "ERR_INVALID_FILE_URL_HOST" }],
  ["posix, ~\\agent is not expanded", { agentDir: "~\\agent", home: HOME, platform: "linux" }, { value: "~\\agent" }],
  ["posix, /c/Users/agent is not rewritten to a drive path", { agentDir: "/c/Users/agent", home: HOME, platform: "linux" }, { value: "/c/Users/agent" }],
  ["posix, HOME is read at call time (default)", { home: OTHER_HOME, platform: "linux" }, { value: join(OTHER_HOME, ".pi", "agent") }],
  ["posix, HOME is read at call time (~/x)", { agentDir: "~/x", home: OTHER_HOME, platform: "linux" }, { value: join(OTHER_HOME, "x") }],
  ["win32, PI_CODING_AGENT_DIR unset: the home default", { home: HOME, platform: "win32" }, { value: join(HOME, ".pi", "agent") }],
  ["win32, Git Bash /c/Users/agent becomes C:\\Users\\agent", { agentDir: "/c/Users/agent", home: HOME, platform: "win32" }, { value: "C:\\Users\\agent" }],
  ["win32, WSL /mnt/d/agent becomes D:\\agent", { agentDir: "/mnt/d/agent", home: HOME, platform: "win32" }, { value: "D:\\agent" }],
  ["win32, Cygwin /cygdrive/e/pi/agent becomes E:\\pi\\agent", { agentDir: "/cygdrive/e/pi/agent", home: HOME, platform: "win32" }, { value: "E:\\pi\\agent" }],
  ["win32, a bare drive /c becomes C:\\", { agentDir: "/c", home: HOME, platform: "win32" }, { value: "C:\\" }],
  ["win32, an upper-case drive /C/agent becomes C:\\agent", { agentDir: "/C/agent", home: HOME, platform: "win32" }, { value: "C:\\agent" }],
  ["win32, /mnt/c becomes C:\\", { agentDir: "/mnt/c", home: HOME, platform: "win32" }, { value: "C:\\" }],
  ["win32, /mnt alone is not a drive path", { agentDir: "/mnt", home: HOME, platform: "win32" }, { value: "/mnt" }],
  ["win32, a two-letter segment /ab/agent is not a drive path", { agentDir: "/ab/agent", home: HOME, platform: "win32" }, { value: "/ab/agent" }],
  ["win32, a UNC //server/share/agent is unchanged", { agentDir: "//server/share/agent", home: HOME, platform: "win32" }, { value: "//server/share/agent" }],
  ["win32, a path holding a backslash is unchanged", { agentDir: "/c/agent\\sub", home: HOME, platform: "win32" }, { value: "/c/agent\\sub" }],
  ["win32, C:\\already\\agent is unchanged", { agentDir: "C:\\already\\agent", home: HOME, platform: "win32" }, { value: "C:\\already\\agent" }],
  ["win32, ~\\agent joins the home directory", { agentDir: "~\\agent", home: HOME, platform: "win32" }, { value: join(HOME, "agent") }],
  ["win32, ~/agent joins the home directory", { agentDir: "~/agent", home: HOME, platform: "win32" }, { value: join(HOME, "agent") }],
  ["win32, a file URL goes through the same fileURLToPath", { agentDir: "file:///C:/agent", home: HOME, platform: "win32" }, { value: "/C:/agent" }],
];

describe("getAgentDir resolves the value the eager pi-coding-agent import resolves (wb-nl8.3 owner bound 4)", () => {
  it("the oracle is the stock-branded pi-coding-agent 1.1.0 this local copy mirrors (a version bump re-audits it)", () => {
    expect(VERSION).toBe("1.1.0");
    expect(CONFIG_DIR_NAME).toBe(".pi");
  });

  for (const [title, environment, eagerReading] of CASES) {
    it(title, () => {
      const local = withEnvironment(environment, getAgentDir);
      const eager = withEnvironment(environment, eagerGetAgentDir);
      expect(local).toEqual(eager);
      if ("value" in eagerReading) expect(eager).toEqual(eagerReading);
      else expect(eager).toMatchObject(eagerReading);
    });
  }
});
