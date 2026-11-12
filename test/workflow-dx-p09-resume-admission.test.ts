/**
 * workflow-dx-p09-resume-admission.test.ts — wb-q0on, EAT-R357, EAT-R359, EAT-R360 and EAT-R362 (program
 * pi-system-dx-triage-2026-11-11, requirements/.work/req-r-ops.md), plus the registered half of EAT-R364. Resume
 * admission as the booted extension's REGISTERED tools serve it: SubagentWorkflow, workflow_reconcile,
 * workflow_observe and the /agents → Workflows dialog, each captured from src/index.ts's own registration. A second
 * makePi()+subagentsExtension() instance over the same workspace and session is a restarted Pi process. Nothing is
 * mocked; journal rows are planted with the product's own appendJournal, as the landed reconcile wiring suite does.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - R357-C1: after a restart, workflow_reconcile inspect resolves the earlier run from its host-scoped files and lists
 *    the unsettled dispatched marker as a pending position, SubagentWorkflow resume names that marker, and the recovered
 *    run is not one workflow_observe serves (it stays out of the session's own run list).
 *  - R357-C2: that resume launches nothing (no new run script, no notification, journal bytes unchanged); its text
 *    carries none of the unconditional fresh-run phrasings ("No workflow run", "Nothing has run yet", "call this
 *    without `resumeFromRunId`", "for a fresh run.") and does carry the conditional one ("only once the producer's
 *    evidence shows it did not take effect"); once the operator acknowledges the position from the restarted process
 *    the resume launches with text naming the unsettled dispatched call at position 0 and completes with the position
 *    reconciled.
 *  - R357-C3: a restarted process under another session id, or in another workspace, cannot inspect or resume the run,
 *    and a path-shaped run id is refused with the unknown-run text.
 *  - R359-C1: an override authorized before the source journal turns read-only refuses the resume typed
 *    (spend-not-persisted) with nothing launched and the journal bytes unchanged.
 *  - R359-C2: on a writable journal the resume spends the override once and the next resume finds it consumed.
 *  - R360-C1: a journal holding an unknown-kind row refuses the resume with the classifier's verdict and its bounded
 *    warning, with nothing launched.
 *  - R360-C2: a readable agent journal still replays (legacy host, no basis), an unclassified node row still stops the
 *    resume fail-closed, and a truncated final line alone does not refuse.
 *  - R362-C1: a paused run refuses a resume typed still-live with nothing launched; R362-C2: once stopped it is
 *    admissible.
 *  - R364-REG: a node schema refusal through the registered path reaches workflow_observe's envelope and the
 *    completion notification with its category, path and constraint.
 * NOT CLAIMED by this file: a provider invocation count (no shipped capability is non-read, so no registered path
 * reaches an effect; test/workflow-dx-p09-replay-decline.test.ts and the node-admission suite count stand-in
 * invocations), a run live in another process, and the detached host's resume.
 */

import { appendFileSync, chmodSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { appendJournal, journalKey, nodeJournalKey, readJournal } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const scratch: string[] = [];
const readOnly: string[] = [];
afterEach(() => {
  for (const path of readOnly.splice(0)) chmodSync(path, 0o600);
  sandbox?.restore();
  sandbox = undefined;
  removeScratch(...scratch.splice(0));
  vi.restoreAllMocks();
});

const PURE = 'export const meta={name:"dx-p09-resume",description:"pure"}; return 1;';
const NODE_INPUT = { value: "x" };
const NODE_SCRIPT = 'export const meta={name:"dx-p09-resume",description:"node"}; return await node("furnace.run.start", { value: "x" });';
const HOLD = 'export const meta={name:"dx-p09-hold",description:"held"}; const answer = await agent("hold until resumed"); return answer;';
const OBSERVE = "workbench:observe";

type Booted = { pi: ReturnType<typeof makePi>; context: ExtensionContext; dir: string };

/** A fresh extension instance over `dir` under `sessionId`: a second call over the same dir is a restarted process. */
async function bootAt(dir: string, sessionId = "s1"): Promise<Booted> {
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context: ExtensionContext = ctx({ cwd: dir, sessionManager: { getSessionId: vi.fn(() => sessionId), getBranch: vi.fn(() => []) } });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir };
}

