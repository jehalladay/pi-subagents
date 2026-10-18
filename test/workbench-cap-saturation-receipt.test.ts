/** W21-D (wb-9x5.6): grouped-10k cap-saturation receipt, assessor and honest exit semantics.
 * Measurement-only: the bench module is ESM over the wb-9x5.2 fixture, the CLI drives compiled dist/, and no
 * production cap moves. Overflow past the caps must be a counted remainder; a silent drop fails the run.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
  assessCapSaturationReceipt,
  BOUNDARY_CAPS,
  CAP_RECEIPT_CONTRACT,
  CAP_SERIES,
  DOC_QUOTES,
  exitCodeFor,
  PASS_IDS,
  PRODUCTION_CAPS,
  passPlan,
  publishReceipt,
  runCapSaturationBench,
} from "../qa/workbench/cap-saturation.mjs";
import { buildGroupedFixture, NAVIGATION_TARGET_MS } from "../qa/workbench/grouped-fixture.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { type ObservationLimits, ObservationProjection } from "../src/workbench/observation.js";
import { type DocsSection, docsSection, type RenderedBlock, type SectionMatch, sectionMatches } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

interface Violation {
  rule: string;
  detail: string;
}
interface Drop {
  pass: string;
  rule: string;
  detail: string;
}
interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Navigation {
  keypresses: number;
  all: Distribution;
  reducer: Distribution;
  layout: Distribution;
  resize: Distribution;
  maxRenderedRows: number;
}
interface Pass {
  id: string;
  role: string;
  cap: { nodes: number; edges: number; source: string; constructorArgs: number };
  limits: "default" | ObservationLimits;
  offered: { nodes: number; groups: number; operations: number; edges: number; updates: number };
  afterSnapshots: { nodes: number; applied: number };
  afterRelations: { edges: number };
  retained: { nodes: number; events: number; edges: number };
  census: { rows: number };
  overflow: { occurred: boolean; mode: string; countedRemainder: number; countedEdgeRemainder: number; eviction: string };
  surface: {
    rowsBySize: Record<string, number>;
    inspectorLabelsOverflow: boolean;
    inspectorNamesOfferedTotal: boolean;
    windowTotal: number;
  };
  navigation: Navigation | null;
  memory: { label: string; heapBytes: number; retainedNodes: number };
}
interface Receipt {
  contract: string;
  benchmark: string;
  measured: boolean;
  utc: string;
  revision: string;
  toolchain: Record<string, string>;
  command: string;
  strict?: boolean;
  benchOnlyBounds?: {
    nodes: number[];
    boundary: number[];
    events: number;
    query: number;
    productionEvents: number;
    productionQuery: number;
    source: string;
  };
  docs: typeof DOC_QUOTES;
  caps: {
    production: {
      projectionMaxNodes: number;
      projectionMaxEdges: number;
      runtimeNodeCalls: number | null;
      runtimeAgents: number | null;
    };
    benchOnly: { nodes: number[]; boundary: number[] };
  };
  fixture: { snapshots: number; nodes: number };
  sampling: { blocks: number; keypressesPerBlock: number; keypresses: number; resizeSamples: number; warmupKeypresses: number };
  memory: { judged: boolean; label: string };
  passes: Record<string, Pass>;
  series: {
    visibleVsTotal: Array<{ pass: string; offeredNodes: number; retainedNodes: number; visibleRowsMax: number | null }>;
    timing: Array<{ pass: string; reducer: Distribution | null; layout: Distribution | null }>;
    memory: Array<{ pass: string; retainedNodes: number; heapBytes: number; comparability?: string }>;
    memoryComparability?: string;
  };
  findings: Array<{ id: string; detail: string }>;
  target: { ms: number; statistic: string; over: string[] };
  realised: boolean;
  violations: Violation[];
  silentDrops: Drop[];
  unbounded: Drop[];
  verdict: string;
  exitCode: number;
}
interface Host {
  utc: string;
  revision: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  toolchain: Record<string, string>;
  command: string;
  runtimeCaps: { nodeCalls: number | null; agents: number };
}
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
interface GroupedFixture {
  snapshots: unknown[];
  relations: unknown[];
  updates: unknown[];
  shape: { nodes: number };
}

const run = runCapSaturationBench as (input: {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  fixture: GroupedFixture;
  host: Host;
  sampling?: { blocks: number; keypressesPerBlock: number; resizeSamples: number };
}) => Receipt;
const assess = assessCapSaturationReceipt as (receipt: Receipt) => {
  realised: boolean;
  violations: Violation[];
  silentDrops: Drop[];
  unbounded: Drop[];
  exitCode: number;
  verdict: string;
};
const exitCode = exitCodeFor as (receipt: Receipt) => number;
const buildFixture = buildGroupedFixture as () => GroupedFixture;
const plan = passPlan as () => Array<{ id: string; role: string; cap: number | undefined; offered: number | "all" }>;

const inspector: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };
const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-cap-saturation-receipt.test.ts",
  runtimeCaps: { nodeCalls: 1_000, agents: 1_000 },
};
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

let cached: { receipt: Receipt; constructed: Array<ConstructorParameters<typeof ObservationProjection>> } | undefined;
/** One real run of the whole plan over the default W21 fixture, with tiny sampling; shared by every case. */
const realRun = () => {
  if (cached) return cached;
  const constructed: Array<ConstructorParameters<typeof ObservationProjection>> = [];
  class SpyProjection extends ObservationProjection {
    constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
      super(...args);
      constructed.push(args);
    }
  }
  const receipt = run({
    Projection: SpyProjection,
    inspector,
    fixture: buildFixture(),
    host: HOST,
    sampling: { blocks: 1, keypressesPerBlock: 30, resizeSamples: 8 },
  });
  cached = { receipt, constructed };
  return cached;
};
/** A deep copy of the real receipt (or of `source`) in which every p95 reads 1 ms, so only the mutation under test can change the verdict. */
const calm = (source: Receipt = realRun().receipt): Receipt => {
  const copy = structuredClone(source);
  const flat = (value: Distribution | null | undefined) => {
    if (value) Object.assign(value, { p50: 1, p95: 1, max: 1 });
  };
  for (const pass of Object.values(copy.passes)) {
    if (pass.navigation) for (const key of ["all", "reducer", "layout", "resize"] as const) flat(pass.navigation[key]);
    pass.navigation = pass.navigation ? { ...pass.navigation, maxRenderedRows: Math.min(pass.navigation.maxRenderedRows, 24) } : null;
  }
  copy.memory.judged = false;
  return copy;
};
const passOf = (receipt: Receipt, id: string): Pass => {
  const pass = receipt.passes[id];
  if (!pass) throw new Error(`no pass ${id}`);
  return pass;
};
beforeAll(() => {
  realRun();
}, 240_000);
let silentRun: Receipt | undefined;
/** The same real run over a projection that reports no evictions, as ObservationProjection did before wb-ea1: no frame can
 * carry the remainder line or the capped header, so the unlabeled-overflow inputs below are measured, never forged. */
