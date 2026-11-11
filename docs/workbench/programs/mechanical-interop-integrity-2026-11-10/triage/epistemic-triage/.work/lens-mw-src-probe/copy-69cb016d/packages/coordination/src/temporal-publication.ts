/** CPP-10 source-admission bridge. This module has no native effect authority.
 * SourcePublicationPort.commitAtomically is a trusted external contract, NOT implemented here.
 */
import type { Basis, Budget, Intent, Proposal } from "./contracts.js";
import { reconcile } from "./resolver.js";
import { digest } from "./canonical.js";

export interface CertifiedArtifactProposal {
  readonly id: string;
  readonly revision: string;
  readonly digest: string;
  readonly receiptRef: string;
  readonly consumerContract: string;
  readonly dependencies: readonly string[];
  /** Canonical IDs of already discharged source-owned effects. */
  readonly dischargedEffectIds: readonly string[];
}
export interface PublicationCandidate {
  readonly schema: "mw.cpp10.publication-candidate.v1";
  /** Stable over worker replacement; source MUST independently enforce idempotence. */
  readonly idempotencyKey: string;
  readonly basis: Basis;
  readonly consumerContract: string;
  readonly artifacts: readonly CertifiedArtifactProposal[];
  readonly requiredIds: readonly string[];
  readonly admittedIntentIds: readonly string[];
}
export type NativePublicationDecision =
  | { readonly status: "committed"; readonly snapshotId: string; readonly revision: string }
  | { readonly status: "stale"; readonly currentRevision: string }
  | { readonly status: "rejected"; readonly reason: string };
/** The source owns a linearizable authority.
 * commitAtomically MUST check the current native revision, validate receipts,
 * dependencies, contract, canonical effect identities, and commit in one
 * atomic operation. This is an obligation to verify for each provider.
 */
export interface SourcePublicationPort {
  readBasis(): Promise<Basis>;
  commitAtomically(candidate: PublicationCandidate): Promise<NativePublicationDecision>;
}
export interface PublishAttemptInput {
  readonly source: SourcePublicationPort;
  readonly budget: Budget;
  readonly protectedScopes: readonly string[];
  readonly proposals: readonly Proposal<Intent, unknown>[];
  readonly artifacts: readonly CertifiedArtifactProposal[];
  readonly requiredIds: readonly string[];
  readonly consumerContract: string;
}
export type PublishAttempt =
  | { readonly kind: "refused"; readonly reason: string }
  | { readonly kind: "source-rejected"; readonly reason: string }
  | { readonly kind: "source-stale"; readonly currentRevision: string }
  | { readonly kind: "published"; readonly snapshotId: string; readonly revision: string };

const nonempty = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0;

/** Public deterministic identity function; native owners must recompute this
 * from candidate fields, never trust caller-provided idempotencyKey blindly.
 */
export function publicationSemanticKey(
  basis: Basis, consumerContract: string, artifacts: readonly CertifiedArtifactProposal[],
  requiredIds: readonly string[],
): string {
  return digest({ schema: "mw.cpp10.publication-candidate.v1", basis, consumerContract,
    requiredIds: [...requiredIds].sort(),
    artifacts: artifacts.map(a => ({ id: a.id, revision: a.revision, digest: a.digest,
      receiptRef: a.receiptRef, consumerContract: a.consumerContract,
      dependencies: [...a.dependencies].sort(), dischargedEffectIds: [...a.dischargedEffectIds].sort(),
    })).sort((a, b) => a.id.localeCompare(b.id)),
  });
}

