/**
 * Status-ledger promotion discipline (APO 12, Status promotion; carried by lo6k.3).
 *
 * A requirement's status moves only in ONE change that carries the source, the tests and the
 * 02-atomic-requirements.md ledger row together. A documentation-only change satisfies no
 * TARGET gate. When the backend feature a requirement needs is missing, the honest artifact is
 * a refusal record; a fallback that changes policy semantics is refused outright, never
 * recorded as satisfaction.
 */

export const STATUS_LABELS: readonly string[] = Object.freeze(["CURRENT", "TARGET", "INTEGRATION"]);

export type StatusPromotionRefusalCode =
  | "PROMOTION_STATUS_UNKNOWN"
  | "PROMOTION_NOT_A_TRANSITION"
  | "PROMOTION_DOCS_ONLY"
  | "PROMOTION_SOURCE_MISSING"
  | "PROMOTION_TEST_MISSING"
  | "PROMOTION_LEDGER_ROW_MISSING"
  | "PROMOTION_ROW_MISMATCH"
  | "PROMOTION_FALLBACK_FORBIDDEN"
  | "PROMOTION_FEATURE_UNNAMED";

export type ChangedFileKind = "source" | "test" | "ledger" | "docs" | "other";

/** Pure path classification: tests before source so packages/x/test never reads as source. */
export function classifyChangedFile(path: string): ChangedFileKind {
  if (path.endsWith("02-atomic-requirements.md")) return "ledger";
  if (/(^|\/)(test|tests)\//.test(path) || path.endsWith(".test.ts") || path.startsWith("qa/")) return "test";
  if (/^packages\/[^/]+\/src\/.+\.ts$/.test(path)) return "source";
  if (path.startsWith("docs/")) return "docs";
  return "other";
}

export interface StatusTransition {
  readonly from: string;
  readonly to: string;
}

export interface LedgerRowEdit {
  readonly requirementId: string;
  readonly to: string;
}

export interface StatusPromotionChange {
  readonly requirementId: string;
  readonly transition: StatusTransition;
  readonly files: readonly string[];
  readonly ledgerRow?: LedgerRowEdit;
}

export interface StatusPromotionCheck {
  readonly schema: "mw.status-promotion.v0";
  readonly requirementId: string;
  readonly ok: boolean;
  readonly kinds: Readonly<Record<ChangedFileKind, number>>;
  readonly refusals: ReadonlyArray<{ readonly code: StatusPromotionRefusalCode; readonly detail: string }>;
}

export function checkStatusPromotion(change: StatusPromotionChange): StatusPromotionCheck {
  const refusals: Array<{ code: StatusPromotionRefusalCode; detail: string }> = [];
  const kinds: Record<ChangedFileKind, number> = { source: 0, test: 0, ledger: 0, docs: 0, other: 0 };
  for (const file of change.files) kinds[classifyChangedFile(file)] += 1;
  for (const [edge, label] of [["from", change.transition.from], ["to", change.transition.to]] as const) {
    if (!STATUS_LABELS.includes(label)) refusals.push({ code: "PROMOTION_STATUS_UNKNOWN", detail: `transition.${edge} ${label} is outside CURRENT/TARGET/INTEGRATION` });
  }
  if (change.transition.from === change.transition.to) {
    refusals.push({ code: "PROMOTION_NOT_A_TRANSITION", detail: `from and to are both ${change.transition.to}; a promotion moves the label` });
  }
  if (kinds.source === 0 && kinds.test === 0) {
    refusals.push({ code: "PROMOTION_DOCS_ONLY", detail: "the change carries no source and no tests; documentation alone satisfies no TARGET gate" });
  } else {
    if (kinds.source === 0) refusals.push({ code: "PROMOTION_SOURCE_MISSING", detail: "a status promotion carries its source change in the same change" });
    if (kinds.test === 0) refusals.push({ code: "PROMOTION_TEST_MISSING", detail: "a status promotion carries its tests in the same change" });
  }
  const row = change.ledgerRow;
  if (kinds.ledger === 0 || row === undefined) {
    refusals.push({ code: "PROMOTION_LEDGER_ROW_MISSING", detail: "the 02-atomic-requirements.md Status row moves in the same change, or the promotion did not happen" });
  } else {
    if (row.requirementId !== change.requirementId) refusals.push({ code: "PROMOTION_ROW_MISMATCH", detail: `ledger row edits ${row.requirementId}, not ${change.requirementId}` });
    if (row.to !== change.transition.to) refusals.push({ code: "PROMOTION_ROW_MISMATCH", detail: `ledger row moves to ${row.to}, not the declared ${change.transition.to}` });
  }
  return { schema: "mw.status-promotion.v0", requirementId: change.requirementId, ok: refusals.length === 0, kinds, refusals };
}

export interface BackendRefusalInput {
  readonly requirementId: string;
  readonly missingFeature: string;
  /** A proposed stand-in that changes policy semantics; its presence refuses the record. */
  readonly fallback?: string;
}

export type BackendRefusalOutcome =
  | { readonly kind: "recorded"; readonly record: { readonly schema: "mw.backend-refusal.v0"; readonly requirementId: string; readonly missingFeature: string; readonly disposition: "refused-not-faked" } }
  | { readonly kind: "refused"; readonly code: StatusPromotionRefusalCode; readonly detail: string };

export function recordBackendRefusal(input: BackendRefusalInput): BackendRefusalOutcome {
  if (input.fallback !== undefined) {
    return { kind: "refused", code: "PROMOTION_FALLBACK_FORBIDDEN", detail: `a fallback (${input.fallback}) would change policy semantics; record the refusal instead` };
  }
  if (input.missingFeature.trim() === "") {
    return { kind: "refused", code: "PROMOTION_FEATURE_UNNAMED", detail: "a backend refusal names the missing feature" };
  }
  return { kind: "recorded", record: { schema: "mw.backend-refusal.v0", requirementId: input.requirementId, missingFeature: input.missingFeature, disposition: "refused-not-faked" } };
}
