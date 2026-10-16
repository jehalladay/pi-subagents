/**
 * workflow-task.test.ts — the record one run lives in.
 *
 * Most of `task.ts` is covered through the tool and command suites, which drive
 * it the way the extension does. The pause bookkeeping is not: it is a small
 * state machine that spans the record and the run's control surface, and the
 * two ways it can go wrong — flipping the record without telling the runtime,
 * or letting a held run keep counting elapsed time — are both invisible from
 * the outside. So it gets driven directly, against a control stub.
 */

import { describe, expect, it, vi } from "vitest";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import {
  type AcknowledgeRecord,
  entryDigestOf,
  type OverrideRecord,
  RECONCILE_CONTRACT_VERSION,
} from "../src/workflow/reconcile.js";
import type { WorkflowControl } from "../src/workflow/runtime.js";
import {
  completeWorkflowTask,
  createWorkflowTask,
  describeResumeJournal,
  failWorkflowTask,
  formatWorkflowNotification,
  pauseWorkflowTask,
  pendingReconciliations,
  resumeWorkflowTask,
  type WorkflowTask,
} from "../src/workflow/task.js";

function stubControl(): WorkflowControl & { pause: ReturnType<typeof vi.fn> } {
  return {
    pause: vi.fn(),
    resume: vi.fn(),
    isPaused: vi.fn(() => false),
    skip: vi.fn(() => true),
    retry: vi.fn(() => true),
  } as unknown as WorkflowControl & { pause: ReturnType<typeof vi.fn> };
}

function runningTask(): { task: WorkflowTask; control: ReturnType<typeof stubControl> } {
  const task = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000 });
  const control = stubControl();
  task.control = control;
  return { task, control };
}

describe("pausing a run", () => {
  it("tells the run to hold, not just the record", () => {
    // Flipping the status alone would show a paused run in every surface while
    // it kept starting agents.
    const { task, control } = runningTask();

    expect(pauseWorkflowTask(task, 5_000)).toBe(true);
    expect(control.pause).toHaveBeenCalledTimes(1);
    expect(task.status).toBe("paused");
    expect(task.pausedAt).toBe(5_000);
  });

  it("banks the held time on resume, so elapsed does not count it", () => {
    const { task, control } = runningTask();
    pauseWorkflowTask(task, 5_000);

    expect(resumeWorkflowTask(task, 9_000)).toBe(true);
    expect(control.resume).toHaveBeenCalledTimes(1);
    expect(task.status).toBe("running");
    expect(task.totalPausedMs).toBe(4_000);
    expect(task.pausedAt).toBeUndefined();
  });

  it("accumulates across several pauses", () => {
    const { task } = runningTask();
    pauseWorkflowTask(task, 2_000);
    resumeWorkflowTask(task, 3_000);
    pauseWorkflowTask(task, 4_000);
    resumeWorkflowTask(task, 10_000);

    expect(task.totalPausedMs).toBe(7_000);
  });

  it("refuses when there is no run behind the record", () => {
    // A task whose run has settled keeps its progress but loses its control;
    // pausing it would be a status the runtime never agreed to.
    const task = createWorkflowTask({ id: "wf_abc123", script: "" });
    expect(pauseWorkflowTask(task)).toBe(false);
    expect(task.status).toBe("running");
  });

  it("refuses to pause twice or resume something running", () => {
    const { task, control } = runningTask();
    expect(pauseWorkflowTask(task, 1_000)).toBe(true);
    expect(pauseWorkflowTask(task, 2_000)).toBe(false);
    expect(control.pause).toHaveBeenCalledTimes(1);
    // And the first pause's clock is untouched by the refused second one.
    expect(task.pausedAt).toBe(1_000);

    expect(resumeWorkflowTask(task, 3_000)).toBe(true);
    expect(resumeWorkflowTask(task, 4_000)).toBe(false);
    expect(control.resume).toHaveBeenCalledTimes(1);
  });
});

describe("settling a run", () => {
  const result = {
    status: "completed" as const,
    value: 1,
    meta: { name: "wf", description: "d" },
    progress: [],
    agentCount: 0,
    replayedCount: 0,
  };

  it("drops the control so a finished run cannot be paused", () => {
    const { task } = runningTask();
    completeWorkflowTask(task, result);

    expect(task.control).toBeUndefined();
    expect(pauseWorkflowTask(task)).toBe(false);
  });

  it("banks a pause that was still open when the run finished", () => {
    // A run held at a pause can still settle — its last agents finish and the
    // script returns. That time was spent held, and elapsed has to say so.
    const { task } = runningTask();
    pauseWorkflowTask(task, Date.now() - 3_000);
    completeWorkflowTask(task, result);

    expect(task.pausedAt).toBeUndefined();
    expect(task.totalPausedMs).toBeGreaterThanOrEqual(3_000);
    expect(task.status).toBe("completed");
  });

  it("drops the control when the run never started", () => {
    const { task } = runningTask();
    failWorkflowTask(task, "bad meta");

    expect(task.control).toBeUndefined();
    expect(task.status).toBe("failed");
  });
});

