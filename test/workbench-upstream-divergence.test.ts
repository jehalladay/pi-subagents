import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked, type Token, type Tokens } from 'marked';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { docsSection, sectionMatches } from './helpers/census.js';
import { nonRepoScratch } from './helpers/non-repo-scratch.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

// docs/workbench/16 "Upstream maintainability": "Record fork divergence in this documentation."
// The baseline fork sha has a single carrier: the docs/workbench/TRACEABILITY.md "Baseline:" line.
// PINNED ENUMERATION (R606, rule 19(c)): this census pins only these modes:
// P1 HEAD-only divergence set equality: missing, stale, misrecorded and workbench-excluded paths (repo row; fixture
// unrecorded, stale-misrecorded, later-edit and the non-vacuous exclusion test). It does not read uncommitted edits.
// P2 rendered docs/16 record: unique heading and parent, top-level level-1/2 section bound, same-view table extraction,
// HTML/fence refusal, header, malformed/duplicate rows (fixtures no-section, html-comment*, duplicate-heading,
// hidden-heading-before, level-1/2-split, shallower-copy-before, rehomed-heading, fenced-row, header-renamed,
// two-tables; G01/G02 are killed on the paired D22/D23 pages).
// P3 commit-id dating: 7-40 lowercase hex, reachable immutable commit, ancestor and already-diverged path
// (fixtures undated, six-hex-dated, dated-at-baseline/before-divergence, not-ancestor and moving-ref rows).
// P4 fail-closed environment and scratch: no git, no checkout, unreachable baseline, TMPDIR-inside-repo and
// missing Baseline line all fail explicitly, with test/helpers/non-repo-scratch.ts and scratch.ts owning fixtures.
// P5 frozen falsifier shape: each fixture's id, tier, every expected problem and normalized input digest are
// literal-pinned (35 rows). G04-G12, H01-H04 and H05-H08 form the measured mutant battery.
// P6 out-of-file anchor (wb-zq7i, cax.28 F1/F2, the 5jha roster pattern): test/fixtures/upstream-divergence-roster.json
// holds every judged row of CASES and SETEXT_CASES (table, id, fixture, registered test name, every normalized expected
// problem, normalized input digest), the residual families that have pinned quiet rows (R3, R5, R7, R8) and the drt
// fixture's name-status and modified sets. The roster judges the in-file tables as read now, the tests this file
// registers (vitest's task tree, not the loops' literals) and the drt measurement, in order and both ways, so a row or a
// status removed from every literal of this file still reds (CT5/CT6, HD5, EL1/EL2). Not claimed: an edit of this file
// and the roster together, an edit of the wb-zq7i cases themselves, or a registered row skipped by a marker.
// P6a run modes (wb-2wf8, R682 F1): the roster case's walk also reads every registered test's run mode, fails flag and
// result state. Each roster row's fixture test must read 'run | ran' (run mode, not inverted, ended passed or failed:
// the shared census helper's ran reading); every other test of this file must be in run mode and not inverted, and must
// have run when it is registered before the roster case. So a test kept from running by a skip, skipIf or runIf
// modifier, an options-object skip or todo, a skipping suite or a todo registration, a test inverted by the fails
// modifier, and a test registered before the roster case and skipped at runtime through its test context each red the
// roster case: for those forms P6's last non-claim is withdrawn. A failed or timed-out test stays its own red (no
// cascade into the roster case); a name filter that runs the roster case without the others reds it. Not claimed: a
// runtime skip in a test registered after the roster case, or a skip of the roster case itself (it is the judge).
// P7 shared-bound visibility (cax.28 F3): on every roster R8 page the shared docsSection's own section admits the nested
// container and the record table, so a helper that bounded at a nested heading (R8C) reds here, not only in sameView.
// NAMED RESIDUALS (quiet readings, not pass claims):
// R1 a table nested in a blockquote/list is not a top-level record (the D28 page reads unrecorded).
// R2 a once-unambiguous short commit id may become ambiguous with new history (unreachable: fail-closed).
// R3 a struck-through path renders as text and is still recorded (fixture residual-struck-path and D25).
// R4 note-cell prose is non-empty but its +N/-M counts are not verified by the census.
// R5 deletions, renames and type changes of upstream paths are excluded by --diff-filter=M (fixture residual-drt-paths
// on the drt fixture, whose divergence deletes, renames and type-changes in-scope baseline paths; the paired
// over-refusal mutant G14 that also counts D/R/T reds it, and the drt non-vacuity test pins the three statuses).
// R6 missing cwd and git unavailable can share the unknown: category (both refuse; cause may be coarse).
// R7 uncommitted working-tree edits are not read: the measurement is baseline..HEAD
// (fixture residual-head-only; gate pin-flip P4 demonstrates the working-tree-only reversion reads quiet).
// R8 a level-1/2 heading nested in a list item or blockquote does not bound the record section: only a top-level
// heading does (the shared docsSection bound), so the table after it is still the record (gate pages D32/D38; fixtures
// residual-list-nested-h2, residual-quote-nested-h2, residual-list-nested-h1 and residual-quote-nested-h1).
// R8 setext members (wb-zq7i, cax.28 F4): a setext heading ('Interlude' over '---' or '===') nested in a list item or a
// blockquote reads the same; SETEXT_CASES pins residual-list-setext-h2, residual-quote-setext-h2, residual-list-setext-h1
// and residual-quote-setext-h1 as quiet rows (gate mutant S1bare, a census bounding at a nested setext heading, reds
// them), frozen in SETEXT_FROZEN_SHAPE (4 rows), so the registered fixture rows number 35 + 4.
// Newly discovered escapes add a residual row, unless they contradict a pinned claim; no blanket claim about
// all Markdown shapes, all git revisions or all upstream changes is made by this local enumeration.

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
/** The three fixture repositories are built once per file and shared read-only by every row. */
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

