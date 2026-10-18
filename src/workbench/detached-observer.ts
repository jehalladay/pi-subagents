/** Local detached reader adapter (docs/workbench/09 § Reader adapters).
 * Pure projection of an already-decoded DetachedReceipt + DetachedSnapshot into NativeSnapshots and one
 * native-confirmed ownership edge. It opens no socket, spawns nothing, never calls connect/launch and sends no
 * command: the caller decodes the values, this module only states what they support.
 * Node and edge convention (shared verbatim with the W16-J control adapter, wb-0kg.6):
 *   invocation  {provider:"local-detached", type:"invocation",   id:<invocationId>}
 *   host-process {provider:"local-detached", type:"host-process", id:"<hostInstanceId>:<pid>"}
 *   ownership edge invocation -> host-process, provenance {source:"local-detached", observedAt,
 *   nativeConfirmationRef:"local-detached:<hostInstanceId>:<pid>:<owner.id>"}.
 */
import { CapabilityError } from "./capability-registry.js";
import type { DetachedReceipt, DetachedSnapshot, LocalOperator } from "./hosts/local-detached.js";
import type { NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation } from "./observation.js";
import { sanitizeWorkbenchText, stripUnsafeText } from "./redaction.js";

/** Exactly the statement ObservationProjection.relate accepts; this adapter only ever states native-confirmed ownership. */
export type DetachedObservedRelation = Parameters<ObservationProjection["relate"]>[0];
export interface DetachedReadingInput {
  receipt: DetachedReceipt;
  snapshot: DetachedSnapshot;
  scope: ObservationScope;
  /** The host-bound current local operator; ownership is only stated for a receipt this operator owns. */
  operator: LocalOperator;
  /** The reader's own clock reading, injected: this module never reads a clock. */
  observedAt: string;
}
export interface DetachedReading {
  snapshots: NativeSnapshot[];
  relations: DetachedObservedRelation[];
  /** Refs whose current truth the reading could not confirm; applyDetachedReading marks them stale. */
  stale: NativeRef[];
}
export interface DetachedApplyResult {
  snapshots: Array<ReturnType<ObservationProjection["refresh"]>>;
  related: number;
  stale: number;
}

