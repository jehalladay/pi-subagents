// MechanicalWorkflows-5i1q (APO-EAT-R004): toEpisode and exportEpisodeForTraining accept
// ElasticEpisode (mw.landing-queue.elastic.fixture.v1) additively — mode fixture records,
// while the five existing environments' episode and training bytes stay identical.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, episodeBytes, labelEpisodeMode, exportEpisodeForTraining, trainingBytes,
  runElasticLanding, elasticLanes, restackFirst, oracleLoadBounds, canonicalJson } from "../dist/index.js";
import type { EnvironmentEpisode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const schema = JSON.parse(readFileSync(join(here, "../schema/episode.v1.schema.json"), "utf8")) as Schema;
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");

// Minimal JSON Schema validator: the keywords episode.v1.schema.json uses, nothing more (mirrors episode.test.ts).
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

const run = { seed: 5, candidates: 4, lanes: 1, maxLanes: 2, steps: 12, policy: elasticLanes };
const elastic = runElasticLanding(run);

test("an elastic episode converts to a valid mw.episode.v1 fixture record", () => {
  const episode = toEpisode(elastic);
  assert.equal(episode.schema, "mw.episode.v1");
  assert.equal(episode.mode, "fixture");
  assert.equal(episode.environment, "landing-queue-elastic");
  assert.equal(episode.verifier.label, "fixture");
  assert.equal(episode.verifier.receiptDigest, elastic.finalHash);
  assert.equal(episode.source.schema, "mw.landing-queue.elastic.fixture.v1");
  assert.deepEqual(violations(episode, schema), []);
  assert.equal(hasNull(episode), false, "a value the environment does not know is the explicit unknown, never null");
});

test("the elastic conversion maps steps, checkpoints and events faithfully, with the recorded reason as detail", () => {
  const episode = toEpisode(elastic);
  assert.equal(episode.decisions.length, elastic.steps.length);
  assert.deepEqual(episode.checkpoints, elastic.steps.map(step => step.stateHash));
  assert.equal(episode.initialCheckpoint, "unknown", "the elastic environment records no initial state hash");
  assert.equal(episode.events.length, elastic.final.events.length);
  for (const [index, event] of episode.events.entries()) {
    const sourceEvent = elastic.final.events[index]!;
    assert.equal(typeof event.detail, "string");
    assert.ok(event.detail.includes(sourceEvent.reason), "the lane event reason is preserved in detail");
    assert.equal(event.kind, sourceEvent.kind);
    assert.equal(event.subject, sourceEvent.candidate ?? "unknown");
  }
  assert.ok(episode.events.some(event => event.kind.startsWith("lane-")), "lane lifecycle events survive the conversion");
});

test("episodeId, task family and arms follow the elastic environment and its baseline", () => {
  const treatment = toEpisode(elastic);
  assert.equal(treatment.episodeId, "fixture:landing-queue-elastic:5:elastic-lanes");
  assert.equal(treatment.task.family, "landing-queue-elastic");
  assert.deepEqual(treatment.arms, { controlId: "unknown", treatmentId: "elastic-lanes" });
  const control = toEpisode(runElasticLanding({ ...run, policy: restackFirst }));
  assert.deepEqual(control.arms, { controlId: "restack-first", treatmentId: "unknown" });
});

test("labelEpisodeMode refuses to upgrade an elastic fixture episode to live or replay", () => {
  const episode = toEpisode(elastic);
  assert.throws(() => labelEpisodeMode(episode, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelEpisodeMode(episode, "replay"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelEpisodeMode(episode, "fixture").mode, "fixture");
});

test("exportEpisodeForTraining accepts the converted elastic episode and emits a mode-fixture training record", () => {
  const episode = toEpisode(elastic);
  const exported = exportEpisodeForTraining(episode);
  assert.equal(exported.schema, "mw.training-export.v1");
  assert.equal(exported.mode, "fixture");
  assert.equal(exported.environment, "landing-queue-elastic");
  assert.equal(exported.steps.length, elastic.steps.length);
  assert.equal(exported.steps[0]!.actorId, "lane");
  const bytes = trainingBytes(exported);
  assert.equal(bytes.endsWith("\n"), true);
  assert.equal(canonicalJson(JSON.parse(bytes)), bytes.trimEnd(), "canonical form: one byte sequence per export");
  assert.equal(hasNull(exported), false);
});

// Golden pins re-pinned for the splitmix32 gateDraws finaliser (MechanicalWorkflows-qmb3x, basis origin/main 65e9acb9); the elastic extension itself still adds nothing to these bytes:
// sha256 of episodeBytes(toEpisode(source)) and of trainingBytes(exportEpisodeForTraining(...)).
const GOLDEN = [
  ["landing-queue", "landing-queue-seed7.json", "d78a5f1137fc3338d387b975477b7c2a9bc457dde03bc58b29dd84c8aae3f78b", "3f1bfcac3f867a0f0846f76b2f9c9ca32f4ee8cf4e80456992f946524c21dbd6"],
  ["compaction-inheritance", "compaction-inheritance-seed7.json", "5340ea3b8f87c6ecb84e009035e001f8ae951bdb1e0ce7a5e9f42cf1c0dd64c2", "6331a38f45f324307ae8067a66e4e1746ec453d0810609b321175518ff96492f"],
  ["colony-resilience", "colony-resilience-seed29.json", "fa1cfbfbe4f5eb9dd946ddfb749a8dbdfa2d696737b70020621631e7ce61619e", "5bcfc0d83f93e677aaa867770ea152623cfc922ebffe8f0c0a3c42af0f17f48f"],
  ["artifact-recovery", "artifact-recovery-seed7.json", "4dffa5176d1a6ff4e330d31264fc05f6205ab6426416fbf78f462176782738a6", "eaf83a9f3f58dce11f9272eabb8c2df1e4df912cd56f84b67b6d05c035b83169"],
  ["quorum-evidence", "quorum-evidence-independent-seed7.json", "f15c07ff66ef7bc71832b2dfa95fc7e0ba123244480a1f07b082bc6be5d7d187", "16dd46bd727e24a93e7b538b5b0e1f104efd059e5e34c2d0ecac285a3292eb8d"],
] as const;

test("the five existing fixture environments keep byte-identical episode and training exports (digests pinned pre-change)", () => {
  for (const [env, file, episodeDigest, trainingDigest] of GOLDEN) {
    const source = JSON.parse(readFileSync(join(fixtureDir, file), "utf8")) as EnvironmentEpisode;
    const episode = toEpisode(source);
    assert.equal(sha256(episodeBytes(episode)), episodeDigest, `${env} episode bytes drifted`);
    assert.equal(sha256(trainingBytes(exportEpisodeForTraining(episode))), trainingDigest, `${env} training bytes drifted`);
  }
});

// MechanicalWorkflows-jxxr (5i1q follow-up, test-only): pin the elastic verdict string, the lane suffix, the null-lane
// bare reason and the explicit-unknown cost and attempts that the 5i1q tests above leave unasserted. Seed 5 (run, line 63; seed 7 no longer lands four with two gate-failed events under the finalised gateDraws stream, MechanicalWorkflows-qmb3x).
test("the elastic verdict string pins the landed count, the gate-failed count and the feasible load default (jxxr S1 S2 S3 S8)", () => {
  const landed = elastic.final.events.filter(event => event.kind === "landed").length;
  const failed = elastic.final.events.filter(event => event.kind === "gate-failed").length;
  assert.equal(landed, 4, "seed 5 lands four candidates");
  assert.equal(failed, 2, "seed 5 records two gate-failed events");
  assert.equal(elastic.load.code ?? "feasible", "feasible", "the seed-5 load is feasible");
  assert.equal(toEpisode(elastic).verifier.verdict, "landed=4,gate-failed=2,load=feasible");
});

test("a laned elastic event carries the exact [lane=<id>] suffix on its detail (jxxr S4)", () => {
  const episode = toEpisode(elastic);
  let laned = 0;
  for (const [index, event] of episode.events.entries()) {
    const sourceEvent = elastic.final.events[index]!;
    if (sourceEvent.lane === null) continue;
    laned += 1;
    assert.equal(event.detail, `${sourceEvent.reason} [lane=${sourceEvent.lane}]`);
  }
  assert.ok(laned > 0, "the seed-5 run has laned events");
  assert.equal(episode.events[0]!.detail, "c1 landed; head is now head-1 [lane=l1]");
});

test("a null-lane elastic event keeps its bare recorded reason with no lane suffix (jxxr S5)", () => {
  const episode = toEpisode(elastic);
  const refused = elastic.final.events.findIndex(event => event.lane === null);
  assert.ok(refused >= 0, "the seed-5 run has a null-lane refusal");
  assert.equal(episode.events[refused]!.detail, "LANE_CAP_REACHED: 2 lanes already allocated of 2");
  assert.equal(episode.events[refused]!.detail.includes("[lane="), false);
  for (const [index, event] of elastic.final.events.entries()) {
    if (event.lane === null) assert.equal(episode.events[index]!.detail, event.reason);
  }
});

test("the elastic environment cost and attempts are the explicit unknown literal, never zero or an empty list (jxxr S6 S7)", () => {
  const episode = toEpisode(elastic);
  assert.equal(episode.cost.environmentCost, "unknown");
  assert.equal(episode.attempts, "unknown");
});

// MechanicalWorkflows-5d6b (jxxr follow-up, test-only): pin the two laws jxxr left unpinned. The verifier artifacts and consumed
// members stay the explicit unknown (an empty list is a fabricated known), and the verdict load segment follows the oracle on an
// infeasible run (the exact LOAD_INFEASIBLE code, never a hardcoded feasible or a flag word).
test("the elastic episode artifacts created and consumed are the explicit unknown literal, never an empty list (5d6b L1)", () => {
  const episode = toEpisode(elastic);
  assert.equal(episode.artifacts.created, "unknown");
  assert.equal(episode.artifacts.consumed, "unknown");
  assert.deepEqual(episode.artifacts, { created: "unknown", consumed: "unknown" });
  assert.equal(Array.isArray(episode.artifacts.created), false, "an empty list would claim the environment created nothing");
  assert.equal(Array.isArray(episode.artifacts.consumed), false, "an empty list would claim the environment consumed nothing");
});

test("an infeasible elastic run converts to a verdict whose load segment is the exact LOAD_INFEASIBLE code, and its training export carries it (5d6b L2)", () => {
  const bounds = oracleLoadBounds({ seed: 5, candidates: 4 });
  const infeasible = runElasticLanding({ ...run, steps: bounds.idealSteps - 1 });
  assert.equal(infeasible.load.code, "LOAD_INFEASIBLE");
  assert.equal(infeasible.load.feasible, false);
  assert.equal(infeasible.load.policyFailure, false);
  const landed = infeasible.final.events.filter(event => event.kind === "landed").length;
  const failed = infeasible.final.events.filter(event => event.kind === "gate-failed").length;
  const episode = toEpisode(infeasible);
  assert.equal(episode.verifier.verdict, `landed=${landed},gate-failed=${failed},load=LOAD_INFEASIBLE`);
  assert.equal(episode.verifier.verdict, "landed=3,gate-failed=0,load=LOAD_INFEASIBLE");
  const exported = exportEpisodeForTraining(episode);
  assert.equal(exported.verifier.verdict, "landed=3,gate-failed=0,load=LOAD_INFEASIBLE");
  assert.equal(exported.verifier.verdict?.endsWith("load=LOAD_INFEASIBLE"), true);
  assert.notEqual(exported.verifier.verdict, toEpisode(elastic).verifier.verdict, "an infeasible and a feasible run do not share a verdict");
  assert.deepEqual(violations(episode, schema), []);
});
