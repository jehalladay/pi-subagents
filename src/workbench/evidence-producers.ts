/**
 * Grant-gated producer loaders for the EvidenceStore (docs/workbench/20 § Producer mapping).
 * Every load re-reads the live grant set before any read, so a grant never held and one revoked mid-view
 * refuse alike with `unauthorized` (§ Refusal rules). The producer reads themselves
 * are host-supplied narrow readers; this module never reaches a producer SDK or issues a control verb.
 */
import { type EvidenceContent, type EvidenceLoader, EvidenceRefusal } from "./evidence-loader.js";

export const CLAUDE_TRANSCRIPT_GRANT = "claude:transcript";
export const FURNACE_INSPECT_GRANT = "furnace:inspect";
export const FORGE_INSPECT_GRANT = "forge:inspect";

/** One row of the docs/workbench/20 § Producer mapping table: the only producers that ever get a loader. */
export interface EvidenceLoaderRow {
  readonly provider: string;
  readonly requiredGrant: string;
  readonly refKind: string;
}

/**
 * The docs/workbench/20 § Producer mapping table and nothing else, in loader order. Any other provider has no
 * row and therefore no loader, so its refs render `unavailable: no-loader`.
 */
export const EVIDENCE_LOADER_ROWS: readonly EvidenceLoaderRow[] = Object.freeze([
  Object.freeze({ provider: "claude-agent-sdk", requiredGrant: CLAUDE_TRANSCRIPT_GRANT, refKind: "claude-message:<uuid>" }),
  Object.freeze({ provider: "furnace", requiredGrant: FURNACE_INSPECT_GRANT, refKind: "native Attempt id listed on the owning run node" }),
  Object.freeze({ provider: "forge", requiredGrant: FORGE_INSPECT_GRANT, refKind: "forge-operation:<operation_id>" }),
]);

/** A row of the bounded Claude transcript window (matches the host transcript read). */
export interface ClaudeEvidenceRow { readonly type: string; readonly uuid: string; readonly text: string }
export interface ClaudeEvidenceReader {
  (input: { readonly sessionId: string; readonly signal: AbortSignal }): Promise<readonly ClaudeEvidenceRow[]>;
}

/** One bounded Furnace attempt log read, carrying the identities it was actually read for. */
export interface FurnaceEvidenceRead {
  readonly runId: string;
  readonly attemptId: string;
  readonly stream: string;
  readonly text: string;
  readonly complete: boolean;
  readonly lossy: boolean;
  readonly nextCursor?: string;
  readonly capturedAt: string;
  readonly producerReceipt?: string;
}
export interface FurnaceEvidenceReader {
  (input: { readonly runId: string; readonly attemptId: string; readonly maxBytes: number; readonly signal: AbortSignal }): Promise<FurnaceEvidenceRead>;
}

/**
 * A re-read of one forge operation through the registered read capability. A reader that already
 * bounded and labelled its result (the landed forge-operation reader) hands the loader its own
 * `preview`, `bytes`, `truncated` and `freshness`, which are carried verbatim; a reader that reports
 * only status, verdict and lines gets the loader's synthesis with freshness "current".
 */
export interface ForgeEvidenceRead {
  readonly status: string;
  readonly verdict?: string;
  readonly lines?: readonly string[];
  readonly partial?: boolean;
  readonly preview?: readonly string[];
  readonly bytes?: number;
  readonly truncated?: boolean;
  readonly freshness?: EvidenceContent["freshness"];
  readonly capturedAt: string;
  readonly sourceBasis?: string;
  readonly producerReceipt?: string;
}
export interface ForgeEvidenceReader {
  (input: { readonly operationId: string; readonly signal: AbortSignal }): Promise<ForgeEvidenceRead>;
}

export interface EvidenceProducerOptions {
  /** Read live on every load, before any read; never captured. */
  readonly grants: () => readonly string[];
  readonly claude?: ClaudeEvidenceReader;
  readonly furnace?: FurnaceEvidenceReader;
  readonly forge?: ForgeEvidenceReader;
  /** Injected capture clock; the claude loader refuses transport without it, it never reads the host clock. */
  readonly now?: () => Date;
}

const CLAUDE_REF = /^claude-message:([A-Za-z0-9-]{1,64})$/;
const FORGE_REF = /^forge-operation:([A-Za-z0-9._-]{1,128})$/;
const ATTEMPT_REF = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

function gated(options: EvidenceProducerOptions, grant: string): void {
  if (!options.grants().includes(grant)) throw new EvidenceRefusal("unauthorized");
}

const textLines = (text: string): string[] => text.split(/\r\n|\r|\n/);

