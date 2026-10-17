/** wb-g8f part B.3: the pure deny ladder and minting core behind workflow_reconcile. */
import { describe, expect, it } from "vitest";
import {
  decideReconcile,
  EVIDENCE_GUIDANCE,
  mintEvidenceReceipt,
  type ReconcileDecision,
  type ReconcileDeps,
  type ReconcileRequest,
} from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { type EvidenceReceipt, entryDigestOf } from "../src/workflow/reconcile.js";

const NOW = "2026-10-15T10:00:00Z";
const PRINCIPAL = "local-operator:1:s1";
const SCOPE_TEXT = "Workflow unavailable in this local operator/session/workspace scope.";

const nodeRow: WorkflowJournalEntry = {
  index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1",
  nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-r1" }],
};

function receipt(changes: Partial<EvidenceReceipt> = {}): EvidenceReceipt {
  return mintEvidenceReceipt({
    taskId: "wf_task01", position: 0, producer: "furnace", capabilityId: "furnace.run.inspect",
    input: { runId: "frn-run-r1" }, requestedAt: NOW, observedAt: NOW,
    result: { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", data: { run_id: "frn-run-r1", state: "active" } } },
    recordedNativeRefs: nodeRow.nativeRefs ?? [],
    ...changes,
  });
}

type Changes = Partial<ReconcileRequest> & { params?: unknown };
function request(changes: Changes = {}): ReconcileRequest {
  return {
    action: "acknowledge",
    taskId: "wf_task01",
    position: 0,
    grants: ["workbench:observe", "reconcile:furnace.acknowledge", "reconcile:furnace.override"],
    scope: { workspace: "/ws", principal: PRINCIPAL },
    sessionId: "s1",
    principal: { id: PRINCIPAL, role: "local-operator" },
    params: { reason: "the run exists and is active", determination: "indeterminate", receiptIds: [], noEvidenceReason: "producer-unavailable" },
    ...changes,
  };
}

function deps(changes: Partial<ReconcileDeps> = {}): ReconcileDeps {
  return {
    task: { status: "completed", observationScope: { sessionId: "s1", workspace: "/ws", principal: PRINCIPAL }, journalPath: "/tmp/wf_task01.jsonl" },
    entries: [nodeRow],
    receipts: [],
    currentEffectClass: (capabilityId: string) => (capabilityId === "furnace.run.inspect" ? "read" : "external"),
    now: () => NOW,
    ...changes,
  };
}

function denied(decision: ReconcileDecision): { category: string; reason: string; policy: string } {
  if (decision.decision !== "denied") throw new Error(`expected denied, got ${decision.decision}`);
  return decision;
}

describe("the deny ladder, in order", () => {
  it("denies unknown permission data before anything else", () => {
    const bad = denied(decideReconcile(request({ grants: undefined }), deps()));
    expect(bad).toMatchObject({ policy: "unknown-permission-data", category: "authorization" });
    expect(denied(decideReconcile(request({ grants: ["reconcile:furnace.acknowledge", "nonsense"] }), deps())).policy).toBe("unknown-permission-data");
  });

  it("denies observer-only before any task lookup, identically for unknown and foreign tasks", () => {
    let taskReads = 0;
    const spied: ReconcileDeps = {
      ...deps(),
      get task() {
        taskReads++;
        return undefined;
      },
    };
    const observerGrants = ["workbench:observe", "control:furnace.stop", "inspect:furnace.run", "observe:workbench.workflows", "workbench:design"];
    const unknown = denied(decideReconcile(request({ grants: observerGrants, taskId: "wf_nosuchtask" }), spied));
    const foreign = denied(decideReconcile(request({ grants: observerGrants }), spied));
    expect(unknown.policy).toBe("observer-only");
    expect(foreign.policy).toBe("observer-only");
    expect(unknown.reason).toBe(foreign.reason);
    expect(unknown.reason).not.toContain("furnace");
    expect(taskReads).toBe(0);
  });

  it("denies a malformed request before touching the journal", () => {
    expect(denied(decideReconcile(request({ taskId: "nope" }), deps())).policy).toBe("malformed-request");
    expect(denied(decideReconcile(request({ position: -1 }), deps())).policy).toBe("malformed-request");
    expect(denied(decideReconcile(request({ position: 1000 }), deps())).policy).toBe("malformed-request");
    expect(denied(decideReconcile(request({ params: { reason: "bad \u001b[31m escape" } }), deps())).policy).toBe("malformed-request");
    expect(denied(decideReconcile(request({ params: { reason: "" } }), deps())).policy).toBe("malformed-request");
  });

  it("denies cross-scope with the observe tool's exact text for a missing task and a foreign scope alike", () => {
    const missing = denied(decideReconcile(request(), deps({ task: undefined })));
    const foreignSession = denied(decideReconcile(request({ sessionId: "s2" }), deps()));
    const foreignWorkspace = denied(decideReconcile(request({ scope: { workspace: "/elsewhere", principal: PRINCIPAL } }), deps()));
    for (const decision of [missing, foreignSession, foreignWorkspace]) {
      expect(decision.policy).toBe("cross-scope");
      expect(decision.reason).toBe(SCOPE_TEXT);
    }
  });

  it("denies while the task is still running or paused", () => {
    const running = deps({ task: { ...deps().task, status: "running" } as ReconcileDeps["task"] });
    expect(denied(decideReconcile(request(), running)).policy).toBe("task-active");
  });

  it("denies nothing-to-reconcile when no refusing node row sits at the position", () => {
    const readRow: WorkflowJournalEntry = { ...nodeRow, capabilityId: "furnace.run.inspect", effectClass: "read" };
    const nothing = denied(decideReconcile(request({ position: 0 }), deps({ entries: [readRow], currentEffectClass: () => "read" })));
    expect(nothing.policy).toBe("nothing-to-reconcile");
    expect(denied(decideReconcile(request({ position: 3 }), deps())).policy).toBe("nothing-to-reconcile");
  });

  it("lists and decides nothing at an unclassified node row: wb-tu1 made the runtime refuse it and left this ladder unchanged", () => {
    // The runtime now stops a resume at a node journaled with no effect class
    // (fail-closed), but the decision core still lists and decides only
    // classified rows, so a fresh run is the way past such a position.
    const unclassified: WorkflowJournalEntry = { index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", basis: "b1" };
    const withRow = deps({ entries: [unclassified] });
    for (const action of ["acknowledge", "override", "evidence"] as const) {
      expect(denied(decideReconcile(request({ action }), withRow)).policy).toBe("nothing-to-reconcile");
    }
    const inspect = decideReconcile(request({ action: "inspect" }), withRow);
    if (inspect.decision !== "inspect") throw new Error(`expected inspect, got ${inspect.decision}`);
    expect(inspect.roster.positions).toEqual([]);
  });

  it("denies an unlisted producer before minting any grant literal", () => {
    const foreignRow: WorkflowJournalEntry = { ...nodeRow, capabilityId: "record.write" };
    const decision = denied(decideReconcile(request(), deps({ entries: [foreignRow] })));
    expect(decision.policy).toBe("unknown-producer");
    expect(decision.reason).not.toContain("reconcile:record");
  });

  it("names the exact missing grant only after the scope check", () => {
    const decision = denied(decideReconcile(request({ grants: ["workbench:observe", "reconcile:forge.acknowledge"] }), deps()));
    expect(decision).toMatchObject({ policy: "missing-exact-grant", category: "authorization" });
    expect(decision.reason).toContain("reconcile:furnace.acknowledge");
    // The same request against a foreign scope never names the grant.
    const foreign = denied(decideReconcile(request({ grants: ["workbench:observe", "reconcile:forge.acknowledge"], sessionId: "s2" }), deps()));
    expect(foreign.reason).toBe(SCOPE_TEXT);
  });
});

describe("evidence rules for an acknowledgement", () => {
  it("requires cited receipts to exist for this task and position, from the journaled producer", () => {
    const held = receipt();
    const cite = (receiptIds: string[], extras: Record<string, unknown> = {}) =>
      decideReconcile(request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds, ...extras } }), deps({ receipts: [held] }));
    expect(denied(cite([`rcp_${"f".repeat(32)}`])).policy).toBe("no-evidence-receipt");
    const wrongTask = receipt({ taskId: "wf_other01" });
    expect(denied(decideReconcile(request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds: [wrongTask.receiptId] } }), deps({ receipts: [wrongTask] }))).policy).toBe("evidence-task-mismatch");
    const wrongPosition = receipt({ position: 2 });
    expect(denied(decideReconcile(request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds: [wrongPosition.receiptId] } }), deps({ receipts: [wrongPosition] }))).policy).toBe("evidence-task-mismatch");
    const wrongProducer = receipt({ producer: "forge", capabilityId: "forge.gate.status" });
    expect(denied(decideReconcile(request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds: [wrongProducer.receiptId] } }), deps({ receipts: [wrongProducer] }))).policy).toBe("evidence-producer-mismatch");
  });

  it("denies evidence whose native identity does not bind to the recorded refs", () => {
    const unbound = mintEvidenceReceipt({
      taskId: "wf_task01", position: 0, producer: "furnace", capabilityId: "furnace.run.inspect",
      input: { runId: "frn-run-OTHER" }, requestedAt: NOW, observedAt: NOW,
      result: { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", data: { run_id: "frn-run-OTHER", state: "active" } } },
      recordedNativeRefs: nodeRow.nativeRefs ?? [],
    });
    expect(unbound.binding).toBe("unbound");
    const decision = denied(decideReconcile(
      request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds: [unbound.receiptId] } }),
      deps({ receipts: [unbound] }),
    ));
    expect(decision.policy).toBe("evidence-identity-mismatch");
  });

  it("requires a returned receipt for effect-confirmed and a reason for empty evidence", () => {
    const failed = mintEvidenceReceipt({
      taskId: "wf_task01", position: 0, producer: "furnace", capabilityId: "furnace.run.inspect",
      input: { runId: "frn-run-r1" }, requestedAt: NOW, observedAt: NOW,
      failure: "unavailable", recordedNativeRefs: nodeRow.nativeRefs ?? [],
    });
    expect(failed.outcome).toBe("unavailable");
    expect(denied(decideReconcile(request({ params: { reason: "ok", determination: "effect-confirmed", receiptIds: [failed.receiptId] } }), deps({ receipts: [failed] }))).policy).toBe("effect-confirmed-without-evidence");
    expect(denied(decideReconcile(request({ params: { reason: "ok", determination: "indeterminate", receiptIds: [] } }), deps())).policy).toBe("no-evidence-reason");
  });

  it("bounds the resolved value", () => {
    const decision = denied(decideReconcile(
      request({ params: { reason: "ok", determination: "indeterminate", receiptIds: [], noEvidenceReason: "producer-unavailable", resolvedValue: "x".repeat(33 * 1024) } }),
      deps(),
    ));
    expect(decision.policy).toBe("resolved-value-invalid");
  });
});

