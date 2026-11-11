# 04 — Feedback qualification, negative controls and acceptance

## Feedback sources actually inspected

Pi's append-only `new-feedback/` contains operational findings from machine operators, not a Mechanical runtime `new-feedback/` directory (none appeared in the inspected Mechanical branch tree). Relevant dated feedback: the 2026-11-03 sibling census conflicts (3 of 48 landings in that 24-hour window), 2026-11-04 repeated pre-leg/header-claim refusal pressure (42 of 56 refusals in that historical window), 2026-11-04 symlinked `node_modules` / `EISDIR` listing hazard (2 of 9 audited readers), 2026-11-02 shared cache eliminating much of earlier install cost while preparation becomes dominant, and 2026-11-05 growth to 175 of 585 tests reading the Beads export (historical pin). Do not extrapolate these ratios to today's runtime or claim they were remeasured here.

Pi's November 4 interop epistemic audit identified 490 claims, 48 overclaims and 50 remediation entries; it refuted present-tense claims that the Mechanical descriptor remained broken, narrowed cancellation semantics, distinguished existing read-only Mechanical event support from missing invocation support, and identified a genuinely unresolved `profile`/`mode` **proposal** conflict. Its requirements/TDD corpus includes 25 planned work groups and blocked producer gates; preserve that traceability without renumbering or claiming completion. A 2026-11-06 native HX probe records `task-scope-unsupported`, not a global prohibition of Git census. The 2026-11-06 Forge probe recorded native FAIL with exit 1 for tested invocations, not a universal claim over all versions/flags.

Mechanical's `docs/programs/rfcli-feedback-adoption-2026-11-04/01-QUALIFICATION.md` requires render/explain/replay witnesses, loss-of-reply tests, lock-pressure classification and skill/docs updates. Incorporate these in later `rf-committed-v1` slices; do not relabel an RF preview as an authoritative committed render.

## Controls tied to defects

| Control | Positive | Adversarial negative |
|---|---|---|
| Descriptor/packaging | Actual committed JSON; exact npm-packed tarball consumed by independent host | Wrong SHA, entrypoint, schema filename, traversal, wrong export, changed package; no `load()` called |
| Service binding | Four services run in expected order on pinned source | Discovery incomplete, wrong revision/tree, injected callback rejects; writer and Forge not invoked |
| Source/agent | One clean base, exactly one changed clean commit | Dirty base; failed commit; no source-tree change; gate declaration changed; preserve recoverable bytes |
| Forge evidence | Matching native operation and candidate commit/tree with PASS | Transport success/fixture PASS; mismatched operation, partial selection, unknown, native FAIL |
| Cancellation | Abort before dispatch results in zero agent/gate calls | Abort during SDK startup, edits, commit or gate; delayed completion cannot be called rollback or replayed blindly |
| Invocation identity | Same source+skill+config digest can be observed/reconciled | One-byte skill/prompt/manifest/provider change forbids cached agent answer |
| HX/RF | Native complete task scope and committed render IDs at pinned basis | Best-effort exit 0 with incomplete coverage; revision-pinned view failure; `--no-commit` preview substituted |
| Furnace/coordination | Native Attempt refs and purely advisory policy output | Lost start acknowledgment, duplicate effect, policy proposal represented as a claim/gate |
| Load | Measured global admission, bounded output and memory | Concurrent Pi/Mechanical calls exceed limits, malformed cap=0, floods/slow consumers |

## Gate levels and receipt grammar

- **L0 source:** claim only a static source observation at pinned commits.
- **L1 fixture:** local behavior and mutants only; not producer proof.
- **L2 installed consumer:** native package pack/install and descriptor/ABI conformance; still not live provider proof.
- **L3 native:** actual producer operation/session, versions, complete source/manifest/artifact basis, verdict/refusal and native refs.
- **L4 registered joint:** call actual Pi `workflow_execute` function branch, observe through Pi, and correlate Mechanical's four-domain result with native Forge and source pin; include wrong-grant, failure, abort and unknown recovery.
- **L5 operational:** optional detached/Furnace restart and multi-invocation load.

A receipt must contain: repository commits, installed package/SDK/tool versions, environment/commands, declared scope and files, producer-native session/operation/Run/Attempt IDs where actually observed, Git base/commit/tree, artifact and manifest digests, result's exact domain and transport statuses, negative controls, deviations and unresolved unknowns. Use one independent per-cut report, not an ever-growing shared table; do not edit Pi historical `TRACEABILITY.md`.

**Verification of this documentation cut:** not run. No source, compiled binary, tests or native producer interfaces were modified in this cut. A newly authored document is not an acceptance witness.
