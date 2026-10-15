/**
 * W22-M/W06 (wb-cax.18): registry-wide in-flight admission, tested before
 * implementation. docs/workbench/17 "Runtime and host requirements": "Streaming
 * bounded by max in-flight node calls, backend admission and configured quota."
 */
import { describe, expect, it, vi } from "vitest";
import {
  CAPABILITY_MAX_IN_FLIGHT,
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityLimits,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

const ID = "admit.read";
const HEAD = 'export const meta={name:"registry-admission",description:"wb-cax.18"};\n';
const grantsFor = (id: string): readonly string[] => ["admit:read", `inspect:${id}`];
const context = (signal: AbortSignal = new AbortController().signal, id = ID): InvocationContext => ({ grants: grantsFor(id), signal });

type Outcome = { readonly ok: true; readonly value: JsonValue } | { readonly ok: false; readonly error: unknown };
/** Handlers attach at once, so a refusal landing before the test looks is never an unhandled rejection. */
const settled = (call: Promise<JsonValue>): Promise<Outcome> =>
  call.then<Outcome, Outcome>(value => ({ ok: true, value }), (error: unknown) => ({ ok: false, error }));
/** One macrotask turn: every pending microtask (slot handoffs, provider entries) has run. */
const turn = (): Promise<void> => new Promise(resolve => { setTimeout(resolve, 0); });
function thrownBy(construct: () => unknown): unknown {
  try { construct(); } catch (error) { return error; }
  return undefined;
}
function refusalOf(outcome: Outcome): unknown {
  expect(outcome.ok).toBe(false);
  return outcome.ok ? undefined : outcome.error;
}

interface HeldCall {
  readonly mode: "invoke" | "inspect";
  readonly input: JsonValue;
  release(value?: JsonValue): void;
  fail(error: Error): void;
}

/** A provider whose every call stays pending until the test settles it; entries are recorded in arrival order. */
function held(limits: CapabilityLimits, effectClass: CapabilityDescriptor["effectClass"] = "read", id = ID, description = "Held fixture") {
  const registry = new CapabilityRegistry(limits);
  const calls: HeldCall[] = [];
  const enter = (mode: HeldCall["mode"]) => (input: JsonValue): Promise<JsonValue> => new Promise<JsonValue>((resolve, reject) => {
    calls.push({ mode, input, release: (value = { done: input }) => resolve(value), fail: reject });
  });
  const invoke = vi.fn(enter("invoke"));
  const inspect = vi.fn(enter("inspect"));
  registry.register({ descriptor: { id, version: "1.0.0", description, inputSchema: { type: "object" }, effectClass, permissions: ["admit:read"], supportedModes: ["invoke", "inspect"] }, invoke, inspect });
  return { registry, calls, invoke, inspect };
}
const inputs = (calls: readonly HeldCall[]): JsonValue[] => calls.map(call => call.input);

describe("A1 the in-flight bound exists and is validated", () => {
  it.each([0, 1.5, -1])("refuses maxInFlight %s through the existing limit-validation path", value => {
    const error = thrownBy(() => new CapabilityRegistry({ maxInFlight: value }));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({ category: "validation", message: "Invalid capability limit maxInFlight." });
  });
  it("defaults to the exported constant and enforces it, not just reports it", async () => {
    expect(Number.isSafeInteger(CAPABILITY_MAX_IN_FLIGHT)).toBe(true);
    expect(CAPABILITY_MAX_IN_FLIGHT).toBeGreaterThanOrEqual(1);
    const { registry, calls, invoke } = held({});
    expect(registry.admission().maxInFlight).toBe(CAPABILITY_MAX_IN_FLIGHT);
    const outcomes = Array.from({ length: CAPABILITY_MAX_IN_FLIGHT + 1 }, (_, n) => settled(registry.invoke(ID, { n }, context())));
    await turn();
    expect(invoke).toHaveBeenCalledTimes(CAPABILITY_MAX_IN_FLIGHT);
    expect(registry.admission()).toMatchObject({ inFlight: CAPABILITY_MAX_IN_FLIGHT, peakInFlight: CAPABILITY_MAX_IN_FLIGHT });
    calls[0].release();
    await outcomes[0];
    await turn();
    expect(invoke).toHaveBeenCalledTimes(CAPABILITY_MAX_IN_FLIGHT + 1);
    expect(calls.at(-1)?.input).toEqual({ n: CAPABILITY_MAX_IN_FLIGHT });
    for (const call of calls.slice(1)) call.release();
    expect((await Promise.all(outcomes)).every(outcome => outcome.ok)).toBe(true);
    expect(registry.admission()).toMatchObject({ inFlight: 0, peakInFlight: CAPABILITY_MAX_IN_FLIGHT, admitted: CAPABILITY_MAX_IN_FLIGHT + 1, refused: 0 });
  });
});

describe("A2 FIFO wait, not refusal, while a slot will free", () => {
  it("lets three concurrent calls reach the provider one at a time in request order", async () => {
    const { registry, calls, invoke } = held({ maxInFlight: 1 });
    const outcomes = [1, 2, 3].map(n => settled(registry.invoke(ID, { n }, context())));
    await turn();
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(inputs(calls)).toEqual([{ n: 1 }]);
    expect(registry.admission()).toMatchObject({ inFlight: 1, admitted: 1 });
    calls[0].release({ result: 1 });
    await outcomes[0];
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 2 }]);
    calls[1].release({ result: 2 });
    await outcomes[1];
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
    calls[2].release({ result: 3 });
    expect(await Promise.all(outcomes)).toEqual([1, 2, 3].map(result => ({ ok: true, value: { result } })));
    expect(registry.admission()).toEqual({ maxInFlight: 1, inFlight: 0, peakInFlight: 1, admitted: 3, refused: 0, cancelledWhileQueued: 0 });
  });
  it("refuses unknown, unauthorized, invalid and pre-cancelled requests before admission, even while saturated", async () => {
    const { registry, calls, invoke } = held({ maxInFlight: 1 });
    const running = settled(registry.invoke(ID, { n: 1 }, context()));
    const aborted = new AbortController();
    aborted.abort();
    expect(await settled(registry.invoke("admit.missing", {}, context()))).toMatchObject({ ok: false, error: { category: "unavailable" } });
    expect(await settled(registry.invoke(ID, {}, { grants: [], signal: new AbortController().signal }))).toMatchObject({ ok: false, error: { category: "authorization" } });
    expect(await settled(registry.invoke(ID, "not-an-object", context()))).toMatchObject({ ok: false, error: { category: "validation" } });
    expect(await settled(registry.invoke(ID, {}, context(aborted.signal)))).toMatchObject({ ok: false, error: { category: "transport" } });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(registry.admission()).toMatchObject({ inFlight: 1, admitted: 1, refused: 0, cancelledWhileQueued: 0 });
    calls[0].release({ result: 1 });
    expect(await running).toEqual({ ok: true, value: { result: 1 } });
  });
});

