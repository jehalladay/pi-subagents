# 16 — Fork implementation refactor map and upstream compatibility

## Principle

**Don't delete the Pi extension to extract the interpreter.** Pi is primary interactive workbench, and the original Agent tool is not the subject of this migration. Move only enough code to establish correct boundaries; preserve source history/tests/upstream update path.

## Source-level refactor plan

| Existing path | Planned change |
| --- | --- |
| src/workflow/runtime.ts | Keep scheduler/WorkflowHost; add typed node RPC, progress and non-agent effect policies |
| src/workflow/worker-source.ts | Preserve existing globals and safety checks; add node() host bridge |
| src/workflow/host.ts | Keep explicit legacy Pi host under config where useful; add Claude host at separate module |
| src/agent-runner.ts | Retain for upstream Pi Agent tool; no workflow agent calls under Claude mode |
| src/workflow/progress.ts | Separate native event projector and presentation grouping; keep legacy compatibility tests |
| src/workflow/journal.ts | Restrict to safe legacy agent replay; effectful SDK nodes go through native reconciliation |
| src/ui/workflow-card.ts | Extend with SDK node types without inflating inline transcript |
| src/ui/workflow-dialog.ts | Evolve pure view models/key reducers into overview/graph/timeline/evidence |
| src/ui/conversation-viewer.ts | Reuse UI where possible but supply Claude transcript adapter, not fake Pi Session |
| src/ui/fleet-list.ts | Preserve legacy and add workbench run entry |
| src/index.ts | Register Pi commands/tools/feature flags; preserve other extension initialization |
| docs/workflows.md | Treat as legacy language contract and update only with tested compatibility changes |

## New paths (proposed)

    src/workbench/
      claude-host.ts
      claude-sessions.ts
      claude-events.ts
      capability-registry.ts
      node-dispatch.ts
      provider-context.ts
      observation/
        native-readers.ts
        projection.ts
        relations.ts
        selectors.ts
      pi/
        tool-surface.ts
        commands.ts
      ui/
        inspector.ts
        timeline.ts
        graph.ts
        evidence.ts
      hosts/
        local.ts
        detached.ts           # P2
        furnace.ts            # P2
      providers/
        forge.ts
        furnace.ts
        hyperunix.ts
        reactivefiber.ts
        mechanical.ts

Do not physically create every path until an actual vertical cut needs it. Keep package dependency graph narrow. Avoid new monorepo foundation unless independently installed runtime components require extraction.

## Compatibility feature control

- Explicit backend configuration: workflowAgentBackend = "claude" for Workbench mode; existing upstream default behavior preserved until migration is validated.
- Never silently choose Pi backend after Claude SDK failure. If a legacy Pi path remains enabled, it must be explicitly selected/labeled.
- Maintain existing Workflow/SubagentWorkflow collision detection and dialog/menu semantics.
- Preserve original config migration and saved-workflow file precedence.
- Ensure older journal format remains readable when supported, but does not become unsafe reuse for effectful calls; compatibility may require explicit "journal unsupported" warnings.
- Tests must run in both upstream/Pi and new/Claude workbench modes until a documented deprecation is approved.

## Upstream maintainability

Record fork divergence in this documentation. Preserve MIT copyright, license and original contributors. Prefer small, clearly bounded changes to src/workflow and src/ui over global rewrite. Keep a focused upstream sync process that checks source changes to runtime, worker, progress, dialog and SDK APIs. No force merges over local correctness contracts.


## Measured fork divergence

Pre-existing upstream paths under `src/` and `test/` (outside `src/workbench` and `test/workbench*`) that the fork has modified since the baseline fork commit. The baseline sha is carried only by the `Baseline:` line in `docs/workbench/TRACEABILITY.md`. `test/workbench-upstream-divergence.test.ts` measures `git diff --name-only --diff-filter=M <baseline> HEAD` and fails on any unrecorded, stale or misrecorded row. This table is the measured record; the source-level refactor plan above stays a plan.

| path | recorded at | note |
| --- | --- | --- |
| `src/index.ts` | b44f1ce | +482 -18 lines against the baseline |
| `src/settings.ts` | b44f1ce | +79 -1 lines against the baseline |
| `src/ui/workflow-card.ts` | b44f1ce | +55 -12 lines against the baseline |
| `src/ui/workflow-dialog.ts` | b44f1ce | +303 -62 lines against the baseline |
| `src/ui/workflow-menu.ts` | b44f1ce | +44 -12 lines against the baseline |
| `src/workflow/host.ts` | b44f1ce | +1 -0 lines against the baseline |
| `src/workflow/journal.ts` | b44f1ce | +99 -1 lines against the baseline |
| `src/workflow/meta.ts` | b44f1ce | +67 -197 lines against the baseline |
| `src/workflow/progress.ts` | b44f1ce | +72 -5 lines against the baseline |
| `src/workflow/runtime.ts` | b44f1ce | +448 -19 lines against the baseline |
| `src/workflow/saved.ts` | b44f1ce | +4 -5 lines against the baseline |
| `src/workflow/task.ts` | b44f1ce | +111 -25 lines against the baseline |
| `src/workflow/tool-description.ts` | b44f1ce | +4 -1 lines against the baseline |
| `src/workflow/worker-source.ts` | b44f1ce | +151 -48 lines against the baseline |
| `test/workflow-journal.test.ts` | b44f1ce | +91 -0 lines against the baseline |
| `test/workflow-meta.test.ts` | b44f1ce | +4 -5 lines against the baseline |
| `test/workflow-progress.test.ts` | b44f1ce | +17 -0 lines against the baseline |
| `test/workflow-render.test.ts` | b44f1ce | +29 -0 lines against the baseline |
| `test/workflow-task.test.ts` | b44f1ce | +148 -0 lines against the baseline |
| `test/workflow-tool-description.test.ts` | b44f1ce | +9 -0 lines against the baseline |

## Migration acceptance

Existing upstream Pi agent workflows, script saved paths and UI work after extension reload. Claude Workbench mode can run and observe real Claude SDK agents; no accidental duplication of tools or permission escalation. Headless or detached host doesn't require launching Pi's TUI process.