// MechanicalWorkflows-de56.3 (APO-021): the pinned decision-receipt schema and behavior
// verification against the installed MicroPolicy SDK. The schema judge and the field-group
// pin run always, against fixture receipts labeled as fixtures of the CONTRACT; the behavior
// legs are opt-in (MW_LIVE_MP_SDK=1) and the installed binary; absent either, the record is
// UNKNOWN, never a pass. The pin is cross-checked against the D0 baseline so the two pins
// cannot drift apart silently.
import test from "node:test";
import assert from "node:assert/strict";
import {
  MP_BEHAVIOR_PROBES,
  MP_RECEIPT_FIELD_GROUPS,
  MP_RECEIPT_SCHEMA,
  judgeSdkReceipt,
  recordSdkVerification,
  sdkVerificationPreconditions,
} from "../dist/sdk-verification.js";
import { D0_BASELINE } from "@mechanical/workflows-coordination";

const validReceipt = () => ({
  schema: "micropolicy.decision-receipt.v1",
  decisionId: "d-1",
  backend: "m0-categorical",
  programDigest: "pd-1",
  checkpointDigest: "cd-1",
  selection: {
    choices: [{ action: "hold", eligible: true, probability: 0.75 }, { action: "request-lane", eligible: true, probability: 0.25 }],
    action: "hold",
    rng: { algorithm: "lcg32", seed: "7", draw: "0.31" },
    probability: 0.75,
    logProbability: -0.2877,
  },
});

test("the R008 pin matches the D0 baseline pin group for group, and a conforming receipt judges clean", () => {
  assert.equal(MP_RECEIPT_SCHEMA, D0_BASELINE.receiptSchema);
  for (const group of ["receipt", "selection", "choice", "rng"] as const) {
    assert.deepEqual([...MP_RECEIPT_FIELD_GROUPS[group]!], [...D0_BASELINE.receiptFields[group]]);
  }
  const out = judgeSdkReceipt(validReceipt());
  assert.deepEqual(out.refusals, []);
  assert.equal(out.ok, true);
  assert.ok(Object.isFrozen(out));
});

test("negative: a wrong schema, a missing field and an extra field each refuse: drift is drift in either direction", () => {
  const wrong = judgeSdkReceipt({ ...validReceipt(), schema: "micropolicy.decision-receipt.v2" });
  assert.ok(wrong.refusals.some((r) => r.code === "SDK_RECEIPT_SCHEMA_WRONG"));
  const { backend: _b, ...noBackend } = validReceipt();
  void _b;
  const missing = judgeSdkReceipt(noBackend);
  assert.ok(missing.refusals.some((r) => r.code === "SDK_RECEIPT_FIELD_MISSING" && r.detail.includes("receipt.backend")));
  const extra = judgeSdkReceipt({ ...validReceipt(), vendorNote: "x" });
  assert.ok(extra.refusals.some((r) => r.code === "SDK_RECEIPT_EXTRA_FIELD" && r.detail.includes("vendorNote")));
});

test("negative: the pinned negative holds: a raw pre-softmax score vector is contract drift", () => {
  const base = validReceipt();
  const withScores = judgeSdkReceipt({ ...base, selection: { ...base.selection, rawScores: [1.2, -0.3] } });
  assert.ok(withScores.refusals.some((r) => r.code === "SDK_RAW_SCORES_PRESENT"));
  assert.ok(withScores.refusals.some((r) => r.code === "SDK_RECEIPT_EXTRA_FIELD"));
});

test("negative: a probability outside (0,1] or nonfinite refuses", () => {
  const base = validReceipt();
  for (const bad of [0, -0.1, 1.5, Number.NaN]) {
    const out = judgeSdkReceipt({ ...base, selection: { ...base.selection, probability: bad } });
    assert.ok(out.refusals.some((r) => r.code === "SDK_PROBABILITY_INVALID"), `probability ${bad} refused`);
  }
});

test("preconditions: without the opt-in or the binary the record is UNKNOWN, never a pass", () => {
  const off = sdkVerificationPreconditions({}, true);
  assert.equal(off.run, false);
  assert.equal((off as { record: { reason: string } }).record.reason, "SDK_VERIFICATION_NOT_ENABLED");
  const absent = sdkVerificationPreconditions({ MW_LIVE_MP_SDK: "1" }, false);
  assert.equal((absent as { record: { reason: string } }).record.reason, "MP_SDK_ABSENT");
  const unknownRecord = recordSdkVerification(off, []);
  assert.equal(unknownRecord.state, "unknown");
  assert.equal(unknownRecord.reason, "SDK_VERIFICATION_NOT_ENABLED");
  assert.equal(sdkVerificationPreconditions({ MW_LIVE_MP_SDK: "1" }, true).run, true);
});

test("a run verification requires every pinned probe and fails on any failed probe", () => {
  const go = sdkVerificationPreconditions({ MW_LIVE_MP_SDK: "1" }, true);
  const all = MP_BEHAVIOR_PROBES.map((p) => ({ probe: p, passed: true, detail: "ok" }));
  const verified = recordSdkVerification(go, all);
  assert.equal(verified.state, "verified");
  const missing = recordSdkVerification(go, all.slice(1));
  assert.equal(missing.state, "failed");
  assert.ok(missing.refusals.some((r) => r.code === "SDK_PROBE_MISSING" && r.detail.includes("deterministic-seeded-sampling")));
  const failed = recordSdkVerification(go, [{ ...all[0]!, passed: false, detail: "seed replay diverged" }, ...all.slice(1)]);
  assert.equal(failed.state, "failed");
  assert.ok(failed.refusals.some((r) => r.code === "SDK_PROBE_FAILED" && r.detail.includes("seed replay diverged")));
});

test("the live opt-in is the exact flag value 1: an absent, empty, 0, true, yes, leading-space, trailing-space or leading-zero value stays UNKNOWN with SDK_VERIFICATION_NOT_ENABLED", () => {
  for (const value of [undefined, "", "0", "true", "yes", " 1", "1 ", "01"]) {
    const gate = sdkVerificationPreconditions({ MW_LIVE_MP_SDK: value }, true);
    assert.equal(gate.run, false, `flag ${JSON.stringify(value)}`);
    assert.deepEqual((gate as { record: unknown }).record, { state: "unknown", reason: "SDK_VERIFICATION_NOT_ENABLED" });
  }
  assert.equal(sdkVerificationPreconditions({ MW_LIVE_MP_SDK: "1" }, true).run, true);
});

test("the opt-in flag is checked before binary presence: an absent, 0 or malformed flag with no binary is SDK_VERIFICATION_NOT_ENABLED, never MP_SDK_ABSENT", () => {
  for (const value of [undefined, "0", "", "true", "yes", " 1", "1 ", "01"]) {
    const gate = sdkVerificationPreconditions({ MW_LIVE_MP_SDK: value }, false);
    assert.equal(gate.run, false, `flag ${JSON.stringify(value)}`);
    assert.deepEqual((gate as { record: unknown }).record, { state: "unknown", reason: "SDK_VERIFICATION_NOT_ENABLED" });
  }
});
