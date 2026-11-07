# ATOMIC REQUIREMENTS — DELTA (EAT-R144..EAT-R200) — mechanical-interoperability-audit-2026-11-06 reconciliation program

Generated 2026-11-07T07:06Z by Phase 10 (DELTA compile) of the epistemic adversarial triage. Pins: doc pin pi d7666a76f5618dff61140dff20dde6ea64967814 (= env pin; docs-only child of baseline 278c8f79); mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (docs-only drift, companion program created there).
Upstream inputs: CLAIMS.jsonl (459 rows, merged ledger) | RELATIONS.jsonl (1458) | REMEDIATION.md (23 rows M101-M123) | EPISTEMIC-AUDIT.md | Nov-4 ATOMIC-REQUIREMENTS.md EAT-R001..R143 + BEAD-PLAN.md (25 groups) at the Pi pin.
Nothing in this file was run: every acceptance criterion is a design-phase specification; every TDD-MATRIX-DELTA row is **not run**.
Audited 2026-11-07T07:06Z (Phase 10 step 9, adversarial delta-requirements audit): fixes F01-F25 applied in place per REQUIREMENTS-AUDIT.md; ids EAT-R144..EAT-R200 unchanged, no row added or removed.

**Delta only.** EAT-R001..EAT-R143 (Nov-4 set, at the pin under `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/`) stay as filed: never renumbered, never silently closed. Rows below either ADD an obligation the Nov-6 program introduces or MATERIALLY REFINE a Nov-4 row (named in `Refines`). Items the pins show already done, or covered verbatim by R001..R143, are in the **Not owed** list at the end and compile to nothing.

Invariants: requirement force never upgrades claim warrant; every cited claim carries its merged-ledger status (C1xxx ids; part-02 rows re-keyed +300 — `original_id` on each CLAIMS.jsonl row); a requirement citing a REFUTED/SUPPORTED-overclaiming/CONTESTED-set claim names that status in its rationale or conditions; proposals (NON-EPISTEMIC) compile only to NORMATIVE_DECISION / RISK_CONTROL / LINGUISTIC_INTEGRITY authority, never to an empirical premise; `SUPERSEDES` links to the Nov-4 C0xxx ids are recorded, no prior id or grade is changed; MW-owned rows are tracked on wb-1zn2 and are not Pi work.

Authority legend: EMPIRICAL_REPAIR = defect verified at the pin; NORMATIVE_DECISION = adopted program design (proposal, not observed behavior); EVIDENCE_ACQUISITION = measurement owed before any claim upgrade; RISK_CONTROL = guardrail against an unproven hazard (asserts nothing about its occurrence); LINGUISTIC_INTEGRITY = docs/wording obligation. Type legend: BEHAVIORAL | NEGATIVE_REGRESSION | VERIFICATION | INSTRUMENTATION | REPRESENTATION | NORMATIVE_DESIGN. Program test levels (doc 05:5): L0 source audit, L1 isolated fixture/mutants, L2 independent packed-artifact install, L3 producer-native API session/operation, L4 registered Pi `workflow_execute` function launch joined to Mechanical outcome and native Forge, L5 detached/Furnace restart and multi-invocation load — no promotion between levels (EAT-R165). `Tiers` lists the agentic-tdd L0-L10 evidence tiers each row plans.

Disposition legend: `amend:<wb-id>` = lands as a note-append / scope refinement on that existing bead (BEAD-AMENDMENT-PLAN.md carries the exact text); `mw-tracker` = MW-owned, rides wb-1zn2; `new-bead:<key>` = none proposed (every row has an existing group).

## Delta index

| Slice | Group | Bead (status at pin) | Owner | Requirements |
|---|---|---|---|---|
| PI-0 | preserve | wb-5ik5 (open) | Pi | EAT-R144, EAT-R145, EAT-R146 (3) |
| PI-0 | docs | wb-12x1 (open) | Pi | EAT-R147, EAT-R178, EAT-R179, EAT-R180, EAT-R181, EAT-R182, EAT-R183, EAT-R184, EAT-R185, EAT-R186, EAT-R187, EAT-R188, EAT-R189, EAT-R190, EAT-R191, EAT-R192, EAT-R193, EAT-R194, EAT-R195, EAT-R196, EAT-R197, EAT-R198, EAT-R199, EAT-R200 (24) |
| PI-0 | contract-choice | wb-w8fk (open (blocked by wb-1zn2)) | Pi | EAT-R148, EAT-R149, EAT-R150, EAT-R151 (4) |
| PI-0 | descriptor | wb-ocie (in_progress) | Pi | EAT-R152, EAT-R153 (2) |
| PI-1 | authority | wb-201v (in_progress) | Pi | EAT-R154 (1) |
| PI-1 | dispatch | wb-4bxo (open (blocked)) | Pi | EAT-R155 (1) |
| PI-3 | outcomes | wb-9a1o (open (blocked by wb-4bxo)) | Pi | EAT-R156, EAT-R157, EAT-R158 (3) |
| PI-3 | git-census | wb-p3i2 (open (blocked)) | Pi | EAT-R159 (1) |
| PI-4 | cancel-repro | wb-9v02 (in_progress) | Pi | EAT-R160 (1) |
| PI-4 | replay | wb-413a (in_progress) | Pi | EAT-R161, EAT-R162 (2) |
| PI-5 | hx-admit | wb-pxvv (open (blocked)) | Pi | EAT-R163 (1) |
| PI-7 | telemetry | wb-r5q2 (open (blocked by wb-ny54)) | Pi | EAT-R164 (1) |
| PI-7 | release | wb-j5y5 (in_progress) | Pi | EAT-R165, EAT-R166, EAT-R167, EAT-R168, EAT-R169, EAT-R170, EAT-R171 (7) |
| PI-0 | master-recon | wb-cbt4 (open) | Pi | EAT-R172 (1) |
| PI-0 | external-tracker | wb-1zn2 (deferred (P3; MW-owned)) | MW | EAT-R173 (1) |
| PI-2 | mw-host | wb-1zn2 (deferred (P3; MW-owned)) | MW | EAT-R174, EAT-R175 (2) |
| PI-3 | mw-cancel | wb-1zn2 (deferred (P3; MW-owned)) | MW | EAT-R176 (1) |
| PI-7 | external-tracker | wb-1zn2 (deferred (P3; MW-owned)) | MW | EAT-R177 (1) |

Rows: 57. By authority: EMPIRICAL_REPAIR 1, EVIDENCE_ACQUISITION 4, LINGUISTIC_INTEGRITY 28, NORMATIVE_DECISION 18, RISK_CONTROL 6. By type: BEHAVIORAL 4, INSTRUMENTATION 1, NEGATIVE_REGRESSION 6, NORMATIVE_DESIGN 4, REPRESENTATION 33, VERIFICATION 9. By disposition: amend 52, mw-tracker 5. New beads: 0.

## preserve — wb-5ik5 (slice PI-0; owner Pi)

### EAT-R144 — Preservation fault injection MUST cover every Git step inside the cleanup catch

- Statement: The B-preserve fault-injection matrix MUST inject a failure at each Git step the single outer catch of `cleanupWorktree` wraps (`status --porcelain`, `add -A`, `commit --no-verify`, `rev-parse HEAD`, the first `branch` and the retry `branch`) and MUST assert, for each, that the edited bytes remain reachable and that the result is the typed preservation-failed variant, never `hasChanges:false`.
- Authority: EMPIRICAL_REPAIR | Type: VERIFICATION | Owner: Pi | Slice: PI-0 | Bead: wb-5ik5 | Disposition: amend:wb-5ik5
- Refines: EAT-R001, EAT-R002
- Claims: C1131 (ESTABLISHED), C1132 (ESTABLISHED), C1133 (ESTABLISHED), C1423 (ESTABLISHED), C1477 (ESTABLISHED), C1542 (ESTABLISHED), C1135 (NON-EPISTEMIC)
- Relations: R00098, R00099, R00146, R00147, R00148, R00149, R00150, R00151, R00152, R00153, R00154, R00155, R00156, R00157
- Supersedes (Nov-4 ids, unchanged): C0167, C0168, C0171, C0170, C0346, C0172, C0174, C0347
- Sets / remediation: K110 / M121
- Rationale: At pi d7666a76 one try block wraps six git invocations and one catch force-removes and returns hasChanges:false (ESTABLISHED, worktree.ts:135-181). EAT-R002 names only commit, status and branch failures; the artifact wording 'after commit or branch failure' names a subset of the trigger set (M121). Loss is conditional on the failed-preservation path (C1542); no runtime loss is observed.
- Conditions: Tracked tree at pi d7666a76 only (K110): the unlanded branch machine/flywheel/wb-5ik5 (e76448ea, 2026-11-06) already edits worktree.ts and was neither inspected nor run; the matrix is asserted against the landed cut, not this pin. Per the e76448ea commit message (not inspected, not run) that cut's red list names commit, status, branch and branch-exhaustion legs only, so the `add -A` and `rev-parse HEAD` legs remain owed by this row unless the landed receipt shows them.
- Acceptance: Given a real temporary Git worktree with one tracked edit and one untracked file, when each of the six git invocations inside the try block is made to fail in turn (non-zero exit and thrown-error variants), then (i) both files' exact bytes are readable at the worktree path or at a recorded recovery ref, (ii) the returned record is the typed preservation-failed variant naming the failed step, (iii) no `git worktree remove --force` ran. Positive control: the unmodified happy path still commits, branches and removes.
- Adversarial mutant: Type only the `commit` leg and leave `add -A` / `rev-parse HEAD` failures on the force-remove path; the per-step byte and variant assertions for those legs fail.
- Verification: program level L1; tiers L1, L4, L5; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/worktree.ts:135-137", quote: "try {\n    // Check for uncommitted changes in the worktree\n    const status = await git(pi, worktree.path, ["status", "--porcelain"], 10000);"}
  - {pin: "pi@d7666a76f561", path: "src/worktree.ts:177-181", quote: "} catch {\n    // Best effort cleanup on error\n    try { await removeWorktree(pi, cwd, worktree.path); } catch { /* ignore */ }\n    return { hasChanges: false };\n  }"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:22", quote: "on preservation failure its outer catch attempts `git worktree remove --force` and returns `hasChanges:false`. This can discard recoverable changes after commit or branch failure."}

### EAT-R145 — The preserve cut MUST carry the rule-8 specification ruling for the lossy characterization test

- Statement: Before `test/worktree.test.ts:432-446` ("reports no changes when the preservation commit fails") is changed, the B-preserve cut MUST obtain the BEAD-PLAN rule-8 specification ruling naming that test, MUST cite the ruling in the wb-5ik5 receipt, and the receipt validator MUST refuse a preserve cut whose receipt lacks the citation or whose gate turned green by deleting the test.
- Authority: NORMATIVE_DECISION | Type: VERIFICATION | Owner: Pi | Slice: PI-0 | Bead: wb-5ik5 | Disposition: amend:wb-5ik5
- Refines: EAT-R001, EAT-R083, EAT-R086
- Claims: C1344 (NON-EPISTEMIC), C1306 (NON-EPISTEMIC), C1358 (NON-EPISTEMIC), C1621 (NON-EPISTEMIC), C1132 (ESTABLISHED)
- Relations: R00099, R00150, R00151, R00152, R00153, R00154, R00163, R00643, R00658, R00895, R00896, R00934, R00935, R00956
- Supersedes (Nov-4 ids, unchanged): C0172, C0174, C0365, C0366, C0576, C0168, C0171
- Sets / remediation: K102 / M116
- Rationale: K102 is CONTESTED inside the Nov-6 text: 04:35 forbids weakening a safety test while 04:7 and 05:11 demand 'no false-clean', and the committed test locks the false-clean report in. The Nov-4 BEAD-PLAN rule 8 the program incorporates by reference resolves it procedurally; the program names the conflicting test nowhere (grep over the eight artifact files returns 0 hits for `worktree.test`). The conflict is preserved and routed to a recorded ruling, not decided here.
- Conditions: The ruling is an owner act not performed by this triage; the one-clause carve-out of 04:35 (M116) lands in the docs cut (EAT-R193). Read from the commit message only (K110, branch not inspected or run): the unlanded wb-5ik5 commit e76448ea's subject cites 'owner specification ruling M:61188' and its red list names test/worktree.test.ts:432 (C1); the validator MUST assert that the cited ruling id resolves (ledger row readable and naming the test), not merely that a `specification-ruling` entry exists.
- Acceptance: Given the wb-5ik5 receipt, the qa/workbench receipt validator asserts a `specification-ruling` entry naming `test/worktree.test.ts` and the ruling id/text; asserts the test file still contains a commit-failure test whose expectation is the typed preservation-failed variant; a receipt without the entry, or a diff that removes the characterization test without a replacement assertion, refuses closure.
- Adversarial mutant: Delete the characterization test and omit the ruling entry; the validator must refuse the cut.
- Verification: program level L1; tiers L0, L1, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "test/worktree.test.ts:432", quote: "it("reports no changes when the preservation commit fails", async () => {"}
  - {pin: "pi@d7666a76f561", path: "test/worktree.test.ts:445-446", quote: "expect(result.hasChanges).toBe(false);\n    expect(result.branch).toBeUndefined();"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:8", quote: "Never weaken or delete an existing safety test to fit code. Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first; the ruling is part of the cut receipt."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:35", quote: "Never remove or weaken a safety test to make a gate green."}
  - {pin: "pi@d7666a76f561", path: "git log --format=%s -1 e76448ea:1", quote: "fix(worktree): wb-5ik5 keep the edited worktree when Git preservation fails and answer with the typed preservation-failed result (EAT-R001..EAT-R003, owner specification ruling M:61188)"}

### EAT-R146 — The Claude host MUST keep refusing isolation:"worktree" until the preserve cut has landed with a receipt

- Statement: The Claude workflow host MUST keep refusing `isolation:"worktree"` with its existing typed error until EAT-R001..R003 and EAT-R144 have landed with a receipt, and the cut that lifts the refusal MUST cite that receipt.
- Authority: RISK_CONTROL | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-0 | Bead: wb-5ik5 | Disposition: amend:wb-5ik5
- Refines: EAT-R001
- Claims: C1136 (ESTABLISHED), C1137 (ESTABLISHED), C1135 (NON-EPISTEMIC), C1479 (NON-EPISTEMIC)
- Relations: R00174, R00175, R00176, R00177, R00178, R00179, R00180, R00181, R00182, R00183, R00184, R00185, R00186, R00187
- Supersedes (Nov-4 ids, unchanged): C0175, C0176, C0172, C0174, C0347, C0173, C0452
- Rationale: The refusal is ESTABLISHED at the pin (claude-host.ts:188-189) and the program states a requested isolation flag is not a working substitute for a repaired cleanupWorktree. Lifting the refusal before the byte-preservation test exists would route a Mechanical writer onto the lossy path; the hazard is the ESTABLISHED catch, the loss itself is unobserved.
- Conditions: None beyond the landing order; the refusal text may change, the refusal may not.
- Acceptance: Given a tree where no preserve receipt exists, when a Claude agent is spawned with `isolation:"worktree"`, then the spawn is refused with the existing typed error and no worktree directory is created; the test change that lifts the refusal is admitted only in a cut whose receipt references the landed preserve cut.
- Adversarial mutant: Accept `isolation:"worktree"` while the catch still force-removes; the refusal assertion fails.
- Verification: program level L1; tiers L1, L4; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workbench/claude-host.ts:188-189", quote: "if (request?.isolation === "worktree") {\n      return { ok: false, error: "Claude SDK worktree isolation is unavailable; refusing to run in the shared cwd." };"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:22", quote: "Pi Claude workflow `isolation:"worktree"` currently refuses, so a requested isolation flag is not a working substitute."}

## docs — wb-12x1 (slice PI-0; owner Pi)

### EAT-R147 — The program's pin-relative findings MUST be re-graded at the post-landing master tip

- Statement: After the wb-5ik5, wb-413a and wb-ocie cuts land on master, the 47 pin-relative absence and present-tense rows of families F01 (worktree), F02 (detached grants), F04 (replay basis) and F09 (no Mechanical host) MUST be re-graded at the post-landing master tip and the result recorded as `READJUDICATION-<date>.md` beside the program triage; until that record exists every restatement keeps the wording "at pi d7666a76 (tracked tree)".
- Authority: EVIDENCE_ACQUISITION | Type: VERIFICATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004, EAT-R082
- Claims: C1104 (ESTABLISHED), C1133 (ESTABLISHED), C1154 (ESTABLISHED), C1176 (SUPPORTED), C1538 (ESTABLISHED), C1557 (ESTABLISHED), C1339 (SUPPORTED)
- Relations: R00007, R00008, R00009, R00010, R00011, R00155, R00156, R00157, R00158, R00159, R00160, R00161, R00162, R00163
- Supersedes (Nov-4 ids, unchanged): C0170, C0346, C0204, C0205, C0343, C0441, C0224, C0161, C0340, C0435, C0436, C0315, C03132
- Sets / remediation: K110 / M122
- Rationale: Every current-state finding is graded at the tracked default-branch tree d7666a76 as the method sentence declares (C1104 ESTABLISHED); 40 machine branches are ahead of the pin and 8 touch MWI files (wb-5ik5 e76448ea, wb-413a 2f0fedd3, wb-ocie), none inspected or run. The findings are not refuted by the branches; their scope is bounded, and the bound expires at landing.
- Conditions: Landing of wb-5ik5/wb-413a/wb-ocie has not happened at the pins; the branch contents were listed by ref and subject only (not run). Two legs with different landing times: the docs-validator leg (stale-present-tense flag, bound retained) lands in docs cut #2; the re-grade leg (READJUDICATION-<date>.md) is a later cut triggered by the landings and stays on wb-12x1 unless the owner re-homes it to wb-cbt4 by note; wb-12x1 is not closed on cut #2 while the re-grade leg is open unless that re-homing note exists.
- Acceptance: Given the post-landing master tip, a re-grade record lists each of the 47 row ids (derivation: every CLAIMS.jsonl row whose `contradiction_sets` or `scope_restrictions` carries K110; 47 at generation, enumerated in REQUIREMENTS-AUDIT.md) with the new status and the tip sha, cites the landed commits, and marks every row whose status changed; the docs validator asserts that any program sentence restating an F01/F02/F04/F09 finding at a later tip cites the record, and that no restatement drops the 'at pi d7666a76 (tracked tree)' bound before the record exists.
- Adversarial mutant: Restate 'cleanupWorktree may force-remove changed work' in bare present tense after wb-5ik5 lands with no re-grade record; the validator flags the stale present tense.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:3", quote: "Static audit only. Source presence and committed test code are not newly witnessed test passes; unlanded machine branches and external journals were not enumerated."}
  - {pin: "pi@d7666a76f561", path: "git log HEAD..origin/machine/flywheel/wb-5ik5:1", quote: "e76448ea 2026-11-06 fix(worktree): wb-5ik5 keep the edited worktree when Git preservation fails and answer with the typed preservation-failed result (EAT-R001.."}

### EAT-R178 — Documentation MUST apply the M101 scoped correction for C1345

- Statement: The documentation MUST apply the M101 scoped correction at 04:L35: replace the wording "No GitHub CI; use Forge." with the REMEDIATION M101 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1345 (REFUTED, overclaims)
- Relations: R00966, R00967, R00968, R01276, R01324, R01325, R01394, R01436, R01456
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M101
- Rationale: M101 [row status: REFUTED / overclaims (K115)] class NARROW_SCOPE at 04:L35. Why sufficient: Read as an inventory statement the sentence is false at the pin (ci.yml runs lint/typecheck/test on master pushes and PRs); the M047 form the Nov-4 roll-up already landed, and README:28 / SKILL:30 ("no new GitHub CI"), is true and keeps the norm. C1346 ("use Forge") stands on AGENTS.md:167 independently.
- Conditions: Use the exact scoped replacement in REMEDIATION M101; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L35 representation satisfies NARROW_SCOPE: Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge. Preserve the original pin and status of C1345 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1345 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M101 [row status: REFUTED / overclaims (K115)] class NARROW_SCOPE at 04:L35; tracker wb-12x1
  - Existing wording: No GitHub CI; use Forge.
  - Repair: Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge.
- Evidence:
  - {pin: "pi@d7666a76f561", path: ".github/workflows/ci.yml:1-7" [E1351], quote: "name: CI\n\non:\n  push:\n    branches: [master]\n  pull_request:\n    branches: [master]"}
  - {pin: "pi@d7666a76f561", path: ".github/workflows/ci.yml:18-22" [E1352], quote: "- run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm run typecheck:test\n      - run: npm run test"}
  - {pin: "pi@d7666a76f561", path: "AGENTS.md:167" [E1353], quote: "- Use Forge for project build/test/package integration, do not add GitHub CI, and do not introduce Library as a dependency."}

### EAT-R179 — Documentation MUST apply the M102 scoped correction for C1305

- Statement: The documentation MUST apply the M102 scoped correction at 04:L3: replace the wording "All rows below are proposed work, not already delivered." with the REMEDIATION M102 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1305 (REFUTED, overclaims)
- Relations: R01278, R01279, R01323, R01408, R01457
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M102
- Rationale: M102 [row status: REFUTED / overclaims (K116)] class NARROW_SCOPE at 04:L3. Why sufficient: Two groups named in the "Every cut" row are closed beads with receipts landed on master before d7666a76 and cited by the program itself (01:40, 02:28); the exception clause keeps the reading rule and stops a seat re-filing delivered cuts.
- Conditions: Use the exact scoped replacement in REMEDIATION M102; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L3 representation satisfies NARROW_SCOPE: All rows below are proposed work, not already delivered, except the landed evidence cuts `B-unknowns` (wb-muip, closed 2026-11-06T13:10Z) and `B-hx-evidence` (wb-f3wd, closed 2026-11-06T18:27Z), whose per-cut obligations (scoped evidence, honest pending status) continue. Preserve the original pin and status of C1305 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1305 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M102 [row status: REFUTED / overclaims (K116)] class NARROW_SCOPE at 04:L3; tracker wb-12x1
  - Existing wording: All rows below are proposed work, not already delivered.
  - Repair: All rows below are proposed work, not already delivered, except the landed evidence cuts `B-unknowns` (wb-muip, closed 2026-11-06T13:10Z) and `B-hx-evidence` (wb-f3wd, closed 2026-11-06T18:27Z), whose per-cut obligations (scoped evidence, honest pending status) continue.
- Evidence:
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-muip row" [E1295], quote: ""id":"wb-muip" ... "status":"closed" ... "closed_at":"2026-11-06T13:10:35Z" (fields read by JSON parse; title '[MWI-unknowns] Acquire missing producer evidence without upgrading audit claims')"}
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-f3wd row" [E1296], quote: ""id":"wb-f3wd" ... "status":"closed" ... "closed_at":"2026-11-06T18:27:50Z" (fields read by JSON parse; title '[MWI-hx-evidence] Measure installed HX task-scope capability before certifying it')"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:3" [E1287], quote: "Do **not** fabricate Beads IDs or silently close earlier `EAT-R*` requirements. The November 4 [BEAD-PLAN](../mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md) already maps 25 planning groups to atomic requirement..."}

