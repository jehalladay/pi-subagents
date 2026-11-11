// MechanicalWorkflows-h76b (APO-EAT-R010): 'deterministic fallback' is defined once, in
// 04-hld-ownership.md line 16, as a pre-declared policy id@revision recorded as decisionSource
// 'fallback'. The mw.coordination-decision.v1 sidecar enumerates decisionSource in
// {mp, fallback, unknown} and requires fallbackPolicy when the source is 'fallback'; docs 08 and 12
// point at the one definition; a basis or checkpoint mismatch is a refusal and never a fallback.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCoordinationDecision, adaptMicroPolicyDecision } from "../dist/index.js";
import type { CoordinationDecision, MicroPolicyDecisionReceipt } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const docDir = join(here, "../../../docs/programs/adaptive-policy-organizations-2026-10-18");
const docLine = (file: string, line: number): string => readFileSync(join(docDir, file), "utf8").split("\n")[line - 1] ?? "";

const decision = (over: Record<string, unknown> = {}): CoordinationDecision => ({
  schema: "mw.coordination-decision.v1",
  version: 1,
  decisionId: "decision:7:0",
  intentId: "mp-adapter:mp:decision:7:0:restack",
  graphId: "unknown",
  actorId: "lane",
  nodeId: "unknown",
  observationDigest: "sha256:" + "a".repeat(64),
  readSet: ["artifact:candidate:restack"],
  policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) },
  vocabulary: ["restack", "pause", "forbidden"],
  support: ["restack", "pause"],
  sampled: { id: "restack", logProb: -0.356 },
  rng: { streamId: "fmix32-mp1:7:42" },
  prestate: { memoryRevision: "unknown" },
  nativeOutcomeRef: "unknown",
  mode: "fixture",
  feedback: { status: "unknown", reward: "unknown" },
  ...over,
}) as CoordinationDecision;

test("decisionSource is the closed enum {mp, fallback, unknown}; a record without the member stays valid", () => {
  assert.deepEqual(validateCoordinationDecision(decision()), { ok: true });
  for (const source of ["mp", "unknown"]) {
    assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: source })), { ok: true }, source);
  }
  for (const bad of ["live", "Fallback", "", 7, null]) {
    const outcome = validateCoordinationDecision(decision({ decisionSource: bad }));
    assert.equal(outcome.ok, false, String(bad));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", String(bad));
    assert.match(outcome.detail, /decisionSource/);
  }
});

test("decisionSource fallback requires a pre-declared fallbackPolicy id@revision", () => {
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: "landing-queue-greedy@3" })), { ok: true });
  // jv1g W2: the accepted side of POLICY_REF takes a dotted v-prefixed revision and an alphanumeric revision.
  for (const accepted of ["landing-queue-greedy@v3.1", "greedy@3a"]) {
    assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: accepted })), { ok: true }, accepted);
  }
  // h76b successor gaor: whitespace in the revision part (t1), and a non-string policy (t2), also refuse.
  const nonString = ["greedy@3"] as unknown as string;
  for (const policy of [undefined, "", "   ", "greedy", "greedy@", "@3", "a@b@c", "gre edy@3", "greedy@ 3", "greedy@3 ", nonString]) {
    const outcome = validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: policy }));
    assert.equal(outcome.ok, false, String(policy));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", String(policy));
    assert.match(outcome.detail, /fallbackPolicy/);
  }
});

test("a fallbackPolicy beside a non-fallback source is refused, so the field cannot masquerade", () => {
  // t3: an empty-string fallbackPolicy beside decisionSource mp is a masquerade too, not an absent member.
  const empty = validateCoordinationDecision(decision({ decisionSource: "mp", fallbackPolicy: "" }));
  assert.equal(empty.ok, false, "empty fallbackPolicy beside mp");
  if (!empty.ok) {
    assert.equal(empty.code, "DECISION_SIDECAR_MALFORMED");
    assert.match(empty.detail, /fallbackPolicy/);
  }
  // jv1g W4: a null fallbackPolicy is present, not absent, so it refuses beside mp, unknown and no source.
  for (const source of ["mp", "unknown", undefined]) {
    const nullPolicy = validateCoordinationDecision(decision({ decisionSource: source, fallbackPolicy: null }));
    assert.equal(nullPolicy.ok, false, `null fallbackPolicy beside ${String(source)}`);
    if (!nullPolicy.ok) {
      assert.equal(nullPolicy.code, "DECISION_SIDECAR_MALFORMED", String(source));
      assert.match(nullPolicy.detail, /fallbackPolicy/, String(source));
    }
  }
  for (const source of ["mp", "unknown", undefined]) {
    const outcome = validateCoordinationDecision(decision({ decisionSource: source, fallbackPolicy: "landing-queue-greedy@3" }));
    assert.equal(outcome.ok, false, String(source));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED");
    assert.match(outcome.detail, /fallbackPolicy/);
  }
});

