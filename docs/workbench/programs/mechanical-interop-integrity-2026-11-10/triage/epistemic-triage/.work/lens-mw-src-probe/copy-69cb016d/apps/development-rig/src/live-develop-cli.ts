import { developLive } from "./live-development.js";
import { readBeadsRequest } from "./beads-host.js";
import { claimBeadsWork } from "./beads-claim.js";
import { runClaudeReview } from "./claude-review.js";
import { cleanGitBasis, packageRoot } from "./live-gate.js";

/** Native Beads read and claim by default; a test may inject either seam, never a substitute Beads. */
export interface BeadsSeams { readonly read?: typeof readBeadsRequest; readonly claim?: typeof claimBeadsWork }
export async function developCli(
  args: readonly string[],
  develop: typeof developLive = developLive,
  beads: BeadsSeams = {},
): Promise<number> {
  let root: string | undefined;
  let task: string | undefined;
  let beadId: string | undefined;
  let beadsDirectory: string | undefined;
  let model: string | undefined;
  let contextMode: "plain" | "rf" = "plain";
  let rfActor: string | undefined;
  let rfSessionId: string | undefined;
  let rfHistoryLimit: number | undefined;
  let renderIdempotencyKey: string | undefined;
  let forgeExecutable = "forge";
  let allowWrites = false;
  let claimBead = false;
  let review = false;
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key === "--allow-writes") { allowWrites = true; continue; }
    if (key === "--claim-bead") { claimBead = true; continue; }
    if (key === "--review") { review = true; continue; }
    if (!["--workspace", "--task", "--bead", "--beads-directory", "--model", "--context-mode", "--forge-bin", "--rf-actor", "--rf-session", "--rf-history-limit", "--render-idempotency-key"].includes(key ?? "")) {
      throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    }
    const val = args[++i];
    if (!val || val.startsWith("--")) throw new Error("INVALID_ARGUMENT: " + key + " requires a value");
    if (key === "--workspace") root = val;
    else if (key === "--task") task = val;
    else if (key === "--bead") beadId = val;
    else if (key === "--beads-directory") beadsDirectory = val;
    else if (key === "--model") model = val;
    else if (key === "--context-mode") {
      if (val !== "plain" && val !== "rf") throw new Error("INVALID_CONTEXT_MODE: expected plain or rf");
      contextMode = val;
    } else if (key === "--rf-actor") rfActor = val;
    else if (key === "--rf-session") rfSessionId = val;
    else if (key === "--rf-history-limit") {
      // The documented rf context history range: a canonical decimal integer in 1..500.
      if (!/^[1-9][0-9]{0,2}$/.test(val) || Number(val) > 500) throw new Error("INVALID_RF_HISTORY_LIMIT: --rf-history-limit expects a decimal integer from 1 to 500");
      rfHistoryLimit = Number(val);
    } else if (key === "--render-idempotency-key") renderIdempotencyKey = val;
    else forgeExecutable = val;
  }
  // Only rf forwards rf: an RF knob under plain context is refused before Beads, Git or the agent is touched.
  if (contextMode !== "rf" && (rfActor !== undefined || rfSessionId !== undefined || rfHistoryLimit !== undefined || renderIdempotencyKey !== undefined)) {
    throw new Error("RF_OPTION_REQUIRES_RF_MODE: --rf-actor, --rf-session, --rf-history-limit and --render-idempotency-key require --context-mode rf");
  }
  if (!root || (!task && !beadId)) throw new Error("MISSING_ARGUMENT: --workspace and exactly one of --task/--bead are required");
  if (task && beadId) throw new Error("MUTUALLY_EXCLUSIVE_TASK: --task and --bead cannot be combined");
  if (beadsDirectory && !beadId) throw new Error("BEADS_DIRECTORY_REQUIRES_ISSUE: --beads-directory requires --bead");
  if (claimBead && !beadId) throw new Error("CLAIM_BEAD_REQUIRES_ISSUE: --claim-bead requires --bead");
  if (!allowWrites) throw new Error("WRITE_OPT_IN_REQUIRED: --allow-writes is required for live agent source changes");
  if (contextMode === "rf" && !model) throw new Error("RF_MODEL_REQUIRED: --model is required for RF context");
  // Beads is the readiness authority. This is a read-only snapshot, not a claim or
  // reservation; no Beads issue status is changed by a CLI run.
  if (beadId) {
    const workspace = packageRoot(root);
    const source = await cleanGitBasis(workspace);
    const intake = await (beads.read ?? readBeadsRequest)(beadsDirectory ?? workspace, beadId, source.commit);
    task = intake.task;
    if (claimBead) {
      // One explicit native claim, then authoritative readback. A caller can
      // reconcile the issue after an ambiguous agent/Forge result; there is
      // no automatic Beads close even if verification passes.
      await (beads.claim ?? claimBeadsWork)(beadsDirectory ?? workspace, beadId);
      const afterClaim = await cleanGitBasis(workspace);
      if (afterClaim.commit !== source.commit || afterClaim.tree !== source.tree) {
        throw new Error("BEADS_CLAIM_SOURCE_CHANGED: reconcile claimed work before agent execution");
      }
    }
  }
  const selectedTask = task;
  if (selectedTask === undefined) throw new Error("MISSING_ARGUMENT: no task selected");
  const result = await develop(root, selectedTask, {
    forgeExecutable, contextMode,
    ...(review ? { reviewer: runClaudeReview } : {}),
    ...(model ? { model } : {}),
    ...(rfActor !== undefined ? { rfActor } : {}),
    ...(rfSessionId !== undefined ? { rfSessionId } : {}),
    ...(rfHistoryLimit !== undefined ? { rfHistoryLimit } : {}),
    ...(renderIdempotencyKey !== undefined ? { renderIdempotencyKey } : {}),
  });
  process.stdout.write(JSON.stringify(result) + "\n");
  switch (result.workflow.kind) {
    case "verified_candidate": return 0;
    case "verification_failed": return 1;
    default: return 3;
  }
}
