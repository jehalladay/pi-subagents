# ATOMIC REQUIREMENTS — mechanical-native-interoperability-2026-11-09 (EAT-R201..R310)

Compiled 2026-11-09 from the epistemic-triage ledger (289 claims; see ../epistemic-triage/). 110 requirements. Lineage: EAT-R001-144 (mechanical-workflows-interop-2026-11-04), EAT-R145-200 (mechanical-interoperability-audit-2026-11-06). Verdict: CONDITIONAL PASS (REQUIREMENTS-AUDIT.md, findings F1-F6).

# R-foundations atomic requirements — EAT-R201..R234

Scope: Pi packets P00–P03 of the 2026-11-09 proposed program. Artifact docs: Pi b085c34e (`pi-02` and `pi-03` are normative); claim verdicts are FINAL at Pi environment 8e2fedeb and MW environment 62a10b59. MW sibling docs at 7f3809fd inform the joint contract only. An implementation MUST re-pin; these requirements do not certify shipment.

Evidence vocabulary: V0 static pin, V1 focused red/green and mutants, V2 fresh independent packed consumer, V3 actual registered Pi tool with fixture callbacks, V4 joined native SDK/Git/Forge, V5 restart/fault/load. V3 and MW L3 are not equivalent. A component criterion tagged V1 with a registered-path closure condition remains open until V3. Every pre-admission refusal counts user importer, writer, SDK and Forge calls, not harmless metadata reads.

Registered-path oracle: capture the actual workflow_execute tool object from src/index.ts registration, invoke kind:function against the installed producer, and use the same invocation with registered workflow_observe where observation is relevant. PI-FUNCTION-REGISTERED means the Pi V3 controlled-callback oracle here (its cross-program naming awaits EAT-R208); PI-MECHANICAL-ARTIFACT means V2 external-consumer admission, not registered execution. Every P02/P03 refusal property below must be repeated by P04/P08 through that actual registered tool, with import/writer/SDK/Forge call counters and a valid one-dispatch positive control. A helper-only pass cannot close that obligation.

Prior identifiers are provenance only. B-* labels are the 2026-11-04 BEAD-PLAN planning groups; wb-* identifiers are extant in the pinned Beads export, not newly filed here. No assertion about current Beads state follows from that historical export.

## EAT-R201 — Re-pin and classify branch state

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The Pi/MW implementation MUST re-pin and classify branch state as specified by the assertions below.
- Rationale: pi-02 §P00 Read and pi-README Baseline require a current substrate, not a time-travel claim from 8e2fedeb/62a10b59. The inspected Pi branches were divergent, while a live process at that instant was not proven. Audited basis: C009 ESTABLISHED, C010 SUPPORTED, C011 NON-EPISTEMIC, C012 ESTABLISHED, C013 SUPPORTED, C151 ESTABLISHED, C170 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a machine-readable pre-cut record contains full Pi and MW source commits, tree IDs, branch/ref names, package manifest versions and the active Beads/feedback snapshot.
  2. Assert the record compares Pi default branch with workbench/implementation-program by merge-base and marks each implicated change merged, machine-only, historical or proposed; no unmerged branch is certified as the default branch.
  3. Assert a changed branch or package pin after a packet cut invalidates that cut’s final-tree acceptance until re-pin and affected tests rerun.
- Evidence tier target: V0 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Re-run at implementation and after merges; 8e2fedeb/62a10b59 are historical environment pins, not release pins.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R147, EAT-R159, EAT-R171, EAT-R172 (prior text remains historical).

## EAT-R202 — Classify historical requirement status

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST classify historical requirement status as specified by the assertions below.
- Rationale: pi-02 §P00 Produce mandates an itemized status ledger rather than inferring 25 group closures. Corrected worktree/grant behavior is not an outstanding implementation deficit; C026/C176/C180 refute particular historical or result-shape glosses only. Audited basis: C153 ESTABLISHED, C154 SUPPORTED, C157 ESTABLISHED, C158 ESTABLISHED, C159 NON-EPISTEMIC, C173 SUPPORTED, C026 REFUTED, C176 REFUTED, C180 REFUTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert every EAT-R001..R200 identifier has exactly one ledger row with Pi/MW source pin, real Beads id or explicit none, evidence link and class already-implemented/tested, partial/inert, or blocked; a tested class names its tested forms.
  2. Assert rows for EAT-R001..R003, R012..R014 and the run-wide F10 control distinguish fixed, scoped forms from the witnessed pending parked per-agent skip/retry; no row says that WorktreePreservationFailedResult contains byte data.
  3. Assert an unmapped B-* label or a fabricated wb-* id fails ledger validation; the 25-group total is not treated as 25 complete issues.
- Evidence tier target: V0 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: 11-04 BEAD-PLAN belongs to a November 4 program but was generated November 6; consult actual Beads store before editing status.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R147, EAT-R159, EAT-R172 (prior text remains historical).

## EAT-R203 — Ratify a single versioned host ABI

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST ratify a single versioned host ABI as specified by the assertions below.
- Rationale: pi-01 §3 and pi-02 §P00 propose mechanical.pi-host/v1, but Pi’s flat and MW’s nested bindings disagree (CONTRADICTIONS K007). Profile names at the environment pins are proposals, not executed selectors (C204/C275 REFUTED as present-tense premises). Audited basis: C036 NON-EPISTEMIC, C037 ESTABLISHED, C108 NON-EPISTEMIC, C109 ESTABLISHED, C110 NON-EPISTEMIC, C111 ESTABLISHED, C112 NON-EPISTEMIC, C114 NON-EPISTEMIC, C116 NON-EPISTEMIC, C167 NON-EPISTEMIC, C204 REFUTED, C275 REFUTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert pi and MW commit a jointly approved, versioned request/result schema with one field set and nesting, descriptor ID/schema key mapping, host-selected evidenceProfile/contextProfile and separate transport hostMode; consumer and producer validate the same fixtures.
  2. Assert the binding defines independent saved-definition digest, descriptor digest, schema-file byte identity, library tarball digest and executable rig tarball digest (or records an explicit reviewed alternative for rig byte identity); package version alone never passes exact-identity validation.
  3. Assert a fixture containing the rejected competing shape or model-set profile fails closed without executable import; valid adopted fields round-trip through producer and consumer.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Joint P00/M00 decision required; no profile literal or binding shape is shipped by these documents alone.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R005, EAT-R006, EAT-R148, EAT-R150, EAT-R152, EAT-R161 (prior text remains historical).

## EAT-R204 — Ratify an exact function-action grant

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST ratify an exact function-action grant as specified by the assertions below.
- Rationale: pi-02 §P00 Decide/§P03 Adopt and pi-01 §3 require an exact grant. mechanical:develop-write is syntactically representable but unadopted at the inspected pins; C063 UNSUPPORTED only refutes a supposed independent MW-CONTRACT document, not C062’s unadopted source fact. Audited basis: C039 ESTABLISHED, C062 ESTABLISHED, C063 UNSUPPORTED, C093 SUPPORTED, C118 NON-EPISTEMIC, C167 NON-EPISTEMIC, C171 ESTABLISHED, C172 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a joint producer/consumer contract test adopts exactly one namespace:permission action for mechanical.development.develop.v1 and confirms round-trip through workbench.capabilityGrants and the supported transport.
  2. Assert the earlier two-colon mechanical:develop:write, wildcards, prefixes and workbench:-namespace action impersonation are rejected; claude:tool:<name> remains a distinct host-held Claude tool right, never an action grant.
  3. Assert until the signed action binding is present, a function admission with otherwise valid grants returns function-action-unadopted and invokes zero producer callbacks.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: The proposed spelling is not automatically adopted; MW-CONTRACT is a blocker label in Pi code, not an independent MW contract document.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R005, EAT-R028, EAT-R029, EAT-R151 (prior text remains historical).

## EAT-R205 — Fail closed on incompatible contract admission

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST fail closed on incompatible contract admission as specified by the assertions below.
- Rationale: pi-02 §P00 Gate and pi-03 §A define the guard: divergent or unratified producer manifests must not unlock effects. C164 remains CONTESTED about scheduling, not proof that either manifest is compatible. Audited basis: C109 ESTABLISHED, C164 CONTESTED, C167 NON-EPISTEMIC, C172 ESTABLISHED, C181 NON-EPISTEMIC, C187 NON-EPISTEMIC, C230 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert producer and consumer positive conformance fixtures for the adopted schema and grant pass before P04 is enabled.
  2. Assert unknown version, extra/missing field, old descriptor fixture, unsupported profile, wrong grant and incompatible installed manifest each yield a typed refusal before artifact import, writer callback, SDK query or Forge dispatch; positive fixture reaches one fixture-safe load.
  3. Assert a persisted prior approval cannot authorize a changed manifest or grant without a fresh conformance run.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: P04 stays frozen while the joint schema or grant is unsettled; V3 registered-path repetition is owed by P04/P08.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R006, EAT-R151, EAT-R165 (prior text remains historical).

## EAT-R206 — Rule one cross-program dependency DAG

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST rule one cross-program dependency DAG as specified by the assertions below.
- Rationale: pi-02 dependency graph/P00 and MW mw-02 M00 conflict. C164 is CONTESTED; C166 REFUTED only the characterization of M05/M06 as upstream native producer evidence. M05 is fixture-safe installed consumer, and M06 is the joint event with P07. Audited basis: C163 NON-EPISTEMIC, C164 CONTESTED, C165 SUPPORTED, C166 REFUTED, C167 NON-EPISTEMIC, C203 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a jointly approved dependency table makes M01 host-export availability precede P02’s installed-import leg, states whether M05 or P02 owns installed-consumer conformance, and models M06/P07 as one joint event rather than a cycle.
  2. Assert the table allows independently scoped P03 work in parallel with producer M01–M04 while explicitly gating P04 on their ratified API; generated Beads dependency edges are acyclic.
  3. Assert a graph validator rejects any edge that makes P07 wait on a distinct completed M06 native journey or marks M05 native-provider proof.
- Evidence tier target: V0 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Do not schedule contested cross-repo edges until the P00/M00 ruling; only the narrower P03 parallelism is supported.
- Maps-to: P00; existing group B-contract-choice / wb-w8fk; extends/supersedes earlier EAT-R151, EAT-R159 (prior text remains historical).

## EAT-R207 — Assign canonical writer-lease ownership

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST assign canonical writer-lease ownership as specified by the assertions below.
- Rationale: pi-01 §4/ pi-02 §P03 put a lease in Pi source-admission while mw-01 §4 also assigns one to the Mechanical host (CONTRADICTIONS K008). A one-writer outcome needs a specified owner or ordered two-level lease. Audited basis: C033 NON-EPISTEMIC, C101 NON-EPISTEMIC, C102 NON-EPISTEMIC, C123 NON-EPISTEMIC, C167 NON-EPISTEMIC, C189 ESTABLISHED, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert the adopted ABI names one canonical realpath lease owner or an explicit acquisition/release/precedence protocol for two lease levels, including crash/reconcile custody.
  2. Assert a producer/consumer fixture with two requests for the same root through a symlink alias admits at most one effectful writer and the other receives a bounded refusal or queue state.
  3. Assert a mismatch in lease-owner metadata blocks dispatch rather than proceeding under two uncoordinated authorities.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Joint P00/M00 decision; Pi’s in-process WriterLeases exists but is not currently a cross-process guarantee.
- Maps-to: P00; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R024, EAT-R025, EAT-R150 (prior text remains historical).

## EAT-R208 — Adopt one joined receipt contract

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST adopt one joined receipt contract as specified by the assertions below.
- Rationale: pi-02 §P07 and pi-03 §G name joint receipts, but C205 REFUTED the supposed MW-PI-NATIVE-LIVE producer definition. Pi’s and MW’s sample skeletons have no common join key (CONTRADICTIONS K001/K006/K009). Audited basis: C166 REFUTED, C205 REFUTED, C219 NON-EPISTEMIC, C223 NON-EPISTEMIC, C278 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert pi and MW publish one receipt schema or an explicit join key plus field mapping for both program identifiers, phase/packet, source pins, saved definition/descriptor/rig/library digests, native refs, original domain, effect/freshness and evidence level.
  2. Assert the adopted vocabulary gives the V3 fixture-registered event and native joint event distinct unambiguous labels; MW-PI-NATIVE-LIVE is not treated as emitted unless a producer contract adopts it.
  3. Assert a join validator refuses missing native identity, mismatched candidate tree/package bytes, inconsistent evidence levels and two receipts sharing only a name but not a Pi invocation ID.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Receipt names and schema are unratified; V4 native values must be observed, not populated by a sample fixture.
- Maps-to: P00; existing group B-release / wb-j5y5; extends/supersedes earlier EAT-R082, EAT-R085, EAT-R086, EAT-R165 (prior text remains historical).

## EAT-R209 — Publish the V/L evidence vocabulary map

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The Pi/MW implementation MUST publish the V/L evidence vocabulary map as specified by the assertions below.
- Rationale: pi-03 Acceptance hierarchy defines V0–V6, while pi-01/pi-02 use undefined L0/L2 and MW defines L0–L6. CONTRADICTIONS K010 shows V3 registered/not-native and MW L3 native/not-registered are disjoint. Audited basis: C147 SUPPORTED, C164 CONTESTED, C181 NON-EPISTEMIC, C192 NON-EPISTEMIC, C223 NON-EPISTEMIC, C240 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P00 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert one versioned tier map resolves Pi’s L0/L2 usages to V0/V2 and explicitly marks Pi V3 and MW L3 incomparable; it does not numerically equate all third tiers.
  2. Assert a receipt validator given a MW L3 native-only producer record refuses a Pi V3 registered-path claim, and given a Pi V3 fixture record refuses a V4 native claim.
  3. Assert documentation and Beads status entries preserve the distinct proof ceilings and identify the exact registered-path and installed-consumer oracles.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Evidence levels are definitions, not observations of successful runs.
- Maps-to: P00; existing group B-release / wb-j5y5; extends/supersedes earlier EAT-R165, EAT-R170 (prior text remains historical).

## EAT-R210 — Preserve edited bytes on Git preservation failure

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST preserve edited bytes on Git preservation failure as specified by the assertions below.
- Rationale: pi-02 §P01 Preserve and pi-03 §C preserve a correction already present in tested forms; C176 REFUTED only the claim that result embeds bytes. The typed result instead points to retained bytes. Audited basis: C022 SUPPORTED, C067 ESTABLISHED, C082 ESTABLISHED, C083 SUPPORTED, C176 REFUTED, C256 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert for planted status, add, commit, HEAD-rev-parse and branch-retry failures, cleanupWorktree returns WorktreePreservationFailedResult with preservationFailed=true, a kept path and a diagnostic; no destructive remove runs.
  2. Assert exact tracked and untracked byte comparisons at the kept path (or its kept HEAD where appropriate) equal the pre-cleanup snapshots; a mutant that force-removes on failure fails the test.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Applies to named tested Git failures; process-kill extension is EAT-R215, not established by this component pass.
- Maps-to: P01; existing group B-preserve / wb-5ik5; extends/supersedes earlier EAT-R001, EAT-R002, EAT-R003, EAT-R144 (prior text remains historical).

## EAT-R211 — Retain both detached Claude grant producers

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST retain both detached Claude grant producers as specified by the assertions below.
- Rationale: pi-02 §P01 and pi-03 §A08 preserve effective grants at both registered detached paths. C180 REFUTED the old “only one” gloss; before the fix neither forwarded grants. Existing test evidence does not prove a live SDK session. Audited basis: C023 ESTABLISHED, C085 ESTABLISHED, C086 SUPPORTED, C087 ESTABLISHED, C177 ESTABLISHED, C180 REFUTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert both registered workflow_execute-detached and workflow_detached-Claude paths forward only the held intersection of claude:invoke and exact claude:tool:<name> rights into the real local-detached preflight.
  2. Assert deleting claude:invoke or one required tool right from either producer causes preflight refusal with zero SDK query; a model policy string alone never restores it.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Fixture/preflight proof only; actual SDK rights in the Mechanical route remain EAT-R227 and later V4.
- Maps-to: P01; existing group B-detached-grants / wb-wupg; extends/supersedes earlier EAT-R012, EAT-R013, EAT-R014 (prior text remains historical).

## EAT-R212 — Retain the workflow-wide post-startup abort barrier

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST retain the workflow-wide post-startup abort barrier as specified by the assertions below.
- Rationale: pi-02 §P01 preserves the post-beforeDispatch run-signal recheck already implemented at 8e2fedeb. It is a run-wide control, not evidence that per-agent skip/retry is safe. Audited basis: C024 ESTABLISHED, C070 ESTABLISHED, C088 ESTABLISHED, C178 ESTABLISHED, C179 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert with beforeDispatch parked, requesting workflow-wide abort before release yields a skipped result and zero SDK query starts (the F10 oracle).
  2. Assert a no-abort control launches exactly one SDK query; removing only the post-await run-signal check makes the abort assertion fail.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Do not label this as a new fix of the per-agent race; that is EAT-R213/R214.
- Maps-to: P01; existing group B-cancel-repro / wb-9v02; extends/supersedes earlier EAT-R015, EAT-R016, EAT-R160 (prior text remains historical).

## EAT-R213 — Honor per-agent skip at parked startup

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The Pi/MW implementation MUST honor per-agent skip at parked startup as specified by the assertions below.
- Rationale: pi-02 §P01 falsifier and pi-03 §C beforeDispatch barrier: at the pinned host seam, wb-9v02 witnessed a skip lost while beforeDispatch is parked. C089 REFUTED the blanket “untested” premise; this requirement repairs the narrower observed violation, not an asserted live-user reachability. Audited basis: C071 REFUTED, C088 ESTABLISHED, C089 REFUTED, C253 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert the existing R015-SPAWN and R015-RESUME barrier experiment issues runtime skip before releasing beforeDispatch; original and replacement target attempts each make zero SDK query starts, final target row is skipped, and the script receives null.
  2. Assert pending per-agent abort state survives the awaited barrier; mutating away the post-barrier per-agent check makes the R015 oracle fail while F10 workflow-wide abort and one-call no-control remain green.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: The receipt explicitly did not prove a real user can hit that parked window; the host seam accepts an asynchronous beforeDispatch and is the scoped repair target.
- Maps-to: P01; existing group B-cancel-repro / wb-9v02; extends/supersedes earlier EAT-R015, EAT-R160 (prior text remains historical).

## EAT-R214 — Suppress the original attempt after parked retry

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The Pi/MW implementation MUST suppress the original attempt after parked retry as specified by the assertions below.
- Rationale: pi-02 §P01 and pi-03 §C require a distinct retry falsifier. The wb-9v02 R016 fixture witnessed the original attempt starting after retry while parked; the broader absence-of-tests claim C089 is REFUTED, not used as the repair premise. Audited basis: C088 ESTABLISHED, C089 REFUTED, C174 NON-EPISTEMIC, C253 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert r016-SPAWN and R016-RESUME issue retry at a parked beforeDispatch: the original attempt has zero SDK starts, the replacement has at most one start, and no later attempt starts without a new authorized retry.
  2. Assert a test mutant that counts only the final successful attempt, or removes pending retry state after the barrier, fails the fixture SDK’s full call-log oracle.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Pending repair concerns the scoped async-startup seam, not a demonstrated whole-provider journey.
- Maps-to: P01; existing group B-cancel-repro / wb-9v02; extends/supersedes earlier EAT-R016, EAT-R160 (prior text remains historical).

## EAT-R215 — Acquire process-death preservation evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The Pi/MW implementation MUST acquire process-death preservation evidence as specified by the assertions below.
- Rationale: pi-02 §P01 Expand falsifiers and pi-03 §C leave worktree process death unproven within the searched worktree source/tests. This is an evidence gap, not proof that a crash loses bytes. Audited basis: C068 SUPPORTED, C084 SUPPORTED, C174 NON-EPISTEMIC, C257 SUPPORTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert an isolated child process is killed after creating tracked and untracked edits and after an independently controlled partial Git preservation step; before/after snapshots include file bytes, HEAD, index and recovery path.
  2. Assert a separate process opens the retained worktree and compares exact bytes/refs; if native evidence cannot establish retention, the test reports unknown/blocked and no successful-preservation claim.
  3. Assert the same harness proves its detector by planting a destructive-cleanup mutant and observing a failure.
- Evidence tier target: V5 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Real process kill and reattach required; fixture-only Git failures remain V1. No power-loss guarantee follows from a process-kill trial.
- Maps-to: P01; existing group B-preserve / wb-5ik5; extends/supersedes earlier EAT-R001, EAT-R003, EAT-R144 (prior text remains historical).

## EAT-R216 — Acquire SDK child-death settlement evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The Pi/MW implementation MUST acquire SDK child-death settlement evidence as specified by the assertions below.
- Rationale: pi-01 §1 correction and pi-02 §P01/P06 identify SDK-child host death as the genuinely untested member after the skip/race tests were found. C089 REFUTED only a compound absence assertion; it cannot warrant a positive recovery claim. Audited basis: C071 REFUTED, C089 REFUTED, C174 NON-EPISTEMIC, C257 SUPPORTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P01 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert an independently controlled SDK child is terminated during a query and the test captures attempt count, host result, journal and Pi invocation state before/after a separate-process restart.
  2. Assert the observable result is active/uncertain or a producer-confirmed terminal state, never inferred not-started from a missing response; no automatic second SDK query occurs.
  3. Assert a no-kill positive control settles one attempt; a mutant that retries on missing acknowledgment fails the query-attempt count.
- Evidence tier target: V5 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Requires a safe killable child/fixture and process restart; native provider behavior beyond the tested kill point remains unknown.
- Maps-to: P01; existing group B-cancel-repro / wb-9v02; extends/supersedes earlier EAT-R015, EAT-R016, EAT-R043, EAT-R160 (prior text remains historical).

## EAT-R217 — Consume the committed producer descriptor

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST consume the committed producer descriptor as specified by the assertions below.
- Rationale: pi-02 §P02 Build/Exit and pi-03 §A03/A44 require the actual producer file. Pi’s existing vendored fixture is V1; it is not a freshly installed producer descriptor witness. Audited basis: C027 ESTABLISHED, C059 ESTABLISHED, C090 ESTABLISHED, C091 ESTABLISHED, C181 NON-EPISTEMIC, C184 ESTABLISHED, C185 SUPPORTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert from a fresh external consumer outside both repositories, read MW contracts/entrypoints/development.v1.json from the adopted package layout and compare its exact byte SHA-256 with the producer’s release manifest.
  2. Assert the descriptor’s canonical input/output refs resolve to shipped schema files whose bytes match adopted digests; missing file, wrong ref or changed schema byte refuses before import.
  3. Assert a stale vendored Pi fixture replacing a one-byte-modified producer file causes the consumer test to fail.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Requires M01 descriptor packaging and jointly ratified layout; existing descriptor-only status does not assert host availability.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R007, EAT-R009, EAT-R153 (prior text remains historical).

## EAT-R218 — Validate saved definition digest independently

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST validate saved definition digest independently as specified by the assertions below.
- Rationale: pi-01 §3 Two hashes and pi-03 §A02 distinguish Pi saved-definition source from npm bytes. The current decision helper already checks the definition digest but is not a registered function host. Audited basis: C114 NON-EPISTEMIC, C115 ESTABLISHED, C181 NON-EPISTEMIC, C230 NON-EPISTEMIC, C240 ESTABLISHED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a saved exact function definition with its matching DefinitionRef.artifactDigest passes the pre-import decision and resolves only the reviewed id/schema.
  2. Assert changing exactly one byte of saved source with unchanged ref digest yields definition-digest-mismatch and zero Mechanical importer/writer/Forge calls.
  3. Assert changing only npm tarball bytes is rejected by the package pin oracle, not misreported as a saved-definition mismatch.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: P04/P08 repeat A02 through the actual registered tool; a component pass alone is not V3.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R007, EAT-R008, EAT-R152 (prior text remains historical).

## EAT-R219 — Reject noncanonical descriptor shape

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST reject noncanonical descriptor shape as specified by the assertions below.
- Rationale: pi-02 §P02 Tests and pi-03 §A03 extend the closed reader to the producer’s committed file; the previously broken schema references were repaired, so this is regression prevention, not a new repair of that refuted current-defect premise. Audited basis: C027 ESTABLISHED, C059 ESTABLISHED, C090 ESTABLISHED, C092 ESTABLISHED, C181 NON-EPISTEMIC, C183 ESTABLISHED, C230 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert committed descriptor with exact reviewed id, package, export, bindings, status descriptor-only and known fields is accepted by the closed parser.
  2. Assert independently mutate one extra field, duplicate JSON key, omitted field, wrong schema ref, path traversal and wrong schema version; each returns typed diagnostic before executable import.
  3. Assert a permissive JSON parse that silently accepts duplicate keys is killed by the duplicate-key test.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: The descriptor-only field does not itself prove an invocable host; final fixture is read from installed package, not vendored Pi copy.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R007, EAT-R009, EAT-R010 (prior text remains historical).

## EAT-R220 — Pin exact installed executable tarball bytes

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST pin exact installed executable tarball bytes as specified by the assertions below.
- Rationale: pi-02 §P02 Check and pi-03 §A04 guard executable identity. C028 UNSUPPORTED as a claim of an already pinned host: MW’s loader pins library bytes, while the rig is only packable by manifest at the environment pin. Audited basis: C028 UNSUPPORTED, C030 ESTABLISHED, C041 SUPPORTED, C114 NON-EPISTEMIC, C181 NON-EPISTEMIC, C238 SUPPORTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert build two independently packed rig/library artifacts, record distinct exact tarball SHA-256 digests in the adopted manifest, install them into an external consumer and verify both digests immediately before import.
  2. Assert a one-byte mutation to either tarball, a correct digest paired with a different installed executable file, or a manifest digest mismatch refuses before any user loader/writer/Forge call.
  3. Assert a version string matching while tarball bytes differ never passes.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Executable rig export requires MW M01; actual npm pack/install proof has not been established by C185/C238.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R008, EAT-R152, EAT-R174 (prior text remains historical).

## EAT-R221 — Admit only the reviewed installed host export

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST admit only the reviewed installed host export as specified by the assertions below.
- Rationale: pi-02 §P02 and pi-03 §A05/A44 demand a real public host API. C239 REFUTED its existence at both MW pins; the /host spelling is an M01 proposal, not an import that works today. Audited basis: C030 ESTABLISHED, C041 SUPPORTED, C112 NON-EPISTEMIC, C181 NON-EPISTEMIC, C186 ESTABLISHED, C239 REFUTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert after MW-INSTALLED-HOST, a fresh non-Pi consumer imports the jointly ratified public host subpath from packed @mechanical/development-rig, calls its versioned fixture-safe export once and records exact export/version/runtime-closure metadata.
  2. Assert unknown export, changed package name, absent compiled declaration/JS or a runtime dependency resolved only from MW checkout refuses or fails the independent-consumer gate; no deep source/dist import counts.
  3. Assert the Pi bridge accepts exactly the allowlisted export and fails closed on unsupported host API version.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Conditional on MW M01 and the adopted final subpath spelling; do not hard-code /host as already shipped.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R010, EAT-R035, EAT-R089, EAT-R174 (prior text remains historical).

