# Atomic requirements — Composable Coordination Harnesses and Colony Experiments

## Inputs and outputs

**Input:** Task/basis snapshot, bounded read adapters, policy manifests, resource budgets and seed, versioned external receipts.

**Output:** Typed intent proposals, conformance diagnostics, policy/episode events and multi-objective held-out experiment results.

## Requirements and witness criteria

| ID | Requirement | Minimal witness |
|---|---|---|
| MWCOL-001 | Introduce pure typed policy ports observe/propose/reconcile without effects in evaluation. | No policy may write files, launch workers or publish state in pure evaluation. |
| MWCOL-002 | Provide sequential, parallel, guard, alternative and veto composition only where semantics are testable. | Conflicting parallel intents are refused or resolved, not silently both committed. |
| MWCOL-003 | Supply deterministic simulations for queues, artifact inheritance, quorum acquisition and failure injection. | Each fixture has seed, state hash, event history and independent oracle. |
| MWCOL-004 | Add replay adapter and isolated live adapters to existing native SDKs. | Fixture results cannot be labeled live verified; preserve unknown/incomplete external evidence. |
| MWCOL-005 | Export complete multi-actor episodes suitable for training without claiming RL ownership. | Actions include checkpoint, sampling support, masks, receipts and provenance. |
| MWCOL-006 | Keep TrailCLI and QuorumCLI as OPTIONAL future peer adapters, not created here. | Stub descriptors are bounded schemas and fixture fakes, no fake binary invocation. |
| MWCOL-007 | Support cross-episode artifact/worker continuity experiments. | One failed attempt can leave an artifact used by a later passing worker. |
| MWCOL-008 | Train/evaluate against fixed, learned and evolved coordination configurations. | Hold-out tasks and budget normalization prevent incidental advantages. |

## Nonfunctional constraints

- Every action and evidence object carries identity, version, scope, actor and provenance; do not infer independent support from repeated claims.
- Verifier results are bound to exact input basis; UNKNOWN, PARTIAL and unavailable remain distinct from FAIL and PASS.
- Replay must preserve stochastic seeds, time inputs and external receipts; never rerun an effect in a read-only replay.
- Training-policy alternatives may change, but authorization, privacy and verifier authority cannot be mutated by the learner.
- No dependence on the Library repo or mandatory GitHub CI; use each package's documented local/Forge gate.

## Out-of-scope boundary

a new engine, global scheduler, event database, inference provider, task tracker, or replacement for Furnace/Beads/RF/Forge. Future Trail/Quorum standalone repositories are deliberately deferred.
