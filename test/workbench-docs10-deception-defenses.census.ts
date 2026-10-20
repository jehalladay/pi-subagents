/**
 * wb-6ze.38 (VC-5/W15): census falsifier for the "Failure and deception defenses" section of
 * docs/workbench/10-terminal-inspector.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (the post-nl8
 * adoption cut: judge(.forge/vitest-report.json, pins) through the shared helper test/helpers/census.ts); it replaces the
 * hand-scanned test/workbench-deception-defenses-census.test.ts of the earlier cut.
 *
 * The section states five honesty defenses as five sentences of one paragraph. This leg binds each sentence to two
 * landed fixture cases by file and verbatim title. It executes no pinned case: judge() reads vitest's own JSON report of
 * the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned
 * case counts only when the gate's own run collected it exactly once, recorded it passed, and its body asserts - the
 * helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered
 * pinned case therefore reads red, naming the row, the file, the title and the cause, as far as the helper's
 * resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md).
 *
 * Own reads (respin U3, re-trued): this leg's own code scans no test source for case calls, imports no child_process and
 * loads no module at runtime. The files it reads itself, through readRepo, are exactly docs/10, docs/14 and
 * vitest.census.config.ts; the closing tally case pins that set, so a readRepo read of forge.toml (or of any other file)
 * reds it. Residual (named): a read that bypasses readRepo is outside the tally, as sourceStructure reports imports and
 * top-level declarations, not call sites. The adopted judge DOES read forge.toml, package.json, .npmrc and the vitest
 * config: that is the helper's vouch (VOUCH_READ_SET), read closed by design to vouch for the default tier's entrypoint,
 * and it is not this leg's read.
 *
 * Truth label: every pin claims only the docs/14 label "fixture pass" in the default gate. No live, pty or adversarial
 * pass is claimed from a title being present (the live four-view receipt stays with its own VC-5 residual bead).
 *
 * Docs: both sections are judged through the helper's rendered view in its ADOPTION form (docsSection / sectionMatches):
 * under its unique level-2 heading of its level-1 parent heading, bounded at the next level-1/2 heading or EOF, a section
 * must render as exactly its frozen block list, HTML refused. docs/10 "Failure and deception defenses" is its one frozen
 * paragraph of five sentences: a dropped, reworded or hidden sentence names its row; any other edit names the section.
 * docs/14 "Truth labels and release gates" (respin U1) is its two frozen paragraphs at the cut base, the falsifier
 * sentence this census answers closing the first: a weakening sentence appended to that paragraph, prefixed to it or
 * inserted before the falsifier sentence, a weakening or scope-narrowing paragraph anywhere in the section (at its EOF
 * included) and a ### subsection inside it each read red, naming docs/14. The cost, accepted: a reword of the section's
 * second paragraph reds this leg too. Every drift falsifier runs over a SYNTHETIC document built from the frozen blocks,
 * never over the live text, so a legitimate edit of any other section can never redden a falsifier row.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16): the table pins its own row/pin-level shape as a
 * literal (ROWS_SHAPE) and the exact ten file + title pairs (PIN_PAIRS), and the docs/14 falsifier table its ids
 * (DOCS14_FALSIFIER_IDS), so deleting one pin of a two-pin row, shortening a requirement label, swapping a pin for an
 * unrelated passing case or dropping a falsifier row reds this leg.
 *
 * Self-hollowing guard (respin F4): the census tier runs without --expect.requireAssertions, so this file requires an
 * assertion of every case itself (a file-level beforeEach), every table case declares its exact assertion count, and
 * every table case records what it judged into a module-level tally. The file's LAST case pins that tally to the frozen
 * literals (ROWS_SHAPE, PIN_PAIRS, the row, docs/14 falsifier and liveness ids, the own-read set), so filtering a row out
 * of a table, emptying a table, returning early from a case body or judging fewer pins reds this leg. A structure case
 * walks the file's own case tree: every case set to run (a skipped or todo case anywhere reds), the case count frozen
 * (FILE_CASES), the tally the last case; the tally in turn pins that the structure case ran. Residual (named): deleting
 * the beforeEach hook, or both guard cases together, is a visible diff of this file that no census judges.
 *
 * Judging cost (respin F5, the R546 shape): each judge() call re-reads and re-validates the whole report and re-parses
 * every pinned file it touches, so the leg judges every TABLE pin in ONE judge() call, at most once per run (verdictsOf's
 * memo, keyed by file and title), and every AC2 case reads that memo; only a liveness falsifier that judges a
 * deliberately mutated pin makes a call of its own. Every judging case carries the file-local budget JUDGE_BUDGET_MS.
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that would
 * fail if a critical guarantee was quietly weakened."
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
}
interface Row {
  /** The defense id, in the order the docs/10 sentences state them. */
  readonly id: string;
  /** The label the row answers, as the delivery note names it. */
  readonly label: string;
  /** The docs/10 sentence, verbatim in the rendered section. */
  readonly quote: string;
  readonly tier: "default-gate";
  readonly pins: readonly Pin[];
}
/** One docs/14 drift falsifier: a weakening shape over the synthetic docs/14 document and a fragment its red must carry. */
interface Docs14Falsifier {
  readonly id: string;
  readonly shape: string;
  readonly markdown: string;
  readonly names: string;
}
/** F4: what this run's cases did, recorded by the cases themselves; the closing tally case pins every list. */
interface Tally {
  /** Each AC2 case's row id with the count of its pins judged ok, in run order. */
  readonly shape: string[];
  /** Each pin an AC2 case judged ok, as row|file|title, in run order. */
  readonly judged: string[];
  readonly k: string[];
  readonly docs14: string[];
  readonly liveness: string[];
  /** Every repository file this leg read itself (readRepo). */
  readonly reads: Set<string>;
  /** The structure case, once it walked the file's case tree to its end. */
  readonly structure: string[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs10-deception-defenses.census.ts";
const CENSUS_CONFIG = "vitest.census.config.ts";
const DOCS_10 = "docs/workbench/10-terminal-inspector.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const EM_DASH = String.fromCodePoint(0x2014);
const SECTION_SIGN = String.fromCodePoint(0xa7);
const DOCS_10_HEADING = "Failure and deception defenses";
const DOCS_10_PARENT = `10 ${EM_DASH} Terminal-native rich workflow inspector, interaction and performance`;
const DOCS_14_HEADING = "Truth labels and release gates";
const DOCS_14_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const DOCS_10_WHERE = `${DOCS_10} ${SECTION_SIGN} ${DOCS_10_HEADING}`;
const DOCS_14_WHERE = `${DOCS_14} ${SECTION_SIGN} ${DOCS_14_HEADING}`;
/** The fragment every docs/14 exactness red carries. */
const NOT_EXACT_14 = "is not exactly its two frozen paragraphs";
const DOCS_14_FALSIFIER = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";
/** The docs/14 section's two frozen paragraphs at the cut base: the truth labels, closed by the falsifier sentence, then the Forge rule. */
const DOCS_14_TRUTH = `Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". ${DOCS_14_FALSIFIER}`;
const DOCS_14_FORGE = "Use Forge build/test/gates as primary interface; run local relevant Node tests through Forge-configured paths. Never introduce GitHub CI. Pin dependencies, lockfile and package exports.";

const ATTENTION = "test/workbench-attention.test.ts";
const CLAUDE_TOPOLOGY = "test/workbench-claude-topology.test.ts";
const INSPECTOR = "test/workbench-inspector.test.ts";
const FORGE_OBSERVER = "test/workbench-forge-observer.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const NATIVE_DETAILS = "test/workbench-native-details.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const FURNACE_EVIDENCE = "test/workbench-furnace-evidence.test.ts";

const QUOTES: readonly string[] = [
  "STALLED vs WAITING vs STALE vs UNKNOWN must not be confused.",
  "Spinner should not imply work progressed.",
  "Node result with missing evidence is not marked verified merely because process exited 0.",
  "Cancel controls unavailable for observers without lifecycle authority.",
  "Historical reads with limited retention show missing details honestly.",
];
const SECTION_PARAGRAPH = QUOTES.join(" ");
const paragraphBlock = (text: string): RenderedBlock => ({ kind: "paragraph", text, markdown: text });
/** What a reader sees of the docs/10 section: the one paragraph the rendered view must equal. */
const SECTION_BLOCKS: readonly RenderedBlock[] = [paragraphBlock(SECTION_PARAGRAPH)];
/** What a reader sees of the docs/14 section: the two paragraphs the rendered view must equal (respin U1, the adoption form). */
const DOCS_14_BLOCKS: readonly RenderedBlock[] = [paragraphBlock(DOCS_14_TRUTH), paragraphBlock(DOCS_14_FORGE)];

const pin = (file: string, title: string): Pin => ({ file, title });

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
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

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    id: "D1",
    label: "status axes never confused",
    quote: QUOTES[0] ?? "",
    tier: "default-gate",
    pins: [
      pin(ATTENTION, "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone"),
      pin(CLAUDE_TOPOLOGY, "A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure"),
    ],
  },
  {
    id: "D2",
    label: "spinner never implies progress",
    quote: QUOTES[1] ?? "",
    tier: "default-gate",
    pins: [
      pin(CLAUDE_TOPOLOGY, "A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active"),
      pin(INSPECTOR, "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner"),
    ],
  },
  {
    id: "D3",
    label: "exit 0 never means verified",
    quote: QUOTES[2] ?? "",
    tier: "default-gate",
    pins: [
      pin(FORGE_OBSERVER, "withholds workspace success that the read status or a declared verdict does not support, and says so"),
      pin(FORGE_OBSERVER, "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
    ],
  },
  {
    id: "D4",
    label: "no cancel controls for observers",
    quote: QUOTES[3] ?? "",
    tier: "default-gate",
    pins: [
      pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
      pin(NATIVE_DETAILS, "preserves selected node on resize and closes without invoking any runtime controls"),
    ],
  },
  {
    id: "D5",
    label: "limited-retention reads honest",
    quote: QUOTES[4] ?? "",
    tier: "default-gate",
    pins: [
      pin(OBSERVATION, "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history"),
      pin(FURNACE_EVIDENCE, "an empty incomplete read still says it is truncated rather than presenting an empty log"),
    ],
  },
]);

