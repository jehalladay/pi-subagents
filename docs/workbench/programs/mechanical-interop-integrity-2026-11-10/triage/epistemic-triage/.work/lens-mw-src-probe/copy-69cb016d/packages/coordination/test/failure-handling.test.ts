import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, decideRetryAfterCrash, judgeSourceConsistency, resolveMigrationFailure } from "../dist/index.js";
import type { CrashRetryInput, GraphAlias, SourceSample } from "../dist/index.js";

const samples: SourceSample[] = [
  { revision: "rf@1", digest: "sha256:aaa" },
  { revision: "rf@2", digest: "sha256:bbb" },
  { revision: "rf@2", digest: "sha256:bbb" },
];

test("row: source inconsistency -> quarantine. Two different contents for one revision quarantine the source, list the conflict with both digests, and make its reads unknown", () => {
  const out = judgeSourceConsistency("rf:journal", [...samples, { revision: "rf@2", digest: "sha256:ccc" }, { revision: "rf@1", digest: "sha256:aa2" }]);
  assert.equal(out.schema, "mw.source-consistency.v0");
  assert.equal(out.sourceId, "rf:journal");
  assert.equal(out.action, "quarantine");
  assert.deepEqual(out.conflicts, [{ revision: "rf@1", digests: ["sha256:aa2", "sha256:aaa"] }, { revision: "rf@2", digests: ["sha256:bbb", "sha256:ccc"] }]);
  assert.equal(out.reads, UNKNOWN);
});

test("a source that reports one content per revision is consistent and its reads are observed; a source never observed is unknown, not consistent by default", () => {
  const consistent = judgeSourceConsistency("rf:journal", samples);
  assert.equal(consistent.action, "none");
  assert.deepEqual(consistent.conflicts, []);
  assert.equal(consistent.reads, "observed");
  const unobserved = judgeSourceConsistency("rf:journal", []);
  assert.equal(unobserved.action, "none");
  assert.equal(unobserved.reads, UNKNOWN);
});

test("row: rewrite migration failure -> leave old graph active. The active alias is returned unchanged and the candidate is left inactive, whatever it was", () => {
  const active: GraphAlias = { graphId: "g1", revision: "r7" };
  const out = resolveMigrationFailure(active, { candidateRevision: "r8", failure: "GRAPH_DELAYED_CYCLE_UNBOUNDED" });
  assert.equal(out.schema, "mw.migration-failure.v0");
  assert.deepEqual(out.active, { graphId: "g1", revision: "r7" });
  assert.equal(out.candidateRevision, "r8");
  assert.equal(out.disposition, "left-inactive");
  assert.equal(out.failure, "GRAPH_DELAYED_CYCLE_UNBOUNDED");
  const same = resolveMigrationFailure(active, { candidateRevision: "r7", failure: "validator timeout" });
  assert.deepEqual(same.active, active);
  assert.equal(same.disposition, "left-inactive");
});

test("conflicts are listed sorted by revision whatever order the samples arrive in, not in first-seen order", () => {
  const out = judgeSourceConsistency("rf:journal", [
    { revision: "rf@2", digest: "sha256:ccc" },
    { revision: "rf@2", digest: "sha256:bbb" },
    { revision: "rf@1", digest: "sha256:aaa" },
    { revision: "rf@1", digest: "sha256:aa2" },
  ]);
  assert.equal(out.action, "quarantine");
  assert.deepEqual(out.conflicts, [{ revision: "rf@1", digests: ["sha256:aa2", "sha256:aaa"] }, { revision: "rf@2", digests: ["sha256:bbb", "sha256:ccc"] }]);
});

test("the consistent and the unobserved records carry the schema and the caller's sourceId, not a constant", () => {
  const consistent = judgeSourceConsistency("rf:other", samples);
  assert.equal(consistent.schema, "mw.source-consistency.v0");
  assert.equal(consistent.sourceId, "rf:other");
  assert.equal(consistent.action, "none");
  const unobserved = judgeSourceConsistency("rf:elsewhere", []);
  assert.equal(unobserved.schema, "mw.source-consistency.v0");
  assert.equal(unobserved.sourceId, "rf:elsewhere");
  assert.equal(unobserved.action, "none");
});

test("the resolution carries a fresh copy of the caller's active alias, built from that alias's own graphId and revision and from nothing else", () => {
  const active = { graphId: "g9", revision: "r1", extra: "leaks" } as GraphAlias;
  const out = resolveMigrationFailure(active, { candidateRevision: "r2", failure: "f2" });
  assert.deepEqual(out.active, { graphId: "g9", revision: "r1" });
  assert.notStrictEqual(out.active, active);
  assert.deepEqual(Object.keys(out.active).sort(), ["graphId", "revision"]);
  assert.equal(out.candidateRevision, "r2");
});

