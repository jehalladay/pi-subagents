# 09 — Flat implementation program

This is a **flat set of independently assignable work packages**, not an ordered roadmap. Implementation swarms may subdivide internally. Each package owns code, tests, adversarial negative controls, docs/status updates and an upstream issue where blocked. Claims of delivery require executable evidence, not a prose checklist.

| Package | Concrete work | Acceptance/evidence |
| --- | --- | --- |
| **WP-A — Workspace foundation** | Forge root + two member manifests, tool pin, npm workspaces, SDK-free development library, fixture CLI | `forge build`, `npm test`, correct member selection, no Library dependency |
| **WP-B — Application domain logic** | Expand simple develop function with real task planning, candidate selection, review/repair boundaries and structured outcomes | Genuine workflow decision tests, no generic workflow engine |
| **WP-C — Forge native integration** | Implemented first App Server `gate.run` adapter with clean Git candidate and conservative mapping; add typed façade parity, actual Forge runtime journey and incremental selection | Real candidate gate witnessed against installed Forge; partial/unknown/refused preserved; no false PASS |
| **WP-D — HyperUnix native integration** | Typed scope query with coverage, evidence and basis | Real HX result; partial query cannot silently select no work |
| **WP-E — ReactiveFiber integration** | Public context-render consumption (TypeScript interop where needed), producer provenance | Real committed/rendered context and source/model basis, or explicit upstream blocker |
| **WP-F — Agent implementation** | Claude Agent SDK query adapter and one-writer clean committed candidate path written; real SDK conformance, role tools and agent-privacy review remain | Real agent work + tool invocation refs, clean role permissions |
| **WP-G — Local live composition root** | Construct/close clients, config, CLI task intake, basis selection, typed output | Real single-writer end-to-end run without Library |
| **WP-H — Furnace Forge executor** | Exported `ExecutorApp` registration and status mapping exist; configure and run through real Furnace extension/process host; investigate evidence truncation/mapping | Genuine Furnace Attempt; preserves Forge native evidence and failure distinctions |
| **WP-I — Furnace host for development** | Executor callback invoking same `develop` implementation, typed input/output, lifecycle handling | Same function under local and Furnace hosts; host guarantee differences stated |
| **WP-J — Native Run ergonomics (Furnace owner)** | Replay-safe `ensure`/reconcile is the open upstream half (`runs.ensure` is absent at Furnace `513a6881de9f`). The terminal wait is settled upstream by D317: no wait verb, a `controller.live` poll, so it is no longer a Furnace deliverable | Native SDK/conformance and crash tests in Furnace; MechanicalWorkflows remains client only |
| **WP-K — Optional deployable entrypoint** | Descriptor validation, artifact pinning, minimal host binding, schema/effect compatibility | Standalone artifact, wrong digest/schema refuses, no invented RPC runtime |
| **WP-L — Provenance/evidence** | Native IDs, trace links, subject/workspace bases, receipt exporter | Can trace product operations without a second authoritative execution database |
| **WP-M — Adversarial restart** | Fault injection around parent/child establishment, tool retries, stream interruption | Unknown rather than duplicate/fabricated success; native ensure test when available |
| **WP-N — Workspace-family swarm** | Isolated Forge child workspaces, explicit candidate integration and reverify | No shared mutable writes; verified integration basis; met with git worktrees at `18c0aac`, native Forge child workspaces remain a Forge request (Forge `e6c2c7b3c42f`) |
| **WP-O — Deploy profiles** | Build verified role-specific packages/bundles/containers using Forge's supported mechanisms | Worker starts without monorepo or Library; no unused provider dependencies |
| **WP-P — Developer LX/performance** | SDK friction telemetry, repeatable cold/warm runs, examples | Source-line/process/poll/latency measurements and upstream feedback |
| **WP-Q — Python usage proof** | Independent small Python example after native SDK surface is selected | Same architecture principles; no mandatory duplicate Python implementation of every workflow |

## Integration ownership

Each WP that hits a product gap should file a *concrete requirement in that product*: Forge SDK or workspace/cache features in Forge; Furnace Run/wait/supervision/resource issues in Furnace; RF renderer/programmatic endpoint in RF; query/coverage in HX. No local shim may quietly become a second implementation of the product's domain authority.

## Avoided work

Do not construct a `workflow-core` package, universal tool ABI, generalized persistent workflow state, scheduler, resource pool engine, generic retry layer, global catalog, or hand-coded SDK semantics just to make scaffolding look complete. Don't add dependency on Library. Don't make Forge/Furnace depend on each other. No GitHub CI.

## Vertical reference cut (one realistic destination)

Actual HX scope → actual RF context → selected agent modifies one isolated writable candidate → actual Forge affected verification → optional Furnace-supervised full gate → native-reference-rich application result and receipt. Until all stages execute, status ledger explicitly names which ones remain planned.

## Falsification-friendly completion

Every WP must define which current test would fail if its main claim were silently weakened. For cross-product releases, include one installed-artifact consumer test outside source tree, fault-aware negative controls and concrete linked evidence. Requirements have no artificial sequence; consumers should be as independently useful as possible.