test("the JSON schema enumerates decisionSource and requires fallbackPolicy for 'fallback'", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as {
    required: string[];
    properties: { decisionSource: { enum: string[] }; fallbackPolicy: { type: string; pattern: string } };
    allOf: { if: { properties: { decisionSource: { const: string } }; required: string[] }; then: { required: string[] }; else?: unknown }[];
  };
  assert.deepEqual([...schema.properties.decisionSource.enum].sort(), ["fallback", "mp", "unknown"]);
  assert.ok(!schema.required.includes("decisionSource"), "additive: pinned sidecar fixtures stay valid");
  assert.ok(new RegExp(schema.properties.fallbackPolicy.pattern).test("greedy@3"));
  assert.ok(!new RegExp(schema.properties.fallbackPolicy.pattern).test("greedy"));
  // jv1g W1: the schema half of the non-string law; the member is typed string.
  assert.equal(schema.properties.fallbackPolicy.type, "string");
  const rule = schema.allOf.find(entry => entry.if.properties.decisionSource.const === "fallback");
  assert.ok(rule, "an if decisionSource is fallback rule exists");
  assert.deepEqual(rule.then.required, ["fallbackPolicy"]);
  // s2: the if guard requires decisionSource, so a record without it never demands fallbackPolicy.
  assert.deepEqual(rule.if.required, ["decisionSource"]);
  // s1: the else branch forbids fallbackPolicy beside every non-fallback source.
  assert.deepEqual(rule.else, { not: { required: ["fallbackPolicy"] } });
  // s3: the schema pattern mirrors the TypeScript POLICY_REF law row for row.
  const pattern = new RegExp(schema.properties.fallbackPolicy.pattern);
  // jv1g W3: the accepted side of the row-for-row mirror.
  for (const good of ["landing-queue-greedy@v3.1", "greedy@3a"]) {
    assert.ok(pattern.test(good), `pattern must accept ${JSON.stringify(good)}`);
  }
  for (const bad of ["@3", "a@b@c", "gre edy@3", "greedy@", "greedy@ 3", "greedy@3 ", ""]) {
    assert.ok(!pattern.test(bad), `pattern must reject ${JSON.stringify(bad)}`);
  }
});

test("04 L16, 08 L13 and 12 L20 each name decisionSource and the two later ones point at the one definition", () => {
  const definition = docLine("04-hld-ownership.md", 16);
  assert.match(definition, /decisionSource/);
  assert.match(definition, /id@revision/);
  for (const [file, line] of [["08-micropolicy-adapter.md", 13], ["12-delivery-stages.md", 20]] as const) {
    const text = docLine(file, line);
    assert.match(text, /decisionSource/, `${file} L${line}`);
    assert.match(text, /04-hld-ownership\.md L16|04 L16/, `${file} L${line} points to the definition`);
  }
  const defining = readFileSync(join(docDir, "04-hld-ownership.md"), "utf8").split("\n").filter(line => /deterministic fallback \(=/.test(line));
  assert.equal(defining.length, 1, "the definition appears once in 04");
});

test("a basis or checkpoint mismatch is a refusal and no fallback decisionSource appears", () => {
  const PIN = "sha256:" + "c".repeat(64);
  const f64 = (n: number): string => { const b = Buffer.alloc(8); b.writeDoubleBE(n); return b.toString("hex"); };
  const receipt: MicroPolicyDecisionReceipt = {
    schema: "micropolicy.decision-receipt.v1", decisionId: "decision:7:0", backend: "reference",
    programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "d".repeat(64),
    selection: {
      choices: [{ action: "restack", probability: f64(1), eligible: true }], action: "restack",
      rng: { algorithm: "fmix32-mp1", seed: 7, draw: 42 }, probability: f64(1), logProbability: f64(0),
    },
  };
  let reconciled = 0;
  let sampled = 0;
  const outcome = adaptMicroPolicyDecision({
    basis: { workspaceId: "ws", revision: "r1" }, budget: { compute: 3, workers: 3, queue: 3, latencyMs: 100 },
    protectedScopes: [], policyId: "mp-adapter", pinnedCheckpoint: PIN, capability: { checkpointDigest: PIN },
    receipt, sampleDecision: () => { sampled += 1; return receipt; },
    action: id => ({ target: { kind: "artifact", uri: `candidate:${id}` }, effect: `landing.${id}`, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: [] }),
    reconcile: () => { reconciled += 1; throw new Error("reconcile must not run"); },
  });
  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.equal(outcome.code, "ADAPTER_CHECKPOINT_MISMATCH");
  assert.equal(reconciled, 0);
  assert.equal(sampled, 0, "a mismatch never resamples");
  assert.doesNotMatch(JSON.stringify(outcome), /decisionSource|fallback/);
});

// MechanicalWorkflows-7ng4 (jv1g follow-up, test-only): the regex whitespace class at both POLICY_REF parts and at the schema
// pattern, the TypeScript/schema row-for-row mirror on one shared corpus, and non-string present fallbackPolicy values.
const schemaFallbackPattern = (): RegExp => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as { properties: { fallbackPolicy: { pattern: string } } };
  return new RegExp(schema.properties.fallbackPolicy.pattern);
};
// Every BMP code point the live \s matches, enumerated at run time (the uv7v method in package-purity.test.ts).
const bmpWhitespace: string[] = Array.from({ length: 0x10000 }, (_, i) => String.fromCharCode(i)).filter(ch => /\s/.test(ch));
const codePointLabel = (ch: string): string => "U+" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
// Six placements per whitespace code point: leading, trailing, inside the id, inside the revision, directly before and directly after the @.
const whitespacePlacements = (ch: string): string[] => [
  ch + "greedy@3", "greedy@3" + ch, "gre" + ch + "edy@3", "greedy@1" + ch + "3", "greedy" + ch + "@3", "greedy@" + ch + "3",
];
const fallbackOutcome = (policy: unknown): ReturnType<typeof validateCoordinationDecision> =>
  validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: policy }));

test("7ng4 W01 the live whitespace class has 25 BMP members and POLICY_REF refuses each at all six placements beside fallback", () => {
  assert.equal(bmpWhitespace.length, 25, "the live \\s matches 25 BMP code points");
  for (const required of ["\t", " ", " ", "﻿"]) assert.ok(bmpWhitespace.includes(required), codePointLabel(required));
  let checked = 0;
  for (const ch of bmpWhitespace) {
    for (const policy of whitespacePlacements(ch)) {
      const outcome = fallbackOutcome(policy);
      assert.equal(outcome.ok, false, `${codePointLabel(ch)} in ${JSON.stringify(policy)}`);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", codePointLabel(ch));
      assert.match(outcome.detail, /fallbackPolicy/, codePointLabel(ch));
      checked += 1;
    }
  }
  assert.equal(checked, 150, "25 code points at six placements");
});

