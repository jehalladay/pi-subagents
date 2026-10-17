/**
 * workflow-menu.ts — `/agents → Workflows`, and the run inspector behind it.
 *
 * The same shape `schedule-menu.ts` has for `/agents → Scheduled jobs`: the
 * submenu and the overlay it opens live here, and everything they need arrives
 * as {@link WorkflowMenuDeps} rather than through a closure. The inspector is
 * reached from two places — this menu and a `workflow` row in the fleet list —
 * and both go through `showWorkflowDialog`, so the two entry points cannot
 * drift apart on what the keys do.
 *
 * Lives in the agents menu rather than as a top-level `/workflows` command: it
 * is one more view of the same fleet, and a second command name would only add
 * a collision surface (pi renames duplicate commands to `/workflows:1` and
 * `/workflows:2`, which breaks the bare name for both).
 */

import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { AgentRecord } from "../types.js";
import { CapabilityError } from "../workbench/capability-registry.js";
import type { EvidenceStore } from "../workbench/evidence-loader.js";
import type { ObservationProjection, ObservationScope, ObservedNode } from "../workbench/observation.js";
import { buildTimelineLanes, type TimelineModel, type TimelineRequest } from "../workbench/timeline.js";
import { type LinkedTopology, selectLinkedTopology } from "../workbench/topology-slice.js";
import { pauseWorkflowTask, resumeWorkflowTask, type WorkflowTask } from "../workflow/task.js";
import { type InspectorTimelineView, WorkflowDialog } from "./workflow-dialog.js";

/** Everything the menu and the inspector need from the extension around them. */
export interface WorkflowMenuDeps {
  /**
   * Live runs by id, read on every use rather than snapshotted: a run that
   * settled and was swept between render and keypress must be a no-op, not a
   * crash.
   */
  tasks: ReadonlyMap<string, WorkflowTask>;
  observation?: {
    projection: ObservationProjection;
    scope(task: WorkflowTask): ObservationScope | undefined;
    evidence?: EvidenceStore;
    /**
     * The read cap `projection` was built with (its maxQuery; src/index.ts hands over the constant it builds the
     * projection with). Declared, the details view shows the selected node's linked topology slice, read in pages of
     * exactly this size so the slice never asks for more rows than the projection returns (wb-6ze.24). Undeclared, the
     * details view renders exactly as it does without one.
     */
    relationPage?: number;
    /**
     * The bar viewport, in cells, of the timeline view's lane model (src/index.ts hands over WORKBENCH_TIMELINE_COLUMNS).
     * Declared together with relationPage, the timeline view draws the workbench.timeline/v1 lanes buildTimelineLanes
     * builds over this projection for the window, zoom and pan the inspector shows, reading windows and relation pages of
     * relationPage rows (wb-6ze.35). Either one undeclared, the timeline view renders exactly as it does without a model.
     */
    timelineColumns?: number;
  };
  /** The record behind an agent id, or undefined once it has been swept. */
  getRecord(id: string): AgentRecord | undefined;
  /** The conversation overlay `c` opens on an agent row. */
  viewAgentConversation(ctx: ExtensionCommandContext, record: AgentRecord): Promise<void>;
  viewClaudeTranscript?(ctx: ExtensionCommandContext, sessionId: string): Promise<void>;
  /**
   * The session context, for the fleet-list entry point — that one is a
   * keypress in a list that holds no `ctx` of its own. Undefined between
   * sessions, which is a no-op rather than an error.
   */
  getCtx(): ExtensionCommandContext | undefined;
}

/**
 * The details view's linked topology read side for one open dialog (wb-6ze.24; docs/workbench/10, Four views: Details).
 * It computes the bounded slice of the one node the inspector draws as current from the projection's typed relations,
 * read through relationsPage so a full page comes back as a lower bound, and holds that slice alone: a redraw reads
 * nothing until the selection or the relation topology changes. Reading is all it does, so a selection change reaches no
 * producer and no control verb, and closing the dialog leaves it nothing to cancel. A focus or a page the selector
 * refuses yields no slice, and the details view then renders exactly as it does without one.
 */
function selectedNodeTopology(
  projection: ObservationProjection,
  relationPage: number,
): (scope: ObservationScope, node: ObservedNode) => LinkedTopology | undefined {
  let held: { workspace: string; principal: string; key: string; revision: number; slice: LinkedTopology | undefined } | undefined;
  return (scope, node) => {
    const revision = projection.relationRevision();
    if (held?.key === node.key && held.revision === revision && held.workspace === scope.workspace && held.principal === scope.principal) {
      return held.slice;
    }
    let slice: LinkedTopology | undefined;
    try {
      slice = selectLinkedTopology({ scope, relations: projection }, node.key, { relationPage });
    } catch (error) {
      if (!(error instanceof CapabilityError)) throw error;
    }
    held = { workspace: scope.workspace, principal: scope.principal, key: node.key, revision, slice };
    return slice;
  };
}

