/**
 * A small read-only Beads host boundary. Native `bd ready`/`bd show` own
 * readiness and issue state; this code merely validates and projects a
 * snapshot, and never claims/closes Work or creates a second DAG.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { realpathSync } from "node:fs";
import { requestFromBead, type BeadsDevelopmentRequest, type BeadsIssue } from "./beads-intake.js";

const execFileAsync = promisify(execFile);
interface ExecResult { readonly stdout: string; readonly stderr: string; readonly exitCode: number }
export type BdExecutor = (argv: readonly string[], cwd: string) => Promise<ExecResult> | ExecResult;
/** The native `bd` process seam, exported for hosts that issue their own read-only queries. */
export const nativeBdExecutor: BdExecutor = async (argv, cwd) => {
  try {
    const result = await execFileAsync("bd", [...argv], { cwd, encoding: "utf8", timeout: 30_000, maxBuffer: 8 * 1024 * 1024 });
    return { stdout: result.stdout, stderr: result.stderr, exitCode: 0 };
  } catch (error) {
    // Keep nonzero and process exceptions distinct from an empty ready result.
    const reason = error instanceof Error ? error.message : String(error);
    return { stdout: "", stderr: reason, exitCode: 1 };
  }
};
function parseList(value: ExecResult, command: string): Record<string, unknown>[] {
  if (value.exitCode !== 0) throw new Error("BEADS_QUERY_UNESTABLISHED: " + command + " exited nonzero: " + value.stderr);
  let data: unknown;
  try { data = JSON.parse(value.stdout); }
  catch { throw new Error("BEADS_RESPONSE_INVALID: " + command + " did not return JSON"); }
  if (!Array.isArray(data) || !data.every(item => item !== null && typeof item === "object" && !Array.isArray(item))) {
    throw new Error("BEADS_RESPONSE_INVALID: " + command + " must return an issue array");
  }
  return data as Record<string, unknown>[];
}
/** A read snapshot, not a claim. Re-read Beads before any later claim/effect. */
export async function readBeadsRequest(
  directory: string,
  issueId: string,
  baseRevision: string,
  execute: BdExecutor = nativeBdExecutor,
): Promise<BeadsDevelopmentRequest> {
  if (!directory || !issueId.trim() || !baseRevision.trim()) {
    throw new Error("BEADS_WORK_INVALID: directory, issue id and revision required");
  }
  const cwd = realpathSync(directory);
  const ready = parseList(await execute(["--readonly", "--directory", cwd, "ready", "--json"], cwd), "ready");
  const ids = ready.map(item => item["id"]).filter((id): id is string => typeof id === "string");
  // A missing id is not proof the issue does not exist: refuse without interpreting it as ready.
  if (!ids.includes(issueId)) throw new Error("BEADS_WORK_NOT_READY: issue absent from native ready result");
  const shown = parseList(await execute(["--readonly", "--directory", cwd, "show", issueId, "--json"], cwd), "show");
  if (shown.length !== 1 || shown[0]?.["id"] !== issueId) {
    throw new Error("BEADS_RESPONSE_INVALID: native show did not uniquely identify the requested issue");
  }
  const issue = shown[0] as unknown as BeadsIssue;
  return requestFromBead(issue, { workspaceId: cwd, baseRevision, readyIssueIds: ids });
}
