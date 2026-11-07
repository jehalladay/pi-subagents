# 01 — System audit: installed architecture and evidence

**Method:** inspected current default-branch trees, key source paths, representative tests, published descriptors, earlier programs, native producer receipts and agent feedback. Static audit only. Source presence and committed test code are not newly witnessed test passes; unlanded machine branches and external journals were not enumerated.

## Topology

| Subsystem | Implemented at pins | Boundary |
|---|---|---|
| Pi workflows | `src/workflow/{runtime,worker-source,journal,host}.ts`; `agent/parallel/pipeline/node` | Script and bounded worker execution, not an arbitrary Mechanical host; nested function limits apply |
| Native Claude SDK | `src/workbench/claude-host.ts` | Real workflow agent sessions, observations and runtime-wide abort; replay/source and per-agent startup gaps |
| Registered Pi tool | `src/workbench/execute-tool.ts` | Digest/grant checked launch; `function` and `furnace-formula` refused before launch |
| Native providers | `src/workbench/native-modules.ts` and Forge/Furnace/HX/RF adapters | Scoped read/observation and native actions, not Mechanical's four callbacks |
| Detached host | `src/workbench/hosts/local-detached.ts` | Explicit authorization; registered Claude request passes incompatible empty grants |
| Worktrees | `src/worktree.ts` | Historic isolation/cleanup path with dangerous preservation-error catch |
| Mechanical development | `packages/development/src/{develop,contracts}.ts` | Ordinary typed function: discover, compileContext, implement, verify |
| Mechanical installed host | `apps/development-rig/src/{entrypoint-host,installed-host}.ts` | SHA-256 local tarball, offline install and validated domain return; trusted in-process JS |
| Mechanical live rig | `apps/development-rig/src/live-development.ts` + SDK/Forge/RF/HX/Furnace modules | Historical bounded live producer runs; not a Pi invocation binding |
| Coordination | `packages/coordination` and Pi `src/workbench/collective-event.ts` | Pure policy evaluation and read-only Mechanical-event boundary, not first-class function launch |

## Findings

**P0 PI-WT — Potential loss of edited source.** `cleanupWorktree` stages/commits/branches on the normal path, but on preservation failure its outer catch attempts `git worktree remove --force` and returns `hasChanges:false`. This can discard recoverable changes after commit or branch failure. A concrete injected failure and byte-preservation assertion must precede use by a Mechanical writer. Pi Claude workflow `isolation:"worktree"` currently refuses, so a requested isolation flag is not a working substitute.

**P1 PI-FUNC — Missing first-class function dispatch.** `src/workbench/execute.ts` models `script/function/furnace-formula`, whereas `execute-tool.ts:217-218` deliberately rejects non-script definitions with `unsupported-definition-kind`; its test explicitly expects refusal. No native Mechanical host is registered. Do not replace this with a shell-backed `node()` or pretend that a separate Mechanical rig's CLI is Pi interop.

**P1 PI-AUTH — Detached grant contradiction.** The registered launcher in `src/index.ts` passes `backend:"claude"` with `grants:[]`; `local-detached.ts` requires `claude:invoke` and exact `claude:tool:...` grants. Audit both registered detached launch paths. Keep the validator; fix host-grant propagation and test the registered path.

**P1 PI-CANCEL — Potential late per-agent query.** `claude-host.ts` awaits `beforeDispatch` before registering the controller. Workflow-wide abort is rechecked, but `abortAgent(agentId)` can miss a pending per-agent skip/retry. This remains a race hypothesis requiring a parked barrier and query-count reproduction; do not declare it witnessed or repaired without that experiment.

**P1 PI-REPLAY — Incomplete source identity.** Pi's replay key contains cwd, model, permission mode, setting sources, tools, roles, grants and principal, but not measured Git base commit/tree, skill/instruction bytes, provider versions or effect references. Mechanical's newest prompt/config and Forge-manifest hashes are useful **app-local** foundations, not a complete joint replay basis.

**P1 PI-RESULT — Function lifecycle absent.** Pi separates launch from completion already, but has no Mechanical domain-state projection or native-source/journal adapter. Mechanical's `verified_candidate`, `verification_failed`, `needs_evidence` and `indeterminate` must remain distinct from a resolved Promise, transport result, native Forge verdict and Furnace Attempt status.

**P1 MW-HOST — Incomplete packaged consumer.** Mechanical's library is a versioned export; its transient installed host exists, but `@mechanical/development-rig` declares a CLI bin and no stable explicit host API export for Pi. The host requires trusted caller-provided service callbacks and imports pinned JS into its own process, not a sandbox. Pi needs a real independent installed consumer plus write authority.

**CORRECTED, not open P0 — Descriptor drift.** Mechanical commit `1f29daa7` repaired schema refs in `contracts/entrypoints/development.v1.json` and introduced tests reading the committed file with a packed tarball. Old present-tense November 4 mismatch claims were true at an earlier baseline but false at these pins. New code must protect the repair rather than implement it again.

**P1 MW-CANCEL — Partial cancel.** Mechanical commit `f7c0a943` added `signal?: AbortSignal`, honored at pre-dispatch barriers only and not passed into the running SDK. Commit `97e18068` adds prompt/config and gate manifest identities. Mid-session cancel, dirty-write reconciliation, cross-host replay and no-duplicate effects remain to implement.

**P1 HX/RF — Evidence distinction.** A fresh Pi 2026-11-06 native HX probe recorded incomplete normal filesystem coverage (exit 3), best-effort exit 0 still incomplete, and GitView find failure `view-binding-pending` (exit 4); its verdict is `task-scope-unsupported` and it explicitly **does not block Git-census**. Pi RF `--no-commit` preview has no committed render ID; Mechanical's RF context adapter requires task/revision-grounded text, nonempty render ID, graph/output digest and verified budget.

**P2 RELEASE/PERF — Aggregate pressure and stale docs.** Per-workflow semaphores do not provide global bounds across workflows/functions/Furnace attempts. W11 feature-matrix status is historical planned but its broad mechanical grep sentence overlooked existing `collective-event.ts`. Avoid old blanket absence language and default-timeout/serialized-gate regressions documented in feedback.

## What can be claimed

Implemented sources and authored tests: yes. Mechanical native SDK/Forge/Furnace/RF journeys in `qa/integration/`: historically recorded, 2026-10-15. Pi recorded 2026-11-06 HX and Forge probes: producer-scoped. Pi `wb-muip` found no joined Pi-run/Mechanical-outcome/Forge-operation/source-pin in its declared in-repo receipt scope and explicitly returned global **UNDETERMINED**. A first registered Pi function → Mechanical live run has **no located joined witness in those stores**, not a proven universal historical absence. No fresh runtime execution occurred here.
