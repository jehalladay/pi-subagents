/**
 * The native multi-attempt inheritance journey (collective-adaptation 08 T4, CA-R13, MechanicalWorkflows-s14.15).
 *
 * In an isolated scratch Git repository a producer attempt does part of a task and crashes, leaving a durable artifact:
 * a ref whose tip carries its own provenance note (the fixture law's `artifactProvenance` digest). A successor in the
 * treatment arm re-derives that digest from the content before consuming the artifact; a successor in the control arm
 * is denied it and does the whole task. Both arms are validated by the EXISTING Forge gate seam, and an arm is labelled
 * live only when the gate answer retained native ids. The treatment-minus-control step difference is a derived number,
 * never a live observation. Nothing here touches any repository but the one it is given.
 */
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { artifactProvenance, digest } from "@mechanical/workflows-coordination";
import { makeObservation, liveFlowUnknownRecord, type Observation, type ReceiptInit, type LiveFlowUnknownRecord } from "./live-observation.js";

const exec = promisify(execFile);
async function git(root: string, ...args: string[]): Promise<string> {
  const out = await exec("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
  return out.stdout.trim();
}

export interface InheritanceGateAnswer {
  readonly kind: "passed" | "failed" | "indeterminate";
  readonly operationId: string;
  readonly commandId: string;
  readonly receipt: ReceiptInit;
}
export type InheritanceGateRunner = (worktree: string, commit: string) => Promise<InheritanceGateAnswer>;

export interface NativeInheritanceInput {
  readonly root: string;
  /** Work units the task needs (one `unit<i>.ts` file each); at least 2. */
  readonly work: number;
  /** Units the producer completes before it crashes; between 1 and work-1. */
  readonly crashAfter: number;
  readonly gate: InheritanceGateRunner;
  /** Failure injection: the stored provenance note no longer matches the artifact's content. */
  readonly corruptArtifact?: boolean;
}

export interface NativeArtifact { readonly id: string; readonly producer: string; readonly progress: number; readonly digest: string; readonly commit: string }
export interface NativeProducer { readonly attempt: string; readonly outcome: "crashed"; readonly progress: number; readonly commit: string }
export type ArmOutcome = "completed" | "gate-failed" | "refused";
export interface NativeArm {
  readonly attempt: string;
  readonly arm: "treatment" | "control";
  readonly outcome: ArmOutcome;
  readonly detail?: string;
  readonly startCommit: string;
  readonly finalCommit: string;
  readonly steps: number;
  readonly consumed: readonly { readonly artifactId: string; readonly digest: string }[];
  readonly gate: { readonly kind: InheritanceGateAnswer["kind"]; readonly ids: Readonly<Record<string, string>> };
  readonly observation: Observation<{ readonly attempt: string; readonly commit: string }>;
}
export interface NativeInheritanceReport {
  readonly schema: "mw.native-inheritance-journey.v1";
  readonly mode: "live" | "replay";
  readonly work: number;
  readonly crashAfter: number;
  readonly artifact: NativeArtifact;
  readonly producer: NativeProducer;
  readonly arms: { readonly treatment: NativeArm; readonly control: NativeArm };
  /** Treatment steps minus control steps: a computation over two live receipts, labelled derived; null unless both arms completed. */
  readonly delta: { readonly mode: "derived"; readonly steps: number } | null;
  readonly sourceDigest?: string;
  readonly reportDigest: string;
}

const ARTIFACT_ID = "artifact-a1";
const PRODUCER = "a1";
const ARTIFACT_REF = "refs/artifacts/a1";

function withDigest(report: Omit<NativeInheritanceReport, "reportDigest">): NativeInheritanceReport {
  return { ...report, reportDigest: digest(report) };
}

/** Relabel a report: live may become replay (naming its source digest); replay never becomes live; a native journey is never a fixture. */
export function labelInheritanceReport(report: NativeInheritanceReport, mode: string): NativeInheritanceReport {
  if (mode === "replay" && report.mode === "live") {
    const { reportDigest: source, ...rest } = report;
    return withDigest({ ...rest, mode: "replay", sourceDigest: source });
  }
  if (mode === report.mode) return report;
  if (mode === "live") throw new Error("EPISODE_MODE_UPGRADE_FORBIDDEN: a replay-labelled inheritance report cannot be labelled live");
  throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a native inheritance report is never labelled ${mode}`);
}

/** The opt-in gate for the live test: an explicit flag and a present forge; otherwise an UNKNOWN record, never a pass. */
export function inheritancePreconditions(env: Readonly<Record<string, string | undefined>>, forgeFound: boolean):
  { readonly run: true } | { readonly run: false; readonly record: LiveFlowUnknownRecord } {
  if (env["MW_LIVE_INHERITANCE_JOURNEY"] !== "1") return { run: false, record: liveFlowUnknownRecord("INHERITANCE_JOURNEY_NOT_ENABLED") };
  if (!forgeFound) return { run: false, record: liveFlowUnknownRecord("LIVE_FLOW_FORGE_ABSENT") };
  return { run: true };
}

async function writeUnits(worktree: string, from: number, to: number): Promise<void> {
  for (let index = from; index <= to; index += 1) {
    await writeFile(join(worktree, `unit${index}.ts`), `export const index = ${index};\n`);
    await git(worktree, "add", "-A");
    await git(worktree, "-c", "user.name=mw-journey", "-c", "user.email=journey@mechanical.local", "commit", "-q", "-m", `unit ${index}`);
  }
}
async function unitCount(worktree: string): Promise<number> {
  return (await readdir(worktree)).filter(name => /^unit\d+\.ts$/.test(name)).length;
}
async function withWorktree<T>(root: string, branch: string, start: string, body: (worktree: string) => Promise<T>): Promise<T> {
  const worktree = await mkdtemp(join(tmpdir(), "mw-inheritance-"));
  try {
    await git(root, "worktree", "add", "-q", "-b", branch, worktree, start);
    return await body(worktree);
  } finally {
    await git(root, "worktree", "remove", "--force", worktree).catch(() => undefined);
    await rm(worktree, { recursive: true, force: true });
  }
}

const unknownObservation = (reason: string): NativeArm["observation"] => makeObservation({ mode: "unknown", system: "forge", outcome: "unknown", reason, receipt: null });

async function gateArm(input: NativeInheritanceInput, worktree: string, base: Omit<NativeArm, "outcome" | "gate" | "observation" | "finalCommit" | "detail">): Promise<NativeArm> {
  const finalCommit = await git(worktree, "rev-parse", "HEAD");
  const answer = await input.gate(worktree, finalCommit);
  const operationId = answer.operationId.trim();
  const commandId = answer.commandId.trim();
  const ids = Object.fromEntries(Object.entries({ ...answer.receipt.ids, operationId, commandId }).filter(([, value]) => typeof value === "string" && value.length > 0)) as Record<string, string>;
  if (operationId === "" || commandId === "") {
    return { ...base, finalCommit, outcome: "refused", detail: "INHERITANCE_WITHOUT_NATIVE_ID_REFUSED: the gate answer retained no native operation and command id", consumed: base.consumed, gate: { kind: answer.kind, ids }, observation: unknownObservation("INHERITANCE_WITHOUT_NATIVE_ID_REFUSED") };
  }
  const observation = makeObservation({ mode: "live", system: "forge", outcome: "observed", value: { attempt: base.attempt, commit: finalCommit }, receipt: { system: "forge", ids, raw: answer.receipt.raw } });
  if (answer.kind === "passed") return { ...base, finalCommit, outcome: "completed", gate: { kind: "passed", ids }, observation };
  return { ...base, finalCommit, outcome: "gate-failed", detail: `the gate answered ${answer.kind} at ${finalCommit.slice(0, 12)}`, gate: { kind: answer.kind, ids }, observation };
}

/**
 * Run the journey: the producer attempt commits `crashAfter` units on its own branch and crashes, leaving `refs/artifacts/a1`
 * whose tip carries a provenance note; the treatment successor starts from that tip after re-deriving the note's digest from
 * the content it finds, the control successor starts from main with the artifact withheld; both finish the task and are gated.
 */
export async function runNativeInheritanceJourney(input: NativeInheritanceInput): Promise<NativeInheritanceReport> {
  if (!Number.isInteger(input.work) || input.work < 2) throw new RangeError("INHERITANCE_JOURNEY_INVALID: work must be an integer of at least 2");
  if (!Number.isInteger(input.crashAfter) || input.crashAfter < 1 || input.crashAfter >= input.work) throw new RangeError("INHERITANCE_JOURNEY_INVALID: crashAfter must lie between 1 and work-1");
  const main = await git(input.root, "rev-parse", "main");
  // Producer: partial work, then the crash. The artifact is the branch tip, made durable as a ref with its provenance as a note.
  const producerTip = await withWorktree(input.root, `attempt/${PRODUCER}`, "main", async worktree => {
    await writeUnits(worktree, 1, input.crashAfter);
    return git(worktree, "rev-parse", "HEAD");
  });
  const content = { id: ARTIFACT_ID, producer: PRODUCER, progress: input.crashAfter };
  const claimed = input.corruptArtifact === true ? artifactProvenance({ ...content, progress: input.crashAfter + 1 }) : artifactProvenance(content);
  await git(input.root, "update-ref", ARTIFACT_REF, producerTip);
  await git(input.root, "-c", "user.name=mw-journey", "-c", "user.email=journey@mechanical.local", "notes", "add", "-f", "-m", JSON.stringify({ ...content, digest: claimed }), producerTip);
  const artifact: NativeArtifact = { ...content, digest: claimed, commit: producerTip };
  const producer: NativeProducer = { attempt: PRODUCER, outcome: "crashed", progress: input.crashAfter, commit: producerTip };

  // Treatment: the successor reads the note the artifact carries and re-derives its digest from the content before consuming it.
  const treatment = await withWorktree(input.root, "attempt/a2", ARTIFACT_REF, async worktree => {
    const note = JSON.parse(await git(input.root, "notes", "show", producerTip)) as { id: string; producer: string; progress: number; digest: string };
    const found = await unitCount(worktree);
    const expected = artifactProvenance({ id: note.id, producer: note.producer, progress: found });
    const base = { attempt: "a2", arm: "treatment" as const, startCommit: producerTip, steps: input.work - found, consumed: [] as { artifactId: string; digest: string }[] };
    if (note.digest !== expected || note.progress !== found) {
      return { ...base, finalCommit: producerTip, outcome: "refused" as const, detail: `ARTIFACT_INHERITED_DIGEST_MISMATCH: ${note.id} claims ${note.digest}, content gives ${expected}`, gate: { kind: "indeterminate" as const, ids: {} }, observation: unknownObservation("ARTIFACT_INHERITED_DIGEST_MISMATCH") };
    }
    await writeUnits(worktree, found + 1, input.work);
    return gateArm(input, worktree, { ...base, consumed: [{ artifactId: note.id, digest: note.digest }] });
  });
  // Control: the artifact is withheld; the successor starts from main and does the whole task.
  const control = await withWorktree(input.root, "attempt/a3", "main", async worktree => {
    await writeUnits(worktree, 1, input.work);
    return gateArm(input, worktree, { attempt: "a3", arm: "control", startCommit: main, steps: input.work, consumed: [] });
  });
  const delta = treatment.outcome === "completed" && control.outcome === "completed" ? { mode: "derived" as const, steps: treatment.steps - control.steps } : null;
  return withDigest({ schema: "mw.native-inheritance-journey.v1", mode: "live", work: input.work, crashAfter: input.crashAfter, artifact, producer, arms: { treatment, control }, delta });
}
