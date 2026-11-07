# PI-BM — local architecture and contracts

## Target topology
### PI-BM-A1
Implement registered workflow_execute function mode (not a parallel helper) with descriptor identity, packed artifact SHA, exact import/export path, host actor and grants. Preflight all compatibility and allowlists BEFORE loading executable modules.

### PI-BM-A2
Define first supported versioned evidenceProfile/contextProfile for a Git source census and plain context, while keeping HX, RF, Furnace, Claude optional and negotiated; use no false source/gate equivalences.

### PI-BM-A3
Propagate and enforce effective permissions/grants on detached Claude invocations, and bind selected provider/model/skill versions and clean workspace to exact invocation receipt.

### PI-BM-A4
Implement cancellation, timeout, lost reply and restart recovery that preserve dirty worktrees and leave committed effects visible; no force-clean after failed backup and no blind replay.

### PI-BM-A5
Keep script-mode compatibility; instrument session liveness and resource pressure separately from committed code/gate results and independent Beads claims.


## Required correctness properties
1. Bind every task, model, provider, file descriptor, source and runtime effect to actual committed/installed provenance. No semantic drift between preview, direct-call, script, and registered function.
2. An effect and its acknowledgment are different events. After timeout, read back durable state before retry; never discard a dirty worktree to make a cleanup routine appear successful.
3. Host authority remains outside the compositional package: Beads controls claims, Forge controls gate verdicts, Furnace controls Runs, and the chosen host controls authorized effects.
4. Missing, partial, denied, stale, interrupted, or never-executed state is neither passed nor failed code; preserve uncertainty.
5. One positive test does not certify a cross-host integration. Require independent real package and consumer receipts, negative mutants, and complete local gate.
6. Generated skill pages must follow their owner and provenance generator, with runnable verbs validated against installed revisions.

## Design review before implementation
Audit current code, installed package, branch, observed run and existing local programs. Choose exact API/ABI names only with the owner and a versioned contract. Identify what is already shipped, a fixture or a proposed adapter; do not copy a design-only command into the installed skill. Define backpressure, cost and rollback independently of a successful build.

## Alternatives excluded
No second workflow scheduler, mandatory package imports, unsafe automatic promotion, or success-equivalence between a cached preview and a durable producer receipt.
