import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked, type Token, type Tokens } from 'marked';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { docsSection } from './helpers/census.js';
import { nonRepoScratch } from './helpers/non-repo-scratch.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

// docs/workbench/16 "Upstream maintainability": "Record fork divergence in this documentation."
// The baseline fork sha has a single carrier: the docs/workbench/TRACEABILITY.md "Baseline:" line.
// The record is read from the RENDERED docs, the view a reader sees. docsSection (test/helpers/census.ts, wb-u62) admits
// the section: its heading renders exactly once, under the docs/16 title, bounded by the next level-1/2 heading, and no
// HTML block or code fence inside hides a heading line. The rows are the cells of that section's top-level table tokens in
// the same marked token stream, so a row inside an HTML comment or a code block is not recorded, and HTML anywhere in the
// section is refused. An absent or refused section is an EMPTY record: every measured path is named. "unknown:" is
// reserved for states that cannot be measured at all (no baseline line, git unavailable, not a checkout, unreachable
// baseline). A recorded-at cell is a commit id (7 to 40 lowercase hex digits), never a ref name or a revision expression.

installScratchLeakGuard();

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const DOC_TITLE = '16 — Fork implementation refactor map and upstream compatibility';
const HEADING = 'Measured fork divergence';
const SECTION = `## ${HEADING}`;
const REMEDY = 'record it in docs/workbench/16 section Measured fork divergence';
const SCOPE = ['src', ':!src/workbench', 'test', ':!test/workbench*'];
const HEADER = 'path | recorded at | note';
const COMMIT_ID = /^[0-9a-f]{7,40}$/;
/** Every row below spawns git, and a loaded gate host has measured single rows past 60 s: no row runs on vitest's 5 s default. */
const GIT_ROW_MS = 120_000;
/** The two fixture repositories are built once per file and shared read-only by every row. */
const FIXTURE_HOOK_MS = 180_000;

interface RecordRow { readonly path: string; readonly recordedAt: string }
interface RecordRead { readonly rows: readonly RecordRow[]; readonly problems: readonly string[] }
interface GitOptions {
  /** GIT_CEILING_DIRECTORIES for the child, set AFTER the GIT_* strip (a "not a repository" fixture pins its parent). */
  readonly ceiling?: string;
  /** Replaces PATH for the child, so a shadowed PATH proves the git-unavailable branch. */
  readonly pathEnv?: string;
  /** Standard input for the child (the fixture's fast-import stream). */
  readonly input?: string;
}

function gitEnv(options: GitOptions): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith('GIT_')) delete env[key];
  if (options.ceiling !== undefined) env.GIT_CEILING_DIRECTORIES = options.ceiling;
  if (options.pathEnv !== undefined) env.PATH = options.pathEnv;
  return env;
}

