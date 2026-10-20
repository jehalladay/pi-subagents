/**
 * wb-6ze.39 (VC-5/W15): census falsifier for the "Rendering pipeline" section of
 * docs/workbench/10-terminal-inspector.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (the post-nl8
 * adoption cut: judge(.forge/vitest-report.json, pins) through the shared helper test/helpers/census.ts); it replaces
 * the earlier hand-scanned test/workbench-rendering-pipeline.test.ts of this bead, whose text scanner the helper
 * supersedes.
 *
 * Spec (verbatim): docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "Each major work package
 * must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened." The section
 * states a diagram block and nine bullets; this leg binds each bullet to existing cases by file, verbatim title and
 * tier, or records the half no landed case covers as unpinned with a reason. It executes no pinned case and no bench:
 * judge() reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run
 * test` before the census step runs), so a pinned case counts only when the gate's own run collected it exactly once,
 * recorded it passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated,
 * skipped, todo, inverted, excluded or unregistered pinned case therefore reads red, naming the row, the file, the
 * title and the cause, as far as the helper's resolvable-construct roster and its named residuals reach
 * (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls itself and spawns no
 * process; its own code reads only docs/10 and the census-tier config, never forge.toml (the helper's tier vouch reads
 * forge.toml through its CLOSED forge-step read, by design: the test/helpers/census.ts header), and the last case pins
 * that (respin U4). Every title is located by the helper, from vitest's report, never from bare text.
 *
 * Tiers: a half's tier names the report that vouches for it. The default report vouches for the default gate's test
 * tier only, and judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)). Bullet 1 therefore splits (the
 * 02:00Z O1 rule) into a default-gate GUARD half and a bench-receipt half. The bench-receipt half is the receipt the
 * reducer-selector-bench command produces when run by its own [build.commands.*] block outside gate = [...]; no
 * report this leg reads vouches for it, so it is RECORDED with its tier and is always unpinned with a reason, never
 * counted as covered, and this leg never runs or reads it. The live redraw cadence is labelled UNMEASURED by
 * wb-9x5.15: the cap never binds on 1s fixture ticks and no live scheduler is measured, so no live cadence, scale or
 * performance pass is claimed from a title being present.
 *
 * Docs: the section is judged through the helper's rendered view (docsSection / sectionMatches). Under its unique
 * level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, it must render as
 * exactly its two frozen blocks (the pipeline diagram code block and the nine-item list). A dropped, reworded,
 * reordered or hidden bullet names its row; any other edit of the section names the section. The drift falsifiers run
 * over a SYNTHETIC document built from the frozen blocks, never over the live docs/10 text, so a legitimate edit of
 * any other section can never redden a falsifier row.
 *
 * Bullet 7's no-force-directed-in-render half (respin U2, record honesty): the closed producer wb-6ze.32 maps "Graph
 * layout cached by topology revision; no force-directed re-layout in render method" to its falsifier F3, landed as the
 * test/workbench-graph-view.test.ts describe "A5 docs/10 Rendering pipeline: layout cached by topology revision, no full
 * recompute (F3)". The half pins three A5 cases (a build at unmoved revisions returns the identical model with zero
 * relation reads; a status-only change re-reads no relation; a topology change recomputes only the changed neighborhood
 * and reuses the rest by identity) and the render-path case of the landed wb-6ze.37 wiring suite
 * (test/workbench-inspector-graph-wiring.test.ts (b): redraws, selection and the filter at one revision read no
 * relation page). The census claims only that those producer falsifiers are collected once, pass and assert.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16; respin U1 and the gate's F2/F3 findings): AC1 pins,
 * as literals copied from the TABLE at the cut's base, the row ids, every row's half and pin counts, every pin's file and
 * title, and the judged set (every default-gate half AC2 judges, with its pin count); AC3 pins every unpinned half's
 * reason verbatim. EACH-LIVENESS: the AC2 call site must register exactly one case per frozen judged half, read from
 * vitest's own task tree, and every one must run to its last assertion, so narrowing the judged predicate, the it.each
 * table or an AC2 body reds the census by name.
 *
 * Judging budget (gate F1): judge() re-reads the whole report and re-parses every pinned file it touches on each call,
 * so one judging case takes seconds over a full default-tier report at high load. Every judging case carries the
 * explicit file-local budget JUDGE_BUDGET_MS (the landed wb-6hb.9 shape, respin R546), and a case pins that exactly the
 * JUDGING_CASES judging cases run under it and that it exceeds vitest's default 5000 ms.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does
 * not follow; bullet 3 (the 80ms whole-dialog refresh), the visible-running-rows half of bullet 2, the Markdown
 * selected-slice half of bullet 6 and the single paginate/filter/limit-plus-compact-JSON case of bullet 9 have no landed
 * case and are listed as unpinned, never passed. The U4 own-read check records every path readRepo reads; a file read
 * outside readRepo (a direct node:fs call) is outside it.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Tier = "default-gate" | "bench-receipt";
interface Pin {
  readonly file: string;
  readonly title: string;
}
interface Half {
  /** The part of the row's bullet this half answers. */
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
  /** The 1-based bullet number in the docs/10 "Rendering pipeline" list. */
  readonly bullet: number;
  /** The docs/10 bullet, verbatim in the rendered section (a list item without its marker). */
  readonly clause: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-rendering-pipeline.census.ts";
