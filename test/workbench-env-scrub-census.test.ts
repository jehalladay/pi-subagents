/**
 * W19 / WB-022 slice 1 of 4 (wb-ksz.3): env-scrub census over both interpreter launch seams.
 *
 * Spec lines pinned (docs/workbench/12-security.md, 'Credential boundaries'):
 *   "no serialized clients/private tokens across worker channel."
 * ('The VM is not a security boundary'): "Never inject privileged objects or secrets into this VM."
 * (docs/workbench/17-packaging-and-operations.md, 'Runtime and host requirements' bullet 1):
 *   "no secret copied into script VM."
 * Owner boundary (wb-ksz, 16:19Z): "scrubbed-env child (credential vars absent by allowlist)".
 *
 * This file MEASURES the environment handed to the child. It does not test VM escape (slice 3)
 * or the RPC surface (slice 2). The existing it.fails canary in
 * test/workbench-security-workflow.test.ts is neither edited nor duplicated here.
 *
 * Honesty (E5): both seams are RED today because neither passes an allowlist-only env:
 *   - src/workflow/runtime.ts constructs the interpreter Worker with NO env option, so Node's
 *     documented default hands the worker a copy of process.env.
 *   - src/workbench/hosts/local-detached.ts spawns the detached host with {...process.env}
 *     minus NODE_OPTIONS/NODE_PATH.
 * Each red row is a NAMED known widening carried as it.fails. It is never a pass and never a
 * warning. It flips to a plain it only when the real scrub lands (owner bead wb-ksz).
 *
 * PROPOSED ALLOWLIST (for owner review): PATH, HOME, TMPDIR, TMP, TEMP, LANG, LC_ALL, LC_CTYPE,
 * TERM, TZ, PWD, USER, LOGNAME, SHELL, NODE_ENV, CI. Nothing else. When the implementation slice
 * exports its allowlist constant, ALLOWLIST below flips to that export (pin-flip; oracle bead
 * wb-ksz). Failure messages print KEY NAMES only, never a value and never an environment dump:
 * every assertion over a recorded options object projects to key names or scalar fields before
 * expect(), and the failure-path falsifier in the harness sanity block proves it with a synthetic
 * canary value.
 */
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inspect } from "node:util";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

const captured = vi.hoisted(() => ({
  workerOptions: [] as Array<Record<string, unknown>>,
  spawnOptions: [] as Array<Record<string, unknown>>,
  root: "",
}));

vi.mock("node:worker_threads", async importOriginal => {
  const actual = await importOriginal<typeof import("node:worker_threads")>();
  class RecordingWorker extends actual.Worker {
    constructor(source: string | URL, options?: import("node:worker_threads").WorkerOptions) {
      captured.workerOptions.push({ ...(options ?? {}) });
      super(source, options);
    }
  }
  return { ...actual, Worker: RecordingWorker, default: { ...actual, Worker: RecordingWorker } };
});

vi.mock("node:child_process", async importOriginal => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  const spawn = (command: string, args?: readonly string[], options?: Record<string, unknown>) => {
    const detachedHost = Array.isArray(args) && args.includes("--serve");
    if (!detachedHost) return (actual.spawn as (...a: unknown[]) => unknown)(command, args, options);
    captured.spawnOptions.push({ ...(options ?? {}) });
    // A fake child that has already exited: launchDetachedWorkflow stops at the
    // "exited before handshake" refusal, so no real host and no socket are ever started.
    return { exitCode: 1, signalCode: null, pid: 0, on: () => undefined, unref: () => undefined };
  };
  return { ...actual, spawn, default: { ...actual, spawn } };
});

// The detached launch refuses without a compiled dist/. When dist/ is absent (a plain
// checkout) a one-file virtual dist overlays the filesystem so the launch reaches spawn.
// When a real dist/ exists the overlay stands down and the real tree is used.
vi.mock("node:fs", async importOriginal => {
  const actual = await importOriginal<typeof import("node:fs")>();
  const dist = () => join(captured.root, "dist");
  const hosts = () => join(dist(), "workbench", "hosts");
  const file = () => join(hosts(), "local-detached.js");
  const virtual = () => captured.root !== "" && !actual.existsSync(file());
  const dirs = () => new Set([dist(), join(dist(), "workbench"), hosts()]);
  const children: Record<string, string> = {};
  const listing = (path: string) => {
    children[dist()] = "workbench"; children[join(dist(), "workbench")] = "hosts"; children[hosts()] = "local-detached.js";
    return children[path];
  };
  const stat = (path: string) => ({ isDirectory: () => dirs().has(path), isFile: () => path === file(), isSymbolicLink: () => false, size: 1, mode: 0o755 });
  const known = (path: unknown) => typeof path === "string" && virtual() && (dirs().has(path) || path === file());
  const wrap = <T extends (...a: never[]) => unknown>(real: T, fake: (path: string) => unknown) => ((path: never, ...rest: never[]) => (known(path) ? fake(path as string) : real(path, ...rest))) as unknown as T;
  const realpath = Object.assign(wrap(actual.realpathSync, path => path), { native: actual.realpathSync.native });
  const overlay = {
    ...actual,
    existsSync: wrap(actual.existsSync, () => true),
    realpathSync: realpath,
    lstatSync: wrap(actual.lstatSync, stat),
    statSync: wrap(actual.statSync, stat),
    readdirSync: wrap(actual.readdirSync, path => [listing(path)]),
    readFileSync: wrap(actual.readFileSync, () => Buffer.from("// virtual dist for the env-scrub census\n")),
  };
  return { ...overlay, default: overlay };
});