### EAT-R180 — Documentation MUST apply the M103 scoped correction for C1204

- Statement: The documentation MUST apply the M103 scoped correction at 01:L36: replace the wording "**CORRECTED, not open P0 — Descriptor drift.**" with the REMEDIATION M103 repair text (class ADD_SOURCE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1204 (NON-EPISTEMIC, overclaims)
- Relations: R00455, R00456, R00457, R00458, R00459, R00460, R00461, R00462, R00648, R00651, R00679, R01331, R01356, R01402
- Supersedes (Nov-4 ids, unchanged): C0199
- Sets / remediation: — / M103
- Rationale: M103 [row status: NON-EPISTEMIC / overclaims / supersedes_faithful=false (K109)] class ADD_SOURCE at 01:L36. Why sufficient: The superseded Pi row C0199 and the Nov-4 Pi heading rate the conflict P1; the only P0 label is the MW companion's MW-P0. Naming both sources removes the implied prior Pi P0 without weakening "CORRECTED", which C1200/C1203 establish.
- Conditions: Use the exact scoped replacement in REMEDIATION M103; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 01:L36 representation satisfies ADD_SOURCE: **CORRECTED — Descriptor drift (Nov-4 Pi program: P1, ledger C0199; Nov-4 MW companion: MW-P0; neither open).** Preserve the original pin and status of C1204 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1204 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M103 [row status: NON-EPISTEMIC / overclaims / supersedes_faithful=false (K109)] class ADD_SOURCE at 01:L36; tracker wb-12x1
  - Existing wording: **CORRECTED, not open P0 — Descriptor drift.**
  - Repair: **CORRECTED — Descriptor drift (Nov-4 Pi program: P1, ledger C0199; Nov-4 MW companion: MW-P0; neither open).**
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md:29" [E1108], quote: "### P1: checked-in Mechanical descriptor conflicts with its own loader"}
  - {pin: "mw@97e18068f399", path: "docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md:20" [E1110], quote: "### MW-P0 — Committed descriptor cannot pass its implemented host predicate"}
  - {pin: "mw@97e18068f399", path: "contracts/entrypoints/development.v1.json:8-9" [E1036], quote: ""inputSchema": "development-request.v1.schema.json",\n  "outputSchema": "development-outcome.v1.schema.json","}

### EAT-R181 — Documentation MUST apply the M104 scoped correction for C1244

- Statement: The documentation MUST apply the M104 scoped correction at 01:L42: replace the wording "its broad mechanical grep sentence overlooked existing `collective-event.ts`" with the REMEDIATION M104 repair text (class ADD_TEMPORAL_QUALIFIER).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1244 (SUPPORTED, overclaims)
- Relations: R00581, R00582, R00583, R00584, R00585, R00586, R00587, R00588, R00589, R00590, R00591, R00595, R00607, R00652
- Supersedes (Nov-4 ids, unchanged): C0161, C0436
- Sets / remediation: — / M104
- Rationale: M104 [row status: SUPPORTED / overclaims (K108)] class ADD_TEMPORAL_QUALIFIER at 01:L42. Why sufficient: git blame dates the sentence before the file; "overlooked existing" asserts an authorial oversight the dates refute, while "stale" is what the pin shows (the sentence is false at d7666a76).
- Conditions: Use the exact scoped replacement in REMEDIATION M104; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 01:L42 representation satisfies ADD_TEMPORAL_QUALIFIER: its broad mechanical grep sentence (written 2026-10-15, last edited 2026-10-27) is stale: `collective-event.ts` landed 2026-10-28 (f65860e1) and the row was never revisited Preserve the original pin and status of C1244 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1244 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M104 [row status: SUPPORTED / overclaims (K108)] class ADD_TEMPORAL_QUALIFIER at 01:L42; tracker wb-12x1
  - Existing wording: its broad mechanical grep sentence overlooked existing `collective-event.ts`
  - Repair: its broad mechanical grep sentence (written 2026-10-15, last edited 2026-10-27) is stale: `collective-event.ts` landed 2026-10-28 (f65860e1) and the row was never revisited
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/feature-matrix.md:112" [E1145], quote: "| Hosted develop() with real scope-limited service bindings (HX->RF->Claude SDK->Forge composition; four domain outcome variants preserved) | planned |"}
  - {pin: "pi@d7666a76f561", path: "src/workbench/collective-event.ts:1-3" [E1576], quote: "* collective-event.ts — the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope (wb-4ap.15,\n * COLLECTIVE-ADAPTATION-R15). Any Pi ingestion of such events goes through ingestCollectiveEvent."}

### EAT-R182 — Documentation MUST apply the M105 scoped correction for C1214

- Statement: The documentation MUST apply the M105 scoped correction at 01:L38: replace the wording "Mid-session cancel, dirty-write reconciliation, cross-host replay and no-duplicate effects remain to implement." with the REMEDIATION M105 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1214 (SUPPORTED, overclaims)
- Relations: R00492, R00493, R00494, R00495, R00496, R00514, R00653, R01341, R01382, R01403, R01427, R01452
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M105
- Rationale: M105 [row status: SUPPORTED / overclaims (K111)] class NARROW_SCOPE at 01:L38. Why sufficient: The rig's signal is a pre-dispatch barrier not forwarded to the SDK (absence established), but MW already reads a mid-gate FORGE_OPERATION_CANCELLED; the qualifier names the leg the absence is about.
- Conditions: Use the exact scoped replacement in REMEDIATION M105; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 01:L38 representation satisfies NARROW_SCOPE: Mid-session cancel of the running Claude SDK implement session (a Forge-operation cancel is already read at the gate leg, MW docs/10:141), dirty-write reconciliation, cross-host replay and ... Preserve the original pin and status of C1214 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1214 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M105 [row status: SUPPORTED / overclaims (K111)] class NARROW_SCOPE at 01:L38; tracker wb-12x1
  - Existing wording: Mid-session cancel, dirty-write reconciliation, cross-host replay and no-duplicate effects remain to implement.
  - Repair: Mid-session cancel of the running Claude SDK implement session (a Forge-operation cancel is already read at the gate leg, MW docs/10:141), dirty-write reconciliation, cross-host replay and ...
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/claude-implement.ts:37-39" [E1191], quote: "Honoured as a pre-dispatch barrier only: a signal already\n   * aborted before the first provider side effect dispatches nothing. It is not forwarded to\n   * the SDK and an abort during a running session is not handled by this slice."}
  - {pin: "mw@97e18068f399", path: "docs/10-current-state-and-gaps.md:141" [E1041], quote: "A mid-gate cancel through the public Forge SDK was accepted and established by the operation's own terminal; the host now reads it as `FORGE_OPERATION_CANCELLED` with the operation id and never as a verdict."}

### EAT-R183 — Documentation MUST apply the M106 scoped correction for C1217

- Statement: The documentation MUST apply the M106 scoped correction at 01:L38: replace the wording "... and no-duplicate effects remain to implement." with the REMEDIATION M106 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1217 (SUPPORTED, overclaims)
- Relations: R00504, R00505, R00654, R01341, R01453
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M106
- Rationale: M106 [row status: SUPPORTED / overclaims (K112)] class NARROW_SCOPE at 01:L38. Why sufficient: grep finds no exactly-once/at-most-once layer for develop() effects, but `idempotencyKey` / `IDEMPOTENCY_FINGERPRINT_INVALID` exist for one effect type; the blanket wording ignores it. The effect classes the guarantee must cover are still undefined (wb-mwsy).
- Conditions: Use the exact scoped replacement in REMEDIATION M106; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 01:L38 representation satisfies NARROW_SCOPE: ... and a host-level no-duplicate guarantee for develop() effects remain to implement (a per-candidate idempotency fingerprint exists only for Git-source publication, `git-source-publication.ts`). Preserve the original pin and status of C1217 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1217 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M106 [row status: SUPPORTED / overclaims (K112)] class NARROW_SCOPE at 01:L38; tracker wb-12x1
  - Existing wording: ... and no-duplicate effects remain to implement.
  - Repair: ... and a host-level no-duplicate guarantee for develop() effects remain to implement (a per-candidate idempotency fingerprint exists only for Git-source publication, `git-source-publication.ts`).
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/git-source-publication.ts:43" [E1616], quote: ""}
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/git-source-publication.ts:74-75" [E1617], quote: ""}

### EAT-R184 — Documentation MUST apply the M107 scoped correction for C1537

- Statement: The documentation MUST apply the M107 scoped correction at 02:L24: replace the wording "Pi has a read-only Mechanical event integration (`collective-event.ts`)" with the REMEDIATION M107 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1537 (SUPPORTED, overclaims)
- Relations: R00732, R00733, R01386, R01387, R01392, R01431, R01448
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M107
- Rationale: M107 [row status: SUPPORTED / overclaims (K107)] class NARROW_SCOPE at 02:L24. Why sufficient: The module exists and is read-only, but no src module imports it (grep -rln over src/ returns only the module); "integration" read as an operational path is not established at the pin.
- Conditions: Use the exact scoped replacement in REMEDIATION M107; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 02:L24 representation satisfies NARROW_SCOPE: Pi has a read-only Mechanical event boundary module (`collective-event.ts`, observation-only; not yet imported by any registered tool or host) Preserve the original pin and status of C1537 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1537 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M107 [row status: SUPPORTED / overclaims (K107)] class NARROW_SCOPE at 02:L24; tracker wb-12x1
  - Existing wording: Pi has a read-only Mechanical event integration (`collective-event.ts`)
  - Repair: Pi has a read-only Mechanical event boundary module (`collective-event.ts`, observation-only; not yet imported by any registered tool or host)
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workbench/collective-event.ts:25-26" [E1577], quote: "The boundary hands that event to the projection's ingest() itself, so a refused envelope\n * provably never reaches it; once the event is applied it returns, frozen, one `hypothesis` statement parent -> event per"}
  - {pin: "pi@d7666a76f561", path: "src/workbench/collective-event.ts:1-3" [E1576], quote: "* collective-event.ts — the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope (wb-4ap.15,\n * COLLECTIVE-ADAPTATION-R15). Any Pi ingestion of such events goes through ingestCollectiveEvent."}

### EAT-R185 — Documentation MUST apply the M108 scoped correction for C1550

- Statement: The documentation MUST apply the M108 scoped correction at 02:L29: replace the wording "Pi `wb-f3wd` native HX probe established task-scope unsupported at the probed producer version" with the REMEDIATION M108 repair text (class NARROW_SCOPE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1550 (SUPPORTED, overclaims)
- Relations: R00755, R00757, R00758, R00765, R00909, R00911, R00916, R01328, R01351, R01407, R01428
- Supersedes (Nov-4 ids, unchanged): C03114
- Sets / remediation: — / M108
- Rationale: M108 [row status: SUPPORTED / overclaims (F07)] class NARROW_SCOPE at 02:L29. Why sufficient: The receipt bounds its verdict to the find verb and roster and lists the named-query route as NOT CLAIMED; "established ... at the probed producer version" reads as version-wide.
- Conditions: Use the exact scoped replacement in REMEDIATION M108; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 02:L29 representation satisfies NARROW_SCOPE: Pi `wb-f3wd` native HX probe recorded task-scope unsupported for the probed `find` legs and the 84-capability roster at hx 0.1.0 (a workspace-defined named query carrying a task scope and other verbs were not claimed) Preserve the original pin and status of C1550 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1550 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M108 [row status: SUPPORTED / overclaims (F07)] class NARROW_SCOPE at 02:L29; tracker wb-12x1
  - Existing wording: Pi `wb-f3wd` native HX probe established task-scope unsupported at the probed producer version
  - Repair: Pi `wb-f3wd` native HX probe recorded task-scope unsupported for the probed `find` legs and the 84-capability roster at hx 0.1.0 (a workspace-defined named query carrying a task scope and other verbs were not claimed)
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/receipts/wb-f3wd.md:12" [E1130], quote: "Verdict: task-scope-unsupported. No leg is task-scope proof. ... The blocker is recorded on gate HX-TASK-SCOPE-PROBE and scoped to native-task-scope only. Git-census mode is named not blocked (claim C03113)."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/receipts/wb-f3wd.md:7" [E1124], quote: "Version pin, measured 2026-11-06: the runtime hx 0.1.0, binary SHA-256 `e0efc5f18763678ba82707c869c886dbdea8317e4dcfd704522fd6157354c690`, resolved from PATH, HXS 1.0, protocol hxs/1.0;"}

### EAT-R186 — Documentation MUST apply the M109 scoped correction for C1406

- Statement: The documentation MUST apply the M109 scoped correction at README:L5 (and README:L3 baseline): replace the wording "The companion Mechanical program is at [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06)." with the REMEDIATION M109 repair text (class ADD_TEMPORAL_QUALIFIER).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-cbt4)
- Refines: EAT-R004
- Claims: C1406 (ESTABLISHED, overclaims)
- Relations: R01039, R01040, R01305, R01306, R01332, R01342, R01359, R01404, R01433, R01446
- Supersedes (Nov-4 ids, unchanged): C0405
- Sets / remediation: — / M109
- Rationale: M109 [row status: ESTABLISHED at mw-tip only / overclaims (K105)] class ADD_TEMPORAL_QUALIFIER at README:L5 (and README:L3 baseline). Why sufficient: git ls-tree at 97e18068 lists no such directory; it is created by the two tip commits. Pinning the citation makes the sentence true at a named revision and surfaces that the companion is the same lineage.
- Conditions: Use the exact scoped replacement in REMEDIATION M109; do not upgrade the source status or turn not-run into PASS. deferred: the row's `deferred:` clause names an owner decision (wb-cbt4); the docs cut applies only the wording part.
- Acceptance: Assert the corrected README:L5 (and README:L3 baseline) representation satisfies ADD_TEMPORAL_QUALIFIER: The companion Mechanical program is at MechanicalWorkflows `docs/programs/pi-workbench-interoperability-audit-2026-11-06` (commits 2ea69445 / 6e15a4245d3f, 2026-11-06; same author; absent at the stated baseline 97e18068). deferred: advancing the README MechanicalWorkflows baseline to 6e15a4245d3f or later is an owner decision (wb-cbt4 master-recon / wb-12x1), not a repair this roll-up makes. Preserve the original pin and status of C1406 in the triage map.  The landed program text is the repair text up to and excluding its `deferred:` clause; the `deferred:` clause is recorded in the wb-12x1 receipt and as a note on wb-cbt4, never in the program file, and the predicate asserts the literal token `deferred:` is absent from the landed file.
- Adversarial mutant: Restore the overstrong or unqualified C1406 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M109 [row status: ESTABLISHED at mw-tip only / overclaims (K105)] class ADD_TEMPORAL_QUALIFIER at README:L5 (and README:L3 baseline); tracker wb-cbt4
  - Existing wording: The companion Mechanical program is at [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06).
  - Repair: The companion Mechanical program is at MechanicalWorkflows `docs/programs/pi-workbench-interoperability-audit-2026-11-06` (commits 2ea69445 / 6e15a4245d3f, 2026-11-06; same author; absent at the stated baseline 97e18068). deferred: advancing the README MechanicalWorkflows baseline to 6e15a4245d3f or later is an owner decision (wb-cbt4 master-recon / wb-12x1), not a repair this roll-up makes.
