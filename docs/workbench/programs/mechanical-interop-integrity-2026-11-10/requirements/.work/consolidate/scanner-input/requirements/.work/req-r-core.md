# Atomic Requirements — MII consolidation

Program: `mechanical-interop-integrity-2026-11-10`. Consolidation stamp: **2026-11-11T11:12:44Z**. Range: **EAT-R391..EAT-R470, 80 rows**, unique and contiguous. **P0 for the first release**; the optional P11 / P12 packets are P2 and explicitly deferred below. Requirement force and claim warrant remain separate. Acceptance is **NOT_RUN** for every row; L0 is traceability only, never implementation acceptance.

This is the requirement-set consolidation of `REQUIREMENTS-AUDIT.md` (FAIL AS DRAFTED, repairable at consolidation). RA-01..RA-10 are applied from section 4; RA-11..RA-22 remain filing-time or next-text-cycle conditions unless explicitly marked text-resolved in `CONSOLIDATION.md`. The upstream audit is immutable. Original shards and their maps are retained read-only in `.work/`. `TDD-MATRIX.md` keeps the audited tier cells and gate verdicts; former L0 text findings are cleared only after their fixes, with the prior verdicts retained in `.work/consolidate/TDD-MATRIX.audit-input.md` and recorded in `CONSOLIDATION.md`.

No new requirement id is allocated. **R471..R488 belong to DX** (epic wb-9d2g + 15 packets); requests that cannot fit an existing row go to the **RANGE-EXHAUSTED candidates** table for the owner. No bead mutation, commit, native launch, test, build or runtime gate is performed by this consolidation.

## Pinned basis and compilation rules

- Document pin: Pi `3fc0ead1e99f854365fd4226f582eaf4f19f8858`, `docs/pi-README.md` and `pi-01..pi-05`; MW companion is context, not independent corroboration.
- Empirical environment pins: Pi `0fb9067262532289104417d2b7f2f25704563a75`; MW `69cb016dd293a17bcc893f2baf410a51c226f4c9`. Ledger adjudicated 2026-11-11. Claims do not silently transfer to later tips. Re-pin before implementation and append evidence deltas if any status changes.
- Authoritative compile sources: `epistemic-triage/CLAIMS.jsonl`, `REMEDIATION.md`, conditional `ARBITRATION-2026-11-11.md`, and the cited program sections. The JSONL map retains complete claim scope/time/source, embedded flags and remediation IDs. A row's NON-EPISTEMIC status never upgrades its empirical premises.
- Existing baseline: registered function execution is absent at the Pi pin; source/authority/descriptor guards are existing-but-unwired seams. WriterLeases is **registry-instance-local memory**, not a current script lease or a cross-process lock. Its conditional launch-settlement hazard is not an observed joined production incident.
- First release is proposed **embedded same-machine** execution among participating Mechanical function writers. Unknown descriptor status/export, request-surface/policy choices, overlap policy, live trust channel and Pi/MW intent precedence are explicit joint decision/evidence gates. No undefined attached placement, distributed guarantee, implicit detached/Furnace/HX/RF enablement or OS-sandbox claim.
- REFUTED C095 contributes only a negative budget regression (EAT-R395); EAT-R424 cites its surviving closed request/definition-keys facet, never the refuted raw-budget reading. Refuted facets (script lease use, no journal, Pi-only final-boundary sufficiency, integrable private lookup) are never positive premises. UNSUPPORTED DAG labels motivate an explicit normative decision, not a claimed existing graph.
- Material UNDETERMINED embedded intent-correlation premise E228 is routed to **EAT-R415 / EVIDENCE_ACQUISITION**. Behavior depending on it remains blocked pending its evidence. No current recovery contract is invented.
- Pin-preserving documentation repairs are insert annotations after complete pinned sections; owner Pi Workbench (James Halladay) controls any pin advance. This compilation neither edits those documents nor advances a pin.

## Execution and evidence conventions

Acceptance criteria below are planned assertions, not executed results. Implement with agentic-tdd: L0 traceability → L1 shell actual entrypoint → L2 fresh external installed consumer → L3 real framework composition → L4 behavior/OOD/round-trip units → broader lifecycle/fault tests → L9 coverage → L10 adversarial gate. Each row has a named falsifier; no missing-import red or already-green seam test counts as its new behavior red. A denied path is tested alongside an actually admitted positive and guard-removal mutant, so zero callbacks is not proved merely by today's universal function refusal.

Counters/detection surface: admission faults use independent host-entry/domain-callback/SDK-session/Forge-request counters plus tracked, untracked and ignored-path workspace snapshots. These demonstrate zero effects only within the declared fixture/provider surface. Native-stage trials require producer-native refs/logs, not echoed expected text. The implementer records command, exit, full source pin, installed digests, fixture and mutant outcome. Planned gate labels below are **test artifact names to be created**, not claims that receipts already exist.

MII evidence ladder: V0 pinned inspection; V1 focused/property/mutation; V2 independently packed installed host; V3 actual registered Pi function plus same-invocation observe with deterministic callbacks; V4 registered native Claude/Git/native Forge full gate (non-strict is valid; strict attainability remains EAT-R437); V5 interruption/restart/resource trials; V6 separately admitted optional topology. These are **not** agentic-tdd L0–L10. This core slice does not claim V4 or strict-PASS attainability; those belong to native-proof/release compilation. V1/V2 alone never satisfy a stated V3/V5 closure.

- **ORACLE-REG**: the registered `workflow_execute` tool object as registered at `src/index.ts:3009` (`pi.registerTool(createWorkflowExecuteTool({... mintInvocationId: workflowRunId ...}))`, :3014) invoked through Pi's tool-call surface, plus the registered `workflow_observe` (`src/index.ts:2933`), `workflow_reconcile` (`src/workbench/reconcile-tool.ts:62`, registered :2997) and `workflow_control` (`src/workbench/control-tool.ts:138`, registered :3063) tools. Tests obtain tool definitions from the registration path, never by importing `decideExecute`, the descriptor helper or a host adapter directly (C022 ESTABLISHED, C077 ESTABLISHED: a consumer that is only named after Pi is not registered Pi). At the pin the registered tool refuses `kind:function` before any load (C008, C011, C041 ESTABLISHED), so every positive row below is red until the P05 branch lands.
- **DETECT-ZERO**: test-installed counters on (a) the Mechanical importer seam (dynamic `import()` of any `@mechanical/*` specifier or any path under the installed artifact root, through the injectable importer of the host adapter; the existing Pi seam is `src/workbench/native-modules.ts` `loadWorkbenchNative`/`isWorkbenchNativeLoaded`, :109/:126, which at the pin imports no `@mechanical` package — C164 ESTABLISHED), (b) the four `DevelopmentServices` callbacks `discover`, `compileContext`, `implement`, `verify` (`HOST_SERVICE_NAMES`, MW host-services.ts:10 — C018, C215 ESTABLISHED), (c) Claude Agent SDK session starts, (d) native Forge `gate.run` requests, (e) child-process spawns. "Zero X" is discharged only when counter X reads 0 AND the positive control for the same counter reads >= 1 in the same test file (C206 NON-EPISTEMIC norm). A grep is never the detection model for a runtime absence.
- **COMPOSED-EXPORT**: the jointly ratified Pi-facing composed export of `@mechanical/development-rig/host` (name to ratify; mw-02 §1 proposes `invokeAuthorizedDevelopmentHost`). At 69cb016d the subpath exports only `invokeDevelopmentHost(options{artifactPath, artifactDigest, descriptorBytes, descriptorDigest, services}, input)`, `HostAdmissionError`, `HOST_API_VERSION` and the binding guards; `invokeDevelopmentHost` takes no binding, grant, source or lease (C214 ESTABLISHED, C134 ESTABLISHED, E036/E092). Until the composed export exists in an installed artifact, every criterion naming it is red, and the legacy export is a refusal target, not a fallback (K012).
- **Evidence tiers**: pi-04's V0-V6 (C182 NON-EPISTEMIC DEFINITION). V2 = independently npm-packed Mechanical host installed in a fresh external consumer, no Pi claimed (C183); V3 = actual registered `workflow_execute(function)` with deterministic four callbacks and `workflow_observe`, no native provider claim (C184); V4 = same route with installed real Claude SDK and native Forge full gate (C185); V5 = interruption/reattach/reconcile. V and MW's L ladders are not equivalent (EPISTEMIC-AUDIT §4 "the V/L tier map" decision conflict); no tier is inherited from the committed L2/L3 history (C067 NON-EPISTEMIC norm: existing L2/L3/script tests remain separate; C068, C069, C070 ESTABLISHED as existence only).
- **Replay senses** (K020): *event replay* = idempotent re-ingestion of journal/observation events by event id, always permitted; *effect replay* = a second writer/SDK/Forge dispatch for the same invocation, denied on unknown. A criterion that says "replay" names the sense.
- Authority legend (requirement force, separate from claim warrant): NORMATIVE_DECISION = adopted program protocol/contract choice; RISK_CONTROL = guard on a hazard that is plausible/supported but not observed on the (nonexistent) registered function path; EVIDENCE_ACQUISITION = produces evidence the audit found missing or UNDETERMINED; LINGUISTIC_INTEGRITY = reply/receipt/docs wording may not exceed its warrant; EMPIRICAL_REPAIR = repair of an audit-found code defect (here only producer-side defects consumed defensively; the producer fix itself is MW-owned via wb-1zn2).

## Carrier custody and filing-time status rule

Bead status is a `bd --readonly --json` read at filing time; the committed `.beads/issues.jsonl` is a passive export. Current consolidation basis: audit live read 2026-11-11T10:29:12Z; owner 2026-11-11 directives (wb-w8fk OPEN; stated closed-bead repoints). A live carrier is a work-content correspondence, not permission to edit acceptance of an in-flight bead. RA-21 requires a successor blocked by the in-flight carrier plus append-only notes. MW-owned work is consumed, never built by a Pi bead; wb-1zn2 is the deferred external tracker, never a Pi implementation filing target.

`Maps-to:` lists live Pi carriers only (or an explicit new / TO-BE-FILED carrier). Closed ids appear only in lineage fields or lineage annotations, never as filing targets. The owner-supplied 2026-11-11 graph-audit repoints are binding; see `CONSOLIDATION.md`. wb-w8fk is OPEN (respin in flight); wb-rz62 and wb-xeej are new live W17 carve beads. The DX-overlap notes in `CONSOLIDATION.md` preserve both programs and require body-level reconciliation at filing; neither set is rewritten here.

| Live Pi carrier | Status basis (read again at filing) | Parent / role |
|---|---|---|
| wb-2ukh | in_progress | wb-rhyt (MNI) |
| wb-4bxo | open | wb-1a3t (MWI) |
| wb-9a1o | open | wb-1a3t (MWI) |
| wb-9bof | open | wb-rhyt (MNI) |
| wb-mwsy | open | wb-1a3t (MWI) |
| wb-p3i2 | open | wb-1a3t (MWI) |
| wb-pxvv | in_progress | wb-1a3t (MWI) |
| wb-w8fk | open | wb-1a3t (MWI) |
| wb-xr1z | open | wb-rhyt (MNI) |
| wb-y0n6 | in_progress | wb-rhyt (MNI) |
| wb-yiu4 | open | wb-rhyt (MNI) |
| wb-zswl | open | wb-1a3t (MWI) |

External tracker: wb-1zn2 (deferred, MW-owned). Both epics exist; the parent ruling for new MII beads is owed under RA-20.

## EAT-R391 — Ratify the function-input digest wire contract

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The jointly versioned ABI MUST define one function-input digest construction and its exact canonical byte basis for producer and consumer comparison.
- Rationale: C060/C099/C135/C146/C153 are NON-EPISTEMIC proposals or norms. Their flags preserve the CONTESTED three-digest premise (E164) and UNSUPPORTED cross-repository digest interoperability premise (E232): equality of JSON bytes alone does not establish equality of hashes. This requirement mandates a contract, not an assertion that the pins already share one. Audited basis: C060 NON-EPISTEMIC; C099 NON-EPISTEMIC; C135 NON-EPISTEMIC; C146 NON-EPISTEMIC; C153 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C060 NON-EPISTEMIC; C099 NON-EPISTEMIC; C135 NON-EPISTEMIC; C146 NON-EPISTEMIC; C153 NON-EPISTEMIC.
- Derived from / remediation: C060, C099, C135, C146, C153; M060, M094, M135, M149, M156, M157.
- Executable acceptance criteria:
  1. A checked-in vector specifies canonical UTF-8 bytes, algorithm, prefix/domain including every NUL delimiter, sha256 encoding, missing-input treatment and the named function digest field. The record explicitly retains workflow-execute-input or records a versioned replacement; an unrecorded choice fails validation.
  2. Independent Pi and installed-MW vector readers compute the identical expected digest for Unicode/key-order cases. Changing task, host-resolved workspace or base commit changes identity; changing stripped notes does not.
  3. A contract table identifies how function admission, task/observe and any future detached digest fields relate to this field. The existing workflow-input and invocation-input domains are not equated with it by field name; their script behavior remains unchanged.
