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
 * ALLOWLIST OF RECORD: ALLOWLIST below IS the DETACHED_HOST_ENV_ALLOWLIST export (33 names,
 * src/workbench/process-env.ts:22), the owner's 12:4xZ allowlist (16 + 15 names) plus the two rf
 * workspace locators RF_WORKSPACE and SWARM_RF_WORKSPACE (wb-973.6 SCG-R6, owner grooming ruling at
 * the wb-ksz.3 landing; registry entry 13: an allowlist addition updates this census in the same
 * commit). ORACLE: beads
 * wb-ksz and wb-ksz.8; the operational name XDG_RUNTIME_DIR is read by the detached socket base
 * (local-detached.ts resolveDetachedSocket) and is the pin that proves the 16-name proposal is
 * superseded. Failure messages print KEY NAMES only, never a value and never an environment dump:
 * every assertion over a recorded options object projects to key names or scalar fields before
 * expect(). The Worker-env checks run through ONE helper (expectPlainEmptyEnv) and its failure-path
 * falsifier in the harness sanity block proves it with a synthetic env whose prototype carries a probe
 * value plus an own key: the rendered failure names the failed check and contains neither value.
 */
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inspect } from "node:util";
import type { Options, SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
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
 * The Worker env option must be an explicit plain object with ZERO names (owner seam rule 1). Every check
 * is a scalar or a key-name projection taken BEFORE expect(), so a failure can never serialize an env
 * value, an inherited prototype's values or the ambient environment (E3).
 */
function expectPlainEmptyEnv(env: unknown, seam: string): void {
  expect(typeof env, `${seam}: type of the env option`).toBe("object");
  expect(env === null, `${seam}: the env option is not null`).toBe(false);
  expect(Object.getPrototypeOf(env) === Object.prototype, `${seam}: the env option is a plain object`).toBe(true);
  expect(Object.keys(env as Record<string, unknown>), `${seam}: names in the env option`).toEqual([]);
}

function withCanaries<T>(run: () => Promise<T>): Promise<T> {
  const prior = new Map<string, string | undefined>();
  for (const name of CANARIES) { prior.set(name, process.env[name]); process.env[name] = CANARY_VALUE; }
  return run().finally(() => {
    for (const [name, value] of prior) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
  });
}

/**
 * SCG-R6 (wb-973.6): the two rf workspace locators, set in the parent env by the parity rows. Both are
 * directory paths (operational locators, not credentials); distinct values so a swapped copy is red.
 */
const WORKSPACE_LOCATORS = { RF_WORKSPACE: "/srv/swarm/rf", SWARM_RF_WORKSPACE: "/srv/swarm/rf-swarm" } as const;
type LocatorName = keyof typeof WORKSPACE_LOCATORS;
const LOCATOR_NAMES: readonly LocatorName[] = ["RF_WORKSPACE", "SWARM_RF_WORKSPACE"];

function withWorkspaceLocators<T>(run: () => Promise<T>): Promise<T> {
  const prior = new Map<string, string | undefined>();
  for (const name of LOCATOR_NAMES) { prior.set(name, process.env[name]); process.env[name] = WORKSPACE_LOCATORS[name]; }
  return run().finally(() => {
    for (const [name, value] of prior) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
  });
}

/** Names-only projection: per locator, whether `env` carries it with the parent's value: a boolean, never the value. */
function locatorProjection(env: unknown): Record<LocatorName, boolean> {
  const record = env !== null && typeof env === "object" ? (env as Record<string, unknown>) : undefined;
  return {
    RF_WORKSPACE: record?.RF_WORKSPACE === WORKSPACE_LOCATORS.RF_WORKSPACE,
    SWARM_RF_WORKSPACE: record?.SWARM_RF_WORKSPACE === WORKSPACE_LOCATORS.SWARM_RF_WORKSPACE,
  };
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

/**
 * One agent() call through the EMBEDDED Claude host (src/workbench/claude-host.ts) with the SDK query injected:
 * records the SDK Options it builds and, as a names-only projection, the env its SDK CLI child receives. SDK
 * contract (@anthropic-ai/claude-agent-sdk 0.3.300, Options.env): "When set, this value REPLACES the subprocess
 * environment entirely ... When omitted, the subprocess inherits process.env." Test only: claude-host.ts is read,
 * never edited (owner hot set).
 */
async function captureClaudeOptions(): Promise<{ options: Options | undefined; childEnv: Record<LocatorName, boolean> }> {
  let options: Options | undefined;
  let childEnv = locatorProjection(undefined);
  const host = createClaudeWorkflowHost({
    cwd: scratch,
    query: params => {
      options = params.options;
      childEnv = locatorProjection(Object.hasOwn(params.options, "env") ? params.options.env : process.env);
      return (async function* () {
        yield { type: "system", subtype: "init", session_id: "scg-r6", model: "claude-sonnet-5", tools: [] } as unknown as SDKMessage;
        yield { type: "result", subtype: "success", session_id: "scg-r6", result: "done", is_error: false, modelUsage: {} } as unknown as SDKMessage;
      })();
    },
  });
  const result = await host.spawnAgent({ agentId: "scg-r6-embedded", index: 0, label: "scg-r6", prompt: "census", agentType: "general-purpose" });
  expect(result.ok, "the embedded agent call settled through the injected query").toBe(true);
  return { options, childEnv };
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
  it("a failing Worker-env assertion names the failed check and never prints a value (E3 failure-path falsifier)", () => {
    const probe = "W19_FALSIFIER_LEAK_PROBE_VALUE";
    const ownValue = "W19_FALSIFIER_OWN_KEY_VALUE";
    const render = (env: unknown): string => {
      try {
        expectPlainEmptyEnv(env, "synthetic seam");
      } catch (error) {
        return inspect(error, { depth: null });
      }
      return "";
    };
    // An env whose PROTOTYPE carries a probe value (the Object.create(process.env) regression shape) plus one own key.
    const inherited = Object.create({ W19_PROBE_PROTO_KEY: probe }) as Record<string, string>;
    inherited.W19_PROBE_OWN_KEY = ownValue;
    const rendering = render(inherited);
    expect(rendering === "", "the inheriting env must make the helper throw").toBe(false);
    expect(rendering.includes("the env option is a plain object"), "the rendering names the failed check").toBe(true);
    expect(rendering.includes(probe), "the rendering must not contain the prototype-carried value").toBe(false);
    expect(rendering.includes(ownValue), "the rendering must not contain the own key value").toBe(false);
    expect(rendering.includes("W19_PROBE_OWN_KEY"), "the rendering must not dump the env object").toBe(false);
    // A plain env carrying one own key: the zero-names check may name the key, never its value.
    const plain: Record<string, string> = { W19_PROBE_OWN_KEY: ownValue };
    const namesRendering = render(plain);
    expect(namesRendering.includes("names in the env option"), "the zero-names check is the one that failed").toBe(true);
    expect(namesRendering.includes(ownValue), "the zero-names failure must not contain the own key value").toBe(false);
  });
  it("withCanaries sets every canary name inside the callback and restores the prior state afterwards (names only)", async () => {
    const before = CANARIES.filter(name => name in process.env);
    const missingInside = await withCanaries(async () => CANARIES.filter(name => !(name in process.env)));
    expect(missingInside, "canary names absent from process.env inside withCanaries").toEqual([]);
    expect(CANARIES.filter(name => name in process.env), "canary names present after withCanaries differ from before").toEqual(before);
  });
  it("the allowlist of record (DETACHED_HOST_ENV_ALLOWLIST) contains no credential-shaped name and names XDG_RUNTIME_DIR", () => {
    expect([...ALLOWLIST].filter(credentialShaped)).toEqual([]);
    expect(ALLOWLIST.has("XDG_RUNTIME_DIR"), "the operational oracle name read by the detached socket base").toBe(true);
    expect(ALLOWLIST.has("CLAUDE_CONFIG_DIR"), "the owner-granted exemption name is on the allowlist of record").toBe(true);
    expect(ALLOWLIST.size, "size of the allowlist of record").toBe(33);
  });
  it("the allowlist of record names the two rf workspace locators and neither is credential-shaped (SCG-R6 MEMBERS, names only)", () => {
    for (const name of LOCATOR_NAMES) {
      expect(ALLOWLIST.has(name), `${name} is on the allowlist of record`).toBe(true);
      expect(credentialShaped(name), `${name} is credential-shaped under the census check`).toBe(false);
    }
    expect(ALLOWLIST.has("RF_ACTOR"), "RF_ACTOR is on the allowlist of record (it needs its own ruling)").toBe(false);
  });
  it("the locator projection is names-only: a missing or different value projects to false and no value is carried", () => {
    const wrong = "/srv/elsewhere/not-the-locator";
    const projection = locatorProjection({ RF_WORKSPACE: wrong, SWARM_RF_WORKSPACE: WORKSPACE_LOCATORS.SWARM_RF_WORKSPACE });
    expect(projection).toEqual({ RF_WORKSPACE: false, SWARM_RF_WORKSPACE: true });
    expect(JSON.stringify(projection).includes(wrong), "the projection carries the value it judged").toBe(false);
    expect(locatorProjection(undefined)).toEqual({ RF_WORKSPACE: false, SWARM_RF_WORKSPACE: false });
    expect(locatorProjection(null)).toEqual({ RF_WORKSPACE: false, SWARM_RF_WORKSPACE: false });
    const nullPrototype: Record<string, string> = Object.create(null);
    nullPrototype.RF_WORKSPACE = WORKSPACE_LOCATORS.RF_WORKSPACE;
    nullPrototype.SWARM_RF_WORKSPACE = WORKSPACE_LOCATORS.SWARM_RF_WORKSPACE;
    expect(locatorProjection(nullPrototype), "a null-prototype env is judged like any other").toEqual({ RF_WORKSPACE: true, SWARM_RF_WORKSPACE: true });
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
    expectPlainEmptyEnv(captured.workerOptions[0]?.env, "runtime.ts Worker");
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

describe("W19 env-scrub census: SCG-R6 rf workspace locators reach the SDK child equally at both seams (wb-973.6)", () => {
  it("local-detached.ts spawn carries RF_WORKSPACE and SWARM_RF_WORKSPACE with the parent's values and stays allowlist-only", async () => {
    const options = await withWorkspaceLocators(() => withCanaries(launchAndCaptureSpawn));
    expect(locatorProjection(options?.env), "locators carried with the parent's values (names only)").toEqual({ RF_WORKSPACE: true, SWARM_RF_WORKSPACE: true });
    expectScrubbed(options?.env, "local-detached.ts spawn (with the rf workspace locators)");
  });
  it("claude-host.ts builds the SDK Options with no env override, so the SDK CLI child inherits process.env carrying both locators", async () => {
    const { options, childEnv } = await withWorkspaceLocators(captureClaudeOptions);
    expect(options !== undefined, "the injected query observed the SDK Options").toBe(true);
    expect(Object.hasOwn(options ?? {}, "env"), "the SDK Options carry an env override").toBe(false);
    expect(childEnv, "locators the SDK CLI child receives (names only)").toEqual({ RF_WORKSPACE: true, SWARM_RF_WORKSPACE: true });
  });
  it("both seams answer equally: the detached child is handed exactly what the embedded child inherits, for each locator", async () => {
    const detached = locatorProjection((await withWorkspaceLocators(() => withCanaries(launchAndCaptureSpawn)))?.env);
    const embedded = (await withWorkspaceLocators(captureClaudeOptions)).childEnv;
    expect(detached, "detached seam vs embedded seam (names only)").toEqual(embedded);
    expect(LOCATOR_NAMES.every(name => detached[name]), "both seams carry both locators").toBe(true);
  });
});