test("7ng4 W02 the schema fallbackPolicy pattern refuses the same 150 whitespace strings", () => {
  const pattern = schemaFallbackPattern();
  let refused = 0;
  for (const ch of bmpWhitespace) {
    for (const policy of whitespacePlacements(ch)) {
      assert.ok(!pattern.test(policy), `${codePointLabel(ch)} in ${JSON.stringify(policy)}`);
      refused += 1;
    }
  }
  assert.equal(refused, 150);
});

test("7ng4 W03 the TypeScript POLICY_REF law and the schema pattern agree on one 174-member corpus (agreement only, no id grammar claim)", () => {
  const pattern = schemaFallbackPattern();
  const fixed = [
    "greedy@3", "landing-queue-greedy@3", "landing-queue-greedy@v3.1", "greedy@3a", "Greedy@3", "GREEDY@V3", "greedy_2@3", "greedy.x@3",
    "a/b@3", "a:b@3", "grëedy@3", "贪心@3", "3@3", "greedy@v1.2", "greedy@abc", "a@b", "@3", "greedy@", "greedy", "a@b@c", "",
    "gre edy@3", "greedy@ 3", "greedy@3 ",
  ];
  assert.equal(fixed.length, 24);
  const corpus = [...fixed, ...bmpWhitespace.flatMap(whitespacePlacements)];
  assert.equal(corpus.length, 174);
  // The three hand-written U+0020 rows repeat three generated placements, so 171 distinct strings sit in the 174 members.
  assert.equal(new Set(corpus).size, 171, "171 distinct strings");
  let accepted = 0;
  for (const member of corpus) {
    const typescript = fallbackOutcome(member).ok;
    assert.equal(typescript, pattern.test(member), `TypeScript ${typescript} vs schema ${pattern.test(member)} for ${JSON.stringify(member)}`);
    if (typescript) accepted += 1;
  }
  assert.ok(accepted >= 10 && accepted < 174, `non-vacuous mirror: ${accepted} of 174 accepted`);
});

test("7ng4 W04 a non-string present fallbackPolicy refuses beside mp, unknown and no decisionSource member", () => {
  const present: unknown[] = [0, 3, false, true, [], ["landing-queue-greedy@3"], {}, { id: "greedy", revision: 3 }];
  const sources: (string | undefined)[] = ["mp", "unknown", undefined];
  let refused = 0;
  for (const source of sources) {
    for (const value of present) {
      const over: Record<string, unknown> = { fallbackPolicy: value };
      if (source !== undefined) over.decisionSource = source;
      const outcome = validateCoordinationDecision(decision(over));
      const label = `${JSON.stringify(value)} beside ${source ?? "no decisionSource"}`;
      assert.equal(outcome.ok, false, label);
      if (outcome.ok) continue;
      assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", label);
      assert.match(outcome.detail, /fallbackPolicy/, label);
      refused += 1;
    }
  }
  assert.equal(refused, 24, "8 values at 3 sources");
});

// MechanicalWorkflows-4efd (7ng4 follow-up, test-only): the TypeScript POLICY_REF law and the schema fallbackPolicy pattern keep
// agreeing just outside the whitespace class and on long id and revision parts. Both sides accept these members today; the rows
// pin agreement only (no id grammar claim, the same stance as 7ng4 W03), so a two-sided change passes and a one-sided one fails.
// Six code points just outside the live \s class: C0 NUL and US, NEL, the Mongolian vowel separator, ZWSP and the word joiner.
const outsideWhitespace: string[] = ["\u0000", "\u001F", "\u0085", "᠎", "​", "⁠"];
const agreement = (member: string): { typescript: boolean; schema: boolean } => ({ typescript: fallbackOutcome(member).ok, schema: schemaFallbackPattern().test(member) });

test("4efd R1 the TypeScript POLICY_REF law and the schema pattern agree on six code points just outside the whitespace class at six placements", () => {
  // Guard: none of the six is a live \s member, so the 7ng4 W01 and W02 rows never cover them.
  for (const ch of outsideWhitespace) assert.ok(!bmpWhitespace.includes(ch), `${codePointLabel(ch)} sits outside the live whitespace class`);
  const members = outsideWhitespace.flatMap(whitespacePlacements);
  assert.equal(members.length, 36, "6 code points at six placements");
  assert.equal(new Set(members).size, 36, "36 distinct strings");
  for (const member of members) {
    const { typescript, schema } = agreement(member);
    assert.equal(typescript, schema, `TypeScript ${typescript} vs schema ${schema} for ${JSON.stringify(member)}`);
  }
});

test("4efd R2 the TypeScript POLICY_REF law and the schema pattern agree on id and revision parts of 31 to 200 characters", () => {
  const part = (length: number): string => "a".repeat(length);
  const members = [
    part(31) + "@3", part(32) + "@3", part(33) + "@3", "greedy@" + part(31), "greedy@" + part(32), "greedy@" + part(33),
    part(64) + "@" + part(64), part(200) + "@" + part(200),
  ];
  assert.equal(members.length, 8);
  for (const member of members) {
    const { typescript, schema } = agreement(member);
    assert.equal(typescript, schema, `TypeScript ${typescript} vs schema ${schema} for a ${member.length}-character member`);
  }
});

