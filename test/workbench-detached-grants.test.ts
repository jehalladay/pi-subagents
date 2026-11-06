/**
 * wb-wupg (MWI B-detached-grants, slice PI-6, closure gate PI-DETACHED-GRANTS): both registered detached Claude grant
 * producers in src/index.ts - the workflow_execute detached launcher and the workflow_detached tool - hand the REAL
 * local-detached preflight (validateRequest, src/workbench/hosts/local-detached.ts) host-validated bounded grants.
 *
 * Requirements, from docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at master 0b25e14e, each pinned by the describe block named after it:
 *   EAT-R012 "Invoke actual registered workflow_execute with detached mode under Claude settings, reviewed source and
 *     authorized execute/detach/invoke/exact role tool rights; pass real detached preflight. Remove each right in turn
 *     and assert zero child launches." Mutant: "Restore grants:[] at index.ts detached workflow_execute producer."
 *   EAT-R013 "Invoke actual workflow_detached with backend claude and authorized exact SDK tool grants; real preflight
 *     accepts; absent invoke or role tool grant refuses. Deterministic default remains a separate control."
 *     Mutant: "Restore grants:[] at the second producer, leaving the first repaired."
 *   EAT-R014 "Drive registered tools with forged grants in JSON policy and missing host invoke or tool rights; assert
 *     unchanged validator denial before launch." Mutant: "Remove the local-detached claude:invoke check."
 *
 * The operator authorizes each right in workbench.capabilityGrants: workbench:execute, workbench:detach, claude:invoke
 * and one claude:tool:<name> per distinct tool name the settings tools or a role's tools name (the exact spelling the
 * preflight checks; the grant form itself is pinned by test/workbench-claude-tool-grants.test.ts). workbench:observe,
 * held where a row reads a host's terminal state, is the observation right and never a launch right.
 *
 * Every launch here is real and goes through the registered Pi tools only: the tool reaches the real preflight through
 * workbenchNative().launchDetachedWorkflow, and an admitted launch spawns the compiled child host (dist/, which the
 * gate's build step makes before its test step) and runs the reviewed pure script to completion. What a launch carried
 * is read from the host's own admission record, the boot pin the launcher writes into the reserved invocation
 * directory (invocation.json, after the preflight and before the spawn), and its terminal state is read through
 * workflow_detached's inspect. A refused launch is witnessed by its reply carrying the preflight's own words and by the
 * detached root holding no reserved invocation directory: the launcher reserves the directory before it spawns a child,
 * and the preflight runs before both. The reviewed script calls no agent(), so no Claude SDK query runs: the live legs
 * of PI-DETACHED-GRANTS (a detached agent() answered by the Claude SDK) are NOT run by this file.
 *
 * This suite is a member of the detached-* family (test/workbench-detached-timing-guard.test.ts, wb-maza): every timed
 * wait is pollFor, a reply that carries one of the product's two fixed-bound lapse sentences fails re-labelled with the
 * strict marker (markTimingLapse), and the hook that stops hosts waits for their exit under HOST_HOOK_TIMEOUT_MS and
 * reports a lapse only after its cleanup (reportAfterCleanup).
 *
 * Cut #2 (refusal #1 of cut #1 1c3cc1a4, guard R-B644: the cut's own claim words were wider than its pins) pins the
 * facets those words name through BOTH producers (the PRODUCERS rows at the end of this file), and reads the admitted
 * Claude config and grants with toEqual, never as a subset:
 *   U1 settings members: the model, tools and roles members each reach the admitted config only when the settings hold
 *     them (the CONFIG_ROWS hold different subsets, the empty one included), each role as the settings hold it (a role's
 *     own model and effort included), and a role that declares capabilities, a member the detached host does not carry,
 *     is refused by the unchanged preflight before any child.
 *   U2 exact rights: claude:invoke, then one claude:tool:<name> per distinct tool name in the settings tools and then in
 *     each role's tools, in that order, also when the operator holds them in the reverse order; two settings tools, two
 *     roles and one role with two tools each forward every right, a tool named more than once forwards one, a Claude
 *     right the operator holds that the config does not name is never forwarded, and each right of the five-tool SEVERAL
 *     config removed in turn refuses.
 *   U3 sources: rights carried in workflow_execute's input, or declared by the reviewed script itself (its meta and its
 *     body), never stand in for a missing host right; the JSON policy and workflow_detached's params rows are EAT-R014's.
 *   U4 deterministic facet: once the operator switches the settings to the pi backend (settings are read on every call),
 *     workflow_execute's detached launch is deterministic and carries no Claude config and no grant, also with every
 *     Claude right forged in its policy and input; workflow_detached's deterministic default is EAT-R013's control.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type ExtensionContext, getAgentDir } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { inspectWorkflowSource } from "../src/workbench/designer.js";
import type { DetachedLaunchRequest, DetachedReceipt, DetachedSnapshot } from "../src/workbench/hosts/local-detached.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { DetachedTimingLapse, HOST_HOOK_TIMEOUT_MS, markTimingLapse, pollFor, reportAfterCleanup } from "./helpers/detached-timing.js";

const SETTINGS_TOOL = "Read";
const ROLE_TOOL = "Grep";
const INVOKE = "claude:invoke";
const OBSERVE = "workbench:observe";
const SETTINGS_TOOL_GRANT = `claude:tool:${SETTINGS_TOOL}`;
const ROLE_TOOL_GRANT = `claude:tool:${ROLE_TOOL}`;
/** The rights the preflight demands of this configuration, in the order the producers forward them. */
const CLAUDE_RIGHTS: readonly string[] = [INVOKE, SETTINGS_TOOL_GRANT, ROLE_TOOL_GRANT];
const EXECUTE_RIGHTS: readonly string[] = ["workbench:execute", "workbench:detach", ...CLAUDE_RIGHTS];
const DETACHED_RIGHTS: readonly string[] = ["workbench:detach", ...CLAUDE_RIGHTS];
const ROLES = { reviewer: { prompt: "Review the reviewed change.", tools: [ROLE_TOOL] } };
/** The preflight's own refusal texts (validateRequest), unchanged by this cut. */
const INVOKE_DENIAL = "Claude requires explicit claude:invoke grant (auth is SDK-owned and separate).";
const TOOL_DENIAL = "Claude built-ins require exact host grants.";
const PURE_SCRIPT = 'export const meta={name:"detached-grants",description:"reviewed pure computation"}; return 42;';
/** What a model may put in workflow_execute's JSON policy or beside workflow_detached's params: every right, forged. */
const FORGED = { grants: [...CLAUDE_RIGHTS], claude: { tools: [] }, backend: "claude" };

