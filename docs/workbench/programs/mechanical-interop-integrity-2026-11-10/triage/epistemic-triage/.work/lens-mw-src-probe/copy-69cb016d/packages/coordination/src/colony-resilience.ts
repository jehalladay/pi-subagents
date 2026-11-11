import type { Basis, Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { gateDraws } from "./landing-queue.js";
import { reconcile, type Resolution } from "./resolver.js";

/**
 * The colony-resilience fixture environment (collective-adaptation M1, family 5): a seeded, deterministic world
 * in which workers are killed, signals are poisoned, receipts go stale, graph mutation is denied on protected
 * scopes and the compute budget runs out. It is labelled `fixture` and nothing can relabel it. No file, process,
 * network or product is touched, and TrailCLI/QuorumCLI are modelled as explicitly absent fakes, never invoked.
 *
 * Safety rule of the world: accepting a worker's result while relying on a nonauthoritative signal or a receipt
 * whose basis predates the head is an unsafe effect, counted and never hidden. Unaccepted work is `unknown`, not failed.
 *
 * World generation, four draws per worker from `gateDraws(seed)` in worker order: killed (draw % 3 === 0),
 * nonauthoritative signal (% 3 === 0), stale receipt (% 3 === 0), protected scope (% 7 === 0).
 */

export type SignalAuthority = "authoritative" | "nonauthoritative";
export type ColonyWorkerStatus = "alive" | "killed" | "recovered";
export type ColonyEventKind = "recovered" | "accepted" | "unsafe-effect" | "verified" | "quarantined" | "halted" | "refused";
export type EvidenceClass = "verified" | "unknown";

export interface ColonySignal {
  readonly id: string;
  readonly claim: "verified";
  readonly authority: SignalAuthority;
  readonly trusted: boolean;
}

export interface ColonyReceipt {
  readonly id: string;
  /** The head the receipt was issued against; any other value makes it stale. */
  readonly basis: string;
}

export interface ColonyWorker {
  readonly id: string;
  readonly status: ColonyWorkerStatus;
  readonly initiallyKilled: boolean;
  /** The write scope any intent on this worker claims; a protected one is refused by the resolver. */
  readonly scope: string;
  readonly signal: ColonySignal;
  readonly receipt: ColonyReceipt;
  readonly acceptedVia: null | "evidence" | "verify";
  readonly unsafe: boolean;
}

export interface ColonyEvent {
  readonly step: number;
  readonly kind: ColonyEventKind;
  readonly worker: string | null;
  readonly detail: string;
}

export interface ColonyState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly head: string;
  readonly computeStart: number;
  readonly computeLeft: number;
  readonly protectedScopes: readonly string[];
  /** Workers whose scope the resolver has refused as protected; the world tells policies, who may then stop trying. */
  readonly denied: readonly string[];
  readonly halted: boolean;
  /** Trail and Quorum are explicitly absent optional fakes (MWCOL-006): never invoked, never impersonated. */
  readonly fakes: { readonly trail: "absent"; readonly quorum: "absent" };
  readonly workers: readonly ColonyWorker[];
  readonly events: readonly ColonyEvent[];
}

export interface ColonyObservation {
  readonly basis: Basis;
  readonly head: string;
  readonly computeLeft: number;
  readonly denied: readonly string[];
  readonly workers: readonly ColonyWorker[];
}

export interface ColonyStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly ColonyEvent[];
  readonly stateHash: string;
}

export interface ColonyEpisode {
  readonly schema: "mw.colony-resilience.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly ColonyStep[];
  readonly final: ColonyState;
  /** The state hash before step 0 (the freshly built initial state). */
  readonly initialHash: string;
  readonly finalHash: string;
}

export interface ColonyRun {
  readonly seed: number;
  readonly workers: number;
  readonly compute: number;
  readonly steps: number;
  readonly policy: Policy<ColonyObservation, Intent, number>;
}

export interface ColonyOutcome {
  readonly unsafeEffects: number;
  readonly recovered: number;
  readonly spend: number;
  readonly group: "all-success" | "all-fail" | "mixed";
}

const WORKSPACE = "fixture:colony-resilience";
const HEAD = "head-3";
const STALE = "head-2";

