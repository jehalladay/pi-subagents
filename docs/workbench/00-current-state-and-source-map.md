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

## Honest implementation baseline

**Not delivered in this fork by this specification:** Claude SDK WorkflowHost; generic SDK-backed node() dispatch; real MechanicalWorkflows provider; native Furnace/HX/Forge/RF observer adapters; unified observation indexes; four-pane terminal inspector; detached executor; Pi designer tool suite; comprehensive compatibility conformance. Do not claim any of these work because the documentation or upstream Pi workflow UI exists.

## Verification before modifying code

1. Pin fork baseline and versions of @earendil-works/pi-* packages and @anthropic-ai/claude-agent-sdk.
2. Run existing upstream tests and the Forge build gate in a real checked-out environment. Record commands/results; a GitHub file read proves only source presence.
3. Inventory workflow test fixtures and actual SDK event shapes; protect a compatibility golden set.
4. Verify current native SDK method names and feature availability, especially Furnace Run reconciliation, Forge Workspace Families, and ReactiveFiber rendering, rather than implementing guessed methods.
5. Track upstream commits and cherry-pick deliberately; do not overwrite changes to Pi's non-workflow agent features.