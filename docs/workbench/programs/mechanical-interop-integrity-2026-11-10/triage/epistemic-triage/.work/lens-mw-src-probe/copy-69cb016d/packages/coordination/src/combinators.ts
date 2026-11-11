import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal, TraceEvent } from "./contracts.js";
import { reconcile } from "./resolver.js";
import type { Resolution } from "./resolver.js";

/**
 * Composition operators of `06-coordination-policy-algebra.md` (MWCOL-002), each a pure policy over pure policies.
 * None of them reconciles, authorizes or executes: `parallel` collects both proposals and leaves every scope
 * interference for `reconcile` to refuse; `inhibit` only removes proposals and can never add admissibility.
 * `repeated` is the sixth operator (`Repeated P*`): a bounded reactive option. Time enters only as a repeat count
 * and a hysteresis hold carried in the operator's own memory, so it stays pure; it never reads a clock.
 */

/** What the second policy of a `sequential` composition observes: the shared observation and P's pure output. */
export interface SequentialObservation<O, I extends Intent, M> {
  readonly observation: O;
  readonly prior: Proposal<I, M>;
}

/** A declared, versioned guard over P's proposal; the trace names it whichever way it decides. */
export interface Guard<I extends Intent, M> {
  readonly id: string;
  readonly revision: string;
  accept(proposal: Proposal<I, M>): boolean;
}

/** A declared, versioned selector between two alternatives; the selection is always logged. */
export interface Selector<O> {
  readonly id: string;
  readonly revision: string;
  select(observation: O, context: PolicyContext): "left" | "right";
}

function revisionOf(...parts: readonly { readonly id: string; readonly revision: string }[]): string {
  return parts.map(part => `${part.id}@${part.revision}`).join(";");
}

/**
 * Type compatibility is validated at composition time by these generics (CAC-WC 01 (a)). The predecessor's
 * memory type is the contract: every position that consumes it (a successor's observation, a guard, a repeat
 * spec) is `NoInfer`, because tsc drops a `null` inference candidate when another candidate exists and would
 * otherwise let the consumer decide the memory type instead of P.
 */
/** P ; Q — Q observes P's validated pure output under the common pinned basis; intents and traces concatenate. */
export function sequential<O, I extends Intent, MP, MQ>(
  p: Policy<O, I, MP>,
  q: Policy<SequentialObservation<O, I, NoInfer<MP>>, I, MQ>,
): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id};${q.id}`;
  return {
    id, revision: revisionOf(p, q),
    propose(observation, [mp, mq], context) {
      const first = p.propose(observation, mp, context);
      const second = q.propose({ observation, prior: first }, mq, context);
      const mark: TraceEvent = { kind: "sequential", policyId: id, detail: `${p.id} then ${q.id}` };
      return { intents: [...first.intents, ...second.intents], memory: [first.memory, second.memory], trace: [...first.trace, ...second.trace, mark] };
    },
  };
}

/** What the successor of an accepted sequential composition observes: the shared observation, P's ACCEPTED
 * output as its prior, and the resolution that accepted it. */
export interface AcceptedSequentialObservation<O, I extends Intent, M> {
  readonly observation: O;
  readonly prior: Proposal<I, M>;
  readonly resolution: Resolution;
}

/** The pinned basis, budget and protected scopes an accepted sequential composition validates P's output against. */
export interface SequentialAcceptance {
  readonly basis: Basis;
  readonly budget: Budget;
  readonly protectedScopes: readonly string[];
}

/** P ;! Q — the accepted sequential composition (tw-sequential-composition-condition, shared with the CAC-WC
 * post-establishes-pre condition): Q's input follows from P's output ACCEPTED on the same pinned basis. P's
 * proposal is reconciled against the acceptance before Q runs, Q observes only the admitted intents plus the
 * resolution, and every rejected P intent is traced as `sequential-rejected` and dropped. Acceptance here filters
 * Q's input only; the composed output still meets the host's resolver on its own. The plain `sequential` is
 * unchanged and still performs no acceptance. */
export function sequentialAccepted<O, I extends Intent, MP, MQ>(
  p: Policy<O, I, MP>,
  q: Policy<AcceptedSequentialObservation<O, I, NoInfer<MP>>, I, MQ>,
  acceptance: SequentialAcceptance,
): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id};!${q.id}`;
  return {
    id, revision: revisionOf(p, q),
    propose(observation, [mp, mq], context) {
      const first = p.propose(observation, mp, context);
      const resolution = reconcile({ basis: acceptance.basis, budget: acceptance.budget, protectedScopes: acceptance.protectedScopes, proposals: [first] });
      const accepted = resolution.admitted as readonly I[];
      const marks: TraceEvent[] = [
        { kind: "sequential-accepted", policyId: id, detail: `${p.id} accepted ${accepted.length} of ${first.intents.length} for ${q.id}` },
        ...resolution.rejected.map(rejection => ({ kind: "sequential-rejected", policyId: id, detail: `${rejection.intent.intentId} ${rejection.code}` })),
      ];
      const second = q.propose({ observation, prior: { intents: accepted, memory: first.memory, trace: first.trace }, resolution }, mq, context);
      const mark: TraceEvent = { kind: "sequential", policyId: id, detail: `${p.id} then ${q.id} over accepted output` };
      return { intents: [...accepted, ...second.intents], memory: [first.memory, second.memory], trace: [...first.trace, ...marks, ...second.trace, mark] };
    },
  };
}

