/**
 * Git revision + dirty stamp for the one-turn served-model receipt (wb-a2g.6 U1, the wb-vko git-discovery family).
 *
 * qa/ ships in the npm package, so an installed copy can sit inside a consumer checkout: a bare `git` read from the
 * package root would then adopt the ENCLOSING repository's HEAD and dirty state. The stamp reads HEAD and the working
 * tree status ONLY when the root IS the git toplevel (realpath equality); otherwise the revision is "working-tree" and
 * the dirty bit is null. A failed status read is dirty null, never false (never a clean claim from a failed read).
 * Inline copy of the in-tree conformant precedent qa/workbench/dependency-census.mjs revisionOf; the canonical shared
 * block (queued wb-vko git-stamp.mjs) is not on trunk and is deliberately not imported here.
 *
 * `git` and `sameDir` are injectable so the stamp is testable offline; the defaults never throw.
 */
import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';

/** stdout of `git <args>` run in root, or undefined when git cannot say (non-zero exit, spawn failure, bad cwd). */
export function defaultGit(root, args) {
  const run = spawnSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  return run.status === 0 && typeof run.stdout === 'string' ? run.stdout : undefined;
}

/** True when both paths resolve to the same real directory; any resolution failure is not equal. */
export function defaultSameDir(a, b) {
  try {
    return realpathSync(a) === realpathSync(b);
  } catch {
    return false;
  }
}

/** { revision, dirty }: HEAD and whether the tree differs from it, or "working-tree" / null when root is not the toplevel or git cannot say. */
export function gitStamp(root, git = defaultGit, sameDir = defaultSameDir) {
  const top = git(root, ['rev-parse', '--show-toplevel']);
  if (top === undefined || !sameDir(top.trim(), root)) return { revision: 'working-tree', dirty: null };
  const head = (git(root, ['rev-parse', 'HEAD']) ?? '').trim();
  if (!/^[0-9a-f]{7,64}$/.test(head)) return { revision: 'working-tree', dirty: null };
  const porcelain = git(root, ['status', '--porcelain']);
  if (porcelain === undefined) return { revision: head, dirty: null };
  return { revision: head, dirty: porcelain.trim().length > 0 };
}
