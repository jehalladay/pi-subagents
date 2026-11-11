import { canonicalJson, digest } from "./canonical.js";
import type { LandingQueueEpisode } from "./landing-queue.js";
import type { CompactionInheritanceEpisode } from "./compaction-inheritance.js";
import type { ColonyEpisode } from "./colony-resilience.js";
import type { RecoveryEpisode } from "./artifact-recovery.js";
import type { QuorumEvidenceEpisode } from "./quorum-evidence.js";
import type { ElasticEpisode } from "./elastic-landing.js";
import type { Resolution } from "./resolver.js";
import type { HeteroEpisode, DagEpisode } from "./fixture-families.js";

/**
 * The shared emitted episode format `mw.episode.v1` (collective-adaptation M1, slice E). One typed, versioned
 * record per environment run, produced by pure converters from the five fixture environment episodes. The
 * converters read the environment episodes and never alter them. A value the environment does not know is the
 * explicit literal `"unknown"`, never omitted, defaulted or `null`. The mode label is a closed enum and an
 * upgrade of it is refused: a fixture stays a fixture.
 */

export const UNKNOWN = "unknown" as const;
export type Unknown = typeof UNKNOWN;
export type Maybe<T> = T | Unknown;
export type EpisodeMode = "fixture" | "replay" | "live";
export type EpisodeEnvironment = "landing-queue" | "compaction-inheritance" | "colony-resilience" | "artifact-recovery" | "quorum-evidence" | "native-replay" | "landing-queue-elastic" | "landing-queue-heterogeneous" | "landing-queue-temporal" | "dag-assignment";

/** The runtime mirror of the union, pinned to the schema enum by episode-schema-parity.test.ts (jcts ruling, q5um). */
export const EPISODE_ENVIRONMENTS: readonly EpisodeEnvironment[] = Object.freeze(["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence", "native-replay", "landing-queue-elastic", "landing-queue-heterogeneous", "landing-queue-temporal", "dag-assignment"]);
export type EnvironmentEpisode = LandingQueueEpisode | CompactionInheritanceEpisode | ColonyEpisode | RecoveryEpisode | QuorumEvidenceEpisode | ElasticEpisode | HeteroEpisode | DagEpisode;

export interface EpisodeDecision {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  /** The Resolution's verdict on the proposal: the admitted and the rejected intents, rejections with their stable code. */
  readonly eligibility: { readonly admitted: readonly string[]; readonly rejected: readonly { readonly intentId: string; readonly code: string }[] };
  /** The actual log probability of the sampled decision when the policy reports one, else the explicit literal unknown. */
  readonly logProb: Maybe<number>;
  readonly readSet: readonly string[];
  readonly provenance: readonly string[];
}

export interface EpisodeEvent {
  readonly step: number;
  readonly kind: string;
  readonly subject: Maybe<string>;
  readonly detail: string;
}

export interface EpisodeArtifact { readonly id: string; readonly producer: Maybe<string>; readonly digest: Maybe<string> }
export interface EpisodeConsumption { readonly attempt: string; readonly artifactId: string; readonly digest: string }
export interface EpisodeAttempt { readonly id: string; readonly parent: Maybe<string>; readonly outcome: string }
export interface BudgetSpend { readonly compute: number; readonly workers: number; readonly queue: number; readonly latencyMs: number }

export interface Episode {
  readonly schema: "mw.episode.v1";
  readonly version: 1;
  readonly mode: EpisodeMode;
  readonly episodeId: string;
  readonly environment: EpisodeEnvironment;
  readonly source: { readonly schema: string; readonly seed: number };
  readonly task: { readonly basis: Maybe<string>; readonly family: string };
  readonly policy: { readonly id: string; readonly revision: string; readonly configHash: string };
  readonly roles: readonly string[];
  /** The state hash before step 0 (the initial state), so a training consumer knows the first transition's before-state; the literal unknown when the source records none. */
  readonly initialCheckpoint: Maybe<string>;
  /** The state hash after each step. */
  readonly checkpoints: readonly string[];
  readonly decisions: readonly EpisodeDecision[];
  readonly events: readonly EpisodeEvent[];
  readonly artifacts: { readonly created: readonly EpisodeArtifact[] | Unknown; readonly consumed: readonly EpisodeConsumption[] | Unknown };
  readonly attempts: readonly EpisodeAttempt[] | Unknown;
  /** Step counts and budget spend; no wall clock. */
  readonly cost: { readonly steps: number; readonly budgetSpent: BudgetSpend; readonly environmentCost: Maybe<number> };
  /** The fixture's own gate draw labelled fixture, or the replayed tape digest labelled replay. */
  readonly verifier: { readonly label: "fixture" | "replay"; readonly receiptDigest: string; readonly verdict: Maybe<string> };
  readonly arms: { readonly controlId: Maybe<string>; readonly treatmentId: Maybe<string> };
  readonly sanitize: { readonly ran: true; readonly removed: readonly string[] };
}

