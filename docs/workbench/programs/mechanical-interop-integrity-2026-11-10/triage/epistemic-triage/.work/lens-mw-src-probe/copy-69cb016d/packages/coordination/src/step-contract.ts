/**
 * The per-step contract record (CAC-WC program, 01 "Workflow Contract Design and Validation", claim
 * step-contract-exposure-surface). A step contract is derived from an intent and the context it was proposed
 * in — never authored — so it exposes exactly what the native contracts already carry: typed I/O (the
 * observation digest and expected revision in, the target and effect out), effect scope (the intent's declared
 * write and read scopes), authority (a policy's intent is propose-only; `authorized-effect` is refused here
 * exactly where the resolver refuses it), the verifier and evidence references, and retry/idempotency as the
 * explicit unknown unless the caller names the producer's native contract — no producer at HEAD exposes an
 * effect-idempotency contract, so nothing defaults to "idempotent" or "retryable". Identity reuses the native
 * identifiers (intent id, policy id and revision); the derivation mints no authoritative id of its own, and the
 * reference-field discipline (which identifiers a caller may name) is CACWC-EAT-R011, not this record. Per
 * docs/11 D-01 this is an ordinary function over existing records, not a DSL.
 */
import type { Intent, PolicyContext, Target } from "./contracts.js";
import type { Maybe } from "./episode.js";
import { UNKNOWN } from "./episode.js";

export interface StepContract {
  readonly schema: "mw.step-contract.v0";
  /** Native identifiers reused verbatim; nothing new is minted. */
  readonly step: { readonly intentId: string; readonly policyId: string; readonly policyRevision: string };
  /** What the step observed and the subject revision it proposed against. */
  readonly input: { readonly observationDigest: string; readonly expectedRevision: string };
  /** What the step proposes to do, and to what. */
  readonly output: { readonly target: Target; readonly effect: string };
  readonly effectScope: { readonly write: readonly string[]; readonly read: readonly string[] };
  readonly authority: "propose-only";
  /** The producer's native retry/idempotency contract when the caller names one; the explicit unknown otherwise. */
  readonly retry: Maybe<string>;
  /** The verifier predicate reference when the caller names one; the explicit unknown otherwise. */
  readonly verifier: Maybe<string>;
  readonly evidenceRefs: readonly string[];
}

export interface StepContractOptions {
  readonly verifier?: string;
  readonly retryContract?: string;
}

/** Derive the step contract of one intent proposed in one context. Pure; refuses an intent that claims effect authority. */
export function stepContractOf(intent: Intent, context: PolicyContext, options: StepContractOptions = {}): StepContract {
  if (intent.authority !== undefined && intent.authority !== "propose-only") {
    throw new Error(`STEP_CONTRACT_AUTHORITY_EXCEEDED: intent ${intent.intentId} declares ${intent.authority}; a policy's step may only propose`);
  }
  return {
    schema: "mw.step-contract.v0",
    step: { intentId: intent.intentId, policyId: intent.policyId, policyRevision: context.policyRevision },
    input: { observationDigest: context.observationDigest, expectedRevision: intent.expectedRevision },
    output: { target: { kind: intent.target.kind, uri: intent.target.uri }, effect: intent.effect },
    effectScope: { write: [...intent.writeScopes], read: [...intent.readScopes] },
    authority: "propose-only",
    retry: options.retryContract ?? UNKNOWN,
    verifier: options.verifier ?? UNKNOWN,
    evidenceRefs: [...intent.evidenceRefs],
  };
}
