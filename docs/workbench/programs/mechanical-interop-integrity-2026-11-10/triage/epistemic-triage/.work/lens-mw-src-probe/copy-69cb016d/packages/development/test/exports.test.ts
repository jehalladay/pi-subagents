import test from "node:test";
import assert from "node:assert/strict";
import * as api from "../dist/index.js";

// MechanicalWorkflows-09ib.1 (CACWC-EAT-R015, reslice of 09ib at head): the runtime export surface of this
// package is a committed snapshot. Change it only in the same commit as an intended contract change, per the
// docs/README change rule. Types are erased at runtime, so this pins value exports only.
const EXPECTED: readonly string[] = [
  "develop",
  "repairRejectedCandidate",
  "reviewCandidate",
  "validateBridge",
];

test("the package index exports exactly the committed runtime names", () => {
  assert.deepEqual(Object.keys(api).sort(), [...EXPECTED].sort());
});
