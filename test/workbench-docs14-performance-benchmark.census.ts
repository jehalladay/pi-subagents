/**
 * wb-9x5.17 (VC-2/W21): census falsifier for the "Performance benchmark" section of
 * docs/workbench/14-qa-and-benchmarks.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (the post-nl8
 * adoption cut: judge(.forge/vitest-report.json, pins) through the shared helper test/helpers/census.ts).
 *
 * The section states the W21 contract in three parts: a fixture sentence (seven properties), seven "Measure:"
 * bullets and a target/honesty paragraph. This leg binds each of the nineteen clauses to existing cases by file,
 * verbatim title and tier, or records the half no landed case covers as unpinned with a reason. It executes no pinned
 * case and no bench: judge() reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT,
 * written by `npm run test` before the census step runs), so a pinned case counts only when the gate's own run
 * collected it exactly once, recorded it passed, and its body asserts - the helper's three legs, fail-closed. A
 * renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore reads red,
 * naming the row, the file, the title and the cause, as far as the helper's resolvable-construct roster and its named
 * residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls itself,
 * reads no forge.toml and spawns no process: every title is located by the helper, from vitest's report, never from
 * bare text.
 *
 * Tiers: a half's tier names the report that vouches for it. The default report vouches for the default gate's test
 * tier only, and judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)). Every measure and target clause is
 * therefore split (the 02:00Z O1 rule) into a default-gate GUARD half (cases that test the receipt builders and the
 * honesty rules and run in every default gate), a default-gate REGISTRATION half (the case that asserts the bench is a
 * Forge command outside the default gate) and a bench-receipt half. The bench-receipt half is the receipt a bench
 * command produces when run by its own [build.commands.*] block outside gate = [...]; no report this leg reads vouches
 * for it, so it is RECORDED with its tier and is always unpinned with a reason, never counted as covered, and this
 * leg never runs or reads it.
 *
 * Docs: the section is judged through the helper's rendered view (docsSection / sectionMatches). Under its unique
 * level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, it must render as
 * exactly its four frozen blocks (fixture paragraph, the seven-item list, the target paragraph, and the W21 bench-CLI
 * paragraph, which is frozen but carries no row). A dropped, reworded, reordered or hidden clause names its row; any
 * other edit of the section names the section. The drift falsifiers run over a SYNTHETIC document built from the
 * frozen blocks, never over the live docs/14 text, so a legitimate edit of any other section can never redden a
 * falsifier row.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does
 * not follow; the receipts themselves (no real measurement, scale, timing or live pass is claimed from a title being
 * present); wb-9x5.14's evidence-retained bench measures EvidenceStore retention and is deliberately NOT bound to
 * "projection memory"; the open four-view navigation and resize receipt (wb-9x5.11) leaves "render/navigate/resize"
 * across the four views a visible gap.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Tier = "default-gate" | "bench-receipt";
type Part = "fixture" | "measure" | "target";
interface Pin {
  readonly file: string;
  readonly title: string;
}
interface Half {
  /** The part of the row's clause this half answers. */
  readonly id: string;
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  /** Why no landed case binds this half; an unpinned half is never counted as covered. */
  readonly reason?: string;
  /** For a bench-receipt half: the forge.toml command that produces the receipt outside the default gate. */
  readonly command?: string;
}
interface Row {
  readonly row: string;
  readonly part: Part;
  /** The docs/14 clause, verbatim in the rendered section (a list bullet without its marker). */
  readonly clause: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs14-performance-benchmark.census.ts";
const DOCS_FILE = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS_HEADING = "Performance benchmark";
const EM_DASH = String.fromCodePoint(0x2014);
const EN_DASH = String.fromCodePoint(0x2013);
const DOCS_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

const GROUPED = "test/workbench-grouped-fixture.test.ts";
const RECOVERY = "test/workbench-observation-recovery-receipt.test.ts";
const PERF = "test/workbench-observation-perf.test.ts";
const SELECTOR = "test/workbench-reducer-selector-bench.test.ts";
const LINEDIFF = "test/workbench-line-diff-bench.test.ts";
const TIMELINE = "test/workbench-timeline-grouped-bench.test.ts";
const ATTENTION = "test/workbench-attention-grouped-bench.test.ts";
const TOOLREPLY = "test/workbench-tool-reply-bench.test.ts";
const RETAINED = "test/workbench-retained-memory.test.ts";

const pin = (file: string, title: string): Pin => ({ file, title });
const guard = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const registration = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const unpinned = (id: string, reason: string): Half => ({ id, tier: "default-gate", pins: [], reason });
/** The receipt half of a bench: produced only by its own forge command outside gate = [...], vouched by no report this leg reads. */
const receipt = (id: string, command: string): Half => ({
  id,
  tier: "bench-receipt",
  command,
  pins: [],
  reason: `the ${command} receipt is produced only by the [build.commands.${command}] run outside gate = [...]; no report this leg reads vouches for it, and this leg never runs a bench or reads a receipt file, so the receipt half is recorded here with its tier and is never counted as covered`,
});

const GROUPED_REGISTERS = pin(GROUPED, "registers inspector-grouped-bench as a Forge command outside the default gate");
const SELECTOR_REGISTERS = pin(SELECTOR, "registers reducer-selector-bench as a Forge command outside the default gate");
const RECOVERY_REGISTERS = pin(RECOVERY, "registers the bench as one additive Forge command outside the default gate");
const LINEDIFF_REGISTERS = pin(LINEDIFF, "registers line-diff-bench as a Forge command outside the default gate");
const TIMELINE_REGISTERS = pin(TIMELINE, "registers timeline-grouped-bench as one additive Forge command outside the default gate");
const ATTENTION_REGISTERS = pin(ATTENTION, "registers attention-grouped-bench as a Forge command outside the default gate, leaving the other blocks alone");
const TOOLREPLY_REGISTERS = pin(TOOLREPLY, "registers tool-reply-bench as a Forge command outside the default gate");
const RETAINED_REGISTERS = pin(RETAINED, "registers one Forge command with --expose-gc outside the default gate");

const FIXTURE_TEXT = `Construct deterministic fixture with >=1000 nodes, >=100000 events, 1${EN_DASH}100 active changes per tick, 5 nested groups depth, partial graph links, long Unicode paths and large transcript payload refs. Measure:`;
const MEASURE_ITEMS: readonly string[] = [
  "observer ingest events/s and projection memory",
  "p50/p95 reducer update and UI selector time",
  "p50/p95 layout render/navigate/resize time",
  "number of visible rendered rows vs total nodes",
  "terminal bytes per update (with line diff)",
  "recover snapshot/cursor latency",
  "Pi model tool response size under bounded queries",
];
const TARGET_TEXT =
  "Proposed responsive target <=20ms per navigation/layout calculation on declared reference host, redraw <=4Hz live; no full 100k-event fold per redraw; report measured hardware/toolchain and outliers. No invented pass numbers.";
const BENCH_CLI_MARKDOWN =
  "Every landed W21 bench is a CLI at `qa/workbench/*-bench.mjs` whose first line is a `// W21` comment. `test/helpers/w21-bench-clis.ts` exports that first-line rule (`W21_HEADER`, `isW21BenchHeader`) and enumerates the benches from it, the W21 falsifier suites read the enumeration instead of a hand-kept list, and the known-duration suite's header census reports a `// W21` header displaced below a shebang or licence line as misplaced rather than leaving the bench silently outside both censuses.";
const BENCH_CLI_TEXT = BENCH_CLI_MARKDOWN.replaceAll("`", "");

/** The frozen docs/14 section as its source markdown blocks, in order; the synthetic falsifier documents are built from these. */
const SECTION_MARKDOWN: readonly string[] = [FIXTURE_TEXT, MEASURE_ITEMS.map(item => `- ${item}`).join("\n"), TARGET_TEXT, BENCH_CLI_MARKDOWN];
/** What a reader sees of the section: the four blocks the rendered view must equal, block by block. */
const SECTION_BLOCKS: readonly RenderedBlock[] = [
  { kind: "paragraph", text: FIXTURE_TEXT, markdown: FIXTURE_TEXT },
  { kind: "list", ordered: false, items: MEASURE_ITEMS.map(item => ({ text: item, markdown: item })) },
  { kind: "paragraph", text: TARGET_TEXT, markdown: TARGET_TEXT },
  { kind: "paragraph", text: BENCH_CLI_TEXT, markdown: BENCH_CLI_MARKDOWN },
];

/** Freezes the table and everything it holds, so no row, half or pin can be edited at runtime. */
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

const TABLE: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    row: "fixture:nodes",
    part: "fixture",
    clause: "Construct deterministic fixture with >=1000 nodes",
    halves: [
      guard("guard", [
        pin(GROUPED, "builds the default W21 fixture identically twice"),
        pin(GROUPED, "applies a 2,000-node subset to a default-limits projection without throwing and keeps typed fixture provenance"),
        pin(GROUPED, "keeps a default projection at 2,000 nodes and 4,000 edges, and no src/ literal raises either cap"),
      ]),
    ],
  },
  {
    row: "fixture:events",
    part: "fixture",
    clause: ">=100000 events",
    halves: [guard("guard", [pin(GROUPED, "changes 1-100 distinct operations per tick across >= 100 ticks, >= 100,000 updates, in tick order")])],
  },
  {
    row: "fixture:changes-per-tick",
    part: "fixture",
    clause: `1${EN_DASH}100 active changes per tick`,
    halves: [guard("guard", [pin(GROUPED, "changes 1-100 distinct operations per tick across >= 100 ticks, >= 100,000 updates, in tick order")])],
  },
  {
    row: "fixture:nested-groups",
    part: "fixture",
    clause: "5 nested groups depth",
    halves: [guard("guard", [pin(GROUPED, "nests every operation under exactly 5 group levels through grouping relations")])],
  },
  {
    row: "fixture:partial-links",
    part: "fixture",
    clause: "partial graph links",
    halves: [guard("guard", [pin(GROUPED, "adds partial dependency (about every 7th operation, never all) and hypothesis links between operations only")])],
  },
  {
    row: "fixture:unicode-paths",
    part: "fixture",
    clause: "long Unicode paths",
    halves: [guard("guard", [pin(GROUPED, "titles every node with a long Unicode path (CJK, combining marks) inside the projection's bounds")])],
  },
  {
    row: "fixture:payload-refs",
    part: "fixture",
    clause: "large transcript payload refs",
    halves: [guard("guard", [pin(GROUPED, "carries transcript payload references, never bodies, and only plain projection input fields")])],
  },
  {
    row: "measure:ingest-and-memory",
    part: "measure",
    clause: "observer ingest events/s and projection memory",
    halves: [
      guard("guard", [
        pin(RECOVERY, "times every refresh() call on its own and derives throughput and heap growth from the injected probes"),
        pin(PERF, "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history"),
        pin(RETAINED, "records a post-GC series over payload-bearing navigation under bench-only limits and releases every body on blur"),
      ]),
      registration("registration-recovery", [RECOVERY_REGISTERS]),
      registration("registration-retained", [RETAINED_REGISTERS]),
      receipt("receipt-recovery", "observation-recovery-bench"),
      receipt("receipt-retained", "inspector-retained-memory-bench"),
    ],
  },
  {
    row: "measure:reducer-and-selector-time",
    part: "measure",
    clause: "p50/p95 reducer update and UI selector time",
    halves: [
      guard("guard", [
        pin(SELECTOR, "emits host, toolchain, fixture shape, limits and every per-band latency"),
        pin(SELECTOR, "exits 1 and names the series when a selector p95 is over 20 ms, and never judges the reducer"),
      ]),
      registration("registration", [SELECTOR_REGISTERS]),
      receipt("receipt", "reducer-selector-bench"),
    ],
  },
  {
    row: "measure:layout-render-navigate-resize",
    part: "measure",
    clause: "p50/p95 layout render/navigate/resize time",
    halves: [
      guard("pass-b", [pin(GROUPED, "reports pass B with every offered row retained and navigation/layout/resize distributions per view, size and key")]),
      registration("registration-pass-b", [GROUPED_REGISTERS]),
      receipt("receipt-pass-b", "inspector-grouped-bench"),
      guard("lane-model", [pin(TIMELINE, "reports p50/p95/max overall and per (zoom, columns), plus the five slowest samples with their request")]),
      registration("registration-lane-model", [TIMELINE_REGISTERS]),
      receipt("receipt-lane-model", "timeline-grouped-bench"),
      unpinned(
        "four-view-resize",
        "The four-view navigation and resize layout-time receipt is the open bead wb-9x5.11 (status open at the cut base, trunk 5244f1c); the pass-B and lane-model halves above bind only what landed, so render, navigate and resize across the four views stay a visible gap until it lands and a seat flips this half consciously (the pin-flip pattern).",
      ),
    ],
  },
  {
    row: "measure:visible-rows-vs-total",
    part: "measure",
    clause: "number of visible rendered rows vs total nodes",
    halves: [
      guard("guard", [pin(GROUPED, "reports pass A as honest FIFO truncation: retained versus offered under default caps, no navigation claim")]),
      registration("registration", [GROUPED_REGISTERS]),
      receipt("receipt", "inspector-grouped-bench"),
    ],
  },
  {
    row: "measure:terminal-bytes",
    part: "measure",
    clause: "terminal bytes per update (with line diff)",
    halves: [
      guard("guard", [
        pin(LINEDIFF, "charges only the changed line on a single-line change, strictly under the full frame"),
        pin(LINEDIFF, "emits host, toolchain, fixture shape, limits and a series per view and width in every churn band"),
        pin(LINEDIFF, "never reports a diff above its own full frame, and the cold paint is excluded from the series"),
      ]),
      registration("registration", [LINEDIFF_REGISTERS]),
      receipt("receipt", "line-diff-bench"),
    ],
  },
  {
    row: "measure:recover-latency",
    part: "measure",
    clause: "recover snapshot/cursor latency",
    halves: [
      guard("guard", [
        pin(RECOVERY, "records every recovery and bounded-query field as a finite number and holds the recovery invariants (200 nodes / 2,000 events)"),
        pin(RECOVERY, "catches an evicted cursor reported as a complete resume"),
      ]),
      registration("registration", [RECOVERY_REGISTERS]),
      receipt("receipt", "observation-recovery-bench"),
    ],
  },
  {
    row: "measure:pi-tool-response-size",
    part: "measure",
    clause: "Pi model tool response size under bounded queries",
    halves: [
      guard("guard", [
        pin(TOOLREPLY, "emits host, toolchain, fixture shape, limits and one series per shape and cap"),
        pin(TOOLREPLY, "holds every reply of the real builder within its maxBytes, measured independently of the reply"),
        pin(TOOLREPLY, "records an oversize reply as a finding with exit 1 naming the series, never tuned away"),
      ]),
      registration("registration", [TOOLREPLY_REGISTERS]),
      receipt("receipt", "tool-reply-bench"),
    ],
  },
  {
    row: "target:20ms",
    part: "target",
    clause: "<=20ms per navigation/layout calculation on declared reference host",
    halves: [
      guard("guard", [
        pin(GROUPED, "exits 1 only for a bench-only p95 over 20 ms on a realised shape; 20 ms itself is within target"),
        pin(SELECTOR, "exits 1 and names the series when a selector p95 is over 20 ms, and never judges the reducer"),
        pin(TIMELINE, "exits 1 when any judged p95 is over 20 ms, in either pass, naming the series; the receipt is still a measurement"),
        pin(ATTENTION, "exits 0 on a W21-shaped receipt within the target, and 1 when any judged p95 is over 20 ms"),
      ]),
      registration("registration-grouped", [GROUPED_REGISTERS]),
      registration("registration-selector", [SELECTOR_REGISTERS]),
      registration("registration-timeline", [TIMELINE_REGISTERS]),
      registration("registration-attention", [ATTENTION_REGISTERS]),
      receipt("receipt-grouped", "inspector-grouped-bench"),
      receipt("receipt-selector", "reducer-selector-bench"),
      receipt("receipt-timeline", "timeline-grouped-bench"),
      receipt("receipt-attention", "attention-grouped-bench"),
    ],
  },
  {
    row: "target:redraw-4hz",
    part: "target",
    clause: "redraw <=4Hz live",
    halves: [
      guard("guard", [
        pin(SELECTOR, "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock"),
        pin(LINEDIFF, "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock"),
      ]),
      registration("registration-selector", [SELECTOR_REGISTERS]),
      registration("registration-line-diff", [LINEDIFF_REGISTERS]),
      receipt("receipt-selector", "reducer-selector-bench"),
      receipt("receipt-line-diff", "line-diff-bench"),
    ],
  },
  {
    row: "target:no-full-fold",
    part: "target",
    clause: "no full 100k-event fold per redraw",
    halves: [
      guard("guard", [
        pin(SELECTOR, "accounts reducer calls and bounded reads, and records no full fold per redraw"),
        pin(LINEDIFF, "F3: accounts bounded reads, and records a full fold per redraw as a finding with exit 1"),
      ]),
      registration("registration-selector", [SELECTOR_REGISTERS]),
      registration("registration-line-diff", [LINEDIFF_REGISTERS]),
      receipt("receipt-selector", "reducer-selector-bench"),
      receipt("receipt-line-diff", "line-diff-bench"),
    ],
  },
  {
    row: "target:report-hardware",
    part: "target",
    clause: "report measured hardware/toolchain and outliers",
    halves: [
      guard("guard", [
        pin(GROUPED, "emits every receipt field with host/toolchain, fixture shape and judged target"),
        pin(TIMELINE, "carries host, toolchain, command, overrides, fixture shape and sampling plan"),
      ]),
      registration("registration", [GROUPED_REGISTERS]),
      receipt("receipt", "inspector-grouped-bench"),
    ],
  },
  {
    row: "target:no-invented-pass-numbers",
    part: "target",
    clause: "No invented pass numbers.",
    halves: [
      guard("guard", [
        pin(GROUPED, "exits 2 for an unrealised measurement and names why, before any timing judgement"),
        pin(GROUPED, "exits 2 when a judged series was never sampled, rather than passing it by absence"),
        pin(TIMELINE, "exits 2 on an off-shape receipt even when every p95 is fast, and names the violated rules"),
        pin(LINEDIFF, "exits 2 for a wrong shape, a truncated projection, unapplied updates, an unsampled series or no redraws"),
      ]),
    ],
  },
]);

