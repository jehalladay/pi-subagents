import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// GPC-EAT-R002 (MechanicalWorkflows-hb9n): the GraphPolicyCLI program documents must keep `reconcile` an
// accept/reject-only authority. The token "substitutes" would promise a substitution verdict that does not exist.
const root = resolve(import.meta.dirname, "..");
const documents = [
  "docs/programs/graph-policy-coordination-2026-10-18.md",
  "docs/programs/graph-policy-coordination-2026-10-18/README.md",
] as const;

function substitutionClaims(text: string): string[] {
  return text.split("\n").filter(line => /\bsubstitutes\b/i.test(line));
}

for (const relative of documents) {
  const text = readFileSync(resolve(root, relative), "utf8");
  test(`GPC-EAT-R002: ${relative} never says reconcile substitutes`, () => {
    assert.deepEqual(substitutionClaims(text), []);
    assert.doesNotMatch(text, /\bsubstitutes\b/i);
  });
}

test("GPC-EAT-R002: the program document states reconcile accepts or rejects", () => {
  const text = readFileSync(resolve(root, documents[0]), "utf8");
  assert.match(text, /reconcile independently accepts\/rejects/);
});

test("GPC-EAT-R002 control: the refuted pre-remediation wording is flagged on its own line only", () => {
  const refuted = "A.\nMechanicalWorkflows reconcile can independently accept, reject, or substitutes a candidate Intent.\nB.";
  assert.deepEqual(substitutionClaims(refuted), ["MechanicalWorkflows reconcile can independently accept, reject, or substitutes a candidate Intent."]);
  assert.deepEqual(substitutionClaims("reconcile independently accepts/rejects"), []);
});