/** A signal and receipt together are `verified` only when the signal is authoritative and the receipt is on the head. */
export function classifyEvidence(signal: { readonly authority: SignalAuthority }, receipt: { readonly basis: string }, head: string): EvidenceClass {
  return signal.authority === "authoritative" && receipt.basis === head ? "verified" : "unknown";
}

function initialState(seed: number, workers: number, compute: number): ColonyState {
  const draw = gateDraws(seed);
  const list: ColonyWorker[] = [];
  const protectedScopes: string[] = [];
  for (let index = 1; index <= workers; index += 1) {
    const id = `w${index}`;
    const killed = draw() % 3 === 0;
    const poisoned = draw() % 3 === 0;
    const stale = draw() % 3 === 0;
    const guarded = draw() % 7 === 0;
    const scope = guarded ? `graph:protected:${id}` : `worker:${id}`;
    if (guarded) protectedScopes.push(scope);
    list.push({
      id, status: killed ? "killed" : "alive", initiallyKilled: killed, scope,
      signal: { id: `sig-${id}`, claim: "verified", authority: poisoned ? "nonauthoritative" : "authoritative", trusted: true },
      receipt: { id: `rcp-${id}`, basis: stale ? STALE : HEAD }, acceptedVia: null, unsafe: false,
    });
  }
  return { mode: "fixture", seed, step: 0, head: HEAD, computeStart: compute, computeLeft: compute, protectedScopes, denied: [], halted: false, fakes: { trail: "absent", quorum: "absent" }, workers: list, events: [] };
}

function observe(state: ColonyState): ColonyObservation {
  return { basis: { workspaceId: WORKSPACE, revision: state.head }, head: state.head, computeLeft: state.computeLeft, denied: state.denied, workers: state.workers };
}

function workerOf(intent: Intent): string | null {
  return intent.target.kind === "worker" && intent.target.uri.startsWith("worker:") ? intent.target.uri.slice("worker:".length) : null;
}

function intentFor(policyId: string, observation: ColonyObservation, effect: string, worker: ColonyWorker, spend: number, writeScope: string, evidenceRefs: readonly string[]): Intent {
  return {
    intentId: `${policyId}:${effect}:${worker.id}`, policyId, target: { kind: "worker", uri: `worker:${worker.id}` },
    expectedRevision: observation.basis.revision, effect, claim: { compute: spend, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs, writeScopes: [writeScope], readScopes: [],
  };
}

function haltIntent(policyId: string, observation: ColonyObservation, detail: string): Intent {
  return {
    intentId: `${policyId}:halt`, policyId, target: { kind: "colony", uri: "colony:fixture" }, expectedRevision: observation.basis.revision,
    effect: "halt", claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: [detail], writeScopes: ["colony"], readScopes: [],
  };
}

/** Trusts every signal and receipt: retries every unaccepted worker and accepts its result on the evidence it was handed. */
export const naiveRetry: Policy<ColonyObservation, Intent, number> = {
  id: "naive-retry", revision: "fixture-1",
  propose(observation, memory) {
    const intents = observation.workers.filter(w => w.acceptedVia === null)
      .map(w => intentFor("naive-retry", observation, "retry", w, 0, w.scope, [w.signal.id, w.receipt.id]));
    return { intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: "naive-retry", detail: `retry ${intents.length} workers` }] };
  },
};

/** Treats stale receipts and nonauthoritative signals as unknown, spends on verify before accepting, and halts when nothing can progress. */
export const receiptChecked: Policy<ColonyObservation, Intent, number> = {
  id: "receipt-checked", revision: "fixture-1",
  propose(observation, memory) {
    const intents: Intent[] = [];
    const id = "receipt-checked";
    for (const worker of observation.workers) {
      if (worker.acceptedVia !== null || observation.denied.includes(worker.id)) continue;
      if (worker.status === "killed") {
        if (observation.computeLeft > 0) intents.push(intentFor(id, observation, "reassign", worker, 1, worker.scope, []));
      } else if (worker.signal.authority === "nonauthoritative" && worker.signal.trusted) {
        intents.push(intentFor(id, observation, "quarantine", worker, 0, `signal:${worker.id}`, [worker.signal.id]));
      } else if (classifyEvidence(worker.signal, worker.receipt, observation.head) === "verified") {
        intents.push(intentFor(id, observation, "retry", worker, 0, worker.scope, [worker.signal.id, worker.receipt.id]));
      } else if (observation.computeLeft > 0) {
        intents.push(intentFor(id, observation, "verify", worker, 1, worker.scope, [worker.receipt.id]));
      }
    }
    const halting = intents.length === 0 && observation.workers.some(w => w.acceptedVia === null);
    if (halting) intents.push(haltIntent(id, observation, observation.computeLeft === 0 ? "budget exhausted" : "only denied workers remain"));
    return { intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: halting ? "halt" : `${intents.length} intents` }] };
  },
};

