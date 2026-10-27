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
 * - UNPINNED HALVES: five clauses have no landed case at base 1a36ece (CLAIM_BASE, the trunk this cut merges). Each is
 *   listed WITH a reason and a title probe, and SLOT_ROUTING records who holds its pin flip as the bead store read at
 *   that sha: an open producer (RA4/b wb-5uh and wb-4ap.17, RA5/b wb-4ap.13) or a blocked one (RA7/a,b wb-04s, wb-w12),
 *   whose lander pins the half in the same commit, or, where the store holds no producer (RA2/b), the census owner
 *   wb-752.15. A closed bead whose acceptance quoted a clause without landing a case that evidences it is named as such
 *   (RA2/b wb-6ze.3, RA5/b wb-6ze.7). Every claim is dated by that sha, never by a day. The probe is a REPORTER-VERIFIED
 *   title probe: it tests the registered case names the gate's own report holds (fullName), never a file's text, so a
 *   comment, a string or a docs quotation can never move it (the false-red class of the 06:52Z landing-merge red). A
 *   registered case that names the clause turns the half red until it is pinned. The RA5/b and RA4/b probes carry their
 *   producers' wording (typed directional refs, related-to, a bounded or HX-scoped neighborhood, ancestry or traversal;
 *   verdict axes, gated_commit); the bare kind verbs (produces, consumes, depends, blocks, verifies), a bare
 *   neighborhood, a path traversal and a relation kind stay out, because registered names at that sha already carry
 *   them and would flip the half falsely.
 * - RECORD HONESTY (gate cmd_e7d15ee63790 U1): each unpinned reason is checked against SLOT_ROUTING: it names the base
 *   sha and no calendar day, names every producer with the landing-order duty, claims that no producer is on file only
 *   where none is, and names each closed quoter with its reading. These rows prove the record agrees with itself; that
 *   the record agrees with the bead store is the dated search the delivery note records, re-runnable at that sha. The
 *   store is never read here: it moves, and a text-level read would turn the leg red on any later bead edit.
 * - RL3 ("Graph view styles each differently."): wb-6ze.34 landed the graph-view rendering and is the ASSERTED oracle;
 *   the half is pinned to its named cases under its named describe.
 * - DOCS: both sections are read through the helper's rendered view (docsSection / sectionMatches): each heading unique
 *   at level 2 under the level-1 parent, bounded at the next level-1/2 heading or EOF (a ### subsection belongs to it),
 *   and the WHOLE rendered block list equal to the pinned one (the lead-ins "Streaming observer optional:" and "At
 *   minimum differentiate:", every bullet, the closing paragraphs). A per-clause check names the row a dropped or
 *   reworded clause breaks. The docs fixtures below are string-built and independent of the live document.
 * - NON-CLAIMS: a title's presence is never evidence that a case proves the clause; the evidence token each pinned half
 *   carries only shows that a pinned title talks about the clause. Half RA9/b ("optional change stream with cursor") is
 *   pinned to the observation layer's hot-cursor case because no adapter-side cursor case exists at base 1a36ece. No
 *   text-level focused-case check lives here: allowOnly is false in the tier configs. Mutants of the helper itself
 *   belong to wb-u62.
 * - RA6 b-e (wb-973.17, SWARM-CONTEXT-GRAPH-R17 (a) and (b)): the RF bullet states the snapshot's definition basis (the
 *   bundle when the envelope carries it, the graph digest staying the topology identity) and the observation-row demotion
 *   with the projection-owned freshness. Halves b and c bind the wb-973.8 SCG-R8 cases, d and e the wb-973.9 SCG-R9 cases,
 *   each under its describe path; d's it.each pin carries its table-row floor. FROZEN SHAPE (standing rule 16): the whole
 *   table's row/half/pin-count shape and RA6's identity (clauses and bindings) are literals, never derived from ROWS, and
 *   the RA6 ANCHOR reads the live document: every sentence of the RF bullet is covered clause by clause by RA6's halves,
 *   so a half removed from every literal of this file (CT5/CT6) is still red against the docs.
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
  /** An it.each template pin (wb-973.17): the number of table rows its call site must register (CasePin.each.minCases). */
  readonly each?: number;
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

/** wb-973.17: the describe paths of the wb-973.8 SCG-R8 and wb-973.9 SCG-R9 cases RA6 b-e bind (outermost first). */
const BUNDLE_SUITE = ["bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8)"];
const FRESHNESS_SUITE = ["observation rows from result.observations (wb-973.10 SCG-R10)", "observation freshness, replay and degradation (wb-973.9 SCG-R9)"];
const inSuite = (file: string, title: string, suite: readonly string[]): Pin => ({ file, title, suite });
const R8_EVIDENCE_KEY = inSuite(REACTIVEFIBER_OBSERVER, "SCG-R8: bundle_revision_id rides as rf-bundle evidence and the version cohort key", BUNDLE_SUITE);
const R8_COHORT_SPLIT = inSuite(REACTIVEFIBER_OBSERVER, "SCG-R8: equal graph digests with distinct bundle ids split the version cohort, and equal bundle ids share it", BUNDLE_SUITE);
const R8_WITHOUT_BUNDLE = inSuite(
  REACTIVEFIBER_OBSERVER,
  "SCG-R8: an envelope without bundle_revision_id states no rf-bundle reference and no sourceVersion, and its cohort stays the graph digest",
  BUNDLE_SUITE,
);
const R8_SOURCE_REVISION = inSuite(
  REACTIVEFIBER_OBSERVER,
  "SCG-R8: nativeEvidence of the same reading prefers the bundle as sourceBasis while the snapshot keeps the graph digest as sourceRevision",
  BUNDLE_SUITE,
);
/** The SCG-R9 NOT_FRESH it.each template: (a) reused/replayed, (b) denied/degraded, (c) an unknown word, (d) a degraded null. */
const R9_NOT_FRESH: Pin = {
  file: REACTIVEFIBER_OBSERVER,
  title: "SCG-R9: %s on an otherwise clean rf-cli envelope projects partial and non-success with one note naming it",
  suite: FRESHNESS_SUITE,
  each: 4,
};
const R9_PROVIDER_PARTIAL = inSuite(REACTIVEFIBER_OBSERVER, "SCG-R9 provider: the full-shape envelope with fresh and not-fresh rows passes unchanged and projects partial end to end", FRESHNESS_SUITE);
const R9_REFRESH = inSuite(REACTIVEFIBER_OBSERVER, "SCG-R9: after ObservationProjection.refresh every not-fresh row leaves the node partial, and freshness stays projection-owned", FRESHNESS_SUITE);

/**
 * The trunk sha this cut merges, at which every unpinned-half claim in the table was verified: the bead store's title,
 * description and acceptance fields searched with each half's slot words, and the default gate's report searched with
 * each probe. A claim is dated by this sha, never by a day; the delivery note records the commands and the hit lists.
 */
const CLAIM_BASE = "1a36ece";
/** The census owner: it holds a half's slot while the bead store holds no producer for the clause. */
const CENSUS_OWNER = "wb-752.15";
const NO_PRODUCER_CLAIM = `no producer bead for it is on file at base ${CLAIM_BASE}`;
const BLOCKED_AT_BASE = `blocked at base ${CLAIM_BASE}`;
/** The landing-order duty of a producer-owned half: the bead that lands the clause's case pins the half with it. */
const landerPins = (key: string): string => `pins ${key} in the same commit`;
/** The reading for a closed bead whose acceptance quoted the clause while none of its landed cases evidences it. */
const quotedWithoutEvidence = (bead: string): string => `${bead} (closed) quoted this clause in its acceptance without landing a case that evidences it`;
/** The reason prefix of a half no producer bead is on file for: the census owner holds its slot. */
const NO_PRODUCER_CASE = `no landed case evidences this clause and ${NO_PRODUCER_CLAIM}, so the census owner ${CENSUS_OWNER} holds the slot until one is filed: `;

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
        `${NO_PRODUCER_CASE}no registered case speaks of external, unrecorded Claude sessions being unobservable; ${quotedWithoutEvidence("wb-6ze.3")}, as its landed claude-topology cases (pinned on RA1/a and RA2/a) project sessions Workbench controls.`,
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
        `no landed case evidences this clause at base ${CLAIM_BASE}: the forge cases pinned above speak of verdict, evidence and projection, and the landed wb-4ap collective-adaptation forge cases echo a per-package invalidation-basis descriptor (its digest and freshness word, docs/07's source basis); none states a build revision or a per-axis gate state. Its producers are open: wb-5uh (W08 Forge provider: "Preserve native verdict axes, source basis") owns the gate axes, and wb-4ap.17 (a gate.run consumer whose subjectBasis echoes the envelope's gated_commit, decided under wb-5uh) owns the build revision; whichever lands its case first ${landerPins("RA4/b")}, splitting the half if that case evidences only one of the two.`,
        /build revision|gate axes|verdict axes|gated[_ ]commit/iu,
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
        `no landed case evidences this clause at base ${CLAIM_BASE}: the HX cases pin the query snapshot only and none follows linked native refs; ${quotedWithoutEvidence("wb-6ze.7")}, as its landed cases are the query-snapshot cases pinned on RA5/a. Its producer is open: wb-4ap.13 (HyperUnix H0/H1: typed directional refs and bounded neighborhood/ancestry queries, consumed additively with per-edge coverage); the wb-4ap.13 lander ${landerPins("RA5/b")}, and the probe carries that bead's wording, so the flip fires on case titles phrased the way the bead is.`,
        /graph traversal|linked native refs?|typed (?:directional )?refs?\b|directional refs?\b|related-to|bounded (?:neighbou?rhood|traversal|ancestry)|^(?=.*(?:\bhx\b|hyperunix))(?=.*(?:(?<!path )traversal|neighbou?rhood|ancestry))/iu,
        "follows a graph traversal of linked native refs",
      ),
    ],
  },
  {
    id: "RA6",
    section: READERS,
    halves: [
      pinned("a", "render context provenance and context artifact references", "payload reference", [RF_R1, pin(REACTIVEFIBER_OBSERVER, "R6: output text, diagnostics and budget payloads never appear in any surfaced string")]),
      // wb-973.17 (SCG-R17 (a)): the bundle is the definition basis when stated; the graph digest stays the topology identity.
      pinned("b", "An RF snapshot's definition basis is bundle_revision_id when the envelope carries it", "bundle", [R8_EVIDENCE_KEY, R8_COHORT_SPLIT, R8_WITHOUT_BUNDLE]),
      pinned("c", "with graph_revision_id remaining the topology identity only", "sourceRevision", [R8_SOURCE_REVISION]),
      // wb-973.17 (SCG-R17 (b)): not-fresh rows demote to partial; freshness stays the projection's own reading.
      pinned("d", "Reused, replayed or non-observed observation rows demote an RF preview to partial", "partial", [R9_NOT_FRESH, R9_PROVIDER_PARTIAL]),
      pinned("e", "the projection's freshness is the host's reading witness, never a currentness claim about the rows", "freshness", [R9_REFRESH]),
    ],
  },
  {
    id: "RA7",
    section: READERS,
    halves: [
      unpinned(
        "a",
        "invocation outcome, service spans if instrumented",
        `no landed default-gate case projects a MechanicalWorkflows invocation outcome or service span; the MechanicalWorkflows binding host is wb-04s under the native-composition epic wb-w12, both ${BLOCKED_AT_BASE}, and whichever lands the case ${landerPins("RA7/a")}.`,
        /invocation outcome|service spans?/iu,
        "projects the invocation outcome and the service span",
      ),
      unpinned(
        "b",
        "arbitrary plain TypeScript calls are not magically discoverable",
        `no landed case asserts that arbitrary plain TypeScript calls are not discoverable as MechanicalWorkflows; the sentence is a non-capability statement with no executable oracle until the binding host wb-04s (${BLOCKED_AT_BASE}) lands, and its lander ${landerPins("RA7/b")}.`,
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
const DISTINCT_PINS = 43;

/**
 * wb-973.17 (standing rule 16): the table's shape frozen as a literal, never derived from ROWS - every half as
 * "row/half:pins" in table order, unpinned halves at 0 - so deleting a half or a pin, or a whole row, cannot pass.
 */
const FROZEN_HALF_SHAPE: readonly string[] = [
  "RA1/a:7",
  "RA2/a:2",
  "RA2/b:0",
  "RA3/a:2",
  "RA3/b:1",
  "RA4/a:2",
  "RA4/b:0",
  "RA5/a:2",
  "RA5/b:0",
  "RA6/a:2",
  "RA6/b:3",
  "RA6/c:1",
  "RA6/d:2",
  "RA6/e:1",
  "RA7/a:0",
  "RA7/b:0",
  "RA8/a:2",
  "RA8/b:1",
  "RA9/a:3",
  "RA9/b:1",
  "RA10/a:2",
  "RA11/a:4",
  "RL1/a:1",
  "RL1/b:1",
  "RL1/c:3",
  "RL1/d:2",
  "RL1/e:2",
  "RL2/a:3",
  "RL3/a:2",
  "RL4/a:2",
  "RL5/a:1",
  "RL5/b:1",
];

/**
 * wb-973.17 (standing rule 16): row RA6's identity frozen as a literal, never derived from ROWS - each half's clause, then
 * each pin as "half | file | describe path | title" (an it.each pin adds its table-row floor) - so a shortened clause, a
 * dropped pin or a pin swapped for an unrelated passing case cannot pass.
 */
const FROZEN_RA6: readonly string[] = [
  "a | clause | render context provenance and context artifact references",
  "a | test/workbench-reactivefiber-observer.test.ts |  | R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference",
  "a | test/workbench-reactivefiber-observer.test.ts |  | R6: output text, diagnostics and budget payloads never appear in any surfaced string",
  "b | clause | An RF snapshot's definition basis is bundle_revision_id when the envelope carries it",
  "b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: bundle_revision_id rides as rf-bundle evidence and the version cohort key",
  "b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: equal graph digests with distinct bundle ids split the version cohort, and equal bundle ids share it",
  "b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: an envelope without bundle_revision_id states no rf-bundle reference and no sourceVersion, and its cohort stays the graph digest",
  "c | clause | with graph_revision_id remaining the topology identity only",
  "c | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: nativeEvidence of the same reading prefers the bundle as sourceBasis while the snapshot keeps the graph digest as sourceRevision",
  "d | clause | Reused, replayed or non-observed observation rows demote an RF preview to partial",
  "d | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9: %s on an otherwise clean rf-cli envelope projects partial and non-success with one note naming it | each >= 4",
  "d | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9 provider: the full-shape envelope with fresh and not-fresh rows passes unchanged and projects partial end to end",
  "e | clause | the projection's freshness is the host's reading witness, never a currentness claim about the rows",
  "e | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9: after ObservationProjection.refresh every not-fresh row leaves the node partial, and freshness stays projection-owned",
];
/** A row's identity in FROZEN_RA6's form: each half's clause, then one line per pin. */
const identityOf = (row: Row): string[] =>
  row.halves.flatMap(half => [
    `${half.id} | clause | ${half.clause}`,
    ...half.pins.map(entry => `${half.id} | ${entry.file} | ${(entry.suite ?? []).join(" > ")} | ${entry.title}${entry.each === undefined ? "" : ` | each >= ${entry.each}`}`),
  ]);
/** The RF bullet's label in the live document; the RA6 anchor reads the sentences after it. */
const RF_BULLET_LABEL = "RF: ";
/** What may remain of an RF bullet sentence once its halves' clauses are removed: punctuation and one joining "and". */
const CONNECTIVES = /^[\s,.;]*(?:and)?[\s,.;]*$/u;

/** Who holds an unpinned half's pin flip, as the bead store read at CLAIM_BASE. */
interface SlotRouting {
  /** Open beads whose landing evidences the clause: whichever lands the case pins the half in the same commit. */
  readonly openProducers: readonly string[];
  /** Blocked beads the clause waits on; their lander carries the same duty. */
  readonly blockedProducers: readonly string[];
  /** Closed beads whose acceptance quoted the clause without landing a case that evidences it. */
  readonly closedQuoters: readonly string[];
}

/**
 * The routing of the five unpinned halves (gate cmd_e7d15ee63790 U1, F2, F5). It is a record dated by CLAIM_BASE and is
 * never read from the bead store here: the store moves, so a text-level read would turn the leg red on any bead edit.
 * A half with neither an open nor a blocked producer is held by the census owner.
 */
const SLOT_ROUTING: Readonly<Record<string, SlotRouting>> = freezeDeep<Readonly<Record<string, SlotRouting>>>({
  "RA2/b": { openProducers: [], blockedProducers: [], closedQuoters: ["wb-6ze.3"] },
  "RA4/b": { openProducers: ["wb-5uh", "wb-4ap.17"], blockedProducers: [], closedQuoters: [] },
  "RA5/b": { openProducers: ["wb-4ap.13"], blockedProducers: [], closedQuoters: ["wb-6ze.7"] },
  "RA7/a": { openProducers: [], blockedProducers: ["wb-04s", "wb-w12"], closedQuoters: [] },
  "RA7/b": { openProducers: [], blockedProducers: ["wb-04s"], closedQuoters: [] },
});
/** A half's routing, undefined for a key the record does not hold. */
const routingOf = (key: string): SlotRouting | undefined => SLOT_ROUTING[key];

const isPinned = (half: Half): half is PinnedHalf => half.pins.length > 0 && "token" in half;
const isUnpinned = (half: Half): half is UnpinnedHalf => "titleProbe" in half;
const halfKey = (row: Row, half: Half): string => `${row.id}/${half.id}`;
const PINNED_HALVES = ROWS.flatMap(row => row.halves.filter(isPinned).map(half => ({ row, half })));
const UNPINNED_HALVES = ROWS.flatMap(row => row.halves.filter(isUnpinned).map(half => ({ row, half })));
const ALL_PINS: readonly Pin[] = PINNED_HALVES.flatMap(({ half }) => half.pins);

const pinKey = (entry: Pin): string => `${entry.file}\u0000${(entry.suite ?? []).join("\u0001")}\u0000${entry.title}`;
const casePin = (entry: Pin, tier: string = DEFAULT_GATE_TIER): CasePin => ({
  file: entry.file,
  title: entry.title,
  tier,
  ...(entry.suite === undefined ? {} : { suite: entry.suite }),
  ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }),
});

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
  "RF: render context provenance and context artifact references. An RF snapshot's definition basis is bundle_revision_id when the envelope carries it, with graph_revision_id remaining the topology identity only. Reused, replayed or non-observed observation rows demote an RF preview to partial, and the projection's freshness is the host's reading witness, never a currentness claim about the rows.",
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

/** A report registering one passed decoy case per name under a decoy describe: the probes read fullName only. */
const reportOf = (names: readonly string[]): ReportJson => ({
  testResults: [{ name: join(ROOT, "test/decoy.test.ts"), assertionResults: names.map(title => ({ title, fullName: `decoy ${title}`, ancestorTitles: ["decoy"], status: "passed" })) }],
});

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
/** A bead id as a whole token, so wb-4ap.1 never matches inside wb-4ap.13. */
const beadMention = (bead: string): RegExp => new RegExp(`(?<![\\w.-])${escapeRegExp(bead)}(?![\\w-]|\\.\\d)`, "u");

describe("wb-752.15 docs/workbench/09 § Reader adapters and § Relationships census (report mode)", () => {
  it("AC1: both sections render exactly their pinned block lists, every row's clause verbatim", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the table holds the sixteen rows RA1-RA11 and RL1-RL5, deeply frozen, with the five unpinned halves listed by name", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.id)).toEqual(EXPECTED_ROW_IDS);
    expect(UNPINNED_HALVES.map(({ row, half }) => halfKey(row, half))).toEqual(EXPECTED_UNPINNED);
    expect(new Set(ALL_PINS.map(pinKey)).size).toBe(DISTINCT_PINS);
    expect(ROWS.flatMap(row => row.halves.map(half => `${row.id}/${half.id}:${half.pins.length}`))).toEqual(FROZEN_HALF_SHAPE);
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
    expect(verdicts.map(verdict => verdict.cases)).toEqual(half.pins.map(entry => entry.each ?? 1));
  });

  it("AC3 (pin-flip): no unpinned half is named by a registered case of the gate's own report", () => {
    expect(registeredNames(loadReport(REPORT)).length).toBeGreaterThan(0);
    expect(flipFindings(loadReport(REPORT))).toEqual([]);
  });

  it("AC1 (wb-973.17): row RA6 binds the RF bullet's definition-basis and demotion clauses to the SCG-R8/SCG-R9 cases by file, describe path and verbatim title, frozen as a literal", () => {
    const ra6 = ROWS.find(row => row.id === "RA6");
    expect(ra6).toBeDefined();
    if (ra6 === undefined) return;
    expect(identityOf(ra6)).toEqual(FROZEN_RA6);
    expect(ra6.halves.every(isPinned)).toBe(true);
  });

  it("RA6 anchor (wb-973.17, rule 16): every sentence of the LIVE docs/09 RF bullet is covered clause by clause by RA6's halves, read from the document, never from this file's literals", () => {
    const found = docsSection(readRepo(DOCS_FILE), READERS, 2, [DOCS_PARENT]);
    expect(found.ok, found.why).toBe(true);
    const items = found.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []));
    const rf = items.filter(item => item.startsWith(RF_BULLET_LABEL));
    expect(rf).toHaveLength(1);
    const clauses = (ROWS.find(row => row.id === "RA6")?.halves ?? []).map(half => half.clause);
    const sentences = (rf[0] ?? "").slice(RF_BULLET_LABEL.length).split(/(?<=\.) /u);
    expect(sentences).toHaveLength(3);
    for (const sentence of sentences) {
      const rest = clauses.reduce((left, clause) => left.replace(clause, ""), sentence);
      expect(rest, `the RF bullet sentence ${JSON.stringify(sentence)} states text no RA6 half binds`).toMatch(CONNECTIVES);
    }
    for (const clause of clauses) expect(sentences.filter(sentence => sentence.includes(clause)), `RA6 clause ${JSON.stringify(clause)}`).toHaveLength(1);
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

  /**
   * wb-ro6u (owner tune M:16183): the explicit budget of the next case ALONE (the R546 sizing recipe, file-local); every
   * other case, this file and the suite keep vitest's 5000 ms default. The case is one synchronous judge() over all 56
   * pins of the table (15 files): judge() reads the default tier's whole report and analyses each pinned file with its
   * relative import closure on the calling thread, so the case awaits nothing that a tighter setup could bound. vitest
   * fails a synchronous body that returns after its budget but cannot interrupt one, so the budget moves only that
   * duration verdict, never an assertion. Measured at base 4c97422 against a full default-tier report (17037 cases,
   * written by `npm run test` at 8 workers), this file alone under vitest.census.config.ts at cap 1: 3635-5645 ms over
   * 10 runs, 5 of them past 5000 ms. Sized as 5 x the costliest wall of record, the case at 11620 ms in the file-alone
   * serial leg of the wb-sjx2 gate (cmd_d4fd9ea78492, 2026-10-24): 58100 ms, rounded up to a whole 5 s.
   */
  const WHOLE_TABLE_BUDGET_MS = 60_000;

  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
    const verdicts = judge(REPORT, ALL_PINS.map(entry => casePin(entry)));
    expect(verdicts.map(verdict => verdict.code)).toEqual(ALL_PINS.map(() => "ok"));
  }, WHOLE_TABLE_BUDGET_MS);
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

