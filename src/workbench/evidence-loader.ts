/**
 * Grant-gated, bounded, lazy resolution of an observed node's evidence references (docs/workbench/20).
 * A reference is only a pointer; nothing here fetches until a host asks, nothing unreadable is invented,
 * and a failed read is a visible `unavailable` entry that never carries preview text.
 */
import { safeWorkflowTerminalText } from "../ui/workflow-card.js";
import { CapabilityError } from "./capability-registry.js";
import type { NativeRef, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const EVIDENCE_CONTRACT = "workbench.evidence-loader/v1";

export type EvidenceUnavailableReason = "no-loader" | "unauthorized" | "transport" | "timeout" | "too-large";
export type EvidenceFreshness = "current" | "stale";

/** The host binds scope and grants; the UI never does. */
export interface EvidenceRequest {
  readonly scope: ObservationScope;
  readonly nativeRef: NativeRef;
  readonly evidenceRef: string;
  readonly maxBytes: number;
  readonly signal: AbortSignal;
}

export interface EvidenceContent {
  readonly kind: string;
  readonly provider: string;
  readonly capturedAt: string;
  readonly bytes: number;
  readonly truncated: boolean;
  readonly preview: readonly string[];
  /** Digest-shaped values only; anything else is dropped. */
  readonly sourceBasis?: string;
  readonly freshness: EvidenceFreshness;
  readonly producerReceipt?: string;
}

export type EvidenceEntry =
  | { readonly state: "not-requested" }
  | { readonly state: "loading" }
  | ({ readonly state: "loaded" } & EvidenceContent)
  | { readonly state: "unavailable"; readonly reason: EvidenceUnavailableReason; readonly freshness?: EvidenceFreshness };

export interface EvidenceLoader {
  readonly provider: string;
  /** Exact-string grant the host must hold, checked live on every load; it is the only authorization decision. */
  readonly requiredGrant: string;
  /** Shape check for a reference inside this producer only; routing keys off nativeRef.provider first. */
  canLoad(evidenceRef: string): boolean;
  load(request: EvidenceRequest): Promise<EvidenceContent>;
}

/** A loader's typed refusal; the reason is the only thing that reaches the entry, never the message. */
export class EvidenceRefusal extends Error {
  constructor(readonly reason: EvidenceUnavailableReason, readonly freshness?: EvidenceFreshness) {
    super(`Evidence ${reason}.`);
    this.name = "EvidenceRefusal";
  }
}

export interface EvidenceStoreOptions {
  readonly loaders: readonly EvidenceLoader[];
  readonly maxEntries: number;
  /** Default per-entry preview budget in UTF-8 bytes; a request may only lower it. */
  readonly maxBytes: number;
  readonly timeoutMs: number;
  /** The scope the host bound this store to. When omitted it binds to the first request's scope. */
  readonly scope?: ObservationScope;
}

export interface EvidenceRequestOptions { readonly maxBytes?: number }

/** Bounded preview geometry: lines kept and characters per kept line. */
export const EVIDENCE_MAX_PREVIEW_LINES = 200;
export const EVIDENCE_LINE_CHARS = 240;
export const EVIDENCE_TRUNCATED_MARK = "[truncated]";

const NOT_REQUESTED: EvidenceEntry = { state: "not-requested" };
const LOADING: EvidenceEntry = { state: "loading" };
const DIGEST = /^(?:[a-z][a-z0-9]{1,15}[:-])?[0-9a-f]{16,128}$/i;
const MAX_RECEIPT_CHARS = 120;

const scopeEquals = (left: ObservationScope, right: ObservationScope): boolean =>
  left.workspace === right.workspace && left.principal === right.principal;
/** Producer-qualified like the projection's own key: scope plus the full native reference plus the evidence reference. */
const cacheKey = (scope: ObservationScope, ref: NativeRef, evidenceRef: string): string =>
  JSON.stringify([scope.workspace, scope.principal, ref.provider, ref.type, ref.scope ?? "", ref.id, evidenceRef]);

interface Slot {
  entry: EvidenceEntry;
  controller?: AbortController;
  pending?: Promise<void>;
}

/**
 * One loader preview entry as display rows (wb-ktf): the shared helper redacts the WHOLE entry exactly once, before it is split
 * or cut to the budget, so a credential whose scheme or key and value straddle a line break is still one credential. Its "lines"
 * layout keeps the row structure (CRLF, CR, NEL, LS and PS each become one LF); every step after this one is per row.
 */
const redactedRows = (entry: string): string[] => sanitizeWorkbenchText(entry, Number.MAX_SAFE_INTEGER, "lines").split("\n");

/** One redacted row to its bounded, terminal-safe chunks, never cut between the two halves of a surrogate pair. */
function safeChunks(row: string): string[] {
  if (row.length === 0) return [""];
  const chunks: string[] = [];
  let at = 0;
  while (at < row.length) {
    let end = Math.min(at + EVIDENCE_LINE_CHARS, row.length);
    if (end < row.length && isHighSurrogate(row.charCodeAt(end - 1))) end -= 1;
    chunks.push(safeWorkflowTerminalText(row.slice(at, end)));
    at = end;
  }
  return chunks;
}

const isHighSurrogate = (unit: number): boolean => unit >= 0xd800 && unit <= 0xdbff;

/** The longest prefix of `text` whose UTF-8 size fits `budget` bytes, cut only on code-point boundaries. */
function prefixWithinBytes(text: string, budget: number): string {
  let used = 0;
  let kept = "";
  for (const codePoint of text) {
    const size = Buffer.byteLength(codePoint);
    if (used + size > budget) break;
    used += size;
    kept += codePoint;
  }
  return kept;
}

/** Fit loader-supplied preview entries inside the byte and line budgets, which count redacted rows; raw payload is never retained. */
function boundPreview(preview: readonly string[], maxBytes: number): { lines: string[]; clipped: boolean } {
  const lines: string[] = [];
  let remaining = maxBytes;
  let clipped = false;
  for (const entry of preview) {
    if (typeof entry !== "string") continue;
    for (const row of redactedRows(entry)) {
      if (remaining <= 0 || lines.length >= EVIDENCE_MAX_PREVIEW_LINES) { clipped = true; break; }
      const size = Buffer.byteLength(row);
      const kept = size > remaining ? prefixWithinBytes(row, remaining) : row;
      if (size > remaining) clipped = true;
      remaining -= Math.min(size, remaining);
      if (kept === "" && size > 0) continue;
      for (const chunk of safeChunks(kept)) {
        if (lines.length >= EVIDENCE_MAX_PREVIEW_LINES) { clipped = true; break; }
        lines.push(chunk);
      }
    }
    if (clipped) break;
  }
  return { lines, clipped };
}

function unavailableFor(error: unknown): EvidenceEntry {
  if (error instanceof EvidenceRefusal) {
    return { state: "unavailable", reason: error.reason, ...(error.freshness !== undefined ? { freshness: error.freshness } : {}) };
  }
  if (error instanceof CapabilityError) {
    const reason: EvidenceUnavailableReason = error.category === "authorization" ? "unauthorized"
      : error.category === "validation" ? "no-loader" : "transport";
    return { state: "unavailable", reason };
  }
  return { state: "unavailable", reason: "transport" };
}

/** Validate and bound one loader result into a loaded entry, or a visible unavailable. Raw error text never enters an entry. */
function admit(loader: EvidenceLoader, content: EvidenceContent, maxBytes: number): EvidenceEntry {
  if (typeof content !== "object" || content === null || !Array.isArray(content.preview)) return { state: "unavailable", reason: "transport" };
  if (!Number.isFinite(content.bytes) || content.bytes < 0 || Number.isNaN(Date.parse(content.capturedAt))) return { state: "unavailable", reason: "transport" };
  const { lines, clipped } = boundPreview(content.preview, maxBytes);
  const truncated = content.truncated === true || clipped || content.bytes > maxBytes;
  const preview = truncated ? [...lines.slice(0, EVIDENCE_MAX_PREVIEW_LINES - 1), EVIDENCE_TRUNCATED_MARK] : lines;
  const receipt = typeof content.producerReceipt === "string" ? safeWorkflowTerminalText(content.producerReceipt.slice(0, MAX_RECEIPT_CHARS)) : "";
  return {
    state: "loaded",
    kind: safeWorkflowTerminalText(String(content.kind)).slice(0, 64),
    provider: loader.provider,
    capturedAt: content.capturedAt,
    bytes: Math.max(content.bytes, preview.reduce((sum, line) => sum + Buffer.byteLength(line), 0)),
    truncated,
    preview,
    ...(typeof content.sourceBasis === "string" && DIGEST.test(content.sourceBasis) ? { sourceBasis: content.sourceBasis } : {}),
    freshness: content.freshness === "stale" ? "stale" : "current",
    ...(receipt !== "" ? { producerReceipt: receipt } : {}),
  };
}

/**
 * Bounded LRU of evidence entries. `get` is synchronous and never loads; `request` loads lazily and
 * never rejects; `abort`/`abortAll` stop only the local read. No projection method and no producer
 * control verb is ever called from here.
 */
export class EvidenceStore {
  private readonly slots = new Map<string, Slot>();
  private bound: ObservationScope | undefined;

  constructor(private readonly options: EvidenceStoreOptions) {
    for (const [name, value] of [["maxEntries", options.maxEntries], ["maxBytes", options.maxBytes], ["timeoutMs", options.timeoutMs]] as const) {
      if (!Number.isInteger(value) || value < 1) throw new RangeError(`EvidenceStore ${name} must be a positive integer.`);
    }
    this.bound = options.scope === undefined ? undefined : { workspace: options.scope.workspace, principal: options.scope.principal };
  }

  private outOfScope(scope: ObservationScope): boolean {
    return this.bound !== undefined && !scopeEquals(this.bound, scope);
  }

  get(scope: ObservationScope, nativeRef: NativeRef, evidenceRef: string): EvidenceEntry {
    // A scope the host did not bind is refused without consulting any loader or cached entry.
    if (this.outOfScope(scope)) return { state: "unavailable", reason: "unauthorized" };
    const key = cacheKey(scope, nativeRef, evidenceRef);
    const slot = this.slots.get(key);
    if (!slot) return NOT_REQUESTED;
    this.slots.delete(key);
    this.slots.set(key, slot);
    return slot.entry;
  }

  request(scope: ObservationScope, nativeRef: NativeRef, evidenceRef: string, options: EvidenceRequestOptions = {}): Promise<void> {
    if (this.outOfScope(scope)) return Promise.resolve();
    this.bound ??= { workspace: scope.workspace, principal: scope.principal };
    const key = cacheKey(scope, nativeRef, evidenceRef);
    const existing = this.slots.get(key);
    if (existing?.entry.state === "loading" && existing.pending) return existing.pending;
    if (existing?.entry.state === "loaded") return Promise.resolve();
    const loader = this.options.loaders.find(candidate => candidate.provider === nativeRef.provider && candidate.canLoad(evidenceRef));
    if (!loader) return this.settle(key, { state: "unavailable", reason: "no-loader" });
    const maxBytes = Math.max(1, Math.min(this.options.maxBytes, Math.trunc(options.maxBytes ?? this.options.maxBytes)));
    const controller = new AbortController();
    const slot: Slot = { entry: LOADING, controller };
    this.insert(key, slot);
    const run = async (): Promise<EvidenceEntry> => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      const timedOut = new Promise<EvidenceEntry>(resolve => {
        timer = setTimeout(() => { controller.abort(); resolve({ state: "unavailable", reason: "timeout" }); }, this.options.timeoutMs);
      });
      try {
        const loading = loader.load({ scope: { workspace: scope.workspace, principal: scope.principal }, nativeRef: { ...nativeRef }, evidenceRef, maxBytes, signal: controller.signal })
          .then(content => admit(loader, content, maxBytes), unavailableFor);
        return await Promise.race([loading, timedOut]);
      } catch (error) {
        return unavailableFor(error);
      } finally {
        if (timer !== undefined) clearTimeout(timer);
      }
    };
    slot.pending = run().then(entry => {
      // An aborted or evicted slot is no longer the live one: its late result is dropped.
      if (this.slots.get(key) === slot) {
        slot.entry = entry;
        slot.controller = undefined;
      }
    });
    return slot.pending;
  }

  /** Stops the local read only. */
  abort(scope: ObservationScope, nativeRef: NativeRef, evidenceRef: string): void {
    const key = cacheKey(scope, nativeRef, evidenceRef);
    const slot = this.slots.get(key);
    if (slot?.entry.state !== "loading") return;
    slot.controller?.abort();
    this.slots.delete(key);
  }

  abortAll(): void {
    for (const [key, slot] of [...this.slots]) {
      if (slot.entry.state !== "loading") continue;
      slot.controller?.abort();
      this.slots.delete(key);
    }
  }

  get size(): number { return this.slots.size; }

  private settle(key: string, entry: EvidenceEntry): Promise<void> {
    this.insert(key, { entry });
    return Promise.resolve();
  }

  private insert(key: string, slot: Slot): void {
    this.slots.delete(key);
    this.slots.set(key, slot);
    while (this.slots.size > this.options.maxEntries) {
      const oldest = this.slots.keys().next().value;
      if (oldest === undefined) break;
      this.slots.get(oldest)?.controller?.abort();
      this.slots.delete(oldest);
    }
  }
}
