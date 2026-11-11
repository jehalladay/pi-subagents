import type { Basis, Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { gateDraws } from "./landing-queue.js";
import { reconcile, type Resolution } from "./resolver.js";

/**
 * The artifact-recovery fixture environment (collective-adaptation M1, MWCOL-003 failure injection, MWCOL-007
 * cross-attempt continuity): a producer attempt does partial work and crashes at a seeded step, leaving a
 * snapshot artifact; a successor attempt either keeps that artifact (treatment) or finds it removed (control) and
 * finishes the same work. The environment only records the control/treatment id; what a learner does with the two
 * arms is outside it. Labelled `fixture`, and nothing can relabel it. No file, process, network or product is
 * touched: every transition is a pure function of the previous state and the seeded draws.
 */

export type RecoveryArm = "treatment" | "control";

export interface RecoveryIntervention {
  readonly arm: RecoveryArm;
  readonly id: string;
}

export interface RecoveryArtifact {
  readonly id: string;
  readonly producer: string;
  /** Work units the artifact lets a consumer skip. */
  readonly progress: number;
  /** The provenance digest the artifact claims; it matches `artifactProvenance` unless the artifact was tampered with. */
  readonly digest: string;
}

/** An artifact an earlier episode's failed attempt left behind, offered to this episode's successor (MWCOL-007 across episodes). */
export interface InheritedArtifact extends RecoveryArtifact {
  /** The episode id (`fixture:artifact-recovery:<seed>`) whose failed attempt produced the artifact. */
  readonly originEpisode: string;
}

export interface RecoveryInheritance {
  readonly episode: string;
  readonly artifactId: string;
  readonly digest: string;
}

export interface RecoveryAttempt {
  readonly id: string;
  readonly parent: string | null;
  readonly outcome: "crashed" | "running" | "completed";
  readonly progress: number;
  readonly consumed: readonly { readonly artifactId: string; readonly digest: string }[];
}

export type RecoveryEventKind =
  | "attempt-started" | "worked" | "crashed" | "artifact-created" | "artifact-removed" | "artifact-consumed"
  | "artifact-refused" | "artifact-unavailable" | "completed" | "refused";

export interface RecoveryEvent {
  /** 0 for the producer phase, which happens before the first policy step. */
  readonly step: number;
  readonly kind: RecoveryEventKind;
  readonly attempt: string;
  readonly detail: string;
}

export interface RecoveryState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly work: number;
  readonly crashStep: number;
  readonly intervention: RecoveryIntervention;
  readonly artifact: RecoveryArtifact | null;
  readonly attempts: readonly RecoveryAttempt[];
  readonly completedAtStep: number | null;
  readonly events: readonly RecoveryEvent[];
  /** Present only when an earlier episode's artifact was injected; absent for a self-contained episode. */
  readonly inheritedFrom?: RecoveryInheritance;
}

/** What a recovery policy observes: the pinned basis, the successor attempt, its progress and the artifact it may consume. */
export interface RecoveryObservation {
  readonly basis: Basis;
  readonly attemptId: string;
  readonly parent: string | null;
  readonly progress: number;
  readonly work: number;
  readonly completed: boolean;
  readonly consumed: boolean;
  readonly artifact: RecoveryArtifact | null;
}

export interface RecoveryStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly RecoveryEvent[];
  readonly stateHash: string;
}

export interface RecoveryEpisode {
  readonly schema: "mw.artifact-recovery.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly intervention: RecoveryIntervention;
  readonly inheritedFrom?: RecoveryInheritance;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly RecoveryStep[];
  readonly final: RecoveryState;
  /** The state hash before step 0 (the freshly built initial state). */
  readonly initialHash: string;
  readonly finalHash: string;
}

export interface RecoveryRun {
  readonly seed: number;
  /** Work units the task needs; at least 4 so a crash always leaves a snapshot and a resume always saves steps. */
  readonly work: number;
  readonly steps: number;
  readonly policy: Policy<RecoveryObservation, Intent, number>;
  /** Force the arm; absent means the seed decides. */
  readonly arm?: RecoveryArm;
  /** Failure injection: the stored artifact's provenance digest no longer matches its content. */
  readonly corruptArtifact?: boolean;
  /** An artifact from an earlier episode that replaces this episode's own producer snapshot as the one the successor may consume. */
  readonly inheritedArtifact?: InheritedArtifact;
}

