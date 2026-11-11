// MechanicalWorkflows-nd1p.1 (reslice of nd1p at main 8306bf92; SIDECAR-VALIDATOR-REFUSAL-1): validateCoordinationDecision refuses malformed
// JSON sidecars with its own named code and never throws, and its accept set equals the committed
// mw.coordination-decision.v1 JSON Schema's. The negative cases live in one committed fixture that the
// Python consumer leg (test_coordination_decision_refusals.py) reads too.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCoordinationDecision } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");

interface Mutation { name: string; path: string[]; op: "set" | "delete" | "keep"; value: unknown; schemaKeyword?: string; code?: string }
interface RefusalFixture { base: Record<string, unknown>; refusals: Mutation[]; accepted: Mutation[] }
interface Schema { type?: string; const?: unknown; enum?: unknown[]; minLength?: number; pattern?: string; maximum?: number; minItems?: number; uniqueItems?: boolean; items?: Schema; required?: string[]; additionalProperties?: boolean; properties?: Record<string, Schema>; oneOf?: Schema[] }

const fixture = JSON.parse(readFileSync(join(fixtureDir, "coordination-decision-refusals.json"), "utf8")) as RefusalFixture;
const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as Schema;
const landed = JSON.parse(readFileSync(join(fixtureDir, "coordination-decisions-landing-queue-seed7.json"), "utf8")) as { decisions: unknown[] };

function apply(base: Record<string, unknown>, change: Mutation): unknown {
  const copy = structuredClone(base) as Record<string, unknown>;
  if (change.op === "keep") return copy;
  if (change.path.length === 0) return structuredClone(change.value);
  let cursor = copy;
  for (const key of change.path.slice(0, -1)) cursor = cursor[key] as Record<string, unknown>;
  const last = change.path[change.path.length - 1]!;
  if (change.op === "delete") delete cursor[last];
  else cursor[last] = structuredClone(change.value);
  return copy;
}

/** The smallest JSON Schema subset the committed sidecar schema uses; returns the first violated keyword or null. */
function violation(node: Schema, value: unknown): string | null {
  if (node.oneOf !== undefined) {
    const inner = node.oneOf.map(branch => violation(branch, value));
    if (inner.some(keyword => keyword === null)) return null;
    return inner.find(keyword => keyword !== "type") ?? "type"; // the branch that got past the type check names the cause
  }
  const isObject = typeof value === "object" && value !== null && !Array.isArray(value);
  if (node.type === "object" && !isObject) return "type";
  if (node.type === "array" && !Array.isArray(value)) return "type";
  if (node.type === "string" && typeof value !== "string") return "type";
  if (node.type === "number" && (typeof value !== "number" || !Number.isFinite(value))) return "type";
  if (node.type === "integer" && !Number.isInteger(value)) return "type";
  if (node.const !== undefined && value !== node.const) return "const";
  if (node.enum !== undefined && !node.enum.includes(value)) return "enum";
  if (typeof value === "string") {
    if (node.minLength !== undefined && value.length < node.minLength) return "minLength";
    if (node.pattern !== undefined && !new RegExp(node.pattern).test(value)) return "pattern";
  }
  if (typeof value === "number" && node.maximum !== undefined && value > node.maximum) return "maximum";
  if (Array.isArray(value)) {
    if (node.minItems !== undefined && value.length < node.minItems) return "minItems";
    if (node.uniqueItems === true && new Set(value.map(item => JSON.stringify(item))).size !== value.length) return "uniqueItems";
    if (node.items !== undefined) for (const item of value) { const inner = violation(node.items, item); if (inner !== null) return inner; }
  }
  if (isObject) {
    const record = value as Record<string, unknown>;
    for (const key of node.required ?? []) if (!(key in record)) return "required";
    for (const key of Object.keys(record)) {
      const child = node.properties?.[key];
      if (child === undefined) { if (node.additionalProperties === false) return "additionalProperties"; continue; }
      const inner = violation(child, record[key]);
      if (inner !== null) return inner;
    }
  }
  return null;
}

test("every refusal fixture returns ok false with DECISION_SIDECAR_MALFORMED and never throws (N1)", () => {
  assert.ok(fixture.refusals.length >= 20, "the fixture names every refusal the seat ruled");
  for (const change of fixture.refusals) {
    const input = apply(fixture.base, change);
    let outcome: ReturnType<typeof validateCoordinationDecision> | undefined;
    assert.doesNotThrow(() => { outcome = validateCoordinationDecision(input as never); }, change.name);
    assert.equal(outcome?.ok, false, change.name);
    if (outcome === undefined || outcome.ok) continue;
    assert.equal(outcome.code, change.code, change.name);
    assert.ok(outcome.detail.length > 0, change.name);
  }
});

