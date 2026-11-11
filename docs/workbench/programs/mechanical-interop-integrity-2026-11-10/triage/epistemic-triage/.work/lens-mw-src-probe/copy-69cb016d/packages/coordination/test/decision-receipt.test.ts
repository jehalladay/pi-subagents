// MechanicalWorkflows-d804 (GPC-EAT-R006): one versioned, additive per-decision sidecar schema,
// mw.decision-receipt.v1, defined in exactly one place (the schema document) and referenced by
// both GPC program documents; records built from pinned fixture episodes carry the full listed
// key set with every absent value the literal "unknown" (verifier outcome, completeness and
// feedback status are never fabricated); mw.training-export.v1 is untouched.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDecisionReceipts, validateDecisionReceipt, exportEpisodeForTraining } from "../dist/index.js";
import type { DecisionReceipt, Episode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const schemaPath = join(here, "../schema/decision-receipt.v1.schema.json");
const overviewPath = join(here, "../../../docs/programs/graph-policy-coordination-2026-10-18.md");
const readmePath = join(here, "../../../docs/programs/graph-policy-coordination-2026-10-18/README.md");

const episode = JSON.parse(readFileSync(join(fixtureDir, "episode-landing-queue-seed7.json"), "utf8")) as Episode;

const KEYS = ["schema", "version", "decisionId", "gp", "featureProjectionDigest", "actor", "selector", "support", "logProb", "completeness", "actions", "sourceReceipt", "resolverVerdict", "verifierOutcome", "feedback"].sort();

test("a receipt built from the pinned fixture episode carries schema, version 1, exactly the listed keys, and unknown for everything no source reported", () => {
  const receipts = buildDecisionReceipts(episode);
  assert.equal(receipts.length, episode.decisions.length);
  for (const receipt of receipts) {
    assert.equal(receipt.schema, "mw.decision-receipt.v1");
    assert.equal(receipt.version, 1);
    assert.deepEqual(Object.keys(receipt).sort(), KEYS, receipt.decisionId);
    assert.deepEqual(receipt.gp, { graphHash: "unknown", programHash: "unknown", checkpointHash: "unknown", snapshotHash: "unknown" }, "no GP exists; hashes are unknown, never fabricated");
    assert.equal(receipt.featureProjectionDigest, "unknown");
    assert.deepEqual(receipt.selector, { id: "unknown", revision: "unknown" });
    assert.equal(receipt.support, "unknown", "v1 records no pre-sampling support");
    assert.equal(receipt.logProb, "unknown", "this fixture records no logProb; the builder carries the decision's own value, never fabricates");
    assert.equal(receipt.completeness, "unknown", "observation completeness is unrecordable today (C010)");
    assert.equal(receipt.verifierOutcome, "unknown", "no general verifier channel (C023): never fabricated");
    assert.deepEqual(receipt.feedback, { status: "unknown" });
    assert.equal(receipt.actions.executed, "unknown", "no execution channel reports back");
    assert.deepEqual(validateDecisionReceipt(receipt), { ok: true }, receipt.decisionId);
  }
  const first = receipts[0]!;
  const decision = episode.decisions[0]!;
  assert.equal(first.decisionId, `${episode.episodeId}:${decision.step}`);
  assert.deepEqual(first.actor, { id: episode.policy.id, revision: episode.policy.revision });
  assert.deepEqual(first.actions.proposed, decision.proposed);
  assert.deepEqual(first.actions.admitted, decision.eligibility.admitted);
  assert.equal(first.sourceReceipt, episode.verifier.receiptDigest, "the episode-level verifier receipt is the recorded source receipt");
  assert.equal(first.resolverVerdict, `admitted=${decision.eligibility.admitted.length},rejected=${decision.eligibility.rejected.length}`);
});

test("the schema file is the single home of the field list: $id, version const, required == properties == the record's keys, feedback status closed", () => {
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { $id: string; additionalProperties: boolean; required: string[]; properties: Record<string, { const?: unknown; enum?: string[]; properties?: Record<string, { enum?: string[] }>; required?: string[] }> };
  assert.equal(schema.$id, "mw.decision-receipt.v1");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual([...schema.required].sort(), KEYS);
  assert.deepEqual(Object.keys(schema.properties).sort(), KEYS);
  assert.equal(schema.properties.version!.const, 1);
  assert.deepEqual([...(schema.properties.feedback!.properties!.status!.enum ?? [])].sort(), ["final", "pending", "unknown"]);
});

test("both program documents reference the one schema identifier and file, and neither carries an inline sidecar field list", () => {
  const overview = readFileSync(overviewPath, "utf8");
  const readme = readFileSync(readmePath, "utf8");
  for (const [name, text] of [["overview", overview], ["README", readme]] as const) {
    assert.ok(text.includes("mw.decision-receipt.v1"), `${name} names the schema identifier`);
    assert.ok(text.includes("packages/coordination/schema/decision-receipt.v1.schema.json"), `${name} references the schema file`);
    assert.equal(/e\.g\. `mw\.decision-receipt\.v1`, TARGET/.test(text), false, `${name} no longer marks the schema TARGET`);
    assert.equal(text.includes("graph/program/checkpoint/snapshot hashes"), false, `${name} carries no inline field enumeration`);
    assert.equal(text.includes("feature-projection digest, actor"), false, `${name} carries no inline field enumeration`);
  }
});

test("mw.training-export.v1 is untouched: every committed training fixture re-exports to its committed digest and the module never references the receipt", () => {
  const trainingFiles = readdirSync(fixtureDir).filter(name => name.startsWith("training-"));
  assert.ok(trainingFiles.length >= 5);
  for (const name of trainingFiles) {
    const committed = JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as { digest: string };
    const sourceEpisode = JSON.parse(readFileSync(join(fixtureDir, `episode-${name.slice("training-".length)}`), "utf8")) as Episode;
    assert.equal(exportEpisodeForTraining(sourceEpisode).digest, committed.digest, name);
  }
  const trainingSource = readFileSync(join(here, "../src/training-export.ts"), "utf8");
  assert.equal(trainingSource.includes("decision-receipt"), false);
  assert.equal(trainingSource.includes("DecisionReceipt"), false);
});

test("the validator refuses fabricated or malformed members with DECISION_RECEIPT_MALFORMED naming the member", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const bad: [Partial<DecisionReceipt>, RegExp][] = [
    [{ schema: "other.v1" as never }, /schema/],
    [{ feedback: { status: "done" as never } }, /feedback status/],
    [{ logProb: Number.NaN }, /logProb/],
    [{ sourceReceipt: "not-a-digest" }, /sourceReceipt/],
    [{ gp: { ...base.gp, graphHash: "sha1:ffff" } }, /graphHash/],
    [{ actions: { ...base.actions, proposed: [" "] } }, /proposed/],
    [{ support: [] }, /support/],
    [{ support: ["land", " "] }, /support/],
    [{ support: [" "] }, /support/],
    [{ actor: { id: " ", revision: "fixture-1" } }, /actor/],
    [{ version: 2 as never }, /version/],
    [{ gp: { ...base.gp, programHash: "sha1:ffff" } }, /programHash/],
    [{ gp: { ...base.gp, checkpointHash: "sha1:ffff" } }, /checkpointHash/],
    [{ gp: { ...base.gp, snapshotHash: "sha1:ffff" } }, /snapshotHash/],
    [{ sourceReceipt: "sha256:abc" }, /sourceReceipt/],
    [{ actor: { id: "policy-1", revision: " " } }, /actor/],
    [{ selector: { id: "gp-sample", revision: " " } }, /selector revision/],
    [{ actions: { ...base.actions, executed: [" "] } }, /executed/],
    [{ featureProjectionDigest: "sha1:ffff" }, /featureProjectionDigest/],
    [{ decisionId: " " }, /decisionId/],
    [{ selector: { id: " ", revision: "r1" } }, /selector id/],
    [{ actions: { ...base.actions, admitted: [" "] } }, /admitted/],
    [{ completeness: " " }, /completeness/],
    [{ resolverVerdict: " " }, /resolverVerdict/],
    [{ verifierOutcome: " " }, /verifierOutcome/],
    [{ actions: { ...base.actions, executed: ["land", " "] } }, /executed/],
    [{ featureProjectionDigest: "sha256:abc" }, /featureProjectionDigest/],
    [{ actions: { ...base.actions, executed: [" ", "land"] } }, /executed/],
    [{ actions: { ...base.actions, admitted: ["land", " "] } }, /admitted/],
    [{ actions: { ...base.actions, proposed: ["land", " "] } }, /proposed/],
    [{ featureProjectionDigest: `sha256:${"z".repeat(64)}` }, /featureProjectionDigest/],
    [{ gp: { ...base.gp, graphHash: `sha256:${"a".repeat(65)}` } }, /graphHash/],
    // MechanicalWorkflows-ovg6 G1-G3: the digest pattern's start anchor, lowercase alphabet and 64-char lower bound (65 is pinned above).
    [{ gp: { ...base.gp, graphHash: `xsha256:${"a".repeat(64)}` } }, /graphHash/],
    [{ gp: { ...base.gp, graphHash: `sha256:${"A".repeat(64)}` } }, /graphHash/],
    [{ gp: { ...base.gp, graphHash: `sha256:${"a".repeat(63)}` } }, /graphHash/],
    // MechanicalWorkflows-i9op G2: whitespace padding on either side of an otherwise valid digest refuses (the untrimmed value reaches the pattern).
    [{ gp: { ...base.gp, graphHash: ` sha256:${"a".repeat(64)}` } }, /graphHash/],
    [{ gp: { ...base.gp, graphHash: `sha256:${"a".repeat(64)} ` } }, /graphHash/],
    // G3: a valid digest on any non-first or non-last line refuses (no m flag), and a trailing newline refuses (the end anchor holds across a newline).
    [{ gp: { ...base.gp, graphHash: `x\nsha256:${"a".repeat(64)}` } }, /graphHash/],
    [{ gp: { ...base.gp, graphHash: `sha256:${"a".repeat(64)}\n` } }, /graphHash/],
    // G4: logProb must be finite; only NaN was pinned.
    [{ logProb: Number.POSITIVE_INFINITY }, /logProb/],
    [{ logProb: Number.NEGATIVE_INFINITY }, /logProb/],
    // G5-G6: the blank-FIRST id twins for admitted and proposed (executed already has one).
    [{ actions: { ...base.actions, admitted: [" ", "land"] } }, /admitted/],
    [{ actions: { ...base.actions, proposed: [" ", "land"] } }, /proposed/],
    // MechanicalWorkflows-w8vb W1-W2: a blank support id FIRST or BETWEEN two ids (only blank-last and blank-alone were pinned), so a check of the last id or of the ends alone cannot pass.
    [{ support: [" ", "land"] }, /support/],
    [{ support: ["land", " ", "restack"] }, /support/],
    // W3-W4: a tab is blank too (every row above spells blank as a space), in the id list and on a scalar member sharing the nonblank helper.
    [{ support: ["land", "\t"] }, /support/],
    [{ decisionId: "\t" }, /decisionId/],
    // MechanicalWorkflows-4c7w D1-D2: a newline and a no-break space (U+00A0) are blank too, so a nonblank helper that strips only space and tab cannot pass.
    [{ support: ["land", "\n"] }, /support/],
    [{ support: ["land", "\u00a0"] }, /support/],
    // D3: a completeness that is only a tab refuses (the completeness row above spells blank as a space, so a member-local space-only check cannot pass).
    [{ completeness: "\t" }, /completeness/],
    // MechanicalWorkflows-5r8p G8-G10: a tab-only action id is blank in each of the three action lists (the tab rows above cover support and completeness only).
    [{ actions: { ...base.actions, proposed: ["land", "\t"] } }, /proposed/],
    [{ actions: { ...base.actions, admitted: ["land", "\t"] } }, /admitted/],
    [{ actions: { ...base.actions, executed: ["land", "\t"] } }, /executed/],
    // G2-G7: a tab-only member-local scalar is blank too, one row per member that checks nonblank on its own line.
    [{ actor: { id: "\t", revision: "fixture-1" } }, /actor/],
    [{ actor: { id: "policy-1", revision: "\t" } }, /actor/],
    [{ selector: { id: "\t", revision: "r1" } }, /selector id/],
    [{ selector: { id: "gp-sample", revision: "\t" } }, /selector revision/],
    [{ resolverVerdict: "\t" }, /resolverVerdict/],
    [{ verifierOutcome: "\t" }, /verifierOutcome/],
    // G1: every other whitespace character String.prototype.trim() strips is blank through the shared helper (carriage return, vertical tab, form feed, line and paragraph separators, ideographic space, BOM), so the class closes instead of growing one character per lead.
    ...["\r", "\v", "\f", "\u2028", "\u2029", "\u3000", "\ufeff"].map((blank): [Partial<DecisionReceipt>, RegExp] => [{ support: ["land", blank] }, /support/]),
  ];
  for (const [over, pattern] of bad) {
    const outcome = validateDecisionReceipt({ ...base, ...over });
    assert.equal(outcome.ok, false, JSON.stringify(over));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED");
    assert.match(outcome.detail, pattern, JSON.stringify(over));
  }
  assert.deepEqual(validateDecisionReceipt({ ...base, support: ["restack", "land"], logProb: -0.5, verifierOutcome: "gate:pass" }), { ok: true }, "recorded values are admitted when well-formed");
});

