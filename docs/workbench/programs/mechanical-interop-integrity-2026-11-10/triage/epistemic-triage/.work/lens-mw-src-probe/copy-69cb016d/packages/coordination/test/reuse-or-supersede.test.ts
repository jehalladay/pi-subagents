import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import {
  D1_DECISION_SUBJECTS,
  D1_DISPOSITIONS,
  judgeD1Coverage,
  parseD1Disposition,
  recordD1Decision,
  type D1DecisionInput,
  type D1DecisionRecord,
} from "../dist/index.js";

const reuseInput: D1DecisionInput = {
  subject: "policy-graph-manifest",
  disposition: "reuse",
  rationale: "APO-003 manifest validation already carries ports, identity and cycle rejection; D1 consumes it unchanged.",
  readPaths: ["packages/coordination/src/policy-graph.ts"],
  namedGaps: [],
};

const supersedeInput: D1DecisionInput = {
  subject: "composition-tree-compiler",
  disposition: "supersede",
  rationale: "treeConfiguration compiles static trees; D1 graphs need versioned manifests, so a successor replaces it for D1 use.",
  readPaths: ["packages/coordination/src/evaluation.ts"],
  namedGaps: ["no versioned manifest", "no port discipline"],
  successor: { module: "packages/coordination/src/policy-graph.ts", members: ["compilePolicyGraph"] },
};

test("the two pinned D1 surfaces exist in this repository at their pinned paths", () => {
  assert.equal(D1_DECISION_SUBJECTS.length, 2);
  for (const subject of D1_DECISION_SUBJECTS) {
    assert.ok(existsSync(new URL(`../../../${subject.sourcePath}`, import.meta.url)), `${subject.sourcePath} exists`);
  }
  assert.ok(Object.isFrozen(D1_DECISION_SUBJECTS));
});

test("a witnessed reuse decision records frozen with the pinned subject", () => {
  const out = recordD1Decision(reuseInput);
  assert.equal(out.ok, true);
  assert.equal(out.refusals.length, 0);
  const record = out.record as D1DecisionRecord;
  assert.equal(record.schema, "mw.d1-decision.v0");
  assert.equal(record.subject, "policy-graph-manifest");
  assert.equal(record.disposition, "reuse");
  assert.ok(Object.isFrozen(out) && Object.isFrozen(record) && Object.isFrozen(record.readPaths));
});

test("a supersession records only with a named successor, and extend admits named gaps", () => {
  const out = recordD1Decision(supersedeInput);
  assert.equal(out.ok, true);
  assert.equal(out.record?.successor?.module, "packages/coordination/src/policy-graph.ts");
  const { successor: _dropped, ...withoutSuccessor } = supersedeInput;
  void _dropped;
  const extend = recordD1Decision({ ...withoutSuccessor, disposition: "extend" });
  assert.equal(extend.ok, true);
  const bare = recordD1Decision(withoutSuccessor);
  assert.equal(bare.ok, false);
  assert.ok(bare.refusals.some((r) => r.code === "D1_SUPERSEDE_WITHOUT_SUCCESSOR"));
  const blankModule = recordD1Decision({ ...supersedeInput, successor: { module: "  ", members: ["x"] } });
  assert.ok(blankModule.refusals.some((r) => r.code === "D1_SUPERSEDE_WITHOUT_SUCCESSOR"));
});

test("negative: an unpinned subject, an unknown disposition and a blank rationale refuse", () => {
  const unknownSubject = recordD1Decision({ ...reuseInput, subject: "resolver" });
  assert.equal(unknownSubject.ok, false);
  assert.ok(unknownSubject.refusals.some((r) => r.code === "D1_SUBJECT_UNKNOWN"));
  const unknownDisposition = recordD1Decision({ ...reuseInput, disposition: "rewrite" });
  assert.ok(unknownDisposition.refusals.some((r) => r.code === "D1_DISPOSITION_UNKNOWN"));
  const blank = recordD1Decision({ ...reuseInput, rationale: "   " });
  assert.ok(blank.refusals.some((r) => r.code === "D1_RATIONALE_MISSING"));
  assert.equal(parseD1Disposition("rewrite"), undefined);
  for (const d of D1_DISPOSITIONS) assert.equal(parseD1Disposition(d), d);
});

test("negative: a decision that never read the surface it rules on, or a reuse carrying gaps, refuses", () => {
  const unread = recordD1Decision({ ...reuseInput, readPaths: ["docs/10-current-state-and-gaps.md"] });
  assert.equal(unread.ok, false);
  assert.ok(unread.refusals.some((r) => r.code === "D1_EVIDENCE_MISSING"));
  const gappyReuse = recordD1Decision({ ...reuseInput, namedGaps: ["missing ports"] });
  assert.equal(gappyReuse.ok, false);
  assert.ok(gappyReuse.refusals.some((r) => r.code === "D1_REUSE_WITH_GAPS"));
});

test("coverage: exactly one decision per pinned surface; none and two both refuse", () => {
  const reuse = recordD1Decision(reuseInput).record as D1DecisionRecord;
  const supersede = recordD1Decision(supersedeInput).record as D1DecisionRecord;
  const complete = judgeD1Coverage([reuse, supersede]);
  assert.equal(complete.complete, true);
  const undecided = judgeD1Coverage([reuse]);
  assert.equal(undecided.complete, false);
  assert.ok(undecided.refusals.some((r) => r.code === "D1_SUBJECT_UNDECIDED" && r.detail.includes("composition-tree-compiler")));
  const doubled = judgeD1Coverage([reuse, reuse, supersede]);
  assert.ok(doubled.refusals.some((r) => r.code === "D1_SUBJECT_DOUBLE_DECIDED"));
});