/** Verify the second extraction reads the exact blocks the shared docsSection admitted. A changed start or heading
 * bound cannot smuggle a table from another section into the record (G01/G02). */
function sameView(section: ReturnType<typeof docsSection>, tokens: readonly Token[]): boolean {
  if (tokens.some(token => isHeading(token) && token.depth <= 2)) return false;
  const source = `# ${DOC_TITLE}\n\n${SECTION}\n\n${tokens.map(token => token.raw).join('')}\n`;
  const extracted = docsSection(source, HEADING, 2, [DOC_TITLE]);
  return extracted.ok && sectionMatches(section, extracted.blocks).ok;
}

/** The record as the rendered docs show it, plus every problem with its shape. A refused section reads as an empty record. */
function readRecord(doc: string): RecordRead {
  const section = docsSection(doc, HEADING, 2, [DOC_TITLE]);
  if (!section.ok) return { rows: [], problems: [`missing section: docs/workbench/16 has no readable "${SECTION}" section (${section.why}); add it, then ${REMEDY}`] };
  const problems: string[] = [];
  if (section.hasHtml) problems.push(`html in section: "${SECTION}" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it`);
  const tokens = sectionTokens(doc);
  if (!section.hasHtml && !sameView(section, tokens)) return { rows: [], problems: [...problems, `mismatched section view: the table extraction does not match the rendered blocks admitted by docsSection for ${SECTION}`] };
  const tables = tokens.filter(isTable);
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
type FixtureKind = 'plain' | 'later' | 'drt';

/** A ref whose NAME is commit-id shaped; every fixture points it at HEAD, whose id does not start with it. */
const HEX_REF = '0000000';

/** fast-import's data command: the byte count, then the bytes. */
const data = (text: string): string => `data ${Buffer.byteLength(text)}\n${text}`;

/** One fast-import commit with a fixed committer and date, so the history is identical on every run; files are written inline,
 * then any raw file commands (a deletion, a rename, a symlink) apply in order. */
function commitCommand(ref: string, mark: number, message: string, files: Readonly<Record<string, string>>, from?: number, changes: readonly string[] = []): string {
  return [
    `commit ${ref}`,
    `mark :${mark}`,
    `committer t <t@example.invalid> ${1_700_000_000 + mark} +0000`,
    data(message),
    ...(from === undefined ? [] : [`from :${from}`]),
    ...Object.entries(files).map(([path, text]) => `M 100644 inline ${path}\n${data(text)}`),
    ...changes,
    '',
  ].join('\n');
}

/** The drt fixture's extra baseline paths, each in scope: its divergence deletes, renames or type-changes every one (R5). */
const DRT_BASELINE: Readonly<Record<string, string>> = { 'src/gone.ts': 'g1\n', 'src/moved.ts': 'm1\n', 'src/link.ts': 'l1\n' };
/** The drt divergence's raw file commands: a deletion (D), an exact rename (R100) and a file-to-symlink type change (T). */
const DRT_CHANGES: readonly string[] = ['D src/gone.ts', 'R src/moved.ts src/renamed.ts', `M 120000 inline src/link.ts\n${data('a.ts')}`];

/**
 * The divergence fixture in three git spawns (init, fast-import, rev-parse): a baseline that HOLDS a src/workbench and a
 * test/workbench-* file, a divergence commit that MODIFIES them and src/a.ts and adds new files, a side commit off the
 * baseline (never an ancestor of HEAD) and, for later, a later edit of src/b.ts on top; drt adds DRT_BASELINE to the
 * baseline and DRT_CHANGES to the divergence, so three in-scope upstream paths are deleted, renamed or type-changed
 * rather than modified. The work tree stays empty: the census reads commits only.
 */
function fixture(kind: FixtureKind): Fixture {
  const laterEdit = kind === 'later';
  const drt = kind === 'drt';
  const cwd = makeScratch('wb-divergence-');
  try {
    git(cwd, ['init', '-q', '-b', 'main', '--object-format=sha1']);
    const stream = [
      commitCommand('refs/heads/main', 1, 'baseline', { 'src/a.ts': 'a1\n', 'src/b.ts': 'b1\n', 'test/a.test.ts': 't1\n', 'src/workbench/old.ts': 'w1\n', 'test/workbench-old.test.ts': 'w1\n', ...(drt ? DRT_BASELINE : {}) }),
      commitCommand('refs/heads/main', 2, 'divergence', { 'src/a.ts': 'a2\n', 'src/workbench/old.ts': 'w2\n', 'test/workbench-old.test.ts': 'w2\n', 'src/workbench/new.ts': 'n\n', 'test/workbench-new.test.ts': 'n\n', 'src/added.ts': 'x\n' }, undefined, drt ? DRT_CHANGES : []),
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
/** R8: the level-2-split page with its Interlude heading nested in a list item ('-') or a blockquote ('>') at level 1 or 2. */
const nestedSplit = (fx: Fixture, container: '-' | '>', depth: 1 | 2): string => page(`${SECTION}\n\nThe measured record.\n\n${container} ${'#'.repeat(depth)} Interlude\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}`);

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
  { id: 'level-2-split', fixture: 'later', doc: fx => page(`${SECTION}\n\nThe measured record.\n\n## Interlude\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}`), expected: () => [unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  { id: 'shallower-copy-before', fixture: 'later', doc: fx => page(`### ${HEADING}\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}\n\n${record([])}`), expected: () => [unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D4b: a level-1 heading above the record re-homes it out from under the docs/16 title.
  { id: 'rehomed-heading', fixture: 'later', doc: fx => page(`# Interlude\n\n${record(exactLater(fx))}`), expected: () => [missing(`the heading "${HEADING}" sits under the parent heading path ["Interlude"]; the census binds it under ["${DOC_TITLE}"]`), unrecorded('src/a.ts'), unrecorded('src/b.ts')] },
  // D5: a row moved into a fenced code block renders as code, not as a table row.
  { id: 'fenced-row', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div)], `\n\n\`\`\`\n${row('src/b.ts', fx.head)}\n\`\`\``)), expected: () => [unrecorded('src/b.ts')] },
  // D6/D6b/D6c: a moving ref is always an ancestor of HEAD that already differs, so it dates nothing.
  { id: 'six-hex-dated', fixture: 'plain', doc: () => table('abcdef', ['src/a.ts']), expected: () => [notAnId('src/a.ts', 'abcdef')] },
  { id: 'head-dated', fixture: 'plain', doc: () => table('HEAD', ['src/a.ts']), expected: () => [notAnId('src/a.ts', 'HEAD')] },
  { id: 'all-head-dated', fixture: 'later', doc: () => table('HEAD', ['src/a.ts', 'src/b.ts']), expected: () => [notAnId('src/a.ts', 'HEAD'), notAnId('src/b.ts', 'HEAD')] },
  { id: 'branch-dated', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div), row('src/b.ts', 'main')])), expected: () => [notAnId('src/b.ts', 'main')] },
  // D6d: a ref whose name is commit-id shaped is still a ref: its target's id does not start with the name.
  { id: 'hex-ref-dated', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div), row('src/b.ts', HEX_REF)])), expected: fx => [`undated row: src/b.ts recorded-at "${HEX_REF}" resolves to commit ${fx.head}, so it names a ref, not a commit id`] },
  { id: 'header-renamed', fixture: 'plain', doc: fx => page(`${SECTION}\n\nThe measured record.\n\n| path | recorded | note |\n| --- | --- | --- |\n${row('src/a.ts', fx.div)}`), expected: () => [`malformed table: the header renders | path | recorded | note |; the record's header is | ${HEADER} |`] },
  { id: 'two-tables', fixture: 'later', doc: fx => page(record([row('src/a.ts', fx.div)], `\n\nA second table.\n\n${HEADER_LINES}\n${row('src/b.ts', fx.head)}`)), expected: () => [`malformed table: "${SECTION}" renders 2 tables; the record is exactly one`] },
  // Named quiet residual R3: a rendered strikethrough path is still read as text in this census.
  { id: 'residual-struck-path', fixture: 'plain', doc: fx => page(record([`| ~~\`src/a.ts\`~~ | ${fx.div} | fixture |`])), expected: () => [] },
  // Named quiet residual R7: an uncommitted working-tree edit cannot affect the HEAD-only census.
  { id: 'residual-head-only', fixture: 'plain', doc: fx => table(fx.div, ['src/a.ts']), expected: () => [] },
  // Named quiet residual R5: a deleted, a renamed and a type-changed upstream path are not modifications, so the record
  // naming only src/a.ts is exact; a census that also counted D/R/T (paired over-refusal mutant G14) reds this row.
  { id: 'residual-drt-paths', fixture: 'drt', doc: fx => table(fx.div, ['src/a.ts']), expected: () => [] },
  // Named quiet residual R8: a level-1/2 heading nested in a list item or blockquote renders inside the section and does
  // not bound it (only a top-level heading does), so the table after it is still the record (gate pages D32/D38).
  { id: 'residual-list-nested-h2', fixture: 'later', doc: fx => nestedSplit(fx, '-', 2), expected: () => [] },
  { id: 'residual-quote-nested-h2', fixture: 'later', doc: fx => nestedSplit(fx, '>', 2), expected: () => [] },
  { id: 'residual-list-nested-h1', fixture: 'later', doc: fx => nestedSplit(fx, '-', 1), expected: () => [] },
  { id: 'residual-quote-nested-h1', fixture: 'later', doc: fx => nestedSplit(fx, '>', 1), expected: () => [] },
];

