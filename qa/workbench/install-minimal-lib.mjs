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

/**
 * Probes whether the installed tree can be written, without ever leaving residue (U1). `write` and
 * `remove` are injected so the privileged branch is testable without root. A refusal with EACCES,
 * EPERM or EROFS proves read-only enforcement (EROFS is accepted beside the specified pair because a
 * read-only mount is an equally valid enforcement). A successful write is removed before returning,
 * so the tree census is unchanged; it is recorded as privileged-uid for uid 0 and is a failure
 * otherwise. Any other error is rethrown.
 */
export function probeInstalledWrite({ root, uid, write, remove }) {
  const target = join(root, '.minimal-write-probe');
  try {
    write(target, 'x');
  } catch (error) {
    if (error && (error.code === 'EACCES' || error.code === 'EPERM' || error.code === 'EROFS')) return { readOnlyEnforced: true };
    throw error;
  }
  remove(target, { force: true });
  if (isPrivilegedUid(uid)) return { readOnlyEnforced: false, readOnlyReason: 'privileged-uid' };
  throw new Error('write into the installed tree unexpectedly succeeded');
}

/**
 * Runner-side cross-check on the parsed probe receipt (wb-nh3 F2/O1). The probe's own claim about
 * read-only enforcement is only accepted when it is `readOnlyEnforced === true`, or when the RUNNER's
 * own uid is privileged and the probe recorded `readOnlyReason: 'privileged-uid'`. A receipt that
 * dropped `readOnlyEnforced`, dropped or replaced the reason, or claims privileged-uid for an
 * unprivileged runner (probe uid pinned to 0) is refused. The refusal names booleans and types only,
 * never a raw receipt value.
 */
export function assertReadOnlyReceipt(receipt, ownUid) {
  if (receipt.readOnlyEnforced === true) return;
  if (isPrivilegedUid(ownUid) && receipt.readOnlyReason === 'privileged-uid') return;
  throw new Error(
    `install-minimal probe receipt does not prove read-only enforcement (readOnlyEnforced is ${typeof receipt.readOnlyEnforced}, readOnlyReason is ${typeof receipt.readOnlyReason}, runner privileged: ${isPrivilegedUid(ownUid)})`,
  );
}
