// wb-a9s (W22-H follow-up): pre-push commit-message invisible-point scan.
//
// Run before pushing: `node qa/workbench/commit-message-scan.mjs [--base <rev>]`. It scans the MESSAGES of the
// commits in <base>..HEAD (default base origin/workbench/implementation-program) for the source-hygiene guard
// set and refuses the push when any is found. This is the message-side mirror of the tree-side guard: a commit
// message is permanent once a merge-only landing carries it, and the guard set includes U+202E, the
// trojan-source display vector. Motivation of record: wb-era F1.
//   0  every new commit message is clean
//   2  the scan could not run (unresolvable base, bad arguments); never a silent pass
//   3  a new commit message carries a guard-set point; each offender is printed as sha, line, column, U+XXXX
// Output prints only code point labels, never the raw points, so the report cannot itself carry them.
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

/** Guard set: U+061C, U+200B-U+200F, U+202A-U+202E, U+2060, U+2066-U+2069, U+FEFF. */
const RANGES = Object.freeze([[0x061c, 0x061c], [0x200b, 0x200f], [0x202a, 0x202e], [0x2060, 0x2060], [0x2066, 0x2069], [0xfeff, 0xfeff]]);
export const GUARD_CODE_POINTS = Object.freeze(RANGES.flatMap(([lo, hi]) => Array.from({length: hi - lo + 1}, (_, i) => lo + i)));
export const DEFAULT_BASE = 'origin/workbench/implementation-program';

export const isGuardCodePoint = codePoint => RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi);
const label = codePoint => `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;

/** Offenders in one message: 1-based line (CRLF is one break), 1-based column counted in code points. */
export function scanCommitMessage(sha, message) {
  const out = [];
  let line = 1;
  let column = 0;
  const chars = Array.from(message);
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    if (ch === '\r' && chars[i + 1] === '\n') continue; // CRLF breaks the line once, at the LF
    if (ch === '\n' || ch === '\r') {
      line += 1;
      column = 0;
      continue;
    }
    column += 1;
    const codePoint = ch.codePointAt(0);
    if (isGuardCodePoint(codePoint)) out.push({sha, line, column, codePoint: label(codePoint)});
  }
  return out;
}

export const scanCommitMessages = commits => commits.flatMap(({sha, message}) => scanCommitMessage(sha, message));

function git(args) {
  return execFileSync('git', args, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 256 * 1024 * 1024});
}

/** Commits in base..HEAD with their raw messages. NUL cannot occur in a commit message, so it is the separator. */
export function readCommits(base) {
  git(['rev-parse', '--verify', '--quiet', `${base}^{commit}`]);
  const raw = git(['log', '-z', '--format=%H%x00%B', `${base}..HEAD`]);
  const fields = raw.split('\0');
  const commits = [];
  for (let i = 0; i + 1 < fields.length; i += 2) commits.push({sha: fields[i].replace(/^\n/, ''), message: fields[i + 1]});
  return commits;
}

export function main(argv) {
  let base = DEFAULT_BASE;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--base') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        process.stderr.write('commit-message-scan: --base requires a revision\n');
        return 2;
      }
      base = value;
      i += 1;
    } else {
      process.stderr.write(`commit-message-scan: unknown argument ${JSON.stringify(argv[i]).replace(/[^\x20-\x7e]/g, '?')}\n`);
      return 2;
    }
  }
  let commits;
  try {
    commits = readCommits(base);
  } catch {
    process.stderr.write('commit-message-scan: cannot resolve the base revision or read the log; nothing was scanned\n');
    return 2;
  }
  const offenders = scanCommitMessages(commits);
  for (const o of offenders) process.stdout.write(`${o.sha} line ${o.line} column ${o.column} ${o.codePoint}\n`);
  process.stdout.write(`commit-message-scan: ${commits.length} commits, ${offenders.length} offenders\n`);
  return offenders.length === 0 ? 0 : 3;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main(process.argv.slice(2));
