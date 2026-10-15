/**
 * Pure helpers for the minimal-permissions clean-install run (wb-cax.2, docs/workbench/17
 * "Release checklist" item 10). Plain ESM, no side effects at import time.
 */
import { createHash } from 'node:crypto';
import { closeSync, existsSync, lstatSync, openSync, readdirSync, readFileSync, readlinkSync, readSync } from 'node:fs';
import { dirname, join } from 'node:path';

/**
 * The only environment the installed probe may see. Fixed names, values supplied by the caller,
 * never copied from the ambient process environment (docs/workbench/12 "Credential boundaries").
 */
export function scrubbedEnvironment({ execPath, home, tmp }) {
  return { PATH: dirname(execPath), HOME: home, TMPDIR: tmp, LANG: 'C.UTF-8' };
}

/**
 * Deterministic sha256 over sorted relative paths plus per-entry content digests. Symlinks are
 * recorded by link target and never followed; permission bits are deliberately excluded so a
 * read-only chmod cannot masquerade as a content change. A missing root throws.
 */
export function treeCensus(root) {
  const entries = [];
  const walk = (relative) => {
    const absolute = relative === '' ? root : join(root, relative);
    const stat = lstatSync(absolute);
    if (stat.isSymbolicLink()) {
      entries.push(`L ${relative}\0${readlinkSync(absolute)}`);
    } else if (stat.isDirectory()) {
      if (relative !== '') entries.push(`D ${relative}`);
      for (const name of readdirSync(absolute)) walk(relative === '' ? name : join(relative, name));
    } else if (stat.isFile()) {
      entries.push(`F ${relative}\0${createHash('sha256').update(readFileSync(absolute)).digest('hex')}`);
    } else {
      entries.push(`O ${relative}`);
    }
  };
  walk('');
  entries.sort();
  const hash = createHash('sha256');
  for (const entry of entries) hash.update(entry).update('\n');
  return hash.digest('hex');
}

/** uid 0 bypasses file permission checks, so a read-only tree cannot be enforced against it. */
export function isPrivilegedUid(uid) {
  return uid === 0;
}

/**
 * Version-manager shims (for example a bash `node` wrapper beside `node_real`) inject PWD, SHLVL and
 * LD_LIBRARY_PATH into the child, which would defeat the exact-environment assertion. When execPath
 * starts with a shebang and a sibling `node_real` exists, the real binary is used; otherwise the
 * execPath is returned unchanged.
 */
export function resolveNodeBinary(execPath) {
  const real = join(dirname(execPath), 'node_real');
  if (!existsSync(real)) return execPath;
  const fd = openSync(execPath, 'r');
  try {
    const head = Buffer.alloc(2);
    const read = readSync(fd, head, 0, 2, 0);
    return read === 2 && head.toString('latin1') === '#!' ? real : execPath;
  } finally {
    closeSync(fd);
  }
}
