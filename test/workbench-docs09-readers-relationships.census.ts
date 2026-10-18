/**
 * wb-752.15 (W13/W14): census falsifier for docs/workbench/09-observation-and-provenance.md "Reader adapters" and
 * "Relationships are typed and provenanced", a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It replaces the earlier default-tier census (68f1355 / 447dd09),
 * which carried a scanner of its own; this leg carries none.
 *
 * What this leg proves, and through which instrument:
 * - PINNED CASES: judge() from the shared helper test/helpers/census.ts reads vitest's own JSON report of the default
 *   gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs) and executes nothing.
 *   A pin counts only when that run collected the case exactly once (under its bound describe path where the row binds
 *   one), recorded it passed, and its body asserts - the helper's three legs, fail-closed, as far as its
 *   resolvable-construct roster and named residuals reach (receipts/wb-u62.md). The skip, hollow-out, runtime-skip,
 *   shadowed-expect, setupFiles and testNamePattern shapes (the S-series and X-series) are the helper's own falsifier
 *   suite (test/workbench-census-helper.test.ts); this leg adds no scanner and does not claim to re-prove them.
 * - TIER TRUTH: each row is labelled "default-gate"; judge() refuses a pin of any other tier (tier-mismatch) and reports
 *   a file the default config does not run as not-collected (a brace-glob or exclusion misreading is a tier cause, never
 *   a missing title), so the label is only ever carried by the gate's own report.
 * - UNPINNED HALVES: five clauses have no landed case today. Each is listed WITH a reason and a title probe. The probe is
 *   a REPORTER-VERIFIED title probe: it tests the registered case names the gate's own report holds (fullName), never a
 *   file's text, so a comment, a string or a docs quotation can never move it (the false-red class of the 06:52Z
 *   landing-merge red). A registered case that names the clause turns the half red until it is pinned.
 * - RL3 ("Graph view styles each differently."): wb-6ze.34 landed the graph-view rendering and is the ASSERTED oracle;
 *   the half is pinned to its named cases under its named describe.
 * - DOCS: both sections are read through the helper's rendered view (docsSection / sectionMatches): each heading unique
 *   at level 2 under the level-1 parent, bounded at the next level-1/2 heading or EOF (a ### subsection belongs to it),
 *   and the WHOLE rendered block list equal to the pinned one (the lead-ins "Streaming observer optional:" and "At
 *   minimum differentiate:", every bullet, the closing paragraphs). A per-clause check names the row a dropped or
 *   reworded clause breaks. The docs fixtures below are string-built and independent of the live document.
 * - NON-CLAIMS: a title's presence is never evidence that a case proves the clause; the evidence token each pinned half
 *   carries only shows that a pinned title talks about the clause. Half RA9/b ("optional change stream with cursor") is
 *   pinned to the observation layer's hot-cursor case because no adapter-side cursor case exists. No text-level focus
 *   focused-case check lives here: allowOnly is false in the tier configs. Mutants of the helper itself belong to wb-u62.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
}

interface PinnedHalf {
  readonly id: string;
  /** The rendered docs text this half covers. */
  readonly clause: string;
  /** A token (case-insensitive) that must occur in at least one pinned title: which pin evidences the clause. */
  readonly token: string;
  readonly pins: readonly Pin[];
}

interface UnpinnedHalf {
  readonly id: string;
  readonly clause: string;
  readonly pins: readonly [];
  /** Why no landed case binds the clause, naming the owning bead. */
  readonly reason: string;
  /** A registered case name matching this pattern means the half must now be pinned. */
  readonly titleProbe: RegExp;
  /** A case title the probe must match: the liveness of the probe itself. */
  readonly probeSample: string;
}

type Half = PinnedHalf | UnpinnedHalf;

