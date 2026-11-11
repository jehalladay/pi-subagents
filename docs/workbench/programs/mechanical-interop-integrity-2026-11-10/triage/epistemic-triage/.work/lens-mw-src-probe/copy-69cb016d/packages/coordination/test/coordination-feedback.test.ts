// MechanicalWorkflows-rjmg (GPC-EAT-R008): feedback status in the mw.coordination-decision.v1
// sidecar is the closed enum {unknown, pending, final}; a numeric reward may be present only
// when the status is final (otherwise the reward is the literal "unknown"); and a fixture-mode
// sidecar record refuses relabelling to replay or live with EPISODE_MODE_UPGRADE_FORBIDDEN,
// leaving the record and its digest unchanged. A committed python-consumer fixture pins the law.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCoordinationDecision, labelCoordinationDecision, canonicalJson, digest } from "../dist/index.js";
import type { CoordinationDecision, CoordinationFeedback, CoordinationFeedbackStatus } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");

const decision = (over: Partial<CoordinationDecision> = {}): CoordinationDecision => ({
  schema: "mw.coordination-decision.v1",
  version: 1,
  decisionId: "decision:7:0",
  intentId: "mp-adapter:mp:decision:7:0:restack",
  graphId: "unknown",
  actorId: "lane",
  nodeId: "unknown",
  observationDigest: "sha256:" + "a".repeat(64),
  readSet: ["artifact:candidate:restack"],
  policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) },
  vocabulary: ["restack", "pause", "forbidden"],
  support: ["restack", "pause"],
  sampled: { id: "restack", logProb: -0.356 },
  rng: { streamId: "fmix32-mp1:7:42" },
  prestate: { memoryRevision: "unknown" },
  nativeOutcomeRef: "unknown",
  mode: "fixture",
  feedback: { status: "unknown", reward: "unknown" },
  ...over,
});

const withFeedback = (feedback: CoordinationFeedback): CoordinationDecision => decision({ feedback });

test("a numeric reward is admitted only on a final record; unknown and pending records carry the literal unknown", () => {
  assert.deepEqual(validateCoordinationDecision(withFeedback({ status: "unknown", reward: "unknown" })), { ok: true });
  assert.deepEqual(validateCoordinationDecision(withFeedback({ status: "pending", reward: "unknown" })), { ok: true });
  assert.deepEqual(validateCoordinationDecision(withFeedback({ status: "final", reward: "unknown" })), { ok: true });
  assert.deepEqual(validateCoordinationDecision(withFeedback({ status: "final", reward: 0.5 })), { ok: true });
  for (const status of ["unknown", "pending"] as const) {
    const outcome = validateCoordinationDecision(withFeedback({ status, reward: 1 }));
    assert.equal(outcome.ok, false, status);
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_FEEDBACK_REWARD_WITHOUT_FINAL", status);
    assert.match(outcome.detail, new RegExp(status));
  }
});

test("a status outside the closed enum, a non-finite reward or a mode outside the closed enum is DECISION_SIDECAR_MALFORMED naming the member", () => {
  const bad: [Partial<CoordinationDecision>, RegExp][] = [
    [{ feedback: { status: "done" as CoordinationFeedbackStatus, reward: "unknown" } }, /feedback status/],
    [{ feedback: { status: "final", reward: Number.NaN } }, /reward/],
    [{ feedback: { status: "final", reward: Number.POSITIVE_INFINITY } }, /reward/],
    [{ feedback: { status: "final", reward: null as unknown as number } }, /reward/],
    [{ mode: "live-verified" as never }, /mode/],
  ];
  for (const [over, pattern] of bad) {
    const outcome = validateCoordinationDecision(decision(over));
    assert.equal(outcome.ok, false, JSON.stringify(over));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", JSON.stringify(over));
    assert.match(outcome.detail, pattern);
  }
});