function budgetFor(state: ColonyState): Budget {
  return { compute: state.computeLeft, workers: 1000, queue: 1000, latencyMs: 1000 };
}

function apply(state: ColonyState, resolution: Resolution): { readonly state: ColonyState; readonly events: readonly ColonyEvent[] } {
  const step = state.step + 1;
  const events: ColonyEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", worker: workerOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` }));
  const denied = [...state.denied];
  for (const rejection of resolution.rejected) {
    const id = workerOf(rejection.intent);
    if (rejection.code === "INTENT_SCOPE_PROTECTED" && id !== null && !denied.includes(id)) denied.push(id);
  }
  let workers = state.workers;
  let halted = state.halted;
  const update = (id: string, change: (worker: ColonyWorker) => ColonyWorker): void => { workers = workers.map(worker => worker.id === id ? change(worker) : worker); };
  for (const intent of resolution.admitted) {
    const id = workerOf(intent);
    if (intent.effect === "halt") { halted = true; events.push({ step, kind: "halted", worker: null, detail: intent.evidenceRefs.join(", ") }); continue; }
    const worker = id === null ? undefined : workers.find(candidate => candidate.id === id);
    if (id === null || worker === undefined) continue;
    if (intent.effect === "quarantine") {
      update(id, w => ({ ...w, signal: { ...w.signal, trusted: false } }));
      events.push({ step, kind: "quarantined", worker: id, detail: `${worker.signal.id} marked untrusted` });
    } else if (intent.effect === "reassign" || intent.effect === "retry" || intent.effect === "verify") {
      if (worker.status === "killed") {
        if (intent.effect === "verify") { events.push({ step, kind: "refused", worker: id, detail: `${id} is killed and cannot be verified` }); continue; }
        update(id, w => ({ ...w, status: "recovered" }));
        events.push({ step, kind: "recovered", worker: id, detail: `${id} recovered by ${intent.effect}` });
      }
      if (intent.effect === "verify") {
        update(id, w => ({ ...w, receipt: { ...w.receipt, basis: state.head }, signal: { ...w.signal, authority: "authoritative" }, acceptedVia: "verify" }));
        events.push({ step, kind: "verified", worker: id, detail: `${id} verified on ${state.head}` });
      } else if (intent.effect === "retry") {
        const unsafe = classifyEvidence(worker.signal, worker.receipt, state.head) !== "verified";
        update(id, w => ({ ...w, acceptedVia: "evidence", unsafe }));
        events.push({ step, kind: unsafe ? "unsafe-effect" : "accepted", worker: id, detail: unsafe ? `${id} accepted on ${worker.signal.authority} ${worker.signal.id} and receipt basis ${worker.receipt.basis}` : `${id} accepted on verified evidence` });
      }
    } else {
      events.push({ step, kind: "refused", worker: id, detail: `effect ${intent.effect} is not a colony effect` });
    }
  }
  const spent = resolution.budgetUsed.compute;
  return { state: { ...state, step, workers, denied, halted, computeLeft: state.computeLeft - spent, events: [...state.events, ...events] }, events };
}

/** `digest` of the whole state, events included. */
export function colonyStateHash(state: ColonyState): string {
  return digest(state);
}

