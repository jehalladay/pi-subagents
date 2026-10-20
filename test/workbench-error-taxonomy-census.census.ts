/**
 * VC-2 / W05 falsifier (wb-6hb.7): the docs/workbench/05 "Error taxonomy" census, a census leg of the wb-nl8 census tier
 * (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE through the shared helper
 * test/helpers/census.ts (judge(.forge/vitest-report.json, pins)).
 *
 * docs/05 "Error taxonomy": "Distinguish (a) syntax/validation error before invocation, (b) capability unavailable,
 * (c) permission denied, (d) transport/runtime failure, (e) producer domain result unsuccessful, (f) uncertain external
 * effect, (g) cancelled/aborted wait, (h) stale observation. Expose typed diagnostics; do not silently return null for
 * every failure." docs/05 "Implemented node error boundary" adds that the host transports a typed CapabilityError with its
 * category across worker RPC and that fatal authorization, validation and uncertain-effect failures are not converted to
 * ordinary null item failures by parallel composition. docs/14 "Truth labels and release gates": "Each major work package
 * must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * Cases embodying the categories exist, but nothing binds the eight categories or the never-silent-null clause to them.
 * This file is that binding: a frozen table of nine rows (eight categories plus the clause), each pinned to landed
 * default-gate cases by file and verbatim title, so a rename, deletion, skip or exclusion of a pinned case leaves the
 * docs claim with a red census instead of a silent one.
 *
 * Judging. This leg executes no pinned case and scans no test source for case calls itself. judge() reads vitest's own JSON
 * report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so
 * a pinned case counts only when the gate's own run collected it exactly once, recorded it passed, and its body asserts -
 * the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered
 * pinned case reads red, naming the row, the file, the title and the cause, as far as the helper's resolvable-construct
 * roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). The parse-aware hand scanner and the
 * config-as-text tier checks this file carried before the adoption (the wb-6hb.7 cut 22f531b) are gone: the report is the
 * tier truth, so a pin file parked in the exclude list is not-collected here instead of passing a text match.
 *
 * Docs. Each docs section is judged through the helper's rendered view (docsSection / sectionMatches): the unique level-2
 * heading under its level-1 parent heading path, bounded at the next level-1/2 heading or EOF, must render as exactly its
 * frozen blocks and carry no HTML. A dropped, reworded or hidden clause names its row; any other edit names the section.
 * The drift falsifiers run over SYNTHETIC documents built from the frozen blocks, never over the live docs text.
 *
 * Frozen shape (rule 16; respin U1 of the g8-gate-s3 refusal). AC1 pins the table's shape as literals copied from the
 * table at the cut's base: the row ids in order, every row's pin and quote counts, every judged (row, file, title)
 * triple, every row's label verbatim and every quote's section and text verbatim. The label and quote literals are
 * written out in full, never derived from the constants the table reads, so shortening the never-silent-null label
 * (which no docs check reads) or one of its boundary quotes (which keeps rendering, and so silently drops the row from
 * the attribution of a mid-sentence weakening) reds AC1. K6 and K7 weaken a mid-sentence clause of each boundary
 * sentence and expect the row named.
 *
 * Judging cost (respin U2; the wb-6hb.9 R546 cure form). Each judge() call re-reads and re-validates the whole report
 * and re-parses every pinned file it touches, so the leg judges every table pin in ONE judge() call, at most once per
 * run (verdictsOf's memo, keyed by file and title), and every AC2 row reads that memo; only a liveness falsifier that
 * judges a deliberately mutated pin makes a call of its own. Every judging case carries the explicit file-local budget
 * JUDGE_BUDGET_MS (sized from a measured p99, see its comment), so no case rides vitest's default 5000 ms; a U2 case pins
 * exactly which cases run under it.
 *
 * Truth label: "fixture pass" only. The census adds no behaviour test for a category; every row here is pinned, and a
 * category whose typed diagnostic goes missing is recorded unpinned in the same commit with a reason, never implemented here.
 */

import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
}

type Where = "taxonomy" | "boundary";

interface Quote {
  /** The docs/05 section the fragment renders in. */
  readonly where: Where;
  readonly text: string;
}

