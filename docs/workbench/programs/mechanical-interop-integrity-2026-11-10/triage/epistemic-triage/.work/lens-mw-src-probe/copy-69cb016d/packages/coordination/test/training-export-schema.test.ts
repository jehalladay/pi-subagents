import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, exportEpisodeForTraining, trainingBytes, attachPerActorCredit, importTrainingExport } from "../dist/index.js";
import type { EnvironmentEpisode, PerActorCredit } from "../dist/index.js";

/**
 * TW-EAT-R003 (MechanicalWorkflows-803g): `schema/training-export.v1.schema.json` is the export-side sibling of
 * `schema/episode.v1.schema.json`. Every committed training fixture, every fresh export and every re-imported
 * export (canonical bytes parsed back) validates against it; a fixture that loses a required member does not.
 */

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const schema = JSON.parse(readFileSync(join(here, "../schema/training-export.v1.schema.json"), "utf8")) as Schema;

const rows = [
  { env: "landing-queue", source: "landing-queue-seed7.json", exported: "training-landing-queue-seed7.json" },
  { env: "compaction-inheritance", source: "compaction-inheritance-seed7.json", exported: "training-compaction-inheritance-seed7.json" },
  { env: "colony-resilience", source: "colony-resilience-seed29.json", exported: "training-colony-resilience-seed29.json" },
  { env: "artifact-recovery", source: "artifact-recovery-seed7.json", exported: "training-artifact-recovery-seed7.json" },
  { env: "quorum-evidence", source: "quorum-evidence-independent-seed7.json", exported: "training-quorum-evidence-independent-seed7.json" },
] as const;

type Json = Record<string, unknown>;
const readJson = (name: string): Json => JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as Json;
const clone = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;

