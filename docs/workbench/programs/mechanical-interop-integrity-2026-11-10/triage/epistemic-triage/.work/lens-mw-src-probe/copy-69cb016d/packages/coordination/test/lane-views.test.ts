import { strict as assert } from "node:assert";
import { test } from "node:test";
import { LANE_VIEW_FIELDS, UNKNOWN, projectLaneView } from "../dist/index.js";
import type { LaneConsumer, LaneObservation } from "../dist/index.js";

const obs = (overrides: Partial<LaneObservation> = {}): LaneObservation => ({
  laneId: "lane:7",
  revision: "rev:42",
  occupancy: "busy",
  holder: "actor:a",
  commitment: { decisionId: "d:9", receiptRef: "receipt:forge:cmd_1" },
  release: { kind: "native", deadline: "2026-10-20T20:00:00Z" },
  ...overrides,
});
const view = (o: LaneObservation, consumer: LaneConsumer) => {
  const out = projectLaneView(o, consumer);
  assert.equal(out.kind, "view", JSON.stringify(out));
  return out.kind === "view" ? out.view : (undefined as never);
};
const admission = (o: LaneObservation) => { const v = view(o, "admission"); assert.equal(v.kind, "admission"); return v.kind === "admission" ? v : (undefined as never); };
const refusal = (o: LaneObservation, consumer: LaneConsumer | string) => {
  const out = projectLaneView(o, consumer as LaneConsumer);
  assert.equal(out.kind, "refused", JSON.stringify(out));
  return out.kind === "refused" ? out : (undefined as never);
};

test("three consumers, three views, no universal interface: each view carries exactly its declared fields plus the shared lane id and exact revision", () => {
  assert.deepEqual(Object.keys(LANE_VIEW_FIELDS).sort(), ["admission", "planning", "recovery"]);
  for (const consumer of ["admission", "planning", "recovery"] as const) {
    const v = view(obs(), consumer);
    assert.deepEqual(Object.keys(v).sort(), [...LANE_VIEW_FIELDS[consumer]].sort(), consumer);
    assert.equal(v.laneId, "lane:7");
    assert.equal(v.revision, "rev:42");
    assert.equal(v.schema, `mw.lane-view.${consumer}.v0`);
  }
  assert.ok(!("commitment" in view(obs(), "admission")), "admission does not see the commitment");
  assert.ok(!("release" in view(obs(), "recovery")), "recovery does not see the release forecast");
  assert.ok(!("available" in view(obs(), "planning")), "planning does not see the admission boolean");
});

test("acceptance: the three-state lane oracle — admission sees free as available, reserved and busy as unavailable, and an unknown occupancy as unknown, never as either", () => {
  assert.equal(admission(obs({ occupancy: "free" })).available, true);
  assert.equal(admission(obs({ occupancy: "reserved" })).available, false);
  assert.equal(admission(obs({ occupancy: "busy" })).available, false);
  assert.equal(admission(obs({ occupancy: UNKNOWN })).available, UNKNOWN);
  const counterexample = ["free", "reserved", "busy", UNKNOWN].map(occupancy => admission(obs({ occupancy: occupancy as LaneObservation["occupancy"] })).available);
  assert.deepEqual(counterexample, [true, false, false, UNKNOWN], "a two-state oracle (free vs not) would collapse reserved into one of the others; this one keeps three");
});

test("planning keeps the phase distinct (reserved is not busy) and reports a native release deadline as exact", () => {
  const reserved = view(obs({ occupancy: "reserved" }), "planning");
  assert.equal(reserved.kind, "planning");
  if (reserved.kind !== "planning") return;
  assert.equal(reserved.phase, "reserved");
  assert.deepEqual(reserved.release, { kind: "native", deadline: "2026-10-20T20:00:00Z" });
  const busy = view(obs({ occupancy: "busy" }), "planning");
  if (busy.kind !== "planning") return;
  assert.equal(busy.phase, "busy");
});

test("uncertain values stay uncertain: a learned release forecast is advisory and certifies nothing; a missing forecast is unknown; an unknown phase stays unknown", () => {
  const learned = view(obs({ release: { kind: "learned", source: "mp:forecaster@3", distribution: [{ atOrBefore: "2026-10-20T19:30:00Z", mass: 0.6 }, { atOrBefore: "2026-10-20T20:00:00Z", mass: 0.3 }] } }), "planning");
  if (learned.kind !== "planning") return;
  assert.equal(learned.release !== UNKNOWN && learned.release.kind, "advisory");
  if (learned.release === UNKNOWN || learned.release.kind !== "advisory") return;
  assert.equal(learned.release.certifies, false);
  assert.equal(learned.release.source, "mp:forecaster@3");
  assert.deepEqual(learned.release.distribution.map(d => d.mass), [0.6, 0.3]);
  const { release: _dropped, ...noForecast } = obs();
  const none = view(noForecast, "planning");
  if (none.kind !== "planning") return;
  assert.equal(none.release, UNKNOWN);
  const unknownPhase = view(obs({ occupancy: UNKNOWN }), "planning");
  if (unknownPhase.kind !== "planning") return;
  assert.equal(unknownPhase.phase, UNKNOWN);
});

