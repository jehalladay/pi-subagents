# BEAD AMENDMENT PLAN — mechanical-interoperability-audit-2026-11-06 (delta EAT-R144..EAT-R200 onto the existing wb- beads)

Generated 2026-11-07T07:06Z. Pins: doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there).

Audited 2026-11-07T07:06Z (Phase 10 step 9): cross-references wb-upad (EAT-R156), wb-5a7k (EAT-R157) and wb-mwsy (EAT-R176) added; see REQUIREMENTS-AUDIT.md.

Rules (binding on filing):
- Real `wb-` ids below are the EXISTING beads under epic wb-1a3t (read at the Pi pin `.beads/issues.jsonl`); **no new bead id is invented here** and none is proposed (every delta row has an existing group; see 'New beads').
- Every amendment is a NOTE-APPEND (`bd update <bead> --append-notes-file <file>`), never `--notes` (which replaces) and never a description overwrite that drops the Nov-4 pins or EAT-R001..R143 (EAT-R172).
- EAT-R001..R143 stay as filed on their beads; this plan adds EAT-R144+ and names refinements; it closes, renumbers or re-grades nothing.
- MW-owned rows (EAT-R173..R177) ride the deferred tracker wb-1zn2; no Pi lane implements MW core/rig (rule 21 clause 1).
- `deferred:` clauses are owner decisions (M109 baseline advance, M111 cancelled-execution axis, M112 wb-p3i2 ruling, M115 MW label confirmation, M119 bead re-pin); the plan records them, it does not decide them.
- This plan performs no commit, merge, push, filing or note write; the Nov-6 triage and this delta land through the docs cut (wb-12x1) and the workbench machine.

## Summary

| Bead | Group | Status at pin | Primary delta requirements | Cross-references | Real-infra gates |
|---|---|---|---|---|---|
| wb-5ik5 | preserve | open | EAT-R144, EAT-R145, EAT-R146 (3) | EAT-R193 | none |
| wb-12x1 | docs | open | EAT-R147, EAT-R178, EAT-R179, EAT-R180, EAT-R181, EAT-R182, EAT-R183, EAT-R184, EAT-R185, EAT-R186, EAT-R187, EAT-R188, EAT-R189, EAT-R190, EAT-R191, EAT-R192, EAT-R193, EAT-R194, EAT-R195, EAT-R196, EAT-R197, EAT-R198, EAT-R199, EAT-R200 (24) | — | none |
| wb-j5y5 | release | in_progress | EAT-R165, EAT-R166, EAT-R167, EAT-R168, EAT-R169, EAT-R170, EAT-R171 (7) | EAT-R164 | none |
| wb-w8fk | contract-choice | open (blocked by wb-1zn2) | EAT-R148, EAT-R149, EAT-R150, EAT-R151 (4) | EAT-R194 | MW-INSTALLED-CONSUMER |
| wb-ocie | descriptor | in_progress | EAT-R152, EAT-R153 (2) | — | MW-INSTALLED-CONSUMER |
| wb-s8rm | source | open | — (0) | EAT-R153, EAT-R154 | none |
| wb-201v | authority | in_progress | EAT-R154 (1) | — | none |
| wb-413a | replay | in_progress | EAT-R161, EAT-R162 (2) | — | none |
| wb-9v02 | cancel-repro | in_progress | EAT-R160 (1) | — | none |
| wb-4bxo | dispatch | open (blocked) | EAT-R155 (1) | — | PI-FUNCTION-REGISTERED |
| wb-9a1o | outcomes | open (blocked by wb-4bxo) | EAT-R156, EAT-R157, EAT-R158 (3) | EAT-R188 | none |
| wb-mwsy | effects | open (blocked by wb-4bxo) | — (0) | EAT-R176 | none |
| wb-5a7k | controls | open | — (0) | EAT-R157 | none |
| wb-upad | observe | open | — (0) | EAT-R156 | none |
| wb-r5q2 | telemetry | open (blocked by wb-ny54) | EAT-R164 (1) | — | PI-MULTIWORKFLOW-LOAD |
| wb-p3i2 | git-census | open (blocked) | EAT-R159 (1) | EAT-R189, EAT-R200 | PI-GIT-CENSUS-LIVE |
| wb-pxvv | hx-admit | open (blocked) | EAT-R163 (1) | — | HX-TASK-SCOPE-PROBE |
| wb-cbt4 | master-recon | open | EAT-R172 (1) | EAT-R186, EAT-R196 | none |
| wb-1zn2 | external-tracker | deferred (P3; MW-owned) | EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177 (5) | EAT-R149, EAT-R151, EAT-R161, EAT-R191, EAT-R192 | none (tracker), MW-INSTALLED-CONSUMER, PI-CANCEL-RECOVERY |

