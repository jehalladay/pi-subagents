/**
 * workflow-dx-p09-stand-in-counts.test.ts — wb-q0on: the invocation counts of EAT-R357, EAT-R359 and EAT-R362 (program
 * pi-system-dx-triage-2026-11-11, requirements/.work/req-r-ops.md) measured on an effect STAND-IN. No shipped
 * capability is non-read, so no registered path reaches an effect (C145); the counts are read here, on a write FIXTURE
 * registered in a REAL CapabilityRegistry behind the REAL Claude host, under the runtime's own admission. Operator
 * decision rows are minted by the booted extension's registered workflow_reconcile, and the override spend is the
 * product's spendOverridesAtResume, the function SubagentWorkflow's resume admission calls.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - R357-C2-INVOKE: a resume over a journal whose position 0 holds an unsettled dispatched marker refuses typed
 *    uncertain-effect, invokes the stand-in zero times, and its refusal advises a fresh run only conditionally.
 *  - R359-C2-INVOKE: after spendOverridesAtResume spends the recorded override on a writable journal, the first resume
 *    invokes the stand-in once and a second resume, over the journal as it then reads, invokes it zero more times.
 *  - R359-C1-SPEND: on a read-only journal spendOverridesAtResume refuses typed spend-not-persisted and leaves the
 *    journal bytes unchanged.
 *  - R362-C1-UNIT: resolveResumeTarget refuses running and paused sources typed still-live and admits completed and
 *    killed ones.
 *  - R357-C3-UNIT: resolveResumeTarget hands its disk-recovery callback only an id of the run-id shape: a path-shaped id
 *    is refused typed unknown-run without calling it, a well-formed unknown id calls it once, and what it recovers is
 *    admitted marked recovered.
 *  - R362-C2-UNPAUSE: a run paused before its agent starts and unpaused later spawns that agent exactly once.
 * NOT CLAIMED by this file: native producers, a spend whose append succeeds but whose readback disagrees, and the
 * registered refusal texts (test/workflow-dx-p09-resume-admission.test.ts pins those).
 */

import { chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { appendJournal, nodeJournalKey, readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { spendOverridesAtResume } from "../src/workflow/resume-admission.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { createWorkflowTask, resolveResumeTarget, type WorkflowTask } from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const readOnly: string[] = [];
afterEach(() => {
  for (const path of readOnly.splice(0)) chmodSync(path, 0o600);
  sandbox?.restore();
  sandbox = undefined;
});

const NODE_INPUT = { value: "x" };
const SCRIPT = 'export const meta={name:"dx-p09-stand-in",description:"node"}; return await node("furnace.run.start", { value: "x" });';
/** Not a shipped capability: the id carries a producer the reconcile core authorizes, and only this file registers it. */
const STAND_IN = "furnace.run.start";
const KEY = nodeJournalKey(STAND_IN, JSON.stringify(NODE_INPUT));

function standIn() {
  const invocations: unknown[] = [];
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: { id: STAND_IN, version: "1.0.0", description: "write STAND-IN, no real effect", inputSchema: { type: "object" }, effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"] },
    async invoke(input) { invocations.push(input); return { written: true }; },
  });
  const host = createClaudeWorkflowHost({ cwd: process.cwd(), capabilities: registry, grants: ["fixture:write"], invocationId: "dx-p09-stand-in", principal: { id: "local-operator:fixture", role: "local-operator" } });
  return { host, invocations };
}

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 600; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

/** A settled run of the booted extension with a journaled stand-in effect at position 0 and an operator override recorded on it. */
async function overriddenJournal() {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:observe", "reconcile:furnace.acknowledge", "reconcile:furnace.override"] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context: ExtensionContext = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const launched = await pi.tools.get("SubagentWorkflow").execute("stand-in", { script: 'export const meta={name:"dx-p09-stand-in",description:"pure"}; return 1;' }, undefined, undefined, context);
  const taskId = launched.details.taskId as string;
  await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId)));
  const journalPath = join(sessionTaskDir(sandbox.dir, "s1"), `${taskId}.workflow.jsonl`);
  appendJournal(journalPath, { index: 0, key: KEY, ok: true, kind: "node", capabilityId: STAND_IN, effectClass: "write" });
  const tool = pi.tools.get("workflow_reconcile");
  const reconcile = async (params: Record<string, unknown>) => JSON.parse(textOf(await tool.execute("stand-in-reconcile", { taskId, ...params }, undefined, undefined, context)));
  const absent = await reconcile({ action: "acknowledge", position: 0, reason: "nothing exists under that reference", determination: "effect-absent", noEvidenceReason: "producer-unavailable" });
  const override = await reconcile({ action: "override", position: 0, reason: "re-run it once", acknowledgementId: absent.acknowledgementId, confirmed: true, confirmPosition: 0, confirmCapabilityId: STAND_IN, acceptDuplicateRisk: true });
  expect(override).toMatchObject({ phase: "recorded", decision: "override" });
  return { journalPath };
}

