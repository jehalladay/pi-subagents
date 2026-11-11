/**
 * Three-valued report derived from MW's shipped four-valued vocabularies. Only `passed`, or an
 * `established` stage that carries a complete native ref, reaches PASS; the raw value always stays
 * beside the derived one. This is a reporting view, not authority: it mints no identifier and
 * never upgrades `partial`, `unknown`, `observed` or `not_run`. A foreign string maps to UNKNOWN.
 */
import type { VerificationResult } from "@mechanical/workflows-development";
import type { ReceiptRef, ReceiptState } from "./receipt.js";

export type ReportVerdict = "PASS" | "FAIL" | "UNKNOWN";
export interface ObligationReport<Raw extends string> { readonly report: ReportVerdict; readonly raw: Raw }

type Verdict = VerificationResult["verdict"];

/** Records are keyed by every shipped value, so a fifth vocabulary value fails compilation here. */
const VERDICT_REPORT: Readonly<Record<Verdict, ReportVerdict>> = {
  passed: "PASS",
  failed: "FAIL",
  partial: "UNKNOWN",
  unknown: "UNKNOWN",
};

/** Whether a stage state may reach PASS at all; `established` still needs a native ref on top. */
const STATE_CAN_PASS: Readonly<Record<ReceiptState, boolean>> = {
  established: true,
  observed: false,
  unknown: false,
  not_run: false,
};

function ownEntry<Value>(table: Readonly<Record<string, Value>>, key: string): Value | undefined {
  return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : undefined;
}

function hasNativeRef(ref: ReceiptRef | undefined): boolean {
  if (ref === undefined) return false;
  return [ref.system, ref.kind, ref.id].every((part) => typeof part === "string" && part.trim().length > 0);
}

export function reportVerdict(verdict: Verdict): ObligationReport<Verdict> {
  return { report: ownEntry(VERDICT_REPORT, verdict) ?? "UNKNOWN", raw: verdict };
}

export function reportStage(state: ReceiptState, ref?: ReceiptRef): ObligationReport<ReceiptState> {
  const canPass = ownEntry(STATE_CAN_PASS, state) === true;
  return { report: canPass && hasNativeRef(ref) ? "PASS" : "UNKNOWN", raw: state };
}

export function mapVerdict(verdict: Verdict): ReportVerdict {
  return reportVerdict(verdict).report;
}

export function mapStage(state: ReceiptState, ref?: ReceiptRef): ReportVerdict {
  return reportStage(state, ref).report;
}
