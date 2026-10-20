/**
 * wb-cax.25 (W22): census falsifier for the "Matrix by subsystem" section of docs/workbench/14-qa-and-benchmarks.md, a
 * census leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT
 * MODE. It is the one post-u62 adoption cut of this bead (the sequenced census class): the hand-rolled scanner of the
 * first cut (test/workbench-subsystem-matrix.test.ts, never landed) is replaced by judge(.forge/vitest-report.json, pins)
 * through the shared helper test/helpers/census.ts.
 *
 * The section is the docs/14 conformance suite: thirteen subsystem rows, each with a positive proof cell and a negative
 * control cell. This leg binds every cell (or, where a cell holds two claims, every claim) to existing cases by file,
 * verbatim title and tier, or records the part no landed case covers as unpinned with a reason. It executes no pinned
 * case: judge() reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test` before the census step runs), so a pinned case counts only when the gate's own run collected it exactly
 * once (under its bound describe path where the row binds one; once per table row for an it.each pin), recorded it
 * passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo,
 * inverted, excluded or unregistered pinned case therefore reads red, naming the row, the cell, the file, the title and
 * the cause, as far as the helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts,
 * receipts/wb-u62.md). This leg scans no test source for case calls itself and reads no forge.toml text of its own: every
 * title is located by the helper, from vitest's report, never from bare text; a tier is read through the helper's
 * resolveTier and the vitest config modules, loaded as modules.
 *
 * Tiers: a half's tier names the report that vouches for it. The default report vouches for the default gate's test tier
 * only; judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)), so this leg never reports a live, native or
 * rf pass from a title's presence. The four cases that run only in a non-default tier (furnace-observe, native-read,
 * rf-preview) are RECORDED with their tier and checked at TIER level only: forge.toml's command for the tier resolves,
 * its vitest config module selects the file, the default config module excludes it, the default report does not hold it
 * (not-collected) and the default judge refuses it (tier-mismatch). NAMED RESIDUAL LIVE-TITLES: whether such a case's
 * title is still registered is judged by no report this leg reads, and the leg says so rather than counting the pin as
 * covered; a cell whose only pins are live-tier is listed as LIVE_ONLY_CELLS and is never counted as judged.
 *
 * Docs: the section is judged through the helper's rendered view (docsSection / sectionMatches). Under its unique level-2
 * heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, it must render as exactly its
 * one frozen table, HTML-free, and the table's cell grid (header, thirteen rows, three columns) must equal the census's
 * grid cell by cell, so a reworded cell names its row and cell. The spec's falsifier sentence of "## Truth labels and
 * release gates" is pinned as the exact first paragraph of that unique section (the landed wb-cax.27 shape), HTML refused,
 * so a modifier inside the sentence, an exemption sentence before or after it in its paragraph, or a reworded sentence
 * reads red. NAMED RESIDUAL TRUTH-SECTION-TAIL: a paragraph added after it elsewhere in that section is not judged here
 * (the section-bounded pin of that section is wb-6ze.38's) and carries a quiet row. The drift falsifiers run over a
 * SYNTHETIC document built from the frozen grid, never over the live docs/14 text, so a legitimate edit of any other
 * section can never redden a falsifier row.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16; the g8-gate-s4 U1/U2 cure). AC1 pins the table's
 * shape as literals copied from the TABLE at the cut base fef0371: every half's pin count (EXPECTED_SHAPE), every pin's
 * identity - subsystem, half, position, tier, file, title, bound describe path and it.each minimum (FROZEN_PINS) - and
 * the judged subset the AC2 it.each runs (FROZEN_JUDGED_SHAPE); no half pins one (file, title, suite) twice. Deleting a
 * pin, shortening a cell, swapping a pin for an unrelated passing case, putting a copy of a neighbour in a pin's place,
 * re-binding a suite, lowering an each minimum or narrowing the judged subset reds AC1, so hollowing the census takes a
 * second, visible edit here. The AC2 and AC4 call sites are bound as well: each judged half and each live half records
 * that its case ran, and an afterAll asserts those sets equal FROZEN_JUDGED_SHAPE and EXPECTED_LIVE, so a narrowed it.each
 * table reads red (so does a name-filtered run of this file, fail-closed).
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does not
 * follow; a title's presence is NOT a live, native or scale pass; the MechanicalWorkflows row (both cells) has no landed
 * case and is recorded unpinned; the Furnace "ambiguous start no duplicate" half binds the landed W18-C hosted start case
 * (wb-zmd), driven through an injected Furnace client - not a live Furnace run and not the unlanded W09 provider invoke
 * (wb-s8a); the truth-section tail residual above.
 */
import { readFileSync } from "node:fs";
import { basename, dirname, join, matchesGlob } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { afterAll, describe, expect, it } from "vitest";
import defaultConfig from "../vitest.config.js";
import furnaceConfig from "../vitest.furnace.config.js";
import nativeConfig from "../vitest.native.config.js";
import rfConfig from "../vitest.rf.config.js";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, resolveTier, sectionMatches, sourceStructure } from "./helpers/census.js";