Amendments: 19 beads touched (15 with primary rows, 4 cross-reference only); requirements dispositioned: 57 (amend 52, mw-tracker 5, new-bead 0); not owed: 27 items.

## Landing order (delta rows only; the Nov-4 topological order is unchanged)

1. wb-12x1 docs cut #2 (EAT-R178..R200 wording repairs + the docs-validator leg of EAT-R147 + landing the Nov-6 triage): docs-only, landable now. The READJUDICATION re-grade leg of EAT-R147 is a later cut (after wb-5ik5 / wb-413a / wb-ocie land) and keeps wb-12x1 open, or is re-homed to wb-cbt4 by note.
2. wb-cbt4 bead re-pin (EAT-R172): ledger-in-repo note-append under the master-recon bead, owner decision on the MW baseline (M109).
3. wb-j5y5 release validators (EAT-R165..R171): apply to every later cut from its first cut; landable now.
4. wb-5ik5 (EAT-R144..R146), wb-413a (EAT-R161, R162), wb-9v02 (EAT-R160), wb-ocie (EAT-R152, R153), wb-201v (EAT-R154): Pi-local, landable now alongside their Nov-4 rows.
5. wb-w8fk (EAT-R148..R151) and wb-9a1o (EAT-R156..R158): blocked on the joint ABI ruling (MW-CONTRACT) / dispatch; fixture legs may land red-first.
6. wb-4bxo (EAT-R155), wb-p3i2 (EAT-R159), wb-pxvv (EAT-R163), wb-r5q2 (EAT-R164): gated rows, land with their Nov-4 gates (PI-FUNCTION-REGISTERED, PI-GIT-CENSUS-LIVE, HX-TASK-SCOPE-PROBE, PI-MULTIWORKFLOW-LOAD).
7. wb-1zn2 (EAT-R173..R177): MW-owned; release Pi deps per gate as the producer delivers.

## Amendments (exact note text to append, per bead)

### wb-5ik5 — [MWI-preserve] P0 preserve edited worktrees when Git preservation fails

- Group: preserve; status at pin: open; real-infra gates: none.
- Primary requirements: EAT-R144, EAT-R145, EAT-R146.
- Cross-references (owned elsewhere, cited here): EAT-R193.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R144 Preservation fault injection MUST cover every Git step inside the cleanup catch; EAT-R145 The preserve cut MUST carry the rule-8 specification ruling for the lossy characterization test; EAT-R146 The Claude host MUST keep refusing isolation:"worktree" until the preserve cut has landed with a receipt - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R193 (owned by wb-12x1) | CONDITIONS: EAT-R144: Tracked tree at pi d7666a76 only (K110): the unlanded branch machine/flywheel/wb-5ik5 (e76448ea, 2026-11-06) already edits worktree.ts and was neither inspected nor run; the matrix is asserted against the landed cut, not this pin. Per the e76448ea commit message (not inspected, not run) that cut's red list names commit, status, branch and branch-exhaustion legs only, so the `add -A` and `rev-parse HEAD` legs remain owed by this row unless the landed receipt shows them. || EAT-R145: The ruling is an owner act not performed by this triage; the one-clause carve-out of 04:35 (M116) lands in the docs cut (EAT-R193). Read from the commit message only (K110, branch not inspected or run): the unlanded wb-5ik5 commit e76448ea's subject cites 'owner specification ruling M:61188' and its red list names test/worktree.test.ts:432 (C1); the validator MUST assert that the cited ruling id resolves (ledger row readable and naming the test), not merely that a `specification-ruling` entry exists. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-12x1 — [MWI-docs] Land corrected program and audited triage through the workbench machine

