import test from "node:test";
import assert from "node:assert/strict";
import {
  checkStatusPromotion,
  classifyChangedFile,
  recordBackendRefusal,
  STATUS_LABELS,
  type StatusPromotionChange,
} from "../dist/index.js";

const full = (over: Partial<StatusPromotionChange>): StatusPromotionChange => ({
  requirementId: "APO-014",
  transition: { from: "TARGET", to: "CURRENT" },
  files: [
    "packages/coordination/src/rewrite-classification.ts",
    "packages/coordination/test/rewrite-classification.test.ts",
    "docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md",
  ],
  ledgerRow: { requirementId: "APO-014", to: "CURRENT" },
  ...over,
});

test("a complete promotion carrying source, tests and the ledger row together passes", () => {
  const r = checkStatusPromotion(full({}));
  assert.equal(r.ok, true);
  assert.deepEqual(r.refusals, []);
  assert.equal(r.kinds.source, 1);
  assert.equal(r.kinds.test, 1);
  assert.equal(r.kinds.ledger, 1);
});

test("a documentation-only change satisfies no TARGET gate", () => {
  const r = checkStatusPromotion(full({ files: ["docs/10-current-state-and-gaps.md", "docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md"] }));
  assert.equal(r.ok, false);
  assert.ok(r.refusals.some((x) => x.code === "PROMOTION_DOCS_ONLY"));
});

test("missing source or missing tests each refuse by name", () => {
  const noSource = checkStatusPromotion(full({ files: ["packages/coordination/test/rewrite-classification.test.ts", "docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md"] }));
  assert.equal(noSource.ok, false);
  assert.ok(noSource.refusals.some((x) => x.code === "PROMOTION_SOURCE_MISSING"));
  const noTest = checkStatusPromotion(full({ files: ["packages/coordination/src/rewrite-classification.ts", "docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md"] }));
  assert.equal(noTest.ok, false);
  assert.ok(noTest.refusals.some((x) => x.code === "PROMOTION_TEST_MISSING"));
});

test("an untouched ledger or an absent row refuses: the Status row moves in the same change", () => {
  const noLedgerFile = checkStatusPromotion(full({ files: ["packages/coordination/src/rewrite-classification.ts", "packages/coordination/test/rewrite-classification.test.ts"] }));
  assert.equal(noLedgerFile.ok, false);
  assert.ok(noLedgerFile.refusals.some((x) => x.code === "PROMOTION_LEDGER_ROW_MISSING"));
  const change = full({});
  const { ledgerRow: _dropped, ...rest } = change;
  const noRow = checkStatusPromotion(rest);
  assert.equal(noRow.ok, false);
  assert.ok(noRow.refusals.some((x) => x.code === "PROMOTION_LEDGER_ROW_MISSING"));
});

test("a ledger row for another requirement or another label refuses as a mismatch", () => {
  const wrongId = checkStatusPromotion(full({ ledgerRow: { requirementId: "APO-013", to: "CURRENT" } }));
  assert.equal(wrongId.ok, false);
  assert.ok(wrongId.refusals.some((x) => x.code === "PROMOTION_ROW_MISMATCH"));
  const wrongLabel = checkStatusPromotion(full({ ledgerRow: { requirementId: "APO-014", to: "TARGET" } }));
  assert.equal(wrongLabel.ok, false);
  assert.ok(wrongLabel.refusals.some((x) => x.code === "PROMOTION_ROW_MISMATCH"));
});

test("unknown labels and a non-transition refuse", () => {
  const unknown = checkStatusPromotion(full({ transition: { from: "TARGET", to: "SHIPPED" } }));
  assert.equal(unknown.ok, false);
  assert.ok(unknown.refusals.some((x) => x.code === "PROMOTION_STATUS_UNKNOWN"));
  const still = checkStatusPromotion(full({ transition: { from: "TARGET", to: "TARGET" }, ledgerRow: { requirementId: "APO-014", to: "TARGET" } }));
  assert.equal(still.ok, false);
  assert.ok(still.refusals.some((x) => x.code === "PROMOTION_NOT_A_TRANSITION"));
  assert.deepEqual([...STATUS_LABELS], ["CURRENT", "TARGET", "INTEGRATION"]);
});

test("file classification is pure and tests never read as source", () => {
  assert.equal(classifyChangedFile("packages/coordination/src/episode.ts"), "source");
  assert.equal(classifyChangedFile("packages/coordination/test/episode.test.ts"), "test");
  assert.equal(classifyChangedFile("qa/integration/python-consumer/test_consume.py"), "test");
  assert.equal(classifyChangedFile("docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md"), "ledger");
  assert.equal(classifyChangedFile("docs/10-current-state-and-gaps.md"), "docs");
  assert.equal(classifyChangedFile("scripts/check-tap-plan.ts"), "other");
});