describe("wb-752.15 record honesty: each unpinned half names who holds its pin flip, dated by the base sha (gate cmd_e7d15ee63790 U1)", () => {
  const routed = UNPINNED_HALVES.map(({ row, half }) => ({ key: halfKey(row, half), half, routing: routingOf(halfKey(row, half)) }));

  it("the routing record is deeply frozen and covers exactly the five unpinned halves, naming each bead once by id", () => {
    expect(isDeepFrozen(SLOT_ROUTING)).toBe(true);
    expect(Object.keys(SLOT_ROUTING)).toEqual(EXPECTED_UNPINNED);
    for (const [key, routing] of Object.entries(SLOT_ROUTING)) {
      const beads = [...routing.openProducers, ...routing.blockedProducers, ...routing.closedQuoters];
      expect(new Set(beads).size, `half ${key}: no bead is named twice`).toBe(beads.length);
      for (const bead of beads) expect(bead, `half ${key}: a bead id`).toMatch(/^wb-[a-z0-9]+(?:\.[0-9]+)?$/u);
    }
  });

  it.each(routed)("U1 $key: the claim is dated by the base sha it was verified at, never by a day", ({ key, half }) => {
    expect(half.reason, `half ${key}: names the base sha`).toContain(`base ${CLAIM_BASE}`);
    expect(half.reason, `half ${key}: no calendar day dates the claim`).not.toMatch(/\b\d{4}-\d{2}-\d{2}\b/u);
  });

  it.each(routed)("U1 $key: names every producer on file and routes the pin flip to its lander, or says none is on file and the census owner holds the slot", ({ key, half, routing }) => {
    expect(routing, `half ${key} has a routing record`).toBeDefined();
    if (routing === undefined) return;
    const producers = [...routing.openProducers, ...routing.blockedProducers];
    for (const bead of producers) expect(half.reason, `half ${key}: names its producer ${bead}`).toMatch(beadMention(bead));
    if (routing.blockedProducers.length > 0) expect(half.reason, `half ${key}: says its producer is blocked at the base`).toContain(BLOCKED_AT_BASE);
    if (producers.length > 0) {
      expect(half.reason, `half ${key}: the producer's lander pins the half in the same commit`).toContain(landerPins(key));
      expect(half.reason, `half ${key}: a half with a producer on file never claims that none is`).not.toContain("no producer bead");
    } else {
      expect(half.reason, `half ${key}: no producer is on file, and the reason says so`).toContain(NO_PRODUCER_CLAIM);
      expect(half.reason, `half ${key}: the census owner holds the slot`).toMatch(beadMention(CENSUS_OWNER));
    }
  });

  it.each(routed.filter(({ routing }) => (routing?.closedQuoters.length ?? 0) > 0))("U1 $key: names each closed bead that quoted the clause without landing a case that evidences it", ({ key, half, routing }) => {
    for (const bead of routing?.closedQuoters ?? []) expect(half.reason, `half ${key}: the reading for ${bead}`).toContain(quotedWithoutEvidence(bead));
  });

  it.each([
    "follows a graph traversal of linked native refs",
    "maps each typed directional ref kind to a distinct relation kind or counts it unmapped, never merged",
    "keeps related-to refs apart from depends refs",
    "a bounded neighborhood query is partial with the remainder counted",
    "a bounded ancestry query carries per-edge coverage and the source revision",
    "HyperUnix observer: an ancestry query past its bound is partial, never complete",
  ])("the RA5/b probe fires on the wording of its producer wb-4ap.13, and only RA5/b flips: %s", name => {
    expect(namedRows(flipFindings(reportOf([name])))).toEqual(["RA5/b"]);
  });

  it.each([
    "projects the forge build revision and the gate axes",
    "subjectBasis echoes the gate.run envelope's gated_commit verbatim",
    "preserves the native verdict axes of a gate.status answer",
  ])("the RA4/b probe fires on the wording of its producers wb-5uh and wb-4ap.17, and only RA4/b flips: %s", name => {
    expect(namedRows(flipFindings(reportOf([name])))).toEqual(["RA4/b"]);
  });

  it("the widened probes stay quiet on near misses: a bare neighborhood, a path traversal (also under HX), a relation kind, a typed refusal, gate.run, bare axes and a bare ref-kind verb", () => {
    expect(
      flipFindings(
        reportOf([
          "states a hypothesis-only focus as an incomplete trace, not as an authoritative neighborhood",
          "rejects path traversal",
          "reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields",
          "a typed refusal names the missing variable",
          "refuses a gate.run protocol method with a typed validation error",
          "Forge's refusals are echoed verbatim with Forge's axes echoed",
          "HyperUnix provider consumes the find result and produces one snapshot",
          "HyperUnix rejects a path traversal in the query root",
        ]),
      ),
    ).toEqual([]);
  });
});

