/**
 * workflow-dx-p09-notification.test.ts — wb-q0on, EAT-R364 and EAT-R365 (program pi-system-dx-triage-2026-11-11,
 * requirements/.work/req-r-ops.md). What a settled run's task record and its completion notification say about the
 * run's capability failure and its agent counts.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - R365-C1: three agents each emitting start, start, done through updateWorkflowProgressBatch read "3/3 agents" in
 *    formatWorkflowNotification, and stats() over the same log reads done 3, total 3, complete true.
 *  - R365-C2: repeated progress for one agent, a replayed (cached) agent and a failed agent read "2/3 agents", stats()
 *    reads done 2, failedCount 1, total 3, and the usage line carries only the tokens a live agent reported.
 *  - R364-C1: for each of the five CapabilityErrorCategory values, completeWorkflowTask keeps the run result's typed
 *    diagnostic on the task (category, message, path, constraint as given) and formatWorkflowNotification carries
 *    exactly one <capability-error> line naming the category, at most CAPABILITY_LINE_BOUND characters long for a
 *    5,000-character message of plain characters.
 *  - R364-C1-SANITIZED: an escape sequence in the diagnostic's message, path and constraint, and a credential-shaped token
 *    in its message, do not reach that line.
 *  - R364-C1-ORDINARY: an ordinary failed run (no capabilityError) carries no <capability-error> line and no task
 *    diagnostic.
 *  - R364-C2-TYPED: through runWorkflow with a host whose callNode throws a host CapabilityError, the script's catch sees
 *    `instanceof CapabilityError` with the category, and an uncaught one reaches result.capabilityError typed.
 *  - R364-C2-ORDINARY: a script that throws a plain Error, and one that throws a plain Error renamed "CapabilityError"
 *    with a category property, settle failed with no result.capabilityError.
 *  - R364-C2-CATEGORY: a script-realm CapabilityError constructed with a category outside the five settles failed with
 *    no result.capabilityError.
 * NOT CLAIMED by this file: the registered workflow_observe envelope and the notification a booted extension sends
 * (test/workflow-dx-p09-resume-admission.test.ts pins those); the card's header counts; the line's length for a message
 * whose characters expand under XML escaping.
 */

import { describe, expect, it } from "vitest";
import { CapabilityError, type CapabilityErrorCategory } from "../src/workbench/capability-registry.js";
import { stats, type WorkflowAgentEntry } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";
import { completeWorkflowTask, createWorkflowTask, formatWorkflowNotification, updateWorkflowProgressBatch } from "../src/workflow/task.js";

/** The longest a <capability-error> line may be, tags included. */
const CAPABILITY_LINE_BOUND = 700;

const agent = (index: number, state: WorkflowAgentEntry["state"], extra: Partial<WorkflowAgentEntry> = {}): WorkflowAgentEntry => ({
  type: "workflow_agent", index, label: `agent-${index}`, state, agentId: `wf-agent-${index}`, ...extra,
});

function settledResult(changes: Partial<WorkflowRunResult>): WorkflowRunResult {
  return {
    status: "completed", meta: { name: "dx-p09", description: "d" }, progress: [], agentCount: 0,
    replayedCount: 0, replayedNodeCount: 0, reconciledNodeCount: 0, ...changes,
  };
}

const capabilityLine = (text: string) => text.split("\n").find(line => line.startsWith("<capability-error>"));

describe("EAT-R365: completion notifications count collapsed logical agents", () => {
  it("R365-C1: start, start, done for three distinct agents reads 3/3 agents and complete", () => {
    const task = createWorkflowTask({ id: "wf_r365c1", script: "", startTime: 1_000 });
    for (const index of [0, 1, 2]) updateWorkflowProgressBatch(task, [agent(index, "start"), agent(index, "start"), agent(index, "done")]);
    completeWorkflowTask(task, settledResult({ agentCount: 3 }));
    expect(formatWorkflowNotification(task, 2_000)).toContain("3/3 agents");
    expect(stats(task.workflowProgress, task.agentCount)).toMatchObject({ done: 3, failedCount: 0, total: 3, complete: true });
  });

  it("R365-C2: repeated progress does not raise the total; replayed and failed agents keep their own status and no usage is fabricated", () => {
    const task = createWorkflowTask({ id: "wf_r365c2", script: "", startTime: 1_000 });
    updateWorkflowProgressBatch(task, [agent(0, "start"), agent(0, "progress"), agent(0, "progress", { tokens: 40 }), agent(0, "progress", { tokens: 60 })]);
    updateWorkflowProgressBatch(task, [agent(1, "start"), agent(1, "done", { cached: true })]);
    updateWorkflowProgressBatch(task, [agent(2, "start"), agent(2, "error", { error: "child failed" })]);
    updateWorkflowProgressBatch(task, [agent(0, "done", { tokens: 100, toolCalls: 2 })]);
    completeWorkflowTask(task, settledResult({ status: "failed", error: "child failed", agentCount: 3, replayedCount: 1 }));
    const text = formatWorkflowNotification(task, 2_000);
    expect(text).toContain("2/3 agents");
    expect(stats(task.workflowProgress, task.agentCount)).toMatchObject({ done: 2, failedCount: 1, total: 3, complete: true });
    expect(text).toContain("<total_tokens>100</total_tokens>");
    expect(text).toContain("<tool_uses>2</tool_uses>");
  });
});