const PROVIDER = "local-detached";
const CONTRACT: DetachedReceipt["contract"] = "workbench.local-detached/v1";
const INVOCATION_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
const HOST_INSTANCE_ID = /^[a-f0-9]{48}$/;
const MAX_IDENTITY_BYTES = 256;
const MAX_FIELD_BYTES = 400;
const MAX_STATUS_BYTES = 1024;
const MAX_TITLE_BYTES = 200;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Local detached reading refused: ${message}.`);
/** A zone-qualified instant; an unzoned or unparseable value names no comparable clock. */
const instant = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
/** A bounded identity: non-empty, at most 256 UTF-8 bytes, no terminal sequence, control or bidi character. */
const identity = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0 && Buffer.byteLength(value) <= MAX_IDENTITY_BYTES && stripUnsafeText(value) === value;

function clampBytes(text: string, max: number): string {
  let out = "";
  let bytes = 0;
  for (const character of text) {
    bytes += Buffer.byteLength(character);
    if (bytes > max) break;
    out += character;
  }
  return out;
}
/** Producer text bound for display: the shared helper's label layout, then clamped to the byte budget. */
const shown = (value: string | undefined, maxBytes: number): string =>
  value === undefined ? "" : clampBytes(sanitizeWorkbenchText(value, maxBytes, "label"), maxBytes);

function checked(input: DetachedReadingInput): void {
  const { receipt, snapshot, scope, observedAt } = input;
  if (!scope || !identity(scope.workspace) || !identity(scope.principal)) throw refused("the host scope must be bounded, displayable identities");
  if (!instant(observedAt)) throw refused("the observation time must be a timezone-qualified instant");
  if (receipt.contract !== CONTRACT || snapshot.contract !== CONTRACT) throw refused("the contract is not the local detached contract");
  if (typeof receipt.invocationId !== "string" || !INVOCATION_ID.test(receipt.invocationId)) throw refused("the invocation id is not a bare identifier");
  if (snapshot.invocationId !== receipt.invocationId) throw refused("the snapshot names a different invocation than the receipt");
  if (!instant(snapshot.observedAt)) throw refused("the snapshot instant must be a timezone-qualified instant");
  const embedded = snapshot.receipt;
  if (embedded && (embedded.invocationId !== receipt.invocationId || embedded.hostInstanceId !== receipt.hostInstanceId || embedded.pid !== receipt.pid
    || embedded.snapshotDigest !== receipt.snapshotDigest || embedded.owner?.id !== receipt.owner?.id || embedded.invocationDirectory !== receipt.invocationDirectory)) {
    throw refused("the snapshot's embedded receipt conflicts with the supplied receipt");
  }
}

/** The tone and text of one observation. Observation, terminal outcome and cancellation request stay distinct:
 * a terminal outcome is only read from an observed-terminal snapshot and a request is never an accepted cancellation. */
function invocationPresentation(snapshot: DetachedSnapshot, live: boolean): Pick<Presentation, "statusText" | "statusTone"> {
  if (!live || snapshot.observation === "unknown") {
    // Host loss: no saved terminal verdict is replayed; the producer's own diagnostic and reconcile guidance are quoted.
    const parts = ["unknown", shown(snapshot.diagnostic, MAX_FIELD_BYTES), shown(snapshot.reconcileHint, MAX_FIELD_BYTES)].filter((part) => part.length > 0);
    return { statusText: clampBytes(parts.join(" · "), MAX_STATUS_BYTES), statusTone: "unknown" };
  }
  if (snapshot.observation === "observed-terminal") {
    const terminal = snapshot.terminal;
    if (terminal === "completed") return { statusText: "completed", statusTone: "success" };
    if (terminal === "failed") return { statusText: "failed", statusTone: "failure" };
    if (terminal === "cancelled") return { statusText: "cancelled", statusTone: "failure" };
    return { statusText: "terminal outcome not reported", statusTone: "unknown" };
  }
  const base = snapshot.observation === "observed-started" ? "started" : "running";
  return {
    statusText: snapshot.cancellationRequested === true ? `${base} · cancellation requested, not confirmed` : base,
    statusTone: "active",
  };
}

/** Project one reading. Ownership is stated only when the live host's receipt names the current operator as owner and
 * a well-formed host instance and process; every other case projects the nodes it can name without an edge. */
export function projectDetachedReading(input: DetachedReadingInput): DetachedReading {
  checked(input);
  const { receipt, snapshot, scope, operator, observedAt } = input;
  const live = snapshot.source === "live-detached-host";
  const hostWellFormed = HOST_INSTANCE_ID.test(String(receipt.hostInstanceId)) && Number.isSafeInteger(receipt.pid) && receipt.pid >= 1;
  const ownerMatches = receipt.owner?.issuer === "local-os-dac" && receipt.owner.uid === operator.uid
    && identity(receipt.owner.id) && receipt.owner.id === operator.id;
  const confirmed = live && hostWellFormed && ownerMatches;
  const coverage: NativeSnapshot["coverage"] = !live || snapshot.observation === "unknown" ? "unknown" : confirmed ? "complete" : "partial";
  const invocation: NativeRef = { provider: PROVIDER, type: "invocation", id: receipt.invocationId };
  const hostProcess: NativeRef | undefined = hostWellFormed ? { provider: PROVIDER, type: "host-process", id: `${receipt.hostInstanceId}:${receipt.pid}` } : undefined;
  const directory = identity(receipt.invocationDirectory) ? receipt.invocationDirectory : undefined;
  const common = {
    scope: { workspace: scope.workspace, principal: scope.principal },
    capturedAt: snapshot.observedAt,
    observedAt,
    coverage,
    ...(identity(receipt.snapshotDigest) ? { sourceRevision: receipt.snapshotDigest } : {}),
    ...(directory !== undefined ? { nativePayloadRef: `${PROVIDER}:invocation-directory:${directory}` } : {}),
    trace: { invocationId: receipt.invocationId },
  };
  const snapshots: NativeSnapshot[] = [{
    ...common, source: invocation, kind: "local-detached.invocation.snapshot",
    node: { title: shown(`Detached invocation ${receipt.invocationId}`, MAX_TITLE_BYTES), type: "workflow", ...invocationPresentation(snapshot, live) },
  }];
  if (hostProcess) {
    snapshots.push({
      ...common, source: hostProcess, kind: "local-detached.host-process.snapshot",
      node: { title: shown(`Detached host process ${receipt.pid}`, MAX_TITLE_BYTES), type: "sdk-operation", statusText: live ? "host answered" : "host not reachable", statusTone: live ? "active" : "unknown" },
    });
  }
  const relations: DetachedObservedRelation[] = [];
  if (confirmed && hostProcess) {
    relations.push({
      scope: { workspace: scope.workspace, principal: scope.principal }, from: { ...invocation }, to: { ...hostProcess }, kind: "ownership",
      provenance: { source: PROVIDER, observedAt, nativeConfirmationRef: `${PROVIDER}:${receipt.hostInstanceId}:${receipt.pid}:${receipt.owner.id}` },
    });
  }
  const stale = !live || snapshot.observation === "unknown" ? snapshots.map(({ source }) => ({ ...source })) : [];
  return { snapshots, relations, stale };
}

/** The only place a reading touches a projection: refresh, relate and markStale. No native call is made here. */
export function applyDetachedReading(projection: ObservationProjection, reading: DetachedReading): DetachedApplyResult {
  const results = reading.snapshots.map((snapshot) => projection.refresh(snapshot));
  for (const relation of reading.relations) projection.relate(relation);
  // A reading older than the node's last confirmation proves nothing about the present; it never stales a newer one.
  let stale = 0;
  for (const ref of reading.stale) {
    const index = reading.snapshots.findIndex(({ source }) => source.provider === ref.provider && source.type === ref.type && source.id === ref.id);
    const snapshot = reading.snapshots[index];
    if (!snapshot || results[index] !== "applied") continue;
    projection.markStale({ scope: snapshot.scope, ref });
    stale++;
  }
  return { snapshots: results, related: reading.relations.length, stale };
}