interface RegisteredTool {
  execute(id: string, params: Record<string, unknown>, signal: undefined, update: undefined, context: ExtensionContext): Promise<{ content: { type: string; text: string }[] }>;
}
interface ExecuteReply {
  ok: boolean;
  status: string;
  error?: { code: string; message: string };
  nativeRefs: { provider: string; type: string; id: string }[];
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;

const detachedRoot = (): string => join(getAgentDir(), "workbench-detached");
/** Invocation directories the launcher reserved in this row's sandbox: it reserves one after the preflight and before it spawns a child. */
function reservedInvocations(): string[] {
  return existsSync(detachedRoot()) ? readdirSync(detachedRoot()).sort() : [];
}
/** The launch request as the launcher admitted it: the boot pin it wrote into the reserved directory before the spawn. */
function admittedRequest(invocationId: string): DetachedLaunchRequest {
  return (JSON.parse(readFileSync(join(detachedRoot(), invocationId, "invocation.json"), "utf8")) as { request: DetachedLaunchRequest }).request;
}
/** The pid of each host the row's launches started, from the receipt each host wrote, when that pid still runs that host. */
function hostPids(): number[] {
  return reservedInvocations().flatMap(id => {
    const receiptPath = join(detachedRoot(), id, "receipt.json");
    if (!existsSync(receiptPath)) return [];
    const { pid } = JSON.parse(readFileSync(receiptPath, "utf8")) as DetachedReceipt;
    let command = "";
    try { command = readFileSync(`/proc/${pid}/cmdline`, "utf8"); } catch {}
    return command.includes(join(detachedRoot(), id, "invocation.json")) ? [pid] : [];
  });
}
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
/** True once `pid` has exited; a host still running at the budget is a lapse that names the wait (wb-maza). */
async function gone(pid: number): Promise<boolean> {
  await pollFor(`the exit of host pid ${pid}`, () => alive(pid), running => !running);
  return !alive(pid);
}

afterEach(async () => {
  // Every host a row started (an admitted launch, or one a mutant admitted) stops, and has exited, before the sandbox
  // goes; a host still running at its budget is a lapse reported only after that cleanup (wb-maza). The scan reads this
  // row's sandbox only: with no sandbox the agent directory is not this file's.
  const stopping = sandbox ? hostPids() : [];
  for (const pid of stopping) { try { process.kill(pid, "SIGTERM"); } catch {} }
  await reportAfterCleanup(stopping.map(pid => gone(pid)), () => {
    sandbox?.restore();
    sandbox = undefined;
  });
}, HOST_HOOK_TIMEOUT_MS);

/** `text`, unless it carries one of the product's two fixed-bound lapse sentences: that fails re-labelled (wb-maza). */
function unlapsed(site: string, text: string): string {
  const marked = markTimingLapse(site, new Error(text));
  if (marked instanceof DetachedTimingLapse) throw marked;
  return text;
}
/** A reply that must be JSON; a refusal text where JSON was expected fails naming that text, never as JSON.parse's. */
function jsonReply<T>(site: string, reply: string): T {
  try { return JSON.parse(unlapsed(site, reply)) as T; }
  catch (error) {
    if (error instanceof DetachedTimingLapse) throw error;
    throw new Error(`${site}: expected a JSON reply, received: ${reply}`);
  }
}

/** The Claude settings members of the default boot: one settings tool and one role with one tool. */
const DEFAULT_CLAUDE: Readonly<Record<string, unknown>> = { tools: [SETTINGS_TOOL], roles: ROLES };

/**
 * Boots the real extension under Claude settings holding exactly `rights`: by default one settings tool and one role
 * tool (`claude` replaces those members), with the reviewed `script` saved as pure.js.
 */
async function boot(rights: readonly string[], claude: Readonly<Record<string, unknown>> = DEFAULT_CLAUDE, script: string = PURE_SCRIPT) {
  const settings = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", ...claude, capabilityGrants: [...rights] } };
  sandbox = hermeticDir({ settings });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const scriptPath = join(sandbox.dir, "pure.js");
  writeFileSync(scriptPath, script);
  const tool = (name: string): RegisteredTool => {
    const registered: RegisteredTool | undefined = pi.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  return { context, scriptPath, dir: sandbox.dir, tool, settings };
}
type Booted = Awaited<ReturnType<typeof boot>>;

async function executeDetached({ context, scriptPath, dir, tool }: Booted, extra: Record<string, unknown> = {}): Promise<ExecuteReply> {
  const definitionRef = inspectWorkflowSource({ scriptPath }, dir).definition;
  const result = await tool("workflow_execute").execute("wb-wupg", { definitionRef, input: { n: 1 }, hostMode: "detached", ...extra }, undefined, undefined, context);
  const reply = jsonReply<ExecuteReply>("workflow_execute reply", textOf(result));
  if (reply.error) unlapsed("workflow_execute launch", reply.error.message);
  return reply;
}
async function launchDetached({ context, scriptPath, tool }: Booted, invocationId: string, extra: Record<string, unknown> = {}): Promise<string> {
  const result = await tool("workflow_detached").execute("wb-wupg", { action: "launch", invocationId, scriptPath, trustedScript: true, ...extra }, undefined, undefined, context);
  return unlapsed(`launch of ${invocationId}`, textOf(result));
}
/** The host's first terminal snapshot, read through workflow_detached's inspect; a budget lapse names the wait. */
async function terminalSnapshot({ context, tool }: Booted, invocationId: string): Promise<DetachedSnapshot> {
  const read = async (): Promise<DetachedSnapshot> =>
    jsonReply(`inspect of ${invocationId}`, textOf(await tool("workflow_detached").execute("wb-wupg", { action: "inspect", invocationId }, undefined, undefined, context)));
  return pollFor(`a terminal reading of ${invocationId} through workflow_detached`, read, snapshot => Boolean(snapshot.terminal));
}

describe("EAT-R012: registered workflow_execute, detached mode", () => {
  it("EAT-R012: holding execute, detach, invoke and the exact settings and role tool rights, the reviewed source passes the real detached preflight and its child host runs it", async () => {
    const booted = await boot([...EXECUTE_RIGHTS, OBSERVE]);
    const reply = await executeDetached(booted);
    expect(reply.error).toBeUndefined();
    expect(reply).toMatchObject({ ok: true, status: "launched" });
    const invocation = reply.nativeRefs.find(ref => ref.provider === "local-detached" && ref.type === "invocation");
    if (!invocation) throw new Error(`no detached invocation reference in ${JSON.stringify(reply.nativeRefs)}`);
    expect(reservedInvocations()).toEqual([invocation.id]);
    expect(admittedRequest(invocation.id)).toMatchObject({ backend: "claude", grants: [...CLAUDE_RIGHTS], claude: { tools: [SETTINGS_TOOL], roles: ROLES } });
    expect(await terminalSnapshot(booted, invocation.id)).toMatchObject({ terminal: "completed", result: 42, receipt: { evidenceClass: "native-client" } });
  }, 60_000);

  it.each([
    ["workbench:execute", "missing-execute-grant"],
    ["workbench:detach", "missing-detach-grant"],
  ])("EAT-R012: without %s the tool refuses (%s) before the launcher, and no child host launches", async (removed, code) => {
    const reply = await executeDetached(await boot(EXECUTE_RIGHTS.filter(right => right !== removed)));
    expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(reply.error?.code).toBe(code);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);

  it.each([
    [INVOKE, INVOKE_DENIAL],
    [SETTINGS_TOOL_GRANT, TOOL_DENIAL],
    [ROLE_TOOL_GRANT, TOOL_DENIAL],
  ])("EAT-R012: without %s the real preflight refuses the launch and no child host launches", async (removed, denial) => {
    const reply = await executeDetached(await boot(EXECUTE_RIGHTS.filter(right => right !== removed)));
    expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(reply.error?.code).toBe("launch-failed");
    expect(reply.error?.message).toContain(denial);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);
});

describe("EAT-R013: registered workflow_detached", () => {
  it("EAT-R013: backend claude holding invoke and the exact settings and role tool grants passes the real preflight and its child host runs the reviewed source", async () => {
    const booted = await boot([...DETACHED_RIGHTS, OBSERVE]);
    const receipt = jsonReply<DetachedReceipt>("launch receipt of wb-wupg-r013", await launchDetached(booted, "wb-wupg-r013", { backend: "claude" }));
    expect(receipt).toMatchObject({ contract: "workbench.local-detached/v1", invocationId: "wb-wupg-r013", evidenceClass: "native-client" });
    expect(reservedInvocations()).toEqual(["wb-wupg-r013"]);
    expect(admittedRequest("wb-wupg-r013")).toMatchObject({ backend: "claude", grants: [...CLAUDE_RIGHTS], claude: { tools: [SETTINGS_TOOL], roles: ROLES } });
    expect(await terminalSnapshot(booted, "wb-wupg-r013")).toMatchObject({ terminal: "completed", result: 42 });
  }, 60_000);

  it.each([
    [INVOKE, INVOKE_DENIAL],
    [ROLE_TOOL_GRANT, TOOL_DENIAL],
  ])("EAT-R013: backend claude without %s is refused by the real preflight and no child host launches", async (removed, denial) => {
    const text = await launchDetached(await boot(DETACHED_RIGHTS.filter(right => right !== removed)), "wb-wupg-r013-refused", { backend: "claude" });
    expect(text).toContain(denial);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);

  it("EAT-R013: the deterministic default stays a separate control: it forwards none of the Claude rights the host holds and launches", async () => {
    const booted = await boot([...DETACHED_RIGHTS, OBSERVE]);
    const receipt = jsonReply<DetachedReceipt>("launch receipt of wb-wupg-r013-default", await launchDetached(booted, "wb-wupg-r013-default"));
    expect(receipt).toMatchObject({ contract: "workbench.local-detached/v1", invocationId: "wb-wupg-r013-default", evidenceClass: "local-computation" });
    const request = admittedRequest("wb-wupg-r013-default");
    expect(request).toMatchObject({ backend: "deterministic", grants: [] });
    expect(request).not.toHaveProperty("claude");
    expect(await terminalSnapshot(booted, "wb-wupg-r013-default")).toMatchObject({ terminal: "completed", result: 42 });
  }, 60_000);
});

describe("EAT-R014: forged grants never stand in for a missing host right", () => {
  it.each([
    [INVOKE, INVOKE_DENIAL],
    [SETTINGS_TOOL_GRANT, TOOL_DENIAL],
  ])("EAT-R014: workflow_execute with every Claude right forged in its JSON policy, the host missing %s, is denied by the unchanged preflight before any child launches", async (removed, denial) => {
    const reply = await executeDetached(await boot(EXECUTE_RIGHTS.filter(right => right !== removed)), { policy: FORGED });
    expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(reply.error?.code).toBe("launch-failed");
    expect(reply.error?.message).toContain(denial);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);

  it.each([
    [INVOKE, INVOKE_DENIAL],
    [ROLE_TOOL_GRANT, TOOL_DENIAL],
  ])("EAT-R014: workflow_detached with every Claude right forged beside its params, the host missing %s, is denied by the unchanged preflight before any child launches", async (removed, denial) => {
    const booted = await boot(DETACHED_RIGHTS.filter(right => right !== removed));
    const text = await launchDetached(booted, "wb-wupg-r014", { backend: "claude", policy: FORGED, grants: [...CLAUDE_RIGHTS] });
    expect(text).toContain(denial);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);
});

// Cut #2: the facets refusal #1 named (U1-U4), each pinned through both registered producers.

/** The two registered producers of a detached Claude launch, each reaching the real preflight through its own tool. */
const PRODUCERS = ["workflow_execute", "workflow_detached"] as const;
type Producer = (typeof PRODUCERS)[number];
/** The rights each producer's own tool checks before it builds a launch; neither is a Claude right, and neither is forwarded. */
const TOOL_RIGHTS: Readonly<Record<Producer, readonly string[]>> = {
  workflow_execute: ["workbench:execute", "workbench:detach"],
  workflow_detached: ["workbench:detach"],
};
const toolRight = (name: string): string => `claude:tool:${name}`;
const MODEL = "claude-wupg-probe-model";
const REVIEW = "Review the reviewed change.";
const WRITE = "Write the reviewed change.";
/** Two settings tools and two roles, the second naming two tools: five tool rights beside claude:invoke. */
const SEVERAL = {
  tools: ["Read", "Glob"],
  roles: { reviewer: { prompt: REVIEW, tools: ["Grep"] }, writer: { prompt: WRITE, tools: ["LS", "WebSearch"] } },
};
/** The rights the preflight demands of SEVERAL, in the order the producers forward them. */
const SEVERAL_RIGHTS: readonly string[] = [INVOKE, ...["Read", "Glob", "Grep", "LS", "WebSearch"].map(toolRight)];
const ROLE_MEMBERS = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL], model: MODEL, effort: "low" } };
const TWO_ROLES = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL] }, writer: { prompt: WRITE, tools: ["LS"] } };
const TWO_TOOL_ROLE = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL, "LS"] } };
const NAMED_TWICE = { reviewer: { prompt: REVIEW, tools: [SETTINGS_TOOL, ROLE_TOOL] }, writer: { prompt: WRITE, tools: [ROLE_TOOL] } };
/** A reviewed source that declares every Claude right itself, in its meta and in its body, and still computes 42. */
const DECLARING_SCRIPT = `export const meta={name:"detached-grants",description:"reviewed pure computation",grants:${JSON.stringify(CLAUDE_RIGHTS)},backend:"claude"}; const grants=${JSON.stringify(CLAUDE_RIGHTS)}; return grants.length === 3 ? 42 : 0;`;

