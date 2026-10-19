/**
 * VC-7 / W12 falsifier (wb-5x0.2): the docs/workbench/08 "Side-effect replay policy on resume" and "Operator reconcile
 * journey" census, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in
 * wb-u62 REPORT MODE through the shared helper test/helpers/census.ts (judge(.forge/vitest-report.json, pins)).
 *
 * The two docs/08 sections carry the replay and reconcile guarantees: a recorded non-read effect is never re-executed and never
 * silently replayed (typed uncertain-effect, carried forward), a dispatched marker is journaled before the provider acts, a
 * recorded read replays only under a vouching host and lands stale, an entry without effect metadata fails closed as an
 * uncertain effect, the operator journey is inspect, evidence, decide, resume under exact acknowledge/override grants, an
 * override is spent at resume START, and conflicting decisions refuse. Cases embodying each exist (test/workflow-effect-replay,
 * workflow-reconcile, workbench-reconcile-decision, workbench-pi-reconcile) but nothing binds the sentences to them. This file is
 * that binding: a frozen table of rows, each quoting the docs fragments it covers and pinned to landed default-gate cases by
 * file and verbatim title, or recorded unpinned with a reason. A rename, deletion, skip or exclusion of a pinned case, or a
 * dropped, reworded or hidden docs clause, leaves a red census instead of a silent one.
 *
 * Settled text. The bead's candidate sentences were measured at 4fc7a9d; the docs moved since (wb-tu1: an entry recorded
 * without effect metadata is now UNCLASSIFIED and fails closed, it no longer "re-runs live"; wb-5x0.1: the dispatched marker).
 * Every sentence and pin here is re-derived from the docs text and the test titles at the claim-time base b21beb0.
 *
 * Judging. This leg executes no pinned case and scans no test source for case calls itself. judge() reads vitest's own JSON
 * report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a
 * pinned case counts only when the gate's own run collected it exactly once, recorded it passed, and its body asserts - the
 * helper's three legs, fail-closed, as far as the helper's resolvable-construct roster and its named residuals reach
 * (test/helpers/census.ts, receipts/wb-u62.md). Each docs section is judged through the helper's rendered view (docsSection /
 * sectionMatches): the unique level-2 heading under its level-1 parent heading path, bounded at the next level-1/2 heading or
 * EOF, must render as exactly its frozen blocks and carry no HTML. The drift falsifiers run over SYNTHETIC documents built from
 * the frozen blocks, never over the live docs text. The census never mints reconcile:* permissions and claims no live pass.
 *
 * Rule 16 (frozen shape): the table pins its own row/pin-level shape as AC1 literals, so deleting one pin, dropping a quote or
 * swapping a pin for an unrelated passing case reads red. Truth label: "fixture pass" only.
 */

import { readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
}

type Where = "policy" | "journey";

interface Quote {
  /** The docs/08 section the fragment renders in. */
  readonly where: Where;
  readonly text: string;
}

