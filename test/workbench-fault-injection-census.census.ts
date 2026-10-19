/**
 * VC-7 / W12 / W18 falsifier (wb-0kg.12): the docs/workbench/14 "Fault-injection locations" census, a census leg of the
 * wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE through the
 * shared helper test/helpers/census.ts (judge(.forge/vitest-report.json, pins)).
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that would
 * fail if a critical guarantee was quietly weakened." and "All docs and status tables must distinguish "code present",
 * "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"".
 *
 * docs/14 "Fault-injection locations" lists the boundaries a fault must be injected at. Nothing else binds those
 * locations to a landed case, so a rename, deletion or disabling of a fault case would leave the docs list intact with
 * every suite green, and a location with NO case would be indistinguishable from a covered one. This file is that
 * binding: a frozen table that ties each location to its truth label, to the cases that prove it, or to an OPEN row
 * naming what is missing.
 *
 * Judging. This leg executes no pinned case, injects no fault and scans no test source for case calls itself. judge()
 * reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before
 * the census step runs), so a pinned case counts only when the gate's own run collected it exactly once, recorded it
 * passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo,
 * inverted, excluded or unregistered pinned case reads red, naming the row, the file, the title and the cause, as far
 * as the helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md).
 * The hand scanner and the config-as-text tier checks this file carried before the adoption (the wb-0kg.12 first cut,
 * e3b8bee) are gone: the report is the tier truth, so a pin file excluded from the default gate is not-collected here
 * instead of passing a text match.
 *
 * Tiers. A pinned row's tier is the default gate (the report vouches for it). A forge-command row records the forge.toml
 * command that really realises the location; no report this leg reads vouches for that run, so such a row is OPEN with
 * its tier recorded, never counted as covered. Its `registers` pin is a default-gate case that asserts the command is
 * registered outside the default gate, judged like any other pin.
 *
 * Docs. The section is judged through the helper's rendered view (docsSection / sectionMatches): under its unique level-2
 * heading of the level-1 parent heading, bounded at the next level-1/2 heading or EOF, it must render as exactly the
 * five frozen bullets of one list. A dropped, reworded or hidden clause names its row; any other edit names the section.
 * The drift falsifiers run over a SYNTHETIC document built from the frozen bullets, never over the live docs/14 text.
 *
 * Arithmetic (O2). docs/14 splits to fifteen clauses ("Before/after" counted as two); the groom enumerates fourteen
 * locations L1-L14 and merges the second clause of bullet five ("stopping one reader must not stop child without
 * ownership") into L14. The L14 rows name that merge, so the 15-vs-14 count is auditable from this file alone.
 *
 * Half-coverage rule (O1). A location covered in part is SPLIT into a covered row (own proof, own truth note) and an
 * uncovered row (own tier label and reason). The split locations are L2, L11, L13 and L14.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does not
 * follow; the real-process and live runs themselves (no receipt of record is claimed from a title being present); the
 * helper's own named residuals. A landing that renames a pinned case updates this table in the same commit (pin-flip);
 * a landing that closes an open row flips it to pinned here.
 */

import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type TruthLabel = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass" | "scale benchmark pass" | "not started";
type Tier = "default-gate" | "forge-command";
type RowStatus = "pinned" | "open";
type Half = "covered" | "uncovered";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface Row {
  /** Row id: the location id plus a split suffix when the location is half covered (L2a). */
  readonly row: string;
  /** The groom's location id, L1..L14. */
  readonly location: string;
  readonly text: string;
  /** The docs/14 fragment this row covers, verbatim in a rendered list item. */
  readonly quote: string;
  readonly label: TruthLabel;
  /** What runs the claimed proof: the default gate, or a named forge command. */
  readonly tier: Tier;
  /** The forge.toml command that really realises the location when the tier is forge-command. */
  readonly command?: string;
  /** The forge.toml command that really injects the fault when the default-gate pin is a static-text check. */
  readonly injectsAt?: string;
  /** For a forge-command row: the default-gate case that asserts the command is registered outside the gate. */
  readonly registers?: Pin;
  readonly pins: readonly Pin[];
  /** Default-gate cases that back an open row's reason; they never count as covering the location. */
  readonly evidence?: readonly Pin[];
  readonly status: RowStatus;
  /** Present on rows produced by the half-coverage split. */
  readonly half?: Half;
  /** An open row with no bead filed: listed for groom follow-up in the delivery note. */
  readonly unfiled?: boolean;
  readonly trackingBead?: string;
  readonly reason: string;
  /** Tier-truth note: what the pin does and does not prove. */
  readonly truth?: string;
  /** The docs clause the groom enumeration merged into this location (O2). */
  readonly merges?: string;
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-fault-injection-census.census.ts";
const DOCS_FILE = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS_HEADING = "Fault-injection locations";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

const PASS_LABELS: readonly TruthLabel[] = ["fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"];
const OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];

