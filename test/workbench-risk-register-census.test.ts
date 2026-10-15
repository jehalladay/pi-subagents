/**
 * wb-cax.26 - docs/workbench/18 "Key risks and mitigations" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds the thirteen rows of the docs/18 risk register to the existing cases embodying
 * each "Mitigation and test" cell, by file and verbatim title. It never executes a pinned case and
 * never claims a live, native or scale pass from a title's presence: `tier` states what kind of
 * evidence the pinned cases are, and a row or half with no deterministic case is `unpinned` or
 * `partial` with a reason, never counted as passed. The it.fails env-canary case in
 * test/workbench-security-workflow.test.ts is a known widening and is never a pin.
 */
import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

const REPO_ROOT = new URL('../', import.meta.url);
const DOCS_FILE = 'docs/workbench/18-decisions-and-risks.md';

type Tier = 'default-gate' | 'live-journey' | 'bench-receipt';
type Status = 'pinned' | 'partial' | 'unpinned';

interface Pin {
  readonly file: string;
  readonly title: string;
  readonly tier: Tier;
}

interface RiskRow {
  readonly row: number;
  readonly risk: string;
  readonly mitigation: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const RISKS: readonly RiskRow[] = Object.freeze([
  {
    row: 1,
    risk: 'Claude Agent SDK versions/messages evolve',
    mitigation: 'pin SDK; explicit message discriminant conformance; diagnostic on unknown',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workbench-claude-topology.test.ts', title: 'classifies a terminal or tool state outside the native vocabulary as unknown and quotes it sanitized', tier: 'default-gate'},
      {file: 'test/workbench-claude-observer.test.ts', title: 'partial stream %s is unknown observation lost, not successful terminal', tier: 'default-gate'},
    ],
    reason: 'Pins the diagnostic-on-unknown and unknown-observation halves. The pin-SDK half has no landed package.json pin case for @anthropic-ai/claude-agent-sdk (test/workbench-vendor-pins.test.ts covers forge, furnace and hyperunix tarballs only); owned by wb-cax.20 (in flight).',
  },
  {
    row: 2,
    risk: 'Pi extension API diverges from upstream',
    mitigation: 'snapshot versions, overlay/command tests, upstream sync gate',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workbench-ui-contract.test.ts', title: 'shows the native operation in keyboard-navigable inspector with source basis', tier: 'default-gate'},
      {file: 'test/workflow-command.test.ts', title: 'registers no top-level /workflows command', tier: 'default-gate'},
    ],
    reason: 'Pins the overlay and command halves. No landed snapshot-versions or upstream-sync-gate case exists; the upstream sync gate half is owned by wb-cax.4 (in flight).',
  },
  {
    row: 3,
    risk: 'Claude script language and fork drift',
    mitigation: 'unchanged real golden fixtures and documented parity deviations',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workflow-claude-code-compat.test.ts', title: 'runs the canonical review-changes example', tier: 'default-gate'},
      {file: 'test/workflow-claude-code-compat.test.ts', title: 'runs the loop-until-budget and static-scaling patterns as written', tier: 'default-gate'},
      {file: 'test/workflow-examples.test.ts', title: 'runs to completion against a stub host', tier: 'default-gate'},
    ],
    reason: 'Pins the unchanged-golden-fixtures half. No case binds the documented parity deviations; owned by wb-cax.7 and wb-cax.11 (in flight).',
  },
  {
    row: 4,
    risk: 'VM escape into host',
    mitigation: 'separate process isolation for untrusted source; host-side authorization and no secret injection',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workbench-security-workflow.test.ts', title: 'caught Function escape probes are realm EvalErrors and never reveal the canary', tier: 'default-gate'},
      {file: 'test/workbench-security-workflow.test.ts', title: 'every injected callable, returned promise and caught error stays in the VM realm', tier: 'default-gate'},
    ],
    reason: 'Pins the realm-escape probes only. The host-closure env canary is a known widening held as it.fails and owned by wb-gs2.2, so it is never a pin or a pass; the credential-boundary half (WB-022: separate process isolation, no secret injection) has no case and is owned by wb-ksz.',
  },
  {
    row: 5,
    risk: 'Effectful node replay duplicates work',
    mitigation: 'native reconciliation, uncertain effect, no blanket retries',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workflow-effect-replay.test.ts', title: 'neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect', tier: 'default-gate'},
      {file: 'test/workbench-furnace-hosted.test.ts', title: 'treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start', tier: 'default-gate'},
    ],
  },
  {
    row: 6,
    risk: 'Source graph conflated with trace',
    mitigation: 'provenance labels and unknown edges, distinguish declared/observed/inferred',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-topology-slice.test.ts', title: 'separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis', tier: 'default-gate'},
      {file: 'test/workbench-topology-slice.test.ts', title: 'reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields', tier: 'default-gate'},
    ],
  },
  {
    row: 7,
    risk: 'UI recomputes full logs at scale',
    mitigation: 'incremental indexes, viewport, coalesced render and benchmark',
    tier: 'bench-receipt',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-observation-perf.test.ts', title: 'retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history', tier: 'default-gate'},
      {file: 'test/workbench-reducer-selector-bench.test.ts', title: 'records a full fold per redraw as a finding with exit 1, never tuned away', tier: 'bench-receipt'},
    ],
    reason: 'Binds the case titles only: a pinned title is not a scale pass and no benchmark receipt is claimed from its presence.',
  },
  {
    row: 8,
    risk: 'Interpreting provider statuses uniformly',
    mitigation: 'source-specific types and evidence, negative test',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-forge-observer.test.ts', title: 'F2: a current failed gate stays failed despite transport success, and current success is success', tier: 'default-gate'},
      {file: 'test/workbench-hyperunix-observer.test.ts', title: 'H2: across all 13 kinds x both licences success appears only with complete coverage and nothing claims "verified"', tier: 'default-gate'},
      {file: 'test/workbench-inspector.test.ts', title: 'status success and missing evidence does not become Verified', tier: 'default-gate'},
    ],
  },
  {
    row: 9,
    risk: 'Furnace nested work capacity deadlock',
    mitigation: 'native scheduling/await policy; admission test',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workbench-registry-admission.test.ts', title: 'refuses unknown, unauthorized, invalid and pre-cancelled requests before admission, even while saturated', tier: 'default-gate'},
    ],
    reason: 'The pin is registry-wide admission, not Furnace slots with parents awaiting children. The native scheduling/await half has no deterministic case: W09/W18 scope.',
  },
  {
    row: 10,
    risk: 'No RF typed render SDK in pinned revision',
    mitigation: 'explicit unavailable block, provider-owned SDK improvement',
    tier: 'default-gate',
    status: 'partial',
    pins: [
      {file: 'test/workbench-reactivefiber-observer.test.ts', title: 'R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render', tier: 'default-gate'},
    ],
    reason: 'The pin labels a fixture seam as not a real render. No deterministic case asserts an explicit unavailable block when the typed render SDK is absent, and the provider-owned SDK improvement is not a test; test/workbench-native-rf-preview.test.ts is an environment-gated live-journey case and is not pinned.',
  },
  {
    row: 11,
    risk: 'Detached mode confused with durability',
    mitigation: 'explicit host guarantees and tests',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-furnace-hosted.test.ts', title: 'states the unsupported Observe operation and the missing durability honestly', tier: 'default-gate'},
      {file: 'test/workbench-detached-faults-receipt.test.ts', title: 'flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal', tier: 'default-gate'},
    ],
  },
  {
    row: 12,
    risk: 'Cross-scope observation leak',
    mitigation: 'scope-aware provider read ACL and payload redaction',
    tier: 'default-gate',
    status: 'pinned',
    pins: [
      {file: 'test/workbench-observation.test.ts', title: 'bounds event, node and edge capacity, keeps payload references instead of bodies, and denies cross-scope queries', tier: 'default-gate'},
      {file: 'test/workbench-topology-slice.test.ts', title: "never reads another tenant's relations and refuses a focus key outside the caller scope", tier: 'default-gate'},
      {file: 'test/workbench-evidence-loader.test.ts', title: 'refuses a cross-scope ref as unauthorized without invoking any loader', tier: 'default-gate'},
      {file: 'test/workbench-security-capability.test.ts', title: 'redacts key-named and JSON-quoted secrets through invoke, inspect and error results', tier: 'default-gate'},
    ],
  },
  {
    row: 13,
    risk: 'Upstream fork history accidentally rewritten',
    mitigation: 'preserve fork history/MIT, deliberate small commits',
    tier: 'default-gate',
    status: 'unpinned',
    pins: [],
    reason: 'No landed LICENSE or fork-origin vitest case exists; owned by wb-cax.21 and wb-cax.22 (in flight). Not counted as passed.',
  },
]);

