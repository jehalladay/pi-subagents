# Atomic requirements — r-ops

PHASE 10 compilation, 2026-11-11. **EAT-R341..EAT-R365 (25 atomic obligations)**. Target: Pi-subagents v0.20.0 at ce180d82f9385a315ff26bd8e7f9202cac19f5b3. These are specifications and planned acceptance assertions, **NOT_RUN**; no repair, green gate, native launch or bead creation is claimed by this compilation.

## Substrate, scope and oracle contract

- Inputs: epistemic-triage/CLAIMS.jsonl (267 final rows), REMEDIATION.md, CONTRADICTIONS.md, EPISTEMIC-AUDIT.md and dossiers C034/C037/C134/C136. Every rationale retains the claim's final grade and pin-time scope. Claims from other audit generations have their own namespaces; `priorEAT` is lineage, never a claim-ID join.
- Allocated capacity is 25 IDs for five families containing 99 claims / 87 defects. Selection prioritizes reproduced safety/recovery loss, registered control failures, and production inspector/error wiring. **This shard does not exhaust those families.** Unselected defects are itemized below as deferred follow-on requirements, not implicitly closed or absorbed into compound obligations. Parent compilation must retain that residual queue before claiming a full audit handoff.
- Registered-path oracle: capture the actual tool definitions from the booted src/index.ts extension and invoke those objects; helper-only tests do not discharge registered behavior. Existing probe files document the red state and must be inverted/extended into assertions of the required behavior. Preserve red baseline receipts before implementation.
- Probe paths below are relative to this run's `probes/`; repo tests are relative to the pinned checkout. Tests execute inside the pin or admitted implementation worktree, never live checkouts. Every acceptance run records source pin, argv, return status and producer receipt. Direct injected callbacks are V3, never native proof.
- V targets follow the prior MNI ladder: V1 focused red/green and mutants, V3 registered routing with injected finite callbacks, V5 crash/restart/operational/UX trials, V6 actual optional Furnace/HX/RF producers. V2/V4 are specifically packed Mechanical ABI/native interop tiers and are not silently awarded here. No V target means the requirement has already passed. L0–L10 matrix ownership stays with the parent aggregate compiler; each row supplies a named oracle for that matrix.
- Native acceptance: missing runtime, credentials or fixture => BLOCKED with exact missing artifact, never a synthetic native pass. Furnace control probes operate on newly created disposable runs only; operator confirmation/host authority is not fabricated by a tool parameter. Read-only observation preserves native store bytes.
- Instrument receipt for this compile: `hx --workspace <pin> exports src/workflow/journal-compat.ts --best-effort` reports typed bindings including classifier support types; partial language coverage proves no cross-module absence. `hx git refs` reports detached HEAD; native source spot checks confirm the cited paused-admission, workflowTasks and no-registry branches. `rf --json --version` reports ok true, 89 leaves, source/dist 0.1.883, mismatch false. Native rf/hx/Furnace probe receipts remain the investigators' ledger evidence, not rerun or stronger claims from this compile.
- Bead status readback (2026-11-11, live bd show): wb-6ze.15/wb-752.13/wb-9x5.11 are in progress; wb-79k.3/wb-0kg.3/wb-h8f.7 are open. wb-79k.1/.2 and wb-752.12 are closed consolidated precursors; wb-9x5.10/.16 consolidate into wb-9x5.11. Mappings are extensions/dependencies, not permission to modify those stores or claims the pin defect persists at today's live tip. Re-pin and check overlapping cuts before filing.

## EAT-R341 — Resolve the extension-owned detached base before safety checks

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The registered detached launch paths MUST resolve their extension-owned default base to its real path before applying the existing owner/mode/ancestor safety checks.
- Rationale: C034 ESTABLISHED, at ce180d82, 2026-11-11. P8 established refusal on the standard symlinked /home layout; it does not justify accepting arbitrary caller-controlled symlinks.
- Acceptance criteria:
  1. Assert both workflow_detached launch and workflow_execute(hostMode:detached) launch successfully with a hermetic symlinked HOME whose resolved base is private and owned by the current UID.
  2. Assert unsafe permissions, foreign ownership and replaced ancestors still refuse before host spawn.
- Probe oracle: detached/probe-main.mjs P8, extended to both registered tool objects; host process-count and filesystem-owner oracle.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W08/W18 detached environment; existing live lineage wb-0kg.3.

## EAT-R342 — Keep completion distinct from result omission

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The detached terminal classifier MUST retain terminal completed when a successful return value exceeds the bounded snapshot contract, reporting result omission separately.
- Rationale: C037 ESTABLISHED, at ce180d82, 2026-11-11. P5 reproduced terminal failed for a completed 300 KiB result; native effect success is not inferred from the classifier alone.
- Acceptance criteria:
  1. Assert return "x".repeat(300*1024) produces terminal completed, no inlined oversized result and typed exceeds-snapshot-bound omission.
  2. Assert a genuinely thrown workflow error still reports failed; every serialized snapshot stays within its declared byte bound.
- Probe oracle: detached/probe-main.mjs P5 with success/throw controls.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W08 detached verdict; existing live lineage wb-0kg.3.

## EAT-R343 — Make authorized detached stop reachable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The registered detached lifecycle MUST admit cancellation of a launched invocation when the host-bound caller holds the exact control grant and the producer confirms lifecycle ownership.
- Rationale: C033 ESTABLISHED; C042 ESTABLISHED, at ce180d82, 2026-11-11. P2 reproduced host cancel-grant denial and production ownership wiring is absent on the detection surface in C033; fully permissioned helper-host cancellation works (C042), not registered cancellation.
- Acceptance criteria:
  1. Assert a registered launch followed by an authorized workflow_control cancel issues exactly one native cancel and readback records its terminal outcome.
  2. Assert observe-only, missing control grant, foreign scope and mismatched host identity issue zero cancel commands; inspection alone never mints a control right.
