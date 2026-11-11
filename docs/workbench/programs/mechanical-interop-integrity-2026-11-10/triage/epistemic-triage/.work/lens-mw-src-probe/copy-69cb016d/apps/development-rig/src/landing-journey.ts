/**
 * The native landing-queue journey (collective-adaptation 08 T3, CA-R12, MechanicalWorkflows-s14.14).
 *
 * The EXISTING landing-queue policy proposes over LIVE observations of a real, isolated scratch Git repository:
 * candidates are branches, a restack is a real rebase in a bounded worktree, and a landing is a real fast-forward
 * of the scratch main — admitted first through `reconcile`, then gated through an injected Forge gate seam whose
 * answer must retain native command and operation ids. Nothing here touches any repository but the one it is given,
 * and nothing is labelled live without a native receipt: a gate answer with no id is refused, never landed.
 */
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { digest, reconcile, restackFirst } from "@mechanical/workflows-coordination";
import type { Basis, Budget, Intent, LandingObservation, LandingCandidate, Policy, Resolution } from "@mechanical/workflows-coordination";
import { makeObservation, liveFlowUnknownRecord, type Observation, type ReceiptInit, type LiveFlowUnknownRecord } from "./live-observation.js";

const exec = promisify(execFile);
async function git(root: string, ...args: string[]): Promise<string> {
  const out = await exec("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
  return out.stdout.trim();
}

/** What the injected gate seam answers for one candidate commit in one worktree: a verdict plus the native ids it retained. */
export interface LandingGateAnswer {
  readonly kind: "passed" | "failed" | "indeterminate";
  readonly operationId: string;
  readonly commandId: string;
  readonly receipt: ReceiptInit;
}
export type LandingGateRunner = (worktree: string, commit: string) => Promise<LandingGateAnswer>;

export interface NativeLandingJourneyInput {
  readonly root: string;
  /** Candidate branch names in arrival order; each must exist in the scratch repository. */
  readonly branches: readonly string[];
  readonly lanes: number;
  readonly stepsCap: number;
  readonly policy: Policy<LandingObservation, Intent, number>;
  readonly gate: LandingGateRunner;
}

export interface NativeLandingEvent { readonly step: number; readonly kind: "landed" | "gate-failed" | "restacked" | "refused"; readonly candidate: string | null; readonly detail: string }
export interface NativeLandingStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly events: readonly NativeLandingEvent[];
  readonly head: string;
}
export interface NativeLanding {
  readonly candidate: string;
  readonly commit: string;
  readonly receipt: { readonly system: "forge"; readonly ids: Readonly<Record<string, string>> };
  readonly observation: Observation<{ readonly candidate: string; readonly commit: string }>;
}
export interface NativeLandingReport {
  readonly schema: "mw.native-landing-journey.v1";
  readonly mode: "live" | "replay";
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly NativeLandingStep[];
  readonly landed: readonly NativeLanding[];
  /** `remaining`: candidates still waiting when the journey stopped; `refused`: candidates dropped because they could not be restacked onto main. */
  readonly final: { readonly head: string; readonly remaining: readonly string[]; readonly refused: readonly string[] };
  /** For a replay-labelled copy: the digest of the live report it was taken from. */
  readonly sourceDigest?: string;
  /** `digest` of every other field: equal reports hash equal whatever produced them. */
  readonly reportDigest: string;
}

function withDigest(report: Omit<NativeLandingReport, "reportDigest">): NativeLandingReport {
  return { ...report, reportDigest: digest(report) };
}

/**
 * Relabel a report. A live report may be kept as a replay-labelled copy (naming its source digest); a replay can never
 * become live again, and a native journey is never a fixture. The closed vocabulary refuses anything else.
 */
