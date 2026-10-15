/** wb-g8f part B.2: the pure reconcile records, their binding to a journaled effect, and the admission rules a resume applies. */
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import {
  ACKNOWLEDGEMENT_VALUE_CONTRACT,
  type AcknowledgeRecord,
  acknowledgementValue,
  admitReconcile,
  consumeOverridesAtResume,
  type EvidenceReceipt,
  entryDigestOf,
  indexReconciliations,
  isReconcileRecord,
  markApplied,
  markConsumed,
  type OverrideRecord,
  producerOf,
  RECONCILE_CONTRACT_VERSION,
  RECONCILE_EVIDENCE_READS,
  reconcileGrant,
} from "../src/workflow/reconcile.js";

const AT = "2026-10-15T09:00:00Z";
const SCOPE = { workspace: "/tmp/ws", principal: "local-operator:1:s1" };
const OPERATOR = { principal: "local-operator:1:s1", role: "local-operator" };
const effect: WorkflowJournalEntry = { index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1",
  nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-r1" }] };

function receipt(changes: Partial<EvidenceReceipt> = {}): EvidenceReceipt {
  return { receiptId: `rcp_${"a".repeat(32)}`, taskId: "wf_task01", position: 0, producer: "furnace", capabilityId: "furnace.run.inspect",
    inputDigest: "sha256:in", resultDigest: "sha256:out", requestedAt: AT, observedAt: AT, outcome: "returned",
    nativeRef: { provider: "furnace", type: "run", id: "frn-run-r1" }, domainStatus: "active", evidenceRefs: [], binding: "journal-recorded", ...changes };
}
function ack(changes: Partial<AcknowledgeRecord> = {}): AcknowledgeRecord {
  return { contractVersion: RECONCILE_CONTRACT_VERSION, decision: "acknowledge", acknowledgementId: `ack_${"b".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested", taskId: "wf_task01",
    entry: { index: 0, key: "k0", ok: true, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", entryDigest: entryDigestOf(effect) },
    scope: SCOPE, operator: OPERATOR, grant: "reconcile:furnace.acknowledge", recordedAt: AT, reason: "run frn-run-r1 exists and is active",
    determination: "effect-confirmed", evidenceClass: "producer-confirmed", evidence: [receipt()], settlement: "envelope", ...changes };
}
function override(changes: Partial<OverrideRecord> = {}): OverrideRecord {
  return { contractVersion: RECONCILE_CONTRACT_VERSION, decision: "override", overrideId: `ovr_${"c".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted", taskId: "wf_task01",
    entry: { index: 0, key: "k0", ok: true, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", entryDigest: entryDigestOf(effect) },
    scope: SCOPE, operator: OPERATOR, grant: "reconcile:furnace.override", recordedAt: AT, reason: "the run never started; re-run it",
    acknowledgementId: `ack_${"b".repeat(32)}`, duplicateRisk: "none",
    confirmation: { confirmed: true, position: 0, capabilityId: "furnace.run.start", acceptDuplicateRisk: true }, ...changes };
}
const ackRow = (record = ack()): WorkflowJournalEntry => ({ index: 0, key: "k0", ok: true, kind: "acknowledge", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", reconcile: record });
const overrideRow = (record = override()): WorkflowJournalEntry => ({ index: 0, key: "k0", ok: true, kind: "override", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", reconcile: record });
const admit = (entries: WorkflowJournalEntry[], currentKey = "k0", currentCapabilityId = "furnace.run.start") =>
  admitReconcile({ recorded: effect, index: 0, currentKey, currentCapabilityId }, indexReconciliations(entries).get(0));

describe("binding a decision to the journaled effect", () => {
  it("digests the exact node row and changes when any bound field changes", () => {
    expect(entryDigestOf(effect)).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(entryDigestOf({ ...effect })).toBe(entryDigestOf(effect));
    for (const changed of [{ ...effect, index: 1 }, { ...effect, key: "k1" }, { ...effect, ok: false }, { ...effect, capabilityId: "furnace.run.stop" }, { ...effect, effectClass: "write" }, { ...effect, basis: undefined }]) {
      expect(entryDigestOf(changed)).not.toBe(entryDigestOf(effect));
    }
    // Display and reference fields do not bind: a reference added later must not unbind a decision.
    expect(entryDigestOf({ ...effect, nativeRefs: undefined, text: undefined })).toBe(entryDigestOf(effect));
  });

  it("names the producer and mints grants only for producers with an evidence read", () => {
    expect(producerOf("furnace.run.start")).toBe("furnace");
    expect(producerOf("forge-gate.status")).toBe("forge");
    expect(reconcileGrant("furnace", "acknowledge")).toBe("reconcile:furnace.acknowledge");
    expect(reconcileGrant("forge", "override")).toBe("reconcile:forge.override");
    expect(() => reconcileGrant("record", "acknowledge")).toThrow(CapabilityError);
    expect(() => reconcileGrant("__proto__", "acknowledge")).toThrow(CapabilityError);
    expect(Object.isFrozen(RECONCILE_EVIDENCE_READS)).toBe(true);
    expect(RECONCILE_EVIDENCE_READS.furnace).toEqual(["furnace.run.inspect"]);
  });

  it("accepts well-formed records and rejects every malformed variant", () => {
    expect(isReconcileRecord(ack())).toBe(true);
    expect(isReconcileRecord(override())).toBe(true);
    const bad: unknown[] = [
      undefined, null, 1, "ack", { ...ack(), contractVersion: "workbench.reconcile/v0" }, { ...ack(), decision: "acknowledged" },
      { ...ack(), acknowledgementId: "ack_short" }, { ...ack(), recordedAt: "2026-10-15T09:00:00" }, { ...ack(), reason: "" },
      { ...ack(), reason: "with \u001b[31m escape" }, { ...ack(), entry: { ...ack().entry, entryDigest: "sha256:zz" } },
      { ...ack(), determination: "effect-confirmed", evidence: [], noEvidenceReason: "producer-unavailable" },
      { ...ack(), determination: "effect-absent", settlement: "envelope" }, { ...ack(), evidence: [], noEvidenceReason: undefined },
      { ...ack(), evidence: [receipt({ receiptId: "rcp_x" })] }, { ...ack(), scope: { workspace: "/tmp/ws" } },
      { ...override(), acknowledgementId: "ack_nope" }, { ...override(), confirmation: { ...override().confirmation, confirmed: false } },
      { ...override(), duplicateRisk: "maybe" },
    ];
    for (const value of bad) expect(isReconcileRecord(value), JSON.stringify(value)?.slice(0, 80)).toBe(false);
  });
});

describe("admission of operator decisions at a refusing position", () => {
  it("settles a bound, settling acknowledgement; its envelope is never producer-shaped and carries no operator data value", () => {
    const admitted = admit([effect, ackRow()]);
    expect(admitted.kind).toBe("acknowledged");
    if (admitted.kind !== "acknowledged") return;
    const value = acknowledgementValue(admitted.acknowledgement.reconcile) as Record<string, unknown>;
    expect(value).toMatchObject({ contract: ACKNOWLEDGEMENT_VALUE_CONTRACT, decision: "acknowledged", position: 0, capabilityId: "furnace.run.start",
      producer: "furnace", determination: "effect-confirmed", evidenceClass: "producer-confirmed", operator: OPERATOR });
    expect(value).not.toHaveProperty("resolvedValue");
    expect(value).not.toHaveProperty("run_id");
    expect(value.nativeRefs).toEqual([{ provider: "furnace", type: "run", id: "frn-run-r1" }]);
  });

  it("refuses with no decisions, an unbound decision, or a decision bound to another call", () => {
    expect(admit([effect])).toEqual({ kind: "refuse" });
    const unbound = admit([effect, ackRow(ack({ entry: { ...ack().entry, entryDigest: `sha256:${"0".repeat(64)}` } }))]);
    expect(unbound).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/does not bind/) });
    expect(admit([effect, ackRow()], "k-edited")).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/different call/) });
    expect(admit([effect, ackRow()], "k0", "furnace.run.stop")).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/different call/) });
  });

  it("keeps an effect-absent acknowledgement refusing and names the acknowledging principal and the override path", () => {
    const absent = admit([effect, ackRow(ack({ determination: "effect-absent", settlement: "none" }))]);
    expect(absent).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/effect-absent/) });
    expect((absent as { reason: string }).reason).toContain(OPERATOR.principal);
    expect((absent as { reason: string }).reason).toMatch(/override/);
  });

  it("re-runs under a live override that cites the latest acknowledgement, and refuses conflicting or spent ones", () => {
    const live = admit([effect, ackRow(ack({ determination: "effect-absent", settlement: "none" })), overrideRow()]);
    expect(live.kind).toBe("override");
    const superseding = ack({ acknowledgementId: `ack_${"d".repeat(32)}` });
    expect(admit([effect, ackRow(), overrideRow(), ackRow(superseding)])).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/conflicting/) });
    const spent = markConsumed(overrideRow(), { at: AT, outcome: "spent-at-resume-start", byRunId: "wf_prior" });
    expect(admit([effect, ackRow(), overrideRow(), spent])).toMatchObject({ kind: "refuse", reason: expect.stringMatching(/consumed|superseded/) });
    expect(admit([effect, ackRow(), overrideRow(), spent], "k-edited")).toMatchObject({ kind: "refuse" });
  });

  it("spends every live override at the start of a resume, and only those", () => {
    const spent = consumeOverridesAtResume([effect, ackRow(), overrideRow(), markConsumed(overrideRow(override({ overrideId: `ovr_${"e".repeat(32)}` })), { at: AT, outcome: "re-run-ok" })], { byRunId: "wf_next", at: AT });
    expect(spent).toHaveLength(1);
    expect(spent[0]).toMatchObject({ kind: "override", index: 0, key: "k0", reconcile: { overrideId: `ovr_${"c".repeat(32)}`, consumed: { at: AT, outcome: "spent-at-resume-start", byRunId: "wf_next" } } });
    expect(consumeOverridesAtResume([effect, ackRow()], { byRunId: "wf_next", at: AT })).toEqual([]);
  });

  it("stamps applied and consumed copies without touching the originals", () => {
    const row = ackRow();
    const applied = markApplied(row, { at: AT, basis: "b2" });
    expect(applied).toMatchObject({ kind: "acknowledge", reconcile: { applied: { at: AT, basis: "b2" } } });
    expect(row.reconcile).not.toHaveProperty("applied");
    expect(Object.isFrozen(applied.reconcile)).toBe(true);
    expect(() => markApplied(overrideRow() as never, { at: AT })).toThrow(CapabilityError);
    expect(() => markConsumed(row as never, { at: AT, outcome: "re-run-ok" })).toThrow(CapabilityError);
  });
});
