/**
 * wb-a3s: a Forge operation this host starts becomes an observed, owned node of the session projection, read only off the
 * issuing connection's own frames and reply, so the control decision core admits it; everything else stays not-admitted.
 */
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { decideControl } from "../src/workbench/control.js";
import { createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import type { CancelReceipt } from "../src/workbench/forge-control.js";
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
      const reply = JSON.parse((await tool.execute("a3s", { target: target(), action: "cancel", confirmed: true } as never, undefined, undefined, ctx)).content[0].text as string);
      expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
      expect(fake.cancels()).toBe(1);
      const foreign = JSON.parse((await tool.execute("a3s-2", { target: { provider: "forge", type: "operation", id: "op-never00000000000000000000000000" }, action: "cancel", confirmed: true } as never, undefined, undefined, ctx)).content[0].text as string);
      expect(foreign).toMatchObject({ ok: false, invoked: false, error: { code: "cross-scope" } });
      expect(fake.cancels()).toBe(1);
    } finally {
      await observer.dispose();
    }
  });
});