- Negative mutant: Consumer-side conformance failure against a fixture reader: a fixture reader that computes bare SHA-256 of canonical JSON (dropping the ratified prefix/domain) passes the byte-equality control but must fail the shared digest vector.
- V-tier: V1, V2, V3; `DIGEST-WIRE-VECTORS` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `DIGEST-WIRE-VECTORS (planned shared artifact; not an existing receipt label)`.
- Conditions / unresolved gates: Joint P00 / companion mw-03 H00 adoption decision required; no Pi dependency is introduced into Mechanical core.
- Maps-to: MII P00; wb-w8fk (open; re-read at filing).
- Extends: EAT-R203, EAT-R205; CORRECT — the draft cited R203/R204.
- Predecessor lineage: Extends MNI EAT-R203 and EAT-R205 (the draft cited R203/R204; corrected under RA-10); fills the new D3 wire-digest gap.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-03, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: joint digest construction unratified (E232: MW 69cb016d has no reader of Pi's `workbench.identity/v1` domain; E164 three Pi digests); Pi vector file and Pi reader legs are NOT_RUN

## EAT-R392 — Dispatch the immutable admitted payload

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: A function invocation MUST hand Mechanical the immutable canonical payload admitted for that invocation, rather than the caller object or a later recanonicalization of it.
- Rationale: C038/C039/C041/C100 are ESTABLISHED at Pi 0fb90672: admission hashes a judged value, script launch structures retain raw params.input, and no function is launched. C080 is only PLAUSIBLE as a future integration leak. C040/C099/C149/C151/C153 are NON-EPISTEMIC. Risk control closes the latent composition hazard without claiming a current effectful leak. Audited basis: C038 ESTABLISHED; C039 ESTABLISHED; C040 NON-EPISTEMIC; C041 ESTABLISHED; C080 PLAUSIBLE; C099 NON-EPISTEMIC; C100 ESTABLISHED; C149 NON-EPISTEMIC; C151 NON-EPISTEMIC; C153 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C038 ESTABLISHED; C039 ESTABLISHED; C040 NON-EPISTEMIC; C041 ESTABLISHED; C080 PLAUSIBLE; C099 NON-EPISTEMIC; C100 ESTABLISHED; C149 NON-EPISTEMIC; C151 NON-EPISTEMIC; C153 NON-EPISTEMIC.
- Derived from / remediation: C038, C039, C040, C041, C080, C099, C100, C149, C151, C153; M042, M043, M077, M078, M094, M095, M151, M153, M156, M157.
- Executable acceptance criteria:
  1. Invoke the actual registered workflow_execute function route with a complete typed request. Capture bytes at both the Pi-to-installed-host entry and the Mechanical callback: assert both equal the admitted canonical bytes and both produce the persisted function digest from EAT-R391.
  2. Change the original caller object while installation is parked. The callback still receives the originally admitted payload; neither raw-object identity nor the mutation reaches it. The payload carrier is distinct from the existing input-free ExecuteAdmission, or its schema change is explicitly versioned.
  3. Assert the same function digest in durable invocation custody and workflow_observe. Run existing script-launch regression cases and assert their raw-input semantics are unchanged.
- Negative mutant: Pass params.input instead of the admitted carrier; the registered entry-byte assertion must fail.
- V-tier: V1, V2, V3; `CANONICAL-DISPATCH-V3` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `CANONICAL-DISPATCH-V3 (planned)`.
- Conditions / unresolved gates: Depends on EAT-R391 and the reviewed composed host/registered route. Admission-only green tests are prerequisite controls, not new dispatch proof.
- Maps-to: MII P01; new bead owed (P01 canonical input; no MNI carrier).
- Extends: none — NEW (no EAT-R201..R310 predecessor)
- Predecessor lineage: New MII D3; do not reuse closed wb-7wkb (MNI P01) or reopen closed wb-201v solely because notes are mentioned.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — admission-only tests green today are controls; the registered-route leg waits for the P05 branch, the installed-host entry capture for the ratified fixture-host seam (K032)

## EAT-R393 — Omit note members without evaluating them

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Function canonicalization MUST omit the literal notes members covered by withoutBeadsNotes before any value-reading copy, so omitted notes are neither evaluated nor retained for dispatch or recovery identity.
- Rationale: C038/C096 are ESTABLISHED for supported records/arrays at the Pi pin; they do not establish the provenance of all notes strings. C060/C097/C101/C152/C194 are NON-EPISTEMIC; the UNSUPPORTED new-red premise E169 records already-green admission-only note tests. The new evidence is at the composed/registered boundary, not a claim that the pure guard is absent. Audited basis: C038 ESTABLISHED; C060 NON-EPISTEMIC; C096 ESTABLISHED; C097 NON-EPISTEMIC; C101 NON-EPISTEMIC; C152 NON-EPISTEMIC; C194 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C038 ESTABLISHED; C060 NON-EPISTEMIC; C096 ESTABLISHED; C097 NON-EPISTEMIC; C101 NON-EPISTEMIC; C152 NON-EPISTEMIC; C194 NON-EPISTEMIC.
- Derived from / remediation: C038, C060, C096, C097, C101, C152, C194; M042, M060, M091, M092, M096, M154, M155, M203.
- Executable acceptance criteria:
  1. For a complete typed DevelopmentRequest, vary enumerable notes, a nonenumerable notes carrier, and a notes getter that increments a counter then throws. Assert getter count zero, identical admitted/entry/callback bytes and digest, and no own notes property on the callback object.
  2. Plant notes members in supported nested records/arrays and caller policy; assert omission follows the ratified literal-key rule and the resulting function policy/input are the values measured at the new boundary.
  3. Reload the retained canonical request from invocation custody. Assert no note bytes enter the recovery identity or host plan. Do not describe arbitrary notes as authenticated Beads data.
- Negative mutant: Use object spread/value iteration before dropping notes; the poison-getter zero-read assertion must fail.
- V-tier: V1, V3; `G08-REGISTERED-NOTES` (planned label from the draft); target detail: V1, V3; planned evidence artifact `G08-REGISTERED-NOTES (planned)`.
- Conditions / unresolved gates: Ordinary property-accessor tests are in scope. In-process Proxy traps are a separately declared limit; do not claim JSON-origin requests prove safety for arbitrary proxies.
- Maps-to: MII P01; new bead owed (P01 canonical input; no MNI carrier).
- Extends: none — NEW (no EAT-R201..R310 predecessor)
- Predecessor lineage: Extends EAT-R154 omission semantics at the new dispatch boundary.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — seam-level note tests are already green at the pin (E169: test/workbench-function-authority.test.ts:2302) and count as controls; the new red is the registered route (P05)

## EAT-R394 — Preserve retained-value canonical rejection

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The new function payload carrier MUST NOT weaken the existing canonical validator by accepting accessors in any retained member or other nonrepresentable visited input/policy forms.
- Rationale: C096 is ESTABLISHED only for supported copying forms; C060/C097/C151 are NON-EPISTEMIC. E166 flags the proposed authority-bearing-only accessor language as CONTESTED against the pinned validator, which rejects every retained accessor. The requirement preserves that stricter guard; it does not resolve the flagged proposal by pretending it was implemented. Audited basis: C060 NON-EPISTEMIC; C096 ESTABLISHED; C097 NON-EPISTEMIC; C151 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C060 NON-EPISTEMIC; C096 ESTABLISHED; C097 NON-EPISTEMIC; C151 NON-EPISTEMIC.
- Derived from / remediation: C060, C096, C097, C151; M060, M091, M092, M153.
- Executable acceptance criteria:
  1. Run table-driven cases for top-level and nested retained getters, array-slot accessors, cycles, nonplain prototypes, prototype-ambiguous records and non-JSON values. Assert bounded typed refusal before host/callback entry and that retained accessors are never invoked.
  2. At the chosen canonical depth/UTF-8 limit, an in-budget ordinary JSON control is admitted and the first over-limit case refuses. Preserve the pinned depth-64 and canonical-validator 1 MiB backstop unless a versioned stricter decision is recorded.
  3. Keep the notes-getter exception from EAT-R393: an omitted notes getter is neither invoked nor a reason to weaken rejection elsewhere.
- Negative mutant: Allow an accessor because its key is not authority-bearing; a nested retained-getter case must fail.
- V-tier: V1, V3; `CANONICAL-RETAINED-GUARDS` (planned label from the draft); target detail: V1, V3; planned evidence artifact `CANONICAL-RETAINED-GUARDS (planned)`.
- Conditions / unresolved gates: Transport-decoded JSON and explicitly supported in-process object forms only; Proxy-trap universality is not claimed.
- Maps-to: MII P01; new bead owed (P01 canonical input; no MNI carrier).
- Extends: none — NEW (no EAT-R201..R310 predecessor)
- Predecessor lineage: Retains pinned canonicalJson guards and EAT-R154 supported forms.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — pinned canonicalJson guards (identity.ts:104,136-137,146) are regression controls; new red is the carrier at the registered route (P05)

## EAT-R395 — Do not relabel canonical budgets as raw budgets

- Type: NEGATIVE_REGRESSION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The function route and its contract MUST NOT represent the existing canonical, notes-stripped byte limits as a raw-request-size guarantee.
- Rationale: C095 is REFUTED: Pi 0fb90672 budgets canonical notes-stripped function values, not raw caller JSON. This row derives only a negative regression from that refutation. C060 is NON-EPISTEMIC and C096 ESTABLISHED; any new transport/raw gate requires its own explicit normative decision and cannot be inferred from C095. Audited basis: C095 REFUTED; C060 NON-EPISTEMIC; C096 ESTABLISHED. All empirical statements retain the environment pins above.
- Epistemic basis: C095 REFUTED; C060 NON-EPISTEMIC; C096 ESTABLISHED.
- Derived from / remediation: C095, C060, C096; M060, M089, M090, M091.
- Executable acceptance criteria:
  1. A fixture with an admitted small canonical request and notes exceeding 64 KiB demonstrates the canonical input limit independently of raw size. Assert its digest is the same as the note-free request and document any separately adopted transport refusal as a distinct reason.
  2. On retained canonical input, assert the 64 KiB limit; on canonical function policy, assert the 4096-byte limit, including multibyte UTF-8 boundaries. A over-limit refusal invokes zero callbacks.
  3. Validate the contract/budget table names raw transport, canonical input and canonical policy as separate detection surfaces. No test or documentation labels the current canonical rule raw JSON enforcement.
- Negative mutant: Measure raw function input as if it were the canonical limit, or label canonical success as raw boundedness; the budget-surface test must fail.
- V-tier: V1, V3; `BUDGET-SURFACE-REGRESSION` (planned label from the draft); target detail: V1, V3; planned evidence artifact `BUDGET-SURFACE-REGRESSION (planned)`.
- Conditions / unresolved gates: A separate raw-size limit is permitted only through recorded adoption; existing note-identity independence is preserved. No raw limit is invented by this compile.
- Maps-to: MII P01; new bead owed (P01 canonical input; no MNI carrier).
- Extends: none — NEW (no EAT-R201..R310 predecessor)
- Predecessor lineage: Negative-only cure for MII C095/M089-M090; preserves EAT-R154.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — negative-only cure of REFUTED C095; no external blocker

## EAT-R396 — Bind canonical workspace and basis to host measurements

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The canonical DevelopmentRequest MUST bind workspaceId and baseRevision to independently host-authorized workspace mapping and measured full base commit.
- Rationale: C090 is ESTABLISHED for the producer three-field type and nonblank checks, not full canonical closure. C059/C091/C098/C152 are NON-EPISTEMIC. K011 remains a design fork: host injection versus caller comparison must be selected explicitly; caller bytes never establish authority. Audited basis: C059 NON-EPISTEMIC; C090 ESTABLISHED; C091 NON-EPISTEMIC; C098 NON-EPISTEMIC; C152 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C059 NON-EPISTEMIC; C090 ESTABLISHED; C091 NON-EPISTEMIC; C098 NON-EPISTEMIC; C152 NON-EPISTEMIC.
- Derived from / remediation: C059, C090, C091, C098, C152; M059, M085, M086, M093, M154, M155.
- Executable acceptance criteria:
  1. The P00 decision and schema choose one surface: task-only with host injection, or caller task/workspaceId/baseRevision compared against the host mapping. Reject unknown members and nonblank-string violations before dispatch.
  2. For the comparison surface, a different workspaceId or full base commit refuses rather than silently overriding. For injection, caller basis/root members refuse as outside the surface; host-resolved values are included before canonical hashing.
  3. After a fresh host-authorized basis/workspace selection, typed basis changes alter the function digest. A caller cannot select an unauthorized root by supplying a path-like workspaceId.
- Negative mutant: Trust caller workspace/basis or silently replace a mismatched submitted basis; the mismatch refusal test must fail.
- V-tier: V1, V2, V3; `REQUEST-BASIS-BINDING` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `REQUEST-BASIS-BINDING (planned)`.
- Conditions / unresolved gates: P00 must record the K011 request-surface decision. Both alternatives are specified for the decision test; implementation does not silently support both.
- Maps-to: MII P01 / P03; new bead owed (P01 canonical input; no MNI carrier).
- Extends: EAT-R223, EAT-R229, EAT-R230; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: New D3 canonical request mapping; coordinated with wb-2ukh source authority.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: K011 request-surface decision (host injection vs caller comparison) not recorded

## EAT-R397 — Keep write requests narrower than authorization

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Function admission MUST honor the caller write policy as a request ceiling and never treat allowWrites:true, policy omission or annotations as a write grant.
- Rationale: C094 is ESTABLISHED: allowWrites:true is a request recognized by the unwired source seam, not authorization. C060/C089/C105 are NON-EPISTEMIC; M084 leaves omission semantics for P00. This is an adopted request-ceiling obligation, not evidence that any omission rule is already shared. Audited basis: C060 NON-EPISTEMIC; C089 NON-EPISTEMIC; C094 ESTABLISHED; C105 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C060 NON-EPISTEMIC; C089 NON-EPISTEMIC; C094 ESTABLISHED; C105 NON-EPISTEMIC.
- Derived from / remediation: C060, C089, C094, C105; M060, M084, M100.
- Executable acceptance criteria:
  1. The ratified schema chooses omission behavior explicitly. A missing/false/malformed policy follows that decision without silently converting a caller denial into allowWrites:true.
  2. With allowWrites:true and no exact host write grant, assert typed refusal and zero host domain callbacks, SDK sessions, Forge requests and writes. With a valid grant but an explicit caller write denial, the write route does not run.
  3. Note text and additional/free-text policy action members cannot widen the requested or host-admitted effect set; an admitted positive control uses the exact ratified ceiling.
- Negative mutant: Default every omitted/false policy to write-enabled, or treat caller allowWrites as authorization; a denial case must fail.
- V-tier: V1, V3; `REQUEST-WRITE-CEILING` (planned label from the draft); target detail: V1, V3; planned evidence artifact `REQUEST-WRITE-CEILING (planned)`.
- Conditions / unresolved gates: P00 policy-omission decision required; absence is not guessed. Ratified effect vocabulary remains a producer contract dependency.
- Maps-to: MII P01 / P03; new bead owed (P01 canonical input; no MNI carrier).
- Extends: EAT-R225, EAT-R270; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends existing writesRequested semantics; no new generic permission grammar.
- Linked rows: EAT-R453.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R453.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: policy-omission semantics (M084) not recorded

## EAT-R398 — Ratify the single-machine lease authority interface

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The joint ABI MUST name Pi as authoritative invocation-lease owner and specify Mechanical provider-entry fence verification against that same authority for the supported same-machine topology.
- Rationale: C025 is ESTABLISHED only over both pinned repositories: neither cross-process nor distributed lease proof exists there. C045/C062/C066/C114/C116/C156/C193 are NON-EPISTEMIC. K013/K035 leave holder, verifier and enforcement modality unresolved; prose agreement is not a token protocol. E031 refutes the embedded claim that scripts already use this seam; no such premise is adopted. Audited basis: C025 ESTABLISHED; C045 NON-EPISTEMIC; C062 NON-EPISTEMIC; C066 NON-EPISTEMIC; C114 NON-EPISTEMIC; C116 NON-EPISTEMIC; C156 NON-EPISTEMIC; C193 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C025 ESTABLISHED; C045 NON-EPISTEMIC; C062 NON-EPISTEMIC; C066 NON-EPISTEMIC; C114 NON-EPISTEMIC; C116 NON-EPISTEMIC; C156 NON-EPISTEMIC; C193 NON-EPISTEMIC.
- Derived from / remediation: C025, C045, C062, C066, C114, C116, C156, C193; M021, M022, M047, M062, M066, M110, M112, M160, M202.
- Executable acceptance criteria:
  1. The joint adopted fixture defines token fields (canonical root, invocation, owner and generation), current-generation verification operation, state transitions, release authority and the lifetime of a verified write permission. Pi owns release; Mechanical does not mint a competing lease.
  2. A cross-repository fixture passes a Pi-held token to the installed composed host and validates it through a protected current-authority reader. Mismatched owner/root/invocation/generation yields zero writer calls.
  3. The contract makes provider stale-fence denial mandatory for the supported topology, names OS/filesystem/process assumptions and declares distributed or nonparticipating-writer limits. It does not call a single-process map cross-process proof.
- Negative mutant: Consumer-side conformance failure against a fixture host: a fixture host that accepts the serialized generation without current-authority validation must fail the stale-token fixture.
- V-tier: V1, V2, V5; `LEASE-AUTHORITY-ABI` (planned label from the draft); target detail: V1, V2, V5; planned evidence artifact `LEASE-AUTHORITY-ABI (planned)`.
- Conditions / unresolved gates: Existing wb-w8fk is blocked on deferred owner-managed wb-1zn2. Preserve that lineage; do not release the tracker or claim joint ratification in this compile.
- Maps-to: MII P00 / P02 / P03; wb-w8fk (open; re-read at filing).
- Extends: EAT-R207, EAT-R232, EAT-R269; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R207/EAT-R232/EAT-R269; operational lease implementation extends wb-2ukh.
- Linked rows: EAT-R448, EAT-R464.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R448, EAT-R464.
- L0: TRACEABLE; text consolidated: RA-03; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: token fields, current-generation verifier and enforcement modality (K013/K035); MW side tracked by wb-1zn2 (deferred)

## EAT-R399 — Persist one authoritative cross-process root reservation

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Admitted Mechanical function writers on one supported machine MUST acquire ownership through one durable authoritative reservation store keyed by canonical root.
- Rationale: C016/C042/C117 are ESTABLISHED: WriterLeases is per-instance memory, no production caller instantiates it, and dispatch-settlement release is only a seam. C116/C120/C156/C158/C193 are NON-EPISTEMIC. This creates function-writer exclusion, not a repair of a claimed production script lease or a distributed guarantee. Audited basis: C016 ESTABLISHED; C042 ESTABLISHED; C117 ESTABLISHED; C116 NON-EPISTEMIC; C120 NON-EPISTEMIC; C156 NON-EPISTEMIC; C158 NON-EPISTEMIC; C193 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C016 ESTABLISHED; C042 ESTABLISHED; C117 ESTABLISHED; C116 NON-EPISTEMIC; C120 NON-EPISTEMIC; C156 NON-EPISTEMIC; C158 NON-EPISTEMIC; C193 NON-EPISTEMIC.
- Derived from / remediation: C016, C042, C117, C116, C120, C156, C158, C193; M013, M044, M112, M113, M116, M160, M162, M202.
- Executable acceptance criteria:
  1. Start two independent Pi processes with the same configured authoritative store, simultaneously requesting one realpath through direct/symlink/dot aliases. Exactly one acquires the writer reservation; the other receives writer-held (or the ratified bounded queue state), with aggregate writer count one.
  2. A fresh third process reads the persisted canonical root, invocation, owner, generation and custody state without access to the first process memory. Creating a second local adapter instance does not create an independent lease namespace.
  3. Record the store path, schema, locking primitive and tested filesystem in the receipt. Restart does not discard the reservation; acquisition-store failure produces no writer.
- Negative mutant: Replace the authoritative store with new WriterLeases per process; the dual-process alias test must detect two writers.
- V-tier: V1, V3, V5; `G07-CROSS-PID-RESERVATION` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `G07-CROSS-PID-RESERVATION (planned)`.
- Conditions / unresolved gates: Requires EAT-R398. Same-machine participating Mechanical functions only; no use of S3 Mountpoint for lock/journal random writes.
- Maps-to: MII P02; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R232, EAT-R269; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R232 on live MNI P03 wb-2ukh; wb-s8rm is a closed historical seam carrier.
- Linked rows: EAT-R448, EAT-R464.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R448, EAT-R464.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — Pi-only substrate; token fields final only after EAT-R398 is ratified

## EAT-R400 — Retain writer ownership after launch reply

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Function writer ownership MUST outlive launch-promise settlement while native writer effects remain possible.
- Rationale: C043 is ESTABLISHED about the helper finally block; C044/C081/C155 are SUPPORTED conditional hazards, not observed joined incidents. C062/C115/C156/C157/C192 are NON-EPISTEMIC. C155’s script-helper facet is REFUTED (E031), so this adds a new function lifetime and preserves actual script behavior separately. Audited basis: C043 ESTABLISHED; C044 SUPPORTED; C081 SUPPORTED; C062 NON-EPISTEMIC; C115 NON-EPISTEMIC; C155 SUPPORTED; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C192 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C043 ESTABLISHED; C044 SUPPORTED; C081 SUPPORTED; C062 NON-EPISTEMIC; C115 NON-EPISTEMIC; C155 SUPPORTED; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C192 NON-EPISTEMIC.
- Derived from / remediation: C043, C044, C081, C062, C115, C155, C156, C157, C192; M045, M046, M062, M079, M111, M159, M160, M161, M201.
- Executable acceptance criteria:
  1. The registered launch returns while the producer worker is held at a first-edit barrier. Assert completion:not-asserted, reservation still active, and a second same-root function invocation in another process refused without writer entry.
  2. Exercise both resolving and rejecting dispatch promises while an already-dispatched native worker is still possible. Neither promise outcome alone transitions the lease to released.
  3. After safe terminal settlement under EAT-R403, a newly authorized invocation can acquire the root; the test retains the original invocation identity throughout the first worker lifetime.
- Negative mutant: Release in finally as soon as launch refs return; the second-process writer denial must fail.
- V-tier: V1, V3, V5; `G06-LAUNCH-LIFETIME` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `G06-LAUNCH-LIFETIME (planned)`.
- Conditions / unresolved gates: Native worker barrier and cross-process oracle required; already-green in-memory alias tests alone are insufficient.
- Maps-to: MII P02; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R232; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R232 and MII D5/G06; no existing script-lease regression is fabricated.
- Linked rows: EAT-R448, EAT-R464.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R448, EAT-R464.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — needs the durable store (EAT-R399) and the P05 branch; the first-edit barrier needs the fixture host

## EAT-R401 — Deny stale generations at provider writer entry

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Pi MUST expose the ratified current-generation verifier to the composed host and MUST keep effectful function readiness false for any topology in which the installed host does not demonstrably deny a stale or invalid generation at provider write entry (consumption test: stale token → zero edit, commit and gate effects).
- Rationale: The cited rows are NON-EPISTEMIC. K035/E230 preserve the unresolved token/verifier interface and Pi’s where-possible versus MW’s mandatory-enforcement conflict. This requirement adopts mandatory stale-fence denial for the supported topology under risk control; it does not claim an existing fence or universal OS sandbox. Audited basis: C061 NON-EPISTEMIC; C114 NON-EPISTEMIC; C116 NON-EPISTEMIC; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C160 NON-EPISTEMIC; C193 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C061 NON-EPISTEMIC; C114 NON-EPISTEMIC; C116 NON-EPISTEMIC; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C160 NON-EPISTEMIC; C193 NON-EPISTEMIC.
- Derived from / remediation: C061, C114, C116, C156, C157, C160, C193; M061, M110, M112, M160, M161, M164, M165, M202.
- Executable acceptance criteria:
  1. Pause an old worker before writer entry; perform an authorized custody transition that invalidates its generation; then resume it. Assert verifier denial and zero edit/commit/gate effects from that generation.
  2. Replay an old token with a reused PID, changed invocation or root alias. It cannot authenticate by PID/liveness alone. A current-generation positive control reaches the intended provider once.
  3. If the provider adapter cannot enforce the ratified fence at its entry, effectful readiness remains false for that topology and the receipt names the unenforced window.
- Negative mutant: Accept a token because its PID is live, skipping generation lookup; the resumed stale-worker test must fail.
- V-tier: V1, V2, V3, V5; `STALE-GENERATION-PROVIDER-ENTRY` (planned label from the draft); target detail: V1, V2, V3, V5; planned evidence artifact `STALE-GENERATION-PROVIDER-ENTRY (planned)`.
- Conditions / unresolved gates: Requires EAT-R398 and companion mw-03 H06 fence/live-reader contract. Mid-provider arbitrary filesystem writes remain an explicit containment limit unless separately enforced.
- Maps-to: MII P02 / P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R207, EAT-R232, EAT-R269; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R207/EAT-R232/EAT-R269; producer side is a named blocking dependency, not Pi-copied internals.
- Linked rows: EAT-R448, EAT-R464.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R448, EAT-R464.
- L0: TRACEABLE; text consolidated: RA-03; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — the provider-entry fence check is producer code (mw-03 H06, absent at 69cb016d) and EAT-R398 is unratified; Pi verifier leg NOT_RUN

## EAT-R402 — Keep crashed or timed-out invocations fenced

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Lost heartbeat, owner death or timeout after possible dispatch MUST leave invocation ownership quarantined or recovering until justified disposition, not automatically reacquirable.
- Rationale: C118 is SUPPORTED: timeout is not proof of quiescence. C119/C062/C156/C157/C174/C204 are NON-EPISTEMIC. The target crash behavior has no joined proof at the pins; process death and power loss require different evidence and are not conflated. Audited basis: C118 SUPPORTED; C119 NON-EPISTEMIC; C062 NON-EPISTEMIC; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C174 NON-EPISTEMIC; C204 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C118 SUPPORTED; C119 NON-EPISTEMIC; C062 NON-EPISTEMIC; C156 NON-EPISTEMIC; C157 NON-EPISTEMIC; C174 NON-EPISTEMIC; C204 NON-EPISTEMIC.
- Derived from / remediation: C118, C119, C062, C156, C157, C174, C204; M062, M114, M115, M160, M161, M181, M182, M213.
- Executable acceptance criteria:
  1. Kill the Pi owner after first edit, after candidate commit and after Forge dispatch in separate trials. A fresh process reads the open intent/reservation, reports unknown/recovering, and refuses a second effectful invocation.
  2. Advance a test clock past heartbeat/lease timeout while the worker is paused, and simulate PID reuse. The root remains unavailable without affirmative settlement or explicitly authorized audited disposition.
  3. The receipt enumerates tested kill windows, OS/filesystem assumptions, late-worker treatment and untested power-loss behavior. A process-kill result is never labeled power-failure durability proof.
- Negative mutant: Delete the lease solely when heartbeat expires or owner PID dies; restart reacquisition test must fail.
- V-tier: V1, V3, V5; `P18-FRESH-PROCESS-FENCE` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `P18-FRESH-PROCESS-FENCE (planned)`.
- Conditions / unresolved gates: Companion native effect lookup/settlement evidence is a dependency; reuse historical wb-7wkb kill/verifier machinery where applicable, retaining its not-claimed list.
- Maps-to: MII P02 / P07; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R232, EAT-R278, EAT-R280, EAT-R281; CORRECT — the draft wrote the open range R280+.
- Predecessor lineage: Extends MNI EAT-R232, EAT-R278, EAT-R280 and EAT-R281 custody behavior (the draft wrote the open range R280+; closed under RA-10); historical cleanup trial is not a joined-host test.
- Linked rows: EAT-R450, EAT-R463.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R450, EAT-R463.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — needs EAT-R399; joined kill windows additionally need the composed host (mw-03 H06)

## EAT-R403 — Release only on known-safe disposition

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST release a function reservation only through a known-safe disposition transition backed by pre-dispatch non-occurrence or native terminal quiescence/settlement evidence.
- Rationale: C132 is ESTABLISHED: clean HEAD/status cannot prove non-occurrence, with an ignored-file counterexample at MW 69cb016d. C115/C119/C121/C131/C174 are NON-EPISTEMIC. This is a release law, not an assertion that current producer reconciliation already satisfies it. Audited basis: C115 NON-EPISTEMIC; C119 NON-EPISTEMIC; C121 NON-EPISTEMIC; C131 NON-EPISTEMIC; C132 ESTABLISHED; C174 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C115 NON-EPISTEMIC; C119 NON-EPISTEMIC; C121 NON-EPISTEMIC; C131 NON-EPISTEMIC; C132 ESTABLISHED; C174 NON-EPISTEMIC.
- Derived from / remediation: C115, C119, C121, C131, C132, C174; M111, M115, M117, M118, M129, M130, M131, M181, M182.
- Executable acceptance criteria:
  1. A denied invocation with durable affirmative no-dispatch evidence releases its reserved generation; a terminal writer with stopped effects and matching known disposition releases through the authoritative Pi transition.
  2. Launch acknowledgment, clean HEAD, timeout, missing provider record, transport completion, or an unknown Forge result alone cannot authorize release. The reservation remains fenced in each table case.
  3. An operator override requires current recovery permission and an append-only audited override record. It is exposed as operator disposition, not fabricated native settlement or rollback; an unprivileged release request leaves custody unchanged.
- Negative mutant: Treat clean HEAD plus no operation id as known no-write; ignored-file/lost-ack release test must fail.
- V-tier: V1, V3, V5; `SAFE-RELEASE-TABLE` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `SAFE-RELEASE-TABLE (planned)`.
- Conditions / unresolved gates: Exact settlement/non-occurrence evidence schema and Pi/MW record precedence must be ratified after EAT-R415. Native proof production remains Mechanical-owned.
- Maps-to: MII P02 / P07; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R232, EAT-R251, EAT-R254, EAT-R282; CORRECT — the draft cited R250 where R251 / R254 / R282 apply.
- Predecessor lineage: Extends MNI EAT-R232, EAT-R251, EAT-R254 and EAT-R282 recovery custody (the draft cited R250; corrected under RA-10); maintains the R207 lease-owner choice.
- Linked rows: EAT-R447, EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R447, EAT-R467.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — settlement / non-occurrence evidence schema follows EAT-R415 (MW invocation-keyed lookup and certificate absent)

## EAT-R404 — Constrain lease exclusivity to ratified roots and topology

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: First-release function admission MUST apply an explicit root-overlap/isolation policy within embedded same-machine execution, without claiming coverage of exempt writers or distributed hosts.
- Rationale: The cited rows are NON-EPISTEMIC. K014 exposes all-writer versus function-only exclusivity; M116 requires nested-root behavior. C230 proposes embedded first release. No existing script writer is assumed to take the unwired lease. Audited basis: C004 NON-EPISTEMIC; C062 NON-EPISTEMIC; C120 NON-EPISTEMIC; C121 NON-EPISTEMIC; C158 NON-EPISTEMIC; C230 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C004 NON-EPISTEMIC; C062 NON-EPISTEMIC; C120 NON-EPISTEMIC; C121 NON-EPISTEMIC; C158 NON-EPISTEMIC; C230 NON-EPISTEMIC.
- Derived from / remediation: C004, C062, C120, C121, C158, C230; M004, M062, M116, M117, M118, M162, M239.
- Executable acceptance criteria:
  1. P00 records one nested/overlapping-root policy and either dedicated roots isolated from exempt writers or a separately implemented all-writer fence. Same-realpath aliases always conflict; ancestor/descendant root cases follow the explicit policy.
  2. Two nonoverlapping dedicated roots proceed concurrently under the configured resource cap. At cap exhaustion the extra invocation has no writer effect and a bounded refusal/queue state.
  3. A distributed/fleet or detached function request is ineligible for the first release until separate topology admission and evidence exist. Capability text scopes exclusion to participating functions unless all-writer enforcement is actually tested.
- Negative mutant: Key nested aliases independently or advertise distributed exclusivity from one-machine tests; the policy/capability test must fail.
- V-tier: V1, V3, V5; `ROOT-TOPOLOGY-POLICY` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `ROOT-TOPOLOGY-POLICY (planned)`.
- Conditions / unresolved gates: K014 overlap/exempt-writer decision pending P00. Existing script placements remain available with their established semantics; new function placement is narrower.
- Maps-to: MII P00 / P02; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R207, EAT-R226, EAT-R232, EAT-R303; OK — audited lineage retained.
- Predecessor lineage: Extends EAT-R207/EAT-R232 supported-topology conditions; optional MII P11 is not enabled.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-06; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: K014 overlap / exempt-writer policy not recorded

## EAT-R405 — Bind production adoption to pinned joint ratification

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: The production function route MUST obtain its action contract only through host validation of a digest-pinned joint ratification record and matching installed-host compatibility evidence.
- Rationale: C050/C106/C107 are ESTABLISHED about the unadopted default and helper minting, not enforced ratification; C145 is SUPPORTED for the proposed spelling. C051/C105/C135 are NON-EPISTEMIC with UNSUPPORTED ratification-event flags E028/E216. This closes the missing gate without treating MW-CONTRACT as an existing receipt. Audited basis: C050 ESTABLISHED; C051 NON-EPISTEMIC; C105 NON-EPISTEMIC; C106 ESTABLISHED; C107 ESTABLISHED; C145 SUPPORTED; C135 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C050 ESTABLISHED; C051 NON-EPISTEMIC; C105 NON-EPISTEMIC; C106 ESTABLISHED; C107 ESTABLISHED; C145 SUPPORTED; C135 NON-EPISTEMIC.
- Derived from / remediation: C050, C051, C105, C106, C107, C145, C135; M051, M052, M100, M101, M102, M103, M135, M148.
- Executable acceptance criteria:
  1. The host-owned ratification record names both full source pins, descriptor/schema/status/export choices, mechanical.development.develop.v1, exact mechanical:develop-write, EAT-R391 digest vectors, EAT-R398 lease authority and installed-host evidence digests, SDK pin owner and provider-factory ownership, and the V3 fixture-host injection seam. Unknown/missing/altered records refuse readiness.
  2. Production registration cannot enable dispatch with the unadopted default, caller-built adoption data, or a minted helper contract unbound to the record. A module/call-site census names the sole protected production adoption path.
  3. A valid matching record enables the fixture path; changing artifact/schema/grant spelling invalidates that adoption. The receipt distinguishes contract approval from each invocation’s current permission decision.
- Negative mutant: Call adoptFunctionActions directly in production without checking ratification; missing-record dispatch test must fail.
- V-tier: V1, V2, V3; `RATIFICATION-ADOPTION-BOUNDARY` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `RATIFICATION-ADOPTION-BOUNDARY (planned)`.
- Conditions / unresolved gates: Blocked by existing wb-1zn2 external-gate lineage and explicit joint record. Evidence labels are defined by the record, not fabricated native IDs.
- Maps-to: MII P00 / P03; wb-w8fk (open; re-read at filing).
- Extends: EAT-R203, EAT-R204, EAT-R205; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R203/EAT-R204/EAT-R205; production enforcement extends wb-2ukh.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-15; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: joint ratification record does not exist (C107: adoption is not mechanically gated; wb-1zn2 deferred)

## EAT-R406 — Protect the live authority source from writer influence

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Function authority, budgets, profiles and lease verification MUST originate in protected host state that the admitted writer cannot alter or replace through its authorized workspace.
- Rationale: C059/C091/C092/C196 are NON-EPISTEMIC; M059/M086/M205 identify a conditional writable-settings trust risk, not an observed joined exploit. The norm requires a protected trust source and does not claim prompt filters provide an OS sandbox. Audited basis: C059 NON-EPISTEMIC; C091 NON-EPISTEMIC; C092 NON-EPISTEMIC; C196 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C059 NON-EPISTEMIC; C091 NON-EPISTEMIC; C092 NON-EPISTEMIC; C196 NON-EPISTEMIC.
- Derived from / remediation: C059, C091, C092, C196; M059, M086, M087, M205.
- Executable acceptance criteria:
  1. Forge caller grants, root, principal/session, invocation, profile, artifact path or effect budget in tool JSON/notes/annotations. Assert none becomes trusted authority and no denied invocation reaches effects.
  2. A host configuration that places live permission/lease authority inside the writable root or writable alias refuses readiness unless an independently tested protection mechanism prevents writer mutation.
  3. Attempt to mutate/replace the authority source through the allowed writer interface; observe denial or the independently enforced protection. A current-host grant read remains unchanged; distinguish this test from request-field forgery.
- Negative mutant: Use caller permissions or a writer-controlled settings file as current authority; the forged/mutated trust-source test must fail.
- V-tier: V1, V3, V5; `HOST-TRUST-SOURCE-INTEGRITY` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `HOST-TRUST-SOURCE-INTEGRITY (planned)`.
- Conditions / unresolved gates: Trust-store placement/protection must be selected by host configuration. Do not weaken service auth or claim unrestricted filesystem containment from a fixture.
- Maps-to: MII P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R223, EAT-R228, EAT-R270; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends MNI authority/source composition and MII I2/G10.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — trust-store placement is a host configuration choice; Pi-only

## EAT-R407 — Require exact current execute and write grants

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Each function effect handoff MUST require current trusted workbench:execute and the exact adopted mechanical:develop-write for the reviewed definition, with stable principal/session.
- Rationale: C013/C093/C106/C111 are ESTABLISHED for module capability and candidate constants, not production wiring. C145 is SUPPORTED; C051/C105/C160 are NON-EPISTEMIC. The requirement is conditional on EAT-R405 adoption and does not treat candidate syntax as joint approval. Audited basis: C013 ESTABLISHED; C051 NON-EPISTEMIC; C093 ESTABLISHED; C105 NON-EPISTEMIC; C106 ESTABLISHED; C111 ESTABLISHED; C145 SUPPORTED; C160 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C013 ESTABLISHED; C051 NON-EPISTEMIC; C093 ESTABLISHED; C105 NON-EPISTEMIC; C106 ESTABLISHED; C111 ESTABLISHED; C145 SUPPORTED; C160 NON-EPISTEMIC.
- Derived from / remediation: C013, C051, C093, C105, C106, C111, C145, C160; M052, M088, M100, M101, M107, M148, M164, M165.
- Executable acceptance criteria:
  1. With both exact grants, stable host identity and all other prerequisites valid, the admitted fixture reaches one callback. Remove either grant, supply only a broader/suffixed/wrong-namespace action, or change principal/session: assert typed refusal and zero provider effect.
  2. Grant data absent, malformed or unknown is denied, not interpreted as empty success. Relevant known provider grants may exist in the host set but do not substitute for mechanical:develop-write or widen the effect plan.
  3. Park installation/admission, revoke the action or execute grant, then continue. Re-read the trusted store and refuse before writer entry. Caller fake grants never satisfy the condition.
- Negative mutant: Accept action-prefix matches or skip the post-wait read; the suffixed-grant/revocation fixture must fail.
- V-tier: V1, V2, V3; `EXACT-GRANTS-V3` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `EXACT-GRANTS-V3 (planned)`.
- Conditions / unresolved gates: EAT-R405 ratification required. First release embedded; detached workbench:detach remains a future separately admitted condition.
- Maps-to: MII P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R204, EAT-R225, EAT-R227, EAT-R228; CORRECT — the draft cited R224+ (R224 is installed-package serialization; the grant rows are R225 / R227 / R228).
- Predecessor lineage: Extends existing dispatchFunctionWithAuthority seam and MNI EAT-R204, EAT-R225, EAT-R227 and EAT-R228 (the draft cited R224+; corrected under RA-10: R224 is installed-package serialization, the grant rows are R225 / R227 / R228); no existing green seam is relabeled registered proof.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — conditional on EAT-R405 adoption (G-RATIFY)

## EAT-R408 — Mint host-owned source attestations through an explicit channel

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The composed function host MUST obtain source-write attestation from a specified protected operator/host channel bound to the measured canonical root and source identity.
- Rationale: C110 is ESTABLISHED for suite-scoped source checks, including a host-selected manifest. C109/C160/C103 are NON-EPISTEMIC; E157 flags missing production attestation minting as CONTESTED. Existing source admission rejects absent attestation; it cannot become usable merely by composing helpers. Audited basis: C109 NON-EPISTEMIC; C110 ESTABLISHED; C160 NON-EPISTEMIC; C103 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C109 NON-EPISTEMIC; C110 ESTABLISHED; C160 NON-EPISTEMIC; C103 NON-EPISTEMIC.
- Derived from / remediation: C109, C110, C160, C103; M098, M105, M106, M164, M165.
- Executable acceptance criteria:
  1. The adoption/configuration record names the operator action or trusted host channel, current authorizer and attestation lifetime. A valid channel mints a source identity attestation; no tool-input object is accepted as minted authority.
  2. Absent, forged, stale or other-root attestation refuses before writer entry. An attestation to the measured root/commit/tree/manifest admits a positive control.
  3. After an async wait, changed source or changed authorization invalidates the attestation. Neither copying its serialized fields nor changing a symlink can preserve authority.
- Negative mutant: Treat a matching caller-shaped attestation as minted, or omit the rule; forged-attestation test must fail.
- V-tier: V1, V2, V3; `HOST-SOURCE-ATTESTATION` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `HOST-SOURCE-ATTESTATION (planned)`.
- Conditions / unresolved gates: P00 must choose the production minting channel or explicitly supersede the inherited attestation rule with a recorded equivalent; this compile does not drop it silently.
- Maps-to: MII P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R229, EAT-R233; ADD — the draft restated EAT-R233 without naming it.
- Predecessor lineage: Extends live source composition using closed wb-s8rm/WriteBoundaryAuthority lineage.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: production attestation minting channel undecided (E157 CONTESTED)

## EAT-R409 — Carry live authority readers to the producer effect boundary

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: The Pi-to-Mechanical trusted context MUST allow the composed producer to revalidate current authority/source/fence after its own asynchronous preparation and immediately before provider effect entry.
- Rationale: C048/C113 are SUPPORTED architectural inferences; C111 is ESTABLISHED only for grants/identity helper checks. The remaining rows are NON-EPISTEMIC. E227 REFUTES the embedded premise that Pi A5 is necessarily the last check: Mechanical performs later async install/preparation. This requirement does not assume that refuted sufficiency; it mandates producer-side live validation as risk control. Audited basis: C048 SUPPORTED; C049 NON-EPISTEMIC; C061 NON-EPISTEMIC; C103 NON-EPISTEMIC; C111 ESTABLISHED; C113 SUPPORTED; C114 NON-EPISTEMIC; C160 NON-EPISTEMIC; C162 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C048 SUPPORTED; C049 NON-EPISTEMIC; C061 NON-EPISTEMIC; C103 NON-EPISTEMIC; C111 ESTABLISHED; C113 SUPPORTED; C114 NON-EPISTEMIC; C160 NON-EPISTEMIC; C162 NON-EPISTEMIC.
- Derived from / remediation: C048, C049, C061, C103, C111, C113, C114, C160, C162; M049, M050, M061, M098, M107, M109, M110, M164, M165, M167, M168.
- Executable acceptance criteria:
  1. In an installed-host test, park producer preparation after Pi handoff, then revoke a grant/change identity, change source or invalidate fence in separate cases. A protected live-reader/verifier sees each change and zero writer callbacks occur.
  2. A serialized binding or captured grant/source snapshot alone cannot satisfy the current-read contract. Invalid/unavailable readers fail closed, and writer-controlled callbacks cannot replace them.
  3. The receipt names which Pi and Mechanical modules enforce each boundary and the remaining check-to-effect window. A passing test asserts only enumerated mutation windows, not globally atomic behavior.
- Negative mutant: Freeze authority at Pi A5 and pass snapshots only; after-handoff revocation test must fail.
- V-tier: V1, V2, V3, V5; `PRODUCER-FINAL-LIVE-READ` (planned label from the draft); target detail: V1, V2, V3, V5; planned evidence artifact `PRODUCER-FINAL-LIVE-READ (planned)`.
- Conditions / unresolved gates: Blocked on Mechanical-owned authorized composed host/live-reader API through the reviewed public host subpath. Pi must not copy private producer implementation.
- Maps-to: MII P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R228, EAT-R234; ADD — EXTENDS and QUALIFIES EAT-R234: the Pi-side no-await chain remains necessary for the Pi-to-host handoff and is not the final boundary (E227, K034).
- Predecessor lineage: Extends MNI integrated-chain work; corrects MII final-boundary ownership inflation.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — live-reader API of the composed host is producer work (mw-03 H06); Pi-side reader construction NOT_RUN

## EAT-R410 — Remeasure source at stage-appropriate final boundaries

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The composed host MUST compare current canonical root, Git basis/cleanliness and forge.toml identity against the authorized stage-specific source basis before a new effect.
- Rationale: C110 is ESTABLISHED for enumerated pure source checks at Pi 0fb90672; C061/C098/C109/C160/C161/C200 are NON-EPISTEMIC. Existing green wait tests do not prove new installed/registered windows. Initial source and legitimate committed candidate are distinct stages, so a static base-only check is insufficient. Audited basis: C061 NON-EPISTEMIC; C098 NON-EPISTEMIC; C109 NON-EPISTEMIC; C110 ESTABLISHED; C160 NON-EPISTEMIC; C161 NON-EPISTEMIC; C200 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C061 NON-EPISTEMIC; C098 NON-EPISTEMIC; C109 NON-EPISTEMIC; C110 ESTABLISHED; C160 NON-EPISTEMIC; C161 NON-EPISTEMIC; C200 NON-EPISTEMIC.
- Derived from / remediation: C061, C098, C109, C110, C160, C161, C200; M061, M093, M105, M106, M164, M165, M166, M209.
- Executable acceptance criteria:
  1. Before first writer entry, compare realpath root, full HEAD commit/tree, clean status, host attestation and explicit forge.toml hash with the admitted basis. Mutate each during install/wait, including moved symlink and tracked/untracked dirt: refuse with source mismatch and zero writer effects.
  2. After an authorized candidate commit, a later gate uses the authorized candidate stage rather than treating any HEAD change as legitimate or permanently requiring initial HEAD. The source-stage transition is explicitly recorded and forge.toml remains bound to the approved manifest.
  3. Wrong workspace mapping, unauthorized stage transition or manifest substitution refuses; an unchanged valid basis reaches the intended callback. Keep the current pure source checks as regression controls.
- Negative mutant: Compare only HEAD or accept every post-handoff HEAD change as a candidate; the manifest/dirt/stage mutation tests must fail.
- V-tier: V1, V2, V3; `STAGE-SOURCE-REVALIDATION` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `STAGE-SOURCE-REVALIDATION (planned)`.
- Conditions / unresolved gates: Producer defines candidate/gate stage proof; this row consumes its ratified mapping and does not implement Forge strict-proof semantics in Pi.
- Maps-to: MII P03; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R229, EAT-R230, EAT-R231, EAT-R268; CORRECT — the draft cited R225+ (rights; source admission is R229-R231, R268).
- Predecessor lineage: Extends MNI EAT-R229, EAT-R230, EAT-R231 and EAT-R268 source admission (the draft cited R225+; corrected under RA-10: R225 is rights, source admission is R229-R231 and R268); MII P03/P14.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — pure source checks green today are controls; the candidate-stage mapping consumes the producer's stage proof (G-RATIFY)

## EAT-R411 — Enforce the composed admission dependency order

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The registered function dispatcher MUST enforce one explicitly assigned ordered admission chain whose dependent effect cannot run before its prerequisites are established.
- Rationale: C104 is ESTABLISHED only for descriptor/artifact seam checks; C113 is SUPPORTED non-atomicity. C103/C109/C112/C114/C139/C168 are NON-EPISTEMIC. C140/C142/C163 are UNSUPPORTED label identities/dependencies and cannot establish an implementation DAG. The obligation adopts an explicit DAG, without assuming that P04 composed admission and P04 installed-host review are the same work. Audited basis: C103 NON-EPISTEMIC; C104 ESTABLISHED; C109 NON-EPISTEMIC; C112 NON-EPISTEMIC; C113 SUPPORTED; C114 NON-EPISTEMIC; C139 NON-EPISTEMIC; C140 UNSUPPORTED; C142 UNSUPPORTED; C163 UNSUPPORTED; C168 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C103 NON-EPISTEMIC; C104 ESTABLISHED; C109 NON-EPISTEMIC; C112 NON-EPISTEMIC; C113 SUPPORTED; C114 NON-EPISTEMIC; C139 NON-EPISTEMIC; C140 UNSUPPORTED; C142 UNSUPPORTED; C163 UNSUPPORTED; C168 NON-EPISTEMIC.
- Derived from / remediation: C103, C104, C109, C112, C113, C114, C139, C140, C142, C163, C168; M098, M099, M105, M108, M109, M110, M140, M141, M142, M145, M146, M169, M174.
- Executable acceptance criteria:
  1. A ratified trace enumerates resolve reviewed definition/closure, host intent/scope, adoption and exact grants, measured source/attestation, durable reservation, installed closure/provider readiness, durable intent and final live recheck before effect. Trace validation rejects effect entry with any unestablished prerequisite.
  2. The joint dependency table names Pi composition owner plus installed-host review separately and keys Mechanical dependencies by companion file/section and real work identity, not bare H01/H02 tokens. P05 remains blocked until the specific public composed-host prerequisites exist.
  3. Inject a wait at each preparation/persistence point. The next effect requires a current recheck or fence under EAT-R409; the contract describes residual windows and never labels independent helpers one ACID transaction.
- Negative mutant: Dispatch before an intent write or use an unordered bag of helpers; ordered-trace mutation must fail.
- V-tier: V1, V2, V3; `COMPOSED-ADMISSION-TRACE` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `COMPOSED-ADMISSION-TRACE (planned)`.
- Conditions / unresolved gates: P00 joint DAG/identifier ruling needed. Installed runtime closure is compiled by the artifact/runtime workstream; this row enforces its readiness as a prerequisite.
- Maps-to: MII P03 / P04 / P05; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R206, EAT-R234, EAT-R238; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends live wb-2ukh integrated chain and wb-4bxo dispatch sequencing; does not duplicate wb-y0n6 installed-consumer work.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: DAG / identifier ruling (C140, C142, C163 UNSUPPORTED)

## EAT-R412 — Enable only the genuine registered reviewed function branch

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST route only the reviewed embedded mechanical.development.develop.v1 through the actual registered workflow_execute function branch after composed admission.
- Rationale: C007/C008/C009/C011/C047/C167 are ESTABLISHED at the Pi pin: registration is backend-conditional and function execution absent. C065/C089/C168/C169/C230 are NON-EPISTEMIC. The target is a new route, not a shell/script alias or proof from direct MW fixtures. C169’s native-ref prerequisite is not assumed: missing producer IDs stay absent. Audited basis: C007 ESTABLISHED; C008 ESTABLISHED; C009 ESTABLISHED; C011 ESTABLISHED; C047 ESTABLISHED; C065 NON-EPISTEMIC; C089 NON-EPISTEMIC; C167 ESTABLISHED; C168 NON-EPISTEMIC; C169 NON-EPISTEMIC; C230 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C007 ESTABLISHED; C008 ESTABLISHED; C009 ESTABLISHED; C011 ESTABLISHED; C047 ESTABLISHED; C065 NON-EPISTEMIC; C089 NON-EPISTEMIC; C167 ESTABLISHED; C168 NON-EPISTEMIC; C169 NON-EPISTEMIC; C230 NON-EPISTEMIC.
- Derived from / remediation: C007, C008, C009, C011, C047, C065, C089, C167, C168, C169, C230; M009, M010, M048, M065, M084, M174, M175, M239.
- Executable acceptance criteria:
  1. Load the real Pi extension with its valid workbench backend/native prerequisites, locate the registered tool and invoke kind=function with the adopted reviewed request. The installed producer function is reached exactly once, and the dispatch trace satisfies EAT-R411.
  2. Unknown definition/schema/export, furnace-formula, arbitrary function, unsupported host placement or missing adoption/permission gives zero function callbacks and a bounded refusal. The host uses only reviewed artifact/public host admission, not model-selected imports.
  3. Launch returns a truthful host-minted invocation address and workbench.tool-reply/v1 completion:not-asserted while the worker continues. Real native refs are included only if observed; an empty list is permitted only under option (i) of the EAT-R466 launch-status decision and is never replaced with a synthetic id. Existing script, detached-script and standalone subagent tests remain green.
- Negative mutant: Replace actual registration with a helper call or script wrapper; the registration/branch oracle must fail.
- V-tier: V1, V2, V3; `REGISTERED-FUNCTION-V3` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `REGISTERED-FUNCTION-V3 (planned)`.
- Conditions / unresolved gates: EAT-R391–411 relevant prerequisites plus EAT-R413 gating. Backend-conditional registration is a stated test precondition. V3 deterministic callbacks make no V4 native-provider claim. Launch status for a launch that has no producer-native reference yet is the EAT-R466 decision recorded in the EAT-R405 ratification record; until that record exists criterion 3's status clause is BLOCKED on G-RATIFY (RA-09).
- Maps-to: MII P05; wb-4bxo (open; re-read at filing).
- Extends: EAT-R235, EAT-R236, EAT-R237, EAT-R240, EAT-R270; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends MNI P04 on live wb-4bxo, not live bead labels that merely share MII P05 numbering.
- Linked rows: EAT-R461, EAT-R466.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R461, EAT-R466.
- L0: TRACEABLE; text consolidated: RA-06, RA-09, RA-10; launch-status clause BLOCKED on G-RATIFY (RA-09); acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — definitionally red at the pin (`unsupported-definition-kind`, execute-tool.ts:218); prerequisites EAT-R391..R411, readiness gate EAT-R413; launch-status clause BLOCKED on G-RATIFY until the EAT-R466 decision is recorded in the EAT-R405 ratification record (RA-09)

## EAT-R413 — Keep the known cancellation ordering gate on effectful readiness

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: Effectful function readiness MUST remain disabled or fixture-only while a reused dispatch path can lose the pending skip/retry during parked beforeDispatch. Every effectful function arm, including a newly independent dispatch path, MUST remain gated on the source-pinned EAT-R213 / R214 / R253 repair receipt plus this EAT-R413 gate; no path renaming waives the gate.
- Rationale: C017 is ESTABLISHED with the known cancellation-defect qualification. C123/C168/C174 are NON-EPISTEMIC; M014/M121/M174 and E013 carry the witnessed wb-9v02 repro/EAT-R253 ordering. Closed wb-9v02 is a repro carrier, not a completed repair. This preserves the inherited gate rather than fabricating a live repair bead or a fixed runtime. Audited basis: C017 ESTABLISHED; C123 NON-EPISTEMIC; C168 NON-EPISTEMIC; C174 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C017 ESTABLISHED; C123 NON-EPISTEMIC; C168 NON-EPISTEMIC; C174 NON-EPISTEMIC.
- Derived from / remediation: C017, C123, C168, C174; M014, M121, M174, M181, M182.
- Executable acceptance criteria:
  1. Reuse the existing parked-beforeDispatch repro and record the pre-repair observed-violation output. For a reused affected path, native function readiness stays false until a source-pinned EAT-R253 repair receipt demonstrates pending skip/retry prevents a late SDK start.
  2. An independent dispatch path is not an exception to the EAT-R253 repair gate. Record the design decision and run an equivalent registered-route barrier test (skip/retry while parked yields zero late writer/SDK starts), but keep every effectful arm disabled or fixture-only until the source-pinned EAT-R213 / R214 / R253 repair receipt and this EAT-R413 gate exist. Do not silently waive EAT-R253 by renaming the path.
  3. Remove the readiness dependency in a mutant build with the witnessed path unchanged; the effect-enablement gate test must turn red. No new tests claim the closed repro itself fixed the defect.
- Negative mutant: Mark readiness true because wb-9v02 is closed; the pending-skip native-start gate must fail.
- V-tier: V1, V3, V5; `EAT-R253-READINESS-PRECONDITION` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `EAT-R253-READINESS-PRECONDITION (planned extension, not a new pass)`.
- Conditions / unresolved gates: New live repair/gate carrier required after a fresh bead census; wb-9v02 and wb-3121 are closed evidence carriers, not safe Maps-to live targets. RA-08: the repair itself (legs EAT-R213 / R214 / R253, authority EMPIRICAL_REPAIR; the red-first evidence is the existing repro test/workbench-mwi-cancel-repro.test.ts) is compiled nowhere in EAT-R391..R470 and had no live bead at the 2026-11-11 reads. ONE new bead carries those legs with this row as its gate leg; it is TO-BE-FILED at bead filing by the owner. Until its receipt exists every effectful arm (EAT-R431, R444, R445, R454, R457, R462) stays fixture-only.
- Maps-to: MII P05 / P07; TO-BE-FILED at bead filing by the owner (new bead, blocks every effectful arm per the audit); legs EAT-R213 / R214 / R253 with EAT-R413 as the gate leg.
- Extends: EAT-R213, EAT-R214, EAT-R253; OK — audited lineage retained.
- Predecessor lineage: Preserves MNI EAT-R253 and prior EAT-R160; implementation repair remains test-first from the witnessed red.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-08; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — witnessed repro exists (test/workbench-mwi-cancel-repro.test.ts, kind observed-violation); the repair has no live carrier (RA-08)

## EAT-R414 — Retain existing task and journal custody lineage

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: Function invocation custody MUST reuse the existing Workbench task/observation store and workflow journal lineage unless an explicit recorded supersession of their inherited requirements is adopted.
- Rationale: C173 is SUPPORTED overall, with ESTABLISHED Pi adapters/journal and nonintegrable producer lookup facets. C122/C154/C168/C174 are NON-EPISTEMIC. E046/E178 REFUTE their embedded no-journal gloss: script journals exist but tmpdir/append-without-fsync is not function restart/power-failure proof. This norm preserves EAT-R239/R250, not a claim of current function storage. Audited basis: C122 NON-EPISTEMIC; C154 NON-EPISTEMIC; C168 NON-EPISTEMIC; C173 SUPPORTED; C174 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C122 NON-EPISTEMIC; C154 NON-EPISTEMIC; C168 NON-EPISTEMIC; C173 SUPPORTED; C174 NON-EPISTEMIC.
- Derived from / remediation: C122, C154, C168, C173, C174; M119, M120, M158, M174, M179, M180, M181, M182.
- Executable acceptance criteria:
  1. The implementation decision names existing task/observe and journal modules extended for function state. A registered invocation and workflow_observe address share the same host invocation ID; no hidden parallel task authority is introduced.
  2. If a new durable adapter/store is necessary, its ratification explicitly supersedes the incompatible portions of EAT-R239/R250 with reasons and specifies authoritative migration/projection ownership. Without that record the cut fails the module/storage census.
  3. The function journal’s configured durable local location, access rules and retention survive the declared restart model, rather than inheriting tmpdir cleanup exposure. Existing script journal and task behavior remain regression controls.
  4. The durable record is readable only through the operator-scoped path; an out-of-scope read is refused.
- Negative mutant: Add a private function task map unseen by existing observe or use a purgeable temp journal as declared durable custody; the identity/restart census must fail.
- V-tier: V0, V1, V3, V5; `FUNCTION-CUSTODY-LINEAGE` (planned label from the draft); target detail: V0, V1, V3, V5; planned evidence artifact `FUNCTION-CUSTODY-LINEAGE (planned)`.
- Conditions / unresolved gates: P00 storage decision required; accepting a new adapter does not permit a second hidden task authority. Parent compile must coordinate wb-4bxo task registration.
- Maps-to: MII P05 / P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R239, EAT-R250; OK — audited lineage retained.
- Predecessor lineage: Preserves/explicitly supersedes only by decision MNI EAT-R239 and EAT-R250; extends live wb-mwsy.
- Linked rows: EAT-R416, EAT-R442, EAT-R463.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R463.
- L0: TRACEABLE; text consolidated: RA-13; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: storage decision extend-vs-supersede (M119; EAT-R239/R250)

## EAT-R415 — Acquire the missing joint intent-correlation contract

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Before recovery is enabled, the teams MUST produce inspectable evidence settling the Pi-journal/Mechanical-intent identity, custody and lookup contract for one logical invocation.
- Rationale: C112/C122/C174 are NON-EPISTEMIC with E228 UNDETERMINED embedded intent-correlation premises. C173 is SUPPORTED overall: Pi adapters exist, MW intent functions are module exports only; package reachability is REFUTED and invocation-keyed lookup UNSUPPORTED. This row explicitly acquires the missing contract/evidence instead of assuming an integrable lookup or choosing recovery precedence by inference. Audited basis: C112 NON-EPISTEMIC; C122 NON-EPISTEMIC; C173 SUPPORTED; C174 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C112 NON-EPISTEMIC; C122 NON-EPISTEMIC; C173 SUPPORTED; C174 NON-EPISTEMIC.
- Derived from / remediation: C112, C122, C173, C174; M108, M119, M120, M179, M180, M181, M182.
- Executable acceptance criteria:
  1. Produce a versioned joint record naming Pi admission/dispatch intent ID, Mechanical provider intent ID, their correlation with invocation/source/fence, each store owner/path/lifetime and authoritative recovery precedence. State whether IDs are shared or distinct; no ambiguous receipt intentId remains.
  2. From a fresh independently installed consumer through the ratified public host API, query one invocation and distinguish present-open, present-settled, absent-with-complete-no-dispatch evidence, absent-with-unknown dispatch and corrupt/unreadable record. Preserve the raw producer response plus both source/artifact pins.
  3. Run a cross-record table where Pi intent/dispatch marker exists but MW intent is absent due to pre-provider refusal or process death. Evidence must distinguish the cases or explicitly retain unknown/fenced. Record which cases are settled and which remain unresolved; recovery readiness cannot pass while material cases lack a rule/witness.
- Negative mutant: Treat MW record absence as no-dispatch regardless of Pi dispatch marker; the absent-with-unknown table must fail.
- V-tier: V1, V2, V3, V5; `JOINT-INTENT-CORRELATION-EVIDENCE` (planned label from the draft); target detail: V1, V2, V3, V5; planned evidence artifact `JOINT-INTENT-CORRELATION-EVIDENCE (planned acquisition; unresolved at compile)`.
- Conditions / unresolved gates: Named missing artifacts: joint intent-correlation/precedence specification, invocation-addressable public lookup, and fresh-process cross-record fixtures. No private src import or guessed subpath substitutes for the public API.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R250, EAT-R251, EAT-R261; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R250 custody and live wb-mwsy; carries the actual MW public-export blocker, not the stale absent-host-subpath premise.
- Linked rows: EAT-R444.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — MW exports no invocation-keyed lookup (ERR_PACKAGE_PATH_NOT_EXPORTED for dist/effect-intent.js at 69cb016d, E464; mw-03 H02/H07; wb-1zn2)

## EAT-R416 — Persist correlated intent before possible dispatch

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The function host MUST durably record the correlated intent required at its dispatch boundary before permitting the corresponding effect handoff.
- Rationale: The cited rows are NON-EPISTEMIC. E228 remains UNDETERMINED about correlation/precedence and is handled by EAT-R415; this row is conditional on that decision, not evidence that it exists. E046/E178 preserve the existing script write-ahead mechanism while limiting its fsync/tmpdir assurance. Audited basis: C112 NON-EPISTEMIC; C122 NON-EPISTEMIC; C131 NON-EPISTEMIC; C174 NON-EPISTEMIC; C204 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C112 NON-EPISTEMIC; C122 NON-EPISTEMIC; C131 NON-EPISTEMIC; C174 NON-EPISTEMIC; C204 NON-EPISTEMIC.
- Derived from / remediation: C112, C122, C131, C174, C204; M108, M119, M120, M129, M181, M182, M213.
- Executable acceptance criteria:
  1. After EAT-R415 settles identifiers, instrument persistence acknowledgment and provider dispatch. Assert the required Pi intent precedes Pi handoff and the correlated producer intent precedes writer/gate handoff; a failed required write prevents the matching effect.
  2. On the declared local OS/filesystem, inject file write, fsync, rename/append commit and required parent-directory durability failures according to the chosen journal primitive. Pre-effect failure yields typed refusal and zero provider effects; a post-effect persistence failure yields unknown with retained reservation.
  3. Kill at intent-before-dispatch and dispatch-before-ack barriers, restart in a new process and read the surviving correlated markers. State the demonstrated failure model; fsync calls/process-kill tests alone do not assert measured power-loss survival.
- Negative mutant: Warn and proceed when function intent persistence fails, or dispatch before acknowledgment; zero-effects fault-injection test must fail.
- V-tier: V1, V3, V5; `INTENT-BEFORE-EFFECT` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `INTENT-BEFORE-EFFECT (planned)`.
- Conditions / unresolved gates: Blocked on EAT-R415 and EAT-R414 durable storage choice. MW owns its provider intent persistence; Pi consumes acknowledgment/correlation, never copies producer internals.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R250; OK — audited lineage retained.
- Predecessor lineage: Extends MNI EAT-R250; strengthens function-specific persistence without weakening script regressions.
- Linked rows: EAT-R414, EAT-R442.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — on EAT-R415 (identifiers) and EAT-R414 (durable store)

## EAT-R417 — Replay journal events idempotently without replaying effects

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: A function projection rebuilt from durable events MUST deduplicate by event identity and never dispatch effects as a consequence of projection replay.
- Rationale: All cited rows are NON-EPISTEMIC. K020 distinguishes allowed event/projection replay from forbidden automatic effect replay. E046/E178 refute absence of all existing journals; E169 makes clear green in-memory ingest tests are not fresh-process durability evidence. Audited basis: C064 NON-EPISTEMIC; C122 NON-EPISTEMIC; C174 NON-EPISTEMIC; C202 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C064 NON-EPISTEMIC; C122 NON-EPISTEMIC; C174 NON-EPISTEMIC; C202 NON-EPISTEMIC.
- Derived from / remediation: C064, C122, C174, C202; M064, M119, M120, M181, M182, M211.
- Executable acceptance criteria:
  1. Persist each observed event with event ID, logical invocation/source pin, monotonic local sequence and evidence strength. Native refs are optional until genuinely observed; source refs are not fabricated to fill early events.
  2. Rebuild in a fresh process from duplicate and out-of-order/late terminal events. Assert deterministic projection under the ratified order/gap policy, one effective application per event ID and zero new SDK/gate/writer calls.
  3. Unknown event/schema versions, conflicting duplicate content or a corrupt tail produce typed unresolved/gap state under the ratified policy, not silent settled success. Replaying release_complete cannot release an unrelated generation.
- Negative mutant: Invoke the producer while rebuilding a dispatch_requested row, or count a duplicate twice; replay effect-counter/projection test must fail.
- V-tier: V1, V3, V5; `P16-DURABLE-EVENT-REPLAY` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `P16-DURABLE-EVENT-REPLAY (planned)`.
- Conditions / unresolved gates: Event vocabulary/stage mapping is a joint ABI dependency; observation bridge supplies producer-qualified events, not invented local facts.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R254, EAT-R281; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends MNI journal/reconcile work; keeps projection replay separate from effect retry.
- Linked rows: EAT-R451.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R451.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — observation.ts:638 ingest() is an existing primitive (control); durable fresh-process replay needs the journal extension (EAT-R414)

## EAT-R418 — Keep invocation lifecycle and cancellation transitions evidence-driven

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Function lifecycle/control transitions MUST preserve uncertainty until evidence establishes completion or cancellation, independently of the producer domain result.
- Rationale: C124 is ESTABLISHED for normal four-way develop results, not thrown failures. C064/C123/C125/C174/C224 are NON-EPISTEMIC; K008/K020 require distinct axes/replay meanings. This is a transition contract, not proof that existing controls already target joined native invocations. Audited basis: C064 NON-EPISTEMIC; C123 NON-EPISTEMIC; C124 ESTABLISHED; C125 NON-EPISTEMIC; C174 NON-EPISTEMIC; C224 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C064 NON-EPISTEMIC; C123 NON-EPISTEMIC; C124 ESTABLISHED; C125 NON-EPISTEMIC; C174 NON-EPISTEMIC; C224 NON-EPISTEMIC.
- Derived from / remediation: C064, C123, C124, C125, C174, C224; M064, M121, M122, M123, M181, M182, M233.
- Executable acceptance criteria:
  1. Validate the ratified transition table for admitted/reserved/dispatched/observing/completed_known/outcome_unknown/reconciling/operator_action_required. Launch success alone cannot transition to completed_known; thrown admission/callback errors remain typed, not fabricated domain results.
  2. For pre-effect cancellation, establish no dispatch and safe disposition; after possible effect, cancel requested is distinct from cancel established. Double stop, late acknowledgment or missing native identity cannot produce rollback/completion without affirmative evidence.
  3. Control resolves the exact invocation/native target under current scope/recovery permissions. Cross-principal or wrong-target actions mutate no state and invoke no producer control. A normal domain result is preserved independently of invocation/effect state.
- Negative mutant: Set cancel established or completed_known on control transport success; lost-ack transition test must fail.
- V-tier: V1, V3, V5; `SCOPED-LIFECYCLE-CONTROL` (planned label from the draft); target detail: V1, V3, V5; planned evidence artifact `SCOPED-LIFECYCLE-CONTROL (planned)`.
- Conditions / unresolved gates: Joint enum/native-control mapping and EAT-R413 readiness gate required; strict-assurance proof projection is owned by the observation/verification workstream.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R243, EAT-R252, EAT-R253; CORRECT — the draft cited R251 (native readback; stop asymmetry is R252).
- Predecessor lineage: Extends the controls scope now carried by live wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy) and MNI EAT-R243, EAT-R252 and EAT-R253 ordering (the draft cited R251; corrected under RA-10: R251 is native readback, the stop asymmetry is R252), not closed repro status.
- Linked rows: EAT-R454, EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R454, EAT-R467.
- L0: TRACEABLE; text consolidated: RA-01, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: transition enum / native-control mapping; effectful arms behind EAT-R413

