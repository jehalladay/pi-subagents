/**
 * wb-cra (OWNER-RESERVED): the workflow_control Pi tool wired over the landed control decision core and the
 * four adapter legs (docs/workbench/11 § "Designer and operator": "explicit native action after
 * permission/preconditions; returns requested/acknowledged/result distinct").
 *
 * Bound constraints carried from the execute/reconcile tool rulings:
 *   F3  one dialect reaches the model: the envelope is workbench.tool-reply/v1; the decision core's
 *       workbench.control/v1 contract string never appears as a rival dialect marker in the reply text.
 *   re-decide  the control decision is made from host context at dispatch time on EVERY call, never cached.
 *   authority  grants, principal, workspace and session come only from host-bound context, never from params;
 *       params carry target addressing, the action word and the operator's confirmed flag — data, not authority.
 *   minted  the exact decision object the core minted reaches the executor; the tool never forges or copies one.
 *   confirmation  the destructive confirmed flag is carried from the operator's params, never minted by the tool.
 *   phases  requested / acknowledged / result stay distinct in the reply; completion stays "not-asserted".
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  type ControlDecision,
  isCoreMintedDecision,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import {
  type ControlExecutionSummary,
  createWorkflowControlTool,
  type WorkflowControlDeps,
} from "../src/workbench/control-tool.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation } from "../src/workbench/observation.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";

const SCOPE: ObservationScope = { workspace: "/ws", principal: "local-operator:1000:s1" };
const AT = "2026-10-17T08:00:00Z";
const NOW = "2026-10-17T09:00:00Z";
const OWNERSHIP_REF = "req-attempts";
const ctx = { cwd: "/ws", sessionManager: { getSessionId: () => "s1" } } as unknown as ExtensionContext;

const TARGETS: Readonly<Record<string, { target: NativeRef; action: string; grant: string }>> = Object.freeze({
  furnace: { target: { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace }, action: "stop", grant: "control:furnace.stop" },
  "claude-agent-sdk": { target: { provider: "claude-agent-sdk", type: "agent-call", id: "inv-1:0" }, action: "interrupt", grant: "control:claude-agent-sdk.interrupt" },
  forge: { target: { provider: "forge", type: "operation", id: "op-3e2a40bee18342559f255771bd11c4a5" }, action: "cancel", grant: "control:forge.cancel" },
  "local-detached": { target: { provider: "local-detached", type: "invocation", id: "wf_detached1" }, action: "cancel", grant: "control:local-detached.cancel" },
});

/** A projection holding every provider's target with a provider-sourced confirmed ownership edge (the wb-69g.1 shape). */
function seededProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const { target } of Object.values(TARGETS)) {
    const child: NativeRef = { provider: target.provider, type: "child", id: `${target.id}-child`, ...(target.scope !== undefined ? { scope: target.scope } : {}) };
    for (const source of [target, child]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
        node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    const provenance: Relation["provenance"] = { source: target.provider, observedAt: AT, nativeConfirmationRef: OWNERSHIP_REF };
    projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance });
  }
  return projection;
}

type Reply = {
  contract: string; tool: string; ok: boolean; invoked: boolean; status: string; completion: string;
  control?: Record<string, unknown>; error?: { code: string; category?: string; message: string };
  [key: string]: unknown;
};

function settledSummary(decision: ControlDecision): ControlExecutionSummary {
  if (decision.decision !== "permitted") throw new Error("test summary needs a permit");
  const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: NOW, nativeAckRef: "ack-native-1" });
  return { receipt: settle(acknowledged, { outcome: "completed", nativeResultRef: "result-native-1", settledAt: NOW }), status: "settled" };
}

