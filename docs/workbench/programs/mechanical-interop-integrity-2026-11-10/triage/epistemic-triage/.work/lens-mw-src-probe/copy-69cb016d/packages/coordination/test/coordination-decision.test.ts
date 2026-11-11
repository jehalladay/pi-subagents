// MechanicalWorkflows-gc3g (APO-EAT-R005): a typed immutable mw.coordination-decision.v1
// sidecar records pre-sampling support, sampled id, behavior logProb, RNG stream id and
// checkpoint per decision — a separate schema and module, never serialized into
// TraceEvent.detail, with TraceEvent, mw.episode.v1 and mw.training-export.v1 unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCoordinationDecision } from "../dist/index.js";
import type { CoordinationDecision, TraceEvent } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));

const decision = (over: Partial<CoordinationDecision> = {}): CoordinationDecision => ({
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
});

test("a well-formed sidecar validates and is returned untouched", () => {
  const value = decision();
  const outcome = validateCoordinationDecision(value);
  assert.deepEqual(outcome, { ok: true });
});

test("a sampled id outside the recorded support refuses with DECISION_CHOICE_NOT_IN_SUPPORT", () => {
  const outcome = validateCoordinationDecision(decision({ sampled: { id: "forbidden", logProb: "unknown" } }));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "DECISION_CHOICE_NOT_IN_SUPPORT");
  const ghost = validateCoordinationDecision(decision({ sampled: { id: "never-offered", logProb: "unknown" } }));
  assert.equal(ghost.ok === false && ghost.code, "DECISION_CHOICE_NOT_IN_SUPPORT");
});

test("structural breakage refuses with DECISION_SIDECAR_MALFORMED, naming the defect", () => {
  const bad: [Partial<CoordinationDecision>, RegExp][] = [
    [{ schema: "other.v1" as never }, /schema/],
    [{ support: [] }, /support/],
    [{ support: ["restack", "ghost"] }, /vocabulary/],
    [{ vocabulary: ["restack", "restack", "pause"] }, /duplicate/],
    [{ sampled: { id: " ", logProb: "unknown" } }, /sampled/],
    [{ sampled: { id: "restack", logProb: Number.NaN } }, /logProb/],
    [{ rng: { streamId: "  " } }, /stream/],
    [{ observationDigest: "not-a-digest" }, /observation/],
  ];
  for (const [over, pattern] of bad) {
    const outcome = validateCoordinationDecision(decision(over));
    assert.equal(outcome.ok, false, JSON.stringify(over));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", JSON.stringify(over));
    assert.match(outcome.detail, pattern);
  }
});

// MechanicalWorkflows-vqch (gc3g follow-up, test-only): eight malformed() rules whose clause could be
// deleted or weakened while the table above stayed green. One row per rule, each naming its own defect text.
test("each remaining malformed() rule refuses with DECISION_SIDECAR_MALFORMED naming its own defect", () => {
  const digest = "sha256:" + "a".repeat(64);
  const base = decision();
  const bad: [string, Partial<CoordinationDecision>, RegExp][] = [
    ["version other than 1", { version: 2 as never }, /schema\/version/],
    ["blank decisionId", { decisionId: " " }, /blank decision or intent id/],
    ["empty intentId", { intentId: "" }, /blank decision or intent id/],
    ["policy programDigest not a digest", { policy: { ...base.policy, programDigest: "sha256:xyz" } }, /policy program\/checkpoint/],
    ["policy checkpointDigest not a digest", { policy: { ...base.policy, checkpointDigest: "nope" } }, /policy program\/checkpoint/],
    ["observationDigest with a trailing suffix", { observationDigest: digest + "ff" }, /observation digest/],
    ["observationDigest with a leading prefix", { observationDigest: "x" + digest }, /observation digest/],
    ["vocabulary carrying a blank entry", { vocabulary: ["restack", "pause", " "] }, /blank-entry vocabulary/],
    ["duplicate support entries", { support: ["restack", "restack"] }, /duplicate support/],
    ["Infinity logProb", { sampled: { id: "restack", logProb: Number.POSITIVE_INFINITY } }, /logProb/],
    ["-Infinity logProb", { sampled: { id: "restack", logProb: Number.NEGATIVE_INFINITY } }, /logProb/],
    ["string logProb other than unknown", { sampled: { id: "restack", logProb: "-0.3" as never } }, /logProb/],
    ["blank readSet entry", { readSet: ["artifact:x", " "] }, /readSet/],
  ];
  for (const [label, over, pattern] of bad) {
    const outcome = validateCoordinationDecision(decision(over));
    assert.equal(outcome.ok, false, label);
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", label);
    assert.match(outcome.detail, pattern, label);
  }
});

type SchemaNode = { type?: string; const?: unknown; minItems?: number; pattern?: string; required?: string[]; additionalProperties?: boolean; properties?: Record<string, SchemaNode>; oneOf?: unknown[] };

const member = (parent: SchemaNode, name: string): SchemaNode => {
  const found = parent.properties?.[name];
  assert.ok(found, `schema member ${name}`);
  return found;
};

