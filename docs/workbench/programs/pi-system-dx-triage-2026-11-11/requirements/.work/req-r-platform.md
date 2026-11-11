# Atomic requirements — r-platform

Phase 10 compilation of the Pi-subagents system DX/UX/LX audit, **EAT-R366..EAT-R390 (25 obligations)**. Environment pin: **ce180d82f9385a315ff26bd8e7f9202cac19f5b3**, fork v0.20.0, graded 2026-11-11. These are implementation inputs, not a report of completed repairs. All acceptance is **NOT_RUN**. Parent owns aggregation, L0–L10 TDD matrix and bead filing; this shard creates no beads, commits or publication.

## Scope and evidence contract

- Inputs: `epistemic-triage/CLAIMS.jsonl`, `REMEDIATION.md`, `CONTRADICTIONS.md`, `EPISTEMIC-AUDIT.md`, dossiers C199/C248/C252/C054/C062; prior MNI requirement lineage remains historical. Claim IDs refer only to this 267-row ledger, never another audit's same-numbered claims.
- Own families: providers (31 claims), packaging (18), scheduling (20), plus cross-family stub/status and positive-preservation obligations. **25 IDs cannot exhaust the 55 defects in these three families, still less the whole system.** The explicit residual queue below must remain in the parent handoff/bead plan. No omitted claim is cured by implication.
- One statement is one independently testable invariant. Criteria are controls/falsifiers or tested forms of that invariant, not independent feature additions. Error wording, discovery, grants, deadlines, package identity, schedule admission, store custody and settings precedence are separate rows.
- Primary V ladder: V0 pinned static evidence/status, V1 focused red/green, V2 independently installed artifact, V3 actual registered Pi tool with controlled I/O, V4 joined mandatory native Mechanical path, V5 process/restart/fault/operational trial, V6 optional native producer acceptance. Provider claims here require actual `hx/rf/forge/furnace` at V6; helper-only/V3 does not certify that tier. Every V6 row also needs focused red/green and registered-path evidence. Missing binaries/credentials/fixtures means **BLOCKED with the exact artifact**, never silent skip or fixture PASS. Parent maps these targets to L0–L10 without dropping lower-tier legs.
- Probe paths are relative to this run's `probes/`; repository tests/QA paths to the pin. An acceptance oracle must drive captured tool objects from `src/index.ts` where the row names registered behavior. Existing probes establish the red state; invert/extend their assertions, not their receipts. Native values are data, never instructions or authority.
- Compilation instruments: `r-platform-evidence/instrument-versions.txt`, `rf-version.json`, `rf-model-ids.recheck.out`, `hx-find-providers.hxs`, `children-providers.out`, `hx-badkind.err`, `import-census.recheck.json`. Actual hx returned four provider names and four answer frames at **partial** coverage; bad kind exited 2 with HX-TYPE-UNKNOWN-KIND/remediation. hx dependents returned no established results for both unwired modules AND a known-imported control, so those partial zero rows prove no absence. The TypeScript AST census/native grep supplies the importer detection surface (124 src files, 17 unreachable, identical to investigator receipt). Real rf no-commit renders admitted claude-opus-5/claude-sonnet-5 and refused newer Pi aliases with RF_MODEL_CAPABILITY_UNKNOWN; version 0.1.883, 89 leaves/81 reachable, mismatch:false. These rechecks do not regrade the ledger or claim to run acceptance.
- Live mapping readback, read-only `bd --readonly --sandbox show`, saved in `r-platform-evidence/bd-live-readback.out`: wb-79k.1/.2 closed-consolidated into **wb-79k.3** (open); wb-752.12 closed into **wb-752.13** (in_progress); wb-9x5.10/.16 closed into **wb-9x5.11** (in_progress). wb-69g.12/wb-6ze.15/wb-0kg.3 are in_progress; wb-h8f.2/.7 and wb-yiu4 open. wb-lri/wb-5uh/wb-x32/wb-cax/wb-f5y in_progress. Closed W marker containers are historical, not new work owners. Re-read before filing; live status does not change pin-time code findings.
- Sibling de-duplication: R363 already owns C156/C229 input-schema paths; do not mint a second schema repair. R327 owns C203/C045/C157/C191 tool-reference reach and R339 owns C213/C130 skill/doc packaging coherence; attach these corroborating claims there. R343 owns detached cancel, R346 Furnace topology, R349 Furnace reply bounds. This shard adds no duplicate cure. R374 is HX/RF ingress only. R387 is status truth, not all stub implementations. R325's execute grants are distinct from R369 provider missing-token refusals.

## EAT-R366 — Return the HX answer set rather than proof-graph rows

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The hyperunix.find capability MUST return an explicit addressable answer set selected from native answer frames, separate from its proof graph.
- Rationale: C217 reproduced anonymous stat records with no paths; C218 reproduced identical proof-row counts for files, directories and zero-match symlinks. Native answer_count, not rows.length, is the count oracle. This does not establish complete coverage: the native HX reading remains partial/unknown. Audited basis: C217 ESTABLISHED; C218 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert a three-file fixture produces exactly those three root-relative paths and kinds through registered node() and capability_invoke; compare to native HX answer-frame references plus directory-entry names, independently checked by filesystem enumeration.
  2. Assert directory and symlink queries return their own answer sets; zero symlink answers with incomplete coverage retain licenses_absence:false and cannot be described as proven absence.
  3. Assert graph/support nodes appear only in a separately named evidence projection and are never counted as answers; a mutant returning source.rows fails the answer oracle.
- Probe oracle: providers/h01-hx-native-find.mjs, providers/h02-registry.mjs; providers/vt/node-e2e.probe.test.ts S1 and providers/vt/observe.probe.test.ts; real hx --hxs answer/answer-coverage frames + native filesystem control.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: The vendored @hyperunix/sdk 0.1.0 exposes answer projections as distinct events through `events()` (node_modules/@hyperunix/sdk/dist/execution.js:8-9) and carries `answerCount` (dist/result.js:184, :439); only the `find()`/`rows()` path the provider uses (src/workbench/providers/hyperunix.ts:21, :42) drops them and yields node-claim bodies only. The cure consumes the `events()` answer projections; this row is not SDK-blocked (G-HX AVAILABLE). Do not reconstruct names from inode guesses or invent a producer API.
- Maps-to: W07/VC-2 HX result projection; extends live wb-lri; extends EAT-R247, EAT-R248, EAT-R299 (prior text historical).

