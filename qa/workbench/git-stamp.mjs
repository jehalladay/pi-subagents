// wb-vko: one truthful git stamp for the qa git-discovery members (status-ledger revisionOf,
// local-detached-faults revision(), package-smoke). Pure node. A stamp describes `root` only when
// root IS the repository toplevel: a package nested in a foreign checkout, or a directory outside
// any repository, yields no head so a receipt can never carry another repository's HEAD.
import {spawnSync} from 'node:child_process';
import {realpathSync} from 'node:fs';

// git-stamp:begin (copied byte-for-byte into status-ledger.mjs, local-detached-faults.mjs and local-detached-shared-child.mjs, whose
// guards allow only node: imports; test/workbench-git-stamp.test.ts fails on any drift)
const HEX = /^[0-9a-f]{7,64}$/;

function git(root, args) {
  const run = spawnSync('git', args, {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
  return run.status === 0 && typeof run.stdout === 'string' ? run.stdout : undefined;
}

function sameDir(a, b) {
  try {
    return realpathSync(a) === realpathSync(b);
  } catch {
    return false;
  }
}

/** `{head, porcelain}` for `root`, both null unless root is the repository toplevel with a valid HEAD. */
function gitStamp(root) {
  const top = git(root, ['rev-parse', '--show-toplevel']);
  if (top === undefined || !sameDir(top.trim(), root)) return {head: null, porcelain: null};
  const head = (git(root, ['rev-parse', 'HEAD']) ?? '').trim();
  if (!HEX.test(head)) return {head: null, porcelain: null};
  return {head, porcelain: git(root, ['status', '--porcelain']) ?? null};
}

/** HEAD sha, suffixed `-dirty` when the tree has changes; `working-tree` when root is not a toplevel. */
function revisionOf(root) {
  const {head, porcelain} = gitStamp(root);
  if (head === null) return 'working-tree';
  return typeof porcelain === 'string' && porcelain.trim().length > 0 ? `${head}-dirty` : head;
}
// git-stamp:end

export {gitStamp, revisionOf};
