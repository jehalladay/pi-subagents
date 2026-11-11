import test from "node:test";
import assert from "node:assert/strict";
import { projectGateIntoFurnace } from "../dist/furnace-gate.js";
import type { GateObservation } from "../dist/live-gate.js";
type FakeResult={status:string;summary?:string;message?:string;data?:Record<string,unknown>;failure_class?:string};

const fake = {
  success: (options: { summary: string; data: Record<string, unknown> }): FakeResult => ({ status: "success", ...options }),
  failure: (message: string, options: { failure_class: "task"; data: Record<string, unknown> }): FakeResult => ({ status: "failure", message, ...options }),
  indeterminate: (message: string): FakeResult => ({ status: "indeterminate", message }),
};
const basis = { commit: "a".repeat(40), tree: "b".repeat(40), clean: true as const };
const g = (kind: GateObservation["kind"]): GateObservation => ({ kind, reason: "OBSERVED", basis, operationId: "op-456", native: {}, binding: { commit: "native", gateDefinition: "descriptor", environment: "descriptor" } });
test("passing gate maps to success, with native operation reference", () => {
  const r = projectGateIntoFurnace(g("passed"), fake);
  assert.equal(r.status, "success");
  assert.equal(r.data?.["operation_id"], "op-456");
});
test("failed gate is a task failure, not executor transport failure", () => {
  const r = projectGateIntoFurnace(g("failed"), fake);
  assert.equal(r.status, "failure");
  assert.equal(r.failure_class, "task");
});
test("unknown gate is indeterminate, never synthetic failure or PASS", () => {
  const r = projectGateIntoFurnace(g("indeterminate"), fake);
  assert.equal(r.status, "indeterminate");
  assert.match(r.message ?? "", /op-456/);
});
test("projection evidence carries basis, operation_id and reason on success and failure, and the failure message ends with the reason (MechanicalWorkflows-guu3)", () => {
  const evidence = { basis, operation_id: "op-456", reason: "OBSERVED" };
  assert.deepEqual(projectGateIntoFurnace(g("passed"), fake).data, evidence, "passed data must be exactly {basis, operation_id, reason}");
  const failed = projectGateIntoFurnace(g("failed"), fake);
  assert.deepEqual(failed.data, evidence, "failed data must be exactly {basis, operation_id, reason}");
  assert.match(failed.message ?? "", /: OBSERVED$/, "failure message must end with the reason");
});
test("indeterminate message ends with the reason and operation, and names no operation when operationId is null (MechanicalWorkflows-guu3)", () => {
  const withOp = projectGateIntoFurnace(g("indeterminate"), fake);
  assert.match(withOp.message ?? "", /: OBSERVED operation=op-456$/, "indeterminate message must carry reason then operation");
  const noOp = projectGateIntoFurnace({ ...g("indeterminate"), operationId: null }, fake);
  assert.match(noOp.message ?? "", /: OBSERVED$/, "null operationId message must end with the reason");
  assert.doesNotMatch(noOp.message ?? "", /operation/, "null operationId must name no operation");
});
test("an indeterminate gate calls only the indeterminate constructor, never success or failure, so Furnace owns retry (MechanicalWorkflows-dalh)", () => {
  const used: string[] = [];
  const spy = {
    success: (o: { summary: string; data: Record<string, unknown> }): FakeResult => { used.push("success"); return fake.success(o); },
    failure: (m: string, o: { failure_class: "task"; data: Record<string, unknown> }): FakeResult => { used.push("failure"); return fake.failure(m, o); },
    indeterminate: (m: string): FakeResult => { used.push("indeterminate"); return fake.indeterminate(m); },
  };
  for (const reason of ["FORGE_CONNECTION_CLOSE_UNCERTAIN", "WORKSPACE_NOT_CLEAN_AFTER_GATE"]) {
    used.length = 0;
    const r = projectGateIntoFurnace({ ...g("indeterminate"), reason }, spy);
    assert.deepEqual(used, ["indeterminate"]);
    assert.equal(r.status, "indeterminate");
    assert.match(r.message ?? "", new RegExp(reason + " operation=op-456$"));
  }
});
