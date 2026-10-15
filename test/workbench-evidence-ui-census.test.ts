/**
 * wb-6ze.41 - docs/workbench/20 "UI integration" and "Owner rulings on the design conflicts" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds the seven clauses of the docs/20 "UI integration" paragraph and the ten numbered
 * owner rulings to existing cases by file and verbatim title (or, for one clause, by a literal that
 * must stay in a named file). It never executes a pinned case, never renders, and never claims a
 * live or native pass from a title's presence: `tier` states what kind of evidence a pinned case is,
 * a `partial` row says what its pins do not cover, and a `superseded` row is historical, holds no
 * pin and is never counted as passed. The sibling wb-6ze.40 binds the "Producer mapping" and
 * "Refusal and freshness rules" sections of the same document.
 */
import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

const REPO_ROOT = new URL('../', import.meta.url);
const DOCS_FILE = 'docs/workbench/20-evidence-loader-contract.md';

const INSPECTOR = 'test/workbench-inspector.test.ts';
const LOADER = 'test/workbench-evidence-loader.test.ts';
const WIRING = 'test/workbench-evidence-wiring.test.ts';

type Section = 'UI integration' | 'Owner rulings';
type Tier = 'default-gate';
type Status = 'pinned' | 'partial' | 'superseded';

interface TitlePin {
  readonly file: string;
  readonly title: string;
}

interface LiteralPin {
  readonly file: string;
  readonly literal: string;
}

interface CensusRow {
  readonly id: string;
  readonly section: Section;
  /** The clause, or the ruling text after its number, as the docs carry it verbatim. */
  readonly clause: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly TitlePin[];
  readonly literals: readonly LiteralPin[];
  readonly reason?: string;
}

