# Composable coordination policy algebra

Status: research/design extension, 2026-10-16. MechanicalWorkflows owns application composition, NOT a new workflow engine, scheduler, durable graph store or universal provider ABI.

## Fundamental type

A coordination policy is a typed transducer P:(observation, local_memory, policy_context) -> distribution over (proposed_intent, updated_memory, trace).

PolicyContext contains task/episode, actor, observation digest, budget, authority scope, policy revision and controlled random seed. A trainable policy must log actual selected action, behavior log probability, action mask and model checkpoint. A deterministic policy records a deterministic action but no invented log probability.

Intents have typed target, expected source revision, proposed effect, resource claim, evidence and conflict scope. No effect happens during policy evaluation.

## Composition operators

Sequential P ; Q: Q may observe P's validated pure output under a common pinned input basis.
Parallel P || Q: evaluate independently and collect proposals; reconcile cumulative resources, read/write interference and incompatible versions before authorizing any effect.
Guarded P ▷ Q: evaluate Q only when P provides a defined, accepted guard.
Alternative P ⊕ Q: select one policy using a declared and versioned selector; selection itself can be trained and must be logged.
Inhibit P -| Q: accepted evidence-based inhibition can suppress Q's proposed action, but never override externally required security or verification.
Repeated P*: a bounded reactive option with explicit initiation, continuation, termination, hysteresis and nonquiescence result.

Composition is typed by observation/intent ports. Only pure payload composition enjoys ordinary identity and associativity without additional conditions. Do not assert effect commutativity in the presence of shared resources, dynamic external state or version drift.

## Resolver contract

Resolve proposals against:
1. exact observation and Git/task basis;
2. subject and policy revisions;
3. protected actor/task/global mutation scopes;
4. read/write dependencies and unknown dynamic effects;
5. aggregate compute, worker, queue and latency budget;
6. native execution authorization;
7. native independent verification for any irreversible landing.

Resolution returns admitted intents, rejected intents with stable diagnostics, explicit unresolved conflicts and a signed/version-bound receipt where supported. Furnace or native app clients execute admitted commands; MechanicalWorkflows does not secretly replace their supervisor.

## Cross-tool owners

ReactiveFiber/FiberOptics own reactive context and dependency projection. HyperUnix supplies typed environmental topology and completeness. Beads owns claims and task readiness. Furnace owns Attempts and process execution. Forge owns verification truth. Training owns RL. Future TrailCLI and QuorumCLI are separate optional read/decision providers, not dependencies of the pure composition library.

## Superorganism mechanism mapping

- Pheromone recruitment: consume optional typed signal as attention-only input.
- Ant response thresholds: demand sensing plus skill/cost-aware allocation.
- Bee quorum: consume a candidate-bound evidence assessment; committing still needs authority.
- Trophallaxis: transfer role-specific compiled context, keeping source and omission provenance.
- Social immunity: reject or quarantine untrusted observations and inconsistent evidence at native boundaries.
- Living bridge: dynamically allocate workers to infrastructure versus implementation.
- Worker policing: enforce independent verification and protected scopes, not trained morality.
- Colony budding: copy immutable policy manifests, not live authority grants.

## Acceptance

Reference tests cover type mismatches, missing provider, copied evidence, resource conflicts, stale basis, nonquiescence, deterministic replay and scope violations. Comparative tests prove value beyond a fixed baseline on held-out tasks before promoting a trained composition.