## EAT-R367 — Retain actionable producer diagnostic meaning

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Provider failures MUST retain a bounded sanitized producer code, cause and available remediation rather than replacing them with an undifferentiated transport sentence.
- Rationale: C221 reproduced loss of HX-TYPE-UNKNOWN-KIND and its fix; C222 reproduced RF code-only and non-envelope failures; C223 reproduced informative-tail loss at 100 bytes; C240 reproduced relative/missing Forge targets mislabeled outside scope. C244 is the established Furnace diagnostic-preservation precedent. Audited basis: C221 ESTABLISHED; C222 ESTABLISHED; C223 ESTABLISHED; C240 ESTABLISHED; C244 ESTABLISHED, at ce180d82 on 2026-11-11. Corroborating mapping basis (F-08, no statement expansion): C083 ESTABLISHED.
- Acceptance criteria:
  1. Assert real HX invalid-kind and RF unknown-view/model failures carry the producer code and actionable message/hint, with usage/input errors distinguished from protocol failure.
  2. Assert Forge relative target is validation, nonexistent in-scope target is unavailable, and resolved outside target remains authorization; all three messages state the actual cause.
  3. Assert curated replies retain the actionable cause within a documented diagnostic budget (1024 UTF-8 bytes chosen here), with explicit truncation and no split codepoint; planted credential/control text never survives.
  4. Assert a non-envelope child exit reports exit status and available bounded safe cause; do not expose raw traceback or infer a cause from empty stderr. Non-envelope stderr retention is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed), held by test/workbench-rf-stderr-receipt-capture-census.test.ts; the honest exit-status/unavailable-cause alternative remains permitted.
- Probe oracle: providers/h08-hx-error-result.mjs + providers/hx-badkind.err; providers/h02-registry.mjs and providers/h03-curated.mjs badview/badmodel/crash/Forge target cases; test/workbench-registry-schema.test.ts redaction controls.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: The noncommitted preview stderr-discard/kill custody is a landed pin (wb-jwc.7, closed: landing 1052, merge 0ebfd9ce), held by the artifact test/workbench-rf-stderr-receipt-capture-census.test.ts. Do not change that pin silently: native RF envelope messages can be preserved immediately; non-envelope stderr retention (criterion 4) is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed), or supply exit status and honest unavailable cause. R363 owns schema paths; R364 owns completion propagation, not this mapping.
- Maps-to: W06/W07/W08/W10 provider error UX; extends live wb-lri, wb-5uh, wb-x32; extends EAT-R40 (prior text historical); coordinates with EAT-R363, EAT-R364.

## EAT-R368 — Expose provider contracts without invoking providers

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The Pi orchestrator MUST be able to retrieve an authorized static capability input contract without requiring a native inspect implementation.
- Rationale: C220 reproduced inspect-not-advertised for every shipped provider and catalog omission of inputSchema. C242 establishes compact staged Claude discovery, not equivalent Pi discovery. Audited basis: C220 ESTABLISHED; C242 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert workbench_catalog remains compact and offers an on-demand contract route; for each of the four invoke-only descriptors the actual registered route returns the descriptor inputSchema and version.
  2. Assert exact discover authorization governs metadata, with zero provider invokes, inspects or process starts; adding contract retrieval confers no invocation right.
  3. Assert missing/foreign authorization and unknown IDs stay sanitized and bounded; contract fetch does not falsely advertise runtime inspect/observe support.
- Probe oracle: providers/vt/node-e2e.probe.test.ts S7 and providers/h04-pi-catalog.mjs; captured registered tool definitions + instrumented provider-call counters.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: One static contract behavior only. C169 observe-mode dispatch is a separate residual; native polling is not implied.
- Maps-to: W06/W16 capability discovery; new atomic cut; no exact live owner established; extends EAT-R290 (prior text historical).

## EAT-R369 — Name the denied capability grant

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: An authorized role reaching a capability authorization refusal MUST receive the exact missing grant token needed for that attempted operation.
- Rationale: C231 reproduced identical denials across discover/invoke/producer grant combinations; C243 establishes pre-provider refusal and typed errors. Naming a token does not grant it. Audited basis: C231 ESTABLISHED; C243 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert each missing member of the exposed-role discover/invoke/producer grant conjunction yields a refusal naming that token, not merely permission denied.
  2. Assert node() retains its existing producer-permission semantics and curated tools retain their narrower invoke/discover semantics; no grant is auto-added.
  3. Assert every missing-grant case starts zero providers and a fully authorized positive reaches exactly one provider.
- Probe oracle: providers/h03-curated.mjs grant matrix and providers/h03-run-grants.out; providers/vt/node-e2e.probe.test.ts S5; test/workbench-capability-surface-parity.test.ts.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: R325 covers execute journey grant documentation. This row covers actual provider refusal tokens; hidden capability discovery need not enumerate unauthorized IDs.
- Maps-to: W03/W06 exact grant diagnostics; extends live wb-f5y; extends EAT-R227, EAT-R228 (prior text historical).

## EAT-R370 — Classify a missing producer executable as unavailable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Each native provider MUST report a missing executable as unavailable with its executable name and a concrete installation/PATH next step.
- Rationale: C232 drove all four providers with a reduced PATH: three reported transport, only Furnace named ENOENT. This is missing-executable behavior, not evidence of transient provider failure. Audited basis: C232 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert hermetic PATHs excluding hx, rf, forge and furnace yield unavailable and name the missing executable for each real launch seam.
  2. Assert an executable that starts then emits invalid protocol remains a protocol/transport failure, not binary missing; a valid installed executable remains callable.
  3. Assert failure leaves no live child or admission slot and does not silently substitute another binary.
- Probe oracle: providers/h02-registry.mjs and providers/h03-curated.mjs reduced-PATH cases; providers/nobin-which.out; process/admission counter oracle.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: The proposed doctor/preflight surface is a separate residual, not bundled into this error classifier.
- Maps-to: W07-W10 provider availability; extends live wb-lri, wb-5uh, wb-x32.

## EAT-R371 — Canonicalize the configured RF workspace

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The RF provider binding MUST use the canonical configured workspace identity and invalidate that binding when the effective workspace setting changes.
- Rationale: C226 reproduced both symlink/trailing-slash rejection and persistence after editing the setting. Both arise in the configuration-to-registry binding; native rf successfully canonicalizes those paths. Audited basis: C226 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert realpath-equivalent RF roots (canonical, symlink and trailing slash) return the same authorized workspace identity.
  2. Assert editing reactivefiberWorkspaceRoot in the same session changes the next binding or explicitly refuses with a restart-required message before invoking the old root; never silently render the old workspace.
  3. Assert a genuinely contradictory producer workspace is refused and scope containment is not weakened by normalization.
- Probe oracle: providers/vt/rf-root-setting.probe.test.ts; providers/h02-run-rf-symlink.out and providers/h02-run-rf-slash.out; rf --workspace canonicalization control.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Registry replacement must respect in-flight invocations and their admitted identity; no model-selected workspace is introduced.
- Maps-to: W10 RF workspace settings; extends live wb-x32.

