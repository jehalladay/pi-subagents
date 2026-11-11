import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// GPC-EAT-R004 (MechanicalWorkflows-pfya): the GraphPolicyCLI program documents define 'pure GP call' once, in the
// overview's Authority and boundary section, and name one identical scored node-kind list in both documents.
// Authority: this file runs in the Forge gate's test step (scripts/*.test.ts), not in the docs step.
const root = resolve(import.meta.dirname, "..");
const readmePath = "docs/programs/graph-policy-coordination-2026-10-18/README.md";
const overviewPath = "docs/programs/graph-policy-coordination-2026-10-18.md";
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const lines = (text: string) => text.split("\n");

const NODE_KIND_LIST = /\b[a-z]+(?:\/[a-z]+){2,}\b/;

function authoritySection(overview: string): string {
  const all = lines(overview);
  const start = all.findIndex(line => line.trim() === "## Authority and boundary");
  if (start < 0) return "";
  const rest = all.slice(start + 1);
  const end = rest.findIndex(line => line.startsWith("## "));
  return (end < 0 ? rest : rest.slice(0, end)).join("\n");
}

function pureSentence(overview: string): string {
  return authoritySection(overview).split(/(?<=\.)\s+/).find(sentence => sentence.startsWith("Here *pure* means")) ?? "";
}

function scoredNodeKinds(line: string): string {
  const anchor = line.indexOf("scoring");
  if (anchor < 0) return "";
  const after = line.slice(anchor + "scoring".length);
  return after.match(NODE_KIND_LIST)?.[0] ?? "";
}

// The README Acceptance paragraph restates the pure GP call; locate it by its anchor phrase, never by line index.
function pureCallRestatement(readme: string): string {
  const anchor = "pure GP call (as defined in the Authority section";
  const start = readme.indexOf(anchor);
  if (start < 0) return "";
  const end = readme.indexOf(")", start);
  return end < 0 ? "" : readme.slice(start, end + 1);
}

function scoredLists(text: string): string[] {
  return lines(text).map(scoredNodeKinds).filter(kinds => kinds !== "");
}

function violations(readme: string, overview: string): string[] {
  const found: string[] = [];
  const sentence = pureSentence(overview);
  for (const [name, pattern] of [["GraphDataIR", /GraphDataIR/], ["hash", /hash/], ["budget", /budget/], ["Policy.propose", /Policy\.propose/], ["source_host", /reading or writing no source host/]] as const) {
    if (!pattern.test(sentence)) found.push(`PURE_DEFINITION_MISSING_${name}`);
  }
  const restatement = pureCallRestatement(readme);
  const restatementAgrees = /issued by the host adapter outside `Policy\.propose`/.test(restatement) && /admits no process/.test(restatement);
  if (!restatementAgrees) found.push("README_PURE_CALL_RESTATEMENT_DIVERGES");
  const readmeLists = scoredLists(readme);
  const overviewLists = scoredLists(overview);
  if (readmeLists.length === 0 || overviewLists.length === 0) found.push("SCORED_NODE_KIND_LIST_MISSING");
  else if (readmeLists.length > 1 || overviewLists.length > 1) found.push("SCORED_NODE_KIND_LIST_NOT_UNIQUE");
  else if (readmeLists[0] !== overviewLists[0]) found.push("SCORED_NODE_KIND_LISTS_DIFFER");
  return found;
}

test("GPC-EAT-R004: the overview Authority section defines 'pure' with GraphDataIR, hash, budget and Policy.propose", () => {
  const sentence = pureSentence(read(overviewPath));
  assert.match(sentence, /^Here \*pure\* means/);
  assert.match(sentence, /GraphDataIR/);
  assert.match(sentence, /hash/);
  assert.match(sentence, /budget/);
  assert.match(sentence, /Policy\.propose/);
});

test("GPC-EAT-R004: the README and the overview carry one identical scored node-kind list", () => {
  const readmeKinds = scoredLists(read(readmePath));
  const overviewKinds = scoredLists(read(overviewPath));
  assert.deepEqual(readmeKinds, ["agent/task/resource/artifact/capability"]);
  assert.deepEqual(overviewKinds, readmeKinds);
  assert.deepEqual(violations(read(readmePath), read(overviewPath)), []);
});

