# QA, mathematical tests and acceptance — Composable Coordination Harnesses and Colony Experiments

## Required test matrix

| Layer | Fixture | Acceptance |
|---|---|---|
| Unit | Policy algebra and incompatible writes | Conflict is explicit; no unintended effects or undisclosed tie breakers. |
| Conformance | Real Forge failure, dirty candidate, unknown HX coverage | All remain failure/unknown; cannot be promoted to PASS. |
| Replay | Recorded multi-worker restarts | State hashes and intent sequences agree for seeded deterministic policies. |
| Load | Queue with elastic landing lanes and moving Git head | No starvation and no unbounded queue under capacity-feasible scenario. |
| Adversarial | Quorum signal flooding, stale basis and corrupted context | No unsafe authorization or fake independence. |

## Failure / threat register

| Risk | Required mitigation |
|---|---|
| Framework creep | Keep generic library smaller than domain app; no universal agent/tool ABI or scheduler. |
| Synthetic success confusion | Output records label simulator, replay and live provenance and forbid mode upgrades. |
| Live side effects | Require isolated workspace, explicit opt-in and scoped capabilities. |
| Nonstationarity | Pin agent/version/seed and compare within matched task batches. |

## Evaluation protocol

- Use a clean, pinned task basis, randomized/matched rollout seeds and identical compute/cost caps for baseline/treatment.
- Compare success, completed verified work, total tokens/compute, queue latency, transfer across worker restart, misleading-signal rate, false positive evidence independence, and p95 processing time where relevant.
- Include all-zero/all-one terminal reward groups, corrupt claims, agent exit, partial HX scope, stale Forge gate, unavailable Trail/Quorum, and concurrent mutation conflicts.
- Distinguish deterministic simulation, replayed event fixture, and isolated real executable validation in receipts and final reports.
- Require an independent authority for the final outcome. No policy may reward itself by incrementing its own signal or counting its own vote repeatedly.
- Use the repository's current local Forge/test gates; do not add GitHub CI as a prerequisite.

## Exit report template

Record commit SHA, scenario IDs and seeds, configured models/checkpoints, native environment revisions, expected vs observed evidence, baseline and candidate results with confidence bounds where statistical, failed cases, profiler data, and residual risks. Mark the milestone incomplete when a required live witness or authority check is unavailable. Documentation publication alone does not satisfy implementation acceptance.