type Tier = "default-gate" | "furnace-observe" | "native-read" | "rf-preview";
type Which = "positive" | "negative";
interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
  /** An it.each / it.for template pin: the call site must register each table row exactly once, at least minCases of them. */
  readonly each?: { readonly minCases: number };
}
interface Half {
  readonly id: string;
  readonly which: Which;
  /** The part of the docs/14 cell this half answers (a cell with one claim has claim === the cell text). */
  readonly claim: string;
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  /** Why no landed case binds this half; an unpinned half is never counted as covered. */
  readonly reason?: string;
}
interface Row {
  readonly subsystem: string;
  /** The docs/14 cells verbatim. */
  readonly positive: string;
  readonly negative: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-subsystem-matrix.census.ts";
const DOCS_FILE = "docs/workbench/14-qa-and-benchmarks.md";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const DOCS_HEADING = "Matrix by subsystem";
const TRUTH_HEADING = "Truth labels and release gates";
const FALSIFIER_SENTENCE = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";
const HEADER_CELLS: readonly string[] = ["Subsystem", "Positive proof", "Negative control"];

const pin = (file: string, title: string, extra: Pick<Pin, "suite" | "each"> = {}): Pin => ({ file: `test/${file}`, title, ...extra });
const gate = (id: string, which: Which, claim: string, pins: readonly Pin[]): Half => ({ id, which, claim, tier: "default-gate", pins });
const live = (id: string, which: Which, claim: string, tier: Exclude<Tier, "default-gate">, pins: readonly Pin[]): Half => ({ id, which, claim, tier, pins });
const unpinned = (id: string, which: Which, claim: string, reason: string): Half => ({ id, which, claim, tier: "default-gate", pins: [], reason });

const GEOMETRY_SUITE = "release checklist item 8: deterministic terminal geometry";
const W11_REASON = "W11 wb-04s blocked, VC-3 wb-w12 blocked, no binding-host code on trunk (feature-matrix 'Hosted develop()' planned): no landed case runs an actual develop() with actual bound services, and none separates a fixture success from real execution, so this cell has nothing to pin and is never counted as passed";

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
    subsystem: "Claude SDK host",
    positive: "SDK message/session reference observed, schema result validated",
    negative: "Pi AgentManager not invoked for script agent()",
    halves: [
      gate("positive", "positive", "SDK message/session reference observed, schema result validated", [
        pin("workbench-host-contract.test.ts", "L3: parallel schema agents return object values from native SDK structured_output"),
        pin("workbench-claude-adverse-faults.test.ts", "control: a conforming structured_output succeeds and the text is its JSON"),
      ]),
      gate("negative", "negative", "Pi AgentManager not invoked for script agent()", [
        pin("workbench-host-contract.test.ts", "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported"),
        pin("workbench-claude-cancel-faults.test.ts", "F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched"),
      ]),
    ],
  },
  {
    subsystem: "Legacy scripts",
    positive: "unchanged script executes with same semantics",
    negative: "unsupported option fails at call",
    halves: [
      gate("positive", "positive", "unchanged script executes with same semantics", [
        pin("workflow-claude-code-compat.test.ts", "runs the canonical review-changes example"),
        pin("workflow-examples.test.ts", "ships at least the examples the guide links"),
      ]),
      gate("negative", "negative", "unsupported option fails at call", [pin("workflow-runtime.test.ts", "names a misspelt option rather than ignoring it")]),
    ],
  },
  {
    subsystem: "node()",
    positive: "authorized native SDK operation produces evidence",
    negative: "missing/unauthorized provider refuses",
    halves: [
      gate("positive", "positive", "authorized native SDK operation produces evidence", [
        pin("workbench-forge-observer.test.ts", "projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference"),
      ]),
      gate("negative", "negative", "missing/unauthorized provider refuses", [
        pin("workbench-node-contract.test.ts", "L4: unknown capability and duplicate descriptor fail explicitly"),
        pin("workbench-node-contract.test.ts", "L4: unauthorized invocation denied at host even with known capability id"),
        pin("workbench-node-limits.test.ts", "refuses oversized input before native provider is called"),
        pin("workbench-control-degradation.test.ts", "a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider"),
      ]),
    ],
  },
  {
    subsystem: "MechanicalWorkflows",
    positive: "actual develop() + actual bound services",
    negative: "fixture success not called real execution",
    halves: [
      unpinned("positive", "positive", "actual develop() + actual bound services", W11_REASON),
      unpinned("negative", "negative", "fixture success not called real execution", W11_REASON),
    ],
  },
  {
    subsystem: "Furnace",
    positive: "attached externally started native Run status/events",
    negative: "observer close issues no stop; ambiguous start no duplicate",
    halves: [
      gate("positive-observer", "positive", "attached externally started native Run status/events", [
        pin("workbench-furnace-observer.test.ts", "reads native Run, Attempt and bounded log reference without promoting output or owning the Run"),
      ]),
      live("positive-external", "positive", "attached externally started native Run status/events", "furnace-observe", [
        pin("workbench-external-furnace.test.ts", "attaches to the existing Run, retains native identities, and leaves both stores byte-identical"),
      ]),
      gate("negative-close", "negative", "observer close issues no stop", [
        pin("workbench-furnace-control.test.ts", "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb"),
      ]),
      // The landed W18-C hosted start (wb-zmd): a timed-out start reads uncertain, the host closes and a blind second start
      // is refused with one attempt made, through an injected Furnace client (no live Furnace pass is claimed). The W09
      // provider invoke start (wb-s8a) is unlanded and is not what this pin binds.
      gate("negative-start", "negative", "ambiguous start no duplicate", [
        pin("workbench-furnace-hosted.test.ts", "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start"),
      ]),
    ],
  },
  {
    subsystem: "Forge",
    positive: "gate on exact candidate/basis with producer verdict",
    negative: "source basis changed -> no PASS",
    halves: [
      gate("positive", "positive", "gate on exact candidate/basis with producer verdict", [
        pin("workbench-forge-observer.test.ts", "F2: a current failed gate stays failed despite transport success, and current success is success"),
      ]),
      gate("negative", "negative", "source basis changed -> no PASS", [
        pin("workbench-forge-contract.test.ts", "preserves last_result as historical, not verified candidate"),
        pin("workbench-forge-evidence.test.ts", "C2: authoritative_current=false stays historical and indeterminate, never current verification"),
      ]),
    ],
  },
  {
    subsystem: "HX",
    positive: "complete query and bounded result",
    negative: "partial/unknown not known-empty",
    halves: [
      gate("positive", "positive", "complete query and bounded result", [
        pin("workbench-hyperunix-observer.test.ts", "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success"),
        pin("workbench-hyperunix-observer.test.ts", "keeps a provider-failed result failed and reads a runtime-licensed complete-empty result as the one known-empty success"),
      ]),
      gate("negative", "negative", "partial/unknown not known-empty", [
        pin("workbench-hyperunix-observer.test.ts", "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
      ]),
      live("negative-native", "negative", "partial/unknown not known-empty", "native-read", [
        pin("workbench-ecosystem-native.test.ts", "HX partial coverage remains incomplete and does not license absence"),
        pin("workbench-native-ecosystem.test.ts", "HX typed query retains incomplete coverage and binary identity"),
      ]),
    ],
  },
  {
    subsystem: "RF",
    positive: "genuine context render and provenance",
    negative: "static substitute not misreported as render",
    halves: [
      gate("positive-observer", "positive", "genuine context render and provenance", [
        pin("workbench-reactivefiber-observer.test.ts", "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference"),
      ]),
      live("positive-preview", "positive", "genuine context render and provenance", "rf-preview", [
        pin("workbench-native-rf-preview.test.ts", "returns noncommitted text and graph provenance with no durable render ID"),
      ]),
      gate("negative", "negative", "static substitute not misreported as render", [
        pin("workbench-reactivefiber-observer.test.ts", "R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render"),
      ]),
    ],
  },
  {
    subsystem: "Journal",
    positive: "safe matching prefix semantics",
    negative: "effectful SDK node not blindly replayed",
    halves: [
      gate("positive", "positive", "safe matching prefix semantics", [
        pin("workflow-journal.test.ts", "replays an identical run without spawning anything"),
        pin("workflow-journal.test.ts", "stops replaying after a changed call even when a later one still matches"),
      ]),
      gate("negative", "negative", "effectful SDK node not blindly replayed", [
        pin("workbench-local-detached-effects.test.ts", "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer"),
        pin("workflow-effect-replay.test.ts", "journals a non-read node as the effect it was, without a replayable payload"),
        pin("workflow-effect-replay.test.ts", "never re-runs a journaled write because the basis changed"),
      ]),
    ],
  },
  {
    subsystem: "Observation",
    positive: "snapshots, dedup, cursor resume, provenance",
    negative: "event loss -> stale and unknown",
    halves: [
      gate("positive", "positive", "snapshots, dedup, cursor resume, provenance", [
        pin("workbench-observation.test.ts", "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
        pin("workbench-observation.test.ts", "uses provider-qualified native keys, preserves native failure and does not infer ownership"),
      ]),
      gate("negative", "negative", "event loss -> stale and unknown", [
        pin("workbench-observation.test.ts", "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
        pin("workbench-detached-observer.test.ts", "reports a host-lost reading as unknown and stale, never as a replayed terminal verdict"),
      ]),
    ],
  },
  {
    subsystem: "Security",
    positive: "authorized narrow provider tool used",
    negative: "script crafted RPC cannot escalate rights",
    halves: [
      gate("positive", "positive", "authorized narrow provider tool used", [
        pin("workbench-claude-role-tools.test.ts", "adds only curated role MCP tools to actual SDK options without provider auto-grants"),
        pin("workbench-registry-auth.test.ts", "inspect is independently granted and preserves native unknown fields"),
      ]),
      gate("negative", "negative", "script crafted RPC cannot escalate rights", [
        pin("workbench-registry-auth.test.ts", "closes the script-side raw RPC vehicle while host authorization stays typed"),
        pin("workbench-registry-auth.test.ts", "copies caller grants before asynchronous dispatch and never escalates another caller"),
        pin("workflow-meta.test.ts", "cannot reach host globals from the meta fragment"),
      ]),
    ],
  },
  {
    subsystem: "UI",
    positive: "80x24/120x40/very narrow layouts",
    negative: "overflowing escape/wide glyph no corruption",
    halves: [
      gate("positive-80x24", "positive", "80x24/120x40/very narrow layouts", [
        pin("workbench-inspector.test.ts", "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18"),
        pin("workbench-terminal-geometry.test.ts", "inspector truncation is explicit: a page larger than the viewport names its remainder", { suite: [GEOMETRY_SUITE, "80 x 24"] }),
      ]),
      gate("positive-120x40", "positive", "80x24/120x40/very narrow layouts", [
        pin("workbench-terminal-geometry.test.ts", "inspector truncation is explicit: a page larger than the viewport names its remainder", { suite: [GEOMETRY_SUITE, "120 x 40"] }),
      ]),
      gate("negative", "negative", "overflowing escape/wide glyph no corruption", [
        pin("workbench-evidence-loader.test.ts", "strips terminal escapes, bidi and zero-width characters from preview lines"),
        pin("workbench-control-degradation.test.ts", "adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason"),
        pin("workflow-dialog.test.ts", "counts wide characters rather than code points"),
        pin("workbench-timeline.test.ts", "keeps a credential glued to an escape redacted, never splits a surrogate pair and falls back to the reference for invisible text"),
        pin("workbench-inspector.test.ts", "caps viewport, terminal width and unsafe text, ASCII=%s", { each: { minCases: 2 } }),
      ]),
    ],
  },
  {
    subsystem: "Designer",
    positive: "reproducible before/after with native references",
    negative: "changed model/basis flagged as confound",
    halves: [
      gate("positive", "positive", "reproducible before/after with native references", [
        pin("workbench-designer.test.ts", "source changes are explicit independent variables, not config confounds"),
        pin("workbench-identity.test.ts", "separates definition, deployment, logical request, subject basis and native reference"),
      ]),
      gate("negative", "negative", "changed model/basis flagged as confound", [
        pin("workbench-designer.test.ts", "names a mismatched subject basis (principal + workspace source) as a confound"),
        pin("workbench-designer.test.ts", "an unmeasured workspace source state is a named confound even when subject basis digests coincide"),
        pin("workbench-pi-designer.test.ts", "names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis"),
      ]),
    ],
  },
]);

const ROW_IDS: readonly string[] = TABLE.map(row => row.subsystem);
const EXPECTED_ROW_IDS: readonly string[] = ["Claude SDK host", "Legacy scripts", "node()", "MechanicalWorkflows", "Furnace", "Forge", "HX", "RF", "Journal", "Observation", "Security", "UI", "Designer"];
/** Rule 16 (frozen shape): each row's half ids with their pin counts, as a literal derived from the table at the cut's base. */
const EXPECTED_SHAPE: readonly string[] = [
  "Claude SDK host:positive=2,negative=2",
  "Legacy scripts:positive=2,negative=1",
  "node():positive=1,negative=4",
  "MechanicalWorkflows:positive=0,negative=0",
  "Furnace:positive-observer=1,positive-external=1,negative-close=1,negative-start=1",
  "Forge:positive=1,negative=2",
  "HX:positive=2,negative=1,negative-native=2",
  "RF:positive-observer=1,positive-preview=1,negative=1",
  "Journal:positive=2,negative=3",
  "Observation:positive=2,negative=2",
  "Security:positive=2,negative=3",
  "UI:positive-80x24=2,positive-120x40=1,negative=5",
  "Designer:positive=2,negative=3",
];
const PIN_COUNT = 54;
/** Every half no landed case binds, as "subsystem/half"; a seat that lands a case flips the half consciously and edits this list. */
const EXPECTED_UNPINNED: readonly string[] = ["MechanicalWorkflows/positive", "MechanicalWorkflows/negative"];
/** Every half whose only judge is a non-default tier, as "subsystem/half": recorded with its tier, judged by no report this leg reads. */
const EXPECTED_LIVE: readonly string[] = ["Furnace/positive-external", "HX/negative-native", "RF/positive-preview"];
/** Cells (subsystem/which) whose pins are ALL live-tier or none: never counted as judged by the default report. */
const EXPECTED_UNJUDGED_CELLS: readonly string[] = ["MechanicalWorkflows/positive", "MechanicalWorkflows/negative"];
/**
 * FROZEN SHAPE (rule 16; the g8-gate-s4 U1 cure): every pin's identity - "subsystem/half/position tier file > title", plus
 * its bound describe path and its it.each minimum where the row binds one - in table order, copied from the TABLE at the
 * cut base fef0371. A pin swapped for an unrelated passing case of the same file (CT3), a pin replaced by a copy of its
 * neighbour (CT11), a moved pin, a re-bound suite or a lowered each minimum reds AC1, though judge() would pass every case.
 */
const FROZEN_PINS: readonly string[] = [
  "Claude SDK host/positive/1 default-gate test/workbench-host-contract.test.ts > L3: parallel schema agents return object values from native SDK structured_output",
  "Claude SDK host/positive/2 default-gate test/workbench-claude-adverse-faults.test.ts > control: a conforming structured_output succeeds and the text is its JSON",
  "Claude SDK host/negative/1 default-gate test/workbench-host-contract.test.ts > L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
  "Claude SDK host/negative/2 default-gate test/workbench-claude-cancel-faults.test.ts > F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched",
  "Legacy scripts/positive/1 default-gate test/workflow-claude-code-compat.test.ts > runs the canonical review-changes example",
  "Legacy scripts/positive/2 default-gate test/workflow-examples.test.ts > ships at least the examples the guide links",
  "Legacy scripts/negative/1 default-gate test/workflow-runtime.test.ts > names a misspelt option rather than ignoring it",
  "node()/positive/1 default-gate test/workbench-forge-observer.test.ts > projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference",
  "node()/negative/1 default-gate test/workbench-node-contract.test.ts > L4: unknown capability and duplicate descriptor fail explicitly",
  "node()/negative/2 default-gate test/workbench-node-contract.test.ts > L4: unauthorized invocation denied at host even with known capability id",
  "node()/negative/3 default-gate test/workbench-node-limits.test.ts > refuses oversized input before native provider is called",
  "node()/negative/4 default-gate test/workbench-control-degradation.test.ts > a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider",
  "Furnace/positive-observer/1 default-gate test/workbench-furnace-observer.test.ts > reads native Run, Attempt and bounded log reference without promoting output or owning the Run",
  "Furnace/positive-external/1 furnace-observe test/workbench-external-furnace.test.ts > attaches to the existing Run, retains native identities, and leaves both stores byte-identical",
  "Furnace/negative-close/1 default-gate test/workbench-furnace-control.test.ts > closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
  "Furnace/negative-start/1 default-gate test/workbench-furnace-hosted.test.ts > treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start",
  "Forge/positive/1 default-gate test/workbench-forge-observer.test.ts > F2: a current failed gate stays failed despite transport success, and current success is success",
  "Forge/negative/1 default-gate test/workbench-forge-contract.test.ts > preserves last_result as historical, not verified candidate",
  "Forge/negative/2 default-gate test/workbench-forge-evidence.test.ts > C2: authoritative_current=false stays historical and indeterminate, never current verification",
  "HX/positive/1 default-gate test/workbench-hyperunix-observer.test.ts > H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success",
  "HX/positive/2 default-gate test/workbench-hyperunix-observer.test.ts > keeps a provider-failed result failed and reads a runtime-licensed complete-empty result as the one known-empty success",
  "HX/negative/1 default-gate test/workbench-hyperunix-observer.test.ts > H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty",
  "HX/negative-native/1 native-read test/workbench-ecosystem-native.test.ts > HX partial coverage remains incomplete and does not license absence",
  "HX/negative-native/2 native-read test/workbench-native-ecosystem.test.ts > HX typed query retains incomplete coverage and binary identity",
  "RF/positive-observer/1 default-gate test/workbench-reactivefiber-observer.test.ts > R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference",
  "RF/positive-preview/1 rf-preview test/workbench-native-rf-preview.test.ts > returns noncommitted text and graph provenance with no durable render ID",
  "RF/negative/1 default-gate test/workbench-reactivefiber-observer.test.ts > R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render",
  "Journal/positive/1 default-gate test/workflow-journal.test.ts > replays an identical run without spawning anything",
  "Journal/positive/2 default-gate test/workflow-journal.test.ts > stops replaying after a changed call even when a later one still matches",
  "Journal/negative/1 default-gate test/workbench-local-detached-effects.test.ts > neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer",
  "Journal/negative/2 default-gate test/workflow-effect-replay.test.ts > journals a non-read node as the effect it was, without a replayable payload",
  "Journal/negative/3 default-gate test/workflow-effect-replay.test.ts > never re-runs a journaled write because the basis changed",
  "Observation/positive/1 default-gate test/workbench-observation.test.ts > deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
  "Observation/positive/2 default-gate test/workbench-observation.test.ts > uses provider-qualified native keys, preserves native failure and does not infer ownership",
  "Observation/negative/1 default-gate test/workbench-observation.test.ts > disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "Observation/negative/2 default-gate test/workbench-detached-observer.test.ts > reports a host-lost reading as unknown and stale, never as a replayed terminal verdict",
  "Security/positive/1 default-gate test/workbench-claude-role-tools.test.ts > adds only curated role MCP tools to actual SDK options without provider auto-grants",
  "Security/positive/2 default-gate test/workbench-registry-auth.test.ts > inspect is independently granted and preserves native unknown fields",
  "Security/negative/1 default-gate test/workbench-registry-auth.test.ts > closes the script-side raw RPC vehicle while host authorization stays typed",
  "Security/negative/2 default-gate test/workbench-registry-auth.test.ts > copies caller grants before asynchronous dispatch and never escalates another caller",
  "Security/negative/3 default-gate test/workflow-meta.test.ts > cannot reach host globals from the meta fragment",
  "UI/positive-80x24/1 default-gate test/workbench-inspector.test.ts > always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18",
  "UI/positive-80x24/2 default-gate test/workbench-terminal-geometry.test.ts > inspector truncation is explicit: a page larger than the viewport names its remainder {suite release checklist item 8: deterministic terminal geometry > 80 x 24}",
  "UI/positive-120x40/1 default-gate test/workbench-terminal-geometry.test.ts > inspector truncation is explicit: a page larger than the viewport names its remainder {suite release checklist item 8: deterministic terminal geometry > 120 x 40}",
  "UI/negative/1 default-gate test/workbench-evidence-loader.test.ts > strips terminal escapes, bidi and zero-width characters from preview lines",
  "UI/negative/2 default-gate test/workbench-control-degradation.test.ts > adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason",
  "UI/negative/3 default-gate test/workflow-dialog.test.ts > counts wide characters rather than code points",
  "UI/negative/4 default-gate test/workbench-timeline.test.ts > keeps a credential glued to an escape redacted, never splits a surrogate pair and falls back to the reference for invisible text",
  "UI/negative/5 default-gate test/workbench-inspector.test.ts > caps viewport, terminal width and unsafe text, ASCII=%s {each min 2}",
  "Designer/positive/1 default-gate test/workbench-designer.test.ts > source changes are explicit independent variables, not config confounds",
  "Designer/positive/2 default-gate test/workbench-identity.test.ts > separates definition, deployment, logical request, subject basis and native reference",
  "Designer/negative/1 default-gate test/workbench-designer.test.ts > names a mismatched subject basis (principal + workspace source) as a confound",
  "Designer/negative/2 default-gate test/workbench-designer.test.ts > an unmeasured workspace source state is a named confound even when subject basis digests coincide",
  "Designer/negative/3 default-gate test/workbench-pi-designer.test.ts > names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis",
];
/** FROZEN SHAPE (rule 16; the g8-gate-s4 U2 cure): the judged subset as "subsystem/half:pins", in table order - exactly the halves the AC2 it.each judges. */
const FROZEN_JUDGED_SHAPE: readonly string[] = [
  "Claude SDK host/positive:2",
  "Claude SDK host/negative:2",
  "Legacy scripts/positive:2",
  "Legacy scripts/negative:1",
  "node()/positive:1",
  "node()/negative:4",
  "Furnace/positive-observer:1",
  "Furnace/negative-close:1",
  "Furnace/negative-start:1",
  "Forge/positive:1",
  "Forge/negative:2",
  "HX/positive:2",
  "HX/negative:1",
  "RF/positive-observer:1",
  "RF/negative:1",
  "Journal/positive:2",
  "Journal/negative:3",
  "Observation/positive:2",
  "Observation/negative:2",
  "Security/positive:2",
  "Security/negative:3",
  "UI/positive-80x24:2",
  "UI/positive-120x40:1",
  "UI/negative:5",
  "Designer/positive:2",
  "Designer/negative:3",
];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const halfName = (row: Row, half: Half): string => `${row.subsystem}/${half.id}`;
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.subsystem}:${row.halves.map(half => `${half.id}=${half.pins.length}`).join(",")}`);
const pinIdentity = (row: Row, half: Half, entry: Pin, index: number): string =>
  `${row.subsystem}/${half.id}/${index + 1} ${half.tier} ${entry.file} > ${entry.title}${entry.suite === undefined ? "" : ` {suite ${entry.suite.join(" > ")}}`}${entry.each === undefined ? "" : ` {each min ${entry.each.minCases}}`}`;
const pinIdentities = (rows: readonly Row[]): string[] => rows.flatMap(row => row.halves.flatMap(half => half.pins.map((entry, index) => pinIdentity(row, half, entry, index))));
const suiteKey = (entry: Pin): string => (entry.suite ?? []).join(" > ");
/** Every (file, title, suite) a half pins more than once, as "subsystem/half: file > title"; the frozen table holds none. */
const duplicatePins = (rows: readonly Row[]): string[] =>
  rows.flatMap(row =>
    row.halves.flatMap(half =>
      half.pins
        .filter((entry, index) => half.pins.findIndex(other => other.file === entry.file && other.title === entry.title && suiteKey(other) === suiteKey(entry)) !== index)
        .map(entry => `${halfName(row, half)}: ${entry.file} > ${entry.title}`),
    ),
  );

/** The forge.toml command whose own run must vouch for a half. */
const tierCommand = (half: Half): string => (half.tier === "default-gate" ? DEFAULT_GATE_TIER : half.tier);
const casePin = (half: Half, entry: Pin): CasePin => ({
  file: entry.file,
  title: entry.title,
  tier: tierCommand(half),
  ...(entry.suite === undefined ? {} : { suite: entry.suite }),
  ...(entry.each === undefined ? {} : { each: entry.each }),
});

/** The default-gate halves that hold pins, in table order. */
const JUDGED = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row, half })));
const LIVE_HALVES = TABLE.flatMap(row => row.halves.filter(half => half.tier !== "default-gate").map(half => ({ row, half })));
const allPins = (): Pin[] => TABLE.flatMap(row => row.halves.flatMap(half => [...half.pins]));
const judgedKey = ({ row, half }: { readonly row: Row; readonly half: Half }): string => `${row.subsystem}/${half.id}:${half.pins.length}`;
const judgedShape = (judged: readonly { readonly row: Row; readonly half: Half }[]): string[] => judged.map(judgedKey);
/** The judged halves whose AC2 case ran in this file's run (judgedKey) and the live halves whose AC4 case ran (halfName); the afterAll binds both call sites. */
const AC2_RAN: string[] = [];
const AC4_RAN: string[] = [];
const sorted = (values: readonly string[]): string[] => [...values].sort((a, b) => a.localeCompare(b));
/**
 * The explicit budget of every judging case in this file (the landed wb-6hb.9 R546 shape), file-local so no other census
 * file's budget moves: no judging case rides vitest's default 5000 ms. Each judge() call re-reads and re-validates the
 * whole report, so its cost grows with the full default report the gate's census step reads. Sized as 5 x the larger of
 * two measurements of the costliest judging case, rounded up to a whole 5 s: this respin's 16 runs of this file alone
 * (2026-10-20, 8 sequential and 8 at 2-way, against the targeted 33-pinned-file default-tier report, load1 169.6-206.5):
 * AC2 Designer/negative min 919 ms, median 1103 ms, p99 1539 ms, 0 of 16 runs above 5000 ms; and the g8-gate-s4
 * census-tier run over the gate's own full report (load1 ~460-516, 8 workers), this file's worst row 2656 ms.
 * 5 x 2656 ms = 13280 ms, rounded up to 15000 ms.
 */
const JUDGE_BUDGET_MS = 15_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The cases that carry JUDGING: AC2 per judged half (26), AC4 per live half (3), and M1, M3, M4, M5 and O1. */
const JUDGING_CASES = 34;

/** One line per pin that is not ok, naming the row, the cell and the half; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, half: Half, verdicts: readonly PinVerdict[]): string[] =>
  verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.subsystem}/${half.which} (${half.id}): ${verdict.code}: ${verdict.why}`);