interface ReconcileRow {
  readonly row: string;
  readonly label: string;
  /** The docs/08 fragments this row covers, each verbatim in a rendered paragraph of its section. */
  readonly quotes: readonly Quote[];
  /** The default gate: the report vouches for it. */
  readonly tier: "default-gate";
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs08-replay-reconcile.census.ts";
const DOC_08 = "docs/workbench/08-lifecycle-and-recovery.md";
const EM_DASH = String.fromCodePoint(0x2014);
const PARENT_08 = `08 ${EM_DASH} Execution identity, lifecycle, side effects, replay and recovery`;
const HEADING_POLICY = "Side-effect replay policy on resume";
const HEADING_JOURNEY = "Operator reconcile journey";

const pin = (file: string, title: string): Pin => ({ file, title });
const policy = (text: string): Quote => ({ where: "policy", text });
const journey = (text: string): Quote => ({ where: "journey", text });

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


const POLICY_SOURCE =
  "Journal entries for `node()` now carry the capability id, the producer-declared effect class and the recording host's replay basis. On resume, a recorded non-read effect is never re-executed and never silently replayed: the run fails with a typed uncertain-effect error naming the owning producer and position, and the entry is carried forward so retrying the resume stays protected. A non-read node, an unclassified one included, is journaled before its provider is called as a typed `dispatched` marker row that its settled row at the same position supersedes, so a run killed after the provider's side effect but before its result is recorded leaves a marker the resume refuses as an uncertain effect, a marker that cannot be written refuses the call fail-closed before the provider acts, and a read writes no marker and keeps write-failure tolerance. A recorded read replays only when the current host vouches for the same effect class, basis and key, and the replayed row is marked stale rather than fresh. Effect answers are stored only for reads, so a write's answer can never be silently replayed. An entry recorded without effect metadata is unclassified, and a resume treats it fail-closed as an uncertain effect: it stops at that position exactly as at a recorded non-read class and never re-runs the call. Hosts that execute effectful nodes must still declare effect metadata: `workflow_reconcile` lists and decides only classified rows, so it cannot settle an unclassified position, and a fresh run without `resumeFromRunId` is the way past one. The Claude host now stamps effect classes from the registry descriptor and regained settled-agent prefix replay under an explicit host basis.";
const JOURNEY_SOURCE_1 =
  "A resume stopped at a journaled effect has exactly one sanctioned way forward short of a fresh run: a local operator reconciles the position with the producer through `workflow_reconcile`. The journey is inspect \u2192 evidence \u2192 decide \u2192 resume. `inspect` (under `workbench:observe`) lists each refusing position with its capability, effect class, producer, binding digest, recorded native refs and the decisions already on file. `evidence` performs ONE allowlisted producer read (`furnace.run.inspect`, `forge.gate.status`, `hyperunix.find`, `reactivefiber.render.preview`) through the capability registry under the operator's own grants and mints a receipt whose binding is computed against the journaled native refs \u2014 journal-recorded when the identity matches, operator-asserted when nothing was recorded or the read names no identity, unbound on a mismatch. A failed or unavailable read is an outcome, never evidence of absence.";
const JOURNEY_SOURCE_2 =
  "An `acknowledge` (exact `reconcile:<producer>.acknowledge` grant) records a determination \u2014 effect-confirmed (needs a returned receipt), effect-absent, or indeterminate \u2014 bound by digest to the exact journal row. A settling acknowledgement makes the next resume hand the script the `workbench.reconcile.acknowledgement/v1` envelope at that position, marked stale, never producer-shaped, with operator data only under `resolvedValue`; the replayable prefix ends there and the acknowledgement is carried forward stamped `applied`. An effect-absent acknowledgement settles nothing: the position stays refused until an explicit `override` (exact `reconcile:<producer>.override` grant, own-property confirmation restating position and capability, duplicate risk accepted) authorizes exactly one re-run. Overrides are spent at resume START \u2014 the resume writes the consumed copy into the SOURCE journal before running anything \u2014 and again on the re-run's own success or failure, so two resumes can never both re-run one authorization and a prompt-injected repetition finds it already consumed. Conflicting decisions (an override citing a superseded acknowledgement) refuse; nothing resolves latest-wins. Non-claims: recording a decision never executes anything, never reopens the producer's own record, and never upgrades an acknowledgement into native evidence this run observed.";
const POLICY_TEXT = POLICY_SOURCE.replaceAll("`", "");
const JOURNEY_TEXT_1 = JOURNEY_SOURCE_1.replaceAll("`", "");
const JOURNEY_TEXT_2 = JOURNEY_SOURCE_2.replaceAll("`", "");

const BLOCKS_POLICY: readonly RenderedBlock[] = [{ kind: "paragraph", text: POLICY_TEXT, markdown: POLICY_SOURCE }];
const BLOCKS_JOURNEY: readonly RenderedBlock[] = [
  { kind: "paragraph", text: JOURNEY_TEXT_1, markdown: JOURNEY_SOURCE_1 },
  { kind: "paragraph", text: JOURNEY_TEXT_2, markdown: JOURNEY_SOURCE_2 },
];

/** Verbatim rendered fragments of the two docs/08 sections; every row quotes one or more of them. */
const QUOTES = {
  p1: "a recorded non-read effect is never re-executed and never silently replayed: the run fails with a typed uncertain-effect error naming the owning producer and position, and the entry is carried forward so retrying the resume stays protected",
  p2a: "A non-read node, an unclassified one included, is journaled before its provider is called as a typed dispatched marker row that its settled row at the same position supersedes",
  p2b: "a marker that cannot be written refuses the call fail-closed before the provider acts, and a read writes no marker and keeps write-failure tolerance",
  p3: "A recorded read replays only when the current host vouches for the same effect class, basis and key, and the replayed row is marked stale rather than fresh.",
  p4: "Effect answers are stored only for reads, so a write's answer can never be silently replayed.",
  p5: "An entry recorded without effect metadata is unclassified, and a resume treats it fail-closed as an uncertain effect: it stops at that position exactly as at a recorded non-read class and never re-runs the call.",
  p6a: "workflow_reconcile lists and decides only classified rows, so it cannot settle an unclassified position",
  p6b: "a fresh run without resumeFromRunId is the way past one",
  p7: "The Claude host now stamps effect classes from the registry descriptor and regained settled-agent prefix replay under an explicit host basis.",
  j1: "inspect (under workbench:observe) lists each refusing position with its capability, effect class, producer, binding digest, recorded native refs and the decisions already on file.",
  j2: "evidence performs ONE allowlisted producer read (furnace.run.inspect, forge.gate.status, hyperunix.find, reactivefiber.render.preview) through the capability registry under the operator's own grants",
  j3: "journal-recorded when the identity matches, operator-asserted when nothing was recorded or the read names no identity, unbound on a mismatch",
  j4: "A failed or unavailable read is an outcome, never evidence of absence.",
  j5: "An acknowledge (exact reconcile:<producer>.acknowledge grant) records a determination",
  j5b: "effect-confirmed (needs a returned receipt), effect-absent, or indeterminate",
  j6: "A settling acknowledgement makes the next resume hand the script the workbench.reconcile.acknowledgement/v1 envelope at that position, marked stale, never producer-shaped, with operator data only under resolvedValue",
  j7: "An effect-absent acknowledgement settles nothing: the position stays refused until an explicit override (exact reconcile:<producer>.override grant, own-property confirmation restating position and capability, duplicate risk accepted) authorizes exactly one re-run.",
  j8: "Overrides are spent at resume START",
  j8b: "so two resumes can never both re-run one authorization and a prompt-injected repetition finds it already consumed",
  j9: "Conflicting decisions (an override citing a superseded acknowledgement) refuse; nothing resolves latest-wins.",
  j10: "Non-claims: recording a decision never executes anything, never reopens the producer's own record, and never upgrades an acknowledgement into native evidence this run observed.",
} as const;

const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";
const RECONCILE = "test/workflow-reconcile.test.ts";
const RECONCILE_DECISION = "test/workbench-reconcile-decision.test.ts";
const PI_RECONCILE = "test/workbench-pi-reconcile.test.ts";

const ROWS: readonly ReconcileRow[] = freezeDeep<readonly ReconcileRow[]>([
  {
    row: "p1",
    label: "non-read effect never re-executed nor silently replayed",
    quotes: [policy(QUOTES.p1)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect"), pin(EFFECT_REPLAY, "carries the recorded effect forward into the new journal"), pin(EFFECT_REPLAY, "refuses even when the call at that position changed")],
  },
  {
    row: "p2",
    label: "dispatched marker journaled before the provider acts, fail-closed",
    quotes: [policy(QUOTES.p2a), policy(QUOTES.p2b)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "appends the typed dispatched row before the provider can act, and the settled row supersedes it"), pin(EFFECT_REPLAY, "writes no pre-call row for a read: a read-only journal stays exactly as before"), pin(EFFECT_REPLAY, "Q2 keeps a read running when the journal cannot be written: failure to write is not failure to run"), pin(EFFECT_REPLAY, "Q2 refuses an override re-run whose marker cannot be written, and carries the original effect row forward")],
  },
  {
    row: "p3",
    label: "vouched read replays stale, never fresh",
    quotes: [policy(QUOTES.p3)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "does not replay a read the current host cannot vouch for"), pin(EFFECT_REPLAY, "marks a replayed read as stale, never fresh"), pin(EFFECT_REPLAY, "replays a journaled read under the same basis, marked stale")],
  },
  {
    row: "p4",
    label: "effect answers stored only for reads",
    quotes: [policy(QUOTES.p4)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "journals a non-read node as the effect it was, without a replayable payload"), pin(EFFECT_REPLAY, "records nativeRefs on a non-read entry, keeps no answer, and leaves the entry replay-refusing")],
  },
  {
    row: "p5",
    label: "entry without effect metadata is unclassified and fails closed",
    quotes: [policy(QUOTES.p5)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "neither replays nor re-runs a node the journal carries no effect metadata for: the resume stops there"), pin(EFFECT_REPLAY, "refuses whatever the recorded outcome: a failed unclassified call is still an attempted effect"), pin(EFFECT_REPLAY, "carries the unclassified entry forward verbatim, so a resume of the failed resume still refuses")],
  },
  {
    row: "p6a",
    label: "workflow_reconcile lists and decides only classified rows",
    quotes: [policy(QUOTES.p6a)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE_DECISION, "lists and decides nothing at an unclassified node row: wb-tu1 made the runtime refuse it and left this ladder unchanged")],
  },
  {
    row: "p6b",
    label: "a fresh run without resumeFromRunId is the way past an unclassified position",
    quotes: [policy(QUOTES.p6b)],
    tier: "default-gate",
    status: "unpinned",
    reason: "no default-gate case asserts that a fresh run without resumeFromRunId proceeds past an unclassified position (grep of test/ for resumeFromRunId beside unclassified/fresh found none at the claim-time base); recorded unpinned, never claimed",
    pins: [],
  },
  {
    row: "p7",
    label: "Claude host stamps registry effect classes under an explicit host basis",
    quotes: [policy(QUOTES.p7)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "stamps the registry's effect class into node journal entries"), pin(EFFECT_REPLAY, "replays settled agents under an unchanged policy basis")],
  },
  {
    row: "j1",
    label: "inspect lists each refusing position under workbench:observe",
    quotes: [journey(QUOTES.j1)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE_DECISION, "inspect requires workbench:observe, then scope, and lists the pending position with its evidence reads")],
  },
  {
    row: "j2",
    label: "evidence is ONE allowlisted producer read with a computed binding",
    quotes: [journey(QUOTES.j2), journey(QUOTES.j3)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE_DECISION, "evidence permits only an allowlisted read that is currently a read"), pin(RECONCILE_DECISION, "denies evidence whose native identity does not bind to the recorded refs"), pin(PI_RECONCILE, "walks the full acknowledge journey: pending roster, bound receipt, recorded decision, settled resume with applied carry")],
  },
  {
    row: "j3",
    label: "a failed or unavailable read is never evidence of absence",
    quotes: [journey(QUOTES.j4)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE_DECISION, "publishes fixed evidence guidance that names the failure-is-not-absence rule"), pin(RECONCILE_DECISION, "requires a returned receipt for effect-confirmed and a reason for empty evidence")],
  },
  {
    row: "j4",
    label: "acknowledge needs the exact grant and is bound by digest to the journal row",
    quotes: [journey(QUOTES.j5), journey(QUOTES.j5b)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE_DECISION, "names the exact missing grant only after the scope check"), pin(RECONCILE_DECISION, "mints a bound, idempotent acknowledgement row"), pin(RECONCILE, "digests the exact node row and changes when any bound field changes")],
  },
  {
    row: "j5",
    label: "a settling acknowledgement hands the script a stale envelope",
    quotes: [journey(QUOTES.j6)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "settles an acknowledged position with the envelope, marked stale, and ends the prefix"), pin(RECONCILE, "settles a bound, settling acknowledgement; its envelope is never producer-shaped and carries no operator data value")],
  },
  {
    row: "j6",
    label: "effect-absent settles nothing until an explicit override",
    quotes: [journey(QUOTES.j7)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(EFFECT_REPLAY, "keeps an effect-absent acknowledgement refusing, naming the principal and the override path"), pin(RECONCILE_DECISION, "forces settlement none for effect-absent"), pin(RECONCILE_DECISION, "overrides only with the latest acknowledgement cited, own-property confirmation and accepted risk")],
  },
  {
    row: "j7",
    label: "overrides are spent at resume START",
    quotes: [journey(QUOTES.j8), journey(QUOTES.j8b)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE, "spends every live override at the start of a resume, and only those"), pin(EFFECT_REPLAY, "re-runs once under a live override, records the consumed copy, and refuses a resume of the resume"), pin(EFFECT_REPLAY, "spends the override even when the re-run throws"), pin(PI_RECONCILE, "refuses an unconfirmed override, records a confirmed one, spends it at the next resume, and refuses the resume after that")],
  },
  {
    row: "j8",
    label: "conflicting decisions refuse, nothing resolves latest-wins",
    quotes: [journey(QUOTES.j9)],
    tier: "default-gate",
    status: "pinned",
    pins: [pin(RECONCILE, "re-runs under a live override that cites the latest acknowledgement, and refuses conflicting or spent ones")],
  },
  {
    row: "j9",
    label: "recording a decision executes nothing and upgrades nothing",
    quotes: [journey(QUOTES.j10)],
    tier: "default-gate",
    status: "unpinned",
    reason: "no default-gate case binds the three non-claims together; 'B2 an operator acknowledgement binds to the dispatched row by digest and settles the resume; nothing re-runs' covers only part of the first non-claim, so the row is recorded unpinned, never claimed",
    pins: [],
  },
]);