describe("replay provenance in the task summary", () => {
  const settled = (replayedCount: number, replayedNodeCount: number) => {
    const task = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000, resumedFrom: "wf_prior1" });
    completeWorkflowTask(task, { status: "completed", value: 1, meta: { name: "wf", description: "d" }, progress: [], agentCount: 2, replayedCount, replayedNodeCount });
    return task;
  };

  it("names replayed agents and replayed node reads separately in the notification", () => {
    const summary = formatWorkflowNotification(settled(1, 2), 2_000);
    expect(summary).toContain("1 replayed from wf_prior1");
    expect(summary).toContain("2 node reads replayed stale from wf_prior1");
  });

  it("says nothing about node reads when none were replayed", () => {
    const summary = formatWorkflowNotification(settled(1, 0), 2_000);
    expect(summary).toContain("1 replayed from wf_prior1");
    expect(summary).not.toMatch(/node read/);
  });

  it("describes a resume journal by what it can replay and what will stop it", () => {
    const entries: WorkflowJournalEntry[] = [
      { index: 0, key: "a", ok: true, text: "agent answer" },
      { index: 0, key: "r", ok: true, kind: "node", capabilityId: "record.read", effectClass: "read", text: "{}" },
      { index: 1, key: "w", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external" },
      { index: 2, key: "u", ok: true, kind: "node", capabilityId: "legacy.op" },
    ];
    const text = describeResumeJournal("wf_prior1", entries);
    expect(text).toContain("wf_prior1");
    expect(text).toContain("1 recorded agent call");
    expect(text).toContain("1 node read");
    expect(text).toMatch(/1 journaled effect[^.]*furnace/);
    expect(text).toMatch(/1 node call[^.]*without effect metadata/);
    expect(describeResumeJournal("wf_prior1", [{ index: 0, key: "a", ok: true, text: "x" }])).not.toMatch(/journaled effect|without effect metadata|node read/);
  });

  it("says a node call journaled without effect metadata stops the resume, never that it runs live (wb-tu1)", () => {
    // The notice exists so a refusal halfway through is no surprise; since the
    // runtime fails closed on an unclassified node, promising a live re-run
    // would be exactly that surprise.
    const text = describeResumeJournal("wf_prior1", [
      { index: 0, key: "u", ok: true, kind: "node", capabilityId: "legacy.op" },
      { index: 1, key: "v", ok: false, kind: "node", capabilityId: "legacy.op" },
    ]);
    expect(text).toMatch(/2 node calls without effect metadata will stop the resume at its position/);
    expect(text).toContain("uncertain effect");
    expect(text).not.toMatch(/run live/);
  });
});