test("negative controls: the base record, the closed logProb interval and the committed codes hold (N2)", () => {
  assert.deepEqual(validateCoordinationDecision(structuredClone(fixture.base) as never), { ok: true });
  for (const change of fixture.accepted) assert.deepEqual(validateCoordinationDecision(apply(fixture.base, change) as never), { ok: true }, change.name);
  const outside = structuredClone(fixture.base) as { sampled: { id: string } };
  outside.sampled.id = "never-offered";
  const refusal = validateCoordinationDecision(outside as never);
  assert.equal(refusal.ok === false && refusal.code, "DECISION_CHOICE_NOT_IN_SUPPORT");
  const rewarded = structuredClone(fixture.base) as { feedback: { reward: unknown } };
  rewarded.feedback.reward = 1;
  const feedback = validateCoordinationDecision(rewarded as never);
  assert.equal(feedback.ok === false && feedback.code, "DECISION_FEEDBACK_REWARD_WITHOUT_FINAL");
});

test("a non-object record, array or primitive refuses without throwing", () => {
  for (const value of [null, undefined, 7, "x", true, [], [1]]) {
    let outcome: ReturnType<typeof validateCoordinationDecision> | undefined;
    assert.doesNotThrow(() => { outcome = validateCoordinationDecision(value as never); }, String(value));
    assert.equal(outcome?.ok === false && outcome.code, "DECISION_SIDECAR_MALFORMED", String(value));
  }
});

test("accept-set parity: every refusal fixture is a schema violation of the named keyword, and every accepted record validates (N3)", () => {
  assert.equal(violation(schema, fixture.base), null);
  for (const change of fixture.refusals) assert.equal(violation(schema, apply(fixture.base, change)), change.schemaKeyword, change.name);
  for (const change of fixture.accepted) assert.equal(violation(schema, apply(fixture.base, change)), null, change.name);
});

test("on every committed record the validator accepts exactly what the schema accepts (N3)", () => {
  assert.ok(landed.decisions.length >= 3);
  const records = [...landed.decisions, fixture.base, ...fixture.refusals.map(change => apply(fixture.base, change)), ...fixture.accepted.map(change => apply(fixture.base, change))];
  for (const record of records) {
    const schemaSays = violation(schema, record) === null;
    const validatorSays = validateCoordinationDecision(record as never).ok;
    assert.equal(validatorSays, schemaSays, JSON.stringify(record).slice(0, 120));
  }
});

test("D1: the exact-key guard admits the live decisionSource and fallbackPolicy members the schema lists", () => {
  const mp = { ...structuredClone(fixture.base), decisionSource: "mp" };
  assert.deepEqual(validateCoordinationDecision(mp as never), { ok: true });
  const fallback = { ...structuredClone(fixture.base), decisionSource: "fallback", fallbackPolicy: "policy@1" };
  assert.deepEqual(validateCoordinationDecision(fallback as never), { ok: true });
  assert.equal(violation(schema, fallback), null);
  const stray = { ...structuredClone(fixture.base), fallbackPolicy: "policy@1" };
  const refusal = validateCoordinationDecision(stray as never);
  assert.equal(refusal.ok === false && refusal.code, "DECISION_SIDECAR_MALFORMED");
});

test("D3: the schema declares uniqueItems on vocabulary and support, the keyword the validator's duplicate rules enforce (SIDECAR-VALIDATOR-REFUSAL-1)", () => {
  assert.equal(schema.properties?.["vocabulary"]?.uniqueItems, true);
  assert.equal(schema.properties?.["support"]?.uniqueItems, true);
  const names = new Set(fixture.refusals.filter(change => change.schemaKeyword === "uniqueItems").map(change => change.name));
  assert.deepEqual([...names].sort(), ["duplicate-support-entry", "duplicate-vocabulary-entry"]);
});

test("D2: the schema pins a closed logProb interval whose number branch has maximum 0 and whose other branch is the unknown literal", () => {
  const logProb = schema.properties?.["sampled"]?.properties?.["logProb"];
  assert.deepEqual(logProb?.oneOf, [{ type: "number", maximum: 0 }, { type: "string", const: "unknown" }]);
});