// ---- wb-vm71 (R694 follow-up of wb-ro6u landing 443, F2): every row anchored like RA6, outside this file's literals ----

/**
 * wb-vm71 (standing rule 16, CT-BATTERY v2; gate F2 of the wb-ro6u landing 443, its LEG 2 G4): until this cut only RA6
 * carried a clause-level identity literal and a live-docs anchor, so a shortened clause (CT2: RA1/a cut to its prefix;
 * G4: RL2/a cut to "Store edge provenance"), a pin swapped for an unrelated passing case (CT3: RA10/a's IDLE_CANCEL) and
 * a row taken out of every literal of this file (CT6: RL4) all passed - the per-clause docs check above is a substring
 * check and FROZEN_HALF_SHAPE is count-level. Two legs now hold EVERY row the way RA6 is held:
 * - FROZEN_ROWS: the whole table's identity as a literal, never derived from ROWS - each half's clause, then each pin as
 *   "row/half | file | describe path | title" (an it.each pin adds its table-row floor) - with RA6's lines equal to
 *   FROZEN_RA6 and each half's pin lines counted as FROZEN_HALF_SHAPE counts them, so a shortened clause, a swapped pin
 *   or a dropped pin is red against the literal (CT1, CT2, CT3, G4).
 * - TABLE ANCHOR: the LIVE docs/09 sections, read from the document and never from this file's docs mirrors, are tiled
 *   by the table's clauses: each clause occurs in exactly one rendered sentence of its section, and once every clause is
 *   cut out each sentence keeps only punctuation and one joining "and" (CONNECTIVES), or is one of UNBOUND_LEADS. A
 *   shortened clause leaves its cut words behind (CT2, G4) and a row taken out of every literal of this file leaves its
 *   whole sentence behind (CT6), each red against the document.
 * NOT CLAIMED (each pinned by a quiet row below): which pins evidence which clause has no anchor outside this file - the
 * docs state clauses, never pins, and judge() reads only that a pinned case passed - so a pin dropped, swapped or moved
 * between halves in every literal of this file at once (ROWS, FROZEN_ROWS, FROZEN_HALF_SHAPE, DISTINCT_PINS), or two
 * halves' clauses swapped there with their pins left in place, stays quiet; and the two UNBOUND_LEADS sentences are
 * bound by no row (each is the lead-in that closes the paragraph opening its section's bullet list, and the anchor
 * forgives no other text).
 */