/** The frozen shape of CASES at this cut: id | fixture | every expected problem, fixture shas named <base> <div> <side> <head>. */
const FROZEN_SHAPE: readonly string[] = [
  "exact | plain | no problem | input=c8d4ce444b2e74fd7a989efb2ae51271f884e0fdd13b202cb9154a49925ea284",
  "exact-later | later | no problem | input=798eb2d7e7df09da26e3e3699696f8fcef9ef9fd329587398bd9a98f393c6676",
  "unrecorded | plain | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=38db8c50144642b9cf071ce7bb7e41da985130831c2e2966eb2647f27c4df646",
  "no-section | plain | missing section: docs/workbench/16 has no readable \"## Measured fork divergence\" section (the rendered view has no level-2 heading \"Measured fork divergence\"); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=d347dd2911d4f58dd6df05d4a9111fa435ad9067db5ac8d79cbb05eb3f7f84b4",
  "stale-misrecorded | plain | stale row: src/b.ts no longer differs from the baseline; remove it from ## Measured fork divergence / misrecorded row: src/ghost.ts never existed at the baseline | input=1d3852c599fa67c757711a23f2988b501c20850c1a07b5a46b6f531ff7eb6c90",
  "later-edit | later | unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=c8d4ce444b2e74fd7a989efb2ae51271f884e0fdd13b202cb9154a49925ea284",
  "undated | plain | undated row: src/a.ts recorded-at \"deadbeef\" is not a reachable commit | input=eef7804d9e59759bde7a6412e3263d69f75d12db423faf249fd6460892348b5e",
  "malformed | plain | malformed row: | src/a.ts | <div> | (empty) | (every row needs a path, a recorded-at commit id and a note) / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=33c7cef7feacbc001034eb1da09ecec8079ddccdab38230afa9acafd25fabb34",
  "duplicate | plain | duplicate row: src/a.ts is recorded more than once | input=c49f5d16770413e9a109e70f24111c4294d45237795d06599cc995fb1b6b5505",
  "dated-at-baseline | plain | mis-dated row: src/a.ts recorded-at \"<base>\" predates the divergence (the path did not differ from the baseline there) | input=93fe6656c333b00b2d7b4ea676c286056371eb4d2f2e013a891aeecfe8837df2",
  "dated-before-divergence | later | mis-dated row: src/b.ts recorded-at \"<div>\" predates the divergence (the path did not differ from the baseline there) | input=bbf195d85245d5843812375509f5a88d02603b98eca556d6c841b5e49bb44b88",
  "not-ancestor | later | mis-dated row: src/b.ts recorded-at \"<side>\" is not an ancestor of HEAD | input=fb62b4e8cf4ddd184bc47ba0d7cffdf120c63fa39b60b5740f09d402283d43cd",
  "html-comment-row | later | html in section: \"## Measured fork divergence\" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=ed47a232b2328b511f3d6d8b54a63bf63057e73fcd5a386048401ab4eaf6bc3e",
  "html-comment-all-rows | later | html in section: \"## Measured fork divergence\" carries HTML (a comment or a tag), which can hide rows from the rendered view; remove it / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=0db5685beb28f79d39917d652f312043d5852ef5ae6be97b62aab6b345c9b524",
  "duplicate-heading | later | missing section: docs/workbench/16 has no readable \"## Measured fork divergence\" section (the heading \"Measured fork divergence\" occurs 2 times in the rendered view; a pinned section needs it exactly once); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=f77c25dd2ef4f27bee64393fe303f9c108d6320c67db44d07242e8f6279b85df",
  "hidden-heading-before | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=031718d8f47f10de52489dfb3e502b3ffc94c90666ea4eb720801b1ba28460bd",
  "level-1-split | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=2007527119aebe5b12d51f64ba77e3be859cedcd2d4c79461246c9c0efce08c6",
  "level-2-split | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=71061876aca7f63b9a73dae7830dd847215d6d9df99dbb93ebff1aa0be547793",
  "shallower-copy-before | later | unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=9020fbe797a9aa58d569e7f545d264275d737d7ae7f88bf0977a004ecdadec20",
  "rehomed-heading | later | missing section: docs/workbench/16 has no readable \"## Measured fork divergence\" section (the heading \"Measured fork divergence\" sits under the parent heading path [\"Interlude\"]; the census binds it under [\"16 — Fork implementation refactor map and upstream compatibility\"]); add it, then record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/a.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence / unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=b3846de976b88982a310e2aa40f26365f82e69c75bcda7a5454c96c2dcd6a48d",
  "fenced-row | later | unrecorded divergence: src/b.ts differs from the baseline; record it in docs/workbench/16 section Measured fork divergence | input=1f40f44181cc9a4ce87fae045949704ec3db64328a7b6bb47d6c55fcd05e88ee",
  "six-hex-dated | plain | undated row: src/a.ts recorded-at \"abcdef\" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch | input=944b1fa7c575178fd0f618dd519375b00bf68d1fb483f3380b7deb1eafaf0498",
  "head-dated | plain | undated row: src/a.ts recorded-at \"HEAD\" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch | input=7329bc1f89ccb1350f0fa98b9d2f850d35c402eca667345c1b958e7fffdb34c4",
  "all-head-dated | later | undated row: src/a.ts recorded-at \"HEAD\" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch / undated row: src/b.ts recorded-at \"HEAD\" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch | input=56804a67b127e8f5da1c987b9e3ad788e73d786347579182039f12ea134a68e2",
  "branch-dated | later | undated row: src/b.ts recorded-at \"main\" is not a commit id (7 to 40 lowercase hex digits); a ref name or a revision expression moves with the branch | input=fd2cc51bad332f1efdfe2593c90749d67fcb8f3baa6d618d3b0436355211f883",
  "hex-ref-dated | later | undated row: src/b.ts recorded-at \"0000000\" resolves to commit <head>, so it names a ref, not a commit id | input=4a1c8d9965e6f9e6b8fb44d976553a131be36c781024eea0a7f54f132f6b44f5",
  "header-renamed | plain | malformed table: the header renders | path | recorded | note |; the record's header is | path | recorded at | note | | input=b8e9085bfe0e981d6ac8032aae261871c7674d08c264d903d69176a935045e95",
  "two-tables | later | malformed table: \"## Measured fork divergence\" renders 2 tables; the record is exactly one | input=0950be5eda769300ab57fb4c763511b60866202378abaf0dba2b550242833585",
  "residual-struck-path | plain | no problem | input=23e42fc23db95bc672e35652635971ff99ea1106e8f83eae2b092f1c3cededaa",
  "residual-head-only | plain | no problem | input=c8d4ce444b2e74fd7a989efb2ae51271f884e0fdd13b202cb9154a49925ea284",
  "residual-drt-paths | drt | no problem | input=c8d4ce444b2e74fd7a989efb2ae51271f884e0fdd13b202cb9154a49925ea284",
  "residual-list-nested-h2 | later | no problem | input=bbff0e50dda6c547b156379fb892e8d7dd481c1f72b8a6dbfe49da0549b62b8c",
  "residual-quote-nested-h2 | later | no problem | input=e59ef66bc3fff9ac488faadd75a1af7a3d5402478fc9a13c09c4606411ec5fef",
  "residual-list-nested-h1 | later | no problem | input=fa37ca6ab24937f1085d4ef32fb7923b150122bee5f5976d56358726b53bb63c",
  "residual-quote-nested-h1 | later | no problem | input=77e4be3811eb666e12f435e4d6b797dfdcedf20b22c1983ddae37ff43c0df8d9",
];