const CENSUS: readonly CensusRow[] = Object.freeze([
  {
    id: 'ui-1',
    section: 'UI integration',
    clause: 'the inspector details view renders per-ref state from a synchronous `store.get`',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: INSPECTOR, title: 'A8 layoutInspector is synchronous and never awaits a pending loader'}],
    literals: [],
  },
  {
    id: 'ui-2',
    section: 'UI integration',
    clause: 'Enter on a selected ref emits a `load-evidence` action the dialog wires to `store.request`',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: INSPECTOR, title: 'A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection'},
      {file: WIRING, title: 'wires Enter in the details view to store.request for the focused reference'},
    ],
    literals: [],
  },
  {
    id: 'ui-3',
    section: 'UI integration',
    clause: '`e` inside details advances the evidence selection',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: INSPECTOR, title: 'A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection'},
      {file: INSPECTOR, title: 'A3 e outside the details view still opens it; a node without references has no load action'},
    ],
    literals: [],
  },
  {
    id: 'ui-4',
    section: 'UI integration',
    clause: 'j/k reset it',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: INSPECTOR, title: 'A2 j/k reset the evidence selection'}],
    literals: [],
  },
  {
    id: 'ui-5',
    section: 'UI integration',
    clause: '`not-requested` renders as "not loaded (Enter)", never optimistic loading',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: INSPECTOR, title: 'A1 a full keyboard journey and render loads nothing; exactly one call follows Enter on the selected ref; e only moves the selection'},
      {file: INSPECTOR, title: 'A12 the dialog does not treat load-evidence as close or cancel'},
    ],
    literals: [{file: INSPECTOR, literal: 'not loaded (Enter)'}],
  },
  {
    id: 'ui-6',
    section: 'UI integration',
    clause: 'Dialog close calls `abortAll` and never cancels the workflow',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: WIRING, title: 'wires dialog close to abortAll and never to workflow cancellation'},
      {file: INSPECTOR, title: 'A7 Esc and ctrl+c while loading only close; abort stops the local read and nothing touches the projection'},
    ],
    literals: [],
  },
  {
    id: 'ui-7',
    section: 'UI integration',
    clause: 'With no store supplied the details view renders byte-identical to today',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: INSPECTOR, title: 'A9 without a store the details view is the pre-existing rendering and Enter still folds'}],
    literals: [],
  },
  {
    id: 'ruling-1',
    section: 'Owner rulings',
    clause: '`loaded` equals the full `EvidenceContent` (kind, sourceBasis, freshness included).',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: LOADER, title: 'keeps only digest-shaped sourceBasis, a bounded sanitized receipt, and honors stale freshness'}],
    literals: [],
  },
  {
    id: 'ruling-2',
    section: 'Owner rulings',
    clause: 'The double redaction in the sanitizer order is deliberate and idempotent.',
    tier: 'default-gate',
    status: 'partial',
    pins: [{file: LOADER, title: 'redacts secrets before display, including one that would straddle a chunk boundary'}],
    literals: [],
    reason: 'Pins the redaction half only. No case asserts that a second redaction pass is idempotent (git grep over test/ finds no idempotence title for the redactor); wb-3l3 owns a JSON-embedded non-idempotence defect, so the idempotence half stays unpinned until it lands.',
  },
  {
    id: 'ruling-3',
    section: 'Owner rulings',
    clause: 'Loaders take the full request, not a bare ref; routing is provider-first.',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: LOADER, title: 'routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader'}],
    literals: [],
  },
  {
    id: 'ruling-4',
    section: 'Owner rulings',
    clause: 'Cache keys are producer-qualified, matching the projection.',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: LOADER, title: 'keys entries producer-qualified so same-scope cross-producer ref strings cannot collide'}],
    literals: [],
  },
  {
    id: 'ruling-5',
    section: 'Owner rulings',
    clause: 'Forge nodes will emit `forge-operation:<operation_id>` evidence refs from native-evidence shaping (parent slice);',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-native-evidence.test.ts', title: 'emits exactly one forge-operation ref from a validated native operation id'},
      {file: 'test/workbench-forge-observer.test.ts', title: 'projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference'},
      {file: 'test/workbench-native-details.test.ts', title: 'lists a forge-operation evidence ref in the node details pane'},
    ],
    literals: [],
  },
  {
    id: 'ruling-6',
    section: 'Owner rulings',
    clause: 'A new `claude:transcript` grant gates the loader, and the existing `c` transcript path adopts the same grant in the parent slice so the two paths cannot diverge.',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: INSPECTOR, title: 'A11 claude evidence is refused unauthorized without the claude:transcript grant, rendered byte-identical to a revoked grant, and loaded with it'},
      {file: LOADER, title: 'claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves'},
    ],
    literals: [],
  },
  {
    id: 'ruling-7',
    section: 'Owner rulings',
    clause: 'The `e`/`enter` reducer deltas inside the details view are accepted behavior changes.',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: INSPECTOR, title: 'A2 j/k reset the evidence selection'},
      {file: INSPECTOR, title: 'A3 e outside the details view still opens it; a node without references has no load action'},
    ],
    literals: [],
  },
  {
    id: 'ruling-8',
    section: 'Owner rulings',
    clause: "Zero-width characters are stripped in the loader's own preview pass; the acceptance wording is width-boundedness.",
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: LOADER, title: 'strips terminal escapes, bidi and zero-width characters from preview lines'}],
    literals: [],
  },
  {
    id: 'ruling-9',
    section: 'Owner rulings',
    clause: 'Store-level default budgets with per-request overrides.',
    tier: 'default-gate',
    status: 'pinned',
    pins: [{file: LOADER, title: 'a per-request override can only lower the store budget'}],
    literals: [],
  },
  {
    id: 'ruling-10',
    section: 'Owner rulings',
    clause: 'Until the parent wires `load-evidence`, Enter renders the inert not-loaded hint.',
    tier: 'default-gate',
    status: 'superseded',
    pins: [],
    literals: [],
    reason: 'wb-6ze.17 landed the load-evidence wiring; the inert hint was the pre-wiring state. The ruling stays in the docs as history and is never pinned and never counted as passed.',
  },
]);

const FORBIDDEN_MODIFIERS = new Set(['skip', 'todo', 'fails', 'only', 'skipIf', 'runIf']);

interface TitleLocation {
  readonly occurrences: number;
  readonly forbiddenModifiers: readonly string[];
}