describe("A3 typed admission refusal, distinct from the transport deadline", () => {
  it.each(["read", "external"] as const)("refuses a queued %s request at its deadline as unavailable and never calls the provider for it", async effectClass => {
    const { registry, calls, invoke } = held({ maxInFlight: 1, deadlineMs: 50 }, effectClass);
    const first = settled(registry.invoke(ID, { n: 1 }, context()));
    const second = settled(registry.invoke(ID, { n: 2 }, context()));
    const error = refusalOf(await second);
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({
      category: "unavailable",
      message: expect.stringContaining("admission"),
    });
    expect(error).toMatchObject({ message: expect.stringContaining("1 in flight") });
    expect(error).toMatchObject({ message: expect.not.stringContaining("exceeded its deadline") });
    // The admitted call meets the existing deadline path unchanged: the provider WAS called.
    expect(await first).toMatchObject({
      ok: false,
      error: { category: effectClass === "read" ? "transport" : "uncertain-effect", message: expect.stringContaining("exceeded its deadline") },
    });
    expect(invoke).toHaveBeenCalledTimes(1);
    calls[0].release();
    await turn();
    const third = settled(registry.invoke(ID, { n: 3 }, context()));
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 3 }]);
    calls[1].release({ result: 3 });
    expect(await third).toEqual({ ok: true, value: { result: 3 } });
    expect(registry.admission()).toMatchObject({ inFlight: 0, admitted: 2, refused: 1, cancelledWhileQueued: 0 });
  });
});