/** Rule 16 (frozen shape): the table's own row/pin-level shape as a literal, derived from the TABLE at the cut base. */
const ROWS_SHAPE: readonly string[] = ["D1:2", "D2:2", "D3:2", "D4:2", "D5:2"];
const ROW_IDS: readonly string[] = ["D1", "D2", "D3", "D4", "D5"];
const ROW_LABELS: readonly string[] = [
  "status axes never confused",
  "spinner never implies progress",
  "exit 0 never means verified",
  "no cancel controls for observers",
  "limited-retention reads honest",
];
/** The exact ten file + title pairs the five rows bind (the row-set pin: deleting or swapping any one reds). */
const PIN_PAIRS: readonly string[] = [
  `D1|${ATTENTION}|a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone`,
  `D1|${CLAUDE_TOPOLOGY}|A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure`,
  `D2|${CLAUDE_TOPOLOGY}|A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active`,
  `D2|${INSPECTOR}|a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner`,
  `D3|${FORGE_OBSERVER}|withholds workspace success that the read status or a declared verdict does not support, and says so`,
  `D3|${FORGE_OBSERVER}|F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone`,
  `D4|${CONTROL}|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing`,
  `D4|${NATIVE_DETAILS}|preserves selected node on resize and closes without invoking any runtime controls`,
  `D5|${OBSERVATION}|requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history`,
  `D5|${FURNACE_EVIDENCE}|an empty incomplete read still says it is truncated rather than presenting an empty log`,
];
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.id}:${row.pins.length}`);
const labelsOf = (rows: readonly Row[]): string[] => rows.map(row => row.label);
const pairsOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.pins.map(entry => `${row.id}|${entry.file}|${entry.title}`));

/** F4 tally of this run, filled by the cases and pinned by the file's last case. */
const ran: Tally = { shape: [], judged: [], k: [], docs14: [], liveness: [], reads: new Set<string>(), structure: [] };
/** The liveness falsifiers' ids, in run order. */
const LIVENESS_IDS: readonly string[] = ["M1", "M2", "M3", "M4", "M5"];
/** The files this leg reads itself (U3): the two docs pages and the census config, never forge.toml. */
const OWN_READS: readonly string[] = [DOCS_10, DOCS_14, CENSUS_CONFIG];

/** Reads a repository file for this leg itself, recording it in the own-read tally the closing case pins. */
const readRepo = (path: string): string => {
  ran.reads.add(path);
  return readFileSync(join(ROOT, path), "utf8");
};
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/**
 * The explicit budget of every judging case in this file (respin F5, the R546 shape), file-local so no other census
 * file's budget moves. Sized as 5 x the measured p99 of the costliest judging case (F5's one TABLE judgment), rounded up
 * to a whole 5 s. Measured 2026-10-20 against a full default-tier report (321 files, 12609 tests, 6.18 MB, written by
 * `npm run test` at 8 workers) with other lanes live (load1 281-378): 12 runs of this file alone and 4 whole census-tier
 * runs; the costliest judging case was the TABLE judgment in all 16, p50 2930 ms, p99 (nearest rank, n = 16) = max
 * 5412 ms, which alone exceeds vitest's default 5000 ms. 5 x 5412 ms = 27060 ms, rounded up to 30000 ms.
 */
const JUDGE_BUDGET_MS = 30_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The cases that carry JUDGING: F5's TABLE judgment, AC2 per row (5) and the five liveness falsifiers. */
const JUDGING_CASES = 11;
/** Rule 16 for the file itself (F4): its case count, every it.each row included; deleting or adding a case reds the structure case. */
const FILE_CASES = 44;
/** The closing tally case's title: the structure case pins it as the file's last case, set to run. */
const TALLY_TITLE = "F4: the AC2 cases judged exactly ROWS_SHAPE and PIN_PAIRS in one TABLE judgment, every K, docs/14 and liveness falsifier ran to its end, and the leg read only its own three files";

/** The judge() calls verdictsOf made this run: F5 and the closing tally pin that the TABLE is judged once and a row read judges nothing. */
let memoJudgeCalls = 0;

/** A pin's identity for the memo: its verdict depends on the file and the title (every pin is the default gate's, with no describe path). */
const pinKey = (entry: Pin): string => JSON.stringify([entry.file, entry.title]);
/** F5 memo: every verdict verdictsOf judged this run, by pin identity, so no pin is judged twice per run. */
const verdictMemo = new Map<string, PinVerdict>();

/** Every pin's verdict in pin order; the pins this run has not judged yet are judged together, in ONE judge() call. */
function verdictsOf(pins: readonly Pin[]): readonly PinVerdict[] {
  const fresh = [...new Map(pins.filter(entry => !verdictMemo.has(pinKey(entry))).map(entry => [pinKey(entry), entry] as const)).values()];
  if (fresh.length > 0) {
    memoJudgeCalls += 1;
    const judged = judge(REPORT, fresh.map(casePin));
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

/** Every TABLE pin, in table order. */
const TABLE_PINS: readonly Pin[] = ROWS.flatMap(row => row.pins);
/** A row's verdicts from the memo; the first read judges the whole TABLE in one call, so no row takes a judge() call of its own. */
function judgeRow(row: Row): readonly PinVerdict[] {
  verdictsOf(TABLE_PINS);
  return verdictsOf(row.pins);
}

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/** Every docs/10 drift, each naming the row or the section it breaks; the per-row checks run independently of the exactness check. */
function docs10Failures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_10_HEADING, 2, [DOCS_10_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_10_WHERE}: the section is refused: ${section.why}`);
    return out;
  }
  for (const row of ROWS) {
    if (!section.blocks.some(block => block.kind === "paragraph" && block.text.includes(row.quote))) out.push(`row ${row.id}: its sentence "${row.quote}" no longer renders in ${DOCS_10_WHERE}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_10_WHERE} is not exactly its frozen paragraph: ${exact.why}`);
  return out;
}

