import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { nonRepoScratch } from './helpers/non-repo-scratch.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

// docs/workbench/16 "Upstream maintainability": "Record fork divergence in this documentation."
// The baseline fork sha has a single carrier: the docs/workbench/TRACEABILITY.md "Baseline:" line.
// An absent record is an EMPTY record: every measured path is named. "unknown:" is reserved for states that
// cannot be measured at all (no baseline line, git unavailable, not a checkout, unreachable baseline).

installScratchLeakGuard();

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const SECTION = '## Measured fork divergence';
const REMEDY = 'record it in docs/workbench/16 section Measured fork divergence';
const SCOPE = ['src', ':!src/workbench', 'test', ':!test/workbench*'];

interface DivergenceRow { readonly path: string; readonly recordedAt: string }
interface ParsedTable { readonly rows: readonly DivergenceRow[]; readonly malformed: readonly string[] }
interface GitOptions {
  /** GIT_CEILING_DIRECTORIES for the child, set AFTER the GIT_* strip (a "not a repository" fixture pins its parent). */
  readonly ceiling?: string;
  /** Replaces PATH for the child, so a shadowed PATH proves the git-unavailable branch. */
  readonly pathEnv?: string;
}

function gitEnv(options: GitOptions): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith('GIT_')) delete env[key];
  if (options.ceiling !== undefined) env.GIT_CEILING_DIRECTORIES = options.ceiling;
  if (options.pathEnv !== undefined) env.PATH = options.pathEnv;
  return env;
}

