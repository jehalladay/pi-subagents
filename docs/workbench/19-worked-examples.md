# 19 — Worked usage examples and expected outcomes

Examples are **proposed** until provider code exists. Existing upstream docs/workflows.md remains normative for currently working Pi workflows. Do not run these samples assuming SDK calls are already implemented.

## Example A: unchanged Claude-style script

    export const meta = {
      name: "review-changes",
      description: "Review changed code independently",
      phases: [{ title: "Review" }, { title: "Verify" }]
    };

    phase("Review");
    const reviews = await parallel([
      () => agent("Review changes for correctness", { label: "bugs" }),
      () => agent("Review changes for latency", { label: "performance" })
    ]);

    phase("Verify");
    return await agent("Challenge these findings: " + JSON.stringify(reviews));

Expected in Workbench mode: agent() launches *actual Claude Agent SDK* sessions; Pi displays their status and transcript refs. In explicit legacy mode, upstream Pi AgentManager path may remain; must be visibly differentiated.

## Example B: typed deterministic provider call

    export const meta = {
      name: "scope-and-review",
      description: "Use HX scope before agent review",
      phases: [{ title: "Scope" }, { title: "Review" }]
    };

    phase("Scope");
    const scope = await node("hyperunix.query", {
      query: args.query
    });

    phase("Review");
    return await agent("Review scoped files: " + JSON.stringify(scope));

Expected: node() calls trusted host-side HX SDK provider without any Claude token spend for the query; HX partial/unknown coverage remains a typed result that script should handle explicitly. Representative names are proposed.

## Example C: native MechanicalWorkflows invocation

    const outcome = await node("mechanical.development.develop.v1", {
      task: args.task,
      workspaceId: args.workspaceId,
      baseRevision: args.baseRevision
    });

The host resolves a pinned @mechanical/workflows-development export and injected services discover, compileContext, implement, verify. Outcome could be verified_candidate, verification_failed, needs_evidence or indeterminate; invocation transport success does not turn latter three into PASS. Currently MechanicalWorkflows live bindings are unfinished.

## Example D: observer-only external Furnace attachment

    Pi operator: "Inspect Furnace Run R123; show current tasks
    and evidence without controlling it."

Expected: workbench calls native Furnace get/status/events, projects real Run/Work/Attempt refs, shows last-observed timestamp and coverage, offers controls only when authorized. If Run info is inaccessible, a clear error; do not invent state.

## Example E: interactive optimization cycle

    Pi operator: "Compare five executions of parser repair before
    and after the new Forge affected selection."

Expected: Pi catalogs source revisions, uses workflow_compare over actual runs with comparable inputs/caches, extracts critical-path evidence and reports p50/p95, failure rate and cost when available. If cohorts differ in model/config/source basis, comparison discloses confounders.

## Example F: terminal inspector

    /workflows
    > package-improvement
      Overview [Tab Graph] [Tab Timeline] [Tab Details]
      > Implementation  82/140  2 blocked
          Agent Group B (Claude)  27/40
      Forge Verify: evidence link / candidate basis
      Furnace Run: last observed 2s ago

This is a conceptual layout, not a screenshot or implementation claim. Closing does not stop native work.

## Example G: ambiguous side effect

A Furnace runs.start request is accepted by producer but the response is lost. Node call returns uncertain-effect with reconciliation target; Pi displays uncertainty. Workbench MUST NOT simply retry and create a second Run until Furnace's native idempotent establishment/reconciliation capability proves equivalence.

## Example H: native evidence refusal

Forge gate reports partial/unknown evidence after change of candidate basis. Pi must show "verification indeterminate", not success, even if host RPC returned normally and text says "build completed".
## Measured experimental read example

Unlike the proposed `hyperunix.query` example above, the registered operation is currently `hyperunix.find`. In `.pi/subagents.json`, explicitly select the Claude workflow backend and grant only `hyperunix:read`.

```javascript
export const meta = {name: "inspect-source", description: "Read native coverage"};
const found = await node("hyperunix.find", {kind: "hx.fs/regular-file", root: "src"});
return {coverage: found.source.coverage_summary, runtime: found.runtime};
```

The native result can be incomplete even when files are returned. `licenses_absence: false` does not establish that a missing file or symbol is absent. This query is a filesystem read, not a task-scoped semantic dependency analysis.

`furnace.run.inspect` accepts an existing `runId` under the authorized Pi workspace with explicit `furnace:inspect`. `reactivefiber.render.preview` accepts exactly one of two input arms under explicit `reactivefiber:render`: `model` and `task`, or `view` and `taskId` with an optional `model`, never both; its workspace must already be initialized. It uses a noncommitted render and must not be advertised as a durable RF artifact.

## Claude role as a swarm context graph worker

A swarm context graph worker is a Claude role that runs `rf` through its shell tool and follows the swarm recipe of the installed rf skill. `rf install-skill --agent claude` writes that skill to `~/.claude/skills/rf/`, whose `references/swarm-integration.md` holds the recipe. This page names that location and never restates the recipe, and the repository tracks no copy of the skill.

```json
{
  "workbench": {
    "workflowAgentBackend": "claude",
    "roles": {
      "scg-worker": {
        "prompt": "Work as a swarm context graph worker: read the swarm recipe of the installed rf skill at ~/.claude/skills/rf/references/swarm-integration.md, follow it, and pass the directory SWARM_RF_WORKSPACE names as --workspace to every rf command.",
        "tools": ["Bash", "Read"]
      }
    }
  }
}
```

Pi loads this `.pi/subagents.json` as written, and the file sets no `settingSources`, which is a `workbench` key and never a role key. With the key absent, Pi's Claude host passes `[]` as the `settingSources` of every session it starts. The installed Agent SDK documents `[]` as disabling filesystem settings. The role's `tools` replace the workbench-wide `tools` for its sessions, so `Bash` is the shell tool the worker runs `rf` through and `Read` the tool it reads the recipe with. The role declares no `capabilities`, so its sessions expose no Pi provider tool and need no capability grant. The worker learns the swarm workspace from `RF_WORKSPACE` and `SWARM_RF_WORKSPACE`, and the role adds no environment of its own: its sessions start with no `env` override, and the detached host's launch allowlist carries both names. The detached host starts its Claude sessions with `settingSources` `[]` as well, whatever reaches it.
