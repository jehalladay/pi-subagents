/**
 * wb-0kg.11 - docs/workbench/08 "Adversarial test matrix" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds the nine scenarios of the docs/08 matrix sentence to existing cases by file and
 * verbatim title. It reads the pinned suites as TEXT only: it never executes a pinned case and never
 * claims a live, native or scale pass from a title's presence. `tier` states what kind of evidence a
 * pinned case is, and a scenario with no deterministic case is `unpinned` with a reason, never counted
 * as passed. A rename, deletion, comment-out or skip of a pinned case (by any modifier, options object,
 * enclosing describe, ctx.skip or vitest.config.ts exclude), a title that occurs twice, or a docs edit
 * that drops, reorders or rewrites a scenario goes red naming the scenario, the file and the title.
 */
import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

const REPO_ROOT = new URL('../', import.meta.url);
const DOCS_FILE = 'docs/workbench/08-lifecycle-and-recovery.md';
const DOCS_HEADING = 'Adversarial test matrix';

const OUTCOME_RECONCILIATION = 'reconciliation/uncertainty/conflict';
const OUTCOME_NO_DUPLICATE = 'no duplicate effects';
const OUTCOME_NO_INVENTED_PASS = 'no invented PASS';
const OUTCOME_NO_MASS_CANCEL = 'no implicit mass cancellation';
const REQUIRED_OUTCOMES_SENTENCE = `Required outcomes: ${OUTCOME_RECONCILIATION}; ${OUTCOME_NO_DUPLICATE}, ${OUTCOME_NO_INVENTED_PASS}, ${OUTCOME_NO_MASS_CANCEL}.`;
const OUTCOMES = [OUTCOME_RECONCILIATION, OUTCOME_NO_DUPLICATE, OUTCOME_NO_INVENTED_PASS, OUTCOME_NO_MASS_CANCEL] as const;

type Outcome = (typeof OUTCOMES)[number];
type Tier = 'default-gate' | 'live-journey' | 'bench-receipt';

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface MatrixRow {
  readonly scenario: number;
  readonly quote: string;
  readonly requiredOutcome: Outcome;
  readonly tier: Tier;
  readonly status: 'pinned' | 'unpinned';
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const MATRIX: readonly MatrixRow[] = Object.freeze([
  {
    scenario: 1,
    quote: 'Kill after Furnace side effect before returned Run ID',
    requiredOutcome: OUTCOME_NO_DUPLICATE,
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: 'test/workbench-furnace-hosted.test.ts', title: 'treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start'}],
    reason: 'Covers the Run-ID-less start refusing a blind second start; the Work-retry variant is wb-0kg.4 (respin not yet landed at this base).',
  },
  {
    scenario: 2,
    quote: 'kill after workspace edit before recorded result',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-detached-faults-receipt.test.ts', title: 'flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal'},
      {file: 'test/workflow-effect-replay.test.ts', title: 'neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect'},
    ],
  },
  {
    scenario: 3,
    quote: 'reconnect a stream with missing events',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-observation.test.ts', title: 'deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot'},
      {file: 'test/workbench-observation.test.ts', title: 'disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot'},
      {file: 'test/workbench-furnace-observer.test.ts', title: 'reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING'},
    ],
  },
  {
    scenario: 4,
    quote: 'restart Pi while detached executor continues',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: 'test/workbench-pi-detached.test.ts', title: 'launches reviewed pure computation outside Pi ownership and reattaches by stable invocation'}],
    reason:
      'Pins the session-end-continues half: the pinned case launches outside Pi ownership, fires session_shutdown in the same process, then inspects by stable invocationId to a completed terminal. A same-process session_shutdown is not a real Pi restart, so the true restart plus effect-marker journey stays the live-journey bead wb-0kg.3 (open).',
  },
  {
    scenario: 5,
    quote: 'change source digest under same logical key',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-identity.test.ts', title: 'fails closed after changed %s under the pinned invocation'},
      {file: 'test/workbench-validate-reply.test.ts', title: 'a digest mismatch is its own typed refusal, never a warning, and the core never runs'},
    ],
  },
  {
    scenario: 6,
    quote: 'issue control as observer-only',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-control.test.ts', title: 'rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing'},
      {file: 'test/workbench-reconcile-decision.test.ts', title: 'denies observer-only before any task lookup, identically for unknown and foreign tasks'},
    ],
  },
  {
    scenario: 7,
    quote: 'cancel a wait on shared child',
    requiredOutcome: OUTCOME_NO_MASS_CANCEL,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-native-details.test.ts', title: 'preserves selected node on resize and closes without invoking any runtime controls'},
      {file: 'test/workbench-furnace-control.test.ts', title: 'closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb'},
      {file: 'test/workbench-furnace-observer.test.ts', title: 'closing cancels an idle polling wait without native control, and abort signal refuses an initial read'},
      {file: 'test/workbench-detached-shared-child-receipt.test.ts', title: 'flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)'},
    ],
    reason:
      'Default-gate pins: observers never issue control (native-details, furnace-control, furnace-observer wait-close) and the wb-0kg.7 shared-child receipt judge refuses a reader close that took the child down. The real two-reader shared-child journey is the bench-receipt command `forge run local-detached-shared-child` (landed by wb-0kg.7, outside the default gate); this census never runs it and never counts it as passed.',
  },
  {
    scenario: 8,
    quote: 'exhaust Furnace slots with parents awaiting child',
    requiredOutcome: OUTCOME_RECONCILIATION,
    tier: 'default-gate',
    status: 'unpinned',
    pins: [],
    reason: 'No deterministic Furnace slot-exhaustion case; W09/W18 scope. Only observation capacity bounds and registry admission slots exist, which are not Furnace parents awaiting children.',
  },
  {
    scenario: 9,
    quote: 'change candidate source basis after Forge verify',
    requiredOutcome: OUTCOME_NO_INVENTED_PASS,
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workflow-effect-replay.test.ts', title: 'never re-runs a journaled write because the basis changed'},
      {file: 'test/workbench-identity.test.ts', title: 'never treats a mutable workspace path as an immutable source basis'},
      {file: 'test/workbench-forge-observer.test.ts', title: 'F2: a current failed gate stays failed despite transport success, and current success is success'},
    ],
    reason: 'No case drives a Forge verify followed by a basis change end to end; these bind the journaled-write, mutable-basis and no-invented-PASS halves separately (W17 designer scope).',
  },
]);