const WORKSPACE = "fixture:artifact-recovery";
const PRODUCER = "a1";
const SUCCESSOR = "a2";
const ARTIFACT_ID = "artifact-a1";

function checkRun(run: { readonly seed: number; readonly work: number; readonly steps: number }): void {
  if (!Number.isInteger(run.seed) || !Number.isInteger(run.work) || run.work < 4 || !Number.isInteger(run.steps) || run.steps < 0) {
    throw new RangeError(`ARTIFACT_RECOVERY_INVALID_RUN: seed ${run.seed}, work ${run.work}, steps ${run.steps}`);
  }
}

/** An injected artifact is trusted only when its claimed digest matches its content; a mismatch is refused before any step runs. */
function checkInherited(inherited: InheritedArtifact | undefined): void {
  if (inherited === undefined) return;
  const expected = artifactProvenance(inherited);
  if (inherited.digest !== expected) {
    throw new RangeError(`ARTIFACT_INHERITED_DIGEST_MISMATCH: ${inherited.id} from ${inherited.originEpisode} claims ${inherited.digest}, content gives ${expected}`);
  }
}

/** The two seeded decisions, drawn in a fixed order so a forced arm never shifts the crash step. */
function seededDecisions(seed: number, work: number): { readonly crashStep: number; readonly arm: RecoveryArm } {
  const draw = gateDraws(seed);
  const crashStep = 3 + (draw() % (work - 3));
  const arm: RecoveryArm = draw() % 2 === 0 ? "treatment" : "control";
  return { crashStep, arm };
}

/** Provenance digest of an artifact's identity and content; a consumer recomputes it before trusting the claim. */
export function artifactProvenance(content: { readonly id: string; readonly producer: string; readonly progress: number }): string {
  return digest({ id: content.id, producer: content.producer, progress: content.progress });
}

function interventionOf(arm: RecoveryArm): RecoveryIntervention {
  return { arm, id: arm === "treatment" ? "treatment:artifact-kept" : "control:artifact-removed" };
}

function initialState(run: RecoveryRun): RecoveryState {
  const decided = seededDecisions(run.seed, run.work);
  const arm = run.arm ?? decided.arm;
  const snapshot = decided.crashStep - 1;
  const inherited = run.inheritedArtifact;
  const own = { id: ARTIFACT_ID, producer: PRODUCER, progress: snapshot };
  const content = inherited !== undefined ? { id: inherited.id, producer: inherited.producer, progress: inherited.progress } : own;
  const claimed = inherited !== undefined ? inherited.digest : run.corruptArtifact === true ? artifactProvenance({ ...own, progress: snapshot + 1 }) : artifactProvenance(own);
  const events: RecoveryEvent[] = [
    { step: 0, kind: "attempt-started", attempt: PRODUCER, detail: `${PRODUCER} started the ${run.work}-unit task` },
    { step: 0, kind: "crashed", attempt: PRODUCER, detail: `${PRODUCER} crashed at step ${decided.crashStep} after snapshotting ${snapshot} units` },
    {
      step: 0, kind: "artifact-created", attempt: PRODUCER,
      detail: inherited !== undefined
        ? `${content.id} inherited from ${inherited.originEpisode}, holds ${content.progress} units, provenance ${claimed}`
        : `${ARTIFACT_ID} holds ${snapshot} units, provenance ${claimed}`,
    },
  ];
  if (arm === "control") events.push({ step: 0, kind: "artifact-removed", attempt: PRODUCER, detail: `${content.id} removed by the control intervention` });
  events.push({ step: 0, kind: "attempt-started", attempt: SUCCESSOR, detail: `${SUCCESSOR} started with parent ${PRODUCER}` });
  return {
    mode: "fixture", seed: run.seed, step: 0, work: run.work, crashStep: decided.crashStep, intervention: interventionOf(arm),
    artifact: arm === "treatment" ? { ...content, digest: claimed } : null,
    attempts: [
      { id: PRODUCER, parent: null, outcome: "crashed", progress: snapshot, consumed: [] },
      { id: SUCCESSOR, parent: PRODUCER, outcome: "running", progress: 0, consumed: [] },
    ],
    completedAtStep: null, events,
    ...(inherited !== undefined ? { inheritedFrom: { episode: inherited.originEpisode, artifactId: inherited.id, digest: inherited.digest } } : {}),
  };
}