const FROZEN_ROWS: readonly string[] = [
  "RA1/a | clause | Every supported provider offers at least a read-current-snapshot function where its SDK supports it.",
  "RA1/a | test/workbench-claude-topology.test.ts |  | A1: one sample with a session, a message reference and two tools projects agent-call, session and two tool-use snapshots",
  "RA1/a | test/workbench-furnace-topology.test.ts |  | A1/A2: Run snapshot first, one Attempt snapshot per returned item, one furnace-confirmed ownership edge each",
  "RA1/a | test/workbench-forge-observer.test.ts |  | projects the fixture provider output of registerForgeGateStatus exactly like its source",
  "RA1/a | test/workbench-hyperunix-observer.test.ts |  | projects what registerHyperUnixFind returns for the measured incomplete read: partial, coverage evidence, no bodies",
  "RA1/a | test/workbench-reactivefiber-observer.test.ts |  | R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference",
  "RA1/a | test/workbench-beads-observer.test.ts |  | snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented",
  "RA1/a | test/workbench-detached-observer.test.ts |  | carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference",
  "RA2/a | clause | SDK message events from sessions controlled by Workbench",
  "RA2/a | test/workbench-claude-topology.test.ts |  | A1: one sample with a session, a message reference and two tools projects agent-call, session and two tool-use snapshots",
  "RA2/a | test/workbench-claude-observer.test.ts |  | parallel calls retain independent native session identity and permission evidence",
  "RA2/b | clause | external Claude sessions may be unobservable unless records are available",
  "RA3/a | clause | native Run status/event stream",
  "RA3/a | test/workbench-furnace-topology.test.ts |  | A1/A2: Run snapshot first, one Attempt snapshot per returned item, one furnace-confirmed ownership edge each",
  "RA3/a | test/workbench-furnace-observer.test.ts |  | rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream",
  "RA3/b | clause | possible descendant references",
  "RA3/b | test/workbench-furnace-topology.test.ts |  | A3: a partial Attempt page yields edges only for returned items and synthesizes nothing for the missing tail",
  "RA4/a | clause | native operation/verdict/artifact evidence",
  "RA4/a | test/workbench-forge-observer.test.ts |  | F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone",
  "RA4/a | test/workbench-projection-invalidation.test.ts |  | carries forge-operation evidence refs onto ObservedNode and keeps the 32-reference cap",
  "RA4/b | clause | build revision and gate axes",
  "RA5/a | clause | query coverage/bounds/query basis",
  "RA5/a | test/workbench-hyperunix-observer.test.ts |  | H1: the measured incomplete read projects exactly one partial, unknown-toned query snapshot that refreshes a projection",
  "RA5/a | test/workbench-hyperunix-observer.test.ts |  | H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty",
  "RA5/b | clause | optional graph traversal of linked native refs",
  "RA6/a | clause | render context provenance and context artifact references",
  "RA6/a | test/workbench-reactivefiber-observer.test.ts |  | R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference",
  "RA6/a | test/workbench-reactivefiber-observer.test.ts |  | R6: output text, diagnostics and budget payloads never appear in any surfaced string",
  "RA6/b | clause | An RF snapshot's definition basis is bundle_revision_id when the envelope carries it",
  "RA6/b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: bundle_revision_id rides as rf-bundle evidence and the version cohort key",
  "RA6/b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: equal graph digests with distinct bundle ids split the version cohort, and equal bundle ids share it",
  "RA6/b | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: an envelope without bundle_revision_id states no rf-bundle reference and no sourceVersion, and its cohort stays the graph digest",
  "RA6/c | clause | with graph_revision_id remaining the topology identity only",
  "RA6/c | test/workbench-reactivefiber-observer.test.ts | bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8) | SCG-R8: nativeEvidence of the same reading prefers the bundle as sourceBasis while the snapshot keeps the graph digest as sourceRevision",
  "RA6/d | clause | Reused, replayed or non-observed observation rows demote an RF preview to partial",
  "RA6/d | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9: %s on an otherwise clean rf-cli envelope projects partial and non-success with one note naming it | each >= 4",
  "RA6/d | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9 provider: the full-shape envelope with fresh and not-fresh rows passes unchanged and projects partial end to end",
  "RA6/e | clause | the projection's freshness is the host's reading witness, never a currentness claim about the rows",
  "RA6/e | test/workbench-reactivefiber-observer.test.ts | observation rows from result.observations (wb-973.10 SCG-R10) > observation freshness, replay and degradation (wb-973.9 SCG-R9) | SCG-R9: after ObservationProjection.refresh every not-fresh row leaves the node partial, and freshness stays projection-owned",
  "RA7/a | clause | invocation outcome, service spans if instrumented",
  "RA7/b | clause | arbitrary plain TypeScript calls are not magically discoverable",
  "RA8/a | clause | supported work readiness and linkage",
  "RA8/a | test/workbench-beads-observer.test.ts |  | a dependency id outside the bd id shape is unavailable, never a borrowed node key",
  "RA8/a | test/workbench-beads-observer.test.ts |  | snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented",
  "RA8/b | clause | never reconstructed from heuristics alone",
  "RA8/b | test/workbench-beads-observer.test.ts |  | C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge",
  "RA9/a | clause | Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef}",
  "RA9/a | test/workbench-detached-observer.test.ts |  | carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference",
  "RA9/a | test/workbench-reactivefiber-observer.test.ts |  | R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference",
  "RA9/a | test/workbench-hyperunix-observer.test.ts |  | H5: tolerates unknown producer fields and never copies them into any output field",
  "RA9/b | clause | optional change stream with cursor",
  "RA9/b | test/workbench-observation.test.ts |  | requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history",
  "RA10/a | clause | Poll only where streaming unsupported, with explicit rate/budget.",
  "RA10/a | test/workbench-furnace-observer.test.ts |  | rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream",
  "RA10/a | test/workbench-furnace-observer.test.ts |  | closing cancels an idle polling wait without native control, and abort signal refuses an initial read",
  "RA11/a | clause | Handle stream reconnect and cursor gaps as stale/unknown until refreshed.",
  "RA11/a | test/workbench-observation.test.ts |  | deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
  "RA11/a | test/workbench-observation.test.ts |  | disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "RA11/a | test/workbench-observation.test.ts |  | requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history",
  "RA11/a | test/workbench-observation-recovery-receipt.test.ts |  | catches an evicted cursor reported as a complete resume",
  "RL1/a | clause | declared dependency (from source/policy)",
  "RL1/a | test/workbench-topology-slice.test.ts |  | separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis",
  "RL1/b | clause | observed causal edge (tool call to native result)",
  "RL1/b | test/workbench-topology-slice.test.ts |  | separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis",
  "RL1/c | clause | lifecycle ownership (only if native producer confirms)",
  "RL1/c | test/workbench-topology-slice.test.ts |  | does not present ownership without a native confirmation from the owning provider as lifecycle ownership",
  "RL1/c | test/workbench-observation.test.ts |  | uses provider-qualified native keys, preserves native failure and does not infer ownership",
  "RL1/c | test/workbench-control.test.ts |  | rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights",
  "RL1/d | clause | grouping only (phase, display scope)",
  "RL1/d | test/workbench-topology-slice.test.ts |  | separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis",
  "RL1/d | test/workbench-control.test.ts |  | rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights",
  "RL1/e | clause | inferred possible relationship (hypothesis; never treated as authoritative)",
  "RL1/e | test/workbench-topology-slice.test.ts |  | states a hypothesis-only focus as an incomplete trace, not as an authoritative neighborhood",
  "RL1/e | test/workbench-topology-slice.test.ts |  | separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis",
  "RL2/a | clause | Store edge provenance with timestamp and source",
  "RL2/a | test/workbench-observation.test.ts |  | updates all semantic indexes when a node changes and keeps edges typed, explicit, provenance-bearing",
  "RL2/a | test/workbench-topology-slice.test.ts |  | lists upstream and downstream neighbors of the focus, each edge carrying class, timestamp and source",
  "RL2/a | test/workbench-topology-slice.test.ts |  | reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields",
  "RL3/a | clause | Graph view styles each differently.",
  "RL3/a | test/workbench-inspector.test.ts | W15-B6 graph view draws the graph-view model (wb-6ze.34) | AC1 draws counted aggregates before node rows, each edge with a direction glyph, its class and [source], and both references as reference rows",
  "RL3/a | test/workbench-inspector.test.ts | W15-B6 graph view draws the graph-view model (wb-6ze.34) | AC2 a declared edge to a never-observed endpoint is a declared dependency marked unobserved endpoint, never unknown-dynamic",
  "RL4/a | clause | Missing edges do not imply independence.",
  "RL4/a | test/workbench-topology-slice.test.ts |  | returns empty slices labeled incomplete-trace for a node with no observed relations",
  "RL4/a | test/workbench-topology-slice.test.ts |  | lets a hypothesis collapse into the remainder before any authoritative edge when a cap bites",
  "RL5/a | clause | Shared nodes may have multiple causal readers",
  "RL5/a | test/workbench-observation.test.ts |  | returns a child once when multiple proven relationship types share it, without false truncation",
  "RL5/b | clause | without one cancellation owner",
  "RL5/b | test/workbench-control.test.ts |  | rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights",
];

