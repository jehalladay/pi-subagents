# r-release — PHASE 10 compile of MII release machinery (EAT-R446..EAT-R470)

Investigator block of the epistemic-adversarial-triage of **mechanical-interop-integrity-2026-11-10 (MII)**, successor to MNI-2026-11-09.

- **Document pin:** Pi master `3fc0ead1` (pi-README + pi-01..pi-05; MW companion mw-README + mw-01..mw-05 read for joint context). **Environment pins:** Pi `0fb90672`, MW `69cb016d` (the program itself notes one newer MW main commit existed at authoring; re-pin is a P00 duty, C034 NON-EPISTEMIC/NORMATIVE).
- **Inputs:** program docs; `epistemic-triage/CLAIMS.jsonl` (230 rows) as patched by `CLAIMS.patch.jsonl` (arbitrations C107→ESTABLISHED, C173→SUPPORTED); `epistemic-triage/REMEDIATION.md` (M-rows cited per requirement; every repair there is an insert deferred to the pin owner — these requirements are the tracker for rows marked `none (EAT-R391+)`).
- **Scope of this block:** doc-04 falsification matrix; gates/receipts including the phantom-name cures; release vetoes; doc-05 LX/docs/skill/handoff duties; crash-restart + lease EVIDENCE_ACQUISITION rows; bead reconciliation obligations.
- **Compilation rules honored:** REFUTED claims compile to negative clauses only (C029, C032, C035, C095, C138, C005). UNSUPPORTED label premises (C140, C142, C163, C006) compile to ratification/acquisition obligations, never to assumed mappings. Facets preserved as undetermined by remediation (M194) and the ESTABLISHED absence claims (C023, C024, C025) compile under EVIDENCE_ACQUISITION. NON-EPISTEMIC NORMATIVE/PROPOSAL rows compile under NORMATIVE_DECISION authority; no rationale states a premise stronger than its ledger status.
- **Live bead statuses** (verified 2026-11-11, `bd list --all --json` against the Pi-subagents store): wb-1a3t open (epic), wb-w8fk in_progress, wb-y0n6 in_progress, wb-2ukh in_progress, wb-4bxo open, wb-9a1o open, wb-mwsy open, wb-5a7k closed, wb-p3i2 open, wb-xr1z open, wb-9bof open, wb-yiu4 open, wb-7wkb closed, wb-1zn2 deferred, wb-12x1 closed, wb-5ik5 closed. "Extends" below always names a live (open/in_progress) bead; closed/deferred ancestors are named as lineage inside the requirement.
- **V-tiers** are the program's own ladder (pi-04): V0 inspection, V1 focused unit/property/mutation, V2 installed external consumer, V3 registered Pi route, V4 native joined journey, V5 fault/restart/load, V6 optional profiles.

---

## EAT-R446 — Implement the strict-verification falsifiers G01, G02, G03 and G12

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION (adopted doc-04 falsifier matrix); secondary RISK_CONTROL
- Statement: The verification suite MUST implement falsifiers G01 (nominal Forge PASS missing the gate-passed datum → no strict native verification), G02 (matching commit without candidate-tree evidence → indeterminate unless documented independent native tree proof), G03 (missing/contradicted gate-definition or environment evidence → no strict promotion) and G12 (HEAD/source tree changed after native PASS → historical proof recorded, no current-source promotion), each as a red test plus negative mutant, with the classifier red/mutant landed on the Mechanical producer side first and the Pi projection assertion second.
- Rationale: C187, C188, C189, C198 are NON-EPISTEMIC (NORMATIVE rows of the adopted matrix). C181 (SOURCE_REPORT, ESTABLISHED) records that no command or gate was executed in authoring, so every matrix row is currently untested design. Cures M196 (map G01 to MW Q01 and preserve the original raw envelope), M197 (specify field paths and the accepted independent run-record proof; test absent and contradicted tree separately), M198 (unify certificate axes with MW; assert environment eligibility, not mere field presence), M207 (split gate-response-to-settlement drift from post-settlement drift; Pi never invents a certificate the producer declined to issue).
- Acceptance criteria:
  - For each of G01/G02/G03/G12 a producer-side (MW) test injects the stated evidence defect and asserts the required classification (indeterminate / no strict promotion), and a mutant that weakens the classifier turns the test red.
  - A Pi-side test asserts the projected assurance for the same envelope is not `strict` and the original raw producer envelope is preserved byte-addressable in the receipt.
  - G02 runs twice: candidate-tree evidence absent, and candidate-tree evidence contradicted; both classify indeterminate independently.
  - G12 distinguishes drift before settlement from drift after settlement; the historical PASS stays recorded and no current-source promotion occurs in either case.
  - The exact certificate field paths asserted (e.g. the gate-passed datum) are read from the ratified joint schema of EAT-R458, not hard-coded doc-04 prose names.
- V-tier: V1 (producer red/mutant) + V4 projection assertion.
- Maps-to: MII P09 — extends wb-xr1z (open).
- Conditions: field vocabulary (`data.gate_passed`, gate-definition hash, environment binding) is design prose at the pins, not verified code fields; EAT-R458 ratification must precede test authorship.

## EAT-R447 — Implement the uncertain-effect falsifiers G04 and G05

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G04 (writer edits then restores bytes before a lost acknowledgment → no blind retry from clean HEAD) and G05 (ignored/untracked/out-of-worktree side effect with lost acknowledgment → uncertainty preserved; retry denied absent comprehensive native absence evidence), with the bounded effect class and its non-occurrence detector defined before any retry is permitted.
- Rationale: C190, C191 NON-EPISTEMIC (NORMATIVE). The hazard is real at the pins: C083 (HYPOTHESIS, SUPPORTED — a producer may have performed effects when its acknowledgment is lost). Hard invariant: absence claims need a detection surface. Cures M199 (define bounded effect class and non-occurrence detector before allowing retry; producer red first, joined observation/recovery assertion second), M200 (split ignored, untracked and external-effect rows into separate tests; state detector coverage; external runtime evidence is missing and must not be claimed).
- Acceptance criteria:
  - G04: inject edit-then-restore with lost ack; assert clean HEAD alone yields no retry permission; a mutant granting retry on clean HEAD turns red.
  - G05 is three separate tests — ignored file, untracked file, out-of-worktree effect — each asserting the disposition stays uncertain and retry is refused; no single conjoined test stands in for all three.
  - Each denial names its detector and the detector's coverage bound in the receipt; coverage gaps (external runtime effects) are recorded as unknown, not as verified absence.
