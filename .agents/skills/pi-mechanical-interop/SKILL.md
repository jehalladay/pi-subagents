---
name: pi-mechanical-interop
description: Use when designing, implementing, auditing, or operating Pi Workbench invocation of MechanicalWorkflows functions, including pinned artifacts, native HX/RF/Claude/Forge services, Furnace hosting, source-basis proof, and effect recovery.
---

# Pi Workbench ↔ MechanicalWorkflows integration

**Start with the current local Pi design program:** `docs/programs/mechanical-native-interoperability-2026-11-09/README.md`, then `01-AUDIT-AND-PROTOCOL.md`, `02-IMPLEMENTATION-PACKAGES.md` and the **mandatory** `03-VERIFICATION-AND-RELEASE.md`. Read `AGENTS.md`, current W11, program Beads, and the paired Mechanical program. The November 4/6 EAT/triage corpus is historical requirements provenance, not current runtime status. Re-pin both default branches, active machine branches, and installed SDKs before changes.

## Actual current state

- Pi has a real Claude SDK workflow host and tools `workflow_execute`, `workflow_observe`, `workflow_control` and `workflow_reconcile`. `workflow_execute` accepts **only script** definitions today; function and furnace-formula are modelled but refused.
- Mechanical exports `develop(services,request)` and has a corrected descriptor plus pinned installed local tarball loader; Pi does not yet call it through registered function dispatch. Pi already has `mechanical-descriptor.ts`, `function-authority.ts`, `source-admission.ts` and read-only collective-event integration; these are partial/inert foundations, not a current production function host.
- Mechanical's checked-in descriptor and its entrypoint host disagreed about schema reference spelling at `0c78e253`; they agree since MW `1f29daa7` (bare filenames). Keep testing the checked-in file, not a constructed approximation.
- Both registered detached Claude producers now select and forward host-held `claude:invoke` and exact `claude:tool:<name>` grants; regression tests exercise preflight. Never weaken that validator, and do not treat a detached script receipt as Mechanical function proof.
- Mechanical's `developLive` Git-census/plain journey and post-dispatch uncertainty/reconciliation records exist independently. Pi's worktree preserve-on-failure and Claude pre-dispatch abort fixes exist for tested forms. Host-owned `evidenceProfile`/`contextProfile` and exact function action grant are *proposals*, not deployed. No registered Pi→Mechanical native joined acceptance is established. HX task scope and committed RF provenance remain separate producer gates.

## Effective engineering loop

1. Read both module implementations, Beads/current feedback and target docs. Capture exact source/SDK versions.
2. Write a red test at the consumer boundary; inject a real committed descriptor and, where applicable, an actually packed tarball.
3. Build the smallest host-owned service binding; retain original Mechanical functions, source basis, provider evidence, and the four outcome variants.
4. Bind write privileges to host-authorized source/workspace/identity. No user-supplied JS/exports, ambient credentials, implicit Pi worker authority, or blind effect retries.
5. For live implementation, use one clean isolated Git workspace and require actual changed commit/tree + matching native Forge evidence. Preserve the repaired `WorktreePreservationFailedResult` behavior; extend it to process death/late SDK effects rather than restating historical destructive cleanup as current.
6. Honor whole-run cancellation both before and after awaited `beforeDispatch`, and independently test per-agent skip. A late SDK/tool result does not prove rollback. Replay only matching source/instructions/skills/SDK/provider/capability basis, with a native effect journal and read-only reconciliation for unknown effects.
7. Run exact focused tests, adversarial mutant, Forge gate, and live scratch journey when claiming native acceptance. Record commands, source SHA, provider versions and references. If not run, say not run.
8. Update docs, status matrix and this skill in the same code cut. Pi receipts are per real bead under `docs/workbench/receipts/`; leave historical TRACEABILITY frozen.

## Routing

- Pure coordination evaluation: registered allowlisted function, read-only result; **not** effect authorization.
- Long-lived `develop()`: **target** `workflow_execute(kind:function)` async launch, not currently runnable; the registered tool presently refuses `function`. Never tell operators to use a proposed command as though shipped or fall back to a shell `node()` as acceptance.
- UI observation: source native refs and exact domain status; never infer Forge PASS from function/process success.
- Durable work: Furnace ExecutorApp and actual Run/Attempt IDs; Pi is only controller/observer when explicitly authorized.
- Upstream API missing: document a precise reproducible blocker; never create a pretend local facsimile.

## Mandatory first release tail (2026-11-09)

The local P08–P10 packets are required after first joint native P07: actual registered-path admission/authorization and four-domain tests, adversarial mutants, independently packed external Mechanical consumer, real Claude session and matching native Forge PASS/FAIL/unknown, process kill/lost ack/late cancel preserving tracked and untracked work, 1/4/16 workload and observation resource measurements, script/subagent/detached regressions, ten agent UX scenarios, and clean full Forge gates on final merged tree. W11 remains not shipped without this proof. Keep receipts on real per-bead IDs; do not modify historical TRACEABILITY to manufacture readiness. Update README, current host guide, W11, this skill and operator help in the corresponding code cut; no new scheduler, Library dependency or GitHub CI.
