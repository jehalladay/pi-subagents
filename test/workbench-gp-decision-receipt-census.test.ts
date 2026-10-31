/**
 * wb-0lf.4 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R4, program-triage-2026-10-18 child of wb-0lf), the GP decision receipt
 * census. Statement (the bead title, verbatim): "When Pi executes a GraphPolicyCLI decision through Furnace (artifact: released
 * GP seam + a Pi decision point), each decision shall get an append-only receipt tied to its native Attempt: admission or
 * rejection, the Attempt/effect ref, the verifier outcome as its own field (failure, pending and unavailable distinct; unknown
 * never negative; killed never successful) and corrections as new rows only."
 * Acceptance (the owner filing's Acceptance sentence, verbatim, cut at ", " outside brackets into the labels of rows A1 to A7,
 * the last without its leading "and ", its final period and its trailing parenthetical): "a receipt test asserts one row per
 * decision with admission|rejection, the native Attempt ref (or none), verifierOutcome in {failure, pending, unavailable,
 * success} as a field distinct from the decision, a killed or externally terminated Attempt never recorded success, an unknown
 * outcome never recorded as negative feedback, corrections appended as new rows with the original untouched, and no causation
 * relation stated between a GP score and a later outcome (carries O5 and O13's GP-specific rows)."
 * Standing anchors (the filing's own sentence "Standing anchors carried here as acceptance rows: ...", cut the same way into the
 * labels of rows S1 to S4, its pin @758ec18187a5 dropped): "ControlOutcome keeps completed/failed/cancelled/unknown distinct
 * (src/workbench/control.ts:53), rich producer status is never flattened to a boolean (docs/workbench/06:28), no fabricated edge
 * and causality != ownership (docs/workbench/09:91, 08:38), append-only correction precedent (wb-lrz.3 TRACEABILITY correction
 * row)". The seam's status, as the sibling filings read it at Furnace 0f791db71b9d (wb-0lf.1, wb-0lf.7): design-only, naming no
 * Pi surface; the landed wb-0lf.7 census holds that Pi adds no GP capability, host or docs presenting GP as served until it
 * exists. Row T's label is the title's trigger, verbatim.
 *
 *
 * MEASURED (read-only): cut #1's seat (2026-10-28) at the trunk tip 09f45a52f7a7 and at its base e544dd872434, cut #2's seat
 * (2026-10-28) at its base e81d2b08eecf, cut #3's seat (2026-10-28) at its base 014d116fb4c1, the wb-odlv follow-up's seat
 * (2026-10-30) at its base 577493f9e951 and the wb-4wts follow-up's seat (2026-10-30) at its base 2e3a2538887f, each also at
 * the Pi pin 758ec18187a5: no src module spells GraphPolicyCLI or verifierOutcome (in any spelling the word reader reads);
 * src/workbench/control.ts declares one exported ControlOutcome type alias, a union of the four string literals, starting on
 * line 53 at the pin (read from its parse); the docs sections carrying docs/workbench/06:28, 09:91 and 08:38 render the same,
 * block for block, at the pin and at HEAD; the wb-lrz.3 correction row is one line of docs/workbench/TRACEABILITY.md,
 * appended by commit e805a5efd42d (an ancestor of the pin) with numstat 2 added, 0 deleted; the installed @furnace/sdk
 * (vendor/furnace-sdk-0.1.0.tgz) declares AttemptState, AttemptOutcome and TerminationCause in dist/src/protocol.d.ts; (the
 * wb-odlv follow-up's seat) row A4's Acceptance clause in the bead's own row names one TerminationCause member,
 * external_termination, by the outside anchors' cause reader; and (the wb-4wts follow-up's seat) each of the three
 * WHITESPACE_PLANTS' planted texts differs from HEAD's by whitespace alone, keeps its section's heading on its line and moves
 * the line carrying its anchor's sentence one down (W1 adding no blank line, W2 and W3 one each), and D10's planted carrier,
 * in block 2 of its section, reads the anchor's carrier text with markdown other than HEAD's, its verdict led "block 2 differs".
 *
 * Pi records no GP decision receipt today. The census pins that (row T) and an ARMED contract (rows A1 to A7) that binds the
 * first receipt site to come, as the wb-0lf.7 and wb-gxd7.3 censuses arm theirs:
 *  T, the trigger. T1: no src module spells the vocabulary (VOCABULARY: the title's GraphPolicyCLI and the Acceptance's one
 *    camel-case member verifierOutcome; a text is split at every non-letter, non-digit character and at camel-case humps and
 *    lower-cased, and a member reads wherever a run of consecutive words concatenates to the member's words joined, so
 *    VERIFIER_OUTCOME, graph-policy-cli, GRAPHPOLICYCLI, graphpolicy_cli and pieces joined only by such characters read, and a
 *    longer word does not) in git's would-commit listing under src/, and the src modules that do are exactly the registered
 *    RECEIPT_SITES (empty both ways today: a module that starts recording must be bound, and a bound module that names nothing is
 *    stale); the listing holds at least SRC_FLOOR files and the control core, and the reader reads every member in planted text
 *    and no near token. Every registered site's ledger must meet every check over the journal (vacuous today). T2: the
 *    journal's Attempts speak Furnace's own vocabulary: the census's killed tables are keyed by exactly the members of the
 *    installed SDK's AttemptState, AttemptOutcome and TerminationCause unions, each read from a parse of the declaration file,
 *    and two in-memory plants over that file (a comment or a string restating TerminationCause with one member above its
 *    declaration) each still read the real union.
 *  A1 to A7, armed. The contract reads a receipt site as one ledger (record each journal event, read the rows it holds) over the
 *    synthetic JOURNAL: eight decided events (a decision id, its admission or rejection, a GP score, the native Attempt as Furnace
 *    records it, or none, and the verifier's own evidence: none, running, failed or passed) and three corrected events (new
 *    verifier evidence for a recorded decision, one of them a killed decision's, so a correction cannot launder success). A row is
 *    ORIGINAL unless it carries an own corrects member. A ROW PER EVENT: each row's WRITER is the journal event at whose step it
 *    first appears in the snapshot taken after every event. Seven CHECKS judge the rows, their writers and the snapshots, one per
 *    Acceptance clause: one-row (exactly one original row per decision, its admission member the decision's admission or
 *    rejection, strictly; a correction row that carries an admission member carries its decision's; and every decided event
 *    appends exactly one row, an original row naming its decision), attempt-ref (an original row's attemptRef is the native
 *    Attempt's attempt_id, or null when there is none, and a correction row that carries an attemptRef carries the same value for
 *    its decision), verifier-field (every row's own verifierOutcome is one of the four values; every row naming a decision has a
 *    writer of its decision and kind, an original row its decided event and a correction row a corrected event; and on a row whose
 *    Attempt was not killed the value is READING of its writer's evidence alone - none unavailable, running pending, failed
 *    failure, passed success - never the admission or the Attempt's native outcome), killed-never-success (no row of a killed or
 *    externally terminated Attempt has the verifierOutcome success), unknown-never-negative (no row records negative feedback
 *    unless its writer's evidence is an observed failure: a verifierOutcome failure, or, at any depth of the row, a value under a
 *    member a word of whose name starts with reward or feedback, the README's and the Acceptance's own nouns, that is a number
 *    below zero or a string with a word starting negativ or fail; its reader is shown NEGATIVE_CONTROLS), corrections-append
 *    (every snapshot keeps the one before it as its prefix, byte for byte; each corrected event appends exactly one row naming its
 *    decision and, as corrects, the 1-based number of that decision's original row; and no other event appends a correction row)
 *    and no-causation (no member name and no string value of a row, at any depth, holds a word carrying "caus", the stem of the
 *    observation model's causation relation kind; the NAME of Furnace's own termination_cause member - a member whose name's
 *    words are exactly termination and cause - is exempt only while that member holds one member of the installed SDK's
 *    TerminationCause, the keys of KILLED_CAUSES that row T2 holds to the SDK union, and what it holds is read like any other
 *    value). KILLED: an Attempt whose termination_cause is operator_stop, timeout_escalation or external_termination, whose state
 *    is cancelled or timed_out, or whose outcome is cancelled or timeout. The honest REFERENCE ledger meets every check; each of
 *    the twenty-eight MUTANTS fails exactly its declared checks, and every check has a mutant that fails it alone. Among them, six
 *    of the seven phantom twists are the gate's G1a to G1e and G5a of refusal #1 on cut #1 (a correction row written at a decided
 *    event, for a decision no corrected event names at that step, from the five contract members only) and phantom-killed writes
 *    one for a killed decision, which verifier-field sees through the row's writer alone; negative-reward and negative-feedback
 *    are its G2a and G2b and correction-ref its G4a; correction-admission is refusal #2's G4b (every correction row carrying the
 *    admission rejection, for decisions that were admissions); its G3a to G3c and refusal #2's G3d to G3f (a termination_cause
 *    member holding the score, an object or the word score) are rows of the no-causation reader's controls. A pass over a killed
 *    Attempt is read unavailable by the reference: the program README the filing cites (README.md:13@0f791db71b9d) with "killed
 *    Attempt is not successful" forbids success and its "Unknown feedback is not negative reward" forbids failure.
 *  S1 to S4, the standing anchors, each read at the pin and at HEAD: S1 the ControlOutcome union is the label's four values, read
 *    from the parse of control.ts (its one exported type alias of that name, a union of string literals, starting on line 53 at
 *    the pin), and three in-memory plants over the HEAD text (a comment or a string restating the union above a declaration that
 *    gains a member, the gain alone; the gate's S1 and S1x among them) each read five members; the real control core settles each
 *    of the four values as given and refuses another spelling. S2 and S3 the docs lines, read in the rendered view (docsSection
 *    of test/helpers/census.ts: the section's heading unique in the rendered view under the page's title, the section bounded at
 *    the next level-1/2 heading): at the pin the section carries no HTML, exactly one of its prose items (a paragraph or a list
 *    item) carries the anchor's sentence, it reads exactly the census's carrier text, and the filing's line is its source; at HEAD
 *    the section carries no HTML, the same one item reads the same text, and the whole section equals the pin's block for block
 *    (sectionMatches, the same view at both). So at HEAD an anchor is read by its section's rendered blocks (each block as
 *    docsSection renders it, a paragraph's or list item's source with its whitespace collapsed included), never by a line: any
 *    later edit that changes those blocks reds this census until it is re-measured, a markup-only edit too (D10), while the
 *    three WHITESPACE_PLANTS, each changing only what the blocks do not carry (W1 the 06:28 carrier re-wrapped at a space, W2
 *    and W3 a blank line added under the 09:91 and 08:38 headings, so their carriers move a line down), each leave their anchor
 *    held, and each one's planted change is read in the Q3/Q10 planted form, so a plant that writes nothing reds (landing
 *    706's F1): its planted text differs from HEAD's, by whitespace alone, its section's heading line stays where it is, the
 *    line carrying its anchor's sentence (the first from the heading on) moves one down, and it adds no blank line (W1) or one
 *    (W2, W3); on disk, an edit of that kind still reds a plant whose span it moves (a plant throws on a drifted span: landing
 *    658's gate re-wrap P-W1 reds S2b through D3's span). Three controls over the pin's text (the filing's line moved one down,
 *    the carrier text edited, the carrier's source line doubled) each leave their anchor unheld. Eleven in-memory plants (the
 *    gate's D1 to D5, D4 split by page, and D6 a withdrawing paragraph in the section, D7 a duplicated heading, D8 a level-1
 *    heading re-homing the section, D9 a list item added, D10 the 06:28 carrier's strong marker respelled with underscores, a
 *    markup-only edit) each leave their anchor unheld, and D10's is read past that boolean (landing 706's F2): the one prose
 *    item of its planted section that carries the sentence sits in the section's block 2, reads the anchor's carrier text and
 *    has markdown other than HEAD's, and its verdict's lead (the why before its first colon) is "block 2 differs", the
 *    section's block comparison failing at the carrier's own block, never a carrier-text why. S2 also a boolean admission or
 *    verifier outcome is refused by its check; S3 also the real control core never takes a causation relation for lifecycle
 *    ownership, and the reference states no relation at all; S4 the precedent commit is an ancestor of the pin and added the
 *    correction row without deleting a line, and the row stands at the pin and at HEAD.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins as literals each row's id and pin count; one quote, one case and
 * one subject list per pin, in row order, and each pin's subjects; the checks, one per Acceptance row; every mutant with the
 * checks it fails; the phantom twists (step, decision, outcome, link and admission); the journal's events by kind, decision and
 * evidence; the vocabulary, the admissions, the verifier outcomes and the evidence reading; the killed readings; each residual
 * family's member count, one family per row Q pin and each row Q pin's quote; the plant counts of R-SPELLING, R-KILL-READING
 * and R-NEGATIVE-SIGNAL, one per member; the docs anchors' ids and headings, the docs and whitespace plants' ids and anchors and
 * the SDK and control plants' names; the reader, stem, negative-feedback and cause controls with their readings; the
 * R-SPELLING plants' texts (each character past ASCII written as its code point); and the receipt sites. OUTSIDE ANCHORS
 * (their own registered case):
 * the bead's own row in the tracker export (.beads/issues.jsonl): the title opens with the requirement id and carries row T's
 * label before its artifact parenthetical and names exactly the vocabulary's first member; the first notes line opening
 * "Citation: " holds the standing-anchors sentence, whose four clauses are exactly the labels of rows S1 to S4 and whose pin is
 * the census's, and the Acceptance sentence, whose seven clauses are exactly the labels of rows A1 to A7 (one check each) and
 * whose one camel-case member, admission set and brace set are the vocabulary's second member, ADMISSIONS and
 * VERIFIER_OUTCOMES; each row's pin quotes but row Q's, joined by single spaces, are its label; and a row whose clause ends in a
 * parenthetical (A2 and S1 to S4) has two pins that quote exactly the clause before the parenthetical and the parenthetical, so
 * the filing fixes that row's pin split. Row A4's clause, read from the same row, names the installed SDK's TerminationCause
 * members each word of whose name shares a stem with a word of the clause (the shorter word, its last three letters dropped but
 * at least four kept, opens the longer; CAUSE_CONTROLS show the reader): external_termination ("externally terminated") and no
 * other, and each member it names must read as a kill in KILLED_CAUSES (landing 658's F2). A tracker note appended later (a
 * delivery, gate or park note) sits on a line of its own and binds nothing. So a row but Q, a clause, a check or
 * external_termination's kill reading removed from every literal of this file still reds, and so does a
 * pin of a row but Q removed from every literal with its quote (its row's joined quotes no longer read as its label) and a pin
 * of row A2, S1, S2, S3 or S4 merged into its sibling or split from it elsewhere; a pin of row T, A1 or A3 to A7 merged into its
 * sibling with its quote re-homed, or the boundary between such a row's two pins moved, every literal edited to match, leaves
 * every outside anchor holding: no source outside this file fixes those rows' pin splits, which is the named residual
 * R-PIN-PARTITION (Q9). The last case reads the vitest task tree (every registered test, in order, in run mode, ran before it)
 * and REACHED: every pin reached its witness compare, each compare held, every pin's case consulted at least one subject, and
 * the subjects each pin's case consulted (a ledger run, the judge, the repository, the installed SDK, the real control core,
 * the vocabulary reader, REACHED's own reader) are exactly its CONSULTS entry, so a pin body swapped for a compare of literals
 * consults nothing and reds, whatever its CONSULTS entry reads.
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included; the docs leg is the
 * wb-0lf.7 census's); the seam's actual receipt shape (the armed contract is this census's reading of an unpublished seam: the
 * members decision, admission, attemptRef, verifierOutcome and corrects, a row per event; a site whose own cut must take another
 * shape re-measures rows A1 to A7 with it); a row's wall-clock time (the census reads the snapshot after each event, never a
 * clock); a killed Attempt's verifier outcome beyond killed-never-success, unknown-never-negative and verifier-field's value set
 * and writer (verifier-field compares a reading only on the rows of Attempts that were not killed: a killed row may read pending
 * or unavailable whatever its evidence); which rows of the O5 and O13 drafts the trailing parenthetical carries (the drafts are
 * outside this repository); docs text outside an anchor's section (a later section of the page that withdraws it: the docs leg
 * reads the anchor's own section); the cause of a docs plant's unheld reading but D10's (D1 to D9 read the boolean only);
 * where between its section's heading and its anchor's sentence a whitespace plant's change lands (its planted reading binds
 * the change's kind, the two lines' moves and the blank lines added); R12's field-independence rows (wb-0lf.6, its own bead);
 * Furnace's own durable effect receipts; a pin's reading and its witness's expected value narrowed together (REACHED binds the
 * subjects a pin consulted, not how much of them it reads); a mutant, a journal event, a plant or a control removed from its
 * table and the frozen literal together while every check keeps a mutant that fails it alone; row Q, one of its pins (a
 * residual family) or a residual member removed from every literal (no source outside this cut names the residual families
 * before its delivery note lands).
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row): R-SPELLING
 * (Q1, a vocabulary spelling the word reader does not read: a member composed at run time from pieces with other words between
 * them, one spelled with escapes, the shortened name GraphPolicy, the word gp, refusal #2's four: a member built from character
 * codes, one with a homoglyph letter, one in full-width letters and one encoded in base64, and landing 658's three (its F3): one
 * encoded in rot13, one reversed at run time and the expanded name GraphPolicyCommandLineInterface; the landed wb-e66.5
 * census's src leg reads every GraphPolicy word under src/, so the shortened name reds there), R-SIDE-RECORD (Q2, a receipt kept
 * outside rows(): the checks read rows() only), R-CAUSAL-WORDING (Q3, a causal claim worded without the stem: a credit member
 * holding the score, a reason saying the score led to the outcome, and landing 658's two (its F3), planted on the rows of the
 * operator-stopped decision: a by member holding the score beside a termination member, and a termination member nested under
 * the score member, the termination member's name exempt at any depth), R-SECOND-RECORD (Q4, the Attempt record copied into a row:
 * the filing's "Pi's receipt is a correlation record, never a second Attempt record", docs/workbench/09:9-10, is read by no
 * check), R-KILL-READING (Q5, an abandoned Attempt and one whose process identity was lost are not KILLED, so a pass over either
 * reads success unjudged), R-NEGATIVE-SIGNAL (Q6, negative feedback unknown-never-negative does not read: a negative signal under
 * a member name without a feedback noun, a penalty; a feedback member's word on neither negative stem, bad; a feedback member's
 * number written as a string, "-1"; and refusal #2's three booleans: one under a member named for negative feedback, a feedback
 * member's false, and one under a negative-named member of a feedback member), R-KILL-VALUES (Q7, which Attempt readings are
 * kills has one anchor outside this census, row A4's clause, which names external_termination alone - the installed SDK
 * declares the members, not their meaning - so any other kill reading (a TerminationCause one row A4's clause does not name,
 * operator_stop or timeout_escalation, or an AttemptState or AttemptOutcome one) removed from its table and from every literal,
 * or one of those tables' other readings made a kill the same way, refusal #2's addition shape, leaves T2's key anchor and row
 * A4's anchor holding), R-WITNESS-SWAP (Q8, REACHED
 * binds the subjects a pin consulted, never its payload: a pin body that consults its subjects, then witnesses equal values it
 * did not take from them, leaves the same record; one that consults nothing reads "consulted nothing" even with its CONSULTS
 * entry emptied), R-PIN-PARTITION (Q9, the pin split of row T, A1 or A3 to A7 has no source outside this file: a pin merged
 * into its sibling with its quote re-homed, and the boundary between the two pins moved, each leave every outside anchor
 * holding; the gate's M1 and M5 to M7 merges and its M8 move of refusal #2) and R-SUCCESS-ELSEWHERE (Q10, killed-never-success
 * reads the verifierOutcome member only: success recorded under another member of a killed Attempt's row, refusal #2's G6a,
 * a result member, reads nothing).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, seam or fake binary; every journal
 * event, score and Attempt is synthetic.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import type { AttemptDto, AttemptOutcome, AttemptState, TerminationCause } from "@furnace/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { acknowledge, type ControlOutcome, decideControl, type NativeControlRequest, settle } from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { docsSection, type RenderedBlock, sectionMatches } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.4";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R4";
const SUITE = `gp decision receipt census (${BEAD}, ${REQUIREMENT}; synthetic receipt journal)`;
const EXPORT = ".beads/issues.jsonl";
/** The bead's Pi pin (the filing's "@758ec18187a5"), full. */
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
/** The commit that appended the wb-lrz.3 correction row to TRACEABILITY.md (row S4). */
const PRECEDENT = "e805a5efd42dc43af1068910cf0a218acd9be8f1";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const CORRECTION_OPENING = "Correction (2026-10-17, wb-lrz.3,";
const CORE = "src/workbench/control.ts";
const REGISTRY_DOC = "docs/workbench/06-capability-registry.md";
const OBSERVATION_DOC = "docs/workbench/09-observation-and-provenance.md";
const LIFECYCLE_DOC = "docs/workbench/08-lifecycle-and-recovery.md";
/** The installed Furnace SDK's protocol declarations, by package-relative path: the source of the journal's Attempt vocabulary. */
const PROTOCOL = "dist/src/protocol.d.ts";
/** src holds well over this many files; fewer means the listing found nothing. */
const SRC_FLOOR = 100;
const LIVE_BUDGET_MS = 120_000;

