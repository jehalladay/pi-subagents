#!/usr/bin/env node
// wb-vic (W22-H pre-push wiring follow-up to wb-a9s F9): the git pre-push HOOK around the commit-range scan in
// qa/workbench/commit-message-scan.mjs. Owner-ruled contract: the scan takes a COMMIT RANGE, and a pre-push hook reads
// `<local ref> <local sha> <remote ref> <remote sha>` lines on stdin and scans remote..local (every commit, not the tip;
// all commits when the remote sha is all zeros).
//
// For each stdin line this runs `commit-message-scan.mjs --base <remote sha> --tip <local sha>` (the CLI itself treats an
// all-zeros base as "every commit reachable from the tip", so a new branch is scanned in full). The CLI is reused as is: its
// stdout names every offending commit as sha, line, column and a U+ hex label (labels only, never the raw points).
//   - a deleted-ref line (local sha all zeros) pushes no commits and is skipped
//   - every line is scanned, then the exit is decided: 3 when any ref has an offender, else 2 when any ref could not be
//     scanned (an unresolvable sha, a malformed line), else 0. Non-zero refuses the push; nothing fails open.
//   - a sha that is not 40 or 64 hex digits is refused before it reaches the CLI as an argument
//   - refs echoed in the refusal line are projected to printable ASCII so the report cannot carry a raw guard point
// Install, once per clone, as a two-line wrapper script that execs node on this file, so a missing target fails the push
// (see docs/workbench/17-packaging-and-operations.md).
import {spawnSync} from 'node:child_process';
import {readFileSync, realpathSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const SHA = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const ZERO_SHA = /^0+$/;
const SCAN = join(dirname(fileURLToPath(import.meta.url)), 'commit-message-scan.mjs');

/** @param {string} value @returns {string} printable ASCII only; everything else becomes ? */
const projectAscii = value => value.replace(/[^\x20-\x7e]/g, '?');

/**
 * @typedef {{kind: 'delete'} | {kind: 'push', localRef: string, localSha: string, remoteSha: string} | {kind: 'malformed', text: string}} RefLine
 */

/**
 * Parse one `<local ref> <local sha> <remote ref> <remote sha>` line.
 * @param {string} line
 * @returns {RefLine}
 */
export function parseRefLine(line) {
  const fields = line.split(' ');
  if (fields.length !== 4) return {kind: 'malformed', text: projectAscii(line)};
  const [localRef, localSha, , remoteSha] = fields;
  if (!SHA.test(localSha) || !SHA.test(remoteSha)) return {kind: 'malformed', text: projectAscii(line)};
  if (ZERO_SHA.test(localSha)) return {kind: 'delete'};
  return {kind: 'push', localRef: projectAscii(localRef), localSha, remoteSha};
}

/**
 * Scan every ref line; returns the hook exit code (0 clean, 3 any offender, 2 any unscannable line and no offender).
 * @param {string} stdin
 * @returns {number}
 */
export function runHook(stdin) {
  let offended = false;
  let unscannable = false;
  for (const line of stdin.split(/\r?\n/)) {
    if (line === '') continue;
    const parsed = parseRefLine(line);
    if (parsed.kind === 'delete') continue;
    if (parsed.kind === 'malformed') {
      process.stderr.write(`pre-push-commit-message-scan: malformed ref line refused (${parsed.text.length} chars); nothing was scanned for it\n`);
      unscannable = true;
      continue;
    }
    const result = spawnSync(process.execPath, [SCAN, '--base', parsed.remoteSha, '--tip', parsed.localSha], {stdio: ['ignore', 'inherit', 'inherit']});
    if (result.status === 0) continue;
    if (result.status === 3) offended = true;
    else unscannable = true;
    process.stderr.write(`pre-push-commit-message-scan: push of ${parsed.localRef} refused (scan exit ${result.status ?? 'none'}); offending commits are listed above\n`);
  }
  if (offended) return 3;
  return unscannable ? 2 : 0;
}

// When this file is reached through a SYMLINK (an alternative to the wrapper install): argv[1] is the link path while
// import.meta.url is the resolved file, so the entry check compares the resolved path (comparing the raw link path would skip
// the scan and exit 0, failing open).
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) process.exitCode = runHook(readFileSync(0, 'utf8'));
