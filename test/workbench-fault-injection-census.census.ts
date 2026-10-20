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
 * ENUMERATION under R596 (fifth cut). Only the following local modes are claimed. Each names an actual
 * falsifier title below; the R596 case checks the quote, quiet-row and independent vocabulary
 * falsifiers registered exactly once in run mode. Existing AC1/AC2 pins protect their judged set.
 * PINNED P1 row/pin/label/receipt shape: AC1 row shape; M2; R0-R13; G1/G2; U2 real corpus.
 * PINNED P2 judged title identity and iteration: EXPECTED_JUDGED, EXPECTED_JUDGED_ROWS,
 * AC2 completeness, and M1/M3/M4/M5/M6/M7; no alternative report or re-execution is accepted.
 * PINNED P3 per-row location/whole-clause quote: U1 frozen quote literal and H3b/H3c/H3d/H3f/H3g/H3h/H3i/H3j.
 * PINNED P4 label vocabulary: U2 independent literals; R1 and R8 per pass label; G1/G2 real corpus.
 * PINNED P5 rendered section exactness: K1-K4 and D1-D9, including comment/fence hiding.
 * PINNED P6 split/merged-location arithmetic and tier truth: O1/O2 and A3; only the recorded receipts
 * vouch for command runs. Subject rename/delete/modifier/exclusion/hollowing is the shared judge's
 * report-mode reading, not a new scanner here; M1/M3/M4/M5 measure this leg's use of that interface.
 *
 * NAMED RESIDUALS (quiet readings below, not pass claims):
 * R1 G23 empty-alternative precedent: NOT a mode of this leg (it never classifies a RegExp oracle).
 * The analogous receipt-text alternative is named: a line recording the right id and command alongside
 * contradictory verdict alternatives remains quiet (Q1). No verdict is parsed or earned from those words.
 * R2 receipt verdict fields are not parsed: pass false/findings alongside a matching run id stay quiet (Q2).
 * R3 historical revision is not re-measured against HEAD: a matching line naming an old revision stays quiet (Q3).
 * R4 receipt label meaning beyond its frozen row: synthetic receipted live/adversarial/scale labels
 * with the same valid record all stay quiet (Q4); only the current table's literal chooses its label.
 * R5 report-body semantic adequacy: the case's assertion must be reached through the shared helper's
 * resolvable roster, but an assertion need not prove this location. An unrelated passing real case can
 * be judged ok (Q5); EXPECTED_JUDGED, not semantic inference, refuses swapping it into the table.
 * R6 actual command execution: this leg does not run/re-run the command; the synthetic matching
 * receipt text stays quiet even when it says the command was not re-run at HEAD (Q6).
 * R7 uncovered locations: L10/L11b/L12/L14b remain open and never claim a pass (Q7).
 *
 * The four refusal notes' earlier S1-S16/C1-C3, seven floor skip routes, T1-T6/config exclusions,
 * early-return hollowing and FILE_HAZARD/misattribution belong to the RETIRED hand scanner.
 * They now route through wb-u62 judge/report truth, with that helper's own named residuals (C1 sibling
 * task writes; package modules; vouch routes outside its read set; callbacks/branches/loop reachability).
 * This census does not claim to close or independently re-measure that helper roster. The local quiet
 * semantic witness Q5 names the report/interface boundary. The prior cuts' docs K/D and receipt G/R
 * modes stay pinned here. A newly found mode outside this enumeration is a residual-list addition
 * under R596, not a false assertion that every JavaScript construct is resolved.
 *
 * Judging. This leg executes no pinned case, injects no fault and scans no test source for case calls itself. judge()
 * reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before
 * the census step runs), so a pinned case counts only when the gate's own run collected it exactly once, recorded it
 * passed, and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo,
 * inverted, excluded or unregistered pinned case reads red, naming the row, the file, the title and the cause, as far
 * as the helper's resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md).
 * Each AC2 case requires assertions, and the entries the AC2 cases hand the judge are accumulated and compared with the
 * frozen judged set, so a narrowed row set or kind loop reads red instead of passing with nothing judged.
 * The hand scanner and the config-as-text tier checks this file carried before the adoption (the wb-0kg.12 first cut,
 * e3b8bee) are gone: the report is the tier truth, so a pin file excluded from the default gate is not-collected here
 * instead of passing a text match.
 *
 * Tiers. A pinned row's tier is the default gate (the report vouches for it), and it claims at most "fixture pass". A
 * forge-command row records the forge.toml command that really realises the location; no report this leg reads vouches
 * for that run, so such a row is OPEN with its tier recorded ("code present"), never counted as covered, unless a run of
 * record carries it. Its `registers` pin is a default-gate case that asserts the command is registered outside the
 * default gate, judged like any other pin.
 *
 * Receipts (A3, report-mode form). A RECEIPTED row names the cmd_ id of its command's run of record; this leg finds the
 * id, as a whole token, on a line of the row's own receipt file (docs/workbench/receipts/<tracking bead>.md, owner ruling
 * R539) that also names the command, reading TRACEABILITY.md (frozen since landing 69) in the same corpus. "live SDK
 * pass", "adversarial pass" and "scale benchmark pass" rest only on such a receipt; a forge-command (or injection) row
 * with no receipt reads red as soon as the corpus records a run of its command, so a stale "no receipt" reason cannot
 * stand; every run id a reason cites must be in the corpus. Every row's label is frozen in EXPECTED_SHAPE, never inferred
 * from a title being present.
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
 * uncovered row (own tier label and reason). The split locations are L2, L11, L13 and L14; every row of L2 (wb-5x0.1) and
 * of L13 (the fixture runner and the live leg each carry a run of record) is covered, so those two hold no uncovered row.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does not
 * follow; the forge-command runs themselves (this leg runs none: a receipted row rests on the run of record its receipt
 * file records, read as text - the id and the command on one line, never the receipt's verdict fields - and is not
 * re-measured against HEAD); a label alternative that names an in-tier live leg without a receipt (no such leg exists
 * for these locations, so the rule demands the receipt and reads such a row red); the helper's own named residuals. A
 * landing that renames a pinned case updates this table in the same commit (pin-flip); a landing that closes an open row
 * flips it to pinned or receipted here.
 */