function git(cwd: string, args: readonly string[], options: GitOptions = {}): string {
  return execFileSync('git', [...args], {
    cwd,
    env: gitEnv(options),
    encoding: 'utf8',
    input: options.input,
    stdio: [options.input === undefined ? 'ignore' : 'pipe', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
}

function gitOk(cwd: string, args: readonly string[], options: GitOptions = {}): boolean {
  try { git(cwd, args, options); return true; } catch { return false; }
}

/** True when the spawn itself failed for want of a git binary (ENOENT), as against git exiting nonzero. */
function gitMissing(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}

function lines(text: string): readonly string[] {
  return text.split('\n').filter(line => line.length > 0);
}

function parseBaseline(traceability: string): string | undefined {
  return /^Baseline: fork `([0-9a-f]{40})`/m.exec(traceability)?.[1];
}

// ---- the rendered view: the census helper's rendering rule, applied to the table cells docsSection does not split ----

const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === 'string' ? value : '';
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === 'heading';
const isTable = (token: Token): token is Tokens.Table => token.type === 'table';
const clean = (text: string): string => text.replace(/\s+/g, ' ').trim();
const ENTITIES: Readonly<Record<string, string>> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ' };
const decode = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, entity => ENTITIES[entity] ?? entity);

/** What a reader sees of inline tokens: markup renders its text, HTML (comments included) renders none. */
function inline(tokens: readonly Token[]): string {
  let out = '';
  for (const token of tokens) {
    if (token.type === 'html') continue;
    if (token.type === 'br') out += '\n';
    else if (token.type === 'codespan' || token.type === 'escape') out += decode(textOf(token));
    else if (childrenOf(token).length > 0) out += inline(childrenOf(token));
    else out += decode(textOf(token));
  }
  return out;
}

const cellText = (cell: Tokens.TableCell): string => clean(inline(cell.tokens));

/** The record section's top-level tokens, bounded as docsSection bounds it: from the heading to the next level-1/2 heading or EOF. */
function sectionTokens(doc: string): readonly Token[] {
  const tokens = marked.lexer(doc);
  const start = tokens.findIndex(token => isHeading(token) && token.depth === 2 && clean(inline(childrenOf(token))) === HEADING);
  if (start < 0) throw new Error(`docsSection admitted "${SECTION}" but the token stream holds no top-level heading for it`);
  const out: Token[] = [];
  for (const token of tokens.slice(start + 1)) {
    if (isHeading(token) && token.depth <= 2) break;
    out.push(token);
  }
  return out;
}

/** The record as the rendered docs show it, plus every problem with its shape. A refused section reads as an empty record. */
function readRecord(doc: string): RecordRead {
  const section = docsSection(doc, HEADING, 2, [DOC_TITLE]);
  if (!section.ok) return { rows: [], problems: [`missing section: docs/workbench/16 has no readable "${SECTION}" section (${section.why}); add it, then ${REMEDY}`] };
  const problems: string[] = [];
  if (section.hasHtml) problems.push(`html in section: "${SECTION}" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it`);
  const tables = sectionTokens(doc).filter(isTable);
  if (tables.length > 1) problems.push(`malformed table: "${SECTION}" renders ${tables.length} tables; the record is exactly one`);
  const rows: RecordRow[] = [];
  for (const table of tables) {
    const header = table.header.map(cellText).join(' | ');
    if (header !== HEADER) problems.push(`malformed table: the header renders | ${header} |; the record's header is | ${HEADER} |`);
    for (const cells of table.rows.map(cellsOfRow => cellsOfRow.map(cellText))) {
      const [path = '', recordedAt = ''] = cells;
      if (cells.some(cell => cell === '')) problems.push(`malformed row: | ${cells.map(cell => cell || '(empty)').join(' | ')} | (every row needs a path, a recorded-at commit id and a note)`);
      else rows.push({ path, recordedAt });
    }
  }
  return { rows, problems };
}

type Dating =
  | { readonly kind: 'not-an-id' }
  | { readonly kind: 'unreachable' }
  | { readonly kind: 'ref'; readonly sha: string }
  | { readonly kind: 'commit'; readonly ancestor: boolean; readonly modified: ReadonlySet<string> };

/** Returns problems; every unavailable-environment case starts with "unknown:". Never passes silently. */
function checkDivergence(cwd: string, baseline: string | undefined, doc: string, options: GitOptions = {}): readonly string[] {
  if (baseline === undefined) return ['unknown: no 40-hex "Baseline: fork `<sha>`" line found in docs/workbench/TRACEABILITY.md'];
  let inside: string;
  try {
    inside = git(cwd, ['rev-parse', '--is-inside-work-tree'], options).trim();
  } catch (error) {
    return [gitMissing(error) ? 'unknown: git is unavailable' : `unknown: ${cwd} is not a git checkout`];
  }
  if (inside !== 'true') return [`unknown: ${cwd} is not a git checkout`];
  if (!gitOk(cwd, ['cat-file', '-e', `${baseline}^{commit}`], options)) return [`unknown: baseline ${baseline} is not a reachable commit (shallow clone or missing history)`];
  const record = readRecord(doc);
  const problems: string[] = [...record.problems];
  const seen = new Set<string>();
  const rows: RecordRow[] = [];
  for (const row of record.rows) {
    if (seen.has(row.path)) problems.push(`duplicate row: ${row.path} is recorded more than once`);
    else { seen.add(row.path); rows.push(row); }
  }
  const measured = lines(git(cwd, ['diff', '--name-only', '--diff-filter=M', baseline, 'HEAD', '--', ...SCOPE], options));
  for (const path of measured) {
    if (!seen.has(path)) problems.push(`unrecorded divergence: ${path} differs from the baseline; ${REMEDY}`);
  }
  const live = new Set(measured);
  const atBaseline = new Set(lines(git(cwd, ['ls-tree', '-r', '--name-only', baseline], options)));
  const dates = new Map<string, Dating>();
  const dating = (recordedAt: string): Dating => {
    const known = dates.get(recordedAt);
    if (known !== undefined) return known;
    let found: Dating;
    if (!COMMIT_ID.test(recordedAt)) found = { kind: 'not-an-id' };
    else {
      let sha = '';
      try { sha = git(cwd, ['rev-parse', '--verify', '--quiet', `${recordedAt}^{commit}`], options).trim(); } catch { sha = ''; }
      if (sha === '') found = { kind: 'unreachable' };
      else if (!sha.startsWith(recordedAt)) found = { kind: 'ref', sha };
      else found = { kind: 'commit', ancestor: gitOk(cwd, ['merge-base', '--is-ancestor', sha, 'HEAD'], options), modified: new Set(lines(git(cwd, ['diff', '--name-only', '--diff-filter=M', baseline, sha, '--', ...SCOPE], options))) };
    }
    dates.set(recordedAt, found);
    return found;
  };
  for (const row of rows) {
    if (!atBaseline.has(row.path)) problems.push(`misrecorded row: ${row.path} never existed at the baseline`);
    else if (!live.has(row.path)) problems.push(`stale row: ${row.path} no longer differs from the baseline; remove it from ${SECTION}`);
    const dated = dating(row.recordedAt);
    if (dated.kind === 'not-an-id') problems.push(`undated row: ${row.path} recorded-at "${row.recordedAt}" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch`);
    else if (dated.kind === 'unreachable') problems.push(`undated row: ${row.path} recorded-at "${row.recordedAt}" is not a reachable commit`);
    else if (dated.kind === 'ref') problems.push(`undated row: ${row.path} recorded-at "${row.recordedAt}" resolves to commit ${dated.sha}, so it names a ref, not a commit id`);
    else if (live.has(row.path)) {
      if (!dated.ancestor) problems.push(`mis-dated row: ${row.path} recorded-at "${row.recordedAt}" is not an ancestor of HEAD`);
      else if (!dated.modified.has(row.path)) problems.push(`mis-dated row: ${row.path} recorded-at "${row.recordedAt}" predates the divergence (the path did not differ from the baseline there)`);
    }
  }
  return problems;
}

// ---- the fixture repositories ----

interface Fixture { readonly cwd: string; readonly base: string; readonly div: string; readonly side: string; readonly head: string }
type FixtureKind = 'plain' | 'later';

/** A ref whose NAME is commit-id shaped; every fixture points it at HEAD, whose id does not start with it. */
const HEX_REF = '0000000';

/** fast-import's data command: the byte count, then the bytes. */
const data = (text: string): string => `data ${Buffer.byteLength(text)}\n${text}`;

/** One fast-import commit with a fixed committer and date, so the history is identical on every run; files are written inline. */
function commitCommand(ref: string, mark: number, message: string, files: Readonly<Record<string, string>>, from?: number): string {
  return [
    `commit ${ref}`,
    `mark :${mark}`,
    `committer t <t@example.invalid> ${1_700_000_000 + mark} +0000`,
    data(message),
    ...(from === undefined ? [] : [`from :${from}`]),
    ...Object.entries(files).map(([path, text]) => `M 100644 inline ${path}\n${data(text)}`),
    '',
  ].join('\n');
}

/**
 * The divergence fixture in three git spawns (init, fast-import, rev-parse): a baseline that HOLDS a src/workbench and a
 * test/workbench-* file, a divergence commit that MODIFIES them and src/a.ts and adds new files, a side commit off the
 * baseline (never an ancestor of HEAD) and, for laterEdit, a later edit of src/b.ts on top. The work tree stays empty: the
 * census reads commits only.
 */
function fixture(laterEdit: boolean): Fixture {
  const cwd = makeScratch('wb-divergence-');
  try {
    git(cwd, ['init', '-q', '-b', 'main', '--object-format=sha1']);
    const stream = [
      commitCommand('refs/heads/main', 1, 'baseline', { 'src/a.ts': 'a1\n', 'src/b.ts': 'b1\n', 'test/a.test.ts': 't1\n', 'src/workbench/old.ts': 'w1\n', 'test/workbench-old.test.ts': 'w1\n' }),
      commitCommand('refs/heads/main', 2, 'divergence', { 'src/a.ts': 'a2\n', 'src/workbench/old.ts': 'w2\n', 'test/workbench-old.test.ts': 'w2\n', 'src/workbench/new.ts': 'n\n', 'test/workbench-new.test.ts': 'n\n', 'src/added.ts': 'x\n' }),
      commitCommand('refs/heads/side', 3, 'side edit (not an ancestor of HEAD)', { 'src/b.ts': 'bside\n' }, 1),
      ...(laterEdit ? [commitCommand('refs/heads/main', 4, 'later edit', { 'src/b.ts': 'b2\n' })] : []),
      `reset refs/heads/${HEX_REF}`,
      'from refs/heads/main',
      '',
    ].join('\n');
    git(cwd, ['fast-import', '--quiet'], { input: stream });
    const [base = '', div = '', side = '', head = ''] = lines(git(cwd, ['rev-parse', laterEdit ? 'main~2' : 'main~1', laterEdit ? 'main~1' : 'main', 'side', 'HEAD']));
    return { cwd, base, div, side, head };
  } catch (error) {
    removeScratch(cwd);
    throw error;
  }
}

// ---- the fixture docs: docs/16-shaped pages, written against the rendered view ----

const HEADER_LINES = `| ${HEADER} |\n| --- | --- | --- |`;
const row = (path: string, recordedAt: string): string => `| \`${path}\` | ${recordedAt} | fixture |`;
/** The record section: its heading, prose, the table, then whatever else the section holds. */
const record = (rows: readonly string[], after = ''): string => `${SECTION}\n\nThe measured record.\n\n${[HEADER_LINES, ...rows].join('\n')}${after}`;
/** A docs/16-shaped page around a body: the title, the section before the record and the section after it. */
const page = (body: string): string => `# ${DOC_TITLE}\n\n## Upstream maintainability\n\nRecord fork divergence in this documentation.\n\n${body}\n\n## Migration acceptance\n\nAfter the record.\n`;
const table = (recordedAt: string, paths: readonly string[]): string => page(record(paths.map(path => row(path, recordedAt))));
/** The exact record of the later fixture: src/a.ts diverged at div, src/b.ts at the later edit (HEAD). */
const exactLater = (fx: Fixture): readonly string[] => [row('src/a.ts', fx.div), row('src/b.ts', fx.head)];

const unrecorded = (path: string): string => `unrecorded divergence: ${path} differs from the baseline; ${REMEDY}`;
const missing = (why: string): string => `missing section: docs/workbench/16 has no readable "${SECTION}" section (${why}); add it, then ${REMEDY}`;
const htmlInSection = `html in section: "${SECTION}" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it`;
const notAnId = (path: string, value: string): string => `undated row: ${path} recorded-at "${value}" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch`;

interface Case {
  readonly id: string;
  readonly fixture: FixtureKind;
  readonly doc: (fx: Fixture) => string;
  readonly expected: (fx: Fixture) => readonly string[];
}

// The fixture falsifiers. Every row is a mutant of the record the check must kill; CASES is a FROZEN table (rule 16),
// pinned below as an AC1-style literal of each row's id, fixture and EVERY expected problem, so deleting a row,
// shortening an expectation or swapping a row for an unrelated passing case reds the census.
const CASES: readonly Case[] = [
  { id: 'exact', fixture: 'plain', doc: fx => table(fx.div, ['src/a.ts']), expected: () => [] },
  { id: 'exact-later', fixture: 'later', doc: fx => page(record(exactLater(fx))), expected: () => [] },
  { id: 'unrecorded', fixture: 'plain', doc: fx => table(fx.div, []), expected: () => [unrecorded('src/a.ts')] },
  { id: 'no-section', fixture: 'plain', doc: () => page('No record here.'), expected: () => [missing(`the rendered view has no level-2 heading "${HEADING}"`), unrecorded('src/a.ts')] },
  { id: 'stale-misrecorded', fixture: 'plain', doc: fx => table(fx.div, ['src/a.ts', 'src/b.ts', 'src/ghost.ts']), expected: () => [`stale row: src/b.ts no longer differs from the baseline; remove it from ${SECTION}`, 'misrecorded row: src/ghost.ts never existed at the baseline'] },
  { id: 'later-edit', fixture: 'later', doc: fx => table(fx.div, ['src/a.ts']), expected: () => [unrecorded('src/b.ts')] },
  { id: 'undated', fixture: 'plain', doc: () => table('deadbeef', ['src/a.ts']), expected: () => ['undated row: src/a.ts recorded-at "deadbeef" is not a reachable commit'] },
  { id: 'malformed', fixture: 'plain', doc: fx => page(record([`| \`src/a.ts\` | ${fx.div} |`])), expected: fx => [`malformed row: | src/a.ts | ${fx.div} | (empty) | (every row needs a path, a recorded-at commit id and a note)`, unrecorded('src/a.ts')] },
  { id: 'duplicate', fixture: 'plain', doc: fx => table(fx.div, ['src/a.ts', 'src/a.ts']), expected: () => ['duplicate row: src/a.ts is recorded more than once'] },
  { id: 'dated-at-baseline', fixture: 'plain', doc: fx => table(fx.base, ['src/a.ts']), expected: fx => [`mis-dated row: src/a.ts recorded-at "${fx.base}" predates the divergence (the path did not differ from the baseline there)`] },
  { id: 'dated-before-divergence', fixture: 'later', doc: fx => table(fx.div, ['src/a.ts', 'src/b.ts']), expected: fx => [`mis-dated row: src/b.ts recorded-at "${fx.div}" predates the divergence (the path did not differ from the baseline there)`] },
  { id: 'not-ancestor', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div), row('src/b.ts', fx.side)])), expected: fx => [`mis-dated row: src/b.ts recorded-at "${fx.side}" is not an ancestor of HEAD`] },
  // D1/D1b: rows moved into a multi-line HTML comment inside the section render nothing, so they are not recorded.
  { id: 'html-comment-row', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div)], `\n\n<!--\n${row('src/b.ts', fx.head)}\n-->`)), expected: () => [htmlInSection, unrecorded('src/b.ts')] },
  { id: 'html-comment-all-rows', fixture: 'later', doc: fx => page(record([], `\n\n<!--\n${exactLater(fx).join('\n')}\n-->`)), expected: () => [htmlInSection, unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D2: a second rendered heading (a one-row copy at EOF) refuses the section, whichever copy holds the record.
  { id: 'duplicate-heading', fixture: 'later', doc: fx => `${page(record(exactLater(fx)))}\n${record([row('src/a.ts', fx.div)])}\n`, expected: () => [missing(`the heading "${HEADING}" occurs 2 times in the rendered view; a pinned section needs it exactly once`), unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D3: a heading and full table hidden in an HTML comment BEFORE the real heading render nothing; the real table is empty.
  { id: 'hidden-heading-before', fixture: 'later', doc: fx => page(`<!--\n${record(exactLater(fx))}\n-->\n\n${record([])}`), expected: () => [unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D4: a level-1 heading between the prose and the table ends the section, so the table below it is not the record.
  { id: 'level-1-split', fixture: 'later', doc: fx => page(`${SECTION}\n\nThe measured record.\n\n# Interlude\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}`), expected: () => [unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D4b: a level-1 heading above the record re-homes it out from under the docs/16 title.
  { id: 'rehomed-heading', fixture: 'later', doc: fx => page(`# Interlude\n\n${record(exactLater(fx))}`), expected: () => [missing(`the heading "${HEADING}" sits under the parent heading path ["Interlude"]; the census binds it under ["${DOC_TITLE}"]`), unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D5: a row moved into a fenced code block renders as code, not as a table row.
  { id: 'fenced-row', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div)], `\n\n\`\`\`\n${row('src/b.ts', fx.head)}\n\`\`\``)), expected: () => [unrecorded('src/b.ts')] },
  // D6/D6b/D6c: a moving ref is always an ancestor of HEAD that already differs, so it dates nothing.
  { id: 'head-dated', fixture: 'plain', doc: () => table('HEAD', ['src/a.ts']), expected: () => [notAnId('src/a.ts', 'HEAD')] },
  { id: 'all-head-dated', fixture: 'later', doc: () => table('HEAD', ['src/a.ts', 'src/b.ts']), expected: () => [notAnId('src/a.ts', 'HEAD'), notAnId('src/b.ts', 'HEAD')] },
  { id: 'branch-dated', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div), row('src/b.ts', 'main')])), expected: () => [notAnId('src/b.ts', 'main')] },
  // D6d: a ref whose name is commit-id shaped is still a ref: its target's id does not start with the name.
  { id: 'hex-ref-dated', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div), row('src/b.ts', HEX_REF)])), expected: fx => [`undated row: src/b.ts recorded-at "${HEX_REF}" resolves to commit ${fx.head}, so it names a ref, not a commit id`] },
  { id: 'header-renamed', fixture: 'plain', doc: fx => page(`${SECTION}\n\nThe measured record.\n\n| path | recorded | note |\n| --- | --- | --- |\n${row('src/a.ts', fx.div)}`), expected: () => [`malformed table: the header renders | path | recorded | note |; the record's header is | ${HEADER} |`] },
  { id: 'two-tables', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div)], `\n\nA second table.\n\n${HEADER_LINES}\n${row('src/b.ts', fx.head)}`)), expected: () => [`malformed table: "${SECTION}" renders 2 tables; the record is exactly one`] },
];

