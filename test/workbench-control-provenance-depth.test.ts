/**
 * wb-pjj (W16-L/VC-7): structural vetting stays behind provenance as defense in depth. Here the core's provenance predicate is
 * replaced by a spy that vouches for EVERY value, so the only layer left between a look-alike and the native verb is the
 * adapter's structural vetting. A malformed look-alike must still be refused before the seam, a structurally exact one then
 * executes (so provenance is the load-bearing layer that refuses it with the real predicate), and the adapter must consult
 * the core's exported predicate on every decision it is handed rather than a private copy of the check.
 */
import type { CallOptions } from "@furnace/sdk";
import { describe, expect, it, vi } from "vitest";
import { acknowledge, type ControlDecision, decideControl, type NativeControlRequest } from "../src/workbench/control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const vouch = vi.hoisted(() => vi.fn((_decision: unknown): boolean => true));
vi.mock("../src/workbench/control.js", async importOriginal => ({ ...(await importOriginal<Record<string, unknown>>()), isCoreMintedDecision: vouch }));

/** The structural refusal text furnace-control.ts already used before provenance existed. */
const STRUCTURAL_TEXT = "Furnace control executes only a permitted workbench.control/v1 decision minted by the control core.";
const UNMINTED_TEXT = "decision was not minted by the decision core";

const WS = "/tmp/provenance-depth-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const STATE_SINCE = "2026-10-15T07:00:02.719135054+00:00";
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };

function permit(): ControlDecision & { decision: "permitted" } {
  const projection = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "frn-req-attempts-1" } });
  const request: NativeControlRequest = { scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: ["control:furnace.stop"], target: { ...RUN }, action: "stop",
    params: { confirmed: true }, invocationId: "inv-depth-1", requestedAt: AT };
  const decision = decideControl(request, { projection, now: () => DECIDED_AT });
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
    Object.freeze(value);
  }
  return value;
}
async function attempt(decision: unknown): Promise<{ readonly error?: unknown; readonly calls: number }> {
  const stop = vi.fn(async (id: string, call?: CallOptions): Promise<unknown> => ({ protocolVersion: 1, kind: "run_stop", requestId: call?.requestId,
    exit: { code: 0, signal: null }, stderr: "", data: { run_id: id, state: "stopped", state_since: STATE_SINCE } }));
  const idle = vi.fn();
  const client = { runs: { pause: idle, stop, resume: idle }, attempts: { stop: idle } } as unknown as FurnaceControlClient;
  const calls = (): number => stop.mock.calls.length + idle.mock.calls.length;
  try {
    await executeFurnaceControl(decision as ControlDecision, { client, workspaceRoot: WS, now: () => ACKED_AT, timeoutMs: 5_000 });
    return { calls: calls() };
  } catch (error) {
    return { error, calls: calls() };
  }
}

describe("furnace adapter: structural vetting stays behind provenance as defense in depth", () => {
  it("still refuses every malformed look-alike before the seam with the structural text when provenance vouches for everything", async () => {
    const genuine = permit();
    const { receipt } = genuine;
    const forged = (patch: Record<string, unknown>): unknown => deepFreeze({ decision: "permitted", receipt: { ...structuredClone(receipt), ...patch } });
    const malformed: unknown[] = [
      undefined, null, "permitted", 42, [genuine], { ...genuine }, Object.freeze({ decision: "permitted", receipt: { ...receipt } }),
      Object.freeze({ decision: "permitted", receipt: acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: "run_stop:ack" }) }),
      forged({ phase: "acknowledged" }), forged({ contractVersion: "workbench.control/v0" }), forged({ policy: "exact-grant" }), forged({ grant: "furnace:stop" }),
      forged({ action: "pause", grant: "control:furnace.pause" }), forged({ target: { ...receipt.target, provider: "hyperunix" }, grant: "control:hyperunix.stop" }),
      forged({ requestId: "--force" }), Object.freeze({ decision: "approved", receipt }),
    ];
    for (const value of malformed) {
      vouch.mockClear();
      const { error, calls } = await attempt(value);
      expect(vouch, "the adapter consults the core's provenance predicate first").toHaveBeenCalledTimes(1);
      expect(vouch).toHaveBeenCalledWith(value);
      expect(error).toBeInstanceOf(FurnaceControlRefusal);
      expect(error).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
      expect((error as Error).message).toBe(STRUCTURAL_TEXT);
      expect(calls).toBe(0);
    }
  });

  it("lets a structurally exact look-alike through when provenance vouches for it: provenance is the layer that refuses it", async () => {
    const lookAlike = deepFreeze(JSON.parse(JSON.stringify(permit())));
    vouch.mockClear();
    const { error, calls } = await attempt(lookAlike);
    expect(vouch).toHaveBeenCalledWith(lookAlike);
    expect(error).toBeUndefined();
    expect(calls).toBe(1);
    // With the predicate refusing, the same look-alike gets the fixed provenance text and never reaches the seam.
    vouch.mockReturnValueOnce(false);
    const refused = await attempt(deepFreeze(JSON.parse(JSON.stringify(permit()))));
    expect(refused.error).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
    expect((refused.error as Error).message).toBe(UNMINTED_TEXT);
    expect(refused.calls).toBe(0);
  });
});