export function labelJourneyReport(report: NativeLandingReport, mode: string): NativeLandingReport {
  if (mode === "replay" && report.mode === "live") {
    const { reportDigest: source, ...rest } = report;
    return withDigest({ ...rest, mode: "replay", sourceDigest: source });
  }
  if (mode === report.mode) return report;
  if (mode === "live") throw new Error("EPISODE_MODE_UPGRADE_FORBIDDEN: a replay-labelled journey report cannot be labelled live");
  throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a native journey report is never labelled ${mode}`);
}

/** The opt-in gate for the journey: an explicit flag and a present forge; otherwise an UNKNOWN record, never a pass. */
export function journeyPreconditions(env: Readonly<Record<string, string | undefined>>, forgeFound: boolean):
  { readonly run: true } | { readonly run: false; readonly record: LiveFlowUnknownRecord } {
  if (env["MW_LIVE_LANDING_JOURNEY"] !== "1") return { run: false, record: liveFlowUnknownRecord("LANDING_JOURNEY_NOT_ENABLED") };
  if (!forgeFound) return { run: false, record: liveFlowUnknownRecord("LIVE_FLOW_FORGE_ABSENT") };
  return { run: true };
}

/** A LIVE observation of the scratch queue: the real main head, each waiting branch's tip and merge base, the lane bound. */
export async function observeScratchQueue(root: string, branches: readonly string[], lanes: number): Promise<LandingObservation> {
  const head = await git(root, "rev-parse", "main");
  const ready: LandingCandidate[] = [];
  for (const [index, branch] of branches.entries()) {
    const base = await git(root, "merge-base", "main", branch);
    ready.push({ id: branch, base, arrival: index });
  }
  const basis: Basis = { workspaceId: `scratch:${root}`, revision: head };
  return { basis, head, lanes, ready };
}

function budgetFor(lanes: number, candidates: number): Budget {
  return { compute: lanes, workers: lanes, queue: Math.max(candidates, 1), latencyMs: 60_000 };
}
function candidateOf(intent: Intent): string | null {
  return intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:") ? intent.target.uri.slice("cand:".length) : null;
}

/**
 * Run the journey: observe, propose (existing policy), reconcile, then perform each admitted intent natively —
 * a restack rebases the branch onto main in a bounded temporary worktree; a landing gates the branch tip in its
 * own worktree and, only on a passed gate WITH native ids, fast-forwards the scratch main to it.
 */
export async function runNativeLandingJourney(input: NativeLandingJourneyInput): Promise<NativeLandingReport> {
  if (!Number.isInteger(input.lanes) || input.lanes < 1) throw new RangeError("LANDING_JOURNEY_INVALID: lanes must be a positive integer");
  if (!Number.isInteger(input.stepsCap) || input.stepsCap < 1) throw new RangeError("LANDING_JOURNEY_INVALID: stepsCap must be a positive integer");
  const remaining = new Set(input.branches);
  const refused: string[] = [];
  const steps: NativeLandingStep[] = [];
  const landed: NativeLanding[] = [];
  let memory = 0;
  for (let index = 0; index < input.stepsCap && remaining.size > 0; index += 1) {
    const observation = await observeScratchQueue(input.root, [...remaining], input.lanes);
    const observationDigest = digest(observation);
    const proposal = input.policy.propose(observation, memory, {
      episodeId: `native:landing-journey:${observation.head}`, actorId: input.policy.id, observationDigest,
      budget: budgetFor(input.lanes, remaining.size), authority: "propose-only", policyRevision: input.policy.revision, seed: 0,
    });
    memory = proposal.memory;
    const resolution: Resolution = reconcile({ basis: observation.basis, budget: budgetFor(input.lanes, remaining.size), protectedScopes: [], proposals: [proposal] });
    const step = index + 1;
    const events: NativeLandingEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", candidate: candidateOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` }));
    for (const intent of resolution.admitted) {
      const branch = candidateOf(intent);
      if (branch === null || !remaining.has(branch)) { events.push({ step, kind: "refused", candidate: branch, detail: "LANDING_JOURNEY_UNKNOWN_CANDIDATE" }); continue; }
      if (intent.effect === "restack") {
        const worktree = await mkdtemp(join(tmpdir(), "mw-journey-restack-"));
        try {
          await git(input.root, "worktree", "add", "-q", worktree, branch);
          try {
            await git(worktree, "rebase", "-q", "main");
            events.push({ step, kind: "restacked", candidate: branch, detail: `${branch} rebased onto ${observation.head}` });
          } catch {
            // A conflicting restack is a native outcome, not a crash: abort the rebase so the branch keeps its tip,
            // drop the candidate from the queue and say so in the record.
            await git(worktree, "rebase", "--abort").catch(() => undefined);
            remaining.delete(branch);
            refused.push(branch);
            events.push({ step, kind: "refused", candidate: branch, detail: `RESTACK_CONFLICT: ${branch} does not rebase cleanly onto ${observation.head}` });
          }
        } finally {
          await git(input.root, "worktree", "remove", "--force", worktree).catch(() => undefined);
          await rm(worktree, { recursive: true, force: true });
        }
      } else if (intent.effect === "land") {
        const worktree = await mkdtemp(join(tmpdir(), "mw-journey-land-"));
        try {
          await git(input.root, "worktree", "add", "-q", worktree, branch);
          const commit = await git(worktree, "rev-parse", "HEAD");
          const answer = await input.gate(worktree, commit);
          const operationId = answer.operationId.trim();
          const commandId = answer.commandId.trim();
          if (answer.kind === "passed" && (operationId === "" || commandId === "")) {
            events.push({ step, kind: "refused", candidate: branch, detail: "LANDING_WITHOUT_NATIVE_ID_REFUSED: a passed gate answer retained no native id" });
          } else if (answer.kind === "passed") {
            await git(input.root, "merge-base", "--is-ancestor", observation.head, commit);
            await git(input.root, "update-ref", "refs/heads/main", commit, observation.head);
            const observationRecord = makeObservation({
              mode: "live", system: "forge", outcome: "observed", value: { candidate: branch, commit },
              receipt: { system: "forge", ids: { ...answer.receipt.ids, operationId, commandId }, raw: answer.receipt.raw },
            });
            landed.push({ candidate: branch, commit, receipt: { system: "forge", ids: observationRecord.receipt!.ids }, observation: observationRecord });
            remaining.delete(branch);
            events.push({ step, kind: "landed", candidate: branch, detail: `${branch} landed at ${commit.slice(0, 12)}; main fast-forwarded` });
          } else {
            events.push({ step, kind: "gate-failed", candidate: branch, detail: `${branch} gate ${answer.kind} at ${commit.slice(0, 12)}` });
          }
        } finally {
          await git(input.root, "worktree", "remove", "--force", worktree).catch(() => undefined);
          await rm(worktree, { recursive: true, force: true });
        }
      } else {
        events.push({ step, kind: "refused", candidate: branch, detail: `LANDING_JOURNEY_EFFECT_UNSUPPORTED: ${intent.effect}` });
      }
    }
    const head = await git(input.root, "rev-parse", "main");
    steps.push({ step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), events, head });
    if (proposal.intents.length === 0 && resolution.admitted.length === 0) break;
  }
  const head = await git(input.root, "rev-parse", "main");
  return withDigest({
    schema: "mw.native-landing-journey.v1", mode: "live",
    policy: { id: input.policy.id, revision: input.policy.revision },
    steps, landed, final: { head, remaining: [...remaining], refused },
  });
}

export { restackFirst };
