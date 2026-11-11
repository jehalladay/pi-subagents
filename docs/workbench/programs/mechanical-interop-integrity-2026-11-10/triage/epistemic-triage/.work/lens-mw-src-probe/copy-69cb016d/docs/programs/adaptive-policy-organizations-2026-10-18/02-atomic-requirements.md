# 02 — Atomic requirements and traceable acceptance

Status labels: CURRENT existing behavior; TARGET new functionality; INTEGRATION external witness required. Requirement IDs APO-001 onwards.

| ID | Requirement | Gate |
|---|---|---|
| APO-001 CURRENT | Keep pure synchronous Policy.propose and current combinator meaning | deterministic fixture parity |
| APO-002 CURRENT | Retain reconcile's stale/protected/write-read/budget rejection; no effect execution | regression + refusal tests |
| APO-003 TARGET | Validate graph manifest node kinds, typed ports and valid implementation references | schema + negative fixtures |
| APO-004 TARGET | Reject instantaneous cycles; require explicit delayed boundary with memory via a TARGET delayed-edge operator with declared bounded memory (none exists in combinators.ts) | cycle negative tests |
| APO-005 TARGET | Support direct in-process and precomputed immutable numeric-decision adapter | basis/replay parity |
| APO-006 TARGET | Record pre-sample support independently of resolver admission | impossible mask replay rejected |
| APO-007 TARGET | Log per-node stochastic choice, RNG stream, behavior log-prob and checkpoint (CURRENT: only EpisodeDecision.logProb exists and episode.ts L181 always writes unknown; no support, RNG stream or per-node choice is recorded) | finite exact-likelihood oracle |
| APO-008 TARGET | Preserve one sample on fan-out; resampling requires explicit new sample identity | correlation negative fixture |
| APO-009 TARGET | Produce additive per-decision sidecar; do not overload TraceEvent.detail | old episode import parity |
| APO-010 TARGET | Bind each decision to observation and source revision witnesses | stale refusal |
| APO-011 TARGET | Certificate references name assumptions, full dependency footprint and model version | invalidation test |
| APO-012 TARGET | Permit consumer-relative exact/probabilistic interface views; uncertain values stay uncertain | three-state lane oracle |
| APO-013 TARGET | Produce typed rewrite candidates with DPO-style dangling checks for v1 fragment | rewrite property tests |
| APO-014 TARGET | Classify exact refactors separately from behavior-changing adaptation | promotion refuses missing gate |
| APO-015 TARGET | State/parameter inheritance is explicit, content-addressed and CAS guarded | active lease not copied |
| APO-016 TARGET | Mutation invalidates dependent assurance certificates and required runtime plans | dependency negative control |
| APO-017 TARGET | Separate pending proposal, admission, native receipt, final verification and learning evidence (vacuous at 19ca8d4: every episode is mode fixture; labelEpisodeMode refuses upgrades) | never fabricate PASS |
| APO-018 TARGET | Define bounded resource, evidence and timing contract per module | global capacity negative test |
| APO-019 TARGET | Compare the canonical baseline list of 10-training-experiments.md (Baselines) on heldout seeds | experiment report |
| APO-020 TARGET | Expose read-only operator and mutation trace/why-not views | snapshot not actuation |
| APO-021 INTEGRATION | Verify optional MP bridge against currently installed SDK contract | pinned schema+behavior tests |
| APO-022 INTEGRATION | Real Forge/Furnace/Beads/Reactive sources remain independent native authorities | scratch native receipts |
| APO-023 TARGET | Never promote a candidate with invalid/unproven required guarantees | gate-negative test |
| APO-024 TARGET | Reject incompatible/missing/unknown evidence, nonfinite numbers, stale graph/checkpoints | adversarial corpus |
| APO-025 TARGET | Release every new emitted error code with a matching test or justified guard registry row | Forge evidence step |
| APO-026 TARGET | No new runtime requirement on Library or remote services; offline deterministic mode available | package dependency audit |

## Acceptance hygiene
Proposed contract schema is not a shipped method. Every TARGET becomes CURRENT only after committed source tests plus source revision evidence. Every INTEGRATION requires real owner-specific receipts; fixtures alone cannot close it.