- V-tier: V1 + V5.
- Maps-to: MII P09 — extends wb-9bof (open).
- Conditions: the comprehensive-native-absence evidence format depends on the MW effect-reconciliation surface (C173 SUPPORTED: exports exist at mw pin but are not importable via the reviewed ./host subpath); its export path must be ratified in the EAT-R469 crosswalk before the joined leg.

## EAT-R448 — Implement the lease-exclusivity falsifiers G06 and G07

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G06 (worker alive after launch reply → same-root lease retained, second same-root invocation rejected) and G07 (two Pi processes on one canonical root → exactly one live writer, including across restart), through the registered route, with lease release bound to producer terminal/reconciliation rather than launch-promise settlement.
- Rationale: C192, C193 NON-EPISTEMIC (NORMATIVE). The defect premises are graded: C043 (ESTABLISHED — at the pin the source-admission lease is released when the dispatch promise resolves), C117 (ESTABLISHED — WriterLeases is an in-memory Map in one host process), C155 (SUPPORTED — the lease is process-local and launch-return-scoped), C081 (SUPPORTED — a native-handle-returning launch could release ownership while the writer is paused), C044 (SUPPORTED — a detached/async launch may return while its writer runs). Cures M201 (registered launch-return-while-worker-sleeps red test; bind release to producer terminal), M202 (ratify fence token/current-generation verifier and ownership authority; dual-process, restart and stale-worker mutants in the supported topology; deny unsupported fleet execution).
- Acceptance criteria:
  - G06: a registered launch resolves while the worker sleeps; a second invocation on the same canonical root (including an alias path) is refused; the lease remains held; a mutant restoring launch-return release turns red.
  - G07: two separate Pi processes contend for one canonical root; exactly one acquires the writer; repeat with the first process killed and restarted — the restarted topology still yields at most one live writer and the stale generation cannot write.
  - Both run in the named supported topology (same-machine); the receipt states fleet/multi-host topologies as untested, not as passing.
- V-tier: V1 + V5.
- Maps-to: MII P09 — extends wb-9bof (open) (lease implementation surface: wb-2ukh, in_progress).
- Conditions: cross-process lease substrate must exist first (EAT-R464); until then these tests are definitionally red.

## EAT-R449 — Implement the admission and authority falsifiers G08, G09, G10, P13 and P14

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G08 (differing Beads notes, identical typed input → identical admitted and dispatched canonical input, no note read), G09 (installed JS mutated after extraction → refusal before trusted import), G10 (forged grant/root/profile/principal in the tool request → no additional authority or side effect), P13 (principal/grant revoked during install → final-boundary refusal, zero writer calls) and P14 (source clean/manifest change during wait → refusal retaining the source-mismatch reason), each as red test plus negative mutant through the registered admission path.
- Rationale: C194, C195, C196, C199, C200 NON-EPISTEMIC (NORMATIVE). Graded premises: C038 (ESTABLISHED — admission digests after withoutBeadsNotes strips note text), C080 (PLAUSIBLE — a naive launcher could pass note-bearing original input after admitting stripped input; this is the G08 hazard and stays plausible, not observed), C082 (SUPPORTED — authority/source checks can go stale across the install/wait window), C048 (SUPPORTED — independent rechecks do not form an atomic policy across async waits), C113 (SUPPORTED — no shared transaction manager across Git/permission/lease/import/SDK), C111 (ESTABLISHED — dispatchFunctionWithAuthority already rechecks at entry and after wait). Cures M203, M204 (split P-rows), M205, M208, M209 (narrow scope).
- Acceptance criteria:
  - G08: two requests differing only in note bytes admit and dispatch byte-identical canonical payloads with equal digests; an instrumented launcher proves no note byte reaches the dispatched payload.
  - G09: mutate one installed dist file after extraction; import is refused before any module code runs; the refusal names the digest mismatch.
  - G10: forged grant, forged root, forged profile and forged principal are four separate injections; each yields zero authority escalation and zero side effect (assert with the EAT-R453 detectors).
  - P13: revoke mid-install; assert final-boundary refusal with zero writer callbacks. P14: change cleanliness or manifest during the wait; assert refusal whose reason retains the source mismatch.
- V-tier: V1 + V3.
- Maps-to: MII P09 — extends wb-xr1z (open).
- Conditions: none beyond re-pin (P00).

## EAT-R450 — Implement the recovery falsifiers G11 and P18, inheriting the wb-7wkb harness

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G11 (kill after commit or gate dispatch with lost acknowledgment → native reconciliation, no automatic duplicate) and P18 (executor crash with an open writer fence → disposition stays unknown, fence retained, no second effect), extending the existing MNI kill/verifier harness (closed bead wb-7wkb) and inheriting its recorded not-claimed list rather than starting fresh.
- Rationale: C197, C204 NON-EPISTEMIC (NORMATIVE). C083 (SUPPORTED) grounds the lost-ack hazard; C118 (SUPPORTED — a lease timeout alone does not establish the writer stopped or effects settled) bars timeout-based release in the recovery path. Cures M206 (test writer loss and gate loss separately through the joined route, including null IDs and callback throws; typed thrown refusals stay distinct from the four returned domain outcomes), M213 (test persisted open intent/fence on fresh-process restart with PID-reuse and late-worker cases; distinguish fsync/rename from directory durability and state the tested fault model), M020 (MII P09 should extend the wb-7wkb harness and inherit its not-claimed list).
- Acceptance criteria:
  - G11 runs twice: kill after candidate commit, and kill after gate dispatch; in both, restart performs native reconciliation lookup and no duplicate writer effect occurs; a mutant that auto-retries turns red.
  - P18: crash with an open fence; after fresh-process restart the invocation reads unknown, the fence is still held, and a PID-reuse impostor cannot write; a late-arriving original worker is fenced.
  - The receipt states the tested fault model explicitly (process kill; fsync/rename durability vs parent-directory durability distinguished) and carries forward the wb-7wkb not-claimed list (e.g. power loss, SDK-child survival) as still-not-claimed.
