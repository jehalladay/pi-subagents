/**
 * VC-7 / W12 / W18 falsifier (wb-0kg.11): the docs/workbench/08 "Adversarial test matrix" census, a census leg of the
 * wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT MODE through the
 * shared helper test/helpers/census.ts (judge(.forge/vitest-report.json, pins)).
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that would
 * fail if a critical guarantee was quietly weakened." and "All docs and status tables must distinguish "code present",
 * "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"".
 *
 * docs/08 "Adversarial test matrix" lists nine scenarios in one sentence and binds them to one outcome sentence
 * ("Required outcomes: reconciliation/uncertainty/conflict; no duplicate effects, no invented PASS, no implicit mass
 * cancellation."). Nothing else binds those scenarios to a landed case, so a rename, deletion or disabling of an
 * embodying case would leave the docs matrix intact with every suite green, and a scenario with NO deterministic case
 * would be indistinguishable from a covered one. This file is that binding: a frozen nine-row table that ties each
 * scenario to the cases that prove it, or to an unpinned row naming what is missing. It never counts an unpinned
 * scenario as passed and never claims a live, native or scale pass from a title being present.
 *
 * Judging. This leg executes no pinned case and scans no test source for case calls itself (the only source it parses
 * is its own, for the U5 file-read check). judge() reads vitest's own JSON report of the default gate's test step
 * (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned case counts only when the
 * gate's own run collected it exactly once, recorded it passed, and its body asserts - the helper's three legs,
 * fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case reads red,
 * naming the scenario, the file, the title and the cause, as far as the helper's resolvable-construct roster and its
 * named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). The hand scanner and the vitest.config.ts text
 * read this file carried before the adoption (the wb-0kg.11 first cut, 95ac0ca, and its respin 68b6c53) are gone: the
 * report is the tier truth, so a pin file excluded from the default gate is not-collected here instead of passing a
 * text match.
 *
 * Frozen judged set (rule 16; respin 2 cures the g9 gate verdict of 2026-10-20 on 8b212b2, cmd_3bb7ae87a15f, U1-U6).
 * The table's shape (EXPECTED_SHAPE: pins, registration, halves and truth label per row), its row texts (EXPECTED_TEXT:
 * a digest of each row's reason, truth note and halves), every judged case (EXPECTED_JUDGED, it.each minimums included)
 * and the rows the AC2 it.each judges (EXPECTED_JUDGED_ROWS) are literals. Each AC2 case keys the verdicts the helper
 * returned and compares them with its row's EXPECTED_JUDGED entries, and the each-liveness case reads this file's own
 * task tree, so narrowing the judged rows, a row's kinds or group, or the it.each table, skipping an AC2 case, or
 * returning before a row's last assertion reads red. Every AC2 case runs on the file-local budget JUDGE_BUDGET_MS.
 *
 * Tiers. A pinned row's tier is the default gate (the report vouches for it). The bench-receipt command of scenario 7
 * (forge run local-detached-shared-child) and the live journey of scenario 4 (wb-0kg.3) are NOT vouched by any report
 * this leg reads: each is the UNCOVERED half of its row, recorded with its tier and never counted as covered. The
 * command's registration is judged as a default-gate pin, like any other. Every pinned row is proved by fixtures inside
 * the default gate, so its docs/14 label is "fixture pass"; no row claims "live SDK pass", "adversarial pass" or "scale
 * benchmark pass", labels no report this leg reads vouches for (U3).
 *
 * Docs. The section is judged through the helper's rendered view (docsSection / sectionMatches): under its unique
 * level-2 heading of the level-1 parent heading, bounded at the next level-1/2 heading or EOF, it must render as
 * exactly the one frozen paragraph. A dropped, reworded, appended-to or reordered scenario clause, or a dropped outcome
 * phrase, names its scenario; any other edit names the section. The live cases assert the scenario-naming drift list
 * FIRST, so a live drift fails naming its scenario before any exactness assertion runs (U2). The drift falsifiers run
 * over a SYNTHETIC document built from the frozen paragraph, never over the live docs/08 text.
 *
 * Half-coverage rule (O1/U6). A scenario covered in part keeps ONE row of the nine-row table and carries a covered half
 * (its own proof, tier and truth note) and an uncovered half (its own tier label and reason): scenarios 4, 7 and 9.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does not
 * follow; the real-process and live runs themselves; the helper's own named residuals; verdicts fabricated in this file
 * instead of read from judge(); a file read routed through another module (the leg's own reads go through readRepo, U5).
 * A landing that renames a pinned case updates this table in the same commit (pin-flip); a landing that closes an
 * uncovered half flips it to pinned here.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type TruthLabel = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass" | "scale benchmark pass" | "not started";
type Tier = "default-gate" | "live-journey" | "bench-receipt";
type RowStatus = "pinned" | "unpinned";
type HalfKind = "covered" | "uncovered";

interface Pin {
  readonly file: string;
  readonly title: string;
  /** Set for an it.each / it.for template pin: the minimum number of table rows the report must hold, each passed. */
  readonly each?: number;
}

interface Half {
  readonly half: HalfKind;
  /** What this half is: the proof it holds, or what is missing. */
  readonly what: string;
  /** What runs the claimed proof: the default gate, a live journey, or a bench-receipt forge command. */
  readonly tier: Tier;
  /** Bead tracking an uncovered half, when one is filed. */
  readonly trackingBead?: string;
  /** An uncovered half with no bead filed: listed for groom follow-up in the delivery note. */
  readonly unfiled?: boolean;
}