async function boot(rights: readonly string[], backend: "claude" | "pi" = "claude"): Promise<Booted> {
  sandbox = hermeticDir({ settings: backend === "claude"
    ? { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } }
    : { workflowsEnabled: true } });
  return bootAt(sandbox.dir);
}

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 600; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

const notified = (booted: Booted, taskId: string) =>
  booted.pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId));
const notificationOf = (booted: Booted, taskId: string): string => {
  const call = booted.pi.pi.sendMessage.mock.calls.find(([item]: [{ content?: unknown }]) => typeof item.content === "string" && item.content.includes(`<task-id>${taskId}</task-id>`));
  return String(call?.[0]?.content ?? "");
};

async function launch(booted: Booted, params: Record<string, unknown>) {
  const result = await booted.pi.tools.get("SubagentWorkflow").execute(`dx-${Math.random()}`, params, undefined, undefined, booted.context);
  return { text: textOf(result), taskId: (result.details as { taskId?: string } | undefined)?.taskId };
}

async function settled(booted: Booted, params: Record<string, unknown>) {
  const launched = await launch(booted, params);
  if (launched.taskId === undefined) throw new Error(`no run started: ${launched.text}`);
  await waitFor(() => notified(booted, launched.taskId!));
  return launched.taskId;
}

async function reconcile(booted: Booted, params: Record<string, unknown>) {
  return textOf(await booted.pi.tools.get("workflow_reconcile").execute("dx-reconcile", params, undefined, undefined, booted.context));
}

async function observe(booted: Booted, taskId: string) {
  return JSON.parse(textOf(await booted.pi.tools.get("workflow_observe").execute("dx-observe", { taskId }, undefined, undefined, booted.context)));
}

const taskDir = (booted: Booted, sessionId = "s1") => sessionTaskDir(booted.dir, sessionId);
const runScripts = (booted: Booted, sessionId = "s1") => readdirSync(taskDir(booted, sessionId)).filter(name => name.endsWith(".workflow.js")).sort();
const journalOf = (booted: Booted, taskId: string, sessionId = "s1") => join(taskDir(booted, sessionId), `${taskId}.workflow.jsonl`);

/** A settled pure run with one journaled effect row planted at node position 0 (`dispatched` plants the marker form). */
async function journaledRun(booted: Booted, options: { dispatched?: boolean; capabilityId?: string } = {}) {
  const capabilityId = options.capabilityId ?? "furnace.run.start";
  const taskId = await settled(booted, { script: PURE });
  const journalPath = journalOf(booted, taskId);
  appendJournal(journalPath, {
    index: 0, key: nodeJournalKey(capabilityId, JSON.stringify(NODE_INPUT)), ok: options.dispatched !== true, kind: "node",
    capabilityId, effectClass: "external", ...(options.dispatched === true ? { dispatched: true as const } : {}),
  });
  return { taskId, journalPath };
}