const CANCEL_FAULTS = "test/workbench-claude-cancel-faults.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const SHARED_CHILD = "test/workbench-detached-shared-child-receipt.test.ts";
const DETACHED_FAULTS = "test/workbench-detached-faults-receipt.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";
const RETRY_FAULT = "test/workbench-furnace-hosted-retry-fault.test.ts";
const RETRY_FAULT_RECEIPT = "test/workbench-furnace-hosted-retry-fault-receipt.test.ts";
const CLAUDE_DEGRADATION = "test/workbench-claude-host-degradation.test.ts";
const MERGED_CLAUSE = "stopping one reader must not stop child without ownership";

const pin = (file: string, title: string): Pin => ({ file, title });

/** The five docs/14 bullets as a reader sees them: the frozen rendered list items. */
const ITEMS: readonly string[] = [
  "Before provider call; after provider side effect but before host result; after result before journal append; before event persist; after reconnect but before snapshot.",
  "Before/after Claude SDK session ID first received; during tool execution; after output tokens streamed but before final.",
  "Inside worktree after edits but before Forge gate; after Forge evidence while workspace mutates; after isolated cleanup.",
  "Parent Furnace Work retry while child Run establishment is uncertain.",
  "Concurrent readers with one shared child; stopping one reader must not stop child without ownership.",
];
const SECTION_MARKDOWN = ITEMS.map(item => `- ${item}`).join("\n");
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "list", ordered: false, items: ITEMS.map(item => ({ text: item, markdown: item })) }];