interface TaxonomyRow {
  /** The docs/05 letter a..h, or "never-silent-null" for the closing clause. */
  readonly row: string;
  readonly label: string;
  /** The docs/05 fragments this row covers, each verbatim in a rendered paragraph of its section. */
  readonly quotes: readonly Quote[];
  /** The default gate: the report vouches for it. */
  readonly tier: "default-gate";
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-error-taxonomy-census.census.ts";
const DOC_05 = "docs/workbench/05-script-language-and-runtime.md";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";
const EM_DASH = String.fromCodePoint(0x2014);
const PARENT_05 = `05 ${EM_DASH} Script language compatibility, VM and node() semantics`;
const PARENT_14 = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const HEADING_TAXONOMY = "Error taxonomy";
const HEADING_BOUNDARY = "Implemented node error boundary";
const HEADING_TRUTH = "Truth labels and release gates";

const TAXONOMY_PARAGRAPH =
  "Distinguish (a) syntax/validation error before invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale observation. Expose typed diagnostics; do not silently return null for every failure. Legacy agent() null failure semantics may remain at script boundary, with full detail in observer.";
const BOUNDARY_PARAGRAPH_SOURCE =
  "The host now transports a typed `CapabilityError` with its category across worker RPC. Trusted scripts may identify that error in their own realm; fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition. Native domain outcomes remain returned JSON values. Node options remain display `label` and `phase`; provider deadlines are host policy, not arbitrary script overrides.";
const BOUNDARY_PARAGRAPH_TEXT = BOUNDARY_PARAGRAPH_SOURCE.replaceAll("`", "");
const TRUTH_PARAGRAPH_1 =
  'Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.';
const TRUTH_PARAGRAPH_2 =
  "Use Forge build/test/gates as primary interface; run local relevant Node tests through Forge-configured paths. Never introduce GitHub CI. Pin dependencies, lockfile and package exports.";

const BOUNDARY_RPC = "The host now transports a typed CapabilityError with its category across worker RPC.";
const BOUNDARY_FATAL = "fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition.";

const BLOCKS_TAXONOMY: readonly RenderedBlock[] = [{ kind: "paragraph", text: TAXONOMY_PARAGRAPH, markdown: TAXONOMY_PARAGRAPH }];
const BLOCKS_BOUNDARY: readonly RenderedBlock[] = [{ kind: "paragraph", text: BOUNDARY_PARAGRAPH_TEXT, markdown: BOUNDARY_PARAGRAPH_SOURCE }];
const BLOCKS_TRUTH: readonly RenderedBlock[] = [
  { kind: "paragraph", text: TRUTH_PARAGRAPH_1, markdown: TRUTH_PARAGRAPH_1 },
  { kind: "paragraph", text: TRUTH_PARAGRAPH_2, markdown: TRUTH_PARAGRAPH_2 },
];
const FALSIFIER_SENTENCE = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const NODE_CONTRACT = "test/workbench-node-contract.test.ts";
const REGISTRY_AUTH = "test/workbench-registry-auth.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";

const pin = (file: string, title: string): Pin => ({ file, title });
const taxonomy = (text: string): Quote => ({ where: "taxonomy", text });
const boundary = (text: string): Quote => ({ where: "boundary", text });

/** Freezes the table and everything it holds, so no row, pin or reason can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

const ROWS: readonly TaxonomyRow[] = freezeDeep<readonly TaxonomyRow[]>([
  {
    row: "a",
    label: "syntax/validation error before invocation",
    quotes: [taxonomy("(a) syntax/validation error before invocation")],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(NODE_CONTRACT, "L4: malformed input and non-JSON payload fail before provider effects"), pin(REGISTRY_AUTH, "rejects impersonation options before dispatch")],
  },
  {
    row: "b",
    label: "capability unavailable",
    quotes: [taxonomy("(b) capability unavailable")],
    tier: "default-gate",
    status: "pinned",
    pins: [pin("test/workbench-registry-admission.test.ts", "reaches a workflow script as a typed unavailable CapabilityError while the provider sees only the slot holder")],
  },
  {
    row: "c",
    label: "permission denied",
    quotes: [taxonomy("(c) permission denied")],
    tier: "default-gate",
    status: "pinned",
    pins: [
      pin("test/workbench-control.test.ts", "rule 4: the exact grant control:<provider>.<action> is required verbatim"),
      pin("test/workbench-security-pi-tools.test.ts", "refuses the transcript read with a typed permission message when the grant is absent"),
    ],
  },
  {
    row: "d",
    label: "transport/runtime failure",
    quotes: [taxonomy("(d) transport/runtime failure")],
    tier: "default-gate",
    status: "pinned",
    pins: [pin("test/workbench-furnace-evidence.test.ts", "an abort while the native read is pending rejects as transport, and the abandoned read can never resolve the content")],
  },
  {
    row: "e",
    label: "producer domain result unsuccessful",
    quotes: [taxonomy("(e) producer domain result unsuccessful")],
    tier: "default-gate",
    status: "pinned",
    pins: [pin("test/workbench-forge-observer.test.ts", "F2: a current failed gate stays failed despite transport success, and current success is success")],
  },
  {
    row: "f",
    label: "uncertain external effect",
    quotes: [taxonomy("(f) uncertain external effect")],
    tier: "default-gate",
    status: "pinned",
    pins: [
      pin(EFFECT_REPLAY, "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect"),
      pin(NODE_CONTRACT, "L4: effectful invocation with lost response is reported uncertain, never automatically retried"),
    ],
  },
  {
    row: "g",
    label: "cancelled/aborted wait",
    quotes: [taxonomy("(g) cancelled/aborted wait")],
    tier: "default-gate",
    status: "pinned",
    pins: [pin("test/workbench-claude-cancel-faults.test.ts", "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure")],
  },
  {
    row: "h",
    label: "stale observation",
    quotes: [taxonomy("(h) stale observation")],
    tier: "default-gate",
    status: "pinned",
    pins: [
      pin(EFFECT_REPLAY, "marks a replayed read as stale, never fresh"),
      pin("test/workbench-observation.test.ts", "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
    ],
  },
  {
    row: "never-silent-null",
    label: "do not silently return null for every failure",
    quotes: [taxonomy("Expose typed diagnostics; do not silently return null for every failure."), boundary(BOUNDARY_RPC), boundary(BOUNDARY_FATAL)],
    tier: "default-gate",
    status: "pinned",
    pins: [
      pin(REGISTRY_AUTH, "preserves category and instanceof CapabilityError in a real worker RPC"),
      pin(REGISTRY_AUTH, "reports typed terminal diagnostics and local validation is not swallowed by parallel"),
      pin("test/workflow-runtime.test.ts", "does not let parallel fold a fatal nested error into a null"),
    ],
  },
]);

/** The frozen row ids, in order: the eight categories and the closing clause. */
const EXPECTED_ROW_IDS: readonly string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "never-silent-null"];
/** Rule 16 (frozen shape): "<row>:<pins>:<quotes>" per row, so deleting one pin, dropping a quote or swapping a pin for another row's reads red. */
const EXPECTED_SHAPE: readonly string[] = ["a:2:1", "b:1:1", "c:2:1", "d:1:1", "e:1:1", "f:2:1", "g:1:1", "h:2:1", "never-silent-null:3:3"];
/** Rule 16 (frozen titles): "<row>|<file>|<title>" for every judged case, so swapping a pin for an unrelated passing case in the same file reads red. */
const EXPECTED_JUDGED: readonly string[] = [
  "a|workbench-node-contract.test.ts|L4: malformed input and non-JSON payload fail before provider effects",
  "a|workbench-registry-auth.test.ts|rejects impersonation options before dispatch",
  "b|workbench-registry-admission.test.ts|reaches a workflow script as a typed unavailable CapabilityError while the provider sees only the slot holder",
  "c|workbench-control.test.ts|rule 4: the exact grant control:<provider>.<action> is required verbatim",
  "c|workbench-security-pi-tools.test.ts|refuses the transcript read with a typed permission message when the grant is absent",
  "d|workbench-furnace-evidence.test.ts|an abort while the native read is pending rejects as transport, and the abandoned read can never resolve the content",
  "e|workbench-forge-observer.test.ts|F2: a current failed gate stays failed despite transport success, and current success is success",
  "f|workflow-effect-replay.test.ts|neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
  "f|workbench-node-contract.test.ts|L4: effectful invocation with lost response is reported uncertain, never automatically retried",
  "g|workbench-claude-cancel-faults.test.ts|F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
  "h|workflow-effect-replay.test.ts|marks a replayed read as stale, never fresh",
  "h|workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "never-silent-null|workbench-registry-auth.test.ts|preserves category and instanceof CapabilityError in a real worker RPC",
  "never-silent-null|workbench-registry-auth.test.ts|reports typed terminal diagnostics and local validation is not swallowed by parallel",
  "never-silent-null|workflow-runtime.test.ts|does not let parallel fold a fatal nested error into a null",
];
/** The eight docs/05 categories, in docs order: a new (i) in the docs has no row and goes red. */
const EXPECTED_CATEGORIES: readonly string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
/**
 * Rule 16 (frozen labels, respin U1): "<row>|<label>" for every row, written out in full. The never-silent-null label is
 * read by no docs check, so a shortened label reads red here (and in AC1's label-in-quote check) or nowhere.
 */