const ALLOWLIST = new Set(["PATH", "HOME", "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "LC_CTYPE", "TERM", "TZ", "PWD", "USER", "LOGNAME", "SHELL", "NODE_ENV", "CI"]);
const CREDENTIAL_SHAPED = /TOKEN|SECRET|KEY|PASSWORD|CREDENTIAL|COOKIE|AUTH/i;
const CREDENTIAL_PREFIXES = ["ANTHROPIC_", "AWS_", "CLAUDE_", "OPENAI_", "GITHUB_", "MIDWAY_", "NPM_"];
const CANARY_VALUE = "W19_NOT_A_REAL_CREDENTIAL";
const CANARIES = [
  "W19_CANARY_ANTHROPIC_API_KEY",
  "W19_CANARY_AWS_SECRET_ACCESS_KEY",
  "W19_CANARY_CLAUDE_CODE_OAUTH_TOKEN",
  "W19_CANARY_GITHUB_TOKEN",
  "W19_CANARY_MIDWAY_COOKIE",
  "W19_CANARY_NPM_TOKEN",
] as const;

const credentialShaped = (name: string) => CREDENTIAL_SHAPED.test(name) || CREDENTIAL_PREFIXES.some(prefix => name.startsWith(prefix));

/** Verdict over a handed-over env: names only, never values. `undefined` is the inherited-env widening. */
function censusEnv(env: unknown): { inherited: boolean; outsideAllowlist: string[]; canariesPresent: string[]; credentialShaped: string[] } {
  if (env === undefined || env === null || typeof env !== "object" || Object.getPrototypeOf(env) !== Object.prototype) {
    return { inherited: true, outsideAllowlist: [], canariesPresent: [], credentialShaped: [] };
  }
  const names = Object.keys(env as Record<string, unknown>);
  return {
    inherited: false,
    outsideAllowlist: names.filter(name => !ALLOWLIST.has(name)).sort(),
    canariesPresent: names.filter(name => (CANARIES as readonly string[]).includes(name)).sort(),
    credentialShaped: names.filter(credentialShaped).sort(),
  };
}

function expectScrubbed(env: unknown, seam: string): void {
  const verdict = censusEnv(env);
  expect(verdict.inherited, `${seam}: no explicit allowlist-only env object was handed to the child (env inherited)`).toBe(false);
  expect(verdict.canariesPresent, `${seam}: canary credential names reached the child`).toEqual([]);
  expect(verdict.credentialShaped, `${seam}: credential-shaped names reached the child`).toEqual([]);
  expect(verdict.outsideAllowlist, `${seam}: names outside the proposed allowlist reached the child`).toEqual([]);
}

/**
 * Asserts a recorded options object carries no env key. The assertion is made over the KEY NAMES only
 * (a projection taken before expect()), so a failure can never serialize an env value (E3).
 */
function expectNoEnvOption(options: Record<string, unknown> | undefined, seam: string): void {
  expect(Object.keys(options ?? {}), `${seam} options carry an env key`).not.toContain("env");
}

function withCanaries<T>(run: () => Promise<T>): Promise<T> {
  const prior = new Map<string, string | undefined>();
  for (const name of CANARIES) { prior.set(name, process.env[name]); process.env[name] = CANARY_VALUE; }
  return run().finally(() => {
    for (const [name, value] of prior) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
  });
}

const META = (name: string) => `export const meta={name:${JSON.stringify(name)},description:"w19 env-scrub census"};\n`;
const host = (): WorkflowHost => ({ spawnAgent: vi.fn(async () => ({ ok: true })), abortAgent: vi.fn(), callNode: vi.fn(async () => ({ ok: true })) });

let scratch = "";

beforeAll(() => {
  captured.root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
  scratch = realpathSync(mkdtempSync(join(tmpdir(), "w19-envscrub-")));
});
afterAll(() => { if (scratch) rmSync(scratch, { recursive: true, force: true }); });

async function launchAndCaptureSpawn(): Promise<Record<string, unknown> | undefined> {
  const { launchDetachedWorkflow } = await import("../src/workbench/hosts/local-detached.js");
  const id = `envscrub${captured.spawnOptions.length}${Date.now().toString(36)}`;
  const scriptPath = join(scratch, `${id}.js`);
  writeFileSync(scriptPath, `${META("w19-env-census")}return 1;\n`);
  const before = captured.spawnOptions.length;
  await expect(launchDetachedWorkflow({
    directory: join(scratch, `inv-${id}`), invocationId: id, scriptPath, cwd: scratch, input: null, trustedScript: true,
    backend: "deterministic", permissions: ["inspect"], autoStart: false,
  })).rejects.toThrow(/exited before handshake/);
  return captured.spawnOptions.length > before ? captured.spawnOptions[captured.spawnOptions.length - 1] : undefined;
}

describe("W19 env-scrub census: harness sanity (plain, must pass)", () => {
  it("the census verdict names every violation class by key name and passes a clean allowlisted env", () => {
    expect(censusEnv(undefined).inherited).toBe(true);
    expect(censusEnv({ ...process.env }).inherited).toBe(false);
    expect(censusEnv({ PATH: "/bin", HOME: "/h", [CANARIES[0]]: "x" })).toEqual({ inherited: false, outsideAllowlist: [CANARIES[0]], canariesPresent: [CANARIES[0]], credentialShaped: [CANARIES[0]] });
    expect(censusEnv({ PATH: "/bin", HOME: "/h", LANG: "C" })).toEqual({ inherited: false, outsideAllowlist: [], canariesPresent: [], credentialShaped: [] });
    expect(() => expectScrubbed({ PATH: "/bin", HOME: "/h" }, "clean")).not.toThrow();
  });
  it("a failing options assertion names the key and never prints a value (E3 failure-path falsifier)", () => {
    const probe = "W19_FALSIFIER_LEAK_PROBE_VALUE";
    let message = "";
    try {
      expectNoEnvOption({ eval: true, env: { W19_PROBE_KEY: probe } }, "synthetic seam");
    } catch (error) {
      message = inspect(error, { depth: null });
    }
    expect(message === "", "the synthetic env option must make the helper throw").toBe(false);
    expect(message.includes("env"), "the failure rendering (message plus the actual/expected diff vitest prints) names the env key").toBe(true);
    expect(message.includes(probe), "the failure rendering must not contain the env value").toBe(false);
    expect(message.includes("W19_PROBE_KEY"), "the failure rendering must not dump the env object").toBe(false);
  });
  it("the allowlist proposal itself contains no credential-shaped name", () => {
    expect([...ALLOWLIST].filter(credentialShaped)).toEqual([]);
  });
});

describe("W19 env-scrub census: embedded interpreter seam (src/workflow/runtime.ts new Worker)", () => {
  it("the recording Worker observes the constructor options of a real run", async () => {
    captured.workerOptions.length = 0;
    const result = await withCanaries(() => runWorkflow({ script: `${META("env-census-embedded")}return 1;`, host: host() }));
    expect(result.status).toBe("completed");
    expect(captured.workerOptions.length, "one interpreter Worker was constructed for the run").toBe(1);
    expect(captured.workerOptions[0]?.eval, "the interpreter Worker is constructed with eval: true").toBe(true);
  });
  it("KNOWN WIDENING (measured): runtime.ts passes no env option, so Node hands the worker a copy of process.env", async () => {
    captured.workerOptions.length = 0;
    await withCanaries(() => runWorkflow({ script: `${META("env-census-embedded-fact")}return 1;`, host: host() }));
    expectNoEnvOption(captured.workerOptions[0], "runtime.ts Worker");
  });
  it.fails("KNOWN WIDENING: runtime.ts new Worker must hand an allowlist-only env object with no canary credential names", async () => {
    captured.workerOptions.length = 0;
    await withCanaries(async () => {
      await runWorkflow({ script: `${META("env-census-embedded-scrub")}return 1;`, host: host() });
      expectScrubbed(captured.workerOptions[0]?.env, "runtime.ts Worker");
    });
  });
});

describe("W19 env-scrub census: detached host seam (src/workbench/hosts/local-detached.ts spawn)", () => {
  it("the launch reaches spawn with the host entrypoint and captures its options", async () => {
    const options = await withCanaries(launchAndCaptureSpawn);
    expect(options).toBeDefined();
    expect(options?.detached, "detached spawn option").toBe(true);
    expect(options?.shell, "shell spawn option").toBe(false);
    expect(typeof options?.env, "type of the spawn env option").toBe("object");
  });
  it("KNOWN WIDENING (measured): the spawned env carries the parent's canary credential names", async () => {
    const options = await withCanaries(launchAndCaptureSpawn);
    const verdict = censusEnv(options?.env);
    expect(verdict.canariesPresent).toEqual([...CANARIES].sort());
  });
  it.fails("KNOWN WIDENING: local-detached.ts spawn must hand an allowlist-only env with no canary credential names", async () => {
    const options = await withCanaries(launchAndCaptureSpawn);
    expectScrubbed(options?.env, "local-detached.ts spawn");
  });
});