- V-tier: V5.
- Maps-to: MII P09 — extends wb-9bof (open) (harness lineage: wb-7wkb, closed).
- Conditions: durable intent/fence journal (MII P02/P07) must exist; see EAT-R464.

## EAT-R451 — Implement the observation-integrity falsifiers P15, P16 and P17

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The suite MUST implement P15 (cross-scope native ref/observer replay → zero cross-principal events or control leak), P16 (duplicate/late event after terminal → idempotent projection, no new effect) and P17 (truncated response → no non-addressable native ref emitted; invocation remains observable), each as red test plus negative mutant against the observation bridge and journal.
- Rationale: C201, C202, C203 NON-EPISTEMIC (NORMATIVE). C213 (ESTABLISHED — at the Pi pin workflow_observe is keyed by taskId over local session/workspace/principal state; it does not yet establish the program's invocation-scoped observation), so these rows currently have no implemented subject and must land with the P06 bridge. Cures M210, M211, M212; M222 for C213 (define the logical-invocation-to-existing-store mapping and durable replay without parallel hidden state; preserve scope, freshness and gap counters).
- Acceptance criteria:
  - P15: a second principal/scope replays a captured native ref and observer query; assert zero events, zero control authority, and an audit record of the denial.
  - P16: inject a duplicate and a late event after terminal; the projection is byte-identical before/after (idempotent) and no effect or state transition fires.
  - P17: force response truncation of a long native identity; assert the reply contains either a complete addressable ref or none, never a truncated identifier, and the invocation remains queryable afterward.
- V-tier: V1 + V3.
- Maps-to: MII P06 — extends wb-9a1o (open).
- Conditions: none beyond P06 existence.

## EAT-R452 — Keep the four domain outcomes separately inspectable on every surface that exists

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST present verified_candidate, verification_failed, needs_evidence and indeterminate as four distinct, separately inspectable terminal readings — never collapsed, never converted (indeterminate is not failure; needs_evidence reaches no writer or gate) — in the Pi UI, tool replies and journal; the doc-04 "CLI output" surface MUST first be resolved to an actual shipped binary or explicitly re-scoped, since Pi's package has no bin/CLI export at the pin.
- Rationale: C205 NON-EPISTEMIC (DEFINITION of the four-outcome domain); C215 (ESTABLISHED — the MW contract names exactly four callbacks and four typed outcomes; types alone prove no behavior); C219 (ESTABLISHED — no bin/CLI export exists in Pi package.json at 0fb90672, so a CLI-output claim has no referent). Cures M214 (ratify producer strict semantics first; keep the domain union separate from transport/refusal/uncertainty errors; identify host-pi vs rig-CLI assertions), M228 (resolve the doc-04 CLI referent; do not invent a pi-subagents binary and do not infer absence of host/producer CLIs).
- Acceptance criteria:
  - A fixture per outcome drives the registered route to that terminal; assertions read the typed outcome field distinctly on each shipped surface (tool reply, observe projection, journal row).
  - A test asserts verification_failed and indeterminate are distinguishable in every projection, and a mutant collapsing them turns red.
  - Transport errors and typed refusals are asserted to be outside the four-outcome union (thrown/refused, not laundered into an outcome).
  - The release receipt names which surfaces exist; if a CLI surface is claimed, the receipt names the binary and its package; otherwise the CLI row is recorded as out of scope.
- V-tier: V3.
- Maps-to: MII P06 — extends wb-9a1o (open).
- Conditions: CLI referent resolution is an owner decision recorded in P00/P10 docs.

## EAT-R453 — Prove zero side effects on denial with independent detectors

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: For every input or permission denial, the suite MUST prove 0 Mechanical callbacks, 0 SDK sessions, 0 Forge gate requests and 0 workspace writes using independent spies/native event capture and a bounded workspace/effect detector, pairing each denial with an admitted positive control and a guard-removal mutant.
- Rationale: C206 NON-EPISTEMIC (NORMATIVE). The zero-claims are absence claims, so the hard invariant applies: each needs a stated detection surface. Cure M215 (define independent spies/native event capture and a bounded workspace/effect detector; pair denial with an actual admitted positive and a guard-removal mutant so the zero is demonstrably detectable).
- Acceptance criteria:
  - Each denial test asserts all four zeros through detectors that are proven live by the paired positive control (same detectors observe nonzero on the admitted run).
  - A guard-removal mutant makes at least one detector fire, turning the test red.
  - The receipt states each detector's coverage bound; effects outside the bound are recorded as undetected-by-this-surface, not as absent.
- V-tier: V3.
- Maps-to: MII P09 — extends wb-xr1z (open).
- Conditions: none.

## EAT-R454 — Report post-dispatch cancellation as uncertain with exact refs and no rollback claim

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Cancellation after dispatch MUST report the exact native session/operation refs where known, publish the effect disposition as uncertain, and never claim rollback; pre-dispatch and post-dispatch cancellation MUST remain distinguishable states.
- Rationale: C207 NON-EPISTEMIC (NORMATIVE); C224 NON-EPISTEMIC (NORMATIVE — requested vs established cancellation). C131 NON-EPISTEMIC (NORMATIVE rule: after a possible side effect the invocation is published uncertain with its native ids). Cure M216; lineage: the MNI controls bead wb-5a7k is closed — its cancellation-uncertainty behavior is inherited, and this requirement extends it to the function route rather than re-opening it.
- Acceptance criteria:
  - Cancel before dispatch: terminal shows cancelled-pre-dispatch, zero effects proven via EAT-R453 detectors.
  - Cancel after dispatch: reply and journal carry known native refs verbatim, disposition uncertain, and no field asserts rollback or undo; a mutant reporting clean rollback turns red.
  - The two cancellations project to distinct typed states in observe output.
- V-tier: V3 + V5.
- Maps-to: MII P07 — extends wb-mwsy (open) (controls lineage: wb-5a7k, closed).
- Conditions: none.

## EAT-R455 — Run the resource trials against a measured script baseline without inventing SLAs

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The release MUST include resource trials of 1, 4 and 16 concurrent different-root invocations plus a separate same-root denial trial, measuring p50/p95 cold/warm startup, queue, serialization, event growth, memory, FD and child count on the existing load harness with an explicit joined/native leg and a fixed comparable environment, compared against the existing Pi script path under comparable conditions; metrics not measured (token/cost, child counters where uninstrumented) MUST be recorded as unknown, and no SLA may be asserted that was not measured.
- Rationale: C208 NON-EPISTEMIC (NORMATIVE, including the no-invented-SLA clause). Cure M217 (reuse the existing load harness with an explicit joined leg, fixed environment, measured denominators; preserve unmeasured token/cost/child counters as unknown).
- Acceptance criteria:
  - Receipts contain the three concurrency runs and the same-root denial run with raw measurements and environment fingerprint; the comparison table names the script-path baseline run it compares against.
  - Any absent metric appears as null/unknown, never as a number; a validator rejects a receipt asserting an SLA with no measurement row.
- V-tier: V5.
- Maps-to: MII P09 — extends wb-9bof (open).
- Conditions: none.

## EAT-R456 — Persist QA evidence in a new source-pinned receipt directory; never rewrite provenance; never cite or deny GitHub CI

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: All release-program logs and evidence MUST land in a new source-pinned QA receipt directory; older receipts and provenance MUST NOT be rewritten; release evidence MUST NOT cite GitHub CI runs as proof; and program/receipt wording MUST NOT assert that the Pi repository has no GitHub CI.
- Rationale: doc-04 preamble duty (persist under a new source-pinned QA receipt directory) is NON-EPISTEMIC (NORMATIVE). C181 (SOURCE_REPORT, ESTABLISHED) with cure M190: keep attribution and authoring interval; do not infer no historical tests or a gate-neutral deposit. C138 is REFUTED — the absence claim "the Pi repository has no GitHub CI" is false at the pin (a ci.yml with lint/typecheck/test jobs exists at 0fb90672) — so it compiles negatively only: the rule reading "do not rely on CI as packet evidence" stands (C034, C136 NON-EPISTEMIC), while the empirical absence wording is barred.
- Acceptance criteria:
  - A validator asserts every new receipt lives under a directory keyed by both source SHAs and rejects writes into prior receipt directories (append-only custody).
  - Grep-gate over program docs and receipts: no sentence asserts "no GitHub CI" as a repository fact; evidence tables contain no GitHub Actions run as a gate witness.
  - Historical receipts byte-identical before/after the release cut (hash census).
- V-tier: V0 + V1 (validator).
- Maps-to: MII P10 — extends wb-yiu4 (open).
- Conditions: none.

## EAT-R457 — Capture every native evidence axis from the actual run; never populate from synthetic frames or local HEAD

- Type: INSTRUMENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: The opt-in native journey MUST capture, from the actual run only: source candidate SHA and tree, Forge manifest hash, Forge operation id, the original gate envelope, the gate definition (and its hash) and the environment binding; no receipt field may be populated from a synthetic frame, a template placeholder, or the current local HEAD standing in for the executed candidate.
- Rationale: C209 NON-EPISTEMIC (NORMATIVE). Cure M218 (require an evidence-acquisition/validator step for each native axis and both hashes; never populate template fields from synthetic frames or current local HEAD). This is the per-axis half of the phantom-name cures: a named field with a fabricated or mis-sourced value is the same defect class as a phantom name.
- Acceptance criteria:
  - A per-axis validator cross-checks each captured value against an independent witness (e.g. candidateCommit/candidateTree against the repository odb; forgeOperationId against the producer's own record; manifest hash recomputed from the installed artifact).
  - A mutant that fills any axis from local HEAD or a fixture frame is caught by the validator (red).
  - Unavailable axes are null with a reason, never synthesized (ties to EAT-R458 null semantics).
- V-tier: V4.
- Maps-to: MII P08 — extends wb-p3i2 (open).
- Conditions: native credentials are opt-in; absent credentials the axis rows stay null-with-reason and the tier stays unachieved (no false green).

## EAT-R458 — Ratify the release receipt schema and enforce it with null, mismatched-field and phantom-ID mutants

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: Before V4/V5 receipts are produced, the release receipt JSON proposed in doc-04 MUST be ratified as a versioned joint schema specifying: schema id, namespaced tier vocabulary, shared join keys with the MW receipt (invocation/commit keys), native-vs-manifest hash distinction, ref/effect/error mappings, owning directory and owner, and a validator; the validator MUST be exercised with null-field, mismatched-field and phantom-ID mutants, prior receipts MUST be preserved unchanged, null MUST remain null, and native IDs MUST never be fabricated.
- Rationale: C211 NON-EPISTEMIC (PROPOSAL — the field list is a template, not an existing receipt; its permitted wording requires ratifying a versioned joint schema or explicit mappings, common invocation/commit keys and a validator, keeping unavailable IDs null and effect uncertainty separate). Cure M220 verbatim carries the phantom-ID mutant duty — the direct cure for the MNI phantom-receipt-name lesson. C128 NON-EPISTEMIC (NORMATIVE: a missing producer id is never replaced by a fabricated name).
- Acceptance criteria:
  - The schema file exists with a schema id and version; the Pi and MW receipt emitters both validate against it or against explicit documented mappings; join keys resolve one logical invocation across both receipts.
  - Validator mutants: (a) a receipt with a fabricated/phantom native ID is rejected; (b) a mismatched field name (e.g. a prose-name variant of a schema field) is rejected; (c) null axes pass as null-with-reason and are not auto-filled.
  - A hash census proves prior receipts unchanged by schema adoption.
- V-tier: V1 (schema+validator) consumed at V4/V5.
- Maps-to: MII P10 — extends wb-yiu4 (open).
- Conditions: joint ratification with MW (mw-04 receipt shape) via the EAT-R469 crosswalk.

## EAT-R459 — Enforce the release vetoes as executable gates over a ratified G/P↔Q↔MNI mapping

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: Each doc-04 release veto MUST be enforced by a named executable gate — unsupported function invocable; raw caller field becoming authority / no exact grant; launch handle freeing an active writer / second process writing the same root; canonical digest differing from the payload reaching Mechanical; missing Forge proof becoming verified_candidate or a historical pass credited to a changed tree; unknown effect auto-retrying or missing evidence resolving to failure/success; registration test bypassing the Pi tool or native test using fake SDK/Forge; missing L4/L5 marked shipped; skill/README/feature-matrix advertising deployment without receipts; existing script/subagent regression failures — and the tier and falsifier identifiers backing each veto MUST come from a ratified G/P↔Q↔MNI A/B/C mapping table naming the actual enforcing validator or counter for each row. Veto documentation MUST NOT justify ownership via the shared D-ledger reading.
- Rationale: C210 NON-EPISTEMIC (NORMATIVE veto list). Cure M219 (ratify tier and G/P-to-Q-to-MNI A/B/C mapping; identify actual enforcing validators/counters; preserve existing green regression cases separately from new red tests). Negative clause from C032 (REFUTED — the D-numbers are not one corpus-described ledger: D1/D2/D4/D7/D8/D10/D11/D12 occur in Pi only as README labels, described only in the MW companion, where none of D8/D10/D11/D12 is marked shared), so no veto or ownership row may cite a D-number as if the Pi corpus defined it or as if it were shared-owned.
- Acceptance criteria:
  - A machine-readable veto table maps each veto → gate command/validator id → falsifier ids (G/P rows, MW Q rows, MNI A/B/C rows) with all three namespaces explicit; a release dry-run executes every gate and the release command refuses while any veto gate is red or unmapped.
  - Existing green regressions (script/subagent suites) are listed separately from new red tests, and a regression failure trips the veto.
  - A doc lint rejects a veto/ownership row citing a bare D-number without its MW companion definition reference.
- V-tier: V0 (table) + V1 (gates), binding at release.
- Maps-to: MII P10 — extends wb-yiu4 (open).
- Conditions: crosswalk ratification (EAT-R469) precedes table freeze.

## EAT-R460 — Gate V2 on a real packed-host install in a fresh external consumer

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The V2 tier MUST be claimed only from an actual independently npm-packed Mechanical host installed into a fresh external consumer with digest and runtime-file checks passing there, and MUST NOT be described as a Pi invocation.
- Rationale: C183 NON-EPISTEMIC (NORMATIVE tier definition). C214 (ESTABLISHED — @mechanical/development-rig/host is a real export at the MW pin) and C218 (ESTABLISHED — Pi declares Node >=24 while MW rig declares >=22.18.0 <25, so the joint consumer needs an overlapping measured runtime) scope the gate. Cure M192; M227 for the Node-overlap premise.
- Acceptance criteria:
  - The gate packs the MW host, installs it in a new temp consumer, verifies tarball sha256 and per-file runtime manifest, imports only the reviewed ./host subpath, and records the consumer's Node version within the measured overlap window.
  - The receipt labels the run V2/installed-consumer; a lint rejects any wording crediting it to Pi or to the registered route (the MW L2 fixture named pi-consumer is not L4/V3).
- V-tier: V2.
- Maps-to: MII P04 — extends wb-y0n6 (in_progress).
- Conditions: none.

## EAT-R461 — Gate V3 on the actually registered Pi tool with deterministic callbacks

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The V3 tier MUST be claimed only from an invocation of the actually registered workflow_execute(kind=function) that reaches deterministic four-callback fixtures exactly once and is observed via workflow_observe on the same logical invocation; a direct host-helper call MUST NOT count as V3, and V3 MUST NOT claim native providers.
- Rationale: C184 NON-EPISTEMIC (NORMATIVE tier definition). C212 (ESTABLISHED — the four workflow tools are registered at the Pi pin and execute rejects non-script kinds today, so the registered function branch is new work this gate must exercise); C107 (ESTABLISHED, arbitrated — FUNCTION_ACTION_CONTRACT is the frozen unadopted default with no production adopter at the pin, so adoption is part of what V3 proves). Cure M193.
- Acceptance criteria:
  - The gate invokes the registered tool by its registered name through the tool dispatcher (not by importing the launcher), asserts exactly-once callback delivery, and asserts the same invocationId is observable via workflow_observe.
  - A bypass mutant (calling the host helper directly) is detected by the gate's route witness and rejected as V3 evidence.
  - The receipt records zero native-provider claims for this tier.
- V-tier: V3.
- Maps-to: MII P05 — extends wb-4bxo (open).
- Conditions: P05 registration landed; grant adoption (wb-w8fk) ratified.

## EAT-R462 — Acquire the missing joined native-run evidence (V4), including the uncensused external stores

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The program MUST produce the currently nonexistent joined-run evidence: a V4 receipt of one invocation through the registered Pi route reaching a Mechanical function with real Claude, real Git and a real strict Forge gate — capturing the actual strict-positive native envelope, exact resolved SDK paths/versions and the certificate result/event carrier — and, before claiming any broader absence or firstness, MUST census the evidence stores outside the two repositories (the OrchestrationEngineer ledger directory and home-directory Forge ledgers cited by existing receipts) for prior joined receipts.
- Rationale: C023 (OBSERVATION, ESTABLISHED absence — no joined live Claude/Git/Forge receipt exists in the committed stores of either repository at the pins; absence beyond the two repositories is explicitly not settled: the ledger's missing-to-settle names the uncensused external stores). C185's strict-positive envelope facet was preserved as undetermined by M194, which directs exactly these named evidence-acquisition gates (strict-positive native envelope; exact resolved SDK paths/versions; certificate result/event carrier). Never relax proof by silently replacing native providers (M194).
- Acceptance criteria:
  - A V4 receipt (EAT-R458 schema) exists with non-null native axes validated per EAT-R457, produced through the registered route (route witness as in EAT-R461).
  - The external-store census runs with a stated detection surface (directories enumerated, query used, time window) and its result (prior joined receipts found or none-in-surface) is recorded in the receipt; absence wording stays scoped to the censused surfaces.
  - If credentials/providers are unavailable, the tier is recorded unachieved with the exact blocker; no fallback provider is silently substituted.
- V-tier: V4.
- Maps-to: MII P08 — extends wb-p3i2 (open).
- Conditions: blocked on MW native closure (mw-03 packets per EAT-R469 crosswalk) and opt-in credentials.

## EAT-R463 — Acquire the missing joined crash-restart proof (V5)

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The program MUST produce the currently nonexistent proof that a joined Pi-to-Mechanical invocation survives host/worker crash and restart — reattached or reconciled afterwards without a duplicated effect — by running the G11/P18 harness (EAT-R450) over the registered joined route in the named supported process topology, and MUST record which fault classes remain unproven.
- Rationale: C024 (OBSERVATION, ESTABLISHED absence — no joined crash/restart proof exists in either repository at the pins and none could have been produced through the registered route; single-side fault harnesses exist and stay baseline). C186 NON-EPISTEMIC (NORMATIVE V5 definition). Cures M020 (extend wb-7wkb's harness; inherit its not-claimed list), M195 (name the supported process topology; preserve untested SDK-child/power-loss limits; do not call optional profiles verified by embedded tests).
- Acceptance criteria:
  - V5 receipts show kill-at-stage runs (per doc-04 safety matrix: each stage) on the joined route with durable source state and intent after restart, no false settlement, PID fencing asserted, and no duplicate effect (EAT-R453 detectors).
  - The receipt's not-claimed list explicitly carries forward untested classes (power loss, SDK-child survival, non-supported topologies).
  - Observation state survives restart or is rebuilt from the durable journal — not from in-memory session state (C213 ESTABLISHED baseline; cure M222).
- V-tier: V5.
- Maps-to: MII P09 — extends wb-9bof (open) (harness lineage: wb-7wkb, closed).
- Conditions: requires EAT-R450 harness and EAT-R464 durable lease/journal.

## EAT-R464 — Acquire the missing cross-process writer-lease proof; define or drop "compatible"

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION; secondary RISK_CONTROL
- Statement: The program MUST produce the currently nonexistent evidence of writer-lease exclusivity beyond one process: a durable same-machine cross-process lease (persisting after launch return, fencing stale generations, surviving restart in a recovery-held state) proven by the G06/G07 tests; the README term "compatible distributed lease" MUST be given a defined referent or be dropped; and the lease-owner ruling plus the wb-1zn2 external-gate dependency MUST be carried into P00 so the acquisition is tracked against its MW-owned blockers.
- Rationale: C025 (OBSERVATION, ESTABLISHED absence — no distributed, nor even cross-process, writer-lease implementation or proof exists in either repository at the pins; "compatible" has no defined referent; the first release's own cross-process requirement is equally unproven). C016/C042 (ESTABLISHED — WriterLeases is in-memory, process-local), C043 (ESTABLISHED — released on dispatch-promise resolve), C155 (SUPPORTED), C118 (SUPPORTED — timeout is not proof of safe release). Cures M021/M022 (define or drop "compatible"; state the nearer cross-process absence; carry the lease-owner ruling and wb-1zn2 external gate in P00). C116/C115/C121 NON-EPISTEMIC (PROPOSAL substrate: durable single-machine lock/journal, lease object, release law).
- Acceptance criteria:
  - A durable lease substrate exists whose persisted owner is observable; G06/G07 (EAT-R448) pass against it including the restart case; timeout-only release is impossible by construction (a timeout transitions to recovery-held, never to free; mutant proves it).
  - P00 ratification records the chosen referent for "compatible" (or documents the term's removal) and links the wb-1zn2 (deferred) external-gate rows that gate any MW-side lease obligations.
  - The receipt scopes the proof to same-machine cross-process; multi-host remains recorded as unproven.
- V-tier: V1 + V5.
- Maps-to: MII P02 — extends wb-2ukh (in_progress) (external gates lineage: wb-1zn2, deferred).
- Conditions: owner decision on the "compatible" referent (pin owner: Pi Workbench).

## EAT-R465 — Expose per-axis readiness in discovery/inspect and explain disabled functions by host-owned remedy

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Tool discovery/inspect MUST present the one reviewed function with each readiness axis separately — descriptor available, runtime artifact admitted, effective permission, source eligible, writer availability, native provider available, strict gate profile — bound to actual registered capability metadata; a disabled function MUST state which axis fails and which host-owned action could resolve it, and MUST NOT suggest model-supplied fields can grant permission.
- Rationale: C222 NON-EPISTEMIC (NORMATIVE). Baselines: C212 (ESTABLISHED — tools registered, function kind advertised but rejected at the pin), C107 (ESTABLISHED, arbitrated — the unadopted FUNCTION_ACTION_CONTRACT refusal is the current disabled state this surface must truthfully render), C104 (ESTABLISHED — descriptor/allowlist pinning exists). Cure M231 (bind to actual registered capability metadata and test each disabled axis, redaction/scope and host-only remedy without loading or effecting the provider).
- Acceptance criteria:
  - One test per axis: break exactly that axis; inspect output flags exactly that axis false with a host-owned remedy string, and the probe performs zero provider loads/effects (EAT-R453 detectors).
  - A forged model-side grant in the request changes no readiness axis (ties to G10).
  - Redaction/scope rules applied to the inspect payload are asserted (no secret/los paths leak).
- V-tier: V3.
- Maps-to: MII P05 — extends wb-4bxo (open).
- Conditions: none.

## EAT-R466 — Keep launch strictly launch-only and ratify the response envelope before anything copies it

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The launch reply MUST assert only launch (invocation ID, source commit, definition digest, host mode, launch-only status) and MUST never signal completion or SUCCESS because the launcher succeeded; the observation view MUST carry independent rows for native session, candidate commit/tree, Forge gate, evidence strength, effect intent/reconciliation and last update; empty nativeRefs MUST appear only when truthfully empty; and the exact outer/inner response envelope MUST be ratified before tests, examples or docs copy the doc-05 illustration.
- Rationale: C223 NON-EPISTEMIC (NORMATIVE); C225 NON-EPISTEMIC (PROPOSAL — the JSON response is illustrative, not executed output). C030 (SUPPORTED — the existing observe-after-launch mechanism this builds on). Cures M232 (require the producer strict-certificate dependency and a mandatory independent assurance projection, scoped carrier, exact same invocation; carry thrown errors without outcome laundering), M234 (separate the proposal from the established builder conflict and trimming exception; ratify envelope, honest status and empty-ref semantics before tests/examples copy it).
- Acceptance criteria:
  - A schema test pins the ratified launch envelope; completion fields are absent/`not-asserted` by type; a mutant adding a success flag at launch turns red.
  - Observation projection shows the independent rows populated from distinct witnesses; evidence strength is computed from the producer certificate (EAT-R446), never from launch status.
  - A fixture with no native refs asserts emptiness is truthful (producer never emitted refs) and a fabricated-ref mutant is rejected (ties to EAT-R458 phantom-ID mutants).
- V-tier: V3.
- Maps-to: MII P06 — extends wb-9a1o (open).
- Conditions: envelope ratification is a P00/P05 owner decision.

## EAT-R467 — Give controls reason-specific help and gate risky release behind an audited explicit override

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Controls MUST distinguish cancel-requested from cancel-established, support reattach and read-only reconcile, allow release only on known-safe settlement, and require an explicit, audited, distinctly labelled operator override for anything else; reason-specific action help MUST exist for SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING and UNCERTAIN_EFFECT, with each reason mapped to the producer code that raises it.
- Rationale: C224 NON-EPISTEMIC (NORMATIVE). C119/C121 NON-EPISTEMIC (NORMATIVE lease quarantine/release law); C118 (SUPPORTED — timeout is not settlement evidence) grounds why release needs evidence or override. Cure M233 (ratify refusal/LX mapping to producer codes and lease-release rules; distinguish risky override from known-safe release; carry the pending cancellation-ordering repair and authority checks).
- Acceptance criteria:
  - Each of the five reasons is raised by a fixture and the control reply carries that reason's specific help text and producer code; an unmapped producer code fails closed with a generic-unknown reason, never a wrong specific one.
  - Release on a known-safe terminal succeeds; release on uncertain state is refused; the override path requires an explicit flag, writes an audit record naming operator/reason/time, and is labelled distinctly in observe output; a mutant silently releasing on timeout turns red.
  - Reattach joins the same invocationId and running native producer without re-dispatch.
- V-tier: V3 + V5.
- Maps-to: MII P07 — extends wb-mwsy (open) (controls lineage: wb-5a7k, closed).
- Conditions: producer code vocabulary ratified via EAT-R469.

## EAT-R468 — Reconcile skill, README/AGENTS, W11 and workbench docs truthfully through their frozen readers

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: Every packet cut that touches .agents/skills/pi-mechanical-interop/SKILL.md, README/AGENTS.md, docs/workbench/feature-matrix.md W11 or the workbench security/operations/tool docs MUST, in the same cut: reconcile the frozen-shape readers (the wb-12x1 census test and any release validators) through their append-only/owner-pin protocol; keep shipped/unshipped rows matching actual achieved tiers with planned work marked planned; annotate rather than rewrite hash-pinned historical rows and receipts; provide one unambiguous current skill entrypoint naming the new program; and MUST NOT advertise deployment without receipts, describe scripts as Mechanical function adapters, import historical workbench-branch evidence as current master, or use the placement word "attached" for a Pi mode that does not exist.
- Rationale: C226 NON-EPISTEMIC (NORMATIVE duty list). Graded baselines: C216 (ESTABLISHED — W11 exists with status planned and the skill exists at the pin), C217 (ESTABLISHED — the historical W11 row still describes the HX→RF→SDK→Forge composition while this program's first release is Git-census/plain), C220 (ESTABLISHED — the skill still leads with the November 9 program and a frozen-shape census test reads it), C001 (ESTABLISHED — design-only status). Negative clause from C029 (REFUTED — "attached" names no Pi placement at the pin; the real placements are embedded and explicitly-admitted same-machine detached) with C230 NON-EPISTEMIC and cure M239 (reconcile README to embedded; define or drop "attached"). Cures M225 (link producer/native/restart receipts only when achieved), M226 (reconcile W11 without rewriting hash-pinned rows; pin advance is a separate owner decision), M229 (skill edits reconcile frozen readers in the same cut; name landing trunk vs default-branch skill; one unambiguous entrypoint), M235 (include census and release-validator readers in the packet surface; do not rewrite historical receipts to make gates green).
- Acceptance criteria:
  - The wb-12x1 census test and release validators pass at the same commit as every docs/skill edit (same-cut gate), via appended rows, never edited pinned rows (hash census over pinned sections).
  - A docs lint fails on: a shipped row without a receipt link; the word "attached" as a Pi placement; script paths described as function adapters; a workbench-branch receipt cited as master evidence.
  - The skill's first section names the MII program and its status, with the November 9 program preserved below as history.
- V-tier: V0 + V1 (lint/census gates).
- Maps-to: MII P10 — extends wb-yiu4 (open) (docs lineage: wb-12x1, closed).
- Conditions: any pin advance of frozen rows is the owner's recorded decision (Pi Workbench), never this packet's.

## EAT-R469 — Ratify one joint identifier crosswalk; forbid dependencies declared by bare H-label

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: Before any cross-repository dependency is declared or scheduled, the program MUST ratify one joint identifier table covering: Pi handoff rows H01–H05 and MW packet labels (with owner + document namespace + content on every row), MW README aliases, Pi packets P00–P12, the G/P↔Q falsifier correspondence, MNI lineage labels and actual bead ids; after ratification, a dependency declared by bare H-number (or bare packet number) without owner/content qualification MUST be rejected by review tooling. The crosswalk MUST record the content mapping the audit established — Pi H01→MW H03/H04/H06, Pi H02→MW H05, Pi H03→MW H01, Pi H04→MW H02/H07 — as the starting proposal for ratification, and MUST name exact export paths for consumed MW surfaces.
- Rationale: C221 (OBSERVATION, SUPPORTED — the two corpora number the same work under colliding H-labels; a label-only handoff is ambiguous; content mapping per its permitted wording). C140 (UNSUPPORTED — "P04 composed admission" node vs "P04 reviewed installed host consumer" section identity is not stated by the document), C163 (UNSUPPORTED — P04's H01/H02 dependency premise collides across corpora), C142 (UNSUPPORTED — P08's H01/H02/H03 premise; mw-03's joined node is H08 gated on H05+H06+H07+Pi dispatcher): all three compile as must-ratify, never as assumed mappings. C227/C228 NON-EPISTEMIC (NORMATIVE handoff duties; no copying MW internals, no MW dependency on Pi). C173 (SUPPORTED, arbitrated — effect-intent/reconciliation exports exist at the MW pin but are not importable via the reviewed ./host subpath), so consumed-surface rows must carry exact export paths and their packaging blockers. Cures M230 (ratify one joint identifier table including MW README aliases, Pi packets/handoffs, MNI lineage and actual bead ids before assigning dependencies), M236 (downgrade modality; name all MW packet dependencies by owner/content with exact export, immutable closure, strict certificate carrier, effect/recovery and runtime readiness blockers), M237 (content-qualified handoffs, not collision-prone H labels), and M196/M219's Q-mapping halves.
- Acceptance criteria:
  - A committed machine-readable crosswalk file lists every identifier row with {namespace, id, owner, content, maps_to[], exact_export_or_path?, live_bead?}; a validator asserts every cross-repo dependency statement in program docs resolves through the table.
  - Review lint rejects a new dependency edge citing an H- or P-number absent owner+content qualification.
  - Rows for consumed MW surfaces include the export check (e.g. ERR_PACKAGE_PATH_NOT_EXPORTED repro for dist/effect-intent.js at mw-69cb016d) and the blocker that clears it.
- V-tier: V0 (ratified table) + V1 (validator).
- Maps-to: MII P00 — extends wb-w8fk (in_progress).
- Conditions: joint sign-off by both repo owners; MW-side obligations tracked under wb-1zn2 (deferred) external gates.

## EAT-R470 — Publish the MII↔MNI↔live-bead reconciliation map and keep packet receipts keyed to real beads

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary EVIDENCE_ACQUISITION
- Statement: The program MUST publish, before build dispatch, a reconciliation map from MII packet labels to the live MNI-era beads each one extends — P00→wb-w8fk (in_progress, + carry the wb-1zn2 (deferred) external-gate tracker), P02→wb-2ukh (in_progress, which also owns the MII P03 authority surface), P03→wb-2ukh, P04→wb-y0n6 (in_progress; its title says MNI "P02", so append-correct its notes to record the MII P04 correspondence), P05→wb-4bxo (open), P06→wb-9a1o (open), P07→wb-mwsy (open; controls lineage wb-5a7k closed), P08→wb-p3i2 (open), P09→wb-xr1z (open) and wb-9bof (open; harness lineage wb-7wkb closed), P10→wb-yiu4 (open; docs lineage wb-12x1 closed), epic wb-1a3t (open) — reconciling by work content and current evidence, never by packet number; closed carriers (wb-7wkb, wb-5a7k, wb-12x1, wb-5ik5) and blockers MUST be retained as lineage, not reopened or re-released; every packet closure receipt MUST record the real bead id (or explicit none) with a named receipt file target; and the map MUST name the referent of the protected "completed source changes" of the November 9 program (file or bead list) before any MII cut touches those paths.
- Rationale: C137 NON-EPISTEMIC (DEFINITION — packet ids are planning labels; its recorded mapping to live beads is NOT the identity on numbers; permitted wording: reconcile MII→MNI→live bead IDs by work content and current evidence, not number). Bead statuses verified live in the Pi-subagents store on 2026-11-11 (this file's header). C180 NON-EPISTEMIC (NORMATIVE — closure receipts record real bead id if any; planned evidence never marked pass) with cure M189 (name the receipt file target and reconcile the validator's program-docs anchor). C229 NON-EPISTEMIC (NORMATIVE) with cure M238 (name landing trunk/default branch/merge direction and source-pinned test tier; reconcile existing MNI packet/bead/falsifier identity rather than duplicate; never claim old greens as new red). C006 (UNSUPPORTED — the November 9 program's "completed source changes" have no identified referent at the pins), so the protected-set naming is evidence acquisition, not an assumed fact. Cures M137/M138 (publish the mapping; append-correct wb-y0n6 and the external tracker; retain closed carriers and blockers). No-delta/closed-carrier handling follows the store's standing close-at-sweep convention rather than re-release.
- Acceptance criteria:
  - A committed map file lists every MII packet with {live_bead, bead_status_at_publication, lineage_beads[], mni_label, rationale}; a validator joins it against `bd list --json` and fails on: a named bead that is not live for an extends row, a closed bead listed as carrier, or an MII packet absent from the map.
  - wb-y0n6 carries an appended note (append-only, never a notes replace) recording the MII P04 correspondence; wb-1zn2 is linked from the P00 row as the MW-owned gate tracker.
  - Each packet closure receipt validates against the EAT-R458-adjacent closure schema with a non-empty bead field (`wb-*` or `none:<reason>`) and lands at the named receipt file target.
  - The protected-changes referent list for MNI-2026-11-09 exists (files or beads) and a pre-cut check warns on any MII diff touching it.
- V-tier: V0 (published map) + V1 (validator).
- Maps-to: MII P00 — extends wb-w8fk (in_progress); program epic wb-1a3t (open).
- Conditions: bead statuses drift with the store; the validator re-reads live status at every gate rather than trusting this file's snapshot.

---

**Coverage note.** REFUTED rows in scope compiled negatively only: C029 (EAT-R468), C032 (EAT-R459), C138 (EAT-R456); C005/C035/C095 are carried by other blocks of this compile (self-containment, profile-independence and budget wording are outside r-release scope and are not restated here). UNSUPPORTED rows in scope (C140, C142, C163, C006) compile only to ratification/acquisition duties (EAT-R469, EAT-R470). The ESTABLISHED absence rows C023/C024/C025 and the M194-preserved facet compile to EVIDENCE_ACQUISITION (EAT-R462, EAT-R463, EAT-R464). No rationale above asserts a claim beyond its ledger status.
