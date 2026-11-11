import { strict as assert } from "node:assert";
import { test } from "node:test";
import { commitDurable, initialDurableState } from "../dist/index.js";
import type { DurableState, DurableWrite } from "../dist/index.js";

type V = { readonly lane: string; readonly tip: string };
// A fresh base per test: a module-level base shared by every test would let one test's mutation of it hide behind another test's snapshot.
function freshBase(): DurableState<V> {
  return initialDurableState("rev-1", { lane: "main", tip: "aaa" });
}
function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}
function write(overrides: Partial<DurableWrite<V>> = {}): DurableWrite<V> {
  return { writeId: "w-1", decisionId: "d-1", expectedRevision: "rev-1", nextRevision: "rev-2", value: { lane: "main", tip: "bbb" }, receipt: { status: "acknowledged", nativeRef: "git:refs/heads/main@bbb" }, ...overrides };
}
function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("state advances only by an acknowledged compare-and-swap against the revision that was read", () => {
  const base = freshBase();
  const outcome = commitDurable(base, write());
  assert.equal(outcome.kind, "advanced");
  if (outcome.kind !== "advanced") return;
  assert.equal(outcome.state.schema, "mw.durable-state.v0");
  assert.equal(outcome.state.revision, "rev-2");
  assert.deepEqual(outcome.state.value, { lane: "main", tip: "bbb" });
  assert.deepEqual(outcome.state.pending, []);
  assert.deepEqual(outcome.state.committed.map(c => [c.decisionId, c.writeId]), [["d-1", "w-1"]]);
  assert.equal(base.revision, "rev-1", "the prior state is untouched");
});

test("a write against a revision that is not the current one is refused, never retried, rebased or resampled", () => {
  const base = freshBase();
  const outcome = commitDurable(base, write({ expectedRevision: "rev-0" }));
  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.equal(outcome.code, "DURABILITY_CAS_MISMATCH");
  assert.match(outcome.detail, /rev-0/);
  assert.match(outcome.detail, /rev-1/);
  assert.equal(outcome.state, base);
});

test("an unresolved native write leaves a pending receipt and advances nothing; its acknowledgement under the same write id advances", () => {
  const base = freshBase();
  const pending = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@inflight" } }));
  assert.equal(pending.kind, "pending");
  if (pending.kind !== "pending") return;
  assert.equal(pending.state.revision, "rev-1");
  assert.deepEqual(pending.state.value, base.value);
  assert.deepEqual(pending.state.pending.map(p => [p.writeId, p.decisionId, p.nativeRef, p.expectedRevision]), [["w-1", "d-1", "git:push@inflight", "rev-1"]]);
  const resolved = commitDurable(pending.state, write());
  assert.equal(resolved.kind, "advanced");
  if (resolved.kind !== "advanced") return;
  assert.equal(resolved.state.revision, "rev-2");
  assert.deepEqual(resolved.state.pending, []);
  const stillPending = commitDurable(pending.state, write({ receipt: { status: "pending", nativeRef: "git:push@inflight" } }));
  assert.equal(stillPending.kind, "pending");
  if (stillPending.kind === "pending") assert.equal(stillPending.state.pending.length, 1);
});

test("nothing silently rerolls: the same decision cannot commit a different value, whether its first write landed or is still pending", () => {
  const base = freshBase();
  const landed = commitDurable(base, write());
  if (landed.kind !== "advanced") throw new Error("fixture");
  const reroll = commitDurable(landed.state, write({ writeId: "w-2", expectedRevision: "rev-2", nextRevision: "rev-3", value: { lane: "main", tip: "ccc" } }));
  assert.equal(reroll.kind, "refused");
  if (reroll.kind === "refused") assert.equal(reroll.code, "DURABILITY_REROLL");
  const pending = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@inflight" } }));
  if (pending.kind !== "pending") throw new Error("fixture");
  const rerollPending = commitDurable(pending.state, write({ writeId: "w-2", value: { lane: "main", tip: "ccc" } }));
  assert.equal(rerollPending.kind, "refused");
  if (rerollPending.kind === "refused") assert.equal(rerollPending.code, "DURABILITY_REROLL");
  const sameValueRetry = commitDurable(landed.state, write({ writeId: "w-2", expectedRevision: "rev-2", nextRevision: "rev-3" }));
  assert.equal(sameValueRetry.kind, "advanced", "an identical value under the same decision is an idempotent retry, not a reroll");
});

