import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, reconcile, canonicalJson, digest, exportEpisodeForTraining, exportEpisodesForTraining, trainingBytes, labelTrainingMode, sanitizeValue } from "../dist/index.js";
import type { Episode, EnvironmentEpisode, Intent, Rejection, TrainingExport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");

/** One row per environment: the pinned source episode, the exported training fixture beside it. */
const rows = [
  { env: "landing-queue", source: "landing-queue-seed7.json", exported: "training-landing-queue-seed7.json" },
  { env: "compaction-inheritance", source: "compaction-inheritance-seed7.json", exported: "training-compaction-inheritance-seed7.json" },
  { env: "colony-resilience", source: "colony-resilience-seed29.json", exported: "training-colony-resilience-seed29.json" },
  { env: "artifact-recovery", source: "artifact-recovery-seed7.json", exported: "training-artifact-recovery-seed7.json" },
  { env: "quorum-evidence", source: "quorum-evidence-independent-seed7.json", exported: "training-quorum-evidence-independent-seed7.json" },
] as const;

const readSource = (name: string): EnvironmentEpisode => JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as EnvironmentEpisode;
const episodeOf = (index: number): Episode => toEpisode(readSource(rows[index]!.source));

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

test("the eligibility mask of every step equals the admitted set recomputed by reconcile from the recorded resolution (replay equality)", () => {
  for (const row of rows) {
    const source = readSource(row.source);
    const exported = exportEpisodeForTraining(toEpisode(source));
    assert.equal(exported.steps.length, source.steps.length, row.env);
    source.steps.forEach((step, index) => {
      const byId = new Map<string, Intent>();
      for (const intent of step.resolution.admitted) byId.set(intent.intentId, intent);
      for (const rejection of step.resolution.rejected as readonly Rejection[]) byId.set(rejection.intent.intentId, rejection.intent);
      const protectedScopes = (step.resolution.rejected as readonly Rejection[]).filter(r => r.code === "INTENT_SCOPE_PROTECTED").flatMap(r => r.intent.writeScopes);
      const intents = step.proposed.map(id => byId.get(id)!);
      const recomputed = reconcile({ basis: step.resolution.basis, budget: step.resolution.budget, protectedScopes, proposals: [{ intents, memory: null, trace: [] }] });
      assert.deepEqual(exported.steps[index]!.mask.admitted, recomputed.admitted.map(intent => intent.intentId), `${row.env} step ${index}`);
      assert.deepEqual(exported.steps[index]!.mask.rejected, recomputed.rejected.map(r => ({ intentId: r.intent.intentId, code: r.code })), `${row.env} step ${index} rejected`);
    });
  }
});

test("the mask is the admitted set, never the proposed set: a step that proposed more than it was admitted exports the smaller mask", () => {
  const colony = exportEpisodeForTraining(episodeOf(2));
  const narrowed = colony.steps.filter(step => step.mask.admitted.length < step.sampled.length);
  assert.ok(narrowed.length >= 1, "the colony fixture rejects at least one proposed intent");
  for (const step of narrowed) assert.ok(step.mask.rejected.length >= 1);
});

test("a step whose policy recorded no log probability exports the explicit unknown, never 0 or null, and a recorded one is kept", () => {
  for (const [index, row] of rows.entries()) {
    const exported = exportEpisodeForTraining(episodeOf(index));
    assert.equal(hasNull(exported), false, `${row.env} carries a null`);
    for (const step of exported.steps) assert.equal(step.logProb, "unknown");
  }
  const base = episodeOf(0);
  const withProb: Episode = { ...base, decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, logProb: -0.25 } : decision)) };
  const exported = exportEpisodeForTraining(withProb);
  assert.equal(exported.steps[0]!.logProb, -0.25);
  assert.equal(exported.steps[1]!.logProb, "unknown");
});