// Minimal JSON Schema validator: the keywords training-export.v1.schema.json uses, nothing more (the same subset episode.test.ts runs).
interface Schema {
  readonly type?: string; readonly const?: unknown; readonly enum?: readonly unknown[]; readonly minLength?: number; readonly minimum?: number; readonly maximum?: number; readonly minItems?: number;
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
    if (node.maximum !== undefined && value > node.maximum) out.push(`${path}: above maximum`);
  } else if (node.type === "array") {
    if (!Array.isArray(value)) return [...out, `${path || "/"}: expected array`];
    if (node.minItems !== undefined && value.length < node.minItems) out.push(`${path}: too few items`);
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

test("the schema artifact loads, names mw.training-export.v1 and closes its object", () => {
  assert.equal(schema.$id, "mw.training-export.v1");
  assert.equal(schema.title, "mw.training-export.v1");
  assert.equal(schema.type, "object");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual([...(schema.required ?? [])].sort(), ["digest", "environment", "episodeId", "lineage", "mode", "sanitize", "schema", "steps", "verifier", "version"]);
});

test("every committed C0 parity fixture validates against the schema", () => {
  for (const row of rows) assert.deepEqual(violations(readJson(row.exported), schema), [], row.exported);
});

test("every fresh export validates on export and again after canonical bytes are re-imported, in fixture and replay mode", () => {
  for (const row of rows) {
    const episode = toEpisode(readJson(row.source) as unknown as EnvironmentEpisode);
    for (const mode of ["fixture", "replay"] as const) {
      const exported = exportEpisodeForTraining({ ...episode, mode });
      assert.deepEqual(violations(exported, schema), [], `${row.env} ${mode} export`);
      const reimported = JSON.parse(trainingBytes(exported)) as unknown;
      assert.deepEqual(violations(reimported, schema), [], `${row.env} ${mode} re-import`);
    }
  }
});

test("a fixture that drops any required top-level member fails schema validation, naming that member", () => {
  const good = readJson(rows[0].exported);
  for (const key of schema.required ?? []) {
    const mutated = clone(good);
    delete mutated[key];
    assert.ok(violations(mutated, schema).some(line => line.includes(`/${key}: required member missing`)), `dropping ${key}`);
  }
});

test("a fixture that drops a required step, mask, support, checkpoint or provenance member fails, and so does a null or an unexpected member", () => {
  const step = (mutate: (record: Json) => void): Json => {
    const mutated = clone(readJson(rows[2].exported));
    mutate((mutated.steps as Json[])[0]!);
    return mutated;
  };
  const dropped: readonly [string, (record: Json) => void][] = [
    ["sampled", record => { delete record.sampled; }],
    ["logProb", record => { delete record.logProb; }],
    ["actorId", record => { delete record.actorId; }],
    ["observationDigest", record => { delete record.observationDigest; }],
    ["mask/admitted", record => { delete (record.mask as Json).admitted; }],
    ["mask/rejected", record => { delete (record.mask as Json).rejected; }],
    ["support/configHash", record => { delete (record.support as Json).configHash; }],
    ["checkpoint/after", record => { delete (record.checkpoint as Json).after; }],
    ["provenance/readSet", record => { delete (record.provenance as Json).readSet; }],
  ];
  for (const [label, mutate] of dropped) {
    const name = label.split("/").at(-1)!;
    assert.ok(violations(step(mutate), schema).some(line => line.includes(`/${name}: required member missing`)), `dropping step ${label}`);
  }
  assert.notDeepEqual(violations(step(record => { record.logProb = null; }), schema), [], "a null logProb must fail: unknown is the literal, never null");
  assert.notDeepEqual(violations(step(record => { record.logProb = "0"; }), schema), [], "only a number or the literal unknown is a logProb");
  assert.notDeepEqual(violations(step(record => { record.extra = 1; }), schema), [], "an unexpected step member must fail");
  assert.notDeepEqual(violations(step(record => { (record.checkpoint as Json).before = "sha256:xyz"; }), schema), [], "a malformed checkpoint must fail");
});

test("the closed enums and constants refuse a forged label: schema, version, mode, environment, verifier label, digest and sanitize.ran", () => {
  const mutate = (change: (record: Json) => void): Json => { const copy = clone(readJson(rows[0].exported)); change(copy); return copy; };
  const cases: readonly [string, (record: Json) => void][] = [
    ["schema", record => { record.schema = "mw.episode.v1"; }],
    ["version", record => { record.version = 2; }],
    ["mode live-verified", record => { record.mode = "live-verified"; }],
    ["mode PASS", record => { record.mode = "PASS"; }],
    ["environment", record => { record.environment = "fork"; }],
    ["verifier label live", record => { (record.verifier as Json).label = "live"; }],
    ["digest", record => { record.digest = "sha256:short"; }],
    ["sanitize.ran false", record => { (record.sanitize as Json).ran = false; }],
    ["unexpected top-level member", record => { record.nativeVerified = true; }],
    ["steps not an array", record => { record.steps = {}; }],
  ];
  for (const [label, change] of cases) assert.notDeepEqual(violations(mutate(change), schema), [], label);
});

// MechanicalWorkflows-8f5z (803g follow-up): the schema's own `required` lists drive the drop pins, so a loosened list cannot hide behind a hand-picked sample.
interface RequiredSite { readonly path: readonly string[]; readonly key: string; readonly viaOneOf: boolean }
function requiredSites(node: Schema, path: readonly string[] = [], viaOneOf = false): RequiredSite[] {
  const sites: RequiredSite[] = (node.required ?? []).map(key => ({ path, key, viaOneOf }));
  for (const [name, child] of Object.entries(node.properties ?? {})) sites.push(...requiredSites(child, [...path, name], viaOneOf));
  if (node.items !== undefined) sites.push(...requiredSites(node.items, [...path, "*"], viaOneOf));
  for (const branch of node.oneOf ?? []) sites.push(...requiredSites(branch, path, true));
  return sites;
}
const isRecord = (value: unknown): value is Json => value !== null && typeof value === "object" && !Array.isArray(value);
function objectsAt(root: unknown, path: readonly string[]): Json[] {
  let layer: unknown[] = [root];
  for (const segment of path) {
    layer = layer.flatMap(value => {
      if (segment === "*") return Array.isArray(value) ? value : [];
      return isRecord(value) && segment in value ? [value[segment]] : [];
    });
  }
  return layer.filter(isRecord);
}

// The structural walks below need an object at every closed site, including the optional credits member no committed fixture carries (MechanicalWorkflows-a1bvx): one attachPerActorCredit export joins the five fixtures.
const structuralRows = (): readonly { readonly exported: string; readonly read: () => Json }[] => [
  ...rows.map(row => ({ exported: row.exported, read: () => readJson(row.exported) })),
  { exported: "credited landing-queue export (attachPerActorCredit)", read: () => creditedExport() },
];

test("dropping any member of any required list the schema declares, at every nesting level, fails with that one member named", () => {
  const sites = requiredSites(schema);
  // The literal below is the landed contract: a schema that loosens any of the 14 required lists (the walk would follow it) fails here, not silently.
  const declared: Record<string, string[]> = {};
  for (const site of sites) (declared[site.path.join("/")] ??= []).push(site.key);
  assert.deepEqual(declared, {
    "": ["schema", "version", "mode", "episodeId", "environment", "steps", "verifier", "lineage", "sanitize", "digest"],
    "steps/*": ["step", "actorId", "sampled", "mask", "support", "logProb", "checkpoint", "observationDigest", "provenance"],
    "steps/*/mask": ["admitted", "rejected"],
    "steps/*/mask/rejected/*": ["intentId", "code"],
    "steps/*/support": ["policyId", "revision", "configHash"],
    "steps/*/checkpoint": ["before", "after"],
    "steps/*/provenance": ["basis", "family", "readSet", "evidence"],
    "verifier": ["label", "receiptDigest", "verdict"],
    "lineage": ["attempts", "arms"],
    "lineage/attempts/*": ["id", "parent", "outcome"],
    "lineage/arms": ["controlId", "treatmentId"],
    "sanitize": ["ran", "removed", "inherited"],
    "credits/*": ["actorId", "valueMicro", "derivation"],
    "credits/*/derivation": ["kind", "reference"],
  });
  const covered = new Set<string>();
  for (const row of structuralRows()) {
    for (const site of sites) {
      const mutated = clone(row.read());
      const [target] = objectsAt(mutated, site.path);
      if (target === undefined) continue; // this fixture carries no object at that level; another fixture must (checked below)
      assert.ok(site.key in target, `${row.exported} ${site.path.join("/")} lacks declared member ${site.key}`);
      delete target[site.key];
      const found = violations(mutated, schema);
      assert.equal(found.length, 1, `${row.exported} dropping ${site.path.join("/")}/${site.key}: ${JSON.stringify(found)}`);
      // A member of an object inside a oneOf branch surfaces as the oneOf node matching no alternative; any other site names the member.
      const expected = site.viaOneOf ? /\/lineage\/attempts: matches 0 of 2 alternatives$/ : new RegExp(`/${site.key}: required member missing$`);
      assert.match(found[0]!, expected, `${row.exported} dropping ${site.path.join("/")}/${site.key}`);
      covered.add(`${site.path.join("/")}/${site.key}`);
    }
  }
  assert.deepEqual([...covered].sort(), sites.map(site => `${site.path.join("/")}/${site.key}`).sort());
});

test("a malformed configHash, a malformed receiptDigest and an empty episodeId fail while a well-formed sha256 passes", () => {
  const good = `sha256:${"a".repeat(64)}`;
  const withConfigHash = (value: string): Json => { const copy = clone(readJson(rows[2].exported)); ((((copy.steps as Json[])[0]!).support) as Json).configHash = value; return copy; };
  const withReceiptDigest = (value: string): Json => { const copy = clone(readJson(rows[2].exported)); (copy.verifier as Json).receiptDigest = value; return copy; };
  assert.deepEqual(violations(withConfigHash(good), schema), []);
  assert.deepEqual(violations(withReceiptDigest(good), schema), []);
  for (const bad of ["sha256:xyz", `sha256:${"a".repeat(63)}`, `sha256:${"a".repeat(65)}`, `sha256:${"A".repeat(64)}`, "a".repeat(64), ""]) {
    assert.deepEqual(violations(withConfigHash(bad), schema), ["/steps/0/support/configHash: pattern"], `configHash ${JSON.stringify(bad)}`);
    assert.deepEqual(violations(withReceiptDigest(bad), schema), ["/verifier/receiptDigest: pattern"], `receiptDigest ${JSON.stringify(bad)}`);
  }
  const empty = clone(readJson(rows[2].exported));
  empty.episodeId = "";
  assert.deepEqual(violations(empty, schema), ["/episodeId: too short"]);
});

// MechanicalWorkflows-cgnq (8f5z follow-up): the residual silent loosenings the first pin set left open.
const wellFormedDigest = `sha256:${"a".repeat(64)}`;
const firstExport = (): Json => clone(readJson(rows[2].exported));
const firstStep = (record: Json): Json => (record.steps as Json[])[0]!;

test("a digest with leading garbage or a non-hex lowercase body fails at configHash and at receiptDigest with exactly the pattern violation", () => {
  const withConfigHash = (value: string): Json => { const copy = firstExport(); (firstStep(copy).support as Json).configHash = value; return copy; };
  const withReceiptDigest = (value: string): Json => { const copy = firstExport(); (copy.verifier as Json).receiptDigest = value; return copy; };
  const badBodies: readonly [string, string][] = [
    ["start anchor: leading garbage before a well-formed sha256", `x${wellFormedDigest}`],
    ["hex class: 64 lowercase non-hex characters", `sha256:${"g".repeat(64)}`],
  ];
  for (const [label, bad] of badBodies) {
    assert.deepEqual(violations(withConfigHash(bad), schema), ["/steps/0/support/configHash: pattern"], `configHash ${label}`);
    assert.deepEqual(violations(withReceiptDigest(bad), schema), ["/verifier/receiptDigest: pattern"], `receiptDigest ${label}`);
  }
});

test("a one-character episodeId passes: the minimum length stays 1", () => {
  const single = firstExport();
  single.episodeId = "e";
  assert.deepEqual(violations(single, schema), []);
});

test("every object the schema closes refuses one unexpected member, at the root and at all thirteen nested sites, with exactly one violation", () => {
  interface ClosedSite { readonly path: readonly string[]; readonly viaOneOf: boolean }
  const closedSites = (node: Schema, path: readonly string[] = [], viaOneOf = false): ClosedSite[] => {
    const sites: ClosedSite[] = node.additionalProperties === false ? [{ path, viaOneOf }] : [];
    for (const [name, child] of Object.entries(node.properties ?? {})) sites.push(...closedSites(child, [...path, name], viaOneOf));
    if (node.items !== undefined) sites.push(...closedSites(node.items, [...path, "*"], viaOneOf));
    for (const branch of node.oneOf ?? []) sites.push(...closedSites(branch, path, true));
    return sites;
  };
  const sites = closedSites(schema);
  // The literal below is the landed contract: a schema that opens any closed object (the walk would follow it) fails here, not silently.
  assert.deepEqual(sites.map(site => site.path.join("/")), [
    "", "steps/*", "steps/*/mask", "steps/*/mask/rejected/*", "steps/*/support", "steps/*/checkpoint", "steps/*/provenance",
    "verifier", "lineage", "lineage/attempts/*", "lineage/arms", "sanitize", "credits/*", "credits/*/derivation",
  ]);
  const member = "zzUnexpectedMember";
  const covered = new Set<string>();
  for (const row of structuralRows()) {
    for (const site of sites) {
      const mutated = clone(row.read());
      const [target] = objectsAt(mutated, site.path);
      if (target === undefined) continue; // this fixture carries no object at that level; another fixture must (checked below)
      target[member] = 1;
      const found = violations(mutated, schema);
      assert.equal(found.length, 1, `${row.exported} injecting at ${site.path.join("/")}: ${JSON.stringify(found)}`);
      // A member injected into an object inside a oneOf branch surfaces as the oneOf node matching no alternative; any other site names the member.
      const expected = site.viaOneOf ? /^\/lineage\/attempts: matches 0 of 2 alternatives$/ : new RegExp(`^${site.path.map(s => s === "*" ? "/\\d+" : s === "" ? "" : `/${s}`).join("")}/${member}: unexpected member$`);
      assert.match(found[0]!, expected, `${row.exported} injecting at ${site.path.join("/")}`);
      covered.add(site.path.join("/"));
    }
  }
  assert.deepEqual([...covered].sort(), sites.map(site => site.path.join("/")).sort());
});

test("a malformed observationDigest or checkpoint.after fails with exactly the pattern violation", () => {
  const badValues = ["sha256:xyz", `sha256:${"a".repeat(63)}`, `x${wellFormedDigest}`, `sha256:${"g".repeat(64)}`, ""];
  for (const bad of badValues) {
    const observation = firstExport();
    firstStep(observation).observationDigest = bad;
    assert.deepEqual(violations(observation, schema), ["/steps/0/observationDigest: pattern"], `observationDigest ${JSON.stringify(bad)}`);
    const after = firstExport();
    (firstStep(after).checkpoint as Json).after = bad;
    assert.deepEqual(violations(after, schema), ["/steps/0/checkpoint/after: pattern"], `checkpoint.after ${JSON.stringify(bad)}`);
  }
});

test("an empty actorId, provenance.basis or provenance.family fails with exactly the too-short violation", () => {
  const actor = firstExport();
  firstStep(actor).actorId = "";
  assert.deepEqual(violations(actor, schema), ["/steps/0/actorId: too short"]);
  const basis = firstExport();
  (firstStep(basis).provenance as Json).basis = "";
  assert.deepEqual(violations(basis, schema), ["/steps/0/provenance/basis: too short"]);
  const family = firstExport();
  (firstStep(family).provenance as Json).family = "";
  assert.deepEqual(violations(family, schema), ["/steps/0/provenance/family: too short"]);
});

test("a fractional step number fails as not an integer while a whole step passes", () => {
  const fractional = firstExport();
  firstStep(fractional).step = 1.5;
  assert.deepEqual(violations(fractional, schema), ["/steps/0/step: expected integer"]);
  assert.deepEqual(violations(firstExport(), schema), []);
});

// MechanicalWorkflows-tsos (cgnq follow-up): the hex-class WIDTH of the four digest sites the configHash/receiptDigest rows never reach.
test("an upper-case or mixed-case hex body fails at observationDigest, checkpoint.after, checkpoint.before and the root digest while a lower-case digest passes", () => {
  const sites: readonly [string, (record: Json, value: string) => void, string][] = [
    ["observationDigest", (record, value) => { firstStep(record).observationDigest = value; }, "/steps/0/observationDigest: pattern"],
    ["checkpoint.after", (record, value) => { (firstStep(record).checkpoint as Json).after = value; }, "/steps/0/checkpoint/after: pattern"],
    // checkpoint.before is a oneOf (digest or the literal unknown): a body matching neither alternative surfaces as the oneOf node matching 0 of 2.
    ["checkpoint.before", (record, value) => { (firstStep(record).checkpoint as Json).before = value; }, "/steps/0/checkpoint/before: matches 0 of 2 alternatives"],
    ["root digest", (record, value) => { record.digest = value; }, "/digest: pattern"],
  ];
  for (const [label, apply, expected] of sites) {
    const good = firstExport();
    apply(good, wellFormedDigest);
    assert.deepEqual(violations(good, schema), [], `${label} lower-case digest`);
    for (const bad of [`sha256:${"A".repeat(64)}`, `sha256:${"aA".repeat(32)}`]) {
      const record = firstExport();
      apply(record, bad);
      assert.deepEqual(violations(record, schema), [expected], `${label} ${JSON.stringify(bad)}`);
    }
  }
});

// MechanicalWorkflows-ouxa (cgnq follow-up): the end anchor, the sha256: prefix, the algorithm label, the root-digest and checkpoint.before shapes, and the closed-object property-key sets.
const digestSiteFeeds = {
  observationDigest: { apply: (record: Json, value: string): void => { firstStep(record).observationDigest = value; }, expected: "/steps/0/observationDigest: pattern" },
  "checkpoint.after": { apply: (record: Json, value: string): void => { (firstStep(record).checkpoint as Json).after = value; }, expected: "/steps/0/checkpoint/after: pattern" },
  "checkpoint.before": { apply: (record: Json, value: string): void => { (firstStep(record).checkpoint as Json).before = value; }, expected: "/steps/0/checkpoint/before: matches 0 of 2 alternatives" },
  configHash: { apply: (record: Json, value: string): void => { (firstStep(record).support as Json).configHash = value; }, expected: "/steps/0/support/configHash: pattern" },
  receiptDigest: { apply: (record: Json, value: string): void => { (record.verifier as Json).receiptDigest = value; }, expected: "/verifier/receiptDigest: pattern" },
  "root digest": { apply: (record: Json, value: string): void => { record.digest = value; }, expected: "/digest: pattern" },
} as const;
type DigestSiteName = keyof typeof digestSiteFeeds;
function expectDigestRefused(siteNames: readonly DigestSiteName[], badValues: readonly string[]): void {
  for (const name of siteNames) {
    const site = digestSiteFeeds[name];
    for (const bad of badValues) {
      const record = firstExport();
      site.apply(record, bad);
      assert.deepEqual(violations(record, schema), [site.expected], `${name} ${JSON.stringify(bad)}`);
    }
  }
}

test("a 65-hex body fails at observationDigest and checkpoint.after: the end anchor stays", () => {
  expectDigestRefused(["observationDigest", "checkpoint.after"], [`sha256:${"a".repeat(65)}`]);
});

test("a bare 64-hex body without the sha256: prefix fails at observationDigest and checkpoint.after: the prefix stays mandatory", () => {
  expectDigestRefused(["observationDigest", "checkpoint.after"], ["a".repeat(64)]);
});

test("a sha512: label over a 64-hex body fails at configHash, receiptDigest, observationDigest, checkpoint.after and the root digest", () => {
  expectDigestRefused(["configHash", "receiptDigest", "observationDigest", "checkpoint.after", "root digest"], [`sha512:${"a".repeat(64)}`]);
});

test("the root digest refuses leading garbage, a non-hex lowercase body and a 65-hex body", () => {
  expectDigestRefused(["root digest"], [`x${wellFormedDigest}`, `sha256:${"g".repeat(64)}`, `sha256:${"a".repeat(65)}`]);
});

test("checkpoint.before refuses leading garbage and a non-hex lowercase body as matching 0 of 2 alternatives while the literal unknown and a lower-case digest pass", () => {
  expectDigestRefused(["checkpoint.before"], [`x${wellFormedDigest}`, `sha256:${"g".repeat(64)}`]);
  for (const good of ["unknown", wellFormedDigest]) {
    const record = firstExport();
    digestSiteFeeds["checkpoint.before"].apply(record, good);
    assert.deepEqual(violations(record, schema), [], `checkpoint.before ${JSON.stringify(good)}`);
  }
});

test("every closed object declares exactly its required members as properties: a closed object that gains an optional member fails here", () => {
  // Structural law over the 14 closed sites: properties equal required, except the one optional member admitted deliberately (MechanicalWorkflows-rvaw option (a), MechanicalWorkflows-a1bvx): the root credits member. A second optional member fails here.
  const closedNodes = (node: Schema, path: readonly string[] = []): { readonly path: string; readonly node: Schema }[] => {
    const found: { readonly path: string; readonly node: Schema }[] = node.additionalProperties === false ? [{ path: path.join("/"), node }] : [];
    for (const [name, child] of Object.entries(node.properties ?? {})) found.push(...closedNodes(child, [...path, name]));
    if (node.items !== undefined) found.push(...closedNodes(node.items, [...path, "*"]));
    for (const branch of node.oneOf ?? []) found.push(...closedNodes(branch, path));
    return found;
  };
  const closed = closedNodes(schema);
  assert.equal(closed.length, 14);
  const optionalByPath: Readonly<Record<string, readonly string[]>> = { "": ["credits"] };
  for (const { path, node } of closed) {
    const expected = [...(node.required ?? []), ...(optionalByPath[path] ?? [])].sort();
    assert.deepEqual(Object.keys(node.properties ?? {}).sort(), expected, `closed object at ${JSON.stringify(path)}`);
  }
});

// MechanicalWorkflows-vyn8 (tsos follow-up): the whole lower-case hex class at every body position, the checkpoint.before 65-hex body and the algorithm-label case.
const upperLetters = ["A", "B", "C", "D", "E", "F"] as const;
const fourHexSites = ["observationDigest", "checkpoint.after", "checkpoint.before", "root digest"] as const;

test("an all-upper 64-hex body of each letter B to F fails at observationDigest, checkpoint.after, checkpoint.before and the root digest", () => {
  expectDigestRefused(fourHexSites, upperLetters.slice(1).map(letter => `sha256:${letter.repeat(64)}`));
});

test("a single upper-case letter A to F at the first or the last body position fails at observationDigest, checkpoint.after, checkpoint.before and the root digest", () => {
  const bodies = upperLetters.flatMap(letter => [`${letter}${"a".repeat(63)}`, `${"a".repeat(63)}${letter}`]);
  assert.equal(bodies.length, 12);
  expectDigestRefused(fourHexSites, bodies.map(body => `sha256:${body}`));
});

test("a 65-hex body fails at checkpoint.before as matching 0 of 2 alternatives while the 64-hex digest passes", () => {
  expectDigestRefused(["checkpoint.before"], [`sha256:${"a".repeat(65)}`]);
  const record = firstExport();
  digestSiteFeeds["checkpoint.before"].apply(record, wellFormedDigest);
  assert.deepEqual(violations(record, schema), []);
});

test("an upper-case or mixed-case sha256 label over a well-formed body fails at observationDigest, checkpoint.after, checkpoint.before and the root digest", () => {
  expectDigestRefused(fourHexSites, ["SHA256", "Sha256"].map(label => `${label}:${"a".repeat(64)}`));
});

test("a bare 64-hex body fails at checkpoint.before and the root digest, and a sha512: label fails at checkpoint.before", () => {
  expectDigestRefused(["checkpoint.before", "root digest"], ["a".repeat(64)]);
  expectDigestRefused(["checkpoint.before"], [`sha512:${"a".repeat(64)}`]);
});

// MechanicalWorkflows-a2pu (ouxa follow-up, after vyn8): the near-miss unknown literal at checkpoint.before and the member-type drops the digest rows never feed.
test("checkpoint.before refuses the near-miss literals none, Unknown and UNKNOWN as matching 0 of 2 alternatives while unknown passes", () => {
  expectDigestRefused(["checkpoint.before"], ["none", "Unknown", "UNKNOWN"]);
  const record = firstExport();
  digestSiteFeeds["checkpoint.before"].apply(record, "unknown");
  assert.deepEqual(violations(record, schema), []);
});

test("verifier.verdict refuses a number and null with exactly the expected-string violation while a string passes", () => {
  for (const bad of [7, null]) {
    const record = firstExport();
    (record.verifier as Json).verdict = bad;
    assert.deepEqual(violations(record, schema), ["/verifier/verdict: expected string"], `verifier.verdict ${JSON.stringify(bad)}`);
  }
  assert.deepEqual(violations(firstExport(), schema), []);
});

test("support.policyId and support.revision refuse a number with exactly the expected-string violation at their own path", () => {
  for (const member of ["policyId", "revision"] as const) {
    const record = firstExport();
    (firstStep(record).support as Json)[member] = 7;
    assert.deepEqual(violations(record, schema), [`/steps/0/support/${member}: expected string`], `support.${member}`);
  }
});

test("a non-string member of steps[0].sampled and of mask.admitted fails with exactly the expected-string violation at that item", () => {
  const sampledRecord = firstExport();
  const sampled = firstStep(sampledRecord).sampled as unknown[];
  assert.ok(sampled.length > 0, "the colony-resilience export samples at least one intent");
  sampled[0] = 7;
  assert.deepEqual(violations(sampledRecord, schema), ["/steps/0/sampled/0: expected string"]);
  const admittedRecord = firstExport();
  const admitted = (firstStep(admittedRecord).mask as Json).admitted as unknown[];
  assert.ok(admitted.length > 0, "the colony-resilience export admits at least one intent");
  admitted[0] = null;
  assert.deepEqual(violations(admittedRecord, schema), ["/steps/0/mask/admitted/0: expected string"]);
});

// MechanicalWorkflows-t5q2 (vyn8 follow-up): the upper-case class at the middle body positions of the four hex sites, and the B..F, single-position and label-case shapes at configHash and receiptDigest.
const middleBodyPositions = [2, 32, 63] as const;
const twoSiteNames = ["configHash", "receiptDigest"] as const;

test("a single upper-case letter A to F at body position 2, 32 or 63 fails at observationDigest, checkpoint.after, checkpoint.before and the root digest", () => {
  const bodies = upperLetters.flatMap(letter => middleBodyPositions.map(position => `${"a".repeat(position - 1)}${letter}${"a".repeat(64 - position)}`));
  assert.equal(bodies.length, 18);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(fourHexSites, bodies.map(body => `sha256:${body}`));
});

test("an all-upper 64-hex body of each letter B to F fails at configHash and receiptDigest", () => {
  expectDigestRefused(twoSiteNames, upperLetters.slice(1).map(letter => `sha256:${letter.repeat(64)}`));
});

test("a single upper-case letter A to F at body position 1, 32 or 64 fails at configHash and receiptDigest", () => {
  const bodies = upperLetters.flatMap(letter => [1, 32, 64].map(position => `${"a".repeat(position - 1)}${letter}${"a".repeat(64 - position)}`));
  assert.equal(bodies.length, 18);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(twoSiteNames, bodies.map(body => `sha256:${body}`));
});

test("an upper-case or mixed-case sha256 label over a well-formed body fails at configHash and receiptDigest", () => {
  expectDigestRefused(twoSiteNames, ["SHA256", "Sha256"].map(label => `${label}:${"a".repeat(64)}`));
});

// MechanicalWorkflows-vh7y (a2pu follow-up, after t5q2): the unknown-literal family closed structurally at all three sites, and the expected-string law at the eleven string leaves the a2pu rows leave out.
test("each of the three unknown-literal sites (logProb, checkpoint.before, lineage.attempts) keeps exactly one { const: unknown } branch inside a two-branch oneOf, and the literal unknown passes at all three", () => {
  const stepProperties = schema.properties!.steps!.items!.properties!;
  const sites: Record<string, readonly Schema[] | undefined> = {
    "steps[].logProb": stepProperties.logProb!.oneOf,
    "steps[].checkpoint.before": stepProperties.checkpoint!.properties!.before!.oneOf,
    "lineage.attempts": schema.properties!.lineage!.properties!.attempts!.oneOf,
  };
  for (const [name, branches] of Object.entries(sites)) {
    assert.ok(branches !== undefined, `${name} keeps its oneOf`);
    assert.equal(branches.length, 2, `${name} keeps exactly two alternatives`);
    const literals = branches.filter(branch => JSON.stringify(branch) === JSON.stringify({ const: "unknown" }));
    assert.equal(literals.length, 1, `${name} keeps exactly one { const: "unknown" } branch, no enum, pattern or prefix stand-in`);
  }
  const record = firstExport();
  firstStep(record).logProb = "unknown";
  (firstStep(record).checkpoint as Json).before = "unknown";
  (record.lineage as Json).attempts = "unknown";
  assert.deepEqual(violations(record, schema), []);
});

const stringLeafBad = [7, null] as const;
const withRejectedStep = (record: Json): Json => {
  const step = (record.steps as Json[]).find(candidate => ((candidate.mask as Json).rejected as unknown[]).length > 0);
  assert.ok(step !== undefined, "the colony-resilience export rejects at least one intent");
  return step;
};
const stepIndexOf = (record: Json, step: Json): number => (record.steps as Json[]).indexOf(step);

test("mask.rejected item intentId and code refuse a number and null with exactly the expected-string violation while the string passes", () => {
  for (const member of ["intentId", "code"] as const) {
    for (const bad of stringLeafBad) {
      const record = firstExport();
      const step = withRejectedStep(record);
      (((step.mask as Json).rejected as Json[])[0]!)[member] = bad;
      assert.deepEqual(violations(record, schema), [`/steps/${stepIndexOf(record, step)}/mask/rejected/0/${member}: expected string`], `rejected.${member} ${JSON.stringify(bad)}`);
    }
  }
  assert.deepEqual(violations(firstExport(), schema), []);
});

test("provenance.readSet and provenance.evidence items refuse a number and null with exactly the expected-string violation while a string item passes", () => {
  for (const member of ["readSet", "evidence"] as const) {
    for (const bad of stringLeafBad) {
      const record = firstExport();
      ((firstStep(record).provenance as Json)[member] as unknown[]).push(bad);
      const index = ((firstStep(record).provenance as Json)[member] as unknown[]).length - 1;
      assert.deepEqual(violations(record, schema), [`/steps/0/provenance/${member}/${index}: expected string`], `provenance.${member} ${JSON.stringify(bad)}`);
    }
    const good = firstExport();
    ((firstStep(good).provenance as Json)[member] as unknown[]).push("a-string-item");
    assert.deepEqual(violations(good, schema), [], `provenance.${member} string`);
  }
});

test("sanitize.removed and sanitize.inherited items refuse a number and null with exactly the expected-string violation while a string item passes", () => {
  for (const member of ["removed", "inherited"] as const) {
    for (const bad of stringLeafBad) {
      const record = firstExport();
      ((record.sanitize as Json)[member] as unknown[]).push(bad);
      const index = ((record.sanitize as Json)[member] as unknown[]).length - 1;
      assert.deepEqual(violations(record, schema), [`/sanitize/${member}/${index}: expected string`], `sanitize.${member} ${JSON.stringify(bad)}`);
    }
    const good = firstExport();
    ((good.sanitize as Json)[member] as unknown[]).push("a-string-item");
    assert.deepEqual(violations(good, schema), [], `sanitize.${member} string`);
  }
});

test("lineage.arms.controlId and treatmentId refuse a number and null with exactly the expected-string violation while the string passes", () => {
  for (const member of ["controlId", "treatmentId"] as const) {
    for (const bad of stringLeafBad) {
      const record = firstExport();
      ((record.lineage as Json).arms as Json)[member] = bad;
      assert.deepEqual(violations(record, schema), [`/lineage/arms/${member}: expected string`], `arms.${member} ${JSON.stringify(bad)}`);
    }
  }
  assert.deepEqual(violations(firstExport(), schema), []);
});

test("a lineage.attempts item id, parent and outcome refuse a number and null as matching 0 of 2 alternatives while all-string items pass", () => {
  const attempt = (): Json => ({ id: "attempt-1", parent: "attempt-0", outcome: "landed" });
  const withAttempts = (item: Json): Json => { const record = firstExport(); (record.lineage as Json).attempts = [item]; return record; };
  assert.deepEqual(violations(withAttempts(attempt()), schema), []);
  for (const member of ["id", "parent", "outcome"] as const) {
    for (const bad of stringLeafBad) {
      const item = attempt();
      item[member] = bad;
      assert.deepEqual(violations(withAttempts(item), schema), ["/lineage/attempts: matches 0 of 2 alternatives"], `attempts[0].${member} ${JSON.stringify(bad)}`);
    }
  }
});

// MechanicalWorkflows-jrmm (t5q2 follow-up, after vh7y): the digest-site family closed by sweep instead of by sample, over every body position at all six sites and every non-lower-case spelling of the algorithm label.
const allDigestSiteNames = [...fourHexSites, ...twoSiteNames] as const;

test("a single upper-case letter A to F at every body position 1 to 64 fails at all six digest sites", () => {
  const bodies = upperLetters.flatMap(letter => Array.from({ length: 64 }, (_, index) => `${"a".repeat(index)}${letter}${"a".repeat(63 - index)}`));
  assert.equal(bodies.length, 384);
  assert.equal(new Set(bodies).size, 384);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

test("each of the seven non-lower-case spellings of the sha256 label over a well-formed body fails at all six digest sites", () => {
  const labels = Array.from({ length: 7 }, (_, index) => {
    const mask = index + 1;
    return [...["s", "h", "a"].map((letter, bit) => ((mask >> bit) & 1 ? letter.toUpperCase() : letter)), "256"].join("");
  });
  assert.equal(new Set(labels).size, 7);
  assert.ok(labels.every(label => label !== "sha256" && label.toLowerCase() === "sha256"));
  expectDigestRefused(allDigestSiteNames, labels.map(label => `${label}:${"a".repeat(64)}`));
});

// MechanicalWorkflows-7bkl (vh7y follow-up, after jrmm): the admit side of the logProb number branch and the unpatterned value domain of the eleven string leaves the vh7y type-law rows leave unfed.
test("the logProb number branch accepts a finite negative fraction, zero, -1e-12 and -1234.5 at every step", () => {
  const values = [-0.6931, 0, -1e-12, -1234.5] as const;
  for (const value of values) {
    const record = firstExport();
    const steps = record.steps as Json[];
    assert.ok(steps.length > 1, "the colony-resilience export holds more than one step");
    for (const step of steps) step.logProb = value;
    assert.deepEqual(violations(record, schema), [], `logProb ${value} at all ${steps.length} steps`);
  }
  assert.equal(values.length, 4);
});

// MechanicalWorkflows-qm5il (8k31 follow-up): the lowest logProb the admit rows feed was -1234.5, so a finite minimum floor survived; -Number.MAX_VALUE at every step kills any finite floor.
test("the logProb number branch accepts -Number.MAX_VALUE at every step: no finite minimum floor bounds it", () => {
  const record = firstExport();
  const steps = record.steps as Json[];
  assert.ok(steps.length > 1, "the colony-resilience export holds more than one step");
  for (const step of steps) step.logProb = -Number.MAX_VALUE;
  assert.ok(steps.every(step => step.logProb === -Number.MAX_VALUE && Number.isFinite(step.logProb as number)));
  assert.deepEqual(violations(record, schema), [], `logProb -Number.MAX_VALUE at all ${steps.length} steps`);
});

const stringLeaves: readonly (readonly [string, (record: Json, value: string) => void])[] = [
  ["mask.rejected intentId", (record, value) => { (((withRejectedStep(record).mask as Json).rejected as Json[])[0]!).intentId = value; }],
  ["mask.rejected code", (record, value) => { (((withRejectedStep(record).mask as Json).rejected as Json[])[0]!).code = value; }],
  ["provenance.readSet item", (record, value) => { ((firstStep(record).provenance as Json).readSet as unknown[]).push(value); }],
  ["provenance.evidence item", (record, value) => { ((firstStep(record).provenance as Json).evidence as unknown[]).push(value); }],
  ["sanitize.removed item", (record, value) => { ((record.sanitize as Json).removed as unknown[]).push(value); }],
  ["sanitize.inherited item", (record, value) => { ((record.sanitize as Json).inherited as unknown[]).push(value); }],
  ["lineage.arms controlId", (record, value) => { ((record.lineage as Json).arms as Json).controlId = value; }],
  ["lineage.arms treatmentId", (record, value) => { ((record.lineage as Json).arms as Json).treatmentId = value; }],
  ["lineage.attempts id", (record, value) => { (record.lineage as Json).attempts = [{ id: value, parent: "attempt-0", outcome: "landed" }]; }],
  ["lineage.attempts parent", (record, value) => { (record.lineage as Json).attempts = [{ id: "attempt-1", parent: value, outcome: "landed" }]; }],
  ["lineage.attempts outcome", (record, value) => { (record.lineage as Json).attempts = [{ id: "attempt-1", parent: "attempt-0", outcome: value }]; }],
];

test("the empty string passes at each of the eleven unpatterned string leaves", () => {
  assert.equal(stringLeaves.length, 11);
  for (const [name, feed] of stringLeaves) {
    const record = firstExport();
    feed(record, "");
    assert.deepEqual(violations(record, schema), [], `empty string at ${name}`);
  }
});

test("a spaced, a punctuated, a lower-case and a non-ASCII string pass at each of the eleven unpatterned string leaves", () => {
  const values = ["two words", "a,b;c!d?", "lower-case", "naïve-日本語"] as const;
  assert.equal(values.length, 4);
  let checked = 0;
  for (const [name, feed] of stringLeaves) {
    for (const value of values) {
      const record = firstExport();
      feed(record, value);
      assert.deepEqual(violations(record, schema), [], `${JSON.stringify(value)} at ${name}`);
      checked += 1;
    }
  }
  assert.equal(checked, 44);
});

// MechanicalWorkflows-e5ig (jrmm follow-up): the digest-site residue the single-letter and label-case sweep leaves open, closed at all six sites: non-hex upper-case letters, exactly two upper-case letters, short bodies, foreign and hyphenated labels and padding.
const digestBodyWith = (pairs: readonly (readonly [number, string])[]): string => {
  const chars = Array.from({ length: 64 }, () => "a");
  for (const [position, letter] of pairs) chars[position - 1] = letter;
  return chars.join("");
};
const wellFormedDigestValue = `sha256:${"a".repeat(64)}`;

test("an upper-case non-hex letter G to Z at body positions 1, 33 and 64 fails at all six digest sites", () => {
  const letters = Array.from({ length: 20 }, (_, index) => String.fromCharCode(71 + index));
  assert.equal(letters.join(""), "GHIJKLMNOPQRSTUVWXYZ");
  const bodies = letters.flatMap(letter => [1, 33, 64].map(position => digestBodyWith([[position, letter]])));
  assert.equal(bodies.length, 60);
  assert.equal(new Set(bodies).size, 60);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

test("a body with exactly two upper-case hex letters fails at all six digest sites", () => {
  const pairs: readonly (readonly (readonly [number, string])[])[] = [
    [[1, "A"], [64, "F"]], [[2, "B"], [63, "E"]], [[32, "C"], [33, "D"]], [[10, "F"], [50, "A"]], [[5, "E"], [6, "E"]], [[3, "D"], [31, "C"]],
  ];
  const bodies = pairs.map(digestBodyWith);
  assert.ok(bodies.every(body => body.length === 64 && (body.match(/[A-F]/g) ?? []).length === 2));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

test("an empty, a one-hex and a 63-hex body fail at all six digest sites while the 64-hex body passes at each", () => {
  expectDigestRefused(allDigestSiteNames, ["sha256:", "sha256:a", `sha256:${"a".repeat(63)}`]);
  for (const name of allDigestSiteNames) {
    const record = firstExport();
    digestSiteFeeds[name].apply(record, wellFormedDigestValue);
    assert.deepEqual(violations(record, schema), [], name);
  }
});

test("a foreign or hyphenated algorithm label over a 64-hex body fails at all six digest sites", () => {
  const labels = ["sha384", "sha224", "sha1", "sha-256", "sha3-256"];
  assert.equal(new Set(labels).size, 5);
  expectDigestRefused(allDigestSiteNames, labels.map(label => `${label}:${"a".repeat(64)}`));
});

test("a well-formed digest with one leading or trailing space, tab or newline fails at all six digest sites", () => {
  const padded = [" ", "\t", "\n"].flatMap(pad => [`${pad}${wellFormedDigestValue}`, `${wellFormedDigestValue}${pad}`]);
  assert.equal(new Set(padded).size, 6);
  expectDigestRefused(allDigestSiteNames, padded);
});

// MechanicalWorkflows-xab5 (7bkl follow-up, after e5ig): the structure of the schema itself. The value rows above feed strings through a validator that implements eleven keywords; these rows pin the sixteen unpatterned string leaf nodes and close every schema node to that keyword set, so a keyword the validator cannot see (exclusiveMaximum, maximum, maxLength) cannot hide behind a green value row.
const nodeAt = (root: Schema, path: readonly (string | number)[]): unknown => {
  let current: unknown = root;
  for (const segment of path) {
    assert.ok(current !== null && typeof current === "object", `schema path ${path.join(".")} stops before ${String(segment)}`);
    current = (current as Record<string | number, unknown>)[segment];
  }
  return current;
};
const stepProperties = ["properties", "steps", "items", "properties"] as const;
// MechanicalWorkflows-qm5il (8k31 follow-up): the lineage.attempts array branch is located by type, so an equivalent swap of the two oneOf branches leaves the path rows and the walk assertion green.
const attemptsBranches = schema.properties!.lineage!.properties!.attempts!.oneOf!;
const attemptsArrayIndexes = attemptsBranches.flatMap((branch, index) => (branch.type === "array" ? [index] : []));
assert.equal(attemptsArrayIndexes.length, 1, "lineage.attempts keeps exactly one array branch");
const attemptsArrayIndex = attemptsArrayIndexes[0]!;
const unpatternedStringLeafPaths: readonly (readonly [string, readonly (string | number)[]])[] = [
  ["steps[].sampled item", [...stepProperties, "sampled", "items"]],
  ["mask.admitted item", [...stepProperties, "mask", "properties", "admitted", "items"]],
  ["mask.rejected intentId", [...stepProperties, "mask", "properties", "rejected", "items", "properties", "intentId"]],
  ["mask.rejected code", [...stepProperties, "mask", "properties", "rejected", "items", "properties", "code"]],
  ["support.policyId", [...stepProperties, "support", "properties", "policyId"]],
  ["support.revision", [...stepProperties, "support", "properties", "revision"]],
  ["provenance.readSet item", [...stepProperties, "provenance", "properties", "readSet", "items"]],
  ["provenance.evidence item", [...stepProperties, "provenance", "properties", "evidence", "items"]],
  ["verifier.verdict", ["properties", "verifier", "properties", "verdict"]],
  ["lineage.attempts id", ["properties", "lineage", "properties", "attempts", "oneOf", attemptsArrayIndex, "items", "properties", "id"]],
  ["lineage.attempts parent", ["properties", "lineage", "properties", "attempts", "oneOf", attemptsArrayIndex, "items", "properties", "parent"]],
  ["lineage.attempts outcome", ["properties", "lineage", "properties", "attempts", "oneOf", attemptsArrayIndex, "items", "properties", "outcome"]],
  ["lineage.arms controlId", ["properties", "lineage", "properties", "arms", "properties", "controlId"]],
  ["lineage.arms treatmentId", ["properties", "lineage", "properties", "arms", "properties", "treatmentId"]],
  ["sanitize.removed item", ["properties", "sanitize", "properties", "removed", "items"]],
  ["sanitize.inherited item", ["properties", "sanitize", "properties", "inherited", "items"]],
];

test("each of the sixteen unpatterned string leaf nodes is exactly { type: string } with no further keyword", () => {
  assert.equal(unpatternedStringLeafPaths.length, 16);
  assert.equal(new Set(unpatternedStringLeafPaths.map(([name]) => name)).size, 16);
  for (const [name, path] of unpatternedStringLeafPaths) assert.deepEqual(nodeAt(schema, path), { type: "string" }, name);
});

test("the lineage.attempts array branch, found by type, holds items with exactly the members id, outcome and parent, each exactly { type: string }", () => {
  const arrayBranches = attemptsBranches.filter(branch => branch.type === "array");
  assert.equal(arrayBranches.length, 1);
  const itemProperties = arrayBranches[0]!.items!.properties!;
  assert.deepEqual(Object.keys(itemProperties).sort(), ["id", "outcome", "parent"]);
  for (const member of ["id", "outcome", "parent"]) assert.deepEqual(itemProperties[member], { type: "string" }, member);
});

const implementedKeywords = ["type", "const", "enum", "minLength", "minimum", "maximum", "minItems", "pattern", "required", "properties", "additionalProperties", "items", "oneOf"] as const;
const annotationKeywords = ["$schema", "$id", "title", "description"] as const;
const schemaNodes = (node: Schema, path: string, out: [string, Schema][] = []): [string, Schema][] => {
  out.push([path, node]);
  for (const [key, child] of Object.entries(node.properties ?? {})) schemaNodes(child, `${path}.properties.${key}`, out);
  if (node.items !== undefined) schemaNodes(node.items, `${path}.items`, out);
  (node.oneOf ?? []).forEach((branch, index) => schemaNodes(branch, `${path}.oneOf[${index}]`, out));
  return out;
};

test("every schema node carries only the keywords the row validator implements plus $schema, $id, title and description", () => {
  const allowed = new Set<string>([...implementedKeywords, ...annotationKeywords]);
  assert.equal(allowed.size, 17);
  const nodes = schemaNodes(schema, "$");
  assert.ok(nodes.length > unpatternedStringLeafPaths.length, `the walk visits ${nodes.length} nodes`);
  assert.ok(nodes.some(([path]) => path.includes(`.oneOf[${attemptsArrayIndex}].items.properties.id`)), "the walk reaches the oneOf attempts items");
  assert.ok(nodes.some(([path]) => path.endsWith(".mask.properties.rejected.items.properties.code")), "the walk reaches mask.rejected code");
  for (const [path, node] of nodes) {
    const foreign = Object.keys(node).filter(key => !allowed.has(key));
    assert.deepEqual(foreign, [], `${path} carries keyword(s) the row validator cannot see`);
  }
});

// The five a2pu leaves (and the W3 values the 7bkl rows dropped) fed through the same unpatterned leaves.
const a2puLeaves: readonly (readonly [string, (record: Json, value: string) => void])[] = [
  ["support.policyId", (record, value) => { (firstStep(record).support as Json).policyId = value; }],
  ["support.revision", (record, value) => { (firstStep(record).support as Json).revision = value; }],
  ["verifier.verdict", (record, value) => { (record.verifier as Json).verdict = value; }],
  ["steps[0].sampled item", (record, value) => { (firstStep(record).sampled as unknown[])[0] = value; }],
  ["mask.admitted item", (record, value) => { ((firstStep(record).mask as Json).admitted as unknown[]).push(value); }],
];

test("the empty, a spaced, a punctuated, a lower-case and a non-ASCII string pass at each of the five support, verdict, sampled and admitted leaves", () => {
  const values = ["", "two words", "a,b;c!d?", "lower-case", "naïve-日本語"] as const;
  assert.equal(a2puLeaves.length, 5);
  let checked = 0;
  for (const [name, feed] of a2puLeaves) {
    for (const value of values) {
      const record = firstExport();
      feed(record, value);
      assert.deepEqual(violations(record, schema), [], `${JSON.stringify(value)} at ${name}`);
      checked += 1;
    }
  }
  assert.equal(checked, 25);
});

test("an edge-spaced, an astral and a colon-and-slash string pass at each of the eleven 7bkl string leaves and the five support, verdict, sampled and admitted leaves", () => {
  const values = [" leading and trailing ", "\u{1F642}", "lower-case/punct:;!?"] as const;
  assert.equal(values[1]!.length, 2);
  assert.equal(stringLeaves.length + a2puLeaves.length, 16);
  let checked = 0;
  for (const [name, feed] of [...stringLeaves, ...a2puLeaves]) {
    for (const value of values) {
      const record = firstExport();
      feed(record, value);
      assert.deepEqual(violations(record, schema), [], `${JSON.stringify(value)} at ${name}`);
      checked += 1;
    }
  }
  assert.equal(checked, 48);
});

// MechanicalWorkflows-ak6r (e5ig follow-up, after xab5): the digest-site sample gaps the e5ig rows leave, closed as sweeps at all six sites: every body position for the non-hex letters, every body length, foreign labels, separator variants, trim-class edges and every upper-case count.
const nonHexUpperLetters = Array.from({ length: 20 }, (_, index) => String.fromCharCode(71 + index));
const nonHexLowerLetters = Array.from({ length: 20 }, (_, index) => String.fromCharCode(103 + index));

test("an upper-case non-hex letter G to Z at every body position 1 to 64 fails at all six digest sites", () => {
  assert.equal(nonHexUpperLetters.join(""), "GHIJKLMNOPQRSTUVWXYZ");
  const bodies = nonHexUpperLetters.flatMap(letter => Array.from({ length: 64 }, (_, index) => digestBodyWith([[index + 1, letter]])));
  assert.equal(bodies.length, 1280);
  assert.equal(new Set(bodies).size, 1280);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

test("a lower-case non-hex letter g to z at every body position 1 to 64 fails at all six digest sites", () => {
  assert.equal(nonHexLowerLetters.join(""), "ghijklmnopqrstuvwxyz");
  const bodies = nonHexLowerLetters.flatMap(letter => Array.from({ length: 64 }, (_, index) => digestBodyWith([[index + 1, letter]])));
  assert.equal(bodies.length, 1280);
  assert.equal(new Set(bodies).size, 1280);
  assert.ok(bodies.every(body => body.length === 64));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

test("every lower-hex body length 2 to 62 and 66 to 128 fails at all six digest sites", () => {
  const lengths = [...Array.from({ length: 61 }, (_, index) => index + 2), ...Array.from({ length: 63 }, (_, index) => index + 66)];
  assert.equal(lengths.length, 124);
  assert.ok(lengths.every(length => length !== 64));
  assert.equal(lengths[0], 2);
  assert.equal(lengths[60], 62);
  assert.equal(lengths[61], 66);
  assert.equal(lengths[123], 128);
  expectDigestRefused(allDigestSiteNames, lengths.map(length => `sha256:${"a".repeat(length)}`));
});

test("the foreign labels md5, blake3 and ripemd160 over a 64-hex body fail at all six digest sites", () => {
  const labels = ["md5", "blake3", "ripemd160"];
  assert.equal(new Set(labels).size, 3);
  expectDigestRefused(allDigestSiteNames, labels.map(label => `${label}:${"a".repeat(64)}`));
});

test("the label kept with no separator, a double colon, an equals sign, a hyphen, a semicolon or a space instead of the colon fails at all six digest sites", () => {
  const separators = ["", "::", "=", "-", ";", " "];
  assert.equal(new Set(separators).size, 6);
  expectDigestRefused(allDigestSiteNames, separators.map(separator => `sha256${separator}${"a".repeat(64)}`));
});

test("one leading or trailing CR, VT, FF, NBSP, BOM or U+2028 and one space after the colon fail at all six digest sites", () => {
  const edges = ["\r", "\v", "\f", " ", "﻿", " "];
  assert.equal(new Set(edges).size, 6);
  const values = [...edges.flatMap(edge => [`${edge}${wellFormedDigestValue}`, `${wellFormedDigestValue}${edge}`]), `sha256: ${"a".repeat(64)}`];
  assert.equal(values.length, 13);
  assert.equal(new Set(values).size, 13);
  expectDigestRefused(allDigestSiteNames, values);
});

test("a body with exactly k upper-case hex letters for every k from 3 to 63 fails at all six digest sites", () => {
  const bodies = Array.from({ length: 61 }, (_, index) => {
    const count = index + 3;
    return Array.from({ length: 64 }, (_, position) => (position < count ? upperLetters[position % 6]! : "a")).join("");
  });
  assert.equal(bodies.length, 61);
  assert.equal(new Set(bodies).size, 61);
  bodies.forEach((body, index) => {
    assert.equal(body.length, 64);
    assert.equal((body.match(/[A-F]/g) ?? []).length, index + 3);
  });
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
});

// MechanicalWorkflows-8k31 (xab5 follow-up, after ak6r): the four minLength-1 string leaves and the integer step leaf sit outside the sixteen-leaf structural pin and every value feed above, so a pattern that admits the empty string and every fixture value, or a step minimum of 0, would survive the file. Z1 pins the four string nodes exactly, Z2 feeds seven string shapes through all four, Z3 pins the step node and its negative and fractional values.
const minLengthOneLeaves: readonly (readonly [string, readonly (string | number)[], (record: Json, value: string) => void])[] = [
  ["episodeId", ["properties", "episodeId"], (record, value) => { record.episodeId = value; }],
  ["steps[].actorId", [...stepProperties, "actorId"], (record, value) => { firstStep(record).actorId = value; }],
  ["steps[].provenance.basis", [...stepProperties, "provenance", "properties", "basis"], (record, value) => { (firstStep(record).provenance as Json).basis = value; }],
  ["steps[].provenance.family", [...stepProperties, "provenance", "properties", "family"], (record, value) => { (firstStep(record).provenance as Json).family = value; }],
];

test("each of the four minLength-1 string leaf nodes (episodeId, actorId, provenance.basis, provenance.family) is exactly { type: string, minLength: 1 } with no further keyword", () => {
  assert.equal(minLengthOneLeaves.length, 4);
  assert.equal(new Set(minLengthOneLeaves.map(([name]) => name)).size, 4);
  for (const [name, path] of minLengthOneLeaves) assert.deepEqual(nodeAt(schema, path), { type: "string", minLength: 1 }, name);
});

test("an edge-spaced, an astral, a colon-and-slash, a spaced, a semicolon, a non-ASCII and a 65-character string pass at each of the four minLength-1 leaves while the empty string fails", () => {
  const values = [" leading and trailing ", "\u{1F642}", "lower-case/punct:;!?", "two words", "a,b;c!d?", "naïve-日本語", "x".repeat(65)] as const;
  assert.equal(values.length, 7);
  assert.equal(new Set(values).size, 7);
  assert.equal(values[1]!.length, 2);
  assert.equal(values[6]!.length, 65);
  let checked = 0;
  for (const [name, , feed] of minLengthOneLeaves) {
    for (const value of values) {
      const record = firstExport();
      feed(record, value);
      assert.deepEqual(violations(record, schema), [], `${JSON.stringify(value)} at ${name}`);
      checked += 1;
    }
    const empty = firstExport();
    feed(empty, "");
    assert.ok(violations(empty, schema).some(line => line.endsWith(": too short")), `the empty string fails at ${name}`);
  }
  assert.equal(checked, 28);
});

test("the steps[].step node is exactly { type: integer }, a negative step passes and a fractional step fails with expected integer", () => {
  assert.deepEqual(nodeAt(schema, [...stepProperties, "step"]), { type: "integer" });
  const negative = firstExport();
  firstStep(negative).step = -1;
  assert.deepEqual(violations(negative, schema), []);
  const fractional = firstExport();
  firstStep(fractional).step = 1.5;
  assert.deepEqual(violations(fractional, schema), ["/steps/0/step: expected integer"]);
});

// MechanicalWorkflows-uw92 (ak6r follow-up, after 8k31): residual widenings of the six digest-site patterns that the landed sweeps leave unpinned: native-length labels over their own body length, a single non-hex separator character inside an otherwise valid body, the remaining Unicode whitespace edges, an upper-case run placed at the end of the body, and a non-colon separator after the label.
const sixSiteCount = allDigestSiteNames.length;

test("the sha512 label over a 128-hex body, sha1 over a 40-hex body and md5 over a 32-hex body fail at all six digest sites", () => {
  const values = [`sha512:${"a".repeat(128)}`, `sha1:${"a".repeat(40)}`, `md5:${"a".repeat(32)}`];
  assert.equal(sixSiteCount, 6);
  assert.deepEqual(values.map(value => value.length), [135, 45, 36]);
  assert.equal(new Set(values).size, 3);
  expectDigestRefused(allDigestSiteNames, values);
  assert.equal(values.length * sixSiteCount, 18);
});

test("a hyphen, underscore, dot, plus, slash, space or tab substituted inside a 64-hex body at positions 1, 33 and 64 fails at all six digest sites", () => {
  const characters = ["-", "_", ".", "+", "/", " ", "\t"];
  const positions = [1, 33, 64];
  const bodies = characters.flatMap(character => positions.map(position => digestBodyWith([[position, character]])));
  assert.equal(bodies.length, 21);
  assert.equal(new Set(bodies).size, 21);
  assert.ok(bodies.every(body => body.length === 64));
  assert.ok(bodies.every(body => /[^0-9a-f]/.test(body)));
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
  assert.equal(bodies.length * sixSiteCount, 126);
});

test("one leading and one trailing U+2029, U+0085, U+1680, each of U+2000 to U+200A, U+202F, U+205F and U+3000 fail at all six digest sites", () => {
  const edges = [0x2029, 0x0085, 0x1680, ...Array.from({ length: 11 }, (_, index) => 0x2000 + index), 0x202f, 0x205f, 0x3000].map(code => String.fromCodePoint(code));
  assert.equal(edges.length, 17);
  assert.equal(new Set(edges).size, 17);
  assert.ok(edges.every(edge => edge.length === 1));
  const values = edges.flatMap(edge => [`${edge}${wellFormedDigestValue}`, `${wellFormedDigestValue}${edge}`]);
  assert.equal(values.length, 34);
  assert.equal(new Set(values).size, 34);
  expectDigestRefused(allDigestSiteNames, values);
  assert.equal(values.length * sixSiteCount, 204);
});

test("a 64-hex body whose last k characters are upper-case hex letters fails at all six digest sites for every k from 3 to 63", () => {
  const bodies = Array.from({ length: 61 }, (_, index) => {
    const count = index + 3;
    return Array.from({ length: 64 }, (_, position) => (position >= 64 - count ? upperLetters[position % 6]! : "a")).join("");
  });
  assert.equal(bodies.length, 61);
  assert.equal(new Set(bodies).size, 61);
  bodies.forEach((body, index) => {
    assert.equal(body.length, 64);
    assert.equal((body.match(/[A-F]/g) ?? []).length, index + 3);
    assert.match(body, new RegExp(`^a{${64 - (index + 3)}}[A-F]{${index + 3}}$`));
  });
  expectDigestRefused(allDigestSiteNames, bodies.map(body => `sha256:${body}`));
  assert.equal(bodies.length * sixSiteCount, 366);
});

test("a slash, dot, underscore, comma, pipe or full-width colon in place of the colon after the label fails at all six digest sites", () => {
  const separators = ["/", ".", "_", ",", "|", "："];
  assert.equal(new Set(separators).size, 6);
  assert.equal(separators[5]!.codePointAt(0), 0xff1a);
  const values = separators.map(separator => `sha256${separator}${"a".repeat(64)}`);
  assert.ok(values.every(value => !value.startsWith("sha256:")));
  expectDigestRefused(allDigestSiteNames, values);
  assert.equal(values.length * sixSiteCount, 36);
});

// MechanicalWorkflows-93mr (uw92 follow-up, after uw92 T69): the six patterned digest-site schema nodes are the only string nodes with no exact-node pin; one row pins each node exactly so every text-level widening of a digest pattern, at any position or character class, dies here.
test("the six digest-site schema nodes equal the sha256 lowercase-hex pattern exactly, checkpoint.before beside the unknown constant", () => {
  const digestPattern = "^sha256:[0-9a-f]{64}$";
  const digestSiteNodePaths: readonly (readonly [string, readonly (string | number)[]])[] = [
    ["steps[].support.configHash", [...stepProperties, "support", "properties", "configHash"]],
    ["steps[].observationDigest", [...stepProperties, "observationDigest"]],
    ["steps[].checkpoint.after", [...stepProperties, "checkpoint", "properties", "after"]],
    ["steps[].checkpoint.before", [...stepProperties, "checkpoint", "properties", "before"]],
    ["verifier.receiptDigest", ["properties", "verifier", "properties", "receiptDigest"]],
    ["root digest", ["properties", "digest"]],
  ];
  assert.equal(digestSiteNodePaths.length, 6);
  assert.equal(new Set(digestSiteNodePaths.map(([name]) => name)).size, 6);
  assert.equal(digestSiteNodePaths.length, sixSiteCount);
  for (const [name, path] of digestSiteNodePaths) {
    if (name === "steps[].checkpoint.before") {
      assert.deepEqual(nodeAt(schema, path), { oneOf: [{ type: "string", pattern: digestPattern }, { const: "unknown" }] }, name);
    } else {
      assert.deepEqual(nodeAt(schema, path), { type: "string", pattern: digestPattern }, name);
    }
  }
  const patterns = digestSiteNodePaths.map(([, path]) => {
    const node = nodeAt(schema, path) as { pattern?: string; oneOf?: { pattern?: string }[] };
    return node.pattern ?? node.oneOf![0]!.pattern;
  });
  assert.equal(patterns.length, 6);
  assert.equal(new Set(patterns).size, 1);
  assert.equal(patterns[0], digestPattern);
});

// MechanicalWorkflows-a1bvx (rvaw option (a), 803g D2): the schema admits the OPTIONAL credits member attachPerActorCredit writes.
const creditRow: PerActorCredit = { actorId: "lane", valueMicro: 125000, derivation: { kind: "intervention", reference: "arm:landing-queue-seed7:lane-treatment" } };
const creditedExport = (credit: PerActorCredit = creditRow): Json => {
  const episode = toEpisode(readJson(rows[0].source) as unknown as EnvironmentEpisode);
  const credited = attachPerActorCredit(exportEpisodeForTraining(episode), [credit]);
  return JSON.parse(trainingBytes(credited)) as Json;
};
const withCredits = (credits: unknown): Json => ({ ...creditedExport(), credits });

test("a1bvx an export carrying one attached credit row validates, re-validates after canonical bytes are re-imported, and the uncredited export still validates", () => {
  const credited = creditedExport();
  assert.equal((credited.credits as unknown[]).length, 1);
  assert.deepEqual(violations(credited, schema), []);
  assert.equal(importTrainingExport(credited).ok, true);
  const uncredited = readJson(rows[0].exported);
  assert.equal("credits" in uncredited, false);
  assert.deepEqual(violations(uncredited, schema), []);
  assert.deepEqual([...(schema.required ?? [])].includes("credits"), false);
});

test("a1bvx both causal derivation kinds validate and a derivation kind outside the two causal rungs fails naming the kind path", () => {
  for (const kind of ["intervention", "counterfactual"] as const) {
    assert.deepEqual(violations(creditedExport({ ...creditRow, derivation: { kind, reference: "arm:x" } }), schema), [], kind);
  }
  const row = (kind: unknown): unknown => ({ actorId: "lane", valueMicro: 1, derivation: { kind, reference: "r" } });
  for (const kind of ["global", "team-outcome", "", null, 1]) {
    assert.deepEqual(violations(withCredits([row(kind)]), schema), ["/credits/0/derivation/kind: not in enum"], JSON.stringify(kind));
  }
});

test("a1bvx a credits member that is not a non-empty array, or that holds a malformed row, fails at the exact path", () => {
  const good = (): Json => ({ actorId: "lane", valueMicro: 5, derivation: { kind: "counterfactual", reference: "r" } });
  const minus = (key: string): Json => { const row = good(); delete row[key]; return row; };
  assert.deepEqual(violations(withCredits([]), schema), ["/credits: too few items"]);
  assert.deepEqual(violations(withCredits({}), schema), ["/credits: expected array"]);
  assert.deepEqual(violations(withCredits(null), schema), ["/credits: expected array"]);
  assert.deepEqual(violations(withCredits([minus("derivation")]), schema), ["/credits/0/derivation: required member missing"]);
  assert.deepEqual(violations(withCredits([minus("actorId")]), schema), ["/credits/0/actorId: required member missing"]);
  assert.deepEqual(violations(withCredits([minus("valueMicro")]), schema), ["/credits/0/valueMicro: required member missing"]);
  assert.deepEqual(violations(withCredits([{ ...good(), actorId: "" }]), schema), ["/credits/0/actorId: too short"]);
  assert.deepEqual(violations(withCredits([{ ...good(), extra: 1 }]), schema), ["/credits/0/extra: unexpected member"]);
  assert.deepEqual(violations(withCredits([{ ...good(), derivation: { kind: "intervention" } }]), schema), ["/credits/0/derivation/reference: required member missing"]);
  assert.deepEqual(violations(withCredits([{ ...good(), derivation: { kind: "intervention", reference: "" } }]), schema), ["/credits/0/derivation/reference: too short"]);
  assert.deepEqual(violations(withCredits([{ ...good(), derivation: { kind: "intervention", reference: "r", extra: true } }]), schema), ["/credits/0/derivation/extra: unexpected member"]);
});

test("a1bvx valueMicro is an integer bounded to the safe-integer range: a fraction fails, negative and zero pass, 2^53-1 passes and 2^53 fails", () => {
  const rowWith = (valueMicro: unknown): unknown => ({ actorId: "lane", valueMicro, derivation: { kind: "intervention", reference: "r" } });
  for (const ok of [0, -1, 1, -125000, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]) assert.deepEqual(violations(withCredits([rowWith(ok)]), schema), [], String(ok));
  assert.deepEqual(violations(withCredits([rowWith(0.5)]), schema), ["/credits/0/valueMicro: expected integer"]);
  assert.deepEqual(violations(withCredits([rowWith("5")]), schema), ["/credits/0/valueMicro: expected integer"]);
  assert.deepEqual(violations(withCredits([rowWith(Number.MAX_SAFE_INTEGER + 1)]), schema), ["/credits/0/valueMicro: above maximum"]);
  assert.deepEqual(violations(withCredits([rowWith(Number.MIN_SAFE_INTEGER - 1)]), schema), ["/credits/0/valueMicro: below minimum"]);
});

test("a1bvx a top-level member beside credits still fails: the root stays closed and credits is the only optional member", () => {
  assert.deepEqual(violations({ ...creditedExport(), creditz: [] }, schema), ["/creditz: unexpected member"]);
  assert.deepEqual(Object.keys(schema.properties ?? {}).filter(key => !(schema.required ?? []).includes(key)), ["credits"]);
});
