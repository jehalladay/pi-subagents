/**
 * wb-0kg.11 - docs/workbench/08 "Adversarial test matrix" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds the nine scenarios of the docs/08 matrix sentence to existing cases by file and
 * verbatim title. It never executes a pinned case and never claims a live, native or scale pass
 * from a title's presence: `tier` states what kind of evidence a pinned case is, and a scenario
 * with no deterministic case is `unpinned` with a reason, never counted as passed.
 */
import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

const REPO_ROOT = new URL('../', import.meta.url);
const DOCS_FILE = 'docs/workbench/08-lifecycle-and-recovery.md';

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
    reason: 'Covers the Run-ID-less start refusing a blind second start; the Work-retry variant is wb-0kg.4.',
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
    tier: 'live-journey',
    status: 'unpinned',
    pins: [],
    reason: 'No deterministic Pi-restart-while-detached-continues case exists in test/workbench-local-detached* or test/workbench-detached*; the journey is live-tier work tracked by wb-0kg.3.',
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
    ],
    reason: 'Pins only the no-implicit-mass-cancellation half (observers never issue control); the two-reader shared-child case is wb-0kg.7 and is not yet a case.',
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

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, REPO_ROOT), 'utf8');
}

describe('wb-0kg.11 docs/08 adversarial matrix census', () => {
  const docs = read(DOCS_FILE);

  it('holds the nine scenarios, each classified, with valid outcome and tier values', () => {
    expect(MATRIX.map((row) => row.scenario)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const row of MATRIX) {
      expect(OUTCOMES, `scenario ${row.scenario}: requiredOutcome`).toContain(row.requiredOutcome);
      expect(['default-gate', 'live-journey', 'bench-receipt'], `scenario ${row.scenario}: tier`).toContain(row.tier);
      expect(['pinned', 'unpinned'], `scenario ${row.scenario}: status`).toContain(row.status);
    }
  });

  it('reproduces the docs/08 matrix sentence and the required-outcomes sentence verbatim from the rows', () => {
    const matrixSentence = `${MATRIX.map((row) => row.quote).join('; ')}.`;
    for (const row of MATRIX) {
      expect(docs.includes(row.quote), `scenario ${row.scenario}: docs/08 no longer carries the clause "${row.quote}"`).toBe(true);
    }
    expect(docs.includes(`${matrixSentence} ${REQUIRED_OUTCOMES_SENTENCE}`), `${DOCS_FILE}: the matrix sentence and the Required outcomes sentence drifted from the census table`).toBe(true);
  });

  it('never counts an unpinned scenario as passed: it carries a reason and no pins', () => {
    for (const row of MATRIX) {
      if (row.status === 'unpinned') {
        expect(row.pins, `scenario ${row.scenario}: unpinned rows hold no pins`).toEqual([]);
        expect((row.reason ?? '').trim().length, `scenario ${row.scenario}: unpinned rows name a reason`).toBeGreaterThan(20);
      } else {
        expect(row.pins.length, `scenario ${row.scenario}: pinned rows hold at least one pin`).toBeGreaterThan(0);
      }
    }
  });

  for (const row of MATRIX.filter((candidate) => candidate.status === 'pinned')) {
    for (const pin of row.pins) {
      it(`scenario ${row.scenario} (${row.quote}) stays bound to ${pin.file}: "${pin.title}"`, () => {
        const where = `scenario ${row.scenario}, file ${pin.file}, title "${pin.title}"`;
        const located = locateTitle(read(pin.file), pin.title);
        expect(located.occurrences, `${where}: expected the case exactly once`).toBe(1);
        expect(located.forbiddenModifiers, `${where}: the case is skipped, todo, failing-by-design or focused`).toEqual([]);
      });
    }
  }
});

describe('wb-0kg.11 title locator falsifiers (the mutant a rename, delete or skip would be)', () => {
  const live = [
    'describe("suite", () => {',
    '  it("case alpha", () => {});',
    "  it('case beta', async () => {});",
    '  it.each([1, 2])("case gamma %s", () => {});',
    '});',
  ].join('\n');

  it('finds a live double-quoted, single-quoted and it.each title exactly once', () => {
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

  it('goes red on test.skip and on it.skip.each', () => {
    expect(locateTitle('test.skip("case delta", () => {});', 'case delta').forbiddenModifiers).toEqual(['skip']);
    expect(locateTitle('it.skip.each([1])("case delta %s", () => {});', 'case delta %s').forbiddenModifiers).toEqual(['skip']);
  });

  it('does not count a title that only appears inside an assertion string', () => {
    expect(locateTitle('expect(x).toBe("case alpha");', 'case alpha').occurrences).toBe(0);
  });
});
