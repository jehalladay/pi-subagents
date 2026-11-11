# 01 — Current code and integration audit

## Evidence method and scope

Read the two default-branch trees at the pins in the README; compared Mechanical commits since its 2026-11-04 interop baseline and Pi's registered launcher, detached host, worktree and Claude adapter. Inspected Mechanical tests, documentation, 2026-10-15 live producer receipts, Pi's 2026-11-06 HX and Forge probes, and Pi's epistemic triage. This is **static** and does not measure the live installed environment today. A test file's existence is not a passing test result. No claims are made about uncommitted machine work.

| Boundary | Implemented source | Audit reading |
|---|---|---|
| Core | `packages/development/src/{develop,contracts}.ts` | Typed function with four injected services; outcomes are domain states, not generic success |
| Descriptor | `contracts/entrypoints/development.v1.json`; `entrypoint-host.ts` | **Corrected** by `1f29daa7`: bare schema filenames now agree with exact loader predicate |
| Installed artifact | `installed-host.ts`; `entrypoint-descriptor-file.test.ts` | Offline, SHA-256-pinned npm tarball and real-file-driven tests exist; imported JS remains trusted in-process code |
| Live application | `live-development.ts`, `claude-implement.ts`, `live-gate.ts` | Git census, optional RF context, native Claude edits/commit, Forge verification; historical 2026-10-15 bounded live receipts |
| Native services | `hx-scope.ts`, `rf-context.ts`, Forge/Furnace adapters | HX task-scope not certified; RF committed context exists as separate rig mode; Furnace owns Run/Attempt |
| Coordination | `packages/coordination/src/index.ts` | Pure policy/evaluation candidates; must never convert policy output into native authority |
| Pi consumer | Pi `src/workbench/execute-tool.ts:217-218` | Registered tool intentionally refuses `function` and `furnace-formula`; no Mechanical invocation binding |
| Packaging | Rig `package.json` | CLI `bin` declared; no stable explicit package `exports` subpath for Pi host API |

## Findings, ordered by severity

**P0, external-to-Mechanical:** Pi `src/worktree.ts` catches preservation errors, attempts forced removal and returns `hasChanges:false`. This can erase recoverable agent edits after commit/branch failure. Do not adopt this cleanup path for the Mechanical writer. Exact loss under injected failures is a required regression, not an execution witnessed by this audit.

**P1, cross-repo:** no authorized host entry in Pi's `workflow_execute`. Pi supports the kind in its definition model yet explicitly refuses it. The loader and a separate live rig do not constitute a running Pi integration.

**P1, Mechanical-owned:** no stable versioned, independently installed **rig-host** export and no Pi-specific application-owned service graph. Existing `invokeInstalledDevelopment` requires trusted callbacks; it does not discover credentials, materialize a workspace or authorize edits automatically. A successful local unit test can call fake `verify` with Forge-shaped evidence, so only native producer correlation can establish a real PASS.

**P1, Mechanical-owned:** `AgentOptions.signal` added by `f7c0a943` is checked before dispatch but not passed to the SDK, and `developLive` does not own a typed active cancel/recovery protocol. Interrupted writes are not rolled back. `97e18068` adds prompt/config and gate manifest fingerprints but not complete cross-host source, skill, provider and effect identity.

**P1, external-to-Mechanical:** Pi's registered detached Claude request currently forwards `grants:[]`, while its detached validator requires `claude:invoke` and exact tool grants. Pi's `beforeDispatch` registers the per-agent controller afterwards: skip/retry during this await may miss cancellation. The latter is a plausible race requiring a parked-barrier test, not a witnessed late query.

**P1, native producer:** the 2026-11-06 HX producer probe (`pi-subagents/qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json`) reports filesystem coverage incomplete and a revision-pinned find failing `view-binding-pending`. Verdict `task-scope-unsupported`; the record explicitly does **not** block Git-census. `rf-context.ts` requires committed `render_id`, graph revision, output digest, task/revision text and verified budget. Pi's `--no-commit` preview cannot substitute.

**P1, outcome projection:** `DevelopmentOutcome` has `verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate`; Pi must preserve all four independently from invocation termination, source freshness and Forge verdict.

**P2, lifecycle/performance:** host-wide limits, bounded queueing and replay/reattach for active functions are not established by each library's local concurrency controls. In-process trusted packages are not sandboxes; no general durable recovery exists just because the package installed offline.

**P2, documentation:** Mechanical `AGENTS.md` and the November 4 program contain historical assertions that the descriptor still disagrees with the loader, or that no external SDK journey has ever been witnessed. Both are stale at the pinned head. The old program remains as dated history; this program and updated skills correct present-tense guidance. Pi W11's historical feature-matrix status remains `planned`; its broad grep claim about no Mechanical reference overlooks the existing read-only `collective-event` integration.

## Evidence discipline

`qa/integration/2026-10-15-live-forge-gate.md`, `2026-10-15-furnace-executor-app-host.md`, `2026-10-15-native-hx-rf-observations.md` and `2026-10-15-combined-live-composition.md` are historical, producer-scoped witnesses, **not** Pi→Mechanical acceptance. Pi `wb-muip` found no joined run/outcome/Forge/source witness in its declared in-repo stores and explicitly classified global absence as **UNDETERMINED**, not never-ran. The fresh Forge transport probe witnessed native FAIL with exit 1 for its tested argv; it did not prove the universal absence of exit-0 failed-gate pairings.
