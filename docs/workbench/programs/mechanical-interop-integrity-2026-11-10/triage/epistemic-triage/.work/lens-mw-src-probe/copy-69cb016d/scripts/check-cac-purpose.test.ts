import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

// CACWC-EAT-R010 (MechanicalWorkflows-lrc3): the CAC-WC program Purpose paragraph
// (README L7) must word the benefit as "may allow ... carry source-native evidence
// references", scope soundness to the finite sequential fragment (hand-derived CAC
// 0.1-0.3 drafts, not Lean-checked), and no program file may assert global,
// liveness or concurrency guarantees from the finite sequential model.
const programDir = resolve(import.meta.dirname, "..", "docs/programs/cac-workflow-composition-2026-10-18");

function purposeParagraph(text: string): string {
  const lines = text.split("\n");
  const at = lines.findIndex(line => line.trim() === "## Purpose");
  if (at < 0) return "";
  return lines.slice(at + 1).find(line => line.trim() !== "") ?? "";
}

function purposeViolations(text: string): string[] {
  const violations: string[] = [];
  const purpose = purposeParagraph(text);
  if (purpose === "") violations.push("PURPOSE_MISSING");
  if (purpose.includes("sound authority/effect assumptions without")) violations.push("PURPOSE_UNQUALIFIED_SOUNDNESS");
  if (!purpose.includes("finite sequential")) violations.push("PURPOSE_NOT_SCOPED_TO_FINITE_SEQUENTIAL");
  if (!purpose.includes("may allow")) violations.push("PURPOSE_BENEFIT_NOT_HEDGED");
  if (!purpose.includes("not Lean-checked")) violations.push("PURPOSE_IMPLIES_MACHINE_CHECKED_PROOF");
  return violations;
}

const globalClaim = /(proves|guarantees) (global|liveness|concurrency)/i;

function programFiles(): string[] {
  return readdirSync(programDir).filter(name => name.endsWith(".md")).sort();
}

function overclaimViolations(files: Record<string, string>): string[] {
  return Object.entries(files)
    .filter(([, body]) => globalClaim.test(body))
    .map(([name]) => `PROGRAM_OVERCLAIM:${name}`);
}

const readme = readFileSync(join(programDir, "README.md"), "utf8");

test("CACWC-EAT-R010: README L7 is the Purpose paragraph", () => {
  assert.equal(readme.split("\n")[6], purposeParagraph(readme));
});

test("CACWC-EAT-R010: the Purpose scopes soundness to the finite sequential fragment and hedges the benefit", () => {
  assert.deepEqual(purposeViolations(readme), []);
  const purpose = purposeParagraph(readme);
  assert.doesNotMatch(purpose, /sound authority\/effect assumptions without/);
  assert.match(purpose, /finite sequential/);
  assert.match(purpose, /may allow/);
  assert.match(purpose, /hand-derived/);
});

test("CACWC-EAT-R010: no program file asserts global, liveness or concurrency guarantees", () => {
  const files = Object.fromEntries(programFiles().map(name => [name, readFileSync(join(programDir, name), "utf8")]));
  assert.ok(Object.keys(files).includes("README.md"), "the scan must cover README.md");
  assert.ok(Object.keys(files).length >= 2, "the scan must cover every program markdown file");
  assert.deepEqual(overclaimViolations(files), []);
});

test("CACWC-EAT-R010 control: the pre-remediation unqualified Purpose is rejected", () => {
  const old = "# T\n\n## Purpose\n\nIntegrate CAC so ordinary workflows carry sound authority/effect assumptions without a new engine.\n";
  assert.deepEqual(purposeViolations(old), [
    "PURPOSE_UNQUALIFIED_SOUNDNESS",
    "PURPOSE_NOT_SCOPED_TO_FINITE_SEQUENTIAL",
    "PURPOSE_BENEFIT_NOT_HEDGED",
    "PURPOSE_IMPLIES_MACHINE_CHECKED_PROOF",
  ]);
  assert.deepEqual(purposeViolations("# T\n\nno purpose heading\n"), [
    "PURPOSE_MISSING",
    "PURPOSE_NOT_SCOPED_TO_FINITE_SEQUENTIAL",
    "PURPOSE_BENEFIT_NOT_HEDGED",
    "PURPOSE_IMPLIES_MACHINE_CHECKED_PROOF",
  ]);
});

test("CACWC-EAT-R010 control: each Purpose clause fails independently when only it is removed", () => {
  assert.deepEqual(purposeViolations(readme.replace("may allow", "allows")), ["PURPOSE_BENEFIT_NOT_HEDGED"]);
  assert.deepEqual(purposeViolations(readme.replace("finite sequential", "sequential")), ["PURPOSE_NOT_SCOPED_TO_FINITE_SEQUENTIAL"]);
  assert.deepEqual(purposeViolations(readme.replace("not Lean-checked", "machine-checked")), ["PURPOSE_IMPLIES_MACHINE_CHECKED_PROOF"]);
  assert.deepEqual(
    purposeViolations(readme.replace("soundness of authority/effect assumptions is", "workflows carry sound authority/effect assumptions without a new engine; soundness is")),
    ["PURPOSE_UNQUALIFIED_SOUNDNESS"],
  );
});

test("CACWC-EAT-R010 control: the overclaim scan flags each forbidden verb and scope, case-insensitively", () => {
  for (const claim of ["The model PROVES global optimality.", "It guarantees liveness.", "This proves concurrency safety."]) {
    assert.deepEqual(overclaimViolations({ "x.md": claim, "ok.md": "finite sequential only" }), ["PROGRAM_OVERCLAIM:x.md"]);
  }
  assert.deepEqual(overclaimViolations({ "ok.md": "does not prove global optimality, liveness or concurrency" }), []);
});
