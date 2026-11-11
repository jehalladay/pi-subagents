/**
 * wb-9x5 (W21: Scaled swarms / profiling): the parent acceptance receipt, docs/workbench/receipts/wb-9x5.md, read back
 * against the bench receipt lines it binds.
 *
 * The bead's acceptance reads "10k+ grouped operations measured; p50/p95 reducer/layout timings on declared host; memory
 * bounded by active projection. Acceptance: measured runs, no invented numbers." The receipt's first entry answers it
 * with seven measured runs of four landed W21 bench CLIs over the grouped-10k fixture: four runs of record (R1-R4, one
 * forge run per bench) and three earlier direct runs of the retained-memory bench (X1-X3), kept because X1 reads a
 * finding. Each run's ONE JSON receipt line, as its bench printed it, is committed verbatim (a JSON string, in entry order)
 * in test/fixtures/w21-acceptance-receipt-lines.json, the data file, and the entry's receipt-lines table lists each
 * line's SHA-256; every measurement table of the entry is read back against those lines here. The lines stay out of
 * docs/ and qa/, whose word censuses would read them: as docs text R2 and R3 match the docs-sentence rule (C2) of the
 * wb-4wmu.1 status census through words in their bench labels, and the src/ and qa/ word count (D1) of
 * test/workbench-rf-federation-refusal-codes-census.test.ts matches a key of the R3 line. This file runs no bench
 * and spawns no process: it lexes the receipt with marked, parses the data file and re-judges each line with the pure
 * assessor its bench module exports.
 *
 * RESPIN 1 (cut #2, curing refusal #1 of cut #1 at the gate run g10-gate-s289). U1 RENDERED-TEXT DOCS TRUTH: cut #1's
 * acceptance reader matched marked's raw list-item and paragraph text, which keeps inline HTML, so the gate's LEG2-P1
 * plant (the quote inside an inline HTML comment the page never shows) read green. The reader now reads the entry
 * through the shared rendered view (docsSection, test/helpers/census.ts): it refuses any HTML in the entry (block or
 * inline, comments included), counts the quote only in rendered text, and requires the text that carries the quote to
 * read the same in its source (W21R-F25..W21R-F30: an inline comment, a comment block, a hidden span, a comment
 * elsewhere in the entry, image alt text, a link title). U2 RECORD HONESTY: cut #1's header called every falsifier a
 * one-edit copy; they are edited copies, some with one edit and some with several, and each changes the receipt, the
 * data file, both, or docs/14.
 * FALSIFIERS names the input each one changes, every falsifier case asserts it, and W21R-EDITS reads the receipt's
 * falsifier table against FALSIFIERS. Riders of the gate record: F1, the bounds each line was judged against are bound to
 * the benches' exported constants and to the docs/14 target sentence (W21R-BOUNDS; W21R-F31..W21R-F35, the line edits
 * of the LEG2-P9, P9b and P10 plants among them); F4, the tree-and-host reader names every run without a parsed line
 * (W21R-F36, the LEG2-P11 plant).
 *
 * Pinned reader set (case id: target -> result on these bytes):
 * - W21R-SHAPE: the runs table, the receipt-lines table and the data file name exactly RUNS (R1-R4, then X1-X3) in
 *   order, each data line is one line, and its SHA-256 is the one the receipt-lines table lists -> holds.
 * - W21R-REJUDGE: every data line is one JSON object carrying its bench's contract and command, and re-judges under
 *   that bench's exported assessor to the exitCode, verdict and realised it records; every one is realised (the W21
 *   grouped-10k shape) -> holds; X1 re-judges to its own recorded exit 1, over-bound.
 * - W21R-RUNS: each runs-table row equals its line's exitCode, verdict and utc; a run of record names a cmd_ id and a
 *   two-decimal start load1, a direct run names no command id -> holds.
 * - W21R-TREE-HOST: every run has a parsed data line, and the tree-and-host table lists one full git revision read from
 *   git with a clean tree, its revision, host and toolchain values equal to those of every data line -> holds.
 * - W21R-A1: the A1 table rows are exactly the A1 pins of CLAUSES with the R1 line's values, every line measured that
 *   fixture, and it holds at least 10000 operations nested exactly 5 groups deep -> holds.
 * - W21R-A2: the A2 table rows are exactly the A2 pins of CLAUSES, each with the samples, p50, p95 and max its line
 *   records -> holds.
 * - W21R-A3: the A3 table rows are exactly the A3 pins of CLAUSES, each measured cell equal to the line's judged figure,
 *   each bound cell equal to its bounds figure, and each within cell equal to measured <= bound -> holds; the X1
 *   ArrayBuffer row reads no.
 * - W21R-BOUNDS: docs/14's "Performance benchmark" section renders one target sentence whose 20 ms, 4 Hz and 100k-event
 *   figures equal NAVIGATION_TARGET_MS and SELECTOR_TARGET_MS, REDRAW_MAX_HZ and FOLD_THRESHOLD_EVENTS; R1's and R3's
 *   lines record a target.ms equal to NAVIGATION_TARGET_MS, the constant their assessors judge against, R2's line records
 *   bounds equal to those three reducer-selector constants, and the four retained-memory lines record bounds equal to
 *   RETAINED_BOUNDS, key for key -> holds.
 * - W21R-ACCEPTANCE: in the shared rendered view the entry carries no HTML, exactly one of its top-level paragraphs and
 *   list items renders the quoted acceptance sentence (the three clause phrases of CLAUSES joined in order plus the
 *   outcome phrase), and that text reads the same in its source -> holds.
 * - W21R-FROZEN: the frozen-shape literals of RUNS, CLAUSES and FALSIFIERS (standing rule 16) -> holds.
 * - W21R-EDITS: the receipt's falsifier table lists exactly FALSIFIERS, in order: each id, the input its edited copy
 *   changes and its case title -> holds.
 * - W21R-F01..W21R-F38 (FALSIFIERS): edited copies of the live receipt, the data file or docs/14; each case first asserts
 *   that its copy changes exactly the input FALSIFIERS names, then that the reader its title names reads the copy red.
 *
 * NOT CLAIMED by this file:
 * - that the runs happened as the runs table says: the command ids and start load1 cells are seat records, and no reader
 *   here resolves a cmd_ id or reads a load average;
 * - that the figures reproduce on another host, at another load or at another revision, or say anything of production
 *   caps (every figure but R1's default-limits pass is at bench-only limits, which the retained bench labels
 *   non-comparable to production);
 * - render, navigate and resize across the four views as a receipt of its own, the graph-view build and the timeline
 *   honesty bundle (one receipt scope under wb-9x5.11 since the owner graph audit of 2026-11-11 merged wb-9x5.10 and
 *   wb-9x5.16 into it), a live terminal or native topology;
 * - any claim the entry's prose makes, but the acceptance quote: only its tables, the quote and the data lines are read
 *   back (the whole entry is held free of HTML, but no prose claim is read), so a prose rewrite of the A3 finding (the
 *   gate's LEG2-P6 plant) reads green here;
 * - HTML outside the entry, and inline markup in entry text that carries no acceptance quote;
 * - the bench-receipt halves of test/workbench-docs14-performance-benchmark.census.ts, which stay unpinned there.
 * Scope of the re-judge: the assessors are the ones on the tree under test, so a later change to an assessor's rules
 * re-judges these lines under the new rules, and a red names the run.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { Lexer, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { assessReceipt, NAVIGATION_TARGET_MS, RECEIPT_CONTRACT } from "../qa/workbench/grouped-fixture.mjs";
import { assessReducerSelectorReceipt, FOLD_THRESHOLD_EVENTS, REDRAW_MAX_HZ, REDUCER_SELECTOR_CONTRACT, SELECTOR_TARGET_MS } from "../qa/workbench/reducer-selector-bench.mjs";
import { assessRetainedReceipt, RETAINED_BOUNDS, RETAINED_RECEIPT_CONTRACT } from "../qa/workbench/retained-memory.mjs";
import { assessTimelineReceipt, TIMELINE_RECEIPT_CONTRACT } from "../qa/workbench/timeline-grouped-core.mjs";
import { docsSection } from "./helpers/census.js";

type RunId = "R1" | "R2" | "R3" | "R4" | "X1" | "X2" | "X3";
type Bench = "inspector-grouped-bench" | "reducer-selector-bench" | "timeline-grouped-bench" | "inspector-retained-memory-bench";
type RunKind = "forge run of record" | "direct node run";
type ClauseId = "A1" | "A2" | "A3";
/** The committed input(s) a falsifier's edited copy changes, as the receipt's falsifier table names them. */
type Edits = "receipt" | "data file" | "receipt and data file" | "docs/14";

