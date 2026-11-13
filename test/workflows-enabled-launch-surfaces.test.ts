/**
 * EAT-R485 (wb-hbju, DX P15), from docs/workbench/programs/pi-system-dx-triage-2026-11-11/requirements/.work/
 * req-r-followon.md at master 0a5ac3a3: "With workflowsEnabled:false, every registered scripted-workflow launch surface
 * MUST refuse before starting an embedded or detached host." Claim C062 (ESTABLISHED at ce180d82) found the switch off,
 * workflow_execute and workflow_detached still registered, a detached launch running anyway and the embedded one refused
 * only as a bare launch-failed.
 *
 * PINNED READER SET (this file; each case id leads its case name, and each suite name states its claim):
 *   DOOR-<D1..D5>-<pinned-off|stood-down>, ten cases (DOORS x OFF_STATES). pinned-off: the settings file holds
 *     workflowsEnabled false at boot. stood-down: no setting, and another extension's Workflow tool at session_start, so
 *     the session turns the switch off at run time. Every launch grant is held (workbench:execute, workbench:detach,
 *     workbench:observe, claude:invoke). Each case reads the door's answer:
 *       D1 workflow_execute hostMode embedded: error code workflows-disabled, WORKFLOWS_DISABLED_REASON as its message, and
 *          a reply that carries none of the caller's input value;
 *       D2 workflow_execute hostMode detached: the same code, message and input check;
 *       D3 workflow_detached action launch: the reply is WORKFLOWS_DISABLED_REASON;
 *       D4 SubagentWorkflow: pinned-off, the tool is not registered; stood-down, the registered tool replies
 *          WORKFLOWS_DISABLED_REASON;
 *       D5 --subagents-workflow-file: the startup notice says workflows are off and ends with the setting's pointer;
 *     then, SETTLE_MS (one second) after the door's call (D5: after session start), it reads the START WITNESSES, every
 *     one of them for every door, and each reads nothing. The START WITNESSES: the six RUN_WITNESSES readers (task
 *     minted, runWorkflow call, fleet list row, run notice, workflow entry, workflow-result message), then the
 *     persisted scripts and the reserved invocations.
 *     Falsifier: deleting a door's switch check (D1, D2: the workflowsEnabled dep in src/workbench/execute-tool.ts or its
 *     wiring in src/index.ts; D3 and D4 stood-down: their checks in src/index.ts; D4 pinned-off: the registration gate;
 *     D5: the flag's guard, or only its return, so the off notice is reported and the run still starts, whether or not
 *     it then writes its fleet row, run notice and run records).
 *   FLAG-ON: with the switch pinned on, the --subagents-workflow-file run mints one task, calls runWorkflow once,
 *     registers a fleet list row, reports 'Running workflow r485-pure' and records one workflow entry and one
 *     workflow-result message that carries its return value (RESULT_MARKER); on that settled run each RUN_WITNESSES
 *     reader reads at least one entry, and the readers' entries total the six counts the case reads directly. Falsifier:
 *     a reader dropped from the table, or one that reads nothing on that run, or a flag run that skips one of the
 *     counted records.
 *   CONTROL-ON, CONTROL-AUTO: with the switch pinned on (CONTROL-ON), and with no setting and no other workflow tool
 *     (CONTROL-AUTO), SubagentWorkflow and the D1 launch both launch, each writes its <run>.workflow.js witness file, and
 *     each one's completion notification reads status completed and carries its return value (RESULT_MARKER; EAT-R485
 *     criterion 3); the unset state is the one the stood-down cases start from, so their refusals come from the switch
 *     and not from the boot. Falsifier: a completion that drops its return value (SubagentWorkflow's own, or every run's
 *     while the switch is unpinned), or SubagentWorkflow or the D1 launch refusing in either on state.
 *   INSPECT-<pinned-off|stood-down>: under the switch, workflow_detached inspect of an invocation no launch reserved
 *     answers the native inspect reading and is never the refusal: the reply carries the native no-such-invocation members
 *     (observation unknown, source local-client-transport, transportLoss no-such-invocation), every member but observedAt
 *     equals what connectDetachedWorkflow(<agent dir resolved>/workbench-detached, id).inspect() returns for the same id,
 *     observedAt is an ISO stamp read inside the call, and no invocation directory is reserved. Falsifier: an inspect that
 *     answers the refusal, or a reply that is not that reading (a hand-built {contract, invocationId, observation} snapshot,
 *     always or only while the switch reads off).
 *   SHELL-1, SHELL-2, SHELL-3 (each in both hostModes): createWorkflowExecuteTool with a workflowsEnabled dep
 *     reading false refuses as workflows-disabled with execute and detach held, before resolveSource and before either
 *     launcher; the dep is read on every call (false, then true: refused, then launched); and for an admitted kind
 *     function definition (the wb-ig6n census rows' reviewed function) the switch is read before the kind refusal: off
 *     answers workflows-disabled, on answers unsupported-definition-kind, and neither call resolves a source or launches.
 *     Falsifier: the switch check moved after the kind refusal, or the dep read once instead of on every call.
 *   WORDS-1: WORKFLOWS_DISABLED_REASON names workflowsEnabled, .pi/subagents.json and /agents → Settings → Workflows, and
 *     ends with the sentence the --subagents-workflow-file notice ends with.
 *   FROZEN (registered after the suites): the suite names, the registered cases of each (vitest's task tree: each in run
 *     mode, not inverted, and run before it), the DOORS rows, the RUN_WITNESSES names, and one anchor outside this
 *     file: the launch call sites of every src/**.ts file read as a TypeScript syntax tree (calls of runWorkflowTask, and
 *     calls of launchDetachedWorkflow, bare or as a member, keyed by file and enclosing function, tool name or defineTool
 *     variable) are the DOORS sites, one row per site. Falsifier: a door row removed from every literal here, a launch
 *     call site added to src, or a run witness removed from the table.
 * NOT CLAIMED by this census: inspect of a live existing run (no host is launched here); which code path produced an
 * inspect reply equal to the native reading (a call into connectDetachedWorkflow, or a copy of that whole reading); the
 * real detached launches with the switch on (SHELL-2 drives a stub launcher only;
 * test/workbench-detached-grants.test.ts launches both), so no case here sees a reserved invocation written; the
 * --subagents-workflow-file run with the switch unset and no other workflow tool (FLAG-ON boots it pinned on only); a
 * start no START WITNESS can see (a run whose task createWorkflowTask does not mint and whose script never reaches
 * runWorkflow, or a detached host whose launcher reserves no invocation directory) or one later than SETTLE_MS after
 * the door's call; which START WITNESS a given door's own start would write; a count-preserving swap of a START WITNESS
 * reader or of a call-through spy (a reader or spy moved to another record, file or export that reads as many entries
 * on every case here); the switch's order against the
 * detach-grant conjunction (no case holds workbench:execute alone in hostMode detached with the switch off); the
 * /agents → Settings → Workflows toggle as the way the switch turns off mid-session (it sets the same switch the
 * stood-down cases read, but no case drives it); runs already in flight when the switch turns off; a launch surface of
 * another extension. Skipping the FROZEN case itself is NOT CLAIMED by this census.
 */
import { existsSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { type ExtensionContext, getAgentDir } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";
import subagentsExtension, { WORKFLOW_FILE_FLAG } from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { inspectWorkflowSource, type WorkflowSource } from "../src/workbench/designer.js";
import { EXECUTE_GRANT } from "../src/workbench/execute.js";
import { createWorkflowExecuteTool, DETACH_GRANT, type ExecuteLaunch, WORKFLOWS_DISABLED_REASON, type WorkflowExecuteDeps } from "../src/workbench/execute-tool.js";
import { connectDetachedWorkflow } from "../src/workbench/hosts/local-detached.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { WORKFLOW_ENTRY_TYPE } from "../src/workflow/entry.js";
import * as runtimeModule from "../src/workflow/runtime.js";
import * as taskModule from "../src/workflow/task.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The session id the ctx helper reports. */
const SESSION = "s1";
const LAUNCH_GRANTS: readonly string[] = [EXECUTE_GRANT, DETACH_GRANT, "workbench:observe", "claude:invoke"];
/** A caller input value no refusal may carry back. */
const INPUT_MARKER = "r485-caller-input-marker";
const RESULT_MARKER = "r485-golden-result";
const PURE_SCRIPT = `export const meta={name:"r485-pure",description:"returns a value and calls no agent"}; return "${RESULT_MARKER}";`;
const UNREGISTERED = "(not registered)";
const FLAG_REFUSAL_HEAD = `--${WORKFLOW_FILE_FLAG} ignored: workflows are off.`;
/** The head of the flag run's 'Running workflow' notice. */
const FLAG_RUN_NOTICE_HEAD = "Running workflow ";
/** The fleet list widget key. */
const FLEET_WIDGET = "fleet";
/** How long a DOOR case waits after the door's call (D5: after session start) before it reads the start witnesses. */
const SETTLE_MS = 1_000;
const INSPECT_ID = "r485-inspect-none";

const OFF_STATES = ["pinned-off", "stood-down"] as const;
type OffState = (typeof OFF_STATES)[number];
type BootState = OffState | "pinned-on" | "auto";

/** The launch doors, each keyed by the src launch call site it guards (FROZEN reads those sites from src). */
const DOORS = [
  { id: "D1", door: "workflow_execute hostMode embedded", site: "src/index.ts:launchEmbeddedWorkflow" },
  { id: "D2", door: "workflow_execute hostMode detached", site: "src/index.ts:launchDetachedWorkflow" },
  { id: "D3", door: "workflow_detached action launch", site: "src/index.ts:workflow_detached" },
  { id: "D4", door: "SubagentWorkflow", site: "src/index.ts:workflowTool" },
  { id: "D5", door: "--subagents-workflow-file", site: "src/index.ts:runWorkflowFlag" },
] as const;
type Door = (typeof DOORS)[number];
const DOOR_CASES = DOORS.flatMap(door => OFF_STATES.map(state => ({ ...door, state, caseId: `DOOR-${door.id}-${state}` })));

interface RegisteredTool {
  execute(id: string, params: Record<string, unknown>, signal: undefined, update: undefined, context: ExtensionContext): Promise<{ content: { type: string; text: string }[]; details?: unknown }>;
}
interface ExecuteReply {
  ok: boolean;
  status: string;
  invocationId?: string;
  nativeRefs: NativeRef[];
  error?: { code: string; message: string };
}
interface Notification {
  content: string;
  details?: { id?: string; status?: string };
}

let sandbox: Hermetic | undefined;

const detachedRoot = (): string => join(getAgentDir(), "workbench-detached");
/** The root the INSPECT cases hand connectDetachedWorkflow: the agent dir resolved, then workbench-detached. */
const nativeDetachedRoot = (): string => join(realpathSync(getAgentDir()), "workbench-detached");
/** Invocation directories reserved in this sandbox. */
function reservedInvocations(): string[] {
  return existsSync(detachedRoot()) ? readdirSync(detachedRoot()).sort() : [];
}
/** The scripts the session's launches persisted: the <run>.workflow.js files in the session task directory src's sessionTaskDir names for the sandbox. */
function persistedScripts(cwd: string): string[] {
  return readdirSync(sessionTaskDir(cwd, SESSION)).filter(name => name.endsWith(".workflow.js")).sort();
}
/** A host a broken switch let start is stopped before its sandbox goes, best effort. */
function stopStrayHosts(): void {
  for (const id of reservedInvocations()) {
    const receiptPath = join(detachedRoot(), id, "receipt.json");
    if (!existsSync(receiptPath)) continue;
    const { pid } = JSON.parse(readFileSync(receiptPath, "utf8")) as { pid: number };
    let command = "";
    try { command = readFileSync(`/proc/${pid}/cmdline`, "utf8"); } catch {}
    if (command.includes(join(detachedRoot(), id, "invocation.json"))) {
      try { process.kill(pid, "SIGTERM"); } catch {}
    }
  }
}

afterEach(async () => {
  await flush();
  if (sandbox) stopStrayHosts();
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
}, 60_000);

function settingsFor(state: BootState): Record<string, unknown> {
  const workbench = { workflowAgentBackend: "claude", capabilityGrants: [...LAUNCH_GRANTS] };
  if (state === "pinned-off") return { workflowsEnabled: false, workbench };
  if (state === "pinned-on") return { workflowsEnabled: true, workbench };
  return { workbench };
}

/** Boots the real extension in a fresh sandbox holding the reviewed pure script; `flag` passes it as --subagents-workflow-file. */
async function boot(state: BootState, opts: { flag?: boolean } = {}) {
  sandbox = hermeticDir({ settings: settingsFor(state) });
  const dir = sandbox.dir;
  const scriptPath = join(dir, "pure.js");
  writeFileSync(scriptPath, PURE_SCRIPT);
  // Call-through spies: vi.spyOn calls through, and afterEach's vi.restoreAllMocks() removes them.
  const minted = vi.spyOn(taskModule, "createWorkflowTask");
  const runs = vi.spyOn(runtimeModule, "runWorkflow");
  const booted = makePi(opts.flag ? { [WORKFLOW_FILE_FLAG]: scriptPath } : {});
  subagentsExtension(booted.pi);
  // Standing down: another extension provides a Workflow tool, and the session holds no workflowsEnabled of its own.
  if (state === "stood-down") {
    booted.pi.getAllTools.mockReturnValue([{ name: "Workflow", description: "another extension's workflow tool", sourceInfo: { source: "r485-other-ext", path: "/x/other.ts" } }]);
  }
  const notify = vi.fn();
  const setWidget = vi.fn();
  const context: ExtensionContext = ctx({
    hasUI: true,
    cwd: dir,
    ui: { setStatus: vi.fn(), setWidget, notify, addAutocompleteProvider: vi.fn(), onTerminalInput: vi.fn(() => vi.fn()) },
  });
  await booted.lifecycle.get("session_start")?.({}, context);
  const tool = (name: string): RegisteredTool => {
    const registered: RegisteredTool | undefined = booted.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  const appendEntry = booted.pi.appendEntry as Mock;
  const sendMessage = booted.pi.sendMessage as Mock;
  const notices = (): string[] => notify.mock.calls.map(call => String(call[0]));
  const workflowEntries = (): number => appendEntry.mock.calls.filter(call => call[0] === WORKFLOW_ENTRY_TYPE).length;
  const notifications = (): Notification[] => sendMessage.mock.calls.map(call => call[0] as Notification);
  /** The fleet list widget registrations. */
  const fleetRegistrations = (): number => setWidget.mock.calls.filter(call => call[0] === FLEET_WIDGET && call[1] !== undefined).length;
  /** The workflow-result messages. */
  const resultMessages = (): { content?: string }[] =>
    sendMessage.mock.calls.map(call => call[0] as { customType?: string; content?: string }).filter(message => message.customType === "workflow-result");
  const workflowResults = (): number => resultMessages().length;
  /** The call counts of the two spies above. */
  const tasksMinted = (): number => minted.mock.calls.length;
  const runWorkflowCalls = (): number => runs.mock.calls.length;
  return { booted, context, dir, scriptPath, tool, notices, workflowEntries, notifications, fleetRegistrations, resultMessages, workflowResults, tasksMinted, runWorkflowCalls };
}
type Booted = Awaited<ReturnType<typeof boot>>;

/** A run witness: its name (FROZEN pins the list) and its reader. */
interface RunWitness {
  witness: string;
  read(b: Booted): string[];
}
const counted = (label: string, n: number): string[] => Array.from({ length: n }, (_, index) => `${label} ${index + 1}`);
/** The RUN WITNESSES; FLAG-ON reads every one on a flag run. */
const RUN_WITNESSES: readonly RunWitness[] = [
  { witness: "task minted", read: b => counted("task minted", b.tasksMinted()) },
  { witness: "runWorkflow call", read: b => counted("runWorkflow call", b.runWorkflowCalls()) },
  { witness: "fleet list row", read: b => counted("fleet list row", b.fleetRegistrations()) },
  { witness: "run notice", read: b => b.notices().filter(text => text.startsWith(FLAG_RUN_NOTICE_HEAD)) },
  { witness: "workflow entry", read: b => counted("workflow entry", b.workflowEntries()) },
  { witness: "workflow-result message", read: b => counted("workflow-result message", b.workflowResults()) },
];
const runWitnesses = (b: Booted): string[] => RUN_WITNESSES.flatMap(entry => entry.read(b));
/** The START WITNESSES every DOOR case reads: the RUN WITNESSES, the persisted scripts and the reserved invocations. */
const startWitnesses = (b: Booted): string[] => [...runWitnesses(b), ...persistedScripts(b.dir), ...reservedInvocations()];

async function executeReply(b: Booted, hostMode: "embedded" | "detached"): Promise<{ text: string; reply: ExecuteReply }> {
  const definitionRef = inspectWorkflowSource({ scriptPath: b.scriptPath }, b.dir).definition;
  const result = await b.tool("workflow_execute").execute("r485-execute", { definitionRef, input: { marker: INPUT_MARKER }, hostMode }, undefined, undefined, b.context);
  const text = textOf(result);
  return { text, reply: JSON.parse(text) as ExecuteReply };
}

/** What a door answered, and the start witnesses read SETTLE_MS after the door's call. */
interface Knock {
  answer: string;
  code?: string;
  ok?: boolean;
  text?: string;
  started: readonly string[];
}
/** The door's own answer (D5: its startup notice). */
async function answerOf(b: Booted, door: Door): Promise<Omit<Knock, "started">> {
  switch (door.id) {
    case "D1":
    case "D2": {
      const { text, reply } = await executeReply(b, door.id === "D1" ? "embedded" : "detached");
      return { answer: reply.error?.message ?? "(no error)", code: reply.error?.code, ok: reply.ok, text };
    }
    case "D3": {
      const result = await b.tool("workflow_detached").execute("r485-detached", { action: "launch", invocationId: "r485-d3-launch", scriptPath: b.scriptPath, trustedScript: true }, undefined, undefined, b.context);
      return { answer: textOf(result) };
    }
    case "D4": {
      if (!b.booted.tools.has("SubagentWorkflow")) return { answer: UNREGISTERED };
      const result = await b.tool("SubagentWorkflow").execute("r485-workflow", { scriptPath: b.scriptPath }, undefined, undefined, b.context);
      return { answer: textOf(result) };
    }
    case "D5":
      return { answer: b.notices().find(text => text.startsWith(`--${WORKFLOW_FILE_FLAG}`)) ?? "(no notice)" };
  }
}
async function knock(door: Door, state: OffState): Promise<Knock> {
  const b = await boot(state, { flag: door.id === "D5" });
  const answered = await answerOf(b, door);
  await flush();
  await new Promise(resolve => setTimeout(resolve, SETTLE_MS));
  return { ...answered, started: startWitnesses(b) };
}

describe("EAT-R485 DOOR cases: the five src launch doors, every launch grant held and workflowsEnabled off at boot or at run time, refuse and leave no start witness one second later: no task minted, no runWorkflow call, no persisted script, no reserved invocation, no fleet row, no run notice, no run record", () => {
  for (const c of DOOR_CASES) it(`${c.caseId}: ${c.door}, refused, no start witness one second later`, async () => {
    const k = await knock(c, c.state);
    if (c.id === "D1" || c.id === "D2") {
      expect(k.code).toBe("workflows-disabled");
      expect(k.ok).toBe(false);
      expect(k.answer).toBe(WORKFLOWS_DISABLED_REASON);
      expect(k.text).not.toContain(INPUT_MARKER);
    } else if (c.id === "D5") {
      expect(k.answer.startsWith(FLAG_REFUSAL_HEAD)).toBe(true);
      expect(k.answer.endsWith(`"workflowsEnabled": true\` in .pi/subagents.json.`)).toBe(true);
    } else if (c.id === "D4" && c.state === "pinned-off") {
      expect(k.answer).toBe(UNREGISTERED);
    } else {
      expect(k.answer).toBe(WORKFLOWS_DISABLED_REASON);
    }
    expect(k.started).toEqual([]);
  }, 60_000);
});

/**
 * CONTROL: SubagentWorkflow and the embedded workflow_execute launch, in one session booted in `state`: each is launched,
 * each writes its <run>.workflow.js witness file, and each one's completion notification reads status completed and
 * carries the script's return value.
 */
async function launchesComplete(state: "pinned-on" | "auto"): Promise<void> {
  const b = await boot(state);
  const started = await b.tool("SubagentWorkflow").execute("r485-workflow", { scriptPath: b.scriptPath }, undefined, undefined, b.context);
  expect(textOf(started)).toContain("started in the background");
  const task = (started.details as { taskId?: string } | undefined)?.taskId;
  if (task === undefined) throw new Error(`no task id in ${textOf(started)}`);
  const { reply } = await executeReply(b, "embedded");
  expect(reply).toMatchObject({ ok: true, status: "launched" });
  const run = reply.invocationId;
  if (run === undefined) throw new Error(`no invocation reference in ${JSON.stringify(reply)}`);
  expect(persistedScripts(b.dir)).toEqual([`${run}.workflow.js`, `${task}.workflow.js`].sort());
  for (const id of [task, run]) {
    await vi.waitFor(() => expect(b.notifications().some(n => n.details?.id === id)).toBe(true), { timeout: 30_000 });
    const done = b.notifications().find(n => n.details?.id === id);
    expect(done?.details?.status, `${id} completion status`).toBe("completed");
    expect(done?.content, `${id} completion value`).toContain(RESULT_MARKER);
  }
}

describe("EAT-R485 CONTROL cases: with workflowsEnabled pinned true, or unset with no other workflow tool, SubagentWorkflow and the embedded workflow_execute launch both launch and complete with their return value", () => {
  it("CONTROL-ON: workflowsEnabled pinned true, SubagentWorkflow and the embedded workflow_execute launch both launch, write their witness files and complete with their return value", async () => {
    await launchesComplete("pinned-on");
  }, 60_000);

  it("CONTROL-AUTO: no setting and no other workflow tool, SubagentWorkflow and the embedded workflow_execute launch both launch, write their witness files and complete with their return value", async () => {
    await launchesComplete("auto");
  }, 60_000);
});

describe("EAT-R485 FLAG-ON case: with workflowsEnabled pinned true, the --subagents-workflow-file run mints its task, calls runWorkflow, registers a fleet row, reports its run notice and records its workflow entry and workflow-result message", () => {
  it("FLAG-ON: workflowsEnabled pinned true, the --subagents-workflow-file run mints one task, calls runWorkflow once, registers a fleet row, reports 'Running workflow r485-pure' and records one workflow entry and one workflow-result message carrying its return value", async () => {
    const b = await boot("pinned-on", { flag: true });
    await vi.waitFor(() => expect(b.workflowResults()).toBe(1), { timeout: 30_000 });
    expect(b.notices().filter(text => text.startsWith(`--${WORKFLOW_FILE_FLAG}`))).toEqual([]);
    expect([b.tasksMinted(), b.runWorkflowCalls(), b.workflowEntries(), b.workflowResults()]).toEqual([1, 1, 1, 1]);
    expect(b.fleetRegistrations()).toBeGreaterThan(0);
    const runNotices = b.notices().filter(text => text.startsWith(FLAG_RUN_NOTICE_HEAD));
    expect(runNotices).toHaveLength(1);
    expect(runNotices[0]?.startsWith(`${FLAG_RUN_NOTICE_HEAD}r485-pure`)).toBe(true);
    expect(b.resultMessages()[0]?.content).toContain(RESULT_MARKER);
    // Each RUN_WITNESSES reader reads at least one entry on this run, and the readers' entries total the six counts read
    // above: a reader dropped from the table, or one that reads nothing, reds here.
    expect(RUN_WITNESSES.filter(entry => entry.read(b).length > 0).map(entry => entry.witness)).toEqual([
      "task minted",
      "runWorkflow call",
      "fleet list row",
      "run notice",
      "workflow entry",
      "workflow-result message",
    ]);
    expect(runWitnesses(b)).toHaveLength(b.tasksMinted() + b.runWorkflowCalls() + b.fleetRegistrations() + runNotices.length + b.workflowEntries() + b.workflowResults());
  }, 60_000);
});

describe("EAT-R485 INSPECT cases: under the switch, workflow_detached inspect of an invocation no launch reserved answers the native inspect reading, reserves nothing and is never the refusal", () => {
  it.each(OFF_STATES)("INSPECT-%s: workflow_detached inspect of an unreserved invocation answers the native no-such-invocation reading member for member, never the refusal", async state => {
    const b = await boot(state);
    const before = Date.now();
    const result = await b.tool("workflow_detached").execute("r485-inspect", { action: "inspect", invocationId: INSPECT_ID }, undefined, undefined, b.context);
    const after = Date.now();
    const text = textOf(result);
    expect(text).not.toBe(WORKFLOWS_DISABLED_REASON);
    const { observedAt, ...members } = JSON.parse(text) as Record<string, unknown>;
    // The native read's own no-such-invocation members (src/workbench/hosts/local-detached.ts inspect).
    expect(members).toMatchObject({ contract: "workbench.local-detached/v1", invocationId: INSPECT_ID, observation: "unknown", source: "local-client-transport", transportLoss: "no-such-invocation" });
    // Every member but observedAt equals what connectDetachedWorkflow(<agent dir resolved>/workbench-detached, id).inspect()
    // returns for the same id; observedAt is an ISO stamp read inside the call.
    const { observedAt: nativeObservedAt, ...nativeMembers } = (await connectDetachedWorkflow(nativeDetachedRoot(), INSPECT_ID).inspect()) as unknown as Record<string, unknown>;
    expect(members).toEqual(nativeMembers);
    expect(typeof nativeObservedAt).toBe("string");
    expect(typeof observedAt).toBe("string");
    const stamp = Date.parse(String(observedAt));
    expect(new Date(stamp).toISOString()).toBe(observedAt);
    expect(stamp >= before && stamp <= after, `observedAt ${String(observedAt)} inside the call [${new Date(before).toISOString()}, ${new Date(after).toISOString()}]`).toBe(true);
    expect(reservedInvocations()).toEqual([]);
  }, 60_000);
});

const DIGEST = `sha256:${"ab".repeat(32)}`;
const SOURCE: WorkflowSource = Object.freeze({
  definition: Object.freeze({ kind: "script" as const, id: "/ws/.pi/workflows/r485.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest: DIGEST }),
  sourceRef: "/ws/.pi/workflows/r485.js",
  source: "export const meta = { name: 'r485', description: 'd' }\nreturn 1\n",
});
/** SHELL-3: the reviewed kind function definition the wb-ig6n census rows send; the pure admission admits it, and the shell refuses its kind. */
const FUNCTION_DEFINITION = Object.freeze({ kind: "function" as const, id: "mechanical.development.develop.v1", schemaVersion: "mechanical-workflows/entrypoint/v1", artifactDigest: DIGEST });
/** The shell over stub host deps: grants execute and detach, and a workflowsEnabled dep answering `enabled`. */
function shell(enabled: () => boolean) {
  const resolveSource = vi.fn((): WorkflowSource => SOURCE);
  const launchEmbedded = vi.fn(async (_ctx: ExtensionContext, launch: ExecuteLaunch): Promise<readonly NativeRef[]> => [{ provider: "pi-workflow", type: "task", id: launch.invocationId, scope: "/ws" }]);
  const launchDetached = vi.fn(async (_ctx: ExtensionContext, launch: ExecuteLaunch): Promise<readonly NativeRef[]> => [{ provider: "local-detached", type: "invocation", id: launch.invocationId }]);
  const workflowsEnabled = vi.fn(enabled);
  const deps: WorkflowExecuteDeps = {
    grants: () => [EXECUTE_GRANT, DETACH_GRANT],
    observerScope: () => ({ workspace: "/ws", principal: "local-operator:1000:s1" }),
    localPrincipal: () => "local-operator:1000:s1",
    sessionIdOf: () => SESSION,
    mintInvocationId: () => "wf_r485shell01",
    resolveSource,
    launchEmbedded,
    launchDetached,
    workflowsEnabled,
  };
  const tool = createWorkflowExecuteTool(deps);
  const run = async (hostMode: "embedded" | "detached", definition: WorkflowSource["definition"] = SOURCE.definition): Promise<ExecuteReply> => {
    const params = { definitionRef: { ...definition }, input: { marker: INPUT_MARKER }, hostMode };
    return JSON.parse(textOf(await tool.execute("r485-shell", params as never, undefined, undefined, { cwd: "/ws" } as never))) as ExecuteReply;
  };
  return { run, resolveSource, launchEmbedded, launchDetached, workflowsEnabled };
}

describe("EAT-R485 SHELL cases: the workflow_execute shell reads its workflowsEnabled dep on every call, before the kind refusal, resolveSource and either launcher", () => {
  it.each(["embedded", "detached"] as const)("SHELL-1: hostMode %s, execute and detach held, the switch off: workflows-disabled before resolveSource and either launcher", async hostMode => {
    const h = shell(() => false);
    const reply = await h.run(hostMode);
    expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(reply.error).toEqual({ code: "workflows-disabled", message: WORKFLOWS_DISABLED_REASON });
    expect(reply).not.toHaveProperty("invocationId");
    expect([h.resolveSource.mock.calls.length, h.launchEmbedded.mock.calls.length, h.launchDetached.mock.calls.length]).toEqual([0, 0, 0]);
  });

  it.each(["embedded", "detached"] as const)("SHELL-2: hostMode %s, the switch is read on every call: off then on refuses the first launch and launches the second", async hostMode => {
    const answers = [false, true];
    const h = shell(() => answers.shift() ?? true);
    expect((await h.run(hostMode)).error?.code).toBe("workflows-disabled");
    expect(await h.run(hostMode)).toMatchObject({ ok: true, status: "launched" });
    const launcher = hostMode === "embedded" ? h.launchEmbedded : h.launchDetached;
    expect([h.workflowsEnabled.mock.calls.length, launcher.mock.calls.length]).toEqual([2, 1]);
  });

  it.each(["embedded", "detached"] as const)("SHELL-3: hostMode %s, a kind function definition admitted, execute and detach held: the switch off answers workflows-disabled before the kind refusal, the switch on answers unsupported-definition-kind", async hostMode => {
    const off = shell(() => false);
    const refused = await off.run(hostMode, FUNCTION_DEFINITION);
    expect(refused).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(refused.error).toEqual({ code: "workflows-disabled", message: WORKFLOWS_DISABLED_REASON });
    const on = shell(() => true);
    const kind = await on.run(hostMode, FUNCTION_DEFINITION);
    expect(kind).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
    expect(kind.error?.code).toBe("unsupported-definition-kind");
    expect([off, on].map(h => [h.workflowsEnabled.mock.calls.length, h.resolveSource.mock.calls.length, h.launchEmbedded.mock.calls.length, h.launchDetached.mock.calls.length])).toEqual([
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ]);
  });
});

describe("EAT-R485 WORDS case: the refusal names workflowsEnabled, its settings file and its menu in the --subagents-workflow-file notice's own words", () => {
  it("WORDS-1: the refusal names workflowsEnabled, .pi/subagents.json and the /agents menu, and ends with the --subagents-workflow-file notice's own sentence", async () => {
    expect(typeof WORKFLOWS_DISABLED_REASON).toBe("string");
    for (const fragment of ['"workflowsEnabled": true', ".pi/subagents.json", "/agents → Settings → Workflows"]) expect(WORKFLOWS_DISABLED_REASON).toContain(fragment);
    const b = await boot("pinned-off", { flag: true });
    const notice = b.notices().find(text => text.startsWith(FLAG_REFUSAL_HEAD));
    if (notice === undefined) throw new Error(`no flag refusal among ${JSON.stringify(b.notices())}`);
    const pointer = notice.slice(FLAG_REFUSAL_HEAD.length).trim();
    expect(pointer.length).toBeGreaterThan(0);
    expect(WORKFLOWS_DISABLED_REASON.endsWith(pointer)).toBe(true);
  }, 60_000);
});

/** Every src/**.ts file below `dir`. */
function srcFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return srcFiles(path);
    return name.endsWith(".ts") && !name.endsWith(".d.ts") ? [path] : [];
  });
}
/** The function, tool name or defineTool variable a launch call sits in. */
function enclosingSite(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isObjectLiteralExpression(at)) {
      const name = at.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "name");
      if (name !== undefined && ts.isStringLiteral(name.initializer)) return name.initializer.text;
    }
    if (ts.isVariableDeclaration(at) && ts.isIdentifier(at.name) && at.initializer !== undefined && ts.isCallExpression(at.initializer)
      && ts.isIdentifier(at.initializer.expression) && at.initializer.expression.text === "defineTool") return at.name.text;
  }
  return "(module)";
}
/** Calls that start a run: runWorkflowTask, and launchDetachedWorkflow, bare or as a member. */
function isLaunchCall(callee: ts.Expression): boolean {
  if (ts.isIdentifier(callee)) return callee.text === "runWorkflowTask" || callee.text === "launchDetachedWorkflow";
  return ts.isPropertyAccessExpression(callee) && callee.name.text === "launchDetachedWorkflow";
}
/** The launch call sites of src, read as a syntax tree so comments and strings never count. */
function launchSites(): string[] {
  const sites: string[] = [];
  for (const file of srcFiles(join(REPO, "src"))) {
    const text = readFileSync(file, "utf8");
    if (!text.includes("runWorkflowTask") && !text.includes("launchDetachedWorkflow")) continue;
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && isLaunchCall(node.expression)) sites.push(`${relative(REPO, file).split("\\").join("/")}:${enclosingSite(node)}`);
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return sites.sort();
}