const MODE_RANK: Readonly<Record<EpisodeMode, number>> = { fixture: 0, replay: 1, live: 2 };

function isMode(value: string): value is EpisodeMode {
  return Object.prototype.hasOwnProperty.call(MODE_RANK, value);
}

/** Relabel an episode. Keeping or lowering the label is allowed; any upgrade, and any label outside the closed enum (live-verified included), is refused. */
export function labelEpisodeMode(episode: Episode, mode: string): Episode {
  if (!isMode(mode) || MODE_RANK[mode] > MODE_RANK[episode.mode]) {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: an episode labelled ${episode.mode} cannot be labelled ${mode}`);
  }
  return { ...episode, mode };
}

const CREDENTIAL_KEY = /(secret|token|passw(?:or)?d|credential|api[-_]?key|authorization|private[-_]?key)/i;
const CREDENTIAL_VALUE = /(AKIA[0-9A-Z]{16}|\bsk-[A-Za-z0-9]{16,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bBearer\s+[A-Za-z0-9._~+/=-]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const REDACTED = "[redacted]";

function scrub(value: unknown, path: string, removed: string[]): unknown {
  if (typeof value === "string") {
    if (!CREDENTIAL_VALUE.test(value)) return value;
    removed.push(path);
    return REDACTED;
  }
  if (Array.isArray(value)) return value.map((member, index) => scrub(member, `${path}/${index}`, removed));
  if (value !== null && typeof value === "object") {
    // Members are defined, never assigned, so an own "__proto__" data member from JSON.parse stays a member (see canonical.ts).
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      if (CREDENTIAL_KEY.test(key) || CREDENTIAL_VALUE.test(key)) { removed.push(`${path}/${CREDENTIAL_VALUE.test(key) ? REDACTED : key}`); continue; }
      Object.defineProperty(out, key, { value: scrub((value as Record<string, unknown>)[key], `${path}/${key}`, removed), enumerable: true, writable: true, configurable: true });
    }
    return out;
  }
  return value;
}

/** A copy of the value without credential-shaped fields (dropped, whether the field name names a credential or has the shape of a credential value; a value-shaped name appears in a removed path as `[redacted]`) and credential-shaped string values (replaced by `[redacted]`), plus the JSON-pointer paths of everything removed. The input is never altered. */
export function sanitizeValue<T>(value: T): { readonly value: T; readonly removed: readonly string[] } {
  const removed: string[] = [];
  const clean = scrub(value, "", removed) as T;
  return { value: clean, removed: removed.sort() };
}

const BASELINE: Readonly<Record<EpisodeEnvironment, string>> = {
  "landing-queue": "fifo-landing", "compaction-inheritance": "persist-all", "colony-resilience": "naive-retry",
  "artifact-recovery": "restart-from-scratch", "quorum-evidence": "majority-vote", "native-replay": "replay-adapter",
  "landing-queue-elastic": "restack-first",
  "landing-queue-heterogeneous": "hetero-restack-first", "landing-queue-temporal": "hetero-restack-first", "dag-assignment": "dag-matching",
};

const ROLES: Readonly<Record<EpisodeEnvironment, readonly string[]>> = {
  "landing-queue": ["lane"], "compaction-inheritance": ["worker"], "colony-resilience": ["worker"],
  "artifact-recovery": ["consumer", "producer"], "quorum-evidence": ["gate", "reviewer"], "native-replay": ["adapter"],
  "landing-queue-elastic": ["lane"],
  "landing-queue-heterogeneous": ["lane"], "landing-queue-temporal": ["lane"], "dag-assignment": ["agent"],
};

interface Parts {
  readonly environment: EpisodeEnvironment;
  readonly tag: string;
  readonly subjects: (event: unknown) => string | null;
  readonly artifacts: EpisodeArtifact[] | Unknown;
  readonly consumed: EpisodeConsumption[] | Unknown;
  readonly attempts: EpisodeAttempt[] | Unknown;
  readonly environmentCost: Maybe<number>;
  readonly verdict: Maybe<string>;
  /** Renders one source event's detail string; absent means the event carries its own detail member. */
  readonly detail?: (event: unknown) => string;
  /** The environment's own control/treatment assignment when it has one; else the policy against the environment baseline decides. */
  readonly arms?: { readonly controlId: Maybe<string>; readonly treatmentId: Maybe<string> };
}

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}

function describe(episode: EnvironmentEpisode): Parts {
  switch (episode.schema) {
    case "mw.landing-queue.fixture.v1": {
      const landed = episode.final.events.filter(event => event.kind === "landed").length;
      const failed = episode.final.events.filter(event => event.kind === "gate-failed").length;
      return { environment: "landing-queue", tag: "", subjects: event => (event as { candidate: string | null }).candidate, artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: UNKNOWN, verdict: `landed=${landed},gate-failed=${failed}` };
    }
    case "mw.compaction-inheritance.fixture.v1":
      return {
        environment: "compaction-inheritance", tag: "", subjects: event => (event as { summary: string | null }).summary,
        artifacts: episode.final.summaries.map(summary => ({ id: summary.id, producer: summary.source, digest: summary.provenance })),
        consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: episode.final.cost, verdict: UNKNOWN,
      };
    case "mw.colony-resilience.fixture.v1":
      return { environment: "colony-resilience", tag: "", subjects: event => (event as { worker: string | null }).worker, artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: episode.final.computeStart - episode.final.computeLeft, verdict: UNKNOWN };
    case "mw.artifact-recovery.fixture.v1": {
      const artifact = episode.final.artifact;
      const done = episode.final.completedAtStep;
      return {
        environment: "artifact-recovery", tag: `:${episode.intervention.id}`, subjects: event => (event as { attempt: string }).attempt,
        artifacts: artifact === null ? [] : [{ id: artifact.id, producer: artifact.producer, digest: artifact.digest }],
        consumed: episode.final.attempts.flatMap(attempt => attempt.consumed.map(use => ({ attempt: attempt.id, artifactId: use.artifactId, digest: use.digest }))),
        attempts: episode.final.attempts.map(attempt => ({ id: attempt.id, parent: attempt.parent === null ? UNKNOWN : attempt.parent, outcome: attempt.outcome })),
        environmentCost: UNKNOWN, verdict: done === null ? "not-completed" : `completed@${done}`,
        arms: episode.intervention.arm === "control" ? { controlId: episode.intervention.id, treatmentId: UNKNOWN } : { controlId: UNKNOWN, treatmentId: episode.intervention.id },
      };
    }
    case "mw.landing-queue.elastic.fixture.v1": {
      const landed = episode.final.events.filter(event => event.kind === "landed").length;
      const failed = episode.final.events.filter(event => event.kind === "gate-failed").length;
      return {
        environment: "landing-queue-elastic", tag: "", subjects: event => (event as { candidate: string | null }).candidate,
        detail: event => { const lane = (event as { lane: string | null }).lane; const reason = (event as { reason: string }).reason; return lane === null ? reason : `${reason} [lane=${lane}]`; },
        artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: UNKNOWN,
        verdict: `landed=${landed},gate-failed=${failed},load=${episode.load.code ?? "feasible"}`,
      };
    }
    case "mw.landing-queue-heterogeneous.fixture.v1": {
      const landed = episode.final.events.filter(event => event.kind === "landed").length;
      const failed = episode.final.events.filter(event => event.kind === "gate-failed").length;
      return {
        environment: episode.temporalShift === undefined ? "landing-queue-heterogeneous" : "landing-queue-temporal",
        tag: episode.temporalShift === undefined ? "" : `:shift@${episode.temporalShift.atStep}+${episode.temporalShift.arrivals}`,
        subjects: event => (event as { candidate: string | null }).candidate,
        artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: UNKNOWN,
        verdict: `landed=${landed},gate-failed=${failed}`,
      };
    }
    case "mw.dag-assignment.fixture.v1":
      return {
        environment: "dag-assignment", tag: "", subjects: event => (event as { task: string | null }).task,
        artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: UNKNOWN,
        verdict: `completed=${episode.final.completed.length} of ${episode.final.tasks.length}`,
      };
    case "mw.quorum-evidence.fixture.v1":
      return { environment: "quorum-evidence", tag: `:${episode.gate}`, subjects: event => (event as { candidate: string | null }).candidate, artifacts: UNKNOWN, consumed: UNKNOWN, attempts: UNKNOWN, environmentCost: episode.final.spent, verdict: `gate=${episode.gate}` };
  }
}

function decide(resolution: Resolution, step: number, observationDigest: string, proposed: readonly string[]): EpisodeDecision {
  const intents = [...resolution.admitted, ...resolution.rejected.map(rejection => rejection.intent)];
  return {
    step, observationDigest, proposed: [...proposed],
    eligibility: { admitted: resolution.admitted.map(intent => intent.intentId), rejected: resolution.rejected.map(rejection => ({ intentId: rejection.intent.intentId, code: rejection.code })) },
    logProb: UNKNOWN,
    readSet: uniqueSorted(intents.flatMap(intent => intent.readScopes)),
    provenance: uniqueSorted(intents.flatMap(intent => intent.evidenceRefs)),
  };
}

/**
 * Convert one environment episode to the shared format. Pure: the input is read, never altered, and a fixture
 * episode converts to a fixture episode; a fixture-schema source labelled otherwise is refused with
 * EPISODE_MODE_UPGRADE_FORBIDDEN. The record passes through `sanitizeValue` before it is returned and
 * says that it did.
 */
export function toEpisode(source: EnvironmentEpisode): Episode {
  if ((source.mode as string) !== "fixture") {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture-schema source labelled ${String(source.mode)} cannot be projected above fixture`);
  }
  const parts = describe(source);
  const first = source.steps[0];
  const baseline = BASELINE[parts.environment];
  const isControl = source.policy.id === baseline;
  const spent: BudgetSpend = source.steps.reduce<BudgetSpend>((sum, step) => ({
    compute: sum.compute + step.resolution.budgetUsed.compute, workers: sum.workers + step.resolution.budgetUsed.workers,
    queue: sum.queue + step.resolution.budgetUsed.queue, latencyMs: sum.latencyMs + step.resolution.budgetUsed.latencyMs,
  }), { compute: 0, workers: 0, queue: 0, latencyMs: 0 });
  const body = {
    schema: "mw.episode.v1" as const, version: 1 as const, mode: source.mode as EpisodeMode,
    episodeId: `${source.mode}:${parts.environment}:${source.seed}:${source.policy.id}${parts.tag}`,
    environment: parts.environment, source: { schema: source.schema, seed: source.seed },
    task: { basis: first === undefined ? UNKNOWN : `${first.resolution.basis.workspaceId}@${first.resolution.basis.revision}`, family: parts.environment },
    policy: { id: source.policy.id, revision: source.policy.revision, configHash: digest({ policies: [`${source.policy.id}@${source.policy.revision}`] }) },
    roles: [...ROLES[parts.environment]],
    initialCheckpoint: "initialHash" in source ? source.initialHash : UNKNOWN,
    checkpoints: source.steps.map(step => step.stateHash),
    decisions: source.steps.map(step => decide(step.resolution, step.step, step.observationDigest, step.proposed)),
    events: (source.final.events as readonly { readonly step: number; readonly kind: string; readonly detail: string }[]).map(event => ({
      step: event.step, kind: event.kind, subject: parts.subjects(event) ?? UNKNOWN,
      detail: parts.detail === undefined ? event.detail : parts.detail(event),
    })),
    artifacts: { created: parts.artifacts, consumed: parts.consumed },
    attempts: parts.attempts,
    cost: { steps: source.steps.length, budgetSpent: spent, environmentCost: parts.environmentCost },
    verifier: { label: "fixture" as const, receiptDigest: source.finalHash, verdict: parts.verdict },
    arms: parts.arms ?? { controlId: isControl ? source.policy.id : UNKNOWN, treatmentId: isControl ? UNKNOWN : source.policy.id },
  };
  const clean = sanitizeValue(body);
  return { ...clean.value, sanitize: { ran: true, removed: clean.removed } };
}

/** The exported bytes of one episode: canonical JSON plus a final newline, one byte sequence per episode in either language. */
export function episodeBytes(episode: Episode): string {
  return canonicalJson(episode) + "\n";
}