## EAT-R419 — Map refusal codes without losing effect custody

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: The versioned function refusal/recovery mapping MUST preserve whether non-dispatch is established or effects remain possible when translating internal, producer and operator codes.
- Rationale: C126 is ESTABLISHED for workbench.tool-reply/v1 launch-only semantics. C085/C130/C131/C224 are NON-EPISTEMIC; K009 records incompatible public/operator/HOST_* spellings. A mapping is mandated, not inferred from similar names; native-gate-unestablished is not automatically safe no-effect. Audited basis: C085 NON-EPISTEMIC; C126 ESTABLISHED; C130 NON-EPISTEMIC; C131 NON-EPISTEMIC; C224 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C085 NON-EPISTEMIC; C126 ESTABLISHED; C130 NON-EPISTEMIC; C131 NON-EPISTEMIC; C224 NON-EPISTEMIC.
- Derived from / remediation: C085, C126, C130, C131, C224; M080, M124, M128, M129, M233.
- Executable acceptance criteria:
  1. A machine-readable table covers each pi-02 public category, retained Pi seam code and producer HOST_* code, including stale fence, attestation and persistence faults. Each entry specifies public/operator name, pre/post-effect class, custody transition and authorized next action.
  2. Golden fixtures for pre-effect denial show invoked:false/refused with completion:not-asserted and zero effect counters. Post-dispatch abort/lost acknowledgment retain invocation, known native refs and frozen lease with uncertainty, regardless of the translated label.
  3. Unknown codes remain typed unknown/unmapped with conservative custody; no raw paths/secrets leak and no same-spelling alias silently changes semantics. Operator help uses the same versioned mapping rather than an independent success/refusal oracle.
  4. The table has one effect-axis row (K030): a ratified field name, value set and a rule that `no-effect` is never assigned after dispatch; EAT-R439 / R443 / R444 / R445 use that one ratified field name, never competing aliases.
- Negative mutant: Translate HOST_EFFECT_UNKNOWN to safe refused/released; post-effect custody fixture must fail.
- V-tier: V1, V2, V3; `REFUSAL-CUSTODY-MAPPING` (planned label from the draft); target detail: V1, V2, V3; planned evidence artifact `REFUSAL-CUSTODY-MAPPING (planned)`.
- Conditions / unresolved gates: Joint P00 code vocabulary ruling required; observation/operator workstream consumes this table. No change to existing script outer-envelope semantics.
- Maps-to: MII P05 / P07; wb-4bxo (open; re-read at filing).
- Extends: EAT-R205, EAT-R238, EAT-R243; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends MNI registered dispatch/error contract and live wb-4bxo; coordinates the recovery help now carried by wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).
- Linked rows: EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R467.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: K009 vocabulary ruling; producer HOST_* codes have 0 occurrences at 69cb016d (E114)

## EAT-R420 — Reconcile the same invocation without blind effect retry

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Recovery of an unknown function effect MUST use authorized read-only native reconciliation of the same invocation and MUST NOT automatically reinvoke writer or Forge effects.
- Rationale: C083 is SUPPORTED as lost-ack possibility; C132 is ESTABLISHED that clean HEAD cannot establish non-occurrence, reproduced with an ignored-file effect. C173 is SUPPORTED with package-lookup gaps retained; the remaining rows are NON-EPISTEMIC. Recovery is conditional on EAT-R415 public evidence, not assumed from module exports or a clean tree. Audited basis: C064 NON-EPISTEMIC; C083 SUPPORTED; C131 NON-EPISTEMIC; C132 ESTABLISHED; C173 SUPPORTED; C174 NON-EPISTEMIC; C190 NON-EPISTEMIC; C191 NON-EPISTEMIC; C197 NON-EPISTEMIC; C204 NON-EPISTEMIC. All empirical statements retain the environment pins above.
- Epistemic basis: C064 NON-EPISTEMIC; C083 SUPPORTED; C131 NON-EPISTEMIC; C132 ESTABLISHED; C173 SUPPORTED; C174 NON-EPISTEMIC; C190 NON-EPISTEMIC; C191 NON-EPISTEMIC; C197 NON-EPISTEMIC; C204 NON-EPISTEMIC.
- Derived from / remediation: C064, C083, C131, C132, C173, C174, C190, C191, C197, C204; M064, M129, M130, M131, M179, M180, M181, M182, M199, M200, M206, M213.
- Executable acceptance criteria:
  1. Kill/loss-of-ack after edit, restored bytes, ignored/untracked effect, candidate commit and gate dispatch in separate registered trials. Restart, match invocation/source/fence and use read-only producer lookup. Assert no additional writer/SDK/gate attempt and retain known native refs/unknown custody.
  2. A provider not-found response without complete invocation/effect/window lookup remains unknown; clean HEAD/status or absent operation ID is insufficient. Qualified affirmative native occurrence/non-occurrence evidence is retained with provider identity and lookup completeness.
  3. Reattach a still-running producer under current recovery scope to the same logical invocation, not a new invocation. Any new effect attempt requires a distinctly new authorized attempt after safe disposition; ambiguous/corrupt/wrong-scope records remain fenced/operator-action-required.
- Negative mutant: Permit retry solely from clean HEAD or provider not-found; ignored-effect/lost-ack test must show a forbidden second effect and fail.
- V-tier: V1, V2, V3, V5; `NO-BLIND-EFFECT-REPLAY` (planned label from the draft); target detail: V1, V2, V3, V5; planned evidence artifact `NO-BLIND-EFFECT-REPLAY (planned)`.
- Conditions / unresolved gates: Blocked on EAT-R415 exported lookup and correlation, EAT-R403 release law and companion mw-03 H02/H07 native disposition. No Pi private MW import or producer-logic copy.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R251, EAT-R254, EAT-R282; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: Extends MNI effect/journal/reconcile requirements on live wb-mwsy; actual controls are carried by wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).
- Linked rows: EAT-R447, EAT-R450, EAT-R463.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R447, EAT-R450, EAT-R463.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — on EAT-R415 lookup, EAT-R403 release law and producer disposition (mw-03 H02/H07)

## EAT-R421 — Consume `@mechanical/development-rig/host` only from a digest-pinned installed artifact, never from a checkout or a bare specifier

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The Pi host adapter MUST resolve `@mechanical/development-rig/host` exclusively from an installed artifact whose tarball SHA-256 and descriptor SHA-256 equal the values held in Pi's reviewed allowlist entry, imported through the one native-import seam, and MUST refuse (typed `artifact-mismatch` / `descriptor-mismatch`) any resolution from a workspace checkout, a bare specifier resolved by Node's default algorithm, or an artifact whose digests differ.
- Rationale: C019 ESTABLISHED and C073 ESTABLISHED — at MW 69cb016d `./host` is declared in the rig export map (apps/development-rig/package.json:13-19), present in the packed tarball and importable by a tarball-installed external consumer; registry publication is not established, so "shipped" is read in those four senses only (M015/M016). C214 ESTABLISHED — the subpath exports `invokeDevelopmentHost`, `HostAdmissionError`, `HOST_API_VERSION` and binding guards. C164 ESTABLISHED — Pi has the native import seam (`src/workbench/native-modules.ts`) and no `@mechanical/development-rig/host` consumer at 0fb90672. C012 ESTABLISHED — Pi's descriptor/allowlist loader exists, but M011 records that the rig/host package is outside its current allowlist and pin surface (`mechanical-descriptor.ts:131-132` pins `@mechanical/workflows-development` export `develop` — E224/E225). The MNI-era condition "do not hard-code /host as already shipped" (EAT-R221) is retired by C019/C073; this requirement is the consumption those claims now license. C133 NON-EPISTEMIC (proposal: Pi consumes only the subpath and exact pinned tarballs).
- Epistemic basis: C019 ESTABLISHED; C073 ESTABLISHED; C214 ESTABLISHED; C164 ESTABLISHED; C012 ESTABLISHED; C088 ESTABLISHED; C133 NON-EPISTEMIC.
- Derived from / remediation: C019, C073, C214, C164, C012, C088, C133; M011, M015, M016.
- Executable acceptance criteria:
  1. Given a fresh external consumer directory outside both repositories holding the independently packed rig tarball and library tarball, when the adapter is pointed at it with the allowlist digests, then `import()` resolves `@mechanical/development-rig/host` from that installed root (assert the resolved module URL is under the consumer root) and the eight runtime exports listed in C214 are present: `invokeDevelopmentHost`, `HostAdmissionError`, `HOST_API_VERSION`, `HostBindingError`, `WRITE_GRANT`, `admitHostBinding`, `dispatchWriteAtFinalBoundary`, `validateHostBinding`.
  2. Given the same configuration with the rig tarball's digest changed by one byte, or a descriptor byte changed with the ref digest unchanged, then the adapter refuses before `import()` with the typed category and DETECT-ZERO (a) reads 0; the untouched positive control reads 1.
  3. Given a `NODE_PATH`/checkout-resolvable `@mechanical/development-rig` outside the installed root, then the adapter never resolves it (assert the importer seam was handed a `file:` URL under the installed root, never a bare specifier).
  4. Mutant: deleting the digest comparison before `import()` turns criterion 2 red.
- Negative mutant: Mutant: deleting the digest comparison before `import()` turns criterion 2 red.
- V-tier: V2, V3; EAT-R421@V2/V3 (the draft names no artifact; location per EAT-R456); target detail: V2 (fresh external consumer); repeated through ORACLE-REG at V3 once EAT-R426 lands.
- Conditions / unresolved gates: the allowlist entry for the rig package and its export is a P00 decision (M011; C088 ESTABLISHED: both pins share the descriptor id for the descriptor-only library entrypoint, not yet an allowlisted composed rig-host export).
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing).
- Extends: EAT-R220, EAT-R221; OK — audited lineage retained.
- Predecessor lineage: EAT-R221's condition "/host does not exist" is retired at 69cb016d.
- Linked rows: EAT-R449, EAT-R460.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449, EAT-R460.
- L0: TRACEABLE; text consolidated: RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — V2 leg is unblocked at 69cb016d (C019/C073: ./host imports from a tarball-installed consumer); the rig allowlist entry is a G-RATIFY item (M011)

## EAT-R422 — Verify the installed runtime file manifest before the trusted import; tarball re-hash is not sufficient

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: Before the trusted import of the installed host, the Pi adapter MUST verify that every imported JS runtime file of the installed rig and library (dist entry plus transitive local files named by an admitted runtime-file manifest) hashes to the admitted content manifest, and MUST refuse with `installed-content-mismatch` when any file differs while the tarball digest is unchanged.
- Rationale: C033 ESTABLISHED facet (iii) — at MW 69cb016d `installed-host.ts:49-51` re-hashes the tarball, not the installed dist files, before the trusted import, and an executed probe ran a mutated installed `dist/index.js` with the tarball digest unchanged (E104, E206). The producer fix (content-addressed installed manifest, mw-03 H03) is MW-owned; this requirement is Pi's consumer-side guard so that Pi's route cannot execute mutated bytes even if the producer guard is absent (G09 "refuse before trusted import", C195 NON-EPISTEMIC). C166's embedded premise that the existing L2 fixture already proves runtime-file integrity is UNSUPPORTED (E038); M172 lifts MW H03 runtime closure to a release blocker for P04. Authority is RISK_CONTROL: the defect is established in the producer; no Pi route exists yet on which it has been exploited.
- Epistemic basis: C033 ESTABLISHED; C166 NON-EPISTEMIC; C195 NON-EPISTEMIC.
- Derived from / remediation: C033, C166, C195; M036, M172.
- Executable acceptance criteria:
  1. Given an installed consumer whose admitted manifest lists each runtime file with its SHA-256, when `dist/index.js` (rig) or a transitive library file is mutated after extraction with the tarball untouched, then the adapter refuses `installed-content-mismatch` and DETECT-ZERO (a),(b) read 0; the untouched control imports once.
  2. Given a runtime file present on disk but absent from the admitted manifest (an added file), then the adapter refuses; given a manifest entry with no file, then it refuses with a distinct typed reason (not ENOENT).
  3. Given a symlink introduced under the installed root pointing outside it, then the adapter refuses before import (path confinement is re-asserted at the final load, not only at measure time).
  4. Mutant: comparing only the tarball digest (the 69cb016d producer behaviour) turns criterion 1 red.
- Negative mutant: Mutant: comparing only the tarball digest (the 69cb016d producer behaviour) turns criterion 1 red.
- V-tier: V2, V3; EAT-R422@V2/V3 (the draft names no artifact; location per EAT-R456); target detail: V2; repeated through ORACLE-REG at V3.
- Conditions / unresolved gates: the manifest's authoring side (producer-emitted vs Pi-computed at admission) is a P00/H00 ratification item; until ratified the adapter computes and persists its own manifest at first admission and compares at import.
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing).
- Extends: EAT-R220, EAT-R222; OK — audited lineage retained.
- Predecessor lineage: MW-side counterpart (MW H03) tracked in wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: EAT-R449, EAT-R460.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449, EAT-R460.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — Pi-computed manifest path is runnable now; the producer-emitted manifest is mw-03 H03 (wb-1zn2)

## EAT-R423 — Allowlist exactly one composed export; refuse the legacy `invokeDevelopmentHost` for effectful dispatch

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: The Pi adapter MUST call exactly one allowlisted export name of the installed host (COMPOSED-EXPORT) for any effectful dispatch, MUST fail closed on an unsupported `HOST_API_VERSION`, and MUST NOT invoke the legacy `invokeDevelopmentHost(options, input)` for a writer-capable invocation, because that export accepts caller-injected services and takes no binding, grant, source or lease.
- Rationale: C214 ESTABLISHED (at 69cb016d `invokeDevelopmentHost` checks the descriptor digest and calls `invokeInstalledDevelopment`; no parameter or code path reads a host binding; `validateHostBinding` is a shape validator that accepts `allowedEffects ['rm -rf /', ...]` and a nonexistent workspace path — E092). K012 / C133, C165 embedded premise: the universal "no route to an effect without complete trust composition" is UNSUPPORTED while the legacy export stays on the same shipped subpath; it is SUPPORTED only scoped to "through the Pi-facing composed call", and Pi's safety then rests on the Pi-side allowlist of export names (E068). C134 ESTABLISHED (`./host` is the only code subpath in the export map). E225: Pi's reviewed entry at 0fb90672 names the library export `develop`, while the function Pi will call is a not-yet-named export of a different package — M170 (pin all executable packages, define the allowed export, restrict the legacy entry).
- Epistemic basis: C214 ESTABLISHED; C133 NON-EPISTEMIC; C165 NON-EPISTEMIC; C134 ESTABLISHED; C163 UNSUPPORTED; C221 SUPPORTED.
- Derived from / remediation: C214, C133, C165, C134, C163, C221; M169, M170, M171, M230.
- Executable acceptance criteria:
  1. Given the installed host exposes both the legacy export and COMPOSED-EXPORT, when a writer-capable function request is admitted, then the adapter calls COMPOSED-EXPORT exactly once (spy count 1) and the legacy export 0 times.
  2. Given an installed host whose `HOST_API_VERSION` differs from the ratified literal, then admission refuses `definition-unreviewed`/version-mismatch with DETECT-ZERO (b)-(e) at 0.
  3. Given the allowlist names a single export and the installed host offers an additional export with the same callable shape, then only the named export is reachable from the adapter (assert the module namespace is read by the allowlisted name only; an injected `input.export` is ignored — EAT-R223 lineage).
  4. Mutant: falling back to the legacy export when COMPOSED-EXPORT is absent turns criterion 1 red; the correct behaviour is a typed refusal `runtime-unavailable`.
- Negative mutant: Mutant: falling back to the legacy export when COMPOSED-EXPORT is absent turns criterion 1 red; the correct behaviour is a typed refusal `runtime-unavailable`.
- V-tier: V2, V3; EAT-R423@V2/V3 (the draft names no artifact; location per EAT-R456); target detail: V2 for the allowlist/refusal; V3 through ORACLE-REG for the call census.
- Conditions / unresolved gates: COMPOSED-EXPORT does not exist at 69cb016d (E114: 0 occurrences of `invokeAuthorizedDevelopmentHost`); until MW lands it (mw-03 H06) this requirement's positive arm is red and the refusal arm is the shipped behaviour. The cross-corpus dependency label is ambiguous (C163 UNSUPPORTED; C221 SUPPORTED: Pi H01 -> MW H03/H04/H06 by content, never by label). Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing).
- Extends: EAT-R221, EAT-R223; OK — audited lineage retained.
- Predecessor lineage: Carrier role: wb-y0n6 carries the Pi allowlist; the MW composed export is tracked in wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — positive arm: COMPOSED-EXPORT absent at 69cb016d (E114; mw-03 H06); refusal arm NOT_RUN