- Evidence:
  - {pin: "mw@97e18068f399", path: "git ls-tree --name-only 97e18068 docs/programs/:1-8" [E1249], quote: "docs/programs/pi-workbench-interop-2026-11-04\ndocs/programs/rfcli-feedback-adoption-2026-11-04\ndocs/programs/trainingworks-2026-10-18 (8 entries; none named pi-workbench-interoperability-audit-2026-11-06)"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:3" [E1003], quote: "Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:5" [E1248], quote: "The companion Mechanical program is at [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06)."}

### EAT-R187 — Documentation MUST apply the M110 scoped correction for C1562

- Statement: The documentation MUST apply the M110 scoped correction at 03:L3: replace the wording "Align this protocol with [Mechanical's companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md) through one joint design" with the REMEDIATION M110 repair text (class ADD_TEMPORAL_QUALIFIER).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1562 (NON-EPISTEMIC)
- Relations: R01332, R01336, R01359, R01404, R01433, R01446
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M110
- Rationale: M110 [row status: NON-EPISTEMIC (presupposition refuted at the stated baseline; K105)] class ADD_TEMPORAL_QUALIFIER at 03:L3. Why sufficient: The link resolves to the moving ref `main`; at the program's own baseline the file does not exist. A pinned reference keeps the norm executable and honest about independence.
- Conditions: Use the exact scoped replacement in REMEDIATION M110; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 03:L3 representation satisfies ADD_TEMPORAL_QUALIFIER: Align this protocol with Mechanical's companion host contract (`docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md` at 6e15a4245d3f; same authorial lineage, so alignment is a joint gate, not corroboration) through one joint design Preserve the original pin and status of C1562 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1562 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M110 [row status: NON-EPISTEMIC (presupposition refuted at the stated baseline; K105)] class ADD_TEMPORAL_QUALIFIER at 03:L3; tracker wb-12x1
  - Existing wording: Align this protocol with [Mechanical's companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md) through one joint design
  - Repair: Align this protocol with Mechanical's companion host contract (`docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md` at 6e15a4245d3f; same authorial lineage, so alignment is a joint gate, not corroboration) through one joint design
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:3" [E1247], quote: "**Not shipped.** Align this protocol with [Mechanical's companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md)"}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md:3" [E1229], quote: "**Proposal only; do not treat names or types below as shipped APIs.** This adopts one vocabulary to resolve the November 4 Pi `profile` versus Mechanical `mode` proposal conflict (KU10);"}

### EAT-R188 — Documentation MUST apply the M111 scoped correction for C1606

- Statement: The documentation MUST apply the M111 scoped correction at 03:L36: replace the wording "- **Execution:** queued, running, settled, failed, unknown." with the REMEDIATION M111 repair text (class SURFACE_DISAGREEMENT).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-9a1o)
- Refines: EAT-R004
- Claims: C1606 (NON-EPISTEMIC)
- Relations: R00861, R00862, R01447
- Supersedes (Nov-4 ids, unchanged): C0562
- Sets / remediation: — / M111
- Rationale: M111 [row status: NON-EPISTEMIC / supersedes_faithful=false (K106)] class SURFACE_DISAGREEMENT at 03:L36. Why sufficient: README:5 promises to reconcile rather than silently rewrite the Nov-4 design; the value set changed with no note and `cancelled` left the axis while 03:47 still distinguishes cancel kinds. Naming the prior set is the minimal fidelity repair; where a cancelled execution lands is a design decision the owner must state.
- Conditions: Use the exact scoped replacement in REMEDIATION M111; do not upgrade the source status or turn not-run into PASS. deferred: the row's `deferred:` clause names an owner decision (wb-9a1o); the docs cut applies only the wording part.
- Acceptance: Assert the corrected 03:L36 representation satisfies SURFACE_DISAGREEMENT: - **Execution:** queued, running, settled, failed, unknown (revises the Nov-4 proposal's {running, completed, failed, cancelled, unknown}; `completed` is reported as `settled`; the axis that carries a cancelled execution is an owner decision pending on wb-9a1o, EAT-R157; 03:47 distinguishes three cancel kinds). [Executable form of the M111 `deferred:<...>` placeholder: the landed text names the prior set, the completed->settled mapping and the open decision with its bead; no literal `deferred:<` placeholder appears in the landed file; the deferred clause is recorded on wb-9a1o.] Preserve the original pin and status of C1606 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1606 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M111 [row status: NON-EPISTEMIC / supersedes_faithful=false (K106)] class SURFACE_DISAGREEMENT at 03:L36; tracker wb-9a1o
  - Existing wording: - **Execution:** queued, running, settled, failed, unknown.
  - Repair: - **Execution:** queued, running, settled, failed, unknown (revises the Nov-4 proposal's {running, completed, failed, cancelled, unknown}; `completed` is reported as `settled`; a cancelled execution is represented as deferred:<owner states the axis that carries a cancelled execution, e.g. effects/freshness, since 03:47 distinguishes three cancel kinds>).
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:36" [E1618], quote: ""}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/CLAIMS.jsonl:C0562" [E1619], quote: ""}

### EAT-R189 — Documentation MUST apply the M112 scoped correction for C1427

- Statement: The documentation MUST apply the M112 scoped correction at README:L22: replace the wording "**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions." with the REMEDIATION M112 repair text (class SURFACE_DISAGREEMENT).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-p3i2)
- Refines: EAT-R004
- Claims: C1427 (NON-EPISTEMIC)
- Relations: R01073, R01074, R01075, R01076, R01077, R01078, R01280, R01281, R01282, R01316, R01409, R01442
- Supersedes (Nov-4 ids, unchanged): C0172, C0173
- Sets / remediation: — / M112
- Rationale: M112 [row status: NON-EPISTEMIC (set K101 CONTESTED)] class SURFACE_DISAGREEMENT at README:L22. Why sufficient: The BEAD-PLAN the program orders reused (04:3) makes B-git-census depend only on B-preserve, B-dispatch, B-outcomes, B-effects and states detached repair is not a false blocker for the embedded-first slice; README:22 reads as four blockers of any effectful run. The disagreement must be visible until ruled.
- Conditions: Use the exact scoped replacement in REMEDIATION M112; do not upgrade the source status or turn not-run into PASS. deferred: the row's `deferred:` clause names an owner decision (wb-p3i2); the docs cut applies only the wording part.
- Acceptance: Assert the corrected README:L22 representation satisfies SURFACE_DISAGREEMENT: **Critical defects (sequencing per the reused BEAD-PLAN graph):** Pi dirty-worktree cleanup may discard changes after preservation failure (B-preserve, gates the first embedded live cut); registered detached Claude grant construction contradicts the host validator (B-detached-grants, gates the detached cuts); per-agent skip during asynchronous startup may be missed (B-cancel-repro dispositions it first); and replay does not yet bind source/skills/provider revisions (B-replay, independent cut). deferred: an owner ruling on wb-p3i2 naming its blockers may replace this wording. Preserve the original pin and status of C1427 in the triage map.  The landed program text is the repair text up to and excluding its `deferred:` clause; the `deferred:` clause is recorded in the wb-12x1 receipt and as a note on wb-p3i2, never in the program file, and the predicate asserts the literal token `deferred:` is absent from the landed file.
- Adversarial mutant: Restore the overstrong or unqualified C1427 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M112 [row status: NON-EPISTEMIC (set K101 CONTESTED)] class SURFACE_DISAGREEMENT at README:L22; tracker wb-p3i2
  - Existing wording: **Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions.
  - Repair: **Critical defects (sequencing per the reused BEAD-PLAN graph):** Pi dirty-worktree cleanup may discard changes after preservation failure (B-preserve, gates the first embedded live cut); registered detached Claude grant construction contradicts the host validator (B-detached-grants, gates the detached cuts); per-agent skip during asynchronous startup may be missed (B-cancel-repro dispositions it first); and replay does not yet bind source/skills/provider revisions (B-replay, independent cut). deferred: an owner ruling on wb-p3i2 naming its blockers may replace this wording.
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:22" [E1321], quote: "**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may ..."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:35" [E1170], quote: "| 19 | B-git-census | PI-3 | EAT-R053..EAT-R056 (4) | B-preserve, B-dispatch, B-outcomes, B-effects | MW-HOST, MW-CANCEL | PI-GIT-CENSUS-LIVE |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:165" [E1320], quote: "Note: PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned and any demonstrated authorization hole repaired before live closure."}

### EAT-R190 — Documentation MUST apply the M113 scoped correction for C1304 (+1)

- Statement: The documentation MUST apply the M113 scoped correction at 04:L5-22 (Stage table): replace the wording "Reuse its dependency graph and original labels. [Stage table without Depends-on / External gate columns]" with the REMEDIATION M113 repair text (class ADD_MISSING_PREMISE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1304 (NON-EPISTEMIC), C1316 (NON-EPISTEMIC)
- Relations: R00933, R00949, R00950, R00952, R01032, R01281, R01282, R01336, R01409, R01418, R01442, R01444
- Supersedes (Nov-4 ids, unchanged): C0316, C0378
- Sets / remediation: — / M113
- Rationale: M113 [row status: NON-EPISTEMIC (sets K101/K103)] class ADD_MISSING_PREMISE at 04:L5-22 (Stage table). Why sufficient: The norm "reuse its dependency graph" is only partially met by the artifact itself: the table drops the per-row dependency and gate columns, so the first joint live row no longer shows what gates it.
- Conditions: Use the exact scoped replacement in REMEDIATION M113; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L5-22 (Stage table) representation satisfies ADD_MISSING_PREMISE: Restore the BEAD-PLAN Depends-on and External-gate columns on the Stage rows that depend on MW deliveries: B-dispatch (MW-HOST), B-controls (MW-CANCEL), B-git-census (MW-HOST, MW-CANCEL), B-hx-admit/B-rf-admit (MW-NATIVE), B-detached-function/B-furnace-function (MW-FURNACE), B-coordination (MW-COORDINATION), as BEAD-PLAN rows 10-25 carry them. Preserve the original pin and status of C1304, C1316 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1304 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M113 [row status: NON-EPISTEMIC (sets K101/K103)] class ADD_MISSING_PREMISE at 04:L5-22 (Stage table); tracker wb-12x1
  - Existing wording: Reuse its dependency graph and original labels. [Stage table without Depends-on / External gate columns]
  - Repair: Restore the BEAD-PLAN Depends-on and External-gate columns on the Stage rows that depend on MW deliveries: B-dispatch (MW-HOST), B-controls (MW-CANCEL), B-git-census (MW-HOST, MW-CANCEL), B-hx-admit/B-rf-admit (MW-NATIVE), B-detached-function/B-furnace-function (MW-FURNACE), B-coordination (MW-COORDINATION), as BEAD-PLAN rows 10-25 carry them.
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:3" [E1287], quote: "Do **not** fabricate Beads IDs or silently close earlier `EAT-R*` requirements. The November 4 [BEAD-PLAN](../mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md) already maps 25 planning groups to atomic requirement..."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:32" [E1318], quote: "| 16 | B-controls | PI-4 | EAT-R045..EAT-R050 (6) | B-effects | MW-CANCEL | PI-CANCEL-RECOVERY | partial — Pi wiring and fixtures land now; live cancel leg gated PI-CANCEL-RECOVERY (MW-CANCEL) |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:35" [E1170], quote: "| 19 | B-git-census | PI-3 | EAT-R053..EAT-R056 (4) | B-preserve, B-dispatch, B-outcomes, B-effects | MW-HOST, MW-CANCEL | PI-GIT-CENSUS-LIVE |"}

### EAT-R191 — Documentation MUST apply the M114 scoped correction for C1315 (+1)

- Statement: The documentation MUST apply the M114 scoped correction at 04:L15; 05:L15: replace the wording "Persist intent/dispatch/settlement, native cancel and unknown recovery | ... ; Stop before dispatch, during edit, after commit, after Forge dispatch" with the REMEDIATION M114 repair text (class ADD_MISSING_PREMISE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-1zn2)
- Refines: EAT-R004
- Claims: C1315 (NON-EPISTEMIC), C1362 (NON-EPISTEMIC)
- Relations: R00948, R00959, R00991, R00992, R00993, R01008, R01286, R01287, R01410, R01444
- Supersedes (Nov-4 ids, unchanged): C0324, C0453
- Sets / remediation: — / M114
- Rationale: M114 [row status: NON-EPISTEMIC (set K103)] class ADD_MISSING_PREMISE at 04:L15; 05:L15. Why sufficient: Three of the four stops presuppose an in-flight cancel MW does not implement at the pin (claude-implement.ts:37-47); BEAD-PLAN row 16 carries the MW-CANCEL gate the Nov-6 rows dropped, so the falsifier cannot be run from Pi-side work alone.
- Conditions: Use the exact scoped replacement in REMEDIATION M114; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L15; 05:L15 representation satisfies ADD_MISSING_PREMISE: Persist intent/dispatch/settlement, native cancel (gated MW-CANCEL / MW-R3: the rig signal is pre-dispatch-only at 97e18068) and unknown recovery | ... ; Stop before dispatch (Pi-side now); during edit, after commit, after Forge dispatch (gated MW-CANCEL / MW-R3) Preserve the original pin and status of C1315, C1362 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1315 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M114 [row status: NON-EPISTEMIC (set K103)] class ADD_MISSING_PREMISE at 04:L15; 05:L15; tracker wb-1zn2
  - Existing wording: Persist intent/dispatch/settlement, native cancel and unknown recovery | ... ; Stop before dispatch, during edit, after commit, after Forge dispatch
  - Repair: Persist intent/dispatch/settlement, native cancel (gated MW-CANCEL / MW-R3: the rig signal is pre-dispatch-only at 97e18068) and unknown recovery | ... ; Stop before dispatch (Pi-side now); during edit, after commit, after Forge dispatch (gated MW-CANCEL / MW-R3)
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/claude-implement.ts:37-39" [E1191], quote: "Honoured as a pre-dispatch barrier only: a signal already\n   * aborted before the first provider side effect dispatches nothing. It is not forwarded to\n   * the SDK and an abort during a running session is not handled by this slice."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:15" [E1362], quote: "| Mechanical cancel | Stop before dispatch, during edit, after commit, after Forge dispatch; keep dirty/candidate/native refs and honest unknown |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:32" [E1318], quote: "| 16 | B-controls | PI-4 | EAT-R045..EAT-R050 (6) | B-effects | MW-CANCEL | PI-CANCEL-RECOVERY | partial — Pi wiring and fixtures land now; live cancel leg gated PI-CANCEL-RECOVERY (MW-CANCEL) |"}

### EAT-R192 — Documentation MUST apply the M115 scoped correction for C1322 (+6)

- Statement: The documentation MUST apply the M115 scoped correction at 04:L22: replace the wording "**Mechanical-owned tracks:** companion `MW-R1` installed rig host export; `MW-R2` callback bundle; `MW-R3` active cancellation/replay/effect control; `MW-R4` joint native journey; `MW-R5` native HX/RF; `MW-R6` Furnace; `MW-R7` coordination." (verbatim at 04:L22; the REMEDIATION M115 'Existing wording' cell is not verbatim and is flagged to the Phase-8 owner) with the REMEDIATION M115 repair text (class ADD_MISSING_PREMISE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-1zn2)
- Refines: EAT-R004
- Claims: C1322 (NON-EPISTEMIC), C1323 (NON-EPISTEMIC), C1324 (NON-EPISTEMIC), C1325 (NON-EPISTEMIC), C1326 (NON-EPISTEMIC), C1327 (NON-EPISTEMIC), C1328 (NON-EPISTEMIC)
- Relations: R01288, R01289, R01290, R01291, R01292, R01293, R01294, R01295, R01296, R01297, R01298, R01299, R01300, R01301
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M115
- Rationale: M115 [row status: NON-EPISTEMIC (set K103; labels defined at mw-tip only, K105)] class ADD_MISSING_PREMISE at 04:L22. Why sufficient: The labels resolve only at mw-tip and no map to the Nov-4 mw-* tracks / EAT-R088..R093 that bead wb-1zn2 gates on exists in the Pi artifact; the "Mechanical-owned" header contradicts the companion's own owner column.
- Conditions: Use the exact scoped replacement in REMEDIATION M115; do not upgrade the source status or turn not-run into PASS. deferred: the row's `deferred:` clause names an owner decision (wb-1zn2); the docs cut applies only the wording part.
- Acceptance: Assert the corrected 04:L22 representation satisfies ADD_MISSING_PREMISE: Mechanical tracks (labels from the MW companion at 6e15a4245d3f; owners per its table: Both for MW-R4, producer-side for MW-R5/MW-R6): MW-R1 installed rig host export (≈ Nov-4 mw-host, EAT-R089; the joint ABI ruling ≈ mw-contract, EAT-R088); MW-R2 callback bundle (new); MW-R3 active cancellation/replay/effect control (≈ mw-cancel, EAT-R090); MW-R4 joint native journey (new); MW-R5 native HX/RF (≈ mw-native, EAT-R091); MW-R6 Furnace (≈ mw-furnace, EAT-R092); MW-R7 coordination (≈ mw-coordination, EAT-R093). The map is this roll-up's candidate reading (MW-owner confirmation pending on wb-1zn2). [Landed inline marker; the `deferred:` clause itself is recorded in the wb-12x1 receipt and on wb-1zn2, never in the program file, and the predicate asserts the literal token `deferred:` is absent from the landed file.] Preserve the original pin and status of C1322, C1323, C1324, C1325, C1326, C1327, C1328 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1322 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M115 [row status: NON-EPISTEMIC (set K103; labels defined at mw-tip only, K105)] class ADD_MISSING_PREMISE at 04:L22; tracker wb-1zn2
  - Existing wording: **Mechanical-owned** tracks: MW-R1 installed rig host export; MW-R2 callback bundle; MW-R3 active cancellation/replay/effect control; MW-R4 joint native journey; MW-R5 native HX/RF; MW-R6 Furnace; MW-R7 coordination.
  - Repair: Mechanical tracks (labels from the MW companion at 6e15a4245d3f; owners per its table: Both for MW-R4, producer-side for MW-R5/MW-R6): MW-R1 installed rig host export (≈ Nov-4 mw-host, EAT-R089; the joint ABI ruling ≈ mw-contract, EAT-R088); MW-R2 callback bundle (new); MW-R3 active cancellation/replay/effect control (≈ mw-cancel, EAT-R090); MW-R4 joint native journey (new); MW-R5 native HX/RF (≈ mw-native, EAT-R091); MW-R6 Furnace (≈ mw-furnace, EAT-R092); MW-R7 coordination (≈ mw-coordination, EAT-R093). The map is this roll-up's candidate reading; deferred: confirmation by the MW owner on wb-1zn2.
- Evidence:
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:8" [E1326], quote: "| MW-R1 | P1 | Mechanical, joint ABI ruling | Versioned, independently importable local rig-host facade, no new mandatory package | Consumer installed from packed artifacts without checkout or ambient repo exports |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:230-231" [E1290], quote: "| EAT-R088 | mw-contract | PI-0 | MW MUST publish the adopted versioned invocation ABI |\n| EAT-R089 | mw-host | PI-2 | MW MUST publish an independently consumable application host facade |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:22" [E1293], quote: "**Mechanical-owned tracks:** companion `MW-R1` installed rig host export; `MW-R2` callback bundle; `MW-R3` active cancellation/replay/effect control; `MW-R4` joint native journey; `MW-R5` native HX/RF; `MW-R6` Furnace; `MW-R7` coordination."}

### EAT-R193 — Documentation MUST apply the M116 scoped correction for C1344

- Statement: The documentation MUST apply the M116 scoped correction at 04:L35: replace the wording "Never remove or weaken a safety test to make a gate green." with the REMEDIATION M116 repair text (class ADD_MISSING_PREMISE).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-5ik5)
- Refines: EAT-R004
- Claims: C1344 (NON-EPISTEMIC)
- Relations: R01283, R01398, R01443
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M116
- Rationale: M116 [row status: NON-EPISTEMIC (set K102 CONTESTED)] class ADD_MISSING_PREMISE at 04:L35. Why sufficient: Read literally the sentence blocks the P0 fix the program mandates (04:7, 05:11 "no false-clean"); the Nov-4 BEAD-PLAN rule 8 the program incorporates by reference already carries the carve-out, which 04:35 does not restate.
- Conditions: Use the exact scoped replacement in REMEDIATION M116; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L35 representation satisfies ADD_MISSING_PREMISE: Never remove or weaken a safety test to make a gate green; where an existing characterization test locks in a defect the contract removes (e.g. `test/worktree.test.ts:432-446` asserting the false-clean report that B-preserve forbids), obtain the specification ruling BEAD-PLAN rule 8 requires and record it in the cut receipt. Preserve the original pin and status of C1344 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1344 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M116 [row status: NON-EPISTEMIC (set K102 CONTESTED)] class ADD_MISSING_PREMISE at 04:L35; tracker wb-5ik5
  - Existing wording: Never remove or weaken a safety test to make a gate green.
  - Repair: Never remove or weaken a safety test to make a gate green; where an existing characterization test locks in a defect the contract removes (e.g. `test/worktree.test.ts:432-446` asserting the false-clean report that B-preserve forbids), obtain the specification ruling BEAD-PLAN rule 8 requires and record it in the cut receipt.
- Evidence:
  - {pin: "pi@d7666a76f561", path: "test/worktree.test.ts:432,445-446" [E1282], quote: "it("reports no changes when the preservation commit fails", async () => {\n    expect(result.hasChanges).toBe(false);\n    expect(result.branch).toBeUndefined();"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:8" [E1056], quote: "Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first; the ruling is part of the cut receipt."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:35" [E1342], quote: "Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`. Before implementing, refresh both branches, check unlanded work, avoid overlapping mutable test headers, and ensure the **merged candidat..."}

### EAT-R194 — Documentation MUST apply the M117 scoped correction for C1576 (+1)

