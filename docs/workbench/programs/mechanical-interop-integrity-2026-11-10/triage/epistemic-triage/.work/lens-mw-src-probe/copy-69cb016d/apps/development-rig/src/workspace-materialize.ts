/**
 * Host-local workspace materialization (WP-K, MW-053): a distributed worker receives a workspace
 * SOURCE (a content-addressed Git bundle or a remote Git URL) plus a pinned revision, and checks it
 * out under a directory the host chose. The workspace identity is derived from the source, never
 * from the caller's absolute path or the worker's process cwd, so the same request materializes
 * identically on any host. No RPC, scheduling or durability is implemented here.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { isAbsolute, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(execFile);

export interface WorkspaceSource {
  readonly kind: "git-bundle" | "git-repository";
  /** A bundle file path (content-addressed by digest) or a remote Git URL; never a local repository path. */
  readonly location: string;
  /** A full 40-hex commit id. */
  readonly revision: string;
}
export interface MaterializedWorkspace {
  readonly root: string;
  readonly workspaceId: string;
  readonly revision: string;
  readonly source: WorkspaceSource;
}
const REMOTE_URL = /^(?:https?:\/\/|ssh:\/\/|git:\/\/|[A-Za-z0-9._-]+@[A-Za-z0-9._-]+:)/;

/** Stable identity of the source: bundle bytes for a bundle, the URL for a remote repository. */
export function workspaceIdentity(source: WorkspaceSource): string {
  if (source.kind === "git-bundle") {
    return "git-bundle:sha256:" + createHash("sha256").update(readFileSync(source.location)).digest("hex");
  }
  if (!REMOTE_URL.test(source.location)) {
    throw new Error("WORKSPACE_SOURCE_LOCAL_PATH_REFUSED: a git-repository source must be a remote URL, not a caller-local path: " + source.location);
  }
  return "git-repository:" + source.location;
}

export async function materializeWorkspace(source: WorkspaceSource, options: { readonly into: string }): Promise<MaterializedWorkspace> {
  if (!/^[0-9a-f]{40}$/.test(source.revision)) throw new Error("WORKSPACE_REVISION_NOT_PINNED: a full 40-hex commit id is required, got " + source.revision);
  if (!isAbsolute(options.into)) throw new Error("WORKSPACE_SLOT_NOT_ABSOLUTE: the host must name an absolute directory, got " + options.into);
  const workspaceId = workspaceIdentity(source);
  const root = join(options.into, "checkout");
  await mkdir(options.into, { recursive: true });
  try {
    await exec("git", ["clone", "-q", "--no-hardlinks", "--no-checkout", source.location, root]);
    const probe = await exec("git", ["-C", root, "cat-file", "-t", source.revision]).catch(() => null);
    if (!probe || probe.stdout.trim() !== "commit") throw new Error("WORKSPACE_REVISION_UNAVAILABLE: " + source.revision + " is not a commit in " + workspaceId);
    await exec("git", ["-C", root, "checkout", "-q", "--detach", source.revision]);
    const head = (await exec("git", ["-C", root, "rev-parse", "HEAD"])).stdout.trim();
    if (head !== source.revision) throw new Error("WORKSPACE_REVISION_UNAVAILABLE: checked out " + head + " instead of " + source.revision);
  } catch (error) {
    await rm(root, { recursive: true, force: true });
    throw error;
  }
  return { root, workspaceId, revision: source.revision, source };
}