## EAT-R424 — Bind the serialized `mechanical.pi-host/v1` binding to host-measured facts before it is sent; treat it as evidence to validate, never as authority

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST construct the serialized `mechanical.pi-host/v1` binding (reviewed descriptor id, artifact + descriptor digests, `source {workspaceRealpath, baseCommit, baseTree, forgeManifestSha256}`, Pi invocation id, profile labels, task, `writer:single`, closed `allowedEffects`) from host-measured values only, MUST refuse a caller-supplied binding or any caller field that would populate a binding member, and MUST validate the producer's acceptance of the binding as a shape check only — the binding confers no authority on either side.
- Rationale: C087 ESTABLISHED (at 69cb016d `mechanical.pi-host/v1` has the listed JSON shape and pure validation helpers — host-binding.ts:9,14,29,40,112-124; the current `invokeDevelopmentHost` does not require it; joint ratification is not established). C028 and C093 ESTABLISHED (`git-census-v1`/`plain-v1` exist as validated label constants in MW host-binding and bind no behaviour at either pin; absent from Pi source — the binding carries labels, not selectable profiles, M027). C091 NON-EPISTEMIC (artifact path, write root, permissions, principal, invocation id, fingerprints, profile and backend must not be inferred from caller assertions). C145 SUPPORTED (`mechanical:develop-write` is the exact grant spelling on the MW side, WRITE_GRANT host-binding.ts:14; Pi-side adoption absent, C050 ESTABLISHED). E092: `validateHostBinding` accepts overbroad `allowedEffects` and a nonexistent workspace, so producer validation is not a substitute for Pi's own measurement.
- Epistemic basis: C087 ESTABLISHED; C028 ESTABLISHED; C093 ESTABLISHED; C091 NON-EPISTEMIC; C145 SUPPORTED; C050 ESTABLISHED; C107 ESTABLISHED; C095 REFUTED; C105 NON-EPISTEMIC.
- Derived from / remediation: C087, C028, C093, C091, C145, C050, C107, C095, C105; M026, M027.
- Executable acceptance criteria:
  1. Given an admitted request, when the binding is serialized, then every `source` member equals the value Pi measured at A3 (realpath, `git rev-parse HEAD`, `HEAD^{tree}`, sha256 of forge.toml) and `invocationId` equals the minted `wf_` id; a test that tampers any member between measurement and serialization fails the equality assertion.
  2. Given a caller input carrying `binding`, `source`, `allowedEffects`, `grants` or `profile` members, then admission refuses with DETECT-ZERO (a)-(e) at 0 (request/definition keys are closed at the pin per C095's permitted wording; C095's REFUTED facet, "raw JSON budgets", is not relied on).
  3. Given `allowedEffects` outside the ratified closed set (e.g. `publish-everything`), then Pi refuses before dispatch even though MW's `validateHostBinding` at 69cb016d would accept it (assert both: Pi refusal, and the recorded producer-validator leniency as the reason this check is Pi-owned).
  4. The profile labels in the binding are recorded as `labels` with `profileBinding: "label-only"` until a profile-selection packet binds label to behaviour (M027), and a mutant that reports them as `selected` turns red.
- Negative mutant: The profile labels in the binding are recorded as `labels` with `profileBinding: "label-only"` until a profile-selection packet binds label to behaviour (M027), and a mutant that reports them as `selected` turns red.
- V-tier: V1, V3; EAT-R424@V1/V3 (the draft names no artifact; location per EAT-R456); target detail: V1 (binding construction); V3 through ORACLE-REG.
- Conditions / unresolved gates: ratification of the exact `allowedEffects` value set and grant spelling (P00/H00; C105 NON-EPISTEMIC, C107 ESTABLISHED that "MW-CONTRACT ratification" is not mechanically enforced — adoptFunctionActions has no production caller and any caller can mint an adopted contract, probe P7). Filing-time / next-text-cycle: RA-19.
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing); wb-w8fk (open; re-read at filing).
- Extends: EAT-R203, EAT-R204, EAT-R233; OK — audited lineage retained.
- Predecessor lineage: Carrier roles: wb-y0n6 (binding construction) and wb-w8fk (contract adoption).
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE (conditions: RA-19); acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: closed allowedEffects set and grant spelling

## EAT-R425 — Record runtime identity (Node, SDK) at admission and refuse incompatible runtimes with a typed blocker

- Type: INSTRUMENTATION
- Authority: EVIDENCE_ACQUISITION
- Statement: At every function admission the Pi adapter MUST record the exact `process.version`, the resolved installed rig/library versions and digests, and the resolved identity (specifier, version, resolution path, or `null`) of the Claude Agent SDK and Forge SDK as seen from the installed consumer root; it MUST refuse `runtime-unavailable` when `process.version` is outside the declared joint range or a required SDK does not resolve, and MUST NOT substitute a fixture for a missing native SDK on a native-labelled run.
- Rationale: C218 ESTABLISHED (Pi declares Node >=24, the MW rig >=22.18.0 <25; declared joint overlap is >=24 <25; declarations are not runtime enforcement or measured compatibility — M227 names the Node 24 joined profile and separately tests incompatible-runtime refusal). C021 SUPPORTED (the Claude and Forge legs are not runnable from the packed artifact: the installed CLI exits 2 with `CLAUDE_AGENT_SDK_NOT_INSTALLED` / `FORGE_SDK_NOT_INSTALLED`; both SDKs are absent from the installed closure and the rig manifest is test-pinned not to list the Claude SDK — E101). E226: pinned Mechanical code loads both SDKs by bare specifier at run time (claude-implement.ts:94) and declares neither, so SDK identity is measurable only at the consumer. EAT-R263 lineage: unavailable credentials/binaries record BLOCKED, never an imitation pass.
- Epistemic basis: C218 ESTABLISHED; C021 SUPPORTED.
- Derived from / remediation: C218, C021; M018, M227.
- Executable acceptance criteria:
  1. Given an installed consumer with no SDKs, when a function request is admitted for a native-labelled run, then the admission record carries `sdk.claude: null`, `sdk.forge: null`, the refusal is `runtime-unavailable` naming the missing specifier, and DETECT-ZERO (b)-(e) read 0.
  2. Given the SDKs are installed in the consumer root, then the admission record carries their resolved version strings and resolution paths under the consumer root, and a test asserts the paths are not under either repository checkout.
  3. Given `process.version` is v22.x under a Pi host declaring >=24, then admission refuses `runtime-unavailable` with the measured version in the reason; given v24.x it proceeds (positive control).
  4. Mutant: defaulting a missing SDK to a deterministic spy while keeping the `native` label turns criterion 1 red.
- Negative mutant: Mutant: defaulting a missing SDK to a deterministic spy while keeping the `native` label turns criterion 1 red.
- V-tier: V2, V4; EAT-R425@V2/V4 (the draft names no artifact; location per EAT-R456); target detail: V2 (consumer identity), V4 (real SDK resolution recorded in the receipt, EAT-R431).
- Conditions / unresolved gates: which side owns the SDK pin is a decision conflict (E226: pi-05 assigns it to MW H02; mw-05 says the rig owns the SDKs; mw-02 says the host supplies provider factories) — this requirement records identity regardless of owner and does not resolve the conflict. D-ledger (RA-07): this row is the Pi-side consumption guard for D11 (mw-01 MW-I08, Mechanical P1: the packed host loads callbacks without proving SDK / executable identity or credentials) — identity is recorded and an unavailable runtime is refused, together with EAT-R465 (native-provider readiness axis) and EAT-R431 (BLOCKED, never an imitation); the repair is MW packet mw-03 H03 / H05 (tracker wb-1zn2), never a Pi bead; the severity ruling and the SDK-pin owner (RA-15) are owner-routed through the EAT-R469 crosswalk and the EAT-R405 record. Filing-time / next-text-cycle: RA-15.
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing).
- Extends: EAT-R263, EAT-R271, EAT-R286; OK — audited lineage retained.
- Predecessor lineage: EAT-R286 is the Node 24 release profile.
- Linked rows: EAT-R462.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R462.
- L0: TRACEABLE (conditions: RA-15); acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — V2 identity leg runnable (host node v24.20.0; mise 22.23.2 for the refusal arm); V4 leg BLOCKED by G-NATIVE

## EAT-R426 — One registered launch drives exactly one producer `develop()` over exactly the four callbacks

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: A single admitted `workflow_execute(kind:function)` call through ORACLE-REG MUST result in exactly one COMPOSED-EXPORT invocation, exactly one producer `develop()` run, and the four `DevelopmentServices` callbacks `discover`, `compileContext`, `implement`, `verify` each invoked at most once and bound to the one admitted request/source/fence; a producer that nests a second `develop()` (e.g. `developLive` inside `implement`) or offers an extra/missing callback MUST be surfaced as a typed admission fault, never as a domain outcome.
- Rationale: C018 ESTABLISHED and C215 ESTABLISHED (at 69cb016d ordinary `develop(services, request)` takes exactly `discover`, `compileContext`, `implement`, `verify` and returns a four-arm union; those types do not prove native composition through the Pi tool). C134 ESTABLISHED (`DevelopmentServices` is exactly the four callbacks). E038 (`createDevelopmentServices`, `developThroughHost`, `projectForgeVerification` have no caller in the rig's src and are not re-exported by host.ts; `HOST_SERVICE_NAMES` host-services.ts:10 throws `HOST_SERVICE_EXTRA_MEMBER` on a fifth member — the closed-callback adapter exists but is unwired). C166 NON-EPISTEMIC (P04 Done: "actual MW producer host runs exact four callbacks"; its embedded premise that existing L2 proves production composition is UNSUPPORTED, E038/M172). C169 NON-EPISTEMIC (P05 red tests: callback reached exactly once; absent grant -> zero callbacks). mw-02 §3 / mw-03 H05 falsifiers "duplicate develop() call, two writer SDK queries" are the producer-side mirror.
- Epistemic basis: C018 ESTABLISHED; C215 ESTABLISHED; C134 ESTABLISHED; C166 NON-EPISTEMIC; C169 NON-EPISTEMIC; C008 ESTABLISHED; C041 ESTABLISHED; C140 UNSUPPORTED; C139 NON-EPISTEMIC; C141 NON-EPISTEMIC.
- Derived from / remediation: C018, C215, C134, C166, C169, C008, C041, C140, C139, C141; M172, M173.
- Executable acceptance criteria:
  1. Through ORACLE-REG with an injected installed host whose four callbacks are counting spies, one admitted launch yields counts `discover<=1, compileContext<=1, implement<=1, verify<=1`, COMPOSED-EXPORT call count 1, and one `wf_` invocation id in the reply.
  2. Given an installed host fixture whose `implement` internally invokes a second `develop()` (nested developLive shape), then the Pi adapter's per-invocation guard records `develop()` entry count 2 and surfaces a typed fault (`post-dispatch-aborted` or ratified equivalent) with the first run's native refs retained; the reply is not a four-arm domain outcome.
  3. Given a host exposing five service members or three, then admission refuses before dispatch (DETECT-ZERO (b) at 0) — mirrors `HOST_SERVICE_EXTRA_MEMBER`/missing-member on the producer side but asserted at Pi.
  4. Red-first: the identical ORACLE-REG test at the pre-implementation baseline fails with the unsupported-kind refusal (C008, C041), and that red output is preserved in the packet receipt.
  5. Mutant: removing the once-only guard on `implement` turns criterion 1 red under a host that calls `implement` twice.
- Negative mutant: Mutant: removing the once-only guard on `implement` turns criterion 1 red under a host that calls `implement` twice.
- V-tier: V3, V4; EAT-R426@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3 (deterministic callbacks through the registered tool); the producer-native instance is EAT-R431 at V4.
- Conditions / unresolved gates: COMPOSED-EXPORT ratification (EAT-R423); the P04/P05 ordering is a decision conflict in the program's own DAG (C139, C141 NON-EPISTEMIC; C140 UNSUPPORTED "P04 composed admission" names different work in the graph node and the section) — this requirement orders nothing, it only counts. The EAT-R405 ratification record must choose SDK pin owner, provider-factory ownership (Pi passing callbacks versus Mechanical composing them from host-supplied factories), and the V3 fixture-host injection seam (E226 / K032); this row does not choose for the owners (RA-15).
- Maps-to: MII P05; wb-4bxo (open; re-read at filing).
- Extends: EAT-R235, EAT-R258; OK — audited lineage retained.
- Predecessor lineage: No further lineage stated in the draft.
- Linked rows: EAT-R461.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R461.
- L0: TRACEABLE; text consolidated: RA-15; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — COMPOSED-EXPORT (mw-03 H06) or a ratified fixture-host injection seam (K032); P05 branch

## EAT-R427 — A denied or absent grant yields zero callbacks, sessions, gate requests and workspace writes on the new path

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: On the registered function path, any admission denial — unreviewed definition, descriptor/artifact/installed-content mismatch, missing `workbench:execute` or missing exact `mechanical:develop-write`, principal change, source change, writer held — MUST produce 0 Mechanical callbacks, 0 Claude SDK sessions, 0 Forge `gate.run` requests and 0 workspace writes, measured by DETECT-ZERO with a one-dispatch positive control in the same file; the pin-time refusal of `kind:function` is a baseline control only and does not discharge this requirement.
- Rationale: C206 NON-EPISTEMIC (permitted wording: denial must be measured with independent callback/session/gate/write detectors on the actual new path; pre-existing function refusal is only a baseline control). C050 ESTABLISHED (the adopted function grant is absent from production export; `FUNCTION_ACTION_CONTRACT` unadopted) and C107 ESTABLISHED (adoption is not mechanically gated — any caller can mint an adopted contract, probe P7), so the grant check must be a measured property of the dispatch path, not of the contract constant. C169 NON-EPISTEMIC ("absent grant -> zero callbacks"). C082 SUPPORTED (split-guard counterexample shapes: grant revoked after installation but before first writer effect). Authority RISK_CONTROL: no function dispatch exists at the pin on which a leak has been observed; the guard is ahead of the route.
- Epistemic basis: C206 NON-EPISTEMIC; C050 ESTABLISHED; C107 ESTABLISHED; C169 NON-EPISTEMIC; C082 SUPPORTED; C222 NON-EPISTEMIC.
- Derived from / remediation: C206, C050, C107, C169, C082, C222.
- Executable acceptance criteria:
  1. For each denial category in the list, one ORACLE-REG test injects the fault and asserts DETECT-ZERO (b),(c),(d) at 0 and a Git `status --porcelain` plus tree hash of the authorized root unchanged before/after; the positive control in the same file dispatches once with (b)>=1.
  2. Given `workbench:execute` present and `mechanical:develop-write` absent, then refusal is `permission-unknown`/`grant-revoked` (ratified spelling) and the reply names the host-owned action that could resolve it, never a model-supplied field (C222 NON-EPISTEMIC).
  3. Given a grant present at admission and revoked during an injected async wait before dispatch, then refusal at the final boundary with (b)-(d) at 0 (P13 / G10 shapes; C082 SUPPORTED).
  4. Mutant: checking the grant only at A2 and not at A5 turns criterion 3 red.
- Negative mutant: Mutant: checking the grant only at A2 and not at A5 turns criterion 3 red.
- V-tier: V3; EAT-R427@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: refusal vocabulary has two spellings (K009: pi-02 kebab-case categories vs pi-05 SCREAMING_CASE, two pi-05 codes without a pi-02 category) — tests assert on the ratified table, not on free text.
- Maps-to: MII P05; wb-4bxo (open; re-read at filing); wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R225, EAT-R228, EAT-R238, EAT-R267; OK — audited lineage retained.
- Predecessor lineage: Carrier roles: wb-4bxo (dispatch) with wb-2ukh (authority rechecks).
- Linked rows: EAT-R449, EAT-R453, EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449, EAT-R453, EAT-R467.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — needs the P05 positive control; the pin-time universal refusal is a baseline only

## EAT-R428 — Carry the four-arm domain union unmodified and thrown producer faults on a separate typed channel

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The Pi adapter MUST deliver the producer's `DevelopmentOutcome` (`verified_candidate | verification_failed | needs_evidence | indeterminate`) to the journal and to `workflow_observe` byte-for-byte as returned, and MUST carry every thrown producer fault (`HostAdmissionError`, `ENTRYPOINT_*`, `HostServicesError`, `ENTRYPOINT_OUTPUT_INVALID`, callback exceptions) on a separate typed fault channel with the original code and the stage reached; a thrown fault MUST never be rendered as one of the four outcomes, and an outcome MUST never be rendered as a transport error.
- Rationale: C124 ESTABLISHED (at 69cb016d `DevelopmentOutcome` is exactly the four-way union, contracts.ts:54-58; permitted wording: thrown input/callback/admission/uncertainty errors remain separately observable and must not be collapsed into a fabricated outcome — M122). C215 ESTABLISHED (four callbacks/outcomes are not an exhaustive transport/error taxonomy — M224). E239 (entrypoint-host.ts:124 throws `ENTRYPOINT_OUTPUT_INVALID` when the producer outcome is incomplete; the host call returns only a `DevelopmentOutcome`). C205 NON-EPISTEMIC (target outcome definitions; today's `verified_candidate` is not necessarily strict-native — the assurance axis is EAT-R433, not this row). C172 NON-EPISTEMIC (red test: collapsed `verification_failed` vs `indeterminate`).
- Epistemic basis: C124 ESTABLISHED; C215 ESTABLISHED; C205 NON-EPISTEMIC; C172 NON-EPISTEMIC.
- Derived from / remediation: C124, C215, C205, C172; M122, M178, M214, M224.
- Executable acceptance criteria:
  1. Through ORACLE-REG with deterministic callbacks returning each of the four arms, `workflow_observe` returns `domain.outcome` deep-equal to the producer's returned object (whole payload, not only `kind`), and a snapshot test fixes the field set.
  2. Given `verify` throws, or the installed host throws `ENTRYPOINT_OUTPUT_INVALID`, then observation shows `fault: {code, stage, message}` and `domain.outcome: null`; no field anywhere in the reply equals one of the four arm names.
  3. Given the producer returns `verification_failed` with a transport-level `ok:true`, then the reply's transport status is success and the domain arm is `verification_failed` (not a transport failure).
  4. Mutant: mapping any thrown fault to `indeterminate` turns criterion 2 red; mapping `needs_evidence` to `verification_failed` turns criterion 1 red for that arm.
- Negative mutant: Mutant: mapping any thrown fault to `indeterminate` turns criterion 2 red; mapping `needs_evidence` to `verification_failed` turns criterion 1 red for that arm.
- V-tier: V3, V4; EAT-R428@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3; the native arms arrive at V4 (EAT-R431).
- Conditions / unresolved gates: the exact fault-code table and its mapping to the pi-02 categories and MW `HOST_*` codes is unratified (K009; mw-02 §8 codes have 0 occurrences at 69cb016d, E114). D-ledger (RA-07): criterion 2 is the Pi-side consumption guard for D10 (mw-01 MW-I07, Mechanical P2: a malformed descriptor is dereferenced into a TypeError instead of a typed refusal) — any thrown producer fault stays on the typed fault channel, never an outcome; Pi's own descriptor shape check is EAT-R219; the repair is MW packet mw-03 H04 (tracker wb-1zn2), never a Pi bead; the severity ruling is owner-routed through the EAT-R469 crosswalk.
- Maps-to: MII P05 / P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R242, EAT-R243; OK — audited lineage retained.
- Predecessor lineage: Packet roles: P06 (observation side) and P05 (dispatch side).
- Linked rows: EAT-R452, EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R452, EAT-R467.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch; fault-code table is a G-RATIFY item (K009)

## EAT-R429 — Treat the producer progress channel as data: no outcome change or duplicate effect from a failing sink; stage names mapped, event ids idempotent

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The Pi progress sink handed to COMPOSED-EXPORT MUST be data-only: an exception thrown by the sink MUST neither change the domain outcome nor cause a second callback/SDK/gate dispatch; every progress event MUST carry an idempotent event id (event replay, sense 1) and MUST be mapped from the producer's stage vocabulary (`discovery, context, sdk_startup, first_edit, commit, gate_dispatch, settlement`) to Pi's journal events by a ratified table; durable-custody failures of the sink (journal append error) MUST surface as `uncertain` custody, not as a clean domain error.
- Rationale: C129 NON-EPISTEMIC (rule; permitted wording adds: separately surface durable-custody failures as uncertainty — M127 defines event sink vs durable journal with distinct failure laws). E036 (at 69cb016d `DevelopmentHostOptions` has no signal or progress member — the channel does not exist on the shipped export; it is part of COMPOSED-EXPORT). C133 NON-EPISTEMIC (the cancellation/progress channel is proposed at the composed boundary, not part of the shipped host facade signature; C129 depends on it). E236 (Pi's proposed event names vs MW's test-pinned `PROGRAM_STAGES`, progress-stages.ts:9; each program claims to define the protocol — the mapping must be ratified, K-class vocabulary drift). C172 NON-EPISTEMIC (red tests: out-of-order/gap, duplicate native event, failed progress observer). E169: Pi's observation `ingest()` already returns `applied | duplicate | out-of-order | refused` (observation.ts:638) — a primitive to reuse, not proof of function-event semantics.
- Epistemic basis: C129 NON-EPISTEMIC; C172 NON-EPISTEMIC; C133 NON-EPISTEMIC.
- Derived from / remediation: C129, C172, C133; M127.
- Executable acceptance criteria:
  1. Through ORACLE-REG with a sink that throws on the `first_edit` event, the domain outcome equals the control run's outcome, DETECT-ZERO (b),(c),(d) counts equal the control's counts, and observation marks `progressCustody: "degraded"` with the thrown error recorded.
  2. Given the same event delivered twice with one event id, then `ingest` reports `duplicate` once and the projection is unchanged; given a later event delivered first, then `out-of-order` is recorded and no effect follows.
  3. Given a producer stage name outside the ratified table, then the event is kept raw under `producerStage` and mapped to `unknown-stage`, never dropped and never guessed.
  4. Mutant: letting the sink's exception propagate into the dispatch promise (changing the outcome) turns criterion 1 red.
- Negative mutant: Mutant: letting the sink's exception propagate into the dispatch promise (changing the outcome) turns criterion 1 red.
- V-tier: V3; EAT-R429@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: the stage/event table ratification (E236); COMPOSED-EXPORT progress member (EAT-R423).
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R244, EAT-R248; OK — audited lineage retained.
- Predecessor lineage: lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o) — the draft named it as carrier with wb-9a1o (RA-01).
- Linked rows: EAT-R451.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R451.
- L0: TRACEABLE; text consolidated: RA-01; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — the shipped export has no progress member (E036; mw-03 H06/H07); stage table unratified (E236)

## EAT-R430 — Admit a Claude SDK candidate only on producer-evidenced commit facts; record the session as a native ref or `null`

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST record a candidate commit for the invocation only when the producer's `implement` evidence states all of: HEAD changed from `baseCommit`, tree changed from `baseTree`, worktree status clean, admitted `forge.toml` sha unchanged, and a first-edit observation; the Claude session MUST be recorded as `NativeRef {provider:"claude", type:"session", id, scope}` only when the producer answered with a nonblank id, otherwise `claudeSession: null` with `uncertainty: "session-id-unavailable"`; a no-op commit, a dirty candidate or a manifest edit MUST leave `candidate: null` and MUST NOT be promoted by Pi re-measuring the worktree.
- Rationale: C021 SUPPORTED (Mechanical has the standalone producer code path; the native Claude leg is a 2026-10-15 receipt at then-current sources, not re-run and not runnable from the packed artifact — E101; the capability is historical, not current, M018). mw-02 §3 implement contract ("require HEAD changed, tree changed, clean status, manifest untouched; observe first edit, session identity and committed candidate") is the producer-side stipulation Pi consumes as data. C128 NON-EPISTEMIC and E237 (MW `describeProducerReceipt` substitutes the literal `"uncertain"` for a blank id, host-services.ts:94/:106; Pi's rule is null, never a sentinel). C015 ESTABLISHED (Pi's source admission confines Git worktrees — the dedicated worktree is Pi-measured; its measurement is a precondition, not candidate proof). C030 SUPPORTED (same-invocation observation premise, embedded only).
- Epistemic basis: C021 SUPPORTED; C128 NON-EPISTEMIC; C015 ESTABLISHED; C030 SUPPORTED.
- Derived from / remediation: C021, C128, C015, C030; M018, M126.
- Executable acceptance criteria:
  1. Through ORACLE-REG with an injected `implement` that reports `{headAfter, treeAfter, statusClean:true, manifestSha, firstEditAt, sessionId:"s-1"}` differing from base, observation shows `candidate: {commit, tree}` equal to the reported values and `nativeRefs` containing `{provider:"claude", type:"session", id:"s-1"}`.
  2. Given `implement` reports `headAfter === baseCommit` (no-op), or `statusClean:false`, or `manifestSha !== admitted`, then `candidate: null` with the specific reason, and Pi's own `git rev-parse HEAD` reading is not written into `candidate` (assert the field stays null even when Pi's measurement would differ from base).
  3. Given `sessionId: ""` or the producer string `"uncertain"`, then `claudeSession: null` and no `nativeRefs` entry with id `""` or `"uncertain"` exists anywhere in the reply or journal.
  4. Mutant: filling `candidate` from Pi's post-run worktree measurement turns criterion 2 red.
- Negative mutant: Mutant: filling `candidate` from Pi's post-run worktree measurement turns criterion 2 red.
- V-tier: V3, V4; EAT-R430@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3 (injected implement); V4 with the real SDK (EAT-R431).
- Conditions / unresolved gates: the producer evidence shape for `implement` is part of COMPOSED-EXPORT's progress/result contract (unratified; E114).
- Maps-to: MII P06 / P08; wb-p3i2 (open; re-read at filing); wb-9a1o (open; re-read at filing).
- Extends: EAT-R229, EAT-R242, EAT-R248; OK — audited lineage retained.
- Predecessor lineage: Packet / carrier roles: P08 (native arm) via the P06 projection; wb-p3i2 with wb-9a1o.
- Linked rows: EAT-R462.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R462.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — producer implement-evidence shape unratified (E114); V4 arm by G-NATIVE

## EAT-R431 — Produce one fresh joined V4 receipt at the MII re-pin, through the registered route, with producer-native identities or BLOCKED

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The implementation MUST produce a new receipt at the re-pinned Pi/MW heads in which ORACLE-REG launched `mechanical.development.develop.v1` against the independently packed installed host, the real Claude Agent SDK produced a committed candidate on a disposable clean Forge package, the native Forge full gate ran on that candidate, and `workflow_observe` of the same `wf_` id returned the original domain outcome; every native identity (SDK session id, candidate commit/tree, Forge operation id, gate-definition sha, environment pin) MUST be read back from the producer or provider API, null when unavailable, and the run MUST be recorded `BLOCKED` naming the missing SDK/credential/binary when any native provider is absent — never an imitation pass.
- Rationale: C023 ESTABLISHED (no joined live Claude/Git/Forge Pi receipt exists in the committed stores of either repository at the pins; none could have been produced through the registered route at any ancestor revision; absence beyond the two repositories undetermined — M019 wording). C022 ESTABLISHED (the existing Mechanical assets do not run through registered Pi). C021 SUPPORTED (standalone native legs are historical receipts, M018: produce a fresh native receipt at the re-pinned snapshot before H01/D1 relies on the capability). C185 NON-EPISTEMIC (V4 norm, with the UNDETERMINED strict-attainability premise carried by EAT-R437, not here). C209 NON-EPISTEMIC (capture original envelopes; pending native availability is a named blocker). C211 NON-EPISTEMIC (receipt template; null stays null). C077 ESTABLISHED (the `pi-consumer` fixture is an external Node consumer, not registered Pi — it cannot be relabelled as this receipt). C218 ESTABLISHED (record the exact Node version and SDK identities; EAT-R425).
- Epistemic basis: C023 ESTABLISHED; C022 ESTABLISHED; C021 SUPPORTED; C185 NON-EPISTEMIC; C209 NON-EPISTEMIC; C211 NON-EPISTEMIC; C077 ESTABLISHED; C218 ESTABLISHED; C142 UNSUPPORTED.
- Derived from / remediation: C023, C022, C021, C185, C209, C211, C077, C218, C142; M018, M019, M183, M194, M220.
- Executable acceptance criteria:
  1. The receipt (schema ratified per the EAT-R208/EAT-R291 lineage, or the pi-04 field list marked `proposed`) carries non-null `pi.sha`, `mechanical.sha`, `nodeVersion`, `packages[].sha256` and `packages[].runtimeManifestSha256`, `native.invocationId` equal to the `wf_` id in the execute reply, and `tier: "V4"` only when `native.claudeSessionId`, `candidateCommit`, `candidateTree` and `forgeOperationId` are all non-null and cross-checked against producer/provider readback.
  2. A dry run with the SDK uninstalled yields `status: "BLOCKED"`, `blocker: "CLAUDE_AGENT_SDK_NOT_INSTALLED"` (or the Forge equivalent), all native fields null, and `tier` not `V4`; the evidence validator rejects a receipt claiming V4 with any null native id.
  3. The receipt's `assurance` field equals the EAT-R433 projection for the same invocation (strict-native only with a validated certificate), and `residualUnknowns` lists the EAT-R437 gate when strict was not reached.
  4. Negative: a receipt whose `invocationId` was not minted by ORACLE-REG in the same run (direct host-helper call) fails the registered-route check; a fabricated operation id fails the provider readback.
- Negative mutant: Negative: a receipt whose `invocationId` was not minted by ORACLE-REG in the same run (direct host-helper call) fails the registered-route check; a fabricated operation id fails the provider readback.
- V-tier: V4; EAT-R431@V4 (the draft names no artifact; location per EAT-R456); target detail: V4 (opt-in credentials; native lanes run explicitly, never a default green — EAT-R287 lineage).
- Conditions / unresolved gates: EAT-R421-R426 landed; EAT-R413 (MII carrier of the EAT-R253 gate): the EAT-R253 repair receipt (E013: the parked-beforeDispatch skip loss is unrepaired at 0fb90672 and gates effectful dispatch); MW composed export and native four services (mw-03 H05/H06 — dependency by content, since the label "Mechanical H01/H02/H03" is not a packet reference — C142 UNSUPPORTED); credentials; strict-PASS attainability UNDETERMINED (EAT-R437) — a V4 receipt with `assurance: legacy-weak` is a valid non-strict V4 receipt, not a failure and not a strict pass. Duty split (RA-05): this row owns the receipt content, provider readback and BLOCKED semantics; EAT-R462 owns the acquisition and the external-store census; EAT-R431, EAT-R457 and EAT-R462 are filed as legs of one bead under wb-p3i2.
- Maps-to: MII P08; wb-p3i2 (open; re-read at filing).
- Extends: EAT-R259, EAT-R260, EAT-R263, EAT-R277; OK — audited lineage retained.
- Predecessor lineage: No further lineage stated in the draft.
- Linked rows: EAT-R462.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R462.
- L0: TRACEABLE; text consolidated: RA-05, RA-08, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-NATIVE: MW composed host and native services (mw-03 H05/H06/H07), EAT-R253 repair receipt (no live carrier), credentials not probed; strict clause UNDETERMINED (EAT-R437)

