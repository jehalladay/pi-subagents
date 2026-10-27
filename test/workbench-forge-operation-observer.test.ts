/**
 * wb-a3s: a Forge operation this host starts becomes an observed, owned node of the session projection, read only off the
 * issuing connection's own frames and reply, so the control decision core admits it; everything else stays not-admitted.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { decideControl } from "../src/workbench/control.js";
import { createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import type { ForgeCancelOperations } from "../src/workbench/forge-control.js";
import { createRetainedForgeControlExecutor, lookupForgeOperation, releaseForgeOperation, retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import {
  decodeForgeOperationFrame,
  decodeForgeOperationTerminal,
  FORGE_GATE_STEP_KIND,
  FORGE_OPERATION_KIND,
  type ForgeOperationConnection,
  type ForgeOperationFrame,
  forgeGateStepRef,
  forgeGateStepTopology,
  forgeOperationRef,
  forgeOperationStartedSnapshot,
  forgeOperationTerminalSnapshot,
  observeForgeGateRun,
} from "../src/workbench/forge-operation-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { WorkflowTask } from "../src/workflow/task.js";

const SCOPE: ObservationScope = { workspace: "/ws/a3s", principal: "local-operator:1000:s-a3s" };
const OP = "op-0a3s0000000000000000000000000001";
const T0 = "2026-10-17T13:00:00.000Z";
const T1 = "2026-10-17T13:00:01.000Z";
const T2 = "2026-10-17T13:00:02.000Z";
const GRANT = "control:forge.cancel";
const options = { scope: SCOPE };

type CancelReceipt = Awaited<ReturnType<ForgeCancelOperations["cancel"]>>;

/** The first content part of a tool result, narrowed to its text part before the reply is read. */
function firstText(result: { content: ReadonlyArray<{ type: string; text?: string }> }): string {
  const part = result.content[0];
  if (part === undefined || part.type !== "text" || typeof part.text !== "string") throw new Error("tool result carries no text content part");
  return part.text;
}

function acceptedReceipt(operationId: string): CancelReceipt {
  return {
    operationId, cancelIntent: "CANCEL_REQUESTED", cancelAcceptance: "ACCEPTED", cancellationEstablished: false,
    raw: { operation_id: operationId, cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false },
  } as unknown as CancelReceipt;
}

/** A fake issuing connection: records the order of calls, lets the test push frames and settle the reply, counts cancels. */
function fakeConnection() {
  const calls: string[] = [];
  const sinks = new Set<(frame: ForgeOperationFrame) => void>();
  let settle: (reply: unknown) => void = () => {};
  let fail: (error: unknown) => void = () => {};
  let cancels = 0;
  let closes = 0;
  const connection: ForgeOperationConnection = {
    capabilities: { mode: "persistent", stateOf: (name: string) => (name === "operation.cancel" || name === "cancel" ? "supported" : "unknown") } as never,
    operations: { cancel: async (id: string) => { cancels += 1; return acceptedReceipt(id); } },
    onNotification(sink) {
      calls.push("onNotification");
      sinks.add(sink);
      return () => { sinks.delete(sink); };
    },
    request(method, params) {
      calls.push(`request:${method}:${params.root}`);
      return new Promise<unknown>((resolve, reject) => { settle = resolve; fail = reject; });
    },
    close: async () => { closes += 1; },
  };
  return {
    connection, calls,
    frame: (method: string, params: unknown) => { for (const sink of sinks) sink({ method, params }); },
    reply: (value: unknown) => settle(value),
    drop: (error: unknown) => fail(error),
    cancels: () => cancels, closes: () => closes, sinks: () => sinks.size,
  };
}

function deps(projection: ObservationProjection, retained: string[] = [], invocationId?: string) {
  const releases: string[] = [];
  return {
    releases,
    deps: {
      root: SCOPE.workspace, projection, scope: SCOPE, now: () => T1, timeoutMs: 50, ...(invocationId !== undefined ? { invocationId } : {}),
      retain: (operationId: string, connection: ForgeOperationConnection) => {
        retained.push(operationId);
        const release = retainForgeOperation(operationId, { operations: connection.operations, connection, workspaceRoot: SCOPE.workspace });
        return () => { releases.push(operationId); release(); };
      },
    },
  };
}

const target = (): NativeRef => forgeOperationRef(OP);

describe("pure topology off the server's frames (never minted)", () => {
  it("states the started operation running, keyed by the verbatim server id, with its evidence reference", () => {
    const snapshot = forgeOperationStartedSnapshot({ operationId: OP, observedAt: T0 }, options);
    expect(snapshot).toStrictEqual({
      source: { provider: "forge", type: "operation", id: OP }, scope: SCOPE, capturedAt: T0, observedAt: T0, sequence: 0,
      kind: FORGE_OPERATION_KIND, evidenceRefs: [`forge-operation:${OP}`],
      node: { title: `Forge operation ${OP}`, type: "workflow", statusText: "running", statusTone: "active" },
    });
    expect(() => forgeOperationStartedSnapshot({ operationId: "", observedAt: T0 }, options)).toThrow(CapabilityError);
  });

  it("a step frame yields the step node and the operation -> step ownership edge confirmed by that frame", () => {
    const { snapshot, relation } = forgeGateStepTopology({ operationId: OP, step: "long", seq: 1, observedAt: T1 }, options);
    expect(snapshot.source).toStrictEqual(forgeGateStepRef(OP, "long"));
    expect(snapshot.kind).toBe(FORGE_GATE_STEP_KIND);
    expect(snapshot.sequence).toBe(1);
    expect(snapshot.node).toStrictEqual({ title: "Forge gate step long", type: "sdk-operation", statusText: "running", statusTone: "active" });
    expect(snapshot.trace?.correlationIds).toStrictEqual({ operationId: OP, step: "long", seq: "1" });
    expect(relation).toStrictEqual({
      scope: SCOPE, from: forgeOperationRef(OP), to: forgeGateStepRef(OP, "long"), kind: "ownership",
      provenance: { source: "forge", observedAt: T1, nativeConfirmationRef: `${OP}/gate.step_started/1` },
    });
    const finished = forgeGateStepTopology({ operationId: OP, step: "long", seq: 2, observedAt: T2, outcome: "passed" }, options);
    expect(finished.snapshot.node.statusText).toBe("passed");
    expect(finished.snapshot.node.statusTone).toBe("success");
    expect(finished.relation.provenance.nativeConfirmationRef).toBe(`${OP}/gate.step_finished/2`);
    expect(forgeGateStepTopology({ operationId: OP, step: "long", seq: 2, observedAt: T2, outcome: "cancelled" }, options).snapshot.node.statusTone).toBe("unknown");
    expect(() => forgeGateStepTopology({ operationId: OP, step: "", seq: 1, observedAt: T1 }, options)).toThrow(CapabilityError);
  });

  it("the terminal snapshot echoes the reply's disposition as text and maps only the command status to a tone", () => {
    const completed = forgeOperationTerminalSnapshot({ operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2 }, options);
    expect(completed.node).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed", statusTone: "success" });
    expect(completed.evidenceRefs).toStrictEqual([`forge-operation:${OP}:terminal_disposition=completed`]);
    const cancelled = forgeOperationTerminalSnapshot({ operationId: OP, status: "partial", terminalDisposition: "cancelled-established", observedAt: T2 }, options);
    expect(cancelled.node.statusText).toBe("cancelled-established");
    expect(cancelled.node.statusTone).toBe("unknown");
    expect(forgeOperationTerminalSnapshot({ operationId: OP, status: "error", terminalDisposition: "failed", observedAt: T2 }, options).node.statusTone).toBe("failure");
    expect(forgeOperationTerminalSnapshot({ operationId: OP, status: "something-new", terminalDisposition: "odd", observedAt: T2 }, options).node.statusTone).toBe("unknown");
  });

  it("frame and reply decoding use ids verbatim or yield nothing: no repair, no other operation's frames", () => {
    expect(decodeForgeOperationFrame({ method: "operation.started", params: { operation_id: OP, request_id: "2" } }, T0)).toStrictEqual({ kind: "started", operationId: OP });
    expect(decodeForgeOperationFrame({ method: "gate.step_finished", params: { operation_id: OP, seq: 2, step: "long", outcome: "passed", exit_code: 0 } }, T2))
      .toStrictEqual({ kind: "step", step: { operationId: OP, step: "long", seq: 2, observedAt: T2, outcome: "passed" } });
    expect(decodeForgeOperationFrame({ method: "operation.started", params: { operation_id: "" } }, T0)).toBeUndefined();
    expect(decodeForgeOperationFrame({ method: "operation.started", params: null }, T0)).toBeUndefined();
    expect(decodeForgeOperationFrame({ method: "gate.step_started", params: { operation_id: OP, seq: -1, step: "long" } }, T0)).toBeUndefined();
    expect(decodeForgeOperationFrame({ method: "operation.cancel_requested", params: { operation_id: OP } }, T0)).toBeUndefined();
    expect(decodeForgeOperationTerminal({ operation_id: OP, status: "success", terminal_disposition: "completed" }, OP, T2))
      .toStrictEqual({ operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2 });
    expect(decodeForgeOperationTerminal({ operation_id: "op-other", status: "success", terminal_disposition: "completed" }, OP, T2)).toBeUndefined();
    expect(decodeForgeOperationTerminal({ operation_id: OP, status: "success" }, OP, T2)).toBeUndefined();
  });
});