const DOCS_FILE = "docs/workbench/10-terminal-inspector.md";
const DOCS_HEADING = "Rendering pipeline";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_PARENT = `10 ${EM_DASH} Terminal-native rich workflow inspector, interaction and performance`;
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

const INSPECTOR = "test/workbench-inspector.test.ts";
const WINDOW = "test/workbench-inspector-window.test.ts";
const SELECTOR = "test/workbench-reducer-selector-bench.test.ts";
const AGGREGATES = "test/workbench-observation-aggregates.test.ts";
const PERF = "test/workbench-observation-perf.test.ts";
const LOADER = "test/workbench-evidence-loader.test.ts";
const REPLIES = "test/workbench-tool-replies.test.ts";
const PI_REPLIES = "test/workbench-pi-tool-replies.test.ts";
const SECURITY_PI_TOOLS = "test/workbench-security-pi-tools.test.ts";
const ATTENTION = "test/workbench-attention.test.ts";
const GRAPH_VIEW = "test/workbench-graph-view.test.ts";
const WIRING = "test/workbench-inspector-graph-wiring.test.ts";

const pin = (file: string, title: string): Pin => ({ file, title });
const guard = (id: string, pins: readonly Pin[]): Half => ({ id, tier: "default-gate", pins });
const unpinned = (id: string, reason: string): Half => ({ id, tier: "default-gate", pins: [], reason });
/** The receipt half of a bench: produced only by its own forge command outside gate = [...], vouched by no report this leg reads. */
const receipt = (id: string, command: string): Half => ({
  id,
  tier: "bench-receipt",
  command,
  pins: [],
  reason: `the ${command} receipt is produced only by the [build.commands.${command}] run outside gate = [...]; no report this leg reads vouches for it, and this leg never runs a bench or reads a receipt file, so the receipt half is recorded here with its tier and is never counted as covered`,
});

const DIAGRAM_TEXT = [
  "native events -> per-provider reducer -> stable projection indexes",
  "              -> visible node selector -> cached layout + segments",
  "              -> Pi TUI styled lines -> terminal line diff",
].join("\n");
const BULLETS: readonly string[] = [
  "Event burst coalescing (e.g. <=4 ordinary updates/s while active), not every token update.",
  "Seconds-only clock tick <=1Hz and only for visible running rows.",
  "No 80ms whole-dialog refresh under large-workload mode.",
  "Pure layout and keyboard reducers are unit-tested without a TTY.",
  "Avoid O(allHistory) collapse per frame; maintain by-node last projection and ancestor aggregates incrementally.",
  "Virtualized visible rows + modest overscan; expensive Markdown syntax parsing only for selected transcript slice.",
  "Graph layout cached by topology revision; no force-directed re-layout in render method. For large graphs show aggregate supernodes first.",
  "Bound memory: store highlights/current snapshots; stream older event/traces lazily.",
  "Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI.",
];

