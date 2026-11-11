import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, exportEpisodeForTraining, runElasticLanding, elasticLanes, EPISODE_ENVIRONMENTS } from "../dist/index.js";
import type { EnvironmentEpisode } from "../dist/index.js";

/**
 * MechanicalWorkflows-d2wk (803g follow-up, product fix): the mw.training-export.v1 schema environment enum and the
 * EpisodeEnvironment runtime list can never drift apart silently. Mirror of episode-schema-parity.test.ts (q5um, jcts ruling).
 * TrainingExport.environment is Episode["environment"], so every environment the exporter can emit must be an enum member.
 */

const here = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(readFileSync(join(here, "../schema/training-export.v1.schema.json"), "utf8")) as Schema;
const environmentEnum = (): string[] => [...((schema.properties?.environment ?? {}) as Schema).enum ?? []].map(String);

// Minimal JSON Schema validator: the keywords training-export.v1.schema.json uses, nothing more (the same subset episode.test.ts runs).
interface Schema {
  readonly type?: string; readonly const?: unknown; readonly enum?: readonly unknown[]; readonly minLength?: number; readonly minimum?: number;
  readonly pattern?: string; readonly required?: readonly string[]; readonly properties?: Record<string, Schema>;
  readonly additionalProperties?: boolean; readonly items?: Schema; readonly oneOf?: readonly Schema[];
  readonly $id?: string; readonly title?: string;
}
function violations(value: unknown, node: Schema, path = ""): string[] {
  const out: string[] = [];
  if (node.oneOf !== undefined) {
    const matching = node.oneOf.filter(branch => violations(value, branch, path).length === 0).length;
    if (matching !== 1) out.push(`${path || "/"}: matches ${matching} of ${node.oneOf.length} alternatives`);
    return out;
  }
  if ("const" in node && JSON.stringify(value) !== JSON.stringify(node.const)) out.push(`${path || "/"}: expected const ${JSON.stringify(node.const)}`);
  if (node.enum !== undefined && !node.enum.some(member => member === value)) out.push(`${path || "/"}: not in enum`);
  if (node.type === "string") {
    if (typeof value !== "string") return [...out, `${path || "/"}: expected string`];
    if (node.minLength !== undefined && value.length < node.minLength) out.push(`${path}: too short`);
    if (node.pattern !== undefined && !new RegExp(node.pattern).test(value)) out.push(`${path}: pattern`);
  } else if (node.type === "integer" || node.type === "number") {
    if (typeof value !== "number" || (node.type === "integer" && !Number.isInteger(value))) return [...out, `${path || "/"}: expected ${node.type}`];
    if (node.minimum !== undefined && value < node.minimum) out.push(`${path}: below minimum`);
  } else if (node.type === "array") {
    if (!Array.isArray(value)) return [...out, `${path || "/"}: expected array`];
    if (node.items !== undefined) value.forEach((member, index) => out.push(...violations(member, node.items!, `${path}/${index}`)));
  } else if (node.type === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return [...out, `${path || "/"}: expected object`];
    const record = value as Record<string, unknown>;
    for (const key of node.required ?? []) if (!(key in record)) out.push(`${path}/${key}: required member missing`);
    for (const [key, member] of Object.entries(record)) {
      const child = node.properties?.[key];
      if (child === undefined) { if (node.additionalProperties === false) out.push(`${path}/${key}: unexpected member`); continue; }
      out.push(...violations(member, child, `${path}/${key}`));
    }
  }
  return out;
}

test("the training-export schema environment enum and the runtime EPISODE_ENVIRONMENTS list are equal as sets", () => {
  assert.deepEqual(environmentEnum().sort(), [...EPISODE_ENVIRONMENTS].sort());
});

test("the schema environment enum is duplicate-free and ten members long", () => {
  const members = environmentEnum();
  assert.equal(new Set(members).size, members.length);
  assert.equal(members.length, 10);
});

test("the four families the exporter emits beyond the original six are schema enum members", () => {
  for (const family of ["landing-queue-elastic", "landing-queue-heterogeneous", "landing-queue-temporal", "dag-assignment"] as const) {
    assert.ok(EPISODE_ENVIRONMENTS.includes(family), `${family} in runtime list`);
    assert.ok(environmentEnum().includes(family), `${family} in schema enum`);
  }
});

test("a fresh export of the seed-7 elastic landing episode validates against the schema", () => {
  const exported = exportEpisodeForTraining(toEpisode(runElasticLanding({ seed: 7, candidates: 4, lanes: 1, maxLanes: 2, steps: 12, policy: elasticLanes }) as unknown as EnvironmentEpisode));
  assert.equal(exported.environment, "landing-queue-elastic");
  assert.deepEqual(violations(exported, schema), []);
});

test("an environment outside EPISODE_ENVIRONMENTS still fails the enum", () => {
  const exported = exportEpisodeForTraining(toEpisode(runElasticLanding({ seed: 7, candidates: 4, lanes: 1, maxLanes: 2, steps: 12, policy: elasticLanes }) as unknown as EnvironmentEpisode));
  assert.ok(violations({ ...exported, environment: "fork" }, schema).some(line => line === "/environment: not in enum"));
});