## EAT-R372 — Let the provider deadline settle before the registry cutoff

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Native provider and registry deadline configuration MUST admit the declared provider execution budget and leave time for its bounded settlement before the enclosing cutoff.
- Rationale: C233 reproduced a 30029 ms registry cutoff before the RF 60000 ms deadline; its HX race is SUPPORTED code-read only. C168 SUPPORTED identifies hard configuration limits; it is not reproduction of every limit. C245 establishes child reaping/slot release on the measured direct-child deadline path. Audited basis: C233 ESTABLISHED; C168 SUPPORTED; C245 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert a controlled RF child settling between 30 and 60 seconds succeeds under a declared 60-second provider policy; a child exceeding it produces the provider deadline refusal and settles before the enclosing deadline.
  2. Assert HX wall-budget exhaustion returns its partial coverage before the registry cutoff under the adopted finite deadline policy.
  3. Assert cancellation still reaps the direct child and eventually releases its slot; timing out never asserts rollback or completion.
- Probe oracle: providers/h05-rf-deadline.mjs with barrier/clock-controlled child and process readback; registry-admission tests; actual HX budget-exhaustion control.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: An operator capabilityLimits knob and nodeCap knob are separate residual obligations. Grandchild pipe retention was not closed by C245 and must not be certified here.
- Maps-to: W06/W10 provider deadline composition; extends live wb-x32; extends EAT-R74, EAT-R75 (prior text historical).

## EAT-R373 — Settle the original node-call identity

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A provider node call MUST settle the same Pi node-call projection identity it started, retaining native operation identity as a linked reference.
- Rationale: C224 reproduced a phantom active node beside the completed RF and Forge native operation. The Furnace branch is code-supported only; do not call it reproduced. Audited basis: C224 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert successful registered RF and Forge node() calls leave no active start row after workflow completion and retain the exact producer operation reference.
  2. Assert native-ID-absent HX calls and actual errors settle one call identity correctly; parallel calls cannot settle each other.
  3. Assert deleting the stable call-key linkage recreates the phantom and fails the post-completion active-count oracle.
- Probe oracle: providers/vt/observe-rf.probe.test.ts and providers/vt/observe.probe.test.ts; registered workflow_observe node identities and status counts.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: None.
- Maps-to: W13/W14 node lifecycle projection; extends live wb-79k.3; extends EAT-R239, EAT-R243 (prior text historical).

## EAT-R374 — Apply the landed read adapters at the host observation seam

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The host MUST ingest HX and RF read results through the landed provider reader adapters into its scope-bound observation projection.
- Rationale: C225 reproduced generic-only rows and HX complete wording for unknown coverage; the static importer census found no HX/RF adapter callers. C246 establishes root containment. Wiring is not permission to promote incomplete coverage. Audited basis: C225 ESTABLISHED; C246 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert actual registered HX/RF node() results create their adapter snapshot kinds and host-bound relations without manually seeding the projection.
  2. Assert incomplete, failed and unknown HX coverage never yields a verified-success or licenses-absence claim; RF preview remains explicitly noncommitted and injected fixtures remain fixture-labeled.
  3. Assert missing read grants execute zero producer calls, and native IDs, source basis and sanitized evidence stay bound to the same invocation.
- Probe oracle: providers/vt/observe.probe.test.ts and providers/vt/observe-rf.probe.test.ts plus test/workbench-hyperunix-observer.test.ts and test/workbench-reactivefiber-observer.test.ts; registered native readback.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Live readback consolidates wb-79k.1/.2 into wb-79k.3; do not reopen the closed precursors. Claude-topology wiring is a separate residual; detached wiring is R343. Respect adapter consumed-field and redaction pins.
- Maps-to: W13/VC-2 native read wiring; extends live wb-79k.3; extends EAT-R248, EAT-R299, EAT-R300 (prior text historical); coordinates with EAT-R373.

## EAT-R375 — Isolate optional provider load failure

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A failed optional provider import MUST withhold only that provider, leaving unrelated Workbench tooling and loadable providers available.
- Rationale: C239 reproduced whole-native-load ERR_MODULE_NOT_FOUND for independently blocked SDK resolution, removing all twelve tools. This is measured load coupling, not a mandate to implement a fifth provider. Audited basis: C239 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert independent resolve-hook failures for each optional SDK leave unrelated catalog/validate/observe/control tools registered and the remaining providers callable.
  2. Assert the unavailable provider reports a bounded sanitized load cause and cannot invoke through a stub.
  3. Assert a later valid load can recover without cached permanent failure, and concurrent loading produces no duplicate registration.
- Probe oracle: providers/h06-missing-sdk-register.mjs and providers/h06-missing-sdk.mjs + test/helpers/boot-extension.ts registration census; test/workbench-native-modules-failure.test.ts and test/workbench-native-load-notify.test.ts.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Closed wb-4ax is historical lineage, not an open repair container. Registry-derived extensibility rosters remain a distinct residual.
- Maps-to: W06/W22 optional provider packaging; new atomic cut; no exact live owner established.

## EAT-R376 — Point fork installation instructions at the fork artifact

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The fork installation instructions MUST identify an artifact or pinned source that delivers the documented fork, explicitly distinguishing the upstream npm package.
- Rationale: C199 established that the named npm source delivers upstream 0.23.2 rather than fork 0.20.0. C210 SUPPORTED identifies an absent inspected distribution policy. C216 PLAUSIBLE predicts wrong preview media only on a future fork publication; no remote rendering was measured. Audited basis: C199 ESTABLISHED; C210 SUPPORTED; C216 PLAUSIBLE, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert following the documented fork install recipe in a clean consumer produces the expected source/artifact identity and Workbench exports, rather than the upstream package.
  2. Assert README labels the upstream command as upstream-only and states the fork delivery status/version; before publication use a verified pinned git source or local packed artifact, not an invented registry name.
  3. Assert a documented unavailable publication is never presented as an existing release.
- Probe oracle: packaging/npm-view-published.json + clean external packed/source install oracle and qa/workbench/installed-consumer.mjs runtime identity.
- Evidence tier target: V2 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Publishing identity/version policy and registry media verification remain separate decisions; this row authorizes no publication, network exposure or version bump.
- Maps-to: W22 install identity; extends live wb-cax; extends EAT-R286 (prior text historical).

## EAT-R377 — Align declared and tested Node compatibility

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The documented Node compatibility floor MUST agree with the manifest and the runtime versions explicitly exercised by the compatibility jobs.
- Rationale: C200 established >=24 vs CI 22; C202 established README absence. C208 and C214 establish exact dependency pin and command-documentation positives, not universal compatibility. Audited basis: C200 ESTABLISHED; C202 ESTABLISHED; C208 ESTABLISHED; C214 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert package engines, README install prerequisite and docs/17 support declaration have the same adopted floor.
  2. Assert each CI compatibility runtime is classified as declared-supported or explicitly experimental; the declared floor is actually exercised by a recorded clean complete gate.
  3. Assert workbench-dependency-census drift detection includes CI runtime declarations and changing one side alone makes the guard red.
- Probe oracle: package.json, .github/workflows/ci.yml and README.md content census + test/workbench-dependency-census.test.ts + clean floor-runtime gate receipt.
- Evidence tier target: V2 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: No unsupported inference that CI historically passed on every Node 22 host. Keeping >=24 or revising the floor requires a reviewed policy choice and fresh gate, not this compilation.
- Maps-to: W22 runtime compatibility; extends live wb-cax; extends EAT-R286 (prior text historical).