const unlabeledRun = (): Receipt => {
  if (silentRun) return silentRun;
  class SilentProjection extends ObservationProjection {
    override truncation(filter: Parameters<ObservationProjection["truncation"]>[0]): ReturnType<ObservationProjection["truncation"]> {
      return { ...super.truncation(filter), nodes: 0, events: 0 };
    }
  }
  silentRun = run({
    Projection: SilentProjection,
    inspector,
    fixture: buildFixture(),
    host: HOST,
    sampling: { blocks: 1, keypressesPerBlock: 30, resizeSamples: 8 },
  });
  return silentRun;
};
beforeAll(() => {
  unlabeledRun();
}, 240_000);
const rules = (list: Array<{ rule: string }>): string[] => list.map(item => item.rule);

// ---- wb-36l: the docs pin, re-expressed through the wb-u62 docs floor (test/helpers/census.ts) ----

type Quoted = (typeof DOC_QUOTES)[keyof typeof DOC_QUOTES];
/** One of the two docs sections this receipt answers, as the u62 docs floor pins it (registry entry 6). */
interface DocsPin {
  readonly key: keyof typeof DOC_QUOTES;
  /** The section heading's exact rendered parent heading path, outermost first (D9). */
  readonly parents: readonly string[];
  /** The section's WHOLE rendered block list (sectionMatches: exact, block by block; never an includes check). */
  readonly blocks: readonly RenderedBlock[];
}
/** A rendered paragraph; its source markdown is its rendered text unless the paragraph carries inline markup. */
const paragraph = (text: string, markdown: string = text): RenderedBlock => ({ kind: "paragraph", text, markdown });
/** A rendered bullet list whose items carry no inline markup. */
const bullets = (...items: readonly string[]): RenderedBlock => ({ kind: "list", ordered: false, items: items.map(text => ({ text, markdown: text })) });

/**
 * wb-36l (the W21 adoption carrier, re-homed from wb-oq3 by the owner's oq3 R1 = (a) ruling; landing-order registry
 * entry 6, wb-9x5.6 docs-pinning): the two docs sections this receipt answers, pinned WHOLE through the u62 docs floor
 * (whole-section exactness is the floor's adoption form, so every block of both sections is pinned, not only the five
 * quoted clauses). A lander editing either section updates this table in the same commit (the 752.10 rule).
 */
const DOCS_PINS: readonly DocsPin[] = [
  {
    key: "scalability",
    parents: ["10 \u2014 Terminal-native rich workflow inspector, interaction and performance"],
    blocks: [
      paragraph(
        "Benchmark >=1000 visible-reachable operations and >=100k synthetic event updates. Typical viewport 30\u2013100 rows; layout/nav calculation target <=20ms on benchmark host and memory bounded by active projection rather than accumulating full prompt bodies. 10k+ grouped operations P2. Record wall time, p50/p95 UI compute, max allocation, file IO and resize metrics; don't declare targets met without measured runs.",
      ),
    ],
  },
  {
    key: "performance",
    parents: ["14 \u2014 Test strategy, conformance suite, benchmark and adversarial controls"],
    blocks: [
      paragraph("Construct deterministic fixture with >=1000 nodes, >=100000 events, 1\u2013100 active changes per tick, 5 nested groups depth, partial graph links, long Unicode paths and large transcript payload refs. Measure:"),
      bullets(
        "observer ingest events/s and projection memory",
        "p50/p95 reducer update and UI selector time",
        "p50/p95 layout render/navigate/resize time",
        "number of visible rendered rows vs total nodes",
        "terminal bytes per update (with line diff)",
        "recover snapshot/cursor latency",
        "Pi model tool response size under bounded queries",
      ),
      paragraph("Proposed responsive target <=20ms per navigation/layout calculation on declared reference host, redraw <=4Hz live; no full 100k-event fold per redraw; report measured hardware/toolchain and outliers. No invented pass numbers."),
      paragraph(
        "Every landed W21 bench is a CLI at qa/workbench/*-bench.mjs whose first line is a // W21 comment. test/helpers/w21-bench-clis.ts exports that first-line rule (W21_HEADER, isW21BenchHeader) and enumerates the benches from it, the W21 falsifier suites read the enumeration instead of a hand-kept list, and the known-duration suite's header census reports a // W21 header displaced below a shebang or licence line as misplaced rather than leaving the bench silently outside both censuses.",
        "Every landed W21 bench is a CLI at `qa/workbench/*-bench.mjs` whose first line is a `// W21` comment. `test/helpers/w21-bench-clis.ts` exports that first-line rule (`W21_HEADER`, `isW21BenchHeader`) and enumerates the benches from it, the W21 falsifier suites read the enumeration instead of a hand-kept list, and the known-duration suite's header census reports a `// W21` header displaced below a shebang or licence line as misplaced rather than leaving the bench silently outside both censuses.",
      ),
    ],
  },
];

/** What a reader sees of a section, in block order (an html block renders nothing). */
const renderedText = (section: DocsSection): string =>
  section.blocks.map(block => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text)).join(" ");

/** The pre-adoption form (the heading and every quote anywhere in the raw document): the D-rows prove it blind to each shape. */
const includesEveryQuote = (markdown: string, quoted: Quoted): boolean =>
  markdown.includes(`## ${quoted.section}`) && quoted.quotes.every(quote => markdown.includes(quote));

/**
 * The docs floor over one pinned section of `markdown`: docsSection locates the unique rendered level-2 heading under
 * its exact parent heading path (D9) and refuses an HTML block or code fence spanning a heading line inside the section
 * (D10); sectionMatches demands the WHOLE rendered block list and refuses any HTML, so a quoted clause relocated out of
 * the section (D1), wrapped in an HTML comment (D2) or kept beside a withdrawn subsection (D3) reddens; and every quoted
 * clause must render inside the section.
 */
function docsPinVerdict(markdown: string, quoted: Quoted, pin: DocsPin): SectionMatch {
  const section = docsSection(markdown, quoted.section, 2, pin.parents);
  const matched = sectionMatches(section, pin.blocks);
  if (!matched.ok) return matched;
  const text = renderedText(section);
  const unrendered = quoted.quotes.filter(quote => !text.includes(quote));
  return unrendered.length === 0 ? { ok: true, why: "" } : { ok: false, why: `the pinned section renders without the quoted clauses ${JSON.stringify(unrendered)}` };
}