- Statement: The documentation MUST apply the M117 scoped correction at hosting.md:L17; 03:L19: replace the wording "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical." with the REMEDIATION M117 repair text (class SURFACE_DISAGREEMENT).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-w8fk)
- Refines: EAT-R004
- Claims: C1576 (NON-EPISTEMIC), C1458 (NON-EPISTEMIC)
- Relations: R00804, R00805, R01141, R01142, R01143, R01144, R01285, R01336, R01360, R01361, R01405, R01439, R01445
- Supersedes (Nov-4 ids, unchanged): C0522, C0326, C0584, C0514
- Sets / remediation: — / M117
- Rationale: M117 [row status: NON-EPISTEMIC (set K104)] class SURFACE_DISAGREEMENT at hosting.md:L17; 03:L19. Why sufficient: doc 03:19 reserves `hostMode` for embedded|detached and bans generic "mode" aliases, while the hosting guide in the same commit folds evidenceProfile/contextProfile values into "host modes" and MW already ships a result-side `mode` literal; the two surfaces must use one vocabulary.
- Conditions: Use the exact scoped replacement in REMEDIATION M117; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected hosting.md:L17; 03:L19 representation satisfies SURFACE_DISAGREEMENT: Native HX evidence (`hx-task-scope-v1`), committed RF context (`rf-committed-v1`), and the detached and Furnace hosts are separately gated after the first Git-census/plain vertical. [03:L19 addendum: the alias ban is about request-side selectors; MW's shipped result-side `mode` member (`LiveDevelopmentResult.mode`, live-development.ts:19-22) must be named when the ban is implemented.] Preserve the original pin and status of C1576, C1458 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1576 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M117 [row status: NON-EPISTEMIC (set K104)] class SURFACE_DISAGREEMENT at hosting.md:L17; 03:L19; tracker wb-w8fk
  - Existing wording: Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical.
  - Repair: Native HX evidence (`hx-task-scope-v1`), committed RF context (`rf-committed-v1`), and the detached and Furnace hosts are separately gated after the first Git-census/plain vertical. [03:L19 addendum: the alias ban is about request-side selectors; MW's shipped result-side `mode` member (`LiveDevelopmentResult.mode`, live-development.ts:19-22) must be named when the ban is implemented.]
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/mechanical-function-hosting.md:17" [E1244], quote: "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:19" [E1308], quote: "Pi's existing `hostMode` means `embedded|detached` transport. The proposed **host-owned** `evidenceProfile` is `git-census-v1|hx-task-scope-v1`. A separate **host-owned** `contextProfile` is `plain-v1|rf-committed-v1`."}
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/live-development.ts:19-22" [E1224], quote: "export interface LiveDevelopmentResult {\n  readonly mode: "live-claude-forge";\n  readonly discovery: "git-tracked-files";\n  readonly context: "plain-task-context" | "reactive-fiber";"}

### EAT-R195 — Documentation MUST apply the M118 scoped correction for C1555

- Statement: The docs cut MUST (a) add "and the W11 status-matrix row" to 02:L33 and (b) replace the stale W11 detection sentence at `docs/workbench/feature-matrix.md:112` ("No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file.") with the M118 suggested W11 note, leaving the status word `planned` unchanged (EAT-R167); this executes EAT-R082's clause 'stale no-Mechanical-code assertion is removed without claiming invocation shipped' early, in the docs cut, for the one row SKILL.md:8 routes readers to.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004, EAT-R082
- Claims: C1555 (NON-EPISTEMIC)
- Relations: R00762, R01348, R01393, R01431, R01445, R01448
- Supersedes (Nov-4 ids, unchanged): C0457
- Sets / remediation: — / M118
- Rationale: M118 [row status: NON-EPISTEMIC (norm unmet at the pin; K107)] class ADD_TEMPORAL_QUALIFIER at 02:L33 -> docs/workbench/feature-matrix.md:L112 (outside the program docs). Why sufficient: The program's own norm (and Nov-4 C0457, which named the status matrix) is unmet for the one user-facing row SKILL.md:8 routes readers to; the sentence has been false since f65860e1.
- Conditions: feature-matrix.md:112 lies outside the eight program files; wb-12x1 owns the W11 row amendment (M118's repair cell is a deferral note whose suggested wording is the executable target). Partial overlap note: EAT-R082 (wb-j5y5) owes the same removal at each slice cut; this row performs it once in the docs cut and EAT-R082 keeps it true afterwards.
- Acceptance: Assert 02:L33 contains "and the W11 status-matrix row"; assert feature-matrix.md:112 no longer contains "No binding-host code or tests exist" and contains the M118 suggested note ("No binding-host code exists; `src/workbench/collective-event.ts` (read-only `collective.event.v1` boundary, 2026-10-28) and census/probe tests exist; status `planned` (wb-04s blocked); MWI beads under epic wb-1a3t."); assert the W11 status cell still reads `planned`; the literal token `deferred:` is absent from both landed files. Preserve the original pin and status of C1555 in the triage map.
- Adversarial mutant: Change the W11 status word, or leave the stale 'No binding-host code or tests exist' sentence in place; the targeted document predicates fail.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M118 [row status: NON-EPISTEMIC (norm unmet at the pin; K107)] class ADD_TEMPORAL_QUALIFIER at 02:L33 -> docs/workbench/feature-matrix.md:L112 (outside the program docs); tracker wb-12x1
  - Existing wording: Update stale user-facing current guidance in this program and the skill; [feature-matrix.md:112 left: "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file."]
  - Repair: deferred: feature-matrix.md is outside the program docs this ledger targets; wb-12x1 (docs) owns the amendment. Suggested W11 note: "No binding-host code exists; `src/workbench/collective-event.ts` (read-only `collective.event.v1` boundary, 2026-10-28) and census/probe tests exist; status `planned` (wb-04s blocked); MWI beads under epic wb-1a3t." Add "and the W11 status-matrix row" to 02:33.
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/feature-matrix.md:112" [E1145], quote: "| Hosted develop() with real scope-limited service bindings (HX->RF->Claude SDK->Forge composition; four domain outcome variants preserved) | planned |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:33" [E1620], quote: ""}
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-1a3t row" [E1286], quote: ""description":"PROGRAM: docs/workbench/programs/mechanical-workflows-interop-2026-11-04 (doc pin 7c80c34346c2; env pins pi b27829e6dfa7 / mw f7c0a9431d6c)"}

### EAT-R196 — Documentation MUST apply the M119 scoped correction for C1552 (+2)

- Statement: The documentation MUST apply the M119 scoped correction (class ADD_MISSING_PREMISE): at README:L3 replace the sentence "Re-pin before implementation." with the REMEDIATION M119 repair text (wording part); at 02:L33 and 04:L3, which do not contain that sentence at the pin, append the clause "Re-pin the bead descriptions under epic wb-1a3t as well (they still carry the Nov-4 pins; the re-pin write is wb-cbt4's)" as an insertion, not a replacement.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-cbt4)
- Refines: EAT-R004
- Claims: C1552 (NON-EPISTEMIC), C1301 (NON-EPISTEMIC), C1494 (NON-EPISTEMIC)
- Relations: R00932, R00962, R01022, R01204, R01205, R01338, R01409, R01418, R01442, R01458
- Supersedes (Nov-4 ids, unchanged): C0447, C03102
- Sets / remediation: — / M119
- Rationale: M119 [row status: NON-EPISTEMIC (K117 pin inconsistency)] class ADD_MISSING_PREMISE at README:L3; 02:L33; 04:L3. Why sufficient: A seat reading the bead will see a different MW baseline than the program states; the program orders reuse of the groups but never says the descriptions must be re-pinned.
- Conditions: Use the exact scoped replacement in REMEDIATION M119; do not upgrade the source status or turn not-run into PASS. deferred: the row's `deferred:` clause names an owner decision (wb-cbt4); the docs cut applies only the wording part.
- Acceptance: Assert the corrected README:L3; 02:L33; 04:L3 representation satisfies ADD_MISSING_PREMISE: Re-pin before implementation, including the bead descriptions under epic wb-1a3t, which still carry the Nov-4 pins (doc 7c80c343; pi b27829e6 / mw f7c0a943, one MW commit before this program's baseline). deferred: the bead-description re-pin itself is a ledger-in-repo write owned by wb-cbt4 (master-recon), not a docs repair. Preserve the original pin and status of C1552, C1301, C1494 in the triage map.  The landed program text is the repair text up to and excluding its `deferred:` clause; the `deferred:` clause is recorded in the wb-12x1 receipt and as a note on wb-cbt4, never in the program file, and the predicate asserts the literal token `deferred:` is absent from the landed file.
- Adversarial mutant: Restore the overstrong or unqualified C1552 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M119 [row status: NON-EPISTEMIC (K117 pin inconsistency)] class ADD_MISSING_PREMISE at README:L3; 02:L33; 04:L3; tracker wb-cbt4
  - Existing wording: Re-pin before implementation.
  - Repair: Re-pin before implementation, including the bead descriptions under epic wb-1a3t, which still carry the Nov-4 pins (doc 7c80c343; pi b27829e6 / mw f7c0a943, one MW commit before this program's baseline). deferred: the bead-description re-pin itself is a ledger-in-repo write owned by wb-cbt4 (master-recon), not a docs repair.
- Evidence:
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-1a3t row" [E1286], quote: ""description":"PROGRAM: docs/workbench/programs/mechanical-workflows-interop-2026-11-04 (doc pin 7c80c34346c2; env pins pi b27829e6dfa7 / mw f7c0a9431d6c)"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:3" [E1003], quote: "Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation."}

### EAT-R197 — The triage ledger MUST carry the M120 ledger-only correction for C1210 (no artifact change)

- Statement: The landed CLAIMS.jsonl row C1210 MUST carry the M120 wording in `permitted_wording` only - the `proposition` field stays the atomized artifact extraction, since rewriting a graded row's proposition is re-atomization (skill Phase 11 rule 1) and is forbidden - ('added an optional `signal?: AbortSignal` to the development rig's AgentOptions (inherited by developLive / runClaudeImplementation); the library develop() has no signal'); the program artifact sentence at 01:L38 is exact and MUST NOT be changed for this row.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1210 (ESTABLISHED)
- Relations: R00473, R00474, R00475, R00476, R00477, R00478, R00479, R00480, R00485, R00488, R00646, R00655, R01357, R01382
- Supersedes (Nov-4 ids, unchanged): C0229
- Sets / remediation: — / M120
- Rationale: M120 [row status: ESTABLISHED (ledger proposition overreaches the artifact; K113)] class NARROW_SCOPE at ledger only (claims-part-01 proposition; artifact 01:L38 is exact). Why sufficient: f7c0a943 touched only apps/development-rig; packages/development/src has zero AbortSignal references; the artifact sentence names only the commit and the option.
- Conditions: Use the exact scoped replacement in REMEDIATION M120; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the landed ledger row C1210's `permitted_wording` names the development rig's AgentOptions/LiveDevelopmentOptions as the component that gained `signal?: AbortSignal` and states that the library develop() has no signal (the merged-ledger row already carries the component qualifier; the M120 form satisfies the predicate); assert `proposition` and `status` (ESTABLISHED) are unchanged and that 01:L38 is byte-unchanged by the docs cut.
- Adversarial mutant: Rewrite 01:L38 to say 'develop/developLive options' or leave the ledger proposition unqualified; the ledger predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M120 [row status: ESTABLISHED (ledger proposition overreaches the artifact; K113)] class NARROW_SCOPE (ledger only) at ledger only (claims-part-01 proposition; artifact 01:L38 is exact); tracker none
  - Existing wording: ledger: 'added an optional `signal?: AbortSignal` to the develop/developLive options'
  - Repair: ledger only: 'added an optional `signal?: AbortSignal` to the development rig\'s AgentOptions (inherited by developLive / runClaudeImplementation); the library develop() has no signal'. No artifact change.
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/live-development.ts:34" [E1040], quote: "export interface LiveDevelopmentOptions extends AgentOptions {"}
  - {pin: "mw@97e18068f399", path: "git show --stat f7c0a943:files" [E1573], quote: "apps/development-rig/src/claude-implement.ts       | 13 +++++\n apps/development-rig/src/live-development.ts       |  5 +-"}

### EAT-R198 — Documentation MUST apply the M121 scoped correction for C1133 (+2)

- Statement: The documentation MUST apply the M121 scoped correction (class ADD_MISSING_PREMISE) where the trigger set is understated at the pin: at 01:L22 replace "after commit or branch failure" and at SKILL:L14 replace "after commit/branch preservation failure" with the REMEDIATION M121 repair text. README:L22 reads "after preservation failure" at the pin, which already names the whole trigger set: no replacement is owed there (M121's README leg is a no-op; flagged to the Phase-8 owner in REQUIREMENTS-AUDIT.md).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1133 (ESTABLISHED), C1423 (ESTABLISHED), C1477 (ESTABLISHED)
- Relations: R00155, R00156, R00157, R00158, R00159, R00160, R00161, R00162, R00163, R00164, R00165, R00171, R00177, R00643
- Supersedes (Nov-4 ids, unchanged): C0170, C0346, C0167
- Sets / remediation: — / M121
- Rationale: M121 [row status: ESTABLISHED (wording names a subset of the trigger set)] class ADD_MISSING_PREMISE at 01:L22; README:L22; SKILL:L14. Why sufficient: The single outer catch wraps every preservation step; naming only commit/branch understates when the force-remove and false-clean report occur. Not an overclaim; a completeness repair.
- Conditions: Use the exact scoped replacement in REMEDIATION M121; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 01:L22 and SKILL:L14 representations satisfy ADD_MISSING_PREMISE: after any failed preservation step (`git status --porcelain`, `add -A`, `commit`, `rev-parse HEAD` or branch creation all reach the same catch); assert README:L22 still reads "after preservation failure" (unchanged). Preserve the original pin and status of C1133, C1423, C1477 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1133 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M121 [row status: ESTABLISHED (wording names a subset of the trigger set)] class ADD_MISSING_PREMISE at 01:L22; README:L22; SKILL:L14; tracker wb-12x1
  - Existing wording: after commit or branch failure / after preservation (commit/branch) failure
  - Repair: after any failed preservation step (`git status --porcelain`, `add -A`, `commit`, `rev-parse HEAD` or branch creation all reach the same catch)
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/worktree.ts:135-137" [E1391], quote: "try {\n    // Check for uncommitted changes in the worktree\n    const status = await git(pi, worktree.path, ["status", "--porcelain"], 10000);"}
  - {pin: "pi@d7666a76f561", path: "src/worktree.ts:177-181" [E1032], quote: "} catch {\n    // Best effort cleanup on error\n    try { await removeWorktree(pi, cwd, worktree.path); } catch { /* ignore */ }\n    return { hasChanges: false };\n  }"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:22", quote: "Pi dirty-worktree cleanup may discard changes after preservation failure;"}
  - {pin: "pi@d7666a76f561", path: ".agents/skills/pi-mechanical-interop/SKILL.md:14", quote: "Pi `cleanupWorktree` may force-remove changed work after commit/branch preservation failure and return false-clean: P0 for any writer."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:22", quote: "This can discard recoverable changes after commit or branch failure."}

### EAT-R199 — Documentation MUST apply the M122 scoped correction for C1339

- Statement: The documentation MUST apply the M122 scoped correction at 04:L35: replace the wording "Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`." with the REMEDIATION M122 repair text (class ADD_TEMPORAL_QUALIFIER).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1
- Refines: EAT-R004
- Claims: C1339 (SUPPORTED)
- Relations: R00963, R01319, R01352, R01411
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: — / M122
- Rationale: M122 [row status: SUPPORTED (present-progressive regularity, time-indexed)] class ADD_TEMPORAL_QUALIFIER at 04:L35. Why sufficient: Liveness after the pin is unobservable from a pin; the dated form keeps the cadence evidence and the norm it motivates (refresh both branches) without decaying into a false present tense.
- Conditions: Use the exact scoped replacement in REMEDIATION M122; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 04:L35 representation satisfies ADD_TEMPORAL_QUALIFIER: As of 2026-11-06/07 agents were landing on `workbench/implementation-program` with periodic merges to `master` (four merges on 2026-11-06/07; the branch ref was level with master at d7666a76). Preserve the original pin and status of C1339 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1339 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M122 [row status: SUPPORTED (present-progressive regularity, time-indexed)] class ADD_TEMPORAL_QUALIFIER at 04:L35; tracker wb-12x1
  - Existing wording: Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`.
  - Repair: As of 2026-11-06/07 agents were landing on `workbench/implementation-program` with periodic merges to `master` (four merges on 2026-11-06/07; the branch ref was level with master at d7666a76).
- Evidence:
  - {pin: "pi@d7666a76f561", path: "git log --format=%s -1 278c8f79:1" [E1602], quote: "Merge workbench/implementation-program (landings through 1014, trunk fd90f9d3a9c7) into master"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:35" [E1342], quote: "Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`. Before implementing, refresh both branches, check unlanded work, avoid overlapping mutable test headers, and ensure the **merged candidat..."}

### EAT-R200 — Documentation MUST apply the M123 scoped correction for C1628 (+1)

- Statement: The documentation MUST apply the M123 scoped correction at 03:L51; SKILL:L16: replace the wording "so unsupported at its pin; first Git-census remains usable / **Git census is still a valid limited first vertical**" with the REMEDIATION M123 repair text (class DOWNGRADE_MODALITY).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-12x1 | Disposition: amend:wb-12x1 (also: wb-p3i2)
- Refines: EAT-R004
- Claims: C1628 (SUPPORTED, overclaims), C1488 (NON-EPISTEMIC)
- Relations: R00917, R00918, R00919, R00920, R00921, R01195, R01196, R01197, R01198, R01351, R01366, R01407, R01428
- Supersedes (Nov-4 ids, unchanged): C03113, C0443, C0245, C0355
- Sets / remediation: — / M123
- Rationale: M123 [row status: SUPPORTED / overclaims (roll-up flip; F07) + NON-EPISTEMIC proposal] class DOWNGRADE_MODALITY at 03:L51; SKILL:L16. Why sufficient: The probe establishes only "not blocked"; the positive "usable/valid" half rests on an unwitnessed premise (no Pi-hosted run exists; the program is L0). The Nov-4 ledger flagged the same proposition (C0443) as overclaiming.
- Conditions: Use the exact scoped replacement in REMEDIATION M123; do not upgrade the source status or turn not-run into PASS.
- Acceptance: Assert the corrected 03:L51; SKILL:L16 representation satisfies DOWNGRADE_MODALITY: so unsupported at its pin; the first Git-census profile remains not blocked (its usability from a Pi-hosted launch is unwitnessed until `PI-GIT-CENSUS-LIVE`) / **Git census is still the planned, not-blocked first vertical** Preserve the original pin and status of C1628, C1488 in the triage map.
- Adversarial mutant: Restore the overstrong or unqualified C1628 wording, or remove its required qualifier/source/pin; the targeted document predicate fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Remediation: M123 [row status: SUPPORTED / overclaims (roll-up flip; F07) + NON-EPISTEMIC proposal] class DOWNGRADE_MODALITY at 03:L51; SKILL:L16; tracker wb-p3i2
  - Existing wording: so unsupported at its pin; first Git-census remains usable / **Git census is still a valid limited first vertical**
  - Repair: so unsupported at its pin; the first Git-census profile remains not blocked (its usability from a Pi-hosted launch is unwitnessed until `PI-GIT-CENSUS-LIVE`) / **Git census is still the planned, not-blocked first vertical**
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/receipts/wb-f3wd.md:12" [E1130], quote: "Verdict: task-scope-unsupported. No leg is task-scope proof. ... The blocker is recorded on gate HX-TASK-SCOPE-PROBE and scoped to native-task-scope only. Git-census mode is named not blocked (claim C03113)."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:38" [E1285], quote: "**Status for this new program:** design documentation only; no code test, npm pack, Forge run or external producer call has been executed for it."}

## contract-choice — wb-w8fk (slice PI-0; owner Pi)

### EAT-R148 — Pi MUST consume the separated selector triple hostMode / evidenceProfile / contextProfile as three request-side fields

- Statement: Pi's function admission MUST read `hostMode` only as the existing `embedded|detached` transport selector and MUST read the host-owned `evidenceProfile` (`git-census-v1|hx-task-scope-v1`) and `contextProfile` (`plain-v1|rf-committed-v1`) as two further closed-enumeration request fields, validating each independently; a value outside its enumeration, a missing profile field, or a profile value carried in the `hostMode` slot MUST refuse before any import or provider call.
- Authority: NORMATIVE_DECISION | Type: NORMATIVE_DESIGN | Owner: Pi | Slice: PI-0 | Bead: wb-w8fk | Disposition: amend:wb-w8fk
- Refines: EAT-R005, EAT-R053
- Claims: C1572 (ESTABLISHED), C1573 (NON-EPISTEMIC), C1574 (NON-EPISTEMIC), C1575 (NON-EPISTEMIC), C1546 (NON-EPISTEMIC), C1547 (NON-EPISTEMIC), C1545 (ESTABLISHED), C1311 (NON-EPISTEMIC), C1499 (NON-EPISTEMIC)
- Relations: R00745, R00746, R00747, R00748, R00749, R00750, R00751, R00791, R00792, R00793, R00794, R00795, R00796, R00797
- Supersedes (Nov-4 ids, unchanged): C0502, C0522, C0507, C0555, C0557, C0508, C0501, C0320
- Sets / remediation: K104, K105 / M117
- Rationale: EAT-R005 was compiled when the choice was Pi `profile` vs MW `mode` (KU10, CONTESTED). The Nov-6 program proposes a different resolution: keep `hostMode` (ESTABLISHED as the embedded|detached selector) and add two host-owned profile selectors (PROPOSAL, NON-EPISTEMIC). Neither token occurs in code at either pin; the only other document carrying them is the same-author MW companion at mw-tip. Force comes from the adoption decision wb-w8fk must record, not from evidence that the triple is correct.
- Conditions: Proposal until the joint ruling: both repositories must adopt the triple (EAT-R151) before any cut claims the choice; the companion contract that spells the same triple exists only at mw-tip 6e15a4245d3f (K105) and is the same authorial lineage.
- Acceptance: Given a host-binding fixture carrying hostMode=embedded, evidenceProfile=git-census-v1, contextProfile=plain-v1, admission passes the selector stage; mutating any one field to an out-of-enumeration value, omitting evidenceProfile or contextProfile, or placing `git-census-v1` in hostMode each yields a typed refusal naming the field, with zero loader and zero provider calls; `hx-task-scope-v1` and `rf-committed-v1` pass the selector stage and are refused later by EAT-R062 (native profile blocked with the named producer blocker) while MW-NATIVE / HX-TASK-SCOPE-PROBE are unmet; EAT-R060 governs preview substitution, not the profile gate.
- Adversarial mutant: Accept the triple but derive contextProfile from evidenceProfile (or default a missing profile to the git-census value); the missing-field refusal fails.
- Verification: program level L1; tiers L1, L2, L4; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:19", quote: "Pi's existing `hostMode` means `embedded|detached` transport. The proposed **host-owned** `evidenceProfile` is `git-census-v1|hx-task-scope-v1`. A separate **host-owned** `contextProfile` is `plain-v1|rf-committed-v1`."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:27", quote: "Neither is a deployed ABI. This program proposes distinct host-owned `evidenceProfile`, `contextProfile` and existing Pi `hostMode`; joint adoption and tests are mandatory before claiming that choice."}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md:20-21", quote: "evidenceProfile: "git-census-v1" | "hx-task-scope-v1";\n  contextProfile: "plain-v1" | "rf-committed-v1";"}

### EAT-R149 — Pi MUST never read MW's result-side `mode` as a selector and the ruling MUST record its MW-stated disposition

- Statement: The request-side alias refusal (generic `profile` or `mode` keys, alone or beside the triple) is EAT-R005's acceptance restated under the triple and is not re-owed here. This row owes the executable request/result split: (i) Pi's projection MUST never read MechanicalWorkflows' shipped result-side `LiveDevelopmentResult.mode` literal as a selector, and (ii) the wb-w8fk ABI ruling MUST record the MW owner's stated disposition of that field (keep-as-result-literal, rename or remove - an MW-owned decision Pi records, never makes; marked pending on wb-1zn2 until stated) so that the alias ban and the shipped field are not read as a contradiction.
- Authority: NORMATIVE_DECISION | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-0 | Bead: wb-w8fk | Disposition: amend:wb-w8fk (also: wb-1zn2)
- Refines: EAT-R005
- Claims: C1576 (NON-EPISTEMIC), C1545 (ESTABLISHED), C1544 (ESTABLISHED), C1458 (NON-EPISTEMIC), C1498 (NON-EPISTEMIC)
- Relations: R00744, R00745, R00746, R00750, R00804, R00805, R01141, R01142, R01143, R01144, R01210, R01285, R01303, R01329
- Supersedes (Nov-4 ids, unchanged): C0522, C0501, C0326, C0584, C0514
- Sets / remediation: K104 / M117
- Rationale: Doc 03:19 bans generic aliases without both-repository approval while hosting.md:17 in the same commit says 'host modes' and MW ships `mode: "live-claude-forge"` as a result-side literal (ESTABLISHED at 97e18068, identical at the Nov-4 baseline). K104 reconciles by semantic split (request-side selector vs prose/result literal); the split must be made executable or the ban is unenforceable.
- Conditions: The MW result-side field is MW-owned; Pi can only refuse to interpret it. The hosting.md:17 wording repair is EAT-R194 (M117). Partial-duplicate note: the alias-refusal clause of the original row duplicated EAT-R005 ('reject the other spelling and requests containing both') and was narrowed at the step-9 audit.
- Acceptance: Given a host-binding fixture, the EAT-R005 alias refusals hold (positive control, owned by EAT-R005); the Pi projection test feeds a result carrying `mode: "live-claude-forge"` and asserts no selector, admission or profile value is derived from it; the ruling text recorded on wb-w8fk names `LiveDevelopmentResult.mode` and either records the MW owner's disposition (keep/rename/remove, with date and sha) or marks it pending on wb-1zn2; a ruling that decides the MW field's fate without an MW-owner entry refuses.
- Adversarial mutant: Read `LiveDevelopmentResult.mode` as the `hostMode` selector in the projection; the never-read-as-selector assertion fails.
- Verification: program level L1; tiers L1, L2; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:19", quote: "Do not ship generic “profile” or “mode” aliases without both-repository ABI approval."}
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/live-development.ts:19-22", quote: "export interface LiveDevelopmentResult {\n  readonly mode: "live-claude-forge";\n  readonly discovery: "git-tracked-files";\n  readonly context: "plain-task-context" | "reactive-fiber";"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/mechanical-function-hosting.md:17", quote: "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical."}

### EAT-R150 — Pi MUST validate the `mechanical.pi-host/v1` host-binding envelope as a contract distinct from the descriptor and the tool reply

- Statement: Pi MUST validate the host-binding envelope as a typed object whose `contract` literal is exactly `mechanical.pi-host/v1`, whose `descriptorId` is exactly `mechanical.development.develop.v1`, and whose shape is closed (artifact{digest,package,export}, evidenceProfile, contextProfile, source{workspaceRealpath,baseCommit,baseTree,forgeManifestSha256}, invocationId); a different contract literal, an unknown field, or a field borrowed from `workbench.tool-reply/v1` or from the descriptor schema `mechanical-workflows/entrypoint/v1` MUST refuse before import.
- Authority: NORMATIVE_DECISION | Type: NORMATIVE_DESIGN | Owner: Pi | Slice: PI-0 | Bead: wb-w8fk | Disposition: amend:wb-w8fk
- Refines: EAT-R006, EAT-R007
- Claims: C1581 (NON-EPISTEMIC), C1580 (ESTABLISHED), C1582 (ESTABLISHED), C1311 (NON-EPISTEMIC), C1564 (NON-EPISTEMIC), C1565 (NON-EPISTEMIC)
- Relations: R00773, R00774, R00775, R00776, R00777, R00779, R00810, R00811, R00812, R00944, R01302, R01336, R01360, R01363
- Supersedes (Nov-4 ids, unchanged): C0520, C0521, C0522, C0502, C0503, C0504, C0524
- Sets / remediation: K105 / —
- Rationale: EAT-R006 rejects unsupported contract versions generically. The Nov-6 program names the envelope token and separates it from two contracts that are ESTABLISHED at the pins (the Mechanical descriptor id/schema and Pi's `workbench.tool-reply/v1`). The field list is the companion's `DevelopmentHostBindingV1` (mw-tip only). The token occurs in no code, test or third-party artifact at either pin; this is adoption, not observation.
- Conditions: Field list taken from the companion at mw-tip 6e15a4245d3f (absent at the stated MW baseline 97e18068; same lineage); adoption gate EAT-R151. Version and unknown-field refusals are EAT-R006's acceptance (not re-owed); this row owes the exact literals, the closed field list and the cross-contract borrowing negative.
- Acceptance: Given the adopted v1 envelope fixture, validation passes and resolves descriptorId to the committed descriptor; mutating `contract` to `mechanical.pi-host/v2` or to `workbench.tool-reply/v1`, adding an unknown key, moving `artifact.digest` into `source`, or supplying the descriptor's `schema` field in the envelope each yields a typed refusal with zero imports and zero provider calls.
- Adversarial mutant: Accept the descriptor's `schema` field (or a `workbench.tool-reply/v1` field) inside the envelope because it is a known field of another contract; the cross-contract borrowing refusal fails. (Ignoring unknown keys is EAT-R006's mutant and is not re-owed.)
- Verification: program level L1; tiers L1, L2; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:21", quote: "Mechanical descriptor remains `mechanical.development.develop.v1` / `mechanical-workflows/entrypoint/v1`; an optional host envelope is proposed as `mechanical.pi-host/v1`, separate from Pi's existing `workbench.tool-reply/v1`."}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md:16-19", quote: "interface DevelopmentHostBindingV1 {\n  contract: "mechanical.pi-host/v1";\n  descriptorId: "mechanical.development.develop.v1";\n  artifact: { digest: `sha256:${string}`; package: "@mechanical/workflows-development"; export: "develop" };"}

### EAT-R151 — The ABI adoption gate MUST be a cross-repository conformance test plus recorded acceptance by both owners

- Statement: The selector triple, the `mechanical.pi-host/v1` envelope and the Mechanical action-grant literal MUST be claimed adopted only when (i) a Pi consumer conformance test runs against a MechanicalWorkflows packed artifact that declares the same literals and (ii) acceptance by both repository owners is recorded on wb-w8fk and the MW tracker; same-author program documents in either repository MUST NOT count as adoption.
- Authority: NORMATIVE_DECISION | Type: VERIFICATION | Owner: Pi | Slice: PI-0 | Bead: wb-w8fk | Disposition: amend:wb-w8fk (also: wb-1zn2)
- Refines: EAT-R005, EAT-R088
- Claims: C1562 (NON-EPISTEMIC), C1547 (NON-EPISTEMIC), C1588 (NON-EPISTEMIC), C1406 (ESTABLISHED, overclaims), C1311 (NON-EPISTEMIC)
- Relations: R00751, R00822, R00944, R01039, R01040, R01302, R01305, R01306, R01332, R01336, R01342, R01359, R01360, R01364
- Supersedes (Nov-4 ids, unchanged): C0538, C0405, C0522
- Sets / remediation: K105 / M110, M109
- Rationale: The Pi program, hosting guide, SKILL and the MW companion are one authorial lineage (paired commits d7666a76 / 2ea69445, same author); the companion is absent at the program's stated MW baseline. 'Alignment' with it is a joint gate, not corroboration (M110). The grant literal exists in neither repository (C1588: unexecutable until wb-w8fk supplies it).
- Conditions: MW-CONTRACT (MW-R1 joint ABI ruling) is external; the MW owner's acceptance is not a Pi act. The README/03 pinned-link repairs are EAT-R186/EAT-R187.
- Acceptance: Given the Pi consumer test suite and an MW packed tarball, the conformance test loads the tarball's declared contract/selector/grant literals and asserts byte-equality with Pi's constants; the wb-w8fk receipt carries both owners' acceptance entries with dates and shas; a receipt citing only the two program documents, or a tarball whose literals differ, refuses closure.
- Adversarial mutant: Replace the packed-artifact literal read with Pi's own constants (self-comparison); the conformance test must fail to detect a divergent producer literal in a mutated tarball.
- Verification: program level L2; tiers L2, L4; gate MW-INSTALLED-CONSUMER; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:3", quote: "**Not shipped.** Align this protocol with [Mechanical's companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md)"}
  - {pin: "mw@97e18068f399", path: "git ls-tree --name-only 97e18068 docs/programs/:1-8", quote: "adaptive-policy-organizations-2026-10-18 cac-workflow-composition-2026-10-18 collective-adaptation-2026-10-16 ... pi-workbench-interop-2026-11-04 rfcli-feedback-adoption-2026-11-04 trainingworks-2026-10-18"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:26", quote: "exact Mechanical read/write action grant (literal spelling jointly approved)"}

## descriptor — wb-ocie (slice PI-0; owner Pi)

### EAT-R152 — Pi MUST keep the saved-definition digest and the Mechanical tarball digest as two independently validated pins

- Statement: Pi MUST validate the `DefinitionRef` source digest (the saved Pi definition) and the Mechanical artifact digest (`artifact.digest`, the exact npm tarball bytes) as two independent pins; supplying one in the other's slot, deriving one from the other, or passing a request where only one digest matches MUST refuse before import.
- Authority: NORMATIVE_DECISION | Type: BEHAVIORAL | Owner: Pi | Slice: PI-0 | Bead: wb-ocie | Disposition: amend:wb-ocie
- Refines: EAT-R008
- Claims: C1577 (ESTABLISHED), C1578 (ESTABLISHED), C1579 (SUPPORTED), C14100 (NON-EPISTEMIC)
- Relations: R00806, R00807, R00808, R00809, R01214, R01360, R01363, R01389, R01417
- Supersedes (Nov-4 ids, unchanged): C0141, C0520
- Rationale: Both digests exist at the pins (ESTABLISHED: Pi's DefinitionRef source digest; MW's tarball SHA-256), and their independence is SUPPORTED by inference (different inputs, different producers). EAT-R008 covers artifact bytes against their pin; the non-conflation negative is new.
- Conditions: The `artifact.digest` field name belongs to the EAT-R150 envelope (wb-w8fk); until that ruling the test uses Pi's internal binding type. The unlanded wb-ocie branch adds src/workbench/mechanical-descriptor.ts (not inspected, K110).
- Acceptance: Given a request whose definition digest matches the saved definition and whose artifact digest matches the packed tarball, admission passes both checks and records both digests separately; swapping the two values, copying the definition digest into `artifact.digest`, or matching the definition while the tarball byte differs each refuses with a typed error naming the slot, and zero imports occur.
- Adversarial mutant: Validate `artifact.digest` by comparing it with the definition digest instead of hashing the tarball bytes; the swapped-value refusal fails.
- Verification: program level L1; tiers L1, L2; gate MW-INSTALLED-CONSUMER; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:21", quote: "Pi `DefinitionRef` source digest and Mechanical **tarball digest** are independent: the first pins the saved definition, the second pins exact npm artifact bytes."}
  - {pin: "pi@d7666a76f561", path: ".agents/skills/pi-mechanical-interop/SKILL.md:23", quote: "Do not confuse saved-definition digest with tarball SHA."}

### EAT-R153 — Program source and descriptor walkers MUST lstat, realpath and refuse symlinked or directory entries

- Statement: Every file walker the program adds to Pi for descriptor/artifact resolution or source-basis capture MUST `lstat` each entry, resolve the realpath of its root, and refuse symlinked entries and directory-typed entries where a file is expected, so that a symlinked `node_modules` or any package tree inside the fixture is never entered; the refusal MUST be typed, not an EISDIR crash.
- Authority: RISK_CONTROL | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-0 | Bead: wb-ocie | Disposition: amend:wb-ocie (also: wb-s8rm)
- Refines: EAT-R011
- Claims: C1521 (ESTABLISHED), C1522 (ESTABLISHED), C1523 (NON-EPISTEMIC), C1384 (NON-EPISTEMIC), C14116 (NON-EPISTEMIC)
- Relations: R00698, R01258, R01259
- Supersedes (Nov-4 ids, unchanged): C0385, C0386
- Rationale: The 2026-11-04 feedback report is ESTABLISHED as a source report (a symlinked node_modules escaped a directory-only ignore; 2 of 9 enumerators could attempt it; one EISDIR). EAT-R011 covers artifact-link escapes at resolution; the walker hygiene rule covers enumeration over the fixture tree. The hazard in the program's new walkers is prospective (none exist at the pin); the guard is justified by the measured regression class.
- Conditions: The Git-census `discover` walker is MW-owned (MW-R2, EAT-R175); this requirement binds Pi-side walkers only.
- Acceptance: Given a fixture tree containing a symlink `node_modules -> /tmp/elsewhere` and a symlinked file, when the descriptor walker and the source-basis walker enumerate it, then neither follows either link, each records a typed `symlink-refused` entry, no EISDIR or ENOENT escapes, and the realpath of the root is compared before enumeration; a directory where a file is expected is refused the same way.
- Adversarial mutant: Use `stat`/`readdir` without `lstat` (or ignore by name only); the symlinked node_modules is entered and the test fails.
- Verification: program level L1; tiers L1; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:14", quote: "2026-11-04: symlinked `node_modules` escaped directory-only ignore and 2/9 enumerators could attempt it; one EISDIR | `lstat`, realpath, symlink and directory rejection in source/descriptor walkers; no accidental package-tree crawl"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:36", quote: "canonical source walkers refusing symlinked dependency trees"}

## authority — wb-201v (slice PI-1; owner Pi)

### EAT-R154 — Function admission and identity MUST NOT read free-form Beads export note wording

- Statement: No Pi function admission, identity or replay-basis computation MAY read free-form note text from a Beads export; only typed evidence fields and snapshot pins MAY be consumed, and a fixture whose only distinguishing input is a note token MUST produce identical admission results.
- Authority: RISK_CONTROL | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-1 | Bead: wb-201v | Disposition: amend:wb-201v (also: wb-s8rm)
- Refines: EAT-R027, EAT-R029
- Claims: C1511 (ESTABLISHED), C1512 (ESTABLISHED), C1513 (NON-EPISTEMIC)
- Relations: R00691
- Supersedes (Nov-4 ids, unchanged): none
- Rationale: A 2026-11-05 report (ESTABLISHED as a source report) recorded 175 of 585 tests reading the Beads export and one census parsing machine seat note tokens. The program's response is a norm; the admission path does not exist at the pin, so the guard is prospective and justified by the measured entanglement class, not by an observed admission defect.
- Conditions: Scope: function admission/identity only; existing census tests that read the export are out of scope.
- Acceptance: Given two admission fixtures identical except for Beads note text (one carrying a seat token that a census would parse), admission, principal/grant evaluation and the replay basis yield byte-identical results; a static census of `src/workbench/hosts/` and the admission modules finds no reader of `.beads/issues.jsonl` notes or of `bd` note output.
- Adversarial mutant: Read a `notes` field to decide write authority; the two-fixture equality assertion fails.
- Verification: program level L1; tiers L1, L9; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:11", quote: "2026-11-05: 175 of 585 tests read Beads export at source pin; one census parses machine seat note tokens | Function admission/identity never depends on free-form exported note wording; stable typed evidence and snapshot pins only"}

## dispatch — wb-4bxo (slice PI-1; owner Pi)

### EAT-R155 — Enabling the function branch MUST leave furnace-formula definitions refused and outside the Mechanical adapter

- Statement: The cut that adds the `function` branch to the registered `workflow_execute` MUST leave a `furnace-formula` definition refused with a typed `unsupported-definition-kind` (or its own typed refusal) before any launch, and MUST NOT route it through the Mechanical adapter or any module import.
- Authority: NORMATIVE_DECISION | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-1 | Bead: wb-4bxo | Disposition: amend:wb-4bxo
- Refines: EAT-R032, EAT-R033
- Claims: C1116 (ESTABLISHED), C1141 (ESTABLISHED), C1586 (NON-EPISTEMIC), C1585 (NON-EPISTEMIC)
- Relations: R00048, R00049, R00050, R00051, R00052, R00053, R00054, R00195, R00196, R00197, R00198, R00199, R00200, R00203
- Supersedes (Nov-4 ids, unchanged): C0162, C0432, C0179, C0309, C03105
- Rationale: At the pin execute-tool.ts:217-218 refuses every non-script kind in one branch (ESTABLISHED); EAT-R032 opens that branch for `function` and EAT-R033 protects `script`; nothing protects `furnace-formula`, which doc 03:25 orders kept separate.
- Conditions: Depends on the function branch landing (wb-4bxo blocked on MW-HOST); the test can land red-first against the current refusal as a characterization control.
- Acceptance: Given the registered tool with Mechanical hosting enabled, a `furnace-formula` definition request is refused before admission completes, no adapter module is loaded and no child or provider call is made, while the same request shape with kind `function` and a valid binding proceeds to the function branch.
- Adversarial mutant: Change the refusal predicate to `kind === 'script' || kind !== 'function'` inverted so that furnace-formula falls into the function branch; the refusal assertion fails.
- Verification: program level L1; tiers L1, L4; gate PI-FUNCTION-REGISTERED; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workbench/execute-tool.ts:217-218", quote: "} else if (admission.definition.kind !== "script") {\n        refuse("unsupported-definition-kind", "only script definitions launch in this host");"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:25", quote: "Preserve current script semantics; leave furnace-formula separate."}

## outcomes — wb-9a1o (slice PI-3; owner Pi)

### EAT-R156 — Pi MUST project the function result on seven independent typed axes

- Statement: Pi's function host event MUST expose the result on seven separate typed axes: launch {accepted, launched, refused}; execution {queued, running, settled, failed, unknown}; domain {verified_candidate, verification_failed, needs_evidence, indeterminate, absent}; gate {native Forge verdict with operation ID, candidate commit/tree and selection completeness, or absent}; effects {not-started, started, settled, uncertain}; freshness {current, stale, unknown} with original native refs retained; furnace {Furnace's own Run/Work/Attempt statuses, or absent}. No axis value MAY be computed from another axis.
- Authority: NORMATIVE_DECISION | Type: REPRESENTATION | Owner: Pi | Slice: PI-3 | Bead: wb-9a1o | Disposition: amend:wb-9a1o (also: wb-upad)
- Refines: EAT-R036, EAT-R037, EAT-R052
- Claims: C1605 (NON-EPISTEMIC), C1606 (NON-EPISTEMIC), C1608 (NON-EPISTEMIC), C1609 (NON-EPISTEMIC), C1610 (NON-EPISTEMIC), C1611 (NON-EPISTEMIC), C1612 (NON-EPISTEMIC), C1607 (ESTABLISHED), C1184 (NON-EPISTEMIC), C14109 (NON-EPISTEMIC)
- Relations: R00373, R00374, R00375, R00376, R00377, R00378, R00861, R00862, R00863, R00864, R00865, R00866, R00867, R00868
- Supersedes (Nov-4 ids, unchanged): C0562, C0237, C03112, C0553, C0563, C0325, C0418, C0589, C0590, C0238, C03111, C0369, C0417, C0449, C0573
- Sets / remediation: K106 / —
- Rationale: EAT-R036/R037/R052 cover the domain arms, the termination/domain split and freshness. The Nov-6 contract adds a closed seven-axis schema (PROPOSAL rows; only the four Mechanical arms are ESTABLISHED at the pins). The schema is adopted by decision; the companion's `executionStatus`/`effectDisposition` naming is the same lineage and exists only at mw-tip.
- Conditions: Axis value sets are proposals adopted by this decision; the execution set differs from the Nov-4 proposal without a note (K106) and the placement of a cancelled execution is EAT-R157. The freshness axis restates EAT-R052 (wb-upad, observe) inside the schema; wb-upad is cross-referenced, not re-owed.
- Acceptance: Given a host-event fixture with execution=settled, domain=verification_failed, gate=FAIL(opId, commit, tree, selection=complete), effects=settled, freshness=current, furnace=absent, the serializer round-trips all seven values intact; mutating any single axis value leaves the other six unchanged; a crashed invocation serializes execution=failed and domain=absent (never an invented arm); an unknown value on any axis is rejected by the schema.
- Adversarial mutant: Derive effects=settled from execution=settled (or domain from the resolved Promise); the single-axis independence assertion fails.
- Verification: program level L1; tiers L1, L4; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:35-37", quote: "- **Launch:** accepted, launched, refused.\n- **Execution:** queued, running, settled, failed, unknown.\n- **Domain outcome:** exactly Mechanical's `verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate`, or no domain"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:43", quote: "A fulfilled Promise bearing `verification_failed` is not a verified task. A successful transport or an exit 0 is not a Forge PASS."}

### EAT-R157 — A cancelled execution MUST be represented on an owner-named axis with its cancel kind

- Statement: The host event MUST represent a cancelled invocation with a typed cancel-kind marker distinguishing per-agent skip, whole-workflow cancel and externally owned Furnace stop, on the axis the owner names (a restored `cancelled` execution value, or the effects/freshness axes, per M111); until that decision is recorded on wb-9a1o the projection MUST NOT emit a cancelled invocation as `settled` or `failed` without the marker.
- Authority: NORMATIVE_DECISION | Type: NORMATIVE_DESIGN | Owner: Pi | Slice: PI-3 | Bead: wb-9a1o | Disposition: amend:wb-9a1o (also: wb-5a7k)
- Refines: EAT-R037, EAT-R045, EAT-R047
- Claims: C1606 (NON-EPISTEMIC), C1619 (NON-EPISTEMIC), C1620 (NON-EPISTEMIC), C1621 (NON-EPISTEMIC)
- Relations: R00861, R00862, R00891, R00892, R00893, R00894, R00895, R00896, R01421, R01443, R01447
- Supersedes (Nov-4 ids, unchanged): C0562, C0577, C0578, C0575, C0454, C0576
- Sets / remediation: K106 / M111
- Rationale: The Nov-6 execution axis drops `cancelled` (Nov-4 C0562 had {running, completed, failed, cancelled, unknown}) with no note while 03:47 still distinguishes three cancel kinds (supersedes_faithful=false on C1606). Where a cancelled execution lands is an owner decision; the requirement keeps the distinction representable until it is made.
- Conditions: deferred: the owner states the axis that carries a cancelled execution (M111); the docs note naming the Nov-4 set is EAT-R188. Cancel semantics (EAT-R045-R047) are wb-5a7k's (controls); this row owns only the representation of a cancelled invocation on the host event and cross-references wb-5a7k.
- Acceptance: Given three fixtures (per-agent skip before dispatch; whole-workflow cancel after dispatch with a late SDK success; external Furnace stop), the serialized event carries a distinct cancel-kind marker for each on the owner-named axis and the execution value the ruling assigns; a cancelled fixture serialized as execution=settled with no marker fails; the late SDK success keeps effects=uncertain (EAT-R047).
- Adversarial mutant: Map all three cancel kinds to execution=failed with no marker; the three-way distinction assertion fails.
- Verification: program level L1; tiers L1, L4; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:36", quote: "- **Execution:** queued, running, settled, failed, unknown."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:47", quote: "Distinguish per-agent skip, whole workflow cancel and externally owned Furnace stop. After dispatch, abort is a **request**, never rollback"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/CLAIMS.jsonl:C0562", quote: "executionStatus in {running, completed, failed, cancelled, unknown}, domainOutcome in {verified_candidate, verification_failed, needs_evidence, indeterminate} or absent"}

### EAT-R158 — The Forge gate-envelope fields the gate axis reads MUST be pinned before selection completeness is consumed

- Statement: Before the gate axis consumes a selection-completeness field, the wb-9a1o receipt MUST pin the Forge gate-envelope fields Pi reads (operation ID, verdict, candidate commit/tree, selection accounting) to a named Forge contract or source revision with a verbatim schema excerpt, and the projection MUST treat a missing or unrecognized selection field as `unknown`, never as complete.
- Authority: EVIDENCE_ACQUISITION | Type: VERIFICATION | Owner: Pi | Slice: PI-3 | Bead: wb-9a1o | Disposition: amend:wb-9a1o
- Refines: EAT-R038, EAT-R081
- Claims: C1609 (NON-EPISTEMIC), C1365 (NON-EPISTEMIC), C1614 (NON-EPISTEMIC)
- Relations: R00869, R00870, R00877, R00878, R01000, R01001, R01002, R01420
- Supersedes (Nov-4 ids, unchanged): C0553, C0563, C0417, C0565
- Rationale: EAT-R038 already refuses a PASS projection when selection completeness is mutated, but the field it reads is unpinned: C1609 names 'a Forge contract pin for selection-completeness fields' as the missing artifact and Forge is not pinned in this triage. The requirement acquires the pin and fixes the fail-safe reading in its absence.
- Conditions: Forge is not pinned by this triage; the pin is acquired by the cut, not asserted here.
- Acceptance: The receipt names the Forge version/commit and the envelope field names with a verbatim schema excerpt; a fixture lacking the selection field projects gate.selection=unknown and no verified PASS; a fixture carrying the pinned field name with a complete value projects PASS only with matching commit/tree and operation ID (EAT-R038 controls retained).
- Adversarial mutant: Default a missing selection field to complete; the unknown projection assertion fails.
- Verification: program level L3; tiers L1, L3; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:38", quote: "- **Gate:** independently witnessed native Forge result with operation ID, candidate commit/tree and selection completeness."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:18", quote: "| Forge | True operation ID + matching commit/tree and required selection; transport exit 0, partial gate, native FAIL and unknown are independent |"}

## git-census — wb-p3i2 (slice PI-3; owner Pi)

### EAT-R159 — The first live cut MUST record which README:22 defects gate it, per an owner ruling or the reused BEAD-PLAN graph

- Statement: Before PI-GIT-CENSUS-LIVE is attempted, wb-p3i2 MUST carry either an owner ruling naming which of the four README:22 defects gate the first live cut, or an explicit statement that it follows the reused BEAD-PLAN graph (B-preserve, B-dispatch, B-outcomes, B-effects landed before; the cancel experiment dispositioned; detached-grants and replay not blockers), and the cut receipt MUST state which reading it followed with the landed shas of its blockers.
- Authority: NORMATIVE_DECISION | Type: NORMATIVE_DESIGN | Owner: Pi | Slice: PI-3 | Bead: wb-p3i2 | Disposition: amend:wb-p3i2
- Refines: EAT-R053, EAT-R054, EAT-R056
- Claims: C1427 (NON-EPISTEMIC), C1304 (NON-EPISTEMIC), C1316 (NON-EPISTEMIC), C1552 (NON-EPISTEMIC), C1340 (NON-EPISTEMIC)
- Relations: R00933, R00949, R00950, R00952, R00963, R01032, R01073, R01074, R01075, R01076, R01077, R01078, R01280, R01281
- Supersedes (Nov-4 ids, unchanged): C0172, C0173, C0316, C0378
- Sets / remediation: K101 / M112
- Rationale: K101 is CONTESTED between two norms of one lineage: README:22 reads as four blockers of any effectful run; the BEAD-PLAN the program orders reused makes B-git-census depend on four other groups and states detached repair is not a false blocker. The conflict is preserved and made visible in the receipt rather than decided here.
- Conditions: deferred: an owner ruling on wb-p3i2 may replace the default reading (M112); the README:22 wording repair is EAT-R189. At the pin wb-p3i2's `blocks` dependencies are exactly wb-5ik5, wb-mwsy, wb-4bxo, wb-9a1o (= BEAD-PLAN row 19), so 'the reused BEAD-PLAN graph' default is the bead graph itself; wb-wupg and wb-413a are not among its blockers.
- Acceptance: The wb-p3i2 receipt validator asserts a `blockers` entry listing the gating beads with landed shas and a `ruling` entry (owner ruling id, or 'BEAD-PLAN row 19 default'); a receipt claiming PI-GIT-CENSUS-LIVE while wb-9v02 has no disposition record refuses; a receipt that waits on wb-wupg or wb-413a without a ruling naming them is flagged as over-blocking (warning, not refusal).
- Adversarial mutant: Omit the blockers entry (or list B-detached-grants as a blocker with no ruling and no flag); the validator must refuse / flag.
- Verification: program level L0; tiers L0, L4; gate PI-GIT-CENSUS-LIVE; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:22", quote: "**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:35", quote: "| 19 | B-git-census | PI-3 | EAT-R053..EAT-R056 (4) | B-preserve, B-dispatch, B-outcomes, B-effects | MW-HOST, MW-CANCEL | PI-GIT-CENSUS-LIVE | no"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md:165", quote: "Note: PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned and any demonstrated authorization hole repaired before live closure."}
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-p3i2 row", quote: ""issue_id": "wb-p3i2", "depends_on_id": "wb-5ik5", "type": "blocks" ... "depends_on_id": "wb-mwsy", "type": "blocks" ... "wb-4bxo" ... "wb-9a1o" (dependency rows read by JSON parse)"}

## cancel-repro — wb-9v02 (slice PI-4; owner Pi)

### EAT-R160 — A per-agent cancel repair MAY follow only a reproduced red and MUST take the pending-abort-state shape

- Statement: Scope: the existing Claude host seam (`claude-host.ts` beforeDispatch / abortAgent). The experiment and its `reproduced` / `unresolved` disposition record are EAT-R015 / EAT-R016 and are not re-owed. A repair cut of that seam MAY follow only a `reproduced` record and MUST take the 03:47 shape: (a) store pending per-agent abort state before `beforeDispatch` is awaited and (b) re-check it after the barrier so that no SDK query is issued for a skipped agent, while the F10 run-signal control and the one-call no-abort control stay green.
- Authority: RISK_CONTROL | Type: BEHAVIORAL | Owner: Pi | Slice: PI-4 | Bead: wb-9v02 | Disposition: amend:wb-9v02
- Refines: EAT-R015, EAT-R016
- Claims: C1162 (SUPPORTED), C1543 (SUPPORTED), C1425 (SUPPORTED), C1482 (SUPPORTED), C1617 (NON-EPISTEMIC), C1618 (NON-EPISTEMIC), C1309 (NON-EPISTEMIC), C1164 (NON-EPISTEMIC), C1160 (ESTABLISHED)
- Relations: R00041, R00289, R00290, R00291, R00292, R00293, R00294, R00297, R00299, R00300, R00301, R00302, R00303, R00304
- Supersedes (Nov-4 ids, unchanged): C0213, C0353, C0217, C0350, C0453, C0323, C0372, C0215, C0216, C0352, C0210, C0351
- Sets / remediation: K114 / —
- Rationale: The race is a HYPOTHESIS (SUPPORTED by code reading: the controller is registered only after the awaited beforeDispatch and abortAgent aborts a registered controller only; unreproduced). EAT-R015/R016 acquire the evidence; the program adds the repair shape as 03:47 norms and forbids claiming a fix from the hypothesis alone (04:9). The requirement binds the repair to the witnessed red and fixes its shape; it asserts nothing about whether the red occurs.
- Conditions: Conditional on the EAT-R015 outcome; an `unresolved` record closes nothing and authorizes no repair of this seam. The 03:47 lifecycle norm for the new function-host dispatch path is owed unconditionally under EAT-R045 ('abort while queued, before load, before SDK query'), independent of this experiment; this row does not gate it. Partial-duplicate note: the original row restated the EAT-R015 experiment and grading; narrowed at the step-9 audit.
- Acceptance: Given the EAT-R015 disposition record: if `unresolved`, the receipt validator refuses a claude-host cancel-path change that cites no `reproduced` record; if `reproduced`, the repair cut cites that red run and, with `host.abortAgent("wf-agent-1")` issued while beforeDispatch is parked and then released, `sdk.calls` has length 0 and the settlement is `{ok:false, skipped:true}`, while F10 (`run.abort()`) and the no-abort one-call test still pass.
- Adversarial mutant: Register the controller before the await but drop the post-barrier re-check (or convert the per-agent skip into a whole-run abort); the per-agent zero-call assertion or the retained controls fail.
- Verification: program level L1; tiers L1; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workbench/claude-host.ts:207", quote: "try { await config.beforeDispatch?.(); } catch (error) {"}
  - {pin: "pi@d7666a76f561", path: "src/workbench/claude-host.ts:341-343", quote: "abortAgent(agentId) {\n      controllers.get(agentId)?.abort();\n      if (sessions.has(agentId) && !controllers.has(agentId)) pendingLookupAborts.add(agentId);"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:9", quote: "Park per-agent `beforeDispatch`, issue skip/retry, measure actual late SDK calls | Record reproduced or unresolved; code fix not claimed from hypothesis alone"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:47", quote: "Before `beforeDispatch`, store pending per-agent abort state; after the async barrier, cancellation must prevent an SDK query."}

## replay — wb-413a (slice PI-4; owner Pi)

### EAT-R161 — A joint Pi/MW replay-basis specification MUST exist before a 'complete' basis is claimed

- Statement: Before any cut claims a complete replay basis for Pi-hosted Mechanical functions, Pi and MW MUST publish one joint replay-basis specification enumerating every bound dimension (source commit/tree and dirty-file digest; skill/system-instruction bytes; effective provider/SDK versions and settings; gate-manifest digest; effect references; and the existing cwd, model, permissionMode, settings, tools, roles, grants, principal) (the rule that an unmeasurable dimension blocks replay is EAT-R020 and is not re-owed); Pi's fingerprint tests MUST reference the specification's dimension list.
- Authority: NORMATIVE_DECISION (+ EVIDENCE_ACQUISITION) | Type: REPRESENTATION | Owner: Pi | Slice: PI-4 | Bead: wb-413a | Disposition: amend:wb-413a (also: wb-1zn2)
- Refines: EAT-R017, EAT-R018, EAT-R019, EAT-R020
- Claims: C1170 (ESTABLISHED), C1174 (ESTABLISHED), C1175 (ESTABLISHED), C1176 (SUPPORTED), C1486 (ESTABLISHED), C1622 (NON-EPISTEMIC), C1623 (NON-EPISTEMIC)
- Relations: R00321, R00322, R00323, R00327, R00330, R00335, R00337, R00338, R00339, R00340, R00341, R00342, R00343, R00344
- Supersedes (Nov-4 ids, unchanged): C0218, C0224, C0455, C0551, C03147, C0223, C0324
- Sets / remediation: K110 / —
- Rationale: The replay key at the pin records eight dimensions (ESTABLISHED) and omits Git base, skill bytes, provider versions and effect references (ESTABLISHED); EAT-R017-R019 add three of the four. 'Complete' is untestable without a shared list (C1176 SUPPORTED, missing artifact: a joint specification); effect references are in no Nov-4 requirement.
- Conditions: Pi publishes the Pi-side dimension list first (landable with wb-413a); 'complete' is claimed only once MW's app-local half (prompt/config digest, Forge-manifest digest; EAT-R176 clause (c), MW-R3) is attached on wb-1zn2; the unlanded wb-413a branch 2f0fedd3 already rebinds the basis and was not inspected or run (K110).
- Acceptance: The specification (path named in the receipt) lists each dimension with its measurement source and owner; a test enumerates the Claude host's recorded basis keys and asserts set-equality with the specification's Pi-side list; a dimension present in the specification but absent from the recorded basis fails; 'effect references' is either recorded or explicitly deferred with a dated reason in the specification.
- Adversarial mutant: Drop 'effect references' from the recorded basis while the specification lists it; the set-equality assertion fails.
- Verification: program level L1; tiers L1, L9; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workbench/claude-host.ts:166-175", quote: "const replayBasis = JSON.stringify([\n    config.cwd,\n    config.model ?? null,\n    permissionMode,\n    settings,\n    tools,\n    config.roles ?? null,\n    config.grants ?? null,\n    config.principal ?? null,\n  ]);"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:30", quote: "but not measured Git base commit/tree, skill/instruction bytes, provider versions or effect references. Mechanical's newest prompt/config and Forge-manifest hashes are useful **app-local** foundations, not a complete joint replay basis."}

### EAT-R162 — The WorkflowHost.replayBasis doc comment MUST name only dimensions the hosts record, qualified per host

- Statement: The `WorkflowHost.replayBasis` documentation comment in `src/workflow/runtime.ts` (mirrored at `src/workflow/journal.ts:118-122`) is host-generic: it MUST NOT present as universal a dimension that only some registered hosts record and MUST name every dimension the Claude host records. At the pin it lists 'provider manifest' unqualified although only the detached host's `identityDigest` binds a manifest (`local-detached.ts:681-686`) and the Claude host literal (`claude-host.ts:166-175`) records none, and it omits `settings` and `principal`, which the Claude host records. A census test MUST compare the comment's dimension list with each registered host's recorded dimensions.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-4 | Bead: wb-413a | Disposition: amend:wb-413a
- Refines: EAT-R019
- Claims: C1170 (ESTABLISHED), C1173 (ESTABLISHED), C1174 (ESTABLISHED), C1176 (SUPPORTED)
- Relations: R00044, R00321, R00322, R00323, R00327, R00330, R00332, R00333, R00334, R00335, R00336, R00337, R00338, R00347
- Supersedes (Nov-4 ids, unchanged): C0218, C0221, C0224
- Rationale: Family F04: the single `replayBasis` literal lists [cwd, model, permissionMode, settingSources, tools, roles, grants, principal]; the `WorkflowHost.replayBasis` doc comment overstates ('provider manifest') what the Claude host records. A comment that promises more than the code binds is the wording defect the program's own discipline forbids.
- Conditions: Code-comment correction only. Scope carried from the ledger: C1173's defeater reads 'Pi's replay key' as the Claude host's literal; the detached host (local-detached.ts) binds `manifest` and `localProvider.version/digest`, so a universal 'records no provider manifest' reading is false at the pin and was removed from this row at the step-9 audit.
- Acceptance: A census test tokenizes the runtime.ts (and journal.ts) replayBasis doc-comment dimension list and the recorded dimensions of each registered host (the claude-host.ts literal; the local-detached.ts identityDigest keys) and asserts: every unqualified comment dimension is recorded by every host, every host-specific dimension carries its host name, and every Claude-host dimension is named; at the pin the test is red ('provider manifest' unqualified while the Claude host records no provider version; `settings` and `principal` unnamed); after EAT-R017-R019 the lists grow together.
- Adversarial mutant: Keep 'provider manifest' unqualified while the Claude host records no provider version (or drop `settings` from the comment); the census fails.
- Verification: program level L1; tiers L1, L9; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "src/workflow/runtime.ts:259-261", quote: "Opaque digest of the host policy an agent result or node read depends on\n   * beyond its own call payload — model pin, permission mode, tools, roles,\n   * grants, cwd, provider manifest."}
  - {pin: "pi@d7666a76f561", path: "src/workbench/claude-host.ts:166-168", quote: "const replayBasis = JSON.stringify([\n    config.cwd,\n    config.model ?? null,"}
  - {pin: "pi@d7666a76f561", path: "src/workbench/hosts/local-detached.ts:681-686", quote: "replayBasis: identityDigest("local-detached-replay-basis", {\n      contract: DETACHED_CONTRACT, backend: request.backend, workspace: request.cwd, principal: principal.id,\n      grants: [...new Set(request.grants ?? [])].sort(), manifest,"}
  - {pin: "pi@d7666a76f561", path: "src/workflow/journal.ts:120-121", quote: "the SAME basis, which is how a changed host policy — model pin, permission\n   * mode, tools, roles, grants, workspace, provider manifest — declines the"}

## hx-admit — wb-pxvv (slice PI-5; owner Pi)

### EAT-R163 — The named-query task-scope route MUST be probed before hx-task-scope-v1 is called unsupported version-wide

- Statement: Before `hx-task-scope-v1` is described as unsupported version-wide at hx 0.1.0, the HX admission bead MUST probe a workspace-defined named query carrying a task scope against the same installed binary and record exit code, verb, roster and verdict in a dated receipt; until that receipt exists every program statement MUST keep the find-verb/84-capability-roster bound of wb-f3wd.
- Authority: EVIDENCE_ACQUISITION | Type: VERIFICATION | Owner: Pi | Slice: PI-5 | Bead: wb-pxvv | Disposition: amend:wb-pxvv
- Refines: EAT-R057, EAT-R058
- Claims: C1550 (SUPPORTED, overclaims), C1627 (SUPPORTED), C1626 (ESTABLISHED), C1224 (ESTABLISHED), C1225 (ESTABLISHED), C1551 (ESTABLISHED)
- Relations: R00528, R00529, R00530, R00531, R00532, R00533, R00534, R00535, R00536, R00537, R00538, R00755, R00756, R00757
- Supersedes (Nov-4 ids, unchanged): C03114, C03113
- Sets / remediation: — / M108
- Rationale: The wb-f3wd receipt bounds its verdict to the `find` verb and the roster and lists the named-query route as NOT CLAIMED; 02:29 reads version-wide (C1550 SUPPORTED, overclaims). The missing artifact is a probe of the unclaimed route at the same binary.
- Conditions: wb-f3wd is closed (2026-11-06T18:27Z); this is a new leg of wb-pxvv. The HX producer is not pinned by this triage; the wording repair is EAT-R185.
- Acceptance: The receipt pins the installed `hx` version output, the named-query definition, the exact command, exit code and verdict; the admission test maps 'unsupported on the named-query route' or 'supported' to the `hx-task-scope-v1` gate independently of the find-verb result; a receipt that re-cites the wb-f3wd find-verb exit codes as the named-query witness refuses.
- Adversarial mutant: Reuse the wb-f3wd find-verb exit codes as the named-query verdict; the receipt validator must refuse.
- Verification: program level L3; tiers L3; gate HX-TASK-SCOPE-PROBE; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:29", quote: "Pi `wb-f3wd` native HX probe established task-scope unsupported at the probed producer version, not that a Git tracked-file census is invalid or that later HX versions cannot improve."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:40", quote: "its verdict is `task-scope-unsupported` and it explicitly **does not block Git-census**."}

## telemetry — wb-r5q2 (slice PI-7; owner Pi)

### EAT-R164 — Cost figures MUST be fresh measurements with date, host, command and sample size; October figures are history only

- Statement: Every cost figure for tarball packing, install, admission or QA stated in a program receipt or document MUST be a fresh measurement carrying date, host, exact command, sample size and source pin; the 2026-10-20 (398 s median npm-ci) and 2026-11-02 (7 s median) feedback figures MUST be cited only as dated history, never as a current estimate; and a cache optimization MUST cite the fresh measurement it addresses.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-7 | Bead: wb-r5q2 | Disposition: amend:wb-r5q2 (also: wb-j5y5)
- Refines: EAT-R079, EAT-R086
- Claims: C1517 (ESTABLISHED), C1518 (ESTABLISHED), C1519 (NON-EPISTEMIC), C1520 (NON-EPISTEMIC), C1385 (NON-EPISTEMIC), C1502 (NON-EPISTEMIC)
- Relations: R00682, R00695, R00696, R00697, R01025, R01334, R01349
- Supersedes (Nov-4 ids, unchanged): C0266, C0276, C0106
- Rationale: Both historical figures resolve verbatim to dated feedback files (ESTABLISHED as source reports) and the program itself rules that a historical latency figure is not a current estimate. The guard keeps measurement and history distinguishable in receipts.
- Conditions: None; the measurement itself is EAT-R079's load journey.
- Acceptance: The receipt validator rejects a cost sentence lacking date/host/command/sample fields; a docs census flags '398' or '7 s' used with a present-tense cost verb outside a dated-history clause; the wb-r5q2 load receipt's cost table carries the fields for each measured stage (pack, install, admission, gate).
- Adversarial mutant: Copy the October median into the receipt as 'current install cost'; the validator flags it.
- Verification: program level L5; tiers L1, L5; gate PI-MULTIWORKFLOW-LOAD; run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:13", quote: "2026-10-20 earlier 398s median npm-ci across gate worktrees; 2026-11-02 shared-cache report 7s median and preparation step F dominant | Measure *current* tarball/install/admission/QA costs before cache optimization"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:36", quote: "measured package/prep/backpressure cost rather than outdated October numbers."}

## release — wb-j5y5 (slice PI-7; owner Pi)

### EAT-R165 — Validators MUST tag every witness with its L0-L5 level and refuse a status claim backed only by lower levels

- Statement: The receipt and status validators MUST tag every witness with its program test level (L0 source audit; L1 isolated fixture/mutants; L2 independent packed-artifact install; L3 producer-native API session/operation with exact version and source; L4 registered Pi `workflow_execute` function launch observed through Pi and joined to the Mechanical outcome and native Forge; L5 detached/Furnace restart and multi-invocation load) and MUST refuse any slice or W11 status claim at level N that is backed only by witnesses below N.
- Authority: NORMATIVE_DECISION | Type: VERIFICATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R082, EAT-R085
- Claims: C1350 (NON-EPISTEMIC), C1351 (NON-EPISTEMIC), C1352 (NON-EPISTEMIC), C1353 (NON-EPISTEMIC), C1354 (NON-EPISTEMIC), C1355 (NON-EPISTEMIC), C1356 (NON-EPISTEMIC), C14111 (NON-EPISTEMIC), C1497 (NON-EPISTEMIC), C1553 (NON-EPISTEMIC)
- Relations: R00759, R00760, R00969, R00970, R00971, R00972, R00973, R00974, R00975, R01209, R01244, R01245, R01315, R01362
- Supersedes (Nov-4 ids, unchanged): C0105, C0456, C0378, C03142, C0380, C03148
- Rationale: EAT-R085 rejects live claims backed by skipped, fixture-only or historical component tiers. The Nov-6 program defines six named levels and the explicit no-promotion rule; the definitions are NON-EPISTEMIC and adopted here as the validator's taxonomy.
- Conditions: None; applies to every bead from its first cut.
- Acceptance: Given a receipt whose witnesses are all L1/L2 and whose status claim is live (L4), the validator refuses naming the missing level; an L3 standalone-rig receipt offered for an L4 claim refuses ('a helper or direct develop() test is not joint acceptance'); an L4 receipt with the registered-tool invocation id, Mechanical outcome and Forge operation ID passes; any witness lacking a level tag refuses.
- Adversarial mutant: Treat L3 as satisfying L4 (promote by one level); the refusal fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:5", quote: "L4 registered Pi `workflow_execute` function launch observed through Pi and joined to Mechanical outcome and native Forge; L5 detached/Furnace restart and multi-invocation load. **Do not promote one level's witness into the next.**"}
  - {pin: "pi@d7666a76f561", path: ".agents/skills/pi-mechanical-interop/SKILL.md:22", quote: "A helper/direct `develop()` test is not joint acceptance."}

### EAT-R166 — A status upgrade MUST carry a recorded positive and falsifier for every applicable surface of the adversarial table

- Statement: Before any W11 or slice status upgrade, the status validator MUST require a recorded positive and falsifier result, each tagged with its level, for every surface of the doc 05 adversarial table applicable to the slice (worktree, authorizations, descriptor/artifact, agent startup, Mechanical cancel, source/replay, outcomes, Forge, HX/RF, effect/retry, policy, load) and MUST refuse an upgrade whose roster leaves an applicable surface unrecorded or marks it n/a without a reason.
- Authority: NORMATIVE_DECISION | Type: VERIFICATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R083, EAT-R085
- Claims: C1357 (NON-EPISTEMIC), C14112 (NON-EPISTEMIC), C1364 (NON-EPISTEMIC), C1365 (NON-EPISTEMIC), C1366 (NON-EPISTEMIC), C1367 (NON-EPISTEMIC)
- Relations: R00978, R00981, R00985, R00989, R00992, R00995, R00997, R00998, R00999, R01000, R01001, R01002, R01003, R01004
- Supersedes (Nov-4 ids, unchanged): C0366, C0370, C0371, C0372, C0237, C0375
- Rationale: EAT-R083 demands a mutant per requirement at cut level; the program adds a slice-level roster of twelve surfaces, each needing a positive and a falsifier before release, and the SKILL names seven mutant families that must run before any status upgrade.
- Conditions: Surfaces whose producer gate is unmet land as explicitly partial (EAT-R085), never silently n/a.
- Acceptance: Given a slice receipt mapping each surface to test ids and outcomes, the validator passes only when every applicable surface has both a positive and a falsifier id with a recorded outcome and level; an 'n/a' surface requires a reason; a roster missing e.g. 'lost reply' for an effects slice refuses.
- Adversarial mutant: Accept a roster containing positives only; the validator fails to refuse.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:7-9", quote: "## Adversarial cases required before release\n\n| Surface | Positive and falsifier |"}
  - {pin: "pi@d7666a76f561", path: ".agents/skills/pi-mechanical-interop/SKILL.md:28", quote: "Run appropriate negative mutants (worktree failure, grant denial, async abort, stale replay, HX incomplete, preview substitution, lost reply) before upgrading status."}

### EAT-R167 — Every Pi cut MUST close the named documentation files in the same cut and leave W11 unchanged on docs-only commits

- Statement: Every Pi implementation cut under epic wb-1a3t MUST, in the same cut, update or explicitly mark unchanged (with a reason in the receipt) each of `.agents/skills/pi-mechanical-interop/SKILL.md`, `docs/workbench/mechanical-function-hosting.md`, `docs/workbench/README.md`, `docs/workbench/07-native-integrations.md`, `docs/workbench/08-lifecycle-and-recovery.md`, the tool/CLI docs the cut touches, the W11 row of `docs/workbench/feature-matrix.md` (measured status only) and `docs/workbench/receipts/wb-<id>.md`; a docs-only program commit MUST leave the W11 status word unchanged (TRACEABILITY.md immutability is EAT-R087's acceptance and is not re-owed here).
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R082, EAT-R087
- Claims: C1375 (NON-EPISTEMIC), C14113 (NON-EPISTEMIC), C1343 (NON-EPISTEMIC), C1390 (NON-EPISTEMIC), C1460 (NON-EPISTEMIC), C1378 (NON-EPISTEMIC), C14114 (NON-EPISTEMIC)
- Relations: R00965, R01030, R01031, R01032, R01146, R01250, R01251, R01252, R01253, R01347, R01362, R01393, R01408, R01431
- Supersedes (Nov-4 ids, unchanged): C0457, C0408, C0423, C03102, C0269
- Rationale: EAT-R082 names W11 and the skill; the Nov-6 program enumerates the exact file set per cut (05:34, SKILL:29), rules that documentation-only program commits do not change W11, and keeps TRACEABILITY historical. All are NON-EPISTEMIC norms adopted as the docs-closure validator's list.
- Conditions: The feature-matrix W11 detection sentence (M118) is repaired by EAT-R195 in the docs cut; this requirement governs later cuts.
- Acceptance: Given the cut diff and receipt, the qa/workbench docs-closure validator asserts each listed file is in the diff or named in the receipt's `docs-unchanged` list with a reason; asserts the W11 status word changes only when the receipt carries an L4 witness (EAT-R165); (the TRACEABILITY.md blob comparison is EAT-R087's check, run by that row); a cut touching `src/workbench/hosts/` with no hosting-guide change and no unchanged-reason refuses.
- Adversarial mutant: Remove `08-lifecycle-and-recovery.md` from the validator's list; a cut that changes cancel semantics without updating it passes wrongly, and the list test fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:34", quote: "Every implementation cut updates the Pi skill `.agents/skills/pi-mechanical-interop/SKILL.md`, [operator guide](../../mechanical-function-hosting.md), `docs/workbench/README.md`, `docs/workbench/07-native-integrations.md`"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:35", quote: "Documentation-only program commits do not imply a change to W11 status."}

### EAT-R168 — Program tests MUST declare explicit time budgets and receipts MUST classify reds as assertion, timeout or collector error

- Statement: Every test file the program adds MUST declare an explicit per-test or per-file time budget rather than relying on the Vitest 5 s default, and the receipt MUST classify each red as assertion-red, timeout or collector/config error; a timeout MUST NOT be recorded as an assertion failure and a red MUST NOT be removed by raising a budget without a recorded reason.
- Authority: RISK_CONTROL | Type: INSTRUMENTATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R083, EAT-R086
- Claims: C1514 (SUPPORTED), C1515 (SUPPORTED), C1516 (NON-EPISTEMIC), C1383 (NON-EPISTEMIC), C1246 (SUPPORTED), C1248 (NON-EPISTEMIC)
- Relations: R00596, R00597, R00600, R00601, R00602, R00603, R00604, R00692, R00693, R00694, R01349
- Supersedes (Nov-4 ids, unchanged): C0264, C0265
- Rationale: October feedback (SUPPORTED as source reports) records the default 5 s timeout and misselected census config producing false or misclassified reds; the program's response is a taxonomy norm. No program test exists at the pin, so the guard is prospective and justified by the measured regression class.
- Conditions: Budgets are per test, not suppressed reds; raising a budget requires a recorded reason in the receipt.
- Acceptance: A census over `test/workbench-mechanical-*.test.ts` asserts each `it`/`describe` carries an explicit timeout or the file sets `testTimeout`; the receipt validator rejects a red list lacking the taxonomy field; a fixture receipt whose Vitest timeout message is classified 'assertion-red' refuses.
- Adversarial mutant: Rely on the default timeout in one new file; the census fails.
- Verification: program level L1; tiers L1, L9; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:12", quote: "Multiple October reports: default 5s Vitest timeout and misselected census config cause false or misclassified reds | Test-specific budgets, explicit config and failure taxonomy, never simply suppress red"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:36", quote: "timeouts explicitly distinguished from assertion reds"}