interface Row {
  readonly scenario: number;
  /** The docs/08 clause, verbatim in the rendered sentence. */
  readonly quote: string;
  /** The docs/08 required-outcome phrase this scenario is judged against. */
  readonly requiredOutcome: string;
  readonly label: TruthLabel;
  readonly status: RowStatus;
  readonly pins: readonly Pin[];
  /** For a bench-receipt half: the default-gate case that asserts the command is registered outside the gate. */
  readonly registers?: Pin;
  readonly halves?: readonly Half[];
  readonly trackingBead?: string;
  readonly reason: string;
  /** Tier-truth note: what the pins do and do not prove. */
  readonly truth?: string;
}

const OUTCOME_RECONCILIATION = "reconciliation/uncertainty/conflict";
const OUTCOME_NO_DUPLICATE = "no duplicate effects";
const OUTCOME_NO_INVENTED_PASS = "no invented PASS";
const OUTCOME_NO_MASS_CANCEL = "no implicit mass cancellation";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-adversarial-matrix.census.ts";
const DOCS_FILE = "docs/workbench/08-lifecycle-and-recovery.md";
const CENSUS_CONFIG = "vitest.census.config.ts";
const DOCS_HEADING = "Adversarial test matrix";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_PARENT = `08 ${EM_DASH} Execution identity, lifecycle, side effects, replay and recovery`;
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

/** U3: the one docs/14 label the default gate's report vouches for; every pinned row here is proved by fixtures inside it. */
const DEFAULT_GATE_LABEL: TruthLabel = "fixture pass";
/** U3: labels no report this leg reads can vouch for (a live SDK run, an adversarial run outside the fixtures, a scale benchmark). */
const UNVOUCHED_LABELS: readonly TruthLabel[] = ["live SDK pass", "adversarial pass", "scale benchmark pass"];
const OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];

const FURNACE_HOSTED = "test/workbench-furnace-hosted.test.ts";
const RETRY_FAULT = "test/workbench-furnace-hosted-retry-fault.test.ts";
const DETACHED_FAULTS = "test/workbench-detached-faults-receipt.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const FURNACE_OBSERVER = "test/workbench-furnace-observer.test.ts";
const PI_DETACHED = "test/workbench-pi-detached.test.ts";
const IDENTITY = "test/workbench-identity.test.ts";
const VALIDATE_REPLY = "test/workbench-validate-reply.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const RECONCILE_DECISION = "test/workbench-reconcile-decision.test.ts";
const NATIVE_DETAILS = "test/workbench-native-details.test.ts";
const FURNACE_CONTROL = "test/workbench-furnace-control.test.ts";
const SHARED_CHILD = "test/workbench-detached-shared-child-receipt.test.ts";
const FORGE_OBSERVER = "test/workbench-forge-observer.test.ts";

const pin = (file: string, title: string, each?: number): Pin => (each === undefined ? { file, title } : { file, title, each });

