/**
 * Grant-gated producer loaders for the EvidenceStore (docs/workbench/20 § Producer mapping).
 * Every load re-reads the live grant set before any read, so a grant never held and one revoked mid-view
 * refuse alike with `unauthorized` (§ Refusal rules). The producer reads themselves
 * are host-supplied narrow readers; this module never reaches a producer SDK or issues a control verb. The claude row is
 * served by the claude-evidence module (wb-idq): the loader resolves the requesting node's own listing, hands the module the
 * host seams and the injected clock, and maps its typed refusals onto the store's reasons.
 */
import { CapabilityError } from "./capability-registry.js";
import { CLAUDE_EVIDENCE_TRUNCATED_MARK, CLAUDE_MESSAGE_REF, CLAUDE_TRANSCRIPT_GRANT, readClaudeMessageEvidence } from "./claude-evidence.js";
import type { ClaudeTranscriptRow } from "./claude-transcript.js";
import { EVIDENCE_MAX_PREVIEW_LINES, type EvidenceContent, type EvidenceFreshness, type EvidenceLoader, EvidenceRefusal } from "./evidence-loader.js";
import type { NativeRef, ObservationScope } from "./observation.js";

export { CLAUDE_TRANSCRIPT_GRANT } from "./claude-evidence.js";
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

/** The projection node a claude-message ref was requested on, as the host observes it. */
export interface ClaudeOwningNode {
  readonly nativeRef: NativeRef;
  readonly evidenceRefs: readonly string[];
  readonly freshness: "current" | "stale" | "unknown";
}

/** Host seams for the claude row (wb-idq): the bounded transcript read, the session cwd and the requesting node's own listing. */
export interface ClaudeEvidenceSeam {
  readonly readTranscript: (sessionId: string, cwd: string, limit: number) => Promise<readonly ClaudeTranscriptRow[]>;
  /** The host cwd the transcript is read under; undefined between sessions, which is a visible transport failure. */
  readonly cwd: () => string | undefined;
  /** The node the ref was requested on, if the host observes it; the loader requires it to be that node and to list the ref. */
  readonly owningNode: (scope: ObservationScope, nativeRef: NativeRef, evidenceRef: string) => ClaudeOwningNode | undefined;
  /** The transcript window handed to the read, 1..100; defaults to the inspector transcript's 40 rows. */
  readonly maxMessages?: number;
  /** Preview lines the module keeps, 1..200; defaults to the store's own line budget. */
  readonly maxLines?: number;
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
  (input: { readonly operationId: string; readonly nativeRef: NativeRef; readonly signal: AbortSignal }): Promise<ForgeEvidenceRead>;
}

interface EvidenceProducerBase {
  /** Read live on every load, before any read; never captured. */
  readonly grants: () => readonly string[];
  readonly furnace?: FurnaceEvidenceReader;
  readonly forge?: ForgeEvidenceReader;
}

/**
 * A claude seam is representable only together with the injected capture clock (wb-563 F4, wb-idq): a clockless claude
 * loader is a type error. The loader still refuses transport at run time without a clock, for callers past the types.
 */
export type EvidenceProducerOptions = EvidenceProducerBase &
  ({ readonly claude: ClaudeEvidenceSeam; readonly now: () => Date } | { readonly claude?: undefined; readonly now?: () => Date });

/** The inspector transcript's own window, so the two claude:transcript paths read the same rows. */
const CLAUDE_MAX_MESSAGES = 40;
/** The module's preview byte range; the store's request budget is folded into it. */
const CLAUDE_MIN_BYTES = 64;
const CLAUDE_MAX_BYTES = 65_536;
const FORGE_REF = /^forge-operation:([A-Za-z0-9._-]{1,128})$/;
const ATTEMPT_REF = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

function gated(options: EvidenceProducerOptions, grant: string): void {
  if (!options.grants().includes(grant)) throw new EvidenceRefusal("unauthorized");
}

/*
 * Each producer text reaches the store WHOLE, as one preview entry (wb-ktf): the store redacts an entry exactly once before it
 * splits it into rows, so splitting a row here would hand it a credential's scheme or key and its value as two entries.
 */

const sameNativeRef = (left: NativeRef, right: NativeRef): boolean =>
  left.provider === right.provider && left.type === right.type && left.id === right.id && (left.scope ?? "") === (right.scope ?? "");

function claudeLoader(options: EvidenceProducerOptions, seam: ClaudeEvidenceSeam): EvidenceLoader {
  return {
    provider: "claude-agent-sdk",
    requiredGrant: CLAUDE_TRANSCRIPT_GRANT,
    canLoad: ref => CLAUDE_MESSAGE_REF.test(ref),
    async load(request) {
      gated(options, CLAUDE_TRANSCRIPT_GRANT);
      // The capture time comes only from the injected clock; a loader built without one refuses before any read.
      const now = options.now;
      if (now === undefined) throw new EvidenceRefusal("transport");
      // Ownership is the requested node's own listing: the node must be observed, be the node requested and list this ref.
      const owner = seam.owningNode(request.scope, request.nativeRef, request.evidenceRef);
      if (owner === undefined || !sameNativeRef(owner.nativeRef, request.nativeRef) || !owner.evidenceRefs.includes(request.evidenceRef)) {
        throw new EvidenceRefusal("unauthorized");
      }
      const staleness: EvidenceFreshness | undefined = owner.freshness === "current" ? undefined : "stale";
      // Between sessions there is no cwd to read under: a visible transport failure, never an unknown ref kind.
      const cwd = seam.cwd();
      if (cwd === undefined) throw new EvidenceRefusal("transport", staleness);
      try {
        const content = await readClaudeMessageEvidence(request.evidenceRef, {
          grants: options.grants,
          owningNode: { nativeRef: owner.nativeRef, evidenceRefs: owner.evidenceRefs, freshness: owner.freshness },
          readTranscript: seam.readTranscript,
          cwd,
          maxMessages: seam.maxMessages ?? CLAUDE_MAX_MESSAGES,
          maxBytes: Math.max(CLAUDE_MIN_BYTES, Math.min(CLAUDE_MAX_BYTES, request.maxBytes)),
          maxLines: seam.maxLines ?? EVIDENCE_MAX_PREVIEW_LINES,
          signal: request.signal,
          capturedAt: () => now().toISOString(),
        });
        // The store marks truncation itself; the module's own trailing marker would otherwise show twice.
        const rows = content.truncated && content.preview.at(-1) === CLAUDE_EVIDENCE_TRUNCATED_MARK ? content.preview.slice(0, -1) : content.preview;
        return {
          kind: content.kind,
          provider: "claude-agent-sdk",
          capturedAt: content.capturedAt,
          bytes: content.bytes,
          truncated: content.truncated,
          preview: [`${content.role}:`, ...rows],
          freshness: content.freshness,
        } satisfies EvidenceContent;
      } catch (error) {
        if (error instanceof EvidenceRefusal) throw error;
        // The module's typed refusal becomes the store's: authorization stays unauthorized (and, like the loader's own
        // ownership refusal, carries no freshness), everything else is a visible transport failure carrying the owning
        // node's staleness. No message text crosses the seam.
        const authorization = error instanceof CapabilityError && error.category === "authorization";
        throw new EvidenceRefusal(authorization ? "unauthorized" : "transport", authorization ? undefined : staleness);
      }
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
        preview: [`${result.stream}:`, result.text],
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
      // The requested node travels with the read so the host resolves ownership by it, never by the evidence ref alone (wb-cz9).
      const result = await read({ operationId, nativeRef: request.nativeRef, signal: request.signal });
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