const EXPECTED_ROW_IDS: readonly string[] = ["p1", "p2", "p3", "p4", "p5", "p6a", "p6b", "p7", "j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8", "j9"];
const EXPECTED_SHAPE: readonly string[] = ["p1:3:1", "p2:4:2", "p3:3:1", "p4:2:1", "p5:3:1", "p6a:1:1", "p6b:0:1", "p7:2:1", "j1:1:1", "j2:3:2", "j3:2:1", "j4:3:2", "j5:2:1", "j6:3:1", "j7:4:2", "j8:1:1", "j9:0:1"];
const EXPECTED_JUDGED: readonly string[] = [
  "p1|workflow-effect-replay.test.ts|neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
  "p1|workflow-effect-replay.test.ts|carries the recorded effect forward into the new journal",
  "p1|workflow-effect-replay.test.ts|refuses even when the call at that position changed",
  "p2|workflow-effect-replay.test.ts|appends the typed dispatched row before the provider can act, and the settled row supersedes it",
  "p2|workflow-effect-replay.test.ts|writes no pre-call row for a read: a read-only journal stays exactly as before",
  "p2|workflow-effect-replay.test.ts|Q2 keeps a read running when the journal cannot be written: failure to write is not failure to run",
  "p2|workflow-effect-replay.test.ts|Q2 refuses an override re-run whose marker cannot be written, and carries the original effect row forward",
  "p3|workflow-effect-replay.test.ts|does not replay a read the current host cannot vouch for",
  "p3|workflow-effect-replay.test.ts|marks a replayed read as stale, never fresh",
  "p3|workflow-effect-replay.test.ts|replays a journaled read under the same basis, marked stale",
  "p4|workflow-effect-replay.test.ts|journals a non-read node as the effect it was, without a replayable payload",
  "p4|workflow-effect-replay.test.ts|records nativeRefs on a non-read entry, keeps no answer, and leaves the entry replay-refusing",
  "p5|workflow-effect-replay.test.ts|neither replays nor re-runs a node the journal carries no effect metadata for: the resume stops there",
  "p5|workflow-effect-replay.test.ts|refuses whatever the recorded outcome: a failed unclassified call is still an attempted effect",
  "p5|workflow-effect-replay.test.ts|carries the unclassified entry forward verbatim, so a resume of the failed resume still refuses",
  "p6a|workbench-reconcile-decision.test.ts|lists and decides nothing at an unclassified node row: wb-tu1 made the runtime refuse it and left this ladder unchanged",
  "p7|workflow-effect-replay.test.ts|stamps the registry's effect class into node journal entries",
  "p7|workflow-effect-replay.test.ts|replays settled agents under an unchanged policy basis",
  "j1|workbench-reconcile-decision.test.ts|inspect requires workbench:observe, then scope, and lists the pending position with its evidence reads",
  "j2|workbench-reconcile-decision.test.ts|evidence permits only an allowlisted read that is currently a read",
  "j2|workbench-reconcile-decision.test.ts|denies evidence whose native identity does not bind to the recorded refs",
  "j2|workbench-pi-reconcile.test.ts|walks the full acknowledge journey: pending roster, bound receipt, recorded decision, settled resume with applied carry",
  "j3|workbench-reconcile-decision.test.ts|publishes fixed evidence guidance that names the failure-is-not-absence rule",
  "j3|workbench-reconcile-decision.test.ts|requires a returned receipt for effect-confirmed and a reason for empty evidence",
  "j4|workbench-reconcile-decision.test.ts|names the exact missing grant only after the scope check",
  "j4|workbench-reconcile-decision.test.ts|mints a bound, idempotent acknowledgement row",
  "j4|workflow-reconcile.test.ts|digests the exact node row and changes when any bound field changes",
  "j5|workflow-effect-replay.test.ts|settles an acknowledged position with the envelope, marked stale, and ends the prefix",
  "j5|workflow-reconcile.test.ts|settles a bound, settling acknowledgement; its envelope is never producer-shaped and carries no operator data value",
  "j6|workflow-effect-replay.test.ts|keeps an effect-absent acknowledgement refusing, naming the principal and the override path",
  "j6|workbench-reconcile-decision.test.ts|forces settlement none for effect-absent",
  "j6|workbench-reconcile-decision.test.ts|overrides only with the latest acknowledgement cited, own-property confirmation and accepted risk",
  "j7|workflow-reconcile.test.ts|spends every live override at the start of a resume, and only those",
  "j7|workflow-effect-replay.test.ts|re-runs once under a live override, records the consumed copy, and refuses a resume of the resume",
  "j7|workflow-effect-replay.test.ts|spends the override even when the re-run throws",
  "j7|workbench-pi-reconcile.test.ts|refuses an unconfirmed override, records a confirmed one, spends it at the next resume, and refuses the resume after that",
  "j8|workflow-reconcile.test.ts|re-runs under a live override that cites the latest acknowledgement, and refuses conflicting or spent ones",
];
/** Rule 16 (frozen quote lengths): "<row>:<chars>,..." per row, so shortening a requirement phrase reads red even when its count and its docs presence are unchanged. */
const EXPECTED_QUOTE_LENGTHS: readonly string[] = ["p1:239", "p2:175,148", "p3:156", "p4:93", "p5:211", "p6a:103", "p6b:55", "p7:141", "j1:179", "j2:198,140", "j3:70", "j4:85,76", "j5:215", "j6:264", "j7:35,113", "j8:109", "j9:176"];
const EXPECTED_UNPINNED: readonly string[] = ["p6b", "j9"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });
const shapeOf = (row: ReconcileRow): string => `${row.row}:${row.pins.length}:${row.quotes.length}`;
const quoteLengthsOf = (row: ReconcileRow): string => `${row.row}:${row.quotes.map(quote => quote.text.length).join(",")}`;
const judgedOf = (rows: readonly ReconcileRow[]): string[] => rows.flatMap(row => row.pins.map(entry => `${row.row}|${basename(entry.file)}|${entry.title}`));

