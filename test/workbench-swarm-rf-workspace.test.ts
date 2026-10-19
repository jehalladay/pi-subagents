/**
 * wb-973.4 (SCG-R4): a validated workbench setting, reactivefiberWorkspaceRoot (an absolute path), names the swarm's RF workspace.
 * When present it, and only it, replaces the realpath Pi project root as the `--workspace` argument and the workspace.root pin of
 * the RF capability under the unchanged reactivefiber:render grant; when absent, today's behaviour is byte-identical.
 *
 * Rows quote the bead's acceptance list:
 *  S: loadSettings accepts workbench.reactivefiberWorkspaceRoot '/srv/swarm/rf' and refuses 'relative/path', '', 42 and values
 *     containing a newline or a NUL, each error naming the key.
 *  N: registerNativeProviders(registry, scope, {reactivefiberWorkspaceRoot: C}) keeps the registration order and passes C to
 *     the RF registration; the two-argument call is the default-path regression pin.
 *  P: with a configured root C different from the Pi scope, a stub envelope whose workspace.root is C validates and the recorded
 *     --workspace value is C; an envelope naming the Pi scope or any third path is refused 'transport'. The pin moves, it does not widen.
 *  O: reactivefiberTopology accepts a reading whose workspaceRoot is C only when the host context names C as the authorized RF root
 *     (scope.workspace stays the Pi realpath); any other root stays category 'authorization'; the configured path text never
 *     appears in a surfaced string.
 *  X: a configured root the installed rf refuses (exit 3, RF_WORKSPACE_INVALID) is CapabilityError('unavailable', ...), never
 *     'transport', never a retry, and the configured path text never appears in the surfaced message.
 *
 * Nothing here needs a real rf, a TTY or the network: the rf binary is a stub script on PATH. The credential-free paths are
 * obviously fake directories.
 */
import { chmodSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadSettings } from "../src/settings.js";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { hermeticDir } from "./helpers/boot-extension.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const SWARM_ROOT = "/srv/swarm-fake-rf-root";
const PI_SCOPE = "/srv/pi-fake-project-root";
const THIRD_ROOT = "/srv/third-fake-root";
const KEY = "reactivefiberWorkspaceRoot";
const GRANTS = ["reactivefiber:render", "discover:forge.gate.status", "discover:hyperunix.find", "discover:furnace.run.inspect", "discover:reactivefiber.render.preview"];
const NUL = String.fromCodePoint(0);

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

function settingsWith(value: unknown): Record<string, unknown> {
  return { workbench: { workflowAgentBackend: "claude", [KEY]: value } };
}

/** A stub `rf`: appends one JSON argv line per spawn to the log, prints the envelope and exits with the code. */
function fakeRf(envelope: unknown, code: number): string {
  const folder = makeScratch("swarm-rf-workspace-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(${code});\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}

function spawns(log: string): string[][] {
  return readFileSync(log, "utf8")
    .trim()
    .split("\n")
    .map(line => JSON.parse(line) as string[]);
}

function workspaceArg(argv: readonly string[]): string | undefined {
  const at = argv.indexOf("--workspace");
  return at < 0 ? undefined : argv[at + 1];
}

const RENDER_INPUT = { model: "model", task: "task" };
const context = { grants: GRANTS, signal: new AbortController().signal };

describe("wb-973.4 reactivefiberWorkspaceRoot setting (S)", () => {
  it("S1: accepts an absolute path and retains it beside the Claude executor selection", () => {
    sandbox = hermeticDir({ settings: settingsWith("/srv/swarm/rf") });
    expect(loadSettings(sandbox.dir).workbench).toMatchObject({ [KEY]: "/srv/swarm/rf" });
  });
  it("S2: a workbench block without the key does not manufacture one", () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude" } } });
    expect(loadSettings(sandbox.dir).workbench).not.toHaveProperty(KEY);
  });
  it.each([
    ["relative path", "relative/path"],
    ["empty string", ""],
    ["number", 42],
    ["null", null],
    ["array", ["/srv/swarm/rf"]],
    ["newline inside an absolute path", "/srv/swarm\n/rf"],
    ["trailing newline", "/srv/swarm/rf\n"],
    ["NUL inside an absolute path", `/srv/swarm${NUL}/rf`],
  ])("S3: refuses %s, and the error names the key", (_label, value) => {
    sandbox = hermeticDir({ settings: settingsWith(value) });
    const dir = sandbox.dir;
    expect(() => loadSettings(dir)).toThrow(/workbench\.reactivefiberWorkspaceRoot must be an absolute path/);
  });
});

describe("wb-973.4 native registration and the provider pin (N, P, X)", () => {
  it("N1: the three-argument call keeps the identity-capture registration order", async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE, { reactivefiberWorkspaceRoot: SWARM_ROOT });
    const ids = registry.discover({ grants: GRANTS }).map(descriptor => descriptor.id);
    expect(ids).toEqual(["forge.gate.status", "hyperunix.find", "furnace.run.inspect", "reactivefiber.render.preview"]);
  }, 60_000);

  it("N2/P1: with C different from the Pi scope the recorded --workspace is C and an envelope naming C validates", async () => {
    const native = await loadWorkbenchNative();
    const log = fakeRf(fullShapeRf(SWARM_ROOT), 0);
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE, { reactivefiberWorkspaceRoot: SWARM_ROOT });
    const reading = (await registry.invoke("reactivefiber.render.preview", RENDER_INPUT, context)) as { workspaceRoot: string };
    expect(reading.workspaceRoot).toBe(SWARM_ROOT);
    expect(spawns(log).map(workspaceArg)).toEqual([SWARM_ROOT]);
  }, 60_000);

  it.each([
    ["the Pi scope", PI_SCOPE],
    ["a third path", THIRD_ROOT],
  ])("P2: with C configured, an envelope naming %s is refused 'transport' (the pin moves, it does not widen)", async (_label, named) => {
    const native = await loadWorkbenchNative();
    fakeRf(fullShapeRf(named), 0);
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE, { reactivefiberWorkspaceRoot: SWARM_ROOT });
    await expect(registry.invoke("reactivefiber.render.preview", RENDER_INPUT, context)).rejects.toMatchObject({
      category: "transport",
      message: "RF preview returned an unrecognized or contradictory envelope.",
    });
  }, 60_000);

  it("N3 (default-path pin): the two-argument call passes the Pi scope as --workspace, as it always has", async () => {
    const native = await loadWorkbenchNative();
    const log = fakeRf(fullShapeRf(PI_SCOPE), 0);
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE);
    await registry.invoke("reactivefiber.render.preview", RENDER_INPUT, context);
    expect(spawns(log).map(workspaceArg)).toEqual([PI_SCOPE]);
  }, 60_000);

  it("N4: an options object that omits the key is the default path, not a removal of the scope", async () => {
    const native = await loadWorkbenchNative();
    const log = fakeRf(fullShapeRf(PI_SCOPE), 0);
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE, {});
    await registry.invoke("reactivefiber.render.preview", RENDER_INPUT, context);
    expect(spawns(log).map(workspaceArg)).toEqual([PI_SCOPE]);
  }, 60_000);

  it("X1: RF_WORKSPACE_INVALID on the served leaf is 'unavailable', one spawn, and never names the configured path", async () => {
    const native = await loadWorkbenchNative();
    const refusal = {
      schema: "reactive-fiber.cli/v1",
      ok: false,
      command: "context.render",
      operation_id: `rfo_${"a".repeat(22)}`,
      workspace: null,
      transaction_id: null,
      result: null,
      diagnostics: [{ code: "RF_WORKSPACE_INVALID", severity: "error", message: "workspace invalid", hint: null, source: "host", metadata: {} }],
    };
    const log = fakeRf(refusal, 3);
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, PI_SCOPE, { reactivefiberWorkspaceRoot: SWARM_ROOT });
    const error = await registry.invoke("reactivefiber.render.preview", RENDER_INPUT, context).then(
      () => undefined,
      (caught: unknown) => caught,
    );
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({ category: "unavailable", message: "RF render refused: RF_WORKSPACE_INVALID" });
    expect(String((error as Error).message)).not.toContain(SWARM_ROOT);
    expect(spawns(log)).toHaveLength(1);
  }, 60_000);
});