interface Row {
  readonly id: string;
  readonly section: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs09-readers-relationships.census.ts";
const DOCS_FILE = "docs/workbench/09-observation-and-provenance.md";
const DOCS_PARENT = "09 — Observation, telemetry, provenance and derived graph";
const READERS = "Reader adapters";
const RELATIONS = "Relationships are typed and provenanced";

const CLAUDE_TOPOLOGY = "test/workbench-claude-topology.test.ts";
const FURNACE_TOPOLOGY = "test/workbench-furnace-topology.test.ts";
const FORGE_OBSERVER = "test/workbench-forge-observer.test.ts";
const HYPERUNIX_OBSERVER = "test/workbench-hyperunix-observer.test.ts";
const REACTIVEFIBER_OBSERVER = "test/workbench-reactivefiber-observer.test.ts";
const BEADS_OBSERVER = "test/workbench-beads-observer.test.ts";
const DETACHED_OBSERVER = "test/workbench-detached-observer.test.ts";
const CLAUDE_OBSERVER = "test/workbench-claude-observer.test.ts";
const FURNACE_OBSERVER = "test/workbench-furnace-observer.test.ts";
const PROJECTION_INVALIDATION = "test/workbench-projection-invalidation.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const RECOVERY_RECEIPT = "test/workbench-observation-recovery-receipt.test.ts";
const TOPOLOGY_SLICE = "test/workbench-topology-slice.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const INSPECTOR = "test/workbench-inspector.test.ts";

/** The wb-6ze.34 describe: the graph view drawing the graph-view model (the RL3 oracle's named suite). */
const GRAPH_VIEW_SUITE = "W15-B6 graph view draws the graph-view model (wb-6ze.34)";

const pin = (file: string, title: string): Pin => ({ file, title });
const pinned = (id: string, clause: string, token: string, pins: readonly Pin[]): PinnedHalf => ({ id, clause, token, pins });
const unpinned = (id: string, clause: string, reason: string, titleProbe: RegExp, probeSample: string): UnpinnedHalf => ({ id, clause, pins: [], reason, titleProbe, probeSample });

const CLAUDE_A1 = pin(CLAUDE_TOPOLOGY, "A1: one sample with a session, a message reference and two tools projects agent-call, session and two tool-use snapshots");
const FURNACE_A1 = pin(FURNACE_TOPOLOGY, "A1/A2: Run snapshot first, one Attempt snapshot per returned item, one furnace-confirmed ownership edge each");
const FORGE_PROJECTS = pin(FORGE_OBSERVER, "projects the fixture provider output of registerForgeGateStatus exactly like its source");
const HX_PROJECTS = pin(HYPERUNIX_OBSERVER, "projects what registerHyperUnixFind returns for the measured incomplete read: partial, coverage evidence, no bodies");
const RF_R1 = pin(REACTIVEFIBER_OBSERVER, "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference");
const BEADS_SNAPSHOT = pin(BEADS_OBSERVER, "snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented");
const DETACHED_SHAPE = pin(DETACHED_OBSERVER, "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference");
const POLL_BUDGET = pin(FURNACE_OBSERVER, "rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream");
const IDLE_CANCEL = pin(FURNACE_OBSERVER, "closing cancels an idle polling wait without native control, and abort signal refuses an initial read");
const RULE_6 = pin(CONTROL, "rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights");
const SLICE_SEPARATES = pin(TOPOLOGY_SLICE, "separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis");
const HOT_CURSOR = pin(OBSERVATION, "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history");
const GRAPH_AC1: Pin = {
  file: INSPECTOR,
  title: "AC1 draws counted aggregates before node rows, each edge with a direction glyph, its class and [source], and both references as reference rows",
  suite: [GRAPH_VIEW_SUITE],
};
const GRAPH_AC2: Pin = {
  file: INSPECTOR,
  title: "AC2 a declared edge to a never-observed endpoint is a declared dependency marked unobserved endpoint, never unknown-dynamic",
  suite: [GRAPH_VIEW_SUITE],
};

const NO_PRODUCER_CASE = "no landed case evidences this clause and no producer bead for it is on file at the 2026-10-18 base, so the census owner wb-752.15 holds the slot until one is filed: ";

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

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    id: "RA1",
    section: READERS,
    halves: [
      pinned("a", "Every supported provider offers at least a read-current-snapshot function where its SDK supports it.", "snapshot", [CLAUDE_A1, FURNACE_A1, FORGE_PROJECTS, HX_PROJECTS, RF_R1, BEADS_SNAPSHOT, DETACHED_SHAPE]),
    ],
  },
  {
    id: "RA2",
    section: READERS,
    halves: [
      pinned("a", "SDK message events from sessions controlled by Workbench", "session", [CLAUDE_A1, pin(CLAUDE_OBSERVER, "parallel calls retain independent native session identity and permission evidence")]),
      unpinned(
        "b",
        "external Claude sessions may be unobservable unless records are available",
        `${NO_PRODUCER_CASE}no registered case speaks of external, unrecorded Claude sessions being unobservable.`,
        /external (claude )?sessions?|unobservable/iu,
        "an external Claude session is unobservable without records",
      ),
    ],
  },
  {
    id: "RA3",
    section: READERS,
    halves: [
      pinned("a", "native Run status/event stream", "Run", [FURNACE_A1, POLL_BUDGET]),
      pinned("b", "possible descendant references", "Attempt", [pin(FURNACE_TOPOLOGY, "A3: a partial Attempt page yields edges only for returned items and synthesizes nothing for the missing tail")]),
    ],
  },
  {
    id: "RA4",
    section: READERS,
    halves: [
      pinned("a", "native operation/verdict/artifact evidence", "evidence", [
        pin(FORGE_OBSERVER, "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
        pin(PROJECTION_INVALIDATION, "carries forge-operation evidence refs onto ObservedNode and keeps the 32-reference cap"),
      ]),
      unpinned(
        "b",
        "build revision and gate axes",
        `${NO_PRODUCER_CASE}the forge cases pinned above speak of verdict, evidence and projection, not of a build revision or per-axis gate state.`,
        /build revision|gate axes/iu,
        "projects the forge build revision and the gate axes",
      ),
    ],
  },
  {
    id: "RA5",
    section: READERS,
    halves: [
      pinned("a", "query coverage/bounds/query basis", "query", [
        pin(HYPERUNIX_OBSERVER, "H1: the measured incomplete read projects exactly one partial, unknown-toned query snapshot that refreshes a projection"),
        pin(HYPERUNIX_OBSERVER, "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
      ]),
      unpinned(
        "b",
        "optional graph traversal of linked native refs",
        `${NO_PRODUCER_CASE}the HX cases pin the query snapshot only; no case follows linked native refs.`,
        /graph traversal|linked native ref/iu,
        "follows a graph traversal of linked native refs",
      ),
    ],
  },
  {
    id: "RA6",
    section: READERS,
    halves: [pinned("a", "render context provenance and context artifact references", "payload reference", [RF_R1, pin(REACTIVEFIBER_OBSERVER, "R6: output text, diagnostics and budget payloads never appear in any surfaced string")])],
  },
  {
    id: "RA7",
    section: READERS,
    halves: [
      unpinned(
        "a",
        "invocation outcome, service spans if instrumented",
        "no landed default-gate case projects a MechanicalWorkflows invocation outcome or service span; the MechanicalWorkflows binding host is wb-04s under the native-composition epic wb-w12 and both are still blocked.",
        /invocation outcome|service spans?/iu,
        "projects the invocation outcome and the service span",
      ),
      unpinned(
        "b",
        "arbitrary plain TypeScript calls are not magically discoverable",
        "no landed case asserts that arbitrary plain TypeScript calls are not discoverable as MechanicalWorkflows; the sentence is a non-capability statement with no executable oracle until the binding host wb-04s lands.",
        /magically discoverable|not discoverable|undiscoverable/iu,
        "plain TypeScript calls are not magically discoverable",
      ),
    ],
  },
  {
    id: "RA8",
    section: READERS,
    halves: [
      pinned("a", "supported work readiness and linkage", "dependency", [pin(BEADS_OBSERVER, "a dependency id outside the bd id shape is unavailable, never a borrowed node key"), BEADS_SNAPSHOT]),
      pinned("b", "never reconstructed from heuristics alone", "minted", [pin(BEADS_OBSERVER, "C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge")]),
    ],
  },
  {
    id: "RA9",
    section: READERS,
    halves: [
      pinned("a", "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef}", "capturedAt", [
        DETACHED_SHAPE,
        RF_R1,
        pin(HYPERUNIX_OBSERVER, "H5: tolerates unknown producer fields and never copies them into any output field"),
      ]),
      pinned("b", "optional change stream with cursor", "cursor", [HOT_CURSOR]),
    ],
  },
  {
    id: "RA10",
    section: READERS,
    halves: [pinned("a", "Poll only where streaming unsupported, with explicit rate/budget.", "polling", [POLL_BUDGET, IDLE_CANCEL])],
  },
  {
    id: "RA11",
    section: READERS,
    halves: [
      pinned("a", "Handle stream reconnect and cursor gaps as stale/unknown until refreshed.", "gap", [
        pin(OBSERVATION, "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
        pin(OBSERVATION, "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
        HOT_CURSOR,
        pin(RECOVERY_RECEIPT, "catches an evicted cursor reported as a complete resume"),
      ]),
    ],
  },
  {
    id: "RL1",
    section: RELATIONS,
    halves: [
      pinned("a", "declared dependency (from source/policy)", "declared dependency", [SLICE_SEPARATES]),
      pinned("b", "observed causal edge (tool call to native result)", "observed causal", [SLICE_SEPARATES]),
      pinned("c", "lifecycle ownership (only if native producer confirms)", "ownership", [
        pin(TOPOLOGY_SLICE, "does not present ownership without a native confirmation from the owning provider as lifecycle ownership"),
        pin(OBSERVATION, "uses provider-qualified native keys, preserves native failure and does not infer ownership"),
        RULE_6,
      ]),
      pinned("d", "grouping only (phase, display scope)", "grouping", [SLICE_SEPARATES, RULE_6]),
      pinned("e", "inferred possible relationship (hypothesis; never treated as authoritative)", "hypothesis", [
        pin(TOPOLOGY_SLICE, "states a hypothesis-only focus as an incomplete trace, not as an authoritative neighborhood"),
        SLICE_SEPARATES,
      ]),
    ],
  },
  {
    id: "RL2",
    section: RELATIONS,
    halves: [
      pinned("a", "Store edge provenance with timestamp and source", "provenance", [
        pin(OBSERVATION, "updates all semantic indexes when a node changes and keeps edges typed, explicit, provenance-bearing"),
        pin(TOPOLOGY_SLICE, "lists upstream and downstream neighbors of the focus, each edge carrying class, timestamp and source"),
        pin(TOPOLOGY_SLICE, "reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields"),
      ]),
    ],
  },
  {
    id: "RL3",
    section: RELATIONS,
    halves: [pinned("a", "Graph view styles each differently.", "class", [GRAPH_AC1, GRAPH_AC2])],
  },
  {
    id: "RL4",
    section: RELATIONS,
    halves: [
      pinned("a", "Missing edges do not imply independence.", "incomplete-trace", [
        pin(TOPOLOGY_SLICE, "returns empty slices labeled incomplete-trace for a node with no observed relations"),
        pin(TOPOLOGY_SLICE, "lets a hypothesis collapse into the remainder before any authoritative edge when a cap bites"),
      ]),
    ],
  },
  {
    id: "RL5",
    section: RELATIONS,
    halves: [
      pinned("a", "Shared nodes may have multiple causal readers", "multiple proven relationship types", [pin(OBSERVATION, "returns a child once when multiple proven relationship types share it, without false truncation")]),
      pinned("b", "without one cancellation owner", "owner", [RULE_6]),
    ],
  },
]);

const EXPECTED_ROW_IDS: readonly string[] = ["RA1", "RA2", "RA3", "RA4", "RA5", "RA6", "RA7", "RA8", "RA9", "RA10", "RA11", "RL1", "RL2", "RL3", "RL4", "RL5"];
const EXPECTED_UNPINNED: readonly string[] = ["RA2/b", "RA4/b", "RA5/b", "RA7/a", "RA7/b"];
const DISTINCT_PINS = 36;

const isPinned = (half: Half): half is PinnedHalf => half.pins.length > 0 && "token" in half;
const isUnpinned = (half: Half): half is UnpinnedHalf => "titleProbe" in half;
const halfKey = (row: Row, half: Half): string => `${row.id}/${half.id}`;
const PINNED_HALVES = ROWS.flatMap(row => row.halves.filter(isPinned).map(half => ({ row, half })));
const UNPINNED_HALVES = ROWS.flatMap(row => row.halves.filter(isUnpinned).map(half => ({ row, half })));
const ALL_PINS: readonly Pin[] = PINNED_HALVES.flatMap(({ half }) => half.pins);

const pinKey = (entry: Pin): string => `${entry.file}\u0000${(entry.suite ?? []).join("\u0001")}\u0000${entry.title}`;
const casePin = (entry: Pin, tier: string = DEFAULT_GATE_TIER): CasePin => ({ file: entry.file, title: entry.title, tier, ...(entry.suite === undefined ? {} : { suite: entry.suite }) });

/** One line per pin that is not ok, naming the row and half; the helper's why names the file, title, tier and cause. */
function failures(label: string, verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok).map(verdict => `${label}: ${verdict.code}: ${verdict.why}`);
}

// ---- docs: the pinned rendered block lists, written by hand, independent of the live document ----

const paragraph = (text: string): RenderedBlock => ({ kind: "paragraph", text, markdown: text });
const list = (items: readonly string[]): RenderedBlock => ({ kind: "list", ordered: false, items: items.map(text => ({ text, markdown: text })) });

const READERS_LEAD = "Every supported provider offers at least a read-current-snapshot function where its SDK supports it. Streaming observer optional:";
const READERS_BULLETS: readonly string[] = [
  "Claude: SDK message events from sessions controlled by Workbench; external Claude sessions may be unobservable unless records are available.",
  "Furnace: native Run status/event stream and possible descendant references.",
  "Forge: native operation/verdict/artifact evidence, build revision and gate axes.",
  "HX: query coverage/bounds/query basis, and optional graph traversal of linked native refs.",
  "RF: render context provenance and context artifact references.",
  "MechanicalWorkflows: invocation outcome, service spans if instrumented; arbitrary plain TypeScript calls are not magically discoverable.",
  "Beads: supported work readiness and linkage, never reconstructed from heuristics alone.",
];
const READERS_CLOSE =
  "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef} and optional change stream with cursor. Poll only where streaming unsupported, with explicit rate/budget. Handle stream reconnect and cursor gaps as stale/unknown until refreshed.";
const RELATIONS_LEAD = "At minimum differentiate:";
const RELATIONS_BULLETS: readonly string[] = [
  "declared dependency (from source/policy)",
  "observed causal edge (tool call to native result)",
  "lifecycle ownership (only if native producer confirms)",
  "grouping only (phase, display scope)",
  "inferred possible relationship (hypothesis; never treated as authoritative)",
];
const RELATIONS_CLOSE = "Store edge provenance with timestamp and source; Graph view styles each differently. Missing edges do not imply independence. Shared nodes may have multiple causal readers without one cancellation owner.";

interface DocSection {
  readonly heading: string;
  readonly blocks: readonly RenderedBlock[];
  /** The section's source lines, for the string-built fixtures. */
  readonly source: string;
}

const bulletSource = (lead: string, bullets: readonly string[], close: string): string => `${lead}\n${bullets.map(bullet => `- ${bullet}`).join("\n")}\n\n${close}\n`;

const DOC_SECTIONS: readonly DocSection[] = freezeDeep<readonly DocSection[]>([
  { heading: READERS, blocks: [paragraph(READERS_LEAD), list(READERS_BULLETS), paragraph(READERS_CLOSE)], source: bulletSource(READERS_LEAD, READERS_BULLETS, READERS_CLOSE) },
  { heading: RELATIONS, blocks: [paragraph(RELATIONS_LEAD), list(RELATIONS_BULLETS), paragraph(RELATIONS_CLOSE)], source: bulletSource(RELATIONS_LEAD, RELATIONS_BULLETS, RELATIONS_CLOSE) },
]);

const renderedText = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join("\n") : block.text);

