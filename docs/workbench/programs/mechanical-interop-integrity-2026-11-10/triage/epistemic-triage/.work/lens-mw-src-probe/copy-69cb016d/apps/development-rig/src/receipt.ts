/**
 * Non-authoritative projection of a completed local development invocation.
 * This is NOT a Run store, a gate, an SDK result or a durable execution record.
 * Native identities stay namespaced by their producers; absent stages stay absent.
 */
import type { SubjectBasis } from "@mechanical/workflows-development";
import type { LiveDevelopmentResult } from "./live-development.js";

export type ReceiptState = "established" | "observed" | "unknown" | "not_run";
export interface ReceiptRef { readonly system: string; readonly kind: string; readonly id: string }
export interface ReceiptStage { readonly state: ReceiptState; readonly ref?: ReceiptRef; readonly reason?: string }
export interface DevelopmentReceipt {
  readonly schema: "mechanical-workflows/development-receipt/v1";
  /** Descriptive only: do not use this in place of the workflow domain outcome. */
  readonly outcome: "verified_candidate" | "verification_failed" | "needs_evidence" | "indeterminate";
  readonly basis: { readonly base: SubjectBasis | null; readonly candidate: SubjectBasis | null };
  readonly stages: {
    readonly discovery: ReceiptStage;
    readonly context: ReceiptStage;
    readonly agent: ReceiptStage;
    readonly review: ReceiptStage;
    readonly candidate: ReceiptStage;
    readonly verification: ReceiptStage;
    readonly furnace: ReceiptStage;
  };
}

function nativeRef(operationId: string | null): ReceiptRef | undefined {
  return operationId ? { system: "forge", kind: "operation", id: operationId } : undefined;
}
function stage(state: ReceiptState, ref?: ReceiptRef, reason?: string): ReceiptStage {
  return { state, ...(ref ? { ref } : {}), ...(reason ? { reason } : {}) };
}

/** No I/O or state: a consumer can reproduce this from its original LiveDevelopmentResult. */
export function receiptOf(result: LiveDevelopmentResult): DevelopmentReceipt {
  const workflow = result.workflow;
  const candidate = workflow.kind === "verified_candidate" || workflow.kind === "verification_failed"
    ? workflow.candidate : null;
  const base = candidate?.parentBasis ?? (workflow.kind === "needs_evidence" ? workflow.scope.basis : null);
  const agent = result.agent;
  const gate = result.forge;
  const gateRef = gate ? nativeRef(gate.operationId) : undefined;
  const candidateMatches = candidate !== null && gate !== null && gate.basis.commit === candidate.basis.revision;
  const establishedPass = candidateMatches && gate?.kind === "passed" && !!gateRef && workflow.kind === "verified_candidate";
  const establishedFailure = candidateMatches && gate?.kind === "failed" && !!gateRef && workflow.kind === "verification_failed";
  const outcome = establishedPass ? "verified_candidate" : establishedFailure ? "verification_failed"
    : workflow.kind === "needs_evidence" ? "needs_evidence" : "indeterminate";
  const verification = gate === null ? stage("not_run")
    : gateRef ? stage(establishedPass || establishedFailure ? "established" : "observed", gateRef, gate.reason)
      : stage("unknown", undefined, gate.reason);
  const discoveryRef: ReceiptRef | undefined = workflow.kind === "needs_evidence" && workflow.scope.evidence
    ? workflow.scope.evidence : undefined;
  return {
    schema: "mechanical-workflows/development-receipt/v1",
    outcome,
    basis: { base, candidate: candidate?.basis ?? null },
    stages: {
      discovery: workflow.kind === "needs_evidence" ? stage("unknown", discoveryRef, "SCOPE_INCOMPLETE")
        : stage("observed", undefined, "GIT_TRACKED_FILE_CENSUS_NOT_HX_TASK_SCOPE"),
      context: workflow.kind === "needs_evidence" ? stage("not_run")
        : result.context === "reactive-fiber"
          ? result.contextEvidence?.system === "reactive-fiber" && result.contextEvidence.kind === "render" && !!result.contextEvidence.id
            ? stage("established", result.contextEvidence, "RF_RENDER_BOUND_TO_TASK_BASIS")
            : stage("unknown", undefined, "RF_RENDER_EVIDENCE_MISSING")
          : stage("observed", undefined, "PLAIN_CONTEXT_NOT_RF_RENDER"),
      agent: agent ? stage("observed", { system: "claude-agent-sdk", kind: "session", id: agent.sessionId }) : stage("not_run"),
      review: result.review
        ? result.review.verdict === "approved" || result.review.verdict === "rejected"
          ? result.review.evidence?.id && result.review.evidence.system === "claude-agent-sdk"
            ? stage("observed", result.review.evidence, "REVIEW_IS_NOT_FORGE_VERIFICATION")
            : stage("unknown", undefined, "REVIEW_EVIDENCE_MISSING")
          : stage("unknown", undefined, result.review.reason ?? "REVIEW_NOT_ESTABLISHED")
        : stage("not_run"),
      candidate: candidate ? stage("established", { system: "git", kind: "commit", id: candidate.basis.revision }, "GIT_COMMITTED_BASIS") : stage("not_run"),
      verification,
      furnace: stage("not_run", undefined, "LOCAL_HOST_NOT_FURNACE"),
    },
  };
}
