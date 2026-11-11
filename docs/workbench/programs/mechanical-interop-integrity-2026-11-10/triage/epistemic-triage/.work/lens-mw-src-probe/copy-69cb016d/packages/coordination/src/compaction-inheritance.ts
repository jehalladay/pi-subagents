import type { Basis, Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { reconcile, type Resolution } from "./resolver.js";
import { gateDraws } from "./landing-queue.js";

/**
 * The compaction-inheritance fixture environment (collective-adaptation M1, MWCOL-003 artifact inheritance): a seeded,
 * deterministic world where a worker is replaced on every step and only the summary a policy chose to persist survives
 * the replacement. A seeded draw corrupts the survivor's bytes so the provenance digest it recorded (a digest over the
 * source it summarises) no longer matches. Labelled `fixture`; nothing can relabel it. No file, process, network or
 * product is touched, and every transition is a pure function of the previous state.
 */

export type SummaryStatus = "pending" | "persisted" | "omitted";
export type CompactionEventKind = "replaced" | "corrupted" | "persisted" | "omitted" | "routed" | "annotated" | "compacted" | "downstream-failed" | "refused";
export type OutcomeStatus = "succeeded" | "rediscovered" | "failed" | "unresolved";

export interface CompactionSummary {
  readonly id: string;
  readonly task: string;
  readonly source: string;
  /** The summary's bytes as they stand now; a corruption draw alters them. */
  readonly body: string;
  /** Digest over `source` and the summary body as first compacted; valid exactly while `body` still hashes to it. */
  readonly provenance: string;
  readonly status: SummaryStatus;
}

export interface CompactionEvent {
  readonly step: number;
  readonly kind: CompactionEventKind;
  readonly summary: string | null;
  readonly detail: string;
}

export interface CompactionOutcome {
  readonly task: string;
  readonly summary: string;
  readonly status: OutcomeStatus;
  readonly cost: number;
}

export interface CompactionState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  /** Count of worker replacements so far. */
  readonly worker: number;
  readonly summaries: readonly CompactionSummary[];
  readonly outcomes: readonly CompactionOutcome[];
  readonly cost: number;
  /** Downstream success minus cost: three points per completed task less the total cost paid. */
  readonly score: number;
  readonly events: readonly CompactionEvent[];
}

/** What a compaction policy observes: the pinned basis, the step, and the summary that survived the replacement. */
export interface CompactionObservation {
  readonly basis: Basis;
  readonly step: number;
  readonly worker: number;
  readonly summary: CompactionSummary;
  readonly completed: number;
}

export interface CompactionStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly CompactionEvent[];
  readonly stateHash: string;
}

export interface CompactionInheritanceEpisode {
  readonly schema: "mw.compaction-inheritance.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly CompactionStep[];
  readonly final: CompactionState;
  /** The state hash before step 0 (the freshly built initial state). */
  readonly initialHash: string;
  readonly finalHash: string;
}

export interface CompactionInheritanceRun {
  readonly seed: number;
  /** One downstream task, one summary and one worker replacement per step. */
  readonly tasks: number;
  readonly policy: Policy<CompactionObservation, Intent, number>;
}

const WORKSPACE = "fixture:compaction-inheritance";
const SUCCESS_VALUE = 3;
const PERSIST_COST = 1;
const REPAIR_COST = 1;
const FAILURE_COST = 4;
const REDISCOVERY_COST = 2;

/** The recorded provenance of a summary: a digest over its source and its bytes. */
export function summaryProvenance(source: string, body: string): string {
  return digest({ source, body });
}

function isValid(summary: CompactionSummary): boolean {
  return summaryProvenance(summary.source, summary.body) === summary.provenance;
}

function initialState(seed: number, tasks: number): CompactionState {
  return {
    mode: "fixture", seed, step: 0, worker: 0,
    summaries: Array.from({ length: tasks }, (_, index) => {
      const source = `src-${index + 1}`;
      const body = `summary of ${source}`;
      return { id: `s${index + 1}`, task: `t${index + 1}`, source, body, provenance: summaryProvenance(source, body), status: "pending" as const };
    }),
    outcomes: [], cost: 0, score: 0, events: [],
  };
}

/** A third of draws corrupt the survivor: a fault the policy did not choose and cannot suppress. */
function corrupts(draw: number): boolean {
  return draw % 3 === 0;
}

