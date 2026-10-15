/**
 * VC-4 / W13 / W14 (wb-752.15): docs/09 "Reader adapters" and "Relationships are
 * typed and provenanced" census falsifier.
 *
 * docs/workbench/09-observation-and-provenance.md makes sentence-level promises
 * about what a reader adapter returns and how relationships are typed. This file
 * binds each promise (a frozen row, quoted verbatim) to the landed vitest cases
 * that exercise it, by file, verbatim title and tier. A sync fs scan proves every
 * pinned title still exists inside an it(/test( call in its file and is not
 * .skip/.todo/.fails, so a rename, deletion or skip of a pinned case goes red
 * naming the row. Rows with no landed case today are listed as UNPINNED with a
 * reason and are asserted to stay unpinned until a case lands (pin-flip).
 *
 * Disjoint from the siblings wb-752.10 ("Acceptance/negative controls") and
 * wb-752.14 ("Freshness and ambiguity", "Data retention and privacy"). Source
 * reads only: no network, no live tier, no src, docs or qa edit.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-docs09-readers-relationships-census.test.ts";
const DOCS_09 = "docs/workbench/09-observation-and-provenance.md";
const VITEST_CONFIG = "vitest.config.ts";

type Tier = "default-gate" | "native-read" | "bench" | "knownWidening";
const TIERS: readonly Tier[] = ["default-gate", "native-read", "bench", "knownWidening"];

interface Pin {
  readonly file: string;
  readonly title: string;
  readonly tier: Tier;
}

interface Row {
  readonly row: string;
  readonly section: string;
  readonly quote: string;
  readonly pins: readonly Pin[];
  /** Set exactly when pins is empty: why no landed case binds this sentence today. */
  readonly unpinnedReason?: string;
  /** Pin-flip oracle bead for an unpinned row, when one is in flight. */
  readonly oracle?: string;
  /** Pin-flip probe: a landed case matching this pattern means the row must be pinned. */
  readonly flipProbe?: RegExp;
}

const READER_ADAPTERS = "Reader adapters";
const RELATIONSHIPS = "Relationships are typed and provenanced";

const F = {
  claudeTopology: "test/workbench-claude-topology.test.ts",
  furnaceTopology: "test/workbench-furnace-topology.test.ts",
  forgeObserver: "test/workbench-forge-observer.test.ts",
  hyperunixObserver: "test/workbench-hyperunix-observer.test.ts",
  reactivefiberObserver: "test/workbench-reactivefiber-observer.test.ts",
  beadsObserver: "test/workbench-beads-observer.test.ts",
  detachedObserver: "test/workbench-detached-observer.test.ts",
  claudeObserver: "test/workbench-claude-observer.test.ts",
  furnaceObserver: "test/workbench-furnace-observer.test.ts",
  projectionInvalidation: "test/workbench-projection-invalidation.test.ts",
  observation: "test/workbench-observation.test.ts",
  recoveryReceipt: "test/workbench-observation-recovery-receipt.test.ts",
  topologySlice: "test/workbench-topology-slice.test.ts",
  control: "test/workbench-control.test.ts",
} as const;

function gate(file: string, title: string): Pin {
  return { file, title, tier: "default-gate" };
}

const R1_CLAUDE = "A1: one sample with a session, a message reference and two tools projects agent-call, session and two tool-use snapshots";
const R1_FURNACE = "A1/A2: Run snapshot first, one Attempt snapshot per returned item, one furnace-confirmed ownership edge each";
const R1_FORGE = "projects the fixture provider output of registerForgeGateStatus exactly like its source";
const R1_HX = "projects what registerHyperUnixFind returns for the measured incomplete read: partial, coverage evidence, no bodies";
const R1_RF = "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference";
const R1_BEADS = "snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented";
const R1_DETACHED = "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference";
const POLL_BUDGET = "rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream";
const IDLE_CANCEL = "closing cancels an idle polling wait without native control, and abort signal refuses an initial read";
const RULE_6 = "rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights";