test("row: native crash -> consult native receipt/idempotency before retry. The retry table: acknowledged never retries, pending holds, failed retries, unknown retries only when idempotent and otherwise demands the receipt", () => {
  const decide = (receipt: CrashRetryInput["receipt"], idempotent = false) => decideRetryAfterCrash({ writeId: "w:1", receipt, idempotent });
  assert.deepEqual(decide({ status: "acknowledged", nativeRef: "native:1" }), { schema: "mw.crash-retry.v0", writeId: "w:1", action: "do-not-retry", reason: "receipt-acknowledged" });
  assert.deepEqual(decide({ status: "acknowledged", nativeRef: "native:1" }, true).action, "do-not-retry");
  assert.deepEqual(decide({ status: "pending", nativeRef: "native:1" }), { schema: "mw.crash-retry.v0", writeId: "w:1", action: "hold-pending", reason: "receipt-pending" });
  assert.equal(decide({ status: "pending", nativeRef: "native:1" }, true).action, "hold-pending");
  assert.deepEqual(decide({ status: "failed", nativeRef: "native:1", reason: "disk full" }), { schema: "mw.crash-retry.v0", writeId: "w:1", action: "retry", reason: "receipt-failed" });
  assert.deepEqual(decide(UNKNOWN), { schema: "mw.crash-retry.v0", writeId: "w:1", action: "consult-receipt", reason: "receipt-unknown" });
  assert.deepEqual(decide(UNKNOWN, true), { schema: "mw.crash-retry.v0", writeId: "w:1", action: "retry", reason: "write-idempotent" });
});

test("no blind retry exists: every retry decision is grounded in a failed receipt or the write's idempotency, and every other row names why it does not retry", () => {
  const receipts: CrashRetryInput["receipt"][] = [UNKNOWN, { status: "acknowledged", nativeRef: "n" }, { status: "pending", nativeRef: "n" }, { status: "failed", nativeRef: "n", reason: "x" }];
  for (const receipt of receipts) for (const idempotent of [false, true]) {
    const out = decideRetryAfterCrash({ writeId: "w:2", receipt, idempotent });
    if (out.action === "refuse") assert.fail(JSON.stringify(out));
    if (out.action === "retry") assert.ok(out.reason === "receipt-failed" || out.reason === "write-idempotent", JSON.stringify(out));
    else assert.ok(["receipt-acknowledged", "receipt-pending", "receipt-unknown"].includes(out.reason), JSON.stringify(out));
  }
});

test("a receipt whose status lies outside acknowledged, pending and failed is a malformed receipt: decideRetryAfterCrash returns the CRASH_RETRY_RECEIPT_STATUS_INVALID refusal record, idempotent or not, and never a retry", () => {
  // Only parsed data can hold an off-union status; a typed caller cannot, so the fixtures arrive as JSON text.
  for (const status of ["bogus", "", "constructor"]) for (const idempotent of [true, false]) {
    const receipt = JSON.parse(JSON.stringify({ status, nativeRef: "native:1" })) as CrashRetryInput["receipt"];
    const writeId = `w:${JSON.stringify(status)}:${idempotent}`; // a distinct id per fixture: the refusal record must echo the caller's own writeId, not a constant
    const out = decideRetryAfterCrash({ writeId, receipt, idempotent });
    assert.deepEqual(out, { schema: "mw.crash-retry.v0", writeId, action: "refuse", code: "CRASH_RETRY_RECEIPT_STATUS_INVALID" }, `status ${JSON.stringify(status)} idempotent ${idempotent}`);
    assert.notEqual(out.action, "retry");
  }
  // Negative control: an in-union status still reaches its landed row beside the refusal.
  assert.equal(decideRetryAfterCrash({ writeId: "w:3", receipt: { status: "failed", nativeRef: "n", reason: "x" }, idempotent: false }).action, "retry");
});

test("the three records are pure: every string leaf is an input leaf, a schema, an action, a reason or the unknown sentinel", () => {
  const verdict = judgeSourceConsistency("rf:journal", [...samples, { revision: "rf@2", digest: "sha256:ccc" }]);
  const resolution = resolveMigrationFailure({ graphId: "g1", revision: "r7" }, { candidateRevision: "r8", failure: "f" });
  const retry = decideRetryAfterCrash({ writeId: "w:1", receipt: { status: "failed", nativeRef: "native:1", reason: "disk full" }, idempotent: false });
  const known = new Set<string>(["rf:journal", "rf@1", "rf@2", "sha256:aaa", "sha256:bbb", "sha256:ccc", "g1", "r7", "r8", "f", "w:1", "native:1", "disk full", "failed", UNKNOWN, verdict.schema, resolution.schema, retry.schema, "none", "quarantine", "observed", "left-inactive", "do-not-retry", "retry", "hold-pending", "consult-receipt", "receipt-acknowledged", "receipt-pending", "receipt-failed", "write-idempotent", "receipt-unknown", "refuse", "CRASH_RETRY_RECEIPT_STATUS_INVALID"]);
  for (const leaf of [...stringLeaves(verdict), ...stringLeaves(resolution), ...stringLeaves(retry)]) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
