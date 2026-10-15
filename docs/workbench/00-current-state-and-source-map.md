# 00 — Current state, evidence, and source map

## What actually exists

The fork retains tintinweb/pi-subagents. At baseline fd8d816, its workflow system includes:

| Source | Existing behavior | Workbench treatment |
| --- | --- | --- |
| src/workflow/runtime.ts | Worker lifecycle, RPC bridge, concurrency caps, WorkflowHost injection, progress/journal coordination | Preserve core; extend host dispatch and node operations |
| src/workflow/worker-source.ts | VM script realm and globals: agent, parallel, pipeline, phase, log, workflow, budget, console, args/meta | Preserve compatibility; add validated node() bridge |
| src/workflow/host.ts | Maps WorkflowHost to Pi AgentManager, model resolution, gates and worktrees | Implement alternate Claude SDK WorkflowHost; do not silently swap other upstream agent tools |
| src/agent-runner.ts | Creates Pi child sessions; @earendil-works/pi-coding-agent | Not reusable as a Claude executor; retain where upstream Pi Agent tool needs it |
| src/workflow/journal.ts | Prefix reuse for settled agent calls based on hashes; JSONL | Keep for legacy agent-only compatibility; separate from effect reconciliation |
| src/workflow/progress.ts | Event log, derived phase/agent summaries | Extend for native SDK operations; optimize incremental projection |
| src/ui/workflow-card.ts | Styled, width-aware compact workflow card | Preserve with added node summary |
| src/ui/workflow-dialog.ts | Two-pane pure layout and key-state reducers; 80ms animation | Extend to overview/graph/timeline/details; remove forced high-frequency full refresh |
| src/ui/conversation-viewer.ts | Live Pi session transcript viewer | Add Claude SDK transcript adapter; preserve Pi conversation viewer |
| src/ui/fleet-list.ts | Existing Pi agent + workflow navigation | Extend workflow row without conflating Claude sessions with Pi session identities |
| docs/workflows.md | Existing script compatibility semantics | Preserve as normative legacy compatibility fixture |
| LICENSE | MIT, tintinweb copyright | Preserve attribution and fork history |

WorkflowHost already defines spawnAgent(request), abortAgent(agentId), optional resumeAgent, runGate and loadWorkflow. The runtime is intentionally decoupled from Pi AgentManager through host.ts; this is the major replacement seam. The script runs in node:vm inside a worker thread. Upstream acknowledges this is **not a security sandbox** against hostile script authors.

## MechanicalWorkflows facts from current repository

jehalladay/MechanicalWorkflows (main, inspected 2026-10-11) is a Forge-managed repository with @mechanical/workflows-development and a fixture-only development rig. Its core programming model is a normal typed async function with four injected ports: discover, compileContext, implement, verify. Live SDK integrations are planned rather than established. A descriptor at contracts/entrypoints/development.v1.json identifies mechanical.development.develop.v1, package export develop, schemas, and binding names; the descriptor is explicitly **not** a running remote loader.

Normative MechanicalWorkflows decisions:
- No mandatory DSL, universal workflow engine, scheduler, registry, run table or all-provider tool adapter.
- Native SDKs are preferred, provider-specific tool exposure stays at provider edge.
- Furnace retains durability authority; Beads retains readiness; Forge retains verification/source basis; HyperUnix retains coverage; ReactiveFiber retains provenance.
- No Library dependency; no GitHub CI.
- Never equate fixture PASS or transport success with native verification.

References:
- https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/11-decisions-and-non-goals.md
- https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/06-sdk-integration-and-hosts.md
- https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/07-identity-effects-and-recovery.md
- https://github.com/tintinweb/pi-subagents/blob/master/docs/workflows.md
- https://platform.claude.com/docs/en/agent-sdk/overview (consult pinned SDK release during implementation)

## 2026-10-15 implementation update (experimental; evidence-scoped)

The documentation baseline below describes 2026-10-11 and is retained for historical context. Current checked-out implementation began at `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` and runs with Node 24.20.0, Claude Agent SDK `0.3.300`, and Forge SDK `0.1.0` vendored at `vendor/forge-sdk-0.1.0.tgz` (sha256 `c108a25c0f7ae4cac9b882c1ab16469c4918752ea4a0dceb2d71dd107ce0d8d6`). `forge build --require-complete` is the gate, with npm-backed lint/typecheck/test/build and a compiled external-client smoke step. See `TRACEABILITY.md` for per-requirement evidence and gaps.