import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type TruthLabel = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass" | "scale benchmark pass" | "not started";
type Tier = "default-gate" | "forge-command";
type RowStatus = "pinned" | "receipted" | "open";
type Half = "covered" | "uncovered";

interface Pin {
  readonly file: string;
  readonly title: string;
}

/** A forge run of record: its cmd_ id and the per-bead receipt file that records it (owner ruling R539). */
interface RunOfRecord {
  readonly id: string;
  readonly file: string;
}

/** One line of the receipts corpus (TRACEABILITY.md and every docs/workbench/receipts file). */
interface CorpusLine {
  readonly file: string;
  readonly line: number;
  readonly text: string;
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
  /** For a receipted row: the run of record of its command that its label rests on. */
  readonly receipt?: RunOfRecord;
  /** An earlier run of record of the same command that the receipt replaces. */
  readonly supersedes?: RunOfRecord;
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
/** The live file the furnace-hosted-live command runs through its own config; the default config excludes it. */
const HOSTED_LIVE_FILE = "test/workbench-furnace-hosted-real.test.ts";
const RECEIPTS_DIR = "docs/workbench/receipts";
const TRACEABILITY_FILE = "docs/workbench/TRACEABILITY.md";
/** A forge run id, matched as a whole token. */
const RUN_ID = /^cmd_[0-9a-f]{12}$/;

const PASS_LABELS: readonly TruthLabel[] = ["fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"];
const OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];
/** docs/14 labels for a run beyond the fixture tier: each rests on a cmd_ run of record (A3). */
const RECEIPT_LABELS: readonly TruthLabel[] = ["live SDK pass", "adversarial pass", "scale benchmark pass"];

const CANCEL_FAULTS = "test/workbench-claude-cancel-faults.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const SHARED_CHILD = "test/workbench-detached-shared-child-receipt.test.ts";
const DETACHED_FAULTS = "test/workbench-detached-faults-receipt.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";
const RETRY_FAULT = "test/workbench-furnace-hosted-retry-fault.test.ts";
const RETRY_FAULT_RECEIPT = "test/workbench-furnace-hosted-retry-fault-receipt.test.ts";
const RETRY_LIVE_RECEIPT = "test/workbench-furnace-hosted-retry-live-receipt.test.ts";
const CLAUDE_DEGRADATION = "test/workbench-claude-host-degradation.test.ts";
const MERGED_CLAUSE = "stopping one reader must not stop child without ownership";

const pin = (file: string, title: string): Pin => ({ file, title });
const run = (id: string, bead: string): RunOfRecord => ({ id, file: `${RECEIPTS_DIR}/${bead}.md` });

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
      "the default-gate pin is a static text check of the generated fault-provider source; the real kill runs only under forge run local-detached-faults, and no receipt in docs/workbench/receipts or TRACEABILITY records a run of it (the wb-p5a gate note in the bead store names a gate-time run at that bead's tip, never recorded as a receipt; the receipt rule reds this row once one is), so the label stays code present, never fixture pass",
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
    truth: "wb-0kg.4 landed: the default-gate cases drive the built adapter and the shipped SDK against the fixture host; the runner command realising the same journeys outside the gate is the L13b row and the live leg is the L13c row",
  },
  {
    row: "L13b",
    location: "L13",
    text: "Furnace Work retry while child Run establishment is uncertain (fixture runner command half)",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "fixture pass",
    tier: "forge-command",
    command: "furnace-hosted-retry-fault",
    registers: pin(RETRY_FAULT_RECEIPT, "registers the runner as ONE additive Forge command outside the default gate, between furnace-observe and furnace-hosted-live"),
    pins: [],
    receipt: run("cmd_522b936cae3e", "wb-3hc"),
    status: "receipted",
    half: "covered",
    trackingBead: "wb-3hc",
    reason:
      "the runner node qa/workbench/furnace-hosted-retry-fault.mjs realises the five journeys only under forge run furnace-hosted-retry-fault; its run of record cmd_522b936cae3e (receipts/wb-3hc.md, re-measured after wb-0yw changed the runner) reads receipt workbench.furnace-hosted-retry-fault/v1, tier fixture, realised true, pass true, findings []",
    truth:
      "wb-0kg.4 landed the runner and wb-3hc recorded its run of record (revision dc47864, revisionClean true); no report this leg reads vouches for the run, the receipt does, and this leg never re-runs the command; the fixture host is scripted, so the live leg is the L13c row",
  },
  {
    row: "L13c",
    location: "L13",
    text: "Furnace Work retry while child Run establishment is uncertain (live leg half)",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "live SDK pass",
    tier: "forge-command",
    command: "furnace-hosted-live",
    registers: pin(RETRY_LIVE_RECEIPT, "refuses a focused live row through the tier's own vitest config: forge's furnace-hosted-live command runs vitest.furnace-hosted.config.ts, whose module pins allowOnly false over the live file"),
    pins: [],
    receipt: run("cmd_5143a9680f91", "wb-0m7"),
    supersedes: run("cmd_36faa08b6478", "wb-3hc"),
    status: "receipted",
    half: "covered",
    trackingBead: "wb-0m7",
    reason:
      "the live leg forge run furnace-hosted-live drives the shipped @furnace/sdk against a real Furnace binary; its run of record cmd_5143a9680f91 (receipts/wb-0m7.md) reads receipt workbench.furnace-hosted-retry-live/v1, tier live, truthLabel LIVE pass, pass true, findings [] over PAIR, CANCEL, RETRY, PARK and RECEIPT: an indeterminate first Attempt is parked, and the operator's run resume and work retry reach the parked Run",
    truth:
      "the run of record (revision 7322cd0, dirty false) supersedes the earlier run of record cmd_36faa08b6478 (receipts/wb-3hc.md: LIVE with findings, pass false); the registers pin resolves the forge command to the live file's own config, which the default config excludes; not read by that run: the outcome of the retry's Attempt after the uncertain park; this leg never runs the live tier",
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
      "the multi-reader runner (one real detached child observed by two readers; a reader closes, a reader without the grant is refused) runs only under forge run local-detached-shared-child, and no receipt in docs/workbench/receipts or TRACEABILITY records a run of it (the wb-p5a gate note in the bead store names a gate-time run at that bead's tip, never recorded as a receipt), so no live label is earned; the detached-control-live run of record cmd_39ebff0089a0 (receipts/wb-0kg.8.md) realises a real reader process closing beside the harness's own handle while the child keeps running, and typed non-owner denials, against real detached hosts, but docs/workbench records no docs/14 truth label for that run, so it is cited here and counted nowhere (an owner reading); no bead is filed yet, listed for groom follow-up",
  },
]);

