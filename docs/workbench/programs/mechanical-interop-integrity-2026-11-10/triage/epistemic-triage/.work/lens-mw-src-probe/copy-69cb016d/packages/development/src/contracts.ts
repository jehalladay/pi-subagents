/** Application-owned contracts, not a universal product SDK or execution protocol. */
export interface SubjectBasis {
  readonly workspaceId: string;
  readonly revision: string;
}

/** External refs retain their producing system; this type does not grant authority or portability. */
export interface EvidenceRef {
  readonly system: string;
  readonly kind: string;
  readonly id: string;
}

export interface DevelopmentRequest {
  readonly task: string;
  readonly workspaceId: string;
  readonly baseRevision: string;
}

export interface ScopeResult {
  readonly basis: SubjectBasis;
  readonly coverage: "complete" | "partial" | "unknown";
  readonly files: readonly string[];
  readonly evidence?: EvidenceRef;
}

export interface CompiledContext {
  readonly basis: SubjectBasis;
  readonly text: string;
  readonly evidence?: EvidenceRef;
}

export interface Candidate {
  /** Actual post-implementation basis, not merely the requested base revision. */
  readonly basis: SubjectBasis;
  readonly parentBasis: SubjectBasis;
  readonly evidence?: EvidenceRef;
}

export interface VerificationResult {
  readonly basis: SubjectBasis;
  readonly verdict: "passed" | "failed" | "partial" | "unknown";
  readonly evidence?: EvidenceRef;
  readonly diagnostic?: string;
}

export interface DevelopmentServices {
  readonly discover: (request: DevelopmentRequest) => Promise<ScopeResult>;
  readonly compileContext: (scope: ScopeResult, request: DevelopmentRequest) => Promise<CompiledContext>;
  readonly implement: (context: CompiledContext, scope: ScopeResult, request: DevelopmentRequest) => Promise<Candidate>;
  readonly verify: (candidate: Candidate, request: DevelopmentRequest) => Promise<VerificationResult>;
}

export type DevelopmentOutcome =
  | { readonly kind: "verified_candidate"; readonly candidate: Candidate; readonly verification: VerificationResult }
  | { readonly kind: "verification_failed"; readonly candidate: Candidate; readonly verification: VerificationResult }
  | { readonly kind: "needs_evidence"; readonly scope: ScopeResult; readonly reason: "SCOPE_INCOMPLETE" }
  | { readonly kind: "indeterminate"; readonly reason: string; readonly evidence?: EvidenceRef };