interface Judgement {
  readonly exitCode: number;
  readonly verdict: string;
  readonly realised: boolean;
}
interface BenchModule {
  readonly contract: string;
  readonly command: string;
  readonly assess: (receipt: unknown) => Judgement;
}
interface Run {
  readonly id: RunId;
  readonly bench: Bench;
  readonly kind: RunKind;
}
interface Pin {
  readonly run: RunId;
  readonly path: string;
  readonly label: string;
}
interface Clause {
  readonly id: ClauseId;
  readonly words: string;
  readonly header: readonly string[];
  readonly pins: readonly Pin[];
}
interface Table {
  readonly header: readonly string[];
  readonly rows: readonly (readonly string[])[];
}
interface Entry {
  readonly tokens: readonly Token[];
  readonly findings: readonly string[];
}
interface Lines {
  readonly receipts: ReadonlyMap<string, Record<string, unknown>>;
  readonly order: readonly string[];
  readonly shas: ReadonlyMap<string, string>;
  readonly findings: readonly string[];
}
/** The three committed inputs: the docs receipt, the data file of receipt lines and docs/14, whose target the benches judge. */
interface Sources {
  readonly markdown: string;
  readonly data: string;
  readonly docs14: string;
}
interface DataLine {
  readonly run: string;
  readonly bench: string;
  readonly line: string;
}
/** Where a bench's line records the bound its assessor judges, and that bound as the bench module exports it. */
interface LineBound {
  readonly path: string;
  readonly value: unknown;
}
/** One falsifier: an edited copy of the live inputs and the red its case title names. */
interface Falsifier {
  readonly id: string;
  readonly edits: Edits;
  readonly title: string;
  readonly edit: (live: Sources) => Sources;
  readonly holds: (edited: Sources) => void;
}

const RECEIPT = new URL("../docs/workbench/receipts/wb-9x5.md", import.meta.url);
const DATA = new URL("./fixtures/w21-acceptance-receipt-lines.json", import.meta.url);
const DOCS14 = new URL("../docs/workbench/14-qa-and-benchmarks.md", import.meta.url);
const DATA_SCHEMA = "workbench.w21-acceptance-lines/v1";
const RECEIPT_TITLE = "wb-9x5: W21: Scaled swarms / profiling";
const ENTRY_HEADING =
  "2026-11-11 receipt: W21 parent acceptance read from seven grouped-10k bench receipt lines on one declared host (machine seat ws-13, run g10-work-s338, base ce180d8)";
const DOCS14_SECTION = "Performance benchmark";
const DOCS14_PARENTS: readonly string[] = ["14 — Test strategy, conformance suite, benchmark and adversarial controls"];
/** docs/14's target sentence as the page renders it: the navigation/layout target in ms, the redraw cap in Hz and the fold size in thousands of events. */
const DOCS14_TARGET = /^Proposed responsive target <=(\d+)ms per navigation\/layout calculation on declared reference host, redraw <=(\d+)Hz live; no full (\d+)k-event fold per redraw;/;

const BENCHES: Readonly<Record<Bench, BenchModule>> = {
  "inspector-grouped-bench": {
    contract: RECEIPT_CONTRACT,
    command: "node qa/workbench/inspector-grouped-bench.mjs",
    assess: assessReceipt as (receipt: unknown) => Judgement,
  },
  "reducer-selector-bench": {
    contract: REDUCER_SELECTOR_CONTRACT,
    command: "node qa/workbench/reducer-selector-bench.mjs",
    assess: assessReducerSelectorReceipt as (receipt: unknown) => Judgement,
  },
  "timeline-grouped-bench": {
    contract: TIMELINE_RECEIPT_CONTRACT,
    command: "node qa/workbench/timeline-grouped-bench.mjs",
    assess: assessTimelineReceipt as (receipt: unknown) => Judgement,
  },
  "inspector-retained-memory-bench": {
    contract: RETAINED_RECEIPT_CONTRACT,
    command: "node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs",
    assess: assessRetainedReceipt as (receipt: unknown) => Judgement,
  },
};

/**
 * The bound each bench's assessor judges a line against, and where the line records it. The R1 and R3 assessors judge
 * against NAVIGATION_TARGET_MS and ignore the line's target; the R2 and retained-memory assessors judge against the
 * line's own bounds, so for these committed lines it is this binding that ties those bounds to the exported constants.
 */
const LINE_BOUNDS: Readonly<Record<Bench, LineBound>> = {
  "inspector-grouped-bench": { path: "target.ms", value: NAVIGATION_TARGET_MS },
  "reducer-selector-bench": { path: "bounds", value: { selectorTargetMs: SELECTOR_TARGET_MS, redrawMaxHz: REDRAW_MAX_HZ, foldThresholdEvents: FOLD_THRESHOLD_EVENTS } },
  "timeline-grouped-bench": { path: "target.ms", value: NAVIGATION_TARGET_MS },
  "inspector-retained-memory-bench": { path: "bounds", value: RETAINED_BOUNDS },
};

/** The seven runs, in entry order: the four runs of record, then the three earlier direct retained-memory runs. */
const RUNS: readonly Run[] = Object.freeze([
  { id: "R1", bench: "inspector-grouped-bench", kind: "forge run of record" },
  { id: "R2", bench: "reducer-selector-bench", kind: "forge run of record" },
  { id: "R3", bench: "timeline-grouped-bench", kind: "forge run of record" },
  { id: "R4", bench: "inspector-retained-memory-bench", kind: "forge run of record" },
  { id: "X1", bench: "inspector-retained-memory-bench", kind: "direct node run" },
  { id: "X2", bench: "inspector-retained-memory-bench", kind: "direct node run" },
  { id: "X3", bench: "inspector-retained-memory-bench", kind: "direct node run" },
] as const);

const NAV = "passes.bench-only-limits.navigation";
const A3_HEAP = "post-GC heap growth after warmup, bytes";
const A3_BUFFERS = "post-GC ArrayBuffer growth over the baseline, bytes";
const A3_BODIES = "payload bodies still reachable after blur";

/** The three acceptance clauses with a figure table each; every pin is one table row: run, receipt field and reading. */
const CLAUSES: readonly Clause[] = Object.freeze([
  {
    id: "A1",
    words: "10k+ grouped operations measured",
    header: ["Clause", "Run", "Reading", "Receipt field", "Value"],
    pins: [
      { run: "R1", path: "fixture.nodes", label: "operations" },
      { run: "R1", path: "fixture.groups", label: "groups" },
      { run: "R1", path: "fixture.depth", label: "deepest group nesting" },
      { run: "R1", path: "fixture.minDepth", label: "shallowest group nesting" },
      { run: "R1", path: "fixture.updates", label: "updates" },
      { run: "R1", path: "fixture.ticks", label: "ticks" },
      { run: "R1", path: "fixture.minChangesPerTick", label: "fewest changes in one tick" },
      { run: "R1", path: "fixture.maxChangesPerTick", label: "most changes in one tick" },
    ],
  },
  {
    id: "A2",
    words: "p50/p95 reducer/layout timings on declared host",
    header: ["Clause", "Run", "Series", "Receipt field", "Samples", "p50 ms", "p95 ms", "max ms"],
    pins: [
      { run: "R2", path: "reducer.all", label: "ObservationProjection.ingest per update under churn (recorded, never judged)" },
      { run: "R2", path: "selectors.overview", label: "layoutInspector per redraw under churn, overview view" },
      { run: "R2", path: "selectors.graph", label: "layoutInspector per redraw under churn, graph view" },
      { run: "R2", path: "selectors.timeline", label: "layoutInspector per redraw under churn, timeline view" },
      { run: "R2", path: "selectors.details", label: "layoutInspector per redraw under churn, details view" },
      { run: "R1", path: `${NAV}.reducer`, label: "reduceInspectorKey per keypress" },
      { run: "R1", path: `${NAV}.layout`, label: "layoutInspector per keypress" },
      { run: "R1", path: `${NAV}.all`, label: "reduceInspectorKey plus layoutInspector per keypress" },
      { run: "R1", path: `${NAV}.resize`, label: "layoutInspector per resize" },
      { run: "R1", path: `${NAV}.byView.overview`, label: "reducer plus layout per keypress, overview view" },
      { run: "R1", path: `${NAV}.byView.graph`, label: "reducer plus layout per keypress, graph view" },
      { run: "R1", path: `${NAV}.byView.timeline`, label: "reducer plus layout per keypress, timeline view" },
      { run: "R1", path: `${NAV}.byView.details`, label: "reducer plus layout per keypress, details view" },
      { run: "R3", path: "passes.maxQuery-40.build.overall", label: "buildTimelineLanes per call, maxQuery 40 pass" },
      { run: "R3", path: "passes.maxQuery-100.build.overall", label: "buildTimelineLanes per call, maxQuery 100 pass" },
    ],
  },
  {
    id: "A3",
    words: "memory bounded by active projection",
    header: ["Clause", "Run", "Reading", "Judged field", "Measured", "Bound", "Within bound"],
    pins: [
      { run: "R4", path: "judged.heapGrowthAfterWarmupBytes", label: A3_HEAP },
      { run: "R4", path: "judged.arrayBufferGrowthBytes", label: A3_BUFFERS },
      { run: "R4", path: "judged.reachableBodiesAfterBlur", label: A3_BODIES },
      { run: "X1", path: "judged.heapGrowthAfterWarmupBytes", label: A3_HEAP },
      { run: "X1", path: "judged.arrayBufferGrowthBytes", label: A3_BUFFERS },
      { run: "X1", path: "judged.reachableBodiesAfterBlur", label: A3_BODIES },
      { run: "X2", path: "judged.heapGrowthAfterWarmupBytes", label: A3_HEAP },
      { run: "X2", path: "judged.arrayBufferGrowthBytes", label: A3_BUFFERS },
      { run: "X2", path: "judged.reachableBodiesAfterBlur", label: A3_BODIES },
      { run: "X3", path: "judged.heapGrowthAfterWarmupBytes", label: A3_HEAP },
      { run: "X3", path: "judged.arrayBufferGrowthBytes", label: A3_BUFFERS },
      { run: "X3", path: "judged.reachableBodiesAfterBlur", label: A3_BODIES },
    ],
  },
] as const);