### EAT-R169 — Program tests MUST live in scoped new files and MUST NOT edit shared census headers or derive membership from Beads notes

- Statement: Program tests MUST live in new scoped files named `test/workbench-mechanical-*.test.ts` (opt-in native/registered journeys under `qa/workbench/`), MUST NOT edit a shared mutable assertion header or census membership list owned by another bead, and MUST NOT derive test membership from Beads export note wording.
- Authority: RISK_CONTROL | Type: NEGATIVE_REGRESSION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R087
- Claims: C1336 (NON-EPISTEMIC), C1337 (NON-EPISTEMIC), C1341 (NON-EPISTEMIC), C1381 (NON-EPISTEMIC), C1382 (NON-EPISTEMIC), C1510 (NON-EPISTEMIC), C1509 (ESTABLISHED), C14116 (NON-EPISTEMIC)
- Relations: R00687, R00688, R00689, R00690, R00960, R00961, R00964, R01024, R01258, R01259
- Supersedes (Nov-4 ids, unchanged): C0267, C0382, C0268, C0269, C0263, C0385, C0386
- Rationale: A 2026-11-03 report (ESTABLISHED as a source report) recorded 3 of 48 landings in its window as sibling header/census conflicts; EAT-R087 protects TRACEABILITY and shared receipt indexes but not test headers. The file-placement and no-shared-header rules are program norms (04:31, 05:36, SKILL:30).
- Conditions: Existing census tests are out of scope; only files the program adds are governed.
- Acceptance: Given a cut diff, the validator asserts every added test path matches `test/workbench-mechanical-*.test.ts` or `qa/workbench/`; asserts no file outside the cut's own new files has a modified shared header or membership array; a grep over the new tests finds no reader of `.beads/issues.jsonl` notes; a diff that appends an entry to a shared census list refuses.
- Adversarial mutant: Register the new test by appending to a shared census array; the validator must refuse.
- Verification: program level L1; tiers L0, L9; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:31", quote: "Pi `test/workbench-mechanical-*.test.ts`: scoped new files, no giant shared census/header; `qa/workbench/` for opt-in native/registered journeys; real per-bead receipts only."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:10", quote: "2026-11-03: 3 of 48 landings in measured window were sibling header/census conflicts | Per-cut tests and per-bead receipts, no shared mutable assertion header or central receipts index"}

