// MechanicalWorkflows-2vax (TW-EAT-R012): the collective.event.v1 projection — the one derived
// view that carried mode only inside the episode_id composite string — must carry environment
// mode as a structured enum member and the episode-root identifier/digest, so no consumer
// parses mode out of a string.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { digest, labelEpisodeMode, projectCollectiveEvents, toEpisode } from "../dist/index.js";
import type { EnvironmentEpisode, Episode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const sources = [
  "landing-queue-seed7.json",
  "compaction-inheritance-seed7.json",
  "colony-resilience-seed29.json",
  "artifact-recovery-seed7.json",
  "quorum-evidence-independent-seed7.json",
] as const;
const episodeOf = (name: string) => toEpisode(JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as EnvironmentEpisode);

test("every projected event carries the episode's mode as a structured enum member", () => {
  for (const name of sources) {
    const episode = episodeOf(name);
    for (const event of projectCollectiveEvents(episode)) {
      assert.equal(event.mode, episode.mode, name);
      assert.ok(["fixture", "replay", "live"].includes(event.mode), name);
    }
  }
});

test("every projected event names the identical episode root by id and digest", () => {
  for (const name of sources) {
    const episode = episodeOf(name);
    const root = { id: episode.episodeId, digest: digest(episode) };
    for (const event of projectCollectiveEvents(episode)) {
      assert.deepEqual(event.episode_root, root, name);
    }
  }
});

test("mode follows a relabel without any string parsing: a lowered label projects as lowered", () => {
  const episode = episodeOf(sources[0]);
  const relabelled = labelEpisodeMode(episode, "fixture");
  const events = projectCollectiveEvents(relabelled);
  assert.equal(events[0]!.mode, "fixture");
  assert.equal(events[0]!.episode_root.id, relabelled.episodeId);
  assert.equal(events[0]!.episode_root.digest, digest(relabelled));
});

test("the schema requires the structured members, so a consumer never falls back to the episode_id prefix", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/collective.event.v1.schema.json"), "utf8")) as { required: string[]; properties: Record<string, unknown> };
  assert.ok(schema.required.includes("mode"), "schema requires mode");
  assert.ok(schema.required.includes("episode_root"), "schema requires episode_root");
  assert.deepEqual([...schema.required].sort(), Object.keys(schema.properties).sort(), "required set equals the property set");
  const mode = schema.properties["mode"] as { enum?: string[] };
  assert.deepEqual(mode.enum, ["fixture", "replay", "live"], "mode is a closed enum in the schema");
});

// MechanicalWorkflows-h1bc: every source above is fixture-mode, so a projection that parsed mode out of the
// episode_id prefix (or re-derived the episode_root digest from it) would survive. The one replay-mode exported
// episode, relabelled to fixture, keeps its replay: id prefix while its structured mode must read fixture.
const replayEpisode = (): Episode => JSON.parse(readFileSync(join(fixtureDir, "episode-replay-native-receipts.json"), "utf8")) as Episode;

test("h1bc S1 a replay episode relabelled to fixture projects mode fixture on every event while its id prefix still reads replay", () => {
  const original = replayEpisode();
  assert.equal(original.mode, "replay");
  assert.ok(original.episodeId.startsWith("replay:"), "the exported replay episode carries the replay: prefix");
  const relabelled = labelEpisodeMode(original, "fixture");
  assert.ok(relabelled.episodeId.startsWith("replay:"), "the relabel leaves the episode id prefix untouched");
  const events = projectCollectiveEvents(relabelled);
  assert.ok(events.length > 0);
  for (const event of events) {
    assert.equal(event.mode, "fixture", event.event_id);
    assert.ok(event.episode_id.startsWith("replay:"), "the prefix is identity only, not the mode source");
  }
  assert.ok(projectCollectiveEvents(original).every(event => event.mode === "replay"), "the unrelabelled replay episode projects replay");
});

test("h1bc S6 the relabelled replay episode's episode_root digest is the digest of the relabelled record, not of the original", () => {
  const original = replayEpisode();
  const relabelled = labelEpisodeMode(original, "fixture");
  assert.notEqual(digest(relabelled), digest(original), "the relabel changes the episode digest");
  for (const event of projectCollectiveEvents(relabelled)) {
    assert.equal(event.episode_root.digest, digest(relabelled), event.event_id);
    assert.notEqual(event.episode_root.digest, digest(original), event.event_id);
    assert.equal(event.episode_root.id, relabelled.episodeId, event.event_id);
  }
});
