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
/**
 * How far a window's output must run past the row clip before the row is taken from it: the closers, which render last, and
 * one more character for the gap the cut divides, which renders before them as at most one space where the whole text
 * renders a line break.
 */
const WINDOW_MARGIN = WINDOW_CLOSERS.length + 1;

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

const BEL = 0x07;
const ESC = 0x1b;
const BACKSLASH = 0x5c;
const LEFT_BRACKET = 0x5b;
/** CSI and ST in their 8-bit forms. */
const CSI_8 = 0x9b;
const ST_8 = 0x9c;
/** After ESC, ] P X ^ _ open the string sequences OSC, DCS, SOS, PM and APC. */
const isStringFinal = (code: number): boolean => code === 0x5d || code === 0x50 || code === 0x58 || code === 0x5e || code === 0x5f;
/** The same five string sequences opened in 8-bit form: U+009D, U+0090, U+0098, U+009E and U+009F. */
const isStringIntroducer8 = (code: number): boolean => code === 0x9d || code === 0x90 || code === 0x98 || code === 0x9e || code === 0x9f;

/**
 * The escape sequence a window bound falls strictly inside, as code-unit offsets [start, end) of the raw text, or undefined
 * when the bound sits outside every sequence. A sequence is read both ways the shared helper reads one (redaction.ts, wb-xbq):
 * by UNSAFE_UNIT, where ESC [ or U+009B opens a CSI through its parameter, intermediate and final bytes, and ESC ] P X ^ _ or
 * U+009D U+0090 U+0098 U+009E U+009F opens a string through BEL or ST (ESC \ or U+009C); and by LONE_C1_UNIT, where only ESC
 * opens one and a 7-bit string runs through BEL or ESC \ past any U+009C. A 7-bit string spans to the later of the two
 * readings' ends, so a bound outside every span here is outside every sequence in both. An introducer that no reading
 * terminates is one code point, as it is to the helper, so it never holds a window back.
 */
function straddledSequence(raw: string, bound: number): { start: number; end: number } | undefined {
  // The first BEL or ESC, and the first BEL, ESC or ST, at or after a body's start. Body starts only move forward, so each
  // search resumes where the last one stopped and reads every code unit at most once.
  let stop = -1;
  let stopOrSt = -1;
  const findStop = (from: number): number => {
    if (stop < from) {
      stop = from;
      while (stop < raw.length && raw.charCodeAt(stop) !== BEL && raw.charCodeAt(stop) !== ESC) stop++;
    }
    return stop;
  };
  const findStopOrSt = (from: number): number => {
    if (stopOrSt < from) {
      stopOrSt = from;
      while (stopOrSt < raw.length && raw.charCodeAt(stopOrSt) !== BEL && raw.charCodeAt(stopOrSt) !== ESC && raw.charCodeAt(stopOrSt) !== ST_8) stopOrSt++;
    }
    return stopOrSt;
  };
  /** Where a string sequence opened at `start` ends when its body stops at `at`; start + 1 when it does not terminate there. */
  const stringEnd = (start: number, at: number): number => {
    const code = raw.charCodeAt(at);
    if (code === BEL || code === ST_8) return at + 1;
    return code === ESC && raw.charCodeAt(at + 1) === BACKSLASH ? at + 2 : start + 1;
  };
  /** Where a CSI opened at `start` ends, its parameter bytes from `from`; start + 1 when no final byte follows them. */
  const csiEnd = (start: number, from: number): number => {
    let at = from;
    while (raw.charCodeAt(at) >= 0x30 && raw.charCodeAt(at) <= 0x3f) at++;
    while (raw.charCodeAt(at) >= 0x20 && raw.charCodeAt(at) <= 0x2f) at++;
    const final = raw.charCodeAt(at);
    return final >= 0x40 && final <= 0x7e ? at + 1 : start + 1;
  };
  for (let at = 0; at < bound; at++) {
    const code = raw.charCodeAt(at);
    const next = raw.charCodeAt(at + 1);
    let end = at + 1;
    if (code === ESC && next === LEFT_BRACKET) end = csiEnd(at, at + 2);
    else if (code === ESC && isStringFinal(next)) end = Math.max(stringEnd(at, findStop(at + 2)), stringEnd(at, findStopOrSt(at + 2)));
    else if (code === CSI_8) end = csiEnd(at, at + 1);
    else if (isStringIntroducer8(code)) end = stringEnd(at, findStopOrSt(at + 1));
    if (end > bound) return { start: at, end };
    at = end - 1;
  }
  return undefined;
}

/**
 * SITE 21 of the wb-952 census: the row text through the ONE shared display helper with its NAMED "lines" layout
 * (transcript-class bodies), unbounded, then the row clip. The helper redacts over every reading of every gap before it
 * renders any of them, so nothing is deleted before redaction has read it; LF row structure survives and every other
 * unsafe unit is dropped. No local pre-pass: deleting or rewriting a unit here first would glue tokens the helper must see.
 *
 * The helper reads a window, not the whole SDK text (wb-ig7). The window is a prefix of the raw text, so the helper still
 * precedes the clip and nothing is stripped first, and it never ends inside an escape sequence: a bound that falls inside
 * one moves back to where the sequence starts (straddledSequence), so the helper reads every sequence whole or not at all and
 * no sequence's body or parameter bytes become row text the whole-text read hides. WINDOW_CLOSERS ends a quoted value the
 * cut left open, so a value the cut splits is redacted as the whole-text read redacts it; a cut inside a scheme or key
 * prefix (Bearer, sk-ant-) can show that keyword's first letters where the whole text shows the marker. A window whose output
 * does not pass the row clip by WINDOW_MARGIN is widened and read again, and a window that left a sequence out grows to
 * at least one window past that sequence's end; past the last widening the whole text is read, exactly as before the
 * bound. The clipped flag (wb-idq) is set by clipRow alone: a window that fills the row bound holds more raw text than it
 * shows, so that cut is a real cut.
 */
function displayText(raw: string): string {
  for (let bound = CLAUDE_TRANSCRIPT_PREBOUND_CHARS; bound < raw.length; ) {
    const sequence = straddledSequence(raw, bound);
    const shown = sanitizeWorkbenchText(`${raw.slice(0, sequence ? sequence.start : bound)}${WINDOW_CLOSERS}`, Number.MAX_SAFE_INTEGER, "lines");
    if (shown.length >= CLAUDE_TRANSCRIPT_ROW_CHARS + WINDOW_MARGIN) return shown;
    bound = Math.max(bound * PREBOUND_GROWTH, sequence ? sequence.end + CLAUDE_TRANSCRIPT_PREBOUND_CHARS : 0);
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