// ---- wb-zq7i (cax.28 F1-F4): the setext R8 members and the out-of-file roster ----

/** R8 setext members: the level-2-split page with its Interlude heading written setext ('---' is level 2, '===' level 1). */
const setextSplit = (fx: Fixture, container: '-' | '>', depth: 1 | 2): string => {
  const underline = depth === 1 ? '===' : '---';
  const nested = container === '-' ? `- Interlude\n  ${underline}` : `> Interlude\n> ${underline}`;
  return page(`${SECTION}\n\nThe measured record.\n\n${nested}\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}`);
};

// Named quiet residual R8, setext members: a setext level-1/2 heading nested in a list item or blockquote does not bound
// the section either, so the table after it is still the record; a census bounding at one (gate mutant S1bare) reds them.
const SETEXT_CASES: readonly Case[] = [
  { id: 'residual-list-setext-h2', fixture: 'later', doc: fx => setextSplit(fx, '-', 2), expected: () => [] },
  { id: 'residual-quote-setext-h2', fixture: 'later', doc: fx => setextSplit(fx, '>', 2), expected: () => [] },
  { id: 'residual-list-setext-h1', fixture: 'later', doc: fx => setextSplit(fx, '-', 1), expected: () => [] },
  { id: 'residual-quote-setext-h1', fixture: 'later', doc: fx => setextSplit(fx, '>', 1), expected: () => [] },
];