/** The frozen shape of CASES at this cut: id | fixture | every expected problem, fixture shas named <base> <div> <side> <head>. */
const FROZEN_SHAPE: readonly string[] = [
  'exact | plain | no problem',
  'exact-later | later | no problem',
  'unrecorded | plain | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'no-section | plain | missing section: docs/workbench/16 has no readable "## Measured fork divergence" section (the rendered view has no level-2 heading "Measured fork divergence"); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'stale-misrecorded | plain | stale row: src/b.ts no longer differs from the baseline; remove it from ## Measured fork divergence / misrecorded row: src/ghost.ts never existed at the baseline',
  'later-edit | later | unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'undated | plain | undated row: src/a.ts recorded-at "deadbeef" is not a reachable commit',
  'malformed | plain | malformed row: | src/a.ts | <div> | (empty) | (every row needs a path, a recorded-at commit id and a note) / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'duplicate | plain | duplicate row: src/a.ts is recorded more than once',
  'dated-at-baseline | plain | mis-dated row: src/a.ts recorded-at "<base>" predates the divergence (the path did not differ from the baseline there)',
  'dated-before-divergence | later | mis-dated row: src/b.ts recorded-at "<div>" predates the divergence (the path did not differ from the baseline there)',
  'not-ancestor | later | mis-dated row: src/b.ts recorded-at "<side>" is not an ancestor of HEAD',
  'html-comment-row | later | html in section: "## Measured fork divergence" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'html-comment-all-rows | later | html in section: "## Measured fork divergence" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'duplicate-heading | later | missing section: docs/workbench/16 has no readable "## Measured fork divergence" section (the heading "Measured fork divergence" occurs 2 times in the rendered view; a pinned section needs it exactly once); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'hidden-heading-before | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'level-1-split | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'rehomed-heading | later | missing section: docs/workbench/16 has no readable "## Measured fork divergence" section (the heading "Measured fork divergence" sits under the parent heading path ["Interlude"]; the census binds it under ["16 — Fork implementation refactor map and upstream compatibility"]); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'fenced-row | later | unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence',
  'head-dated | plain | undated row: src/a.ts recorded-at "HEAD" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch',
  'all-head-dated | later | undated row: src/a.ts recorded-at "HEAD" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch / undated row: src/b.ts recorded-at "HEAD" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch',
  'branch-dated | later | undated row: src/b.ts recorded-at "main" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch',
  'hex-ref-dated | later | undated row: src/b.ts recorded-at "0000000" resolves to commit <head>, so it names a ref, not a commit id',
  'header-renamed | plain | malformed table: the header renders | path | recorded | note |; the record\'s header is | path | recorded at | note |',
  'two-tables | later | malformed table: "## Measured fork divergence" renders 2 tables; the record is exactly one',
];

