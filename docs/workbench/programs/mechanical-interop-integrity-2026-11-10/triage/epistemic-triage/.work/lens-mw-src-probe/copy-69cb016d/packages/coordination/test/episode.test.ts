import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, episodeBytes, labelEpisodeMode, sanitizeValue, canonicalJson, digest } from "../dist/index.js";
import type { Episode, EnvironmentEpisode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const schema = JSON.parse(readFileSync(join(here, "../schema/episode.v1.schema.json"), "utf8")) as Schema;

/** One row per environment: the pinned source episode, the exported fixture beside it. */
const rows = [
  { env: "landing-queue", source: "landing-queue-seed7.json", exported: "episode-landing-queue-seed7.json" },
  { env: "compaction-inheritance", source: "compaction-inheritance-seed7.json", exported: "episode-compaction-inheritance-seed7.json" },
  { env: "colony-resilience", source: "colony-resilience-seed29.json", exported: "episode-colony-resilience-seed29.json" },
  { env: "artifact-recovery", source: "artifact-recovery-seed7.json", exported: "episode-artifact-recovery-seed7.json" },
  { env: "quorum-evidence", source: "quorum-evidence-independent-seed7.json", exported: "episode-quorum-evidence-independent-seed7.json" },
] as const;

const readSource = (name: string): { readonly raw: string; readonly episode: EnvironmentEpisode } => {
  const raw = readFileSync(join(fixtureDir, name), "utf8");
  return { raw, episode: JSON.parse(raw) as EnvironmentEpisode };
};

// Minimal JSON Schema validator: the keywords episode.v1.schema.json uses, nothing more.
interface Schema {
  readonly type?: string; readonly const?: unknown; readonly enum?: readonly unknown[]; readonly minLength?: number; readonly minimum?: number;
  readonly pattern?: string; readonly required?: readonly string[]; readonly properties?: Record<string, Schema>;
  readonly additionalProperties?: boolean; readonly items?: Schema; readonly oneOf?: readonly Schema[];
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

function hasNull(value: unknown): boolean {
  if (value === null) return true;
  if (Array.isArray(value)) return value.some(hasNull);
  if (typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasNull);
  return false;
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}

test("the converter output validates against the JSON Schema for all five environments, and a null or a dropped member fails it", () => {
  for (const row of rows) {
    const episode = toEpisode(readSource(row.source).episode);
    assert.deepEqual(violations(episode, schema), [], row.env);
    assert.equal(episode.environment, row.env);
    assert.equal(episode.schema, "mw.episode.v1");
    assert.equal(episode.mode, "fixture");
  }
  const good = toEpisode(readSource(rows[0].source).episode);
  const nulled = { ...good, attempts: null };
  assert.notDeepEqual(violations(nulled, schema), [], "unknown defaulted to null must fail the schema");
  const { arms: _arms, ...withoutArms } = good;
  assert.ok(violations(withoutArms, schema).some(line => line.includes("/arms")));
  const dropped = { ...good, decisions: good.decisions.map(({ readSet: _readSet, ...rest }) => rest) };
  assert.ok(violations(dropped, schema).some(line => line.includes("readSet")), "a dropped provenance field must fail the schema");
  assert.notDeepEqual(violations({ ...good, mode: "live-verified" }, schema), []);
  assert.notDeepEqual(violations({ ...good, verifier: { ...good.verifier, label: "live" } }, schema), []);
});

test("a field the environment does not know is the explicit unknown literal, not omitted, null or defaulted", () => {
  for (const row of rows) {
    const episode = toEpisode(readSource(row.source).episode);
    assert.equal(hasNull(episode), false, `${row.env} carries a null`);
    for (const decision of episode.decisions) assert.equal(decision.logProb, "unknown", "no policy reports a log probability");
  }
  const landing = toEpisode(readSource(rows[0].source).episode);
  assert.deepEqual([landing.artifacts.created, landing.artifacts.consumed, landing.attempts, landing.cost.environmentCost], ["unknown", "unknown", "unknown", "unknown"]);
  const recovery = toEpisode(readSource(rows[3].source).episode);
  assert.ok(Array.isArray(recovery.attempts) && recovery.attempts.length >= 2, "recovery knows its attempt lineage");
  assert.ok(Array.isArray(recovery.attempts) && recovery.attempts[0]!.parent === "unknown", "the producer has no parent: unknown, not null");
  assert.ok(Array.isArray(recovery.artifacts.consumed) && recovery.artifacts.consumed.length >= 1, "the resumed attempt consumed the artifact");
  const compaction = toEpisode(readSource(rows[1].source).episode);
  assert.ok(Array.isArray(compaction.artifacts.created) && compaction.artifacts.created.length > 0);
  assert.equal(typeof compaction.cost.environmentCost, "number");
});

test("toEpisode records the environment's initial state hash as initialCheckpoint, distinct from the post-step checkpoints", () => {
  for (const row of rows) {
    const source = readSource(row.source).episode as EnvironmentEpisode & { initialHash: string };
    assert.match(source.initialHash, /^sha256:[0-9a-f]{64}$/, `${row.env}: the environment episode carries its initial state hash`);
    const episode = toEpisode(source);
    assert.equal(episode.initialCheckpoint, source.initialHash, row.env);
    assert.match(episode.initialCheckpoint, /^sha256:[0-9a-f]{64}$/, row.env);
    assert.notEqual(episode.initialCheckpoint, episode.checkpoints[0], `${row.env}: the initial hash is the state before step 0, not the state after it`);
    assert.deepEqual(violations(episode, schema), [], row.env);
  }
});

test("the decision carries the Resolution's eligibility set, the read-set and the evidence provenance", () => {
  for (const row of rows) {
    const source = readSource(row.source).episode;
    const episode = toEpisode(source);
    assert.equal(episode.decisions.length, source.steps.length);
    assert.deepEqual(episode.checkpoints, source.steps.map(step => step.stateHash));
    source.steps.forEach((step, index) => {
      const decision = episode.decisions[index]!;
      assert.deepEqual(decision.eligibility.admitted, step.resolution.admitted.map(intent => intent.intentId));
      assert.deepEqual(decision.eligibility.rejected, step.resolution.rejected.map(rejection => ({ intentId: rejection.intent.intentId, code: rejection.code })));
      assert.deepEqual(decision.proposed, step.proposed);
    });
  }
  const colony = toEpisode(readSource(rows[2].source).episode);
  assert.ok(colony.decisions.some(decision => decision.provenance.length > 0 || decision.readSet.length > 0), "a decision records what it read or cited");
});

test("task, policy hash, control/treatment ids, cost and verifier label follow the environment run", () => {
  const landing = toEpisode(readSource(rows[0].source).episode);
  assert.equal(landing.task.family, "landing-queue");
  assert.match(landing.task.basis, /^fixture:landing-queue@head-\d+$/);
  assert.equal(landing.policy.configHash, digest({ policies: ["restack-first@fixture-1"] }));
  assert.deepEqual(landing.arms, { controlId: "unknown", treatmentId: "restack-first" });
  assert.equal(landing.verifier.label, "fixture");
  assert.equal(landing.verifier.receiptDigest, (readSource(rows[0].source).episode as { finalHash: string }).finalHash);
  assert.equal(landing.cost.steps, landing.checkpoints.length);
  assert.equal(landing.cost.budgetSpent.compute > 0, true);
  const baseline = { ...(readSource(rows[0].source).episode as object), policy: { id: "fifo-landing", revision: "fixture-1" } } as EnvironmentEpisode;
  assert.deepEqual(toEpisode(baseline).arms, { controlId: "fifo-landing", treatmentId: "unknown" });
  const recovery = toEpisode(readSource(rows[3].source).episode);
  assert.match(recovery.episodeId, /^fixture:artifact-recovery:7:resume-from-snapshot:treatment:artifact-kept$/);
  assert.deepEqual(recovery.arms, { controlId: "unknown", treatmentId: "treatment:artifact-kept" });
  assert.match(recovery.verifier.verdict, /^(completed@\d+|not-completed)$/);
  assert.match(toEpisode(readSource(rows[4].source).episode).episodeId, /:independent-test-first:authoritative$/);
});

test("the mode label is a closed enum and every upgrade is refused with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const fixture = toEpisode(readSource(rows[0].source).episode);
  assert.equal(labelEpisodeMode(fixture, "fixture").mode, "fixture");
  for (const mode of ["replay", "live", "live-verified", "Fixture", "", "verified"]) {
    assert.throws(() => labelEpisodeMode(fixture, mode), new RegExp(`^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fixture.*${mode}`), `fixture -> ${mode}`);
  }
  const replay = { ...fixture, mode: "replay" as const };
  assert.throws(() => labelEpisodeMode(replay, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelEpisodeMode(replay, "live-verified"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  const live = { ...fixture, mode: "live" as const };
  assert.throws(() => labelEpisodeMode(live, "live-verified"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelEpisodeMode(live, "replay").mode, "replay", "lowering the label is not an upgrade");
  assert.equal(labelEpisodeMode(replay, "fixture").mode, "fixture");
});

test("sanitize removes a planted credential-shaped field and value, records their paths, and the converter records that it ran", () => {
  const planted = { keep: "value", apiKey: "k", nested: { password: "p", detail: "token is AKIAIOSFODNN7EXAMPLE here", list: ["Bearer abcdefghijklmnop", "safe"] }, Authorization: "x" };
  const before = canonicalJson(planted);
  const cleaned = sanitizeValue(planted);
  assert.equal(canonicalJson(planted), before, "sanitize does not alter its input");
  assert.deepEqual(cleaned.value, { keep: "value", nested: { detail: "[redacted]", list: ["[redacted]", "safe"] } });
  assert.deepEqual(cleaned.removed, ["/Authorization", "/apiKey", "/nested/detail", "/nested/list/0", "/nested/password"]);
  const source = structuredClone(readSource(rows[0].source).episode) as unknown as { final: { events: { detail: string }[] } };
  source.final.events[0] = { ...source.final.events[0]!, detail: "leaked sk-abcdefghijklmnopqrstuvwxyz0123 in a detail" };
  const episode = toEpisode(source as unknown as EnvironmentEpisode);
  assert.equal(episode.sanitize.ran, true);
  assert.deepEqual(episode.sanitize.removed, ["/events/0/detail"]);
  assert.equal(episode.events[0]!.detail, "[redacted]");
  assert.equal(JSON.stringify(episode).includes("sk-abcdef"), false);
  assert.deepEqual(violations(episode, schema), []);
  for (const row of rows) assert.deepEqual(toEpisode(readSource(row.source).episode).sanitize, { ran: true, removed: [] }, `${row.env}: a clean episode records an empty removal list`);
});

test("sanitize pins every credential key alternative and every credential value alternative", () => {
  const ghp = `ghp_${"A".repeat(20)}`;
  const planted = {
    keep: "value",
    secret: "s", token: "t", credential: "c", private_key: "p", "private-key": "q",
    values: { pat: ghp, server: `ghs_${"B".repeat(22)}`, pem: "-----BEGIN RSA PRIVATE KEY-----", short: "ghp_tooshort", plain: "no credential here" },
  };
  const cleaned = sanitizeValue(planted);
  assert.deepEqual(cleaned.value, { keep: "value", values: { pat: "[redacted]", server: "[redacted]", pem: "[redacted]", short: "ghp_tooshort", plain: "no credential here" } });
  assert.deepEqual(cleaned.removed, ["/credential", "/private-key", "/private_key", "/secret", "/token", "/values/pat", "/values/pem", "/values/server"]);
  for (const key of ["secret", "token", "credential", "private_key", "private-key"]) assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: [`/${key}`] }, `key ${key} is dropped alone`);
  for (const value of [ghp, `gho_${"C".repeat(20)}`, `ghu_${"D".repeat(20)}`, `ghr_${"E".repeat(20)}`, "-----BEGIN PRIVATE KEY-----", "-----BEGIN OPENSSH PRIVATE KEY-----"]) {
    assert.deepEqual(sanitizeValue({ detail: value }), { value: { detail: "[redacted]" }, removed: ["/detail"] }, `value ${value.slice(0, 12)} is redacted alone`);
  }
});

test("sanitize drops the passwd, api-key, api_key, apikey and API_KEY key variants alone", () => {
  for (const key of ["passwd", "password", "api-key", "api_key", "apikey", "API_KEY"]) {
    assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: [`/${key}`] }, `key ${key} is dropped alone`);
  }
});

test("the sanitize removal list is sorted by string order, not by walk order", () => {
  const list = Array.from({ length: 12 }, (_, index) => `Bearer abcdefghijkl${index}`);
  const cleaned = sanitizeValue({ list });
  const walkOrder = list.map((_, index) => `/list/${index}`);
  assert.deepEqual(cleaned.removed, [...walkOrder].sort());
  assert.notDeepEqual(cleaned.removed, walkOrder, "the input discriminates: walk order differs from string order");
  assert.ok(cleaned.removed.indexOf("/list/10") < cleaned.removed.indexOf("/list/2"), "/list/10 sorts before /list/2");
  const mixed = sanitizeValue({ "a-b": { token: "t" }, "a": { zz: { secret: "s" }, token: "t" } });
  assert.deepEqual(mixed.removed, [...mixed.removed].sort());
  assert.deepEqual(mixed.removed, ["/a-b/token", "/a/token", "/a/zz/secret"]);
});

test("the schema rejects a non-literal string where an explicit unknown is allowed", () => {
  const good = toEpisode(readSource(rows[0].source).episode);
  assert.deepEqual(violations(good, schema), []);
  const withLogProb = (logProb: unknown) => ({ ...good, decisions: good.decisions.map(decision => ({ ...decision, logProb })) });
  assert.deepEqual(violations(withLogProb("unknown"), schema), [], "the literal unknown stays valid");
  assert.deepEqual(violations(withLogProb(-0.5), schema), [], "a number stays valid");
  for (const bad of ["n/a", "Unknown", "unknown ", ""]) assert.notDeepEqual(violations(withLogProb(bad), schema), [], `logProb ${JSON.stringify(bad)}`);
  for (const bad of ["n/a", "Unknown", "unknown ", "", "sha256:abc"]) assert.notDeepEqual(violations({ ...good, initialCheckpoint: bad }, schema), [], `initialCheckpoint ${JSON.stringify(bad)}`);
  assert.deepEqual(violations({ ...good, initialCheckpoint: "unknown" }, schema), [], "the literal unknown stays a valid initialCheckpoint");
  for (const bad of ["none", "Unknown", "unknown "]) {
    assert.notDeepEqual(violations({ ...good, attempts: bad }, schema), [], `attempts ${JSON.stringify(bad)}`);
    assert.notDeepEqual(violations({ ...good, artifacts: { ...good.artifacts, created: bad } }, schema), [], `artifacts.created ${JSON.stringify(bad)}`);
    assert.notDeepEqual(violations({ ...good, artifacts: { ...good.artifacts, consumed: bad } }, schema), [], `artifacts.consumed ${JSON.stringify(bad)}`);
    assert.notDeepEqual(violations({ ...good, cost: { ...good.cost, environmentCost: bad } }, schema), [], `environmentCost ${JSON.stringify(bad)}`);
  }
});

test("converting does not mutate the input: a frozen deep copy converts, deep-equal before and after, and the pinned landing-queue bytes are unchanged", () => {
  const landingPath = join(fixtureDir, "landing-queue-seed7.json");
  const bytesBefore = readFileSync(landingPath, "utf8");
  assert.equal(bytesBefore.length, 11345 + 1, "11345 canonical bytes and the final newline");
  for (const row of rows) {
    const source = deepFreeze(readSource(row.source).episode);
    const snapshot = canonicalJson(source);
    const first = toEpisode(source);
    assert.equal(canonicalJson(source), snapshot, `${row.env} input altered`);
    assert.equal(canonicalJson(toEpisode(source)), canonicalJson(first), "conversion is deterministic");
  }
  assert.equal(readFileSync(landingPath, "utf8"), bytesBefore);
});

test("each committed exported fixture equals the regenerated episode byte for byte, in canonical form, and re-hashes to the same digest", () => {
  for (const row of rows) {
    const committed = readFileSync(join(fixtureDir, row.exported), "utf8");
    const regenerated = toEpisode(readSource(row.source).episode);
    assert.equal(committed, episodeBytes(regenerated), row.exported);
    assert.equal(committed.endsWith("\n"), true);
    const parsed = JSON.parse(committed) as Episode;
    assert.equal(canonicalJson(parsed), committed.trimEnd(), "canonical form: one byte sequence per episode");
    assert.equal(digest(parsed), digest(regenerated));
    assert.deepEqual(violations(parsed, schema), [], row.exported);
  }
});

test("sanitize drops a key that embeds a credential word inside a longer name, alone", () => {
  for (const key of ["client_secret", "accessToken", "x-api-key", "db_password", "AWS_SECRET_ACCESS_KEY", "refresh_token"]) {
    assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: [`/${key}`] }, `key ${key} is dropped alone`);
  }
});