/** Bench-receipt references a row cites but this census does not run: the forge command block and its runner must still exist. */
const BENCH_RECEIPT_REFS: readonly {readonly scenario: number; readonly command: string; readonly file: string}[] = [{scenario: 7, command: 'local-detached-shared-child', file: 'qa/workbench/local-detached-shared-child.mjs'}];

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, REPO_ROOT), 'utf8');
}

// ---- parse-aware scanner (string-aware comment strip, call-head title, options objects, suite-level and file hazards) ----
/** The focus modifier, spelled indirectly so a text search for focused cases never matches this file. */
const FOCUS_MODIFIER = 'on' + 'ly';
const NOT_FOUND = 'title not found as the first argument of a describe/suite/it/test call';
const SKIP_MODIFIERS = new Set(['skip', 'todo', 'fails', 'skipIf', 'runIf', FOCUS_MODIFIER]);


interface Lexed {
  /** Source with comments blanked (newlines kept); string literals intact. */
  readonly code: string;
  /** Same length as `code`, with the contents of string and template literals blanked too; quote characters kept. */
  readonly bare: string;
}

/** True when a `/` at this point opens a regex literal: the previous significant character cannot end an operand. */
function startsRegex(bareSoFar: string): boolean {
  const trimmed = bareSoFar.replace(/\s+$/, '');
  if (trimmed === '') return true;
  const last = trimmed.charAt(trimmed.length - 1);
  if ('(,=:[!&|?{};+-*%<>~^'.includes(last)) return true;
  return /\breturn$/.test(trimmed);
}

/**
 * One pass over TypeScript text: blanks // and block comments outside string and template literals, and
 * separately blanks string contents, keeping offsets identical so a literal found in `code` can be judged
 * structurally in `bare`. Known limits (disclosed, fail-closed or caught by the exactly-once title check):
 * template-literal ${...} expressions are treated as string text and regex literals are not parsed, so a quote
 * character inside a regex literal can shift string state; a mis-parse can only hide or expose text, which the
 * exactly-once title check then reports.
 */