test("the validator admits the pending and final feedback statuses, not only unknown", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  for (const status of ["pending", "final"] as const) {
    assert.deepEqual(validateDecisionReceipt({ ...base, feedback: { status } }), { ok: true }, status);
  }
});

const colony = JSON.parse(readFileSync(join(fixtureDir, "episode-colony-resilience-seed29.json"), "utf8")) as Episode;

test("the builder carries each decision's recorded admitted set and rejected count, not the proposed set or a fixed zero", () => {
  const receipts = buildDecisionReceipts(colony);
  assert.equal(receipts.length, colony.decisions.length);
  assert.ok(colony.decisions.some(d => d.eligibility.rejected.length > 0 && d.eligibility.admitted.length !== d.proposed.length), "the fixture must carry a decision whose admitted set differs from proposed with rejections");
  receipts.forEach((receipt, index) => {
    const decision = colony.decisions[index]!;
    assert.deepEqual(receipt.actions.admitted, decision.eligibility.admitted, receipt.decisionId);
    assert.deepEqual(receipt.actions.proposed, decision.proposed, receipt.decisionId);
    assert.equal(receipt.resolverVerdict, `admitted=${decision.eligibility.admitted.length},rejected=${decision.eligibility.rejected.length}`, receipt.decisionId);
  });
});

/** A copy of the episode whose first decision records logProb -0.5 (the fixtures record none). */
const withRecordedLogProb = (source: Episode): Episode => ({ ...source, decisions: source.decisions.map((decision, index) => (index === 0 ? { ...decision, logProb: -0.5 } : decision)) });

test("the builder carries a recorded decision logProb verbatim instead of fabricating unknown", () => {
  const recorded = withRecordedLogProb(episode);
  const receipts = buildDecisionReceipts(recorded);
  assert.equal(receipts[0]!.logProb, -0.5);
  assert.deepEqual(validateDecisionReceipt(receipts[0]!), { ok: true });
  assert.equal(receipts[1]!.logProb, episode.decisions[1]!.logProb, "an unrecorded logProb stays as recorded");
});

type SchemaNode = { type?: string; const?: unknown; enum?: unknown[]; pattern?: string; minLength?: number; minItems?: number; items?: SchemaNode; required?: string[]; properties?: Record<string, SchemaNode>; additionalProperties?: boolean; oneOf?: SchemaNode[] };

/** Minimal evaluator for exactly the keywords decision-receipt.v1.schema.json uses; an unknown keyword throws so the schema cannot grow unchecked. */
function schemaErrors(node: SchemaNode, value: unknown, path: string): string[] {
  const known = new Set(["$id", "title", "description", "type", "const", "enum", "pattern", "minLength", "minItems", "items", "required", "properties", "additionalProperties", "oneOf"]);
  for (const key of Object.keys(node)) if (!known.has(key)) throw new Error(`evaluator does not cover keyword ${key} at ${path}`);
  const errors: string[] = [];
  if (node.oneOf !== undefined) {
    const passing = node.oneOf.filter(branch => schemaErrors(branch, value, path).length === 0).length;
    if (passing !== 1) errors.push(`${path}: oneOf matched ${passing} branches`);
  }
  if (node.type !== undefined) {
    const actual = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
    const typeOk = node.type === "integer" ? Number.isInteger(value) : node.type === "number" ? typeof value === "number" && Number.isFinite(value) : actual === node.type;
    if (!typeOk) { errors.push(`${path}: type ${node.type} expected, got ${actual}`); return errors; }
  }
  if ("const" in node && value !== node.const) errors.push(`${path}: const ${JSON.stringify(node.const)} expected`);
  if (node.enum !== undefined && !node.enum.includes(value)) errors.push(`${path}: not in enum`);
  if (typeof value === "string") {
    if (node.pattern !== undefined && !new RegExp(node.pattern).test(value)) errors.push(`${path}: pattern ${node.pattern}`);
    if (node.minLength !== undefined && value.length < node.minLength) errors.push(`${path}: shorter than ${node.minLength}`);
  }
  if (Array.isArray(value)) {
    if (node.minItems !== undefined && value.length < node.minItems) errors.push(`${path}: fewer than ${node.minItems} items`);
    if (node.items !== undefined) value.forEach((item, i) => errors.push(...schemaErrors(node.items!, item, `${path}[${i}]`)));
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    for (const key of node.required ?? []) if (!(key in record)) errors.push(`${path}: missing ${key}`);
    for (const [key, child] of Object.entries(node.properties ?? {})) if (key in record) errors.push(...schemaErrors(child, record[key], `${path}.${key}`));
    if (node.additionalProperties === false) for (const key of Object.keys(record)) if (!(key in (node.properties ?? {}))) errors.push(`${path}: unexpected ${key}`);
  }
  return errors;
}