const EXPECTED_LABELS: readonly string[] = [
  "a|syntax/validation error before invocation",
  "b|capability unavailable",
  "c|permission denied",
  "d|transport/runtime failure",
  "e|producer domain result unsuccessful",
  "f|uncertain external effect",
  "g|cancelled/aborted wait",
  "h|stale observation",
  "never-silent-null|do not silently return null for every failure",
];
/**
 * Rule 16 (frozen quotes, respin U1): "<row>|<section>|<text>" for every quote of every row, written out in full. A
 * shortened quote still renders, so the docs checks stay green while a weakening of the clause it dropped no longer names
 * the row; only this literal sees the shortening itself.
 */
const EXPECTED_QUOTES: readonly string[] = [
  "a|taxonomy|(a) syntax/validation error before invocation",
  "b|taxonomy|(b) capability unavailable",
  "c|taxonomy|(c) permission denied",
  "d|taxonomy|(d) transport/runtime failure",
  "e|taxonomy|(e) producer domain result unsuccessful",
  "f|taxonomy|(f) uncertain external effect",
  "g|taxonomy|(g) cancelled/aborted wait",
  "h|taxonomy|(h) stale observation",
  "never-silent-null|taxonomy|Expose typed diagnostics; do not silently return null for every failure.",
  "never-silent-null|boundary|The host now transports a typed CapabilityError with its category across worker RPC.",
  "never-silent-null|boundary|fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition.",
];
/** The mid-sentence clause of the typed CapabilityError sentence K6 weakens, and its weakened form. */
const RPC_CLAUSE = "with its category across worker RPC";
const RPC_WEAKENED = "without its category across worker RPC";
/** The head clause of the parallel-composition sentence K7 weakens (one failure class dropped), and its weakened form. */
const FATAL_CLAUSE = "fatal authorization, validation and uncertain-effect failures";
const FATAL_WEAKENED = "fatal authorization and uncertain-effect failures";

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });
const shapeOf = (row: TaxonomyRow): string => `${row.row}:${row.pins.length}:${row.quotes.length}`;
const judgedOf = (rows: readonly TaxonomyRow[]): string[] => rows.flatMap(row => row.pins.map(entry => `${row.row}|${basename(entry.file)}|${entry.title}`));
const labelOf = (row: TaxonomyRow): string => `${row.row}|${row.label}`;
const quotesOf = (row: TaxonomyRow): string[] => row.quotes.map(quote => `${row.row}|${quote.where}|${quote.text}`);
/** The rows whose label is not a clause of their own taxonomy quote: the read that makes a shortened label red. */
const labelsOutsideQuotes = (rows: readonly TaxonomyRow[]): string[] =>
  rows.filter(row => !row.quotes.some(quote => quote.where === "taxonomy" && quote.text.includes(row.label))).map(row => row.row);