function lex(source: string): Lexed {
  let code = '';
  let bare = '';
  let quote = '';
  let i = 0;
  const blank = (text: string): string => text.replace(/[^\n]/g, ' ');
  while (i < source.length) {
    const ch = source.charAt(i);
    const next = source.charAt(i + 1);
    if (quote !== '') {
      if (ch === '\\') {
        code += ch + next;
        bare += '  ';
        i += 2;
        continue;
      }
      code += ch;
      if (ch === quote) {
        quote = '';
        bare += ch;
      } else {
        bare += ch === '\n' ? ch : ' ';
      }
      i += 1;
      continue;
    }
    if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i);
      const stop = end === -1 ? source.length : end;
      code += blank(source.slice(i, stop));
      bare += blank(source.slice(i, stop));
      i = stop;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      const stop = end === -1 ? source.length : end + 2;
      code += blank(source.slice(i, stop));
      bare += blank(source.slice(i, stop));
      i = stop;
      continue;
    }
    if (ch === '/' && startsRegex(bare)) {
      let k = i + 1;
      let inClass = false;
      while (k < source.length && source.charAt(k) !== '\n') {
        const c = source.charAt(k);
        if (c === '\\') {
          k += 2;
          continue;
        }
        if (c === '[') inClass = true;
        else if (c === ']') inClass = false;
        else if (c === '/' && !inClass) break;
        k += 1;
      }
      if (source.charAt(k) === '/') {
        code += source.slice(i, k + 1);
        bare += `/${' '.repeat(Math.max(0, k - i - 1))}/`;
        i = k + 1;
        continue;
      }
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    code += ch;
    bare += ch;
    i += 1;
  }
  return {code, bare};
}

const CHAIN_TAIL = /(?<![\w$.])(describe|suite|it|test)((?:\.[A-Za-z]+)*)\s*$/;
/** An options-object member that skips, defers, inverts or isolates a case, unless it is literally false. */
const OPTION_MODIFIER = /\b(skip|todo|fails|only)\s*:\s*(?!false\b)(?=\S)/;
/**
 * Fail-closed file-wide hazards, judged on code with comments and string contents blanked: any skip/todo/focus/skipIf/runIf
 * modifier chain on describe, suite, it or test (including .concurrent chains), any skip( call (ctx.skip(), context.skip(),
 * a destructured skip()), or an options member that skips, defers or isolates. One hazard anywhere in a pinned file fails EVERY
 * pin in that file by name, because vitest may then no longer run the pinned case.
 */
const FILE_HAZARD = new RegExp(
  `(?<![\\w$.])(?:describe|suite|it|test)(?:\\.[A-Za-z]+)*\\.(?:${FOCUS_MODIFIER}|skip|todo|skipIf|runIf)\\b|(?<![\\w$])(?:[A-Za-z_$][\\w$]*\\.)?skip\\s*\\(|\\b(?:skip|todo|${FOCUS_MODIFIER})\\s*:\\s*(?!false\\b)(?=\\S)`,
);

/** The text of the balanced bracket group that ends at `end` (exclusive of the closing char index), scanning backwards; returns its opening index or -1. */
function matchingOpenParen(bare: string, closeIndex: number): number {
  let depth = 0;
  for (let k = closeIndex; k >= 0; k -= 1) {
    const c = bare.charAt(k);
    if (c === ')') depth += 1;
    else if (c === '(') {
      depth -= 1;
      if (depth === 0) return k;
    }
  }
  return -1;
}

/** The balanced `{...}` object literal that starts at `start` in `bare`, or '' if none. */
function balancedBraces(bare: string, start: number): string {
  let depth = 0;
  for (let k = start; k < bare.length; k += 1) {
    const c = bare.charAt(k);
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return bare.slice(start, k + 1);
    }
  }
  return '';
}

interface CallSite {
  readonly modifiers: readonly string[];
  readonly options: string;
}

/** Resolves a literal at `from` as the FIRST argument of a describe/suite/it/test call (direct, or through an .each(...)/.skipIf(...) head). */
function callSiteAt(lexed: Lexed, from: number, literalLength: number, quoteChar: string): CallSite | undefined {
  const {bare} = lexed;
  if (bare.charAt(from) !== quoteChar) return undefined;
  let i = from - 1;
  while (i >= 0 && /\s/.test(bare.charAt(i))) i -= 1;
  if (bare.charAt(i) !== '(') return undefined;
  let headEnd = i;
  let j = i - 1;
  while (j >= 0 && /\s/.test(bare.charAt(j))) j -= 1;
  if (bare.charAt(j) === ')') {
    const open = matchingOpenParen(bare, j);
    if (open < 0) return undefined;
    headEnd = open;
  }
  const head = CHAIN_TAIL.exec(bare.slice(Math.max(0, headEnd - 96), headEnd));
  if (head === null) return undefined;
  let k = from + literalLength;
  while (k < bare.length && /\s/.test(bare.charAt(k))) k += 1;
  let options = '';
  if (bare.charAt(k) === ',') {
    k += 1;
    while (k < bare.length && /\s/.test(bare.charAt(k))) k += 1;
    if (bare.charAt(k) === '{') options = balancedBraces(bare, k);
  }
  return {modifiers: (head[2] ?? '').split('.').filter(Boolean), options};
}