describe("the live observer over the issuing connection", () => {
  it("subscribes before it writes gate.run, admits the operation on the started frame and the ownership edge on the first step frame", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const retained: string[] = [];
    const pending = observeForgeGateRun(fake.connection, deps(projection, retained).deps);
    expect(fake.calls).toStrictEqual(["onNotification", `request:gate.run:${SCOPE.workspace}`]);
    // The connection is dedicated to this one gate.run, so the first started frame it carries names this operation.
    fake.frame("operation.started", { operation_id: OP, request_id: "2" });
    const observer = await pending;
    try {
      expect(observer.operationId).toBe(OP);
      expect(retained).toStrictEqual([OP]);
      expect(lookupForgeOperation(OP)?.workspaceRoot).toBe(SCOPE.workspace);
      const node = projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0];
      expect(node?.presentation.statusText).toBe("running");
      // Observed but unowned: the decision core denies no-confirmed-ownership until the server states a step under it.
      const early = decideControl({ scope: SCOPE, principal: { id: SCOPE.principal }, grants: [GRANT], target: target(), action: "cancel", params: { confirmed: true }, invocationId: "wf_a3s", requestedAt: T1 }, { projection, now: () => T1 });
      expect(early).toMatchObject({ decision: "denied", policy: "no-confirmed-ownership" });
      fake.frame("gate.step_started", { operation_id: OP, seq: 1, step: "long" });
      const permitted = decideControl({ scope: SCOPE, principal: { id: SCOPE.principal }, grants: [GRANT], target: target(), action: "cancel", params: { confirmed: true }, invocationId: "wf_a3s", requestedAt: T1 }, { projection, now: () => T1 });
      expect(permitted.decision).toBe("permitted");
      if (permitted.decision === "permitted") expect(permitted.receipt.ownershipConfirmationRef).toBe(`${OP}/gate.step_started/1`);
      // A foreign operation's frames never touch this observer's nodes.
      fake.frame("gate.step_started", { operation_id: "op-foreign0000000000000000000000000", seq: 1, step: "long" });
      expect(projection.query({ scope: SCOPE, limit: 10 }).nodes).toHaveLength(2);
      expect(fake.cancels()).toBe(0);
    } finally {
      observer.close();
      releaseForgeOperation(OP);
    }
  });

  it("the operation's own reply settles the node, releases the retention and closes the owned connection; nothing before it does", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const { deps: observerDeps, releases } = deps(projection);
    const pending = observeForgeGateRun(fake.connection, observerDeps);
    fake.frame("operation.started", { operation_id: OP, request_id: "2" });
    const observer = await pending;
    fake.frame("gate.step_started", { operation_id: OP, seq: 1, step: "long" });
    fake.frame("gate.step_finished", { operation_id: OP, seq: 2, step: "long", outcome: "passed", exit_code: 0 });
    expect(projection.query({ scope: SCOPE, ref: forgeGateStepRef(OP, "long"), limit: 1 }).nodes[0]?.presentation.statusText).toBe("passed");
    expect(releases).toStrictEqual([]);
    expect(fake.closes()).toBe(0);
    fake.reply({ operation_id: OP, status: "success", terminal_disposition: "completed", lifecycle_state: "TERMINAL" });
    expect(await observer.settled).toBe("settled");
    await new Promise(resolve => setImmediate(resolve));
    const node = projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0];
    expect(node?.presentation).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed", statusTone: "success" });
    expect(releases).toStrictEqual([OP]);
    expect(lookupForgeOperation(OP)).toBeUndefined();
    expect(fake.closes()).toBe(1);
    expect(fake.sinks()).toBe(0);
    expect(fake.cancels()).toBe(0);
  });

  it("a reply echoing another operation or a dropped transport marks the node stale instead of settling it", async () => {
    for (const end of ["foreign-echo", "transport"] as const) {
      const projection = new ObservationProjection();
      const fake = fakeConnection();
      const pending = observeForgeGateRun(fake.connection, deps(projection).deps);
      fake.frame("operation.started", { operation_id: OP, request_id: "2" });
      const observer = await pending;
      if (end === "foreign-echo") fake.reply({ operation_id: "op-other", status: "success", terminal_disposition: "completed" });
      else fake.drop(new Error("transport closed"));
      expect(await observer.settled).toBe(end === "foreign-echo" ? "settled" : "transport-ended");
      const node = projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0];
      expect(node?.freshness).toBe("stale");
      expect(node?.presentation.statusText).toBe("running");
      expect(lookupForgeOperation(OP)).toBeUndefined();
    }
  });

  it("no started frame within the bound: typed unavailable, the connection closed, nothing observed", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    await expect(observeForgeGateRun(fake.connection, deps(projection).deps)).rejects.toMatchObject({ category: "unavailable" });
    expect(fake.closes()).toBe(1);
    expect(projection.query({ scope: SCOPE, limit: 10 }).nodes).toHaveLength(0);
    expect(lookupForgeOperation(OP)).toBeUndefined();
  });

  it("observer close stops observing and marks the node stale; it cancels nothing and leaves the retention; dispose releases and closes", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const pending = observeForgeGateRun(fake.connection, deps(projection).deps);
    fake.frame("operation.started", { operation_id: OP, request_id: "2" });
    const observer = await pending;
    const revision = projection.window({ scope: SCOPE, invocationId: "none", offset: 0, limit: 1 }).revision;
    observer.close();
    expect(projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0]?.freshness).toBe("stale");
    fake.frame("gate.step_started", { operation_id: OP, seq: 1, step: "long" });
    expect(projection.query({ scope: SCOPE, limit: 10 }).nodes).toHaveLength(1);
    expect(projection.window({ scope: SCOPE, invocationId: "none", offset: 0, limit: 1 }).revision).toBeGreaterThan(revision);
    expect(lookupForgeOperation(OP)?.workspaceRoot).toBe(SCOPE.workspace);
    expect(fake.cancels()).toBe(0);
    expect(fake.closes()).toBe(0);
    await observer.dispose();
    expect(lookupForgeOperation(OP)).toBeUndefined();
    expect(fake.closes()).toBe(1);
    expect(fake.cancels()).toBe(0);
  });

  it("through the registered tool's constructor and the production forge executor: the observed, owned operation is cancelled over its own connection; an unobserved id stays cross-scope", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const pending = observeForgeGateRun(fake.connection, deps(projection, [], "wf_a3s").deps);
    fake.frame("operation.started", { operation_id: OP, request_id: "2" });
    const observer = await pending;
    fake.frame("gate.step_started", { operation_id: OP, seq: 1, step: "long" });
    const task = { id: "wf_a3s" } as unknown as WorkflowTask;
    const toolDeps: WorkflowControlDeps = {
      grants: () => [GRANT], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s-a3s",
      projection, tasks: new Map([["wf_a3s", task]]), now: () => T1, executors: { forge: createRetainedForgeControlExecutor(() => T1) },
    };
    const tool = createWorkflowControlTool(toolDeps);
    const ctx = { cwd: SCOPE.workspace, sessionManager: { getSessionId: () => "s-a3s" } } as never;
    try {
      const reply = JSON.parse(firstText(await tool.execute("a3s", { target: target(), action: "cancel", confirmed: true } as never, undefined, undefined, ctx)));
      expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
      expect(fake.cancels()).toBe(1);
      const foreign = JSON.parse(firstText(await tool.execute("a3s-2", { target: { provider: "forge", type: "operation", id: "op-never00000000000000000000000000" }, action: "cancel", confirmed: true } as never, undefined, undefined, ctx)));
      expect(foreign).toMatchObject({ ok: false, invoked: false, error: { code: "cross-scope" } });
      expect(fake.cancels()).toBe(1);
    } finally {
      await observer.dispose();
    }
  });
});

