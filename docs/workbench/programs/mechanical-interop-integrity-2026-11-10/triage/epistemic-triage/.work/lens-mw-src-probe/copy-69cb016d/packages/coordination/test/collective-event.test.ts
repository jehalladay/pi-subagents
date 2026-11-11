import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, projectCollectiveEvents, collectiveEventBytes, producerModuleRecord, digest } from "../dist/index.js";
import type { Episode, EnvironmentEpisode, CollectiveEvent } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const schema = JSON.parse(readFileSync(join(here, "../schema/collective.event.v1.schema.json"), "utf8")) as Schema;

/** One row per exported episode: the source environment episode (absent for the native replay tape), the exported episode and the pinned projection. */
const rows = [
  { name: "landing-queue-seed7", source: "landing-queue-seed7.json" },
  { name: "compaction-inheritance-seed7", source: "compaction-inheritance-seed7.json" },
  { name: "colony-resilience-seed29", source: "colony-resilience-seed29.json" },
  { name: "artifact-recovery-seed7", source: "artifact-recovery-seed7.json" },
  { name: "quorum-evidence-independent-seed7", source: "quorum-evidence-independent-seed7.json" },
  { name: "replay-native-receipts", source: undefined },
] as const;

const read = (name: string): string => readFileSync(join(fixtureDir, name), "utf8");
const exportedEpisode = (name: string): Episode => JSON.parse(read(`episode-${name}.json`)) as Episode;

// Minimal JSON Schema validator: the keywords collective.event.v1.schema.json uses, nothing more.
interface Schema {
  readonly type?: string; readonly const?: unknown; readonly enum?: readonly unknown[]; readonly minLength?: number; readonly pattern?: string;
  readonly required?: readonly string[]; readonly properties?: Record<string, Schema>; readonly additionalProperties?: boolean; readonly items?: Schema;
}
function violations(value: unknown, node: Schema, path = ""): string[] {
  const out: string[] = [];
  if ("const" in node && JSON.stringify(value) !== JSON.stringify(node.const)) out.push(`${path || "/"}: expected const ${JSON.stringify(node.const)}`);
  if (node.enum !== undefined && !node.enum.some(member => JSON.stringify(member) === JSON.stringify(value))) out.push(`${path || "/"}: not in enum ${JSON.stringify(node.enum)}`);
  if (node.type === "string") {
    if (typeof value !== "string") return [...out, `${path || "/"}: expected string`];
    if (node.minLength !== undefined && value.length < node.minLength) out.push(`${path}: too short`);
    if (node.pattern !== undefined && !new RegExp(node.pattern).test(value)) out.push(`${path}: pattern`);
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

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}

test("each pinned projection equals the regenerated one byte for byte, has one envelope per episode event, and validates against the schema", () => {
  for (const row of rows) {
    const episode = exportedEpisode(row.name);
    const events = projectCollectiveEvents(episode);
    assert.equal(read(`collective-events-${row.name}.json`), collectiveEventBytes(events), row.name);
    assert.equal(events.length, episode.events.length, row.name);
    assert.ok(events.length > 0, row.name);
    for (const event of events) assert.deepEqual(violations(event, schema), [], `${row.name} ${event.event_id}`);
    if (row.source !== undefined) {
      const regenerated = projectCollectiveEvents(toEpisode(JSON.parse(read(row.source)) as EnvironmentEpisode));
      assert.equal(collectiveEventBytes(regenerated), collectiveEventBytes(events), `${row.name} from the source episode`);
    }
  }
});

test("the schema refuses an extra member, a null, a malformed revision, any other status and any other authority", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  assert.deepEqual(violations(good, schema), []);
  assert.ok(violations({ ...good, extra: 1 }, schema).some(line => line.includes("/extra: unexpected member")));
  assert.ok(violations({ ...good, subject: { ...good.subject, extra: 1 } }, schema).some(line => line.includes("/subject/extra")));
  assert.notDeepEqual(violations({ ...good, causal_parents: null }, schema), []);
  assert.notDeepEqual(violations({ ...good, subject: null }, schema), []);
  for (const revision of ["", "sha256:abc", `sha256:${"A".repeat(64)}`, `md5:${"a".repeat(64)}`]) assert.notDeepEqual(violations({ ...good, producer_revision: revision }, schema), [], revision);
  for (const status of ["failed", "passed", "Observed", ""]) assert.notDeepEqual(violations({ ...good, status }, schema), [], status);
  for (const authority of ["authoritative", "execute", "certify", ""]) assert.notDeepEqual(violations({ ...good, authority }, schema), [], authority);
  assert.notDeepEqual(violations({ ...good, schema: "collective.event.v2" }, schema), []);
  const { event_id: _eventId, ...withoutId } = good;
  assert.ok(violations(withoutId, schema).some(line => line.includes("/event_id: required member missing")));
  assert.notDeepEqual(violations({ ...good, episode_id: "has space" }, schema), []);
});

