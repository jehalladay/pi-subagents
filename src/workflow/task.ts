/**
 * task.ts — the background record one workflow run lives in.
 *
 * A `SubagentWorkflow` tool call returns a task id immediately and the run continues
 * without it, so the run's state cannot live in the tool call's closure: the
 * inline card, the completion notification and (later) the `/agents → Workflows` dialog
 * all read it after `execute` has returned. This is that record, shaped after
 * Claude Code's `local_workflow` task so the fields line up with what the
 * renderers already expect.
 *
 * The progress log is append-only and collapses by index (see `progress.ts`),
 * so cached counters apply each entry as a replacement delta. A re-emitted
 * agent entry subtracts its previous contribution before adding the new one.
 * Historical entries are not revisited during native streaming updates.
 */

import { randomUUID } from "node:crypto";
import type { InvocationSnapshot } from "../workbench/identity.js";
import { escapeXml } from "../xml.js";
import type { WorkflowJournalEntry } from "./journal.js";
import type { WorkflowMeta } from "./meta.js";
import { elapsedMs, stats, type WorkflowAgentEntry, type WorkflowEntry, type WorkflowRunStatus } from "./progress.js";
import type { WorkflowControl, WorkflowRunResult } from "./runtime.js";

/** `wf_` + hex, matching Claude Code's `^wf_[a-z0-9-]{6,}$` run ids. */
export function workflowRunId(): string {
  return `wf_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

export interface WorkflowTask {
  /** Discriminator, alongside Claude Code's `local_agent` / `local_bash`. */
  type: "local_workflow";
  id: string;
  status: WorkflowRunStatus;
  script: string;
  /** Where the script can be edited and re-run from. */
  scriptPath?: string;
  args?: unknown;
  meta?: WorkflowMeta;
  workflowName?: string;
  /** Host-owned launch receipt, not writable by the workflow script or worker. */
  identityReceipt?: InvocationSnapshot;
  /** Canonical input identity; absent input and explicit null remain distinct. */
  inputDigest?: string;
  workspaceSourceState?: "measured" | "unknown";
  /** Session and workspace scope at launch; used to deny cross-session reads. */
  observationScope?: { readonly sessionId: string; readonly workspace: string; readonly principal: string };
  /** The `tool_use_id` of the call that started this, when one did. */
  toolCallId?: string;

  /**
   * Pause, skip and retry, once the run is up.
   *
   * Absent before the runtime hands it over and after the run settles — the
   * dialog treats "no control" as "those keys do nothing", which is the same
   * thing it does for a run that has finished.
   */
  control?: WorkflowControl;
  /** When the current pause started, so `totalPausedMs` can be closed out. */
  pausedAt?: number;

  /** Where this run records its own settled calls, for a later resume. */
  journalPath?: string;
  /** A previous run's journal, when this call asked to resume one. */
  replay?: readonly WorkflowJournalEntry[];
  /** The run id this one resumed, for the result line that says so. */
  resumedFrom?: string;
  /** How many agents came back from {@link replay} instead of being spawned. */
  replayedCount: number;
  /** How many node reads came back stale from {@link replay} instead of being re-read. */
  replayedNodeCount: number;

  /** The append-only event log, in emission order. */
  workflowProgress: WorkflowEntry[];
  /** Bumped once per applied batch, so a renderer can tell nothing changed. */
  progressVersion: number;
  agentCount: number;
  /**
   * Agents that have settled successfully, recomputed with the other counters.
   *
   * Cached rather than derived on read because the fleet list asks five times a
   * second: deriving it there would walk the whole append-only log on every
   * tick, which for a thousand-agent run is real work in the render loop.
   */
  doneCount: number;
  totalTokens: number;
  totalToolCalls: number;
  logs: string[];

  abortController: AbortController;
  startTime: number;
  endTime?: number;
  /** Excluded from the elapsed clock the header shows. */
  totalPausedMs: number;

  /** The script's return value, once the run produced one. */
  value?: unknown;
  error?: string;
}

const taskAgents = new WeakMap<WorkflowTask, Map<number, WorkflowAgentEntry>>();

export function createWorkflowTask(init: {
  id: string;
  script: string;
  scriptPath?: string;
  args?: unknown;
  meta?: WorkflowMeta;
  toolCallId?: string;
  startTime?: number;
  journalPath?: string;
  replay?: readonly WorkflowJournalEntry[];
  resumedFrom?: string;
}): WorkflowTask {
  return {
    type: "local_workflow",
    id: init.id,
    status: "running",
    script: init.script,
    scriptPath: init.scriptPath,
    args: init.args,
    meta: init.meta,
    workflowName: init.meta?.name,
    toolCallId: init.toolCallId,
    journalPath: init.journalPath,
    replay: init.replay,
    resumedFrom: init.resumedFrom,
    replayedCount: 0,
    replayedNodeCount: 0,
    workflowProgress: [],
    progressVersion: 0,
    agentCount: 0,
    doneCount: 0,
    totalTokens: 0,
    totalToolCalls: 0,
    logs: [],
    abortController: new AbortController(),
    startTime: init.startTime ?? Date.now(),
    totalPausedMs: 0,
  };
}

/**
 * Apply one batch of progress entries.
 *
 * Each batch updates only the changed agent contributions. The append-only
 * diagnostic history remains available without being refolded on every frame.
 */
export function updateWorkflowProgressBatch(
  task: WorkflowTask,
  entries: readonly WorkflowEntry[],
): void {
  if (entries.length === 0) return;
  task.workflowProgress.push(...entries);
  task.progressVersion++;

  let agents = taskAgents.get(task);
  if (!agents) {
    agents = new Map();
    taskAgents.set(task, agents);
  }
  for (const entry of entries) {
    if (entry.type === "workflow_log") task.logs.push(entry.message);
    if (entry.type !== "workflow_agent") continue;
    const prior = agents.get(entry.index);
    task.totalTokens += (entry.tokens ?? 0) - (prior?.tokens ?? 0);
    task.totalToolCalls += (entry.toolCalls ?? 0) - (prior?.toolCalls ?? 0);
    task.doneCount += Number(entry.state === "done") - Number(prior?.state === "done");
    agents.set(entry.index, entry);
  }
  task.agentCount = Math.max(task.agentCount, agents.size);
}

/**
 * Hold the run, and stop its clock.
 *
 * The elapsed figure every surface shows subtracts `totalPausedMs`, so a run
 * left paused overnight does not come back reading as a twelve-hour run.
 */
export function pauseWorkflowTask(task: WorkflowTask, now = Date.now()): boolean {
  if (task.status !== "running" || task.control === undefined) return false;
  task.control.pause();
  task.status = "paused";
  task.pausedAt = now;
  return true;
}

/** Let it go again, banking however long it was held. */
export function resumeWorkflowTask(task: WorkflowTask, now = Date.now()): boolean {
  if (task.status !== "paused" || task.control === undefined) return false;
  task.control.resume();
  task.status = "running";
  task.totalPausedMs = (task.totalPausedMs ?? 0) + Math.max(0, now - (task.pausedAt ?? now));
  task.pausedAt = undefined;
  return true;
}

/** Settle a task from the run's own result. */
export function completeWorkflowTask(task: WorkflowTask, result: WorkflowRunResult): void {
  // Banked before the status moves off "paused": a run that finished while held
  // still spent that time held, and the elapsed figure has to say so.
  if (task.pausedAt !== undefined) {
    task.totalPausedMs = (task.totalPausedMs ?? 0) + Math.max(0, Date.now() - task.pausedAt);
    task.pausedAt = undefined;
  }
  // Nothing left to control, and holding the handle would let the dialog offer
  // pause on a run that has already stopped.
  task.control = undefined;
  task.status = result.status;
  task.meta ??= result.meta;
  task.workflowName ??= result.meta.name;
  task.agentCount = Math.max(task.agentCount, result.agentCount);
  task.replayedCount = result.replayedCount;
  task.replayedNodeCount = result.replayedNodeCount;
  task.value = result.value;
  task.error = result.error;
  task.endTime = Date.now();
}

/**
 * Settle a task that never produced a result — a script rejected before the
 * worker started (bad `meta`, oversized source, non-JSON `args`).
 */
export function failWorkflowTask(task: WorkflowTask, error: string): void {
  task.control = undefined;
  task.pausedAt = undefined;
  task.status = "failed";
  task.error = error;
  task.endTime = Date.now();
}

/** The run's outcome as text, for the notification and the LLM-facing result. */
/**
 * What a resume journal holds, by what the runtime will do with each entry:
 * agent calls and node reads can come back from it, a journaled effect stops
 * the resume at its position until the producer reconciles it, and a node call
 * recorded without effect metadata runs live. Said up front so the caller is
 * not surprised by a refusal halfway through.
 */
export function describeResumeJournal(from: string, entries: readonly WorkflowJournalEntry[]): string {
  const agents = entries.filter(entry => entry.kind === undefined).length;
  const nodes = entries.filter(entry => entry.kind === "node");
  const reads = nodes.filter(entry => entry.effectClass === "read" && entry.ok && entry.text !== undefined).length;
  const effects = nodes.filter(entry => entry.effectClass !== undefined && entry.effectClass !== "read");
  const untyped = nodes.filter(entry => entry.effectClass === undefined).length;
  const count = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const replayable = [agents > 0 ? count(agents, "recorded agent call") : undefined, reads > 0 ? count(reads, "node read") : undefined].filter((part): part is string => part !== undefined);
  const parts = [`Resuming ${from}: ${replayable.length > 0 ? `${replayable.join(" and ")} available to replay` : "nothing available to replay"}`];
  if (effects.length > 0) {
    const producers = [...new Set(effects.map(entry => (entry.capabilityId ?? "unknown").split(/[.-]/)[0]))].sort();
    parts.push(`${count(effects.length, "journaled effect")} (${producers.join(", ")}) will stop the resume at its position until reconciled with the producer`);
  }
  if (untyped > 0) parts.push(`${count(untyped, "node call")} without effect metadata will run live`);
  return `${parts.join("; ")}.`;
}

export function workflowResultText(task: WorkflowTask): string {
  if (task.error !== undefined) return task.error;
  if (task.value === undefined) return "No output.";
  if (typeof task.value === "string") return task.value;
  return JSON.stringify(task.value, null, 2);
}

/**
 * Resolve a `resumeFromRunId` against the runs this session has seen.
 *
 * Same-session only, and deliberately so: the journal lives beside the
 * session's task files, and a run id from another session would silently find
 * nothing to replay — reporting that as "resumed" would be a lie the caller
 * could not see through. An unknown id is an error rather than a cold start,
 * because a caller that asked to resume is expecting not to pay.
 */
export function resolveResumeTarget(
  runId: string | undefined,
  tasks: ReadonlyMap<string, WorkflowTask>,
):
  | undefined
  | { ok: true; runId: string; journalPath: string; scriptPath: string }
  | { ok: false; message: string } {
  const id = runId?.trim();
  if (id === undefined || id === "") return undefined;

  const prior = tasks.get(id);
  if (prior === undefined) {
    const known = [...tasks.keys()];
    return {
      ok: false,
      message:
        `No workflow run "${id}" in this session. ` +
        (known.length > 0
          ? `Runs this session: ${known.join(", ")}.`
          : "Nothing has run yet — call this without `resumeFromRunId`."),
    };
  }
  if (prior.status === "running") {
    return {
      ok: false,
      message: `Workflow "${id}" is still running. Stop it from /agents → Workflows before resuming it.`,
    };
  }
  if (prior.journalPath === undefined) {
    return { ok: false, message: `Workflow "${id}" has no journal to resume from.` };
  }
  return {
    ok: true,
    runId: id,
    journalPath: prior.journalPath,
    // The persisted copy, which is what `scriptPath` holds when the call had
    // no file of its own.
    scriptPath: prior.scriptPath ?? "",
  };
}

/** `<task-notification>`, in the same shape a finished background agent sends. */
export function formatWorkflowNotification(task: WorkflowTask, now = Date.now()): string {
  const totals = stats(task.workflowProgress, task.agentCount);
  const status =
    task.status === "completed" ? "Done"
    : task.status === "killed" ? "Stopped"
    : `Error: ${task.error ?? "unknown"}`;
  const result = workflowResultText(task);
  return [
    `<task-notification>`,
    `<task-id>${task.id}</task-id>`,
    task.toolCallId ? `<tool-use-id>${escapeXml(task.toolCallId)}</tool-use-id>` : null,
    task.scriptPath ? `<script>${escapeXml(task.scriptPath)}</script>` : null,
    `<status>${escapeXml(status)}</status>`,
    `<summary>Workflow "${escapeXml(task.workflowName ?? task.id)}" ${task.status} — ${totals.done}/${totals.total} agents${
      task.replayedCount > 0 ? `, ${task.replayedCount} replayed from ${escapeXml(task.resumedFrom ?? "an earlier run")}` : ""
    }${
      task.replayedNodeCount > 0 ? `, ${task.replayedNodeCount} node ${task.replayedNodeCount === 1 ? "read" : "reads"} replayed stale from ${escapeXml(task.resumedFrom ?? "an earlier run")}` : ""
    }</summary>`,
    `<result>${escapeXml(result.length > 4000 ? `${result.slice(0, 4000)}\n...(truncated)` : result)}</result>`,
    `<usage><total_tokens>${task.totalTokens}</total_tokens><tool_uses>${task.totalToolCalls}</tool_uses><duration_ms>${elapsedMs(task, now)}</duration_ms></usage>`,
    `</task-notification>`,
  ].filter(Boolean).join("\n");
}