/** Locates a case title as a quoted literal and reports how often it occurs and under which call modifiers. */
function locateTitle(source: string, title: string): TitleLocation {
  const callHead = /\b(?:it|test)((?:\.[A-Za-z]+)*)\s*\(/g;
  let occurrences = 0;
  const forbiddenModifiers: string[] = [];
  for (const quote of ['"', "'", '`']) {
    const literal = `${quote}${title}${quote}`;
    let from = source.indexOf(literal);
    while (from !== -1) {
      const before = source.slice(0, from);
      let head: RegExpExecArray | null = null;
      for (const match of before.matchAll(callHead)) head = match;
      const preceding = before.slice(before.search(/\s*\(?\s*$/)).replace(/\s/g, '');
      const isCaseTitle = head !== null && (preceding === '(' || preceding === '');
      if (isCaseTitle) {
        occurrences += 1;
        for (const modifier of (head?.[1] ?? '').split('.').filter(Boolean)) {
          if (FORBIDDEN_MODIFIERS.has(modifier)) forbiddenModifiers.push(modifier);
        }
      }
      from = source.indexOf(literal, from + literal.length);
    }
  }
  return {occurrences, forbiddenModifiers};
}

/** Counts non-overlapping occurrences of a literal in a source text. */
function countLiteral(source: string, literal: string): number {
  let count = 0;
  let from = source.indexOf(literal);
  while (from !== -1) {
    count += 1;
    from = source.indexOf(literal, from + literal.length);
  }
  return count;
}

/** True when a docs line starts with the numbered ruling, so a reworded or renumbered ruling goes red. */
function carriesRuling(docs: string, number: number, text: string): boolean {
  return docs.split('\n').some((line) => line.startsWith(`${number}. ${text}`));
}

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, REPO_ROOT), 'utf8');
}

const RULING_NUMBER = /^ruling-(\d+)$/;

describe('wb-6ze.41 docs/20 UI integration and owner rulings census', () => {
  const docs = read(DOCS_FILE);

  it('holds the seventeen rows: seven UI clauses and ten numbered rulings, each classified', () => {
    expect(CENSUS.map((row) => row.id)).toEqual([
      'ui-1',
      'ui-2',
      'ui-3',
      'ui-4',
      'ui-5',
      'ui-6',
      'ui-7',
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `ruling-${n}`),
    ]);
    for (const row of CENSUS) {
      expect(['UI integration', 'Owner rulings'], `${row.id}: section`).toContain(row.section);
      expect(['default-gate'], `${row.id}: tier`).toContain(row.tier);
      expect(['pinned', 'partial', 'superseded'], `${row.id}: status`).toContain(row.status);
    }
  });

  it('carries every UI clause and every numbered ruling verbatim in the docs under its own heading', () => {
    const uiStart = docs.indexOf('## UI integration');
    const rulingsStart = docs.indexOf('## Owner rulings on the design conflicts');
    expect(uiStart, `${DOCS_FILE}: the "UI integration" heading is gone`).toBeGreaterThanOrEqual(0);
    expect(rulingsStart, `${DOCS_FILE}: the "Owner rulings on the design conflicts" heading is gone`).toBeGreaterThan(uiStart);
    const uiSection = docs.slice(uiStart, rulingsStart);
    const rulingsSection = docs.slice(rulingsStart);
    for (const row of CENSUS) {
      const ruling = RULING_NUMBER.exec(row.id);
      if (ruling === null) {
        expect(uiSection.includes(row.clause), `${row.id}: docs/20 "UI integration" no longer carries the clause "${row.clause}"`).toBe(true);
      } else {
        const number = Number(ruling[1]);
        expect(carriesRuling(rulingsSection, number, row.clause), `${row.id}: docs/20 no longer carries owner ruling ${number} as "${row.clause}"`).toBe(true);
      }
    }
  });

  it('numbers exactly ten rulings in the docs, so an added or dropped ruling goes red', () => {
    const rulingsSection = docs.slice(docs.indexOf('## Owner rulings on the design conflicts'));
    const numbered = rulingsSection.split('\n').filter((line) => /^\d+\. /.test(line));
    expect(numbered).toHaveLength(10);
  });

  it('never counts a partial or superseded row as passed: each carries a reason, and a superseded row holds no pin', () => {
    for (const row of CENSUS) {
      if (row.status === 'pinned') {
        expect(row.pins.length, `${row.id}: pinned rows hold at least one pin`).toBeGreaterThan(0);
      } else {
        expect((row.reason ?? '').trim().length, `${row.id}: ${row.status} rows name a reason`).toBeGreaterThan(20);
      }
      if (row.status === 'superseded') {
        expect(row.pins, `${row.id}: superseded rows hold no pins`).toEqual([]);
        expect(row.literals, `${row.id}: superseded rows hold no literal pins`).toEqual([]);
      }
    }
    const byId = new Map(CENSUS.map((row) => [row.id, row]));
    expect(byId.get('ruling-2')?.status).toBe('partial');
    expect(byId.get('ruling-2')?.reason).toContain('wb-3l3');
    expect(byId.get('ruling-10')?.status).toBe('superseded');
  });

  for (const row of CENSUS.filter((candidate) => candidate.status !== 'superseded')) {
    for (const pin of row.pins) {
      it(`${row.id} (${row.section}: ${row.clause}) stays bound to ${pin.file}: "${pin.title}"`, () => {
        const where = `${row.id} (${row.section}), file ${pin.file}, title "${pin.title}"`;
        const located = locateTitle(read(pin.file), pin.title);
        expect(located.occurrences, `${where}: expected the case exactly once`).toBe(1);
        expect(located.forbiddenModifiers, `${where}: the case is skipped, todo, failing-by-design or focused`).toEqual([]);
      });
    }
    for (const pin of row.literals) {
      it(`${row.id} (${row.section}: ${row.clause}) keeps the literal "${pin.literal}" in ${pin.file}`, () => {
        const where = `${row.id} (${row.section}), file ${pin.file}, literal "${pin.literal}"`;
        expect(countLiteral(read(pin.file), pin.literal), `${where}: the literal is gone`).toBeGreaterThan(0);
      });
    }
  }
});