/** The frozen docs/10 section as its source markdown blocks, in order; the synthetic falsifier documents are built from these. */
const SECTION_MARKDOWN: readonly string[] = [DIAGRAM_TEXT.split("\n").map(line => `    ${line}`).join("\n"), BULLETS.map(item => `- ${item}`).join("\n")];
/** What a reader sees of the section: the two blocks the rendered view must equal, block by block. */
const SECTION_BLOCKS: readonly RenderedBlock[] = [
  { kind: "code", text: DIAGRAM_TEXT },
  { kind: "list", ordered: false, items: BULLETS.map(item => ({ text: item, markdown: item })) },
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
    row: "burst-coalescing",
    bullet: 1,
    clause: BULLETS[0] ?? "",
    halves: [
      guard("guard", [
        pin(INSPECTOR, "limits live ordinary redraw to four per second while native observations burst"),
        pin(SELECTOR, "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock"),
      ]),
      receipt("receipt", "reducer-selector-bench"),
    ],
  },
  {
    row: "clock-tick",
    bullet: 2,
    clause: BULLETS[1] ?? "",
    halves: [
      guard("settled-run", [pin(INSPECTOR, "does not ask TUI for a redraw on every one-second tick of a settled observed run")]),
      unpinned(
        "visible-running-rows",
        "No landed case asserts that the seconds-only clock tick runs only for visible running rows; the settled-run half above is the only seconds-clock tick case (every other tick title under test/ is a fixture or redraw-cadence tick), so the visible-running-rows half is recorded here and never counted as covered.",
      ),
    ],
  },
  {
    row: "no-80ms-refresh",
    bullet: 3,
    clause: BULLETS[2] ?? "",
    halves: [
      unpinned(
        "whole-dialog-refresh",
        "No workbench falsifier exists for the 80ms whole-dialog refresh under large-workload mode: test/perf/widget.bench.ts is an upstream AgentWidget bench, not a workbench case, and test/workflow-dialog.test.ts holds no large-workload refresh case, so this bullet is recorded unpinned and never counted as covered.",
      ),
    ],
  },
  {
    row: "tty-free-reducers",
    bullet: 4,
    clause: BULLETS[3] ?? "",
    halves: [
      guard("guard", [
        pin(INSPECTOR, "Enter on the initially highlighted row collapses its observed relations; resize retains selected key"),
        pin(WINDOW, "paginates invocation-scoped nodes with total, monotonic revision, source-qualified identities and independent scope"),
      ]),
    ],
  },
  {
    row: "no-allhistory-collapse",
    bullet: 5,
    clause: BULLETS[4] ?? "",
    halves: [
      guard("guard", [
        pin(AGGREGATES, "A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild"),
        pin(INSPECTOR, "does not allocate a full latest-node array on every rich redraw or key"),
        pin(SELECTOR, "accounts reducer calls and bounded reads, and records no full fold per redraw"),
      ]),
    ],
  },
  {
    row: "virtualized-rows",
    bullet: 6,
    clause: BULLETS[5] ?? "",
    halves: [
      guard("virtualized-rows", [pin(INSPECTOR, "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18")]),
      unpinned(
        "markdown-selected-slice",
        "No workbench case binds expensive Markdown syntax parsing to the selected transcript slice; test/conversation-viewer.test.ts is the upstream viewer, not the workbench inspector, so this half is recorded unpinned and never counted as covered.",
      ),
    ],
  },
  {
    row: "graph-layout",
    bullet: 7,
    clause: BULLETS[6] ?? "",
    halves: [
      guard("topology-revision", [
        pin(WINDOW, "keeps updates stable but increments topology revision only for proven relation mutation"),
        pin(INSPECTOR, "adds a new observed edge on topology revision and reflects its provenance"),
      ]),
      guard("supernodes-first", [
        pin(GRAPH_VIEW, "replaces the individual arrows and the absorbed target nodes with one supernode that counts them"),
        pin(GRAPH_VIEW, "lists the supernodes before the nodes in the model"),
      ]),
      guard("no-force-directed-in-render", [
        pin(GRAPH_VIEW, "returns the identical model with zero relation reads while neither revision moved"),
        pin(GRAPH_VIEW, "re-reads no relations when only a node status changed, and shows the new status"),
        pin(GRAPH_VIEW, "recomputes only the changed neighborhood after a topology change and reuses the rest by identity"),
        pin(
          WIRING,
          "redraws, selection and the filter at one revision read no relation page; a node update or a topology change re-reads the pages at most once per shown row and the model follows",
        ),
      ]),
    ],
  },
  {
    row: "bound-memory",
    bullet: 8,
    clause: BULLETS[7] ?? "",
    halves: [
      guard("guard", [
        pin(PERF, "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history"),
        pin(LOADER, "loads one ref lazily and idempotently while loading"),
      ]),
    ],
  },
  {
    row: "observation-tools",
    bullet: 9,
    clause: BULLETS[8] ?? "",
    halves: [
      guard("surfaces", [
        pin(REPLIES, "pages with a stable cursor and covers every row exactly once"),
        pin(ATTENTION, "examines one 100-node page of 1,000 and keeps the report compact"),
        pin(PI_REPLIES, "sanitizes hostile descriptor text: ANSI, bidi and secrets never reach the model (F3)"),
        pin(SECURITY_PI_TOOLS, "workflow_observe must strip bidi overrides in native operation labels"),
      ]),
      unpinned(
        "single-case-bound",
        "The paginate (catalog reply), compact (attention report) and ANSI-free halves are pinned on four separate surfaces above; no single case binds paginate, filter and limit together with compact JSON for the observation tools, so that joint claim is recorded unpinned and never counted as covered.",
      ),
    ],
  },
]);

