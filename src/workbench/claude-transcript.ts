/** Bounded native Claude Agent SDK transcript reader for the Pi inspector. */
import { getSessionMessages, type SDKMessage, type SessionMessage } from "@anthropic-ai/claude-agent-sdk";

import type { ClaudeNativeObservation } from "../workflow/progress.js";
import type { WorkflowSpawnResult } from "../workflow/runtime.js";
import type { ClaudeCallIdentity } from "./claude-host.js";
import { sanitizeWorkbenchText } from "./redaction.js";

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
      // The evidence identity names only a frame the bounded transcript read can return: user and assistant rows. Stream
      // events, results and system frames carry uuids too, but getSessionMessages never returns them as rows (wb-idq).
      if ((message.type === "user" || message.type === "assistant") && "uuid" in message) snapshot.lastMessageId = message.uuid;
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
/** The first window of a row's text the helper reads; it grows only while the helper's output is too short to fill the row clip. */
export const CLAUDE_TRANSCRIPT_PREBOUND_CHARS = 8192;
const PREBOUND_GROWTH = 4;
/** Closes a quoted assignment value the window cut open, so the helper redacts it whole as it does with the rest of the text. */
const WINDOW_CLOSERS = "\"'";

/** The session reader seam; production passes the SDK function, tests inject a fixture. */
export type ClaudeSessionReader = (sessionId: string, options?: { dir?: string; limit?: number }) => Promise<SessionMessage[]>;

export interface ClaudeTranscriptRow {
  type: "user" | "assistant" | "system";
  uuid: string;
  text: string;
  /** Present, and only ever `true`, when the row bound cut the text (wb-idq truncation honesty); an uncut row has no such key. */
  clipped?: true;
}

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

/** Clip to the row bound on a code-point boundary, so a clipped row never ends in half of a surrogate pair, and say whether it cut. */
function clipRow(text: string): { text: string; clipped: boolean } {
  if (text.length <= CLAUDE_TRANSCRIPT_ROW_CHARS) return { text, clipped: false };
  const last = text.charCodeAt(CLAUDE_TRANSCRIPT_ROW_CHARS - 1);
  return { text: text.slice(0, last >= 0xd800 && last <= 0xdbff ? CLAUDE_TRANSCRIPT_ROW_CHARS - 1 : CLAUDE_TRANSCRIPT_ROW_CHARS), clipped: true };
}

/**
 * SITE 21 of the wb-952 census: the row text through the ONE shared display helper with its NAMED "lines" layout
 * (transcript-class bodies), unbounded, then the row clip. The helper redacts over every reading of every gap before it
 * renders any of them, so nothing is deleted before redaction has read it; LF row structure survives and every other
 * unsafe unit is dropped. No local pre-pass: deleting or rewriting a unit here first would glue tokens the helper must see.
 *
 * The helper reads a straddle-safe window, not the whole SDK text (wb-ig7). The window is a prefix of the raw text, so the
 * helper still precedes the clip and nothing is stripped first. A window whose output is shorter than the row clip plus the
 * closers (dense deletions, or a redaction that swallowed the cut) is widened and read again, so a unit or a credential
 * the cut straddles is never what the row shows. WINDOW_CLOSERS ends a quoted value the cut left open. Past the last
 * widening the whole text is read, exactly as before the bound. The clipped flag (wb-idq) is set by clipRow alone: a
 * widened window that still fills the row bound holds more raw text than it shows, so that cut is a real cut.
 */
function displayText(raw: string): string {
  for (let bound = CLAUDE_TRANSCRIPT_PREBOUND_CHARS; bound < raw.length; bound *= PREBOUND_GROWTH) {
    const shown = sanitizeWorkbenchText(`${raw.slice(0, bound)}${WINDOW_CLOSERS}`, Number.MAX_SAFE_INTEGER, "lines");
    if (shown.length >= CLAUDE_TRANSCRIPT_ROW_CHARS + WINDOW_CLOSERS.length) return shown;
  }
  return sanitizeWorkbenchText(raw, Number.MAX_SAFE_INTEGER, "lines");
}

function summary(message: SessionMessage): { text: string; clipped: boolean } {
  return clipRow(displayText(rawText(message)));
}

/**
 * SDK session_id only; never reinterpret it as a Pi AgentRecord id. The bounded window is the TAIL of the conversation
 * chain (wb-idq): the rows a host lists as evidence are the newest ones, and the SDK counts its own limit and offset from the
 * START, so the whole chain is read and the last `limit` rows (1..CLAUDE_TRANSCRIPT_MAX_ROWS) are kept.
 */
export async function readClaudeTranscript(
  sessionId: string,
  cwd: string,
  limit = 40,
  read: ClaudeSessionReader = getSessionMessages,
): Promise<ClaudeTranscriptRow[]> {
  const bounded = Math.min(Math.max(1, limit), CLAUDE_TRANSCRIPT_MAX_ROWS);
  const messages = await read(sessionId, { dir: cwd });
  // uuid and type pass through untouched; only the text is sanitized (see summary). A cut row says so, and only a cut row.
  return messages.slice(-bounded).map(message => {
    const { text, clipped } = summary(message);
    return { type: message.type, uuid: message.uuid, text, ...(clipped ? { clipped: true as const } : {}) };
  });
}