/** The subjects a pin's reading is taken from: a ledger run, the judge, the repository, the installed SDK, the real control core, the vocabulary reader, REACHED's own reader. */
type Subject = "control" | "judge" | "ledger" | "reached" | "reader" | "repo" | "sdk";
/** The subjects consulted since the running pin's case began (cleared at the start of each pin case). */
const consulted = new Set<Subject>();
function consult<T>(subject: Subject, value: T): T {
  consulted.add(subject);
  return value;
}

/** The trigger's names: the title's GraphPolicyCLI and the Acceptance's one camel-case member (both held to the export). */
const VOCABULARY = ["GraphPolicyCLI", "verifierOutcome"] as const;
/** The Acceptance's "admission|rejection", the values of a row's admission member. */
const ADMISSIONS = ["admission", "rejection"] as const;
type Admission = (typeof ADMISSIONS)[number];
/** The Acceptance's "{failure, pending, unavailable, success}", the values of a row's verifierOutcome member. */
const VERIFIER_OUTCOMES = ["failure", "pending", "unavailable", "success"] as const;
type VerifierOutcome = (typeof VERIFIER_OUTCOMES)[number];
/** The verifier's own evidence about one decision's effect, as a host receives it. */
type Evidence = "none" | "running" | "failed" | "passed";
/** What verifier-field holds a row whose Attempt was not killed to: the verifier's evidence alone. */
const READING: Readonly<Record<Evidence, VerifierOutcome>> = { none: "unavailable", running: "pending", failed: "failure", passed: "success" };

/** KILLED, by the three Attempt fields Furnace records (each table keyed by the installed SDK's own union, row T2). */
const KILLED_CAUSES: Readonly<Record<TerminationCause, boolean>> = {
  natural_exit: false, operator_stop: true, timeout_escalation: true, external_termination: true, process_identity_lost: false,
};
const KILLED_STATES: Readonly<Record<AttemptState, boolean>> = {
  pending: false, preparing: false, starting: false, running: false, completing: false, succeeded: false, failed: false,
  timed_out: true, cancelled: true, abandoned: false, needs_reconciliation: false,
};
const KILLED_OUTCOMES: Readonly<Record<AttemptOutcome, boolean>> = {
  success: false, work_failure: false, executor_failure: false, infrastructure_failure: false, protocol_failure: false,
  timeout: true, cancelled: true, abandoned: false,
};
/** The Attempt fields a host holds for a decision's effect, in Furnace's own shape. */
type AttemptFact = Pick<AttemptDto, "attempt_id" | "run_id" | "state" | "outcome" | "termination_cause">;
function killed(attempt: AttemptFact | undefined): boolean {
  if (attempt === undefined) return false;
  return KILLED_STATES[attempt.state] === true || (attempt.outcome !== undefined && KILLED_OUTCOMES[attempt.outcome] === true) ||
    (attempt.termination_cause !== undefined && KILLED_CAUSES[attempt.termination_cause] === true);
}

/** A decision the host recorded: its admission or rejection, the GP score, the native Attempt (none when rejected) and the evidence. */
interface Decided {
  readonly kind: "decided";
  readonly decision: string;
  readonly admission: Admission;
  readonly score: number;
  readonly attempt?: AttemptFact;
  readonly verifier: Evidence;
}
/** New verifier evidence for a decision already recorded. */
interface Corrected { readonly kind: "corrected"; readonly decision: string; readonly verifier: Evidence }
type LedgerEvent = Decided | Corrected;

function attemptOf(decision: string, state: AttemptState, outcome?: AttemptOutcome, cause?: TerminationCause): AttemptFact {
  return { attempt_id: `atm-${decision}`, run_id: "run-synthetic", state, ...(outcome ? { outcome } : {}), ...(cause ? { termination_cause: cause } : {}) };
}
function decided(decision: string, admission: Admission, score: number, verifier: Evidence, attempt?: AttemptFact): Decided {
  return { kind: "decided", decision, admission, score, verifier, ...(attempt ? { attempt } : {}) };
}
/** The synthetic journal every ledger is judged over. */
const JOURNAL: readonly LedgerEvent[] = [
  decided("verified", "admission", 0.61, "passed", attemptOf("verified", "succeeded", "success", "natural_exit")),
  decided("rejected", "rejection", 0.22, "none"),
  decided("refuted", "admission", 0.58, "failed", attemptOf("refuted", "succeeded", "success", "natural_exit")),
  decided("awaiting", "admission", 0.47, "running", attemptOf("awaiting", "running")),
  decided("stopped", "admission", 0.39, "none", attemptOf("stopped", "cancelled", "cancelled", "operator_stop")),
  decided("terminated", "admission", 0.53, "passed", attemptOf("terminated", "failed", "infrastructure_failure", "external_termination")),
  decided("lost", "admission", 0.44, "none", attemptOf("lost", "needs_reconciliation", undefined, "process_identity_lost")),
  decided("timed-out", "admission", 0.35, "failed", attemptOf("timed-out", "timed_out", "timeout", "timeout_escalation")),
  { kind: "corrected", decision: "refuted", verifier: "passed" },
  { kind: "corrected", decision: "lost", verifier: "failed" },
  { kind: "corrected", decision: "stopped", verifier: "passed" },
];

/** A receipt ledger as the armed contract reads one: record each journal event, read the rows it holds. */
interface ReceiptLedger {
  record(event: LedgerEvent): void;
  rows(): readonly unknown[];
}
/** A src module that records GP decision receipts, with the ledger it opens. */
interface ReceiptSite {
  readonly module: string;
  readonly open: () => ReceiptLedger;
}
/** The registry: every src module spelling the vocabulary is exactly one entry. Empty today. */
const RECEIPT_SITES: readonly ReceiptSite[] = [];

const CHECKS = ["one-row", "attempt-ref", "verifier-field", "killed-never-success", "unknown-never-negative", "corrections-append", "no-causation"] as const;
type Check = (typeof CHECKS)[number];
/** Each Acceptance clause's one check, by row. */
const CHECK_OF: Readonly<Record<string, Check>> = {
  A1: "one-row", A2: "attempt-ref", A3: "verifier-field", A4: "killed-never-success", A5: "unknown-never-negative", A6: "corrections-append", A7: "no-causation",
};

type Row = Record<string, unknown>;
const isObject = (value: unknown): value is Row => typeof value === "object" && value !== null && !Array.isArray(value);
const member = (row: unknown, key: string): unknown => (isObject(row) && Object.hasOwn(row, key) ? row[key] : undefined);
const isCorrection = (row: unknown): boolean => isObject(row) && Object.hasOwn(row, "corrects");

/** The ways a ledger departs from the reference: each mutant is one, and the residual plants are the rest. */
type Twist =
  | "duplicate" | "drop-rejection" | "boolean-admission" | "fabricated-ref" | "run-ref" | "boolean-verifier" | "native-outcome"
  | "rejection-as-failure" | "killed-pass" | "terminal-success" | "killed-failure" | "unknown-failure" | "mark-original"
  | "wrong-link" | "edit-in-place" | "caused-by" | "causation-relation" | "phantom-success" | "phantom-rejection" | "phantom-pending"
  | "phantom-elsewhere" | "phantom-unlinked" | "phantom-admission" | "phantom-killed" | "negative-reward" | "negative-feedback" | "correction-ref"
  | "correction-admission" | "credit" | "led-to" | "second-record" | "penalty" | "bad-feedback" | "string-reward" | "negative-flag"
  | "feedback-false" | "nested-negative" | "result-success" | "stop-by-score" | "nested-termination";