/** The frozen row ids, in order: twenty rows over fourteen locations. */
const ROW_IDS: readonly string[] = ROWS.map(row => row.row);
const EXPECTED_ROW_IDS: readonly string[] = ["L1", "L2a", "L2b", "L2c", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11a", "L11b", "L12", "L13a", "L13b", "L13c", "L14a", "L14b"];
/**
 * Rule 16 (frozen shape): "<row>:<status>:<label>:<pins>:<registers>:<evidence>:<receipt>" per row, so deleting one pin,
 * swapping a pin for another row's, relabelling a row or dropping its run of record reads red (A3: labels are frozen
 * here, never inferred from a title).
 */
const EXPECTED_SHAPE: readonly string[] = [
  "L1:pinned:fixture pass:1:0:0:-",
  "L2a:pinned:fixture pass:1:0:0:-",
  "L2b:pinned:code present:1:1:0:-",
  "L2c:pinned:fixture pass:2:0:0:-",
  "L3:pinned:fixture pass:1:0:0:-",
  "L4:pinned:fixture pass:1:0:0:-",
  "L5:pinned:fixture pass:1:0:0:-",
  "L6:pinned:fixture pass:1:0:0:-",
  "L7:pinned:fixture pass:1:0:0:-",
  "L8:pinned:fixture pass:1:0:0:-",
  "L9:pinned:fixture pass:1:0:0:-",
  "L10:open:code present:0:0:1:-",
  "L11a:pinned:fixture pass:1:0:0:-",
  "L11b:open:not started:0:0:0:-",
  "L12:open:code present:0:0:1:-",
  "L13a:pinned:fixture pass:2:0:0:-",
  "L13b:receipted:fixture pass:0:1:0:cmd_522b936cae3e",
  "L13c:receipted:live SDK pass:0:1:0:cmd_5143a9680f91",
  "L14a:pinned:fixture pass:3:0:0:-",
  "L14b:open:code present:0:1:0:-",
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
  "L13c|registers|workbench-furnace-hosted-retry-live-receipt.test.ts|refuses a focused live row through the tier's own vitest config: forge's furnace-hosted-live command runs vitest.furnace-hosted.config.ts, whose module pins allowOnly false over the live file",
  "L14a|pin|workbench-detached-shared-child-receipt.test.ts|flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)",
  "L14a|pin|workbench-detached-shared-child-receipt.test.ts|flags a non-owner stop that was accepted, untyped, or that disturbed the child",
  "L14a|pin|workbench-control.test.ts|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
  "L14b|registers|workbench-detached-shared-child-receipt.test.ts|registers the runner as one additive Forge command outside the default gate",
];
/** F1: the rows AC2 iterates, frozen, so dropping a row from the judged set reads red. */
const EXPECTED_JUDGED_ROWS: readonly string[] = ["L1", "L2a", "L2b", "L2c", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11a", "L12", "L13a", "L13b", "L13c", "L14a", "L14b"];
/** Open rows with no bead filed, listed for the groom follow-up. */
const UNFILED_ROWS: readonly string[] = ["L10", "L11b", "L12", "L14b"];
/** O1: the split locations every row of which is covered (each half carries its own proof). */
const FULLY_COVERED_SPLITS: readonly string[] = ["L2", "L13"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });
const shapeOf = (row: Row): string => `${row.row}:${row.status}:${row.label}:${row.pins.length}:${row.registers === undefined ? 0 : 1}:${row.evidence?.length ?? 0}:${row.receipt?.id ?? "-"}`;

/** Every default-gate case a row names, judged against the gate's own report: its coverage pins, its registration pin and its evidence. */
const JUDGED = ROWS.flatMap(row => [...row.pins.map(entry => ({ row, kind: "pin", entry })), ...(row.registers === undefined ? [] : [{ row, kind: "registers", entry: row.registers }]), ...(row.evidence ?? []).map(entry => ({ row, kind: "evidence", entry }))]);
const JUDGED_ROWS = ROWS.filter(row => row.pins.length > 0 || row.registers !== undefined || (row.evidence?.length ?? 0) > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, kind: string, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}/${kind}: ${verdict.code}: ${verdict.why}`);

/** F1: every entry the AC2 cases actually hand the judge, accumulated as they run, so the iteration is measured. */
const AC2_JUDGED: string[] = [];
const judgedKey = (rowId: string, kind: string, entry: Pin): string => `${rowId}|${kind}|${basename(entry.file)}|${entry.title}`;

/** The words of a line: a command or a run id matches only as a whole token, never inside a longer name. */
const tokensOf = (text: string): readonly string[] => text.split(/[^\w-]+/).filter(token => token.length > 0);

const corpusOf = (files: readonly { readonly file: string; readonly text: string }[]): CorpusLine[] =>
  files.flatMap(({ file, text }) => text.split("\n").map((line, index) => ({ file, line: index + 1, text: line })));

/** The receipts corpus at HEAD: TRACEABILITY.md and every per-bead receipt file, each line numbered. */
const receiptsCorpus = (): CorpusLine[] =>
  corpusOf(
    [
      TRACEABILITY_FILE,
      ...readdirSync(join(ROOT, RECEIPTS_DIR))
        .filter(name => name.endsWith(".md"))
        .sort()
        .map(name => `${RECEIPTS_DIR}/${name}`),
    ].map(file => ({ file, text: readRepo(file) })),
  );

/**
 * A3, the receipt rule, as one pure reading of a row against a receipts corpus; every problem names the row. A run of
 * record (receipt or supersedes) is a cmd_ id found as a whole token on a line of its own receipt file that also names
 * the row's command. A receipt label rests on such a receipt; a default-gate row claims at most "fixture pass"; an open
 * row claims no pass; a forge-command row claims a pass only with a receipt, and that receipt is its tracking bead's own
 * file. A command the row carries no receipt for (its own, or the one that injects its fault) has no run of record in
 * the corpus, and every run id the row's text cites is in the corpus.
 */
function labelProblems(row: Row, corpus: readonly CorpusLine[]): string[] {
  const out: string[] = [];
  const problem = (text: string): void => {
    out.push(`row ${row.row}: ${text}`);
  };
  const command = row.command;
  const linesWith = (token: string): CorpusLine[] => corpus.filter(line => tokensOf(line.text).includes(token));
  const runOf = (name: string): CorpusLine | undefined =>
    corpus.find(line => {
      const tokens = tokensOf(line.text);
      return tokens.includes(name) && tokens.some(token => RUN_ID.test(token));
    });
  const records: readonly (readonly [string, RunOfRecord | undefined])[] = [
    ["receipt", row.receipt],
    ["supersedes", row.supersedes],
  ];
  for (const [role, record] of records) {
    if (record === undefined) continue;
    if (!RUN_ID.test(record.id)) {
      problem(`its ${role} "${record.id}" is not a forge run id (cmd_ and twelve hex digits)`);
      continue;
    }
    const lines = linesWith(record.id);
    if (lines.length === 0) {
      problem(`its ${role} ${record.id} is absent from ${RECEIPTS_DIR} and ${TRACEABILITY_FILE}`);
      continue;
    }
    const own = lines.filter(line => line.file === record.file);
    if (own.length === 0) problem(`its ${role} ${record.id} is not recorded in ${record.file}`);
    else if (command === undefined || !own.some(line => tokensOf(line.text).includes(command))) problem(`its ${role} ${record.id} sits on no ${record.file} line naming its command ${command ?? "(none)"}`);
  }
  if (RECEIPT_LABELS.includes(row.label) && row.receipt === undefined) problem(`"${row.label}" rests on a cmd_ run of record, and the row carries none`);
  if (row.tier === "default-gate" && RECEIPT_LABELS.includes(row.label)) problem(`a default-gate row claims at most "fixture pass", never "${row.label}"`);
  if (row.status === "open" && PASS_LABELS.includes(row.label)) problem(`an open row is never counted passed, yet it claims "${row.label}"`);
  if (row.tier === "forge-command" && row.receipt === undefined && PASS_LABELS.includes(row.label)) problem(`no report this leg reads vouches for forge run ${command ?? "(none)"} and no receipt carries it, so "${row.label}" is unearned`);
  if (row.receipt !== undefined && row.receipt.file !== `${RECEIPTS_DIR}/${row.trackingBead ?? "(none)"}.md`) problem(`its receipt file ${row.receipt.file} is not its tracking bead's own receipt (tracking bead ${row.trackingBead ?? "(none)"})`);
  for (const name of [row.receipt === undefined ? command : undefined, row.injectsAt]) {
    if (name === undefined) continue;
    const recorded = runOf(name);
    if (recorded !== undefined) problem(`it carries no receipt for forge run ${name}, yet ${recorded.file}:${recorded.line} records that command beside a run id: restate the row against that run of record`);
  }
  for (const cited of tokensOf(`${row.reason} ${row.truth ?? ""}`).filter(token => RUN_ID.test(token))) {
    if (linesWith(cited).length === 0) problem(`its text cites ${cited}, which no line of ${RECEIPTS_DIR} or ${TRACEABILITY_FILE} records`);
  }
  return out;
}

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
  return docsClauses([row.quote]).includes(clause);
}