/** Freezes the table and everything it holds, so no row, pin or reason can be edited at runtime. */
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
    row: "L1",
    location: "L1",
    text: "before provider call",
    quote: "Before provider call",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(CANCEL_FAULTS, "F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted")],
    status: "pinned",
    reason: "fixture ClaudeQuery: abort during beforeDispatch means query() is never called",
  },
  {
    row: "L2a",
    location: "L2",
    text: "after provider side effect but before host result (resume refusal half)",
    quote: "after provider side effect but before host result",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(EFFECT_REPLAY, "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect")],
    status: "pinned",
    half: "covered",
    reason: "a journaled non-read node is neither re-run nor replayed on resume; the resume surfaces a typed uncertain effect",
    truth: "runs fully inside the default gate against the in-process runtime fixture; no live provider",
  },
  {
    row: "L2b",
    location: "L2",
    text: "after provider side effect but before host result (detached-profile marker, static text)",
    quote: "after provider side effect but before host result",
    label: "code present",
    tier: "default-gate",
    injectsAt: "local-detached-faults",
    registers: pin(DETACHED_FAULTS, "registers the runner as one additive Forge command outside the default gate"),
    pins: [pin(DETACHED_FAULTS, "writes exactly one marker before the kill and nothing after it")],
    status: "pinned",
    half: "covered",
    reason: "the detached fault-provider source writes exactly one marker before it kills itself",
    truth:
      "the default-gate pin is a static text check of the generated fault-provider source; the real kill runs only under forge run local-detached-faults (no cmd_ receipt of record for it), so the label stays code present, never fixture pass",
  },
  {
    row: "L2c",
    location: "L2",
    text: "after provider side effect but before host result (runtime.ts dispatched-row-before-call half)",
    quote: "after provider side effect but before host result",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      pin(EFFECT_REPLAY, "appends the typed dispatched row before the provider can act, and the settled row supersedes it"),
      pin(EFFECT_REPLAY, "dispatches an override re-run on record too: a kill inside it leaves a row the next resume refuses on"),
    ],
    status: "pinned",
    half: "covered",
    reason: "the runtime appends a typed dispatched row before the provider can act, so a kill after the effect leaves a row the next resume refuses on",
    truth: "wb-5x0.1 closed the journal gap this row was open on; the cases run inside the default gate against the in-process runtime fixture, and the kill is a fixture failure of the journal, not a live provider kill",
  },
  {
    row: "L3",
    location: "L3",
    text: "after result before journal append",
    quote: "after result before journal append",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(EFFECT_REPLAY, "a lost settled row is not a failed call: the result reaches the script and the dispatched row keeps the position protected")],
    status: "pinned",
    reason: "a settled row the filesystem refuses is not a failed call: the result reaches the script and the dispatched row keeps the position protected",
    truth: "wb-5x0.1 closed the journal gap this row was open on; the failure is injected into a fixture journal inside the default gate",
  },
  {
    row: "L4",
    location: "L4",
    text: "before event persist",
    quote: "before event persist",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(OBSERVATION, "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot")],
    status: "pinned",
    reason: "observation projection dedupes ids, rejects old sequences and treats a cursor gap as stale until a snapshot",
  },
  {
    row: "L5",
    location: "L5",
    text: "after reconnect but before snapshot",
    quote: "after reconnect but before snapshot",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(OBSERVATION, "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot")],
    status: "pinned",
    reason: "reconnect alone never restores current without a snapshot",
  },
  {
    row: "L6",
    location: "L6",
    text: "before Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(CANCEL_FAULTS, "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort")],
    status: "pinned",
    reason: "cancel before the init message leaves no session id",
  },
  {
    row: "L7",
    location: "L7",
    text: "after Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(CANCEL_FAULTS, "F2 cancel during tool execution: the cancelled result keeps the session id init reported")],
    status: "pinned",
    reason: "a cancel after init keeps the session id init reported",
  },
  {
    row: "L8",
    location: "L8",
    text: "during tool execution",
    quote: "during tool execution",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(CANCEL_FAULTS, "F2 cancel during tool execution: the cancelled result keeps the session id init reported")],
    status: "pinned",
    reason: "cancel during tool execution settles cancelled",
  },
  {
    row: "L9",
    location: "L9",
    text: "after output tokens streamed but before final",
    quote: "after output tokens streamed but before final",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin(CANCEL_FAULTS, "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure")],
    status: "pinned",
    reason: "an SDK stream that ends on abort settles cancelled, never the missing-result failure",
  },
  {
    row: "L10",
    location: "L10",
    text: "inside worktree after edits but before Forge gate",
    quote: "Inside worktree after edits but before Forge gate",
    label: "code present",
    tier: "default-gate",
    pins: [],
    evidence: [pin(CLAUDE_DEGRADATION, "G2 through the real runtime: a gated agent is refused before it is queued, before any SDK query and before the gate command runs")],
    status: "open",
    unfiled: true,
    reason:
      "wb-a2g.11 landed: the Claude host refuses a gated agent before it is queued and before the gate command runs, so no case injects a fault inside a worktree after edits and before the gate; the refusal case backs this reason and is not coverage of the location; no bead is filed yet, listed for groom follow-up",
  },
  {
    row: "L11a",
    location: "L11",
    text: "after Forge evidence while workspace mutates (failed-gate observer half)",
    quote: "after Forge evidence while workspace mutates",
    label: "fixture pass",
    tier: "default-gate",
    pins: [pin("test/workbench-forge-observer.test.ts", "reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace")],
    status: "pinned",
    half: "covered",
    reason: "the observer reads Forge's own failed-gate status as failure and never promotes a mixed or undecided reading",
    truth: "runs inside the default gate against a fixture Forge reading; it does not mutate a workspace",
  },
  {
    row: "L11b",
    location: "L11",
    text: "after Forge evidence while workspace mutates (forge-contract basis-change half)",
    quote: "after Forge evidence while workspace mutates",
    label: "not started",
    tier: "default-gate",
    pins: [],
    status: "open",
    half: "uncovered",
    unfiled: true,
    reason: "no forge-contract case changes the source basis after evidence (docs/14 matrix: source basis changed -> no PASS); no bead is filed yet, listed for groom follow-up",
  },
  {
    row: "L12",
    location: "L12",
    text: "after isolated cleanup",
    quote: "after isolated cleanup",
    label: "code present",
    tier: "default-gate",
    pins: [],
    evidence: [pin(CLAUDE_DEGRADATION, "I1 host boundary: settles ok:false with exactly the typed diagnostic, zero SDK queries, no resolved session, one settle")],
    status: "open",
    unfiled: true,
    reason:
      "wb-a2g.11 landed: the Claude host refuses worktree isolation per agent before any SDK query, so no isolated worktree exists to clean up and no case injects a fault after isolated cleanup; the refusal case backs this reason and is not coverage of the location; no bead is filed yet, listed for groom follow-up",
  },
  {
    row: "L13a",
    location: "L13",
    text: "Furnace Work retry while child Run establishment is uncertain (fixture journey half)",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      pin(RETRY_FAULT, "an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded"),
      pin(RETRY_FAULT, "the five journeys the receipt runner measures satisfy the receipt judge here in the default gate (realised, no finding)"),
    ],
    status: "pinned",
    half: "covered",
    reason: "an operator retry after an uncertain first Attempt opens a fresh bridge session, the first Attempt stays parked, and the five fixture journeys satisfy the receipt judge",
    truth: "wb-0kg.4 landed: the default-gate cases drive the built adapter and the shipped SDK against the fixture host; the runner command realising the same journeys outside the gate is the L13b row",
  },
  {
    row: "L13b",
    location: "L13",
    text: "Furnace Work retry while child Run establishment is uncertain (runner command half)",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "code present",
    tier: "forge-command",
    command: "furnace-hosted-retry-fault",
    registers: pin(RETRY_FAULT_RECEIPT, "registers the runner as ONE additive Forge command outside the default gate, between furnace-observe and furnace-hosted-live"),
    pins: [],
    status: "open",
    half: "uncovered",
    unfiled: true,
    reason:
      "the runner node qa/workbench/furnace-hosted-retry-fault.mjs realises the five journeys only under forge run furnace-hosted-retry-fault; no report this leg reads vouches for that run and no receipt of record for it sits in docs/workbench/receipts, so no run label is earned; no bead is filed yet, listed for groom follow-up",
  },
  {
    row: "L14a",
    location: "L14",
    text: "concurrent readers with one shared child (judge and ownership half)",
    quote: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      pin(SHARED_CHILD, "flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)"),
      pin(SHARED_CHILD, "flags a non-owner stop that was accepted, untyped, or that disturbed the child"),
      pin("test/workbench-control.test.ts", "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
    ],
    status: "pinned",
    half: "covered",
    merges: MERGED_CLAUSE,
    reason: "the pure shared-child judge flags a reader close that stops the child and a non-owner stop that is accepted; observer-only grants cannot control",
    truth: "the pins drive the pure judge and the control gate with fixtures inside the default gate; the real child processes are the L14b row",
  },
  {
    row: "L14b",
    location: "L14",
    text: "concurrent readers with one shared child (real-process realisation half)",
    quote: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
    label: "code present",
    tier: "forge-command",
    command: "local-detached-shared-child",
    registers: pin(SHARED_CHILD, "registers the runner as one additive Forge command outside the default gate"),
    pins: [],
    status: "open",
    half: "uncovered",
    unfiled: true,
    merges: MERGED_CLAUSE,
    reason:
      "real child processes and real reader exits run only under forge run local-detached-shared-child; no receipt of record for it sits in docs/workbench/receipts, so no live label is earned; no bead is filed yet, listed for groom follow-up",
  },
]);