- Probe oracle: detached P2 plus test/workbench-detached-control-live.test.ts promoted from manually seeded projection to registered launch/inspect/control.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: No blanket auto-grant: host permissions must derive from existing host authority, never model input. Extends the script path only; optional MNI P11 remains separate.
- Maps-to: W13-Gw/VC-7 owned control; existing live lineage wb-79k.3, wb-0kg.3; extends EAT-R296.

## EAT-R344 — Classify detached transport loss

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Detached inspect MUST return a typed transport-loss cause that distinguishes a never-existing invocation from missing socket, connection refusal and transport timeout.
- Rationale: C036 ESTABLISHED, at ce180d82, 2026-11-11. P1/P3/P4 reproduced identical typed unknown states with only raw errno distinguishing retirement, crash and nonexistent ID; missing socket alone must not prove graceful retirement.
- Acceptance criteria:
  1. Assert nonexistent ID yields no-such-invocation and no claim that a host was lost or native effects occurred.
  2. Assert P1/P3 yield socket-missing/connection-refused respectively, terminal remains unknown without a durable terminal observation, and simulated timeout has its own code.
- Probe oracle: detached/probe-main.mjs P1/P3/P4 plus timeout fixture.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W08 detached recovery; existing live lineage wb-0kg.3; extends EAT-R296.

## EAT-R345 — Retain a labeled detached terminal observation

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: A detached host MUST persist a bounded, explicitly saved terminal observation before retiring its retention socket.
- Rationale: C035 ESTABLISHED; C041 ESTABLISHED, at ce180d82, 2026-11-11. P1 established terminal/result loss after 1.5 s retention; persisting an observation is an explicit product decision, not resurrection of JavaScript state or proof of current host liveness.
- Acceptance criteria:
  1. Assert completion with a small result followed by expiry and fresh-process inspect returns the saved terminal verdict/result digest and bounded result marked saved, not current/live.
  2. Assert host kill before completion has no invented terminal verdict; control cannot derive authority from the saved observation.
- Probe oracle: detached/probe-main.mjs P1/P3; invocation-directory bytes and independent fresh-client oracle.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: Owner ruling 2026-11-11: the shipped docs/workbench/08 contract stands — inspection after host loss reports unknown with reconciliation guidance, never a replayed verdict; wb-0kg.3's falsifier is affirmed. EAT-R345's graceful-retirement/saved-observation distinction is deferred as a NORMATIVE_DESIGN candidate for the next program revision; every R345 cell stays A*(G-RULING) BLOCKED until a docs/08 amendment is separately adopted. The historical statement is retained as a candidate only, not implementation authority; preserve C041 receipt honesty and never-reuse rule.
- Maps-to: W08 durable result QoL; existing live lineage wb-0kg.3; extends EAT-R296.

## EAT-R346 — Ingest Furnace topology on the registered observe path

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Registered furnace_observe MUST apply the observer-produced snapshots and native-confirmed relations to the host-scoped ObservationProjection.
- Rationale: C076 ESTABLISHED; C077 SUPPORTED; C093 ESTABLISHED, at ce180d82, 2026-11-11. C076 reproduced denied control under production refresh and permission after the missing relate loop; real stop settled after that loop. C077 only supports the missing follow-up ownership claim at its detection surface.
- Acceptance criteria:
  1. Assert a real observed Run and Attempt appear with the same native-confirmed Run-to-Attempt edge through the actual registered tool.
  2. Assert authorized run stop is reachable without manual projection seeding; foreign workspace and absent control grant send zero stop commands.
  3. Assert observe alone leaves the native store byte-identical.
- Probe oracle: furnace/control-harness.mjs C2/C4 and real-stop-harness.mjs, adapted to boot-extension tool capture; native runs.get plus store-byte oracle.
- Evidence tier target: V6 (NOT_RUN).
- Conditions / unknowns: wb-752.12 is a closed consolidated precursor, not a new open owner. C093 helper/live evidence is not proof of registered wiring.
- Maps-to: W13-Fw2/VC-4 observer wiring; existing live lineage wb-752.13; extends EAT-R297.

## EAT-R347 — Preserve Furnace refusal codes at the tool boundary

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_control MUST preserve the typed FurnaceControlRefusal reason as the model-facing error code.
- Rationale: C079 ESTABLISHED, at ce180d82, 2026-11-11. C6 established own refusal exists but own code does not, causing executor-refused collapse; Forge has a similar shape but is not certified by this requirement.
- Acceptance criteria:
  1. Assert unsupported-verb, invalid-target, foreign-workspace, permit-consumed and aborted-before-issue each return their exact closed refusal code via the actual registered control tool.
  2. Assert no raw stack or arbitrary caller text enters the error code.
- Probe oracle: furnace/control-harness.mjs C6 and test/workbench-control-tool.test.ts; typed refusal table oracle.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W09/W17 control errors; existing live lineage wb-752.13.

## EAT-R348 — Keep Furnace control uncertainty observable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The registered Furnace control reply MUST retain the adapter-produced bounded uncertainty reason and native echo for uncertain executions.
- Rationale: C080 ESTABLISHED; C093 ESTABLISHED, at ce180d82, 2026-11-11. C7 established the adapter reason is dropped in the index summary; C093 protects phase honesty, not a claim that every uncertain action settled.
- Acceptance criteria:
  1. Assert seam-failure, wait-timeout, wait-aborted, no-target-echo and no-terminal-echo retain their exact reason under reply.control and status uncertain.
  2. Assert no uncertain adapter execution is relabeled settled or interpreted as producer-confirmed terminal success.
- Probe oracle: furnace/control-harness.mjs C7 and native control-live uncertain receipt rows.
- Evidence tier target: V6 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W09/VC-4 control uncertainty; existing live lineage wb-752.13.

