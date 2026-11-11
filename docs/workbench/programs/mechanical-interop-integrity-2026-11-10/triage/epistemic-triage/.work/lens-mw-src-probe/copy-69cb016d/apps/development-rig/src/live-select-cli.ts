import { selectAndVerifyCandidate } from "./candidate-selection.js";
import type { SelectionReport } from "./candidate-selection.js";

/**
 * `--live-select`: the planning/selection consumer of the development library. Plans N isolated
 * worktree candidates with the single-writer agent, chooses one through a schema-constrained
 * read-only session, reviews it, and gates it with Forge at its own commit. Opt-in writes only.
 * --integrate adds the fast-forward check against the live base and an independent re-gate of the chosen
 * commit in a fresh worktree; the host still never moves the base ref (that is the operator's explicit act).
 */
export async function selectCli(
  args: readonly string[],
  select: typeof selectAndVerifyCandidate = selectAndVerifyCandidate,
): Promise<number> {
  let root: string | undefined;
  let task: string | undefined;
  let candidates = 2;
  let model: string | undefined;
  let forgeExecutable = "forge";
  let allowWrites = false;
  let integrate = false;
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key === "--allow-writes") { allowWrites = true; continue; }
    if (key === "--integrate") { integrate = true; continue; }
    if (!["--workspace", "--task", "--candidates", "--model", "--forge-bin"].includes(key ?? "")) throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    const value = args[++i];
    if (!value || value.startsWith("--")) throw new Error("INVALID_ARGUMENT: " + key + " requires a value");
    if (key === "--workspace") root = value;
    else if (key === "--task") task = value;
    else if (key === "--model") model = value;
    else if (key === "--forge-bin") forgeExecutable = value;
    else {
      if (!/^\d+$/.test(value)) throw new Error("SELECTION_REQUEST_INVALID: --candidates must be an integer 1..8");
      candidates = Number(value);
      if (candidates < 1 || candidates > 8) throw new Error("SELECTION_REQUEST_INVALID: --candidates must be an integer 1..8");
    }
  }
  if (!root || !task) throw new Error("MISSING_ARGUMENT: --workspace and --task are required");
  if (!allowWrites) throw new Error("WRITE_OPT_IN_REQUIRED: --allow-writes is required for live agent source changes in isolated candidate worktrees");
  const report: SelectionReport = await select(root, task, { candidates, forgeExecutable, integrate, ...(model ? { model } : {}) });
  process.stdout.write(JSON.stringify({ mode: "live-select", report }) + "\n");
  switch (report.outcome.kind) {
    // With --integrate, exit 0 also needs the second gate on the fast-forward basis to have passed.
    case "reviewed_candidate": return integrate && !report.integration?.verified ? 3 : 0;
    case "verification_failed": case "review_rejected": return 1;
    default: return 3;
  }
}
