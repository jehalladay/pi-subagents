# 14 — Worked elastic-lane demonstration

## Baseline
Existing elastic-lanes fixture observes current Git head, ready candidates, active lanes, max lanes, restack candidates; proposes restack/land and additional lane where capacity and demand require. It is a deterministic fixture, not verified real git work.

## Numeric candidate
Use app-local projection ready_count, stale_count, available_capacity, recent_retry_pressure, with explicit evidence status/normalization. MP categorical policy chooses among hold, request-lane, prioritize-restack using *pre-declared eligible support*. Adapter maps choice to existing laneIntent/workIntent with exact expectedRevision and budget. A choice to request a lane is not a lane allocation until native receipt.

## Conflict toy
Two policies with distinct RNG streams (parallel() hands both one PolicyContext.seed, combinators.ts L53-66, so independence is caller-constructed) may both request one exclusive lane. Both claims conflict in current MW resolver; a lone claim is admitted only with fresh basis and budget headroom. Expected admitted = p1+p2-2p1p2; fully symmetric policy maximum .5 under this artificial independent one-step model. A shared exclusive selector or specialization can reach 1. Do not present as production throughput uplift.

## Developmental mutation
Split general recovery decision into merge-conflict and verifier-failure specialists under a versioned evidence classifier. Parent retains outward recovery-intent interface. A source absence UNKNOWN does not authorize selecting 'no failures'. Parameter semantic map transports applicable weights through an MP-owned transport API (TARGET; none at 9d51a8c6ed08) — MW emits only the named map; private memory resets except validated schema-compatible portion. Native requests/leases stay with original host.

## Evaluate
Compare the canonical baseline list of 10-training-experiments.md (Baselines). Matched heldout workload regimes; count validation costs, conflicts, p95 wait, stalled attempts, critical-path latency, native data evidence; publish only with explicit gate. A failed or neutral result is still valid research evidence.
