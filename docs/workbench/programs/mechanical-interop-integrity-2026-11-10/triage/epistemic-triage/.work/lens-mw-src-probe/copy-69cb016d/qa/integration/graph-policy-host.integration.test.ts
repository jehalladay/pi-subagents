// MechanicalWorkflows-hnqv.2 (claim readme-acceptance-forge-installed-integration-tests-before-rollout, C043):
// the Forge-reached integration journey for the GraphPolicy host adapter. Evidence grade FIXTURE for every verdict
// about GP behavior: no GraphPolicyCLI exists, so the clients are in-process doubles. The Forge operation id of the
// gate run that reached this file is recorded in the candidate record and upgrades no fixture verdict. Distinct from
// the GPC-EAT-R009 synthetic cut (vertical-cut.test.ts) and from the contract tests in packages/coordination/test.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  JOURNEY_FILE, JOURNEY_RECORD_FILE, buildJourneyRecord, gateNamesJourney, gateInputsCoverJourney, loadBuiltCoordination,
  journeyBytes, repoRoot, verifyFixtureBytes,
} from "./graph-policy-host.journey.ts";

const root = repoRoot();
const forgeToml = readFileSync(join(root, "forge.toml"), "utf8");
const evidenceLeg = /^evidence\s*=\s*\{\s*command\s*=\s*"([^"]*)"\s*,\s*inputs\s*=\s*\[([^\]]*)\]/m.exec(forgeToml);
const built = await loadBuiltCoordination();
const record = await buildJourneyRecord();

test("A1 gate reach: the root forge.toml evidence command names this journey, its inputs cover it, and removing the name fails the check", () => {
  assert.ok(evidenceLeg, "the evidence leg is a one-line command plus inputs in forge.toml");
  const command = evidenceLeg[1] ?? "";
  const inputs = evidenceLeg[2] ?? "";
  assert.ok(existsSync(join(root, JOURNEY_FILE)), "the journey file exists");
  assert.equal(gateNamesJourney(command, JOURNEY_FILE), true, "the evidence command names the journey file");
  assert.equal(gateInputsCoverJourney(inputs, JOURNEY_FILE), true, "the evidence inputs select this journey when it changes");
  const mutant = command.split(JOURNEY_FILE).join("");
  assert.notEqual(mutant, command, "the mutant removed the name");
  assert.equal(gateNamesJourney(mutant, JOURNEY_FILE), false, "mutant: the journey is no longer reached by the gate");
  const neighbour = command.split(JOURNEY_FILE).join(`${JOURNEY_FILE}.bak`);
  assert.equal(gateNamesJourney(neighbour, JOURNEY_FILE), false, "mutant: a near-miss file name is not the journey");
  assert.equal(gateInputsCoverJourney("\"packages/**\", \"apps/**\"", JOURNEY_FILE), false, "mutant: inputs that omit the journey do not cover it");
});

test("A2 built surface only: graphPolicyHost resolves from the built package entry, never from a src path", () => {
  assert.equal(built.entry, "packages/coordination/dist/index.js");
  assert.ok(!`/${built.entry}`.includes("/src/"), "no /src/ segment below the repository root");
  assert.equal(typeof built.module.graphPolicyHost, "function");
  for (const file of [JOURNEY_FILE, "qa/integration/graph-policy-host.journey.ts"]) {
    const text = readFileSync(join(root, file), "utf8");
    assert.doesNotMatch(text, new RegExp(`packages/coordination/${"src"}`), `${file} imports no coordination source`);
  }
});

test("A2 laws unchanged: the unconfigured host reproduces the fallback run's finalHash on every pinned observation and seed", () => {
  assert.ok(record.observations.length >= 6);
  for (const row of record.observations) {
    assert.equal(row.hostFinalHash, row.fallbackFinalHash, row.label);
    assert.ok(row.proposeCalls > 0, `${row.label}: the fixture consulted the host`);
    assert.equal(row.configuration.graphPolicy, "absent", row.label);
    assert.equal(row.configuration.reason, "GP_UNCONFIGURED", row.label);
  }
});

