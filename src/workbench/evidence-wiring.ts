/**
 * evidence-wiring.ts — the host's EvidenceStore construction (wb-6ze.17).
 *
 * The one place the landed evidence readers become EvidenceLoader producers:
 * the claude transcript read, the furnace attempt-log read and the forge
 * operation read are adapted to the docs/20 reader seams and handed to
 * `createEvidenceLoaders`, whose live exact-grant check governs every load.
 * The claude seam resolves the REQUESTED node's own listing (wb-idq), never
 * the first node in scope that lists the ref, and every capture time comes
 * from the clock the host injects at boot: this module reads no host clock.
 * The forge adapter re-reads through the registered `forge.gate.status`
 * capability under the operator's grants and carries the reader's own
 * freshness and truncation labels through unchanged. Wiring only: the store
 * contract and the readers themselves are untouched. The SDK
 * client and the transcript reader are reached through the native-modules
 * loader (wb-cax.10), so building this store at boot resolves no native SDK;
 * the first furnace or claude load — already behind the live grant check —
 * is what brings them in.
 */

import type { CapabilityRegistry } from "./capability-registry.js";
import type { ClaudeTranscriptRow } from "./claude-transcript.js";
import { EVIDENCE_TRUNCATED_MARK, EvidenceRefusal, EvidenceStore } from "./evidence-loader.js";
import { createEvidenceLoaders, type ForgeEvidenceRead, type FurnaceEvidenceRead } from "./evidence-producers.js";
import { ForgeEvidenceError, readForgeOperationEvidence } from "./forge-evidence.js";
import { readFurnaceAttemptLogEvidence } from "./furnace-evidence.js";
import type { FurnaceObserverClient } from "./furnace-observer.js";
import { loadWorkbenchNative } from "./native-modules.js";
import type { NativeRef, ObservationProjection, ObservationScope } from "./observation.js";

const EVIDENCE_MAX_ENTRIES = 32;
const EVIDENCE_MAX_BYTES = 65_536;
const EVIDENCE_TIMEOUT_MS = 10_000;
const EVIDENCE_MAX_LINES = 200;
/** The forge reader's own preview budget (its validated range is 64..65536 bytes). */
const EVIDENCE_FORGE_MAX_BYTES = 4096;

export interface WorkbenchEvidenceDeps {
  /** Read live on every load; never captured, so mid-view revocation refuses. */
  grants(): readonly string[];
  /** The operator scope the furnace read is bound to; absent between sessions. */
  scope(): ObservationScope | undefined;
  projection: Pick<ObservationProjection, "query">;
  cwd(): string | undefined;
  /**
   * The capability registry bound to one authorized workspace root; the forge
   * adapter re-reads through it. Without it no forge loader is built, and a
   * forge-operation reference renders the visible `unavailable: no-loader`.
   */
  registry?(workspace: string): Pick<CapabilityRegistry, "invoke">;
  /** Test seams; the defaults are the landed reader and the real SDK client, loaded on first use. */
  claudeRead?(sessionId: string, cwd: string, limit: number): Promise<readonly ClaudeTranscriptRow[]>;
  furnaceClient?(workspace: string): Pick<FurnaceObserverClient, "logs"> | Promise<Pick<FurnaceObserverClient, "logs">>;
  /** The host's capture clock, injected once at boot; the store never falls back to a clock of its own. */
  now(): Date;
}