function observe(state: CompactionState): CompactionObservation {
  return {
    basis: { workspaceId: WORKSPACE, revision: `step-${state.step}` }, step: state.step, worker: state.worker,
    summary: state.summaries[state.step - 1]!, completed: state.outcomes.length,
  };
}

function summaryOf(intent: Intent): string | null {
  return intent.target.kind === "summary" && intent.target.uri.startsWith("sum:") ? intent.target.uri.slice("sum:".length) : null;
}

function intentFor(policyId: string, observation: CompactionObservation, effect: string, evidenceRefs: readonly string[] = []): Intent {
  const summary = observation.summary;
  const task = effect === "route";
  return {
    intentId: `${policyId}:${effect}:${summary.id}`, policyId,
    target: task ? { kind: "task", uri: `task:${summary.task}` } : { kind: "summary", uri: `sum:${summary.id}` },
    expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs, writeScopes: [task ? `task:${summary.task}` : `sum:${summary.id}`], readScopes: [],
  };
}

/** Persists every survivor unchecked, so a corrupted summary is consumed downstream and fails the task. */
export const persistAll: Policy<CompactionObservation, Intent, number> = {
  id: "persist-all", revision: "fixture-1",
  propose(observation, memory) {
    return {
      intents: [intentFor("persist-all", observation, "persist")], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "persist-all", detail: `persist ${observation.summary.id}` }],
    };
  },
};

/** Recomputes the provenance digest: persists a match, omits a mismatch with the digests as evidence and routes a rediscovery. */
export const provenanceChecked: Policy<CompactionObservation, Intent, number> = {
  id: "provenance-checked", revision: "fixture-1",
  propose(observation, memory) {
    const summary = observation.summary;
    const recomputed = summaryProvenance(summary.source, summary.body);
    const valid = recomputed === summary.provenance;
    return {
      intents: valid
        ? [intentFor("provenance-checked", observation, "persist")]
        : [intentFor("provenance-checked", observation, "omit", [`recorded:${summary.provenance}`, `recomputed:${recomputed}`]), intentFor("provenance-checked", observation, "route")],
      memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "provenance-checked", detail: valid ? `persist ${summary.id}` : `omit ${summary.id}, route rediscovery` }],
    };
  },
};

function budgetFor(tasks: number): Budget {
  return { compute: 4, workers: 4, queue: tasks, latencyMs: 1000 };
}

function mismatch(summary: CompactionSummary): string {
  return `provenance mismatch: recorded ${summary.provenance} recomputed ${summaryProvenance(summary.source, summary.body)}`;
}

function withSummary(state: CompactionState, next: CompactionSummary): CompactionState {
  return { ...state, summaries: state.summaries.map(summary => summary.id === next.id ? next : summary) };
}

function settle(state: CompactionState, summary: CompactionSummary, status: OutcomeStatus, cost: number): CompactionState {
  const completes = status === "succeeded" || status === "rediscovered";
  const total = state.cost + cost;
  return {
    ...state, cost: total, score: state.score + (completes ? SUCCESS_VALUE : 0) - cost,
    outcomes: [...state.outcomes, { task: summary.task, summary: summary.id, status, cost }],
  };
}

/** The replacement happens before the policy observes: a worker dies and the seeded draw may corrupt what it left behind. */
function replace(before: CompactionState, draw: number): { readonly state: CompactionState; readonly events: readonly CompactionEvent[] } {
  const step = before.step + 1;
  const events: CompactionEvent[] = [{ step, kind: "replaced", summary: null, detail: `worker ${before.worker + 1} replaces worker ${before.worker}` }];
  let state: CompactionState = { ...before, step, worker: before.worker + 1 };
  const original = state.summaries[step - 1]!;
  if (corrupts(draw)) {
    state = withSummary(state, { ...original, body: `${original.body} #corrupted` });
    events.push({ step, kind: "corrupted", summary: original.id, detail: `${original.id} bytes altered by seeded draw` });
  }
  return { state, events };
}