## EAT-R349 — Bound furnace_observe in the shared tool-reply dialect

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Registered furnace_observe MUST return successes and refusals through the bounded sanitized workbench.tool-reply/v1 contract.
- Rationale: C082 ESTABLISHED; C091 ESTABLISHED; C094 ESTABLISHED, at ce180d82, 2026-11-11. P1/P2/P4 established raw FurnaceReading/prose dialect divergence; C091 measures 1624 bytes for one Attempt, not a universal token estimate; C094 requires producer provenance to remain available and text redacted. Corroborating mapping basis (F-08, no statement expansion): C083 ESTABLISHED.
- Acceptance criteria:
  1. Assert valid Run, invalid ID, missing grant and absent state root each produce one parseable shared-dialect envelope with typed ok/error state.
  2. Assert 20-Attempt and truncation fixtures respect a supplied bounded maxBytes contract with visible offered/returned/truncated counts; provenance remains retrievable without making saved data current.
- Probe oracle: furnace/observe-harness.mjs P1/P2/P4 + wb-752.13 registered reply-builder falsifiers.
- Evidence tier target: V6 (NOT_RUN).
- Conditions / unknowns: Current wb-752.13 is in progress and depends on shared builder work wb-h8f.7; acceptance must address a Run-scoped viewport rather than an arbitrary wf_ invocation. No edit to closed wb-752.12.
- Maps-to: W16-Bw2/VC-4 bounded observe; existing live lineage wb-752.13.

## EAT-R350 — Size workflow dialogs to the real overlay

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The workflow dialog MUST fit its layout to the actual overlay content rectangle rather than the full terminal dimensions.
- Rationale: C095 ESTABLISHED; C112 ESTABLISHED, at ce180d82, 2026-11-11. P01 reproduced clipping through the real pi-tui overlay at 80x24; C112 establishes pure-layout safety only, not overlay safety.
- Acceptance criteria:
  1. Assert at 80x24 with 12 and 200 legacy rows and 12 and 90 rich rows the composed overlay contains its selected row, bottom boundary and usable exit/control hint.
  2. Assert resize at the measured 30/40/50/60-row cases produces no hidden selected row or overflow beyond the overlay budget.
- Probe oracle: inspector/p01-overlay-clip.mjs, p01b-overlay-frames.mjs and p19-footer-80col.mjs using real TuiMainScreen compositeOverlays.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W15/VC-5 terminal geometry; existing live lineage wb-6ze.15, wb-9x5.11.

## EAT-R351 — Invalidate the live transcript card on progress

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The registered workflow tool MUST invalidate its hosted transcript result component when background progress changes and when the run settles.
- Rationale: C096 ESTABLISHED, at ce180d82, 2026-11-11. P18 boots the actual extension and real ToolExecutionComponent: finished task remains launch snapshot until explicit invalidate. A credentialed live pty card-counter capture remains UNDETERMINED within C096, not globally established.
- Acceptance criteria:
  1. Assert real ToolExecutionComponent changes from launch to finished state without expanding the tool or manually calling renderResult a second time.
  2. Assert completion after several progress changes schedules a final invalidation and no live timer continues after settled/disposed task.
  3. Assert a credentialed Pi pty receipt identifies transcript card text separately from the fleet row; missing credentials records BLOCKED, not PASS.
- Probe oracle: inspector/p18-card-liveness-real-extension.mjs and p17-card-liveness.mjs; explicit named live pty CARD-COUNTER gate.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: Hermetic real-component repro is ESTABLISHED; live pty CARD-COUNTER artifact is required for native UX certification.
- Maps-to: W15/W21 live card; existing live lineage wb-6ze.15, wb-9x5.11.

## EAT-R352 — Make inspector freshness reflect production observation

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The workflow production observation seam MUST convey currentness from confirmed sequenced in-process observation instead of leaving every live row unknown.
- Rationale: C097 ESTABLISHED; C114 ESTABLISHED, at ce180d82, 2026-11-11. P08 establishes production-ingest unknown glyphs and stale attention counts, while test fixtures predominantly refresh. The absent credentialed four-view pty capture remains an explicit gate, not evidence of a working display.
- Acceptance criteria:
  1. Assert successful, failed and observed-running rows fed through the production onProgress path have truthful distinguishable glyph/status and currentness while the observing host is live.
  2. Assert host loss/observation timeout changes freshness to stale/unknown and never leaves a current success inferred from cached rows.
  3. Assert VC-5 status-glyph honesty falsifier runs in the credentialed live four-view pty receipt or records BLOCKED.
- Probe oracle: inspector/p08-production-shape.mjs plus wb-6ze.15 live four-view status-glyph oracle.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: Intervals/topology supply and event-only remainder suppression are separate deferred obligations; this row owns freshness only.
- Maps-to: W13/W15 freshness; existing live lineage wb-6ze.15, wb-79k.3.

## EAT-R353 — Keep run stop reachable from a rich-only inspector

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The dialog host MUST expose its wired run-stop action while displaying a live rich-only node workflow.
- Rationale: C098 ESTABLISHED; C114 ESTABLISHED, at ce180d82, 2026-11-11. P06 reproduced x ignored with no legacy agent rows, despite onKill being wired; closing remains deliberately non-cancelling (C114).
- Acceptance criteria:
  1. Assert node-only workflow with observations and onKill receives exactly one stop callback after x and advertises stop in its live footer.
  2. Assert Esc/q/Ctrl-C close only and invoke zero stop callbacks; settled or unwired host draws no stop affordance.
- Probe oracle: inspector/p06-node-only-no-controls.mjs via WorkflowDialog host.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: Pause reachability and g legacy fallback remain separately deferred; x uses existing host authority, not the read-only inspector reducer.
- Maps-to: W15/VC-5 operator stop; existing live lineage wb-6ze.15.

## EAT-R354 — Act on the inspector selected identity

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Inspector row actions MUST resolve the same stable node key used to draw the selected pointer.
- Rationale: C103 ESTABLISHED, at ce180d82, 2026-11-11. P05 reproduced c opening sess-8 while pointer remains sess-5 after FIFO eviction; retention fairness and initial-focus UX are distinct deferred fixes.
- Acceptance criteria:
  1. Assert after production-cap eviction Enter and transcript open target the pointer key, never the prior numeric offset.
  2. Assert a deleted selected key is explicitly unavailable/reselected before action and does not act on an unrelated replacement row.
