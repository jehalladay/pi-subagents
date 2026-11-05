# 03 — Implementation program, conformance and gates

## Release slices (independent, ordered only by true dependencies)

| Slice | Owner | Deliverable | Must be true before closure |
| --- | --- | --- | --- |
| PI-0 | Pi + Mechanical | Pin baseline, reconcile descriptor canonicalization and host ABI; signed-off audit inventory | Read committed manifest via actual host; wrong digest/path/schema refuse before import |
| PI-1 | Pi | `function` branch in `workflow_execute` behind feature/grant; registration of pinned local Mechanical host | Source bytes/manifest, identity and grants checked; script branch unchanged |
| PI-2 | Mechanical | Versioned, independently importable `develop` host binding from its rig and a local packaged consumer | Correct four callbacks, real package install, source/evidence shape; no Pi import in core |
| PI-3 | Both | First actual Pi → Mechanical `develop` in clean isolated Git workspace using explicit `git-census` profile | Native Claude session creates changed commit, Forge result agrees on commit/tree, Pi observes four-domain outcome |
| PI-4 | Pi | Complete observation and operator controls; independent per-agent skip/retry cancellation, replay fingerprints | Zero unauthorized late SDK starts, no blind effect replay, exact native refs, stale/unknown visible |
| PI-5 | Both | Certified HX task-scope + task-grounded RF composition | Source revision, coverage witness, task/query digest and render identity producer-backed; negative controls block writes |
| PI-6 | Both | Detached and optional Furnace-hosted function execution | Real grant/reattach control, Run/Work/Attempt mapping, failure and crash uncertainty, producer-owned retry |
| PI-7 | Both | Coordination package pure function execution plus scale/reproducibility | Policy outputs never act as authority; measured host admission/backpressure and absence of regressions |

### First unblockers, before claiming PI-3

1. Fix Mechanical checked-in descriptor versus `entrypoint-host.ts` comparison; test exactly checked-in descriptor and a packed tarball.
2. Fix Pi `workflow_execute` refusal for authorized `function` definitions and provide the actually installed host loader; do not route long-running development through `node()`.
3. Fix Pi registered detached Claude empty-grants path independently; do not disable validator.
4. Fix loss of modified worktrees in `cleanupWorktree` before reusing Pi worktree isolation; begin PI-3 on a distinct, materialized Mechanical workspace if simpler.
5. Register an abort token before the async Claude `beforeDispatch` seam, and test skip/retry and workflow cancel while startup is parked.
6. Establish candidate/source identity and explicit write permission before any edit. Pi/Mechanical integration may use current git-census mode **only** when labeled as such.

## QA matrix

| Positive journey | Required negative / mutant | Evidence |
| --- | --- | --- |
| Committed descriptor loads exact tarball once | mutate schema ref, SHA, package/export, or source after pin | blob SHA, installed package proof; no provider invoked on refusal |
| Real Pi `workflow_execute` launches function | no grant, wrong definition kind, forged principal, stale source, path escape | Pi reply, single invocation ID, no unauthorized child |
| Native `develop` four callbacks | discovery partial/unknown, wrong workspace/base, provider throws | no implement on incomplete scope, appropriate distinct outcome |
| Agent writes candidate | dirty base, failed commit, branch creation failure, mid-run cancel | recoverable worktree/commit, no false-clean |
| Forge verify | transport 0 with failed gate, partial selection, mismatched commit/tree, missing operation ID | only matching native producer gate warrants verified_candidate |
| RF/HX native | RF preview substituted for committed render, incomplete HX + false known-empty, changed query basis | reject false completeness/side effects |
| Replay/retry | effect result lost between dispatch and settlement; changed skill/source/model/provider basis | one dispatch or typed uncertain-effect; never silent second write |
| Per-agent control | skip during beforeDispatch, SDK terminal after abort, unawaited launch, cancel during gate | no late unauthorized query or fabricated cancellation |
| Detached | missing claude:invoke/tool grants, lost handshake, PID reuse, socket ownership mismatch | refusal/unknown with preserved host ID; no implicit kill |
| Furnace | Attempt cancellation, controller crash, lost start response, duplicate retry | producer Run/Attempt refs; no blind retry, no fake durable restart |
| Coordination | pure policy returns proposal and is misread as command | no Beads/Furnace/Forge side effect without separate authority |
| Load | multiple concurrent workflows exceed host budgets, progress/log floods, queued cancels | admission counts, queue latency, bounded memory, honest dropped-event counter |

**Live acceptance:** demonstrate a full run from the actual registered Pi tool, through the installed Mechanical tarball with one isolated source checkout and real producer APIs. Capture native session ID, commit/tree, Forge operation ID and verdict, the user's Pi observation/reopen path, and explicit denial/cancellation controls. Fixture PASS, source grep, unit mock or a previous standalone Mechanical rig receipt is not an end-to-end Pi acceptance.

## Test placement and build order

- Pi: new `test/workbench-mechanical-*.test.ts` for admission, descriptor resolution, host binding, four outcome variants, native evidence projection, cancellation and source pinning; focused fault/contract tests before a live `qa/workbench/` journey. Avoid adding costly logic to a shared census header or giant assertion table. Keep behavioral checks in dedicated test files with scoped names and exact code paths.
- Mechanical: `apps/development-rig/test/` for committed descriptor loader, package signature, adapter services and cancel/error translation; core development tests stay provider-neutral; `packages/coordination/test/` for pure function mapping. Add an external installed consumer and an opt-in live scratch-workspace proof.
- Pi primary gate: `forge build` using existing `forge.toml` and `forge run <named test or live tier>` as applicable; isolated `npm run check`/targeted Vitest for iteration. Mechanical primary gate: root `forge build` and its existing package/root tests. Do **not** add GitHub CI.
- Every new assertion gets an adversarial mutant that makes it red and the repaired code makes it green. Record exact command/version/ref/result; no test result is assumed from a source audit.
- Pi feedback reports identify long preps, tester timeout modes and shared census edit conflicts; avoid growing an already constrained shared ledger or asserting a new measurement without a new run.
- Record per-bead Pi receipts under `docs/workbench/receipts/wb-*.md` only **when a corresponding real bead/receipt exists**; otherwise retain the program as design-only. Do not edit historical `TRACEABILITY.md` or fabricate bead IDs. Mechanical puts measured evidence in its existing QA/integration hierarchy.

## Completion / release criteria

- Working Pi *script* workflows do not regress when Workbench/Mechanical feature disabled.
- A function artifact can be installed and executed without a repository checkout dependency; no extension source copy of Mechanical function body.
- No unapproved mutation can run through a catalog, preview, observer, or function launch.
- An uncertain producer effect remains uncertain across Pi process restart/resume; no implicit duplicate.
- Four Mechanical domain outcome variants survive the translation separately from process status and Forge gate proof.
- Live native task-scope evidence, if unsupported by installed HX, remains a blocker **only** to the certified native-scope profile, not to honestly labeled Git-census mode.
- Reproducible evidence is attached before declaring any slice live/closed; docs, skill and feature matrix updated in same implementation cut.
