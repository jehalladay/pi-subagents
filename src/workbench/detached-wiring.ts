/**
 * detached-wiring.ts (wb-79k.3, W13/VC-7): the local-detached observe-wiring of the two src/index.ts seams that launch or attach
 * the local detached profile, the workflow_detached tool (launch and inspect) and the workflow_execute detached launcher. A
 * reading the host already took, the snapshot an inspect returned, is projected by the landed reader adapter
 * (detached-observer.ts projectDetachedReading, unchanged) and its frozen output is applied to the live ObservationProjection by
 * the landed applyDetachedReading: refresh for each snapshot, relate for the native-confirmed ownership edge, and markStale for
 * the refs a host-lost or unknown reading could not confirm (docs/workbench/09 § Reader adapters, § Relationships are typed and
 * provenanced, § Freshness and ambiguity).
 *
 * Every input of the adapter is the host's own: the scope the host bound, the current local operator (the detached host
 * module's own localOperator(), read by the host), the host clock's reading as observedAt, and the receipt this process holds
 * for the invocation (the one its own launch returned, else the one a live reading embedded), never a receipt, an operator or
 * an instant the caller supplies. A launch receipt is retained and projects nothing: a receipt is not a reading. The wiring is
 * handed values and never a client, so it opens no socket, sends no command and holds no connection; dropping it, or closing
 * the session that owns it, cancels and sends nothing.
 *
 * Three host guards stand in front of the unchanged adapter (the wb-0kg.5 gate's minor items, owner-routed to this bead):
 * - equal-instant guard: a reading whose host instant equals the instant the projection already holds for the invocation is
 *   not applied ("held"). The projection's own guard refuses only an older reading, so an equal one would overwrite the status
 *   it holds (a terminal one with a running one); the first reading of an instant stands.
 * - byte bound: the producer's diagnostic and reconcile guidance are bounded to the adapter's per-field byte budget through the
 *   one helper's label layout before the adapter reads them, so the adapter's byte clamp never cuts the truncation marker off
 *   a multi-byte text.
 * - pid bound: a receipt whose pid is past the ten digits the control adapter's ownership-confirmation grammar admits
 *   (detached-control.ts, wb-0kg.6) is refused, so this reader never states an ownership the control adapter cannot read.
 * A reading the adapter refuses, or a reading with no receipt to read it by, is a typed refusal with nothing projected. A throw
 * from the projection itself is a typed refusal too; the landed apply is not transactional, so a snapshot it applied before
 * the throw stays applied, and nothing after it is.
 */
