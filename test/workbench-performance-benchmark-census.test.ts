/**
 * wb-9x5.17 - docs/workbench/14 "Performance benchmark" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds the seven fixture properties, the seven "Measure:" bullets and the target and
 * honesty clauses of the docs/14 "Performance benchmark" section to existing cases by file and
 * verbatim title. It never executes a pinned case or a bench, never reads a receipt file and never
 * reads or edits forge.toml. `tier` states what kind of evidence a pinned case is; a clause with no
 * landed case is `unpinned` with a reason naming its owning bead, never counted as passed.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const REPO_ROOT = new URL("../", import.meta.url);
const DOCS_FILE = "docs/workbench/14-qa-and-benchmarks.md";
const EN_DASH = String.fromCharCode(0x2013);

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface ClauseRow {
  readonly clause: string;
  readonly part: "fixture" | "measure" | "target";
  readonly tier: "default-gate" | "bench-receipt";
  readonly status: "pinned" | "unpinned";
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const GROUPED = "test/workbench-grouped-fixture.test.ts";
const RECOVERY = "test/workbench-observation-recovery-receipt.test.ts";
const PERF = "test/workbench-observation-perf.test.ts";
const SELECTOR = "test/workbench-reducer-selector-bench.test.ts";

const ROWS: readonly ClauseRow[] = Object.freeze([
  {
    clause: "Construct deterministic fixture with >=1000 nodes",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: GROUPED, title: "builds the default W21 fixture identically twice" },
      { file: GROUPED, title: "applies a 2,000-node subset to a default-limits projection without throwing and keeps typed fixture provenance" },
      { file: GROUPED, title: "keeps a default projection at 2,000 nodes and 4,000 edges, and no src/ literal raises either cap" },
    ],
    reason: "Binds determinism, the 2,000-node subset against default limits and the W21 standing rule that production caps are unchanged.",
  },
  {
    clause: ">=100000 events",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "changes 1-100 distinct operations per tick across >= 100 ticks, >= 100,000 updates, in tick order" }],
  },
  {
    clause: `1${EN_DASH}100 active changes per tick`,
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "changes 1-100 distinct operations per tick across >= 100 ticks, >= 100,000 updates, in tick order" }],
  },
  {
    clause: "5 nested groups depth",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "nests every operation under exactly 5 group levels through grouping relations" }],
  },
  {
    clause: "partial graph links",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "adds partial dependency (about every 7th operation, never all) and hypothesis links between operations only" }],
  },
  {
    clause: "long Unicode paths",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "titles every node with a long Unicode path (CJK, combining marks) inside the projection's bounds" }],
  },
  {
    clause: "large transcript payload refs",
    part: "fixture",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: GROUPED, title: "carries transcript payload references, never bodies, and only plain projection input fields" }],
  },
  {
    clause: "- observer ingest events/s and projection memory",
    part: "measure",
    tier: "bench-receipt",
    status: "pinned",
    pins: [
      { file: RECOVERY, title: "times every refresh() call on its own and derives throughput and heap growth from the injected probes" },
      { file: PERF, title: "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history" },
    ],
  },
  {
    clause: "- p50/p95 reducer update and UI selector time",
    part: "measure",
    tier: "bench-receipt",
    status: "pinned",
    pins: [
      { file: SELECTOR, title: "emits host, toolchain, fixture shape, limits and every per-band latency" },
      { file: SELECTOR, title: "exits 1 and names the series when a selector p95 is over 20 ms, and never judges the reducer" },
    ],
  },
  {
    clause: "- p50/p95 layout render/navigate/resize time",
    part: "measure",
    tier: "bench-receipt",
    status: "pinned",
    pins: [{ file: GROUPED, title: "reports pass B with every offered row retained and navigation/layout/resize distributions per view, size and key" }],
    reason: "The four-view navigation receipt is the open follow-up wb-9x5.11; this binds pass B only.",
  },
  {
    clause: "- number of visible rendered rows vs total nodes",
    part: "measure",
    tier: "bench-receipt",
    status: "pinned",
    pins: [{ file: GROUPED, title: "reports pass A as honest FIFO truncation: retained versus offered under default caps, no navigation claim" }],
  },
  {
    clause: "- terminal bytes per update (with line diff)",
    part: "measure",
    tier: "bench-receipt",
    status: "unpinned",
    pins: [],
    reason: "No landed case measures terminal bytes per update; the receipt is wb-9x5.8 (in flight), so the bullet is a visible gap until it lands.",
  },
  {
    clause: "- recover snapshot/cursor latency",
    part: "measure",
    tier: "bench-receipt",
    status: "pinned",
    pins: [
      { file: RECOVERY, title: "records every recovery and bounded-query field as a finite number and holds the recovery invariants (200 nodes / 2,000 events)" },
      { file: RECOVERY, title: "catches an evicted cursor reported as a complete resume" },
    ],
  },
  {
    clause: "- Pi model tool response size under bounded queries",
    part: "measure",
    tier: "bench-receipt",
    status: "unpinned",
    pins: [],
    reason: "No landed case measures Pi model tool response size; the receipt is wb-9x5.5 (open, blocked by wb-752.2), so the bullet is a visible gap until it lands.",
  },
  {
    clause: "<=20ms per navigation/layout calculation on declared reference host",
    part: "target",
    tier: "bench-receipt",
    status: "pinned",
    pins: [
      { file: GROUPED, title: "exits 1 only for a bench-only p95 over 20 ms on a realised shape; 20 ms itself is within target" },
      { file: GROUPED, title: "registers inspector-grouped-bench as a Forge command outside the default gate" },
      { file: SELECTOR, title: "registers reducer-selector-bench as a Forge command outside the default gate" },
      { file: RECOVERY, title: "registers the bench as one additive Forge command outside the default gate" },
    ],
    reason: "The target is judged only by bench-only exit 1; the registration cases pin the fact that each bench runs outside the default gate. This census never reads forge.toml.",
  },
  {
    clause: "redraw <=4Hz live",
    part: "target",
    tier: "bench-receipt",
    status: "pinned",
    pins: [{ file: SELECTOR, title: "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock" }],
  },
  {
    clause: "no full 100k-event fold per redraw",
    part: "target",
    tier: "bench-receipt",
    status: "pinned",
    pins: [{ file: SELECTOR, title: "accounts reducer calls and bounded reads, and records no full fold per redraw" }],
  },
  {
    clause: "report measured hardware/toolchain and outliers",
    part: "target",
    tier: "bench-receipt",
    status: "pinned",
    pins: [{ file: GROUPED, title: "emits every receipt field with host/toolchain, fixture shape and judged target" }],
  },
  {
    clause: "No invented pass numbers.",
    part: "target",
    tier: "bench-receipt",
    status: "pinned",
    pins: [
      { file: GROUPED, title: "exits 2 for an unrealised measurement and names why, before any timing judgement" },
      { file: GROUPED, title: "exits 2 when a judged series was never sampled, rather than passing it by absence" },
    ],
  },
]);

const FIXTURE_SENTENCE = `Construct deterministic fixture with >=1000 nodes, >=100000 events, 1${EN_DASH}100 active changes per tick, 5 nested groups depth, partial graph links, long Unicode paths and large transcript payload refs. Measure:`;
const TARGET_SENTENCE =
  "Proposed responsive target <=20ms per navigation/layout calculation on declared reference host, redraw <=4Hz live; no full 100k-event fold per redraw; report measured hardware/toolchain and outliers. No invented pass numbers.";

const FORBIDDEN_MODIFIERS = new Set(["skip", "todo", "fails", "only", "skipIf", "runIf"]);

interface TitleLocation {
  readonly occurrences: number;
  readonly forbiddenModifiers: readonly string[];
}

/** Locates a case title as a quoted literal and reports how often it occurs and under which call modifiers. */
function locateTitle(source: string, title: string): TitleLocation {
  const callHead = /\b(?:it|test)((?:\.[A-Za-z]+)*)\s*\(/g;
  let occurrences = 0;
  const forbiddenModifiers: string[] = [];
  for (const quote of ['"', "'", "`"]) {
    const literal = `${quote}${title}${quote}`;
    let from = source.indexOf(literal);
    while (from !== -1) {
      const before = source.slice(0, from);
      let head: RegExpExecArray | null = null;
      for (const match of before.matchAll(callHead)) head = match;
      const preceding = before.slice(before.search(/\s*\(?\s*$/)).replace(/\s/g, "");
      const isCaseTitle = head !== null && (preceding === "(" || preceding === "");
      if (isCaseTitle) {
        occurrences += 1;
        for (const modifier of (head?.[1] ?? "").split(".").filter(Boolean)) {
          if (FORBIDDEN_MODIFIERS.has(modifier)) forbiddenModifiers.push(modifier);
        }
      }
      from = source.indexOf(literal, from + literal.length);
    }
  }
  return { occurrences, forbiddenModifiers };
}

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, REPO_ROOT), "utf8");
}

