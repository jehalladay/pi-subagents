# 04 — Independently landable implementation program

Do **not** fabricate Beads IDs or silently close earlier `EAT-R*` requirements. The November 4 [BEAD-PLAN](../mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md) already maps 25 planning groups to atomic requirements and external gates. Reuse its dependency graph and original labels. All rows below are proposed work, not already delivered.

| Stage | Pi group | Deliverable | Acceptance |
|---|---|---|---|
| P0 | `B-preserve` | Preserve tracked and untracked edits, a recovery path/ref and truthful outcome on commit/branch failure; no force-remove of changed source | Fault injections; bytes retained, no false-clean |
| P1 independent | `B-detached-grants` | Fix both registered Claude detached grant producers, without disabling validator | Registered request→host preflight positive/negative |
| P1 evidence | `B-cancel-repro` | Park per-agent `beforeDispatch`, issue skip/retry, measure actual late SDK calls | Record reproduced or unresolved; code fix not claimed from hypothesis alone |
| P1 independent | `B-source`, `B-replay` | Commit/tree/skill/instruction/provider/SDK digests and no stale replay | One-byte drift revalidates/blocks replay |
| P1 joint ruling | `B-contract-choice` | Adopt one `mechanical.pi-host/v1` ABI with separated hostMode/evidenceProfile/contextProfile | Mechanical + Pi signed schema and installed-consumer parity |
| P1 consumer | `B-descriptor`, `B-authority` | Actual committed Mechanical file, exact tarball SHA, no arbitrary path; exact read/write grants | Wrong descriptor/source/grants cause zero load/effect |
| P1 execution | `B-dispatch` | Allowlisted registered `workflow_execute` function branch; script branch unchanged | `PI-FUNCTION-REGISTERED`; no `node()` or shell fallback |
| P1 semantics | `B-outcomes`, `B-observe` | Preserve 4 Mechanical domain arms, Forge/source/process axes and native refs | Reopen exact invocation, no false PASS |
| P1 lifecycle | `B-effects`, `B-controls` | Persist intent/dispatch/settlement, native cancel and unknown recovery | No blind duplicate after lost acknowledgment, late SDK result handled |
| First joint live | `B-git-census` | Pi → installed Mechanical → Git census/plain → Claude changed commit → native Forge → Pi observe | `PI-GIT-CENSUS-LIVE` source/candidate/operation join plus adversarial controls |
| Later gated | `B-hx-admit`, `B-rf-admit` | Certified HX query proof and committed RF context, separate from preview | `PI-HX-RF-LIVE` after genuine producer upgrade; not blocked for Git census |
| Later | `B-detached-function`, `B-furnace-function` | Detached reattach or Furnace-owned Attempt with native IDs | `PI-DETACHED-FUNCTION-LIVE` / `PI-FURNACE-FUNCTION-LIVE`, no phantom ensure |
| Later | `B-coordination` | Pure installed coordinator read-only function | `PI-COORDINATION-INSTALLED`, no external effect |
| Every cut | `B-limits`, `B-telemetry`, `B-release`, `B-docs`, `B-unknowns`, `B-hx-evidence` | Bounded resource admission, measured receipt status, accurate docs | Exact gate/source tree, independently scoped evidence and honest pending status |

**Mechanical-owned tracks:** companion `MW-R1` installed rig host export; `MW-R2` callback bundle; `MW-R3` active cancellation/replay/effect control; `MW-R4` joint native journey; `MW-R5` native HX/RF; `MW-R6` Furnace; `MW-R7` coordination. No Pi imports in Mechanical core, no new compulsory package unless an installed consumer demands it.

## Placement and scope

- Pi `src/workbench/execute-tool.ts` and `src/index.ts`: actual registered allowlist/admission, refs and rights.
- Pi `src/workbench/hosts/`: narrow Mechanical adapter, no arbitrary module import.
- Pi `src/worktree.ts`: safe preservation and recovery; maintain old behavior where safe and add fault oracles.
- Pi `src/workbench/claude-host.ts`: pending per-agent cancellation and full basis; keep true Claude SDK.
- Pi `src/workflow/{journal,runtime}.ts`: intent/settlement, unreplayed side effects; avoid turning `node()` into an indefinite writer.
- Pi `test/workbench-mechanical-*.test.ts`: scoped new files, no giant shared census/header; `qa/workbench/` for opt-in native/registered journeys; real per-bead receipts only.

## Merge discipline

Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`. Before implementing, refresh both branches, check unlanded work, avoid overlapping mutable test headers, and ensure the **merged candidate tree** is the one gated. Documentation-only program commits do not imply a change to W11 status. Never remove or weaken a safety test to make a gate green. No GitHub CI; use Forge.
