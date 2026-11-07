# Pi Workbench × MechanicalWorkflows — reconciled audit and design program

**Dated:** 2026-11-06. **Status:** source-based audit and proposed implementation, not delivered first-class interoperability. Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation.

The companion Mechanical program is at [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06). This program reconciles, rather than silently rewrites, the [November 4 design](../mechanical-workflows-interop-2026-11-04/README.md) and its [epistemic audit](../mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/EPISTEMIC-AUDIT.md), [remediation ledger](../mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/REMEDIATION.md), [atomic requirements](../mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md), [TDD matrix](../mechanical-workflows-interop-2026-11-04/triage/requirements/TDD-MATRIX.md) and [25-group bead plan](../mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md).

## Read in order

1. [01 — Runtime/system audit](01-current-system-audit.md)
2. [02 — Agent feedback and epistemic reconciliation](02-feedback-and-epistemics.md)
3. [03 — Executable function-host contract](03-function-host-contract.md)
4. [04 — Landable implementation slices](04-implementation-program.md)
5. [05 — Adversarial QA, operator lifecycle and documentation](05-qa-operator-guide.md)
6. [Operator guide](../../mechanical-function-hosting.md) and `.agents/skills/pi-mechanical-interop/SKILL.md`.

## Verdict

Pi already has a real Claude Agent SDK workflow host, script interpreter, native provider readers, observations, controls and detached infrastructure. Mechanical already has ordinary `develop(services,request)`, an offline digest-pinned package loader, corrected committed descriptor and historical bounded real Claude/Git/Forge journeys. However the **registered Pi `workflow_execute` still explicitly rejects `function`**. No Pi-to-Mechanical function launch is established by the inspected in-repo receipts.

The first demonstrable delivery should be one registered Pi function launch -> installed exact Mechanical artifact -> one isolated clean Git checkout -> explicitly labeled Git-tracked-file census and plain context -> native Claude SDK agent -> matching changed commit/tree and Forge operation -> Pi observation of Mechanical's original four outcome arms. Certified HX task scope and committed RF are separate later gates.

**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions.

No code, fresh test, Forge gate, native SDK invocation or live Pi→Mechanical run was performed for this documentation program. All earlier native receipts are historical at their stated revisions.

## Boundaries

Pi is launch/admission/observation/control, not a second Beads authority, Forge verifier, Furnace scheduler, HX coverage engine or RF renderer. Mechanical remains ordinary typed functions with application-supplied callbacks and no Pi dependency in core. Claude SDK owns agent sessions; Forge and Furnace remain independent. No mandatory DSL, universal tool ABI, arbitrary module/shell fallback, Library dependency or new GitHub CI.
