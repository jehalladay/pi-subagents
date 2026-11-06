# ATOMIC REQUIREMENTS — Pi <-> MechanicalWorkflows interop design program (EAT set)

Generated 2026-11-06T06:05Z by Phase 10 step 9 (adversarial requirements audit).
Pins: doc@7c80c34346c2 (program docs) | pi@b27829e6dfa7 (environment) | mw@f7c0a9431d6c (environment).
Upstream inputs: CLAIMS.jsonl a626c68ca30b (490 claims) | RELATIONS.jsonl f0195fb21633 | REMEDIATION.md 09136019cded (50 rows).
Materialization note: step 8 left `build/compile.py` truncated (no emitter); this file was materialized by the step 9 auditor from that compiler data, v0 archived at `build/v0/`, then audited and fixed in place (see REQUIREMENTS-AUDIT.md).
Nothing in this file was run: every acceptance criterion is a design-phase specification; all test rows in TDD-MATRIX.md are **not run**.

Invariants: requirement force never upgrades claim warrant; every cited claim is shown with its triage status; a requirement citing a REFUTED/UNSUPPORTED/UNDETERMINED/PLAUSIBLE/CONTESTED claim must carry a condition naming that status; IDs EAT-R001..EAT-R143 are stable — additions append EAT-R144+, never renumber.

Authority legend: EMPIRICAL_REPAIR = defect verified at the pin; NORMATIVE_DECISION = adopted program design (proposal, not observed behavior); EVIDENCE_ACQUISITION = measurement owed before any claim upgrade; RISK_CONTROL = guardrail against an unproven hazard (does not assert the hazard occurred); LINGUISTIC_INTEGRITY = docs/wording obligation.

## Slice index

| Slice | Groups |
|---|---|
| PI-0 | preserve, docs, contract-choice, descriptor, unknowns, mw-contract |
| PI-1 | source, authority, dispatch |
| PI-2 | mw-host |
| PI-3 | outcomes, git-census, mw-cancel |
| PI-4 | cancel-repro, replay, effects, controls, observe |
| PI-5 | hx-evidence, hx-admit, rf-admit, mw-native |
| PI-6 | detached-grants, detached-function, furnace-function, mw-furnace |
| PI-7 | coordination, limits, telemetry, release, mw-coordination |

## preserve — P0 preserve edited worktrees when Git preservation fails

(slice PI-0; owner Pi)

> First bead. Source-established risk, no runtime loss observed. Existing false-clean characterization assertions conflict with the requested contract: obtain explicit approval to correct those specifications before changing them; never weaken or delete a safety test to fit code.

### EAT-R001 — Cleanup MUST retain recoverable edited bytes when preservation fails

- Statement: The cleanup MUST retain recoverable edited bytes when preservation fails.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-0 | Bead: preserve
- Claims: C0167 (ESTABLISHED), C0170 (ESTABLISHED), C0172 (NON-EPISTEMIC), C0347 (NON-EPISTEMIC)
- Relations: R00157, R00158, R00159, R00160, R00163, R00171, R00172, R00173, R00174, R00175, R00176, R00177
- Conditions: Failure path only; happy path already commits and branches. Existing characterization tests need an explicit specification ruling, not implementation-driven edits.
- Acceptance: In a real temporary Git worktree edit a tracked and an untracked file; inject commit failure and exhaustion of branch-name retries separately; cleanup leaves exact bytes reachable at the recovery path or a verified retained ref. Assert the original worktree remains when no preservation ref exists.
- Adversarial mutant: Restore the outer-catch force removal; the byte/readback assertion fails.

### EAT-R002 — Cleanup MUST distinguish failed preservation from a clean result

- Statement: The cleanup MUST distinguish failed preservation from a clean result.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-0 | Bead: preserve
- Claims: C0168 (ESTABLISHED), C0171 (ESTABLISHED)
- Relations: R00160, R00161, R00162, R00164, R00172, R00178, R00179, R00180, R00181, R00182, R00184, R00191
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: For commit, status and branch failures, assert a typed preservation-failed result with recovery path and diagnostic, never a clean/no-change outcome; serialization preserves that variant.
- Adversarial mutant: Return hasChanges:false from the failure branch.

### EAT-R003 — Pi MUST expose the cleanup recovery location to its caller

- Statement: Pi MUST expose the cleanup recovery location to its caller.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-0 | Bead: preserve
- Claims: C0171 (ESTABLISHED), C03146 (NON-EPISTEMIC)
- Relations: R00178, R00179, R00180, R00181, R00182, R00184, R00191, R01042, R01043, R01044, R01045, R01046
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Drive the real agent settlement path with preservation failure; assert returned record/observation identifies retained path and failure rather than displaying that the agent changed nothing.
- Adversarial mutant: Drop the typed recovery variant at the caller projection.

## docs — Land corrected program and audited triage through the workbench machine

(slice PI-0; owner Pi)

> Docs-only cut; no source or test edits. Program already exists at the Pi pin: land corrections plus the triage, not a duplicate program. This plan performs no commit, merge, push or filing. Delivery must use the live machine rules and real user authority, not this plan as consent.

### EAT-R004 — The docs cut MUST land the corrected program and triage on workbench trunk through the machine

- Statement: The docs cut MUST land the corrected program and triage on workbench trunk through the machine.
- Authority: NORMATIVE_DECISION | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C03115 (NON-EPISTEMIC), C03118 (NON-EPISTEMIC), C03119 (NON-EPISTEMIC), C03122 (ESTABLISHED)
- Relations: R00966, R00971, R00972, R00973, R00975, R00977, R01381, R01382, R01383, R01384, R01385, R01386
- Conditions: Standing user merge request supplies direction; machine admission and current repository authorizations must still be resolved. No landing was attempted here; scratch is not durable delivery.
- Acceptance: A qa/workbench/mechanical-docs-cut journey reads the machine landing receipt and tree: program plus triage/epistemic-triage and triage/requirements are reachable at the landed tree; diff contains only docs/skill data, no production/test changes; failed or absent machine receipt leaves landing unasserted.
- Adversarial mutant: Substitute a local unlanded tree or omit the triage map; acceptance refuses.

### EAT-R094 — Documentation MUST apply the M001 scoped correction for C0114

- Statement: The documentation MUST apply the M001 scoped correction for C0114.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0114 (SUPPORTED)
- Relations: R00023, R00024, X081
- Conditions: Use the exact scoped replacement in REMEDIATION M001; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L9 representation satisfies NARROW_SCOPE: Source implemented, tests recorded; per-bead receipts under `docs/workbench/receipts/` reference the Claude host (no receipt is dedicated to the executor) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0114 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M001 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L9

### EAT-R095 — Documentation MUST apply the M002 scoped correction for C0119

- Statement: The documentation MUST apply the M002 scoped correction for C0119.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0119 (SUPPORTED)
- Relations: R00034, R00035
- Conditions: Use the exact scoped replacement in REMEDIATION M002; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L10 representation satisfies NARROW_SCOPE: nested functions (one level; deeper nesting is refused) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0119 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M002 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L10

### EAT-R096 — Documentation MUST apply the M003 scoped correction for C0139

- Statement: The documentation MUST apply the M003 scoped correction for C0139.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0139 (ESTABLISHED)
- Relations: R00086, R00087, R00088, X100
- Conditions: Use the exact scoped replacement in REMEDIATION M003; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L13 representation satisfies NARROW_SCOPE: candidate basis and a producer verification result (its `evidence` field is optional) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0139 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M003 [row status: ESTABLISHED / overclaims] class NARROW_SCOPE at 01:L13

### EAT-R097 — Documentation MUST apply the M004 scoped correction for C0152

- Statement: The documentation MUST apply the M004 scoped correction for C0152.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0152 (SUPPORTED)
- Relations: R00113, R00114, R00115, R00116, R00509, X087, X088
- Conditions: Use the exact scoped replacement in REMEDIATION M004; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L15 representation satisfies ADD_TEMPORAL_QUALIFIER: Recorded live producer receipts (dated 2026-10-15, three weeks before the baseline); not a Pi binding Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0152 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M004 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L15

### EAT-R098 — Documentation MUST apply the M005 scoped correction for C0161

- Statement: The documentation MUST apply the M005 scoped correction for C0161.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0161 (SUPPORTED)
- Relations: R00129, R00130, R00131, R00132, R00133, R00143, R00533, R00555, X024, X025
- Conditions: Use the exact scoped replacement in REMEDIATION M005; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L17 representation satisfies NARROW_SCOPE: None registered: no Mechanical SDK dependency and no Mechanical function-host adapter (the only Mechanical-specific module is the read-only `collective.event.v1` envelope boundary `src/workbench/collective-event.ts`); Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0161 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M005 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L17

### EAT-R099 — Documentation MUST apply the M006 scoped correction for C0163