/**
 * Verdict for one pinned title in one suite's text: "ok", or a reason naming what is wrong. Comments are stripped
 * string-aware first. The title must be the first argument of exactly one describe/suite/it/test call, with no skip/todo/
 * fails/focus modifier and no options-object modifier on it, and the file must carry no fail-closed hazard anywhere.
 */
function checkPin(source: string, title: string): string {
  const lexed = lex(source);
  const sites: CallSite[] = [];
  for (const quoteChar of ['"', "'", '`']) {
    const literal = `${quoteChar}${title}${quoteChar}`;
    let from = lexed.code.indexOf(literal);
    while (from !== -1) {
      const site = callSiteAt(lexed, from, literal.length, quoteChar);
      if (site !== undefined) sites.push(site);
      from = lexed.code.indexOf(literal, from + literal.length);
    }
  }
  if (sites.length === 0) return NOT_FOUND;
  if (sites.length > 1) return `title occurs ${sites.length} times, expected exactly once`;
  const only = sites[0];
  const blocked = (only?.modifiers ?? []).filter((modifier) => SKIP_MODIFIERS.has(modifier));
  if (blocked.length > 0) return `case is .${blocked.join('.')}`;
  const option = OPTION_MODIFIER.exec(only?.options ?? '')?.[1];
  if (option !== undefined) return `case has option ${option}`;
  const hazard = FILE_HAZARD.exec(lexed.bare)?.[0];
  if (hazard !== undefined) return `file hazard ${hazard.replace(/\s+/g, '')}`;
  return 'ok';
}

const normalize = (text: string): string => text.replace(/\s+/g, ' ').trim();

/** The text under the "## Adversarial test matrix" heading, bounded by the next heading or EOF, whitespace-normalized; undefined if the heading is absent. */
function matrixSection(docs: string): string | undefined {
  const heading = new RegExp(`^##[ \\t]+${DOCS_HEADING}[ \\t]*$`, 'm').exec(docs);
  if (heading === null) return undefined;
  const rest = docs.slice(heading.index + heading[0].length);
  const next = /^#{1,6}[ \t]/m.exec(rest);
  return normalize(next === null ? rest : rest.slice(0, next.index));
}

/**
 * Every docs drift, each naming the scenario it breaks. Checks, in order: the section exists; each clause and each
 * required outcome is present (naming every missing one); the clauses appear in table order, separated by "; ", the
 * first divergence naming its scenario (text added after a clause names that clause); and the section is exactly
 * the matrix sentence plus the Required outcomes sentence with nothing after it.
 */
function docsFailures(docs: string): string[] {
  const section = matrixSection(docs);
  if (section === undefined) return [`${DOCS_FILE}: the "## ${DOCS_HEADING}" section heading is missing (renamed or removed)`];
  const failures: string[] = [];
  for (const row of MATRIX) {
    if (!section.includes(row.quote)) failures.push(`scenario ${row.scenario} (${row.quote}): clause missing or reworded in the "${DOCS_HEADING}" section of ${DOCS_FILE}`);
    if (!section.includes(row.requiredOutcome)) failures.push(`scenario ${row.scenario} (${row.quote}): required outcome "${row.requiredOutcome}" missing from the "${DOCS_HEADING}" section of ${DOCS_FILE}`);
  }
  if (failures.length > 0) return failures;
  let at = 0;
  for (const row of MATRIX) {
    const lead = row.scenario === 1 ? '' : '; ';
    if (!section.startsWith(lead, at)) {
      const previous = MATRIX[row.scenario - 2];
      return [`scenario ${previous?.scenario ?? row.scenario} (${previous?.quote ?? row.quote}): text added or changed after this clause in the "${DOCS_HEADING}" section of ${DOCS_FILE}`];
    }
    if (!section.startsWith(`${lead}${row.quote}`, at)) return [`scenario ${row.scenario} (${row.quote}): clause out of table order in the "${DOCS_HEADING}" section of ${DOCS_FILE}`];
    at += lead.length + row.quote.length;
  }
  const tail = section.slice(at);
  if (tail !== `. ${REQUIRED_OUTCOMES_SENTENCE}`) {
    const last = MATRIX[MATRIX.length - 1];
    return [`scenario ${last?.scenario ?? 9} (${last?.quote ?? ''}): the Required outcomes sentence drifted, or text follows the clauses, in the "${DOCS_HEADING}" section of ${DOCS_FILE}`];
  }
  return [];
}

