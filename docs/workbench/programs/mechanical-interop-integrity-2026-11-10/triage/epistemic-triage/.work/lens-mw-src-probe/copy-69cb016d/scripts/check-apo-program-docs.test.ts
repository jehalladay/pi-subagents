import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// APO-EAT-R003 (MechanicalWorkflows-5a4i.1): the APO source map cites MechanicalWorkflows sources at the
// program's pinned commit (never a moving /blob/main/ link), lists packages/coordination/src/evaluation.ts,
// and the training chapter states that the elastic-lanes runner exports no episodes at that pin.
const dir = resolve(import.meta.dirname, "..", "docs/programs/adaptive-policy-organizations-2026-10-18");
const PIN = "19ca8d481ab48c69fdf4f457ded66fe90592dd2f";
const MW_BLOB = "https://github.com/jehalladay/MechanicalWorkflows/blob/";

function mwLinks(text: string): string[] {
  return text.split("\n").flatMap(row => row.match(/https:\/\/github\.com\/jehalladay\/MechanicalWorkflows\/blob\/\S+/g) ?? []);
}

function mapViolations(text: string): string[] {
  const violations: string[] = [];
  const links = mwLinks(text);
  if (links.some(link => link.startsWith(`${MW_BLOB}main/`))) violations.push("MW_SOURCE_LINK_UNPINNED");
  if (links.some(link => !link.startsWith(`${MW_BLOB}${PIN}/`))) violations.push("MW_SOURCE_LINK_OFF_PIN");
  if (!links.includes(`${MW_BLOB}${PIN}/packages/coordination/src/evaluation.ts`)) violations.push("EVALUATION_TS_NOT_LISTED");
  return violations;
}

function trainingViolations(text: string): string[] {
  const row = text.split("\n").find(line => line.includes("mw.landing-queue.elastic.fixture.v1")) ?? "";
  if (row === "") return ["ELASTIC_STATEMENT_ABSENT"];
  return /has no toEpisode\/training-export path/.test(row) && /19ca8d4/.test(text) ? [] : ["ELASTIC_NOT_EPISODE_EXPORTED_UNSTATED"];
}

const map = readFileSync(resolve(dir, "15-source-and-research-map.md"), "utf8");
const training = readFileSync(resolve(dir, "10-training-experiments.md"), "utf8");

test("APO-EAT-R003: every MechanicalWorkflows source cite in the map sits at the pinned 40-hex commit and evaluation.ts is listed", () => {
  assert.deepEqual(mapViolations(map), []);
  assert.ok(mwLinks(map).length >= 7, "at least the six prior cites plus evaluation.ts");
});

test("APO-EAT-R003: the training chapter states the elastic-lanes runner has no episode-export path at the pin", () => {
  assert.deepEqual(trainingViolations(training), []);
});

test("APO-EAT-R003 control: each clause fails independently when only it is broken", () => {
  assert.deepEqual(mapViolations(map.replace(`blob/${PIN}/packages/coordination/src/contracts.ts`, "blob/main/packages/coordination/src/contracts.ts")), ["MW_SOURCE_LINK_UNPINNED", "MW_SOURCE_LINK_OFF_PIN"]);
  assert.deepEqual(mapViolations(map.replace(`blob/${PIN}/packages/coordination/src/resolver.ts`, "blob/19ca8d481ab4/packages/coordination/src/resolver.ts")), ["MW_SOURCE_LINK_OFF_PIN"]);
  assert.deepEqual(mapViolations(map.replace("src/evaluation.ts", "src/evaluation-removed.ts")), ["EVALUATION_TS_NOT_LISTED"]);
  assert.deepEqual(mapViolations("# empty\n"), ["EVALUATION_TS_NOT_LISTED"]);
  assert.deepEqual(trainingViolations(training.replace("has no toEpisode/training-export path", "exports episodes")), ["ELASTIC_NOT_EPISODE_EXPORTED_UNSTATED"]);
  assert.deepEqual(trainingViolations("# none\n"), ["ELASTIC_STATEMENT_ABSENT"]);
});
