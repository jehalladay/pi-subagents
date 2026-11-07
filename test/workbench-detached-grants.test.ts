/**
 * wb-wupg (MWI B-detached-grants, slice PI-6, closure gate PI-DETACHED-GRANTS): the two registered detached Claude
 * grant producers in src/index.ts - the workflow_execute detached launcher and the workflow_detached tool - and what the
 * REAL local-detached preflight (validateRequest, src/workbench/hosts/local-detached.ts) admits from each of them for the
 * launches this file's rows make.
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
 * and the claude:tool:<name> rights a row holds (the exact spelling the preflight checks; the grant form itself is
 * test/workbench-claude-tool-grants.test.ts's). workbench:observe is held only by the rows that read a host's terminal
 * state through workflow_detached's inspect, and no row's admitted grants carry it.
 *
 * Every launch here is real and goes through the registered Pi tools only: the tool reaches the real preflight through
 * workbenchNative().launchDetachedWorkflow, and an admitted launch spawns the compiled child host (dist/, which the
 * gate's build step makes before its test step) and runs the reviewed pure script to completion. What a launch carried
 * is read from the host's own admission record, the boot pin the launcher writes into the reserved invocation
 * directory (invocation.json, after the preflight and before the spawn), and its terminal state is read through
 * workflow_detached's inspect. A launch the preflight refuses is witnessed by its reply carrying the preflight's own
 * words and by the detached root holding no reserved invocation directory: the launcher reserves the directory before it
 * spawns a child, and the preflight runs before both. The reviewed script calls no agent(), so no Claude SDK query runs: the live legs
 * of PI-DETACHED-GRANTS (a detached agent() answered by the Claude SDK) are NOT run by this file.
 *
 * This suite is a member of the detached-* family (test/workbench-detached-timing-guard.test.ts, wb-maza): every timed
 * wait is pollFor, a reply that carries one of the product's two fixed-bound lapse sentences fails re-labelled with the
 * strict marker (markTimingLapse), and the hook that stops hosts waits for their exit under HOST_HOOK_TIMEOUT_MS and
 * reports a lapse only after its cleanup (reportAfterCleanup).
 *
 * Cut #2 (refusal #1 of cut #1 1c3cc1a4, guard R-B644) added the PRODUCERS rows below for refusal #1's items. Cut #3
 * (refusal #2 of cut #2 0f18bc3f; the second-stage cap of the R-B644 set, R-B657; the enumerate-the-resolvable form)
 * pins each member refusal #2 realized through the witness refusal #2 paired with it - the R2- rows: W-S1, W-S2, W-S3,
 * W-S4, W-M1, W-I1, W-P1 and W-D1 (W-F1 is test/workbench-claude-tool-grants.test.ts's) - and narrows every claim of
 * this file to its rows. CLAIMED, each by its rows only, through each of the two producers unless a row names one, each admitted
 * Claude config and grant list read with toEqual:
 *   C1 each CONFIG_ROWS row: the real preflight admits exactly the row's claude member as the Claude config and exactly
 *     the row's grants in the row's order, and the child host runs the reviewed source to completion;
 *   C2 each SOURCE_ROWS row: with FORGED_LAUNCH carried where the row puts it (workflow_execute's input or JSON policy,
 *     the reviewed script's meta and body, or beside workflow_detached's params) and the host holding FORGED_RIGHTS,
 *     the real preflight admits exactly DEFAULT_CLAUDE and CLAUDE_RIGHTS, and the child host runs the reviewed source
 *     to completion;
 *   C3 each refusal row - the EAT-R012, EAT-R013 and EAT-R014 removals, the role that declares capabilities, each SEVERAL
 *     right removed, and cut #2's input and declaring-script removals: the reply carries the words or the code the row
 *     names, and no invocation directory is reserved;
 *   C4 each deterministic row - workflow_detached with no backend parameter (EAT-R013's control) and with backend
 *     deterministic named (DETERMINISTIC_ROWS: nothing, or FORGED_CLAUDE, FORGED_RIGHTS and a policy beside its params), and
 *     workflow_execute after its settings switch to the pi backend, with nothing or with FORGED in its policy and its
 *     input: the launch is admitted with backend deterministic, grants [] and no claude member, and runs to completion;
 *   C5 the EAT-R012 and EAT-R013 launch rows and cut #2's declaring-script control: what each asserts (the EAT rows
 *     read the admitted request with toMatchObject; DEFAULT_CLAUDE's exact config is C1's first row);
 *   C6 the R2- rows of CONFIG_ROWS, SOURCE_ROWS and DETERMINISTIC_ROWS are the frozen R2_ROWS list, in order, and the
 *     witness ids they name are exactly those this comment names, W-F1 aside.
 * NOT CLAIMED by this file: a settings shape, held right list, launch input, JSON policy, reviewed script or
 * workflow_detached params other than its rows'; the order of the members of an admitted config or role (toEqual does
 * not read it); a detached agent() answered by the Claude SDK; refusal #1's U5 planted readers G13 (a capabilityGrants
 * grammar reader spelled with escaped hyphens, beside the delivered one in src/workbench/execute.ts) and G13b (the same
 * reader as a new module), whose class test/workbench-claude-tool-grants.test.ts's NOT CLAIMED sentence names (wb-ghki).
 * NAMED RESIDUALS: none - every realized member of refusals #1 and #2 but G13 and G13b is pinned by a row of this file or
 * of test/workbench-claude-tool-grants.test.ts, and every other mode the seat knows is outside the rows, in the NOT
 * CLAIMED sentence.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ExtensionContext, getAgentDir } from "@earendil-works/pi-coding-agent";
import { marked, type Token, type Tokens } from "marked";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { inspectWorkflowSource } from "../src/workbench/designer.js";
import type { DetachedLaunchRequest, DetachedReceipt, DetachedSnapshot } from "../src/workbench/hosts/local-detached.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { type DocsSection, docsSection } from "./helpers/census.js";
import { DetachedTimingLapse, HOST_HOOK_TIMEOUT_MS, markTimingLapse, pollFor, reportAfterCleanup } from "./helpers/detached-timing.js";
import { sectionSource } from "./helpers/docs-section-source.js";

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
const LF = String.fromCodePoint(10);
/** Cut #3, W-S3: the writer role holds no tools member. */
const TOOLLESS_WRITER = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL] }, writer: { prompt: WRITE } };
/** Cut #3, W-S4: the reviewer's prompt with two leading spaces, a line break inside and two trailing spaces. */
const SPACED_PROMPT = { reviewer: { prompt: `  ${REVIEW}${LF}${WRITE}  `, tools: [ROLE_TOOL] } };
/** Cut #3: the reviewer role holds an empty tools member. */
const EMPTY_ROLE_TOOLS = { reviewer: { prompt: REVIEW, tools: [] } };
/** Cut #3: the reviewer role names Grep twice. */
const GREP_TWICE = { reviewer: { prompt: REVIEW, tools: [ROLE_TOOL, ROLE_TOOL] } };
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
  // Cut #3: refusal #2's U1, U2 and U6 members (GP7-S1 to GP7-S4, GP7-M1), each row the witness paired with its member.
  { row: "R2-U1 W-S3 the writer role holding no tools member beside the reviewer role", settings: { tools: [SETTINGS_TOOL], roles: TOOLLESS_WRITER }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL], roles: TOOLLESS_WRITER }, grants: CLAUDE_RIGHTS },
  { row: "R2-U1 W-S4 the reviewer's prompt with leading spaces, a line break and trailing spaces", settings: { tools: [SETTINGS_TOOL], roles: SPACED_PROMPT }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL], roles: SPACED_PROMPT }, grants: CLAUDE_RIGHTS },
  { row: "R2-U1 the reviewer role holding an empty tools member", settings: { tools: [SETTINGS_TOOL], roles: EMPTY_ROLE_TOOLS }, held: [INVOKE, SETTINGS_TOOL_GRANT], claude: { tools: [SETTINGS_TOOL], roles: EMPTY_ROLE_TOOLS }, grants: [INVOKE, SETTINGS_TOOL_GRANT] },
  { row: "R2-U6 W-S1 the settings tools member empty beside the reviewer role", settings: { tools: [], roles: ROLES }, held: [INVOKE, ROLE_TOOL_GRANT], claude: { tools: [], roles: ROLES }, grants: [INVOKE, ROLE_TOOL_GRANT] },
  { row: "R2-U6 W-S2 the settings roles member empty beside the settings tool Read", settings: { tools: [SETTINGS_TOOL], roles: {} }, held: [INVOKE, SETTINGS_TOOL_GRANT], claude: { tools: [SETTINGS_TOOL], roles: {} }, grants: [INVOKE, SETTINGS_TOOL_GRANT] },
  { row: "R2-U6 the settings tools and roles members both empty", settings: { tools: [], roles: {} }, held: [INVOKE], claude: { tools: [], roles: {} }, grants: [INVOKE] },
  { row: "R2-U2 W-M1 Read named twice in the settings tools", settings: { tools: [SETTINGS_TOOL, SETTINGS_TOOL], roles: ROLES }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL, SETTINGS_TOOL], roles: ROLES }, grants: CLAUDE_RIGHTS },
  { row: "R2-U2 Grep named twice in the reviewer role's tools", settings: { tools: [SETTINGS_TOOL], roles: GREP_TWICE }, held: CLAUDE_RIGHTS, claude: { tools: [SETTINGS_TOOL], roles: GREP_TWICE }, grants: CLAUDE_RIGHTS },
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