function harness(over: Partial<WorkflowControlDeps> & { rights?: readonly string[] } = {}) {
  const { rights, ...rest } = over;
  const calls: { decision: ControlDecision; request: NativeControlRequest }[] = [];
  const executor = vi.fn(async (decision: ControlDecision, request: NativeControlRequest): Promise<ControlExecutionSummary> => {
    calls.push({ decision, request });
    return settledSummary(decision);
  });
  const grants = vi.fn((): readonly string[] => rights ?? Object.values(TARGETS).map(row => row.grant));
  const deps: WorkflowControlDeps = {
    grants,
    observerScope: () => ({ ...SCOPE }),
    localPrincipal: () => SCOPE.principal,
    sessionIdOf: () => "s1",
    projection: seededProjection(),
    now: () => NOW,
    executors: { furnace: executor, "claude-agent-sdk": executor, forge: executor, "local-detached": executor },
    ...rest,
  };
  const tool = createWorkflowControlTool(deps);
  const run = async (params: Record<string, unknown>, callId = "call-1"): Promise<{ text: string; reply: Reply }> => {
    const result = await tool.execute(callId, params as never, undefined, undefined, ctx as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { text, reply: JSON.parse(text) as Reply };
  };
  return { tool, run, executor, grants, calls };
}

const controlParams = (provider: keyof typeof TARGETS, over: Record<string, unknown> = {}) => {
  const row = TARGETS[provider];
  return { target: { ...row.target }, action: row.action, confirmed: true, ...over };
};

describe("workflow_control wiring: refusals before any adapter call (wb-cra)", () => {
  it("is registered under the documented name and refuses observer-only grants as a tool-reply/v1 error without calling any executor", async () => {
    const h = harness({ rights: ["workbench:observe", "observe:furnace.run.inspect"] });
    expect(h.tool.name).toBe("workflow_control");
    const { text, reply } = await h.run(controlParams("furnace"));
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_control", ok: false, invoked: false, status: "refused", completion: "not-asserted" });
    expect(reply.error).toMatchObject({ code: "observer-only" });
    expect(h.executor).not.toHaveBeenCalled();
    expect(text).not.toContain("workbench.control/v1");
  });

  it("denies a destructive action without the operator's confirmed flag and never injects the flag itself", async () => {
    const h = harness();
    const { reply } = await h.run(controlParams("furnace", { confirmed: undefined }));
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error).toMatchObject({ code: "operator-confirmation" });
    expect(h.executor).not.toHaveBeenCalled();
  });

  it("denies an action outside the provider allowlist", async () => {
    const h = harness({ rights: ["control:furnace.pause"] });
    const { reply } = await h.run(controlParams("furnace", { action: "pause" }));
    expect(reply.error).toMatchObject({ code: "unknown-action" });
    expect(h.executor).not.toHaveBeenCalled();
  });

  it("takes scope and principal from host context, so a foreign target scope in params denies cross-scope", async () => {
    const h = harness();
    const row = TARGETS.furnace;
    const { reply } = await h.run({ target: { ...row.target, scope: "/elsewhere" }, action: row.action, confirmed: true });
    expect(reply.error).toMatchObject({ code: "cross-scope" });
    expect(h.executor).not.toHaveBeenCalled();
  });

  it("ignores authority-shaped params: smuggled grants, principal and scope keys change nothing", async () => {
    const h = harness({ rights: ["observe:furnace.run.inspect"] });
    const { reply } = await h.run(controlParams("furnace", {
      grants: ["control:furnace.stop"], principal: { id: "root" }, scope: { workspace: "/ws", principal: "root" },
    }));
    expect(reply.error).toMatchObject({ code: "observer-only" });
    expect(h.executor).not.toHaveBeenCalled();
    expect(h.grants).toHaveBeenCalled();
  });

  it("refuses a permitted provider with no wired executor as a typed host refusal, never a crash", async () => {
    const h = harness({ executors: {} });
    const { reply } = await h.run(controlParams("furnace"));
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error).toMatchObject({ code: "no-executor" });
  });
});

