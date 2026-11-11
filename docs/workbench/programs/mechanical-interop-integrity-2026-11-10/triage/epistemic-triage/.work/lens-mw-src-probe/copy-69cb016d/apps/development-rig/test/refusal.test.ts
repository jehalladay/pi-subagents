import test from "node:test";
import assert from "node:assert/strict";
import { refusalReason } from "../dist/refusal.js";
test("refusalReason names an Error by its message, and everything else or a blank message as UNKNOWN_ERROR", () => {
  assert.equal(refusalReason(new Error("MISSING_TASK: --task is required")), "MISSING_TASK: --task is required");
  class TypedRefusal extends Error {}
  assert.equal(refusalReason(new TypedRefusal("TYPED_REFUSAL")), "TYPED_REFUSAL");
  const others: ReadonlyArray<readonly [string, unknown]> = [
    ["string", "boom"], ["number", 2], ["null", null], ["undefined", undefined],
    ["object with a message field", { message: "not an Error" }],
    ["Error with an empty message", new Error("")], ["Error with a whitespace message", new Error("  \n")],
  ];
  for (const [label, value] of others) assert.equal(refusalReason(value), "UNKNOWN_ERROR", label);
});
