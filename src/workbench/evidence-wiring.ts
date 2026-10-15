/**
 * evidence-wiring.ts — the host's EvidenceStore construction (wb-6ze.17).
 *
 * The one place the landed evidence readers become EvidenceLoader producers:
 * the claude transcript read and the furnace attempt-log read are adapted to
 * the docs/20 reader seams and handed to `createEvidenceLoaders`, whose
 * live exact-grant check governs every load. The forge reader is wb-6ze.11;
 * until it lands, a forge-operation reference renders the docs/20-sanctioned
 * visible `unavailable: no-loader` rather than anything fabricated. Wiring
 * only: the store contract and the readers themselves are untouched. The SDK
 * client and the transcript reader are reached through the native-modules
 * loader (wb-cax.10), so building this store at boot resolves no native SDK;
 * the first furnace or claude load — already behind the live grant check —
 * is what brings them in.
 */

import type { ClaudeTranscriptRow } from "./claude-transcript.js";
import { EvidenceRefusal, EvidenceStore } from "./evidence-loader.js";
import { createEvidenceLoaders, type FurnaceEvidenceRead } from "./evidence-producers.js";
import { readFurnaceAttemptLogEvidence } from "./furnace-evidence.js";
import type { FurnaceObserverClient } from "./furnace-observer.js";
import { loadWorkbenchNative } from "./native-modules.js";
import type { ObservationProjection, ObservationScope } from "./observation.js";

const EVIDENCE_MAX_ENTRIES = 32;
const EVIDENCE_MAX_BYTES = 65_536;
const EVIDENCE_TIMEOUT_MS = 10_000;
const EVIDENCE_MAX_LINES = 200;

export interface WorkbenchEvidenceDeps {
  /** Read live on every load; never captured, so mid-view revocation refuses. */
  grants(): readonly string[];
  /** The operator scope the furnace read is bound to; absent between sessions. */
  scope(): ObservationScope | undefined;
  projection: Pick<ObservationProjection, "query">;
  cwd(): string | undefined;
  /** Test seams; the defaults are the landed reader and the real SDK client, loaded on first use. */
  claudeRead?(sessionId: string, cwd: string): Promise<readonly ClaudeTranscriptRow[]>;
  furnaceClient?(workspace: string): Pick<FurnaceObserverClient, "logs"> | Promise<Pick<FurnaceObserverClient, "logs">>;
  now?(): Date;
}

export function createWorkbenchEvidenceStore(deps: WorkbenchEvidenceDeps): EvidenceStore {
  const readTranscript =
    deps.claudeRead ??
    (async (sessionId: string, cwd: string) => (await loadWorkbenchNative()).readClaudeTranscript(sessionId, cwd));
  const furnaceClient =
    deps.furnaceClient ??
    (async (workspace: string) => {
      const { Furnace } = await loadWorkbenchNative();
      return new Furnace({ binary: "furnace", cwd: workspace, timeoutMs: EVIDENCE_TIMEOUT_MS });
    });
  const loaders = createEvidenceLoaders({
    grants: deps.grants,
    ...(deps.now !== undefined ? { now: deps.now } : {}),
    claude: async ({ sessionId }) => {
      const cwd = deps.cwd();
      if (cwd === undefined) throw new EvidenceRefusal("transport");
      return readTranscript(sessionId, cwd);
    },
    furnace: async ({ runId, attemptId, maxBytes, signal }) => {
      const scope = deps.scope();
      if (scope === undefined) throw new EvidenceRefusal("transport");
      const owningRunNode = deps.projection.query({
        scope,
        ref: { provider: "furnace", type: "run", id: runId, scope: scope.workspace },
        limit: 1,
      }).nodes[0];
      // Only an attempt the owning run node lists is ever read; an unobserved
      // run and a foreign attempt refuse alike, with no SDK call issued.
      if (owningRunNode === undefined || !owningRunNode.evidenceRefs.includes(attemptId)) {
        throw new EvidenceRefusal("unauthorized");
      }
      const content = await readFurnaceAttemptLogEvidence({
        client: await furnaceClient(scope.workspace),
        runId,
        workspaceRoot: scope.workspace,
        owningRunNode: { nativeRef: owningRunNode.nativeRef, evidenceRefs: owningRunNode.evidenceRefs },
        attemptId,
        stream: "stdout",
        maxBytes: Math.max(1, Math.min(maxBytes, EVIDENCE_MAX_BYTES)),
        maxLines: EVIDENCE_MAX_LINES,
        timeoutMs: EVIDENCE_TIMEOUT_MS,
        signal,
        capturedAt: () => (deps.now?.() ?? new Date()).toISOString(),
      });
      return {
        runId,
        attemptId,
        stream: content.stream,
        text: content.preview.join("\n"),
        complete: content.producerReceipt.complete,
        lossy: content.producerReceipt.lossy,
        ...(content.producerReceipt.nextCursor !== null ? { nextCursor: content.producerReceipt.nextCursor } : {}),
        capturedAt: content.capturedAt,
        producerReceipt: content.producerReceipt.requestId,
      } satisfies FurnaceEvidenceRead;
    },
  });
  return new EvidenceStore({
    loaders,
    maxEntries: EVIDENCE_MAX_ENTRIES,
    maxBytes: EVIDENCE_MAX_BYTES,
    timeoutMs: EVIDENCE_TIMEOUT_MS,
  });
}