test("every built receipt validates against the single-home schema file and the schema identifier const equals the emitted identifier", () => {
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as SchemaNode;
  const recorded = withRecordedLogProb(episode);
  const receipts = [...buildDecisionReceipts(episode), ...buildDecisionReceipts(colony), ...buildDecisionReceipts(recorded)];
  assert.ok(receipts.length >= 9);
  for (const receipt of receipts) {
    assert.equal(schema.properties!.schema!.const, receipt.schema, "schema member const is the emitted identifier");
    assert.deepEqual(schemaErrors(schema, receipt, "$"), [], receipt.decisionId);
  }
  // Controls: the evaluator must refuse a receipt with a dropped gp member, an extra key, a wrong const and a bad digest.
  const base = receipts[0]!;
  const { snapshotHash: _dropped, ...gpWithoutSnapshot } = base.gp;
  assert.ok(schemaErrors(schema, { ...base, gp: gpWithoutSnapshot }, "$").some(e => e.includes("snapshotHash")));
  assert.ok(schemaErrors(schema, { ...base, extra: 1 }, "$").some(e => e.includes("unexpected extra")));
  assert.ok(schemaErrors(schema, { ...base, schema: "mw.decision-receipt.v2" }, "$").some(e => e.includes("const")));
  assert.ok(schemaErrors(schema, { ...base, sourceReceipt: "sha256:abc" }, "$").length > 0);
});

// MechanicalWorkflows-3did: close the String.prototype.trim() blank class at every nonblank site of the validator. The T5 table rows
// the eleven member-local sites with a space, a tab and (support only) the spread; this family crosses every member-local site with
// every trim() code point, so a member-local [ \t] rewrite, and the admission side (over-refusal) of the class, cannot survive.
const TRIM_BLANKS = ["\u0009", "\u000a", "\u000b", "\u000c", "\u000d", "\u0020", "\u00a0", "\u1680", "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a", "\u2028", "\u2029", "\u202f", "\u205f", "\u3000", "\ufeff"];

/** The twelve nonblank sites of validateDecisionReceipt: the eleven member-local ones plus the support id list, each with the member its refusal names. */
const SITES: ReadonlyArray<readonly [string, (value: string, base: DecisionReceipt) => Partial<DecisionReceipt>, RegExp]> = [
  ["decisionId", value => ({ decisionId: value }), /decisionId/],
  ["actor id", (value, base) => ({ actor: { ...base.actor, id: value } }), /actor/],
  ["actor revision", (value, base) => ({ actor: { ...base.actor, revision: value } }), /actor/],
  ["selector id", (value, base) => ({ selector: { ...base.selector, id: value } }), /selector id/],
  ["selector revision", (value, base) => ({ selector: { ...base.selector, revision: value } }), /selector revision/],
  ["completeness", value => ({ completeness: value }), /completeness/],
  ["proposed", (value, base) => ({ actions: { ...base.actions, proposed: ["land", value] } }), /proposed/],
  ["admitted", (value, base) => ({ actions: { ...base.actions, admitted: ["land", value] } }), /admitted/],
  ["executed", (value, base) => ({ actions: { ...base.actions, executed: ["land", value] } }), /executed/],
  ["resolverVerdict", value => ({ resolverVerdict: value }), /resolverVerdict/],
  ["verifierOutcome", value => ({ verifierOutcome: value }), /verifierOutcome/],
  ["support", value => ({ support: ["land", value] }), /support/],
];

test("3did class control: the iterated blank list equals the BMP String.prototype.trim() class computed at test time, 25 code points", () => {
  const computed: string[] = [];
  for (let code = 0; code <= 0xffff; code += 1) {
    const char = String.fromCharCode(code);
    if (char.trim() === "") computed.push(char);
  }
  assert.deepEqual([...TRIM_BLANKS].sort(), computed.sort(), "the list must equal the live trim() class so it cannot silently fall short");
  assert.equal(TRIM_BLANKS.length, 25);
  assert.equal(new Set(TRIM_BLANKS).size, 25);
  assert.equal(SITES.length, 12);
});

test("3did every nonblank site refuses a value of only any one trim() blank code point, naming the member", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  assert.deepEqual(validateDecisionReceipt(base), { ok: true }, "the base receipt is well-formed");
  for (const [site, apply, pattern] of SITES) {
    for (const blank of TRIM_BLANKS) {
      const label = `${site} U+${blank.charCodeAt(0).toString(16).padStart(4, "0")}`;
      const outcome = validateDecisionReceipt({ ...base, ...apply(blank, base) });
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, pattern, label);
    }
  }
});

test("3did the admission side of the trim() class: non-trim code points, interior whitespace and padded ids validate ok at every site", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  // U+001C-U+001F and U+0085 are Python str.strip whitespace, U+200B and U+2060 are zero-width format characters: none is trim() whitespace.
  const nonTrim = ["\u001c", "\u001d", "\u001e", "\u001f", "\u0085", "\u200b", "\u2060"];
  for (const char of nonTrim) assert.equal(char.trim(), char, `U+${char.charCodeAt(0).toString(16).padStart(4, "0")} must stay outside the trim() class`);
  const admitted = [...nonTrim, "land now", "a\tb", " land ", "\tland\n"];
  for (const [site, apply] of SITES) {
    for (const value of admitted) {
      assert.deepEqual(validateDecisionReceipt({ ...base, ...apply(value, base) }), { ok: true }, `${site} ${JSON.stringify(value)}`);
    }
  }
});

// MechanicalWorkflows-4uf0: 3did follow-up. The T5 and 3did families above use single-code-point blanks and never the empty string, and
// every proposed/admitted/executed row puts its blank first, last or alone. These rows close three survivors at the landed 3did tree:
// X1 (a helper that refuses exactly one \s character) and X3 (a helper that admits any value longer than one character) die on WB1,
// X1 and X2 (a helper that admits "") die on WB2, and O1 (ends-only action-list checks) dies on WB3.
const MULTI_BLANKS = ["  ", " \t", "\r\n", "　　", "﻿ ", TRIM_BLANKS.join("")];

test("4uf0 WB1 every nonblank site refuses a multi-character value made only of trim() blanks, naming the member", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  assert.deepEqual(validateDecisionReceipt(base), { ok: true }, "the base receipt is well-formed");
  assert.equal(SITES.length, 12);
  assert.ok(MULTI_BLANKS.every(value => value.length > 1 && value.trim() === ""), "every WB1 value is multi-character and entirely trim() blank");
  for (const [site, apply, pattern] of SITES) {
    for (const blank of MULTI_BLANKS) {
      const label = `${site} ${JSON.stringify(blank)}`;
      const outcome = validateDecisionReceipt({ ...base, ...apply(blank, base) });
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, pattern, label);
    }
  }
});

test("4uf0 WB2 every nonblank site refuses the empty string, naming the member", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  assert.deepEqual(validateDecisionReceipt(base), { ok: true }, "the base receipt is well-formed");
  for (const [site, apply, pattern] of SITES) {
    const outcome = validateDecisionReceipt({ ...base, ...apply("", base) });
    assert.equal(outcome.ok, false, `${site} empty string`);
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", site);
    assert.match(outcome.detail, pattern, site);
  }
});

test("4uf0 WB3 a blank action id BETWEEN two ids is refused in proposed, admitted and executed, naming that list", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const lists: ReadonlyArray<readonly [string, (ids: string[]) => Partial<DecisionReceipt>, RegExp]> = [
    ["proposed", ids => ({ actions: { ...base.actions, proposed: ids } }), /proposed/],
    ["admitted", ids => ({ actions: { ...base.actions, admitted: ids } }), /admitted/],
    ["executed", ids => ({ actions: { ...base.actions, executed: ids } }), /executed/],
  ];
  for (const [list, apply, pattern] of lists) {
    for (const blank of [" ", "\t", "　"]) {
      const label = `${list} ["land", ${JSON.stringify(blank)}, "restack"]`;
      const outcome = validateDecisionReceipt({ ...base, ...apply(["land", blank, "restack"]) });
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, pattern, label);
    }
  }
});

// MechanicalWorkflows-tyx1: 4uf0 follow-up. Every landed id-list row puts its blank at index 0, at index 1 or alone, so the positional law
// is pinned only through index 1. These rows place the blank at index 2 and at index 3 of a four-id list in proposed, admitted, executed and
// support: a first-two-only check (a .slice(0, 2) at the action-list checks or at the support badIds) survives every earlier row and dies here.
const FOUR_PLAIN = ["land", "restack", "hold", "park"];
const INDEX_BLANKS = [" ", "\t", "　 "];

test("tyx1 WI1 a blank id at index 2 or index 3 of a four-id list is refused in proposed, admitted, executed and support, naming the list", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const lists: ReadonlyArray<readonly [string, (ids: string[]) => Partial<DecisionReceipt>, RegExp]> = [
    ["proposed", ids => ({ actions: { ...base.actions, proposed: ids } }), /proposed/],
    ["admitted", ids => ({ actions: { ...base.actions, admitted: ids } }), /admitted/],
    ["executed", ids => ({ actions: { ...base.actions, executed: ids } }), /executed/],
    ["support", ids => ({ support: ids }), /support/],
  ];
  assert.deepEqual(validateDecisionReceipt(base), { ok: true }, "the base receipt is well-formed");
  assert.equal(lists.length, 4);
  for (const [list, apply, pattern] of lists) {
    assert.deepEqual(validateDecisionReceipt({ ...base, ...apply([...FOUR_PLAIN]) }), { ok: true }, `${list} four plain ids are admitted`);
    for (const index of [2, 3]) {
      for (const blank of INDEX_BLANKS) {
        assert.equal(blank.trim(), "", "every WI1 blank is entirely trim() blank");
        const ids = [...FOUR_PLAIN];
        ids[index] = blank;
        const label = `${list} index ${index} ${JSON.stringify(ids)}`;
        const outcome = validateDecisionReceipt({ ...base, ...apply(ids) });
        assert.equal(outcome.ok, false, label);
        if (outcome.ok) continue;
        assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
        assert.match(outcome.detail, pattern, label);
      }
    }
  }
});