- Probe oracle: inspector/p05-selection-index-drift.mjs with onOpenTranscript native-ref spy.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W15 inspector identity; existing live lineage wb-6ze.15, wb-9x5.11.

## EAT-R355 — Respect filter input mode before host shortcuts

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The workflow dialog MUST deliver printable text to an active inspector filter editor before applying view-toggle shortcuts.
- Rationale: C100 ESTABLISHED, at ce180d82, 2026-11-11. P22 reproduced typing forge switching to legacy at g; hidden-mode visibility, no-match messaging and clear-filter behavior are separately deferred.
- Acceptance criteria:
  1. Assert / then f,o,r,g,e leaves the rich inspector open with filter exactly forge.
  2. Assert g outside filter editing still performs the advertised toggle, while Escape exits editing according to the declared editor contract.
- Probe oracle: inspector/p22-filter-g-key.mjs with p04-filter-follow-focus.mjs controls.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W15 inspector filter; existing live lineage wb-6ze.15.

## EAT-R356 — Clip timeline bars to visible model intervals

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The timeline renderer MUST draw only the intersection of each model bar with the visible cell interval.
- Rationale: C105 ESTABLISHED; C113 ESTABLISHED, at ce180d82, 2026-11-11. P16 established disjoint source intervals appearing overlapped after pan; latency until production intervals arrive does not invalidate the builder-renderer seam defect. C113 protects navigation cost.
- Acceptance criteria:
  1. Assert A=[0,12), B=[15,20), pan=10 draws A in cells [0,2) and B in [5,10), with no drawn overlap.
  2. Assert left/right clipping markers occupy the first/last visible cells, not off-screen unclipped endpoints; no line exceeds viewport width.
- Probe oracle: inspector/p16-timeline-left-clip.mjs and p15b-timeline-bar-cells.mjs over buildTimelineLanes output.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: wb-9x5.16 is closed consolidated lineage under wb-9x5.11; long-run fit-to-span remains a distinct deferred design obligation.
- Maps-to: W15/W21 timeline geometry; existing live lineage wb-9x5.11, wb-6ze.15.

## EAT-R357 — Recover journal-backed run identity after restart

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Workflow recovery MUST resolve a known run from its host-scoped durable script/journal metadata after Pi process restart, without treating it as never-run.
- Rationale: C134 ESTABLISHED; C146 ESTABLISHED; C153 ESTABLISHED, at ce180d82, 2026-11-11. P01 established same-cwd/session restart dead ID although files exist; duplicate-effect stand-in in P01b is probe-only (C145 ESTABLISHED: no shipped capability produces a reconcilable row), so actual shipped effect duplication is not claimed.
- Acceptance criteria:
  1. Assert fresh extension in the same authorized scope resolves prior run for resume/reconcile inspection from disk and identifies its unsettled dispatched marker.
  2. Assert marker-bound resume invokes the effect stand-in zero additional times and does not advise an unconditional fresh run.
  3. Assert foreign workspace/operator/session identity cannot recover or control the run through a model-supplied path.
- Probe oracle: journal/p01-restart.probe.ts and p01b-restart-duplicate.probe.ts; two-extension-process journal-byte and provider-call-count oracle.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: Recover only admitted stored metadata; current journals lack some metadata required for exact args/basis reconstruction. No new script dispatch while recovery state is ambiguous.
- Maps-to: W12 durable recovery/MNI P06-P09; new atomic cut, no exact live W/VC container established; extends EAT-R256, EAT-R278.

## EAT-R358 — Journal only actual provider-dispatch uncertainty

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The node admission path MUST distinguish refusals before provider invocation from dispatched effects so pre-dispatch validation or grant failures do not poison later resume.
- Rationale: C135 ESTABLISHED; C153 ESTABLISHED, at ce180d82, 2026-11-11. P07b reproduced typo poisoning with shipped reads; P07-G uses an effectful stand-in and proves zero provider invocations before refusal, not shipped writes.
- Acceptance criteria:
  1. Assert unknown ID, invalid schema and missing invoke grant each record no dispatched-effect marker and invoke the provider zero times.
  2. Assert corrected input/grant resumes past a pre-dispatch refusal without an impossible reconcile duty.
  3. Assert an admitted non-read call still writes/readbacks its marker before invoking the provider; failed marker persistence refuses dispatch.
- Probe oracle: journal/p07b-typo-poison-nomock.probe.ts and p07-predispatch-poison.probe.ts plus dispatch-wiring marker-order spy.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W12/node admission/MNI P06-P09; new atomic cut, no exact live W/VC container established; extends EAT-R238, EAT-R256.

## EAT-R359 — Fail closed when an override spend cannot persist

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A resume MUST refuse an override-authorized dispatch unless its source-journal spend record was durably appended and verified.
- Rationale: C138 ESTABLISHED; C154 ESTABLISHED, at ce180d82, 2026-11-11. P06 established repeated execution when source mode 0444 prevents spend; effectful producer is a stand-in and exposure remains latent for shipped capabilities.
- Acceptance criteria:
  1. Assert source journal becomes unappendable after authorization: resume returns typed spend-persistence refusal and provider invocation count remains unchanged.
  2. Assert writable control spends once, first authorized resume invokes once and second resume invokes zero times.
- Probe oracle: journal/p06-override-spend.probe.ts with mode 0444 control and readback oracle.
- Evidence tier target: V5 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W12 reconcile spend/MNI P09; new atomic cut, no exact live W/VC container established; extends EAT-R256, EAT-R278.

## EAT-R360 — Classify raw journal compatibility before resume

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Resume admission MUST invoke the landed journal compatibility classifier on raw source-journal bytes before allowing replay or new dispatch.
- Rationale: C144 ESTABLISHED; C175 ESTABLISHED, at ce180d82, 2026-11-11. P09-C established dropped unknown-kind effect rows re-executed while classifier reports unsupported; hx exports verifies classifier exists but partial references cannot establish absence, which is bounded to grep call-site surface in C144.
- Acceptance criteria:
  1. Assert a journal with dropped node/unknown-kind rows is refused before new node/provider dispatch and exposes the compatibility verdict plus bounded warning.
  2. Assert compatible settled read/agent journal still replays according to its basis and unclassified readable rows remain fail-closed.