## EAT-R432 — Label the writer's containment tier truthfully: dedicated clean worktree, trusted host, no OS isolation from SDK tool filters

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: Every launch summary, observation reply, receipt and operator document for the function route MUST describe the Claude SDK writer's containment as `trusted-host` with a `dedicated clean Git worktree` scope, MUST NOT use the words `sandbox`, `isolated` (in the containment sense) or `contained` for behaviour that rests on SDK `allowedTools`/prompt narrowing or on Pi's worktree admission, and MUST record any stronger containment only when an OS-level mechanism is named and its escape test is cited.
- Rationale: C079 NON-EPISTEMIC ("no sandbox claim from SDK prompt/tool filters"). C026 permitted wording and K019 ("isolated" in the release headline can be read as the containment the corpus explicitly disclaims; `isolated` means a dedicated worktree rather than containment). C004 NON-EPISTEMIC (the Purpose sentence's "exclusive workspace ownership"/"isolated"; M004: write "dedicated clean Git worktree" for "isolated"). C015 ESTABLISHED (source-admission confines Git worktrees: a path/alias check, not process isolation). MW-I09/D12 (mw-01) is the producer's own statement that `allowedTools` is not OS-enforced write isolation; the Pi README assigns D12 as shared/MW-owned only by label (C032 REFUTED as "described in this corpus"), so this row takes only the wording obligation, not a containment design.
- Epistemic basis: C079 NON-EPISTEMIC; C026 NON-EPISTEMIC; C015 ESTABLISHED; C032 REFUTED; C004 NON-EPISTEMIC.
- Derived from / remediation: C079, C026, C015, C032, C004; M004, M023, M024.
- Executable acceptance criteria:
  1. A text census over the function route's reply builders, observation renderers, receipt emitter and docs/skill files finds `containment: "trusted-host"` on every launch/observation payload and zero occurrences of `sandbox`/`sandboxed` describing the function writer; `isolated` occurs only in the phrase `dedicated clean Git worktree` or with an explicit "not containment" qualifier.
  2. Given a hypothetical stronger tier is configured, then the payload carries `containment: {tier, mechanism, escapeTestRef}` and the census fails when `escapeTestRef` does not resolve to a committed test.
  3. Mutant: a renderer emitting `containment: "sandboxed"` for the trusted-host configuration turns criterion 1 red.
- Negative mutant: Mutant: a renderer emitting `containment: "sandboxed"` for the trusted-host configuration turns criterion 1 red.
- V-tier: V0, V3; EAT-R432@V0/V3 (the draft names no artifact; location per EAT-R456); target detail: V0 (census) exercised at V3 payloads.
- Conditions / unresolved gates: none; stronger containment is post-v1 work (mw-05 "Native OS containment ... must be explicitly engineered/tested").
- Maps-to: MII P08 / P10; new bead owed (containment wording; no live carrier).
- Extends: EAT-R293, EAT-R310; OK — audited lineage retained.
- Predecessor lineage: Packet role: P10 wording for the P08 arm. No live bead carries the containment wording; the nearest live release/docs bead is wb-yiu4 (related, not the carrier).
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — docs census leg runnable today; payload leg waits for P05

## EAT-R433 — Project an assurance axis beside the unmodified domain outcome; `strict-native` only from a validated producer certificate

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: Pi observation MUST carry `assurance` as its own field with the ratified enumeration (Pi proposes `strict-native | legacy-weak | unknown`; MW proposes `descriptor | legacy-observed | candidate-bound-native | strict-native`), MUST set `strict-native` only when a producer-issued verification certificate (`mechanical.forge-certificate/v1` or ratified equivalent) is present and validates, MUST set the weak value for any producer `verified_candidate` that arrives without such a certificate, and MUST never derive `strict-native` from the domain arm, from Forge transport success, or from Pi's own Forge observer alone.
- Rationale: C033 ESTABLISHED facet (i): at MW 69cb016d `live-gate.ts:205-208` classifies a frame as passed unless `gate_passed === false` and `live-development.ts:387` credits that on a commit match (E104, E206). C084 ESTABLISHED: a synthetic legacy PASS frame without gate/tree/environment bindings yields `verified_candidate`; the real 2026-10-15 receipt has `execution_environment.pinned:false` and null envelope gate bindings (E105, E411). C063 NON-EPISTEMIC with its embedded premise UNDETERMINED (E239: the certificate carrier — the host call returns only a `DevelopmentOutcome`, which has no room for a certificate; Pi's `forge-operation-observer.ts` reads `gated_commit`/`gated_tree` only and none of `gate_passed`, `gate_definition`, `execution_environment`). C125 NON-EPISTEMIC and K008 (3-valued vs 4-valued assurance; E114: none of the vocabulary exists in producer code at the pin — what exists is `GateBinding {commit: native|run_record|descriptor, gateDefinition: native|descriptor, environment: established|descriptor}`). C223 NON-EPISTEMIC (current legacy `verified_candidate` must never be shown as strict-native by itself). Authority RISK_CONTROL: a misleading PASS is the Purpose's named exclusion ("no false Forge verification") and is plausible from the established producer leniency; no Pi function route has yet rendered one.
- Epistemic basis: C033 ESTABLISHED; C084 ESTABLISHED; C063 NON-EPISTEMIC; C125 NON-EPISTEMIC; C223 NON-EPISTEMIC.
- Derived from / remediation: C033, C084, C063, C125, C223; M036, M063, M123, M232.
- Executable acceptance criteria:
  1. Through ORACLE-REG with a producer returning `verified_candidate` and no certificate, observation shows `domain.outcome.kind: "verified_candidate"` AND `assurance: <weak value>`; no field reads `strict-native`.
  2. Given a producer-issued certificate object that validates (EAT-R434), then `assurance: "strict-native"` with `assurance.certificateRef` set; given the same object with one bound field altered, then `assurance` is the weak/unknown value with `missingAxes` naming the field.
  3. Given the producer result is `verification_failed` with a complete native-FAIL subject, then `assurance` reflects the certificate state and the domain arm stays `verification_failed` (measured red is not `indeterminate`, Q07 shape).
  4. Until the enumeration is ratified, the field carries `assuranceVocabulary: "proposed:pi-02"` and a lossless `producerBinding` copy of the raw `GateBinding` triple when present (M123: lossless mapping from legacy producer values).
  5. Mutant: setting `assurance` from `domain.outcome.kind === "verified_candidate"` turns criterion 1 red.
- Negative mutant: Mutant: setting `assurance` from `domain.outcome.kind === "verified_candidate"` turns criterion 1 red.
- V-tier: V3, V4; EAT-R433@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3 (injected certificates); V4 instance via EAT-R431/EAT-R437.
- Conditions / unresolved gates: certificate carrier and transport (E239 UNDETERMINED: the composed export's result type must carry it, or a side channel must be ratified); enumeration ratification (K008).
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R244, EAT-R245, EAT-R274; OK — audited lineage retained.
- Predecessor lineage: No further lineage stated in the draft.
- Linked rows: EAT-R437, EAT-R446.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R446.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — certificate carrier UNDETERMINED (E239); producer certificate absent (mw-03 H01); enumeration unratified (K008)

## EAT-R434 — Validate the producer certificate against the envelope Pi independently observed; disagreement is never strict (G01/G03 Pi-side)

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: When a certificate is presented, Pi MUST validate each bound field against the original Forge envelope it observed for the same operation id — `data.gate_passed === true`, `gate_definition` present with sha equal to the admitted `forge.toml` sha, `execution_environment.pinned === true` with an identity digest, `terminal_fact === "completed"`, delivery complete, verdict PASS with no envelope/data contradiction, candidate commit equal to `gated_commit` — and MUST emit a compact missing-axis report and withhold `strict-native` when any axis is absent or disagrees; Pi MUST NOT construct a certificate of its own from the envelope or from local measurements.
- Rationale: C187 NON-EPISTEMIC (G01: nominal PASS missing `gate_passed` → no strict verification; permitted wording: the producer at 69cb016d does not satisfy this guard; M196: producer red first, Pi projection assertion second). C189 NON-EPISTEMIC (G03: missing/contradicted gate-definition/environment → no strict promotion; assert environment eligibility, not mere field presence — M198). K023 RESOLVED-BY-SOURCE and E079: the Forge reference documents `data.gated_commit` (HEAD at run START), `data.gated_tree` (HEAD's tree at run start when clean, `""` otherwise), `gate_passed`, `gate_definition`, `execution_environment`; MW's reader consumes them. E239: "Avoid redundant inconsistent oracles" (mw-02:55) — hence validate-the-producer's-certificate, not build-a-second-one. C033 ESTABLISHED (the producer leniency being guarded against).
- Epistemic basis: C187 NON-EPISTEMIC; C189 NON-EPISTEMIC; C033 ESTABLISHED.
- Derived from / remediation: C187, C189, C033; M196, M198.
- Executable acceptance criteria:
  1. For each axis in the list, one ORACLE-REG test presents a certificate whose field is present and an observed envelope lacking or contradicting that field (G01: `gate_passed` absent; G03: `gate_definition` absent, sha mismatched, `pinned:false`; Q06: `terminal_fact !== "completed"`, contradictory verdict), and asserts `assurance !== "strict-native"` and `missingAxes` contains exactly that axis.
  2. Positive control: a certificate and envelope agreeing on all axes yields `strict-native` and an empty `missingAxes`.
  3. Negative: Pi never emits a `certificate` object when the producer sent none (assert absence of a Pi-authored `schema: "mechanical.forge-certificate/v1"` anywhere in Pi output); the raw observed envelope is retained under `forge.envelope` for audit.
  4. Mutant: accepting `gate_passed` undefined as pass (the 69cb016d producer behaviour) turns the G01 test red.
- Negative mutant: Negative: Pi never emits a `certificate` object when the producer sent none (assert absence of a Pi-authored `schema: "mechanical.forge-certificate/v1"` anywhere in Pi output); the raw observed envelope is retained under `forge.envelope` for audit. | Mutant: accepting `gate_passed` undefined as pass (the 69cb016d producer behaviour) turns the G01 test red.
- V-tier: V3, V4; EAT-R434@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3 (synthetic envelopes through Pi's Forge observer path); V4 for one real envelope (EAT-R437).
- Conditions / unresolved gates: the `execution_environment.pinned:true` axis may be unattainable in the first-release topology (EAT-R437); until settled, a `pinned:false` envelope yields the weak value by design and the release definition's strict clause stays UNDETERMINED. D-ledger (RA-07): this row is the Pi-side consumption guard for D8 (mw-01 MW-I06, Mechanical P1: the projection checks the candidate commit only, not all strict axes) — every axis is validated against the observed envelope and a partial certificate is never strict; the repair is MW packet mw-03 H01 (tracker wb-1zn2), never a Pi bead.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R245, EAT-R274; OK — audited lineage retained.
- Predecessor lineage: Producer counterpart MW H01 (mw-03 numbering) tracked in wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: EAT-R437, EAT-R446.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R446.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — no producer certificate at 69cb016d (mw-03 H01); pinned-environment axis unattained (EAT-R437)

## EAT-R435 — Treat a missing native candidate tree as indeterminate for strict credit; never substitute a locally measured tree (G02, D7 Pi-side)

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: When the observed envelope's `gated_tree`/`source_tree` is empty or absent (the run started dirty, or the field was not delivered), Pi MUST keep the strict result `indeterminate`/non-strict even if `gated_commit` matches the candidate, MUST leave `verifiedTree: null`, and MUST NOT write its own `git rev-parse HEAD^{tree}` reading, the producer's locally re-measured `gate.basis.tree`, or a cached `forge.toml` hash into the verified-tree or gate-definition fields of the settlement or observation records.
- Rationale: C033 ESTABLISHED facet (i)/(D7): `live-development.ts:414` feeds settlement the locally measured `gate.basis.tree` and the cached manifest hash the frame never stated; the executed probe produced a `settled` intent whose `committedTree` and `gateDefinitionSha256` are host-local values (E104). C188 NON-EPISTEMIC (G02; permitted wording: local current HEAD is not proof of that run; M197: specify field paths and the clean-start condition). E079 (`gated_tree` is `""` when the run starts dirty — the clean-start condition is the documented witness, not "independent native tree proof"). C132 ESTABLISHED is the sibling principle for effects (a time-local worktree observation proves nothing about the run).
- Epistemic basis: C033 ESTABLISHED; C188 NON-EPISTEMIC; C132 ESTABLISHED.
- Derived from / remediation: C033, C188, C132; M197.
- Executable acceptance criteria:
  1. Through ORACLE-REG with an observed envelope `{gated_commit: <candidate>, gated_tree: ""}` and a producer certificate claiming a tree, observation shows `assurance !== "strict-native"`, `verifiedTree: null`, `missingAxes: ["candidate-tree"]`.
  2. Given Pi's own worktree measurement at observation time equals the candidate tree, criterion 1 still holds (assert the local measurement is recorded under `pi.measuredTree` and never copied into `verifiedTree`).
  3. Given `gated_tree` present and equal to the candidate tree with all other axes complete, then `verifiedTree` equals the envelope value (positive control).
  4. Mutant: defaulting `verifiedTree` from the local tree when the envelope tree is empty turns criterion 1 red.
- Negative mutant: Mutant: defaulting `verifiedTree` from the local tree when the envelope tree is empty turns criterion 1 red.
- V-tier: V3, V4; EAT-R435@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3; V4 instance via EAT-R437.
- Conditions / unresolved gates: whether Forge also delivers `source_tree` in the result data for the MW reader's fallback path is part of the field-path ratification (M197).
- Maps-to: MII P06 / P07; wb-9a1o (open; re-read at filing); wb-mwsy (open; re-read at filing).
- Extends: EAT-R231, EAT-R245; OK — audited lineage retained.
- Predecessor lineage: Packet roles: P06 / P07 (observation and settlement records); wb-9a1o with wb-mwsy; extends EAT-R245 criterion 4.
- Linked rows: EAT-R437, EAT-R446.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R446.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — negative arm runs on injected envelopes; positive control BLOCKED on the producer certificate

## EAT-R436 — Source drift after a gate: preserve the historical subject, mark freshness stale, promote nothing (G12 split)

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST split source drift into two cases and handle each without promotion: (a) drift between the gate response and producer settlement → retain the weak native observation, no strict credit, `freshness: "stale"`; (b) drift after a settled strict certificate → preserve the certificate with its original candidate commit/tree as a historical subject, set current `freshness: "stale"` and `currentSourceCredit: false`; in neither case may Pi credit the current HEAD/tree with the gate or invent a certificate the producer did not issue.
- Rationale: C198 NON-EPISTEMIC (G12; permitted wording and M207: split gate-response-to-settlement drift from post-settlement drift; Pi never invents a certificate the producer declined to issue). C033 ESTABLISHED (the producer credits a commit match alone at the pin — the Pi projection cannot inherit that credit). C030 SUPPORTED (same-invocation observation is the surface where freshness is shown; observation.ts `ingest` marks gaps stale — E173). EAT-R245 B07 lineage (cached historical PASS + moved HEAD → stale).
- Epistemic basis: C198 NON-EPISTEMIC; C033 ESTABLISHED; C030 SUPPORTED.
- Derived from / remediation: C198, C033, C030; M207.
- Executable acceptance criteria:
  1. Through ORACLE-REG, a native-shaped PASS observed, then HEAD moved before the producer reports settlement: observation shows `assurance` weak, `freshness: "stale"`, `currentSourceCredit: false`, historical envelope retained.
  2. A validated strict certificate settled, then HEAD moved: observation shows `certificate.candidate.{commit,tree}` unchanged, `freshness: "stale"`, `currentSourceCredit: false`, and `assurance` still `strict-native` for the historical subject (not revoked, not re-credited).
  3. Negative: no code path sets `currentSourceCredit: true` after a drift event without a new certificate for the new commit (mutant: re-crediting on HEAD match turns criterion 2 red).
- Negative mutant: Negative: no code path sets `currentSourceCredit: true` after a drift event without a new certificate for the new commit (mutant: re-crediting on HEAD match turns criterion 2 red).
- V-tier: V3, V4; EAT-R436@V3/V4 (the draft names no artifact; location per EAT-R456); target detail: V3; V4 instance when EAT-R437 settles.
- Conditions / unresolved gates: none beyond EAT-R433's enumeration.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R245, EAT-R275; OK — audited lineage retained.
- Predecessor lineage: EAT-R245 is extended at B07. lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o) — the draft named it as co-carrier (RA-01).
- Linked rows: EAT-R437, EAT-R446.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R446.
- L0: TRACEABLE; text consolidated: RA-01; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — weak-drift arm runnable after P05; strict-drift arm BLOCKED on the producer certificate

## EAT-R437 — Settle strict-native attainability: one real pinned-environment envelope, or a recorded joint decision; until then say UNDETERMINED

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Before any receipt, W11 row, skill or docs text asserts that the first release's "strict native Forge gate" is achievable, the implementation MUST obtain one native `gate.run` envelope from the installed Forge on a clean committed disposable package in the first-release topology showing `execution_environment.pinned: true` with native `gated_commit`, non-empty `gated_tree` and `gate_definition`, OR record an owner/joint decision that strict v1 does not require the environment pin (with the certificate schema amended accordingly); until one exists, every surface MUST describe strict-native attainability as `undetermined` and every V4 receipt MUST carry that residual unknown.
- Rationale: C026 facet "strict-native Forge PASS attainable in the first-release topology" UNDETERMINED; C175 and C185 NON-EPISTEMIC with the same `missing_to_settle` ("one native gate.run envelope ... showing execution_environment.pinned true with native commit, tree and gate definition"; M183/M194 PRESERVE_AS_UNDETERMINED). E105/E411: the only real native receipt (2026-10-15) has `execution_environment: {kind:'host', pinned:false}` and null envelope gate bindings; EPISTEMIC-AUDIT §3: `pinned` is false in all 148 occurrences across committed MW evidence and true only in synthetic test fixtures. C181/C036 ESTABLISHED as self-reports (no command or gate was executed in authoring). UNDETERMINED compiles to evidence acquisition, never to a positive premise (hard invariant 15).
- Epistemic basis: C026 NON-EPISTEMIC; C175 NON-EPISTEMIC; C185 NON-EPISTEMIC; C181 ESTABLISHED; C036 ESTABLISHED; C029 REFUTED.
- Derived from / remediation: C026, C175, C185, C181, C036, C029; M023, M024, M025, M183, M184, M194.
- Executable acceptance criteria:
  1. An artifact exists at the durable receipt location: either (a) an original Forge envelope JSON (not an assistant summary) with `data.execution_environment.pinned === true`, non-empty `gated_commit`, `gated_tree`, `gate_definition`, produced by a recorded command on a disposable clean package at recorded Pi/MW SHAs; or (b) a dated decision record naming the owner and the amended strict rule.
  2. The evidence validator refuses a receipt with `assurance: "strict-native"` while neither (a) nor (b) exists, and refuses a W11/docs change that drops the `undetermined` qualifier without citing (a) or (b).
  3. A docs/skill census asserts the strict clause is accompanied by `attainability: undetermined` text until criterion 1 is met (reusing the frozen-shape census pattern of test/workbench-mwi-docs-remediation-census.test.ts without editing its pinned rows).
  4. Negative: a synthetic fixture envelope with `pinned:true` is rejected as evidence for criterion 1(a) (assert provenance is a recorded live command, with operation id readable from the Forge ledger).
- Negative mutant: Negative: a synthetic fixture envelope with `pinned:true` is rejected as evidence for criterion 1(a) (assert provenance is a recorded live command, with operation id readable from the Forge ledger).
- V-tier: V0, V4; EAT-R437@V0/V4 (the draft names no artifact; location per EAT-R456); target detail: V4 (one real envelope) or V0 (decision record); the census at V0.
- Conditions / unresolved gates: installed Forge availability and credentials (BLOCKED, not imitated — EAT-R263 lineage); the first-release topology decision (embedded same-machine; C029 REFUTED "attached" — placement wording ruled elsewhere).
- Maps-to: MII P08; wb-p3i2 (open; re-read at filing).
- Extends: EAT-R259, EAT-R261, EAT-R274; OK — audited lineage retained.
- Predecessor lineage: Carrier role: wb-p3i2 (native); MW H01 tracked in wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target); new as an explicit attainability gate.
- Linked rows: EAT-R433, EAT-R434, EAT-R435, EAT-R436.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-FORGE-ENVELOPE: UNDETERMINED - 148/148 committed occurrences read pinned:false (ledger); the installed Forge envelope was not probed by the triage; alternative (b) is a G-RATIFY decision

## EAT-R438 — Resolve the function invocation by the same minted `wf_` id in embedded mode, durably across an extension restart; never tell the model to observe what cannot be observed

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: For an embedded function launch, `workflow_observe` MUST resolve the invocation by the exact `wf_` id returned in the `workflow_execute` reply, within the same session/workspace/principal scope, from a durable task record that survives an extension restart; for any host mode in which the invocation is not observable through the registered tool, the execute reply MUST NOT instruct the model to observe it and MUST state the observability limit instead.
- Rationale: C030 SUPPORTED (permitted wording: Pi registers `workflow_observe`, and for an EMBEDDED launch the minted `wf_` reference is observable within the same extension process and session; a detached launch returns the same reference but is not observable through the registered `workflow_observe` at the pin, and no observation survives an extension restart — E035: `launchDetachedWorkflow` registers no task; `workflowTasks` is an in-memory Map, index.ts:2460; execute-tool.ts:163,179 tells the model to "observe the launch through workflow_observe"; E174: same handle in embedded mode, :3014/:2624/:2637/:2961). C213 ESTABLISHED (the registered observe tool reads scoped script tasks by `taskId`; it does not establish joined Mechanical observation). C053 ESTABLISHED (Mechanical logical invocation → producer refs/evidence/effect disposition not connected at 0fb90672). M030 (split embedded premise from detached/restart gaps; fix the reply text). C029 REFUTED is not relied on: this row does not define placement, it conditions on the observability fact.
- Epistemic basis: C030 SUPPORTED; C213 ESTABLISHED; C053 ESTABLISHED; C029 REFUTED.
- Derived from / remediation: C030, C213, C053, C029; M030, M031, M222.
- Executable acceptance criteria:
  1. Through ORACLE-REG in embedded mode, `workflow_observe({taskId: reply.invocationId})` returns the function invocation's projection; `workflow_observe` with a different session/workspace/principal returns the existing scope refusal (index.ts:2965 text) and no fields.
  2. After the extension's in-memory task registry is dropped and rebuilt from the durable record (simulated restart: new registry instance, same session task directory), the same `taskId` resolves with `freshness` reflecting the gap and `source: "durable-record"`; at the pre-implementation baseline the same test returns "Workflow unavailable" (red-first evidence preserved).
  3. First-release assertion: a detached function launch is refused (EAT-R404 criterion 3, EAT-R412 criterion 2), and a text census over `src/workbench/execute-tool.ts` reply builders asserts that no function-route reply contains "observe the launch through workflow_observe" for a mode that is not observable. DEFERRED to P11 (EXTENDS EAT-R296; carrier wb-zswl): for an admitted detached function launch the execute reply's guidance text does not contain that instruction and carries an explicit `observability: "not-observable-in-this-mode"` member.
  4. Mutant: reading the projection only from the in-memory Map turns criterion 2 red.
- Negative mutant: Mutant: reading the projection only from the in-memory Map turns criterion 2 red.
- V-tier: V3, V5; EAT-R438@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3; restart instance at V5 (wb-9bof lineage).
- Conditions / unresolved gates: durable record location (M222: define logical invocation-to-existing task/store mapping without parallel hidden state; EAT-R239 lineage says the existing Workbench task/observation store). Filing-time / next-text-cycle: RA-16, RA-19.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R239, EAT-R246, EAT-R275; OK — audited lineage retained.
- Predecessor lineage: lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o) — the draft named it as the sole carrier (RA-01).
- Linked rows: EAT-R463.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R463.
- L0: TRACEABLE (conditions: RA-16, RA-19); text consolidated: RA-01, RA-06; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch and the durable task record (EAT-R414)

## EAT-R439 — Correlate one logical invocation across Pi, package, source, producer, Claude, Forge, assurance, effect and freshness as separate fields with explicit unknowns

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: `workflow_observe` for a function invocation MUST return, each as its own field: Pi invocation id; rig and library package digests and descriptor digest; source `{baseCommit, baseTree, forgeManifestSha256, workspaceRealpath-redacted}`; producer stage (raw and mapped) and the unmodified domain outcome (EAT-R428); Claude session ref; Forge operation ref and observed envelope summary; assurance (EAT-R433) with missing axes; effect disposition (EAT-R443, using the one ratified effect-axis field name and value set in EAT-R419); `freshness`, `sourceCursorGap` and `droppedEventCount`; every unavailable member MUST be rendered as an explicit `null` with an `unknown` marker, never omitted and never defaulted.
- Rationale: C127 NON-EPISTEMIC (proposed correlation list; M125 ADD_MISSING_PREMISE: define public parameters versus injected scope, certificate transport/validator ownership, stage mapping and authorized post-restart access; its embedded certificate premise is UNDETERMINED, E239). C052 ESTABLISHED (bounded, workspace/principal-scoped native observation exists in memory; `ObserveRequest {scope, invocationId, cursor, limit, selectors, maxBytes}`, freshness/anomalies/droppedForBytes exist in observe-query.ts — E173: primitives to extend). C053 ESTABLISHED (the join does not exist). C213 ESTABLISHED (registered tool parameter is `taskId`, not `scope`+`invocationId`: the public parameter stays `taskId` and scope is injected from host state, per M125). C218 ESTABLISHED (record exact runtime identity — surfaced here as fields).
- Epistemic basis: C127 NON-EPISTEMIC; C052 ESTABLISHED; C053 ESTABLISHED; C213 ESTABLISHED; C218 ESTABLISHED.
- Derived from / remediation: C127, C052, C053, C213, C218; M125, M222.
- Executable acceptance criteria:
  1. Snapshot test through ORACLE-REG: a settled fixture invocation's observation has every listed field present; a JSON-schema check marks each as required with `null` allowed and forbids additional unknown top-level members.
  2. With the Forge operation withheld, the reply has `forge: null`, `assurance: "unknown"` (or ratified weak value), `missingAxes` listing the operation, and `unknowns: ["forge.operation"]`; no field is omitted.
  3. The reply's `scope` is host-injected (assert that a caller-supplied `scope`/`invocationId` member in the tool input is ignored or refused; the registered parameter remains `taskId`).
  4. Model-visible bytes are bounded (`maxBytes`) while the durable record retains the full field set; a truncated reply sets `truncated: true` and keeps the invocation id (EAT-R440).
  5. Mutant: omitting a `null` member instead of rendering it turns criterion 2 red.
  6. Model-visible summaries and file names are redacted under the existing observe scope rules; the test asserts no workspace-absolute path or note text in the reply.
- Negative mutant: Mutant: omitting a `null` member instead of rendering it turns criterion 2 red.
- V-tier: V3; EAT-R439@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: certificate transport (E239), stage table (E236), field ratification against the MW receipt vocabulary (E220: four effect-disposition spellings in MW code/receipts alone).
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R244, EAT-R247; OK — audited lineage retained.
- Predecessor lineage: lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o) — the draft named it as carrier with wb-9a1o (RA-01).
- Linked rows: EAT-R463.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R463.
- L0: TRACEABLE; text consolidated: RA-01, RA-13, RA-15; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch; certificate and stage fields are G-RATIFY items

## EAT-R440 — Native refs are `{provider, type, id, scope}` or `null`: normalize producer sentinels at the boundary, drop clipped refs on truncation, keep the invocation addressable

- Type: NEGATIVE_REGRESSION
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST represent every native identity as `NativeRef {provider, type, id, scope}` with a nonblank producer-answered `id`, MUST convert a producer sentinel (`"uncertain"`, `""`, whitespace) into `null` plus a separate uncertainty marker at the Pi boundary, MUST omit (not clip) a native ref that does not fit the model-visible byte budget while retaining the `wf_` invocation address and `truncated: true`, and MUST ensure control/reconcile paths cannot manufacture a missing producer reference.
- Rationale: C128 NON-EPISTEMIC (rule) and E237 (Pi `NativeRef` observation.ts:2 requires `id: string`; MW `describeProducerReceipt` emits the literal `"uncertain"` for a blank id, host-services.ts:94/:106, and `agentSessionId: string | null` in progress-stages.ts:38 — two conventions meet at the boundary; M126: ratify null/omitted representation; include a nonblank uncertain sentinel negative control). C203 NON-EPISTEMIC (P17; permitted wording: retain a host invocation address while omitting clipped native refs; never the string `uncertain` as an id; its embedded premise that existing seam behaviour settles the function case is UNSUPPORTED — E169: execute-tool.ts:146-147,162-164 already drops refs on trimmed identity for the script path). C172 NON-EPISTEMIC (blank native id, truncation, native record unavailable). C201 NON-EPISTEMIC (P15: host-minted scope; zero cross-principal events through the new bridge).
- Epistemic basis: C128 NON-EPISTEMIC; C203 NON-EPISTEMIC; C172 NON-EPISTEMIC; C201 NON-EPISTEMIC.
- Derived from / remediation: C128, C203, C172, C201; M126, M178, M212.
- Executable acceptance criteria:
  1. Given a producer receipt with `claude_session_id: "uncertain"` and `forge_operation_id: ""`, observation shows `nativeRefs: []` for those providers, `claudeSession: null`, `forge: null`, `unknowns` naming both; a JSON search over the reply and journal finds no `id` equal to `"uncertain"` or `""`.
  2. Given a native id of 4,000 characters and `maxBytes` that cannot hold it, the reply has `truncated: true`, `invocationId` present and the long ref absent (not clipped to a prefix); the durable record retains the full id.
  3. Given a `workflow_reconcile`/`workflow_control` call for an invocation with `forge: null`, the result contains no synthesized operation id (assert every `nativeRefs[].id` in the control reply existed in the journal before the call).
  4. Given a ref whose `scope` differs from the caller's host-injected scope (P15 replay), the event is `refused` by `ingest` and never rendered.
  5. Mutant: passing the producer's `"uncertain"` through as an `id` turns criterion 1 red.
- Negative mutant: Mutant: passing the producer's `"uncertain"` through as an `id` turns criterion 1 red.
- V-tier: V3; EAT-R440@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: ratified null/omitted representation (M126). Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P06 / P07; wb-9a1o (open; re-read at filing); wb-mwsy (open; re-read at filing).
- Extends: EAT-R247, EAT-R248; OK — audited lineage retained.
- Predecessor lineage: lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o); lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy) — the draft named both as carriers (RA-01).
- Linked rows: EAT-R451.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R451.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-01; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch; null/omitted representation unratified (M126)

