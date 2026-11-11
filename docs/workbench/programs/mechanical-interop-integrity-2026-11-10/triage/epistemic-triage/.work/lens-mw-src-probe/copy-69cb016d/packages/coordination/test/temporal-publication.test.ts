import test from "node:test";
import assert from "node:assert/strict";
import { stagePublication, publishReconciled } from "../dist/index.js";
import type { Basis, Budget, Intent, Proposal, CertifiedArtifactProposal,
  PublicationCandidate, NativePublicationDecision, SourcePublicationPort } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws", revision: "r1" };
const budget: Budget = { compute: 3, workers: 3, queue: 3, latencyMs: 100 };
const art = (id: string, deps: readonly string[] = [], rest: Partial<CertifiedArtifactProposal> = {}): CertifiedArtifactProposal => ({
  id, revision: "r1", digest: "sha256:" + id, receiptRef: "source:receipt:" + id,
  consumerContract: "consumer:v1", dependencies: deps, dischargedEffectIds: ["effect:" + id], ...rest,
});
const intent = (a: CertifiedArtifactProposal, over: Partial<Intent> = {}): Intent => ({
  intentId: "intent:" + a.id, policyId: "fixture",
  target: { kind: "artifact", uri: a.id }, effect: "publish-artifact",
  expectedRevision: a.revision, evidenceRefs: [a.receiptRef],
  claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
  writeScopes: ["artifact:" + a.id], readScopes: [], ...over,
});
const proposal = (...intents: Intent[]): Proposal<Intent, null> => ({ intents, memory: null, trace: [] });

/** A *fixture* source owner with one JavaScript event-loop linearization point.
 * It is NOT a native cross-process source, signer, database transaction, or effect executor.
 */
class SourceFixture implements SourcePublicationPort {
  revision = "r1";
  receipts = new Set(["source:receipt:a", "source:receipt:b"]);
  effects = new Map<string, string>();
  commits: { key: string; id: string }[] = [];
  precommit: (() => void) | null = null;
  async readBasis(): Promise<Basis> { return { workspaceId: "ws", revision: this.revision }; }
  advance(): void { this.revision = "r2"; }
  async commitAtomically(candidate: PublicationCandidate): Promise<NativePublicationDecision> {
    const hook = this.precommit; this.precommit = null; hook?.();
    if (this.revision !== candidate.basis.revision) return { status: "stale", currentRevision: this.revision };
    for (const a of candidate.artifacts) {
      if (!this.receipts.has(a.receiptRef) || a.revision !== this.revision ||
          a.consumerContract !== candidate.consumerContract)
        return { status: "rejected", reason: "RECEIPT_INVALID" };
    }
    const key = candidate.idempotencyKey;
    const existing = this.commits.find(x => x.key === key);
    if (existing) return { status: "committed", revision: this.revision, snapshotId: existing.id };
    for (const a of candidate.artifacts) for (const effectId of a.dischargedEffectIds) {
      const old = this.effects.get(effectId);
      if (old !== undefined && old !== a.digest) return { status: "rejected", reason: "EFFECT_ID_CONFLICT" };
    }
    for (const a of candidate.artifacts) for (const effectId of a.dischargedEffectIds)
      this.effects.set(effectId, a.digest);
    const snapshotId = "snapshot:" + (this.commits.length + 1);
    this.commits.push({ key, id: snapshotId });
    return { status: "committed", revision: this.revision, snapshotId };
  }
  async readCurrent(): Promise<string | null> {
    return this.commits.length > 0 && this.revision === "r1" ? this.commits.at(-1)!.id : null;
  }
}
const input = (source: SourceFixture, artifacts: readonly CertifiedArtifactProposal[]) => ({
  source, budget, protectedScopes: [] as string[],
  proposals: [proposal(...artifacts.map(a => intent(a)))],
  artifacts, requiredIds: [artifacts[artifacts.length - 1]!.id], consumerContract: "consumer:v1",
});