interface ConfigRow {
  /** The refusal #1 item the row cures, and what its configuration varies. */
  readonly row: string;
  /** The Claude settings members the operator configures beside workflowAgentBackend claude. */
  readonly settings: Readonly<Record<string, unknown>>;
  /** The Claude rights the operator holds, in the operator's order, beside the producer's tool rights and workbench:observe. */
  readonly held: readonly string[];
  /** The Claude config the host admitted, exactly. */
  readonly claude: Readonly<Record<string, unknown>>;
  /** The grants the host admitted, exactly and in order. */
  readonly grants: readonly string[];
}
const CONFIG_ROWS: readonly ConfigRow[] = [
  { row: "U1 one settings tool and one role (the default)", settings: DEFAULT_CLAUDE, held: CLAUDE_RIGHTS, claude: DEFAULT_CLAUDE, grants: CLAUDE_RIGHTS },
  { row: "U1 no roles member", settings: { tools: [SETTINGS_TOOL] }, held: [INVOKE, SETTINGS_TOOL_GRANT], claude: { tools: [SETTINGS_TOOL] }, grants: [INVOKE, SETTINGS_TOOL_GRANT] },
  { row: "U1 no tools member", settings: { roles: ROLES }, held: [INVOKE, ROLE_TOOL_GRANT], claude: { roles: ROLES }, grants: [INVOKE, ROLE_TOOL_GRANT] },
  { row: "U1 no Claude member at all", settings: {}, held: [INVOKE], claude: {}, grants: [INVOKE] },
  { row: "U1 a model member", settings: { model: MODEL, ...DEFAULT_CLAUDE }, held: CLAUDE_RIGHTS, claude: { model: MODEL, ...DEFAULT_CLAUDE }, grants: CLAUDE_RIGHTS },
  { row: "U1 a role with its own model and effort", settings: { tools: [SETTINGS_TOOL], roles: ROLE_MEMBERS }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL], roles: ROLE_MEMBERS }, grants: CLAUDE_RIGHTS },
  { row: "U2 a Claude right held that the config does not name", settings: DEFAULT_CLAUDE, held: [...CLAUDE_RIGHTS, toolRight("Bash")], claude: DEFAULT_CLAUDE, grants: CLAUDE_RIGHTS },
  {
    row: "U2 two settings tools", settings: { tools: [SETTINGS_TOOL, "Glob"], roles: ROLES }, held: [INVOKE, SETTINGS_TOOL_GRANT, toolRight("Glob"), ROLE_TOOL_GRANT],
    claude: { tools: [SETTINGS_TOOL, "Glob"], roles: ROLES }, grants: [INVOKE, SETTINGS_TOOL_GRANT, toolRight("Glob"), ROLE_TOOL_GRANT],
  },
  { row: "U2 two roles", settings: { tools: [SETTINGS_TOOL], roles: TWO_ROLES }, held: [...CLAUDE_RIGHTS, toolRight("LS")], claude: { tools: [SETTINGS_TOOL], roles: TWO_ROLES }, grants: [...CLAUDE_RIGHTS, toolRight("LS")] },
  { row: "U2 one role with two tools", settings: { tools: [SETTINGS_TOOL], roles: TWO_TOOL_ROLE }, held: [...CLAUDE_RIGHTS, toolRight("LS")], claude: { tools: [SETTINGS_TOOL], roles: TWO_TOOL_ROLE }, grants: [...CLAUDE_RIGHTS, toolRight("LS")] },
  { row: "U2 a tool named by the settings and by two roles", settings: { tools: [SETTINGS_TOOL], roles: NAMED_TWICE }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL], roles: NAMED_TWICE }, grants: CLAUDE_RIGHTS },
  { row: "U2 the SEVERAL config, its rights held in the reverse order", settings: SEVERAL, held: [...SEVERAL_RIGHTS].reverse(), claude: SEVERAL, grants: SEVERAL_RIGHTS },
];