test("a failed native receipt refuses the write, clears its pending entry and leaves state where it was; an explicit retry carries a new write id and the same value", () => {
  const base = freshBase();
  const pending = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@inflight" } }));
  if (pending.kind !== "pending") throw new Error("fixture");
  const failed = commitDurable(pending.state, write({ receipt: { status: "failed", nativeRef: "git:push@inflight", reason: "non-fast-forward" } }));
  assert.equal(failed.kind, "refused");
  if (failed.kind !== "refused") return;
  assert.equal(failed.code, "DURABILITY_RECEIPT_FAILED");
  assert.match(failed.detail, /non-fast-forward/);
  assert.equal(failed.state.revision, "rev-1");
  assert.deepEqual(failed.state.pending, []);
  const retry = commitDurable(failed.state, write({ writeId: "w-2" }));
  assert.equal(retry.kind, "advanced");
});

test("a write must advance the revision, and a second write for a decision whose receipt is pending must resolve that receipt first", () => {
  const base = freshBase();
  const same = commitDurable(base, write({ nextRevision: "rev-1" }));
  assert.equal(same.kind, "refused");
  if (same.kind === "refused") assert.equal(same.code, "DURABILITY_REVISION_NOT_ADVANCING");
  const pending = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@inflight" } }));
  if (pending.kind !== "pending") throw new Error("fixture");
  const other = commitDurable(pending.state, write({ writeId: "w-2" }));
  assert.equal(other.kind, "refused");
  if (other.kind === "refused") assert.equal(other.code, "DURABILITY_PENDING_UNRESOLVED");
});

test("commits are deterministic, pure and mint no identifier", () => {
  const base = deepFreeze(freshBase());
  const before = JSON.stringify({ base, w: write() });
  const first = commitDurable(base, deepFreeze(write()));
  const second = commitDurable(base, deepFreeze(write()));
  assert.equal(JSON.stringify({ base, w: write() }), before, "neither the base nor the write is touched; a frozen base would throw on any in-place edit");
  assert.deepEqual(base.value, { lane: "main", tip: "aaa" }, "the fresh base still holds its original value after both commits");
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  if (first.kind !== "advanced") throw new Error("fixture");
  const known = new Set([...stringLeaves(base), ...stringLeaves(write()), first.state.schema, JSON.stringify(write().value)]);
  assert.equal(first.state.committed[0]!.valueDigest, JSON.stringify(write().value), "the value digest is the canonical JSON of the value, derived not minted");
  for (const leaf of stringLeaves(first.state)) assert.ok(known.has(leaf), `minted ${leaf}`);
});

test("the value digest is the canonical JSON with keys sorted at every depth, so a value whose keys arrive unsorted digests to the sorted literal", () => {
  type U = { readonly tip: string; readonly lane: string; readonly meta: { readonly z: number; readonly a: readonly { readonly y: string; readonly b: string }[] } };
  const unsorted: U = { tip: "bbb", lane: "main", meta: { z: 2, a: [{ y: "2", b: "1" }] } };
  const outcome = commitDurable<U>(initialDurableState<U>("rev-1", unsorted), { writeId: "w-1", decisionId: "d-1", expectedRevision: "rev-1", nextRevision: "rev-2", value: unsorted, receipt: { status: "acknowledged", nativeRef: "git:refs/heads/main@bbb" } });
  assert.equal(outcome.kind, "advanced");
  if (outcome.kind !== "advanced") return;
  assert.equal(outcome.state.committed[0]!.valueDigest, '{"lane":"main","meta":{"a":[{"b":"1","y":"2"}],"z":2},"tip":"bbb"}');
  const reordered: U = { meta: { a: [{ b: "1", y: "2" }], z: 2 }, lane: "main", tip: "bbb" };
  const retry = commitDurable<U>(outcome.state, { writeId: "w-2", decisionId: "d-1", expectedRevision: "rev-2", nextRevision: "rev-3", value: reordered, receipt: { status: "acknowledged", nativeRef: "git:refs/heads/main@bbb" } });
  assert.equal(retry.kind, "advanced", "the same value with its keys in another order is an idempotent retry, not a reroll");
});

