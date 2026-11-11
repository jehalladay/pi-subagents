import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { replayTape, labelEpisodeMode, episodeBytes, canonicalJson, digest } from "../dist/index.js";
import type { ReplayTape, ReplayEntry, JsonValue } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const evidence = (name: string): { readonly result: JsonValue } => JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence", name), "utf8")) as { result: JsonValue };
const failRecord = evidence("2026-10-15-live-verify-fail.json").result;
const passRecord = evidence("2026-10-15-live-verify-pass.json").result;
const indeterminateRecord = evidence("2026-10-15-live-verify-first-indeterminate.json").result;
const furnaceEnvelope = JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence/2026-10-15-furnace-completed.json"), "utf8").split("\n")[0]!) as JsonValue;

const forge = (id: string, revision: number, native: JsonValue, extra: Partial<ReplayEntry> = {}): ReplayEntry => ({ id, system: "forge", subject: "gate", revision, kind: "build", native, ...extra });
const tapeOf = (entries: readonly ReplayEntry[]): ReplayTape => ({ schema: "mw.replay-tape.v1", version: 1, tapeId: "witness", seed: 0, basis: { workspaceId: "ws", revision: "r0" }, entries });

test("a recorded Forge gate FAIL replays as FAIL with the native payload byte-identical to the tape", () => {
  const tape = tapeOf([forge("f1", 1, failRecord)]);
  const [observation] = replayTape(tape).observations;
  assert.equal(observation!.status, "FAIL");
  assert.equal(observation!.certified, false);
  assert.equal(JSON.stringify(observation!.native), JSON.stringify(failRecord));
  assert.equal(observation!.nativeDigest, digest(failRecord));
});

test("a clean Forge PASS certifies, an indeterminate receipt stays COULD_NOT_JUDGE", () => {
  const result = replayTape(tapeOf([forge("p", 1, passRecord), forge("i", 2, indeterminateRecord)]));
  assert.deepEqual(result.observations.map(o => [o.status, o.certified, o.clean]), [["PASS", true, true], ["COULD_NOT_JUDGE", false, true]]);
});

test("a dirty candidate stays dirty and a PASS on it does not certify", () => {
  const dirty = JSON.parse(JSON.stringify(passRecord)) as { basis: { clean: boolean } };
  dirty.basis.clean = false;
  const [observation] = replayTape(tapeOf([forge("d", 1, dirty as unknown as JsonValue)])).observations;
  assert.equal(observation!.clean, false);
  assert.equal(observation!.status, "PASS");
  assert.equal(observation!.certified, false);
});

