import type { Intent, Policy, PolicyContext, Proposal } from "./contracts.js";
import { canonicalJson, digest } from "./canonical.js";
import { alternative, sequential, parallel, guarded, inhibit, type Selector, type Guard, type SequentialObservation } from "./combinators.js";
import { UNKNOWN, type Episode, type EpisodeEnvironment as AnyEpisodeEnvironment, type EpisodeMode, type Maybe } from "./episode.js";

/** The fixture environments the harness scores; the replay adapter's native-replay label carries no seeded fixture run, so it is excluded. */
// The elastic landing-queue family is exportable (episode/training) but not yet scored here; scoring it is a separate requirement.
export type EvaluatedEnvironment = Exclude<AnyEpisodeEnvironment, "native-replay" | "landing-queue-elastic" | "landing-queue-heterogeneous" | "landing-queue-temporal" | "dag-assignment">;
import { gateDraws, gateStreamStart, runLandingQueue, fifoLanding, restackFirst, type LandingObservation } from "./landing-queue.js";
import { runCompactionInheritance, persistAll, provenanceChecked, type CompactionObservation } from "./compaction-inheritance.js";
import { runColonyResilience, naiveRetry, receiptChecked, colonyOutcome, type ColonyObservation } from "./colony-resilience.js";
import { runArtifactRecovery, restartFromScratch, resumeFromSnapshot, type RecoveryObservation, type RecoveryEpisode } from "./artifact-recovery.js";
import { runQuorumEvidence, majorityVote, independentTestFirst, type QuorumObservation, type QuorumGate } from "./quorum-evidence.js";

/**
 * Comparative evaluation harness (collective-adaptation M3-B, MWCOL-007/008, 07 measurement). It runs typed
 * coordination configurations through the five fixture environments on a declared hold-out seed split under one
 * shared budget and reports integer micro-unit metrics (1_000_000 is 1.0, so the bytes are identical in TS and
 * Python). It trains nothing and evolves nothing: a learned or evolved policy arrives as a plain `Policy` value
 * inside an external configuration, identified only by its hash and `id@revision`. Every report is a `fixture`.
 */

export interface PolicySet {
  readonly landing: Policy<LandingObservation, Intent, number>;
  readonly compaction: Policy<CompactionObservation, Intent, number>;
  readonly colony: Policy<ColonyObservation, Intent, number>;
  readonly recovery: Policy<RecoveryObservation, Intent, number>;
  readonly quorum: Policy<QuorumObservation, Intent, number>;
}

export type ConfigurationKind = "fixed" | "composition" | "external";

export type ConfigurationProvenance =
  | { readonly kind: "fixed" }
  | { readonly kind: "external" }
  | { readonly kind: "composition"; readonly combinator: "alternative"; readonly selector: { readonly id: string; readonly revision: string }; readonly parts: readonly [string, string] }
  | { readonly kind: "composition"; readonly combinator: "tree"; readonly tree: CanonicalTree };

export interface EvaluationConfiguration {
  readonly id: string;
  readonly revision: string;
  readonly kind: ConfigurationKind;
  readonly configHash: string;
  readonly provenance: ConfigurationProvenance;
  readonly policies: PolicySet;
}

/** The one budget every configuration shares: policy steps per episode and compute units per episode. */
export interface EvaluationBudget {
  readonly steps: number;
  readonly units: number;
}

export interface EvaluationScenario {
  readonly landing: { readonly candidates: number; readonly lanes: number; readonly steps: number };
  readonly compactionTasks: number;
  readonly colony: { readonly workers: number; readonly compute: number; readonly steps: number };
  readonly recovery: { readonly work: number; readonly steps: number };
  readonly quorum: { readonly candidates: number; readonly reviewers: number; readonly steps: number; readonly budget: number; readonly gate: QuorumGate };
}

export interface EvaluationInput {
  readonly entries: readonly { readonly configuration: EvaluationConfiguration; readonly budget: EvaluationBudget }[];
  readonly scenario: EvaluationScenario;
  readonly partition: { readonly train: readonly number[]; readonly holdOut: readonly number[] };
  readonly bootstrap?: { readonly seed: number; readonly resamples: number };
}

export interface Interval { readonly meanMicro: number; readonly ciLowMicro: number; readonly ciHighMicro: number }

export interface EnvironmentResult {
  readonly environment: EvaluatedEnvironment;
  readonly seeds: readonly number[];
  /** Validated completion in micro-units: 1_000_000 when everything the environment counts as validated work was done. */
  readonly validatedCompletion: Interval;
  /** Validated completion per compute unit actually spent. */
  readonly completionPerSpendMicro: number;
  readonly costMicro: number;
  readonly p95Steps: number;
  readonly overBudget: number;
  readonly groups: { readonly allSuccess: number; readonly allFail: number; readonly mixed: number };
  readonly metrics: Readonly<Record<string, Maybe<number>>>;
}

export interface ConfigurationResult {
  readonly id: string;
  readonly revision: string;
  readonly kind: ConfigurationKind;
  readonly configHash: string;
  readonly provenance: ConfigurationProvenance;
  readonly policies: Readonly<Record<keyof PolicySet, string>>;
  readonly environments: readonly EnvironmentResult[];
  readonly aggregateCompletionMicro: number;
}

export interface Comparison {
  readonly reference: string;
  readonly versus: string;
  readonly environment: EvaluatedEnvironment | "aggregate";
  readonly n: number;
  readonly deltaMicro: number;
  readonly ciLowMicro: number;
  readonly ciHighMicro: number;
  /** Present only when at least two seeds back it and the interval is wholly above zero. */
  readonly uplift?: number;
  /** Present only when at least two seeds back it and the interval is wholly below zero. */
  readonly deficit?: number;
  readonly upliftWithheld?: "SINGLE_SEED" | "INTERVAL_CONTAINS_ZERO";
}

export interface ContinuityRow {
  /** The earlier episode's seed: its failed attempt left the artifact. */
  readonly seed: number;
  /** The later episode's seed: always different from `seed`, so the successor consumes an artifact it did not itself get from its own seed. */
  readonly laterSeed: number;
  readonly carriedFrom: string;
  readonly consumedBy: string;
  readonly artifactDigest: string;
  readonly treatmentSteps: number;
  readonly controlSteps: number;
  readonly treatmentMinusControlSteps: number;
}