/** U1: whole clauses bound to their OWN location, not borrowed from another split row. */
const LOCATION_QUOTES: Readonly<Record<string, string>> = {
  L1: "Before provider call",
  L2: "after provider side effect but before host result",
  L3: "after result before journal append",
  L4: "before event persist",
  L5: "after reconnect but before snapshot",
  L6: "Before/after Claude SDK session ID first received",
  L7: "Before/after Claude SDK session ID first received",
  L8: "during tool execution",
  L9: "after output tokens streamed but before final",
  L10: "Inside worktree after edits but before Forge gate",
  L11: "after Forge evidence while workspace mutates",
  L12: "after isolated cleanup",
  L13: "Parent Furnace Work retry while child Run establishment is uncertain",
  L14: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
};

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
    out.push(...quoteProblems(row, rendered));
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** U1: the Before/after pair is one verbatim quote; L14 joins its two whole clauses explicitly. */
function quoteProblems(row: Row, items: readonly string[]): string[] {
  const expected = LOCATION_QUOTES[row.location];
  const problem = `row ${row.row}: its own location ${row.location} requires the whole quote "${expected ?? "(unknown)"}", got "${row.quote}"`;
  if (expected === undefined || row.quote !== expected) return [problem];
  const raw = items.flatMap(item => item.replace(/\.$/, "").split(";").map(clause => clause.trim()));
  const clauses = expected.split(";").map(clause => clause.trim());
  // Keep the Before/after pair intact: narrowing it to Before must name BOTH session-id rows (K4).
  if (!clauses.every(clause => raw.includes(clause))) return [`row ${row.row}: its whole quote "${row.quote}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`];
  // L14's declared merge must not lose its second clause.
  if (row.location === "L14" && row.merges !== MERGED_CLAUSE) return [`row ${row.row}: L14 must name its merged ownership clause`];
  return [];
}

/** The synthetic document the drift falsifiers run over: the frozen bullets under the real heading shape, never the live text. */
const synthetic = (edit: (list: string) => string = list => list, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(SECTION_MARKDOWN)}\n${tail}\n## Performance benchmark\n\nText.\n`;
const editList = (from: string, to: string) => (list: string): string => list.replace(from, to);
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

