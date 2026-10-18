/** Claude Agent SDK execution of *workflow* agent() calls; Pi's Agent tool stays separate. */
import { existsSync } from "node:fs";
import { isAbsolute } from "node:path";
import {
  type EffortLevel,
  getSessionInfo,
  type Options,
  type SDKMessage,
  query as sdkQuery,
} from "@anthropic-ai/claude-agent-sdk";
import type {
  WorkflowHost,
  WorkflowNodeRequest,
  WorkflowScriptRef,
  WorkflowSpawnRequest,
  WorkflowSpawnResult,
} from "../workflow/runtime.js";
import { resolveWorkflowSource } from "../workflow/saved.js";
import type { CapabilityRegistry } from "./capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "./claude-capability-tools.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "./redaction.js";

/** SDK query injection exists for the fixture integration suite, not a fallback backend. */
export type ClaudeQuery = (params: { prompt: string; options: Options }) => AsyncIterable<SDKMessage>;

export interface ClaudeWorkflowHostOptions {
  cwd: string;
  signal?: AbortSignal;
  /** An explicit model pin is preferred over inheriting Pi's unrelated model. */
  model?: string;
  settingSources?: Options["settingSources"];
  permissionMode?: Options["permissionMode"];
  /** Privileged built-ins must be opted into by the host, not the script. */
  tools?: string[];
  /** Optional Claude-native role definitions, never Pi AgentManager configs. */
  roles?: Record<string, { prompt: string; tools?: string[]; capabilities?: string[]; model?: string; effort?: EffortLevel }>;
  capabilities?: CapabilityRegistry;
  grants?: readonly string[];
  invocationId?: string;
  principal?: { readonly id: string; readonly role?: string };
  query?: ClaudeQuery;
  onMessage?: (message: SDKMessage, call: ClaudeCallIdentity) => void;
  onSettled?: (result: WorkflowSpawnResult, call: ClaudeCallIdentity) => void;
  /** Session lookup comes from the SDK's persistent store; fixture can override it. */
  getSession?: typeof getSessionInfo;
  /** Re-observe the host-owned invocation basis before every agent or SDK operation. */
  beforeDispatch?: () => void | Promise<void>;
  /**
   * Live-query retention seam (wb-cra): fired once per SDK query whose stream exposes a native interrupt(),
   * BEFORE the first message is read, with the call identity and a seam that proxies that one method. The host
   * keeps no registry itself; workflow_control wiring owns the map and the session binding (from onMessage init).
   */
  onQueryLive?: (call: ClaudeCallIdentity, seam: { interrupt(): Promise<unknown> }) => void;
  /** Fired in the query's own finally, pairing every onQueryLive so a wiring registry never leaks an ended query. */
  onQueryDone?: (call: ClaudeCallIdentity) => void;
}

/**
 * The retained SDK Query's control channel, read structurally (wb-cra): the vendored Query extends the message
 * AsyncIterable with interrupt() (sdk.d.ts), while the fixture seam's plain generators have no such method. Only a
 * function-valued own interrupt yields a seam; everything else means no control channel, never a throw.
 */
function interruptSeamOf(stream: AsyncIterable<SDKMessage>): { interrupt(): Promise<unknown> } | undefined {
  const candidate: unknown = (stream as AsyncIterable<SDKMessage> & { interrupt?: unknown }).interrupt;
  if (typeof candidate !== "function") return undefined;
  return { interrupt: () => Promise.resolve((candidate as () => unknown).call(stream)) };
}

export interface ClaudeCallIdentity {
  agentId: string;
  index: number;
  label: string;
}

interface SessionEntry {
  call: ClaudeCallIdentity;
  sessionId: string;
  model?: string;
  effort?: EffortLevel;
  tools: string[];
  capabilities: string[];
  permissionMode: NonNullable<Options["permissionMode"]>;
  systemPrompt?: string;
  cumulativeTokens?: number;
  cumulativeOutputTokens?: number;
}