describe("operator reconcile provenance in the task summary", () => {
  const result = (changes: Record<string, unknown>) => ({
    status: "completed", value: 1, meta: { name: "wf", description: "d" }, progress: [],
    agentCount: 1, replayedCount: 0, replayedNodeCount: 0, reconciledNodeCount: 0, ...changes,
  });
  const pendingProvenance = {
    state: "pending", position: 0, capabilityId: "furnace.run.start", effectClass: "external", producer: "furnace",
    key: "k0", entryDigest: `sha256:${"a".repeat(64)}`,
    nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-r1" }],
    decisions: { acknowledged: 0, overridesLive: 0, overridesSpent: 0 },
  };
  const pendingRow = (reconcile: Record<string, unknown>) => ({
    type: "workflow_node", index: 0, callId: 1, capabilityId: "furnace.run.start", label: "start",
    state: "error", error: "uncertain", reconcile,
  });

  it("copies the reconciled count when the run settles and names it in the summary", () => {
    const task = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000, resumedFrom: "wf_prior1" });
    completeWorkflowTask(task, result({ reconciledNodeCount: 1 }) as never);
    expect(task.reconciledNodeCount).toBe(1);
    expect(formatWorkflowNotification(task, 2_000)).toContain("1 node reconciled by operator");
    const two = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000 });
    completeWorkflowTask(two, result({ reconciledNodeCount: 2 }) as never);
    expect(formatWorkflowNotification(two, 2_000)).toContain("2 nodes reconciled by operator");
  });

  it("lists each pending reconciliation as a sanitized line and exposes the typed channel", () => {
    const task = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000 });
    task.workflowProgress.push(pendingRow({
      ...pendingProvenance, producer: "furnace\u001b[31m", capabilityId: "furnace.run.start\u202e",
    }) as never);
    completeWorkflowTask(task, result({ status: "failed", error: "uncertain-effect", agentCount: 0, value: undefined }) as never);
    const text = formatWorkflowNotification(task, 2_000);
    expect(text).toContain("<reconcile>pending");
    expect(text).toContain("node position 0");
    expect(text).toContain("workflow_reconcile");
    expect(text).toContain("frn-run-r1");
    expect(text).not.toMatch(/[\u001b\u202a-\u202e]/u);
    const pending = pendingReconciliations(task);
    expect(pending).toHaveLength(1);
    expect(pending[0]).toMatchObject({ state: "pending", position: 0 });
  });

  it("emits no reconcile line for an ordinary failure", () => {
    const task = createWorkflowTask({ id: "wf_abc123", script: "", startTime: 1_000 });
    completeWorkflowTask(task, result({ status: "failed", error: "boom", agentCount: 0, value: undefined }) as never);
    expect(formatWorkflowNotification(task, 2_000)).not.toContain("<reconcile>");
  });

  it("describes acknowledged, overridden and effect-absent decisions in the resume notice", () => {
    const effectAt = (index: number): WorkflowJournalEntry => ({
      index, key: `k${index}`, ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external",
    });
    const ackFor = (row: WorkflowJournalEntry, changes: Partial<AcknowledgeRecord> = {}): WorkflowJournalEntry => {
      const record: AcknowledgeRecord = {
        contractVersion: RECONCILE_CONTRACT_VERSION, decision: "acknowledge",
        acknowledgementId: `ack_${String(row.index).repeat(32).slice(0, 32)}`,
        policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested",
        taskId: "wf_abc123",
        entry: { index: row.index, key: row.key, ok: true, capabilityId: "furnace.run.start", effectClass: "external", entryDigest: entryDigestOf(row) },
        scope: { workspace: "/ws", principal: "local-operator:1:s1" },
        operator: { principal: "local-operator:1:s1" },
        grant: "reconcile:furnace.acknowledge", recordedAt: "2026-10-15T09:00:00Z", reason: "checked by hand",
        determination: "indeterminate", evidenceClass: "operator-asserted", evidence: [],
        noEvidenceReason: "producer-unavailable", settlement: "envelope", ...changes,
      };
      return { index: row.index, key: row.key, ok: true, kind: "acknowledge", capabilityId: "furnace.run.start", effectClass: "external", reconcile: record };
    };
    const overrideFor = (row: WorkflowJournalEntry, ackId: string): WorkflowJournalEntry => {
      const record: OverrideRecord = {
        contractVersion: RECONCILE_CONTRACT_VERSION, decision: "override",
        overrideId: `ovr_${String(row.index).repeat(32).slice(0, 32)}`,
        policy: "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted",
        taskId: "wf_abc123",
        entry: { index: row.index, key: row.key, ok: true, capabilityId: "furnace.run.start", effectClass: "external", entryDigest: entryDigestOf(row) },
        scope: { workspace: "/ws", principal: "local-operator:1:s1" },
        operator: { principal: "local-operator:1:s1" },
        grant: "reconcile:furnace.override", recordedAt: "2026-10-15T09:00:00Z", reason: "re-run it",
        acknowledgementId: ackId, duplicateRisk: "possible-duplicate",
        confirmation: { confirmed: true, position: row.index, capabilityId: "furnace.run.start", acceptDuplicateRisk: true },
      };
      return { index: row.index, key: row.key, ok: true, kind: "override", capabilityId: "furnace.run.start", effectClass: "external", reconcile: record };
    };
    const settled = effectAt(1);
    const absent = effectAt(2);
    const overridden = effectAt(3);
    const settledAck = ackFor(settled);
    const absentAck = ackFor(absent, { determination: "effect-absent", settlement: "none" });
    const overriddenAck = ackFor(overridden);
    const entries: WorkflowJournalEntry[] = [
      effectAt(0), settled, absent, overridden,
      settledAck, absentAck, overriddenAck,
      overrideFor(overridden, (overriddenAck.reconcile as AcknowledgeRecord).acknowledgementId),
    ];
    const text = describeResumeJournal("wf_prior1", entries);
    expect(text).toMatch(/4 journaled effects/);
    expect(text).toMatch(/1 acknowledged by operator \(position 1\)/);
    expect(text).toMatch(/1 operator override \(position 3\)[^.]*re-run once/);
    expect(text).toMatch(/1 acknowledged as effect-absent \(position 2\)[^.]*until overridden/);
  });
});