test("recovery sees commitment and receipt identity, and an occupied lane without a commitment is unknown rather than fabricated", () => {
  const committed = view(obs(), "recovery");
  if (committed.kind !== "recovery") return;
  assert.deepEqual(committed.commitment, { decisionId: "d:9", receiptRef: "receipt:forge:cmd_1" });
  const { commitment: _dropped, ...uncommitted } = obs();
  const unknown = view(uncommitted, "recovery");
  if (unknown.kind !== "recovery") return;
  assert.equal(unknown.commitment, UNKNOWN);
  const free = view({ ...uncommitted, occupancy: "free" }, "recovery");
  if (free.kind !== "recovery") return;
  assert.equal(free.commitment, UNKNOWN, "a free lane has no commitment to report; unknown, not an empty one");
});

test("an exact view needs an exact revision; an unknown consumer, a forecast claiming to certify, or a distribution with mass above one is refused", () => {
  assert.equal(refusal(obs({ revision: "" }), "admission").code, "LANE_VIEW_REVISION_MISSING");
  assert.equal(refusal(obs({ revision: "   " }), "planning").code, "LANE_VIEW_REVISION_MISSING");
  assert.equal(refusal(obs(), "dashboard").code, "LANE_VIEW_CONSUMER_UNKNOWN");
  const certifying = { kind: "learned" as const, source: "mp:f", distribution: [{ atOrBefore: "t", mass: 0.5 }], certifies: true as unknown as false };
  assert.equal(refusal(obs({ release: certifying }), "planning").code, "LANE_VIEW_FORECAST_CERTIFIES");
  const overfull = { kind: "learned" as const, source: "mp:f", distribution: [{ atOrBefore: "t1", mass: 0.7 }, { atOrBefore: "t2", mass: 0.6 }] };
  assert.equal(refusal(obs({ release: overfull }), "planning").code, "LANE_VIEW_DISTRIBUTION_INVALID");
  const negative = { kind: "learned" as const, source: "mp:f", distribution: [{ atOrBefore: "t1", mass: -0.1 }] };
  assert.equal(refusal(obs({ release: negative }), "planning").code, "LANE_VIEW_DISTRIBUTION_INVALID");
  assert.equal(admission(obs({ release: overfull })).available, false, "a consumer that does not read the forecast is not refused by it");
});