describe("EAT-R364: task completion keeps the typed capability diagnostic", () => {
  const categories: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];

  it.each(categories)("R364-C1: a %s failure keeps its category and a bounded reason on the task and in the notification", category => {
    const task = createWorkflowTask({ id: "wf_r364c1", script: "", startTime: 1_000 });
    const message = `Capability fixture.op refused (${category}): ${"x".repeat(5_000)}`;
    const diagnostic = { name: "CapabilityError" as const, category, message, ...(category === "validation" ? { path: "/target", constraint: "must be string" } : {}) };
    completeWorkflowTask(task, settledResult({ status: "failed", error: message, capabilityError: diagnostic }));
    expect(task.capabilityError).toEqual(diagnostic);
    const text = formatWorkflowNotification(task, 2_000);
    expect(text.split("\n").filter(row => row.startsWith("<capability-error>"))).toHaveLength(1);
    const line = capabilityLine(text);
    expect(line).toBeDefined();
    expect(line).toContain(`category ${category}`);
    expect(line).toContain("Capability fixture.op refused");
    expect(line?.length ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(CAPABILITY_LINE_BOUND);
    if (category === "validation") expect(line).toMatch(/path \/target .*constraint must be string/);
  });

  it("R364-C1-SANITIZED: control sequences and a credential-shaped token never reach the capability line", () => {
    const esc = String.fromCodePoint(0x1b);
    const token = "sk-ant-FAKEFAKEFAKEFAKE0000";
    const task = createWorkflowTask({ id: "wf_r364c1s", script: "", startTime: 1_000 });
    completeWorkflowTask(task, settledResult({ status: "failed", error: "refused", capabilityError: {
      name: "CapabilityError", category: "validation", message: `refused ${esc}[31mred${esc}[0m with ${token}`, path: `/ta${esc}[2Jrget`, constraint: `must be ${esc}]0;title\u0007string`,
    } }));
    const line = capabilityLine(formatWorkflowNotification(task, 2_000)) ?? "";
    expect(line).toContain("category validation");
    expect(line).not.toContain(esc);
    expect(line).not.toContain("\u0007");
    expect(line).not.toContain(token);
    expect(line).toMatch(/path \/target/);
  });

  it("R364-C1-ORDINARY: an ordinary failure carries no capability diagnostic", () => {
    const task = createWorkflowTask({ id: "wf_r364c1o", script: "", startTime: 1_000 });
    completeWorkflowTask(task, settledResult({ status: "failed", error: "plain failure" }));
    expect(task.capabilityError).toBeUndefined();
    expect(capabilityLine(formatWorkflowNotification(task, 2_000))).toBeUndefined();
  });
});

/** A host with one node provider that throws a host-realm CapabilityError of `category`. */
function failingNodeHost(category: CapabilityErrorCategory): WorkflowHost {
  return {
    async spawnAgent() { return { ok: false, error: "no agents here" }; },
    abortAgent() {},
    async callNode() { throw new CapabilityError(category, `Capability fixture.op refused (${category}).`); },
    describeNodeEffect: () => "read",
  };
}

const HEAD = 'export const meta = { name: "dx-p09-typed", description: "typed failure" };\n';

describe("EAT-R364: the script-realm diagnostic stays typed and ordinary errors stay untyped", () => {
  it("R364-C2-TYPED: a caught node failure is instanceof CapabilityError with its category, an uncaught one reaches the result typed", async () => {
    const caught = await runWorkflow({
      script: `${HEAD}try { await node("fixture.op", {}); return "unreached"; } catch (error) { return { typed: error instanceof CapabilityError, category: error.category }; }`,
      host: failingNodeHost("authorization"),
    });
    expect(caught.status).toBe("completed");
    expect(caught.value).toEqual({ typed: true, category: "authorization" });

    const uncaught = await runWorkflow({ script: `${HEAD}return await node("fixture.op", {});`, host: failingNodeHost("transport") });
    expect(uncaught.status).toBe("failed");
    expect(uncaught.capabilityError).toMatchObject({ name: "CapabilityError", category: "transport" });
  });

  it("R364-C2-ORDINARY: a plain Error, and a plain Error renamed CapabilityError, are not labelled capability failures", async () => {
    const plain = await runWorkflow({ script: `${HEAD}throw new Error("plain failure");`, host: failingNodeHost("validation") });
    expect(plain.status).toBe("failed");
    expect(plain.capabilityError).toBeUndefined();

    const renamed = await runWorkflow({
      script: `${HEAD}const error = new Error("renamed failure"); error.name = "CapabilityError"; error.category = "validation"; throw error;`,
      host: failingNodeHost("validation"),
    });
    expect(renamed.status).toBe("failed");
    expect(renamed.capabilityError).toBeUndefined();
    const task = createWorkflowTask({ id: "wf_r364c2o", script: "", startTime: 1_000 });
    completeWorkflowTask(task, renamed);
    expect(capabilityLine(formatWorkflowNotification(task, 2_000))).toBeUndefined();
  });

  it("R364-C2-CATEGORY: a realm CapabilityError with a category outside the five is not a typed capability failure", async () => {
    const forged = await runWorkflow({ script: `${HEAD}throw new CapabilityError("bogus-category", "forged category");`, host: failingNodeHost("validation") });
    expect(forged.status).toBe("failed");
    expect(forged.error).toContain("forged category");
    expect(forged.capabilityError).toBeUndefined();
  });
});