### EAT-R170 — Every assertion and receipt claim MUST name its reader, pin, witness, mutant and quiet cases, and no census MAY assert beyond its pins

- Statement: Every assertion and receipt claim under the program MUST name its reader (test id), source pin, witness (artifact or producer ref), mutant and remaining quiet cases (legs not exercised), and no census the program adds MAY assert a proposition broader than the pins and file set it declares it reads.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R083, EAT-R086
- Claims: C1507 (NON-EPISTEMIC), C1508 (NON-EPISTEMIC), C1380 (NON-EPISTEMIC), C1505 (ESTABLISHED), C1506 (ESTABLISHED)
- Relations: R00683, R00684, R00685, R00686
- Supersedes (Nov-4 ids, unchanged): C0397, C0385, C03100
- Rationale: The 2026-11-04 refusal report (42 of 56 refusals naming R514/R515/R668; 152,506 prep seconds) is ESTABLISHED as a source report; the program's response adds 'quiet cases' and the no-wider-than-pins rule to the receipt contract EAT-R086 already enforces.
- Conditions: None.
- Acceptance: The receipt validator rejects a claim row missing any of reader/pin/witness/mutant/quiet-cases; a census test's descriptor declares the file set and pin it reads, and the validator asserts the asserted scope (paths, pins) is a subset of the declared read set.
- Adversarial mutant: Omit the quiet-cases field; the validator must refuse.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/02-feedback-and-epistemics.md:9", quote: "Every assertion must name its precise reader/source/witness, mutant and remaining quiet cases. No huge aggregate census with claims broader than pins"}