test("A3 journey record: carries the qa/README fields, certified false, and regenerates byte-identical to the committed record", async () => {
  for (const key of ["producerVersion", "subjectBasis", "claimsEstablished", "claimsUnestablished", "injectedFailure", "overheadMicro", "certified"]) {
    assert.ok(key in record, `record carries ${key}`);
  }
  assert.equal(record.certified, false);
  assert.equal(record.mode, "fixture");
  assert.equal(record.evidenceGrade, "FIXTURE");
  assert.match(record.producerVersion, /^\d+\.\d+\.\d+$/);
  assert.equal(record.overheadMicro.kind, "injected");
  assert.ok(record.claimsEstablished.length > 0 && record.claimsUnestablished.length > 0);
  assert.ok(record.claimsUnestablished.some(claim => /live|native|rollout/i.test(claim)), "the record names what it does not establish");
  assert.equal(journeyBytes(await buildJourneyRecord()), journeyBytes(record), "regenerating twice is byte-identical");
  assert.equal(readFileSync(join(root, JOURNEY_RECORD_FILE), "utf8"), journeyBytes(record), "the committed record is the regenerated record (run: node qa/integration/graph-policy-host.journey.ts --write)");
  assert.equal(record.bodyDigest, built.module.digest(Object.fromEntries(Object.entries(record).filter(([key]) => key !== "bodyDigest"))), "the body digest re-verifies");
});

test("A4 negative control: throwing, over-budget, abstaining and malformed clients each yield the fallback with the named GP_* reason and leave finalHash equal to the unconfigured run", () => {
  const byDouble = new Map(record.injectedFailure.doubles.map(row => [row.double, row]));
  assert.deepEqual([...byDouble.keys()].sort(), ["abstain", "budget-exhausted", "malformed-body", "throws"]);
  const expected = { throws: "GP_UNAVAILABLE", "budget-exhausted": "GP_BUDGET_EXHAUSTED", abstain: "GP_ABSTAIN", "malformed-body": "GP_RESPONSE_MALFORMED" } as const;
  for (const [double, reason] of Object.entries(expected)) {
    const row = byDouble.get(double);
    assert.ok(row, double);
    assert.deepEqual(row.reasons, [reason], `${double}: every consulted step names ${reason}`);
    assert.equal(row.fallbackTraceLines, row.steps, `${double}: exactly one gp-fallback line per consulted step`);
    assert.equal(row.finalHash, record.injectedFailure.unconfiguredFinalHash, `${double}: episode equals the unconfigured run`);
  }
});

test("A4 second control: the committed fixture digests re-verify unchanged through the built package, and a tampered copy is refused", () => {
  const landingBytes = readFileSync(join(root, "qa/integration/python-consumer/fixtures/landing-queue-seed7.json"), "utf8");
  const verticalBytes = readFileSync(join(root, "qa/integration/python-consumer/fixtures/vertical-cut-seed7.json"), "utf8");
  assert.deepEqual(verifyFixtureBytes(built.module, "landing-queue-seed7", landingBytes), { ok: true, reason: "REGENERATED_BYTES_EQUAL" });
  assert.deepEqual(verifyFixtureBytes(built.module, "vertical-cut-seed7", verticalBytes), { ok: true, reason: "REGENERATED_BYTES_EQUAL" });
  assert.equal(verifyFixtureBytes(built.module, "landing-queue-seed7", landingBytes.replace("head-1", "head-X")).ok, false, "mutant: altered landing bytes refused");
  assert.equal(verifyFixtureBytes(built.module, "vertical-cut-seed7", verticalBytes.slice(0, -2)).ok, false, "mutant: truncated vertical-cut bytes refused");
  assert.equal(record.fixtureReverify.landingQueueSeed7, "REGENERATED_BYTES_EQUAL");
  assert.equal(record.fixtureReverify.verticalCutSeed7, "REGENERATED_BYTES_EQUAL");
});

test("A5 no rollout surface invented: the journey reads no environment and adds no runtime enable flag", () => {
  const text = [JOURNEY_FILE, "qa/integration/graph-policy-host.journey.ts"].map(file => readFileSync(join(root, file), "utf8")).join("\n");
  assert.doesNotMatch(text, new RegExp(`process\\.${"env"}`), "no environment read");
  assert.doesNotMatch(text, /\b(?:enable|rollout|canary)[A-Za-z]*\s*[:=]\s*(?:true|false)\b/i, "no rollout switch");
  assert.equal(record.claimsEstablished.some(claim => /rollout (?:is )?(?:ready|safe|enabled)/i.test(claim)), false, "the record claims no rollout readiness");
});
