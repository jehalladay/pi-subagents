import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// CACWC-EAT-R008 (MechanicalWorkflows-3u1y): CAC workflow composition P4 (learned-policy selection) stays a
// study proposal. The speed claim reads as a hypothesis, and P4 cannot start before a measurement protocol names
// the baseline, workload and seeds, speed metric and acceptance threshold. Once a protocol report exists it must
// carry those fields and label every episode mode.
const root = resolve(import.meta.dirname, "..");
const docPath = "docs/programs/cac-workflow-composition-2026-10-18/01-composition-contracts.md";
const performanceDir = resolve(root, "qa/performance");
const lines = (text: string) => text.split("\n");
const doc = () => lines(readFileSync(resolve(root, docPath), "utf8"));

const REQUIRED_PROTOCOL_FIELDS: ReadonlyArray<readonly [string, RegExp]> = [
  ["baseline", /baseline\b[^\n]*\b[\w.-]+@[\w.-]+/i],
  ["seeds", /\bseeds?\b/i],
  ["metric", /\bmetric\b/i],
  ["threshold", /\bthreshold\b/i],
  ["basis", /mw\.episode\.v1|mw\.training-export\.v1/],
];
const MODE_LABEL = /\b(fixture|replay|live)\b/i;
const LIVE_FROM_NON_LIVE = /live (claim|result|speed)[^\n]*(derived|inferred) from (fixture|replay)/i;

/** Violations of a learned-selection measurement report; an empty list means the report is admissible. */
function protocolViolations(text: string): string[] {
  const found: string[] = [];
  for (const [name, pattern] of REQUIRED_PROTOCOL_FIELDS) if (!pattern.test(text)) found.push(`missing:${name}`);
  if (!MODE_LABEL.test(text)) found.push("missing:episode-mode-label");
  if (LIVE_FROM_NON_LIVE.test(text)) found.push("live-claim-from-fixture-or-replay");
  return found;
}

function learnedSelectionReports(): string[] {
  if (!existsSync(performanceDir)) return [];
  return readdirSync(performanceDir).filter((name) => /learned-selection.*\.md$/.test(name));
}

test("01 line 15 words the learned-policy speed claim as an unmeasured hypothesis", () => {
  const line = doc()[14] ?? "";
  assert.match(line, /may improve speed/);
  assert.match(line, /hypothesis|unmeasured/);
});

test("01 line 21 gates P4 on a measurement protocol naming baseline, workload and seeds, metric and threshold", () => {
  const line = doc()[20] ?? "";
  const p4 = line.slice(line.indexOf("P4"));
  assert.ok(line.includes("P4"), "line 21 names P4");
  assert.match(p4, /P4[^]*(does not start|MUST NOT start|not start)[^]*measurement protocol/);
  for (const term of [/baseline selection policy/, /id@revision/, /workload/, /seeds/, /speed metric/, /acceptance threshold/]) {
    assert.match(p4, term, String(term));
  }
});

test("every committed learned-selection report satisfies the protocol field and mode-label rules", () => {
  for (const name of learnedSelectionReports()) {
    const text = readFileSync(resolve(performanceDir, name), "utf8");
    assert.deepEqual(protocolViolations(text), [], name);
  }
});

test("negative control: while no report exists the hypothesis wording is the only speed claim", () => {
  if (learnedSelectionReports().length === 0) assert.match(doc()[14] ?? "", /hypothesis|unmeasured/);
});

test("negative control: the report checker flags each dropped field and a live claim from fixtures", () => {
  const good = "baseline: sel-fixed@rev1\nseeds: 1,2,3\nmetric: wall-clock speed\nthreshold: 10 percent\nbasis: mw.episode.v1\nmode: fixture\n";
  assert.deepEqual(protocolViolations(good), []);
  assert.deepEqual(protocolViolations(good.replace("seeds: 1,2,3\n", "")), ["missing:seeds"]);
  assert.deepEqual(protocolViolations(good.replace("threshold: 10 percent\n", "")), ["missing:threshold"]);
  assert.deepEqual(protocolViolations(good.replace("metric: wall-clock speed\n", "")), ["missing:metric"]);
  assert.deepEqual(protocolViolations(good.replace("baseline: sel-fixed@rev1\n", "")), ["missing:baseline"]);
  assert.deepEqual(protocolViolations(good.replace("basis: mw.episode.v1\n", "")), ["missing:basis"]);
  assert.deepEqual(protocolViolations(good.replace("mode: fixture\n", "")), ["missing:episode-mode-label"]);
  assert.deepEqual(protocolViolations(`${good}live speed result derived from fixture episodes\n`), ["live-claim-from-fixture-or-replay"]);
});