describe("wb-0kg.12 docs/workbench/14 fault-injection-locations census (report mode)", () => {
  it("AC1: the table holds the twenty frozen rows in order, deeply frozen, with the frozen per-row status, label, pin and receipt shape", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROW_IDS).toEqual(EXPECTED_ROW_IDS);
    expect(new Set(ROW_IDS).size).toBe(ROWS.length);
    expect(ROWS).toHaveLength(20);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(JUDGED.map(judged => `${judged.row.row}|${judged.kind}|${judged.entry.file.split("/").pop()}|${judged.entry.title}`)).toEqual(EXPECTED_JUDGED);
    expect(JUDGED_ROWS.map(row => row.row)).toEqual(EXPECTED_JUDGED_ROWS);
  });

  it("AC1: the live section renders exactly its five frozen bullets as one list, HTML-free", () => {
    const drift = docsFailures(readRepo(DOCS_FILE));
    expect(drift, drift.join(" | ")).toEqual([]);
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
    expect(splitLocations.filter(location => ROWS.filter(row => row.location === location).every(row => row.half === "covered"))).toEqual(FULLY_COVERED_SPLITS);
    for (const location of splitLocations) {
      const rows = ROWS.filter(row => row.location === location);
      expect(
        rows.every(row => row.half !== undefined),
        `${location}: a split location must not mix split and unsplit rows`,
      ).toBe(true);
      const covered = rows.filter(row => row.half === "covered");
      const uncovered = rows.filter(row => row.half === "uncovered");
      if (!FULLY_COVERED_SPLITS.includes(location)) expect(uncovered.length, `${location} uncovered`).toBeGreaterThan(0);
      expect(covered.length, `${location} covered`).toBeGreaterThan(0);
      for (const row of covered) {
        if (row.status === "receipted") expect(row.receipt, `${row.row}: a receipted covered row names its run of record`).toBeDefined();
        else {
          expect(row.status, row.row).toBe("pinned");
          expect(row.pins.length, row.row).toBeGreaterThan(0);
        }
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

  it("A3: no open row is counted passed, a pinned row claims fixture pass (code present for an injection stand-in) and never more, a receipted row rests on its run of record, and unfiled gaps are exactly the listed ones", () => {
    const open = ROWS.filter(row => row.status === "open");
    const pinned = ROWS.filter(row => row.status === "pinned");
    const receipted = ROWS.filter(row => row.status === "receipted");
    expect(open.length + pinned.length + receipted.length).toBe(ROWS.length);
    for (const row of open) {
      expect(OPEN_LABELS, row.row).toContain(row.label);
      expect(row.pins, `${row.row}: an open row carries no coverage pin`).toEqual([]);
      expect(row.receipt, `${row.row}: an open row carries no run of record`).toBeUndefined();
      expect(row.reason.trim().length, `${row.row}: an open row needs a reason`).toBeGreaterThan(40);
      expect(row.unfiled === true || (row.trackingBead ?? "").length > 0, `${row.row}: an open row names a tracking bead or is listed as unfiled`).toBe(true);
    }
    for (const row of pinned) {
      expect(row.pins.length, `${row.row}: a pinned row has pins`).toBeGreaterThan(0);
      expect(row.tier, `${row.row}: a pinned row is judged by the default gate's report`).toBe("default-gate");
      expect(row.receipt, `${row.row}: the report vouches for a pinned row, never a receipt`).toBeUndefined();
      if (row.injectsAt === undefined) expect(row.label, `${row.row}: a pinned default-gate row claims at most fixture pass`).toBe("fixture pass");
      else expect(row.label, `${row.row}: a static-text pin names the command that injects and may not claim a pass`).toBe("code present");
    }
    for (const row of receipted) {
      expect(row.tier, `${row.row}: a receipted row's run is a forge command`).toBe("forge-command");
      expect(row.pins, `${row.row}: a receipted row's coverage is its run of record, never a pin`).toEqual([]);
      expect(row.receipt, `${row.row}: a receipted row names its run of record`).toBeDefined();
      expect(PASS_LABELS, row.row).toContain(row.label);
      expect(row.trackingBead ?? "", `${row.row}: a receipted row names the bead whose receipt it is`).not.toBe("");
    }
    expect(receipted.map(row => row.row)).toEqual(["L13b", "L13c"]);
    expect(open.filter(row => row.unfiled === true).map(row => row.row)).toEqual(UNFILED_ROWS);
  });

  it("A3: a forge-command row names its command and the default-gate case that registers it outside the gate; no report vouches for the command run, so it is open with code present unless a run of record carries it", () => {
    const forgeRows = ROWS.filter(row => row.tier === "forge-command");
    expect(forgeRows.map(row => row.row)).toEqual(["L13b", "L13c", "L14b"]);
    for (const row of forgeRows) {
      expect(row.command, `${row.row}: names its forge command`).toBeDefined();
      expect(row.registers, `${row.row}: names the registration case`).toBeDefined();
      expect(row.pins, `${row.row}: no default-gate pin covers a command run`).toEqual([]);
      if (row.receipt === undefined) {
        expect(row.status, row.row).toBe("open");
        expect(row.label, `${row.row}: a command run no report or receipt vouches for earns no pass label`).toBe("code present");
      } else expect(row.status, `${row.row}: a run of record makes the row receipted`).toBe("receipted");
    }
    expect(forgeRows.map(row => `${row.row}:${row.command}:${row.receipt?.id ?? "-"}`)).toEqual(["L13b:furnace-hosted-retry-fault:cmd_522b936cae3e", "L13c:furnace-hosted-live:cmd_5143a9680f91", "L14b:local-detached-shared-child:-"]);
    expect(ROWS.find(row => row.row === "L2b")?.injectsAt).toBe("local-detached-faults");
    expect(ROWS.find(row => row.row === "L2b")?.registers).toBeDefined();
  });

  it("A3 receipt rule: every row's label is earned over the receipts corpus at HEAD (docs/workbench/receipts and TRACEABILITY.md)", () => {
    const corpus = receiptsCorpus();
    expect(corpus.some(line => line.file === TRACEABILITY_FILE)).toBe(true);
    expect(new Set(corpus.map(line => line.file)).size).toBeGreaterThan(1);
    expect(ROWS.flatMap(row => labelProblems(row, corpus))).toEqual([]);
  });

  it("U2: L13 is restated against its runs of record - the fixture runner's (receipts/wb-3hc.md) and the live leg forge run furnace-hosted-live (receipts/wb-0m7.md, superseding the wb-3hc live run) - and the live file is outside the default gate", () => {
    const l13 = ROWS.filter(row => row.location === "L13").map(row => `${row.row}:${row.tier}:${row.command ?? "-"}:${row.label}:${row.receipt?.id ?? "-"}:${row.receipt?.file ?? "-"}:${row.supersedes?.id ?? "-"}:${row.trackingBead ?? "-"}`);
    expect(l13).toEqual([
      "L13a:default-gate:-:fixture pass:-:-:-:-",
      "L13b:forge-command:furnace-hosted-retry-fault:fixture pass:cmd_522b936cae3e:docs/workbench/receipts/wb-3hc.md:-:wb-3hc",
      "L13c:forge-command:furnace-hosted-live:live SDK pass:cmd_5143a9680f91:docs/workbench/receipts/wb-0m7.md:cmd_36faa08b6478:wb-0m7",
    ]);
    expect(UNFILED_ROWS).not.toContain("L13b");
    const [live] = judge(REPORT, [{ file: HOSTED_LIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(live?.code).toBe("not-collected");
  });

  it.each(JUDGED_ROWS.map(row => ({ row })))("AC2 row $row.row: every named default-gate case is collected once, passed and asserting in the gate's own report", ({ row }) => {
    expect.hasAssertions();
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
      AC2_JUDGED.push(...group.map(entry => judgedKey(row.row, kind, entry.entry)));
    }
  });

  it("AC2 completeness (F1): the AC2 cases handed the judge exactly the frozen judged set, every row and every kind, none skipped", () => {
    expect([...AC2_JUDGED].sort()).toEqual([...EXPECTED_JUDGED].sort());
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

describe("wb-0kg.12 A3 receipt rule falsifiers (synthetic rows over a synthetic corpus, then the real corpus)", () => {
  const SYNTHETIC_RUN = "cmd_0123456789ab";
  const NEIGHBOUR_RUN = "cmd_ba9876543210";
  const corpus = corpusOf([
    { file: TRACEABILITY_FILE, text: "# Traceability\n\nNo run of record here.\n" },
    {
      file: `${RECEIPTS_DIR}/wb-live.md`,
      text: `# wb-live: a synthetic live tier\n\n## 2026-01-01 receipt\n\n- Run of record: forge run demo-live ${SYNTHETIC_RUN} exit 0, pass true.\n- Neighbour: forge run demo-other ${NEIGHBOUR_RUN} exit 0.\n`,
    },
  ]);
  const clean: Row = {
    row: "S1",
    location: "L13",
    text: "a synthetic receipted live leg",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "live SDK pass",
    tier: "forge-command",
    command: "demo-live",
    registers: pin(RETRY_LIVE_RECEIPT, "a registration case"),
    pins: [],
    receipt: run(SYNTHETIC_RUN, "wb-live"),
    status: "receipted",
    half: "covered",
    trackingBead: "wb-live",
    reason: "a synthetic receipted live row resting on its run of record",
  };
  const expectRed = (row: Row, fragment: string, over: readonly CorpusLine[] = corpus): void => {
    const problems = labelProblems(row, over);
    expect(
      problems.some(line => line.includes(fragment)),
      `expected a problem containing "${fragment}", got ${JSON.stringify(problems)}`,
    ).toBe(true);
    expect(problems.every(line => line.startsWith(`row ${row.row}: `))).toBe(true);
  };
  const realRow = (id: string): Row => {
    const row = ROWS.find(candidate => candidate.row === id);
    if (row === undefined) throw new Error(`row ${id} is not in the table`);
    return row;
  };

  it("Q1 residual G23 analogue: contradictory alternatives on a matching receipt line are quiet; no regex-oracle mode is claimed", () => {
    const alternative = corpusOf([{ file: `${RECEIPTS_DIR}/wb-live.md`, text: `forge run demo-live ${SYNTHETIC_RUN}: pass true OR pass false; verdict unknown` }]);
    expect(labelProblems(clean, alternative)).toEqual([]);
  });

  it("Q2 residual receipt verdict fields: a matching receipt saying pass false and findings stays quiet", () => {
    const failed = corpusOf([{ file: `${RECEIPTS_DIR}/wb-live.md`, text: `forge run demo-live ${SYNTHETIC_RUN}: pass false, findings [fixture finding]` }]);
    expect(labelProblems(clean, failed)).toEqual([]);
  });

  it("Q3 residual historical revision: a matching old revision is not re-measured against HEAD", () => {
    const historical = corpusOf([{ file: `${RECEIPTS_DIR}/wb-live.md`, text: `forge run demo-live ${SYNTHETIC_RUN}: revision 0000000, dirty true, historical only` }]);
    expect(labelProblems(clean, historical)).toEqual([]);
  });

  it("Q4 residual label semantics: a valid synthetic record is quiet for each receipt label; the current table's literal is its label authority", () => {
    for (const label of FROZEN_RECEIPT_LABELS) expect(labelProblems({ ...clean, label }, corpus), label).toEqual([]);
  });

  it("Q6 residual command execution: matching receipt text is quiet without re-running its command at HEAD", () => {
    const notRerun = corpusOf([{ file: `${RECEIPTS_DIR}/wb-live.md`, text: `forge run demo-live ${SYNTHETIC_RUN}: not re-run at HEAD` }]);
    expect(labelProblems(clean, notRerun)).toEqual([]);
  });

  it("R0 control: a receipted live row whose run of record sits on its own receipt line beside its command reads clean", () => {
    expect(labelProblems(clean, corpus)).toEqual([]);
  });

  it.each(FROZEN_RECEIPT_LABELS.map(label => ({ label })))("R1 an unreceipted '$label' row is red", ({ label }) => {
    expectRed({ ...clean, label, receipt: undefined }, `"${label}" rests on a cmd_ run of record, and the row carries none`);
  });

  it("R2 a receipt id absent from the receipts is red", () => {
    expectRed({ ...clean, receipt: run("cmd_ffffffffffff", "wb-live") }, "its receipt cmd_ffffffffffff is absent from docs/workbench/receipts");
  });

  it("R3 a default-gate pinned row with a live label is red, even beside a found receipt", () => {
    expectRed({ ...clean, tier: "default-gate", status: "pinned", pins: [pin(CANCEL_FAULTS, "a pinned case")] }, 'a default-gate row claims at most "fixture pass", never "live SDK pass"');
  });

  it("R4 a receipt that is not a forge run id is red", () => {
    expectRed({ ...clean, receipt: run("cmd_not-a-run", "wb-live") }, 'its receipt "cmd_not-a-run" is not a forge run id');
  });

  it("R5 a borrowed receipt (the id sits only on a line naming another command) is red", () => {
    expectRed({ ...clean, receipt: run(NEIGHBOUR_RUN, "wb-live") }, `its receipt ${NEIGHBOUR_RUN} sits on no docs/workbench/receipts/wb-live.md line naming its command demo-live`);
  });

  it("R6 a receipt the named receipt file does not record is red", () => {
    expectRed({ ...clean, receipt: run(SYNTHETIC_RUN, "wb-elsewhere"), trackingBead: "wb-elsewhere" }, `its receipt ${SYNTHETIC_RUN} is not recorded in docs/workbench/receipts/wb-elsewhere.md`);
  });

  it("R7 a forge-command row with no receipt while the corpus records a run of its command is red (the stale-reason class)", () => {
    expectRed({ ...clean, label: "code present", status: "open", half: "uncovered", receipt: undefined, unfiled: true, trackingBead: undefined }, "it carries no receipt for forge run demo-live, yet docs/workbench/receipts/wb-live.md:5 records that command beside a run id");
  });

  it("R8 an open row with a pass label is red", () => {
    expectRed({ ...clean, status: "open" }, 'an open row is never counted passed, yet it claims "live SDK pass"');
  });

  it.each(FROZEN_PASS_LABELS.map(label => ({ label })))("R8 per pass label: an open '$label' row is red", ({ label }) => {
    expectRed({ ...clean, status: "open", label }, `an open row is never counted passed, yet it claims "${label}"`);
  });

  it("R9 a receipt that is not the tracking bead's own receipt file is red", () => {
    expectRed({ ...clean, trackingBead: "wb-other" }, "is not its tracking bead's own receipt (tracking bead wb-other)");
  });

  it("R10 a run id a row's text cites that no receipt records is red", () => {
    expectRed({ ...clean, reason: "cites a phantom run cmd_aaaaaaaaaaaa as its proof" }, "its text cites cmd_aaaaaaaaaaaa");
  });

  it("R11 a forge-command fixture pass with no receipt is red", () => {
    expectRed({ ...clean, label: "fixture pass", command: "demo-unrecorded", receipt: undefined }, 'no report this leg reads vouches for forge run demo-unrecorded and no receipt carries it, so "fixture pass" is unearned');
  });

  it("R12 a superseded run of record that no receipt records is red", () => {
    expectRed({ ...clean, supersedes: run("cmd_eeeeeeeeeeee", "wb-live") }, "its supersedes cmd_eeeeeeeeeeee is absent");
  });

  it("R13 an injection command that has a run of record while the row carries no receipt is red", () => {
    expectRed(
      { ...clean, tier: "default-gate", status: "pinned", label: "code present", command: undefined, receipt: undefined, injectsAt: "demo-live", pins: [pin(CANCEL_FAULTS, "a pinned case")], trackingBead: undefined },
      "it carries no receipt for forge run demo-live, yet",
    );
  });

  it("G1/G2 over the real corpus: the real L1 row relabelled with any receipt label is red twice (no run of record; a default-gate row claims at most fixture pass)", () => {
    const real = receiptsCorpus();
    for (const label of FROZEN_RECEIPT_LABELS) {
      expect(labelProblems({ ...realRow("L1"), label }, real)).toEqual([`row L1: "${label}" rests on a cmd_ run of record, and the row carries none`, `row L1: a default-gate row claims at most "fixture pass", never "${label}"`]);
    }
  });

  it("U2 over the real corpus: the prior cut's L13b (open, code present, no receipt) reads red naming the run of record its command has in receipts/wb-3hc.md", () => {
    const prior: Row = {
      ...realRow("L13b"),
      label: "code present",
      status: "open",
      half: "uncovered",
      receipt: undefined,
      trackingBead: undefined,
      unfiled: true,
      truth: undefined,
      reason:
        "the runner node qa/workbench/furnace-hosted-retry-fault.mjs realises the five journeys only under forge run furnace-hosted-retry-fault; no report this leg reads vouches for that run and no receipt of record for it sits in docs/workbench/receipts, so no run label is earned; no bead is filed yet, listed for groom follow-up",
    };
    const problems = labelProblems(prior, receiptsCorpus());
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatch(/^row L13b: it carries no receipt for forge run furnace-hosted-retry-fault, yet docs\/workbench\/receipts\/wb-3hc\.md:\d+ records that command beside a run id/);
  });

  it("U2 over the real corpus: the live leg pointed at the fixture runner's run of record is a borrowed receipt, and the live run of record does not stand for the fixture runner", () => {
    const real = receiptsCorpus();
    expect(labelProblems({ ...realRow("L13c"), receipt: run("cmd_522b936cae3e", "wb-3hc"), trackingBead: "wb-3hc" }, real)).toContain("row L13c: its receipt cmd_522b936cae3e sits on no docs/workbench/receipts/wb-3hc.md line naming its command furnace-hosted-live");
    expect(labelProblems({ ...realRow("L13b"), receipt: run("cmd_5143a9680f91", "wb-0m7"), trackingBead: "wb-0m7" }, real)).toContain("row L13b: its receipt cmd_5143a9680f91 sits on no docs/workbench/receipts/wb-0m7.md line naming its command furnace-hosted-retry-fault");
  });

  it("U2 over the real corpus: a receiptless forge-command row whose command has no run of record stays clean (L14b), and so does the L2b injection stand-in", () => {
    const real = receiptsCorpus();
    expect(labelProblems(realRow("L14b"), real)).toEqual([]);
    expect(labelProblems(realRow("L2b"), real)).toEqual([]);
  });
});

describe("wb-0kg.12 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${SECTION_MARKDOWN}\n`)).toEqual([]);
  });

  it("K1 names the Furnace-retry rows (and only them) when bullet four is dropped", () => {
    const lines = docsFailures(synthetic(editList("\n- Parent Furnace Work retry while child Run establishment is uncertain.", "")));
    expect(named(lines)).toEqual(["row L13a", "row L13b", "row L13c"]);
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

/** Rule 16/U1: each row's OWN location and whole quote, literal at cut time, including split rows. */
const EXPECTED_QUOTES: readonly string[] = [
  "L1:L1:Before provider call",
  "L2a:L2:after provider side effect but before host result",
  "L2b:L2:after provider side effect but before host result",
  "L2c:L2:after provider side effect but before host result",
  "L3:L3:after result before journal append",
  "L4:L4:before event persist",
  "L5:L5:after reconnect but before snapshot",
  "L6:L6:Before/after Claude SDK session ID first received",
  "L7:L7:Before/after Claude SDK session ID first received",
  "L8:L8:during tool execution",
  "L9:L9:after output tokens streamed but before final",
  "L10:L10:Inside worktree after edits but before Forge gate",
  "L11a:L11:after Forge evidence while workspace mutates",
  "L11b:L11:after Forge evidence while workspace mutates",
  "L12:L12:after isolated cleanup",
  "L13a:L13:Parent Furnace Work retry while child Run establishment is uncertain",
  "L13b:L13:Parent Furnace Work retry while child Run establishment is uncertain",
  "L13c:L13:Parent Furnace Work retry while child Run establishment is uncertain",
  "L14a:L14:Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
  "L14b:L14:Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
];

/** U2: independent falsifier inputs, never derived from the rule vocabulary they judge. */
const FROZEN_PASS_LABELS: readonly TruthLabel[] = ["fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"];
const FROZEN_RECEIPT_LABELS: readonly TruthLabel[] = ["live SDK pass", "adversarial pass", "scale benchmark pass"];
const FROZEN_OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];

const QUOTE_MUTANTS: readonly { readonly id: string; readonly row: string; readonly quote: string }[] = [
  { id: "H3b", row: "L2b", quote: "after provider side effect" },
  { id: "H3c", row: "L14b", quote: "Concurrent readers with one shared child" },
  { id: "H3d", row: "L13c", quote: "Parent Furnace Work retry" },
  { id: "H3f", row: "L11b", quote: "after Forge evidence" },
  { id: "H3g", row: "L2a", quote: "Before provider call" },
  { id: "H3h", row: "L6", quote: "Before/after Claude SDK session ID" },
  { id: "H3i", row: "L2b", quote: "" },
  { id: "H3j", row: "L11a", quote: "after Forge evidence while workspace" },
];

describe("wb-0kg.12 R596 frozen quotes and label vocabulary", () => {
  it("U1: every row's own location and verbatim quote is frozen, not just the unique-quote rows", () => {
    expect(ROWS.map(row => `${row.row}:${row.location}:${row.quote}`)).toEqual(EXPECTED_QUOTES);
  });

  it("U2: pass, receipt and open label vocabularies equal their independent docs/14 literals", () => {
    expect(PASS_LABELS).toEqual(FROZEN_PASS_LABELS);
    expect(RECEIPT_LABELS).toEqual(FROZEN_RECEIPT_LABELS);
    expect(OPEN_LABELS).toEqual(FROZEN_OPEN_LABELS);
    const docs = readRepo(DOCS_FILE);
    for (const label of FROZEN_PASS_LABELS) expect(docs).toContain(`"${label}"`);
    expect(docs).toContain('"code present"');
  });

  it("the eight gate-named quote mutant ids and targets are frozen, so shrinking this falsifier table reads red", () => {
    expect(QUOTE_MUTANTS.map(row => `${row.id}:${row.row}`)).toEqual(["H3b:L2b", "H3c:L14b", "H3d:L13c", "H3f:L11b", "H3g:L2a", "H3h:L6", "H3i:L2b", "H3j:L11a"]);
  });

  it.each(QUOTE_MUTANTS)("$id: shortened, empty or swapped quote fails naming its OWN row $row", mutant => {
    expect.hasAssertions();
    const row = ROWS.find(candidate => candidate.row === mutant.row);
    if (row === undefined) throw new Error(`missing row ${mutant.row}`);
    const problems = quoteProblems({ ...row, quote: mutant.quote }, ITEMS);
    expect(problems.length, mutant.id).toBeGreaterThan(0);
    expect(problems.every(line => line.startsWith(`row ${mutant.row}:`)), mutant.id).toBe(true);
  });
});


describe("wb-0kg.12 R596 enumeration and named residual quiet rows", () => {
  it("Q5 residual semantic adequacy: an unrelated real passing pin is ok to the report judge but not a member of this row's frozen judged set", () => {
    const donor = ROWS.find(row => row.row === "L6")?.pins[0];
    if (donor === undefined) throw new Error("L6 donor pin missing");
    const [verdict] = judge(REPORT, [casePin(donor)]);
    expect(verdict?.code).toBe("ok");
    expect(EXPECTED_JUDGED).not.toContain(judgedKey("L9", "pin", donor));
  });

  it("Q7 residual uncovered locations: the four unfiled locations remain open, receiptless and unpassed", () => {
    const open = ROWS.filter(row => row.status === "open");
    expect(open.map(row => row.row)).toEqual(["L10", "L11b", "L12", "L14b"]);
    for (const row of open) {
      expect(FROZEN_OPEN_LABELS).toContain(row.label);
      expect(row.pins).toEqual([]);
      expect(row.receipt).toBeUndefined();
    }
  });

  it("R596: the header enumerates exactly P1-P6 and R1-R7, and every named quote and quiet row is registered once in run mode", ({ task }) => {
    const header = readRepo(SELF).split("*/")[0] ?? "";
    expect([...header.matchAll(/PINNED (P[0-9]+) /g)].map(match => match[1])).toEqual(["P1", "P2", "P3", "P4", "P5", "P6"]);
    expect([...header.matchAll(/^ \* (R[0-9]+) /gm)].map(match => match[1])).toEqual(["R1", "R2", "R3", "R4", "R5", "R6", "R7"]);
    const registered: { readonly name: string; readonly mode: string }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    for (const id of ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "H3b", "H3c", "H3d", "H3f", "H3g", "H3h", "H3i", "H3j"]) {
      const cases = registered.filter(child => child.name.startsWith(`${id} `) || child.name.startsWith(`${id}:`) || child.name.startsWith(`'${id}':`));
      expect(cases.map(child => child.mode), id).toEqual(["run"]);
      expect(header, id).toContain(id);
    }
    for (const label of FROZEN_RECEIPT_LABELS) expect(registered.filter(child => child.name === `R1 an unreceipted ''${label}'' row is red`).map(child => child.mode), label).toEqual(["run"]);
    for (const label of FROZEN_PASS_LABELS) expect(registered.filter(child => child.name === `R8 per pass label: an open ''${label}'' row is red`).map(child => child.mode), label).toEqual(["run"]);
  });
});
