---
name: pi-mechanical-interop
description: Audit, implement, qualify or operate first-class MechanicalWorkflows function invocations through Pi Workbench, covering pinned artifacts, exact authority, Git/Forge source evidence, native Claude/HX/RF/Furnace, cancellation, replay and feedback.
---

# Pi ↔ MechanicalWorkflows function hosting

Read `docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md` and all five files, `docs/workbench/mechanical-function-hosting.md`, `AGENTS.md` and W11 in `docs/workbench/feature-matrix.md`. Also read the November 4 [epistemic triage](docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/EPISTEMIC-AUDIT.md), remediation ledger, TDD matrix and Bead plan, plus the current Mechanical companion skill. Re-pin both repos and installed SDKs before doing work.

## Actual state — do not promote design to shipped

- Pi has real Claude SDK workflow execution, native read providers and observability; **registered `workflow_execute` only launches `script`** and refuses `function`. No installed Mechanical function binding is on the registered path.
- Mechanical has ordinary `develop(services,request)` and trusted offline SHA-256 tarball loading. Its **committed descriptor was fixed in `1f29daa7`**; its actual file is consumed by packed-artifact tests. Do not repeat the old schema mismatch as current.
- Pi `cleanupWorktree` may force-remove changed work after commit/branch preservation failure and return false-clean: P0 for any writer. Detached Claude launches pass empty grants despite native `claude:invoke` validator. The per-agent skip-before-controller race is **hypothesized**, not yet reproduced by this audit.
- Mechanical `signal?: AbortSignal` is currently **pre-dispatch-only**, not active SDK cancellation. App-local prompt/config and gate digest do not bind full cross-host skill/source/provider/effect identity.
- 2026-11-06 HX task-scope probe is unsupported at its installed producer pin; **Git census is still a valid limited first vertical**. Pi RF `--no-commit` preview is not Mechanical committed RF context.
- Historical Mechanical real Claude/Git/Forge, RF and Furnace receipts are dated 2026-10-15 and do not prove Pi registered function hosting. An in-repo Pi receipt census found no joined invocation but left global historical absence **UNDETERMINED**.

## Engineering loop

1. Name exact source pins, the existing `B-*` planning group and `EAT-R*` requirements; use real issued Beads IDs, never invent them. Read operational feedback but retain its historical measurement windows.
2. Write first red test on the **actual registered Pi tool** and a consumer using actual committed Mechanical descriptor / packed tarball. A helper/direct `develop()` test is not joint acceptance.
3. Resolve one proposed ABI jointly: Pi `hostMode` is transport; host-owned `evidenceProfile` (initial `git-census-v1`) and `contextProfile` (initial `plain-v1`) are *proposals* until adopted. Do not confuse saved-definition digest with tarball SHA.
4. Check exact allowlist, artifact/schema/manifest, host-bound principal, workspace realpath and rights **before import**. Grants include exact `workbench:execute`, Mechanical action and optional detach/Claude tools. Never infer authorization from user-supplied JSON or arbitrary JS export strings.
5. Use one isolated clean Git source, pinned base commit/tree and gate manifest, effective instructions/skills/model/provider versions. Bind application-owned `discover/compileContext/implement/verify` closures; do not put SDK dependencies into Mechanical core.
6. Preserve dirty source and effect intent/native refs through cancel, crash and lost acknowledgment. Do not blind-retry unknown writes, gate operations, claims or Furnace Attempts. Cancel is a request, never rollback.
7. Keep four Mechanical domain outcomes separate from launch, process, Forge verdict/source coverage and optional Furnace status. Native matching Forge operation is necessary to claim verified candidate.
8. Use explicit test tiers: fixture, independent installed package, real producer and **registered Pi** E2E. Run appropriate negative mutants (worktree failure, grant denial, async abort, stale replay, HX incomplete, preview substitution, lost reply) before upgrading status.
9. Each code cut updates `docs/workbench/mechanical-function-hosting.md`, `docs/workbench/README.md`, `docs/workbench/07-native-integrations.md`, `docs/workbench/08-lifecycle-and-recovery.md`, this skill, measured W11 and its per-issued-bead receipt; leave historical `TRACEABILITY.md` untouched.
10. Use Forge for gates, no new GitHub CI, no mandatory Library dependency, and keep Forge/Furnace independent. Avoid giant shared test headers, note-derived dynamic test membership and symlinked dependency-tree enumeration.

## Ownership

Pi hosts and observes functions, not a second scheduler or task authority. Mechanical provides ordinary functions and application callback bundles. Claude SDK owns agent sessions, Forge owns gate verdicts, HX owns coverage, RF owns committed render IDs, Beads owns readiness and Furnace owns Run/Work/Attempt and retries. Pure coordination outputs are advisory until independently authorized.