export interface ContinuityResult {
  readonly configuration: string;
  readonly seeds: readonly ContinuityRow[];
  readonly consumed: number;
  readonly meanTreatmentMinusControlStepsMicro: number;
}

export interface EvaluationReport {
  readonly schema: "mw.evaluation.fixture.v1";
  readonly mode: "fixture";
  readonly budget: EvaluationBudget;
  readonly scenario: EvaluationScenario;
  readonly partition: { readonly train: readonly number[]; readonly holdOut: readonly number[]; readonly hash: string };
  readonly bootstrap: { readonly seed: number; readonly resamples: number };
  readonly configurations: readonly ConfigurationResult[];
  readonly comparisons: readonly Comparison[];
  readonly continuity: readonly ContinuityResult[];
  readonly reportDigest: string;
}

const MICRO = 1_000_000;
const ENVIRONMENTS: readonly EvaluatedEnvironment[] = ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"];
const POLICY_KEYS: readonly (keyof PolicySet)[] = ["landing", "compaction", "colony", "recovery", "quorum"];
const HASH = /^sha256:[0-9a-f]{64}$/;

function micro(value: number): number {
  const rounded = Math.round(value);
  return rounded === 0 ? 0 : rounded;
}

function policyRefs(policies: PolicySet): Record<keyof PolicySet, string> {
  const out = {} as Record<keyof PolicySet, string>;
  for (const key of POLICY_KEYS) out[key] = `${policies[key].id}@${policies[key].revision}`;
  return out;
}

/** Fixed rung-A policies the environments export, one per environment, behind a stable configuration hash. */
export function fixedConfiguration(id: string, revision: string, policies: PolicySet): EvaluationConfiguration {
  return { id, revision, kind: "fixed", provenance: { kind: "fixed" }, policies, configHash: digest({ id, revision, kind: "fixed", policies: policyRefs(policies) }) };
}

/** The rung-A baselines: FIFO landing, persist-all compaction, naive retry, restart from scratch, majority vote. */
export const fixedBaseline: EvaluationConfiguration = fixedConfiguration("fixed-baseline", "1", {
  landing: fifoLanding, compaction: persistAll, colony: naiveRetry, recovery: restartFromScratch, quorum: majorityVote,
});

/** The rung-A checked policies: restack-first, provenance-checked, receipt-checked, resume-from-snapshot, independent-test-first. */
export const fixedChecked: EvaluationConfiguration = fixedConfiguration("fixed-checked", "1", {
  landing: restackFirst, compaction: provenanceChecked, colony: receiptChecked, recovery: resumeFromSnapshot, quorum: independentTestFirst,
});

/** A declared, versioned selector that sends even seeds to the left alternative and odd seeds to the right one. */
export function seedParitySelector<O>(): Selector<O> {
  return { id: "seed-parity", revision: "1", select: (_observation, context) => (context.seed % 2 === 0 ? "left" : "right") };
}

/** A combinator over counter-memory policies; the tuple memory collapses to its maximum, which is the step count every part tracks. */
function collapse<O>(inner: Policy<O, Intent, readonly [number, number]>): Policy<O, Intent, number> {
  return {
    id: inner.id, revision: inner.revision,
    propose(observation, memory, context) {
      const proposal = inner.propose(observation, [memory, memory], context);
      return { intents: proposal.intents, trace: proposal.trace, memory: Math.max(proposal.memory[0], proposal.memory[1]) };
    },
  };
}

/** `alternative` over two counter-memory policies. */
function select<O, I extends Intent>(left: Policy<O, I, number>, right: Policy<O, I, number>, selector: Selector<O>): Policy<O, I, number> {
  return collapse(alternative(left, right, selector)) as Policy<O, I, number>;
}

/**
 * A composition-selected configuration: every environment's policy is the exported `alternative` combinator over the
 * two configurations' policies and the one declared selector, so the selection is the first trace line of every proposal.
 */
export function composedConfiguration(
  id: string, revision: string, left: EvaluationConfiguration, right: EvaluationConfiguration, selector: { readonly id: string; readonly revision: string; select(observation: never, context: Parameters<Selector<unknown>["select"]>[1]): "left" | "right" },
): EvaluationConfiguration {
  const chosen = selector as unknown as Selector<unknown>;
  const policies: PolicySet = {
    landing: select(left.policies.landing, right.policies.landing, chosen as Selector<LandingObservation>),
    compaction: select(left.policies.compaction, right.policies.compaction, chosen as Selector<CompactionObservation>),
    colony: select(left.policies.colony, right.policies.colony, chosen as Selector<ColonyObservation>),
    recovery: select(left.policies.recovery, right.policies.recovery, chosen as Selector<RecoveryObservation>),
    quorum: select(left.policies.quorum, right.policies.quorum, chosen as Selector<QuorumObservation>),
  };
  const provenance: ConfigurationProvenance = { kind: "composition", combinator: "alternative", selector: { id: selector.id, revision: selector.revision }, parts: [left.configHash, right.configHash] };
  return { id, revision, kind: "composition", provenance, policies, configHash: digest({ id, revision, kind: "composition", policies: policyRefs(policies), provenance }) };
}

/** A configuration known only by its hash and the policies' `id@revision`; a learned or evolved policy is a plain value. */
export function externalConfiguration(spec: { readonly id: string; readonly revision: string; readonly configHash: string; readonly policies: PolicySet }): EvaluationConfiguration {
  if (!HASH.test(spec.configHash)) throw new RangeError(`EVALUATION_CONFIG_HASH_INVALID: ${spec.id} needs a sha256:<64 hex> configuration hash, got ${spec.configHash}`);
  return { id: spec.id, revision: spec.revision, kind: "external", provenance: { kind: "external" }, policies: spec.policies, configHash: spec.configHash };
}

/** A declared, versioned guard of a tree node; it sees P's counter-memory proposal and decides whether Q runs. */
export interface TreeGuard {
  readonly id: string;
  readonly revision: string;
  accept(proposal: Proposal<Intent, number>): boolean;
}