/** P || Q — both evaluated independently on the same observation; proposals are collected, never reconciled here. */
export function parallel<O, I extends Intent, MP, MQ>(p: Policy<O, I, MP>, q: Policy<O, I, MQ>): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id}||${q.id}`;
  return {
    id, revision: revisionOf(p, q),
    propose(observation, [mp, mq], context) {
      const left = p.propose(observation, mp, context);
      const right = q.propose(observation, mq, context);
      const mark: TraceEvent = { kind: "parallel", policyId: id, detail: `${p.id} with ${q.id}` };
      return { intents: [...left.intents, ...right.intents], memory: [left.memory, right.memory], trace: [...left.trace, ...right.trace, mark] };
    },
  };
}

/** Evidence a witnessed guard carries: a reference and the observation digest it was taken against.
 * Structurally distinct from the exit-report liveWitness ({available, reference}): a guard witness is
 * evidence bound to the pinned basis, never an availability probe. */
export interface GuardWitness {
  readonly reference: string;
  readonly observationDigest: string;
}

/** A declared, versioned guard that must produce a witness to accept; no witness, no acceptance. */
export interface WitnessedGuard<I extends Intent, M> {
  readonly id: string;
  readonly revision: string;
  witnessOf(proposal: Proposal<I, M>, context: PolicyContext): GuardWitness | null;
}

/** P ?▷ Q — the witnessed guarded composition (tw-guarded-composition-condition): Q is evaluated only
 * when the guard carries a witness valid at the pinned basis (the context's observation digest, with a
 * non-empty reference). The guard authorizes no effects: it gates and traces, and every intent passes
 * through untouched, so no intent can gain authority here. */
export function guardedWithWitness<O, I extends Intent, MP, MQ>(p: Policy<O, I, MP>, guard: WitnessedGuard<I, NoInfer<MP>>, q: Policy<O, I, MQ>): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id}?${q.id}`;
  return {
    id, revision: revisionOf(p, guard, q),
    propose(observation, [mp, mq], context) {
      const first = p.propose(observation, mp, context);
      const named = `${guard.id}@${guard.revision}`;
      const witness = guard.witnessOf(first, context);
      if (witness === null || witness.observationDigest !== context.observationDigest || witness.reference.trim() === "") {
        const refusal = witness === null ? "witness-absent"
          : witness.observationDigest !== context.observationDigest ? "witness-stale"
          : "witness-unreferenced";
        return { intents: first.intents, memory: [first.memory, mq], trace: [...first.trace, { kind: "guard-rejected", policyId: id, detail: `${named} ${refusal}` }] };
      }
      const second = q.propose(observation, mq, context);
      return {
        intents: [...first.intents, ...second.intents], memory: [first.memory, second.memory],
        trace: [...first.trace, { kind: "guard-accepted", policyId: id, detail: `${named} witness ${witness.reference}` }, ...second.trace],
      };
    },
  };
}