const ROW_IDS: readonly string[] = TABLE.map(row => row.row);
const EXPECTED_ROW_IDS: readonly string[] = [
  "burst-coalescing",
  "clock-tick",
  "no-80ms-refresh",
  "tty-free-reducers",
  "no-allhistory-collapse",
  "virtualized-rows",
  "graph-layout",
  "bound-memory",
  "observation-tools",
];
/**
 * Rule 16 (frozen shape): the table's own row/half/pin counts as an AC1-style literal derived from the TABLE at the cut's
 * base, so deleting one pin, dropping a half, or swapping a pin for an unrelated passing case reds the census.
 */
const EXPECTED_SHAPE: readonly string[] = [
  "burst-coalescing:1:guard=2,receipt=0",
  "clock-tick:2:settled-run=1,visible-running-rows=0",
  "no-80ms-refresh:3:whole-dialog-refresh=0",
  "tty-free-reducers:4:guard=2",
  "no-allhistory-collapse:5:guard=3",
  "virtualized-rows:6:virtualized-rows=1,markdown-selected-slice=0",
  "graph-layout:7:topology-revision=2,supernodes-first=2,no-force-directed-in-render=4",
  "bound-memory:8:guard=2",
  "observation-tools:9:surfaces=4,single-case-bound=0",
];
/**
 * Rule 16 pin-level literal: the exact file::title of every pin in table order, so swapping a pin for an unrelated passing case
 * (which keeps every count in EXPECTED_SHAPE) still reds the census.
 */