test("labelling a fixture record replay or live throws EPISODE_MODE_UPGRADE_FORBIDDEN and leaves the record and its digest unchanged", () => {
  const fixture = decision();
  const before = digest(fixture);
  for (const mode of ["replay", "live", "live-verified"]) {
    assert.throws(() => labelCoordinationDecision(fixture, mode), /EPISODE_MODE_UPGRADE_FORBIDDEN/, mode);
  }
  assert.equal(digest(fixture), before, "the refused relabel left the digest unchanged");
  assert.equal(fixture.mode, "fixture");
  assert.deepEqual(labelCoordinationDecision(fixture, "fixture"), fixture, "keeping the label is allowed");
  const live = decision({ mode: "live" });
  assert.equal(labelCoordinationDecision(live, "replay").mode, "replay", "lowering the label is allowed");
  assert.equal(labelCoordinationDecision(live, "fixture").mode, "fixture");
  assert.throws(() => labelCoordinationDecision(decision({ mode: "replay" }), "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelCoordinationDecision(live, "replay").feedback, live.feedback, "relabelling never touches feedback");
});

// MechanicalWorkflows-uwmo (APO-EAT-R012): lowering a sidecar label returns a new record whose digest is recomputed over
// the lowered label; the source record and its digest are untouched, and a lowered record cannot climb back up.
test("lowering a live or replay record to fixture recomputes the digest, leaves the source untouched and cannot be re-upgraded", () => {
  for (const from of ["live", "replay"] as const) {
    const source = decision({ mode: from });
    const sourceDigest = digest(source);
    const lowered = labelCoordinationDecision(source, "fixture");
    assert.notEqual(lowered, source, `${from}: lowering returns a new record`);
    assert.equal(lowered.mode, "fixture");
    assert.notEqual(digest(lowered), sourceDigest, `${from}: the lowered digest differs from the source digest`);
    assert.equal(digest(lowered), digest(decision({ mode: "fixture" })), `${from}: the lowered digest equals the digest of the same record built as fixture`);
    assert.equal(canonicalJson(lowered), canonicalJson(decision({ mode: "fixture" })), `${from}: the lowered bytes equal the fixture bytes`);
    assert.equal(source.mode, from, `${from}: the source label is untouched`);
    assert.equal(digest(source), sourceDigest, `${from}: the source digest is unchanged`);
    assert.deepEqual(validateCoordinationDecision(lowered), { ok: true });
    for (const up of ["replay", "live"]) {
      assert.throws(() => labelCoordinationDecision(lowered, up), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `${from} lowered to fixture then labelled ${up}`);
    }
  }
});

// MechanicalWorkflows-o9bk (successor to uwmo): four sidecar relabel laws the uwmo block leaves unpinned.
test("a source record whose own mode sits outside the closed enum refuses every relabel, including a lowering to fixture", () => {
  const rogue = decision({ mode: "live-verified" as never });
  const before = digest(rogue);
  for (const mode of ["fixture", "replay", "live"]) {
    assert.throws(() => labelCoordinationDecision(rogue, mode), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `live-verified source relabelled ${mode}`);
  }
  assert.equal(digest(rogue), before, "the refused relabels left the digest unchanged");
});

test("an Object.prototype member name is no mode label: relabel refuses it as a target and the validator refuses it as a record mode", () => {
  const live = decision({ mode: "live" });
  for (const name of ["constructor", "toString", "hasOwnProperty", "__proto__", "valueOf"]) {
    assert.throws(() => labelCoordinationDecision(live, name), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `relabel to ${name}`);
    assert.throws(() => labelCoordinationDecision(decision({ mode: name as never }), "fixture"), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `source mode ${name}`);
    const outcome = validateCoordinationDecision(decision({ mode: name as never }));
    assert.equal(outcome.ok, false, `validator mode ${name}`);
    if (outcome.ok) continue;
    assert.equal(outcome.code, "DECISION_SIDECAR_MALFORMED", name);
    assert.match(outcome.detail, /mode/, name);
  }
});

test("keeping the label is allowed for live and replay records as well as fixture: the relabel returns an equal valid record", () => {
  for (const mode of ["fixture", "replay", "live"] as const) {
    const source = decision({ mode });
    const kept = labelCoordinationDecision(source, mode);
    assert.equal(kept.mode, mode, `${mode} kept as ${mode}`);
    assert.deepEqual(kept, source, `${mode}: the kept record equals the source`);
    assert.equal(digest(kept), digest(source), `${mode}: the kept digest equals the source digest`);
    assert.deepEqual(validateCoordinationDecision(kept), { ok: true }, mode);
  }
});

test("lowering a live record to replay returns a new record with a recomputed digest and leaves the source object and digest untouched", () => {
  const source = decision({ mode: "live" });
  const sourceDigest = digest(source);
  const sourceBytes = canonicalJson(source);
  const lowered = labelCoordinationDecision(source, "replay");
  assert.notEqual(lowered, source, "lowering returns a new record, not the source object");
  assert.equal(lowered.mode, "replay");
  assert.equal(source.mode, "live", "the source label is untouched");
  assert.equal(digest(source), sourceDigest, "the source digest is unchanged");
  assert.equal(canonicalJson(source), sourceBytes, "the source bytes are unchanged");
  assert.notEqual(digest(lowered), sourceDigest, "the lowered digest differs from the source digest");
  assert.equal(digest(lowered), digest(decision({ mode: "replay" })), "the lowered digest equals the digest of the same record built as replay");
  assert.throws(() => labelCoordinationDecision(lowered, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/, "a lowered record cannot climb back to live");
});

test("the schema pins mode and feedback as required members with the closed status enum", () => {
  const schema = JSON.parse(readFileSync(join(here, "../schema/coordination-decision.v1.schema.json"), "utf8")) as {
    required: string[];
    properties: {
      mode: { enum: string[] };
      feedback: { required: string[]; additionalProperties: boolean; properties: { status: { enum: string[] }; reward: { oneOf: unknown[] } } };
    };
  };
  assert.ok(schema.required.includes("mode") && schema.required.includes("feedback"));
  assert.deepEqual([...schema.properties.mode.enum].sort(), ["fixture", "live", "replay"]);
  assert.deepEqual([...schema.properties.feedback.required].sort(), ["reward", "status"]);
  assert.equal(schema.properties.feedback.additionalProperties, false);
  assert.deepEqual([...schema.properties.feedback.properties.status.enum].sort(), ["final", "pending", "unknown"]);
  assert.equal(schema.properties.feedback.properties.reward.oneOf.length, 2, "reward is a number or the literal unknown");
});

interface TapeIntent { readonly intentId: string; readonly effect: string; readonly readScopes: readonly string[]; readonly target: { readonly uri: string } }
interface TapeStep { readonly step: number; readonly observationDigest: string; readonly intents: readonly TapeIntent[]; readonly admitted: readonly string[]; readonly stateHash: string }
interface Tape { readonly policy: { readonly id: string; readonly revision: string }; readonly run: { readonly seed: number }; readonly steps: readonly TapeStep[] }

const STATUSES: readonly CoordinationFeedbackStatus[] = ["unknown", "pending", "final"];

/** One fixture-mode sidecar per tape decision; the reward 1 on final records is a fixture constant, not a measurement. */
function fixtureDecisions(tape: Tape): CoordinationDecision[] {
  const effects = [...new Set(tape.steps.flatMap(step => step.intents.map(intent => intent.effect)))].sort();
  const vocabulary = [...new Set([...effects, "hold"])].sort();
  const programDigest = digest(tape.policy);
  const checkpointDigest = digest({ policy: tape.policy, run: tape.run });
  const out: CoordinationDecision[] = [];
  let previous = "unknown";
  tape.steps.forEach((step, index) => {
    const intent = step.intents[0];
    if (intent !== undefined) {
      const status = STATUSES[index % STATUSES.length] as CoordinationFeedbackStatus;
      out.push({
        schema: "mw.coordination-decision.v1",
        version: 1,
        decisionId: `fixture:landing-queue:${tape.run.seed}:${step.step}`,
        intentId: intent.intentId,
        graphId: "unknown",
        actorId: tape.policy.id,
        nodeId: intent.target.uri,
        observationDigest: step.observationDigest,
        readSet: intent.readScopes,
        policy: { programDigest, checkpointDigest },
        vocabulary,
        support: effects,
        sampled: { id: intent.effect, logProb: "unknown" },
        rng: { streamId: `fixture:landing-queue:${tape.run.seed}:${step.step}` },
        prestate: { memoryRevision: previous },
        nativeOutcomeRef: step.admitted.includes(intent.intentId) ? step.stateHash : "unknown",
        mode: "fixture",
        feedback: { status, reward: status === "final" ? 1 : "unknown" },
      });
    }
    previous = step.stateHash;
  });
  return out;
}

test("the committed python-consumer fixture equals the regenerated bytes; every record validates and numeric rewards sit only on final records", () => {
  const tape = JSON.parse(readFileSync(join(fixtureDir, "decision-tape-landing-queue-seed7.json"), "utf8")) as Tape;
  const decisions = fixtureDecisions(tape);
  assert.ok(decisions.length >= 3, "the tape yields at least three decisions");
  const raw = readFileSync(join(fixtureDir, "coordination-decisions-landing-queue-seed7.json"), "utf8");
  assert.equal(raw, canonicalJson({ decisions, digest: digest(decisions) }) + "\n");
  for (const record of decisions) assert.deepEqual(validateCoordinationDecision(record), { ok: true }, record.decisionId);
  const finals = decisions.filter(record => record.feedback.status === "final");
  const nonFinal = decisions.filter(record => record.feedback.status !== "final");
  assert.ok(finals.some(record => typeof record.feedback.reward === "number"), "at least one final record carries a numeric reward");
  assert.ok(nonFinal.length > 0 && nonFinal.every(record => record.feedback.reward === "unknown"), "no non-final record carries a reward");
  assert.ok(decisions.every(record => record.mode === "fixture"));
});