/** P ▷ Q — Q is evaluated only when the declared guard accepts P's proposal; otherwise Q's memory is untouched. */
export function guarded<O, I extends Intent, MP, MQ>(p: Policy<O, I, MP>, guard: Guard<I, NoInfer<MP>>, q: Policy<O, I, MQ>): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id}>${q.id}`;
  return {
    id, revision: revisionOf(p, guard, q),
    propose(observation, [mp, mq], context) {
      const first = p.propose(observation, mp, context);
      const named = `${guard.id}@${guard.revision}`;
      if (!guard.accept(first)) {
        return { intents: first.intents, memory: [first.memory, mq], trace: [...first.trace, { kind: "guard-rejected", policyId: id, detail: named }] };
      }
      const second = q.propose(observation, mq, context);
      return {
        intents: [...first.intents, ...second.intents], memory: [first.memory, second.memory],
        trace: [...first.trace, { kind: "guard-accepted", policyId: id, detail: named }, ...second.trace],
      };
    },
  };
}

/** P ⊕ Q — exactly one policy runs, chosen by a declared versioned selector; the choice is the first trace line. */
export function alternative<O, I extends Intent, MP, MQ>(p: Policy<O, I, MP>, q: Policy<O, I, MQ>, selector: Selector<O>): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id}+${q.id}`;
  return {
    id, revision: revisionOf(p, q, selector),
    propose(observation, [mp, mq], context) {
      const choice = selector.select(observation, context);
      const mark: TraceEvent = { kind: "alternative-selected", policyId: id, detail: `${choice} by ${selector.id}@${selector.revision}` };
      if (choice === "left") {
        const left = p.propose(observation, mp, context);
        return { intents: left.intents, memory: [left.memory, mq], trace: [mark, ...left.trace] };
      }
      const right = q.propose(observation, mq, context);
      return { intents: right.intents, memory: [mp, right.memory], trace: [mark, ...right.trace] };
    },
  };
}

/** An intent of P that asks to suppress Q's writes on one scope: effect `inhibit`, target kind `scope`. */
function isInhibition(intent: Intent): boolean {
  return intent.effect === "inhibit" && intent.target.kind === "scope";
}

/**
 * P -| Q — an evidence-backed inhibition from P removes Q's intents that write the named scope. Removal is all it
 * does: it cannot admit, authorize or exempt anything, so every survivor still meets the resolver and the host.
 * An inhibition without evidence is ignored and traced as such.
 */
export function inhibit<O, I extends Intent, MP, MQ>(p: Policy<O, I, MP>, q: Policy<O, I, MQ>): Policy<O, I, readonly [MP, MQ]> {
  const id = `${p.id}-|${q.id}`;
  return {
    id, revision: revisionOf(p, q),
    propose(observation, [mp, mq], context) {
      const control = p.propose(observation, mp, context);
      const subject = q.propose(observation, mq, context);
      const trace: TraceEvent[] = [...control.trace, ...subject.trace];
      let remaining: readonly I[] = subject.intents;
      for (const inhibition of control.intents.filter(isInhibition)) {
        const scope = inhibition.target.uri;
        if (inhibition.evidenceRefs.length === 0) {
          trace.push({ kind: "inhibition-ignored", policyId: id, detail: `${inhibition.intentId} on ${scope} carries no evidence` });
          continue;
        }
        for (const intent of remaining.filter(candidate => candidate.writeScopes.includes(scope))) {
          trace.push({ kind: "inhibited", policyId: id, detail: `${intent.intentId} on ${scope} by ${inhibition.intentId} (${inhibition.evidenceRefs.join(",")})` });
        }
        remaining = remaining.filter(candidate => !candidate.writeScopes.includes(scope));
      }
      return { intents: [...control.intents.filter(intent => !isInhibition(intent)), ...remaining], memory: [control.memory, subject.memory], trace };
    },
  };
}

/** Declared, versioned parameters of `repeated`: two predicates and two integers, named by id and revision so the same spec always means the same operator. */
export interface RepeatedSpec<O, I extends Intent, M> {
  readonly id: string;
  readonly revision: string;
  /** Initiation gate; while active, the same predicate is the continuation guard that hysteresis outlasts. */
  initiate(observation: O, context: PolicyContext): boolean;
  /** Termination predicate over one repeat of the option; true ends the run with that repeat's intents. */
  terminate(proposal: Proposal<I, M>): boolean;
  /** Most repeats of the option in one run, one per evaluation; a positive integer. */
  readonly maxSteps: number;
  /** Evaluations an active run survives after the guard drops; a non-negative integer. */
  readonly hold: number;
}