## EAT-R378 — Pack only freshly compiled runtime bytes

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: A bare npm pack MUST not deliver compiled runtime bytes stale relative to the source it packages.
- Rationale: C205 SUPPORTED identifies the absent prepack freshness guard; no stale distribution was reproduced. C206/C207/C211 establish deterministic packing, independent installation and runtime identity controls that must remain intact. Audited basis: C205 SUPPORTED; C206 ESTABLISHED; C207 ESTABLISHED; C211 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert a deliberate source change with stale dist followed by bare npm pack either rebuilds and packages the fresh implementation or refuses with an explicit freshness diagnostic.
  2. Assert the independently installed tarball executes the changed sentinel and its identity matches the packed dependency bytes.
  3. Assert two packs of the same fresh input remain deterministic and the existing denied-path classifier still rejects private state.
- Probe oracle: qa/workbench/package-smoke.sh + qa/workbench/install-smoke.mjs and qa/workbench/installed-consumer.mjs; throwaway source/dist sentinel mismatch and packed-file digest oracle.
- Evidence tier target: V2 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Risk prevention, not an established stale-artifact incident. Rebuilds must work locally, never on the S3 mount; no live source edit is required by this compilation.
- Maps-to: W22 compiled artifact freshness; extends live wb-cax; extends EAT-R271 (prior text historical).

## EAT-R379 — Reject schedules outside the timer domain

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Schedule admission MUST reject durations outside a finite supported timer domain before storing or arming a job.
- Rationale: C248 reproduced 31 spawns in 60 ms for 30d and immediate +30d; C249 reproduced enabled-but-inert 0m. C267 establishes past-ISO refusal before persistence. The smallest cure chosen here is refusal, not timer chaining. Audited basis: C248 ESTABLISHED; C249 ESTABLISHED; C267 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert interval and relative delay are safe integers in 1000..2147483647 ms; zero, negative/overflow arithmetic, 30d, +30d and +99999999999d refuse with the bound named and zero jobs/timers/spawns.
  2. Assert an absolute future delay beyond the same bound refuses before setTimeout; past ISO still refuses before record creation.
  3. Assert valid boundary values arm without TimeoutOverflowWarning using fake timers, and README/schema describe the actual supported bound.
- Probe oracle: scheduling/bounds.probe.ts B1-B4 + test/schedule.test.ts and test/schedule-e2e.test.ts; timer-install spies, store-row and spawn counters.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Scheduled bypassQueue concurrency policy is a separate risk decision; this row closes the overflow, not all runaway-spawn avenues.
- Maps-to: Scheduling timer admission; new atomic cut; no exact live owner established.

## EAT-R380 — Restart scheduling after a same-session re-enable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Re-enabling Scheduling in an active session MUST restore that session scheduler without duplicating timers.
- Rationale: C250 reproduced off/on leaving no scheduler and hiding retained jobs. C266 establishes schema pruning when disabled, with documented next-session schema effects. Audited basis: C250 ESTABLISHED; C266 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert the real Settings off/on sequence emits a new ready event, retains the job menu and admits a new schedule without restart.
  2. Assert disable immediately disarms timers; repeated enable does not duplicate a tick or spawn; persistent jobs are rearmed once.
  3. Assert disabled schema/guideline pruning and explicit incompatible-combination refusals remain intact at registration.
- Probe oracle: scheduling/wiring.probe.ts W4/W5 via actual SettingsList + test/schedule-params-wiring.test.ts; ready-event/timer/spawn counts.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Tool-schema hot reload is not asserted if Pi requires next-session registration; runtime restart is the obligation.
- Maps-to: Scheduling live toggle; new atomic cut; no exact live owner established.

## EAT-R381 — Preserve an unreadable schedule store before mutation

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A schedule mutation MUST never overwrite corrupt prior store bytes without preserving them for recovery and reporting their path.
- Rationale: C252 reproduced silent empty load then destructive rewrite. C265 establishes atomic writes, stale-PID recovery and lazy directory creation on normal inputs, which do not license corrupt-input erasure. Audited basis: C252 ESTABLISHED; C265 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert truncating a two-job store then adding/updating/removing refuses the mutation or preserves the original bytes in a named recovery file before creating replacement state.
  2. Assert stderr/operator warning names the unreadable file and recovery action; no empty-success response masks the failure.
  3. Assert valid-store atomic replacement, stale-lock recovery and no-write-before-first-mutation still pass; replace the existing self-heals characterization with preservation assertions.
- Probe oracle: scheduling/store-nextrun.probe.ts S2 + test/schedule-store.test.ts; exact original-byte/recovery-file and warning oracle.
- Evidence tier target: V5 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Backup naming and explicit operator recovery policy may be chosen, but preservation is mandatory. Do not rename shared production stores during this audit.
- Maps-to: Scheduling durable store integrity; new atomic cut; no exact live owner established.

## EAT-R382 — Keep schedule lock contention off the event loop

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Schedule-store lock contention MUST yield the event loop during its finite wait rather than synchronously busy-wait.
- Rationale: C251 reproduced about five seconds with zero 10ms heartbeat ticks. C265 establishes stale-PID recovery; eliminating busy-wait must not delete a live owner lock. Audited basis: C251 ESTABLISHED; C265 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert a live-owner lock prevents mutation while an independent event-loop heartbeat continues during retry.
  2. Assert the wait ends within a declared finite budget with a path-bearing lock diagnostic, leaving store bytes and live-owner lock unchanged.
  3. Assert a dead-owner positive still recovers and writes atomically; a spin-loop mutant fails the heartbeat oracle.
- Probe oracle: scheduling/store-nextrun.probe.ts S1 + test/schedule-store.test.ts; controlled live PID lock, heartbeat and byte comparison.
- Evidence tier target: V5 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: The exact retry budget is a measured policy parameter, not a universal 250ms claim. This row does not prescribe stealing PID-reused locks.
- Maps-to: Scheduling responsiveness; new atomic cut; no exact live owner established.

## EAT-R383 — Deliver scheduler failures on consumed error channels

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Every schedule admission, arming or fire failure MUST be delivered as an error to the creating model or active operator, not only an unconsumed event.
- Rationale: C249 established emit-only scheduler error handling and false Scheduled replies; C255 reproduced success-shaped invalid schedule replies and discarded cron field errors. Audited basis: C249 ESTABLISHED; C255 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert invalid cron/input/combinations return isError:true with the actual field/count cause and no Scheduled success.
  2. Assert arm-time failure refuses or marks the returned job failed and informs the caller; fire-time failure produces one sanitized operator/conversation error naming the job ID.
  3. Assert a successful scheduled fire keeps its ordinary completion path and no duplicate failure notification appears.