const OUTCOME_WORDS = "measured runs, no invented numbers";
const ACCEPTANCE = `${CLAUSES.map(clause => clause.words).join("; ")}. Acceptance: ${OUTCOME_WORDS}.`;
const RUNS_HEADER: readonly string[] = ["Run", "Bench", "Kind", "Command id", "Start load1", "Receipt utc", "Exit", "Verdict"];
const TREE_HOST_HEADER: readonly string[] = ["Field", "Value"];
const LINES_HEADER: readonly string[] = ["Run", "Bench", "Line sha256"];
const TREE_HOST_FIELDS: readonly string[] = ["revision", "revisionSource", "dirty", "cpuModel", "cpus", "arch", "platform", "node", "toolchain.node", "toolchain.typescript", "toolchain.piTui"];
const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const LOAD1 = /^[0-9]+\.[0-9]{2}$/;
const FULL_SHA = /^[0-9a-f]{40}$/;
const W21_MIN_OPERATIONS = 10_000;
const W21_DEPTH = 5;

const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** The value at a dot path of own properties, or undefined where any step is absent. */
function fieldAt(value: unknown, path: string): unknown {
  let at: unknown = value;
  for (const key of path.split(".")) {
    if (!isRecord(at) || !Object.hasOwn(at, key)) return undefined;
    at = at[key];
  }
  return at;
}

/** How a receipt value is written in a table cell: a string as itself, anything else as its JSON text. */
const render = (value: unknown): string => (typeof value === "string" ? value : value === undefined ? "(absent)" : JSON.stringify(value));

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

/** A committed file's text, or "" when it is absent (every reader then names what is missing). */
function readOr(file: URL): string {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

const readLive = (): Sources => ({ markdown: readOr(RECEIPT), data: readOr(DATA), docs14: readOr(DOCS14) });

/** The top-level tokens of the one entry under ENTRY_HEADING, up to the next level-1 or level-2 heading. */
function entryOf(markdown: string): Entry {
  const tokens = Lexer.lex(markdown);
  const starts = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 && token.text === ENTRY_HEADING ? [index] : []));
  if (starts.length !== 1) return { tokens: [], findings: [`entry: ${starts.length} level-2 headings read "${ENTRY_HEADING}", not 1`] };
  const rest = tokens.slice(starts[0] + 1);
  const end = rest.findIndex(token => isHeading(token) && token.depth <= 2);
  return { tokens: end < 0 ? rest : rest.slice(0, end), findings: [] };
}

function tablesOf(tokens: readonly Token[]): Table[] {
  return tokens.filter(isTable).map(token => ({
    header: token.header.map(cell => cell.text.trim()),
    rows: token.rows.map(row => row.map(cell => cell.text.trim())),
  }));
}

/** The one table of the entry whose header row is exactly `header`. */
function tableWith(entry: Entry, header: readonly string[], name: string): { readonly table?: Table; readonly findings: readonly string[] } {
  const found = tablesOf(entry.tokens).filter(table => table.header.join(" | ") === header.join(" | "));
  if (found.length !== 1) return { findings: [`${name}: ${found.length} tables of the entry carry the header "${header.join(" | ")}", not 1`] };
  return { table: found[0], findings: [] };
}

/** The data file's {run, bench, line} entries, in file order. */
function dataLinesOf(data: string): { readonly lines: readonly DataLine[]; readonly findings: readonly string[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    return { lines: [], findings: [`data: not JSON (${error instanceof Error ? error.message : String(error)})`] };
  }
  if (!isRecord(parsed)) return { lines: [], findings: ["data: not one JSON object"] };
  const findings: string[] = [];
  if (parsed.schema !== DATA_SCHEMA) findings.push(`data: schema ${render(parsed.schema)}; expected ${DATA_SCHEMA}`);
  if (parsed.bead !== "wb-9x5") findings.push(`data: bead ${render(parsed.bead)}; expected wb-9x5`);
  const runs: unknown = parsed.runs;
  if (!Array.isArray(runs)) return { lines: [], findings: [...findings, "data: runs is not an array"] };
  const lines: DataLine[] = [];
  runs.forEach((entry: unknown, index: number) => {
    if (isRecord(entry) && typeof entry.run === "string" && typeof entry.bench === "string" && typeof entry.line === "string") lines.push({ run: entry.run, bench: entry.bench, line: entry.line });
    else findings.push(`data: runs[${index}] is not a {run, bench, line} of strings`);
  });
  return { lines, findings };
}

/** Every receipt line of the data file, parsed and keyed by run, with its SHA-256. */
function linesOf(sources: Sources): Lines {
  const data = dataLinesOf(sources.data);
  const receipts = new Map<string, Record<string, unknown>>();
  const findings = [...data.findings];
  for (const entry of data.lines) {
    if (entry.line.includes("\n")) findings.push(`line ${entry.run}: holds ${entry.line.split("\n").length} lines, not the one receipt line`);
    let parsed: unknown;
    try {
      parsed = JSON.parse(entry.line);
    } catch (error) {
      findings.push(`line ${entry.run}: not JSON (${error instanceof Error ? error.message : String(error)})`);
      continue;
    }
    if (!isRecord(parsed)) findings.push(`line ${entry.run}: not one JSON object`);
    else if (receipts.has(entry.run)) findings.push(`line ${entry.run}: committed twice`);
    else receipts.set(entry.run, parsed);
  }
  return {
    receipts,
    order: data.lines.map(entry => `${entry.run}:${entry.bench}`),
    shas: new Map(data.lines.map(entry => [entry.run, sha256(entry.line)])),
    findings,
  };
}

/** W21R-SHAPE's reader: the runs table, the receipt-lines table and the data file name exactly RUNS, in order, sha-bound. */
function shapeFindings(sources: Sources): string[] {
  const entry = entryOf(sources.markdown);
  const runs = tableWith(entry, RUNS_HEADER, "runs table");
  const listed = tableWith(entry, LINES_HEADER, "receipt-lines table");
  const lines = linesOf(sources);
  const out = [...entry.findings, ...runs.findings, ...listed.findings, ...lines.findings];
  const expected = RUNS.map(run => `${run.id}:${run.bench}`);
  if (runs.table !== undefined) {
    const rows = runs.table.rows.map(row => `${row[0]}:${row[1]}`);
    if (rows.join(", ") !== expected.join(", ")) out.push(`runs table rows ${rows.join(", ")}; expected ${expected.join(", ")}`);
  }
  if (listed.table !== undefined) {
    const rows = listed.table.rows.map(row => `${row[0]}:${row[1]}`);
    if (rows.join(", ") !== expected.join(", ")) out.push(`receipt-lines table rows ${rows.join(", ")}; expected ${expected.join(", ")}`);
    for (const [run, , listedSha] of listed.table.rows) {
      const actual = lines.shas.get(run);
      if (actual !== listedSha) out.push(`line ${run}: the data line's sha256 is ${actual ?? "(absent)"}; the receipt-lines table lists ${listedSha}`);
    }
  }
  if (lines.order.join(", ") !== expected.join(", ")) out.push(`data lines ${lines.order.join(", ")}; expected ${expected.join(", ")}`);
  return out;
}

/** W21R-REJUDGE's reader: each line is its bench's receipt and re-judges, under its bench's assessor, to what it records. */
function rejudgeFindings(sources: Sources): string[] {
  const lines = linesOf(sources);
  const out = [...lines.findings];
  for (const run of RUNS) {
    const receipt = lines.receipts.get(run.id);
    if (receipt === undefined) {
      out.push(`${run.id}: no parsed receipt line`);
      continue;
    }
    const bench = BENCHES[run.bench];
    if (receipt.contract !== bench.contract) out.push(`${run.id}: contract ${render(receipt.contract)}; ${run.bench} prints ${bench.contract}`);
    if (receipt.command !== bench.command) out.push(`${run.id}: command ${render(receipt.command)}; ${run.bench} is ${bench.command}`);
    if (receipt.measured !== true) out.push(`${run.id}: measured is ${render(receipt.measured)}`);
    let judged: Judgement;
    try {
      judged = bench.assess(receipt);
    } catch (error) {
      out.push(`${run.id}: the ${run.bench} assessor threw (${error instanceof Error ? error.message : String(error)})`);
      continue;
    }
    if (judged.exitCode !== receipt.exitCode) out.push(`${run.id}: re-judged exitCode ${judged.exitCode}; the line records ${render(receipt.exitCode)}`);
    if (judged.verdict !== receipt.verdict) out.push(`${run.id}: re-judged verdict ${judged.verdict}; the line records ${render(receipt.verdict)}`);
    if (judged.realised !== receipt.realised) out.push(`${run.id}: re-judged realised ${String(judged.realised)}; the line records ${render(receipt.realised)}`);
    if (judged.realised !== true) out.push(`${run.id}: not realised under the ${run.bench} assessor (not the W21 shape)`);
  }
  return out;
}