/**
 * Every docs drift in both sections, each naming the row (or the section) it breaks. The per-clause checks read the
 * section's RENDERED text and run independently of the whole-section exactness check, so a dropped or reworded clause
 * names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  for (const section of DOC_SECTIONS) {
    const found = docsSection(markdown, section.heading, 2, [DOCS_PARENT]);
    if (!found.ok) {
      out.push(`${DOCS_FILE} § ${section.heading}: the section is refused: ${found.why}`);
      continue;
    }
    const text = found.blocks.map(renderedText).join("\n");
    for (const row of ROWS.filter(entry => entry.section === section.heading)) {
      for (const half of row.halves) {
        if (!text.includes(half.clause)) out.push(`row ${halfKey(row, half)}: its clause "${half.clause}" no longer renders in ${DOCS_FILE} § ${section.heading}`);
      }
    }
    const exact = sectionMatches(found, section.blocks);
    if (!exact.ok) out.push(`${DOCS_FILE} § ${section.heading} is not exactly its pinned rendered text: ${exact.why}`);
  }
  return out;
}

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const namedRows = (lines: readonly string[]): string[] => lines.flatMap(line => /^row ([^\s:]+)/u.exec(line)?.slice(1, 2) ?? []);

// ---- reporter-verified title probe: registered case names of a report, never a file's text ----

interface ReportAssertion {
  title: string;
  fullName: string;
  ancestorTitles: string[];
  status: string;
  comment?: string;
}
interface ReportModule {
  name: string;
  assertionResults: ReportAssertion[];
}
interface ReportJson {
  testResults: ReportModule[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function isReportJson(value: unknown): value is ReportJson {
  if (!isRecord(value) || !Array.isArray(value.testResults)) return false;
  return value.testResults.every(
    (module: unknown) =>
      isRecord(module) &&
      typeof module.name === "string" &&
      Array.isArray(module.assertionResults) &&
      module.assertionResults.every((entry: unknown) => isRecord(entry) && typeof entry.title === "string" && typeof entry.fullName === "string" && typeof entry.status === "string"),
  );
}

function loadReport(path: string): ReportJson {
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!isReportJson(parsed)) throw new Error(`${path} is not a vitest JSON report`);
  return parsed;
}

/** The registered case names (describe path plus title) a report holds, in report order. */
const registeredNames = (report: ReportJson): string[] => report.testResults.flatMap(module => module.assertionResults.map(entry => entry.fullName));

