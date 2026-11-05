# 01 — Cross-repository technical audit and evidence

**Method:** pinned source inspection of both default branches, documented tests, current feature/status matrices, and Pi `new-feedback/` (including 2026-11-01 to 2026-11-03 reports). This is **static audit**, not live verification. Source existence is not proof of successful end-to-end deployment. Treat performance numbers in feedback as historical producer measurements at their pinned windows, not re-measurements here.

## What exists

| Surface | Existing implementation | Where / boundary | Grade |
| --- | --- | --- | --- |
| Pi Claude executor | Real `@anthropic-ai/claude-agent-sdk` query, session observation, abort, resume, role/model handling | `src/workbench/claude-host.ts`; `src/index.ts` | Source implemented, tests and receipts recorded |
| Pi JS workflow interpreter | `agent`, `parallel`, `pipeline`, `node`, nested functions, bounded worker | `src/workflow/runtime.ts`; `worker-source.ts` | Source implemented |
| Pi invocation and UI | `workflow_execute` launch, `workflow_observe`, `workflow_control`, `workflow_reconcile`, projection and inspector | `src/workbench/execute-tool.ts`; `src/index.ts` | Script use implemented; function use not implemented |
| Pi native providers | Forge status; HX find; Furnace inspect; RF preview; separate Forge operation/control and Furnace-hosted adapter | `src/workbench/providers/*`; `hosts/furnace-hosted.ts` | Real adapters, limited operation-specific contracts |
| Mechanical development function | `develop(services, request)`, early stop on incomplete discovery, candidate basis and producer verification evidence | `MechanicalWorkflows/packages/development/src/{develop,contracts}.ts` | Source implemented |
| Mechanical installed local host | SHA-256 tarball validation, offline installation, trusted callback binding, outcome validation | `MechanicalWorkflows/apps/development-rig/src/{entrypoint-host,installed-host}.ts` | Source implemented; packed-tarball tests |
| Mechanical live rig | opt-in Claude → committed candidate → native Forge, plus RF and Beads paths and Furnace executor | `MechanicalWorkflows/apps/development-rig/src/` | Recorded live producer receipts; not a Pi binding |
| Coordination functions | Pure policy combinators, resolution, episodes, replay and training exports | `MechanicalWorkflows/packages/coordination/src/index.ts` | Source implemented; proposed first read-only function consumer |
| Pi-to-Mechanical function invocation | None registered: no Mechanical SDK/host adapter; `workflow_execute` refuses non-script | W11 row of `feature-matrix.md`, `execute-tool.ts` | **Not implemented** |

## Findings and priority

### P0: legacy worktree preservation may discard uncommitted changes

`src/worktree.ts:125-181` commits modified worktrees and removes them. The outer catch of `cleanupWorktree()` force-removes the worktree and reports `hasChanges:false` on preservation errors. The existing worktree tests explicitly exercise this outcome. An effectful Mechanical developer must **not** reuse that cleanup path until it preserves dirty state on failure and yields typed recovery information. A clean success and a failed preservation are not equivalent. Required regression: make `git commit` or branch creation fail after editing, verify bytes and recovery path remain, and ensure no false-clean outcome. The Claude workflow host currently rejects `isolation:"worktree"`; providing a real isolated workspace is a separate work item.

### P1: no first-class function dispatch

`src/workbench/execute.ts` accepts definition kind `function` in its model, but `src/workbench/execute-tool.ts:215-219` refuses all kinds except `script`. `native-modules.ts` registers four read operations only. W11 explicitly remains planned in the feature matrix. Introduce an allowlisted, digest-pinned function host; do not use a shell-backed `node()` or paste Mechanical code into the workflow interpreter.

### P1: checked-in Mechanical descriptor conflicts with its own loader