describe("A4 cancellation while queued", () => {
  it.each(["read", "external"] as const)("rejects a cancelled queued %s request as transport and keeps the remaining waiters in order", async effectClass => {
    const { registry, calls, invoke } = held({ maxInFlight: 1 }, effectClass);
    const cancel = new AbortController();
    const first = settled(registry.invoke(ID, { n: 1 }, context()));
    const second = settled(registry.invoke(ID, { n: 2 }, context()));
    const third = settled(registry.invoke(ID, { n: 3 }, context(cancel.signal)));
    const fourth = settled(registry.invoke(ID, { n: 4 }, context()));
    await turn();
    cancel.abort();
    const error = refusalOf(await third);
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({ category: "transport" });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(registry.admission()).toMatchObject({ inFlight: 1, cancelledWhileQueued: 1, refused: 0 });
    calls[0].release({ result: 1 });
    expect(await first).toEqual({ ok: true, value: { result: 1 } });
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 2 }]);
    calls[1].release({ result: 2 });
    expect(await second).toEqual({ ok: true, value: { result: 2 } });
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 2 }, { n: 4 }]);
    calls[2].release({ result: 4 });
    expect(await fourth).toEqual({ ok: true, value: { result: 4 } });
    expect(registry.admission()).toEqual({ maxInFlight: 1, inFlight: 0, peakInFlight: 1, admitted: 3, refused: 0, cancelledWhileQueued: 1 });
  });
});

describe("A5 a slot is held until the provider settles", () => {
  it.each([
    ["resolves", (call: HeldCall) => call.release({ late: true })],
    ["rejects", (call: HeldCall) => call.fail(new Error("late provider failure"))],
  ] as const)("keeps a deadline-abandoned provider counted until it %s", async (_settles, settle) => {
    const { registry, calls, invoke } = held({ maxInFlight: 1, deadlineMs: 30 });
    expect(await settled(registry.invoke(ID, { n: 1 }, context()))).toMatchObject({
      ok: false,
      error: { category: "transport", message: expect.stringContaining("exceeded its deadline") },
    });
    expect(registry.admission().inFlight).toBe(1);
    // Saturation stays visible: the next call is refused, never dispatched beside the hung provider.
    expect(await settled(registry.invoke(ID, { n: 2 }, context()))).toMatchObject({ ok: false, error: { category: "unavailable" } });
    expect(invoke).toHaveBeenCalledTimes(1);
    settle(calls[0]);
    await turn();
    expect(registry.admission()).toMatchObject({ inFlight: 0, admitted: 1, refused: 1 });
    const next = settled(registry.invoke(ID, { n: 3 }, context()));
    await turn();
    expect(inputs(calls)).toEqual([{ n: 1 }, { n: 3 }]);
    calls[1].release({ result: 3 });
    expect(await next).toEqual({ ok: true, value: { result: 3 } });
  });
});

describe("A6 inspect mode shares the bound", () => {
  it("lets a held inspect block an invoke and a held invoke block an inspect", async () => {
    const { registry, calls, invoke, inspect } = held({ maxInFlight: 1 });
    const inspected = settled(registry.inspect(ID, { ref: "r1" }, context()));
    const invoked = settled(registry.invoke(ID, { n: 1 }, context()));
    await turn();
    expect(inspect).toHaveBeenCalledTimes(1);
    expect(invoke).not.toHaveBeenCalled();
    calls[0].release({ inspected: 1 });
    expect(await inspected).toEqual({ ok: true, value: { inspected: 1 } });
    await turn();
    expect(invoke).toHaveBeenCalledTimes(1);
    const inspectedAgain = settled(registry.inspect(ID, { ref: "r2" }, context()));
    await turn();
    expect(inspect).toHaveBeenCalledTimes(1);
    calls[1].release({ invoked: 1 });
    expect(await invoked).toEqual({ ok: true, value: { invoked: 1 } });
    await turn();
    expect(inspect).toHaveBeenCalledTimes(2);
    calls[2].release({ inspected: 2 });
    expect(await inspectedAgain).toEqual({ ok: true, value: { inspected: 2 } });
    expect(calls.map(call => call.mode)).toEqual(["inspect", "invoke", "inspect"]);
    expect(registry.admission()).toMatchObject({ inFlight: 0, peakInFlight: 1, admitted: 3 });
  });
});