/**
 * docs/14 in the ADOPTION form (respin U1): the section's WHOLE rendered block list must equal its two frozen paragraphs,
 * HTML-free. The naming legs run independently of the exactness check: HTML in the section and a falsifier sentence that
 * no longer renders in a paragraph each name themselves.
 */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, DOCS_14_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${DOCS_14_WHERE}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (section.hasHtml) out.push(`${DOCS_14_WHERE} carries HTML, whose rendered text can hide what its source says`);
  if (!section.blocks.some(block => block.kind === "paragraph" && block.text.includes(DOCS_14_FALSIFIER))) {
    out.push(`${DOCS_14_WHERE}: the falsifier sentence no longer renders in a paragraph of its section`);
  }
  const exact = sectionMatches(section, DOCS_14_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_14_WHERE} ${NOT_EXACT_14}: ${exact.why}`);
  return out;
}

/** The synthetic docs/10 document the drift falsifiers run over: the frozen paragraph under the real heading shape, never the live text. */
const synthetic = (edit: (paragraph: string) => string = paragraph => paragraph, tail = ""): string =>
  `# ${DOCS_10_PARENT}\n\n## Navigation\n\nText.\n\n## ${DOCS_10_HEADING}\n\n${edit(SECTION_PARAGRAPH)}\n${tail}\n## Implemented experimental native details at 2026-10-15\n\nMore text.\n`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