// MechanicalWorkflows-35ow (4efd follow-up, test-only, the closing layer): the TypeScript POLICY_REF law and the schema
// fallbackPolicy pattern keep agreeing over every BMP code unit at two interior placements and over every part length from 1 to
// 600 plus three far caps. Agreement only (no id grammar claim, the same stance as 7ng4 W03 and 4efd R1 and R2): a two-sided
// change passes and a one-sided code-point or length-cap hardening fails.
test("35ow R1 the TypeScript POLICY_REF law and the schema pattern agree on every BMP code unit inside the id and inside the revision", () => {
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let unit = 0; unit < 0x10000; unit += 1) {
    const ch = String.fromCharCode(unit);
    for (const member of ["gre" + ch + "edy@3", "greedy@1" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${codePointLabel(ch)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 131072, "65536 code units at two interior placements");
  assert.ok(accepted > 100000 && accepted < members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("35ow R2 the TypeScript POLICY_REF law and the schema pattern agree on every id and revision part length 1 to 600 and at 1000, 4096 and 65536", () => {
  const pattern = schemaFallbackPattern();
  const lengths = [...Array.from({ length: 600 }, (_, i) => i + 1), 1000, 4096, 65536];
  assert.equal(lengths.length, 603);
  let members = 0;
  let accepted = 0;
  for (const length of lengths) {
    const part = "a".repeat(length);
    for (const member of [part + "@3", "greedy@" + part]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `a ${length}-character part in ${member.length}-character member: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 1206, "603 lengths as an id part and as a revision part");
  assert.ok(accepted >= 1, "non-vacuous mirror: at least one member accepted");
});

// MechanicalWorkflows-phu4 (35ow follow-up, test-only, the astral, edge-placement and far-cap layer): the TypeScript POLICY_REF law
// and the schema fallbackPolicy pattern keep agreeing over supplementary code points at the two interior placements, over every BMP
// code unit at the four placements 35ow R1 leaves out, and over id and revision parts past 65536 characters. Agreement only (no id
// grammar claim, the same stance as 7ng4 W03, 4efd R1 and R2 and 35ow R1 and R2): a two-sided change passes and a one-sided
// astral, edge or cap hardening fails. Each row compares the TypeScript verdict with the schema pattern verdict member by member.
const mirrorCodePointLabel = (cp: number): string => "U+" + cp.toString(16).toUpperCase().padStart(4, "0");

test("phu4 R1 the TypeScript POLICY_REF law and the schema pattern agree on sampled supplementary code points inside the id and inside the revision", () => {
  // Sample form (the lead's W1): every 16th supplementary code point plus all of plane 14, U+1BCA0..U+1BCA3, U+1D173..U+1D17A and the
  // 32 plane-end noncharacters. Instrument limit: a sample cannot kill an off-sample one-sided refusal such as U+1F601; odc7 Y1 closes it.
  const sample = new Set<number>();
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 16) sample.add(cp);
  for (let cp = 0xe0000; cp <= 0xeffff; cp += 1) sample.add(cp);
  for (let cp = 0x1bca0; cp <= 0x1bca3; cp += 1) sample.add(cp);
  for (let cp = 0x1d173; cp <= 0x1d17a; cp += 1) sample.add(cp);
  for (let plane = 1; plane <= 16; plane += 1) {
    sample.add(plane * 0x10000 + 0xfffe);
    sample.add(plane * 0x10000 + 0xffff);
  }
  // Guard: the mutant targets are members of the sample and every member is a supplementary code point.
  for (const target of [0xe0001, 0x1d173, 0x1f600]) assert.ok(sample.has(target), `${mirrorCodePointLabel(target)} sits in the sample`);
  for (const cp of sample) assert.ok(cp >= 0x10000 && cp <= 0x10ffff, mirrorCodePointLabel(cp));
  assert.equal(sample.size, 127017, "sampled supplementary code points");
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (const cp of sample) {
    const ch = String.fromCodePoint(cp);
    for (const member of ["gre" + ch + "edy@3", "greedy@1" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 254034, "sampled code points at two interior placements");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("phu4 R2 the TypeScript POLICY_REF law and the schema pattern agree on every BMP code unit leading, trailing, directly before and directly after the @", () => {
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let unit = 0; unit < 0x10000; unit += 1) {
    const ch = String.fromCharCode(unit);
    for (const member of [ch + "greedy@3", "greedy@3" + ch, "greedy" + ch + "@3", "greedy@" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${codePointLabel(ch)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 262144, "65536 code units at four edge placements");
  assert.ok(accepted > 100000 && accepted < members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("phu4 R3 the TypeScript POLICY_REF law and the schema pattern agree on id and revision parts of 65537, 131072 and 1048576 characters", () => {
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (const length of [65537, 131072, 1048576]) {
    const part = "a".repeat(length);
    for (const member of [part + "@3", "greedy@" + part]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `a ${length}-character part in ${member.length}-character member: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 6, "3 lengths as an id part and as a revision part");
  assert.ok(accepted >= 1, "non-vacuous mirror: at least one member accepted");
});

// MechanicalWorkflows-odc7 (phu4 follow-up, test-only, the astral edge and every-code-point layer): phu4 R1 holds a surrogate pair only
// inside the id and inside the revision, and samples one supplementary code point in sixteen. X1 moves the same sample to the four
// edge placements; Y1 walks every supplementary code point at the two interior placements, which closes the off-sample instrument limit
// the phu4 R1 comment names (U+1F601). Agreement only (no id grammar claim, the stance of phu4 R1 to R3): a two-sided change passes
// and a one-sided surrogate-pair refusal at an edge or at an off-sample code point fails.
test("odc7 X1 the TypeScript POLICY_REF law and the schema pattern agree on sampled supplementary code points leading, trailing, directly before and directly after the @", () => {
  // Same sample construction as phu4 R1 (127017 members), placed at the four edge placements phu4 R2 walks for BMP code units.
  const sample = new Set<number>();
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 16) sample.add(cp);
  for (let cp = 0xe0000; cp <= 0xeffff; cp += 1) sample.add(cp);
  for (let cp = 0x1bca0; cp <= 0x1bca3; cp += 1) sample.add(cp);
  for (let cp = 0x1d173; cp <= 0x1d17a; cp += 1) sample.add(cp);
  for (let plane = 1; plane <= 16; plane += 1) {
    sample.add(plane * 0x10000 + 0xfffe);
    sample.add(plane * 0x10000 + 0xffff);
  }
  for (const target of [0xe0001, 0x1d173, 0x1f600]) assert.ok(sample.has(target), `${mirrorCodePointLabel(target)} sits in the sample`);
  for (const cp of sample) assert.ok(cp >= 0x10000 && cp <= 0x10ffff, mirrorCodePointLabel(cp));
  assert.equal(sample.size, 127017, "sampled supplementary code points");
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (const cp of sample) {
    const ch = String.fromCodePoint(cp);
    for (const member of [ch + "greedy@3", "greedy@3" + ch, "greedy" + ch + "@3", "greedy@" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 508068, "sampled code points at four edge placements");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("odc7 Y1 the TypeScript POLICY_REF law and the schema pattern agree on every supplementary code point inside the id and inside the revision", () => {
  // Chosen form: the full walk, not a class-shape proof, because it leaves no off-sample code point (U+1F601) unpinned and needs no
  // argument about the shape of a one-sided class. Cost: 2097152 members, about 8.5 s at the clean tree, so it stays one row.
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 1) {
    const ch = String.fromCodePoint(cp);
    for (const member of ["gre" + ch + "edy@3", "greedy@1" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 2097152, "1048576 supplementary code points at two interior placements");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

// MechanicalWorkflows-k10s (odc7 follow-up, test-only, the off-sample edge and whole-part layer): odc7 X1 holds only the phu4 R1 sample at
// the four edge placements and odc7 Y1 walks every supplementary code point at the two interior placements only, so a one-sided refusal of
// an off-sample pair at an edge (U+1F601 leading, U+1F601 trailing, U+10001 directly before the @, U+10FFFD directly after the @) stays
// green. Every landed astral member also carries ASCII letters inside its part, so a one-sided refusal of a part that is exactly one
// surrogate pair stays green too. Agreement only (no id grammar claim, the stance of phu4 R1 to R3 and odc7 X1 and Y1): a two-sided
// change passes and a one-sided edge, off-sample or whole-part surrogate-pair refusal fails. Chosen form: the full walks, not a class-shape proof.
test("k10s X1 the TypeScript POLICY_REF law and the schema pattern agree on every supplementary code point leading, trailing, directly before and directly after the @", () => {
  // Cost: 4194304 members, about 14 s at the clean tree, so it stays one row.
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 1) {
    const ch = String.fromCodePoint(cp);
    for (const member of [ch + "greedy@3", "greedy@3" + ch, "greedy" + ch + "@3", "greedy@" + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 4194304, "1048576 supplementary code points at four edge placements");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("k10s X2 the TypeScript POLICY_REF law and the schema pattern agree on every supplementary code point as the whole id and as the whole revision", () => {
  // Cost: 2097152 members, about 7 s at the clean tree. The pair stands alone in its part, with no ASCII letter beside it.
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 1) {
    const ch = String.fromCodePoint(cp);
    for (const member of [ch + "@3", "greedy@" + ch]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 2097152, "1048576 supplementary code points as the whole id and as the whole revision");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

// MechanicalWorkflows-ld01 (k10s follow-up, test-only, the whole-part BMP, both-parts-whole and adjacent-pair layer): every landed
// non-ASCII BMP member keeps ASCII letters inside its part (35ow R1, phu4 R2), k10s X2 makes the pair whole in ONE part only, and no landed
// member carries two supplementary code points, so a one-sided refusal of an id that is exactly one non-ASCII BMP code unit, of a
// revision that is exactly U+00E9, of a member whose id and revision are each exactly one surrogate pair, or of two adjacent surrogate
// pairs stays green. Agreement only (no id grammar claim, the stance of k10s X1 and X2): a two-sided change passes and a one-sided
// whole-part, both-parts-whole or adjacent-pair refusal fails. Chosen form: the full walks, not a class-shape proof.
test("ld01 X01 the TypeScript POLICY_REF law and the schema pattern agree on every BMP code unit as the whole id and as the whole revision", () => {
  // Cost: 131072 members, under 1 s at the clean tree. The unit stands alone in its part, with no ASCII letter beside it.
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let unit = 0; unit < 0x10000; unit += 1) {
    const ch = String.fromCharCode(unit);
    for (const member of [ch + "@3", "greedy@" + ch]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(unit)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 131072, "65536 BMP code units as the whole id and as the whole revision");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("ld01 X02 the TypeScript POLICY_REF law and the schema pattern agree on every supplementary code point as the whole id and the whole revision at once", () => {
  // Cost: 1048576 members, about 3 s at the clean tree. The pair stands alone in BOTH parts (k10s X2 makes it whole in one part only).
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 1) {
    const ch = String.fromCodePoint(cp);
    const member = ch + "@" + ch;
    const typescript = fallbackOutcome(member).ok;
    const schema = pattern.test(member);
    assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
    members += 1;
    if (typescript) accepted += 1;
  }
  assert.equal(members, 1048576, "1048576 supplementary code points as the whole id and the whole revision");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

test("ld01 X03 the TypeScript POLICY_REF law and the schema pattern agree on every supplementary code point doubled inside the id and inside the revision", () => {
  // Cost: 2097152 members, about 6.5 s at the clean tree. Two adjacent surrogate pairs sit in one part.
  const pattern = schemaFallbackPattern();
  let members = 0;
  let accepted = 0;
  for (let cp = 0x10000; cp <= 0x10ffff; cp += 1) {
    const ch = String.fromCodePoint(cp);
    for (const member of ["gre" + ch + ch + "edy@3", "greedy@1" + ch + ch + "3"]) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(typescript, schema, `${mirrorCodePointLabel(cp)} in ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      members += 1;
      if (typescript) accepted += 1;
    }
  }
  assert.equal(members, 2097152, "1048576 supplementary code points doubled at two interior placements");
  assert.ok(accepted > 0 && accepted <= members, `non-vacuous mirror: ${accepted} of ${members} accepted`);
});

// MechanicalWorkflows-7kc8 (ld01 follow-up, test-only, the terminal layer of the POLICY_REF mirror lineage): the identity pin
// makes every one-sided change to the TypeScript literal or the schema pattern fail at once (lead R01..R03 and any later
// placement x multiplicity shape), so no further per-shape walk rows follow; a two-sided identical change passes by the
// agreement-only design (lead EQ1).
test("7kc8 T25 the built POLICY_REF literal and the src literal each equal the schema fallbackPolicy pattern text with no flags", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as { properties: { fallbackPolicy: { pattern: string } } };
  const schemaPattern = schema.properties.fallbackPolicy.pattern;
  const sites: ReadonlyArray<readonly [string, string]> = [["dist", "../dist/coordination-decision.js"], ["src", "../src/coordination-decision.ts"]];
  let literals = 0;
  for (const [label, rel] of sites) {
    const text = readFileSync(join(here, rel), "utf8");
    const matches = Array.from(text.matchAll(/^const POLICY_REF = \/(.*)\/([a-z]*);$/gm));
    assert.equal(matches.length, 1, `${label}: exactly one POLICY_REF literal`);
    assert.equal((text.match(/\bPOLICY_REF\s*=/g) ?? []).length, 1, `${label}: exactly one POLICY_REF assignment`);
    const [, source, flags] = matches[0] as RegExpMatchArray;
    assert.equal(flags, "", `${label}: POLICY_REF carries no flags`);
    assert.equal(source, schemaPattern, `${label}: literal text equals the schema fallbackPolicy pattern`);
    assert.equal(new RegExp(source as string).source, new RegExp(schemaPattern).source, `${label}: compiled source equals the schema pattern source`);
    literals += 1;
  }
  assert.equal(literals, 2, "the built dist and the src were both read");
  assert.equal(fallbackOutcome("greedy@3").ok, true, "non-vacuous: an accepted member");
  assert.equal(new RegExp(schemaPattern).test("greedy@3"), true, "non-vacuous: the schema accepts the same member");
  assert.equal(fallbackOutcome("greedy").ok, false, "non-vacuous: a refused member");
  assert.equal(new RegExp(schemaPattern).test("greedy"), false, "non-vacuous: the schema refuses the same member");
});

// MechanicalWorkflows-dzc9 (7kc8 follow-up, test-only, the use-site and schema-keyword layer): T25 pins the POLICY_REF literal
// against the schema pattern text; these rows pin its one application and the schema member's keyword set, so a one-sided
// change to the use-site clause (shape, length cap, mode gate) or a new schema keyword (minLength, format, enum) fails at once.
test("dzc9 Y04 the built dist and the src each hold the one POLICY_REF use-site clause verbatim and name POLICY_REF exactly twice", () => {
  const clause = 'if (decision.decisionSource === "fallback" && !(typeof decision.fallbackPolicy === "string" && POLICY_REF.test(decision.fallbackPolicy)))';
  const sites: ReadonlyArray<readonly [string, string]> = [["dist", "../dist/coordination-decision.js"], ["src", "../src/coordination-decision.ts"]];
  let read = 0;
  for (const [label, rel] of sites) {
    const text = readFileSync(join(here, rel), "utf8");
    assert.equal(text.split(clause).length - 1, 1, `${label}: the use-site clause occurs exactly once`);
    assert.equal((text.match(/\bPOLICY_REF\b/g) ?? []).length, 2, `${label}: POLICY_REF is named exactly twice (the literal and its one application)`);
    read += 1;
  }
  assert.equal(read, 2, "the built dist and the src were both read");
  assert.equal(fallbackOutcome("greedy@3").ok, true, "non-vacuous: an accepted member");
  assert.equal(fallbackOutcome("greedy").ok, false, "non-vacuous: a refused member");
});

test("dzc9 Y03 the schema fallbackPolicy member carries exactly the keywords pattern and type", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as { properties: { fallbackPolicy: Record<string, unknown> } };
  assert.deepEqual(Object.keys(schema.properties.fallbackPolicy).sort(), ["pattern", "type"], "no length, format or enum keyword beside the pattern");
  assert.equal(schema.properties.fallbackPolicy["type"], "string", "the member stays a string");
  assert.equal(typeof schema.properties.fallbackPolicy["pattern"], "string", "the pattern stays a string");
});

test("dzc9 Y02 the TypeScript law and the schema pattern agree on a fallback decision recorded under every episode mode", () => {
  const pattern = schemaFallbackPattern();
  let rows = 0;
  for (const mode of ["fixture", "replay", "live"]) {
    for (const member of ["greedy@3", "greedy@v3.1", "greedy", "@3", "greedy@", "gre edy@3", "a@b@c"]) {
      const typescript = validateCoordinationDecision(decision({ mode, decisionSource: "fallback", fallbackPolicy: member })).ok;
      assert.equal(typescript, pattern.test(member), `${mode} ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${pattern.test(member)}`);
      rows += 1;
    }
  }
  assert.equal(rows, 21, "three modes by seven members");
  assert.equal(validateCoordinationDecision(decision({ mode: "live", decisionSource: "fallback", fallbackPolicy: "greedy@3" })).ok, true, "non-vacuous: live accepts a well-formed policy");
  assert.equal(validateCoordinationDecision(decision({ mode: "live", decisionSource: "fallback", fallbackPolicy: "greedy" })).ok, false, "non-vacuous: live refuses a malformed policy");
});

// MechanicalWorkflows-gbal (dzc9 follow-up, test-only, the refusal-detail and agreement layer): the landed refusal rows match
// the detail only against /fallbackPolicy/, so aliasing the two details survives; these rows pin both details as whole
// messages and extend agreement to 4194304-character parts and to the astral shapes the earlier leads named. Agreement-only
// stance: a two-sided change passes, a one-sided guard fails, and no row claims an id grammar.
const FALLBACK_REFUSAL = "decisionSource fallback requires a fallbackPolicy of the form id@revision";
const PRESENCE_REFUSAL = "fallbackPolicy is present but decisionSource is not fallback";

test("gbal R1 the fallback-requires-policy refusal carries its whole detail for five refused members, and a well-formed member validates", () => {
  let refused = 0;
  for (const member of [undefined, "greedy", "@3", "a@b@c", "gre edy@3"]) {
    assert.deepEqual(fallbackOutcome(member), { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: FALLBACK_REFUSAL }, String(member));
    refused += 1;
  }
  assert.equal(refused, 5, "five refused members");
  assert.deepEqual(fallbackOutcome("greedy@3"), { ok: true }, "non-vacuous: a well-formed member validates");
});

test("gbal R2 the policy-beside-non-fallback refusal carries its whole detail for four members, and a record without the member validates", () => {
  const refusedRecords: ReadonlyArray<Record<string, unknown>> = [
    { decisionSource: "mp", fallbackPolicy: "greedy@3" },
    { decisionSource: "unknown", fallbackPolicy: "greedy@3" },
    { fallbackPolicy: "greedy@3" },
    { decisionSource: "mp", fallbackPolicy: "" },
  ];
  for (const over of refusedRecords) {
    assert.deepEqual(validateCoordinationDecision(decision(over)), { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: PRESENCE_REFUSAL }, JSON.stringify(over));
  }
  assert.equal(refusedRecords.length, 4, "four refused records");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "mp" })), { ok: true }, "non-vacuous: a non-fallback record without the member validates");
});

test("gbal R3 the TypeScript law and the schema pattern agree on fallbackPolicy parts of 4194304 characters", () => {
  // The pattern is linear, so the three multi-megabyte accepted members and the refused one finish well under a second.
  const pattern = schemaFallbackPattern();
  const part = 4194304;
  const rows: ReadonlyArray<readonly [string, boolean]> = [
    ["a".repeat(part) + "@3", true],
    ["greedy@" + "3".repeat(part), true],
    ["a".repeat(part) + "@" + "3".repeat(part), true],
    ["a".repeat(part), false],
  ];
  for (const [member, accepted] of rows) {
    const label = `length ${member.length}`;
    const typescript = fallbackOutcome(member).ok;
    assert.equal(pattern.test(member), accepted, `${label}: schema verdict`);
    assert.equal(typescript, accepted, `${label}: TypeScript verdict ${typescript} vs schema ${pattern.test(member)}`);
  }
  assert.equal(rows.filter(([, accepted]) => accepted).length, 3, "three accepted members");
});

test("gbal R4 the TypeScript law and the schema pattern agree on astral code points beside a non-ASCII revision, three adjacent pairs and two-pair parts", () => {
  const pattern = schemaFallbackPattern();
  let checked = 0;
  for (const cp of [0x10000, 0x1f600, 0x10fffd, 0x10ffff]) {
    const ch = String.fromCodePoint(cp);
    const label = "U+" + cp.toString(16).toUpperCase();
    const members: string[] = [
      ...["\u0080", "一", "￿"].map(rev => ch + "@" + rev),
      "gre" + ch + ch + ch + "edy@3",
      "greedy@1" + ch + ch + ch + "3",
      ch + ch + "@" + ch + ch,
    ];
    assert.equal(members.length, 6, `${label}: three revisions, two triple-pair shapes, one two-pair shape`);
    for (const member of members) {
      const typescript = fallbackOutcome(member).ok;
      const schema = pattern.test(member);
      assert.equal(schema, true, `${label} ${JSON.stringify(member)}: the schema pattern accepts it`);
      assert.equal(typescript, schema, `${label} ${JSON.stringify(member)}: TypeScript ${typescript} vs schema ${schema}`);
      checked += 1;
    }
  }
  assert.equal(checked, 24, "four code points by six shapes");
});

// MechanicalWorkflows-696w (gbal follow-up, test-only, the enum-detail, clause-order and census layer): the landed T01 row matches
// the enum refusal only against /decisionSource/, which the fallback detail also satisfies, and no landed row feeds a value outside
// the enum beside a present fallbackPolicy; these rows pin the enum detail as a whole message under both conditions (so the enum
// clause wins over the presence clause) and count the member reads and detail spellings in the built dist and the src, so a
// separate statement that reads the member or reuses a detail at any threshold or shape fails without being fed.
const ENUM_REFUSAL = (value: unknown): string => `decisionSource ${String(value)} is outside {mp, fallback, unknown}`;

test("696w X2 a decisionSource outside the enum carries the whole enum detail beside every present fallbackPolicy, and the in-enum neighbours reach their own clauses", () => {
  let refused = 0;
  for (const value of ["live", "Fallback", 7, null, ""]) {
    for (const policy of ["greedy@3", "", "greedy"]) {
      assert.deepEqual(
        validateCoordinationDecision(decision({ decisionSource: value, fallbackPolicy: policy })),
        { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: ENUM_REFUSAL(value) },
        `${String(value)} beside ${JSON.stringify(policy)}`,
      );
      refused += 1;
    }
  }
  assert.equal(refused, 15, "five values outside the enum by three present policies");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "mp", fallbackPolicy: "greedy@3" })), { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: PRESENCE_REFUSAL }, "non-vacuous: a source inside the enum beside the member reaches the presence detail");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: "greedy@3" })), { ok: true }, "non-vacuous: a fallback source beside a well-formed member validates");
});

test("696w X3 the built dist and the src each read decision.fallbackPolicy three times and spell each of the three decisionSource details once", () => {
  const sites: ReadonlyArray<readonly [string, string]> = [["dist", "../dist/coordination-decision.js"], ["src", "../src/coordination-decision.ts"]];
  const occurrences = (text: string, needle: string): number => text.split(needle).length - 1;
  let read = 0;
  for (const [label, rel] of sites) {
    const text = readFileSync(join(here, rel), "utf8");
    assert.equal((text.match(/\bdecision\.fallbackPolicy\b/g) ?? []).length, 3, `${label}: the typeof read, the POLICY_REF.test read and the presence read`);
    assert.equal(occurrences(text, FALLBACK_REFUSAL), 1, `${label}: the fallback-requires-policy detail is spelled once`);
    assert.equal(occurrences(text, PRESENCE_REFUSAL), 1, `${label}: the presence detail is spelled once`);
    assert.equal(occurrences(text, "is outside {mp, fallback, unknown}"), 1, `${label}: the enum detail template is spelled once`);
    read += 1;
  }
  assert.equal(read, 2, "the built dist and the src were both read");
  assert.equal(fallbackOutcome("greedy@3").ok, true, "non-vacuous: an accepted member");
  assert.equal(fallbackOutcome("greedy").ok, false, "non-vacuous: a refused member");
});

// MechanicalWorkflows-2ak3 (696w follow-up, test-only, the stringified-lookup layer): every landed decisionSource is a string, 7 or null, so
// a lookup that coerces the member with String() before the Set membership test passes the whole file; the schema types the member as a
// string, so a non-string value whose String() spells an enum member is refused with the whole enum detail, with and without a policy.
test("2ak3 X4 a non-string decisionSource whose String() spells an enum member is refused with the whole enum detail with and without a fallbackPolicy", () => {
  let refused = 0;
  for (const value of [["mp"], ["fallback"], ["unknown"], { toString: () => "mp" }]) {
    for (const policy of [undefined, "greedy@3"]) {
      assert.deepEqual(
        validateCoordinationDecision(decision({ decisionSource: value, ...(policy === undefined ? {} : { fallbackPolicy: policy }) })),
        { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: ENUM_REFUSAL(value) },
        `${ENUM_REFUSAL(value)} beside ${JSON.stringify(policy)}`,
      );
      refused += 1;
    }
  }
  assert.equal(refused, 8, "four stringified spellings by two policy conditions");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "mp" })), { ok: true }, "non-vacuous: the string source alone validates");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: "greedy@3" })), { ok: true }, "non-vacuous: a fallback source beside a well-formed member validates");
});

// MechanicalWorkflows-sh6o (2ak3 follow-up, test-only, the boxed-primitive and Symbol.toPrimitive layer): the 2ak3 X4 row feeds arrays and an
// own-toString object, so a lookup that unboxes a String object (new String("mp")) or coerces only an object carrying Symbol.toPrimitive
// before the Set membership test still passes the file. The schema types decisionSource as a string, so both shapes are refused with the
// whole enum detail, with and without a fallbackPolicy; each in-enum spelling validates as a plain string beside the same condition.
test("sh6o R1 a boxed String decisionSource spelling an enum member is refused with the whole enum detail with and without a fallbackPolicy, while the plain string validates", () => {
  let refused = 0;
  for (const spelling of ["mp", "fallback", "unknown"]) {
    for (const policy of [undefined, "greedy@3"]) {
      const value = new String(spelling);
      assert.deepEqual(
        validateCoordinationDecision(decision({ decisionSource: value, ...(policy === undefined ? {} : { fallbackPolicy: policy }) })),
        { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: ENUM_REFUSAL(value) },
        `boxed ${JSON.stringify(spelling)} beside ${JSON.stringify(policy)}`,
      );
      refused += 1;
    }
  }
  assert.equal(refused, 6, "three boxed spellings by two policy conditions");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "mp" })), { ok: true }, "non-vacuous: the plain mp source validates");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "unknown" })), { ok: true }, "non-vacuous: the plain unknown source validates");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: "greedy@3" })), { ok: true }, "non-vacuous: the plain fallback source beside a well-formed member validates");
});

test("sh6o R2 a decisionSource object carrying only Symbol.toPrimitive that spells an enum member is refused with the whole enum detail with and without a fallbackPolicy", () => {
  let refused = 0;
  for (const spelling of ["mp", "fallback", "unknown"]) {
    for (const policy of [undefined, "greedy@3"]) {
      const value = { [Symbol.toPrimitive]: () => spelling };
      assert.deepEqual(
        validateCoordinationDecision(decision({ decisionSource: value, ...(policy === undefined ? {} : { fallbackPolicy: policy }) })),
        { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: ENUM_REFUSAL(spelling) },
        `toPrimitive ${JSON.stringify(spelling)} beside ${JSON.stringify(policy)}`,
      );
      refused += 1;
    }
  }
  assert.equal(refused, 6, "three toPrimitive spellings by two policy conditions");
  assert.equal(ENUM_REFUSAL({ [Symbol.toPrimitive]: () => "unknown" }), "decisionSource unknown is outside {mp, fallback, unknown}", "non-vacuous: String() of the object spells the enum member");
  assert.deepEqual(validateCoordinationDecision(decision({ decisionSource: "fallback", fallbackPolicy: "greedy@3" })), { ok: true }, "non-vacuous: the plain fallback source beside a well-formed member validates");
});