/** `markdown` with its one occurrence of `target` replaced; a target found other than once fails the row, never a vacuous pass. */
function replaceOnce(markdown: string, target: string, replacement: string): string {
  const at = markdown.indexOf(target);
  if (at < 0 || markdown.indexOf(target, at + 1) >= 0) throw new Error(`docs-floor falsifier: ${JSON.stringify(target)} must occur exactly once in the document`);
  return markdown.slice(0, at) + replacement + markdown.slice(at + target.length);
}
/** The heading line that closes the pinned section: the next level-2 heading after it. */
function closingHeading(markdown: string, quoted: Quoted): string {
  const heading = `\n## ${quoted.section}\n`;
  const start = markdown.indexOf(heading);
  const next = start < 0 ? -1 : markdown.indexOf("\n## ", start + heading.length - 1);
  if (next < 0) throw new Error(`docs-floor falsifier: no level-2 heading closes "## ${quoted.section}" in ${quoted.doc}`);
  const end = markdown.indexOf("\n", next + 1);
  return markdown.slice(next + 1, end < 0 ? undefined : end);
}
function firstQuote(quoted: Quoted): string {
  const quote = quoted.quotes.at(0);
  if (quote === undefined) throw new Error(`docs-floor falsifier: ${quoted.doc} carries no quoted clause`);
  return quote;
}
/** A docs-floor falsifier shape: one edit to the real document that the raw includes form cannot see. */
type DocsShape = (markdown: string, quoted: Quoted) => string;
/** D1 (wb-9x5.6 gate falsifier): the first quoted clause relocated out of its section into an EOF appendix. */
const D1_RELOCATED: DocsShape = (markdown, quoted) => `${replaceOnce(markdown, firstQuote(quoted), "")}\n## Appendix\n\n${firstQuote(quoted)}\n`;
/** D2 (wb-9x5.6 gate falsifier): the first quoted clause (docs/14: a quoted bullet) wrapped in an HTML comment where it stands. */
const D2_COMMENTED: DocsShape = (markdown, quoted) => replaceOnce(markdown, firstQuote(quoted), `<!-- ${firstQuote(quoted)} -->`);
/** D3 (wb-9x5.6 gate falsifier): a weakening ### subsection inserted inside the section, before its closing heading. */
const D3_WITHDRAWN: DocsShape = (markdown, quoted) => {
  const closing = closingHeading(markdown, quoted);
  return replaceOnce(markdown, `\n${closing}\n`, `\n### Withdrawn\n\nNothing in this section binds.\n\n${closing}\n`);
};
/** D9 (u62 floor, parent heading path): a non-normative level-1 heading inserted above the section re-homes it. */
const D9_REHOMED: DocsShape = (markdown, quoted) => replaceOnce(markdown, `\n## ${quoted.section}\n`, `\n# Appendix (non-normative)\n\n## ${quoted.section}\n`);
/** D10 (u62 floor, spanning range): an HTML comment opened inside the section and closed past its closing heading. */
const D10_SPANNING: DocsShape = (markdown, quoted) => {
  const closing = closingHeading(markdown, quoted);
  return replaceOnce(markdown, `\n${closing}\n`, `\n<!--\n\n${closing}\n-->\n`);
};
/** Both pinned sections of the real documents under one shape: the raw includes form against the docs floor. */
const underShape = (shape: DocsShape): Array<{ key: string; includes: boolean; floor: SectionMatch }> =>
  DOCS_PINS.map(pin => {
    const quoted = DOC_QUOTES[pin.key];
    const mutated = shape(readRepo(quoted.doc), quoted);
    return { key: pin.key, includes: includesEveryQuote(mutated, quoted), floor: docsPinVerdict(mutated, quoted, pin) };
  });

describe("W21-D pass plan and constants", () => {
  it("names the receipt contract and the production caps it is measured against", () => {
    expect(CAP_RECEIPT_CONTRACT).toBe("workbench.inspector-cap-saturation/v1");
    expect(PRODUCTION_CAPS).toEqual({ projectionMaxNodes: 2_000, projectionMaxEdges: 4_000, runtimeNodeCalls: 1_000, runtimeAgents: 1_000 });
    expect([...CAP_SERIES]).toEqual([1_000, 2_000, 4_000, 8_000]);
    expect([...BOUNDARY_CAPS]).toEqual([1_000, 2_000]);
  });

  it("plans a production-default pass, at / just-past / past passes around both caps, larger caps and an uncapped control", () => {
    expect(plan().map(entry => entry.id)).toEqual([
      "production-default",
      "cap-1000-at",
      "cap-1000-just-past",
      "cap-1000-past",
      "cap-2000-at",
      "cap-2000-just-past",
      "cap-2000-past",
      "cap-4000-past",
      "cap-8000-past",
      "uncapped-control",
    ]);
    expect([...PASS_IDS]).toEqual(plan().map(entry => entry.id));
    for (const entry of plan().filter(item => item.role === "boundary-at")) expect(entry.offered).toBe(entry.cap);
    for (const entry of plan().filter(item => item.role === "boundary-just-past")) expect(entry.offered).toBe((entry.cap ?? 0) + 1);
  });

  it("quotes the two docs sections it answers verbatim, so doc drift fails here", () => {
    expect(DOCS_PINS.map(pin => [pin.key, DOC_QUOTES[pin.key].doc, docsPinVerdict(readRepo(DOC_QUOTES[pin.key].doc), DOC_QUOTES[pin.key], pin)])).toEqual([
      ["scalability", "docs/workbench/10-terminal-inspector.md", { ok: true, why: "" }],
      ["performance", "docs/workbench/14-qa-and-benchmarks.md", { ok: true, why: "" }],
    ]);
    expect(Object.keys(DOC_QUOTES)).toEqual(DOCS_PINS.map(pin => pin.key));
    for (const quoted of [DOC_QUOTES.scalability, DOC_QUOTES.performance]) {
      const text = readRepo(quoted.doc);
      expect(text).toContain(`## ${quoted.section}`);
      for (const quote of quoted.quotes) expect(text).toContain(quote);
    }
  });
});