test("unknown HX coverage replays as unknown and cannot certify task scope; incomplete coverage never certifies", () => {
  const hx = (id: string, revision: number, native: JsonValue): ReplayEntry => ({ id, system: "hx", subject: "scope", revision, kind: "find", native });
  const result = replayTape(tapeOf([hx("h1", 1, { exit: 3 }), hx("h2", 2, { exit: 3, coverage: "incomplete", diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE" }] }), hx("h3", 3, { exit: 0, coverage: "complete" })]));
  assert.deepEqual(result.observations.map(o => [o.status, o.certified]), [["unknown", false], ["incomplete", false], ["complete", true]]);
  assert.equal(replayTape(tapeOf([hx("h4", 1, { exit: 0, coverage: "unknown" })])).observations[0]!.certified, false);
  assert.equal(replayTape(tapeOf([hx("h5", 1, { coverage: "complete" })])).observations[0]!.certified, false);
});

test("beads records and Furnace envelopes project their status; a failed Furnace envelope stays a failure", () => {
  const result = replayTape(tapeOf([
    { id: "b1", system: "beads", subject: "bd-1", revision: 1, kind: "show", native: { id: "bd-1", status: "in_progress", assignee: "camshaft-oe" } },
    { id: "u1", system: "furnace", subject: "run", revision: 1, kind: "run_resume", native: furnaceEnvelope },
    { id: "u2", system: "furnace", subject: "run", revision: 2, kind: "run_resume", native: { protocol_version: 1, kind: "run_resume", ok: false, data: { state: "needs_attention" } } },
  ]));
  assert.deepEqual(result.observations.map(o => [o.status, o.certified]), [["in_progress", false], ["completed", true], ["needs_attention", false]]);
});

test("an unsupported tape version, receipt shape, system or envelope version is refused with REPLAY_TAPE_UNSUPPORTED", () => {
  const refused = (tape: unknown): void => assert.throws(() => replayTape(tape as ReplayTape), /^Error: REPLAY_TAPE_UNSUPPORTED/);
  refused({ ...tapeOf([]), version: 2 });
  refused({ ...tapeOf([]), schema: "mw.replay-tape.v2" });
  refused({ ...tapeOf([]), seed: 1.5 });
  refused(tapeOf([{ id: "x", system: "git", subject: "s", revision: 0, kind: "k", native: {} } as unknown as ReplayEntry]));
  refused(tapeOf([forge("f", 1, { kind: "exploded" })]));
  refused(tapeOf([{ id: "u", system: "furnace", subject: "r", revision: 1, kind: "k", native: { protocol_version: 2, ok: true, data: { state: "completed" } } }]));
  refused(tapeOf([{ id: "h", system: "hx", subject: "r", revision: 1, kind: "k", native: { coverage: "mostly" } }]));
  refused(tapeOf([{ id: "b", system: "beads", subject: "r", revision: 1, kind: "k", native: { id: "bd-1" } }]));
  refused(tapeOf([forge("n", -1, passRecord)]));
});

test("replaying the same tape twice yields identical canonical episodes and leaves the tape untouched", () => {
  const tape = tapeOf([forge("f1", 1, failRecord), forge("p1", 2, passRecord)]);
  const before = canonicalJson(tape);
  const a = replayTape(tape);
  const b = replayTape(JSON.parse(before) as ReplayTape);
  assert.equal(episodeBytes(a.episode), episodeBytes(b.episode));
  assert.equal(canonicalJson(tape), before);
  assert.equal(a.episode.mode, "replay");
  assert.equal(a.episode.verifier.label, "replay");
  assert.equal(a.episode.environment, "native-replay");
  assert.equal(a.episode.checkpoints.length, 2);
  assert.equal(a.episode.sanitize.ran, true);
});

test("a byte-identical duplicate is dropped; a reused id with other content and a stale revision are conflicts", () => {
  const first = forge("f1", 5, failRecord);
  const result = replayTape(tapeOf([first, { ...first }, forge("f1", 5, passRecord), forge("f2", 4, passRecord), forge("f3", 5, passRecord)]));
  assert.deepEqual(result.observations.map(o => o.entryId), ["f1", "f3"]);
  assert.deepEqual(result.conflicts.map(c => [c.code, c.entryId]), [["REPLAY_CONFLICT_DUPLICATE_MISMATCH", "f1"], ["REPLAY_CONFLICT_STALE_REVISION", "f2"]]);
  assert.equal(result.episode.verifier.verdict, "applied=2,conflicts=2");
});

test("an irreversible effect is projected as the recorded outcome only and nothing re-executes", () => {
  const [observation] = replayTape(tapeOf([forge("m", 1, passRecord, { kind: "merge", effect: { kind: "git.push", reversible: false } })])).observations;
  assert.equal(observation!.recordedOnly, true);
  assert.equal(observation!.effectReexecuted, false);
  assert.equal(replayTape(tapeOf([forge("n", 1, passRecord)])).observations[0]!.recordedOnly, false);
});

test("the replay label cannot be upgraded to live or live-verified", () => {
  const { episode } = replayTape(tapeOf([forge("f1", 1, failRecord)]));
  assert.throws(() => labelEpisodeMode(episode, "live"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelEpisodeMode(episode, "live-verified"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelEpisodeMode(episode, "fixture").mode, "fixture");
});

test("credential-shaped values in a receipt are scrubbed from the episode but kept verbatim in the observation", () => {
  const secret = "Bearer abcdefghijklmnop1234";
  const native = { kind: "passed", basis: { clean: true }, note: secret } as unknown as JsonValue;
  const result = replayTape(tapeOf([forge("s", 1, native)]));
  assert.equal(JSON.stringify(result.observations[0]!.native).includes(secret), true);
  assert.equal(episodeBytes(result.episode).includes("abcdefghijklmnop1234"), false);
});

test("purity: replay.ts imports only sibling modules and names no fs, process, clock or randomness surface", () => {
  const source = readFileSync(join(here, "../src/replay.ts"), "utf8");
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const specifiers = [...code.matchAll(/from\s+"([^"]+)"/g)].map(m => m[1]!);
  assert.deepEqual(specifiers.sort(), ["./canonical.js", "./canonical.js", "./episode.js", "./episode.js"]);
  for (const token of ["node:", "require(", "import(", "process.", "fs.", "child_process", "Date.now", "new Date", "Math.random", "fetch(", "setTimeout", "await ", "async "]) assert.equal(code.includes(token), false, token);
});

// Committed replay fixtures (M2 follow-on): one canonical tape of recorded native receipts and the replay-labelled episode exported from it.
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const TAPE_FIXTURE = "replay-tape-native-receipts.json";
const EPISODE_FIXTURE = "episode-replay-native-receipts.json";
const readFixture = (name: string): string => readFileSync(join(fixtureDir, name), "utf8");

test("the committed replay tape is canonical, carries the committed evidence receipts verbatim, and replays to the committed episode byte-for-byte", () => {
  const raw = readFixture(TAPE_FIXTURE);
  const tape = JSON.parse(raw) as ReplayTape;
  assert.equal(raw, canonicalJson(tape) + "\n");
  const byId = new Map(tape.entries.map(entry => [entry.id, entry.native] as const));
  assert.equal(canonicalJson(byId.get("forge-verify-fail")!), canonicalJson(failRecord));
  assert.equal(canonicalJson(byId.get("forge-verify-pass")!), canonicalJson(passRecord));
  assert.equal(canonicalJson(byId.get("furnace-completed")!), canonicalJson(furnaceEnvelope));
  const result = replayTape(tape);
  assert.equal(episodeBytes(result.episode), readFixture(EPISODE_FIXTURE));
  assert.equal(result.episode.verifier.receiptDigest, digest(tape));
});

test("the committed tape replays recorded outcomes: the FAIL stays FAIL, only the clean PASS and the completed Furnace run certify, the duplicate is dropped", () => {
  const result = replayTape(JSON.parse(readFixture(TAPE_FIXTURE)) as ReplayTape);
  assert.deepEqual(result.observations.map(o => [o.entryId, o.status, o.certified]), [["forge-verify-fail", "FAIL", false], ["forge-verify-pass", "PASS", true], ["furnace-completed", "completed", true]]);
  assert.deepEqual(result.conflicts, []);
  assert.equal(result.episode.mode, "replay");
  assert.equal(result.episode.verifier.label, "replay");
  assert.equal(result.episode.sanitize.ran, true);
  assert.equal(result.episode.verifier.verdict, "applied=3,conflicts=0");
});

test("pin P1: a Forge receipt without a boolean basis.clean replays clean unknown and its PASS does not certify", () => {
  const result = replayTape(tapeOf([forge("u1", 1, { kind: "passed" }), forge("u2", 1, { kind: "passed", basis: { clean: "yes" } })]));
  assert.deepEqual(result.observations.map(o => [o.status, o.clean, o.certified]), [["PASS", "unknown", false], ["PASS", "unknown", false]]);
});

test("pin P2: a Furnace envelope certifies only when ok is true and data.state is completed", () => {
  const envelope = (ok: boolean, state: string): JsonValue => ({ protocol_version: 1, kind: "run_resume", ok, data: { state } });
  const result = replayTape(tapeOf([
    { id: "a", system: "furnace", subject: "run-a", revision: 1, kind: "run_resume", native: envelope(false, "completed") },
    { id: "b", system: "furnace", subject: "run-b", revision: 1, kind: "run_resume", native: envelope(true, "needs_attention") },
    { id: "c", system: "furnace", subject: "run-c", revision: 1, kind: "run_resume", native: envelope(true, "completed") },
  ]));
  assert.deepEqual(result.observations.map(o => [o.status, o.certified]), [["completed", false], ["needs_attention", false], ["completed", true]]);
});

test("pin P3: a closed Beads record still never certifies", () => {
  const [observation] = replayTape(tapeOf([{ id: "b9", system: "beads", subject: "bd-9", revision: 1, kind: "show", native: { id: "bd-9", status: "closed" } }])).observations;
  assert.equal(observation!.status, "closed");
  assert.equal(observation!.certified, false);
});

test("pin P4: an identical duplicate alone raises no conflict and a mismatched id reuse alone raises exactly one", () => {
  const first = forge("d1", 1, failRecord);
  const identical = replayTape(tapeOf([first, { ...first }]));
  assert.deepEqual(identical.observations.map(o => o.entryId), ["d1"]);
  assert.deepEqual(identical.conflicts, []);
  const mismatch = replayTape(tapeOf([first, forge("d1", 1, passRecord)]));
  assert.deepEqual(mismatch.observations.map(o => o.entryId), ["d1"]);
  assert.deepEqual(mismatch.conflicts.map(c => [c.code, c.entryId]), [["REPLAY_CONFLICT_DUPLICATE_MISMATCH", "d1"]]);
});

test("pin P5: revisions are tracked per system and subject, so one subject name in two systems never conflicts", () => {
  const result = replayTape(tapeOf([forge("g1", 5, passRecord), { id: "h1", system: "hx", subject: "gate", revision: 1, kind: "find", native: { exit: 0, coverage: "complete" } }]));
  assert.deepEqual(result.observations.map(o => o.entryId), ["g1", "h1"]);
  assert.deepEqual(result.conflicts, []);
});

test("pin P8: revisions are tracked per subject inside one system, so a lower revision on a second subject applies with no conflict while the first subject still refuses it", () => {
  const other = (id: string, revision: number): ReplayEntry => ({ ...forge(id, revision, passRecord), subject: "lint" });
  const separate = replayTape(tapeOf([forge("a1", 5, passRecord), other("b1", 1)]));
  assert.deepEqual(separate.observations.map(o => [o.entryId, o.subject, o.revision]), [["a1", "gate", 5], ["b1", "lint", 1]]);
  assert.deepEqual(separate.conflicts, []);
  const sameSubject = replayTape(tapeOf([forge("a1", 5, passRecord), other("b1", 1), forge("a2", 4, passRecord)]));
  assert.deepEqual(sameSubject.observations.map(o => o.entryId), ["a1", "b1"]);
  assert.deepEqual(sameSubject.conflicts.map(c => [c.code, c.entryId, c.subject]), [["REPLAY_CONFLICT_STALE_REVISION", "a2", "gate"]]);
});

test("pin P6: checkpoints chain each native digest onto the previous checkpoint, starting from the tape id", () => {
  const { episode, observations } = replayTape(tapeOf([forge("f1", 1, failRecord), forge("p1", 2, passRecord)]));
  const c0 = digest({ prev: digest({ tape: "witness" }), entry: "f1", native: observations[0]!.nativeDigest });
  const c1 = digest({ prev: c0, entry: "p1", native: observations[1]!.nativeDigest });
  assert.deepEqual(episode.checkpoints, [c0, c1]);
});

test("pin P7: an empty tapeId, an empty entry id or a fractional revision is refused with REPLAY_TAPE_UNSUPPORTED", () => {
  const refused = (tape: unknown): void => assert.throws(() => replayTape(tape as ReplayTape), /^Error: REPLAY_TAPE_UNSUPPORTED/);
  refused({ ...tapeOf([]), tapeId: "" });
  refused(tapeOf([forge("", 1, passRecord)]));
  refused(tapeOf([forge("r", 1.5, passRecord)]));
});