function apply(before: CompactionState, resolution: Resolution): { readonly state: CompactionState; readonly events: readonly CompactionEvent[] } {
  const step = before.step;
  const events: CompactionEvent[] = [];
  let state: CompactionState = before;
  for (const rejection of resolution.rejected) {
    events.push({ step, kind: "refused", summary: summaryOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` });
  }
  let repairCost = 0;
  let omitted = false;
  let decided = false;
  const current = (): CompactionSummary => state.summaries[step - 1]!;
  for (const intent of resolution.admitted) {
    const summary = current();
    if (intent.effect === "annotate") {
      events.push({ step, kind: "annotated", summary: summary.id, detail: `${summary.id} annotated with ${isValid(summary) ? "valid" : "invalid"} provenance` });
    } else if (intent.effect === "compact") {
      if (!isValid(summary)) {
        state = withSummary(state, { ...summary, body: `summary of ${summary.source}` });
        repairCost += REPAIR_COST;
        events.push({ step, kind: "compacted", summary: summary.id, detail: `${summary.id} re-derived from ${summary.source}` });
      }
    } else if (intent.effect === "persist" && !decided) {
      decided = true;
      state = withSummary(state, { ...summary, status: "persisted" });
      events.push({ step, kind: "persisted", summary: summary.id, detail: `${summary.id} persisted across the replacement` });
      if (isValid(summary)) {
        state = settle(state, summary, "succeeded", PERSIST_COST + repairCost);
      } else {
        events.push({ step, kind: "downstream-failed", summary: summary.id, detail: `${summary.task} consumed ${summary.id}: ${mismatch(summary)}` });
        state = settle(state, summary, "failed", FAILURE_COST + repairCost);
      }
    } else if (intent.effect === "omit") {
      omitted = true;
      state = withSummary(state, { ...summary, status: "omitted" });
      events.push({ step, kind: "omitted", summary: summary.id, detail: `${summary.id} omitted: ${mismatch(summary)}` });
    } else if (intent.effect === "route" && !decided) {
      decided = true;
      events.push({ step, kind: "routed", summary: summary.id, detail: `${summary.task} routed to rediscovery${omitted ? " after omission" : ""}` });
      state = settle(state, summary, "rediscovered", REDISCOVERY_COST + repairCost);
    } else {
      events.push({ step, kind: "refused", summary: summaryOf(intent), detail: `effect ${intent.effect} is not a compaction-inheritance effect here` });
    }
  }
  if (!decided) state = settle(state, current(), "unresolved", repairCost);
  return { state, events };
}

/** `digest` of the whole state, events included: equal states have equal hashes whatever produced them. */
export function compactionStateHash(state: CompactionState): string {
  return digest(state);
}

/** Run one policy against the fixture; every step records what was proposed, resolved and applied. */
export function runCompactionInheritance(run: CompactionInheritanceRun): CompactionInheritanceEpisode {
  const draws = gateDraws(run.seed);
  let state = initialState(run.seed, run.tasks);
  const initialHash = compactionStateHash(state);
  let memory = 0;
  const steps: CompactionStep[] = [];
  for (let index = 0; index < run.tasks; index += 1) {
    const replaced = replace(state, draws());
    const observation = observe(replaced.state);
    const observationDigest = digest(observation);
    const budget = budgetFor(run.tasks);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:compaction-inheritance:${run.seed}`, actorId: run.policy.id, observationDigest, budget,
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget, protectedScopes: [], proposals: [proposal] });
    const applied = apply(replaced.state, resolution);
    const events = [...replaced.events, ...applied.events];
    state = { ...applied.state, events: [...state.events, ...events] };
    steps.push({ step: state.step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events, stateHash: compactionStateHash(state) });
  }
  return { schema: "mw.compaction-inheritance.fixture.v1", mode: "fixture", seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: compactionStateHash(state) };
}

/**
 * The independent oracle: plain loops over the same seed and draw sequence, no policy, resolver or event record,
 * answering only each task's status, the total cost and the score. A harness run that disagrees with it is wrong somewhere.
 */
export function oracleCompactionOutcome(run: { readonly seed: number; readonly tasks: number; readonly policy: "persist-all" | "provenance-checked" }): { readonly statuses: OutcomeStatus[]; readonly cost: number; readonly score: number } {
  const draws = gateDraws(run.seed);
  const statuses: OutcomeStatus[] = [];
  let cost = 0;
  let completed = 0;
  for (let task = 0; task < run.tasks; task += 1) {
    const bad = draws() % 3 === 0;
    if (!bad) { statuses.push("succeeded"); cost += 1; completed += 1; }
    else if (run.policy === "persist-all") { statuses.push("failed"); cost += 4; }
    else { statuses.push("rediscovered"); cost += 2; completed += 1; }
  }
  return { statuses, cost, score: completed * 3 - cost };
}

/** A fixture episode stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelCompactionEpisode(episode: CompactionInheritanceEpisode, mode: string): CompactionInheritanceEpisode {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture episode cannot be labelled ${mode}`);
  return episode;
}
