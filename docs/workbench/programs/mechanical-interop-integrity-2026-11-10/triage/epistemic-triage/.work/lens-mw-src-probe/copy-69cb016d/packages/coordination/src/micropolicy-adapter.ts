/**
 * MicroPolicy decision adapter (APO 08, MechanicalWorkflows-iakc; vocabulary pinned to the
 * vendored micropolicy.decision-receipt.v1 by MechanicalWorkflows-8w9j). Edge code: MW core
 * imports no MicroPolicy package — the decision receipt arrives as a value (injected,
 * precomputed outside any pure Policy.propose) or through a caller-provided sampling function.
 * The adapter verifies the model checkpoint against the pinned one BEFORE sampling, verifies
 * the selected action against the receipt's recorded eligible support BEFORE building an
 * intent, and only then maps the symbolic action to exactly one propose-only Intent at the
 * pinned basis revision and hands it to the caller-provided reconcile. A mismatch is a
 * refusal, never a silent resample.
 *
 * The receipt types below model the CONSUMED SUBSET of decision-receipt.v1 (vendored with
 * provenance at schema/vendor/micropolicy); every field name must exist in that schema, and
 * test/micropolicy-contract.test.ts fails the build when one does not.
 */
import type { Basis, Budget, Intent, Proposal, ResourceClaim, Target } from "./contracts.js";
import type { Resolution, ResolverInput } from "./resolver.js";

/** selection.choices[]: the pre-sampling legal support recorded at decision time. */
export interface MicroPolicyDecisionChoice {
  readonly action: string;
  readonly eligible: boolean;
  /** FP64 bit word (16 hex) when the backend reports one. */
  readonly probability?: string | undefined;
}

/** selection.rng: the deterministic draw record. */
export interface MicroPolicyDecisionRng {
  readonly algorithm: string;
  readonly seed: number;
  readonly draw: number;
}

/** The consumed subset of decision-receipt.v1 $defs.selection. */
export interface MicroPolicyDecisionSelection {
  readonly choices: readonly MicroPolicyDecisionChoice[];
  readonly action: string;
  readonly rng?: MicroPolicyDecisionRng | undefined;
  /** FP64 bit words (16 hex): exact behavior probability and log probability. */
  readonly probability: string;
  readonly logProbability: string;
}

/** The consumed subset of micropolicy.decision-receipt.v1 at the vendored pin. */
export interface MicroPolicyDecisionReceipt {
  readonly schema: "micropolicy.decision-receipt.v1";
  readonly decisionId: string;
  readonly backend: string;
  readonly programDigest: string;
  readonly checkpointDigest: string;
  readonly selection: MicroPolicyDecisionSelection;
}

export interface MicroPolicyActionSpec {
  readonly target: Target;
  readonly effect: string;
  readonly claim: ResourceClaim;
  readonly evidenceRefs: readonly string[];
  readonly writeScopes: readonly string[];
  readonly readScopes: readonly string[];
}

export interface MicroPolicyAdapterInput {
  readonly basis: Basis;
  readonly budget: Budget;
  readonly protectedScopes: readonly string[];
  readonly policyId: string;
  /** The checkpoint the caller pinned for this decision; anything else is a refusal. */
  readonly pinnedCheckpoint: string;
  /** The loaded model's checkpoint, known before any sampling (direct mode). */
  readonly capability: { readonly checkpointDigest: string };
  /** Injected precomputed decision. When present it IS the decision; sampleDecision is never called. */
  readonly receipt?: MicroPolicyDecisionReceipt | undefined;
  /** Direct-mode sampler, used only when no receipt is injected. */
  readonly sampleDecision?: (() => MicroPolicyDecisionReceipt) | undefined;
  /** Maps the selected symbolic action to the intent surface. */
  readonly action: (action: string) => MicroPolicyActionSpec;
  /** The resolver seam; a refusal provably never reaches it. */
  readonly reconcile: (input: ResolverInput) => Resolution;
}

