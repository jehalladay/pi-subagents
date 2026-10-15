/** Bounded native Claude Agent SDK transcript reader for the Pi inspector. */
import { getSessionMessages, type SDKMessage, type SessionMessage } from "@anthropic-ai/claude-agent-sdk";

import type { ClaudeNativeObservation } from "../workflow/progress.js";
import type { WorkflowSpawnResult } from "../workflow/runtime.js";
import type { ClaudeCallIdentity } from "./claude-host.js";
import { redactWorkbenchText, stripUnsafeText } from "./redaction.js";

/** At most 64 sampled snapshots per call plus its terminal acknowledgement. */
export function createClaudeObserver(emit: (call: ClaudeCallIdentity, snapshot: ClaudeNativeObservation) => void) {
  const calls = new Map<string, { snapshot: ClaudeNativeObservation; emitted: number; lastEmit: number; sawResult: boolean }>();
  function state(call: ClaudeCallIdentity) {
    let entry = calls.get(call.agentId);
    if (!entry) {
      entry = { snapshot: { provider: "claude-agent-sdk", observedMessages: 0, assistantCharacters: 0, tools: [], toolsTruncated: false, freshness: "current" }, emitted: 0, lastEmit: 0, sawResult: false };
      calls.set(call.agentId, entry);
    }
    return entry;
  }
  function publish(call: ClaudeCallIdentity, entry: ReturnType<typeof state>) {
    emit(call, { ...entry.snapshot, tools: entry.snapshot.tools.map(tool => ({ ...tool })) });
    entry.emitted++;
    entry.lastEmit = Date.now();
  }
  function tool(snapshot: ClaudeNativeObservation, id: string, name: string, status: ClaudeNativeObservation["tools"][number]["state"]) {
    const old = snapshot.tools.find(item => item.toolUseId === id);
    if (old) { old.state = status; return; }
    if (snapshot.tools.length === 16) { snapshot.tools.shift(); snapshot.toolsTruncated = true; }
    snapshot.tools.push({ toolUseId: id.slice(0, 200), name: name.slice(0, 80), state: status });
  }
  return {
    onMessage(message: SDKMessage, call: ClaudeCallIdentity) {
      const entry = state(call);
      const snapshot = entry.snapshot;
      snapshot.observedMessages++;
      if ("session_id" in message) snapshot.sessionId = message.session_id;
      if ("uuid" in message) snapshot.lastMessageId = message.uuid;
      let semantic = false;
      if (message.type === "system" && message.subtype === "init") semantic = true;
      if (message.type === "stream_event" && message.event.type === "content_block_delta" && message.event.delta.type === "text_delta") {
        snapshot.assistantCharacters += message.event.delta.text.length;
      }
      if (message.type === "assistant") for (const block of message.message.content) {
        if (block.type === "tool_use") { tool(snapshot, block.id, block.name, "started"); semantic = true; }
      }
      if (message.type === "user" && Array.isArray(message.message.content)) for (const block of message.message.content) {
        if (block.type === "tool_result") {
          const known = snapshot.tools.find(item => item.toolUseId === block.tool_use_id);
          tool(snapshot, block.tool_use_id, known?.name ?? "unknown", block.is_error ? "failed" : "completed"); semantic = true;
        }
      }
      if (message.type === "system" && message.subtype === "permission_denied") { tool(snapshot, message.tool_use_id, message.tool_name, "refused"); semantic = true; }
      if (message.type === "result") {
        entry.sawResult = true;
        for (const denied of message.permission_denials ?? []) {
          tool(snapshot, denied.tool_use_id, denied.tool_name, "refused"); semantic = true;
        }
      }
      // Tokens and tool bodies stay in the native transcript, not the overview.
      if (entry.emitted < 64 && (semantic || Date.now() - entry.lastEmit >= 250)) publish(call, entry);
    },
    onSettled(result: WorkflowSpawnResult, call: ClaudeCallIdentity) {
      const entry = state(call);
      entry.snapshot.sessionId ??= result.sessionId;
      entry.snapshot.terminal = result.ok ? "succeeded" : result.skipped ? "cancelled" : !entry.sawResult && entry.snapshot.observedMessages > 0 ? "observation_lost" : "failed";
      if (entry.snapshot.terminal === "observation_lost") entry.snapshot.freshness = "unknown";
      publish(call, entry);
      calls.delete(call.agentId);
    },
  };
}