- Probe oracle: journal/p09-runtime.probe.ts dropped-effect-row case plus test/workflow-journal-compat.test.ts; raw bytes/readJournal/classifyJournal oracle.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W12/W21 compatibility/MNI P09; new atomic cut, no exact live W/VC container established; extends EAT-R256.

## EAT-R361 — Explain the first replay decline

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A workflow resume MUST expose the first typed reason that a recorded prefix cannot be replayed before or at its first newly paid agent call.
- Rationale: C136 ESTABLISHED; C137 ESTABLISHED; C159 ESTABLISHED, at ce180d82, 2026-11-11. P09-D/P08/probe3 established silent decline across basis, failed entry, edited prompt, resumed journal and replay-unsafe cases; C136 establishes the 2001-path cap and nonrepo decline, not that replacing it with a cheap hash is safe.
- Acceptance criteria:
  1. Assert control same-basis replay reports replayed count; each named decline emits one reason with position and changed basis dimension when known.
  2. Assert launch text counts recorded candidates, not guaranteed hits; >2000-path/non-Git unknown basis reports measured-unavailable rather than claiming cache hit.
  3. Assert the reason is present in both workflow log and notification without repeating an unbounded error payload.
- Probe oracle: journal/p09-runtime.probe.ts D, p08-silent-decline.probe.ts, p14-replay-cap.probe.ts and node-rpc/probe3-declined-journal oracle.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: Removing the 2000-path cap and bare-resume argument inheritance are separate deferred obligations; conservative replay admission is preserved.
- Maps-to: W12 replay transparency/MNI P09; new atomic cut, no exact live W/VC container established.

## EAT-R362 — Reject paused live runs as resume sources

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Resume admission MUST reject a paused run whose execution/control is still live.
- Rationale: C160 ESTABLISHED, at ce180d82, 2026-11-11. probe8 established resolve.ok true for paused source; duplicate-tail execution is only PLAUSIBLE, not reproduced, and is not asserted as observed.
- Acceptance criteria:
  1. Assert running and paused sources return typed still-live refusal before journal copy or new worker launch.
  2. Assert finished/stopped compatible source remains admissible; pause/unpause does not create a second invocation.
- Probe oracle: node-rpc/probe8-resume-paused-run.out.txt scenario moved to resolveResumeTarget + registered SubagentWorkflow worker-launch-count test.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W12 liveness/MNI P09; new atomic cut, no exact live W/VC container established; extends EAT-R256.

## EAT-R363 — Return actionable node schema diagnostics

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: node capability input validation MUST identify the first failing JSON path and expected constraint without echoing sensitive values.
- Rationale: C156 ESTABLISHED; C174 ESTABLISHED, at ce180d82, 2026-11-11. probe1 reproduced the same sentence for wrong type/missing key/extra key/null; C174 protects CapabilityError identity/category across RPC. Corroborating mapping basis (F-08, no statement expansion): C229 ESTABLISHED.
- Acceptance criteria:
  1. Assert wrong target type, missing target, disallowed extra key and null produce distinct path/constraint diagnostics with category validation and capability ID.
  2. Assert credential-like field values and control bytes are redacted; worker script catch still sees instanceof CapabilityError.
- Probe oracle: node-rpc/probe1-node-errors rows 1a/1b/1c/1o plus redaction/RPC round-trip oracle.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W05/W06 node validation/MNI P04; new atomic cut, no exact live W/VC container established; extends EAT-R238.

## EAT-R364 — Preserve capability diagnostics through task completion

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Workflow task completion MUST retain the runtime typed capability diagnostic in model-facing failure output.
- Rationale: C158 ESTABLISHED; C174 ESTABLISHED, at ce180d82, 2026-11-11. probe2 2b established capabilityError.category uncertain-effect in runtime result but absent from task; this requirement preserves the existing category vocabulary, not the separately proposed timeout/cancel split.
- Acceptance criteria:
  1. Assert validation, authorization, unavailable, transport and uncertain-effect runtime failures retain category and bounded code/reason in task result and completion notification.
  2. Assert the script-realm CapabilityError remains typed and no unrelated ordinary workflow error is falsely labeled a capability failure.
- Probe oracle: node-rpc/probe2-resume-and-notification scenario + completeWorkflowTask/formatWorkflowNotification/registered tool result assertions.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W05/W16 typed run errors/MNI P04; new atomic cut, no exact live W/VC container established.

## EAT-R365 — Count logical agents in completion notifications

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Workflow completion notifications MUST derive done/total from collapsed logical agent records rather than append-only progress events.
- Rationale: C147 ESTABLISHED, at ce180d82, 2026-11-11. P09-N established completed three-agent run printed 3/9; counts are a user-visible bug independent of native model availability.
- Acceptance criteria:
  1. Assert start/start/done events for each of three distinct agents produce 3/3 agents and complete true.
  2. Assert repeated progress for one agent does not raise total; replayed and failed logical agents preserve their individual status/count without fabricated model usage.
- Probe oracle: journal/p09-runtime.probe.ts N-notification-counts; collapsed agents vs raw-event stats oracle.
- Evidence tier target: V3 (NOT_RUN).
- Conditions / unknowns: none
- Maps-to: W15/W16 reply counts; new atomic cut, no exact live W/VC container established.

## Explicit residual disposition — follow-on IDs required

Rows marked **DEFERRED_FOR_RANGE_CAPACITY** remain uncompiled. Rows now marked `compiled: <id>; implementation residual: <text>` have one joined disposition under the roll-up (F-08); their residual text is not discharged by a related requirement. Preserve in the parent bead plan; allocate a follow-on atomic ID or explicitly adopt a separate decision before implementation. No ID outside R341..R365 is minted here.