/**
 * A Claude launch of the reviewed source through `producer` (workflow_execute: the Claude settings select the backend;
 * workflow_detached: backend claude), resolving to the reply's text: a refusal carries the preflight's own words.
 */
async function launchClaude(booted: Booted, producer: Producer, extra: Record<string, unknown> = {}): Promise<string> {
  if (producer === "workflow_detached") return launchDetached(booted, "wb-wupg-claude", { backend: "claude", ...extra });
  const reply = await executeDetached(booted, extra);
  return reply.error ? reply.error.message : JSON.stringify(reply);
}
/** The request the row's one reserved invocation pinned, once its child host has run the reviewed source to completion. */
async function admittedLaunch(booted: Booted, reply: string): Promise<DetachedLaunchRequest> {
  const [invocationId, ...more] = reservedInvocations();
  if (invocationId === undefined || more.length > 0) throw new Error(`expected exactly one reserved invocation; the reply was: ${reply}`);
  expect(await terminalSnapshot(booted, invocationId), reply).toMatchObject({ terminal: "completed", result: 42 });
  return admittedRequest(invocationId);
}
/** Rewrites the row's settings with another backend; the extension reads its settings on every call. */
function switchBackend({ dir, settings }: Booted, workflowAgentBackend: "pi" | "claude"): void {
  writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify({ ...settings, workbench: { ...settings.workbench, workflowAgentBackend } }));
}