test("the views are pure records: every string leaf is an input leaf, the unknown sentinel, a consumer word or a schema", () => {
  const input = obs({ release: { kind: "learned", source: "mp:f", distribution: [{ atOrBefore: "t1", mass: 0.5 }] } });
  const known = new Set<string>([...stringLeaves(input), UNKNOWN, "admission", "planning", "recovery", "native", "advisory", "mw.lane-view.admission.v0", "mw.lane-view.planning.v0", "mw.lane-view.recovery.v0"]);
  for (const consumer of ["admission", "planning", "recovery"] as const) {
    for (const leaf of stringLeaves(view(input, consumer))) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
  }
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

// nq4g: pins for ten lane-view laws that survived mutation at the landed 3l61.5 tree. Each test names its mutant.
const learnedWith = (masses: readonly number[]): NonNullable<LaneObservation["release"]> =>
  ({ kind: "learned" as const, source: "mp:f", distribution: masses.map((mass, i) => ({ atOrBefore: `t${i}`, mass })) });
const planningRelease = (o: LaneObservation) => {
  const v = view(o, "planning");
  assert.equal(v.kind, "planning");
  return v.kind === "planning" ? v.release : (undefined as never);
};

test("S6_RECOVERY_KIND_MISLABELED: every consumer's view carries its own kind word, including a recovery view with and without a commitment", () => {
  for (const consumer of ["admission", "planning", "recovery"] as const) {
    assert.equal(view(obs(), consumer).kind, consumer, consumer);
  }
  const { commitment: _dropped, ...uncommitted } = obs();
  assert.equal(view(uncommitted, "recovery").kind, "recovery", "an unknown commitment still projects a recovery view");
  assert.equal(view(obs({ occupancy: UNKNOWN }), "recovery").kind, "recovery");
});

test("S1_MASS_NONFINITE_ALLOWED: an infinite release mass refuses at the per-mass check, naming the mass, not only through the total", () => {
  const out = refusal(obs({ release: learnedWith([Infinity]) }), "planning");
  assert.equal(out.code, "LANE_VIEW_DISTRIBUTION_INVALID");
  assert.match(out.detail, /release mass at t0 is Infinity; masses are finite and non-negative/);
});

test("S4_MASS_ZERO_REFUSED: a zero mass beside valid masses yields an advisory view, not a refusal", () => {
  const release = planningRelease(obs({ release: learnedWith([0, 0.5]) }));
  assert.notEqual(release, UNKNOWN);
  if (release === UNKNOWN) return;
  assert.equal(release.kind, "advisory");
  if (release.kind !== "advisory") return;
  assert.deepEqual(release.distribution.map(d => d.mass), [0, 0.5]);
  const allZero = planningRelease(obs({ release: learnedWith([0]) }));
  assert.notEqual(allZero, UNKNOWN);
});

test("S2_TOTAL_EPS_STRICT: a total of 1 + 1e-12 (float noise above one) yields a view, and a total of exactly one yields a view", () => {
  for (const masses of [[1], [0.5, 0.5], [1, 1e-12], [0.6, 0.4 + 1e-12]]) {
    const release = planningRelease(obs({ release: learnedWith(masses) }));
    assert.notEqual(release, UNKNOWN, JSON.stringify(masses));
    if (release !== UNKNOWN) assert.equal(release.kind, "advisory", JSON.stringify(masses));
  }
});

test("S3_TOTAL_EPS_WIDE: a total of 1.0005 refuses with the total-mass detail, as does a total just above the tolerance", () => {
  for (const masses of [[1, 0.0005], [0.6, 0.4005], [1, 1e-6]]) {
    const out = refusal(obs({ release: learnedWith(masses) }), "planning");
    assert.equal(out.code, "LANE_VIEW_DISTRIBUTION_INVALID", JSON.stringify(masses));
    assert.match(out.detail, /carries total mass/, JSON.stringify(masses));
  }
});

test("S5_REVISION_SKIPPED_FOR_RECOVERY: a blank revision refuses for the recovery consumer too", () => {
  assert.equal(refusal(obs({ revision: "" }), "recovery").code, "LANE_VIEW_REVISION_MISSING");
  assert.equal(refusal(obs({ revision: "  \t " }), "recovery").code, "LANE_VIEW_REVISION_MISSING");
  assert.equal(refusal(obs({ revision: "" }), "dashboard").code, "LANE_VIEW_REVISION_MISSING", "the revision gate precedes the consumer switch");
});

test("S10_DETAIL_REVISION_UNNAMED: the missing-revision detail names the lane for every consumer", () => {
  for (const consumer of ["admission", "planning", "recovery"] as const) {
    const out = refusal(obs({ revision: "", laneId: "lane:named-77" }), consumer);
    assert.match(out.detail, /lane lane:named-77 was read without an exact revision/, consumer);
  }
});

test("S7_COMMITMENT_PASSTHROUGH: a commitment carrying an extra key projects to exactly decisionId and receiptRef, as a fresh object", () => {
  const input = { decisionId: "d:9", receiptRef: "receipt:forge:cmd_1", secret: "x" } as unknown as NonNullable<LaneObservation["commitment"]>;
  const v = view(obs({ commitment: input }), "recovery");
  if (v.kind !== "recovery") throw new Error("expected recovery view");
  assert.notEqual(v.commitment, UNKNOWN);
  assert.deepEqual(Object.keys(v.commitment as object).sort(), ["decisionId", "receiptRef"]);
  assert.notStrictEqual(v.commitment, input, "the view copies; it never aliases the input commitment");
});

test("S8_NATIVE_PASSTHROUGH: a native release carrying an extra key projects to exactly deadline and kind, as a fresh object", () => {
  const input = { kind: "native", deadline: "2026-10-20T20:00:00Z", extra: 1 } as unknown as NonNullable<LaneObservation["release"]>;
  const release = planningRelease(obs({ release: input }));
  assert.notEqual(release, UNKNOWN);
  assert.deepEqual(Object.keys(release as object).sort(), ["deadline", "kind"]);
  assert.notStrictEqual(release, input, "the view copies; it never aliases the input release");
});

test("S9_FIELDS_NOT_FROZEN: the declared field table and each per-consumer array are frozen", () => {
  assert.ok(Object.isFrozen(LANE_VIEW_FIELDS), "table");
  for (const consumer of ["admission", "planning", "recovery"] as const) {
    assert.ok(Object.isFrozen(LANE_VIEW_FIELDS[consumer]), consumer);
  }
});