### EAT-R171 — The accepted Forge gate receipt MUST be keyed to the merged candidate tree, not the lane branch tree

- Statement: The Forge gate receipt accepted for a cut MUST be keyed to the merged candidate tree (the cut merged onto the trunk tip it lands on), not to the lane branch tree alone; the receipt MUST record the branch tip, the trunk sha merged and the merged tree id, and a receipt whose gated tree id differs from the landed tree id refuses closure.
- Authority: NORMATIVE_DECISION | Type: VERIFICATION | Owner: Pi | Slice: PI-7 | Bead: wb-j5y5 | Disposition: amend:wb-j5y5
- Refines: EAT-R084
- Claims: C1342 (NON-EPISTEMIC), C1386 (NON-EPISTEMIC), C1525 (NON-EPISTEMIC), C1340 (NON-EPISTEMIC), C1524 (SUPPORTED)
- Relations: R00699, R00700, R00963, R01026, R01352, R01409, R01411, R01442
- Supersedes (Nov-4 ids, unchanged): C0268, C0422
- Sets / remediation: — / M122
- Rationale: EAT-R084 keys the receipt to the exact candidate commit; the program adds that the gated tree must be the merged candidate tree (04:35, 05:36) because agents land in parallel (cadence SUPPORTED up to the pin, M122). Tree identity, not commit identity, is the comparable quantity after a fold.
- Conditions: Refines and does not relax EAT-R084: the receipt stays keyed to the exact gated candidate commit (EAT-R084) and additionally records the merged tree id, the branch tip and the trunk sha; an equal-tree landing under a different commit (rebase or fold) passes only when the receipt names the gated commit and the fold lineage that produced the landed commit, so EAT-R084's 'receipt for another commit' is read as 'a receipt whose gated tree is not the landed tree', never as 'any receipt with an equal tree'.
- Acceptance: Given a receipt with gated tree id and the landing's tree id, the validator asserts equality and that the recorded trunk sha is an ancestor of the landed commit; a receipt gated on the lane tip whose merge with trunk yields a different tree refuses; a rebased-equal-tree case passes only when the receipt also carries the exact gated commit sha and its fold lineage (EAT-R084 retained); a receipt lacking the gated commit sha refuses.
- Adversarial mutant: Compare commit shas instead of tree ids; the rebased-equal-tree case refuses wrongly and the divergent-tree case passes wrongly, so the tree-identity test fails.
- Verification: program level L0; tiers L0, L10; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:35", quote: "Before implementing, refresh both branches, check unlanded work, avoid overlapping mutable test headers, and ensure the **merged candidate tree** is the one gated."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:36", quote: "Recheck the exact **merged gated tree**, not just one agent's branch."}

## master-recon — wb-cbt4 (slice PI-0; owner Pi)

### EAT-R172 — Bead descriptions under epic wb-1a3t MUST carry the Nov-6 pins and their delta requirement ids before a seat implements against them

- Statement: Before a seat implements a program cut against the Nov-6 program, the epic wb-1a3t and each open group bead record (description plus appended notes) MUST carry the Nov-6 pins (doc pin d7666a76; env pins pi 278c8f79/d7666a76 and mw 97e18068, or the tip the owner rules) alongside the Nov-4 pins, and the EAT-R144+ ids assigned to that bead by BEAD-AMENDMENT-PLAN.md; the write MUST be a note-append, never a description overwrite that drops the Nov-4 pins.
- Authority: NORMATIVE_DECISION | Type: REPRESENTATION | Owner: Pi | Slice: PI-0 | Bead: wb-cbt4 | Disposition: amend:wb-cbt4
- Refines: EAT-R086
- Claims: C1552 (NON-EPISTEMIC), C1301 (NON-EPISTEMIC), C1494 (NON-EPISTEMIC), C1402 (ESTABLISHED), C1403 (ESTABLISHED), C1405 (NON-EPISTEMIC)
- Relations: R00932, R00962, R01022, R01034, R01035, R01036, R01037, R01038, R01040, R01204, R01205, R01312, R01338, R01339
- Supersedes (Nov-4 ids, unchanged): C0447, C03102, C0402, C0403, C0426, C0427
- Sets / remediation: K117 / M119
- Rationale: The beads the program binds work to carry the Nov-4 pins (epic wb-1a3t: doc 7c80c343; pi b27829e6 / mw f7c0a943, one MW commit before the program's baseline) while README:3 states 278c8f79 / 97e18068 (ESTABLISHED). A seat reading the bead sees a different baseline than the program states; the program orders reuse but never says the descriptions must be re-pinned.
- Conditions: deferred: the re-pin is a ledger-in-repo write owned by wb-cbt4 (M119) and an owner decision on advancing the MW baseline (M109); the README:3 wording is EAT-R196.
- Acceptance: A census over `.beads/issues.jsonl` rows under wb-1a3t asserts each open bead's description-plus-notes contain the Nov-6 program path, both pin sets and the EAT-R144+ ids the plan assigns it; a bead carrying only the Nov-4 pins is listed stale; a description whose Nov-4 pin text is gone fails.
- Adversarial mutant: Overwrite the description dropping the Nov-4 pins; the census flags the loss.
- Verification: program level L0; tiers L0; gate forge build (default gate); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-1a3t row", quote: "PROGRAM: docs/workbench/programs/mechanical-workflows-interop-2026-11-04 (doc pin 7c80c34346c2; env pins pi b27829e6dfa7 / mw f7c0a9431d6c)"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:3", quote: "Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation."}

## external-tracker — wb-1zn2 (slice PI-0; owner MW)

### EAT-R173 — The MW tracker MUST carry an owner-confirmed map from MW-R0..MW-R8 to the Nov-4 tracks, EAT-R088..R093 and the named gates

- Statement: wb-1zn2 MUST carry a label map confirmed by the MW owner: MW-R0 = descriptor repair kept (MW-owned confirm gate; no Pi requirement); MW-R1 = mw-host EAT-R089 plus the joint ABI ruling mw-contract EAT-R088 (gates MW-HOST, MW-CONTRACT); MW-R2 = callback bundle (new, EAT-R175); MW-R3 = mw-cancel EAT-R090 plus effect/replay identity (gate MW-CANCEL; EAT-R176); MW-R4 = joint native journey, owner Both (Pi side PI-GIT-CENSUS-LIVE); MW-R5 = mw-native EAT-R091 (MW-NATIVE); MW-R6 = mw-furnace EAT-R092 (MW-FURNACE); MW-R7 = mw-coordination EAT-R093 (MW-COORDINATION); MW-R8 = multi-invocation release (new, MW-owned), so that each Pi bead's dependency on the tracker is released per gate.
- Authority: NORMATIVE_DECISION | Type: REPRESENTATION | Owner: MW | Slice: PI-0 | Bead: wb-1zn2 | Disposition: mw-tracker
- Refines: EAT-R088, EAT-R089, EAT-R090, EAT-R091, EAT-R092, EAT-R093
- Claims: C1322 (NON-EPISTEMIC), C1323 (NON-EPISTEMIC), C1324 (NON-EPISTEMIC), C1325 (NON-EPISTEMIC), C1326 (NON-EPISTEMIC), C1327 (NON-EPISTEMIC), C1328 (NON-EPISTEMIC), C1304 (NON-EPISTEMIC)
- Relations: R00933, R01281, R01288, R01289, R01290, R01291, R01292, R01293, R01294, R01295, R01296, R01297, R01298, R01299
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: K103, K105 / M115
- Rationale: The MW-R labels resolve only at mw-tip 6e15a4245d3f (absent at the stated baseline) and no map to the Nov-4 mw-* tracks / EAT-R088..R093 that wb-1zn2 gates on exists in the Pi artifact; the 'Mechanical-owned' header contradicts the companion's owner column ('Both' for MW-R4, producer-side for MW-R5/R6). The map above is this roll-up's candidate reading; the MW owner confirms it.
- Conditions: deferred: MW-owner confirmation (M115); labels exist only at mw-tip; the 04:22 wording repair is EAT-R192.
- Acceptance: The tracker note lists each MW-Rn with its mapped Nov-4 track, EAT id, gate name and owner (Mechanical / Both / producer) plus the MW owner's confirmation entry (date, sha); the Pi dependency-release recipe names the gate per MW-Rn; a Pi bead unblocked on a gate not marked delivered is flagged by the bead census.
- Adversarial mutant: Map MW-R3 to MW-NATIVE; the gate-per-track assertion fails.
- Verification: program level L0; tiers L0; gate none (tracker); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/04-implementation-program.md:22", quote: "**Mechanical-owned tracks:** companion `MW-R1` installed rig host export; `MW-R2` callback bundle; `MW-R3` active cancellation/replay/effect control; `MW-R4` joint native journey; `MW-R5` native HX/RF; `MW-R6` Furnace; `MW-R7` coordination."}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:11", quote: "| MW-R4 | P1 | Both, Pi function dispatch + MW-R1/2/3 | First registered Pi→packed Mechanical→Claude/Git→Forge run with native observation |"}
  - {pin: "pi@d7666a76f561", path: ".beads/issues.jsonl:wb-1zn2 row", quote: "close only when every named gate (MW-CONTRACT, MW-HOST, MW-CANCEL, MW-NATIVE, MW-FURNACE, MW-COORDINATION) is delivered or formally dropped"}