function git(cwd: string, args: readonly string[], options: GitOptions = {}): string {
  return execFileSync('git', [...args], { cwd, env: gitEnv(options), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
}

function gitOk(cwd: string, args: readonly string[], options: GitOptions = {}): boolean {
  try { git(cwd, args, options); return true; } catch { return false; }
}

function lines(text: string): readonly string[] {
  return text.split('\n').filter(line => line.length > 0);
}

function parseBaseline(traceability: string): string | undefined {
  return /^Baseline: fork `([0-9a-f]{40})`/m.exec(traceability)?.[1];
}

function parseDivergenceTable(doc: string): ParsedTable | undefined {
  const all = doc.split('\n');
  const start = all.findIndex(line => line.trim() === SECTION);
  if (start < 0) return undefined;
  const rows: DivergenceRow[] = [];
  const malformed: string[] = [];
  for (const line of all.slice(start + 1)) {
    if (line.startsWith('## ')) break;
    if (!line.trim().startsWith('|')) continue;
    const cells = line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim().replace(/`/g, ''));
    const first = cells[0] ?? '';
    if (first === 'path' || /^:?-+:?$/.test(first)) continue;
    if (cells.length < 3 || first === '' || (cells[1] ?? '') === '') { malformed.push(line.trim()); continue; }
    rows.push({ path: first, recordedAt: cells[1] ?? '' });
  }
  return { rows, malformed };
}

/** Returns problems; every unavailable-environment case starts with "unknown:". Never passes silently. */
function checkDivergence(cwd: string, baseline: string | undefined, doc: string, options: GitOptions = {}): readonly string[] {
  if (baseline === undefined) return ['unknown: no 40-hex "Baseline: fork `<sha>`" line found in docs/workbench/TRACEABILITY.md'];
  if (!gitOk(cwd, ['--version'], options)) return ['unknown: git is unavailable'];
  if (!gitOk(cwd, ['rev-parse', '--is-inside-work-tree'], options)) return [`unknown: ${cwd} is not a git checkout`];
  if (!gitOk(cwd, ['cat-file', '-e', `${baseline}^{commit}`], options)) return [`unknown: baseline ${baseline} is not a reachable commit (shallow clone or missing history)`];
  const parsed = parseDivergenceTable(doc);
  const problems: string[] = [];
  if (parsed === undefined) problems.push(`missing section: docs/workbench/16 has no "${SECTION}" section; add it, then ${REMEDY}`);
  for (const row of parsed?.malformed ?? []) problems.push(`malformed row: ${row}`);
  const seen = new Set<string>();
  const rows: DivergenceRow[] = [];
  for (const row of parsed?.rows ?? []) {
    if (seen.has(row.path)) problems.push(`duplicate row: ${row.path} is recorded more than once`);
    else { seen.add(row.path); rows.push(row); }
  }
  const measured = lines(git(cwd, ['diff', '--name-only', '--diff-filter=M', baseline, 'HEAD', '--', ...SCOPE], options));
  for (const path of measured) {
    if (!seen.has(path)) problems.push(`unrecorded divergence: ${path} differs from the baseline; ${REMEDY}`);
  }
  const atBaseline = new Set(lines(git(cwd, ['ls-tree', '-r', '--name-only', baseline], options)));
  const commits = new Map<string, { readonly sha: string; readonly ancestor: boolean; readonly modified: ReadonlySet<string> } | undefined>();
  const resolve = (recordedAt: string): { readonly sha: string; readonly ancestor: boolean; readonly modified: ReadonlySet<string> } | undefined => {
    if (commits.has(recordedAt)) return commits.get(recordedAt);
    let found: { readonly sha: string; readonly ancestor: boolean; readonly modified: ReadonlySet<string> } | undefined;
    if (gitOk(cwd, ['cat-file', '-e', `${recordedAt}^{commit}`], options)) {
      const sha = git(cwd, ['rev-parse', '--verify', `${recordedAt}^{commit}`], options).trim();
      const ancestor = gitOk(cwd, ['merge-base', '--is-ancestor', sha, 'HEAD'], options);
      found = { sha, ancestor, modified: new Set(lines(git(cwd, ['diff', '--name-only', '--diff-filter=M', baseline, sha, '--', ...SCOPE], options))) };
    }
    commits.set(recordedAt, found);
    return found;
  };
  for (const row of rows) {
    const live = measured.includes(row.path);
    if (!atBaseline.has(row.path)) problems.push(`misrecorded row: ${row.path} never existed at the baseline`);
    else if (!live) problems.push(`stale row: ${row.path} no longer differs from the baseline; remove it from ${SECTION}`);
    const dated = resolve(row.recordedAt);
    if (dated === undefined) problems.push(`undated row: ${row.path} recorded-at "${row.recordedAt}" is not a reachable commit`);
    else if (live && atBaseline.has(row.path)) {
      if (!dated.ancestor) problems.push(`mis-dated row: ${row.path} recorded-at "${row.recordedAt}" is not an ancestor of HEAD`);
      else if (!dated.modified.has(row.path)) problems.push(`mis-dated row: ${row.path} recorded-at "${row.recordedAt}" predates the divergence (the path did not differ from the baseline there)`);
    }
  }
  return problems;
}

interface Fixture { readonly cwd: string; readonly base: string; readonly div: string; readonly side: string; readonly head: string }

/** A two-commit divergence fixture; the baseline HOLDS a src/workbench and a test/workbench-* file that the divergence MODIFIES. */
function fixture(laterEdit: boolean): Fixture {
  const cwd = makeScratch('wb-divergence-');
  const quiet = ['-c', 'user.name=t', '-c', 'user.email=t@example.invalid', '-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null'];
  const put = (path: string, text: string): void => { mkdirSync(dirname(join(cwd, path)), { recursive: true }); writeFileSync(join(cwd, path), text); };
  const commit = (message: string): string => {
    git(cwd, ['add', '-A']);
    git(cwd, [...quiet, 'commit', '-q', '-m', message]);
    return git(cwd, ['rev-parse', 'HEAD']).trim();
  };
  git(cwd, ['init', '-q']);
  put('src/a.ts', 'a1\n'); put('src/b.ts', 'b1\n'); put('test/a.test.ts', 't1\n');
  put('src/workbench/old.ts', 'w1\n'); put('test/workbench-old.test.ts', 'w1\n');
  const base = commit('baseline');
  const branch = git(cwd, ['rev-parse', '--abbrev-ref', 'HEAD']).trim();
  put('src/a.ts', 'a2\n'); put('src/workbench/old.ts', 'w2\n'); put('test/workbench-old.test.ts', 'w2\n');
  put('src/workbench/new.ts', 'n\n'); put('test/workbench-new.test.ts', 'n\n'); put('src/added.ts', 'x\n');
  const div = commit('divergence');
  git(cwd, ['checkout', '-q', '-b', 'side', base]);
  put('src/b.ts', 'bside\n');
  const side = commit('side edit (not an ancestor of HEAD)');
  git(cwd, ['checkout', '-q', branch]);
  if (laterEdit) { put('src/b.ts', 'b2\n'); commit('later edit'); }
  return { cwd, base, div, side, head: git(cwd, ['rev-parse', 'HEAD']).trim() };
}

const table = (recordedAt: string, paths: readonly string[]): string =>
  `${SECTION}\n\n| path | recorded at | note |\n| --- | --- | --- |\n${paths.map(path => `| \`${path}\` | ${recordedAt} | fixture |`).join('\n')}\n\n## Next\n`;
const unrecorded = (path: string): string => `unrecorded divergence: ${path} differs from the baseline; ${REMEDY}`;

interface Case {
  readonly id: string;
  readonly laterEdit: boolean;
  readonly doc: (fx: Fixture) => string;
  readonly expected: (fx: Fixture) => readonly string[];
}

// The fixture falsifiers. Every row is a mutant of the record the check must kill; CASES is a FROZEN table (rule 16),
// pinned below as an AC1-style literal so deleting a case or shrinking its expectation reds the census.
const CASES: readonly Case[] = [
  { id: 'exact', laterEdit: false, doc: fx => table(fx.div, ['src/a.ts']), expected: () => [] },
  { id: 'unrecorded', laterEdit: false, doc: fx => table(fx.div, []), expected: () => [unrecorded('src/a.ts')] },
  { id: 'no-section', laterEdit: false, doc: () => 'no section here', expected: () => [`missing section: docs/workbench/16 has no "${SECTION}" section; add it, then ${REMEDY}`, unrecorded('src/a.ts')] },
  { id: 'stale-misrecorded', laterEdit: false, doc: fx => table(fx.div, ['src/a.ts', 'src/b.ts', 'src/ghost.ts']), expected: () => [`stale row: src/b.ts no longer differs from the baseline; remove it from ${SECTION}`, 'misrecorded row: src/ghost.ts never existed at the baseline'] },
  { id: 'later-edit', laterEdit: true, doc: fx => table(fx.div, ['src/a.ts']), expected: () => [unrecorded('src/b.ts')] },
  { id: 'undated', laterEdit: false, doc: () => table('deadbeef', ['src/a.ts']), expected: () => ['undated row: src/a.ts recorded-at "deadbeef" is not a reachable commit'] },
  { id: 'malformed', laterEdit: false, doc: fx => `${SECTION}\n\n| path | recorded at | note |\n| --- | --- | --- |\n| src/a.ts | ${fx.div} |\n\n## Next\n`, expected: fx => [`malformed row: | src/a.ts | ${fx.div} |`, unrecorded('src/a.ts')] },
  { id: 'duplicate', laterEdit: false, doc: fx => table(fx.div, ['src/a.ts', 'src/a.ts']), expected: () => ['duplicate row: src/a.ts is recorded more than once'] },
  { id: 'dated-at-baseline', laterEdit: false, doc: fx => table(fx.base, ['src/a.ts']), expected: fx => [`mis-dated row: src/a.ts recorded-at "${fx.base}" predates the divergence (the path did not differ from the baseline there)`] },
  { id: 'dated-before-divergence', laterEdit: true, doc: fx => `${table(fx.div, ['src/a.ts', 'src/b.ts'])}`, expected: fx => [`mis-dated row: src/b.ts recorded-at "${fx.div}" predates the divergence (the path did not differ from the baseline there)`] },
  { id: 'not-ancestor', laterEdit: true, doc: fx => `${table(fx.div, ['src/a.ts'])}`.replace('\n## Next\n', `| \`src/b.ts\` | ${fx.side} | fixture |\n\n## Next\n`), expected: fx => [`mis-dated row: src/b.ts recorded-at "${fx.side}" is not an ancestor of HEAD`] },
];

describe('upstream fork divergence record (docs/workbench/16 Upstream maintainability)', () => {
  it('the repository record equals the measured divergence from the TRACEABILITY baseline', () => {
    const baseline = parseBaseline(readFileSync(join(repoRoot, 'docs/workbench/TRACEABILITY.md'), 'utf8'));
    const doc = readFileSync(join(repoRoot, 'docs/workbench/16-repository-refactor.md'), 'utf8');
    expect(checkDivergence(repoRoot, baseline, doc)).toEqual([]);
  }, 60_000);

  for (const entry of CASES) {
    it(`fixture ${entry.id}`, () => {
      const fx = fixture(entry.laterEdit);
      try { expect(checkDivergence(fx.cwd, fx.base, entry.doc(fx))).toEqual(entry.expected(fx)); } finally { removeScratch(fx.cwd); }
    });
  }

  it('the fixture falsifier table is frozen at its measured shape (id:expected-problem-count)', () => {
    const fx = fixture(false);
    try {
      expect(CASES.map(entry => `${entry.id}:${entry.expected(fx).length}`)).toEqual([
        'exact:0', 'unrecorded:1', 'no-section:2', 'stale-misrecorded:2', 'later-edit:1', 'undated:1',
        'malformed:2', 'duplicate:1', 'dated-at-baseline:1', 'dated-before-divergence:1', 'not-ancestor:1',
      ]);
    } finally { removeScratch(fx.cwd); }
  });

  it('the exclusion pathspecs are not vacuous: the baseline holds workbench-owned paths the divergence modifies', () => {
    const fx = fixture(false);
    try {
      const unfiltered = lines(git(fx.cwd, ['diff', '--name-only', '--diff-filter=M', fx.base, 'HEAD']));
      expect(unfiltered).toEqual(expect.arrayContaining(['src/workbench/old.ts', 'test/workbench-old.test.ts', 'src/a.ts']));
      expect(checkDivergence(fx.cwd, fx.base, table(fx.div, ['src/a.ts']))).toEqual([]);
    } finally { removeScratch(fx.cwd); }
  });

  it('a git that is not on PATH fails with an unknown: reason, never a pass', () => {
    const fx = fixture(false);
    try {
      expect(checkDivergence(fx.cwd, fx.base, table(fx.div, ['src/a.ts']), { pathEnv: join(fx.cwd, 'no-such-bin') })).toEqual(['unknown: git is unavailable']);
    } finally { removeScratch(fx.cwd); }
  });

  it('an unreachable baseline and a missing Baseline line fail with unknown: reasons', () => {
    const fx = fixture(false);
    try {
      const rows = table(fx.div, ['src/a.ts']);
      expect(checkDivergence(fx.cwd, 'f'.repeat(40), rows)[0]).toMatch(/^unknown: baseline f{40} is not a reachable commit/);
      expect(checkDivergence(fx.cwd, undefined, rows)[0]).toMatch(/^unknown: no 40-hex "Baseline: fork/);
    } finally { removeScratch(fx.cwd); }
  });

  it('a directory outside any repository fails as not a checkout, whatever TMPDIR is (ceiling pinned after the GIT_* strip)', () => {
    const outside = nonRepoScratch('wb-divergence-nogit-');
    try {
      const ceiling = realpathSync(dirname(outside.dir));
      expect(checkDivergence(outside.dir, 'a'.repeat(40), table('b'.repeat(7), []), { ceiling })).toEqual([`unknown: ${outside.dir} is not a git checkout`]);
    } finally { outside.dispose(); }
  });

  it('a scratch nested inside a repository is a checkout without the ceiling and not one with it (TMPDIR-inside-a-worktree)', () => {
    const fx = fixture(false);
    try {
      const nested = join(fx.cwd, 'nested-scratch');
      mkdirSync(nested);
      const rows = table(fx.div, ['src/a.ts']);
      expect(checkDivergence(nested, 'a'.repeat(40), rows)[0]).toMatch(/^unknown: baseline a{40} is not a reachable commit/);
      expect(checkDivergence(nested, 'a'.repeat(40), rows, { ceiling: realpathSync(fx.cwd) })).toEqual([`unknown: ${nested} is not a git checkout`]);
    } finally { removeScratch(fx.cwd); }
  });

  it('parses the baseline from the single TRACEABILITY carrier', () => {
    expect(parseBaseline('Baseline: fork `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` at x')).toBe('38034a043e63a65ec5a81544c7a81d0e6b76ebe3');
    expect(parseBaseline('Baseline: fork `short`')).toBeUndefined();
  });
});