## EAT-R441 — Keep the launch reply launch-only: actual envelope, `completion: "not-asserted"`, no success glyph, no illustration literals

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The function launch reply MUST keep the registered tool's model-facing envelope as pinned — `contract: "workbench.tool-reply/v1"`, `tool: "workflow_execute"`, `ok`, `invoked`, `status`, `completion: "not-asserted"`, `nativeRefs` and the optional members `invocationId`, `definition`, `hostMode`, `nativeRefsOmitted`, `policy`, `provenance`, `error`, `truncated {reason, maxBytes}`, `truncation` — adding only versioned members; MUST NOT add the illustration member `next` or emit the bare string `tool-reply/v1`; MUST NOT emit `accepted` for the function route without a ratified meaning, and no launch, observation or UI surface MAY render SUCCESS/completed/verified from a launch result.
- Rationale: C126 ESTABLISHED (at 0fb90672 the execute envelope is `workbench.tool-reply/v1` with launch-only `invoked`/status and `completion: "not-asserted"`; `accepted` is a permitted type value, not a currently emitted execute status — E180: tool-replies.ts:14, execute-tool.ts:108-113/151-156, execute.ts:57-58). C071 and C072 ESTABLISHED (the envelope and the completion semantics exist to preserve). E062 (pi-05's illustration carries `tool`/`next` and the bare string `tool-reply/v1`; the real `WorkflowExecuteReply` has `contractVersion`/`truncated` required and no `tool`/`next`; C225 marks the illustration a proposal). C223 NON-EPISTEMIC ("Never label a workflow SUCCESS because a launcher succeeded"; M232). C063 NON-EPISTEMIC (accepted/launched != completed). Consolidation correction (RA-02): the object the model reads is the registered tool's `WorkflowExecuteEnvelope` (execute-tool.ts:107-124 at 0fb90672: outer key `contract` :108, member `tool: "workflow_execute"` :109, built by `envelope()` :143; the script-path bytes are pinned by test/workbench-surface-census.test.ts:269), not the pure builder's `WorkflowExecuteReply` (execute.ts:65-79, which carries `contractVersion` and boolean `truncated`). The E062 / K006 comparison quoted above was made against the inner type; relative to the envelope the single foreign illustration member is `next`. C225 NON-EPISTEMIC and K006 owe a ledger correction entry (the comparison object is the envelope).
- Epistemic basis: C126 ESTABLISHED; C071 ESTABLISHED; C072 ESTABLISHED; C225 NON-EPISTEMIC; C223 NON-EPISTEMIC; C063 NON-EPISTEMIC.
- Derived from / remediation: C126, C071, C072, C225, C223, C063; M232.
- Executable acceptance criteria:
  1. Through ORACLE-REG the function-route reply parses as the pinned envelope plus additive versioned members: `contract === "workbench.tool-reply/v1"`, `tool === "workflow_execute"`, `next` absent; the script-path rows of workbench-surface-census.test.ts and workbench-execute-tool.test.ts stay green unedited. A unit assertion on the pure builder checks `contractVersion === "workbench.execute/v1"` and boolean `truncated`.
  2. `completion` equals `"not-asserted"` on every function launch reply including refusals; a census over the reply builders finds no `completed`, `succeeded`, `verified` or `SUCCESS` token emitted from the launch path.
  3. `accepted` is emitted only under option (i) of the EAT-R466 launch-status decision recorded in the EAT-R405 ratification record; the test fails on `status === "accepted"` by default and admits it only when the fixture cites that recorded option.
  4. Mutant: emitting `completion: "completed"` after a successful launch turns criterion 2 red.
- Negative mutant: Mutant: emitting `completion: "completed"` after a successful launch turns criterion 2 red.
- V-tier: V1, V3; EAT-R441@V1/V3 (the draft names no artifact; location per EAT-R456); target detail: V1 schema; V3 through ORACLE-REG.
- Conditions / unresolved gates: The launch-status decision is owned by EAT-R466 and recorded in the EAT-R405 ratification record; until that record exists criterion 3 is BLOCKED on G-RATIFY (RA-09). Otherwise none.
- Maps-to: MII P05; wb-4bxo (open; re-read at filing).
- Extends: EAT-R240, EAT-R247; OK — audited lineage retained.
- Predecessor lineage: Packet role: P05 reply.
- Linked rows: EAT-R466.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R466.
- L0: TRACEABLE; text consolidated: RA-02, RA-09; launch-status clause BLOCKED on G-RATIFY (RA-09); acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — criterion 1 must be amended first (RA-02); then P05; launch-status clause BLOCKED on G-RATIFY until the EAT-R466 decision is recorded in the EAT-R405 ratification record (RA-09)

## EAT-R442 — Extend the existing per-run workflow journal with function events; intent row before the composed call; fail closed when the journal cannot be written

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The function route MUST write its events to the existing per-run JSON Lines workflow journal (or an explicitly declared, versioned extension of it, never a parallel hidden store), with one row per event (`admitted, lease_acquired, effect_intent_persisted, dispatch_requested, native_session_observed, first_edit, candidate_committed, forge_dispatched, forge_observed, effect_settled, release_fenced, release_complete`), each carrying the invocation id, the source pin, a monotonic local sequence, an idempotent event id, the native ref only when actually observed, and an evidence strength; the `effect_intent_persisted` row MUST reach the file before COMPOSED-EXPORT is called; a failed journal write MUST refuse the launch rather than launch without a journal.
- Rationale: C122 NON-EPISTEMIC (proposal) whose embedded "no journal exists at the pin" premise is REFUTED (E178/E046: `src/workflow/journal.ts:43-70` is a per-run JSONL journal appended as each agent settles, with a `dispatched` marker row written before the provider is called and a resume that refuses on an unsuperseded marker as an uncertain effect; `appendJournal` uses `appendFileSync`, :252-254; wired at index.ts:2629) — M119 removes the overbroad no-journal annotation and requires reconciling inherited storage requirements; the permitted wording: "extending or explicitly replacing existing script/task storage; early events carry native refs only when actually observed". E046: the embedded script launcher warns and launches without a journal when the write fails (index.ts:2631) — the function route may not inherit that leniency (C112 NON-EPISTEMIC A6: journal effect intent durably; `intent-persist-failed` category). C083 SUPPORTED (post-dispatch loss can leave effects unknown; the intent row is what makes the window recoverable). C202 NON-EPISTEMIC (P16 idempotent projection after terminal; M211: state durable event id/order/terminal semantics, reuse or explicitly supersede existing custody). K020: event replay (sense 1) is the idempotent operation here.
- Epistemic basis: C122 NON-EPISTEMIC; C112 NON-EPISTEMIC; C083 SUPPORTED; C202 NON-EPISTEMIC.
- Derived from / remediation: C122, C112, C083, C202; M119, M120, M211.
- Executable acceptance criteria:
  1. Through ORACLE-REG, a settled run's journal file contains the listed rows in monotonic sequence with `invocationId`, `sourcePin {baseCommit, baseTree, forgeManifestSha256}`, `eventId`, `evidenceStrength`; the `effect_intent_persisted` row's file offset precedes the COMPOSED-EXPORT spy's first call timestamp (assert via a barrier that reads the file inside the injected export).
  2. Re-ingesting the same journal twice (event replay) yields an identical projection and `duplicate` for every row; appending a late `forge_observed` after `release_complete` is `applied` to the projection but produces no new effect (DETECT-ZERO (b)-(d) unchanged).
  3. Given the journal directory is unwritable, the launch refuses `intent-persist-failed` with DETECT-ZERO (a)-(e) at 0; the script launcher's warn-and-launch behaviour is asserted unchanged for script workflows (no regression, EAT-R236 lineage).
  4. Early rows (`admitted`, `lease_acquired`) carry `nativeRef: null`; a mutant that pre-fills a native ref before observation turns red.
  5. Mutant: writing the intent row after the export call turns criterion 1 red.
- Negative mutant: Early rows (`admitted`, `lease_acquired`) carry `nativeRef: null`; a mutant that pre-fills a native ref before observation turns red. | Mutant: writing the intent row after the export call turns criterion 1 red.
- V-tier: V3, V5; EAT-R442@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3; kill-window instances at V5 (EAT-R445, wb-9bof).
- Conditions / unresolved gates: event-name table ratification against MW stages (E236); storage decision "extend vs explicitly replace" (M119) recorded in the P07 receipt. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R239, EAT-R250; OK — audited lineage retained.
- Predecessor lineage: No further lineage stated in the draft.
- Linked rows: EAT-R414, EAT-R416, EAT-R451.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R451.
- L0: TRACEABLE (conditions: RA-16); acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — journal extension is Pi-only; the event-name table is a G-RATIFY item (E236)

## EAT-R443 — Never grant `not-occurred`/retry from a clean HEAD; require a producer-qualified non-occurrence certificate; otherwise `unknown`, effect replay denied, lease fenced

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: After any possible dispatch, Pi MUST classify the effect as `not-occurred` only on a producer-qualified non-occurrence certificate that binds the invocation id, effect kind, provider identity, time window and completeness scope; HEAD-at-base plus clean `git status` MUST yield `unknown` (never `not-occurred`, never `retryPermitted`), effect replay (sense 2) MUST stay denied while `unknown`, the writer lease MUST stay fenced, and Pi MUST NOT consume MW's `reconcileUncertainEffect` at 69cb016d as a non-occurrence oracle.
- Rationale: C132 ESTABLISHED (a clean HEAD/status observation cannot prove no effect: at MW 69cb016d an ignored-file effect survives while `effect-reconciliation.ts:98` returns `not-occurred` with `retryPermitted` (:79) — E359 probe arms pristine, ignored-effect, edit-restored, untracked-effect; M130/M131). C033 ESTABLISHED facet (ii) (the D2 gap, incl. `found:false` for a null operation id also returning `retryPermitted` — E104). C190, C191, C197 NON-EPISTEMIC (G04/G05/G11; M199: define bounded effect class and non-occurrence detector before allowing retry; M200: test ignored, untracked and external carriers separately — ignored red is observed, untracked is a regression control, external effects remain an evidence-acquisition case). C083 SUPPORTED. C131 NON-EPISTEMIC (after possible side effects: publish uncertain with native ids and frozen lease). Authority RISK_CONTROL with an ESTABLISHED producer defect: the Pi guard prevents consuming the defective verdict; the producer repair is MW-owned (mw-03 H02).
- Epistemic basis: C132 ESTABLISHED; C033 ESTABLISHED; C190 NON-EPISTEMIC; C191 NON-EPISTEMIC; C197 NON-EPISTEMIC; C083 SUPPORTED; C131 NON-EPISTEMIC.
- Derived from / remediation: C132, C033, C190, C191, C197, C083, C131; M129, M130, M131, M199, M200, M206.
- Executable acceptance criteria:
  1. Through ORACLE-REG with a dispatch whose acknowledgment is dropped after an injected writer created an ignored-path file (G05-ignored), a tracked edit-then-revert (G04) and an untracked file (control), reconciliation reports `<EAT-R419 ratified effect-axis field>: "unknown"`, `retryPermitted: false`, `lease.state: "fenced"` for the first two; the untracked arm reports `occurred` (status detector) — never `not-occurred` for any arm.
  2. Given MW's `reconcileUncertainEffect` result `{disposition:"not-occurred", retryPermitted:true, evidence:{kind:"head-at-base-clean-worktree"}}` is presented as producer input, Pi records it under `producerReconciliation` and still reports `unknown` (the evidence kind is on a denylist of time-local worktree observations).
  3. Given a certificate `{schema, invocationId, effectKind, provider, window, completeness:"complete", result:"not-occurred"}` whose fields match the invocation, then `not-occurred` with `retryPermitted: true` and a new dispatch allowed only as an explicitly new authorized attempt (positive control); a certificate with `completeness:"partial"` or a mismatched invocation id yields `unknown`.
  4. Given a Forge lookup `found:false` for a `null` operation id, then `unknown` (Q13 shape).
  5. Mutant: accepting `head-at-base-clean-worktree` as non-occurrence evidence turns criterion 1 red.
- Negative mutant: Mutant: accepting `head-at-base-clean-worktree` as non-occurrence evidence turns criterion 1 red.
- V-tier: V3, V5; EAT-R443@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3 (barrier-injected); V5 instances in wb-9bof.
- Conditions / unresolved gates: the non-occurrence certificate schema is MW-proposed and unlanded (E114: no `effect-intent/v2`); until landed, criterion 3's positive arm is red and `unknown` is the only reachable post-dispatch state — by design. Filing-time / next-text-cycle: RA-15, RA-16.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R251, EAT-R254, EAT-R282; OK — audited lineage retained.
- Predecessor lineage: Producer counterpart MW H02 tracked in wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: EAT-R447.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R447.
- L0: TRACEABLE (conditions: RA-15, RA-16); acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — negative arms reach `unknown` by design today; positive arm BLOCKED: no producer non-occurrence certificate (mw-03 H02)

## EAT-R444 — Integrate producer effect-intent only through a ratified exported, invocation-keyed lookup; persist the Pi/MW intent correlation at dispatch; missing producer intent reads `unknown`

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: `workflow_reconcile` and the recovery path MUST read producer effect-intent records only through an export of `@mechanical/development-rig/host` (or a ratified sibling subpath) keyed by the Pi invocation id; Pi MUST NOT deep-import `dist/effect-intent.js`/`dist/effect-reconciliation.js`; at dispatch Pi MUST persist the correlation `{wf_ invocationId, producer intentId, invocationIdentitySha256, fencingGeneration}` in its own journal; and a producer intent that cannot be found or read MUST yield `<EAT-R419 ratified effect-axis field>: "unknown"`, never `no-effect`/`not-occurred`.
- Rationale: C173 SUPPORTED (arbitrated 2026-11-11; facets: Pi `workflow_control`/`workflow_reconcile` registered and a journal exist — ESTABLISHED; MW effect-intent functions exist at module level — ESTABLISHED; MW exports them to an installed consumer — REFUTED (`ERR_PACKAGE_PATH_NOT_EXPORTED`, E464/E091); an invocation-keyed producer lookup exists — UNSUPPORTED (path-addressed single-file reader, no index, no caller); the record carries `intentId` and `invocationIdentitySha256` but no Pi invocation id). E228 (both programs persist an intent and MW is of two minds about whose store it is; recovery "reads Mechanical's" — the correlation row makes that read possible). C174 NON-EPISTEMIC (P07 Done; M181: bind two records, choose recovery precedence, expose lookup). C128 NON-EPISTEMIC (control/reconcile cannot manufacture missing producer references).
- Epistemic basis: C173 SUPPORTED; C174 NON-EPISTEMIC; C128 NON-EPISTEMIC.
- Derived from / remediation: C173, C174, C128; M179, M180, M181, M182.
- Executable acceptance criteria:
  1. A static census over `src/` asserts zero import specifiers matching `@mechanical/development-rig/dist/` or any path to `effect-intent`/`effect-reconciliation`; the only `@mechanical/*` specifier is the allowlisted host subpath (EAT-R421).
  2. Through ORACLE-REG, the journal's `effect_intent_persisted` row carries `producerIntentId`, `invocationIdentitySha256`, `fencingGeneration` as returned by COMPOSED-EXPORT's admission step (or `null` with `unknown` when the export does not return them — current state), and `workflow_reconcile` resolves the producer record by `wf_` id through the exported lookup spy.
  3. Given the lookup throws `ERR_PACKAGE_PATH_NOT_EXPORTED` (the 69cb016d state) or returns no record, `workflow_reconcile` reports `<EAT-R419 ratified effect-axis field>: "unknown"`, `producerIntent: null`, and an operator instruction; a mutant mapping "no record" to `no-effect` turns red.
  4. Given two Pi hosts attempt recovery of one intent (mw-03 H07 falsifier), exactly one proceeds to a read-only native lookup and the other reports `recovery-not-authorized`.
- Negative mutant: Given the lookup throws `ERR_PACKAGE_PATH_NOT_EXPORTED` (the 69cb016d state) or returns no record, `workflow_reconcile` reports `<EAT-R419 ratified effect-axis field>: "unknown"`, `producerIntent: null`, and an operator instruction; a mutant mapping "no record" to `no-effect` turns red.
- V-tier: V3, V5; EAT-R444@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3; cross-process arm at V5.
- Conditions / unresolved gates: MW export of an invocation-keyed lookup (mw-03 H02/H07; wb-1zn2); recovery precedence between Pi journal and MW intent (E228) is a joint decision this row leaves explicit. EAT-R413 (MII carrier of the EAT-R253 gate) must hold before any effectful (non-fixture) arm of this row runs (see EAT-R445 conditions; moved here from the draft Maps-to line). Filing-time / next-text-cycle: RA-15, RA-16.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R251, EAT-R253, EAT-R282; OK — audited lineage retained.
- Predecessor lineage: lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy) — the draft named it as co-carrier (RA-01).
- Linked rows: EAT-R415.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-15, RA-16); text consolidated: RA-01, RA-08, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — MW exported lookup (mw-03 H02/H07); the static import census leg is NOT_RUN and runnable now

## EAT-R445 — Cancellation and executor death after possible dispatch: requested is not established, unknown is never rolled back, the fence survives restart, and process-kill evidence is not power-loss durability

- Type: BEHAVIORAL
- Authority: RISK_CONTROL
- Statement: After a possible dispatch, a `workflow_control` cancel MUST record `cancellation: "requested"` and move to `"established"` only on producer/provider-native confirmation; the effect disposition MUST remain `dispatched-uncertain`/`occurred` with known native refs and no rollback wording; an executor/host crash with an open writer fence MUST, after restart, show `outcome_unknown`, the retained fence and zero new effects; and the P07 receipt MUST state the tested fault model (process kill, fsync+rename) separately from power-loss durability, which MUST NOT be claimed without parent-directory fsync evidence or an explicit inability statement.
- Rationale: C123 NON-EPISTEMIC (requested vs established; control never relabels an unknown effect as rolled back; the existing control tool already distinguishes requested/acknowledged/result — E176 primitive). C207 NON-EPISTEMIC (after-dispatch cancellation; permitted wording: the existing pending-dispatch cancellation defect is an ordering prerequisite — E013: wb-9v02 closed 2026-11-08 as the repro bead only; the parked-beforeDispatch skip loss is unrepaired at 0fb90672 (claude-host.ts/runtime.ts blobs unchanged since 8e2fedeb, no open repair bead) and EAT-R253 keeps effectful function dispatch disabled or fixture-only until its receipt exists; M014 carries that gate into P05/P07). C204 NON-EPISTEMIC (P18; permitted wording: process-kill and power-loss claims require distinct durability evidence; M213: persisted open intent/fence on fresh-process restart with PID-reuse/late-worker cases). C131 NON-EPISTEMIC. C083 SUPPORTED. C064 NON-EPISTEMIC (I7: explicit uncertainty, retained refs, zero blind effect replay; idempotent event replay allowed — K020). mw-01 MW-I10 (`fileEffectIntentStore` fsyncs the temp record and renames but not the parent directory) is the producer-side fact behind the durability wording; Pi inherits the wording obligation for its own journal (appendFileSync, no fsync at the pin — E046).
- Epistemic basis: C123 NON-EPISTEMIC; C207 NON-EPISTEMIC; C204 NON-EPISTEMIC; C131 NON-EPISTEMIC; C083 SUPPORTED; C064 NON-EPISTEMIC.
- Derived from / remediation: C123, C207, C204, C131, C083, C064; M014, M129, M213.
- Executable acceptance criteria:
  1. Through ORACLE-REG with an injected writer paused after its first edit, `workflow_control` cancel returns `cancellation: "requested"`, `<EAT-R419 ratified effect-axis field>: "dispatched-uncertain"`, known `nativeRefs`, and a text census of the reply finds no `rolled back`/`reverted`/`undone`; when the injected producer later confirms abort, a second observe shows `cancellation: "established"` and the late commit (if any) remains visible (B11 lineage).
  2. Kill the host process (real `SIGKILL` of an independently controlled child, not a thrown error) after `effect_intent_persisted` and before producer acknowledgment; a fresh process reading the journal shows `state: "outcome_unknown"`, `lease.state: "fenced"`, `fencingGeneration` unchanged, and DETECT-ZERO (b)-(d) at 0 for the recovered invocation until EAT-R443 evidence arrives.
  3. Kill after `candidate_committed` with acknowledgment dropped (G11): recovery performs a read-only native Git/Forge lookup, reports `occurred` with the commit ref or `unknown`, and never issues a second `gate.run` (counter (d) unchanged).
  4. The receipt's `durability` object reads `{tested: "process-kill", fsync: <true|false>, parentDirFsync: <true|false|"not-established">, powerLoss: "not-claimed"}` unless a parent-directory fsync test exists; the validator rejects `powerLoss: "durable"` without it.
  5. Mutant: releasing the lease on `launched`/on the killed PID's disappearance turns criterion 2 red; reporting `rolled back` after cancel turns criterion 1 red.
- Negative mutant: Mutant: releasing the lease on `launched`/on the killed PID's disappearance turns criterion 2 red; reporting `rolled back` after cancel turns criterion 1 red.
- V-tier: V3, V5; EAT-R445@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3 (controls, injected barriers); V5 for the real-kill arms (wb-9bof, extending the wb-7wkb kill/verifier harness per M020).
- Conditions / unresolved gates: durable lease/fence store (MII P02, out of this cluster — consumed as a named condition); the two-process same-root arm (G07/Q18) belongs to the lease vertical and is only observed here; EAT-R413 (MII carrier of the EAT-R253 gate): EAT-R253 (parked-beforeDispatch skip/retry loss, E013) must carry a repair receipt before any effectful (non-fixture) arm of this row or of EAT-R431 runs. Filing-time / next-text-cycle: RA-15, RA-16.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing); wb-9bof (open; re-read at filing).
- Extends: EAT-R252, EAT-R254, EAT-R256, EAT-R280, EAT-R281; OK — audited lineage retained.
- Predecessor lineage: Carrier roles: wb-mwsy (V3 arms) and wb-9bof (V5 arms). lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy) — the draft named it as the first carrier (RA-01).
- Linked rows: EAT-R450, EAT-R454, EAT-R463, EAT-R467.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R450, EAT-R454, EAT-R463, EAT-R467.
- L0: TRACEABLE (conditions: RA-15, RA-16); text consolidated: RA-01, RA-08; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — V3 arms after P05; effectful arms BLOCKED on the EAT-R253 repair receipt; real-kill arm by G-FAULT

## EAT-R446 — Implement the strict-verification falsifiers G01, G02, G03 and G12

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The Pi suite MUST implement the Pi-side projection legs of G01, G02, G03 and G12 — a red test and a negative mutant each, through ORACLE-REG with an injected observed envelope and, where applicable, an injected producer certificate — asserting the EAT-R433..R436 projections. The producer-side classifier tests (MW Q01, Q03, Q04, Q05, Q08 by content) are Mechanical-owned (mw-03 H01/H09; tracker wb-1zn2): the Pi receipt cites the producer receipt when it exists and records BLOCKED(producer-red-absent) when it does not. No Pi cut adds or edits a test in the Mechanical repository.
- Rationale: C187, C188, C189, C198 are NON-EPISTEMIC (NORMATIVE rows of the adopted matrix). C181 (SOURCE_REPORT, ESTABLISHED) records that no command or gate was executed in authoring, so every matrix row is currently untested design. Cures M196 (map G01 to MW Q01 and preserve the original raw envelope), M197 (specify field paths and the accepted independent run-record proof; test absent and contradicted tree separately), M198 (unify certificate axes with MW; assert environment eligibility, not mere field presence), M207 (split gate-response-to-settlement drift from post-settlement drift; Pi never invents a certificate the producer declined to issue).
- Epistemic basis: C187 NON-EPISTEMIC; C188 NON-EPISTEMIC; C189 NON-EPISTEMIC; C198 NON-EPISTEMIC; C181 ESTABLISHED.
- Derived from / remediation: C187, C188, C189, C198, C181; M196, M197, M198, M207.
- Executable acceptance criteria:
  1. For each of G01/G02/G03/G12 a Pi-side red test through ORACLE-REG injects the stated evidence defect as an observed envelope (and, where applicable, an injected producer certificate) and asserts the EAT-R433..R436 projection (indeterminate / no strict promotion); a negative mutant that weakens the Pi projection guard turns the test red. The Pi receipt cites the producer-side classifier receipt (MW Q01, Q03, Q04, Q05, Q08 by content; Mechanical-owned) when it exists and records BLOCKED(producer-red-absent) when it does not.
  2. A Pi-side test asserts the projected assurance for the same envelope is not `strict` and the original raw producer envelope is preserved byte-addressable in the receipt.
  3. G02 runs twice: candidate-tree evidence absent, and candidate-tree evidence contradicted; both classify indeterminate independently.
  4. G12 distinguishes drift before settlement from drift after settlement; the historical PASS stays recorded and no current-source promotion occurs in either case.
  5. The exact certificate field paths asserted (e.g. the gate-passed datum) are read from the ratified joint schema of EAT-R458, not hard-coded doc-04 prose names.
- Negative mutant: For each of G01/G02/G03/G12 a Pi-side red test through ORACLE-REG injects the stated evidence defect as an observed envelope (and, where applicable, an injected producer certificate) and asserts the EAT-R433..R436 projection (indeterminate / no strict promotion); a negative mutant that weakens the Pi projection guard turns the test red. The Pi receipt cites the producer-side classifier receipt (MW Q01, Q03, Q04, Q05, Q08 by content; Mechanical-owned) when it exists and records BLOCKED(producer-red-absent) when it does not.
- V-tier: V1, V3; EAT-R446@V1/V3 (the draft names no artifact; location per EAT-R456); target detail: V1 + V3 (audited tier, RA-03 / RA-12; the draft's producer-side leg and native projection leg are replaced: an injected envelope defect cannot come from a real Forge run, so the projection is the registered-route tier).
- Conditions / unresolved gates: field vocabulary (`data.gate_passed`, gate-definition hash, environment binding) uses Forge fields documented and pinned at the source (K023 RESOLVED-BY-SOURCE; EAT-R434): `data.gated_commit`, `data.gated_tree`, `gate_passed`, `gate_definition`, `execution_environment`; the certificate transport/eligibility decision still needs EAT-R458 ratification; EAT-R458 ratification must precede test authorship. Filing-time / next-text-cycle: RA-16, RA-19: owner must still reconcile certificate field paths with EAT-R458.
- Maps-to: MII P09; wb-xr1z (open; re-read at filing).
- Extends: EAT-R245, EAT-R272, EAT-R274; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R433, EAT-R434, EAT-R435, EAT-R436.
- Verifies: EAT-R433, EAT-R434, EAT-R435, EAT-R436.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16, RA-19: owner must still reconcile certificate field paths with EAT-R458); text consolidated: RA-03, RA-10, RA-12, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — certificate field paths unratified (EAT-R458) and no producer certificate; row must be amended first (RA-03, RA-12)

## EAT-R447 — Implement the uncertain-effect falsifiers G04 and G05

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G04 (writer edits then restores bytes before a lost acknowledgment → no blind retry from clean HEAD) and G05 (ignored/untracked/out-of-worktree side effect with lost acknowledgment → uncertainty preserved; retry denied absent comprehensive native absence evidence), with the bounded effect class and its non-occurrence detector defined before any retry is permitted. Pi-side arms only; the producer-side red is consumed.
- Rationale: C190, C191 NON-EPISTEMIC (NORMATIVE). The hazard is real at the pins: C083 (HYPOTHESIS, SUPPORTED — a producer may have performed effects when its acknowledgment is lost). Hard invariant: absence claims need a detection surface. Cures M199 (define bounded effect class and non-occurrence detector before allowing retry; producer red first, joined observation/recovery assertion second), M200 (split ignored, untracked and external-effect rows into separate tests; state detector coverage; external runtime evidence is missing and must not be claimed).
- Epistemic basis: C190 NON-EPISTEMIC; C191 NON-EPISTEMIC; C083 SUPPORTED; C173 SUPPORTED.
- Derived from / remediation: C190, C191, C083, C173; M199, M200.
- Executable acceptance criteria:
  1. G04: inject edit-then-restore with lost ack; assert clean HEAD alone yields no retry permission; a mutant granting retry on clean HEAD turns red.
  2. G05 is three separate tests — ignored file, untracked file, out-of-worktree effect — each asserting the disposition stays uncertain and retry is refused; no single conjoined test stands in for all three.
  3. Each denial names its detector and the detector's coverage bound in the receipt; coverage gaps (external runtime effects) are recorded as unknown, not as verified absence.
- Negative mutant: G04: inject edit-then-restore with lost ack; assert clean HEAD alone yields no retry permission; a mutant granting retry on clean HEAD turns red.
- V-tier: V1, V3, V5; EAT-R447@V1/V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V1 + V3 + V5 (audited tier, RA-12; the draft omitted the registered-route tier carried by its behaviour row EAT-R443).
- Conditions / unresolved gates: the comprehensive-native-absence evidence format depends on the MW effect-reconciliation surface (C173 SUPPORTED: exports exist at mw pin but are not importable via the reviewed ./host subpath); its export path must be ratified in the EAT-R469 crosswalk before the joined leg. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P09; wb-9bof (open; re-read at filing).
- Extends: EAT-R251, EAT-R254, EAT-R280, EAT-R282; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R403, EAT-R420, EAT-R443.
- Verifies: EAT-R403, EAT-R420, EAT-R443.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-03, RA-10, RA-12; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — Pi-side arms after P05 and EAT-R399; the producer-side red is MW-owned and consumed, not written

## EAT-R448 — Implement the lease-exclusivity falsifiers G06 and G07

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G06 (worker alive after launch reply → same-root lease retained, second same-root invocation rejected) and G07 (two Pi processes on one canonical root → exactly one live writer, including across restart), through the registered route, with lease release bound to producer terminal/reconciliation rather than launch-promise settlement.
- Rationale: C192, C193 NON-EPISTEMIC (NORMATIVE). The defect premises are graded: C043 (ESTABLISHED — at the pin the source-admission lease is released when the dispatch promise resolves), C117 (ESTABLISHED — WriterLeases is an in-memory Map in one host process), C155 (SUPPORTED — the lease is process-local and launch-return-scoped), C081 (SUPPORTED — a native-handle-returning launch could release ownership while the writer is paused), C044 (SUPPORTED — a detached/async launch may return while its writer runs). Cures M201 (registered launch-return-while-worker-sleeps red test; bind release to producer terminal), M202 (ratify fence token/current-generation verifier and ownership authority; dual-process, restart and stale-worker mutants in the supported topology; deny unsupported fleet execution).
- Epistemic basis: C192 NON-EPISTEMIC; C193 NON-EPISTEMIC; C043 ESTABLISHED; C117 ESTABLISHED; C155 SUPPORTED; C081 SUPPORTED; C044 SUPPORTED.
- Derived from / remediation: C192, C193, C043, C117, C155, C081, C044; M201, M202.
- Executable acceptance criteria:
  1. G06: a registered launch resolves while the worker sleeps; a second invocation on the same canonical root (including an alias path) is refused; the lease remains held; a mutant restoring launch-return release turns red.
  2. G07: two separate Pi processes contend for one canonical root; exactly one acquires the writer; repeat with the first process killed and restarted — the restarted topology still yields at most one live writer and the stale generation cannot write.
  3. Both run in the named supported topology (same-machine); the receipt states fleet/multi-host topologies as untested, not as passing.