const EXPECTED_PINS: readonly string[] = [
  "test/workbench-inspector.test.ts::limits live ordinary redraw to four per second while native observations burst",
  "test/workbench-reducer-selector-bench.test.ts::keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock",
  "test/workbench-inspector.test.ts::does not ask TUI for a redraw on every one-second tick of a settled observed run",
  "test/workbench-inspector.test.ts::Enter on the initially highlighted row collapses its observed relations; resize retains selected key",
  "test/workbench-inspector-window.test.ts::paginates invocation-scoped nodes with total, monotonic revision, source-qualified identities and independent scope",
  "test/workbench-observation-aggregates.test.ts::A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild",
  "test/workbench-inspector.test.ts::does not allocate a full latest-node array on every rich redraw or key",
  "test/workbench-reducer-selector-bench.test.ts::accounts reducer calls and bounded reads, and records no full fold per redraw",
  "test/workbench-inspector.test.ts::always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18",
  "test/workbench-inspector-window.test.ts::keeps updates stable but increments topology revision only for proven relation mutation",
  "test/workbench-inspector.test.ts::adds a new observed edge on topology revision and reflects its provenance",
  "test/workbench-graph-view.test.ts::replaces the individual arrows and the absorbed target nodes with one supernode that counts them",
  "test/workbench-graph-view.test.ts::lists the supernodes before the nodes in the model",
  "test/workbench-graph-view.test.ts::returns the identical model with zero relation reads while neither revision moved",
  "test/workbench-graph-view.test.ts::re-reads no relations when only a node status changed, and shows the new status",
  "test/workbench-graph-view.test.ts::recomputes only the changed neighborhood after a topology change and reuses the rest by identity",
  "test/workbench-inspector-graph-wiring.test.ts::redraws, selection and the filter at one revision read no relation page; a node update or a topology change re-reads the pages at most once per shown row and the model follows",
  "test/workbench-observation-perf.test.ts::retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history",
  "test/workbench-evidence-loader.test.ts::loads one ref lazily and idempotently while loading",
  "test/workbench-tool-replies.test.ts::pages with a stable cursor and covers every row exactly once",
  "test/workbench-attention.test.ts::examines one 100-node page of 1,000 and keeps the report compact",
  "test/workbench-pi-tool-replies.test.ts::sanitizes hostile descriptor text: ANSI, bidi and secrets never reach the model (F3)",
  "test/workbench-security-pi-tools.test.ts::workflow_observe must strip bidi overrides in native operation labels",
];
const pinsOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.halves.flatMap(half => half.pins.map(entry => `${entry.file}::${entry.title}`)));
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.row}:${row.bullet}:${row.halves.map(half => `${half.id}=${half.pins.length}`).join(",")}`);
/** Every half no report this leg reads vouches for, as "row/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = [
  "burst-coalescing/receipt",
  "clock-tick/visible-running-rows",
  "no-80ms-refresh/whole-dialog-refresh",
  "virtualized-rows/markdown-selected-slice",
  "observation-tools/single-case-bound",
];
/**
 * Rule 16 judged-row literal (respin U1): every default-gate half AC2 judges, as "row/half:pin-count" in table order, copied
 * from the TABLE at the cut's base, so narrowing the judged predicate, dropping a row or dropping a half from the judged
 * set reds the census even while every TABLE literal above stays equal.
 */
const FROZEN_JUDGED: readonly string[] = [
  "burst-coalescing/guard:2",
  "clock-tick/settled-run:1",
  "tty-free-reducers/guard:2",
  "no-allhistory-collapse/guard:3",
  "virtualized-rows/virtualized-rows:1",
  "graph-layout/topology-revision:2",
  "graph-layout/supernodes-first:2",
  "graph-layout/no-force-directed-in-render:4",
  "bound-memory/guard:2",
  "observation-tools/surfaces:4",
];
/**
 * Every unpinned half's reason verbatim, as "row/half: reason" in table order (gate F3): a reason rewritten into a
 * false-coverage sentence, or shortened, reds the census; a seat that re-trues a reason edits this list in the same change.
 */
const EXPECTED_REASONS: readonly string[] = [
  "burst-coalescing/receipt: the reducer-selector-bench receipt is produced only by the [build.commands.reducer-selector-bench] run outside gate = [...]; no report this leg reads vouches for it, and this leg never runs a bench or reads a receipt file, so the receipt half is recorded here with its tier and is never counted as covered",
  "clock-tick/visible-running-rows: No landed case asserts that the seconds-only clock tick runs only for visible running rows; the settled-run half above is the only seconds-clock tick case (every other tick title under test/ is a fixture or redraw-cadence tick), so the visible-running-rows half is recorded here and never counted as covered.",
  "no-80ms-refresh/whole-dialog-refresh: No workbench falsifier exists for the 80ms whole-dialog refresh under large-workload mode: test/perf/widget.bench.ts is an upstream AgentWidget bench, not a workbench case, and test/workflow-dialog.test.ts holds no large-workload refresh case, so this bullet is recorded unpinned and never counted as covered.",
  "virtualized-rows/markdown-selected-slice: No workbench case binds expensive Markdown syntax parsing to the selected transcript slice; test/conversation-viewer.test.ts is the upstream viewer, not the workbench inspector, so this half is recorded unpinned and never counted as covered.",
  "observation-tools/single-case-bound: The paginate (catalog reply), compact (attention report) and ANSI-free halves are pinned on four separate surfaces above; no single case binds paginate, filter and limit together with compact JSON for the observation tools, so that joint claim is recorded unpinned and never counted as covered.",
];
const reasonsOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.halves.flatMap(half => (half.reason === undefined ? [] : [`${row.row}/${half.id}: ${half.reason}`])));

/** Every repository path this leg's own code reads through readRepo, in read order (respin U4). */
const READS: string[] = [];
/** The only files the leg's own code reads: docs/10 and the census-tier config, never forge.toml. */
const LEG_READS: readonly string[] = [DOCS_FILE, "vitest.census.config.ts"];
const readRepo = (path: string): string => {
  READS.push(path);
  return readFileSync(join(ROOT, path), "utf8");
};

/** The forge.toml command whose own run must vouch for a half; a bench-receipt label names no report this leg reads. */
const tierCommand = (half: Half): string => (half.tier === "default-gate" ? DEFAULT_GATE_TIER : (half.command ?? half.tier));
const casePin = (half: Half, entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: tierCommand(half) });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));
const BENCH_RECEIPTS = TABLE.flatMap(row => row.halves.filter(half => half.tier === "bench-receipt").map(half => ({ row, half })));
/** A judged half's frozen key, "row/half:pin-count" (the FROZEN_JUDGED entry it must equal). */
const judgedKey = ({ row, half }: { readonly row: Row; readonly half: Half }): string => `${row.row}/${half.id}:${half.pins.length}`;
/** The AC2 case title template; vitest registers one case per JUDGED entry, quoting each interpolated string. */
const AC2_TITLE = "AC2 row $row.row/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report";
/** The name vitest registers for one FROZEN_JUDGED entry under AC2_TITLE. */
const ac2Name = (entry: string): string => {
  const [row = "", half = ""] = entry.slice(0, entry.lastIndexOf(":")).split("/");
  return AC2_TITLE.replace("$row.row", `'${row}'`).replace("$half.id", `'${half}'`);
};
/** EACH-LIVENESS: the key of every judged half whose AC2 case ran to its last assertion, in run order. */
const AC2_RAN: string[] = [];

/**
 * The explicit budget of every judging case in this file (gate F1), file-local so no other census file's budget moves
 * (the landed wb-6hb.9 shape, respin R546). Sized as 5 x the slowest judging case the gate measured on this census
 * (6213 ms, AC2 observation-tools/surfaces, single-worker over the gate's own 6.1 MB full default-tier report at load1
 * ~500; outbox row 577 F1), rounded up to a whole 5 s: 5 x 6213 ms = 31065 ms, rounded up to 35000 ms.
 */
const JUDGE_BUDGET_MS = 35_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The cases that carry JUDGING: AC2 per judged half (10), the AC4 tier-mismatch case and the M1, M3, M4 and M5 liveness falsifiers. */
const JUDGING_CASES = 15;

/** One node of vitest's task tree, as far as this leg reads it. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly timeout?: number;
  readonly tasks?: readonly TaskNode[];
}
/** Every test case vitest registered in this file, in registration order, with its timeout, read from the runner's own task tree. */
function registeredTests(tasks: readonly TaskNode[]): { readonly name: string; readonly timeout: number | undefined }[] {
  return tasks.flatMap(child => (child.type === "test" ? [{ name: child.name, timeout: child.timeout }] : child.type === "suite" ? registeredTests(child.tasks ?? []) : []));
}

/** One line per pin that is not ok, naming the row and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${half.id}: ${verdict.code}: ${verdict.why}`);

