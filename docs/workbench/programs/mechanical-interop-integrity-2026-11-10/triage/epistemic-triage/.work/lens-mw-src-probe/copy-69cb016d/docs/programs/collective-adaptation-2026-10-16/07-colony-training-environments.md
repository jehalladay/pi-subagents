# Colony coordination harness environments

Status: proposed design, 2026-10-16. Existing bounded development rig remains the first real integration path; full distributed swarms are not yet validated.

## Modes

Simulated: deterministic world with seeded stochastic arrivals and oracle verifier.
Replayed: captured native observation/effect tape; no irreversible effects re-executed.
Isolated live: explicit opt-in scratch Git/Beads/Furnace/Forge/RF/HX environment with native receipts and basis-aware verification.

All three share an episode/event schema but MUST preserve their mode label. Simulator PASS is not Forge PASS. A mock HyperUnix complete result does not erase a real provider's partial coverage.

## Five environment families

1. Elastic landing queues: six+ implementation workers, changing branch head, merge conflicts, costly Forge gate, elastic integrator lanes, interruptions. Actions: allocate, reserve, rebase/reverify request, pause, route. Rewards: verified dependency-weighted progress minus latency/compute/invalid landings. Include fixed-lane and FIFO baselines.
2. Compaction inheritance: workers are forcibly replaced and only selected summaries/tests/artifacts persist. Actions: compact, annotate, persist, route, omit. Reward is downstream task success and cost, with source-provenance validity.
3. Distributed quorum: several candidate patches and correlated reviewing agents; evidence arrives at a price. Actions: inspect, independently test, challenge, abstain, commit. Penalty for false positive acceptance and uncalibrated confident choice. Quorum cannot bypass native gate.
4. Artifact recovery: producer fails after meaningful partial work; successor continues from snapshot with or without producer document/test. Randomized interventions estimate artifact value with adaptive downstream behavior.
5. Colony resilience: kill workers, poison nonauthoritative signals, stale native receipts, deny graph mutation, exhaust resources. Optimize recovery without permitting unsafe effects.

## Episode export

Record episode ID, task basis and task family, policy configuration hash, worker roles and checkpoints, each sampled decision and actual log probability if available, read-set/provenance, artifact creation and consumption, attempt lineage, cost/clock, verifier receipt, and control/treatment IDs. Unknown values must remain explicit. Sanitize credentials and private context before training materialization.

## Algorithm ladder

A: fixed deterministic heuristic policies.
B: terminal GRPO/PPO policies with an on-policy eligibility mask.
C: local step/milestone critics with artifact dependency features.
D: matched causal artifact removal/replacement interventions.
E: evolutionary selection among typed coordination configurations while keeping safety/verifier semantics fixed.

Test each rung separately; do not simultaneously learn depositor, consumer, quorum and allocator without isolated ablations.

## Measurement and release

Primary metric: validated completion on held-out tasks per compute budget. Secondary: queue age, p95 elapsed, cost, rediscovery rate, artifact marginal effect, wrong-signal propagation, correlation-adjusted calibration and worker crash recovery. Include all-success/all-fail groups, stale checkpoint, reward hacking and test flakiness. Report confidence intervals for statistical estimates; no uplift claim from a single anecdote.

## Deferred packages

TrailCLI and QuorumCLI remain uncreated. Their own detailed implementation programs belong in their future repos. This harness may define optional adapter interfaces and test fakes, but cannot claim either service was invoked.