- Negative mutant: G06: a registered launch resolves while the worker sleeps; a second invocation on the same canonical root (including an alias path) is refused; the lease remains held; a mutant restoring launch-return release turns red.
- V-tier: V1, V3, V5; EAT-R448@V1/V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V1 + V3 + V5 (audited tier, RA-12; the statement says 'through the registered route').
- Conditions / unresolved gates: prerequisite: EAT-R399, R400, R401, R402; red by construction until they land; EAT-R464 is downstream. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P09; wb-9bof (open; re-read at filing).
- Extends: EAT-R232, EAT-R269, EAT-R284; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Lease implementation surface: wb-2ukh (related, not this row's carrier).
- Linked rows: EAT-R398, EAT-R399, EAT-R400, EAT-R401.
- Verifies: EAT-R398, EAT-R399, EAT-R400, EAT-R401.
- Verified-by: EAT-R464.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-04, RA-10, RA-12; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — definitionally red until EAT-R399-R401 land; conditions must be amended first (RA-04)

## EAT-R449 — Implement the admission and authority falsifiers G08, G09, G10, P13 and P14

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G08 (differing Beads notes, identical typed input → identical admitted and dispatched canonical input, no note read), G09 (installed JS mutated after extraction → refusal before trusted import), G10 (forged grant/root/profile/principal in the tool request → no additional authority or side effect), P13 (principal/grant revoked during install → final-boundary refusal, zero writer calls) and P14 (source clean/manifest change during wait → refusal retaining the source-mismatch reason), each as red test plus negative mutant through the registered admission path.
- Rationale: C194, C195, C196, C199, C200 NON-EPISTEMIC (NORMATIVE). Graded premises: C038 (ESTABLISHED — admission digests after withoutBeadsNotes strips note text), C080 (PLAUSIBLE — a naive launcher could pass note-bearing original input after admitting stripped input; this is the G08 hazard and stays plausible, not observed), C082 (SUPPORTED — authority/source checks can go stale across the install/wait window), C048 (SUPPORTED — independent rechecks do not form an atomic policy across async waits), C113 (SUPPORTED — no shared transaction manager across Git/permission/lease/import/SDK), C111 (ESTABLISHED — dispatchFunctionWithAuthority already rechecks at entry and after wait). Cures M203, M204 (split P-rows), M205, M208, M209 (narrow scope).
- Epistemic basis: C194 NON-EPISTEMIC; C195 NON-EPISTEMIC; C196 NON-EPISTEMIC; C199 NON-EPISTEMIC; C200 NON-EPISTEMIC; C038 ESTABLISHED; C080 PLAUSIBLE; C082 SUPPORTED; C048 SUPPORTED; C113 SUPPORTED; C111 ESTABLISHED.
- Derived from / remediation: C194, C195, C196, C199, C200, C038, C080, C082, C048, C113, C111; M203, M204, M205, M208, M209.
- Executable acceptance criteria:
  1. G08: two requests differing only in note bytes admit and dispatch byte-identical canonical payloads with equal digests; an instrumented launcher proves no note byte reaches the dispatched payload.
  2. G09: mutate one installed dist file after extraction; import is refused before any module code runs; the refusal names the digest mismatch.
  3. G10: forged grant, forged root, forged profile and forged principal are four separate injections; each yields zero authority escalation and zero side effect (assert with the EAT-R453 detectors).
  4. P13: revoke mid-install; assert final-boundary refusal with zero writer callbacks. P14: change cleanliness or manifest during the wait; assert refusal whose reason retains the source mismatch.
  5. One guard-removal mutant per falsifier: G08 reintroduces the notes-bearing raw payload; G09 skips the installed-file manifest check; G10 trusts each of forged grant/root/profile/principal in four distinct mutants; P13 skips the post-wait grant read; P14 skips the post-wait source / manifest read. Each mutant must turn its own red test red.
- Negative mutant: One guard-removal mutant per falsifier: G08 reintroduces the notes-bearing raw payload; G09 skips the installed-file manifest check; G10 trusts each of forged grant/root/profile/principal in four distinct mutants; P13 skips the post-wait grant read; P14 skips the post-wait source / manifest read. Each mutant must turn its own red test red.
- V-tier: V1, V2, V3; EAT-R449@V1/V2/V3 (the draft names no artifact; location per EAT-R456); target detail: V1 + V2 + V3 (audited tier, RA-12; G09 is an installed-consumer falsifier, as its behaviour row EAT-R422).
- Conditions / unresolved gates: none beyond re-pin (P00). E169 seam-level greens (e.g., admission-only notes tests and observation ingest) are baseline controls, not a registered-route red test; the new G08/G09/G10/P13/P14 red tests are through the named joined or installed boundary (RA-19). Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P09; wb-xr1z (open; re-read at filing).
- Extends: EAT-R266, EAT-R267, EAT-R268, EAT-R270, EAT-R272; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R392, EAT-R393, EAT-R406, EAT-R407, EAT-R409, EAT-R410, EAT-R421, EAT-R422, EAT-R424, EAT-R427, EAT-R465.
- Verifies: EAT-R392, EAT-R393, EAT-R406, EAT-R407, EAT-R409, EAT-R410, EAT-R421, EAT-R422, EAT-R424, EAT-R427, EAT-R465.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-10, RA-12, RA-18, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — G09 leg runnable at V2 now; G08/G10/P13/P14 after P05

## EAT-R450 — Implement the recovery falsifiers G11 and P18, inheriting the wb-7wkb harness

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: The suite MUST implement G11 (kill after commit or gate dispatch with lost acknowledgment → native reconciliation, no automatic duplicate) and P18 (executor crash with an open writer fence → disposition stays unknown, fence retained, no second effect), extending the existing MNI kill/verifier harness (closed bead wb-7wkb) and inheriting its recorded not-claimed list rather than starting fresh.
- Rationale: C197, C204 NON-EPISTEMIC (NORMATIVE). C083 (SUPPORTED) grounds the lost-ack hazard; C118 (SUPPORTED — a lease timeout alone does not establish the writer stopped or effects settled) bars timeout-based release in the recovery path. Cures M206 (test writer loss and gate loss separately through the joined route, including null IDs and callback throws; typed thrown refusals stay distinct from the four returned domain outcomes), M213 (test persisted open intent/fence on fresh-process restart with PID-reuse and late-worker cases; distinguish fsync/rename from directory durability and state the tested fault model), M020 (MII P09 should extend the wb-7wkb harness and inherit its not-claimed list).
- Epistemic basis: C197 NON-EPISTEMIC; C204 NON-EPISTEMIC; C083 SUPPORTED; C118 SUPPORTED.
- Derived from / remediation: C197, C204, C083, C118; M020, M206, M213.
- Executable acceptance criteria:
  1. G11 runs twice: kill after candidate commit, and kill after gate dispatch; in both, restart performs native reconciliation lookup and no duplicate writer effect occurs; a mutant that auto-retries turns red.
  2. P18: crash with an open fence; after fresh-process restart the invocation reads unknown, the fence is still held, and a PID-reuse impostor cannot write; a late-arriving original worker is fenced.
  3. The receipt states the tested fault model explicitly (process kill; fsync/rename durability vs parent-directory durability distinguished) and carries forward the wb-7wkb not-claimed list (e.g. power loss, SDK-child survival) as still-not-claimed.
- Negative mutant: G11 runs twice: kill after candidate commit, and kill after gate dispatch; in both, restart performs native reconciliation lookup and no duplicate writer effect occurs; a mutant that auto-retries turns red.
- V-tier: V5; EAT-R450@V5 (the draft names no artifact; location per EAT-R456); target detail: V5.
- Conditions / unresolved gates: durable intent/fence journal (MII P02/P07) must exist: EAT-R399..R403 and EAT-R414..R417. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P09; wb-9bof (open; re-read at filing).
- Extends: EAT-R216, EAT-R257, EAT-R278, EAT-R280, EAT-R281; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Harness lineage: wb-7wkb (closed).
- Linked rows: EAT-R402, EAT-R420, EAT-R445.
- Verifies: EAT-R402, EAT-R420, EAT-R445.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-04, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — harness lineage exists (test/worktree-process-kill-preservation.test.ts; wb-7wkb closed); needs EAT-R399-R403 and EAT-R414-R417

## EAT-R451 — Implement the observation-integrity falsifiers P15, P16 and P17

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The suite MUST implement P15 (cross-scope native ref/observer replay → zero cross-principal events or control leak), P16 (duplicate/late event after terminal → idempotent projection, no new effect) and P17 (truncated response → no non-addressable native ref emitted; invocation remains observable), each as red test plus negative mutant against the observation bridge and journal.
- Rationale: C201, C202, C203 NON-EPISTEMIC (NORMATIVE). C213 (ESTABLISHED — at the Pi pin workflow_observe is keyed by taskId over local session/workspace/principal state; it does not yet establish the program's invocation-scoped observation), so the seam-level observation ingest greens are controls (E169); the joined P06 observation bridge remains the new red subject. Cures M210, M211, M212; M222 for C213 (define the logical-invocation-to-existing-store mapping and durable replay without parallel hidden state; preserve scope, freshness and gap counters).
- Epistemic basis: C201 NON-EPISTEMIC; C202 NON-EPISTEMIC; C203 NON-EPISTEMIC; C213 ESTABLISHED.
- Derived from / remediation: C201, C202, C203, C213; M210, M211, M212, M222.
- Executable acceptance criteria:
  1. P15: a second principal/scope replays a captured native ref and observer query; assert zero events, zero control authority, and an audit record of the denial.
  2. P16: inject a duplicate and a late event after terminal; the projection is byte-identical before/after (idempotent) and no effect or state transition fires.
  3. P17: force response truncation of a long native identity; assert the reply contains either a complete addressable ref or none, never a truncated identifier, and the invocation remains queryable afterward.
  4. One guard-removal mutant per falsifier: P15 drops scope authorization on a captured native ref; P16 disables event-ID deduplication; P17 truncates a long native ref instead of omitting it. Each mutant must turn its own red test red.
- Negative mutant: One guard-removal mutant per falsifier: P15 drops scope authorization on a captured native ref; P16 disables event-ID deduplication; P17 truncates a long native ref instead of omitting it. Each mutant must turn its own red test red.
- V-tier: V1, V3; EAT-R451@V1/V3 (the draft names no artifact; location per EAT-R456); target detail: V1 + V3.
- Conditions / unresolved gates: none beyond P06 existence. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R247, EAT-R248, EAT-R275, EAT-R281; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R417, EAT-R429, EAT-R440, EAT-R442.
- Verifies: EAT-R417, EAT-R429, EAT-R440, EAT-R442.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-10, RA-18, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch and the P06 bridge; seam-level greens are controls (E169)

## EAT-R452 — Keep the four domain outcomes separately inspectable on every surface that exists

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Pi MUST present verified_candidate, verification_failed, needs_evidence and indeterminate as four distinct, separately inspectable terminal readings — never collapsed, never converted (indeterminate is not failure; needs_evidence reaches no writer or gate) — in the Pi UI, tool replies and journal; the doc-04 "CLI output" surface MUST first be resolved to an actual shipped binary or explicitly re-scoped, since Pi's package has no bin/CLI export at the pin.
- Rationale: C205 NON-EPISTEMIC (DEFINITION of the four-outcome domain); C215 (ESTABLISHED — the MW contract names exactly four callbacks and four typed outcomes; types alone prove no behavior); C219 (ESTABLISHED — no bin/CLI export exists in Pi package.json at 0fb90672, so a CLI-output claim has no referent). Cures M214 (ratify producer strict semantics first; keep the domain union separate from transport/refusal/uncertainty errors; identify host-pi vs rig-CLI assertions), M228 (resolve the doc-04 CLI referent; do not invent a pi-subagents binary and do not infer absence of host/producer CLIs).
- Epistemic basis: C205 NON-EPISTEMIC; C215 ESTABLISHED; C219 ESTABLISHED.
- Derived from / remediation: C205, C215, C219; M214, M228.
- Executable acceptance criteria:
  1. A fixture per outcome drives the registered route to that terminal; assertions read the typed outcome field distinctly on each shipped surface (tool reply, observe projection, journal row).
  2. A test asserts verification_failed and indeterminate are distinguishable in every projection, and a mutant collapsing them turns red.
  3. Transport errors and typed refusals are asserted to be outside the four-outcome union (thrown/refused, not laundered into an outcome).
  4. The release receipt names which surfaces exist; if a CLI surface is claimed, the receipt names the binary and its package; otherwise the CLI row is recorded as out of scope.
- Negative mutant: A test asserts verification_failed and indeterminate are distinguishable in every projection, and a mutant collapsing them turns red.
- V-tier: V3; EAT-R452@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: CLI referent resolution is an owner decision recorded in P00/P10 docs.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R242, EAT-R243, EAT-R273; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R428.
- Verifies: EAT-R428.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch; the CLI surface stays S until the owner resolves its referent (C219)

## EAT-R453 — Prove zero side effects on denial with independent detectors

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: For every input or permission denial, the suite MUST prove 0 Mechanical callbacks, 0 SDK sessions, 0 Forge gate requests and 0 workspace writes using independent spies/native event capture and a bounded workspace/effect detector, pairing each denial with an admitted positive control and a guard-removal mutant.
- Rationale: C206 NON-EPISTEMIC (NORMATIVE). The zero-claims are absence claims, so the hard invariant applies: each needs a stated detection surface. Cure M215 (define independent spies/native event capture and a bounded workspace/effect detector; pair denial with an actual admitted positive and a guard-removal mutant so the zero is demonstrably detectable).
- Epistemic basis: C206 NON-EPISTEMIC.
- Derived from / remediation: C206; M215.
- Executable acceptance criteria:
  1. Each denial test asserts all four zeros through detectors that are proven live by the paired positive control (same detectors observe nonzero on the admitted run).
  2. A guard-removal mutant makes at least one detector fire, turning the test red.
  3. The receipt states each detector's coverage bound; effects outside the bound are recorded as undetected-by-this-surface, not as absent.
- Negative mutant: A guard-removal mutant makes at least one detector fire, turning the test red.
- V-tier: V3; EAT-R453@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: none.
- Maps-to: MII P09; wb-xr1z (open; re-read at filing).
- Extends: EAT-R238, EAT-R266, EAT-R272, EAT-R279; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R397, EAT-R427.
- Verifies: EAT-R397, EAT-R427.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — needs the P05 positive control

## EAT-R454 — Report post-dispatch cancellation as uncertain with exact refs and no rollback claim

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Cancellation after dispatch MUST report the exact native session/operation refs where known, publish the effect disposition as uncertain, and never claim rollback; pre-dispatch and post-dispatch cancellation MUST remain distinguishable states.
- Rationale: C207 NON-EPISTEMIC (NORMATIVE); C224 NON-EPISTEMIC (NORMATIVE — requested vs established cancellation). C131 NON-EPISTEMIC (NORMATIVE rule: after a possible side effect the invocation is published uncertain with its native ids). Cure M216; lineage: the MNI controls bead wb-5a7k is closed — its cancellation-uncertainty behavior is inherited, and this requirement extends it to the function route rather than re-opening it.
- Epistemic basis: C207 NON-EPISTEMIC; C224 NON-EPISTEMIC; C131 NON-EPISTEMIC.
- Derived from / remediation: C207, C224, C131; M216.
- Executable acceptance criteria:
  1. Cancel before dispatch: terminal shows cancelled-pre-dispatch, zero effects proven via EAT-R453 detectors.
  2. Cancel after dispatch: reply and journal carry known native refs verbatim, disposition uncertain, and no field asserts rollback or undo; a mutant reporting clean rollback turns red.
  3. The two cancellations project to distinct typed states in observe output.
- Negative mutant: Cancel after dispatch: reply and journal carry known native refs verbatim, disposition uncertain, and no field asserts rollback or undo; a mutant reporting clean rollback turns red.
- V-tier: V3, V5; EAT-R454@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3 + V5.
- Conditions / unresolved gates: none.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R252, EAT-R280, EAT-R282; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Controls lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).
- Linked rows: EAT-R418, EAT-R445.
- Verifies: EAT-R418, EAT-R445.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch; the post-dispatch arm is behind the EAT-R253 repair receipt

## EAT-R455 — Run the resource trials against a measured script baseline without inventing SLAs

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: The release MUST include resource trials of 1, 4 and 16 concurrent different-root invocations plus a separate same-root denial trial, measuring p50/p95 cold/warm startup, queue, serialization, event growth, memory, FD and child count on the existing load harness with an explicit joined/native leg and a fixed comparable environment, compared against the existing Pi script path under comparable conditions; metrics not measured (token/cost, child counters where uninstrumented) MUST be recorded as unknown, and no SLA may be asserted that was not measured.
- Rationale: C208 NON-EPISTEMIC (NORMATIVE, including the no-invented-SLA clause). Cure M217 (reuse the existing load harness with an explicit joined leg, fixed environment, measured denominators; preserve unmeasured token/cost/child counters as unknown).
- Epistemic basis: C208 NON-EPISTEMIC.
- Derived from / remediation: C208; M217.
- Executable acceptance criteria:
  1. Receipts contain the three concurrency runs and the same-root denial run with raw measurements and environment fingerprint; the comparison table names the script-path baseline run it compares against.
  2. Any absent metric appears as null/unknown, never as a number; a validator rejects a receipt asserting an SLA with no measurement row.
  3. A receipt carrying an SLA with no raw measurement row is accepted by a mutant validator; the RA-18 test must reject it.
- Negative mutant: A receipt carrying an SLA with no raw measurement row is accepted by a mutant validator; the RA-18 test must reject it.
- V-tier: V5; EAT-R455@V5 (the draft names no artifact; location per EAT-R456); target detail: V5.
- Conditions / unresolved gates: none.
- Maps-to: MII P09; wb-9bof (open; re-read at filing).
- Extends: EAT-R284, EAT-R285; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — script-baseline leg runnable now (qa/workbench/mwi-multiworkflow-load.mjs); joined/native leg BLOCKED by G-NATIVE

## EAT-R456 — Persist QA evidence in a new source-pinned receipt directory; never rewrite provenance; never cite or deny GitHub CI

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: All release-program logs and evidence MUST land in a new source-pinned QA receipt directory; older receipts and provenance MUST NOT be rewritten; release evidence MUST NOT cite GitHub CI runs as proof; and program/receipt wording MUST NOT assert that the Pi repository has no GitHub CI.
- Rationale: doc-04 preamble duty (persist under a new source-pinned QA receipt directory) is NON-EPISTEMIC (NORMATIVE). C181 (SOURCE_REPORT, ESTABLISHED) with cure M190: keep attribution and authoring interval; do not infer no historical tests or a gate-neutral deposit. C138 is REFUTED — the absence claim "the Pi repository has no GitHub CI" is false at the pin (a ci.yml with lint/typecheck/test jobs exists at 0fb90672) — so it compiles negatively only: the rule reading "do not rely on CI as packet evidence" stands (C034, C136 NON-EPISTEMIC), while the empirical absence wording is barred.
- Epistemic basis: C181 ESTABLISHED; C138 REFUTED; C034 NON-EPISTEMIC; C136 NON-EPISTEMIC.
- Derived from / remediation: C181, C138, C034, C136; M190.
- Executable acceptance criteria:
  1. A validator asserts every new receipt lives under a directory keyed by both source SHAs and rejects writes into prior receipt directories (append-only custody).
  2. Grep-gate over program docs and receipts: no sentence asserts "no GitHub CI" as a repository fact; evidence tables contain no GitHub Actions run as a gate witness.
  3. Historical receipts byte-identical before/after the release cut (hash census).
  4. A validator mutant accepts a write into a prior source-pinned receipt directory; the append-only custody check must turn red.
- Negative mutant: A validator mutant accepts a write into a prior source-pinned receipt directory; the append-only custody check must turn red.
- V-tier: V0, V1; EAT-R456@V0/V1 (the draft names no artifact; location per EAT-R456); target detail: V0 + V1 (validator).
- Conditions / unresolved gates: none. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P10; wb-yiu4 (open; re-read at filing).
- Extends: EAT-R291, EAT-R307, EAT-R308; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-10, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — validator and grep gate; no external blocker

## EAT-R457 — Capture every native evidence axis from the actual run; never populate from synthetic frames or local HEAD

- Type: INSTRUMENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: The opt-in native journey MUST capture, from the actual run only: source candidate SHA and tree, Forge manifest hash, Forge operation id, the original gate envelope, the gate definition (and its hash) and the environment binding; no receipt field may be populated from a synthetic frame, a template placeholder, or the current local HEAD standing in for the executed candidate.
- Rationale: C209 NON-EPISTEMIC (NORMATIVE). Cure M218 (require an evidence-acquisition/validator step for each native axis and both hashes; never populate template fields from synthetic frames or current local HEAD). This is the per-axis half of the phantom-name cures: a named field with a fabricated or mis-sourced value is the same defect class as a phantom name.
- Epistemic basis: C209 NON-EPISTEMIC.
- Derived from / remediation: C209; M218.
- Executable acceptance criteria:
  1. A per-axis validator cross-checks each captured value against an independent witness (e.g. candidateCommit/candidateTree against the repository odb; forgeOperationId against the producer's own record; manifest hash recomputed from the installed artifact).
  2. A mutant that fills any axis from local HEAD or a fixture frame is caught by the validator (red).
  3. Unavailable axes are null with a reason, never synthesized (ties to EAT-R458 null semantics).
- Negative mutant: A mutant that fills any axis from local HEAD or a fixture frame is caught by the validator (red).
- V-tier: V4; EAT-R457@V4 (the draft names no artifact; location per EAT-R456); target detail: V4.
- Conditions / unresolved gates: native credentials are opt-in; absent credentials the axis rows stay null-with-reason and the tier stays unachieved (no false green).
- Maps-to: MII P08; wb-p3i2 (open; re-read at filing).
- Extends: EAT-R261, EAT-R277, EAT-R291; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R462.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R462.
- L0: TRACEABLE; text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-NATIVE

## EAT-R458 — Ratify the release receipt schema and enforce it with null, mismatched-field and phantom-ID mutants

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: Before V4/V5 receipts are produced, the release receipt JSON proposed in doc-04 MUST be ratified as a versioned joint schema specifying: schema id, namespaced tier vocabulary, shared join keys with the MW receipt (invocation/commit keys), native-vs-manifest hash distinction, ref/effect/error mappings, owning directory and owner, and a validator; the validator MUST be exercised with null-field, mismatched-field and phantom-ID mutants, prior receipts MUST be preserved unchanged, null MUST remain null, and native IDs MUST never be fabricated.
- Rationale: C211 NON-EPISTEMIC (PROPOSAL — the field list is a template, not an existing receipt; its permitted wording requires ratifying a versioned joint schema or explicit mappings, common invocation/commit keys and a validator, keeping unavailable IDs null and effect uncertainty separate). Cure M220 verbatim carries the phantom-ID mutant duty — the direct cure for the MNI phantom-receipt-name lesson. C128 NON-EPISTEMIC (NORMATIVE: a missing producer id is never replaced by a fabricated name).
- Epistemic basis: C211 NON-EPISTEMIC; C128 NON-EPISTEMIC.
- Derived from / remediation: C211, C128; M220.
- Executable acceptance criteria:
  1. The schema file exists with a schema id and version; the Pi emitter validates; the MW receipt is joined through the documented mapping; MW-side adoption is tracked by wb-1zn2; join keys resolve one logical invocation across both receipts.
  2. Validator mutants: (a) a receipt with a fabricated/phantom native ID is rejected; (b) a mismatched field name (e.g. a prose-name variant of a schema field) is rejected; (c) null axes pass as null-with-reason and are not auto-filled.
  3. A hash census proves prior receipts unchanged by schema adoption.
- Negative mutant: Validator mutants: (a) a receipt with a fabricated/phantom native ID is rejected; (b) a mismatched field name (e.g. a prose-name variant of a schema field) is rejected; (c) null axes pass as null-with-reason and are not auto-filled.
- V-tier: V1, V4, V5; EAT-R458@V1/V4/V5 (the draft names no artifact; location per EAT-R456); target detail: V1 (schema+validator) consumed at V4/V5.
- Conditions / unresolved gates: joint ratification with MW (mw-04 receipt shape) via the EAT-R469 crosswalk.
- Maps-to: MII P10; wb-yiu4 (open; re-read at filing).
- Extends: EAT-R208, EAT-R241, EAT-R291; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-03, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: joint schema (K031: the two receipt templates cannot be joined by field today)

## EAT-R459 — Enforce the release vetoes as executable gates over a ratified G/P↔Q↔MNI mapping

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: Each doc-04 release veto MUST be enforced by a named executable gate — unsupported function invocable; raw caller field becoming authority / no exact grant; launch handle freeing an active writer / second process writing the same root; canonical digest differing from the payload reaching Mechanical; missing Forge proof becoming verified_candidate or a historical pass credited to a changed tree; unknown effect auto-retrying or missing evidence resolving to failure/success; registration test bypassing the Pi tool or native test using fake SDK/Forge; missing Mechanical L4/L5 (MW evidence ladder; not this matrix's agentic-tdd L4/L5) marked shipped; skill/README/feature-matrix advertising deployment without receipts; existing script/subagent regression failures — and the tier and falsifier identifiers backing each veto MUST come from a ratified G/P↔Q↔MNI A/B/C mapping table naming the actual enforcing validator or counter for each row. Veto documentation MUST NOT justify ownership via the shared D-ledger reading.
- Rationale: C210 NON-EPISTEMIC (NORMATIVE veto list). Cure M219 (ratify tier and G/P-to-Q-to-MNI A/B/C mapping; identify actual enforcing validators/counters; preserve existing green regression cases separately from new red tests). Negative clause from C032 (REFUTED — the D-numbers are not one corpus-described ledger: D1/D2/D4/D7/D8/D10/D11/D12 occur in Pi only as README labels, described only in the MW companion, where none of D8/D10/D11/D12 is marked shared), so no veto or ownership row may cite a D-number as if the Pi corpus defined it or as if it were shared-owned.
- Epistemic basis: C210 NON-EPISTEMIC; C032 REFUTED.
- Derived from / remediation: C210, C032; M219.
- Executable acceptance criteria:
  1. A machine-readable veto table maps each veto → gate command/validator id → falsifier ids (G/P rows, MW Q rows, MNI A/B/C rows) with all three namespaces explicit; a release dry-run executes every gate and the release command refuses while any veto gate is red or unmapped.
  2. Existing green regressions (script/subagent suites) are listed separately from new red tests, and a regression failure trips the veto.
  3. A doc lint rejects a veto/ownership row citing a bare D-number without its MW companion definition reference.
  4. A release dry-run vetoes when there is no recorded local full Forge gate (forge.toml `gate`) on each cut and on the final merged tree (EXTENDS EAT-R286).
  5. A release mutant proceeds with an unmapped veto predicate; the executable gate must turn red.
- Negative mutant: A release mutant proceeds with an unmapped veto predicate; the executable gate must turn red.
- V-tier: V0, V1; EAT-R459@V0/V1 (the draft names no artifact; location per EAT-R456); target detail: V0 (table) + V1 (gates), binding at release.
- Conditions / unresolved gates: crosswalk ratification (EAT-R469) precedes table freeze. Filing-time / next-text-cycle: RA-13, RA-16.
- Maps-to: MII P10; wb-yiu4 (open; re-read at filing).
- Extends: EAT-R209, EAT-R286, EAT-R292, EAT-R294; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-13, RA-16); text consolidated: RA-07, RA-10, RA-18, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: the crosswalk (EAT-R469) precedes the veto-table freeze

## EAT-R460 — Gate V2 on a real packed-host install in a fresh external consumer

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The V2 tier MUST be claimed only from an actual independently npm-packed Mechanical host installed into a fresh external consumer with digest and runtime-file checks passing there, and MUST NOT be described as a Pi invocation.
- Rationale: C183 NON-EPISTEMIC (NORMATIVE tier definition). C214 (ESTABLISHED — @mechanical/development-rig/host is a real export at the MW pin) and C218 (ESTABLISHED — Pi declares Node >=24 while MW rig declares >=22.18.0 <25, so the joint consumer needs an overlapping measured runtime) scope the gate. Cure M192; M227 for the Node-overlap premise.
- Epistemic basis: C183 NON-EPISTEMIC; C214 ESTABLISHED; C218 ESTABLISHED.
- Derived from / remediation: C183, C214, C218; M192, M227.
- Executable acceptance criteria:
  1. The gate packs the MW host, installs it in a new temp consumer, verifies tarball sha256 and per-file runtime manifest, imports only the reviewed ./host subpath, and records the consumer's Node version within the measured overlap window.
  2. The receipt labels the run V2/installed-consumer; a lint rejects any wording crediting it to Pi or to the registered route (the MW L2 fixture named pi-consumer is not L4/V3).
  3. A V2 gate mutant accepts a changed installed `dist` runtime file after tarball verification; the fresh-consumer runtime-file check must turn red.
- Negative mutant: A V2 gate mutant accepts a changed installed `dist` runtime file after tarball verification; the fresh-consumer runtime-file check must turn red.
- V-tier: V2; EAT-R460@V2 (the draft names no artifact; location per EAT-R456); target detail: V2.
- Conditions / unresolved gates: none.
- Maps-to: MII P04; wb-y0n6 (in_progress; re-read at filing).
- Extends: EAT-R220, EAT-R271; ADD — the draft stated bead lineage only; EAT-R271's condition 'conditional on MW-INSTALLED-HOST' is retired at 69cb016d.
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R421, EAT-R422.
- Verifies: EAT-R421, EAT-R422.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-10, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — unblocked for the shipped subpath; host node v24.20.0 lies inside the declared overlap >=24 <25

## EAT-R461 — Gate V3 on the actually registered Pi tool with deterministic callbacks

- Type: VERIFICATION
- Authority: NORMATIVE_DECISION
- Statement: The V3 tier MUST be claimed only from an invocation of the actually registered workflow_execute(kind=function) that reaches deterministic four-callback fixtures exactly once and is observed via workflow_observe on the same logical invocation; a direct host-helper call MUST NOT count as V3, and V3 MUST NOT claim native providers.
- Rationale: C184 NON-EPISTEMIC (NORMATIVE tier definition). C212 (ESTABLISHED — the four workflow tools are registered at the Pi pin and execute rejects non-script kinds today, so the registered function branch is new work this gate must exercise); C107 (ESTABLISHED, arbitrated — FUNCTION_ACTION_CONTRACT is the frozen unadopted default with no production adopter at the pin, so adoption is part of what V3 proves). Cure M193.
- Epistemic basis: C184 NON-EPISTEMIC; C212 ESTABLISHED; C107 ESTABLISHED.
- Derived from / remediation: C184, C212, C107; M193.
- Executable acceptance criteria:
  1. The gate invokes the registered tool by its registered name through the tool dispatcher (not by importing the launcher), asserts exactly-once callback delivery, and asserts the same invocationId is observable via workflow_observe and workflow_reconcile in the same invocation.
  2. A bypass mutant (calling the host helper directly) is detected by the gate's route witness and rejected as V3 evidence.
  3. The receipt records zero native-provider claims for this tier.
- Negative mutant: A bypass mutant (calling the host helper directly) is detected by the gate's route witness and rejected as V3 evidence.
- V-tier: V3; EAT-R461@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: P05 registration landed; grant adoption (wb-w8fk) ratified. The EAT-R405 ratification record must settle SDK pin owner, provider-factory ownership and the V3 fixture-host injection seam (E226 / K032) before the tier is claimed (RA-15). Filing-time / next-text-cycle: RA-19.
- Maps-to: MII P05; wb-4bxo (open; re-read at filing).
- Extends: EAT-R235, EAT-R265, EAT-R304; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R412, EAT-R426.
- Verifies: EAT-R412, EAT-R426.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-19); text consolidated: RA-10, RA-13, RA-15; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — P05 branch and grant adoption (EAT-R405)

## EAT-R462 — Acquire the missing joined native-run evidence (V4), including the uncensused external stores

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The program MUST produce the currently nonexistent joined-run evidence: a V4 receipt of one invocation through the registered Pi route reaching a Mechanical function with real Claude, real Git and the native Forge full gate; where EAT-R437 has settled attainability by envelope, the strict-positive envelope is captured; until then a V4 receipt whose assurance is the weak value is a valid non-strict V4 receipt and the strict clause stays `undetermined`; the receipt also captures exact resolved SDK paths/versions and the certificate result/event carrier; and, before claiming any broader absence or firstness, MUST census the evidence stores outside the two repositories (the OrchestrationEngineer ledger directory and home-directory Forge ledgers cited by existing receipts) for prior joined receipts. Duty split (RA-05): EAT-R431 owns the receipt content, provider readback and BLOCKED semantics; this row owns (a) the acquisition, citing the EAT-R431 receipt, and (b) the external-store census, whose scope extends to the crash-restart and lease absences (C024 ESTABLISHED, C025 ESTABLISHED).
- Rationale: C023 (OBSERVATION, ESTABLISHED absence — no joined live Claude/Git/Forge receipt exists in the committed stores of either repository at the pins; absence beyond the two repositories is explicitly not settled: the ledger's missing-to-settle names the uncensused external stores). C185's strict-positive envelope facet was preserved as undetermined by M194, which directs exactly these named evidence-acquisition gates (strict-positive native envelope; exact resolved SDK paths/versions; certificate result/event carrier). Never relax proof by silently replacing native providers (M194).
- Epistemic basis: C023 ESTABLISHED; C185 NON-EPISTEMIC; C024 ESTABLISHED; C025 ESTABLISHED.
- Derived from / remediation: C023, C185, C024, C025; M019, M194.
- Executable acceptance criteria:
  1. A V4 receipt (EAT-R458 schema; content, provider readback and BLOCKED semantics owned by EAT-R431) exists with non-null native axes validated per EAT-R457, produced through the registered route (route witness as in EAT-R461); where EAT-R437 has not settled strict attainability by envelope, a receipt whose assurance is the weak value is a valid non-strict V4 receipt and carries the strict clause as `undetermined`.
  2. The external-store census runs with a stated detection surface (directories enumerated, query used, time window) and its result (prior joined receipts found or none-in-surface) is recorded in the receipt; absence wording stays scoped to the censused surfaces. The census covers three absences: joined native-run receipts (C023 ESTABLISHED), joined crash-restart proof (C024 ESTABLISHED) and cross-process writer-lease proof (C025 ESTABLISHED).
  3. If credentials/providers are unavailable, the tier is recorded unachieved with the exact blocker; no fallback provider is silently substituted.
- Negative mutant: NOT_NAMED in the draft; owner must name the row-specific negative mutant at the next text cycle (RA-18); no mutant has been run.
- V-tier: V4; EAT-R462@V4 (the draft names no artifact; location per EAT-R456); target detail: V4.
- Conditions / unresolved gates: blocked on MW native closure (mw-03 packets per EAT-R469 crosswalk) and opt-in credentials. Strict attainability remains the EAT-R437 acquisition gate (UNDETERMINED until settled by envelope or by recorded decision). EAT-R431, EAT-R457 and EAT-R462 are filed as legs of one bead under wb-p3i2 (RA-05). Filing-time / next-text-cycle: RA-16, RA-19.
- Maps-to: MII P08; wb-p3i2 (open; re-read at filing).
- Extends: EAT-R259, EAT-R260, EAT-R263, EAT-R277; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R425, EAT-R430, EAT-R431, EAT-R457.
- Verifies: EAT-R425, EAT-R430, EAT-R431, EAT-R457.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16, RA-19); text consolidated: RA-05, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-NATIVE; the external-store census leg is NOT_RUN and runnable now (read-only)

## EAT-R463 — Acquire the missing joined crash-restart proof (V5)

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: The program MUST produce the currently nonexistent proof that a joined Pi-to-Mechanical invocation survives host/worker crash and restart — reattached or reconciled afterwards without a duplicated effect — by running the G11/P18 harness (EAT-R450) over the registered joined route in the named supported process topology, and MUST record which fault classes remain unproven.
- Rationale: C024 (OBSERVATION, ESTABLISHED absence — no joined crash/restart proof exists in either repository at the pins and none could have been produced through the registered route; single-side fault harnesses exist and stay baseline). C186 NON-EPISTEMIC (NORMATIVE V5 definition). Cures M020 (extend wb-7wkb's harness; inherit its not-claimed list), M195 (name the supported process topology; preserve untested SDK-child/power-loss limits; do not call optional profiles verified by embedded tests).
- Epistemic basis: C024 ESTABLISHED; C186 NON-EPISTEMIC; C213 ESTABLISHED.
- Derived from / remediation: C024, C186, C213; M020, M195, M222.
- Executable acceptance criteria:
  1. V5 receipts show kill-at-stage runs (per doc-04 safety matrix: each stage) on the joined route with durable source state and intent after restart, no false settlement, PID fencing asserted, and no duplicate effect (EAT-R453 detectors).
  2. The receipt's not-claimed list explicitly carries forward untested classes (power loss, SDK-child survival, non-supported topologies).
  3. Observation state survives restart or is rebuilt from the durable journal — not from in-memory session state (C213 ESTABLISHED baseline; cure M222).
- Negative mutant: NOT_NAMED in the draft; owner must name the row-specific negative mutant at the next text cycle (RA-18); no mutant has been run.
- V-tier: V5; EAT-R463@V5 (the draft names no artifact; location per EAT-R456); target detail: V5.
- Conditions / unresolved gates: requires the EAT-R450 harness, EAT-R399..R403, EAT-R414..R417 and the joined route (EAT-R412, R426).
- Maps-to: MII P09; wb-9bof (open; re-read at filing).
- Extends: EAT-R215, EAT-R216, EAT-R257, EAT-R278, EAT-R279, EAT-R280, EAT-R281; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Harness lineage: wb-7wkb (closed).
- Linked rows: EAT-R402, EAT-R414, EAT-R420, EAT-R438, EAT-R439, EAT-R445.
- Verifies: EAT-R402, EAT-R414, EAT-R420, EAT-R438, EAT-R439, EAT-R445.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-04, RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — needs the EAT-R450 harness, the durable lease/journal rows and the joined route

## EAT-R464 — Acquire the missing cross-process writer-lease proof; define or drop "compatible"

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION; secondary RISK_CONTROL
- Statement: The program MUST record, as a receipt, that EAT-R448 passed against the EAT-R399..R401 substrate in the named same-machine topology; it adds no second substrate; the README term "compatible distributed lease" MUST be given a defined referent or be dropped; and the lease-owner ruling plus the wb-1zn2 external-gate dependency MUST be carried into P00 so the acquisition is tracked against its MW-owned blockers.
- Rationale: C025 (OBSERVATION, ESTABLISHED absence — no distributed, nor even cross-process, writer-lease implementation or proof exists in either repository at the pins; "compatible" has no defined referent; the first release's own cross-process requirement is equally unproven). C016/C042 (ESTABLISHED — WriterLeases is in-memory, process-local), C043 (ESTABLISHED — released on dispatch-promise resolve), C155 (SUPPORTED), C118 (SUPPORTED — timeout is not proof of safe release). Cures M021/M022 (define or drop "compatible"; state the nearer cross-process absence; carry the lease-owner ruling and wb-1zn2 external gate in P00). C116/C115/C121 NON-EPISTEMIC (PROPOSAL substrate: durable single-machine lock/journal, lease object, release law).
- Epistemic basis: C025 ESTABLISHED; C016 ESTABLISHED; C042 ESTABLISHED; C043 ESTABLISHED; C155 SUPPORTED; C118 SUPPORTED; C115 NON-EPISTEMIC; C116 NON-EPISTEMIC; C121 NON-EPISTEMIC.
- Derived from / remediation: C025, C016, C042, C043, C155, C118, C115, C116, C121; M021, M022.
- Executable acceptance criteria:
  1. The receipt records that G06/G07 (EAT-R448) passed, including the restart case, against the EAT-R399..R401 substrate, whose persisted owner is observable; timeout-only release is impossible by construction (a timeout transitions to recovery-held, never to free; mutant proves it). This row builds no substrate of its own.
  2. P00 ratification records the chosen referent for "compatible" (or documents the term's removal) and links the wb-1zn2 (deferred) external-gate rows that gate any MW-side lease obligations.
  3. The receipt scopes the proof to same-machine cross-process; multi-host remains recorded as unproven.
- Negative mutant: The receipt records that G06/G07 (EAT-R448) passed, including the restart case, against the EAT-R399..R401 substrate, whose persisted owner is observable; timeout-only release is impossible by construction (a timeout transitions to recovery-held, never to free; mutant proves it). This row builds no substrate of its own.
- V-tier: V1, V3, V5; EAT-R464@V1/V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V1 + V3 + V5 (audited tier, RA-12; the draft omitted the registered-route tier carried by its behaviour row EAT-R400).
- Conditions / unresolved gates: owner decision on the "compatible" referent (pin owner: Pi Workbench). Downstream of EAT-R448; resulting order EAT-R398 → EAT-R399..R403 → EAT-R448 → EAT-R464 (RA-04). Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P02; wb-2ukh (in_progress; re-read at filing).
- Extends: EAT-R207, EAT-R232, EAT-R269; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. External-gates lineage: wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: EAT-R398, EAT-R399, EAT-R400, EAT-R401.
- Verifies: EAT-R398, EAT-R399, EAT-R400, EAT-R401, EAT-R448.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-04, RA-10, RA-12; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — the proof follows EAT-R448 passing; the 'compatible' referent is an owner decision (G-RATIFY)

## EAT-R465 — Expose per-axis readiness in discovery/inspect and explain disabled functions by host-owned remedy

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: Tool discovery/inspect MUST present the one reviewed function with each readiness axis separately — descriptor available, runtime artifact admitted, effective permission, source eligible, writer availability, native provider available, strict gate profile — bound to actual registered capability metadata; a disabled function MUST state which axis fails and which host-owned action could resolve it, and MUST NOT suggest model-supplied fields can grant permission.
- Rationale: C222 NON-EPISTEMIC (NORMATIVE). Baselines: C212 (ESTABLISHED — tools registered, function kind advertised but rejected at the pin), C107 (ESTABLISHED, arbitrated — the unadopted FUNCTION_ACTION_CONTRACT refusal is the current disabled state this surface must truthfully render), C104 (ESTABLISHED — descriptor/allowlist pinning exists). Cure M231 (bind to actual registered capability metadata and test each disabled axis, redaction/scope and host-only remedy without loading or effecting the provider).
- Epistemic basis: C222 NON-EPISTEMIC; C212 ESTABLISHED; C107 ESTABLISHED; C104 ESTABLISHED.
- Derived from / remediation: C222, C212, C107, C104; M231.
- Executable acceptance criteria:
  1. One test per axis: break exactly that axis; inspect output flags exactly that axis false with a host-owned remedy string, and the probe performs zero provider loads/effects (EAT-R453 detectors).
  2. A forged model-side grant in the request changes no readiness axis (ties to G10).
  3. Redaction/scope rules applied to the inspect payload are asserted (no secret/los paths leak).
  4. An inspect mutant reports ready when one named readiness axis is broken; the per-axis disabled test must turn red.
- Negative mutant: An inspect mutant reports ready when one named readiness axis is broken; the per-axis disabled test must turn red.
- V-tier: V3; EAT-R465@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: none.
- Maps-to: MII P05; wb-4bxo (open; re-read at filing).
- Extends: EAT-R249, EAT-R289; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R449.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: EAT-R449.
- L0: TRACEABLE; text consolidated: RA-10, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — P05 branch (registered capability metadata)

## EAT-R466 — Keep launch strictly launch-only and ratify the response envelope before anything copies it

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The launch reply MUST assert only launch (invocation ID, source commit, definition digest, host mode, launch-only status) and MUST never signal completion or SUCCESS because the launcher succeeded; the observation view MUST carry independent rows for native session, candidate commit/tree, Forge gate, evidence strength, effect intent/reconciliation and last update; empty nativeRefs MUST appear only when truthfully empty; and the exact outer/inner response envelope MUST be ratified before tests, examples or docs copy the doc-05 illustration. This row owns one decision, recorded in the EAT-R405 ratification record — launch status for an embedded function launch with no producer-native reference yet: exactly one of (i) `accepted` with a ratified meaning, (ii) `launched` carrying a host-minted Pi-native reference, (iii) the reply is delayed until the first native reference.
- Rationale: C223 NON-EPISTEMIC (NORMATIVE); C225 NON-EPISTEMIC (PROPOSAL — the JSON response is illustrative, not executed output). C030 (SUPPORTED — the existing observe-after-launch mechanism this builds on). Cures M232 (require the producer strict-certificate dependency and a mandatory independent assurance projection, scoped carrier, exact same invocation; carry thrown errors without outcome laundering), M234 (separate the proposal from the established builder conflict and trimming exception; ratify envelope, honest status and empty-ref semantics before tests/examples copy it).
- Epistemic basis: C223 NON-EPISTEMIC; C225 NON-EPISTEMIC; C030 SUPPORTED.
- Derived from / remediation: C223, C225, C030; M232, M234.
- Executable acceptance criteria:
  1. A schema test pins the ratified launch envelope; completion fields are absent/`not-asserted` by type; a mutant adding a success flag at launch turns red.
  2. Observation projection shows the independent rows populated from distinct witnesses; evidence strength is computed from the producer certificate projected under EAT-R433 / EAT-R434 (EAT-R446 is the falsifier suite, not the projector), never from launch status.
  3. A fixture with no native refs asserts emptiness is truthful (producer never emitted refs) and a fabricated-ref mutant is rejected (ties to EAT-R458 phantom-ID mutants).
- Negative mutant: A schema test pins the ratified launch envelope; completion fields are absent/`not-asserted` by type; a mutant adding a success flag at launch turns red. | A fixture with no native refs asserts emptiness is truthful (producer never emitted refs) and a fabricated-ref mutant is rejected (ties to EAT-R458 phantom-ID mutants).
- V-tier: V3; EAT-R466@V3 (the draft names no artifact; location per EAT-R456); target detail: V3.
- Conditions / unresolved gates: envelope ratification is a P00/P05 owner decision. Until the launch-status decision record exists, this clause, EAT-R412 criterion 3 and EAT-R441 criterion 3 are BLOCKED on G-RATIFY (RA-09). Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P06; wb-9a1o (open; re-read at filing).
- Extends: EAT-R240, EAT-R244, EAT-R289; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only.
- Linked rows: EAT-R412, EAT-R441.
- Verifies: EAT-R412, EAT-R441.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-09, RA-10, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: envelope and launch-status decision (RA-09)

## EAT-R467 — Give controls reason-specific help and gate risky release behind an audited explicit override

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION; secondary RISK_CONTROL
- Statement: Controls MUST distinguish cancel-requested from cancel-established, support reattach and read-only reconcile, allow release only on known-safe settlement, and require an explicit, audited, distinctly labelled operator override for anything else; reason-specific action help MUST exist for SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING and UNCERTAIN_EFFECT, with each reason mapped to the producer code that raises it.
- Rationale: C224 NON-EPISTEMIC (NORMATIVE). C119/C121 NON-EPISTEMIC (NORMATIVE lease quarantine/release law); C118 (SUPPORTED — timeout is not settlement evidence) grounds why release needs evidence or override. Cure M233 (ratify refusal/LX mapping to producer codes and lease-release rules; distinguish risky override from known-safe release; carry the pending cancellation-ordering repair and authority checks).
- Epistemic basis: C224 NON-EPISTEMIC; C119 NON-EPISTEMIC; C121 NON-EPISTEMIC; C118 SUPPORTED.
- Derived from / remediation: C224, C119, C121, C118; M233.
- Executable acceptance criteria:
  1. Each of the five reasons is raised by a fixture and the control reply carries that reason's specific help text and producer code; an unmapped producer code fails closed with a generic-unknown reason, never a wrong specific one.
  2. Release on a known-safe terminal succeeds; release on uncertain state is refused; the override path requires an explicit flag, writes an audit record naming operator/reason/time, and is labelled distinctly in observe output; a mutant silently releasing on timeout turns red.
  3. Reattach joins the same invocationId and running native producer without re-dispatch.
- Negative mutant: Release on a known-safe terminal succeeds; release on uncertain state is refused; the override path requires an explicit flag, writes an audit record naming operator/reason/time, and is labelled distinctly in observe output; a mutant silently releasing on timeout turns red.
- V-tier: V3, V5; EAT-R467@V3/V5 (the draft names no artifact; location per EAT-R456); target detail: V3 + V5.
- Conditions / unresolved gates: producer code vocabulary ratified via EAT-R469. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P07; wb-mwsy (open; re-read at filing).
- Extends: EAT-R252, EAT-R282, EAT-R289; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Controls lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).
- Linked rows: EAT-R403, EAT-R418, EAT-R419, EAT-R427, EAT-R428, EAT-R445.
- Verifies: EAT-R403, EAT-R418, EAT-R419, EAT-R427, EAT-R428, EAT-R445.
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-10; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: producer code vocabulary (EAT-R469)

## EAT-R468 — Reconcile skill, README/AGENTS, W11 and workbench docs truthfully through their frozen readers

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary LINGUISTIC_INTEGRITY
- Statement: Every packet cut that touches .agents/skills/pi-mechanical-interop/SKILL.md, README/AGENTS.md, docs/workbench/feature-matrix.md W11 or the workbench security/operations/tool docs MUST, in the same cut: reconcile the frozen-shape readers (the wb-12x1 census test and any release validators) through their append-only/owner-pin protocol; keep shipped/unshipped rows matching actual achieved tiers with planned work marked planned; annotate rather than rewrite hash-pinned historical rows and receipts; provide one unambiguous current skill entrypoint naming the new program; and MUST NOT advertise deployment without receipts, describe scripts as Mechanical function adapters, import historical workbench-branch evidence as current master, or use the placement word "attached" for a Pi mode that does not exist.
- Rationale: C226 NON-EPISTEMIC (NORMATIVE duty list). Graded baselines: C216 (ESTABLISHED — W11 exists with status planned and the skill exists at the pin), C217 (ESTABLISHED — the historical W11 row still describes the HX→RF→SDK→Forge composition while this program's first release is Git-census/plain), C220 (ESTABLISHED — the skill still leads with the November 9 program and a frozen-shape census test reads it), C001 (ESTABLISHED — design-only status). Negative clause from C029 (REFUTED — "attached" names no Pi placement at the pin; the real placements are embedded and explicitly-admitted same-machine detached) with C230 NON-EPISTEMIC and cure M239 (reconcile README to embedded; define or drop "attached"). Cures M225 (link producer/native/restart receipts only when achieved), M226 (reconcile W11 without rewriting hash-pinned rows; pin advance is a separate owner decision), M229 (skill edits reconcile frozen readers in the same cut; name landing trunk vs default-branch skill; one unambiguous entrypoint), M235 (include census and release-validator readers in the packet surface; do not rewrite historical receipts to make gates green).
- Epistemic basis: C226 NON-EPISTEMIC; C216 ESTABLISHED; C217 ESTABLISHED; C220 ESTABLISHED; C001 ESTABLISHED; C029 REFUTED; C230 NON-EPISTEMIC.
- Derived from / remediation: C226, C216, C217, C220, C001, C029, C230; M225, M226, M229, M235, M239.
- Executable acceptance criteria:
  1. The wb-12x1 census test and release validators pass at the same commit as every docs/skill edit (same-cut gate), via appended rows, never edited pinned rows (hash census over pinned sections).
  2. A docs lint fails on: a shipped row without a receipt link; the word "attached" as a Pi placement; script paths described as function adapters; a workbench-branch receipt cited as master evidence.
  3. The skill's first section names the MII program and its status, with the November 9 program preserved below as history.
  4. Sample invocation / observe / control transcripts are captured from registered-route runs and carry their receipt reference; the pi-05 JSON stays labelled proposal.
  5. The MII program directory gains one appended annotation block (insert-only, after the pinned sections) carrying the deferred REMEDIATION inserts; the block lists each M-id landed; the pin advance stays an owner decision.
  6. The first docs/skill cut repairs the recorded-red census rows through the census's append-only protocol before any other skill edit (authority EMPIRICAL_REPAIR; restore the M049 / M050 standing text or re-pin the rows through the census's append-only receipt protocol).
  7. A docs-lint mutant accepts a shipped W11 row without a receipt link; the same-cut documentation gate must turn red.
- Negative mutant: A docs-lint mutant accepts a shipped W11 row without a receipt link; the same-cut documentation gate must turn red.
- V-tier: V0, V1; EAT-R468@V0/V1 (the draft names no artifact; location per EAT-R456); target detail: V0 + V1 (lint/census gates).
- Conditions / unresolved gates: any pin advance of frozen rows is the owner's recorded decision (Pi Workbench), never this packet's. Filing-time / next-text-cycle: RA-16.
- Maps-to: MII P10; wb-yiu4 (open; re-read at filing).
- Extends: EAT-R288, EAT-R290, EAT-R293, EAT-R294, EAT-R306, EAT-R308, EAT-R310; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Docs lineage: wb-12x1 (closed).
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-16); text consolidated: RA-10, RA-13, RA-14, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — precondition recorded red: the wb-12x1 census is red on master per the ledger (C220/E010: 4 failures at 0fb90672, 8 at 3fc0ead1; not re-run here)

## EAT-R469 — Ratify one joint identifier crosswalk; forbid dependencies declared by bare H-label

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: Before any cross-repository dependency is declared or scheduled, the program MUST ratify one joint identifier table covering: Pi handoff rows H01–H05 and MW packet labels (with owner + document namespace + content on every row), MW README aliases, Pi packets P00–P12, the G/P↔Q falsifier correspondence, MNI lineage labels and actual bead ids; after ratification, a dependency declared by bare H-number (or bare packet number) without owner/content qualification MUST be rejected by review tooling. The crosswalk MUST record the content mapping the audit established — Pi H01→MW H03/H04/H06, Pi H02→MW H05, Pi H03→MW H01, Pi H04→MW H02/H07 — as the starting proposal for ratification, and MUST name exact export paths for consumed MW surfaces. The crosswalk MUST also carry namespace `D` (id, ledger id PI-I0n / MW-I0n, owner in each program, severity in each program, content, Pi consumption rows, MW packet, ruling), namespace `tier` (V ↔ MW-L ↔ L0-L10; EXTENDS EAT-R209), and glossary rows for 'strict' (axes of EAT-R434, attainability EAT-R437) and MW-CONTRACT (the EAT-R405 record).
- Rationale: C221 (OBSERVATION, SUPPORTED — the two corpora number the same work under colliding H-labels; a label-only handoff is ambiguous; content mapping per its permitted wording). C140 (UNSUPPORTED — "P04 composed admission" node vs "P04 reviewed installed host consumer" section identity is not stated by the document), C163 (UNSUPPORTED — P04's H01/H02 dependency premise collides across corpora), C142 (UNSUPPORTED — P08's H01/H02/H03 premise; mw-03's joined node is H08 gated on H05+H06+H07+Pi dispatcher): all three compile as must-ratify, never as assumed mappings. C227/C228 NON-EPISTEMIC (NORMATIVE handoff duties; no copying MW internals, no MW dependency on Pi). C173 (SUPPORTED, arbitrated — effect-intent/reconciliation exports exist at the MW pin but are not importable via the reviewed ./host subpath), so consumed-surface rows must carry exact export paths and their packaging blockers. Cures M230 (ratify one joint identifier table including MW README aliases, Pi packets/handoffs, MNI lineage and actual bead ids before assigning dependencies), M236 (downgrade modality; name all MW packet dependencies by owner/content with exact export, immutable closure, strict certificate carrier, effect/recovery and runtime readiness blockers), M237 (content-qualified handoffs, not collision-prone H labels), and M196/M219's Q-mapping halves.
- Epistemic basis: C221 SUPPORTED; C140 UNSUPPORTED; C142 UNSUPPORTED; C163 UNSUPPORTED; C227 NON-EPISTEMIC; C228 NON-EPISTEMIC; C173 SUPPORTED.
- Derived from / remediation: C221, C140, C142, C163, C227, C228, C173; M196, M219, M230, M236, M237.
- Executable acceptance criteria:
  1. A committed machine-readable crosswalk file lists every identifier row with {namespace, id, owner, content, maps_to[], exact_export_or_path?, live_bead?}; a validator asserts every cross-repo dependency statement in program docs resolves through the table.
  2. Review lint rejects a new dependency edge citing an H- or P-number absent owner+content qualification.
  3. Rows for consumed MW surfaces include the export check (e.g. ERR_PACKAGE_PATH_NOT_EXPORTED repro for dist/effect-intent.js at mw-69cb016d) and the blocker that clears it.
  4. The table records one owner ruling for D6 (two-part: Pi P04/P05 wiring + MW H06 composed host), one severity ruling each for D4, D10, D11, MW-I10, MW-I12, and one label for D7; until a ruling exists the row reads CONTESTED and no bead is keyed by the bare label.
  5. A crosswalk-lint mutant accepts a dependency keyed by a bare H-number with no owner/content; the namespace validator must turn red.
- Negative mutant: A crosswalk-lint mutant accepts a dependency keyed by a bare H-number with no owner/content; the namespace validator must turn red.
- V-tier: V0, V1; EAT-R469@V0/V1 (the draft names no artifact; location per EAT-R456); target detail: V0 (ratified table) + V1 (validator).
- Conditions / unresolved gates: joint sign-off by both repo owners; MW-side obligations tracked under wb-1zn2 (deferred) external gates.
- Maps-to: MII P00; wb-w8fk (open; re-read at filing).
- Extends: EAT-R206, EAT-R209, EAT-R309; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. MW-side obligations tracked under wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target).
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE; text consolidated: RA-07, RA-10, RA-14, RA-18; acceptance NOT_RUN.
- Gate status (unexecuted): **BLOCKED** — G-RATIFY: joint sign-off; MW side tracked by wb-1zn2 (deferred)

## EAT-R470 — Publish the MII↔MNI↔live-bead reconciliation map and keep packet receipts keyed to real beads

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION; secondary EVIDENCE_ACQUISITION
- Statement: The program MUST publish, before build dispatch, a reconciliation map from MII packet labels to the live MNI-era beads each one extends — P00→wb-w8fk (open at the 2026-11-11 live reads; + carry the wb-1zn2 (deferred) external-gate tracker), P01 → new (no MNI carrier; wb-7wkb is the closed MNI P01 and different work), P02→wb-2ukh (in_progress, which also owns the MII P03 authority surface), P03→wb-2ukh, P04→wb-y0n6 (in_progress; its title says MNI "P02", so append-correct its notes to record the MII P04 correspondence), P05→wb-4bxo (open), P06 → wb-9a1o (wb-upad closed into it), P07→wb-mwsy (open; controls lineage wb-5a7k closed), P08→wb-p3i2 (open), P09→wb-xr1z (open) and wb-9bof (open; harness lineage wb-7wkb closed), P10→wb-yiu4 (open; docs lineage wb-12x1 closed), P11 → wb-zswl (deferred), P12 → wb-pxvv (deferred), epic wb-1a3t (open) — reconciling by work content and current evidence, never by packet number; closed carriers (wb-7wkb, wb-5a7k, wb-upad, wb-12x1, wb-5ik5) and blockers MUST be retained as lineage, not reopened or re-released; every packet closure receipt MUST record the real bead id (or explicit none) with a named receipt file target; and the map MUST name the referent of the protected "completed source changes" of the November 9 program (file or bead list) before any MII cut touches those paths.
- Rationale: C137 NON-EPISTEMIC (DEFINITION — packet ids are planning labels; its recorded mapping to live beads is NOT the identity on numbers; permitted wording: reconcile MII→MNI→live bead IDs by work content and current evidence, not number). Bead statuses verified live in the Pi-subagents store on 2026-11-11 (this file's header). C180 NON-EPISTEMIC (NORMATIVE — closure receipts record real bead id if any; planned evidence never marked pass) with cure M189 (name the receipt file target and reconcile the validator's program-docs anchor). C229 NON-EPISTEMIC (NORMATIVE) with cure M238 (name landing trunk/default branch/merge direction and source-pinned test tier; reconcile existing MNI packet/bead/falsifier identity rather than duplicate; never claim old greens as new red). C006 (UNSUPPORTED — the November 9 program's "completed source changes" have no identified referent at the pins), so the protected-set naming is evidence acquisition, not an assumed fact. Cures M137/M138 (publish the mapping; append-correct wb-y0n6 and the external tracker; retain closed carriers and blockers). No-delta/closed-carrier handling follows the store's standing close-at-sweep convention rather than re-release.
- Epistemic basis: C137 NON-EPISTEMIC; C180 NON-EPISTEMIC; C229 NON-EPISTEMIC; C006 UNSUPPORTED.
- Derived from / remediation: C137, C180, C229, C006; M137, M138, M189, M238.
- Executable acceptance criteria:
  1. A committed map file lists every MII packet with {live_bead, bead_status_at_publication, lineage_beads[], mni_label, rationale}; a validator joins it against `bd list --json` and fails on: a named bead that is not live for an extends row, a closed bead listed as carrier, or an MII packet absent from the map.
  2. wb-y0n6 carries an appended note (append-only, never a notes replace) recording the MII P04 correspondence; wb-1zn2 is linked from the P00 row as the MW-owned gate tracker.
  3. Each packet closure receipt validates against the packet-closure receipt schema (pi-03 L83-84 field list; EXTENDS EAT-R291), ratified with EAT-R458 with a non-empty bead field (`wb-*` or `none:<reason>`) and lands at the named receipt file target.
  4. The protected-changes referent list for MNI-2026-11-09 exists (files or beads) and a pre-cut check warns on any MII diff touching it.
  5. A pre-cut re-pin record names both full SHAs, trees and the active bead snapshot (EXTENDS EAT-R201).
  6. The map names the landing trunk, the default branch, the merge direction and the program-docs validator anchor.
  7. A map-validator mutant accepts a closed bead as an active filing carrier; the live exact-id census check must turn red.
- Negative mutant: A map-validator mutant accepts a closed bead as an active filing carrier; the live exact-id census check must turn red.
- V-tier: V0, V1; EAT-R470@V0/V1 (the draft names no artifact; location per EAT-R456); target detail: V0 (published map) + V1 (validator).
- Conditions / unresolved gates: bead statuses drift with the store; the validator re-reads live status at every gate rather than trusting this file's snapshot. P11, P12 and V6 are explicit deferrals (section 'Explicit deferrals'; RA-06): 'P11 → wb-zswl (deferred)' and 'P12 → wb-pxvv (deferred)' state the packet disposition; the bead status is whatever the live read returns. Both parent epics exist: wb-1a3t (MWI) and wb-rhyt (MNI); the filing owner chooses one parent for new MII beads (new MII epic, or wb-rhyt related to wb-1a3t), never assumes there is only one (RA-20). Filing-time / next-text-cycle: RA-13, RA-16, RA-20.
- Maps-to: MII P00; wb-w8fk (open; re-read at filing).
- Extends: EAT-R201, EAT-R202, EAT-R309; ADD — the draft stated no EAT lineage (RA-10).
- Predecessor lineage: The draft stated bead lineage only. Epics: wb-1a3t (MWI) parents wb-w8fk, wb-4bxo, wb-9a1o, wb-mwsy, wb-p3i2, wb-zswl, wb-pxvv; wb-rhyt (MNI) parents wb-y0n6, wb-2ukh, wb-xr1z, wb-9bof, wb-yiu4; the parent ruling for new MII beads is owed (RA-20).
- Linked rows: none stated in Matrix A.
- Verifies: none (behaviour/contract or independent decision row).
- Verified-by: none stated in Matrix A; own gate / validator.
- L0: TRACEABLE (conditions: RA-13, RA-16, RA-20); text consolidated: RA-06, RA-10, RA-18, RA-19; acceptance NOT_RUN.
- Gate status (unexecuted): **NOT_RUN** — Pi-only map and validator; bead statuses must be live reads

## Explicit deferrals

| Program item | Disposition | Carrier (lineage, live bead) | First-release fence already in the set | Matrix status |
|---|---|---|---|---|
| P11 — optional detached function + Furnace ownership (pi-03 L77-78; C178) | DEFERRED: not a first-release blocker (EXTENDS EAT-R303) | EAT-R295..R298; wb-zswl (open at audit read; lineage: wb-dlc6, closed into it) | R404 c3 (detached / fleet ineligible), R412 c2 (unsupported host placement refused), R426 (no second develop / scheduler; EAT-R258) | S — NOT_RUN; explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06) |
| P12 — optional HX / RF + further function families (pi-03 L80-81; C179) | DEFERRED (EXTENDS EAT-R303) | EAT-R299..R302; wb-pxvv (in_progress at audit read; lineage: wb-669r, closed into it) — in-flight MNI work, not an MII dependency | R407 (exact grant bound to the one reviewed definition: no inheritance of development-write), R412 c2 (arbitrary function refused), R424 c4 (profile labels are label-only) | S — NOT_RUN; explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06) |
| V6 — optional detached / Furnace / HX / RF / fleet configurations (pi-04 L11; C186 second half) | DEFERRED with P11/P12 | as P11 / P12 | R463 not-claimed list carries untested topologies | S — NOT_RUN; explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06) |