/** Run one policy against the fixture until every worker is accepted, the policy halts or the step budget ends. */
export function runColonyResilience(run: ColonyRun): ColonyEpisode {
  let state = initialState(run.seed, run.workers, run.compute);
  const initialHash = colonyStateHash(state);
  let memory = 0;
  const steps: ColonyStep[] = [];
  for (let index = 0; index < run.steps && !state.halted && state.workers.some(w => w.acceptedVia === null); index += 1) {
    const observation = observe(state);
    const observationDigest = digest(observation);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:colony-resilience:${run.seed}`, actorId: run.policy.id, observationDigest, budget: budgetFor(state),
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget: budgetFor(state), protectedScopes: state.protectedScopes, proposals: [proposal] });
    const applied = apply(state, resolution);
    state = applied.state;
    steps.push({ step: state.step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events: applied.events, stateHash: colonyStateHash(state) });
  }
  return { schema: "mw.colony-resilience.fixture.v1", mode: "fixture", seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: colonyStateHash(state) };
}

/** Unsafe-effect count, recovered workers, compute spend and terminal group read off a final state. */
export function colonyOutcome(state: ColonyState): ColonyOutcome {
  const safe = state.workers.filter(w => w.acceptedVia !== null && !w.unsafe).length;
  return {
    unsafeEffects: state.workers.filter(w => w.unsafe).length, recovered: state.workers.filter(w => w.status === "recovered").length,
    spend: state.computeStart - state.computeLeft, group: safe === state.workers.length ? "all-success" : safe === 0 ? "all-fail" : "mixed",
  };
}

/**
 * The independent oracle: plain loops over the same draw sequence, no policy objects, resolver, state record or
 * event history. It answers only the outcome; a harness run that disagrees with it is wrong somewhere.
 */
export function oracleColonyOutcome(run: { readonly seed: number; readonly workers: number; readonly compute: number; readonly steps: number; readonly policy: "naive-retry" | "receipt-checked" }): ColonyOutcome {
  const draw = gateDraws(run.seed);
  const n = run.workers;
  const killed: boolean[] = [], poisoned: boolean[] = [], stale: boolean[] = [], guarded: boolean[] = [];
  for (let i = 0; i < n; i += 1) { killed.push(draw() % 3 === 0); poisoned.push(draw() % 3 === 0); stale.push(draw() % 3 === 0); guarded.push(draw() % 7 === 0); }
  const recovered = new Array<boolean>(n).fill(false), accepted = new Array<boolean>(n).fill(false), unsafe = new Array<boolean>(n).fill(false);
  const denied = new Array<boolean>(n).fill(false), quarantined = new Array<boolean>(n).fill(false);
  let left = run.compute;
  let halted = false;
  for (let step = 0; step < run.steps && !halted && accepted.includes(false); step += 1) {
    let budget = left;
    let spent = 0;
    let proposals = 0;
    const act = (i: number, cost: number, effect: "reassign" | "retry" | "verify" | "quarantine"): void => {
      proposals += 1;
      if (guarded[i]) { denied[i] = true; return; }
      if (cost > budget) return;
      budget -= cost; spent += cost;
      if (effect === "quarantine") { quarantined[i] = true; return; }
      if (killed[i] && !recovered[i]) {
        if (effect === "verify") return;
        recovered[i] = true;
      }
      if (effect === "verify") { stale[i] = false; poisoned[i] = false; accepted[i] = true; }
      if (effect === "retry") { accepted[i] = true; unsafe[i] = poisoned[i] === true || stale[i] === true; }
    };
    for (let i = 0; i < n; i += 1) {
      if (accepted[i]) continue;
      if (run.policy === "naive-retry") { act(i, 0, "retry"); continue; }
      if (denied[i]) continue;
      const isKilled = killed[i] && !recovered[i];
      if (isKilled) { if (left > 0) act(i, 1, "reassign"); }
      else if (poisoned[i] && !quarantined[i]) act(i, 0, "quarantine");
      else if (!poisoned[i] && !stale[i]) act(i, 0, "retry");
      else if (left > 0) act(i, 1, "verify");
    }
    if (proposals === 0 && run.policy === "receipt-checked") halted = true;
    left -= spent;
  }
  const safe = accepted.filter((done, i) => done && !unsafe[i]).length;
  return {
    unsafeEffects: unsafe.filter(Boolean).length, recovered: recovered.filter(Boolean).length, spend: run.compute - left,
    group: safe === n ? "all-success" : safe === 0 ? "all-fail" : "mixed",
  };
}

/** A fixture episode stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelColonyEpisode(episode: ColonyEpisode, mode: string): ColonyEpisode {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture episode cannot be labelled ${mode}`);
  return episode;
}