/** W21R-RUNS' reader: every runs-table row against its line. */
function runsFindings(sources: Sources): string[] {
  const entry = entryOf(sources.markdown);
  const runs = tableWith(entry, RUNS_HEADER, "runs table");
  const lines = linesOf(sources);
  const out = [...entry.findings, ...runs.findings];
  if (runs.table === undefined) return out;
  for (const run of RUNS) {
    const row = runs.table.rows.find(cells => cells[0] === run.id);
    if (row === undefined) {
      out.push(`runs ${run.id}: no row`);
      continue;
    }
    const [, bench, kind, commandId, load1, utc, exit, verdict] = row;
    if (bench !== run.bench) out.push(`runs ${run.id}: bench cell ${bench}; expected ${run.bench}`);
    if (kind !== run.kind) out.push(`runs ${run.id}: kind cell ${kind}; expected ${run.kind}`);
    if (run.kind === "forge run of record") {
      if (!COMMAND_ID.test(commandId)) out.push(`runs ${run.id}: command id cell ${commandId} is not a cmd_ id`);
      if (!LOAD1.test(load1)) out.push(`runs ${run.id}: start load1 cell ${load1} is not a two-decimal reading`);
    } else {
      if (commandId !== "none") out.push(`runs ${run.id}: a direct run names command id ${commandId}`);
      if (!LOAD1.test(load1) && load1 !== "not recorded") out.push(`runs ${run.id}: start load1 cell ${load1} is neither a reading nor "not recorded"`);
    }
    const receipt = lines.receipts.get(run.id);
    if (receipt === undefined) {
      out.push(`runs ${run.id}: no receipt line to read the row against`);
      continue;
    }
    if (utc !== render(receipt.utc)) out.push(`runs ${run.id}: utc cell ${utc}; the line reads ${render(receipt.utc)}`);
    if (exit !== render(receipt.exitCode)) out.push(`runs ${run.id}: exit cell ${exit}; the line reads ${render(receipt.exitCode)}`);
    if (verdict !== render(receipt.verdict)) out.push(`runs ${run.id}: verdict cell ${verdict}; the line reads ${render(receipt.verdict)}`);
  }
  return out;
}

/** W21R-TREE-HOST's reader: every run has a parsed line, and one clean git revision and one declared host hold in every line. */
function treeHostFindings(sources: Sources): string[] {
  const entry = entryOf(sources.markdown);
  const found = tableWith(entry, TREE_HOST_HEADER, "tree-and-host table");
  const lines = linesOf(sources);
  const out = [...entry.findings, ...found.findings, ...lines.findings];
  for (const run of RUNS) if (!lines.receipts.has(run.id)) out.push(`${run.id}: no parsed receipt line to read the tree and host from`);
  if (found.table === undefined) return out;
  const fields = found.table.rows.map(row => row[0]);
  if (fields.join(", ") !== TREE_HOST_FIELDS.join(", ")) out.push(`tree-and-host fields ${fields.join(", ")}; expected ${TREE_HOST_FIELDS.join(", ")}`);
  for (const [field, value] of found.table.rows) {
    for (const run of RUNS) {
      const receipt = lines.receipts.get(run.id);
      if (receipt === undefined) continue;
      const actual = render(fieldAt(receipt, field));
      if (actual !== value) out.push(`${run.id}: ${field} reads ${actual}; the table lists ${value}`);
    }
  }
  const cell = (field: string): string | undefined => found.table?.rows.find(row => row[0] === field)?.[1];
  if (!FULL_SHA.test(cell("revision") ?? "")) out.push(`revision ${render(cell("revision"))} is not a full git sha`);
  if (cell("revisionSource") !== "git") out.push(`revisionSource ${render(cell("revisionSource"))} is not git`);
  if (cell("dirty") !== "false") out.push(`dirty ${render(cell("dirty"))}: the measured tree was not clean`);
  return out;
}

/** The cells a clause row must carry after its reading and field columns, computed from the line, never from the table. */
function expectedCells(clause: ClauseId, receipt: Record<string, unknown>, path: string): string[] {
  if (clause === "A1") return [render(fieldAt(receipt, path))];
  if (clause === "A2") return ["samples", "p50", "p95", "max"].map(key => render(fieldAt(receipt, `${path}.${key}`)));
  const measured = fieldAt(receipt, path);
  const bound = fieldAt(receipt, `bounds.${path.split(".").pop() ?? ""}`);
  const within = typeof measured === "number" && typeof bound === "number" ? (measured <= bound ? "yes" : "no") : "(unjudgeable)";
  return [render(measured), render(bound), within];
}

/** W21R-A1/A2/A3's reader: the clause table holds exactly the clause's pins, each with its line's figures. */
function clauseFindings(sources: Sources, id: ClauseId): string[] {
  const clause = CLAUSES.find(candidate => candidate.id === id);
  if (clause === undefined) return [`${id}: no such clause`];
  const entry = entryOf(sources.markdown);
  const found = tableWith(entry, clause.header, `${id} table`);
  const lines = linesOf(sources);
  const out = [...entry.findings, ...found.findings];
  if (found.table === undefined) return out;
  const expectedRows = clause.pins.map(pin => `${id} | ${pin.run} | ${pin.label} | ${pin.path}`);
  const rows = found.table.rows.map(row => row.slice(0, 4).join(" | "));
  if (rows.join("\n") !== expectedRows.join("\n")) out.push(`${id} table rows differ from the frozen pins:\n${rows.join("\n")}\nexpected:\n${expectedRows.join("\n")}`);
  for (const row of found.table.rows) {
    const [, run, , path] = row;
    const receipt = lines.receipts.get(run);
    if (receipt === undefined) {
      out.push(`${id}/${run}/${path}: no receipt line for run ${run}`);
      continue;
    }
    const want = expectedCells(id, receipt, path);
    want.forEach((cell, index) => {
      const column = clause.header[4 + index];
      const actual = row[4 + index];
      if (actual !== cell) out.push(`${id}/${run}/${path}: ${column} cell ${render(actual)}; the line reads ${cell}`);
    });
  }
  if (id === "A1") {
    const reference = lines.receipts.get("R1");
    if (reference !== undefined) {
      for (const run of RUNS) {
        const receipt = lines.receipts.get(run.id);
        if (receipt === undefined) continue;
        for (const pin of clause.pins) {
          if (render(fieldAt(receipt, pin.path)) !== render(fieldAt(reference, pin.path))) {
            out.push(`A1 fixture: ${run.id} ${pin.path} reads ${render(fieldAt(receipt, pin.path))}; R1 reads ${render(fieldAt(reference, pin.path))}`);
          }
        }
      }
      const operations = fieldAt(reference, "fixture.nodes");
      if (typeof operations !== "number" || operations < W21_MIN_OPERATIONS) out.push(`A1 floor: R1 measured ${render(operations)} operations, below ${W21_MIN_OPERATIONS}`);
      for (const path of ["fixture.depth", "fixture.minDepth"]) {
        if (fieldAt(reference, path) !== W21_DEPTH) out.push(`A1 floor: R1 ${path} reads ${render(fieldAt(reference, path))}; the W21 shape nests exactly ${W21_DEPTH} deep`);
      }
    }
  }
  return out;
}

/**
 * W21R-BOUNDS' reader: docs/14's target sentence renders the figures the bench constants carry, and every line records
 * the bound its bench's assessor judges against (LINE_BOUNDS), key for key.
 */