function successorOf(state: RecoveryState): RecoveryAttempt {
  return state.attempts[state.attempts.length - 1]!;
}

function observe(state: RecoveryState): RecoveryObservation {
  const successor = successorOf(state);
  return {
    basis: { workspaceId: WORKSPACE, revision: `${successor.id}@${successor.progress}` }, attemptId: successor.id, parent: successor.parent,
    progress: successor.progress, work: state.work, completed: state.completedAtStep !== null, consumed: successor.consumed.length > 0, artifact: state.artifact,
  };
}

function intentFor(policyId: string, observation: RecoveryObservation, effect: string, evidenceRefs: readonly string[]): Intent {
  const scope = `attempt:${observation.attemptId}`;
  return {
    intentId: `${policyId}:${effect}:${observation.basis.revision}`, policyId, target: { kind: "attempt", uri: scope },
    expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs, writeScopes: [scope], readScopes: [],
  };
}

/** Ignores the producer's artifact and does the whole task again: the cost of the crash, whichever arm it is in. */
export const restartFromScratch: Policy<RecoveryObservation, Intent, number> = {
  id: "restart-from-scratch", revision: "fixture-1",
  propose(observation, memory) {
    return {
      intents: observation.completed ? [] : [intentFor("restart-from-scratch", observation, "work", [])], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "restart-from-scratch", detail: observation.completed ? "completed" : "work from scratch" }],
    };
  },
};

/** Consumes the producer's artifact when it is present and its provenance digest matches; otherwise records why and restarts. */
export const resumeFromSnapshot: Policy<RecoveryObservation, Intent, number> = {
  id: "resume-from-snapshot", revision: "fixture-1",
  propose(observation, memory) {
    const id = "resume-from-snapshot";
    if (observation.completed) return { intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: "completed" }] };
    if (memory === 0 && !observation.consumed) {
      const artifact = observation.artifact;
      if (artifact !== null && artifact.digest === artifactProvenance(artifact)) {
        return { intents: [intentFor(id, observation, "consume-artifact", [artifact.digest])], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: `consume ${artifact.id}` }] };
      }
      const reason = artifact === null ? "absent" : "digest-mismatch";
      return {
        intents: [intentFor(id, observation, "work", [`artifact-unavailable:${reason}`])], memory: memory + 1,
        trace: [{ kind: "proposed", policyId: id, detail: `artifact unavailable (${reason}); restart` }],
      };
    }
    return { intents: [intentFor(id, observation, "work", [])], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: "work" }] };
  },
};

function budgetFor(): Budget {
  return { compute: 1, workers: 1, queue: 1, latencyMs: 1000 };
}

function replaceSuccessor(state: RecoveryState, next: RecoveryAttempt): readonly RecoveryAttempt[] {
  return [...state.attempts.slice(0, -1), next];
}