- Group: docs; status at pin: open; real-infra gates: none.
- Primary requirements: EAT-R147, EAT-R178, EAT-R179, EAT-R180, EAT-R181, EAT-R182, EAT-R183, EAT-R184, EAT-R185, EAT-R186, EAT-R187, EAT-R188, EAT-R189, EAT-R190, EAT-R191, EAT-R192, EAT-R193, EAT-R194, EAT-R195, EAT-R196, EAT-R197, EAT-R198, EAT-R199, EAT-R200.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | STATEMENT: second docs cut - land the Nov-6 reconciliation triage (epistemic-triage/ + requirements/ delta) under docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/ and apply the 22 REMEDIATION wording repairs M101..M119, M121..M123 to the eight pinned program files (01-05, README, docs/workbench/mechanical-function-hosting.md, .agents/skills/pi-mechanical-interop/SKILL.md) plus the W11 row of docs/workbench/feature-matrix.md (M118); M120 is ledger-only (EAT-R197) and M121's README:22 leg is a no-op at the pin (EAT-R198); every `deferred:` clause lands in the receipt/owner bead, never in a program file (step-9 audit F17/F18) | SCOPE REFINEMENT: this bead additionally owns EAT-R178, EAT-R179, EAT-R180, EAT-R181, EAT-R182, EAT-R183, EAT-R184, EAT-R185, EAT-R186, EAT-R187, EAT-R188, EAT-R189, EAT-R190, EAT-R191, EAT-R192, EAT-R193, EAT-R194, EAT-R195, EAT-R196, EAT-R197, EAT-R198, EAT-R199, EAT-R200 (one per REMEDIATION row M101..M123; EAT-R197 is ledger-only) and EAT-R147 (EAT-R147 has two legs: its docs-validator leg lands in this cut, its READJUDICATION re-grade leg is a later cut after wb-5ik5/wb-413a/wb-ocie land; this bead is not closed while that leg is open unless it is re-homed by note) - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (docs predicate + mutant), agentic-tdd protocol, machine Forge gate receipt per cut; real-infra gate: none | RULES: docs-only cut (no src/test edits); never rename a C0xxx/C1xxx id or overwrite a source-pinned grade; a docs-only commit does not change the W11 status word (EAT-R167); TRACEABILITY.md untouched | DEFERRED (owner decisions carried as `deferred:` clauses, wording part lands here): M109 MW baseline advance (wb-cbt4); M111 cancelled-execution axis (wb-9a1o); M112 wb-p3i2 ruling alternative; M115 MW-owner label confirmation (wb-1zn2); M119 bead-description re-pin (wb-cbt4) | CROSS-REFS: none
```

### wb-j5y5 — [MWI-release] Require test-first machine cuts and evidence-backed slice status

- Group: release; status at pin: in_progress; real-infra gates: none.
- Primary requirements: EAT-R165, EAT-R166, EAT-R167, EAT-R168, EAT-R169, EAT-R170, EAT-R171.
- Cross-references (owned elsewhere, cited here): EAT-R164.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R165 Validators MUST tag every witness with its L0-L5 level and refuse a status claim backed only by lower levels; EAT-R166 A status upgrade MUST carry a recorded positive and falsifier for every applicable surface of the adversarial table; EAT-R167 Every Pi cut MUST close the named documentation files in the same cut and leave W11 unchanged on docs-only commits; EAT-R168 Program tests MUST declare explicit time budgets and receipts MUST classify reds as assertion, timeout or collector error; EAT-R169 Program tests MUST live in scoped new files and MUST NOT edit shared census headers or derive membership from Beads notes; EAT-R170 Every assertion and receipt claim MUST name its reader, pin, witness, mutant and quiet cases, and no census MAY assert beyond its pins; EAT-R171 The accepted Forge gate receipt MUST be keyed to the merged candidate tree, not the lane branch tree - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R164 (owned by wb-r5q2) | CONDITIONS: EAT-R166: Surfaces whose producer gate is unmet land as explicitly partial (EAT-R085), never silently n/a. || EAT-R167: The feature-matrix W11 detection sentence (M118) is repaired by EAT-R195 in the docs cut; this requirement governs later cuts. || EAT-R168: Budgets are per test, not suppressed reds; raising a budget requires a recorded reason in the receipt. || EAT-R169: Existing census tests are out of scope; only files the program adds are governed. || EAT-R171: Refines and does not relax EAT-R084: the receipt stays keyed to the exact gated candidate commit (EAT-R084) and additionally records the merged tree id, the branch tip and the trunk sha; an equal-tree landing under a different commit (rebase or fold) passes only when the receipt names the gated commit and the fold lineage that produced the landed commit, so EAT-R084's 'receipt for another commit' is read as 'a receipt whose gated tree is not the landed tree', never as 'any receipt with an equal tree'. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-w8fk — [MWI-contract-choice] Adopt the Pi side of one versioned cross-repository invocation contract

- Group: contract-choice; status at pin: open (blocked by wb-1zn2); real-infra gates: MW-INSTALLED-CONSUMER.
- Primary requirements: EAT-R148, EAT-R149, EAT-R150, EAT-R151.
- Cross-references (owned elsewhere, cited here): EAT-R194.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R148 Pi MUST consume the separated selector triple hostMode / evidenceProfile / contextProfile as three request-side fields; EAT-R149 Pi MUST never read MW's result-side `mode` as a selector and the ruling MUST record its MW-stated disposition; EAT-R150 Pi MUST validate the `mechanical.pi-host/v1` host-binding envelope as a contract distinct from the descriptor and the tool reply; EAT-R151 The ABI adoption gate MUST be a cross-repository conformance test plus recorded acceptance by both owners - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: MW-INSTALLED-CONSUMER (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R194 (owned by wb-12x1) | CONDITIONS: EAT-R148: Proposal until the joint ruling: both repositories must adopt the triple (EAT-R151) before any cut claims the choice; the companion contract that spells the same triple exists only at mw-tip 6e15a4245d3f (K105) and is the same authorial lineage. || EAT-R149: The MW result-side field is MW-owned; Pi can only refuse to interpret it. The hosting.md:17 wording repair is EAT-R194 (M117). Partial-duplicate note: the alias-refusal clause of the original row duplicated EAT-R005 ('reject the other spelling and requests containing both') and was narrowed at the step-9 audit. || EAT-R150: Field list taken from the companion at mw-tip 6e15a4245d3f (absent at the stated MW baseline 97e18068; same lineage); adoption gate EAT-R151. Version and unknown-field refusals are EAT-R006's acceptance (not re-owed); this row owes the exact literals, the closed field list and the cross-contract borrowing negative. || EAT-R151: MW-CONTRACT (MW-R1 joint ABI ruling) is external; the MW owner's acceptance is not a Pi act. The README/03 pinned-link repairs are EAT-R186/EAT-R187. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-ocie — [MWI-descriptor] Validate the actual published descriptor and artifact at the Pi boundary

- Group: descriptor; status at pin: in_progress; real-infra gates: MW-INSTALLED-CONSUMER.
- Primary requirements: EAT-R152, EAT-R153.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R152 Pi MUST keep the saved-definition digest and the Mechanical tarball digest as two independently validated pins; EAT-R153 Program source and descriptor walkers MUST lstat, realpath and refuse symlinked or directory entries - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: MW-INSTALLED-CONSUMER (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R152: The `artifact.digest` field name belongs to the EAT-R150 envelope (wb-w8fk); until that ruling the test uses Pi's internal binding type. The unlanded wb-ocie branch adds src/workbench/mechanical-descriptor.ts (not inspected, K110). || EAT-R153: The Git-census `discover` walker is MW-owned (MW-R2, EAT-R175); this requirement binds Pi-side walkers only. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-s8rm — [MWI-source] Admit writes only against host-owned immutable source identity

- Group: source; status at pin: open; real-infra gates: none.
- Primary requirements: none (cross-reference only).
- Cross-references (owned elsewhere, cited here): EAT-R153, EAT-R154.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns (no primary requirement; cross-reference only) - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R153 (owned by wb-ocie); EAT-R154 (owned by wb-201v) | CONDITIONS: none beyond the requirement rows | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-201v — [MWI-authority] Enforce exact function authority at the final dispatch boundary

- Group: authority; status at pin: in_progress; real-infra gates: none.
- Primary requirements: EAT-R154.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R154 Function admission and identity MUST NOT read free-form Beads export note wording - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R154: Scope: function admission/identity only; existing census tests that read the export are out of scope. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-413a — [MWI-replay] Bind agent replay identity to measured source and effective dependencies

- Group: replay; status at pin: in_progress; real-infra gates: none.
- Primary requirements: EAT-R161, EAT-R162.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R161 A joint Pi/MW replay-basis specification MUST exist before a 'complete' basis is claimed; EAT-R162 The WorkflowHost.replayBasis doc comment MUST name only dimensions the hosts record, qualified per host - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R161: Pi publishes the Pi-side dimension list first (landable with wb-413a); 'complete' is claimed only once MW's app-local half (prompt/config digest, Forge-manifest digest; EAT-R176 clause (c), MW-R3) is attached on wb-1zn2; the unlanded wb-413a branch 2f0fedd3 already rebinds the basis and was not inspected or run (K110). || EAT-R162: Code-comment correction only. Scope carried from the ledger: C1173's defeater reads 'Pi's replay key' as the Claude host's literal; the detached host (local-detached.ts) binds `manifest` and `localProvider.version/digest`, so a universal 'records no provider manifest' reading is false at the pin and was removed from this row at the step-9 audit. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-9v02 — [MWI-cancel-repro] Reproduce parked per-agent skip and retry before choosing a repair

- Group: cancel-repro; status at pin: in_progress; real-infra gates: none.
- Primary requirements: EAT-R160.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R160 A per-agent cancel repair MAY follow only a reproduced red and MUST take the pending-abort-state shape - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R160: Conditional on the EAT-R015 outcome; an `unresolved` record closes nothing and authorizes no repair of this seam. The 03:47 lifecycle norm for the new function-host dispatch path is owed unconditionally under EAT-R045 ('abort while queued, before load, before SDK query'), independent of this experiment; this row does not gate it. Partial-duplicate note: the original row restated the EAT-R015 experiment and grading; narrowed at the step-9 audit. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-4bxo — [MWI-dispatch] Launch authorized embedded functions through the registered Pi tool

- Group: dispatch; status at pin: open (blocked); real-infra gates: PI-FUNCTION-REGISTERED.
- Primary requirements: EAT-R155.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R155 Enabling the function branch MUST leave furnace-formula definitions refused and outside the Mechanical adapter - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: PI-FUNCTION-REGISTERED (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R155: Depends on the function branch landing (wb-4bxo blocked on MW-HOST); the test can land red-first against the current refusal as a characterization control. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-9a1o — [MWI-outcomes] Preserve Mechanical domain outcomes and native evidence independently

- Group: outcomes; status at pin: open (blocked by wb-4bxo); real-infra gates: none.
- Primary requirements: EAT-R156, EAT-R157, EAT-R158.
- Cross-references (owned elsewhere, cited here): EAT-R188.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R156 Pi MUST project the function result on seven independent typed axes; EAT-R157 A cancelled execution MUST be represented on an owner-named axis with its cancel kind; EAT-R158 The Forge gate-envelope fields the gate axis reads MUST be pinned before selection completeness is consumed - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R188 (owned by wb-12x1) | CONDITIONS: EAT-R156: Axis value sets are proposals adopted by this decision; the execution set differs from the Nov-4 proposal without a note (K106) and the placement of a cancelled execution is EAT-R157. The freshness axis restates EAT-R052 (wb-upad, observe) inside the schema; wb-upad is cross-referenced, not re-owed. || EAT-R157: deferred: the owner states the axis that carries a cancelled execution (M111); the docs note naming the Nov-4 set is EAT-R188. Cancel semantics (EAT-R045-R047) are wb-5a7k's (controls); this row owns only the representation of a cancelled invocation on the host event and cross-references wb-5a7k. || EAT-R158: Forge is not pinned by this triage; the pin is acquired by the cut, not asserted here. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-mwsy — [MWI-effects]

- Group: effects; status at pin: open (blocked by wb-4bxo); real-infra gates: none.
- Primary requirements: none (cross-reference only).
- Cross-references (owned elsewhere, cited here): EAT-R176.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns (no primary requirement; cross-reference only) - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R176 (owned by wb-1zn2) | CONDITIONS: none beyond the requirement rows | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-5a7k — [MWI-controls]

- Group: controls; status at pin: open; real-infra gates: none.
- Primary requirements: none (cross-reference only).
- Cross-references (owned elsewhere, cited here): EAT-R157.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns (no primary requirement; cross-reference only) - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R157 (owned by wb-9a1o) | CONDITIONS: none beyond the requirement rows | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-upad — [MWI-observe]

- Group: observe; status at pin: open; real-infra gates: none.
- Primary requirements: none (cross-reference only).
- Cross-references (owned elsewhere, cited here): EAT-R156.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns (no primary requirement; cross-reference only) - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R156 (owned by wb-9a1o) | CONDITIONS: none beyond the requirement rows | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-r5q2 — [MWI-telemetry] Bound progress output and measure cross-invocation resource behavior

- Group: telemetry; status at pin: open (blocked by wb-ny54); real-infra gates: PI-MULTIWORKFLOW-LOAD.
- Primary requirements: EAT-R164.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R164 Cost figures MUST be fresh measurements with date, host, command and sample size; October figures are history only - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: PI-MULTIWORKFLOW-LOAD (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: none beyond the requirement rows | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-p3i2 — [MWI-git-census] Compose the installed Git-census host in an isolated Pi-owned invocation

- Group: git-census; status at pin: open (blocked); real-infra gates: PI-GIT-CENSUS-LIVE.
- Primary requirements: EAT-R159.
- Cross-references (owned elsewhere, cited here): EAT-R189, EAT-R200.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R159 The first live cut MUST record which README:22 defects gate it, per an owner ruling or the reused BEAD-PLAN graph - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: PI-GIT-CENSUS-LIVE (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R189 (owned by wb-12x1); EAT-R200 (owned by wb-12x1) | CONDITIONS: EAT-R159: deferred: an owner ruling on wb-p3i2 may replace the default reading (M112); the README:22 wording repair is EAT-R189. At the pin wb-p3i2's `blocks` dependencies are exactly wb-5ik5, wb-mwsy, wb-4bxo, wb-9a1o (= BEAD-PLAN row 19), so 'the reused BEAD-PLAN graph' default is the bead graph itself; wb-wupg and wb-413a are not among its blockers. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-pxvv — [MWI-hx-admit] Admit certified HX scope only from producer-backed task witnesses

- Group: hx-admit; status at pin: open (blocked); real-infra gates: HX-TASK-SCOPE-PROBE.
- Primary requirements: EAT-R163.
- Cross-references (owned elsewhere, cited here): none.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R163 The named-query task-scope route MUST be probed before hx-task-scope-v1 is called unsupported version-wide - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: HX-TASK-SCOPE-PROBE (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: none | CONDITIONS: EAT-R163: wb-f3wd is closed (2026-11-06T18:27Z); this is a new leg of wb-pxvv. The HX producer is not pinned by this triage; the wording repair is EAT-R185. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-cbt4 — [MWI-master-recon] master-side triage-archive reconciliation

- Group: master-recon; status at pin: open; real-infra gates: none.
- Primary requirements: EAT-R172.
- Cross-references (owned elsewhere, cited here): EAT-R186, EAT-R196.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | SCOPE REFINEMENT: this bead additionally owns EAT-R172 Bead descriptions under epic wb-1a3t MUST carry the Nov-6 pins and their delta requirement ids before a seat implements against them - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md (red-first acceptance + mutant guard), agentic-tdd protocol (test-first, never weaken lints/assertions/tests), machine Forge gate receipt per cut; real-infra gate: none (a gated leg lands explicitly partial, never silently skipped) | CROSS-REFS: EAT-R186 (owned by wb-12x1); EAT-R196 (owned by wb-12x1) | CONDITIONS: EAT-R172: deferred: the re-pin is a ledger-in-repo write owned by wb-cbt4 (M119) and an owner decision on advancing the MW baseline (M109); the README:3 wording is EAT-R196. | RULES: Nov-4 requirements already on this bead stay as filed (EAT-R001..R143 are never renumbered or silently closed); the Nov-6 program binds no new bead for this group; re-pin per EAT-R172 before implementing against the Nov-6 pins
```