function boundsFindings(sources: Sources): string[] {
  const out: string[] = [];
  const section = docsSection(sources.docs14, DOCS14_SECTION, 2, DOCS14_PARENTS);
  if (!section.ok) out.push(`docs/14: ${section.why}`);
  else {
    const targets = section.blocks.flatMap(block => {
      const match = block.kind === "paragraph" ? DOCS14_TARGET.exec(block.text) : null;
      return match === null ? [] : [match];
    });
    const [target] = targets;
    if (targets.length !== 1 || target === undefined) out.push(`docs/14: ${targets.length} paragraphs of "${DOCS14_SECTION}" render the target sentence, not 1`);
    else {
      const [, ms, hz, thousands] = target;
      if (Number(ms) !== NAVIGATION_TARGET_MS) out.push(`docs/14 target <=${ms}ms; NAVIGATION_TARGET_MS is ${NAVIGATION_TARGET_MS}`);
      if (Number(ms) !== SELECTOR_TARGET_MS) out.push(`docs/14 target <=${ms}ms; SELECTOR_TARGET_MS is ${SELECTOR_TARGET_MS}`);
      if (Number(hz) !== REDRAW_MAX_HZ) out.push(`docs/14 redraw <=${hz}Hz; REDRAW_MAX_HZ is ${REDRAW_MAX_HZ}`);
      if (Number(thousands) * 1000 !== FOLD_THRESHOLD_EVENTS) out.push(`docs/14 fold of ${thousands}k events; FOLD_THRESHOLD_EVENTS is ${FOLD_THRESHOLD_EVENTS}`);
    }
  }
  const lines = linesOf(sources);
  out.push(...lines.findings);
  for (const run of RUNS) {
    const receipt = lines.receipts.get(run.id);
    if (receipt === undefined) {
      out.push(`${run.id}: no parsed receipt line to read its bounds from`);
      continue;
    }
    const bound = LINE_BOUNDS[run.bench];
    const recorded = fieldAt(receipt, bound.path);
    if (!isDeepStrictEqual(recorded, bound.value)) out.push(`${run.id}: ${bound.path} reads ${render(recorded)}; ${run.bench} judges against ${render(bound.value)}`);
  }
  return out;
}

const NO_HTML = "the entry carries HTML (a comment or a tag), whose rendered text can hide what its source says";
const UNPLAIN = "the text that quotes the acceptance sentence reads differently in its source: ";

/**
 * W21R-ACCEPTANCE's reader, on the shared rendered view (docsSection): the entry carries no HTML, exactly one top-level
 * paragraph or list item renders the quoted sentence, and every text that renders it reads the same in its source.
 */
function acceptanceFindings(sources: Sources): string[] {
  const entry = entryOf(sources.markdown);
  const section = docsSection(sources.markdown, ENTRY_HEADING, 2, [RECEIPT_TITLE]);
  if (!section.ok) return [...entry.findings, `rendered view: ${section.why}`];
  const out = [...entry.findings];
  if (section.hasHtml) out.push(NO_HTML);
  const quoted = `"${ACCEPTANCE}"`;
  const texts = section.blocks.flatMap(block => (block.kind === "list" ? block.items : block.kind === "paragraph" ? [{ text: block.text, markdown: block.markdown }] : []));
  const quoting = texts.filter(text => text.text.includes(quoted));
  if (quoting.length !== 1) out.push(`the entry quotes the acceptance sentence ${quoting.length} times, not once: ${quoted}`);
  for (const text of quoting) if (text.markdown !== text.text) out.push(`${UNPLAIN}${text.markdown}`);
  return out;
}

const FALSIFIERS_HEADER: readonly string[] = ["Falsifier", "Edited copy of", "Case title"];

/** W21R-EDITS' reader: the receipt's falsifier table lists exactly FALSIFIERS, in order, each with its edited input and its case title. */
function falsifierTableFindings(sources: Sources): string[] {
  const entry = entryOf(sources.markdown);
  const found = tableWith(entry, FALSIFIERS_HEADER, "falsifier table");
  const out = [...entry.findings, ...found.findings];
  if (found.table === undefined) return out;
  const rows = found.table.rows.map(row => row.join(" | "));
  const listed = FALSIFIERS.map(falsifier => [falsifier.id, falsifier.edits, falsifier.title].join(" | "));
  for (let index = 0; index < Math.max(rows.length, listed.length); index += 1) {
    if (rows[index] !== listed[index]) out.push(`falsifier table row ${index + 1}: ${rows[index] ?? "(absent)"}; FALSIFIERS lists ${listed[index] ?? "(none)"}`);
  }
  return out;
}

/** Which committed input(s) an edited copy changes against the live inputs ("nothing" when the edit did not apply). */
function editsOf(live: Sources, edited: Sources): string {
  const changed = [...(edited.markdown === live.markdown ? [] : ["receipt"]), ...(edited.data === live.data ? [] : ["data file"]), ...(edited.docs14 === live.docs14 ? [] : ["docs/14"])];
  return changed.length === 0 ? "nothing" : changed.join(" and ");
}

/** The data file parsed for an edit: its object and its runs array. */
function dataForEdit(data: string): { readonly parsed: Record<string, unknown>; readonly runs: unknown[] } {
  const parsed: unknown = JSON.parse(data);
  if (!isRecord(parsed)) throw new Error("the data file is not one JSON object");
  const runs: unknown = parsed.runs;
  if (!Array.isArray(runs)) throw new Error("the data file holds no runs array");
  return { parsed, runs };
}

/** A copy of `sources` whose data file carries one run's receipt line re-written after `edit`. */
function editLine(sources: Sources, run: RunId, edit: (receipt: Record<string, unknown>) => void): Sources {
  const { parsed, runs } = dataForEdit(sources.data);
  const entry = runs.find((candidate: unknown) => isRecord(candidate) && candidate.run === run);
  if (!isRecord(entry) || typeof entry.line !== "string") throw new Error(`no data line for ${run}`);
  const receipt: unknown = JSON.parse(entry.line);
  if (!isRecord(receipt)) throw new Error(`the ${run} line is not one JSON object`);
  edit(receipt);
  entry.line = JSON.stringify(receipt);
  return { ...sources, data: `${JSON.stringify(parsed, null, 2)}\n` };
}

/** A copy of `sources` whose data file carries every run's receipt line re-written after `edit`. */
function editAllLines(sources: Sources, edit: (receipt: Record<string, unknown>) => void): Sources {
  return RUNS.reduce((current, run) => editLine(current, run.id, edit), sources);
}

/** A copy of `sources` whose data file stores one run's line pretty-printed over several lines. */
function splitLine(sources: Sources, run: RunId): Sources {
  const { parsed, runs } = dataForEdit(sources.data);
  const entry = runs.find((candidate: unknown) => isRecord(candidate) && candidate.run === run);
  if (!isRecord(entry) || typeof entry.line !== "string") throw new Error(`no data line for ${run}`);
  entry.line = JSON.stringify(JSON.parse(entry.line), null, 1);
  return { ...sources, data: `${JSON.stringify(parsed, null, 2)}\n` };
}

const withMarkdown = (sources: Sources, edit: (markdown: string) => string): Sources => ({ ...sources, markdown: edit(sources.markdown) });

/** A copy of `sources` whose data file no longer holds one run's line. */
function dropLine(sources: Sources, run: RunId): Sources {
  const { parsed, runs } = dataForEdit(sources.data);
  parsed.runs = runs.filter((candidate: unknown) => !(isRecord(candidate) && candidate.run === run));
  return { ...sources, data: `${JSON.stringify(parsed, null, 2)}\n` };
}

function setAt(target: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let at: Record<string, unknown> = target;
  for (const key of keys.slice(0, -1)) {
    const next = at[key];
    if (!isRecord(next)) throw new Error(`no object at ${key} of ${path}`);
    at = next;
  }
  at[keys[keys.length - 1]] = value;
}

const cellsOf = (line: string): string[] | null => (line.startsWith("| ") && line.endsWith(" |") ? line.slice(2, -2).split(" | ") : null);

/** A copy of `sources` whose receipt has the first table row matching `match` re-written by `edit` (null removes the row). */
function editRow(sources: Sources, match: (cells: readonly string[]) => boolean, edit: (cells: string[]) => string[] | null): Sources {
  const lines = sources.markdown.split("\n");
  const at = lines.findIndex(line => {
    const cells = cellsOf(line);
    return cells !== null && match(cells);
  });
  if (at < 0) throw new Error("no table row matches");
  const edited = edit(cellsOf(lines[at]) ?? []);
  if (edited === null) lines.splice(at, 1);
  else lines[at] = `| ${edited.join(" | ")} |`;
  return { ...sources, markdown: lines.join("\n") };
}

const rowOf = (clause: ClauseId, run: RunId, path: string) => (cells: readonly string[]): boolean => cells[0] === clause && cells[1] === run && cells[3] === path;

/** The acceptance bullet as the entry writes it, the anchor of the acceptance falsifiers' edits. */
const ACCEPTANCE_BULLET = `- Acceptance (bead description): "${ACCEPTANCE}"`;
const QUOTED_NONE = `the entry quotes the acceptance sentence 0 times, not once: "${ACCEPTANCE}"`;
const replaceBullet = (live: Sources, bullet: string): Sources => withMarkdown(live, markdown => markdown.replace(ACCEPTANCE_BULLET, bullet));
const R2_BOUNDS = (selectorTargetMs: number): string => `R2: bounds reads {"selectorTargetMs":${selectorTargetMs},"redrawMaxHz":4,"foldThresholdEvents":100000}; reducer-selector-bench judges against {"selectorTargetMs":20,"redrawMaxHz":4,"foldThresholdEvents":100000}`;

/**
 * The falsifiers, in case order. Each edits a copy of the live inputs (the receipt, the data file, both, or docs/14;
 * several carry more than one edit), and its case asserts that the copy changes exactly `edits` before the red its
 * title names; the receipt's falsifier table lists every one (W21R-EDITS).
 */
