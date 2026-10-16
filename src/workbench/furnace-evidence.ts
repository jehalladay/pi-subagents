/**
 * Bounded Furnace Attempt log evidence (docs/workbench/20 § Producer mapping, the "furnace run" row). One native
 * bounded logs read per call, for an Attempt id listed on the owning run node, behind the run/attempt/stream identity
 * checks the external observer applies (furnace-observer.ts). A lossy, incomplete or paged producer read, and lines a
 * local budget dropped or clipped, load with truncated true and are named in a final preview line. Preview lines are
 * bounded and pass the shared sanitizers (redaction.ts) plus a local zero-width strip; no raw line, envelope, cursor or
 * error text is retained.
 *
 * This is the read the furnace EvidenceLoader wraps (wb-g1g.1): it registers nothing, checks no grant (the loader's
 * furnace:inspect gate does), states no verification and leaves the owning node's freshness to the store. The client
 * type admits logs alone, so no Run status read, Attempt listing or Furnace control verb is reachable from here; an
 * abort stops only this local read.
 */
import { CapabilityError } from "./capability-registry.js";
import type { FurnaceObserverClient } from "./furnace-observer.js";
import type { NativeRef } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const FURNACE_EVIDENCE_CONTRACT = "workbench.furnace-evidence/v1";

export interface FurnaceEvidenceRequest {
  client: Pick<FurnaceObserverClient, "logs">;
  /** The owning Run, frn-run- followed by 1-100 of [a-zA-Z0-9_-]. */
  runId: string;
  /** The host-bound workspace the owning run node is scoped to. */
  workspaceRoot: string;
  /** The projection node the evidence ref was listed on. */
  owningRunNode: { nativeRef: NativeRef; evidenceRefs: readonly string[] };
  /** The native Attempt id, frn-atm- followed by 1-100 of [a-zA-Z0-9_-], listed in owningRunNode.evidenceRefs. */
  attemptId: string;
  stream: "stdout" | "stderr";
  /** The producer's byte window, 1..65536. */
  maxBytes: number;
  /** Preview lines kept from the producer tail, 1..200. */
  maxLines: number;
  /** The native call bound, 1..2147483647 ms. */
  timeoutMs: number;
  signal: AbortSignal;
  /** The caller's clock, read once after the native read answers; this module reads no host clock. */
  capturedAt: () => string;
}

/** The docs/20 EvidenceContent shape minus the store-level fields: the loader applies the owning node's freshness. */
export interface FurnaceEvidenceContent {
  contract: typeof FURNACE_EVIDENCE_CONTRACT;
  kind: "furnace.attempt.log";
  provider: "furnace";
  nativeRef: NativeRef;
  stream: "stdout" | "stderr";
  capturedAt: string;
  /** The producer's own `returned` count, carried unchanged and never re-measured. The Furnace JSON protocol documents
   * `returned` on a logs read as a whole-line count, so it is a LINE count, never a byte count; it may not exceed the
   * read's byte bound (`limit` = maxBytes), which is a separate quantity. */
  lineCount: number;
  truncated: boolean;
  preview: readonly string[];
  producerReceipt: { requestId: string; complete: boolean; lossy: boolean; nextCursor: string | null };
  freshness: "current";
}

type LogsAnswer = Awaited<ReturnType<FurnaceObserverClient["logs"]["read"]>>;
type Loose = Readonly<Record<string, unknown>>;
type TruncationReason = "lossy" | "incomplete" | "paged" | "budget";

