# 02 — Pi implementation packets: actual registered Mechanical function hosting

**State:** planned; no native Pi→Mechanical function execution is claimed by this document. **Audit pins:** Pi 8e2fedeb / MW 62a10b59. **Ownership:** Pi runtime/host/observation; Mechanical package and callbacks owned by the producer. **Existing requirement lineage:** EAT-R001..R* and the November 4 25-group BEAD-PLAN; Pi W11/VC-3; B-preserve, B-detached-grants, B-cancel-repro, B-contract-choice, B-descriptor, B-authority, B-source, B-replay, B-dispatch, B-outcomes, B-observe, B-effects, B-controls, B-git-census and B-release. Reconcile with **actual** Beads issues, do not mint fictional IDs.

## Program controls

Every packet begins by reading implicated full source and tests, current source+branch tips, Beads status, versioned producer package and feedback. Write a red **consumer-visible** behavior test and an adversarial mutant, make the minimal change, run affected test suites and the appropriate Forge complete gate, then update `README.md`, `docs/workbench/*` / W11, `.agents/skills/pi-mechanical-interop/SKILL.md`, operator examples and per-bead receipt in that same code cut. Never claim live from a stub, one code grep, direct Mechanical method or an unmerged machine seat.

No GitHub CI/PRs for this program. Preserve Pi upstream script and subagent behavior and Fork-specific conventions. Never modify old `TRACEABILITY.md` as a scratch receipt ledger. Keep low-collision per-packet source/tests/receipts and re-review exact merged trees after concurrent landings.

## Dependency graph

~~~text
P00 current sources/ABI ruling
   ├─ P01 preserve present safety fixes
   ├─ P02 exact descriptor/package consumer ─────┐
   ├─ P03 function auth + source admission ──────┤
   └─ Mechanical M01–M04 stable installed host ───┤
                                                  ▼
                                        P04 registered function
                                                  │
                                ┌─────────────────┴────────────────┐
                                ▼                                  ▼
                        P05 observation                       P06 lifecycle
                                └─────────────────┬────────────────┘
                                                  ▼
                                      P07 joined native journey
                                                  ▼
                               P08 / P09 / P10 mandatory QA tail
                                                  │
                                    P11 optional detached/Furnace
                                    P12 optional HX/RF/coordination
~~~

P02/P03 and producer M01–M04 can work concurrently; P04 needs their ratified exact API. P07 does **not** allow W11 graduation until P08–P10 are complete.

### P00 — Re-pin, reconcile open work and jointly adopt ABI (P0)

- **Read:** `src/workbench/execute*.ts`, `mechanical-descriptor.ts`, `function-authority.ts`, `source-admission.ts`, `src/index.ts`, `src/workbench/hosts/local-detached.ts`, Mechanical host/descriptor and current W11/Beads/feedback. Inspect `workbench/implementation-program` versus `master` before editing; distinguish merged, machine-only, historical and proposed.
- **Decide with Mechanical:** stable `mechanical.pi-host/v1`, exact descriptor/host artifact, independent definition/descriptor/tarball hashes, `hostMode` transport, host-owned evidence/context profiles, effective principal and grants, result/cancel/reconcile semantics and compatibility policy. Proposed grant `mechanical:develop-write` (single colon, syntactically representable) is *not deployed* until adopted in producer+consumer tests.
- **Produce:** conformance fixtures and a status ledger that classifies each historical EAT requirement (already implemented/tested, partial/inert, or blocked). Retain old identifiers and audit sources; do not create a second Beads namespace or claim 25 groups complete.
- **Gate:** incompatible producer manifest or unsettled grant freezes effectful dispatch. Positive and negative joint schema tests must pass before P04.

### P01 — Consolidate resolved safety foundations (P0, independent)

- **Edit only if failing:** `src/worktree.ts`, `src/workbench/claude-host.ts`, `src/index.ts`, `test/worktree.test.ts`, `test/workbench-detached-grants.test.ts`, targeted abort tests.
- **Preserve already implemented:** `WorktreePreservationFailedResult` with original bytes/path, both registered detached Claude grant producers, post-`beforeDispatch` run-abort recheck. Avoid reintroducing old defects while implementing a new function path.
- **Expand falsifiers:** process kill after partial git commit, untracked plus tracked bytes; per-agent skip after async startup (separate from run abort); grants revoked during parked admission; final write call never launches with stale principal.
- **Exit:** exact failed-case matrix and receipt. A source repair with test only remains component-level, not the full Mechanical route.

### P02 — Actual producer descriptor and installed package admission (P0; P00 + Mechanical M01)

