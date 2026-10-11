# Pi Workflow Workbench — implementation specification

**Status:** architecture and implementation plan; no Workbench implementation is claimed.  
**Baseline:** 2026-10-11, fork of tintinweb/pi-subagents at upstream commit fd8d81618d80ae83a3faf40cb87dae99cca33264.  
**Intended product:** keep **Pi** as the interactive designer, observer and operator; execute workflow agent calls using the **actual Claude Agent SDK**, and compose MechanicalWorkflows and native Forge/Furnace/HyperUnix/ReactiveFiberCLI SDK operations.  
**License:** preserve the original MIT license, copyright notice, and upstream history.

## Start here

1. [Current state and source map](00-current-state-and-source-map.md) — verified upstream code vs proposed work.
2. [Product goals and user journeys](01-product-vision-and-user-journeys.md) — the product and measurable outcomes.
3. [Atomic requirements](02-atomic-requirements.md) — falsifiable implementation contract.
4. [High-level architecture](03-architecture-and-ownership.md) — ownership, dependency direction, and modes.
5. [Claude Agent SDK executor](04-claude-agent-sdk-executor.md) — actual SDK agent lifecycle, stream translation and session resumption.
6. [Script compatibility](05-script-language-and-runtime.md) — preserve the Claude-compatible language and add node().
7. [Capability providers](06-capability-registry.md) — first-class SDK-backed operations, discovery, permission.
8. [MechanicalWorkflows and ecosystem integrations](07-native-integrations.md) — no duplicate provider authority.
9. [Identity, effects and recovery](08-lifecycle-and-recovery.md) — side effects, ambiguity, cancellation.

## Additional engineering specifications

- [Observation model and evidence](09-observation-and-provenance.md)
- [Terminal UI and performance](10-terminal-inspector.md)
- [Designer, experiments and controls](11-designer-and-operator.md)
- [Security, sandbox and authorization](12-security.md)
- [Low-level contracts and configuration](13-contracts-and-config.md)
- [QA and adversarial conformance](14-qa-and-benchmarks.md)
- [Vertical cuts and implementation program](15-implementation-program.md)
- [Refactoring and migration](16-repository-refactor.md)
- [Packaging, operations and upstream](17-packaging-and-operations.md)
- [Risks and unresolved questions](18-decisions-and-risks.md)
- [Worked usage journeys](19-worked-examples.md)
- [Agent implementation directive](IMPLEMENTATION_GUIDE.md)

## Product invariants

- Pi remains the **interface**, not the executor of workflow agent() calls. Standalone upstream Pi subagent tools can remain available until a separate migration is explicitly justified.
- Workflow agent() uses **@anthropic-ai/claude-agent-sdk**, not a Pi-managed imitation. No fallback to Pi on Claude execution failure.
- Preserve compatibility of saved scripts using agent, parallel, pipeline, phase, workflow, log, args, budget, and literal meta. New node() calls are additive.
- MechanicalWorkflows remains an **ordinary functions** library. It does not acquire a mandatory graph DSL, global registry, scheduler or SDK dependency on this workbench.
- Furnace owns Run/Work/Attempt, supervision, admission and recovery. Forge owns builds and evidence. Beads owns readiness. HyperUnix owns coverage/query semantics. ReactiveFiber owns context provenance. Claude SDK owns agent session semantics.
- Observer may attach to externally launched operations. A viewer does not own or implicitly cancel an observed Run.
- UI has no browser requirement and uses terminal text cells, indexed incremental projections, virtualization and bounded redraws.
- No Library dependency and no GitHub CI. Use Forge as primary build/verification interface.
- No false success. Unknown, missing, stale, partial or ambiguous evidence stays visibly unknown/partial until its producer establishes truth.

## Naming and deliverability

The fork remains jehalladay/pi-subagents. "Pi Workflow Workbench" is a proposed product label, not an already-installed extension. Upstream source is intentionally untouched by this documentation commit. Future implementation commits should label experimental functionality and retain an explicit feature flag until end-to-end conformance passes.

All references to node provider methods, SDK names, example operation names, host config, and schemas below are **proposals** unless identified as observed upstream interfaces. Validate them against pinned releases before implementing.