/**
 * wb-6ps1.2 (R2 (a)): no Pi surface equates a forge observation with the native verifier receipt - a
 * selected or partial run is never a full-gate PASS, and the selected-versus-complete universe travels with the verdict as
 * its own facet whenever the producer publishes it. The three `data` blocks below were MEASURED on 2026-10-23 with the
 * installed forge 0.2.1 (rev bd7d9f8e68ad) over a scratch package whose gate is alpha, beta, gamma: `forge gate --json`
 * (status success, gate_verdict PASS), `forge gate --json --only alpha` (status partial, gate_verdict COULD_NOT_JUDGE) and
 * `forge gate --json -- --extra-arg` (status success, gate_verdict null, gate_passed false). The served gate.run reply is that
 * same serialized envelope with the operation fields beside it (Forge src/forge/application/gate_methods.py run_gate_method).
 * Only the narrowed `-- <args>` arm publishes a `data.selection` key: the full and the --only arm carry none (the key is
 * absent, not null), so neither of their blocks states one (wb-dqhl; re-measured 2026-10-25 with forge 0.2.1 rev
 * 40c9ca729f7e, where the gate_verdict, selection and selection_accounting readings of all three arms equal these blocks).
 */
const MEASURED_FULL = {
  gate_verdict: "PASS",
  selection_accounting: {
    counts: { declared: 3, executed: 3, explicitly_narrowed: 0, not_run: 0, replayed: null, resume_attested: 0, resume_unattested: 0, selected: 3, unaffected: 0, unknown: 0 },
    not_applicable: ["replayed"], policy: "impacted/v2", selected_steps_passed: true, unit: "step",
    units: [
      { basis: { globs: [], kind: "selection-not-requested", paths: [], via: [] }, outcome: "executed", ref: "alpha", selection: "selected" },
      { basis: { globs: [], kind: "selection-not-requested", paths: [], via: [] }, outcome: "executed", ref: "beta", selection: "selected" },
      { basis: { globs: [], kind: "selection-not-requested", paths: [], via: [] }, outcome: "executed", ref: "gamma", selection: "selected" },
    ],
  },
};
const MEASURED_ONLY_ALPHA = {
  gate_verdict: "COULD_NOT_JUDGE",
  selection_accounting: {
    counts: { declared: 3, executed: 1, explicitly_narrowed: 2, not_run: 0, replayed: null, resume_attested: 0, resume_unattested: 0, selected: 1, unaffected: 0, unknown: 0 },
    not_applicable: ["replayed"], policy: "impacted/v2", selected_steps_passed: true, unit: "step",
    units: [
      { basis: { globs: [], kind: "selection-not-requested", paths: [], via: [] }, outcome: "executed", ref: "alpha", selection: "selected" },
      { basis: { globs: [], kind: "explicitly-narrowed", paths: [], via: [] }, outcome: null, ref: "beta", selection: "explicitly_narrowed" },
      { basis: { globs: [], kind: "explicitly-narrowed", paths: [], via: [] }, outcome: null, ref: "gamma", selection: "explicitly_narrowed" },
    ],
  },
};
const MEASURED_ARGS = {
  gate_verdict: null,
  selection: { denominator_complete: false, narrowed: true, requested: ["--extra-arg"], requested_distinct: null, scope_applied: null, selected_by: "cli-args", tests_collected: null, tests_deselected: null },
  selection_accounting: MEASURED_FULL.selection_accounting,
};
/**
 * NOT measured: the documented member arm ("a fan-out whose every member skipped as unaffected exits 0", Forge
 * docs/agent-interface.md § data.selection_accounting), built from that section's wire form.
 */
const DOCUMENTED_MEMBERS_UNAFFECTED = {
  gate_verdict: null,
  selection_accounting: {
    counts: { declared: 2, executed: 0, explicitly_narrowed: 0, not_run: 0, replayed: null, resume_attested: 0, resume_unattested: 0, selected: 0, unaffected: 2, unknown: 0 },
    not_applicable: ["replayed"], policy: "affected/v1", selected_steps_passed: null, unit: "member",
    units: [
      { basis: { globs: [], kind: "changed-paths", paths: [], via: [] }, outcome: null, ref: "code:one", selection: "unaffected" },
      { basis: { globs: [], kind: "changed-paths", paths: [], via: [] }, outcome: null, ref: "code:two", selection: "unaffected" },
    ],
  },
};
const settledReply = (status: string, data?: unknown, disposition = "completed"): Record<string, unknown> =>
  ({ operation_id: OP, status, terminal_disposition: disposition, lifecycle_state: "TERMINAL", ...(data !== undefined ? { data } : {}) });
/*
 * wb-dqhl cut #4: THE U1 CLASS GUARD, in the enumerate-the-resolvable form (rule 19(c)/(d); refusal #3, U2). The class: the kills
 * the landed test file (blob ced0bb61) drew from the `selection: null` that MEASURED_FULL and MEASURED_ONLY_ALPHA carried, and from
 * the key slot it held in front of selection_accounting, lost when wb-dqhl cut #1 dropped that null from the measured fixtures.
 * PINNED SET: each dimension, the parts of this guard that pin it, and the members (src mutants, named as the gate and seat
 * batteries on wb-dqhl name them) it kills. Nothing outside these six dimensions is claimed.
 *   P1 block shape - a null selection beside each of the 20 accounting blocks this file builds (the null twin in terminalOf, the
 *      U1 case's 20-block loop): GW1, GW1b, GW1c, GW3, N1, N2, N3, N5, N7, N8, N9, N10, N11, Q1, Q2, Q4, Q7, Q8.
 *   P2 gate_verdict, status and disposition - each null twin keeps its reply's own (the null twin in terminalOf): Z1, Z2, Z3, Z4,
 *      Z7, Q5.
 *   P3 the observer path - the three observed gate.run replies against their null twins (the U1 class case): Z5, Q6.
 *   P4 inherited data - the landed inherited data block against its null twin (the U1 class case): Z6.
 *   P5 the null key's slot - the null twin inserts the key just before the accounting block, at the landed key count (the null
 *      twin in terminalOf): Z8, Q3.
 *   P6 the key position of a stated selection - the order twin in terminalOf moves a stated selection key to the other side of
 *      selection_accounting, so the five landed replies that state a non-null selection over MEASURED_FULL (the four malformed
 *      test-selection renders and the inherited-flag render) render again in the landed order: KO1, KO2 (KO3 and KO4 stay killed).
 * CONSTRUCTION (an argument, not a measurement): each landed evaluation behind P1-P6 is re-evaluated as a structural copy of the
 * landed reply - the same own keys in the same order, every value by reference - inside the same terminalOf call (or the U1 class
 * case's explicit reads), after its own reply, and must decode and render exactly as that reply. So a decode that reads each reply
 * on its own keys and values alone is killed here wherever the landed file killed it.
 * NAMED RESIDUALS: the known-unpinned families of the class, each with a pinned quiet row (a case that reds when its family stops
 * reading quiet through this guard, or when its page stops carrying the family).
 *   R-SEQUENCE - a decode whose reading of a reply depends on the reads before it: the guard reads every twin after its reply, so
 *      no landed reply is ever a first read here. Quiet row: "wb-dqhl (U1 residual R-SEQUENCE): ...".
 *   R-SHARED-VALUES - a decode keyed on the identity of a value the reply carries: every twin carries its reply's values by
 *      reference, so a reading memoized on the reply's accounting block is read back for its twin. Quiet row: "wb-dqhl (U1
 *      residual R-SHARED-VALUES): ...".
 * Outside the class (refusal #3: no row owed): MX6 and MX7 (prototype-chain reads, pre-existing at base) and C5 and C7 (the U3
 * lexical controls).
 */