export const CLAUDE_TRANSCRIPT_ROW_CHARS = 500;
export const CLAUDE_TRANSCRIPT_MAX_ROWS = 100;

/** The session reader seam; production passes the SDK function, tests inject a fixture. */
export type ClaudeSessionReader = (sessionId: string, options?: { dir?: string; limit?: number }) => Promise<SessionMessage[]>;

export interface ClaudeTranscriptRow {
  type: "user" | "assistant" | "system";
  uuid: string;
  text: string;
}

/** Upper bound on text scanned per row, so one huge message cannot make redaction cost unbounded. */
const CLAUDE_TRANSCRIPT_SCAN_CHARS = CLAUDE_TRANSCRIPT_ROW_CHARS * 64;
/** Zero-width and default-ignorable code points that could split a credential prefix; deleted, never spaced. */
const INVISIBLE_TEXT = /͏|[᠋-᠏]|[︀-️]|[­ᅟᅠ឴឵​-‏⁠-⁯ㅤ﻿ﾠ]/g;
/** Whitespace controls become one space so neighbouring words never fuse. */
const WHITESPACE_CONTROLS = /[\t\v\f\r\u0085\u2028\u2029]/g;

function rawText(message: SessionMessage): string {
  const payload = message.message;
  if (!payload || typeof payload !== "object") return "(no text)";
  const content = (payload as { content?: unknown }).content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "(no text)";
  return content
    .filter((part): part is { type: "text"; text: string } =>
      typeof part === "object" && part !== null && part.type === "text" && typeof part.text === "string")
    .map(part => part.text)
    .join("\n") || "(tool or non-text content)";
}

/** Strip per line so LF row structure survives; whitespace controls space out, invisibles and unsafe controls are deleted. */
function stripPerLine(text: string): string {
  return text.split("\n").map(line => stripUnsafeText(line.replace(WHITESPACE_CONTROLS, " ").replace(INVISIBLE_TEXT, ""))).join("\n");
}

/**
 * Transcript-class sanitizer (program rule, wb-dc0.1 respin): redact the WHOLE row
 * text first with separators intact, normalize per line with LF preserved, redact
 * again to catch credentials a control or invisible character had split, then clip.
 * Redaction is idempotent, so the second pass only acts on newly joined tokens.
 */
function summary(message: SessionMessage): string {
  const scanned = rawText(message).slice(0, CLAUDE_TRANSCRIPT_SCAN_CHARS);
  const redacted = redactWorkbenchText(scanned, Number.POSITIVE_INFINITY);
  const normalized = stripPerLine(redacted);
  return redactWorkbenchText(normalized, Number.POSITIVE_INFINITY).slice(0, CLAUDE_TRANSCRIPT_ROW_CHARS);
}

/** SDK session_id only; never reinterpret it as a Pi AgentRecord id. */
export async function readClaudeTranscript(
  sessionId: string,
  cwd: string,
  limit = 40,
  read: ClaudeSessionReader = getSessionMessages,
): Promise<ClaudeTranscriptRow[]> {
  const messages = await read(sessionId, { dir: cwd, limit: Math.min(Math.max(1, limit), CLAUDE_TRANSCRIPT_MAX_ROWS) });
  // Whole-text redaction before any split, then per-line strip (see summary); uuid and type pass through untouched.
  return messages.map(message => ({ type: message.type, uuid: message.uuid, text: summary(message) }));
}