### wb-1zn2 — [MWI-external-gates] MW-owned deliverables tracker (MW-CONTRACT/HOST/CANCEL/NATIVE/FURNACE/COORDINATION)

- Group: external-tracker; status at pin: deferred (P3; MW-owned); real-infra gates: none (tracker), MW-INSTALLED-CONSUMER, PI-CANCEL-RECOVERY.
- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.
- Cross-references (owned elsewhere, cited here): EAT-R149, EAT-R151, EAT-R161, EAT-R191, EAT-R192.
- Write: `bd update <bead> --append-notes-file <file>  (append only; never --notes, which replaces)`
- Note text to append:

```text
AMENDMENT 2026-11-07T07:06Z (Phase 10 delta, mechanical-interoperability-audit-2026-11-06) | PROGRAM: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 (doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there)) | STATEMENT: MW-owned external refinements ride this tracker; NOT Pi work (rule 21 clause 1) - EAT-R173..R177 are MW-owned, continue EAT-R088..R093 | SCOPE REFINEMENT: EAT-R173 The MW tracker MUST carry an owner-confirmed map from MW-R0..MW-R8 to the Nov-4 tracks, EAT-R088..R093 and the named gates; EAT-R174 MW MUST publish the rig-host facade as a declared exports subpath only after an external packed-install smoke; EAT-R175 MW MUST ship the explicit four-callback bundle bound to Git census, plain context, one Claude writer and Forge; EAT-R176 MW MUST publish the effect-class list and the dirty-write reconciliation contract that the no-duplicate guarantee covers; EAT-R177 Every MW cut MUST close the companion skill, docs/05-08 and 10, the rig README and modified schemas in the same cut - each per docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md | LABEL MAP (candidate, MW-owner confirmation deferred per M115): MW-R0 descriptor repair kept (MW confirm gate, no Pi req); MW-R1 = mw-host EAT-R089 + joint ABI ruling mw-contract EAT-R088 [MW-HOST, MW-CONTRACT]; MW-R2 callback bundle (new, EAT-R175); MW-R3 = mw-cancel EAT-R090 + effect/replay identity [MW-CANCEL; EAT-R176]; MW-R4 joint native journey, owner Both (Pi side PI-GIT-CENSUS-LIVE wb-p3i2); MW-R5 = mw-native EAT-R091 [MW-NATIVE]; MW-R6 = mw-furnace EAT-R092 [MW-FURNACE]; MW-R7 = mw-coordination EAT-R093 [MW-COORDINATION]; MW-R8 multi-invocation release (new, MW-owned) | CROSS-REFS: EAT-R149 (owned by wb-w8fk); EAT-R151 (owned by wb-w8fk); EAT-R161 (owned by wb-413a); EAT-R191 (owned by wb-12x1); EAT-R192 (owned by wb-12x1) | CONDITIONS: labels MW-R0..R8 exist only at mw-tip 6e15a4245d3f (absent at the stated baseline 97e18068; same authorial lineage as the Pi program, not corroboration - K105); release each Pi bead's dep on this tracker per gate as the producer delivers | ACCEPTANCE: unchanged (close only when every named gate is delivered or formally dropped) plus the MW owner's confirmation entry for the label map
```

