// MechanicalWorkflows-de56.4 (APO-022): native authorities answer independently, proven by
// scratch receipts. Forge receipts are already witnessed live by the landing/inheritance
// journeys; this suite pins the independence judgement itself and the honest unknown for the
// unseamed Reactive authority. Fixture receipts here exercise the JUDGE; they are labeled
// fixture evidence of the rule, not live witnesses of the authorities.
import test from "node:test";
import assert from "node:assert/strict";
import { judgeAuthorityIndependence, unseamedAuthorityRecord, AUTHORITY_SYSTEMS, UNSEAMED_AUTHORITIES } from "../dist/authority-independence.js";
import type { NativeReceipt } from "../dist/live-observation.js";

const receipt = (system: NativeReceipt["system"], op: string, extra?: Partial<NativeReceipt>): NativeReceipt => ({
  system,
  ids: { operationId: op, commandId: `cmd-${op}` },
  raw: { note: `scratch ${system}` },
  rawDigest: `digest-${op}`,
  ...extra,
});

const fullSet = (): NativeReceipt[] => [
  receipt("forge", "op-f1"),
  receipt("beads", "op-b1"),
  receipt("furnace", "op-u1"),
  receipt("hx", "op-h1"),
];

test("four seamed authorities witnessed by disjoint-id receipts judge independent, with reactive an explicit unknown", () => {
  assert.deepEqual([...AUTHORITY_SYSTEMS], ["forge", "beads", "furnace", "hx"]);
  const out = judgeAuthorityIndependence(fullSet());
  assert.equal(out.ok, true);
  assert.equal(out.witnessedBySystem["forge"], 1);
  assert.equal(out.witnessedBySystem["hx"], 1);
  assert.deepEqual([...UNSEAMED_AUTHORITIES], ["reactive"]);
  assert.equal(out.unseamed[0]!.state, "unknown");
  assert.equal(out.unseamed[0]!.reason, "NO_NATIVE_SEAM");
  assert.ok(Object.isFrozen(out) && Object.isFrozen(out.witnessedBySystem) && Object.isFrozen(out.unseamed));
});

test("negative: an unwitnessed authority refuses by name: unwitnessed is not independent", () => {
  const out = judgeAuthorityIndependence(fullSet().filter((r) => r.system !== "furnace"));
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "AUTH_SYSTEM_UNWITNESSED" && r.detail.includes("furnace")));
  assert.equal(out.witnessedBySystem["furnace"], 0);
});

test("negative: an id value shared between two systems refuses: one authority answering for another", () => {
  const out = judgeAuthorityIndependence([...fullSet(), receipt("beads", "op-f1")]);
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "AUTH_SHARED_ID" && r.detail.includes("op-f1")));
});

test("negative: a receipt from an unseamed or unknown system refuses rather than counting anywhere", () => {
  const out = judgeAuthorityIndependence([...fullSet(), receipt("reactive" as NativeReceipt["system"], "op-r1")]);
  assert.equal(out.ok, false);
  assert.ok(out.refusals.some((r) => r.code === "AUTH_SYSTEM_UNKNOWN" && r.detail.includes("reactive")));
});

test("negative: blank ids, empty id maps and blank digests refuse and do not witness", () => {
  const blankId = judgeAuthorityIndependence([...fullSet().slice(0, 3), receipt("hx", "op-h1", { ids: { operationId: " " } })]);
  assert.ok(blankId.refusals.some((r) => r.code === "AUTH_IDS_BLANK"));
  assert.ok(blankId.refusals.some((r) => r.code === "AUTH_SYSTEM_UNWITNESSED" && r.detail.includes("hx")));
  const noIds = judgeAuthorityIndependence([...fullSet().slice(0, 3), receipt("hx", "op-h2", { ids: {} })]);
  assert.ok(noIds.refusals.some((r) => r.code === "AUTH_IDS_BLANK"));
  const blankDigest = judgeAuthorityIndependence([...fullSet().slice(0, 3), receipt("hx", "op-h3", { rawDigest: "" })]);
  assert.ok(blankDigest.refusals.some((r) => r.code === "AUTH_DIGEST_BLANK"));
});

test("the unseamed record constructor is pinned: unknown with NO_NATIVE_SEAM, frozen", () => {
  const record = unseamedAuthorityRecord("reactive");
  assert.deepEqual(record, { authority: "reactive", state: "unknown", reason: "NO_NATIVE_SEAM" });
  assert.ok(Object.isFrozen(record));
});