/** Rule 16: the frozen shape of SETEXT_CASES at this cut, in FROZEN_SHAPE's form. */
const SETEXT_FROZEN_SHAPE: readonly string[] = [
  "residual-list-setext-h2 | later | no problem | input=b2dc1a1c5cc21d110dd4b4628bad0f00b23ca057fb80b18807d603653a02317b",
  "residual-quote-setext-h2 | later | no problem | input=2b34c26122525f5a868ef67a10d9e594c9ac2bf00dba1c72be1705f9914d687f",
  "residual-list-setext-h1 | later | no problem | input=bff4a80b93a941e28cd905a330ca8b5365d53edea13b4d6bf246f919f9525ab0",
  "residual-quote-setext-h1 | later | no problem | input=04cef285d07fa8c76a45a7c7c5fe0fce469740f1397a5588c81592c78c7d2c8f",
];

/** A judged row as read now, in FROZEN_SHAPE's terms: fixture shas named <base> <div> <side> <head>. */
interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly fixture: string;
  readonly test: string;
  readonly problems: readonly string[];
  readonly input: string;
}

function judgedRow(table: string, entry: Case, fx: Fixture): JudgedRow {
  const names: readonly (readonly [string, string])[] = [[fx.base, '<base>'], [fx.div, '<div>'], [fx.side, '<side>'], [fx.head, '<head>']];
  const normalize = (text: string): string => names.reduce((out, [sha, name]) => out.split(sha).join(name), text);
  const input = createHash('sha256').update(normalize(entry.doc(fx))).digest('hex');
  return { table, id: entry.id, fixture: entry.fixture, test: `fixture ${entry.id}`, problems: entry.expected(fx).map(normalize), input };
}

