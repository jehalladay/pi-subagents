/**
 * wb-cra.1: the retained-connection registry and the wired workflow_control forge executor.
 *
 * Forge operation ids are per session, so a cancel travels only on the issuing connection. These rows pin the
 * registry's whole lifecycle (retain, lookup, release-on-terminal disposer, lifetime bound, cap) and the executor
 * seam: a retained target reaches executeForgeControl and the acknowledged phase echoes the seam's own answer; an
 * unretained, released or expired target stays the typed unavailable no-retained-connection refusal with zero SDK
 * verbs issued. The tool harness mirrors test/workbench-control-tool.test.ts: host-bound authority, confirmed flag
 * from the operator's params, one dialect in the reply.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import type { ForgeCancelOperations, ForgeCapabilitySource } from "../src/workbench/forge-control.js";
import {
  createRetainedForgeControlExecutor,
  lookupForgeOperation,
  MAX_RETAINED_FORGE_CONNECTIONS,
  RETENTION_TTL_MS,
  type RetainedForgeConnection,
  releaseForgeOperation,
  retainForgeOperation,
} from "../src/workbench/forge-control-retention.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation } from "../src/workbench/observation.js";
import type { WorkflowTask } from "../src/workflow/task.js";

const SCOPE: ObservationScope = { workspace: "/ws", principal: "local-operator:1000:s1" };
const AT = "2026-10-17T11:00:00Z";
const NOW = "2026-10-17T12:00:00Z";
const OWNING_INVOCATION = "wf_owner00001";
const GRANT = "control:forge.cancel";
const ctx = { cwd: "/ws", sessionManager: { getSessionId: () => "s1" } } as unknown as ExtensionContext;

const opId = (suffix: string): string => `op-${suffix.padStart(32, "0")}`;

/** A capability source whose negotiated map states the cancel verb and its facade supported. */
function supportedConnection(): ForgeCapabilitySource {
  return {
    capabilities: {
      mode: "persistent",
      stateOf: (name: string) => (name === "operation.cancel" || name === "cancel" ? "supported" : "unknown"),
    } as never,
  };
}

/** A seam whose one cancel answers the vendored acknowledgement shape attributably for `id`. */
function acceptingOperations(id: string): { operations: ForgeCancelOperations; cancel: ReturnType<typeof vi.fn> } {
  const cancel = vi.fn(async (operationId: string) => ({
    operationId,
    cancelIntent: "CANCEL_REQUESTED",
    cancelAcceptance: "ACCEPTED",
    cancellationEstablished: false,
    raw: { operation_id: id, cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false },
  }));
  return { operations: { cancel } as never, cancel };
}

function retained(id: string): { entry: RetainedForgeConnection; cancel: ReturnType<typeof vi.fn> } {
  const { operations, cancel } = acceptingOperations(id);
  return { entry: { operations, connection: supportedConnection(), workspaceRoot: SCOPE.workspace }, cancel };
}

/** The projection admitting the forge operation with a provider-sourced confirmed ownership edge. */
function seededProjection(target: NativeRef): ObservationProjection {
  const projection = new ObservationProjection();
  const child: NativeRef = { provider: target.provider, type: "child", id: `${target.id}-child` };
  for (const source of [target, child]) {
    projection.refresh({
      source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      trace: { invocationId: OWNING_INVOCATION },
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" },
    });
  }
  const provenance: Relation["provenance"] = { source: target.provider, observedAt: AT, nativeConfirmationRef: "req-ops" };
  projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance });
  return projection;
}

type Reply = {
  contract: string; tool: string; ok: boolean; invoked: boolean; status: string; completion: string;
  control?: Record<string, unknown>; error?: { code: string; category?: string; message: string };
};