- Probe oracle: scheduling/wiring.probe.ts W2 and scheduling/bounds.probe.ts B4/B6 + booted subagents:scheduled event consumer; reply isError and notification counts.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: R379 owns zero-duration rejection. Human-enable instructions must be phrased as an agent next step, without claiming the model can drive a TUI.
- Maps-to: Scheduling error delivery; new atomic cut; no exact live owner established; coordinates with EAT-R379.

## EAT-R384 — Diagnose rejected settings by file and key

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Settings validation MUST report every ignored or refused supplied key with its file/layer and expected constraint.
- Rationale: C261 reproduced silent wrong-type drops and pathless workbench errors; C267 establishes path-named malformed JSON warnings and false-to-no-fallback normalization. Audited basis: C261 ESTABLISHED; C267 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert wrong types, unknown top-level keys and invalid enums produce diagnostics containing file path, global/project layer, key and expected type/value, without echoing sensitive contents.
  2. Assert a misspelled workbench key names its source file before extension refusal; valid values preserve current precedence.
  3. Assert malformed JSON still warns with path and fallbackSubagent:false still disables fallback; no invalid restriction is narrated as applied.
- Probe oracle: scheduling/settings-memory-menu.probe.ts T1/T2 + test/settings.test.ts; file/layer/key warning capture and booted effective schema.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: Accepting coerced strings or failing the whole load is a separate policy choice. Agent-file frontmatter validation C005 is a distinct residual.
- Maps-to: Settings diagnostics; new atomic cut; no exact live owner established.

## EAT-R385 — Write project setting deltas rather than global snapshots

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A project Settings edit MUST persist only project-explicit overrides rather than materializing inherited global values.
- Rationale: C262 reproduced one toggle writing 22 keys and freezing maxConcurrent at 16 after the global value moved to 32. This is setting-layer custody, not a need to change global precedence. Audited basis: C262 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert changing Scheduling writes that explicit override but leaves inherited maxConcurrent/graceTurns/workbench absent from the project file.
  2. Assert a later global maxConcurrent update applies while Scheduling retains its project value, and pre-existing explicit project overrides remain preserved.
  3. Assert global files are never written by the project menu and the effective merge remains project-over-global-over-default.
- Probe oracle: scheduling/settings-memory-menu.probe.ts T3 + scheduling/wiring.probe.ts W4; project-file key census and reload after global mutation.
- Evidence tier target: V3 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: No permission to rewrite existing project configurations en masse; migrate existing snapshots only under a separately reviewed rule.
- Maps-to: Settings layer QoL; new atomic cut; no exact live owner established.

## EAT-R386 — Ship a live-true settings reference

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The installed settings reference MUST describe each actual setting and environment selector with its default, precedence and effective lifetime.
- Rationale: C263 established missing settings keys and misleading gitignored wording; C260 established undocumented process-local cron timezone; C258 established missing model-facing session lifetime; C259 SUPPORTED identifies scheduled transcript omission by code read, not overnight result loss reproduction. Audited basis: C263 ESTABLISHED; C260 ESTABLISHED; C258 ESTABLISHED; C259 SUPPORTED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert a schema/default-derived table in the packed artifact names every SubagentsSettings/WorkbenchSettings key, type, default, layer precedence and live-vs-next-session application.
  2. Assert actual env selectors are documented with scope, including PI_CODING_AGENT_DIR, PI_CODING_AGENT_SESSION_DIR, XDG_RUNTIME_DIR and CLAUDE_CONFIG_DIR; RF_WORKSPACE/SWARM_RF_WORKSPACE are described as child-env policy rather than a Pi registry selector.
  3. Assert Scheduling text discloses process/session lifetime, timezone, supported timer bounds and current transcript behavior; local memory text says add to .gitignore rather than claiming one is created.
  4. Assert the documented configuration recipe loads and changes the intended effective schema in a clean installed consumer without source inspection.
- Probe oracle: scheduling/settings-memory-menu.probe.ts + scheduling/wiring.probe.ts W3; src/settings.ts default/key census and fresh packed consumer installed-docs scenario.
- Evidence tier target: V2 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: R327 owns tool-journey docs; this row owns configuration truth. TZ selection and transcript creation are separate behavioral residuals. The preparatory surface.json file list contains settings.json wording inconsistent with settings.ts; use the actual reader and subagents.json paths, not that generated list.
- Maps-to: Settings/Scheduling installed documentation; extends live wb-cax, wb-yiu4; extends EAT-R290 (prior text historical); coordinates with EAT-R379, EAT-R384, EAT-R385.

## EAT-R387 — Distinguish tested seams from reachable product features

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The release status documentation MUST distinguish component-tested, production-reachable and native-accepted feature status at an explicit source/date pin.
- Rationale: The cited stub findings identify inert policies, reserved definition kinds, unwired adapters/read models, descriptor-only verbs and unreachable seams; their grades remain separate. C049/C069/C169/C185/C209 are SUPPORTED code-read claims, not reproductions. Established status contradictions include both understatement of landed code and overstatement of product wiring. Doc-only master drift does not change the ce180d82 environment verdict. Audited basis: C049 SUPPORTED; C055 ESTABLISHED; C063 ESTABLISHED; C069 SUPPORTED; C078 ESTABLISHED; C102 ESTABLISHED; C119 ESTABLISHED; C126 ESTABLISHED; C169 SUPPORTED; C182 ESTABLISHED; C184 ESTABLISHED; C185 SUPPORTED; C225 ESTABLISHED; C209 SUPPORTED; C110 ESTABLISHED; C161 ESTABLISHED; C192 ESTABLISHED; C121 ESTABLISHED; C115 ESTABLISHED; C117 ESTABLISHED; C172 ESTABLISHED; C120 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert each named stub/status row records measured source SHA/date, detection surface, reachable entrypoint or explicit none, evidence tier and remaining live owner; component tests alone cannot produce shipped/native accepted.
  2. Assert policy echo-only, script-only launch, mode dispatch, Furnace control verbs, observe placeholder blocks, compare metrics, executable identity and interop routes are described in their measured state until an actual caller/receipt exists.
  3. Assert the generated matrix no longer calls closed carriers open at its own export pin or declares currently registered tools absent; historical rows remain historical and prior pinned correction bytes are not silently rewritten.
  4. Assert a same-cut status check derives affected features from changed implementation paths and demands fresh status/evidence or an explicit unchanged justification, not merely presence of a release receipt block.
- Probe oracle: interop/import-census.mjs + src/index.ts registered-tool census; qa/workbench/status-ledger.mjs and qa/workbench/mwi-release.mjs + feature-matrix row/evidence validator (extended oracle).
- Evidence tier target: V0 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: This is representation/reachability-status repair, not implementation of all stubs. Live seam wiring retains existing MNI P02/P03/P04 owners wb-y0n6/wb-2ukh/wb-4bxo and shared wb-79k.3/wb-h8f.7/wb-752.13. C116 line-pinned docs census requires content-anchor repair or owner-approved pin advance; do not silently repin historical fixtures. C120 outside-machine enforcement remains unknown; repository enforcement is the named detection surface.
- Maps-to: W11/W13/W15-W18/W21/W22 status and stub truth; extends live wb-cax, wb-yiu4; extends EAT-R82, EAT-R167, EAT-R293, EAT-R306, EAT-R310 (prior text historical).