`MechanicalWorkflows/contracts/entrypoints/development.v1.json` declares input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`. `apps/development-rig/src/entrypoint-host.ts` accepts only the bare filenames `development-request.v1.schema.json` / `development-outcome.v1.schema.json`; tests construct matching descriptors by hand rather than loading the committed JSON. The as-committed descriptor therefore fails the host's descriptor check. Fix and test the authoritative descriptor before Pi consumes it; validate path resolution without traversal.

### P1: detached Claude request contradicts admission rules

`src/index.ts:2621-2630` sends `backend:"claude"` with `grants:[]` for the registered detached `workflow_execute` launch. `src/workbench/hosts/local-detached.ts:430-442` requires `claude:invoke` and exact tool grants. The current construction cannot pass its own preflight. Pass host-validated bounded grants, not script-supplied rights. Add a real tool-to-detached-host positive and explicit missing-grant negative.

### P1: cancellation at the startup boundary

`src/workbench/claude-host.ts:207-220` awaits `beforeDispatch` before adding the agent's controller to its map. `src/workflow/runtime.ts:873-889` calls `abortAgent` for per-agent skip/retry. A skip during that await can miss cancellation (workflow-wide abort uses a separate signal re-check). **Potential race, reproduce before claiming fixed**: hold `beforeDispatch`, skip/retry, release it, assert there is no unapproved SDK dispatch or second attempt.

### P1: replay identity omits source/instruction basis

`src/workbench/claude-host.ts:166-175` includes cwd/model/permissions/tools/roles/grants/principal but not a measured source revision, referenced skill/system instruction contents, or effective provider versions. `src/workflow/journal.ts` and `runtime.ts` enforce effect classes and deny replay of uncertain non-read nodes; preserve those improvements. Add call dependency/source basis, or fail closed for unknown ambient dependencies. Never replay a past coding/verification answer under a changed source tree.

### P1: function writes, lifecycle and evidence are not yet bridged

Mechanical `developLive()` is a single-writer Git side-effect with no general host-supplied AbortSignal in its public options. Pi's `node()` default registry deadline is 30 seconds and cannot substitute for an async, observable function launch. A host must own a clean workspace, explicitly authorize Git writes, honor cancellation through SDK/runner, preserve a candidate or uncertain outcome, and display Mechanical's four result variants separately from function termination and Forge's verdict.

### P1: HX scope vs native read is a semantic gap

Mechanical `apps/development-rig/src/hx-scope.ts` insists on complete `task` scope with revision and digest. Its default native query sets `scopeKind:"filesystem"` and `revision:null`; it cannot authorize the full task-scoped development path. Pi `hyperunix.find` is also a general read, not a complete task-scoped certificate. Ship an honestly named Git-census path first or wait for native producer proof; never relabel a filesystem census as task-complete HX.

### P1: RF read versus committed context cannot be conflated

Pi `reactivefiber.render.preview` uses `--no-commit`; Mechanical `renderTaskContext` expects a nonempty committed `render_id`, context containing task/revision and provenance/budget witness. Reusing Pi's preview response as Mechanical's authoritative `compileContext` would break its documented proof contract. Treat preview as an observation; add a separate producer-backed context adapter or retain the measured Mechanical rig mode.

### P2: global budgets and test feedback

Per-workflow agent/node semaphores do not by themselves bound multiple concurrent workflows, scheduled Pi agents or Furnace attempts. Introduce host-level budgets and measured resource/admission surfaces rather than a second scheduler. Validate positive integer concurrency/caps (`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero). Review recent `new-feedback/` findings on shared census edit conflicts, test deadline inflation, report-mode readers and prep bottlenecks; avoid shared assertion/header files for unrelated cuts. Preserve the per-bead receipt convention; no new shared receipts index or TRACEABILITY edits.

## Audit limitations

- No working tree or installed SDKs were executed; no Forge/Node/Vitest runs, no real Claude/Furnace/HX/RF calls were issued for this audit.
- P0 worktree removal and P1 detached admission are direct source contradictions. Cancellation is a race hypothesis requiring fault injection. Performance and live integration evidence is historical and may drift.
- The Mechanical descriptor path discrepancy is independently checkable against the exact committed JSON and TypeScript host; a descriptor built manually in tests does not establish compatibility with that file.
- Do not collapse Mechanical coordination policy evaluation into effect authorization; a pure intent is not a Beads claim or Forge/Furnace operation.