const JUDGED_ROWS = ROWS.filter(row => row.pins.length > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: ReconcileRow, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.row}: ${verdict.code}: ${verdict.why}`);

/** The rendered paragraph texts of a section's blocks. */
const paragraphTexts = (blocks: readonly RenderedBlock[]): string[] => blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : []));

/** docs/08 drifts, each naming the row or the section it breaks. The per-row quote checks run independently of the exactness checks. */
function docs08Failures(markdown: string): string[] {
  const out: string[] = [];
  const sections: { where: Where; heading: string; blocks: readonly RenderedBlock[] }[] = [
    { where: "policy", heading: HEADING_POLICY, blocks: BLOCKS_POLICY },
    { where: "journey", heading: HEADING_JOURNEY, blocks: BLOCKS_JOURNEY },
  ];
  for (const { where, heading, blocks } of sections) {
    const section = docsSection(markdown, heading, 2, [PARENT_08]);
    if (!section.ok) {
      out.push(`${DOC_08} § ${heading}: the section is refused: ${section.why}`);
      continue;
    }
    const rendered = paragraphTexts(section.blocks);
    for (const row of ROWS) {
      for (const quote of row.quotes) {
        if (quote.where === where && !rendered.some(text => text.includes(quote.text))) out.push(`row ${row.row}: its quote "${quote.text}" no longer renders in ${DOC_08} § ${heading}`);
      }
    }
    const exact = sectionMatches(section, blocks);
    if (!exact.ok) out.push(`${DOC_08} § ${heading} is not exactly its frozen blocks: ${exact.why}`);
  }
  return out;
}

interface Edit {
  readonly policy?: string;
  readonly journey1?: string;
  readonly journey2?: string;
}

/** The synthetic docs/08 the drift falsifiers run over: the frozen paragraphs under the real heading shape, never the live text. */
const synthetic08 = (edit: (policyText: string, first: string, second: string) => Edit = () => ({}), policyTail = ""): string => {
  const changed = edit(POLICY_SOURCE, JOURNEY_SOURCE_1, JOURNEY_SOURCE_2);
  return `# ${PARENT_08}\n\n## Separate four identities\n\nText.\n\n## ${HEADING_POLICY}\n\n${changed.policy ?? POLICY_SOURCE}\n${policyTail}\n## Cancellation and ownership\n\nText.\n\n## ${HEADING_JOURNEY}\n\n${changed.journey1 ?? JOURNEY_SOURCE_1}\n\n${changed.journey2 ?? JOURNEY_SOURCE_2}\n`;
};
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-5x0.2 docs/workbench/08 replay-and-reconcile census (report mode)", () => {
  it("AC1: the table holds the frozen rows in order, deeply frozen, with the frozen per-row pin shape, judged titles and unpinned set", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.row)).toEqual(EXPECTED_ROW_IDS);
    expect(new Set(ROWS.map(row => row.row)).size).toBe(ROWS.length);
    expect(ROWS.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(ROWS)).toEqual(EXPECTED_JUDGED);
    expect(ROWS.map(quoteLengthsOf)).toEqual(EXPECTED_QUOTE_LENGTHS);
    expect(ROWS.filter(row => row.pins.length === 0).map(row => row.row)).toEqual(EXPECTED_UNPINNED);
    expect(JUDGED_ROWS).toHaveLength(ROWS.length - EXPECTED_UNPINNED.length);
  });

  it("AC1: every row is on the default gate and quotes the docs; a pinned row has pins and no reason, an unpinned row has a reason and no pin", () => {
    for (const row of ROWS) {
      expect(row.tier, row.row).toBe("default-gate");
      expect(row.quotes.length, row.row).toBeGreaterThan(0);
      if (row.status === "pinned") {
        expect(row.pins.length, row.row).toBeGreaterThan(0);
        expect(row.reason, `${row.row}: a pinned row carries no unpinned reason`).toBeUndefined();
      } else {
        expect(row.pins, `${row.row}: an unpinned row names no pin`).toEqual([]);
        expect((row.reason ?? "").length, `${row.row}: an unpinned row carries its reason`).toBeGreaterThan(20);
      }
    }
  });

  it("AC1: the live docs/08 sections render exactly their frozen blocks, HTML-free, and no docs drift names a row", () => {
    const markdown = readRepo(DOC_08);
    const policySection = docsSection(markdown, HEADING_POLICY, 2, [PARENT_08]);
    const journeySection = docsSection(markdown, HEADING_JOURNEY, 2, [PARENT_08]);
    expect(sectionMatches(policySection, BLOCKS_POLICY)).toEqual({ ok: true, why: "" });
    expect(sectionMatches(journeySection, BLOCKS_JOURNEY)).toEqual({ ok: true, why: "" });
    expect(policySection.hasHtml).toBe(false);
    expect(journeySection.hasHtml).toBe(false);
    expect(docs08Failures(markdown)).toEqual([]);
  });

  it.each(JUDGED_ROWS.map(row => ({ row })))("AC2 row $row.row: every named default-gate case is collected once, passed and asserting in the gate's own report", ({ row }) => {
    const verdicts = judge(
      REPORT,
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = ROWS.flatMap(row => row.pins.map(entry => basename(entry.file, ".ts")));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges, and never mints a reconcile grant", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
    expect(readRepo(SELF)).not.toMatch(/grants?\s*:\s*\[\s*["']reconcile:/);
  });
});

describe("wb-5x0.2 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: ReconcileRow; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.row === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("p3");
    const wrong = { ...entry, title: `${entry.title}X` };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row p3:");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a pin with no title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("j1");
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M3: a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-native-rf-preview.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M4: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { entry } = firstPin("p6a");
    const [verdict] = judge(REPORT, [casePin({ file: EFFECT_REPLAY, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M5: a pin claimed under a non-default tier is refused by the default report (a live-tier label is never vouched here)", () => {
    const { entry } = firstPin("j8");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "forge-command" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-5x0.2 rule 16 / O1 / O2: hollowing the table reddens the frozen literals", () => {
  const withRow = (id: string, edit: (row: ReconcileRow) => ReconcileRow): readonly ReconcileRow[] => ROWS.map(row => (row.row === id ? edit(row) : row));

  it("H1: deleting one pin of a multi-pin row changes the shape literal and the judged-title literal", () => {
    const mutated = withRow("j7", row => ({ ...row, pins: row.pins.slice(1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
  });

  it("H2: deleting the only pin of a single-pin row (the O2 removal) changes both literals and the unpinned set", () => {
    const mutated = withRow("p6a", row => ({ ...row, pins: [] }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    expect(mutated.filter(row => row.pins.length === 0).map(row => row.row)).not.toEqual(EXPECTED_UNPINNED);
  });

  it("H3: shortening a requirement phrase or dropping a quote changes the frozen quote-length or shape literal", () => {
    const mutated = withRow("p2", row => ({ ...row, quotes: row.quotes.slice(0, 1) }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    const shortened = withRow("j4", row => ({ ...row, quotes: row.quotes.map(quote => ({ ...quote, text: quote.text.slice(0, -5) })) }));
    expect(shortened.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(shortened.map(quoteLengthsOf)).not.toEqual(EXPECTED_QUOTE_LENGTHS);
    expect(docs08Failures(readRepo(DOC_08))).toEqual([]);
  });

  it("H4: swapping a pin for an unrelated passing case in the same file keeps the shape but changes the judged-title literal", () => {
    const mutated = withRow("p1", row => ({ ...row, pins: [pin(EFFECT_REPLAY, "marks a replayed read as stale, never fresh"), ...row.pins.slice(1)] }));
    expect(mutated.map(shapeOf)).toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
  });

  it("H5: emptying the table leaves neither the row-id list nor the judged literal standing (O1 each-liveness)", () => {
    expect([].map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf([])).not.toEqual(EXPECTED_JUDGED);
    expect(ROWS.map(row => row.row).filter(id => EXPECTED_ROW_IDS.includes(id))).toEqual(EXPECTED_ROW_IDS);
  });

  it("H6: removing a row from the table fails the row-set pin", () => {
    expect(ROWS.filter(row => row.row !== "j9").map(row => row.row)).not.toEqual(EXPECTED_ROW_IDS);
  });

  it("H7: promoting an unpinned row to pinned with an invented pin changes the shape, judged and unpinned literals", () => {
    const mutated = withRow("j9", row => ({ row: row.row, label: row.label, quotes: row.quotes, tier: row.tier, status: "pinned", pins: [pin(EFFECT_REPLAY, "marks a replayed read as stale, never fresh")] }));
    expect(mutated.map(shapeOf)).not.toEqual(EXPECTED_SHAPE);
    expect(judgedOf(mutated)).not.toEqual(EXPECTED_JUDGED);
    expect(mutated.filter(row => row.pins.length === 0).map(row => row.row)).not.toEqual(EXPECTED_UNPINNED);
  });
});

describe("wb-5x0.2 docs drift names the row or the section (synthetic documents, rendered view)", () => {
  it("accepts both docs/08 sections exactly as written, the journey section at EOF", () => {
    expect(docs08Failures(synthetic08())).toEqual([]);
  });

  it("K1 names the non-read row (and only it) when its carried-forward clause is dropped", () => {
    const lines = docs08Failures(synthetic08(text => ({ policy: text.replace(", and the entry is carried forward so retrying the resume stays protected", "") })));
    expect(named(lines)).toEqual(["row p1"]);
    expect(lines.some(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names the vouched-read row (and only it) when 'stale rather than fresh' is reworded", () => {
    expect(named(docs08Failures(synthetic08(text => ({ policy: text.replace("marked stale rather than fresh", "marked fresh") }))))).toEqual(["row p3"]);
  });

  it("K3 names the unclassified row (and only it) when the fail-closed clause is weakened", () => {
    expect(named(docs08Failures(synthetic08(text => ({ policy: text.replace("treats it fail-closed as an uncertain effect", "re-runs it live") }))))).toEqual(["row p5"]);
  });

  it("K4 names the unpinned fresh-run row (and only it) when that escape sentence is dropped: an unpinned row's quote is still bound", () => {
    expect(named(docs08Failures(synthetic08(text => ({ policy: text.replace(", and a fresh run without `resumeFromRunId` is the way past one", "") }))))).toEqual(["row p6b"]);
  });

  it("K5 names the override-spend row (and only it) when 'spent at resume START' is reworded", () => {
    expect(named(docs08Failures(synthetic08((_text, _first, second) => ({ journey2: second.replace("Overrides are spent at resume START", "Overrides are spent at resume end") }))))).toEqual(["row j7"]);
  });

  it("K6 names the conflict row (and only it) when 'nothing resolves latest-wins' is weakened", () => {
    expect(named(docs08Failures(synthetic08((_text, _first, second) => ({ journey2: second.replace("nothing resolves latest-wins", "the latest decision wins") }))))).toEqual(["row j8"]);
  });

  it("K7 names the unpinned non-claims row (and only it) when the non-claims sentence is dropped", () => {
    const lines = docs08Failures(synthetic08((_text, _first, second) => ({ journey2: second.slice(0, second.indexOf(" Non-claims:")) })));
    expect(named(lines)).toEqual(["row j9"]);
  });

  it("D1 goes red on the policy section, naming no row, when a sentence is appended", () => {
    const lines = docs08Failures(synthetic08(text => ({ policy: `${text} A host may re-run any write.` })));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${HEADING_POLICY} is not exactly its frozen blocks`);
  });

  it("D2 goes red when a second paragraph is added to the policy section", () => {
    const lines = docs08Failures(synthetic08(undefined, "\nA host may skip the typed refusal.\n"));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen blocks");
  });

  it("D3 goes red when the policy heading is renamed away", () => {
    const lines = docs08Failures(synthetic08().replace(`## ${HEADING_POLICY}`, "## Replay notes"));
    expect(lines.some(line => line.includes(`${HEADING_POLICY}: the section is refused`))).toBe(true);
  });

  it("D4 goes red when a weakening ### subsection is appended inside the policy section", () => {
    const lines = docs08Failures(synthetic08(undefined, "\n### Exceptions\n\nA host may replay a write.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 names the acknowledge row when its determinations are hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docs08Failures(synthetic08().replace("effect-confirmed (needs a returned receipt), effect-absent, or indeterminate", "<!-- effect-confirmed (needs a returned receipt), effect-absent, or indeterminate -->"));
    expect(named(lines)).toEqual(["row j4"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the journey section (the normative parent path is bound)", () => {
    const lines = docs08Failures(synthetic08().replace(`## ${HEADING_JOURNEY}`, `# Appendix\n\n## ${HEADING_JOURNEY}`));
    expect(lines.some(line => line.includes(`${HEADING_JOURNEY}: the section is refused`))).toBe(true);
  });

  it("D7 goes red when an HTML comment opened before the policy heading and closed after the next heading hides the section", () => {
    const hidden = synthetic08().replace(`## ${HEADING_POLICY}`, `<!--\n## ${HEADING_POLICY}`).replace("## Cancellation and ownership", "-->\n## Cancellation and ownership");
    expect(docs08Failures(hidden).some(line => line.includes(`${HEADING_POLICY}: the section is refused`))).toBe(true);
  });

  it("D8 goes red when a code fence opened before the journey heading and closed after hides the section from the rendered view", () => {
    const hidden = synthetic08().replace(`## ${HEADING_JOURNEY}`, `\`\`\`\n## ${HEADING_JOURNEY}`).concat("```\n");
    expect(docs08Failures(hidden).some(line => line.includes(`${HEADING_JOURNEY}: the section is refused`))).toBe(true);
  });

  it("D9 goes red on the journey section, naming no row, when a sentence is appended to its last paragraph", () => {
    const lines = docs08Failures(synthetic08((_text, _first, second) => ({ journey2: `${second} Hosts may settle any position.` })));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${HEADING_JOURNEY} is not exactly its frozen blocks`);
  });

  it("an edit of any other section never reddens a row: the identities and cancellation sections are free to change", () => {
    expect(docs08Failures(synthetic08().replaceAll("Text.", "Text, changed."))).toEqual([]);
  });
});