/**
 * The timeline view's lane read side for one open dialog (wb-6ze.35; docs/workbench/10, Four views: Timeline). It hands
 * the inspector the workbench.timeline/v1 model buildTimelineLanes computes over the live projection for the window the
 * inspector draws, the page of `page` rows holding the row it draws as current, at the inspector's zoom and pan, with
 * bars laid out in `columns` cells. Every cap in the request is a value the host declared, never a literal here. The
 * model is held and rebuilt only when the projection revision, its relation revision or the request changes, so a
 * redraw, a selection inside the window, a filter or a focus reads no relation. An out-of-contract request is the
 * selector's typed refusal and is not caught: zoom and pan arrive within the inspector reducer's bounds. Reading is all
 * it does, so closing the dialog leaves it nothing to cancel.
 */
function timelineLanes(
  projection: ObservationProjection,
  page: number,
  columns: number,
): (scope: ObservationScope, invocationId: string, view: InspectorTimelineView) => TimelineModel {
  let held: { key: string; model: TimelineModel } | undefined;
  return (scope, invocationId, view) => {
    // The row the inspector draws as current: the selected key's row, else the cursor, clamped to the rows that exist.
    const wanted = (view.selected ? projection.indexOf({ scope, invocationId, key: view.selected }) : undefined) ?? view.index;
    const probe = projection.window({ scope, invocationId, offset: wanted - (wanted % page), limit: page });
    const current = Math.min(wanted, Math.max(0, probe.total - 1));
    const request: TimelineRequest = {
      scope, invocationId, offset: current - (current % page), limit: page, zoom: view.zoom, pan: view.pan, columns, relationLimit: page,
    };
    const key = JSON.stringify([probe.revision, projection.relationRevision(), request]);
    if (held?.key !== key) held = { key, model: buildTimelineLanes(projection, request) };
    return held.model;
  };
}

/**
 * Open the inspector for a workflow run.
 *
 * All six controls are wired: `onKill` aborts the run's controller, while
 * pause/resume and per-agent skip/retry go through `task.control`, the handle
 * `runWorkflow` hands back. `onOpenAgent` is the odd one out — it opens the
 * child's conversation rather than changing the run. The dialog derives its key
 * hints from the actions it is handed, so the footer advertises exactly what
 * works — see `WorkflowDialogActions`.
 */