const FALSIFIERS: readonly Falsifier[] = [
  {
    id: "W21R-F01",
    edits: "receipt",
    title: "a timing cell edited away from its line is named by the A2 reader",
    edit: live => editRow(live, rowOf("A2", "R2", "reducer.all"), cells => cells.map((cell, index) => (index === 6 ? `${cell}1` : cell))),
    holds: edited => expect(clauseFindings(edited, "A2").some(line => line.startsWith("A2/R2/reducer.all: p95 ms cell"))).toBe(true),
  },
  {
    id: "W21R-F02",
    edits: "data file",
    title: "a p95 over 20 ms planted in R1's line under its recorded within-target verdict is caught by the re-judge",
    edit: live => editLine(live, "R1", receipt => setAt(receipt, `${NAV}.resize.p95`, 25)),
    holds: edited => {
      expect(rejudgeFindings(edited)).toContain("R1: re-judged exitCode 1; the line records 0");
      expect(shapeFindings(edited).some(line => line.startsWith("line R1: the data line's sha256 is "))).toBe(true);
    },
  },
  {
    id: "W21R-F03",
    edits: "data file",
    title: "a 9999-operation fixture in R1's line is not the W21 shape: the re-judge and the A1 floor both name it",
    edit: live => editLine(live, "R1", receipt => setAt(receipt, "fixture.nodes", 9999)),
    holds: edited => {
      expect(rejudgeFindings(edited)).toContain("R1: not realised under the inspector-grouped-bench assessor (not the W21 shape)");
      expect(clauseFindings(edited, "A1")).toContain("A1 floor: R1 measured 9999 operations, below 10000");
    },
  },
  {
    id: "W21R-F04",
    edits: "data file",
    title: "a dirty tree stamped in R3's line is named by the tree-and-host reader",
    edit: live => editLine(live, "R3", receipt => setAt(receipt, "dirty", true)),
    holds: edited => expect(treeHostFindings(edited)).toContain("R3: dirty reads true; the table lists false"),
  },
  {
    id: "W21R-F05",
    edits: "data file",
    title: "X1's line removed from the data file is named by the shape reader and by the runs reader",
    edit: live => dropLine(live, "X1"),
    holds: edited => {
      expect(shapeFindings(edited).some(line => line.startsWith("data lines "))).toBe(true);
      expect(runsFindings(edited)).toContain("runs X1: no receipt line to read the row against");
    },
  },
  {
    id: "W21R-F06",
    edits: "data file",
    title: "another host's cpu count in R2's line is named by the tree-and-host reader",
    edit: live => editLine(live, "R2", receipt => setAt(receipt, "cpus", 32)),
    holds: edited => expect(treeHostFindings(edited)).toContain("R2: cpus reads 32; the table lists 64"),
  },
  {
    id: "W21R-F07",
    edits: "receipt",
    title: "X1's finding claimed away in the runs table (exit 0, within-bound) is named by the runs reader",
    edit: live => editRow(live, cells => cells[0] === "X1", cells => cells.map((cell, index) => (index === 6 ? "0" : index === 7 ? "within-bound" : cell))),
    holds: edited => {
      const findings = runsFindings(edited);
      expect(findings).toContain("runs X1: exit cell 0; the line reads 1");
      expect(findings).toContain("runs X1: verdict cell within-bound; the line reads over-bound");
    },
  },
  {
    id: "W21R-F08",
    edits: "receipt",
    title: "the acceptance quote without its declared-host words is named by the acceptance reader",
    edit: live => withMarkdown(live, markdown => markdown.replace("reducer/layout timings on declared host;", "reducer/layout timings;")),
    holds: edited => expect(acceptanceFindings(edited)).toHaveLength(1),
  },
  {
    id: "W21R-F09",
    edits: "receipt",
    title: "X1's ArrayBuffer row dropped from the memory table is named by the A3 reader",
    edit: live => editRow(live, rowOf("A3", "X1", "judged.arrayBufferGrowthBytes"), () => null),
    holds: edited => expect(clauseFindings(edited, "A3").some(line => line.startsWith("A3 table rows differ from the frozen pins"))).toBe(true),
  },
  {
    id: "W21R-F10",
    edits: "receipt",
    title: "X1's over-bound ArrayBuffer row marked within bound is named by the A3 reader",
    edit: live => editRow(live, rowOf("A3", "X1", "judged.arrayBufferGrowthBytes"), cells => cells.map((cell, index) => (index === 6 ? "yes" : cell))),
    holds: edited => expect(clauseFindings(edited, "A3")).toContain("A3/X1/judged.arrayBufferGrowthBytes: Within bound cell yes; the line reads no"),
  },
  {
    id: "W21R-F11",
    edits: "data file",
    title: "a group count changed in X2's line breaks the one-fixture rule of the A1 reader",
    edit: live => editLine(live, "X2", receipt => setAt(receipt, "fixture.groups", 842)),
    holds: edited => expect(clauseFindings(edited, "A1")).toContain("A1 fixture: X2 fixture.groups reads 842; R1 reads 843"),
  },
  {
    id: "W21R-F12",
    edits: "data file",
    title: "an over-bound verdict recorded for R4's within-bound measurements is caught by the re-judge",
    edit: live => editLine(live, "R4", receipt => setAt(receipt, "verdict", "over-bound")),
    holds: edited => expect(rejudgeFindings(edited)).toContain("R4: re-judged verdict within-bound; the line records over-bound"),
  },
  {
    id: "W21R-F13",
    edits: "receipt and data file",
    title: "a tree stamped dirty in the table and in every line is named by the tree-and-host reader's clean-tree rule",
    edit: live =>
      editAllLines(
        editRow(live, cells => cells.length === 2 && cells[0] === "dirty", cells => [cells[0], "true"]),
        receipt => setAt(receipt, "dirty", true),
      ),
    holds: edited => expect(treeHostFindings(edited)).toEqual(["dirty true: the measured tree was not clean"]),
  },
  {
    id: "W21R-F14",
    edits: "receipt and data file",
    title: "a caller-asserted short revision in the table and in every line is named by the git and full-sha rules",
    edit: live => {
      const rows = editRow(editRow(live, cells => cells.length === 2 && cells[0] === "revision", cells => [cells[0], "ce180d8"]), cells => cells.length === 2 && cells[0] === "revisionSource", cells => [cells[0], "env-override"]);
      return editAllLines(rows, receipt => {
        setAt(receipt, "revision", "ce180d8");
        setAt(receipt, "revisionSource", "env-override");
      });
    },
    holds: edited => expect(treeHostFindings(edited)).toEqual(["revision ce180d8 is not a full git sha", "revisionSource env-override is not git"]),
  },
  {
    id: "W21R-F15",
    edits: "receipt",
    title: "a host row dropped from the tree-and-host table is named by its field-list rule",
    edit: live => editRow(live, cells => cells.length === 2 && cells[0] === "toolchain.piTui", () => null),
    holds: edited => expect(treeHostFindings(edited).some(line => line.startsWith("tree-and-host fields "))).toBe(true),
  },
  {
    id: "W21R-F16",
    edits: "receipt",
    title: "a run of record without a cmd_ id and a direct run with one are both named by the runs reader",
    edit: live =>
      editRow(
        editRow(live, cells => cells.length === 8 && cells[0] === "R1", cells => cells.map((cell, index) => (index === 3 ? "none" : cell))),
        cells => cells.length === 8 && cells[0] === "X2",
        cells => cells.map((cell, index) => (index === 3 ? "cmd_0123456789ab" : cell)),
      ),
    holds: edited => {
      const findings = runsFindings(edited);
      expect(findings).toContain("runs R1: command id cell none is not a cmd_ id");
      expect(findings).toContain("runs X2: a direct run names command id cmd_0123456789ab");
    },
  },
  {
    id: "W21R-F17",
    edits: "receipt",
    title: "a runs-table utc cell one millisecond off its line is named by the runs reader",
    edit: live => editRow(live, cells => cells.length === 8 && cells[0] === "R2", cells => cells.map((cell, index) => (index === 5 ? "2026-11-11T05:41:44.617Z" : cell))),
    holds: edited => expect(runsFindings(edited)).toContain("runs R2: utc cell 2026-11-11T05:41:44.617Z; the line reads 2026-11-11T05:41:44.616Z"),
  },
  {
    id: "W21R-F18",
    edits: "receipt",
    title: "X3's row dropped from the runs table and from the receipt-lines table is named by the shape reader twice",
    edit: live =>
      editRow(
        editRow(live, cells => cells.length === 8 && cells[0] === "X3", () => null),
        cells => cells.length === 3 && cells[0] === "X3",
        () => null,
      ),
    holds: edited => {
      const findings = shapeFindings(edited);
      expect(findings.some(line => line.startsWith("runs table rows "))).toBe(true);
      expect(findings.some(line => line.startsWith("receipt-lines table rows "))).toBe(true);
    },
  },
  {
    id: "W21R-F19",
    edits: "data file",
    title: "X2's line stored over several lines is named by the shape reader's one-line rule and its sha binding",
    edit: live => splitLine(live, "X2"),
    holds: edited => {
      const findings = shapeFindings(edited);
      expect(findings.some(line => line.startsWith("line X2: holds ") && line.endsWith(" lines, not the one receipt line"))).toBe(true);
      expect(findings.some(line => line.startsWith("line X2: the data line's sha256 is "))).toBe(true);
    },
  },
  {
    id: "W21R-F20",
    edits: "data file",
    title: "another contract, another command and an unmeasured flag in three lines are named by the re-judge",
    edit: live =>
      editLine(
        editLine(
          editLine(live, "R3", receipt => setAt(receipt, "contract", "workbench.timeline-grouped-bench/v0")),
          "R2",
          receipt => setAt(receipt, "command", "node qa/workbench/other-bench.mjs"),
        ),
        "R4",
        receipt => setAt(receipt, "measured", false),
      ),
    holds: edited => {
      const findings = rejudgeFindings(edited);
      expect(findings).toContain("R3: contract workbench.timeline-grouped-bench/v0; timeline-grouped-bench prints workbench.timeline-grouped-bench/v1");
      expect(findings).toContain("R2: command node qa/workbench/other-bench.mjs; reducer-selector-bench is node qa/workbench/reducer-selector-bench.mjs");
      expect(findings).toContain("R4: measured is false");
    },
  },
  {
    id: "W21R-F21",
    edits: "data file",
    title: "a shallowest nesting of 4 in R1's line is named by the A1 depth floor",
    edit: live => editLine(live, "R1", receipt => setAt(receipt, "fixture.minDepth", 4)),
    holds: edited => expect(clauseFindings(edited, "A1")).toContain("A1 floor: R1 fixture.minDepth reads 4; the W21 shape nests exactly 5 deep"),
  },
  {
    id: "W21R-F22",
    edits: "receipt",
    title: "the acceptance sentence quoted a second time is named by the acceptance reader",
    edit: live => withMarkdown(live, markdown => markdown.replace("\n### Runs\n", `\nQuoted again: "${ACCEPTANCE}"\n\n### Runs\n`)),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([`the entry quotes the acceptance sentence 2 times, not once: "${ACCEPTANCE}"`]),
  },
  {
    id: "W21R-F23",
    edits: "receipt",
    title: "the entry heading reworded leaves every reader without its entry",
    edit: live => withMarkdown(live, markdown => markdown.replace(`## ${ENTRY_HEADING}`, `## ${ENTRY_HEADING.replace("W21 parent acceptance", "W21 acceptance")}`)),
    holds: edited => {
      const missing = `entry: 0 level-2 headings read "${ENTRY_HEADING}", not 1`;
      expect(shapeFindings(edited)).toContain(missing);
      expect(runsFindings(edited)).toContain(missing);
      expect(treeHostFindings(edited)).toContain(missing);
      expect(acceptanceFindings(edited)).toContain(missing);
      expect(falsifierTableFindings(edited)).toContain(missing);
    },
  },
  {
    id: "W21R-F24",
    edits: "receipt",
    title: "a second tree-and-host table in the entry is named by the one-table rule",
    edit: live => {
      const start = live.markdown.indexOf("| Field | Value |");
      const end = live.markdown.indexOf("\n\n", start);
      const block = live.markdown.slice(start, end);
      return withMarkdown(live, markdown => markdown.replace(block, `${block}\n\n${block}`));
    },
    holds: edited => expect(treeHostFindings(edited)).toEqual(['tree-and-host table: 2 tables of the entry carry the header "Field | Value", not 1']),
  },
  {
    id: "W21R-F25",
    edits: "receipt",
    title: "the acceptance quote hidden in an inline HTML comment inside its bullet (the gate's LEG2-P1 plant) is named by the no-HTML and rendered-quote rules",
    edit: live => replaceBullet(live, `- Acceptance (bead description): <!-- "${ACCEPTANCE}" -->`),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([NO_HTML, QUOTED_NONE]),
  },
  {
    id: "W21R-F26",
    edits: "receipt",
    title: "the acceptance quote moved into an HTML comment block (the gate's LEG2-P2 plant) is named by the no-HTML and rendered-quote rules",
    edit: live => withMarkdown(live, markdown => markdown.replace(`${ACCEPTANCE_BULLET}\n`, `<!-- "${ACCEPTANCE}" -->\n\n`)),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([NO_HTML, QUOTED_NONE]),
  },
  {
    id: "W21R-F27",
    edits: "receipt",
    title: "the acceptance quote inside a hidden span, whose text the rendered view keeps, is named by the no-HTML and plain-source rules",
    edit: live => replaceBullet(live, `- Acceptance (bead description): <span hidden>"${ACCEPTANCE}"</span>`),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([NO_HTML, `${UNPLAIN}Acceptance (bead description): <span hidden>"${ACCEPTANCE}"</span>`]),
  },
  {
    id: "W21R-F28",
    edits: "receipt",
    title: "an HTML comment elsewhere in the entry, the quote left plain, is named by the no-HTML rule alone",
    edit: live => withMarkdown(live, markdown => markdown.replace("\n### Runs\n", "\n<!-- a note the page does not show -->\n\n### Runs\n")),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([NO_HTML]),
  },
  {
    id: "W21R-F29",
    edits: "receipt",
    title: "the acceptance quote written as an image's alt text is named by the plain-source rule alone",
    edit: live => replaceBullet(live, `- Acceptance (bead description): !["${ACCEPTANCE}"](acceptance.png)`),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([`${UNPLAIN}Acceptance (bead description): !["${ACCEPTANCE}"](acceptance.png)`]),
  },
  {
    id: "W21R-F30",
    edits: "receipt",
    title: "the acceptance quote moved into a link title, which the page shows only as a tooltip, is named by the rendered-quote rule alone",
    edit: live => replaceBullet(live, `- Acceptance (bead description): [the bead](https://example.invalid/wb-9x5 '"${ACCEPTANCE}"')`),
    holds: edited => expect(acceptanceFindings(edited)).toEqual([QUOTED_NONE]),
  },
  {
    id: "W21R-F31",
    edits: "data file",
    title: "R2's selector target loosened to 2000 ms in its line (the line edit of the gate's LEG2-P9 plant) re-judges as recorded and is named by the bounds reader",
    edit: live => editLine(live, "R2", receipt => setAt(receipt, "bounds.selectorTargetMs", 2000)),
    holds: edited => {
      expect(rejudgeFindings(edited)).toEqual([]);
      expect(boundsFindings(edited)).toEqual([R2_BOUNDS(2000)]);
    },
  },
  {
    id: "W21R-F32",
    edits: "data file",
    title: "a 25 ms overview p95 planted in R2's line under a 2000 ms target (the line edits of the gate's LEG2-P9b plant) re-judges as recorded and is named by the bounds reader",
    edit: live =>
      editLine(live, "R2", receipt => {
        setAt(receipt, "bounds.selectorTargetMs", 2000);
        setAt(receipt, "selectors.overview.p95", 25);
      }),
    holds: edited => {
      expect(rejudgeFindings(edited)).toEqual([]);
      expect(boundsFindings(edited)).toEqual([R2_BOUNDS(2000)]);
    },
  },
  {
    id: "W21R-F33",
    edits: "data file",
    title: "X1's ArrayBuffer bound loosened to 8 MiB in its line (the bound edit of the gate's LEG2-P10 plant) is named by the bounds reader",
    edit: live => editLine(live, "X1", receipt => setAt(receipt, "bounds.arrayBufferGrowthBytes", 8_388_608)),
    holds: edited =>
      expect(boundsFindings(edited)).toEqual([
        'X1: bounds reads {"heapGrowthAfterWarmupBytes":16777216,"arrayBufferGrowthBytes":8388608,"reachableBodiesAfterBlur":0}; inspector-retained-memory-bench judges against {"heapGrowthAfterWarmupBytes":16777216,"arrayBufferGrowthBytes":1048576,"reachableBodiesAfterBlur":0}',
      ]),
  },
  {
    id: "W21R-F34",
    edits: "data file",
    title: "R1's and R3's recorded 20 ms targets raised to 200 ms in their lines are named by the bounds reader",
    edit: live =>
      editLine(
        editLine(live, "R1", receipt => setAt(receipt, "target.ms", 200)),
        "R3",
        receipt => setAt(receipt, "target.ms", 200),
      ),
    holds: edited => expect(boundsFindings(edited)).toEqual(["R1: target.ms reads 200; inspector-grouped-bench judges against 20", "R3: target.ms reads 200; timeline-grouped-bench judges against 20"]),
  },
  {
    id: "W21R-F35",
    edits: "docs/14",
    title: "the docs/14 target sentence edited from 20 ms to 200 ms is named by the bounds reader against both 20 ms constants",
    edit: live => ({ ...live, docs14: live.docs14.replace("Proposed responsive target <=20ms per navigation", "Proposed responsive target <=200ms per navigation") }),
    holds: edited => expect(boundsFindings(edited)).toEqual(["docs/14 target <=200ms; NAVIGATION_TARGET_MS is 20", "docs/14 target <=200ms; SELECTOR_TARGET_MS is 20"]),
  },
  {
    id: "W21R-F36",
    edits: "data file",
    title: "an empty runs array in the data file (the gate's LEG2-P11 plant) is named by the tree-and-host reader for every run",
    edit: live => {
      const { parsed } = dataForEdit(live.data);
      parsed.runs = [];
      return { ...live, data: `${JSON.stringify(parsed, null, 2)}\n` };
    },
    holds: edited => expect(treeHostFindings(edited)).toEqual(RUNS.map(run => `${run.id}: no parsed receipt line to read the tree and host from`)),
  },
  {
    id: "W21R-F37",
    edits: "receipt",
    title: "a falsifier row dropped from the receipt's falsifier table is named by the falsifier-table reader",
    edit: live => editRow(live, cells => cells.length === 3 && cells[0] === "W21R-F13", () => null),
    holds: edited => {
      const findings = falsifierTableFindings(edited);
      expect(findings.some(line => line.startsWith("falsifier table row 13: W21R-F14 | "))).toBe(true);
      expect(findings.at(-1)?.startsWith(`falsifier table row ${FALSIFIERS.length}: (absent); FALSIFIERS lists `)).toBe(true);
    },
  },
  {
    id: "W21R-F38",
    edits: "receipt",
    title: "a falsifier's edited-copy cell changed from data file to receipt is named by the falsifier-table reader",
    edit: live => editRow(live, cells => cells.length === 3 && cells[0] === "W21R-F02", cells => [cells[0], "receipt", cells[2]]),
    holds: edited => {
      const title = FALSIFIERS.find(falsifier => falsifier.id === "W21R-F02")?.title ?? "";
      expect(falsifierTableFindings(edited)).toEqual([`falsifier table row 2: W21R-F02 | receipt | ${title}; FALSIFIERS lists W21R-F02 | data file | ${title}`]);
    },
  },
];

