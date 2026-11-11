// MechanicalWorkflows-hn5b: diagnostic coverage ratchet pins for temporal-publication staging
// and result-consistency refusals that the main suite exercises only by kind, not by reason.
import test from "node:test";
import assert from "node:assert/strict";
import { publishReconciled, stagePublication } from "../dist/index.js";
import type { Basis, Budget, CertifiedArtifactProposal, Intent, NativePublicationDecision,
  PublicationCandidate, Proposal, SourcePublicationPort } from "../dist/index.js";

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

/** A source that reports a fixed basis and answers commitAtomically with a scripted decision. */
class ScriptedSource implements SourcePublicationPort {
  private readonly decision: NativePublicationDecision;
  candidates: PublicationCandidate[] = [];
  constructor(decision: NativePublicationDecision) { this.decision = decision; }
  async readBasis(): Promise<Basis> { return { ...basis }; }
  async commitAtomically(candidate: PublicationCandidate): Promise<NativePublicationDecision> {
    this.candidates.push(candidate);
    return this.decision;
  }
}
const input = (source: SourcePublicationPort, artifacts: readonly CertifiedArtifactProposal[]) => ({
  source, budget, protectedScopes: [] as string[],
  proposals: [proposal(...artifacts.map(a => intent(a)))],
  artifacts, requiredIds: [artifacts[artifacts.length - 1]!.id], consumerContract: "consumer:v1",
});

test("INCOMPLETE_BASIS_OR_CONTRACT: a blank workspace, revision or contract refuses staging", () => {
  const a = art("a");
  assert.deepEqual(stagePublication({ workspaceId: " ", revision: "r1" }, [intent(a)], [a], ["a"], "consumer:v1"), { reason: "INCOMPLETE_BASIS_OR_CONTRACT" });
  assert.deepEqual(stagePublication({ workspaceId: "ws", revision: "" }, [intent(a)], [a], ["a"], "consumer:v1"), { reason: "INCOMPLETE_BASIS_OR_CONTRACT" });
  assert.deepEqual(stagePublication(basis, [intent(a)], [a], ["a"], " "), { reason: "INCOMPLETE_BASIS_OR_CONTRACT" });
});

test("EMPTY_OR_DUPLICATE_REQUIREMENTS: zero or duplicated required ids refuse staging", async () => {
  const a = art("a");
  assert.deepEqual(stagePublication(basis, [intent(a)], [a], [], "consumer:v1"), { reason: "EMPTY_OR_DUPLICATE_REQUIREMENTS" });
  assert.deepEqual(stagePublication(basis, [intent(a)], [a], ["a", "a"], "consumer:v1"), { reason: "EMPTY_OR_DUPLICATE_REQUIREMENTS" });
  const source = new ScriptedSource({ status: "committed", snapshotId: "snapshot:1", revision: "r1" });
  assert.deepEqual(await publishReconciled({ ...input(source, [a]), requiredIds: [] }),
    { kind: "refused", reason: "EMPTY_OR_DUPLICATE_REQUIREMENTS" });
  assert.equal(source.candidates.length, 0);
});

test("MISSING_REQUIRED_ARTIFACT: a required id with no staged artifact refuses staging", () => {
  const a = art("a");
  assert.deepEqual(stagePublication(basis, [intent(a)], [a], ["ghost"], "consumer:v1"), { reason: "MISSING_REQUIRED_ARTIFACT" });
});

test("MISSING_ADMITTED_PUBLICATION_INTENT: an artifact without exactly one matching admitted intent refuses staging", () => {
  const a = art("a");
  assert.deepEqual(stagePublication(basis, [], [a], ["a"], "consumer:v1"), { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
  const wrongEvidence = intent(a, { evidenceRefs: ["source:receipt:other"] });
  assert.deepEqual(stagePublication(basis, [wrongEvidence], [a], ["a"], "consumer:v1"), { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
  const duplicated = [intent(a), intent(a, { policyId: "fixture-2" })];
  assert.deepEqual(stagePublication(basis, duplicated, [a], ["a"], "consumer:v1"), { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
});

test("SOURCE_RESULT_INCONSISTENT: a committed answer with a blank snapshot or foreign revision is source-rejected", async () => {
  const a = art("a");
  const blankSnapshot = new ScriptedSource({ status: "committed", snapshotId: " ", revision: "r1" });
  assert.deepEqual(await publishReconciled(input(blankSnapshot, [a])),
    { kind: "source-rejected", reason: "SOURCE_RESULT_INCONSISTENT" });
  assert.equal(blankSnapshot.candidates.length, 1);
  const foreignRevision = new ScriptedSource({ status: "committed", snapshotId: "snapshot:1", revision: "r9" });
  assert.deepEqual(await publishReconciled(input(foreignRevision, [a])),
    { kind: "source-rejected", reason: "SOURCE_RESULT_INCONSISTENT" });
});

// MechanicalWorkflows-8mlv: pins for three staging disjuncts the hn5b suite left to single-clause mutants.
test("EMPTY_OR_DUPLICATE_REQUIREMENTS: an empty artifact list refuses staging even with a required id", () => {
  assert.deepEqual(stagePublication(basis, [], [], ["a"], "consumer:v1"), { reason: "EMPTY_OR_DUPLICATE_REQUIREMENTS" });
});

test("MISSING_ADMITTED_PUBLICATION_INTENT: two artifacts sharing one admitted intentId refuse staging", () => {
  const a = art("a"), b = art("b");
  assert.deepEqual(stagePublication(basis, [intent(a), intent(b, { intentId: "intent:a" })], [a, b], ["b"], "consumer:v1"),
    { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
  assert.ok("candidate" in stagePublication(basis, [intent(a), intent(b)], [a, b], ["b"], "consumer:v1"));
});

test("MISSING_ADMITTED_PUBLICATION_INTENT: a blank admitted intentId refuses staging", () => {
  const a = art("a");
  assert.deepEqual(stagePublication(basis, [intent(a, { intentId: " " })], [a], ["a"], "consumer:v1"),
    { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
  assert.deepEqual(stagePublication(basis, [intent(a, { intentId: "" })], [a], ["a"], "consumer:v1"),
    { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" });
});
