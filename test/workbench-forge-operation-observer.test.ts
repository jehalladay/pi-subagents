/**
 * wb-a3s: a Forge operation this host starts becomes an observed, owned node of the session projection, read only off the
 * issuing connection's own frames and reply, so the control decision core admits it; everything else stays not-admitted.
 */
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { decideControl } from "../src/workbench/control.js";
import { createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import type { ForgeCancelOperations } from "../src/workbench/forge-control.js";
import { createRetainedForgeControlExecutor, lookupForgeOperation, releaseForgeOperation, retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import {
  decodeForgeOperationFrame,
  decodeForgeOperationTerminal,
  decodeForgeRunBasis,
  FORGE_GATE_STEP_KIND,
  FORGE_OPERATION_KIND,
  FORGE_RESULT_CONTRACT,
  type ForgeObservedHead,
  type ForgeOperationConnection,
  type ForgeOperationFrame,
  forgeGateRunReading,
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
 */
const MEASURED_FULL = {
  gate_verdict: "PASS",
  selection: null,
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
  selection: null,
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
const terminalOf = (reply: unknown) => {
  const terminal = decodeForgeOperationTerminal(reply, OP, T2);
  if (terminal === undefined) throw new Error("the reply names no terminal for the operation");
  return forgeOperationTerminalSnapshot(terminal, options);
};
const withUnits = (change: Record<string, unknown>) => ({ ...MEASURED_FULL, selection_accounting: { ...MEASURED_FULL.selection_accounting, ...change } });
const [ROW_ALPHA, ROW_BETA, ROW_GAMMA] = MEASURED_FULL.selection_accounting.units;

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
});

/**
 * wb-4ap.17 (COLLECTIVE-ADAPTATION-R17): Pi's gate.run consumer treats the reply's own run-start pin (data.gated_commit and
 * data.gated_tree) as the verdict's basis. The four replies below were MEASURED on 2026-10-26 with the installed forge 0.2.1
 * (rev c0f93b3c5d18) through the served app-server, on the path providers/forge.ts opens (ServerConnection.spawn("forge"),
 * initialize, request("gate.run", { root })), over scratch packages: a clean git checkout whose gate is alpha, beta, gamma
 * (gated_commit is that checkout's HEAD, gated_tree its HEAD^{tree}); the same commit with an uncommitted README edit (gated_tree
 * "", the producer's dirty-run value); a directory in no repository (gated_commit and gated_tree null, the producer's honest
 * absent values); and a one-step gate cancelled through operation.cancel while its step ran (status partial, cancelled-established,
 * and a data block that publishes no pin at all). Only the fields the reader reads are kept, each verbatim; the clean and dirty
 * runs' selection_accounting equals MEASURED_FULL's block above. LATER_HEAD is the clean checkout's HEAD after one more commit
 * landed in it, read with git rev-parse HEAD and HEAD^{tree}.
 */
const PIN_COMMIT = "8d8cad68921f6f76e5cbd09328ebb7c65a5a78f7";
const PIN_TREE = "807acb352b0b497f74cd24c5074caacbb3bed6c2";
const DIRTY_OVERLAY = "sha256:170d8e1b32c9b0f4510062c73c04f6366d9b113270de76a5465de5278ddbff52";
const MEASURED_HEAD: ForgeObservedHead = { commit: PIN_COMMIT, tree: PIN_TREE };
const LATER_HEAD: ForgeObservedHead = { commit: "d8f5eec8a31e691f8f7860c7915d5fab2764e246", tree: "05b6df91ea9f1c5aafb57be6e6a2da796972c174" };
const MEASURED_CLEAN_RUN = {
  operation_id: "op-e0aea7ede755423389aaa3114b3c90d0", status: "success", terminal_disposition: "completed", lifecycle_state: "TERMINAL",
  terminal_fact: "completed", contract_version: "result-envelope/v1",
  data: { gate_verdict: "PASS", gate_passed: true, gated_commit: PIN_COMMIT, gated_tree: PIN_TREE, source_snapshot_id: PIN_TREE, selection_accounting: MEASURED_FULL.selection_accounting },
};
const MEASURED_DIRTY_RUN = {
  operation_id: "op-f341b66d16eb48fabd0f5629129b80d6", status: "success", terminal_disposition: "completed", lifecycle_state: "TERMINAL",
  terminal_fact: "completed", contract_version: "result-envelope/v1",
  data: {
    gate_verdict: "PASS", gate_passed: true, gated_commit: PIN_COMMIT, gated_tree: "", source_snapshot_id: `dirty-tree/v1:${PIN_TREE}:${DIRTY_OVERLAY}`,
    selection_accounting: MEASURED_FULL.selection_accounting,
    identity_closure: {
      dirty_end: true, dirty_start: true, execution_isolated: false, head_moved_paths: [], head_tree_end: PIN_TREE, head_tree_start: PIN_TREE,
      mode: "observed-boundaries/v2", overlay_dirty_at_start_paths: ["README.md"], overlay_end: DIRTY_OVERLAY, overlay_moved: false, overlay_moved_paths: [],
      overlay_new_untracked_paths: [], overlay_start: DIRTY_OVERLAY, overlay_untracked_at_start_paths: [], reason: "dirty-at-start",
      stable_at_observed_boundaries: false, tree_end: null, tree_start: null,
    },
  },
};
const MEASURED_UNREPOSITORIED_RUN = {
  operation_id: "op-3fc8d4cfa88943b08eedb04c3a4e2215", status: "success", terminal_disposition: "completed", lifecycle_state: "TERMINAL",
  terminal_fact: "completed", contract_version: "result-envelope/v1",
  data: { gate_verdict: "PASS", gate_passed: true, gated_commit: null, gated_tree: null, source_snapshot_id: null, selection_accounting: MEASURED_FULL.selection_accounting },
};
const MEASURED_CANCELLED_RUN = {
  operation_id: "op-a6143d99b2704572989a4a0579d9ae8c", status: "partial", terminal_disposition: "cancelled-established", lifecycle_state: "TERMINAL",
  terminal_fact: "cancelled-established", contract_version: "result-envelope/v1",
  data: {
    answered: true, cancel_requested: true, cancellation: { establishment: "CANCELLED_CONFIRMED", requested: true },
    delivery: { complete: true, dropped_count: 0, first_dropped_class: null }, label: "gate.run", operation_id: "op-a6143d99b2704572989a4a0579d9ae8c",
    outcome_class: "cancelled-established", request_id: "2", terminal_disposition: "cancelled-established",
  },
};
/** The a3s + wb-6ps1.2 text of the measured clean, dirty and unrepositoried runs, which the basis word follows. */
const MEASURED_TEXT = "completed · selection complete: 3 of 3 steps selected";
/** The distinct reason each withheld or missing pin names in its one diagnostic. */
const REASONS = {
  contract: "is not a result-envelope/v1 result",
  data: "carries no data object",
  commit: "gated_commit that is not a git object id",
  tree: "gated_tree that is neither a git object id nor",
  null: "gated_commit null",
  absent: "published no gated_commit",
  unobserved: "read no HEAD",
} as const;

/** A reply as these cases hand it to the reader: the operation's own id beside any other fields. */
type MeasuredReply = { readonly operation_id: string; readonly [field: string]: unknown };
function readingOf(reply: MeasuredReply, observedHead: ForgeObservedHead | undefined) {
  const reading = forgeGateRunReading(reply, reply.operation_id, { ...options, observedAt: T2, observedHead });
  if (reading === undefined) throw new Error("the reply names no terminal for its own operation");
  return reading;
}
function withData(reply: { readonly operation_id: string; readonly data: object }, change: Record<string, unknown>) {
  return { ...reply, data: { ...reply.data, ...change } };
}

describe("wb-4ap.17 (R17): the gate.run reply's own run-start pin is the verdict's basis", () => {
  it("wb-4ap.17 (R17 a): the measured clean reply's subjectBasis echoes data.gated_commit verbatim, and data.gated_tree is read separately as the pin's second half", () => {
    expect(FORGE_RESULT_CONTRACT).toBe(MEASURED_CLEAN_RUN.contract_version);
    const reading = readingOf(MEASURED_CLEAN_RUN, MEASURED_HEAD);
    expect(reading.snapshot.subjectBasis).toBe(MEASURED_CLEAN_RUN.data.gated_commit);
    expect(reading.basis).toStrictEqual({ state: "pinned", commit: MEASURED_CLEAN_RUN.data.gated_commit, tree: MEASURED_CLEAN_RUN.data.gated_tree });
    expect(decodeForgeRunBasis(MEASURED_DIRTY_RUN)).toStrictEqual({ state: "pinned", commit: MEASURED_DIRTY_RUN.data.gated_commit, tree: MEASURED_DIRTY_RUN.data.gated_tree });
    // The basis is the reply's own pin: neither the host's head nor the run's source_snapshot_id ever stands in for it.
    expect(readingOf(MEASURED_CLEAN_RUN, LATER_HEAD).snapshot.subjectBasis).toBe(PIN_COMMIT);
    expect(readingOf(MEASURED_CLEAN_RUN, undefined).snapshot.subjectBasis).toBe(PIN_COMMIT);
    expect(readingOf(MEASURED_DIRTY_RUN, MEASURED_HEAD).snapshot.subjectBasis).toBe(PIN_COMMIT);
  });

  it("wb-4ap.17 (R17 b): statusText says current only when the pin equals the supplied observed head, and stale when the head moved on, its tree differs or the run gated a dirty tree", () => {
    const current = readingOf(MEASURED_CLEAN_RUN, MEASURED_HEAD);
    expect(current.freshness).toBe("current");
    expect(current.snapshot.node).toStrictEqual({ title: `Forge operation ${MEASURED_CLEAN_RUN.operation_id}`, type: "workflow", statusText: `${MEASURED_TEXT} · basis current`, statusTone: "success" });
    expect(current.diagnostics).toStrictEqual([]);
    const moved = readingOf(MEASURED_CLEAN_RUN, LATER_HEAD);
    expect(moved.freshness).toBe("stale");
    expect(moved.snapshot.node.statusText).toBe(`${MEASURED_TEXT} · basis stale`);
    expect(moved.snapshot.node.statusTone).toBe("unknown");
    expect(moved.diagnostics).toStrictEqual([]);
    // The tree is compared on its own: an equal commit beside another tree is not current.
    expect(readingOf(MEASURED_CLEAN_RUN, { commit: PIN_COMMIT, tree: LATER_HEAD.tree }).freshness).toBe("stale");
    // A dirty run's "" tree is never the commit's, so the measured dirty run at its own commit is stale.
    const dirty = readingOf(MEASURED_DIRTY_RUN, MEASURED_HEAD);
    expect(dirty.freshness).toBe("stale");
    expect(dirty.snapshot.node.statusText).toBe(`${MEASURED_TEXT} · basis stale`);
    expect(dirty.snapshot.node.statusTone).toBe("unknown");
    for (const reading of [moved, dirty]) expect(reading.snapshot.node.statusText).not.toContain("current");
  });

  it("wb-4ap.17 (R17 c): the measured null pin (a directory in no repository) yields no subjectBasis, one diagnostic naming the missing pin, basis indeterminate and never a success tone", () => {
    for (const head of [MEASURED_HEAD, LATER_HEAD, undefined]) {
      const reading = readingOf(MEASURED_UNREPOSITORIED_RUN, head);
      const label = head?.commit ?? "no head";
      expect("subjectBasis" in reading.snapshot, label).toBe(false);
      expect(reading.basis, label).toStrictEqual({ state: "missing", cause: "null" });
      expect(reading.freshness, label).toBe("indeterminate");
      expect(reading.diagnostics, label).toHaveLength(1);
      expect(reading.diagnostics[0], label).toContain(REASONS.null);
      expect(reading.snapshot.node.statusText, label).toBe(`${MEASURED_TEXT} · basis indeterminate`);
      expect(reading.snapshot.node.statusTone, label).toBe("unknown");
    }
  });

  it("wb-4ap.17 (R17 c): the measured cancelled reply publishes no pin at all, so it reads indeterminate and never current, and the command status never moves the basis", () => {
    for (const [status, tone] of [["partial", "unknown"], ["error", "failure"], ["success", "unknown"]] as const) {
      const reading = readingOf({ ...MEASURED_CANCELLED_RUN, status }, MEASURED_HEAD);
      expect(reading.basis, status).toStrictEqual({ state: "missing", cause: "absent" });
      expect(reading.freshness, status).toBe("indeterminate");
      expect("subjectBasis" in reading.snapshot, status).toBe(false);
      expect(reading.diagnostics, status).toHaveLength(1);
      expect(reading.diagnostics[0], status).toContain(REASONS.absent);
      expect(reading.snapshot.node.statusText, status).toBe("cancelled-established · basis indeterminate");
      expect(reading.snapshot.node.statusTone, status).toBe(tone);
    }
  });

  it("wb-4ap.17 (R17 c): an inherited pin is no pin - a data block whose gated_commit and gated_tree come only from its prototype reads absent, never pinned", () => {
    const inherited = Object.assign(Object.create({ gated_commit: PIN_COMMIT, gated_tree: PIN_TREE }) as Record<string, unknown>, MEASURED_CANCELLED_RUN.data);
    const reading = readingOf({ ...MEASURED_CANCELLED_RUN, data: inherited }, MEASURED_HEAD);
    expect(reading.basis).toStrictEqual({ state: "missing", cause: "absent" });
    expect(reading.freshness).toBe("indeterminate");
    expect("subjectBasis" in reading.snapshot).toBe(false);
    expect(reading.diagnostics).toStrictEqual([expect.stringContaining(REASONS.absent)]);
  });

  it("wb-4ap.17 (R17 d, FGC-06): on a current pin a gate verdict that is not PASS, or a partial status, never renders success, and a failure stays a failure", () => {
    const { gate_verdict: _verdict, ...noVerdict } = MEASURED_CLEAN_RUN.data;
    const cases: readonly (readonly [string, MeasuredReply, string])[] = [
      ["gate_verdict null", withData(MEASURED_CLEAN_RUN, { gate_verdict: null }), "unknown"],
      ["no gate_verdict", { ...MEASURED_CLEAN_RUN, data: noVerdict }, "unknown"],
      ["COULD_NOT_JUDGE under status partial", { ...withData(MEASURED_CLEAN_RUN, { gate_verdict: "COULD_NOT_JUDGE" }), status: "partial" }, "unknown"],
      ["status partial beside a PASS verdict", { ...MEASURED_CLEAN_RUN, status: "partial" }, "unknown"],
      ["FAIL under status error", { ...withData(MEASURED_CLEAN_RUN, { gate_verdict: "FAIL", gate_passed: false }), status: "error" }, "failure"],
    ];
    for (const [label, reply, tone] of cases) {
      const reading = readingOf(reply, MEASURED_HEAD);
      expect(reading.freshness, label).toBe("current");
      expect(reading.snapshot.node.statusText, label).toBe(`${MEASURED_TEXT} · basis current`);
      expect(reading.snapshot.node.statusTone, label).toBe(tone);
    }
  });

  const { contract_version: _contract, ...offContract } = MEASURED_CLEAN_RUN;
  const { gated_tree: _tree, ...noTree } = MEASURED_CLEAN_RUN.data;
  const withheldPins: [string, unknown, string][] = [
    ["a reply with no contract_version", offContract, REASONS.contract],
    ["a reply on another result contract", { ...MEASURED_CLEAN_RUN, contract_version: "result-envelope/v2" }, REASONS.contract],
    ["an inherited contract_version", Object.assign(Object.create({ contract_version: "result-envelope/v1" }) as Record<string, unknown>, offContract), REASONS.contract],
    ["a null data block", { ...MEASURED_CLEAN_RUN, data: null }, REASONS.data],
    ["a string data block", { ...MEASURED_CLEAN_RUN, data: "data" }, REASONS.data],
    ["an array data block", { ...MEASURED_CLEAN_RUN, data: [MEASURED_CLEAN_RUN.data] }, REASONS.data],
    ["an empty gated_commit", withData(MEASURED_CLEAN_RUN, { gated_commit: "" }), REASONS.commit],
    ["a numeric gated_commit", withData(MEASURED_CLEAN_RUN, { gated_commit: 8 }), REASONS.commit],
    ["a symbolic gated_commit", withData(MEASURED_CLEAN_RUN, { gated_commit: "HEAD" }), REASONS.commit],
    ["an upper-case gated_commit", withData(MEASURED_CLEAN_RUN, { gated_commit: PIN_COMMIT.toUpperCase() }), REASONS.commit],
    ["a truncated gated_commit", withData(MEASURED_CLEAN_RUN, { gated_commit: PIN_COMMIT.slice(0, 39) }), REASONS.commit],
    ["a content digest in place of the commit", withData(MEASURED_CLEAN_RUN, { gated_commit: DIRTY_OVERLAY }), REASONS.commit],
    ["the dirty-tree snapshot id in place of the commit", withData(MEASURED_CLEAN_RUN, { gated_commit: MEASURED_DIRTY_RUN.data.source_snapshot_id }), REASONS.commit],
    ["an inherited gated_commit", { ...MEASURED_CLEAN_RUN, data: Object.assign(Object.create({ gated_commit: PIN_COMMIT }) as Record<string, unknown>, { gated_commit: 8, gated_tree: PIN_TREE }) }, REASONS.commit],
    ["a commit beside a null gated_tree", withData(MEASURED_CLEAN_RUN, { gated_tree: null }), REASONS.tree],
    ["a commit with no gated_tree", { ...MEASURED_CLEAN_RUN, data: noTree }, REASONS.tree],
    ["an inherited gated_tree", { ...MEASURED_CLEAN_RUN, data: Object.assign(Object.create({ gated_tree: PIN_TREE }) as Record<string, unknown>, noTree) }, REASONS.tree],
    ["a symbolic gated_tree", withData(MEASURED_CLEAN_RUN, { gated_tree: "HEAD^{tree}" }), REASONS.tree],
    ["a numeric gated_tree", withData(MEASURED_CLEAN_RUN, { gated_tree: 0 }), REASONS.tree],
  ];
  it.each(withheldPins)("wb-4ap.17 (R17 e): %s yields no subjectBasis, exactly one diagnostic naming the reason, basis UNKNOWN, never a bare current and never a success tone", (_label, reply, reason) => {
    for (const head of [MEASURED_HEAD, undefined]) {
      const reading = forgeGateRunReading(reply, MEASURED_CLEAN_RUN.operation_id, { ...options, observedAt: T2, observedHead: head });
      if (reading === undefined) throw new Error("a withheld pin still settles its operation");
      expect("subjectBasis" in reading.snapshot).toBe(false);
      expect(reading.basis.state).toBe("withheld");
      expect(reading.freshness).toBe("UNKNOWN");
      expect(reading.diagnostics).toHaveLength(1);
      expect(reading.diagnostics[0]).toContain(reason);
      expect(reading.snapshot.node.statusText).toMatch(/ · basis UNKNOWN$/);
      expect(reading.snapshot.node.statusText).not.toMatch(/current/);
      expect(reading.snapshot.node.statusTone).not.toBe("success");
    }
  });

  it("wb-4ap.17 (R17 f): with no observed head, or a head reading that is no git object id pair, a pinned verdict keeps its subjectBasis but reads indeterminate, never current and never success, with one diagnostic", () => {
    const unobserved: readonly (ForgeObservedHead | undefined)[] = [
      undefined, { commit: "HEAD", tree: PIN_TREE }, { commit: PIN_COMMIT.toUpperCase(), tree: PIN_TREE }, { commit: PIN_COMMIT, tree: "" },
    ];
    for (const head of unobserved) {
      const reading = readingOf(MEASURED_CLEAN_RUN, head);
      const label = JSON.stringify(head ?? null);
      expect(reading.snapshot.subjectBasis, label).toBe(PIN_COMMIT);
      expect(reading.freshness, label).toBe("indeterminate");
      expect(reading.snapshot.node.statusText, label).toBe(`${MEASURED_TEXT} · basis indeterminate`);
      expect(reading.snapshot.node.statusTone, label).toBe("unknown");
      expect(reading.diagnostics, label).toHaveLength(1);
      expect(reading.diagnostics[0], label).toContain(REASONS.unobserved);
    }
    // A head reading whose tree is empty never meets a dirty run's "" tree as an equal.
    expect(readingOf(MEASURED_DIRTY_RUN, { commit: PIN_COMMIT, tree: "" }).freshness).toBe("indeterminate");
  });

  it("wb-4ap.17 (R17 g): identity_closure path lists are disclosure only - planted or removed, they move neither the basis nor anything the reading shows", () => {
    const closure = MEASURED_DIRTY_RUN.data.identity_closure;
    const planted = {
      ...closure, head_moved_paths: ["README.md"], overlay_moved_paths: ["src/a.ts"], overlay_new_untracked_paths: ["new.txt"],
      overlay_dirty_at_start_paths: [], overlay_untracked_at_start_paths: ["untracked.txt"], overlay_moved: true, reason: "overlay-moved",
    };
    const { identity_closure: _closure, ...noClosure } = MEASURED_DIRTY_RUN.data;
    const dirty = readingOf(MEASURED_DIRTY_RUN, MEASURED_HEAD);
    expect(readingOf(withData(MEASURED_DIRTY_RUN, { identity_closure: planted }), MEASURED_HEAD)).toStrictEqual(dirty);
    expect(readingOf({ ...MEASURED_DIRTY_RUN, data: noClosure }, MEASURED_HEAD)).toStrictEqual(dirty);
    const clean = readingOf(MEASURED_CLEAN_RUN, MEASURED_HEAD);
    expect(readingOf(withData(MEASURED_CLEAN_RUN, { identity_closure: planted }), MEASURED_HEAD)).toStrictEqual(clean);
    expect(clean.freshness).toBe("current");
  });

  it("wb-4ap.17 (R17 h): the reading settles only its own operation, and it is the a3s reading of the same reply plus the basis, which the a3s building blocks never read", () => {
    expect(forgeGateRunReading(MEASURED_CLEAN_RUN, OP, { ...options, observedAt: T2, observedHead: MEASURED_HEAD })).toBeUndefined();
    const { terminal_disposition: _disposition, ...noDisposition } = MEASURED_CLEAN_RUN;
    expect(forgeGateRunReading(noDisposition, MEASURED_CLEAN_RUN.operation_id, { ...options, observedAt: T2, observedHead: MEASURED_HEAD })).toBeUndefined();
    const terminal = decodeForgeOperationTerminal(MEASURED_CLEAN_RUN, MEASURED_CLEAN_RUN.operation_id, T2);
    if (terminal === undefined) throw new Error("the measured reply names its own terminal");
    const a3s = forgeOperationTerminalSnapshot(terminal, options);
    expect(a3s.node.statusText).toBe(MEASURED_TEXT);
    expect("subjectBasis" in a3s).toBe(false);
    const { subjectBasis, node, ...rest } = readingOf(MEASURED_CLEAN_RUN, MEASURED_HEAD).snapshot;
    const { node: a3sNode, ...a3sRest } = a3s;
    expect(subjectBasis).toBe(PIN_COMMIT);
    expect(rest).toStrictEqual(a3sRest);
    expect({ ...node, statusText: a3sNode.statusText }).toStrictEqual(a3sNode);
  });

  it("wb-4ap.17 (R17 i): through the live observer the host's head seam is read when the reply settles - equal settles current with the pinned subjectBasis, a later head stale, no head indeterminate", async () => {
    const cases = [[MEASURED_HEAD, "current", "success"], [LATER_HEAD, "stale", "unknown"], [undefined, "indeterminate", "unknown"]] as const;
    for (const [head, word, tone] of cases) {
      const projection = new ObservationProjection();
      const fake = fakeConnection();
      let reads = 0;
      const observedHead = (): ForgeObservedHead | undefined => { reads += 1; return head; };
      const pending = observeForgeGateRun(fake.connection, { ...deps(projection).deps, observedHead });
      fake.frame("operation.started", { operation_id: MEASURED_CLEAN_RUN.operation_id, request_id: "2" });
      const observer = await pending;
      fake.frame("gate.step_finished", { operation_id: MEASURED_CLEAN_RUN.operation_id, seq: 1, step: "alpha", outcome: "passed", exit_code: 0 });
      expect(reads, word).toBe(0);
      fake.reply(MEASURED_CLEAN_RUN);
      expect(await observer.settled, word).toBe("settled");
      expect(reads, word).toBe(1);
      const node = projection.query({ scope: SCOPE, ref: forgeOperationRef(MEASURED_CLEAN_RUN.operation_id), limit: 1 }).nodes[0];
      expect(node?.presentation.statusText, word).toBe(`${MEASURED_TEXT} · basis ${word}`);
      expect(node?.presentation.statusTone, word).toBe(tone);
      expect(node?.subjectBasis, word).toBe(PIN_COMMIT);
    }
  });

  it("wb-4ap.17 (R17 i): a head seam that throws settles the node indeterminate and the settlement never rejects; without the seam the observer keeps the a3s reading", async () => {
    const projection = new ObservationProjection();
    const fake = fakeConnection();
    const pending = observeForgeGateRun(fake.connection, { ...deps(projection).deps, observedHead: () => { throw new Error("git unavailable"); } });
    fake.frame("operation.started", { operation_id: MEASURED_CLEAN_RUN.operation_id, request_id: "2" });
    const observer = await pending;
    fake.reply(MEASURED_CLEAN_RUN);
    expect(await observer.settled).toBe("settled");
    const node = projection.query({ scope: SCOPE, ref: forgeOperationRef(MEASURED_CLEAN_RUN.operation_id), limit: 1 }).nodes[0];
    expect(node?.presentation.statusText).toBe(`${MEASURED_TEXT} · basis indeterminate`);
    expect(node?.presentation.statusTone).toBe("unknown");
    const legacy = new ObservationProjection();
    const plain = fakeConnection();
    const started = observeForgeGateRun(plain.connection, deps(legacy).deps);
    plain.frame("operation.started", { operation_id: MEASURED_CLEAN_RUN.operation_id, request_id: "2" });
    const a3s = await started;
    plain.reply(MEASURED_CLEAN_RUN);
    expect(await a3s.settled).toBe("settled");
    const a3sNode = legacy.query({ scope: SCOPE, ref: forgeOperationRef(MEASURED_CLEAN_RUN.operation_id), limit: 1 }).nodes[0];
    expect(a3sNode?.presentation.statusText).toBe(MEASURED_TEXT);
    expect(a3sNode?.subjectBasis).toBeUndefined();
  });
});
