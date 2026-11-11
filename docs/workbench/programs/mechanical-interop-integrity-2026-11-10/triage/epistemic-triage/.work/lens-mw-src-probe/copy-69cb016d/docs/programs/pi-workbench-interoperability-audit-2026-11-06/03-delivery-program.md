# 03 — Mechanically scoped delivery program

All labels below are **planning identifiers**, not fabricated Beads IDs or claims of implementation. Create actual Beads work at implementation time; preserve the existing 2026-11-04 atomic requirements and the Pi triage `BEAD-PLAN.md` mapping. Land independent cuts, never one huge coordinated patch. Every implementation cut includes unit and adversarial controls, docs/skill changes, source pin, and an actual gate receipt or explicit not-run status.

| Slice | Priority | Owner / prerequisite | Deliverable | Closure oracle |
|---|---|---|---|---|
| MW-R0 | completed-source / confirm gate | Mechanical | Retain corrected descriptor and real-file/tarball test from `1f29daa7` | Measured `npm pack` + file-driven test on current pin; bad digest/schema/export refuses pre-import |
| MW-R1 | P1 | Mechanical, joint ABI ruling | Versioned, independently importable local rig-host facade, no new mandatory package | Consumer installed from packed artifacts without checkout or ambient repo exports |
| MW-R2 | P1 | Mechanical | Explicit callbacks wired to Git census, plain task context, one native Claude writer and Forge | Each of four callbacks invoked in order; all four outcome arms preserved; wrong basis no writes |
| MW-R3 | P1 | Mechanical, Pi workspace safety | Host-injected cancellation and effect identity across startup, edit, commit and gate | Pre-dispatch zero calls; mid-run abort/late return retains candidate and `uncertain` rather than false rollback |
| MW-R4 | P1 | Both, Pi function dispatch + MW-R1/2/3 | First registered Pi→packed Mechanical→Claude/Git→Forge run with native observation | Source+manifest+artifact pins, native SDK session, changed commit/tree and matching Forge operation/verdict; negative controls |
| MW-R5 | P1 gated | HX/RF native producer | Certified HX scope and committed RF context profile | Producer task/revision/digest/coverage, RF committed render and budget; preview substitution refused |
| MW-R6 | P2 gated | Furnace native SDK + Pi detached host | Optional Furnace-owned function Attempt and restart/reattach | Native Run/Work/Attempt, crash/lost-ack reconciliation; never duplicate Attempt |
| MW-R7 | P2 | Mechanical | Schema-pinned pure coordination consumer | Only explicitly allowlisted pure exports; output cannot authorize Beads/Furnace/Forge |
| MW-R8 | P2 | Both | Multi-invocation budget, observability and compatibility release | Bounded memory/concurrency, stable source hashes and honest dropped-event counters |

## Independent first deliveries

MW-R1 can proceed without task-scoped HX or RF. MW-R2 should begin with the already implemented Git census and plain context **not** a new fake HX scope. MW-R3 can independently implement active abort/reconciliation in the development rig, without requiring Pi runtime changes. Pi can repair worktree preservation and detached grants independently. The first joint live cut, MW-R4, depends only on these concrete, measured ingredients.

## Implementation responsibilities

**`packages/development/`**: no provider dependencies, no new mandatory ABI, no data-loss cleanup or tool registry. Add only contract refinements justified by a failing caller test.

**`apps/development-rig/`**: expose minimal installed host binding; bind sources and native services; make abort/late completion observable; preserve exact four outcomes. Add package `exports` subpath only after proving the tarball contains the required `dist` and any runtime dependencies in an external smoke.

**`contracts/`**: descriptor and schemas versioned together. Check installed bytes, not a hand-authored fixture.

**`packages/coordination/`**: expose one pure, serializable evaluator only after choosing its exact schema. GraphPolicy/MicroPolicy recommendations remain advisory; do not create implicit execution authorization.

**`qa/`**: per-cut evidence and falsifiers, separate producer-native receipts from simulation; no shared mutable evidence index. Existing `qa/integration/` receipts stay historical.

**Documentation**: each code cut updates `docs/05`, `docs/06`, `docs/07`, `docs/08`, `docs/10`, `apps/development-rig/README.md`, `.agents/skills/mechanical-pi-host/SKILL.md`, and any RF-specific skill/docs affected. A design commit does not mark `CURRENT` or set W11 shipped.