test("reconcile-admitted, closed dependency graph is published by fixture source", async () => {
  const source = new SourceFixture();
  const result = await publishReconciled(input(source, [art("a"), art("b", ["a"])]));
  assert.deepEqual(result, { kind: "published", snapshotId: "snapshot:1", revision: "r1" });
  assert.equal(source.effects.size, 2);
  assert.equal(await source.readCurrent(), "snapshot:1");
});
test("invalidation after readBasis but before native commit refuses a stale worker", async () => {
  const source = new SourceFixture(); source.precommit = () => source.advance();
  assert.deepEqual(await publishReconciled(input(source, [art("a")])),
    { kind: "source-stale", currentRevision: "r2" });
  assert.equal(source.commits.length, 0); assert.equal(source.effects.size, 0);
});
test("source receipt rejection overrides locally admitted candidate", async () => {
  const source = new SourceFixture(); source.receipts.clear();
  assert.deepEqual(await publishReconciled(input(source, [art("a")])),
    { kind: "source-rejected", reason: "RECEIPT_INVALID" });
});
test("successor duplicate publication is idempotent at the fixture source", async () => {
  const source = new SourceFixture(), request = input(source, [art("a")]);
  const [a, b] = await Promise.all([publishReconciled(request), publishReconciled(request)]);
  assert.deepEqual(a, b); assert.equal(source.commits.length, 1); assert.equal(source.effects.size, 1);
});
test("preflight rejects uncovered dependency, cycle, duplicate outcome identity and contract mismatch", () => {
  const a = art("a"), b = art("b", ["a"]), intents = [intent(a), intent(b)];
  assert.ok("candidate" in stagePublication(basis, intents, [a, b], ["b"], "consumer:v1"));
  assert.deepEqual(stagePublication(basis, intents, [a, art("b", ["lost"])], ["b"], "consumer:v1"),
    { reason: "UNCOVERED_DEPENDENCY" });
  assert.deepEqual(stagePublication(basis, intents, [art("a", ["b"]), b], ["b"], "consumer:v1"),
    { reason: "DEPENDENCY_CYCLE" });
  assert.deepEqual(stagePublication(basis, intents, [a, art("b", ["a"], { dischargedEffectIds: a.dischargedEffectIds })],
    ["b"], "consumer:v1"), { reason: "DUPLICATE_EFFECT_ID" });
  assert.deepEqual(stagePublication(basis, intents, [art("a", [], { consumerContract: "consumer:v2" })],
    ["a"], "consumer:v1"), { reason: "BAD_ARTIFACT_SCOPE" });
});
test("real resolver boundary refuses stale and self-authorizing proposals", async () => {
  const source = new SourceFixture(), a = art("a");
  const base = input(source, [a]);
  assert.equal((await publishReconciled({ ...base, proposals: [proposal(intent(a, { authority: "authorized-effect" }))] })).kind, "refused");
  assert.equal((await publishReconciled({ ...base, proposals: [proposal(intent(a, { expectedRevision: "r0" }))] })).kind, "refused");
  assert.equal(source.commits.length, 0);
});
test("postcommit revocation fences current reads while preserving historical outcome identity", async () => {
  const source = new SourceFixture();
  await publishReconciled(input(source, [art("a")]));
  source.advance(); assert.equal(await source.readCurrent(), null); assert.equal(source.commits.length, 1);
});
test("preflight accepts syntactically valid forged refs only as untrusted proposals", async () => {
  const source = new SourceFixture();
  const forged = art("a", [], { receiptRef: "forged:reference" });
  assert.ok("candidate" in stagePublication(basis, [intent(forged)], [forged], ["a"], "consumer:v1"));
  assert.equal((await publishReconciled(input(source, [forged]))).kind, "source-rejected");
});
test("individually committed source snapshots do not establish a common multi-source cut", async () => {
  const a = new SourceFixture(), b = new SourceFixture();
  assert.equal((await publishReconciled(input(a, [art("a")]))).kind, "published");
  b.advance();
  // Source B can no longer publish a revision-r1 artifact: its source moved, so the attempt reports
  // source-stale with B's current revision. Source A's success cannot be interpreted as proof of an
  // atomic cross-source snapshot, and nothing is committed or effected at B.
  assert.deepEqual(await publishReconciled(input(b, [art("b")])),
    { kind: "source-stale", currentRevision: "r2" });
  assert.equal(a.commits.length, 1); assert.equal(b.commits.length, 0);
});

test("mixed or blank artifact revisions stay staging refusals, never source-stale", async () => {
  const source = new SourceFixture(); source.advance();
  // Two different certified revisions: a malformed scope, not a consistent stale cut.
  const mixed = await publishReconciled(input(source, [art("a", [], { revision: "r0" }), art("b")]));
  assert.deepEqual(mixed, { kind: "refused", reason: "BAD_ARTIFACT_SCOPE" });
  // A blank revision is malformed wherever the live basis sits.
  const blank = await publishReconciled(input(source, [art("a", [], { revision: "" })]));
  assert.deepEqual(blank, { kind: "refused", reason: "BAD_ARTIFACT_SCOPE" });
  assert.equal(source.commits.length, 0); assert.equal(source.effects.size, 0);
});

test("canonical native-bound request key survives worker replacement and reorder", async () => {
  const a = art("a"), b = art("b", ["a"]);
  const first = stagePublication(basis, [intent(a), intent(b)], [a, b], ["b"], "consumer:v1");
  const second = stagePublication(basis, [intent(b, { intentId: "new-worker:b" }), intent(a, { intentId: "new-worker:a" })],
    [b, a], ["b"], "consumer:v1");
  assert.ok("candidate" in first && "candidate" in second);
  if ("candidate" in first && "candidate" in second) assert.equal(first.candidate.idempotencyKey, second.candidate.idempotencyKey);
  const changed = stagePublication(basis, [intent(a)], [art("a", [], { digest: "sha256:new" })], ["a"], "consumer:v1");
  const old = stagePublication(basis, [intent(a)], [a], ["a"], "consumer:v1");
  assert.ok("candidate" in old && "candidate" in changed);
  if ("candidate" in old && "candidate" in changed) assert.notEqual(old.candidate.idempotencyKey, changed.candidate.idempotencyKey);
});

test("a multi-artifact request certified at one stale revision is source-stale, not a staging refusal", async () => {
  const source = new SourceFixture(); source.advance();
  // Both artifacts carry r1 while the source sits at r2: one consistent stale cut, whatever the artifact count.
  const result = await publishReconciled(input(source, [art("a"), art("b", ["a"])]));
  assert.deepEqual(result, { kind: "source-stale", currentRevision: "r2" });
  assert.equal(source.commits.length, 0); assert.equal(source.effects.size, 0);
});

test("a whitespace-only receiptRef is a staging refusal even when an admitted intent carries the same blank ref", async () => {
  const blank = art("a", [], { receiptRef: "  " });
  // The admitted intent cites the identical blank ref, so only the receiptRef guard can refuse it.
  assert.deepEqual(stagePublication(basis, [intent(blank)], [blank], ["a"], "consumer:v1"),
    { reason: "BAD_ARTIFACT_SCOPE" });
  const source = new SourceFixture();
  assert.deepEqual(await publishReconciled(input(source, [blank])), { kind: "refused", reason: "BAD_ARTIFACT_SCOPE" });
  assert.equal(source.commits.length, 0); assert.equal(source.effects.size, 0);
});