interface Mutant { readonly twist: Twist; readonly refusedBy: readonly Check[] }
const MUTANTS: readonly Mutant[] = [
  { twist: "duplicate", refusedBy: ["one-row"] },
  { twist: "drop-rejection", refusedBy: ["one-row"] },
  { twist: "boolean-admission", refusedBy: ["one-row"] },
  { twist: "correction-admission", refusedBy: ["one-row"] },
  { twist: "fabricated-ref", refusedBy: ["attempt-ref"] },
  { twist: "run-ref", refusedBy: ["attempt-ref"] },
  { twist: "correction-ref", refusedBy: ["attempt-ref"] },
  { twist: "boolean-verifier", refusedBy: ["verifier-field"] },
  { twist: "native-outcome", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "rejection-as-failure", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "killed-pass", refusedBy: ["killed-never-success"] },
  { twist: "terminal-success", refusedBy: ["killed-never-success"] },
  { twist: "killed-failure", refusedBy: ["unknown-never-negative"] },
  { twist: "unknown-failure", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "negative-reward", refusedBy: ["unknown-never-negative"] },
  { twist: "negative-feedback", refusedBy: ["unknown-never-negative"] },
  { twist: "mark-original", refusedBy: ["corrections-append"] },
  { twist: "wrong-link", refusedBy: ["corrections-append"] },
  { twist: "edit-in-place", refusedBy: ["verifier-field", "unknown-never-negative", "corrections-append"] },
  { twist: "phantom-success", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-rejection", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-pending", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-elsewhere", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-unlinked", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-admission", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "phantom-killed", refusedBy: ["one-row", "verifier-field", "corrections-append"] },
  { twist: "caused-by", refusedBy: ["no-causation"] },
  { twist: "causation-relation", refusedBy: ["no-causation"] },
];

const TERMINAL_STATES: readonly AttemptState[] = ["succeeded", "failed", "timed_out", "cancelled", "abandoned"];
const NATIVE_FAILURES: readonly AttemptOutcome[] = ["work_failure", "executor_failure", "infrastructure_failure", "protocol_failure"];
/** The verifier outcome a ledger records for one decision on one piece of evidence: the reference's reading, or a twist's. */
function outcomeOf(event: Decided, evidence: Evidence, twist: Twist | undefined): unknown {
  const { attempt } = event;
  if (twist === "boolean-verifier") return evidence === "passed" ? true : evidence === "failed" ? false : null;
  if (twist === "native-outcome") {
    if (attempt === undefined) return "unavailable";
    if (attempt.outcome === undefined) return "pending";
    return attempt.outcome === "success" ? "success" : NATIVE_FAILURES.includes(attempt.outcome) ? "failure" : "unavailable";
  }
  if (twist === "rejection-as-failure" && event.admission === "rejection") return "failure";
  if (evidence === "none") {
    if (twist === "terminal-success" && attempt !== undefined && TERMINAL_STATES.includes(attempt.state)) return "success";
    if (twist === "unknown-failure" && event.admission === "admission") return "failure";
    if (twist === "killed-failure" && killed(attempt)) return "failure";
    return "unavailable";
  }
  // A pass over a killed or externally terminated Attempt is no completed success and no observed failure.
  if (evidence === "passed" && killed(attempt) && twist !== "killed-pass") return "unavailable";
  return READING[evidence];
}
/** The members a twist adds to every row it writes. */
function extraOf(event: Decided, twist: Twist | undefined): Row {
  if (twist === "caused-by") return { causedBy: "score" };
  if (twist === "causation-relation") return { relations: [{ kind: "causation", from: "score", to: "verifierOutcome" }] };
  if (twist === "credit") return { credit: event.score };
  if (twist === "led-to") return { reason: "the score led to this outcome" };
  // Landing 658's two R-CAUSAL-WORDING members (its F3), on the operator-stopped decision's rows: the stop credited to the score
  // beside Furnace's own member, and that member nested under the score member.
  if (twist === "stop-by-score" && event.attempt?.termination_cause === "operator_stop") return { termination_cause: "operator_stop", by: "score" };
  if (twist === "nested-termination" && event.attempt?.termination_cause === "operator_stop") return { score: { termination_cause: "operator_stop" } };
  if (twist === "second-record" && event.attempt !== undefined) return { attempt: { ...event.attempt } };
  if (twist === "result-success" && killed(event.attempt)) return { result: "success" };
  return {};
}
/**
 * The phantom twists (the gate's G1a to G1e and G5a, refusal #1 on cut #1, and phantom-killed): each writes, at the decided
 * event of decision `at`, one correction row for `decision` that no corrected event names at that step, built from the five
 * contract members only. phantom-killed's decision is killed, so verifier-field sees it through the row's writer alone.
 */
interface Phantom {
  readonly at: string;
  readonly decision: string;
  readonly verifierOutcome: VerifierOutcome;
  readonly link: "original" | "null";
  readonly admission?: Admission;
}
const PHANTOMS: Readonly<Partial<Record<Twist, Phantom>>> = {
  "phantom-success": { at: "awaiting", decision: "awaiting", verifierOutcome: "success", link: "original" },
  "phantom-rejection": { at: "rejected", decision: "rejected", verifierOutcome: "success", link: "original" },
  "phantom-pending": { at: "verified", decision: "verified", verifierOutcome: "pending", link: "original" },
  "phantom-elsewhere": { at: "lost", decision: "awaiting", verifierOutcome: "unavailable", link: "original" },
  "phantom-unlinked": { at: "awaiting", decision: "awaiting", verifierOutcome: "success", link: "null" },
  "phantom-admission": { at: "rejected", decision: "rejected", verifierOutcome: "unavailable", link: "original", admission: "admission" },
  "phantom-killed": { at: "stopped", decision: "stopped", verifierOutcome: "unavailable", link: "original" },
};
/** Evidence the verifier has not given (none yet, or still running): the rows a feedback twist marks. */
const UNKNOWN_EVIDENCE: readonly Evidence[] = ["none", "running"];
/** The members a feedback twist (the gate's G2a and G2b) or an R-NEGATIVE-SIGNAL plant (G2c to G2e of refusal #2 among them) adds to an original row of unknown evidence. */
function feedbackTwist(twist: Twist | undefined): Row {
  if (twist === "negative-reward") return { reward: -1 };
  if (twist === "negative-feedback") return { feedback: "negative" };
  if (twist === "penalty") return { penalty: -1 };
  if (twist === "bad-feedback") return { feedback: "bad" };
  if (twist === "string-reward") return { reward: "-1" };
  if (twist === "negative-flag") return { negativeFeedback: true };
  if (twist === "feedback-false") return { feedback: false };
  if (twist === "nested-negative") return { feedback: { negative: true } };
  return {};
}
/** The reference ledger (twist undefined), or a mutant or residual plant of it. */
function reference(twist?: Twist): ReceiptLedger {
  const rows: Row[] = [];
  const cases = new Map<string, Decided>();
  return {
    record(event) {
      if (event.kind === "decided") {
        cases.set(event.decision, event);
        if (twist === "drop-rejection" && event.admission === "rejection") return;
        const attemptRef = twist === "fabricated-ref" && event.attempt === undefined ? event.decision
          : twist === "run-ref" && event.attempt !== undefined ? event.attempt.run_id : (event.attempt?.attempt_id ?? null);
        const row: Row = {
          decision: event.decision, admission: twist === "boolean-admission" ? event.admission === "admission" : event.admission, attemptRef,
          verifierOutcome: outcomeOf(event, event.verifier, twist), score: event.score, ...extraOf(event, twist),
          ...(UNKNOWN_EVIDENCE.includes(event.verifier) ? feedbackTwist(twist) : {}),
        };
        rows.push(row);
        if (twist === "duplicate" && event.admission === "admission") rows.push({ ...row });
        const phantom = twist === undefined ? undefined : PHANTOMS[twist];
        if (phantom !== undefined && phantom.at === event.decision) {
          const original = rows.findIndex(entry => !isCorrection(entry) && entry.decision === phantom.decision) + 1;
          rows.push({
            decision: phantom.decision, corrects: phantom.link === "null" ? null : original, verifierOutcome: phantom.verifierOutcome,
            ...(phantom.admission === undefined ? {} : { admission: phantom.admission }),
          });
        }
        return;
      }
      const decision = cases.get(event.decision);
      if (decision === undefined) return;
      const index = rows.findIndex(row => !isCorrection(row) && row.decision === event.decision);
      const verifierOutcome = outcomeOf(decision, event.verifier, twist);
      if (twist === "edit-in-place") {
        rows[index] = { ...rows[index], verifierOutcome };
        return;
      }
      if (twist === "mark-original") rows[index] = { ...rows[index], superseded: true };
      rows.push({
        decision: event.decision, corrects: twist === "wrong-link" ? index : index + 1, verifierOutcome, ...extraOf(decision, twist),
        ...(twist === "correction-ref" ? { attemptRef: "atm-verified" } : {}),
        ...(twist === "correction-admission" ? { admission: "rejection" } : {}),
      });
    },
    rows: () => rows,
  };
}

/** What one ledger left: the rows (as JSON) after every journal event, and the final rows. */
interface Run {
  readonly snapshots: readonly (readonly string[])[];
  readonly rows: readonly unknown[];
}
const parsed = (texts: readonly string[]): unknown[] => texts.map((text): unknown => JSON.parse(text));
function run(open: () => ReceiptLedger, journal: readonly LedgerEvent[] = JOURNAL): Run {
  const ledger = consult("ledger", open());
  const snapshots: string[][] = [];
  for (const event of journal) {
    ledger.record(event);
    snapshots.push(ledger.rows().map(row => JSON.stringify(row === undefined ? null : row) ?? "null"));
  }
  return { snapshots, rows: parsed(snapshots.at(-1) ?? []) };
}
/** The installed SDK's union naming why an Attempt ended (row T2 holds KILLED_CAUSES to it). */
const TERMINATION_CAUSE = "TerminationCause";
/**
 * Furnace's own Attempt member naming why an Attempt ended (the AttemptDto's termination_cause): a member whose name is exactly
 * that member's words, in any case or separator spelling the word reader reads, holding one member of the installed SDK's
 * TerminationCause (the keys of KILLED_CAUSES, which row T2 holds to the SDK union). Its NAME is then no causation claim; held
 * anything else (a score, an object, another word), the name reads like any other. What it holds is always read like any other
 * value (no TerminationCause member carries the stem).
 */
const isTerminationMember = (key: string, held: unknown): boolean =>
  isDeepStrictEqual(words(key), words("termination_cause")) && typeof held === "string" && Object.hasOwn(KILLED_CAUSES, held);
/** Whether a text holds a word carrying the causation stem. */
const carriesStem = (text: string): boolean => words(text).some(word => word.includes("caus"));
/** Every member name (but the termination member's own) and every string value, at any depth of a row, that carries the causation stem. */
function causal(value: unknown, path: string): string[] {
  if (typeof value === "string") return carriesStem(value) ? [`${path} value`] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => causal(item, `${path}/${index}`));
  if (!isObject(value)) return [];
  return Object.keys(value).flatMap(key => [...(!isTerminationMember(key, value[key]) && carriesStem(key) ? [`${path}/${key} name`] : []), ...causal(value[key], `${path}/${key}`)]);
}
/** The README's and the Acceptance's own feedback nouns ("negative reward", "negative feedback"), read as word stems: a member is read for negative feedback when a word of its name starts with one. */
const FEEDBACK_NOUNS: readonly string[] = ["reward", "feedback"];
/** The stems a feedback member's string reads as negative (the Acceptance's "negative", the verifier outcome "failure" and the evidence "failed"). */
const NEGATIVE_STEMS: readonly string[] = ["negativ", "fail"];
const leavesOf = (value: unknown): unknown[] => (Array.isArray(value) ? value.flatMap(leavesOf) : isObject(value) ? Object.values(value).flatMap(leavesOf) : [value]);
/** Every leaf value, at any depth of a row, held under a member whose name's words include a feedback noun. */
function feedbackOf(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(feedbackOf);
  if (!isObject(value)) return [];
  return Object.entries(value).flatMap(([key, inner]) => (words(key).some(word => FEEDBACK_NOUNS.some(noun => word.startsWith(noun))) ? leavesOf(inner) : feedbackOf(inner)));
}
/** Whether a row records negative feedback: a failure verifierOutcome, or a feedback member holding a number below zero or a string with a word on a negative stem. */
function negative(row: unknown): boolean {
  if (member(row, "verifierOutcome") === "failure") return true;
  return feedbackOf(row).some(value => (typeof value === "number" && value < 0) || (typeof value === "string" && words(value).some(word => NEGATIVE_STEMS.some(stem => word.startsWith(stem)))));
}
/** The rows unknown-never-negative's reader is shown: each with whether it records negative feedback. */
const NEGATIVE_CONTROLS: readonly (readonly [Row, boolean])[] = [
  [{ verifierOutcome: "failure" }, true],
  [{ verifierOutcome: "unavailable" }, false],
  [{ reward: -1 }, true],
  [{ feedback: "negative" }, true],
  [{ feedbacks: ["failed"] }, true],
  [{ rewardSignal: { polarity: "negatively" } }, true],
  [{ reward: 0 }, false],
  [{ reward: "-1" }, false],
  [{ feedback: "bad" }, false],
  [{ penalty: -1 }, false],
  [{ meta: { reward: -1 } }, true],
  [{ notes: [{ feedback: "negative" }] }, true],
];
/** The 0-based step whose snapshot first holds each final row: the journal event that appended it (the armed contract's row per event). */
const writersOf = (result: Run): number[] => result.rows.map((_, index) => result.snapshots.findIndex(snapshot => snapshot.length > index));
/** The rows one step appended: its snapshot past the length of the snapshot before it. */
const appendedAt = (result: Run, step: number): unknown[] => parsed((result.snapshots[step] ?? []).slice(step === 0 ? 0 : (result.snapshots[step - 1]?.length ?? 0)));
/** The members no-causation is shown: each with whether it must read the stem. */
const STEM_CONTROLS: readonly (readonly [Row, boolean])[] = [
  [{ causedBy: "score" }, true],
  [{ note: "caused by the score" }, true],
  [{ kind: "causation" }, true],
  [{ because: 1 }, true],
  [{ termination_cause: "operator_stop" }, false],
  [{ terminationCause: "external_termination" }, false],
  [{ note: "termination cause operator_stop; the score caused it" }, true],
  [{ note: "the GP score was the termination cause of this outcome" }, true],
  [{ relations: [{ kind: "termination_cause", from: "score", to: "verifierOutcome" }] }, true],
  [{ scoreTerminationCause: 0.61 }, true],
  [{ termination_cause: "the score caused it" }, true],
  [{ termination_cause: 0.61 }, true],
  [{ terminationCause: { from: "score", to: "verifierOutcome" } }, true],
  [{ termination_cause: "score" }, true],
  [{ TERMINATION_CAUSE: "timeout_escalation" }, false],
];
/** The findings of the seven checks over one ledger's run, each opening with its check. */
function judge(result: Run, journal: readonly LedgerEvent[] = JOURNAL): string[] {
  consult("judge", result);
  const out: string[] = [];
  const cases = new Map<string, Decided>();
  for (const event of journal) if (event.kind === "decided") cases.set(event.decision, event);
  const caseOf = (row: unknown): Decided | undefined => {
    const decision = member(row, "decision");
    return typeof decision === "string" ? cases.get(decision) : undefined;
  };
  const rows = result.rows;
  for (const event of cases.values()) {
    const originals = rows.filter(row => !isCorrection(row) && member(row, "decision") === event.decision);
    if (originals.length !== 1) out.push(`one-row ${event.decision}: ${originals.length} original rows`);
    else if (member(originals[0], "admission") !== event.admission) out.push(`one-row ${event.decision}: admission`);
  }
  for (const row of rows) if (caseOf(row) === undefined) out.push("one-row a row naming no decision");
  for (const row of rows) {
    const event = caseOf(row);
    if (event !== undefined && isCorrection(row) && isObject(row) && Object.hasOwn(row, "admission") && row.admission !== event.admission) {
      out.push(`one-row ${event.decision}: a correction row's admission`);
    }
  }
  for (const [step, event] of journal.entries()) {
    if (event.kind !== "decided") continue;
    const added = appendedAt(result, step);
    if (added.length !== 1 || isCorrection(added[0]) || member(added[0], "decision") !== event.decision) {
      out.push(`one-row step ${step + 1}: decided ${event.decision} appended ${added.length} rows, not its one original row`);
    }
  }
  for (const row of rows) {
    const event = caseOf(row);
    if (event === undefined) continue;
    const ref = event.attempt?.attempt_id ?? null;
    if (isCorrection(row)) {
      if (isObject(row) && Object.hasOwn(row, "attemptRef") && row.attemptRef !== ref) out.push(`attempt-ref ${event.decision}: a correction row's attemptRef`);
    } else if (!isObject(row) || !Object.hasOwn(row, "attemptRef") || row.attemptRef !== ref) out.push(`attempt-ref ${event.decision}`);
  }
  const writers = writersOf(result);
  for (const [index, row] of rows.entries()) {
    const event = caseOf(row);
    if (event === undefined) continue;
    const correction = isCorrection(row);
    const wrote = journal[writers[index] ?? -1];
    const evidence = wrote !== undefined && wrote.decision === event.decision && wrote.kind === (correction ? "corrected" : "decided") ? wrote.verifier : undefined;
    const outcome = member(row, "verifierOutcome");
    const stopped = killed(event.attempt);
    if (!(VERIFIER_OUTCOMES as readonly unknown[]).includes(outcome)) out.push(`verifier-field ${event.decision}: not a verifier outcome`);
    else if (evidence === undefined) out.push(`verifier-field ${event.decision}: a ${correction ? "correction" : "original"} row no ${correction ? "corrected" : "decided"} event of its decision wrote`);
    else if (!stopped && outcome !== READING[evidence]) out.push(`verifier-field ${event.decision}: ${String(outcome)} on ${evidence}`);
    if (stopped && outcome === "success") out.push(`killed-never-success ${event.decision}`);
    if (evidence !== "failed" && negative(row)) out.push(`unknown-never-negative ${event.decision}`);
  }
  for (const [step, event] of journal.entries()) {
    const before = step === 0 ? [] : (result.snapshots[step - 1] ?? []);
    const after = result.snapshots[step] ?? [];
    if (after.length < before.length || before.some((text, index) => after[index] !== text)) out.push(`corrections-append step ${step + 1}: an earlier row changed`);
    const added = parsed(after.slice(before.length));
    if (event.kind !== "corrected") {
      if (added.some(isCorrection)) out.push(`corrections-append step ${step + 1}: a correction row no corrected event wrote`);
      continue;
    }
    const original = parsed(before).findIndex(row => !isCorrection(row) && member(row, "decision") === event.decision) + 1;
    if (added.length !== 1 || member(added[0], "corrects") !== original || member(added[0], "decision") !== event.decision) {
      out.push(`corrections-append ${event.decision}: no single new row naming row ${original}`);
    }
  }
  for (const row of rows) for (const finding of causal(row, "")) out.push(`no-causation ${String(member(row, "decision"))}: ${finding}`);
  return out;
}
const checksOf = (findings: readonly string[]): Check[] => CHECKS.filter(check => findings.some(finding => finding.startsWith(`${check} `)));
const failsOf = (twist?: Twist): Check[] => checksOf(judge(run(() => reference(twist))));