describe("wb-9x5.17 docs/14 performance-benchmark census", () => {
  const docs = read(DOCS_FILE);

  it("classifies seven fixture properties, seven measure bullets and the target clauses", () => {
    expect(ROWS.filter((row) => row.part === "fixture")).toHaveLength(7);
    expect(ROWS.filter((row) => row.part === "measure")).toHaveLength(7);
    expect(ROWS.filter((row) => row.part === "target").length).toBeGreaterThanOrEqual(5);
    for (const row of ROWS) {
      expect(["default-gate", "bench-receipt"], `clause "${row.clause}": tier`).toContain(row.tier);
      expect(["pinned", "unpinned"], `clause "${row.clause}": status`).toContain(row.status);
    }
  });

  it("carries the fixture sentence and the target sentence verbatim in docs/14", () => {
    expect(docs.includes(FIXTURE_SENTENCE), `${DOCS_FILE}: the fixture sentence drifted`).toBe(true);
    expect(docs.includes(TARGET_SENTENCE), `${DOCS_FILE}: the target and honesty sentence drifted`).toBe(true);
  });

  for (const row of ROWS) {
    it(`carries the ${row.part} clause "${row.clause}" in docs/14`, () => {
      const text = row.clause.startsWith("- ") ? `\n${row.clause}\n` : row.clause;
      expect(docs.includes(text), `${DOCS_FILE}: the ${row.part} clause "${row.clause}" is no longer present`).toBe(true);
    });
  }

  it("never counts an unpinned clause as passed: it names an owning bead and holds no pins", () => {
    for (const row of ROWS) {
      if (row.status === "unpinned") {
        expect(row.pins, `clause "${row.clause}": unpinned rows hold no pins`).toEqual([]);
        expect(row.reason ?? "", `clause "${row.clause}": unpinned rows name an owning bead`).toMatch(/wb-[0-9a-z]+\.[0-9]+/);
      } else {
        expect(row.pins.length, `clause "${row.clause}": pinned rows hold at least one pin`).toBeGreaterThan(0);
      }
    }
  });

  it("leaves exactly the terminal-bytes and tool-response-size bullets unpinned", () => {
    expect(ROWS.filter((row) => row.status === "unpinned").map((row) => row.clause)).toEqual([
      "- terminal bytes per update (with line diff)",
      "- Pi model tool response size under bounded queries",
    ]);
  });

  for (const row of ROWS.filter((candidate) => candidate.status === "pinned")) {
    for (const pin of row.pins) {
      it(`${row.part} clause "${row.clause}" stays bound to ${pin.file}: "${pin.title}"`, () => {
        const where = `${row.part} clause "${row.clause}", file ${pin.file}, title "${pin.title}"`;
        const located = locateTitle(read(pin.file), pin.title);
        expect(located.occurrences, `${where}: expected the case exactly once`).toBe(1);
        expect(located.forbiddenModifiers, `${where}: the case is skipped, todo, failing-by-design or focused`).toEqual([]);
      });
    }
  }
});

