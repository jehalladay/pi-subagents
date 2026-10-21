/**
 * wb-cax.10: the native-modules loader is the one seam through which the
 * native SDKs enter the process. These tests pin its contract: nothing is
 * reachable synchronously before the load, the load happens once and is
 * shared, the namespace is frozen, and the provider registration order is
 * the one the identity capture has always digested.
 *
 * wb-973.4 (SCG-R4) acceptance row 2 extends the order case below:
 * registerNativeProviders(registry, scope, {reactivefiberWorkspaceRoot: C})
 * passes C only to the RF registration and still passes the scope to forge,
 * hyperunix and furnace. Each leg is read through its real native seam with
 * no module replaced: forge refuses a target inside C before any read, and the
 * hyperunix, furnace and rf stand-ins on a test-scoped PATH record the argv
 * the real SDKs spawn them with, which names the root each provider holds.
 */
import { chmodSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import {
  isWorkbenchNativeLoaded,
  loadWorkbenchNative,
  WORKBENCH_NATIVE_UNLOADED,
  workbenchNative,
} from "../src/workbench/native-modules.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const DISCOVER_GRANTS = [
  "discover:forge.gate.status",
  "discover:hyperunix.find",
  "discover:furnace.run.inspect",
  "discover:reactivefiber.render.preview",
];

describe("native-modules loader (wb-cax.10)", () => {
  it("refuses synchronous access by name before anything loaded", () => {
    expect(isWorkbenchNativeLoaded()).toBe(false);
    expect(() => workbenchNative()).toThrow(WORKBENCH_NATIVE_UNLOADED);
  });

  // First load of typescript plus four SDKs; under a full-suite run it can exceed the default budget.
  it("loads once, freezes the namespace and shares it with every caller", { timeout: 60_000 }, async () => {
    const [first, second] = await Promise.all([loadWorkbenchNative(), loadWorkbenchNative()]);
    expect(first).toBe(second);
    expect(Object.isFrozen(first)).toBe(true);
    expect(isWorkbenchNativeLoaded()).toBe(true);
    expect(workbenchNative()).toBe(first);
    expect(await loadWorkbenchNative()).toBe(first);
    expect(typeof first.Furnace).toBe("function");
    expect(typeof first.createClaudeWorkflowHost).toBe("function");
    expect(typeof first.createClaudeObserver).toBe("function");
    expect(typeof first.readClaudeTranscript).toBe("function");
    expect(typeof first.connectDetachedWorkflow).toBe("function");
    expect(typeof first.launchDetachedWorkflow).toBe("function");
  });

  it("registers the four native read capabilities in the identity-capture order", async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, process.cwd());
    const ids = registry.discover({ grants: DISCOVER_GRANTS }).map(descriptor => descriptor.id);
    expect(ids).toEqual(["forge.gate.status", "hyperunix.find", "furnace.run.inspect", "reactivefiber.render.preview"]);
  });
});

/** The verbs the HyperUnix SDK requires in the `hx --help --hxs` inventory before its first read. */
const HX_REQUIRED_VERBS = ["show", "find", "run", "query show", "query list"];
/**
 * The hx stand-in: answers the SDK's two runtime probes (a semantic version, then one HXS 1.0 command inventory) and
 * exits 2 on anything else, so the recorded `find` argv is the only reading this row takes from it.
 */
const HX_STAND_IN = [
  'if (process.argv[2] === "--version") { process.stdout.write("0.1.0\\n"); process.exit(0); }',
  `if (process.argv[2] === "--help") { process.stdout.write(${JSON.stringify(
    `${JSON.stringify({ hxs: "1.0", stream: "help", seq: 0, kind: "hx.command-inventory", body: { commands: HX_REQUIRED_VERBS.map(name => ({ name, implementation: "implemented" })) } })}\n`,
  )}); process.exit(0); }`,
  "process.exit(2);",
].join("\n");