function claudeLoader(options: EvidenceProducerOptions, read: ClaudeEvidenceReader): EvidenceLoader {
  return {
    provider: "claude-agent-sdk",
    requiredGrant: CLAUDE_TRANSCRIPT_GRANT,
    canLoad: ref => CLAUDE_REF.test(ref),
    async load(request) {
      gated(options, CLAUDE_TRANSCRIPT_GRANT);
      const uuid = CLAUDE_REF.exec(request.evidenceRef)?.[1];
      if (uuid === undefined || request.nativeRef.type !== "session") throw new EvidenceRefusal("no-loader");
      // The capture time comes only from the injected clock; a loader built without one refuses before any read.
      const now = options.now;
      if (now === undefined) throw new EvidenceRefusal("transport");
      const rows = await read({ sessionId: request.nativeRef.id, signal: request.signal });
      const row = rows.find(candidate => candidate.uuid === uuid);
      // A message outside the bounded window is a visible transport failure, never a fabricated row.
      if (!row) throw new EvidenceRefusal("transport");
      return {
        kind: "claude-message",
        provider: "claude-agent-sdk",
        capturedAt: now().toISOString(),
        bytes: Buffer.byteLength(row.text),
        truncated: false,
        preview: [`${row.type}:`, ...textLines(row.text)],
        freshness: "current",
      } satisfies EvidenceContent;
    },
  };
}

function furnaceLoader(options: EvidenceProducerOptions, read: FurnaceEvidenceReader): EvidenceLoader {
  return {
    provider: "furnace",
    requiredGrant: FURNACE_INSPECT_GRANT,
    canLoad: ref => ATTEMPT_REF.test(ref),
    async load(request) {
      gated(options, FURNACE_INSPECT_GRANT);
      if (request.nativeRef.type !== "run") throw new EvidenceRefusal("no-loader");
      const result = await read({ runId: request.nativeRef.id, attemptId: request.evidenceRef, maxBytes: request.maxBytes, signal: request.signal });
      // An attempt that belongs to another run, or a read that answers for another identity, is not this node's evidence.
      if (result.runId !== request.nativeRef.id || result.attemptId !== request.evidenceRef) throw new EvidenceRefusal("unauthorized");
      return {
        kind: "furnace-attempt-log",
        provider: "furnace",
        capturedAt: result.capturedAt,
        bytes: Buffer.byteLength(result.text),
        truncated: !result.complete || result.lossy || result.nextCursor !== undefined,
        preview: [`${result.stream}:`, ...textLines(result.text)],
        freshness: "current",
        ...(result.producerReceipt !== undefined ? { producerReceipt: result.producerReceipt } : {}),
      } satisfies EvidenceContent;
    },
  };
}

function forgeLoader(options: EvidenceProducerOptions, read: ForgeEvidenceReader): EvidenceLoader {
  return {
    provider: "forge",
    requiredGrant: FORGE_INSPECT_GRANT,
    canLoad: ref => FORGE_REF.test(ref),
    async load(request) {
      gated(options, FORGE_INSPECT_GRANT);
      const operationId = FORGE_REF.exec(request.evidenceRef)?.[1];
      if (operationId === undefined) throw new EvidenceRefusal("no-loader");
      const result = await read({ operationId, signal: request.signal });
      // A failed or partial domain verdict is a legitimate loaded result shown as its own status; transport success is not verification.
      const preview = result.preview !== undefined
        ? [...result.preview]
        : [`status: ${result.status}`, ...(result.verdict !== undefined ? [`verdict: ${result.verdict}`] : []), ...(result.lines ?? [])];
      return {
        kind: "forge-operation",
        provider: "forge",
        capturedAt: result.capturedAt,
        bytes: result.bytes ?? preview.reduce((sum, line) => sum + Buffer.byteLength(line), 0),
        // A reader that labelled its own truncation or staleness is believed; nothing here upgrades a stale read to current.
        truncated: result.truncated ?? result.partial === true,
        preview,
        freshness: result.freshness ?? "current",
        ...(result.sourceBasis !== undefined ? { sourceBasis: result.sourceBasis } : {}),
        ...(result.producerReceipt !== undefined ? { producerReceipt: result.producerReceipt } : {}),
      } satisfies EvidenceContent;
    },
  };
}

/**
 * Loaders for the producers whose reader the host supplied; a producer without a reader gets no loader,
 * so its refs render `unavailable: no-loader`. Authorization is the live exact-grant check each load runs
 * first: a missing grant and a revoked one take that same path and leave the same `unauthorized` entry.
 */
export function createEvidenceLoaders(options: EvidenceProducerOptions): readonly EvidenceLoader[] {
  const loaders: EvidenceLoader[] = [];
  if (options.claude) loaders.push(claudeLoader(options, options.claude));
  if (options.furnace) loaders.push(furnaceLoader(options, options.furnace));
  if (options.forge) loaders.push(forgeLoader(options, options.forge));
  return loaders;
}