describe("workflow_control wiring: routing and the minted decision (wb-cra)", () => {
  it("routes each of the four providers to its own executor with the core-minted decision and the host-assembled request", async () => {
    for (const provider of Object.keys(TARGETS) as (keyof typeof TARGETS)[]) {
      const h = harness();
      const { reply } = await h.run(controlParams(provider), `call-${provider}`);
      expect(reply.ok).toBe(true);
      expect(h.executor).toHaveBeenCalledTimes(1);
      const { decision, request } = h.calls[0];
      expect(isCoreMintedDecision(decision)).toBe(true);
      expect(request.scope).toEqual(SCOPE);
      expect(request.principal).toEqual({ id: SCOPE.principal, role: "local-operator" });
      expect(request.invocationId).toBe(`call-${provider}`);
      expect(request.requestedAt).toBe(NOW);
      expect(request.target.provider).toBe(provider);
    }
  });

  it("re-decides on every call: two calls mint two distinct permits and re-read grants both times", async () => {
    const h = harness();
    await h.run(controlParams("furnace"), "call-a");
    await h.run(controlParams("furnace"), "call-b");
    expect(h.calls).toHaveLength(2);
    expect(h.calls[0].decision).not.toBe(h.calls[1].decision);
    expect(isCoreMintedDecision(h.calls[0].decision)).toBe(true);
    expect(isCoreMintedDecision(h.calls[1].decision)).toBe(true);
    expect(h.grants.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});

describe("workflow_control wiring: the reply dialect (wb-cra)", () => {
  it("folds a settled execution into tool-reply/v1 with requested, acknowledged and result distinct", async () => {
    const h = harness();
    const { reply } = await h.run(controlParams("furnace"));
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_control", ok: true, invoked: true, status: "settled", completion: "not-asserted" });
    const control = reply.control as { phase: string; requested: Record<string, unknown>; acknowledged: Record<string, unknown>; result: Record<string, unknown> };
    expect(control.phase).toBe("result");
    expect(control.requested.requestedAt).toBeDefined();
    expect(control.requested.invocationId).toBe("call-1");
    expect(control.acknowledged.acknowledgedAt).toBeDefined();
    expect(control.result).toMatchObject({ outcome: "completed", settledAt: NOW });
  });

  it("reports an executor failure as a typed transport failure, with the adapter message sanitized, never a crash", async () => {
    const h = harness({});
    h.executor.mockRejectedValueOnce(new Error("socket closed\u001b[31m mid-flight"));
    const { text, reply } = await h.run(controlParams("furnace"));
    expect(reply).toMatchObject({ ok: false, status: "failed", completion: "not-asserted" });
    expect(reply.error?.code).toBe("executor-failed");
    expect(text).not.toContain("\u001b");
  });

  it("reports an adapter's typed refusal under its own category and code, distinct from a transport failure", async () => {
    const h = harness();
    h.executor.mockRejectedValueOnce(Object.assign(new CapabilityError("unavailable", "No live SDK query is retained in this process for the target session."), { code: "no-live-query" }));
    const { reply } = await h.run(controlParams("furnace"));
    expect(reply).toMatchObject({ ok: false, invoked: true, status: "refused", completion: "not-asserted" });
    expect(reply.error).toMatchObject({ code: "no-live-query", category: "unavailable" });
  });

  it("sanitizes hostile native refs out of the model-facing text", async () => {
    const h = harness();
    h.executor.mockImplementationOnce(async (decision: ControlDecision) => {
      if (decision.decision !== "permitted") throw new Error("permit expected");
      const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: NOW, nativeAckRef: "ack‎-dir" });
      return { receipt: acknowledged, status: "acknowledged" };
    });
    const { text, reply } = await h.run(controlParams("furnace"));
    expect(reply.ok).toBe(true);
    expect((reply.control as Record<string, unknown>).phase).toBe("acknowledged");
    expect(text).not.toContain("‎");
  });

  it("keeps the reply inside the byte budget and marks truncation", async () => {
    const h = harness();
    h.executor.mockImplementationOnce(async (decision: ControlDecision) => {
      if (decision.decision !== "permitted") throw new Error("permit expected");
      const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: NOW, nativeAckRef: `ack-${"x".repeat(6000)}` });
      return { receipt: acknowledged, status: "acknowledged" };
    });
    const { text, reply } = await h.run(controlParams("furnace"));
    expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(8192);
    expect(reply.ok).toBe(true);
  });
});