/** The nine docs/08 scenario clauses as a reader sees them, in order; the first is capitalised in the sentence. */
const QUOTES: readonly string[] = [
  "Kill after Furnace side effect before returned Run ID",
  "kill after workspace edit before recorded result",
  "reconnect a stream with missing events",
  "restart Pi while detached executor continues",
  "change source digest under same logical key",
  "issue control as observer-only",
  "cancel a wait on shared child",
  "exhaust Furnace slots with parents awaiting child",
  "change candidate source basis after Forge verify",
];
const OUTCOMES_PREFIX = "Required outcomes: ";
const OUTCOMES_TEXT = `${OUTCOME_RECONCILIATION}; ${OUTCOME_NO_DUPLICATE}, ${OUTCOME_NO_INVENTED_PASS}, ${OUTCOME_NO_MASS_CANCEL}.`;
const SENTENCE = `${QUOTES.join("; ")}.`;
const PARAGRAPH = `${SENTENCE} ${OUTCOMES_PREFIX}${OUTCOMES_TEXT}`;
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "paragraph", text: PARAGRAPH, markdown: PARAGRAPH }];

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
    scenario: 1,
    quote: QUOTES[0] ?? "",
    requiredOutcome: OUTCOME_NO_DUPLICATE,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(FURNACE_HOSTED, "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start"),
      pin(RETRY_FAULT, "an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded"),
    ],
    reason:
      "a Run-ID-less start closes the host and refuses a blind second start, and (wb-0kg.4 landed ccec844) an operator retry after an uncertain first Attempt opens a fresh bridge session with the first Attempt left parked",
    truth: "both cases run inside the default gate against the fixture Furnace host and the shipped SDK; no live Furnace process is killed",
  },
  {
    scenario: 2,
    quote: QUOTES[1] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(DETACHED_FAULTS, "flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal"),
      pin(EFFECT_REPLAY, "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect"),
      pin(EFFECT_REPLAY, "B1 after provider side effect but before host result: the resume refuses and the effect happens exactly once (%s)", 2),
      pin(EFFECT_REPLAY, "B1 after result before journal append: the resume refuses and the effect happens exactly once"),
    ],
    reason:
      "a terminal reported after a crash is flagged fabricated-terminal, a resume over a journaled non-read node surfaces a typed uncertain effect instead of re-running or replaying it, and (wb-5x0.1 landed 808abff, its AC B2 bound to this clause) a kill after the provider's side effect but before the host result, or after the result but before the journal append, makes the resume refuse with the effect performed exactly once",
    truth:
      "the detached-faults pin drives the pure receipt judge and the three replay pins the in-process runtime fixture (the wb-5x0.1 B1 cases kill the run through an abort signal, not a real process), all inside the default gate",
  },
  {
    scenario: 3,
    quote: QUOTES[2] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(OBSERVATION, "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
      pin(OBSERVATION, "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
      pin(FURNACE_OBSERVER, "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING"),
    ],
    reason: "a cursor gap is stale until a snapshot, reconnect alone never restores current, and a failed re-read is marked stale instead of asserting the last-known state",
  },
  {
    scenario: 4,
    quote: QUOTES[3] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "fixture pass",
    status: "pinned",
    pins: [pin(PI_DETACHED, "launches reviewed pure computation outside Pi ownership and reattaches by stable invocation")],
    halves: [
      {
        half: "covered",
        what: "the session-end-continues half: the pinned case launches outside Pi ownership, fires session_shutdown in the same process, then inspects by stable invocationId to a completed terminal",
        tier: "default-gate",
      },
      {
        half: "uncovered",
        what: "a real Pi restart plus the effect-marker journey: a same-process session_shutdown is not a real Pi restart",
        tier: "live-journey",
        trackingBead: "wb-0kg.3",
      },
    ],
    reason: "the pinned case embodies the session-end-continues half only; the true restart plus effect-marker journey stays the live-journey bead wb-0kg.3 (open) and is never counted covered",
    truth: "runs inside the default gate against a real detached host built by the gate's own build step; it is not a restart of a Pi process",
  },
  {
    scenario: 5,
    quote: QUOTES[4] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "fixture pass",
    status: "pinned",
    pins: [pin(IDENTITY, "fails closed after changed %s under the pinned invocation", 7), pin(VALIDATE_REPLY, "a digest mismatch is its own typed refusal, never a warning, and the core never runs")],
    reason: "a changed script, configuration, host ABI, contract, principal, workspace source or logical request fails closed under the pinned invocation, and a digest mismatch is a typed refusal that never runs the core",
  },
  {
    scenario: 6,
    quote: QUOTES[5] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
      pin(RECONCILE_DECISION, "denies observer-only before any task lookup, identically for unknown and foreign tasks"),
    ],
    reason: "observer-only grants cannot control under any action spelling and are denied before any task lookup, identically for unknown and foreign tasks",
  },
  {
    scenario: 7,
    quote: QUOTES[6] ?? "",
    requiredOutcome: OUTCOME_NO_MASS_CANCEL,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(NATIVE_DETAILS, "preserves selected node on resize and closes without invoking any runtime controls"),
      pin(FURNACE_CONTROL, "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb"),
      pin(FURNACE_OBSERVER, "closing cancels an idle polling wait without native control, and abort signal refuses an initial read"),
      pin(SHARED_CHILD, "flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)"),
    ],
    registers: pin(SHARED_CHILD, "registers the runner as one additive Forge command outside the default gate"),
    halves: [
      {
        half: "covered",
        what: "observers never issue control (native-details, furnace-control, furnace-observer wait-close) and the wb-0kg.7 shared-child receipt judge refuses a reader close that took the child down",
        tier: "default-gate",
      },
      {
        half: "uncovered",
        what: "the real two-reader shared-child journey: forge run local-detached-shared-child (landed by wb-0kg.7, outside the default gate); no report this leg reads vouches for that run",
        tier: "bench-receipt",
        unfiled: true,
      },
    ],
    reason:
      "the default-gate pins drive fixtures and the pure shared-child judge; the real child processes run only under the bench-receipt command, which this leg never runs and whose registration case is judged as a default-gate pin",
    truth: "wb-0kg.7 landed the two-reader conformance; its default-gate part is the pure judge, so the label stays fixture pass for the covered half only",
  },
  {
    scenario: 8,
    quote: QUOTES[7] ?? "",
    requiredOutcome: OUTCOME_RECONCILIATION,
    label: "not started",
    status: "unpinned",
    pins: [],
    halves: [
      {
        half: "uncovered",
        what: "no deterministic Furnace slot-exhaustion case; only observation capacity bounds and registry admission slots exist, which are not Furnace parents awaiting children (W09/W18 scope)",
        tier: "default-gate",
        unfiled: true,
      },
    ],
    reason: "no deterministic Furnace slot-exhaustion case exists at this base; W09/W18 scope, listed for groom follow-up and never counted passed",
  },
  {
    scenario: 9,
    quote: QUOTES[8] ?? "",
    requiredOutcome: OUTCOME_NO_INVENTED_PASS,
    label: "fixture pass",
    status: "pinned",
    pins: [
      pin(EFFECT_REPLAY, "never re-runs a journaled write because the basis changed"),
      pin(IDENTITY, "never treats a mutable workspace path as an immutable source basis"),
      pin(FORGE_OBSERVER, "F2: a current failed gate stays failed despite transport success, and current success is success"),
    ],
    halves: [
      {
        half: "covered",
        what: "the journaled-write, mutable-basis and no-invented-PASS halves, bound separately",
        tier: "default-gate",
      },
      {
        half: "uncovered",
        what: "no case drives a Forge verify followed by a basis change end to end (W17 designer scope)",
        tier: "default-gate",
        unfiled: true,
      },
    ],
    reason: "three cases bind the journaled-write, mutable-basis and no-invented-PASS halves separately; no end-to-end Forge-verify-then-basis-change case exists, so the end-to-end half is never counted covered",
    truth: "all three run inside the default gate against fixtures; none changes a real workspace basis after a real Forge verify",
  },
]);

