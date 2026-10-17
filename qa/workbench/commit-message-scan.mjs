// wb-a9s (W22-H follow-up): pre-push commit-message invisible-point scan.
//
// Run before pushing: `node qa/workbench/commit-message-scan.mjs [--base <rev>] [--tip <rev>]`. It scans the commit
// objects in <base>..<tip> (default base origin/workbench/implementation-program, default tip HEAD) for the
// source-hygiene guard set and refuses the push when any is found. A base of all zeros means every commit reachable
// from the tip (a first push: the pre-push hook contract scans remote..local, every commit, never the tip alone).
// Each commit object is read as RAW BYTES (git cat-file --batch), never as a NUL-terminated string, and its author
// and committer identity strings (name and email) are in scope beside the message.
//
// TWO guard sets exist on purpose. This message-side set has 17 points; the tree-side set in
// test/source-hygiene.test.ts has 12. The message set adds U+200B, U+200C, U+200D, U+2060 and U+FEFF. Messages are
// ASCII by the fresh-ASCII-cut rule (a 0-of-N ratchet), so an emoji ZWJ sequence in a message IS a finding, while
// source and fixtures legitimately carry ZWJ sequences, so the tree-side guard keeps its narrower set. Not unified. This is the message-side mirror of the tree-side guard: a commit
// message is permanent once a merge-only landing carries it, and the guard set includes U+202E, the
// trojan-source display vector. Motivation of record: wb-era F1.
//   0  every new commit message and identity is clean
//   2  the scan could not run (unresolvable base or tip, bad arguments, an unknown argument); never a silent pass, and no
//      summary line is printed on stdout in this case
//   3  a new commit carries a guard-set point, or declares a non-UTF-8 encoding; each offender is printed as sha, line,
//      column, U+XXXX for a message, as sha, author|committer, column, U+XXXX for an identity (EVERY author and committer
//      header line is scanned, not only the first), and as sha, encoding, name for an encoding header
// Encoding: the scan decodes the object as UTF-8. A commit whose encoding header names anything but UTF-8 (utf-8 or utf8,
// case-insensitive) cannot be read that way (windows-1256 0xFE is U+200E, UTF-7 spells a point in ASCII), so it FAILS CLOSED
// as an offender; the name is projected to printable ASCII so the report cannot carry a raw point.
// Output prints only code point labels, never the raw points, so the report cannot itself carry them.
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

/**
 * @typedef {{sha: string, line: number, column: number, codePoint: string}} MessageOffender
 * @typedef {{sha: string, message: string}} CommitMessage
 * @typedef {{sha: string, field: 'message', line: number, column: number, codePoint: string}} ObjectMessageOffender
 * @typedef {{sha: string, field: 'author' | 'committer', column: number, codePoint: string}} IdentityOffender
 * @typedef {{sha: string, field: 'encoding', name: string}} EncodingOffender
 * @typedef {{sha: string, raw: Buffer}} CommitObject
 */

/** Guard set: U+061C, U+200B-U+200F, U+202A-U+202E, U+2060, U+2066-U+2069, U+FEFF. */
const RANGES = Object.freeze([[0x061c, 0x061c], [0x200b, 0x200f], [0x202a, 0x202e], [0x2060, 0x2060], [0x2066, 0x2069], [0xfeff, 0xfeff]]);
const ZERO_SHA = /^0+$/;
export const GUARD_CODE_POINTS = Object.freeze(RANGES.flatMap(([lo, hi]) => Array.from({length: hi - lo + 1}, (_, i) => lo + i)));
export const DEFAULT_BASE = 'origin/workbench/implementation-program';