test("h1bc the mini validator implements enum, so a projected event whose mode is outside fixture, replay and live is refused", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  assert.deepEqual(violations(good, schema), []);
  for (const mode of ["unknown", "live-verified", "Fixture", ""]) assert.deepEqual(violations({ ...good, mode }, schema), [`/mode: not in enum ${JSON.stringify(["fixture", "replay", "live"])}`], JSON.stringify(mode));
  for (const mode of ["fixture", "replay", "live"]) assert.deepEqual(violations({ ...good, mode }, schema), [], mode);
});

test("h1bc the schema refuses a malformed episode_root: an extra member, a missing digest, an id with a space and a short digest, each naming the episode_root path", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  const root = good.episode_root;
  assert.deepEqual(violations({ ...good, episode_root: { ...root, extra: 1 } }, schema), ["/episode_root/extra: unexpected member"]);
  assert.deepEqual(violations({ ...good, episode_root: { id: root.id } }, schema), ["/episode_root/digest: required member missing"]);
  assert.deepEqual(violations({ ...good, episode_root: { ...root, id: "has space" } }, schema), ["/episode_root/id: pattern"]);
  assert.deepEqual(violations({ ...good, episode_root: { ...root, digest: "sha256:abc" } }, schema), ["/episode_root/digest: pattern"]);
  assert.deepEqual(violations({ ...good, episode_root: { ...root, digest: `sha256:${"a".repeat(65)}` } }, schema), ["/episode_root/digest: pattern"]);
  assert.deepEqual(violations({ ...good, episode_root: null }, schema), ["/episode_root: expected object"]);
});

test("an episode id or event id outside the id pattern is refused with COLLECTIVE_EVENT_ID_INVALID, and a valid id passes", () => {
  const base = exportedEpisode("landing-queue-seed7");
  for (const bad of ["", " ", "has space", "tab\there", "line\nbreak", "café", ":leading-colon", "-leading-dash", "a".repeat(257), "semi;colon"]) {
    assert.throws(() => projectCollectiveEvents({ ...base, episodeId: bad }), /^Error: COLLECTIVE_EVENT_ID_INVALID: episode_id /, JSON.stringify(bad));
  }
  const one = { ...base, events: base.events.slice(0, 1) };
  const longest = "a".repeat(256 - "/event:1".length);
  assert.equal(projectCollectiveEvents({ ...one, episodeId: longest })[0]!.event_id, `${longest}/event:1`, "an id at exactly 256 characters passes");
  assert.throws(() => projectCollectiveEvents({ ...one, episodeId: `${longest}a` }), /^Error: COLLECTIVE_EVENT_ID_INVALID: event_id /, "the generated event id is checked as well");
  assert.throws(() => projectCollectiveEvents({ ...base, policy: { ...base.policy, id: "bad policy" } }), /^Error: COLLECTIVE_EVENT_ID_INVALID: actor_id /);
});

test("a supplied producer revision must be a sha256 digest, else COLLECTIVE_PRODUCER_REVISION_INVALID; the default is the digest of the producing module record", () => {
  const episode = exportedEpisode("quorum-evidence-independent-seed7");
  for (const bad of ["", "sha256:", `sha256:${"g".repeat(64)}`, `sha256:${"a".repeat(63)}`, `sha256:${"A".repeat(64)}`, "git:abc123"]) {
    assert.throws(() => projectCollectiveEvents(episode, { producerRevision: bad }), /^Error: COLLECTIVE_PRODUCER_REVISION_INVALID: /, JSON.stringify(bad));
  }
  const pinned = `sha256:${"b".repeat(64)}`;
  assert.ok(projectCollectiveEvents(episode, { producerRevision: pinned }).every(event => event.producer_revision === pinned));
  const expected = digest(producerModuleRecord(episode));
  assert.match(expected, /^sha256:[0-9a-f]{64}$/);
  assert.ok(projectCollectiveEvents(episode).every(event => event.producer_revision === expected));
  assert.deepEqual(producerModuleRecord(episode), { module: "@mechanical/workflows-coordination/collective-event", episodeSchema: "mw.episode.v1", episodeVersion: 1, policy: `${episode.policy.id}@${episode.policy.revision}`, configHash: episode.policy.configHash });
  const other = projectCollectiveEvents({ ...episode, policy: { ...episode.policy, revision: "fixture-2" } })[0]!;
  assert.notEqual(other.producer_revision, expected, "a different producing policy revision changes the producer revision");
});

