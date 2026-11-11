import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { judgeQaMatrix, QA_MATRIX_ROWS, type QaCell } from "../dist/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const coordinationTests = readdirSync(here).filter((f) => f.endsWith(".test.ts")).map((f) => `packages/coordination/test/${f}`);
const rigTests = readdirSync(path.join(here, "..", "..", "..", "apps", "development-rig", "test")).filter((f) => f.endsWith(".test.ts")).map((f) => `apps/development-rig/test/${f}`);
const repoRoot = path.join(here, "..", "..", "..");
const gateRegistryPath = path.join(repoRoot, "qa", "integration", "real-infra-gates.json");
interface GateRegistryEntry {
  readonly name: string;
  readonly requirement: string;
  readonly evidence: string;
}
interface GateRegistryFile {
  readonly schema: string;
  readonly gates: readonly GateRegistryEntry[];
}
/** The registry is checked-in data (the j69h seat ruling, Q1 option (a)), never a literal in this test. */
const gateRegistry = JSON.parse(readFileSync(gateRegistryPath, "utf8")) as GateRegistryFile;
const registeredGate = gateRegistry.gates[0]!.name;
const inventory = { knownFiles: [...coordinationTests, ...rigTests], knownGates: gateRegistry.gates.map((g) => g.name) };

/** The living matrix: every V-row names its test in this repository or its named real-infrastructure gate. */
const MATRIX: readonly QaCell[] = [
  { row: "V1", disposition: { kind: "test", testFile: "packages/coordination/test/policy-graph.test.ts" } },
  { row: "V2", disposition: { kind: "test", testFile: "packages/coordination/test/kernel-likelihood.test.ts" } },
  { row: "V3", disposition: { kind: "test", testFile: "packages/coordination/test/guarded-witness.test.ts" } },
  { row: "V3", disposition: { kind: "test", testFile: "packages/coordination/test/absence.test.ts" } },
  { row: "V4", disposition: { kind: "test", testFile: "packages/coordination/test/effect-permissions.test.ts" } },
  { row: "V5", disposition: { kind: "test", testFile: "packages/coordination/test/durability.test.ts" } },
  { row: "V6", disposition: { kind: "test", testFile: "packages/coordination/test/rewrite-application.test.ts" } },
  { row: "V6", disposition: { kind: "test", testFile: "packages/coordination/test/certificates.test.ts" } },
  { row: "V7", disposition: { kind: "test", testFile: "packages/coordination/test/graph-family-evaluation.test.ts" } },
  { row: "V8", disposition: { kind: "test", testFile: "packages/coordination/test/micropolicy-contract.test.ts" } },
  { row: "V8", disposition: { kind: "real-infra-gate", gateName: "installed MicroPolicy SDK round-trip (APO-021 INTEGRATION)" } },
  { row: "V9", disposition: { kind: "test", testFile: "packages/coordination/test/family-holdout.test.ts" } },
  { row: "V10", disposition: { kind: "test", testFile: "apps/development-rig/test/landing-journey.test.ts" } },
  { row: "V10", disposition: { kind: "real-infra-gate", gateName: "scratch native receipts for Furnace/Beads/Reactive (APO-022, de56.4)" } },
];

