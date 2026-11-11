# Development plan — Composable Coordination Harnesses and Colony Experiments

## Ordering and checkpoints

| Milestone | Deliverable | Required exit evidence |
|---|---|---|
| M0 | Small pure contract + two deterministic policies in a landing-queue fixture | No external services; semantic tests of conflicts and budget. |
| M1 | Five seeded fixture environments and emitted episode format | Reproduce merge bottleneck, corrupted summary, correlated votes and worker crash. |
| M2 | Read-only live/native adapters + one authorized Forge verification flow | Bounded witnessed journey and exact native evidence retention. |
| M3 | Policy learning hooks, off-policy export and comparative evaluations | Fixed vs learned vs composition-selected metrics on held-out fixture+live tasks. |

## Implementation procedure

1. Inspect the actual main-branch code paths, existing accepted decisions, public SDK exports, and Forge-compatible package gates. Record deviations from this proposal as amendments; do not bypass existing normative contracts.
2. Implement one vertical slice at a time: typed schema and fixture first, then deterministic semantics, then native observations, then trainable/evolutionary algorithms.
3. Emit machine-readable evidence for each slice, including source revision, configured environment, native tool receipts, tested failure cases, and unresolved limitations.
4. Keep app/harness-specific adapters out of pure semantic cores. Do not create a general platform from a single use case.
5. Benchmark the baseline versus each new feature on equivalent tasks and budgets. Stop or revert if it regresses safety, reliability or cost-adjusted results.
6. Publish user/developer documentation and executable examples only after live behavior is witnessed; label fixtures explicitly.

## Deferred work

- Create standalone TrailCLI and QuorumCLI repositories and their implementation plans only in the next user-approved round.
- Do not advertise end-to-end swarm RL, full context sharing, or distributed consensus merely from this design corpus.

## Sequencing dependencies

The default first integration route is **MechanicalWorkflows deterministic harness -> MechanicalFiberRuntime reference semantics -> native Forge/Furnace/Beads/RF/HX adapters -> training ingestion -> learned policy optimization**. Repository teams can advance independent pure components concurrently, but native/witness claims require each upstream interface to be demonstrated.