test("each step carries sampling support, the checkpoint before and after, provenance, verifier reference, lineage and arms", () => {
  const episode = episodeOf(3);
  const exported = exportEpisodeForTraining(episode);
  assert.equal(exported.schema, "mw.training-export.v1");
  assert.equal(exported.version, 1);
  assert.equal(exported.episodeId, episode.episodeId);
  assert.equal(exported.environment, "artifact-recovery");
  exported.steps.forEach((step, index) => {
    assert.deepEqual(step.support, { policyId: episode.policy.id, revision: episode.policy.revision, configHash: episode.policy.configHash });
    assert.equal(step.checkpoint.after, episode.checkpoints[index]);
    assert.equal(step.checkpoint.before, index === 0 ? episode.initialCheckpoint : episode.checkpoints[index - 1]);
    if (index === 0) assert.match(step.checkpoint.before, /^sha256:[0-9a-f]{64}$/, "step 0 checkpoint.before is a state hash, never unknown");
    assert.deepEqual(step.sampled, episode.decisions[index]!.proposed);
    assert.equal(step.provenance.family, episode.task.family);
    assert.equal(step.provenance.basis, episode.task.basis);
    assert.deepEqual(step.provenance.readSet, episode.decisions[index]!.readSet);
    assert.deepEqual(step.provenance.evidence, episode.decisions[index]!.provenance);
  });
  assert.deepEqual(exported.verifier, episode.verifier);
  assert.deepEqual(exported.lineage, { attempts: episode.attempts, arms: episode.arms });
});

test("one actor id per decision: a single-role episode names it, a multi-role episode exports the explicit unknown", () => {
  const single = exportEpisodeForTraining(episodeOf(0));
  assert.ok(single.steps.every(step => step.actorId === "lane"));
  const multi = exportEpisodeForTraining(episodeOf(3));
  assert.deepEqual(episodeOf(3).roles, ["consumer", "producer"]);
  assert.ok(multi.steps.every(step => step.actorId === "unknown"));
});