## EAT-R388 — Preserve exact artifact admission on packaging changes

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Packaging changes MUST retain exact packed-artifact identity admission for a clean independent consumer.
- Rationale: These positives are ESTABLISHED at the pin: deterministic pack, denied-path classification, clean scrubbed/read-only consumer success, vendor checksum truth and packaged invocation identity. They do not establish all future releases; regression protection is an explicit experience standard. Audited basis: C206 ESTABLISHED; C207 ESTABLISHED; C208 ESTABLISHED; C211 ESTABLISHED; C214 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert repeated packs share shasum/integrity and every packed path satisfies the boundary classifier; private-state and altered vendor-byte mutants fail.
  2. Assert fresh install-minimal under HOME/LANG/PATH/TMPDIR with read-only node_modules leaves its tree unchanged, returns workflow value 42 and retains zero-grant denial.
  3. Assert capture/verifyInvocationIdentity validates installed dependency artifact bytes, not merely package version; dependency-lock copy still equals the reviewed lock.
- Probe oracle: qa/workbench/package-smoke.sh, qa/workbench/install-minimal.mjs and qa/workbench/installed-consumer.mjs; test/workbench-package-boundary.test.ts and test/workbench-vendor-pins.test.ts.
- Evidence tier target: V2 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: One preservation invariant: exact admitted artifact identity. C214 command-copy maintenance is a separately retained positive residual; no blanket green complete-gate claim.
- Maps-to: W22 QoL-preserve exact artifact custody; extends live wb-cax; extends EAT-R271, EAT-R286, EAT-R288 (prior text historical); coordinates with EAT-R376, EAT-R377, EAT-R378.

## EAT-R389 — Preserve pre-provider authority confinement

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Provider UX repairs MUST retain host-bound authority confinement before any unauthorized provider process is started.
- Rationale: C243 establishes pre-dispatch schema/grant refusal; C246 establishes HX/Forge root containment; C245 establishes RF allowlisted child environment; C072 establishes source digest/current-grant admission; C031 establishes skill traversal refusal. These are scoped positives, not a global security certification. Audited basis: C243 ESTABLISHED; C245 ESTABLISHED; C246 ESTABLISHED; C072 ESTABLISHED; C031 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert revoked/missing grants, changed source digest, outside-root/symlink-escape inputs and skill traversal fail before provider/child invocation, with counters remaining zero.
  2. Assert a valid authorized in-root positive still starts once; discovery/contract reads never become invoke rights.
  3. Assert RF children receive only the declared environment allowlist and no planted ambient secret/selector; descendant-process cleanup is not inferred from the direct-child positive.
- Probe oracle: providers grant/scope/environment probes + execute real-extension D_grants/I_staleAndResume + agents p13-loader-positives; actual registration and child-env counters.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: No new control grants, exposure, credential propagation or safety-disablement is authorized. Child reaping C245 is separately retained as a lifecycle residual.
- Maps-to: W03/W06/W19 QoL-preserve confinement; extends live wb-f5y; extends EAT-R227, EAT-R228, EAT-R238 (prior text historical); coordinates with EAT-R367, EAT-R368, EAT-R369, EAT-R370, EAT-R371, EAT-R375.

## EAT-R390 — Preserve unknown and partial evidence distinctions

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Representation and adapter repairs MUST never promote missing, partial, stale or lower-tier evidence into current verified success.
- Rationale: The cited positives establish exact byte/truncation accounting, refused foreign cursors, phase-honest controls, noncausal comparison, UI cap visibility, no invented usage, producer pinning, component-only interop and loud producer drift. Their scopes differ; the shared preserved invariant is evidence-grade conservation, not complete correctness of all those features. Audited basis: C194 ESTABLISHED; C195 ESTABLISHED; C196 ESTABLISHED; C198 ESTABLISHED; C114 ESTABLISHED; C175 ESTABLISHED; C094 ESTABLISHED; C132 ESTABLISHED; C133 ESTABLISHED; C247 ESTABLISHED; C041 ESTABLISHED, at ce180d82 on 2026-11-11.
- Acceptance criteria:
  1. Assert cap truncation and evicted-event gaps retain explicit counts/partial markers; foreign cursor never restarts silently at zero.
  2. Assert requested/acknowledged/settled control phases remain separate, absent usage remains absent and compare with unmeasured basis declines precision/causation.
  3. Assert native RF version/key drift produces a named live-tier failure or BLOCKED evidence, not a skip; runtime compatibility can continue only with truthful actual producer identity.
  4. Assert component interop helpers, saved detached observations and injected adapters cannot certify current native lifecycle or function support without their named registered/native gate.
- Probe oracle: observe A/B/H probes and qa/workbench/tool-reply-bench.mjs; inspector p20; node-rpc structured-output/resume probes; vitest.rf.config.ts drift oracle (providers/vitest-rf-preview.log red baseline) + interop probe-execute-refusal and rf --no-commit control.
- Evidence tier target: V6 (NOT_RUN; lower-tier controls also required).
- Conditions/unknowns: wb-9x5.10/.16 are consolidated into wb-9x5.11; wb-752.12 into wb-752.13. Exact terminal geometry/performance and richer positive behaviors require their own retained residual tests, not certification by this single truth-invariant row.
- Maps-to: W13-W17/W21 QoL-preserve evidence honesty; extends live wb-79k.3, wb-752.13, wb-h8f.7, wb-h8f.2, wb-9x5.11, wb-yiu4; extends EAT-R248, EAT-R263, EAT-R287, EAT-R289, EAT-R310 (prior text historical); coordinates with EAT-R374, EAT-R387.

## Explicit disposition — capacity is not closure

Every own-family claim has a disposition below. **DEFERRED_FOR_RANGE_CAPACITY** means the parent must allocate a later atomic requirement or carry an explicit unfiled residual; it is not DONE and must not be omitted from a full-system bead plan. A mapped compound claim covers only the invariant in its requirement statement; independent residuals remain named.

