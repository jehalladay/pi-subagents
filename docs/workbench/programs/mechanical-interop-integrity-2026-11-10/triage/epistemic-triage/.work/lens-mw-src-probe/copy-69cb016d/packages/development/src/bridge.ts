/**
 * The explicit local-to-global bridge (CAC-WC program, 01 (e) and example 6, claim
 * compose-validate-local-to-global-bridge). Two individual success receipts prove nothing about the
 * composed claim by themselves: the claim must name the bridge — the certificate by which its step-local
 * validations establish it. This validator checks that the named bridge is explicit and total: it
 * establishes this claim, about this pinned basis, covers exactly the local validations present, and every
 * covered validation passed on that same basis. It never infers a bridge, never upgrades a local verdict
 * (only `passed` bridges; partial, unknown and failed do not), and does not judge the certificate's own
 * soundness — that remains the certifier's claim, carried by its evidence reference. Ordinary function over
 * the application-owned contracts; the certificate id and evidence are opaque native references.
 */
import type { EvidenceRef, SubjectBasis, VerificationResult } from "./contracts.js";

/** One step-local validation, named by the step it validates. */
export interface LocalValidation {
  readonly step: string;
  readonly result: VerificationResult;
}

/** The bridge certificate: supplied by the composer, never derived here. */
export interface BridgeCertificate {
  readonly id: string;
  /** The composed claim this certificate establishes. */
  readonly establishes: string;
  /** The steps whose local validations the certificate bridges; must equal the claim's local set. */
  readonly covers: readonly string[];
  readonly basis: SubjectBasis;
  readonly evidence?: EvidenceRef;
}

export interface ComposedClaim {
  readonly id: string;
  readonly basis: SubjectBasis;
  readonly locals: readonly LocalValidation[];
  readonly bridge?: BridgeCertificate;
}

export type BridgeRefusalCode =
  | "BRIDGE_ABSENT"
  | "BRIDGE_CLAIM_MISMATCH"
  | "BRIDGE_BASIS_MISMATCH"
  | "BRIDGE_COVERAGE_MISMATCH"
  | "BRIDGE_LOCAL_BASIS_MISMATCH"
  | "BRIDGE_LOCAL_NOT_PASSED";

export interface BridgeRefusal {
  readonly code: BridgeRefusalCode;
  readonly detail: string;
}

export type BridgeValidation =
  | { readonly established: true; readonly claim: string; readonly bridge: string; readonly locals: readonly string[] }
  | { readonly established: false; readonly refusals: readonly BridgeRefusal[] };

function sameBasis(a: SubjectBasis, b: SubjectBasis): boolean {
  return a.workspaceId === b.workspaceId && a.revision === b.revision;
}

/** Validate that a composed claim names an explicit, total bridge from its local validations. Pure. */
export function validateBridge(claim: ComposedClaim): BridgeValidation {
  const refusals: BridgeRefusal[] = [];
  const bridge = claim.bridge;
  if (bridge === undefined) {
    refusals.push({ code: "BRIDGE_ABSENT", detail: `claim ${claim.id} names no bridge; local success receipts establish nothing global by themselves` });
  } else {
    if (bridge.establishes !== claim.id) {
      refusals.push({ code: "BRIDGE_CLAIM_MISMATCH", detail: `bridge ${bridge.id} establishes ${bridge.establishes}, not ${claim.id}` });
    }
    if (!sameBasis(bridge.basis, claim.basis)) {
      refusals.push({ code: "BRIDGE_BASIS_MISMATCH", detail: `bridge ${bridge.id} is about ${bridge.basis.workspaceId}@${bridge.basis.revision}, the claim about ${claim.basis.workspaceId}@${claim.basis.revision}` });
    }
    const covered = new Set(bridge.covers);
    const present = new Set(claim.locals.map(local => local.step));
    const missing = [...present].filter(step => !covered.has(step)).sort();
    const extra = [...covered].filter(step => !present.has(step)).sort();
    if (missing.length > 0) refusals.push({ code: "BRIDGE_COVERAGE_MISMATCH", detail: `missing ${missing.join(" ")}` });
    if (extra.length > 0) refusals.push({ code: "BRIDGE_COVERAGE_MISMATCH", detail: `extra ${extra.join(" ")}` });
  }
  for (const local of claim.locals) {
    if (!sameBasis(local.result.basis, claim.basis)) {
      refusals.push({ code: "BRIDGE_LOCAL_BASIS_MISMATCH", detail: `${local.step} validated ${local.result.basis.workspaceId}@${local.result.basis.revision}, not ${claim.basis.workspaceId}@${claim.basis.revision}` });
    }
    if (local.result.verdict !== "passed") {
      refusals.push({ code: "BRIDGE_LOCAL_NOT_PASSED", detail: `${local.step} ${local.result.verdict}` });
    }
  }
  if (refusals.length > 0) {
    refusals.sort((a, b) => a.code.localeCompare(b.code) || a.detail.localeCompare(b.detail));
    return { established: false, refusals };
  }
  return { established: true, claim: claim.id, bridge: bridge!.id, locals: claim.locals.map(local => local.step) };
}