/** The synthetic docs/14 document: the two frozen paragraphs under the real heading shape, the section last (as at the base), never the live text. */
const synthetic14 = (paragraphs: readonly string[] = [DOCS_14_TRUTH, DOCS_14_FORGE], tail = ""): string =>
  `# ${DOCS_14_PARENT}\n\n## Performance benchmark\n\nRows.\n\n## ${DOCS_14_HEADING}\n\n${paragraphs.join("\n\n")}\n${tail}`;
/** The weakening sentence the gate measured census-green (G6/G7/G7e). */
const WEAKENING = "Falsifiers are advisory and may be omitted.";
const falsifier14 = (id: string, shape: string, markdown: string, names: string = NOT_EXACT_14): Docs14Falsifier => ({ id, shape, markdown, names });
/** One falsifier per gate-measured docs/14 weakening shape (G6-G10) plus the two section-boundary shapes (S1, S2). */
const DOCS14_FALSIFIERS: readonly Docs14Falsifier[] = freezeDeep<readonly Docs14Falsifier[]>([
  falsifier14("G6", "a weakening sentence appended to the falsifier sentence's paragraph", synthetic14([`${DOCS_14_TRUTH} ${WEAKENING}`, DOCS_14_FORGE])),
  falsifier14("G7", "the weakening sentence as a new paragraph after the truth paragraph", synthetic14([DOCS_14_TRUTH, WEAKENING, DOCS_14_FORGE])),
  falsifier14("G7e", "the weakening paragraph at the section's and the document's EOF", synthetic14(undefined, `\n${WEAKENING}\n`)),
  falsifier14("G8", "a weakening sentence with no weakening vocabulary inserted before the falsifier sentence", synthetic14([DOCS_14_TRUTH.replace(DOCS_14_FALSIFIER, `Only packages the release owner names count as major. ${DOCS_14_FALSIFIER}`), DOCS_14_FORGE])),
  falsifier14("G9", "an advisory prefix on the truth paragraph", synthetic14([`Advisory only, never enforced: ${DOCS_14_TRUTH}`, DOCS_14_FORGE])),
  falsifier14("G10", "a scope-narrowing duplicate of the falsifier sentence as its own paragraph", synthetic14([DOCS_14_TRUTH, `Only packages the owner names need to meet this: ${DOCS_14_FALSIFIER}`, DOCS_14_FORGE])),
  falsifier14("S1", "a weakening ### subsection inside the section", synthetic14(undefined, "\n### Exceptions\n\nA package may ship without its falsifier.\n")),
  falsifier14("S2", "the weakening paragraph at the section's end, before a following heading", synthetic14(undefined, `\n${WEAKENING}\n\n## Appendix\n\nText.\n`)),
]);
/** Rule 16 for the docs/14 falsifier table: its ids, frozen. */
const DOCS14_FALSIFIER_IDS: readonly string[] = ["G6", "G7", "G7e", "G8", "G9", "G10", "S1", "S2"];