describe("W21-D docs floor (wb-36l adoption carrier): the docs pin kills the wb-9x5.6 gate's D1-D3 survivors and the u62 floor's D9/D10 shapes", () => {
  it("D1 relocation: the first quoted clause moved out of its section into an EOF appendix keeps the raw includes form green and reddens the docs floor", () => {
    const rows = underShape(D1_RELOCATED);
    expect(rows.map(row => [row.key, row.includes, row.floor.ok])).toEqual([
      ["scalability", true, false],
      ["performance", true, false],
    ]);
    expect(rows.map(row => row.floor.why)).toEqual([expect.stringMatching(/^block 1 differs: /), expect.stringMatching(/^block 2 differs: /)]);
  });

  it("D2 HTML-comment wrap: the first quoted clause wrapped in an HTML comment inside its section keeps the raw includes form green and reddens the docs floor", () => {
    const rows = underShape(D2_COMMENTED);
    expect(rows.map(row => [row.key, row.includes, row.floor.ok])).toEqual([
      ["scalability", true, false],
      ["performance", true, false],
    ]);
    expect(rows.map(row => row.floor.why)).toEqual([expect.stringMatching(/^the section carries HTML \(a comment or a tag\)/), expect.stringMatching(/^the section carries HTML \(a comment or a tag\)/)]);
  });

  it("D3 withdrawn subsection: a weakening ### subsection inserted inside the section keeps the raw includes form green and reddens the docs floor", () => {
    const rows = underShape(D3_WITHDRAWN);
    expect(rows.map(row => [row.key, row.includes, row.floor.ok])).toEqual([
      ["scalability", true, false],
      ["performance", true, false],
    ]);
    expect(rows.map(row => row.floor.why)).toEqual(["the section has 3 blocks; the census pins 1", "the section has 6 blocks; the census pins 4"]);
  });

  it("D9 parent heading path: a non-normative level-1 heading inserted above the section keeps the raw includes form green and reddens the docs floor", () => {
    const rows = underShape(D9_REHOMED);
    expect(rows.map(row => [row.key, row.includes, row.floor.ok])).toEqual([
      ["scalability", true, false],
      ["performance", true, false],
    ]);
    expect(rows.map(row => row.floor.why)).toEqual([
      expect.stringMatching(/^the heading "Scalability targets \(proposed, not measured\)" sits under the parent heading path \["Appendix \(non-normative\)"\]; the census binds it under \["10 /),
      expect.stringMatching(/^the heading "Performance benchmark" sits under the parent heading path \["Appendix \(non-normative\)"\]; the census binds it under \["14 /),
    ]);
  });

  it("D10 spanning range: an HTML comment opened inside the section and closed past its closing heading keeps the raw includes form green and reddens the docs floor", () => {
    const rows = underShape(D10_SPANNING);
    expect(rows.map(row => [row.key, row.includes, row.floor.ok])).toEqual([
      ["scalability", true, false],
      ["performance", true, false],
    ]);
    expect(rows.map(row => row.floor.why)).toEqual([
      expect.stringMatching(/^an HTML block inside the section spans the heading line "## Failure and deception defenses"/),
      expect.stringMatching(/^an HTML block inside the section spans the heading line "## Truth labels and release gates"/),
    ]);
  });
});

describe("W21-D production caps stay unchanged (measurement-only falsifier)", () => {
  it("leaves the three production cap literals in src untouched", () => {
    expect(readRepo("src/workbench/observation.ts")).toMatch(/maxNodes:2_000,maxEdges:4_000/);
    expect(readRepo("src/workflow/runtime.ts")).toMatch(/const nodeCap = 1000;/);
    expect(readRepo("src/workflow/runtime.ts")).toMatch(/export const WORKFLOW_AGENT_CAP = 1000;/);
  });

  it("constructs the production-default pass with no argument and every other pass with a bench-only limits object", () => {
    const { constructed } = realRun();
    // The first projection is the untimed warm-up (1,000 nodes, disclosed as sampling.warmupKeypresses).
    expect(constructed).toHaveLength(PASS_IDS.length + 1);
    expect(constructed[0]).toEqual([{ maxNodes: 1_000, maxEdges: 2_000, maxEvents: 128, maxQuery: 40 }]);
    expect(constructed[1]).toEqual([]);
    for (const args of constructed.slice(2)) {
      expect(args).toHaveLength(1);
      expect(args[0]?.maxNodes).toBeGreaterThanOrEqual(1_000);
      expect(args[0]?.maxEdges).toBe((args[0]?.maxNodes ?? 0) * 2);
    }
    expect(constructed.slice(2).map(args => args[0]?.maxNodes)).toEqual([1_000, 1_000, 1_000, 2_000, 2_000, 2_000, 4_000, 8_000, 12_000]);
  });

  it("measures the production projection cap from a no-argument projection rather than asserting it", () => {
    const { receipt } = realRun();
    expect(receipt.caps.production.projectionMaxNodes).toBe(2_000);
    expect(receipt.caps.production.projectionMaxEdges).toBe(4_000);
    expect(passOf(receipt, "production-default").afterRelations.edges).toBe(4_000);
    expect(receipt.sampling.warmupKeypresses).toBe(50);
    expect(receipt.caps.production.runtimeNodeCalls).toBe(1_000);
    expect(receipt.caps.production.runtimeAgents).toBe(1_000);
    expect(passOf(receipt, "production-default").retained.nodes).toBe(2_000);
    expect(receipt.findings.some(finding => finding.id === "edges-follow-evicted-nodes")).toBe(true);
  });

  it("defines the bench-only limits only in the bench module, never in the CLI or src", () => {
    const cli = readRepo("qa/workbench/inspector-cap-saturation-bench.mjs");
    expect(cli).not.toMatch(/maxNodes|maxEdges|new ObservationProjection/);
    const lib = readRepo("qa/workbench/cap-saturation.mjs");
    expect(lib).toMatch(/maxNodes: cap, maxEdges: cap \* 2/);
  });
});

describe("W21-D overflow is a counted remainder, never a silent drop", () => {
  it("drives the fixture past the runtime cap 1000 and the projection default 2000", () => {
    const { receipt } = realRun();
    expect(receipt.fixture.nodes).toBeGreaterThanOrEqual(10_000);
    expect(receipt.fixture.snapshots).toBeGreaterThan(2_000);
    expect(passOf(receipt, "cap-1000-past").offered.nodes).toBe(receipt.fixture.snapshots);
    expect(passOf(receipt, "production-default").offered.nodes).toBe(receipt.fixture.snapshots);
  });

  it("holds exactly the cap after the snapshot phase and counts every node that did not fit", () => {
    const { receipt } = realRun();
    for (const id of ["cap-1000-past", "cap-2000-past", "cap-4000-past", "cap-8000-past", "production-default"]) {
      const pass = passOf(receipt, id);
      expect(pass.afterSnapshots.nodes).toBe(pass.cap.nodes);
      expect(pass.retained.nodes).toBeLessThanOrEqual(pass.cap.nodes);
      expect(pass.retained.edges).toBeLessThanOrEqual(pass.cap.edges);
      expect(pass.overflow.mode).toBe("counted-remainder");
      expect(pass.afterRelations.edges).toBeLessThanOrEqual(pass.cap.edges);
      expect(pass.overflow.countedRemainder).toBe(pass.offered.nodes - pass.retained.nodes);
      expect(pass.overflow.countedEdgeRemainder).toBe(pass.offered.edges - pass.retained.edges);
      expect(pass.retained.nodes + pass.overflow.countedRemainder).toBe(pass.offered.nodes);
      expect(pass.overflow.eviction).toBe("fifo (observation.ts store and relate)");
      expect(pass.census.rows).toBe(pass.retained.nodes);
      expect(pass.surface.windowTotal).toBe(pass.retained.nodes);
    }
  });

  it("separates at, just-past and past: no overflow at the cap, a remainder of exactly 1 one node past it", () => {
    const { receipt } = realRun();
    for (const cap of BOUNDARY_CAPS) {
      const at = passOf(receipt, `cap-${cap}-at`);
      expect(at.offered.nodes).toBe(cap);
      expect(at.retained.nodes).toBe(cap);
      expect(at.overflow).toMatchObject({ occurred: false, mode: "none", countedRemainder: 0 });
      const justPast = passOf(receipt, `cap-${cap}-just-past`);
      expect(justPast.offered.nodes).toBe(cap + 1);
      expect(justPast.retained.nodes).toBe(cap);
      expect(justPast.overflow).toMatchObject({ occurred: true, mode: "counted-remainder", countedRemainder: 1 });
    }
  });

  it("keeps the uncapped control whole: nothing offered is missing", () => {
    const control = passOf(realRun().receipt, "uncapped-control");
    expect(control.retained.nodes).toBe(control.offered.nodes);
    expect(control.overflow).toMatchObject({ occurred: false, mode: "none", countedRemainder: 0 });
  });

  it("records whether the inspector itself labels the overflow, as measured, and lists a finding when it does not", () => {
    const { receipt } = realRun();
    const overflowing = Object.values(receipt.passes).filter(pass => pass.overflow.occurred);
    expect(overflowing.length).toBeGreaterThan(0);
    for (const pass of overflowing) expect(typeof pass.surface.inspectorLabelsOverflow).toBe("boolean");
    const labelled = overflowing.some(pass => pass.surface.inspectorLabelsOverflow);
    expect(receipt.findings.some(finding => finding.id === "unlabeled-product-overflow")).toBe(!labelled);
    expect(receipt.findings.some(finding => finding.id === "runtime-cap-modelled")).toBe(true);
  });
});

describe("W21-D series: timings at the boundary, visible rows vs total nodes, memory", () => {
  it("samples reducer and layout at and past the boundary in every pass", () => {
    const { receipt } = realRun();
    expect(receipt.series.timing.map(entry => entry.pass)).toEqual([...PASS_IDS]);
    for (const entry of receipt.series.timing) {
      for (const part of [entry.reducer, entry.layout]) {
        expect(part?.samples).toBeGreaterThan(0);
        expect(typeof part?.p50).toBe("number");
        expect(typeof part?.p95).toBe("number");
        expect(part?.p50 ?? 0).toBeLessThanOrEqual(part?.p95 ?? 0);
      }
    }
    for (const pass of Object.values(receipt.passes)) expect(pass.navigation?.keypresses).toBe(receipt.sampling.keypresses);
  });

  it("records visible rendered rows against retained and offered nodes, rows bounded by the terminal", () => {
    const { receipt } = realRun();
    expect(receipt.series.visibleVsTotal.map(entry => entry.pass)).toEqual([...PASS_IDS]);
    for (const entry of receipt.series.visibleVsTotal) {
      expect(entry.visibleRowsMax).not.toBeNull();
      expect(entry.visibleRowsMax ?? 0).toBeGreaterThan(0);
      expect(entry.visibleRowsMax ?? 0).toBeLessThanOrEqual(40);
      expect(entry.retainedNodes).toBe(passOf(receipt, entry.pass).retained.nodes);
      expect(entry.offeredNodes).toBe(passOf(receipt, entry.pass).offered.nodes);
    }
    const rowsAt = (id: string) => receipt.series.visibleVsTotal.find(entry => entry.pass === id);
    expect((rowsAt("uncapped-control")?.retainedNodes ?? 0) > (rowsAt("cap-1000-past")?.retainedNodes ?? 0)).toBe(true);
    for (const pass of Object.values(receipt.passes)) {
      expect(Object.keys(pass.surface.rowsBySize).sort()).toEqual(["120x40", "120x40-ascii", "80x24", "80x24-ascii"]);
    }
  });

  it("records a memory series labelled by how it was taken, judged only when a collection hook exists", () => {
    const { receipt } = realRun();
    expect(receipt.series.memory.map(entry => entry.pass)).toEqual([...PASS_IDS]);
    for (const entry of receipt.series.memory) expect(Number.isFinite(entry.heapBytes)).toBe(true);
    expect(receipt.memory.judged).toBe(typeof globalThis.gc === "function");
    expect(receipt.memory.label).toMatch(receipt.memory.judged ? /post-gc/ : /transient-inclusive/);
    expect(receipt.findings.some(finding => finding.id === "memory-unjudged")).toBe(!receipt.memory.judged);
  });

  it("emits host, toolchain, command, sampling and the docs it answers, as plain JSON", () => {
    const { receipt } = realRun();
    expect(receipt.contract).toBe(CAP_RECEIPT_CONTRACT);
    expect(receipt.benchmark).toBe("inspector-cap-saturation");
    expect(receipt.measured).toBe(true);
    expect(receipt.revision).toBe("test-revision");
    expect(receipt.toolchain.node).toBe(process.version);
    expect(receipt.command).toBe(HOST.command);
    expect(receipt.docs.scalability.section).toBe("Scalability targets (proposed, not measured)");
    expect(receipt.docs.performance.section).toBe("Performance benchmark");
    expect(JSON.parse(JSON.stringify(receipt))).toEqual(receipt);
  });
});

describe("W21-D honest exit semantics", () => {
  it("agrees with the assessor on the real receipt, whatever the host measured", () => {
    const { receipt } = realRun();
    expect(receipt.exitCode).toBe(exitCode(receipt));
    expect(receipt.realised).toBe(true);
    expect(receipt.violations).toEqual([]);
    expect(receipt.silentDrops).toEqual([]);
    expect([0, 1]).toContain(receipt.exitCode);
    expect(receipt.target.ms).toBe(NAVIGATION_TARGET_MS);
    expect(receipt.target.statistic).toBe("p95");
  });

  it("exits 0 for a realised receipt whose overflow is counted and whose p95 timings are within 20 ms", () => {
    expect(assess(calm())).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
  });

  it("exits 1, naming the series, when a p95 is over 20 ms; exactly 20 ms is within budget", () => {
    const slow = calm();
    const nav = passOf(slow, "cap-2000-past").navigation;
    if (!nav) throw new Error("no navigation");
    nav.all.p95 = 20;
    expect(assess(slow).exitCode).toBe(0);
    nav.all.p95 = 20.5;
    const result = assess(slow) as ReturnType<typeof assess> & { target?: { over: string[] } };
    expect(result.exitCode).toBe(1);
    expect(result.verdict).toBe("over-budget");
    expect(result.target?.over).toEqual(["cap-2000-past:navigation"]);
    nav.resize.p95 = 99;
    expect((assess(slow) as ReturnType<typeof assess> & { target?: { over: string[] } }).target?.over).toEqual([
      "cap-2000-past:navigation",
      "cap-2000-past:resize",
    ]);
  });

  it("exits 1 as a silent drop when the receipt counts fewer missing nodes than are missing", () => {
    const forged = calm();
    passOf(forged, "cap-1000-just-past").overflow.countedRemainder = 0;
    const result = assess(forged);
    expect(result.exitCode).toBe(1);
    expect(result.verdict).toBe("silent-drop");
    expect(rules(result.silentDrops)).toContain("overflow-uncounted");
    const unlabelled = calm();
    passOf(unlabelled, "cap-4000-past").overflow.mode = "none";
    expect(rules(assess(unlabelled).silentDrops)).toContain("overflow-uncounted");
  });

  it("exits 1 when the store dropped more than the cap explains, or kept more than the cap allows", () => {
    const early = calm();
    passOf(early, "cap-8000-past").afterSnapshots.nodes -= 1;
    expect(rules(assess(early).silentDrops)).toContain("dropped-beyond-cap");
    const over = calm();
    const pass = passOf(over, "cap-1000-past");
    pass.retained.nodes = 1_001;
    pass.overflow.countedRemainder = pass.offered.nodes - 1_001;
    const result = assess(over);
    expect(result.exitCode).toBe(1);
    expect(rules(result.silentDrops)).toContain("cap-exceeded");
  });

  it("exits 1 when the inspector window lists fewer rows than the store holds", () => {
    const hidden = calm();
    passOf(hidden, "cap-2000-past").census.rows -= 1;
    expect(rules(assess(hidden).silentDrops)).toContain("window-disagrees-with-store");
  });

  it("exits 1 when a terminal frame reports more rows than the largest terminal", () => {
    const tall = calm();
    const nav = passOf(tall, "uncapped-control").navigation;
    if (!nav) throw new Error("no navigation");
    nav.maxRenderedRows = 41;
    const result = assess(tall);
    expect(result.exitCode).toBe(1);
    expect(rules(result.unbounded)).toContain("visible-rows-exceed-terminal");
  });

  it("judges memory only when a collection hook was used, and fails a heap that follows the offered population", () => {
    const unjudged = calm();
    passOf(unjudged, "cap-1000-past").memory.heapBytes = 10 ** 9;
    expect(assess(unjudged).exitCode).toBe(0);
    const judged = calm();
    judged.memory.judged = true;
    passOf(judged, "uncapped-control").memory.heapBytes = 1_000;
    passOf(judged, "cap-1000-past").memory.heapBytes = 5_000;
    const result = assess(judged);
    expect(result.exitCode).toBe(1);
    expect(result.verdict).toBe("unbounded");
    expect(rules(result.unbounded)).toContain("memory-not-bounded-by-projection");
    passOf(judged, "cap-1000-past").memory.heapBytes = 500;
    expect(assess(judged).exitCode).toBe(0);
  });

  it("exits 2 for a fixture that is not the W21 shape, before any timing judgement", () => {
    const wrong = calm();
    wrong.fixture.nodes = 9_999;
    const result = assess(wrong);
    expect(result.exitCode).toBe(2);
    expect(result.verdict).toBe("not-cap-saturation-shape");
    expect(rules(result.violations)).toContain("operations-below-10000");
    passOf(wrong, "cap-2000-past").navigation!.all.p95 = 500;
    expect(assess(wrong).exitCode).toBe(2);
  });

  it("exits 2 when a pass is missing, mislabelled or never navigated", () => {
    const missing = calm();
    delete missing.passes["cap-4000-past"];
    expect(rules(assess(missing).violations)).toContain("pass-missing");
    const mislabelled = calm();
    passOf(mislabelled, "cap-1000-just-past").offered.nodes = 1_002;
    expect(rules(assess(mislabelled).violations)).toContain("offered-mismatch");
    const recapped = calm();
    passOf(recapped, "cap-2000-past").cap.nodes = 2_500;
    expect(rules(assess(recapped).violations)).toContain("cap-mismatch");
    const dark = calm();
    passOf(dark, "cap-1000-past").navigation = null;
    const result = assess(dark);
    expect(result.exitCode).toBe(2);
    expect(rules(result.violations)).toContain("pass-not-navigated");
  });

  it("exits 2 when a series was never sampled, rather than passing it by absence", () => {
    const unsampled = calm();
    const nav = passOf(unsampled, "cap-8000-past").navigation;
    if (!nav) throw new Error("no navigation");
    nav.layout = { samples: 0, p50: null, p95: null, max: null };
    const result = assess(unsampled);
    expect(result.exitCode).toBe(2);
    expect(rules(result.violations)).toContain("series-not-sampled");
  });

  it("exits 2 when a production cap is not the one this receipt is about, or the fixture cannot saturate the caps", () => {
    const raised = calm();
    raised.caps.production.projectionMaxNodes = 4_000;
    expect(rules(assess(raised).violations)).toContain("production-cap-changed");
    const edges = calm();
    edges.caps.production.projectionMaxEdges = 8_000;
    expect(rules(assess(edges).violations)).toContain("production-cap-changed");
    const runtime = calm();
    runtime.caps.production.runtimeNodeCalls = 2_000;
    expect(rules(assess(runtime).violations)).toContain("production-cap-changed");
    const unread = calm();
    unread.caps.production.runtimeNodeCalls = null;
    expect(rules(assess(unread).violations)).not.toContain("production-cap-changed");
    const small = calm();
    small.fixture.snapshots = 2_000;
    expect(rules(assess(small).violations)).toContain("fixture-does-not-exceed-caps");
    const argful = calm();
    passOf(argful, "production-default").cap.constructorArgs = 1;
    expect(rules(assess(argful).violations)).toContain("production-pass-not-default");
  });
});

const NON_COMPARABLE = "non-comparable (bench-only limits 128/40 vs production 20,000/100)";
const KEYS = (receipt: Receipt): string[] => Object.keys(receipt);

describe("W21-D owner rulings F1/F3/F5 (wb-9x5.6 respin)", () => {
  it("F1: records unlabeled-product-overflow and exits 0 in plain receipt mode", () => {
    const plain = calm(unlabeledRun());
    expect(plain.findings.some(finding => finding.id === "unlabeled-product-overflow")).toBe(true);
    expect(plain.strict ?? false).toBe(false);
    expect(assess(plain)).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
  });

  it("F1: --strict exits 1 on the unlabeled-product-overflow finding and names it", () => {
    const strict = { ...calm(unlabeledRun()), strict: true };
    const result = assess(strict) as ReturnType<typeof assess> & { strictFindings?: Array<{ id: string }> };
    expect(result.exitCode).toBe(1);
    expect(result.verdict).toBe("unlabeled-product-overflow");
    expect(result.strictFindings?.map(finding => finding.id)).toEqual(["unlabeled-product-overflow"]);
    expect(exitCode(strict)).toBe(1);
  });

  it("F1: --strict recomputes the finding from the passes, so a stripped findings list cannot launder it", () => {
    const forged = { ...calm(unlabeledRun()), strict: true, findings: [] as Receipt["findings"] };
    expect(assess(forged).exitCode).toBe(1);
  });

  it("F1: --strict goes green once the inspector labels the overflow (the product fix)", () => {
    const fixed = { ...calm(), strict: true };
    for (const pass of Object.values(fixed.passes)) if (pass.overflow.occurred) pass.surface.inspectorLabelsOverflow = true;
    expect(assess(fixed)).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
  });

  it("F1 (wb-ea1): the real run labels every overflowing pass, so plain mode records no unlabeled finding and --strict exits 0", () => {
    const { receipt } = realRun();
    const overflowing = Object.values(receipt.passes).filter(pass => pass.overflow.occurred);
    expect(overflowing.length).toBeGreaterThan(0);
    for (const pass of overflowing) expect(pass.surface.inspectorLabelsOverflow).toBe(true);
    expect(receipt.findings.some(finding => finding.id === "unlabeled-product-overflow")).toBe(false);
    const result = assess({ ...calm(), strict: true }) as ReturnType<typeof assess> & { strictFindings?: Array<{ id: string }> };
    expect(result).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    expect(result.strictFindings).toEqual([]);
  });

  // What the bench counts as a label is the inspector's whole counted remainder line ("N nodes not shown: projection cap M",
  // optionally " · K events not shown"); the frame header's ' · capped' suffix is not one (wb-j0b, R473 R2). The mutant rows that
  // drop that line are judged in test/workbench-cap-saturation-remainder-label.test.ts: one real bench run, mutant rows re-judged
  // over its kept projections (wb-rvv).
  it("F1 (wb-ea1): withdrawing only the projection's eviction counts withdraws every label: the bench's labels follow the projection's truncation counts", () => {
    const silent = unlabeledRun();
    expect(Object.keys(silent.passes)).toEqual(Object.keys(realRun().receipt.passes));
    const overflowing = Object.values(silent.passes).filter(pass => pass.overflow.occurred);
    expect(overflowing.length).toBeGreaterThan(0);
    for (const pass of overflowing) expect(pass.surface.inspectorLabelsOverflow).toBe(false);
  });

  it("F1: strict never masks an unrealised receipt (exit 2 stays 2)", () => {
    // Anchored on the measured silent run (wb-ea1 respin, gate U1): the real run now labels every overflowing pass, so its
    // receipt carries no strict finding and cannot exercise the strict-versus-unrealised precedence this row pins.
    const wrong = { ...calm(unlabeledRun()), strict: true };
    wrong.fixture.snapshots = 10;
    const result = assess(wrong) as ReturnType<typeof assess> & { strictFindings?: Array<{ id: string }> };
    expect(result.realised).toBe(false);
    expect(result.strictFindings?.map(finding => finding.id)).toEqual(["unlabeled-product-overflow"]);
    expect(result.exitCode).toBe(2);
  });

  it("F1: the receipt records the strict flag it ran under, defaulting to plain", () => {
    expect(realRun().receipt.strict).toBe(false);
  });

  it("F3: labels the cross-pass memory series non-comparable, at the series and on every entry", () => {
    const { receipt } = realRun();
    expect(receipt.series.memoryComparability).toBe(NON_COMPARABLE);
    for (const entry of receipt.series.memory) expect(entry.comparability).toBe(NON_COMPARABLE);
  });

  it("F5: states the bench-only bounds in the receipt header, before any measurement", () => {
    const { receipt } = realRun();
    const bounds = receipt.benchOnlyBounds;
    expect(bounds).toMatchObject({ events: 128, query: 40, productionEvents: 20_000, productionQuery: 100 });
    expect(bounds?.nodes).toEqual([...CAP_SERIES, 12_000]);
    expect(bounds?.boundary).toEqual([...BOUNDARY_CAPS]);
    expect(bounds?.source).toMatch(/hard-coded/);
    const keys = KEYS(receipt);
    for (const measured of ["caps", "fixture", "sampling", "memory", "passes", "series", "findings"]) {
      expect(keys.indexOf("benchOnlyBounds")).toBeGreaterThan(-1);
      expect(keys.indexOf("benchOnlyBounds")).toBeLessThan(keys.indexOf(measured));
    }
  });

  it("wires --strict through the thin CLI and keeps the Forge command plain", () => {
    const text = readRepo("qa/workbench/inspector-cap-saturation-bench.mjs");
    expect(text).toMatch(/process\.argv\.includes\('--strict'\)/);
    expect(text).toMatch(/strict/);
    expect(readRepo("forge.toml")).not.toMatch(/cap-saturation-bench\.mjs --strict/);
  });
});

describe("W21-D CLI and Forge registration", () => {
  it("keeps the CLI thin: dist imports only, receipt written and printed before the exit code is set", () => {
    const text = readRepo("qa/workbench/inspector-cap-saturation-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(
      [
        "../../dist/ui/workflow-inspector.js",
        "../../dist/workbench/observation.js",
        "../../dist/workflow/runtime.js",
        "./bench-revision.mjs",
        "./cap-saturation.mjs",
        "./grouped-fixture.mjs",
        "node:fs",
        "node:os",
      ].sort(),
    );
    expect(text).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(text).toMatch(/CAP_BENCH_RECEIPT/);
    // One-liner batch item (5), bound onto wb-9x5.6 by name (owner ruling O2): the receipt line is printed BEFORE the
    // file write and a failed write exits 3 with the receipt already on stdout. The write-before-print order this pin
    // held at the 11146ac cut (:639-644) flips here, in the same commit as the behaviour; the publication itself lives
    // in qa/workbench/cap-saturation.mjs (publishReceipt) so the describe block below can drive it, and the CLI hands
    // it the real writers and the receipt path, then sets the exit code from what it returns.
    const lib = readRepo("qa/workbench/cap-saturation.mjs");
    const printed = lib.indexOf("log(line);");
    const written = lib.indexOf("writeFile(path, ");
    const settled = lib.indexOf("return exitCodeFor(receipt);");
    expect(printed).toBeGreaterThan(-1);
    expect(written).toBeGreaterThan(printed);
    expect(settled).toBeGreaterThan(written);
    // wb-oq3 re-cut (gate U1a): the measured receipt is bound through the git revision stamp.
    const measured = text.indexOf("receipt = withBenchRevision(runCapSaturationBench(");
    const exit = text.indexOf(
      "process.exitCode = publishReceipt(receipt, {path: process.env.CAP_BENCH_RECEIPT, log: console.log, logError: console.error, writeFile: writeFileSync});",
    );
    expect(measured).toBeGreaterThan(-1);
    expect(exit).toBeGreaterThan(measured);
    expect(text).not.toMatch(/writeFileSync\s*\(|console\.log\s*\(/);
    expect(text).toMatch(/process\.exit\(3\)/);
  });

  it("reuses the wb-9x5.2 fixture builder rather than building a second fixture", () => {
    const lib = readRepo("qa/workbench/cap-saturation.mjs");
    expect(lib).toMatch(/from '\.\/grouped-fixture\.mjs'/);
    expect(lib).not.toMatch(/buildGroupedFixture|function seeded|mulberry32/);
    expect(lib).not.toMatch(/Date\.now|Math\.random|new Date\(\s*\)/);
    const imports = [...lib.matchAll(/^\}? ?from '([^']+)'/gm)].map(match => match[1]);
    expect(imports).toEqual(["./grouped-fixture.mjs"]);
  });

  it("registers inspector-cap-saturation-bench as a Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.inspector-cap-saturation-bench\]\ncommand = "node --expose-gc qa\/workbench\/inspector-cap-saturation-bench\.mjs"\ntimeout = 600\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/cap-saturation/);
  });
});

interface PublishIo {
  path?: string;
  log: (line: string) => void;
  logError: (line: string) => void;
  writeFile: (path: string, text: string) => void;
}
const publish = publishReceipt as (receipt: Receipt, io: PublishIo) => number;

describe("W21-D receipt publication: printed before the file write; a failed write exits 3 with the receipt on stdout (one-liner batch item (5), bound onto wb-9x5.6 by name)", () => {
  interface Published {
    kind: "log" | "error" | "write";
    text: string;
    path?: string;
  }
  const recorder = (failure?: unknown) => {
    const events: Published[] = [];
    const io: Omit<PublishIo, "path"> = {
      log: text => {
        events.push({ kind: "log", text });
      },
      logError: text => {
        events.push({ kind: "error", text });
      },
      writeFile: (path, text) => {
        if (failure !== undefined) throw failure;
        events.push({ kind: "write", text, path });
      },
    };
    return { events, io };
  };
  /** Receipts whose re-assessed exit code is 0 (calm, plain), 1 (calm, --strict) and 2 (wrong fixture shape). */
  const receiptExiting = (code: 0 | 1 | 2): Receipt => {
    if (code === 0) return calm();
    if (code === 1) return { ...calm(unlabeledRun()), strict: true };
    const wrong = calm();
    wrong.fixture.snapshots = 10;
    return wrong;
  };

  it("prints the receipt line first, then writes the same line to the receipt file, then returns the re-assessed exit code", () => {
    for (const code of [0, 1, 2] as const) {
      const receipt = receiptExiting(code);
      expect(exitCode(receipt)).toBe(code);
      const { events, io } = recorder();
      expect(publish(receipt, { ...io, path: "/var/tmp/cap-receipt.json" })).toBe(code);
      const line = JSON.stringify(receipt);
      expect(events).toEqual([
        { kind: "log", text: line },
        { kind: "write", text: `${line}\n`, path: "/var/tmp/cap-receipt.json" },
      ]);
    }
  });

  it("re-assesses the exit code from the receipt rather than trusting the one stored in it", () => {
    const forged = { ...receiptExiting(1), exitCode: 0, verdict: "within-budget" };
    const { events, io } = recorder();
    expect(publish(forged, io)).toBe(1);
    expect(events).toEqual([{ kind: "log", text: JSON.stringify(forged) }]);
  });

  it("prints the receipt and writes nothing when no receipt path is set, unset or empty", () => {
    for (const path of [undefined, ""]) {
      const receipt = receiptExiting(0);
      const { events, io } = recorder();
      expect(publish(receipt, { ...io, path })).toBe(0);
      expect(events).toEqual([{ kind: "log", text: JSON.stringify(receipt) }]);
    }
  });

  for (const code of [0, 1, 2] as const) {
    it(`exits 3, never the receipt's own ${code}, when the receipt write fails, with the receipt already printed and the failure on stderr`, () => {
      const receipt = receiptExiting(code);
      const detail = "ENOENT: no such file or directory, open '/nonexistent/cap-receipt.json'";
      const { events, io } = recorder(new Error(detail));
      expect(publish(receipt, { ...io, path: "/nonexistent/cap-receipt.json" })).toBe(3);
      expect(events.map(event => event.kind)).toEqual(["log", "error"]);
      expect(events[0]?.text).toBe(JSON.stringify(receipt));
      const diagnostic: unknown = JSON.parse(events[1]?.text ?? "null");
      expect(diagnostic).toEqual({ benchmark: "inspector-cap-saturation", error: "receipt-write-failed", path: "/nonexistent/cap-receipt.json", detail });
    });
  }

  it("reports a non-Error throw from the writer as text and still exits 3 after printing", () => {
    const receipt = receiptExiting(0);
    const { events, io } = recorder("disk quota exceeded");
    expect(publish(receipt, { ...io, path: "/var/tmp/cap-receipt.json" })).toBe(3);
    expect(events.map(event => event.kind)).toEqual(["log", "error"]);
    const diagnostic: unknown = JSON.parse(events[1]?.text ?? "null");
    expect(diagnostic).toEqual({ benchmark: "inspector-cap-saturation", error: "receipt-write-failed", path: "/var/tmp/cap-receipt.json", detail: "disk quota exceeded" });
  });

  it("with the real node:fs writer: the file holds the printed line, and an unwritable path exits 3 with the receipt on stdout", () => {
    const directory = makeScratch("w21-cap-");
    try {
      const receipt = receiptExiting(0);
      const printed: string[] = [];
      const errors: string[] = [];
      const io = {
        log: (line: string) => {
          printed.push(line);
        },
        logError: (line: string) => {
          errors.push(line);
        },
        writeFile: writeFileSync,
      };
      const target = join(directory, "receipt.json");
      expect(publish(receipt, { ...io, path: target })).toBe(0);
      expect(printed).toEqual([JSON.stringify(receipt)]);
      expect(readFileSync(target, "utf8")).toBe(`${printed[0]}\n`);
      const unwritable = join(directory, "missing", "receipt.json");
      expect(publish(receipt, { ...io, path: unwritable })).toBe(3);
      expect(printed).toEqual([JSON.stringify(receipt), JSON.stringify(receipt)]);
      expect(errors).toHaveLength(1);
      const diagnostic: unknown = JSON.parse(errors[0] ?? "null");
      expect(diagnostic).toMatchObject({ benchmark: "inspector-cap-saturation", error: "receipt-write-failed", path: unwritable });
    } finally {
      removeScratch(directory);
    }
  });
});