| Claim | Grade | Family | Uncompiled remediation basis |
|---|---|---|---|
| C038 | SUPPORTED | detached | Derive providers from held grants at both launch sites (mirror the embedded registry's grant-driven set) or refuse at launch when the script's node() targets are unreachable. |
| C039 | SUPPORTED | detached | Add optional input (JSON), timeoutMs and retentionMs to workflow_detached's launch parameters and pass them through. |
| C040 | ESTABLISHED | detached | In the entrypoint catch, write a redacted error.json beside the boot pin before exit and have the launcher's pre-handshake error name that file. |
| C043 | ESTABLISHED | detached | Shorten the per-launch template (pw-<uid>- to p-) or hash the uid into the digest, and correct the matrix row to the formula (103 - len(tmpdir) - uid-dependent overhead). |
| C044 | ESTABLISHED | detached | Add "type":"module" to package.json (or emit the host entrypoint as .mjs). |
| C045 | ESTABLISHED | detached | compiled: EAT-R327; implementation residual: Tool-reference scope compiled in R327; no independent deferred tool-reference obligation remains. |
| C046 | SUPPORTED | detached | Per-action refusal: name the missing token and the workbench.capabilityGrants settings key. |
| C047 | SUPPORTED | detached | Accept bounded handshakeMs/idleMs launch params and append an idle-expiry/timeout row to controlAudit (or a terminal file) before stop(). |
| C048 | SUPPORTED | detached | Add action:'list' that reads the invocation directory and reports id, launchedAt, pid and socket-liveness per row. |
| C049 | SUPPORTED | detached | compiled: EAT-R387; implementation residual: Wire the executable-identity observation into receipt construction for absolute-path runtimes, or drop the field from the receipt contract until W18 lands. |
| C078 | ESTABLISHED | furnace | compiled: EAT-R387; implementation residual: Either extend NATIVE_CONTROL_ACTIONS.furnace to ['stop','pause','resume'] (pause/resume are non-destructive; keep stop under operator confirmation) and rule attempt-stop out (delete the row or give Attempt targets an owner-delegation rule), or delete the unreachable rows and reword matrix row 99 to 'run stop only'. |
| C081 | ESTABLISHED | furnace | Add a bounded `events` page (limit, after-cursor) to FurnaceReading via Events.list, set stream.runLifecycle to 'events list --after <cursor>' and cursor to the page's next_cursor; update the matrix caveat. |
| C083 | ESTABLISHED | furnace | compiled: EAT-R349, EAT-R367; implementation residual: Bounded sanitized Furnace diagnostic legs compiled in R349/R367; R367 non-envelope retention remains blocked by the landed custody pin. |
| C084 | ESTABLISHED | furnace | State 'the Run must live under <cwd>/.furnace (furnace -C <cwd>)' in the description and docs; optionally accept an allowlisted stateDir inside the bound workspace. |
| C085 | ESTABLISHED | furnace | Type.String({pattern:'^frn-run-[a-zA-Z0-9_-]{1,100}$', description:'Furnace Run id as `furnace run list --json` reports it'}), include the hint in the refusal text, and add a README subsection under Workbench mode. |
| C086 | ESTABLISHED | furnace | Expose the existing loader as a tool (`workflow_evidence {ref}`) or add optional {attemptId, stream, maxLines} params to furnace_observe that call readFurnaceAttemptLogEvidence under furnace:inspect. |
| C087 | ESTABLISHED | furnace | Give external Run snapshots a synthetic invocation (trace.invocationId `furnace:<runId>`) and list them in the inspector's workflow picker, reusing the existing tree/timeline over the topology from FURNACE-001. |
| C088 | ESTABLISHED | furnace | Extend live-furnace-vc4-launch.mjs with `--formula external-inspect --complete` (executor /usr/bin/true, wait for completed) and name the formula/state contract in docs/workflows.md:455. |
| C089 | ESTABLISHED | furnace | One PI_FURNACE_FIXTURE_* contract with a `mode` (completed/active) plus one launcher flag, and a preflight line in each tier that prints the expected prefix and variables before asserting. |
| C090 | SUPPORTED | furnace | Split FurnaceObserverLimits into SnapshotLimits {attemptLimit, logBytes, callTimeoutMs} and PollLimits, and derive the client timeout from callTimeoutMs. |
| C092 | ESTABLISHED | furnace | Export one FURNACE_RUN_ID regex from furnace-observer.ts and use it in the tool, in the capability inputSchema (`pattern`) and in furnace-evidence.ts. |
| C099 | ESTABLISHED | inspector | Make the footer view-aware (overview: '/ filter · f focus · ⏎ collapse · g controls'; timeline: '= - zoom · h l pan'; details: 'e next · ⏎ load · c transcript') and add the four-view key table to README ## Commands. |
| C101 | ESTABLISHED | inspector | Bind PgUp/PgDn/Home/End in both reducers (reuse createViewerKeys), make the rich filter a projection query by title or provider rather than a page-local narrowing, and add a requirement that any row is reachable within a stated number of keys. |
| C102 | ESTABLISHED | inspector | compiled: EAT-R387; implementation residual: Compare the printable character (data === '+') for zoom-in; either implement follow (keep the cursor on the newest row while it is on) or remove the key and the header word. |
| C104 | ESTABLISHED | inspector | Carry lastError and a small provider facts map (render id, verdict, coverage) on the observation node, draw them wrapped in details, and remove the constant Source line until a producer supplies one. |
| C106 | ESTABLISHED | inspector | Default to fit-to-span with a seconds-per-cell zoom, add page pan, format durations with formatDuration, and emit the phase-kinds note only when a producer could have supplied kinds. |
| C107 | ESTABLISHED | inspector | Pass panes: true and an ascii flag from one capability source (a workbench.tui setting or a TERM/locale probe) at workflow-dialog.ts:1316 and to layoutWorkflowDialog and renderWorkflowCard; add a wiring test that fails when the host omits them. |
| C108 | ESTABLISHED | inspector | Return a width-aware component (render(width) calling layoutWorkflowCard with that width) instead of a pre-laid-out Text, and cap agent rows per phase with a '+N more · /agents → Workflows' line. |
| C109 | ESTABLISHED | inspector | In elapsedMs also subtract (now - pausedAt) while paused (pass pausedAt through the dialog and card task objects) and give the fleet row the same elapsed value. |
| C110 | ESTABLISHED | inspector | compiled: EAT-R387; implementation residual: Status/evidence census wording compiled in R387; panes/ASCII production wiring remains independent C107 residual. |
| C111 | SUPPORTED | inspector | Add a short 'For agents' paragraph to README ## Commands and to docs/workbench/10 naming workflow_observe and workflow_control as the model-facing equivalent of the inspector, with a pointer to qa/workbench/inspector-smoke.mjs. |
| C139 | ESTABLISHED | journal | Return denials as JSON {contract, phase:'denied', policy, category, reason, field} (a field NAME is not caller text, so naming it keeps the no-echo rule); add a description to each parameter naming the actions that require it; put one worked call per action in docs/workflows.md. |
| C140 | ESTABLISHED | journal | Emit a complete `next` call (evidence:{capabilityId:<the position's first evidenceRead>, input:<its input skeleton, pre-filled from recordedNativeRefs>}) and omit it when evidenceReads is empty; filter the roster by `position`; journal label and dispatchedAt on node rows and show them; use one JSON dialect on all four surfaces and state the hint once in the notification. |
| C141 | ESTABLISHED | journal | On an uncertain refusal carry forward the bound decision rows with the node row; for settlement 'none' replace the `resume` member with the override call template for the same taskId. |
| C142 | ESTABLISHED | journal | compiled: EAT-R479; implementation residual: Bind a receipt to the journaled reference the read was ASKED about (an input that names the recorded id, verified in the result) instead of the read's own operation id; allowlist a read that inspects the effect's own object per producer (hx mutation show <id>, rf context show <render_id>); for producers with no declared read either accept noEvidenceReason 'no-read-capability' under the exact grant or make the runtime hint say 'fresh run only'. R479 acquires the NOT_RUN Forge leg only. |
| C143 | ESTABLISHED | journal | Give inspect limit/cursor and make `position` filter (the workbench.tool-reply/v1 paging the sibling tools use); cap `snapshot` with a byte-cap marker and its digest; return the record id instead of echoing `entry`; report an eviction in the evidence reply or persist receipts beside the journal. |
| C145 | ESTABLISHED | journal | compiled: EAT-R357; implementation residual: R357 maps the no-shipped-effectful-producer premise; a real effectful capability/grant/native journey remains uncompiled. |
| C148 | ESTABLISHED | journal | When ctx.hasUI, require ctx.ui.confirm for override and stamp how the decision was confirmed on the record (ui / tool-call); give the inspector's pending row a key that opens the same journey for a human. |
| C149 | ESTABLISHED | journal | Return a distinct variant ({hasChanges:true, missing:true, path}) for a vanished directory and append 'worktree directory missing at cleanup; its changes cannot be recovered' to the result. |
| C150 | ESTABLISHED | journal | Append the branch or kept-path note on the rejected path too (surface worktreeResult in get_subagent_result and the notification); at session_start list `git worktree list` entries under tmpdir named pi-agent-* and notify; add a 'Recovering a worktree' paragraph to README.md (git worktree list, commit from the kept directory, git worktree remove, git branch -D pi-agent-*). |
| C151 | SUPPORTED | journal | Add the journal and the persisted script to the README.md:637 list and the :4226 sentence; add a workflowJournal:false setting that passes no journal (resume then answers 'has no journal to resume from'). |
| C152 | SUPPORTED | journal | Pass a journal (a file beside the invocation's boot pin) to runWorkflow at local-detached.ts:730 and name its path in the lost-host snapshot's reconcileHint. |
| C157 | ESTABLISHED | node-rpc | compiled: EAT-R327; implementation residual: Provider-input reference scope compiled in R327; backend-aware runtime description/errors remain C164/C234 residuals. |
| C161 | ESTABLISHED | node-rpc | compiled: EAT-R387; implementation residual: Landed replay status wording compiled in R387; do not repin historical fixtures or infer new runtime replay guarantees. |
| C162 | ESTABLISHED | node-rpc | rewrite the sentence to the basis rule: replays only under an identical model/permission/tools/roles/grants/cwd/replay-dependency basis, otherwise runs live |
| C163 | ESTABLISHED | node-rpc | name the Claude-backend exclusions (minimal, isolation, gate) in the Workbench paragraph and make gate/isolation refusals consistent (both fatal before dispatch, or both null) |
| C164 | ESTABLISHED | node-rpc | message: 'node() needs the Claude workbench backend: set workbench.workflowAgentBackend="claude" and workbench.capabilityGrants in .pi/subagents.json'; optionally drop the node() line from the description when the backend is pi |
| C165 | ESTABLISHED | node-rpc | map each SDKResultError subtype to a coded sentence with a hint (e.g. 'CLAUDE_MAX_TURNS: the child hit the SDK turn cap; split the task or raise maxTurns') the way authRequiredError does |
| C166 | ESTABLISHED | node-rpc | add 'timeout' and 'cancelled' categories (or a `reason` field on CapabilityDiagnostic) and keep 'transport' for provider/protocol failures |
| C167 | ESTABLISHED | node-rpc | include `${path}` ('invoke(<id>) output') in the three byte-limit messages and classify an oversized provider answer as 'unavailable' (too large to transport) rather than caller validation |
| C168 | SUPPORTED | node-rpc | compiled: EAT-R372; implementation residual: General operator capabilityLimits and nodeCap knobs remain uncompiled; R372 compiles deadline composition only. |
| C169 | SUPPORTED | node-rpc | compiled: EAT-R387; implementation residual: remove 'observe' from the type until a dispatch path exists; either implement inspect() on at least one provider or stop listing inspect in supportedModes |
| C170 | ESTABLISHED | node-rpc | render `· from resume journal` / reconcile state before the result preview and clamp the preview to the remaining width; consider a distinct glyph for 'done, freshness unknown' with a legend |
| C171 | ESTABLISHED | node-rpc | render 'unclassified' when effectClass is empty; put the error once (status short, result full) in formatWorkflowNotification |
| C172 | ESTABLISHED | node-rpc | compiled: EAT-R387; implementation residual: Live-true feature/changelog wording compiled in R387; no separate duplicate status requirement. |
| C173 | SUPPORTED | node-rpc | document claude:transcript next to capabilityGrants; make the toast name `workbench.capabilityGrants` in .pi/subagents.json; add a 'more' key or limit prompt in the viewer |
| C176 | ESTABLISHED | node-rpc | ship a .hyperunix config (or document `--workspace src`) for hx users of this repo; file the json-schema.ts parse gap upstream against hx with the byte offsets |

### Partially addressed claims — independent residual obligations

Selected broad claim rows also contain independent defects not silently folded into the atomic statement:
- C033: shutdown reachability is separate from cancel; preserve a separate reviewed action/permission requirement.
- C036: persisted retirement vs crash interpretation is covered only when R345 supplies a saved observation; never infer retirement from ENOENT alone.
- C076/C077: exact work-readiness enrichment follows consolidated wb-752.12/wb-752.13; filing ownership/matrix correction is a separate traceability task.
- C082: synthetic Run invocation and operator picker reachability remain separate from the bounded reply requirement (C087 residual).
- C095: exit-first footer copy is separate from overlay layout; R350 only requires a usable visible hint.
- C096: progressVersion memoization is separate; do not weaken navigation/performance controls to implement invalidation.
- C097: intervals, observed parent topology, and suppressing event-only remainders remain follow-ons; R352 only owns truthful freshness. Credentialed four-view pty is explicitly required.
- C098: pause and legacy-node g fallback remain follow-ons; R353 owns stop only.
- C100: visible editing cursor, no-match row and clear-before-close remain follow-ons; R355 owns printable editor precedence only.
- C103: initial focus and per-run retention/fair eviction remain follow-ons; R354 owns action-key alignment only.
- C134/C146: session-start journal discovery notification, recovery documentation and one cross-session scope rule remain follow-ons; R357 owns scoped disk resolution after restart.
- C135: corrected guidance for truly unclassified historical rows remains a distinct representation fix.
- C136/C137: safe large-repo replay measurement and bare-resume recorded args remain follow-ons; R361 only owns truthful decline disclosure.
- C144: compatibility warning presentation is bounded under R360; comprehensive upgrade/downgrade compatibility policy remains a separate decision.
- C158: new timeout/cancel categories are C166 residual; R364 preserves existing typed information only.

### Positive regression obligations

Preserve C041/C042 (receipt/refusal honesty and detached lifecycle), C093/C094 (Furnace read-only/phase honesty/provenance/redaction), C112/C113/C114 (geometry/injection safety, navigation cost, cap visibility and close-is-not-stop), C153/C154/C155 (marker-before-effect, content-derived/idempotent decisions, non-destructive worktree preservation), C174/C175 (CapabilityError identity, structured output and fail-closed replay). They are controls on touched implementation, not 12 additional hidden obligations or claims that this compile reran them. Every touched path reruns its cited regression suite; critical assertions require single-change mutants, not solely old green suites.

### Non-mappings and uncertainty

wb-69g.12 and wb-h8f.2 are design/validate/compare acceptance containers, not r-ops repair owners; no unrelated extension is invented. wb-h8f.7 is the shared reply-builder prerequisite for R349. MNI P04/P06/P09/P11 lineage is conditional: these script/operator requirements do not certify the optional function host or close its native release gates. C142's live Forge binding artifact remains missing and explicitly deferred; C151 requires a real agent output with outputTranscript false; C152 requires effectful detached host kill/journal inspection. The ledger has no top-level UNDETERMINED rows, but these embedded unknowns remain evidence gates, not false empirical findings.

## Compilation audit / sibling integration

- Automated check: PASS — exactly 25 sequential IDs R341..R365, one map row per prose heading, every claim ID resolves, all mapped grades equal the final ledger, all rows carry an authority, a named probe oracle, a valid V target, pin scope and NOT_RUN. No ID collision or shared claim reference with the completed r-lx map was detected at this compile.
- Atomicity review: each numbered statement has one primary pass/fail behavior. Independent clauses from broad source claims are explicitly residual; regression acceptance constrains that behavior and is not a hidden feature bundle.
- Specialization links (same implementation container where appropriate, independent falsifier): R347→R334 control refusal contract; R348→R335 control summary contract; R349→R333 observe dialect; R352→R329 freshness; R363→R324 admission diagnostics; R364→R322 workflow failure output. Parent integrates the generic contract and these provider/host-specific tests rather than creating duplicate beads. Exact scopes still differ: R352 repairs production inspector currentness, not merely model reply labeling; R348 preserves adapter uncertainty the current summary drops.
- Residual accounting: 57 fully unselected defect claims are itemized above, plus the independent residual subclaims of selected rows. This range's bounded selection is NOT an exhaustive discharge of the r-ops families. No missing native artifact is converted into a PASS or removed from the follow-on queue.
- Deliverables: requirements/.work/req-r-ops.md and requirements/.work/map-r-ops.jsonl. These are scratch inputs to the parent consolidation/publishing/bead-generation step. No source repository was edited; no builds/tests/repair acceptance or bead writes were performed by this compiler.

## Roll-up custody precedence (F-08)

REQUIREMENTS.md and CLAIM-REQUIREMENT-MAP.jsonl are the canonical disposition index. Earlier capacity/coverage prose is historical shard selection, not a second active disposition. New full rows R471..R488 and attachments supersede an earlier blanket deferral only for the named invariant; all implementation residuals are retained in the canonical per-claim table. C238 bind-address unknown is RESOLVED by probes/reqset-rollup/c238-bind-address.txt; daemon disclosure/reclamation remains residual. No row of R311..R390 was re-derived.