// ---- tier truth (U3): a non-default label is a claim about forge.toml AND the config module it names ----

interface ConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}
/** Whether a vitest config module selects a repository-relative file: an include entry matches and no exclude entry does. */
function selects(config: ConfigShape, file: string): boolean {
  const include = config.test?.include ?? [];
  const exclude = config.test?.exclude ?? [];
  return include.some(glob => matchesGlob(file, glob)) && !exclude.some(glob => matchesGlob(file, glob));
}
const TIER_CONFIGS: Readonly<Record<string, { readonly config: ConfigShape; readonly file: string }>> = {
  "furnace-observe": { config: furnaceConfig, file: "vitest.furnace.config.ts" },
  "native-read": { config: nativeConfig, file: "vitest.native.config.ts" },
  "rf-preview": { config: rfConfig, file: "vitest.rf.config.ts" },
};
/** The tier-truth failures of one live pin: forge.toml resolves the tier to the config, the config selects the file, the default config does not. */
function tierFailures(tier: string, file: string, config: ConfigShape = TIER_CONFIGS[tier]?.config ?? {}, defaultCfg: ConfigShape = defaultConfig): string[] {
  const out: string[] = [];
  const configFile = TIER_CONFIGS[tier]?.file ?? "(no config named for this tier)";
  const resolved = resolveTier(ROOT, tier);
  if (!resolved.ok) out.push(`tier ${tier}: forge.toml does not resolve it: ${resolved.why}`);
  else if (!resolved.argv.includes(configFile)) out.push(`tier ${tier}: its forge.toml command does not name ${configFile}: ${resolved.command}`);
  if (!selects(config, file)) out.push(`tier ${tier}: its config ${configFile} does not select ${file}`);
  if (selects(defaultCfg, file)) out.push(`tier ${tier}: the default config also selects ${file}, so the default report would carry it`);
  return out;
}

