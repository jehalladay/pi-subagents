# 04 — Architecture and source-of-truth boundaries

## Dataflow
Furnace/Beads/Forge/Git plus other native receipts -> application adapters -> ReactiveFiber or directly pinned evidence/observation projection -> optional MicroPolicy in-process/local worker -> immutable DecisionSidecar -> existing MW pure policy and combinators -> existing reconcile -> native effect clients -> verified receipts -> app-level outcome/credit materializer -> MP numerical trainer -> candidate checkpoint. Graph rewrite system is an *offline pure candidate producer*, not part of dispatch hot loop.

## Package placement
Keep types, combinators, resolver and deterministic fixtures in existing packages/coordination. Place optional graph manifest validator/compiler and candidate-rewrite helpers beside coordination, not in the general develop() public API until installed consumers prove need. An optional MP adapter is edge code using MP public SDK; never make MW core load Handwired. Existing apps/rig remains optional native integration boundary.

## Separate authoritative stores
MW can write experiment artifacts and pure manifests as an application concern, but does not introduce a new durable workflow store. MicroPolicy owns checkpoint and local feedback journal. RF graph overlays have independent trust scopes. Git branches and Beads tasks are not cloned into organizational graph state. Native execution receipts are referenced by exact revision/digest.

## Trust zones
Learned scores, policy rewrites, training collectors and simulator/verifier predictions are untrusted advisory values. Hard checks include protected scopes, budget and native gate requirements. User-defined collector code executes only under an explicit trusted process boundary. No effectful callback in render or pure policy evaluation.

## Failure handling
Unavailable numerical evaluator -> deterministic fallback (= a pre-declared policy id@revision recorded as decisionSource fallback, used only for evaluator unavailability; never a resample) or explicit unknown, never implicit zero; mismatched basis -> reject/reproject; stale checkpoint -> refuse sampled replay; insufficient evidence -> pending/unknown; source inconsistency -> quarantine; rewrite migration failure -> leave old graph active; native crash -> consult native receipt/idempotency before retry.
