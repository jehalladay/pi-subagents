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
 * Honesty (E5): both seams SCRUB as of wb-ksz.8 (landed b0a1892), so the former known-widening
 * pairs are plain rows now (pin-flip, both pairs together):
 *   - src/workflow/runtime.ts constructs the interpreter Worker with an explicit plain `env: {}`
 *     (owner seam rule 1: zero names; the subset form of E1 is satisfied by the empty object).
 *   - src/workbench/hosts/local-detached.ts spawns the detached host with
 *     scrubbedEnvironment(process.env) (src/workbench/process-env.ts), a null-prototype object
 *     holding only DETACHED_HOST_ENV_ALLOWLIST names.
 * A regression to an inherited env fails the plain rows; it is never a pass and never a warning.
 *
 * ALLOWLIST OF RECORD: ALLOWLIST below IS the DETACHED_HOST_ENV_ALLOWLIST export (31 names,
 * src/workbench/process-env.ts:22), the owner's 12:4xZ allowlist (16 + 15 names). ORACLE: beads
 * wb-ksz and wb-ksz.8; the operational name XDG_RUNTIME_DIR is read by the detached socket base
 * (local-detached.ts resolveDetachedSocket) and is the pin that proves the 16-name proposal is
 * superseded. Failure messages print KEY NAMES only, never a value and never an environment dump:
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
import { DETACHED_HOST_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
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

const ALLOWLIST: ReadonlySet<string> = new Set(DETACHED_HOST_ENV_ALLOWLIST);
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

/**
 * OWNER-GRANTED EXCEPTION (wb-ksz.3 ruling R1 = (a), 2026-10-16T20:00Z): exactly CLAUDE_CONFIG_DIR is
 * exempt from the CLAUDE_ prefix arm. GROUNDS: the variable carries a DIRECTORY PATH the SDK CLI
 * consumes, not a secret; the credential store lives under it or HOME and is never an environment
 * variable at this seam (the process-env.ts rationale of record). The exception is BY NAME, never by
 * class: the regex arm and every other prefix (and every other CLAUDE_* name) stay flagged.
 */
const PREFIX_EXEMPT_BY_OWNER_RULING: ReadonlySet<string> = new Set(["CLAUDE_CONFIG_DIR"]);
const credentialShaped = (name: string) =>
  CREDENTIAL_SHAPED.test(name) || (!PREFIX_EXEMPT_BY_OWNER_RULING.has(name) && CREDENTIAL_PREFIXES.some(prefix => name.startsWith(prefix)));

/** Verdict over a handed-over env: names only, never values. `undefined` is the inherited-env widening. */
function censusEnv(env: unknown): { inherited: boolean; outsideAllowlist: string[]; canariesPresent: string[]; credentialShaped: string[] } {
  // Explicit env = a plain object whose prototype is Object.prototype OR null (scrubbedEnvironment returns
  // Object.create(null)); undefined, null, non-objects and worker.SHARE_ENV stay inherited.
  const prototype = env !== null && typeof env === "object" ? Object.getPrototypeOf(env) : undefined;
  if (env === undefined || env === null || typeof env !== "object" || (prototype !== Object.prototype && prototype !== null)) {
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

const loadDetachedHost = () => import("../src/workbench/hosts/local-detached.js");
let launchDetachedWorkflow: Awaited<ReturnType<typeof loadDetachedHost>>["launchDetachedWorkflow"];

// The cold import of local-detached.js (~2.5 s at load 20-23) is hoisted out of the first detached row
// with an explicit hook timeout, so the row's own 5 s budget measures the launch, not the module load.
beforeAll(async () => {
  captured.root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
  scratch = realpathSync(mkdtempSync(join(tmpdir(), "w19-envscrub-")));
  ({ launchDetachedWorkflow } = await loadDetachedHost());
}, 60_000);
afterAll(() => { if (scratch) rmSync(scratch, { recursive: true, force: true }); });

async function launchAndCaptureSpawn(): Promise<Record<string, unknown> | undefined> {
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
  it("a null-prototype allowlisted env classifies as explicit and passes expectScrubbed (U2 falsifier)", () => {
    const env: Record<string, string> = Object.create(null);
    env.PATH = "/bin";
    env.HOME = "/h";
    expect(censusEnv(env)).toEqual({ inherited: false, outsideAllowlist: [], canariesPresent: [], credentialShaped: [] });
    expect(() => expectScrubbed(env, "null-prototype")).not.toThrow();
    const outside: Record<string, string> = Object.create(null);
    outside.W19_CANARY_NPM_TOKEN = "x";
    expect(censusEnv(outside).canariesPresent, "a null-prototype env is still judged name by name").toEqual(["W19_CANARY_NPM_TOKEN"]);
    expect(censusEnv(undefined).inherited, "undefined stays inherited").toBe(true);
    expect(censusEnv(null).inherited, "null stays inherited").toBe(true);
    expect(censusEnv("PATH=/bin").inherited, "a non-object stays inherited").toBe(true);
    expect(censusEnv(Object.create({ PATH: "/bin" })).inherited, "an object with a foreign prototype stays inherited").toBe(true);
  });
  it("the owner-granted CLAUDE_CONFIG_DIR exception is by NAME: it alone passes, every other CLAUDE_ name still flags (R1 falsifiers)", () => {
    expect(censusEnv({ CLAUDE_CONFIG_DIR: "/c" }).credentialShaped, "CLAUDE_CONFIG_DIR is exempt from the prefix arm").toEqual([]);
    expect(() => expectScrubbed({ PATH: "/bin", CLAUDE_CONFIG_DIR: "/c" }, "claude-config-dir")).not.toThrow();
    expect(censusEnv({ CLAUDE_CONFIG_DIR: "/c", CLAUDE_OTHER: "x" }).credentialShaped, "any other CLAUDE_ name is still flagged").toEqual(["CLAUDE_OTHER"]);
    expect(censusEnv({ CLAUDE_CONFIG_DIR_EXTRA: "x" }).credentialShaped, "a name merely starting with the exempt name is still flagged").toEqual(["CLAUDE_CONFIG_DIR_EXTRA"]);
    expect(censusEnv({ CLAUDE_CODE_OAUTH_TOKEN: "x" }).credentialShaped, "the regex arm is unchanged").toEqual(["CLAUDE_CODE_OAUTH_TOKEN"]);
    expect(() => expectScrubbed({ PATH: "/bin", CLAUDE_OTHER: "x" }, "claude-other")).toThrow();
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
  it("the allowlist of record (DETACHED_HOST_ENV_ALLOWLIST) contains no credential-shaped name and names XDG_RUNTIME_DIR", () => {
    expect([...ALLOWLIST].filter(credentialShaped)).toEqual([]);
    expect(ALLOWLIST.has("XDG_RUNTIME_DIR"), "the operational oracle name read by the detached socket base").toBe(true);
    expect(ALLOWLIST.has("CLAUDE_CONFIG_DIR"), "the owner-granted exemption name is on the allowlist of record").toBe(true);
    expect(ALLOWLIST.size, "size of the allowlist of record").toBe(31);
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
  it("the Worker env option is an explicit plain object with ZERO names (owner seam rule 1)", async () => {
    captured.workerOptions.length = 0;
    await withCanaries(() => runWorkflow({ script: `${META("env-census-embedded-fact")}return 1;`, host: host() }));
    const env = captured.workerOptions[0]?.env;
    expect(typeof env, "type of the Worker env option").toBe("object");
    expect(env === null, "the Worker env option is not null").toBe(false);
    expect(Object.getPrototypeOf(env), "the Worker env option is a plain object").toBe(Object.prototype);
    expect(Object.keys(env as Record<string, unknown>), "names in the Worker env option").toEqual([]);
  });
  it("runtime.ts new Worker hands an allowlist-only env object with no canary credential names", async () => {
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
  it("no canary, no credential-shaped and no outside-allowlist name reached the spawned env", async () => {
    const options = await withCanaries(launchAndCaptureSpawn);
    const verdict = censusEnv(options?.env);
    expect(verdict.inherited, "the spawn env is an explicit object").toBe(false);
    expect(verdict.canariesPresent, "canary credential names in the spawn env").toEqual([]);
    expect(verdict.credentialShaped, "credential-shaped names in the spawn env").toEqual([]);
    expect(verdict.outsideAllowlist, "names outside the allowlist of record in the spawn env").toEqual([]);
  });
  it("local-detached.ts spawn hands an allowlist-only env with no canary credential names", async () => {
    const options = await withCanaries(launchAndCaptureSpawn);
    expectScrubbed(options?.env, "local-detached.ts spawn");
  });
  it("a proxy variable carrying canary userinfo is dropped by NAME while a userinfo-free proxy value is passed (owner seam rule 2)", async () => {
    const userinfoProxy = "http://w19canary:W19_NOT_A_REAL_CREDENTIAL@proxy.invalid:3128";
    const plainProxy = "http://proxy.invalid:3128";
    const priorProxy = process.env.HTTPS_PROXY;
    try {
      process.env.HTTPS_PROXY = userinfoProxy;
      const droppedEnv = (await withCanaries(launchAndCaptureSpawn))?.env;
      expect(censusEnv(droppedEnv).inherited, "the spawn env is an explicit object").toBe(false);
      expect(Object.keys(droppedEnv as Record<string, unknown>).includes("HTTPS_PROXY"), "HTTPS_PROXY (userinfo value) reached the spawn env").toBe(false);
      process.env.HTTPS_PROXY = plainProxy;
      const control = (await withCanaries(launchAndCaptureSpawn))?.env;
      expect(Object.keys(control as Record<string, unknown>).includes("HTTPS_PROXY"), "HTTPS_PROXY (userinfo-free control) was passed").toBe(true);
      expectScrubbed(control, "local-detached.ts spawn (proxy control)");
    } finally {
      if (priorProxy === undefined) delete process.env.HTTPS_PROXY; else process.env.HTTPS_PROXY = priorProxy;
    }
  });
});