| Claim | Grade | Kind | Requirement/disposition | Independent residual or scope guard |
|---|---|---|---|---|
| C199 | ESTABLISHED | defect | compiled: EAT-R376 | implementation residual: Actual registry publication remains a separate policy/approval, not the corrected install recipe. |
| C200 | ESTABLISHED | defect | compiled: EAT-R377 | implementation residual: CI historical pass is not inferred; fresh adopted-floor run required. |
| C201 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Reword both to 'release gate is Forge-controlled; GitHub CI is a compat canary only' (one-line edits). |
| C202 | ESTABLISHED | defect | compiled: EAT-R377 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C203 | ESTABLISHED | defect | compiled: EAT-R327 | implementation residual: Tool-reference reach compiled in R327; no duplicate repair. |
| C204 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Receipts/TRACEABILITY pack slimming remains a product boundary decision. |
| C205 | SUPPORTED | defect | compiled: EAT-R378 | implementation residual: No stale artifact was reproduced; R378 is risk control with a planted mismatch oracle. |
| C206 | ESTABLISHED | positive | compiled: EAT-R378, EAT-R388 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C207 | ESTABLISHED | positive | compiled: EAT-R378, EAT-R388 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C208 | ESTABLISHED | positive | compiled: EAT-R377, EAT-R388 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C209 | SUPPORTED | defect | compiled: EAT-R387 | implementation residual: R387 repairs status scope/freshness; a fully regenerated measured-row census still requires current feature receipts. |
| C210 | SUPPORTED | defect | compiled: EAT-R376 | implementation residual: Fork name/version/repository/homepage distribution policy remains uncompiled NORMATIVE_DECISION. |
| C211 | ESTABLISHED | positive | compiled: EAT-R378, EAT-R388 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C212 | SUPPORTED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Single-source packaging allow/deny policy remains uncompiled. |
| C213 | SUPPORTED | defect | compiled: EAT-R339 | implementation residual: Skill/doc packaging coherence compiled in R339; no duplicate repair. |
| C214 | ESTABLISHED | positive | compiled: EAT-R377, EAT-R388 | implementation residual: Preserve command-doc/CI script parity with its own drift guard; R388 only artifact admission. |
| C215 | SUPPORTED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Optional/lazy designer TypeScript loading remains an uncompiled SUPPORTED QoL choice; exact pins are not casually removed. |
| C216 | PLAUSIBLE | defect | compiled: EAT-R376, EAT-R480 | implementation residual: R480 acquires remote media evidence only; publishing identity/media URL policy remains an unadopted distribution decision. No publication authorized. |
| C217 | ESTABLISHED | defect | compiled: EAT-R366 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C218 | ESTABLISHED | defect | compiled: EAT-R366 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C219 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | HX pagination/cursor/output-budget projection remains uncompiled; R366 fixes answer semantics only. |
| C220 | ESTABLISHED | defect | compiled: EAT-R368 | implementation residual: Native inspect/observe functionality remains separate from static contract retrieval R368. |
| C221 | ESTABLISHED | defect | compiled: EAT-R367 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C222 | ESTABLISHED | defect | compiled: EAT-R367 | implementation residual: Non-envelope stderr cause is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed; test/workbench-rf-stderr-receipt-capture-census.test.ts); preserve actual exit status without claiming stderr capture. |
| C223 | ESTABLISHED | defect | compiled: EAT-R367 | implementation residual: 1024-byte diagnostic standard is proposed; implement bounded codepoint-safe representation, not native source expansion. |
| C224 | ESTABLISHED | defect | compiled: EAT-R373 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C225 | ESTABLISHED | defect | compiled: EAT-R374, EAT-R387 | implementation residual: Claude-topology production wiring remains uncompiled; R374 covers only HX/RF. |
| C226 | ESTABLISHED | defect | compiled: EAT-R371 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C227 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Fresh RF producer/result-key contract recapture and standing drift trigger remain uncompiled; R390 preserves loud drift, not a pin bump. |
| C228 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Document one valid id in the worked example and the property description; surface rf's hint; optionally accept contextWindow/maxOutput as an explicit third input arm. |
| C229 | ESTABLISHED | defect | compiled: EAT-R363 | implementation residual: Schema first-failing-path/oneOf diagnostic compiled in R363; no duplicate schema repair. |
| C230 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Add description, examples (hx.fs/regular-file) and default to the schema properties; require root explicitly or state the default in the contract; point at `hx schema list` for kinds. |
| C231 | ESTABLISHED | defect | compiled: EAT-R369 | implementation residual: Installed worked role/grant configuration is a documentation leg to R327/R325, not a second missing-grant runtime obligation. |
| C232 | ESTABLISHED | defect | compiled: EAT-R370 | implementation residual: Doctor/preflight binary presence/version listing remains uncompiled. |
| C233 | ESTABLISHED | defect | compiled: EAT-R372 | implementation residual: General capabilityLimits and nodeCap operator knobs remain uncompiled; R372 only deadline composition. |
| C234 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Backend-sensitive node() advertising, provider ID enumeration and catchable-error wording remain uncompiled (also C164/C157). |
| C235 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Emit tool:'workbench_catalog' from the capability catalog builder (one literal plus its type). |
| C236 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Hold one initialised connection per registry scope for reads (closed at session_shutdown, as forge_gate_run connections already are) or batch targets in one connection. |
| C237 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Offer a compact projection by default (RF: output.text, render basis, budget summary, diagnostics; HX: answers, completeness, licenses_absence) with the full native source behind an explicit flag; fix the worked example to return counts, not certificates. |
| C238 | ESTABLISHED | defect | compiled: EAT-R483 | implementation residual: State the process side effect in the descriptor and docs/workbench/13; surface a notice when a preview's rf child launches a server; decide whether session_shutdown should offer `rf storage local-servers --idle` as a hint. Bind-address unknown RESOLVED by probes/reqset-rollup/c238-bind-address.txt; R483 is explicit-loopback regression only. |
| C239 | ESTABLISHED | defect | compiled: EAT-R375 | implementation residual: Registry-derived id rosters/extensibility checklist remain uncompiled; R375 only failure isolation. |
| C240 | ESTABLISHED | defect | compiled: EAT-R367 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C241 | SUPPORTED | defect | compiled: EAT-R481 | implementation residual: Resolve hx through the SDK's own PATH lookup in the test, and make the probes take the repository root (or require the argument). R481 acquires cross-host evidence only. |
| C242 | ESTABLISHED | positive | compiled: EAT-R368 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C243 | ESTABLISHED | positive | compiled: EAT-R369, EAT-R389 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C244 | ESTABLISHED | positive | compiled: EAT-R367 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C245 | ESTABLISHED | positive | compiled: EAT-R372, EAT-R389, EAT-R482 | implementation residual: Direct-child/environment positive retained by R372/R389; R482 acquires the distinct grandchild stdout-pipe lifecycle leg, not a cleanup guarantee. |
| C246 | ESTABLISHED | positive | compiled: EAT-R374, EAT-R389 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C247 | ESTABLISHED | positive | compiled: EAT-R390 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C248 | ESTABLISHED | defect | compiled: EAT-R379 | implementation residual: bypassQueue concurrency containment remains an independent risk-control choice after timer-domain repair. |
| C249 | ESTABLISHED | defect | compiled: EAT-R379, EAT-R383 | implementation residual: Invalid enabled-state cleanup is part of error-delivery acceptance; general minimum-rate/concurrency policy is not. |
| C250 | ESTABLISHED | defect | compiled: EAT-R380 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C251 | ESTABLISHED | defect | compiled: EAT-R382 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C252 | ESTABLISHED | defect | compiled: EAT-R381 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C253 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Next-fire timing correctness, width-aware schedule menu and edit/run-now actions remain separate uncompiled obligations. |
| C254 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Cron validation no-timer-leak repair remains uncompiled; existing croner scheduledJobs count is not a complete leak detector. |
| C255 | ESTABLISHED | defect | compiled: EAT-R383 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C256 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Duplicate-description job identity/name policy remains uncompiled. |
| C257 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Model-facing list/inspect/cancel schedule tools remain uncompiled; document lifetime without pretending management exists. |
| C258 | ESTABLISHED | defect | compiled: EAT-R386 | implementation residual: Orphan store adoption/cleanup and deleteFileIfEmpty production caller remain uncompiled; R386 owns disclosure only. |
| C259 | SUPPORTED | defect | compiled: EAT-R386 | implementation residual: Scheduled transcript creation remains uncompiled and SUPPORTED; R386 only discloses actual behavior. |
| C260 | ESTABLISHED | defect | compiled: EAT-R386 | implementation residual: IANA timezone selector and resolved local+UTC next-run reply remain independent uncompiled behaviors. |
| C261 | ESTABLISHED | defect | compiled: EAT-R384 | implementation residual: Strict/coercion policy remains a separate decision; diagnostics do not silently change accepted types. |
| C262 | ESTABLISHED | defect | compiled: EAT-R385 | implementation residual: none beyond the named invariant; no blanket claim closure |
| C263 | ESTABLISHED | defect | compiled: EAT-R386 | implementation residual: Model-only docs journey must be driven on a fresh install; generated surface.json is not the reader oracle. |
| C264 | ESTABLISHED | defect | DEFERRED_FOR_RANGE_CAPACITY — follow-on atomic requirement still owed | Memory byte cap/truncation marker remains uncompiled; line count alone does not bound context. |
| C265 | ESTABLISHED | positive | compiled: EAT-R381, EAT-R382 | implementation residual: Normal-store atomic/stale-lock/lazy-directory positives are controls for R381/R382, not a guarantee on arbitrary filesystems. |
| C266 | ESTABLISHED | positive | compiled: EAT-R380 | implementation residual: Schema removal and refusal ordering preserved in R380; full token-spec baseline has a separate positive control. |
| C267 | ESTABLISHED | positive | compiled: EAT-R379, EAT-R384 | implementation residual: Past one-shot/malformed JSON/false fallback controls attach to R379/R384, with source-specific evidence retained. |