/** Pin-flip findings: one line per unpinned half whose probe matches a registered case name of the report. */
function flipFindings(report: ReportJson): string[] {
  const names = registeredNames(report);
  return UNPINNED_HALVES.flatMap(({ row, half }) => {
    const hit = names.find(name => half.titleProbe.test(name));
    return hit === undefined ? [] : [`row ${halfKey(row, half)} [pin-flip]: a registered case now names the clause ("${hit}"); pin it instead of listing the half as unpinned`];
  });
}

describe("wb-752.15 docs/workbench/09 § Reader adapters and § Relationships census (report mode)", () => {
  it("AC1: both sections render exactly their pinned block lists, every row's clause verbatim", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the table holds the sixteen rows RA1-RA11 and RL1-RL5, deeply frozen, with the five unpinned halves listed by name", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.id)).toEqual(EXPECTED_ROW_IDS);
    expect(UNPINNED_HALVES.map(({ row, half }) => halfKey(row, half))).toEqual(EXPECTED_UNPINNED);
    expect(new Set(ALL_PINS.map(pinKey)).size).toBe(DISTINCT_PINS);
    for (const row of ROWS) {
      expect(row.halves.length, `row ${row.id} has halves`).toBeGreaterThan(0);
      for (const half of row.halves) {
        const key = halfKey(row, half);
        if (isPinned(half)) {
          expect(half.pins.length, `half ${key}: a pinned half has pins`).toBeGreaterThan(0);
          expect(
            half.pins.some(entry => entry.title.toLowerCase().includes(half.token.toLowerCase())),
            `half ${key}: its evidence token "${half.token}" occurs in no pinned title`,
          ).toBe(true);
        } else if (isUnpinned(half)) {
          expect(half.pins, `half ${key}: an unpinned half carries no pins`).toEqual([]);
          expect(half.reason.trim().length, `half ${key}: an unpinned half needs a reason`).toBeGreaterThan(40);
          expect(half.reason, `half ${key}: the reason names its owner`).toMatch(/wb-[a-z0-9]+/u);
        } else {
          throw new Error(`half ${key} is neither pinned nor unpinned`);
        }
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed, and each probe is live against its own sample", () => {
    for (const { row, half } of UNPINNED_HALVES) {
      expect(half.titleProbe.test(half.probeSample), `half ${halfKey(row, half)}: its title probe matches its own sample`).toBe(true);
    }
    expect(UNPINNED_HALVES.every(({ half }) => half.titleProbe.flags.includes("i"))).toBe(true);
  });

  it.each(PINNED_HALVES.map(({ row, half }) => ({ key: halfKey(row, half), half })))("AC2 $key: every pinned case is collected once, passed and asserting in the default gate's own report", ({ key, half }) => {
    const verdicts = judge(REPORT, half.pins.map(entry => casePin(entry)));
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(`row ${key}`, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.cases)).toEqual(half.pins.map(() => 1));
  });

  it("AC3 (pin-flip): no unpinned half is named by a registered case of the gate's own report", () => {
    expect(registeredNames(loadReport(REPORT)).length).toBeGreaterThan(0);
    expect(flipFindings(loadReport(REPORT))).toEqual([]);
  });

  it("RL3: the half is pinned to wb-6ze.34's named graph-view cases under its named describe, not left unpinned", () => {
    const rl3 = ROWS.find(row => row.id === "RL3")?.halves[0];
    expect(rl3 !== undefined && isPinned(rl3)).toBe(true);
    if (rl3 === undefined || !isPinned(rl3)) return;
    expect(rl3.pins.map(entry => entry.suite)).toEqual([[GRAPH_VIEW_SUITE], [GRAPH_VIEW_SUITE]]);
    expect(GRAPH_VIEW_SUITE).toContain("wb-6ze.34");
    expect(failures("row RL3", judge(REPORT, rl3.pins.map(entry => casePin(entry))))).toEqual([]);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    const pinnedFiles = ALL_PINS.map(entry => entry.file.replace(/^test\//u, "").replace(/\.ts$/u, ""));
    expect(own.imports.filter(entry => pinnedFiles.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-752.15 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const poll = PINNED_HALVES.find(({ row }) => row.id === "RA10")?.half.pins[0];
  const graph = PINNED_HALVES.find(({ row }) => row.id === "RL3")?.half.pins[0];

  it("a renamed pinned title is absent from the report and red, naming the row, the file and the title", () => {
    expect(poll).toBeDefined();
    if (poll === undefined) return;
    const renamed = { ...poll, title: `${poll.title} (renamed)` };
    const verdicts = judge(REPORT, [casePin(renamed)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures("row RA10/a", verdicts);
    expect(line).toContain("row RA10/a");
    expect(line).toContain(poll.file);
    expect(line).toContain(renamed.title);
  });

  it("the RL3 pin binds its describe: the same case under a renamed describe path is absent", () => {
    expect(graph?.suite).toBeDefined();
    if (graph === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...graph, suite: [`${GRAPH_VIEW_SUITE} (renamed)`] })]);
    expect(verdict?.code).toBe("absent");
  });

  it("a file the default config excludes (a native live-tier suite) is never in the default report: not-collected, a tier cause and never a missing title", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-client.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a row relabelled to a tier other than the report's own is refused, never carried from a title's presence", () => {
    expect(poll).toBeDefined();
    if (poll === undefined) return;
    const [verdict] = judge(REPORT, [casePin(poll, "native-read")]);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
    const verdicts = judge(REPORT, ALL_PINS.map(entry => casePin(entry)));
    expect(verdicts.map(verdict => verdict.code)).toEqual(ALL_PINS.map(() => "ok"));
  });
});

describe("wb-752.15 attribution: a mutated report is red for its TRUE cause, on independent fixtures", () => {
  const scratch: string[] = [];
  afterEach(() => {
    removeScratch(...scratch.splice(0));
  });
  const target = PINNED_HALVES.find(({ row }) => row.id === "RA10")?.half.pins[0];

  /** Writes the real report, edited, under a scratch .forge directory and judges the RA10 pin over it (root = this repository). */
  function judgeEdited(edit: (report: ReportJson) => void): PinVerdict | undefined {
    if (target === undefined) return undefined;
    const report = loadReport(REPORT);
    edit(report);
    const dir = makeScratch("census-752-15-");
    scratch.push(dir);
    mkdirSync(join(dir, ".forge"));
    const path = join(dir, ".forge", "vitest-report.json");
    writeFileSync(path, JSON.stringify(report));
    return judge(path, [casePin(target)], { root: ROOT })[0];
  }

  const moduleOf = (report: ReportJson): ReportModule | undefined => report.testResults.find(module => target !== undefined && module.name.endsWith(target.file));
  const caseOf = (report: ReportJson): ReportAssertion | undefined => moduleOf(report)?.assertionResults.find(entry => target !== undefined && entry.title === target.title);

  it("control: the unmutated copy is ok, so every red below is the mutation and not the harness", () => {
    expect(judgeEdited(() => undefined)?.code).toBe("ok");
  });

  it("a skipped status reads skipped, never absent", () => {
    expect(
      judgeEdited(report => {
        const entry = caseOf(report);
        if (entry !== undefined) entry.status = "skipped";
      })?.code,
    ).toBe("skipped");
  });

  it("a failed status reads failed, never skipped", () => {
    expect(
      judgeEdited(report => {
        const entry = caseOf(report);
        if (entry !== undefined) entry.status = "failed";
      })?.code,
    ).toBe("failed");
  });

  it("a doubled registration reads duplicated", () => {
    expect(
      judgeEdited(report => {
        const module = moduleOf(report);
        const entry = caseOf(report);
        if (module !== undefined && entry !== undefined) module.assertionResults.push({ ...entry });
      })?.code,
    ).toBe("duplicated");
  });

  it("a deleted case reads absent while its file is still collected", () => {
    expect(
      judgeEdited(report => {
        const module = moduleOf(report);
        if (module !== undefined) module.assertionResults = module.assertionResults.filter(entry => target !== undefined && entry.title !== target.title);
      })?.code,
    ).toBe("absent");
  });

  it("a file missing from the report reads not-collected, never absent", () => {
    expect(
      judgeEdited(report => {
        report.testResults = report.testResults.filter(module => target !== undefined && !module.name.endsWith(target.file));
      })?.code,
    ).toBe("not-collected");
  });

  it("the pin-flip probe reads registered names only: a report that registers a case naming a clause turns the half red, a report whose only mention is outside the case names does not", () => {
    const clean = loadReport(REPORT);
    expect(flipFindings(clean)).toEqual([]);
    const registers = loadReport(REPORT);
    registers.testResults.push({ name: join(ROOT, "test/decoy.test.ts"), assertionResults: [{ title: "projects the forge build revision and the gate axes", fullName: "decoy projects the forge build revision and the gate axes", ancestorTitles: ["decoy"], status: "passed" }] });
    const lines = flipFindings(registers);
    expect(namedRows(lines)).toEqual(["RA4/b"]);
    expect(lines[0]).toContain("[pin-flip]");
    const mentions = loadReport(REPORT);
    mentions.testResults.push({
      name: join(ROOT, "test/decoy.test.ts"),
      assertionResults: [{ title: "an unrelated case", fullName: "decoy an unrelated case", ancestorTitles: ["decoy"], status: "passed", comment: "Graph view styles each differently; build revision and gate axes; magically discoverable" }],
    });
    expect(flipFindings(mentions)).toEqual([]);
  });
});

describe("wb-752.15 docs drift names the row or the section, over string-built fixtures (rendered view, unique level-2 heading, whole-section equality)", () => {
  const [readersSection, relationsSection] = DOC_SECTIONS;
  const readersSource = readersSection?.source ?? "";
  const relationsSource = relationsSection?.source ?? "";
  const build = (parts: { readers?: string; relations?: string; head?: string; tail?: string } = {}): string =>
    `# ${DOCS_PARENT}\n\n${parts.head ?? ""}## Observer mandate\n\nText.\n\n## ${READERS}\n\n${parts.readers ?? readersSource}\n## ${RELATIONS}\n\n${parts.relations ?? relationsSource}\n${parts.tail ?? ""}`;
  const good = build();
  const refused = (lines: readonly string[], heading: string): string | undefined => lines.find(line => line.includes(`§ ${heading}: the section is refused`));

  it("accepts both sections exactly as pinned, bounded by the next level-2 heading and at EOF", () => {
    expect(docsFailures(good)).toEqual([]);
    expect(docsFailures(build({ tail: "\n## Next\n\nOther text.\n" }))).toEqual([]);
  });

  it("names RA10/a (and only it) when its sentence is dropped from the closing paragraph, beside the exactness line", () => {
    const lines = docsFailures(good.replace("Poll only where streaming unsupported, with explicit rate/budget. ", ""));
    expect(namedRows(lines)).toEqual(["RA10/a"]);
    expect(lines.some(line => line.includes("is not exactly its pinned rendered text"))).toBe(true);
  });

  it("names RA7/b (and only it) when the non-discoverability clause is dropped from the MechanicalWorkflows bullet", () => {
    expect(namedRows(docsFailures(good.replace("; arbitrary plain TypeScript calls are not magically discoverable", "")))).toEqual(["RA7/b"]);
  });

  it("names RL4/a (and only it) when its sentence is reworded", () => {
    expect(namedRows(docsFailures(good.replace("Missing edges do not imply independence.", "Missing edges may imply independence.")))).toEqual(["RL4/a"]);
  });

  it("names RL1/c (and only it) when a bullet is reworded", () => {
    expect(namedRows(docsFailures(good.replace("lifecycle ownership (only if native producer confirms)", "lifecycle ownership (when any producer claims it)")))).toEqual(["RL1/c"]);
  });

  it("goes red on the section, naming no row, when a weakening qualifier is appended to a closing paragraph", () => {
    const lines = docsFailures(good.replace("until refreshed.", "until refreshed. Unless the host says otherwise."));
    expect(namedRows(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its pinned rendered text");
  });

  it("goes red when a weakening paragraph is appended inside a section", () => {
    const lines = docsFailures(build({ relations: `${relationsSource}\nA host may ignore these classes.\n` }));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 4 blocks; the census pins 3");
  });

  it("D3 (FOLD-1) goes red when a weakening ### subsection sits inside a section, before a level-2 heading and at EOF", () => {
    const sub = "\n### Exceptions\n\nA host may skip these.\n";
    const inside = docsFailures(build({ readers: `${readersSource}${sub}` }));
    expect(namedRows(inside)).toEqual([]);
    expect(inside).toHaveLength(1);
    const atEof = docsFailures(build({ relations: `${relationsSource}${sub}` }));
    expect(atEof).toHaveLength(1);
  });

  it("D8 a ### heading of the same name is not the pinned level-2 heading: a demoted heading is refused, and a ### copy inside the section is an extra block", () => {
    const demoted = docsFailures(good.replace(`## ${READERS}`, `### ${READERS}`));
    expect(refused(demoted, READERS)).toContain(`has no level-2 heading "${READERS}"`);
    const copy = docsFailures(build({ readers: `${readersSource}\n### ${READERS}\n\nCopy.\n` }));
    expect(copy).toHaveLength(1);
    expect(copy[0]).toContain("is not exactly its pinned rendered text");
  });

  it("D2 goes red on the section when a heading is renamed away, and when it occurs twice", () => {
    expect(refused(docsFailures(good.replace(`## ${RELATIONS}`, "## Edge notes")), RELATIONS)).toBeDefined();
    expect(refused(docsFailures(build({ tail: `\n## ${RELATIONS}\n\nOther.\n` })), RELATIONS)).toContain("occurs 2 times");
  });

  it("D9 goes red when a level-1 heading inserted above re-homes the sections", () => {
    const lines = docsFailures(good.replace("## Observer mandate", "# Appendix\n\n## Observer mandate"));
    expect(refused(lines, READERS)).toContain("parent heading path");
    expect(refused(lines, RELATIONS)).toContain("parent heading path");
  });

  it("D10 names RA11/a when its sentence is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(good.replace("Handle stream reconnect and cursor gaps as stale/unknown until refreshed.", "<!-- Handle stream reconnect and cursor gaps as stale/unknown until refreshed. -->"));
    expect(namedRows(lines)).toEqual(["RA11/a"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("M11 a setext duplicate heading at EOF makes the heading occur twice in the rendered view", () => {
    expect(refused(docsFailures(build({ tail: `\n${READERS}\n---\n\nOther.\n` })), READERS)).toContain("occurs 2 times");
  });

  it("M12 a closing-hash duplicate heading makes the heading occur twice in the rendered view", () => {
    expect(refused(docsFailures(build({ tail: `\n## ${READERS} ##\n\nOther.\n` })), READERS)).toContain("occurs 2 times");
  });

  it("M13 an indented duplicate heading makes the heading occur twice in the rendered view", () => {
    expect(refused(docsFailures(build({ tail: `\n   ## ${READERS}\n\nOther.\n` })), READERS)).toContain("occurs 2 times");
  });

  it("M14 a four-backtick fence that three backticks do not close swallows both sections, so neither renders a heading", () => {
    const lines = docsFailures(build({ head: "````md\n```\n" }));
    expect(refused(lines, READERS)).toContain("has no level-2 heading");
    expect(refused(lines, RELATIONS)).toContain("has no level-2 heading");
  });

  it("M15 a <div> line directly above a heading turns the heading into HTML, so the section is refused", () => {
    const lines = docsFailures(good.replace(`## ${READERS}\n`, `<div>\n## ${READERS}\n`));
    expect(refused(lines, READERS)).toBeDefined();
  });
});