import { CapabilityError } from "./capability-registry.js";
import { applyDetachedReading, projectDetachedReading } from "./detached-observer.js";
import type { DetachedReceipt, DetachedSnapshot, LocalOperator } from "./hosts/local-detached.js";
import type { ObservationProjection, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The largest pid the control adapter's ownership-confirmation grammar admits ([1-9][0-9]{0,9}, detached-control.ts). */
export const DETACHED_WIRING_MAX_PID = 9_999_999_999;
/** The adapter's per-field byte budget for the producer's diagnostic and reconcile guidance (detached-observer.ts). */
export const DETACHED_WIRING_FIELD_BYTES = 400;
/** The receipts one wiring retains, the oldest dropped first. */
export const DETACHED_WIRING_MAX_RECEIPTS = 256;
/** The longest refusal diagnostic the wiring returns, in UTF-16 code units. */
export const DETACHED_WIRING_DIAGNOSTIC_CHARS = 300;

/** The host-owned context of one reading: what the adapter reads beside the receipt and the snapshot. */
export interface DetachedObserveHost {
  /** The live projection the host's observe and control tools read. */
  readonly projection: ObservationProjection;
  /** The authenticated scope the host bound for the session: the workspace realpath and the local principal. */
  readonly scope: ObservationScope;
  /** The current local operator, read by the host from the detached host module (never from a receipt). */
  readonly operator: () => LocalOperator;
  /** The host clock: one reading per projected reading is its observedAt. */
  readonly now: () => string;
}

/** What one reading did to the live projection. */
export type DetachedObservation =
  /** applyDetachedReading's own answer: refresh's answer per snapshot, the edges stated and the refs marked stale. */
  | {
    readonly kind: "projected";
    readonly snapshots: readonly ("applied" | "out-of-order" | "refused")[];
    readonly related: number;
    readonly stale: number;
  }
  /** The projection already holds a reading of the invocation at this host instant: nothing was applied. */
  | { readonly kind: "held"; readonly reason: "equal-instant" }
  /** Nothing was projected (see the module header for a projection throw): the typed refusal and its one bounded line. */
  | { readonly kind: "refused"; readonly category: "validation" | "authorization"; readonly diagnostic: string };

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Local detached observation refused: ${message}.`);

/** The producer's text bound to the adapter's per-field byte budget, through the one helper's label layout. */
function withinFieldBytes(text: string): string {
  let limit = DETACHED_WIRING_FIELD_BYTES;
  let shown = sanitizeWorkbenchText(text, limit, "label");
  let bytes = Buffer.byteLength(shown);
  // Each pass cuts the code-unit bound by at least the overflow over four bytes (the widest UTF-8 unit), so it ends.
  while (bytes > DETACHED_WIRING_FIELD_BYTES && limit > 0) {
    limit = Math.max(0, limit - Math.max(1, Math.ceil((bytes - DETACHED_WIRING_FIELD_BYTES) / 4)));
    shown = sanitizeWorkbenchText(text, limit, "label");
    bytes = Buffer.byteLength(shown);
  }
  return shown;
}

/** The snapshot as the adapter reads it: the producer's two free-text fields byte-bounded, every other field as the host read it. */
function boundedSnapshot(snapshot: DetachedSnapshot): DetachedSnapshot {
  return {
    ...snapshot,
    ...(typeof snapshot.diagnostic === "string" ? { diagnostic: withinFieldBytes(snapshot.diagnostic) } : {}),
    ...(typeof snapshot.reconcileHint === "string" ? { reconcileHint: withinFieldBytes(snapshot.reconcileHint) } : {}),
  };
}

/** A refusal as the wiring returns it: the error's own category when it is an authorization refusal, else validation. */
function refusalOf(error: unknown): Extract<DetachedObservation, { kind: "refused" }> {
  const category = error instanceof CapabilityError && error.category === "authorization" ? "authorization" : "validation";
  const message = error instanceof Error ? error.message : String(error);
  return { kind: "refused", category, diagnostic: sanitizeWorkbenchText(message, DETACHED_WIRING_DIAGNOSTIC_CHARS, "label") };
}

/** The wiring of one host process: the receipts it holds, and the two seams that use them; see the module header. */
export class DetachedObserveWiring {
  private readonly receipts = new Map<string, DetachedReceipt>();

  /** A launch seam's receipt, retained for the invocation's later readings. It projects nothing. */
  launched(receipt: DetachedReceipt): void {
    if (typeof receipt.invocationId !== "string" || this.receipts.has(receipt.invocationId)) return;
    if (this.receipts.size >= DETACHED_WIRING_MAX_RECEIPTS) {
      const oldest = this.receipts.keys().next().value;
      if (oldest !== undefined) this.receipts.delete(oldest);
    }
    this.receipts.set(receipt.invocationId, receipt);
  }

  /** One reading the host took of `invocationId` (an inspect's snapshot), projected and applied as the module header says. */
  observe(host: DetachedObserveHost, invocationId: string, snapshot: DetachedSnapshot): DetachedObservation {
    try {
      if (snapshot.invocationId !== invocationId) throw refused("the reading names a different invocation than the one the host read");
      // The receipt the host holds is the basis; a live reading's embedded receipt is checked against it by the adapter.
      const receipt = this.receipts.get(invocationId) ?? snapshot.receipt;
      if (receipt === undefined) throw refused("no receipt is held for the invocation, so the reading names no host process to state");
      if (typeof receipt.pid === "number" && receipt.pid > DETACHED_WIRING_MAX_PID) {
        throw refused("the receipt's pid is past the ten digits the control adapter's ownership confirmation admits");
      }
      const reading = projectDetachedReading({
        receipt, snapshot: boundedSnapshot(snapshot), scope: { workspace: host.scope.workspace, principal: host.scope.principal },
        operator: host.operator(), observedAt: host.now(),
      });
      const [invocation] = reading.snapshots;
      if (invocation !== undefined) {
        const held = host.projection.query({ scope: invocation.scope, ref: invocation.source, limit: 1 }).nodes[0];
        if (held?.lastConfirmedAt !== undefined && Date.parse(held.lastConfirmedAt) === Date.parse(invocation.capturedAt)) {
          return { kind: "held", reason: "equal-instant" };
        }
      }
      const applied = applyDetachedReading(host.projection, reading);
      this.launched(receipt);
      return { kind: "projected", snapshots: applied.snapshots, related: applied.related, stale: applied.stale };
    } catch (error) {
      return refusalOf(error);
    }
  }
}
