# 04 — Claude Agent SDK execution host: detailed implementation

## Intent

Replace **workflow** agent() spawn behavior with a real @anthropic-ai/claude-agent-sdk invocation. Pi remains the observer/designer; its upstream Agent tool need not be replaced at this stage. Do not fake Claude behavior with a Pi agent using a Claude model.

## Implementation seam

Existing src/workflow/runtime.ts defines WorkflowHost. It delegates every agent spawn, resume, abort, gate and workflow resolution. Existing src/workflow/host.ts implements this with Pi AgentManager and must become one selectable host implementation. Add e.g. src/workbench/claude-host.ts implementing WorkflowHost, with a session tracker and event adapter. Preserve runtime scheduler and script semantics where possible.

## Proposed session tracker

Per live invocation:
- logical workflow run ID + agent call index + stable agent label
- Claude SDK session ID (when SDK reports it)
- effective model, effort, setting sources, cwd, selected tools and permissions
- abort controller / SDK stop handle; native lifecycle state; last message sequence
- streamed assistant, tool and result observations
- output usage/tokens/cost only as actually reported
- reference to transcript persistence; not an in-memory-only assumption for resume
- worktree and source basis if isolated

Mapping must distinguish workbench run ID, workflow agent ID, Claude SDK session ID, and optional native subagent IDs.

## Spawn algorithm

1. Validate request, agentType, model alias, effort, schema, tool policy, workspace materialization, requested isolation.
2. Resolve role configuration from allowed Claude-native agent definitions/configurations; do NOT reuse Pi's config lookup silently as authority. Document precedence: explicit workflow request > role config > Workbench defaults.
3. Construct query() options according to **installed pinned SDK version**, including model/cwd/permission mode, MCP tool servers, output-format/schema, abort control and setting sources as supported.
4. Subscribe to query() async messages, recognize official SDK message discriminants, collect session ID when available, and emit normalized observation events while preserving native message references. Never assume every message is final or every result carries usage.
5. On result, map native completion/structured output/errors into WorkflowSpawnResult while retaining detailed native result separately. The interpreter's agent() contract may return object/text/null, but operator-facing evidence must distinguish failure from deliberate skip.
6. Release owned SDK resources, listeners, worktree handles and transient secrets. Preserve session metadata for any supported resume.

**Illustrative API only; verify against the pinned SDK:**

    import { query } from "@anthropic-ai/claude-agent-sdk";
    const stream = query({
      prompt: req.prompt,
      options: {
        cwd: resolvedWorkspace,
        model: resolvedModel,
        // Add validated SDK options, auth and abort control here.
      }
    });
    for await (const message of stream) {
      onNativeClaudeMessage(message);
    }

Do not infer session identifiers from process IDs, assume SDK supports arbitrary live steering, or persist secrets in transcripts.

## Resume behavior

The workflow runtime supports agent({resume: "<label>"}) to continue a prior child. Use a mapping from the original workflow call to native Claude SDK session ID. Re-invocation must use the SDK's documented resume mechanism; on mismatch, expiration or unavailable session, fail explicitly. Never launch a new empty session and label it resumed. Do not reuse a journal-cached text result as a live session.

Differentiate resuming a *Claude session* from resuming a *workflow script* after process loss. Recreating arbitrary JS locals/Promise stacks is not guaranteed. Reference docs/08-lifecycle-and-recovery.md.

## Isolation and gates

The upstream host offers isolation: "worktree" and gate shell commands; workflow runtime passes gate metadata so a gate in a transient worktree runs **before** cleanup. New host must either implement equivalent safe workspace materialization using supported Forge/Git surfaces or return unsupported; no quiet downgrade to nonisolated execution. Gates should be run through Forge where supported, preserving native verdict/evidence and basis. Do not turn a test-command exit code into fictitious Forge PASS.

## Streaming and progress

Map provider events into:
- started/effective-config/session-reference
- assistant stream deltas (bounded sampled preview)
- tool call started/completed/refused (with role and provenance)
- token/usage snapshot when reported
- schema validation result
- terminal result, failure, cancellation or observation lost

Do not retain every streamed token as a workbench event; persist a native transcript separately where permitted. UI uses coalesced progress events and compact semantic summaries. Avoid printing secrets or tool payloads in overview.

## Cancellation and steering

Keep SDK AbortController (or supported SDK stop API) scoped to exactly one owned Claude invocation. Cancellation request != terminal acknowledgement. Externally observed Claude SDK sessions may have no valid control channel. Advertise only verified controls. If the SDK supports follow-up messages or steering, implement separately with native capability detection; no fabricated mid-turn interception promise.

## Environment and Bedrock

Claude Agent SDK credentials/provider settings are owned by deployment. Support verified supported Bedrock configuration without translating this into arbitrary raw Bedrock completion calls; report unsupported model IDs or environment setup cleanly. Never log credentials.

## Tests

- Golden real SDK single agent, parallel 3 agents, structured schema, successful resume.
- Negative: invalid model, absent credentials, malformed native output, stream error after partial text, aborted query, resumed unknown session, inaccessible cwd, invalid tool policy.
- Strict assertion that workflow agent() never calls Pi's createAgentSession/AgentManager under Claude backend.
- No false successful tool or domain verdict after SDK result error; transcript privacy and log size bounds.
- Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails.