/**
 * Authority is immutable under rewrite (APO program, 13 A12 and the claim authority-immutable-under-rewrite): a
 * learned rewrite may change policy structure only. Its writable surface is the graph's nodes, ports and edges;
 * authority checks, required native verifiers and the execution protocol are outside it, so a change naming any
 * of them is refused by its own code whatever the operation. A contract the parent graph requires cannot be
 * touched through any change kind, and a rewrite may add required certificates but never drop one the parent
 * requires. A candidate rewriting a different revision than the parent given is refused before anything else is
 * judged. The concrete seven-rule grammar and the full mutation record are the b677.5 / 3l61.6 deliverables; this
 * is the boundary law they must satisfy. Pure; nothing here applies a rewrite or mints an identifier.
 */
import type { PolicyGraphManifest } from "./policy-graph.js";

export type RewriteChangeKind = "node" | "port" | "edge" | "authority" | "verifier" | "protocol" | "contract";
export type RewriteOperation = "add" | "remove" | "modify";

export interface RewriteChange {
  readonly kind: RewriteChangeKind;
  readonly id: string;
  readonly op: RewriteOperation;
}

export interface RewriteCandidate {
  readonly candidateId: string;
  /** The graph revision this candidate rewrites. */
  readonly parentRevision: string;
  readonly changes: readonly RewriteChange[];
  /** Certificates the candidate declares it still requires; a superset of the parent's required contracts. */
  readonly requiredCertificates: readonly string[];
}

export type RewriteRefusalCode =
  | "REWRITE_PARENT_MISMATCH"
  | "REWRITE_TOUCHES_AUTHORITY"
  | "REWRITE_TOUCHES_VERIFIER"
  | "REWRITE_TOUCHES_PROTOCOL"
  | "REWRITE_TOUCHES_REQUIRED_CONTRACT"
  | "REWRITE_DROPS_REQUIRED_CERTIFICATE";

export interface RewriteRefusal {
  readonly code: RewriteRefusalCode;
  readonly id: string;
  readonly detail: string;
}

export interface RewriteBoundaryValidation {
  readonly schema: "mw.rewrite-boundary.v0";
  readonly candidateId: string;
  readonly ok: boolean;
  /** `kind:id` of every change inside the writable surface, sorted. */
  readonly writable: readonly string[];
  readonly refusals: readonly RewriteRefusal[];
}

const STRUCTURAL: ReadonlySet<RewriteChangeKind> = new Set<RewriteChangeKind>(["node", "port", "edge"]);
const PROTECTED_CODE: Readonly<Record<"authority" | "verifier" | "protocol", RewriteRefusalCode>> = {
  authority: "REWRITE_TOUCHES_AUTHORITY",
  verifier: "REWRITE_TOUCHES_VERIFIER",
  protocol: "REWRITE_TOUCHES_PROTOCOL",
};

function compare(x: RewriteRefusal, y: RewriteRefusal): number {
  return x.code < y.code ? -1 : x.code > y.code ? 1 : x.id < y.id ? -1 : x.id > y.id ? 1 : x.detail < y.detail ? -1 : x.detail > y.detail ? 1 : 0;
}

/** Judge a rewrite candidate against the parent graph's protected surface. Pure; applies nothing. */
export function validateRewriteBoundary(candidate: RewriteCandidate, parent: PolicyGraphManifest): RewriteBoundaryValidation {
  const base = { schema: "mw.rewrite-boundary.v0" as const, candidateId: candidate.candidateId };
  if (candidate.parentRevision !== parent.revision) {
    return { ...base, ok: false, writable: [], refusals: [{ code: "REWRITE_PARENT_MISMATCH", id: candidate.candidateId, detail: `candidate ${candidate.candidateId} rewrites revision ${candidate.parentRevision}; the parent given is ${parent.revision}` }] };
  }
  const required = new Set(parent.requiredContracts);
  const refusals: RewriteRefusal[] = [];
  const writable: string[] = [];
  for (const change of candidate.changes) {
    let inside = STRUCTURAL.has(change.kind);
    if (required.has(change.id)) {
      inside = false;
      refusals.push({ code: "REWRITE_TOUCHES_REQUIRED_CONTRACT", id: change.id, detail: `${change.op} of ${change.kind} ${change.id} touches a contract the parent graph requires` });
    }
    if (change.kind === "authority" || change.kind === "verifier" || change.kind === "protocol") {
      inside = false;
      refusals.push({ code: PROTECTED_CODE[change.kind], id: change.id, detail: `${change.op} of ${change.kind} ${change.id} is outside a learned rewrite's writable surface (A12)` });
    } else if (change.kind === "contract" && !required.has(change.id)) {
      inside = false;
      refusals.push({ code: "REWRITE_TOUCHES_REQUIRED_CONTRACT", id: change.id, detail: `${change.op} of contract ${change.id}: contracts are not structure and are outside the writable surface` });
    }
    if (inside) writable.push(`${change.kind}:${change.id}`);
  }
  const declared = new Set(candidate.requiredCertificates);
  for (const contract of [...parent.requiredContracts].sort()) {
    if (!declared.has(contract)) refusals.push({ code: "REWRITE_DROPS_REQUIRED_CERTIFICATE", id: contract, detail: `candidate ${candidate.candidateId} no longer requires ${contract}, which the parent graph requires` });
  }
  writable.sort();
  refusals.sort(compare);
  return { ...base, ok: refusals.length === 0, writable, refusals };
}