describe("A7 never auto-retry", () => {
  it("never invokes the provider later for a refused or a queued-then-cancelled request", async () => {
    const { registry, calls, invoke } = held({ maxInFlight: 1, deadlineMs: 40 }, "external");
    const cancel = new AbortController();
    const running = settled(registry.invoke(ID, { n: "running" }, context()));
    const cancelled = settled(registry.invoke(ID, { n: "cancelled" }, context(cancel.signal)));
    const refused = settled(registry.invoke(ID, { n: "refused" }, context()));
    await turn();
    cancel.abort();
    expect(await cancelled).toMatchObject({ ok: false, error: { category: "transport" } });
    expect(await refused).toMatchObject({ ok: false, error: { category: "unavailable" } });
    expect(await running).toMatchObject({ ok: false, error: { category: "uncertain-effect" } });
    calls[0].release();
    await turn();
    await turn();
    expect(invoke.mock.calls.map(([input]) => input)).toEqual([{ n: "running" }]);
    expect(registry.admission()).toEqual({ maxInFlight: 1, inFlight: 0, peakInFlight: 1, admitted: 1, refused: 1, cancelledWhileQueued: 1 });
  });
});

describe("A8 the telemetry snapshot is counts only", () => {
  it("returns a frozen value with exactly the six counters and no id, provider name or payload", async () => {
    const marked = "markzq.read";
    const { registry, calls } = held({ maxInFlight: 1, deadlineMs: 40 }, "read", marked, "markzq provider description");
    const before = registry.admission();
    const cancel = new AbortController();
    const running = settled(registry.invoke(marked, { secret: "markzq-input" }, context(undefined, marked)));
    const cancelled = settled(registry.invoke(marked, { secret: "markzq-cancelled" }, context(cancel.signal, marked)));
    cancel.abort();
    expect(await settled(registry.invoke(marked, { secret: "markzq-refused" }, context(undefined, marked)))).toMatchObject({ ok: false, error: { category: "unavailable" } });
    calls[0].release({ secret: "markzq-output" });
    await Promise.all([running, cancelled]);
    await turn();
    const snapshot = registry.admission();
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.keys(snapshot).sort()).toEqual(["admitted", "cancelledWhileQueued", "inFlight", "maxInFlight", "peakInFlight", "refused"]);
    expect(Object.values(snapshot).every(value => Number.isSafeInteger(value))).toBe(true);
    expect(JSON.stringify(snapshot)).not.toMatch(/markzq/i);
    expect(snapshot).toEqual({ maxInFlight: 1, inFlight: 0, peakInFlight: 1, admitted: 1, refused: 1, cancelledWhileQueued: 1 });
    // A snapshot is a value, not a live view of later traffic.
    expect(before).toEqual({ maxInFlight: 1, inFlight: 0, peakInFlight: 0, admitted: 0, refused: 0, cancelledWhileQueued: 0 });
  });
});

describe("admission refusal through the worker RPC", () => {
  it("reaches a workflow script as a typed unavailable CapabilityError while the provider sees only the slot holder", async () => {
    const { registry, calls, invoke } = held({ maxInFlight: 1, deadlineMs: 150 });
    const blocker = settled(registry.invoke(ID, { n: "blocker" }, context()));
    const host: WorkflowHost = {
      spawnAgent: async () => ({ ok: true }),
      abortAgent: () => {},
      callNode: request => registry.invoke(request.capabilityId, request.input, { grants: grantsFor(ID), signal: request.signal }),
    };
    const script = HEAD + 'try { await node("admit.read", {n:"queued"}); return {reached:true}; } catch(error) { return {name:error.name,category:error.category,typed:error instanceof CapabilityError,admission:/admission/.test(error.message)}; }';
    const result = await runWorkflow({ script, host });
    expect(result).toMatchObject({ status: "completed", value: { name: "CapabilityError", category: "unavailable", typed: true, admission: true } });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(inputs(calls)).toEqual([{ n: "blocker" }]);
    calls[0].release();
    expect(await blocker).toMatchObject({ ok: false, error: { category: "transport" } });
    await turn();
    expect(registry.admission()).toMatchObject({ inFlight: 0, admitted: 1, refused: 1 });
  });
});