// F4: the census tier runs without --expect.requireAssertions; every case of this file must assert at least once.
beforeEach(() => {
  expect.hasAssertions();
});

describe("wb-6ze.38 docs/workbench/10 failure-and-deception-defenses census (report mode)", () => {
  it("AC1: the table holds the five frozen rows in order, deeply frozen, each sentence rendered in its section", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.id)).toEqual(ROW_IDS);
    expect(ROWS.map(row => row.quote)).toEqual([...QUOTES]);
    expect(ROWS.every(row => row.tier === "default-gate")).toBe(true);
    expect(docs10Failures(readRepo(DOCS_10))).toEqual([]);
  });

  it("AC1 (rule 16): the table pins its own shape as a literal: rows, pins per row, labels and the exact ten file + title pairs", () => {
    expect(shapeOf(ROWS)).toEqual(ROWS_SHAPE);
    expect(labelsOf(ROWS)).toEqual(ROW_LABELS);
    expect(pairsOf(ROWS)).toEqual(PIN_PAIRS);
    expect(PIN_PAIRS).toHaveLength(10);
    expect(isDeepFrozen(DOCS14_FALSIFIERS)).toBe(true);
    expect(DOCS14_FALSIFIERS.map(falsifier => falsifier.id)).toEqual(DOCS14_FALSIFIER_IDS);
  });

  it("AC1 (rule 16): each hollowing of a copy of the table changes its shape, so the literal pins would red it", () => {
    const withoutPin = (id: string, at: number): readonly Row[] => ROWS.map(row => (row.id === id ? { ...row, pins: row.pins.filter((_, index) => index !== at) } : row));
    const swapped: readonly Row[] = ROWS.map(row => (row.id === "D2" ? { ...row, pins: [row.pins[0] as Pin, pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing")] } : row));
    expect(shapeOf(withoutPin("D1", 1))).not.toEqual(ROWS_SHAPE);
    expect(shapeOf(withoutPin("D4", 1))).not.toEqual(ROWS_SHAPE);
    expect(pairsOf(swapped)).not.toEqual(PIN_PAIRS);
    expect(labelsOf(ROWS.map(row => (row.id === "D5" ? { ...row, label: "limited retention" } : row)))).not.toEqual(ROW_LABELS);
    expect(shapeOf([])).not.toEqual(ROWS_SHAPE);
  });

  it("AC1: the live section renders exactly its one frozen paragraph of five sentences, HTML-free", () => {
    const section = docsSection(readRepo(DOCS_10), DOCS_10_HEADING, 2, [DOCS_10_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(QUOTES).toHaveLength(5);
  });

  it("AC1 (U1): docs/14 Truth labels and release gates renders exactly its two frozen paragraphs, HTML-free, the falsifier sentence this census answers closing the first", () => {
    const markdown = readRepo(DOCS_14);
    const section = docsSection(markdown, DOCS_14_HEADING, 2, [DOCS_14_PARENT]);
    expect(sectionMatches(section, DOCS_14_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(DOCS_14_TRUTH.endsWith(` ${DOCS_14_FALSIFIER}`)).toBe(true);
    expect(docs14Failures(markdown)).toEqual([]);
  });

  it("F5: one judge() call judges every TABLE pin, at most once per run, and re-reading the TABLE or any row judges nothing (the R546 shape)", JUDGING, () => {
    const before = memoJudgeCalls;
    const verdicts = verdictsOf(TABLE_PINS);
    expect(verdicts).toHaveLength(TABLE_PINS.length);
    expect(memoJudgeCalls - before, "the whole TABLE takes one judge() call, or none once judged").toBeLessThanOrEqual(1);
    const judged = memoJudgeCalls;
    expect(verdictsOf(TABLE_PINS)).toEqual(verdicts);
    for (const row of ROWS) expect(judgeRow(row)).toHaveLength(row.pins.length);
    expect(memoJudgeCalls - judged, "a second read of the TABLE and of every row judges nothing").toBe(0);
  });

  it.each(ROWS)("AC2 row $id ($label): every pinned case is collected once, passed and asserting in the default gate's own report", JUDGING, row => {
    expect.assertions(3);
    const verdicts = judgeRow(row);
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
    const ok = verdicts.filter(verdict => verdict.ok);
    ran.shape.push(`${row.id}:${ok.length}`);
    ran.judged.push(...ok.map(verdict => `${row.id}|${verdict.pin.file}|${verdict.pin.title}`));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, imports neither child_process nor a pinned test module, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinnedBase = ROWS.flatMap(row => row.pins.map(entry => entry.file.replace(/^test\//u, "./").replace(/\.test\.ts$/u, "")));
    expect(own.imports.filter(entry => pinnedBase.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo(CENSUS_CONFIG)).toContain('include: ["test/**/*.census.ts"]');
  });

  it("F5 + F4: exactly the judging cases carry the file-local budget (never vitest's default 5000 ms), every case is set to run, the case count is frozen and the closing tally is the last case", ({ task }) => {
    const cases: { readonly name: string; readonly mode: string; readonly timeout: number }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") cases.push({ name: child.name, mode: child.mode, timeout: child.timeout });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(cases.filter(entry => entry.timeout === JUDGE_BUDGET_MS), "the cases that run under JUDGE_BUDGET_MS").toHaveLength(JUDGING_CASES);
    expect(cases.filter(entry => entry.mode !== "run").map(entry => entry.name), "cases of this file not set to run").toEqual([]);
    expect(cases, "the file's case count").toHaveLength(FILE_CASES);
    expect(cases[cases.length - 1]?.name, "the file's last case").toBe(TALLY_TITLE);
    ran.structure.push("walked");
  });
});

describe("wb-6ze.38 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.id === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", JUDGING, () => {
    expect.assertions(4);
    const { row, entry } = firstPin("D3");
    const wrong = { ...entry, title: entry.title.replace("withholds", "withholdS") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row D3");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
    ran.liveness.push("M1");
  });

  it("M2: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    expect.assertions(1);
    const { entry } = firstPin("D1");
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
    ran.liveness.push("M2");
  });

  it("M3: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", JUDGING, () => {
    expect.assertions(1);
    const { entry } = firstPin("D5");
    const [verdict] = judge(REPORT, [casePin({ file: CONTROL, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
    ran.liveness.push("M3");
  });

  it("M4: a pin judged under a tier the default report does not vouch for is refused, not counted", JUDGING, () => {
    expect.assertions(2);
    const { entry } = firstPin("D4");
    const [verdict] = judge(REPORT, [{ ...casePin(entry), tier: "native-read" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
    ran.liveness.push("M4");
  });

  it("M5: a file no default report collects is not-collected, never an empty pass", JUDGING, () => {
    expect.assertions(1);
    const [verdict] = judge(REPORT, [{ file: "test/workbench-no-such-file.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.ok).toBe(false);
    ran.liveness.push("M5");
  });
});

describe("wb-6ze.38 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docs10Failures(synthetic())).toEqual([]);
    expect(docs10Failures(`# ${DOCS_10_PARENT}\n\n## ${DOCS_10_HEADING}\n\n${SECTION_PARAGRAPH}\n`)).toEqual([]);
  });

  it.each(ROWS)("K-$id names row $id (and only it) when its sentence is dropped from the paragraph", row => {
    expect.assertions(2);
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(`${row.quote} `, "").replace(` ${row.quote}`, "")));
    expect(named(lines)).toEqual([`row ${row.id}`]);
    expect(lines.some(line => line.includes("is not exactly its frozen paragraph"))).toBe(true);
    ran.k.push(row.id);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to the paragraph", () => {
    const lines = docs10Failures(synthetic(paragraph => `${paragraph} Unless a provider says otherwise.`));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen paragraph");
  });

  it("D2 goes red on the section when two sentences swap places, naming no row", () => {
    const lines = docs10Failures(synthetic(() => [QUOTES[1], QUOTES[0], ...QUOTES.slice(2)].join(" ")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("D3 goes red when the section heading is renamed away", () => {
    const lines = docs10Failures(synthetic().replace(`## ${DOCS_10_HEADING}`, "## Failure notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_10_HEADING}: the section is refused`);
  });

  it("D4 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docs10Failures(synthetic(paragraph => paragraph, "\n### Exceptions\n\nA host may relax these defenses.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen paragraph"))).toBe(true);
  });

  it("D5 names the spinner row when its sentence is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(QUOTES[1] ?? "", `<!-- ${QUOTES[1]} -->`)));
    expect(named(lines)).toEqual(["row D2"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docs10Failures(synthetic().replace(`## ${DOCS_10_HEADING}`, `# Appendix\n\n## ${DOCS_10_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_10_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 names the exit-0 row when its sentence is relocated to an EOF appendix, and the section no longer matches", () => {
    const quote = QUOTES[2] ?? "";
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(` ${quote}`, ""), `\n## Appendix\n\n${quote}\n`));
    expect(named(lines)).toEqual(["row D3"]);
  });

  it("an edit of any other section never reddens a row: the neighbouring sections are free to change", () => {
    expect(docs10Failures(synthetic().replace("Text.", "Different text.").replace("More text.", "Other text."))).toEqual([]);
  });

  it("docs/14: the falsifier sentence dropped or hidden in an HTML comment is red, naming docs/14", () => {
    expect.assertions(4);
    expect(docs14Failures(synthetic14())).toEqual([]);
    const dropped = docs14Failures(synthetic14([DOCS_14_TRUTH.replace(` ${DOCS_14_FALSIFIER}`, ""), DOCS_14_FORGE]));
    expect(dropped.some(line => line.includes("falsifier sentence no longer renders"))).toBe(true);
    const hidden = docs14Failures(synthetic14([DOCS_14_TRUTH.replace(DOCS_14_FALSIFIER, `<!-- ${DOCS_14_FALSIFIER} -->`), DOCS_14_FORGE]));
    expect(hidden.some(line => line.includes("carries HTML"))).toBe(true);
    expect(hidden.some(line => line.includes("falsifier sentence no longer renders"))).toBe(true);
  });

  it("docs/14 controls (U1): the synthetic section exactly as written is green, and an edit of another section never reddens it", () => {
    expect.assertions(2);
    expect(docs14Failures(synthetic14())).toEqual([]);
    expect(docs14Failures(synthetic14().replace("Rows.", "Other rows."))).toEqual([]);
  });

  it.each(DOCS14_FALSIFIERS)("docs/14 $id (U1): its weakening shape reds the section, naming docs/14 and the exactness check", falsifier => {
    expect.assertions(3);
    const lines = docs14Failures(falsifier.markdown);
    expect(lines.length, `${falsifier.id}: ${falsifier.shape}`).toBeGreaterThan(0);
    expect(lines.every(line => line.startsWith(DOCS_14_WHERE))).toBe(true);
    expect(lines.some(line => line.includes(falsifier.names))).toBe(true);
    ran.docs14.push(falsifier.id);
  });
});

describe("wb-6ze.38 closing tally (F4): the run judged every frozen row, pin and falsifier; this is the file's last case", () => {
  it(TALLY_TITLE, () => {
    expect(ran.shape, "AC2: each row's ok pin count, in table order").toEqual([...ROWS_SHAPE]);
    expect(ran.judged, "AC2: the pins judged ok, in table order").toEqual([...PIN_PAIRS]);
    expect(ran.k, "the K falsifiers that ran to their end").toEqual([...ROW_IDS]);
    expect(ran.docs14, "the docs/14 falsifiers that ran to their end").toEqual([...DOCS14_FALSIFIER_IDS]);
    expect(ran.liveness, "the liveness falsifiers that ran to their end").toEqual([...LIVENESS_IDS]);
    expect([...ran.reads].sort(), "the files this leg read itself").toEqual([...OWN_READS].sort());
    expect(memoJudgeCalls, "the whole TABLE took one judge() call this run").toBe(1);
    expect(ran.structure, "the structure case walked the file to its end").toEqual(["walked"]);
  });
});