const ROW_IDS: readonly string[] = TABLE.map(row => row.row);
const EXPECTED_ROW_IDS: readonly string[] = [
  "fixture:nodes",
  "fixture:events",
  "fixture:changes-per-tick",
  "fixture:nested-groups",
  "fixture:partial-links",
  "fixture:unicode-paths",
  "fixture:payload-refs",
  "measure:ingest-and-memory",
  "measure:reducer-and-selector-time",
  "measure:layout-render-navigate-resize",
  "measure:visible-rows-vs-total",
  "measure:terminal-bytes",
  "measure:recover-latency",
  "measure:pi-tool-response-size",
  "target:20ms",
  "target:redraw-4hz",
  "target:no-full-fold",
  "target:report-hardware",
  "target:no-invented-pass-numbers",
];
/** Every half no report this leg reads vouches for, as "row/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = [
  "measure:ingest-and-memory/receipt-recovery",
  "measure:ingest-and-memory/receipt-retained",
  "measure:reducer-and-selector-time/receipt",
  "measure:layout-render-navigate-resize/receipt-pass-b",
  "measure:layout-render-navigate-resize/receipt-lane-model",
  "measure:layout-render-navigate-resize/four-view-resize",
  "measure:visible-rows-vs-total/receipt",
  "measure:terminal-bytes/receipt",
  "measure:recover-latency/receipt",
  "measure:pi-tool-response-size/receipt",
  "target:20ms/receipt-grouped",
  "target:20ms/receipt-selector",
  "target:20ms/receipt-timeline",
  "target:20ms/receipt-attention",
  "target:redraw-4hz/receipt-selector",
  "target:redraw-4hz/receipt-line-diff",
  "target:no-full-fold/receipt-selector",
  "target:no-full-fold/receipt-line-diff",
  "target:report-hardware/receipt",
];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The forge.toml command whose own run must vouch for a half; a bench-receipt label names no report this leg reads. */
const tierCommand = (half: Half): string => (half.tier === "default-gate" ? DEFAULT_GATE_TIER : (half.command ?? half.tier));
const casePin = (half: Half, entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: tierCommand(half) });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));
const BENCH_RECEIPTS = TABLE.flatMap(row => row.halves.filter(half => half.tier === "bench-receipt").map(half => ({ row, half })));

