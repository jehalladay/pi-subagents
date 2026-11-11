/**
 * Certificate references and invalidation (APO-011; 07 "Rewrite lifecycle" line 16; 06 "Discovery"): a certificate
 * reference names its assumptions, its full dependency footprint — data edges, resource scopes, stochastic common
 * causes, evidence coverage, timing and effect authority, each pinned at a revision — and the model revision and
 * intervention class it was taken under. A change to a named premise invalidates every certificate that depends on it;
 * a certificate is retained across a change only under a proven complete footprint that does not name the changed
 * premise; a global resource change requires full budget review, so every certificate with a resource-scope dependency
 * is invalidated. Pure records: nothing here proves a certificate or performs the review.
 */

export type DependencyKind = "data-edge" | "resource-scope" | "stochastic-cause" | "evidence-coverage" | "timing" | "effect-authority";

export const DEPENDENCY_KINDS: readonly DependencyKind[] = Object.freeze(["data-edge", "resource-scope", "stochastic-cause", "evidence-coverage", "timing", "effect-authority"] as const);

export interface CertificateDependency {
  readonly kind: DependencyKind;
  readonly id: string;
  /** The revision of the premise the certificate was proven against. */
  readonly revision: string;
}

export interface CertificateReference {
  readonly certificateId: string;
  readonly subject: string;
  readonly assumptions: readonly string[];
  readonly footprint: readonly CertificateDependency[];
  /** Whether the footprint is claimed complete; retention across unrelated changes needs this and its proof. */
  readonly footprintComplete: boolean;
  readonly footprintProof?: string;
  readonly model: { readonly revision: string; readonly interventionClass: string };
}

export type CertificateRefusalCode =
  | "CERTIFICATE_ASSUMPTION_UNNAMED"
  | "CERTIFICATE_FOOTPRINT_EMPTY"
  | "CERTIFICATE_DEPENDENCY_KIND_UNKNOWN"
  | "CERTIFICATE_DEPENDENCY_UNPINNED"
  | "CERTIFICATE_MODEL_VERSION_MISSING"
  | "CERTIFICATE_FOOTPRINT_COMPLETENESS_UNPROVEN";

export interface CertificateRefusal {
  readonly code: CertificateRefusalCode;
  readonly subject: string;
  readonly detail: string;
}

export interface CertificateReferenceValidation {
  readonly schema: "mw.certificate-reference.v0";
  readonly certificateId: string;
  readonly ok: boolean;
  /** Sorted `kind:id` keys of the footprint. */
  readonly footprint: readonly string[];
  readonly refusals: readonly CertificateRefusal[];
}

export const dependencyKey = (dependency: Pick<CertificateDependency, "kind" | "id">): string => `${dependency.kind}:${dependency.id}`;

const blank = (value: string): boolean => value.trim().length === 0;

export function validateCertificateReference(reference: CertificateReference): CertificateReferenceValidation {
  const refusals: CertificateRefusal[] = [];
  for (const assumption of reference.assumptions) {
    if (blank(assumption)) refusals.push({ code: "CERTIFICATE_ASSUMPTION_UNNAMED", subject: reference.certificateId, detail: `${reference.certificateId} carries an unnamed assumption; every assumption is named` });
  }
  if (reference.footprint.length === 0) {
    refusals.push({ code: "CERTIFICATE_FOOTPRINT_EMPTY", subject: reference.certificateId, detail: `${reference.certificateId} names no dependency; a certificate without a footprint certifies nothing checkable` });
  }
  for (const dependency of reference.footprint) {
    if (!DEPENDENCY_KINDS.includes(dependency.kind)) {
      refusals.push({ code: "CERTIFICATE_DEPENDENCY_KIND_UNKNOWN", subject: dependency.id, detail: `${dependency.id} has dependency kind ${String(dependency.kind)}; the kinds are ${DEPENDENCY_KINDS.join(", ")}` });
    } else if (blank(dependency.revision)) {
      refusals.push({ code: "CERTIFICATE_DEPENDENCY_UNPINNED", subject: dependency.id, detail: `${dependencyKey(dependency)} is not pinned to a revision` });
    }
  }
  if (blank(reference.model.revision) || blank(reference.model.interventionClass)) {
    refusals.push({ code: "CERTIFICATE_MODEL_VERSION_MISSING", subject: reference.certificateId, detail: `${reference.certificateId} must carry the model revision and intervention class it was taken under` });
  }
  if (reference.footprintComplete && (reference.footprintProof === undefined || blank(reference.footprintProof))) {
    refusals.push({ code: "CERTIFICATE_FOOTPRINT_COMPLETENESS_UNPROVEN", subject: reference.certificateId, detail: `${reference.certificateId} claims a complete footprint without a proof of completeness` });
  }
  return { schema: "mw.certificate-reference.v0", certificateId: reference.certificateId, ok: refusals.length === 0, footprint: reference.footprint.map(dependencyKey).sort(), refusals };
}

export interface PremiseChange {
  readonly kind: DependencyKind | "global-resource";
  readonly id: string;
  readonly toRevision: string;
}

export type InvalidationReason = "DEPENDENCY_TOUCHED" | "GLOBAL_RESOURCE_REVIEW" | "FOOTPRINT_INCOMPLETE" | "REFERENCE_INVALID";

export interface CertificateInvalidation {
  readonly schema: "mw.certificate-invalidation.v0";
  readonly change: PremiseChange;
  readonly invalidated: readonly { readonly certificateId: string; readonly reason: InvalidationReason; readonly dependency: string }[];
  readonly retained: readonly string[];
}

export function invalidateCertificates(references: readonly CertificateReference[], change: PremiseChange): CertificateInvalidation {
  const changeKey = `${change.kind}:${change.id}`;
  const invalidated: { certificateId: string; reason: InvalidationReason; dependency: string }[] = [];
  const retained: string[] = [];
  for (const reference of references) {
    if (!validateCertificateReference(reference).ok) {
      invalidated.push({ certificateId: reference.certificateId, reason: "REFERENCE_INVALID", dependency: changeKey });
      continue;
    }
    if (change.kind === "global-resource") {
      const scope = reference.footprint.find(dependency => dependency.kind === "resource-scope");
      if (scope !== undefined) {
        invalidated.push({ certificateId: reference.certificateId, reason: "GLOBAL_RESOURCE_REVIEW", dependency: dependencyKey(scope) });
        continue;
      }
    } else {
      const touched = reference.footprint.find(dependency => dependencyKey(dependency) === changeKey && dependency.revision !== change.toRevision);
      if (touched !== undefined) {
        invalidated.push({ certificateId: reference.certificateId, reason: "DEPENDENCY_TOUCHED", dependency: dependencyKey(touched) });
        continue;
      }
    }
    if (!reference.footprintComplete) {
      invalidated.push({ certificateId: reference.certificateId, reason: "FOOTPRINT_INCOMPLETE", dependency: changeKey });
      continue;
    }
    retained.push(reference.certificateId);
  }
  return { schema: "mw.certificate-invalidation.v0", change, invalidated, retained };
}