/** @param {number} codePoint @returns {boolean} */
export const isGuardCodePoint = codePoint => RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi);
/** @param {number} codePoint @returns {string} */
const label = codePoint => `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;

/**
 * Offenders in one message: 1-based line (CRLF is one break), 1-based column counted in code points.
 * @param {string} sha
 * @param {string} message
 * @returns {MessageOffender[]}
 */
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

/**
 * @param {CommitMessage[]} commits
 * @returns {MessageOffender[]}
 */
export const scanCommitMessages = commits => commits.flatMap(({sha, message}) => scanCommitMessage(sha, message));

/**
 * Offenders in one identity string (name and email), 1-based column counted in code points from the value start.
 * @param {string} sha
 * @param {'author' | 'committer'} field
 * @param {string} value
 * @returns {IdentityOffender[]}
 */
function scanIdentity(sha, field, value) {
  /** @type {IdentityOffender[]} */
  const out = [];
  let column = 0;
  for (const ch of value) {
    column += 1;
    const codePoint = ch.codePointAt(0);
    if (codePoint !== undefined && isGuardCodePoint(codePoint)) out.push({sha, field, column, codePoint: label(codePoint)});
  }
  return out;
}

/** Header lines whose first token is `name`, in object order (continuation lines start with a space and never match). @param {string[]} lines @param {string} name @returns {string[]} */
const headerValues = (lines, name) => lines.filter(l => l.startsWith(`${name} `)).map(l => l.slice(name.length + 1));
/** @param {string} value @returns {string} printable ASCII only; everything else becomes ? */
const projectAscii = value => value.replace(/[^\x20-\x7e]/g, '?');
/** @param {string} name @returns {boolean} */
const isUtf8Name = name => name.toLowerCase() === 'utf-8' || name.toLowerCase() === 'utf8';

/**
 * Offenders in one RAW commit object: every encoding header that is not UTF-8, every author line, every committer line,
 * then the message. The object is split at the first blank line (headers above, message below), so a header-lookalike
 * line inside the message is message text, and a NUL byte in the message is an ordinary character: nothing after it is
 * dropped.
 * @param {string} sha
 * @param {Buffer | Uint8Array} raw
 * @returns {Array<EncodingOffender | IdentityOffender | ObjectMessageOffender>}
 */
export function scanCommitObject(sha, raw) {
  const bytes = Buffer.from(raw);
  const split = bytes.indexOf('\n\n');
  const lines = (split === -1 ? bytes : bytes.subarray(0, split)).toString('utf8').split('\n');
  const message = split === -1 ? '' : bytes.subarray(split + 2).toString('utf8');
  /** @type {Array<EncodingOffender | IdentityOffender | ObjectMessageOffender>} */
  const out = [];
  for (const name of headerValues(lines, 'encoding')) if (!isUtf8Name(name)) out.push({sha, field: 'encoding', name: projectAscii(name)});
  for (const value of headerValues(lines, 'author')) out.push(...scanIdentity(sha, 'author', value));
  for (const value of headerValues(lines, 'committer')) out.push(...scanIdentity(sha, 'committer', value));
  for (const o of scanCommitMessage(sha, message)) out.push({sha: o.sha, field: 'message', line: o.line, column: o.column, codePoint: o.codePoint});
  return out;
}

/**
 * @param {string[]} args
 * @param {string} [input]
 * @returns {Buffer}
 */
function git(args, input) {
  return execFileSync('git', args, {input, stdio: [input === undefined ? 'ignore' : 'pipe', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 1024});
}

/**
 * Every commit in base..tip as its raw object bytes (git cat-file --batch, so no NUL-terminated string read). A base of
 * null or all zeros means every commit reachable from the tip. Throws when the base or tip does not resolve.
 * @param {string | null} base
 * @param {string} [tip]
 * @returns {CommitObject[]}
 */
export function readCommitObjects(base, tip = 'HEAD') {
  const everything = base === null || ZERO_SHA.test(base);
  if (!everything) git(['rev-parse', '--verify', '--quiet', `${base}^{commit}`]);
  git(['rev-parse', '--verify', '--quiet', `${tip}^{commit}`]);
  const shas = git(['rev-list', ...(everything ? [tip] : [`${base}..${tip}`])]).toString('utf8').split('\n').filter(Boolean);
  if (shas.length === 0) return [];
  const out = git(['cat-file', '--batch'], `${shas.join('\n')}\n`);
  /** @type {CommitObject[]} */
  const commits = [];
  let at = 0;
  while (at < out.length) {
    const eol = out.indexOf('\n', at);
    const [sha, type, size] = out.subarray(at, eol).toString('utf8').split(' ');
    if (type !== 'commit') throw new Error('unexpected object type');
    const start = eol + 1;
    commits.push({sha, raw: out.subarray(start, start + Number(size))});
    at = start + Number(size) + 1;
  }
  return commits;
}

/**
 * @param {string[]} argv
 * @returns {number}
 */
export function main(argv) {
  let base = DEFAULT_BASE;
  let tip = 'HEAD';
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === '--base' || flag === '--tip') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        process.stderr.write(`commit-message-scan: ${flag} requires a revision\n`);
        return 2;
      }
      if (flag === '--base') base = value;
      else tip = value;
      i += 1;
    } else {
      process.stderr.write(`commit-message-scan: unknown argument ${JSON.stringify(flag).replace(/[^\x20-\x7e]/g, '?')}\n`);
      return 2;
    }
  }
  let commits;
  try {
    commits = readCommitObjects(base, tip);
  } catch {
    process.stderr.write('commit-message-scan: cannot resolve the base or tip revision or read the log; nothing was scanned\n');
    return 2;
  }
  const offenders = commits.flatMap(({sha, raw}) => scanCommitObject(sha, raw));
  for (const o of offenders) {
    if (o.field === 'message') process.stdout.write(`${o.sha} line ${o.line} column ${o.column} ${o.codePoint}\n`);
    else if (o.field === 'encoding') process.stdout.write(`${o.sha} encoding ${o.name}\n`);
    else process.stdout.write(`${o.sha} ${o.field} column ${o.column} ${o.codePoint}\n`);
  }
  process.stdout.write(`commit-message-scan: ${commits.length} commits, ${offenders.length} offenders\n`);
  return offenders.length === 0 ? 0 : 3;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main(process.argv.slice(2));