test("sanitize drops a key that embeds the credential, authorization or private-key word inside a longer name, alone", () => {
  for (const key of ["client_credentials", "proxy_authorization", "Proxy-Authorization", "ssh_private_key", "rsaPrivateKey"]) {
    assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: [`/${key}`] }, `key ${key} is dropped alone`);
  }
});


test("sanitize drops a credential-value-shaped key name (a token used as an object key) so it survives neither in the cleaned value nor in a removed path", () => {
  const token = "sk-abcdefghijklmnopqrstuvwxyz0123";
  const cases: readonly { readonly name: string; readonly planted: Record<string, unknown> }[] = [
    { name: "top-level key", planted: { [token]: "x", other: 1 } },
    { name: "nested key over a credential-word child", planted: { cost: { [token]: { password: "p", note: "n" } }, other: 1 } },
    { name: "key inside an array member", planted: { list: [{ [token]: 1, keep: 2 }], other: 1 } },
  ];
  for (const row of cases) {
    const cleaned = sanitizeValue(row.planted);
    assert.equal(JSON.stringify(cleaned.value).includes(token), false, `${row.name}: cleaned value`);
    assert.equal(cleaned.removed.some(path => path.includes(token)), false, `${row.name}: removed paths`);
    assert.notEqual(cleaned.removed.length, 0, `${row.name}: something was removed`);
    assert.equal((cleaned.value as { other: number }).other, 1, `${row.name}: unrelated member kept`);
  }
});

