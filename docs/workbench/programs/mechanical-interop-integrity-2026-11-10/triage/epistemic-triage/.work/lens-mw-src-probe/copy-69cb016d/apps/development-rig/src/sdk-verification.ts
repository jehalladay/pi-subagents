/**
 * APO-021 MicroPolicy SDK verification against the installed CLI
 * (02 APO-021, INTEGRATION; carried by de56.3).
 *
 * The decision-receipt contract is pinned (micropolicy.decision-receipt.v1 field groups per
 * APO-EAT-R008); this module judges a parsed receipt against that pin, refusing drift in
 * EITHER direction and the pinned negative (no raw pre-softmax score vector). Behavior
 * verification runs only against the INSTALLED SDK under an explicit opt-in: without the
 * flag or the binary the record is UNKNOWN, never a pass. The judge is pure; invoking the
 * binary belongs to the test harness.
 */

export const MP_RECEIPT_SCHEMA = "micropolicy.decision-receipt.v1";

export const MP_RECEIPT_FIELD_GROUPS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  receipt: Object.freeze(["schema", "decisionId", "backend", "programDigest", "checkpointDigest", "selection"]),
  selection: Object.freeze(["choices", "action", "rng", "probability", "logProbability"]),
  choice: Object.freeze(["action", "eligible", "probability"]),
  rng: Object.freeze(["algorithm", "seed", "draw"]),
});

export const MP_BEHAVIOR_PROBES: readonly string[] = Object.freeze([
  "deterministic-seeded-sampling",
  "behavior-log-prob",
  "eligible-support",
]);

export type SdkRefusalCode =
  | "SDK_RECEIPT_SCHEMA_WRONG"
  | "SDK_RECEIPT_FIELD_MISSING"
  | "SDK_RECEIPT_EXTRA_FIELD"
  | "SDK_RAW_SCORES_PRESENT"
  | "SDK_PROBABILITY_INVALID"
  | "SDK_PROBE_MISSING"
  | "SDK_PROBE_FAILED";

export interface SdkRefusal {
  readonly code: SdkRefusalCode;
  readonly detail: string;
}

export interface SdkUnknownRecord {
  readonly state: "unknown";
  readonly reason: "SDK_VERIFICATION_NOT_ENABLED" | "MP_SDK_ABSENT";
}

export type SdkPreconditions = { readonly run: true } | { readonly run: false; readonly record: SdkUnknownRecord };

/** Behavior legs run only with the opt-in AND the installed binary; otherwise UNKNOWN, never a pass. */
export function sdkVerificationPreconditions(env: Readonly<Record<string, string | undefined>>, binaryFound: boolean): SdkPreconditions {
  if (env["MW_LIVE_MP_SDK"] !== "1") return Object.freeze({ run: false, record: Object.freeze({ state: "unknown", reason: "SDK_VERIFICATION_NOT_ENABLED" }) }) as SdkPreconditions;
  if (!binaryFound) return Object.freeze({ run: false, record: Object.freeze({ state: "unknown", reason: "MP_SDK_ABSENT" }) }) as SdkPreconditions;
  return Object.freeze({ run: true });
}

export interface SdkReceiptJudgement {
  readonly ok: boolean;
  readonly refusals: readonly SdkRefusal[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function judgeGroup(group: string, value: unknown, refusals: SdkRefusal[]): void {
  const pinned = MP_RECEIPT_FIELD_GROUPS[group]!;
  if (!isRecord(value)) {
    refusals.push({ code: "SDK_RECEIPT_FIELD_MISSING", detail: `${group} is not an object` });
    return;
  }
  for (const field of pinned) {
    if (!(field in value)) refusals.push({ code: "SDK_RECEIPT_FIELD_MISSING", detail: `${group}.${field} is missing from the installed receipt` });
  }
  for (const key of Object.keys(value)) {
    if (!pinned.includes(key)) refusals.push({ code: "SDK_RECEIPT_EXTRA_FIELD", detail: `${group}.${key} is not in the R008 pin; drift is drift in either direction` });
  }
}

/** Judge one parsed decision receipt against the R008 pin, including the pinned negative. */
export function judgeSdkReceipt(parsed: unknown): SdkReceiptJudgement {
  const refusals: SdkRefusal[] = [];
  if (!isRecord(parsed)) {
    return Object.freeze({ ok: false, refusals: Object.freeze([Object.freeze({ code: "SDK_RECEIPT_SCHEMA_WRONG" as const, detail: "the receipt is not an object" })]) });
  }
  if (parsed["schema"] !== MP_RECEIPT_SCHEMA) {
    refusals.push({ code: "SDK_RECEIPT_SCHEMA_WRONG", detail: `schema ${String(parsed["schema"])} is not the pinned ${MP_RECEIPT_SCHEMA}` });
  }
  judgeGroup("receipt", parsed, refusals);
  const selection = parsed["selection"];
  if (isRecord(selection)) {
    judgeGroup("selection", selection, refusals);
    if ("rawScores" in selection || "scores" in selection) {
      refusals.push({ code: "SDK_RAW_SCORES_PRESENT", detail: "decision-receipt.v1 records no raw pre-softmax score vector; its presence is contract drift" });
    }
    const probability = selection["probability"];
    if (typeof probability !== "number" || !Number.isFinite(probability) || probability <= 0 || probability > 1) {
      refusals.push({ code: "SDK_PROBABILITY_INVALID", detail: "selection.probability must be a finite number in (0, 1]" });
    }
    const rng = selection["rng"];
    if (isRecord(rng)) judgeGroup("rng", rng, refusals);
    const choices = selection["choices"];
    if (Array.isArray(choices)) for (const choice of choices) judgeGroup("choice", choice, refusals);
  }
  return Object.freeze({ ok: refusals.length === 0, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}

export interface ProbeResult {
  readonly probe: string;
  readonly passed: boolean;
  readonly detail: string;
}

export interface SdkVerificationRecord {
  readonly schema: "mw.sdk-verification.v0";
  readonly state: "verified" | "failed" | "unknown";
  readonly reason?: string;
  readonly refusals: readonly SdkRefusal[];
}

/** Compose the verification record: UNKNOWN when not run, refusing a missing pinned probe. */
export function recordSdkVerification(preconditions: SdkPreconditions, probeResults: readonly ProbeResult[]): SdkVerificationRecord {
  if (!preconditions.run) {
    return Object.freeze({ schema: "mw.sdk-verification.v0", state: "unknown", reason: preconditions.record.reason, refusals: Object.freeze([]) });
  }
  const refusals: SdkRefusal[] = [];
  const seen = new Set(probeResults.map((r) => r.probe));
  for (const probe of MP_BEHAVIOR_PROBES) {
    if (!seen.has(probe)) refusals.push({ code: "SDK_PROBE_MISSING", detail: `pinned behavior probe ${probe} was not run` });
  }
  for (const result of probeResults) {
    if (!result.passed) refusals.push({ code: "SDK_PROBE_FAILED", detail: `${result.probe}: ${result.detail}` });
  }
  return Object.freeze({
    schema: "mw.sdk-verification.v0",
    state: refusals.length === 0 ? "verified" : "failed",
    refusals: Object.freeze(refusals.map((r) => Object.freeze(r))),
  });
}
