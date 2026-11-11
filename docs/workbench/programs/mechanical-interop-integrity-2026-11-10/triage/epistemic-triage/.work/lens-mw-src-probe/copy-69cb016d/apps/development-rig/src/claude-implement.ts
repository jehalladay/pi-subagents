/**
 * Optional Claude Agent SDK integration. It is intentionally provider-specific and
 * lives in the app, never in @mechanical/workflows-development.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { CLAUDE_AGENT_SDK_NAME, readSdkIdentity, settingsSha256, type SdkIdentity } from "./invocation-identity.js";

/**
 * The effective agent configuration handed to the SDK, copied from the very object the SDK
 * received. App-local replay identity only: not a cross-host replay authority.
 */
export interface AgentReplayConfiguration {
  readonly allowedTools: readonly string[];
  readonly permissionMode: string;
  readonly settingSources: readonly string[];
  readonly model: string | null;
  readonly maxTurns: number;
  readonly maxBudgetUsd: number;
}
export interface AgentReplayIdentity {
  /** Lowercase hex SHA-256 of the UTF-8 bytes of the exact prompt string passed to query(). */
  readonly promptSha256: string;
  readonly configuration: AgentReplayConfiguration;
  /** SHA-256 of the canonical serialization of `configuration`; independent of key order, whitespace and checkout path. Absent on a runner that predates the axis; the host then recomputes it. */
  readonly settingsSha256?: string;
  /** Installed SDK identity read from its manifest bytes; null (or absent on an older runner) when none was readable, never fabricated. */
  readonly sdk?: SdkIdentity | null;
}
export interface AgentImplementation {
  readonly sessionId: string;
  readonly summary: string;
  readonly turns: number | null;
  readonly costUsd: number | null;
  /** Absent when the runner reports no identity; the host never fabricates one. */
  readonly replay?: AgentReplayIdentity;
}
export interface AgentOptions {
  readonly model?: string;
  readonly maxTurns?: number;
  readonly maxBudgetUsd?: number;
  /**
   * Host-provided cancellation. Honoured as a pre-dispatch barrier and as a stream stop: a signal already
   * aborted before the first provider side effect dispatches nothing. While a session runs, the
   * signal is forwarded into the SDK through its public options.abortController (EAT-R014); the
   * stream also stops, and the run surfaces as AGENT_ABORTED_DURING_RUN carrying the last seen
   * session id; developLive turns it into typed uncertainty.
   */
  readonly signal?: AbortSignal;
  /**
   * Progress observer (EAT-R015): called at most once, when the session stream first shows an Edit or Write tool use.
   * It never reaches the SDK query options, and a throwing observer cannot fail the session.
   */
  readonly onFirstEdit?: () => void;
}
export const CANCELLED_BEFORE_DISPATCH =
  "DEVELOPMENT_CANCELLED_BEFORE_DISPATCH: host abort was signalled before any agent dispatch; nothing was started, written, committed or gated";
/** Typed refusal for an abort observed before the first provider side effect; claims no rollback. */
export function assertNotCancelledBeforeDispatch(signal: AbortSignal | undefined): void {
  if (signal?.aborted) throw new Error(CANCELLED_BEFORE_DISPATCH);
}
export type AgentRun = (workspaceRoot: string, prompt: string, options: AgentOptions) => Promise<AgentImplementation>;

type AgentQuery = (input: {
  prompt: string;
  options: {
    cwd: string;
    allowedTools: string[];
    permissionMode: "dontAsk";
    settingSources: [];
    maxTurns: number;
    maxBudgetUsd: number;
    model?: string;
    abortController?: AbortController;
  };
}) => AsyncIterable<unknown>;