## mw-host — wb-1zn2 (slice PI-2; owner MW)

### EAT-R174 — MW MUST publish the rig-host facade as a declared exports subpath only after an external packed-install smoke

- Statement: MW MUST publish the installed rig-host facade as a declared package `exports` subpath (proposed `@mechanical/development-rig/host` exporting `invokeMechanicalDevelopmentV1`) only after an external packed-install smoke proves the tarball carries the required `dist` and runtime dependencies, with no new mandatory package; the facade MUST declare the `mechanical.pi-host/v1` literals Pi validates (EAT-R150) and the jointly approved grant literal (EAT-R151).
- Authority: NORMATIVE_DECISION | Type: BEHAVIORAL | Owner: MW | Slice: PI-2 | Bead: wb-1zn2 | Disposition: mw-tracker
- Refines: EAT-R088, EAT-R089
- Claims: C1193 (ESTABLISHED), C1192 (ESTABLISHED), C1197 (SUPPORTED), C1322 (NON-EPISTEMIC), C1330 (NON-EPISTEMIC), C1588 (NON-EPISTEMIC)
- Relations: R00384, R00385, R00386, R00387, R00388, R00389, R00400, R00403, R00404, R00405, R00406, R00407, R00822, R01288
- Supersedes (Nov-4 ids, unchanged): C0315, C0538
- Sets / remediation: K105 / —
- Rationale: At 97e18068 `@mechanical/development-rig` declares a `bin` and no `exports`/`main`/`types` (ESTABLISHED); deep `dist/` paths remain importable, so the absence is of a declared API (C1197 SUPPORTED). EAT-R089 asks for a consumable facade; the companion (mw-tip) names the subpath, the export and the smoke-first rule. MW-owned; Pi only consumes.
- Conditions: External MW deliverable; the subpath and export names are proposals at mw-tip only (same lineage).
- Acceptance: `npm pack` of apps/development-rig at the cut; an external consumer in a clean directory installs the tarball and imports the subpath without a repository checkout; package.json declares the `exports` entry; the documented path is the subpath, not `dist/`; a tarball missing a runtime dependency fails the smoke.
- Adversarial mutant: Declare the subpath without the dist smoke (a runtime dependency missing from the tarball); the external smoke fails.
- Verification: program level L2; tiers L2; gate MW-INSTALLED-CONSUMER; run status: not run
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/package.json:10-12", quote: ""bin": {\n    "mechanical-development-rig": "./dist/cli.js"\n  },"}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md:12", quote: "The proposed local adapter exports an explicit `invokeMechanicalDevelopmentV1` function from a stable rig host subpath (e.g., `@mechanical/development-rig/host`, only after an independently installed consumer proves it)."}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:25", quote: "Add package `exports` subpath only after proving the tarball contains the required `dist` and any runtime dependencies in an external smoke."}

### EAT-R175 — MW MUST ship the explicit four-callback bundle bound to Git census, plain context, one Claude writer and Forge

- Statement: MW MUST ship the explicit application callback bundle with the MW-R2 additions beyond EAT-R089 (binding the four callbacks and preserving all four outcome arms are EAT-R089's acceptance and are not re-owed): the callbacks are wired to Git tracked-file census (`discover`), explicitly plain task context (`compileContext`), one bounded native Claude SDK writer (`implement`) and native Forge (`verify`) and invoked in that order; no write is performed when the source basis does not match; and the `discover` walker obeys the symlink rule of EAT-R153.
- Authority: NORMATIVE_DECISION | Type: BEHAVIORAL | Owner: MW | Slice: PI-2 | Bead: wb-1zn2 | Disposition: mw-tracker
- Refines: EAT-R089
- Claims: C1323 (NON-EPISTEMIC), C1567 (NON-EPISTEMIC), C1597 (NON-EPISTEMIC), C1598 (NON-EPISTEMIC), C1599 (NON-EPISTEMIC), C1448 (ESTABLISHED)
- Relations: R00780, R00781, R00784, R00842, R00843, R00844, R00845, R00846, R00847, R00848, R00849, R01118, R01239, R01290
- Supersedes (Nov-4 ids, unchanged): C0506, C0548, C0555, C0316, C0246, C0560, C0369
- Rationale: EAT-R089 binds the four callbacks; MW-R2 (new at mw-tip) adds the explicit bundle with the order, the no-write-on-wrong-basis oracle and the rule that the first profile is the already implemented Git census, not a fake HX scope. The four arms are ESTABLISHED; the bundle is a proposal.
- Conditions: External MW deliverable; the first profile is Git census + plain context, never a fake HX scope or RF render ID.
- Acceptance: A consumer test binds the bundle through a recording wrapper: on the happy path the four callbacks are called in order exactly once each (the four-arm round-trip is EAT-R089's positive control); a mismatched baseCommit/baseTree yields zero write calls and `needs_evidence` or a typed refusal; a fixture containing a symlinked node_modules is not enumerated by `discover`.
- Adversarial mutant: Call `implement` before `compileContext` (or write on a mismatched basis); the order / no-write assertions fail.
- Verification: program level L2; tiers L2, L3; gate MW-INSTALLED-CONSUMER; run status: not run
- Evidence:
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:9", quote: "| MW-R2 | P1 | Mechanical | Explicit callbacks wired to Git census, plain task context, one native Claude writer and Forge | Each of four callbacks invoked in order; all four outcome arms preserved; wrong basis no writes |"}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/03-function-host-contract.md:29", quote: "First profile: Git tracked-file census + plain task context, bounded Claude SDK writer, native Forge gate bound to changed candidate commit/tree. No fake HyperUnix semantic completeness or RF render ID."}

## mw-cancel — wb-1zn2 (slice PI-3; owner MW)

### EAT-R176 — MW MUST publish the effect-class list and the dirty-write reconciliation contract that the no-duplicate guarantee covers

- Statement: With the MW-R3 cancellation work, MW MUST publish a written statement of (a) the effect classes the no-duplicate guarantee covers for develop() (writes, claims, Forge operations, Furnace Attempts), naming the existing Git-source publication `idempotencyKey` fingerprint as the one per-class guarantee present at the pin, (b) the dirty-write reconciliation contract a host must call before any retry, and (c) MW's app-local replay-basis dimensions (prompt/config digest, Forge-manifest digest; C1175/C1486) with their measurement sources, as the MW half of the EAT-R161 joint specification. Pi's effects bead (wb-mwsy) MAY land its Pi-local seams against a provisional effect-class list marked `provisional (Pi)` and MUST replace it with the producer-published list when MW-R3 delivers; a receipt claiming the no-duplicate guarantee for a class absent from the producer list refuses.
- Authority: EVIDENCE_ACQUISITION | Type: REPRESENTATION | Owner: MW | Slice: PI-3 | Bead: wb-1zn2 | Disposition: mw-tracker (also: wb-mwsy)
- Refines: EAT-R090, EAT-R044
- Claims: C1215 (SUPPORTED), C1217 (SUPPORTED, overclaims), C1214 (SUPPORTED, overclaims), C1324 (NON-EPISTEMIC), C1602 (NON-EPISTEMIC), C1450 (NON-EPISTEMIC)
- Relations: R00492, R00493, R00494, R00495, R00496, R00497, R00498, R00499, R00504, R00505, R00514, R00653, R00654, R00853
- Supersedes (Nov-4 ids, unchanged): C0570, C0571, C0421
- Sets / remediation: K111, K112 / M105, M106
- Rationale: At 97e18068 no exactly-once/at-most-once layer exists for develop() effects (SUPPORTED) but `idempotencyKey` / `IDEMPOTENCY_FINGERPRINT_INVALID` exist for Git-source publication, so the blanket 'no-duplicate effects remain to implement' overclaims (M106); mid-gate Forge cancel is already read as `FORGE_OPERATION_CANCELLED` (M105). The effect classes the guarantee must cover and the reconciliation contract are the named missing artifacts for wb-mwsy.
- Conditions: External MW deliverable; the in-flight SDK cancel itself remains EAT-R090. wb-mwsy keeps its Nov-4 landability (BEAD-PLAN row 15 carries no external gate); this row adds no gate to it, only the provisional-then-producer rule. Clause (c) is the MW half C1176 names as the missing artifact for 'complete'.
- Acceptance: The statement names each effect class with its identity key and the reconciliation call to make before retry; a Pi fixture test imports the class list from the published statement/schema (or, before delivery, from the Pi list marked `provisional (Pi)`) and asserts EAT-R044's denial for each class; the statement lists MW's app-local replay dimensions with measurement sources; the statement cites `git-source-publication.ts`'s fingerprint as the existing per-class guarantee.
- Adversarial mutant: Keep the Pi list unmarked as provisional after MW-R3 publishes (or claim the guarantee for a class absent from the producer list); the replace-with-producer assertion fails.
- Verification: program level L2; tiers L1, L2; gate PI-CANCEL-RECOVERY; run status: not run
- Evidence:
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/git-source-publication.ts:74-75", quote: "if(candidate.idempotencyKey!==publicationSemanticKey(candidate.basis,candidate.consumerContract,candidate.artifacts,candidate.requiredIds))\n    return "IDEMPOTENCY_FINGERPRINT_INVALID";"}
  - {pin: "mw@97e18068f399", path: "apps/development-rig/src/claude-implement.ts:37-39", quote: "Honoured as a pre-dispatch barrier only: a signal already\n   * aborted before the first provider side effect dispatches nothing. It is not forwarded to\n   * the SDK and an abort during a running session is not handled by this slice."}
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/01-current-system-audit.md:38", quote: "Mid-session cancel, dirty-write reconciliation, cross-host replay and no-duplicate effects remain to implement."}

## external-tracker — wb-1zn2 (slice PI-7; owner MW)

### EAT-R177 — Every MW cut MUST close the companion skill, docs/05-08 and 10, the rig README and modified schemas in the same cut

- Statement: Every MechanicalWorkflows implementation cut for MW-R1..R8 MUST update, in the same cut, `.agents/skills/mechanical-pi-host/SKILL.md`, `docs/05-deployable-entrypoints.md`, `docs/06-sdk-integration-and-hosts.md`, `docs/07-identity-effects-and-recovery.md`, `docs/08-qa-and-conformance.md`, `docs/10-current-state-and-gaps.md`, `apps/development-rig/README.md`, any modified `contracts/` schema and the RF skill/docs it affects, or mark each unchanged with a reason; a design commit MUST NOT mark `CURRENT` or set W11 shipped; existing `qa/integration/` receipts stay historical.
- Authority: LINGUISTIC_INTEGRITY | Type: REPRESENTATION | Owner: MW | Slice: PI-7 | Bead: wb-1zn2 | Disposition: mw-tracker
- Refines: EAT-R082
- Claims: C1376 (NON-EPISTEMIC), C1429 (NON-EPISTEMIC), C1490 (ESTABLISHED)
- Relations: R01081, R01201, R01309, R01333, R01404, R01413, R01433, R01441, R01446
- Supersedes (Nov-4 ids, unchanged): none
- Sets / remediation: K105 / —
- Rationale: 05:34 names the MW docs set per cut; the companion delivery program at mw-tip names the same files and the no-CURRENT rule; Mechanical's native receipts are dated 2026-10-15 and historical (ESTABLISHED). MW-owned mirror of EAT-R167.
- Conditions: External MW deliverable; file names verified present at mw@97e18068 (docs/05-08, docs/10, rig README, companion skill).
- Acceptance: MW's docs-closure check (or the tracker review entry) asserts each listed file is in the cut diff or marked unchanged with a reason; `CURRENT`/W11 are unchanged on design-only commits; a cut changing `claude-implement.ts` cancel semantics without touching docs/07 is flagged.
- Adversarial mutant: Change cancel semantics without touching docs/07-identity-effects-and-recovery.md; the check flags it.
- Verification: program level L0; tiers L0; gate none (tracker); run status: not run
- Evidence:
  - {pin: "pi@d7666a76f561", path: "docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/05-qa-operator-guide.md:34", quote: "Mechanical cuts update its companion skill, `docs/05/06/07/08/10`, developer README and any modified schemas."}
  - {pin: "mw-tip@6e15a4245d3f", path: "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:33", quote: "each code cut updates `docs/05`, `docs/06`, `docs/07`, `docs/08`, `docs/10`, `apps/development-rig/README.md`, `.agents/skills/mechanical-pi-host/SKILL.md`, and any RF-specific skill/docs affected. A design commit does not mark `CURRENT`"}

## Not owed (already done at the pins, or covered verbatim by EAT-R001..R143)

| Item | New-program claims | Covered by | Note |
|---|---|---|---|
| Per-agent skip/retry reproduction at a parked beforeDispatch (F10 variant with host.abortAgent) | C1114, C1162, C1543, C1617, C1618 | EAT-R015, EAT-R016 | wb-9v02 in_progress; the Nov-6 program restates the experiment; only the conditional repair shape is new (EAT-R160). |
| Runtime witness of the registered detached Claude path | C1154, C1424, C1480, C1481 | EAT-R012, EAT-R013, EAT-R014 | wb-wupg in_progress; the acceptance already drives the real preflight. |
| Protect the descriptor repair rather than re-implement it (MW-R0) | C1205, C1200, C1201, C1531 | EAT-R009, EAT-R007 | Pin equality is already the positive control; MW-R0 is an MW-owned confirm gate (npm pack + file-driven test), not a Pi requirement. |
| hx-task-scope-v1 / rf-committed-v1 field requirements (terminal task-scope, revision/query digest, complete coverage, absence authorization; nonempty render ID, output digest, graph revision, verified budget) | C1625, C1629, C1366 | EAT-R058, EAT-R059, EAT-R060, EAT-R061, EAT-R091 | Field lists are verbatim in the Nov-4 acceptances; MW-R5 = EAT-R091. |
| HX/RF gated track must not block the Git-census journey | C1318, C1528, C1551, C1225 | EAT-R062 | Block only the native profile. |
| Git-census usability from a Pi-hosted launch | C1628, C1488 | EAT-R054, EAT-R055, EAT-R056 | PI-GIT-CENSUS-LIVE is the settling artifact; only the wording repair M123 (EAT-R200) is owed. |
| Forge exit-0 / FAIL pairing | C1549 | EAT-R039, EAT-R081 | C0368 stays UNDETERMINED; wb-muip witnessed exit 1 / FAIL only. |
| Universal historical absence of a Pi -> Mechanical joined witness | C1255, C1548, C1493, C1256 | EAT-R080 | wb-muip LANDED (closed 2026-11-06T13:10Z) with global UNDETERMINED; the external-store census stays unauthorized (EAT-R080 conditions). |
| Host-wide limits independent of per-workflow semaphores; load QA | C1624, C1240, C1241, C1242, C1369 | EAT-R073, EAT-R074, EAT-R075, EAT-R076, EAT-R079 | wb-ny54 in_progress. |
| Immediate logical invocation ref with completion not-asserted; no node()/shell fallback; long-lived function registered and observable | C1603, C1604, C1451, C1452, C1145, C1146, C1313 | EAT-R032, EAT-R033, EAT-R035 | Acceptance of EAT-R032 already names completion not-asserted and forbids node fallback. |
| Function admitted only for an allowlisted installed descriptor + exact saved source digest; no arbitrary module path/string/shell | C1583, C1584, C1332, C14101, C14103 | EAT-R007, EAT-R010, EAT-R011, EAT-R027 | Allowlist and before-import validation are verbatim. |
| Final-dispatch re-read of workbench:execute, action grant, detach grant, Claude tool permissions, principal/session/realpath/caps | C1587, C1588, C1589, C1590, C1591, C14102 | EAT-R028, EAT-R029, EAT-R030, EAT-R031, EAT-R064, EAT-R073 | The grant literal itself is the MW-CONTRACT ruling (EAT-R151 names the adoption gate). |
| Intent before effect; dispatch separate from settlement; lost reply uncertain; no duplicate without reconciliation | C1600, C1601, C1602, C1450, C14106, C14107 | EAT-R041, EAT-R042, EAT-R043, EAT-R044 | The effect-class definition MW must supply is EAT-R176. |
| Cancel is a request, never rollback; late SDK success observable; inspector close does not kill an external Furnace Run | C1620, C1621, C1449, C14108, C1619 | EAT-R045, EAT-R046, EAT-R047, EAT-R050 | Only the representation of a cancelled execution is new (EAT-R157). |
| Pure coordination under a separate read-only export/permission; advisory only | C1630, C1631, C1616, C1368, C14120 | EAT-R071, EAT-R072, EAT-R093 | MW-R7 = EAT-R093. |
| Furnace-hosted mode optional; native Run/Work/Attempt only; no phantom ensure | C1612, C1571, C1319 | EAT-R068, EAT-R069, EAT-R070, EAT-R092 | MW-R6 = EAT-R092. |
| Four Mechanical arms kept separate from Promise/transport/Forge/Furnace; matching native Forge operation necessary for verified_candidate | C1607, C1608, C1613, C1614, C1615, C1184, C14109, C14110, C1364 | EAT-R036, EAT-R037, EAT-R038, EAT-R039, EAT-R040 | The seven-axis schema is the only addition (EAT-R156). |
| Clean isolated checkout; dirty base refused; single writer; recheck after async discovery; gate-manifest digest bound | C1595, C1596, C14104, C1312 | EAT-R022, EAT-R023, EAT-R024, EAT-R025, EAT-R026 | Verbatim coverage. |
| RF preview is not committed context | C1615, C1456, C1457, C1489, C1226, C1231 | EAT-R060 | Verbatim coverage. |
| Per-bead receipts only; no fabricated Beads or native IDs; receipt contents | C1338, C1301, C1494, C1377, C1374 | EAT-R086 | Only the reader/pin/witness/mutant/quiet-cases fields (EAT-R170) and level tags (EAT-R165) are added. |
| TRACEABILITY.md untouched; feedback append-only | C1378, C14114, C1379 | EAT-R087 | Feedback append-only is the agentic-feedback contract (Nov-4 C0103/C03126 lineage); no Pi test obligation beyond EAT-R087. |
| W11 stays planned until a registered Pi function flow and complete native receipts are measured; do not close an external gate on a grep or a model document | C1389, C1390, C1460, C1553, C1387, C1388 | EAT-R082, EAT-R085 | EAT-R167 adds only the per-cut file list. |
| No new GitHub CI; use Forge; no mandatory Library dependency | C1346, C1433, C14115 | EAT-R140, EAT-R084 | M047 form already landed (Nov-4); the 04:35 regression is repaired by EAT-R178 (M101); C1346 stands on AGENTS.md:167. |
| B-unknowns and B-hx-evidence deliveries | C1305, C1321, C1220, C1253 | EAT-R057, EAT-R080, EAT-R081 | Already done: wb-muip closed 2026-11-06T13:10Z, wb-f3wd closed 2026-11-06T18:27Z with receipts landed before d7666a76; only the M102 wording (EAT-R179) and the named-query leg (EAT-R163 on wb-pxvv) are owed. |
| First live acceptance journey steps 1-5 | C1370, C1371, C1372, C1373, C1374 | EAT-R054, EAT-R055, EAT-R056, EAT-R086 | Verbatim coverage of the PI-GIT-CENSUS-LIVE legs and receipt contents. |
| Collective-event boundary module is observation-only; no invocation host | C1129, C1537, C1538, C1539, C1144 | EAT-R032, EAT-R082 | Only the wording repairs M107/M118 (EAT-R184, EAT-R195) are owed. |
| Installed-environment inspection; author transcript; 'positives' feedback file | C1557, C1503, C1524 | — | Named missing artifacts with no operational consequence for a bead; recorded in EPISTEMIC-AUDIT §10, no requirement compiled. |

Not-owed rows: 27. Nothing else from the 343 material claims compiles to a new obligation; the remaining ESTABLISHED current-state rows are the premises of the Nov-4 set and keep their requirements there.