const RUN_ID = /^frn-run-[a-zA-Z0-9_-]{1,100}$/;
const ATTEMPT_ID = /^frn-atm-[a-zA-Z0-9_-]{1,100}$/;
const MAX_BYTES = 65_536;
const MAX_LINES = 200;
const MAX_TIMEOUT_MS = 2_147_483_647;
/** Characters of one preview line, receipt value or error message. */
const MAX_LINE = 200;
/** Raw characters of one producer string ever examined; anything later is never shown. */
const MAX_SCAN = 2_000;
/** An ISO-8601 date-time with a timezone; the host date parser alone also accepts prose. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (field: string): CapabilityError => new CapabilityError("validation", `Furnace evidence read refused: invalid ${field}.`);
const malformed = (): CapabilityError => new CapabilityError("unavailable", "Furnace evidence read returned a malformed native log shape.");
const isRecord = (value: unknown): value is Loose => value !== null && typeof value === "object";
const isBudget = (value: unknown, most: number): value is number => typeof value === "number" && Number.isSafeInteger(value) && value >= 1 && value <= most;
const isLines = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(line => typeof line === "string");

/** At most `length` UTF-16 units, never ending inside a surrogate pair. */
function clip(value: string, length: number): string {
  if (value.length <= length) return value;
  const head = value.slice(0, length);
  const last = head.charCodeAt(head.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? head.slice(0, -1) : head;
}

/** One producer string bound for display: the shared helper, which redacts every reading of the gaps an escape, control or
 * zero-width character leaves before it strips them, so a credential split from its scheme cannot reassemble (the property
 * docs/20 owner ruling 2 asked of the double redaction). Tabs become spaces so columns stay apart. A value longer than
 * MAX_LINE, or than the scan window, ends in an ellipsis inside MAX_LINE. */
function sanitize(raw: string): { text: string; clipped: boolean } {
  const scanned = clip(raw, MAX_SCAN);
  const text = sanitizeWorkbenchText(scanned, MAX_SCAN);
  return text.length <= MAX_LINE && scanned.length === raw.length ? { text, clipped: false } : { text: `${clip(text, MAX_LINE - 1)}…`, clipped: true };
}

/** A native failure is untrusted text: only its message, sanitized and bounded, ever leaves here. */
function nativeFailure(error: unknown): CapabilityError {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : "non-Error rejection";
  return new CapabilityError("unavailable", sanitize(`Furnace evidence read unavailable: ${message}`).text);
}

/** The one native read, raced against the caller's signal. An abort settles the call as transport at once; the SDK
 * promise is abandoned, and its late answer or failure is absorbed here, never awaited by the caller. */
function launch({ client, runId, attemptId, maxBytes, stream, timeoutMs, signal }: FurnaceEvidenceRequest): Promise<unknown> {
  return new Promise<unknown>((resolve, reject) => {
    const cancel = (): void => reject(new CapabilityError("transport", "Furnace evidence read cancelled."));
    signal.addEventListener("abort", cancel, { once: true });
    // Constructing the inner promise turns a synchronous client throw into a rejected read.
    new Promise<LogsAnswer>(settle => settle(client.logs.read(runId, { attempt: attemptId, limit: maxBytes, stream }, { timeoutMs }))).then(
      answer => {
        signal.removeEventListener("abort", cancel);
        resolve(answer);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", cancel);
        reject(nativeFailure(error));
      },
    );
  });
}

export async function readFurnaceAttemptLogEvidence(request: FurnaceEvidenceRequest): Promise<FurnaceEvidenceContent> {
  const { client, runId, workspaceRoot, owningRunNode, attemptId, stream, maxBytes, maxLines, timeoutMs, signal, capturedAt } = request;
  if (typeof runId !== "string" || !RUN_ID.test(runId)) throw refused("runId");
  if (typeof attemptId !== "string" || !ATTEMPT_ID.test(attemptId)) throw refused("attemptId");
  if (typeof workspaceRoot !== "string" || workspaceRoot.length === 0) throw refused("workspaceRoot");
  if (stream !== "stdout" && stream !== "stderr") throw refused("stream");
  if (!isBudget(maxBytes, MAX_BYTES)) throw refused("maxBytes");
  if (!isBudget(maxLines, MAX_LINES)) throw refused("maxLines");
  if (!isBudget(timeoutMs, MAX_TIMEOUT_MS)) throw refused("timeoutMs");
  if (!isRecord(owningRunNode) || !Array.isArray(owningRunNode.evidenceRefs)) throw refused("owningRunNode");
  if (typeof client?.logs?.read !== "function") throw refused("client");
  if (typeof signal?.aborted !== "boolean" || typeof signal.addEventListener !== "function") throw refused("signal");
  if (typeof capturedAt !== "function") throw refused("capturedAt");

  const owner = owningRunNode.nativeRef;
  if (!isRecord(owner) || owner.provider !== "furnace" || owner.type !== "run" || owner.id !== runId || owner.scope !== workspaceRoot) {
    throw new CapabilityError("authorization", "Furnace evidence ref is not listed on a furnace run node of this scope.");
  }
  // docs/20: an Attempt belonging to another Run is unauthorized; only an id the owning node lists is read.
  if (!owningRunNode.evidenceRefs.includes(attemptId)) {
    throw new CapabilityError("authorization", "Furnace Attempt is not listed on its owning run node; an Attempt of another Run is unauthorized.");
  }
  if (signal.aborted) throw new CapabilityError("transport", "Furnace evidence read cancelled before launch.");

  const answer = await launch(request);
  if (!isRecord(answer)) throw malformed();
  if (answer.kind !== "logs_read") throw new CapabilityError("unavailable", "Furnace logs response kind differs from requested native read.");
  const { requestId, data } = answer;
  if (!isRecord(data)) throw malformed();
  if (data.run_id !== runId || data.attempt_id !== attemptId || data.stream !== stream) {
    throw new CapabilityError("authorization", "Furnace log identity differs from the requested Run, Attempt or stream.");
  }
  const { lines, returned, complete, lossy, next_cursor: nextCursor } = data;
  if (!isLines(lines) || typeof returned !== "number" || !Number.isSafeInteger(returned) || returned < 0 || returned > maxBytes) throw malformed();
  if (typeof complete !== "boolean" || typeof lossy !== "boolean" || (nextCursor !== null && typeof nextCursor !== "string")) throw malformed();
  if (typeof requestId !== "string" || requestId.length === 0) throw malformed();

  // The producer returns a tail, so the newest maxLines lines are the ones kept.
  const shown = lines.slice(-maxLines).map(sanitize);
  const reasons: TruncationReason[] = [];
  if (lossy) reasons.push("lossy");
  if (!complete) reasons.push("incomplete");
  if (nextCursor !== null) reasons.push("paged");
  if (lines.length > maxLines || shown.some(line => line.clipped)) reasons.push("budget");
  const preview = shown.map(line => line.text);
  if (reasons.length > 0) preview.push(`… truncated (producer: ${reasons.join(", ")})`);

  const stamp: unknown = capturedAt();
  if (typeof stamp !== "string" || stamp.length > 64 || !ISO_INSTANT.test(stamp) || !Number.isFinite(Date.parse(stamp))) throw refused("capturedAt clock reading");
  return {
    contract: FURNACE_EVIDENCE_CONTRACT,
    kind: "furnace.attempt.log",
    provider: "furnace",
    nativeRef: { provider: "furnace", type: "attempt", id: attemptId, scope: workspaceRoot },
    stream,
    capturedAt: stamp,
    lineCount: returned,
    truncated: reasons.length > 0,
    preview,
    producerReceipt: { requestId: sanitize(requestId).text, complete, lossy, nextCursor: nextCursor === null ? null : sanitize(nextCursor).text },
    freshness: "current",
  };
}
