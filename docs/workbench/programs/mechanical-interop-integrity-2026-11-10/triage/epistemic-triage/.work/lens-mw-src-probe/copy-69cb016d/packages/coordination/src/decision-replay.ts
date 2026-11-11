import type { Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import type { JsonValue } from "./canonical.js";
import { toEpisode } from "./episode.js";
import type { Episode } from "./episode.js";
import { runLandingQueue } from "./landing-queue.js";
import type { LandingObservation, LandingQueueRun } from "./landing-queue.js";
import { runCompactionInheritance } from "./compaction-inheritance.js";
import type { CompactionInheritanceRun, CompactionObservation } from "./compaction-inheritance.js";
import { runColonyResilience } from "./colony-resilience.js";
import type { ColonyObservation, ColonyRun } from "./colony-resilience.js";
import { runArtifactRecovery } from "./artifact-recovery.js";
import type { RecoveryObservation, RecoveryRun } from "./artifact-recovery.js";
import { runQuorumEvidence } from "./quorum-evidence.js";
import type { QuorumEvidenceRun, QuorumObservation } from "./quorum-evidence.js";

/**
 * Decision-tape replay (collective-adaptation 05 Replay row, MWCOL-004). A decision tape records, for one fixture
 * environment run, the intent sequence the policy proposed together with what the run observed and decided at each
 * step. `replayDecisions` re-executes the environment from that sequence alone, with a policy that has no logic
 * and only returns the recorded intents, and compares the step number, the observation digest, the admitted intent ids and the
 * state hash step by step. The first disagreement is reported as `REPLAY_DECISION_DIVERGED` naming its step.
 * The result is labelled mode `replay`; the label cannot be upgraded. This is not the receipt replay of
 * `replayTape`: that path projects captured native receipts, this one re-runs a seeded fixture.
 */

export type DecisionEnvironment = "landing-queue" | "compaction-inheritance" | "colony-resilience" | "artifact-recovery" | "quorum-evidence";

export interface DecisionStep {
  readonly step: number;
  readonly observationDigest: string;
  /** The intents the policy proposed at this step, verbatim. */
  readonly intents: readonly Intent[];
  /** The intent ids the resolver admitted. */
  readonly admitted: readonly string[];
  /** The environment state hash after the step. */
  readonly stateHash: string;
}

export interface DecisionTape {
  readonly schema: "mw.decision-tape.v1";
  readonly environment: DecisionEnvironment;
  /** The run parameters except the policy. */
  readonly run: { readonly [key: string]: JsonValue };
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly DecisionStep[];
}

type Without<T> = Omit<T, "policy">;

/** What to record: an environment, its run parameters and the policy whose proposals are to be taped. */
export type DecisionRecording =
  | { readonly environment: "landing-queue"; readonly run: Without<LandingQueueRun>; readonly policy: Policy<LandingObservation, Intent, number> }
  | { readonly environment: "compaction-inheritance"; readonly run: Without<CompactionInheritanceRun>; readonly policy: Policy<CompactionObservation, Intent, number> }
  | { readonly environment: "colony-resilience"; readonly run: Without<ColonyRun>; readonly policy: Policy<ColonyObservation, Intent, number> }
  | { readonly environment: "artifact-recovery"; readonly run: Without<RecoveryRun>; readonly policy: Policy<RecoveryObservation, Intent, number> }
  | { readonly environment: "quorum-evidence"; readonly run: Without<QuorumEvidenceRun>; readonly policy: Policy<QuorumObservation, Intent, number> };

export type DecisionDivergenceField = "step" | "observation" | "intents" | "admitted" | "checkpoint" | "length";

export interface DecisionDivergence {
  readonly code: "REPLAY_DECISION_DIVERGED";
  /** The first step at which the re-execution and the tape disagree. */
  readonly step: number;
  readonly field: DecisionDivergenceField;
  readonly detail: string;
}

export interface DecisionReplayResult {
  readonly mode: "replay";
  readonly tapeDigest: string;
  readonly divergence: DecisionDivergence | null;
  /** The re-executed run as a shared episode, labelled replay; the verdict is `diverged@<step>` when the tape disagreed. */
  readonly episode: Episode;
}

const ENVIRONMENTS: readonly DecisionEnvironment[] = ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"];

type FieldKind = "int" | "arm" | "gate" | "bool";
const FIELDS: Readonly<Record<DecisionEnvironment, { readonly required: Readonly<Record<string, FieldKind>>; readonly optional: Readonly<Record<string, FieldKind>> }>> = {
  "landing-queue": { required: { seed: "int", candidates: "int", lanes: "int", steps: "int" }, optional: {} },
  "compaction-inheritance": { required: { seed: "int", tasks: "int" }, optional: {} },
  "colony-resilience": { required: { seed: "int", workers: "int", compute: "int", steps: "int" }, optional: {} },
  "artifact-recovery": { required: { seed: "int", work: "int", steps: "int" }, optional: { arm: "arm", corruptArtifact: "bool" } },
  "quorum-evidence": { required: { seed: "int", candidates: "int", reviewers: "int", steps: "int", budget: "int", gate: "gate" }, optional: {} },
};

function unsupported(detail: string): Error {
  return new Error(`REPLAY_DECISION_TAPE_UNSUPPORTED: ${detail}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fits(kind: FieldKind, value: unknown): boolean {
  switch (kind) {
    case "int": return typeof value === "number" && Number.isInteger(value);
    case "arm": return value === "treatment" || value === "control";
    case "gate": return value === "authoritative" || value === "ablated";
    case "bool": return typeof value === "boolean";
  }
}

function checkShape(environment: string, tape: unknown): asserts tape is DecisionTape {
  if (!ENVIRONMENTS.includes(environment as DecisionEnvironment)) throw unsupported(`environment ${environment} has no decision replay`);
  if (!isRecord(tape) || tape.schema !== "mw.decision-tape.v1") throw unsupported("tape schema is not mw.decision-tape.v1");
  if (tape.environment !== environment) throw unsupported(`tape is for ${String(tape.environment)}, not ${environment}`);
  const policy = tape.policy;
  if (!isRecord(policy) || typeof policy.id !== "string" || typeof policy.revision !== "string") throw unsupported("tape lacks a policy id and revision");
  const fields = FIELDS[environment as DecisionEnvironment];
  if (!isRecord(tape.run)) throw unsupported("tape lacks run parameters");
  for (const [key, kind] of Object.entries(fields.required)) if (!fits(kind, tape.run[key])) throw unsupported(`run parameter ${key} is missing or not a ${kind}`);
  for (const [key, value] of Object.entries(tape.run)) {
    const kind = fields.required[key] ?? fields.optional[key];
    if (kind === undefined) throw unsupported(`run parameter ${key} is not recognised for ${environment}`);
    if (!fits(kind, value)) throw unsupported(`run parameter ${key} is not a ${kind}`);
  }
  if (!Array.isArray(tape.steps)) throw unsupported("tape steps are not an array");
  for (const step of tape.steps as readonly unknown[]) {
    if (!isRecord(step) || !Number.isInteger(step.step) || typeof step.observationDigest !== "string" || typeof step.stateHash !== "string" || !Array.isArray(step.intents) || !Array.isArray(step.admitted)) throw unsupported("tape step lacks step, observationDigest, intents, admitted or stateHash");
  }
}

/** A policy with no logic: step n returns the n-th recorded intent list. Its memory is the step count, the same number type every fixture policy uses. */
function recorded(tape: DecisionTape): Policy<never, Intent, number> {
  return {
    id: tape.policy.id, revision: tape.policy.revision,
    propose: (_observation, memory) => ({
      intents: tape.steps[memory]?.intents ?? [], memory: memory + 1,
      trace: [{ kind: "replayed", policyId: tape.policy.id, detail: `recorded step ${memory + 1}` }],
    }),
  };
}

/** What the environment run exposes of each step, whichever environment produced it. */
interface RunStep { readonly step: number; readonly observationDigest: string; readonly proposed: readonly string[]; readonly resolution: { readonly admitted: readonly Intent[] }; readonly stateHash: string }
interface Executed { readonly steps: readonly RunStep[]; readonly episode: Episode }

function execute(environment: DecisionEnvironment, run: DecisionTape["run"], policy: Policy<never, Intent, number>): Executed {
  const finish = <E extends { readonly steps: readonly RunStep[] }>(source: E & Parameters<typeof toEpisode>[0]): Executed => ({ steps: source.steps, episode: toEpisode(source) });
  switch (environment) {
    case "landing-queue": return finish(runLandingQueue({ ...(run as unknown as Without<LandingQueueRun>), policy }));
    case "compaction-inheritance": return finish(runCompactionInheritance({ ...(run as unknown as Without<CompactionInheritanceRun>), policy }));
    case "colony-resilience": return finish(runColonyResilience({ ...(run as unknown as Without<ColonyRun>), policy }));
    case "artifact-recovery": return finish(runArtifactRecovery({ ...(run as unknown as Without<RecoveryRun>), policy }));
    case "quorum-evidence": return finish(runQuorumEvidence({ ...(run as unknown as Without<QuorumEvidenceRun>), policy }));
  }
}

function toRecordedStep(step: RunStep, intents: readonly Intent[]): DecisionStep {
  return { step: step.step, observationDigest: step.observationDigest, intents, admitted: step.resolution.admitted.map(intent => intent.intentId), stateHash: step.stateHash };
}

/** Run the environment once with the given policy and tape what it proposed, resolved and reached at every step. */
export function recordDecisions(recording: DecisionRecording): DecisionTape {
  const captured: (readonly Intent[])[] = [];
  const policy = recording.policy as Policy<never, Intent, number>;
  const taping: Policy<never, Intent, number> = {
    id: policy.id, revision: policy.revision,
    propose(observation, memory, context) {
      const proposal = policy.propose(observation, memory, context);
      captured.push(proposal.intents);
      return proposal;
    },
  };
  const run: { [key: string]: JsonValue } = {};
  for (const [key, value] of Object.entries(recording.run as Record<string, JsonValue | undefined>)) if (value !== undefined) run[key] = value;
  const executed = execute(recording.environment, run, taping);
  return {
    schema: "mw.decision-tape.v1", environment: recording.environment, run, policy: { id: policy.id, revision: policy.revision },
    steps: executed.steps.map((step, index) => toRecordedStep(step, captured[index] ?? [])),
  };
}

function firstDivergence(tape: DecisionTape, executed: readonly RunStep[]): DecisionDivergence | null {
  const count = Math.max(tape.steps.length, executed.length);
  for (let index = 0; index < count; index += 1) {
    const want = tape.steps[index];
    const got = executed[index];
    if (want === undefined || got === undefined) {
      const step = (want ?? got)!.step;
      return { code: "REPLAY_DECISION_DIVERGED", step, field: "length", detail: `step ${step}: ${want === undefined ? "the re-execution ran past the end of the tape" : "the tape records a step the re-execution never reached"}` };
    }
    const step = want.step;
    const diverged = (field: DecisionDivergenceField, expected: string, actual: string): DecisionDivergence => ({ code: "REPLAY_DECISION_DIVERGED", step, field, detail: `step ${step}: ${field} recorded ${expected} but re-execution reached ${actual}` });
    if (want.step !== got.step) return diverged("step", String(want.step), String(got.step));
    if (want.observationDigest !== got.observationDigest) return diverged("observation", want.observationDigest, got.observationDigest);
    const proposed = got.proposed.join(",");
    const recordedIds = want.intents.map(intent => intent.intentId).join(",");
    if (recordedIds !== proposed) return diverged("intents", recordedIds, proposed);
    const admitted = got.resolution.admitted.map(intent => intent.intentId).join(",");
    if (want.admitted.join(",") !== admitted) return diverged("admitted", want.admitted.join(","), admitted);
    if (want.stateHash !== got.stateHash) return diverged("checkpoint", want.stateHash, got.stateHash);
  }
  return null;
}

/**
 * Re-execute `environment` from the intent sequence on `tape` and compare it step by step. Every committed seed
 * fixture replays to identical checkpoints. A tape the module does not understand throws
 * `REPLAY_DECISION_TAPE_UNSUPPORTED`; a tape that disagrees with the re-execution returns a divergence naming the
 * first step. The input tape is read, never altered, and the episode is labelled `replay`.
 */
export function replayDecisions(environment: DecisionEnvironment, tape: DecisionTape): DecisionReplayResult {
  checkShape(environment, tape);
  const executed = execute(environment, tape.run, recorded(tape));
  const divergence = firstDivergence(tape, executed.steps);
  const tapeDigest = digest(tape);
  const base = executed.episode;
  const episode: Episode = {
    ...base, mode: "replay", episodeId: base.episodeId.replace(/^fixture:/, "replay:"),
    verifier: { label: "replay", receiptDigest: tapeDigest, verdict: divergence === null ? `replayed=${executed.steps.length},diverged=none` : `diverged@${divergence.step}` },
  };
  return { mode: "replay", tapeDigest, divergence, episode };
}
