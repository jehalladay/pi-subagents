/**
 * wb-752.13 (VC-4 W13-Fw/W16-Bw2; EAT-R349): the furnace_observe reply in the shared workbench.tool-reply/v1 dialect.
 *
 * Gap of record (seat ws-08, run g10-work-s338, measured 2026-11-11 at trunk ce180d82, ruled PROCEED under rule 22(d) on
 * 2026-11-12): furnace_observe refreshed the Run snapshot without trace.invocationId, and ObservationProjection.window groups
 * rows by that field, so observeInvocation scoped to the Run served zero rows (window.total 0, nodes [], "no nodes
 * returned"). The Run snapshot furnace_observe writes now carries trace.invocationId (FurnaceObserverOptions.traceRun: the Run
 * ID), the ID the observer's Attempt snapshots already carry, and furnace_observe refreshes those Attempt snapshots and their
 * native-confirmed ownership edges too, so the Run's own viewport holds the Run and the Attempts its page returned. The host
 * (src/index.ts) makes those writes and hands this module the viewport as a read function; this module never reaches the
 * projection itself.
 *
 * Dialect: every reply is one envelope whose contract is TOOL_REPLY_CONTRACT_VERSION (imported, never re-spelled) for the
 * tool furnace_observe. A success carries the reading's producer provenance (source), the reading's own freshness facts
 * (snapshot), the native Run facts (run), the Attempt page's counts (attempts) and the log references (logs) beside the
 * landed workbench.observe/v1 reply over the Run viewport (observe); the FurnaceReading object itself, its contract
 * included, is never carried. A refusal is a ToolReplyError with a closed code. An attach failure also carries the Run
 * viewport as it stands after projection.markStale (lastKnown), so a node that was running reads last-known-running +
 * stale, never current, and saved data is retrievable without being made current.
 *
 * Hygiene: every string reaches the model through sanitizeWorkbenchJsonText (redaction.ts), the one shared serializer; the
 * observe reply is already a fixed point of it. Refusal messages are bounded by sanitizeWorkbenchText(message, 160, "text").
 *
 * Bound: the returned text never exceeds maxBytes (1024..65536, default 16384), measured as the UTF-8 bytes of that exact
 * text. Each envelope is measured around the observe reply, which then gets exactly the bytes left (it drops events,
 * relations and then nodes from the tail itself and says so in truncatedForBytes and droppedForBytes, beside its window
 * counts); when an envelope's facts leave under 1024 bytes for it, the next smaller envelope is tried and names what it left
 * out in `omitted`; when even the smallest leaves too little, the reply is the typed invalid-request refusal, which fits the
 * smallest accepted cap by construction (a bounded message, a Run ID of at most 108 ASCII characters).
 */
import { CapabilityError } from "./capability-registry.js";
import type { FurnaceReading } from "./furnace-observer.js";
import { OBSERVE_CURSOR_MAX_BYTES, OBSERVE_DEFAULT_MAX_BYTES, OBSERVE_MAX_LIMIT, OBSERVE_MAX_MAX_BYTES, OBSERVE_MIN_MAX_BYTES, type ObserveReply } from "./observe-query.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION, type ToolReplyError } from "./tool-replies.js";

export const FURNACE_OBSERVE_TOOL = "furnace_observe";
/** The closed error-code union of every furnace_observe refusal. */
export const FURNACE_OBSERVE_ERROR_CODES = Object.freeze(["not-granted", "invalid-run-id", "invalid-request", "unavailable"] as const);
export type FurnaceObserveErrorCode = (typeof FURNACE_OBSERVE_ERROR_CODES)[number];
/** The bound of every refusal message, in UTF-16 code units (sanitizeWorkbenchText's own bound). */
export const FURNACE_OBSERVE_MESSAGE_LIMIT = 160;
/** The facts a success envelope can carry beside the observe reply, in the order a tighter cap omits them. */
export const FURNACE_OBSERVE_FACTS = Object.freeze(["logs", "attempts", "run", "snapshot", "source"] as const);
export type FurnaceObserveFact = (typeof FURNACE_OBSERVE_FACTS)[number];
/** The native Run identity furnace_observe accepts: the grammar its execute has always checked, unchanged. */
export const FURNACE_OBSERVE_RUN_ID = /^frn-run-[a-zA-Z0-9_-]{1,100}$/;