/** True when a stream message is an assistant turn that uses the Edit or Write tool. */
function showsEditToolUse(message: Record<string, unknown> | null): boolean {
  if (message?.["type"] !== "assistant") return false;
  const content = record(message["message"])?.["content"];
  if (!Array.isArray(content)) return false;
  return content.some(block => { const b = record(block); return b?.["type"] === "tool_use" && (b["name"] === "Edit" || b["name"] === "Write"); });
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function defaultLoadSdk(): Promise<unknown> {
  const moduleName: string = "@anthropic-ai/claude-agent-sdk";
  return import(moduleName);
}

/** Reads the installed SDK manifest text; null when the package cannot be located (an injected test SDK, say). */
export async function defaultReadSdkManifest(): Promise<string | null> {
  const require = createRequire(import.meta.url);
  try { return readFileSync(require.resolve(CLAUDE_AGENT_SDK_NAME + "/package.json"), "utf8"); } catch { /* exports map may hide it */ }
  try {
    let dir = dirname(require.resolve(CLAUDE_AGENT_SDK_NAME));
    for (let depth = 0; depth < 8; depth++) {
      try {
        const text = readFileSync(join(dir, "package.json"), "utf8");
        if (record(JSON.parse(text))?.["name"] === CLAUDE_AGENT_SDK_NAME) return text;
      } catch { /* keep walking up */ }
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  } catch { /* not installed */ }
  return null;
}

/**
 * A real Claude Agent SDK session. A successful model response by itself does NOT
 * establish a successful source change; Git checks in the caller do that.
 */
export async function runClaudeImplementation(
  workspaceRoot: string,
  prompt: string,
  options: AgentOptions,
  loadSdk: () => Promise<unknown> = defaultLoadSdk,
  readSdkManifest: () => Promise<string | null> = defaultReadSdkManifest,
): Promise<AgentImplementation> {
  assertNotCancelledBeforeDispatch(options.signal);
  let sdk: unknown;
  try { sdk = await loadSdk(); }
  catch { throw new Error("CLAUDE_AGENT_SDK_NOT_INSTALLED: install @anthropic-ai/claude-agent-sdk into development-rig"); }
  const query = record(sdk)?.["query"];
  if (typeof query !== "function") throw new Error("CLAUDE_AGENT_SDK_INCOMPATIBLE: query() not found");
  const agentQuery = query as AgentQuery;
  // The SDK axis comes from the installed manifest bytes, read before any dispatch.
  const manifestText = await readSdkManifest();
  const sdkIdentity = manifestText === null ? null : readSdkIdentity(manifestText);
  // EAT-R014: the host signal reaches the SDK session through its public abort control. The controller
  // exists only when the host supplied a signal, so a signal-free run hands the SDK the unchanged options.
  const sdkAbort = options.signal ? new AbortController() : null;
  const forwardAbort = (): void => { sdkAbort?.abort(options.signal?.reason); };
  const config = {
    cwd: workspaceRoot,
    // Restrict the first cut to file reads/edits and Git commit commands.
    allowedTools: ["Read", "Glob", "Grep", "Edit", "Write", "Bash(git status *)", "Bash(git add *)", "Bash(git commit *)"],
    permissionMode: "dontAsk" as const,
    settingSources: [] as [],
    maxTurns: options.maxTurns ?? 30,
    maxBudgetUsd: options.maxBudgetUsd ?? 10,
    ...(options.model ? { model: options.model } : {}),
    ...(sdkAbort ? { abortController: sdkAbort } : {}),
  };
  // Identity is captured from the values handed to the SDK, before the query runs, as a detached copy.
  const configuration: AgentReplayConfiguration = {
    allowedTools: [...config.allowedTools],
    permissionMode: config.permissionMode,
    settingSources: [...config.settingSources],
    model: config.model ?? null,
    maxTurns: config.maxTurns,
    maxBudgetUsd: config.maxBudgetUsd,
  };
  const replay: AgentReplayIdentity = {
    promptSha256: createHash("sha256").update(prompt, "utf8").digest("hex"),
    configuration,
    settingsSha256: settingsSha256(configuration),
    sdk: sdkIdentity,
  };
  let terminal: Record<string, unknown> | null = null;
  // Last native session id seen on the stream, kept only so a host abort can name the session it interrupted.
  let seenSessionId: string | null = null;
  let firstEditSeen = false;
  const interrupted = (cause?: unknown): Error => Object.assign(new Error(
    "AGENT_ABORTED_DURING_RUN: host abort observed while the agent session ran; the session may have written or committed, no rollback was attempted" +
    (cause instanceof Error ? " (" + cause.message + ")" : "")), { sessionId: seenSessionId });
  options.signal?.addEventListener("abort", forwardAbort, { once: true });
  if (options.signal?.aborted) forwardAbort(); // aborted while the SDK module loaded: still reaches the session
  try {
    for await (const message of agentQuery({ prompt, options: config })) {
      const obj = record(message);
      const id = obj?.["session_id"];
      if (typeof id === "string" && id.trim() !== "") seenSessionId = id;
      if (obj?.["type"] === "result") terminal = obj;
      if (!firstEditSeen && showsEditToolUse(obj)) {
        firstEditSeen = true;
        try { options.onFirstEdit?.(); } catch { /* observer only: a progress callback never decides the run */ }
      }
      // Leaving the loop closes the SDK iterator; nothing already written is cleaned up.
      if (options.signal?.aborted) throw interrupted();
    }
  } catch (error) {
    if (options.signal?.aborted && !(error instanceof Error && error.message.startsWith("AGENT_ABORTED_DURING_RUN: "))) throw interrupted(error);
    throw error;
  } finally {
    // A signal aborted after the run settled must not reach this finished session's controller.
    options.signal?.removeEventListener("abort", forwardAbort);
  }
  if (!terminal || terminal["subtype"] !== "success" || terminal["is_error"] === true) {
    throw new Error("AGENT_OUTCOME_NOT_ESTABLISHED: Claude Agent SDK did not report a successful terminal result");
  }
  const sessionId = terminal["session_id"];
  if (typeof sessionId !== "string" || sessionId.trim() === "") {
    throw new Error("AGENT_SESSION_ID_UNAVAILABLE: no attributable terminal session ID");
  }
  return {
    sessionId,
    summary: typeof terminal["result"] === "string" ? terminal["result"].slice(0, 4000) : "",
    turns: typeof terminal["num_turns"] === "number" ? terminal["num_turns"] : null,
    costUsd: typeof terminal["total_cost_usd"] === "number" ? terminal["total_cost_usd"] : null,
    replay,
  };
}
