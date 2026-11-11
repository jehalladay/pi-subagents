import type {
  DevelopmentOutcome, DevelopmentRequest, DevelopmentServices, SubjectBasis,
} from "./contracts.js";

function equalBasis(left: SubjectBasis, right: SubjectBasis): boolean {
  return left.workspaceId === right.workspaceId && left.revision === right.revision;
}

function required(value: string, name: string): void {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`INVALID_DEVELOPMENT_REQUEST: ${name} must be a nonempty string`);
  }
}

/**
 * Ordinary async composition. Does not create a Run, register an agent tool,
 * own SDK clients, interpret Forge-specific verdicts, or retry uncertain effects.
 * Product-specific adapters must preserve native semantics before returning these
 * application-specific values.
 */
export async function develop(
  services: DevelopmentServices,
  request: DevelopmentRequest,
): Promise<DevelopmentOutcome> {
  required(request.task, "task");
  required(request.workspaceId, "workspaceId");
  required(request.baseRevision, "baseRevision");
  const requestedBasis: SubjectBasis = {
    workspaceId: request.workspaceId, revision: request.baseRevision,
  };

  const scope = await services.discover(request);
  if (!equalBasis(scope.basis, requestedBasis)) {
    return { kind: "indeterminate", reason: "DISCOVERY_BASIS_MISMATCH", ...(scope.evidence ? { evidence: scope.evidence } : {}) };
  }
  if (scope.coverage !== "complete") {
    return { kind: "needs_evidence", scope, reason: "SCOPE_INCOMPLETE" };
  }

  const context = await services.compileContext(scope, request);
  if (!equalBasis(context.basis, requestedBasis)) {
    return { kind: "indeterminate", reason: "CONTEXT_BASIS_MISMATCH", ...(context.evidence ? { evidence: context.evidence } : {}) };
  }

  const candidate = await services.implement(context, scope, request);
  if (!equalBasis(candidate.parentBasis, requestedBasis) ||
      candidate.basis.workspaceId !== request.workspaceId ||
      !candidate.basis.revision.trim() ||
      candidate.basis.revision === requestedBasis.revision) {
    return { kind: "indeterminate", reason: "CANDIDATE_BASIS_MISMATCH", ...(candidate.evidence ? { evidence: candidate.evidence } : {}) };
  }

  const verification = await services.verify(candidate, request);
  if (!equalBasis(verification.basis, candidate.basis)) {
    return { kind: "indeterminate", reason: "VERIFICATION_BASIS_MISMATCH", ...(verification.evidence ? { evidence: verification.evidence } : {}) };
  }
  if (verification.verdict === "passed") {
    // The application refuses to assert verification without a fully named
    // producer reference: system, kind and id must each be a nonblank string.
    const evidence = verification.evidence;
    if (!evidence || ![evidence.system, evidence.kind, evidence.id].every(
      (part) => typeof part === "string" && part.trim().length > 0)) {
      return { kind: "indeterminate", reason: "VERIFICATION_EVIDENCE_MISSING" };
    }
    return { kind: "verified_candidate", candidate, verification };
  }
  if (verification.verdict === "failed") {
    return { kind: "verification_failed", candidate, verification };
  }
  return {
    kind: "indeterminate",
    reason: verification.verdict === "partial" ? "VERIFICATION_PARTIAL" : "VERIFICATION_UNKNOWN",
    ...(verification.evidence ? { evidence: verification.evidence } : {}),
  };
}