export interface FurnaceObserveReply {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: typeof FURNACE_OBSERVE_TOOL;
  readonly ok: true;
  readonly invoked: false;
  readonly runId: string;
  readonly maxBytes: number;
  readonly source?: FurnaceReading["source"];
  readonly snapshot?: Pick<FurnaceReading, "capturedAt" | "observedAt" | "lastConfirmedAt" | "freshness" | "connection" | "completeness" | "coherence">;
  readonly run?: FurnaceReading["run"];
  readonly attempts?: Omit<FurnaceReading["attempts"], "items">;
  readonly logs?: FurnaceReading["logs"];
  /** The facts this reply left out to fit maxBytes; present only when one was. */
  readonly omitted?: readonly FurnaceObserveFact[];
  readonly observe: ObserveReply;
}

export interface FurnaceObserveError extends ToolReplyError<typeof FURNACE_OBSERVE_TOOL, FurnaceObserveErrorCode> {
  readonly runId?: string;
  /** The Run viewport after the failed read marked it stale (attach failures only). */
  readonly lastKnown?: ObserveReply;
  readonly omitted?: readonly "lastKnown"[];
}

export type FurnaceObserveResult = FurnaceObserveReply | FurnaceObserveError;

/**
 * The Run's viewport as the host hands it: the attached Run, the caller's maxBytes (undefined for the default) and the
 * observe reply over the host's projection at a byte budget (observeInvocation scoped to the Run, with the caller's paging).
 */
export interface FurnaceObserveView {
  readonly runId: string;
  readonly maxBytes?: number;
  readonly read: (maxBytes: number) => ObserveReply;
}

const utf8 = (text: string): number => Buffer.byteLength(text, "utf8");
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function refusal(code: FurnaceObserveErrorCode, message: string, extra: { readonly runId?: string; readonly reason?: string } = {}): FurnaceObserveError {
  return {
    contract: TOOL_REPLY_CONTRACT_VERSION,
    tool: FURNACE_OBSERVE_TOOL,
    ok: false,
    invoked: false,
    ...(extra.runId === undefined ? {} : { runId: extra.runId }),
    error: { code, ...(extra.reason === undefined ? {} : { reason: extra.reason }), message: sanitizeWorkbenchText(message, FURNACE_OBSERVE_MESSAGE_LIMIT, "text") },
  };
}

/** One typed refusal as the text the tool returns (no read was made, so no viewport is carried). */
export function furnaceObserveRefusal(code: FurnaceObserveErrorCode, message: string): string {
  return sanitizeWorkbenchJsonText(refusal(code, message));
}

/**
 * The call's own parameters, checked before any native read: undefined when they are acceptable, else the typed refusal
 * text - invalid-run-id for a Run ID outside FURNACE_OBSERVE_RUN_ID, invalid-request for a limit, cursor or maxBytes outside
 * its bound. A cursor's own identity (its scope, invocation and revision) is checked by observeInvocation when the reply is
 * built.
 */
export function furnaceObserveRequestRefusal(params: unknown): string | undefined {
  const fields = record(params) ? params : {};
  const { runId, limit, cursor, maxBytes } = fields;
  if (typeof runId !== "string" || !FURNACE_OBSERVE_RUN_ID.test(runId)) return furnaceObserveRefusal("invalid-run-id", "Invalid native Furnace Run identity.");
  if (limit !== undefined && !(typeof limit === "number" && Number.isSafeInteger(limit) && limit >= 1 && limit <= OBSERVE_MAX_LIMIT)) {
    return furnaceObserveRefusal("invalid-request", `Invalid observe request: limit must be a safe integer 1..${OBSERVE_MAX_LIMIT}.`);
  }
  if (cursor !== undefined && !(typeof cursor === "string" && utf8(cursor) <= OBSERVE_CURSOR_MAX_BYTES)) {
    return furnaceObserveRefusal("invalid-request", `Invalid observe request: cursor must be a string of at most ${OBSERVE_CURSOR_MAX_BYTES} bytes.`);
  }
  if (maxBytes !== undefined && !(typeof maxBytes === "number" && Number.isSafeInteger(maxBytes) && maxBytes >= OBSERVE_MIN_MAX_BYTES && maxBytes <= OBSERVE_MAX_MAX_BYTES)) {
    return furnaceObserveRefusal("invalid-request", `Invalid observe request: maxBytes must be a safe integer ${OBSERVE_MIN_MAX_BYTES}..${OBSERVE_MAX_MAX_BYTES}.`);
  }
  return undefined;
}