test("sanitize drops a key with characters after the token, password, api-key, authorization or private-key word, and an api-key word right after an underscore or a lowercase letter, alone", () => {
  for (const key of ["token_value", "password_hash", "api_key_id", "authorization_header", "private_key_pem", "stripe_api_key", "googleApiKey"]) {
    assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: [`/${key}`] }, `key ${key} is dropped alone`);
  }
});


test("a credential-value-shaped key name appears in its removed path as the [redacted] placeholder at the top level, under a nested object and inside an array member", () => {
  const token = "sk-abcdefghijklmnopqrstuvwxyz0123";
  assert.deepEqual(sanitizeValue({ [token]: "x", other: 1 }), { value: { other: 1 }, removed: ["/[redacted]"] });
  assert.deepEqual(sanitizeValue({ cost: { [token]: { password: "p" }, keep: 2 } }), { value: { cost: { keep: 2 } }, removed: ["/cost/[redacted]"] });
  assert.deepEqual(sanitizeValue({ list: [{ [token]: 1, keep: 2 }] }), { value: { list: [{ keep: 2 }] }, removed: ["/list/0/[redacted]"] });
});

test("every credential value family used as a key name is dropped with a [redacted] removed path", () => {
  for (const key of ["AKIAIOSFODNN7EXAMPLE", `ghp_${"A".repeat(20)}`, "Bearer abcdefghijklmnop", "-----BEGIN PRIVATE KEY-----"]) {
    assert.deepEqual(sanitizeValue({ [key]: "x", other: 1 }), { value: { other: 1 }, removed: ["/[redacted]"] }, `key ${key.slice(0, 12)} is dropped`);
  }
});