test("the ten rows are V1-V10 with the program-11 axes", () => {
  assert.deepEqual(Object.keys(QA_MATRIX_ROWS), ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10"]);
  assert.ok(QA_MATRIX_ROWS["V10"]!.includes("no fake live PASS"));
});

test("the living matrix covers every row against the real repository inventory", () => {
  const r = judgeQaMatrix(MATRIX, inventory);
  assert.deepEqual(r.refusals, []);
  assert.equal(r.ok, true);
  assert.deepEqual([...r.covered], Object.keys(QA_MATRIX_ROWS));
  assert.deepEqual([...r.uncovered], []);
});

test("an uncovered row refuses and names itself with its axis text", () => {
  const r = judgeQaMatrix(MATRIX.filter((c) => c.row !== "V9"), inventory);
  assert.equal(r.ok, false);
  assert.deepEqual([...r.uncovered], ["V9"]);
  const refusal = r.refusals.find((x) => x.code === "QA_ROW_UNCOVERED");
  assert.ok(refusal);
  assert.equal(refusal!.subject, "V9");
  assert.ok(refusal!.detail.includes("heldout"));
});

test("a silent skip is not a disposition: blank test file, blank gate name, unknown kind", () => {
  const blank = judgeQaMatrix([{ row: "V1", disposition: { kind: "test", testFile: "  " } }], inventory);
  assert.ok(blank.refusals.some((x) => x.code === "QA_SILENT_SKIP"));
  const unnamed = judgeQaMatrix([{ row: "V1", disposition: { kind: "real-infra-gate", gateName: "" } }], inventory);
  assert.ok(unnamed.refusals.some((x) => x.code === "QA_GATE_UNNAMED"));
  const skip = judgeQaMatrix([{ row: "V1", disposition: { kind: "skip" } as unknown as QaCell["disposition"] }], inventory);
  assert.ok(skip.refusals.some((x) => x.code === "QA_SILENT_SKIP"));
  assert.ok(skip.uncovered.includes("V1"));
});

test("a named test file outside the inventory refuses rather than counting as coverage", () => {
  const r = judgeQaMatrix([{ row: "V1", disposition: { kind: "test", testFile: "packages/coordination/test/imaginary.test.ts" } }], inventory);
  assert.equal(r.ok, false);
  assert.ok(r.refusals.some((x) => x.code === "QA_TEST_FILE_UNKNOWN"));
  assert.ok(r.uncovered.includes("V1"));
});

test("an unknown row refuses by name", () => {
  const r = judgeQaMatrix([{ row: "V11", disposition: { kind: "test", testFile: "packages/coordination/test/policy-graph.test.ts" } }], inventory);
  assert.ok(r.refusals.some((x) => x.code === "QA_ROW_UNKNOWN" && x.detail.includes("V11")));
});

test("each refusal detail keeps its distinguishing words so a coarsened message cannot pass", () => {
  const knownTest = "packages/coordination/test/policy-graph.test.ts";
  const unknownRow = judgeQaMatrix([{ row: "V11", disposition: { kind: "test", testFile: knownTest } }], inventory);
  const unknownRowRefusal = unknownRow.refusals.find((x) => x.code === "QA_ROW_UNKNOWN");
  assert.ok(unknownRowRefusal);
  assert.equal(unknownRowRefusal!.subject, "cells.0");
  assert.ok(unknownRowRefusal!.detail.includes("is outside V1-V10"));

  const blankTest = judgeQaMatrix([{ row: "V1", disposition: { kind: "test", testFile: "  " } }], inventory);
  const blankTestRefusal = blankTest.refusals.find((x) => x.code === "QA_SILENT_SKIP");
  assert.ok(blankTestRefusal);
  assert.ok(blankTestRefusal!.detail.includes("names no test file"));
  assert.ok(blankTestRefusal!.detail.includes("a silent skip is not a disposition"));

  const missingFile = "packages/coordination/test/imaginary.test.ts";
  const unknownFile = judgeQaMatrix([{ row: "V1", disposition: { kind: "test", testFile: missingFile } }], inventory);
  const unknownFileRefusal = unknownFile.refusals.find((x) => x.code === "QA_TEST_FILE_UNKNOWN");
  assert.ok(unknownFileRefusal);
  assert.ok(unknownFileRefusal!.detail.includes(missingFile));
  assert.ok(unknownFileRefusal!.detail.includes("not in the supplied inventory"));

  const unnamedGate = judgeQaMatrix([{ row: "V1", disposition: { kind: "real-infra-gate", gateName: "" } }], inventory);
  const unnamedGateRefusal = unnamedGate.refusals.find((x) => x.code === "QA_GATE_UNNAMED");
  assert.ok(unnamedGateRefusal);
  assert.ok(unnamedGateRefusal!.detail.includes("declares a real-infrastructure gate without naming it"));

  const skip = judgeQaMatrix([{ row: "V1", disposition: { kind: "skip" } as unknown as QaCell["disposition"] }], inventory);
  const skipRefusal = skip.refusals.find((x) => x.code === "QA_SILENT_SKIP");
  assert.ok(skipRefusal);
  assert.ok(skipRefusal!.detail.includes("carries disposition skip"));
  assert.ok(skipRefusal!.detail.includes("only a named test or a named real-infrastructure gate counts"));
});

test("a gate name outside the supplied registry refuses QA_GATE_UNKNOWN and leaves its row uncovered", () => {
  const r = judgeQaMatrix([{ row: "V8", disposition: { kind: "real-infra-gate", gateName: "invented gate that no registry declares" } }], inventory);
  assert.equal(r.ok, false);
  assert.ok(r.uncovered.includes("V8"));
  assert.ok(!r.covered.includes("V8"));
  const refusal = r.refusals.find((x) => x.code === "QA_GATE_UNKNOWN");
  assert.ok(refusal);
  assert.equal(refusal!.subject, "cells.0");
  assert.equal(refusal!.detail, "row V8 names gate invented gate that no registry declares, which is not in the supplied gate registry");
  assert.ok(!r.refusals.some((x) => x.code === "QA_GATE_UNNAMED"));
});

test("a known test-file path is not a gate: the file inventory and the gate registry stay separate sets", () => {
  const filePath = inventory.knownFiles[0]!;
  assert.ok(!inventory.knownGates.includes(filePath));
  const r = judgeQaMatrix([{ row: "V8", disposition: { kind: "real-infra-gate", gateName: filePath } }], inventory);
  assert.equal(r.ok, false);
  assert.ok(r.uncovered.includes("V8"));
  assert.ok(!r.covered.includes("V8"));
  const unknown = r.refusals.filter((x) => x.code === "QA_GATE_UNKNOWN");
  assert.equal(unknown.length, 1);
  assert.equal(unknown[0]!.subject, "cells.0");
  assert.equal(unknown[0]!.detail, `row V8 names gate ${filePath}, which is not in the supplied gate registry`);
});

test("gate-name membership is exact: a registered name padded with whitespace refuses QA_GATE_UNKNOWN, not QA_GATE_UNNAMED", () => {
  const padded = ` ${registeredGate} `;
  assert.notEqual(padded, registeredGate);
  const r = judgeQaMatrix([{ row: "V8", disposition: { kind: "real-infra-gate", gateName: padded } }], inventory);
  assert.equal(r.ok, false);
  assert.ok(r.uncovered.includes("V8"));
  assert.ok(!r.covered.includes("V8"));
  const unknown = r.refusals.filter((x) => x.code === "QA_GATE_UNKNOWN");
  assert.equal(unknown.length, 1);
  assert.equal(unknown[0]!.subject, "cells.0");
  assert.equal(unknown[0]!.detail, `row V8 names gate ${padded}, which is not in the supplied gate registry`);
  assert.ok(!r.refusals.some((x) => x.code === "QA_GATE_UNNAMED"));
});

test("a registered gate name covers its row and a blank gate name still refuses QA_GATE_UNNAMED", () => {
  const covered = judgeQaMatrix([{ row: "V8", disposition: { kind: "real-infra-gate", gateName: registeredGate } }], inventory);
  assert.ok(covered.covered.includes("V8"));
  assert.ok(!covered.refusals.some((x) => x.code === "QA_GATE_UNKNOWN" || x.code === "QA_GATE_UNNAMED"));
  const blank = judgeQaMatrix([{ row: "V8", disposition: { kind: "real-infra-gate", gateName: "  " } }], inventory);
  assert.ok(blank.refusals.some((x) => x.code === "QA_GATE_UNNAMED"));
  assert.ok(!blank.refusals.some((x) => x.code === "QA_GATE_UNKNOWN"));
  assert.ok(blank.uncovered.includes("V8"));
});

test("an empty or absent registry fails closed: no gate cell covers a row", () => {
  const empty = judgeQaMatrix(MATRIX, { knownFiles: inventory.knownFiles, knownGates: [] });
  assert.equal(empty.ok, false);
  assert.equal(empty.refusals.filter((x) => x.code === "QA_GATE_UNKNOWN").length, 2);
  const absent = judgeQaMatrix(MATRIX, { knownFiles: inventory.knownFiles } as unknown as Parameters<typeof judgeQaMatrix>[1]);
  assert.equal(absent.ok, false);
  assert.equal(absent.refusals.filter((x) => x.code === "QA_GATE_UNKNOWN").length, 2);
});

test("the registry file is real data: schema, unique names, requirement ids, and evidence that exists or says pending", () => {
  assert.equal(gateRegistry.schema, "mw.qa-real-infra-gates.v0");
  assert.ok(gateRegistry.gates.length >= 2);
  const names = gateRegistry.gates.map((g) => g.name);
  assert.equal(new Set(names).size, names.length);
  for (const gate of gateRegistry.gates) {
    assert.ok(gate.name.trim() !== "");
    assert.match(gate.requirement, /^APO-\d{3}$/);
    assert.ok(gate.evidence === "pending" || existsSync(path.join(repoRoot, gate.evidence)), `${gate.name}: evidence ${gate.evidence} is neither pending nor an existing path`);
  }
});

test("every real-infrastructure gate the living matrix names is in the registry file", () => {
  const used = MATRIX.flatMap((c) => (c.disposition.kind === "real-infra-gate" ? [c.disposition.gateName] : []));
  assert.ok(used.length >= 2);
  for (const name of used) assert.ok(inventory.knownGates.includes(name), `${name} is not registered`);
});