// ---- docs: the whole section as its frozen table, and the spec's falsifier sentence ----

const GRID: readonly (readonly string[])[] = [HEADER_CELLS, ...TABLE.map(row => [row.subsystem, row.positive, row.negative])];
const TABLE_TEXT = GRID.map(cells => cells.join(" ")).join(" ");
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "other", type: "table", text: TABLE_TEXT }];
const GRID_MARKDOWN = [`| ${HEADER_CELLS.join(" | ")} |`, "| --- | --- | --- |", ...TABLE.map(row => `| ${row.subsystem} | ${row.positive} | ${row.negative} |`)].join("\n");
/** The docs/14 paragraph that carries the falsifier sentence, at the cut base: the first block of "Truth labels and release gates". */
const TRUTH_PARAGRAPH = `Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". ${FALSIFIER_SENTENCE}`;
const TRUTH_BLOCK: RenderedBlock = { kind: "paragraph", text: TRUTH_PARAGRAPH, markdown: TRUTH_PARAGRAPH };

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** The cell grid of every table in the document whose header is the matrix header; the doc must hold exactly one. */
function matrixGrids(markdown: string): string[][][] {
  return marked
    .lexer(markdown)
    .filter(isTable)
    .map(token => [token.header.map(cell => cell.text), ...token.rows.map(row => row.map(cell => cell.text))])
    .filter(grid => grid[0]?.join("|") === HEADER_CELLS.join("|"));
}