/** One line per pin that is not ok, naming the row and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${half.id}: ${verdict.code}: ${verdict.why}`);

/** The rendered text a row's clause is looked up in: the whole section for a fixture or target clause, the list items for a measure clause. */
function clauseRenders(row: Row, blocks: readonly RenderedBlock[]): boolean {
  if (row.part === "measure") return blocks.some(block => block.kind === "list" && block.items.some(item => item.text === row.clause));
  return blocks.some(block => block.kind === "paragraph" && block.text.includes(row.clause));
}

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row clause checks read the section's rendered
 * blocks and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  for (const row of TABLE) {
    if (!clauseRenders(row, section.blocks)) out.push(`row ${row.row}: its clause "${row.clause}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen blocks under the real heading shape, never the live text. */
const synthetic = (edit: (blocks: readonly string[]) => readonly string[] = blocks => blocks, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(SECTION_MARKDOWN).join("\n\n")}\n${tail}\n## Truth labels and release gates\n\nText.\n`;
const editBlock = (index: number, from: string, to: string) => (blocks: readonly string[]): readonly string[] => blocks.map((block, at) => (at === index ? block.replace(from, to) : block));
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

describe("wb-9x5.17 docs/workbench/14 performance-benchmark census (report mode)", () => {
  it("AC1: the table holds the nineteen frozen rows in order (7 fixture, 7 measure, 5 target), deeply frozen, each clause rendered in its section", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(ROW_IDS).toEqual(EXPECTED_ROW_IDS);
    expect(TABLE).toHaveLength(19);
    expect(TABLE.filter(row => row.part === "fixture")).toHaveLength(7);
    expect(TABLE.filter(row => row.part === "measure")).toHaveLength(7);
    expect(TABLE.filter(row => row.part === "target")).toHaveLength(5);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the live section renders exactly its four frozen blocks (fixture paragraph, seven-item list, target paragraph, bench-CLI paragraph), HTML-free", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(4);
    expect(MEASURE_ITEMS).toHaveLength(7);
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the two", () => {
    for (const row of TABLE) {
      expect(row.halves.length, `row ${row.row}: a row holds at least one half`).toBeGreaterThan(0);
      expect(
        row.halves.some(half => half.tier === "default-gate" && half.pins.length > 0),
        `row ${row.row}: a row is never silently unjudged: at least one default-gate half holds pins`,
      ).toBe(true);
      for (const half of row.halves) {
        expect(["default-gate", "bench-receipt"], `row ${row.row}/${half.id}: tier`).toContain(half.tier);
        if (half.reason === undefined) expect(half.pins.length, `row ${row.row}/${half.id}: a pinned half has pins`).toBeGreaterThan(0);
        else {
          expect(half.pins, `row ${row.row}/${half.id}: an unpinned half carries no pins`).toEqual([]);
          expect(half.reason.trim().length, `row ${row.row}/${half.id}: an unpinned half needs a reason`).toBeGreaterThan(40);
        }
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed; each bench receipt names its command and the open four-view gap names wb-9x5.11", () => {
    const listed = TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => `${row.row}/${half.id}`));
    expect(listed).toEqual(UNPINNED_HALVES);
    for (const { row, half } of BENCH_RECEIPTS) {
      expect(half.command, `row ${row.row}/${half.id}: a bench-receipt half names its command`).toBeDefined();
      expect(half.reason, `row ${row.row}/${half.id}`).toContain(`[build.commands.${half.command}]`);
      expect(half.reason, `row ${row.row}/${half.id}`).toContain("never counted as covered");
    }
    const fourView = TABLE.find(row => row.row === "measure:layout-render-navigate-resize")?.halves.find(half => half.id === "four-view-resize");
    expect(fourView?.reason).toContain("wb-9x5.11");
    expect(fourView?.tier).toBe("default-gate");
    expect(BENCH_RECEIPTS.map(({ half }) => half.command).sort()).toEqual(
      [
        "observation-recovery-bench",
        "observation-recovery-bench",
        "inspector-retained-memory-bench",
        "reducer-selector-bench",
        "inspector-grouped-bench",
        "timeline-grouped-bench",
        "inspector-grouped-bench",
        "line-diff-bench",
        "tool-reply-bench",
        "inspector-grouped-bench",
        "reducer-selector-bench",
        "timeline-grouped-bench",
        "attention-grouped-bench",
        "reducer-selector-bench",
        "line-diff-bench",
        "reducer-selector-bench",
        "line-diff-bench",
        "inspector-grouped-bench",
      ].sort(),
    );
  });

  it("AC3: the two bullets that had no landed case when the census was first cut are pinned now (wb-9x5.8 and wb-9x5.5 landed), and are not in the unpinned list", () => {
    expect(UNPINNED_HALVES.some(entry => entry.startsWith("measure:terminal-bytes/") && entry !== "measure:terminal-bytes/receipt")).toBe(false);
    expect(UNPINNED_HALVES.some(entry => entry.startsWith("measure:pi-tool-response-size/") && entry !== "measure:pi-tool-response-size/receipt")).toBe(false);
    const files = (id: string): string[] => (TABLE.find(row => row.row === id)?.halves.find(half => half.id === "guard")?.pins ?? []).map(entry => entry.file);
    expect(files("measure:terminal-bytes")).toEqual([LINEDIFF, LINEDIFF, LINEDIFF]);
    expect(files("measure:pi-tool-response-size")).toEqual([TOOLREPLY, TOOLREPLY, TOOLREPLY]);
  });

  it.each(JUDGED)("AC2 row $row.row/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report", ({ row, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(half, entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("AC4: a bench-receipt label is carried by no report this leg reads: the default report refuses a registration pin relabelled as its receipt", () => {
    expect(BENCH_RECEIPTS.length).toBeGreaterThan(0);
    const toolReply = BENCH_RECEIPTS.find(({ half }) => half.command === "tool-reply-bench");
    expect(toolReply).toBeDefined();
    if (toolReply === undefined) return;
    const [verdict] = judge(REPORT, [casePin(toolReply.half, TOOLREPLY_REGISTERS)]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, reads no forge.toml and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = TABLE.flatMap(row => row.halves.flatMap(half => half.pins.map(entry => basename(entry.file, ".ts"))));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-9x5.17 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (id: string): { row: Row; half: Half; entry: Pin } => {
    const found = JUDGED.find(({ row }) => row.row === id);
    const entry = found?.half.pins[0];
    if (found === undefined || entry === undefined) throw new Error(`row ${id} holds no judged pin`);
    return { row: found.row, half: found.half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, half, entry } = firstJudged("target:no-invented-pass-numbers");
    const wrong = { ...entry, title: entry.title.replace("unrealised", "unrealiseD") };
    const verdicts = judge(REPORT, [casePin(half, wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, half, verdicts);
    expect(line).toContain("row target:no-invented-pass-numbers/guard");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen ids no longer match)", () => {
    expect(TABLE.filter(row => row.row !== "target:20ms").map(row => row.row)).not.toEqual(EXPECTED_ROW_IDS);
  });

  it("M3: a pin with no title is red (the judge finds no such case)", () => {
    const { half } = firstJudged("fixture:nodes");
    const [verdict] = judge(REPORT, [casePin(half, { file: GROUPED, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { half, entry } = firstJudged("measure:recover-latency");
    const [verdict] = judge(REPORT, [casePin(half, { file: SELECTOR, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a pinned title that two rows share is judged once per row, so removing it from one row still leaves the other row's pin live", () => {
    const owners = TABLE.filter(row => row.halves.some(half => half.pins.some(entry => entry.file === GROUPED && entry.title.startsWith("changes 1-100 distinct operations per tick"))));
    expect(owners.map(row => row.row)).toEqual(["fixture:events", "fixture:changes-per-tick"]);
  });
});

describe("wb-9x5.17 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${SECTION_MARKDOWN.join("\n\n")}\n`)).toEqual([]);
  });

  it("K1 names the recover-latency row (and only it) when its bullet is dropped from the list", () => {
    const lines = docsFailures(synthetic(editBlock(1, "\n- recover snapshot/cursor latency", "")));
    expect(named(lines)).toEqual(["row measure:recover-latency"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names the 20ms row (and only it) when the target number is loosened", () => {
    expect(named(docsFailures(synthetic(editBlock(2, "<=20ms per navigation", "<=200ms per navigation"))))).toEqual(["row target:20ms"]);
  });

  it("K3 names the no-full-fold row (and only it) when the fold clause is dropped", () => {
    expect(named(docsFailures(synthetic(editBlock(2, " no full 100k-event fold per redraw;", ""))))).toEqual(["row target:no-full-fold"]);
  });

  it("K4 names the nested-groups row (and only it) when the fixture depth is weakened", () => {
    expect(named(docsFailures(synthetic(editBlock(0, "5 nested groups depth", "3 nested groups depth"))))).toEqual(["row fixture:nested-groups"]);
  });

  it("K5 names the changes-per-tick row (and only it) when the en dash range is collapsed to one number", () => {
    expect(named(docsFailures(synthetic(editBlock(0, `1${EN_DASH}100 active changes`, "100 active changes"))))).toEqual(["row fixture:changes-per-tick"]);
  });

  it("K6 names the no-invented-pass-numbers row (and only it) when the honesty sentence is removed", () => {
    expect(named(docsFailures(synthetic(editBlock(2, " No invented pass numbers.", ""))))).toEqual(["row target:no-invented-pass-numbers"]);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to the target paragraph", () => {
    const lines = docsFailures(synthetic(editBlock(2, "No invented pass numbers.", "No invented pass numbers. Unless the host says otherwise.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D2 goes red on the section when an eighth unclassified bullet is added to the Measure list", () => {
    const lines = docsFailures(synthetic(editBlock(1, "Pi model tool response size under bounded queries", "Pi model tool response size under bounded queries\n- a new unclassified measurement")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 2 differs");
  });

  it("D3 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, "## Performance notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_HEADING}: the section is refused`);
  });

  it("D4 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(blocks => blocks, "\n### Exceptions\n\nA host may skip these measurements.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 names the 4Hz row when its clause is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editBlock(2, "redraw <=4Hz live", "<!-- redraw <=4Hz live -->")));
    expect(named(lines)).toEqual(["row target:redraw-4hz"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 goes red on the section, naming no row, when two Measure bullets swap places", () => {
    const lines = docsFailures(
      synthetic(editBlock(1, "- observer ingest events/s and projection memory\n- p50/p95 reducer update and UI selector time", "- p50/p95 reducer update and UI selector time\n- observer ingest events/s and projection memory")),
    );
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 2 differs");
  });

  it("D8 goes red on the section, naming no row, when the frozen bench-CLI paragraph is reworded", () => {
    const lines = docsFailures(synthetic(editBlock(3, "whose first line is a", "whose last line is a")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 4 differs");
  });

  it("an edit of any other section never reddens a row: the matrix and the truth-label sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});
