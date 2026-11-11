// MechanicalWorkflows-9om3 (TW-EAT-R014): the opt-in step-level reference fixture refuses
// construction over any source lacking real step semantics (typed STEP_SEMANTICS_UNSUPPORTED),
// and the boundary criterion that distinguishes it from a general RL gym is documented and pinned.
// A step source must DECLARE and IMPLEMENT reset/step/observe/verify; an mw.episode.v1 record or
// any whole-episode-only source is refused by construction. Fixture evidence stays fixture: the
// verify leg labels "fixture" and never a native PASS.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stepFixture } from "../dist/index.js";
import type { StepSource } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const readmePath = join(here, "../../../docs/programs/trainingworks-2026-10-18/README.md");

/** A minimal scripted source with REAL step semantics: a counter world whose state is its own step count. */
function scriptedSource(): StepSource<number, "tick" | "stop", number> {
  let state = 0;
  return {
    capability: "step",
    sourceId: "scripted-counter",
    reset(seed: number) { state = seed % 5; return state; },
    step(action: "tick" | "stop") { if (action === "tick") state += 1; return { observation: state, done: action === "stop" }; },
    observe() { return state; },
    verify() { return { label: "fixture", verdict: `state=${state}` }; },
  };
}

test("a source with real step semantics constructs: reset/step/observe/verify round-trip deterministically, fixture-labelled", () => {
  const fixture = stepFixture(scriptedSource());
  assert.equal(fixture.mode, "fixture");
  assert.equal(fixture.reset(7), 2);
  assert.deepEqual(fixture.step("tick"), { observation: 3, done: false });
  assert.equal(fixture.observe(), 3);
  const verified = fixture.verify();
  assert.equal(verified.label, "fixture");
  assert.match(verified.verdict, /state=3/);
  assert.deepEqual(fixture.step("stop"), { observation: 3, done: true });
  const again = stepFixture(scriptedSource());
  assert.equal(again.reset(7), 2, "a fresh source resets identically");
});

test("construction over a whole-episode-only source throws typed STEP_SEMANTICS_UNSUPPORTED naming the boundary criterion", () => {
  const episode = JSON.parse(readFileSync(join(fixtureDir, "episode-landing-queue-seed7.json"), "utf8")) as Record<string, unknown>;
  const cases: [string, unknown][] = [
    ["an mw.episode.v1 record", episode],
    ["a whole-episode object with no step members", { schema: "mw.landing-queue.fixture.v1", steps: [] }],
    ["a source declaring step capability without implementing it", { capability: "step", sourceId: "liar" }],
    ["a source with functions but no capability declaration", { sourceId: "undeclared", reset: () => 0, step: () => ({ observation: 0, done: true }), observe: () => 0, verify: () => ({ label: "fixture", verdict: "" }) }],
    ["null", null],
    ["a blank sourceId", { ...scriptedSource(), sourceId: " " }],
  ];
  for (const [label, source] of cases) {
    assert.throws(
      () => stepFixture(source as never),
      (error: Error) => error.message.startsWith("STEP_SEMANTICS_UNSUPPORTED: ") && /real step semantics/.test(error.message),
      label,
    );
  }
});

test("fixture evidence never upgrades: the step fixture's verify label is fixture and a native-PASS-shaped label from the source is refused", () => {
  const lying = { ...scriptedSource(), verify: () => ({ label: "live-verified" as never, verdict: "PASS" }) };
  const fixture = stepFixture(lying);
  assert.throws(() => fixture.verify(), /STEP_VERIFY_LABEL_FORBIDDEN/);
});

test("a source declaring step capability and implementing all but exactly verify is refused, and the message names verify as the missing member", () => {
  const { verify: _omitted, ...withoutVerify } = scriptedSource();
  assert.throws(
    () => stepFixture(withoutVerify as never),
    (error: Error) => error.message.startsWith("STEP_SEMANTICS_UNSUPPORTED: ") && /without implementing verify has no real step semantics/.test(error.message),
  );
});

test("the verify-label guard keys on the label, not the verdict: a non-fixture label with a non-PASS verdict is refused", () => {
  const lying = { ...scriptedSource(), verify: () => ({ label: "live-verified" as never, verdict: "ok" }) };
  const fixture = stepFixture(lying);
  assert.throws(() => fixture.verify(), /STEP_VERIFY_LABEL_FORBIDDEN/);
});

test("every construction refusal cites the full two-clause boundary criterion verbatim, including the non-goal clause", () => {
  const criterion = "step surfaces exist only over sources with real step semantics, and no generic environment registry, reward engine or scheduler is introduced";
  const refused: unknown[] = [null, { capability: "step", sourceId: "liar" }, { ...scriptedSource(), sourceId: " " }];
  for (const source of refused) {
    assert.throws(
      () => stepFixture(source as never),
      (error: Error) => error.message.startsWith("STEP_SEMANTICS_UNSUPPORTED: ") && error.message.endsWith(`; ${criterion}`),
    );
  }
});

test("the program doc states the boundary criterion the module enforces, in the same words the error cites", () => {
  const readme = readFileSync(readmePath, "utf8");
  assert.ok(readme.includes("step surfaces exist only over sources with real step semantics"), "criterion sentence present");
  assert.ok(readme.includes("no generic environment registry, reward engine or scheduler is introduced"), "non-goal clause present");
  assert.ok(readme.includes("not** a general RL gym") || readme.includes("not a general RL gym"), "RL-gym distinction present");
});