/** True when a rendered list item equals the row's bullet verbatim. */
const clauseRenders = (row: Row, blocks: readonly RenderedBlock[]): boolean => blocks.some(block => block.kind === "list" && block.items.some(item => item.text === row.clause));

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row bullet checks read the section's rendered
 * blocks and run independently of the exactness check, so a dropped or reworded bullet names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  for (const row of TABLE) {
    if (!clauseRenders(row, section.blocks)) out.push(`row ${row.row}: its bullet ${row.bullet} "${row.clause}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen blocks under the real heading shape, never the live text. */
const synthetic = (edit: (blocks: readonly string[]) => readonly string[] = blocks => blocks, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Navigation\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(SECTION_MARKDOWN).join("\n\n")}\n${tail}\n## Cancelling a background workflow\n\nText.\n`;
const editBlock = (index: number, from: string, to: string) => (blocks: readonly string[]): readonly string[] => blocks.map((block, at) => (at === index ? block.replace(from, to) : block));
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

describe("wb-6ze.39 docs/workbench/10 rendering-pipeline census (report mode)", () => {
  it("AC1: the table holds the nine frozen rows in order, deeply frozen, each bullet rendered in its section", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(ROW_IDS).toEqual(EXPECTED_ROW_IDS);
    expect(TABLE).toHaveLength(9);
    expect(TABLE.map(row => row.bullet)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(TABLE.map(row => row.clause)).toEqual(BULLETS);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: rule 16 frozen shape: every row's half and pin counts equal the literal (a deleted pin, a dropped half or a swapped row reds the census)", () => {
    expect(shapeOf(TABLE)).toEqual(EXPECTED_SHAPE);
    expect(pinsOf(TABLE)).toEqual(EXPECTED_PINS);
    expect(EXPECTED_PINS).toHaveLength(23);
  });

  it("AC1: rule 16 judged-row set: the default-gate halves AC2 judges equal the frozen literal (a narrowed predicate, a dropped row or a dropped half reds the census; respin U1)", () => {
    expect(JUDGED.map(judgedKey)).toEqual(FROZEN_JUDGED);
    expect(FROZEN_JUDGED).toHaveLength(10);
  });

  it("AC1: the live section renders exactly its two frozen blocks (the pipeline diagram and the nine-item list), HTML-free", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(2);
    expect(BULLETS).toHaveLength(9);
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the two", () => {
    for (const row of TABLE) {
      expect(row.halves.length, `row ${row.row}: a row holds at least one half`).toBeGreaterThan(0);
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

  it("AC3: the unpinned halves are listed so none is ever counted as passed; the bench receipt names its command and bullet 3 is wholly unpinned", () => {
    const listed = TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => `${row.row}/${half.id}`));
    expect(listed).toEqual(UNPINNED_HALVES);
    for (const { row, half } of BENCH_RECEIPTS) {
      expect(half.command, `row ${row.row}/${half.id}: a bench-receipt half names its command`).toBe("reducer-selector-bench");
      expect(half.reason, `row ${row.row}/${half.id}`).toContain(`[build.commands.${half.command}]`);
      expect(half.reason, `row ${row.row}/${half.id}`).toContain("never counted as covered");
    }
    expect(BENCH_RECEIPTS).toHaveLength(1);
    const wholly = TABLE.filter(row => row.halves.every(half => half.pins.length === 0 && half.tier === "default-gate"));
    expect(wholly.map(row => row.row)).toEqual(["no-80ms-refresh"]);
  });

  it("AC3: every unpinned half's reason is frozen verbatim, so a reason rewritten into a false-coverage sentence reds the census (gate F3)", () => {
    expect(reasonsOf(TABLE)).toEqual(EXPECTED_REASONS);
    expect(EXPECTED_REASONS.map(entry => entry.slice(0, entry.indexOf(": ")))).toEqual(UNPINNED_HALVES);
  });

  it("AC3: the supernodes-first half is pinned now that wb-6ze.32 and wb-6ze.34 have landed, and is not in the unpinned list", () => {
    expect(UNPINNED_HALVES.some(entry => entry.startsWith("graph-layout/supernodes-first"))).toBe(false);
    const half = TABLE.find(row => row.row === "graph-layout")?.halves.find(entry => entry.id === "supernodes-first");
    expect(half?.pins.map(entry => entry.file)).toEqual([GRAPH_VIEW, GRAPH_VIEW]);
  });

  it("AC3 (U2): the no-force-directed-in-render half is pinned on the wb-6ze.32 F3 falsifier (graph-view A5) and the wb-6ze.37 render-path case, and is not in the unpinned list", () => {
    expect(UNPINNED_HALVES).not.toContain("graph-layout/no-force-directed-in-render");
    const half = TABLE.find(row => row.row === "graph-layout")?.halves.find(entry => entry.id === "no-force-directed-in-render");
    expect(half?.reason).toBeUndefined();
    expect(half?.tier).toBe("default-gate");
    expect(half?.pins.map(entry => entry.file)).toEqual([GRAPH_VIEW, GRAPH_VIEW, GRAPH_VIEW, WIRING]);
  });

  it.each(JUDGED)(AC2_TITLE, JUDGING, ({ row, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(half, entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
    AC2_RAN.push(judgedKey({ row, half }));
  });

  it("AC2 each-liveness: the call site registers exactly one AC2 case per frozen judged half, and every one ran to its last assertion (respin U1, gate F2)", ({ task }) => {
    const names = registeredTests(task.file.tasks).map(entry => entry.name);
    expect(names.filter(name => name.startsWith("AC2 row "))).toEqual(FROZEN_JUDGED.map(ac2Name));
    expect(AC2_RAN).toEqual(FROZEN_JUDGED);
  });

  it("AC4: a bench-receipt label is carried by no report this leg reads: the default report refuses a guard pin relabelled as its receipt", JUDGING, () => {
    expect(BENCH_RECEIPTS.length).toBeGreaterThan(0);
    const burst = BENCH_RECEIPTS[0];
    const cadence = TABLE[0]?.halves[0]?.pins[1];
    expect(burst).toBeDefined();
    expect(cadence).toBeDefined();
    if (burst === undefined || cadence === undefined) return;
    const [verdict] = judge(REPORT, [casePin(burst.half, cadence)]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
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

  it("F1: exactly the judging cases carry the file-local budget, and it is above vitest's default 5000 ms (gate F1)", ({ task }) => {
    const timeouts = registeredTests(task.file.tasks).map(entry => entry.timeout);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(timeouts.filter(timeout => timeout === JUDGE_BUDGET_MS), "the cases that run under JUDGE_BUDGET_MS").toHaveLength(JUDGING_CASES);
  });
});

describe("wb-6ze.39 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (id: string): { row: Row; half: Half; entry: Pin } => {
    const found = JUDGED.find(({ row }) => row.row === id);
    const entry = found?.half.pins[0];
    if (found === undefined || entry === undefined) throw new Error(`row ${id} holds no judged pin`);
    return { row: found.row, half: found.half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", JUDGING, () => {
    const { row, half, entry } = firstJudged("bound-memory");
    const wrong = { ...entry, title: entry.title.replace("retains", "retainS") };
    const verdicts = judge(REPORT, [casePin(half, wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, half, verdicts);
    expect(line).toContain("row bound-memory/guard");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen ids no longer match)", () => {
    expect(TABLE.filter(row => row.row !== "graph-layout").map(row => row.row)).not.toEqual(EXPECTED_ROW_IDS);
  });

  it("M3: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    const { half } = firstJudged("burst-coalescing");
    const [verdict] = judge(REPORT, [casePin(half, { file: INSPECTOR, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a file the default config excludes is never in the default report: a pin there is red, not collected", JUDGING, () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", JUDGING, () => {
    const { half, entry } = firstJudged("bound-memory");
    const [verdict] = judge(REPORT, [casePin(half, { file: LOADER, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a pinned title that two rows share is judged once per row, so removing it from one row still leaves the other row's pin live", () => {
    const owners = TABLE.filter(row => row.halves.some(half => half.pins.some(entry => entry.file === INSPECTOR && entry.title.startsWith("Enter on the initially highlighted row"))));
    expect(owners.map(row => row.row)).toEqual(["tty-free-reducers"]);
    const shared = TABLE.filter(row => row.halves.some(half => half.pins.some(entry => entry.file === SELECTOR)));
    expect(shared.map(row => row.row)).toEqual(["burst-coalescing", "no-allhistory-collapse"]);
  });

  it("M7: a narrowed judged predicate leaves every TABLE literal equal and is red by the frozen judged literal alone", () => {
    const narrowed = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 1).map(half => ({ row, half }))).map(judgedKey);
    expect(shapeOf(TABLE)).toEqual(EXPECTED_SHAPE);
    expect(pinsOf(TABLE)).toEqual(EXPECTED_PINS);
    expect(narrowed).not.toEqual(FROZEN_JUDGED);
    expect(FROZEN_JUDGED.filter(entry => !narrowed.includes(entry))).toEqual(["clock-tick/settled-run:1", "virtualized-rows/virtualized-rows:1"]);
  });
});

describe("wb-6ze.39 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${SECTION_MARKDOWN.join("\n\n")}\n`)).toEqual([]);
  });

  it("K1 names the 80ms row (and only it) when its bullet is dropped from the list", () => {
    const lines = docsFailures(synthetic(editBlock(1, "\n- No 80ms whole-dialog refresh under large-workload mode.", "")));
    expect(named(lines)).toEqual(["row no-80ms-refresh"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names the burst row (and only it) when the redraw cap is loosened", () => {
    expect(named(docsFailures(synthetic(editBlock(1, "<=4 ordinary updates/s", "<=40 ordinary updates/s"))))).toEqual(["row burst-coalescing"]);
  });

  it("K3 names the no-allhistory row (and only it) when the incremental clause is dropped", () => {
    expect(named(docsFailures(synthetic(editBlock(1, "; maintain by-node last projection and ancestor aggregates incrementally", ""))))).toEqual(["row no-allhistory-collapse"]);
  });

  it("K4 names the clock-tick row (and only it) when the visible-running-rows qualifier is weakened", () => {
    expect(named(docsFailures(synthetic(editBlock(1, "<=1Hz and only for visible running rows", "<=1Hz"))))).toEqual(["row clock-tick"]);
  });

  it("K5 names the observation-tools row (and only it) when the never-ANSI clause is removed", () => {
    expect(named(docsFailures(synthetic(editBlock(1, " and return compact JSON, never rendered ANSI", ""))))).toEqual(["row observation-tools"]);
  });

  it("K6 names the graph-layout row (and only it) when the supernodes sentence is removed", () => {
    expect(named(docsFailures(synthetic(editBlock(1, " For large graphs show aggregate supernodes first.", ""))))).toEqual(["row graph-layout"]);
  });

  it("D1 names the observation-tools row (and only it) when a weakening qualifier is appended to the last bullet", () => {
    const lines = docsFailures(synthetic(editBlock(1, "never rendered ANSI.", "never rendered ANSI. Unless the host says otherwise.")));
    expect(named(lines)).toEqual(["row observation-tools"]);
  });

  it("D2 goes red on the section when a tenth unclassified bullet is added to the list", () => {
    const lines = docsFailures(synthetic(editBlock(1, "never rendered ANSI.", "never rendered ANSI.\n- a new unclassified bullet")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 2 differs");
  });

  it("D3 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, "## Rendering notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_HEADING}: the section is refused`);
  });

  it("D4 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(blocks => blocks, "\n### Exceptions\n\nA host may skip these.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 names the tty-free row when its bullet is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editBlock(1, "- Pure layout and keyboard reducers are unit-tested without a TTY.", "- <!-- Pure layout and keyboard reducers are unit-tested without a TTY. -->")));
    expect(named(lines)).toEqual(["row tty-free-reducers"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 goes red on the section, naming no row, when two bullets swap places", () => {
    const lines = docsFailures(
      synthetic(editBlock(1, `- ${BULLETS[0]}\n- ${BULLETS[1]}`, `- ${BULLETS[1]}\n- ${BULLETS[0]}`)),
    );
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 2 differs");
  });

  it("D8 goes red on the section, naming no row, when the pipeline diagram is reworded", () => {
    const lines = docsFailures(synthetic(editBlock(0, "terminal line diff", "terminal full repaint")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("an edit of any other section never reddens a row: the navigation and cancelling sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});

describe("wb-6ze.39 own reads (respin U4): runs last, after every case that reads", () => {
  it("AC4: the leg's own code reads only docs/10 and the census-tier config, never forge.toml (the helper's tier vouch reads forge.toml through its CLOSED forge-step read, by design)", () => {
    expect(READS.filter(path => !LEG_READS.includes(path))).toEqual([]);
    expect([...new Set(READS)].sort()).toEqual([...LEG_READS].sort());
  });
});