## EAT-R222 — Confine descriptor and artifact paths before import

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST confine descriptor and artifact paths before import as specified by the assertions below.
- Rationale: pi-02 §P02 Check/Tests and pi-03 §A03/A04 treat path/symlink drift as a pre-import hazard, not as proof that every malicious path is reachable today. Audited basis: C059 ESTABLISHED, C181 NON-EPISTEMIC, C230 NON-EPISTEMIC, C238 SUPPORTED, C239 REFUTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert lstat/realpath and approved canonical root checks reject traversal, absolute escape, symlink alias to outside root, non-file schema/artifact, directory or FIFO before import.
  2. Assert changing a symlink target or installed bytes between initial measure and final load yields a typed changed/refused outcome and zero loader/writer/Forge calls.
  3. Assert a valid regular-file packed-install control reaches the one reviewed importer.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Trust root and exact file-list policy are part of P00/M00 ABI; pre-import checks do not make a temporary npm project a security sandbox.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R011, EAT-R153 (prior text remains historical).

## EAT-R223 — Ignore model-provided import authority

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST ignore model-provided import authority as specified by the assertions below.
- Rationale: pi-02 §P02 Check and pi-03 §A05/A14 prohibit caller-chosen modules/URLs/commands/grants. This is a design risk control; C107 SUPPORTED only the narrower local VM/installer non-sandbox statements. Audited basis: C106 NON-EPISTEMIC, C107 SUPPORTED, C181 NON-EPISTEMIC, C230 NON-EPISTEMIC, C233 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert with a valid reviewed definition, inject each of input.module, input.package, input.export, input.url, input.shell, input.grants and input.profile separately; the registered-tool input schema rejects or ignores each authority claim with zero arbitrary loader/command/writer/Forge calls.
  2. Assert the same host-held configuration with no injected fields loads exactly one reviewed export in a fixture-safe consumer control; the caller cannot choose its own callback closure.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V3 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: P02 supplies host guard and fixture-safe installed-consumer V2; this V3 acceptance is closure-dependent on P04 registered-tool wiring and must not be claimed by P02 unit tests alone.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R010, EAT-R034, EAT-R154 (prior text remains historical).

## EAT-R224 — Serialize competing installed-package attempts safely

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST serialize competing installed-package attempts safely as specified by the assertions below.
- Rationale: pi-02 §P02 Tests includes simultaneous install attempts; it specifies a required future behavior rather than reporting a presently observed race. Audited basis: C181 NON-EPISTEMIC, C185 SUPPORTED, C238 SUPPORTED, C230 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P02 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert two concurrent independent-consumer install attempts with the same immutable manifest either each verify their own exact bytes or one receives a bounded refusal; both completed attempts resolve the same approved package/export.
  2. Assert if one attempt sees changed package bytes or symlink target, it refuses before import and does not corrupt or authorize the other; count zero writer and Forge effects for both fixture-safe attempts.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V2 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Use separate temporary consumer roots or an explicitly serialized install store; no lock on the shared S3 mount.
- Maps-to: P02; existing group B-descriptor / wb-ocie; extends/supersedes earlier EAT-R007, EAT-R008 (prior text remains historical).

## EAT-R225 — Require exact execute and function action rights

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST require exact execute and function action rights as specified by the assertions below.
- Rationale: pi-02 §P03 and pi-03 §A06 require two host-held rights. The standalone authority seam exists at 8e2fedeb but is inert on the production function route; the exact action awaits P00/M00. Audited basis: C061 ESTABLISHED, C062 ESTABLISHED, C064 ESTABLISHED, C171 ESTABLISHED, C172 ESTABLISHED, C187 NON-EPISTEMIC, C188 ESTABLISHED, C190 ESTABLISHED, C231 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert for the ratified action binding, a host with workbench:execute and the exact action passes the function-authority decision once.
  2. Assert missing either grant, prefix/wildcard/wrong namespace, unknown permission shape or model-supplied grant yields a fixed typed refusal and zero import/writer/Forge calls.
  3. Assert the unadopted contract refuses with function-action-unadopted even if a caller supplies the candidate spelling.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: V1 is seam conformance; P04/P08 A06 must assert the same through src/index.ts registered tool at V3.
- Maps-to: P03; existing group B-authority / wb-201v; extends/supersedes earlier EAT-R028, EAT-R029, EAT-R151 (prior text remains historical).

## EAT-R226 — Require detach right for detached function placement

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST require detach right for detached function placement as specified by the assertions below.
- Rationale: pi-02 §P03 and pi-03 §A07 retain hostMode as placement, distinct from host-owned evidence/context profiles. A detached Mechanical route is optional P11, so the negative guard is specified before enabling it. Audited basis: C038 ESTABLISHED, C117 SUPPORTED, C118 NON-EPISTEMIC, C187 NON-EPISTEMIC, C190 ESTABLISHED, C231 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert when hostMode=detached is enabled for an adopted function, lack of workbench:detach refuses before detached-host start despite execute/action grants.
  2. Assert with the detach right and the other adopted rights a controlled detached admission reaches exactly one host preflight; hostMode=embedded does not require workbench:detach.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Detached Mechanical function launch itself remains P11 optional; P03 proves a guard, not detached hosting or V4.
- Maps-to: P03; existing group B-authority / wb-201v; extends/supersedes earlier EAT-R028, EAT-R064 (prior text remains historical).

## EAT-R227 — Keep SDK invocation and tool rights independent

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST keep SDK invocation and tool rights independent as specified by the assertions below.
- Rationale: pi-02 §P03 and pi-03 §A08 distinguish function action from native SDK invoke/tool permission. Existing detached grant tests are fixture/preflight evidence only (C087 ESTABLISHED). Audited basis: C023 ESTABLISHED, C085 ESTABLISHED, C087 ESTABLISHED, C118 NON-EPISTEMIC, C187 NON-EPISTEMIC, C190 ESTABLISHED, C231 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert at the native SDK edge, an exact host-held claude:invoke and each required claude:tool:<name> right are checked against effective grants; deleting either one refuses before any SDK query.
  2. Assert putting Forge or Claude rights only in model policy/descriptor, or forwarding an unheld right, never authorizes the SDK call; a positive held-rights control reaches one fixture SDK query.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Actual Mechanical SDK binding awaits M02/P04 and native V4; rights are read from host configuration, never input.
- Maps-to: P03; existing group B-authority / wb-201v; extends/supersedes earlier EAT-R012, EAT-R014, EAT-R028 (prior text remains historical).

## EAT-R228 — Re-read principal session and grants at final dispatch

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST re-read principal session and grants at final dispatch as specified by the assertions below.
- Rationale: pi-02 §P03 and pi-03 §A06/A09 require a final fresh decision after parked admission; the existing standalone seam does this, but no registered function path composes it at the pin. Audited basis: C061 ESTABLISHED, C064 ESTABLISHED, C123 NON-EPISTEMIC, C187 NON-EPISTEMIC, C188 ESTABLISHED, C191 ESTABLISHED, C231 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert park between entry and dispatch, then revoke the action grant, change principal, change session, or replace grants with malformed data in separate trials; each refuses before import/effect with zero writer/Forge calls.
  2. Assert input principal or descriptor policy cannot override the fresh host read; an unchanged host identity/grant positive control dispatches exactly once.
  3. Assert a mutant caching the entry principal or grants fails the parked trial.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: P04/P08 repeat A09 through registered definition at V3; a standalone seam test alone is not live authority proof.
- Maps-to: P03; existing group B-authority / wb-201v; extends/supersedes earlier EAT-R030, EAT-R031 (prior text remains historical).

## EAT-R229 — Confine the effectful source to a clean canonical root

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST confine the effectful source to a clean canonical root as specified by the assertions below.
- Rationale: pi-02 §P03 Preserve/Tests and pi-03 §A10 build on an in-process admission seam, not a function-route guarantee. The source must be host authorized and clean before writes. Audited basis: C065 ESTABLISHED, C066 ESTABLISHED, C123 NON-EPISTEMIC, C187 NON-EPISTEMIC, C189 ESTABLISHED, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a realpath under the authorized root with clean Git status, valid operator attestation and write policy admits one fixture-safe dispatch.
  2. Assert a sibling workspace, symlink alias escaping root, dirty tracked/index/untracked/renamed/unmerged/submodule basis each returns a typed source refusal before import/effect; exact preexisting bytes remain.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Before P04 this is source-seam evidence only; V3 repeats via registered tool. Canonical-root lease semantics are ruled in EAT-R207.
- Maps-to: P03; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R022, EAT-R023, EAT-R027 (prior text remains historical).

## EAT-R230 — Reject unmeasurable raw Git identity

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST reject unmeasurable raw Git identity as specified by the assertions below.
- Rationale: pi-02 §P03 Test and pi-03 §A10 require actual Git commit/tree/worktree identity, not arbitrary strings supplied by input. Standalone source-admission at the pin already has a source-unmeasurable refusal. Audited basis: C065 ESTABLISHED, C187 NON-EPISTEMIC, C189 ESTABLISHED, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert misdirected git worktree root, non-object HEAD commit/tree, wrong git dir or malformed index entry each returns source-unmeasurable and zero import/writer/Forge calls.
  2. Assert a valid clean base with real commit/tree and canonical git dir admits exactly one fixture-safe dispatch; input-forged commit/tree does not change host Git readings.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: The measured scope is host.git at the authorized root; it is not a proof about every Git adapter or uninspected remote workspace.
- Maps-to: P03; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R022, EAT-R023, EAT-R026 (prior text remains historical).

## EAT-R231 — Bind a fresh Forge manifest to the source basis

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST bind a fresh Forge manifest to the source basis as specified by the assertions below.
- Rationale: pi-02 §P03 and pi-03 §A11 require gate-manifest/source remeasurement after asynchronous admission. Existing source-admission checks do not yet compose a registered function dispatch. Audited basis: C065 ESTABLISHED, C123 NON-EPISTEMIC, C187 NON-EPISTEMIC, C189 ESTABLISHED, C191 ESTABLISHED, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a valid source basis includes Git commit/tree and SHA-256 of the approved forge.toml manifest; after a parked await, an unchanged manifest/tree allows exactly one fixture-safe dispatch.
  2. Assert changing HEAD, the tree, the manifest bytes or the manifest path during that await yields source-changed or gate-manifest-unavailable before import, writer or Forge launch.
  3. Assert a mutant that omits the post-await measure fails a changed-manifest or moved-HEAD test.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: V3 registered-path test is owed by P04/P08; final native Forge operation matching is later P05/P07.
- Maps-to: P03; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R025, EAT-R026 (prior text remains historical).

## EAT-R232 — Enforce one writer per canonical root

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: The Pi/MW implementation MUST enforce one writer per canonical root as specified by the assertions below.
- Rationale: pi-02 §P03 Tests and pi-03 §A12 guard overlapping writers; Pi’s in-process WriterLeases exists at the pin, while cross-host ownership is a P00/M00 decision. Audited basis: C065 ESTABLISHED, C123 NON-EPISTEMIC, C187 NON-EPISTEMIC, C189 ESTABLISHED, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert two simultaneous fixture-safe write admissions for the same canonical root and a symlink alias admit exactly one writer; the other is writer-held or receives a bounded queue/refusal, with total callback count one.
  2. Assert independent canonical roots can each admit one writer; releasing a settled lease enables a newly authorized invocation, while an uncertain effect retains or reconciles lease custody per the adopted protocol.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: P00/M00 must choose lease owner before cross-process use; in-process test alone does not prove a global distributed lock.
- Maps-to: P03; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R024, EAT-R025 (prior text remains historical).

## EAT-R233 — Require host-minted current write attestation

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST require host-minted current write attestation as specified by the assertions below.
- Rationale: pi-02 §P03 Preserve requires host authority and source-attested writer admission; source-admission supports the component checks at 8e2fedeb, not yet function-route effects. Audited basis: C065 ESTABLISHED, C123 NON-EPISTEMIC, C187 NON-EPISTEMIC, C189 ESTABLISHED, C231 NON-EPISTEMIC, C232 NON-EPISTEMIC. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert a host-minted attestation whose canonical workspace and source digest match the current measured basis passes once.
  2. Assert missing, forged, stale or wrong-workspace attestation (including replacement during a parked await) refuses before import/effect; model policy or descriptor cannot mint it. An otherwise valid replacement by another operator is evaluated under the fresh effective identity check, not rejected solely because the operator differs.
  3. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: A later changed effective principal is separately caught by EAT-R228; P04 must compose both checks.
- Maps-to: P03; existing group B-source / wb-s8rm; extends/supersedes earlier EAT-R027, EAT-R030 (prior text remains historical).

## EAT-R234 — Compose one no-await final authority-to-dispatch chain

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The Pi/MW implementation MUST compose one no-await final authority-to-dispatch chain as specified by the assertions below.
- Rationale: pi-02 §P03 Exit requires connecting existing, separately tested authority and source-admission seams. C191 ESTABLISHED describes an integration gap; C227 UNSUPPORTED refutes a present function-launch path containing all mutation targets, not the proposed chain. Audited basis: C064 ESTABLISHED, C066 ESTABLISHED, C123 NON-EPISTEMIC, C124 ESTABLISHED, C187 NON-EPISTEMIC, C188 ESTABLISHED, C189 ESTABLISHED, C191 ESTABLISHED, C227 UNSUPPORTED. Source: `pi-02-IMPLEMENTATION-PACKAGES.md` §P03 and `pi-03-VERIFICATION-AND-RELEASE.md` (tier/tests cited above), with `pi-01`/MW sibling only where noted.
- Acceptance criteria:
  1. Assert after the last asynchronous installation/admission barrier, fresh final grant/principal/session and source/attestation decisions feed one installed-host dispatch with no intervening await or caller-controlled code path; the positive fixture makes exactly one dispatch.
  2. Assert each single-fault negative for permission, source, attestation or package identity refuses with zero import/writer/Forge calls; a mutant inserting an await plus a revocation or source move is detected and refuses.
  3. Assert the chain produces a P03 component receipt tagged V1, not a PI-FUNCTION-REGISTERED or V4 claim; P04/P08 must run it through the registered tool for V3.
  4. Assert the preceding property at the actual registered-path oracle PI-FUNCTION-REGISTERED (Pi V3 meaning) after P04 enables this chain; helper-only or V2-only evidence does not satisfy this registered-path closure.
- Evidence tier target: V1 (pi-03 hierarchy; no automatic promotion from a lower tier).
- Conditions/unknowns: Depends on adopted P00/M00 grant/lease decision and producer M01 import contract; no registered Pi function execution at 8e2fedeb is claimed.
- Maps-to: P03; existing group B-authority / wb-201v; extends/supersedes earlier EAT-R028, EAT-R031, EAT-R022, EAT-R025, EAT-R032 (prior text remains historical).

## Scope dispositions

C221 remains UNDETERMINED about the authoring-window no-command self-report (M015). It is not a premise for P00–P03 behavior and is not made into a pointless author-history implementation gate. The missing author transcript stays in the audit. C089’s operational host-death unknown is covered by EAT-R216. C164’s contested ordering is explicitly gated by EAT-R206. W11 promotion and final V4/V5 acceptance are owned by later P07–P10 compilation, not this foundation shard.


# Atomic requirements — r-lane (EAT-R235..R264): P04 registered function branch, P05 observation, P06 controls/journal, P07 first live journey

Compiled 2026-11-09 (PHASE 10, cluster r-lane) from the epistemic-adversarial-triage of program `mechanical-native-interoperability-2026-11-09` (Pi-subagents).

- Normative program sources for this lane: `pi-02-IMPLEMENTATION-PACKAGES.md` packets P04–P07 and `pi-03-VERIFICATION-AND-RELEASE.md` (oracles A/B/C, V0–V6 ladder, receipts G, gate H) at doc pin Pi `b085c34e`.
- Audited ledger: `epistemic-triage/CLAIMS.jsonl` (289 rows, FINAL statuses), `CONTRADICTIONS.md` (K001–K031), `REMEDIATION.md` (M001–M039). All claim statuses below are the ledger's FINAL statuses, graded at the environment pins Pi `8e2fedeb` / MW `62a10b59` on 2026-11-09; "at the pins" always means exactly that scope. Implementation re-pins before building (pi-02 Program controls).
- Lane boundary: P00–P03 foundations and the P08–P10 mandatory tail compile in sibling lanes. This lane's ids are EAT-R235..R264, sequential, no gaps. Prior lineage at the Pi pin: EAT-R001..R143 (2026-11-04 program) + EAT-R144..R200 (2026-11-06 delta); `Maps-to` names the priors each requirement extends. Ids are never renumbered.
- **Registered-path oracle** (used wherever acceptance says so): assertions are driven through the actual registered `workflow_execute` / `workflow_observe` tool objects captured from `src/index.ts` registration (C237 ESTABLISHED; C236 norm), never only `decideExecute`, the descriptor helper, or a direct `develop()` fixture — a direct fixture counts only as an additional control (C245 norm).
- Compile rules honored: requirement force never upgrades warrant; REFUTED premises yield only negative/conditional obligations; UNDETERMINED yields verification; CONTESTED is preserved, never silently chosen; no numeric confidence is manufactured.

---

## EAT-R235 — Registered workflow_execute MUST execute an admitted kind:function definition

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The registered `workflow_execute` tool MUST, for an exactly allowlisted saved `kind:function` definition whose descriptor/export pin and admission checks pass, call the installed producer host, mint a Pi logical invocation ID, and return provider-qualified refs — replacing the pin-time refusal with a real function branch, editing only the P04 surfaces (`src/workbench/execute-tool.ts`, `src/index.ts`, optionally `execute.ts`, a narrow Mechanical adapter under `src/workbench/hosts/`).
- Rationale: C193 ESTABLISHED (at the pins the single registered `workflow_execute` launches only `script`; `function` is refused before source load/launch — the gap this packet closes); C234 ESTABLISHED (three kinds known, only script executes); C192 NON-EPISTEMIC (P04 proposal, adopted here as a design decision); C165 SUPPORTED (MW M01–M04 define the producer host/services this branch consumes); C246 ESTABLISHED (`workflow_observe` is registered at the pin). pi-02 P04 Implement/Acceptance.
- Acceptance criteria:
  1. Registered-path oracle: the actual registered tool object, invoked with `kind:function` and one injected installed host, executes exactly one function in an L2-style integration test and returns one logical invocation ID and a native ref (pi-02 P04 Acceptance).
  2. Assert `workflow_observe` finds the invocation by that ID.
  3. Red-first: the identical registered-path test, run at the pre-implementation baseline, fails with the unsupported-kind refusal, and that failing output is preserved before the code lands (C225 norm; C193).
  4. Negative: a non-allowlisted `function` id is refused with zero producer-host calls (pi-03 A01 class, single-fault instance).