const JUDGED_ROWS = ROWS.filter(row => row.pins.length > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: TaxonomyRow, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}: ${verdict.code}: ${verdict.why}`);

/**
 * The explicit budget of every judging case in this file (respin U2), file-local so no other census file's budget moves.
 * Sized as 5 x the measured p99 of the costliest judging case (U2's one table judgment), rounded up to a whole 5 s.
 * Measured 2026-10-20 against a full default-tier report (321 files, 12603 tests) on the shared fleet host with other
 * lanes live: this file alone, 8 sequential (load1 381-432) p99 6346 ms and 16 at 8-way (load1 391-397) p99 8562 ms;
 * 16 whole census-tier runs, 8 sequential (load1 300-366) p99 6682 ms and 8 at 2-way (load1 333-507) p99 12659 ms. The
 * table judgment ran over vitest's default 5000 ms in 31 of those 40 runs, and no judging case reached 30000 ms.
 * 5 x 12659 ms = 63295 ms, rounded up to 65000 ms.
 */
const JUDGE_BUDGET_MS = 65_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The cases that run under JUDGE_BUDGET_MS, by title head: U2's table judgment, AC2 per row and the five liveness falsifiers. */
const EXPECTED_BUDGETED: readonly string[] = [
  "U2 memo",
  "AC2 row 'a'",
  "AC2 row 'b'",
  "AC2 row 'c'",
  "AC2 row 'd'",
  "AC2 row 'e'",
  "AC2 row 'f'",
  "AC2 row 'g'",
  "AC2 row 'h'",
  "AC2 row 'never-silent-null'",
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
];

/** A pin's identity for the memo: its verdict depends on the file and the title (the tier is the default gate's). */
const pinKey = (entry: Pin): string => JSON.stringify([entry.file, entry.title]);
/** U2 memo: every verdict verdictsOf judged this run, by pin identity, so no pin is judged twice per run. */
const verdictMemo = new Map<string, PinVerdict>();
/** The judge() calls verdictsOf made this run: U2 pins that the table is judged once and a row read judges nothing. */
let memoJudgeCalls = 0;

/** Every pin's verdict in pin order; the pins this run has not judged yet are judged together, in ONE judge() call. */
function verdictsOf(pins: readonly Pin[]): readonly PinVerdict[] {
  const fresh = [...new Map(pins.filter(entry => !verdictMemo.has(pinKey(entry))).map(entry => [pinKey(entry), entry] as const)).values()];
  if (fresh.length > 0) {
    memoJudgeCalls += 1;
    const judged = judge(
      REPORT,
      fresh.map(entry => casePin(entry)),
    );
    fresh.forEach((entry, index) => {
      const verdict = judged[index];
      if (verdict !== undefined) verdictMemo.set(pinKey(entry), verdict);
    });
  }
  return pins.flatMap(entry => {
    const verdict = verdictMemo.get(pinKey(entry));
    return verdict === undefined ? [] : [verdict];
  });
}

/** Every table pin, in table order. */
const TABLE_PINS: readonly Pin[] = ROWS.flatMap(row => row.pins);
/** A row's verdicts from the memo; the first read judges the whole table in one call, so no row takes a judge() call of its own. */
function judgeRow(row: Pick<TaxonomyRow, "pins">): readonly PinVerdict[] {
  verdictsOf(TABLE_PINS);
  return verdictsOf(row.pins);
}

/** The rendered paragraph texts of a section's blocks. */
const paragraphTexts = (blocks: readonly RenderedBlock[]): string[] => blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : []));

/** The (letter, label) categories the taxonomy paragraph enumerates, in docs order. */
function categoriesIn(text: string): { letter: string; label: string }[] {
  const out: { letter: string; label: string }[] = [];
  for (const match of text.matchAll(/\(([a-z])\) ([^,.]+)/g)) out.push({ letter: match[1] ?? "", label: match[2] ?? "" });
  return out;
}

/** docs/05 drifts, each naming the row or the section it breaks. The per-row quote checks run independently of the exactness checks. */
function docs05Failures(markdown: string, rows: readonly TaxonomyRow[] = ROWS): string[] {
  const out: string[] = [];
  const sections: { where: Where; heading: string; blocks: readonly RenderedBlock[] }[] = [
    { where: "taxonomy", heading: HEADING_TAXONOMY, blocks: BLOCKS_TAXONOMY },
    { where: "boundary", heading: HEADING_BOUNDARY, blocks: BLOCKS_BOUNDARY },
  ];
  for (const { where, heading, blocks } of sections) {
    const section = docsSection(markdown, heading, 2, [PARENT_05]);
    if (!section.ok) {
      out.push(`${DOC_05} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const rendered = paragraphTexts(section.blocks);
    for (const row of rows) {
      for (const quote of row.quotes) {
        if (quote.where === where && !rendered.some(text => text.includes(quote.text))) out.push(`row ${row.row}: its quote "${quote.text}" no longer renders in ${DOC_05} § ${heading}`);
      }
    }
    const exact = sectionMatches(section, blocks);
    if (!exact.ok) out.push(`${DOC_05} § ${heading} is not exactly its frozen blocks: ${exact.why}`);
  }
  return out;
}