/** The frozen row ids, in order: nineteen rows over fourteen locations. */
const ROW_IDS: readonly string[] = ROWS.map(row => row.row);
const EXPECTED_ROW_IDS: readonly string[] = ["L1", "L2a", "L2b", "L2c", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11a", "L11b", "L12", "L13a", "L13b", "L14a", "L14b"];
/** Rule 16 (frozen shape): "<row>:<pins>:<registers>:<evidence>" per row, so deleting one pin or swapping a pin for another row's reads red. */
const EXPECTED_SHAPE: readonly string[] = [
  "L1:1:0:0",
  "L2a:1:0:0",
  "L2b:1:1:0",
  "L2c:2:0:0",
  "L3:1:0:0",
  "L4:1:0:0",
  "L5:1:0:0",
  "L6:1:0:0",
  "L7:1:0:0",
  "L8:1:0:0",
  "L9:1:0:0",
  "L10:0:0:1",
  "L11a:1:0:0",
  "L11b:0:0:0",
  "L12:0:0:1",
  "L13a:2:0:0",
  "L13b:0:1:0",
  "L14a:3:0:0",
  "L14b:0:1:0",
];
/** Rule 16 (frozen titles): "<row>|<kind>|<file>|<title>" for every judged case, so swapping a pin for an unrelated passing case in the same file reads red. */
const EXPECTED_JUDGED: readonly string[] = [
  "L1|pin|workbench-claude-cancel-faults.test.ts|F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted",
  "L2a|pin|workflow-effect-replay.test.ts|neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
  "L2b|pin|workbench-detached-faults-receipt.test.ts|writes exactly one marker before the kill and nothing after it",
  "L2b|registers|workbench-detached-faults-receipt.test.ts|registers the runner as one additive Forge command outside the default gate",
  "L2c|pin|workflow-effect-replay.test.ts|appends the typed dispatched row before the provider can act, and the settled row supersedes it",
  "L2c|pin|workflow-effect-replay.test.ts|dispatches an override re-run on record too: a kill inside it leaves a row the next resume refuses on",
  "L3|pin|workflow-effect-replay.test.ts|a lost settled row is not a failed call: the result reaches the script and the dispatched row keeps the position protected",
  "L4|pin|workbench-observation.test.ts|deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
  "L5|pin|workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "L6|pin|workbench-claude-cancel-faults.test.ts|F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort",
  "L7|pin|workbench-claude-cancel-faults.test.ts|F2 cancel during tool execution: the cancelled result keeps the session id init reported",
  "L8|pin|workbench-claude-cancel-faults.test.ts|F2 cancel during tool execution: the cancelled result keeps the session id init reported",
  "L9|pin|workbench-claude-cancel-faults.test.ts|F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
  "L10|evidence|workbench-claude-host-degradation.test.ts|G2 through the real runtime: a gated agent is refused before it is queued, before any SDK query and before the gate command runs",
  "L11a|pin|workbench-forge-observer.test.ts|reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace",
  "L12|evidence|workbench-claude-host-degradation.test.ts|I1 host boundary: settles ok:false with exactly the typed diagnostic, zero SDK queries, no resolved session, one settle",
  "L13a|pin|workbench-furnace-hosted-retry-fault.test.ts|an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded",
  "L13a|pin|workbench-furnace-hosted-retry-fault.test.ts|the five journeys the receipt runner measures satisfy the receipt judge here in the default gate (realised, no finding)",
  "L13b|registers|workbench-furnace-hosted-retry-fault-receipt.test.ts|registers the runner as ONE additive Forge command outside the default gate, between furnace-observe and furnace-hosted-live",
  "L14a|pin|workbench-detached-shared-child-receipt.test.ts|flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)",
  "L14a|pin|workbench-detached-shared-child-receipt.test.ts|flags a non-owner stop that was accepted, untyped, or that disturbed the child",
  "L14a|pin|workbench-control.test.ts|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
  "L14b|registers|workbench-detached-shared-child-receipt.test.ts|registers the runner as one additive Forge command outside the default gate",
];
/** Open rows with no bead filed, listed for the groom follow-up. */
const UNFILED_ROWS: readonly string[] = ["L10", "L11b", "L12", "L13b", "L14b"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });
const shapeOf = (row: Row): string => `${row.row}:${row.pins.length}:${row.registers === undefined ? 0 : 1}:${row.evidence?.length ?? 0}`;

