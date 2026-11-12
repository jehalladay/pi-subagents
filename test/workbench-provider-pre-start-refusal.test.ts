/**
 * EAT-R389 (wb-k13m, DX P12; docs/workbench/programs/pi-system-dx-triage-2026-11-11 at 0a5ac3a3,
 * requirements/.work/req-r-platform.md): "Provider UX repairs MUST retain host-bound authority confinement before any
 * unauthorized provider process is started." A NEGATIVE_REGRESSION row: each case pins behaviour present at its base, so
 * each is green there by design.
 *
 * What each case builds: a fresh CapabilityRegistry with the four native read providers registered on it through
 * registerNativeProviders, the composition src/index.ts registryFor uses, over a fresh scratch root. Four stand-in
 * executables take the place of the producers the providers launch: forge, furnace and rf first on PATH, and hx through
 * HYPERUNIX_HX, which the HyperUnix SDK reads before PATH. Each stand-in is a script whose interpreter is the running
 * Node executable, resolved through /proc/self/exe where that exists, else process.execPath. Each appends one JSON line
 * per start to one shared log (its name, its argv and the names in its environment, never a value) and exits; the rf
 * stand-in first prints a valid preview envelope for the root.
 *
 * What each case reads: the start log, only once process.getActiveResourcesInfo() lists no ProcessWrap (every child the
 * test worker launched has exited by then, and a stand-in writes its log line before it exits), and
 * registry.admission(); a case also reads the refusal or reply its title names, and the discovery case also reads
 * discover() and catalogSnapshot().
 *
 * NOT CLAIMED: refusal of a changed source digest (workflow_execute admission) is NOT CLAIMED by this suite. Skill-name
 * traversal refusal (the agent skill loader) is NOT CLAIMED by this suite. HX root containment is NOT CLAIMED by this
 * suite. The environment the forge, hx and furnace children receive is NOT CLAIMED by this suite. A successful native
 * forge, hx or furnace read is NOT CLAIMED by this suite: their stand-ins exit without speaking a protocol, so only their
 * starts are read. A one-start reading for hyperunix.find or furnace.run.inspect is NOT CLAIMED by this suite.
 * Descendant-process cleanup (a grandchild holding the rf stdout pipe) is NOT CLAIMED by this suite; the rf cases read
 * the direct child only. The rf view-arm render ({view, taskId}) is NOT CLAIMED by this suite. The registered-tool path
 * (workflow_execute calling node() through the worker RPC) and the host's per-call re-read of grants from settings are
 * NOT CLAIMED by this suite; every grant here is handed to the registry directly. Native producer acceptance (tier V6) is
 * NOT CLAIMED by this suite.
 */
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, isAbsolute, join, relative } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  CAPABILITY_MAX_IN_FLIGHT,
  type CapabilityAdmission,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { RF_CHILD_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** The first native load imports typescript and four SDKs, and each stand-in start is a Node process. */
const TIMEOUT = 120_000;

const FORGE = "forge.gate.status";
const HX = "hyperunix.find";
const FURNACE = "furnace.run.inspect";
const RF = "reactivefiber.render.preview";
/** The four capability ids registerNativeProviders adds, in its registration order. */
const IDS = [FORGE, HX, FURNACE, RF] as const;
type Id = (typeof IDS)[number];
/** The one invocation permission each native descriptor declares. */
const PERMISSION: Readonly<Record<Id, string>> = {
  [FORGE]: "forge:inspect",
  [HX]: "hyperunix:read",
  [FURNACE]: "furnace:inspect",
  [RF]: "reactivefiber:render",
};
const ALL_PERMISSIONS = IDS.map(id => PERMISSION[id]);
const FORGE_SCOPE_REFUSAL = "Forge read denied outside the authorized workspace scope.";
const RF_INPUT = { model: "model", task: "task" };

type Producer = "forge" | "hx" | "furnace" | "rf";
/** One stand-in start as its log line records it: names only, never an environment value. */
interface Start {
  readonly name: Producer;
  readonly argv: readonly string[];
  readonly envNames: readonly string[];
}

/** A name outside every allowlist of record, planted in the parent environment by the rf environment case. */
const PLANTED_MARKER = "PI_R389_PLANTED_AMBIENT_MARKER";

const IDLE: CapabilityAdmission = {
  maxInFlight: CAPABILITY_MAX_IN_FLIGHT,
  inFlight: 0,
  peakInFlight: 0,
  admitted: 0,
  refused: 0,
  cancelledWhileQueued: 0,
};
/** Registry admission after `admitted` sequential calls, each settled before the next began. */
function settledAfter(admitted: number): CapabilityAdmission {
  return { ...IDLE, peakInFlight: admitted > 0 ? 1 : 0, admitted };
}

const savedEnv = new Map<string, string | undefined>();
const scratches: string[] = [];
afterEach(() => {
  for (const [name, value] of savedEnv) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  savedEnv.clear();
  removeScratch(...scratches.splice(0));
});

function setEnv(name: string, value: string): void {
  if (!savedEnv.has(name)) savedEnv.set(name, process.env[name]);
  process.env[name] = value;
}

const using = (...grants: string[]): InvocationContext => ({ grants, signal: new AbortController().signal });

/** Live child processes of this worker: a spawned child is listed from its spawn until its handle closes. */
const liveChildren = (): number => process.getActiveResourcesInfo().filter(resource => resource === "ProcessWrap").length;
const SETTLE_BOUND_MS = 60_000;
/** Resolves once no child process of this worker is live; a child that outlives the bound reds the case. */
async function childrenSettled(): Promise<void> {
  const deadline = Date.now() + SETTLE_BOUND_MS;
  while (liveChildren() > 0) {
    if (Date.now() > deadline) throw new Error(`a child process of the test worker was still live after ${SETTLE_BOUND_MS} ms`);
    await new Promise(resolve => setTimeout(resolve, 25));
  }
}

interface Fixture {
  /** The authorized workspace root the four providers are registered over. */
  readonly root: string;
  /** A real directory beside the root, outside it. */
  readonly outside: string;
  readonly registry: CapabilityRegistry;
  /** A schema-valid input for each capability, naming the root where a root is named. */
  readonly input: Readonly<Record<Id, JsonValue>>;
  /** The stand-in start log, read once every child process of this worker has settled. */
  starts(): Promise<Start[]>;
}

/**
 * The interpreter of the stand-in scripts: the running executable, resolved through /proc/self/exe where it exists.
 * process.execPath can name a version manager's shell shim that exports names of its own before it execs the real
 * binary; as the stand-ins' interpreter it would put those names in their recorded environment (measured on this host:
 * the mise node shim added LD_LIBRARY_PATH, PWD and SHLVL).
 */
function standInInterpreter(): string {
  try {
    return realpathSync("/proc/self/exe");
  } catch {
    return process.execPath;
  }
}

async function fixture(): Promise<Fixture> {
  await childrenSettled();
  const base = realpathSync(makeScratch("provider-pre-start-"));
  scratches.push(base);
  const root = join(base, "root");
  const outside = join(base, "outside");
  const bin = join(base, "bin");
  for (const dir of [root, outside, bin]) mkdirSync(dir);
  const log = join(base, "starts.jsonl");
  const interpreter = standInInterpreter();
  const standIn = (name: Producer, body: string): string => {
    const path = join(bin, name);
    const record = `JSON.stringify({ name: ${JSON.stringify(name)}, argv: process.argv.slice(2), envNames: Object.keys(process.env).sort() })`;
    writeFileSync(path, `#!${interpreter}\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, ${record} + "\\n");\n${body}\n`);
    chmodSync(path, 0o700);
    return path;
  };
  standIn("forge", "process.exit(1);");
  standIn("furnace", "process.exit(1);");
  standIn("rf", `process.stdout.write(${JSON.stringify(JSON.stringify(fullShapeRf(root)))});`);
  setEnv("HYPERUNIX_HX", standIn("hx", "process.exit(2);"));
  setEnv("PATH", `${bin}${delimiter}${process.env.PATH ?? ""}`);
  const registry = new CapabilityRegistry();
  (await loadWorkbenchNative()).registerNativeProviders(registry, root);
  return {
    root,
    outside,
    registry,
    input: { [FORGE]: { target: root }, [HX]: { kind: "hx.fs/regular-file" }, [FURNACE]: { runId: "frn-fake-run-1" }, [RF]: RF_INPUT },
    starts: async () => {
      await childrenSettled();
      return existsSync(log) ? readFileSync(log, "utf8").trim().split("\n").map(line => JSON.parse(line) as Start) : [];
    },
  };
}

const startedNames = (starts: readonly Start[]): Producer[] => starts.map(start => start.name);

describe("EAT-R389 criterion 1, missing or revoked grant: an invoke the registry refuses for its grant starts no producer process", () => {
  it("R389-G1: with no grant, invoking each of the four native capabilities is refused 'authorization'; no stand-in starts and admission stays idle", async () => {
    const { registry, input, starts } = await fixture();
    for (const id of IDS) {
      await expect(registry.invoke(id, input[id], using())).rejects.toMatchObject({
        name: "CapabilityError",
        category: "authorization",
        message: `Permission denied for capability ${id} (invoke).`,
      });
    }
    expect(await starts()).toEqual([]);
    expect(registry.admission()).toEqual(IDLE);
  }, TIMEOUT);

  it("R389-G2: holding invoke:<id> in place of the declared permission, invoking each of the four is refused 'authorization'; no stand-in starts and admission stays idle", async () => {
    const { registry, input, starts } = await fixture();
    const ctx = using(...IDS.map(id => `invoke:${id}`));
    for (const id of IDS) {
      await expect(registry.invoke(id, input[id], ctx)).rejects.toMatchObject({
        category: "authorization",
        message: `Permission denied for capability ${id} (invoke).`,
      });
    }
    expect(await starts()).toEqual([]);
    expect(registry.admission()).toEqual(IDLE);
  }, TIMEOUT);

  it("R389-G3: reactivefiber:render held for one call and dropped for the next (revoked): the first call starts rf once and resolves, the second is refused 'authorization' and starts nothing", async () => {
    const { root, registry, starts } = await fixture();
    const reading = (await registry.invoke(RF, RF_INPUT, using(PERMISSION[RF]))) as { workspaceRoot: string };
    expect(reading.workspaceRoot).toBe(root);
    await expect(registry.invoke(RF, RF_INPUT, using())).rejects.toMatchObject({
      category: "authorization",
      message: `Permission denied for capability ${RF} (invoke).`,
    });
    expect(startedNames(await starts())).toEqual(["rf"]);
    expect(registry.admission()).toEqual(settledAfter(1));
  }, TIMEOUT);
});

describe("EAT-R389 audited basis C243, schema half: an input the registry refuses at validation starts no producer process", () => {
  it("R389-V1: with all four permissions held, a forge input missing, emptying or adding a field, an empty hx kind, a furnace runId over 128 characters and an rf input mixing both arms or lacking taskId are each refused 'validation'; no stand-in starts and admission stays idle", async () => {
    const { root, registry, starts } = await fixture();
    const ctx = using(...ALL_PERMISSIONS);
    const refusedAtValidation = async (id: Id, input: JsonValue): Promise<void> => {
      await expect(registry.invoke(id, input, ctx)).rejects.toMatchObject({
        category: "validation",
        message: `Invalid input schema for capability ${id}.`,
      });
    };
    await refusedAtValidation(FORGE, {});
    await refusedAtValidation(FORGE, { target: "" });
    await refusedAtValidation(FORGE, { target: root, extra: true });
    await refusedAtValidation(HX, { kind: "" });
    await refusedAtValidation(FURNACE, { runId: "r".repeat(129) });
    await refusedAtValidation(RF, { model: "model", task: "task", view: "view", taskId: "task-1" });
    await refusedAtValidation(RF, { view: "view" });
    expect(await starts()).toEqual([]);
    expect(registry.admission()).toEqual(IDLE);
  }, TIMEOUT);
});

describe("EAT-R389 criterion 1, outside root and symlink escape: forge.gate.status refuses a relative, beside-the-root, prefix-sibling, symlink-escaping or unresolvable target before a forge process starts", () => {
  /** Each refusal below is decided by the provider's own scope check, under one admission, before its forge launch. */
  async function refusedOutsideScope(fx: Fixture, target: string): Promise<void> {
    await expect(fx.registry.invoke(FORGE, { target }, using(PERMISSION[FORGE]))).rejects.toMatchObject({
      category: "authorization",
      message: FORGE_SCOPE_REFUSAL,
    });
    expect(await fx.starts()).toEqual([]);
    expect(fx.registry.admission()).toEqual(settledAfter(1));
  }

  it("R389-S1: a relative target that resolves to the root itself is refused 'authorization'; no forge process starts", async () => {
    const fx = await fixture();
    const target = relative(process.cwd(), fx.root);
    expect(isAbsolute(target)).toBe(false);
    expect(realpathSync(target)).toBe(fx.root);
    await refusedOutsideScope(fx, target);
  }, TIMEOUT);

  it("R389-S2: an absolute target in a real directory beside the root is refused 'authorization'; no forge process starts", async () => {
    const fx = await fixture();
    await refusedOutsideScope(fx, fx.outside);
  }, TIMEOUT);

  it("R389-S3: an absolute target whose path extends the root's own string with no separator (<root>-sibling) is refused 'authorization'; no forge process starts", async () => {
    const fx = await fixture();
    const sibling = `${fx.root}-sibling`;
    mkdirSync(sibling);
    await refusedOutsideScope(fx, sibling);
  }, TIMEOUT);

  it("R389-S4: a symlink inside the root that resolves to the directory beside it is refused 'authorization'; no forge process starts", async () => {
    const fx = await fixture();
    const link = join(fx.root, "escape");
    symlinkSync(fx.outside, link);
    expect(realpathSync(link)).toBe(fx.outside);
    await refusedOutsideScope(fx, link);
  }, TIMEOUT);

  it("R389-S5: a target inside the root that does not resolve (no such path) is refused 'authorization'; no forge process starts", async () => {
    const fx = await fixture();
    const missing = join(fx.root, "missing");
    expect(existsSync(missing)).toBe(false);
    await refusedOutsideScope(fx, missing);
  }, TIMEOUT);
});

describe("EAT-R389 criterion 2: discover and inspect grants and catalog reads are no invoke right, and an authorized in-root forge.gate.status or reactivefiber.render.preview call starts one producer process", () => {
  it("R389-D1: under discover:<id> for all four, discover() lists them and catalogSnapshot() carries descriptors and inspectImplemented only; invoke and inspect are each refused 'authorization'; no stand-in starts and admission stays idle", async () => {
    const { registry, input, starts } = await fixture();
    const ctx = using(...IDS.map(id => `discover:${id}`));
    expect(registry.discover(ctx).map(descriptor => descriptor.id)).toEqual([...IDS]);
    const snapshot = registry.catalogSnapshot();
    expect(snapshot.map(entry => Object.keys(entry).sort())).toEqual(IDS.map(() => ["descriptor", "inspectImplemented"]));
    expect(snapshot.map(entry => entry.inspectImplemented)).toEqual(IDS.map(() => false));
    expect(snapshot.flatMap(entry => Object.values(entry.descriptor)).filter(value => typeof value === "function")).toEqual([]);
    for (const id of IDS) {
      await expect(registry.invoke(id, input[id], ctx)).rejects.toMatchObject({
        category: "authorization",
        message: `Permission denied for capability ${id} (invoke).`,
      });
      await expect(registry.inspect(id, { ref: "native-1" }, ctx)).rejects.toMatchObject({
        category: "authorization",
        message: `Permission denied for capability ${id} (inspect).`,
      });
    }
    expect(await starts()).toEqual([]);
    expect(registry.admission()).toEqual(IDLE);
  }, TIMEOUT);

  it("R389-D2: under inspect:<id> for all four, invoke is refused 'authorization' and inspect 'unavailable' (none of the four supports inspect); no stand-in starts and admission stays idle", async () => {
    const { registry, input, starts } = await fixture();
    const ctx = using(...IDS.map(id => `inspect:${id}`));
    for (const id of IDS) {
      await expect(registry.invoke(id, input[id], ctx)).rejects.toMatchObject({
        category: "authorization",
        message: `Permission denied for capability ${id} (invoke).`,
      });
      await expect(registry.inspect(id, { ref: "native-1" }, ctx)).rejects.toMatchObject({
        category: "unavailable",
        message: `Capability ${id} does not support inspect.`,
      });
    }
    expect(await starts()).toEqual([]);
    expect(registry.admission()).toEqual(IDLE);
  }, TIMEOUT);

  it("R389-P1: under forge:inspect, a target at the root and one at a directory inside it each start one forge app-server --stdio process", async () => {
    const { root, registry, starts } = await fixture();
    const inside = join(root, "pkg");
    mkdirSync(inside);
    await expect(registry.invoke(FORGE, { target: root }, using(PERMISSION[FORGE]))).rejects.toMatchObject({ name: "CapabilityError" });
    await expect(registry.invoke(FORGE, { target: inside }, using(PERMISSION[FORGE]))).rejects.toMatchObject({ name: "CapabilityError" });
    expect((await starts()).map(({ name, argv }) => ({ name, argv }))).toEqual([
      { name: "forge", argv: ["app-server", "--stdio"] },
      { name: "forge", argv: ["app-server", "--stdio"] },
    ]);
    expect(registry.admission()).toEqual(settledAfter(2));
  }, TIMEOUT);

  it("R389-P2: under reactivefiber:render, one {model, task} render starts one rf process with the noncommitted render argv and resolves with the root", async () => {
    const { root, registry, starts } = await fixture();
    const reading = (await registry.invoke(RF, RF_INPUT, using(PERMISSION[RF]))) as { workspaceRoot: string };
    expect(reading.workspaceRoot).toBe(root);
    expect((await starts()).map(({ name, argv }) => ({ name, argv }))).toEqual([
      {
        name: "rf",
        argv: ["--workspace", root, "context", "render", "--model", "model", "--task", "task", "--no-commit", "--no-input", "--json"],
      },
    ]);
    expect(registry.admission()).toEqual(settledAfter(1));
  }, TIMEOUT);
});

describe("EAT-R389 criterion 3: the rf child process of a {model, task} render receives only RF_CHILD_ENV_ALLOWLIST names", () => {
  it("R389-E1: with a planted marker, RF_PERF_BASELINE=all and XDG_STATE_HOME set in the parent, the rf child records PATH and no name outside RF_CHILD_ENV_ALLOWLIST, none of the three among them", async () => {
    const { root, registry, starts } = await fixture();
    const planted = [PLANTED_MARKER, "RF_PERF_BASELINE", "XDG_STATE_HOME"];
    setEnv(PLANTED_MARKER, "planted-marker-value");
    setEnv("RF_PERF_BASELINE", "all");
    setEnv("XDG_STATE_HOME", join(root, ".state"));
    expect(planted.filter(name => typeof process.env[name] === "string")).toEqual(planted);
    await registry.invoke(RF, RF_INPUT, using(PERMISSION[RF]));
    const children = await starts();
    expect(startedNames(children)).toEqual(["rf"]);
    const [child] = children;
    expect(child.envNames).toContain("PATH");
    expect(child.envNames.filter(name => !RF_CHILD_ENV_ALLOWLIST.includes(name))).toEqual([]);
    expect(child.envNames.filter(name => planted.includes(name))).toEqual([]);
    expect(registry.admission()).toEqual(settledAfter(1));
  }, TIMEOUT);
});