- **Edit:** `src/workbench/mechanical-descriptor.ts`, new narrow bridge under `src/workbench/hosts/` or selected exact module, `test/workbench-mechanical-descriptor.test.ts`, independent packed-consumer tests.
- **Build on existing:** closed descriptor schema, allowlist and digest reader. Consume the **actual committed producer** descriptor and packed rig/lib from a fresh external installation; the Pi vendored test fixture is not sufficient for release.
- **Check:** Pi definition digest, descriptor SHA, schema refs and file bytes, exact tarball SHA, package name/export/version/runtime closure, canonical root and authorized artifact trust policy before dynamic import. No arbitrary `input.module`, `input.package`, URL, shell string or effect-grant in JSON. Avoid reliance on Mechanical checkout or floating `node_modules` identity.
- **Tests:** producer changed one byte, stale fixture, unknown export, malicious path/symlink, added descriptor field, duplicate descriptor text key, absent schemas, digest correct but installed file wrong, two simultaneous install attempts. Every rejected item has **zero** user loader calls, writer calls and Forge dispatches.
- **Exit:** independently installed `PI-MECHANICAL-ARTIFACT` L2, producer+consumer versions/pins, proof of actual host export, no fake release readiness.

### P03 — Exact function authority and writer source admission (P0; P00, parallel P02)

- **Edit:** `src/workbench/function-authority.ts`, `source-admission.ts`, associated focused tests, `src/index.ts` host-owned configuration binding.
- **Adopt action grant:** only the mechanically ratified one-colon spelling, no prefix/wildcard, not `workbench:`. Hold `workbench:execute` and exact action; detached additionally `workbench:detach`; independent `claude:invoke` and tool rights at SDK edge. Never source grant from model policy or a saved descriptor.
- **Preserve existing:** final-boundary rights and principal/session reads, deny unknown permission shape, canonical authorized source root, Git/status/gate manifest basis, attestation, lease and post-await remeasurement. Integrate into one effectful dispatch chain with **no await between final grant decision and one dispatch**.
- **Test:** revoked grant after queuing, changed session, sibling workspace, malformed principal, input-forged grant, bad raw Git identity, staged/untracked/renamed/unmerged/submodule, gate manifest changed, two writers on same canonical root and a symlinked alias. Every failure is before import/effect; positive control reaches one dispatch.
- **Exit:** host-authorized, source-measured dispatch function ready for P04; unit red/green and mutants alone do not prove registered path.

### P04 — Registered `workflow_execute(function)` branch (P0; P02/P03 + Mechanical M01–M04)

- **Edit:** `src/workbench/execute-tool.ts`, `src/index.ts`, optionally `src/workbench/execute.ts`, narrow Mechanical adapter in `src/workbench/hosts/`, tool registration tests. Keep `script` unchanged; leave unsupported `furnace-formula` explicit.
- **Implement:** allowlist only exact reviewed Mechanical descriptor/export. Resolve saved source and independent artifact pin; run final authority and source writer admission; call installed producer host; mint Pi logical invocation ID; persist launch intention; schedule first-class function execution asynchronously and return `completion:not-asserted` and provider-qualified refs. Register function state in the existing Workbench task/observation store, **not** a parallel hidden task table.
- **Acceptance:** actual registered tool object called with `kind:function` executes one injected installed host in L2 integration, returns one logical invocation and native ref, observe finds it. All script fixtures, tool names and reply dialect remain byte/behavior compatible where required. Invalid definition/permissions/source never enter producer.
- **Gate:** `PI-FUNCTION-REGISTERED` is a real registered-path controlled test, not a stub typed helper; still not native real Claude/Forge until P07.

### P05 — Original Mechanical domain and source/gate observation (P0; P04)

- **Edit:** `src/workbench/observation.ts`, observe/control tool, inspector/card/GUI only as necessary, `src/workbench/tool-replies.ts`, native ref projection, tests.
- **Project separately:** launch/admission, execution status, original Mechanical `DevelopmentOutcome`, native Forge verdict/operation and complete gate selection, source commit/tree/freshness, effect disposition and provider-qualified refs. Preserve missing fields and unknown explicitly; never coerce `needs_evidence` or `indeterminate` into failure, or `verification_failed` into transport error.
- **Tests:** four original outcome payloads through the actual registered route; native PASS mismatched tree, partial gate, transport exit 0 with native FAIL, stale tree after PASS, missing agent session and observer cursor gap. Model-facing output bounded; operator can open exact invocation after background completion.
- **Exit:** current stage, candidate, gate, error/unknown and native refs inspectable through `workflow_observe` and one supported UI surface. The function must remain addressable if the initiating Pi turn finishes.

### P06 — Controls, journal and uncertain-effect reconciliation (P0; P04/P05)

- **Edit:** `src/workflow/journal.ts`, `runtime.ts`, `reconcile.ts` or narrow function journal integration; `src/workbench/claude-host.ts`, `source-admission.ts`, observer/control tool and tests.
- **Implement:** durable local intent before writer, claim or gate dispatch; settled native refs afterward; reconcile with Git/Forge native readback on lost ack, cancel or process death. Reuse Mechanical typed `DevelopmentAbortedAfterDispatchError`, `DevelopmentLostAcknowledgementError` semantics; preserve dirty work and source identity without creating duplicate task scheduling authority.
- **Controls:** stop requested before dispatch prevents any SDK session; stop after dispatch is not rollback. Late candidate/gate evidence must stay visible. Revoke write admission and stop before outstanding async barrier; in-flight effects become uncertain until native reconciliation. No blind retries under journal replay or host restart.
- **Tests:** parked startup + per-agent skip, during-edit abort, after commit before ack, gate sent but reply lost, restored Pi session, duplicate events/cancels, host process killed and reattached. A failed preservation commit never invokes destructive cleanup; effect counts stay <=1 unless an explicitly new authorized invocation is created after native not-occurred evidence.
- **Exit:** traceable controls and conservative restart/unknown path, with operator actions and non-replay guaranteed for the tested fault matrix.