describe("EAT-R357: a journal-backed run is recovered from its host-scoped files after a restart", () => {
  it("R357-C1 and R357-C2: the restarted process inspects the unsettled marker, refuses the resume without dispatching or advising a fresh run, and resumes once acknowledged", async () => {
    const rights = [OBSERVE, "reconcile:furnace.acknowledge"];
    const first = await boot(rights);
    const { taskId, journalPath } = await journaledRun(first, { dispatched: true });
    await first.pi.lifecycle.get("session_shutdown")?.({}, first.context);

    const restarted = await bootAt(first.dir);
    const roster = JSON.parse(await reconcile(restarted, { taskId, action: "inspect" }));
    expect(roster.positions[0]).toMatchObject({ position: 0, capabilityId: "furnace.run.start", state: "pending" });
    const unobserved = textOf(await restarted.pi.tools.get("workflow_observe").execute("dx-observe", { taskId }, undefined, undefined, restarted.context));
    expect(unobserved).toContain("Workflow unavailable");

    const before = readFileSync(journalPath, "utf-8");
    const scripts = runScripts(restarted);
    const calls = restarted.pi.pi.sendMessage.mock.calls.length;
    const refused = await launch(restarted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    expect(refused.taskId).toBeUndefined();
    expect(refused.text).not.toMatch(/No workflow run/);
    expect(refused.text).toMatch(/position 0/);
    expect(refused.text).toMatch(/dispatched/);
    expect(refused.text).not.toMatch(/Nothing has run yet|call this without `resumeFromRunId`|for a fresh run\./);
    expect(refused.text).toContain("only once the producer's evidence shows it did not take effect");
    expect(runScripts(restarted)).toEqual(scripts);
    expect(readFileSync(journalPath, "utf-8")).toBe(before);
    expect(restarted.pi.pi.sendMessage.mock.calls.length).toBe(calls);

    const acknowledged = JSON.parse(await reconcile(restarted, {
      taskId, action: "acknowledge", position: 0, reason: "checked by hand after the restart", determination: "indeterminate", noEvidenceReason: "producer-unavailable",
    }));
    expect(acknowledged).toMatchObject({ phase: "recorded", decision: "acknowledge" });
    const resumed = await launch(restarted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    expect(resumed.text).toContain("1 dispatched call with no settled record (position 0) may have taken effect");
    const resumedId = resumed.taskId;
    if (resumedId === undefined) throw new Error(resumed.text);
    await waitFor(() => notified(restarted, resumedId));
    expect((await observe(restarted, resumedId)).status).toBe("completed");
    expect(notificationOf(restarted, resumedId)).toContain("1 node reconciled by operator");
  }, 60_000);

  it("R357-C3: another session, another workspace and a path-shaped id can neither inspect nor resume the run", async () => {
    const first = await boot([OBSERVE, "reconcile:furnace.acknowledge"]);
    const { taskId } = await journaledRun(first, { dispatched: true });
    await first.pi.lifecycle.get("session_shutdown")?.({}, first.context);

    const unknown = await reconcile(await bootAt(first.dir), { taskId: "wf_nosuchrun1", action: "inspect" });
    const otherSession = await bootAt(first.dir, "s2");
    expect(await reconcile(otherSession, { taskId, action: "inspect" })).toBe(unknown);
    expect((await launch(otherSession, { script: NODE_SCRIPT, resumeFromRunId: taskId })).text).toMatch(new RegExp(`No workflow run "${taskId}"`));

    const elsewhere = makeScratch("dx-p09-elsewhere-");
    scratch.push(elsewhere);
    mkdirSync(join(elsewhere, ".pi"), { recursive: true });
    writeFileSync(join(elsewhere, ".pi", "subagents.json"), readFileSync(join(first.dir, ".pi", "subagents.json"), "utf-8"));
    const otherWorkspace = await bootAt(elsewhere);
    expect(await reconcile(otherWorkspace, { taskId, action: "inspect" })).toBe(unknown);
    expect((await launch(otherWorkspace, { script: NODE_SCRIPT, resumeFromRunId: taskId })).text).toMatch(new RegExp(`No workflow run "${taskId}"`));

    const sameScope = await bootAt(first.dir);
    const pathShaped = await launch(sameScope, { script: NODE_SCRIPT, resumeFromRunId: `${taskId}/../${taskId}` });
    expect(pathShaped.taskId).toBeUndefined();
    expect(pathShaped.text).toMatch(/No workflow run/);
  }, 60_000);
});

describe("EAT-R359: an override spend that cannot persist refuses the resume", () => {
  async function overriddenRun() {
    const booted = await boot([OBSERVE, "reconcile:furnace.acknowledge", "reconcile:furnace.override"]);
    const { taskId, journalPath } = await journaledRun(booted);
    const absent = JSON.parse(await reconcile(booted, {
      taskId, action: "acknowledge", position: 0, reason: "nothing exists under that reference", determination: "effect-absent", noEvidenceReason: "producer-unavailable",
    }));
    const recorded = JSON.parse(await reconcile(booted, {
      taskId, action: "override", position: 0, reason: "re-run it once", acknowledgementId: absent.acknowledgementId,
      confirmed: true, confirmPosition: 0, confirmCapabilityId: "furnace.run.start", acceptDuplicateRisk: true,
    }));
    expect(recorded).toMatchObject({ phase: "recorded", decision: "override" });
    return { booted, taskId, journalPath };
  }

  it("R359-C1: a read-only source journal refuses the resume typed, launches nothing and leaves the journal bytes unchanged", async () => {
    const { booted, taskId, journalPath } = await overriddenRun();
    chmodSync(journalPath, 0o444);
    readOnly.push(journalPath);
    const before = readFileSync(journalPath, "utf-8");
    const scripts = runScripts(booted);
    const calls = booted.pi.pi.sendMessage.mock.calls.length;

    const refused = await launch(booted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    expect(refused.taskId).toBeUndefined();
    expect(refused.text).toMatch(/spend-not-persisted/);
    expect(refused.text).toMatch(/override/);
    expect(runScripts(booted)).toEqual(scripts);
    expect(readFileSync(journalPath, "utf-8")).toBe(before);
    expect(booted.pi.pi.sendMessage.mock.calls.length).toBe(calls);
  }, 60_000);

  it("R359-C2: a writable source journal spends the override once and the next resume finds it consumed", async () => {
    const { booted, taskId, journalPath } = await overriddenRun();
    const resumedId = await settled(booted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    const spent = readJournal(journalPath).filter(entry => entry.kind === "override" && entry.reconcile?.decision === "override" && entry.reconcile.consumed !== undefined);
    expect(spent).toHaveLength(1);
    expect(spent[0]?.reconcile).toMatchObject({ consumed: { outcome: "spent-at-resume-start", byRunId: resumedId } });
    const againId = await settled(booted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    const again = await observe(booted, againId);
    expect(again.status).toBe("failed");
    expect(again.error).toContain("consumed");
  }, 60_000);
});

describe("EAT-R360: resume admission classifies the raw source journal first", () => {
  it("R360-C1: an unknown-kind row refuses the resume with the verdict and a bounded warning, launching nothing", async () => {
    const booted = await boot([OBSERVE]);
    const taskId = await settled(booted, { script: PURE });
    const journalPath = journalOf(booted, taskId);
    appendFileSync(journalPath, `${JSON.stringify({ index: 0, key: "k0", ok: true, kind: "effect-v9", capabilityId: "furnace.run.start", effectClass: "external" })}\n`);
    const scripts = runScripts(booted);

    const refused = await launch(booted, { script: NODE_SCRIPT, resumeFromRunId: taskId });
    expect(refused.taskId).toBeUndefined();
    expect(refused.text).toMatch(/journal-unsupported/);
    expect(refused.text).toMatch(/verdict unsupported/);
    expect(refused.text).toContain("journal unsupported:");
    expect(refused.text).toMatch(/unknown-kind/);
    expect(refused.text.length).toBeLessThanOrEqual(2_000);
    expect(runScripts(booted)).toEqual(scripts);
  }, 60_000);

  it("R360-C2: a readable agent journal replays, an unclassified node row stops fail-closed, and a truncated final line alone is admitted", async () => {
    const legacy = await boot([], "pi");
    const agentRun = await settled(legacy, { script: PURE });
    appendJournal(journalOf(legacy, agentRun), { index: 0, key: journalKey({ prompt: "recorded probe" }), ok: true, text: "recorded answer" });
    appendFileSync(journalOf(legacy, agentRun), '{"index":1,"key":"half-writ');
    const replayedId = await settled(legacy, { script: 'export const meta={name:"dx-p09-replay",description:"agent"}; return await agent("recorded probe");', resumeFromRunId: agentRun });
    const replayed = notificationOf(legacy, replayedId);
    expect(replayed).toContain(`1 replayed from ${agentRun}`);
    expect(replayed).toContain("recorded answer");
    await legacy.pi.lifecycle.get("session_shutdown")?.({}, legacy.context);
    sandbox?.restore();
    sandbox = undefined;

    const booted = await boot([OBSERVE]);
    const nodeRun = await settled(booted, { script: PURE });
    appendJournal(journalOf(booted, nodeRun), { index: 0, key: nodeJournalKey("furnace.run.start", JSON.stringify(NODE_INPUT)), ok: true, kind: "node", capabilityId: "furnace.run.start" });
    const stoppedId = await settled(booted, { script: NODE_SCRIPT, resumeFromRunId: nodeRun });
    const stopped = await observe(booted, stoppedId);
    expect(stopped.status).toBe("failed");
    expect(stopped.error).toContain("no effect class");
  }, 60_000);
});

/** The /agents → Workflows dialog of `booted`, opened on its only run. */
async function openDialog(booted: Booted) {
  const notes: string[] = [];
  let entryTaken = false;
  let dialog: { handleInput(data: string): void } | undefined;
  const command = booted.pi.commands.get("agents");
  const uiContext = ctx({
    cwd: booted.dir,
    ui: {
      notify: vi.fn((text: string) => { notes.push(text); }),
      select: vi.fn(async (title: string, options: string[]) => {
        if (title !== "Agents" || entryTaken) return undefined;
        entryTaken = true;
        return options.find(option => /^Workflows \(\d+\)$/.test(option));
      }),
      custom: vi.fn(async (factory: (...args: unknown[]) => unknown) => {
        dialog = factory({ requestRender: () => {} }, { fg: (_c: string, t: string) => t, bold: (t: string) => t }, {}, () => {}) as { handleInput(data: string): void };
        return undefined;
      }),
    },
  });
  await command.handler("", uiContext);
  if (dialog === undefined) throw new Error("the Workflows dialog did not open");
  return { dialog, notes };
}

describe("EAT-R362: a paused run is still live and is never a resume source", () => {
  it("R362-C1 and R362-C2: paused refuses still-live with nothing launched; stopped is admissible", async () => {
    const booted = await boot([], "pi");
    const held = await launch(booted, { script: HOLD });
    if (held.taskId === undefined) throw new Error(held.text);
    const { dialog, notes } = await openDialog(booted);
    dialog.handleInput("p");
    expect(notes.at(-1)).toMatch(/Paused/);
    const scripts = runScripts(booted);

    const refused = await launch(booted, { script: PURE, resumeFromRunId: held.taskId });
    expect(refused.taskId).toBeUndefined();
    expect(refused.text).toMatch(/still-live/);
    expect(refused.text).toMatch(/paused/);
    expect(runScripts(booted)).toEqual(scripts);

    dialog.handleInput("x");
    await waitFor(() => notified(booted, held.taskId!));
    const admitted = await launch(booted, { script: PURE, resumeFromRunId: held.taskId });
    expect(admitted.taskId).toBeDefined();
    expect(admitted.text).toMatch(/started in the background/);
    await waitFor(() => notified(booted, admitted.taskId!));
  }, 60_000);
});

describe("EAT-R364 (registered): a node schema refusal reaches the observe envelope and the notification", () => {
  it("R364-REG: category, path and constraint survive to workflow_observe and the completion notification", async () => {
    const booted = await boot([OBSERVE, "furnace:inspect"]);
    const taskId = await settled(booted, { script: 'export const meta={name:"dx-p09-schema",description:"node"}; return await node("furnace.run.inspect", { runId: 5 });' });
    const observed = await observe(booted, taskId);
    expect(observed.status).toBe("failed");
    expect(observed.capabilityError).toMatchObject({ category: "validation", path: "/runId", constraint: expect.stringContaining("string") });
    const line = notificationOf(booted, taskId).split("\n").find(row => row.startsWith("<capability-error>"));
    expect(line).toMatch(/category validation/);
    expect(line).toMatch(/path \/runId/);
  }, 60_000);
});