test("a failed receipt clears only the failing write's pending entry, and an acknowledgement resolves only its own", () => {
  const base = freshBase();
  const first = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@one" } }));
  if (first.kind !== "pending") throw new Error("fixture");
  const both = commitDurable(first.state, write({ writeId: "w-2", decisionId: "d-2", value: { lane: "side", tip: "ccc" }, receipt: { status: "pending", nativeRef: "git:push@two" } }));
  assert.equal(both.kind, "pending", "an independent decision's pending write is not blocked by another decision's pending write");
  if (both.kind !== "pending") return;
  assert.deepEqual(both.state.pending.map(p => p.writeId), ["w-1", "w-2"]);
  const failed = commitDurable(both.state, write({ receipt: { status: "failed", nativeRef: "git:push@one", reason: "non-fast-forward" } }));
  assert.equal(failed.kind, "refused");
  if (failed.kind !== "refused") return;
  assert.equal(failed.code, "DURABILITY_RECEIPT_FAILED");
  assert.deepEqual(failed.state.pending.map(p => p.writeId), ["w-2"], "the other decision's pending entry survives the failure");
  const acknowledged = commitDurable(both.state, write({ writeId: "w-2", decisionId: "d-2", value: { lane: "side", tip: "ccc" } }));
  assert.equal(acknowledged.kind, "advanced");
  if (acknowledged.kind !== "advanced") return;
  assert.deepEqual(acknowledged.state.pending.map(p => p.writeId), ["w-1"], "an acknowledgement resolves only its own pending entry");
});

test("pending and committed lookups match by this decision, not the first entry: an independent decision is never a reroll nor blocked", () => {
  const base = freshBase();
  const pendingOne = commitDurable(base, write({ receipt: { status: "pending", nativeRef: "git:push@one" } }));
  if (pendingOne.kind !== "pending") throw new Error("fixture");
  const differentValue = commitDurable(pendingOne.state, write({ writeId: "w-2", decisionId: "d-2", value: { lane: "side", tip: "ccc" }, receipt: { status: "pending", nativeRef: "git:push@two" } }));
  assert.equal(differentValue.kind, "pending", "d-2 carries another value than d-1's pending write and is still not a reroll");
  const sameValue = commitDurable(pendingOne.state, write({ writeId: "w-3", decisionId: "d-3", receipt: { status: "pending", nativeRef: "git:push@three" } }));
  assert.equal(sameValue.kind, "pending", "d-3 carries the same value under another write id and is not blocked by d-1's pending write");
  const landedOne = commitDurable(base, write());
  if (landedOne.kind !== "advanced") throw new Error("fixture");
  const landedTwo = commitDurable(landedOne.state, write({ writeId: "w-2", decisionId: "d-2", expectedRevision: "rev-2", nextRevision: "rev-3", value: { lane: "side", tip: "ccc" } }));
  assert.equal(landedTwo.kind, "advanced", "d-2 carries another value than the first committed decision and is not a reroll");
  if (landedTwo.kind !== "advanced") return;
  assert.deepEqual(landedTwo.state.committed.map(c => c.decisionId), ["d-1", "d-2"]);
  const retryTwo = commitDurable(landedTwo.state, write({ writeId: "w-3", decisionId: "d-2", expectedRevision: "rev-3", nextRevision: "rev-4", value: { lane: "side", tip: "ccc" } }));
  assert.equal(retryTwo.kind, "advanced", "d-2's idempotent retry is judged against d-2's own committed value, not d-1's");
  if (retryTwo.kind === "advanced") assert.equal(retryTwo.state.committed.length, 2, "an idempotent retry adds no committed entry");
  const rerollTwo = commitDurable(landedTwo.state, write({ writeId: "w-4", decisionId: "d-2", expectedRevision: "rev-3", nextRevision: "rev-4", value: { lane: "side", tip: "ddd" } }));
  assert.equal(rerollTwo.kind, "refused");
  if (rerollTwo.kind === "refused") assert.equal(rerollTwo.code, "DURABILITY_REROLL");
});