// Registered after the suites, outside every one of them, so a skipped suite still reaches it: the suite names state the
// claims, their registered cases (vitest's task tree) are exactly these, each in run mode, not inverted and run before this
// case, and the DOORS rows are one per launch call site of src, read outside this file.
it("FROZEN: the census suites, their registered cases in run mode, the DOORS rows and the launch call sites of src", ({ task }) => {
  const suites = task.file.tasks.filter(entry => entry.type === "suite");
  expect(suites.map(suite => suite.name)).toEqual([
    "EAT-R485 DOOR cases: the five src launch doors, every launch grant held and workflowsEnabled off at boot or at run time, refuse and leave no start witness one second later: no task minted, no runWorkflow call, no persisted script, no reserved invocation, no fleet row, no run notice, no run record",
    "EAT-R485 CONTROL cases: with workflowsEnabled pinned true, or unset with no other workflow tool, SubagentWorkflow and the embedded workflow_execute launch both launch and complete with their return value",
    "EAT-R485 FLAG-ON case: with workflowsEnabled pinned true, the --subagents-workflow-file run mints its task, calls runWorkflow, registers a fleet row, reports its run notice and records its workflow entry and workflow-result message",
    "EAT-R485 INSPECT cases: under the switch, workflow_detached inspect of an invocation no launch reserved answers the native inspect reading, reserves nothing and is never the refusal",
    "EAT-R485 SHELL cases: the workflow_execute shell reads its workflowsEnabled dep on every call, before the kind refusal, resolveSource and either launcher",
    "EAT-R485 WORDS case: the refusal names workflowsEnabled, its settings file and its menu in the --subagents-workflow-file notice's own words",
  ]);
  const cases = suites.map(suite => (suite.type === "suite" ? suite.tasks.map(entry => entry.name) : []));
  expect(cases).toEqual([
    [
      "DOOR-D1-pinned-off: workflow_execute hostMode embedded, refused, no start witness one second later",
      "DOOR-D1-stood-down: workflow_execute hostMode embedded, refused, no start witness one second later",
      "DOOR-D2-pinned-off: workflow_execute hostMode detached, refused, no start witness one second later",
      "DOOR-D2-stood-down: workflow_execute hostMode detached, refused, no start witness one second later",
      "DOOR-D3-pinned-off: workflow_detached action launch, refused, no start witness one second later",
      "DOOR-D3-stood-down: workflow_detached action launch, refused, no start witness one second later",
      "DOOR-D4-pinned-off: SubagentWorkflow, refused, no start witness one second later",
      "DOOR-D4-stood-down: SubagentWorkflow, refused, no start witness one second later",
      "DOOR-D5-pinned-off: --subagents-workflow-file, refused, no start witness one second later",
      "DOOR-D5-stood-down: --subagents-workflow-file, refused, no start witness one second later",
    ],
    [
      "CONTROL-ON: workflowsEnabled pinned true, SubagentWorkflow and the embedded workflow_execute launch both launch, write their witness files and complete with their return value",
      "CONTROL-AUTO: no setting and no other workflow tool, SubagentWorkflow and the embedded workflow_execute launch both launch, write their witness files and complete with their return value",
    ],
    [
      "FLAG-ON: workflowsEnabled pinned true, the --subagents-workflow-file run mints one task, calls runWorkflow once, registers a fleet row, reports 'Running workflow r485-pure' and records one workflow entry and one workflow-result message carrying its return value",
    ],
    [
      "INSPECT-pinned-off: workflow_detached inspect of an unreserved invocation answers the native no-such-invocation reading member for member, never the refusal",
      "INSPECT-stood-down: workflow_detached inspect of an unreserved invocation answers the native no-such-invocation reading member for member, never the refusal",
    ],
    [
      "SHELL-1: hostMode embedded, execute and detach held, the switch off: workflows-disabled before resolveSource and either launcher",
      "SHELL-1: hostMode detached, execute and detach held, the switch off: workflows-disabled before resolveSource and either launcher",
      "SHELL-2: hostMode embedded, the switch is read on every call: off then on refuses the first launch and launches the second",
      "SHELL-2: hostMode detached, the switch is read on every call: off then on refuses the first launch and launches the second",
      "SHELL-3: hostMode embedded, a kind function definition admitted, execute and detach held: the switch off answers workflows-disabled before the kind refusal, the switch on answers unsupported-definition-kind",
      "SHELL-3: hostMode detached, a kind function definition admitted, execute and detach held: the switch off answers workflows-disabled before the kind refusal, the switch on answers unsupported-definition-kind",
    ],
    [
      "WORDS-1: the refusal names workflowsEnabled, .pi/subagents.json and the /agents menu, and ends with the --subagents-workflow-file notice's own sentence",
    ],
  ]);

  const walked: Array<{ name: string; mode: string; fails: boolean; state: string | undefined; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(walked.map(entry => entry.name)).toEqual([...cases.flat(), task.name]);
  const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
  expect(
    walked.filter(entry => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`),
    "every other case is in run mode, not inverted, and ran before this one",
  ).toEqual([]);

  expect(DOORS.map(door => `${door.id}|${door.door}|${door.site}`)).toEqual([
    "D1|workflow_execute hostMode embedded|src/index.ts:launchEmbeddedWorkflow",
    "D2|workflow_execute hostMode detached|src/index.ts:launchDetachedWorkflow",
    "D3|workflow_detached action launch|src/index.ts:workflow_detached",
    "D4|SubagentWorkflow|src/index.ts:workflowTool",
    "D5|--subagents-workflow-file|src/index.ts:runWorkflowFlag",
  ]);
  const sites = launchSites();
  expect(sites.length, `src launch call sites: ${sites.join(", ")}`).toBe(DOORS.length);
  expect(DOORS.map(door => door.site).sort()).toEqual(sites);
  expect(RUN_WITNESSES.map(entry => entry.witness)).toEqual([
    "task minted",
    "runWorkflow call",
    "fleet list row",
    "run notice",
    "workflow entry",
    "workflow-result message",
  ]);
});