const TIERS: readonly Tier[] = ['default-gate', 'live-journey', 'bench-receipt'];
const STATUSES: readonly Status[] = ['pinned', 'partial', 'unpinned'];
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

/** A docs table row, rendered the way docs/18 writes it, with the Impact cell left free. */
function tableRowPattern(row: RiskRow): RegExp {
  const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\| ${escapeRegExp(row.risk)} \\| [^|]+ \\| ${escapeRegExp(row.mitigation)} \\|$`, 'm');
}

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, REPO_ROOT), 'utf8');
}

describe('wb-cax.26 docs/18 key-risks census', () => {
  const docs = read(DOCS_FILE);

  it('holds the thirteen rows, each classified, with valid tier and status values', () => {
    expect(RISKS.map((row) => row.row)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    for (const row of RISKS) {
      expect(TIERS, `risk ${row.row} (${row.risk}): tier`).toContain(row.tier);
      expect(STATUSES, `risk ${row.row} (${row.risk}): status`).toContain(row.status);
      for (const pin of row.pins) expect(TIERS, `risk ${row.row} (${row.risk}): pin tier of ${pin.file}`).toContain(pin.tier);
    }
  });

  it('reproduces every Risk cell and every "Mitigation and test" cell verbatim, on one docs row each, in order', () => {
    const section = docs.slice(docs.indexOf('## Key risks and mitigations'));
    expect(section.startsWith('## Key risks and mitigations'), `${DOCS_FILE}: the "Key risks and mitigations" section is gone`).toBe(true);
    expect(section.includes('| Risk | Impact | Mitigation and test |'), `${DOCS_FILE}: the table header drifted`).toBe(true);
    let cursor = 0;
    for (const row of RISKS) {
      const found = tableRowPattern(row).exec(section.slice(cursor));
      expect(found !== null, `risk ${row.row} (${row.risk}): docs/18 no longer carries this Risk cell with this "Mitigation and test" cell "${row.mitigation}" in order`).toBe(true);
      cursor += (found?.index ?? 0) + (found?.[0].length ?? 0);
    }
  });

  it('docs/18 holds exactly thirteen register rows, so a row added without a census row is red', () => {
    const section = docs.slice(docs.indexOf('## Key risks and mitigations'));
    const tableLines = section.split('\n').filter((line) => line.startsWith('|'));
    const dataRows = tableLines.filter((line) => !line.startsWith('| Risk |') && !/^\|\s*-+\s*\|/.test(line));
    expect(dataRows.length, `${DOCS_FILE}: the register row count drifted from the census table (${RISKS.length})`).toBe(RISKS.length);
  });

  it('never counts an unpinned or partial row as passed: it carries a reason, and unpinned rows hold no pins', () => {
    for (const row of RISKS) {
      if (row.status === 'pinned') {
        expect(row.pins.length, `risk ${row.row} (${row.risk}): pinned rows hold at least one pin`).toBeGreaterThan(0);
        continue;
      }
      expect((row.reason ?? '').trim().length, `risk ${row.row} (${row.risk}): ${row.status} rows name a reason`).toBeGreaterThan(20);
      if (row.status === 'unpinned') expect(row.pins, `risk ${row.row} (${row.risk}): unpinned rows hold no pins`).toEqual([]);
      else expect(row.pins.length, `risk ${row.row} (${row.risk}): partial rows hold at least one pin`).toBeGreaterThan(0);
    }
  });

  it('keeps the known-widening it.fails env canary out of every pin', () => {
    for (const row of RISKS) {
      for (const pin of row.pins) {
        expect(pin.title, `risk ${row.row} (${row.risk}): the it.fails canary in ${pin.file} is never a pin`).not.toMatch(/must not reveal even a local canary env variable/);
      }
    }
  });

  it('labels a row bench-receipt only when one of its pins is a bench-receipt case, and never invents a live tier', () => {
    for (const row of RISKS) {
      if (row.pins.length === 0) continue;
      expect(row.pins.map((pin) => pin.tier), `risk ${row.row} (${row.risk}): row tier ${row.tier} has no pin of that tier`).toContain(row.tier);
    }
  });

  for (const row of RISKS.filter((candidate) => candidate.status !== 'unpinned')) {
    for (const pin of row.pins) {
      it(`risk ${row.row} (${row.risk}) stays bound to ${pin.file}: "${pin.title}"`, () => {
        const where = `risk ${row.row} (${row.risk}), file ${pin.file}, title "${pin.title}"`;
        const located = locateTitle(read(pin.file), pin.title);
        expect(located.occurrences, `${where}: expected the case exactly once`).toBe(1);
        expect(located.forbiddenModifiers, `${where}: the case is skipped, todo, failing-by-design or focused`).toEqual([]);
      });
    }
  }
});

describe('wb-cax.26 title locator falsifiers (the mutant a rename, delete or skip would be)', () => {
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

  it('goes red on a docs-drift mutant: a rewritten Mitigation cell no longer matches its row', () => {
    const [first] = RISKS;
    const intact = `| ${first.risk} | impact | ${first.mitigation} |`;
    expect(tableRowPattern(first).test(intact)).toBe(true);
    expect(tableRowPattern(first).test(intact.replace('pin SDK', 'pin the SDK'))).toBe(false);
    expect(tableRowPattern(first).test(intact.replace('Claude Agent SDK', 'Claude Agent SDKs'))).toBe(false);
  });
});