/** A declared, versioned selector of a tree node, the same port `alternative` takes. */
export interface TreeSelector {
  readonly id: string;
  readonly revision: string;
  select(observation: never, context: PolicyContext): "left" | "right";
}

/**
 * What a guard, selector or inhibition declares it reads or targets (effects, scopes, decisions). A tree may name
 * ordinary effects and scopes; it may not name the protected boundary the resolver and the native verifier own.
 */
export interface TreeReferences {
  readonly references?: readonly string[];
}

/**
 * A typed composition tree over fixed policies (MWCOL-008 evolved configurations, 07 ladder E): the five operators
 * of the policy algebra that keep a counter memory, nested to any depth up to `treeDepthBound`, with fixed
 * configurations at the leaves. `repeated` is not a node: its run state is not a step counter, so it cannot
 * share the counter memory every evaluated policy carries.
 */
export type CompositionTree =
  | { readonly op: "policy"; readonly configuration: EvaluationConfiguration }
  | { readonly op: "sequential"; readonly first: CompositionTree; readonly then: CompositionTree }
  | { readonly op: "parallel"; readonly left: CompositionTree; readonly right: CompositionTree }
  | ({ readonly op: "guarded"; readonly first: CompositionTree; readonly guard: TreeGuard; readonly then: CompositionTree } & TreeReferences)
  | ({ readonly op: "alternative"; readonly left: CompositionTree; readonly right: CompositionTree; readonly selector: TreeSelector } & TreeReferences)
  | ({ readonly op: "inhibit"; readonly control: CompositionTree; readonly subject: CompositionTree } & TreeReferences);

type Ref = { readonly id: string; readonly revision: string };

/** The canonical, hashable form of a tree: configurations by hash, guards and selectors by `id` and `revision`, references sorted. */
export type CanonicalTree =
  | { readonly op: "policy"; readonly configHash: string }
  | { readonly op: "sequential"; readonly first: CanonicalTree; readonly then: CanonicalTree }
  | { readonly op: "parallel"; readonly left: CanonicalTree; readonly right: CanonicalTree }
  | { readonly op: "guarded"; readonly first: CanonicalTree; readonly guard: Ref; readonly then: CanonicalTree; readonly references: readonly string[] }
  | { readonly op: "alternative"; readonly left: CanonicalTree; readonly right: CanonicalTree; readonly selector: Ref; readonly references: readonly string[] }
  | { readonly op: "inhibit"; readonly control: CanonicalTree; readonly subject: CanonicalTree; readonly references: readonly string[] };

/** Nesting bound: it also stops a cyclic tree value from recursing forever. */
const treeDepthBound = 16;
/** Declared names that sit on the protected boundary: verifier decisions, receipts, protected scopes, authority and verification effects. */
const PROTECTED_REFERENCE = /^(verifier:|verdict:|receipt:|protected:|authority:|graph:protected:|effect:verify$|effect:authorize$)/;
type AnyPolicy = Policy<any, Intent, number>;

