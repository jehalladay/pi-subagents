# 03 — High-level architecture, module ownership and dataflow

## Reference architecture

    Pi interactive session
      |  author/inspect/execute/observe/compare/control tools
      v
    Workbench Pi extension (commands, compact cards, TUI inspector)
      |  typed service boundary, no direct provider semantics
      +--> workflow catalog / source inspector / designer services
      +--> Claude-compatible script runtime [forked VM+worker]
      |       |-- agent() -> ClaudeWorkflowHost -> Claude Agent SDK
      |       |-- node()  -> CapabilityDispatch -> native SDK providers
      |       +-- workflow()/parallel()/pipeline()/phase()
      +--> observation query/projection (snapshots, events, evidence refs)
                  ^                                 ^
                  |                                 |
          Claude SDK event adapter       Furnace/Forge/HX/RF provider observers
                  |                                 |
       native Claude sessions                  native authorities

The workbench interprets scripts locally and orchestrates *calls* but does not invent a second Furnace durable scheduler. The same SDK-backed MechanicalWorkflows function can be called directly by another TypeScript application without installing Pi or this extension.

## Ownership boundaries

| Concern | Authoritative owner | Workbench may do |
| --- | --- | --- |
| Pi chat/editor, extension APIs, terminal TUI | Pi | register commands/tools/components |
| Claude agent tools, hooks, sessions, model messages | Claude Agent SDK | launch, stream, inspect/resume using supported SDK |
| Claude-compatible script control flow | Forked interpreter | schedule promises, track local slots and script outputs |
| MechanicalWorkflows application decisions | Function's package/source | invoke ordinary exported code with injected application dependencies |
| Durable Run, Work, Attempt, admission, supervision, reconciliation | Furnace | invoke/inspect/control via native SDK |
| Bead readiness/formulas | Beads | query explicitly, never reconstruct authoritative readiness |
| Build selection, cache, workspaces, verification | Forge | invoke SDK and display native basis/evidence |
| Hypergraph query completeness, coverage and bounds | HyperUnix | issue queries and interpret native result algebra |
| Context rendering, necessity and provenance | ReactiveFiberCLI | invoke supported API and retain render evidence |
| Cross-runtime continuation | RCP + implementing runtime | optional adapter only when available |
| User-facing navigation and derived observations | Workbench | index, correlate, profile, render, propose |
| Workflow script source revision | Git/Forge artifact | reference and edit under explicit policy |

## Package dependency direction

- Pi extension imports internal services, @earendil-works/pi-coding-agent, and @earendil-works/pi-tui only at its edge.
- Claude adapter imports @anthropic-ai/claude-agent-sdk; the workflow interpreter itself must not import Pi or Claude SDK.
- Provider adapters import their respective native SDKs, instantiated lazily and optionally; registry core does not import all SDKs.
- MechanicalWorkflows packages never import Workbench; a host integration may import both.
- No mandatory import of Library, no GitHub CI, and no forge->furnace/furnace->forge core dependency.
- Avoid a generic agent SDK interface until a tested second agent backend proves shared semantics. The current executor is intentionally Claude-native.

## Workflow forms

1. **Script:** compatibility interpreter is authoritative for JS control flow; agent() creates Claude SDK sessions; node() invokes capabilities.
2. **Ordinary MechanicalWorkflows function:** the function and its supplied services are authoritative for local execution, not the Workbench worker.
3. **Furnace formula:** Furnace is authoritative for durable Run/Work/Attempt; Workbench invokes its API and observes.
4. **Mixed:** a JS script can invoke any of the above; function bodies may call native SDKs, and can optionally emit trace context.

No conversion to universal graph IR is required. A UI graph is an incomplete, provenance-labeled *projection*. Runtime operations not instrumented may remain opaque.

## Operating modes

Embedded: Pi process owns interpreter, Claude SDK clients, SDK dependencies; Pi exit may terminate them. Detached: separate workbench service owns lifecycle and Pi acts as client; no implicit crash recovery. Furnace-hosted: an ExecutorApp callback invokes a pinned app entrypoint; Furnace owns its own retry/admission; arbitrary JS stack does not become durable.

## Design constraints

- Retain upstream Pi Agent tool capability separately during initial migration. Workflow agent() is the deliberate SDK-switch boundary.
- Conflicting tools must not be registered twice: handle current Workflow/SubagentWorkflow collision detection; provide configurable alias and migration errors.
- Source analysis must not execute untrusted workflow JavaScript to discover metadata.
- An observation is a read, not a claim to cancel/control; explicit auth scope required for mutations.
- Execute only pinned code/dependencies for reproducible experiments; propagate workspace basis through results and links.