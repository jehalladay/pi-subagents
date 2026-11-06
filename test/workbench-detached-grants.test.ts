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
 * and one claude:tool:<name> per Claude tool the settings or a role names (the exact spelling the preflight checks; the
 * grant form itself is pinned by test/workbench-claude-tool-grants.test.ts). workbench:observe, held where a row reads
 * a host's terminal state, is the observation right and never a launch right.
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

/** Boots the real extension under Claude settings with one settings tool and one role tool, holding exactly `rights`. */
async function boot(rights: readonly string[]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", tools: [SETTINGS_TOOL], roles: ROLES, capabilityGrants: [...rights] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const scriptPath = join(sandbox.dir, "pure.js");
  writeFileSync(scriptPath, PURE_SCRIPT);
  const tool = (name: string): RegisteredTool => {
    const registered: RegisteredTool | undefined = pi.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  return { context, scriptPath, dir: sandbox.dir, tool };
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
