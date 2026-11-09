---
name: pi-mechanical-interop
description: Use when designing, implementing, auditing, or operating Pi Workbench invocation of MechanicalWorkflows functions, including pinned artifacts, native HX/RF/Claude/Forge services, Furnace hosting, source-basis proof, and effect recovery.
---

# Pi Workbench ↔ MechanicalWorkflows integration

Read `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md` and its four guides before changing integration code. Also read `AGENTS.md`, `docs/workbench/feature-matrix.md` W11 and MechanicalWorkflows' matching program/skill. Verify both current branch heads and installed SDKs; program source pins are an audit baseline, not permanent truth.

## Actual current state

- Pi has a real Claude SDK workflow host and tools `workflow_execute`, `workflow_observe`, `workflow_control` and `workflow_reconcile`. `workflow_execute` accepts **only script** definitions today; function and furnace-formula are modelled but refused.
- Mechanical exports `develop(services,request)` and has a pinned installed tarball host. Pi does not currently load or call that host. The source tree contains no registered Mechanical binding.
- Mechanical's checked-in descriptor and its entrypoint host disagreed about schema reference spelling at `0c78e253`; they agree since MW `1f29daa7` (bare filenames). Keep testing the checked-in file, not a constructed approximation.
- Pi's registered detached Claude request sends `grants:[]`, but local detached admission demands `claude:invoke`; never remove this grant requirement.
- Mechanical's `developLive` tracked-file census (called Git-census here; no selectable profile ships) is implemented, with 2026-10-15 rig receipts, but it is not certified task-scoped HX. Pi RF preview is not a committed RF render. No Pi-to-Mechanical end-to-end acceptance receipt exists in either repository.

## Effective engineering loop

1. Read both module implementations, Beads/current feedback and target docs. Capture exact source/SDK versions.
2. Write a red test at the consumer boundary; inject a real committed descriptor and, where applicable, an actually packed tarball.
3. Build the smallest host-owned service binding; retain original Mechanical functions, source basis, provider evidence, and the four outcome variants.
4. Bind write privileges to host-authorized source/workspace/identity. No user-supplied JS/exports, ambient credentials, implicit Pi worker authority, or blind effect retries.
5. For live implementation, use one clean isolated Git workspace and require actual changed commit/tree + matching native Forge evidence. Failure to preserve a dirty worktree is P0.
6. Honor cancellation before `beforeDispatch`; late SDK/tool results do not prove cancellation or rollback. Replay only exact source/instructions/capability basis; refuse unknown effect.
7. Run exact focused tests, adversarial mutant, Forge gate, and live scratch journey when claiming native acceptance. Record commands, source SHA, provider versions and references. If not run, say not run.
8. Update docs, status matrix and this skill in the same code cut. Pi receipts are per real bead under `docs/workbench/receipts/`; leave historical TRACEABILITY frozen.

## Routing

- Pure coordination evaluation: registered allowlisted function, read-only result; **not** effect authorization.
- Long-lived `develop()`: `workflow_execute` async function launch, not default 30-second `node()`.
- UI observation: source native refs and exact domain status; never infer Forge PASS from function/process success.
- Durable work: Furnace ExecutorApp and actual Run/Attempt IDs; Pi is only controller/observer when explicitly authorized.
- Upstream API missing: document a precise reproducible blocker; never create a pretend local facsimile.
