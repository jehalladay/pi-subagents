/**
 * Pure coordination policy contract (collective-adaptation M0, MWCOL-001/002, docs/programs/collective-adaptation-2026-10-16).
 *
 * A policy is a synchronous transducer from an immutable observation, a local memory and a context to a proposal.
 * The signature is the whole effect surface: no service, callback, promise or process reaches a policy, so
 * evaluating one cannot write a file, launch a worker or publish state. A proposal carries *intents*, never
 * effects; whether an intent may become an effect is decided by `reconcile` (admissibility) and then by the host
 * that owns native authority (Furnace, Beads, Forge, Git), which executes and reports receipts.
 */

/** The pinned input basis every observation, intent and resolution is judged against. */
export interface Basis {
  readonly workspaceId: string;
  readonly revision: string;
}

/** Aggregate caps a batch of admitted intents must stay within; every dimension is a plain non-negative number. */
export interface Budget {
  readonly compute: number;
  readonly workers: number;
  readonly queue: number;
  readonly latencyMs: number;
}

/** What one intent claims of the budget if admitted; same dimensions as the budget. */
export type ResourceClaim = Budget;

/** A policy observes and proposes; it never holds effect authority. */
export type PolicyAuthority = "observation-only" | "propose-only";

/** What an intent declares about itself; a policy's intent may only ever be `propose-only`. */
export type IntentAuthority = "propose-only" | "authorized-effect";

/** Everything a policy may know about the episode beyond the observation; carried verbatim into traces. */
export interface PolicyContext {
  readonly episodeId: string;
  readonly actorId: string;
  /** `digest` of the observation the policy is evaluated on. */
  readonly observationDigest: string;
  readonly budget: Budget;
  readonly authority: PolicyAuthority;
  readonly policyRevision: string;
  /** Controlled seed: a deterministic policy ignores it or derives every random choice from it. */
  readonly seed: number;
}

/** The subject an intent proposes to act on. */
export interface Target {
  readonly kind: string;
  readonly uri: string;
}

/** A proposed effect. Admitting it is the resolver's job; executing it is the host's. */
export interface Intent {
  readonly intentId: string;
  readonly policyId: string;
  readonly target: Target;
  /** The subject revision the intent was proposed against; a different basis makes it stale. */
  readonly expectedRevision: string;
  readonly effect: string;
  readonly claim: ResourceClaim;
  readonly evidenceRefs: readonly string[];
  readonly writeScopes: readonly string[];
  readonly readScopes: readonly string[];
  /** Absent means `propose-only`; `authorized-effect` is refused by the resolver. */
  readonly authority?: IntentAuthority;
}

/** One line of a policy's pure trace: data, not a log sink. */
export interface TraceEvent {
  readonly kind: string;
  readonly policyId: string;
  readonly detail: string;
}

/** What a policy returns: intents, its next memory and the trace of how it got there. */
export interface Proposal<I extends Intent, M> {
  readonly intents: readonly I[];
  readonly memory: M;
  readonly trace: readonly TraceEvent[];
}

/** The pure policy port: typed by its observation and intent types. */
export interface Policy<O, I extends Intent, M> {
  readonly id: string;
  readonly revision: string;
  propose(observation: O, memory: M, context: PolicyContext): Proposal<I, M>;
}