function invalid(path: string, why: string): never {
  throw new RangeError(`CONFIG_TREE_INVALID: ${path} ${why}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function declared(path: string, kind: "guard" | "selector", value: unknown, method: "accept" | "select"): Ref {
  if (!isRecord(value) || typeof value.id !== "string" || value.id === "" || typeof value.revision !== "string" || value.revision === "" || typeof value[method] !== "function") {
    return invalid(path, `needs a ${kind} with a non-empty id, a non-empty revision and a ${method} function`);
  }
  return { id: value.id, revision: value.revision };
}

function referencesOf(path: string, node: Record<string, unknown>): readonly string[] {
  const raw = node.references;
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.some(entry => typeof entry !== "string" || entry.trim() === "")) return invalid(path, "needs references as an array of non-empty strings");
  const names = [...new Set(raw as string[])].sort();
  const hit = names.find(name => PROTECTED_REFERENCE.test(name));
  if (hit !== undefined) throw new RangeError(`CONFIG_TREE_PROTECTED_SCOPE: ${path} references ${hit}, which a composition tree may not name`);
  return names;
}

function canonicalOf(node: unknown, path: string, depth: number): CanonicalTree {
  if (depth > treeDepthBound) return invalid(path, `nests deeper than ${treeDepthBound} levels`);
  if (!isRecord(node)) return invalid(path, "is not a tree node");
  const child = (key: string): CanonicalTree => canonicalOf(node[key], `${path}.${key}`, depth + 1);
  switch (node.op) {
    case "policy": {
      const configuration = node.configuration;
      if (!isRecord(configuration) || configuration.kind !== "fixed" || typeof configuration.configHash !== "string" || !isRecord(configuration.policies)) {
        return invalid(path, "needs a fixed configuration at a leaf");
      }
      for (const key of POLICY_KEYS) {
        const policy = configuration.policies[key];
        if (!isRecord(policy) || typeof policy.propose !== "function") return invalid(path, `leaf configuration lacks a ${key} policy`);
      }
      return { op: "policy", configHash: configuration.configHash };
    }
    case "sequential": return { op: "sequential", first: child("first"), then: child("then") };
    case "parallel": return { op: "parallel", left: child("left"), right: child("right") };
    case "guarded": return { op: "guarded", first: child("first"), guard: declared(`${path}.guard`, "guard", node.guard, "accept"), then: child("then"), references: referencesOf(path, node) };
    case "alternative": return { op: "alternative", left: child("left"), right: child("right"), selector: declared(`${path}.selector`, "selector", node.selector, "select"), references: referencesOf(path, node) };
    case "inhibit": return { op: "inhibit", control: child("control"), subject: child("subject"), references: referencesOf(path, node) };
    default: return invalid(path, `has the unknown operator ${String(node.op)}`);
  }
}

/** Sequential's second policy observes the shared observation and P's output; a fixed policy reads only the observation. */
function afterFirst(second: AnyPolicy): Policy<SequentialObservation<unknown, Intent, number>, Intent, number> {
  return { id: second.id, revision: second.revision, propose: (seen, memory, context) => second.propose(seen.observation, memory, context) };
}

function policyOf(node: CompositionTree, key: keyof PolicySet): AnyPolicy {
  switch (node.op) {
    case "policy": return node.configuration.policies[key] as AnyPolicy;
    case "sequential": return collapse(sequential(policyOf(node.first, key), afterFirst(policyOf(node.then, key))));
    case "parallel": return collapse(parallel(policyOf(node.left, key), policyOf(node.right, key)));
    case "guarded": return collapse(guarded(policyOf(node.first, key), node.guard as Guard<Intent, number>, policyOf(node.then, key)));
    case "alternative": return collapse(alternative(policyOf(node.left, key), policyOf(node.right, key), node.selector as unknown as Selector<unknown>));
    case "inhibit": return collapse(inhibit(policyOf(node.control, key), policyOf(node.subject, key)));
  }
}

/**
 * A configuration built from a typed composition tree over fixed policies, so an evolved configuration is a typed,
 * hashable space the harness can evaluate. The tree is validated first: an unknown operator, a missing child, a
 * non-fixed leaf or a malformed guard or selector is `CONFIG_TREE_INVALID`; a reference to a protected effect,
 * scope, receipt or verifier decision is `CONFIG_TREE_PROTECTED_SCOPE`. Safety and verifier semantics stay
 * fixed because every operator only proposes: the resolver and the native host still judge each intent. The hash
 * is the digest of the canonical tree and the provenance records it. Search over trees stays in the training repository.
 */
export function treeConfiguration(id: string, revision: string, tree: CompositionTree): EvaluationConfiguration {
  if (typeof id !== "string" || id === "" || typeof revision !== "string" || revision === "") invalid("configuration", "needs a non-empty id and revision");
  const canonical = canonicalOf(tree, "tree", 0);
  const policies = {} as Record<keyof PolicySet, AnyPolicy>;
  for (const key of POLICY_KEYS) policies[key] = policyOf(tree, key);
  const set = policies as unknown as PolicySet;
  return { id, revision, kind: "composition", provenance: { kind: "composition", combinator: "tree", tree: canonical }, policies: set, configHash: digest({ id, revision, kind: "composition", tree: canonical }) };
}

interface Score {
  readonly completion: number;
  readonly spent: number;
  readonly steps: number;
  readonly extras: Readonly<Record<string, Maybe<number>>>;
}

function lastStep(events: readonly { readonly step: number; readonly kind: string }[], kinds: readonly string[], fallback: number): number {
  const hits = events.filter(event => kinds.includes(event.kind)).map(event => event.step);
  return hits.length === 0 ? fallback : Math.max(1, Math.max(...hits));
}

function spentOf(steps: readonly { readonly resolution: { readonly budgetUsed: { readonly compute: number } } }[]): number {
  return steps.reduce((sum, step) => sum + step.resolution.budgetUsed.compute, 0);
}

function ratio(part: number, whole: number): number {
  return whole === 0 ? 0 : micro((part / whole) * MICRO);
}

function recoverySteps(episode: RecoveryEpisode, cap: number): number {
  return episode.final.completedAtStep ?? cap;
}

function scoreOf(environment: EvaluatedEnvironment, policies: PolicySet, scenario: EvaluationScenario, budget: EvaluationBudget, seed: number): Score {
  switch (environment) {
    case "landing-queue": {
      const steps = Math.min(scenario.landing.steps, budget.steps);
      const episode = runLandingQueue({ seed, candidates: scenario.landing.candidates, lanes: scenario.landing.lanes, steps, policy: policies.landing });
      const landedAt = new Map(episode.final.events.filter(event => event.kind === "landed").map(event => [event.candidate, event.step] as const));
      const ages = episode.final.candidates.map(candidate => landedAt.get(candidate.id) ?? steps);
      const all = episode.final.landed.length === scenario.landing.candidates;
      return {
        completion: ratio(episode.final.landed.length, scenario.landing.candidates), spent: spentOf(episode.steps),
        steps: all ? lastStep(episode.final.events, ["landed"], steps) : steps,
        extras: { queueAge: micro((ages.reduce((a, b) => a + b, 0) / Math.max(1, ages.length)) * MICRO) },
      };
    }
    case "compaction-inheritance": {
      const tasks = Math.min(scenario.compactionTasks, budget.steps);
      const episode = runCompactionInheritance({ seed, tasks, policy: policies.compaction });
      const done = episode.final.outcomes.filter(outcome => outcome.status === "succeeded" || outcome.status === "rediscovered").length;
      const rediscovered = episode.final.outcomes.filter(outcome => outcome.status === "rediscovered").length;
      return { completion: ratio(done, tasks), spent: spentOf(episode.steps), steps: tasks, extras: { rediscoveryRate: ratio(rediscovered, tasks) } };
    }
    case "colony-resilience": {
      const steps = Math.min(scenario.colony.steps, budget.steps);
      const episode = runColonyResilience({ seed, workers: scenario.colony.workers, compute: scenario.colony.compute, steps, policy: policies.colony });
      const workers = episode.final.workers;
      const safe = workers.filter(worker => worker.acceptedVia !== null && !worker.unsafe).length;
      const killed = workers.filter(worker => worker.initiallyKilled).length;
      const outcome = colonyOutcome(episode.final);
      return {
        completion: ratio(safe, workers.length), spent: spentOf(episode.steps), steps: lastStep(episode.final.events, ["recovered", "accepted", "verified"], steps),
        extras: {
          wrongSignalPropagation: ratio(outcome.unsafeEffects, workers.length),
          crashRecovery: killed === 0 ? UNKNOWN : ratio(workers.filter(worker => worker.initiallyKilled && worker.status === "recovered").length, killed),
        },
      };
    }
    case "artifact-recovery": {
      const steps = Math.min(scenario.recovery.steps, budget.steps);
      const run = { seed, work: scenario.recovery.work, steps, policy: policies.recovery };
      const treatment = runArtifactRecovery({ ...run, arm: "treatment" });
      const control = runArtifactRecovery({ ...run, arm: "control" });
      const treatmentSteps = recoverySteps(treatment, steps);
      return {
        completion: treatment.final.completedAtStep === null ? 0 : MICRO, spent: spentOf(treatment.steps), steps: treatmentSteps,
        extras: { artifactMarginalEffectSteps: (treatmentSteps - recoverySteps(control, steps)) * MICRO },
      };
    }
    case "quorum-evidence": {
      const steps = Math.min(scenario.quorum.steps, budget.steps);
      const episode = runQuorumEvidence({ seed, candidates: scenario.quorum.candidates, reviewers: scenario.quorum.reviewers, steps, budget: scenario.quorum.budget, gate: scenario.quorum.gate, policy: policies.quorum });
      const candidates = episode.final.candidates;
      const correct = candidates.filter(candidate => (candidate.decision === "committed" && candidate.quality === "good") || (candidate.decision === "abstained" && candidate.quality === "bad")).length;
      return {
        completion: ratio(correct, candidates.length), spent: spentOf(episode.steps), steps: lastStep(episode.final.events, ["committed", "abstained"], steps),
        extras: {
          falsePositiveRate: ratio(episode.final.falsePositives, candidates.length), uncalibratedRate: ratio(episode.final.uncalibrated, candidates.length),
          correlationAdjustedCalibration: correlationAdjustedCalibration(candidates, episode.final.reviewers),
        },
      };
    }
  }
}

/**
 * 07 Measurement secondary metric, quorum-evidence only. For every committed candidate the raw confidence is its
 * approving-vote share; a fired shared noise term (the correlation draw) collapses the reviewers to one independent
 * voice, so the confidence shrinks toward the 1/2 no-information prior by the independence weight (effective
 * reviewers over reviewers: 1/R when correlated, 1 otherwise). The metric is one minus the mean absolute gap
 * between that adjusted confidence and the hidden outcome (1 good, 0 bad), in micro-units, or the unknown literal
 * when nothing was committed.
 */
function correlationAdjustedCalibration(candidates: readonly { readonly decision: string | null; readonly quality: string; readonly correlated: boolean; readonly votes: readonly string[] }[], reviewers: number): Maybe<number> {
  const committed = candidates.filter(candidate => candidate.decision === "committed");
  if (committed.length === 0) return UNKNOWN;
  let gap = 0;
  for (const candidate of committed) {
    const confidence = candidate.votes.filter(vote => vote === "approve").length / reviewers;
    const weight = (candidate.correlated ? 1 : reviewers) / reviewers;
    gap += Math.abs(0.5 + (confidence - 0.5) * weight - (candidate.quality === "good" ? 1 : 0));
  }
  return micro((1 - gap / committed.length) * MICRO);
}

function mean(values: readonly number[]): number {
  return micro(values.reduce((a, b) => a + b, 0) / Math.max(1, values.length));
}

/** Percentile bootstrap of the mean over the sample, drawing only from the declared seed: 95 percent interval in micro-units. */
function interval(values: readonly number[], seed: number, resamples: number): { readonly low: number; readonly high: number } {
  if (values.length === 1) return { low: values[0]!, high: values[0]! };
  const draw = gateDraws(seed);
  const means: number[] = [];
  for (let round = 0; round < resamples; round += 1) {
    let sum = 0;
    for (let index = 0; index < values.length; index += 1) sum += values[draw() % values.length]!;
    means.push(sum / values.length);
  }
  means.sort((a, b) => a - b);
  return { low: micro(means[Math.floor(0.025 * resamples)]!), high: micro(means[Math.min(resamples - 1, Math.ceil(0.975 * resamples) - 1)]!) };
}

function nearestRank95(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(0.95 * sorted.length) - 1)]!;
}

function perSeed(configuration: EvaluationConfiguration, scenario: EvaluationScenario, budget: EvaluationBudget, seeds: readonly number[]): Record<EvaluatedEnvironment, readonly Score[]> {
  const out = {} as Record<EvaluatedEnvironment, readonly Score[]>;
  for (const environment of ENVIRONMENTS) {
    out[environment] = seeds.map(seed => {
      const score = scoreOf(environment, configuration.policies, scenario, budget, seed);
      // The budget is shared and enforced: an episode that spends past the unit cap has not validated its work.
      return score.spent > budget.units ? { ...score, completion: 0 } : score;
    });
  }
  return out;
}

function summarise(environment: EvaluatedEnvironment, scores: readonly Score[], seeds: readonly number[], budget: EvaluationBudget, bootstrap: { readonly seed: number; readonly resamples: number }): EnvironmentResult {
  const completions = scores.map(score => score.completion);
  const bounds = interval(completions, bootstrap.seed, bootstrap.resamples);
  const extraKeys = [...new Set(scores.flatMap(score => Object.keys(score.extras)))].sort();
  const metrics: Record<string, Maybe<number>> = {};
  for (const key of extraKeys) {
    const known = scores.map(score => score.extras[key]).filter((value): value is number => typeof value === "number");
    metrics[key] = known.length === 0 ? UNKNOWN : mean(known);
  }
  return {
    environment, seeds,
    validatedCompletion: { meanMicro: mean(completions), ciLowMicro: bounds.low, ciHighMicro: bounds.high },
    completionPerSpendMicro: mean(scores.map(score => score.completion / Math.max(1, score.spent))),
    costMicro: mean(scores.map(score => score.spent * MICRO)),
    p95Steps: nearestRank95(scores.map(score => score.steps)),
    overBudget: scores.filter(score => score.spent > budget.units).length,
    groups: {
      allSuccess: completions.filter(value => value === MICRO).length, allFail: completions.filter(value => value === 0).length,
      mixed: completions.filter(value => value > 0 && value < MICRO).length,
    },
    metrics,
  };
}

function compare(reference: string, versus: string, environment: EvaluatedEnvironment | "aggregate", base: readonly number[], other: readonly number[], bootstrap: { readonly seed: number; readonly resamples: number }): Comparison {
  const differences = other.map((value, index) => value - base[index]!);
  const bounds = interval(differences, bootstrap.seed, bootstrap.resamples);
  const delta = mean(differences);
  const head = { reference, versus, environment, n: differences.length, deltaMicro: delta, ciLowMicro: bounds.low, ciHighMicro: bounds.high };
  if (differences.length < 2) return { ...head, upliftWithheld: "SINGLE_SEED" };
  if (bounds.low > 0) return { ...head, uplift: delta };
  if (bounds.high < 0) return { ...head, deficit: delta };
  return { ...head, upliftWithheld: "INTERVAL_CONTAINS_ZERO" };
}

/** The later episode's seed: the next hold-out seed (cyclic), or seed + 1 when the hold-out set holds one seed; never the earlier seed. */
function laterSeedOf(seeds: readonly number[], index: number): number {
  return seeds.length > 1 ? seeds[(index + 1) % seeds.length]! : seeds[index]! + 1;
}

/** Cross-episode continuity (MWCOL-007): the artifact a failed attempt left in one episode, injected into a different episode (another seed) whose successor consumes it. */
function continuityOf(configuration: EvaluationConfiguration, scenario: EvaluationScenario, budget: EvaluationBudget, seeds: readonly number[]): ContinuityResult {
  const steps = Math.min(scenario.recovery.steps, budget.steps);
  const run = { work: scenario.recovery.work, steps, policy: configuration.policies.recovery };
  const rows: ContinuityRow[] = seeds.map((seed, index) => {
    const laterSeed = laterSeedOf(seeds, index);
    const earlier = runArtifactRecovery({ ...run, seed, arm: "treatment" });
    const failed = earlier.final.attempts[0]!;
    const artifact = earlier.final.artifact!;
    const inheritedArtifact = { ...artifact, originEpisode: `fixture:artifact-recovery:${seed}` };
    const later = runArtifactRecovery({ ...run, seed: laterSeed, arm: "treatment", inheritedArtifact });
    const control = runArtifactRecovery({ ...run, seed: laterSeed, arm: "control", inheritedArtifact });
    const successor = later.final.attempts[later.final.attempts.length - 1]!;
    const consumed = successor.consumed.some(entry => entry.artifactId === artifact.id && entry.digest === artifact.digest);
    const treatmentSteps = recoverySteps(later, steps);
    const controlSteps = recoverySteps(control, steps);
    return {
      seed, laterSeed, carriedFrom: failed.id, consumedBy: consumed ? successor.id : "none", artifactDigest: artifact.digest,
      treatmentSteps, controlSteps, treatmentMinusControlSteps: treatmentSteps - controlSteps,
    };
  });
  return {
    configuration: configuration.id, seeds: rows, consumed: rows.filter(row => row.consumedBy !== "none").length,
    meanTreatmentMinusControlStepsMicro: mean(rows.map(row => row.treatmentMinusControlSteps * MICRO)),
  };
}

/** The state gateDraws starts a seed's stream from: the finalised seed, with the zero state remapped to 1 (gateStreamStart in landing-queue.ts); equal keys replay one stream. */
/** The seed whose finalised state is 0 (0x61c88647) and the seed whose finalised state is 1 (0x6f2a7a53): the one pair of distinct uint32 seeds that start one gateDraws stream. */
const ZERO_STATE_SEED = 0x61c88647;

function streamKey(seed: number): number {
  return gateStreamStart(seed);
}

function checkInput(input: EvaluationInput): { readonly budget: EvaluationBudget; readonly train: number[]; readonly holdOut: number[]; readonly bootstrap: { readonly seed: number; readonly resamples: number } } {
  if (input.entries.length === 0) throw new RangeError("EVALUATION_NO_CONFIGURATIONS: nothing to evaluate");
  const budget = input.entries[0]!.budget;
  for (const entry of input.entries) {
    const { steps, units } = entry.budget;
    if (!Number.isInteger(steps) || steps < 1 || !Number.isInteger(units) || units < 1) throw new RangeError(`EVALUATION_BUDGET_INVALID: ${entry.configuration.id} budget ${steps} steps, ${units} units`);
    if (digest(entry.budget) !== digest(budget)) throw new RangeError(`EVALUATION_BUDGET_UNEQUAL: ${entry.configuration.id} budget ${steps}/${units} differs from ${input.entries[0]!.configuration.id} ${budget.steps}/${budget.units}`);
  }
  const ids = input.entries.map(entry => entry.configuration.id);
  if (new Set(ids).size !== ids.length) throw new RangeError(`EVALUATION_DUPLICATE_CONFIGURATION: ${ids.join(",")}`);
  const train = [...new Set(input.partition.train)].sort((a, b) => a - b);
  const holdOut = [...new Set(input.partition.holdOut)].sort((a, b) => a - b);
  if (holdOut.length === 0) throw new RangeError("EVALUATION_HOLDOUT_EMPTY: no hold-out seed to evaluate on");
  // gateDraws consumes a uint32; a wrapped (s + k*2^32), negative or fractional partition seed would replay another seed's stream behind a partition hash that records it as distinct.
  for (const [seeds, role] of [[train, "training"], [holdOut, "hold-out"]] as const) {
    for (const seed of seeds) if (!Number.isInteger(seed) || seed < 0 || seed >= 2 ** 32) throw new RangeError(`EVALUATION_PARTITION_INVALID: ${seed} ${role} seed`);
  }
  // The declared-value dedupe above cannot see two distinct seeds that start one stream (0x61c88647 and 0x6f2a7a53), which would weight that stream twice in the metrics.
  for (const [seeds, role] of [[train, "training"], [holdOut, "hold-out"]] as const) {
    const byKey = new Map<number, number>();
    for (const seed of seeds) {
      const first = byKey.get(streamKey(seed));
      if (first !== undefined) throw new RangeError(`EVALUATION_PARTITION_INVALID: ${first},${seed} ${role} seeds start one gateDraws stream`);
      byKey.set(streamKey(seed), seed);
    }
  }
  const overlap = holdOut.filter(seed => train.includes(seed));
  if (overlap.length > 0) throw new RangeError(`EVALUATION_PARTITION_OVERLAP: seeds ${overlap.join(",")} are in both the training and the hold-out set`);
  // Two in-domain seeds can still start one gateDraws stream (the zero mixed state is remapped to 1), so the guard also compares effective stream keys.
  const trainKeys = new Set(train.map(streamKey));
  const aliased = holdOut.filter(seed => trainKeys.has(streamKey(seed)));
  if (aliased.length > 0) throw new RangeError(`EVALUATION_PARTITION_OVERLAP: seeds ${aliased.join(",")} start a training seed's gateDraws stream`);
  const bootstrap = input.bootstrap ?? { seed: 1, resamples: 200 };
  if (!Number.isInteger(bootstrap.resamples) || bootstrap.resamples < 1) throw new RangeError(`EVALUATION_BOOTSTRAP_INVALID: ${bootstrap.resamples} resamples`);
  // gateDraws consumes a uint32; any other declared seed (fractional, negative, 2^32-wrapped) would resample another seed's stream while the report records it as distinct.
  // gateDraws starts from the finalised seed and remaps a zero state to 1, so ZERO_STATE_SEED (finalised state 0) starts exactly where ALIAS_STATE_SEED (finalised state 1) starts: the one admitted pair of distinct seeds that would resample one stream.
  if (!Number.isInteger(bootstrap.seed) || bootstrap.seed < 0 || bootstrap.seed >= 2 ** 32 || bootstrap.seed === ZERO_STATE_SEED) throw new RangeError(`EVALUATION_BOOTSTRAP_INVALID: ${bootstrap.seed} seed`);
  return { budget, train, holdOut, bootstrap };
}

/** Evaluate every configuration on the hold-out seeds under the shared budget; the first entry is the reference every other one is compared with. */
export function evaluate(input: EvaluationInput): EvaluationReport {
  const { budget, train, holdOut, bootstrap } = checkInput(input);
  const scored = input.entries.map(entry => ({ configuration: entry.configuration, scores: perSeed(entry.configuration, input.scenario, budget, holdOut) }));
  const configurations: ConfigurationResult[] = scored.map(({ configuration, scores }) => ({
    id: configuration.id, revision: configuration.revision, kind: configuration.kind, configHash: configuration.configHash, provenance: configuration.provenance,
    policies: policyRefs(configuration.policies),
    environments: ENVIRONMENTS.map(environment => summarise(environment, scores[environment], holdOut, budget, bootstrap)),
    aggregateCompletionMicro: mean(holdOut.map((_, index) => mean(ENVIRONMENTS.map(environment => scores[environment][index]!.completion)))),
  }));
  const reference = scored[0]!;
  const comparisons: Comparison[] = [];
  for (const other of scored.slice(1)) {
    for (const environment of ENVIRONMENTS) {
      comparisons.push(compare(reference.configuration.id, other.configuration.id, environment, reference.scores[environment].map(s => s.completion), other.scores[environment].map(s => s.completion), bootstrap));
    }
    const pooled = (entry: typeof reference) => holdOut.map((_, index) => mean(ENVIRONMENTS.map(environment => entry.scores[environment][index]!.completion)));
    comparisons.push(compare(reference.configuration.id, other.configuration.id, "aggregate", pooled(reference), pooled(other), bootstrap));
  }
  const body = {
    schema: "mw.evaluation.fixture.v1" as const, mode: "fixture" as const, budget, scenario: input.scenario,
    partition: { train, holdOut, hash: digest({ train, holdOut }) }, bootstrap, configurations, comparisons,
    continuity: input.entries.map(entry => continuityOf(entry.configuration, input.scenario, budget, holdOut)),
  };
  return { ...body, reportDigest: digest(body) };
}

/** The exported bytes of one report: canonical JSON plus a final newline, one byte sequence per report in either language. */
export function evaluationBytes(report: EvaluationReport): string {
  return canonicalJson(report) + "\n";
}

/** A fixture report stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelEvaluation(report: EvaluationReport, mode: string): EvaluationReport {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture evaluation cannot be labelled ${mode}`);
  return report;
}

/**
 * Mixed-mode episode evaluation (collective-adaptation CA-R4, 04 M3 exit, 05 nonstationarity). A batch is one
 * configuration's `mw.episode.v1` episodes, each carrying a mode label (fixture, replay or live), scored under one
 * budget and a pinned agent, version and seed. Every number a mode block carries comes only from episodes whose own
 * source mode equals the block's label, so a fixture-derived number can never wear a live label
 * (EVALUATION_MODE_UPGRADE_FORBIDDEN). Batches compare only when their task families, mode sets, budget and pin
 * match (EVALUATION_BATCH_UNMATCHED). The report never certifies: `certified` is the literal false everywhere.
 */
export interface EpisodePin { readonly agent: string; readonly version: string; readonly seed: number }
export interface LabelledEpisode { readonly mode: string; readonly episode: Episode }

export interface EpisodeEvaluationEntry {
  readonly kind: "episodes";
  readonly configuration: { readonly id: string; readonly revision: string; readonly configHash: string };
  readonly pin: EpisodePin;
  readonly budget: EvaluationBudget;
  readonly episodes: readonly LabelledEpisode[];
}

export interface EpisodeEvaluationInput { readonly entries: readonly EpisodeEvaluationEntry[] }

export interface EpisodeRef {
  readonly episodeId: string;
  readonly mode: EpisodeMode;
  readonly family: string;
  readonly steps: number;
  readonly compute: number;
  /** 1 when the episode stayed within the shared step and unit budget, else 0. */
  readonly withinBudget: 0 | 1;
}

export interface ModeResult {
  readonly mode: EpisodeMode;
  readonly n: number;
  readonly withinBudgetMicro: number;
  readonly meanStepsMicro: number;
  readonly meanComputeMicro: number;
  readonly p95Steps: number;
  readonly certified: false;
}

export interface EpisodeBatchResult {
  readonly id: string;
  readonly revision: string;
  readonly configHash: string;
  readonly pin: EpisodePin;
  readonly budget: EvaluationBudget;
  readonly families: readonly string[];
  readonly modes: readonly ModeResult[];
  readonly episodes: readonly EpisodeRef[];
}

export interface EpisodeComparison {
  readonly reference: string;
  readonly versus: string;
  readonly mode: EpisodeMode;
  readonly nReference: number;
  readonly nVersus: number;
  readonly deltaWithinBudgetMicro: number;
  readonly deltaMeanStepsMicro: number;
  readonly certified: false;
}

export interface MixedEvaluationReport {
  readonly schema: "mw.evaluation.v1";
  readonly modes: readonly EpisodeMode[];
  readonly certified: false;
  readonly batches: readonly EpisodeBatchResult[];
  readonly comparisons: readonly EpisodeComparison[];
  readonly reportDigest: string;
}

const MODE_ORDER: readonly EpisodeMode[] = ["fixture", "replay", "live"];

function modeOf(label: string, source: EpisodeMode, who: string): EpisodeMode {
  const claimed = MODE_ORDER.indexOf(label as EpisodeMode);
  if (claimed < 0 || claimed > MODE_ORDER.indexOf(source)) {
    throw new RangeError(`EVALUATION_MODE_UPGRADE_FORBIDDEN: ${who} labels an episode derived from ${source} as ${label}`);
  }
  return label as EpisodeMode;
}

function refsOf(entry: EpisodeEvaluationEntry): EpisodeRef[] {
  const who = entry.configuration.id;
  if (!HASH.test(entry.configuration.configHash)) throw new RangeError(`EVALUATION_CONFIG_HASH_INVALID: ${who} needs a sha256:<64 hex> configuration hash, got ${entry.configuration.configHash}`);
  const { steps, units } = entry.budget;
  if (!Number.isInteger(steps) || steps < 1 || !Number.isInteger(units) || units < 1) throw new RangeError(`EVALUATION_BUDGET_INVALID: ${who} budget ${steps} steps, ${units} units`);
  const { agent, version, seed } = entry.pin;
  if (typeof agent !== "string" || agent === "" || typeof version !== "string" || version === "" || !Number.isInteger(seed) || seed < 0) throw new RangeError(`EVALUATION_PIN_INVALID: ${who} needs a non-empty agent, a non-empty version and a non-negative integer seed`);
  if (entry.episodes.length === 0) throw new RangeError(`EVALUATION_EPISODES_EMPTY: ${who} carries no episode`);
  return entry.episodes.map(labelled => {
    if (labelled.episode.schema !== "mw.episode.v1") throw new RangeError(`EVALUATION_EPISODE_INVALID: ${who} carries an episode with schema ${String(labelled.episode.schema)}`);
    const mode = modeOf(labelled.mode, labelled.episode.mode, who);
    const spent = labelled.episode.cost.budgetSpent.compute;
    const used = labelled.episode.cost.steps;
    return { episodeId: labelled.episode.episodeId, mode, family: labelled.episode.task.family, steps: used, compute: spent, withinBudget: used <= steps && spent <= units ? 1 : 0 };
  });
}

function batchOf(entry: EpisodeEvaluationEntry): EpisodeBatchResult {
  const episodes = refsOf(entry);
  const modes: ModeResult[] = MODE_ORDER.filter(mode => episodes.some(ref => ref.mode === mode)).map(mode => {
    const own = episodes.filter(ref => ref.mode === mode);
    return {
      mode, n: own.length, withinBudgetMicro: mean(own.map(ref => ref.withinBudget * MICRO)), meanStepsMicro: mean(own.map(ref => ref.steps * MICRO)),
      meanComputeMicro: mean(own.map(ref => ref.compute * MICRO)), p95Steps: nearestRank95(own.map(ref => ref.steps)), certified: false as const,
    };
  });
  return {
    id: entry.configuration.id, revision: entry.configuration.revision, configHash: entry.configuration.configHash, pin: { agent: entry.pin.agent, version: entry.pin.version, seed: entry.pin.seed },
    budget: { steps: entry.budget.steps, units: entry.budget.units }, families: [...new Set(episodes.map(ref => ref.family))].sort(), modes, episodes,
  };
}

/** Score mixed-mode episode batches; the first batch is the reference and every other one must match it before it is compared. */
export function evaluateEpisodes(input: EpisodeEvaluationInput): MixedEvaluationReport {
  if (input.entries.length === 0) throw new RangeError("EVALUATION_NO_CONFIGURATIONS: nothing to evaluate");
  const batches = input.entries.map(batchOf);
  const ids = batches.map(batch => batch.id);
  if (new Set(ids).size !== ids.length) throw new RangeError(`EVALUATION_DUPLICATE_CONFIGURATION: ${ids.join(",")}`);
  const reference = batches[0]!;
  const comparisons: EpisodeComparison[] = [];
  for (const other of batches.slice(1)) {
    const differs: string[] = [];
    if (digest(other.families) !== digest(reference.families)) differs.push("task family");
    if (digest(other.modes.map(block => block.mode)) !== digest(reference.modes.map(block => block.mode))) differs.push("mode set");
    if (digest(other.budget) !== digest(reference.budget)) differs.push("budget");
    if (other.pin.agent !== reference.pin.agent || other.pin.version !== reference.pin.version || other.pin.seed !== reference.pin.seed) differs.push("agent/version/seed pin");
    if (differs.length > 0) throw new RangeError(`EVALUATION_BATCH_UNMATCHED: ${other.id} differs from ${reference.id} in ${differs.join(", ")}`);
    for (const block of reference.modes) {
      const twin = other.modes.find(candidate => candidate.mode === block.mode)!;
      comparisons.push({
        reference: reference.id, versus: other.id, mode: block.mode, nReference: block.n, nVersus: twin.n,
        deltaWithinBudgetMicro: twin.withinBudgetMicro - block.withinBudgetMicro, deltaMeanStepsMicro: twin.meanStepsMicro - block.meanStepsMicro, certified: false,
      });
    }
  }
  const body = { schema: "mw.evaluation.v1" as const, modes: MODE_ORDER.filter(mode => batches.some(batch => batch.modes.some(block => block.mode === mode))), certified: false as const, batches, comparisons };
  return { ...body, reportDigest: digest(body) };
}

/** The exported bytes of one mixed-mode report: canonical JSON plus a final newline. */
export function mixedEvaluationBytes(report: MixedEvaluationReport): string {
  return canonicalJson(report) + "\n";
}
