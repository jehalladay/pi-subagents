/**
 * workflow-dx-p09-replay-decline.test.ts — wb-q0on, EAT-R361 (program pi-system-dx-triage-2026-11-11,
 * requirements/.work/req-r-ops.md): "A workflow resume MUST expose the first typed reason that a recorded prefix cannot
 * be replayed before or at its first newly paid agent call." runWorkflow over injected hosts whose spawnAgent records
 * every live call (V3: registered routing with injected finite callbacks), the REAL Claude host's own replay policy,
 * and the task record's notification.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - R361-C1-CONTROL: a same-basis resume replays both recorded agents, reports replayedCount 2, spawns nothing and
 *    carries no decline (result and log).
 *  - R361-C1-BASIS-KNOWN / R361-C1-BASIS-OPAQUE: an entry recorded under another basis declines at position 0 typed
 *    basis-changed, naming the host's changed dimension when the host names one and "dimension unknown" otherwise.
 *  - R361-C1-FAILED, R361-C1-EDITED, R361-C1-RESUMED, R361-C1-NOT-RECORDED, R361-C1-SCHEMA-RECHECK, R361-C1-UNSAFE: a
 *    recorded failure (failed-entry, position 0), an edited second prompt (call-changed, position 1, after one replay), a
 *    journal with an agent({ resume }) continuation (resumed-journal, position 0), a journal with no row at position 1
 *    before a later one (not-recorded, position 1), a recorded answer the call's schema refuses (schema-recheck,
 *    position 0) and a host that declines settled replay (replay-unsafe, position 0, with the host's reason) each
 *    decline with exactly one decline log line, emitted before the first live spawn.
 *  - R361-C1-LIVE-NODE: a live node() call between a replayed agent and a recorded one declines typed live-node at node
 *    position 0, its decline log line emitted before the host's callNode, and the next agent runs live.
 *  - R361-C1-ACKNOWLEDGED-NODE: an operator-acknowledged node() settlement between a replayed agent and a recorded one
 *    declines typed acknowledged-node at node position 0, and the next agent runs live.
 *  - R361-C2-LAUNCH: describeResumeJournal counts recorded agent calls as replay candidates and never says they are
 *    available to replay.
 *  - R361-C2-UNMEASURED: the Claude host built over the source reading sourceDependency returns for an unmeasured
 *    candidate ({ sourceBasis: "unknown:git-unavailable", state: "unknown" }) declines replay with a reason naming
 *    measured-unavailable and the source reading, a resume over that host replays nothing and its notification says
 *    so; a measured reading whose digest is malformed is named malformed.
 *  - R361-C1-DIMENSION: the Claude host names the changed basis dimension (model, grants, the source reading) against a
 *    basis another Claude host recorded, and names none for an opaque, an absent or its own unchanged basis.
 *  - R361-C3-BOUNDED: the decline reaches the workflow log as one line and the task notification as exactly one
 *    <replay-decline> line, each at most DECLINE_BOUND characters, neither carrying the recorded 20,000-character
 *    prompt or the 20,000-character basis.
 * NOT CLAIMED by this file: node read replay declines; which candidate src/index.ts builds for a workspace outside Git
 * or past 2,000 paths; the launch text's own measurement of the basis (it is composed before the host measures
 * anything); the detached host's basis.
 */

import { describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { measuredDependency, sourceDependency } from "../src/workbench/replay-dependencies.js";
import { journalKey, nodeJournalKey, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { type AcknowledgeRecord, entryDigestOf, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";
import { completeWorkflowTask, createWorkflowTask, describeResumeJournal, formatWorkflowNotification } from "../src/workflow/task.js";

const HEAD = 'export const meta = { name: "dx-p09-decline", description: "replay decline" };\n';
const TWO = `${HEAD}const a = await agent("A"); const b = await agent("B"); return [a, b];`;
/** The schema the schema-recheck row asks for: a recorded answer that is a string fails it. */
const SCHEMA = { type: "object", properties: { answer: { type: "string" } }, required: ["answer"] };
/** The longest a decline line may be, in the log or the notification. */
const DECLINE_BOUND = 400;

function recorded(prompt: string, index: number, changes: Partial<WorkflowJournalEntry> = {}): WorkflowJournalEntry {
  return { index, key: journalKey({ prompt }), ok: true, text: `recorded ${prompt}`, ...changes };
}

function agentHost(policy: Partial<Pick<WorkflowHost, "replayBasis" | "replaySafe" | "replayUnsafeReason" | "describeBasisChange">> = {}) {
  const spawned: string[] = [];
  const host: WorkflowHost = {
    ...policy,
    async spawnAgent(request) { spawned.push(request.prompt); return { ok: true, text: `live ${request.prompt}` }; },
    abortAgent() {},
  };
  return { host, spawned };
}

const declineLogs = (result: WorkflowRunResult) =>
  result.progress.flatMap(entry => (entry.type === "workflow_log" && /replay declined/.test(entry.message) ? [entry.message] : []));

describe("EAT-R361: the first replay decline is typed, positioned and said once", () => {
  it("R361-C1-CONTROL: a same-basis resume replays every recorded agent and declines nothing", async () => {
    const { host, spawned } = agentHost({ replayBasis: "basis-1" });
    const result = await runWorkflow({ script: TWO, host, journal: { entries: [recorded("A", 0, { basis: "basis-1" }), recorded("B", 1, { basis: "basis-1" })] } });
    expect(result.status).toBe("completed");
    expect(result.replayedCount).toBe(2);
    expect(spawned).toEqual([]);
    expect(result.replayDecline).toBeUndefined();
    expect(declineLogs(result)).toEqual([]);
  });

  it("R361-C1-BASIS-KNOWN: another basis declines at position 0 naming the dimension the host names", async () => {
    const { host, spawned } = agentHost({ replayBasis: "basis-2", describeBasisChange: () => "model" });
    const result = await runWorkflow({ script: TWO, host, journal: { entries: [recorded("A", 0, { basis: "basis-1" }), recorded("B", 1, { basis: "basis-1" })] } });
    expect(result.replayDecline).toMatchObject({ reason: "basis-changed", kind: "agent", position: 0, dimension: "model" });
    expect(spawned).toEqual(["A", "B"]);
    const logs = declineLogs(result);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toMatch(/basis-changed/);
    expect(logs[0]).toMatch(/position 0/);
    expect(logs[0]).toMatch(/model/);
  });

  it("R361-C1-BASIS-OPAQUE: a host that names no dimension declines with the dimension unknown", async () => {
    const { host } = agentHost({ replayBasis: "basis-2" });
    const result = await runWorkflow({ script: TWO, host, journal: { entries: [recorded("A", 0, { basis: "basis-1" })] } });
    expect(result.replayDecline).toMatchObject({ reason: "basis-changed", position: 0 });
    expect(result.replayDecline?.dimension).toBeUndefined();
    expect(declineLogs(result)[0]).toMatch(/dimension unknown/);
  });

  it.each([
    { id: "R361-C1-FAILED", script: TWO, entries: [recorded("A", 0, { ok: false, text: undefined }), recorded("B", 1)], reason: "failed-entry", position: 0, replayed: 0 },
    { id: "R361-C1-EDITED", script: TWO, entries: [recorded("A", 0), recorded("B edited before", 1)], reason: "call-changed", position: 1, replayed: 1 },
    { id: "R361-C1-RESUMED", script: TWO, entries: [recorded("A", 0), recorded("B", 1, { resumed: true })], reason: "resumed-journal", position: 0, replayed: 0 },
    { id: "R361-C1-NOT-RECORDED", script: TWO, entries: [recorded("A", 0), recorded("C", 2)], reason: "not-recorded", position: 1, replayed: 1 },
    {
      id: "R361-C1-SCHEMA-RECHECK", script: `${HEAD}return await agent("A", { schema: ${JSON.stringify(SCHEMA)} });`,
      entries: [{ index: 0, key: journalKey({ prompt: "A", schema: JSON.stringify(SCHEMA) }), ok: true, text: "\"not an object\"" }], reason: "schema-recheck", position: 0, replayed: 0,
    },
  ])("$id: declines typed $reason at position $position with one reason, before the first live spawn", async ({ script, entries, reason, position, replayed }) => {
    const order: string[] = [];
    const host: WorkflowHost = {
      async spawnAgent(request) { order.push(`spawn ${request.prompt}`); return { ok: true, text: reason === "schema-recheck" ? "{\"answer\":\"live\"}" : `live ${request.prompt}` }; },
      abortAgent() {},
    };
    const result = await runWorkflow({
      script, host, journal: { entries },
      onProgress: batch => { for (const entry of batch) if (entry.type === "workflow_log" && /replay declined/.test(entry.message)) order.push("decline"); },
    });
    expect(result.status).toBe("completed");
    expect(result.replayDecline).toMatchObject({ reason, kind: "agent", position });
    expect(result.replayedCount).toBe(replayed);
    expect(declineLogs(result)).toHaveLength(1);
    expect(order.indexOf("decline")).toBeGreaterThanOrEqual(0);
    expect(order.indexOf("decline")).toBeLessThan(order.findIndex(step => step.startsWith("spawn")));
  });

  it("R361-C1-UNSAFE: a host that declines settled replay names its reason and replays nothing, before the first live spawn", async () => {
    const order: string[] = [];
    const { host, spawned } = agentHost({ replaySafe: false, replayUnsafeReason: "replay basis measured-unavailable: source reading unknown (source-candidate-unmeasured)" });
    const spawn = host.spawnAgent.bind(host);
    host.spawnAgent = request => { order.push("spawn"); return spawn(request); };
    const result = await runWorkflow({
      script: TWO, host, journal: { entries: [recorded("A", 0), recorded("B", 1)] },
      onProgress: batch => { for (const entry of batch) if (entry.type === "workflow_log" && /replay declined/.test(entry.message)) order.push("decline"); },
    });
    expect(result.replayedCount).toBe(0);
    expect(spawned).toEqual(["A", "B"]);
    expect(result.replayDecline).toMatchObject({ reason: "replay-unsafe", position: 0 });
    expect(result.replayDecline?.detail).toMatch(/measured-unavailable/);
    expect(declineLogs(result)).toHaveLength(1);
    expect(order[0]).toBe("decline");
  });

  it("R361-C1-LIVE-NODE: a live node() between a replayed agent and a recorded one declines at node position 0 before callNode", async () => {
    const order: string[] = [];
    const host: WorkflowHost = {
      async spawnAgent(request) { order.push(`spawn ${request.prompt}`); return { ok: true, text: `live ${request.prompt}` }; },
      abortAgent() {},
      async callNode() { order.push("callNode"); return { read: true }; },
      describeNodeEffect: () => "read",
    };
    const result = await runWorkflow({
      script: `${HEAD}const a = await agent("A"); await node("fixture.read", {}); return [a, await agent("B")];`, host,
      journal: { entries: [recorded("A", 0), recorded("B", 1)] },
      onProgress: batch => { for (const entry of batch) if (entry.type === "workflow_log" && /replay declined/.test(entry.message)) order.push("decline"); },
    });
    expect(result.status).toBe("completed");
    expect(result.replayDecline).toMatchObject({ reason: "live-node", kind: "node", position: 0 });
    expect(result.replayedCount).toBe(1);
    expect(order).toEqual(["decline", "callNode", "spawn B"]);
  });

  it("R361-C1-ACKNOWLEDGED-NODE: an acknowledged node() settlement between a replayed agent and a recorded one declines at node position 0", async () => {
    const effect: WorkflowJournalEntry = { index: 0, key: nodeJournalKey("furnace.run.start", JSON.stringify({ value: "x" })), ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external" };
    const record: AcknowledgeRecord = {
      contractVersion: RECONCILE_CONTRACT_VERSION, decision: "acknowledge", acknowledgementId: `ack_${"0".repeat(32)}`,
      policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested", taskId: "wf_prior1",
      entry: { index: 0, key: effect.key, ok: true, capabilityId: "furnace.run.start", effectClass: "external", entryDigest: entryDigestOf(effect) },
      scope: { workspace: "/ws", principal: "local-operator:1:s1" }, operator: { principal: "local-operator:1:s1" },
      grant: "reconcile:furnace.acknowledge", recordedAt: "2026-11-11T09:00:00Z", reason: "checked by hand",
      determination: "indeterminate", evidenceClass: "operator-asserted", evidence: [], noEvidenceReason: "producer-unavailable", settlement: "envelope",
    };
    const ack: WorkflowJournalEntry = { index: 0, key: effect.key, ok: true, kind: "acknowledge", capabilityId: "furnace.run.start", effectClass: "external", reconcile: record };
    const { host, spawned } = agentHost();
    const withNodes: WorkflowHost = { ...host, async callNode() { throw new Error("an acknowledged position never dispatches"); }, describeNodeEffect: () => "external" };
    const result = await runWorkflow({
      script: `${HEAD}const a = await agent("A"); await node("furnace.run.start", { value: "x" }); return [a, await agent("B")];`, host: withNodes,
      journal: { entries: [recorded("A", 0), recorded("B", 1), effect, ack] },
    });
    expect(result.status).toBe("completed");
    expect(result.reconciledNodeCount).toBe(1);
    expect(result.replayDecline).toMatchObject({ reason: "acknowledged-node", kind: "node", position: 0 });
    expect(declineLogs(result)).toHaveLength(1);
    expect(spawned).toEqual(["B"]);
  });

  it("R361-C2-LAUNCH: the launch text counts recorded candidates, not hits", () => {
    const text = describeResumeJournal("wf_prior1", [recorded("A", 0), recorded("B", 1)]);
    expect(text).toContain("2 recorded agent calls");
    expect(text).toMatch(/replay candidates/);
    expect(text).not.toMatch(/available to replay/);
  });
});

const MEASURED = measuredDependency("claude-replay-fixture", { fixture: true });

describe("EAT-R361: the Claude host's own replay policy", () => {
  it("R361-C2-UNMEASURED: an unknown source reading declines replay as measured-unavailable, and a resume over the host says so", async () => {
    const source = sourceDependency(undefined, { sourceBasis: "unknown:git-unavailable", state: "unknown" });
    expect(source.state).toBe("unknown");
    const claude = createClaudeWorkflowHost({ cwd: process.cwd(), replayDependencies: { source, instructions: MEASURED, provider: MEASURED } });
    expect(claude.replaySafe).toBe(false);
    expect(claude.replayUnsafeReason).toMatch(/measured-unavailable/);
    expect(claude.replayUnsafeReason).toMatch(/source reading unknown \(source-candidate-unmeasured\)/);
    const malformed = createClaudeWorkflowHost({ cwd: process.cwd(), replayDependencies: { source: MEASURED, instructions: { state: "measured", digest: "not-a-digest" }, provider: MEASURED } });
    expect(malformed.replaySafe).toBe(false);
    expect(malformed.replayUnsafeReason).toMatch(/instructions reading malformed/);

    const spawned: string[] = [];
    const host: WorkflowHost = {
      replaySafe: claude.replaySafe, replayBasis: claude.replayBasis, replayUnsafeReason: claude.replayUnsafeReason,
      async spawnAgent(request) { spawned.push(request.prompt); return { ok: true, text: "live" }; },
      abortAgent() {},
    };
    const result = await runWorkflow({ script: TWO, host, journal: { entries: [recorded("A", 0, { basis: claude.replayBasis }), recorded("B", 1, { basis: claude.replayBasis })] } });
    expect(result.replayedCount).toBe(0);
    expect(spawned).toEqual(["A", "B"]);
    expect(result.replayDecline?.detail).toMatch(/measured-unavailable/);
    const task = createWorkflowTask({ id: "wf_r361unmeasured", script: "", startTime: 1_000, resumedFrom: "wf_prior1" });
    completeWorkflowTask(task, result);
    const notice = formatWorkflowNotification(task, 2_000);
    expect(notice).not.toMatch(/replayed from/);
    expect(notice).toMatch(/<replay-decline>[^\n]*measured-unavailable/);
  });

  it("R361-C1-DIMENSION: the Claude host names the changed dimension against another Claude host's basis", () => {
    const base = { cwd: process.cwd(), grants: ["fixture:read"], replayDependencies: { source: MEASURED, instructions: MEASURED, provider: MEASURED } };
    const recordedBasis = createClaudeWorkflowHost({ ...base, model: "sonnet" }).replayBasis;
    expect(createClaudeWorkflowHost({ ...base, model: "haiku" }).describeBasisChange?.(recordedBasis)).toBe("model");
    expect(createClaudeWorkflowHost({ ...base, model: "sonnet", grants: ["fixture:write"] }).describeBasisChange?.(recordedBasis)).toBe("grants");
    const moved = measuredDependency("claude-replay-fixture", { fixture: "moved" });
    expect(createClaudeWorkflowHost({ ...base, model: "sonnet", replayDependencies: { ...base.replayDependencies, source: moved } }).describeBasisChange?.(recordedBasis)).toBe("source reading");
    const current = createClaudeWorkflowHost({ ...base, model: "sonnet" });
    expect(current.describeBasisChange?.("opaque-digest")).toBeUndefined();
    expect(current.describeBasisChange?.(undefined)).toBeUndefined();
    expect(current.describeBasisChange?.(recordedBasis)).toBeUndefined();
  });
});

describe("EAT-R361: the decline is bounded in the log and the notification", () => {
  it("R361-C3-BOUNDED: one bounded line in each, never the recorded or live payload", async () => {
    const huge = "P".repeat(20_000);
    const basis = "B".repeat(20_000);
    const { host } = agentHost({ replayBasis: `${basis}-now` });
    const script = `${HEAD}return await agent(${JSON.stringify(huge)});`;
    const result = await runWorkflow({ script, host, journal: { entries: [recorded(huge, 0, { basis })] } });
    const logs = declineLogs(result);
    expect(logs).toHaveLength(1);
    expect(logs[0]?.length).toBeLessThanOrEqual(DECLINE_BOUND);
    expect(logs[0]).not.toContain("PPPPPPPPPP");
    expect(logs[0]).not.toContain("BBBBBBBBBB");

    const task = createWorkflowTask({ id: "wf_r361bounded", script: "", startTime: 1_000, resumedFrom: "wf_prior1" });
    completeWorkflowTask(task, result);
    const lines = formatWorkflowNotification(task, 2_000).split("\n").filter(row => row.startsWith("<replay-decline>"));
    expect(lines).toHaveLength(1);
    const line = lines[0];
    expect(line).toBeDefined();
    expect(line).toMatch(/basis-changed/);
    expect(line?.length ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(DECLINE_BOUND);
    expect(line).not.toContain("PPPPPPPPPP");
    expect(task.replayDecline).toMatchObject({ reason: "basis-changed", position: 0 });
  });
});
