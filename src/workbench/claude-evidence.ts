/**
 * Bounded Claude transcript message evidence (docs/workbench/20 § Producer mapping, the "claude-agent-sdk session"
 * row). A `claude-message:<uuid>` ref listed on an owning Claude session node is resolved by one bounded transcript
 * read, injected as a seam shaped like readClaudeTranscript (never a live SDK call here), and the row is selected by
 * uuid from that window. A uuid outside the window, a failed read and a cancelled read are all transport: the row is
 * never fabricated and the window is never widened past the caller's bound. The exact `claude:transcript` grant is
 * checked against the live grant set before the read and again after it, so a mid-read revocation returns nothing.
 *
 * Preview lines are bounded in count, width and bytes and pass the shared sanitizers (redaction.ts) plus a local
 * zero-width strip; only the sanitized preview and the row's byte size leave this module, never the raw text, the
 * row object or any native error text. It registers nothing, states no verification, changes no node status or tone
 * and leaves the EvidenceLoader/EvidenceStore wrapper (wb-g1g.1) to consume it. An abort stops only this local wait.
 */
import { CapabilityError } from "./capability-registry.js";
import type { ClaudeTranscriptRow } from "./claude-transcript.js";
import type { NativeRef } from "./observation.js";
import { redactWorkbenchText, stripUnsafeText } from "./redaction.js";

export const CLAUDE_EVIDENCE_CONTRACT = "workbench.claude-evidence/v1";
/** The one exact grant string; wildcard, prefix and case spellings never match. */
export const CLAUDE_TRANSCRIPT_GRANT = "claude:transcript";

export interface ClaudeEvidenceDeps {
  /** The live host grant set, re-read before and after the transcript read. */
  grants: () => readonly string[];
  /** The projection node the evidence ref was listed on, with its projection freshness label. */
  owningNode: { nativeRef: NativeRef; evidenceRefs: readonly string[]; freshness: "current" | "stale" | "unknown" };
  /** The bounded transcript read; shaped like readClaudeTranscript. */
  readTranscript: (sessionId: string, cwd: string, limit: number) => Promise<readonly ClaudeTranscriptRow[]>;
  cwd: string;
  /** The window bound handed to the read and never exceeded, 1..100. */
  maxMessages: number;
  /** The preview byte budget, marker included, 64..65536. */
  maxBytes: number;
  /** Preview lines kept, 1..200. */
  maxLines: number;
  signal: AbortSignal;
  /** The caller's clock, read once after the read answers; this module reads no host clock. */
  capturedAt: () => string;
}

/** The docs/20 EvidenceContent shape minus the store-level fields; freshness follows the owning node. */
export interface ClaudeEvidenceContent {
  contract: typeof CLAUDE_EVIDENCE_CONTRACT;
  kind: "claude.message";
  provider: "claude-agent-sdk";
  nativeRef: { provider: "claude-agent-sdk"; type: "message"; id: string };
  capturedAt: string;
  /** UTF-8 size of the selected row's text as the bounded read returned it. */
  bytes: number;
  truncated: boolean;
  preview: readonly string[];
  freshness: "current" | "stale";
}

type Loose = Readonly<Record<string, unknown>>;