// MechanicalWorkflows-mlr8 (lead i9op-residual X01-X04, D01): the digest sites refuse CR, bare-LF
// and space padding at their own call sites, and the six schema digest patterns refuse the same inputs.
const MLR8_DIGEST = `sha256:${"a".repeat(64)}`;
const MLR8_PADDED: ReadonlyArray<readonly [string, string]> = [
  ["leading space", ` ${MLR8_DIGEST}`],
  ["trailing space", `${MLR8_DIGEST} `],
  ["trailing CR", `${MLR8_DIGEST}\r`],
  ["trailing LF", `${MLR8_DIGEST}\n`],
  ["bare leading LF", `\n${MLR8_DIGEST}`],
  ["leading CR", `\r${MLR8_DIGEST}`],
];

test("mlr8 R1-R4 each of the six digest sites refuses a CR suffix, a bare leading LF and space padding, naming the member, and admits the clean digest", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const sites: ReadonlyArray<readonly [string, (value: string) => Partial<DecisionReceipt>, RegExp]> = [
    ["graphHash", value => ({ gp: { ...base.gp, graphHash: value } }), /graphHash/],
    ["programHash", value => ({ gp: { ...base.gp, programHash: value } }), /programHash/],
    ["checkpointHash", value => ({ gp: { ...base.gp, checkpointHash: value } }), /checkpointHash/],
    ["snapshotHash", value => ({ gp: { ...base.gp, snapshotHash: value } }), /snapshotHash/],
    ["featureProjectionDigest", value => ({ featureProjectionDigest: value }), /featureProjectionDigest/],
    ["sourceReceipt", value => ({ sourceReceipt: value }), /sourceReceipt/],
  ];
  assert.equal(sites.length, 6);
  for (const [site, apply, pattern] of sites) {
    assert.deepEqual(validateDecisionReceipt({ ...base, ...apply(MLR8_DIGEST) }), { ok: true }, `${site} clean digest is admitted`);
    for (const [kind, value] of MLR8_PADDED) {
      const label = `${site} ${kind} ${JSON.stringify(value)}`;
      const outcome = validateDecisionReceipt({ ...base, ...apply(value) });
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, pattern, label);
    }
  }
});

test("mlr8 R5 the six schema digest patterns, compiled as written, refuse the padded inputs and accept the clean digest", () => {
  type Member = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Member> } } & Record<string, Member> };
  const members: ReadonlyArray<readonly [string, Member]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(members.length, 6);
  for (const [name, member] of members) {
    const source = member.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const [kind, value] of MLR8_PADDED) assert.equal(compiled.test(value), false, `${name} refuses ${kind} ${JSON.stringify(value)}`);
    assert.equal(compiled.test(`x\n${MLR8_DIGEST}`), false, `${name} refuses an x-LF prefix`);
  }
});

// MechanicalWorkflows-7r8x (lead mlr8-digest-padding-beyond-six-run103-06-c10, N01..N10): the six mlr8 paddings never feed a tab, a CRLF pair or
// any other String.prototype.trim() code point at a digest site or a schema digest pattern. These rows cross the same six sites and six
// schema patterns with the whole trim() class (computed at test time, 25 BMP code points) as a one-character prefix or suffix, a tab on
// either side, and a CRLF suffix and prefix, so a DIGEST or schema loosening past the six mlr8 paddings fails.
const R8X_DIGEST_SITES = (base: DecisionReceipt): ReadonlyArray<readonly [string, (value: string) => Partial<DecisionReceipt>, RegExp]> => [
  ["graphHash", value => ({ gp: { ...base.gp, graphHash: value } }), /graphHash/],
  ["programHash", value => ({ gp: { ...base.gp, programHash: value } }), /programHash/],
  ["checkpointHash", value => ({ gp: { ...base.gp, checkpointHash: value } }), /checkpointHash/],
  ["snapshotHash", value => ({ gp: { ...base.gp, snapshotHash: value } }), /snapshotHash/],
  ["featureProjectionDigest", value => ({ featureProjectionDigest: value }), /featureProjectionDigest/],
  ["sourceReceipt", value => ({ sourceReceipt: value }), /sourceReceipt/],
];

const r8xTrimClass = (): string[] => {
  const computed: string[] = [];
  for (let code = 0; code <= 0xffff; code += 1) {
    const char = String.fromCharCode(code);
    if (char.trim() === "") computed.push(char);
  }
  return computed;
};

const r8xDigestSitesRefuse = (values: readonly string[], id: string): void => {
  const base = buildDecisionReceipts(episode)[0]!;
  const sites = R8X_DIGEST_SITES(base);
  assert.equal(sites.length, 6, id);
  for (const [site, apply, pattern] of sites) {
    assert.deepEqual(validateDecisionReceipt({ ...base, ...apply(MLR8_DIGEST) }), { ok: true }, `${id} ${site} clean digest is admitted`);
    for (const value of values) {
      const label = `${id} ${site} ${JSON.stringify(value)}`;
      const outcome = validateDecisionReceipt({ ...base, ...apply(value) });
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, pattern, label);
    }
  }
};

test("7r8x OW1 each of the six digest sites refuses a tab on either side, naming the member", () => {
  r8xDigestSitesRefuse([`\t${MLR8_DIGEST}`, `${MLR8_DIGEST}\t`], "OW1");
});

test("7r8x OW2 each of the six digest sites refuses a CRLF pair as a suffix and as a prefix, naming the member", () => {
  r8xDigestSitesRefuse([`${MLR8_DIGEST}\r\n`, `\r\n${MLR8_DIGEST}`], "OW2");
});

test("7r8x OW3 each of the six digest sites refuses every String.prototype.trim() code point as a one-character prefix or suffix, naming the member", () => {
  const trim = r8xTrimClass();
  assert.equal(trim.length, 25, "OW3 BMP trim() class");
  r8xDigestSitesRefuse(trim.flatMap(blank => [`${blank}${MLR8_DIGEST}`, `${MLR8_DIGEST}${blank}`]), "OW3");
});

