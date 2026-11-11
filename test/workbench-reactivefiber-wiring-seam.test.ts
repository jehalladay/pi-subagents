/**
 * wb-79k.2 (W13/VC-2 ReactiveFiber observe-wiring), at the host seam: the real Claude workflow host (createClaudeWorkflowHost) runs
 * a real workflow script whose node() call reaches the registered reactivefiber.render.preview capability of the injected-reader
 * seam (providers/reactivefiber.ts registerReactiveFiberRender, whose reader the test supplies), the host's onNodeValue hook is the
 * observe-wiring (src/workbench/reactivefiber-wiring.ts reactiveFiberNodeObserver) over a real ObservationProjection, and each case
 * reads that projection back directly and through observeInvocation, the builder workflow_observe replies with.
 *
 * Bead acceptance quoted per case:
 *  RFS1 (3) "a snapshot built under seam 'injected-fixture' carries the adapter fixture label through every surfaced label, and a
 *       mutant presenting it as a real render goes red" (docs/workbench/07 § ReactiveFiberCLI provider: "Fixture text is never
 *       reported as real generated context."): the same envelope under the host's rf-cli seam is the control that reads clean.
 *  RFS2-RFS4 (4) "an error summary or exhausted budget stays partial and an RF_ failure stays a failure, never a success".
 *  RFS5-RFS6 (4) "stale readings never refresh confirmed projection state": a journal replay never reaches the host seam, and a
 *       reading captured before the confirmed one is out of order and states no edge.
 *  RFS7 (4) "context text referenced by sha256 digest only, no raw context body in any surfaced string".
 *  RFS8 (5) "absent a host-held envelope, zero adapter calls": a refused call and another capability's value reach no adapter call.
 *  RFS9 "Adapter refusal (CapabilityError) or validation throw is a typed diagnostic, never an invented snapshot", and the
 *       script still receives the registry's answer.
 *  RFS10 the hook is observation only: a throwing hook leaves the answer as the registry gave it.
 *  RFS11 (5) "the wiring never invokes rf; no new grant minted": the wiring reaches no registry method and no process.
 *  RFS12 (wb-79k.3 respin, refusal #1 U7) the authorizedRfRoot claim words of reactivefiber-wiring.ts ("The RF workspace root the
 *       host authorized ... when one replaces the scope"): the authorized root replaces the session scope for the reading's
 *       workspace, and the same reading without it is refused as authorization (falsifier: the pass-through to the adapter deleted).
 */
import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import type { ReactiveFiberSeam } from "../src/workbench/reactivefiber-observer.js";
import * as rfObserver from "../src/workbench/reactivefiber-observer.js";
import { observeReactiveFiberNode, reactiveFiberNodeObserver } from "../src/workbench/reactivefiber-wiring.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { fullShapeRf, type Json, RF_FIXTURE_OPERATION_ID } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };
type InjectedRead = Parameters<typeof registerReactiveFiberRender>[1];
type RfEnvelope = Awaited<ReturnType<InjectedRead>>;

const ROOT = "/fixture/rf-wiring-seam-root";
const SCOPE: ObservationScope = { workspace: ROOT, principal: "local-operator:wiring-seam" };
const INVOCATION = "wf_wiring_seam";
const GRANTS = ["reactivefiber:render"];
const PREVIEW_REF: NativeRef = { provider: "reactivefiber", type: "context-preview", id: RF_FIXTURE_OPERATION_ID, scope: ROOT };
const HEAD = 'export const meta = { name: "rf-wiring-seam", description: "seam" };\n';
const RF_NODE = `${HEAD}return await node("reactivefiber.render.preview", { model: "model", task: "task" });`;
const FIXTURE_LABEL = "fixture seam (not a real render)";

/** The injected reader: hands the registration this envelope, as the test seam it is. */
function injected(envelope: JsonObject): InjectedRead {
  return async () => structuredClone(envelope) as unknown as RfEnvelope;
}