## New beads

None. No delta requirement lacks an existing group: every row dispositions to one of the 27 group beads under epic wb-1a3t or rides the MW tracker wb-1zn2 (binding program order 04:3 / 02:33: reuse the dependency graph and labels; no second untracked plan).

## MW-owned tracker rows (ride wb-1zn2; not Pi work)

| Req | Track (MW-Rn) | Nov-4 track / EAT | Gate | Deliverable |
|---|---|---|---|---|
| EAT-R173 | MW-R0..R8 map | mw-* / EAT-R088..R093 | all | The MW tracker MUST carry an owner-confirmed map from MW-R0..MW-R8 to the Nov-4 tracks, EAT-R088..R093 and the named gates |
| EAT-R174 | MW-R1 | mw-host EAT-R089 + mw-contract EAT-R088 | MW-HOST, MW-CONTRACT | MW MUST publish the rig-host facade as a declared exports subpath only after an external packed-install smoke |
| EAT-R175 | MW-R2 | new (binds EAT-R089) | MW-HOST | MW MUST ship the explicit four-callback bundle bound to Git census, plain context, one Claude writer and Forge |
| EAT-R176 | MW-R3 | mw-cancel EAT-R090 (+ EAT-R044 consumer) | MW-CANCEL | MW MUST publish the effect-class list and the dirty-write reconciliation contract that the no-duplicate guarantee covers |
| EAT-R177 | MW docs closure | mirror of EAT-R082/R167 | none | Every MW cut MUST close the companion skill, docs/05-08 and 10, the rig README and modified schemas in the same cut |