describe("EAT-R357: a marker-bound resume invokes the stand-in zero times", () => {
  it("R357-C2-INVOKE: an unsettled dispatched marker refuses typed, invokes nothing and advises a fresh run only conditionally", async () => {
    const { host, invocations } = standIn();
    const marker: WorkflowJournalEntry = { index: 0, key: KEY, ok: false, kind: "node", capabilityId: STAND_IN, effectClass: "write", dispatched: true };
    const result = await runWorkflow({ script: SCRIPT, host, journal: { entries: [marker], append: () => true } });
    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(invocations).toEqual([]);
    expect(result.error).not.toContain("re-run without resumeFromRunId for a fresh run");
    expect(result.error).toMatch(/only once the producer/);
  });
});

describe("EAT-R359: one authorized re-run per spent override", () => {
  it("R359-C2-INVOKE: the spend persists, the first resume invokes once and the second invokes zero more times", async () => {
    const { journalPath } = await overriddenJournal();
    const { host, invocations } = standIn();

    const first = readJournal(journalPath);
    const spend = spendOverridesAtResume(journalPath, first, { byRunId: "wf_standin001", at: new Date().toISOString() });
    expect(spend).toMatchObject({ ok: true, spent: 1 });
    const resumed = await runWorkflow({ script: SCRIPT, host, journal: { entries: first, append: () => true } });
    expect(resumed.status).toBe("completed");
    expect(invocations).toHaveLength(1);

    const second = readJournal(journalPath);
    expect(spendOverridesAtResume(journalPath, second, { byRunId: "wf_standin002", at: new Date().toISOString() })).toMatchObject({ ok: true, spent: 0 });
    const again = await runWorkflow({ script: SCRIPT, host, journal: { entries: second, append: () => true } });
    expect(again.status).toBe("failed");
    expect(again.error).toContain("consumed");
    expect(invocations).toHaveLength(1);
  }, 60_000);

  it("R359-C1-SPEND: a read-only journal refuses the spend typed and keeps its bytes", async () => {
    const { journalPath } = await overriddenJournal();
    chmodSync(journalPath, 0o444);
    readOnly.push(journalPath);
    const before = readFileSync(journalPath, "utf-8");
    const spend = spendOverridesAtResume(journalPath, readJournal(journalPath), { byRunId: "wf_standin003", at: new Date().toISOString() });
    expect(spend).toMatchObject({ ok: false, code: "spend-not-persisted" });
    expect(readFileSync(journalPath, "utf-8")).toBe(before);
  }, 60_000);
});

describe("EAT-R362: still-live sources and one invocation across a pause", () => {
  const taskIn = (status: WorkflowTask["status"]): Map<string, WorkflowTask> => {
    const task = createWorkflowTask({ id: "wf_r362unit1", script: "", journalPath: "/nonexistent/wf_r362unit1.workflow.jsonl", scriptPath: "/nonexistent/wf_r362unit1.workflow.js" });
    task.status = status;
    return new Map([[task.id, task]]);
  };

  it.each(["running", "paused"] as const)("R362-C1-UNIT: a %s source is refused typed still-live", status => {
    expect(resolveResumeTarget("wf_r362unit1", taskIn(status))).toMatchObject({ ok: false, code: "still-live" });
  });

  it.each(["completed", "killed"] as const)("R362-C1-UNIT: a %s source is admitted", status => {
    expect(resolveResumeTarget("wf_r362unit1", taskIn(status))).toMatchObject({ ok: true, runId: "wf_r362unit1" });
  });

  it("R357-C3-UNIT: the recovery callback sees only ids of the run-id shape", () => {
    const asked: string[] = [];
    const recover = (runId: string) => {
      asked.push(runId);
      return runId === "wf_recovered1" ? { journalPath: "/nonexistent/wf_recovered1.workflow.jsonl", scriptPath: "/nonexistent/wf_recovered1.workflow.js" } : undefined;
    };
    expect(resolveResumeTarget("wf_recovered1/../wf_other1", new Map(), recover)).toMatchObject({ ok: false, code: "unknown-run" });
    expect(asked).toEqual([]);
    expect(resolveResumeTarget("wf_unknown01", new Map(), recover)).toMatchObject({ ok: false, code: "unknown-run" });
    expect(resolveResumeTarget("wf_recovered1", new Map(), recover)).toMatchObject({ ok: true, runId: "wf_recovered1", recovered: true });
    expect(asked).toEqual(["wf_unknown01", "wf_recovered1"]);
  });

  it("R362-C2-UNPAUSE: paused before its agent starts and unpaused, the run spawns that agent exactly once", async () => {
    const spawned: string[] = [];
    const host: WorkflowHost = {
      async spawnAgent(request) { spawned.push(request.prompt); return { ok: true, text: "live" }; },
      abortAgent() {},
    };
    const result = await runWorkflow({
      script: 'export const meta={name:"dx-p09-pause",description:"pause"}; return await agent("held");',
      host,
      onControl: control => {
        control.pause();
        setTimeout(() => { control.resume(); }, 100);
      },
    });
    expect(result.status).toBe("completed");
    expect(spawned).toEqual(["held"]);
  });
});