/**
 * Every docs drift, each naming the row and cell or the section it breaks. The per-cell checks read the table's own cell
 * grid and run independently of the section exactness check, so a reworded or dropped cell names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
  } else {
    const exact = sectionMatches(section, SECTION_BLOCKS);
    if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen table: ${exact.why}`);
  }
  const grids = matrixGrids(markdown);
  if (grids.length !== 1) {
    out.push(`${DOCS_FILE}: the matrix table must occur exactly once; found ${grids.length}`);
    return out;
  }
  const grid = grids[0] ?? [];
  if (grid.length !== GRID.length) out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the table has ${grid.length - 1} rows; the census pins ${GRID.length - 1}`);
  for (const [index, row] of TABLE.entries()) {
    const cells = grid[index + 1];
    if (cells === undefined) {
      out.push(`row ${row.subsystem}: its row is missing from ${DOCS_FILE} § ${DOCS_HEADING}`);
      continue;
    }
    if (cells.length !== 3) out.push(`row ${row.subsystem}: its row has ${cells.length} columns; the table has 3`);
    if (cells[0] !== row.subsystem) out.push(`row ${row.subsystem}: its subsystem cell reads "${cells[0] ?? ""}"`);
    if (cells[1] !== row.positive) out.push(`row ${row.subsystem}/positive: its cell reads "${cells[1] ?? ""}", not "${row.positive}"`);
    if (cells[2] !== row.negative) out.push(`row ${row.subsystem}/negative: its cell reads "${cells[2] ?? ""}", not "${row.negative}"`);
  }
  if (grid.some(cells => cells.length !== 3)) out.push(`${DOCS_FILE} § ${DOCS_HEADING}: every table row must have exactly 3 columns`);
  return out;
}

/**
 * The falsifier sentence is pinned as the exact first paragraph of its unique section (the landed wb-cax.27 shape), HTML
 * refused: a modifier inside the sentence (DT1), an exemption sentence before it (DT2) or after it (DT4) in its paragraph,
 * and a reworded or dropped sentence (DT5) all read red. NAMED RESIDUAL TRUTH-SECTION-TAIL: a paragraph added after it in
 * the section (DT3) is not judged here; the section-bounded pin of that section is wb-6ze.38's.
 */
function truthFailures(markdown: string): string[] {
  const section = docsSection(markdown, TRUTH_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) return [`${DOCS_FILE} § ${TRUTH_HEADING}: the section is refused: ${section.why}`];
  if (section.hasHtml) return [`${DOCS_FILE} § ${TRUTH_HEADING}: the section carries HTML`];
  const exact = sectionMatches({ ...section, blocks: section.blocks.slice(0, 1) }, [TRUTH_BLOCK]);
  return exact.ok ? [] : [`${DOCS_FILE} § ${TRUTH_HEADING}: the falsifier paragraph is not exact: ${exact.why}`];
}

