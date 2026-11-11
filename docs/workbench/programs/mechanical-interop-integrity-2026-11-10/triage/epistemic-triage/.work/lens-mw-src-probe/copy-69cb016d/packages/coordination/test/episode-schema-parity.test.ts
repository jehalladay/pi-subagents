// MechanicalWorkflows-q5um (jcts seat ruling, 2026-10-21): the mw.episode.v1 schema enum and
// the EpisodeEnvironment union can never drift apart silently again. The schema JSON is read
// from disk, the union is exported as a runtime list, and every literal a converter can emit
// must be an enum member. Same two-pin cross-check pattern as the R008/D0 receipt pins.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EPISODE_ENVIRONMENTS, type EpisodeEnvironment } from "../dist/index.js";

const schema = JSON.parse(readFileSync(new URL("../schema/episode.v1.schema.json", import.meta.url), "utf8")) as {
  properties: { environment: { enum: string[] } };
};

test("the schema enum and the runtime EpisodeEnvironment list are equal as sets", () => {
  const schemaEnum = [...schema.properties.environment.enum].sort();
  const runtime = [...EPISODE_ENVIRONMENTS].sort();
  assert.deepEqual(schemaEnum, runtime);
});

test("the three jcts families are members of both the runtime list and the schema enum", () => {
  for (const family of ["landing-queue-heterogeneous", "landing-queue-temporal", "dag-assignment"] as const) {
    assert.ok(EPISODE_ENVIRONMENTS.includes(family), `${family} in runtime list`);
    assert.ok(schema.properties.environment.enum.includes(family), `${family} in schema enum`);
  }
});

test("the runtime list is frozen, duplicate-free and ten members long", () => {
  assert.ok(Object.isFrozen(EPISODE_ENVIRONMENTS));
  assert.equal(new Set(EPISODE_ENVIRONMENTS).size, EPISODE_ENVIRONMENTS.length);
  assert.equal(EPISODE_ENVIRONMENTS.length, 10);
  const witness: EpisodeEnvironment = EPISODE_ENVIRONMENTS[0]!;
  assert.equal(typeof witness, "string");
});