describe("cut #2 U1/U2: both producers forward the settings members the detached host accepts and exactly the rights its preflight demands", () => {
  it.each(PRODUCERS.flatMap(producer => CONFIG_ROWS.map(row => [producer, row.row, row] as const)))(
    "%s, %s: the real preflight admits exactly that Claude config and those grants, and the child host runs the reviewed source",
    async (producer, _row, { settings, held, claude, grants }) => {
      const booted = await boot([...TOOL_RIGHTS[producer], ...held, OBSERVE], settings);
      const request = await admittedLaunch(booted, await launchClaude(booted, producer));
      expect(request.backend).toBe("claude");
      expect(request.claude).toEqual(claude);
      expect(request.grants).toEqual(grants);
    },
    60_000,
  );

  it.each(PRODUCERS)("%s, U1 a role that declares capabilities: the unchanged preflight refuses that member, which the detached host does not carry, and no child host launches", async producer => {
    const roles = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL], capabilities: ["forge.gate.status"] } };
    const booted = await boot([...TOOL_RIGHTS[producer], ...CLAUDE_RIGHTS], { tools: [SETTINGS_TOOL], roles });
    expect(await launchClaude(booted, producer)).toContain("Unsupported field: capabilities.");
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);

  it.each(PRODUCERS.flatMap(producer => SEVERAL_RIGHTS.map(removed => [producer, removed] as const)))(
    "%s, U2 the SEVERAL config without %s: the real preflight refuses and no child host launches",
    async (producer, removed) => {
      const booted = await boot([...TOOL_RIGHTS[producer], ...SEVERAL_RIGHTS.filter(right => right !== removed)], SEVERAL);
      expect(await launchClaude(booted, producer)).toContain(removed === INVOKE ? INVOKE_DENIAL : TOOL_DENIAL);
      expect(reservedInvocations()).toEqual([]);
    },
    30_000,
  );
});

