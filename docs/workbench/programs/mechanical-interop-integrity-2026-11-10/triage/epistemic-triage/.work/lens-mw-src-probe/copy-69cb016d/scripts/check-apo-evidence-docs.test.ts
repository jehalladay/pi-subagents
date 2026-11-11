import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// APO-EAT-R014 (MechanicalWorkflows-uhm9): the Evidence paragraph of the APO resource/evidence
// contract must back its "no installed production API" claim about ReactiveQuerySDK with a
// pinned revision and the checked manifest paths, instead of resting on "unverified at origin".
const docPath = resolve(import.meta.dirname, "..", "docs/programs/adaptive-policy-organizations-2026-10-18/09-resource-evidence-control.md");

function evidenceSentence(text: string): string {
  const line = text.split("\n").find(row => row.startsWith("ReactiveQuerySDK")) ?? "";
  return line.split(". ")[0] ?? "";
}

function evidenceViolations(text: string): string[] {
  const violations: string[] = [];
  const sentence = evidenceSentence(text);
  if (sentence === "") return ["EVIDENCE_SENTENCE_ABSENT"];
  if (!/\b[0-9a-f]{40}\b/.test(sentence)) violations.push("QUERYSDK_REVISION_UNPINNED");
  if (!/package\.json/.test(sentence) || !/Cargo\.toml/.test(sentence)) violations.push("QUERYSDK_CHECKED_PATH_ABSENT");
  if (/unverified at origin/.test(sentence)) violations.push("QUERYSDK_STILL_UNVERIFIED");
  return violations;
}

const doc = readFileSync(docPath, "utf8");

test("APO-EAT-R014: the ReactiveQuerySDK evidence sentence pins a 40-hex revision and names the checked manifest paths", () => {
  assert.deepEqual(evidenceViolations(doc), []);
  assert.match(evidenceSentence(doc), /1b4ac5ba9bf1a34bd2f80a33844ab9ec1e8bd5a7/);
});

test("APO-EAT-R014: the sentence keeps its no-installed-production-API claim", () => {
  assert.match(evidenceSentence(doc), /does not ship an installed production API yet/);
});

test("APO-EAT-R014 control: the pre-remediation sentence fails all three clauses' unpinned forms", () => {
  const old = "ReactiveQuerySDK's proposed K3 source completeness and retraction semantics are respected by optional integration; QuerySDK itself does not ship an installed production API yet (as of 2026-10-18 per its docs; unverified at origin from this host). Next.\n";
  assert.deepEqual(evidenceViolations(old), ["QUERYSDK_REVISION_UNPINNED", "QUERYSDK_CHECKED_PATH_ABSENT", "QUERYSDK_STILL_UNVERIFIED"]);
});

test("APO-EAT-R014 control: each clause fails independently when only it is removed", () => {
  assert.deepEqual(evidenceViolations(doc.replace("1b4ac5ba9bf1a34bd2f80a33844ab9ec1e8bd5a7", "1b4ac5ba")), ["QUERYSDK_REVISION_UNPINNED"]);
  assert.deepEqual(evidenceViolations(doc.replace("Cargo.toml", "manifest")), ["QUERYSDK_CHECKED_PATH_ABSENT"]);
  assert.deepEqual(evidenceViolations(doc.replace("optional integration;", "optional integration (unverified at origin);")), ["QUERYSDK_STILL_UNVERIFIED"]);
  assert.deepEqual(evidenceViolations("# no evidence\n"), ["EVIDENCE_SENTENCE_ABSENT"]);
});