**Source present, fixture-tested and registered-client measured:** `src/workbench/claude-host.ts` calls the actual `@anthropic-ai/claude-agent-sdk` `query` in explicit `workbench.workflowAgentBackend: "claude"` mode; the Pi-managed `Agent` tool remains unchanged and the old Pi workflow path remains the default. The host maps native init session ID, model, usage from result `modelUsage`, and structured_output into `WorkflowHost`; non-default `agentType` needs a configured Claude-native role, not an implicit Pi agent config, with no Pi manager call. `agent({resume})` checks a known SDK session ID via `getSessionInfo` before native `resume`. Isolation is rejected rather than silently dropped. `agent({gate})` is rejected when no gate is configured (no Forge verification claim). Fixture tests prove script, parallel schema shape, partial-failure handling, Pi route, and negative no-manager assertion. **Real Claude SDK model execution measured:** `node qa/workbench/live-claude.mjs "$PWD"` exited 0 on 2026-10-15 with two parallel structured agents returning `{answer:"a"}` and `{answer:"b"}`, two native SDK session UUIDs and SDK `system`, `stream_event`, `assistant`, `user`, `result` event types. The later registered Pi real-SDK schema proof is recorded in TRACEABILITY.md. Neither direct host nor registered-client execution establishes actual terminal operator acceptance. A separate direct live resume proof (`node qa/workbench/live-resume.mjs "$PWD"`) returned `first:"ready"`, `second:"ZEPHYR"` with the same SDK session UUID on both native result messages.

**Native read integration measured:** `node()` crosses the existing worker RPC to a host capability registry. Inputs/outputs must be JSON; typed authorization, schema checks, and no automatic node replay are tested. The registered `forge.gate.status` capability uses `@forge/sdk` `ServerConnection.spawn('forge')` plus `request('gate.status',{root})`, closing the owned process. A real native SDK test read this workspace's gate-status: `status=success`, one package, `authoritative_current=false` (historical status, not current verification). That latter field is preserved without a fabricated PASS. The Pi inline card and existing inspector render a separate selectable native node operation row; full P1 four-view inspector is not implemented. Read-only `forge:inspect` requires an explicit `workbench.capabilityGrants` entry, independently of Claude Workbench selection and scoped by realpath to the Pi project root; the registered native capability cannot inspect an arbitrary unrelated path. No write provider is registered. The typed Forge facade `GateFacade.status({target})` refused against the installed server requiring `{root}`; report filed in Forge's `new-feedback/2026-10-15-typescript-forge-gate-status-facade-sends-target-but-server-requires-root.md` (not delivered by push).

**Native ecosystem reads:** `hyperunix.find` uses the typed HX SDK with native coverage and binary identity. `furnace.run.inspect` uses the Furnace SDK without control ownership. `reactivefiber.render.preview` uses the verified CLI JSON contract with `--no-commit`, bounded output and noncommitted provenance. Lifecycle negatives include cancellation before launch, SDK custody, malformed RF output and forced termination of a noncooperative RF process. The adapters do not imply a full native observation service.

**External Furnace snapshot measured:** a disposable real-Beads workspace independently launched and completed Furnace Run `frn-run-fx-wisp-786` through `/usr/bin/true`. Pi's compiled native reader retained the Furnace Run and Beads identities. All 25 files under its native stores were byte-identical before and after reads, missing-Run refusal and pre-aborted inspection. `forge run furnace-observe` passed at `cmd_119b38150276`. This proves a completed external Run snapshot only, not live controller lifecycle or reconnect.

**Observation and identity increment:** a bounded producer-qualified read projection, immutable script/host/config/dependency receipts and explicit `workbench_catalog`/`workflow_observe` tools are implemented with registered-client denial and drift tests. Native envelopes are producer-version checked and diagnostic previews bounded/redacted. Full native binary identity, tenant authentication and live observer reconnect are not established.

**Unimplemented or not acceptance-complete:** detached execution, designer, full multi-view TUI/scale acceptance, live external event reconnection, and MechanicalWorkflows live binding. The implementation remains experimental because full Pi TUI/live-auth conformance, provider auth/identity, cancellation and evidence controls have not all passed, despite direct live SDK and Pi-to-Forge SDK tests. Older journal prefix caching still applies to explicitly selected legacy Pi workflow calls. Claude workflow agents never replay from the journal; a node() call disables replay of all later agent calls, and node() itself is never journaled/replayed. Do not claim effectful node safety beyond the current read-only registered capability.

## Honest implementation baseline

**Not delivered in the 2026-10-11 documentation-only baseline (now partly implemented above):** Claude SDK WorkflowHost; generic SDK-backed node() dispatch; real MechanicalWorkflows provider; native Furnace/HX/Forge/RF observer adapters; unified observation indexes; four-pane terminal inspector; detached executor; Pi designer tool suite; comprehensive compatibility conformance. Do not claim any of these work because the documentation or upstream Pi workflow UI exists.

## Verification before modifying code

1. Pin fork baseline and versions of @earendil-works/pi-* packages and @anthropic-ai/claude-agent-sdk.
2. Run existing upstream tests and the Forge build gate in a real checked-out environment. Record commands/results; a GitHub file read proves only source presence.
3. Inventory workflow test fixtures and actual SDK event shapes; protect a compatibility golden set.
4. Verify current native SDK method names and feature availability, especially Furnace Run reconciliation, Forge Workspace Families, and ReactiveFiber rendering, rather than implementing guessed methods.
5. Track upstream commits and cherry-pick deliberately; do not overwrite changes to Pi's non-workflow agent features.