/** The frozen scenario numbers, in order: nine rows. */
const SCENARIOS: readonly number[] = ROWS.map(row => row.scenario);
const EXPECTED_SCENARIOS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/** Rule 16 (frozen shape): "S<n>:<pins>:<registers>:<halves>:<label>" per row, so deleting one pin or half, swapping a pin for another row's, or raising a row's truth label (U3) reads red. */
const EXPECTED_SHAPE: readonly string[] = [
  "S1:2:0:0:fixture pass",
  "S2:4:0:0:fixture pass",
  "S3:3:0:0:fixture pass",
  "S4:1:0:2:fixture pass",
  "S5:2:0:0:fixture pass",
  "S6:2:0:0:fixture pass",
  "S7:4:1:2:fixture pass",
  "S8:0:0:1:not started",
  "S9:3:0:2:fixture pass",
];
/** Rule 16 (frozen titles): "S<n>|<kind>|<file>|<title>[|each>=<n>]" for every judged case, so swapping a pin for an unrelated passing case in the same file, or lowering an it.each minimum, reads red. */
const EXPECTED_JUDGED: readonly string[] = [
  "S1|pin|workbench-furnace-hosted.test.ts|treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start",
  "S1|pin|workbench-furnace-hosted-retry-fault.test.ts|an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded",
  "S2|pin|workbench-detached-faults-receipt.test.ts|flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal",
  "S2|pin|workflow-effect-replay.test.ts|neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
  "S2|pin|workflow-effect-replay.test.ts|B1 after provider side effect but before host result: the resume refuses and the effect happens exactly once (%s)|each>=2",
  "S2|pin|workflow-effect-replay.test.ts|B1 after result before journal append: the resume refuses and the effect happens exactly once",
  "S3|pin|workbench-observation.test.ts|deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
  "S3|pin|workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "S3|pin|workbench-furnace-observer.test.ts|reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
  "S4|pin|workbench-pi-detached.test.ts|launches reviewed pure computation outside Pi ownership and reattaches by stable invocation",
  "S5|pin|workbench-identity.test.ts|fails closed after changed %s under the pinned invocation|each>=7",
  "S5|pin|workbench-validate-reply.test.ts|a digest mismatch is its own typed refusal, never a warning, and the core never runs",
  "S6|pin|workbench-control.test.ts|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
  "S6|pin|workbench-reconcile-decision.test.ts|denies observer-only before any task lookup, identically for unknown and foreign tasks",
  "S7|pin|workbench-native-details.test.ts|preserves selected node on resize and closes without invoking any runtime controls",
  "S7|pin|workbench-furnace-control.test.ts|closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
  "S7|pin|workbench-furnace-observer.test.ts|closing cancels an idle polling wait without native control, and abort signal refuses an initial read",
  "S7|pin|workbench-detached-shared-child-receipt.test.ts|flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)",
  "S7|registers|workbench-detached-shared-child-receipt.test.ts|registers the runner as one additive Forge command outside the default gate",
  "S9|pin|workflow-effect-replay.test.ts|never re-runs a journaled write because the basis changed",
  "S9|pin|workbench-identity.test.ts|never treats a mutable workspace path as an immutable source basis",
  "S9|pin|workbench-forge-observer.test.ts|F2: a current failed gate stays failed despite transport success, and current success is success",
];
/** Uncovered halves with no bead filed, listed for the groom follow-up (scenario, half index). */
const UNFILED_HALVES: readonly string[] = ["S7#1", "S8#0", "S9#1"];
/** Rule 16 (frozen judged-row set, U1): the scenarios the AC2 it.each judges, in order (scenario 8 holds no pin). */
const EXPECTED_JUDGED_ROWS: readonly string[] = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S9"];
/** Rule 16 (frozen texts): "S<n>:<digest>" of each row's reason, truth note and halves, so a reason or truth note rewritten into a coverage claim reads red. */
const EXPECTED_TEXT: readonly string[] = [
  "S1:8103181e3914",
  "S2:18a522582626",
  "S3:c7118a203e83",
  "S4:c8faab313b2c",
  "S5:bca0ca4bb3de",
  "S6:0b1026bf6d3b",
  "S7:651d58f352ad",
  "S8:d228d6a32012",
  "S9:c54ad31c2acd",
];

/** U5: the only repository files the leg's own code reads (the adopted judge's vouch reads forge.toml by design; this leg never does). */
const OWN_READS: readonly string[] = [DOCS_FILE, CENSUS_CONFIG, SELF];
const readRepo = (path: string): string => {
  if (!OWN_READS.includes(path)) throw new Error(`${SELF} reads only ${OWN_READS.join(", ")}; it refused to read ${path}`);
  return readFileSync(join(ROOT, path), "utf8");
};

/** U5: every readFileSync call in this file's own source, named by its enclosing top-level binding ("<top level>" outside one). */
function readFileSyncCallers(): string[] {
  const sf = ts.createSourceFile(SELF, readRepo(SELF), ts.ScriptTarget.Latest, true);
  const out: string[] = [];
  for (const statement of sf.statements) {
    const owner = ts.isVariableStatement(statement)
      ? statement.declarationList.declarations.map(declaration => declaration.name.getText(sf)).join(",")
      : ts.isFunctionDeclaration(statement)
        ? (statement.name?.text ?? "<top level>")
        : "<top level>";
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "readFileSync") out.push(owner);
      ts.forEachChild(node, visit);
    };
    visit(statement);
  }
  return out;
}

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER, ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }) });
const shapeOf = (row: Row): string => `S${row.scenario}:${row.pins.length}:${row.registers === undefined ? 0 : 1}:${row.halves?.length ?? 0}:${row.label}`;
/** A short digest of a row's reason, truth note and halves: a rewritten reason, truth note or half changes it. */
const textDigest = (row: Row): string =>
  createHash("sha256")
    .update(JSON.stringify([row.reason, row.truth ?? "", (row.halves ?? []).map(half => [half.half, half.what, half.tier, half.trackingBead ?? "", half.unfiled === true])]))
    .digest("hex")
    .slice(0, 12);
const label = (row: Row): string => `scenario ${row.scenario}`;