test("a missing backend feature records a refusal, never a semantics-changing fallback", () => {
  const recorded = recordBackendRefusal({ requirementId: "APO-021", missingFeature: "installed MicroPolicy SDK lacks decision receipts" });
  assert.equal(recorded.kind, "recorded");
  if (recorded.kind === "recorded") {
    assert.equal(recorded.record.schema, "mw.backend-refusal.v0");
    assert.equal(recorded.record.disposition, "refused-not-faked");
  }
  const faked = recordBackendRefusal({ requirementId: "APO-021", missingFeature: "receipts", fallback: "synthesize a receipt from the episode log" });
  assert.equal(faked.kind, "refused");
  if (faked.kind === "refused") assert.equal(faked.code, "PROMOTION_FALLBACK_FORBIDDEN");
  const blank = recordBackendRefusal({ requirementId: "APO-021", missingFeature: "   " });
  assert.equal(blank.kind, "refused");
});

test("a blank missingFeature refuses with PROMOTION_FEATURE_UNNAMED, never a ledger-row or fallback code", () => {
  for (const missingFeature of ["", "   ", "\t\n "]) {
    const blank = recordBackendRefusal({ requirementId: "APO-021", missingFeature });
    assert.equal(blank.kind, "refused");
    if (blank.kind === "refused") {
      assert.equal(blank.code, "PROMOTION_FEATURE_UNNAMED");
      assert.equal(blank.detail, "a backend refusal names the missing feature");
    }
  }
  const faked = recordBackendRefusal({ requirementId: "APO-021", missingFeature: "", fallback: "synthesize a receipt" });
  assert.equal(faked.kind === "refused" ? faked.code : "recorded", "PROMOTION_FALLBACK_FORBIDDEN");
});

test("PROMOTION_LEDGER_ROW_MISSING stays the checkStatusPromotion ledger-row refusal alone", () => {
  const { ledgerRow: _dropped, ...rest } = full({});
  const noRow = checkStatusPromotion(rest);
  assert.ok(noRow.refusals.some((x) => x.code === "PROMOTION_LEDGER_ROW_MISSING"));
  assert.ok(!noRow.refusals.some((x) => x.code === "PROMOTION_FEATURE_UNNAMED"));
});

test("the status label list is frozen, so no caller can widen the vocabulary", () => {
  assert.equal(Object.isFrozen(STATUS_LABELS), true);
});

test("the test directory leg classifies a helper without the .test.ts suffix as a test", () => {
  assert.equal(classifyChangedFile("packages/x/test/helpers.ts"), "test");
});

test("the .test.ts suffix leg classifies a colocated source-tree test outside a test directory as a test", () => {
  assert.equal(classifyChangedFile("packages/x/src/y.test.ts"), "test");
});

test("kind counts accumulate above one per kind", () => {
  const r = checkStatusPromotion(full({
    files: [
      "packages/coordination/src/a.ts",
      "packages/coordination/src/b.ts",
      "packages/coordination/test/a.test.ts",
      "packages/coordination/test/b.test.ts",
      "docs/programs/adaptive-policy-organizations-2026-10-18/02-atomic-requirements.md",
    ],
  }));
  assert.equal(r.kinds.source, 2);
  assert.equal(r.kinds.test, 2);
  assert.equal(r.kinds.ledger, 1);
  assert.equal(r.kinds.docs, 0);
  assert.equal(r.kinds.other, 0);
});

test("an unknown from label refuses on the from edge alone", () => {
  const r = checkStatusPromotion(full({ transition: { from: "SHIPPED", to: "CURRENT" } }));
  assert.equal(r.ok, false);
  const unknown = r.refusals.filter((x) => x.code === "PROMOTION_STATUS_UNKNOWN");
  assert.equal(unknown.length, 1);
  assert.ok(unknown[0]?.detail.startsWith("transition.from SHIPPED"));
});

test("the check record names its schema and echoes the requirement id", () => {
  const r = checkStatusPromotion(full({}));
  assert.equal(r.schema, "mw.status-promotion.v0");
  assert.equal(r.requirementId, "APO-014");
});

test("a recorded backend refusal echoes the requirement id and the missing feature exactly", () => {
  const recorded = recordBackendRefusal({ requirementId: "APO-021", missingFeature: "installed MicroPolicy SDK lacks decision receipts" });
  assert.equal(recorded.kind, "recorded");
  if (recorded.kind === "recorded") {
    assert.equal(recorded.record.requirementId, "APO-021");
    assert.equal(recorded.record.missingFeature, "installed MicroPolicy SDK lacks decision receipts");
  }
});
