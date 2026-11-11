/**
 * Composition-time validation of each step's checkpoint and retry declaration (CAC-WC program, 01 "Workflow
 * Contract Design and Validation", claim compose-validate-checkpoint-retry-semantics). The runtime half is
 * CACWC-EAT-R013: after a verification whose external effect outcome is uncertain the executor returns
 * indeterminate and leaves retry to the native host. This record is its composition-time face. A step's
 * checkpoint is the input pin it already carries (observation digest and expected revision); a step without
 * one has nothing to resume from. A step's retry declaration is either the explicit unknown (admissible: retry
 * is the native host's) or a reference naming a producer and its native contract (`producer:contract`,
 * carried verbatim). It is never a self-declared property: no producer at HEAD exposes an effect-idempotency
 * contract (the program keeps that CONTESTED), so "idempotent", "retryable", "exactly-once" and their kin —
 * bare, or behind a producer as in `effect:idempotent` — are refused rather than believed. And no declaration
 * changes what happens on an uncertain outcome: every step is indeterminate; nothing here re-dispatches. Per
 * docs/11 D-01 this is an ordinary pure function over existing records.
 */
import type { Maybe } from "./episode.js";
import { UNKNOWN } from "./episode.js";
import type { StepContract } from "./step-contract.js";

export type RecoveryRefusalCode = "STEP_RETRY_SELF_DECLARED" | "STEP_CHECKPOINT_UNPINNED";

export interface RecoveryRefusal {
  readonly code: RecoveryRefusalCode;
  readonly intentId: string;
  readonly detail: string;
}

export interface StepRecoveryDeclaration {
  readonly intentId: string;
  /** The step's input pin: what it observed and the revision it proposed against. */
  readonly checkpoint: { readonly observationDigest: string; readonly expectedRevision: string };
  /** The producer's native retry contract reference verbatim, or the explicit unknown. */
  readonly retry: Maybe<string>;
  /** Fixed by R013: an uncertain external effect outcome is reported, never re-dispatched here. */
  readonly onUncertain: "indeterminate";
}

export interface RecoveryDeclarationsInput {
  readonly steps: readonly StepContract[];
}

export interface RecoveryDeclarations {
  readonly schema: "mw.recovery-declarations.v0";
  readonly ok: boolean;
  readonly steps: readonly StepRecoveryDeclaration[];
  readonly refusals: readonly RecoveryRefusal[];
}

/** Words that assert a retry or idempotency property instead of naming a native contract. */
const CLAIM_WORDS: ReadonlySet<string> = new Set([
  "idempotent", "idempotency", "retryable", "retry", "safe", "safe-to-retry", "at-most-once", "at-least-once", "exactly-once", "redispatch", "re-dispatch", "auto-retry",
]);
const PRODUCER = /^[a-z][a-z0-9-]*$/;
const CONTRACT = /^[a-z0-9][a-z0-9._-]*$/;

function selfDeclared(reference: string): string | undefined {
  const colon = reference.indexOf(":");
  if (colon < 0) return `${JSON.stringify(reference)} is a bare word, not a producer:contract reference`;
  const producer = reference.slice(0, colon);
  const contract = reference.slice(colon + 1);
  if (!PRODUCER.test(producer)) return `${JSON.stringify(reference)} names no producer before the colon`;
  if (!CONTRACT.test(contract)) return `${JSON.stringify(reference)} names no contract after the colon`;
  if (CLAIM_WORDS.has(contract.toLowerCase()) || CLAIM_WORDS.has(producer.toLowerCase())) return `${JSON.stringify(reference)} asserts a property instead of naming a native contract`;
  return undefined;
}

/** Validate the checkpoint and retry declaration of every step. Pure; never re-dispatches anything. */
export function validateRecoveryDeclarations(input: RecoveryDeclarationsInput): RecoveryDeclarations {
  const steps: StepRecoveryDeclaration[] = [];
  const refusals: RecoveryRefusal[] = [];
  for (const step of input.steps) {
    const intentId = step.step.intentId;
    const { observationDigest, expectedRevision } = step.input;
    if (observationDigest.length === 0 || expectedRevision.length === 0) {
      refusals.push({ code: "STEP_CHECKPOINT_UNPINNED", intentId, detail: `step ${intentId} carries no checkpoint to resume from: observation digest ${JSON.stringify(observationDigest)}, expected revision ${JSON.stringify(expectedRevision)}` });
      continue;
    }
    if (step.retry !== UNKNOWN) {
      const problem = selfDeclared(step.retry);
      if (problem !== undefined) {
        refusals.push({ code: "STEP_RETRY_SELF_DECLARED", intentId, detail: `step ${intentId}: ${problem}; no producer at HEAD exposes an effect-idempotency contract, so a retry declaration names a native contract or stays the explicit unknown` });
        continue;
      }
    }
    steps.push({ intentId, checkpoint: { observationDigest, expectedRevision }, retry: step.retry, onUncertain: "indeterminate" });
  }
  steps.sort((x, y) => (x.intentId < y.intentId ? -1 : x.intentId > y.intentId ? 1 : 0));
  refusals.sort((x, y) => (x.code < y.code ? -1 : x.code > y.code ? 1 : x.intentId < y.intentId ? -1 : x.intentId > y.intentId ? 1 : 0));
  return { schema: "mw.recovery-declarations.v0", ok: refusals.length === 0, steps, refusals };
}