describe("cut #2 U3: rights the input or the reviewed script carry never stand in for a missing host right", () => {
  it.each([
    [INVOKE, INVOKE_DENIAL],
    [SETTINGS_TOOL_GRANT, TOOL_DENIAL],
  ])("workflow_execute with every Claude right carried in its input, the host missing %s, is denied by the unchanged preflight before any child launches", async (removed, denial) => {
    const reply = await executeDetached(await boot(EXECUTE_RIGHTS.filter(right => right !== removed)), { input: { ...FORGED } });
    expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(reply.error?.code).toBe("launch-failed");
    expect(reply.error?.message).toContain(denial);
    expect(reservedInvocations()).toEqual([]);
  }, 30_000);

  it.each(PRODUCERS.flatMap(producer => [[producer, INVOKE, INVOKE_DENIAL], [producer, ROLE_TOOL_GRANT, TOOL_DENIAL]] as const))(
    "%s with a reviewed script that declares every Claude right in its meta and its body, the host missing %s, is denied by the unchanged preflight before any child launches",
    async (producer, removed, denial) => {
      const booted = await boot([...TOOL_RIGHTS[producer], ...CLAUDE_RIGHTS.filter(right => right !== removed)], DEFAULT_CLAUDE, DECLARING_SCRIPT);
      expect(await launchClaude(booted, producer)).toContain(denial);
      expect(reservedInvocations()).toEqual([]);
    },
    30_000,
  );

  it.each(PRODUCERS)("%s with that script, the host holding every right (the control): it launches with exactly the rights the config demands", async producer => {
    const booted = await boot([...TOOL_RIGHTS[producer], ...CLAUDE_RIGHTS, OBSERVE], DEFAULT_CLAUDE, DECLARING_SCRIPT);
    const request = await admittedLaunch(booted, await launchClaude(booted, producer));
    expect(request.grants).toEqual(CLAUDE_RIGHTS);
  }, 60_000);
});

describe("cut #2 U4: workflow_execute's deterministic facet", () => {
  it.each<[string, Record<string, unknown>]>([
    ["no forged right", {}],
    ["every Claude right forged in its policy and its input", { policy: FORGED, input: { ...FORGED } }],
  ])("once the operator switches the settings to the pi backend, a detached launch with %s is deterministic and carries no Claude config and no grant", async (_case, extra) => {
    const booted = await boot([...EXECUTE_RIGHTS, OBSERVE]);
    switchBackend(booted, "pi");
    const reply = await executeDetached(booted, extra);
    expect(reply).toMatchObject({ ok: true, status: "launched" });
    const request = await admittedLaunch(booted, JSON.stringify(reply));
    expect(request).toMatchObject({ backend: "deterministic", grants: [] });
    expect(request).not.toHaveProperty("claude");
  }, 60_000);
});