const REF = /^claude-message:([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const MAX_MESSAGES = 100;
const MIN_BYTES = 64;
const MAX_BYTES = 65_536;
const MAX_LINES = 200;
/** Characters of one preview line. */
const MAX_LINE = 200;
/** Raw characters of one row ever examined; anything later is never shown. */
const MAX_SCAN = 4_000;
const MARKER = "… truncated (bounded preview)";
const MARKER_BYTES = Buffer.byteLength(MARKER, "utf8");
/** U+200B-U+200D, U+2060 and U+FEFF as an alternation: a class holding the joiner U+200D lints as misleading. */
const ZERO_WIDTH = /​|‌|‍|⁠|﻿/g;
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (field: string): CapabilityError => new CapabilityError("validation", `Claude evidence read refused: invalid ${field}.`);
const denied = (): CapabilityError => new CapabilityError("authorization", `Claude evidence requires the exact ${CLAUDE_TRANSCRIPT_GRANT} grant.`);
const malformed = (): CapabilityError => new CapabilityError("unavailable", "Claude evidence read returned a malformed transcript shape.");
const isRecord = (value: unknown): value is Loose => value !== null && typeof value === "object";
const isCount = (value: unknown, least: number, most: number): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= least && value <= most;

/** At most `length` UTF-16 units, never ending inside a surrogate pair. */
function clip(value: string, length: number): string {
  if (value.length <= length) return value;
  const head = value.slice(0, length);
  const last = head.charCodeAt(head.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? head.slice(0, -1) : head;
}

/** The longest prefix of whole code points that fits `bytes` UTF-8 bytes. */
function clipBytes(value: string, bytes: number): string {
  let used = 0;
  let end = 0;
  for (const point of value) {
    const size = Buffer.byteLength(point, "utf8");
    if (used + size > bytes) break;
    used += size;
    end += point.length;
  }
  return value.slice(0, end);
}

/** One producer line bound for display: redaction, the terminal sanitizer, the zero-width strip, then redaction once
 * more, so a credential an escape or zero-width character split from its scheme cannot reassemble past the first pass
 * (docs/20 owner ruling 2: the double redaction is deliberate and idempotent). Tabs become spaces first. */
function sanitize(raw: string): { text: string; clipped: boolean } {
  const text = redactWorkbenchText(stripUnsafeText(redactWorkbenchText(raw, MAX_SCAN).replace(/\t/g, " ")).replace(ZERO_WIDTH, ""), MAX_SCAN);
  return text.length <= MAX_LINE ? { text, clipped: false } : { text: `${clip(text, MAX_LINE - 1)}…`, clipped: true };
}

function liveGrants(grants: () => readonly string[]): boolean {
  try {
    const granted: unknown = grants();
    return Array.isArray(granted) && granted.includes(CLAUDE_TRANSCRIPT_GRANT);
  } catch {
    return false;
  }
}

/** The one transcript read, raced against the caller's signal. An abort settles the call as transport at once; the
 * read is abandoned and its late answer or failure absorbed here. Native error text is never carried on. */
function launch(deps: ClaudeEvidenceDeps, sessionId: string): Promise<unknown> {
  const { readTranscript, cwd, maxMessages, signal } = deps;
  return new Promise<unknown>((resolve, reject) => {
    const cancel = (): void => reject(new CapabilityError("transport", "Claude evidence read cancelled."));
    signal.addEventListener("abort", cancel, { once: true });
    // Constructing the inner promise turns a synchronous seam throw into a rejected read.
    new Promise<unknown>(settle => settle(readTranscript(sessionId, cwd, maxMessages))).then(
      answer => {
        signal.removeEventListener("abort", cancel);
        resolve(answer);
      },
      () => {
        signal.removeEventListener("abort", cancel);
        reject(new CapabilityError("transport", "Claude transcript read failed."));
      },
    );
  });
}

/** Whole preview, or the budgeted preview with its final marker line when anything was dropped or clipped. */
function shape(lines: readonly { text: string; clipped: boolean }[], scanClipped: boolean, maxLines: number, maxBytes: number): { preview: string[]; truncated: boolean } {
  const total = lines.reduce((sum, line) => sum + Buffer.byteLength(line.text, "utf8"), 0);
  if (!scanClipped && lines.length <= maxLines && !lines.some(line => line.clipped) && total <= maxBytes) {
    return { preview: lines.map(line => line.text), truncated: false };
  }
  // The marker is part of the byte bound, so lines get what it leaves.
  let remaining = maxBytes - MARKER_BYTES;
  const preview: string[] = [];
  for (const line of lines.slice(0, maxLines)) {
    const size = Buffer.byteLength(line.text, "utf8");
    if (size > remaining) {
      const head = clipBytes(line.text, remaining);
      if (head.length > 0) preview.push(head);
      break;
    }
    preview.push(line.text);
    remaining -= size;
  }
  preview.push(MARKER);
  return { preview, truncated: true };
}

export async function readClaudeMessageEvidence(ref: string, deps: ClaudeEvidenceDeps): Promise<ClaudeEvidenceContent> {
  const parsed = typeof ref === "string" ? REF.exec(ref) : null;
  if (!parsed) throw refused("ref");
  const wanted = parsed[1].toLowerCase();

  if (!isRecord(deps)) throw refused("deps");
  const { grants, owningNode, readTranscript, cwd, maxMessages, maxBytes, maxLines, signal, capturedAt } = deps;
  if (typeof grants !== "function") throw refused("grants");
  if (typeof readTranscript !== "function") throw refused("readTranscript");
  if (typeof cwd !== "string" || cwd.length === 0) throw refused("cwd");
  if (!isCount(maxMessages, 1, MAX_MESSAGES)) throw refused("maxMessages");
  if (!isCount(maxBytes, MIN_BYTES, MAX_BYTES)) throw refused("maxBytes");
  if (!isCount(maxLines, 1, MAX_LINES)) throw refused("maxLines");
  if (!isRecord(owningNode) || !isRecord(owningNode.nativeRef) || !Array.isArray(owningNode.evidenceRefs)) throw refused("owningNode");
  if (typeof signal?.aborted !== "boolean" || typeof signal.addEventListener !== "function") throw refused("signal");
  if (typeof capturedAt !== "function") throw refused("capturedAt");

  // Authorization before anything is read: the exact grant, then the owning Claude session.
  if (!liveGrants(grants)) throw denied();
  const owner = owningNode.nativeRef;
  if (owner.provider !== "claude-agent-sdk" || owner.type !== "session" || typeof owner.id !== "string" || owner.id.length === 0) {
    throw new CapabilityError("authorization", "Claude evidence ref is not listed on a Claude session node.");
  }
  if (!owningNode.evidenceRefs.includes(ref)) {
    throw new CapabilityError("authorization", "Claude evidence ref is not listed on its owning session node.");
  }
  if (signal.aborted) throw new CapabilityError("transport", "Claude evidence read cancelled before launch.");

  const answer = await launch(deps, owner.id);
  // A grant revoked while the read was in flight returns nothing.
  if (!liveGrants(grants)) throw denied();
  if (!Array.isArray(answer)) throw malformed();

  // Only the first maxMessages rows are the window; a longer answer is never searched past the bound.
  let selected: Loose | undefined;
  for (const row of answer.slice(0, maxMessages)) {
    if (!isRecord(row) || typeof row.uuid !== "string") throw malformed();
    if (selected === undefined && row.uuid.toLowerCase() === wanted) selected = row;
  }
  if (selected === undefined) {
    throw new CapabilityError("transport", `Claude message is not in the bounded transcript window of ${maxMessages} messages.`);
  }
  const { text, uuid } = selected;
  if (typeof text !== "string" || typeof uuid !== "string") throw malformed();

  const scanned = clip(text, MAX_SCAN);
  const rows = scanned.length === 0 ? [] : scanned.split(/\r\n|\r|\n/);
  if (rows.length > 0 && rows[rows.length - 1] === "") rows.pop();
  const { preview, truncated } = shape(rows.map(sanitize), scanned.length !== text.length, maxLines, maxBytes);

  const stamp: unknown = capturedAt();
  if (typeof stamp !== "string" || stamp.length > 64 || !ISO_INSTANT.test(stamp) || !Number.isFinite(Date.parse(stamp))) throw refused("capturedAt clock reading");
  return {
    contract: CLAUDE_EVIDENCE_CONTRACT,
    kind: "claude.message",
    provider: "claude-agent-sdk",
    nativeRef: { provider: "claude-agent-sdk", type: "message", id: uuid },
    capturedAt: stamp,
    bytes: Buffer.byteLength(text, "utf8"),
    truncated,
    preview,
    freshness: owningNode.freshness === "current" ? "current" : "stale",
  };
}
