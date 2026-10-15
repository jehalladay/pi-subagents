import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';

// docs/workbench/16 "Upstream maintainability": "Record fork divergence in this documentation."
// The baseline fork sha has a single carrier: the docs/workbench/TRACEABILITY.md "Baseline:" line.

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const SECTION = '## Measured fork divergence';
const REMEDY = 'record it in docs/workbench/16 section Measured fork divergence';
const DIFF_SCOPE = ['--', 'src', ':!src/workbench', 'test', ':!test/workbench*'];

interface DivergenceRow { readonly path: string; readonly recordedAt: string }

function gitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith('GIT_')) delete env[key];
  return env;
}

function git(cwd: string, args: readonly string[]): string {
  return execFileSync('git', [...args], { cwd, env: gitEnv(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function gitOk(cwd: string, args: readonly string[]): boolean {
  try { git(cwd, args); return true; } catch { return false; }
}

function parseBaseline(traceability: string): string | undefined {
  return /^Baseline: fork `([0-9a-f]{40})`/m.exec(traceability)?.[1];
}

function parseDivergenceTable(doc: string): readonly DivergenceRow[] | undefined {
  const lines = doc.split('\n');
  const start = lines.findIndex(line => line.trim() === SECTION);
  if (start < 0) return undefined;
  const rows: DivergenceRow[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('## ')) break;
    if (!line.trim().startsWith('|')) continue;
    const cells = line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim().replace(/`/g, ''));
    if (cells.length < 3 || cells[0] === 'path' || /^-+$/.test(cells[0] ?? '')) continue;
    rows.push({ path: cells[0] ?? '', recordedAt: cells[1] ?? '' });
  }
  return rows;
}

/** Returns problems; every unavailable-environment case starts with "unknown:". Never passes silently. */
function checkDivergence(cwd: string, baseline: string | undefined, doc: string): readonly string[] {
  if (baseline === undefined) return ['unknown: no 40-hex "Baseline: fork `<sha>`" line found in docs/workbench/TRACEABILITY.md'];
  if (!gitOk(cwd, ['--version'])) return ['unknown: git is unavailable'];
  if (!gitOk(cwd, ['rev-parse', '--is-inside-work-tree'])) return [`unknown: ${cwd} is not a git checkout`];
  if (!gitOk(cwd, ['cat-file', '-e', `${baseline}^{commit}`])) return [`unknown: baseline ${baseline} is not a reachable commit (shallow clone or missing history)`];
  const rows = parseDivergenceTable(doc);
  if (rows === undefined) return [`unknown: docs/workbench/16 has no "${SECTION}" section`];
  const measured = git(cwd, ['diff', '--name-only', '--diff-filter=M', baseline, 'HEAD', ...DIFF_SCOPE]).split('\n').filter(line => line.length > 0);
  const recorded = new Set(rows.map(row => row.path));
  const problems: string[] = [];
  for (const path of measured) {
    if (!recorded.has(path)) problems.push(`unrecorded divergence: ${path} differs from the baseline; ${REMEDY}`);
  }
  for (const row of rows) {
    if (!gitOk(cwd, ['cat-file', '-e', `${baseline}:${row.path}`])) problems.push(`misrecorded row: ${row.path} never existed at the baseline`);
    else if (!measured.includes(row.path)) problems.push(`stale row: ${row.path} no longer differs from the baseline; remove it from ${SECTION}`);
    if (!gitOk(cwd, ['cat-file', '-e', `${row.recordedAt}^{commit}`])) problems.push(`undated row: ${row.path} recorded-at "${row.recordedAt}" is not a reachable commit`);
  }
  return problems;
}

describe('upstream fork divergence record (docs/workbench/16 Upstream maintainability)', () => {
  const scratch: string[] = [];
  afterEach(() => { for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true }); });

  function fixture(): { cwd: string; baseline: string; commit: (message: string) => string } {
    const cwd = mkdtempSync(join(tmpdir(), 'wb-divergence-'));
    scratch.push(cwd);
    git(cwd, ['init', '-q']);
    const put = (path: string, text: string): void => { mkdirSync(dirname(join(cwd, path)), { recursive: true }); writeFileSync(join(cwd, path), text); };
    const commit = (message: string): string => {
      git(cwd, ['add', '-A']);
      git(cwd, ['-c', 'user.name=t', '-c', 'user.email=t@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-q', '-m', message]);
      return git(cwd, ['rev-parse', 'HEAD']).trim();
    };
    put('src/a.ts', 'a1\n'); put('src/b.ts', 'b1\n'); put('test/a.test.ts', 't1\n');
    const baseline = commit('baseline');
    put('src/a.ts', 'a2\n'); put('src/workbench/new.ts', 'n\n'); put('test/workbench-new.test.ts', 'n\n'); put('src/added.ts', 'x\n');
    commit('divergence');
    return { cwd, baseline, commit };
  }
  const table = (head: string, paths: readonly string[]): string =>
    `${SECTION}\n\n| path | recorded at | note |\n| --- | --- | --- |\n${paths.map(path => `| \`${path}\` | ${head} | fixture |`).join('\n')}\n\n## Next\n`;

  it('the repository record equals the measured divergence from the TRACEABILITY baseline', () => {
    const baseline = parseBaseline(readFileSync(join(repoRoot, 'docs/workbench/TRACEABILITY.md'), 'utf8'));
    const doc = readFileSync(join(repoRoot, 'docs/workbench/16-repository-refactor.md'), 'utf8');
    expect(checkDivergence(repoRoot, baseline, doc)).toEqual([]);
  });

  it('fixture: an exact record passes, and added or workbench-owned paths are not divergence', () => {
    const { cwd, baseline } = fixture();
    const head = git(cwd, ['rev-parse', 'HEAD']).trim();
    expect(checkDivergence(cwd, baseline, table(head, ['src/a.ts']))).toEqual([]);
  });

  it('fixture falsifier: an unrecorded divergent path fails naming the path and the remedy', () => {
    const { cwd, baseline } = fixture();
    const head = git(cwd, ['rev-parse', 'HEAD']).trim();
    const problems = checkDivergence(cwd, baseline, table(head, []));
    expect(problems).toEqual([`unrecorded divergence: src/a.ts differs from the baseline; ${REMEDY}`]);
  });

  it('fixture falsifier: a stale row and a misrecorded row each fail naming the path', () => {
    const { cwd, baseline } = fixture();
    const head = git(cwd, ['rev-parse', 'HEAD']).trim();
    const problems = checkDivergence(cwd, baseline, table(head, ['src/a.ts', 'src/b.ts', 'src/ghost.ts']));
    expect(problems).toEqual([
      `stale row: src/b.ts no longer differs from the baseline; remove it from ${SECTION}`,
      'misrecorded row: src/ghost.ts never existed at the baseline',
    ]);
  });

  it('fixture falsifier: a modification made after the record turns the check red', () => {
    const { cwd, baseline, commit } = fixture();
    const head = git(cwd, ['rev-parse', 'HEAD']).trim();
    writeFileSync(join(cwd, 'src/b.ts'), 'b2\n');
    commit('later edit');
    expect(checkDivergence(cwd, baseline, table(head, ['src/a.ts']))).toEqual([
      `unrecorded divergence: src/b.ts differs from the baseline; ${REMEDY}`,
    ]);
  });

  it('fixture falsifier: a row whose recorded-at sha is not a commit fails', () => {
    const { cwd, baseline } = fixture();
    expect(checkDivergence(cwd, baseline, table('deadbeef', ['src/a.ts']))).toEqual([
      'undated row: src/a.ts recorded-at "deadbeef" is not a reachable commit',
    ]);
  });

  it('unavailable environment fails with an unknown: reason, never a pass', () => {
    const { cwd, baseline } = fixture();
    const head = git(cwd, ['rev-parse', 'HEAD']).trim();
    const empty = mkdtempSync(join(tmpdir(), 'wb-divergence-nogit-'));
    scratch.push(empty);
    const rows = table(head, ['src/a.ts']);
    expect(checkDivergence(empty, baseline, rows)[0]).toMatch(/^unknown: .* is not a git checkout$/);
    expect(checkDivergence(cwd, 'f'.repeat(40), rows)[0]).toMatch(/^unknown: baseline f{40} is not a reachable commit/);
    expect(checkDivergence(cwd, undefined, rows)[0]).toMatch(/^unknown: no 40-hex "Baseline: fork/);
    expect(checkDivergence(cwd, baseline, 'no section here')[0]).toMatch(/^unknown: docs\/workbench\/16 has no "## Measured fork divergence" section$/);
  });

  it('parses the baseline from the single TRACEABILITY carrier', () => {
    expect(parseBaseline('Baseline: fork `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` at x')).toBe('38034a043e63a65ec5a81544c7a81d0e6b76ebe3');
    expect(parseBaseline('Baseline: fork `short`')).toBeUndefined();
  });
});