/** The words of a text: split at every non-letter, non-digit character and at camel-case humps, lower-cased. */
function words(text: string): string[] {
  return text.split(/[^\p{L}\p{N}]+/u)
    .flatMap(piece => piece.split(/(?<=[\p{Ll}\p{N}])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})/u))
    .filter(word => word !== "")
    .map(word => word.toLowerCase());
}
/**
 * Whether a text holds a vocabulary member: a run of consecutive words whose concatenation is the member's words joined, so
 * a humped, separated, unhumped or partly joined spelling reads (verifierOutcome, VERIFIER_OUTCOME, verifieroutcome,
 * graphpolicy_cli), and so do pieces joined only by non-letter, non-digit characters; a near token (a longer word) does not.
 */
function spells(text: string, name: string): boolean {
  const joined = words(name).join("");
  const all = words(text);
  for (let start = 0; start < all.length; start++) {
    let built = "";
    for (let end = start; end < all.length; end++) {
      built += all[end];
      if (built === joined) return true;
      if (!joined.startsWith(built)) break;
    }
  }
  return false;
}
const spelled = (text: string): string[] => consult("reader", VOCABULARY.filter(name => spells(text, name)));
const git = (...args: string[]): string => consult("repo", execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
/** git's would-commit listing under src/ (tracked or untracked, never ignored), present files only, sorted. */
function srcFiles(): string[] {
  return git("ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "src").split("\0").filter(file => file !== "" && existsSync(join(ROOT, file))).sort();
}
const headText = (path: string): string => consult("repo", readFileSync(join(ROOT, path), "utf8"));
const pinText = (path: string): string => git("show", `${PI_PIN}:${path}`);
const lineOf = (text: string, line: number): string => text.split("\n")[line - 1] ?? "";
/** The type alias declarations named `name` among a TypeScript text's top-level statements, from its parse (a comment or a string never reads as one). */
function aliasesOf(text: string, name: string): { readonly source: ts.SourceFile; readonly aliases: readonly ts.TypeAliasDeclaration[] } {
  const source = ts.createSourceFile("declarations.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return { source, aliases: source.statements.filter((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === name) };
}
/** The members of the one exported string-literal union type alias `name` a text declares; any other shape reads as a marker no union equals. */
function unionOf(text: string, name: string): string[] {
  const { aliases } = aliasesOf(text, name);
  const alias = aliases[0];
  if (aliases.length !== 1 || alias === undefined) return [`<${aliases.length} declarations of ${name}>`];
  if ((ts.getCombinedModifierFlags(alias) & ts.ModifierFlags.Export) === 0) return [`<${name} is not exported>`];
  const parts = ts.isUnionTypeNode(alias.type) ? alias.type.types : [alias.type];
  return parts.map(part => (ts.isLiteralTypeNode(part) && ts.isStringLiteral(part.literal) ? part.literal.text : `<${ts.SyntaxKind[part.kind]}>`));
}
const protocolText = (): string => consult("sdk", readFileSync(join(dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json")), PROTOCOL), "utf8"));
/** A union declaration read from its parse: the line its one declaration starts on (0 unless exactly one), and its members. */
function declared(text: string, name: string): { readonly line: number; readonly members: readonly string[] } {
  const { source, aliases } = aliasesOf(text, name);
  const alias = aliases[0];
  const line = aliases.length === 1 && alias !== undefined ? source.getLineAndCharacterOfPosition(alias.getStart(source)).line + 1 : 0;
  return { line, members: unionOf(text, name) };
}
/** The three KILLED tables, by the SDK union each is keyed by. */
interface KilledTables {
  readonly causes: Readonly<Record<string, boolean>>;
  readonly states: Readonly<Record<string, boolean>>;
  readonly outcomes: Readonly<Record<string, boolean>>;
}
const KILLED: KilledTables = { causes: KILLED_CAUSES, states: KILLED_STATES, outcomes: KILLED_OUTCOMES };
/** T2's anchor for the KILLED tables: each is keyed by exactly the installed SDK union's members (its values' one outside anchor is row A4's, namedUnkilled). */
function tablesAnchored(tables: KilledTables): { readonly causes: boolean; readonly states: boolean; readonly outcomes: boolean } {
  const declarations = protocolText();
  const sorted = (values: readonly string[]): string[] => [...values].sort();
  return {
    causes: isDeepStrictEqual(sorted(Object.keys(tables.causes)), sorted(unionOf(declarations, TERMINATION_CAUSE))),
    states: isDeepStrictEqual(sorted(Object.keys(tables.states)), sorted(unionOf(declarations, "AttemptState"))),
    outcomes: isDeepStrictEqual(sorted(Object.keys(tables.outcomes)), sorted(unionOf(declarations, "AttemptOutcome"))),
  };
}
/** Whether two words share a stem: the shorter, its last three letters dropped but at least four kept, opens the longer (so external reads externally and termination reads terminated; a word under four letters shares none). */
function sameStem(left: string, right: string): boolean {
  const [short, long] = left.length <= right.length ? [left, right] : [right, left];
  return short.length >= 4 && long.startsWith(short.slice(0, Math.max(4, short.length - 3)));
}
/** The installed SDK's TerminationCause members a clause names: each word of the member's name shares a stem with a word of the clause. */
function causesNamed(clause: string): string[] {
  const said = words(clause);
  return unionOf(protocolText(), TERMINATION_CAUSE).filter(cause => words(cause).every(part => said.some(word => sameStem(part, word))));
}
/** The clauses the cause reader is shown: each with the TerminationCause members it must name. */
const CAUSE_CONTROLS: readonly (readonly [string, readonly string[]])[] = [
  ["a killed or externally terminated Attempt", ["external_termination"]],
  ["an Attempt its operator stopped", ["operator_stop"]],
  ["an Attempt that exited naturally", ["natural_exit"]],
  ["a timeout escalated", ["timeout_escalation"]],
  ["a process whose identity was lost", ["process_identity_lost"]],
  ["an external timeout", []],
  ["a killed Attempt", []],
  ["an Attempt terminated by its operator", []],
];
/** Row A4's clause as the bead's own row states it: the Acceptance clause in the place of the row whose check is killed-never-success. */
const killClauseOf = (filing: Filing): string => filing.clauses[ROWS.filter(row => /^A\d$/.test(row.id)).findIndex(row => CHECK_OF[row.id] === "killed-never-success")] ?? "";
/** Row A4's outside anchor for the KILLED tables (landing 658's F2): the TerminationCause members its clause names that do not read as a kill (none while it holds). */
const namedUnkilled = (tables: KilledTables, clause: string): string[] => causesNamed(clause).filter(cause => tables.causes[cause] !== true);
/** Every kill reading of the KILLED tables, as table:member (row Q7's R-KILL-VALUES family hollows each one). */
const KILL_READINGS: readonly (readonly [keyof KilledTables, string])[] = (["causes", "states", "outcomes"] as const).flatMap(table =>
  Object.entries(KILLED[table]).filter(([, value]) => value).map(([key]): readonly [keyof KilledTables, string] => [table, key]));

/** Every reading of the KILLED tables that is no kill, as table:member (row Q7's addition members make each one a kill). */
const NON_KILL_READINGS: readonly (readonly [keyof KilledTables, string])[] = (["causes", "states", "outcomes"] as const).flatMap(table =>
  Object.entries(KILLED[table]).filter(([, value]) => !value).map(([key]): readonly [keyof KilledTables, string] => [table, key]));

/**
 * S1b's in-memory plants over the HEAD control core (the gate's S1 and S1x of refusal #1 on cut #1, and a string restatement):
 * each leaves a declaration that gains a fifth member, which the census must read.
 */
const CONTROL_DECLARATION = 'export type ControlOutcome = "completed" | "failed" | "cancelled" | "unknown";';
const WIDENED_DECLARATION = 'export type ControlOutcome = "completed" | "failed" | "cancelled" | "unknown" | "partial";';
/** A text with one exact span replaced; a plant whose span is gone throws, so a drifted plant reds its pin rather than passing unplanted. */
function once(text: string, from: string, to: string): string {
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`plant span occurs ${count} times, not once: ${from}`);
  return text.replace(from, () => to);
}
/** T2's in-memory plants over the SDK declaration text: a comment or a string restating TerminationCause with one member above its declaration. */
const SDK_DECLARATION = "export type TerminationCause = ";
const SDK_PLANTS: readonly (readonly [string, (text: string) => string])[] = [
  ["a comment restating the union with one member above its declaration", text => once(text, SDK_DECLARATION, `// ${SDK_DECLARATION}"natural_exit";\n${SDK_DECLARATION}`)],
  ["a string restating the union with one member above its declaration", text => once(text, SDK_DECLARATION, `export declare const RESTATED = '${SDK_DECLARATION}"natural_exit";';\n${SDK_DECLARATION}`)],
];
const CONTROL_PLANTS: readonly (readonly [string, (text: string) => string])[] = [
  ["a comment restating the union above a declaration that gains a member", text => once(text, CONTROL_DECLARATION, `// ${CONTROL_DECLARATION}\n${WIDENED_DECLARATION}`)],
  ["the declaration gains a member", text => once(text, CONTROL_DECLARATION, WIDENED_DECLARATION)],
  ["a string restating the union above a declaration that gains a member", text => once(text, CONTROL_DECLARATION, `export const RESTATED = '${CONTROL_DECLARATION}';\n${WIDENED_DECLARATION}`)],
];

/** A docs anchor of rows S2 and S3: the filing's docs line at the pin, the page's title and section heading, and the item carrying it. */
interface DocsAnchor {
  readonly id: string;
  readonly path: string;
  readonly title: string;
  readonly heading: string;
  readonly line: number;
  readonly sentence: string;
  readonly carrier: string;
}
const DOCS_ANCHORS: readonly DocsAnchor[] = [
  {
    id: "06:28", path: REGISTRY_DOC, title: "06 — Capability registry, typed node providers and agent tools", heading: "Proposed capability descriptor", line: 28,
    sentence: "rich producer status must not be flattened into a boolean",
    carrier: 'This contract is workbench-facing. Native output remains recoverable as an original native object/result reference where serializable, and rich producer status must not be flattened into a boolean. The "effectClass" is a conservative routing hint, not an exactly-once guarantee.',
  },
  {
    id: "09:91", path: OBSERVATION_DOC, title: "09 — Observation, telemetry, provenance and derived graph", heading: "Acceptance/negative controls", line: 91,
    sentence: "no fabricated dependency edge", carrier: "Simulated missing relation; no fabricated dependency edge or precise critical path.",
  },
  {
    id: "08:38", path: LIFECYCLE_DOC, title: "08 — Execution identity, lifecycle, side effects, replay and recovery", heading: "Cancellation and ownership", line: 38,
    sentence: "Causality != ownership",
    carrier: "Track distinct relationships: caused-by, depends-on, observed-by, lifecycle-owned-by, charged-to. Causality != ownership. Multi-reader shared child MUST NOT be stopped merely because one reader closed Pi or stopped waiting. Child cancellation depends on explicit native owner rights and native API semantics.",
  },
];
const S06 = "rich producer status must not be flattened into a boolean";
/** The in-memory docs plants (the gate's D1 to D5 of refusal #1 on cut #1, D4 split by page, D6 to D9, and D10 a markup-only edit, landing 658's gate P-W3 shape): each must leave its anchor unheld; D10's carrier change is read by carrierChange. */
const DOCS_PLANTS: readonly { readonly id: string; readonly anchor: string; readonly apply: (text: string) => string }[] = [
  { id: "D1", anchor: "06:28", apply: text => once(text, `${S06}.`, `<!-- ${S06}. -->`) },
  { id: "D2", anchor: "06:28", apply: text => once(text, `and ${S06}.`, `and the former rule that ${S06} is withdrawn; producers may flatten status to a boolean.`) },
  { id: "D3", anchor: "06:28", apply: text => `${once(text, `, and ${S06}.`, ".").trimEnd()}\n\n\`\`\`text\n${S06}\n\`\`\`\n` },
  { id: "D6", anchor: "06:28", apply: text => once(text, "not an exactly-once guarantee.", "not an exactly-once guarantee.\n\nThe flattening rule above is withdrawn: producers may flatten status to a boolean.") },
  { id: "D10", anchor: "06:28", apply: text => once(text, "This contract is **workbench-facing**.", "This contract is __workbench-facing__.") },
  { id: "D4-09", anchor: "09:91", apply: text => once(text, "no fabricated dependency edge or precise critical path.", "<!-- no fabricated dependency edge or precise critical path. -->") },
  { id: "D7", anchor: "09:91", apply: text => `${text.trimEnd()}\n\n## Acceptance/negative controls\n\n1. Simulated missing relation; no fabricated dependency edge or precise critical path.\n` },
  { id: "D9", anchor: "09:91", apply: text => once(text, "not full-fold in render.", "not full-fold in render.\n10. A missing relation may be filled with a fabricated dependency edge.") },
  { id: "D4-08", anchor: "08:38", apply: text => once(text, "Causality != ownership.", "<!-- Causality != ownership. -->") },
  { id: "D5", anchor: "08:38", apply: text => once(text, "Causality != ownership.", 'The old note "Causality != ownership" no longer holds: a cause owns its effect.') },
  { id: "D8", anchor: "08:38", apply: text => once(text, "## Cancellation and ownership", "# Appendix (non-normative, superseded drafts)\n\n## Cancellation and ownership") },
];
/**
 * The in-memory whitespace plants (landing 658's gate P-W1 and P-W2 shapes, its F1): each changes only what the rendered blocks
 * do not carry (a soft line break inside a paragraph, a blank line between blocks), so each must leave its anchor held; W2 and
 * W3 move their carrier a line down, which no HEAD verdict sees (it reads blocks, never lines), and plantedChange reads that
 * each plant changes the text at all (landing 706's F1).
 */
const WHITESPACE_PLANTS: readonly { readonly id: string; readonly anchor: string; readonly apply: (text: string) => string }[] = [
  { id: "W1", anchor: "06:28", apply: text => once(text, "where serializable, and rich producer status", "where serializable,\nand rich producer status") },
  { id: "W2", anchor: "09:91", apply: text => once(text, "## Acceptance/negative controls\n", "## Acceptance/negative controls\n\n") },
  { id: "W3", anchor: "08:38", apply: text => once(text, "## Cancellation and ownership\n", "## Cancellation and ownership\n\n") },
];
const anchorOf = (id: string): DocsAnchor => {
  const anchor = DOCS_ANCHORS.find(entry => entry.id === id);
  if (anchor === undefined) throw new Error(`no docs anchor ${id}`);
  return anchor;
};
/** The items of a rendered section a reader sees as prose: each paragraph, and each item of each list (a code block or an HTML block carries none). */
const proseOf = (blocks: readonly RenderedBlock[]): readonly { readonly text: string; readonly markdown: string }[] =>
  blocks.flatMap(block => (block.kind === "paragraph" ? [{ text: block.text, markdown: block.markdown }] : block.kind === "list" ? block.items : []));
/** A paragraph's or a list item's source line, its list marker dropped. */
const sourceOf = (line: string): string => line.trim().replace(/^(?:\d+[.)]|[-*+])\s+/, "");
/**
 * One docs anchor read in the rendered view (docsSection from test/helpers/census.ts: the heading unique in the rendered view,
 * under the page title, the section bounded at the next level-1/2 heading). At the pin (no pin text given): the section is
 * bound and carries no HTML, exactly one of its prose items carries the sentence, that item reads exactly the anchor's carrier,
 * and the filing's line is that item's source. At HEAD: the same, and the section equals the pin's section block for block
 * (sectionMatches, read in the same view at both).
 */
function anchorVerdict(text: string, anchor: DocsAnchor, pin?: string): string {
  const section = docsSection(text, anchor.heading, 2, [anchor.title]);
  if (!section.ok) return section.why;
  if (section.hasHtml) return "the section carries HTML";
  const carriers = proseOf(section.blocks).filter(item => item.text.includes(anchor.sentence));
  const carrier = carriers[0];
  if (carriers.length !== 1 || carrier === undefined) return `${carriers.length} prose items of the section carry the sentence`;
  if (carrier.text !== anchor.carrier) return `the carrier reads ${JSON.stringify(carrier.text)}`;
  if (pin === undefined) return sourceOf(lineOf(text, anchor.line)) === carrier.markdown ? "holds" : `line ${anchor.line} is not the carrier's source`;
  const verdict = sectionMatches(section, docsSection(pin, anchor.heading, 2, [anchor.title]).blocks);
  return verdict.ok ? "holds" : verdict.why;
}
/** The 1-based number of the first line of a text, at or after line from, that holds; 0 when no such line does. */
function lineWhere(text: string, from: number, holds: (line: string) => boolean): number {
  const lines = text.split("\n");
  for (let index = Math.max(from, 1) - 1; index < lines.length; index += 1) if (holds(lines[index] ?? "")) return index + 1;
  return 0;
}
/**
 * A whitespace plant's planted change, read in the Q3/Q10 planted form so a plant that writes nothing reds (landing 706's F1):
 * whether the planted text differs from HEAD's, and by whitespace alone (each whitespace run read as one space); how many lines
 * down the plant moves the section's heading line and the line carrying the anchor's sentence (the first such line from the
 * heading on); and how many blank lines it adds. A re-wrap inside the carrier adds no blank line and a blank line under the
 * heading adds one; each moves the sentence's line one down and leaves the heading's where it was.
 */
interface PlantedChange {
  readonly changed: boolean;
  readonly whitespace: boolean;
  readonly heading: number;
  readonly carrier: number;
  readonly blank: number;
}
function plantedChange(head: string, planted: string, anchor: DocsAnchor): PlantedChange {
  const collapsed = (text: string): string => text.split(/\s+/).join(" ");
  const heading = (text: string): number => lineWhere(text, 1, line => line === `## ${anchor.heading}`);
  const carrier = (text: string): number => lineWhere(text, heading(text), line => line.includes(anchor.sentence));
  const blanks = (text: string): number => text.split("\n").filter(line => line.trim() === "").length;
  return {
    changed: planted !== head, whitespace: collapsed(planted) === collapsed(head),
    heading: heading(planted) - heading(head), carrier: carrier(planted) - carrier(head), blank: blanks(planted) - blanks(head),
  };
}
/** A verdict's lead: its text before the first colon (sectionMatches' "block N differs", ahead of the two blocks it compares). */
const leadOf = (verdict: string): string => verdict.split(":", 1)[0] ?? verdict;
/**
 * A docs plant read for what it does to its anchor's carrier (landing 706's F2: D10's reading pinned beyond the boolean): the
 * lead of its HEAD verdict; the 1-based number of the planted section's block holding the one prose item that carries the
 * sentence (0 when not exactly one item does); and whether that item still reads the anchor's carrier text, and still HEAD's
 * carrier markdown. D10, a markup-only edit, keeps the text and changes the markdown, and its verdict is the section's block
 * comparison failing at the carrier's own block, never a carrier-text why.
 */
function carrierChange(id: string): { readonly lead: string; readonly block: number; readonly text: boolean; readonly markdown: boolean } {
  const plant = DOCS_PLANTS.find(entry => entry.id === id);
  if (plant === undefined) throw new Error(`no docs plant ${id}`);
  const anchor = anchorOf(plant.anchor);
  const head = headText(anchor.path);
  const planted = plant.apply(head);
  const carrierIn = (text: string): { readonly block: number; readonly text?: string; readonly markdown?: string } => {
    const carrying = docsSection(text, anchor.heading, 2, [anchor.title]).blocks.flatMap((block, index) =>
      proseOf([block])
        .filter(item => item.text.includes(anchor.sentence))
        .map(item => ({ block: index + 1, text: item.text, markdown: item.markdown })),
    );
    const only = carrying[0];
    return carrying.length === 1 && only !== undefined ? only : { block: 0 };
  };
  const before = carrierIn(head);
  const after = carrierIn(planted);
  return {
    lead: leadOf(anchorVerdict(planted, anchor, pinText(anchor.path))),
    block: after.block,
    text: after.text === anchor.carrier,
    markdown: after.markdown !== undefined && after.markdown === before.markdown,
  };
}
/**
 * One docs anchor read at the pin and at HEAD, every in-memory docs and whitespace plant of it read at HEAD (true: the plant
 * left the anchor held), and each whitespace plant's planted change.
 */
function anchorWitness(id: string): {
  readonly pin: string;
  readonly head: string;
  readonly controls: Readonly<Record<string, boolean>>;
  readonly plants: Readonly<Record<string, boolean>>;
  readonly unseen: Readonly<Record<string, boolean>>;
  readonly planted: Readonly<Record<string, PlantedChange>>;
} {
  const anchor = anchorOf(id);
  const pin = pinText(anchor.path);
  const head = headText(anchor.path);
  const source = lineOf(pin, anchor.line);
  return {
    pin: anchorVerdict(pin, anchor), head: anchorVerdict(head, anchor, pin),
    controls: {
      line: anchorVerdict(pin, { ...anchor, line: anchor.line + 1 }) === "holds",
      carrier: anchorVerdict(pin, { ...anchor, carrier: `${anchor.carrier} (edited)` }) === "holds",
      twice: anchorVerdict(once(pin, `${source}\n`, `${source}\n\n${source}\n`), anchor) === "holds",
    },
    plants: Object.fromEntries(DOCS_PLANTS.filter(plant => plant.anchor === id).map(plant => [plant.id, anchorVerdict(plant.apply(head), anchor, pin) === "holds"])),
    unseen: Object.fromEntries(WHITESPACE_PLANTS.filter(plant => plant.anchor === id).map(plant => [plant.id, anchorVerdict(plant.apply(head), anchor, pin) === "holds"])),
    planted: Object.fromEntries(WHITESPACE_PLANTS.filter(plant => plant.anchor === id).map(plant => [plant.id, plantedChange(head, plant.apply(head), anchor)])),
  };
}

/** The control core, driven for real: a Furnace Run whose lifecycle ownership of its Attempt is native-confirmed, or not. */
const SCOPE: ObservationScope = { workspace: "/workspace/gp-receipt-census", principal: "census" };
const AT = "2026-10-28T00:00:00Z";
const RUN_REF: NativeRef = { provider: "furnace", type: "run", id: "frn-run-synthetic", scope: SCOPE.workspace };
const ATTEMPT_REF: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-synthetic", scope: SCOPE.workspace };
function projectionWith(kind: RelationKind): ObservationProjection {
  consult("control", kind);
  const projection = new ObservationProjection();
  for (const source of [RUN_REF, ATTEMPT_REF]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: RUN_REF, to: ATTEMPT_REF, kind, provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" } });
  return projection;
}
const STOP: NativeControlRequest = {
  scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: ["control:furnace.stop"], target: { ...RUN_REF }, action: "stop",
  params: { confirmed: true }, invocationId: "inv-gp-receipt", requestedAt: "2026-10-28T00:00:01Z",
};
const decide = (kind: RelationKind) => decideControl(STOP, { projection: projectionWith(kind), now: () => "2026-10-28T00:00:02Z" });
/** Settles a permitted stop with one outcome spelling: the recorded outcome, or the refusal's category. */
function settled(outcome: string): string {
  const decision = decide("ownership");
  if (decision.decision !== "permitted") return `denied ${decision.policy}`;
  const ack = acknowledge(decision.receipt, { acknowledgedAt: "2026-10-28T00:00:03Z", nativeAckRef: "frn-req-stop" });
  try {
    return settle(ack, { outcome: outcome as ControlOutcome, nativeResultRef: "frn-req-status", settledAt: "2026-10-28T00:00:04Z" }).outcome;
  } catch (error) {
    return error instanceof CapabilityError ? `refused ${error.category}` : "threw";
  }
}

interface ExportRow { readonly title: string; readonly notes: string }
let exportRow: ExportRow | undefined;
/** The bead's own row in the tracked export (read once per run). */
function beadRow(): ExportRow {
  if (exportRow !== undefined) return consult("repo", exportRow);
  for (const line of headText(EXPORT).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (member(row, "id") !== BEAD) continue;
    exportRow = { title: String(member(row, "title") ?? ""), notes: String(member(row, "notes") ?? "") };
    return exportRow;
  }
  throw new Error(`${BEAD} has no row in ${EXPORT}`);
}
/** A text cut at ", " outside parentheses and braces. */
function clausesOf(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === "(" || char === "{") depth++;
    else if (char === ")" || char === "}") depth--;
    else if (depth === 0 && text.startsWith(", ", index)) {
      parts.push(text.slice(start, index));
      start = index + 2;
    }
  }
  return [...parts, text.slice(start)];
}
interface Filing { readonly anchors: readonly string[]; readonly pin: string; readonly clauses: readonly string[]; readonly trailing: string }
/** The owner filing's two sentences, read from its first notes line opening "Citation: " only. */
function filingOf(notes: string): Filing {
  const line = notes.split("\n").find(text => text.startsWith("Citation: ")) ?? "";
  const anchors = /Standing anchors carried here as acceptance rows: (.+?) @([0-9a-f]{7,40})\. Acceptance: /.exec(line);
  const acceptance = /\. Acceptance: (.+?)\.(?: |$)/.exec(line);
  const clauses = clausesOf(acceptance?.[1] ?? "");
  const last = (clauses.pop() ?? "").replace(/^and /, "");
  const trailing = /\s(\([^()]*\))$/.exec(last);
  return {
    anchors: clausesOf(anchors?.[1] ?? ""), pin: anchors?.[2] ?? "",
    clauses: [...clauses, trailing ? last.slice(0, trailing.index) : last], trailing: trailing?.[1] ?? "",
  };
}

/** A clause's pin split as the filing fixes it: a clause that ends in a parenthetical is pinned as the clause before it and that parenthetical. */
function filingSplit(clause: string): readonly string[] | undefined {
  const trailing = /^(.*\S) (\([^()]*\))$/.exec(clause);
  return trailing?.[1] === undefined || trailing[2] === undefined ? undefined : [trailing[1], trailing[2]];
}
/** The rows whose clause the filing splits (rows A1 to A7 by the Acceptance's clauses, rows S1 to S4 by the anchors'), each with its split. */
function filingSplits(filing: Filing, rows: readonly JudgedRow[] = ROWS): Record<string, readonly string[]> {
  const of = (pattern: RegExp, clauses: readonly string[]): (readonly [string, readonly string[]])[] =>
    rows.filter(row => pattern.test(row.id)).flatMap((row, index) => {
      const split = filingSplit(clauses[index] ?? "");
      return split === undefined ? [] : [[row.id, split] as const];
    });
  return Object.fromEntries([...of(/^A\d$/, filing.clauses), ...of(/^S\d$/, filing.anchors)]);
}
/** A pin partition of the judged rows: the rows with their pins, and each pin's quote. */
interface Partition { readonly rows: readonly JudgedRow[]; readonly quotes: Readonly<Record<string, string>> }
/** What the outside anchors read of a pin partition: each row but Q whose pin quotes, joined, are not its label, and each row whose pins do not quote the filing's split of its clause. */
function partitionFindings(filing: Filing, partition: Partition): string[] {
  const out: string[] = [];
  const splits = filingSplits(filing, partition.rows);
  for (const row of partition.rows.filter(entry => entry.id !== "Q")) {
    const quoted = row.pins.map(pin => partition.quotes[pin] ?? "");
    if (quoted.join(" ") !== row.label) out.push(`row ${row.id}: its pin quotes, joined, are not its label`);
    const split = splits[row.id];
    if (split !== undefined && !isDeepStrictEqual(quoted, split)) out.push(`row ${row.id}: its pins do not quote the filing's split of its clause`);
  }
  return out;
}
interface JudgedRow { readonly id: string; readonly label: string; readonly pins: readonly string[] }
const ROWS: readonly JudgedRow[] = [
  { id: "T", label: "When Pi executes a GraphPolicyCLI decision through Furnace", pins: ["T1", "T2"] },
  { id: "A1", label: "a receipt test asserts one row per decision with admission|rejection", pins: ["A1a", "A1b"] },
  { id: "A2", label: "the native Attempt ref (or none)", pins: ["A2a", "A2b"] },
  { id: "A3", label: "verifierOutcome in {failure, pending, unavailable, success} as a field distinct from the decision", pins: ["A3a", "A3b"] },
  { id: "A4", label: "a killed or externally terminated Attempt never recorded success", pins: ["A4a", "A4b"] },
  { id: "A5", label: "an unknown outcome never recorded as negative feedback", pins: ["A5a", "A5b"] },
  { id: "A6", label: "corrections appended as new rows with the original untouched", pins: ["A6a", "A6b"] },
  { id: "A7", label: "no causation relation stated between a GP score and a later outcome", pins: ["A7a", "A7b"] },
  { id: "S1", label: "ControlOutcome keeps completed/failed/cancelled/unknown distinct (src/workbench/control.ts:53)", pins: ["S1a", "S1b"] },
  { id: "S2", label: "rich producer status is never flattened to a boolean (docs/workbench/06:28)", pins: ["S2a", "S2b"] },
  { id: "S3", label: "no fabricated edge and causality != ownership (docs/workbench/09:91, 08:38)", pins: ["S3a", "S3b"] },
  { id: "S4", label: "append-only correction precedent (wb-lrz.3 TRACEABILITY correction row)", pins: ["S4a", "S4b"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"] },
];
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi executes a GraphPolicyCLI decision", T2: "through Furnace",
  A1a: "a receipt test asserts one row per decision", A1b: "with admission|rejection",
  A2a: "the native Attempt ref", A2b: "(or none)",
  A3a: "verifierOutcome in {failure, pending, unavailable, success}", A3b: "as a field distinct from the decision",
  A4a: "a killed or externally terminated Attempt", A4b: "never recorded success",
  A5a: "an unknown outcome", A5b: "never recorded as negative feedback",
  A6a: "corrections appended as new rows", A6b: "with the original untouched",
  A7a: "no causation relation stated", A7b: "between a GP score and a later outcome",
  S1a: "ControlOutcome keeps completed/failed/cancelled/unknown distinct", S1b: "(src/workbench/control.ts:53)",
  S2a: "rich producer status is never flattened to a boolean", S2b: "(docs/workbench/06:28)",
  S3a: "no fabricated edge and causality != ownership", S3b: "(docs/workbench/09:91, 08:38)",
  S4a: "append-only correction precedent", S4b: "(wb-lrz.3 TRACEABILITY correction row)",
  Q1: "R-SPELLING", Q2: "R-SIDE-RECORD", Q3: "R-CAUSAL-WORDING", Q4: "R-SECOND-RECORD", Q5: "R-KILL-READING",
  Q6: "R-NEGATIVE-SIGNAL", Q7: "R-KILL-VALUES", Q8: "R-WITNESS-SWAP", Q9: "R-PIN-PARTITION", Q10: "R-SUCCESS-ELSEWHERE",
};
interface Residual { readonly id: string; readonly name: string; readonly members: readonly string[] }
const RESIDUALS: readonly Residual[] = [
  {
    id: "Q1", name: "R-SPELLING",
    members: ["a member composed at run time from pieces with other words between them", "a member spelled with escapes", "the shortened name GraphPolicy", "the word gp",
      "a member built from character codes", "a member with a homoglyph letter", "a member in full-width letters", "a member encoded in base64",
      "a member encoded in rot13", "a member reversed at run time", "the expanded name GraphPolicyCommandLineInterface"],
  },
  { id: "Q2", name: "R-SIDE-RECORD", members: ["a receipt kept outside rows()"] },
  {
    id: "Q3", name: "R-CAUSAL-WORDING",
    members: ["a credit member holding the score", "a reason saying the score led to the outcome", "a by member holding the score beside a termination member",
      "a termination member nested under the score member"],
  },
  { id: "Q4", name: "R-SECOND-RECORD", members: ["the Attempt record copied into a row"] },
  { id: "Q5", name: "R-KILL-READING", members: ["an abandoned Attempt", "an Attempt whose process identity was lost"] },
  {
    id: "Q6", name: "R-NEGATIVE-SIGNAL",
    members: ["a negative signal under a member name without a feedback noun", "a feedback member's word on neither negative stem", "a feedback member's number written as a string",
      "a boolean under a member named for negative feedback", "a feedback member's false", "a boolean under a negative-named member of a feedback member"],
  },
  {
    id: "Q7", name: "R-KILL-VALUES",
    members: ["a TerminationCause kill reading removed that row A4's clause does not name", "an AttemptState kill reading removed", "an AttemptOutcome kill reading removed",
      "a TerminationCause reading made a kill", "an AttemptState reading made a kill", "an AttemptOutcome reading made a kill"],
  },
  { id: "Q8", name: "R-WITNESS-SWAP", members: ["a pin body that consults its subjects, then witnesses equal values it did not take from them"] },
  { id: "Q9", name: "R-PIN-PARTITION", members: ["a pin of row T, A1 or A3 to A7 merged into its sibling, its quote re-homed", "the boundary between such a row's two pins moved"] },
  { id: "Q10", name: "R-SUCCESS-ELSEWHERE", members: ["success recorded under a member other than verifierOutcome on a killed Attempt's row"] },
];
/** The census's own partition with one row's two pins merged into its first, which quotes the whole label (the gate's M1 to M7 shape of refusal #2). */
function mergedPins(id: string): Partition {
  const row = ROWS.find(entry => entry.id === id);
  const [first, ...rest] = row?.pins ?? [];
  if (row === undefined || first === undefined) throw new Error(`no row ${id}`);
  return {
    rows: ROWS.map(entry => (entry.id === id ? { ...entry, pins: [first] } : entry)),
    quotes: { ...Object.fromEntries(Object.entries(QUOTES).filter(([pin]) => !rest.includes(pin))), [first]: row.label },
  };
}
/** The census's own partition with the boundary between one row's two pins moved: the first pin's last word opens the second's quote (the gate's M8 shape of refusal #2); a row without two pins, or whose first quote is one word, is left as it is. */
function movedBoundary(id: string): Partition {
  const [first, second] = ROWS.find(entry => entry.id === id)?.pins ?? [];
  const head = (first === undefined ? undefined : QUOTES[first])?.split(" ") ?? [];
  const tail = second === undefined ? undefined : QUOTES[second];
  if (first === undefined || second === undefined || tail === undefined || head.length < 2) return { rows: ROWS, quotes: QUOTES };
  return { rows: ROWS, quotes: { ...QUOTES, [first]: head.slice(0, -1).join(" "), [second]: `${head.at(-1) ?? ""} ${tail}` } };
}
/** The findings a variant partition adds to the outside anchors' reading of the census's own (what a merge or a move changes, whatever the own reading holds). */
const addedFindings = (filing: Filing, variant: Partition): string[] => {
  const own = partitionFindings(filing, { rows: ROWS, quotes: QUOTES });
  return partitionFindings(filing, variant).filter(finding => !own.includes(finding));
};
/** Q6's plants: one per R-NEGATIVE-SIGNAL member, each a twist read as nothing. */
const SIGNAL_PLANTS: readonly Twist[] = ["penalty", "bad-feedback", "string-reward", "negative-flag", "feedback-false", "nested-negative"];
/** The texts T1's reader is shown: each with the members it must read. */
const READER_CONTROLS: readonly (readonly [string, readonly string[]])[] = [
  ["export const verifierOutcome = 1;", ["verifierOutcome"]],
  ["const VERIFIER_OUTCOME = 2;", ["verifierOutcome"]],
  ["row.verifier_outcome", ["verifierOutcome"]],
  ["a GraphPolicyCLI host", ["GraphPolicyCLI"]],
  ["import('graph-policy-cli')", ["GraphPolicyCLI"]],
  ["export const GRAPHPOLICYCLI_PLANT = 3;", ["GraphPolicyCLI"]],
  ['const plant = "graphpolicycli verifieroutcome";', ["GraphPolicyCLI", "verifierOutcome"]],
  ["row.graphpolicy_cli", ["GraphPolicyCLI"]],
  ['const name = "verif" + "ierOutcome";', ["verifierOutcome"]],
  ["verifierOutcomes", []],
  ["preverifierOutcome", []],
  ["GraphPolicyCLIs", []],
  ["graph policies", []],
  ["verifieroutcomes", []],
  ["graphpolicyclient", []],
];
/** A Cyrillic small o, built from its code point (refusal #2's homoglyph spelling). */
const HOMOGLYPH_O = String.fromCodePoint(0x043e);
/** A text in full-width letters, each built from its code point (refusal #2's full-width spelling). */
const fullWidth = (text: string): string => [...text].map(char => String.fromCodePoint((char.codePointAt(0) ?? 0) + 0xfee0)).join("");
/** A text with every character past ASCII written as its code point, the frozen literal's view of a plant. */
const ascii = (text: string): string =>
  [...text].map(char => ((char.codePointAt(0) ?? 0) > 0x7e ? `<U+${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}>` : char)).join("");
/** Q1's plants: one per R-SPELLING member, each read as nothing (after the first four, refusal #2's four F5 spellings, then landing 658's three, its F3). */
const SPELLING_PLANTS: readonly string[] = [
  'const tail = "ierOutcome"; const name = "verif" + tail;',
  'const name = "verifier\\u004Futcome";',
  "export const GraphPolicy = 1;",
  "const gp = load();",
  "const name = String.fromCharCode(118, 101, 114, 105, 102, 105, 101, 114, 79, 117, 116, 99, 111, 109, 101);",
  `export const verifierOutc${HOMOGLYPH_O}me = 1;`,
  `const ${fullWidth("verifierOutcome")} = 1;`,
  'const name = Buffer.from("dmVyaWZpZXJPdXRjb21l", "base64").toString();',
  'const name = rot13("irevsvreBhgpbzr");',
  'const name = "emoctuOreifirev".split("").reverse().join("");',
  "export const GraphPolicyCommandLineInterface = 1;",
];
/** Q5's journal: a pass over an Attempt R-KILL-READING does not read as killed, recorded success. */
const UNKILLED_JOURNAL: readonly LedgerEvent[] = [
  decided("abandoned", "admission", 0.5, "passed", attemptOf("abandoned", "abandoned", "abandoned")),
  decided("identity-lost", "admission", 0.5, "passed", attemptOf("identity-lost", "needs_reconciliation", undefined, "process_identity_lost")),
];
/** A ledger that records success for every decision, whatever happened. */
function succeeding(): ReceiptLedger {
  const rows: Row[] = [];
  return {
    record(event) {
      if (event.kind === "decided") rows.push({ decision: event.decision, admission: event.admission, attemptRef: event.attempt?.attempt_id ?? null, verifierOutcome: "success", score: event.score });
    },
    rows: () => rows,
  };
}

/** The subjects each pin's reading is taken from (REACHED binds them; a body swapped for a compare of literals consults none). */
const CONSULTS: Readonly<Record<string, readonly Subject[]>> = {
  T1: ["reader", "repo"], T2: ["sdk"],
  A1a: ["judge", "ledger"], A1b: ["judge", "ledger"], A2a: ["ledger"], A2b: ["judge", "ledger"], A3a: ["judge", "ledger"], A3b: ["judge", "ledger"],
  A4a: ["ledger"], A4b: ["judge", "ledger"], A5a: ["ledger"], A5b: ["judge", "ledger"], A6a: ["judge", "ledger"], A6b: ["judge", "ledger"],
  A7a: ["ledger"], A7b: ["control", "judge", "ledger"],
  S1a: ["control"], S1b: ["repo"], S2a: ["judge", "ledger"], S2b: ["repo"], S3a: ["control", "ledger"], S3b: ["repo"], S4a: ["repo"], S4b: ["repo"],
  Q1: ["reader"], Q2: ["judge", "ledger"], Q3: ["judge", "ledger"], Q4: ["judge", "ledger"], Q5: ["judge", "ledger"], Q6: ["judge", "ledger"],
  Q7: ["repo", "sdk"], Q8: ["reached"], Q9: ["repo"], Q10: ["judge", "ledger"],
};
interface Reached {
  readonly pin: string;
  readonly same: boolean;
  readonly consulted: readonly Subject[];
}
const REACHED: Reached[] = [];
/** A pin's one witness compare: recorded with the subjects its case consulted, then asserted. */
function witness(pin: string, observed: unknown, expected: unknown): void {
  REACHED.push({ pin, same: isDeepStrictEqual(observed, expected), consulted: [...consulted].sort() });
  expect(observed, `${pin}: the observed reading is its witness`).toEqual(expected);
}
/** The last case's reading of a REACHED record list: every pin in row order, each compare held, each pin consulted a subject, and its subjects are its entry of the subject lists (CONSULTS unless given). */
function reachedFindings(records: readonly Reached[], consults: Readonly<Record<string, readonly Subject[]>> = CONSULTS): string[] {
  consult("reached", records);
  const out: string[] = [];
  if (!isDeepStrictEqual(records.map(entry => entry.pin), ROWS.flatMap(row => row.pins))) out.push("the pins are not every pin in row order");
  for (const entry of records) {
    if (!entry.same) out.push(`${entry.pin}: its compare did not hold`);
    if (entry.consulted.length === 0) out.push(`${entry.pin}: consulted nothing`);
    else if (!isDeepStrictEqual(entry.consulted, consults[entry.pin] ?? [])) out.push(`${entry.pin}: consulted ${entry.consulted.join("+")}`);
  }
  return out;
}
const honest = (): Run => run(() => reference());
const originalsOf = (rows: readonly unknown[]): unknown[] => rows.filter(row => !isCorrection(row));
const byTwist = (...twists: Twist[]): Record<string, Check[]> => Object.fromEntries(twists.map(twist => [twist, failsOf(twist)]));

const PINS: Readonly<Record<string, () => void>> = {
  T1: () => {
    const files = srcFiles();
    const touched = files.filter(file => spelled(headText(file)).length > 0);
    witness("T1", {
      floor: files.length >= SRC_FLOOR, core: files.includes(CORE), touched, sites: RECEIPT_SITES.map(site => site.module).sort(),
      stale: RECEIPT_SITES.filter(site => !touched.includes(site.module)).map(site => site.module),
      siteFindings: RECEIPT_SITES.flatMap(site => judge(run(site.open)).map(finding => `${site.module} ${finding}`)),
      reader: READER_CONTROLS.map(([text]) => spelled(text)),
    }, {
      floor: true, core: true, touched: [], sites: [], stale: [], siteFindings: [], reader: READER_CONTROLS.map(([, names]) => names),
    });
  },
  T2: () => {
    const declarations = protocolText();
    witness("T2", {
      ...tablesAnchored(KILLED),
      plants: SDK_PLANTS.map(([, plant]) => unionOf(plant(declarations), TERMINATION_CAUSE)),
      killedBy: {
        causes: Object.keys(KILLED_CAUSES).filter(key => KILLED_CAUSES[key as TerminationCause]),
        states: Object.keys(KILLED_STATES).filter(key => KILLED_STATES[key as AttemptState]),
        outcomes: Object.keys(KILLED_OUTCOMES).filter(key => KILLED_OUTCOMES[key as AttemptOutcome]),
      },
    }, {
      causes: true, states: true, outcomes: true,
      plants: SDK_PLANTS.map(() => ["natural_exit", "operator_stop", "timeout_escalation", "external_termination", "process_identity_lost"]),
      killedBy: { causes: ["operator_stop", "timeout_escalation", "external_termination"], states: ["timed_out", "cancelled"], outcomes: ["timeout", "cancelled"] },
    });
  },
  A1a: () => {
    const result = honest();
    witness("A1a", {
      originals: originalsOf(result.rows).map(row => [member(row, "decision"), member(row, "admission")]),
      findings: judge(result),
    }, {
      originals: [["verified", "admission"], ["rejected", "rejection"], ["refuted", "admission"], ["awaiting", "admission"], ["stopped", "admission"],
        ["terminated", "admission"], ["lost", "admission"], ["timed-out", "admission"]],
      findings: [],
    });
  },
  A1b: () => {
    witness("A1b", byTwist("duplicate", "drop-rejection", "boolean-admission", "correction-admission"), {
      duplicate: ["one-row"], "drop-rejection": ["one-row"], "boolean-admission": ["one-row"], "correction-admission": ["one-row"],
    });
  },
  A2a: () => {
    witness("A2a", Object.fromEntries(originalsOf(honest().rows).map(row => [member(row, "decision"), member(row, "attemptRef")])), {
      verified: "atm-verified", rejected: null, refuted: "atm-refuted", awaiting: "atm-awaiting", stopped: "atm-stopped",
      terminated: "atm-terminated", lost: "atm-lost", "timed-out": "atm-timed-out",
    });
  },
  A2b: () => {
    witness("A2b", byTwist("fabricated-ref", "run-ref", "correction-ref"), { "fabricated-ref": ["attempt-ref"], "run-ref": ["attempt-ref"], "correction-ref": ["attempt-ref"] });
  },
  A3a: () => {
    const rows = honest().rows;
    witness("A3a", {
      values: [...new Set(rows.map(row => member(row, "verifierOutcome")))].sort(),
      every: rows.every(row => (VERIFIER_OUTCOMES as readonly unknown[]).includes(member(row, "verifierOutcome"))),
      ...byTwist("boolean-verifier"),
    }, { values: [...VERIFIER_OUTCOMES].sort(), every: true, "boolean-verifier": ["verifier-field"] });
  },
  A3b: () => {
    const rows = honest().rows;
    const outcome = (decision: string): unknown => member(originalsOf(rows).find(row => member(row, "decision") === decision), "verifierOutcome");
    witness("A3b", {
      refutedOverNativeSuccess: outcome("refuted"), rejectedWithoutEvidence: outcome("rejected"), lostWithoutEvidence: outcome("lost"),
      ...byTwist("native-outcome", "rejection-as-failure"),
    }, {
      refutedOverNativeSuccess: "failure", rejectedWithoutEvidence: "unavailable", lostWithoutEvidence: "unavailable",
      "native-outcome": ["verifier-field", "unknown-never-negative"], "rejection-as-failure": ["verifier-field", "unknown-never-negative"],
    });
  },
  A4a: () => {
    const stopped = JOURNAL.filter((event): event is Decided => event.kind === "decided" && killed(event.attempt)).map(event => event.decision);
    witness("A4a", {
      killed: stopped,
      read: honest().rows.filter(row => stopped.includes(String(member(row, "decision")))).map(row => [member(row, "decision"), member(row, "verifierOutcome")]),
    }, {
      killed: ["stopped", "terminated", "timed-out"],
      read: [["stopped", "unavailable"], ["terminated", "unavailable"], ["timed-out", "failure"], ["stopped", "unavailable"]],
    });
  },
  A4b: () => {
    witness("A4b", {
      ...byTwist("killed-pass", "terminal-success"),
      killedPassRows: judge(run(() => reference("killed-pass"))), terminalSuccessRows: judge(run(() => reference("terminal-success"))),
    }, {
      "killed-pass": ["killed-never-success"], "terminal-success": ["killed-never-success"],
      killedPassRows: ["killed-never-success terminated", "killed-never-success stopped"], terminalSuccessRows: ["killed-never-success stopped"],
    });
  },
  A5a: () => {
    const rows = honest().rows;
    const evidence = (row: unknown): Evidence | undefined => {
      if (!isCorrection(row)) return JOURNAL.find((event): event is Decided => event.kind === "decided" && event.decision === member(row, "decision"))?.verifier;
      return JOURNAL.find((event): event is Corrected => event.kind === "corrected" && event.decision === member(row, "decision"))?.verifier;
    };
    witness("A5a", rows.filter(row => evidence(row) !== "failed").map(row => [member(row, "decision"), evidence(row), member(row, "verifierOutcome")]), [
      ["verified", "passed", "success"], ["rejected", "none", "unavailable"], ["awaiting", "running", "pending"], ["stopped", "none", "unavailable"],
      ["terminated", "passed", "unavailable"], ["lost", "none", "unavailable"], ["refuted", "passed", "success"], ["stopped", "passed", "unavailable"],
    ]);
  },
  A5b: () => {
    witness("A5b", { ...byTwist("killed-failure", "unknown-failure", "negative-reward", "negative-feedback"), reader: NEGATIVE_CONTROLS.map(([row]) => negative(row)) }, {
      "killed-failure": ["unknown-never-negative"], "unknown-failure": ["verifier-field", "unknown-never-negative"],
      "negative-reward": ["unknown-never-negative"], "negative-feedback": ["unknown-never-negative"], reader: NEGATIVE_CONTROLS.map(([, reads]) => reads),
    });
  },
  A6a: () => {
    const result = honest();
    witness("A6a", {
      growth: result.snapshots.map((snapshot, step) => snapshot.length - (step === 0 ? 0 : (result.snapshots[step - 1]?.length ?? 0))),
      corrections: result.rows.filter(isCorrection),
      ...byTwist("phantom-success", "phantom-rejection", "phantom-pending", "phantom-elsewhere", "phantom-unlinked", "phantom-admission", "phantom-killed"),
    }, {
      growth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      corrections: [
        { decision: "refuted", corrects: 3, verifierOutcome: "success" }, { decision: "lost", corrects: 7, verifierOutcome: "failure" },
        { decision: "stopped", corrects: 5, verifierOutcome: "unavailable" },
      ],
      "phantom-success": ["one-row", "verifier-field", "corrections-append"], "phantom-rejection": ["one-row", "verifier-field", "corrections-append"],
      "phantom-pending": ["one-row", "verifier-field", "corrections-append"], "phantom-elsewhere": ["one-row", "verifier-field", "corrections-append"],
      "phantom-unlinked": ["one-row", "verifier-field", "corrections-append"], "phantom-admission": ["one-row", "verifier-field", "corrections-append"],
      "phantom-killed": ["one-row", "verifier-field", "corrections-append"],
    });
  },
  A6b: () => {
    const result = honest();
    witness("A6b", {
      refutedOriginal: result.snapshots[2]?.[2] === result.snapshots.at(-1)?.[2], lostOriginal: result.snapshots[6]?.[6] === result.snapshots.at(-1)?.[6],
      stoppedOriginal: result.snapshots[4]?.[4] === result.snapshots.at(-1)?.[4],
      ...byTwist("mark-original", "wrong-link", "edit-in-place"),
    }, {
      refutedOriginal: true, lostOriginal: true, stoppedOriginal: true, "mark-original": ["corrections-append"], "wrong-link": ["corrections-append"],
      "edit-in-place": ["verifier-field", "unknown-never-negative", "corrections-append"],
    });
  },
  A7a: () => {
    const rows = honest().rows;
    witness("A7a", {
      originalMembers: [...new Set(originalsOf(rows).flatMap(row => (isObject(row) ? Object.keys(row) : [])))].sort(),
      correctionMembers: [...new Set(rows.filter(isCorrection).flatMap(row => (isObject(row) ? Object.keys(row) : [])))].sort(),
      scores: originalsOf(rows).map(row => typeof member(row, "score")),
      causal: rows.flatMap(row => causal(row, "")),
      reader: STEM_CONTROLS.map(([row]) => causal(row, "").length > 0),
    }, {
      originalMembers: ["admission", "attemptRef", "decision", "score", "verifierOutcome"], correctionMembers: ["corrects", "decision", "verifierOutcome"],
      scores: Array.from({ length: 8 }, () => "number"), causal: [], reader: STEM_CONTROLS.map(([, reads]) => reads),
    });
  },
  A7b: () => {
    const relate = (kind: string): string => {
      try {
        projectionWith(kind as RelationKind);
        return "accepted";
      } catch {
        return "refused";
      }
    };
    witness("A7b", { ...byTwist("caused-by", "causation-relation"), kinds: { causation: relate("causation"), "caused-by": relate("caused-by") } }, {
      "caused-by": ["no-causation"], "causation-relation": ["no-causation"], kinds: { causation: "accepted", "caused-by": "refused" },
    });
  },
  S1a: () => {
    const named = /keeps (\S+) distinct/.exec(ROWS.find(row => row.id === "S1")?.label ?? "")?.[1]?.split("/") ?? [];
    witness("S1a", { settled: named.map(settled), others: ["success", "killed", "COMPLETED"].map(settled) }, {
      settled: ["completed", "failed", "cancelled", "unknown"], others: ["refused validation", "refused validation", "refused validation"],
    });
  },
  S1b: () => {
    const head = headText(CORE);
    witness("S1b", {
      pin: declared(pinText(CORE), "ControlOutcome"), head: declared(head, "ControlOutcome").members,
      plants: CONTROL_PLANTS.map(([, plant]) => declared(plant(head), "ControlOutcome").members),
    }, {
      pin: { line: 53, members: ["completed", "failed", "cancelled", "unknown"] }, head: ["completed", "failed", "cancelled", "unknown"],
      plants: CONTROL_PLANTS.map(() => ["completed", "failed", "cancelled", "unknown", "partial"]),
    });
  },
  S2a: () => {
    witness("S2a", byTwist("boolean-admission", "boolean-verifier"), { "boolean-admission": ["one-row"], "boolean-verifier": ["verifier-field"] });
  },
  S2b: () => {
    witness("S2b", { ...anchorWitness("06:28"), markup: { D10: carrierChange("D10") } }, {
      pin: "holds", head: "holds", controls: { line: false, carrier: false, twice: false }, plants: { D1: false, D2: false, D3: false, D6: false, D10: false },
      unseen: { W1: true }, planted: { W1: { changed: true, whitespace: true, heading: 0, carrier: 1, blank: 0 } },
      markup: { D10: { lead: "block 2 differs", block: 2, text: true, markdown: false } },
    });
  },
  S3a: () => {
    const verdict = (kind: RelationKind): string => {
      const decision = decide(kind);
      return decision.decision === "permitted" ? "permitted" : decision.policy;
    };
    witness("S3a", {
      ownership: verdict("ownership"), causation: verdict("causation"),
      relationMembers: honest().rows.filter(row => isObject(row) && Object.keys(row).some(key => key.toLowerCase().includes("relat"))).length,
    }, { ownership: "permitted", causation: "no-confirmed-ownership", relationMembers: 0 });
  },
  S3b: () => {
    witness("S3b", { "09:91": anchorWitness("09:91"), "08:38": anchorWitness("08:38") }, {
      "09:91": {
        pin: "holds", head: "holds", controls: { line: false, carrier: false, twice: false }, plants: { "D4-09": false, D7: false, D9: false }, unseen: { W2: true },
        planted: { W2: { changed: true, whitespace: true, heading: 0, carrier: 1, blank: 1 } },
      },
      "08:38": {
        pin: "holds", head: "holds", controls: { line: false, carrier: false, twice: false }, plants: { "D4-08": false, D5: false, D8: false }, unseen: { W3: true },
        planted: { W3: { changed: true, whitespace: true, heading: 0, carrier: 1, blank: 1 } },
      },
    });
  },
  S4a: () => {
    let ancestor = true;
    try {
      git("merge-base", "--is-ancestor", PRECEDENT, PI_PIN);
    } catch {
      ancestor = false;
    }
    const added = git("diff", "--unified=0", `${PRECEDENT}^`, PRECEDENT, "--", TRACEABILITY).split("\n").filter(line => /^\+(?!\+\+)/.test(line) && line.trim() !== "+");
    witness("S4a", {
      ancestor, numstat: git("diff", "--numstat", `${PRECEDENT}^`, PRECEDENT, "--", TRACEABILITY).trim().split("\t").slice(0, 2),
      added: added.map(line => line.slice(1).startsWith(CORRECTION_OPENING)),
    }, { ancestor: true, numstat: ["2", "0"], added: [true] });
  },
  S4b: () => {
    const rowsIn = (text: string): string[] => text.split("\n").filter(line => line.startsWith(CORRECTION_OPENING));
    const atPin = rowsIn(pinText(TRACEABILITY));
    witness("S4b", { atPin: atPin.length, namesAbove: atPin[0]?.includes("the verification note above"), atHead: isDeepStrictEqual(rowsIn(headText(TRACEABILITY)), atPin) }, {
      atPin: 1, namesAbove: true, atHead: true,
    });
  },
  Q1: () => {
    witness("Q1", SPELLING_PLANTS.map(spelled), SPELLING_PLANTS.map(() => []));
  },
  Q2: () => {
    const side: Row[] = [];
    const inner = reference();
    const plant: ReceiptLedger = {
      record(event) {
        inner.record(event);
        if (event.kind === "decided" && killed(event.attempt)) side.push({ decision: event.decision, verifierOutcome: "success" });
      },
      rows: () => inner.rows(),
    };
    witness("Q2", { findings: judge(run(() => plant)), side: side.length }, { findings: [], side: 3 });
  },
  Q3: () => {
    const planted = (twist: Twist, shape: (row: unknown) => boolean): number => run(() => reference(twist)).rows.filter(shape).length;
    witness("Q3", {
      ...byTwist("credit", "led-to", "stop-by-score", "nested-termination"),
      planted: {
        "stop-by-score": planted("stop-by-score", row => member(row, "termination_cause") === "operator_stop" && member(row, "by") === "score"),
        "nested-termination": planted("nested-termination", row => member(member(row, "score"), "termination_cause") === "operator_stop"),
      },
    }, { credit: [], "led-to": [], "stop-by-score": [], "nested-termination": [], planted: { "stop-by-score": 2, "nested-termination": 2 } });
  },
  Q4: () => {
    witness("Q4", byTwist("second-record"), { "second-record": [] });
  },
  Q5: () => {
    witness("Q5", { killed: UNKILLED_JOURNAL.map(event => event.kind === "decided" && killed(event.attempt)), findings: judge(run(succeeding, UNKILLED_JOURNAL), UNKILLED_JOURNAL) }, {
      killed: [false, false], findings: [],
    });
  },
  Q6: () => {
    witness("Q6", byTwist(...SIGNAL_PLANTS), { penalty: [], "bad-feedback": [], "string-reward": [], "negative-flag": [], "feedback-false": [], "nested-negative": [] });
  },
  Q7: () => {
    const clause = killClauseOf(filingOf(beadRow().notes));
    witness("Q7", {
      readings: KILL_READINGS.map(([table, key]) => `${table}:${key}`),
      anchored: KILL_READINGS.map(([table, key]) => tablesAnchored({ ...KILLED, [table]: { ...KILLED[table], [key]: false } })),
      namedUnkilled: KILL_READINGS.map(([table, key]) => namedUnkilled({ ...KILLED, [table]: { ...KILLED[table], [key]: false } }, clause)),
      additions: NON_KILL_READINGS.length,
      addedAnchored: NON_KILL_READINGS.map(([table, key]) => tablesAnchored({ ...KILLED, [table]: { ...KILLED[table], [key]: true } })),
      addedNamedUnkilled: NON_KILL_READINGS.map(([table, key]) => namedUnkilled({ ...KILLED, [table]: { ...KILLED[table], [key]: true } }, clause)),
    }, {
      readings: ["causes:operator_stop", "causes:timeout_escalation", "causes:external_termination", "states:timed_out", "states:cancelled", "outcomes:timeout", "outcomes:cancelled"],
      anchored: KILL_READINGS.map(() => ({ causes: true, states: true, outcomes: true })),
      namedUnkilled: [[], [], ["external_termination"], [], [], [], []],
      additions: 17,
      addedAnchored: NON_KILL_READINGS.map(() => ({ causes: true, states: true, outcomes: true })),
      addedNamedUnkilled: NON_KILL_READINGS.map(() => []),
    });
  },
  Q8: () => {
    const pins = ROWS.flatMap(row => row.pins);
    const swapped = pins.map(pin => ({ pin, same: true, consulted: [...(CONSULTS[pin] ?? [])] }));
    const emptied = pins.map(pin => ({ pin, same: true, consulted: pin === "A4b" ? [] : [...(CONSULTS[pin] ?? [])] }));
    witness("Q8", { swapped: reachedFindings(swapped), emptied: reachedFindings(emptied, { ...CONSULTS, A4b: [] }) }, { swapped: [], emptied: ["A4b: consulted nothing"] });
  },
  Q9: () => {
    const filing = filingOf(beadRow().notes);
    const split = Object.keys(filingSplits(filing));
    const open = ROWS.filter(row => row.id !== "Q" && !split.includes(row.id)).map(row => row.id);
    witness("Q9", {
      open,
      merged: open.map(id => addedFindings(filing, mergedPins(id))),
      moved: open.map(id => addedFindings(filing, movedBoundary(id))),
    }, { open: ["T", "A1", "A3", "A4", "A5", "A6", "A7"], merged: open.map(() => []), moved: open.map(() => []) });
  },
  Q10: () => {
    witness("Q10", { ...byTwist("result-success"), planted: run(() => reference("result-success")).rows.filter(row => member(row, "result") === "success").length }, {
      "result-success": [], planted: 4,
    });
  },
};

const FROZEN_TITLE =
  "rule 16, frozen as literals: each row's id and pin count; one quote, case and subject list per pin, and each pin's subjects; the checks, one per Acceptance row; the mutants with the checks each fails; the phantom twists; the journal's events by kind, decision and evidence; the vocabulary, admissions, verifier outcomes and evidence reading; the killed readings; each residual family's member count and row Q pin; the plant counts; the docs anchors', docs plants' and whitespace plants' ids, the SDK and control plants' names and the R-SPELLING plants' texts; the reader, stem, negative-feedback and cause controls; the receipt sites";
const ANCHORS_TITLE =
  "the outside anchors: the bead's own row binds the trigger, the clauses, the anchors, the vocabulary, the admission and outcome sets, each row's pin quotes but row Q's joined as its label, the pin split of each row whose clause ends in a parenthetical, and each termination cause row A4's clause names as a kill (the cause reader shown its controls); a later note binds nothing";
const LAST_TITLE = "registered tests: every pin case and fixed case, in order and in run mode, ran before this one; every pin reached its witness compare and each compare held";

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const body = PINS[pin];
        expect(body, `${pin} has a case`).toBeTypeOf("function");
        consulted.clear();
        body?.();
      });
    }
  }

  it(FROZEN_TITLE, { timeout: LIVE_BUDGET_MS }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`), "rows and their pin counts").toEqual([
      "T:2", "A1:2", "A2:2", "A3:2", "A4:2", "A5:2", "A6:2", "A7:2", "S1:2", "S2:2", "S3:2", "S4:2", "Q:10",
    ]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(PINS), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...CHECKS], "the checks").toEqual(["one-row", "attempt-ref", "verifier-field", "killed-never-success", "unknown-never-negative", "corrections-append", "no-causation"]);
    expect(Object.entries(CHECK_OF).map(([id, check]) => `${id}:${check}`), "one check per Acceptance row").toEqual(ROWS.filter(row => /^A\d$/.test(row.id)).map((row, index) => `${row.id}:${CHECKS[index]}`));
    expect(MUTANTS.map(mutant => `${mutant.twist}:${mutant.refusedBy.join("+")}`), "the mutants and the checks each fails").toEqual([
      "duplicate:one-row", "drop-rejection:one-row", "boolean-admission:one-row", "correction-admission:one-row", "fabricated-ref:attempt-ref", "run-ref:attempt-ref",
      "correction-ref:attempt-ref", "boolean-verifier:verifier-field", "native-outcome:verifier-field+unknown-never-negative",
      "rejection-as-failure:verifier-field+unknown-never-negative", "killed-pass:killed-never-success", "terminal-success:killed-never-success",
      "killed-failure:unknown-never-negative", "unknown-failure:verifier-field+unknown-never-negative", "negative-reward:unknown-never-negative",
      "negative-feedback:unknown-never-negative", "mark-original:corrections-append", "wrong-link:corrections-append",
      "edit-in-place:verifier-field+unknown-never-negative+corrections-append", "phantom-success:one-row+verifier-field+corrections-append",
      "phantom-rejection:one-row+verifier-field+corrections-append", "phantom-pending:one-row+verifier-field+corrections-append",
      "phantom-elsewhere:one-row+verifier-field+corrections-append", "phantom-unlinked:one-row+verifier-field+corrections-append",
      "phantom-admission:one-row+verifier-field+corrections-append", "phantom-killed:one-row+verifier-field+corrections-append",
      "caused-by:no-causation", "causation-relation:no-causation",
    ]);
    expect(Object.entries(PHANTOMS).map(([twist, phantom]) => `${twist}:${phantom?.at}:${phantom?.decision}:${phantom?.verifierOutcome}:${phantom?.link}:${phantom?.admission ?? "-"}`), "the phantom twists").toEqual([
      "phantom-success:awaiting:awaiting:success:original:-", "phantom-rejection:rejected:rejected:success:original:-", "phantom-pending:verified:verified:pending:original:-",
      "phantom-elsewhere:lost:awaiting:unavailable:original:-", "phantom-unlinked:awaiting:awaiting:success:null:-", "phantom-admission:rejected:rejected:unavailable:original:admission",
      "phantom-killed:stopped:stopped:unavailable:original:-",
    ]);
    expect(failsOf(), "the reference meets every check").toEqual([]);
    expect(MUTANTS.map(mutant => `${mutant.twist}:${failsOf(mutant.twist).join("+")}`), "every mutant fails exactly its declared checks").toEqual(MUTANTS.map(mutant => `${mutant.twist}:${mutant.refusedBy.join("+")}`));
    expect(CHECKS.filter(check => !MUTANTS.some(mutant => isDeepStrictEqual(mutant.refusedBy, [check]))), "every check has a mutant that fails it alone").toEqual([]);
    expect(JOURNAL.map(event => `${event.kind}:${event.decision}:${event.verifier}`), "the journal").toEqual([
      "decided:verified:passed", "decided:rejected:none", "decided:refuted:failed", "decided:awaiting:running", "decided:stopped:none",
      "decided:terminated:passed", "decided:lost:none", "decided:timed-out:failed", "corrected:refuted:passed", "corrected:lost:failed",
      "corrected:stopped:passed",
    ]);
    expect([...VOCABULARY, ...ADMISSIONS, ...VERIFIER_OUTCOMES], "the vocabulary, the admissions and the verifier outcomes").toEqual([
      "GraphPolicyCLI", "verifierOutcome", "admission", "rejection", "failure", "pending", "unavailable", "success",
    ]);
    expect(Object.entries(READING).map(([evidence, outcome]) => `${evidence}:${outcome}`), "the evidence reading").toEqual(["none:unavailable", "running:pending", "failed:failure", "passed:success"]);
    const killedKeys = (table: Readonly<Record<string, boolean>>): string[] => Object.entries(table).filter(([, value]) => value).map(([key]) => key);
    expect([killedKeys(KILLED_CAUSES), killedKeys(KILLED_STATES), killedKeys(KILLED_OUTCOMES)], "the killed readings").toEqual([
      ["operator_stop", "timeout_escalation", "external_termination"], ["timed_out", "cancelled"], ["timeout", "cancelled"],
    ]);
    expect(RESIDUALS.map(residual => `${residual.id}:${residual.name}:${residual.members.length}`), "the residual families").toEqual([
      "Q1:R-SPELLING:11", "Q2:R-SIDE-RECORD:1", "Q3:R-CAUSAL-WORDING:4", "Q4:R-SECOND-RECORD:1", "Q5:R-KILL-READING:2",
      "Q6:R-NEGATIVE-SIGNAL:6", "Q7:R-KILL-VALUES:6", "Q8:R-WITNESS-SWAP:1", "Q9:R-PIN-PARTITION:2", "Q10:R-SUCCESS-ELSEWHERE:1",
    ]);
    expect(RESIDUALS.map(residual => residual.id), "one residual family per row Q pin").toEqual(ROWS.find(row => row.id === "Q")?.pins);
    expect(RESIDUALS.map(residual => QUOTES[residual.id]), "each row Q pin quotes its family").toEqual(RESIDUALS.map(residual => residual.name));
    expect([SPELLING_PLANTS.length, UNKILLED_JOURNAL.length, SIGNAL_PLANTS.length], "a plant per R-SPELLING, R-KILL-READING and R-NEGATIVE-SIGNAL member").toEqual([11, 2, 6]);
    expect(DOCS_ANCHORS.map(anchor => `${anchor.id}:${anchor.heading}`), "the docs anchors").toEqual([
      "06:28:Proposed capability descriptor", "09:91:Acceptance/negative controls", "08:38:Cancellation and ownership",
    ]);
    expect(DOCS_PLANTS.map(plant => `${plant.id}:${plant.anchor}`), "the docs plants").toEqual([
      "D1:06:28", "D2:06:28", "D3:06:28", "D6:06:28", "D10:06:28", "D4-09:09:91", "D7:09:91", "D9:09:91", "D4-08:08:38", "D5:08:38", "D8:08:38",
    ]);
    expect(WHITESPACE_PLANTS.map(plant => `${plant.id}:${plant.anchor}`), "the whitespace plants").toEqual(["W1:06:28", "W2:09:91", "W3:08:38"]);
    expect(SDK_PLANTS.map(([name]) => name), "the SDK plants").toEqual([
      "a comment restating the union with one member above its declaration", "a string restating the union with one member above its declaration",
    ]);
    expect(CONTROL_PLANTS.map(([name]) => name), "the control plants").toEqual([
      "a comment restating the union above a declaration that gains a member", "the declaration gains a member",
      "a string restating the union above a declaration that gains a member",
    ]);
    expect(Object.keys(CONSULTS), "one subject list per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.entries(CONSULTS).map(([pin, subjects]) => `${pin}:${subjects.join("+")}`), "each pin's subjects").toEqual([
      "T1:reader+repo", "T2:sdk", "A1a:judge+ledger", "A1b:judge+ledger", "A2a:ledger", "A2b:judge+ledger", "A3a:judge+ledger", "A3b:judge+ledger",
      "A4a:ledger", "A4b:judge+ledger", "A5a:ledger", "A5b:judge+ledger", "A6a:judge+ledger", "A6b:judge+ledger", "A7a:ledger", "A7b:control+judge+ledger",
      "S1a:control", "S1b:repo", "S2a:judge+ledger", "S2b:repo", "S3a:control+ledger", "S3b:repo", "S4a:repo", "S4b:repo",
      "Q1:reader", "Q2:judge+ledger", "Q3:judge+ledger", "Q4:judge+ledger", "Q5:judge+ledger", "Q6:judge+ledger", "Q7:repo+sdk", "Q8:reached", "Q9:repo",
      "Q10:judge+ledger",
    ]);
    expect(READER_CONTROLS.map(([text, names]) => `${text} => ${names.join("+") || "nothing"}`), "the reader controls").toEqual([
      "export const verifierOutcome = 1; => verifierOutcome", "const VERIFIER_OUTCOME = 2; => verifierOutcome",
      "row.verifier_outcome => verifierOutcome", "a GraphPolicyCLI host => GraphPolicyCLI",
      "import('graph-policy-cli') => GraphPolicyCLI", "export const GRAPHPOLICYCLI_PLANT = 3; => GraphPolicyCLI",
      "const plant = \"graphpolicycli verifieroutcome\"; => GraphPolicyCLI+verifierOutcome", "row.graphpolicy_cli => GraphPolicyCLI",
      "const name = \"verif\" + \"ierOutcome\"; => verifierOutcome", "verifierOutcomes => nothing",
      "preverifierOutcome => nothing", "GraphPolicyCLIs => nothing",
      "graph policies => nothing", "verifieroutcomes => nothing",
      "graphpolicyclient => nothing",
    ]);
    expect(STEM_CONTROLS.map(([row, reads]) => `${JSON.stringify(row)} => ${reads}`), "the stem controls").toEqual([
      "{\"causedBy\":\"score\"} => true",
      "{\"note\":\"caused by the score\"} => true",
      "{\"kind\":\"causation\"} => true",
      "{\"because\":1} => true",
      "{\"termination_cause\":\"operator_stop\"} => false",
      "{\"terminationCause\":\"external_termination\"} => false",
      "{\"note\":\"termination cause operator_stop; the score caused it\"} => true",
      "{\"note\":\"the GP score was the termination cause of this outcome\"} => true",
      "{\"relations\":[{\"kind\":\"termination_cause\",\"from\":\"score\",\"to\":\"verifierOutcome\"}]} => true",
      "{\"scoreTerminationCause\":0.61} => true",
      "{\"termination_cause\":\"the score caused it\"} => true",
      "{\"termination_cause\":0.61} => true",
      "{\"terminationCause\":{\"from\":\"score\",\"to\":\"verifierOutcome\"}} => true",
      "{\"termination_cause\":\"score\"} => true",
      "{\"TERMINATION_CAUSE\":\"timeout_escalation\"} => false",
    ]);
    expect(NEGATIVE_CONTROLS.map(([row, reads]) => `${JSON.stringify(row)} => ${reads}`), "the negative-feedback controls").toEqual([
      "{\"verifierOutcome\":\"failure\"} => true",
      "{\"verifierOutcome\":\"unavailable\"} => false",
      "{\"reward\":-1} => true",
      "{\"feedback\":\"negative\"} => true",
      "{\"feedbacks\":[\"failed\"]} => true",
      "{\"rewardSignal\":{\"polarity\":\"negatively\"}} => true",
      "{\"reward\":0} => false",
      "{\"reward\":\"-1\"} => false",
      "{\"feedback\":\"bad\"} => false",
      "{\"penalty\":-1} => false",
      "{\"meta\":{\"reward\":-1}} => true",
      "{\"notes\":[{\"feedback\":\"negative\"}]} => true",
    ]);
    expect(CAUSE_CONTROLS.map(([clause, causes]) => `${clause} => ${causes.join("+") || "nothing"}`), "the cause controls").toEqual([
      "a killed or externally terminated Attempt => external_termination", "an Attempt its operator stopped => operator_stop",
      "an Attempt that exited naturally => natural_exit", "a timeout escalated => timeout_escalation",
      "a process whose identity was lost => process_identity_lost", "an external timeout => nothing", "a killed Attempt => nothing",
      "an Attempt terminated by its operator => nothing",
    ]);
    expect(SPELLING_PLANTS.map(ascii), "the R-SPELLING plants, each character past ASCII written as its code point").toEqual([
      "const tail = \"ierOutcome\"; const name = \"verif\" + tail;", "const name = \"verifier\\u004Futcome\";",
      "export const GraphPolicy = 1;", "const gp = load();",
      "const name = String.fromCharCode(118, 101, 114, 105, 102, 105, 101, 114, 79, 117, 116, 99, 111, 109, 101);",
      "export const verifierOutc<U+043E>me = 1;",
      "const <U+FF56><U+FF45><U+FF52><U+FF49><U+FF46><U+FF49><U+FF45><U+FF52><U+FF2F><U+FF55><U+FF54><U+FF43><U+FF4F><U+FF4D><U+FF45> = 1;",
      "const name = Buffer.from(\"dmVyaWZpZXJPdXRjb21l\", \"base64\").toString();",
      "const name = rot13(\"irevsvreBhgpbzr\");", "const name = \"emoctuOreifirev\".split(\"\").reverse().join(\"\");",
      "export const GraphPolicyCommandLineInterface = 1;",
    ]);
    expect(RECEIPT_SITES.map(site => site.module), "the receipt sites").toEqual([]);
  });

  it(ANCHORS_TITLE, { timeout: LIVE_BUDGET_MS }, () => {
    const { title, notes } = beadRow();
    const prefix = `[${REQUIREMENT}] `;
    expect(title.startsWith(prefix), "the title opens with the requirement id").toBe(true);
    const trigger = ROWS.find(row => row.id === "T")?.label ?? "-";
    expect(title.slice(prefix.length).startsWith(`${trigger} (artifact: `), "row T's label is the title's trigger, before its artifact parenthetical").toBe(true);
    expect(title.match(/(?<![A-Za-z])Graph[A-Z][A-Za-z]*/g), "the title names exactly the vocabulary's first member").toEqual([VOCABULARY[0]]);
    const filing = filingOf(notes);
    const labels = (pattern: RegExp): (string | undefined)[] => ROWS.filter(row => pattern.test(row.id)).map(row => row.label);
    expect(filing.clauses, "the Acceptance sentence's clauses are exactly the labels of rows A1 to A7").toEqual(labels(/^A\d$/));
    expect(filing.clauses.length, "one check per clause").toBe(CHECKS.length);
    expect(filing.trailing, "the last clause's trailing parenthetical (NOT CLAIMED)").toBe("(carries O5 and O13's GP-specific rows)");
    expect(filing.anchors, "the standing-anchors sentence's clauses are exactly the labels of rows S1 to S4").toEqual(labels(/^S\d$/));
    expect(PI_PIN.startsWith(filing.pin) && filing.pin.length >= 7, "the Pi pin is the filing's").toBe(true);
    const acceptance = filing.clauses.join(", ");
    expect(acceptance.match(/(?<![A-Za-z])[a-z]+[A-Z][A-Za-z]*/g), "the Acceptance's one camel-case member is the vocabulary's second").toEqual([VOCABULARY[1]]);
    expect(/with (\S+)$/.exec(filing.clauses[0] ?? "")?.[1]?.split("|"), "the admission set is the first clause's").toEqual([...ADMISSIONS]);
    expect(/\{([^}]*)\}/.exec(acceptance)?.[1]?.split(", "), "the verifier outcome set is the Acceptance's brace set").toEqual([...VERIFIER_OUTCOMES]);
    expect(partitionFindings(filing, { rows: ROWS, quotes: QUOTES }), "each row's pin quotes but row Q's, joined, are its label, and each row the filing splits quotes its split").toEqual([]);
    const split = Object.keys(filingSplits(filing));
    expect(split, "the rows whose clause ends in a parenthetical: A2 and the four standing anchors").toEqual(["A2", "S1", "S2", "S3", "S4"]);
    expect(split.map(id => [addedFindings(filing, mergedPins(id)).length > 0, addedFindings(filing, movedBoundary(id)).length > 0]), "a pin of those rows merged into its sibling, or the boundary between their pins moved, is refused").toEqual(split.map(() => [true, true]));
    const killClause = killClauseOf(filing);
    expect(causesNamed(killClause), "row A4's clause names one TerminationCause member, external_termination (its 'externally terminated')").toEqual(["external_termination"]);
    expect(namedUnkilled(KILLED, killClause), "each TerminationCause member row A4's clause names reads as a kill in KILLED_CAUSES").toEqual([]);
    expect(CAUSE_CONTROLS.map(([clause]) => causesNamed(clause)), "the cause reader names exactly each control's members").toEqual(CAUSE_CONTROLS.map(([, causes]) => causes));
    const appended = `${notes}\n\nCitation: a later note. Standing anchors carried here as acceptance rows: x, y @000000000000. Acceptance: z, w.\n`;
    expect(filingOf(appended), "a note appended after the filing changes no reading").toEqual(filing);
  });

  it(LAST_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const expected = [...ROWS.flatMap(row => row.pins.map(pin => `${pin}: ${QUOTES[pin] ?? ""}`)), FROZEN_TITLE, ANCHORS_TITLE, LAST_TITLE];
    expect(walked.map(entry => entry.name), "every registered test of this file, exactly and in order").toEqual(expected);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || (entry.state !== "pass" && entry.state !== "fail"))).map(entry => entry.name), "every other test is in run mode and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
    expect(Object.fromEntries(REACHED.map(entry => [entry.pin, entry.consulted])), "and each pin's reading was taken from its subjects").toEqual(CONSULTS);
    expect(reachedFindings(REACHED), "REACHED's reader agrees").toEqual([]);
  });
});