test("7r8x OW4 the six schema digest patterns, compiled as written, refuse a tab on either side, a CRLF pair and every trim() code point as a prefix or suffix", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const trim = r8xTrimClass();
  assert.equal(trim.length, 25, "OW4 BMP trim() class");
  const values = [`\t${MLR8_DIGEST}`, `${MLR8_DIGEST}\t`, `${MLR8_DIGEST}\r\n`, `\r\n${MLR8_DIGEST}`, ...trim.flatMap(blank => [`${blank}${MLR8_DIGEST}`, `${MLR8_DIGEST}${blank}`])];
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-sj0n (lead 7r8x-rows-close-n01-n10-and-the-trim-class-at-six-digest-sites-and-schema-non-trim-blanks-two-char-padding-and-label-blank-unpinned, Z01..Z07):
// the 7r8x rows feed one-character paddings drawn from the String.prototype.trim() class plus a tab and a CRLF pair. These rows cross the same six digest sites and six schema
// digest patterns with the values that class leaves open: code points outside trim() (X1), every ordered two-character padding over seven blanks (X2), and a trim() code point
// placed inside the sha256: label (X3), then mirror all three against the schema patterns compiled as written (X4). They assert the refusal and the member name, nothing more.
const SJ0N_HEX = "a".repeat(64);
const SJ0N_OUTSIDE_TRIM = ["\u001c", "\u001d", "\u001e", "\u001f", "\u0085", "᠎", "​", "⁠"];
const SJ0N_PAIR_BLANKS = [" ", "\t", "\n", "\r", " ", "　", "﻿"];
const sj0nX1Values = (): string[] => SJ0N_OUTSIDE_TRIM.flatMap(blank => [`${blank}${MLR8_DIGEST}`, `${MLR8_DIGEST}${blank}`]);
const sj0nX2Values = (): string[] => SJ0N_PAIR_BLANKS.flatMap(first => SJ0N_PAIR_BLANKS.flatMap(second => [`${first}${second}${MLR8_DIGEST}`, `${MLR8_DIGEST}${first}${second}`]));
const sj0nX3Values = (): string[] => r8xTrimClass().flatMap(blank => [`sha256:${blank}${SJ0N_HEX}`, `sha256${blank}:${SJ0N_HEX}`]);

test("sj0n X1 each of the six digest sites refuses U+001C..U+001F, U+0085, U+180E, U+200B and U+2060 as a one-character prefix or suffix, naming the member", () => {
  for (const blank of SJ0N_OUTSIDE_TRIM) assert.notEqual(blank.trim(), "", `X1 ${JSON.stringify(blank)} lies outside the trim() class`);
  const values = sj0nX1Values();
  assert.equal(values.length, 16, "X1 value count");
  r8xDigestSitesRefuse(values, "X1");
});

test("sj0n X2 each of the six digest sites refuses every ordered two-character padding over space, tab, LF, CR, NBSP, U+3000 and U+FEFF on either side, naming the member", () => {
  const values = sj0nX2Values();
  assert.equal(values.length, 98, "X2 value count");
  r8xDigestSitesRefuse(values, "X2");
});

test("sj0n X3 each of the six digest sites refuses every trim() code point inside the label, after the colon or before it, naming the member", () => {
  assert.equal(r8xTrimClass().length, 25, "X3 BMP trim() class");
  const values = sj0nX3Values();
  assert.equal(values.length, 50, "X3 value count");
  r8xDigestSitesRefuse(values, "X3");
});

test("sj0n X4 the six schema digest patterns, compiled as written, refuse the X1, X2 and X3 values and accept the clean digest", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const values = [...sj0nX1Values(), ...sj0nX2Values(), ...sj0nX3Values()];
  assert.equal(values.length, 164, "X4 value count");
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-4ww8 (lead sj0n-digest-sites-hex-body-label-word-nontrim-label-three-char-run106-06-c8, R01..R06): the sj0n rows never place a blank between the interior hex digits,
// inside the sha256 label word, or an outside-trim code point next to the colon, and feed padding only up to two characters. These rows cross the same six digest sites and six schema
// digest patterns with those values: one blank at every one of the 63 interior hex positions (Y1), one blank at each of the five interior positions of the word sha256 (Y2), the eight
// non-trim() code points directly after and directly before the colon (Y3), every ordered three-character padding over the seven pair blanks on either side (Y4), then mirror Y1..Y4
// against the six schema patterns compiled as written (Y5). They assert the refusal and the member name, nothing more.
const W4_HEX_MID_BLANKS = SJ0N_PAIR_BLANKS;
const w4Y1Values = (): string[] => {
  const values: string[] = [];
  for (let index = 1; index < SJ0N_HEX.length; index += 1) {
    for (const blank of W4_HEX_MID_BLANKS) values.push(`sha256:${SJ0N_HEX.slice(0, index)}${blank}${SJ0N_HEX.slice(index)}`);
  }
  return values;
};
const w4Y2Values = (): string[] => {
  const values: string[] = [];
  for (let index = 1; index < "sha256".length; index += 1) {
    for (const blank of W4_HEX_MID_BLANKS) values.push(`${"sha256".slice(0, index)}${blank}${"sha256".slice(index)}:${SJ0N_HEX}`);
  }
  return values;
};
const w4Y3Values = (): string[] => SJ0N_OUTSIDE_TRIM.flatMap(blank => [`sha256:${blank}${SJ0N_HEX}`, `sha256${blank}:${SJ0N_HEX}`]);
const w4Y4Values = (): string[] =>
  SJ0N_PAIR_BLANKS.flatMap(first => SJ0N_PAIR_BLANKS.flatMap(second => SJ0N_PAIR_BLANKS.flatMap(third => [`${first}${second}${third}${MLR8_DIGEST}`, `${MLR8_DIGEST}${first}${second}${third}`])));

test("4ww8 Y1 each of the six digest sites refuses one blank between any two interior hex digits, naming the member", () => {
  const values = w4Y1Values();
  assert.equal(values.length, 441, "Y1 value count (63 interior positions x 7 blanks)");
  assert.equal(new Set(values).size, 441, "Y1 values are distinct");
  r8xDigestSitesRefuse(values, "Y1");
});

test("4ww8 Y2 each of the six digest sites refuses one blank at each interior position of the word sha256, naming the member", () => {
  const values = w4Y2Values();
  assert.equal(values.length, 35, "Y2 value count (5 interior positions x 7 blanks)");
  r8xDigestSitesRefuse(values, "Y2");
});

test("4ww8 Y3 each of the six digest sites refuses U+001C..U+001F, U+0085, U+180E, U+200B and U+2060 directly after and directly before the colon, naming the member", () => {
  const values = w4Y3Values();
  assert.equal(values.length, 16, "Y3 value count");
  r8xDigestSitesRefuse(values, "Y3");
});

test("4ww8 Y4 each of the six digest sites refuses every ordered three-character padding over the seven pair blanks on either side, naming the member", () => {
  const values = w4Y4Values();
  assert.equal(values.length, 686, "Y4 value count (343 x 2 sides)");
  r8xDigestSitesRefuse(values, "Y4");
});

test("4ww8 Y5 the six schema digest patterns, compiled as written, refuse the Y1, Y2, Y3 and Y4 values and accept the clean digest", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const values = [...w4Y1Values(), ...w4Y2Values(), ...w4Y3Values(), ...w4Y4Values()];
  assert.equal(values.length, 1178, "Y5 value count");
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-elg3 (lead 4ww8-digest-site-residuals-run107-06-c4, H01..H13): the 4ww8 rows place the seven pair blanks inside the hex body and the label word, but never the eight non-trim()
// code points there, never a two-character blank run inside the body or beside the colon, never punctuation inside the word sha256 or another case of it, and never a non-hex ASCII letter at a body
// position. These rows cross the same six digest sites and the six schema digest patterns with those values: the eight non-trim() points at every interior hex position (X1) and inside the word (X2),
// every ordered pair-blank run inside the body (X3) and beside the colon (X4), punctuation inside the word (X5), other cases of the word (X6), every g..z and A..Z letter at every body position (X7),
// then X1..X7 and a malformed-member table against the six schema patterns compiled as written (X8). They assert the refusal and the member name, nothing more.
const ELG3_HEX_POSITIONS = Array.from({ length: SJ0N_HEX.length }, (_, index) => index);
const elg3InBody = (chars: readonly string[]): string[] =>
  chars.flatMap(char => ELG3_HEX_POSITIONS.slice(1).map(index => `sha256:${SJ0N_HEX.slice(0, index)}${char}${SJ0N_HEX.slice(index)}`));
const elg3InWord = (chars: readonly string[]): string[] =>
  chars.flatMap(char => [1, 2, 3, 4, 5].map(index => `${"sha256".slice(0, index)}${char}${"sha256".slice(index)}:${SJ0N_HEX}`));
const ELG3_PAIRS = SJ0N_PAIR_BLANKS.flatMap(first => SJ0N_PAIR_BLANKS.map(second => `${first}${second}`));
const ELG3_PUNCTUATION = ["-", "_", ".", "/", "+"];
const ELG3_WORD_CASES = ["Sha", "sHa", "shA", "SHa", "ShA", "sHA", "SHA"];
const ELG3_NON_HEX_LETTERS = [..."ghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const elg3X1Values = (): string[] => elg3InBody(SJ0N_OUTSIDE_TRIM);
const elg3X2Values = (): string[] => elg3InWord(SJ0N_OUTSIDE_TRIM);
const elg3X3Values = (): string[] => elg3InBody(ELG3_PAIRS);
const elg3X4Values = (): string[] => ELG3_PAIRS.flatMap(run => [`sha256:${run}${SJ0N_HEX}`, `sha256${run}:${SJ0N_HEX}`]);
const elg3X5Values = (): string[] => elg3InWord(ELG3_PUNCTUATION);
const elg3X6Values = (): string[] => ELG3_WORD_CASES.map(word => `${word}256:${SJ0N_HEX}`);
const elg3X7Values = (): string[] =>
  ELG3_NON_HEX_LETTERS.flatMap(letter => ELG3_HEX_POSITIONS.map(index => `sha256:${SJ0N_HEX.slice(0, index)}${letter}${SJ0N_HEX.slice(index + 1)}`));
const ELG3_TABLE_VALUES = [
  "not-a-digest",
  "sha1:ffff",
  "sha256:abc",
  `sha256:${"z".repeat(64)}`,
  `sha256:${"a".repeat(65)}`,
  `xsha256:${SJ0N_HEX}`,
  `sha256:${"A".repeat(64)}`,
  `sha256:${"a".repeat(63)}`,
  ` ${MLR8_DIGEST}`,
  `${MLR8_DIGEST} `,
  `x\n${MLR8_DIGEST}`,
  `${MLR8_DIGEST}\n`,
];

test("elg3 X1 each of the six digest sites refuses U+001C..U+001F, U+0085, U+180E, U+200B and U+2060 at every one of the 63 interior positions of the hex body, naming the member", () => {
  for (const blank of SJ0N_OUTSIDE_TRIM) assert.notEqual(blank.trim(), "", `X1 ${JSON.stringify(blank)} lies outside the trim() class`);
  const values = elg3X1Values();
  assert.equal(values.length, 504, "X1 value count (63 interior positions x 8 code points)");
  r8xDigestSitesRefuse(values, "X1");
});

test("elg3 X2 each of the six digest sites refuses the same eight non-trim() code points at each of the five interior positions of the label word sha256, naming the member", () => {
  const values = elg3X2Values();
  assert.equal(values.length, 40, "X2 value count (5 interior positions x 8 code points)");
  r8xDigestSitesRefuse(values, "X2");
});

test("elg3 X3 each of the six digest sites refuses every ordered two-character run over the seven pair blanks at every one of the 63 interior positions of the hex body, naming the member", () => {
  const values = elg3X3Values();
  assert.equal(values.length, 3087, "X3 value count (63 positions x 49 runs)");
  assert.equal(new Set(values).size, 3087, "X3 values are distinct");
  r8xDigestSitesRefuse(values, "X3");
});

test("elg3 X4 each of the six digest sites refuses every ordered two-character run over the seven pair blanks directly after and directly before the colon, naming the member", () => {
  const values = elg3X4Values();
  assert.equal(values.length, 98, "X4 value count (49 runs x 2 sides)");
  r8xDigestSitesRefuse(values, "X4");
});

test("elg3 X5 each of the six digest sites refuses a hyphen, underscore, dot, slash or plus at each interior position of the label word sha256, naming the member", () => {
  const values = elg3X5Values();
  assert.equal(values.length, 25, "X5 value count (5 positions x 5 characters)");
  assert.ok(values.includes(`sha-256:${SJ0N_HEX}`), "X5 carries the sha-256 spelling");
  r8xDigestSitesRefuse(values, "X5");
});

test("elg3 X6 each of the six digest sites refuses every other case of the label word sha256 over a clean hex body, naming the member", () => {
  const values = elg3X6Values();
  assert.equal(values.length, 7, "X6 value count");
  assert.ok(values.includes(`SHA256:${SJ0N_HEX}`), "X6 carries the SHA256 spelling");
  r8xDigestSitesRefuse(values, "X6");
});

test("elg3 X7 each of the six digest sites refuses every non-hex ASCII letter g..z and A..Z at every one of the 64 body positions, naming the member", () => {
  const values = elg3X7Values();
  assert.equal(values.length, 2944, "X7 value count (46 letters x 64 positions)");
  r8xDigestSitesRefuse(values, "X7");
});

test("elg3 X8 the six schema digest patterns, compiled as written, refuse the X1..X7 values and the malformed-member table digests, and accept the clean digest", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const values = [...elg3X1Values(), ...elg3X2Values(), ...elg3X3Values(), ...elg3X4Values(), ...elg3X5Values(), ...elg3X6Values(), ...elg3X7Values(), ...ELG3_TABLE_VALUES];
  assert.equal(values.length, 6717, "X8 value count");
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-qjiy (lead 4ww8-digest-site-residuals-run107-06-c4, H01..H13): the 4ww8 rows never place a non-trim() code point inside the hex body or the sha256 word, never feed
// an exactly-two-blank run inside the body or after the colon, never spell the label sha-256: or SHA256:, and never widen the body class past [0-9a-f] (only z, A and the 63/65 lengths are fed).
// V1..V7 cross the six digest sites with those values; V8 mirrors them against the six schema patterns compiled as written, one site at a time, and adds the schema-only value domains.
const V_BLANK_PAIRS = SJ0N_PAIR_BLANKS.flatMap(first => SJ0N_PAIR_BLANKS.map(second => `${first}${second}`));
const vV1Values = (): string[] => {
  const values: string[] = [];
  for (let index = 1; index < SJ0N_HEX.length; index += 1) {
    for (const point of SJ0N_OUTSIDE_TRIM) values.push(`sha256:${SJ0N_HEX.slice(0, index)}${point}${SJ0N_HEX.slice(index)}`);
  }
  return values;
};
const vV2Values = (): string[] => {
  const values: string[] = [];
  for (let index = 1; index < "sha256".length; index += 1) {
    for (const point of SJ0N_OUTSIDE_TRIM) values.push(`${"sha256".slice(0, index)}${point}${"sha256".slice(index)}:${SJ0N_HEX}`);
  }
  return values;
};
const vV3Values = (): string[] => {
  const values: string[] = [];
  for (const run of V_BLANK_PAIRS) {
    for (const index of [1, 32, 63]) values.push(`sha256:${SJ0N_HEX.slice(0, index)}${run}${SJ0N_HEX.slice(index)}`);
  }
  for (let index = 1; index < SJ0N_HEX.length; index += 1) {
    for (const blank of SJ0N_PAIR_BLANKS) values.push(`sha256:${SJ0N_HEX.slice(0, index)}${blank}${blank}${SJ0N_HEX.slice(index)}`);
  }
  return values;
};
const vV4Values = (): string[] => {
  const values: string[] = [];
  for (const run of V_BLANK_PAIRS) values.push(`sha256:${run}${SJ0N_HEX}`, `sha256${run}:${SJ0N_HEX}`);
  for (const blank of SJ0N_PAIR_BLANKS) {
    for (const length of [3, 4]) values.push(`sha256:${blank.repeat(length)}${SJ0N_HEX}`, `sha256${blank.repeat(length)}:${SJ0N_HEX}`);
  }
  return values;
};
const vV5Values = (): string[] => ["sha-256", "sha_256", "sha.256", "sha 256", "sha1", "sha512", "sha2-256", "sha256sum"].map(label => `${label}:${SJ0N_HEX}`);
const vV6Values = (): string[] => {
  const values: string[] = [];
  for (let mask = 1; mask < 8; mask += 1) {
    const word = "sha".split("").map((letter, position) => ((mask >> position) & 1 ? letter.toUpperCase() : letter)).join("");
    values.push(`${word}256:${SJ0N_HEX}`);
  }
  return values;
};
const vV7Values = (): string[] => {
  const values: string[] = [];
  const alphabet: string[] = [];
  for (let code = 0x20; code < 0x7f; code += 1) {
    const char = String.fromCharCode(code);
    if (!/^[0-9a-f]$/.test(char)) alphabet.push(char);
  }
  for (let index = 0; index < SJ0N_HEX.length; index += 1) {
    for (const char of alphabet) values.push(`sha256:${SJ0N_HEX.slice(0, index)}${char}${SJ0N_HEX.slice(index + 1)}`);
  }
  return values;
};

test("qjiy V1 each of the six digest sites refuses a non-trim() code point between any two interior hex digits, naming the member", () => {
  const values = vV1Values();
  assert.equal(values.length, 504, "V1 value count (63 interior positions x 8 points)");
  assert.equal(new Set(values).size, 504, "V1 values are distinct");
  r8xDigestSitesRefuse(values, "V1");
});

test("qjiy V2 each of the six digest sites refuses a non-trim() code point at each interior position of the word sha256, naming the member", () => {
  const values = vV2Values();
  assert.equal(values.length, 40, "V2 value count (5 interior positions x 8 points)");
  r8xDigestSitesRefuse(values, "V2");
});

test("qjiy V3 each of the six digest sites refuses a two-blank run inside the hex body, naming the member", () => {
  const values = vV3Values();
  assert.equal(values.length, 147 + 441, "V3 value count (49 pairs x 3 positions + 63 positions x 7 same-blank runs)");
  assert.equal(new Set(values).size, 147 + 441 - 21, "V3 distinct values (the 7 same-blank runs at positions 1, 32 and 63 repeat)");
  r8xDigestSitesRefuse(values, "V3");
});

test("qjiy V4 each of the six digest sites refuses two-, three- and four-blank runs directly after and directly before the colon, naming the member", () => {
  const values = vV4Values();
  assert.equal(values.length, 98 + 28, "V4 value count (49 pairs x 2 sides + 7 blanks x 2 lengths x 2 sides)");
  r8xDigestSitesRefuse(values, "V4");
});

test("qjiy V5 each of the six digest sites refuses the label spellings sha-256:, sha_256:, sha.256:, sha 256:, sha1:, sha512:, sha2-256: and sha256sum:, naming the member", () => {
  const values = vV5Values();
  assert.equal(values.length, 8, "V5 value count");
  r8xDigestSitesRefuse(values, "V5");
});

test("qjiy V6 each of the six digest sites refuses every upper-case spelling of the label word (SHA256:, Sha256:, sHA256: and the rest), naming the member", () => {
  const values = vV6Values();
  assert.equal(values.length, 7, "V6 value count");
  assert.ok(values.includes(`SHA256:${SJ0N_HEX}`), "V6 carries the fully upper-case label");
  r8xDigestSitesRefuse(values, "V6");
});

test("qjiy V7 each of the six digest sites refuses every printable ASCII character outside [0-9a-f] at each of the 64 body positions (g..z, A..Z and punctuation), naming the member", () => {
  const values = vV7Values();
  assert.equal(values.length, 64 * (95 - 16), "V7 value count (64 positions x 79 characters outside [0-9a-f])");
  assert.equal(new Set(values).size, 64 * 79, "V7 values are distinct");
  r8xDigestSitesRefuse(values, "V7");
});

test("qjiy V8 the six schema digest patterns, compiled as written and checked one site at a time, refuse V1..V7, the 63/65-hex and upper-case-hex bodies and the SHA256: label, and accept the clean digest", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const tableDigests = [
    `sha256:${"z".repeat(64)}`,
    `sha256:${"a".repeat(65)}`,
    `xsha256:${"a".repeat(64)}`,
    `sha256:${"A".repeat(64)}`,
    `sha256:${"a".repeat(63)}`,
    `sha256:${"A".repeat(32)}${"a".repeat(32)}`,
    `sha256:${"0123456789abcdef".repeat(4)}0`,
    `sha256:${"0123456789abcdef".repeat(4).slice(1)}`,
    `SHA256:${"a".repeat(64)}`,
  ];
  const values = [...vV1Values(), ...vV2Values(), ...vV3Values(), ...vV4Values(), ...vV5Values(), ...vV6Values(), ...vV7Values(), ...tableDigests];
  assert.ok(values.length > 6000, "V8 value count");
  for (const [name, node] of nodes) {
    const branch = node.oneOf?.[0]?.pattern;
    assert.equal(typeof branch, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(branch!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    assert.equal(compiled.test(`sha256:${"0123456789abcdef".repeat(4)}`), true, `${name} accepts a full-alphabet lower-case hex body`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-1vcs (lead elg3-digest-site-residuals-run109-06-c1, G01, G03..G05, G07..G10, G13, G14): the qjiy rows substitute printable ASCII at every body position and feed the foreign
// sha-256/sha1/sha512 labels, but never substitute a trim() or non-trim() blank for a hex digit (G01 beyond the space member), never drop, double or replace the colon (G03, G04), never feed a bare,
// truncated, doubled or other-algorithm-labelled body (G05), and never feed another spelling of the literal unknown or the empty string (G07..G10). W0..W3 cross the six digest sites with those values;
// W4 mirrors them against the six schema patterns compiled as written (G13, G14). They assert the refusal and the member name, nothing more.
const W_TRIM_AND_OUTSIDE = (): string[] => [...r8xTrimClass(), ...SJ0N_OUTSIDE_TRIM];
const wW0Values = (): string[] =>
  W_TRIM_AND_OUTSIDE().flatMap(point => ELG3_HEX_POSITIONS.map(index => `sha256:${SJ0N_HEX.slice(0, index)}${point}${SJ0N_HEX.slice(index + 1)}`));
const W_ASCII_PUNCTUATION_NO_COLON = [..."!\"#$%&'()*+,-./;<=>?@[\\]^_`{|}~"];
const wW1Values = (): string[] => [
  `sha256${SJ0N_HEX}`,
  `sha256::${SJ0N_HEX}`,
  ...W_ASCII_PUNCTUATION_NO_COLON.map(char => `sha256${char}${SJ0N_HEX}`),
  ...r8xTrimClass().map(blank => `sha256${blank}${SJ0N_HEX}`),
  ...SJ0N_OUTSIDE_TRIM.map(point => `sha256${point}${SJ0N_HEX}`),
  ...["a", "0", "f"].map(hex => `sha256${hex}${SJ0N_HEX}`),
];
const wW2Values = (): string[] => [
  SJ0N_HEX,
  ...["sha", "sha25", "sha2", "s", ""].map(label => `${label}:${SJ0N_HEX}`),
  `sha256:sha256:${SJ0N_HEX}`,
  ...["sha224", "sha384", "sha3-256", "md5", "blake2b"].map(label => `${label}:${SJ0N_HEX}`),
];
const W_UNKNOWN_SPELLINGS = [
  "UNKNOWN", "Unknown", "uNknown", "unKnown", "unkNown", "unknOwn", "unknoWn", "unknowN",
  " unknown", "unknown ", "\tunknown", "unknown\n",
  "unknownx", "unknown:", "unknown0",
  "unknow", "nknown", "unkown",
  "",
];
const wW3Values = (): string[] => [...W_UNKNOWN_SPELLINGS];

test("1vcs W0 each of the six digest sites refuses every trim() code point and the eight non-trim() code points substituted for one hex digit at each of the 64 body positions, naming the member", () => {
  assert.equal(r8xTrimClass().length, 25, "W0 BMP trim() class");
  assert.equal(W_TRIM_AND_OUTSIDE().length, 33, "W0 substituted code points (25 trim() + 8 non-trim())");
  const values = wW0Values();
  assert.equal(values.length, 33 * 64, "W0 value count (64 positions x 33 code points)");
  assert.equal(new Set(values).size, 33 * 64, "W0 values are distinct");
  for (const value of values) assert.equal(value.length, 71, "W0 substitution keeps the 71-character length");
  r8xDigestSitesRefuse(values, "W0");
});

test("1vcs W1 each of the six digest sites refuses sha256 directly followed by the body, a doubled colon and the colon replaced by any other ASCII punctuation, trim() or non-trim() code point or hex digit, naming the member", () => {
  assert.equal(W_ASCII_PUNCTUATION_NO_COLON.length, 31, "W1 ASCII punctuation other than the colon");
  const values = wW1Values();
  assert.equal(values.length, 2 + 31 + 25 + 8 + 3, "W1 value count");
  assert.equal(new Set(values).size, 69, "W1 values are distinct");
  assert.ok(values.includes(`sha256${SJ0N_HEX}`), "W1 carries the colonless spelling");
  assert.ok(values.includes(`sha256::${SJ0N_HEX}`), "W1 carries the doubled colon");
  r8xDigestSitesRefuse(values, "W1");
});

test("1vcs W2 each of the six digest sites refuses the bare body, truncated labels, a leading bare colon, a doubled label and the sha224, sha384, sha3-256, md5 and blake2b labels over the clean body, naming the member", () => {
  const values = wW2Values();
  assert.equal(values.length, 1 + 5 + 1 + 5, "W2 value count");
  assert.equal(new Set(values).size, 12, "W2 values are distinct");
  assert.ok(values.includes(SJ0N_HEX) && values.includes(`:${SJ0N_HEX}`), "W2 carries the bare body and the leading bare colon");
  r8xDigestSitesRefuse(values, "W2");
});

test("1vcs W3 each of the six digest sites refuses every other spelling of the literal unknown and the empty string, never the literal itself, naming the member", () => {
  const values = wW3Values();
  assert.equal(values.length, 19, "W3 value count");
  assert.equal(new Set(values).size, 19, "W3 values are distinct");
  assert.ok(!values.includes("unknown"), "W3 never feeds the literal itself");
  assert.ok(values.includes(""), "W3 carries the empty string");
  r8xDigestSitesRefuse(values, "W3");
  const base = buildDecisionReceipts(episode)[0]!;
  for (const [site, apply] of R8X_DIGEST_SITES(base)) assert.deepEqual(validateDecisionReceipt({ ...base, ...apply("unknown") }), { ok: true }, `W3 ${site} admits the literal unknown`);
});

test("1vcs W4 the six schema digest patterns, compiled as written, refuse the W0..W3 values and accept the clean digest", () => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  const values = [...wW0Values(), ...wW1Values(), ...wW2Values(), ...wW3Values()];
  assert.equal(values.length, 2112 + 69 + 12 + 19, "W4 value count");
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-tw99 (lead qjiy-closes-6-of-15-elg3-lead-survivors..., N03, row X2): the six digest sites test DIGEST against the string as written, never against
// String(value).normalize("NFKC"). These nine values normalise to the clean digest under NFKC yet differ as written (fullwidth body, fullwidth zeros, fullwidth hex cycle,
// fullwidth colon, fullwidth label, fullwidth label plus colon, a ligature completing the body, superscript digits in the label, circled letters in the body), so a
// badDigest that normalised before the DIGEST test would admit them. The same values cross the six schema patterns compiled as written.
const tw99Fullwidth = (text: string): string => [...text].map(char => String.fromCharCode(char.charCodeAt(0) + 0xfee0)).join("");
const tw99Values = (): string[] => [
  `sha256:${tw99Fullwidth("a").repeat(64)}`,
  `sha256:${tw99Fullwidth("0").repeat(64)}`,
  `sha256:${tw99Fullwidth("0123456789abcdef").repeat(4)}`,
  `sha256：${SJ0N_HEX}`,
  `${tw99Fullwidth("sha256")}:${SJ0N_HEX}`,
  `${tw99Fullwidth("sha256:")}${SJ0N_HEX}`,
  `sha256:${"a".repeat(62)}ﬀ`,
  `sha²⁵⁶:${SJ0N_HEX}`,
  `sha256:${"ⓐ".repeat(64)}`,
];

test("tw99 X2 each of the six digest sites and six schema patterns refuses nine NFKC compatibility spellings of the clean digest that normalise to a clean digest yet differ as written, naming the member", () => {
  const values = tw99Values();
  assert.equal(values.length, 9, "X2 value count");
  assert.equal(new Set(values).size, 9, "X2 values are distinct");
  for (const value of values) {
    assert.notEqual(value, MLR8_DIGEST, `X2 ${JSON.stringify(value)} differs from the clean digest as written`);
    assert.match(value.normalize("NFKC"), /^sha256:[0-9a-f]{64}$/, `X2 ${JSON.stringify(value)} normalises to a clean digest`);
  }
  r8xDigestSitesRefuse(values, "tw99 X2");
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  const nodes: ReadonlyArray<readonly [string, Node]> = [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
  assert.equal(nodes.length, 6);
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});

// MechanicalWorkflows-qa1sm: 3bva OPTION (A) ruling, 4uf0 F2 follow-on. validateDecisionReceipt refuses DECISION_RECEIPT_MALFORMED, naming the
// member and the typeof, for a non-string value at every nonblank site and for a non-array proposed/admitted/executed/support list, and never
// throws. Before the ruling nonblank() called value.trim() and the list sites called .some(), so a decoded receipt carrying decisionId 7, actor.id
// null, support "land" or proposed [7] threw a TypeError instead of returning the refusal.
const QA1_SCALARS: ReadonlyArray<readonly [string, unknown, string]> = [
  ["number 7", 7, "number"],
  ["null", null, "object"],
  ["boolean true", true, "boolean"],
  ["undefined", undefined, "undefined"],
  ["empty object", {}, "object"],
  ["string array", ["land"], "object"],
];

test("qa1sm Q1 the four ruled rows refuse instead of throwing: decisionId 7, actor.id null, support \"land\", proposed [7]", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  assert.deepEqual(validateDecisionReceipt(base), { ok: true }, "the base receipt is well-formed");
  const rows: ReadonlyArray<readonly [string, Partial<DecisionReceipt>, RegExp, RegExp]> = [
    ["decisionId 7", { decisionId: 7 as unknown as string }, /decisionId/, /typeof number/],
    ["actor.id null", { actor: { ...base.actor, id: null as unknown as string } }, /actor\.id/, /typeof object/],
    ["support \"land\"", { support: "land" as unknown as readonly string[] }, /support/, /typeof string/],
    ["proposed [7]", { actions: { ...base.actions, proposed: [7] as unknown as string[] } }, /proposed/, /typeof number/],
  ];
  for (const [label, patch, member, typeName] of rows) {
    let outcome: ReturnType<typeof validateDecisionReceipt> | undefined;
    assert.doesNotThrow(() => { outcome = validateDecisionReceipt({ ...base, ...patch }); }, label);
    assert.equal(outcome?.ok, false, label);
    if (outcome === undefined || outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
    assert.match(outcome.detail, member, label);
    assert.match(outcome.detail, typeName, label);
  }
});

test("qa1sm Q2 every nonblank site refuses each non-string value without throwing, naming the member and the typeof", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const sites: ReadonlyArray<readonly [string, (value: unknown) => Partial<DecisionReceipt>, RegExp]> = [
    ["decisionId", value => ({ decisionId: value as string }), /decisionId/],
    ["actor.id", value => ({ actor: { ...base.actor, id: value as string } }), /actor\.id/],
    ["actor.revision", value => ({ actor: { ...base.actor, revision: value as string } }), /actor\.revision/],
    ["selector.id", value => ({ selector: { ...base.selector, id: value as string } }), /selector\.id/],
    ["selector.revision", value => ({ selector: { ...base.selector, revision: value as string } }), /selector\.revision/],
    ["completeness", value => ({ completeness: value as string }), /completeness/],
    ["resolverVerdict", value => ({ resolverVerdict: value as string }), /resolverVerdict/],
    ["verifierOutcome", value => ({ verifierOutcome: value as string }), /verifierOutcome/],
  ];
  assert.equal(sites.length, 8);
  for (const [site, apply, member] of sites) {
    for (const [name, value, typeName] of QA1_SCALARS) {
      const label = `${site} ${name}`;
      let outcome: ReturnType<typeof validateDecisionReceipt> | undefined;
      assert.doesNotThrow(() => { outcome = validateDecisionReceipt({ ...base, ...apply(value) }); }, label);
      assert.equal(outcome?.ok, false, label);
      if (outcome === undefined || outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, member, label);
      assert.match(outcome.detail, new RegExp(`typeof ${typeName}`), label);
    }
  }
});

test("qa1sm Q3 each id list refuses a non-array value and a non-string element without throwing, naming the list and the typeof", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  const lists: ReadonlyArray<readonly [string, (value: unknown) => Partial<DecisionReceipt>]> = [
    ["proposed", value => ({ actions: { ...base.actions, proposed: value as string[] } })],
    ["admitted", value => ({ actions: { ...base.actions, admitted: value as string[] } })],
    ["executed", value => ({ actions: { ...base.actions, executed: value as string[] } })],
    ["support", value => ({ support: value as string[] })],
  ];
  const nonArrays: ReadonlyArray<readonly [string, unknown, string]> = [
    ["string land", "land", "string"],
    ["number 7", 7, "number"],
    ["null", null, "object"],
    ["plain object", { length: 1 }, "object"],
  ];
  for (const [list, apply] of lists) {
    for (const [name, value, typeName] of nonArrays) {
      const label = `${list} ${name}`;
      let outcome: ReturnType<typeof validateDecisionReceipt> | undefined;
      assert.doesNotThrow(() => { outcome = validateDecisionReceipt({ ...base, ...apply(value) }); }, label);
      assert.equal(outcome?.ok, false, label);
      if (outcome === undefined || outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
      assert.match(outcome.detail, new RegExp(list), label);
      assert.match(outcome.detail, new RegExp(`not an array \\(typeof ${typeName}\\)`), label);
    }
    for (const [name, element, typeName] of QA1_SCALARS) {
      for (const index of [0, 1]) {
        const ids: unknown[] = ["land", "restack"];
        ids[index] = element;
        const label = `${list} element ${index} ${name}`;
        let outcome: ReturnType<typeof validateDecisionReceipt> | undefined;
        assert.doesNotThrow(() => { outcome = validateDecisionReceipt({ ...base, ...apply(ids) }); }, label);
        assert.equal(outcome?.ok, false, label);
        if (outcome === undefined || outcome.ok) continue;
        assert.equal(outcome.code, "DECISION_RECEIPT_MALFORMED", label);
        assert.match(outcome.detail, new RegExp(`${list}\\[${index}\\] is not a string \\(typeof ${typeName}\\)`), label);
      }
    }
  }
});

test("qa1sm Q4 the literal unknown still admits where a Maybe member allows it, and a non-array proposed refuses even for the string unknown", () => {
  const base = buildDecisionReceipts(episode)[0]!;
  assert.deepEqual(validateDecisionReceipt({ ...base, support: "unknown", actions: { ...base.actions, admitted: "unknown", executed: "unknown" } }), { ok: true });
  const outcome = validateDecisionReceipt({ ...base, actions: { ...base.actions, proposed: "unknown" as unknown as string[] } });
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.match(outcome.detail, /proposed is not an array \(typeof string\)/);
});

// MechanicalWorkflows-yosat (tw99 follow-up, lead survivors G01..G06 and S06): tw99 X2 pins nine NFKC compatibility spellings; six further spellings stay unpinned and
// normalise to a clean digest under NFKC yet differ as written: astral mathematical digits U+1D7CE in the body, small colon U+FE55 as the separator, superscript digits
// in the body, subscript 2/5/6 in the label, circled digits in the body, modifier-letter s/h/a in the label. A DIGEST class widened to admit any of them (or the six
// schema patterns mutated to admit the small colon) would pass every landed row.
const yosatValues = (): string[] => [
  `sha256:${"\u{1D7CE}".repeat(64)}`,
  `sha256﹕${SJ0N_HEX}`,
  `sha256:${"²".repeat(64)}`,
  `sha₂₅₆:${SJ0N_HEX}`,
  `sha256:${"①".repeat(64)}`,
  `ˢʰᵃ256:${SJ0N_HEX}`,
];

const yosatSchemaNodes = (): ReadonlyArray<readonly [string, { oneOf?: Array<{ pattern?: string }> }]> => {
  type Node = { oneOf?: Array<{ pattern?: string }> };
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as { properties: { gp: { properties: Record<string, Node> } } & Record<string, Node> };
  return [
    ["gp.graphHash", schema.properties.gp.properties.graphHash!],
    ["gp.programHash", schema.properties.gp.properties.programHash!],
    ["gp.checkpointHash", schema.properties.gp.properties.checkpointHash!],
    ["gp.snapshotHash", schema.properties.gp.properties.snapshotHash!],
    ["featureProjectionDigest", schema.properties.featureProjectionDigest!],
    ["sourceReceipt", schema.properties.sourceReceipt!],
  ];
};

test("yosat X1 each of the six digest sites refuses six further NFKC compatibility spellings of the clean digest (astral digits, small colon, superscript body, subscript label, circled body, modifier-letter label), naming the member", () => {
  const values = yosatValues();
  assert.equal(values.length, 6, "X1 value count");
  assert.equal(new Set(values).size, 6, "X1 values are distinct");
  const tw99 = new Set(tw99Values());
  for (const value of values) {
    const shown = JSON.stringify(value);
    assert.notEqual(value, MLR8_DIGEST, `X1 ${shown} differs from the clean digest as written`);
    assert.equal(tw99.has(value), false, `X1 ${shown} is disjoint from the tw99 nine`);
    assert.equal(value.normalize("NFC"), value, `X1 ${shown} is NFC-stable`);
    assert.match(value.normalize("NFKC"), /^sha256:[0-9a-f]{64}$/, `X1 ${shown} normalises to a clean digest`);
  }
  r8xDigestSitesRefuse(values, "yosat X1");
});

test("yosat X2 each of the six schema digest patterns compiled as written accepts the clean digest and refuses the six yosat NFKC compatibility spellings", () => {
  const values = yosatValues();
  assert.equal(values.length, 6, "X2 value count");
  const nodes = yosatSchemaNodes();
  assert.equal(nodes.length, 6);
  for (const [name, node] of nodes) {
    const source = node.oneOf?.[0]?.pattern;
    assert.equal(typeof source, "string", `${name} first oneOf branch carries a pattern`);
    const compiled = new RegExp(source!);
    assert.equal(compiled.test(MLR8_DIGEST), true, `${name} accepts the clean digest`);
    for (const value of values) assert.equal(compiled.test(value), false, `${name} refuses ${JSON.stringify(value)}`);
  }
});