test("native receipts are never dropped: every envelope cites the verifier receipt and the evidence the step's decisions cited", () => {
  for (const row of rows) {
    const episode = exportedEpisode(row.name);
    const events = projectCollectiveEvents(episode);
    events.forEach((event, index) => {
      assert.ok(event.evidence_refs.includes(episode.verifier.receiptDigest), `${row.name} ${event.event_id} lost the verifier receipt`);
      const cited = episode.decisions.filter(decision => decision.step === episode.events[index]!.step).flatMap(decision => decision.provenance);
      for (const ref of cited) assert.ok(event.evidence_refs.includes(ref), `${row.name} ${event.event_id} lost ${ref}`);
      assert.deepEqual([...event.evidence_refs], [...new Set(event.evidence_refs)].sort(), "evidence refs are unique and sorted");
    });
  }
  const withCitations = ["landing-queue-seed7", "compaction-inheritance-seed7", "colony-resilience-seed29", "artifact-recovery-seed7", "quorum-evidence-independent-seed7"]
    .some(name => projectCollectiveEvents(exportedEpisode(name)).some(event => event.evidence_refs.length > 1));
  assert.ok(withCitations, "at least one pinned episode cites decision evidence beyond the verifier receipt");
});

test("the projection is observation-only, idempotent, pure, and keeps the mode in the episode id", () => {
  for (const row of rows) {
    const episode = deepFreeze(exportedEpisode(row.name));
    const first = projectCollectiveEvents(episode);
    const second = projectCollectiveEvents(episode);
    assert.deepEqual(first, second, "re-projection yields the same envelopes");
    assert.equal(new Set(first.map(event => event.event_id)).size, first.length, `${row.name} event ids are unique`);
    assert.ok(first.every(event => event.status === "observed" && event.authority === "observation-only" && event.schema === "collective.event.v1"));
    assert.ok(first.every(event => event.episode_id.startsWith(`${episode.mode}:`)), `${row.name} mode prefix`);
    assert.ok(first.every(event => event.subject.revision === episode.task.basis));
  }
});

test("causal parents are earlier events on the same known subject, and an unknown subject is the literal unknown with no parent", () => {
  for (const row of rows) {
    const episode = exportedEpisode(row.name);
    const events: readonly CollectiveEvent[] = projectCollectiveEvents(episode);
    const seen = new Map<string, number>();
    events.forEach((event, index) => {
      assert.ok(event.causal_parents.length <= 1);
      for (const parent of event.causal_parents) {
        const parentIndex = events.findIndex(other => other.event_id === parent);
        assert.ok(parentIndex >= 0 && parentIndex < index, `${row.name} ${event.event_id} parent precedes it`);
        assert.equal(events[parentIndex]!.subject.uri, event.subject.uri, `${row.name} parent shares the subject`);
      }
      if (event.subject.uri === "unknown") assert.deepEqual(event.causal_parents, [], `${row.name} unknown subject has no parent`);
      else assert.equal(event.causal_parents.length === 1, seen.has(event.subject.uri), `${row.name} ${event.event_id} links exactly when the subject was seen`);
      seen.set(event.subject.uri, index);
    });
  }
  const compaction = projectCollectiveEvents(exportedEpisode("compaction-inheritance-seed7"));
  assert.ok(compaction.some(event => event.subject.uri === "unknown"), "the compaction episode has events without a subject");
});

test("a newline-suffixed identity member is refused by the schema validator exactly as the Python consumer refuses it", () => {
  const good = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"))[0] as CollectiveEvent;
  assert.deepEqual(violations(good, schema), []);
  for (const member of ["episode_id", "event_id", "actor_id", "producer_revision"] as const) {
    assert.deepEqual(violations({ ...good, [member]: `${good[member]}\n` }, schema), [`/${member}: pattern`], member);
  }
  assert.deepEqual(violations({ ...good, causal_parents: [`${good.event_id}\n`] }, schema), ["/causal_parents/0: pattern"]);
});

test("r1 the projection accepts every id character the committed schema pattern allows, so the source and schema id patterns agree", () => {
  const base = exportedEpisode("landing-queue-seed7");
  const one: Episode = { ...base, events: base.events.slice(0, 1) };
  for (const ch of "._:@/=+-") {
    const id = `fixture:a${ch}b`;
    const [event] = projectCollectiveEvents({ ...one, episodeId: id });
    assert.ok(event !== undefined, JSON.stringify(ch));
    assert.equal(event.episode_id, id, JSON.stringify(ch));
    assert.deepEqual(violations(event, schema), [], JSON.stringify(ch));
  }
  const [revised] = projectCollectiveEvents({ ...one, policy: { ...one.policy, revision: "1.2_3+4=5" } });
  assert.ok(revised !== undefined);
  assert.equal(revised.actor_id, `policy:${one.policy.id}@1.2_3+4=5`);
  assert.deepEqual(violations(revised, schema), []);
});