/** Memory of `repeated`: the run state beside the option's own memory. */
export interface RepeatedMemory<M> {
  readonly active: boolean;
  /** Repeats of the option already run in the current run. */
  readonly steps: number;
  readonly holdLeft: number;
  /** Set after a nonquiescent run; blocks re-initiation until the guard has dropped once. */
  readonly latched: boolean;
  readonly option: M;
}

/** The memory a `repeated` policy starts from. */
export function initialRepeatedMemory<M>(option: M): RepeatedMemory<M> {
  return { active: false, steps: 0, holdLeft: 0, latched: false, option };
}

/**
 * P* — a bounded reactive option. Time is the count of evaluations. When the guard holds and no run is active the
 * operator initiates a run; each evaluation of an active run executes one repeat of the option on the current
 * observation and withholds its intents until the termination predicate accepts a repeat, which proposes only that
 * repeat's intents and ends the run. Reaching `maxSteps` repeats without termination is `REPEATED_NONQUIESCENT`:
 * no intent is ever proposed for the run, the refusal is traced, and the operator latches until the guard drops.
 * When the guard drops an active run survives `hold` evaluations (hysteresis) and then releases without proposing.
 * The operator proposes only; it admits and executes nothing, and it never reads a clock.
 */
export function repeated<O, I extends Intent, M>(option: Policy<O, I, M>, spec: RepeatedSpec<O, I, NoInfer<M>>): Policy<O, I, RepeatedMemory<M>> {
  if (!Number.isInteger(spec.maxSteps) || spec.maxSteps < 1 || !Number.isInteger(spec.hold) || spec.hold < 0) {
    throw new Error(`REPEATED_INVALID_SPEC: ${spec.id}@${spec.revision} needs a positive integer maxSteps and a non-negative integer hold`);
  }
  const id = `${option.id}*`;
  const named = `${spec.id}@${spec.revision}`;
  return {
    id, revision: revisionOf(option, spec),
    propose(observation, memory, context) {
      const guard = spec.initiate(observation, context);
      const trace: TraceEvent[] = [];
      let steps = memory.steps;
      let holdLeft = memory.holdLeft;
      if (!memory.active) {
        if (!guard || memory.latched) {
          trace.push({ kind: "repeated-not-initiated", policyId: id, detail: named });
          return { intents: [], memory: memory.latched && !guard ? { ...memory, latched: false } : memory, trace };
        }
        steps = 0;
        holdLeft = spec.hold;
        trace.push({ kind: "repeated-initiated", policyId: id, detail: named });
      } else if (guard) {
        holdLeft = spec.hold;
      } else if (holdLeft > 0) {
        holdLeft -= 1;
        trace.push({ kind: "repeated-hysteresis-held", policyId: id, detail: `${named} hold ${holdLeft} left` });
      } else {
        trace.push({ kind: "repeated-released", policyId: id, detail: named });
        return { intents: [], memory: { ...initialRepeatedMemory(memory.option) }, trace };
      }
      const out = option.propose(observation, memory.option, context);
      trace.push(...out.trace);
      steps += 1;
      if (spec.terminate(out)) {
        trace.push({ kind: "repeated-terminated", policyId: id, detail: `${named} after ${steps} repeat(s)` });
        return { intents: out.intents, memory: initialRepeatedMemory(out.memory), trace };
      }
      if (steps >= spec.maxSteps) {
        trace.push({ kind: "repeated-nonquiescent", policyId: id, detail: `REPEATED_NONQUIESCENT: ${named} ran ${steps} repeat(s) without terminating` });
        return { intents: [], memory: { ...initialRepeatedMemory(out.memory), latched: true }, trace };
      }
      trace.push({ kind: "repeated-continuing", policyId: id, detail: `${named} repeat ${steps} of ${spec.maxSteps}` });
      return { intents: [], memory: { active: true, steps, holdLeft, latched: false, option: out.memory }, trace };
    },
  };
}