- Statement: The documentation MUST apply the M006 scoped correction for C0163.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0163 (SUPPORTED)
- Relations: R00136, R00137, R00138, R00139, R00140, R00141, R00145, R00539, R00541, X052, X053, X055
- Conditions: Use the exact scoped replacement in REMEDIATION M006; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L17 representation satisfies ADD_TEMPORAL_QUALIFIER: W11 row of `feature-matrix.md` (status `planned`; the row's embedded grep sentence predates `collective-event.ts` and is stale) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0163 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M006 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L17

### EAT-R100 — Documentation MUST apply the M007 scoped correction for C0167

- Statement: The documentation MUST apply the M007 scoped correction for C0167.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0167 (ESTABLISHED)
- Relations: R00157, R00158, R00159, R00160, R00163, R00171, R00500
- Conditions: Use the exact scoped replacement in REMEDIATION M007; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L23 representation satisfies DOWNGRADE_MODALITY: attempts to force-remove the worktree (`git worktree remove --force`, falling back to `git worktree prune`) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0167 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M007 [row status: ESTABLISHED / overclaims] class DOWNGRADE_MODALITY at 01:L23

### EAT-R101 — Documentation MUST apply the M008 scoped correction for C0169

- Statement: The documentation MUST apply the M008 scoped correction for C0169.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0169 (SUPPORTED)
- Relations: R00163, R00164, R00165, R00166, R00167, R00168, R00169, R00170
- Conditions: Use the exact scoped replacement in REMEDIATION M008; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L23 representation satisfies NARROW_SCOPE: The existing worktree tests assert the `hasChanges:false` report on this path and describe the destruction in comments; none asserts the removal, and they lock the lossy behaviour in rather than guard against it. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0169 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M008 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L23

### EAT-R102 — Documentation MUST apply the M009 scoped correction for C0182

- Statement: The documentation MUST apply the M009 scoped correction for C0182.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0182 (SUPPORTED)
- Relations: R00211, R00212, R00213, R00218, R00540, R00541, X054
- Conditions: Use the exact scoped replacement in REMEDIATION M009; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L27 representation satisfies ADD_TEMPORAL_QUALIFIER: W11 explicitly remains `planned` in the feature matrix (bead wb-04s blocked; the row's detection sentence is stale at the pin). Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0182 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M009 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L27

### EAT-R103 — Documentation MUST apply the M010 scoped correction for C0184

- Statement: The documentation MUST apply the M010 scoped correction for C0184.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0184 (SUPPORTED)
- Relations: R00222, R00223, R00224, R00225, R00226, R00227, R00553
- Conditions: Use the exact scoped replacement in REMEDIATION M010; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L27 representation satisfies NARROW_SCOPE: models definition kind `function`, while `src/workbench/execute-tool.ts:217-218` deliberately refuses all kinds except `script` (typed refusal `unsupported-definition-kind`; both halves are tested). Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0184 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M010 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L27

### EAT-R104 — Documentation MUST apply the M011 scoped correction for C0188

- Statement: The documentation MUST apply the M011 scoped correction for C0188.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0188 (REFUTED)
- Relations: R00229, R00230, R00231, R00232, R00233, R00552
- Conditions: Ledger extraction/edge correction only; do not edit the original norm as though it asserted the refuted existence claim.
- Acceptance: Assert the corrected 01:L27 representation satisfies REMOVE_CLAIM: ledger only: drop C0188 as an observation (the sentence is a prohibition on a remedy shape, not a description). Optional doc clarity: "do not route dispatch through `node()` (a bounded capability call) or any shell wrapper". Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0188 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M011 [row status: REFUTED] class REMOVE_CLAIM at 01:L27

### EAT-R105 — Documentation MUST apply the M012 scoped correction for C0189

- Statement: The documentation MUST apply the M012 scoped correction for C0189.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0189 (REFUTED)
- Relations: R00234, R00235, R00236, R00237, R00251, R00512, R00536, X005
- Conditions: Use the exact scoped replacement in REMEDIATION M012; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L31 representation satisfies ADD_TEMPORAL_QUALIFIER: declared (at MW `0c78e253`) input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`; MW `1f29daa7` (2026-11-05) rewrote them to the bare filenames Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0189 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M012 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L31

### EAT-R106 — Documentation MUST apply the M013 scoped correction for C0190

- Statement: The documentation MUST apply the M013 scoped correction for C0190.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0190 (REFUTED)
- Relations: R00238, R00239, R00240, R00241, R00252, R00513
- Conditions: Use the exact scoped replacement in REMEDIATION M013; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L31 representation satisfies ADD_TEMPORAL_QUALIFIER: same edit as C0189 (one sentence carries both refs) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0190 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M013 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L31

### EAT-R107 — Documentation MUST apply the M014 scoped correction for C0193

- Statement: The documentation MUST apply the M014 scoped correction for C0193.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0193 (REFUTED)
- Relations: R00246, R00247, R00248, R00249, R00250, R00263, X004, X007, X009, X010, X011
- Conditions: Use the exact scoped replacement in REMEDIATION M014; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L31 representation satisfies ADD_TEMPORAL_QUALIFIER: tests constructed matching descriptors by hand at `0c78e253`; since `1f29daa7` three rig tests read the committed JSON and one drives both hosts from it over a packed tarball (not run here) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0193 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M014 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L31

### EAT-R108 — Documentation MUST apply the M015 scoped correction for C0194

- Statement: The documentation MUST apply the M015 scoped correction for C0194.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0194 (REFUTED)
- Relations: R00251, R00252, R00253, R00254, R00255, R00256, R00257, R00258, R00267, R00527, R00559, X001
- Conditions: Use the exact scoped replacement in REMEDIATION M015; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L31 representation satisfies ADD_TEMPORAL_QUALIFIER: At `0c78e253` the as-committed descriptor therefore failed the host's descriptor check; at `f7c0a943` the committed strings equal the host's strings. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0194 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M015 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L31

### EAT-R109 — Documentation MUST apply the M016 scoped correction for C0195

- Statement: The documentation MUST apply the M016 scoped correction for C0195.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0195 (REFUTED)
- Relations: R00258, R00259, R00260, R00261, R00262, R00271, R00530, X003
- Conditions: Use the exact scoped replacement in REMEDIATION M016; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L29 representation satisfies ADD_TEMPORAL_QUALIFIER: ### P1 (repaired upstream by MW `1f29daa7`): checked-in Mechanical descriptor conflicted with its own loader at `0c78e253` Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0195 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M016 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L29

### EAT-R110 — Documentation MUST apply the M017 scoped correction for C0196

- Statement: The documentation MUST apply the M017 scoped correction for C0196.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0196 (REFUTED)
- Relations: R00263, R00264, R00265, R00266
- Conditions: Use the exact scoped replacement in REMEDIATION M017; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L65 representation satisfies ADD_TEMPORAL_QUALIFIER: a descriptor built manually in tests does not establish compatibility with that file (the `0c78e253` tests did this; the `f7c0a943` tests read the committed file). Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0196 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M017 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 01:L65

### EAT-R111 — Documentation MUST apply the M018 scoped correction for C0218

- Statement: The documentation MUST apply the M018 scoped correction for C0218.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0218 (ESTABLISHED)
- Relations: R00336, R00337, R00338, R00340, R00343, R00350
- Conditions: Use the exact scoped replacement in REMEDIATION M018; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L43 representation satisfies NARROW_SCOPE: includes cwd/model/permissions/settings/tools/roles/grants/principal Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0218 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M018 [row status: ESTABLISHED / overclaims] class NARROW_SCOPE at 01:L43

### EAT-R112 — Documentation MUST apply the M019 scoped correction for C0229

- Statement: The documentation MUST apply the M019 scoped correction for C0229.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0229 (SUPPORTED)
- Relations: R00367, R00368, R00369, R00370, R00371, R00372, R00373, R00384, R00392, R00529, R00560, R00561
- Conditions: Use the exact scoped replacement in REMEDIATION M019; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L47 representation satisfies ADD_TEMPORAL_QUALIFIER: with (at `0c78e253`) no host-supplied AbortSignal in its public options; MW `f7c0a943` adds `signal?: AbortSignal` honoured only as a pre-dispatch barrier and not forwarded to the SDK, so mid-run cancellation is still absent Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0229 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M019 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L47

### EAT-R113 — Documentation MUST apply the M020 scoped correction for C0231

- Statement: The documentation MUST apply the M020 scoped correction for C0231.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0231 (SUPPORTED)
- Relations: R00379, R00380, R00381, R00382, R00386, R00535, X063, X064, X065
- Conditions: Use the exact scoped replacement in REMEDIATION M020; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L47 representation satisfies ADD_MISSING_PREMISE: Pi's `node()` is a single bounded request/response capability call (default registry deadline 30 s, configurable) with no mid-run observation or control surface, so it cannot substitute for an async, observable function launch. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0231 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M020 [row status: SUPPORTED / overclaims] class ADD_MISSING_PREMISE at 01:L47

### EAT-R114 — Documentation MUST apply the M021 scoped correction for C0248

- Statement: The documentation MUST apply the M021 scoped correction for C0248.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0248 (ESTABLISHED)
- Relations: R00423, R00424, R00425, R00426, R00436
- Conditions: Use the exact scoped replacement in REMEDIATION M021; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L55 representation satisfies NARROW_SCOPE: Mechanical `renderTaskContext` expects a nonempty `render_id` (a committed render: its rf argv omits `--no-commit`) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0248 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M021 [row status: ESTABLISHED / overclaims] class NARROW_SCOPE at 01:L55

### EAT-R115 — Documentation MUST apply the M022 scoped correction for C0251

- Statement: The documentation MUST apply the M022 scoped correction for C0251.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0251 (UNSUPPORTED)
- Relations: R00429, R00430, R00431, R00432, R00433, R00434, R00439
- Conditions: Use the exact scoped replacement in REMEDIATION M022; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L55 representation satisfies REPLACE_SOURCE: the rig adapter's enforced RF-context requirements (`apps/development-rig/src/rf-context.ts`: nonempty `render_id`, task/revision text, provenance/budget witness; receipt rule in MW `docs/07`) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0251 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M022 [row status: UNSUPPORTED] class REPLACE_SOURCE at 01:L55

### EAT-R116 — Documentation MUST apply the M023 scoped correction for C0252

- Statement: The documentation MUST apply the M023 scoped correction for C0252.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0252 (SUPPORTED)
- Relations: R00435, R00436, R00437, R00438, R00439, R00440, R00441, R00442, R00443, R00444
- Conditions: Use the exact scoped replacement in REMEDIATION M023; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L55 representation satisfies NARROW_SCOPE: Reusing Pi's preview response as the rig's `renderTaskContext`-backed `compileContext` would fail its RF-context checks (`RF_CONTEXT_UNESTABLISHED`: `render_id` null); the `develop()` `compileContext` port itself checks only basis equality. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0252 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M023 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 01:L55

### EAT-R117 — Documentation MUST apply the M024 scoped correction for C0261

- Statement: The documentation MUST apply the M024 scoped correction for C0261.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0261 (ESTABLISHED)
- Relations: R00466, R00467, R00468, R00469, R00470
- Conditions: Use the exact scoped replacement in REMEDIATION M024; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L59 representation satisfies NARROW_SCOPE: `new Semaphore(options.concurrency ?? ...)` can otherwise accept zero (no production caller passes `options.concurrency` and the default clamps to [1,16]; the exposure is programmatic/test-only) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0261 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M024 [row status: ESTABLISHED / overclaims] class NARROW_SCOPE at 01:L59

### EAT-R118 — Documentation MUST apply the M025 scoped correction for C0264

- Statement: The documentation MUST apply the M025 scoped correction for C0264.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0264 (SUPPORTED)
- Relations: R00476, R00477, R00478, R00544, R00547, R00548, X075
- Conditions: Use the exact scoped replacement in REMEDIATION M025; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L59 representation satisfies ADD_TEMPORAL_QUALIFIER: Review `new-feedback/` findings (2026-10-20 to 2026-11-03, one flywheel-seat lineage) on shared census edit conflicts, Vitest default-timeout reds (October files), report-mode census readers (October files) and prep bottlenecks Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0264 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M025 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L59

### EAT-R119 — Documentation MUST apply the M026 scoped correction for C0265

- Statement: The documentation MUST apply the M026 scoped correction for C0265.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0265 (SUPPORTED)
- Relations: R00479, R00480, R00481, R00545, R00548, R00549
- Conditions: Use the exact scoped replacement in REMEDIATION M026; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L59 representation satisfies ADD_TEMPORAL_QUALIFIER: report-mode census readers (October files) -- same edit as C0264 Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0265 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M026 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L59

### EAT-R120 — Documentation MUST apply the M027 scoped correction for C0277

- Statement: The documentation MUST apply the M027 scoped correction for C0277.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0277 (ESTABLISHED)
- Relations: R00512, R00513, R00514, R00515, R00516, R00517, R00518, R00559, X012
- Conditions: Use the exact scoped replacement in REMEDIATION M027; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 01:L65 representation satisfies ADD_TEMPORAL_QUALIFIER: The Mechanical descriptor path discrepancy (present at `0c78e253`, repaired by `1f29daa7`) is independently checkable against the exact committed JSON and TypeScript host, and at `f7c0a943` the check yields a match; Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0277 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M027 [row status: ESTABLISHED / overclaims] class ADD_TEMPORAL_QUALIFIER at 01:L65

### EAT-R121 — Documentation MUST apply the M028 scoped correction for C0521

- Statement: The documentation MUST apply the M028 scoped correction for C0521.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0521 (SUPPORTED)
- Relations: R00578, R00617, R00618, R00619, X086
- Conditions: Use the exact scoped replacement in REMEDIATION M028; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 02:L32 representation satisfies NARROW_SCOPE: // from the committed descriptor (`contracts/entrypoints/development.v1.json`, self-described `descriptor-only`; install flow verified in tests, not a standing installed artifact) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0521 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M028 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 02:L32

### EAT-R122 — Documentation MUST apply the M029 scoped correction for C0522

- Statement: The documentation MUST apply the M029 scoped correction for C0522.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0522 (NON-EPISTEMIC)
- Relations: R00579, R00636, X044, X051
- Conditions: KU10 remains unresolved; surface both same-lineage proposals and record MW-CONTRACT adoption as pending. Do not choose a selector through wording repair.
- Acceptance: Assert the corrected 02:L36-42 representation satisfies SURFACE_DISAGREEMENT: profile: "git-census" | "native-task-scope"; // MW counterpart doc (02-binding-and-packaging-contract.md:25) names this field `mode`; choose one name before implementation Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0522 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M029 [row status: NON-EPISTEMIC (set KG02-03 CONTESTED)] class SURFACE_DISAGREEMENT at 02:L36-42

### EAT-R123 — Documentation MUST apply the M030 scoped correction for C0530

- Statement: The documentation MUST apply the M030 scoped correction for C0530.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0530 (REFUTED)
- Relations: R00583, R00622, R00623, X005
- Conditions: Use the exact scoped replacement in REMEDIATION M030; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 02:L48 representation satisfies ADD_TEMPORAL_QUALIFIER: Mechanical checks the descriptor schema names in `invokePinnedDevelopment`; at `0c78e253` it shipped relative (`../schemas/`) paths, repaired to bare filenames by `1f29daa7` (2026-11-05), so the canonical grammar below is partly adopted upstream. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0530 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M030 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 02:L48

### EAT-R124 — Documentation MUST apply the M031 scoped correction for C0534

- Statement: The documentation MUST apply the M031 scoped correction for C0534.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0534 (REFUTED)
- Relations: R00585, R00624, R00625, X007
- Conditions: Use the exact scoped replacement in REMEDIATION M031; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 02:L48 representation satisfies MARK_AS_DEFINITION: Pi must consume the canonical exported descriptor and must not add tests that substitute a hand-authored object (the hand-authored descriptor tests were MechanicalWorkflows', made file-driven by `1f29daa7`; Pi has none). Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0534 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M031 [row status: REFUTED] class MARK_AS_DEFINITION at 02:L48

### EAT-R125 — Documentation MUST apply the M032 scoped correction for C0305

- Statement: The documentation MUST apply the M032 scoped correction for C0305.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0305 (REFUTED)
- Relations: R00651, R00660, R00661, R00662, R00663, R00664, R00665, R01237, R01252, R01253, R01254, R01255
- Conditions: Use the exact scoped replacement in REMEDIATION M032; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L7 representation satisfies ADD_TEMPORAL_QUALIFIER: Pin baseline; confirm the descriptor/host schema-ref reconciliation that landed upstream (MW `1f29daa7`) and adopt its grammar; signed-off audit inventory Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0305 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M032 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 03:L7

### EAT-R126 — Documentation MUST apply the M033 scoped correction for C0312

- Statement: The documentation MUST apply the M033 scoped correction for C0312.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0312 (NON-EPISTEMIC)
- Relations: R00680, R00681, R00682, R00683, R00684, R00685, R00840, R01249, R01343, R01344, R01345, R01346
- Conditions: Ledger extraction/edge correction only; do not edit the original norm as though it asserted the refuted existence claim.
- Acceptance: Assert the corrected 03:L9 representation satisfies ADD_MISSING_PREMISE: ledger only: depends_on C03111 (four outcome variants) -> C0547 (DevelopmentServices declares discover/compileContext/implement/verify) and the descriptor `bindings` array; doc wording unchanged Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0312 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M033 [row status: NON-EPISTEMIC / overclaims] class ADD_MISSING_PREMISE at 03:L9

### EAT-R127 — Documentation MUST apply the M034 scoped correction for C0315

- Statement: The documentation MUST apply the M034 scoped correction for C0315.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0315 (SUPPORTED)
- Relations: R00678, R00690, R00691, R00692, R00693
- Conditions: Use the exact scoped replacement in REMEDIATION M034; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L9 representation satisfies ADD_SOURCE: Versioned, independently importable `develop` host binding from its rig (today `@mechanical/development-rig` exposes only a `bin`, no `main`/`exports`; tests deep-import `dist/`) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0315 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M034 [row status: SUPPORTED / overclaims] class ADD_SOURCE at 03:L9

### EAT-R128 — Documentation MUST apply the M035 scoped correction for C0320

- Statement: The documentation MUST apply the M035 scoped correction for C0320.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0320 (REFUTED)
- Relations: R00694, R00701, R00702, R00703, R00704, R00705, R01288, R01289, R01290, R01291, R01292, R01293
- Conditions: Use the exact scoped replacement in REMEDIATION M035; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L10 representation satisfies ADD_MISSING_PREMISE: using the existing tracked-file census path of `developLive` (`discovery: "git-tracked-files"`), which this program labels `git-census` (no such selector ships at MW `f7c0a943`) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0320 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M035 [row status: REFUTED] class ADD_MISSING_PREMISE at 03:L10

### EAT-R129 — Documentation MUST apply the M036 scoped correction for C0321

- Statement: The documentation MUST apply the M036 scoped correction for C0321.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0321 (UNDETERMINED)
- Relations: R00695, R00706, R00707, R01245, X078
- Conditions: Use the exact scoped replacement in REMEDIATION M036; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L10 representation satisfies PRESERVE_AS_UNDETERMINED: First Pi → Mechanical `develop` witnessed in-repo (neither repository holds a receipt of any prior run; runs outside the repos were not checked) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0321 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M036 [row status: UNDETERMINED / overclaims] class PRESERVE_AS_UNDETERMINED at 03:L10

### EAT-R130 — Documentation MUST apply the M037 scoped correction for C0336

- Statement: The documentation MUST apply the M037 scoped correction for C0336.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0336 (REFUTED)
- Relations: R00739, R00740, R00741, R00742, R00743, R00744, R01237, R01238, R01262, R01263, R01264, R01265
- Conditions: Use the exact scoped replacement in REMEDIATION M037; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L18 representation satisfies ADD_TEMPORAL_QUALIFIER: 1. Confirm the MW repair of the checked-in descriptor versus `entrypoint-host.ts` (`1f29daa7`: bare filenames; tests now read the committed file and a packed tarball, not run here) and keep the file-driven tests. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0336 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M037 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 03:L18

### EAT-R131 — Documentation MUST apply the M038 scoped correction for C0338

- Statement: The documentation MUST apply the M038 scoped correction for C0338.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0338 (REFUTED)
- Relations: R00745, R00750, R00751, R00752, R00753, R00754, R00755, R01029, R01248, R01282, R01283, R01284
- Conditions: Use the exact scoped replacement in REMEDIATION M038; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L18 representation satisfies ADD_TEMPORAL_QUALIFIER: same edit as C0336 (one unblocker line) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0338 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M038 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at 03:L18

### EAT-R132 — Documentation MUST apply the M039 scoped correction for C0346

- Statement: The documentation MUST apply the M039 scoped correction for C0346.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0346 (SUPPORTED)
- Relations: R00782, R00783, R00784, R00785, R00786, R00787, R00788, R00789, R00790, R00848, R01193, R01317
- Conditions: Use the exact scoped replacement in REMEDIATION M039; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L21 representation satisfies NARROW_SCOPE: 4. Fix `cleanupWorktree`'s failure path, which force-removes a modified worktree and reports `hasChanges:false` when the preservation commit or branch step fails (the normal path commits and branches before removal) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0346 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M039 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 03:L21

### EAT-R133 — Documentation MUST apply the M040 scoped correction for C0353

- Statement: The documentation MUST apply the M040 scoped correction for C0353.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0353 (PLAUSIBLE)
- Relations: R00709, R00811, R00812, R00813, R00814, R00815, R00816, R00817, R00818, R00819, R00820, R00821
- Conditions: Use the exact scoped replacement in REMEDIATION M040; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L22 representation satisfies NARROW_SCOPE: test per-agent skip/retry (the suspected gap: no controller exists during the await) and workflow cancel (already re-checked after the await and covered by fault test F10; keep as a control) while startup is parked Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0353 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M040 [row status: PLAUSIBLE / overclaims] class NARROW_SCOPE at 03:L22

### EAT-R134 — Documentation MUST apply the M041 scoped correction for C0356

- Statement: The documentation MUST apply the M041 scoped correction for C0356.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0356 (SUPPORTED)
- Relations: R00823, R00827, R00828, R00829, R00830, R00831, R00832, R00833, R01246, R01295, R01296, R01297
- Conditions: Use the exact scoped replacement in REMEDIATION M041; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L23 representation satisfies NARROW_SCOPE: current tracked-file census mode of `developLive` (called `git-census` here; the separate `live-composition` root wires HX task scope) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0356 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M041 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at 03:L23

### EAT-R135 — Documentation MUST apply the M042 scoped correction for C0368

- Statement: The documentation MUST apply the M042 scoped correction for C0368.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0368 (UNDETERMINED)
- Relations: R00850, R00856, R00857, R00858, R00859
- Conditions: Use the exact scoped replacement in REMEDIATION M042; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L33 representation satisfies PRESERVE_AS_UNDETERMINED: transport exit 0 with a failed gate (simulated mutant; whether native Forge ever produces this pairing is not established here) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0368 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M042 [row status: UNDETERMINED / overclaims] class PRESERVE_AS_UNDETERMINED at 03:L33

### EAT-R136 — Documentation MUST apply the M043 scoped correction for C03106

- Statement: The documentation MUST apply the M043 scoped correction for C03106.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C03106 (SUPPORTED)
- Relations: R00938, R00942, R00943, R00944, R00945, R00946, X080, X081
- Conditions: Use the exact scoped replacement in REMEDIATION M043; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected 03:L55 representation satisfies DOWNGRADE_MODALITY: Existing Pi *script* workflows (source implemented, tests recorded; not run for this audit) do not regress Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C03106 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M043 [row status: SUPPORTED / overclaims] class DOWNGRADE_MODALITY at 03:L55

### EAT-R137 — Documentation MUST apply the M044 scoped correction for C03141

- Statement: The documentation MUST apply the M044 scoped correction for C03141.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C03141 (UNSUPPORTED)
- Relations: R01021, R01026, R01027, R01028
- Conditions: Ledger extraction/edge correction only; do not edit the original norm as though it asserted the refuted existence claim.
- Acceptance: Assert the corrected 04:L38 representation satisfies REMOVE_CLAIM: ledger only: drop C03141 as an existence observation; the line is a prohibited pattern. Doc unchanged. (Out of scope note: MW README:47 still states the descriptor mismatch in the present tense at mw@f7c0a943.) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C03141 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M044 [row status: UNSUPPORTED] class REMOVE_CLAIM at 04:L38

### EAT-R138 — Documentation MUST apply the M045 scoped correction for C0402

- Statement: The documentation MUST apply the M045 scoped correction for C0402.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0402 (SUPPORTED)
- Relations: R01055, R01056, R01057, R01107, R01367, R01368, R01369, R01370, R01371, R01372, R01373, X071
- Conditions: Use the exact scoped replacement in REMEDIATION M045; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected README:L4 representation satisfies ADD_TEMPORAL_QUALIFIER: **Audit baseline (2026-11-04 US-Pacific; Pi `f67b6665` committed 2026-11-05 05:57Z, MW `0c78e253` committed 2026-11-02 21:17Z):** Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0402 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M045 [row status: SUPPORTED / overclaims] class ADD_TEMPORAL_QUALIFIER at README:L4

### EAT-R139 — Documentation MUST apply the M046 scoped correction for C0409

- Statement: The documentation MUST apply the M046 scoped correction for C0409.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0409 (SUPPORTED)
- Relations: R01074, R01075, R01076, R01077, X070
- Conditions: Use the exact scoped replacement in REMEDIATION M046; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected README:L7 representation satisfies DOWNGRADE_MODALITY: by the authors' account no new test, live integration, Forge gate or benchmark ran in preparation for these docs (the program commit is docs-only) Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0409 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M046 [row status: SUPPORTED / overclaims] class DOWNGRADE_MODALITY at README:L7

### EAT-R140 — Documentation MUST apply the M047 scoped correction for C0422

- Statement: The documentation MUST apply the M047 scoped correction for C0422.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0422 (NON-EPISTEMIC)
- Relations: R00916, R01098, R01099, R01100, R01335, R01336, R01337, R01338
- Conditions: Use the exact scoped replacement in REMEDIATION M047; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected README:L24 representation satisfies NARROW_SCOPE: Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0422 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M047 [row status: NON-EPISTEMIC / overclaims] class NARROW_SCOPE at README:L24

### EAT-R141 — Documentation MUST apply the M048 scoped correction for C0437

- Statement: The documentation MUST apply the M048 scoped correction for C0437.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0437 (REFUTED)
- Relations: R00660, R00739, R01142, R01143, R01144, R01145, R01146, R01147, R01238, R01272, R01273, R01274
- Conditions: Use the exact scoped replacement in REMEDIATION M048; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected SKILL:L14 representation satisfies ADD_TEMPORAL_QUALIFIER: Mechanical's checked-in descriptor and its entrypoint host disagreed about schema reference spelling at `0c78e253`; they agree since MW `1f29daa7` (bare filenames). Keep testing the checked-in file, not a constructed approximation. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0437 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M048 [row status: REFUTED] class ADD_TEMPORAL_QUALIFIER at SKILL:L14

### EAT-R142 — Documentation MUST apply the M049 scoped correction for C0443

- Statement: The documentation MUST apply the M049 scoped correction for C0443.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0443 (SUPPORTED)
- Relations: R00701, R00827, R01167, R01168, R01169, R01170, R01171, R01246, R01247, R01302, R01303, R01304
- Conditions: Use the exact scoped replacement in REMEDIATION M049; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected SKILL:L16 representation satisfies NARROW_SCOPE: Mechanical's `developLive` tracked-file census (called Git-census here; no selectable profile ships) is implemented, with 2026-10-15 rig receipts, but it is not certified task-scoped HX. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0443 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M049 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at SKILL:L16

### EAT-R143 — Documentation MUST apply the M050 scoped correction for C0446

- Statement: The documentation MUST apply the M050 scoped correction for C0446.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-0 | Bead: docs
- Claims: C0446 (SUPPORTED)
- Relations: R00706, R01180, R01181, R01245, X079
- Conditions: Use the exact scoped replacement in REMEDIATION M050; do not upgrade the source status or turn not run into PASS.
- Acceptance: Assert the corrected SKILL:L16 representation satisfies NARROW_SCOPE: No Pi-to-Mechanical end-to-end acceptance receipt exists in either repository. Preserve the original pin and status in the triage map.
- Adversarial mutant: Restore the overstrong C0446 wording or remove its required qualifier; the targeted document predicate fails.
- Remediation: M050 [row status: SUPPORTED / overclaims] class NARROW_SCOPE at SKILL:L16

## contract-choice — Adopt the Pi side of one versioned cross-repository invocation contract

(slice PI-0; owner Pi; external: MW-CONTRACT)

> Do not decide profile versus mode by counting same-author documents. Both remain proposals; implementation blocked on a jointly adopted producer contract.

### EAT-R005 — Pi MUST consume one explicitly adopted selector spelling

- Statement: Pi MUST consume one explicitly adopted selector spelling.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: contract-choice
- Claims: C0522 (NON-EPISTEMIC), C0555 (NON-EPISTEMIC), C0557 (NON-EPISTEMIC)
- Relations: R00579, R00592, R00593, R00594, R00595, R00636, R00638, R00639, R00641, X044, X045, X051
- Conditions: KU10 remains CONTESTED between NON-EPISTEMIC proposals; named decision MW-CONTRACT must choose the ABI before this cut. No choice is claimed here.
- Acceptance: Validate a producer-published contract fixture with the chosen selector; round-trip accepted field and reject the other spelling and requests containing both.
- Adversarial mutant: Accept both profile and mode silently.

### EAT-R006 — Pi MUST reject unsupported invocation contract versions

- Statement: Pi MUST reject unsupported invocation contract versions.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: contract-choice
- Claims: C0520 (NON-EPISTEMIC), C0561 (NON-EPISTEMIC), C0501 (ESTABLISHED)
- Relations: R00564, R00565, R00566, R00567, R00568, R00569, R00570, R00571, R00572, R00573, R00574, R00575
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Pass a valid adopted v1 fixture then mutate version, unknown field and wrong definition kind; assert typed refusal with no import or provider call.
- Adversarial mutant: Bypass contract version validation.

## descriptor — Validate the actual published descriptor and artifact at the Pi boundary

(slice PI-0; owner Pi; external: MW-CONTRACT, MW-PACKAGE; gate: MW-INSTALLED-CONSUMER)

### EAT-R007 — Pi MUST read the exact producer descriptor file

- Statement: Pi MUST read the exact producer descriptor file.
- Authority: NORMATIVE_DECISION | Type: verification | Owner: Pi | Slice: PI-0 | Bead: descriptor
- Claims: C0303 (NON-EPISTEMIC), C0337 (NON-EPISTEMIC), C0357 (NON-EPISTEMIC), C0438 (NON-EPISTEMIC), C0534 (REFUTED)
- Relations: R00585, R00624, R00625, R00653, R00654, R00655, R00745, R00746, R00747, R00748, R00749, R00750
- Conditions: C0534 REFUTED concerns supposed existing Pi tests; this is a new normative consumer regression, not a repair of those nonexistent tests.
- Acceptance: Load the descriptor shipped with the pinned package and compare its byte digest with the producer release manifest; invoke the real installed host once, without an MW checkout. A hand-authored equivalent object is not accepted as the fixture source.
- Adversarial mutant: Replace the corpus fixture with an object literal and change the producer file; the digest test fails.

### EAT-R008 — Pi MUST refuse artifact bytes that differ from their SHA-256 pin

- Statement: Pi MUST refuse artifact bytes that differ from their SHA-256 pin.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: descriptor
- Claims: C0525 (NON-EPISTEMIC), C0358 (NON-EPISTEMIC)
- Relations: R00580, R00581, R00835
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Flip one byte in a packed artifact after descriptor resolution; assert refusal before import and zero provider calls; exact installed bytes pass.
- Adversarial mutant: Hash the filename or reuse an earlier digest without measuring bytes.

### EAT-R009 — Pi MUST refuse noncanonical schema references

- Statement: Pi MUST refuse noncanonical schema references.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: descriptor
- Claims: C0532 (NON-EPISTEMIC), C0536 (NON-EPISTEMIC), C0194 (REFUTED)
- Relations: R00251, R00252, R00253, R00254, R00255, R00256, R00257, R00258, R00267, R00527, R00559, R00584
- Conditions: Descriptor mismatch premise C0194 is REFUTED at MW pin; upstream repair is not owed. These are consumer regression controls only.
- Acceptance: Consume bare canonical names; mutate to ../schemas, absolute path, URL and unknown schema. Assert refusal before import. Pin equality is the positive control, not an assumed mismatch.
- Adversarial mutant: Normalize arbitrary traversal into an accepted basename.

### EAT-R010 — Pi MUST refuse package or export outside its fixed allowlist

- Statement: Pi MUST refuse package or export outside its fixed allowlist.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: descriptor
- Claims: C0523 (NON-EPISTEMIC), C0524 (NON-EPISTEMIC)
- Relations: R00580
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Using the actual descriptor fixture mutate package and export independently; assert no loader call; accepted ID resolves exactly one reviewed host export.
- Adversarial mutant: Use caller package/export strings as import targets.

### EAT-R011 — Pi MUST refuse symlink escapes during artifact resolution

- Statement: Pi MUST refuse symlink escapes during artifact resolution.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-0 | Bead: descriptor
- Claims: C0525 (NON-EPISTEMIC)
- Relations: R00580, R00581
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Materialize an artifact link resolving outside approved root and a link changed between validation and load; assert refusal without executing an import side effect.
- Adversarial mutant: Use lexical prefix containment without realpath or revalidation.

## detached-grants — Repair both registered detached Claude grant producers

(slice PI-6; owner Pi; gate: PI-DETACHED-GRANTS)

> Independent of embedded function launch; preserve local-detached validators. workflow_detached defaults deterministic even though tool registration is Claude-config gated: only its explicitly selected Claude backend has this defect.

### EAT-R012 — Registered workflow_execute MUST pass host-validated detached Claude grants

- Statement: The registered workflow_execute MUST pass host-validated detached Claude grants.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-6 | Bead: detached-grants
- Claims: C0200 (ESTABLISHED), C0201 (ESTABLISHED), C0202 (ESTABLISHED), C0203 (ESTABLISHED), C0204 (ESTABLISHED), C0206 (NON-EPISTEMIC)
- Relations: R00273, R00274, R00275, R00276, R00277, R00278, R00279, R00280, R00281, R00282, R00283, R00284
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Invoke actual registered workflow_execute with detached mode under Claude settings, reviewed source and authorized execute/detach/invoke/exact role tool rights; pass real detached preflight. Remove each right in turn and assert zero child launches.
- Adversarial mutant: Restore grants:[] at index.ts detached workflow_execute producer.

### EAT-R013 — Registered workflow_detached MUST pass host-validated grants when Claude is selected

- Statement: The registered workflow_detached MUST pass host-validated grants when Claude is selected.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-6 | Bead: detached-grants
- Claims: C0205 (ESTABLISHED), C0586 (ESTABLISHED), C0344 (NON-EPISTEMIC)
- Relations: R00290, R00291, R00292, R00293, R00294, R00524, R00531, R00554, R00609, R00630, R00775, R00776
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Invoke actual workflow_detached with backend claude and authorized exact SDK tool grants; real preflight accepts; absent invoke or role tool grant refuses. Deterministic default remains a separate control.
- Adversarial mutant: Restore grants:[] at the second producer, leaving the first repaired.

### EAT-R014 — Detached Claude preflight MUST continue rejecting absent SDK rights

- Statement: The detached Claude preflight MUST continue rejecting absent SDK rights.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-6 | Bead: detached-grants
- Claims: C0202 (ESTABLISHED), C0203 (ESTABLISHED), C0442 (NON-EPISTEMIC)
- Relations: R00279, R00280, R00283, R00284, R01163, R01164, R01165, R01166, X030, X032, X036
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Drive registered tools with forged grants in JSON policy and missing host invoke or tool rights; assert unchanged validator denial before launch.
- Adversarial mutant: Remove the local-detached claude:invoke check.

## cancel-repro — Reproduce parked per-agent skip and retry before choosing a repair

(slice PI-4; owner Pi)

> Evidence-first bead may land a bounded experiment and pending status without a production fix. A witnessed red authorizes a separate repair proposal; it must not close PI-4.

### EAT-R015 — The cancellation experiment MUST measure skip at parked beforeDispatch

- Statement: The cancellation experiment MUST measure skip at parked beforeDispatch.
- Authority: EVIDENCE_ACQUISITION | Type: evidence-acquisition | Owner: Pi | Slice: PI-4 | Bead: cancel-repro
- Claims: C0213 (SUPPORTED), C0214 (ESTABLISHED), C0215 (NON-EPISTEMIC), C0216 (NON-EPISTEMIC), C0353 (PLAUSIBLE)
- Relations: R00317, R00318, R00319, R00320, R00321, R00322, R00323, R00324, R00325, R00326, R00327, R00328
- Conditions: C0213 SUPPORTED hypothesis and C0353 PLAUSIBLE widening, unreproduced. No fixed claim until measured failure then repair. Run-level abort is already guarded.
- Acceptance: Park the actual host beforeDispatch; issue runtime skip; release; retain sdk call count and settlement. Desired safety oracle is zero SDK starts and skipped result. Record observed violation or failed reproduction. Keep existing run-signal F10 and no-abort one-call controls.
- Adversarial mutant: Remove the parked barrier or replace skip with whole-run abort; experiment validation rejects the wrong seam.

### EAT-R016 — The cancellation experiment MUST measure retry at parked beforeDispatch

- Statement: The cancellation experiment MUST measure retry at parked beforeDispatch.
- Authority: EVIDENCE_ACQUISITION | Type: evidence-acquisition | Owner: Pi | Slice: PI-4 | Bead: cancel-repro
- Claims: C0213 (SUPPORTED), C0215 (NON-EPISTEMIC), C0216 (NON-EPISTEMIC), C0352 (NON-EPISTEMIC)
- Relations: R00317, R00318, R00319, R00320, R00321, R00322, R00323, R00324, R00325, R00326, R00327, R00331
- Conditions: Retry permits a specifically authorized replacement; zero total calls is not a correct oracle. Missing artifact: event-ordered fault transcript from this exact seam.
- Acceptance: Park original startup, issue per-agent retry, release; record original and replacement attempt dispatch counts. Safety oracle: original zero starts and at most one separately authorized replacement. Repeat on resume startup.
- Adversarial mutant: Count only final successes and hide the original query.

## replay — Bind agent replay identity to measured source and effective dependencies

(slice PI-4; owner Pi)

### EAT-R017 — Agent replay MUST invalidate on changed source revision and tree

- Statement: The agent replay MUST invalidate on changed source revision and tree.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: replay
- Claims: C0219 (ESTABLISHED), C0224 (SUPPORTED), C0227 (NON-EPISTEMIC)
- Relations: R00338, R00339, R00350, R00351, R00352, R00353, R00354, R00355, R00356, R00360, R00362, R00526
- Conditions: Omission ESTABLISHED; actual stale reuse SUPPORTED, not run. Existing cwd/model/permissions/settings/tools/roles/grants/principal dimensions remain unchanged.
- Acceptance: Hold prompt constant and change source Git commit/tree and dirty-file digest; assert recorded answer is not reused; exact same measured dependencies remain the read-only positive control.
- Adversarial mutant: Omit source Git commit/tree and dirty-file digest from fingerprint.

### EAT-R018 — Agent replay MUST invalidate on changed instruction contents

- Statement: The agent replay MUST invalidate on changed instruction contents.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: replay
- Claims: C0220 (ESTABLISHED), C0224 (SUPPORTED), C03147 (NON-EPISTEMIC)
- Relations: R00340, R00341, R00342, R00350, R00351, R00352, R00353, R00354, R00355, R00356, R00360, R00526
- Conditions: Omission ESTABLISHED; actual stale reuse SUPPORTED, not run. Existing cwd/model/permissions/settings/tools/roles/grants/principal dimensions remain unchanged.
- Acceptance: Hold prompt constant and change skill/system instruction bytes; assert recorded answer is not reused; exact same measured dependencies remain the read-only positive control.
- Adversarial mutant: Omit skill/system instruction bytes from fingerprint.

### EAT-R019 — Agent replay MUST invalidate on changed provider identity

- Statement: The agent replay MUST invalidate on changed provider identity.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: replay
- Claims: C0221 (ESTABLISHED), C0224 (SUPPORTED), C0455 (NON-EPISTEMIC)
- Relations: R00343, R00344, R00350, R00351, R00352, R00353, R00354, R00355, R00356, R00360, R00526, R01047
- Conditions: Omission ESTABLISHED; actual stale reuse SUPPORTED, not run. Existing cwd/model/permissions/settings/tools/roles/grants/principal dimensions remain unchanged.
- Acceptance: Hold prompt constant and change effective provider version/settings; assert recorded answer is not reused; exact same measured dependencies remain the read-only positive control.
- Adversarial mutant: Omit effective provider version/settings from fingerprint.

### EAT-R020 — Agent replay MUST refuse unknown ambient dependencies

- Statement: The agent replay MUST refuse unknown ambient dependencies.
- Authority: RISK_CONTROL | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: replay
- Claims: C0551 (NON-EPISTEMIC), C0226 (NON-EPISTEMIC)
- Relations: R00360, R00361, R00590
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Mark one dependency unmeasurable; assert a stale coding or verification result is not replayed even if prompt matches.
- Adversarial mutant: Coerce unknown dependency to an empty stable digest.

### EAT-R021 — Replay MUST retain uncertain non-read denial

- Statement: The replay MUST retain uncertain non-read denial.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: replay
- Claims: C0222 (ESTABLISHED), C0223 (ESTABLISHED), C0225 (NON-EPISTEMIC), C0324 (NON-EPISTEMIC)
- Relations: R00345, R00346, R00347, R00348, R00349, R00357, R00358, R00359, R00714, X068
- Conditions: Existing protection is established and not a new repair; regression retained while extending fingerprints.
- Acceptance: Lose settlement after non-read dispatch then resume; assert typed uncertain-effect and no second dispatch; read-only replay remains visibly stale.
- Adversarial mutant: Treat unknown non-read journal row as cache miss and rerun it.

## source — Admit writes only against host-owned immutable source identity

(slice PI-1; owner Pi)

### EAT-R022 — Pi MUST refuse a dirty implementation base

- Statement: Pi MUST refuse a dirty implementation base.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0543 (NON-EPISTEMIC), C0354 (NON-EPISTEMIC)
- Relations: R00822
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Set tracked, staged or untracked edits at admission; assert no write-capable host dispatch; clean committed tree passes.
- Adversarial mutant: Use HEAD equality alone.

### EAT-R023 — Pi MUST confine the workspace to the authorized canonical root

- Statement: Pi MUST confine the workspace to the authorized canonical root.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0543 (NON-EPISTEMIC), C0354 (NON-EPISTEMIC)
- Relations: R00822
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Supply wrong workspace, prefix-collision sibling and realpath escape; assert refusal before writing.
- Adversarial mutant: Accept string startsWith root.

### EAT-R024 — Pi MUST bind a single writer to each materialized workspace

- Statement: Pi MUST bind a single writer to each materialized workspace.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0549 (NON-EPISTEMIC), C0176 (NON-EPISTEMIC), C0348 (NON-EPISTEMIC)
- Relations: R00195, R00196, R00795, R01363, R01364, R01365, R01366
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Admit two invocation IDs for the same canonical workspace; at most one writer lease is granted; cancellation releases only the lease it owns.
- Adversarial mutant: Allocate lease by caller alias instead of canonical root.

### EAT-R025 — Pi MUST recheck the source basis after asynchronous admission

- Statement: Pi MUST recheck the source basis after asynchronous admission.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0543 (NON-EPISTEMIC), C0550 (NON-EPISTEMIC), C0361 (NON-EPISTEMIC)
- Relations: R00590, R00839, X069
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Park admission, change commit/tree, gate manifest or tracked bytes, release; assert refusal before SDK dispatch.
- Adversarial mutant: Check source only before await.

### EAT-R026 — Pi MUST bind the gate manifest digest to source identity

- Statement: Pi MUST bind the gate manifest digest to source identity.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0550 (NON-EPISTEMIC)
- Relations: R00590, X069
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Hold commit and prompt constant while changing gate manifest bytes; assert identity changes and an old authorization is rejected.
- Adversarial mutant: Drop gate digest from the source basis.

### EAT-R027 — Pi MUST require an operator-attested write boundary

- Statement: Pi MUST require an operator-attested write boundary.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: source
- Claims: C0539 (NON-EPISTEMIC), C0542 (NON-EPISTEMIC), C0450 (NON-EPISTEMIC)
- Relations: R01187, R01188, R01189
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Launch with allowWrites:true but absent host attestation; assert no child write capability. An attestation for another workspace also refuses.
- Adversarial mutant: Trust JSON policy as authorization.

## authority — Enforce exact function authority at the final dispatch boundary

(slice PI-1; owner Pi; external: MW-CONTRACT)

### EAT-R028 — Pi MUST require workbench execute authority for a function

- Statement: Pi MUST require workbench execute authority for a function.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: authority
- Claims: C0537 (NON-EPISTEMIC)
- Relations: R00627
- Conditions: Exact action grant spelling is proposed; MW-CONTRACT must bind it. It must be representable through Pi grant settings and detached transport; no silent grammar bypass.
- Acceptance: Remove workbench:execute from an otherwise admitted function request; assert zero loader/provider calls.
- Adversarial mutant: Allow descriptor metadata to confer execute rights.

### EAT-R029 — Pi MUST require an exact host-issued function action grant

- Statement: Pi MUST require an exact host-issued function action grant.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: authority
- Claims: C0538 (NON-EPISTEMIC), C0518 (NON-EPISTEMIC)
- Relations: R00576, R00587
- Conditions: Exact action grant spelling is proposed; MW-CONTRACT must bind it. It must be representable through Pi grant settings and detached transport; no silent grammar bypass.
- Acceptance: A reviewed descriptor plus no action grant refuses; another function action grant refuses; only the adopted exact action passes.
- Adversarial mutant: Accept any mechanical namespace grant.

### EAT-R030 — Pi MUST refuse changed effective principal or session

- Statement: Pi MUST refuse changed effective principal or session.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: authority
- Claims: C0545 (NON-EPISTEMIC), C0543 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: Exact action grant spelling is proposed; MW-CONTRACT must bind it. It must be representable through Pi grant settings and detached transport; no silent grammar bypass.
- Acceptance: Park admission and change effective user/session identity; release and assert refusal before import; caller principal field cannot override host identity.
- Adversarial mutant: Snapshot principal before wait and never compare again.

### EAT-R031 — Pi MUST re-evaluate revoked grants at dispatch

- Statement: Pi MUST re-evaluate revoked grants at dispatch.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: authority
- Claims: C0544 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: Exact action grant spelling is proposed; MW-CONTRACT must bind it. It must be representable through Pi grant settings and detached transport; no silent grammar bypass.
- Acceptance: Revoke action grant while waiting; assert no dispatch after release.
- Adversarial mutant: Only validate rights when request enters queue.

## dispatch — Launch authorized embedded functions through the registered Pi tool

(slice PI-1; owner Pi; depends: contract-choice, descriptor, source, authority; external: MW-HOST; gate: PI-FUNCTION-REGISTERED)

### EAT-R032 — Registered workflow_execute MUST launch an admitted function asynchronously

- Statement: The registered workflow_execute MUST launch an admitted function asynchronously.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-1 | Bead: dispatch
- Claims: C0310 (ESTABLISHED), C0339 (ESTABLISHED), C0340 (ESTABLISHED), C0360 (NON-EPISTEMIC), C0459 (NON-EPISTEMIC)
- Relations: R00666, R00673, R00674, R00675, R00676, R00677, R00756, R00757, R00758, R00759, R00760, R00761
- Conditions: Function branch is new adopted design, not evidence of an accidental script refusal. MW-HOST is external, never a Pi core import.
- Acceptance: Use actual extension registration and installed host; park host completion; tool promptly returns launched with one invocation ID and completion not-asserted; observer later receives terminal state. No script or node fallback executes.
- Adversarial mutant: Keep the non-script refusal or await the entire develop operation.

### EAT-R033 — Disabling Mechanical hosting MUST preserve script workflow behavior

- Statement: The disabling Mechanical hosting MUST preserve script workflow behavior.
- Authority: NORMATIVE_DECISION | Type: verification | Owner: Pi | Slice: PI-1 | Bead: dispatch
- Claims: C0309 (NON-EPISTEMIC), C03105 (NON-EPISTEMIC), C03106 (SUPPORTED)
- Relations: R00671, R00672, R00938, R00939, R00940, R00941, R00942, R00943, R00944, R00945, R00946, X080
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Run existing saved script fixtures with feature disabled; results and admission semantics equal unchanged controls; MW packages are not resolved on disabled startup.
- Adversarial mutant: Resolve the installed MW host during unconditional extension initialization.

### EAT-R034 — Pi MUST bind application services outside the untrusted worker

- Statement: Pi MUST bind application services outside the untrusted worker.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: dispatch
- Claims: C0547 (ESTABLISHED), C0548 (NON-EPISTEMIC), C0414 (NON-EPISTEMIC)
- Relations: R00589, R00628, R01086, X100
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Call installed host with MW-owned application callback bundle through trusted boundary; worker inputs contain only serializable data and cannot install or replace callbacks.
- Adversarial mutant: Evaluate callable strings supplied through workflow input.

### EAT-R035 — Pi MUST depend only on a published MW application host boundary

- Statement: Pi MUST depend only on a published MW application host boundary.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-1 | Bead: dispatch
- Claims: C03108 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC), C03134 (NON-EPISTEMIC), C03138 (NON-EPISTEMIC)
- Relations: R00687, R00948, R01005, R01006, R01009, R01010, R01018
- Conditions: D-PI-BOUNDARY: assigned repository boundary prohibits Pi importing MW core; MW-HOST must expose callable application facade and serialization contracts. Do not silently implement MW services in Pi.
- Acceptance: Dependency/import census of Pi source and package metadata rejects imports of MW core, rig private deep paths, copied develop bodies, Library and checkout-relative dependencies; installed host consumer passes without MW repository.
- Adversarial mutant: Add a direct @mechanical/workflows-development import to Pi.

## outcomes — Preserve Mechanical domain outcomes and native evidence independently

(slice PI-3; owner Pi; depends: dispatch)

### EAT-R036 — Pi MUST preserve all four Mechanical outcome discriminants

- Statement: Pi MUST preserve all four Mechanical outcome discriminants.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-3 | Bead: outcomes
- Claims: C0238 (ESTABLISHED), C03111 (ESTABLISHED), C03112 (NON-EPISTEMIC), C0564 (NON-EPISTEMIC)
- Relations: R00393, R00394, R00600, R00680, R00699, R00860, R00951, R00952, R00953, R00954, R00955, R01185
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Round-trip each real host outcome fixture through serialization/projection: verified_candidate, verification_failed, needs_evidence, indeterminate remain distinct from execution status.
- Adversarial mutant: Map all resolved promises to domain success.

### EAT-R037 — Pi MUST project invocation termination independently from domain verification

- Statement: Pi MUST project invocation termination independently from domain verification.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-3 | Bead: outcomes
- Claims: C0562 (NON-EPISTEMIC), C0573 (NON-EPISTEMIC), C0417 (NON-EPISTEMIC)
- Relations: R00598, R00599, R00600, R00648, R01089, R01223, X084
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Completed invocation carrying verification_failed stays execution completed and domain verification_failed; absent outcome on crash stays absent/unknown rather than invented.
- Adversarial mutant: Derive domain verdict from process exit.

### EAT-R038 — Pi MUST accept verified-candidate proof only at the matching native Forge basis

- Statement: Pi MUST accept verified-candidate proof only at the matching native Forge basis.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-3 | Bead: outcomes
- Claims: C0367 (NON-EPISTEMIC), C0553 (NON-EPISTEMIC), C0563 (NON-EPISTEMIC)
- Relations: R00591, R00599, R00850, R00851, R00852, R00853, R00854, R00855
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Matching native full gate evidence with candidate commit/tree and operation ID passes; mutate commit, tree, selection completeness, operation ID or native verdict individually and assert no verified PASS projection.
- Adversarial mutant: Use process code zero as proof.

### EAT-R039 — Pi MUST reject simulated transport-success gate-failure as verification

- Statement: Pi MUST reject simulated transport-success gate-failure as verification.
- Authority: RISK_CONTROL | Type: guardrail | Owner: Pi | Slice: PI-3 | Bead: outcomes
- Claims: C0368 (UNDETERMINED), C0565 (NON-EPISTEMIC)
- Relations: R00850, R00856, R00857, R00858, R00859
- Conditions: C0368 remains UNDETERMINED; native realism needs FORGE-TRANSPORT-CENSUS. Safety requirement does not assert such a producer event happened.
- Acceptance: Fixture has exit 0 with native FAIL; assert Pi does not project PASS. Record that this is an adversarial synthetic pairing, not an observed Forge behavior.
- Adversarial mutant: Ignore native verdict on zero transport status.

### EAT-R040 — Pi MUST preserve provider diagnostic taxonomy

- Statement: Pi MUST preserve provider diagnostic taxonomy.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-3 | Bead: outcomes
- Claims: C0363 (NON-EPISTEMIC), C0464 (NON-EPISTEMIC)
- Relations: R00842, R00843, R01233
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Inject each callback error at host boundary; assert native diagnostic namespace/code/reference survive sanitized bounded translation, with no made-up success or generic task-failed substitute.
- Adversarial mutant: Catch every error and return verified_candidate.

## effects — Persist effect intent and preserve ambiguous outcomes across restart

(slice PI-4; owner Pi; depends: dispatch)

### EAT-R041 — Pi MUST persist invocation intent before its first effect dispatch

- Statement: Pi MUST persist invocation intent before its first effect dispatch.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: effects
- Claims: C0568 (NON-EPISTEMIC)
- Relations: R00601
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Fault durable intent write; assert no import callback can write/claim/gate. Successful persist includes invocation, authority and measured source identity.
- Adversarial mutant: Move persistence after provider call.

### EAT-R042 — Pi MUST record dispatch separately from settlement

- Statement: Pi MUST record dispatch separately from settlement.
- Authority: NORMATIVE_DECISION | Type: instrumentation | Owner: Pi | Slice: PI-4 | Bead: effects
- Claims: C0569 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Drop reply after producer accepted start; retained journal has dispatched intent with native ref or start-unknown, no fabricated settlement.
- Adversarial mutant: Write dispatch and settlement as one terminal row.

### EAT-R043 — Pi MUST preserve uncertain effects across restart without redispatch

- Statement: Pi MUST preserve uncertain effects across restart without redispatch.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: effects
- Claims: C03110 (NON-EPISTEMIC), C0570 (NON-EPISTEMIC), C0421 (NON-EPISTEMIC)
- Relations: R00602, R00950, R01097, R01188
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Crash after producer dispatch and before reply, restart/reopen; assert uncertain state persists and start count remains one.
- Adversarial mutant: Replay incomplete invocation automatically on restart.

### EAT-R044 — Pi MUST require native reconciliation before authorizing an effect retry

- Statement: Pi MUST require native reconciliation before authorizing an effect retry.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: effects
- Claims: C0571 (NON-EPISTEMIC)
- Relations: R00602
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Request retry for unknown effect without matching producer reconciliation receipt; assert denial; an exact scoped operator decision after producer reconciliation permits only its one intended attempt.
- Adversarial mutant: Treat a UI retry click as sufficient authority.

## controls — Target Pi controls exactly and retain cancellation uncertainty

(slice PI-4; owner Pi; depends: effects; external: MW-CANCEL; gate: PI-CANCEL-RECOVERY)

### EAT-R045 — Pi MUST propagate caller cancellation to the owned host runner

- Statement: Pi MUST propagate caller cancellation to the owned host runner.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0574 (NON-EPISTEMIC), C0235 (NON-EPISTEMIC), C0229 (SUPPORTED)
- Relations: R00367, R00368, R00369, R00370, R00371, R00372, R00373, R00384, R00392, R00529, R00560, R00561
- Conditions: MW pin already has pre-dispatch signal; MW-CANCEL supplies remaining mid-run contract. This is Pi wiring only.
- Acceptance: Abort while queued, before load, before SDK query and after gate start; assert no future dispatch before start, and producer-specific interrupt request after start. Capture disposition without claiming rollback.
- Adversarial mutant: Resolve cancel locally without signaling the owned runner.

### EAT-R046 — Pi MUST retain candidate and native recovery references after stop

- Statement: Pi MUST retain candidate and native recovery references after stop.
- Authority: RISK_CONTROL | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0576 (NON-EPISTEMIC), C0575 (SUPPORTED), C0236 (NON-EPISTEMIC)
- Relations: R00603, R00635
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Cancel after changed commit and after native gate dispatch; observer retains actual candidate commit/ref, workspace owner/path and native IDs; loss of response remains uncertain.
- Adversarial mutant: Clear refs while disposing the invocation.

### EAT-R047 — Pi MUST not treat late SDK terminal output as proof of cancellation

- Statement: Pi MUST not treat late SDK terminal output as proof of cancellation.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0454 (NON-EPISTEMIC), C0372 (NON-EPISTEMIC)
- Relations: R00866, R00867, R00868, R00869, R00870, R00871, R01203, X042
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Fake SDK ignores abort then returns success; projection records late result and requested/uncertain cancellation without asserting rollback or cancelled effect.
- Adversarial mutant: Overwrite uncertainty with cancelled on local acknowledgement.

### EAT-R048 — Pi MUST authorize controls against the exact invocation and child attempt

- Statement: Pi MUST authorize controls against the exact invocation and child attempt.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0578 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Swap invocation or Attempt ID, wrong session and missing control grant; assert no producer control call; matching authorized target makes one call.
- Adversarial mutant: Resolve target by display index alone.

### EAT-R049 — Pi MUST pause only at an admission boundary without producer pause support

- Statement: Pi MUST pause only at an admission boundary without producer pause support.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0580 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Ask to pause an active runner without native pause API; assert explicit unsupported/boundary-pending status, never paused-running claim.
- Adversarial mutant: Mark an active producer paused without calling it.

### EAT-R050 — Closing an inspector MUST NOT kill an externally owned Furnace Run

- Statement: The closing an inspector MUST NOT kill an externally owned Furnace Run.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-4 | Bead: controls
- Claims: C0577 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Close observer/inspector on external Run; assert zero cancel/kill calls and re-open can inspect the same native Run.
- Adversarial mutant: Bind inspector dispose to Furnace cancel.

## observe — Reopen native invocation observations with honest freshness

(slice PI-4; owner Pi; depends: outcomes, effects)

### EAT-R051 — Pi MUST reopen an invocation by its retained native identity

- Statement: Pi MUST reopen an invocation by its retained native identity.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: observe
- Claims: C0325 (NON-EPISTEMIC), C0379 (NON-EPISTEMIC), C0513 (NON-EPISTEMIC)
- Relations: R00574, R00715, R00887
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Restart UI and query workflow_observe using retained invocation refs; exact domain outcome and candidate/source basis return without relaunch.
- Adversarial mutant: Use transient UI index as persisted identity.

### EAT-R052 — Pi MUST display stale and unknown evidence freshness explicitly

- Statement: Pi MUST display stale and unknown evidence freshness explicitly.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-4 | Bead: observe
- Claims: C0325 (NON-EPISTEMIC), C0418 (NON-EPISTEMIC), C0572 (NON-EPISTEMIC)
- Relations: R00643, R00715, R01090
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Reopen historical provider result and remove current producer observation; assert stale or unknown, never current PASS. Fresh native observation updates only its matching basis.
- Adversarial mutant: Label retained historical read current.

## git-census — Compose the installed Git-census host in an isolated Pi-owned invocation

(slice PI-3; owner Pi; depends: preserve, dispatch, outcomes, effects; external: MW-HOST, MW-CANCEL; gate: PI-GIT-CENSUS-LIVE)

> PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned and any demonstrated authorization hole repaired before live closure.

### EAT-R053 — Pi MUST label the tracked-file discovery authority as Git census

- Statement: Pi MUST label the tracked-file discovery authority as Git census.
- Authority: LINGUISTIC_INTEGRITY | Type: guardrail | Owner: Pi | Slice: PI-3 | Bead: git-census
- Claims: C0355 (NON-EPISTEMIC), C0356 (SUPPORTED), C0320 (REFUTED), C0556 (NON-EPISTEMIC)
- Relations: R00593, R00639, R00694, R00701, R00702, R00703, R00704, R00705, R00823, R00824, R00825, R00826
- Conditions: C0320 REFUTED selectable-profile claim; future mapping is normative, existing discovery mechanism SUPPORTED. MW-CONTRACT chooses selector.
- Acceptance: Inspect actual host discovery: project discovery git-tracked-files and explicit census profile; assert no task-complete HX authority. Unknown selector refuses rather than implying a shipped profile.
- Adversarial mutant: Relabel filesystem enumeration as certified task-scoped HX.

### EAT-R054 — Pi MUST witness a changed native candidate from the registered installed-host path

- Statement: Pi MUST witness a changed native candidate from the registered installed-host path.
- Authority: EVIDENCE_ACQUISITION | Type: verification | Owner: Pi | Slice: PI-3 | Bead: git-census
- Claims: C0317 (NON-EPISTEMIC), C0378 (NON-EPISTEMIC), C0451 (NON-EPISTEMIC)
- Relations: R00697, R00886, R01190, R01191, R01192, R01207
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Live scratch checkout: actual registered Pi workflow_execute to exact installed artifact and real SDK session; record changed clean candidate commit/tree linked to input base and host identity.
- Adversarial mutant: Replace SDK with fake or use pre-existing standalone rig receipt.

### EAT-R055 — Pi MUST witness the candidate-matching native Forge operation

- Statement: Pi MUST witness the candidate-matching native Forge operation.
- Authority: EVIDENCE_ACQUISITION | Type: verification | Owner: Pi | Slice: PI-3 | Bead: git-census
- Claims: C0318 (NON-EPISTEMIC), C0379 (NON-EPISTEMIC)
- Relations: R00698, R00887, R01191
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Run native Forge at the changed candidate; retain producer operation ID, native verdict, commit/tree and full selection proof and join to Pi observation/reopen.
- Adversarial mutant: Join a PASS from another candidate or omit the operation ID.

### EAT-R056 — Pi MUST witness live denial and cancellation controls before PI-3 closure

- Statement: Pi MUST witness live denial and cancellation controls before PI-3 closure.
- Authority: EVIDENCE_ACQUISITION | Type: verification | Owner: Pi | Slice: PI-3 | Bead: git-census
- Claims: C0379 (NON-EPISTEMIC), C0380 (NON-EPISTEMIC), C03115 (NON-EPISTEMIC)
- Relations: R00887, R00888, R00889, R00890, R00966, R01050, X088
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Through registered tool demonstrate wrong digest and missing write grant dispatch no child; exercise real cancellation and inspect retained recovery state. Gate fails if any leg is omitted.
- Adversarial mutant: Substitute fixture denial/cancel evidence for live producer leg.

## hx-evidence — Measure installed HX task-scope capability before certifying it

(slice PI-5; owner Pi; external: HX-PRODUCER; gate: HX-TASK-SCOPE-PROBE)

### EAT-R057 — The HX probe MUST record whether installed producer can supply task-scope proof

- Statement: The HX probe MUST record whether installed producer can supply task-scope proof.
- Authority: EVIDENCE_ACQUISITION | Type: evidence-acquisition | Owner: Pi | Slice: PI-5 | Bead: hx-evidence
- Claims: C03114 (PLAUSIBLE), C0242 (ESTABLISHED), C0243 (ESTABLISHED)
- Relations: R00399, R00400, R00401, R00402, R00403, R00404, R00405, R00406, R00407, R00409, R00410, R00528
- Conditions: C03114 PLAUSIBLE installed capability risk. Missing artifact: installed producer probe transcript with exact version and query. No HX product pin is available in this audit.
- Acceptance: Pin installed HX version, query actual task/revision, capture terminal response and task/query digest plus coverage. Record unsupported/missing witness as blocker scoped only to native-task-scope, not Git census.
- Adversarial mutant: Treat a complete filesystem response as capable task proof.

## hx-admit — Admit certified HX scope only from producer-backed task witnesses

(slice PI-5; owner Pi; depends: dispatch, hx-evidence; external: MW-NATIVE; gate: PI-HX-RF-LIVE)

### EAT-R058 — Pi MUST stop native-profile writer dispatch on incomplete HX scope

- Statement: Pi MUST stop native-profile writer dispatch on incomplete HX scope.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-5 | Bead: hx-admit
- Claims: C0558 (NON-EPISTEMIC), C0328 (NON-EPISTEMIC), C0370 (NON-EPISTEMIC)
- Relations: R00595, R00640, R00720, R00863, R00864, X059
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Feed actual host evidence fixture with partial/unknown coverage and false known-empty; assert needs_evidence and implement call count zero.
- Adversarial mutant: Map empty files to complete coverage.

### EAT-R059 — Pi MUST refuse HX evidence from another query or revision

- Statement: Pi MUST refuse HX evidence from another query or revision.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-5 | Bead: hx-admit
- Claims: C0327 (NON-EPISTEMIC), C0557 (NON-EPISTEMIC), C0370 (NON-EPISTEMIC)
- Relations: R00594, R00595, R00641, R00719, R00863, R00864, X059
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Mutate task, query digest or base revision independently in terminal producer evidence; assert refusal before writer dispatch.
- Adversarial mutant: Compare only the workspace name.

## rf-admit — Keep RF preview separate from committed context in Pi invocation

(slice PI-5; owner Pi; depends: dispatch; external: MW-NATIVE; gate: PI-HX-RF-LIVE)

### EAT-R060 — Pi MUST refuse an RF preview as authoritative committed context

- Statement: Pi MUST refuse an RF preview as authoritative committed context.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-5 | Bead: rf-admit
- Claims: C0247 (ESTABLISHED), C0248 (ESTABLISHED), C0252 (SUPPORTED), C0253 (SUPPORTED), C0559 (NON-EPISTEMIC)
- Relations: R00420, R00421, R00422, R00423, R00424, R00425, R00426, R00435, R00436, R00437, R00438, R00439
- Conditions: Enforced rig adapter contract, not the unsupported claim of a documented develop port proof contract C0251; MW owns rendering implementation.
- Acceptance: Substitute actual Pi preview envelope with render_id:null into committed-context slot; assert no writer dispatch and producer-context refusal; preview remains usable for read-only observation.
- Adversarial mutant: Fabricate a render ID from invocation ID.

### EAT-R061 — Pi MUST retain producer-backed RF render provenance at the same source basis

- Statement: Pi MUST retain producer-backed RF render provenance at the same source basis.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-5 | Bead: rf-admit
- Claims: C0249 (ESTABLISHED), C0250 (ESTABLISHED), C0327 (NON-EPISTEMIC), C0560 (NON-EPISTEMIC)
- Relations: R00427, R00428, R00437, R00438, R00596, R00719
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Round-trip genuine committed render ref and task/revision, graph/output digest and model-budget witness; stale source or missing witness refuses before write.
- Adversarial mutant: Use a nonempty synthetic render_id while dropping provenance.

### EAT-R062 — Pi MUST block only the native profile when native evidence is unavailable

- Statement: Pi MUST block only the native profile when native evidence is unavailable.
- Authority: RISK_CONTROL | Type: guardrail | Owner: Pi | Slice: PI-5 | Bead: rf-admit
- Claims: C03113 (NON-EPISTEMIC), C03114 (PLAUSIBLE)
- Relations: R00956, R00957, R00958, R00959, R00960, R00961, R00962, R00963, R00964, R00965, X050, X060
- Conditions: C03114 is PLAUSIBLE and unmeasured until the HX-TASK-SCOPE-PROBE gate runs: this control is conditional behavior for whenever native evidence is unavailable, and asserts neither that the installed HX lacks capability nor that the probe was run. The refusal must name the probe blocker (C03113).
- Acceptance: Installed HX probe unavailable: native-profile launch refuses with named blocker; independently authorized Git-census request still passes admission with its limited authority label.
- Adversarial mutant: Disable every Mechanical invocation when native HX is unavailable.

### EAT-R063 — Pi MUST witness native HX and committed RF composition through the installed host

- Statement: Pi MUST witness native HX and committed RF composition through the installed host.
- Authority: EVIDENCE_ACQUISITION | Type: verification | Owner: Pi | Slice: PI-5 | Bead: rf-admit
- Claims: C0327 (NON-EPISTEMIC), C0328 (NON-EPISTEMIC), C0370 (NON-EPISTEMIC)
- Relations: R00719, R00720, R00863, R00864, X059
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Live installed producer task query and same-source committed render join to Pi invocation; partial HX, wrong revision and preview-substitution legs start no writer. Gate refuses missing upstream APIs.
- Adversarial mutant: Close PI-5 with filesystem HX and preview fixtures.

## detached-function — Reattach independently authorized detached function invocations

(slice PI-6; owner Pi; depends: dispatch, detached-grants, effects, observe; external: MW-HOST, MW-CANCEL; gate: PI-DETACHED-FUNCTION-LIVE)

### EAT-R064 — Pi MUST launch detached functions only under detach authority

- Statement: Pi MUST launch detached functions only under detach authority.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-6 | Bead: detached-function
- Claims: C0541 (NON-EPISTEMIC), C0584 (NON-EPISTEMIC)
- Relations: R00588, R00607, R00608
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Execute function detached with execute/action but no detach grant; assert no process. Exact host-issued detach plus bounded SDK rights launches once with pinned snapshot.
- Adversarial mutant: Reuse embedded grants as detached authority.

### EAT-R065 — Pi MUST reattach using the detached native host instance identity

- Statement: Pi MUST reattach using the detached native host instance identity.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-6 | Bead: detached-function
- Claims: C0584 (NON-EPISTEMIC), C0373 (NON-EPISTEMIC)
- Relations: R00607, R00608, R00872, R00873, R00874
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Disconnect Pi then reopen independently running local host; retained invocation and host-instance IDs agree; PID reuse or host-instance mismatch refuses control.
- Adversarial mutant: Trust PID alone as identity.

### EAT-R066 — Pi MUST refuse detached transport with incorrect same-machine ownership

- Statement: Pi MUST refuse detached transport with incorrect same-machine ownership.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-6 | Bead: detached-function
- Claims: C0585 (NON-EPISTEMIC), C0373 (NON-EPISTEMIC), C0374 (ESTABLISHED)
- Relations: R00608, R00647, R00872, R00873, R00874, R00875, R00876, R00877, R00878
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Use socket owned by another identity or unsafe directory ownership; assert refusal without sending credentials or control.
- Adversarial mutant: Skip socket DAC ownership check.

### EAT-R067 — Pi MUST preserve launch-unknown after a lost detached handshake

- Statement: Pi MUST preserve launch-unknown after a lost detached handshake.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-6 | Bead: detached-function
- Claims: C0587 (NON-EPISTEMIC), C0373 (NON-EPISTEMIC)
- Relations: R00609, R00872, R00873, R00874, X034
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Lose handshake after child start; retain host identity and launch-unknown; reconcile without blind second launch or implicit kill.
- Adversarial mutant: Automatically retry start after transport timeout.

## furnace-function — Project one Furnace-owned function attempt without duplicating runtime authority

(slice PI-6; owner Pi; depends: dispatch, effects, observe; external: MW-FURNACE; gate: PI-FURNACE-FUNCTION-LIVE)

> Optional host mode; an unsupported producer API is a named blocker, not a fabricated Pi facsimile.

### EAT-R068 — Pi MUST map one callback to the producer Run Work and Attempt identities

- Statement: Pi MUST map one callback to the producer Run Work and Attempt identities.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-6 | Bead: furnace-function
- Claims: C0588 (ESTABLISHED), C0589 (SUPPORTED), C0462 (NON-EPISTEMIC), C0566 (NON-EPISTEMIC)
- Relations: R00610, R00631, R00632, R01225, R01226, R01227, R01228, X096
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Invoke existing FurnaceHostedExecutor with installed host callback; use real producer Run/Work/Attempt refs and independently project callback success and domain outcome.
- Adversarial mutant: Derive Attempt ID from Pi invocation index.

### EAT-R069 — Pi MUST leave retry decisions with Furnace after ambiguous starts

- Statement: Pi MUST leave retry decisions with Furnace after ambiguous starts.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-6 | Bead: furnace-function
- Claims: C0590 (NON-EPISTEMIC), C03135 (NON-EPISTEMIC), C0375 (NON-EPISTEMIC)
- Relations: R00610, R00879, R00880, R00881, R00882, R01011, R01012, R01013, R01014
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Inject lost start response, controller crash and duplicate retry; assert no second Pi start and no JS-stack-restoration claim; reconcile producer Attempt.
- Adversarial mutant: Introduce a Pi durable Attempt retry queue.

### EAT-R070 — Pi MUST forward exact authorized Attempt cancellation without asserting rollback

- Statement: Pi MUST forward exact authorized Attempt cancellation without asserting rollback.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-6 | Bead: furnace-function
- Claims: C0375 (NON-EPISTEMIC), C0578 (NON-EPISTEMIC)
- Relations: R00879, R00880, R00881, R00882
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Cancel actual Attempt with matching grant/ref; retain producer cancellation/result evidence and candidate refs; wrong Attempt performs no call.
- Adversarial mutant: Cancel current Run by display label or overwrite domain outcome with success.

## coordination — Invoke one pinned pure coordination export without effect authority

(slice PI-7; owner Pi; depends: descriptor, authority; external: MW-COORDINATION; gate: PI-COORDINATION-INSTALLED)

### EAT-R071 — Pi MUST invoke only the published pure coordination schema and export

- Statement: Pi MUST invoke only the published pure coordination schema and export.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: Pi | Slice: PI-7 | Bead: coordination
- Claims: C0334 (ESTABLISHED), C0458 (NON-EPISTEMIC), C0546 (NON-EPISTEMIC)
- Relations: R00726, R00730, R00731, R00732, R00733, R00734, R00883, R00908, R01213, R01214, X091
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Load exact packed producer pure-host facade with separate read-only grant; invoke valid schema data and round-trip proposal. Unsupported export/callable inputs refuse.
- Adversarial mutant: Allow arbitrary coordination exports or reuse blanket write grant.

### EAT-R072 — Pi MUST treat a coordination proposal as observation until separately authorized

- Statement: Pi MUST treat a coordination proposal as observation until separately authorized.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-7 | Bead: coordination
- Claims: C0332 (NON-EPISTEMIC), C0376 (NON-EPISTEMIC), C0594 (NON-EPISTEMIC)
- Relations: R00612, R00728, R00883, R00884
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Return a proposal naming Beads, Forge or Furnace action; assert zero provider effects without an independent resolver and exact authority.
- Adversarial mutant: Auto-execute policy output as a command.

## limits — Validate positive host resource limits without a second scheduler

(slice PI-7; owner Pi)

### EAT-R073 — Pi MUST reject nonpositive or noninteger concurrency settings

- Statement: Pi MUST reject nonpositive or noninteger concurrency settings.
- Authority: EMPIRICAL_REPAIR | Type: behavior | Owner: Pi | Slice: PI-7 | Bead: limits
- Claims: C0261 (ESTABLISHED), C0262 (NON-EPISTEMIC)
- Relations: R00466, R00467, R00468, R00469, R00470, R00471
- Conditions: Exposure is programmatic/test-only at pin; production default already clamps [1,16]. Do not claim a production zero-concurrency outage.
- Acceptance: Call programmatic runtime concurrency with 0, negative, fraction, NaN and Infinity; assert immediate typed rejection rather than hanging; 1 and default clamped concurrency pass.
- Adversarial mutant: Pass zero into Semaphore constructor.

### EAT-R074 — Pi MUST enforce shared admission caps across simultaneous invocations

- Statement: Pi MUST enforce shared admission caps across simultaneous invocations.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-7 | Bead: limits
- Claims: C0257 (ESTABLISHED), C0595 (NON-EPISTEMIC), C0596 (NON-EPISTEMIC)
- Relations: R00453, R00454, R00462, R00489, R00613, R00644
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Start concurrent Pi workflows under a configured cap; measured owned SDK queries, host child processes and native Forge operations never exceed their separately configured limits.
- Adversarial mutant: Allocate independent cap pools per workflow.

### EAT-R075 — Pi MUST expose a bounded admission wait reason

- Statement: Pi MUST expose a bounded admission wait reason.
- Authority: NORMATIVE_DECISION | Type: instrumentation | Owner: Pi | Slice: PI-7 | Bead: limits
- Claims: C0597 (NON-EPISTEMIC), C0596 (NON-EPISTEMIC)
- Relations: R00613
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Saturate a cap; queued request reports cap reason and measurable wait; exceeding configured queue deadline yields typed refusal rather than silent fanout.
- Adversarial mutant: Dispatch extra children while reporting queued.

### EAT-R076 — Pi MUST remove a cancelled queued invocation before dispatch

- Statement: Pi MUST remove a cancelled queued invocation before dispatch.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-7 | Bead: limits
- Claims: C0377 (NON-EPISTEMIC), C0574 (NON-EPISTEMIC)
- Relations: R00885
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Queue behind saturated cap, cancel, release capacity; cancelled invocation dispatch count remains zero and slot accounting returns to baseline.
- Adversarial mutant: Leave cancelled waiter in runnable queue.

## telemetry — Bound progress output and measure cross-invocation resource behavior

(slice PI-7; owner Pi; depends: limits; gate: PI-MULTIWORKFLOW-LOAD)

### EAT-R077 — Pi MUST bound retained progress and provider-output bytes

- Statement: Pi MUST bound retained progress and provider-output bytes.
- Authority: NORMATIVE_DECISION | Type: instrumentation | Owner: Pi | Slice: PI-7 | Bead: telemetry
- Claims: C0377 (NON-EPISTEMIC), C0596 (NON-EPISTEMIC)
- Relations: R00613, R00885
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Flood progress and provider logs past configured byte cap; retained memory/output accounting stays within declared bound and honest dropped-event count equals dropped inputs.
- Adversarial mutant: Retain every event but truncate only rendered text.

### EAT-R078 — Pi MUST record monotonic stage timing joined to native IDs

- Statement: Pi MUST record monotonic stage timing joined to native IDs.
- Authority: NORMATIVE_DECISION | Type: instrumentation | Owner: Pi | Slice: PI-7 | Bead: telemetry
- Claims: C0598 (NON-EPISTEMIC)
- Relations: (no edge of any mapped type touches these claims)
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Inject wall-clock rollback during admission/load/SDK/gate stages; monotonic durations remain nonnegative and each measured provider stage retains its own bytes and native ID.
- Adversarial mutant: Use Date.now deltas or invent native IDs from array index.

### EAT-R079 — Pi MUST measure host load using simultaneous real invocations

- Statement: Pi MUST measure host load using simultaneous real invocations.
- Authority: EVIDENCE_ACQUISITION | Type: verification | Owner: Pi | Slice: PI-7 | Bead: telemetry
- Claims: C0333 (NON-EPISTEMIC), C0377 (NON-EPISTEMIC)
- Relations: R00729, R00885
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Named load journey records peak concurrent queries/processes/Forge ops, queue wait, memory, bytes and dropped events with exact versions/ref; includes floods and queued cancels plus baseline script comparison.
- Adversarial mutant: Replace measured multi-workflow counters with one-workflow semaphore limits.

## unknowns — Acquire missing producer evidence without upgrading audit claims

(slice PI-0; owner Pi; gate: EVIDENCE-CENSUS)

### EAT-R080 — The prior-run census MUST distinguish repository absence from global absence

- Statement: The prior-run census MUST distinguish repository absence from global absence.
- Authority: EVIDENCE_ACQUISITION | Type: evidence-acquisition | Owner: Pi | Slice: PI-0 | Bead: unknowns
- Claims: C0321 (UNDETERMINED), C0446 (SUPPORTED)
- Relations: R00695, R00706, R00707, R01180, R01181, R01245, X078, X079
- Conditions: C0321 UNDETERMINED. Missing artifact: producer-side joined receipt and authorized bounded external receipt census. External stores are not read in this phase; absence cannot block a new safe live journey.
- Acceptance: Read permitted producer receipt stores over an explicit bounded date/path range; join Pi invocation/session journal, Mechanical outcome and Forge operation at source pin. Report found witness or searched-scope absence, never universal never-ran.
- Adversarial mutant: Treat no in-repo filename hit as proof no external run occurred.

### EAT-R081 — The Forge transport probe MUST settle the exit-zero failed-gate premise from producer evidence

- Statement: The Forge transport probe MUST settle the exit-zero failed-gate premise from producer evidence.
- Authority: EVIDENCE_ACQUISITION | Type: evidence-acquisition | Owner: Pi | Slice: PI-0 | Bead: unknowns
- Claims: C0368 (UNDETERMINED)
- Relations: R00850, R00856, R00857, R00858, R00859
- Conditions: C0368 UNDETERMINED; named FORGE-TRANSPORT-CENSUS subgate. Guardrail remains mandatory regardless of whether pairing is realized.
- Acceptance: Pin Forge source/contract or collect native transcript pairing process exit, gate verdict and operation ID. Record explicit pairing if witnessed; otherwise scoped non-observation or UNDETERMINED, never infer it from adapter conditionals.
- Adversarial mutant: Use a synthetic exit-zero FAIL fixture as a producer receipt.

## release — Require test-first machine cuts and evidence-backed slice status

(slice PI-7; owner Pi)

> Cross-cut closure obligations apply to every bead from its first cut; this group defines receipt/schema enforcement, not permission to defer docs until the end.

### EAT-R082 — Each slice cut MUST update W11 and the project skill to its evidenced status

- Statement: The each slice cut MUST update W11 and the project skill to its evidenced status.
- Authority: LINGUISTIC_INTEGRITY | Type: docs | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C03115 (NON-EPISTEMIC), C0457 (NON-EPISTEMIC), C0408 (NON-EPISTEMIC), C0163 (SUPPORTED)
- Relations: R00136, R00137, R00138, R00139, R00140, R00141, R00145, R00539, R00541, R00966, R01072, R01073
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: qa/workbench status validator compares each changed slice to same-cut docs/skill/W11 evidence pointers. Missing live gate leaves slice non-live; stale no-Mechanical-code assertion is removed without claiming invocation shipped.
- Adversarial mutant: Set W11 landed-gated from source existence or one fixture alone.

### EAT-R083 — Each behavior cut MUST retain a preimplementation failing consumer test

- Statement: The each behavior cut MUST retain a preimplementation failing consumer test.
- Authority: NORMATIVE_DECISION | Type: verification | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C03129 (NON-EPISTEMIC), C0397 (NON-EPISTEMIC), C0448 (NON-EPISTEMIC)
- Relations: R00924, R00995, R00996, R01183, R01184
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Receipt validator requires baseline SHA, real seam test command, first failing assertion, positive rerun and adversarial mutant failure tied to the requirement. Missing leg rejects closure.
- Adversarial mutant: Write only a passing postimplementation test or change assertion to fit implementation.

### EAT-R084 — Each code cut MUST carry the machine accepted Forge gate receipt

- Statement: The each code cut MUST carry the machine accepted Forge gate receipt.
- Authority: NORMATIVE_DECISION | Type: verification | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C0392 (ESTABLISHED), C0398 (NON-EPISTEMIC), C0422 (NON-EPISTEMIC)
- Relations: R00911, R00912, R00913, R00916, R00925, R01098, R01099, R01100, R01208, R01335, R01336, R01337
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Read machine receipt keyed to exact candidate commit with required Forge build legs; failed/not-run gate or receipt for another commit refuses close. No CI substitution.
- Adversarial mutant: Accept exit echo or an old commit gate as this cut PASS.

### EAT-R085 — Each live slice claim MUST name its real infrastructure gate

- Statement: The each live slice claim MUST name its real infrastructure gate.
- Authority: LINGUISTIC_INTEGRITY | Type: guardrail | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C0380 (NON-EPISTEMIC), C0456 (NON-EPISTEMIC), C03148 (NON-EPISTEMIC)
- Relations: R00888, R00889, R00890, R01050, R01051, R01207, R01208, R01209, X088
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Status validator rejects live/closed when required producer tier is skipped, unavailable, fixture-only or a historical component receipt; source/test-only cut may land explicitly partial.
- Adversarial mutant: Silently mark live producer tier skipped and close slice.

### EAT-R086 — Each bead receipt MUST preserve commands versions refs and actual results

- Statement: The each bead receipt MUST preserve commands versions refs and actual results.
- Authority: NORMATIVE_DECISION | Type: docs | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C0398 (NON-EPISTEMIC), C03101 (NON-EPISTEMIC), C03139 (NON-EPISTEMIC)
- Relations: R00925, R00931, R01019, R01020, R01208, R01210
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Validate receipt includes baseline/source, owner, supported installed API, positive/negative, effects/cancel/retention, native IDs, timings, Forge outcomes, docs and blockers; missing real bead ID forbids creating wb receipt.
- Adversarial mutant: Generate a fabricated wb identifier or omit not-run labels.

### EAT-R087 — Program cuts MUST leave historical TRACEABILITY and shared receipt indexes unchanged

- Statement: The program cuts MUST leave historical TRACEABILITY and shared receipt indexes unchanged.
- Authority: NORMATIVE_DECISION | Type: guardrail | Owner: Pi | Slice: PI-7 | Bead: release
- Claims: C0423 (NON-EPISTEMIC), C0269 (NON-EPISTEMIC), C03102 (NON-EPISTEMIC)
- Relations: R00932, R00933, R00934, R01101, R01102, R01211
- Conditions: No additional unresolved condition; adopted program design, not an observed implementation.
- Acceptance: Compare immutable path blob and added receipt paths against cut base; TRACEABILITY unchanged and no new shared index; per-real-bead receipts allowed.
- Adversarial mutant: Append a global status row to TRACEABILITY.

## mw-contract — MUST publish the adopted versioned invocation ABI

(slice PI-0; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R088 — MW MUST publish the adopted versioned invocation ABI

- Statement: MW MUST publish the adopted versioned invocation ABI.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-0 | Bead: mw-contract
- Claims: C0522 (NON-EPISTEMIC), C0531 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC)
- Relations: R00579, R00582, R00583, R00584, R00586, R00636, R01005, R01006, X044, X051
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Producer contract chooses selector/action rights/host ABI and includes descriptor/schema corpus; Pi consumer validates exact file; ambiguous dual spelling rejects.
- Adversarial mutant: Publish both selector spellings without version semantics.

## mw-host — MUST publish an independently consumable application host facade

(slice PI-2; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R089 — MW MUST publish an independently consumable application host facade

- Statement: MW MUST publish an independently consumable application host facade.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-2 | Bead: mw-host
- Claims: C0311 (NON-EPISTEMIC), C0315 (SUPPORTED), C03113 (NON-EPISTEMIC), C0547 (ESTABLISHED)
- Relations: R00589, R00628, R00678, R00679, R00690, R00691, R00692, R00693, R00956, R00957, R00958, R00959
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Install real packed facade without checkout, bind owned discover/compileContext/implement/verify, preserve all outcomes; Pi never imports provider-neutral core.
- Adversarial mutant: Require a private rig dist deep import or repo checkout.

## mw-cancel — MUST honor host cancellation through the in-flight SDK and runner

(slice PI-3; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R090 — MW MUST honor host cancellation through the in-flight SDK and runner

- Statement: MW MUST honor host cancellation through the in-flight SDK and runner.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-3 | Bead: mw-cancel
- Claims: C0229 (SUPPORTED), C0235 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC)
- Relations: R00367, R00368, R00369, R00370, R00371, R00372, R00373, R00384, R00392, R00529, R00560, R00561
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Native scratch experiment interrupts during edits and after Forge dispatch, retains candidate/ref and uncertain result with no automatic repeat.
- Adversarial mutant: Only check signal before dispatch and label mid-run work cancelled.

## mw-native — MUST publish producer-backed native source and committed context services

(slice PI-5; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R091 — MW MUST publish producer-backed native source and committed context services

- Statement: MW MUST publish producer-backed native source and committed context services.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-5 | Bead: mw-native
- Claims: C0326 (NON-EPISTEMIC), C0327 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC)
- Relations: R00716, R00717, R00718, R00719, R01005, R01006, X061
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Installed HX/RF service bundle validates task/revision/query and genuine render provenance; incomplete/stale/preview refuses before implement.
- Adversarial mutant: Supply filesystem census or preview as certified evidence.

## mw-furnace — MUST expose the application callback for native Furnace hosting

(slice PI-6; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R092 — MW MUST expose the application callback for native Furnace hosting

- Statement: MW MUST expose the application callback for native Furnace hosting.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-6 | Bead: mw-furnace
- Claims: C0514 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC), C03135 (NON-EPISTEMIC)
- Relations: R00575, R01005, R01006, R01011, R01012, R01013, R01014
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Installed facade callback runs under actual Furnace ExecutorApp with exact Run/Work/Attempt and producer-owned retry; no Pi dependency.
- Adversarial mutant: Implement a Pi-only retry database in MW core.

## mw-coordination — MUST publish one explicit pure coordination host contract

(slice PI-7; owner MW)

> OUT of Pi wb- bead set. Track with the MW owner; Pi only depends on the producer delivery. Existing MW bead IDs are not invented here.

### EAT-R093 — MW MUST publish one explicit pure coordination host contract

- Statement: MW MUST publish one explicit pure coordination host contract.
- Authority: NORMATIVE_DECISION | Type: behavior | Owner: MW | Slice: PI-7 | Bead: mw-coordination
- Claims: C0592 (SUPPORTED), C0593 (NON-EPISTEMIC), C03133 (NON-EPISTEMIC)
- Relations: R00611, R00612, R00633, R01005, R01006, X092
- Conditions: External MW-owned deliverable only; no Pi implementation of MW core/rig. Re-read current producer tip before filing; pin status is static and tests not run.
- Acceptance: Packed read-only export has explicit serialized schema and proposal semantics, no native side effect; external installed consumer proves mapping.
- Adversarial mutant: Expose every arbitrary export through generic callable registry.

