# Pi Workbench → MechanicalWorkflows: registered native function interoperability

**Date:** 2026-11-09. **Status:** proposed source-grounded implementation and mandatory verification program, not shipped `workflow_execute(function)`. **Package owner:** pi-subagents. **Paired Mechanical program:** https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-native-interoperability-2026-11-09/

## Goal

Make a reviewed MechanicalWorkflows ordinary `develop(services,request)` function genuinely invocable through Pi's **registered `workflow_execute` function definition**, using an independently installed, digest-pinned Mechanical application host. Return a logical Pi invocation reference and observe original Mechanical domain outcomes, source/Forge native proofs, effects, freshness and control/reconciliation state. Keep script workflows, standalone subagents and provider-native observers working unchanged.

The first acceptance journey is `workflow_execute(kind:function)` → admitted exact Mechanical package/descriptor → one isolated clean Git worktree → `git-census-v1`/plain context → Mechanical four callbacks → native Claude SDK changed commit/tree → native Forge full gate → `workflow_observe` on the same Pi invocation. No script fallback, shell/node alias, direct Mechanical helper call, simulated Forge PASS or document-only W11 graduation satisfies it.

## Local reading order

1. [01 — Audit and versioned execution protocol](01-AUDIT-AND-PROTOCOL.md): pinned code, corrections to old P0s, real missing seam, security and lifecycle contract, explicit ownership.
2. [02 — Pi-side implementation packets](02-IMPLEMENTATION-PACKAGES.md): small sequenced cut ownership, source paths, joint Mechanical handoffs, red tests, status gates and operator/documentation obligations.
3. [03 — Test-and-verification-focused release tail](03-VERIFICATION-AND-RELEASE.md): branch/source/package admission, all four domains, negative mutants, process death, reattach, concurrency, UI, native evidence and W11 release.

The Mechanical repository holds a complete local sibling program; no implementing agent needs to chase documents into Library or another repo to find its own plan.

## Baseline at inspection

- Pi `master` `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164`; Mechanical `main` `62a10b5924ccb10db428999cb148fa23f732e4fe`. Re-pin before implementation, after branch merges and at final Forge gate. Pi `workbench/implementation-program` had diverged from `master` when compared; do not override live agent work or silently certify an unmerged branch.
- Pi source currently registers `workflow_execute` but explicitly refuses non-`script` definitions. Its mechanical descriptor reader, function authority, source admission, workflow journal/observation and detached/Claude hosts are **separate foundations**, not function hosting.
- Pi worktree cleanup now preserves changed bytes with a typed failure result for tested preservation failures; effective detached Claude invoke/tool rights now reach both registered producers; the Claude host rechecks run abort after awaited startup. Keep their regression tests; do not relabel these historical defects as still absent.
- Mechanical has a corrected committed descriptor and packed local host plus real bounded Claude/Git/Forge producer evidence. Its rig lacks a stable exported independent host API for Pi; neither local loader nor native producer history establishes registered Pi interoperability.
- W11 remains unproven at the actual registered function path. Native HX task-scoped completeness and committed RF context are separate later producer gates; Git census/plain mode is allowed without misrepresentation.

## Architecture rules

Pi owns **admission, identity, placement, control, observation and host resource budgets**. Mechanical owns ordinary function composition/domain outcomes; its application host owns trusted four-service binding, Git candidate and SDK edges. Forge/HX/RF/Beads/Furnace retain their independent authorities. Pi does not acquire arbitrary provider/write authority from a model JSON request, and Mechanical's core does not gain a Pi import. Furnace remains the optional durable Run/Work/Attempt owner; never duplicate it in Pi.

The proposed application ABI is `mechanical.pi-host/v1` (requires joint adoption). Pi's existing `hostMode` is embedded/detached transport; host-owned `evidenceProfile` begins with `git-census-v1`; host-owned `contextProfile` begins with `plain-v1`. An exact action grant must use Pi's currently representable one-colon namespace syntax, e.g. proposed `mechanical:develop-write` rather than the previously unrepresentable three-part spelling. Do not activate permission by writing only a design document.

## Delivery order

- **P0 foundations:** measured current pins, joint ABI/permission ruling, retain fixes to worktree/grants/abort, actual producer artifact packaging.
- **P1 registered lane:** wire allowlisted function definition through pinned descriptor, final identity/grant/source admission and one stable installed Mechanical host; preserve script path.
- **P2 observation/recovery:** native refs, four-arm outcomes and distinct status axes; cancellation after dispatch, crash/lost-ack uncertainty, operator inspect/reattach/reconcile.
- **P3 mandatory QA/release tail:** exhaustive fault/negative/mutation suite, independently installed consumer, native full Forge evidence, actual registered E2E, concurrency/performance/UX acceptance, clean final branch gate, skills/README/W11 truth.
- **P4 optional:** pure coordination evaluator, HX/RF committed profiles, true detached function and Furnace-owned Attempt integration, larger fleet exposure.

Do not mark W11 current/shipped merely because a descriptor test passes. The release tail and native joined receipt are mandatory.

## Existing work this reconciles

Read as historical provenance and requirement IDs: `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/` (epistemic triage, EAT-R atomic requirements, 25 planning groups and original Beads graph), `mechanical-interoperability-audit-2026-11-06/`, `bead-machine-field-convergence-2026-11-07/`, `docs/workbench/feature-matrix.md` W11, `docs/workbench/mechanical-function-hosting.md`, current `.agents/skills/pi-mechanical-interop/SKILL.md`. This program reconciles and supersedes obsolete present-tense descriptions without deleting requirement histories or authorizing false closure.

**Evidence status of this program:** documentation/source audit; no current build, full Forge gate, provider launch, installed end-to-end function run or benchmark performed for the doc commit.