describe('wb-6ze.41 locator falsifiers (the mutant a rename, delete or skip would be)', () => {
  const live = [
    'describe("suite", () => {',
    '  it("case alpha", () => {});',
    "  it('case beta',async()=>{});",
    '  it.each([1, 2])("case gamma %s", () => {});',
    '});',
  ].join('\n');

  it('finds a live double-quoted, single-quoted (no space after it) and it.each title exactly once', () => {
    expect(locateTitle(live, 'case alpha')).toEqual({occurrences: 1, forbiddenModifiers: []});
    expect(locateTitle(live, 'case beta')).toEqual({occurrences: 1, forbiddenModifiers: []});
    expect(locateTitle(live, 'case gamma %s')).toEqual({occurrences: 1, forbiddenModifiers: []});
  });

  it('goes red on a rename: the old title is no longer present', () => {
    expect(locateTitle(live.replace('case alpha', 'case alpha renamed'), 'case alpha').occurrences).toBe(0);
  });

  it('goes red on a deletion: the case is gone', () => {
    expect(locateTitle(live.replace('  it("case alpha", () => {});\n', ''), 'case alpha').occurrences).toBe(0);
  });

  it('goes red on a duplicate: the title occurs twice', () => {
    expect(locateTitle(`${live}\nit("case alpha", () => {});`, 'case alpha').occurrences).toBe(2);
  });

  it.each(['skip', 'todo', 'fails', 'only'])('goes red on it.%s', (modifier) => {
    const mutated = live.replace('it("case alpha"', `it.${modifier}("case alpha"`);
    expect(locateTitle(mutated, 'case alpha').forbiddenModifiers).toEqual([modifier]);
  });

  it('does not count a title that only appears inside an assertion string', () => {
    expect(locateTitle('expect(x).toBe("case alpha");', 'case alpha').occurrences).toBe(0);
  });
});

describe('wb-6ze.41 docs-drift and literal-pin falsifiers', () => {
  it('goes red on a reworded, renumbered or removed ruling line', () => {
    const line = '9. Store-level default budgets with per-request overrides.';
    expect(carriesRuling(`intro\n${line}\n`, 9, 'Store-level default budgets with per-request overrides.')).toBe(true);
    expect(carriesRuling(`intro\n${line.replace('Store-level', 'Global')}\n`, 9, 'Store-level default budgets with per-request overrides.')).toBe(false);
    expect(carriesRuling(`intro\n${line.replace('9.', '8.')}\n`, 9, 'Store-level default budgets with per-request overrides.')).toBe(false);
    expect(carriesRuling('intro\n', 9, 'Store-level default budgets with per-request overrides.')).toBe(false);
  });

  it('goes red when the "not loaded (Enter)" literal is edited away', () => {
    const source = "expect(first).toContain('not loaded (Enter)');";
    expect(countLiteral(source, 'not loaded (Enter)')).toBe(1);
    expect(countLiteral(source.replace('not loaded (Enter)', 'not loaded'), 'not loaded (Enter)')).toBe(0);
  });
});