/**
 * wb-dqhl (U1 class guard): a reply's null twin - the same reply whose own data record, stating no selection key, gains
 * `selection: null` just before its accounting block, where MEASURED_FULL and MEASURED_ONLY_ALPHA carried it until wb-dqhl cut #1
 * (NOT measured: forge 0.2.1 omits the key, see the fixture comment above). Every other own field is kept in its order, so the twin
 * of a reply built from those fixtures is the reply the landed fixtures built. Undefined when the reply has no own data record or
 * its data already states a selection.
 */
const nullTwin = (reply: unknown): Record<string, unknown> | undefined => {
  if (typeof reply !== "object" || reply === null || !Object.hasOwn(reply, "data")) return undefined;
  const { data } = reply as { data: unknown };
  if (typeof data !== "object" || data === null || Array.isArray(data) || Object.hasOwn(data, "selection")) return undefined;
  const fields: [string, unknown][] = Object.entries(data);
  const at = fields.findIndex(([key]) => key === "selection_accounting");
  fields.splice(at === -1 ? fields.length : at, 0, ["selection", null]);
  return { ...reply, data: Object.fromEntries(fields) };
};
/**
 * wb-dqhl cut #4 (U1 class guard, P6): a reply's order twin - the same reply whose own data record states a selection key and an
 * accounting block, with the selection key moved to the other side of selection_accounting (just after it when it came first,
 * just before it when it came after). Every other own field keeps its order and every value is kept by reference, so the order
 * twin of a reply built as { ...MEASURED_FULL, selection } is the reply the landed fixtures built ([gate_verdict, selection,
 * selection_accounting]). Undefined when the reply has no own data record or its data states no selection key or no accounting block.
 */
const orderTwin = (reply: unknown): Record<string, unknown> | undefined => {
  if (typeof reply !== "object" || reply === null || !Object.hasOwn(reply, "data")) return undefined;
  const { data } = reply as { data: unknown };
  if (typeof data !== "object" || data === null || Array.isArray(data)) return undefined;
  const fields: [string, unknown][] = Object.entries(data);
  const from = fields.findIndex(([key]) => key === "selection");
  const anchor = fields.findIndex(([key]) => key === "selection_accounting");
  if (from === -1 || anchor === -1) return undefined;
  const moved = fields.splice(from, 1);
  const at = fields.findIndex(([key]) => key === "selection_accounting");
  fields.splice(from < anchor ? at + 1 : at, 0, ...moved);
  return { ...reply, data: Object.fromEntries(fields) };
};
/** A reply's own data record's own keys, in order (none when the reply has no own data record). */
const dataKeys = (reply: unknown): string[] => {
  if (typeof reply !== "object" || reply === null || !Object.hasOwn(reply, "data")) return [];
  const { data } = reply as { data: unknown };
  return typeof data === "object" && data !== null && !Array.isArray(data) ? Object.keys(data) : [];
};
/** One own field of a reply's own data record, or undefined. */
const dataField = (reply: unknown, key: string): unknown => {
  if (typeof reply !== "object" || reply === null || !Object.hasOwn(reply, "data")) return undefined;
  const { data } = reply as { data: unknown };
  return typeof data === "object" && data !== null && Object.hasOwn(data, key) ? (data as Record<string, unknown>)[key] : undefined;
};
type TerminalDecode = typeof decodeForgeOperationTerminal;
/**
 * wb-dqhl cut #4 (the residual quiet rows): how a residual family's decode misreads a reply of a landed shape - GW1's reading of a
 * null selection beside the accounting block (a withheld test block) and KO1's of a withheld selection that precedes it (no test
 * block); any other reply keeps the real decode's reading.
 */
const misread = (reply: unknown, terminal: ReturnType<TerminalDecode>): ReturnType<TerminalDecode> => {
  const keys = dataKeys(reply);
  if (terminal === undefined || terminal.selection === undefined || !keys.includes("selection") || !keys.includes("selection_accounting")) return terminal;
  const { units, tests } = terminal.selection;
  const kept = units !== undefined ? { units } : {};
  if (dataField(reply, "selection") === null) return { ...terminal, selection: { ...kept, tests: "withheld" as const } };
  if (tests === "withheld" && keys.indexOf("selection") < keys.indexOf("selection_accounting")) return { ...terminal, selection: kept };
  return terminal;
};
/** R-SEQUENCE's family as a decode: its first read misreads a reply of a landed shape, and every later read is the real decode's. */
const firstReadDecode = (): TerminalDecode => {
  let reads = 0;
  return (reply, operationId, observedAt) => {
    reads += 1;
    const terminal = decodeForgeOperationTerminal(reply, operationId, observedAt);
    return reads === 1 ? misread(reply, terminal) : terminal;
  };
};
/** R-SHARED-VALUES's family as a decode: its reading is memoized on the accounting block a reply carries, and its first reading of a block misreads a reply of a landed shape. */
const blockMemoDecode = (): TerminalDecode => {
  const readings = new Map<unknown, ReturnType<TerminalDecode>>();
  return (reply, operationId, observedAt) => {
    const block = dataField(reply, "selection_accounting");
    if (block !== undefined && readings.has(block)) return readings.get(block);
    const reading = misread(reply, decodeForgeOperationTerminal(reply, operationId, observedAt));
    if (block !== undefined) readings.set(block, reading);
    return reading;
  };
};
/**
 * The reply's terminal node. wb-dqhl (U1 class guard): every render here also renders the reply's null twin and requires it to
 * decode and render exactly as the reply, so each reply a case builds keeps the null reading the landed fixtures gave it - with
 * its own gate_verdict, status and disposition - derived from the replies the cases build, never from a list of them.
 * wb-dqhl cut #4 (P6): it renders the reply's order twin the same way, and it reads the reply and its twins through `decode` - the
 * real decode, except in the two residual quiet rows, which pass their family's decode.
 */
const terminalOf = (reply: unknown, decode: TerminalDecode = decodeForgeOperationTerminal) => {
  const terminal = decode(reply, OP, T2);
  if (terminal === undefined) throw new Error("the reply names no terminal for the operation");
  const snapshot = forgeOperationTerminalSnapshot(terminal, options);
  const twin = nullTwin(reply);
  if (twin !== undefined) {
    const twinTerminal = decode(twin, OP, T2);
    expect(twinTerminal, "wb-dqhl (U1): the reply's null twin decodes as the reply").toStrictEqual(terminal);
    expect(twinTerminal === undefined ? undefined : forgeOperationTerminalSnapshot(twinTerminal, options), "wb-dqhl (U1): the reply's null twin renders as the reply").toStrictEqual(snapshot);
  }
  const moved = orderTwin(reply);
  if (moved !== undefined) {
    const movedTerminal = decode(moved, OP, T2);
    expect(movedTerminal, "wb-dqhl (U1 P6): the reply's order twin decodes as the reply").toStrictEqual(terminal);
    expect(movedTerminal === undefined ? undefined : forgeOperationTerminalSnapshot(movedTerminal, options), "wb-dqhl (U1 P6): the reply's order twin renders as the reply").toStrictEqual(snapshot);
  }
  return snapshot;
};
/**
 * The pages of the two residual quiet rows: replies the landed cases build whose twin is the reply the landed fixtures built - the
 * two measured unnarrowed replies (a null twin) and the five replies that state a non-null selection over MEASURED_FULL (an order twin).
 */