test("GPC-EAT-R004 control: the pre-remediation overview has no definition and a shorter node-kind list", () => {
  const old = "# T\n\n## Authority and boundary\nMechanicalWorkflows owns pure coordination. GraphPolicyCLI is an external optional pure adapter for scoring observed agent/task/resource/capability graphs. It neither schedules work.\n\n## Next\nx\n";
  assert.equal(pureSentence(old), "");
  assert.equal(scoredNodeKinds(old.split("\n")[3] ?? ""), "agent/task/resource/capability");
});

test("GPC-EAT-R004 control: each clause fails independently when only it is removed or altered", () => {
  const readme = read(readmePath);
  const overview = read(overviewPath);
  assert.deepEqual(violations(readme, overview.replace("(GraphDataIR, program/checkpoint hash, budget)", "(program/checkpoint hash, budget)")), ["PURE_DEFINITION_MISSING_GraphDataIR"]);
  assert.deepEqual(violations(readme, overview.replace("program/checkpoint hash, budget", "program/checkpoint, budget")), ["PURE_DEFINITION_MISSING_hash"]);
  assert.deepEqual(violations(readme, overview.replace("hash, budget) only", "hash) only")), ["PURE_DEFINITION_MISSING_budget"]);
  assert.deepEqual(violations(readme, overview.replace("invoked by the host adapter outside `Policy.propose`", "invoked by the host adapter")), ["PURE_DEFINITION_MISSING_Policy.propose"]);
  assert.deepEqual(violations(readme.replace("agent/task/resource/artifact/capability observations", "agent/task/resource/capability observations"), overview), ["SCORED_NODE_KIND_LISTS_DIFFER"]);
  assert.deepEqual(violations(readme, overview.replace("scoring observed agent/task/resource/artifact/capability graphs", "scoring observed graphs")), ["SCORED_NODE_KIND_LIST_MISSING"]);
  assert.deepEqual(violations(readme, overview.replace("Here *pure* means", "Pure means")), ["PURE_DEFINITION_MISSING_GraphDataIR", "PURE_DEFINITION_MISSING_hash", "PURE_DEFINITION_MISSING_budget", "PURE_DEFINITION_MISSING_Policy.propose", "PURE_DEFINITION_MISSING_source_host"]);
});

test("GPC-EAT-R004 law: the pure sentence names no read or write of any source host", () => {
  assert.match(pureSentence(read(overviewPath)), /reading or writing no source host/);
  const overview = read(overviewPath).replace("reading or writing no source host", "reading and writing any source host");
  assert.deepEqual(violations(read(readmePath), overview), ["PURE_DEFINITION_MISSING_source_host"]);
});

test("GPC-EAT-R004 law: the README Acceptance restatement of the pure GP call agrees with the overview definition", () => {
  const readme = read(readmePath);
  const overview = read(overviewPath);
  assert.deepEqual(violations(readme, overview), []);
  const diverged = readme.replace("issued by the host adapter outside `Policy.propose`; the policy contract admits no process", "issued from inside `Policy.propose`; the policy contract may spawn processes");
  assert.notEqual(diverged, readme);
  assert.deepEqual(violations(diverged, overview), ["README_PURE_CALL_RESTATEMENT_DIVERGES"]);
});

test("GPC-EAT-R004 law: each document names exactly one scored node-kind list across all its lines", () => {
  assert.equal(scoredLists(read(readmePath)).length, 1);
  assert.equal(scoredLists(read(overviewPath)).length, 1);
  const overview = read(overviewPath).replace("No existing behavioral guarantees", "The scoring adapter covers only agent/task/capability graphs. No existing behavioral guarantees");
  assert.deepEqual(violations(read(readmePath), overview), ["SCORED_NODE_KIND_LIST_NOT_UNIQUE"]);
});

test("GPC-EAT-R004 law: the scored-list helper finds no list when the word scoring is absent", () => {
  assert.equal(scoredNodeKinds("typed graph-function storage over agent/task/resource/capability"), "");
  const readme = read(readmePath).replace("typed graph-function scoring over", "typed graph-function storage over");
  assert.notEqual(readme, read(readmePath));
  assert.deepEqual(violations(readme, read(overviewPath)), ["SCORED_NODE_KIND_LIST_MISSING"]);
});
