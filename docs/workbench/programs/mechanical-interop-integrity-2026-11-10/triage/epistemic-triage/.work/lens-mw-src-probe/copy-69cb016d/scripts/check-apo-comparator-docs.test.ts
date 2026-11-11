import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// APO-EAT-R013 (MechanicalWorkflows-78dr): the Baselines paragraph of 10-training-experiments.md
// is the single comparator list; 14 and 02 reference it instead of restating it; the delivery
// plan (12) states that D1, D2 and D3 depend on D0 and names the in-repo owner of the
// D4/APO-007/APO-012 oracle.
const dir = resolve(import.meta.dirname, "..", "docs/programs/adaptive-policy-organizations-2026-10-18");
const read = (name: string): string => readFileSync(resolve(dir, name), "utf8");

const COMPARATOR_MARKER = "restack-first";
const OWNER_PATTERN = /In-repo oracle owner: packages\/coordination/;
const DEPENDENCY_PATTERN = /D1, D2 and D3 depend on D0/;

function deliveryNote(text: string): string {
  return text.split("\n").find(line => line.startsWith("D1/D2 overlap")) ?? "";
}

function comparatorViolations(files: Record<string, string>): string[] {
  const violations: string[] = [];
  const holders = Object.keys(files).filter(name => (files[name] ?? "").includes(COMPARATOR_MARKER));
  if (holders.length !== 1 || holders[0] !== "10-training-experiments.md") violations.push("COMPARATOR_LIST_NOT_SINGLE");
  if (!/Compare the canonical baseline list of 10-training-experiments\.md/.test(files["02-atomic-requirements.md"] ?? "")) violations.push("APO019_NOT_REFERENCING_L16");
  if (!/canonical baseline list of 10-training-experiments\.md/.test(files["14-worked-example.md"] ?? "")) violations.push("WORKED_EXAMPLE_NOT_REFERENCING_L16");
  return violations;
}

function deliveryViolations(text: string): string[] {
  const note = deliveryNote(text);
  const violations: string[] = [];
  if (!DEPENDENCY_PATTERN.test(note)) violations.push("D0_DEPENDENCY_UNSTATED");
  if (!OWNER_PATTERN.test(note)) violations.push("ORACLE_OWNER_UNNAMED");
  return violations;
}

const files: Record<string, string> = Object.fromEntries(readdirSync(dir).filter(name => name.endsWith(".md")).map(name => [name, read(name)]));
const doc = (name: string): string => {
  const text = files[name];
  if (text === undefined) throw new Error(`missing program document ${name}`);
  return text;
};

test("APO-EAT-R013: restack-first appears only in the 10 Baselines paragraph; 02 and 14 reference it", () => {
  assert.deepEqual(comparatorViolations(files), []);
});

test("APO-EAT-R013: the delivery plan states the D0 dependency and names the in-repo oracle owner", () => {
  assert.deepEqual(deliveryViolations(doc("12-delivery-stages.md")), []);
  assert.match(deliveryNote(doc("12-delivery-stages.md")), /D4\/APO-007\/APO-012 gating oracle/);
});

test("APO-EAT-R013 control: a second comparator list is rejected", () => {
  assert.deepEqual(comparatorViolations({ ...files, "14-worked-example.md": doc("14-worked-example.md") + "\nFixed FIFO, restack-first.\n" }), ["COMPARATOR_LIST_NOT_SINGLE"]);
});

test("APO-EAT-R013 control: each reference fails independently when only it is removed", () => {
  const stripped = doc("02-atomic-requirements.md").replace("Compare the canonical baseline list of 10-training-experiments.md", "Compare the baselines");
  assert.deepEqual(comparatorViolations({ ...files, "02-atomic-requirements.md": stripped }), ["APO019_NOT_REFERENCING_L16"]);
  const worked = doc("14-worked-example.md").replace("canonical baseline list of 10-training-experiments.md", "baselines");
  assert.deepEqual(comparatorViolations({ ...files, "14-worked-example.md": worked }), ["WORKED_EXAMPLE_NOT_REFERENCING_L16"]);
});

test("APO-EAT-R013 control: each delivery clause fails independently when only it is removed", () => {
  const delivery = doc("12-delivery-stages.md");
  assert.deepEqual(deliveryViolations(delivery.replace("D1, D2 and D3 depend on D0", "D1 depends on D0")), ["D0_DEPENDENCY_UNSTATED"]);
  assert.deepEqual(deliveryViolations(delivery.replace("In-repo oracle owner: packages/coordination", "Oracle owner: TBD")), ["ORACLE_OWNER_UNNAMED"]);
});
