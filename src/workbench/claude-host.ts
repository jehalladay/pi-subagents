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
import { type CapabilityDiagnostic, CapabilityError, type CapabilityRegistry, type JsonValue } from "./capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "./claude-capability-tools.js";
import { type HyperUnixObservedRelation, type HyperUnixProjectionTopology, hyperunixTopology } from "./hyperunix-observer.js";
import type { NativeRef, NativeSnapshot, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "./redaction.js";
import { type ClaudeReplayDependencies, replayDependenciesMeasured } from "./replay-dependencies.js";

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
  /**
   * wb-413a (EAT-R017..EAT-R020): the source, instruction and provider readings of replay-dependencies.ts, three
   * dependencies an answer has beyond its payload and the policy above. They join the replay basis as its ninth
   * element, so a recorded agent answer is not reused under a changed reading and a journaled read runs live under one,
   * and while any reading is not measured with a well-formed digest the host permits no settled replay at all, neither
   * of an agent answer nor of a journaled node read. Absent, the basis is the eight policy elements alone.
   */
  replayDependencies?: ClaudeReplayDependencies;
  /**
   * wb-79k.1 (W13/VC-2): the live observation seam of node values. A hyperunix.find value a node call returns is projected by
   * the landed hyperunixTopology and applied through the embedding host's own refresh and relate (observeNodeValue below), every
   * input of its context the host's own. Absent, node values are returned unobserved, exactly as before.
   */
  observation?: ClaudeNodeObservation;
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

/** wb-79k.1: the capability whose returned value the node seam observes. */
const HYPERUNIX_FIND = "hyperunix.find";
/** The diagnostics an outcome carries at most: the adapter's own cap (hyperunix-observer.ts MAX_DIAGNOSTICS). */
const OBSERVED_DIAGNOSTICS = 8;
/** A refusal message's display bound: the adapter's own diagnostic bound (hyperunix-observer.ts DIAGNOSTIC). */
const REFUSAL_TEXT = 200;

/**
 * wb-79k.1 (W13/VC-2): the live projection seam of node values, built by the embedding host from what it owns. It hands over two
 * functions and no projection: the host's own refresh and relate over its live projection, so a reading admits its snapshot and
 * states its grouping edge and nothing else - no event, no staleness, no connection state, no read.
 */
export interface ClaudeNodeObservation {
  /** The embedding host's ObservationProjection.refresh, answering exactly as it does. */
  readonly refresh: (snapshot: NativeSnapshot) => "applied" | "out-of-order" | "refused";
  /** The embedding host's ObservationProjection.relate. */
  readonly relate: (statement: HyperUnixObservedRelation) => void;
  /** The authenticated observer scope the embedding host bound for the run. */
  readonly scope: ObservationScope;
  /** The host clock: read at dispatch (the reading's capture time) and at return (its observation time). */
  readonly now: () => string;
  /** Told what observing each hyperunix.find value did; never consulted for the value the node returns. */
  readonly onObserved?: (outcome: ClaudeNodeObservationOutcome) => void;
}

/** What observing one returned hyperunix.find value did (wb-79k.1). */
export interface ClaudeNodeObservationOutcome {
  readonly capabilityId: string;
  readonly callId: number;
  /** refresh's own answer for the reading's snapshot, or "diagnostic" when the adapter or the projection refused it (nothing projected). */
  readonly result: "applied" | "out-of-order" | "refused" | "diagnostic";
  /** The edges stated with relate: the adapter's grouping edge, stated only once its snapshot applied. */
  readonly related: number;
  /** The adapter's own bounded diagnostics, or the one sanitized refusal message; at most OBSERVED_DIAGNOSTICS. */
  readonly diagnostics: readonly string[];
  /** The typed refusal: always with "diagnostic", and beside "applied" when relate refused the edge of a snapshot that applied. */
  readonly refusal?: CapabilityDiagnostic;
}

/** One returned node value as the seam observes it: the call, the run it belongs to and the host clock's reading at dispatch. */
interface ObservedNodeCall {
  readonly capabilityId: string;
  readonly callId: number;
  readonly input: unknown;
  readonly invocationId?: string;
  readonly dispatchedAt: string;
}

const recordOf = (value: unknown): Readonly<Record<string, unknown>> | undefined =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;

/** The host clock read once; a clock that throws reads as no instant, which the adapter refuses as a typed diagnostic. */
function clockReading(now: () => string): string {
  try {
    return now();
  } catch {
    return "";
  }
}

/** The query the host issued, read from the node input the registry validated: the result itself names no query. */
function issuedQuery(input: unknown): { kind: string; root?: string } {
  const read = recordOf(input);
  return { kind: typeof read?.kind === "string" ? read.kind : "", ...(typeof read?.root === "string" ? { root: read.root } : {}) };
}

/**
 * The invoking node call as the run's projection names it: src/index.ts's onProgress keys a node call on the producer's own id
 * when the runtime's nativeEvidence reads one from the value (for hyperunix.find a non-empty source.execution_id, under provider
 * "hyperunix" and type "operation"), else on the run and the call, so the grouping edge starts at that same node.
 */
function invokingNode(invocationId: string, callId: number, value: JsonValue): NativeRef {
  const executionId = recordOf(recordOf(value)?.source)?.execution_id;
  return typeof executionId === "string" && executionId.length > 0
    ? { provider: "hyperunix", type: "operation", id: executionId }
    : { provider: "pi-workflow", type: "node-call", id: `${invocationId}:${callId}` };
}

/** A refusal as its typed diagnostic: a CapabilityError's own category ("validation" for any other throw), its message through the one helper. */
function refusalOf(error: unknown): CapabilityDiagnostic {
  const message = sanitizeWorkbenchText(error instanceof Error ? error.message : String(error), REFUSAL_TEXT, "label");
  return { name: "CapabilityError", category: error instanceof CapabilityError ? error.category : "validation", message };
}

/**
 * wb-79k.1 (W13/VC-2): a returned hyperunix.find value projected by the landed hyperunixTopology (hyperunix-observer.ts, unchanged)
 * under a context of host-owned values only - the bound scope, the host clock read at dispatch (capturedAt) and at return
 * (observedAt), the run's invocation id and the invoking node call - and its frozen result applied as it is: the snapshot through
 * refresh, then, once it applied, the grouping edge through relate. An adapter refusal or a refresh that throws is a typed
 * diagnostic with nothing projected; a partial or failed reading stays exactly as the adapter reads it.
 */
function observeHyperUnixValue(observation: ClaudeNodeObservation, call: ObservedNodeCall, value: JsonValue): ClaudeNodeObservationOutcome {
  const base = { capabilityId: call.capabilityId, callId: call.callId };
  let topology: HyperUnixProjectionTopology;
  try {
    topology = hyperunixTopology(value, {
      scope: { workspace: observation.scope.workspace, principal: observation.scope.principal },
      target: issuedQuery(call.input),
      capturedAt: call.dispatchedAt,
      observedAt: clockReading(observation.now),
      ...(call.invocationId !== undefined ? { invocationId: call.invocationId, operationRef: invokingNode(call.invocationId, call.callId, value) } : {}),
    });
  } catch (error) {
    const refusal = refusalOf(error);
    return { ...base, result: "diagnostic", related: 0, diagnostics: [refusal.message], refusal };
  }
  let result: "applied" | "out-of-order" | "refused" = "applied";
  try {
    for (const snapshot of topology.snapshots) {
      const applied = observation.refresh(snapshot);
      if (applied !== "applied") result = applied;
    }
  } catch (error) {
    const refusal = refusalOf(error);
    return { ...base, result: "diagnostic", related: 0, diagnostics: [refusal.message], refusal };
  }
  // A snapshot the projection did not admit states no edge: nothing is said of a node it holds no reading for.
  if (result !== "applied") return { ...base, result, related: 0, diagnostics: topology.diagnostics };
  let related = 0;
  try {
    for (const relation of topology.relations) {
      observation.relate(relation);
      related++;
    }
  } catch (error) {
    const refusal = refusalOf(error);
    return { ...base, result, related, diagnostics: [...topology.diagnostics.slice(0, OBSERVED_DIAGNOSTICS - 1), refusal.message], refusal };
  }
  return { ...base, result, related, diagnostics: topology.diagnostics };
}

/**
 * wb-79k.1: the one place a node's returned value reaches the live projection. Only a hyperunix.find value is read here; nothing
 * here invokes a capability or holds a grant, and nothing it does reaches the value the node returns: it never throws.
 */
function observeNodeValue(observation: ClaudeNodeObservation, call: ObservedNodeCall, value: JsonValue): void {
  if (call.capabilityId !== HYPERUNIX_FIND) return;
  const outcome = observeHyperUnixValue(observation, call, value);
  try {
    observation.onObserved?.(outcome);
  } catch {
    // The listener is told what happened; what it does never reaches the node's value.
  }
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
   * The basis an agent answer is replayed under, beyond its own call payload.
   * Journal entries record it, and the runtime replays only under an equal
   * basis, so a changed model pin, permission mode, tool list, role set, grant
   * set or workspace declines the cache (the L4 contract in
   * workbench-host-contract.test.ts). Per-run identity — invocationId, signal,
   * observers — is deliberately not part of it. Readings the embedding host
   * supplies (replayDependencies) follow the eight policy elements as one ninth
   * element, {source, instructions, provider} in that order, each reading as
   * supplied (wb-413a).
   */
  const dependencies = config.replayDependencies;
  const replayBasis = JSON.stringify([
    config.cwd,
    config.model ?? null,
    permissionMode,
    settings,
    tools,
    config.roles ?? null,
    config.grants ?? null,
    config.principal ?? null,
    ...(dependencies === undefined ? [] : [{ source: dependencies.source, instructions: dependencies.instructions, provider: dependencies.provider }]),
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
    // effect class rather than replayed the way agents are. A reading that is
    // not measured with a well-formed digest declines replay outright, agent
    // answers and node reads alike (wb-413a).
    replaySafe: dependencies === undefined || replayDependenciesMeasured(dependencies),
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
        const observation = request.capabilityId === HYPERUNIX_FIND ? config.observation : undefined;
        // wb-79k.1: the host clock at dispatch dates the reading, so a capture time is never later than the read it dates.
        const dispatchedAt = observation === undefined ? undefined : clockReading(observation.now);
        const value = await config.capabilities!.invoke(request.capabilityId, request.input, {
          grants: config.grants ?? [], signal: request.signal,
          invocationId: config.invocationId,
          principal: config.principal, workspace: config.cwd,
          callId: String(request.callId),
        });
        if (observation !== undefined && dispatchedAt !== undefined) {
          observeNodeValue(observation, {
            capabilityId: request.capabilityId, callId: request.callId, input: request.input, dispatchedAt,
            ...(config.invocationId !== undefined ? { invocationId: config.invocationId } : {}),
          }, value);
        }
        return value;
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