test("the mode label is preserved and every upgrade, and every label outside the closed enum, is refused with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const fixture = exportEpisodeForTraining(episodeOf(0));
  assert.equal(fixture.mode, "fixture");
  const replayed = exportEpisodeForTraining({ ...episodeOf(0), mode: "replay" });
  assert.equal(replayed.mode, "replay");
  assert.equal(labelTrainingMode(fixture, "fixture").mode, "fixture");
  for (const mode of ["replay", "live", "live-verified", "Fixture", ""]) {
    assert.throws(() => labelTrainingMode(fixture, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*fixture.*${mode}`), `fixture -> ${mode}`);
  }
  assert.throws(() => labelTrainingMode(replayed, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelTrainingMode(replayed, "fixture").mode, "fixture", "lowering is not an upgrade");
  const relabelled = labelTrainingMode(replayed, "fixture");
  assert.equal(relabelled.digest, digest(stripDigest(relabelled)), "a relabel recomputes the digest");
  assert.notEqual(relabelled.digest, replayed.digest);
});

function stripDigest(exported: TrainingExport): unknown {
  const { digest: _digest, ...body } = exported;
  return body;
}

test("sanitisation runs before materialisation: a planted credential-shaped value is redacted, its path recorded, and no secret survives in the bytes", () => {
  const base = episodeOf(0);
  const secret = "sk-abcdefghijklmnopqrstuvwxyz0123";
  const planted: Episode = {
    ...base,
    decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: [`leaked ${secret}`, "safe"] } : decision)),
    sanitize: { ran: true, removed: ["/events/3/detail"] },
  };
  const exported = exportEpisodeForTraining(planted);
  assert.equal(exported.steps[0]!.provenance.evidence[0], "[redacted]");
  assert.equal(exported.steps[0]!.provenance.evidence[1], "safe");
  assert.deepEqual(exported.sanitize, { ran: true, removed: ["/steps/0/provenance/evidence/0"], inherited: ["/events/3/detail"] });
  assert.equal(trainingBytes(exported).includes(secret), false);
  assert.deepEqual(exportEpisodeForTraining(base).sanitize, { ran: true, removed: [], inherited: [] });
});

test("exporting does not mutate its input, is deterministic, and the batch variant is the element-wise export in input order", () => {
  const frozen = rows.map((_row, index) => deepFreeze(episodeOf(index)));
  const snapshots = frozen.map(episode => canonicalJson(episode));
  const batch = exportEpisodesForTraining(frozen);
  frozen.forEach((episode, index) => {
    assert.equal(canonicalJson(episode), snapshots[index], "input altered");
    assert.equal(trainingBytes(batch[index]!), trainingBytes(exportEpisodeForTraining(episode)));
  });
  assert.equal(batch.length, rows.length);
  assert.deepEqual(exportEpisodesForTraining([]), []);
  assert.equal(trainingBytes(exportEpisodeForTraining(frozen[0]!)), trainingBytes(exportEpisodeForTraining(frozen[0]!)));
});

test("the digest covers every other member: it equals digest of the body, and any change to a step moves it", () => {
  const exported = exportEpisodeForTraining(episodeOf(4));
  assert.equal(exported.digest, digest(stripDigest(exported)));
  const changed = exportEpisodeForTraining({ ...episodeOf(4), checkpoints: episodeOf(4).checkpoints.map((c, i) => (i === 0 ? "sha256:" + "0".repeat(64) : c)) });
  assert.notEqual(changed.digest, exported.digest);
});

test("each committed training fixture equals the regenerated export byte for byte, in canonical form, with its digest", () => {
  for (const row of rows) {
    const committed = readFileSync(join(fixtureDir, row.exported), "utf8");
    const regenerated = exportEpisodeForTraining(toEpisode(readSource(row.source)));
    assert.equal(committed, trainingBytes(regenerated), row.exported);
    assert.equal(committed.endsWith("\n"), true);
    const parsed = JSON.parse(committed) as TrainingExport;
    assert.equal(canonicalJson(parsed), committed.trimEnd());
    assert.equal(parsed.digest, digest(stripDigest(parsed)));
  }
  const present = readdirSync(fixtureDir).filter(name => name.startsWith("training-"));
  assert.deepEqual(present.sort(), rows.map(row => row.exported).sort(), "exactly one training fixture per environment");
});

test("the export module imports nothing outside the package and reaches no effect surface", () => {
  const source = readFileSync(join(here, "../src/training-export.ts"), "utf8");
  const specifiers = [...source.matchAll(/from\s+"([^"]+)"/g)].map(match => match[1]!);
  assert.ok(specifiers.length > 0);
  for (const specifier of specifiers) assert.match(specifier, /^\.\/[a-z-]+\.js$/, `import ${specifier} leaves the package`);
  for (const forbidden of [/\bnode:/, /\bprocess\./, /\bfetch\s*\(/, /\bwriteFile/, /\bchild_process\b/, /\bDate\.now\b/, /\bMath\.random\b/, /\bnew Date\b/]) {
    assert.equal(forbidden.test(source), false, `training-export.ts matches ${String(forbidden)}`);
  }
});

test("a prototype key is a label outside the closed enum and is refused with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const fixture = exportEpisodeForTraining(episodeOf(0));
  for (const mode of ["constructor", "toString", "hasOwnProperty", "__proto__"]) {
    assert.throws(() => labelTrainingMode(fixture, mode), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `fixture -> ${mode}`);
  }
});

test("an export that redacted a value records exactly its removed path and its digest covers every other member, the sanitize record included", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: ["leaked sk-abcdefghijklmnopqrstuvwxyz0123"] } : decision)) };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.removed, ["/steps/0/provenance/evidence/0"]);
  assert.equal(exported.digest, digest(stripDigest(exported)));
});

test("every step's provenance read set equals the decision's recorded read set on an episode that records non-empty read sets", () => {
  const episode = episodeOf(0);
  const exported = exportEpisodeForTraining(episode);
  assert.ok(episode.decisions.some(decision => decision.readSet.length > 0), "the landing-queue fixture records a non-empty read set");
  exported.steps.forEach((step, index) => assert.deepEqual(step.provenance.readSet, episode.decisions[index]!.readSet));
});

test("a relabel changes only the mode and the digest: every other member, a redacting export's sanitize record included, is kept", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, mode: "replay", decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: ["leaked sk-abcdefghijklmnopqrstuvwxyz0123"] } : decision)) };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.removed, ["/steps/0/provenance/evidence/0"]);
  const relabelled = labelTrainingMode(exported, "fixture");
  assert.deepEqual(stripDigest(relabelled), { ...(stripDigest(exported) as Record<string, unknown>), mode: "fixture" });
});

test("an export whose own mode label sits outside the closed enum is refused for every requested label with EPISODE_MODE_UPGRADE_FORBIDDEN naming its own label", () => {
  const fixture = exportEpisodeForTraining(episodeOf(0));
  for (const own of ["bogus", "constructor", "", "__proto__", "toString"]) {
    const handBuilt = { ...fixture, mode: own } as unknown as TrainingExport;
    for (const requested of ["live", "replay", "fixture", own]) {
      assert.throws(() => labelTrainingMode(handBuilt, requested), (error: Error) => /^EPISODE_MODE_UPGRADE_FORBIDDEN: /.test(error.message) && error.message.includes(`labelled ${own} cannot`), `${JSON.stringify(own)} -> ${JSON.stringify(requested)}`);
    }
  }
  assert.throws(() => labelTrainingMode({ ...fixture, mode: undefined } as unknown as TrainingExport, "fixture"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelTrainingMode(fixture, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/, "the enum control still refuses an upgrade");
  assert.equal(labelTrainingMode({ ...exportEpisodeForTraining({ ...episodeOf(0), mode: "replay" }) }, "fixture").mode, "fixture", "the enum control still allows a lowering");
});

test("MechanicalWorkflows-xvcv: a requested label that is not a string is refused as a closed-enum violation, never coerced to an enum key and never a TypeError", () => {
  const live = exportEpisodeForTraining({ ...episodeOf(0), mode: "live" });
  assert.equal(live.mode, "live");
  const coerced: unknown[] = [{ toString: () => "live" }, { toString: () => "fixture" }, ["live"], ["fixture"], 2, null, undefined];
  for (const requested of coerced) {
    assert.throws(() => labelTrainingMode(live, requested as unknown as string), (error: Error) => error.constructor === Error && /^EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled live cannot be labelled /.test(error.message), `live -> ${String(JSON.stringify(requested))}`);
  }
  assert.equal(labelTrainingMode(live, "fixture").mode, "fixture", "the string control still relabels");
});

test("MechanicalWorkflows-7pv4c: a Symbol requested label is refused with the named closed-enum error that names the label, never a TypeError", () => {
  const live = exportEpisodeForTraining({ ...episodeOf(0), mode: "live" });
  assert.throws(() => labelTrainingMode(live, Symbol("x") as unknown as string), (error: Error) => error.constructor === Error && error.message === "EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled live cannot be labelled Symbol(x)");
  const fixture = exportEpisodeForTraining(episodeOf(0));
  assert.throws(() => labelTrainingMode(fixture, Symbol("live") as unknown as string), (error: Error) => error.constructor === Error && error.message === "EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled fixture cannot be labelled Symbol(live)");
  assert.equal(labelTrainingMode(live, "fixture").mode, "fixture", "the string control still relabels");
  assert.throws(() => labelTrainingMode(fixture, "live"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled fixture cannot be labelled live$/, "a string upgrade keeps its landed message text");
});

test("MechanicalWorkflows-xvcv: an export whose own mode is a Symbol or a string-coercing object is refused with the named error, never a TypeError", () => {
  const fixture = exportEpisodeForTraining(episodeOf(0));
  const ownModes: unknown[] = [Symbol("live"), { toString: () => "fixture" }, ["fixture"]];
  for (const own of ownModes) {
    const handBuilt = { ...fixture, mode: own } as unknown as TrainingExport;
    assert.throws(() => labelTrainingMode(handBuilt, "fixture"), (error: Error) => error.constructor === Error && /^EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled .* cannot be labelled fixture$/.test(error.message), `own ${String(own)}`);
  }
  const symbolic = { ...fixture, mode: Symbol("live") } as unknown as TrainingExport;
  assert.throws(() => labelTrainingMode(symbolic, "live"), (error: Error) => error.message === "EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled Symbol(live) cannot be labelled live");
});

test("a relabel of a live-source export, and of a fixture-source export, preserves every member except the mode and the digest", () => {
  for (const source of ["live", "fixture"] as const) {
    const exported = exportEpisodeForTraining({ ...episodeOf(0), mode: source });
    assert.equal(exported.mode, source);
    assert.ok(exported.steps.length > 0, `the ${source} source carries steps`);
    for (const lower of MODES.filter(mode => rankOf(mode) <= rankOf(source))) {
      const relabelled = labelTrainingMode(exported, lower);
      assert.deepEqual(stripDigest(relabelled), { ...(stripDigest(exported) as Record<string, unknown>), mode: lower }, `${source} -> ${lower}`);
      assert.equal(relabelled.digest, digest(stripDigest(relabelled)));
    }
  }
});

test("a decision's multi-element read set is carried whole and in order into its step's provenance", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, decisions: base.decisions.map((decision, index) => (index === 1 ? { ...decision, readSet: ["main", "queue"] } : decision)) };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.steps[1]!.provenance.readSet, ["main", "queue"]);
  exported.steps.forEach((step, index) => assert.deepEqual(step.provenance.readSet, planted.decisions[index]!.readSet));
});

test("a relabel keeps a non-empty inherited sanitize record: an export of an episode that arrives with a sanitize record relabels with that record whole", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: ["/decisions/0/provenance/0"] } };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.inherited, ["/decisions/0/provenance/0"]);
  const relabelled = labelTrainingMode(exported, "fixture");
  assert.deepEqual(relabelled.sanitize.inherited, ["/decisions/0/provenance/0"]);
  assert.deepEqual(stripDigest(relabelled), { ...(stripDigest(exported) as Record<string, unknown>), mode: "fixture" });
});

test("an unsorted multi-element read set keeps its recorded order in the step's provenance", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, decisions: base.decisions.map((decision, index) => (index === 1 ? { ...decision, readSet: ["queue", "main"] } : decision)) };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.steps[1]!.provenance.readSet, ["queue", "main"]);
});

test("a multi-element unsorted inherited sanitize record is exported and relabelled whole and in its recorded order", () => {
  const base = episodeOf(0);
  const inherited = ["/events/3/detail", "/decisions/0/provenance/0"];
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: inherited } };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.inherited, inherited);
  assert.deepEqual(labelTrainingMode(exported, "fixture").sanitize.inherited, inherited);
});

test("an inherited sanitize path that is itself credential-shaped never reaches the exported or relabelled bytes", () => {
  const base = episodeOf(0);
  const secret = "sk-abcdefghijklmnopqrstuvwxyz0123";
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: [`/events/3/${secret}`] } };
  const exported = exportEpisodeForTraining(planted);
  assert.equal(trainingBytes(exported).includes(secret), false);
  assert.equal(trainingBytes(labelTrainingMode(exported, "fixture")).includes(secret), false);
});

test("every path an export lists as removed names a member the export carries redacted or not at all", () => {
  const base = episodeOf(0);
  const at = (node: unknown, pointer: string): unknown => pointer.split("/").slice(1).reduce<unknown>((value, key) => (value === null || typeof value !== "object" ? undefined : (value as Record<string, unknown>)[key]), node);
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: ["/events/3/sk-abcdefghijklmnopqrstuvwxyz0123"] } };
  const exported = exportEpisodeForTraining(planted);
  assert.ok(exported.sanitize.removed.length > 0, "the planted inherited path is credential-shaped, so the export sanitiser reports removing something");
  for (const path of exported.sanitize.removed) {
    const member = at(exported, path);
    assert.ok(member === undefined || member === "[redacted]", `${path} still carries ${String(member)}`);
  }
});

test("an inherited credential-shaped path is exported and relabelled as the redaction placeholder in its recorded position between clean paths, never dropped", () => {
  const base = episodeOf(0);
  const inherited = ["/events/3/detail", "/events/3/sk-abcdefghijklmnopqrstuvwxyz0123", "/decisions/0/provenance/0"];
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: inherited } };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.inherited, ["/events/3/detail", "[redacted]", "/decisions/0/provenance/0"]);
  assert.deepEqual(exported.sanitize.removed, ["/sanitize/inherited/1"]);
  assert.deepEqual(labelTrainingMode(exported, "fixture").sanitize.inherited, ["/events/3/detail", "[redacted]", "/decisions/0/provenance/0"]);
});

test("an inherited sanitize record that repeats a path, as two credential-shaped field names under one member produce, is exported and relabelled with every entry, never de-duplicated", () => {
  assert.deepEqual(sanitizeValue({ detail: { "ghp_abcdefghijklmnopqrstuvwxyz0123": 1, "sk-abcdefghijklmnopqrstuvwxyz0123": 2 } }).removed, ["/detail/[redacted]", "/detail/[redacted]"]);
  const base = episodeOf(0);
  const inherited = ["/events/3/[redacted]", "/events/3/[redacted]", "/decisions/0/provenance/0"];
  const planted: Episode = { ...base, mode: "replay", sanitize: { ...base.sanitize, removed: inherited } };
  const exported = exportEpisodeForTraining(planted);
  assert.deepEqual(exported.sanitize.inherited, inherited);
  assert.deepEqual(exported.sanitize.removed, []);
  assert.deepEqual(labelTrainingMode(exported, "fixture").sanitize.inherited, inherited);
});

/** TW-EAT-R001 (mv90): the full source-by-output mode matrix, in the fixture, replay, live ordering. */
const MODES = ["fixture", "replay", "live"] as const;
const rankOf = (mode: string): number => MODES.indexOf(mode as (typeof MODES)[number]);

test("every ordered source and output mode pair follows the fixture, replay, live ordering: an output at or below its source keeps exactly the requested label and an output above it is refused with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  for (const source of MODES) {
    const exported = exportEpisodeForTraining({ ...episodeOf(0), mode: source });
    assert.equal(exported.mode, source, `${source} export keeps its source label`);
    for (const output of MODES) {
      const pair = `${source} to ${output}`;
      if (rankOf(output) <= rankOf(source)) {
        const labelled = labelTrainingMode(exported, output);
        assert.equal(labelled.mode, output, pair);
        assert.equal(labelled.digest, digest(stripDigest(labelled)), `${pair}: the digest follows the label`);
        assert.deepEqual(stripDigest(labelled), { ...(stripDigest(exported) as Record<string, unknown>), mode: output }, `${pair}: every member other than the mode and the digest is kept`);
      } else {
        assert.throws(() => labelTrainingMode(exported, output), new RegExp(`^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*${source}.*${output}`), pair);
      }
    }
  }
});

test("a relabel of a live-source export that redacted a value keeps the steps and the sanitize record whole for the replay and fixture outputs", () => {
  const base = episodeOf(0);
  const planted: Episode = { ...base, mode: "live", decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: ["leaked sk-abcdefghijklmnopqrstuvwxyz0123"] } : decision)) };
  const exported = exportEpisodeForTraining(planted);
  assert.equal(exported.mode, "live");
  assert.ok(exported.steps.length > 0, "the live export carries steps");
  assert.deepEqual(exported.sanitize.removed, ["/steps/0/provenance/evidence/0"]);
  for (const output of ["replay", "fixture"] as const) {
    const relabelled = labelTrainingMode(exported, output);
    assert.deepEqual(stripDigest(relabelled), { ...(stripDigest(exported) as Record<string, unknown>), mode: output }, `live to ${output}`);
    assert.deepEqual(relabelled.steps, exported.steps, `live to ${output}: steps kept`);
    assert.deepEqual(relabelled.sanitize, exported.sanitize, `live to ${output}: sanitize record kept`);
  }
});

test("TW-EAT-R002: a fixture-labelled export refuses an episode whose verifier outranks its mode and every relabel to fork", () => {
  const fixture = episodeOf(0);
  const inflated = { ...fixture, verifier: { ...fixture.verifier, label: "replay" as const } };
  assert.throws(() => exportEpisodeForTraining(inflated), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fixture.*replay/);
  assert.equal(exportEpisodeForTraining(fixture).verifier.label, "fixture");
  const exported = exportEpisodeForTraining(fixture);
  assert.throws(() => labelTrainingMode(exported, "fork"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fork/);
  assert.throws(() => labelTrainingMode({ ...exported, mode: "live" }, "fork"), /^Error: EPISODE_MODE_UPGRADE_FORBIDDEN: .*fork/);
});