describe("wb-9x5 W21 parent acceptance receipt: every table read back against the committed bench receipt lines", () => {
  it("W21R-SHAPE: the runs table, the receipt-lines table and the data file name exactly the seven runs in order, each line sha-bound and on one line", () => {
    expect(shapeFindings(readLive())).toEqual([]);
  });

  it("W21R-REJUDGE: every data line is its bench's receipt and re-judges under its bench's own assessor to the exit code, verdict and realisation it records", () => {
    expect(rejudgeFindings(readLive())).toEqual([]);
  });

  it("W21R-RUNS: every runs-table row equals its line's exit code, verdict and utc, and names a command id only for a run of record", () => {
    expect(runsFindings(readLive())).toEqual([]);
  });

  it("W21R-TREE-HOST: every run has a parsed line, and one clean git revision and one declared host and toolchain are equal in every data line", () => {
    expect(treeHostFindings(readLive())).toEqual([]);
  });

  it("W21R-A1: the fixture table holds R1's 10k grouped fixture, which every run measured: at least 10000 operations nested exactly 5 deep", () => {
    expect(clauseFindings(readLive(), "A1")).toEqual([]);
  });

  it("W21R-A2: the timing table holds exactly its pinned reducer and layout series with the samples, p50, p95 and max each line records", () => {
    expect(clauseFindings(readLive(), "A2")).toEqual([]);
  });

  it("W21R-A3: the memory table holds the judged figures and bounds of the four retained-memory runs, with within cells computed from the lines", () => {
    expect(clauseFindings(readLive(), "A3")).toEqual([]);
  });

  it("W21R-BOUNDS: every line records the bound its bench's assessor judges, as the bench modules export it, and docs/14's target sentence renders the same figures", () => {
    expect(boundsFindings(readLive())).toEqual([]);
  });

  it("W21R-ACCEPTANCE: read as the page renders it, the entry carries no HTML and quotes the bead's acceptance sentence once, verbatim and as plain text, built from the clause phrases in order", () => {
    expect(ACCEPTANCE).toBe("10k+ grouped operations measured; p50/p95 reducer/layout timings on declared host; memory bounded by active projection. Acceptance: measured runs, no invented numbers.");
    expect(acceptanceFindings(readLive())).toEqual([]);
  });

  it("W21R-FROZEN: the run set, the clause pins and the falsifier list keep their frozen shape (standing rule 16)", () => {
    expect(RUNS.map(run => `${run.id}:${run.bench}:${run.kind}`)).toEqual([
      "R1:inspector-grouped-bench:forge run of record",
      "R2:reducer-selector-bench:forge run of record",
      "R3:timeline-grouped-bench:forge run of record",
      "R4:inspector-retained-memory-bench:forge run of record",
      "X1:inspector-retained-memory-bench:direct node run",
      "X2:inspector-retained-memory-bench:direct node run",
      "X3:inspector-retained-memory-bench:direct node run",
    ]);
    expect(CLAUSES.map(clause => `${clause.id}:${clause.pins.length}`)).toEqual(["A1:8", "A2:15", "A3:12"]);
    expect(CLAUSES.flatMap(clause => clause.pins.map(pin => `${clause.id}/${pin.run}/${pin.path}`))).toEqual([
      "A1/R1/fixture.nodes",
      "A1/R1/fixture.groups",
      "A1/R1/fixture.depth",
      "A1/R1/fixture.minDepth",
      "A1/R1/fixture.updates",
      "A1/R1/fixture.ticks",
      "A1/R1/fixture.minChangesPerTick",
      "A1/R1/fixture.maxChangesPerTick",
      "A2/R2/reducer.all",
      "A2/R2/selectors.overview",
      "A2/R2/selectors.graph",
      "A2/R2/selectors.timeline",
      "A2/R2/selectors.details",
      "A2/R1/passes.bench-only-limits.navigation.reducer",
      "A2/R1/passes.bench-only-limits.navigation.layout",
      "A2/R1/passes.bench-only-limits.navigation.all",
      "A2/R1/passes.bench-only-limits.navigation.resize",
      "A2/R1/passes.bench-only-limits.navigation.byView.overview",
      "A2/R1/passes.bench-only-limits.navigation.byView.graph",
      "A2/R1/passes.bench-only-limits.navigation.byView.timeline",
      "A2/R1/passes.bench-only-limits.navigation.byView.details",
      "A2/R3/passes.maxQuery-40.build.overall",
      "A2/R3/passes.maxQuery-100.build.overall",
      "A3/R4/judged.heapGrowthAfterWarmupBytes",
      "A3/R4/judged.arrayBufferGrowthBytes",
      "A3/R4/judged.reachableBodiesAfterBlur",
      "A3/X1/judged.heapGrowthAfterWarmupBytes",
      "A3/X1/judged.arrayBufferGrowthBytes",
      "A3/X1/judged.reachableBodiesAfterBlur",
      "A3/X2/judged.heapGrowthAfterWarmupBytes",
      "A3/X2/judged.arrayBufferGrowthBytes",
      "A3/X2/judged.reachableBodiesAfterBlur",
      "A3/X3/judged.heapGrowthAfterWarmupBytes",
      "A3/X3/judged.arrayBufferGrowthBytes",
      "A3/X3/judged.reachableBodiesAfterBlur",
    ]);
    expect(FALSIFIERS.map(falsifier => `${falsifier.id}:${falsifier.edits}`)).toEqual([
      "W21R-F01:receipt",
      "W21R-F02:data file",
      "W21R-F03:data file",
      "W21R-F04:data file",
      "W21R-F05:data file",
      "W21R-F06:data file",
      "W21R-F07:receipt",
      "W21R-F08:receipt",
      "W21R-F09:receipt",
      "W21R-F10:receipt",
      "W21R-F11:data file",
      "W21R-F12:data file",
      "W21R-F13:receipt and data file",
      "W21R-F14:receipt and data file",
      "W21R-F15:receipt",
      "W21R-F16:receipt",
      "W21R-F17:receipt",
      "W21R-F18:receipt",
      "W21R-F19:data file",
      "W21R-F20:data file",
      "W21R-F21:data file",
      "W21R-F22:receipt",
      "W21R-F23:receipt",
      "W21R-F24:receipt",
      "W21R-F25:receipt",
      "W21R-F26:receipt",
      "W21R-F27:receipt",
      "W21R-F28:receipt",
      "W21R-F29:receipt",
      "W21R-F30:receipt",
      "W21R-F31:data file",
      "W21R-F32:data file",
      "W21R-F33:data file",
      "W21R-F34:data file",
      "W21R-F35:docs/14",
      "W21R-F36:data file",
      "W21R-F37:receipt",
      "W21R-F38:receipt",
    ]);
  });

  it("W21R-EDITS: the receipt's falsifier table lists exactly the falsifiers of this file, in order, each with the input its edited copy changes and its case title", () => {
    expect(falsifierTableFindings(readLive())).toEqual([]);
  });
});

describe("wb-9x5 W21 acceptance receipt falsifiers: edited copies of the live receipt, the data file or docs/14 read red", () => {
  for (const falsifier of FALSIFIERS) {
    it(`${falsifier.id}: ${falsifier.title}`, () => {
      const live = readLive();
      const edited = falsifier.edit(live);
      expect(editsOf(live, edited)).toBe(falsifier.edits);
      falsifier.holds(edited);
    });
  }
});