| Claim / item | Grade | Explicit disposition / reason | Carrier / condition |
|---|---|---|---|
| C005 | REFUTED | Wording insert (M005/M006) plus the RA-07 crosswalk rows; never a positive self-containment premise | R468 insert block (RA-14, filing-time condition); R469 D / tier / strict / MW-CONTRACT crosswalk (RA-07, text fixed) |
| C035 | REFUTED | Facets (i)-(iii) established, (iv) Furnace-profile wording insert (M038/M039, tracker lineage: wb-12x1 row M047), (v) CI → R456; the GitHub-Actions run record is routed to the Pi owner and is out of program scope | Pi owner; annotation block / owner routing under RA-14, never inferred CI absence |
| D6 owner (K004) | CONTESTED embedded premise | OWNER-ROUTED: one proposed two-part ruling (Pi P04/P05 wiring + MW H06 composed host); no bare D-label filing | R469 crosswalk; G-RATIFY until owner record exists |
| D4 / D10 / D11 / MW-I10 / MW-I12 severity; D7 label | Unmade owner decisions | OWNER-ROUTED: one severity ruling each and one D7 label; table reads CONTESTED until the record exists | R469 criterion 4 / G-RATIFY |
| EAT-R253 repair | Witnessed red; no live repair carrier in audit | TO-BE-FILED at bead filing by the owner (new bead, blocks every effectful arm per the audit); legs EAT-R213 / R214 / R253, authority EMPIRICAL_REPAIR; R413 gate leg | R413; red-first evidence test/workbench-mwi-cancel-repro.test.ts; lineage: wb-9v02 / wb-3121 (closed, not targets) |
| MW-owned D1/D2/D4/D7/D8/D10/D11/D12, MW-I10/MW-I11 repairs | External producer work | Consumed / guarded by Pi rows; no Pi cut edits a MW test or implementation | Companion mw-03 H01..H07 by content; tracker wb-1zn2 (deferred) |

## D-number disposition table

Companion definition authority: pi-01 section A for D3, D5, D6 and D9; mw-01 defect ledger for the other D-numbers. D6 is contested ownership, not a silently shared bare label. The table is the audit section 6.1 table with the RA-07 dispositions applied.

| D | Ledger id, owner, severity as written | Content | Pi-side rows (consumption or guard for MW-owned items) | MW-side carrier (never a Pi bead) | Disposition | Open ruling |
|---|---|---|---|---|---|---|
| D1 | MW-I01, Mechanical P0 | classifier passes a frame unless `gate_passed === false`; gate definition and environment may be descriptor-only | R433, R434 (consume and validate the certificate; never strict from the domain arm), R437 (attainability), R446[G01, G03] | mw-03 H01; wb-1zn2 | COVERED as consumption | — |
| D2 | MW-I03, Mechanical P0 | clean HEAD + clean status classified not-occurred / retryPermitted | R443 (never consume that verdict), R420, R403, R447[G04, G05] | mw-03 H02; wb-1zn2 | COVERED as consumption | — |
| D3 | PI-I01, Pi P0 | admission digests the notes-stripped value; launchers read raw `params.input` | R391-R397, R449[G08] | — | COVERED | digest construction (R391) |
| D4 | MW-I05, Mechanical P1; Pi treats its exit as P0 (K015) | tarball re-hashed, installed files not checked before import | R421, R422 (Pi consumer-side manifest guard), R460, R449[G09] | mw-03 H03; wb-1zn2 | COVERED as consumption | severity ruling (K015) |
| D5 | PI-I02, Pi P0 | process-local lease released when the dispatch promise settles | R398-R404, R448, R464 | provider-entry fence check: mw-03 H06 | COVERED | lease ABI (R398) |
| D6 | PI-I03 (Pi wiring) and MW-I04 (host composition) under one number; README assigns it to Pi | registered tool is script-only; exported host call requires no binding, grant, source or lease | R405-R412 (Pi wiring), R423, R424, R426 (consume one composed export; never the legacy call), R461 | mw-03 H06; wb-1zn2 | OWNER-ROUTED through EAT-R469: one ruling proposed as two-part (Pi P04/P05 wiring + MW H06 composed host); ownership CONTESTED (K004) until that record exists | one owner ruling — proposed: two-part shared (RA-07) |
| D7 | MW-I02, Mechanical P0; README labels D7 'strict Forge proof' | settlement fed the locally re-measured tree and cached manifest hash | R435 (never substitute a local tree), R446[G02] | mw-03 H01 / H02; wb-1zn2 | COVERED as consumption | label ruling |
| D8 | MW-I06, Mechanical P1 | projection checks the candidate commit only, not all strict axes | R434 (every axis validated against the observed envelope; a partial certificate is never strict), R433 | mw-03 H01; wb-1zn2 | ROW EDIT: named in EAT-R434 Conditions (RA-07) | named in EAT-R434; no additional Pi obligation |
| D9 | PI-I04, Pi P0 | independent rechecks are not one atomic policy across async waits | R409, R410, R411, R427 c3, R449[P13, P14] | final check before the writer is the producer's (K034): mw-03 H06 | COVERED | — |
| D10 | MW-I07, Mechanical P2 | malformed descriptor dereferenced → TypeError instead of a typed refusal | R428 (any thrown producer fault on the typed fault channel, never an outcome), R419 c3 (unknown codes stay typed unknown); Pi's own descriptor shape check is EAT-R219 | mw-03 H04; wb-1zn2 | ROW EDIT: named in EAT-R428 Conditions (RA-07) | severity ruling owner-routed through EAT-R469; named in EAT-R428 |
| D11 | MW-I08, Mechanical P1 | packed host loads callbacks without proving SDK / executable identity or credentials | R425 (record identity, refuse runtime-unavailable), R465 (native-provider readiness axis), R431 (BLOCKED, never an imitation) | mw-03 H03 / H05; wb-1zn2 | ROW EDIT: named in EAT-R425 Conditions (RA-07) | severity ruling; SDK-pin owner (RA-15) |
| D12 | MW-I09, Mechanical P1 | SDK tool filters are not OS write isolation | R432 (containment wording), R406 (authority source out of the writer's reach) | none named: the companion states a trusted-host boundary; stronger containment is post-v1 | COVERED as wording obligation | — |

## RANGE-EXHAUSTED candidates and remaining filing conditions

No new requirement is allocated outside EAT-R391..R470. See CONSOLIDATION.md for the owner-routed table: the empirical EAT-R253 repair uses existing predecessor legs EAT-R213 / R214 / R253 plus R413, so it is not a new MII id. Clause-level splits are filing-time acceptance gate lines (RA-16), not new ids. RA-11..RA-22 are restated there as the owner's bead-filing checklist; each unperformed decision / external acquisition stays pending, never claimed complete.