describe('upstream fork divergence record (docs/workbench/16 Upstream maintainability)', () => {
  const built = new Map<FixtureKind, Fixture>();
  const fixtureOf = (kind: FixtureKind): Fixture => {
    const fx = built.get(kind);
    if (fx === undefined) throw new Error(`the ${kind} fixture was not built (its beforeAll failed)`);
    return fx;
  };
  beforeAll(() => {
    built.set('plain', fixture(false));
    built.set('later', fixture(true));
  }, FIXTURE_HOOK_MS);
  afterAll(() => {
    for (const fx of built.values()) removeScratch(fx.cwd);
  });

  it('the repository record equals the measured divergence from the TRACEABILITY baseline', () => {
    const baseline = parseBaseline(readFileSync(join(repoRoot, 'docs/workbench/TRACEABILITY.md'), 'utf8'));
    const doc = readFileSync(join(repoRoot, 'docs/workbench/16-repository-refactor.md'), 'utf8');
    expect(checkDivergence(repoRoot, baseline, doc)).toEqual([]);
  }, GIT_ROW_MS);

  for (const entry of CASES) {
    it(`fixture ${entry.id}`, () => {
      const fx = fixtureOf(entry.fixture);
      expect(checkDivergence(fx.cwd, fx.base, entry.doc(fx))).toEqual(entry.expected(fx));
    }, GIT_ROW_MS);
  }

  it('the fixture falsifier table is frozen at its measured shape (id | fixture | every expected problem)', () => {
    const shape = CASES.map(entry => {
      const fx = fixtureOf(entry.fixture);
      const names: readonly (readonly [string, string])[] = [[fx.base, '<base>'], [fx.div, '<div>'], [fx.side, '<side>'], [fx.head, '<head>']];
      const normalize = (text: string): string => names.reduce((out, [sha, name]) => out.split(sha).join(name), text);
      return `${entry.id} | ${entry.fixture} | ${entry.expected(fx).map(normalize).join(' / ') || 'no problem'}`;
    });
    expect(shape).toEqual(FROZEN_SHAPE);
  });

  it('the exclusion pathspecs are not vacuous: the baseline holds workbench-owned paths the divergence modifies', () => {
    const fx = fixtureOf('plain');
    const unfiltered = lines(git(fx.cwd, ['diff', '--name-only', '--diff-filter=M', fx.base, 'HEAD']));
    expect(unfiltered).toEqual(expect.arrayContaining(['src/workbench/old.ts', 'test/workbench-old.test.ts', 'src/a.ts']));
    expect(checkDivergence(fx.cwd, fx.base, table(fx.div, ['src/a.ts']))).toEqual([]);
  }, GIT_ROW_MS);

  it('a git that is not on PATH fails with an unknown: reason, never a pass', () => {
    const fx = fixtureOf('plain');
    expect(checkDivergence(fx.cwd, fx.base, table(fx.div, ['src/a.ts']), { pathEnv: join(fx.cwd, 'no-such-bin') })).toEqual(['unknown: git is unavailable']);
  }, GIT_ROW_MS);

  it('an unreachable baseline and a missing Baseline line fail with unknown: reasons', () => {
    const fx = fixtureOf('plain');
    const rows = table(fx.div, ['src/a.ts']);
    expect(checkDivergence(fx.cwd, 'f'.repeat(40), rows)[0]).toMatch(/^unknown: baseline f{40} is not a reachable commit/);
    expect(checkDivergence(fx.cwd, undefined, rows)[0]).toMatch(/^unknown: no 40-hex "Baseline: fork/);
  }, GIT_ROW_MS);

  it('a directory outside any repository fails as not a checkout, whatever TMPDIR is (ceiling pinned after the GIT_* strip)', () => {
    const outside = nonRepoScratch('wb-divergence-nogit-');
    try {
      const ceiling = realpathSync(dirname(outside.dir));
      expect(checkDivergence(outside.dir, 'a'.repeat(40), table('b'.repeat(7), []), { ceiling })).toEqual([`unknown: ${outside.dir} is not a git checkout`]);
    } finally { outside.dispose(); }
  }, GIT_ROW_MS);

  it('a scratch nested inside a repository is a checkout without the ceiling and not one with it (TMPDIR-inside-a-worktree)', () => {
    const fx = fixtureOf('plain');
    const nested = join(fx.cwd, 'nested-scratch');
    mkdirSync(nested, { recursive: true });
    const rows = table(fx.div, ['src/a.ts']);
    expect(checkDivergence(nested, 'a'.repeat(40), rows)[0]).toMatch(/^unknown: baseline a{40} is not a reachable commit/);
    expect(checkDivergence(nested, 'a'.repeat(40), rows, { ceiling: realpathSync(fx.cwd) })).toEqual([`unknown: ${nested} is not a git checkout`]);
  }, GIT_ROW_MS);

  it('a git directory itself is not a checkout (rev-parse answers false there, it does not fail)', () => {
    const fx = fixtureOf('plain');
    const gitDir = join(fx.cwd, '.git');
    expect(checkDivergence(gitDir, fx.base, table(fx.div, ['src/a.ts']))).toEqual([`unknown: ${gitDir} is not a git checkout`]);
  }, GIT_ROW_MS);

  it('parses the baseline from the single TRACEABILITY carrier', () => {
    expect(parseBaseline('Baseline: fork `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` at x')).toBe('38034a043e63a65ec5a81544c7a81d0e6b76ebe3');
    expect(parseBaseline('Baseline: fork `short`')).toBeUndefined();
  });
});