MW-R5/R6/R7 compile to nothing new (covered by EAT-R091/R092/R093); MW-R0 is an MW-owned confirm gate (the descriptor repair at 1f29daa7 is ESTABLISHED); MW-R8 is MW-owned and has no Pi row (Pi analogues: EAT-R073..R079).

## Not owed (compiles to nothing)

| Item | Covered by | Note |
|---|---|---|
| Per-agent skip/retry reproduction at a parked beforeDispatch (F10 variant with host.abortAgent) | EAT-R015, EAT-R016 | wb-9v02 in_progress; the Nov-6 program restates the experiment; only the conditional repair shape is new (EAT-R160). |
| Runtime witness of the registered detached Claude path | EAT-R012, EAT-R013, EAT-R014 | wb-wupg in_progress; the acceptance already drives the real preflight. |
| Protect the descriptor repair rather than re-implement it (MW-R0) | EAT-R009, EAT-R007 | Pin equality is already the positive control; MW-R0 is an MW-owned confirm gate (npm pack + file-driven test), not a Pi requirement. |
| hx-task-scope-v1 / rf-committed-v1 field requirements (terminal task-scope, revision/query digest, complete coverage, absence authorization; nonempty render ID, output digest, graph revision, verified budget) | EAT-R058, EAT-R059, EAT-R060, EAT-R061, EAT-R091 | Field lists are verbatim in the Nov-4 acceptances; MW-R5 = EAT-R091. |
| HX/RF gated track must not block the Git-census journey | EAT-R062 | Block only the native profile. |
| Git-census usability from a Pi-hosted launch | EAT-R054, EAT-R055, EAT-R056 | PI-GIT-CENSUS-LIVE is the settling artifact; only the wording repair M123 (EAT-R200) is owed. |
| Forge exit-0 / FAIL pairing | EAT-R039, EAT-R081 | C0368 stays UNDETERMINED; wb-muip witnessed exit 1 / FAIL only. |
| Universal historical absence of a Pi -> Mechanical joined witness | EAT-R080 | wb-muip LANDED (closed 2026-11-06T13:10Z) with global UNDETERMINED; the external-store census stays unauthorized (EAT-R080 conditions). |
| Host-wide limits independent of per-workflow semaphores; load QA | EAT-R073, EAT-R074, EAT-R075, EAT-R076, EAT-R079 | wb-ny54 in_progress. |
| Immediate logical invocation ref with completion not-asserted; no node()/shell fallback; long-lived function registered and observable | EAT-R032, EAT-R033, EAT-R035 | Acceptance of EAT-R032 already names completion not-asserted and forbids node fallback. |
| Function admitted only for an allowlisted installed descriptor + exact saved source digest; no arbitrary module path/string/shell | EAT-R007, EAT-R010, EAT-R011, EAT-R027 | Allowlist and before-import validation are verbatim. |
| Final-dispatch re-read of workbench:execute, action grant, detach grant, Claude tool permissions, principal/session/realpath/caps | EAT-R028, EAT-R029, EAT-R030, EAT-R031, EAT-R064, EAT-R073 | The grant literal itself is the MW-CONTRACT ruling (EAT-R151 names the adoption gate). |
| Intent before effect; dispatch separate from settlement; lost reply uncertain; no duplicate without reconciliation | EAT-R041, EAT-R042, EAT-R043, EAT-R044 | The effect-class definition MW must supply is EAT-R176. |
| Cancel is a request, never rollback; late SDK success observable; inspector close does not kill an external Furnace Run | EAT-R045, EAT-R046, EAT-R047, EAT-R050 | Only the representation of a cancelled execution is new (EAT-R157). |
| Pure coordination under a separate read-only export/permission; advisory only | EAT-R071, EAT-R072, EAT-R093 | MW-R7 = EAT-R093. |
| Furnace-hosted mode optional; native Run/Work/Attempt only; no phantom ensure | EAT-R068, EAT-R069, EAT-R070, EAT-R092 | MW-R6 = EAT-R092. |
| Four Mechanical arms kept separate from Promise/transport/Forge/Furnace; matching native Forge operation necessary for verified_candidate | EAT-R036, EAT-R037, EAT-R038, EAT-R039, EAT-R040 | The seven-axis schema is the only addition (EAT-R156). |
| Clean isolated checkout; dirty base refused; single writer; recheck after async discovery; gate-manifest digest bound | EAT-R022, EAT-R023, EAT-R024, EAT-R025, EAT-R026 | Verbatim coverage. |
| RF preview is not committed context | EAT-R060 | Verbatim coverage. |
| Per-bead receipts only; no fabricated Beads or native IDs; receipt contents | EAT-R086 | Only the reader/pin/witness/mutant/quiet-cases fields (EAT-R170) and level tags (EAT-R165) are added. |
| TRACEABILITY.md untouched; feedback append-only | EAT-R087 | Feedback append-only is the agentic-feedback contract (Nov-4 C0103/C03126 lineage); no Pi test obligation beyond EAT-R087. |
| W11 stays planned until a registered Pi function flow and complete native receipts are measured; do not close an external gate on a grep or a model document | EAT-R082, EAT-R085 | EAT-R167 adds only the per-cut file list. |
| No new GitHub CI; use Forge; no mandatory Library dependency | EAT-R140, EAT-R084 | M047 form already landed (Nov-4); the 04:35 regression is repaired by EAT-R178 (M101); C1346 stands on AGENTS.md:167. |
| B-unknowns and B-hx-evidence deliveries | EAT-R057, EAT-R080, EAT-R081 | Already done: wb-muip closed 2026-11-06T13:10Z, wb-f3wd closed 2026-11-06T18:27Z with receipts landed before d7666a76; only the M102 wording (EAT-R179) and the named-query leg (EAT-R163 on wb-pxvv) are owed. |
| First live acceptance journey steps 1-5 | EAT-R054, EAT-R055, EAT-R056, EAT-R086 | Verbatim coverage of the PI-GIT-CENSUS-LIVE legs and receipt contents. |
| Collective-event boundary module is observation-only; no invocation host | EAT-R032, EAT-R082 | Only the wording repairs M107/M118 (EAT-R184, EAT-R195) are owed. |
| Installed-environment inspection; author transcript; 'positives' feedback file | — | Named missing artifacts with no operational consequence for a bead; recorded in EPISTEMIC-AUDIT §10, no requirement compiled. |