describe("minting decisions", () => {
  it("mints a bound, idempotent acknowledgement row", () => {
    const held = receipt();
    const call = () => decideReconcile(
      request({ params: { reason: "run frn-run-r1 is active", determination: "effect-confirmed", receiptIds: [held.receiptId] } }),
      deps({ receipts: [held] }),
    );
    const first = call();
    expect(first.decision).toBe("acknowledge");
    if (first.decision !== "acknowledge") return;
    expect(first.alreadyRecorded).toBe(false);
    expect(Object.isFrozen(first.entry.reconcile)).toBe(true);
    expect(first.entry).toMatchObject({
      index: 0, key: "k0", ok: true, kind: "acknowledge", capabilityId: "furnace.run.start", effectClass: "external",
      reconcile: {
        decision: "acknowledge", taskId: "wf_task01", grant: "reconcile:furnace.acknowledge",
        determination: "effect-confirmed", evidenceClass: "producer-confirmed", settlement: "envelope",
        operator: { principal: PRINCIPAL, role: "local-operator" }, recordedAt: NOW,
        entry: { entryDigest: entryDigestOf(nodeRow) },
      },
    });
    // Same request, with the minted row already journaled: nothing new to append.
    const second = decideReconcile(
      request({ params: { reason: "run frn-run-r1 is active", determination: "effect-confirmed", receiptIds: [held.receiptId] } }),
      deps({ receipts: [held], entries: [nodeRow, first.entry] }),
    );
    expect(second.decision).toBe("acknowledge");
    if (second.decision === "acknowledge") expect(second.alreadyRecorded).toBe(true);
  });

  it("forces settlement none for effect-absent", () => {
    const decision = decideReconcile(
      request({ params: { reason: "nothing exists under that reference", determination: "effect-absent", receiptIds: [], noEvidenceReason: "producer-unavailable" } }),
      deps(),
    );
    expect(decision.decision).toBe("acknowledge");
    if (decision.decision === "acknowledge") expect(decision.entry.reconcile).toMatchObject({ settlement: "none" });
  });

  it("overrides only with the latest acknowledgement cited, own-property confirmation and accepted risk", () => {
    const held = receipt();
    const acked = decideReconcile(
      request({ params: { reason: "confirmed", determination: "effect-confirmed", receiptIds: [held.receiptId] } }),
      deps({ receipts: [held] }),
    );
    if (acked.decision !== "acknowledge") throw new Error("fixture ack failed");
    const ackId = acked.entry.reconcile !== undefined && acked.entry.reconcile.decision === "acknowledge" ? acked.entry.reconcile.acknowledgementId : "";
    const entries = [nodeRow, acked.entry];
    const overrideParams = (extras: Record<string, unknown> = {}) => ({
      reason: "re-run accepted", acknowledgementId: ackId,
      confirmed: true, confirmPosition: 0, confirmCapabilityId: "furnace.run.start", acceptDuplicateRisk: true, ...extras,
    });
    const wrongAck = denied(decideReconcile(request({ action: "override", params: overrideParams({ acknowledgementId: `ack_${"9".repeat(32)}` }) }), deps({ entries, receipts: [held] })));
    expect(["unbound-decision", "conflicting-decisions"]).toContain(wrongAck.policy);
    // confirmed must be an OWN data property: a getter never confirms.
    const getterParams = overrideParams();
    Object.defineProperty(getterParams, "confirmed", { get: () => true, enumerable: true, configurable: true });
    expect(denied(decideReconcile(request({ action: "override", params: getterParams }), deps({ entries, receipts: [held] }))).policy).toBe("operator-confirmation");
    const inherited = Object.create({ confirmed: true });
    Object.assign(inherited, overrideParams());
    delete (inherited as Record<string, unknown>).confirmed;
    expect(denied(decideReconcile(request({ action: "override", params: inherited }), deps({ entries, receipts: [held] }))).policy).toBe("operator-confirmation");
    expect(denied(decideReconcile(request({ action: "override", params: overrideParams({ confirmPosition: 1 }) }), deps({ entries, receipts: [held] }))).policy).toBe("operator-confirmation");
    // effect-confirmed acknowledgement → known duplicate risk; it must be accepted explicitly.
    expect(denied(decideReconcile(request({ action: "override", params: overrideParams({ acceptDuplicateRisk: false }) }), deps({ entries, receipts: [held] }))).policy).toBe("duplicate-risk-unaccepted");
    const permitted = decideReconcile(request({ action: "override", params: overrideParams() }), deps({ entries, receipts: [held] }));
    expect(permitted.decision).toBe("override");
    if (permitted.decision !== "override") return;
    expect(permitted.warning).toContain("once");
    expect(permitted.entry.reconcile).toMatchObject({ decision: "override", duplicateRisk: "known-duplicate", acknowledgementId: ackId });
  });
});

