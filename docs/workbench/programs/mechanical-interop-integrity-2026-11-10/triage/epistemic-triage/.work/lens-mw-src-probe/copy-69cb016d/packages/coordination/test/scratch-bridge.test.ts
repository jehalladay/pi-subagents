import test from "node:test";
import assert from "node:assert/strict";
import {
  BRIDGE_REQUIRED_JOURNEYS,
  activateScratchBridge,
  judgeBridgeEvidence,
  parseReceiptBasis,
  type ScratchReceipt,
} from "../dist/index.js";

const receipt = (journey: string, operationId: string, extra?: Partial<ScratchReceipt>): ScratchReceipt => ({
  journey,
  system: "forge",
  basis: "live",
  operationId,
  commandId: `cmd-${operationId}`,
  sha: `sha-${operationId}`,
  ...extra,
});

const greenSet = (): ScratchReceipt[] => [receipt("landing", "op-a"), receipt("inheritance", "op-b")];

test("independent live receipts for both pinned journeys judge green and activate the bridge", () => {
  assert.deepEqual([...BRIDGE_REQUIRED_JOURNEYS], ["landing", "inheritance"]);
  const evidence = judgeBridgeEvidence(greenSet());
  assert.equal(evidence.ok, true);
  assert.equal(evidence.liveByJourney["landing"], 1);
  assert.equal(evidence.liveByJourney["inheritance"], 1);
  const activation = activateScratchBridge(evidence);
  assert.equal(activation.active, true);
  assert.ok(Object.isFrozen(activation) && Object.isFrozen(evidence));
});

test("negative: a journey with no live receipt refuses, and a fixture receipt does not stand in", () => {
  const evidence = judgeBridgeEvidence([receipt("landing", "op-a"), receipt("inheritance", "op-b", { basis: "fixture" })]);
  assert.equal(evidence.ok, false);
  assert.ok(evidence.refusals.some((r) => r.code === "BRIDGE_JOURNEY_UNWITNESSED" && r.detail.includes("inheritance")));
  assert.equal(evidence.liveByJourney["inheritance"], 0);
});

test("negative: an unknown journey and an unknown basis refuse by name", () => {
  const unknownJourney = judgeBridgeEvidence([...greenSet(), receipt("promotion", "op-c")]);
  assert.ok(unknownJourney.refusals.some((r) => r.code === "BRIDGE_JOURNEY_UNKNOWN"));
  const unknownBasis = judgeBridgeEvidence([receipt("landing", "op-a", { basis: "replayed" }), receipt("inheritance", "op-b")]);
  assert.ok(unknownBasis.refusals.some((r) => r.code === "BRIDGE_RECEIPT_BASIS_UNKNOWN"));
  assert.equal(parseReceiptBasis("replayed"), undefined);
  assert.equal(parseReceiptBasis("live"), "live");
});

test("negative: a non-forge system and blank ids refuse", () => {
  const otherSystem = judgeBridgeEvidence([receipt("landing", "op-a", { system: "furnace" }), receipt("inheritance", "op-b")]);
  assert.ok(otherSystem.refusals.some((r) => r.code === "BRIDGE_RECEIPT_SYSTEM_UNKNOWN"));
  const blankIds = judgeBridgeEvidence([receipt("landing", "op-a", { sha: "  " }), receipt("inheritance", "op-b")]);
  assert.ok(blankIds.refusals.some((r) => r.code === "BRIDGE_RECEIPT_IDS_BLANK"));
});

test("negative: two journeys leaning on one operation id refuse: independence means distinct live runs", () => {
  const evidence = judgeBridgeEvidence([receipt("landing", "op-shared"), receipt("inheritance", "op-shared")]);
  assert.equal(evidence.ok, false);
  assert.ok(evidence.refusals.some((r) => r.code === "BRIDGE_SHARED_OPERATION" && r.detail.includes("op-shared")));
});

test("activation on non-green evidence refuses and carries the underlying refusals", () => {
  const evidence = judgeBridgeEvidence([receipt("landing", "op-a")]);
  const activation = activateScratchBridge(evidence);
  assert.equal(activation.active, false);
  assert.ok(activation.refusals.some((r) => r.code === "BRIDGE_EVIDENCE_NOT_GREEN"));
  assert.ok(activation.refusals.some((r) => r.code === "BRIDGE_JOURNEY_UNWITNESSED"));
});