const shapeLine = (row: JudgedRow): string => `${row.id} | ${row.fixture} | ${row.problems.join(' / ') || 'no problem'} | input=${row.input}`;

/** P6: the out-of-file anchor, written once from the rows as measured at the cut and judged both ways at test time. */
const ROSTER = 'test/fixtures/upstream-divergence-roster.json';
interface Roster {
  readonly rows: readonly JudgedRow[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly drt: { readonly nameStatus: readonly string[]; readonly modified: readonly string[] };
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(repoRoot, ROSTER), 'utf8')) as Roster;

describe('upstream fork divergence record (docs/workbench/16 Upstream maintainability)', () => {
  const built = new Map<FixtureKind, Fixture>();
  const fixtureOf = (kind: FixtureKind): Fixture => {
    const fx = built.get(kind);
    if (fx === undefined) throw new Error(`the ${kind} fixture was not built (its beforeAll failed)`);
    return fx;
  };
  beforeAll(() => {
    built.set('plain', fixture('plain'));
    built.set('later', fixture('later'));
    built.set('drt', fixture('drt'));
  }, FIXTURE_HOOK_MS);
  afterAll(() => {
    for (const fx of built.values()) removeScratch(fx.cwd);
  });

  it('paired D22/D23 rendered pages refuse a table relocated past the level-2 bound or under a shallower copy', () => {
    const fx = fixtureOf('later');
    const cases = [
      page(`${SECTION}\n\nThe measured record.\n\n## Interlude\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}`),
      page(`### ${HEADING}\n\n${[HEADER_LINES, ...exactLater(fx)].join('\n')}\n\n${record([])}`),
    ];
    for (const doc of cases) {
      expect(checkDivergence(fx.cwd, fx.base, doc)).toEqual([unrecorded('src/a.ts'), unrecorded('src/b.ts')]);
    }
  }, GIT_ROW_MS);

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
      const input = normalize(entry.doc(fx));
      const digest = createHash('sha256').update(input).digest('hex');
      return `${entry.id} | ${entry.fixture} | ${entry.expected(fx).map(normalize).join(' / ') || 'no problem'} | input=${digest}`;
    });
    expect(shape).toEqual(FROZEN_SHAPE);
  });

  it('the exclusion pathspecs are not vacuous: the baseline holds workbench-owned paths the divergence modifies', () => {
    const fx = fixtureOf('plain');
    const unfiltered = lines(git(fx.cwd, ['diff', '--name-only', '--diff-filter=M', fx.base, 'HEAD']));
    expect(unfiltered).toEqual(expect.arrayContaining(['src/workbench/old.ts', 'test/workbench-old.test.ts', 'src/a.ts']));
    expect(checkDivergence(fx.cwd, fx.base, table(fx.div, ['src/a.ts']))).toEqual([]);
  }, GIT_ROW_MS);

  it('the drt fixture is not vacuous: its divergence deletes, renames and type-changes in-scope baseline paths (R5)', () => {
    const fx = fixtureOf('drt');
    expect(lines(git(fx.cwd, ['diff', '--name-status', '--find-renames', fx.base, 'HEAD', '--', ...SCOPE]))).toEqual([
      'M\tsrc/a.ts',
      'A\tsrc/added.ts',
      'D\tsrc/gone.ts',
      'T\tsrc/link.ts',
      'R100\tsrc/moved.ts\tsrc/renamed.ts',
    ]);
    // The census's own measurement sees only the modification, so the D/R/T paths reach no row (the R5 reading).
    expect(lines(git(fx.cwd, ['diff', '--name-only', '--diff-filter=M', fx.base, 'HEAD', '--', ...SCOPE]))).toEqual(['src/a.ts']);
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

  for (const entry of SETEXT_CASES) {
    it(`fixture ${entry.id}`, () => {
      const fx = fixtureOf(entry.fixture);
      expect(checkDivergence(fx.cwd, fx.base, entry.doc(fx))).toEqual(entry.expected(fx));
    }, GIT_ROW_MS);
  }

  it('the setext R8 table is frozen at its measured shape (rule 16, the FROZEN_SHAPE form)', () => {
    expect(SETEXT_CASES.map(entry => shapeLine(judgedRow('SETEXT_CASES', entry, fixtureOf(entry.fixture))))).toEqual(SETEXT_FROZEN_SHAPE);
  });

  it('wb-zq7i out-of-file roster: the judged rows, the registered fixture tests and the residual families equal the fixture, in order and both ways', ({ task }) => {
    const roster = readRoster();
    const rows = [...CASES.map(entry => judgedRow('CASES', entry, fixtureOf(entry.fixture))), ...SETEXT_CASES.map(entry => judgedRow('SETEXT_CASES', entry, fixtureOf(entry.fixture)))];
    expect(rows, 'the in-file judged rows, read now, equal the roster rows exactly and in order').toEqual(roster.rows);
    const registered: string[] = [];
    // P6a (wb-2wf8): the same walk keeps every registered test's run mode, fails flag and result state, in order.
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === 'test') walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state });
        if (child.type === 'test') registered.push(child.name);
        else if (child.type === 'suite') walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.filter(name => name.startsWith('fixture ')), 'the registered fixture tests (vitest task tree), exactly and in roster order').toEqual(roster.rows.map(row => row.test));
    const ran = (state: string | undefined): boolean => state === 'pass' || state === 'fail';
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? '+fails' : ''} | ${ran(entry.state) ? 'ran' : (entry.state ?? 'no result')}`;
    expect(walked.filter(entry => entry.name.startsWith('fixture ')).map(read), 'P6a: every roster row\'s fixture test ran before this case, in run mode and not inverted').toEqual(roster.rows.map(row => `${row.test} | run | ran`));
    const here = walked.findIndex(entry => entry.name === task.name);
    expect(here, 'P6a: this case is in the walk, after the tests it judges').toBeGreaterThan(0);
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== 'run' || entry.fails || (index < here && !ran(entry.state)))).map(read), 'P6a: the other tests of this file that are skipped, todo or inverted, or did not run before this case').toEqual([]);
    const named = Object.values(roster.residuals).flat();
    expect(rows.filter(row => row.id.startsWith('residual-')).map(row => row.id).sort(), 'every residual row is named by exactly one roster family').toEqual([...named].sort());
    for (const id of named) expect(rows.find(row => row.id === id)?.problems, `${id} is a quiet row`).toEqual([]);
    // Rule 16: the roster's residual families as read at the cut base.
    expect(Object.entries(roster.residuals).map(([family, ids]) => `${family}:${ids.length}`)).toEqual(['R3:1', 'R5:1', 'R7:1', 'R8:8']);
  });

  it('wb-zq7i out-of-file roster: the drt fixture measures exactly the roster name-status and modified sets (R5, HD5)', () => {
    const fx = fixtureOf('drt');
    const roster = readRoster();
    expect(lines(git(fx.cwd, ['diff', '--name-status', '--find-renames', fx.base, 'HEAD', '--', ...SCOPE])), 'the drt divergence as measured, against the roster').toEqual(roster.drt.nameStatus);
    expect(lines(git(fx.cwd, ['diff', '--name-only', '--diff-filter=M', fx.base, 'HEAD', '--', ...SCOPE])), 'the census measurement on drt, against the roster').toEqual(roster.drt.modified);
  }, GIT_ROW_MS);

  it('the R8 bound is the shared helper\'s: on every roster R8 page docsSection admits the nested container and the record table (R8C)', () => {
    const roster = readRoster();
    const judged = [...CASES, ...SETEXT_CASES];
    const r8 = roster.residuals.R8 ?? [];
    const checked: string[] = [];
    for (const id of r8) {
      const entry = judged.find(candidate => candidate.id === id);
      expect(entry?.id, `roster R8 row ${id} is an in-file judged row`).toBe(id);
      if (entry === undefined) continue;
      const fx = fixtureOf(entry.fixture);
      const doc = entry.doc(fx);
      const section = docsSection(doc, HEADING, 2, [DOC_TITLE]);
      expect(section.ok, `${id}: ${section.why}`).toBe(true);
      const kinds = section.blocks.map(block => (block.kind === 'other' ? block.type : block.kind));
      expect(kinds, `${id}: the helper's own section runs past the nested heading to the record table`).toEqual(['paragraph', id.includes('-list-') ? 'list' : 'blockquote', 'table']);
      expect(readRecord(doc).rows.map(row => row.recordedAt), `${id}: the census reads both rows of that table`).toEqual([fx.div, fx.head]);
      checked.push(id);
    }
    expect(checked, 'every roster R8 row was judged here').toEqual(r8);
    expect(r8).toHaveLength(8);
  });
});