/** A row's identity in FROZEN_ROWS's form: FROZEN_RA6's lines, each led by the row id. */
const tableIdentityOf = (row: Row): string[] => identityOf(row).map(line => `${row.id}/${line}`);
/** A FROZEN_ROWS clause line ("row/half | clause | text"), as against a pin line ("row/half | file | describe path | title"). */
const CLAUSE_LINE = /^[A-Z]+\d+\/[a-z] \| clause \| /u;

/** A reader bullet's provider label in the live document ("Claude: ", "RF: "): a label, never a requirement clause. */
const BULLET_LABEL = /^[A-Z][A-Za-z]*: /u;

/**
 * The only rendered sentences no row binds, as "section | sentence": each section's lead-in, the sentence that closes
 * the paragraph opening its bullet list. NOT CLAIMED: no row pins them; the anchor forgives exactly these and no other
 * text, and only where the live document places them as a lead-in.
 */
const UNBOUND_LEADS: readonly string[] = [`${READERS} | Streaming observer optional:`, `${RELATIONS} | At minimum differentiate:`];

/** What the table anchor reads: one line per broken tiling, and the lead-ins it forgave. */
interface TableAnchor {
  /** One line per clause or live sentence the tiling breaks, naming the row or the section. */
  readonly failures: readonly string[];
  /** The live sentences no clause binds that close the paragraph opening a list and end with a colon, as "section | sentence". */
  readonly leads: readonly string[];
}