const residualPages = (): [string, Record<string, unknown>][] => {
  const inheritedFlag = Object.assign(Object.create({ narrowed: false }) as Record<string, unknown>, { denominator_complete: null });
  return [
    ["the measured full reply", settledReply("success", MEASURED_FULL)],
    ["the measured --only reply", settledReply("partial", MEASURED_ONLY_ALPHA)],
    ...[{ narrowed: "yes" }, { narrowed: false, denominator_complete: "no" }, "narrowed", [], inheritedFlag].map((selection): [string, Record<string, unknown>] => [
      `the stated selection ${JSON.stringify(selection)}`,
      settledReply("success", { ...MEASURED_FULL, selection }),
    ]),
  ];
};
/** A residual page's loud reading: the statusText a first read of its landed reply gives under the family's misreading. */
const loudText = (page: Record<string, unknown>): string => {
  const text = terminalOf(page).node.statusText;
  return nullTwin(page) !== undefined ? `${text} · tests UNKNOWN` : text.replace(/ · tests UNKNOWN$/, "");
};
const withUnits = (change: Record<string, unknown>) => ({ ...MEASURED_FULL, selection_accounting: { ...MEASURED_FULL.selection_accounting, ...change } });
const [ROW_ALPHA, ROW_BETA, ROW_GAMMA] = MEASURED_FULL.selection_accounting.units;
/** A doc comment's text with its delimiters, leading stars and line breaks folded to single spaces, so a wrapped sentence reads whole. */
const commentText = (raw: string): string => raw.replace(/^\/\*\*|\*\/$/g, "").replace(/\n\s*\*/g, " ").replace(/\s+/g, " ").trim();