describe("inspect and evidence", () => {
  it("inspect requires workbench:observe, then scope, and lists the pending position with its evidence reads", () => {
    expect(denied(decideReconcile(request({ action: "inspect", grants: ["reconcile:furnace.acknowledge"] }), deps())).policy).toBe("observer-only");
    expect(denied(decideReconcile(request({ action: "inspect", grants: ["workbench:observe"], sessionId: "s2" }), deps())).reason).toBe(SCOPE_TEXT);
    const decision = decideReconcile(request({ action: "inspect", grants: ["workbench:observe"] }), deps());
    expect(decision.decision).toBe("inspect");
    if (decision.decision !== "inspect") return;
    expect(decision.roster.positions[0]).toMatchObject({
      position: 0, capabilityId: "furnace.run.start", effectClass: "external", producer: "furnace",
      state: "pending", evidenceReads: ["furnace.run.inspect"],
    });
  });

  it("evidence permits only an allowlisted read that is currently a read", () => {
    const base = { action: "evidence" as const, grants: ["workbench:observe", "furnace:inspect"] };
    const bad = decideReconcile(request({ ...base, params: { evidence: { capabilityId: "furnace.run.start", input: {} } } }), deps());
    expect(denied(bad).policy).toBe("malformed-request");
    const notRead = decideReconcile(
      request({ ...base, params: { evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-r1" } } } }),
      deps({ currentEffectClass: () => "external" }),
    );
    expect(denied(notRead).policy).toBe("malformed-request");
    const permitted = decideReconcile(
      request({ ...base, params: { evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-r1" } } } }),
      deps(),
    );
    expect(permitted.decision).toBe("evidence");
    if (permitted.decision !== "evidence") return;
    expect(permitted.read).toMatchObject({ producer: "furnace", capabilityId: "furnace.run.inspect", position: 0 });
    expect(permitted.read.recordedNativeRefs).toEqual([{ provider: "furnace", type: "run", id: "frn-run-r1" }]);
  });

  it("publishes fixed evidence guidance that names the failure-is-not-absence rule", () => {
    expect(Object.isFrozen(EVIDENCE_GUIDANCE)).toBe(true);
    expect(EVIDENCE_GUIDANCE.join(" ")).toContain("not evidence of absence");
  });
});

/* --------------------------------------------------------------------------
 * wb-5x0.1: a non-read node is journaled at dispatch with a typed marker row,
 * and its settled row at the same position supersedes it. The decision core
 * lists and decides the row a resume consults — the last node row at the
 * position, as runtime.ts keys them — so a decision binds by the digest the
 * resume compares, and the settled row's native refs drive evidence binding.
 * ------------------------------------------------------------------------ */

describe("a dispatched marker row and its settlement (wb-5x0.1)", () => {
  const { nativeRefs: _settledRefs, ...settledShape } = nodeRow;
  const dispatchedRow: WorkflowJournalEntry = { ...settledShape, ok: false, dispatched: true };
  const inspect = (entries: WorkflowJournalEntry[], changes: Partial<ReconcileDeps> = {}) => {
    const decision = decideReconcile(request({ action: "inspect", grants: ["workbench:observe"] }), deps({ entries, ...changes }));
    if (decision.decision !== "inspect") throw new Error(`expected inspect, got ${decision.decision}`);
    return decision.roster.positions;
  };

  it("lists and decides the settled row that supersedes its dispatched marker, with the settled row's native refs", () => {
    const positions = inspect([dispatchedRow, nodeRow]);
    expect(positions).toHaveLength(1);
    expect(positions[0]).toMatchObject({ position: 0, entryDigest: entryDigestOf(nodeRow), recordedNativeRefs: nodeRow.nativeRefs, state: "pending" });
    expect(positions[0]).not.toHaveProperty("dispatched");

    const evidence = decideReconcile(
      request({ action: "evidence", grants: ["workbench:observe", "furnace:inspect"], params: { evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-r1" } } } }),
      deps({ entries: [dispatchedRow, nodeRow] }),
    );
    expect(evidence.decision === "evidence" ? evidence.read.recordedNativeRefs : undefined).toEqual(nodeRow.nativeRefs);

    const acknowledged = decideReconcile(request(), deps({ entries: [dispatchedRow, nodeRow] }));
    expect(acknowledged.decision === "acknowledge" ? acknowledged.entry.reconcile?.entry.entryDigest : undefined).toBe(entryDigestOf(nodeRow));
  });

  it("lists a dispatch marker that names a read, as the runtime refuses a marker whatever its class", () => {
    const readMarker: WorkflowJournalEntry = { ...dispatchedRow, capabilityId: "record.read", effectClass: "read" };
    // The capability still declares a read, so only the marker can make the row refuse.
    const stillRead = (capabilityId: string) => (capabilityId === "record.read" || capabilityId === "furnace.run.inspect" ? "read" : "external");
    const positions = inspect([readMarker], { currentEffectClass: stillRead }).filter((row) => row.capabilityId === "record.read");
    expect(positions).toEqual([expect.objectContaining({ position: 0, effectClass: "read", state: "pending", dispatched: true })]);
  });

  it("lists a dispatched row nothing settled as pending and marked dispatched, and binds a decision to it", () => {
    const positions = inspect([dispatchedRow]);
    expect(positions).toHaveLength(1);
    expect(positions[0]).toMatchObject({
      position: 0, capabilityId: "furnace.run.start", effectClass: "external", entryDigest: entryDigestOf(dispatchedRow),
      recordedNativeRefs: [], state: "pending", dispatched: true,
    });

    const acknowledged = decideReconcile(request(), deps({ entries: [dispatchedRow] }));
    expect(acknowledged.decision === "acknowledge" ? acknowledged.entry.reconcile?.entry.entryDigest : undefined).toBe(entryDigestOf(dispatchedRow));
  });
});