const MODELS = new Map([
  ["opus", "claude-opus-5-5"],
  ["sonnet", "claude-sonnet-5-5"],
  ["haiku", "claude-haiku-5-5"],
  ["fable", "claude-fable-5-1"],
]);
const EFFORT = new Set<string>(["low", "medium", "high", "xhigh", "max"]);

function resolvedModel(input: string | undefined): string | undefined {
  if (!input) return undefined; // SDK resolves its own default; no Pi model leak.
  const model = MODELS.get(input.toLowerCase()) ?? input;
  return model.trim() && !/[\u0000-\u001f]/.test(model) ? model : undefined;
}

/**
 * docs/workbench/17 "Error and degradation policy": missing Claude auth is a
 * clear config error, never a silent Pi-model answer. The SDK flags it with the
 * typed assistant error "authentication_failed"; the outcome carries a stable
 * code (same "CODE: message" shape as the beforeDispatch refusal), names the
 * prerequisite, and routes the bounded SDK detail through the shared sanitizer.
 */
const AUTH_REQUIRED_CODE = "CLAUDE_AUTH_REQUIRED";

/**
 * SDK text in an outcome error is untrusted producer text bound for display (cards, labels, replies). It passes the one
 * shared helper with the "label" layout (a single-line outcome string): redaction sees every reading of an invisible
 * inside a credential before the gaps are rendered. A plain redactor here collapses those readings and the display
 * helper downstream then glues the credential tail back together (wb-cax.5 gate F1, wb-wyr).
 */
function outcomeText(value: string, maxTextLength = WORKBENCH_TEXT_LIMIT): string {
  return sanitizeWorkbenchText(value, maxTextLength, "label");
}

/**
 * wb-19q member 12 (wb-wyr gate survivor GM5): the outer outcomeText pass below is retained as
 * defense-in-depth. Its only measured discriminator was the bounded() cut splitting an astral pair
 * in the inner 160-unit reason — gone since wb-yr9 (ce7ec7f), whose bounded() drops a pair it
 * would split rather than leave a lone surrogate. With that cut fixed, GM5 ("outer pass -> plain
 * redactor") measures equivalent on every probe, including the member-12 straddle probe in
 * test/workbench-degradation-policy.test.ts (green with GM5 applied in an isolated copy). Keeping
 * the outer pass re-covers any future drift in what the inner pass can hand this composition.
 */
function authRequiredError(detail: string): string {
  const reason = outcomeText(detail, 160);
  return outcomeText(
    `${AUTH_REQUIRED_CODE}: Claude SDK authentication is missing or rejected; sign in with \`claude /login\` or set ANTHROPIC_API_KEY. The workflow does not fall back to a Pi model.${reason ? ` (SDK detail: ${reason})` : ""}`,
  );
}

function usage(result: SDKMessage & { type: "result" }): { tokens?: number; outputTokens?: number } {
  // modelUsage is cumulative across turns and includes subagents. Do not sum
  // assistant frames, which may each carry only a single content block.
  const models = Object.values(result.modelUsage ?? {});
  if (models.length === 0) return {};
  return {
    tokens: models.reduce((total, item) => total + item.inputTokens + item.outputTokens + item.cacheReadInputTokens + item.cacheCreationInputTokens, 0),
    outputTokens: models.reduce((total, item) => total + item.outputTokens, 0),
  };
}