/** Every default-gate case a row names, judged against the gate's own report: its coverage pins, its registration pin and its evidence. */
const JUDGED = ROWS.flatMap(row => [...row.pins.map(entry => ({ row, kind: "pin", entry })), ...(row.registers === undefined ? [] : [{ row, kind: "registers", entry: row.registers }]), ...(row.evidence ?? []).map(entry => ({ row, kind: "evidence", entry }))]);
const JUDGED_ROWS = ROWS.filter(row => row.pins.length > 0 || row.registers !== undefined || (row.evidence?.length ?? 0) > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, kind: string, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${kind}: ${verdict.code}: ${verdict.why}`);

/** The docs clauses of a rendered list, split at the semicolons, with "Before/after X" counted as two. */
function docsClauses(items: readonly string[]): string[] {
  return items.flatMap(item =>
    item
      .replace(/\.$/, "")
      .split(";")
      .map(part => part.trim())
      .flatMap(clause => (clause.startsWith("Before/after ") ? [`Before ${clause.slice("Before/after ".length)}`, `after ${clause.slice("Before/after ".length)}`] : [clause])),
  );
}

function covers(row: Row, clause: string): boolean {
  if (row.quote.includes(clause)) return true;
  const match = /^(Before|after) (.+)$/.exec(clause);
  return match !== null && row.quote.includes(`Before/after ${match[2] ?? ""}`);
}

/** The rendered list items of a docs section, or undefined when the section holds no single list. */
const listItems = (blocks: readonly RenderedBlock[]): readonly string[] | undefined => {
  const first = blocks[0];
  return blocks.length === 1 && first?.kind === "list" ? first.items.map(item => item.text) : undefined;
};

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row quote checks read the rendered list items
 * and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  const rendered = section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []));
  for (const row of ROWS) {
    if (!rendered.some(text => text.includes(row.quote))) out.push(`row ${row.row}: its quote "${row.quote}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bullets under the real heading shape, never the live text. */
const synthetic = (edit: (list: string) => string = list => list, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(SECTION_MARKDOWN)}\n${tail}\n## Performance benchmark\n\nText.\n`;
const editList = (from: string, to: string) => (list: string): string => list.replace(from, to);
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

describe("wb-0kg.12 docs/workbench/14 fault-injection-locations census (report mode)", () => {
  it("AC1: the table holds the nineteen frozen rows in order, deeply frozen, with the frozen per-row pin shape", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROW_IDS).toEqual(EXPECTED_ROW_IDS);
    expect(new Set(ROW_IDS).size).toBe(ROWS.length);
    expect(ROWS).toHaveLength(19);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(JUDGED.map(judged => `${judged.row.row}|${judged.kind}|${judged.entry.file.split("/").pop()}|${judged.entry.title}`)).toEqual(EXPECTED_JUDGED);
  });

  it("AC1: the live section renders exactly its five frozen bullets as one list, HTML-free", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(section.hasHtml).toBe(false);
    expect(listItems(section.blocks)).toEqual(ITEMS);
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1/O2: docs/14 splits to fifteen clauses, the table enumerates fourteen locations L1-L14, and the one merged clause is named by the L14 rows", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    const items = listItems(section.blocks) ?? [];
    const clauses = docsClauses(items);
    expect(clauses).toHaveLength(15);
    const locations = [...new Set(ROWS.map(row => row.location))];
    expect(locations).toEqual(Array.from({ length: 14 }, (_, index) => `L${index + 1}`));
    const merging = ROWS.filter(row => row.merges !== undefined);
    expect(merging.map(row => row.row)).toEqual(["L14a", "L14b"]);
    expect(new Set(merging.map(row => row.merges))).toEqual(new Set([MERGED_CLAUSE]));
    expect(clauses).toContain(MERGED_CLAUSE);
    expect(clauses.length).toBe(locations.length + 1);
  });

  it("AC1: every docs/14 clause is covered by a row quote, so a new docs location goes red", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    for (const clause of docsClauses(listItems(section.blocks) ?? [])) {
      expect(
        ROWS.some(row => covers(row, clause)),
        `docs/14 clause has no census row: "${clause}"`,
      ).toBe(true);
    }
  });

  it("O1: every half-covered location is split into a covered row with its own proof and an uncovered open row with its own tier label and reason", () => {
    const splitLocations = [...new Set(ROWS.filter(row => row.half !== undefined).map(row => row.location))];
    expect(splitLocations).toEqual(["L2", "L11", "L13", "L14"]);
    for (const location of splitLocations) {
      const rows = ROWS.filter(row => row.location === location);
      expect(
        rows.every(row => row.half !== undefined),
        `${location}: a split location must not mix split and unsplit rows`,
      ).toBe(true);
      const covered = rows.filter(row => row.half === "covered");
      const uncovered = rows.filter(row => row.half === "uncovered");
      if (location !== "L2") expect(uncovered.length, `${location} uncovered`).toBeGreaterThan(0);
      expect(covered.length, `${location} covered`).toBeGreaterThan(0);
      for (const row of covered) {
        expect(row.status, row.row).toBe("pinned");
        expect(row.pins.length, row.row).toBeGreaterThan(0);
        expect(row.truth?.length ?? 0, `${row.row} carries no truth note`).toBeGreaterThan(0);
      }
      for (const row of uncovered) {
        expect(row.status, row.row).toBe("open");
        expect(OPEN_LABELS, row.row).toContain(row.label);
        expect(row.reason.length, row.row).toBeGreaterThan(0);
      }
    }
    for (const row of ROWS.filter(candidate => candidate.half === undefined)) expect(row.merges, row.row).toBeUndefined();
  });

  it("A3: no open row is counted passed, every pinned row without an injection stand-in carries a pass label, and unfiled gaps are exactly the listed ones", () => {
    const open = ROWS.filter(row => row.status === "open");
    const pinned = ROWS.filter(row => row.status === "pinned");
    expect(open.length + pinned.length).toBe(ROWS.length);
    for (const row of open) {
      expect(OPEN_LABELS, row.row).toContain(row.label);
      expect(row.pins, `${row.row}: an open row carries no coverage pin`).toEqual([]);
      expect(row.reason.trim().length, `${row.row}: an open row needs a reason`).toBeGreaterThan(40);
      expect(row.unfiled === true || (row.trackingBead ?? "").length > 0, `${row.row}: an open row names a tracking bead or is listed as unfiled`).toBe(true);
    }
    for (const row of pinned) {
      expect(row.pins.length, `${row.row}: a pinned row has pins`).toBeGreaterThan(0);
      expect(row.tier, `${row.row}: a pinned row is judged by the default gate's report`).toBe("default-gate");
      if (row.injectsAt === undefined) expect(PASS_LABELS, row.row).toContain(row.label);
      else expect(row.label, `${row.row}: a static-text pin names the command that injects and may not claim a pass`).toBe("code present");
    }
    expect(open.filter(row => row.unfiled === true).map(row => row.row)).toEqual(UNFILED_ROWS);
  });

  it("A3: a forge-command row is open, names its command and the default-gate case that registers it outside the gate; no report vouches for the command run", () => {
    const forgeRows = ROWS.filter(row => row.tier === "forge-command");
    expect(forgeRows.map(row => row.row)).toEqual(["L13b", "L14b"]);
    for (const row of forgeRows) {
      expect(row.status, row.row).toBe("open");
      expect(row.command, `${row.row}: names its forge command`).toBeDefined();
      expect(row.registers, `${row.row}: names the registration case`).toBeDefined();
      expect(row.label, `${row.row}: a command run no report vouches for earns no pass label`).toBe("code present");
    }
    expect(forgeRows.map(row => row.command)).toEqual(["furnace-hosted-retry-fault", "local-detached-shared-child"]);
    expect(ROWS.find(row => row.row === "L2b")?.injectsAt).toBe("local-detached-faults");
    expect(ROWS.find(row => row.row === "L2b")?.registers).toBeDefined();
  });

  it.each(JUDGED_ROWS.map(row => ({ row })))("AC2 row $row.row: every named default-gate case is collected once, passed and asserting in the gate's own report", ({ row }) => {
    const mine = JUDGED.filter(entry => entry.row === row);
    for (const kind of ["pin", "registers", "evidence"]) {
      const group = mine.filter(entry => entry.kind === kind);
      if (group.length === 0) continue;
      const verdicts = judge(
        REPORT,
        group.map(entry => casePin(entry.entry)),
      );
      expect(verdicts).toHaveLength(group.length);
      expect(failures(row, kind, verdicts)).toEqual([]);
      expect(verdicts.map(verdict => verdict.code)).toEqual(group.map(() => "ok"));
    }
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, reads no forge.toml and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = JUDGED.map(entry => basename(entry.entry.file, ".ts"));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-0kg.12 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.row === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("L3");
    const wrong = { ...entry, title: entry.title.replace("protected", "protecteD") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, "pin", verdicts);
    expect(line).toContain("row L3/pin");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen ids no longer match)", () => {
    expect(ROWS.filter(row => row.row !== "L9").map(row => row.row)).not.toEqual(EXPECTED_ROW_IDS);
  });

  it("M3: a pin with no title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("L1");
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { entry } = firstPin("L4");
    const [verdict] = judge(REPORT, [casePin({ file: CANCEL_FAULTS, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a forge-command tier label is carried by no report this leg reads: the default report refuses a registration pin relabelled as the command run", () => {
    const row = ROWS.find(candidate => candidate.row === "L14b");
    expect(row?.registers).toBeDefined();
    if (row?.registers === undefined || row.command === undefined) return;
    const [verdict] = judge(REPORT, [{ file: row.registers.file, title: row.registers.title, tier: row.command }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M7: an evidence case never counts as coverage: the open rows that cite one carry no coverage pin", () => {
    const withEvidence = ROWS.filter(row => (row.evidence?.length ?? 0) > 0);
    expect(withEvidence.map(row => row.row)).toEqual(["L10", "L12"]);
    for (const row of withEvidence) {
      expect(row.status, row.row).toBe("open");
      expect(row.pins, row.row).toEqual([]);
    }
  });
});

describe("wb-0kg.12 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${SECTION_MARKDOWN}\n`)).toEqual([]);
  });

  it("K1 names the Furnace-retry rows (and only them) when bullet four is dropped", () => {
    const lines = docsFailures(synthetic(editList("\n- Parent Furnace Work retry while child Run establishment is uncertain.", "")));
    expect(named(lines)).toEqual(["row L13a", "row L13b"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names the shared-child rows (and only them) when the reader clause is reworded", () => {
    expect(named(docsFailures(synthetic(editList("Concurrent readers with one shared child", "Concurrent readers with two shared children"))))).toEqual(["row L14a", "row L14b"]);
  });

  it("K3 names the cleanup row (and only it) when its clause is dropped", () => {
    expect(named(docsFailures(synthetic(editList("; after isolated cleanup", ""))))).toEqual(["row L12"]);
  });

  it("K4 names both session-id rows (and only them) when Before/after is narrowed to Before", () => {
    expect(named(docsFailures(synthetic(editList("Before/after Claude SDK", "Before Claude SDK"))))).toEqual(["row L6", "row L7"]);
  });

  it("D1 goes red on the section, naming no row, when a sixth location is appended inside a bullet", () => {
    const lines = docsFailures(synthetic(editList("after reconnect but before snapshot.", "after reconnect but before snapshot; during a new unlisted step.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D2 goes red on the section when a sixth bullet is added to the list", () => {
    const lines = docsFailures(synthetic(list => `${list}\n- A new unclassified location.`));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D3 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, "## Fault notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_HEADING}: the section is refused`);
  });

  it("D4 goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(list => list, "\n### Exceptions\n\nA host may skip these locations.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 names the cleanup row when its clause is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editList("after isolated cleanup", "<!-- after isolated cleanup -->")));
    expect(named(lines)).toEqual(["row L12"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 goes red on the section, naming no row, when two bullets swap places", () => {
    const [first = "", second = ""] = ITEMS;
    const lines = docsFailures(synthetic(editList(`- ${first}\n- ${second}`, `- ${second}\n- ${first}`)));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D8 goes red when an HTML comment opened before the heading and closed after the next heading hides the section from the rendered view", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `<!--\n## ${DOCS_HEADING}`).replace("## Performance benchmark", "-->\n## Performance benchmark"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("D9 goes red when a code fence opened before the heading and closed after the next heading hides the section from the rendered view", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `\`\`\`\n## ${DOCS_HEADING}`).replace("## Performance benchmark", "```\n## Performance benchmark"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("an edit of any other section never reddens a row: the matrix and the benchmark sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});