/** The synthetic document the drift falsifiers run over: the frozen grid under the real heading shape, never the live text. */
const synthetic = (edit: (grid: string) => string = grid => grid, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Test classes\n\nClasses.\n\n## ${DOCS_HEADING}\n\n${edit(GRID_MARKDOWN)}\n${tail}\n## Fault-injection locations\n\nLocations.\n\n## ${TRUTH_HEADING}\n\n${TRUTH_PARAGRAPH}\n\nUse Forge build/test/gates as primary interface.\n`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));
const swap = (from: string, to: string) => (grid: string): string => grid.replace(from, to);

describe("wb-cax.25 docs/workbench/14 matrix-by-subsystem census (report mode)", () => {
  it("AC1: the table holds the thirteen frozen rows in order, deeply frozen, and every half carries its quote's cell text", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(ROW_IDS).toEqual(EXPECTED_ROW_IDS);
    expect(TABLE).toHaveLength(13);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    for (const row of TABLE) {
      for (const which of ["positive", "negative"] as const) {
        const halves = row.halves.filter(half => half.which === which);
        expect(halves.length, `row ${row.subsystem}/${which}: a cell holds at least one half`).toBeGreaterThan(0);
        expect([...new Set(halves.map(half => half.claim))].join("; "), `row ${row.subsystem}/${which}: its halves' claims, joined, are the docs/14 cell`).toBe(which === "positive" ? row.positive : row.negative);
      }
    }
  });

  it("AC1 (rule 16): the frozen shape - every row's half ids and pin counts - is an exact literal, so a dropped pin or half goes red", () => {
    expect(shapeOf(TABLE)).toEqual(EXPECTED_SHAPE);
    expect(allPins()).toHaveLength(PIN_COUNT);
  });

  it("AC1 frozen shape (rule 16): every pin's identity is the literal list, so a pin swapped for an unrelated passing case reds it", () => {
    expect(pinIdentities(TABLE), "every pin's subsystem, half, position, tier, file, title, suite and each minimum").toEqual(FROZEN_PINS);
  });

  it("AC1 frozen shape (rule 16): no half pins one case twice, so a pin replaced by a copy of its neighbour reds it", () => {
    expect(duplicatePins(TABLE), "a (file, title, suite) triple occurs at most once per half").toEqual([]);
  });

  it("AC1 frozen shape (rule 16): the judged subset is the literal list, so a narrowed judged predicate reds it", () => {
    expect(judgedShape(JUDGED), "the judged subset: the AC2 it.each table").toEqual(FROZEN_JUDGED_SHAPE);
  });

  it("AC1 counts at the cut base: 54 pin entries = 50 judged default-gate pins in 26 halves over 33 files + 4 recorded live-tier pins in 3 halves", () => {
    const judgedPins = JUDGED.flatMap(({ half }) => [...half.pins]);
    expect(judgedPins).toHaveLength(50);
    expect(new Set(judgedPins.map(entry => `${entry.file} > ${entry.title} > ${suiteKey(entry)}`)).size, "every judged (file, title, suite) is distinct").toBe(50);
    expect(new Set(judgedPins.map(entry => `${entry.file} > ${entry.title}`)).size, "the geometry case is bound once per suite row (80 x 24, 120 x 40)").toBe(49);
    expect(new Set(judgedPins.map(entry => entry.file)).size).toBe(33);
    expect(LIVE_HALVES.flatMap(({ half }) => [...half.pins])).toHaveLength(4);
  });

  it("AC1: the live section renders exactly its one frozen table (HTML-free) whose grid equals the census's, and the falsifier sentence closes its paragraph", () => {
    const markdown = readRepo(DOCS_FILE);
    const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(matrixGrids(markdown)).toEqual([GRID.map(cells => [...cells])]);
    expect(truthFailures(markdown)).toEqual([]);
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the four", () => {
    for (const row of TABLE) {
      for (const half of row.halves) {
        expect(["default-gate", "furnace-observe", "native-read", "rf-preview"], `row ${halfName(row, half)}: tier`).toContain(half.tier);
        if (half.reason === undefined) expect(half.pins.length, `row ${halfName(row, half)}: a pinned half has pins`).toBeGreaterThan(0);
        else {
          expect(half.pins, `row ${halfName(row, half)}: an unpinned half carries no pins`).toEqual([]);
          expect(half.tier, `row ${halfName(row, half)}: an unpinned half is a default-gate half`).toBe("default-gate");
          expect(half.reason.trim().length, `row ${halfName(row, half)}: an unpinned half needs a reason`).toBeGreaterThan(40);
          expect(half.reason, `row ${halfName(row, half)}: it is never counted as passed`).toContain("never counted as passed");
        }
      }
    }
  });

  it("AC3: the unpinned halves, the live-only halves and the unjudged cells are listed so none is ever counted as passed; the reasons name the open beads", () => {
    const listed = TABLE.flatMap(row => row.halves.filter(half => half.reason !== undefined).map(half => halfName(row, half)));
    expect(listed).toEqual(EXPECTED_UNPINNED);
    expect(LIVE_HALVES.map(({ row, half }) => halfName(row, half))).toEqual(EXPECTED_LIVE);
    const unjudged = TABLE.flatMap(row =>
      (["positive", "negative"] as const).filter(which => !row.halves.some(half => half.which === which && half.tier === "default-gate" && half.pins.length > 0)).map(which => `${row.subsystem}/${which}`),
    );
    expect(unjudged).toEqual(EXPECTED_UNJUDGED_CELLS);
    const reason = (row: string, id: string): string => TABLE.find(entry => entry.subsystem === row)?.halves.find(half => half.id === id)?.reason ?? "";
    expect(reason("MechanicalWorkflows", "positive")).toContain("wb-04s");
    expect(reason("MechanicalWorkflows", "negative")).toContain("wb-w12");
    expect(reason("Furnace", "negative-start"), "the Furnace ambiguous-start half is pinned, so it carries no unpinned reason").toBe("");
  });

  it("AC3: the half-coverage splits are in place - the Furnace negative control is split (close and start, each bound), the wide-glyph and 120x40 halves are pinned", () => {
    const furnace = TABLE.find(row => row.subsystem === "Furnace");
    expect(furnace?.halves.filter(half => half.which === "negative").map(half => `${half.claim}|${half.pins.length}`)).toEqual(["observer close issues no stop|1", "ambiguous start no duplicate|1"]);
    expect(furnace?.halves.find(half => half.id === "negative-start")?.pins.map(entry => `${entry.file} > ${entry.title}`), "the ambiguous-start half binds the landed W18-C hosted start case").toEqual([
      "test/workbench-furnace-hosted.test.ts > treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start",
    ]);
    const ui = TABLE.find(row => row.subsystem === "UI");
    expect(ui?.halves.find(half => half.id === "negative")?.pins.map(entry => entry.file)).toContain("test/workflow-dialog.test.ts");
    expect(ui?.halves.find(half => half.id === "positive-120x40")?.pins.map(entry => entry.suite)).toEqual([[GEOMETRY_SUITE, "120 x 40"]]);
  });

  afterAll(() => {
    expect(sorted(AC2_RAN), "every frozen judged half ran its AC2 case exactly once").toEqual(sorted(FROZEN_JUDGED_SHAPE));
    expect(sorted(AC4_RAN), "every live half ran its AC4 case exactly once").toEqual(sorted(EXPECTED_LIVE));
  });

  it.each(JUDGED)("AC2 row $row.subsystem/$half.which ($half.id): every pinned case is collected once, passed and asserting in the default gate's own report", JUDGING, ({ row, half }) => {
    AC2_RAN.push(judgedKey({ row, half }));
    const verdicts = judge(
      REPORT,
      half.pins.map(entry => casePin(half, entry)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(row, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it.each(LIVE_HALVES)("AC4 row $row.subsystem ($half.id): the $half.tier label is true - forge.toml resolves it, its config selects the file, the default config excludes it, and no default report holds it", JUDGING, ({ row, half }) => {
    AC4_RAN.push(halfName(row, half));
    const tier = half.tier as Exclude<Tier, "default-gate">;
    expect(half.pins.length).toBeGreaterThan(0);
    for (const entry of half.pins) {
      expect(tierFailures(tier, entry.file), `${entry.file}`).toEqual([]);
      const [asTier] = judge(REPORT, [casePin(half, entry)]);
      expect(asTier?.code, `${entry.file}: a ${tier} pin is never carried by the default report`).toBe("tier-mismatch");
      const [asDefault] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER }]);
      expect(asDefault?.code, `${entry.file}: the live file is not in the default gate's report`).toBe("not-collected");
    }
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, spawns no process and loads no pinned module", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = allPins().map(entry => basename(entry.file, ".ts"));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("exactly the judging cases carry the file-local budget, and it is never vitest's default 5000 ms", ({ task }) => {
    const timeouts: number[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") timeouts.push(child.timeout);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(timeouts.filter(timeout => timeout === JUDGE_BUDGET_MS), "the cases that run under JUDGE_BUDGET_MS").toHaveLength(JUDGING_CASES);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-cax.25 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const first = (subsystem: string, id: string): { row: Row; half: Half; entry: Pin } => {
    const row = TABLE.find(candidate => candidate.subsystem === subsystem);
    const half = row?.halves.find(candidate => candidate.id === id);
    const entry = half?.pins[0];
    if (row === undefined || half === undefined || entry === undefined) throw new Error(`row ${subsystem}/${id} holds no pin`);
    return { row, half, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the cell, the file and the title", JUDGING, () => {
    const { row, half, entry } = first("Security", "negative");
    const wrong = { ...entry, title: entry.title.replace("typed", "typeD") };
    const verdicts = judge(REPORT, [casePin(half, wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, half, verdicts);
    expect(line).toContain("row Security/negative (negative)");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin, and a pin removed from a multi-pin half fails the frozen-shape and pin-identity literals", () => {
    expect(TABLE.filter(row => row.subsystem !== "Forge").map(row => row.subsystem)).not.toEqual(EXPECTED_ROW_IDS);
    const hollowed = TABLE.map(row => (row.subsystem === "Security" ? { ...row, halves: row.halves.map(half => (half.id === "negative" ? { ...half, pins: half.pins.slice(1) } : half)) } : row));
    expect(shapeOf(hollowed)).not.toEqual(EXPECTED_SHAPE);
    expect(pinIdentities(hollowed)).not.toEqual(FROZEN_PINS);
  });

  it("M7 (CT3): a pin swapped for an unrelated passing case of its own file keeps the count shape and is red only by the frozen pin identity", () => {
    const swapped = TABLE.map(row =>
      row.subsystem === "Security"
        ? { ...row, halves: row.halves.map(half => (half.id === "negative" ? { ...half, pins: half.pins.map((entry, index) => (index === 1 ? { ...entry, title: "invocation permission alone never exposes catalog metadata" } : entry)) } : half)) }
        : row,
    );
    expect(shapeOf(swapped)).toEqual(EXPECTED_SHAPE);
    expect(duplicatePins(swapped)).toEqual([]);
    expect(pinIdentities(swapped)).not.toEqual(FROZEN_PINS);
  });

  it("M8 (CT11): a pin replaced by a copy of its half's neighbour keeps the count shape and is red by the frozen pin identity and the per-half uniqueness", () => {
    const copied = TABLE.map(row =>
      row.subsystem === "Journal" ? { ...row, halves: row.halves.map(half => (half.id === "negative" ? { ...half, pins: half.pins.map((entry, index, all) => (index === 2 ? (all[1] ?? entry) : entry)) } : half)) } : row,
    );
    expect(shapeOf(copied)).toEqual(EXPECTED_SHAPE);
    expect(pinIdentities(copied)).not.toEqual(FROZEN_PINS);
    expect(duplicatePins(copied)).toEqual(["Journal/negative: test/workflow-effect-replay.test.ts > journals a non-read node as the effect it was, without a replayable payload"]);
  });

  it("M9 (CT7): a judged predicate narrowed to the multi-pin halves leaves the table and its count shape untouched and is red by the frozen judged subset", () => {
    const narrowed = TABLE.flatMap(row => row.halves.filter(half => half.tier === "default-gate" && half.pins.length > 1).map(half => ({ row, half })));
    expect(shapeOf(TABLE), "a narrowed predicate leaves the table's count shape untouched").toEqual(EXPECTED_SHAPE);
    expect(judgedShape(narrowed)).toHaveLength(16);
    expect(judgedShape(narrowed)).not.toEqual(FROZEN_JUDGED_SHAPE);
  });

  it("M10 (CTEACHMIN): an it.each pin whose minimum is lowered keeps every count and is red by the frozen pin identity", () => {
    const lowered = TABLE.map(row =>
      row.subsystem === "UI" ? { ...row, halves: row.halves.map(half => ({ ...half, pins: half.pins.map(entry => (entry.each === undefined ? entry : { ...entry, each: { minCases: 1 } })) })) } : row,
    );
    expect(shapeOf(lowered)).toEqual(EXPECTED_SHAPE);
    expect(pinIdentities(lowered)).not.toEqual(FROZEN_PINS);
  });

  it("M3: a pin with no title is red (the judge finds no such case)", JUDGING, () => {
    const { half, entry } = first("Forge", "positive");
    const [verdict] = judge(REPORT, [casePin(half, { ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a file the default config excludes is never in the default report: a default-gate pin there is red, not collected", JUDGING, () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-rf-preview.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", JUDGING, () => {
    const { half, entry } = first("Observation", "negative");
    const [verdict] = judge(REPORT, [casePin(half, { ...entry, file: "test/workbench-observation-recovery-receipt.test.ts" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a title two cells share is judged once per cell: the two registry-auth Security pins and the two designer pins stay live independently", () => {
    const security = TABLE.find(row => row.subsystem === "Security")?.halves.filter(half => half.which === "negative").flatMap(half => half.pins.map(entry => entry.title));
    expect(new Set(security).size).toBe(security?.length);
  });

  it("O1 each-liveness: a table that registers fewer rows than the pin's minimum, and a describe.each geometry row the suite no longer registers, are both red", JUDGING, () => {
    const { half, entry } = first("UI", "negative");
    const eachPin = half.pins.find(candidate => candidate.each !== undefined) ?? entry;
    const [few] = judge(REPORT, [casePin(half, { ...eachPin, each: { minCases: 3 } })]);
    expect(few?.ok).toBe(false);
    expect(few?.code).toBe("each-empty");
    const geometry = TABLE.find(row => row.subsystem === "UI")?.halves.find(candidate => candidate.id === "positive-120x40");
    const geometryPin = geometry?.pins[0];
    expect(geometry !== undefined && geometryPin !== undefined).toBe(true);
    if (geometry === undefined || geometryPin === undefined) return;
    const [gone] = judge(REPORT, [casePin(geometry, { ...geometryPin, suite: [GEOMETRY_SUITE, "200 x 50"] })]);
    expect(gone?.ok).toBe(false);
    expect(gone?.code).toBe("absent");
  });
});

describe("wb-cax.25 tier truth is read from the config modules, not from text (synthetic configs)", () => {
  const FILE = "test/workbench-external-furnace.test.ts";
  const base: ConfigShape = { test: { include: ["test/workbench-external-furnace.test.ts", "test/workbench-furnace-observer.test.ts"] } };
  const defaults: ConfigShape = { test: { include: ["test/**/*.test.ts"], exclude: [FILE] } };

  it("accepts the shape the live tiers have: the tier config selects the file and the default config excludes it", () => {
    expect(tierFailures("furnace-observe", FILE, base, defaults)).toEqual([]);
  });

  it("T1 a glob exclude entry that removes the pinned file from its own tier config goes red", () => {
    const lines = tierFailures("furnace-observe", FILE, { test: { include: base.test?.include ?? [], exclude: ["test/workbench-external-*.test.ts"] } }, defaults);
    expect(lines.some(line => line.includes("does not select"))).toBe(true);
  });

  it("T2 an include narrowed so the pinned file is no longer selected goes red", () => {
    const lines = tierFailures("furnace-observe", FILE, { test: { include: ["test/workbench-furnace-observer.test.ts"] } }, defaults);
    expect(lines.some(line => line.includes("does not select"))).toBe(true);
  });

  it("T3 a pin that the default config also selects goes red (the default report would carry it, so its tier label is false)", () => {
    const lines = tierFailures("furnace-observe", FILE, base, { test: { include: ["test/**/*.test.ts"] } });
    expect(lines.some(line => line.includes("default config also selects"))).toBe(true);
  });

  it("T4 an rf-preview pin moved from its config include into its exclude goes red", () => {
    const file = "test/workbench-native-rf-preview.test.ts";
    const lines = tierFailures("rf-preview", file, { test: { include: [file], exclude: [file] } }, { test: { include: ["test/**/*.test.ts"], exclude: [file] } });
    expect(lines.some(line => line.includes("does not select"))).toBe(true);
  });

  it("T6 the furnace-active-observe label (the first cut's false label) resolves to a different config than furnace-observe, so the relabel is not free", () => {
    const active = resolveTier(ROOT, "furnace-active-observe");
    const observe = resolveTier(ROOT, "furnace-observe");
    expect(active.ok && observe.ok).toBe(true);
    expect(active.argv).toContain("vitest.furnace-active.config.ts");
    expect(observe.argv).not.toContain("vitest.furnace-active.config.ts");
    expect(observe.argv).toContain("vitest.furnace.config.ts");
  });

  it("T5 a tier forge.toml does not declare is refused by name", () => {
    const lines = tierFailures("no-such-tier", FILE, base, defaults);
    expect(lines.some(line => line.includes("forge.toml does not resolve it"))).toBe(true);
  });
});

describe("wb-cax.25 docs drift names the row and cell or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(truthFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${GRID_MARKDOWN}\n`)).toEqual([]);
  });

  it("DC1 names the row and cell, and the section, when a cell is paraphrased", () => {
    const lines = docsFailures(synthetic(swap("source basis changed -> no PASS", "source basis changed -> maybe PASS")));
    expect(named(lines)).toEqual(["row Forge/negative"]);
    expect(lines.some(line => line.includes("is not exactly its frozen table"))).toBe(true);
  });

  it("DC2 names the row when a row is deleted", () => {
    const lines = docsFailures(synthetic(swap("\n| Designer | reproducible before/after with native references | changed model/basis flagged as confound |", "")));
    expect(lines.some(line => line.includes("the table has 12 rows"))).toBe(true);
    expect(named(lines)).toContain("row Designer");
  });

  it("DC3 names both rows when two rows swap places", () => {
    const forge = "| Forge | gate on exact candidate/basis with producer verdict | source basis changed -> no PASS |";
    const hx = "| HX | complete query and bounded result | partial/unknown not known-empty |";
    const lines = docsFailures(synthetic(grid => grid.replace(forge, "@@F@@").replace(hx, forge).replace("@@F@@", hx)));
    expect(new Set(named(lines).map(line => line.split("/")[0]))).toEqual(new Set(["row Forge", "row HX"]));
  });

  it("D1 goes red on the section when the negative-control header is renamed", () => {
    const lines = docsFailures(synthetic(swap("Negative control", "Negative controls")));
    expect(lines.some(line => line.includes("the matrix table must occur exactly once; found 0"))).toBe(true);
    expect(lines.some(line => line.includes("is not exactly its frozen table"))).toBe(true);
  });

  it("D2 goes red when a fourth column is added", () => {
    const wide = (grid: string): string => grid.split("\n").map((line, index) => (index === 0 ? `${line} Waived |` : index === 1 ? `${line} --- |` : `${line} |`)).join("\n");
    const lines = docsFailures(synthetic(wide));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("columns") || line.includes("found 0") || line.includes("not exactly"))).toBe(true);
  });

  it("D2b goes red on the section when an empty fourth column hides behind whitespace-collapsed rendering", () => {
    const wide = (grid: string): string => grid.split("\n").map((line, index) => (index === 1 ? `${line} --- |` : `${line} |`)).join("\n").replace("Negative control |", "Negative control | |");
    const lines = docsFailures(synthetic(wide));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D3 goes red on the section, naming no row, when a weakening paragraph is added inside it", () => {
    const lines = docsFailures(synthetic(grid => `${grid}\n\nA row may be waived by its owner.\n`));
    expect(named(lines)).toEqual([]);
    expect(lines.some(line => line.includes("is not exactly its frozen table"))).toBe(true);
  });

  it("D4 goes red when the section heading is retitled with a suffix", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `## ${DOCS_HEADING} (draft)`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D5 goes red when the section heading is demoted to a level-3 heading under a new level-2 heading", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `## Appendix\n\n### ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D6 goes red on the section when a level-1 heading inserted above re-homes it", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 (same-view straddle) goes red when an HTML comment opens before the Matrix heading and closes after the next heading", () => {
    const document = synthetic().replace(`## ${DOCS_HEADING}`, `<!--\n## ${DOCS_HEADING}`).replace("## Fault-injection locations", "-->\n## Fault-injection locations");
    const lines = docsFailures(document);
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D8 goes red when a cell is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(swap("| partial/unknown not known-empty |", "| <!-- partial/unknown not known-empty --> |")));
    expect(lines.some(line => line.includes("carries HTML") || line.includes("is not exactly its frozen table"))).toBe(true);
    expect(named(lines)).toContain("row HX/negative");
  });

  it("D9 (O1 falsifier sentence) goes red when an exemption sentence is appended to its paragraph, and when the sentence is dropped or reworded", () => {
    const appended = synthetic().replace(FALSIFIER_SENTENCE, `${FALSIFIER_SENTENCE} A package may waive this.`);
    expect(truthFailures(appended)).toHaveLength(1);
    expect(truthFailures(appended)[0]).toContain("the falsifier paragraph is not exact");
    expect(truthFailures(synthetic().replace(FALSIFIER_SENTENCE, "")).length).toBe(1);
    expect(truthFailures(synthetic().replace("quietly weakened", "weakened")).length).toBe(1);
  });

  it("D10 (DT1) goes red when a modifier is prefixed inside the falsifier sentence itself (the start is bounded, not only the end)", () => {
    const lines = truthFailures(synthetic().replace(FALSIFIER_SENTENCE, `Advisory only: ${FALSIFIER_SENTENCE}`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the falsifier paragraph is not exact");
  });

  it("D11 (DT2) goes red when an exemption sentence is inserted before the falsifier sentence in its paragraph", () => {
    const lines = truthFailures(synthetic().replace(FALSIFIER_SENTENCE, `Packages marked experimental are exempt from the falsifier rule. ${FALSIFIER_SENTENCE}`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the falsifier paragraph is not exact");
  });

  it("D12 goes red when the falsifier paragraph is hidden in an HTML comment", () => {
    expect(truthFailures(synthetic().replace(FALSIFIER_SENTENCE, `<!-- ${FALSIFIER_SENTENCE} -->`))).toHaveLength(1);
  });

  it("NAMED RESIDUAL TRUTH-SECTION-TAIL (DT3, quiet row): an exemption paragraph after the falsifier paragraph is not judged here - the section-bounded pin of that section is wb-6ze.38's", () => {
    expect(truthFailures(synthetic().replace(`${FALSIFIER_SENTENCE}\n`, `${FALSIFIER_SENTENCE}\n\nThe falsifier rule above is waived for every W22 package.\n`))).toEqual([]);
  });

  it("an edit of any other section never reddens a row: the test-classes and fault-injection sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Classes.", "Classes, changed.").replace("Locations.", "Different locations."))).toEqual([]);
  });
});