test("the on-disk sidecar schema pins its nested objects, digest patterns, minItems, consts and numeric-or-unknown unions", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as SchemaNode;
  const digestPattern = "^sha256:[0-9a-f]{64}$";
  // SC1: every nested object is closed and keeps its exact required set.
  const nested: [string, string[]][] = [
    ["policy", ["programDigest", "checkpointDigest"]],
    ["sampled", ["id", "logProb"]],
    ["rng", ["streamId"]],
    ["prestate", ["memoryRevision"]],
  ];
  for (const [name, required] of nested) {
    const node = member(schema, name);
    assert.equal(node.type, "object", `${name} type`);
    assert.equal(node.additionalProperties, false, `${name} additionalProperties`);
    assert.deepEqual([...(node.required ?? [])].sort(), [...required].sort(), `${name} required`);
  }
  const policy = member(schema, "policy");
  const sampled = member(schema, "sampled");
  // SC2: the behavior log probability is a required member of sampled.
  assert.ok((sampled.required ?? []).includes("logProb"));
  // SC3: all three digests share one exact pattern.
  assert.equal(member(schema, "observationDigest").pattern, digestPattern);
  assert.equal(member(policy, "programDigest").pattern, digestPattern);
  assert.equal(member(policy, "checkpointDigest").pattern, digestPattern);
  // SC4: neither the vocabulary nor the support may be empty.
  assert.equal(member(schema, "vocabulary").minItems, 1);
  assert.equal(member(schema, "support").minItems, 1);
  // SC5: the schema and version members are consts.
  assert.equal(member(schema, "schema").const, "mw.coordination-decision.v1");
  assert.equal(member(schema, "version").const, 1);
  // SC6: logProb is a number at most 0 or the literal unknown, nothing else.
  assert.deepEqual(member(sampled, "logProb").oneOf, [{ type: "number", maximum: 0 }, { type: "string", const: "unknown" }]);
});

test("the sidecar schema file exists beside the other coordination schemas and matches the type's required members", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as { $id: string; required: string[]; additionalProperties: boolean };
  assert.equal(schema.$id, "mw.coordination-decision.v1");
  assert.equal(schema.additionalProperties, false);
  const value = decision();
  assert.deepEqual([...schema.required].sort(), Object.keys(value).sort(), "schema required set equals the type's member set");
});

test("TraceEvent keys stay exactly kind, policyId, detail — the sidecar is never folded into the trace", () => {
  // Type-level pin: this object compiles only while TraceEvent has exactly these keys.
  const pin: Record<keyof TraceEvent, true> = { kind: true, policyId: true, detail: true };
  assert.deepEqual(Object.keys(pin).sort(), ["detail", "kind", "policyId"]);
  const event: TraceEvent = { kind: "decision", policyId: "mp-adapter", detail: "sampled restack" };
  assert.equal("sampled" in event, false);
});

test("episode and training-export surfaces are untouched: the EAT-R004 golden digests still hold", () => {
  // The pinned digests live in elastic-episode.test.ts and run in the same suite; here we assert
  // the sidecar module exports nothing into those modules' namespaces.
  const episodeSource = readFileSync(join(here, "../src/episode.ts"), "utf8");
  const trainingSource = readFileSync(join(here, "../src/training-export.ts"), "utf8");
  assert.equal(episodeSource.includes("coordination-decision"), false);
  assert.equal(trainingSource.includes("coordination-decision"), false);
});

// MechanicalWorkflows-jtke (test-only successor to rjmg): three sidecar reward laws the whole gate left unpinned.
test("jtke P1: malformed() outranks REWARD_WITHOUT_FINAL for a NaN-reward pending record and a reward-on-out-of-enum-status record", () => {
  const nan = validateCoordinationDecision(decision({ feedback: { status: "pending", reward: Number.NaN } }));
  assert.equal(nan.ok, false);
  if (nan.ok) return;
  assert.equal(nan.code, "DECISION_SIDECAR_MALFORMED");
  assert.match(nan.detail, /reward/);
  const outsideEnum = validateCoordinationDecision(decision({ feedback: { status: "done" as never, reward: 1 } }));
  assert.equal(outsideEnum.ok, false);
  if (outsideEnum.ok) return;
  assert.equal(outsideEnum.code, "DECISION_SIDECAR_MALFORMED");
  assert.match(outsideEnum.detail, /feedback status/);
  // Control: a well-formed numeric reward on a non-final status still refuses with the dedicated code.
  const pending = validateCoordinationDecision(decision({ feedback: { status: "pending", reward: 1 } }));
  assert.equal(pending.ok === false && pending.code, "DECISION_FEEDBACK_REWARD_WITHOUT_FINAL");
});

test("jtke P2: the schema reward oneOf deep-equals a number branch and the unknown-const string branch", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as { properties: { feedback: { properties: { reward: { oneOf: unknown[] } } } } };
  assert.deepEqual(schema.properties.feedback.properties.reward.oneOf, [{ type: "number" }, { type: "string", const: "unknown" }]);
});

test("jtke P3: a non-integer final reward validates ok through the validator, matching the schema number branch", () => {
  assert.deepEqual(validateCoordinationDecision(decision({ feedback: { status: "final", reward: 0.5 } })), { ok: true });
  assert.deepEqual(validateCoordinationDecision(decision({ feedback: { status: "final", reward: -2.25 } })), { ok: true });
});