type JudgedKind = "pin" | "registers";
interface Judged {
  readonly row: Row;
  readonly kind: JudgedKind;
  readonly entry: Pin;
}
/** Every default-gate case a row names, judged against the gate's own report: its coverage pins and its registration pin. */
const JUDGED: readonly Judged[] = ROWS.flatMap((row): Judged[] => [
  ...row.pins.map(entry => ({ row, kind: "pin" as const, entry })),
  ...(row.registers === undefined ? [] : [{ row, kind: "registers" as const, entry: row.registers }]),
]);
/** The kinds an AC2 case judges, in order. */
const JUDGED_KINDS: readonly JudgedKind[] = ["pin", "registers"];
/** The rows the AC2 it.each judges: every row that holds a coverage pin. */
const JUDGED_ROWS: readonly Row[] = ROWS.filter(row => row.pins.length > 0);
/** A judged case's frozen key, "S<n>|<kind>|<file>|<title>[|each>=<n>]", read from the CasePin the helper judged. */
const judgedKey = (scenario: number, kind: string, judged: CasePin): string => {
  const each = judged.each === undefined ? "" : `|each>=${judged.each.minCases}`;
  return `S${scenario}|${kind}|${basename(judged.file)}|${judged.title}${each}`;
};

/** One line per pin that is not ok, naming the scenario; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, kind: string, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `${label(row)}/${kind}: ${verdict.code}: ${verdict.why}`);

/**
 * The explicit budget of every AC2 case (U1; the R546 sizing recipe), file-local so no other census file's budget moves:
 * 5 x the costliest AC2 case measured, rounded up to a whole 5 s. Costliest: AC2 scenario 4 at 3735 ms in the g9 gate's
 * census tier over the full default-tier report (cmd_3bb7ae87a15f); this cut's 88 AC2 readings over the 15-file pinned
 * report at load1 239-324 peaked at 2713 ms. 5 x 3735 ms = 18675 ms, rounded up to 20000 ms.
 */
const JUDGE_BUDGET_MS = 20_000;
const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
/** The title the AC2 it.each registers for a judged scenario id ("S<n>"). */
const AC2_CASE = (id: string): string => `AC2 scenario ${id.slice(1)}: every named default-gate case is collected once, passed and asserting in the gate's own report`;
/** The scenarios whose AC2 case reached its last assertion this run (each-liveness, U1). */
const completed = new Set<number>();

/** The rendered paragraph of a docs section, or undefined when the section holds no single paragraph. */
const paragraphOf = (blocks: readonly RenderedBlock[]): string | undefined => {
  const first = blocks[0];
  return blocks.length === 1 && first?.kind === "paragraph" ? first.text : undefined;
};

/** The scenario clauses of a rendered paragraph: the sentence before the outcomes sentence, split at the semicolons. */
function scenarioClauses(text: string): string[] {
  const cut = text.indexOf(` ${OUTCOMES_PREFIX}`);
  const sentence = (cut === -1 ? text : text.slice(0, cut)).replace(/\.$/, "");
  return sentence.split("; ").map(part => part.trim());
}

/**
 * Every docs drift, each naming the scenario or the section it breaks. The per-row quote, position and outcome checks
 * read the rendered paragraph and run independently of the exactness check, so a dropped, reworded, appended-to or
 * reordered clause names its scenario.
 */
function docsFailures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  const text = section.blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : [])).join(" ");
  const clauses = scenarioClauses(text);
  const outcomes = text.includes(OUTCOMES_PREFIX) ? text.slice(text.indexOf(OUTCOMES_PREFIX) + OUTCOMES_PREFIX.length) : "";
  for (const row of ROWS) {
    const at = row.scenario - 1;
    if (!text.includes(row.quote)) out.push(`${label(row)}: its clause "${row.quote}" no longer renders in ${DOCS_FILE} § ${DOCS_HEADING}`);
    else if (clauses[at] !== row.quote) out.push(`${label(row)}: clause ${row.scenario} reads "${clauses[at] ?? ""}" where the census pins "${row.quote}" (reworded, qualified or out of order)`);
    if (!outcomes.includes(row.requiredOutcome)) out.push(`${label(row)}: its required outcome "${row.requiredOutcome}" no longer renders after "${OUTCOMES_PREFIX}"`);
  }
  if (clauses.length > ROWS.length) out.push(`${DOCS_FILE} § ${DOCS_HEADING}: the sentence now holds ${clauses.length} clauses where the census pins ${ROWS.length}`);
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_FILE} § ${DOCS_HEADING} is not exactly its frozen blocks: ${exact.why}`);
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen paragraph under the real heading shape, never the live text. */
const synthetic = (edit: (paragraph: string) => string = paragraph => paragraph, tail = ""): string =>
  `# ${DOCS_PARENT}\n\n## Separate four identities\n\nRows.\n\n## ${DOCS_HEADING}\n\n${edit(PARAGRAPH)}\n${tail}\n## Experimental immutable receipt\n\nText.\n`;
const editText = (from: string, to: string) => (paragraph: string): string => paragraph.replace(from, to);
const named = (lines: readonly string[]): string[] => [...new Set(lines.filter(line => line.startsWith("scenario ")).map(line => line.slice(0, line.indexOf(":"))))];