## Explicit deferrals (nothing silently dropped)

| Item | Why deferred | Where tracked |
|---|---|---|
| MW baseline advance to 6e15a4245d3f or later (README:3; companion exists only at the tip) | owner decision, not a docs repair | M109 -> EAT-R186 wording; wb-cbt4 |
| Where a cancelled execution is represented (03:36 axis) | design decision the owner states | M111 -> EAT-R188 wording; EAT-R157 keeps the distinction representable; wb-9a1o |
| Which README:22 defects gate the first live cut (K101) | owner ruling may replace the BEAD-PLAN default | M112 -> EAT-R189 wording; EAT-R159 receipt rule; wb-p3i2 |
| MW-R label map confirmation (K103) | MW owner | M115 -> EAT-R192 wording; EAT-R173 tracker note; wb-1zn2 |
| Bead-description re-pin (K117) | ledger-in-repo write | M119 -> EAT-R196 wording; EAT-R172; wb-cbt4 |
| Re-grade of 47 pin-relative rows after wb-5ik5 / wb-413a / wb-ocie land (K110) | landing has not happened | EAT-R147 (READJUDICATION-<date>.md); wb-12x1 |
| Bounded external-store census for the universal absence (C0321/C1255) | external stores unauthorized | EAT-R080 conditions (Nov-4); not re-filed |
| Forge contract pin for selection-completeness fields | Forge not pinned in this triage | EAT-R158; wb-9a1o |
| HX named-query task-scope route | not probed by wb-f3wd (NOT CLAIMED) | EAT-R163; wb-pxvv |