- Evidence tier target: V3 (native proof deferred to P07 — EAT-R259).
- Conditions / unknowns: ratified exact API from P02/P03 + M01–M04 (C164 CONTESTED: pi-02:35 vs pi-02:51 vs MW's DAG — ordering unsettled until the P00/M00 joint-DAG ruling, K005/M007); the installed-host leg waits on M01 (C239 REFUTED: no `/host` subpath at the MW pins, K003/M017; C186 ESTABLISHED).
- Maps-to: P04; B-dispatch (C157 ESTABLISHED); extends EAT-R032, EAT-R054.

## EAT-R236 — Script workflows MUST remain byte/behavior compatible after the function branch lands

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Landing the function branch MUST leave all existing script golden fixtures, workflow tool names and the reply dialect byte/behavior compatible where pi-02 requires it, and MUST NOT register duplicate workflow tool names.
- Rationale: C192 NON-EPISTEMIC (P04 acceptance clause); C213 ESTABLISHED (script-workflow golden fixtures and census-list tests exist at the pin); C233 NON-EPISTEMIC (A13 oracle: one registered function tool alongside existing scripts, no drift); C004 SUPPORTED as bounded by M038 ("working" = present and covered by existing tests at 8e2fedeb; the no-regression result is produced by this gate, never asserted beforehand).
- Acceptance criteria:
  1. The existing script golden fixtures pass unchanged on the function-branch commit (A13 positive: same script golden fixture run).
  2. Registered-path oracle: the registered tool list contains exactly one workflow-execute surface and no duplicate workflow tool names (A13 negative).
  3. Reply-dialect snapshot for script runs is byte-identical wherever pi-02 P04 requires byte compatibility; intentional differences are enumerated in the cut receipt.
- Evidence tier target: V3 (fixtures at V1 feed it).
- Conditions / unknowns: the full-suite no-regression certification on final merged trees is P10 (sibling lane); this requirement gates the P04 cut only.
- Maps-to: P04; B-dispatch; extends EAT-R033.

## EAT-R237 — furnace-formula MUST stay an explicit refusal outside the Mechanical adapter

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: After the function branch lands, a `furnace-formula` definition MUST still be refused with the explicit unsupported diagnostic, and MUST never be routed into the Mechanical adapter, any producer import, or any effect.
- Rationale: C194 ESTABLISHED (`furnace-formula` is schema-recognized and explicitly unsupported by registered `workflow_execute` at the pin — keeping it explicit is preservation, not new behavior); C192 NON-EPISTEMIC (P04 edit clause); C230 NON-EPISTEMIC (A01 mutation column names `furnace-formula`).
- Acceptance criteria:
  1. Registered-path oracle: `kind:furnace-formula` → explicit unsupported diagnostic; assert zero source loads, zero producer-host/module imports, zero Forge dispatches (A01 expected observation).
  2. Mutation: removing the explicit refusal arm turns the test red; the mutant is recorded run/killed per C226 norm.
- Evidence tier target: V3.
- Conditions / unknowns: none.
- Maps-to: P04; B-dispatch; extends EAT-R155.

## EAT-R238 — Invalid definition, permissions or source MUST never enter the producer on the registered path

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: The registered function branch MUST compose final function authority and writer source admission into its one effectful dispatch chain so that any invalid definition, permission or source state is refused before descriptor import, producer call or any effect, with no await between the final grant decision and the single dispatch.
- Rationale: C192 NON-EPISTEMIC (P04 acceptance: "Invalid definition/permissions/source never enter producer"); C191 ESTABLISHED (at the pin the final grant decision and effectful dispatch are NOT yet joined into one no-await chain — the time-of-check window this guards); C227 UNSUPPORTED (the named mutation-target checks do not all exist on any current function-launch path; per M016 they are current component checks plus planned integration — this requirement is that integration); C230/C231/C232 NON-EPISTEMIC (A01/A06/A10 single-fault oracles). Authority is RISK_CONTROL: the guarded failure (a stale grant or stale source authorizing an effect) is a plausible prospective risk, not an observed defect at the pins.
- Acceptance criteria:
  1. Registered-path oracle: for each of {arbitrary `function` id (A01), absent grant (A06), dirty workspace (A10)} the registered tool refuses with zero user-loader calls, zero writer calls and zero Forge dispatches (pi-02 P02/P03 zero-effect oracle applied at the composed P04 path; the exhaustive A01–A14 sweep remains P08, sibling lane).
  2. Positive control: a fully valid invocation reaches exactly one dispatch.
  3. Mutation: removing the final rights re-read turns a test red; mutants are recorded not-run/survived/equivalent honestly (C226 norm).
  4. Assert (test or static check) that no await separates the final authority decision from the dispatch call (C191).
- Evidence tier target: V3.
- Conditions / unknowns: exact action-grant spelling and single-writer lease owner are P00/M00 rulings (K008; M019) owned by the P00–P03 sibling lane.
- Maps-to: P04; B-dispatch (composes B-authority/B-source outputs); extends EAT-R025, EAT-R030, EAT-R031.

## EAT-R239 — Function state MUST live in the existing Workbench task/observation store

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: Function invocation state MUST be registered in the existing Workbench task/observation store; the function path MUST NOT introduce a parallel hidden task table.
- Rationale: C195 ESTABLISHED (the existing workflow task map and observation projection exist at the pin and can host function state — they do not already do so); C192 NON-EPISTEMIC (P04 Implement clause); C106 NON-EPISTEMIC ("do not add a scheduler inside Pi"); C201 REFUTED on the atomizer's single-scheduler gloss, bounded by M011 — this rationale deliberately asserts neither "Pi has one scheduler" nor "Pi has no scheduler"; the compiled norm is only: do not add another store/authority.
- Acceptance criteria:
  1. Registered-path oracle: after a function launch, the invocation is readable from the existing store via `workflow_observe`; assert the reply's invocation record and the store's task record share the same ID.
  2. Module census on the P04 cut: no new task-table/store module is introduced for function state; the receipt names the existing store module reused.
- Evidence tier target: V3 (plus V0 cut census).
- Conditions / unknowns: none.
- Maps-to: P04; B-dispatch; prior: none directly (complements EAT-R032).

## EAT-R240 — The function launch MUST return promptly with completion:not-asserted

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The registered function branch MUST persist launch intention, schedule execution asynchronously, and return `completion: not-asserted` plus provider-qualified refs promptly; it MUST NOT block the tool reply on workflow completion and MUST NOT assert completion at launch.
- Rationale: C192 NON-EPISTEMIC (P04 Implement clause); C126 ESTABLISHED (registered script tools already return `completion: not-asserted` promptly — the precedent shape being extended); C125 NON-EPISTEMIC (pi-01 §4 step 4 norm).
- Acceptance criteria:
  1. Registered-path oracle: with the injected host parked on a barrier, the tool reply returns before the host completes and carries `completion: not-asserted`, the invocation ID and native refs.
  2. After releasing the barrier, `workflow_observe` reports the settled outcome for the same invocation ID.
  3. Mutation: making the launch reply assert completion turns the test red.
- Evidence tier target: V3.
- Conditions / unknowns: none.
- Maps-to: P04; B-dispatch; extends EAT-R032, EAT-R042.

## EAT-R241 — The P04 gate receipt MUST encode its evidence level

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The P04 gate receipt (`PI-FUNCTION-REGISTERED`) MUST derive from a real registered-path controlled test (not a stub typed helper) and MUST encode its evidence level (V3, injected callbacks) wherever the label is emitted, so it cannot be read as MW M06's native exit of the same name; until the P00/M00 receipt-vocabulary ruling, every emission carries the level marker.
- Rationale: K006 (one label, two evidence levels: pi-02:72 V3 fixture gate vs mw-02:84 L4-class native exit; M025 Phase-10 bead candidate); C192 NON-EPISTEMIC permittedWording ("the label must be disambiguated jointly"); C222 NON-EPISTEMIC (a label becomes an actual claim only with a passing receipt on a pinned candidate); C223 NON-EPISTEMIC (V-ladder definition) with K010/M021 (V↔L map: V3 and L3 are disjoint tiers).
- Acceptance criteria:
  1. The emitted P04 receipt names `evidence_level: V3` (or the P00/M00-adopted equivalent) adjacent to the `PI-FUNCTION-REGISTERED` label; an audit scan over emitted receipts finds no bare label without a level marker.
  2. The receipt records the registered tool entry point and the injected-callback marker, proving the gate ran at the registered path.
  3. Negative: the evidence validator (used per C283 norm; C282 ESTABLISHED — it judges receipts and cannot itself establish a native call) rejects a P04 receipt claiming native evidence.
- Evidence tier target: V3 (receipt about the V3 gate).
- Conditions / unknowns: final joint receipt vocabulary = P00/M00 ruling (K006/K009).
- Maps-to: P04; B-dispatch; extends EAT-R085.

## EAT-R242 — All four original Mechanical outcomes MUST project through the registered route

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: `workflow_execute` plus `workflow_observe` MUST carry each of the four original `DevelopmentOutcome` variants — `verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate` — end-to-end, asserting the complete original outcome payload and the separate host envelope, never only a `kind` string.
- Rationale: C244 ESTABLISHED and C199 ESTABLISHED (the MW outcome union has exactly these four variants at the MW pin); C130 ESTABLISHED (same, pi-01 witness); C077 ESTABLISHED (at the Pi pin no projection of the four-domain result, phase, or native source/gate state exists in the observation/control modules — the gap P05 closes); C245 NON-EPISTEMIC (oracle: through `workflow_execute` + `workflow_observe`; a direct `develop()` fixture is only an additional control); C241 NON-EPISTEMIC (B01–B04 rows); C196 NON-EPISTEMIC (P05 proposal).
- Acceptance criteria:
  1. Registered-path oracle: four tests drive injected producer callbacks yielding each variant through the registered route; each asserts the complete original outcome payload object and the separate host envelope (B01–B04 expected outputs).
  2. The direct `develop()` fixture of the same payloads exists only as an additional control and is not counted as satisfying this requirement (C245).
  3. Mutation: dropping any one variant's projection (e.g. mapping `needs_evidence` onto failure) turns exactly that variant's test red.
- Evidence tier target: V3 (native V4 instances arrive at P07 — EAT-R260).
- Conditions / unknowns: none for fixture-level; payload field set final shape follows the P00/M00 ABI ruling (K007 routed to the sibling lane).
- Maps-to: P05; B-outcomes; extends EAT-R036.

## EAT-R243 — Observation MUST NOT collapse domain, transport and process statuses

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST never coerce `needs_evidence` or `indeterminate` into failure, nor `verification_failed` into a transport error; transport-level success and the Mechanical domain outcome MUST remain separately readable on every reply.
- Rationale: C196 NON-EPISTEMIC (P05 clause, quoted verbatim in its permittedWording); C134 SUPPORTED (a transport-level `ok:true` reply may carry `verification_failed`/`needs_evidence` — transport success does not entail domain success); C241/C242 NON-EPISTEMIC (B02/B03/B04/B06 oracles).
- Acceptance criteria:
  1. Registered-path oracle, B02: injected correct candidate + native-FAIL-shaped verdict → domain `verification_failed`, operation/ref retained, transport status success (assert it is not rendered a transport failure).
  2. B03: partial/unknown scope → domain `needs_evidence`; assert agent/Forge were never dispatched.
  3. B04: invalid SDK/Git basis or partial/unknown verdict → domain `indeterminate`; assert no PASS-equivalent field appears anywhere in the reply.
  4. Mutation: collapsing `indeterminate` into failed turns red.
- Evidence tier target: V3.
- Conditions / unknowns: none.
- Maps-to: P05; B-outcomes; extends EAT-R037, EAT-R040.

## EAT-R244 — Observation MUST project separate axes and preserve unknowns explicitly

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Function observation MUST project, as separate fields: launch/admission, execution status, original Mechanical domain outcome, native Forge verdict/operation and complete-gate selection, source commit/tree/freshness, effect disposition, and provider-qualified refs; missing fields and unknown states MUST be preserved explicitly, never defaulted, fabricated, or implied by omission.
- Rationale: C196 NON-EPISTEMIC (P05 "Project separately" clause); C131 NON-EPISTEMIC (the explicitly illustrative `MechanicalObservationV1` envelope; K030 soft set — MW additionally asks a worktree recovery handle and bounded evidence provenance, to be settled in P05/P06 design); C133 ESTABLISHED (existing `NativeRef`, tool-reply, observation and journal contracts exist at the pin for additive extension); C132 NON-EPISTEMIC (prefer existing contracts, minimally additive versioned schema).
- Acceptance criteria:
  1. Registered-path oracle: a settled invocation's observation carries each listed axis as its own field; with the native operation withheld, the reply renders an explicit unknown marker for that axis — not a fabricated value, not omission.
  2. Schema check: the envelope is versioned and additive over the existing contracts; no duplicate incompatible contract is published (C132).
  3. The P05 design receipt records the K030 axis decision (recovery handle, evidence provenance): included, or deferred with reason.
- Evidence tier target: V3.
- Conditions / unknowns: final envelope shape follows the P00/M00 ABI ruling (K007, sibling lane); K030 axes decision recorded per criterion 3.
- Maps-to: P05; B-observe; extends EAT-R037, EAT-R052.

## EAT-R245 — Gate credit MUST be freshness- and identity-bound

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Observation MUST revoke current-gate credit whenever the gate does not bind the exact current candidate: native PASS with mismatched tree, partial/incomplete gate, transport exit 0 with native FAIL, stale tree after PASS, or a no-code-change candidate MUST never read as a current verified PASS; historical proof stays visible with freshness `stale`.
- Rationale: C196 NON-EPISTEMIC (P05 tests list names exactly these cases); C242/C243 NON-EPISTEMIC (B06, B07, B14 oracles); C286 NON-EPISTEMIC (H-gate vetoes: misleading Forge PASS; incorrect status collapse). Authority is RISK_CONTROL: a misleading PASS is a plausible high-impact failure mode guarded before any live run; no such defect is observed at the pins.
- Acceptance criteria (registered-path oracle, injected gate observations):
  1. B06: transport exit 0 + native FAIL/incomplete required step → not PASS; original native axes retained.
  2. B07: cached historical PASS + moved HEAD or changed manifest → historical proof visible, `freshness: stale`, current gate credit revoked.
  3. B14: no code-change candidate, or changed HEAD with the same Git tree → no verified candidate; gate not credited.
  4. P05-list variants: native PASS with mismatched tree, and stale tree after PASS, each assert credit revocation.
  5. Mutation: removing the candidate-tree match check turns B06/B14 red.
- Evidence tier target: V3 (native freshness instances at V4 in P07).
- Conditions / unknowns: none.
- Maps-to: P05; B-observe (joins B-git-census at P07); extends EAT-R038, EAT-R052.

## EAT-R246 — The invocation MUST remain addressable after the initiating turn

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: A function invocation MUST remain addressable by its Pi logical invocation ID after the initiating model turn finishes; reopening an archived invocation MUST return the exact domain outcome, native refs and source identity.
- Rationale: C196 NON-EPISTEMIC (P05 exit: "The function must remain addressable if the initiating Pi turn finishes"); C243 NON-EPISTEMIC (B10 oracle); C273 NON-EPISTEMIC (a long-lived function stays addressable by its invocation ID); C005 ESTABLISHED as bounded by M036 (at the pin `workflow_observe` reads embedded launches within the launching session; function observation is future work — the pin behavior does not yet satisfy this requirement); C198 SUPPORTED (inspector/card/footer UI surfaces exist; a Mechanical-specific help surface is P10 validation, sibling lane).
- Acceptance criteria:
  1. Registered-path oracle, B10: complete the function in background, end the originating turn context, reopen by invocation ID → exact domain outcome, native refs and source identity present.
  2. Operator surface: the invocation is openable through one supported UI surface after background completion (pi-02 P05 Tests, last clause).
- Evidence tier target: V3.
- Conditions / unknowns: cross-process reopen (after Pi restart) is exercised at P06/P09 fault tiers, not here.
- Maps-to: P05; B-observe; extends EAT-R051.

## EAT-R247 — Model-facing output MUST stay bounded while structured detail retains native identifiers

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Model-facing observation output MUST respect the byte budget and redaction while native IDs, evidence-gap and source-stale labels remain present in structured detail; a UI success glyph MUST NOT read as native Forge PASS without current proof.
- Rationale: C273 NON-EPISTEMIC (pi-03 F §2 norms, including the glyph rule); C274 SUPPORTED (byte-budget/redaction handling and inspector/card surfaces exist at the pin for reuse — function-native details are the new part); C196 NON-EPISTEMIC (P05: "Model-facing output bounded").
- Acceptance criteria:
  1. Registered-path oracle: an oversized domain payload yields a model-facing reply within budget whose structured detail still carries the native IDs and the stale/gap labels.
  2. UI: the invocation in R245's B07 state (stale PASS) does not render the success glyph.
- Evidence tier target: V3.
- Conditions / unknowns: full operator/LX validation is P10 (sibling lane).
- Maps-to: P05; B-observe; extends EAT-R040, EAT-R052.

## EAT-R248 — Observer gaps and missing identities MUST read as gaps, not success

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: A dropped or out-of-order observer cursor, a blank agent session, an absent Forge operation ID, or a missing candidate tree MUST render as an explicit gap/stale/unknown diagnostic and MUST never imply successful completion or any verified claim.
- Rationale: C242 NON-EPISTEMIC (B08, B09 oracles); C196 NON-EPISTEMIC (P05 tests: "missing agent session and observer cursor gap"); C248 SUPPORTED (SDK session and Forge operation IDs are obtainable from the pinned observers' existing native paths — so their absence is detectable rather than silently normal). Authority RISK_CONTROL: guards a plausible silent-success failure mode.
- Acceptance criteria (registered-path oracle):
  1. B08: blank agent session / absent Forge operation ID / missing candidate tree → no verified claim; explicit diagnostic/unknown fields set.
  2. B09: bounded out-of-order native observation plus a dropped cursor → explicit gap/stale marker; assert no implied successful completion.
  3. Mutation: treating a cursor gap as caught-up turns red.
- Evidence tier target: V3.
- Conditions / unknowns: host-death cursor behavior is EAT-R257 (V5).
- Maps-to: P05; B-observe; extends EAT-R052.

## EAT-R249 — Profile reporting MUST be adoption-gated and factual

- Type: INSTRUMENTATION
- Authority: NORMATIVE_DECISION
- Statement: Until the P00/M00 ABI adopts host-owned evidence/context profile selectors, Pi observation and receipts MUST NOT present `evidenceProfile`/`contextProfile` values (including `git-census-v1`/`plain-v1`) as executed; after adoption and live execution, Pi MUST record and report the profile identifiers actually used by the invocation, witnessed from the producer side.
- Rationale: C275 REFUTED (no executed invocation records these fields at the pins; they are proposed host-owned ABI fields only — M018 re-kinds the premise into exactly this P05 receipt requirement); C204 REFUTED (the identifiers have zero code witnesses at the pins; the rig's committed selectors are `discovery`/`context`/`contextMode` — M012); C272 NON-EPISTEMIC with its premise-defect propagation note (the operator question is valid as a future receipt requirement only); C116 NON-EPISTEMIC (the three-selector proposal); K019 (one SAME_ORIGIN doc lineage — doc agreement is not corroboration). REFUTED premises generate the negative half; the positive half is conditional on the adoption event.
- Acceptance criteria:
  1. Negative, now: observation output and receipts contain no profile field populated with an unadopted identifier; a test asserts absence or explicit `proposed`/`unadopted` marking pre-adoption.
  2. Conditional positive: after adoption lands, a registered-path run records the executed selector literals read from the installed producer package (manifest/export witness, not Pi-side constants), and observation reports exactly those.
  3. Mutation: hardcoding `git-census-v1` into the report without a producer witness turns red.
- Evidence tier target: V3 pre-adoption; V4 for live reporting.
- Conditions / unknowns: P00/M00 profile-selector adoption (K019; M012/M018).
- Maps-to: P05; B-observe (vocabulary shared with B-git-census); prior: none (new audit finding).

## EAT-R250 — Durable intent MUST precede any writer/claim/gate dispatch

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The function path MUST journal a durable local intent record before any writer, claim or gate dispatch and append settled native refs afterward, reusing the existing workflow journal rather than a new store.
- Rationale: C200 NON-EPISTEMIC (P06 proposal); C074 ESTABLISHED (journal/runtime/reconcile modules exist at the pin with effect classification and a read-replay basis); C075 REFUTED as narrowed by M005 (what is absent at the pin is persisted *Mechanical* writer/gate intent and a *Mechanical* entry in `RECONCILE_EVIDENCE_READS` — the existing four-producer reconciliation must not be denied; this requirement adds the Mechanical member); C140 NON-EPISTEMIC (journal intent → acknowledged operation → settled outcome ordering); C253 ESTABLISHED (per-run workflow journal exists and is snapshotable).
- Acceptance criteria:
  1. Registered-path oracle: a run killed/parked after the intent write but before dispatch leaves a journal showing the intent row and zero effects (C250 class, pre-effect).
  2. Settled run: the journal shows the intent row strictly before the dispatch row, with native refs appended at settlement (C140 ordering).
  3. Mutation: removing the intent write turns a replay/recovery test red (one of M016's planned-integration mutation targets, now composed; recorded per C226 norm).
- Evidence tier target: V3.
- Conditions / unknowns: none.
- Maps-to: P06; B-effects; extends EAT-R041, EAT-R042.

## EAT-R251 — Uncertain effects MUST resolve only by native readback

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: On lost acknowledgment, cancel, or process death, the function path MUST reconcile through Git/Forge native readback using the recovery oracle — `occurred` only from producer-native evidence; `not-occurred` only from positive authoritative absence at a queryable identity and current source; `unknown` from an incomplete read — reusing Mechanical's typed `DevelopmentAbortedAfterDispatchError` / `DevelopmentLostAcknowledgementError` semantics.
- Rationale: C254 NON-EPISTEMIC (recovery decision rules; both programs adopt the same oracle); C202 ESTABLISHED (both typed errors exist and are wired at the MW pin with reusable semantics); C200 NON-EPISTEMIC (P06 proposal); C075 REFUTED narrowed by M005 (Mechanical-qualified native reconciliation is the absent member being built); C251/C252 NON-EPISTEMIC (C-table effectful and observation/replay rows).
- Acceptance criteria (registered-path oracle, faults injected at independently controlled barriers):
  1. After Git commit, before acknowledgment → native commit SHA/tree recoverable; fail on a second commit or a false not-started.
  2. Forge gate dispatched, reply lost → native operation lookup or `indeterminate`; fail on a silent second `gate.run`.
  3. Native Git/Forge source unreachable → `unknown` plus operator instruction; fail if `not-occurred` is inferred from no response.
  4. Mutation: returning `not-occurred` on a read timeout turns red.
- Evidence tier target: V3 (full process-kill matrix at V5 — EAT-R256/R257 and the P09 sibling lane).
- Conditions / unknowns: none beyond the fault-harness barriers.
- Maps-to: P06; B-effects / B-replay; extends EAT-R043, EAT-R044.

## EAT-R252 — Stop semantics MUST be pre/post-dispatch asymmetric and never rollback

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: A stop requested before dispatch MUST prevent any SDK session; a stop after dispatch MUST record cancellation-requested with effect disposition uncertain/occurred and MUST NOT claim rollback; late candidate/gate evidence MUST stay visible; a cancellation request MUST never close Beads, reset Git, reverse a Forge gate, or undo a Furnace Attempt.
- Rationale: C200 NON-EPISTEMIC (P06 Controls); C243 NON-EPISTEMIC (B11 oracle); C254 NON-EPISTEMIC (the "cancellation never ..." clause); C137 SUPPORTED (a stopped writer may still leave committed source — stopping does not imply absence of effects); C129 NON-EPISTEMIC (control requests cancellation/stop and never claims rollback).
- Acceptance criteria (registered-path oracle):
  1. Stop before dispatch → zero SDK sessions started (asserted via injected host counters).
  2. B11: stop during SDK write followed by a late commit → status cancellation-requested; effect disposition `uncertain` or `occurred`; no rollback wording anywhere in the reply; the late commit remains visible.
  3. Negative call census: the control path makes no Beads-close, Git-reset, gate-reverse, or Attempt-undo call.
  4. Mutation: reporting "rolled back" after a stop turns red.
- Evidence tier target: V3.
- Conditions / unknowns: none.
- Maps-to: P06; B-controls; extends EAT-R045, EAT-R046, EAT-R047, EAT-R070.

## EAT-R253 — The parked-beforeDispatch skip/retry loss MUST be repaired before effectful dispatch

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Pi MUST honor a per-agent skip or retry issued while `beforeDispatch` is parked (the witnessed wb-9v02 defect), so the pending cancel takes effect at the exact barrier and no late SDK query starts; this repair MUST land before any effectful function dispatch is enabled.
- Rationale: M006 records the measured state: targeted tests for per-agent skip, late/post-effect cancellation and concurrent-run race exist at the pin; the real open item is wb-9v02 — a skip/retry during a parked `beforeDispatch` is lost — WITNESSED and PENDING (repro at `test/workbench-mwi-cancel-repro.test.ts:1222`), and "must be repaired before any effectful function dispatch". C089 REFUTED on its blanket "no targeted tests exist" framing (the framing is refuted; the witnessed defect stands); C071 REFUTED as narrowed by M004 (per-agent skip of Claude agents exists and is tested; joint-Mechanical cancellation semantics are the absent part); C253 ESTABLISHED (`beforeDispatch` hook, per-agent skip and per-run journal exist); C250 NON-EPISTEMIC (C-table row 4 oracle); C225 NON-EPISTEMIC (red-first). This is the lane's one audit-confirmed code defect → EMPIRICAL_REPAIR.
- Acceptance criteria:
  1. The witnessed red (skip/retry lost during parked `beforeDispatch`) is reproduced from the existing repro, then turns green with the repair; the pre-repair failing output is preserved (C225).
  2. Registered-path oracle, C-table row 4: `beforeDispatch` pending + per-agent skip → pending cancel honored at the exact test barrier; fail if a late SDK query starts.
  3. The repair takes the pending-abort-state shape required by prior EAT-R160, following only the reproduced red.
  4. Ordering gate: effectful function dispatch stays disabled (or fixture-only) until this requirement's receipt exists (M006 ordering clause).
- Evidence tier target: V3.
- Conditions / unknowns: none — the red already exists.
- Maps-to: P06; B-cancel-repro; bead wb-9v02 (per M006), epic wb-1a3t (C158 ESTABLISHED); extends EAT-R015, EAT-R016, EAT-R160.

## EAT-R254 — Effect count MUST stay <=1 absent native not-occurred evidence

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Across journal replay, duplicate control events and host restart, the function path MUST keep native effect attempts at <=1 per authorized invocation; a new dispatch is permitted only after positively evidenced not-occurred plus newly authorized source; repeated cancel/reconcile events MUST be idempotent.
- Rationale: C200 NON-EPISTEMIC (P06: "effect counts stay <=1 unless an explicitly new authorized invocation is created after native not-occurred evidence"; "No blind retries under journal replay or host restart"); C252 NON-EPISTEMIC (idempotent-control and replay-with-changed-basis rows); C254 NON-EPISTEMIC (retry oracle); C139 NON-EPISTEMIC (replay source-basis definition); C096 ESTABLISHED (module existence does not prove cross-host replay or a durable write barrier — the property must be demonstrated, not assumed). Authority RISK_CONTROL: duplicate effects are a plausible high-impact risk guarded ahead of evidence.
- Acceptance criteria (registered-path oracle, fault barriers):
  1. Duplicate cancel/reconcile events → exactly one effect; idempotency asserted via native-effect attempt counters.
  2. Journal replay after restart with changed skills/model/tools/gate source → old answer refused/stale; assert no re-dispatch keyed on the task label alone.
  3. Restart with an in-flight effect → no second attempt until injected native not-occurred evidence; then exactly one new authorized dispatch.
  4. Mutation: dropping the attempt-count guard turns red.
- Evidence tier target: V3 behavioral; process-death instances at V5 (EAT-R256).
- Conditions / unknowns: none.
- Maps-to: P06; B-replay; extends EAT-R021, EAT-R043, EAT-R044.

## EAT-R255 — Failed preservation MUST never trigger destructive cleanup on the function path

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: The function host MUST use the safe `cleanupWorktree` path: on a status/add/commit/branch preservation failure it MUST surface the typed preservation-failed result (kept path plus diagnostic, with the changed tracked and untracked bytes retained at the kept worktree/HEAD) and MUST NOT invoke destructive cleanup or report a false clean.
- Rationale: C256 ESTABLISHED (`cleanupWorktree` returns the typed preservation-failed variant on the pinned failure forms instead of removing the worktree); C067 ESTABLISHED (kept-source behavior); C176 REFUTED as narrowed by M009 (the result carries the kept path and a diagnostic — NOT the original bytes inside the result; all wording here and in receipts uses the corrected form); C255 NON-EPISTEMIC (the function host must use the safe path; broader injected/process-kill controls are V5); C251 NON-EPISTEMIC (false-clean row); C084 SUPPORTED (crash/process-death during preservation remains unproved at the pin — covered by EAT-R256/R257, not assumed here).
- Acceptance criteria:
  1. Function-path fault injection on each of status/add/commit/branch → typed preservation-failed; tracked and untracked bytes present at the kept path; no worktree removal.
  2. Assert no force-remove and no false clean on any preservation failure (C-table row: after tracked/untracked edit, before commit).
  3. Mutation: bypassing the safe path (direct remove) turns red (an M016 planned-integration target, now composed).
  4. Receipt/doc wording uses the M009 corrected form (kept path to retained bytes, never "original bytes in the result").
- Evidence tier target: V3 (crash-overlap at V5 via EAT-R256/R257).
- Conditions / unknowns: none.
- Maps-to: P06; B-preserve; extends EAT-R001, EAT-R002, EAT-R003, EAT-R144.

## EAT-R256 — P06 fault tests MUST record the full before/after evidence set at controlled barriers

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: Every P06 fault test MUST record full tracked and untracked worktree bytes, HEAD/index, source/permission basis, native-effect attempt count and the Pi journal before and after; each fault MUST be injected at an independently controlled barrier; the P06 matrix MUST cover at least: parked startup + per-agent skip, during-edit abort, after-commit-before-ack, gate-sent-reply-lost, restored Pi session, duplicate events/cancels, and host-process-killed-and-reattached — with inspection after a separate process restart where feasible.
- Rationale: C249 NON-EPISTEMIC (the recording protocol, quoted); C250/C251/C252 NON-EPISTEMIC (row oracles and fail-if conditions); C200 NON-EPISTEMIC (P06 test list); C257 SUPPORTED (existing tests cover selected worktree/replay/recovery forms, not every crash scenario — this requirement produces the new coverage rather than assuming it); C253 ESTABLISHED (the per-run journal exists to snapshot).
- Acceptance criteria:
  1. Each listed fault test's receipt contains all six recorded artifacts before and after (asserted programmatically, not by prose).
  2. Barriers are independently controlled harness handles (no sleep-based racing).
  3. Each of the seven listed P06 faults has a test asserting its C-table invariant and, as a negative, its fail-if condition.
  4. Reds are classified assertion vs timeout vs tooling/environment (pi-03 red-first policy; prior EAT-R168 shape).
- Evidence tier target: V5 for process-kill members; V3 for in-process barriers.
- Conditions / unknowns: the exhaustive P09 crash/load matrix (restart with unknown native operation, overlapping writers, resource tiers) is the sibling tail lane; this requirement covers the P06-listed faults only.
- Maps-to: P06; B-controls; extends EAT-R086, EAT-R168, EAT-R170.

## EAT-R257 — SDK-child host death MUST gain its missing test

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Pi MUST add the named missing evidence for host death: a test that kills the SDK child process mid-query and asserts the settled result/journal state — the session identified as unknown/active or explicitly unknown, a stale/unknown observer cursor with reattach id and ref, and no auto-repeat without a native read.
- Rationale: M006 and EPISTEMIC-AUDIT §9 name "host death of the SDK child" UNDETERMINED with exactly this missing artifact ("a test or receipt that kills the SDK child mid-query and asserts the settled result/journal state"); C089 REFUTED on its blanket framing, but its host-death member is the genuine remaining gap; C084 SUPPORTED (crash/process-death recovery during preservation is unproved at the pin); C250/C252 NON-EPISTEMIC (row oracles: native-Claude-started-before-first-output; host-process-killed-during-observation). UNDETERMINED → verification per the compile rules; the requirement produces evidence and presumes no outcome.
- Acceptance criteria:
  1. A process-kill test terminates the SDK child mid-query; the journal/result settles to explicitly-unknown or identified-active — never silent success and never an auto-repeat without a native read (C250 row-5 fail-if).
  2. Observation after the kill shows a stale/unknown cursor with reattach id and ref (C252 row-1 invariant).
  3. The receipt records the kill mechanism and the settled journal rows under the EAT-R256 recording protocol.
- Evidence tier target: V5.
- Conditions / unknowns: outcome unknown by definition until the test exists; any defect it finds files back as a new repair requirement.
- Maps-to: P06; B-controls; prior: none (named audit gap).

## EAT-R258 — The function path MUST NOT add a second scheduler or duplicate Furnace

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The function execution path MUST reuse existing dispatch/journal/reconcile authorities and MUST NOT introduce a new scheduler inside Pi nor duplicate Furnace's durable Run/Work/Attempt ownership; in the optional detached/Furnace mode, reconciliation MUST go through the native controller/Run/Attempt, never a bespoke local scheduler.
- Rationale: C106 NON-EPISTEMIC ("do not add a scheduler inside Pi"); C255 NON-EPISTEMIC (detached/Furnace reconcile via the native controller); C201 REFUTED on the single-scheduler gloss with the M011 bound — this requirement asserts neither "Pi has one scheduler" nor "Pi has no scheduler", only: do not add another; C074 ESTABLISHED (the journal/runtime/reconcile modules to reuse exist).
- Acceptance criteria:
  1. V0 census on the P06 cut: no new scheduling/queue-authority module for functions; the receipt names the existing authorities the function dispatch rides.
  2. Any Furnace-mode reconciliation call targets the native controller API; code census shows no local retry loop over Attempts.
  3. Behavioral tie-in: EAT-R254's duplicate-dispatch assertions pass unchanged (no hidden second scheduler emerges under fault).
- Evidence tier target: V0 census plus V3 behavioral tie-in.
- Conditions / unknowns: full detached/Furnace mode is P11 (optional, out of lane); only the boundary rule compiles here.
- Maps-to: P06 (P11 boundary); B-dispatch; extends EAT-R069.

## EAT-R259 — The first live journey MUST bind registered route, native writer, native gate and observation into one V4 receipt

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: P07 MUST execute the real registered `workflow_execute(kind:function)` with the exact independently packed Mechanical host on an isolated scratch Forge package, where one genuine native Claude SDK writer produces a changed clean commit/tree, the native Forge full gate binds that candidate, and `workflow_observe` returns the original domain and refs; the receipt MUST carry the full V4 field set — pinned versions, SDK session ID, Pi logical invocation ID, Mechanical domain, gate operation ID/selection, source base/commit/tree, matching candidate commit/tree and gate manifest, definition/descriptor/package digests, and the exact input task — all from producer-native API evidence, never an assistant's summary.
- Rationale: C203 NON-EPISTEMIC with its derivation-broken propagation note (the plan stands only with the receipt/profile/dependency premises repaired — EAT-R261/R262/R264 carry those repairs); C247 NON-EPISTEMIC (V4 field set and the producer-native evidence rule); C248 SUPPORTED (SDK session and Forge operation IDs are obtainable from the pinned observers' existing native paths; the future join must demonstrate both are preserved — this journey is that demonstration, not an inherited fact); C224 NON-EPISTEMIC (the V4 insufficiency list); C147 SUPPORTED (the program's own evidence is static inspection at the pins — nothing is inherited as already-run); C221 UNDETERMINED (no authoring-time execution could be verified either way — receipts start from zero); C264 ESTABLISHED (a default `forge build` excludes the opt-in native lanes).
- Acceptance criteria:
  1. One registered-path live run yields a receipt in which every C247-listed field is non-null and producer-native; the evidence validator checks it (per C283 norm; C282 ESTABLISHED — the validator judges receipts and cannot itself establish the call).
  2. The native lanes are run explicitly and their output stored (C264; a default green certifies nothing native).
  3. The receipt's SDK session ID and Forge operation ID match the producer-native records read back through producer APIs (the C248 demonstration).
  4. No fixture or proxy result is labeled native anywhere in the receipt (C224).
- Evidence tier target: V4.
- Conditions / unknowns: M01 installed host landed with the ratified subpath spelling (C239 REFUTED — no `/host` subpath at the MW pins; C186 ESTABLISHED — the rig exports no stable independent host API at the pin; K003/M017); P00/M00 receipt vocabulary (EAT-R261); wb-9v02 repaired first (EAT-R253/M006); profile-selector ruling for any profile fields (EAT-R262); if credentials/binaries are unavailable, EAT-R263 applies (BLOCKED, no imitation).
- Maps-to: P07; B-git-census; extends EAT-R054, EAT-R055, EAT-R085.

## EAT-R260 — The live journey MUST include native PASS, native FAIL and unknown/refusal variants

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: P07 MUST produce three genuine native variations — one true PASS, one native Forge FAIL, and one unknown/partial/dirty refusal — each through the registered route with producer-native IDs; no fixture or proxy result may be counted as native.
- Rationale: C203 NON-EPISTEMIC (native-variation clause); C247 NON-EPISTEMIC (two native negatives required: one genuine Forge FAIL, one unknown/refusal); C241/C242 NON-EPISTEMIC (B02 FAIL semantics and B04/B05 unknown/refusal semantics, applied at the native tier); C244 ESTABLISHED (the four-variant domain the outcomes must land in); C279 NON-EPISTEMIC (no fabricated native IDs).
- Acceptance criteria:
  1. PASS receipt: `verified_candidate` with matching candidate commit/tree and current gate credit.
  2. FAIL receipt: a genuine native Forge FAIL → `verification_failed` with the operation/ref retained (B02 at V4) — not a transport failure.
  3. Unknown/refusal receipt: dirty basis or incomplete gate → `indeterminate`/`needs_evidence` or an admission refusal with effect not-started (B04/B05 at V4).
  4. The three receipts carry distinct native operation IDs; the validator cross-checks that no ID is reused or fabricated (C279).
- Evidence tier target: V4.
- Conditions / unknowns: same preconditions as EAT-R259.
- Maps-to: P07; B-git-census; extends EAT-R055, EAT-R056.

## EAT-R261 — The P07 gate MUST join only producer-defined receipts

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The P07 joint gate MUST be configured over receipt labels that have a producer-side definition at gate time — at the pins that is MW M06's actual exit pair (`PI-FUNCTION-REGISTERED` then `PI-GIT-CENSUS-LIVE`) or the P00/M00-adopted set — and MUST NOT wait on `MW-PI-NATIVE-LIVE`, which no MW document or repository defines.
- Rationale: C205 REFUTED (`MW-PI-NATIVE-LIVE` occurs only at pi-02:93; zero hits in the MW docs and both repos at every audited pin — K001, the audit's highest-impact defect; M013: until the ruling, the gate joins MW's actual exit receipts); C203 NON-EPISTEMIC (the gate clause is a proposal whose receipt premise failed — propagation note); C278 NON-EPISTEMIC and K009/M026 (the two receipt skeletons share no join key; the joint gate cannot join them as written and needs one schema or a declared join key plus field map).
- Acceptance criteria:
  1. A gate-config check asserts every receipt label the P07 gate joins has a producer-side definition (a scan over the adopted vocabulary and the producer's receipt emitters); as of the pins this check fails on `MW-PI-NATIVE-LIVE`.
  2. The join uses one declared join key / field map per the P00/M00 skeleton ruling; until ruled, the gate names MW M06's actual exit receipts.
  3. Negative: introducing an undefined label into the gate config turns the check red.
- Evidence tier target: V0 config truth, enforced again at V4 execution.
- Conditions / unknowns: P00/M00 receipt vocabulary and skeleton join ruling (K001/K006/K009; M013/M025/M026).
- Maps-to: P07; B-git-census (ruling input: B-contract-choice); extends EAT-R085, EAT-R086.

## EAT-R262 — P07 profile instantiation MUST wait for ratified selectors and record executed literals

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: P07 MUST instantiate `git-census-v1`/`plain-v1` only after the P00/M00 ABI lands those selectors in producer and consumer code; its receipts MUST name the selector literals actually executed, witnessed from the installed producer package, and MUST NOT present an unratified identifier as an executed profile.
- Rationale: C204 REFUTED (the identifiers are proposed vocabulary with zero code witnesses at the pins; the rig's committed selectors are `discovery`/`context`/`contextMode` — M012 re-kinds the claim to PROPOSAL and adds the temporal qualifier "once the P00/M00 ABI lands these selectors"); C275 REFUTED (M018); C116 NON-EPISTEMIC (three-selector proposal); K019 (SAME_ORIGIN lineage: the two programs repeating the vocabulary is one lineage, not corroboration). REFUTED premises yield only this negative/conditional obligation; the journey's positive profile claims are conditional on adoption.
- Acceptance criteria:
  1. Pre-ratification: the journey harness refuses to label a run `git-census-v1`/`plain-v1` (assert refusal or explicit `proposed` marking).
  2. Post-ratification: receipt profile fields equal literals read from the installed producer package (manifest/export witness), consistent with EAT-R249's observation reporting.
  3. Mutation: injecting a Pi-side constant as the executed profile value turns red.
- Evidence tier target: V4 (conditional on adoption).
- Conditions / unknowns: P00/M00 profile-selector adoption (K019).
- Maps-to: P07; B-git-census; extends EAT-R053.

## EAT-R263 — Unavailable credentials or binaries MUST record BLOCKED, never an imitation pass

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: When credentials or binaries for the live journey are unavailable, the P07 receipt MUST record status BLOCKED naming the missing prerequisite; no imitation pass, fabricated native ID, or PARTIAL-relabeled-PASS is permitted; a gate or requirement label becomes an actual claim only with a passing receipt on a pinned candidate.
- Rationale: C203 NON-EPISTEMIC ("If credentials/binaries unavailable record blocked, not an imitation pass"); C222 NON-EPISTEMIC (labels become claims only with passing receipts); C279 NON-EPISTEMIC (no fabricated native IDs; no PARTIAL as PASS); C282 ESTABLISHED + C283 NON-EPISTEMIC (the mwi-release validator judges receipts as an evidence validator and cannot itself establish a native call); C221 UNDETERMINED (the plan's own non-execution report could not be verified — receipts, never prose, are the accepted execution evidence; M015).
- Acceptance criteria:
  1. A harness dry run without credentials yields a receipt with status=BLOCKED naming the missing credential/binary and no populated native-ID fields.
  2. The evidence validator rejects a receipt claiming PASS with null native IDs, and rejects PARTIAL relabeled as PASS.
  3. Negative: a fabricated session/operation ID fails the producer-native cross-check of EAT-R259 criterion 3.
- Evidence tier target: V0 validator behavior, exercised in the V4 context.
- Conditions / unknowns: none.
- Maps-to: P07; B-git-census; extends EAT-R085, EAT-R086, EAT-R087.

## EAT-R264 — P07 dependency and exit metadata MUST state M05/M06 truthfully and defer release

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: Scheduling, bead and receipt metadata for P07 MUST describe M05 as MW's fixture-safe installed-consumer conformance (L2, not native) and M06 as the same joint event as P07 (not a producer-side live input); dependency edges MUST NOT be filed from the artifact's conflicting DAGs until the P00/M00 joint-DAG ruling; and the P07 exit MUST state that function hosting is demonstrated for a real provider while W11 release/graduation still requires P08–P10.
- Rationale: C166 REFUTED (M05/M06 described as "the producer-side live native journey" — M05 is L2 fixture-safe conformance and M06 is the joint event; K002/M008); C164 CONTESTED (pi-02:35 vs pi-02:51 vs MW's DAG cannot all hold; bead dependency edges cannot be filed from the artifact as written — K005/M007; the conflict is preserved, not resolved here); C163 NON-EPISTEMIC (sequencing proposal with a derivation-broken note); C165 SUPPORTED (what M01–M04 actually deliver); C220 NON-EPISTEMIC (the release tail is mandatory); C285 ESTABLISHED (W11 is planned/not-shipped at the pin, with validator-recognized status vocabulary); C155 ESTABLISHED (the W11 row graduates only under the P08–P10 conditions); C286 NON-EPISTEMIC (H-gate veto list, including "W11 set to landed solely by docs"); C158 ESTABLISHED (actual Beads issues for the lineage exist — reconcile, never mint).
- Acceptance criteria:
  1. Bead/receipt text census: every P07-related description of M05 carries the L2/fixture-safe qualifier; no text calls M05 or M06 producer-side native evidence.
  2. P07 dependency edges in Beads are created only after, and citing, the P00/M00 joint-DAG ruling; until then P07 carries a blocking dependency on the ruling item itself (mirrors M007), reconciled against existing Beads issues (C158), never minted fresh.
  3. The P07 exit receipt contains the explicit statement that this is not release and that P08–P10 are still required (C220); no W11 status change is part of the P07 cut.
  4. Negative: the release validator refuses a W11 'shipped' flip that cites only P07 evidence (C286 vetoes; C285 status vocabulary).
- Evidence tier target: V0 metadata truth, joined to the V4 receipts.
- Conditions / unknowns: P00/M00 joint-DAG ruling (K005) — until it exists, scheduling stays blocked on it by design, which is this requirement's point, not a defect of it.
- Maps-to: P07; B-contract-choice + B-git-census; epic wb-1a3t (per M032/C158); extends EAT-R159, EAT-R172.

---

## Lane compile notes

- Authority census: NORMATIVE_DECISION 19 (R235–R237, R239, R240, R242–R244, R246, R247, R249–R252, R256, R258–R260, R262), RISK_CONTROL 5 (R238, R245, R248, R254, R255), EMPIRICAL_REPAIR 1 (R253), EVIDENCE_ACQUISITION 1 (R257), LINGUISTIC_INTEGRITY 4 (R241, R261, R263, R264).
- REFUTED premises compiled only negatively/conditionally: C205→R261, C204/C275→R249/R262, C166/C164→R264, C176→R255 wording, C201→R239/R258 bounds, C089→R253 rides the witnessed wb-9v02 defect (M006), C239→conditions on R235/R259 only.
- UNDETERMINED compiled to verification: the host-death member of C089 → R257. C221 (authoring transcript) is deliberately NOT compiled as an implementation obligation: its missing artifact is an authorship shell history (M015), and the operative protection — labels become claims only via receipts — is carried by R241/R259/R263 (C222).
- CONTESTED preserved: C164 is never resolved by this lane; R235/R259 condition on the P00/M00 ruling and R264 blocks edge-filing until it exists.
- Out of lane: the exhaustive A01–A14/B/C sweeps, mutation-qualification campaign, concurrency/performance (P08/P09) and release/W11 promotion, script/Agent/detached full regression, LX scenarios (P10) compile in the sibling tail lane; P00–P03 foundations (ABI shape K007, lease owner K008, grant spelling, descriptor/package admission, V↔L map publication M021) compile in the foundations lane. R-lane requirements only consume those rulings as named conditions.

# Atomic requirements — cluster r-tail (EAT-R265..EAT-R294)

Program: mechanical-native-interoperability-2026-11-09 (Pi-subagents). Phase 10 COMPILE, cluster `r-tail`.
Scope: pi-02 P08 (verification matrix A01-A14 + B01-B14 through registered tools), P09 (fault matrix C + workload/E), P10 (release proof, D commands, regression, F agent-LX ten scenarios, G receipts, H promotion gate + vetoes + non-vetoes + last-operation re-pin); pi-03 sections A-H are the normative sources.
Pins: program docs Pi `b085c34e` (pi-02, pi-03); Pi environment pin `8e2fedeb` (claims judged here); MW environment pin `62a10b59`; MW sibling docs `7f3809fd` (context only).
Ledger inputs: `epistemic-triage/CLAIMS.jsonl` (289 rows), `CONTRADICTIONS.md` (K001-K031), `REMEDIATION.md` (M001-M039), `ARBITRATION-2026-11-09.md`. Every claim id below is quoted with its FINAL ledger status; no rationale states a premise stronger than that status.
Prior lineage referenced in Maps-to: EAT-R001..R143 (2026-11-04 program), EAT-R144..R200 (2026-11-06 delta); B-* planning labels and wb- ids as filed under epic wb-1a3t. Ids here are EAT-R265..EAT-R294, sequential, no gaps.

## Shared definitions used by the acceptance criteria

- **ORACLE-REG** (the registered-path oracle the program demands): the registered `workflow_execute` tool object as registered in `src/index.ts` (`pi.registerTool(createWorkflowExecuteTool(...))`, index.ts:3009 at 8e2fedeb) invoked through Pi's tool-call surface, and the registered `workflow_observe` tool (index.ts:2933). Tests obtain the tool definitions from the registration path, never by importing `decideExecute` or the Mechanical descriptor helper directly (C236 NON-EPISTEMIC norm; C237 ESTABLISHED, C246 ESTABLISHED premises). At the pin the registered tool knows kinds script / function / furnace-formula and refuses `function` before source load or native launch (C234 ESTABLISHED, C193 ESTABLISHED, C150 ESTABLISHED), so every positive row below is red until P04 lands; a label becomes a claim only with a passing receipt on a pinned candidate (C222 NON-EPISTEMIC).
- **DETECT-ZERO** (detection model for every "zero import / zero effect" assertion): test-installed counters on (a) the Mechanical artifact importer seam (dynamic `import()` of any `@mechanical/*` specifier or any path under the installed artifact root, through the host bridge's injectable importer), (b) the four `DevelopmentServices` callbacks / writer calls, (c) native Forge dispatch (`gate.run` requests through the Forge adapter/observer), (d) Claude SDK session starts, (e) child-process spawns (injected spawner). "Zero X" is discharged only when counter X reads 0 AND the positive control for the same counter reads >= 1 in the same test file (false-deny detection, C206 NON-EPISTEMIC). A grep is never the detection model for a runtime absence.
- **Evidence tiers** are pi-03's V0-V6 (C223 NON-EPISTEMIC DEFINITION). V3 = registered route with injected finite callbacks; V4 = same route with installed SDK session and complete native Forge proof; V5 = crash/restart/lost-ack/controls/load/UX trials. Where a P10 requirement is itself a validator or docs check, "tier target" names the tier whose receipts it consumes and the own-harness tier (V1) separately. V and MW's L ladders invert at tier 3 (K010; C147 SUPPORTED, C223 permitted wording).
- Authority legend (requirement force, separate from claim warrant): NORMATIVE_DECISION = adopted program protocol/package choice; RISK_CONTROL = guard on a plausible hazard not observed to have occurred; EVIDENCE_ACQUISITION = produces evidence the audit found missing (UNDETERMINED / not yet existing); LINGUISTIC_INTEGRITY = docs/receipt wording may not exceed its warrant; EMPIRICAL_REPAIR = repair of an audit-found defect (none owned by this cluster; the one witnessed code defect in scope, wb-9v02, belongs to cancel-repro/P06 and is a condition here).

---

## EAT-R265 — P08 matrix tests MUST drive the registered tool objects, not admission helpers

- **Type:** VERIFICATION
- **Authority:** NORMATIVE_DECISION
- **Statement:** Every A01-A14 and B01-B14 test of P08 MUST invoke the function route through the registered `workflow_execute` tool object captured from the `src/index.ts` registration and MUST read results through the registered `workflow_observe` tool (ORACLE-REG); a test that exercises only `decideExecute`, the Mechanical descriptor helper, a direct `develop()` fixture or a text census MUST NOT be counted as discharging a matrix row.
- **Rationale:** pi-02 P08 ("through the actual registered tools and installed producer"; C206 NON-EPISTEMIC); pi-03 section A closing paragraph (C236 NON-EPISTEMIC) and the red-first rule against inert-route census assertions (C228 NON-EPISTEMIC). Premises: pi-03 does contain the full A-H matrix the packet points at (C207 ESTABLISHED); registration lives in `src/index.ts:3009` and `decideExecute` / the descriptor helper are separable modules (C237 ESTABLISHED); `workflow_observe` is registered at index.ts:2933 (C246 ESTABLISHED); the registered tool refuses `kind:function` before launch at the pin (C234 ESTABLISHED, C193 ESTABLISHED), so the suite is red by construction until P04; the present descriptor coverage is a V1 fixture unit, not V2 (C240 ESTABLISHED).
- **Acceptance criteria:**
  1. Each matrix-row test obtains the tool definition by name from the registered tool list produced by the same registration path as production `src/index.ts`; assert `tool.name === "workflow_execute"` (and `"workflow_observe"` for observation) and that the handler invoked is the registered handler object (identity assertion), not an imported helper.
  2. The receipt validator classifies as `control-only` any A/B row whose test file imports `decideExecute` or `mechanical-descriptor` without also invoking ORACLE-REG; `control-only` rows do not discharge the matrix row.
  3. Pre-implementation red: running the P08 suite against the pin (8e2fedeb) yields the registered refusal (`function` unsupported) for every positive row; the failing output is preserved in the receipt (C225 NON-EPISTEMIC).
  4. Mutant: replace the registered handler with the direct helper in one test; the identity assertion in (1) turns red.
- **Evidence tier target:** V3 (own harness V1).
- **Conditions / unknowns:** depends on P04 (registered function branch) existing; until then every positive row is red (C234 ESTABLISHED refusal).
- **Maps-to:** P08; B-dispatch (wb-4bxo), B-release (wb-j5y5); extends EAT-R032, EAT-R083, EAT-R170.

## EAT-R266 — A01-A05 identity/admission negatives MUST fail closed with zero import or effect

- **Type:** BEHAVIORAL (fail-closed guard)
- **Authority:** RISK_CONTROL
- **Statement:** Through ORACLE-REG, each A01-A05 negative (arbitrary `function` id, fake schema or `furnace-formula`; one-byte change to the saved definition; stale vendored fixture, extra or duplicate descriptor field, wrong schema-ref or path traversal; wrong manifest, changed tarball byte, path or symlink swap; attacker-provided module/export/URL/shell string in JSON) MUST be refused with a typed diagnostic before any artifact import, loader call, writer call, Forge dispatch or native launch (DETECT-ZERO: all counters 0), while the paired positive (exact saved definition, correct digest, committed descriptor + SHA, pinned pack artifact, exact reviewed host subpath) reaches exactly one dispatch.
- **Rationale:** pi-03 section A rows A01-A05 (C230 NON-EPISTEMIC); P08 "no import/effect for pre-admission failures" (C206 NON-EPISTEMIC); P02 test list (C181 NON-EPISTEMIC). Premises: the registered tool knows script/function/furnace-formula and refuses function before source load (C234 ESTABLISHED; `furnace-formula` explicitly unsupported, C194 ESTABLISHED); `mechanical-descriptor.ts` already implements a closed schema, allowlist and digest reader (C183 ESTABLISHED) exercised against a vendored fixture (C184 ESTABLISHED); these are component checks that no function-launch path composes yet (C227 UNSUPPORTED as a present function-path fact; permitted wording: current component checks plus planned function-path checks). The hazards (tampered tarball, injected module string) are not observed events; this is a guard.
- **Acceptance criteria:**
  1. For each of A01..A05 run positive then negative through ORACLE-REG; assert the negative result is a typed refusal naming the failed check (`definition-kind`, `saved-digest`, `descriptor`, `artifact`, `host-subpath`) and that DETECT-ZERO counters (importer, loader/writer, Forge dispatch, SDK start, spawn) all read 0.
  2. Positive control per row: importer = 1 and dispatch = 1 against the fixture host in the same file, proving the counters detect.
  3. A02: flipping one byte of the saved definition changes `DefinitionRef.artifactDigest` and yields importer = 0. A04: one flipped tarball byte under a correct manifest yields importer = 0; a symlink swap of the artifact root yields importer = 0 (lstat/realpath refusal, EAT-R153).
  4. A05: JSON input carrying `module`, `package`, `export`, `url` or a shell string yields refusal with importer = 0 and spawn = 0.
  5. Mutant per row: remove the single check (digest compare / descriptor SHA / tarball SHA / allowlist); the negative in (1) shows importer >= 1 and the assertion turns red; recorded per EAT-R272.
- **Evidence tier target:** V3 (V2 for the real packed-artifact leg, EAT-R271).
- **Conditions / unknowns:** the artifact pin shape (library-only vs library + rig tarball hash) is a P00/M00 decision (K029; C114 NON-EPISTEMIC); until ruled, A04 covers the library tarball hash MW's own loader already pins (C041 SUPPORTED; M002) and records the rig axis `not-run`.
- **Maps-to:** P08 (P02/P04 producers); B-descriptor (wb-ocie), B-dispatch (wb-4bxo); extends EAT-R007..R011, EAT-R152, EAT-R153, EAT-R155.

## EAT-R267 — A06-A09 rights and principal negatives MUST refuse at the final authority boundary with no dispatch

- **Type:** BEHAVIORAL (fail-closed guard)
- **Authority:** RISK_CONTROL
- **Statement:** Through ORACLE-REG, the function route MUST dispatch only when the effective principal holds `workbench:execute` plus the exact ratified one-colon function action grant (detached additionally `workbench:detach`; a Claude session `claude:invoke` plus each required `claude:tool:<name>` right), re-read at the final boundary with no await between the final grant decision and the single dispatch; grant absent, prefix/wildcard, wrong namespace, model-supplied grant, omitted detach right, omitted SDK tool right, forge rights present only in policy, and principal or session changed after parked admission or impersonated in input MUST each produce a final-authority refusal with dispatch = 0 and writes = 0.
- **Rationale:** pi-03 section A rows A06-A09 (C231 NON-EPISTEMIC); P03 "no await between final grant decision and one dispatch" (C187 NON-EPISTEMIC). Premises: `workbench:execute`, `workbench:detach`, `claude:invoke` exist at the pin (C235 ESTABLISHED, C190 ESTABLISHED); `function-authority.ts` implements final-boundary rights with principal/session reads and denies unknown shapes (C188 ESTABLISHED); both registered detached producers forward effective `claude:invoke` / `claude:tool:<name>` rights (C085 ESTABLISHED, C177 ESTABLISHED); action grants are one-colon `namespace:permission`, the earlier two-colon example is unrepresentable, and `claude:tool:<name>` is a tool right never an action grant (C039 ESTABLISHED, C093 SUPPORTED; K004/M019); the candidate action `mechanical:develop-write` is representable (C171 ESTABLISHED) but not adopted or deployed in either repo (C172 ESTABLISHED; `FUNCTION_ACTION_CONTRACT` unadopted, C062 ESTABLISHED); the final grant decision and effectful dispatch are not yet one chain at the pin (C191 ESTABLISHED).
- **Acceptance criteria:**
  1. A06 positive: principal holds `workbench:execute` + the adopted exact action (read from the adopted contract constant); dispatch = 1. Negatives, each -> typed refusal naming the missing exact grant and dispatch = 0: action absent; `mechanical:*`; a two-colon spelling; `workbench:<action>` (wrong namespace); grant present only in model-supplied JSON.
  2. A07: `hostMode: detached` without `workbench:detach` -> refusal before any detached host launch (detached launcher spy = 0).
  3. A08: Claude session lacking one required `claude:tool:<name>`, or holding forge rights only in policy -> native host preflight refusal (preflight invoked = 1, SDK start = 0).
  4. A09: principal or session changed between parked admission and final dispatch, or input carrying `principal`/`session` fields -> refusal naming stale principal/session; writes = 0.
  5. Chain: the final rights read and the dispatch happen with no awaited microtask between them (inject a revocation that resolves on the next tick after the final read; outcome is exactly one dispatch or a refusal, never a dispatch after a revocation that completed before the read).
  6. Mutant: reuse the parked-admission grants instead of the final re-read; A09 negative dispatches -> red.
- **Evidence tier target:** V3.
- **Conditions / unknowns:** the exact action spelling is a P00/M00 ruling (C171 ESTABLISHED representable; C172 ESTABLISHED not adopted); tests read the spelling from the adopted constant and never hard-code the proposal as adopted; A06 is `BLOCKED`, not `FAIL`, until adoption.
- **Maps-to:** P08 (P03 producer); B-authority (wb-201v), B-detached-grants; extends EAT-R028..R031, EAT-R012..R014, EAT-R154.

## EAT-R268 — A10-A11 source-admission negatives MUST refuse before any writer, retain bytes and reject a moved basis

- **Type:** BEHAVIORAL (fail-closed guard)
- **Authority:** RISK_CONTROL
- **Statement:** Through ORACLE-REG, a function dispatch MUST be admitted only against a clean canonical authorized workspace whose Git tree and Forge manifest were measured at admission and re-measured after every await; dirty tracked/untracked/index state, misdirected `.git`, a symlink alias, submodule or unmerged entries MUST produce a source-admission refusal that leaves every byte in place, and a HEAD move or `forge.toml` change between the initial measure and dispatch MUST yield no writer launch and no verification credit.
- **Rationale:** pi-03 section A rows A10-A11 (C232 NON-EPISTEMIC); P03 test list (C187 NON-EPISTEMIC). Premises: `source-admission.ts` already implements a canonical authorized root, Git/status/gate-manifest basis, attestation, lease and post-await remeasurement (C189 ESTABLISHED) as a component reachable from no production route (C058 ESTABLISHED; C191 ESTABLISHED).
- **Acceptance criteria:**
  1. For each dirty form {tracked modification, untracked file, staged index entry, rename, unmerged path, submodule entry} seed a temporary Git repo and dispatch via ORACLE-REG -> refusal kind `source-admission`; the worktree content hash before and after is identical; writer counter = 0.
  2. Misdirected git (`GIT_DIR` elsewhere), a symlinked alias of the root, and a root outside the authorized canonical root each -> refusal naming `canonical-root`/`realpath`; writer = 0.
  3. A11: after the admission measure, create a new commit before the final barrier -> refusal `basis-changed`, writer = 0; separately modify `forge.toml` -> refusal `manifest-changed`; Forge dispatch = 0.
  4. Positive control: a clean repo yields writer = 1 with recorded base commit, tree and manifest sha equal to the measured values.
  5. Mutant: remove the post-await remeasurement; the A11 negatives launch a writer -> red.
- **Evidence tier target:** V3.
- **Conditions / unknowns:** none beyond P04 existence.
- **Maps-to:** P08 (P03); B-source; extends EAT-R022, EAT-R023, EAT-R025, EAT-R026, EAT-R027.

## EAT-R269 — A12: concurrent invocations on one realpath MUST admit exactly one writer or refuse boundedly

- **Type:** BEHAVIORAL (guard)
- **Authority:** RISK_CONTROL
- **Statement:** When two or more function invocations target the same canonical realpath (including through path aliases), exactly one MUST acquire the writer lease and dispatch; every other MUST receive a bounded typed refusal or a bounded queued-wait reason (never a second writer in the shared root and never an unbounded hang); release of the lease without effect MUST be observable and idempotent.
- **Rationale:** pi-03 section A row A12 (C232 NON-EPISTEMIC); section E "at least two competing writers on the same root with canonical path aliases" (C270 NON-EPISTEMIC). Premise: a `WriterLeases` registry exists in `source-admission.ts` at the pin (C189 ESTABLISHED; K008 cites source-admission.ts:46). Open conflict: the Pi program places the lease in Pi source admission while MW's program places it in the Mechanical application host (K008; C033 NON-EPISTEMIC, C101 NON-EPISTEMIC, C123 NON-EPISTEMIC) — unsettled, routed to P00/M00 (M027).
- **Acceptance criteria:**
  1. Launch two invocations concurrently via ORACLE-REG against one root (one by realpath, one by symlink alias); admitted-writer count = 1; the other result is a typed `lease-held` refusal or a queued state carrying a bounded wait reason (EAT-R075); writer counter = 1.
  2. Release: the admitted invocation ends without effect; a third invocation then acquires the lease; a duplicate release is idempotent (no error, no double-release side effect).
  3. The refusal/queue reply names the lease owner side that refused (Pi admission, Mechanical host, or both under a two-level lease), as ruled.
  4. Mutant: remove alias realpath normalization; both invocations admit -> red.
- **Evidence tier target:** V3 (V5 for the section E competing-writer load row).
- **Conditions / unknowns:** lease owner (Pi vs MW host vs two-level) is an unresolved P00/M00 decision (K008/M027); the test asserts the invariant "<= 1 writer in the shared root" regardless of owner and records which owner it exercised.
- **Maps-to:** P08 (P03), P09 (section E); B-source, B-limits; extends EAT-R024, EAT-R074, EAT-R075.

## EAT-R270 — A13-A14: one registered function tool, no script drift, no capability from tool input

- **Type:** NEGATIVE_REGRESSION + BEHAVIORAL
- **Authority:** RISK_CONTROL
- **Statement:** Enabling the function route MUST leave exactly one registered `workflow_execute` tool (no duplicate workflow tools and no new tool name colliding with an existing one), MUST keep every existing script golden fixture byte/behavior identical, and MUST ignore model-injected `principal`, `grants`, `module`, `package`, `export`, profile selectors or hidden-policy fields so that the host never gains capability from tool input.
- **Rationale:** pi-03 section A rows A13-A14 (C233 NON-EPISTEMIC); P04 acceptance "all script fixtures, tool names and reply dialect remain compatible" (C192 NON-EPISTEMIC); pi-01 "the caller cannot bring its own closure, module or grant" (C123 NON-EPISTEMIC). Premises: sole registration at index.ts:3009 at the pin (C234 ESTABLISHED, C237 ESTABLISHED); script golden fixtures and census tests exist (C213 ESTABLISHED); script, standalone-subagent and native-observer surfaces exist with tests, and "working unchanged" is a release obligation rather than an asserted no-regression result (C004 SUPPORTED; M038).
- **Acceptance criteria:**
  1. Enumerate the registered tool names from the registration path with the function route enabled; the list has no duplicates and `workflow_execute` appears exactly once (detection model: the tool registry list at test time, not a grep).
  2. Run the existing script golden fixtures (`test/workflow-examples-claude-backend.test.ts` dual-backend golden equivalence, C213 ESTABLISHED) with the function route enabled and disabled; normalized replies are byte-identical.
  3. A14: for each injected field in {principal, grants, module, package, export, profile, the adopted evidence/context selector names, policy}, the effective principal, grants, artifact and profiles used by the dispatch deep-equal the host-owned values; the reply records `ignored-input-fields` or a refusal, never an upgraded capability; writer counter equals the control's.
  4. Mutant: merge input `grants` into effective grants; (3) turns red.
- **Evidence tier target:** V3 (V1 for golden fixtures).
- **Conditions / unknowns:** profile field names are proposed ABI vocabulary (C275 REFUTED as existing selectors; C116 NON-EPISTEMIC); the injected-field list reads the adopted ABI field names once ruled.
- **Maps-to:** P08 (P04); B-dispatch (wb-4bxo); extends EAT-R033, EAT-R034, EAT-R155.

## EAT-R271 — The V2 installed-consumer leg MUST import the real packed artifacts from an external temp consumer, conditional on MW-INSTALLED-HOST

- **Type:** VERIFICATION
- **Authority:** EVIDENCE_ACQUISITION
- **Statement:** The V2 receipt MUST be produced by `npm pack`ing the built MW members, installing them into a temp consumer outside both repositories, recording the SHA-256 of each tarball's bytes and each installed manifest, importing the jointly ratified host subpath and `@mechanical/workflows-development`, and asserting the real exported host function is callable; a descriptor-loader unit test against a mock function or vendored fixture MUST be recorded as V1, never V2; no test or document MAY hard-code `@mechanical/development-rig/host` as an existing import target until M01 lands with the ratified spelling — until then the V2 row is `BLOCKED`, not `PASS`.
- **Rationale:** pi-03 section A closing paragraph (C236 NON-EPISTEMIC); P02 exit (C181 NON-EPISTEMIC). Premises: both MW members are packable by manifest (`npm pack --ignore-scripts` in both forge.toml; C238 SUPPORTED) but the rig exposes no exports map and no `/host` subpath at 62a10b59 or 7f3809fd (C239 REFUTED; C030 ESTABLISHED; C186 ESTABLISHED; K003, M017); MW's loader pins only the library tarball (C041 SUPPORTED; M002); Pi's current coverage is a V1 fixture loader and no independently packed consumer exists at the pin (C240 ESTABLISHED; C060 ESTABLISHED).
- **Acceptance criteria:**
  1. A script creates a fresh temp dir outside both repos, runs `npm pack --ignore-scripts` on the built members, installs the tgz files and writes `{tarball_sha256, manifest_sha256, package_name, version}` per package into the receipt; re-running with one changed tarball byte produces a different sha and an install refusal against the recorded pin; cold and warm installs both record `revalidated: true` (C270 NON-EPISTEMIC).
  2. From the temp consumer, `import(<ratified host subpath>)` resolves and the ratified export shape is callable; the specifier is read from the adopted ABI constant; a test asserting the literal `@mechanical/development-rig/host` exists FAILS at 62a10b59/7f3809fd (negative regression for C239 REFUTED) and may pass only after the M01 receipt names that spelling.
  3. Receipt tier: a passing `test/workbench-mechanical-descriptor.test.ts` alone writes `evidence_level: V1`; the validator refuses `V2` unless the temp-consumer receipt from (1)-(2) is attached.
  4. Until MW-INSTALLED-HOST (M01) lands: `status: BLOCKED`; `limits_and_unknowns` names M01 and the spelling ruling.
- **Evidence tier target:** V2.
- **Conditions / unknowns:** MW M01 (EAT-R174) and the P00/M00 subpath spelling ruling; the rig-bytes hash axis decision (K029).
- **Maps-to:** P08 (P02); B-descriptor (wb-ocie), MW mw-host (wb-1zn2); extends EAT-R007, EAT-R008, EAT-R035, EAT-R089, EAT-R174.

## EAT-R272 — Every P08 property MUST carry a one-check-removal mutant with a positive control and an honest per-mutant record

- **Type:** VERIFICATION
- **Authority:** NORMATIVE_DECISION
- **Statement:** For each P08 property (final rights re-read, saved-definition digest, descriptor SHA/schema, tarball SHA, host-subpath allowlist, source re-measure, intent write, gate-selection proof, worktree preservation, outcome non-collapse) the suite MUST include an exactly-one-check-removal mutant whose named registered-path assertion turns red, a positive control proving that assertion can pass, and a per-mutant record of `killed | survived | equivalent | not-run`; a receipt MUST NOT state "all mutants killed" without the per-mutant list; each mutation target MUST be tagged `current-component` or `planned-function-path` with the file it lives in.
- **Rationale:** red-first policy (C225 NON-EPISTEMIC, C226 NON-EPISTEMIC); P08 "mutants must fail when their claimed property is removed, with positive controls to detect false-deny systems" (C206 NON-EPISTEMIC). Premise defect: the mutation targets exist today only as discrete component checks (function-authority.ts:364-368, execute.ts digest, source-admission.ts:499, runtime.ts:1839, worktree.ts:211-215, forge-operation-observer.ts:13-15) and no function-launch path composes them (C227 UNSUPPORTED; permitted wording: current component checks and planned function-path checks; K023, M016).
- **Acceptance criteria:**
  1. Receipt `negative_mutants` lists one row per target: `{target, file, tag: current-component|planned-function-path, expected: red, observed: killed|survived|equivalent|not-run}`; the validator refuses a receipt whose mutant rows are absent or whose summary claims all killed without rows.
  2. Each `killed` row links the red assertion id and its positive-control id in the same test file; a mutant without a positive control is reclassified `not-run`.
  3. Negative regression for C227 UNSUPPORTED: a doc or receipt sentence stating the six checks "exist on the function path" is flagged by the docs check unless the P04 receipt exists.
- **Evidence tier target:** V3 for registered-path mutants (V1 for component mutants).
- **Conditions / unknowns:** `planned-function-path` targets become testable only after P04-P06.
- **Maps-to:** P08; B-release (wb-j5y5); extends EAT-R083, EAT-R166, EAT-R170.

## EAT-R273 — B01-B04: the four original Mechanical outcomes MUST reach workflow_observe intact on separate axes

- **Type:** BEHAVIORAL
- **Authority:** NORMATIVE_DECISION
- **Statement:** For each original `DevelopmentOutcome` variant (`verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate`) produced by the installed host through ORACLE-REG, Pi MUST expose via `workflow_observe` the complete original outcome payload (deep-equal to the producer object) on a domain axis separate from the host envelope's execution status, gate verdict and freshness axes; it MUST never coerce `needs_evidence` or `indeterminate` into failure, nor `verification_failed` into a transport error; for `needs_evidence` neither the agent nor Forge MAY have been dispatched; for `indeterminate` no PASS MAY be projected.
- **Rationale:** pi-03 section B rows B01-B04 and the paragraph after the table (C241 NON-EPISTEMIC, C245 NON-EPISTEMIC); P05 (C196 NON-EPISTEMIC). Premises: the MW `develop()` outcome union has exactly these four variants at 62a10b59 (C244 ESTABLISHED; C199 ESTABLISHED); `workflow_observe` is registered at the pin (C246 ESTABLISHED); Pi has typed NativeRef / tool-reply / observation / journal contracts a Mechanical envelope can extend (C133 ESTABLISHED); P05 edit surfaces exist (C197 ESTABLISHED).
- **Acceptance criteria:**
  1. Through ORACLE-REG with injected finite callbacks, drive each of the four outcomes; `workflow_observe` returns `domainOutcome` deep-equal to the producer payload (nested evidence/reference fields included) with `execution`, `forge.verdict` and `freshness` on separate keys.
  2. B03: for `needs_evidence`, SDK-start = 0 and Forge `gate.run` = 0 (DETECT-ZERO with positive control from B01).
  3. B04: for `indeterminate` (invalid SDK/Git basis, or partial/unknown Forge verdict) no field equals PASS/verified and the model-facing summary carries no success marker.
  4. B02: `verification_failed` retains the Forge operation id and candidate ref; `execution` is `settled`, not `failed`/transport error.
  5. A direct `develop()` fixture run is recorded `control-only` and does not discharge B01-B04.
  6. Mutant: map `needs_evidence` to `failed` in projection; (1) and (3) turn red.
- **Evidence tier target:** V3 (B01 additionally requires the native V4 join of EAT-R277).
- **Conditions / unknowns:** none beyond P04/P05.
- **Maps-to:** P08 (P05); B-outcomes (wb-9a1o), B-observe; extends EAT-R036, EAT-R037, EAT-R040, EAT-R156.

## EAT-R274 — B05-B08 and B14: no PASS without matching fresh native proof, no invented domain

- **Type:** NEGATIVE_REGRESSION (false-PASS guard)
- **Authority:** RISK_CONTROL
- **Statement:** Pi MUST project no verified or PASS state when: the function was refused before invocation (B05: no invented domain, effect `not-started`); the gate transport exited zero but the native verdict is FAIL or a required step is incomplete (B06: not PASS, native axes retained verbatim); a cached historical PASS exists while HEAD or the Forge manifest changed (B07: historical proof visible, `freshness: stale`, current gate credit revoked); the agent session is blank, the Forge operation id absent or the candidate tree missing (B08: diagnostic/unknown); or no code-change candidate exists / HEAD changed with an identical Git tree (B14: no verified candidate, gate not credited).
- **Rationale:** pi-03 section B rows B05-B08 and B14 (C242 NON-EPISTEMIC, C243 NON-EPISTEMIC); the freshness stipulation "historically verified but not presently fresh once HEAD moved" (C136 NON-EPISTEMIC DEFINITION). Premises: Pi's Forge observer reads native `operation_id` and `gate.run` replies on existing paths (C248 SUPPORTED — existing observer capability; the future MW/Pi join must still show both ids are preserved); the exit-0/native-FAIL pairing is an adversarial synthetic case, not an observed Forge behavior (EAT-R039 precedent; its premise stayed UNDETERMINED in the 11-04 ledger) — this requirement does not assert the producer event occurs.
- **Acceptance criteria:**
  1. B05: refuse at admission; `workflow_observe` shows `admission: refused`, `domainOutcome: absent`, `effect: not-started`; no invented kind string.
  2. B06: a fixture gate reply with exit 0 and native verdict FAIL, and separately a selection missing a required step, each -> `forge.verdict` in {FAIL, partial}, projection != PASS; original native fields retained verbatim.
  3. B07: inject a stored PASS at commit X; move HEAD (or change `forge.toml`) -> `freshness: stale`; the PASS is shown under a `historical` key; current credit is none.
  4. B08: blank session id, absent operation id, missing candidate tree each -> `verified: false` with a diagnostic naming the missing identity.
  5. B14: a candidate whose tree equals the base tree -> no verified candidate; the gate is not credited even if PASS was returned.
  6. Mutants: credit PASS from exit code alone -> (2) red; drop the tree compare -> (5) red.
- **Evidence tier target:** V3 (native realism of B06/B07 is deferred to the V4 negatives of EAT-R277).
- **Conditions / unknowns:** the Forge envelope fields the gate axis reads must be pinned first (EAT-R158); the exit-0/native-FAIL pairing stays synthetic until a producer witness exists (EAT-R081).
- **Maps-to:** P08 (P05); B-outcomes (wb-9a1o), B-observe; extends EAT-R038, EAT-R039, EAT-R052, EAT-R157, EAT-R158.

## EAT-R275 — B09-B11: cursor gaps, reopen after the originating turn, and stop-with-late-commit MUST be truthful

- **Type:** BEHAVIORAL
- **Authority:** NORMATIVE_DECISION
- **Statement:** Pi MUST (B09) mark bounded out-of-order native observation or a dropped observer cursor as an explicit `gap`/`stale` state and never imply completion; (B10) return, for an archived invocation reopened after the originating model turn, the exact domain outcome, native refs and source identity by its Pi logical invocation id without relaunch; and (B11) after a user stop during an SDK write followed by a late SDK commit, report `cancel: requested`, `effect: uncertain | occurred` with the actual commit/tree, and never claim rollback or erased source.
- **Rationale:** pi-03 section B rows B09-B11 (C242 NON-EPISTEMIC, C243 NON-EPISTEMIC); P05 exit "the function must remain addressable if the initiating Pi turn finishes" (C196 NON-EPISTEMIC); section F addressability (C273 NON-EPISTEMIC). Premises: Pi has a Workbench task/observation store and projection (C195 ESTABLISHED; C197 ESTABLISHED); targeted late-abort and post-effect cancellation tests exist for Claude agents (C089 REFUTED on its "untested" framing — permitted wording: F2/F4/F6-F9 exist) while joint Mechanical cancellation and durable recovery of Mechanical effects are absent at the pin (C071 REFUTED on the unqualified clause; permitted wording keeps the Mechanical-qualified absence).
- **Acceptance criteria:**
  1. B09: deliver native events out of order and drop one cursor position; `workflow_observe` returns `observation.gap: true` / `stale: true` and `execution` stays `running | unknown`, never `settled`.
  2. B10: end the originating turn; restart the observation process; `workflow_observe(invocationId)` returns `domainOutcome`, `nativeRefs {session, operation}` and `candidate {baseCommit, commit, tree}` equal to the pre-restart values; relaunch counter = 0.
  3. B11: stop during the fixture SDK write; the fixture commits late; result shows `cancel.requested = true`, `effect` in {uncertain, occurred}, candidate commit present; the reply text contains no rollback/revert wording; worktree bytes equal the post-commit state.
  4. Mutant: treat a dropped cursor as end-of-stream; (1) turns red.
- **Evidence tier target:** V3 (V5 for the restart variant).
- **Conditions / unknowns:** joint Mechanical cancellation semantics (MW M04 / EAT-R090) pending.
- **Maps-to:** P08 (P05/P06); B-observe, B-controls; extends EAT-R046, EAT-R047, EAT-R051, EAT-R052.

## EAT-R276 — B12-B13: coordination proposals are non-authoritative and unsupported profiles are refused while Git/plain stays operable

- **Type:** BEHAVIORAL
- **Authority:** NORMATIVE_DECISION
- **Statement:** Pi MUST treat a pure-coordination proposal as an observation that never claims or closes Beads and never passes a Forge gate by its score (B12), and MUST refuse a request for an unsupported higher-evidence profile (HX task scope, RF committed context) with a typed `profile-unsupported` refusal while the same definition remains dispatchable under the Git-census/plain profile (B13).
- **Rationale:** pi-03 section B rows B12-B13 (C243 NON-EPISTEMIC); section H non-vetoes (C288 NON-EPISTEMIC); pi-01 rejected alternatives (C141 NON-EPISTEMIC). Premises and conditions: the identifiers `git-census-v1`, `plain-v1`, `rf-committed-v1` have zero code witnesses at either MW pin and are proposed vocabulary (C204 REFUTED and C218 REFUTED as existing identifiers, re-kinded PROPOSAL; K019; M012, M014) — tests read the adopted selector names from the ABI constant; an observation-only pure-coordination boundary (`src/workbench/mechanical-coordination.ts`, wb-0gbh) landed at b085c34e imported by no production module (K024; C040 NON-EPISTEMIC permitted wording) — B12 may reuse it as a fixture, not as proof of a function route.
- **Acceptance criteria:**
  1. B12: feed a coordination proposal carrying a passing score; Beads client calls = 0 (injected `bd` spy), Forge gate credit unchanged, reply `authority: observation`.
  2. B13: request the adopted HX evidence profile or RF-committed context profile -> refusal `profile-unsupported` naming the missing native witness; the same definition with the Git/plain profile dispatches (dispatch = 1).
  3. Negative regression for C204/C218 REFUTED: a test asserting that the rig declares `git-census-v1` or `rf-committed-v1` fails at 62a10b59 (detection model: fixed-string grep over apps/, packages/, contracts/ -> 0 hits outside test comments); the suite reads selector literals only from the adopted contract constant.
  4. Mutant: allow the HX profile by default; (2) turns red.
- **Evidence tier target:** V3.
- **Conditions / unknowns:** adopted selector vocabulary (P00/M00); HX/RF native gates are explicit non-vetoes for v1 (C288 NON-EPISTEMIC).
- **Maps-to:** P08 (P05; P12 boundary); B-coordination, B-hx-admit (wb-pxvv), B-rf-admit; extends EAT-R058, EAT-R060, EAT-R062, EAT-R071, EAT-R072, EAT-R163.

## EAT-R277 — The V4 receipt MUST carry producer-native identities for one PASS, one FAIL and one unknown, joined to the Pi invocation

- **Type:** VERIFICATION
- **Authority:** EVIDENCE_ACQUISITION
- **Statement:** The native V4 gate MUST be discharged only by a receipt whose fields come from producer-native APIs (never an assistant summary): the actual Claude SDK session id, source base commit/tree, Forge full selection and native operation id, candidate commit/tree and gate manifest sha that match across the Forge envelope and the Mechanical outcome, Pi invocation id and saved-definition digest, package/descriptor/SDK versions read from installed manifests, the exact input task and the original domain outcome; it MUST include two native negatives (one genuine Forge FAIL, one unknown/refusal such as a dirty basis or incomplete gate); and none of a source commit, passing test file, mocked callback, Forge-shaped JSON, standalone Mechanical CLI PASS or historical producer operation suffices.
- **Rationale:** pi-03 section B final paragraph (C247 NON-EPISTEMIC); acceptance hierarchy and its insufficiency rule (C223 NON-EPISTEMIC DEFINITION; C224 NON-EPISTEMIC); P07 native variation (C203 NON-EPISTEMIC). Premises: Pi observers already read SDK `session_id` and Forge `operation_id` on existing native paths (C248 SUPPORTED — the future join must demonstrate both ids are preserved end to end); no native function run exists at the pins and W11 is planned (C150 ESTABLISHED; C285 ESTABLISHED); the program itself executed nothing (C049 SUPPORTED; C147 SUPPORTED: V0 plus historical receipts); receipt-label vocabulary is unsettled — `MW-PI-NATIVE-LIVE` is defined by no MW document or repo (C205 REFUTED; K001/M013) and `PI-FUNCTION-REGISTERED` names V3 in Pi but MW's native M06 exit (K006/M025); M05 is L2 conformance and M06 is the same event as P07 (C166 REFUTED; K002/M008).
- **Acceptance criteria:**
  1. The receipt validator requires non-null `native_claude_session_id`, `native_forge_operation_id`, `candidate_commit`, `candidate_tree`, `forge_manifest_sha256`, `source_base_commit`, `source_base_tree`, `pi_invocation_id`, `pi_saved_definition_digest`, producer-read `node_and_sdk_versions` and `mechanical_domain_outcome` for a V4 PASS row; any null caps `evidence_level` at V3.
  2. Cross-check: `candidate_commit` / `candidate_tree` equal the values inside the Forge operation envelope and inside the Mechanical outcome; a mismatch is not V4.
  3. Three rows are present — PASS, native FAIL, unknown/refusal — with distinct operation ids (PASS/FAIL) or a refusal reason (unknown); fewer than three -> V4 `NOT_RUN` or `BLOCKED`.
  4. Each native id names its producer-native read (SDK init message; Forge `operation.started` / `gate.run` reply); an id sourced from assistant text is refused.
  5. The receipt's gate label encodes the evidence level (e.g. suffix `-V4`) so a V3 `PI-FUNCTION-REGISTERED` receipt cannot be joined as native (K006).
  6. Credentials or binaries unavailable -> `status: BLOCKED` naming the blocker; never an imitation PASS.
- **Evidence tier target:** V4.
- **Conditions / unknowns:** P07 execution; the P00/M00 receipt-label ruling (C205 REFUTED; M013, M025); MW M05/M06 alignment (C166 REFUTED).
- **Maps-to:** P08/P07 join feeding P10; B-git-census (wb-p3i2), B-release (wb-j5y5); extends EAT-R054, EAT-R055, EAT-R085, EAT-R086, EAT-R165.

## EAT-R278 — V5 fault tests MUST snapshot bytes, basis, attempt counts and journal around an independently controlled barrier

- **Type:** VERIFICATION
- **Authority:** NORMATIVE_DECISION
- **Statement:** Every P09 fault test MUST inject its fault at an independently controlled barrier (a test-owned promise or hook, never a timer), MUST record before and after the full tracked and untracked worktree bytes (content hashes), HEAD and index, the source/permission basis, the native-effect attempt counters (SDK starts, commits, `gate.run`) and the Pi journal file, MUST where feasible re-inspect after a separate process restart, and MUST classify every red as assertion, timeout or tooling/environment.
- **Rationale:** pi-03 section C opening paragraph (C249 NON-EPISTEMIC); red-first hygiene (C229 NON-EPISTEMIC); P09 (C208 NON-EPISTEMIC). Premises: Pi has a `beforeDispatch` hook, a per-agent skip and a per-run `<runId>.workflow.jsonl` journal that tests can snapshot (C253 ESTABLISHED); existing tests cover selected worktree/replay/recovery forms and some real detached crash rows, not the function-host V5 matrix (C257 SUPPORTED); the audit-side run executed selected suites only (EPISTEMIC-AUDIT section 12).
- **Acceptance criteria:**
  1. Each fault test emits a `fault-snapshot` record `{barrier, before: {treeHash, untrackedHash, head, indexHash, basis, counters, journalLines}, after: {...}, restarted: bool}`; the receipt validator refuses a V5 row lacking both snapshots.
  2. Barrier independence: the fault handler runs exactly once and only after the test's explicit `release()`; no `setTimeout`-based injection (static check over the fault test files plus the handler counter).
  3. Red classification: each failing case carries `red_kind` in {assertion, timeout, tooling} and the file declares an explicit time budget (EAT-R168).
  4. Mutant: remove the untracked-bytes snapshot; the validator in (1) refuses.
- **Evidence tier target:** V5.
- **Conditions / unknowns:** none.
- **Maps-to:** P09; B-controls, B-effects, B-release (wb-j5y5); extends EAT-R144, EAT-R168, EAT-R170.

## EAT-R279 — Pre-effect faults (C rows 1-5) MUST leave zero effects and honor pending cancellation at the exact barrier

- **Type:** BEHAVIORAL (fail-closed guard)
- **Authority:** RISK_CONTROL (secondary: EMPIRICAL_REPAIR verification of the wb-9v02 defect for row 4)
- **Statement:** Through ORACLE-REG with the EAT-R278 barrier: killed before descriptor import -> zero import/callback/SDK effects; killed after source measure but before the final right check with the grant revoked -> no launch (a cached admission MUST NOT authorize); killed after writer-lease acquisition with no effect -> the claim is not executed and the lease is released or reconciled (no second writer enters the shared root); a per-agent skip or retry issued while `beforeDispatch` is parked -> the pending cancel is honored at that barrier and no late SDK query starts; native Claude started but killed before first output -> the session is identified or explicitly `unknown`, never auto-repeated without a native read.
- **Rationale:** pi-03 section C rows 1-5 (C250 NON-EPISTEMIC); P06 tests "parked startup + per-agent skip" (C200 NON-EPISTEMIC). Premises: the run-abort recheck after the awaited `beforeDispatch` exists and is tested (C070 ESTABLISHED, C178 ESTABLISHED, C024 ESTABLISHED); the per-agent controller is allocated only after that barrier, so a per-agent skip/retry during the await is lost at 8e2fedeb (C088 ESTABLISHED) — a measured open violation, wb-9v02, status pending (C089 REFUTED on its "untested" framing; permitted wording names wb-9v02; K015, M006); the final grant decision and dispatch are not yet one chain (C191 ESTABLISHED); a `WriterLeases` registry exists (C189 ESTABLISHED).
- **Acceptance criteria:**
  1. Row 1: kill at barrier `before-import`; after restart inspection DETECT-ZERO importer = callbacks = SDK = 0.
  2. Row 2: revoke the grant at barrier `after-measure`; the final check refuses; SDK = 0; mutant: honor the cached parked-admission decision -> red.
  3. Row 3: kill at barrier `lease-acquired`; after restart a second invocation acquires the lease (release or reconcile) and the journal shows `claim: not-executed`; concurrent writers never exceed 1.
  4. Row 4: issue a per-agent skip and, separately, a retry while `beforeDispatch` is parked; release the barrier; SDK-start = 0 and the row settles `skipped` — this re-runs the `test/workbench-mwi-cancel-repro.test.ts:1222` scenario (wb-9v02; EAT-R015/R016) and can pass only after the EAT-R160 repair; until then the receipt records `FAIL (pending wb-9v02)`, never `n/a`.
  5. Row 5: kill after SDK start, before first output; after restart the journal shows `effect: unknown` with the session id when known; auto-repeat counter = 0.
- **Evidence tier target:** V5.
- **Conditions / unknowns:** the wb-9v02 repair (EAT-R160, cancel-repro) must land before row 4 can pass and before any effectful function dispatch (M006); joint Mechanical cancellation (MW M04) pending.
- **Maps-to:** P09 (P01/P06 producers); B-cancel-repro (wb-9v02), B-controls, B-effects; extends EAT-R015, EAT-R016, EAT-R031, EAT-R041, EAT-R045, EAT-R160.

## EAT-R280 — Effectful faults (C rows 6-10) MUST preserve bytes and native identities and never claim rollback or a second effect

- **Type:** BEHAVIORAL (fail-closed guard)
- **Authority:** RISK_CONTROL
- **Statement:** Through ORACLE-REG: a kill after tracked/untracked edits before commit MUST leave the bytes and a recovery path (a force-remove reporting "clean" is a failure); a kill after the Git commit before acknowledgment MUST leave the native commit sha/tree recoverable with no second commit and no false `not-started`; a lost Forge gate reply MUST resolve by native operation lookup or `indeterminate`, never a silent second `gate.run`; a lost Pi observation after the native gate settled MUST persist the native refs and the truthful historical outcome (no fabricated new gate, no lost source); cancel after writes with late completion MUST report the actual code effects with no rollback claim.
- **Rationale:** pi-03 section C rows 6-10 (C251 NON-EPISTEMIC); P06 "effect counts stay <= 1 unless an explicitly new authorized invocation is created after native not-occurred evidence" (C200 NON-EPISTEMIC). Premises: `cleanupWorktree` returns a typed preservation-failed result and keeps the worktree on the tested status/add/commit/branch forms (C256 ESTABLISHED; broader forms unproven, C022 SUPPORTED); the result carries the recovery path and diagnostic, not the bytes (C176 REFUTED; M009); MW defines `DevelopmentAbortedAfterDispatchError` / `DevelopmentLostAcknowledgementError` (C202 ESTABLISHED); Pi's reconciliation read map has furnace/forge/hyperunix/reactivefiber entries and no Mechanical entry (C075 REFUTED on the unqualified clause; permitted wording: no Mechanical entry, reconciliation exists for four producers; K016, M005); Pi's observer reads Forge operation ids (C248 SUPPORTED).
- **Acceptance criteria:**
  1. Row 6: kill at `after-edit`; after restart the content hashes of the tracked and untracked edits are found at the recovery path or kept HEAD; the cleanup result is `preservationFailed: true` with `path` (bytes asserted on disk, never inside the result object).
  2. Row 7: kill at `after-commit`; after restart the journal/observe shows candidate `{commit, tree}` equal to `git rev-parse HEAD` and its tree; commit counter = 1; effect != `not-started`.
  3. Row 8: drop the `gate.run` reply; recovery reads the native operation by id (a `forge.gate.status`-class read) and projects its verdict, or `indeterminate` when unreadable; `gate.run` counter stays 1.
  4. Row 9: settle the native gate, then kill before Pi observes; after restart `forge.operationId`, verdict and candidate persist; `gate.run` counter = 1; source identity unchanged.
  5. Row 10: cancel after writes; the fixture completes late; `effect: occurred`, candidate present, no rollback wording; the worktree equals the committed state.
  6. A Mechanical (or ruled producer-key) entry exists in the reconciliation read map used by rows 8-9; the test reads the frozen map and asserts the key (negative at the pin: no such key, C075 permitted wording).
  7. Mutants: restore the outer-catch force removal -> (1) red; retry `gate.run` on a lost reply -> (3) red.
- **Evidence tier target:** V5.
- **Conditions / unknowns:** MW M04 cancel/reconcile semantics (EAT-R090, EAT-R176); the producer key name is a P00/M00 ruling.
- **Maps-to:** P09 (P06); B-effects, B-controls, B-preserve (wb-5ik5); extends EAT-R001..R003, EAT-R041..R044, EAT-R046, EAT-R047, EAT-R144.

## EAT-R281 — Observation, replay and control faults (C rows 11-14) MUST yield stale/unknown states, refused replays and idempotent controls, including a real host kill

- **Type:** VERIFICATION
- **Authority:** EVIDENCE_ACQUISITION
- **Statement:** Through ORACLE-REG: killing the host process during observation MUST yield a stale/unknown cursor with a reattach id and native ref (an old cached event MUST NOT be shown as current); a journal replay whose skills, model, tools or gate source changed MUST refuse or mark the old answer stale (never replay on the task label alone); a repeated cancel or reconcile event MUST be idempotent with exactly one effect; inability to consult the Git/Forge native source MUST yield `unknown` with an operator instruction, never an inferred `not-occurred`. The SDK-child death case MUST be executed with a real process kill, producing the evidence the audit found missing.
- **Rationale:** pi-03 section C rows 11-14 (C252 NON-EPISTEMIC). Premises: targeted tests exist for per-agent skip, late abort and concurrent runs, but Claude-SDK-host death mid-query has no targeted test within `test/` — the UNDETERMINED member of C089 (C089 REFUTED on its framing; EPISTEMIC-AUDIT section 9; K015); existing coverage includes real detached crash rows and worker-kill todo cases but not the function-host matrix (C257 SUPPORTED); Pi reconciles four producers under an operator-attested policy (C074 ESTABLISHED; C075 permitted wording); replay invalidation requirements already exist for script agents (EAT-R017..R021).
- **Acceptance criteria:**
  1. Row 11: SIGKILL the host process mid-observation; after restart `workflow_observe` returns `observation.stale | unknown: true`, a `reattach.id` and `nativeRefs`; the last pre-kill event is labeled historical (`observedAt < killAt`), not current.
  2. Row 12: replay the journal with one changed dimension each (skill contents, model id, tool set, gate source sha) -> `replay: refused | stale`; unchanged -> replay allowed; mutant: ignore the basis -> red.
  3. Row 13: send the same cancel, and separately the same reconcile, twice; agent/gate/claim effect counters each = 1; the second event returns `idempotent: true`.
  4. Row 14: make the Git/Forge native read fail; disposition = `unknown`; the reply includes an operator instruction string; `not-occurred` never appears.
  5. Host-death evidence: the row 11 receipt names the kill signal, pid and the journal state; if the row is not run, `limits_and_unknowns` keeps the C089 host-death member listed as UNDETERMINED.
- **Evidence tier target:** V5.
- **Conditions / unknowns:** row 11 settles the host-death gap only for the tested kill form; other crash forms stay `not-run`.
- **Maps-to:** P09 (P05/P06); B-replay (wb-413a), B-controls, B-observe; extends EAT-R017..R021, EAT-R043, EAT-R048, EAT-R051, EAT-R052, EAT-R162.

## EAT-R282 — Effect recovery MUST follow the occurred / not-occurred / unknown oracle and cancellation MUST reverse nothing

- **Type:** NORMATIVE_DESIGN
- **Authority:** NORMATIVE_DECISION
- **Statement:** The function host's recovery decision MUST classify an effect `occurred` only from producer-native evidence, `not-occurred` only from positive authoritative absence at a queryable identity and current source, and `unknown` from any incomplete read; a new dispatch MAY follow only a positively evidenced `not-occurred` plus a newly authorized source; a cancellation request MUST never close Beads, reset Git, reverse a Forge gate or undo a Furnace Attempt.
- **Rationale:** pi-03 section C "Recovery decision" (C254 NON-EPISTEMIC; permitted wording: both programs adopt the same oracle, matching MW's `effect-reconciliation.ts:72` `disposition: occurred | not-occurred | unknown` and `:79` `retryPermitted: disposition === "not-occurred" && evidence !== null` at 62a10b59); section C control row (C252 NON-EPISTEMIC); section H veto "unknown effect retried" (C286 NON-EPISTEMIC). Premises: Pi's reconcile policy exists for four producers (C074 ESTABLISHED) with no Mechanical entry (C075 permitted wording).
- **Acceptance criteria:**
  1. Table-driven test over evidence {native-positive, native-absent-at-identity, read-failed, none} -> disposition {occurred, not-occurred, unknown, unknown}; `retryPermitted` is true only for `not-occurred` with non-null evidence and a fresh authorization token; mutant: permit retry on `unknown` -> red.
  2. Cancellation side effects: cancel an invocation holding a Beads claim, a Git commit, a Forge PASS and a fixture Furnace Attempt; `bd` close calls = 0, `git rev-parse HEAD` unchanged, the gate record unchanged, the Attempt state unchanged.
  3. The Pi disposition enum equals MW's (`occurred | not-occurred | unknown`); a schema test compares against the ABI constant.
- **Evidence tier target:** V3 (fixture) and V5 (post-fault).
- **Conditions / unknowns:** none; an adopted joint norm, not graded as a truth claim.
- **Maps-to:** P09 (P06); B-effects, B-controls; extends EAT-R043, EAT-R044, EAT-R070.

## EAT-R283 — The function host MUST use the preservation-safe cleanup path and MUST NOT add a Run/Attempt scheduler

- **Type:** BEHAVIORAL (guard)
- **Authority:** RISK_CONTROL
- **Statement:** The function host MUST call the preservation-safe `cleanupWorktree` path (never a force removal), which MUST return a truthful preservation-failed result on status/add/commit/branch failures with the recovery path and diagnostic; the broader injected and process-kill controls MUST run in an explicit opt-in V5 lane; detached/Furnace reconciliation MUST go through the native controller/Run/Attempt, and the function path MUST NOT introduce a Run/Work/Attempt or retry scheduler duplicating Furnace's.
- **Rationale:** pi-03 section C final paragraph (C255 NON-EPISTEMIC); P11 "Furnace decides scheduling, retries, pause/stop, not Pi" (C215 NON-EPISTEMIC); section H veto "destructive worktree cleanup" (C286 NON-EPISTEMIC). Premises: `cleanupWorktree` keeps the worktree and returns `preservationFailed/path/diagnostic` on the tested forms (C256 ESTABLISHED); the result carries a path, not bytes (C176 REFUTED); tests cover selected forms only (C257 SUPPORTED; C022 SUPPORTED); Pi has several dispatch/queue authorities (SubagentScheduler, AgentManager pools, fire-and-forget launches) and the artifact never claims "one scheduler" or "no scheduler" (C201 REFUTED as an audit gloss; K018/K028; M011) — so this requirement forbids ADDING one and MUST NOT be compiled as "verify no scheduler exists in Pi"; Furnace exposes no `ensure` API (C216 SUPPORTED).
- **Acceptance criteria:**
  1. The function host's cleanup call site resolves to `cleanupWorktree` (import identity) and no force-remove path is reachable from the host module (detection model: import census of the adapter module under `src/workbench/hosts/` plus a runtime spy on `fs.rm`/`rm -rf` in the cleanup test).
  2. Inject failures at status/add/commit/branch inside the function-host cleanup; each returns `{preservationFailed: true, path, diagnostic}` and the bytes are on disk (EAT-R144 matrix).
  3. The V5 kill controls live in a named opt-in lane (`forge.toml` `[build.commands.<mechanical-faults>]`) absent from `[build].gate`; the receipt stores that lane's output.
  4. No new scheduler: the function adapter module imports neither `src/schedule.ts` nor defines a retry loop (adapter-local static check paired with a behavioral test that a lost start ack yields `unknown`, not a re-dispatch); the assertion is adapter-local, never a repo-wide absence claim.
  5. Detached/Furnace mode: reconciliation uses the existing `furnace.run.inspect`-class read and never a phantom `ensure` call.
- **Evidence tier target:** V5 (opt-in lane); V1 for the import/cleanup unit.
- **Conditions / unknowns:** P11 is optional (P2) and the Furnace leg is not a v1 veto (C288 NON-EPISTEMIC).
- **Maps-to:** P09 (P01/P06/P11); B-preserve (wb-5ik5), B-controls, B-furnace-function; extends EAT-R001..R003, EAT-R050, EAT-R069, EAT-R144, EAT-R146.

## EAT-R284 — P09 MUST run the 1/4/16 workload tiers and the two-writer contention trial with per-phase instrumentation

- **Type:** INSTRUMENTATION
- **Authority:** EVIDENCE_ACQUISITION
- **Statement:** P09 MUST execute baseline tiers of 1 and 4 concurrent isolated function invocations, then 16 read-only/fixture invocations with independent roots repeated at least twice to expose leaks, a bounded larger tier only if host capacity allows (recorded `not-run` otherwise), and at least two competing writers on the same root via canonical aliases; it MUST instrument separately admission duration, digest/descriptor check, installed package load (cold and warm with tarball SHA revalidation), first SDK session effect, Git census/context, agent implementation, Forge verification, persisted journal/recovery, observer delivery and UI projection; and it MUST report attempted/admitted/queued/started/settled/failed/uncertain counts with reasons, native provider calls, RSS/heap peak, file descriptors, queue length, stream drops, total SDK/token spend and p50/p95 per phase — with no unbounded effectful load on shared source.
- **Rationale:** pi-02 P09 (C208 NON-EPISTEMIC); pi-03 section E paragraphs 1-2 (C269 NON-EPISTEMIC, C270 NON-EPISTEMIC). Premises: no function-host baseline exists at the pin; the only published numbers are proposed UI responsiveness goals in `docs/workbench/14-qa-and-benchmarks.md:106-115` (C209 SUPPORTED; permitted wording: measure a baseline before numerical gating); script-side timing/load requirements already exist (EAT-R078, EAT-R079) under the telemetry bead (wb-r5q2).
- **Acceptance criteria:**
  1. The load harness emits one JSON record per tier `{tier: 1 | 4 | 16 | larger, repeats, counts: {attempted, admitted, queued, started, settled, failed, uncertain}, reasons, phases: {<name>: {p50, p95, n}}, peakRss, peakHeap, fds, queueLenMax, streamDrops, nativeCalls, tokens}`; the validator refuses a V5 performance row lacking any field (missing -> `performance: not-run`).
  2. Leak exposure: tier 16 runs twice; `fds` and `peakRss` after the second run are recorded beside the first (no threshold asserted before EAT-R285 defines one).
  3. Two-writer trial: two invocations on one root via alias -> exactly one admitted (EAT-R269) and the other carries a wait reason; the trial performs no effect on shared source outside the lease holder.
  4. Cold and warm install rows both record the tarball sha check (`revalidated: true`).
  5. Per-phase monotonic timing joins each phase to its native id where one exists (EAT-R078).
- **Evidence tier target:** V5.
- **Conditions / unknowns:** the larger tier is conditional on host capacity; token spend needs the native lane (V4) — fixture tiers record `tokens: n/a`.
- **Maps-to:** P09 (section E); B-telemetry (wb-r5q2), B-limits; extends EAT-R074, EAT-R077, EAT-R078, EAT-R079.

## EAT-R285 — Numeric budgets MUST derive from measured baselines, be asserted as counters/caps, and never be imported from history

- **Type:** REPRESENTATION
- **Authority:** LINGUISTIC_INTEGRITY
- **Statement:** Every numeric performance or resource budget stated for the function host MUST cite the EAT-R284 measurement it derives from (date, host, command, sample size, source pin) and the published operator requirement it serves; performance gates MUST assert stable counters/caps (effect counts, queue bounds, drop counts, fd/RSS ceilings derived from measurement) rather than wall-clock durations; unrun or unsupported tiers MUST be recorded `not-run`; the historical npm-prep median and other dated cost figures MUST be cited only as history, never as current data.
- **Rationale:** pi-02 P09 "gate numerical budgets from current measured baseline and published operator requirements, not invented numbers" (C208 NON-EPISTEMIC); pi-03 section E paragraphs 2-3 (C270 NON-EPISTEMIC, C271 NON-EPISTEMIC); section H veto "unmeasured but claimed cost/load" (C286 NON-EPISTEMIC). Premises: the published operator numbers at the pin are proposed UI goals, not a measured host baseline (C209 SUPPORTED; M039 bound); the triage protocol forbids manufactured numeric confidence.
- **Acceptance criteria:**
  1. Docs/receipt check: every numeric budget token in the program's docs, skill and receipts (regex for `<=`, `>=`, `p95`, `ms`, `MB` adjacent to a number in the named files) is followed by a measurement citation `{date, host, command, n, pin}` or the literal `proposed` / `not-run`; a bare number fails.
  2. Performance gate tests assert counter/cap predicates only (static check: no `Date.now()` / `performance.now()` comparisons inside gate assertions; wall-clock values are recorded, not asserted).
  3. Negative regression (EAT-R164): the 2026-10-20 and 2026-11-02 npm figures and any pre-P09 median appear only under a `history` label.
  4. Mutant: insert an uncited `p95 <= 500ms` into the skill; (1) turns red.
- **Evidence tier target:** V5 (consumes EAT-R284); own harness V1.
- **Conditions / unknowns:** no baseline exists until EAT-R284 runs; until then every budget reads `not-run` or `proposed`.
- **Maps-to:** P09 (section E) and P10; B-telemetry (wb-r5q2), B-release (wb-j5y5); extends EAT-R079, EAT-R164.

## EAT-R286 — Release proof MUST run the Section D gates on the final merged trees of both repos at re-pinned heads, on Node 24

- **Type:** VERIFICATION
- **Authority:** NORMATIVE_DECISION
- **Statement:** After every source, skill and documentation fix is merged into the actual default branch(es), P10 MUST re-pin both heads, recompute both package hashes, and on those final merged trees run — after checking the current scripts — in pi-subagents `npm ci; npm run lint; npm run typecheck; npm run typecheck:test; npm run test; npm run build; forge build` (the default gate including census, workbench-shell and package-smoke) and in MechanicalWorkflows `npm ci; npm test; forge build` at root plus the member gates, on Node 24.x, recording exact argv, exit codes and producer-read node/SDK versions; any further source change invalidates the acceptance until re-gated, and gates or tests from different commits are a veto.
- **Rationale:** pi-02 P10 (C210 NON-EPISTEMIC); pi-03 section D command block (C258 NON-EPISTEMIC), Node matrix (C268 NON-EPISTEMIC), section H last operation (C289 NON-EPISTEMIC) and veto "tests/gates from different commits" (C286 NON-EPISTEMIC). Premises: Pi defines `lint`, `typecheck`, `typecheck:test`, `test`, `build`, `check` and a `forge.toml` default gate with package-smoke (C211 ESTABLISHED, C259 ESTABLISHED); MW's root `package.json` defines `test` and the repo has a root Forge gate with three member gates (C260 SUPPORTED — runnable in form, not run by the audit; C212 ESTABLISHED); Pi engines `>=24` and the MW rig `>=22.18.0 <25` intersect at Node 24.x (C265 ESTABLISHED, C266 ESTABLISHED, C267 ESTABLISHED) while MW's mise toolchain pins 22.23.2 (K031) — a Node-24 run executes MW outside its own toolchain pin; the audit-side scratch run (build rc=0, 18 selected files) is the audit's evidence, not the program's (K012; C049 SUPPORTED).
- **Acceptance criteria:**
  1. Receipt fields `pi_sha`, `mechanical_sha`, `pi_branch`, `mechanical_branch` equal `git rev-parse HEAD` of the default branches at run time; `mechanical_*_tarball_sha256` are recomputed from a fresh `npm pack` of those trees; the validator refuses the receipt if any gate row's commit differs from these shas.
  2. `commands_and_exit_codes` lists each Section D command with argv and exit code 0 for both repos; the Pi `forge build` row shows the default gate list actually executed (lint, typing, build, test, census, workbench-shell, package-smoke); the MW rows show the root gate and the three member gates.
  3. `node_and_sdk_versions.node` matches `^v24\.` for both repos; other Node/OS rows read `not-run` unless a separate receipt exists; the MW mise pin (22.23.2) is recorded as outside the matrix.
  4. Invalidation: a commit after the receipt's sha on either default branch flips the release status to `stale` in the validator until a new receipt exists (test: add a commit in a temp clone -> validator reports `stale`).
- **Evidence tier target:** V5 (final-tree gates plus the joined V4/V5 rerun).
- **Conditions / unknowns:** the MW run outside its toolchain pin is a recorded caveat, not a blocker.
- **Maps-to:** P10 (sections D/H); B-release (wb-j5y5), MW external-tracker (wb-1zn2); extends EAT-R084, EAT-R171, EAT-R177.

## EAT-R287 — Test runs MUST be separated by claim and native lanes run explicitly; a default green MUST NOT be recorded as native certification

- **Type:** REPRESENTATION
- **Authority:** LINGUISTIC_INTEGRITY
- **Statement:** Release evidence MUST keep six run classes distinct — pure unit/fixture; cross-repo installed consumer; registered tool with fixture callbacks; native registered Claude/Forge; crash/restart; performance — each with its own stored output; the opt-in native lanes and the new registered-Mechanical native/fault lanes MUST be run explicitly with their output stored; a receipt MUST NOT record a green default `forge build` as native-provider or registered-function certification; SDK/CLI versions MUST be read from installed manifests and native envelopes, never typed by hand.
- **Rationale:** pi-03 section D "Separate test runs by claim" (C263 NON-EPISTEMIC); section H veto "misleading Forge PASS" (C286 NON-EPISTEMIC). Premise: the default Pi gate list excludes the declared opt-in lanes (`native-read`, `rf-preview`, `furnace-observe`, `furnace-hosted-live`, `claude-live`, `claude-adverse-live`, `install-smoke`; forge.toml:9 vs the later `[build.commands.*]` blocks) and `vitest.config.ts` excludes native/live tests, so a default green does not exercise native providers (C264 ESTABLISHED); W11 remains planned (C285 ESTABLISHED).
- **Acceptance criteria:**
  1. Receipt `tests[]` rows carry `run_class` in {unit, installed-consumer, registered-fixture, native, crash, performance} and a stored output path; the validator refuses a native or registered claim whose only rows are `unit`.
  2. A receipt with a default-gate `forge build` PASS and no `native` row yields `native_forge_verdict: not-run` and `evidence_level <= V3`; mutant: let the validator read the default gate as native -> red.
  3. `node_and_sdk_versions` values carry a `source` (`node -v`, installed `package.json`, SDK init message, Forge envelope); a hand-typed map without `source` is refused.
  4. The new lanes are declared under `[build.commands.*]` in `forge.toml` and are absent from `[build].gate` (schema test over `forge.toml`).
- **Evidence tier target:** V4 (native lanes); own harness V1.
- **Conditions / unknowns:** native lanes need credentials/binaries; absent -> `BLOCKED`, never PASS (C203 NON-EPISTEMIC norm).
- **Maps-to:** P10 (section D); B-release (wb-j5y5); extends EAT-R085, EAT-R165, EAT-R170.

## EAT-R288 — Script, standalone Agent and detached Claude paths MUST show no regression and no census edits alongside the function route

- **Type:** NEGATIVE_REGRESSION
- **Authority:** NORMATIVE_DECISION
- **Statement:** With the registered Mechanical function route enabled, P10 MUST run the standard script golden fixtures, the standalone Agent path and the detached Claude path (same-machine reattach) and show behavior identical to the pre-function baseline with no dual tool-name collisions; the eight Section D test files and the `test/workbench-observation*.test.ts` set MUST be preserved or extended (never deleted or weakened); new tests MUST live in narrowly named new files; no census list MAY be edited to make a failing test pass — a census acknowledgment adds exactly the new reviewed paths with a recorded reason.
- **Rationale:** pi-02 P10 ("no regressions or dual tool name collisions"; "do not edit a census list to fake a passing test"; C210 NON-EPISTEMIC); pi-03 section D test hygiene (C258 NON-EPISTEMIC, C229 NON-EPISTEMIC); P04 acceptance (C192 NON-EPISTEMIC). Premises: Pi has script golden fixtures and census-tier tests (C213 ESTABLISHED), standalone and detached Claude paths with same-machine reattach plus a Furnace-hosted host module (C214 ESTABLISHED); the eight named test files exist and passed in the audit-side selected run (C261 ESTABLISHED); the observation glob matches nine files (C262 ESTABLISHED); the three regression surfaces are present with tests, and a no-regression result is produced by the tail rather than asserted at the pin (C004 SUPPORTED; M038).
- **Acceptance criteria:**
  1. Golden fixtures: run `test/workflow-examples-claude-backend.test.ts` and the `workflow_execute(kind:script)` fixtures with the function route enabled; normalized results are byte-identical to the baseline run.
  2. Standalone Agent and detached Claude (local-detached launch + connect) smoke runs pass in their existing lanes (`workbench-shell`; `claude-live` where credentials exist) with an unchanged reply dialect; detached reattach returns the same instance identity as before.
  3. Tool registry: no duplicate names (EAT-R270 criterion 1); `workflow_detached`, `workflow_observe` and `workflow_execute` are each registered once.
  4. Census guard: `git diff --name-status <base>..<cut> -- 'test/**/*.census.ts'` shows only additions of reviewed paths, each with a reason line in the receipt; a diff that removes or rewrites an existing census row is refused by the release validator.
  5. File preservation: the eight Section D files and the `test/workbench-observation*.test.ts` set exist at the cut and their test counts are >= the baseline counts (vitest JSON report compare).
- **Evidence tier target:** V1 (fixtures/census) with opt-in V4 lanes for live detached/Claude.
- **Conditions / unknowns:** live lanes are `BLOCKED` without credentials.
- **Maps-to:** P10; B-dispatch (wb-4bxo), B-detached-grants, B-release (wb-j5y5); extends EAT-R013, EAT-R033, EAT-R065, EAT-R167, EAT-R169.

## EAT-R289 — workflow_observe and the existing operator surfaces MUST answer the ten operator questions without guessing, with no success glyph absent current native proof

- **Type:** BEHAVIORAL
- **Authority:** NORMATIVE_DECISION
- **Statement:** For any Mechanical function invocation, `workflow_observe` and Pi's existing inspector/footer/card MUST answer from structured fields: which reviewed function and artifact (descriptor id, digests); which git root, base commit and tree; which evidence and context profile actually executed (the adopted host-owned selector values recorded by the invocation); which agent session and Forge operation; the current stage; whether cancel was requested and whether it was effective; whether effects are uncertain; what can safely be retried; why an HX/RF profile is unavailable; whether the invocation can be reopened after completion/restart — within the byte budget and redaction rules, keeping native ids, gap and stale labels in structured detail when the summary trims, with the UI success glyph never meaning native Forge PASS without current proof, and the invocation addressable by its Pi logical invocation id for its whole lifetime.
- **Rationale:** pi-03 section F paragraphs 1-2 (C272 NON-EPISTEMIC, C273 NON-EPISTEMIC); P05 exit (C196 NON-EPISTEMIC). Premises: Pi has generic workflow inspector/card/fleet UI, bounded observe replies (1024..65536 byte caps) and redaction (C274 SUPPORTED; C198 SUPPORTED — reusable generic surfaces whose function-native details must be added and verified); `evidenceProfile`/`contextProfile` are proposed ABI fields that no executed invocation records at the pins (C275 REFUTED as a present fact; permitted wording: after adoption and live execution Pi must report the values actually used; M018; K019); P05 edit surfaces exist (C197 ESTABLISHED) — note pi-01's `src/workbench/observe-tool.ts` does not exist; the real modules are `observation.ts`, `observe-query.ts`, `src/index.ts:2933` and `control-tool.ts` (K022/M020).
- **Acceptance criteria:**
  1. Through ORACLE-REG then `workflow_observe(invocationId)`: the structured detail contains non-null `definition {id, digest}`, `artifact {descriptorId, descriptorSha256, tarballSha256}`, `source {root, baseCommit, baseTree}`, `profiles {evidence, context}` (adopted names; values as executed), `nativeRefs {session, operation}`, `phase`, `cancel {requested, effective}`, `effect`, `retry {safe, reason}`, `profileUnavailable {reason}` when applicable, and `reopenable: true`.
  2. Byte budget: at the smallest cap (1024) the summary trims but the structured detail still carries `nativeRefs`, `observation.gap` and `freshness` (presence asserted after truncation).
  3. Glyph: rendering the card/inspector for `{forge.verdict: PASS, freshness: stale}` and for `{execution: settled, forge.verdict: unknown}` shows no success glyph; `{PASS, current}` shows it.
  4. Addressability: after the originating turn ends and after a process restart, `workflow_observe(invocationId)` resolves (EAT-R275 criterion 2).
  5. Negative regression for C275 REFUTED: a doc sentence stating that profiles "actually executed" are reported is admitted only when the P05 receipt shows field set (1) populated from a live run.
  6. Mutant: derive the glyph from `execution === settled`; (3) turns red.
- **Evidence tier target:** V5 (UX trials) over V3 fixtures.
- **Conditions / unknowns:** adopted profile field names (P00/M00).
- **Maps-to:** P10 (section F) and P05; B-observe, B-outcomes (wb-9a1o); extends EAT-R051, EAT-R052, EAT-R077, EAT-R156.

## EAT-R290 — Ten agent LX scenarios MUST run from the installed README/AGENTS/skill alone and be scored for real commands

- **Type:** VERIFICATION
- **Authority:** EVIDENCE_ACQUISITION
- **Statement:** P10 MUST run the ten agent LX scenarios — (1) distinguish script from function, (2) discover the current registered command, (3) refuse a wrong grant, (4) recognize an artifact mismatch, (5) interpret each of the four domain states, (6) inspect native Forge source, (7) cancel a running writer safely, (8) reconcile unknown after restart, (9) choose Git/plain versus HX/RF, (10) explain Furnace ownership — with the agent given only the installed `README.md`, `AGENTS.md` and `.agents/skills/pi-mechanical-interop/SKILL.md`; each scenario MUST be scored on whether every named command or tool exists at the cut and whether any unshipped API was invented; failures MUST be fed into the skill/help and tests in the same implementation cut.
- **Rationale:** pi-03 section F paragraph 3 (C276 NON-EPISTEMIC); pi-02 P10 (C210 NON-EPISTEMIC). Premises: `README.md`, `AGENTS.md` and the interop skill exist at the pin, and their sufficiency for the ten scenarios is untested (C277 SUPPORTED; permitted wording); at b085c34e they were rewritten to point at this program with still no function branch (drift note on C277); the four domain states are the MW outcome union (C244 ESTABLISHED).
- **Acceptance criteria:**
  1. Harness: for each scenario a fresh agent context loads only the three files (asserted by the harness file allowlist) plus the registered tool list; the transcript is stored at the receipt path.
  2. Scoring: each command/tool/API token in the transcript is checked against the registered tool names and the `bin`/script surface at the cut; `score = {exists: n, invented: m}`; `invented > 0` or an answer resting on a non-existent command -> scenario FAIL.
  3. Scenario 5 requires naming all four variants (string match against the C244 set) and not calling `needs_evidence` or `indeterminate` failures.
  4. Scenario 9 and 10 answers must not claim HX/RF or Furnace hosting is shipped unless the respective receipt exists (cross-check against receipts).
  5. Same-cut loop: a scenario FAIL produces a skill/help edit and a test in the same cut (receipt links both); the validator refuses a P10 receipt carrying an unresolved scenario FAIL.
- **Evidence tier target:** V5 (UX trials).
- **Conditions / unknowns:** scenarios 6-8 need P05/P06 features and a fixture or native run; until then they are `BLOCKED` naming the missing packet.
- **Maps-to:** P10 (section F); B-release (wb-j5y5), B-docs (wb-12x1); extends EAT-R082, EAT-R167, EAT-R177.

## EAT-R291 — Per-cut receipts MUST follow one adopted schema with a declared join key, encoded evidence level and no fabricated identities

- **Type:** REPRESENTATION
- **Authority:** NORMATIVE_DECISION
- **Statement:** Every P07-P10 cut in either repository MUST emit a receipt carrying at least: program, phase/packet, evidence level, status (PASS | FAIL | BLOCKED | NOT_RUN), both source shas and branches, saved-definition digest, descriptor sha256, library (and, if ruled, rig) tarball sha256, producer-read node/SDK versions, source base and candidate commit/tree, Forge manifest sha256, observed-or-null Pi invocation / Claude session / Forge operation ids, native Forge verdict (PASS | FAIL | partial | unknown | not-run), the original Mechanical outcome object or `absent`, execution status, effect disposition, freshness (current | stale | unknown), exact argv and exit codes, test rows, mutant rows, performance (measured or not-run) and limits/unknowns; the joint gate MUST join Pi and MW receipts only through one adopted schema or a declared join key plus field map and a published V-to-L tier map; every gate label MUST encode its evidence level; native ids MUST be observed or null, never fabricated; `PARTIAL` MUST never be reported as PASS; outputs MUST be stored at bounded reproducible paths.
- **Rationale:** pi-03 section G (C278 NON-EPISTEMIC, C279 NON-EPISTEMIC); packet receipt template (C219 NON-EPISTEMIC); acceptance hierarchy (C223 NON-EPISTEMIC). Premise defects routed here: the Pi and MW receipt skeletons share no join key and differ in program identifiers (four distinct program ids), tier vocabulary (V vs L, inverted at tier 3) and most field names (C278 permitted wording; K009/M026; K010/M021 with C147 SUPPORTED after arbitration and the C223 permitted wording); `PI-FUNCTION-REGISTERED` names two evidence levels (K006/M025); `MW-PI-NATIVE-LIVE` is defined by no MW document or repository (C205 REFUTED; K001/M013); both binding proposals pin library bytes only (K029; C114 NON-EPISTEMIC); the historical `docs/workbench/TRACEABILITY.md` exists at the pin and is classified by the validator as a record not to overwrite (C280 ESTABLISHED).
- **Acceptance criteria:**
  1. JSON-schema test: a receipt missing any listed key fails validation; `native_*_id` fields accept only `null` or an id with a `source` reference to a producer-native read; an id lacking `source` is refused.
  2. Join test: given one Pi and one MW receipt for the same joint event, the join resolves them by the declared join key (for example `pi_invocation_id` + `candidate_tree`) and maps each MW field through the published field map; an unmapped field or an unmapped tier (`L3` / `V3`) is reported `unjoinable`, never silently dropped.
  3. Tier map: the published V-to-L map is a checked-in table; a test asserts V2=L2, V4=L4, V5=L5, V6=L6 and that V3 and L3 are explicitly marked disjoint.
  4. Labels: every gate label in receipts matches `^[A-Z0-9-]+-(V[0-6]|L[0-6])$`; a bare `PI-FUNCTION-REGISTERED` is refused; a label outside the adopted label set (for example `MW-PI-NATIVE-LIVE` until ratified) is refused.
  5. `status: PASS` with any test row `partial` is refused (PARTIAL never PASS).
  6. Paths: every `commands_and_exit_codes[*].output_path` resolves under the receipt's bounded root (`docs/workbench/receipts/<bead>/`), never under `TRACEABILITY.md`.
- **Evidence tier target:** V1 (schema/validator tests) applied to V2-V5 receipts.
- **Conditions / unknowns:** the adopted schema, join key, field map, tier map and label set are P00/M00 rulings (M013, M021, M025, M026); until ruled the join reports `unjoinable` and the joint gate cannot PASS.
- **Maps-to:** P10 (section G) and P00; B-release (wb-j5y5), MW external-tracker (wb-1zn2); extends EAT-R086, EAT-R087, EAT-R165, EAT-R170, EAT-R173.

## EAT-R292 — The release validator MUST be used only as an evidence validator and its PASS MUST never be recorded as a native function call

- **Type:** REPRESENTATION
- **Authority:** LINGUISTIC_INTEGRITY
- **Statement:** `qa/workbench/mwi-release.mjs` and `test/workbench-mwi-release.test.ts` MUST be used to validate receipts, cut text and git state only; no receipt, doc, skill line or W11 cell MAY cite a validator PASS or a passing release test as evidence of a registered function launch or native provider behavior; the validator MUST refuse any W11 or slice status upgrade whose cited witnesses lack the joined V4 and V5 receipts of EAT-R277 and EAT-R278..R285.
- **Rationale:** pi-03 section G last sentence (C283 NON-EPISTEMIC); section H "release-validator PASS" as one required item among many (C284 NON-EPISTEMIC). Premises: the validator and its test exist at the pin (C281 ESTABLISHED) and are pure-node receipt/cut/git readers that do not invoke the Mechanical function or any native provider (C282 ESTABLISHED: imports limited to node `child_process`/`fs`/`path`/`url`, spawn sites `git` only); its W11 readers hold the status vocabulary (C285 ESTABLISHED).
- **Acceptance criteria:**
  1. Static: the validator's import closure contains no `@mechanical/*` specifier and its spawn sites invoke only `git` (detection model: AST import census of the module plus spawn-argument capture in the test).
  2. Behavioral: a receipt set with a validator PASS but without V4/V5 receipt rows -> the validator reports W11 `planned`/not-shipped and refuses the upgrade; with the joined rows -> it allows.
  3. Docs check: any sentence in README/AGENTS/skill/feature-matrix whose subject is the validator and whose predicate asserts "native", "live", "launched" or "shipped" is flagged (sentence-level regex over the named files; the hits are listed in the receipt).
  4. Mutant: let the validator accept `mwi-release PASS` as a V4 witness; (2) turns red.
- **Evidence tier target:** V1.
- **Conditions / unknowns:** none.
- **Maps-to:** P10 (sections G/H); B-release (wb-j5y5); extends EAT-R082, EAT-R165, EAT-R166.

## EAT-R293 — W11 and program documentation MUST state only receipt-backed, dated status and keep historical notes historical

- **Type:** REPRESENTATION
- **Authority:** LINGUISTIC_INTEGRITY
- **Statement:** The W11 row of `docs/workbench/feature-matrix.md`, the interop skill, `README.md`/`AGENTS.md` and `docs/workbench/mechanical-function-hosting.md` MUST change W11's status only in a cut that carries the joined producer/native receipt and a release-validator PASS; older feature-matrix notes MUST remain as dated history with new dated current evidence added beside them; docs-only cuts MUST leave W11 unchanged; stale or refuted prior audit defects MUST NOT be repeated as current; a general-purpose orchestration registry MUST NOT be listed as a later-enableable non-veto; skill, README and operator commands MUST land in the same cut as the implementation they describe.
- **Rationale:** pi-02 P10 (C210 NON-EPISTEMIC) and program controls (C160 NON-EPISTEMIC); pi-03 section H vetoes "stale/refuted audit defects repeated as current" and "W11 set to landed solely by docs" (C286 NON-EPISTEMIC) and non-vetoes (C288 NON-EPISTEMIC; permitted wording excludes the registry — K011/M028, with C106 NON-EPISTEMIC and C141 NON-EPISTEMIC rejecting a generic registry); pi-README's reconciliation promise (C026 REFUTED on its run-abort conjunct: no earlier program called the recheck absent — K014/M001; C287 ESTABLISHED: the worktree false-clean and detached empty-grant findings are historical at 8e2fedeb); the program's evidence footer (C049 SUPPORTED; C221 UNDETERMINED: the "no commands executed" self-report is unverifiable from the repo and stays UNDETERMINED, M015). Premises: W11 exists as `planned` (bead blocked) with validator-recognized vocabulary (C285 ESTABLISHED; C155 ESTABLISHED; C046 ESTABLISHED); the documentation surfaces exist (C161 ESTABLISHED); the prior W11 row carries two trunk ids for one re-measurement (K025) — cite its status cell, never a trunk id.
- **Acceptance criteria:**
  1. Validator rule: a diff touching the W11 status cell is accepted only when the same cut adds receipt paths with `evidence_level: V4` and `V5`, `status: PASS`, and the validator's own PASS; otherwise the cut is refused (docs-only -> W11 unchanged, EAT-R167).
  2. History preservation: the prior W11 evidence lines (including the 2026-11-06 re-measurement text) remain byte-present after the upgrade cut; new evidence lines carry an ISO date and a receipt path.
  3. Stale-defect guard: a docs check flags sentences that state the worktree false-clean, detached empty-grants or missing run-abort-recheck defects as present (allowlist: sentences marked "historical", "fixed" or "before 8e2fedeb"); the C287 items seed the list.
  4. Non-veto list: the section H non-veto enumeration in program docs and skill does not list "general-purpose orchestration registry" as later-enableable (string check), or carries the M028 annotation marking it rejected.
  5. Same-cut rule: every cut that changes `src/workbench/**` for the function route also changes, or marks unchanged with a reason, the skill, README and operator examples (EAT-R167 file list); receipt-linked.
  6. Footer truth: the program footer's "no commands were executed" sentence remains attributed to the author and is not restated as audited fact until an authoring transcript exists (C221 UNDETERMINED).
- **Evidence tier target:** V1 (validator/docs checks) gating V4/V5 claims.
- **Conditions / unknowns:** the pin advance for the 33 deferred annotation inserts is an owner decision (REMEDIATION.md); this requirement governs new or changed wording, not the pinned bytes.
- **Maps-to:** P10 (section H) and docs; B-docs (wb-12x1), B-release (wb-j5y5); extends EAT-R082, EAT-R087, EAT-R147, EAT-R167.

## EAT-R294 — W11 MAY be marked shipped only when every required item is receipt-backed and no veto predicate fires

- **Type:** NORMATIVE_DESIGN
- **Authority:** NORMATIVE_DECISION
- **Statement:** The W11 promotion gate MUST be an executable predicate over receipts that requires all of: an adopted versioned ABI/grant (joint conformance receipt); the production registered function branch; an independently installed real producer artifact (V2, EAT-R271); positive and failing admission controls including no-import (EAT-R266..R270); the four original outcomes through Pi (EAT-R273); native Claude/Forge joint PASS plus FAIL and unknown (EAT-R277); native ids matched to source and Pi invocation; conservative cancellation and replay after fault (EAT-R279..R282); bounded resource tests (EAT-R284); script/Agent/detached regressions (EAT-R288); operator inspection (EAT-R289); current README/AGENTS/skill/source examples (EAT-R290, EAT-R293); Forge complete gates on the final landed sha (EAT-R286); and release-validator PASS (EAT-R292). It MUST fail when any veto fires: function launch still reports unsupported; only a script/CLI/helper path works; stale or refuted defects repeated as current; model-supplied code, rights or host profile honored; misleading Forge PASS; missing candidate or tree; an unknown effect retried; destructive worktree cleanup; incorrect status collapse; no observer; tests or gates from different commits; unmeasured but claimed cost/load; W11 set to landed solely by docs. Absence of HX task scope, RF committed context, remote fleet, pure coordination/GP execution or Furnace Run/Attempt MUST NOT block v1.
- **Rationale:** pi-03 section H required list, vetoes and non-vetoes (C284 NON-EPISTEMIC, C286 NON-EPISTEMIC, C288 NON-EPISTEMIC); pi-03 preamble (C220 NON-EPISTEMIC, C222 NON-EPISTEMIC); pi-02 header: W11 may graduate only under the P08-P10 gate (C155 ESTABLISHED). Premises: at the pin the registered tool reports `function` unsupported, so veto (a) fires today (C234 ESTABLISHED; C150 ESTABLISHED); W11 is planned/blocked (C285 ESTABLISHED); some prior audit defects are historical (C287 ESTABLISHED); the reconciled documents still carry obsolete present-tense descriptions (C047 ESTABLISHED), which the program supersedes without deleting histories or authorizing false closure (C048 NON-EPISTEMIC).
- **Acceptance criteria:**
  1. Gate function `w11Promotion(receipts) -> {allowed, missing[], vetoes[], deferred[]}` is table-tested: all required receipts present and no veto -> `allowed: true`; removing any single required receipt -> `allowed: false` with that item in `missing`.
  2. Each veto is an executable check with its own fixture: (a) registered tool reply `unsupported` for `kind:function`; (b) only script/CLI/helper receipts (no V3+ registered row); (c) the EAT-R293 stale-defect flag; (d) an A14 failure; (e) PASS projected with `freshness: stale` or from exit-0/native-FAIL; (f) null candidate commit/tree on a PASS; (g) `retryPermitted` on `unknown`; (h) a reachable force-removal path; (i) a B03/B04 status collapse; (j) no `workflow_observe` row; (k) differing shas across gate rows; (l) a numeric budget without measurement citation; (m) the W11 cell changed in a docs-only cut — each fixture makes `vetoes[]` non-empty.
  3. Non-veto test: receipts lacking HX/RF/fleet/coordination/Furnace rows with everything else present -> `allowed: true` and those items listed under `deferred`, not `missing`.
  4. Running the gate against the pin's state (8e2fedeb receipts) returns `allowed: false` with veto (a); the pre-implementation red is preserved (C225 NON-EPISTEMIC).
  5. Mutant: drop veto (k); the mismatched-sha table row passes falsely -> red.
- **Evidence tier target:** V5 (consumes V2-V5 receipts); own harness V1.
- **Conditions / unknowns:** the gate consumes the P00/M00 rulings (ABI, grant, label set, join key) as inputs and cannot pass before they exist; the DAG ordering conflict (C164 CONTESTED; K005/M007) does not change the gate predicate but determines when its inputs can exist.
- **Maps-to:** P10 (section H); B-release (wb-j5y5); extends EAT-R082, EAT-R085, EAT-R165, EAT-R166, EAT-R167.

---

## Cluster notes

- Count: 30 requirements, EAT-R265..EAT-R294, sequential. Authorities: NORMATIVE_DECISION 12 (R265, R272, R273, R275, R276, R278, R282, R286, R288, R289, R291, R294); RISK_CONTROL 9 (R266, R267, R268, R269, R270, R274, R279, R280, R283); EVIDENCE_ACQUISITION 5 (R271, R277, R281, R284, R290); LINGUISTIC_INTEGRITY 4 (R285, R287, R292, R293); EMPIRICAL_REPAIR 0 — the one witnessed code defect touching this scope (wb-9v02, C088 ESTABLISHED / C089 permitted wording) is owned by cancel-repro/P06 (EAT-R160) and appears here only as a condition on EAT-R279 row 4.
- REFUTED premises compiled only as negatives/conditions: C239 (R271 criterion 2), C204/C218 (R276 criterion 3), C275 (R270 condition; R289 criterion 5), C205 (R277, R291 label set), C166 (R277 condition), C176 (R280 criterion 1 asserts bytes on disk, not in the result), C075 (R280 criterion 6 as a planned entry, not a present fact), C201 (R283 forbids adding a scheduler; never "verify none exists"), C026/C287 (R293 criterion 3), C089 (R279/R281 name wb-9v02 and the host-death gap instead of an "untested" framing).
- UNDETERMINED premises compiled to acquisition/preservation: C089 host-death member -> R281 criterion 5; C221 -> R293 criterion 6 (preserved, not resolved).
- CONTESTED: C164 (DAG order) is recorded as a condition on R294 only; no requirement here chooses a side.
- Open P00/M00 rulings these requirements depend on (not audit inventions; the program's own planned gates): action-grant spelling (R267), lease owner (R269), rig-bytes hash axis (R266, R271), host-subpath spelling (R271), selector vocabulary (R270, R276, R289), receipt schema/join key/field map/tier map/label set (R277, R291), producer key for reconciliation reads (R280).

# Atomic requirements — Optional Operations

Phase 10 shard `r-optional-ops`, EAT-R295..EAT-R310, compiled 2026-11-09 for `mechanical-native-interoperability-2026-11-09` (Pi-subagents). These are implementation/test specifications, NOT_RUN; no tests, builds, native launches, repository edits or Beads writes are claimed by this compilation.

## Substrate and interpretation

- Normative sources: deposited `pi-02-IMPLEMENTATION-PACKAGES.md` (Program controls, P00, P10–P12, packet template) and `pi-03-VERIFICATION-AND-RELEASE.md` (V0–V6 hierarchy, red-first, B/C, F/G/H), at document pin Pi `b085c34e`. `pi-README`/`pi-01` and MW sibling docs at `7f3809fd` supply scope/authority context only.
- Empirical rationales use FINAL `CLAIMS.jsonl` statuses graded at environment Pi `8e2fedeb` / MW `62a10b59`, with `CONTRADICTIONS.md` and `REMEDIATION.md`. Claim scope/time travel with each rationale. No plausible risk is asserted observed; no numeric confidence is manufactured. All positive future implementations derive from explicit program norms/proposals, not REFUTED premises.
- Registered-path oracle: actual `workflow_execute` / `workflow_observe` tool objects captured from `src/index.ts` registration (C236 NON-EPISTEMIC, C237 ESTABLISHED), joined by the same Pi invocation. Optional coordination uses its actually registered callable plus observation. A direct helper or `develop()` fixture is only an additional control. No nonexistent `observe-tool.ts` edit path is prescribed (M020).
- Optional P11/P12 do not block first Git/plain W11; native extension certification is V6, detached cross-process recovery is V5. The proposed ABI/profile identifiers await joint adoption. K019 REFUTED existing-profile claims stay refuted; no current executable switch is inferred.
- Existing-group labels are the earlier 25-group BEAD-PLAN, not invented issue IDs. Bead IDs below were read from pinned exports (environment and doc-commit tree) only, NOT live bd. Re-pin at filing. `wb-0gbh` was in-progress at the environment pin and closed at the doc-commit tree, where an observation-only component is present with installed-consumer leg partial; its production registration is not established. `wb-j5y5`, `wb-12x1` and `wb-f3wd` are historical closed carriers, not asserted open work. Parent must reconcile current status and attach remaining cuts without a second namespace.
- Sibling overlap is explicit: R202 owns historical classification; R226/R227 exact detached/SDK grant guards; R216/R257 SDK-child death; R258 no-duplicate-scheduler boundary; P08–P10 tail owns mandatory test acquisition and final gate execution. This shard supplies optional extension behaviors and program-wide custody/truth policies. All prior IDs are **extended**, not renumbered or silently closed. Map rows use one primary packet/group; prose lists secondary groups and current compiled dependencies.

## EAT-R295 — Detached functions bind immutable launch snapshots

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The optional detached Mechanical function host MUST execute only the immutable host-authorized source/artifact/config snapshot admitted for its registered invocation.
- Rationale: pi-02 §P11 proposes first-class detached function hosting, not a script wrapper. C214 establishes existing detached script/reattach paths, not function support; C073 only supports the closed script-only boundary at the environment pin. The exact grant guard is already EAT-R226; this row adds immutable detached function execution, not a second grants repair. Audited basis (FINAL): C215 NON-EPISTEMIC, C214 ESTABLISHED, C073 SUPPORTED, C118 NON-EPISTEMIC, C231 NON-EPISTEMIC, C236 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert the actual registered workflow_execute(kind:function, hostMode:detached) tool captured from src/index.ts launches one independently installed reviewed host, with a snapshot digest binding source commit/tree, descriptor, both executable package hashes and effective host configuration; workflow_observe returns the same invocation and snapshot identity.
  2. Assert independently changing source, artifact or configuration after admission causes refusal/stale re-admission before writer launch, never silently executing new bytes under the old identity; snapshot values cannot originate from authority-bearing model fields.
  3. Assert missing workbench:detach or an independent SDK invoke/tool right produces zero detached starts or SDK queries; an authorized positive uses one first-class function launch, not node(), script VM or direct develop() acceptance.
  4. Assert replacing snapshot validation with a mutable live-config read makes the single-change registered-path test red.
- Evidence tier target: V5 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P11, after P08–P10 and jointly adopted installed ABI. R226/R227 remain prerequisites; live detached recovery claims require witnessed V5, not existing script fixtures.
- Maps-to: P11; B-detached-function; pinned Beads lineage: wb-zswl; B-detached-grants/wb-wupg as preserved prerequisite; extends EAT-R064, EAT-R066, EAT-R226, EAT-R227. Prior text/history remains intact.

## EAT-R296 — Detached reconnect preserves identity and launch uncertainty

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The optional detached function reconnect path MUST preserve its original invocation/host identity and unknown-start state across disconnect or lost start acknowledgment without launching a replacement.
- Rationale: pi-02 §P11 and pi-03 §C require child-kill, lost-start-ack and reattach tests. Existing script reattach (C214) and process-local identity modules (C096) do not establish detached function recovery; C257 supports only selected recovery forms. Recovery oracle C254 is a norm, not proof that a producer lookup succeeded. Audited basis (FINAL): C215 NON-EPISTEMIC, C214 ESTABLISHED, C140 NON-EPISTEMIC, C252 NON-EPISTEMIC, C254 NON-EPISTEMIC, C096 ESTABLISHED, C257 SUPPORTED, C236 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a registered detached function launched once remains observable by its original Pi invocation and provider-qualified host-instance identity after the initiating Pi turn exits and a new authorized client reconnects.
  2. Assert disconnect after child start but before handshake returns launch-unknown with original identity/recovery guidance and start count one; reconnect performs readback, not another host start.
  3. Assert child death during observation produces stale/unknown until native readback, retains candidate/journal evidence, and never relabels a cached event current; PID reuse, wrong owner or host-instance mismatch refuses control with zero commands sent.
  4. Assert a mutant trusting PID alone or retrying a lost handshake is killed by identity or start-count assertions, with a no-fault positive reconnect control.
- Evidence tier target: V5 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P11; test in separate client/host processes. Does not claim resurrection of a dead SDK or preservation of its JS stack. Native absence must be positively witnessed before newly authorized dispatch.
- Maps-to: P11; B-detached-function; pinned Beads lineage: wb-zswl; B-observe/wb-upad and B-effects/wb-mwsy dependencies; extends EAT-R065, EAT-R066, EAT-R067. Prior text/history remains intact.

## EAT-R297 — Furnace owns durable function lifecycle decisions

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The optional Furnace integration MUST delegate durable Run/Work/Attempt scheduling, retry and pause/stop decisions to the actual Furnace producer rather than a Pi function scheduler.
- Rationale: pi-02 §P11 assigns these authorities to Furnace. C035 supports the existing optional adapter and absence of declared Pi Run/Work/Attempt records only within its detector; it does not prove global absence of scheduling. C216 supports absence of runs.ensure in the inspected SDK/upstream surface, not all future releases. C201 REFUTED the audit’s single-scheduler gloss (K018/M011); this is a do-not-add boundary, never a verify-no-Pi-scheduler claim. Audited basis (FINAL): C215 NON-EPISTEMIC, C035 SUPPORTED, C105 NON-EPISTEMIC, C140 NON-EPISTEMIC, C255 NON-EPISTEMIC, C216 SUPPORTED, C201 REFUTED.
- Acceptance criteria:
  1. Assert registered function execution under Furnace joins a producer-returned Run, Work and Attempt to one Pi invocation; IDs are read from Furnace envelopes/admission, never constructed from a Pi counter.
  2. Assert ambiguous starts and duplicate resume requests make no second Pi runs.start and no Pi-owned Attempt retry; native Furnace policy determines any later Attempt. Authorized pause/stop names the exact native target and preserves actual effects/domain independently.
  3. Assert code/API conformance for the new adapter uses only methods verified in the pinned installed Furnace version; unsupported APIs produce a named blocker, never a runs.ensure shim or fictitious run wait command.
  4. Assert adding a Pi durable retry loop or fabricating an Attempt ID breaks the one-Attempt/native-ref tests; existing Pi schedulers are not deleted or declared absent.
- Evidence tier target: V6 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P11; producer callback/export and Furnace API must be independently installed and witnessed. consumes EAT-R258 boundary, does not duplicate its source census. Future API additions require fresh version evidence.
- Maps-to: P11; B-furnace-function; pinned Beads lineage: wb-dlc6; MW-owned gate tracker wb-1zn2; extends EAT-R068, EAT-R069, EAT-R070, EAT-R092, EAT-R258. Prior text/history remains intact.

## EAT-R298 — Witness Furnace function faults at the native boundary

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The optional Furnace function delivery MUST acquire producer-native fault evidence for lost start acknowledgment, controller liveness and duplicate Attempt prevention before claiming durable function support.
- Rationale: pi-02 §P11 explicitly requires these experiments; pi-03 §C and acceptance hierarchy reserve provider-specific extensions for V6. C096 establishes that process-local seams do not prove cross-host replay or durable lease recovery; C257 only supports bounded existing tests. This is acquisition of prospective operational proof, not an EMPIRICAL_REPAIR or an assertion that Furnace currently loses Attempts. Audited basis (FINAL): C215 NON-EPISTEMIC, C035 SUPPORTED, C096 ESTABLISHED, C257 SUPPORTED, C255 NON-EPISTEMIC, C223 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert native V6 receipts from the actual registered Pi function route contain installed Furnace version, real controller/Run/Work/Attempt refs, Pi invocation, installed Mechanical package identity, input, candidate and journal snapshots.
  2. Assert separate controlled faults drop start acknowledgment, kill/disconnect the controller, and repeat a reconcile/resume event; native Run/Attempt lookup determines occurred/not-occurred/unknown and no duplicate Pi-created Attempt appears.
  3. Assert a healthy-controller positive and failure/indeterminate controls distinguish controller liveness, Run terminal state and original Mechanical result; inability to read the producer records BLOCKED/unknown, not recovery PASS.
  4. Assert a duplicate-start or synthetic-ref mutant fails the receipt join/Attempt-count oracle; fixture-only fault runs remain V3/V5 and cannot satisfy this native V6 gate.
- Evidence tier target: V6 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P11. Native credentials/controller unavailable means BLOCKED; no effectful load on shared source. SDK-child death is separately EAT-R216/R257; this row tests Furnace controller/Attempt custody.
- Maps-to: P11; B-furnace-function; pinned Beads lineage: wb-dlc6; MW-owned gate tracker wb-1zn2; extends EAT-R068, EAT-R069, EAT-R092. Prior text/history remains intact.

## EAT-R299 — Enable HX scope only from native task proof

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The optional certified HX evidence profile MUST admit a writer only from terminal producer-native task/revision/query/coverage proof matching that invocation.
- Rationale: pi-02 §P12 and pi-03 §B13 make higher evidence upstream-gated; HX owns its scope/coverage, not Pi. C204 REFUTED an existing-code interpretation of the proposed selectors (K019/M012); this row derives prospective admission from C217/C116, not from that false premise. Earlier HX probe remains historical and is not version-wide absence evidence. Audited basis (FINAL): C217 NON-EPISTEMIC, C105 NON-EPISTEMIC, C243 NON-EPISTEMIC, C116 NON-EPISTEMIC, C204 REFUTED, C223 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert the registered workflow_execute/observe oracle, after selector adoption, admits one certified-profile positive only when task digest, source revision, query identity, terminal coverage and producer-native version/ref all match; observed profile equals the host-selected adopted value.
  2. Assert partial/unknown coverage, unlicensed known-empty, wrong task/query/revision, missing witness or Git filesystem census substituted as task proof stops before SDK writer or Forge call and exposes needs_evidence/refusal with a precise producer blocker.
  3. Assert a model-supplied profile or completeness flag cannot activate certified HX; a valid independently authorized Git/plain invocation remains available when this producer gate is unavailable.
  4. Assert the completeness-check or revision-match mutant turns red through the same registered tool; V6 certification needs a fresh installed native probe, not doc agreement or a historical probe.
- Evidence tier target: V6 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P12, after joint selector adoption and fresh installed HX witness; C204 stays REFUTED, no existing hx-task-scope-v1 executable selector is presumed.
- Maps-to: P12; B-hx-admit; pinned Beads lineage: wb-pxvv; B-hx-evidence/wb-f3wd history; MW tracker wb-1zn2; extends EAT-R057, EAT-R058, EAT-R059, EAT-R063, EAT-R163. Prior text/history remains intact.

## EAT-R300 — Enable RF context only from committed provenance

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The optional committed RF context profile MUST reject context lacking producer-native committed render provenance and replay identity bound to the current invocation source.
- Rationale: pi-02 §P12 requires real render ID/model/graph/source/budget/actor and replay identity, never a no-commit preview. C218 REFUTED rf-committed-v1 as an existing runtime identifier (K019/M014), so this is an adopted future profile gate, not activation of a shipped switch. RF owns committed-render truth; Pi cannot create it from invocation IDs. Audited basis (FINAL): C217 NON-EPISTEMIC, C218 REFUTED, C105 NON-EPISTEMIC, C243 NON-EPISTEMIC, C116 NON-EPISTEMIC, C139 NON-EPISTEMIC, C223 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a registered function positive round-trips producer-native committed render ID, model, graph revision/digest, source/task identity, workspace/actor, budget and same-key replay identity, and workflow_observe reports the actually adopted host-selected context profile.
  2. Assert null/synthetic render ID, no-commit preview, wrong actor/workspace/source, missing budget/model/graph witness or stale replay basis produces zero writer/gate calls and a typed context evidence refusal.
  3. Assert same-key matching-source replay retains the original committed render identity rather than silently committing again; changed source or dependency axis denies cached context reuse.
  4. Assert preview-to-commit promotion and dropped-provenance mutants fail; an unavailable RF producer leaves committed-profile status BLOCKED without disabling an independently authorized plain-context run.
- Evidence tier target: V6 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P12; host-selected selector awaits adoption. Native committed RF API and replay evidence must be witnessed; unrun replay/concurrency forms remain named unknowns.
- Maps-to: P12; B-rf-admit; pinned Beads lineage: wb-669r; MW tracker wb-1zn2; extends EAT-R060, EAT-R061, EAT-R062, EAT-R063, EAT-R091. Prior text/history remains intact.

## EAT-R301 — Coordination exposes only one pinned read-only contract

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The optional coordination callable MUST expose only the separately allowlisted schema-pinned pure Mechanical export under its own host-held read-only grant.
- Rationale: pi-02 §P12 requires a separately allowlisted read-only function; pi-03 §B12 requires non-authoritative output. C040 NON-EPISTEMIC carries K024/M022 drift: at b085c34e an observation-only component landed for wb-0gbh with installed-consumer leg explicitly partial, imported by no production module. That doc-commit fact is not environment-pin function hosting and does not justify another from-scratch bead. Audited basis (FINAL): C217 NON-EPISTEMIC, C040 NON-EPISTEMIC, C105 NON-EPISTEMIC, C106 NON-EPISTEMIC, C236 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a fresh external packed consumer imports exactly the producer’s pinned coordination descriptor/schema/export and invokes valid serialized data under the ratified separate read-only right; unknown export, modified descriptor/schema or absent/right-forged grant refuses before export call.
  2. Assert production acceptance uses an actually registered callable tool captured from src/index.ts, with matching observation identity; the existing direct invokeMechanicalCoordination fixture alone is recorded component-level, not registered installed acceptance.
  3. Assert input module/URL/callable/provider-handle injection never opens another export or provider import; a mutant allowing an arbitrary export or substituting the development write grant makes the admission test red.
- Evidence tier target: V3 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P12; reconciliation must inspect wb-0gbh/wb-ub94 and exact landed component before filing the remaining installed/registered leg. V2 external package witness prerequisite; separate native profile certification is not implied.
- Maps-to: P12; B-coordination; pinned Beads lineage: wb-0gbh and wb-ub94 are historical carriers; remaining cut must reuse their lineage, not invent a live status; extends EAT-R071, EAT-R093. Prior text/history remains intact.

## EAT-R302 — Coordination proposals confer no effect authority

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The optional coordination result MUST remain advisory observation and MUST NOT itself claim/close Beads, schedule a Furnace Attempt or grant Forge gate credit.
- Rationale: pi-02 §P12 and pi-03 §B12 explicitly prohibit authority from coordination scores; tool authorities remain independent under C105. C040’s doc-commit partial component is no evidence of installed runtime effects or policy authorization. This row is an independent non-effect property, separate from R301 schema/import admission. Audited basis (FINAL): C217 NON-EPISTEMIC, C105 NON-EPISTEMIC, C243 NON-EPISTEMIC, C040 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a registered coordination invocation returning a proposal naming Beads claim/close, Furnace scheduling or Forge PASS retains the proposal in observation and calls each counted provider effect handle zero times.
  2. Assert even when the host separately holds effect grants, the proposal or numeric score alone changes no Beads state, creates no Attempt and supplies no current native gate credit; a distinct authorized resolver is outside this callable.
  3. Assert the auto-execute-policy-output mutant causes a nonzero provider count and fails; valid empty/no-action proposal provides a positive control with the same zero-effect oracle.
- Evidence tier target: V3 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Optional P12; test counts include deferred work through a bounded quiescence window. This does not certify arbitrary transitive code beyond the reviewed pinned contract.
- Maps-to: P12; B-coordination; pinned Beads lineage: wb-0gbh/wb-ub94 historical component; real remaining bead resolved at filing; extends EAT-R072. Prior text/history remains intact.

## EAT-R303 — Optional extensions are not first Git/plain release blockers

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The first Git/plain W11 release decision MUST NOT fail solely because P11/P12 optional detached/Furnace/HX/RF/coordination or remote-fleet evidence is absent.
- Rationale: pi-02 optional follow-ons and pi-03 §H explicitly separate these features from mandatory P08–P10. K011/M028 narrows C288: a general-purpose orchestration registry is rejected by the architecture, not a later-enableable program. Non-veto does not waive any mandatory native registered release proof. Audited basis (FINAL): C288 NON-EPISTEMIC, C141 NON-EPISTEMIC, C215 NON-EPISTEMIC, C217 NON-EPISTEMIC, C220 NON-EPISTEMIC, C284 NON-EPISTEMIC, C106 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a release-input fixture satisfying every mandatory P00–P10 Git/plain gate remains eligible when optional P11/P12 records are NOT_RUN/BLOCKED; the decision reports those unsupported profiles honestly.
  2. Assert a fixture with all optional records PASS but a missing mandatory native registered receipt or final tail gate remains ineligible.
  3. Assert the release configuration contains no planned generic arbitrary-JS registry gate; absence of a rejected registry cannot become a release blocker or permission to implement it.
  4. Assert a mutant treating optional HX/Furnace absence as mandatory veto fails the first fixture; a mutant skipping mandatory P08–P10 fails the second.
- Evidence tier target: V1 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Release decision fixtures only; they do not prove a native invocation. R310 and the P10 tail still require real joined V4/V5 final evidence for shipped status.
- Maps-to: P10; B-release; pinned Beads lineage: wb-j5y5 historical validator carrier; extends EAT-R062, EAT-R085, EAT-R165. Prior text/history remains intact.

## EAT-R304 — Each behavior cut retains registered red-first evidence

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: Each implementation behavior cut MUST retain a pre-implementation failing consumer-visible registered-path test with a valid positive and single-fault negative before landing.
- Rationale: pi-02 Program controls and pi-03 Red-first policy mandate this test custody. C237 establishes the registration surface; C227 UNSUPPORTED a current composed function-path claim (K023/M016), so component-only runs before P04 remain labelled V1 and cannot close registered proof. Norms, not empirical defect claims, supply authority. Audited basis (FINAL): C160 NON-EPISTEMIC, C225 NON-EPISTEMIC, C228 NON-EPISTEMIC, C229 NON-EPISTEMIC, C237 ESTABLISHED, C236 NON-EPISTEMIC, C227 UNSUPPORTED.
- Acceptance criteria:
  1. Assert the cut receipt contains exact baseline/source SHA, registered tool test command, stored failing output and first failing assertion emitted before implementation, followed by the same test’s positive rerun at the changed candidate.
  2. Assert the harness invokes actual registered workflow_execute plus workflow_observe where outcome/observation is tested, not only decideExecute, a descriptor helper or direct develop(); a valid admitted control rules out deny-everything implementations.
  3. Assert one isolated bad input/check removal produces the named refusal or invariant failure, with assertion-red versus timeout/tooling/environment taxonomy. Missing baseline failure, invalid positive or helper-only substituted witness refuses the required registered closure.
  4. Assert a post-only passing receipt and a fixture-backed live claim are rejected by the receipt validator.
- Evidence tier target: V3 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Applies every behavior cut; source/component foundation work can land partial V1, with registered proof owed after composition. No obligation to fabricate a preexisting function path.
- Maps-to: P08; B-release; pinned Beads lineage: wb-j5y5 historical carrier; applies to every packet bead; extends EAT-R083, EAT-R168, EAT-R170. Prior text/history remains intact.

## EAT-R305 — Mutant qualification records actual dispositions

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: Each packet’s mutant qualification record MUST preserve the actual per-mutant disposition instead of asserting that every planned mutant was killed.
- Rationale: pi-03 Red-first and pi-02 §P08/template require property-removal mutants, positive controls and honest not-run/survived/equivalent records. C227 UNSUPPORTED means the mutation targets are current components and planned function integrations, not all existing registered checks; no existence/pass is inferred from listing a mutant. Audited basis (FINAL): C226 NON-EPISTEMIC, C206 NON-EPISTEMIC, C227 UNSUPPORTED, C219 NON-EPISTEMIC, C229 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert each applicable requirement maps to a mutant ID, exact changed check/input, source pin, command, observed failing assertion/output and disposition killed/survived/equivalent/not-run with explanation and evidence link.
  2. Assert killed requires the targeted registered-path assertion to turn red while its valid positive control passes; timeout or collector failure is not a killed-mutant assertion witness.
  3. Assert removing final rights re-read, digest, source remeasurement, intent write, gate selection proof or preservation check individually after their function composition makes the corresponding assertion fail; an unimplemented target is explicitly not-run rather than silently all-killed.
  4. Assert synthetic all-killed, absent output, unexplained equivalent and survived records cannot satisfy that property’s release proof; faithfully labelled partial records remain retainable without closure.
- Evidence tier target: V3 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Program-wide qualification policy; live/fault-specific mutants additionally require their native V4/V5/V6 evidence. Equivalent is not automatic certification and requires a recorded reason.
- Maps-to: P08; B-release; pinned Beads lineage: wb-j5y5 historical carrier; all packet receipts; extends EAT-R083, EAT-R086, EAT-R166. Prior text/history remains intact.

## EAT-R306 — Docs and operator skill close in the implementation cut

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: Each implementation cut MUST close its README, Workbench/W11, interop skill, operator-example and real per-bead receipt changes in that same cut at the evidenced status.
- Rationale: pi-02 Program controls/template and §P10, pi-03 §F, require same-cut docs/skills rather than end-only polish. C161 establishes file existence; C277 only supports source-doc availability, not success of ten LX journeys. C047 establishes pin-relative stale descriptions, while C160’s drift notes two documents were already corrected by deposit; re-read instead of repeating a stale repair. Audited basis (FINAL): C160 NON-EPISTEMIC, C161 ESTABLISHED, C210 NON-EPISTEMIC, C219 NON-EPISTEMIC, C276 NON-EPISTEMIC, C277 SUPPORTED, C047 ESTABLISHED, C048 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a cut’s documentation closure roster accounts for root README.md, affected docs/workbench guides and W11, .agents/skills/pi-mechanical-interop/SKILL.md, actual operator examples and docs/workbench/receipts/<real-bead>.md by changed paths or explicit unchanged-with-reason entries; actual changed semantics require updated commands/limitations.
  2. Assert documented commands resolve in the installed candidate and distinguish current from proposed script/function/profile/recovery behavior; an unavailable native leg is labelled BLOCKED/NOT_RUN and cannot be described as shipped.
  3. Assert a documentation-only cut leaves W11 status unchanged and historical evidence dated; same-cut operator/LX failures are mapped to help/skill/tests before closure.
  4. Assert a code cut with stale cancellation commands or omitted skill/receipt, and a doc-only shipped flip, both fail closure validation without deleting prior requirement history.
- Evidence tier target: V1 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Cross-cut obligation, not delay until P10. W11 promotion evidence itself is R310/P10. Real bead IDs verified at filing; no invented receipt filename.
- Maps-to: P10; B-release; pinned Beads lineage: wb-j5y5; B-docs/wb-12x1 historical carriers; extends EAT-R082, EAT-R086, EAT-R167. Prior text/history remains intact.

## EAT-R307 — No GitHub CI or PR delivery for this program

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: Program implementation cuts MUST NOT introduce or use GitHub CI/PRs as this program’s delivery or acceptance mechanism.
- Rationale: pi-02 Program controls explicitly says no GitHub CI/PRs. This is a scoped design-program policy, not an empirical assertion that the repository has no existing workflows or that all GitHub operations are prohibited. Audited basis (FINAL): C162 NON-EPISTEMIC, C160 NON-EPISTEMIC, C219 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert the program-cut diff introduces no GitHub Actions workflow for this program and its delivery receipt contains no PR/CI substitute for local focused tests and the appropriate exact candidate Forge complete gate.
  2. Assert the accepted code-cut receipt records actual local gate command/version/outcome keyed to its candidate; a supplied GitHub CI PASS alone does not satisfy it.
  3. Assert existing upstream CI files and fork conventions outside the program are preserved; a mutant accepting PR CI as the program gate fails the receipt test.
- Evidence tier target: V1 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Only this program’s new delivery/gates; no deletion of existing CI. Commit/push/landing permissions remain resolved separately by the live machine and user authority.
- Maps-to: P10; B-release; pinned Beads lineage: wb-j5y5 historical carrier; extends EAT-R084. Prior text/history remains intact.

## EAT-R308 — Historical TRACEABILITY stays byte-identical

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Every program cut MUST leave historical docs/workbench/TRACEABILITY.md byte-identical to its cut base.
- Rationale: pi-02 Program controls and pi-03 §G prohibit using the historical file as a scratch receipt ledger. C280 establishes its existence and historical treatment, not filesystem-enforced immutability. This retains EAT-R087 rather than asserting a new defect or permission to rewrite pinned records. Audited basis (FINAL): C162 NON-EPISTEMIC, C279 NON-EPISTEMIC, C280 ESTABLISHED, C161 ESTABLISHED.
- Acceptance criteria:
  1. Assert readCutFromGit or the adopted release-cut validator compares base/head TRACEABILITY blob bytes and passes only equality, including unchanged encoding and line endings.
  2. Assert append, replacement, deletion, whitespace-only change and rerendering all fail with traceability-changed; a same-cut per-real-bead receipt outside this immutable file passes the path guard.
  3. Assert disabling the immutable-path comparison causes a previously rejected append fixture to pass and kills the mutant.
- Evidence tier target: V1 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Applies all packets, including docs-only. Corrections to hash-pinned program docs use deferred annotation inserts after complete sections and a separate owner pin decision; no edits are authorized by this shard.
- Maps-to: P10; B-release; pinned Beads lineage: wb-j5y5; B-docs/wb-12x1 historical carriers; extends EAT-R087. Prior text/history remains intact.

## EAT-R309 — Reconciliation retains original requirement and Beads identities

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: The program reconciliation handoff MUST preserve historical EAT identifiers/audit sources and attach remaining work to the existing real Beads lineage without a second Beads namespace or false closure.
- Rationale: pi-02 §P00 Produce/header mandates retaining IDs, classifying historical status and reconciling actual issues; pi-README Existing work forbids deletion/false closure. C153/C157/C158 establish prior rows/groups/issues, C154 and C173 support the scoped plan-count/partial-state reading. R202 owns classification; this row governs identity conservation when handing that ledger to bead filing. Current Beads closure of a component experiment is not completion of its live proof. Audited basis (FINAL): C153 ESTABLISHED, C154 SUPPORTED, C157 ESTABLISHED, C158 ESTABLISHED, C159 NON-EPISTEMIC, C173 SUPPORTED, C048 NON-EPISTEMIC, C167 NON-EPISTEMIC.
- Acceptance criteria:
  1. Assert a before/after handoff validator retains every earlier EAT-R001..R200 ID and source pointer and appends new R201+ mappings; supersession links refer to actual prior IDs and never renumber/delete history.
  2. Assert each remaining requirement maps to an existing B-* lineage and a store-issued wb-* ID verified at filing, or explicit not-filed; namespace/epic remains the existing wb-1a3t lineage rather than a fabricated second program graph.
  3. Assert old closed component beads retain their closure history while newly owed installed/native legs are explicitly scoped amendments/reopened or follow-up work in that lineage; no all-25-complete inference follows from planning labels or issue status.
  4. Assert destructive rename, dropped old audit pin, fabricated wb-ID or blanket closure fails handoff validation; status reads come from a pinned actual export, not free-form note text as runtime admission authority.
- Evidence tier target: V0 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: Read-only compile; parent owns live bd verification and append-only filings. C164 contested scheduling is resolved by R206; no dependency edge is chosen here. R202 classifier is consumed, not duplicated.
- Maps-to: P00; B-contract-choice; pinned Beads lineage: wb-w8fk; epic wb-1a3t; MW tracker wb-1zn2; closed carrier history stays intact; extends EAT-R086, EAT-R147, EAT-R172, EAT-R202. Prior text/history remains intact.

## EAT-R310 — W11 wording never exceeds pinned joined evidence

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: W11, skills and release receipts MUST describe current interoperability only at the evidence level and final source/artifact pins actually witnessed, preserving historical, partial, proposed, unknown and not-run distinctions.
- Rationale: pi-02 §P10 and pi-03 hierarchy/§D/§G/§H forbid document-only promotion. C032/C155/C285 establish planned/not-shipped only at 8e2fedeb within inspected stores; C264 establishes default gates omit native lanes; C281/C282 establish the validator exists but does not run native functions. C204/C218/C275 REFUTED existing-selector claims generate negative wording regression, not positive implementation premises. C221 UNDETERMINED is the author-window no-command report; without an author transcript it remains attributed, never independently established. Mandatory gates derive from C284/C289 norms. Audited basis (FINAL): C032 ESTABLISHED, C155 ESTABLISHED, C285 ESTABLISHED, C222 NON-EPISTEMIC, C223 NON-EPISTEMIC, C224 NON-EPISTEMIC, C263 NON-EPISTEMIC, C264 ESTABLISHED, C279 NON-EPISTEMIC, C281 ESTABLISHED, C282 ESTABLISHED, C283 NON-EPISTEMIC, C284 NON-EPISTEMIC, C286 NON-EPISTEMIC, C287 ESTABLISHED, C289 NON-EPISTEMIC, C204 REFUTED, C218 REFUTED, C275 REFUTED, C221 UNDETERMINED.
- Acceptance criteria:
  1. Assert a claims/status reader accepts shipped/landed-gated wording only with the final P08–P10 roster, ratified ABI/grant, actual registered execute/observe invocation, independently installed host, all four outcomes, joined native SDK/Git/full Forge PASS plus FAIL/unknown, conservative fault/replay, bounded load/regressions/operator evidence and release-validator PASS at the final landed source/artifact pins.
  2. Assert descriptor fixtures, direct develop/CLI receipts, standalone historical native operations, a green default Forge gate or validator tests alone cannot upgrade W11; receipt tier V3 is not native V4 and producer L3 is not registered V3.
  3. Assert every lower-tier, blocked/unrun or historical claim remains dated and scoped; unadopted profile fields are labelled proposed, fixed tested worktree/grant defects are historical, and SDK-child/recovery unknowns are not quietly called verified.
  4. Assert a source/artifact change after the final joined acceptance makes current credit stale until re-pin/re-gate; mutation of a profile label, synthetic native ID, PARTIAL-to-PASS or wrong-tree receipt fails the truth reader.
  5. Assert the authoring-window no-command sentence remains an attributed UNDETERMINED report unless an independently audited transcript changes its ledger warrant; absence of that transcript does not block runtime implementation.
- Evidence tier target: V5 (pi-03 V ladder; NOT_RUN, no tier promotion).
- Conditions/unknowns: V1 status-reader tests consume actual V4/V5 final receipts; publishing truthful status is not executing native proof. P10 tail owns acquisition/final gates. Optional provider claims need separate V6 and are not implied by Git/plain W11.
- Maps-to: P10; B-release; pinned Beads lineage: wb-j5y5; W11 history; B-docs/wb-12x1; extends EAT-R082, EAT-R085, EAT-R165, EAT-R166, EAT-R170, EAT-R171. Prior text/history remains intact.

## Scope dispositions

C221’s authoring-history unknown remains in the audit (M015), not a fabricated release blocker; R310 retains its attributed wording and missing-transcript condition. SDK-child death acquisition is already R216/R257, not repeated. The optional/native failures specified here are experiments to run, not defects found by this shard. No EMPIRICAL_REPAIR or RISK_CONTROL authority is used: this ledger supplies no PLAUSIBLE risk in this scope and the optional package/guard choices are explicit norms. K005 contested DAG, K006/K009/K010 receipt/tier joins, K007 binding shape and K008 lease owner are P00/M00 prerequisites owned by the foundations shard. Hash-pinned artifact repairs remain deferred inserts with separate owner pin advancement; this file does not edit those artifacts. Outputs are intermediate workflow inputs under `requirements/.work`; parent is responsible for durable delivery and the consolidated TDD matrix.

