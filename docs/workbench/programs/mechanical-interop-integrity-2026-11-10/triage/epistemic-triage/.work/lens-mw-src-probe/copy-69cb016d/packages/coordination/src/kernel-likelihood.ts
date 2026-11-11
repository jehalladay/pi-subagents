/**
 * Kernel likelihood laws (APO program, 03 "Kernels"): a local policy is a kernel P:(O,M)->Dist(A,M',Trace), and the
 * existing deterministic `Policy.propose` is its Dirac specialization — its own proposal has log-probability 0 and
 * any other proposal is impossible. Sequential sampling follows the chain rule, pi(a,b|o) = pi_P(a|o) pi_Q(b|o,a);
 * a parallel product holds only under conditional independence, and independence is honest: a caller-constructed
 * witness that names who declared it, on what basis and why, never an assumption; a selector contributes its own
 * conditional likelihood to the branch it chose; inhibition is deterministic post-sample suppression that leaves the
 * underlying stochastic choice in evidence; and a shared sampled output is copied, not resampled, so consumers do
 * not multiply its probability. A log-probability is a finite number at most 0 or minus infinity. The two-claim
 * exclusive-lane toy with exact algebra is APO-EAT-R002 (4r3f); these are the general laws. Pure functions over
 * numbers; nothing here samples, learns or mints an identifier.
 */
import type { Intent, Policy, PolicyContext, Proposal } from "./contracts.js";

/** A finite number at most 0, or -Infinity for the impossible. */
export type LogProb = number;

/** Caller-constructed evidence that two kernels are conditionally independent given the observation. */
export interface IndependenceWitness {
  readonly declaredBy: string;
  readonly basis: string;
  readonly reason: string;
}

/** Refuse anything that is not a log-probability. */
export function validateLogProb(value: number, label: string): LogProb {
  if (Number.isNaN(value) || value > 0 || value === Infinity) {
    throw new RangeError(`KERNEL_LOGPROB_INVALID: ${label} = ${String(value)}; a log-probability is a finite number at most 0, or -Infinity`);
  }
  return value;
}

function canonical(value: unknown): string {
  const sort = (input: unknown): unknown => {
    if (Array.isArray(input)) return input.map(sort);
    if (input !== null && typeof input === "object") return Object.fromEntries(Object.keys(input as Record<string, unknown>).sort().map(key => [key, sort((input as Record<string, unknown>)[key])]));
    return input;
  };
  return JSON.stringify(sort(value));
}

/** The Dirac kernel of a deterministic policy: 0 for its own proposal (intents and memory), -Infinity otherwise. */
export function diracLogProb<O, I extends Intent, M>(policy: Policy<O, I, M>, observation: O, memory: M, context: PolicyContext, proposal: Proposal<I, M>): LogProb {
  const own = policy.propose(observation, memory, context);
  return canonical({ intents: own.intents, memory: own.memory }) === canonical({ intents: proposal.intents, memory: proposal.memory }) ? 0 : -Infinity;
}

/** Chain rule: log pi(a,b|o) = log pi_P(a|o) + log pi_Q(b|o,a). */
export function sequentialLogProb(logPa: LogProb, logPbGivenA: LogProb): LogProb {
  return validateLogProb(logPa, "log pi_P(a|o)") + validateLogProb(logPbGivenA, "log pi_Q(b|o,a)");
}

const ASSUMED = /^\s*(assumed|assume|assumption|n\/a|none|default)?\s*$/i;

/** Product of two kernels, only under a caller-constructed independence witness. */
export function parallelLogProb(logPa: LogProb, logPb: LogProb, independence: IndependenceWitness): LogProb {
  const a = validateLogProb(logPa, "log pi_P(a|o)");
  const b = validateLogProb(logPb, "log pi_Q(b|o)");
  if (independence === undefined || independence === null || independence.declaredBy.length === 0 || independence.basis.length === 0 || ASSUMED.test(independence.reason)) {
    throw new Error("KERNEL_INDEPENDENCE_UNWITNESSED: a parallel product needs a caller-constructed independence witness (declaredBy, basis, reason); independence is never assumed");
  }
  return a + b;
}

/** A selector contributes its own conditional likelihood to the branch it chose. */
export function selectorLogProb(logPselect: LogProb, logPbranch: LogProb): LogProb {
  return validateLogProb(logPselect, "log pi_select") + validateLogProb(logPbranch, "log pi_branch");
}

/** Inhibition suppresses after sampling; the underlying choice and its likelihood stay in evidence. */
export function inhibitLogProb(logP: LogProb): LogProb {
  return validateLogProb(logP, "log pi");
}

/** A shared sampled output is copied to its consumers, not resampled; the copies do not multiply its probability. */
export function sharedSampleLogProb(logP: LogProb, copies: number): LogProb {
  if (!Number.isInteger(copies) || copies < 1) throw new RangeError(`KERNEL_SHARED_COPIES_INVALID: ${String(copies)} consumers; a shared sample has at least one`);
  return validateLogProb(logP, "log pi");
}