/** This adapter never imports AgentManager or createAgentSession. */
export function createClaudeWorkflowHost(config: ClaudeWorkflowHostOptions): WorkflowHost {
  const query = config.query ?? sdkQuery;
  const getSession = config.getSession ?? getSessionInfo;
  const controllers = new Map<string, AbortController>();
  const sessions = new Map<string, SessionEntry>();
  const pendingLookupAborts = new Set<string>();
  const settings = config.settingSources ?? [];
  const tools = config.tools ?? [];
  const permissionMode = config.permissionMode ?? "dontAsk";
  /**
   * Everything an agent answer depends on beyond its own call payload. Journal
   * entries record it, and the runtime replays only under an equal basis, so a
   * changed model pin, permission mode, tool list, role set, grant set or
   * workspace declines the cache (the L4 contract in
   * workbench-host-contract.test.ts). Per-run identity — invocationId, signal,
   * observers — is deliberately not part of it.
   */
  const replayBasis = JSON.stringify([
    config.cwd,
    config.model ?? null,
    permissionMode,
    settings,
    tools,
    config.roles ?? null,
    config.grants ?? null,
    config.principal ?? null,
  ]);

  async function invoke(
    agentId: string,
    prompt: string,
    request: WorkflowSpawnRequest | undefined,
    previous: SessionEntry | undefined,
    onResolved?: WorkflowSpawnRequest["onResolved"],
  ): Promise<WorkflowSpawnResult> {
    if (!isAbsolute(config.cwd) || !existsSync(config.cwd)) {
      return { ok: false, error: `Claude SDK cwd is inaccessible: ${config.cwd}.` };
    }
    if (config.signal?.aborted) return { ok: false, skipped: true, error: "Workflow aborted." };
    if (request?.isolation === "worktree") {
      return { ok: false, error: "Claude SDK worktree isolation is unavailable; refusing to run in the shared cwd." };
    }
    if (request?.effort === "minimal") {
      return { ok: false, error: 'Claude SDK does not support effort "minimal".' };
    }
    if (request?.effort && !EFFORT.has(request.effort)) {
      return { ok: false, error: `Unsupported Claude SDK effort: ${request.effort}.` };
    }
    const roleName = request?.agentType ?? "";
    const role = request?.agentType === "general-purpose" || !config.roles || !Object.hasOwn(config.roles, roleName)
      ? undefined : config.roles[roleName];
    if (request && request.agentType !== "general-purpose" && !role) {
      return { ok: false, error: `Claude SDK role ${request.agentType} is unavailable; configure a Claude-native role rather than using Pi's agent registry.` };
    }
    const model = previous?.model ?? resolvedModel(request?.model ?? role?.model ?? config.model);
    if ((request?.model || role?.model || config.model) && !model) {
      return { ok: false, error: `Unsupported Claude SDK model: ${request?.model ?? role?.model ?? config.model}.` };
    }
    try { await config.beforeDispatch?.(); } catch (error) {
      return { ok: false, error: error instanceof Error ? `${"code" in error ? String(error.code) + ": " : ""}${error.message}` : String(error) };
    }
    // Re-checked after the await: a run abort that landed while the basis was
    // being re-observed must stop this agent here, before any SDK session can
    // start. A listener added to an already-aborted signal never fires, so the
    // first check alone let a sibling start after the operator's cancel
    // (wb-a2g.5, live finding init-after-abort).
    if (config.signal?.aborted) return { ok: false, skipped: true, error: "Workflow aborted." };
    const controller = new AbortController();
    const onAbort = () => controller.abort();
    config.signal?.addEventListener("abort", onAbort, { once: true });
    if (config.signal?.aborted) controller.abort();
    controllers.set(agentId, controller);
    const allowedTools = previous?.tools ?? role?.tools ?? tools;
    const effectiveEffort = previous?.effort ?? request?.effort ?? role?.effort;
    const exposed = previous?.capabilities ?? role?.capabilities ?? [];
    const providerTools = exposed.length > 0 && config.capabilities ? createCuratedTools({
      registry: config.capabilities, allowedCapabilities: exposed, grants: config.grants ?? [],
      principal: {id:config.principal?.id ?? "local-operator",role:config.principal?.role ?? request?.agentType ?? "general-purpose"},
      workspace: config.cwd, invocationId: config.invocationId ?? agentId, signal: controller.signal,
      beforeDispatch: config.beforeDispatch,
    }) : undefined;
    const options: Options = {
      cwd: config.cwd,
      abortController: controller,
      settingSources: settings,
      permissionMode: previous?.permissionMode ?? permissionMode,
      permissionPrompts: "none",
      tools: allowedTools,
      ...(providerTools ? {mcpServers:{workbench:providerTools},allowedTools:CLAUDE_CAPABILITY_TOOL_NAMES.map(name => `mcp__workbench__${name}`)} : {}),
      includePartialMessages: true,
      ...(model ? { model } : {}),
      ...(effectiveEffort ? { effort: effectiveEffort as EffortLevel } : {}),
      ...(previous?.systemPrompt ?? role?.prompt ? { systemPrompt: previous?.systemPrompt ?? role?.prompt } : {}),
      ...(request?.schema ? { outputFormat: { type: "json_schema", schema: request.schema.schema } } : {}),
      ...(previous ? { resume: previous.sessionId } : {}),
    };
    let sessionId: string | undefined;
    let actualModel: string | undefined;
    let actualEffort: EffortLevel | undefined;
    let toolCalls = 0;
    let authFailed = false;
    let terminal: SDKMessage & { type: "result" } | undefined;
    let retained = false;
    try {
      const live = query({ prompt, options });
      const liveSeam = interruptSeamOf(live);
      if (liveSeam !== undefined) {
        retained = true;
        config.onQueryLive?.(request ?? previous!.call, liveSeam);
      }
      for await (const message of live) {
        config.onMessage?.(message, request ?? previous!.call);
        if (message.type === "system" && message.subtype === "init") {
          sessionId = message.session_id;
          actualModel = message.model;
          actualEffort = message.effort ?? undefined;
          onResolved?.({ sessionId, modelName: actualModel, modelId: actualModel, ...(actualEffort ? { thinking: actualEffort } : {}) });
        } else if (message.type === "assistant") {
          sessionId ??= message.session_id;
          if (message.error === "authentication_failed") authFailed = true;
          actualModel = message.message.model ?? actualModel;
          if (actualModel) onResolved?.({ ...(sessionId ? { sessionId } : {}), modelName: actualModel, modelId: actualModel });
          for (const block of message.message.content) if (block.type === "tool_use") toolCalls++;
        } else if (message.type === "result") {
          sessionId ??= message.session_id;
          terminal = message;
        }
      }
      if (!terminal) return controller.signal.aborted
        ? { ok: false, skipped: true, error: "Claude SDK query was cancelled.", ...(sessionId ? { sessionId } : {}) }
        : { ok: false, error: "Claude SDK stream ended without a result message.", ...(sessionId ? { sessionId } : {}) };
      const cumulative = usage(terminal);
      const metrics = previous
        ? {
            ...(cumulative.tokens !== undefined ? { tokens: Math.max(0, cumulative.tokens - (previous.cumulativeTokens ?? 0)) } : {}),
            ...(cumulative.outputTokens !== undefined ? { outputTokens: Math.max(0, cumulative.outputTokens - (previous.cumulativeOutputTokens ?? 0)) } : {}),
          }
        : cumulative;
      const common = { ...metrics, ...(sessionId ? { sessionId } : {}), ...(toolCalls ? { toolCalls } : {}) };
      if (controller.signal.aborted) return { ...common, ok: false, skipped: true, error: "Claude SDK query was cancelled." };
      if (terminal.subtype !== "success" || terminal.is_error) {
        if (authFailed) return { ...common, ok: false, error: authRequiredError(terminal.subtype === "success" ? terminal.result : terminal.errors.join("; ") || terminal.subtype) };
        return { ...common, ok: false, error: outcomeText(terminal.subtype === "success" ? terminal.result : terminal.errors.join("; ") || terminal.subtype) };
      }
      if (!sessionId) return { ...common, ok: false, error: "Claude SDK succeeded without a session ID." };
      if (previous && sessionId !== previous.sessionId) {
        return { ...common, ok: false, error: `Claude SDK resume session mismatch: expected ${previous.sessionId}, got ${sessionId}.` };
      }
      let text = terminal.result;
      if (request?.schema) {
        if (terminal.structured_output === undefined) {
          return { ...common, ok: false, error: "Claude SDK result is missing structured_output." };
        }
        const verdict = request.schema.check(terminal.structured_output);
        if (verdict !== true) return { ...common, ok: false, error: `Claude SDK structured output did not match schema: ${verdict}` };
        text = JSON.stringify(terminal.structured_output);
      }
      sessions.set(agentId, {
        call: request ?? previous!.call,
        sessionId, ...(actualModel ?? model ? { model: actualModel ?? model } : {}),
        ...(actualEffort ?? effectiveEffort ? { effort: (actualEffort ?? effectiveEffort) as EffortLevel } : {}),
        permissionMode: options.permissionMode ?? "dontAsk", tools: [...allowedTools], capabilities: [...exposed],
        ...(options.systemPrompt && typeof options.systemPrompt === "string" ? { systemPrompt: options.systemPrompt } : {}),
        ...(cumulative.tokens !== undefined ? { cumulativeTokens: cumulative.tokens } : {}),
        ...(cumulative.outputTokens !== undefined ? { cumulativeOutputTokens: cumulative.outputTokens } : {}),
      });
      onResolved?.({ sessionId, modelName: actualModel ?? model, modelId: actualModel ?? model });
      return { ...common, ok: true, text, sessionId };
    } catch (error) {
      if (controller.signal.aborted) {
        return { ok: false, skipped: true, error: "Claude SDK query was cancelled.", ...(sessionId ? { sessionId } : {}) };
      }
      if (authFailed) return { ok: false, error: authRequiredError(error instanceof Error ? error.message : String(error)), ...(sessionId ? { sessionId } : {}) };
      return { ok: false, error: `Claude SDK query failed: ${outcomeText(error instanceof Error ? error.message : String(error))}`, ...(sessionId ? { sessionId } : {}) };
    } finally {
      config.signal?.removeEventListener("abort", onAbort);
      controllers.delete(agentId);
      if (retained) config.onQueryDone?.(request ?? previous!.call);
    }
  }

  return {
    // Settled-agent prefix replay is safe here because every entry carries
    // this host's policy basis, and SDK node effects are admitted per journaled
    // effect class rather than replayed the way agents are.
    replaySafe: true,
    replayBasis,
    async spawnAgent(request) {
      const result = await invoke(request.agentId, request.prompt, request, undefined, request.onResolved);
      config.onSettled?.(result, request);
      return result;
    },
    abortAgent(agentId) {
      controllers.get(agentId)?.abort();
      if (sessions.has(agentId) && !controllers.has(agentId)) pendingLookupAborts.add(agentId);
    },
    async resumeAgent(agentId, prompt, onResolved) {
      const previous = sessions.get(agentId);
      if (!previous) return { ok: false, error: `Cannot resume unknown Claude SDK session for ${agentId}.` };
      pendingLookupAborts.delete(agentId);
      const saved = await getSession(previous.sessionId, { dir: config.cwd });
      if (pendingLookupAborts.delete(agentId) || config.signal?.aborted) {
        return { ok: false, skipped: true, error: "Claude SDK resume cancelled before query start." };
      }
      if (!saved || saved.sessionId !== previous.sessionId) {
        return { ok: false, error: `Claude SDK session ${previous.sessionId} is unavailable; refusing fresh-context resume.` };
      }
      const result = await invoke(agentId, prompt, undefined, previous, onResolved);
      config.onSettled?.(result, previous.call);
      return result;
    },
    loadWorkflow(ref: WorkflowScriptRef) { return resolveWorkflowSource(ref, config.cwd); },
    ...(config.capabilities ? {
      callNode: async (request: WorkflowNodeRequest) => {
        await config.beforeDispatch?.();
        return config.capabilities!.invoke(request.capabilityId, request.input, {
          grants: config.grants ?? [], signal: request.signal,
          invocationId: config.invocationId,
          principal: config.principal, workspace: config.cwd,
          callId: String(request.callId),
        });
      },
      // Host-side policy lookup, not script-facing discovery: the host owns
      // this registry, and the journal needs the descriptor's effect class at
      // invoke time so a resume can admit a read replay and refuse the rest.
      // The synthesized grant never reaches the script.
      describeNodeEffect: (capabilityId: string) =>
        config.capabilities!.discover({ grants: [`discover:${capabilityId}`] })[0]?.effectClass,
    } : {}),

  };
}
