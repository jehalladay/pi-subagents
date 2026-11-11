# 10 — Learning, credit and experimental harness

## Objectives
Verified dependency-weighted completion per compute, bounded p95 queue age and cost, conflict/refusal rate, recovery latency, fairness, switching overhead, and graph verification effort. Constraint violations are not traded for reward.

## Policy-gradient correctness
Once APO-006/007 sidecars exist: under a fixed sampled action support and behavior checkpoint, policy score can receive a delayed collective return using score-function gradients; the post-resolver outcome does not define the original distribution. In a finite toy, two independent claim probabilities p1,p2 and reject-both conflict yield J=p1+p2-2p1*p2; gradient dJ/dpi=1-2pother. Exact reference table and Monte Carlo estimator must agree within statistical uncertainty. Shared random variables and selectors must be represented explicitly. CURRENT exports carry logProb unknown and no support, so no estimate may be computed from them.

## Credit hierarchy
Reference exact enumeration -> one-step REINFORCE -> multi-step actor-specific return -> critic learned under heldout prediction -> factorized interaction critic with complete causal closure -> controlled artifact removal/replacement. Lineage from producer to consumer is dependency evidence, not causal proof. Replay cannot generate unseen counterfactual effects. RNN BPTT unsupported in M0/M1 policy actor contract.

## Five episode-exported families at 19ca8d4
landing-queue, compaction-inheritance, colony-resilience, artifact-recovery, quorum-evidence; the elastic-lanes runner (mw.landing-queue.elastic.fixture.v1) has no toEpisode/training-export path yet (TARGET). Keep fixtures/source receipts separate from real native verdicts. Use workload-family holdouts, task difficulty bins, changing head revision, flaky gates, interruptions, incomplete evidence and resource spikes.

## Baselines
Fixed FIFO, restack-first, installed elastic-lane heuristic, exact small oracle, greedy compatible-subset selector, parameter-tuned deterministic rule, learned residual, structurally specialized parent/child. Compare matched external event streams and cost of training/search and promotion. Do not let structurally evolved candidates train/test on the same seeds.