const ROWS: readonly Row[] = [
  {
    row: "RA1",
    section: READER_ADAPTERS,
    quote: "Every supported provider offers at least a read-current-snapshot function where its SDK supports it.",
    pins: [
      gate(F.claudeTopology, R1_CLAUDE),
      gate(F.furnaceTopology, R1_FURNACE),
      gate(F.forgeObserver, R1_FORGE),
      gate(F.hyperunixObserver, R1_HX),
      gate(F.reactivefiberObserver, R1_RF),
      gate(F.beadsObserver, R1_BEADS),
      gate(F.detachedObserver, R1_DETACHED),
    ],
  },
  {
    row: "RA2",
    section: READER_ADAPTERS,
    quote: "Claude: SDK message events from sessions controlled by Workbench; external Claude sessions may be unobservable unless records are available.",
    pins: [
      gate(F.claudeTopology, "A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure"),
      gate(F.claudeObserver, "parallel calls retain independent native session identity and permission evidence"),
    ],
  },
  {
    row: "RA3",
    section: READER_ADAPTERS,
    quote: "Furnace: native Run status/event stream and possible descendant references.",
    pins: [
      gate(F.furnaceTopology, "A3: a partial Attempt page yields edges only for returned items and synthesizes nothing for the missing tail"),
      gate(F.furnaceObserver, POLL_BUDGET),
    ],
  },
  {
    row: "RA4",
    section: READER_ADAPTERS,
    quote: "Forge: native operation/verdict/artifact evidence, build revision and gate axes.",
    pins: [
      gate(F.forgeObserver, "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
      gate(F.projectionInvalidation, "carries forge-operation evidence refs onto ObservedNode and keeps the 32-reference cap"),
    ],
  },
  {
    row: "RA5",
    section: READER_ADAPTERS,
    quote: "HX: query coverage/bounds/query basis, and optional graph traversal of linked native refs.",
    pins: [
      gate(F.hyperunixObserver, "H1: the measured incomplete read projects exactly one partial, unknown-toned query snapshot that refreshes a projection"),
      gate(F.hyperunixObserver, "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
    ],
  },
  {
    row: "RA6",
    section: READER_ADAPTERS,
    quote: "RF: render context provenance and context artifact references.",
    pins: [
      gate(F.reactivefiberObserver, R1_RF),
      gate(F.reactivefiberObserver, "R6: output text, diagnostics and budget payloads never appear in any surfaced string"),
    ],
  },
  {
    row: "RA7",
    section: READER_ADAPTERS,
    quote: "MechanicalWorkflows: invocation outcome, service spans if instrumented; arbitrary plain TypeScript calls are not magically discoverable.",
    pins: [],
    unpinnedReason: "no landed case asserts that arbitrary plain TypeScript calls are not discoverable as MechanicalWorkflows; the sentence is a non-capability statement with no executable oracle yet",
    flipProbe: /magically discoverable|not discoverable as mechanical/i,
  },
  {
    row: "RA8",
    section: READER_ADAPTERS,
    quote: "Beads: supported work readiness and linkage, never reconstructed from heuristics alone.",
    pins: [
      gate(F.beadsObserver, "C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge"),
      gate(F.beadsObserver, "a dependency id outside the bd id shape is unavailable, never a borrowed node key"),
    ],
  },
  {
    row: "RA9",
    section: READER_ADAPTERS,
    quote: "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef} and optional change stream with cursor.",
    pins: [
      gate(F.detachedObserver, R1_DETACHED),
      gate(F.reactivefiberObserver, R1_RF),
      gate(F.hyperunixObserver, "H5: tolerates unknown producer fields and never copies them into any output field"),
    ],
  },
  {
    row: "RA10",
    section: READER_ADAPTERS,
    quote: "Poll only where streaming unsupported, with explicit rate/budget.",
    pins: [gate(F.furnaceObserver, POLL_BUDGET), gate(F.furnaceObserver, IDLE_CANCEL)],
  },
  {
    row: "RA11",
    section: READER_ADAPTERS,
    quote: "Handle stream reconnect and cursor gaps as stale/unknown until refreshed.",
    pins: [
      gate(F.observation, "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
      gate(F.observation, "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
      gate(F.observation, "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history"),
      gate(F.recoveryReceipt, "catches an evicted cursor reported as a complete resume"),
    ],
  },
  {
    row: "RL1",
    section: RELATIONSHIPS,
    quote:
      "declared dependency (from source/policy) - observed causal edge (tool call to native result) - lifecycle ownership (only if native producer confirms) - grouping only (phase, display scope) - inferred possible relationship (hypothesis; never treated as authoritative)",
    pins: [
      gate(F.topologySlice, "separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis"),
      gate(F.topologySlice, "does not present ownership without a native confirmation from the owning provider as lifecycle ownership"),
      gate(F.topologySlice, "states a hypothesis-only focus as an incomplete trace, not as an authoritative neighborhood"),
      gate(F.observation, "uses provider-qualified native keys, preserves native failure and does not infer ownership"),
      gate(F.control, RULE_6),
    ],
  },
  {
    row: "RL2",
    section: RELATIONSHIPS,
    quote: "Store edge provenance with timestamp and source;",
    pins: [
      gate(F.observation, "updates all semantic indexes when a node changes and keeps edges typed, explicit, provenance-bearing"),
      gate(F.topologySlice, "lists upstream and downstream neighbors of the focus, each edge carrying class, timestamp and source"),
      gate(F.topologySlice, "reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields"),
    ],
  },
  {
    row: "RL3",
    section: RELATIONSHIPS,
    quote: "Graph view styles each differently.",
    pins: [],
    unpinnedReason: "graph-view rendering of the five relation classes has no landed case; it lands with wb-6ze.34",
    oracle: "wb-6ze.34",
    flipProbe: /graph view styles|styles each (relation|class|edge)/i,
  },
  {
    row: "RL4",
    section: RELATIONSHIPS,
    quote: "Missing edges do not imply independence.",
    pins: [
      gate(F.topologySlice, "returns empty slices labeled incomplete-trace for a node with no observed relations"),
      gate(F.topologySlice, "lets a hypothesis collapse into the remainder before any authoritative edge when a cap bites"),
    ],
  },
  {
    row: "RL5",
    section: RELATIONSHIPS,
    quote: "Shared nodes may have multiple causal readers without one cancellation owner.",
    pins: [
      gate(F.observation, "returns a child once when multiple proven relationship types share it, without false truncation"),
      gate(F.furnaceObserver, IDLE_CANCEL),
      gate(F.control, RULE_6),
    ],
  },
];

const EXPECTED_ROW_IDS: readonly string[] = [
  "RA1", "RA2", "RA3", "RA4", "RA5", "RA6", "RA7", "RA8", "RA9", "RA10", "RA11",
  "RL1", "RL2", "RL3", "RL4", "RL5",
];
const EXPECTED_UNPINNED: readonly string[] = ["RA7", "RL3"];

type ReadFile = (path: string) => string;

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Collapse bullet markers and whitespace so a list reads as one quoted run. */
function normalizeDocs(text: string): string {
  return normalizeWhitespace(text.replace(/^\s*-\s+/gm, "- ")).replace(/\) - /g, ") - ");
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sectionBody(docs: string, heading: string): string | undefined {
  const marker = `## ${heading}\n`;
  const start = docs.indexOf(marker);
  if (start < 0) return undefined;
  const bodyStart = start + marker.length;
  const next = docs.indexOf("\n## ", bodyStart);
  return docs.slice(bodyStart, next < 0 ? undefined : next);
}

type CaseState = "live" | "disabled" | "missing";

/** Find a verbatim title inside an it(/test( call (any quote style) and classify it. */
function caseState(source: string, title: string): CaseState {
  const quoted = `(["'\`])${escapeRegExp(title)}\\1`;
  const disabled = new RegExp(`(?:^|[^\\w.])(?:it|test)\\.(?:skip|todo|fails|skipIf\\([^)]*\\)|fails)\\(\\s*${quoted}`, "m");
  if (disabled.test(source)) return "disabled";
  const live = new RegExp(`(?:^|[^\\w.])(?:it|test)\\(\\s*${quoted}`, "m");
  return live.test(source) ? "live" : "missing";
}

function excludedFiles(vitestConfig: string): readonly string[] {
  const match = /exclude:\s*\[([^\]]*)\]/.exec(vitestConfig);
  if (!match) return [];
  return [...(match[1] ?? "").matchAll(/"([^"]+)"/g)].map((entry) => entry[1] ?? "");
}

function readOrUndefined(read: ReadFile, path: string): string | undefined {
  try {
    return read(path);
  } catch {
    return undefined;
  }
}

function censusViolations(rows: readonly Row[], read: ReadFile, testFiles: readonly string[]): readonly string[] {
  const violations: string[] = [];
  const docs = normalizeDocs(read(DOCS_09));
  const excluded = excludedFiles(read(VITEST_CONFIG));
  const ids = rows.map((entry) => entry.row);
  if (ids.length !== EXPECTED_ROW_IDS.length || ids.some((id, index) => id !== EXPECTED_ROW_IDS[index])) {
    violations.push(`row set: expected ${EXPECTED_ROW_IDS.join(",")} but found ${ids.join(",")}`);
  }
  for (const entry of rows) {
    const body = sectionBody(read(DOCS_09), entry.section);
    if (body === undefined) {
      violations.push(`${entry.row}: docs/09 section "${entry.section}" not found`);
    } else if (!normalizeDocs(body).includes(entry.quote)) {
      violations.push(`${entry.row}: quote not found verbatim in docs/09 "${entry.section}": ${entry.quote}`);
    }
    if (!docs.includes(entry.quote)) violations.push(`${entry.row}: quote not found anywhere in docs/09`);
    if (entry.pins.length === 0) {
      if (!entry.unpinnedReason || entry.unpinnedReason.trim().length === 0) {
        violations.push(`${entry.row}: unpinned row carries no reason`);
      }
      if (entry.flipProbe) {
        const hit = testFiles.find((file) => file !== SELF && entry.flipProbe?.test(readOrUndefined(read, file) ?? ""));
        if (hit) violations.push(`${entry.row}: a landed case now matches (${hit}); pin it and drop the unpinned reason`);
      }
      continue;
    }
    if (entry.unpinnedReason) violations.push(`${entry.row}: pinned row must not carry an unpinned reason`);
    for (const pin of entry.pins) {
      if (!TIERS.includes(pin.tier)) violations.push(`${entry.row}: unknown tier ${pin.tier}`);
      const source = readOrUndefined(read, pin.file);
      if (source === undefined) {
        violations.push(`${entry.row}: pinned file missing ${pin.file}`);
        continue;
      }
      const state = caseState(source, pin.title);
      if (state === "missing") violations.push(`${entry.row}: pinned title not found in ${pin.file}: ${pin.title}`);
      if (state === "disabled") violations.push(`${entry.row}: pinned case is skipped/todo/fails in ${pin.file}: ${pin.title}`);
      const isExcluded = excluded.includes(pin.file);
      if (pin.tier === "default-gate" && isExcluded) violations.push(`${entry.row}: default-gate pin is excluded from vitest.config.ts: ${pin.file}`);
      if (pin.tier === "native-read" && !isExcluded) violations.push(`${entry.row}: native-read pin is not in the vitest.config.ts exclude list: ${pin.file}`);
    }
  }
  const unpinned = rows.filter((entry) => entry.pins.length === 0).map((entry) => entry.row);
  if (unpinned.join(",") !== EXPECTED_UNPINNED.join(",")) {
    violations.push(`unpinned rows: expected ${EXPECTED_UNPINNED.join(",")} but found ${unpinned.join(",")}`);
  }
  return violations;
}

function realRead(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

const TEST_FILES: readonly string[] = readdirSync(join(ROOT, "test"))
  .filter((name) => name.endsWith(".test.ts"))
  .map((name) => `test/${name}`);

function withMutatedFile(path: string, mutate: (text: string) => string): ReadFile {
  return (requested) => {
    const text = realRead(requested);
    return requested === path ? mutate(text) : text;
  };
}

function replaceRow(row: string, change: (entry: Row) => Row): readonly Row[] {
  return ROWS.map((entry) => (entry.row === row ? change(entry) : entry));
}

describe("docs/09 reader-adapters and relationships census (wb-752.15)", () => {
  it("holds the frozen sixteen-row set and binds every pinned row to a live case", () => {
    expect(ROWS.map((entry) => entry.row)).toEqual(EXPECTED_ROW_IDS);
    expect(censusViolations(ROWS, realRead, TEST_FILES)).toEqual([]);
  });

  it("pins only the two rows with no landed case as unpinned, each with a reason", () => {
    const unpinned = ROWS.filter((entry) => entry.pins.length === 0);
    expect(unpinned.map((entry) => entry.row)).toEqual(EXPECTED_UNPINNED);
    for (const entry of unpinned) expect(entry.unpinnedReason?.length ?? 0).toBeGreaterThan(20);
    expect(ROWS.find((entry) => entry.row === "RL3")?.oracle).toBe("wb-6ze.34");
  });

  it("ties every pinned file to the default gate exactly as vitest.config.ts excludes it", () => {
    const excluded = excludedFiles(realRead(VITEST_CONFIG));
    for (const entry of ROWS) {
      for (const pin of entry.pins) expect(excluded.includes(pin.file)).toBe(pin.tier === "native-read");
    }
  });

  it("M1: a pinned title altered by one character goes red naming the row and file", () => {
    const mutated = withMutatedFile(F.topologySlice, (text) =>
      text.replace("states a hypothesis-only focus as an incomplete trace", "states a hypothesis-only focus as an incomplete trace."),
    );
    const violations = censusViolations(ROWS, mutated, TEST_FILES);
    expect(violations.some((line) => line.startsWith("RL1:") && line.includes(F.topologySlice))).toBe(true);
  });

  it("M1b: a deleted, skipped, todo or failing pinned case goes red", () => {
    const title = "returns empty slices labeled incomplete-trace for a node with no observed relations";
    const skipped = withMutatedFile(F.topologySlice, (text) => text.replace(/\bit\((\s*)(["'`])returns empty slices/, "it.skip($1$2returns empty slices"));
    const skippedViolations = censusViolations(ROWS, skipped, TEST_FILES);
    expect(skippedViolations.some((line) => line.startsWith("RL4:") && line.includes("skipped"))).toBe(true);
    const todo = withMutatedFile(F.topologySlice, (text) => text.replace(/\bit\((\s*)(["'`])returns empty slices/, "it.todo($1$2returns empty slices"));
    expect(censusViolations(ROWS, todo, TEST_FILES).some((line) => line.startsWith("RL4:") && line.includes("skipped"))).toBe(true);
    const failing = withMutatedFile(F.topologySlice, (text) => text.replace(/\bit\((\s*)(["'`])returns empty slices/, "it.fails($1$2returns empty slices"));
    expect(censusViolations(ROWS, failing, TEST_FILES).some((line) => line.startsWith("RL4:") && line.includes("skipped"))).toBe(true);
    const deleted = withMutatedFile(F.topologySlice, (text) => text.split(title).join("a different title"));
    expect(censusViolations(ROWS, deleted, TEST_FILES).some((line) => line.startsWith("RL4:") && line.includes("not found"))).toBe(true);
  });

  it("M1c: a pinned title that only appears outside an it( or test( call is not a live case", () => {
    const title = "catches an evicted cursor reported as a complete resume";
    const commentOnly = withMutatedFile(F.recoveryReceipt, (text) => `// ${title}\n${text.split(title).join("renamed away")}`);
    expect(censusViolations(ROWS, commentOnly, TEST_FILES).some((line) => line.startsWith("RA11:"))).toBe(true);
  });

  it("M2: a removed row fails the row-set pin", () => {
    const violations = censusViolations(
      ROWS.filter((entry) => entry.row !== "RL4"),
      realRead,
      TEST_FILES,
    );
    expect(violations.some((line) => line.startsWith("row set:"))).toBe(true);
  });

  it("M3: an unpinned row silently promoted without a title fails", () => {
    const promoted = replaceRow("RA7", (entry) => ({ ...entry, pins: [{ file: F.observation, title: "no such case exists anywhere", tier: "default-gate" }], unpinnedReason: undefined }));
    const violations = censusViolations(promoted, realRead, TEST_FILES);
    expect(violations.some((line) => line.startsWith("RA7:") && line.includes("not found"))).toBe(true);
    expect(violations.some((line) => line.startsWith("unpinned rows:"))).toBe(true);
    const reasonless = replaceRow("RL3", (entry) => ({ ...entry, unpinnedReason: "" }));
    expect(censusViolations(reasonless, realRead, TEST_FILES).some((line) => line.startsWith("RL3:") && line.includes("no reason"))).toBe(true);
  });

  it("M4: a docs/09 quote edited in place goes red naming the row", () => {
    const edited = withMutatedFile(DOCS_09, (text) => text.replace("Missing edges do not imply independence.", "Missing edges imply independence."));
    expect(censusViolations(ROWS, edited, TEST_FILES).some((line) => line.startsWith("RL4:") && line.includes("quote not found"))).toBe(true);
    const moved = withMutatedFile(DOCS_09, (text) => text.replace("## Relationships are typed and provenanced", "## Relationships"));
    expect(censusViolations(ROWS, moved, TEST_FILES).some((line) => line.startsWith("RL1:") && line.includes("not found"))).toBe(true);
  });

  it("M5: a pin-flip probe hit means the unpinned row must now be pinned", () => {
    const probeFile = "test/workbench-fake-landed-case.test.ts";
    const read: ReadFile = (path) => (path === probeFile ? "it('graph view styles each relation class', () => {});" : realRead(path));
    const violations = censusViolations(ROWS, read, [...TEST_FILES, probeFile]);
    expect(violations.some((line) => line.startsWith("RL3:") && line.includes(probeFile))).toBe(true);
  });

  it("M6: a tier that disagrees with the vitest.config.ts exclude list goes red", () => {
    const flipped = replaceRow("RA10", (entry) => ({ ...entry, pins: entry.pins.map((pin) => ({ ...pin, tier: "native-read" as const })) }));
    expect(censusViolations(flipped, realRead, TEST_FILES).some((line) => line.startsWith("RA10:") && line.includes("native-read"))).toBe(true);
  });
});