test("r2 the schema refuses a malformed event id, actor id or causal parent", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  for (const bad of ["", "has space", ":leading-colon", "café", "a".repeat(257)]) {
    assert.ok(violations({ ...good, event_id: bad }, schema).includes("/event_id: pattern"), `event_id ${JSON.stringify(bad)}`);
    assert.ok(violations({ ...good, actor_id: bad }, schema).includes("/actor_id: pattern"), `actor_id ${JSON.stringify(bad)}`);
    assert.ok(violations({ ...good, causal_parents: [bad] }, schema).includes("/causal_parents/0: pattern"), `causal parent ${JSON.stringify(bad)}`);
  }
});

test("r3 the schema refuses an empty subject uri, an empty subject revision and an empty evidence reference", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  assert.ok(violations({ ...good, subject: { ...good.subject, uri: "" } }, schema).includes("/subject/uri: too short"));
  assert.ok(violations({ ...good, subject: { ...good.subject, revision: "" } }, schema).includes("/subject/revision: too short"));
  assert.ok(violations({ ...good, evidence_refs: [...good.evidence_refs, ""] }, schema).includes(`/evidence_refs/${good.evidence_refs.length}: too short`));
});

test("r4 evidence refs stay unique when a step's decisions repeat a citation or cite the verifier receipt itself", () => {
  const base = exportedEpisode("colony-resilience-seed29");
  const index = base.events.findIndex(event => base.decisions.some(decision => decision.step === event.step && decision.provenance.length > 0));
  assert.ok(index >= 0, "colony-resilience cites decision evidence");
  const step = base.events[index]?.step;
  const decisions = base.decisions.map(decision => decision.step === step ? { ...decision, provenance: [...decision.provenance, ...decision.provenance, base.verifier.receiptDigest] } : decision);
  const event = projectCollectiveEvents({ ...base, decisions })[index];
  assert.ok(event !== undefined);
  assert.deepEqual([...event.evidence_refs], [...new Set(event.evidence_refs)].sort());
  assert.equal(event.evidence_refs.filter(ref => ref === base.verifier.receiptDigest).length, 1);
});

test("r6 the schema accepts an id of exactly 256 characters in every id member, the length the projection emits, and refuses 257", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  const at256 = "a".repeat(256);
  assert.deepEqual(violations({ ...good, episode_id: at256, event_id: at256, actor_id: at256, causal_parents: [at256] }, schema), []);
  for (const member of ["episode_id", "event_id", "actor_id"] as const) {
    assert.ok(violations({ ...good, [member]: `${at256}a` }, schema).includes(`/${member}: pattern`), member);
  }
  assert.ok(violations({ ...good, causal_parents: [`${at256}a`] }, schema).includes("/causal_parents/0: pattern"), "causal parent at 257");
});

test("r7 the schema refuses an episode id with a leading colon or dash, as it does for event and actor ids", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  for (const bad of [":leading-colon", "-leading-dash"]) {
    assert.ok(violations({ ...good, episode_id: bad }, schema).includes("/episode_id: pattern"), bad);
  }
});

test("r8 the schema refuses an event id, actor id or causal parent with a leading dash, as it does for the episode id", () => {
  const [good] = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"));
  assert.ok(good !== undefined);
  assert.deepEqual(violations(good, schema), []);
  for (const bad of ["-leading-dash", "-"]) {
    assert.deepEqual(violations({ ...good, event_id: bad }, schema), ["/event_id: pattern"], `event_id ${bad}`);
    assert.deepEqual(violations({ ...good, actor_id: bad }, schema), ["/actor_id: pattern"], `actor_id ${bad}`);
    assert.deepEqual(violations({ ...good, causal_parents: [bad] }, schema), ["/causal_parents/0: pattern"], `causal parent ${bad}`);
  }
});

test("r5 the schema refuses an identity member with any prefix before a valid value, so the opening anchor of every identity pattern stays pinned", () => {
  const good = projectCollectiveEvents(exportedEpisode("landing-queue-seed7"))[0] as CollectiveEvent;
  assert.deepEqual(violations(good, schema), []);
  for (const prefix of [" ", "x ", "é", "\n"]) {
    assert.deepEqual(violations({ ...good, producer_revision: `${prefix}${good.producer_revision}` }, schema), ["/producer_revision: pattern"], JSON.stringify(prefix));
    for (const member of ["episode_id", "event_id", "actor_id"] as const) {
      assert.deepEqual(violations({ ...good, [member]: `${prefix}${good[member]}` }, schema), [`/${member}: pattern`], `${member} ${JSON.stringify(prefix)}`);
    }
    assert.deepEqual(violations({ ...good, causal_parents: [`${prefix}${good.event_id}`] }, schema), ["/causal_parents/0: pattern"], `causal parent ${JSON.stringify(prefix)}`);
  }
});