describe("cut #2 U1/U2 and cut #3: through both producers, each CONFIG_ROWS row's admitted Claude config and grants, and each refusal row cut #2 added", () => {
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

describe("cut #2 U3: the rights each row carries in workflow_execute's input or declares in the reviewed script never stand in for the host right the row removes", () => {
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

// Cut #3: refusal #2's U3 members (GP7-I1, GP7-P1) and U4 member (GP7-D1), each pinned through its paired witness.

/** A Claude config none of whose values the settings hold. */
const FORGED_CLAUDE = { model: "claude-wupg-forged-model", tools: ["Bash"], roles: { forger: { prompt: "Forge the reviewed change.", tools: ["Bash"] } } };
/** Every Claude right the settings demand, and claude:tool:Bash, which they do not name. */
const FORGED_RIGHTS: readonly string[] = [...CLAUDE_RIGHTS, toolRight("Bash")];
/** A Claude config, rights and a backend, as a launch's own data may carry them. */
const FORGED_LAUNCH = { claude: FORGED_CLAUDE, grants: FORGED_RIGHTS, backend: "claude" };
/** A reviewed source that carries FORGED_LAUNCH in its meta and in its body, and still computes 42. */
const FORGING_SCRIPT = `export const meta={name:"detached-grants",description:"reviewed pure computation",claude:${JSON.stringify(FORGED_CLAUDE)},grants:${JSON.stringify(FORGED_RIGHTS)},backend:"claude"}; const forged=${JSON.stringify(FORGED_LAUNCH)}; return forged.grants.length === 4 ? 42 : 0;`;

interface SourceRow {
  /** Where the row's launch carries FORGED_LAUNCH. */
  readonly row: string;
  readonly producer: Producer;
  /** The reviewed source the row saves. */
  readonly script: string;
  /** What the row's launch passes beside its producer's own parameters. */
  readonly extra: Readonly<Record<string, unknown>>;
}
const SOURCE_ROWS: readonly SourceRow[] = [
  { row: "R2-U3 W-I1 FORGED_LAUNCH in workflow_execute's input", producer: "workflow_execute", script: PURE_SCRIPT, extra: { input: { n: 1, ...FORGED_LAUNCH } } },
  { row: "R2-U3 W-P1 FORGED_LAUNCH as workflow_execute's JSON policy", producer: "workflow_execute", script: PURE_SCRIPT, extra: { policy: FORGED_LAUNCH } },
  { row: "R2-U3 FORGED_LAUNCH in the reviewed script's meta and body, through workflow_execute", producer: "workflow_execute", script: FORGING_SCRIPT, extra: {} },
  { row: "R2-U3 FORGED_LAUNCH in the reviewed script's meta and body, through workflow_detached", producer: "workflow_detached", script: FORGING_SCRIPT, extra: {} },
  { row: "R2-U3 FORGED_LAUNCH's members, a policy and an input beside workflow_detached's params", producer: "workflow_detached", script: PURE_SCRIPT, extra: { ...FORGED_LAUNCH, policy: FORGED_LAUNCH, input: FORGED_LAUNCH } },
];

describe("cut #3 R2-U3: the SOURCE_ROWS launches carry FORGED_LAUNCH, and the admitted Claude config and grants are the settings'", () => {
  it.each(SOURCE_ROWS.map(row => [row.row, row] as const))(
    "%s, the host holding FORGED_RIGHTS: the real preflight admits exactly DEFAULT_CLAUDE and CLAUDE_RIGHTS, and the child host runs the reviewed source",
    async (_row, { producer, script, extra }) => {
      const booted = await boot([...TOOL_RIGHTS[producer], ...FORGED_RIGHTS, OBSERVE], DEFAULT_CLAUDE, script);
      const request = await admittedLaunch(booted, await launchClaude(booted, producer, { ...extra }));
      expect(request.backend).toBe("claude");
      expect(request.claude).toEqual(DEFAULT_CLAUDE);
      expect(request.grants).toEqual(CLAUDE_RIGHTS);
    },
    60_000,
  );
});

interface DeterministicRow {
  /** What the row's workflow_detached launch, backend deterministic named, passes beside its params. */
  readonly row: string;
  readonly extra: Readonly<Record<string, unknown>>;
}
const DETERMINISTIC_ROWS: readonly DeterministicRow[] = [
  { row: "R2-U4 W-D1 workflow_detached with backend deterministic named and nothing beside its params", extra: {} },
  {
    row: "R2-U4 workflow_detached with backend deterministic named and FORGED_CLAUDE, FORGED_RIGHTS and a policy beside its params",
    extra: { claude: FORGED_CLAUDE, grants: [...FORGED_RIGHTS], policy: FORGED_LAUNCH },
  },
];

describe("cut #3 R2-U4: workflow_detached with backend deterministic named", () => {
  it.each(DETERMINISTIC_ROWS.map(row => [row.row, row] as const))(
    "%s, the host holding FORGED_RIGHTS: the launch is admitted with backend deterministic, grants [] and no claude member, and runs to completion",
    async (_row, { extra }) => {
      const booted = await boot([...TOOL_RIGHTS.workflow_detached, ...FORGED_RIGHTS, OBSERVE]);
      const request = await admittedLaunch(booted, await launchDetached(booted, "wb-wupg-deterministic", { backend: "deterministic", ...extra }));
      expect(request).toMatchObject({ backend: "deterministic", grants: [] });
      expect(request).not.toHaveProperty("claude");
    },
    60_000,
  );
});

/** The witness ids (W-<letter><digit>) a text names, once each, sorted. */
const witnessesNamed = (text: string): string[] => [...new Set(text.match(/\bW-[A-Z][0-9]\b/g) ?? [])].sort();
/** Cut #3's R2- rows, frozen: CONFIG_ROWS's, then SOURCE_ROWS's, then DETERMINISTIC_ROWS's, each in table order. */
const R2_ROWS: readonly string[] = [
  "R2-U1 W-S3 the writer role holding no tools member beside the reviewer role",
  "R2-U1 W-S4 the reviewer's prompt with leading spaces, a line break and trailing spaces",
  "R2-U1 the reviewer role holding an empty tools member",
  "R2-U6 W-S1 the settings tools member empty beside the reviewer role",
  "R2-U6 W-S2 the settings roles member empty beside the settings tool Read",
  "R2-U6 the settings tools and roles members both empty",
  "R2-U2 W-M1 Read named twice in the settings tools",
  "R2-U2 Grep named twice in the reviewer role's tools",
  "R2-U3 W-I1 FORGED_LAUNCH in workflow_execute's input",
  "R2-U3 W-P1 FORGED_LAUNCH as workflow_execute's JSON policy",
  "R2-U3 FORGED_LAUNCH in the reviewed script's meta and body, through workflow_execute",
  "R2-U3 FORGED_LAUNCH in the reviewed script's meta and body, through workflow_detached",
  "R2-U3 FORGED_LAUNCH's members, a policy and an input beside workflow_detached's params",
  "R2-U4 W-D1 workflow_detached with backend deterministic named and nothing beside its params",
  "R2-U4 workflow_detached with backend deterministic named and FORGED_CLAUDE, FORGED_RIGHTS and a policy beside its params",
];

describe("cut #3 C6: the R2- rows and the witnesses this file's leading comment names", () => {
  it("the R2- rows of CONFIG_ROWS, SOURCE_ROWS and DETERMINISTIC_ROWS are R2_ROWS in order, and the witness ids they name are exactly the leading comment's, W-F1 aside", () => {
    const rows = [...CONFIG_ROWS, ...SOURCE_ROWS, ...DETERMINISTIC_ROWS].map(row => row.row).filter(row => row.startsWith("R2-"));
    expect(rows).toEqual(R2_ROWS);
    const leadingComment = readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/", 1)[0] ?? "";
    expect(witnessesNamed(rows.join("\n"))).toEqual(witnessesNamed(leadingComment).filter(id => id !== "W-F1"));
    expect(witnessesNamed(rows.join("\n"))).toEqual(["W-D1", "W-I1", "W-M1", "W-P1", "W-S1", "W-S2", "W-S3", "W-S4"]);
  });
});

/**
 * wb-ghki (the R694 follow-up of landing 1019, gate cmd_67a7e6181626, F1): the residual accounting of this file's leading
 * comment and of the wb-wupg receipt counted refusal #1's U5 planted readers G13 and G13b as pinned; both now say they are
 * NOT CLAIMED, and the named-residuals sentences except them. Cut #2 (refusal #1 of cut #1 93de2a41, gate run
 * g10-gate-s236, items U1 to U4) replaces cut #1's one case with the three below, and each claims only what its title
 * names. Cut #3 (refusal #2 of cut #2 7110245e, gate run g10-gate-s237, item U1: a heading written as raw HTML, the
 * gate's G2-H1, G2-H2, G2-H3 and G2-H7, escaped the heading-key count) has cases A and C refuse every HTML token of the
 * receipt. The planted readers entry 2's falsification item names are PLANTED_READERS, so the set the other two cases
 * hold the leading comment's two sentences and the wb-ghki entry's two items to is anchored outside their own literals,
 * in a landed receipt line.
 * The receipt is read as it renders (marked 18). Cases A and C first require it to carry no HTML anywhere, a comment
 * included: no HTML token at any depth (an HTML block, or an inline tag or comment inside a paragraph, a list item, a
 * block quote, a table cell, a heading or a link; htmlTokensIn), so marked passes nothing of it through verbatim and
 * every heading the receipt renders is one of marked's heading tokens. Such a heading counts wherever it renders, inside
 * a list item or a block quote too, by its text with markup dropped, white space collapsed and letter case ignored; each
 * entry is bound by docsSection (its full heading exactly once in the rendered view, under the receipt's title, up to the
 * next level-1 or level-2 heading or EOF), and an entry that carries HTML is refused. An entry's texts are its top-level
 * list items and its other blocks, as they render. The member ids read are the forms the refusals name their members in:
 * G and a number with an optional b, and CT and a number (refusal #1), and GP, a number, a hyphen, a capital letter and a
 * number (refusal #2).
 * NOT CLAIMED by these cases: a heading, label or member id spelled with a character reference, a look-alike code point or
 * an invisible code point (U+200B before a key, for one); a line nested inside another item of an entry, which renders as
 * part of that item's text; a member id in any other form (the seat battery ids, the witness ids, the unmet item ids such
 * as U5); the texts of any entry of the receipt but entry 2 and the wb-ghki entry, cut #2's own entry among them (the
 * cases read the other entries for HTML and headings only); a coordinated edit of a pinned text together with its literal
 * here (the wb-ghki entry's digest among them) that keeps G13 and G13b the member ids named; a sentence of this file
 * outside its leading block comment (the gate's G2-B1, a line comment after it, among them); and an opening in the leading
 * comment spelled with other white space inside it (the gate's G2-B3, two spaces, among them). Named residuals of these
 * cases: none.
 */
const PLANTED_READERS: readonly string[] = ["G13", "G13b"];
const RECEIPT = new URL("../docs/workbench/receipts/wb-wupg.md", import.meta.url);
const RECEIPT_TITLE = "wb-wupg: [MWI-detached-grants] Repair both registered detached Claude grant producers";
const ENTRY_2_KEY = "2026-11-06 respin (cut #2):";
const ENTRY_2_HEADING = `${ENTRY_2_KEY} refusal #1's claim facets pinned through both producers (machine seat ws-03)`;
const ENTRY_2_FALSIFICATION = "Falsification on the cut #2 tree";
const ENTRY_2_PLANTED = "The planted readers G13b and G13 are NOT CLAIMED by the narrowed scan words and were not re-run.";
const GHKI_ENTRY_KEY = "2026-11-07 receipt: wb-ghki,";
const GHKI_ENTRY_HEADING = `${GHKI_ENTRY_KEY} the R694 follow-up of landing 1019, names refusal #1's planted readers G13 and G13b NOT CLAIMED (machine seat ws-16, run g10-work-s235)`;
/** The sha-256 of the wb-ghki entry's source (sectionSource), trailing white space trimmed: cut #1's entry, as cut #2 keeps it. */
const GHKI_ENTRY_SHA256 = "3fad117e93c2d0dff8f180ad1f3d0e6ba3473d5f7efe2381b0c1c6a92853d9a2";
const HEADER_NOT_CLAIMED =
  "NOT CLAIMED by this file: a settings shape, held right list, launch input, JSON policy, reviewed script or workflow_detached params other than its rows'; the order of the members of an admitted config or role (toEqual does not read it); a detached agent() answered by the Claude SDK; refusal #1's U5 planted readers G13 (a capabilityGrants grammar reader spelled with escaped hyphens, beside the delivered one in src/workbench/execute.ts) and G13b (the same reader as a new module), whose class test/workbench-claude-tool-grants.test.ts's NOT CLAIMED sentence names (wb-ghki).";
const HEADER_NAMED_RESIDUALS =
  "NAMED RESIDUALS: none - every realized member of refusals #1 and #2 but G13 and G13b is pinned by a row of this file or of test/workbench-claude-tool-grants.test.ts, and every other mode the seat knows is outside the rows, in the NOT CLAIMED sentence.";
const RECEIPT_NOT_CLAIMED =
  "NOT CLAIMED: refusal #1's U5 planted readers G13 and G13b. Their class, a module that parses the grammar under another spelling and a second reader inside a module READERS lists, is in the NOT CLAIMED sentence of test/workbench-claude-tool-grants.test.ts.";
const RECEIPT_NAMED_RESIDUALS = "Named residuals: none (every realized member of refusals #1 and #2 but G13 and G13b is pinned by a row).";
/** The member ids a text names in the refusals' forms (G<n> or G<n>b and CT<n>, refusal #1; GP<n>-<letter><n>, refusal #2), once each, sorted. */
const membersNamed = (text: string): string[] => [...new Set(text.match(/\b(?:G[0-9]+b?|CT[0-9]+|GP[0-9]+-[A-Z][0-9]+)\b/g) ?? [])].sort();
const occurrences = (text: string, pattern: RegExp): number => text.match(pattern)?.length ?? 0;
const opensWith = (text: string, key: string): boolean => text.toLowerCase().startsWith(key.toLowerCase());
/** This file's leading comment as one line: each line's leading comment marker dropped, the lines joined by single spaces. */
function leadingCommentProse(): string {
  const comment = readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/", 1)[0] ?? "";
  return comment
    .split("\n")
    .map(line => line.replace(/^\s*\/?\*+\s?/, "").trim())
    .filter(line => line !== "")
    .join(" ");
}
const isHeadingToken = (token: Token): token is Tokens.Heading => token.type === "heading";
const isListToken = (token: Token): token is Tokens.List => token.type === "list";
const isBlockquoteToken = (token: Token): token is Tokens.Blockquote => token.type === "blockquote";
const isTableToken = (token: Token): token is Tokens.Table => token.type === "table";
/** The text inline tokens render: an HTML token none, a line break a space, markup its children's text. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += " ";
    else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) out += inlineText(token.tokens);
    else if ("text" in token && typeof token.text === "string") out += token.text;
  }
  return out;
}
/**
 * Every markdown heading of a page (one of marked's heading tokens), in document order and at any nesting depth (inside a list item
 * or a block quote too): its level and its text, white space collapsed. A heading written as raw HTML is not one of them: cases A and
 * C refuse every HTML token of the receipt (htmlTokensIn) before they read its headings.
 */
function renderedHeadings(tokens: readonly Token[]): { readonly depth: number; readonly text: string }[] {
  return tokens.flatMap(token => {
    if (isHeadingToken(token)) return [{ depth: token.depth, text: inlineText(token.tokens).replace(/\s+/g, " ").trim() }];
    if (isListToken(token)) return token.items.flatMap(item => renderedHeadings(item.tokens));
    if (isBlockquoteToken(token)) return renderedHeadings(token.tokens);
    return [];
  });
}
/** The markdown headings of the receipt that open with key, letter case ignored. */
const headingsOpening = (markdown: string, key: string) => renderedHeadings(marked.lexer(markdown)).filter(heading => opensWith(heading.text, key));
/**
 * Every HTML token of a page, in document order and at any depth: an HTML block, and an inline tag or comment inside a paragraph, a
 * list item, a block quote, a table cell, a heading, a link or any other token's children.
 */
function htmlTokensIn(tokens: readonly Token[]): Token[] {
  return tokens.flatMap(token => [
    ...(token.type === "html" ? [token] : []),
    ...(isListToken(token) ? token.items.flatMap(item => htmlTokensIn(item.tokens)) : []),
    ...(isTableToken(token) ? [...token.header, ...token.rows.flat()].flatMap(cell => htmlTokensIn(cell.tokens)) : []),
    ...("tokens" in token && Array.isArray(token.tokens) ? htmlTokensIn(token.tokens) : []),
  ]);
}
/** The raw source of every HTML token of the receipt (a comment included); the cases require none. */
const receiptHtml = (markdown: string): string[] => htmlTokensIn(marked.lexer(markdown)).map(token => token.raw);
/** An entry's texts as they render, in order: each top-level list item's and every other block's (an HTML block renders none). */
const entryTexts = (section: DocsSection): string[] =>
  section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : block.kind === "html" ? [] : [block.text]));
const sha256Of = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

describe("wb-ghki: refusal #1's planted readers G13 and G13b in the residual accounting", () => {
  it("entry 2 of the wb-wupg receipt, as it renders: the receipt carries no HTML anywhere, a comment included; exactly one heading opens with '2026-11-06 respin (cut #2):' (letter case ignored) and it is entry 2's own level-2 heading under the receipt's title; the entry carries no HTML, exactly one of its texts opens with 'Falsification on the cut #2 tree', and that item's sentence from 'The planted readers' on is the pinned sentence and names exactly the member ids G13 and G13b", () => {
    const markdown = readFileSync(RECEIPT, "utf8");
    expect(receiptHtml(markdown), "the receipt's HTML").toEqual([]);
    expect(headingsOpening(markdown, ENTRY_2_KEY), "entry 2's heading key").toEqual([{ depth: 2, text: ENTRY_2_HEADING }]);
    const section = docsSection(markdown, ENTRY_2_HEADING, 2, [RECEIPT_TITLE]);
    expect({ why: section.why, hasHtml: section.hasHtml }, "entry 2's binding").toEqual({ why: "", hasHtml: false });
    const falsification = entryTexts(section).filter(text => text.startsWith(ENTRY_2_FALSIFICATION));
    expect(falsification.length, "entry 2's falsification items").toBe(1);
    const item = falsification[0] ?? "";
    const at = item.indexOf("The planted readers");
    const planted = at < 0 ? "" : item.slice(at);
    expect(planted, "entry 2's planted-readers sentence").toBe(ENTRY_2_PLANTED);
    expect(membersNamed(planted), "entry 2's planted readers").toEqual(PLANTED_READERS);
  });

  it("this file's leading comment: 'NOT CLAIMED by this file:' and 'NAMED RESIDUALS:' each occur once (letter case ignored), its NOT CLAIMED and NAMED RESIDUALS sentences are the pinned words, and each names exactly the member ids G13 and G13b", () => {
    const comment = leadingCommentProse();
    expect([occurrences(comment, /not claimed by this file:/gi), occurrences(comment, /named residuals:/gi)], "the comment's sentence openings").toEqual([1, 1]);
    const notClaimed = comment.slice(comment.indexOf("NOT CLAIMED by this file:"), comment.indexOf("NAMED RESIDUALS:")).trim();
    const namedResiduals = comment.slice(comment.indexOf("NAMED RESIDUALS:"));
    expect([notClaimed, namedResiduals], "the comment's two sentences").toEqual([HEADER_NOT_CLAIMED, HEADER_NAMED_RESIDUALS]);
    expect([notClaimed, namedResiduals].map(membersNamed), "the comment's members").toEqual([PLANTED_READERS, PLANTED_READERS]);
  });

  it("the wb-ghki entry of the wb-wupg receipt, as it renders: the receipt carries no HTML anywhere, a comment included; exactly one heading opens with '2026-11-07 receipt: wb-ghki,' (letter case ignored) and it is the entry's own level-2 heading under the receipt's title; the entry carries no HTML; exactly one of its texts opens with 'NOT CLAIMED:' and exactly one with 'Named residuals:' (letter case ignored), each the pinned item and each naming exactly the member ids G13 and G13b; and the entry's source has the pinned sha-256", () => {
    const markdown = readFileSync(RECEIPT, "utf8");
    expect(receiptHtml(markdown), "the receipt's HTML").toEqual([]);
    expect(headingsOpening(markdown, GHKI_ENTRY_KEY), "the wb-ghki entry's heading key").toEqual([{ depth: 2, text: GHKI_ENTRY_HEADING }]);
    const section = docsSection(markdown, GHKI_ENTRY_HEADING, 2, [RECEIPT_TITLE]);
    expect({ why: section.why, hasHtml: section.hasHtml }, "the wb-ghki entry's binding").toEqual({ why: "", hasHtml: false });
    const texts = entryTexts(section);
    const notClaimed = texts.filter(text => opensWith(text, "NOT CLAIMED:"));
    const namedResiduals = texts.filter(text => opensWith(text, "Named residuals:"));
    expect([notClaimed, namedResiduals], "the wb-ghki entry's two items").toEqual([[RECEIPT_NOT_CLAIMED], [RECEIPT_NAMED_RESIDUALS]]);
    expect([...notClaimed, ...namedResiduals].map(membersNamed), "the wb-ghki entry's members").toEqual([PLANTED_READERS, PLANTED_READERS]);
    const source = sectionSource(markdown, GHKI_ENTRY_HEADING);
    expect({ why: source.why, sha256: sha256Of(source.source.trimEnd()) }, "the wb-ghki entry's source").toEqual({ why: "", sha256: GHKI_ENTRY_SHA256 });
  });
});