describe("wb-0kg.11 docs/workbench/08 adversarial-matrix census (report mode)", () => {
  it("AC1: the table holds the nine frozen scenario rows in order, deeply frozen, with the frozen per-row shape and label, row texts, judged titles and judged-row set (rule 16)", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(SCENARIOS).toEqual(EXPECTED_SCENARIOS);
    expect(new Set(SCENARIOS).size).toBe(ROWS.length);
    expect(ROWS).toHaveLength(9);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(JUDGED.map(judged => judgedKey(judged.row.scenario, judged.kind, casePin(judged.entry)))).toEqual(EXPECTED_JUDGED);
    expect(
      JUDGED_ROWS.map(row => `S${row.scenario}`),
      "the rows the AC2 it.each judges (rule 16, U1)",
    ).toEqual(EXPECTED_JUDGED_ROWS);
    expect(
      ROWS.map(row => `S${row.scenario}:${textDigest(row)}`),
      "each row's reason, truth note and halves (rule 16)",
    ).toEqual(EXPECTED_TEXT);
    expect(ROWS.map(row => row.quote)).toEqual(QUOTES);
  });

  it("AC1: the live section renders exactly its one frozen paragraph, HTML-free, under its unique heading of the level-1 parent; a live drift fails naming its scenario first (U2)", () => {
    const drift = docsFailures(readRepo(DOCS_FILE));
    expect(drift, drift.join(" | ")).toEqual([]);
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(section.hasHtml).toBe(false);
    expect(paragraphOf(section.blocks)).toBe(PARAGRAPH);
  });

  it("AC1: the nine docs clauses are covered by the nine rows in order, each against one required-outcome phrase of the outcomes sentence", () => {
    const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
    expect(section.ok, `${DOCS_FILE} § ${DOCS_HEADING}: the section is refused: ${section.why}`).toBe(true);
    const clauses = scenarioClauses(section.blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : [])).join(" "));
    const misplaced = ROWS.flatMap(row => (clauses[row.scenario - 1] === row.quote ? [] : [`${label(row)}: clause ${row.scenario} reads "${clauses[row.scenario - 1] ?? ""}" where the census pins "${row.quote}"`]));
    expect(misplaced, misplaced.join(" | ")).toEqual([]);
    expect(clauses).toHaveLength(9);
    expect(clauses).toEqual(ROWS.map(row => row.quote));
    expect([...new Set(ROWS.map(row => row.requiredOutcome))].sort()).toEqual([OUTCOME_NO_DUPLICATE, OUTCOME_NO_INVENTED_PASS, OUTCOME_NO_MASS_CANCEL, OUTCOME_RECONCILIATION].sort());
    expect(ROWS.map(row => row.requiredOutcome)).toEqual([
      OUTCOME_NO_DUPLICATE,
      OUTCOME_RECONCILIATION,
      OUTCOME_RECONCILIATION,
      OUTCOME_RECONCILIATION,
      OUTCOME_RECONCILIATION,
      OUTCOME_RECONCILIATION,
      OUTCOME_NO_MASS_CANCEL,
      OUTCOME_RECONCILIATION,
      OUTCOME_NO_INVENTED_PASS,
    ]);
  });

  it("O1/U6: every half-covered scenario keeps its single row and splits into a covered half with its own proof tier and an uncovered half with its own tier and reason", () => {
    const split = ROWS.filter(row => (row.halves?.length ?? 0) > 1).map(row => row.scenario);
    expect(split).toEqual([4, 7, 9]);
    for (const row of ROWS.filter(candidate => split.includes(candidate.scenario))) {
      const covered = (row.halves ?? []).filter(half => half.half === "covered");
      const uncovered = (row.halves ?? []).filter(half => half.half === "uncovered");
      expect(covered.length, `${label(row)} covered half`).toBe(1);
      expect(uncovered.length, `${label(row)} uncovered half`).toBe(1);
      expect(row.status, label(row)).toBe("pinned");
      expect(row.truth?.length ?? 0, `${label(row)} carries no truth note`).toBeGreaterThan(0);
      for (const half of row.halves ?? []) expect(half.what.length, `${label(row)} ${half.half} half states what it is`).toBeGreaterThan(40);
      expect(covered[0]?.tier, `${label(row)}: the covered half is what the report vouches for`).toBe("default-gate");
    }
    expect(ROWS.find(row => row.scenario === 4)?.halves?.[1]).toMatchObject({ half: "uncovered", tier: "live-journey", trackingBead: "wb-0kg.3" });
    expect(ROWS.find(row => row.scenario === 7)?.halves?.[1]).toMatchObject({ half: "uncovered", tier: "bench-receipt" });
  });

  it("A3/U3: no unpinned row is counted passed, every pinned row carries the default-gate label fixture pass and none claims a pass no report here vouches for, and unfiled uncovered halves are exactly the listed ones", () => {
    const unpinned = ROWS.filter(row => row.status === "unpinned");
    const pinned = ROWS.filter(row => row.status === "pinned");
    expect(unpinned.length + pinned.length).toBe(ROWS.length);
    expect(unpinned.map(row => row.scenario)).toEqual([8]);
    for (const row of unpinned) {
      expect(OPEN_LABELS, label(row)).toContain(row.label);
      expect(row.pins, `${label(row)}: an unpinned row carries no coverage pin`).toEqual([]);
      expect(row.reason.trim().length, `${label(row)}: an unpinned row needs a reason`).toBeGreaterThan(40);
    }
    for (const row of pinned) {
      expect(row.pins.length, `${label(row)}: a pinned row has pins`).toBeGreaterThan(0);
      expect(row.label, `${label(row)}: its proof runs on the default gate's fixtures, so its label is ${DEFAULT_GATE_LABEL}`).toBe(DEFAULT_GATE_LABEL);
    }
    expect(
      ROWS.filter(row => UNVOUCHED_LABELS.includes(row.label)).map(label),
      "rows claiming a live, adversarial or scale pass this leg reads no evidence for",
    ).toEqual([]);
    const unfiled = ROWS.flatMap(row => (row.halves ?? []).flatMap((half, index) => (half.half === "uncovered" && half.unfiled === true ? [`S${row.scenario}#${index}`] : [])));
    expect(unfiled).toEqual(UNFILED_HALVES);
    for (const row of ROWS) {
      for (const half of (row.halves ?? []).filter(candidate => candidate.half === "uncovered")) {
        expect(half.unfiled === true || (half.trackingBead ?? "").length > 0, `${label(row)}: an uncovered half names a tracking bead or is listed as unfiled`).toBe(true);
      }
    }
  });

  it("A3: a bench-receipt half names the default-gate case that registers its command outside the gate; no report vouches for the command run", () => {
    const bench = ROWS.filter(row => (row.halves ?? []).some(half => half.tier === "bench-receipt"));
    expect(bench.map(row => row.scenario)).toEqual([7]);
    for (const row of bench) {
      expect(row.registers, `${label(row)}: names the registration case`).toBeDefined();
      expect(row.registers?.file).toBe(SHARED_CHILD);
      expect(row.label, `${label(row)}: the label belongs to the covered half only`).toBe("fixture pass");
    }
    expect(ROWS.filter(row => row.registers !== undefined).map(row => row.scenario)).toEqual([7]);
  });

  it.each(JUDGED_ROWS.map(row => ({ row })))("AC2 scenario $row.scenario: every named default-gate case is collected once, passed and asserting in the gate's own report", JUDGING, ({ row }) => {
    const mine = JUDGED.filter(entry => entry.row === row);
    const judgedKeys: string[] = [];
    const bad: string[] = [];
    const codes: string[] = [];
    for (const kind of JUDGED_KINDS) {
      const group = mine.filter(entry => entry.kind === kind);
      if (group.length === 0) continue;
      const verdicts = judge(
        REPORT,
        group.map(entry => casePin(entry.entry)),
      );
      expect(verdicts).toHaveLength(group.length);
      judgedKeys.push(...verdicts.map(verdict => judgedKey(row.scenario, kind, verdict.pin)));
      bad.push(...failures(row, kind, verdicts));
      codes.push(...verdicts.map(verdict => verdict.code));
    }
    expect(bad, bad.join(" | ")).toEqual([]);
    expect(codes).toEqual(judgedKeys.map(() => "ok"));
    expect(judgedKeys, `${label(row)}: the cases this AC2 case judged are exactly its row's frozen EXPECTED_JUDGED entries (rule 16, U1)`).toEqual(EXPECTED_JUDGED.filter(key => key.startsWith(`S${row.scenario}|`)));
    completed.add(row.scenario);
  });

  it("AC2 each-liveness (rule 16, U1): the it.each registers one run-mode AC2 case per frozen judged scenario, in order and on the judging budget, and every one reached its last assertion", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.name.startsWith("AC2 scenario ")) registered.push(`${child.name}|${child.mode}|${child.timeout}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(JUDGE_BUDGET_MS, "the judging budget is above vitest's default test timeout").toBeGreaterThan(5_000);
    expect(registered).toEqual(EXPECTED_JUDGED_ROWS.map(id => `${AC2_CASE(id)}|run|${JUDGE_BUDGET_MS}`));
    expect(
      [...completed].map(scenario => `S${scenario}`),
      "the AC2 cases that reached their last assertion this run",
    ).toEqual(EXPECTED_JUDGED_ROWS);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, no child_process and no pinned suite, and loads no module at runtime", () => {
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
    expect(readRepo(CENSUS_CONFIG)).toContain('include: ["test/**/*.census.ts"]');
  });

  it("AC4/U5: the leg's own code reads no forge.toml: its one file reader admits only docs/08, the census config and this file, and it holds no other readFileSync call (the adopted judge's vouch reads forge.toml by design)", () => {
    expect(OWN_READS).toEqual(["docs/workbench/08-lifecycle-and-recovery.md", "vitest.census.config.ts", "test/workbench-adversarial-matrix.census.ts"]);
    expect(() => readRepo("forge.toml")).toThrow("it refused to read forge.toml");
    expect(readFileSyncCallers(), "every readFileSync call in this file, by its enclosing top-level binding").toEqual(["readRepo"]);
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const fsImports = own.imports.filter(entry => entry.module === "fs" || entry.module === "node:fs" || entry.module.startsWith("fs/") || entry.module.startsWith("node:fs/"));
    expect(fsImports.map(entry => `${entry.module}:${entry.names.join(",")}:${entry.kind}`)).toEqual(["node:fs:readFileSync:static"]);
  });
});

describe("wb-0kg.11 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (scenario: number): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.scenario === scenario);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`scenario ${scenario} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the scenario, the file and the title", () => {
    const { row, entry } = firstPin(2);
    const wrong = { ...entry, title: entry.title.replace("fabricated-terminal", "fabricated-terminaL") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, "pin", verdicts);
    expect(line).toContain("scenario 2/pin");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen scenario numbers no longer match)", () => {
    expect(ROWS.filter(row => row.scenario !== 6).map(row => row.scenario)).not.toEqual(EXPECTED_SCENARIOS);
  });

  it("M3: a pin with no title is red (the judge finds no such case)", () => {
    const { entry } = firstPin(1);
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M5: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { entry } = firstPin(3);
    const [verdict] = judge(REPORT, [casePin({ file: CONTROL, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M6: a bench-receipt tier label is carried by no report this leg reads: the default report refuses the registration pin relabelled as the command run", () => {
    const row = ROWS.find(candidate => candidate.scenario === 7);
    expect(row?.registers).toBeDefined();
    if (row?.registers === undefined) return;
    const [verdict] = judge(REPORT, [{ file: row.registers.file, title: row.registers.title, tier: "local-detached-shared-child" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M7: an it.each pin whose table the report cannot hold at the claimed size is red: the scenario 5 template pin asks for more rows than exist", () => {
    const row = ROWS.find(candidate => candidate.scenario === 5);
    const target = row?.pins.find(entry => entry.each !== undefined);
    expect(target?.each).toBe(7);
    if (target === undefined) return;
    const [verdict] = judge(REPORT, [casePin({ ...target, each: 99 })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M8: the unpinned scenario never reads as covered: it holds no pin and no registration case, so nothing in the report can pass it", () => {
    const row = ROWS.find(candidate => candidate.scenario === 8);
    expect(row?.status).toBe("unpinned");
    expect(row?.pins).toEqual([]);
    expect(row?.registers).toBeUndefined();
    expect(JUDGED.some(entry => entry.row.scenario === 8)).toBe(false);
  });
});

describe("wb-0kg.11 docs drift names the scenario or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${DOCS_HEADING}\n\n${PARAGRAPH}\n`)).toEqual([]);
  });

  it("DD1 names scenario 9 (and only it) when the last clause is dropped", () => {
    const lines = docsFailures(synthetic(editText(`; ${QUOTES[8]}`, "")));
    expect(named(lines)).toEqual(["scenario 9"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("DD2 names scenario 2 (and only it) when a qualifier is appended to its clause", () => {
    const lines = docsFailures(synthetic(editText(`${QUOTES[1]};`, `${QUOTES[1]}, unless the host is idle;`)));
    expect(named(lines)).toEqual(["scenario 2"]);
  });

  it("DD3 names scenarios 3 and 4 (and only them) when the two clauses swap places", () => {
    const lines = docsFailures(synthetic(editText(`${QUOTES[2]}; ${QUOTES[3]}`, `${QUOTES[3]}; ${QUOTES[2]}`)));
    expect(named(lines)).toEqual(["scenario 3", "scenario 4"]);
  });

  it("DD4 names scenario 6 (and only it) when its clause is reworded", () => {
    expect(named(docsFailures(synthetic(editText("issue control as observer-only", "issue control as a reader"))))).toEqual(["scenario 6"]);
  });

  it("DD5 names scenario 1 (and only it) when the duplicate-effects outcome phrase is dropped", () => {
    expect(named(docsFailures(synthetic(editText(`${OUTCOME_NO_DUPLICATE}, `, ""))))).toEqual(["scenario 1"]);
  });

  it("DD6 names the five reconciliation scenarios when the reconciliation outcome phrase is dropped", () => {
    expect(named(docsFailures(synthetic(editText(`${OUTCOME_RECONCILIATION}; `, ""))))).toEqual(["scenario 2", "scenario 3", "scenario 4", "scenario 5", "scenario 6", "scenario 8"]);
  });

  it("DD7 goes red on the section, naming no scenario, when a tenth clause is appended to the sentence", () => {
    const lines = docsFailures(synthetic(editText(`${QUOTES[8]}.`, `${QUOTES[8]}; stop the host at random.`)));
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
    expect(lines.some(line => line.includes("holds 10 clauses"))).toBe(true);
  });

  it("DD8 goes red on the section, naming no scenario, when a second paragraph is added", () => {
    const lines = docsFailures(synthetic(paragraph => `${paragraph}\n\nA host may skip these scenarios.`));
    expect(named(lines)).toEqual([]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("DD9 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, "## Adversarial notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_HEADING}: the section is refused`);
  });

  it("DD10 goes red when a weakening ### subsection is appended inside the section (FOLD-1)", () => {
    const lines = docsFailures(synthetic(paragraph => paragraph, "\n### Exceptions\n\nA host may skip these scenarios.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("DD11 goes red when a second section with the same heading is appended later (the heading must occur exactly once)", () => {
    const lines = docsFailures(`${synthetic()}\n## ${DOCS_HEADING}\n\nAdvisory only.\n`);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("occurs 2 times");
  });

  it("DD12 names scenario 5 and refuses the HTML when its clause is hidden in an HTML comment", () => {
    const lines = docsFailures(synthetic(editText(QUOTES[4] ?? "", `<!-- ${QUOTES[4]} -->`)));
    expect(named(lines)).toContain("scenario 5");
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("DD13 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `# Appendix\n\n## ${DOCS_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("DD14 goes red when an HTML comment opened before the heading and closed after the next heading hides the section from the rendered view", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `<!--\n## ${DOCS_HEADING}`).replace("## Experimental immutable receipt", "-->\n## Experimental immutable receipt"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("DD15 goes red when a code fence opened before the heading and closed after the next heading hides the section from the rendered view", () => {
    const lines = docsFailures(synthetic().replace(`## ${DOCS_HEADING}`, `\`\`\`\n## ${DOCS_HEADING}`).replace("## Experimental immutable receipt", "```\n## Experimental immutable receipt"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes(`${DOCS_HEADING}: the section is refused`))).toBe(true);
  });

  it("DD16 names scenario 4 (and only it) when a qualifier is appended to its clause (the gate's DL1 shape)", () => {
    expect(named(docsFailures(synthetic(editText(`${QUOTES[3]};`, `${QUOTES[3]}, where supported;`))))).toEqual(["scenario 4"]);
  });

  it("DD17 names scenarios 7 and 8 (and only them) when the two clauses swap places (the gate's DL5 shape)", () => {
    expect(named(docsFailures(synthetic(editText(`${QUOTES[6]}; ${QUOTES[7]}`, `${QUOTES[7]}; ${QUOTES[6]}`))))).toEqual(["scenario 7", "scenario 8"]);
  });

  it("an edit of any other section never reddens a scenario: the identities and receipt sections are free to change", () => {
    expect(docsFailures(synthetic().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});