function harness(target: NativeRef) {
  const task = { id: OWNING_INVOCATION } as unknown as WorkflowTask;
  const deps: WorkflowControlDeps = {
    grants: () => [GRANT],
    observerScope: () => ({ ...SCOPE }),
    localPrincipal: () => SCOPE.principal,
    sessionIdOf: () => "s1",
    projection: seededProjection(target),
    tasks: new Map<string, WorkflowTask>([[OWNING_INVOCATION, task]]),
    now: () => NOW,
    executors: { forge: createRetainedForgeControlExecutor(() => NOW) },
  };
  const tool = createWorkflowControlTool(deps);
  const run = async (params: Record<string, unknown>): Promise<{ text: string; reply: Reply }> => {
    const result = await tool.execute("call-1", params as never, undefined, undefined, ctx as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { text, reply: JSON.parse(text) as Reply };
  };
  return { run };
}

const cancelParams = (target: NativeRef): Record<string, unknown> => ({ target: { ...target }, action: "cancel", confirmed: true });

describe("forge retention registry (wb-cra.1)", () => {
  it("retains, looks up, and releases one issuing connection by operation id", () => {
    const id = opId("a1");
    const { entry } = retained(id);
    const release = retainForgeOperation(id, entry);
    expect(lookupForgeOperation(id)).toBe(entry);
    release();
    expect(lookupForgeOperation(id)).toBeUndefined();
  });

  it("newest issuer wins on re-retention, and the stale disposer never drops the successor", () => {
    const id = opId("a2");
    const first = retained(id);
    const second = retained(id);
    const releaseFirst = retainForgeOperation(id, first.entry);
    retainForgeOperation(id, second.entry);
    releaseFirst();
    expect(lookupForgeOperation(id)).toBe(second.entry);
    expect(releaseForgeOperation(id)).toBe(true);
  });

  it("expires a retention past its lifetime bound, by the registry clock it was retained under", () => {
    const id = opId("a3");
    const { entry } = retained(id);
    retainForgeOperation(id, entry, { at: 1_000, ttlMs: 50 });
    expect(lookupForgeOperation(id, 1_049)).toBe(entry);
    expect(lookupForgeOperation(id, 1_050)).toBeUndefined();
    expect(RETENTION_TTL_MS).toBe(15 * 60_000);
  });

  it("refuses registration past the cap instead of evicting a live retention", () => {
    const releases: (() => void)[] = [];
    for (let n = 0; n < MAX_RETAINED_FORGE_CONNECTIONS; n++) {
      releases.push(retainForgeOperation(opId(`cap${n.toString(16)}`), retained(opId(`cap${n.toString(16)}`)).entry));
    }
    const overflow = opId("overflow");
    expect(() => retainForgeOperation(overflow, retained(overflow).entry)).toThrow(CapabilityError);
    for (const release of releases) release();
  });
});

describe("workflow_control forge leg over the retained connection (wb-cra.1)", () => {
  it("a retained target reaches executeForgeControl: acknowledged echoes the seam's own answer, one cancel sent", async () => {
    const id = opId("b1");
    const target: NativeRef = { provider: "forge", type: "operation", id };
    const { entry, cancel } = retained(id);
    const release = retainForgeOperation(id, entry);
    try {
      const { text, reply } = await harness(target).run(cancelParams(target));
      expect(reply).toMatchObject({ tool: "workflow_control", ok: true, invoked: true, status: "acknowledged", completion: "not-asserted" });
      expect(reply.error).toBeUndefined();
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(cancel).toHaveBeenCalledWith(id);
      expect(text).toContain(`forge-operation:${id}:operation.cancel:CANCEL_REQUESTED:ACCEPTED`);
    } finally {
      release();
    }
  });

  it("an unretained target stays the typed unavailable no-retained-connection refusal", async () => {
    const id = opId("b2");
    const target: NativeRef = { provider: "forge", type: "operation", id };
    const { reply } = await harness(target).run(cancelParams(target));
    expect(reply).toMatchObject({ ok: false, status: "refused" });
    expect(reply.error).toMatchObject({ code: "no-retained-connection", category: "unavailable" });
  });

  it("release on terminal closes the leg: the same target refuses after its disposer ran, with zero further seam calls", async () => {
    const id = opId("b3");
    const target: NativeRef = { provider: "forge", type: "operation", id };
    const { entry, cancel } = retained(id);
    const release = retainForgeOperation(id, entry);
    const h = harness(target);
    const first = await h.run(cancelParams(target));
    expect(first.reply.status).toBe("acknowledged");
    release();
    const second = await h.run(cancelParams(target));
    expect(second.reply.error).toMatchObject({ code: "no-retained-connection" });
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("an expired retention refuses like an unretained one", async () => {
    const id = opId("b4");
    const target: NativeRef = { provider: "forge", type: "operation", id };
    const { entry, cancel } = retained(id);
    retainForgeOperation(id, entry, { at: 0, ttlMs: 1 });
    const { reply } = await harness(target).run(cancelParams(target));
    expect(reply.error).toMatchObject({ code: "no-retained-connection" });
    expect(cancel).not.toHaveBeenCalled();
    releaseForgeOperation(id);
  });
});
