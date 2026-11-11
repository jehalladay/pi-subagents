# Ecosystem implementation index — collective adaptation

Date: 2026-10-16. Status: designs committed, runtimes not claimed implemented.

## Program map

| Repository / developer program | Branch | Distinct ownership |
|---|---|---|
| [training](https://github.com/jehalladay/training/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | RL actor/critic, multilevel selection, causal replay and policy fitness |
| [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Policy composition contract and five controlled environments |
| [MechanicalFiberRuntime](https://github.com/jehalladay/MechanicalFiberRuntime/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Reference semantics, authority-separated intent/effect lifecycle |
| [ReactiveFiberCLI](https://github.com/jehalladay/ReactiveFiberCLI/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Role-scoped context and shared graph publication |
| [Furnace](https://github.com/jehalladay/Furnace/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Durable Attempts, external decision executors and recovery |
| [Forge](https://github.com/jehalladay/Forge/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Revision-bound verifier and experiment/artifact lineage |
| [HyperUnix-CLI](https://github.com/jehalladay/HyperUnix-CLI/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Typed environmental graph topology and source coverage |
| [beads](https://github.com/jehalladay/beads/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Task continuity, claims and handoff references |
| [ReactiveFiberTSXSDK](https://github.com/jehalladay/ReactiveFiberTSXSDK/tree/main/docs/programs/collective-adaptation-2026-10-16) | main | Co-located TSX context components and embedding semantics |
| [FiberOpticsSDK](https://github.com/jehalladay/FiberOpticsSDK/tree/master/docs/programs/collective-adaptation-2026-10-16) | master | Reactive dependency graph and policy propagation |
| [ReactiveLensesSDK](https://github.com/jehalladay/ReactiveLensesSDK/tree/master/docs/programs/collective-adaptation-2026-10-16) | master | Safe and freshness-aware colony observations |
| [ReactiveComponentsSDK](https://github.com/jehalladay/ReactiveComponentsSDK/tree/master/docs/programs/collective-adaptation-2026-10-16) | master | Role-specific context blocks and cultural inheritance |
| [ReactiveInferenceSDK](https://github.com/jehalladay/ReactiveInferenceSDK/tree/master/docs/programs/collective-adaptation-2026-10-16) | master | Model capability negotiation and real action probabilities |

These repositories may advance in parallel through their own developer documents and native local/Forge test gates. Each is independently maintained, and no monorepo/Library dependency should be introduced solely for this program.

## Cross-repo architecture

Real native authority: Beads for tasks; Furnace for Run/Work/Attempt execution; Forge for verification, artifacts and experiments; Git for source; HyperUnix for provenance-aware observation of environment topology.

Shared perception: ReactiveLenses adapts observations, FiberOptics propagates typed dependencies, ReactiveComponents and ReactiveFiberTSXSDK project budgeted role contexts, and ReactiveFiberCLI owns the bound/shared context workspace.

Pure coordination: MechanicalFiberRuntime provides reference rules for Observe -> Reconcile -> Project -> Infer -> Authorize -> Act; MechanicalWorkflows owns application-level contracts and harnesses. Training consumes traces and external outcome receipts, learns actor/critic behavior, and evaluates colony policy composition fitness.

Deferred independent projects: TrailCLI will own decaying typed signals over observed graph refs. QuorumCLI will own candidate cases, correlation-aware evidence accumulation, and version-pinned decisions. Their repositories and full implementation designs are **out of scope until the user's next round**. Optional adapters and fixture representations in existing repos must not impersonate them.

## Integration protocol

A policy observes a revisioned projection and emits an intent, not an effect. A host reconciles write scopes, resource constraints and native authorization. Native systems execute, report outcomes and provide evidence. The event graph associates attempts, actors, model checkpoints, artifacts and evidence across restarts. A trainer computes advantages only over eligible sampled actions, and causal interventions estimate artifact-specific benefit separately.

Every consumer must preserve exact native source provenance, partial/unknown status, and any authority restriction. A Trail attention signal is not an evidence claim; a Quorum commitment is not independent validation or a Git/Forge authorization grant.

## Dependency-ordered integration

1. **T0: Reference contracts.** Freeze proposed event envelope, role/episode/ref/version identities and sample action eligibility. Test MechanicalFiberRuntime semantics and MechanicalWorkflows fake world.
2. **T1: Native observations.** Verify Beads/Furnace/Forge/HX read contracts in isolated real workspaces. Require source/basis and incomplete coverage.
3. **T2: Reactive context.** Add role projections through RF/Lenses/FiberOptics/Components/TSX, keeping context producer-consumer lineage.
4. **T3: First environment.** Simulate/then run a native landing queue under bounded worktrees, elastic lanes and independent Forge gate.
5. **T4: Multi-attempt inheritance.** Failed producer -> durable useful artifact -> successor -> validation, with with/without-artifact controls.
6. **T5: RL.** Compare fixed policies, trajectory GRPO/PPO, hierarchical critics, artifact counterfactuals and evolutionary composition on matched held-out tasks.
7. **T6: Optional peers.** After separate repo creation, add genuine Trail/Quorum implementations and evaluate multi-agent emergence and robustness.

## Explicit research tracks

- Superorganism homeostasis: labor recruitment, elastic infrastructure workers and reserve capacity.
- Stigmergy: signal propagation, inhibition, deposition, independent downstream utility and evaporation.
- Quorum: independent evidence, candidate disagreement, negative evidence and value-of-information stopping.
- Cultural/ecological inheritance: context compaction, tests, documentation, tool changes, worker replacement.
- Multilevel group selection: worker action gradients, organization selection, fitness transfer and intervention-calibrated critic.
- Social immunity and worker policing: immutable provenance, independent verification, permissions and containment.

## Definition of done

A design document counts as a committed **program**, not a completed feature. Completion requires executable acceptance tests, pinned real source revisions, native verifier receipts and honest fixture/replay/live labels. Each repo owns its release gate. No blanket claim that all 13 packages jointly operate as a production colony should be made before a cross-repo end-to-end witness.