/** Opaque conservative preflight; never produces source certification. */
export function stagePublication(
  basis: Basis, admitted: readonly Intent[], artifacts: readonly CertifiedArtifactProposal[],
  requiredIds: readonly string[], consumerContract: string,
): { candidate: PublicationCandidate } | { reason: string } {
  if (!nonempty(basis.workspaceId) || !nonempty(basis.revision) || !nonempty(consumerContract))
    return { reason: "INCOMPLETE_BASIS_OR_CONTRACT" };
  if (requiredIds.length === 0 || artifacts.length === 0 || new Set(requiredIds).size !== requiredIds.length)
    return { reason: "EMPTY_OR_DUPLICATE_REQUIREMENTS" };
  const byId = new Map<string, CertifiedArtifactProposal>();
  const effectIds = new Set<string>();
  for (const artifact of artifacts) {
    if (!nonempty(artifact.id) || byId.has(artifact.id) || artifact.revision !== basis.revision ||
        !nonempty(artifact.digest) || !nonempty(artifact.receiptRef) ||
        artifact.consumerContract !== consumerContract ||
        !Array.isArray(artifact.dependencies) || !Array.isArray(artifact.dischargedEffectIds) ||
        new Set(artifact.dependencies).size !== artifact.dependencies.length) return { reason: "BAD_ARTIFACT_SCOPE" };
    for (const effect of artifact.dischargedEffectIds) {
      if (!nonempty(effect) || effectIds.has(effect)) return { reason: "DUPLICATE_EFFECT_ID" };
      effectIds.add(effect);
    }
    byId.set(artifact.id, artifact);
  }
  if (requiredIds.some(id => !byId.has(id))) return { reason: "MISSING_REQUIRED_ARTIFACT" };
  // Deliberately require a closed staged graph. External dependencies require
  // a separate native consistent-cut / complete-coverage adapter.
  for (const artifact of artifacts) if (artifact.dependencies.some(id => !byId.has(id)))
    return { reason: "UNCOVERED_DEPENDENCY" };
  const visiting = new Set<string>(), visited = new Set<string>();
  const visit = (id: string): boolean => {
    if (visiting.has(id)) return false;
    if (visited.has(id)) return true;
    visiting.add(id);
    for (const dep of byId.get(id)!.dependencies) if (!visit(dep)) return false;
    visiting.delete(id); visited.add(id); return true;
  };
  if (artifacts.some(a => !visit(a.id))) return { reason: "DEPENDENCY_CYCLE" };
  const used = new Set<string>(), admittedIntentIds: string[] = [];
  for (const artifact of artifacts) {
    const matching = admitted.filter(i => i.target.kind === "artifact" && i.target.uri === artifact.id &&
      i.effect === "publish-artifact" && i.expectedRevision === basis.revision &&
      i.evidenceRefs.includes(artifact.receiptRef));
    if (matching.length !== 1 || !nonempty(matching[0]!.intentId) || used.has(matching[0]!.intentId))
      return { reason: "MISSING_ADMITTED_PUBLICATION_INTENT" };
    used.add(matching[0]!.intentId); admittedIntentIds.push(matching[0]!.intentId);
  }
  // Stable over proposal ordering and worker ID; deliberately does not assert validity.
  const idempotencyKey = publicationSemanticKey(basis, consumerContract, artifacts, requiredIds);
  return { candidate: { schema: "mw.cpp10.publication-candidate.v1", idempotencyKey, basis,
    consumerContract, artifacts, requiredIds, admittedIntentIds } };
}

/** One bounded attempt, never retrying a non-idempotent external effect.
 * Source-owned atomic admission remains a separate proof obligation.
 */
export async function publishReconciled(input: PublishAttemptInput): Promise<PublishAttempt> {
  const basis = await input.source.readBasis();
  // A request whose artifacts were all certified against one earlier revision is stale source, not a malformed
  // scope: the source advanced between certification and this attempt. Surfacing it as source-stale here matches
  // the answer the source's own linearization point gives when the race happens after staging; mixed or blank
  // artifact revisions remain staging refusals below.
  const certified = new Set(input.artifacts.map(artifact => artifact.revision));
  if (certified.size === 1) {
    const [revision] = certified;
    if (revision !== undefined && revision !== "" && revision !== basis.revision)
      return { kind: "source-stale", currentRevision: basis.revision };
  }
  const resolution = reconcile({ basis, budget: input.budget,
    protectedScopes: input.protectedScopes, proposals: input.proposals });
  const staged = stagePublication(basis, resolution.admitted, input.artifacts, input.requiredIds, input.consumerContract);
  if ("reason" in staged) return { kind: "refused", reason: staged.reason };
  const outcome = await input.source.commitAtomically(staged.candidate);
  if (outcome.status === "stale") return { kind: "source-stale", currentRevision: outcome.currentRevision };
  if (outcome.status === "rejected") return { kind: "source-rejected", reason: outcome.reason };
  if (!nonempty(outcome.snapshotId) || !nonempty(outcome.revision) || outcome.revision !== basis.revision)
    return { kind: "source-rejected", reason: "SOURCE_RESULT_INCONSISTENT" };
  return { kind: "published", snapshotId: outcome.snapshotId, revision: outcome.revision };
}