interface Harness {
  readonly projection: ObservationProjection;
  readonly logs: string[];
  readonly registry: CapabilityRegistry;
  readonly host: ReturnType<typeof createClaudeWorkflowHost>;
}

/** One registry over the injected reader, one projection, a host clock one second apart per reading, and the wired host. */
function harness(read: InjectedRead, options: { seam?: ReactiveFiberSeam; scope?: ObservationScope; projection?: ObservationProjection; clock?: () => string } = {}): Harness {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, read, ROOT);
  const projection = options.projection ?? new ObservationProjection();
  const logs: string[] = [];
  let tick = Date.parse("2026-11-11T05:00:00Z");
  const next = (): string => {
    tick += 1000;
    return new Date(tick).toISOString();
  };
  const now = options.clock ?? next;
  const onNodeValue = reactiveFiberNodeObserver({ projection, scope: options.scope ?? SCOPE, seam: options.seam ?? "injected-fixture", invocationId: INVOCATION, now, log: line => logs.push(line) });
  const host = createClaudeWorkflowHost({ cwd: ROOT, capabilities: registry, grants: GRANTS, invocationId: INVOCATION, principal: { id: "host-principal", role: "local-operator" }, onNodeValue });
  return { projection, logs, registry, host };
}

/** The projection's one reactivefiber preview node, or undefined. */
function previewNode(projection: ObservationProjection) {
  return projection.query({ scope: SCOPE, ref: PREVIEW_REF, limit: 1 }).nodes[0];
}

function previewEnvelope(edit: (result: JsonObject, envelope: JsonObject) => void = () => {}): JsonObject {
  const envelope = fullShapeRf(ROOT) as JsonObject;
  edit(envelope.result as JsonObject, envelope);
  return envelope;
}

const REFUSAL: JsonObject = {
  schema: "reactive-fiber.cli/v1", ok: false, command: "context.render", operation_id: RF_FIXTURE_OPERATION_ID, workspace: null, transaction_id: null,
  result: null, diagnostics: [{ code: "RF_RENDER_REFUSED", severity: "error", message: "refused", hint: null, source: "host", metadata: {} }],
};