/** One rendered sentence of a live section, and whether it closes the paragraph that opens the section's list. */
interface LiveSentence {
  readonly text: string;
  readonly opensList: boolean;
}

/** The rendered sentences of a section in document order: each block's text (each bullet's, its label cut) split after a full stop. */
function liveSentences(blocks: readonly RenderedBlock[]): LiveSentence[] {
  return blocks.flatMap((block, index) => {
    const units = block.kind === "list" ? block.items.map(item => item.text.replace(BULLET_LABEL, "")) : [block.text];
    const opensList = block.kind === "paragraph" && blocks[index + 1]?.kind === "list";
    return units.flatMap(unit => {
      const parts = unit.split(/(?<=\.) /u);
      return parts.map((text, at) => ({ text, opensList: opensList && at === parts.length - 1 }));
    });
  });
}

/**
 * The table anchor over a docs/09 markdown text and a table: each clause must occur in exactly one rendered sentence of
 * its section, and each sentence, once every clause of the section is cut out of it (longest clause first), keeps only
 * CONNECTIVES - or, untouched by any clause, is the colon-ended lead-in that closes the paragraph opening a list.
 */
function tableAnchor(markdown: string, rows: readonly Row[]): TableAnchor {
  const failures: string[] = [];
  const leads: string[] = [];
  for (const heading of [READERS, RELATIONS]) {
    const found = docsSection(markdown, heading, 2, [DOCS_PARENT]);
    if (!found.ok) {
      failures.push(`${DOCS_FILE} § ${heading}: the section is refused: ${found.why}`);
      continue;
    }
    const sentences = liveSentences(found.blocks);
    const halves = rows.filter(row => row.section === heading).flatMap(row => row.halves.map(half => ({ key: halfKey(row, half), clause: half.clause })));
    for (const { key, clause } of halves) {
      const hits = sentences.filter(sentence => sentence.text.includes(clause)).length;
      if (hits !== 1) failures.push(`row ${key}: its clause ${JSON.stringify(clause)} occurs in ${hits} rendered sentences of the live ${DOCS_FILE} § ${heading}; the anchor needs exactly one`);
    }
    const longestFirst = [...halves].sort((left, right) => right.clause.length - left.clause.length);
    for (const sentence of sentences) {
      const rest = longestFirst.reduce((left, { clause }) => left.replace(clause, ""), sentence.text);
      if (CONNECTIVES.test(rest)) continue;
      if (sentence.opensList && rest === sentence.text && rest.endsWith(":")) leads.push(`${heading} | ${rest}`);
      else failures.push(`${DOCS_FILE} § ${heading}: the live sentence ${JSON.stringify(sentence.text)} keeps ${JSON.stringify(rest.trim())}, which no row's clause binds`);
    }
  }
  return { failures, leads };
}