/** The reading's facts by name, as a success envelope carries them. */
function factsOf(reading: FurnaceReading): Record<FurnaceObserveFact, unknown> {
  const { capturedAt, observedAt, lastConfirmedAt, freshness, connection, completeness, coherence } = reading;
  const { items: _items, ...attempts } = reading.attempts;
  return {
    source: reading.source,
    snapshot: { capturedAt, observedAt, lastConfirmedAt, freshness, connection, completeness, coherence },
    run: reading.run,
    attempts,
    logs: reading.logs,
  };
}

/**
 * Fit envelopes around one observe reply: the first envelope whose measured text leaves at least 1024 bytes for the reply
 * is built with exactly the bytes left; the text is measured again before it is returned. undefined when none fits.
 */
function fitted(envelopes: readonly Record<string, unknown>[], key: "observe" | "lastKnown", read: (maxBytes: number) => ObserveReply, cap: number): string | undefined {
  for (const envelope of envelopes) {
    const overhead = utf8(sanitizeWorkbenchJsonText({ ...envelope, [key]: null })) - utf8("null");
    if (cap - overhead < OBSERVE_MIN_MAX_BYTES) continue;
    const text = sanitizeWorkbenchJsonText({ ...envelope, [key]: read(cap - overhead) });
    if (utf8(text) <= cap) return text;
  }
  return undefined;
}

function capOf(view: FurnaceObserveView): number {
  return view.maxBytes ?? OBSERVE_DEFAULT_MAX_BYTES;
}

/**
 * The success reply over the Run viewport, as the text the tool returns: the largest envelope that fits maxBytes beside the
 * observe reply. A cursor or request observeInvocation refuses is the typed invalid-request refusal.
 */
export function furnaceObserveReply(view: FurnaceObserveView, reading: FurnaceReading): string {
  const cap = capOf(view);
  const facts = factsOf(reading);
  const head = { contract: TOOL_REPLY_CONTRACT_VERSION, tool: FURNACE_OBSERVE_TOOL, ok: true, invoked: false, runId: view.runId, maxBytes: cap };
  const envelopes: Record<string, unknown>[] = [];
  for (let dropped = 0; dropped <= FURNACE_OBSERVE_FACTS.length; dropped++) {
    const omitted = FURNACE_OBSERVE_FACTS.slice(0, dropped);
    const kept = Object.fromEntries([...FURNACE_OBSERVE_FACTS].reverse().filter(fact => !omitted.includes(fact)).map(fact => [fact, facts[fact]]));
    envelopes.push({ ...head, ...kept, ...(omitted.length === 0 ? {} : { omitted }) });
  }
  try {
    return (
      fitted(envelopes, "observe", view.read, cap) ??
      sanitizeWorkbenchJsonText(refusal("invalid-request", `Invalid observe request: maxBytes ${cap} leaves under ${OBSERVE_MIN_MAX_BYTES} bytes for the Run viewport.`, { runId: view.runId }))
    );
  } catch (error) {
    if (error instanceof CapabilityError && error.category === "validation") {
      return sanitizeWorkbenchJsonText(refusal("invalid-request", `Invalid observe request: ${error.message}`, { runId: view.runId }));
    }
    throw error;
  }
}

/**
 * The attach-failure reply: the typed unavailable refusal (the native error's category as reason, its message bounded and
 * sanitized), carrying the Run viewport as the projection holds it after markStale when maxBytes leaves room for it.
 */
export function furnaceObserveFailure(view: FurnaceObserveView, error: unknown): string {
  const cap = capOf(view);
  const reason = error instanceof CapabilityError ? error.category : "unknown";
  const failed = refusal("unavailable", error instanceof Error ? error.message : String(error), { runId: view.runId, reason });
  let carried: string | undefined;
  try {
    carried = fitted([{ ...failed }], "lastKnown", view.read, cap);
  } catch (viewport) {
    if (!(viewport instanceof CapabilityError && viewport.category === "validation")) throw viewport;
  }
  return carried ?? sanitizeWorkbenchJsonText({ ...failed, omitted: ["lastKnown"] });
}
