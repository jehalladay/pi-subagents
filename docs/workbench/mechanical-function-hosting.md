# MechanicalWorkflows function hosting: current and target

**Audience:** operators and contributors to Pi Workflow Workbench. **Status at 2026-11-09 audit pins: first-class Pi→Mechanical function invocation not shipped.** Start with the [current package-local full implementation and verification plan](../programs/mechanical-native-interoperability-2026-11-09/README.md); the [November 6 audit](programs/mechanical-interoperability-audit-2026-11-06/README.md) remains dated history. Pi worktree preservation, two detached Claude grant producers and pre-dispatch run-abort checks have gained implementation/test improvements since that history; native registered function dispatch, domain observation and durable cross-host recovery remain open.

## Available now

Pi runs script workflows through its configured actual Claude Agent SDK host and has separate native provider readers, lifecycle observations and controls. MechanicalWorkflows separately provides an ordinary `develop(services,request)` function, an exact SHA-256 installed local tarball loader, a corrected committed descriptor and opt-in Claude/Git/Forge developer rig. The existing registered Pi `workflow_execute` returns `unsupported-definition-kind` for a `function` definition. There is no currently documented runnable Pi function-launch command; do not copy a proposed example and call it working.

## Target (not runnable yet)

An operator chooses a host-allowlisted, digest-pinned Mechanical function definition and a clean source checkout. Pi validates its own saved definition and the independently pinned npm artifact, checks exact host-bound grants and launches the installed function. The Mechanical application host binds four callbacks: limited Git tracked-file census, explicitly plain task context, single native Claude SDK writer and native Forge gate. Pi observes the resulting changed Git commit/tree and verified operation, with original `verified_candidate` / `verification_failed` / `needs_evidence` / `indeterminate` domain outcomes kept separate from process, transport and source freshness.

A stop requests native interruption and does not roll back writes. An unknown effect remains uncertain and is reconciled before any retry. A long-lived function must be registered and observable; passing a CLI shell command through `node()` is not equivalent.

## Producer boundaries

Git census is **not** complete task-scoped HyperUnix evidence. A 2026-11-06 installed HX probe reported task-scope unsupported and explicitly left Git census available. Pi ReactiveFiber `--no-commit` preview is observation only and cannot satisfy Mechanical's committed render ID, provenance and budget requirements. Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical.

## Where to implement

The [2026-11-06 program](programs/mechanical-interoperability-audit-2026-11-06/README.md) maps source-level defects, audited feedback, proposed contract, Beads work groups and native acceptance. Agent skill: `.agents/skills/pi-mechanical-interop/SKILL.md`. Mechanical counterpart: [its host program](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06). Do not mark W11 current/shipped until a real registered Pi invocation and producer-native receipts prove it.
