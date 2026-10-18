/**
 * wb-973.5 (SWARM-CONTEXT-GRAPH-R5, negative): the RF workspace root that reactivefiber.render.preview renders against is
 * the directory the host bound when it registered the capability (registryFor's realpath of the project directory in
 * src/index.ts, through registerNativeProviders). Nothing a caller supplies moves it:
 *  - AC1, a capability input: the landed wb-973.1 oneOf input schema keeps additionalProperties:false on BOTH arms and
 *    declares no path-shaped property, so CapabilityRegistry.invoke refuses `workspace`, `workspaceRoot` or `root` at
 *    input validation before any rf process runs. A workflow script's node() call reaches the same registry.invoke
 *    through the host bridge (createClaudeWorkflowHost.callNode), so a script cannot name the root either.
 *  - AC2, a Claude tool argument: capability_invoke hands its `input` to the same validation through run()'s catch
 *    (claude-capability-tools.ts), which replies {kind:'rejected', category:'validation'}. A path-shaped TOP-LEVEL tool
 *    argument is stripped by the SDK's tool schema (the landed "does not accept SDK-stripped identity arguments as host
 *    authority" row pins the stripping); the row below pins that it never moves --workspace off the bound root.
 *  - AC3, an environment variable: RF_WORKSPACE and SWARM_RF_WORKSPACE in Pi's own process.env are the wb-973.6/973.7
 *    hosted-agent channel (DETACHED_HOST_ENV_ALLOWLIST; the embedded host's child inherits process.env). The spawned rf
 *    sees them, yet the argv is byte-identical to the unset run, and an rf that answered for the env's directory
 *    instead of the bound root is refused by the provider's workspace.root pin.
 * The stand-in rf is the envelope-audit pattern on tracked scratch: the ONLY PATH entry, an absolute-node shebang, that
 * records its argv and the two environment values it saw, and replies with the full-shape offline envelope
 * (test/helpers/rf-render-fixture.ts). Input-hygiene pins only: no security claim is made or tested here.
 */
import { chmodSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { DETACHED_HOST_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const RF_CAPABILITY = "reactivefiber.render.preview";
const VIEW = "swarm.worker";
const TASK_ID = "bead-fixture-000";
const MODEL = "model-fixture";
const TAIL = ["--no-commit", "--no-input", "--json"];
const ENV_NAMES = ["RF_WORKSPACE", "SWARM_RF_WORKSPACE"] as const;
type EnvName = (typeof ENV_NAMES)[number];
const SCRIPT_HEAD = 'export const meta = { name: "rf-workspace-root", description: "SCG-R5 workspace root fence" };\n';
/** A property name that could carry a directory: the shape a root-steering key would take. */
const PATH_SHAPED_KEY = /workspace|root|path|dir|cwd|folder|mount/i;

/** The three AC1 shapes: each admitted arm plus one path-shaped key. */
const PATH_SHAPED_INPUTS: ReadonlyArray<readonly [string, Readonly<Record<string, string>>]> = [
  ["{model,task,workspace}", { model: "model", task: "task", workspace: "/x" }],
  ["{view,taskId,workspaceRoot}", { view: VIEW, taskId: TASK_ID, workspaceRoot: "/x" }],
  ["{model,task,root}", { model: "model", task: "task", root: "/x" }],
];
/** The admitted shapes, the positive controls. */
const ADMITTED_INPUTS: ReadonlyArray<readonly [string, Readonly<Record<string, string>>]> = [
  ["{model,task}", { model: "model", task: "task" }],
  ["{view,taskId}", { view: VIEW, taskId: TASK_ID }],
  ["{view,taskId,model}", { view: VIEW, taskId: TASK_ID, model: MODEL }],
];

const scratch: string[] = [];
const cleanup: Array<() => Promise<void>> = [];
const originalPath = process.env.PATH;
const originalEnv: Readonly<Record<EnvName, string | undefined>> = { RF_WORKSPACE: process.env.RF_WORKSPACE, SWARM_RF_WORKSPACE: process.env.SWARM_RF_WORKSPACE };

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(async () => {
  for (const close of cleanup.splice(0)) await close();
  restoreEnv("PATH", originalPath);
  for (const name of ENV_NAMES) restoreEnv(name, originalEnv[name]);
  removeScratch(...scratch.splice(0));
});

/** A fresh tracked directory, as its real path (the form registryFor binds). */
function directory(prefix: string): string {
  const dir = makeScratch(prefix);
  scratch.push(dir);
  return realpathSync(dir);
}

interface StandIn {
  readonly argv: string;
  readonly env: string;
}

/** Installs the stand-in rf as the ONLY PATH entry: it records its argv and the two env values, then prints `reply`. */
function standIn(reply: unknown): StandIn {
  const dir = directory("rf-root-standin-");
  const binary = join(dir, "rf");
  const argv = join(dir, "argv.json");
  const env = join(dir, "env.json");
  writeFileSync(binary, [
    `#!${process.execPath}`,
    "const fs = require('node:fs');",
    `fs.writeFileSync(${JSON.stringify(argv)}, JSON.stringify(process.argv.slice(2)));`,
    `fs.writeFileSync(${JSON.stringify(env)}, JSON.stringify(Object.fromEntries(${JSON.stringify(ENV_NAMES)}.map(name => [name, process.env[name] ?? null]))));`,
    `process.stdout.write(${JSON.stringify(JSON.stringify(reply))});`,
    "",
  ].join("\n"));
  chmodSync(binary, 0o700);
  process.env.PATH = dir;
  return { argv, env };
}

/** The argv the stand-in recorded, or undefined when no rf process was spawned. */
function recordedArgv(record: StandIn): string[] | undefined {
  if (!existsSync(record.argv)) return undefined;
  const parsed: unknown = JSON.parse(readFileSync(record.argv, "utf8"));
  if (!Array.isArray(parsed)) throw new Error("stand-in rf recorded a non-array argv");
  const tokens: unknown[] = parsed;
  return tokens.map(token => {
    if (typeof token !== "string") throw new Error("stand-in rf recorded a non-string argv token");
    return token;
  });
}

/** The RF_WORKSPACE / SWARM_RF_WORKSPACE values the spawned stand-in saw (null when unset). */
function recordedEnv(record: StandIn): Record<string, unknown> {
  const parsed: unknown = JSON.parse(readFileSync(record.env, "utf8"));
  if (!isRecord(parsed)) throw new Error("stand-in rf recorded a non-object env");
  return parsed;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function boundRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}

const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });

/** The argv a render of `input` spawns against `root`. */
function expectedArgv(root: string, input: Readonly<Record<string, string>>): string[] {
  const select = "view" in input
    ? ["--view", input.view, "--task-id", input.taskId, ...(input.model === undefined ? [] : ["--model", input.model])]
    : ["--model", input.model, "--task", input.task];
  return ["--workspace", root, "context", "render", ...select, ...TAIL];
}

/** `input` with every "/x" value replaced by `path`. */
function naming(input: Readonly<Record<string, string>>, path: string): Record<string, string> {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value === "/x" ? path : value]));
}

describe("SCG-R5 AC1 (wb-973.5): no capability input names the RF workspace root", () => {
  it.each(PATH_SHAPED_INPUTS)("SCG-R5: CapabilityRegistry.invoke refuses the path-shaped input %s at input validation and never spawns rf", async (_shape, input) => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    await expect(boundRegistry(root).invoke(RF_CAPABILITY, input, invokeContext())).rejects.toMatchObject({
      name: "CapabilityError", category: "validation", message: `Invalid input schema for capability ${RF_CAPABILITY}.`,
    });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it.each(PATH_SHAPED_INPUTS)("SCG-R5: the path-shaped input %s is refused even when it names the bound root itself", async (_shape, input) => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    await expect(boundRegistry(root).invoke(RF_CAPABILITY, naming(input, root), invokeContext())).rejects.toMatchObject({ category: "validation" });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it.each(ADMITTED_INPUTS)("SCG-R5 control: the admitted shape %s renders against the bound root", async (_shape, input) => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    const result = await boundRegistry(root).invoke(RF_CAPABILITY, input, invokeContext());
    expect(recordedArgv(record)).toEqual(expectedArgv(root, input));
    expect(result).toMatchObject({ workspaceRoot: root });
  });

  it("SCG-R5: both input arms keep additionalProperties:false and declare no path-shaped property", () => {
    const [row] = boundRegistry(directory("rf-root-bound-")).catalogSnapshot();
    const schema = row?.descriptor.inputSchema;
    expect(Object.keys(schema ?? {})).toEqual(["type", "oneOf"]);
    const arms: unknown = schema?.oneOf;
    if (!Array.isArray(arms)) throw new Error("expected the wb-973.1 oneOf input schema");
    expect(arms).toHaveLength(2);
    const names: string[] = [];
    for (const arm of arms) {
      if (!isRecord(arm) || !isRecord(arm.properties)) throw new Error("expected an object input arm");
      expect(arm.additionalProperties).toBe(false);
      names.push(...Object.keys(arm.properties));
    }
    expect([...new Set(names)].sort()).toEqual(["model", "task", "taskId", "view"]);
    expect(names.filter(name => PATH_SHAPED_KEY.test(name))).toEqual([]);
  });

  it("SCG-R5: a workflow script's node() call with a path-shaped input key fails validation at the host bridge and never spawns rf", async () => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    const host = createClaudeWorkflowHost({ cwd: root, capabilities: boundRegistry(root), grants: ["reactivefiber:render"], principal: { id: "host-principal", role: "host-role" }, invocationId: "rf-root-invocation" });
    const result = await runWorkflow({ script: `${SCRIPT_HEAD}return await node(${JSON.stringify(RF_CAPABILITY)}, { model: "model", task: "task", workspace: "/x" });`, host });
    expect(result.status).not.toBe("completed");
    expect(result.capabilityError).toMatchObject({ category: "validation" });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it("SCG-R5 control: the same workflow script without the path key renders against the bound root", async () => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    const host = createClaudeWorkflowHost({ cwd: root, capabilities: boundRegistry(root), grants: ["reactivefiber:render"], principal: { id: "host-principal", role: "host-role" }, invocationId: "rf-root-invocation" });
    const result = await runWorkflow({ script: `${SCRIPT_HEAD}return await node(${JSON.stringify(RF_CAPABILITY)}, { model: "model", task: "task" });`, host });
    expect(result.status).toBe("completed");
    expect(recordedArgv(record)).toEqual(expectedArgv(root, { model: "model", task: "task" }));
  });
});

interface ToolReply {
  readonly isError: boolean;
  readonly payload: unknown;
}

/** The real curated MCP server (createCuratedTools) behind a real MCP client, exposing only the RF capability. */
async function curatedInvoke(root: string): Promise<(args: Record<string, unknown>) => Promise<ToolReply>> {
  const server = createCuratedTools({
    registry: boundRegistry(root), allowedCapabilities: [RF_CAPABILITY],
    grants: [`discover:${RF_CAPABILITY}`, `invoke:${RF_CAPABILITY}`, "reactivefiber:render"],
    principal: { id: "host-user", role: "reviewer" }, workspace: root, invocationId: "rf-root-agent-1", signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-root-test-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  cleanup.push(async () => { await client.close(); await server.instance.close(); });
  return async args => {
    const result = await client.callTool({ name: "capability_invoke", arguments: args });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isRecord(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) };
  };
}

describe("SCG-R5 AC2 (wb-973.5): no Claude tool argument names the RF workspace root", () => {
  it.each(PATH_SHAPED_INPUTS)("SCG-R5: capability_invoke with the path-shaped input %s replies kind 'rejected', category 'validation' and never spawns rf", async (_shape, input) => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    const invoke = await curatedInvoke(root);
    const reply = await invoke({ capabilityId: RF_CAPABILITY, capabilityVersion: "1.0.0", input });
    expect(reply.isError).toBe(true);
    expect(reply.payload).toEqual({ kind: "rejected", category: "validation", diagnostic: `Invalid input schema for capability ${RF_CAPABILITY}.` });
    expect(recordedArgv(record)).toBeUndefined();
  });

  it("SCG-R5 control: capability_invoke with the admitted {model,task} input returns the render against the bound root", async () => {
    const root = directory("rf-root-bound-");
    const record = standIn(fullShapeRf(root));
    const invoke = await curatedInvoke(root);
    const reply = await invoke({ capabilityId: RF_CAPABILITY, capabilityVersion: "1.0.0", input: { model: "model", task: "task" } });
    expect(reply.isError).toBe(false);
    expect(reply.payload).toMatchObject({ kind: "returned", value: { workspaceRoot: root } });
    expect(recordedArgv(record)).toEqual(expectedArgv(root, { model: "model", task: "task" }));
  });

  it("SCG-R5: path-shaped top-level tool arguments are stripped before dispatch and never move --workspace off the bound root", async () => {
    const root = directory("rf-root-bound-");
    const elsewhere = directory("rf-root-elsewhere-");
    const record = standIn(fullShapeRf(root));
    const invoke = await curatedInvoke(root);
    const reply = await invoke({ capabilityId: RF_CAPABILITY, capabilityVersion: "1.0.0", input: { model: "model", task: "task" }, workspace: elsewhere, workspaceRoot: elsewhere, root: elsewhere, cwd: elsewhere });
    expect(reply.payload).toMatchObject({ kind: "returned", value: { workspaceRoot: root } });
    const argv = recordedArgv(record);
    expect(argv).toEqual(expectedArgv(root, { model: "model", task: "task" }));
    expect(argv).not.toContain(elsewhere);
  });
});

/** Sets each env name to its own directory and returns the values set. */
function steerEnv(names: readonly EnvName[]): Record<EnvName, string | null> {
  const values: Record<EnvName, string | null> = { RF_WORKSPACE: null, SWARM_RF_WORKSPACE: null };
  for (const name of ENV_NAMES) delete process.env[name];
  for (const name of names) {
    const path = directory(`rf-root-env-${name.toLowerCase()}-`);
    process.env[name] = path;
    values[name] = path;
  }
  return values;
}

describe("SCG-R5 AC3 (wb-973.5): Pi's own RF_WORKSPACE / SWARM_RF_WORKSPACE never steer --workspace", () => {
  it("SCG-R5: the two names are the wb-973.6/973.7 hosted-agent channel on DETACHED_HOST_ENV_ALLOWLIST, composed rather than duplicated", () => {
    for (const name of ENV_NAMES) expect(DETACHED_HOST_ENV_ALLOWLIST).toContain(name);
  });

  it.each(ADMITTED_INPUTS)("SCG-R5: with both names set in Pi's process.env, %s spawns the byte-identical argv and --workspace stays the bound root", async (_shape, input) => {
    const root = directory("rf-root-bound-");
    steerEnv([]);
    const unset = standIn(fullShapeRf(root));
    await boundRegistry(root).invoke(RF_CAPABILITY, input, invokeContext());
    expect(recordedEnv(unset)).toEqual({ RF_WORKSPACE: null, SWARM_RF_WORKSPACE: null });
    const values = steerEnv(ENV_NAMES);
    const set = standIn(fullShapeRf(root));
    await boundRegistry(root).invoke(RF_CAPABILITY, input, invokeContext());
    // Non-vacuous: the spawned rf saw both names; Pi's argv still names only the bound root.
    expect(recordedEnv(set)).toEqual(values);
    const steered = recordedArgv(set);
    expect(JSON.stringify(steered)).toBe(JSON.stringify(recordedArgv(unset)));
    expect(steered?.slice(0, 2)).toEqual(["--workspace", root]);
    expect(steered).toEqual(expectedArgv(root, input));
  });

  it.each(ENV_NAMES.flatMap(name => ADMITTED_INPUTS.slice(0, 2).map(([shape, input]) => [name, shape, input] as const)))("SCG-R5: %s set alone never changes the %s argv", async (name, _shape, input) => {
    const root = directory("rf-root-bound-");
    const values = steerEnv([name]);
    const record = standIn(fullShapeRf(root));
    await boundRegistry(root).invoke(RF_CAPABILITY, input, invokeContext());
    expect(recordedEnv(record)).toEqual(values);
    expect(recordedArgv(record)).toEqual(expectedArgv(root, input));
  });

  it("SCG-R5: an rf that answered for the env's directory instead of the bound root is refused 'transport' by the workspace.root pin", async () => {
    const root = directory("rf-root-bound-");
    const values = steerEnv(ENV_NAMES);
    const elsewhere = values.SWARM_RF_WORKSPACE ?? "";
    expect(elsewhere).not.toBe(root);
    standIn(fullShapeRf(elsewhere));
    await expect(boundRegistry(root).invoke(RF_CAPABILITY, { model: "model", task: "task" }, invokeContext())).rejects.toMatchObject({
      category: "transport", message: "RF preview returned an unrecognized or contradictory envelope.",
    });
  });
});