export async function showWorkflowDialog(
  ctx: ExtensionCommandContext,
  task: WorkflowTask,
  deps: WorkflowMenuDeps,
): Promise<void> {
  // Overlaid on the same terms as the conversation viewer, because they are
  // reached the same way: both are rows of the fleet list, and opening one
  // must not behave unlike opening the other. Inline, the frame would render
  // into the conversation and stay in the scrollback after it closed.
  const { VIEWPORT_HEIGHT_PCT } = await import("./conversation-viewer.js");
  /**
   * This dialog's own overlay, so `c` can hide it while the conversation is
   * up. Overlays stack, so the viewer would render *over* it either way —
   * but the two frames size themselves to different content, and the taller
   * one's edges show around the shorter. Hidden, there is nothing to peek
   * out, and un-hiding puts the focus back on the dialog when the viewer
   * closes.
   */
  let overlay: { setHidden(hidden: boolean): void } | undefined;
  // One topology read side per open dialog: it holds the selected node's slice and goes with the overlay (wb-6ze.24).
  const host = deps.observation;
  const topology = host?.relationPage !== undefined ? selectedNodeTopology(host.projection, host.relationPage) : undefined;
  // And one timeline lane read side, for a host that declares both its read cap and its bar viewport (wb-6ze.35).
  const lanes = host?.relationPage !== undefined && host.timelineColumns !== undefined
    ? timelineLanes(host.projection, host.relationPage, host.timelineColumns)
    : undefined;
  await ctx.ui.custom<undefined>(
    (tui, theme, _keybindings, done) =>
      new WorkflowDialog(
        tui,
        // Re-read on every render: the run is in the background, so the
        // dialog has to follow it rather than snapshot it at open time.
        () => {
          const observationScope = deps.observation?.scope(task);
          return {
            progress: task.workflowProgress,
            ...(observationScope && deps.observation ? { observation: {
              projection: deps.observation.projection,
              scope: observationScope,
              invocationId: task.id,
              title: task.meta?.name ?? task.workflowName ?? task.id,
              status: task.status,
              ...(deps.observation.evidence !== undefined ? { evidence: deps.observation.evidence } : {}),
              ...(topology !== undefined ? { topology: (node: ObservedNode) => topology(observationScope, node) } : {}),
            } } : {}),
            // The timeline view's lane model goes with the observation it is built from (wb-6ze.35).
            ...(observationScope && lanes !== undefined ? { timelineLanes: (view: InspectorTimelineView) => lanes(observationScope, task.id, view) } : {}),
            task: {
              status: task.status,
              workflowName: task.workflowName,
              startTime: task.startTime,
              endTime: task.endTime,
              totalPausedMs: task.totalPausedMs,
              replayedCount: task.replayedCount,
              replayedNodeCount: task.replayedNodeCount,
              reconciledNodeCount: task.reconciledNodeCount,
            },
            meta: task.meta,
            agentCount: task.agentCount,
          };
        },
        theme,
        done,
        {
          onKill: () => {
            if (task.abortController.signal.aborted) return;
            task.abortController.abort();
            ctx.ui.notify(`Stopped workflow "${task.meta?.name ?? task.id}".`, "info");
          },
          onPause: () => {
            if (pauseWorkflowTask(task)) {
              // Named rather than implied: "paused" on a run whose agents are
              // still finishing reads as a stronger promise than it is.
              ctx.ui.notify("Paused — running agents finish, no new ones start.", "info");
            }
          },
          onResume: () => {
            if (resumeWorkflowTask(task)) ctx.ui.notify("Resumed.", "info");
          },
          onSkipAgent: index => {
            if (task.control?.skip(index) !== true) {
              ctx.ui.notify("Nothing to skip — that agent has already finished.", "info");
            }
          },
          onRetryAgent: index => {
            if (task.control?.retry(index) !== true) {
              // The window is exactly "while it is running": before that
              // there is nothing to stop, after it the script has its answer.
              ctx.ui.notify("Only a running agent can be retried.", "info");
            }
          },
          onOpenAgent: recordId => {
            if (recordId.startsWith("claude:")) {
              if (!deps.viewClaudeTranscript) {
                ctx.ui.notify("Claude transcript viewer is unavailable.", "warning");
                return;
              }
              overlay?.setHidden(true);
              void deps.viewClaudeTranscript(ctx, recordId.slice("claude:".length))
                .catch(err => ctx.ui.notify(
                  `Could not open Claude transcript: ${err instanceof Error ? err.message : String(err)}`,
                  "warning",
                ))
                .finally(() => overlay?.setHidden(false));
              return;
            }
            const record = deps.getRecord(recordId);
            // A run's children are records like any other, so they are swept
            // ten minutes after they finish — the row outlives the
            // conversation it points at, and saying why beats an overlay that
            // opens empty.
            if (record === undefined) {
              ctx.ui.notify("No conversation left — agent records are dropped ten minutes after they finish.", "info");
              return;
            }
            overlay?.setHidden(true);
            // Caught before the `finally`, so a viewer that fails to open
            // still un-hides the dialog and cannot surface as an unhandled
            // rejection out of a detached promise.
            void deps.viewAgentConversation(ctx, record)
              .catch(err => ctx.ui.notify(
                `Could not open the conversation: ${err instanceof Error ? err.message : String(err)}`,
                "warning",
              ))
              .finally(() => overlay?.setHidden(false));
          },
        },
      ),
    {
      overlay: true,
      overlayOptions: { anchor: "center", width: "90%", maxHeight: `${VIEWPORT_HEIGHT_PCT}%` },
      onHandle: handle => { overlay = handle; },
    },
  );
}

/**
 * Open a run from the fleet list.
 *
 * The list hands back an id rather than a task, so a run that settled and was
 * swept between render and keypress is a no-op instead of a crash. `esc` in the
 * dialog closes it and control returns to the list — which is why the promise
 * is handed back: the list puts the cursor back on the run rather than dropping
 * the reader at `main`.
 */
export function openWorkflowFromFleet(id: string, deps: WorkflowMenuDeps): Promise<void> | void {
  const task = deps.tasks.get(id);
  const ctx = deps.getCtx();
  if (task === undefined || ctx === undefined) return;
  return showWorkflowDialog(ctx, task, deps);
}

/** `/agents → Workflows` — list this session's runs, open one. */
export async function showWorkflowsMenu(
  ctx: ExtensionCommandContext,
  deps: WorkflowMenuDeps,
): Promise<void> {
  const tasks = [...deps.tasks.values()].sort((a, b) => b.startTime - a.startTime);
  if (tasks.length === 0) {
    ctx.ui.notify("No workflows in this session.", "info");
    return;
  }
  if (tasks.length === 1) {
    await showWorkflowDialog(ctx, tasks[0], deps);
    return;
  }
  // More than one: pick first. Newest at the top, since that is almost
  // always the one being asked about. `select` deals in plain strings and
  // hands back the string, so the label has to be unique or `indexOf` maps
  // the second run of a workflow onto the first — the run id makes it so.
  const labels = tasks.map(
    task =>
      `${task.meta?.name ?? task.id} — ${task.status}, ${task.agentCount} agent${
        task.agentCount === 1 ? "" : "s"
      } · ${task.id}`,
  );
  const picked = await ctx.ui.select("Workflows", labels);
  const index = picked !== undefined ? labels.indexOf(picked) : -1;
  if (index >= 0) await showWorkflowDialog(ctx, tasks[index], deps);
}