export function createWorkbenchEvidenceStore(deps: WorkbenchEvidenceDeps): EvidenceStore {
  const readTranscript =
    deps.claudeRead ??
    (async (sessionId: string, cwd: string, limit: number) => (await loadWorkbenchNative()).readClaudeTranscript(sessionId, cwd, limit));
  const furnaceClient =
    deps.furnaceClient ??
    (async (workspace: string) => {
      const { Furnace } = await loadWorkbenchNative();
      return new Furnace({ binary: "furnace", cwd: workspace, timeoutMs: EVIDENCE_TIMEOUT_MS });
    });
  const registry = deps.registry;
  const forge =
    registry === undefined
      ? undefined
      : async ({ operationId, nativeRef, signal }: { operationId: string; nativeRef: NativeRef; signal: AbortSignal }): Promise<ForgeEvidenceRead> => {
          const scope = deps.scope();
          if (scope === undefined) throw new EvidenceRefusal("transport");
          const ref = `forge-operation:${operationId}`;
          // Ownership resolves by the REQUESTED node, the furnace adapter's bound shape below (wb-cz9): only an operation the
          // node the request names lists as evidence is ever re-read. An unobserved node, or one that does not list the ref,
          // refuses unauthorized with no capability call issued, never served another node's re-read under its own key.
          const owningNode = deps.projection.query({ scope, ref: nativeRef, limit: 1 }).nodes[0];
          const owner = owningNode?.nativeRef;
          const requested = owner !== undefined && owner.provider === nativeRef.provider && owner.type === nativeRef.type &&
            owner.id === nativeRef.id && (owner.scope ?? "") === (nativeRef.scope ?? "");
          if (owningNode === undefined || !requested || !owningNode.evidenceRefs.includes(ref)) throw new EvidenceRefusal("unauthorized");
          try {
            const content = await readForgeOperationEvidence(ref, {
              grants: deps.grants,
              scope,
              target: scope.workspace,
              read: request =>
                registry(scope.workspace).invoke("forge.gate.status", { target: request.target }, {
                  grants: [...deps.grants()],
                  signal: request.signal ?? signal,
                  callId: `evidence:${ref}`,
                  principal: { id: scope.principal, role: "local-operator" },
                  workspace: scope.workspace,
                }),
              now: () => deps.now().toISOString(),
              maxBytes: EVIDENCE_FORGE_MAX_BYTES,
              signal,
              // The owning node's freshness is the host's view of the source: anything but current labels the read stale.
              owner: owningNode.freshness === "current" ? "current" : "stale",
            });
            // The store marks truncation itself; the reader's own trailing marker would otherwise show twice.
            const preview =
              content.truncated && content.preview.at(-1) === EVIDENCE_TRUNCATED_MARK ? content.preview.slice(0, -1) : content.preview;
            return {
              status: content.statusText,
              preview,
              bytes: content.bytes,
              truncated: content.truncated,
              freshness: content.freshness,
              capturedAt: content.capturedAt,
              ...(content.sourceBasis !== undefined ? { sourceBasis: content.sourceBasis } : {}),
              producerReceipt: content.producerReceipt.readOperationId,
            } satisfies ForgeEvidenceRead;
          } catch (error) {
            if (error instanceof EvidenceRefusal) throw error;
            // The reader's typed refusal becomes the store's: authorization stays unauthorized, everything else is a visible transport failure carrying the reader's staleness.
            if (error instanceof ForgeEvidenceError) {
              throw new EvidenceRefusal(error.category === "authorization" ? "unauthorized" : "transport", error.freshness);
            }
            throw new EvidenceRefusal("transport");
          }
        };
  const loaders = createEvidenceLoaders({
    grants: deps.grants,
    now: () => deps.now(),
    ...(forge !== undefined ? { forge } : {}),
    claude: {
      readTranscript: (sessionId, cwd, limit) => readTranscript(sessionId, cwd, limit),
      cwd: () => deps.cwd(),
      // Only the node the ref was requested on, and only when it lists the ref: the loader refuses unauthorized otherwise.
      owningNode: (scope, nativeRef, evidenceRef) => {
        const node = deps.projection.query({ scope, ref: nativeRef, limit: 1 }).nodes[0];
        return node === undefined || !node.evidenceRefs.includes(evidenceRef)
          ? undefined
          : { nativeRef: node.nativeRef, evidenceRefs: node.evidenceRefs, freshness: node.freshness };
      },
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
        capturedAt: () => deps.now().toISOString(),
      });
      // The furnace loader marks a lossy, incomplete or paged read truncated and the store then adds its single [truncated];
      // the reader's own trailing "truncated (producer: ...)" line would otherwise show beside it (wb-cz9 leg 2). A budget-only
      // cut is not loader-marked, so the reader's line stays its one visible marker.
      const receipt = content.producerReceipt;
      const loaderMarked = !receipt.complete || receipt.lossy || receipt.nextCursor !== null;
      const preview = loaderMarked && content.truncated ? content.preview.slice(0, -1) : content.preview;
      return {
        runId,
        attemptId,
        stream: content.stream,
        text: preview.join("\n"),
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
