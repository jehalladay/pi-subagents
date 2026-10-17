// W21 revision honesty (wb-oq3; the wb-9x5.14 gate F1, routed family-wide by the owner): a W21 bench receipt takes
// its revision from `git rev-parse HEAD` of the checkout these benches live in, plus a dirty flag from
// `git status --porcelain`. $W21_REVISION only OVERRIDES the revision, never the dirty flag, and the receipt names the
// source it used ('git', 'env-override' or 'unknown'), so a caller-asserted revision is visible as one.
//
// Same toplevel discipline as the wb-7uq / wb-vko git-discovery members: the stamp describes the checkout only when
// its root IS the git toplevel. A bench tree copied under a foreign checkout, or run outside any repository, stamps
// revision "working-tree" with dirty null, never another repository's HEAD. Pure node: built-in modules only.
import {spawnSync} from 'node:child_process';
import {realpathSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

export const UNKNOWN_REVISION = 'working-tree';
/** The checkout root: qa/workbench/ sits two directories below it. */
export const BENCH_CHECKOUT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const HEX = /^[0-9a-f]{7,64}$/;

/** stdout of `git <args>` run in `root`, or undefined when git fails or is not installed. */
function git(root, args) {
  const run = spawnSync('git', args, {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
  return run.status === 0 && typeof run.stdout === 'string' ? run.stdout : undefined;
}

function sameDirectory(left, right) {
  try {
    return realpathSync(left) === realpathSync(right);
  } catch {
    return false;
  }
}

/**
 * The receipt revision of `root` as {revision, revisionSource, dirty}: HEAD and the porcelain dirty flag when root is
 * a git toplevel with a valid HEAD (dirty null otherwise); a non-blank $W21_REVISION replaces only the revision.
 */
export function benchRevision({env = process.env, root = BENCH_CHECKOUT_ROOT} = {}) {
  const top = git(root, ['rev-parse', '--show-toplevel']);
  const head = top !== undefined && sameDirectory(top.trim(), root) ? (git(root, ['rev-parse', 'HEAD']) ?? '').trim() : '';
  const known = HEX.test(head);
  const porcelain = known ? git(root, ['status', '--porcelain']) : undefined;
  const dirty = known && typeof porcelain === 'string' ? porcelain.trim().length > 0 : null;
  const override = typeof env.W21_REVISION === 'string' ? env.W21_REVISION.trim() : '';
  if (override !== '') return {revision: override, revisionSource: 'env-override', dirty};
  return known ? {revision: head, revisionSource: 'git', dirty} : {revision: UNKNOWN_REVISION, revisionSource: 'unknown', dirty: null};
}

/** A copy of `receipt` carrying the stamp's revision, revision source and dirty flag; every other field is kept. */
export function withBenchRevision(receipt, stamp) {
  return {...receipt, revision: stamp.revision, revisionSource: stamp.revisionSource, dirty: stamp.dirty};
}