function apply(state: RecoveryState, resolution: Resolution): { readonly state: RecoveryState; readonly events: readonly RecoveryEvent[] } {
  const step = state.step + 1;
  const attempt = successorOf(state).id;
  const events: RecoveryEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", attempt, detail: `${rejection.code}: ${rejection.detail}` }));
  let current = state;
  for (const intent of resolution.admitted) {
    const successor = successorOf(current);
    if (intent.effect === "work") {
      const unavailable = intent.evidenceRefs.find(ref => ref.startsWith("artifact-unavailable:"));
      if (unavailable !== undefined) events.push({ step, kind: "artifact-unavailable", attempt, detail: unavailable });
      const progress = successor.progress + 1;
      events.push({ step, kind: "worked", attempt, detail: `${attempt} at ${progress} of ${state.work}` });
      if (progress === state.work) {
        events.push({ step, kind: "completed", attempt, detail: `${attempt} completed in ${step} steps` });
        current = { ...current, completedAtStep: step, attempts: replaceSuccessor(current, { ...successor, progress, outcome: "completed" }) };
      } else {
        current = { ...current, attempts: replaceSuccessor(current, { ...successor, progress }) };
      }
    } else if (intent.effect === "consume-artifact") {
      const artifact = current.artifact;
      if (artifact === null) {
        events.push({ step, kind: "artifact-refused", attempt, detail: `no artifact to consume` });
      } else if (artifact.digest !== artifactProvenance(artifact)) {
        events.push({ step, kind: "artifact-refused", attempt, detail: `${artifact.id} refused: claimed digest ${artifact.digest} does not match its content` });
      } else {
        events.push({ step, kind: "artifact-consumed", attempt, detail: `${attempt} consumed ${artifact.id} (${artifact.digest}), skipping ${artifact.progress} units` });
        current = { ...current, attempts: replaceSuccessor(current, { ...successor, progress: artifact.progress, consumed: [...successor.consumed, { artifactId: artifact.id, digest: artifact.digest }] }) };
      }
    } else {
      events.push({ step, kind: "refused", attempt, detail: `effect ${intent.effect} is not an artifact-recovery effect` });
    }
  }
  return { state: { ...current, step, events: [...state.events, ...events] }, events };
}

/** `digest` of the whole state, events included: equal states have equal hashes whatever produced them. */
export function recoveryStateHash(state: RecoveryState): string {
  return digest(state);
}

/** Run one policy against the fixture for a fixed number of steps; every step records what was proposed, resolved and applied. */
export function runArtifactRecovery(run: RecoveryRun): RecoveryEpisode {
  checkRun(run);
  checkInherited(run.inheritedArtifact);
  let state = initialState(run);
  const initialHash = recoveryStateHash(state);
  let memory = 0;
  const steps: RecoveryStep[] = [];
  for (let index = 0; index < run.steps; index += 1) {
    const observation = observe(state);
    const observationDigest = digest(observation);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:artifact-recovery:${run.seed}`, actorId: run.policy.id, observationDigest, budget: budgetFor(),
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget: budgetFor(), protectedScopes: [], proposals: [proposal] });
    const applied = apply(state, resolution);
    state = applied.state;
    steps.push({ step: state.step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events: applied.events, stateHash: recoveryStateHash(state) });
  }
  return {
    schema: "mw.artifact-recovery.fixture.v1", mode: "fixture", seed: run.seed, intervention: state.intervention,
    ...(state.inheritedFrom !== undefined ? { inheritedFrom: state.inheritedFrom } : {}),
    policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: recoveryStateHash(state),
  };
}

/**
 * The independent oracle: plain arithmetic over the same seed and draw sequence, no policy, resolver or event
 * record, answering the crash step, the arm and the steps the successor needs. A harness run that disagrees with
 * it is wrong somewhere.
 */
export function oracleRecovery(run: {
  readonly seed: number; readonly work: number; readonly policy: "restart-from-scratch" | "resume-from-snapshot";
  readonly arm?: RecoveryArm; readonly corruptArtifact?: boolean; readonly inheritedArtifact?: InheritedArtifact;
}): { readonly crashStep: number; readonly arm: RecoveryArm; readonly steps: number } {
  checkRun({ seed: run.seed, work: run.work, steps: 0 });
  checkInherited(run.inheritedArtifact);
  const decided = seededDecisions(run.seed, run.work);
  const arm = run.arm ?? decided.arm;
  const usable = arm === "treatment" && (run.inheritedArtifact !== undefined || run.corruptArtifact !== true);
  const skipped = run.inheritedArtifact !== undefined ? run.inheritedArtifact.progress : decided.crashStep - 1;
  const steps = run.policy === "resume-from-snapshot" && usable ? 1 + (run.work - skipped) : run.work;
  return { crashStep: decided.crashStep, arm, steps };
}

/** A fixture episode stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelRecoveryEpisode(episode: RecoveryEpisode, mode: string): RecoveryEpisode {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture episode cannot be labelled ${mode}`);
  return episode;
}
