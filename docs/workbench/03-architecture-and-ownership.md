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
| Graph-function representations, numerical evaluation, learned scores, embeddings, predictions, policy distributions and their receipts | GraphPolicyCLI | nothing today (no gp seam is registered); a future seam reaches gp only through its CLI, SDK or `gp rpc --stdio`, under the GraphPolicyCLI boundary below |
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

Embedded: Pi process owns interpreter, Claude SDK clients, SDK dependencies; Pi exit may terminate them. Detached: separate workbench service owns lifecycle and Pi acts as client; no implicit crash recovery. Furnace-hosted: an ExecutorApp callback invokes a pinned app entrypoint over the verified extension driver (kept per-Run host session, per-admission receipts); Furnace owns admission and claims, but a work_failure or a resident host's indeterminate terminal parks the Run for the manual operator ladder and is never auto-retried (Furnace's own recorded retry.* policy admits automatic re-attempts for other classes, per Furnace README.md:749-759@15fd6f8ee); arbitrary JS stack does not become durable, and controller or Pi death leaves running Attempts needing operator reconciliation.

## Design constraints

- Retain upstream Pi Agent tool capability separately during initial migration. Workflow agent() is the deliberate SDK-switch boundary.
- Conflicting tools must not be registered twice: handle current Workflow/SubagentWorkflow collision detection; provide configurable alias and migration errors.
- Source analysis must not execute untrusted workflow JavaScript to discover metadata.
- An observation is a read, not a claim to cancel/control; explicit auth scope required for mutations.
- Execute only pinned code/dependencies for reproducible experiments; propagate workspace basis through results and links.

## GraphPolicyCLI boundary

Pi carries no GraphPolicyCLI (gp) integration today. Program obligation RF-GRAPH-POLICY-MACHINE-CONTROL-R1 (bead wb-1xvp.2; ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:79@6a251bf73af5) binds any future gp seam to the four rules below, and test/workbench-gp-real-interfaces.test.ts judges every src module and package.json by them, one check per semicolon-separated clause. A gp client is a src module the census registers as one (none today); a gp-adjacent module is a gp client or a module that imports one; a decision path is a gp client and its src import closure; an execution seam is a module that itself calls process.kill, stops a Furnace Run or Attempt, writes through bd, starts a Claude agent session or launches a workflow host. A cancel, retry or reassign proposal therefore reaches the existing lifecycle functions, which stay outside every gp seam, and a missing gp verb is added to GraphPolicyCLI itself, never re-implemented here. The census reads code tokens, never comments, and claims only the detector shapes it pins with a live probe each; its measured blind spots are the named residuals below, a list it does not claim complete.

- **GP-1 real interfaces:** every gp call site reaches gp through the gp binary, the GraphPolicyCLI package or `gp rpc --stdio`; no decision-path argv carries `train`; an admission seam imports no training or telemetry writer; no execution seam imports a gp client.
- **GP-2 no local numerics:** no module outside a gp client names GraphDataIR or GraphPolicyCLI wire vocabulary; a gp client maps the GP_CLI_UNKNOWN_COMMAND refusal to a typed refusal, never a local substitute.
- **GP-3 no unrelated dependency:** a decision path imports no package beyond the GraphPolicyCLI package and Node built-ins; the dependency manifest declares no training framework and no GraphPolicyCLI package other than graph-policy-cli.
- **GP-4 lifecycle only:** a gp-adjacent module calls no process.kill; a gp-adjacent module writes nothing through bd; a gp-adjacent module stops no Furnace Run or Attempt.

Named residuals, each pinned by a quiet row that the census keeps silent: UNNAMED-NUMERICS (a module that scores graph data without naming gp vocabulary); LOCAL-SUBSTITUTE (a client that names the refusal and then computes locally); COMPUTED-BINARY (a gp binary name assembled at run time); DYNAMIC-ARGV (a train verb assembled at run time); ALIASED-EFFECT (a kill, a Furnace stop or a launcher reached through a value the census does not follow: a parameter, an assignment after the declaration, an object property or a return value); TRAINING-FRAMEWORK-ROSTER (a training framework outside the census deny roster that no decision path imports); WRAPPED-COMMAND (a launch wrapped by a program the census does not unwrap, such as timeout, sudo, nice or xargs); FOREIGN-LAUNCHER (a launch through a package launcher outside the child_process roster, such as execa).