test("TW-EAT-R002: a fixture-schema source carrying any label above fixture is refused, never projected as a higher-grade episode", () => {
  const source = readSource(rows[0].source).episode;
  for (const mode of ["replay", "live", "live-verified", "PASS", "fork"]) {
    const tampered = { ...source, mode } as unknown as EnvironmentEpisode;
    assert.throws(() => toEpisode(tampered), new RegExp(`^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fixture.*${mode}`), `source labelled ${mode}`);
  }
  const clean = toEpisode(source);
  assert.equal(clean.mode, "fixture");
  assert.equal(clean.verifier.label, "fixture");
});

test("TW-EAT-R002: every fixture-derived episode carries the fixture label and a verdict outside the native grade vocabulary", () => {
  for (const row of rows) {
    const episode = toEpisode(readSource(row.source).episode);
    assert.equal(episode.mode, "fixture", `${row.env} mode`);
    assert.equal(episode.verifier.label, "fixture", `${row.env} verifier label`);
    assert.doesNotMatch(episode.verifier.verdict, /^(PASS|FAIL|COULD_NOT_JUDGE|fork)$/i, `${row.env} verdict is no native grade`);
  }
});

test("TW-EAT-R002: the grade vocabulary has no fork member in the schema enums, and every relabel to fork is refused", () => {
  const modes = (schema.properties?.["mode"] as { enum?: readonly string[] }).enum ?? [];
  const labels = ((schema.properties?.["verifier"] as Schema).properties?.["label"] as { enum?: readonly string[] }).enum ?? [];
  for (const vocabulary of [modes, labels]) {
    assert.equal(vocabulary.includes("fork"), false);
    assert.equal(vocabulary.includes("PASS"), false);
  }
  const fixture = toEpisode(readSource(rows[0].source).episode);
  for (const origin of [fixture, { ...fixture, mode: "replay" as const }, { ...fixture, mode: "live" as const }]) {
    assert.throws(() => labelEpisodeMode(origin, "fork"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fork/, `${origin.mode} to fork`);
  }
});