describe("wb-79k.2 the observe-wiring applies the adapter's frozen output under the host's seam, clock and scope, a refused or stale reading projects nothing, and only a held preview reading reaches the adapter (RFS1-RFS11, the Claude workflow host over the injected-reader seam)", () => {
  it("RFS1: under the injected-fixture seam the projected preview and the observe reply carry the fixture label and never read clean; the host's rf-cli seam is the clean control", async () => {
    const fixture = harness(injected(previewEnvelope()));
    expect((await runWorkflow({ script: RF_NODE, host: fixture.host })).status).toBe("completed");
    const node = previewNode(fixture.projection);
    expect(node?.presentation.statusText.startsWith(`${FIXTURE_LABEL} · `)).toBe(true);
    expect(node?.presentation.statusTone).toBe("unknown");
    expect(node?.completeness).toBe("partial");
    const reply = observeInvocation(fixture.projection, { scope: SCOPE, invocationId: INVOCATION });
    const shown = reply.nodes.filter(item => item.nativeRef.type === "context-preview").map(item => item.presentation.statusText);
    expect(shown).toHaveLength(1);
    expect(shown.every(text => text.startsWith(`${FIXTURE_LABEL} · `))).toBe(true);
    const live = harness(injected(previewEnvelope()), { seam: "rf-cli" });
    await runWorkflow({ script: RF_NODE, host: live.host });
    const control = previewNode(live.projection);
    expect(control?.presentation.statusText.startsWith("noncommitted preview (rf-cli) · ")).toBe(true);
    expect(control?.presentation.statusTone).toBe("success");
    expect(control?.completeness).toBe("complete");
  });

  it("RFS2: an error summary keeps the projected preview partial, never a success", async () => {
    const wired = harness(injected(previewEnvelope(result => { result.diagnostics_summary = { errors: 1, warnings: 0, has_errors: true, has_warnings: false }; })), { seam: "rf-cli" });
    await runWorkflow({ script: RF_NODE, host: wired.host });
    const node = previewNode(wired.projection);
    expect(node?.completeness).toBe("partial");
    expect(node?.presentation.statusTone).toBe("unknown");
    expect(node?.presentation.statusText).toContain("1 errors, 0 warnings");
  });

  it("RFS3: an exhausted budget keeps the projected preview partial, never a success", async () => {
    const wired = harness(injected(previewEnvelope(result => { (((result.budget as JsonObject).formula_terms) as JsonObject).available_context_tokens = -5; })), { seam: "rf-cli" });
    await runWorkflow({ script: RF_NODE, host: wired.host });
    const node = previewNode(wired.projection);
    expect(node?.completeness).toBe("partial");
    expect(node?.presentation.statusTone).toBe("unknown");
    expect(node?.presentation.statusText).toContain("over budget by 5");
  });

  it("RFS4: an RF_ failure envelope the host holds is projected as a failure, never a success", async () => {
    const wired = harness(injected(REFUSAL), { seam: "rf-cli" });
    await runWorkflow({ script: RF_NODE, host: wired.host });
    const node = previewNode(wired.projection);
    expect(node?.presentation.statusTone).toBe("failure");
    expect(node?.presentation.statusText).toBe("refused · RF_RENDER_REFUSED");
    expect(node?.completeness).toBe("unknown");
  });

  it("RFS5: a journal replay of the read never reaches the host seam, so the confirmed preview is not refreshed by it", async () => {
    const projection = new ObservationProjection();
    const adapter = vi.spyOn(rfObserver, "reactivefiberTopology");
    const recorded: WorkflowJournalEntry[] = [];
    const first = harness(injected(previewEnvelope()), { projection });
    expect((await runWorkflow({ script: RF_NODE, host: first.host, journal: { append: entry => { recorded.push(entry); } } })).status).toBe("completed");
    const confirmed = previewNode(projection)?.lastConfirmedAt;
    expect(confirmed).toEqual(expect.any(String));
    expect(adapter).toHaveBeenCalledTimes(1);
    const replayRead = vi.fn(injected(previewEnvelope()));
    const second = harness(replayRead, { projection });
    const replayed = await runWorkflow({ script: RF_NODE, host: second.host, journal: { entries: recorded } });
    expect(replayed.status).toBe("completed");
    expect(replayRead).not.toHaveBeenCalled();
    expect(adapter).toHaveBeenCalledTimes(1);
    expect(previewNode(projection)?.lastConfirmedAt).toBe(confirmed);
    expect(replayed.progress).toContainEqual(expect.objectContaining({ type: "workflow_node", state: "done", freshness: "stale", cached: true }));
    vi.restoreAllMocks();
  });

  it("RFS6: a reading captured before the confirmed one is out of order: the confirmed preview keeps its state and no edge is stated", () => {
    const projection = new ObservationProjection();
    const times = ["2026-11-11T05:10:00.000Z", "2026-11-11T05:09:00.000Z"];
    const host = { projection, scope: SCOPE, seam: "rf-cli" as const, invocationId: INVOCATION, now: (): string => times.shift() ?? "2026-11-11T05:00:00.000Z" };
    const value = { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope() } as JsonValue;
    expect(observeReactiveFiberNode(host, { capabilityId: "reactivefiber.render.preview", callId: 1 }, value)).toEqual({ kind: "projected", refresh: "applied", related: 1 });
    const stale = { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope(result => { result.diagnostics_summary = { errors: 2, warnings: 0, has_errors: true, has_warnings: false }; }) } as JsonValue;
    expect(observeReactiveFiberNode(host, { capabilityId: "reactivefiber.render.preview", callId: 2 }, stale)).toEqual({ kind: "projected", refresh: "out-of-order", related: 0 });
    const node = previewNode(projection);
    expect(node?.lastConfirmedAt).toBe("2026-11-11T05:10:00.000Z");
    expect(node?.presentation.statusTone).toBe("success");
    expect(projection.relations({ scope: SCOPE }).map(edge => edge.from)).toEqual([JSON.stringify([ROOT, SCOPE.principal, "pi-workflow", "node-call", "", `${INVOCATION}:1`])]);
  });

  it("RFS7: the context text reaches the projection only as its sha256 digest; its body is in no surfaced string", async () => {
    const body = "wb79k2 distinctive context body marker";
    const wired = harness(injected(previewEnvelope(result => { (result.output as JsonObject).text = body; })), { seam: "rf-cli" });
    await runWorkflow({ script: RF_NODE, host: wired.host });
    const node = previewNode(wired.projection);
    expect(node?.payloadRef).toBe(`rf-output:sha256:${createHash("sha256").update(body).digest("hex")}`);
    const surfaced = [JSON.stringify(wired.projection.query({ scope: SCOPE, limit: 100 })), JSON.stringify(observeInvocation(wired.projection, { scope: SCOPE, invocationId: INVOCATION })), ...wired.logs];
    expect(surfaced.filter(text => text.includes(body))).toEqual([]);
  });

  it("RFS8: a call the registry refuses and another capability's value reach no adapter call; the held preview reaches exactly one", async () => {
    const adapter = vi.spyOn(rfObserver, "reactivefiberTopology");
    const refused = harness(async () => { throw new CapabilityError("transport", "RF preview stand-in transport down."); });
    const failed = await runWorkflow({ script: RF_NODE, host: refused.host });
    expect(failed.status).toBe("failed");
    expect(adapter).not.toHaveBeenCalled();
    expect(refused.logs).toEqual([]);
    expect(previewNode(refused.projection)).toBeUndefined();
    const other = harness(injected(previewEnvelope()));
    other.registry.register({
      descriptor: { id: "fixture.echo", version: "1.0.0", description: "Echo an rf envelope under another contract", inputSchema: { type: "object" }, effectClass: "read", permissions: [], supportedModes: ["invoke"] },
      invoke: async () => ({ contract: "fixture.echo/v1", workspaceRoot: ROOT, source: previewEnvelope() }),
    });
    const otherHost = createClaudeWorkflowHost({ cwd: ROOT, capabilities: other.registry, grants: [...GRANTS, "invoke:fixture.echo"], invocationId: INVOCATION,
      onNodeValue: reactiveFiberNodeObserver({ projection: other.projection, scope: SCOPE, seam: "injected-fixture", invocationId: INVOCATION, now: () => "2026-11-11T05:20:00.000Z" }) });
    expect((await runWorkflow({ script: `${HEAD}return await node("fixture.echo", {});`, host: otherHost })).status).toBe("completed");
    expect(adapter).not.toHaveBeenCalled();
    expect(previewNode(other.projection)).toBeUndefined();
    expect((await runWorkflow({ script: RF_NODE, host: otherHost })).status).toBe("completed");
    expect(adapter).toHaveBeenCalledTimes(1);
    expect(previewNode(other.projection)).toBeDefined();
    vi.restoreAllMocks();
  });

  it("RFS9: an adapter refusal is one typed diagnostic line and no snapshot, and the script still receives the registry's answer", async () => {
    const foreign = harness(injected(previewEnvelope()), { scope: { workspace: "/fixture/another-root", principal: SCOPE.principal } });
    const answered = await runWorkflow({ script: RF_NODE, host: foreign.host });
    expect(answered.status).toBe("completed");
    expect(answered.value).toEqual({ contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope() });
    expect(foreign.logs).toEqual(["ReactiveFiber preview of node call 1 not projected (authorization)"]);
    expect(foreign.projection.query({ scope: { workspace: "/fixture/another-root", principal: SCOPE.principal }, limit: 10 }).nodes).toEqual([]);
    const writing = harness(injected(previewEnvelope(result => { (result.work as JsonObject).storage_write_count = 1; })));
    expect((await runWorkflow({ script: RF_NODE, host: writing.host })).status).toBe("completed");
    expect(writing.logs).toEqual(["ReactiveFiber preview of node call 1 not projected (validation)"]);
    expect(previewNode(writing.projection)).toBeUndefined();
    const outcome = observeReactiveFiberNode({ projection: new ObservationProjection(), scope: SCOPE, seam: "rf-cli", invocationId: INVOCATION, now: () => "2026-11-11T05:30:00.000Z" },
      { capabilityId: "reactivefiber.render.preview", callId: 4 }, { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope(result => { result.ephemeral = false; }) } as JsonValue);
    expect(outcome).toEqual({ kind: "refused", category: "validation", diagnostic: "ReactiveFiber preview of node call 4 not projected (validation)" });
  });

  it("RFS10: a throwing hook leaves the node's answer as the registry gave it", async () => {
    const registry = new CapabilityRegistry();
    registerReactiveFiberRender(registry, injected(previewEnvelope()), ROOT);
    const host = createClaudeWorkflowHost({ cwd: ROOT, capabilities: registry, grants: GRANTS, invocationId: INVOCATION,
      onNodeValue: () => { throw new Error("hook failure stand-in"); } });
    const result = await runWorkflow({ script: RF_NODE, host });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope() });
  });

  it("RFS11: applying a reading reaches no capability registry method, so the wiring invokes nothing and mints no grant", () => {
    const methods = (["invoke", "inspect", "discover", "catalogSnapshot", "register", "effectClassOf", "admission"] as const).map(name => vi.spyOn(CapabilityRegistry.prototype, name));
    const projection = new ObservationProjection();
    const value = { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: previewEnvelope() } as JsonValue;
    const outcome = observeReactiveFiberNode({ projection, scope: SCOPE, seam: "rf-cli", invocationId: INVOCATION, now: () => "2026-11-11T05:40:00.000Z" }, { capabilityId: "reactivefiber.render.preview", callId: 7 }, value);
    expect(outcome).toEqual({ kind: "projected", refresh: "applied", related: 1 });
    for (const method of methods) expect(method).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it("RFS12: the RF root the host authorized replaces the session scope for the reading's workspace; without it the same reading is refused", () => {
    const rfRoot = "/fixture/rf-wiring-seam-authorized-root";
    const scope: ObservationScope = { workspace: "/fixture/rf-wiring-seam-session", principal: SCOPE.principal };
    const value = { contract: "reactivefiber.render.preview/v1", workspaceRoot: rfRoot, source: fullShapeRf(rfRoot) } as JsonValue;
    const call = { capabilityId: "reactivefiber.render.preview", callId: 9 };
    const now = () => "2026-11-11T05:50:00.000Z";
    const authorized = new ObservationProjection();
    expect(observeReactiveFiberNode({ projection: authorized, scope, seam: "rf-cli", invocationId: INVOCATION, now, authorizedRfRoot: rfRoot }, call, value)).toEqual({
      kind: "projected",
      refresh: "applied",
      related: 1,
    });
    expect(authorized.query({ scope, limit: 10 }).nodes.filter(node => node.nativeRef.provider === "reactivefiber").map(node => node.kind)).toEqual(["reactivefiber.render.preview.snapshot"]);
    const logs: string[] = [];
    const unauthorized = new ObservationProjection();
    expect(observeReactiveFiberNode({ projection: unauthorized, scope, seam: "rf-cli", invocationId: INVOCATION, now, log: line => logs.push(line) }, call, value)).toEqual({
      kind: "refused",
      category: "authorization",
      diagnostic: "ReactiveFiber preview of node call 9 not projected (authorization)",
    });
    expect(logs).toEqual(["ReactiveFiber preview of node call 9 not projected (authorization)"]);
    expect(unauthorized.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
  });
});