/** Compiles a vitest glob (`**` any depth, `*` within a segment) to an anchored regular expression. */
function globToRegExp(glob: string): RegExp {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped.replace(/\*\*\//g, '(?:.*/)?').replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')}$`);
}

/** Tier truth: a default-gate pin file must be matched by the vitest include globs and absent from the exclude globs, read from the config text. */
function judgeTier(config: string, file: string): string {
  const text = lex(config).code;
  const list = (key: string): string[] => [...(new RegExp(`\\b${key}\\s*:\\s*\\[([^\\]]*)\\]`).exec(text)?.[1] ?? '').matchAll(/"([^"]+)"|'([^']+)'/g)].map((match) => match[1] ?? match[2] ?? '');
  const includes = list('include');
  if (includes.length === 0) return 'vitest include list is missing or empty';
  if (!includes.some((glob) => globToRegExp(glob).test(file))) return 'outside the vitest include globs';
  if (list('exclude').some((glob) => globToRegExp(glob).test(file))) return 'excluded by vitest.config.ts exclude';
  return 'ok';
}

/** Every way one pin can fail in one suite's text, each failure naming the scenario, the file and the title. */
function pinFailures(row: MatrixRow, readSource: (path: string) => string): string[] {
  const failures: string[] = [];
  for (const pin of row.pins) {
    const verdict = checkPin(readSource(pin.file), pin.title);
    if (verdict !== 'ok') failures.push(`scenario ${row.scenario} (${row.quote}): ${pin.file} :: "${pin.title}" -> ${verdict}`);
  }
  return failures;
}

describe('wb-0kg.11 docs/08 adversarial matrix census', () => {
  it('holds exactly nine frozen rows numbered 1 to 9, each classified with a valid outcome and tier', () => {
    expect(Object.isFrozen(MATRIX)).toBe(true);
    expect(MATRIX.map((row) => row.scenario)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const row of MATRIX) {
      expect(OUTCOMES, `scenario ${row.scenario}: requiredOutcome`).toContain(row.requiredOutcome);
      expect(['default-gate', 'live-journey', 'bench-receipt'], `scenario ${row.scenario}: tier`).toContain(row.tier);
      expect(['pinned', 'unpinned'], `scenario ${row.scenario}: status`).toContain(row.status);
    }
  });

  it('quotes the matrix sentence and the required-outcomes sentence verbatim, as exactly the "Adversarial test matrix" section', () => {
    expect(docsFailures(read(DOCS_FILE))).toEqual([]);
  });

  it('never counts an unpinned scenario as passed: it carries a reason and no pins, and only scenario 8 is unpinned', () => {
    for (const row of MATRIX) {
      if (row.status === 'unpinned') {
        expect(row.pins, `scenario ${row.scenario}: unpinned rows hold no pins`).toEqual([]);
        expect((row.reason ?? '').trim().length, `scenario ${row.scenario}: unpinned rows name a reason`).toBeGreaterThan(20);
      } else {
        expect(row.pins.length, `scenario ${row.scenario}: pinned rows hold at least one pin`).toBeGreaterThan(0);
      }
    }
    expect(MATRIX.filter((row) => row.status === 'unpinned').map((row) => row.scenario)).toEqual([8]);
  });

  for (const row of MATRIX.filter((candidate) => candidate.status === 'pinned')) {
    it(`scenario ${row.scenario} (${row.quote}): every pinned case exists exactly once and is not skipped`, () => {
      expect(pinFailures(row, read)).toEqual([]);
    });
  }

  it('tier truth: every default-gate pin file is matched by vitest.config.ts include and absent from its exclude', () => {
    const config = read('vitest.config.ts');
    const failures: string[] = [];
    for (const row of MATRIX) {
      if (row.tier !== 'default-gate') continue;
      for (const pin of row.pins) {
        const verdict = judgeTier(config, pin.file);
        if (verdict !== 'ok') failures.push(`scenario ${row.scenario} (${row.quote}): ${pin.file} -> ${verdict}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it('bench-receipt references cited by a row still exist: the forge command block and its runner file', () => {
    const forgeToml = read('forge.toml');
    for (const ref of BENCH_RECEIPT_REFS) {
      expect(forgeToml.includes(`[build.commands.${ref.command}]`), `scenario ${ref.scenario}: forge.toml no longer registers ${ref.command}`).toBe(true);
      expect(read(ref.file).length, `scenario ${ref.scenario}: ${ref.file} is empty`).toBeGreaterThan(0);
    }
  });

  it('never executes a pinned case: the census only reads suite text', () => {
    const own = read('test/workbench-adversarial-matrix.test.ts');
    expect(own).not.toMatch(/\bawait import\(/);
    expect(own).not.toMatch(/\brequire\(/);
  });
});

const FOCUS = FOCUS_MODIFIER;
const T = 'keeps the guarantee';
const U = 'keeps the other guarantee';
const suite = (inner: string): string => `describe("suite", () => {\n${inner}\n});\n`;
const plain = `  it("${T}", () => {});`;

describe('wb-0kg.11 checkPin falsifiers: rename, delete, duplicate and the call-head rule', () => {
  it('accepts the unmodified case, an it.each case and a single-quoted case', () => {
    expect(checkPin(suite(plain), T)).toBe('ok');
    expect(checkPin(suite(`  it.each([1, 2])("${T} %s", () => {});`), `${T} %s`)).toBe('ok');
    expect(checkPin(suite(`  it('${T}', async () => {});`), T)).toBe('ok');
  });

  it('P1 goes red on a rename', () => {
    expect(checkPin(suite(plain.replace(T, `${T}, mostly`)), T)).toBe(NOT_FOUND);
  });

  it('P2 goes red on a deletion', () => {
    expect(checkPin(suite(''), T)).toBe(NOT_FOUND);
  });

  it('P3 goes red on a duplicated title', () => {
    expect(checkPin(suite(`${plain}\n${plain}`), T)).toBe('title occurs 2 times, expected exactly once');
  });

  it.each(['skip', 'todo', 'fails', FOCUS])('P4 goes red on it.%s on the pinned case', (modifier) => {
    expect(checkPin(suite(`  it.${modifier}("${T}", () => {});`), T)).toBe(`case is .${modifier}`);
  });

  it('P5 goes red on test.skip and on it.skip.each', () => {
    expect(checkPin('test.skip("case delta", () => {});', 'case delta')).toBe('case is .skip');
    expect(checkPin('it.skip.each([1])("case delta %s", () => {});', 'case delta %s')).toBe('case is .skip');
  });

  it('P6 goes red on it.skipIf(true)("T") and on it.runIf(false)("T") on the pinned case', () => {
    expect(checkPin(suite(`  it.skipIf(true)("${T}", () => {});`), T)).toBe('case is .skipIf');
    expect(checkPin(suite(`  it.runIf(false)("${T}", () => {});`), T)).toBe('case is .runIf');
  });

  it('L1 does not count a title that only appears as an argument inside another case (the call-head rule)', () => {
    expect(checkPin(suite(`  it("other", () => {\n    expect(x).toBe("${T}");\n  });`), T)).toBe(NOT_FOUND);
  });

  it('L2 does not count a title that only appears inside a string that mentions an it( head', () => {
    expect(checkPin(suite(`  const s = 'it("${T}", () => {})';`), T)).toBe(NOT_FOUND);
  });

  it('L3 does not count a title that is the second argument of a call', () => {
    expect(checkPin(suite(`  it(label, "${T}", () => {});`), T)).toBe(NOT_FOUND);
  });
});

describe('wb-0kg.11 checkPin falsifiers: ways a pinned case stays present as text while vitest no longer runs it', () => {
  it('S1 goes red when the pinned call is commented out with a line comment', () => {
    expect(checkPin(suite(`  // it("${T}", () => {});`), T)).toBe(NOT_FOUND);
  });

  it('S2 goes red when the pinned call is commented out with a block comment', () => {
    expect(checkPin(suite(`  /* it("${T}", () => {}); */`), T)).toBe(NOT_FOUND);
  });

  it('S3 goes red on an options object { skip: true } on the pinned case', () => {
    expect(checkPin(suite(`  it("${T}", { skip: true }, () => {});`), T)).toBe('case has option skip');
  });

  it('S4 goes red on an options object { todo: true } on the pinned case', () => {
    expect(checkPin(suite(`  it("${T}", { todo: true }, () => {});`), T)).toBe('case has option todo');
  });

  it('S5 goes red when the enclosing describe is describe.skip', () => {
    expect(checkPin(`describe.skip("suite", () => {\n${plain}\n});\n`, T)).toBe('file hazard describe.skip');
  });

  it('S6 goes red when the enclosing describe is describe.skipIf(true)', () => {
    expect(checkPin(`describe.skipIf(true)("suite", () => {\n${plain}\n});\n`, T)).toBe('file hazard describe.skipIf');
  });

  it('S7 goes red when the enclosing describe is describe.runIf(false)', () => {
    expect(checkPin(`describe.runIf(false)("suite", () => {\n${plain}\n});\n`, T)).toBe('file hazard describe.runIf');
  });

  it('S8 goes red on an options object { skip: true } on the enclosing describe', () => {
    expect(checkPin(`describe("suite", { skip: true }, () => {\n${plain}\n});\n`, T)).toBe('file hazard skip:');
  });

  it('S9 goes red when the pinned body calls ctx.skip()', () => {
    expect(checkPin(suite(`  it("${T}", (ctx) => {\n    ctx.skip();\n  });`), T)).toBe('file hazard ctx.skip(');
  });

  it('S9b goes red when the pinned body calls a destructured skip()', () => {
    expect(checkPin(suite(`  it("${T}", ({ skip }) => {\n    skip();\n  });`), T)).toBe('file hazard skip(');
  });

  it('S10 goes red on a focused case elsewhere in the file, which would narrow the run', () => {
    expect(checkPin(suite(`${plain}\n  it.${FOCUS}("another", () => {});`), T)).toBe(`file hazard it.${FOCUS}`);
  });

  it('S11 goes red on a chained modifier such as it.concurrent.skip elsewhere in the file', () => {
    expect(checkPin(suite(`${plain}\n  it.concurrent.skip("another", () => {});`), T)).toBe('file hazard it.concurrent.skip');
  });

  it('S12 goes red on a sibling describe.skip elsewhere in the file', () => {
    expect(checkPin(`${suite(plain)}describe.skip("other", () => {});\n`, T)).toBe('file hazard describe.skip');
  });

  it('S13 goes red on a suite-level modifier for EVERY pin of the file, each by name', () => {
    const source = `describe.skip("suite", () => {\n  it("${T}", () => {});\n  it("${U}", () => {});\n});\n`;
    const row: MatrixRow = {scenario: 3, quote: 'reconnect a stream with missing events', requiredOutcome: OUTCOME_RECONCILIATION, tier: 'default-gate', status: 'pinned', pins: [{file: 'test/a.test.ts', title: T}, {file: 'test/a.test.ts', title: U}]};
    const failures = pinFailures(row, () => source);
    expect(failures).toHaveLength(2);
    expect(failures[0]).toContain('scenario 3');
    expect(failures[0]).toContain('test/a.test.ts');
    expect(failures[0]).toContain(`"${T}"`);
    expect(failures[1]).toContain(`"${U}"`);
  });

  it('S14 goes red on it.skip.each for the pinned it.each case', () => {
    expect(checkPin(suite(`  it.skip.each([1])("${T} %s", () => {});`), `${T} %s`)).toBe('case is .skip');
  });

  it('stays green for // and /* inside strings, an explicit { skip: false }, and hazard words only in comments or strings', () => {
    const text = suite(
      [
        '  // describe.skip is not used here',
        `  /* it.${FOCUS}("x") */`,
        '  const u = "http://example.test/a"; const v = "/* not a comment";',
        `  it("${T}", { skip: false }, () => {`,
        '    expect(u).toBe("describe.skip( ctx.skip() skip: true");',
        '  });',
        '  const w = "*/";',
      ].join('\n'),
    );
    expect(checkPin(text, T)).toBe('ok');
  });

  it('keeps a case that follows a quote character inside a regex literal, and still reads division as division', () => {
    expect(checkPin(suite(`  const m = /(?:import)\\s*(['"])x\\1/g; it("${T}", () => {});`), T)).toBe('ok');
    expect(checkPin(suite(`  const half = total / 2; const other = total / 3; it("${T}", () => {});`), T)).toBe('ok');
  });

  it('keeps a case that follows a // inside a string on the same line (string-aware strip)', () => {
    expect(checkPin(suite(`  const u = "http://example.test/a"; it("${T}", () => {});`), T)).toBe('ok');
  });
});

describe('wb-0kg.11 pinFailures names the scenario, the file and the title', () => {
  const row: MatrixRow = {scenario: 6, quote: 'issue control as observer-only', requiredOutcome: OUTCOME_RECONCILIATION, tier: 'default-gate', status: 'pinned', pins: [{file: 'test/b.test.ts', title: T}]};

  it('is empty for a live case', () => {
    expect(pinFailures(row, () => suite(plain))).toEqual([]);
  });

  it('names all three for a missing or skipped case', () => {
    for (const source of [suite(''), suite(`  it.skip("${T}", () => {});`)]) {
      const [failure] = pinFailures(row, () => source);
      expect(failure).toContain('scenario 6');
      expect(failure).toContain('test/b.test.ts');
      expect(failure).toContain(`"${T}"`);
    }
  });
});

describe('wb-0kg.11 docs drift names the scenario and holds the section exactly', () => {
  const sentence = `${MATRIX.map((row) => row.quote).join('; ')}. ${REQUIRED_OUTCOMES_SENTENCE}`;
  const good = `# Doc\n\n## ${DOCS_HEADING}\n\n${sentence}\n\n## Next section\n\nbody\n`;
  const names = (failures: readonly string[], scenario: number): boolean => failures.some((line) => line.startsWith(`scenario ${scenario} `));

  it('DD1 accepts the section exactly as written', () => {
    expect(docsFailures(good)).toEqual([]);
  });

  it('DD2 names scenario 8 when clause 8 is dropped', () => {
    const failures = docsFailures(good.replace(' exhaust Furnace slots with parents awaiting child;', ''));
    expect(names(failures, 8)).toBe(true);
  });

  it('DD3 names scenario 3 when a qualifier is appended to clause 3', () => {
    const failures = docsFailures(good.replace('reconnect a stream with missing events', 'reconnect a stream with missing events (usually)'));
    expect(names(failures, 3)).toBe(true);
  });

  it('DD4 names scenario 2 when clauses 2 and 3 are reordered', () => {
    const swapped = good.replace('kill after workspace edit before recorded result; reconnect a stream with missing events', 'reconnect a stream with missing events; kill after workspace edit before recorded result');
    expect(names(docsFailures(swapped), 2)).toBe(true);
  });

  it('DD5 goes red naming the section when the heading is renamed away', () => {
    const failures = docsFailures(good.replace(`## ${DOCS_HEADING}`, '## Adversarial notes'));
    expect(failures.some((line) => line.includes(DOCS_HEADING))).toBe(true);
  });

  it('DD6 goes red when the sentence moves out of the section under another heading', () => {
    const moved = `# Doc\n\n## ${DOCS_HEADING}\n\n## Elsewhere\n\n${sentence}\n`;
    expect(docsFailures(moved).length).toBeGreaterThan(0);
  });

  it('DD7 goes red when the Required outcomes sentence is rewritten', () => {
    const failures = docsFailures(good.replace('no duplicate effects, no invented PASS', 'no duplicate effects, no PASS'));
    expect(failures.length).toBeGreaterThan(0);
    expect(failures.some((line) => line.includes('Required outcomes') || line.includes('no invented PASS'))).toBe(true);
  });

  it('DD8 goes red when text is appended inside the section after the required outcomes', () => {
    expect(docsFailures(good.replace('no implicit mass cancellation.', 'no implicit mass cancellation. Unless the host says otherwise.')).length).toBeGreaterThan(0);
  });

  it('DD9 goes red when a qualifier is appended to the last clause', () => {
    const failures = docsFailures(good.replace('after Forge verify.', 'after Forge verify, sometimes.'));
    expect(names(failures, 9)).toBe(true);
  });
});

describe('wb-0kg.11 tier truth: a default-gate pin file must actually run under the default gate', () => {
  const config = 'test: {\n  include: ["test/**/*.test.ts"],\n  exclude: ["test/workbench-native-client.test.ts", "test/other.test.ts"],\n}';

  it('accepts a file under test/ that is not excluded', () => {
    expect(judgeTier(config, 'test/workbench-timeline.test.ts')).toBe('ok');
  });

  it('T1 goes red when the pinned file is added to the vitest exclude', () => {
    expect(judgeTier(config, 'test/other.test.ts')).not.toBe('ok');
  });

  it('T2 goes red when an exclude glob covers the pinned file', () => {
    expect(judgeTier(config.replace('"test/other.test.ts"', '"test/workbench-*.test.ts"'), 'test/workbench-timeline.test.ts')).not.toBe('ok');
  });

  it('T3 goes red when the pinned file is outside the include glob', () => {
    expect(judgeTier(config, 'qa/workbench/x.test.ts')).not.toBe('ok');
  });

  it('T4 goes red when the include list itself changed', () => {
    expect(judgeTier(config.replace('test/**/*.test.ts', 'src/**/*.test.ts'), 'test/workbench-timeline.test.ts')).not.toBe('ok');
  });

  it('ignores include and exclude words that only appear in config comments', () => {
    expect(judgeTier(`// exclude: ["test/other.test.ts"]\n${config}`, 'test/workbench-timeline.test.ts')).toBe('ok');
  });
});