/** docs/14 drifts: the falsifier sentence must render in the exactly-pinned section body. */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, HEADING_TRUTH, 2, [PARENT_14]);
  if (!section.ok) return [`${DOC_14} § ${HEADING_TRUTH}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (!paragraphTexts(section.blocks).some(text => text.includes(FALSIFIER_SENTENCE))) out.push(`${DOC_14} § ${HEADING_TRUTH}: the falsifier sentence no longer renders`);
  const exact = sectionMatches(section, BLOCKS_TRUTH);
  if (!exact.ok) out.push(`${DOC_14} § ${HEADING_TRUTH} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic docs/05 the drift falsifiers run over: the frozen paragraphs under the real heading shape, never the live text. */
const synthetic05 = (edit: (taxonomyText: string, boundaryText: string) => { taxonomy?: string; boundary?: string } = () => ({}), tail = ""): string => {
  const changed = edit(TAXONOMY_PARAGRAPH, BOUNDARY_PARAGRAPH_SOURCE);
  return `# ${PARENT_05}\n\n## Compatibility obligation\n\nText.\n\n## ${HEADING_TAXONOMY}\n\n${changed.taxonomy ?? TAXONOMY_PARAGRAPH}\n${tail}\n## Security note\n\nText.\n\n## Conformance\n\nText.\n\n## ${HEADING_BOUNDARY}\n\n${changed.boundary ?? BOUNDARY_PARAGRAPH_SOURCE}\n`;
};
const synthetic14 = (edit: (first: string, second: string) => string = (first, second) => `${first}\n\n${second}`, tail = ""): string =>
  `# ${PARENT_14}\n\n## Matrix by subsystem\n\nRows.\n\n## ${HEADING_TRUTH}\n\n${edit(TRUTH_PARAGRAPH_1, TRUTH_PARAGRAPH_2)}\n${tail}\n## Performance benchmark\n\nText.\n`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-6hb.7 docs/workbench/05 error-taxonomy census (report mode)", () => {
  it("AC1: the table holds the nine frozen rows in order, deeply frozen, with the frozen per-row pin shape and the frozen judged titles", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.row)).toEqual(EXPECTED_ROW_IDS);
    expect(new Set(ROWS.map(row => row.row)).size).toBe(ROWS.length);
    expect(ROWS).toHaveLength(9);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(ROWS)).toEqual(EXPECTED_JUDGED);
    expect(JUDGED_ROWS).toHaveLength(9);
  });

  it("AC1: every row's label and every quote's section and text are frozen verbatim, and every label is a clause of its taxonomy quote (rule 16, respin U1)", () => {
    expect(ROWS.map(labelOf), "row|label over the whole table").toEqual(EXPECTED_LABELS);
    expect(ROWS.flatMap(quotesOf), "row|section|text over every quote").toEqual(EXPECTED_QUOTES);
    expect(labelsOutsideQuotes(ROWS), "rows whose label is not part of their taxonomy quote").toEqual([]);
  });

  it("AC1: every row is pinned on the default gate and names a verbatim quote; an unpinned row would carry a reason", () => {
    for (const row of ROWS) {
      expect(row.tier, row.row).toBe("default-gate");
      expect(row.status, row.row).toBe("pinned");
      expect(row.pins.length, row.row).toBeGreaterThan(0);
      expect(row.quotes.length, row.row).toBeGreaterThan(0);
      expect(row.reason, `${row.row}: a pinned row carries no unpinned reason`).toBeUndefined();
    }
  });

  it("AC1: the live docs/05 sections render exactly their frozen blocks, HTML-free, and no docs drift names a row", () => {
    const markdown = readRepo(DOC_05);
    const taxonomySection = docsSection(markdown, HEADING_TAXONOMY, 2, [PARENT_05]);
    const boundarySection = docsSection(markdown, HEADING_BOUNDARY, 2, [PARENT_05]);
    expect(sectionMatches(taxonomySection, BLOCKS_TAXONOMY)).toEqual({ ok: true, why: "" });
    expect(sectionMatches(boundarySection, BLOCKS_BOUNDARY)).toEqual({ ok: true, why: "" });
    expect(taxonomySection.hasHtml).toBe(false);
    expect(boundarySection.hasHtml).toBe(false);
    expect(docs05Failures(markdown)).toEqual([]);
  });

  it("AC1: the live docs/14 'Truth labels and release gates' section renders exactly its frozen body and keeps the falsifier sentence", () => {
    const markdown = readRepo(DOC_14);
    const section = docsSection(markdown, HEADING_TRUTH, 2, [PARENT_14]);
    expect(sectionMatches(section, BLOCKS_TRUTH)).toEqual({ ok: true, why: "" });
    expect(section.hasHtml).toBe(false);
    expect(docs14Failures(markdown)).toEqual([]);
  });

  it("AC1: the taxonomy paragraph enumerates exactly the eight frozen categories and each row quote is its '(letter) label' fragment, so a new docs category goes red", () => {
    const section = docsSection(readRepo(DOC_05), HEADING_TAXONOMY, 2, [PARENT_05]);
    const text = paragraphTexts(section.blocks).join(" ");
    const categories = categoriesIn(text);
    expect(categories.map(entry => entry.letter)).toEqual(EXPECTED_CATEGORIES);
    for (const { letter, label } of categories) {
      const row = ROWS.find(candidate => candidate.row === letter);
      expect(row, `docs/05 category (${letter}) has no census row`).toBeDefined();
      expect(row?.label, `row ${letter} label`).toBe(label);
      expect(row?.quotes.map(quote => quote.text), `row ${letter} quote`).toEqual([`(${letter}) ${label}`]);
    }
    expect(ROWS.filter(row => row.row !== "never-silent-null").map(row => row.row)).toEqual(EXPECTED_CATEGORIES);
  });

  it("U2 memo: one judge() call judges every table pin, at most once per run, and re-reading the table or any row judges nothing", JUDGING, () => {
    expect(TABLE_PINS).toHaveLength(EXPECTED_JUDGED.length);
    const before = memoJudgeCalls;
    const verdicts = verdictsOf(TABLE_PINS);
    expect(verdicts).toHaveLength(TABLE_PINS.length);
    expect(memoJudgeCalls - before, "the whole table takes one judge() call, or none once judged").toBeLessThanOrEqual(1);
    const judged = memoJudgeCalls;
    expect(verdictsOf(TABLE_PINS)).toEqual(verdicts);
    expect(memoJudgeCalls - judged, "a second read of the table judges nothing").toBe(0);
    for (const row of ROWS) expect(judgeRow(row)).toHaveLength(row.pins.length);
    expect(memoJudgeCalls - judged, "a read of every row judges nothing").toBe(0);
  });

  it("U2 budget: exactly the judging cases carry the file-local budget, and it is above vitest's default 5000 ms", ({ task }) => {
    const budgeted: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.timeout === JUDGE_BUDGET_MS) budgeted.push(child.name.slice(0, child.name.indexOf(":")));
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(budgeted, "the cases that run under JUDGE_BUDGET_MS, by title head").toEqual(EXPECTED_BUDGETED);
  });

  it.each(JUDGED_ROWS.map(row => ({ row })))("AC2 row $row.row: every named default-gate case is collected once, passed and asserting in the gate's own report", JUDGING, ({ row }) => {
    const verdicts = judgeRow(row);
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, reads no forge.toml and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = ROWS.flatMap(row => row.pins.map(entry => basename(entry.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6hb.7 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: TaxonomyRow; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.row === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", JUDGING, () => {
    const { row, entry } = firstPin("d");
    const wrong = { ...entry, title: entry.title.replace("abandoned", "abandonEd") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row d:");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    const { entry } = firstPin("g");
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M3: a file the default config excludes is never in the default report: a pin there is red, not collected", JUDGING, () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-rf-preview.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M4: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", JUDGING, () => {
    const { entry } = firstPin("e");
    const [verdict] = judge(REPORT, [casePin({ file: "test/workbench-claude-cancel-faults.test.ts", title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M5: a pin claimed under a non-default tier is refused by the default report (a live-tier label is never vouched here)", JUDGING, () => {
    const { entry } = firstPin("c");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "forge-command" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-6hb.7 rule 16 / O1 / O2: hollowing the table reddens the frozen literals", () => {
  const withRow = (id: string, edit: (row: TaxonomyRow) => TaxonomyRow): readonly TaxonomyRow[] => ROWS.map(row => (row.row === id ? edit(row) : row));

  it("H1: deleting one pin of a multi-pin row changes the shape literal and the judged-title literal", () => {
    const mutated = withRow("never-silent-null", row => ({ ...row, pins: row.pins.slice(1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
  });

  it("H2: deleting the only pin of a single-pin row (the O2 security-style removal) changes both literals", () => {
    const mutated = withRow("c", row => ({ ...row, pins: row.pins.slice(1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    const permission = withRow("c", row => ({ ...row, pins: [] }));
    expect(permission.filter(row => row.pins.length > 0)).toHaveLength(8);
  });

  it("H3: shortening a requirement phrase changes the quote the docs check binds", () => {
    const mutated = withRow("never-silent-null", row => ({ ...row, quotes: row.quotes.slice(0, 1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    const shortened = withRow("a", row => ({ ...row, quotes: [taxonomy("(a) syntax/validation error")] }));
    expect(shortened.find(row => row.row === "a")?.quotes[0]?.text).not.toBe("(a) syntax/validation error before invocation");
    expect(docs05Failures(readRepo(DOC_05))).toEqual([]);
  });

  it("H4: swapping a pin for an unrelated passing case in the same file keeps the shape but changes the judged-title literal", () => {
    const mutated = withRow("f", row => ({ ...row, pins: [pin(EFFECT_REPLAY, "marks a replayed read as stale, never fresh"), ...row.pins.slice(1)] }));
    expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
  });

  it("H5: emptying the table leaves neither the row-id list nor the judged literal standing (O1 each-liveness)", () => {
    expect([].map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf([])).not.toEqual(EXPECTED_JUDGED);
    expect(ROWS.map(row => row.row).filter(id => EXPECTED_ROW_IDS.includes(id))).toEqual(EXPECTED_ROW_IDS);
  });

  it("H6: removing a row from the table fails the row-set pin", () => {
    expect(ROWS.filter(row => row.row !== "never-silent-null").map(row => row.row)).not.toEqual(EXPECTED_ROW_IDS);
  });

  it("H7: shortening the never-silent-null label (the GT5b shape) keeps the count and title literals but changes the label literal and leaves the label outside its quote", () => {
    const mutated = withRow("never-silent-null", row => ({ ...row, label: "do not return null" }));
    expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).toEqual(EXPECTED_JUDGED);
    expect(mutated.map(labelOf)).not.toEqual(EXPECTED_LABELS);
    expect(labelsOutsideQuotes(mutated)).toEqual(["never-silent-null"]);
  });

  it("H8: shortening any quote of any row by its last word keeps the count literal but changes the quote literal (the GT5 / GT5c / GT5d shapes)", () => {
    let shortened = 0;
    for (const row of ROWS) {
      row.quotes.forEach((quote, index) => {
        const text = quote.text.slice(0, quote.text.lastIndexOf(" "));
        const mutated = withRow(row.row, entry => ({ ...entry, quotes: entry.quotes.map((other, at) => (at === index ? { ...other, text } : other)) }));
        expect(mutated.map(shapeOf), `row ${row.row} quote ${index + 1}`).toEqual(EXPECTED_SHAPE);
        expect(mutated.flatMap(quotesOf), `row ${row.row} quote ${index + 1}`).not.toEqual(EXPECTED_QUOTES);
        shortened += 1;
      });
    }
    expect(shortened).toBe(EXPECTED_QUOTES.length);
  });

  it("H9: a boundary quote shortened to its head (the GT5d shape) still renders, so the K6 weakening no longer names the row: only the quote literal sees it", () => {
    const head = "The host now transports a typed CapabilityError";
    const mutated = withRow("never-silent-null", row => ({ ...row, quotes: row.quotes.map(quote => (quote.text === BOUNDARY_RPC ? boundary(head) : quote)) }));
    expect(mutated.flatMap(quotesOf)).not.toEqual(EXPECTED_QUOTES);
    const weakened = synthetic05((_text, boundaryText) => ({ boundary: boundaryText.replace(RPC_CLAUSE, RPC_WEAKENED) }));
    expect(named(docs05Failures(weakened))).toEqual(["row never-silent-null"]);
    expect(named(docs05Failures(weakened, mutated))).toEqual([]);
  });
});

describe("wb-6hb.7 docs drift names the row or the section (synthetic documents, rendered view)", () => {
  it("accepts both docs/05 sections exactly as written, and the boundary section at EOF", () => {
    expect(docs05Failures(synthetic05())).toEqual([]);
    expect(docs14Failures(synthetic14())).toEqual([]);
  });

  it("K1 names category (b) (and only it) when its clause is dropped from the taxonomy paragraph", () => {
    const lines = docs05Failures(synthetic05(text => ({ taxonomy: text.replace(" (b) capability unavailable,", "") })));
    expect(named(lines)).toEqual(["row b"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names category (h) (and only it) when 'stale observation' is reworded", () => {
    expect(named(docs05Failures(synthetic05(text => ({ taxonomy: text.replace("(h) stale observation", "(h) old observation") }))))).toEqual(["row h"]);
  });

  it("K3 names the never-silent-null row (and only it) when its clause is weakened", () => {
    expect(named(docs05Failures(synthetic05(text => ({ taxonomy: text.replace("do not silently return null for every failure", "null is acceptable for some failures") }))))).toEqual(["row never-silent-null"]);
  });

  it("K4 names the never-silent-null row when the boundary sentence about parallel composition is weakened", () => {
    const lines = docs05Failures(synthetic05((_text, boundaryText) => ({ boundary: boundaryText.replace("are not converted to ordinary null item failures by parallel composition", "may be converted to null item failures by parallel composition") })));
    expect(named(lines)).toEqual(["row never-silent-null"]);
  });

  it("K5 names the never-silent-null row when the typed CapabilityError sentence is dropped from the boundary section", () => {
    const lines = docs05Failures(synthetic05((_text, boundaryText) => ({ boundary: boundaryText.replace("The host now transports a typed `CapabilityError` with its category across worker RPC. ", "") })));
    expect(named(lines)).toEqual(["row never-silent-null"]);
  });

  it("K6 names the never-silent-null row (and only it) when a mid-sentence clause of the typed CapabilityError sentence is weakened (respin U1)", () => {
    const lines = docs05Failures(synthetic05((_text, boundaryText) => ({ boundary: boundaryText.replace(RPC_CLAUSE, RPC_WEAKENED) })));
    expect(named(lines)).toEqual(["row never-silent-null"]);
    expect(lines.some(line => line.includes(`${HEADING_BOUNDARY} is not exactly its frozen blocks`))).toBe(true);
  });

  it("K7 names the never-silent-null row (and only it) when the parallel-composition sentence drops a failure class from its head clause (respin U1)", () => {
    const lines = docs05Failures(synthetic05((_text, boundaryText) => ({ boundary: boundaryText.replace(FATAL_CLAUSE, FATAL_WEAKENED) })));
    expect(named(lines)).toEqual(["row never-silent-null"]);
    expect(lines.some(line => line.includes(`${HEADING_BOUNDARY} is not exactly its frozen blocks`))).toBe(true);
  });

  it("D1 goes red on the taxonomy section, naming no row, when a sentence is appended", () => {
    const lines = docs05Failures(synthetic05(text => ({ taxonomy: `${text} Failures may be dropped.` })));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${HEADING_TAXONOMY} is not exactly its frozen blocks`);
  });

  it("D2 goes red when a second paragraph is added to the taxonomy section", () => {
    const lines = docs05Failures(synthetic05(undefined, "\nA host may skip any category.\n"));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D3 goes red when the taxonomy heading is renamed away", () => {
    const lines = docs05Failures(synthetic05().replace(`## ${HEADING_TAXONOMY}`, "## Error notes"));
    expect(lines.some(line => line.includes(`${HEADING_TAXONOMY}: the section is refused`))).toBe(true);
  });

  it("D4 goes red when a weakening ### subsection is appended inside the taxonomy section", () => {
    const lines = docs05Failures(synthetic05(undefined, "\n### Exceptions\n\nA host may return null for any failure.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 names category (g) when its clause is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docs05Failures(synthetic05(text => ({ taxonomy: text.replace("(g) cancelled/aborted wait", "<!-- (g) cancelled/aborted wait -->") })));
    expect(named(lines)).toEqual(["row g"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the taxonomy section (the normative parent path is bound)", () => {
    const lines = docs05Failures(synthetic05().replace(`## ${HEADING_TAXONOMY}`, `# Appendix\n\n## ${HEADING_TAXONOMY}`));
    expect(lines.some(line => line.includes(`${HEADING_TAXONOMY}: the section is refused`))).toBe(true);
  });

  it("D7 goes red when an HTML comment opened before the taxonomy heading and closed after the next heading hides the section", () => {
    const hidden = synthetic05().replace(`## ${HEADING_TAXONOMY}`, `<!--\n## ${HEADING_TAXONOMY}`).replace("## Security note", "-->\n## Security note");
    expect(docs05Failures(hidden).some(line => line.includes(`${HEADING_TAXONOMY}: the section is refused`))).toBe(true);
  });

  it("D8 goes red when a code fence opened before the boundary heading and closed after hides the section from the rendered view", () => {
    const hidden = synthetic05().replace(`## ${HEADING_BOUNDARY}`, `\`\`\`\n## ${HEADING_BOUNDARY}`).concat("```\n");
    expect(docs05Failures(hidden).some(line => line.includes(`${HEADING_BOUNDARY}: the section is refused`))).toBe(true);
  });

  it("D9 goes red on the boundary section when a sentence is appended", () => {
    const lines = docs05Failures(synthetic05((_text, boundaryText) => ({ boundary: `${boundaryText} Hosts may swallow errors.` })));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${HEADING_BOUNDARY} is not exactly its frozen blocks`);
  });

  it("T1 docs/14: the falsifier sentence moved into an HTML comment is red", () => {
    const lines = docs14Failures(synthetic14(first => `${first.replace(FALSIFIER_SENTENCE, `<!-- ${FALSIFIER_SENTENCE} -->`)}\n\n${TRUTH_PARAGRAPH_2}`));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("falsifier sentence no longer renders") || line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("T2 docs/14: a weakening paragraph appended inside the section is red", () => {
    const lines = docs14Failures(synthetic14(undefined, "\nA falsifier is optional for work packages that look safe.\n"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("T3 docs/14: the falsifier sentence reworded is red on both the sentence check and the section", () => {
    const lines = docs14Failures(synthetic14(first => `${first.replace("must have a falsifier", "may have a falsifier")}\n\n${TRUTH_PARAGRAPH_2}`));
    expect(lines).toHaveLength(2);
  });

  it("T4 docs/14: a level-1 heading inserted above re-homes the section and is red", () => {
    const lines = docs14Failures(synthetic14().replace(`## ${HEADING_TRUTH}`, `# Appendix\n\n## ${HEADING_TRUTH}`));
    expect(lines.some(line => line.includes(`${HEADING_TRUTH}: the section is refused`))).toBe(true);
  });

  it("an edit of any other section never reddens a row: the compatibility, security and benchmark sections are free to change", () => {
    expect(docs05Failures(synthetic05().replace("Text.", "Text, changed."))).toEqual([]);
    expect(docs14Failures(synthetic14().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});