describe("wb-973.4 observer authorization of the configured root (O)", () => {
  const hostContext: ReactiveFiberTopologyContext = {
    scope: { workspace: PI_SCOPE, principal: "local-operator:tester" },
    seam: "rf-cli",
    capturedAt: "2026-10-19T10:00:00Z",
    observedAt: "2026-10-19T10:00:01Z",
  };
  const readingFor = (root: string): JsonValue => ({
    contract: "reactivefiber.render.preview/v1",
    workspaceRoot: root,
    source: fullShapeRf(root),
  });

  it("O1: a reading of C is accepted when the host context names C as the authorized RF root, and C never surfaces", () => {
    const topology = reactivefiberTopology(readingFor(SWARM_ROOT), { ...hostContext, authorizedRfRoot: SWARM_ROOT });
    expect(topology.snapshots).toHaveLength(1);
    expect(JSON.stringify(topology)).not.toContain(SWARM_ROOT);
    expect(JSON.stringify(topology)).toContain("rf-workspace:rfw_");
  });
  it("O2: the same reading without the context field stays an authorization refusal", () => {
    expect(() => reactivefiberTopology(readingFor(SWARM_ROOT), hostContext)).toThrow(
      expect.objectContaining({ category: "authorization" }),
    );
  });
  it("O3: a third path stays an authorization refusal even when C is authorized", () => {
    expect(() => reactivefiberTopology(readingFor(THIRD_ROOT), { ...hostContext, authorizedRfRoot: SWARM_ROOT })).toThrow(
      expect.objectContaining({ category: "authorization" }),
    );
  });
  it("O4: the Pi scope itself is a refusal once the authorized root replaces it (only it)", () => {
    expect(() => reactivefiberTopology(readingFor(PI_SCOPE), { ...hostContext, authorizedRfRoot: SWARM_ROOT })).toThrow(
      expect.objectContaining({ category: "authorization" }),
    );
  });
  it("O5: the refusal text never carries either path", () => {
    let message = "";
    try {
      reactivefiberTopology(readingFor(THIRD_ROOT), { ...hostContext, authorizedRfRoot: SWARM_ROOT });
    } catch (error) {
      message = String((error as Error).message);
    }
    expect(message.length).toBeGreaterThan(0);
    for (const path of [SWARM_ROOT, THIRD_ROOT, PI_SCOPE]) expect(message).not.toContain(path);
  });
  it("O6: the default path is unchanged: a reading of the Pi scope is accepted with no authorized root", () => {
    expect(reactivefiberTopology(readingFor(PI_SCOPE), hostContext).snapshots).toHaveLength(1);
  });
  it("O7: an authorized root that is not a bounded displayable identity is refused as validation", () => {
    for (const bad of ["", "x".repeat(5000)]) {
      expect(() => reactivefiberTopology(readingFor(SWARM_ROOT), { ...hostContext, authorizedRfRoot: bad })).toThrow(
        expect.objectContaining({ category: "validation" }),
      );
    }
  });
});