describe("registerNativeProviders with a configured swarm RF root (wb-973.4, acceptance row 2)", () => {
  const savedPath = process.env.PATH;
  const savedHx = process.env.HYPERUNIX_HX;
  const scratches: string[] = [];
  afterEach(() => {
    if (savedPath === undefined) delete process.env.PATH;
    else process.env.PATH = savedPath;
    if (savedHx === undefined) delete process.env.HYPERUNIX_HX;
    else process.env.HYPERUNIX_HX = savedHx;
    removeScratch(...scratches.splice(0));
  });

  function scratch(prefix: string): string {
    const dir = makeScratch(prefix);
    scratches.push(dir);
    return dir;
  }

  /** The Pi scope and the configured RF root: two real sibling directories, so only the binding can tell them apart. */
  function roots(): { scope: string; rfRoot: string } {
    return { scope: realpathSync(scratch("native-modules-pi-scope-")), rfRoot: realpathSync(scratch("native-modules-rf-root-")) };
  }

  /** A stand-in executable first on PATH: it appends its argv as one JSON line to its log, then runs `body`. */
  function standIn(name: string, body: string): { path: string; log: string } {
    const folder = scratch(`native-modules-${name}-bin-`);
    const log = join(folder, "argv.jsonl");
    const path = join(folder, name);
    writeFileSync(path, `#!${process.execPath}\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\n${body}\n`);
    chmodSync(path, 0o700);
    process.env.PATH = `${folder}${delimiter}${process.env.PATH ?? ""}`;
    return { path, log };
  }

  function recorded(log: string): string[][] {
    if (!existsSync(log)) return [];
    return readFileSync(log, "utf8").trim().split("\n").map(line => JSON.parse(line) as string[]);
  }

  function flagValue(argv: readonly string[], flag: string): string | undefined {
    const at = argv.indexOf(flag);
    return at < 0 ? undefined : argv[at + 1];
  }

  async function registered(scope: string, rfRoot: string): Promise<CapabilityRegistry> {
    const registry = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(registry, scope, { reactivefiberWorkspaceRoot: rfRoot });
    return registry;
  }

  const using = (grant: string) => ({ grants: [grant], signal: new AbortController().signal });

  it("keeps the identity-capture order above when the RF root is configured", async () => {
    const { scope, rfRoot } = roots();
    const ids = (await registered(scope, rfRoot)).discover({ grants: DISCOVER_GRANTS }).map(descriptor => descriptor.id);
    expect(ids).toEqual(["forge.gate.status", "hyperunix.find", "furnace.run.inspect", "reactivefiber.render.preview"]);
  }, 60_000);

  it("forge keeps the scope: a target inside the configured RF root is refused 'authorization' before any read", async () => {
    const { scope, rfRoot } = roots();
    const forge = standIn("forge", "process.exit(1);");
    const registry = await registered(scope, rfRoot);
    await expect(registry.invoke("forge.gate.status", { target: rfRoot }, using("forge:inspect"))).rejects.toMatchObject({
      category: "authorization",
      message: "Forge read denied outside the authorized workspace scope.",
    });
    expect(recorded(forge.log)).toEqual([]);
  }, 60_000);

  it("hyperunix keeps the scope: the native find spawns hx with --workspace naming the scope, never the RF root", async () => {
    const { scope, rfRoot } = roots();
    const hx = standIn("hx", HX_STAND_IN);
    process.env.HYPERUNIX_HX = hx.path;
    const registry = await registered(scope, rfRoot);
    const outcome = await registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file" }, using("hyperunix:read")).then(
      () => "resolved",
      () => "refused",
    );
    const finds = recorded(hx.log).filter(argv => argv[0] === "find");
    expect(finds.map(argv => flagValue(argv, "--workspace")), outcome).toEqual([scope]);
    expect(JSON.stringify(recorded(hx.log))).not.toContain(rfRoot);
  }, 60_000);

  it("furnace keeps the scope: the native inspect runs furnace -C naming the scope, never the RF root", async () => {
    const { scope, rfRoot } = roots();
    const furnace = standIn("furnace", "process.exit(1);");
    const registry = await registered(scope, rfRoot);
    await expect(registry.invoke("furnace.run.inspect", { runId: "frn-fake-run-1" }, using("furnace:inspect"))).rejects.toMatchObject({
      category: "unavailable",
    });
    const runs = recorded(furnace.log);
    expect(runs.map(argv => flagValue(argv, "-C"))).toEqual([scope]);
    expect(JSON.stringify(runs)).not.toContain(rfRoot);
  }, 60_000);

  it("reactivefiber alone takes the configured root: rf runs with --workspace naming it, and its envelope validates", async () => {
    const { scope, rfRoot } = roots();
    const rf = standIn("rf", `process.stdout.write(${JSON.stringify(JSON.stringify(fullShapeRf(rfRoot)))});`);
    const registry = await registered(scope, rfRoot);
    const reading = (await registry.invoke("reactivefiber.render.preview", { model: "model", task: "task" }, using("reactivefiber:render"))) as {
      workspaceRoot: string;
    };
    expect(reading.workspaceRoot).toBe(rfRoot);
    expect(recorded(rf.log).map(argv => flagValue(argv, "--workspace"))).toEqual([rfRoot]);
  }, 60_000);
});