describe("wb-6ps1.2 (R2 (a)): the selected-versus-complete universe travels with the gate.run verdict", () => {
  it("wb-6ps1.2 (a): the measured complete selection (3 of 3 steps) travels with the verdict as its own facet, complete coverage, and the command status keeps its tone", () => {
    expect(decodeForgeOperationTerminal(settledReply("success", MEASURED_FULL), OP, T2)).toStrictEqual({
      operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2, selection: { units: { unit: "step", selected: 3, declared: 3 } },
    });
    const snapshot = terminalOf(settledReply("success", MEASURED_FULL));
    expect(snapshot.node).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed · selection complete: 3 of 3 steps selected", statusTone: "success" });
    expect(snapshot.coverage).toBe("complete");
    expect(snapshot.evidenceRefs).toStrictEqual([`forge-operation:${OP}:terminal_disposition=completed`]);
    const single = terminalOf(settledReply("success", withUnits({ units: [ROW_ALPHA], counts: { ...MEASURED_FULL.selection_accounting.counts, declared: 1, selected: 1, executed: 1 } })));
    expect(single.node.statusText).toBe("completed · selection complete: 1 of 1 step selected");
    expect(single.node.statusTone).toBe("success");
  });

  it("wb-6ps1.2 (a): the measured --only selection (1 of 3 steps) renders partial with its own facet and never success, whatever command status the reply states", () => {
    for (const [status, tone] of [["partial", "unknown"], ["success", "unknown"], ["error", "failure"]] as const) {
      const snapshot = terminalOf(settledReply(status, MEASURED_ONLY_ALPHA));
      expect(snapshot.node.statusText, status).toBe("completed · selection partial: 1 of 3 steps selected");
      expect(snapshot.node.statusTone, status).toBe(tone);
      expect(snapshot.coverage, status).toBe("partial");
    }
  });

  it("wb-6ps1.2 (a): a selection short of complete by any unselected state - unaffected, explicitly_narrowed or unknown - renders partial, never success", () => {
    for (const state of ["unaffected", "explicitly_narrowed", "unknown"] as const) {
      const units = [ROW_ALPHA, ROW_BETA, { ...ROW_GAMMA, selection: state, outcome: null }];
      const snapshot = terminalOf(settledReply("success", withUnits({ units, counts: { ...MEASURED_FULL.selection_accounting.counts, selected: 2, [state]: 1, executed: 2 } })));
      expect(snapshot.node.statusText, state).toBe("completed · selection partial: 2 of 3 steps selected");
      expect(snapshot.node.statusTone, state).toBe("unknown");
      expect(snapshot.coverage, state).toBe("partial");
    }
  });

  it("wb-6ps1.2 (a): the documented member fan-out whose every member skipped as unaffected (0 of 2 members, exit 0) renders partial, never success", () => {
    const snapshot = terminalOf(settledReply("success", DOCUMENTED_MEMBERS_UNAFFECTED));
    expect(snapshot.node.statusText).toBe("completed · selection partial: 0 of 2 members selected");
    expect(snapshot.node.statusTone).toBe("unknown");
    expect(snapshot.coverage).toBe("partial");
  });

  it("wb-6ps1.2 (a): the measured -- <args> run (status success, gate_verdict null, data.selection narrowed) renders partial with a tests facet beside the complete step facet, never success", () => {
    expect(decodeForgeOperationTerminal(settledReply("success", MEASURED_ARGS), OP, T2)?.selection).toStrictEqual({
      units: { unit: "step", selected: 3, declared: 3 }, tests: { narrowed: true },
    });
    const snapshot = terminalOf(settledReply("success", MEASURED_ARGS));
    expect(snapshot.node.statusText).toBe("completed · selection complete: 3 of 3 steps selected · tests narrowed");
    expect(snapshot.node.statusTone).toBe("unknown");
    expect(snapshot.coverage).toBe("partial");
    // denominator_complete false alone is a narrowed test universe as well.
    const incomplete = terminalOf(settledReply("success", { ...MEASURED_ARGS, selection: { ...MEASURED_ARGS.selection, narrowed: false } }));
    expect(incomplete.node.statusText).toBe("completed · selection complete: 3 of 3 steps selected · tests narrowed");
    expect(incomplete.node.statusTone).toBe("unknown");
    const unnarrowed = terminalOf(settledReply("success", { ...MEASURED_ARGS, selection: { ...MEASURED_ARGS.selection, narrowed: false, denominator_complete: null } }));
    expect(unnarrowed.node.statusText).toBe("completed · selection complete: 3 of 3 steps selected · tests not narrowed");
    expect(unnarrowed.node.statusTone).toBe("success");
    expect(unnarrowed.coverage).toBe("complete");
  });

  const malformedUnits: [string, unknown][] = [
    ["a null block", null],
    ["a block that is not an object", "complete"],
    ["an array block", [MEASURED_FULL.selection_accounting]],
    ["a unit outside step and member", { ...MEASURED_FULL.selection_accounting, unit: "package" }],
    ["units that are not an array", { ...MEASURED_FULL.selection_accounting, units: { alpha: "selected" } }],
    ["a row that is not an object", { ...MEASURED_FULL.selection_accounting, units: [ROW_ALPHA, ROW_BETA, "gamma"] }],
    // Counts agree with the rows here (two selected), so only the closed selection axis can withhold the block.
    ["a row selection outside the closed set", { ...MEASURED_FULL.selection_accounting, units: [ROW_ALPHA, ROW_BETA, { ...ROW_GAMMA, selection: "chosen" }], counts: { ...MEASURED_FULL.selection_accounting.counts, selected: 2 } }],
    ["missing counts", { ...MEASURED_FULL.selection_accounting, counts: undefined }],
    ["counts.declared disagreeing with the rows", { ...MEASURED_FULL.selection_accounting, counts: { ...MEASURED_FULL.selection_accounting.counts, declared: 4 } }],
    ["counts.selected disagreeing with the rows", { ...MEASURED_FULL.selection_accounting, counts: { ...MEASURED_FULL.selection_accounting.counts, selected: 2 } }],
    ["a string count", { ...MEASURED_FULL.selection_accounting, counts: { ...MEASURED_FULL.selection_accounting.counts, declared: "3" } }],
  ];
  it.each(malformedUnits)("wb-6ps1.2 (a): %s is withheld as selection UNKNOWN, unknown coverage, and never lets a success tone stand", (_label, block) => {
    const snapshot = terminalOf(settledReply("success", { ...MEASURED_FULL, selection_accounting: block }));
    expect(snapshot.node.statusText).toBe("completed · selection UNKNOWN");
    expect(snapshot.node.statusTone).toBe("unknown");
    expect(snapshot.coverage).toBe("unknown");
    expect(terminalOf(settledReply("error", { ...MEASURED_FULL, selection_accounting: block })).node.statusTone).toBe("failure");
  });

  it("wb-6ps1.2 (a): a malformed test-selection block is withheld as tests UNKNOWN and never lets a success tone stand", () => {
    for (const selection of [{ narrowed: "yes" }, { narrowed: false, denominator_complete: "no" }, "narrowed", []]) {
      const snapshot = terminalOf(settledReply("success", { ...MEASURED_FULL, selection }));
      expect(snapshot.node.statusText, JSON.stringify(selection)).toBe("completed · selection complete: 3 of 3 steps selected · tests UNKNOWN");
      expect(snapshot.node.statusTone, JSON.stringify(selection)).toBe("unknown");
      expect(snapshot.coverage, JSON.stringify(selection)).toBe("unknown");
    }
  });

  it("wb-6ps1.2 (a): an empty declared universe (0 of 0 steps) judges nothing, so it is never complete and never success", () => {
    const snapshot = terminalOf(settledReply("success", withUnits({ units: [], counts: { ...MEASURED_FULL.selection_accounting.counts, declared: 0, selected: 0, executed: 0 } })));
    expect(snapshot.node.statusText).toBe("completed · selection partial: 0 of 0 steps selected");
    expect(snapshot.node.statusTone).toBe("unknown");
    expect(snapshot.coverage).toBe("partial");
  });

  it("wb-6ps1.2 (a): a test facet with no published unit universe never claims complete coverage or lets a success tone stand", () => {
    const snapshot = terminalOf(settledReply("success", { gate_verdict: "PASS", selection: { narrowed: false, denominator_complete: null } }));
    expect(snapshot.node.statusText).toBe("completed · tests not narrowed");
    expect(snapshot.node.statusTone).toBe("unknown");
    expect(snapshot.coverage).toBe("unknown");
  });

  it("wb-6ps1.2 (a): a reply that publishes no selection block keeps the a3s reading - no facet, no coverage, the command status's tone", () => {
    for (const data of [undefined, null, "data", { gate_verdict: "PASS" }, { selection: null }]) {
      const reply = settledReply("success", data);
      expect(decodeForgeOperationTerminal(reply, OP, T2), JSON.stringify(data)).toStrictEqual({ operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2 });
      const snapshot = terminalOf(reply);
      expect(snapshot.node, JSON.stringify(data)).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed", statusTone: "success" });
      expect("coverage" in snapshot, JSON.stringify(data)).toBe(false);
    }
  });

  it("wb-6ps1.2 (a): an inherited field is never read as a producer statement - inherited data publishes no selection, and an inherited row selection or narrowed flag withholds its block", () => {
    const inheritedData = Object.assign(Object.create({ data: MEASURED_ONLY_ALPHA }) as Record<string, unknown>, settledReply("success"));
    expect(decodeForgeOperationTerminal(inheritedData, OP, T2)).toStrictEqual({ operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2 });
    const inheritedRow = Object.assign(Object.create({ selection: "selected" }) as Record<string, unknown>, { ref: "gamma", outcome: "executed", basis: ROW_GAMMA.basis });
    const rows = terminalOf(settledReply("success", withUnits({ units: [ROW_ALPHA, ROW_BETA, inheritedRow] })));
    expect(rows.node.statusText).toBe("completed · selection UNKNOWN");
    expect(rows.node.statusTone).toBe("unknown");
    const inheritedFlag = Object.assign(Object.create({ narrowed: false }) as Record<string, unknown>, { denominator_complete: null });
    const tests = terminalOf(settledReply("success", { ...MEASURED_FULL, selection: inheritedFlag }));
    expect(tests.node.statusText).toBe("completed · selection complete: 3 of 3 steps selected · tests UNKNOWN");
    expect(tests.node.statusTone).toBe("unknown");
  });

  it("wb-6ps1.2 (a): the facet sits after the echoed disposition, which routes through the shared label layout (a bidi override or a line break displays as a space)", () => {
    const disposition = `cancelled${String.fromCodePoint(0x202e)}established${String.fromCodePoint(0x0a)}late`;
    const snapshot = terminalOf(settledReply("partial", MEASURED_ONLY_ALPHA, disposition));
    expect(snapshot.node.statusText).toBe("cancelled established late · selection partial: 1 of 3 steps selected");
    expect(snapshot.evidenceRefs).toStrictEqual([`forge-operation:${OP}:terminal_disposition=${disposition}`]);
    const invisible = terminalOf(settledReply("success", MEASURED_FULL, String.fromCodePoint(0x200b)));
    expect(invisible.node.statusText).toBe("unprintable terminal_disposition · selection complete: 3 of 3 steps selected");
  });

  it("wb-6ps1.2 (a): through the live observer the measured --only reply settles the operation node partial with its facet, and a gate-step node never carries the workspace verdict", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const pending = observeForgeGateRun(fake.connection, deps(projection).deps);
    fake.frame("operation.started", { operation_id: OP, request_id: "2" });
    const observer = await pending;
    fake.frame("gate.step_started", { operation_id: OP, seq: 1, step: "alpha" });
    fake.frame("gate.step_finished", { operation_id: OP, seq: 2, step: "alpha", outcome: "passed", exit_code: 0 });
    const stepBefore = projection.query({ scope: SCOPE, ref: forgeGateStepRef(OP, "alpha"), limit: 1 }).nodes[0];
    fake.reply(settledReply("partial", MEASURED_ONLY_ALPHA));
    expect(await observer.settled).toBe("settled");
    const node = projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0];
    expect(node?.presentation).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed · selection partial: 1 of 3 steps selected", statusTone: "unknown" });
    expect(node?.completeness).toBe("partial");
    // The step node keeps its own outcome word and tone: neither the disposition, nor a selection facet, nor the verdict's tone reaches it.
    const step = projection.query({ scope: SCOPE, ref: forgeGateStepRef(OP, "alpha"), limit: 1 }).nodes[0];
    expect(step?.presentation).toStrictEqual({ title: "Forge gate step alpha", type: "sdk-operation", statusText: "passed", statusTone: "success" });
    expect(step?.presentation).toStrictEqual(stepBefore?.presentation);
    expect(step?.completeness).toBe(stepBefore?.completeness);
    expect(projection.query({ scope: SCOPE, limit: 10 }).nodes.filter(entry => entry.presentation.statusText.includes("selection"))).toHaveLength(1);
  });

  it("wb-6ps1.2 (a): a gate-step node never carries the workspace verdict - a failed step stays failed under a complete success reply, and a passed step stays passed under a failure reply", async () => {
    for (const [outcome, status, stepTone, operationTone] of [["failed", "success", "failure", "success"], ["passed", "error", "success", "failure"]] as const) {
      const projection = new ObservationProjection();
      const fake = fakeConnection();
      const pending = observeForgeGateRun(fake.connection, deps(projection).deps);
      fake.frame("operation.started", { operation_id: OP, request_id: "2" });
      const observer = await pending;
      fake.frame("gate.step_finished", { operation_id: OP, seq: 1, step: "beta", outcome, exit_code: outcome === "failed" ? 1 : 0 });
      fake.reply(settledReply(status, MEASURED_FULL));
      expect(await observer.settled).toBe("settled");
      const step = projection.query({ scope: SCOPE, ref: forgeGateStepRef(OP, "beta"), limit: 1 }).nodes[0];
      expect(step?.presentation, `${outcome}/${status}`).toStrictEqual({ title: "Forge gate step beta", type: "sdk-operation", statusText: outcome, statusTone: stepTone });
      const node = projection.query({ scope: SCOPE, ref: target(), limit: 1 }).nodes[0];
      expect(node?.presentation.statusTone, `${outcome}/${status}`).toBe(operationTone);
      expect(node?.presentation.statusText, `${outcome}/${status}`).toBe("completed · selection complete: 3 of 3 steps selected");
    }
  });

  it("wb-dqhl (F1): the measured unnarrowed arms (forge gate --json, --only alpha) carry no data.selection key - forge 0.2.1 omits it, absent rather than null - and only the narrowed -- <args> arm carries one", () => {
    // A fixture labelled MEASURED states only what the producer published: null is not a value forge 0.2.1 wrote on those arms.
    expect(Object.keys(MEASURED_FULL).sort()).toStrictEqual(["gate_verdict", "selection_accounting"]);
    expect(Object.keys(MEASURED_ONLY_ALPHA).sort()).toStrictEqual(["gate_verdict", "selection_accounting"]);
    expect(Object.keys(MEASURED_ARGS).sort()).toStrictEqual(["gate_verdict", "selection", "selection_accounting"]);
  });

  it("wb-dqhl (U1): NOT measured - a constructed reply with a null data.selection beside the measured full accounting block decodes to the unit universe only (no tests facet): selection complete, complete coverage, the success tone kept - and beside every accounting block this file pins, a null key reads exactly as an absent one", () => {
    // A null key is not what forge 0.2.1 writes (it omits the key on an unnarrowed run, see the fixture comment above). This reply is
    // built, not captured: it keeps the decode's null clause beside an accounting block pinned now that no measured fixture carries one.
    const nullBeside = { ...MEASURED_FULL, selection: null };
    expect(decodeForgeOperationTerminal(settledReply("success", nullBeside), OP, T2)).toStrictEqual({
      operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2, selection: { units: { unit: "step", selected: 3, declared: 3 } },
    });
    const nullSnapshot = terminalOf(settledReply("success", nullBeside));
    expect(nullSnapshot.node).toStrictEqual({ title: `Forge operation ${OP}`, type: "workflow", statusText: "completed · selection complete: 3 of 3 steps selected", statusTone: "success" });
    expect(nullSnapshot.coverage).toBe("complete");
    // wb-dqhl cut #3: the six blocks the landed cases build through withUnits, each built here exactly as its case builds it (withUnits
    // spreads MEASURED_FULL, so each carried a null selection until cut #1): one row, short of complete by each unselected state, the
    // empty declared universe and an inherited row selection.
    const counts = MEASURED_FULL.selection_accounting.counts;
    const inheritedRow = Object.assign(Object.create({ selection: "selected" }) as Record<string, unknown>, { ref: "gamma", outcome: "executed", basis: ROW_GAMMA.basis });
    const constructed: [string, ReturnType<typeof withUnits>][] = [
      ["the one-row block (1 of 1 step)", withUnits({ units: [ROW_ALPHA], counts: { ...counts, declared: 1, selected: 1, executed: 1 } })],
      ...(["unaffected", "explicitly_narrowed", "unknown"] as const).map((state): [string, ReturnType<typeof withUnits>] => [
        `the block short of complete by ${state} (2 of 3 steps)`,
        withUnits({ units: [ROW_ALPHA, ROW_BETA, { ...ROW_GAMMA, selection: state, outcome: null }], counts: { ...counts, selected: 2, [state]: 1, executed: 2 } }),
      ]),
      ["the empty declared universe (0 of 0 steps)", withUnits({ units: [], counts: { ...counts, declared: 0, selected: 0, executed: 0 } })],
      ["the block with an inherited row selection", withUnits({ units: [ROW_ALPHA, ROW_BETA, inheritedRow] })],
    ];
    const blocks: [string, unknown][] = [
      ["the measured full block", MEASURED_FULL.selection_accounting],
      ["the measured --only block", MEASURED_ONLY_ALPHA.selection_accounting],
      ["the documented member block", DOCUMENTED_MEMBERS_UNAFFECTED.selection_accounting],
      ...malformedUnits,
      ...constructed.map(([label, data]): [string, unknown] => [label, data.selection_accounting]),
    ];
    for (const [label, block] of blocks) {
      for (const status of ["success", "partial", "error"]) {
        const absent = settledReply(status, { gate_verdict: null, selection_accounting: block });
        const nulled = settledReply(status, { gate_verdict: null, selection_accounting: block, selection: null });
        expect(decodeForgeOperationTerminal(nulled, OP, T2), `${label}/${status}`).toStrictEqual(decodeForgeOperationTerminal(absent, OP, T2));
        expect(terminalOf(nulled), `${label}/${status}`).toStrictEqual(terminalOf(absent));
      }
    }
  });

  it("wb-dqhl (U1 class): NOT measured - a reply's null twin is the reply the landed fixtures built (selection: null where MEASURED_FULL and MEASURED_ONLY_ALPHA carried it, nothing else changed), and the inherited data block and the three observed gate.run replies read exactly as their null twins", async () => {
    // The twin terminalOf also renders: for each measured unnarrowed reply it is the landed reply, field for field and in order.
    for (const [fixture, verdict] of [[MEASURED_FULL, "PASS"], [MEASURED_ONLY_ALPHA, "COULD_NOT_JUDGE"]] as const) {
      const twin = nullTwin(settledReply("partial", fixture, "late"));
      expect(twin, verdict).toStrictEqual({ ...settledReply("partial", undefined, "late"), data: { gate_verdict: verdict, selection: null, selection_accounting: fixture.selection_accounting } });
      expect(Object.keys(twin?.data ?? {}), verdict).toStrictEqual(["gate_verdict", "selection", "selection_accounting"]);
    }
    // No twin where the data already states a selection, is not a record, or is absent.
    for (const data of [MEASURED_ARGS, { selection: null }, null, "data", [MEASURED_FULL]]) expect(nullTwin(settledReply("success", data)), JSON.stringify(data)).toBeUndefined();
    expect(nullTwin(settledReply("success"))).toBeUndefined();
    // The landed inherited case's data block, inherited with its null twin: it publishes no selection either.
    const nullOnlyAlpha = nullTwin(settledReply("success", MEASURED_ONLY_ALPHA))?.data;
    expect(nullOnlyAlpha).toStrictEqual({ ...MEASURED_ONLY_ALPHA, selection: null });
    const inheritedTwin = Object.assign(Object.create({ data: nullOnlyAlpha }) as Record<string, unknown>, settledReply("success"));
    expect(decodeForgeOperationTerminal(inheritedTwin, OP, T2)).toStrictEqual({ operationId: OP, status: "success", terminalDisposition: "completed", observedAt: T2 });
    // The three replies the live-observer cases settle: each leaves the projection its null twin leaves.
    const observed = async (reply: unknown, steps: [string, Record<string, unknown>][]) => {
      const projection = new ObservationProjection();
      const fake = fakeConnection();
      const pending = observeForgeGateRun(fake.connection, deps(projection).deps);
      fake.frame("operation.started", { operation_id: OP, request_id: "2" });
      const observer = await pending;
      for (const [method, params] of steps) fake.frame(method, params);
      fake.reply(reply);
      expect(await observer.settled).toBe("settled");
      return projection.query({ scope: SCOPE, limit: 10 });
    };
    const runs: [string, Record<string, unknown>, [string, Record<string, unknown>][]][] = [
      ["the --only reply", settledReply("partial", MEASURED_ONLY_ALPHA), [["gate.step_started", { operation_id: OP, seq: 1, step: "alpha" }], ["gate.step_finished", { operation_id: OP, seq: 2, step: "alpha", outcome: "passed", exit_code: 0 }]]],
      ["the full reply over a failed step", settledReply("success", MEASURED_FULL), [["gate.step_finished", { operation_id: OP, seq: 1, step: "beta", outcome: "failed", exit_code: 1 }]]],
      ["the full error reply over a passed step", settledReply("error", MEASURED_FULL), [["gate.step_finished", { operation_id: OP, seq: 1, step: "beta", outcome: "passed", exit_code: 0 }]]],
    ];
    for (const [label, reply, steps] of runs) {
      const absent = await observed(reply, steps);
      expect(absent.nodes.filter(node => node.presentation.statusText.includes(" · selection ")), label).toHaveLength(1);
      expect(await observed(nullTwin(reply), steps), label).toStrictEqual(absent);
    }
  });

  it("wb-dqhl (U1 P6): NOT measured - a reply's order twin is the reply with its stated selection key on the other side of selection_accounting: for the five landed replies that state a non-null selection over MEASURED_FULL it is the reply the landed fixtures built, for MEASURED_ARGS the accounting-first order, and no order twin is built without a stated selection key or an accounting block", () => {
    const inheritedFlag = Object.assign(Object.create({ narrowed: false }) as Record<string, unknown>, { denominator_complete: null });
    for (const selection of [{ narrowed: "yes" }, { narrowed: false, denominator_complete: "no" }, "narrowed", [], inheritedFlag]) {
      const label = JSON.stringify(selection);
      const reply = settledReply("success", { ...MEASURED_FULL, selection });
      expect(dataKeys(reply), label).toStrictEqual(["gate_verdict", "selection_accounting", "selection"]);
      const twin = orderTwin(reply);
      expect(twin, label).toStrictEqual({ ...settledReply("success"), data: { gate_verdict: "PASS", selection, selection_accounting: MEASURED_FULL.selection_accounting } });
      expect(dataKeys(twin), label).toStrictEqual(["gate_verdict", "selection", "selection_accounting"]);
      expect(dataField(twin, "selection"), label).toBe(selection);
      expect(dataKeys(orderTwin(twin)), label).toStrictEqual(["gate_verdict", "selection_accounting", "selection"]);
    }
    expect(dataKeys(orderTwin(settledReply("success", MEASURED_ARGS)))).toStrictEqual(["gate_verdict", "selection_accounting", "selection"]);
    // No order twin where the data states no selection key or no accounting block, is not a record, or is absent.
    const noTwin = [MEASURED_FULL, { gate_verdict: "PASS", selection: { narrowed: false, denominator_complete: null } }, { selection: null }, null, "data", [MEASURED_ARGS]];
    for (const data of noTwin) expect(orderTwin(settledReply("success", data)), JSON.stringify(data)).toBeUndefined();
    expect(orderTwin(settledReply("success"))).toBeUndefined();
  });

  it("wb-dqhl (U1 residual R-SEQUENCE): NOT measured - pinned quiet reading: a decode whose reading of a reply depends on the reads before it stays quiet through the guard, which reads every twin after its reply, while a first read of the landed reply is loud", () => {
    for (const [label, page] of residualPages()) {
      const landed = nullTwin(page) ?? orderTwin(page);
      // The page carries the family: its twin is the reply the landed fixtures built, and the page itself is not.
      expect(dataKeys(landed), label).toStrictEqual(["gate_verdict", "selection", "selection_accounting"]);
      expect(dataKeys(page), label).not.toStrictEqual(["gate_verdict", "selection", "selection_accounting"]);
      // Quiet through the guard, read first and as terminalOf reads it: the page, then its twin, which the same decode reads as the real decode does.
      expect(terminalOf(page, firstReadDecode()), label).toStrictEqual(terminalOf(page));
      // Then loud on a first read: the family's decode misreads the landed reply read on its own.
      const first = firstReadDecode()(landed, OP, T2);
      expect(first === undefined ? undefined : forgeOperationTerminalSnapshot(first, options).node.statusText, label).toBe(loudText(page));
      expect(loudText(page), label).not.toBe(terminalOf(page).node.statusText);
    }
  });

  it("wb-dqhl (U1 residual R-SHARED-VALUES): NOT measured - pinned quiet reading: a decode memoized on the accounting block a reply carries stays quiet through the guard, whose twins carry their reply's values by reference, while a first read of the landed reply is loud", () => {
    for (const [label, page] of residualPages()) {
      const landed = nullTwin(page) ?? orderTwin(page);
      // The page carries the family: its twin carries the page's own accounting block, by reference.
      expect(typeof dataField(page, "selection_accounting"), label).toBe("object");
      expect(dataField(landed, "selection_accounting"), label).toBe(dataField(page, "selection_accounting"));
      // Quiet through the guard, read first and as terminalOf reads it: the page's own reading is memoized on its block and read back for its twin.
      expect(terminalOf(page, blockMemoDecode()), label).toStrictEqual(terminalOf(page));
      // Then loud on a first read: the family's decode misreads the landed reply read on its own.
      const first = blockMemoDecode()(landed, OP, T2);
      expect(first === undefined ? undefined : forgeOperationTerminalSnapshot(first, options).node.statusText, label).toBe(loudText(page));
      expect(loudText(page), label).not.toBe(terminalOf(page).node.statusText);
    }
  });

  it("wb-dqhl (F1): the decode's doc comment states the measured absence of data.selection on an unnarrowed run and never names null as the producer's own value", () => {
    const text = readFileSync(new URL("../src/workbench/forge-operation-observer.ts", import.meta.url), "utf8");
    const file = ts.createSourceFile("forge-operation-observer.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const decode = file.statements.filter(ts.isFunctionDeclaration).filter(fn => fn.name?.text === "decodeForgeRunSelection");
    expect(decode, "exactly one module-level decodeForgeRunSelection()").toHaveLength(1);
    const docs = (ts.getLeadingCommentRanges(text, decode[0].getFullStart()) ?? []).map(range => commentText(text.slice(range.pos, range.end)));
    expect(docs, "exactly one doc comment above decodeForgeRunSelection()").toHaveLength(1);
    expect(docs[0]).toContain("An unnarrowed run publishes no `data.selection` key (measured, forge 0.2.1: absent, not null)");
    expect(docs[0]).not.toMatch(/`selection: null` is the producer's own value/);
    // wb-dqhl (U3): "never names null" holds for any wording, not only the one landed false sentence: every null the comment names
    // (any case, plurals included) sits inside its one pinned honest sentence, and no invisible format character splits a word out
    // of that reading. The reading is the comment's source text, folded as commentText folds it.
    const honest = "An unnarrowed run publishes no `data.selection` key (measured, forge 0.2.1: absent, not null); a null one decodes the same, to no test universe.";
    expect(docs[0]).toContain(honest);
    expect(docs[0].split(honest).join(" "), "a null named outside the pinned honest sentence").not.toMatch(/null/i);
    expect(docs[0], "an invisible format character in the doc comment").not.toMatch(/\p{Cf}/u);
  });

  it("wb-dqhl (F8): a withheld unit block beside a narrowed test block renders selection UNKNOWN and tests narrowed with partial coverage, and never lets a success tone stand", () => {
    // Both narrowed forms of the measured test block: narrowed true, and denominator_complete false alone.
    for (const tests of [MEASURED_ARGS.selection, { ...MEASURED_ARGS.selection, narrowed: false }]) {
      for (const [label, block] of malformedUnits) {
        const data = { ...MEASURED_ARGS, selection: tests, selection_accounting: block };
        expect(decodeForgeOperationTerminal(settledReply("success", data), OP, T2)?.selection, label).toStrictEqual({ units: "withheld", tests: { narrowed: true } });
        for (const [status, tone] of [["success", "unknown"], ["partial", "unknown"], ["error", "failure"]] as const) {
          const snapshot = terminalOf(settledReply(status, data));
          expect(snapshot.node.statusText, `${label}/${status}`).toBe("completed · selection UNKNOWN · tests narrowed");
          expect(snapshot.node.statusTone, `${label}/${status}`).toBe(tone);
          expect(snapshot.coverage, `${label}/${status}`).toBe("partial");
        }
      }
    }
  });
});