export type MicroPolicyAdapterOutcome =
  | { readonly kind: "refused"; readonly code: "ADAPTER_CHECKPOINT_MISMATCH" | "ADAPTER_CHOICE_NOT_IN_SUPPORT" | "ADAPTER_RECEIPT_INVALID" | "ADAPTER_SAMPLER_ABSENT"; readonly detail: string }
  | { readonly kind: "proposed"; readonly intent: Intent; readonly receipt: MicroPolicyDecisionReceipt; readonly resolution: Resolution };

const refuse = (code: Extract<MicroPolicyAdapterOutcome, { kind: "refused" }>["code"], detail: string): MicroPolicyAdapterOutcome => ({ kind: "refused", code, detail });

const F64_WORD = /^[0-9a-f]{16}$/;

function receiptInvalid(receipt: MicroPolicyDecisionReceipt): string | null {
  if (receipt.schema !== "micropolicy.decision-receipt.v1") return `unsupported schema ${String(receipt.schema)}`;
  if (receipt.decisionId.trim().length === 0) return "blank decision id";
  const selection = receipt.selection;
  if (selection.choices.length === 0) return "empty action support";
  if (selection.action.trim().length === 0) return "blank selected action";
  if (new Set(selection.choices.map(choice => choice.action)).size !== selection.choices.length) return "duplicate choice actions";
  for (const choice of selection.choices) {
    if (choice.action.trim().length === 0) return "blank choice action";
    if (choice.probability !== undefined && !F64_WORD.test(choice.probability)) return `malformed probability word for ${choice.action}`;
  }
  if (!F64_WORD.test(selection.probability)) return "malformed selection probability word";
  if (!F64_WORD.test(selection.logProbability)) return "malformed selection logProbability word";
  return null;
}

/** One decision, one intent, or one named refusal. Never resamples, never retries. */
export function adaptMicroPolicyDecision(input: MicroPolicyAdapterInput): MicroPolicyAdapterOutcome {
  if (input.capability.checkpointDigest !== input.pinnedCheckpoint) {
    return refuse("ADAPTER_CHECKPOINT_MISMATCH", `capability checkpoint ${input.capability.checkpointDigest} is not the pinned ${input.pinnedCheckpoint}`);
  }
  let receipt: MicroPolicyDecisionReceipt;
  if (input.receipt !== undefined) {
    receipt = input.receipt;
    if (receipt.checkpointDigest !== input.pinnedCheckpoint) {
      return refuse("ADAPTER_CHECKPOINT_MISMATCH", `receipt checkpoint ${receipt.checkpointDigest} is not the pinned ${input.pinnedCheckpoint}; a mismatch is a refusal, never a resample`);
    }
  } else {
    if (input.sampleDecision === undefined) return refuse("ADAPTER_SAMPLER_ABSENT", "no injected receipt and no sampling function");
    receipt = input.sampleDecision();
    if (receipt.checkpointDigest !== input.pinnedCheckpoint) {
      return refuse("ADAPTER_CHECKPOINT_MISMATCH", `sampled receipt checkpoint ${receipt.checkpointDigest} is not the pinned ${input.pinnedCheckpoint}`);
    }
  }
  const invalid = receiptInvalid(receipt);
  if (invalid !== null) return refuse("ADAPTER_RECEIPT_INVALID", invalid);
  const selection = receipt.selection;
  const support = new Set(selection.choices.filter(choice => choice.eligible).map(choice => choice.action));
  if (!support.has(selection.action)) {
    return refuse("ADAPTER_CHOICE_NOT_IN_SUPPORT", `selected ${selection.action} is outside the recorded support {${[...support].sort().join(", ")}}`);
  }
  const spec = input.action(selection.action);
  const intent: Intent = {
    intentId: `${input.policyId}:mp:${receipt.decisionId}:${selection.action}`,
    policyId: input.policyId,
    target: { ...spec.target },
    expectedRevision: input.basis.revision,
    effect: spec.effect,
    claim: { ...spec.claim },
    evidenceRefs: [...spec.evidenceRefs],
    writeScopes: [...spec.writeScopes],
    readScopes: [...spec.readScopes],
  };
  const proposal: Proposal<Intent, null> = { intents: [intent], memory: null, trace: [] };
  const resolution = input.reconcile({ basis: input.basis, budget: input.budget, protectedScopes: input.protectedScopes, proposals: [proposal] });
  return { kind: "proposed", intent, receipt, resolution };
}