## Cross-family scope not silently implemented

- C014/C051 result retention/retrieval, C048/C068/C178 run enumeration, C054 embedded model stop, C257 schedule management: distinct lifecycle requirements remain owed. R343 covers detached cancel only; R357 disk identity recovery is not a run-list or result store. Parent must file these missing requirements separately.
- C002 fail-open agent fallback, C005 frontmatter validation, C021 model-scope syntax, C003/C050/C052 headless work custody, C062 workflow master-switch bypass: established high-impact unselected defects; do not infer cure from settings diagnostics, docs or the native positive guards.
- C049 executable identity, C055 policy application/refusal, C063 function dispatch, C069 shared admission, C078 Furnace control verbs, C102 plus/follow controls, C119 production coordination/collective entrypoints, C126 descriptor invocability, C169 observe mode, C182 aggregates/events/relations, C184 metrics, C185 latency/proposal: R387 makes their measured state honest only. Implement through separate atomic requirements and existing owners, notably MNI P02 wb-y0n6, P03 wb-2ukh, P04 wb-4bxo, P10 wb-yiu4, wb-h8f.7/.2, wb-752.13 and wb-79k.3. No fictitious native API or invocation right is added by status wording.
- C116 content-vs-line doc census and C120 same-cut changed-path enforcement are prerequisites to moving live status text; frozen historical byte pins require owner-governed advance or annotations, not incidental rewriting. C117 master-only corrections must be merged deliberately before any live present-tense claim, not treated as having changed this pin.
- Schema C229 is a corroborating real-provider/oneOf leg of R363, not new scope. C157 is a provider-input table leg of R327; C164/C234 are backend-aware description/error residuals. C083 is a Furnace observer diagnostic leg to extend R349/R367, not proof that R349 already fixed its cause. C044 module-format repair and C193 benchmark progress are still uncompiled.
- No UNDETERMINED top-level ledger row exists. Embedded uncertainty still travels: C120 external machine enforcement, C238 unexamined listening bind, C216 remote media render, C241 cross-host portability, C245 grandchild pipe custody. Missing experiments cannot be filled by wording.

## Positive regression queue

All 43 positives remain upstream obligations, not broad correctness claims. Selected exact-artifact (R388), confinement (R389) and evidence-conservation (R390) invariants cover only their stated forms. Retain focused regressions for C027/C028/C029/C030/C031/C032 (strict roster, loader containment, live-resume refusal, compact spec, traversal, suite evidence); C041/C042 (compact honest receipts, never-reuse/lifecycle); C072-C075 (digest/grants, actionable script misuse, concise launch and golden examples); C093/C094 (read-only native store and phase/provenance); C112-C114 (geometry/injection bounds, measured navigation and cap/control honesty); C132/C133 (seam controls and no-commit truth); C153-C155 (effect tripwire, one-spend decisions and killed-worktree preservation); C174/C175 (typed catchable errors, schema/session/usage honesty); C194-C198 (exact bytes, cursor binding, control phases, addressability, noncausal comparison); C206-C208/C211/C214 (pack/install/checksums/identity/commands); C242-C247 (staged discovery, pre-dispatch refusal, native causes, RF env/reap, scope, drift); C265-C267 (atomic store, disabled schema, past-time/config refusal). Parent must map unselected positives to dedicated narrow regression requirements or existing tests, never close them solely on this roll-up.

## Compilation audit interface

- Exactly 25 unique contiguous IDs R366..R390; one matching JSONL map row per ID, exact claim grades copied from the ledger. No invented claim or Bead ID.
- NOT_RUN acceptance state for every row. Normative numeric diagnostic budget is explicitly chosen; observed timing/counts stay pin-scoped. SUPPORTED and PLAUSIBLE premises are not promoted; C216 remote rendering remains an acquisition residual.
- Active bead consolidation is recorded separately from source evidence. Read back again before amendments. Parent owns broad residual reconciliation across r-lx/r-ops/r-platform and any later shard; this file does not certify an exhaustive implementation-ready set.

## Roll-up custody precedence (F-08)

REQUIREMENTS.md and CLAIM-REQUIREMENT-MAP.jsonl are the canonical disposition index. Earlier capacity/coverage prose is historical shard selection, not a second active disposition. New full rows R471..R488 and attachments supersede an earlier blanket deferral only for the named invariant; all implementation residuals are retained in the canonical per-claim table. C238 bind-address unknown is RESOLVED by probes/reqset-rollup/c238-bind-address.txt; daemon disclosure/reclamation remains residual. No row of R311..R390 was re-derived.