### P07 — First genuine cross-repository live journey (P0; P04–P06 + Mechanical M05/M06)

- **Execute:** instantiate real Pi registered `workflow_execute(kind:function)`, exact independently packed Mechanical host, isolated scratch Forge package, `git-census-v1` and `plain-v1`; one genuine native Claude SDK writer produces changed clean commit/tree; native Forge full gate binds that candidate; Pi `workflow_observe` returns original domain and refs.
- **Native variation:** one true PASS, one native FAIL, one unknown/partial/dirty refusal. No fixture/proxy result counts as native. Include exactly pinned versions, SDK session, Pi logical invocation, Mechanical domain, gate operation ID/selection and source tree.
- **Gate:** joined `PI-GIT-CENSUS-LIVE` and `MW-PI-NATIVE-LIVE` receipts. If credentials/binaries unavailable record blocked, not an imitation pass.
- **Exit:** function hosting demonstrably works for a real provider. **Still enter P08–P10** before declaring release.

## Mandatory test- and verification-focused tail (P0)

### P08 — Exhaustive adversarial admission, semantics and mutant qualification (P0; P07)

Implement/run the full [verification matrix](03-VERIFICATION-AND-RELEASE.md) through the actual registered tools and installed producer: descriptor/tarball/definition pins, permission and identity, source status and time-of-check, all four original outcomes, Forge complete selection and source join, model policy forgery, stale skill/SDK, failing controls. Test-level mutants must fail when their claimed property is removed, with positive controls to detect false-deny systems. Require no import/effect for pre-admission failures and precise post-dispatch uncertainty.

### P09 — Crash/recovery, detached negative controls and host-wide resource load (P0; P07/P08)

Exercise abort, late SDK result, failed git commit preservation, journal replay after lost ack, restart with unknown native operation, two overlapping writers, operator inspection after Pi turn/process exit and dropped event cursor. Workload test 1/4/16 concurrent isolated read-only/fixture calls and a safely bounded larger tier if practical. Measure queues, RSS/FD/CPU, elapsed install/import/admission, p50/p95 observation delay, event drops, native provider latency and total token cost. Gate numerical budgets from current measured baseline and published operator requirements, not invented numbers.

### P10 — Release proof, script regression, agent LX and W11 status (P0; P08/P09)

Run full clean Pi Forge build, `npm run check`/packaged smoke, Mechanical Forge root/member gate and independently installed consumer on **the final merged source trees**. Run standard Pi script workflow golden fixtures, standalone Agent and detached Claude paths alongside registered Mechanical; no regressions or dual tool name collisions. Validate Workbench inspector/footer/help and ten agent operator scenarios from local skill/README alone. Update W11 only after the joined producer/native receipt and release validator passes; keep older feature-matrix notes historical and add dated current evidence. Do not edit a census list to fake a passing test. Commit skill/readme and accurate operator commands with implementation in the same cut.

## Optional follow-on programs (not blockers for first Git/plain W11)

### P11 — Detached function and Furnace-owned native Attempt (P2)
Extend actual reviewed Mechanical function to the same-machine detached host with immutable source/artifact/config pins and reattach; validate `claude:invoke`/tool grants. Then optionally attach a Furnace ExecutorApp/Run/Work/Attempt; Furnace decides scheduling, retries, pause/stop, not Pi. Test child kill, lost start ack, controller liveness, native Attempt duplicate prevention and no phantom `ensure` API.

### P12 — HX/RF high-evidence profiles and pure coordination (P2, upstream gated)
Enable host-selected certified HX scope only after native task/revision/query/coverage proof; `rf-committed-v1` only after real render ID/model/graph/source/budget/actor and replay identity, never Pi `--no-commit` preview. Add separately allowlisted read-only Mechanical coordination function, schema-pinned and no power to claim/close Beads or pass Forge gate by its score.

## Engineer/agent packet template

Each packet receipt must name current Pi and Mechanical commit/tree; real Beads ID and upstream requirement rows; precise edited source/test/docs paths; red test and specific negative mutant; behavior after implementation; relevant script/other mode regressions; focused and full Forge gate command/version/outcome; independent packed-artifact state; native producer IDs if actually observed; all untested unknowns; updated skill/operator examples. Do not close a requested proof using docs or source-test existence alone. A failed external SDK is a typed blocker with one smallest reproducer and owner, not reason to invent a local stub.

See [03](03-VERIFICATION-AND-RELEASE.md) for the mandatory release-tail oracles. Every P08–P10 task is part of the first native interoperability delivery rather than postponed operational polish.