describe("wb-9x5.17 title locator falsifiers (the mutant a rename, delete or skip would be)", () => {
  const live = [
    'describe("suite", () => {',
    '  it("case alpha", () => {});',
    "  it('case beta', async () => {});",
    '  it.each([1, 2])("case gamma %s", () => {});',
    "});",
  ].join("\n");

  it("finds a live double-quoted, single-quoted and it.each title exactly once", () => {
    expect(locateTitle(live, "case alpha")).toEqual({ occurrences: 1, forbiddenModifiers: [] });
    expect(locateTitle(live, "case beta")).toEqual({ occurrences: 1, forbiddenModifiers: [] });
    expect(locateTitle(live, "case gamma %s")).toEqual({ occurrences: 1, forbiddenModifiers: [] });
  });

  it("goes red on a rename: the old title is no longer present", () => {
    expect(locateTitle(live.replace("case alpha", "case alpha renamed"), "case alpha").occurrences).toBe(0);
  });

  it("goes red on a deletion: the case is gone", () => {
    expect(locateTitle(live.replace('  it("case alpha", () => {});\n', ""), "case alpha").occurrences).toBe(0);
  });

  it("goes red on a duplicate: the title occurs twice", () => {
    expect(locateTitle(`${live}\nit("case alpha", () => {});`, "case alpha").occurrences).toBe(2);
  });

  it.each(["skip", "todo", "fails", "only"])("goes red on it.%s", (modifier) => {
    const mutated = live.replace('it("case alpha"', `it.${modifier}("case alpha"`);
    expect(locateTitle(mutated, "case alpha").forbiddenModifiers).toEqual([modifier]);
  });

  it("goes red on test.skip and on it.skip.each", () => {
    expect(locateTitle('test.skip("case delta", () => {});', "case delta").forbiddenModifiers).toEqual(["skip"]);
    expect(locateTitle('it.skip.each([1])("case delta %s", () => {});', "case delta %s").forbiddenModifiers).toEqual(["skip"]);
  });

  it("does not count a title that only appears inside an assertion string", () => {
    expect(locateTitle('expect(x).toBe("case alpha");', "case alpha").occurrences).toBe(0);
  });
});