/** A copy of the table with one half's clause replaced: a hollowing fixture, the frozen table itself never edited. */
const withClause = (rows: readonly Row[], key: string, clause: string): Row[] =>
  rows.map(row => ({ ...row, halves: row.halves.map(half => (halfKey(row, half) === key ? { ...half, clause } : half)) }));
/** A copy of the table without one row. */
const withoutRow = (rows: readonly Row[], id: string): Row[] => rows.filter(row => row.id !== id);
/** A copy of the table with one pin dropped from one pinned half (the NOT CLAIMED pin-level hollow). */
const withoutPin = (rows: readonly Row[], key: string, title: string): Row[] =>
  rows.map(row => ({ ...row, halves: row.halves.map(half => (halfKey(row, half) === key && isPinned(half) ? { ...half, pins: half.pins.filter(entry => entry.title !== title) } : half)) }));
/** A copy of the table with every pin stripped from every half: the anchor's reading must not move (NOT CLAIMED). */
const stripPins = (rows: readonly Row[]): Row[] => rows.map((row): Row => ({ ...row, halves: row.halves.map((half): Half => (isPinned(half) ? { ...half, pins: [] } : half)) }));

describe("wb-vm71 every row is anchored like RA6: the table's identity is frozen, and the LIVE docs/09 sections are tiled by its clauses", () => {
  it("FROZEN_ROWS (rule 16): every row's identity - each half's clause, then each pin by file, describe path and verbatim title - equals the literal", () => {
    expect(ROWS.flatMap(tableIdentityOf)).toEqual(FROZEN_ROWS);
    expect(FROZEN_ROWS.filter(line => line.startsWith("RA6/")).map(line => line.slice("RA6/".length))).toEqual(FROZEN_RA6);
    const pinLines = (key: string): number => FROZEN_ROWS.filter(line => line.startsWith(`${key} | `) && !CLAUSE_LINE.test(line)).length;
    expect(FROZEN_ROWS.filter(line => CLAUSE_LINE.test(line)).map(line => line.slice(0, line.indexOf(" | ")))).toEqual(FROZEN_HALF_SHAPE.map(entry => entry.slice(0, entry.indexOf(":"))));
    expect(FROZEN_HALF_SHAPE.map(entry => `${entry.slice(0, entry.indexOf(":"))}:${pinLines(entry.slice(0, entry.indexOf(":")))}`)).toEqual(FROZEN_HALF_SHAPE);
  });

  it("TABLE ANCHOR: every clause of every row tiles the LIVE docs/09 sections, read from the document and never from this file's docs mirrors, and only the two named lead-ins stay unbound", () => {
    const anchor = tableAnchor(readRepo(DOCS_FILE), ROWS);
    expect(anchor.failures).toEqual([]);
    expect(anchor.leads).toEqual(UNBOUND_LEADS);
  });

  describe("the gate's named survivors now red against the LIVE document: each adds exactly its own failure to the frozen table's tiling (a differential against that tiling, so a hollow elsewhere in the table neither masks nor fakes it)", () => {
    const live = (): string => readRepo(DOCS_FILE);
    /** The failures a hollowed copy of the table adds to the frozen table's live-docs tiling. */
    const added = (rows: readonly Row[]): string[] => {
      const base = tableAnchor(live(), ROWS).failures;
      return tableAnchor(live(), rows).failures.filter(line => !base.includes(line));
    };

    it("G4: RL2/a's clause cut to 'Store edge provenance' leaves its cut words behind in the live closing sentence", () => {
      const lines = added(withClause(ROWS, "RL2/a", "Store edge provenance"));
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain(`§ ${RELATIONS}: the live sentence`);
      expect(lines[0]).toContain("with timestamp and source");
    });

    it("CT2: RA1/a's clause cut to its prefix leaves the rest of the live lead sentence behind", () => {
      const lines = added(withClause(ROWS, "RA1/a", "Every supported provider offers at least a read-current-snapshot function"));
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain(`§ ${READERS}: the live sentence`);
      expect(lines[0]).toContain("where its SDK supports it.");
    });

    it("CT6: row RL4 taken out of the table leaves its whole live sentence unbound", () => {
      const lines = added(withoutRow(ROWS, "RL4"));
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain('the live sentence "Missing edges do not imply independence."');
    });

    it("NOT CLAIMED, pinned quiet: the anchor reads clauses, never pins - a pin-stripped table, and the table without RA10/a's IDLE_CANCEL, tile the live document exactly as the frozen table does", () => {
      const frozen = tableAnchor(live(), ROWS);
      const stripped = stripPins(ROWS);
      expect(stripped.flatMap(row => row.halves).every(half => half.pins.length === 0)).toBe(true);
      expect(tableAnchor(live(), stripped)).toEqual(frozen);
      expect(tableAnchor(live(), withoutPin(ROWS, "RA10/a", IDLE_CANCEL.title))).toEqual(frozen);
    });
  });

  describe("the anchor names its true cause, over an independent fixture (its own two sections and table, never this file's docs mirror or ROWS)", () => {
    const fixtureHalf = (id: string, clause: string): PinnedHalf => pinned(id, clause, "fixture", [pin("test/fixture.test.ts", `fixture: ${clause}`)]);
    const FIXTURE_ROWS: readonly Row[] = [
      { id: "F1", section: READERS, halves: [fixtureHalf("a", "Every fixture provider offers a snapshot read.")] },
      { id: "F2", section: READERS, halves: [fixtureHalf("a", "first fixture duty"), fixtureHalf("b", "second fixture duty")] },
      { id: "F3", section: READERS, halves: [fixtureHalf("a", "third fixture duty")] },
      { id: "F4", section: READERS, halves: [fixtureHalf("a", "Fourth fixture duty holds."), fixtureHalf("b", "Fifth fixture duty holds.")] },
      { id: "F5", section: RELATIONS, halves: [fixtureHalf("a", "sixth fixture edge")] },
      { id: "F6", section: RELATIONS, halves: [fixtureHalf("a", "Seventh fixture rule holds"), fixtureHalf("b", "eighth fixture rule holds")] },
    ];
    const FIXTURE_LEADS: readonly string[] = [`${READERS} | Fixture lead:`, `${RELATIONS} | Edge lead:`];
    const fixture = [
      `# ${DOCS_PARENT}`,
      "",
      `## ${READERS}`,
      "",
      "Every fixture provider offers a snapshot read. Fixture lead:",
      "- Alpha: first fixture duty and second fixture duty.",
      "- Beta: third fixture duty.",
      "",
      "Fourth fixture duty holds. Fifth fixture duty holds.",
      "",
      `## ${RELATIONS}`,
      "",
      "Edge lead:",
      "- sixth fixture edge",
      "",
      "Seventh fixture rule holds; eighth fixture rule holds.",
      "",
    ].join("\n");
    const unbound = (heading: string, sentence: string, rest: string = sentence): string =>
      `${DOCS_FILE} § ${heading}: the live sentence ${JSON.stringify(sentence)} keeps ${JSON.stringify(rest)}, which no row's clause binds`;

    it("control: the fixture tiles with no failure and exactly its two lead-ins, so every red below is its own edit", () => {
      const anchor = tableAnchor(fixture, FIXTURE_ROWS);
      expect(anchor.failures).toEqual([]);
      expect(anchor.leads).toEqual(FIXTURE_LEADS);
    });

    it("a shortened clause leaves its cut words behind, naming the section and the words", () => {
      expect(tableAnchor(fixture, withClause(FIXTURE_ROWS, "F4/a", "Fourth fixture duty")).failures).toEqual([unbound(READERS, "Fourth fixture duty holds.", "holds.")]);
    });

    it("a row taken out of the table leaves its whole sentence unbound", () => {
      expect(tableAnchor(fixture, withoutRow(FIXTURE_ROWS, "F3")).failures).toEqual([unbound(READERS, "third fixture duty.")]);
    });

    it("a clause that renders in two sentences, or in none, names its row", () => {
      const twice = tableAnchor(fixture.replace("- Beta: third fixture duty.", "- Beta: third fixture duty; first fixture duty."), FIXTURE_ROWS);
      expect(namedRows(twice.failures)).toEqual(["F2/a"]);
      expect(twice.failures).toHaveLength(1);
      const none = tableAnchor(fixture, withClause(FIXTURE_ROWS, "F5/a", "sixth fixture edges"));
      expect(namedRows(none.failures)).toEqual(["F5/a"]);
      expect(none.failures).toContain(unbound(RELATIONS, "sixth fixture edge"));
    });

    it("a sentence added to a closing paragraph or to a bullet is unbound and red, naming its section", () => {
      expect(tableAnchor(fixture.replace("Fifth fixture duty holds.", "Fifth fixture duty holds. A host may skip it."), FIXTURE_ROWS).failures).toEqual([unbound(READERS, "A host may skip it.")]);
      expect(tableAnchor(fixture.replace("- Beta: third fixture duty.", "- Beta: third fixture duty. Beta may skip it."), FIXTURE_ROWS).failures).toEqual([unbound(READERS, "Beta may skip it.")]);
    });

    it("a lead-in is forgiven only where it opens a list and ends with a colon: a colon-ended sentence closing a section is unbound, and a lead-in without its colon is too", () => {
      const trailing = tableAnchor(fixture.replace("eighth fixture rule holds.", "eighth fixture rule holds. Exceptions:"), FIXTURE_ROWS);
      expect(trailing.failures).toEqual([unbound(RELATIONS, "Exceptions:")]);
      expect(trailing.leads).toEqual(FIXTURE_LEADS);
      const unled = tableAnchor(fixture.replace("Edge lead:", "Edge lead."), FIXTURE_ROWS);
      expect(unled.failures).toEqual([unbound(RELATIONS, "Edge lead.")]);
      expect(unled.leads).toEqual([`${READERS} | Fixture lead:`]);
    });

    it("a refused section is a failure naming it, never a silent pass", () => {
      const anchor = tableAnchor(fixture.replace(`## ${RELATIONS}`, "## Edge notes"), FIXTURE_ROWS);
      expect(anchor.failures).toHaveLength(1);
      expect(anchor.failures[0]).toContain(`§ ${RELATIONS}: the section is refused`);
    });

    it("pins never move the anchor: the pin-stripped fixture tiles exactly as the fixture does", () => {
      expect(tableAnchor(fixture, stripPins(FIXTURE_ROWS))).toEqual(tableAnchor(fixture, FIXTURE_ROWS));
    });
  });
});
