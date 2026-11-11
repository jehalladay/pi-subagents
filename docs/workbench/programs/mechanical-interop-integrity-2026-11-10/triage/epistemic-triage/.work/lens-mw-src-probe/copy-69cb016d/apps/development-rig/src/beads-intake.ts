/**
 * Application-specific, read-only task intake from a caller-supplied Beads issue.
 * Beads itself remains the readiness/claim authority; this projection does
 * not persist work, compute blockers, or mutate issue status.
 */
import type { DevelopmentRequest } from "@mechanical/workflows-development";

export interface BeadsIssue {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly status: string;
  readonly blocked?: boolean;
}
export interface BeadsIntakeOptions {
  readonly workspaceId: string;
  readonly baseRevision: string;
  /** IDs returned by Beads' own ready query on this workspace, never inferred here. */
  readonly readyIssueIds: readonly string[];
}
export interface BeadsDevelopmentRequest extends DevelopmentRequest {
  readonly beadsIssueId: string;
}
export function requestFromBead(issue: BeadsIssue, options: BeadsIntakeOptions): BeadsDevelopmentRequest {
  if (!Array.isArray(options.readyIssueIds)) {
    throw new Error("BEADS_READINESS_UNATTESTED: supply Beads' native ready issue IDs");
  }
  if (issue.status !== "open" || issue.blocked === true || typeof issue.id !== "string" || !issue.id.trim() ||
      !options.readyIssueIds.includes(issue.id)) {
    throw new Error("BEADS_WORK_NOT_READY: issue must be a ready, unclaimed Beads item");
  }
  if (typeof issue.title !== "string" || !issue.title.trim() ||
      typeof options.workspaceId !== "string" || !options.workspaceId.trim() ||
      typeof options.baseRevision !== "string" || !options.baseRevision.trim()) {
    throw new Error("BEADS_WORK_INVALID: title, workspace and source revision must be nonempty");
  }
  return {
    task: issue.title + (issue.description?.trim() ? "\n\n" + issue.description.trim() : ""),
    workspaceId: options.workspaceId,
    baseRevision: options.baseRevision,
    beadsIssueId: issue.id,
  };
}
