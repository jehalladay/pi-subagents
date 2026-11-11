import test from "node:test";
import assert from "node:assert/strict";
import { assertFurnaceSdk, forgeGateCallback } from "../dist/furnace-app-wiring.js";
import type { GateObservation } from "../dist/live-gate.js";

const basis = { commit: "a".repeat(40), tree: "b".repeat(40), clean: true as const };
const gateObservation: GateObservation = { kind: "passed", reason: "OBSERVED", basis, operationId: "op-xtk", native: {}, binding: { commit: "native", gateDefinition: "descriptor", environment: "descriptor" } };
const results = {
  success: (): unknown => "success",
  failure: (): unknown => "failure",
  indeterminate: (): unknown => "indeterminate",
};
class FakeApp { executor(): unknown { return undefined; } }
const compatible = { ExecutorApp: FakeApp, ExecutionResult: results };

test("T1 a module without ExecutorApp is refused with FURNACE_SDK_INCOMPATIBLE", () => {
  const refused = (e: unknown): boolean => e instanceof Error && e.message.startsWith("FURNACE_SDK_INCOMPATIBLE");
  assert.throws(() => assertFurnaceSdk({}), refused);
  // ExecutionResult is complete here, so only the ExecutorApp check can refuse it.
  assert.throws(() => assertFurnaceSdk({ ExecutionResult: results }), refused);
});
test("T2 an ExecutionResult without indeterminate is refused with the same message", () => {
  const partial = { ExecutorApp: class {}, ExecutionResult: { success: results.success, failure: results.failure } };
  assert.throws(() => assertFurnaceSdk(partial), (e: unknown) => e instanceof Error && e.message === "FURNACE_SDK_INCOMPATIBLE: ExecutorApp/ExecutionResult missing");
});
test("T3 a compatible module is returned as the identical object", () => {
  assert.equal(assertFurnaceSdk(compatible), compatible);
});
test("T4 the callback verifies the Furnace workspace root with the forge default", async () => {
  const calls: unknown[][] = [];
  const cb = forgeGateCallback(compatible as never, {}, async (...args: unknown[]) => { calls.push(args); return gateObservation; }, () => "projected");
  await cb({ workspace: { root: "/r" } });
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], ["/r", "forge"]);
});
test("T5 MECHANICAL_FORGE_BINARY overrides the forge executable", async () => {
  const calls: unknown[][] = [];
  const cb = forgeGateCallback(compatible as never, { MECHANICAL_FORGE_BINARY: "/opt/forge" }, async (...args: unknown[]) => { calls.push(args); return gateObservation; }, () => "projected");
  await cb({ workspace: { root: "/r" } });
  assert.deepEqual(calls[0], ["/r", "/opt/forge"]);
});
test("T6 project receives the exact observation and ExecutionResult, and its return value passes through", async () => {
  const sentinel = { projected: true };
  const seen: unknown[][] = [];
  const cb = forgeGateCallback(compatible as never, {}, async () => gateObservation, (...args: unknown[]) => { seen.push(args); return sentinel; });
  const out = await cb({ workspace: { root: "/r" } });
  assert.equal(seen.length, 1);
  assert.equal(seen[0]?.[0], gateObservation);
  assert.equal(seen[0]?.[1], results);
  assert.equal(out, sentinel);
});
