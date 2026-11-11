/**
 * D7 scratch bridge gated by independent live evidence (APO 12 D7; carried by lrzn.5).
 *
 * The bridge from scratch-native journeys to the shared surfaces activates only on
 * independent LIVE evidence: every required journey (landing, inheritance) witnessed by at
 * least one live scratch receipt, every receipt from the forge system with nonblank
 * operation/command/sha ids, and no two journeys leaning on the same operation. Fixture
 * receipts are visible but activate nothing: a fixture is never a live witness. Activation
 * without green evidence refuses outright.
 */

export const BRIDGE_REQUIRED_JOURNEYS: readonly string[] = Object.freeze(["landing", "inheritance"]);

export type ReceiptBasis = "live" | "fixture";

export const RECEIPT_BASES: readonly ReceiptBasis[] = Object.freeze(["live", "fixture"]);

/** Closed-union decoder: unknown basis text never reaches evidence judgement. */
export function parseReceiptBasis(value: string): ReceiptBasis | undefined {
  return (RECEIPT_BASES as readonly string[]).includes(value) ? (value as ReceiptBasis) : undefined;
}

export type BridgeRefusalCode =
  | "BRIDGE_JOURNEY_UNKNOWN"
  | "BRIDGE_JOURNEY_UNWITNESSED"
  | "BRIDGE_RECEIPT_SYSTEM_UNKNOWN"
  | "BRIDGE_RECEIPT_IDS_BLANK"
  | "BRIDGE_RECEIPT_BASIS_UNKNOWN"
  | "BRIDGE_SHARED_OPERATION"
  | "BRIDGE_EVIDENCE_NOT_GREEN";

export interface BridgeRefusal {
  readonly code: BridgeRefusalCode;
  readonly detail: string;
}

export interface ScratchReceipt {
  readonly journey: string;
  readonly system: string;
  readonly basis: string;
  readonly operationId: string;
  readonly commandId: string;
  readonly sha: string;
}

export interface BridgeEvidenceJudgement {
  readonly ok: boolean;
  readonly liveByJourney: Readonly<Record<string, number>>;
  readonly refusals: readonly BridgeRefusal[];
}

const blank = (value: string): boolean => value.trim() === "";

/** Judge the receipt set against the D7 bar: live, forge-issued, id-complete, independent. */
export function judgeBridgeEvidence(receipts: readonly ScratchReceipt[]): BridgeEvidenceJudgement {
  const refusals: BridgeRefusal[] = [];
  const liveCounts = new Map<string, number>(BRIDGE_REQUIRED_JOURNEYS.map((j) => [j, 0]));
  const liveOperationOwners = new Map<string, string>();
  for (const receipt of receipts) {
    if (!BRIDGE_REQUIRED_JOURNEYS.includes(receipt.journey)) {
      refusals.push({ code: "BRIDGE_JOURNEY_UNKNOWN", detail: `journey ${receipt.journey} is not a pinned bridge journey` });
      continue;
    }
    if (receipt.system !== "forge") {
      refusals.push({ code: "BRIDGE_RECEIPT_SYSTEM_UNKNOWN", detail: `receipt for ${receipt.journey} came from ${receipt.system}; the scratch journeys witness forge` });
      continue;
    }
    const basis = parseReceiptBasis(receipt.basis);
    if (basis === undefined) {
      refusals.push({ code: "BRIDGE_RECEIPT_BASIS_UNKNOWN", detail: `receipt for ${receipt.journey} carries basis ${receipt.basis}` });
      continue;
    }
    if (blank(receipt.operationId) || blank(receipt.commandId) || blank(receipt.sha)) {
      refusals.push({ code: "BRIDGE_RECEIPT_IDS_BLANK", detail: `receipt for ${receipt.journey} is missing an operation, command or sha id` });
      continue;
    }
    if (basis === "fixture") continue;
    const owner = liveOperationOwners.get(receipt.operationId);
    if (owner !== undefined && owner !== receipt.journey) {
      refusals.push({ code: "BRIDGE_SHARED_OPERATION", detail: `journeys ${owner} and ${receipt.journey} lean on one operation ${receipt.operationId}; independence requires distinct live runs` });
      continue;
    }
    liveOperationOwners.set(receipt.operationId, receipt.journey);
    liveCounts.set(receipt.journey, (liveCounts.get(receipt.journey) ?? 0) + 1);
  }
  for (const journey of BRIDGE_REQUIRED_JOURNEYS) {
    if ((liveCounts.get(journey) ?? 0) === 0) {
      refusals.push({ code: "BRIDGE_JOURNEY_UNWITNESSED", detail: `journey ${journey} has no LIVE receipt; fixtures witness nothing for activation` });
    }
  }
  const liveByJourney: Record<string, number> = {};
  for (const [journey, count] of liveCounts) liveByJourney[journey] = count;
  return Object.freeze({ ok: refusals.length === 0, liveByJourney: Object.freeze(liveByJourney), refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}

export interface BridgeActivation {
  readonly schema: "mw.scratch-bridge.v0";
  readonly active: boolean;
  readonly refusals: readonly BridgeRefusal[];
}

/** Activation is a pure consequence of green evidence; anything less refuses. */
export function activateScratchBridge(evidence: BridgeEvidenceJudgement): BridgeActivation {
  if (!evidence.ok) {
    const refusals: BridgeRefusal[] = [{ code: "BRIDGE_EVIDENCE_NOT_GREEN", detail: "the bridge activates only on green independent live evidence" }, ...evidence.refusals];
    return Object.freeze({ schema: "mw.scratch-bridge.v0", active: false, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  return Object.freeze({ schema: "mw.scratch-bridge.v0", active: true, refusals: Object.freeze([]) });
}
