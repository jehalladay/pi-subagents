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
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at the trunk tip 09f45a52f7a7, again at the cut's base e544dd872434, and
 * at the Pi pin 758ec18187a5): no src module spells GraphPolicyCLI or verifierOutcome (in any case or separator spelling the word
 * reader reads); line 53 of src/workbench/control.ts is the ControlOutcome union of the four values at each; docs/workbench/06:28,
 * 09:91 and 08:38 carry the anchor sentences at each; the wb-lrz.3 correction row is one line of docs/workbench/TRACEABILITY.md,
 * appended by commit e805a5efd42d (an ancestor of the pin) with numstat 2 added, 0 deleted; the installed @furnace/sdk
 * (vendor/furnace-sdk-0.1.0.tgz) declares AttemptState, AttemptOutcome and TerminationCause in dist/src/protocol.d.ts.
 *
 * Pi records no GP decision receipt today. The census pins that (row T) and an ARMED contract (rows A1 to A7) that binds the
 * first receipt site to come, as the wb-0lf.7 and wb-gxd7.3 censuses arm theirs:
 *  T, the trigger. T1: no src module spells the vocabulary (VOCABULARY: the title's GraphPolicyCLI and the Acceptance's one
 *    camel-case member verifierOutcome, each read as its run of words in a text split at every non-letter, non-digit character and
 *    at camel-case humps, lower-cased, so VERIFIER_OUTCOME and graph-policy-cli read too) in git's would-commit listing under src/,
 *    and the src modules that do are exactly the registered RECEIPT_SITES (empty both ways today: a module that starts recording
 *    must be bound, and a bound module that names nothing is stale); the listing holds at least SRC_FLOOR files and the control
 *    core, and the reader reads every member in planted text and no near token. Every registered site's ledger must meet every
 *    check over the journal (vacuous today). T2: the journal's Attempts speak Furnace's own vocabulary: the census's killed
 *    tables are keyed by exactly the members of the installed SDK's AttemptState, AttemptOutcome and TerminationCause unions.
 *  A1 to A7, armed. The contract reads a receipt site as one ledger (record each journal event, read the rows it holds) over the
 *    synthetic JOURNAL: eight decided events (a decision id, its admission or rejection, a GP score, the native Attempt as Furnace
 *    records it, or none, and the verifier's own evidence: none, running, failed or passed) and three corrected events (new
 *    verifier evidence for a recorded decision, one of them a killed decision's, so a correction cannot launder success). A row is
 *    ORIGINAL unless it carries an own corrects member. Seven CHECKS judge the rows and the snapshot taken after every event, one
 *    per Acceptance clause: one-row (exactly one original row per decision, its admission member the decision's admission or
 *    rejection, strictly), attempt-ref (an original row's attemptRef is the native Attempt's attempt_id, or null when there is
 *    none), verifier-field (every row's own verifierOutcome is one of the four values, and on a row whose Attempt was not killed
 *    it is READING of the verifier's evidence alone - none unavailable, running pending, failed failure, passed success - never
 *    the admission or the Attempt's native outcome), killed-never-success (no row of a killed or externally terminated Attempt
 *    reads success), unknown-never-negative (no row reads failure unless its evidence is an observed failure), corrections-append
 *    (every snapshot keeps the one before it as its prefix, byte for byte, and each corrected event appends exactly one row naming
 *    its decision and, as corrects, the 1-based number of that decision's original row) and no-causation (no member name and no
 *    string value of a row, at any depth, holds a word carrying "caus", the stem of the observation model's causation relation
 *    kind, once every run of the words of Furnace's own TerminationCause - the termination_cause field naming why an Attempt ended
 *    - is dropped). KILLED: an Attempt whose termination_cause is operator_stop, timeout_escalation or external_termination, whose
 *    state is cancelled or timed_out, or whose outcome is cancelled or timeout. The honest REFERENCE ledger meets every check;
 *    each of the seventeen MUTANTS fails exactly its declared checks, and every check has a mutant that fails it alone. A pass
 *    over a killed Attempt is read unavailable by the reference: the program README the filing cites (README.md:13@0f791db71b9d)
 *    with "killed Attempt is not successful" forbids success and its "Unknown feedback is not negative reward" forbids failure.
 *  S1 to S4, the standing anchors, each read at the pin and at HEAD: S1 the ControlOutcome union is the label's four values, and
 *    the real control core settles each of them as given and refuses another spelling; S2 the docs line, and a boolean admission
 *    or verifier outcome is refused by its check; S3 the docs lines, the real control core never takes a causation relation for
 *    lifecycle ownership, and the reference states no relation at all; S4 the precedent commit is an ancestor of the pin and
 *    added the correction row without deleting a line, and the row stands at the pin and at HEAD.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, the checks, every mutant with its
 * failed checks, the journal, the vocabulary, the admissions, the verifier outcomes, the killed readings and each residual
 * family's member count as literals. OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export
 * (.beads/issues.jsonl): the title opens with the requirement id and carries row T's label before its artifact parenthetical and
 * names exactly the vocabulary's first member; the first notes line opening "Citation: " holds the standing-anchors sentence,
 * whose four clauses are exactly the labels of rows S1 to S4 and whose pin is the census's, and the Acceptance sentence, whose
 * seven clauses are exactly the labels of rows A1 to A7 (one check each) and whose one camel-case member, admission set and
 * brace set are the vocabulary's second member, ADMISSIONS and VERIFIER_OUTCOMES; each row's pin quotes, joined by single
 * spaces, are its label. A tracker note appended later (a delivery, gate or park note) sits on a line of its own and binds
 * nothing. So a pin, a row, a clause or a check removed from every literal of this file still reds. The last case reads the
 * vitest task tree (every registered test, in order, in run mode, ran before it) and REACHED (every pin reached its witness
 * compare, and each compare held).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included; the docs leg is the
 * wb-0lf.7 census's); the seam's actual receipt shape (the armed contract is this census's reading of an unpublished seam: the
 * members decision, admission, attemptRef, verifierOutcome and corrects, a row per event; a site whose own cut must take another
 * shape re-measures rows A1 to A7 with it); when a row is written and the order of rows; which rows of the O5 and O13 drafts the
 * trailing parenthetical carries (the drafts are outside this repository); R12's field-independence rows (wb-0lf.6, its own
 * bead); Furnace's own durable effect receipts; a mutant, a journal event or a planted control removed from its table and the
 * frozen literal together while every check keeps a mutant that fails it alone; row Q or a residual member removed from every
 * literal (no source outside this cut names the residual families before its delivery note lands).
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row): R-SPELLING
 * (Q1, a vocabulary spelling the word reader does not read: a member composed at run time from pieces that split its words, one
 * spelled with escapes, the shortened name GraphPolicy and the word gp; the landed wb-e66.5 census's src leg reads every
 * GraphPolicy word under src/, so the shortened name reds there), R-SIDE-RECORD (Q2, a receipt kept outside rows(): the
 * checks read rows() only), R-CAUSAL-WORDING (Q3, a causal claim worded without the stem: a credit member holding the score, a
 * reason saying the score led to the outcome), R-SECOND-RECORD (Q4, the Attempt record copied into a row: the filing's "Pi's
 * receipt is a correlation record, never a second Attempt record", docs/workbench/09:9-10, is read by no check) and
 * R-KILL-READING (Q5, an abandoned Attempt and one whose process identity was lost are not KILLED, so a pass over either reads
 * success unjudged).
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
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { acknowledge, type ControlOutcome, decideControl, type NativeControlRequest, settle } from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";

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
  | "wrong-link" | "edit-in-place" | "caused-by" | "causation-relation" | "credit" | "led-to" | "second-record";
interface Mutant { readonly twist: Twist; readonly refusedBy: readonly Check[] }
const MUTANTS: readonly Mutant[] = [
  { twist: "duplicate", refusedBy: ["one-row"] },
  { twist: "drop-rejection", refusedBy: ["one-row"] },
  { twist: "boolean-admission", refusedBy: ["one-row"] },
  { twist: "fabricated-ref", refusedBy: ["attempt-ref"] },
  { twist: "run-ref", refusedBy: ["attempt-ref"] },
  { twist: "boolean-verifier", refusedBy: ["verifier-field"] },
  { twist: "native-outcome", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "rejection-as-failure", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "killed-pass", refusedBy: ["killed-never-success"] },
  { twist: "terminal-success", refusedBy: ["killed-never-success"] },
  { twist: "killed-failure", refusedBy: ["unknown-never-negative"] },
  { twist: "unknown-failure", refusedBy: ["verifier-field", "unknown-never-negative"] },
  { twist: "mark-original", refusedBy: ["corrections-append"] },
  { twist: "wrong-link", refusedBy: ["corrections-append"] },
  { twist: "edit-in-place", refusedBy: ["verifier-field", "unknown-never-negative", "corrections-append"] },
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
  if (twist === "second-record" && event.attempt !== undefined) return { attempt: { ...event.attempt } };
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
        };
        rows.push(row);
        if (twist === "duplicate" && event.admission === "admission") rows.push({ ...row });
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
      rows.push({ decision: event.decision, corrects: twist === "wrong-link" ? index : index + 1, verifierOutcome, ...extraOf(decision, twist) });
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
  const ledger = open();
  const snapshots: string[][] = [];
  for (const event of journal) {
    ledger.record(event);
    snapshots.push(ledger.rows().map(row => JSON.stringify(row === undefined ? null : row) ?? "null"));
  }
  return { snapshots, rows: parsed(snapshots.at(-1) ?? []) };
}
/**
 * Furnace's own Attempt field naming why an Attempt ended (the SDK's TerminationCause, the AttemptDto's termination_cause): a
 * reason the Attempt stopped, never a causation relation between a score and an outcome, so its run of words carries no stem.
 */
const TERMINATION_CAUSE = "TerminationCause";
/** Whether a text, with every run of the Furnace termination-cause words dropped, holds a word carrying the causation stem. */
function carriesStem(text: string): boolean {
  const field = words(TERMINATION_CAUSE);
  const all = words(text);
  const dropped = new Set<number>();
  for (let index = 0; index + field.length <= all.length; index++) {
    if (field.every((word, offset) => all[index + offset] === word)) for (let offset = 0; offset < field.length; offset++) dropped.add(index + offset);
  }
  return all.some((word, index) => !dropped.has(index) && word.includes("caus"));
}
/** Every member name and string value, at any depth of a row, that carries the causation stem. */
function causal(value: unknown, path: string): string[] {
  if (typeof value === "string") return carriesStem(value) ? [`${path} value`] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => causal(item, `${path}/${index}`));
  if (!isObject(value)) return [];
  return Object.keys(value).flatMap(key => [...(carriesStem(key) ? [`${path}/${key} name`] : []), ...causal(value[key], `${path}/${key}`)]);
}
/** The members no-causation is shown: each with whether it must read the stem. */
const STEM_CONTROLS: readonly (readonly [Row, boolean])[] = [
  [{ causedBy: "score" }, true],
  [{ note: "caused by the score" }, true],
  [{ kind: "causation" }, true],
  [{ because: 1 }, true],
  [{ termination_cause: "operator_stop" }, false],
  [{ terminationCause: "external_termination" }, false],
  [{ note: "termination cause operator_stop; the score caused it" }, true],
];
/** The findings of the seven checks over one ledger's run, each opening with its check. */
function judge(result: Run, journal: readonly LedgerEvent[] = JOURNAL): string[] {
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
    if (event === undefined || isCorrection(row)) continue;
    if (!isObject(row) || !Object.hasOwn(row, "attemptRef") || row.attemptRef !== (event.attempt?.attempt_id ?? null)) out.push(`attempt-ref ${event.decision}`);
  }
  const seen = new Map<string, number>();
  for (const row of rows) {
    const event = caseOf(row);
    if (event === undefined) continue;
    let evidence: Evidence | undefined = event.verifier;
    if (isCorrection(row)) {
      const index = seen.get(event.decision) ?? 0;
      seen.set(event.decision, index + 1);
      evidence = journal.filter((entry): entry is Corrected => entry.kind === "corrected" && entry.decision === event.decision)[index]?.verifier;
    }
    const outcome = member(row, "verifierOutcome");
    const stopped = killed(event.attempt);
    if (!(VERIFIER_OUTCOMES as readonly unknown[]).includes(outcome)) out.push(`verifier-field ${event.decision}: not a verifier outcome`);
    else if (!stopped && evidence !== undefined && outcome !== READING[evidence]) out.push(`verifier-field ${event.decision}: ${String(outcome)} on ${evidence}`);
    if (stopped && outcome === "success") out.push(`killed-never-success ${event.decision}`);
    if (evidence !== "failed" && outcome === "failure") out.push(`unknown-never-negative ${event.decision}`);
  }
  for (const [step, event] of journal.entries()) {
    const before = step === 0 ? [] : (result.snapshots[step - 1] ?? []);
    const after = result.snapshots[step] ?? [];
    if (after.length < before.length || before.some((text, index) => after[index] !== text)) out.push(`corrections-append step ${step + 1}: an earlier row changed`);
    if (event.kind !== "corrected") continue;
    const original = parsed(before).findIndex(row => !isCorrection(row) && member(row, "decision") === event.decision) + 1;
    const added = parsed(after.slice(before.length));
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
/** Whether a text holds a vocabulary member as its run of words. */
function spells(text: string, name: string): boolean {
  const run = words(name);
  const all = words(text);
  return all.some((_, index) => run.every((word, offset) => all[index + offset] === word));
}
const spelled = (text: string): string[] => VOCABULARY.filter(name => spells(text, name));
const git = (...args: string[]): string => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
/** git's would-commit listing under src/ (tracked or untracked, never ignored), present files only, sorted. */
function srcFiles(): string[] {
  return git("ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "src").split("\0").filter(file => file !== "" && existsSync(join(ROOT, file))).sort();
}
const headText = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const pinText = (path: string): string => git("show", `${PI_PIN}:${path}`);
const lineOf = (text: string, line: number): string => text.split("\n")[line - 1] ?? "";
/** The members of an exported string-literal union in a declaration text. */
function unionOf(declarations: string, name: string): string[] {
  const match = new RegExp(`export type ${name} = ([^;]+);`).exec(declarations);
  return (match?.[1] ?? "").split("|").map(part => part.trim().replace(/^"|"$/g, "")).filter(part => part !== "");
}
const protocolText = (): string => readFileSync(join(dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json")), PROTOCOL), "utf8");
/** The ControlOutcome values a line or text declares. */
const outcomesIn = (text: string): string[] => unionOf(text, "ControlOutcome");

/** The control core, driven for real: a Furnace Run whose lifecycle ownership of its Attempt is native-confirmed, or not. */
const SCOPE: ObservationScope = { workspace: "/workspace/gp-receipt-census", principal: "census" };
const AT = "2026-10-28T00:00:00Z";
const RUN_REF: NativeRef = { provider: "furnace", type: "run", id: "frn-run-synthetic", scope: SCOPE.workspace };
const ATTEMPT_REF: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-synthetic", scope: SCOPE.workspace };
function projectionWith(kind: RelationKind): ObservationProjection {
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
  if (exportRow !== undefined) return exportRow;
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
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
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
};
interface Residual { readonly id: string; readonly name: string; readonly members: readonly string[] }
const RESIDUALS: readonly Residual[] = [
  { id: "Q1", name: "R-SPELLING", members: ["a member composed from pieces that split its words", "a member spelled with escapes", "the shortened name GraphPolicy", "the word gp"] },
  { id: "Q2", name: "R-SIDE-RECORD", members: ["a receipt kept outside rows()"] },
  { id: "Q3", name: "R-CAUSAL-WORDING", members: ["a credit member holding the score", "a reason saying the score led to the outcome"] },
  { id: "Q4", name: "R-SECOND-RECORD", members: ["the Attempt record copied into a row"] },
  { id: "Q5", name: "R-KILL-READING", members: ["an abandoned Attempt", "an Attempt whose process identity was lost"] },
];
/** The texts T1's reader is shown: each with the members it must read. */
const READER_CONTROLS: readonly (readonly [string, readonly string[]])[] = [
  ["export const verifierOutcome = 1;", ["verifierOutcome"]],
  ["const VERIFIER_OUTCOME = 2;", ["verifierOutcome"]],
  ["row.verifier_outcome", ["verifierOutcome"]],
  ["a GraphPolicyCLI host", ["GraphPolicyCLI"]],
  ["import('graph-policy-cli')", ["GraphPolicyCLI"]],
  ["verifierOutcomes", []],
  ["preverifierOutcome", []],
  ["GraphPolicyCLIs", []],
  ["graph policies", []],
];
/** Q1's plants: one per R-SPELLING member, each read as nothing. */
const SPELLING_PLANTS: readonly string[] = [
  'const name = "verif" + "ierOutcome";',
  'const name = "verifier\\u004Futcome";',
  "export const GraphPolicy = 1;",
  "const gp = load();",
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

const REACHED: { readonly pin: string; readonly same: boolean }[] = [];
/** A pin's one witness compare: recorded, then asserted. */
function witness(pin: string, observed: unknown, expected: unknown): void {
  REACHED.push({ pin, same: isDeepStrictEqual(observed, expected) });
  expect(observed, `${pin}: the observed reading is its witness`).toEqual(expected);
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
    const sorted = (values: readonly string[]): string[] => [...values].sort();
    witness("T2", {
      causes: isDeepStrictEqual(sorted(Object.keys(KILLED_CAUSES)), sorted(unionOf(declarations, TERMINATION_CAUSE))),
      states: isDeepStrictEqual(sorted(Object.keys(KILLED_STATES)), sorted(unionOf(declarations, "AttemptState"))),
      outcomes: isDeepStrictEqual(sorted(Object.keys(KILLED_OUTCOMES)), sorted(unionOf(declarations, "AttemptOutcome"))),
      killedBy: {
        causes: Object.keys(KILLED_CAUSES).filter(key => KILLED_CAUSES[key as TerminationCause]),
        states: Object.keys(KILLED_STATES).filter(key => KILLED_STATES[key as AttemptState]),
        outcomes: Object.keys(KILLED_OUTCOMES).filter(key => KILLED_OUTCOMES[key as AttemptOutcome]),
      },
    }, {
      causes: true, states: true, outcomes: true,
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
    witness("A1b", byTwist("duplicate", "drop-rejection", "boolean-admission"), { duplicate: ["one-row"], "drop-rejection": ["one-row"], "boolean-admission": ["one-row"] });
  },
  A2a: () => {
    witness("A2a", Object.fromEntries(originalsOf(honest().rows).map(row => [member(row, "decision"), member(row, "attemptRef")])), {
      verified: "atm-verified", rejected: null, refuted: "atm-refuted", awaiting: "atm-awaiting", stopped: "atm-stopped",
      terminated: "atm-terminated", lost: "atm-lost", "timed-out": "atm-timed-out",
    });
  },
  A2b: () => {
    witness("A2b", byTwist("fabricated-ref", "run-ref"), { "fabricated-ref": ["attempt-ref"], "run-ref": ["attempt-ref"] });
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
    witness("A5b", byTwist("killed-failure", "unknown-failure"), {
      "killed-failure": ["unknown-never-negative"], "unknown-failure": ["verifier-field", "unknown-never-negative"],
    });
  },
  A6a: () => {
    const result = honest();
    witness("A6a", {
      growth: result.snapshots.map((snapshot, step) => snapshot.length - (step === 0 ? 0 : (result.snapshots[step - 1]?.length ?? 0))),
      corrections: result.rows.filter(isCorrection),
    }, {
      growth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      corrections: [
        { decision: "refuted", corrects: 3, verifierOutcome: "success" }, { decision: "lost", corrects: 7, verifierOutcome: "failure" },
        { decision: "stopped", corrects: 5, verifierOutcome: "unavailable" },
      ],
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
    witness("S1b", { pin: outcomesIn(lineOf(pinText(CORE), 53)), head: outcomesIn(headText(CORE)) }, {
      pin: ["completed", "failed", "cancelled", "unknown"], head: ["completed", "failed", "cancelled", "unknown"],
    });
  },
  S2a: () => {
    witness("S2a", byTwist("boolean-admission", "boolean-verifier"), { "boolean-admission": ["one-row"], "boolean-verifier": ["verifier-field"] });
  },
  S2b: () => {
    const sentence = "rich producer status must not be flattened into a boolean";
    witness("S2b", { pin: lineOf(pinText(REGISTRY_DOC), 28).includes(sentence), head: headText(REGISTRY_DOC).includes(sentence) }, { pin: true, head: true });
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
    const edge = "no fabricated dependency edge";
    const causality = "Causality != ownership";
    witness("S3b", {
      pin: [lineOf(pinText(OBSERVATION_DOC), 91).includes(edge), lineOf(pinText(LIFECYCLE_DOC), 38).includes(causality)],
      head: [headText(OBSERVATION_DOC).includes(edge), headText(LIFECYCLE_DOC).includes(causality)],
    }, { pin: [true, true], head: [true, true] });
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
    witness("Q3", byTwist("credit", "led-to"), { credit: [], "led-to": [] });
  },
  Q4: () => {
    witness("Q4", byTwist("second-record"), { "second-record": [] });
  },
  Q5: () => {
    witness("Q5", { killed: UNKILLED_JOURNAL.map(event => event.kind === "decided" && killed(event.attempt)), findings: judge(run(succeeding, UNKILLED_JOURNAL), UNKILLED_JOURNAL) }, {
      killed: [false, false], findings: [],
    });
  },
};

const FROZEN_TITLE = "rule 16: the rows, the checks, the mutants, the journal, the vocabulary, the killed readings and the residual families are frozen at their measured shape";
const ANCHORS_TITLE = "the outside anchors: the bead's own row binds the trigger, the clauses, the anchors, the vocabulary, the admission and outcome sets and every pin quote; a later note binds nothing";
const LAST_TITLE = "registered tests: every pin case and fixed case, in order and in run mode, ran before this one; every pin reached its witness compare and each compare held";

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const body = PINS[pin];
        expect(body, `${pin} has a case`).toBeTypeOf("function");
        body?.();
      });
    }
  }

  it(FROZEN_TITLE, { timeout: LIVE_BUDGET_MS }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`), "rows and their pin counts").toEqual([
      "T:2", "A1:2", "A2:2", "A3:2", "A4:2", "A5:2", "A6:2", "A7:2", "S1:2", "S2:2", "S3:2", "S4:2", "Q:5",
    ]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(PINS), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...CHECKS], "the checks").toEqual(["one-row", "attempt-ref", "verifier-field", "killed-never-success", "unknown-never-negative", "corrections-append", "no-causation"]);
    expect(Object.entries(CHECK_OF).map(([id, check]) => `${id}:${check}`), "one check per Acceptance row").toEqual(ROWS.filter(row => /^A\d$/.test(row.id)).map((row, index) => `${row.id}:${CHECKS[index]}`));
    expect(MUTANTS.map(mutant => `${mutant.twist}:${mutant.refusedBy.join("+")}`), "the mutants and the checks each fails").toEqual([
      "duplicate:one-row", "drop-rejection:one-row", "boolean-admission:one-row", "fabricated-ref:attempt-ref", "run-ref:attempt-ref",
      "boolean-verifier:verifier-field", "native-outcome:verifier-field+unknown-never-negative", "rejection-as-failure:verifier-field+unknown-never-negative",
      "killed-pass:killed-never-success", "terminal-success:killed-never-success", "killed-failure:unknown-never-negative",
      "unknown-failure:verifier-field+unknown-never-negative", "mark-original:corrections-append", "wrong-link:corrections-append",
      "edit-in-place:verifier-field+unknown-never-negative+corrections-append", "caused-by:no-causation", "causation-relation:no-causation",
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
      "Q1:R-SPELLING:4", "Q2:R-SIDE-RECORD:1", "Q3:R-CAUSAL-WORDING:2", "Q4:R-SECOND-RECORD:1", "Q5:R-KILL-READING:2",
    ]);
    expect(RESIDUALS.map(residual => residual.id), "one residual family per row Q pin").toEqual(ROWS.find(row => row.id === "Q")?.pins);
    expect(RESIDUALS.map(residual => QUOTES[residual.id]), "each row Q pin quotes its family").toEqual(RESIDUALS.map(residual => residual.name));
    expect([SPELLING_PLANTS.length, UNKILLED_JOURNAL.length], "a plant per R-SPELLING member and per R-KILL-READING member").toEqual([4, 2]);
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
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(row.pins.map(pin => QUOTES[pin] ?? "").join(" "), `row ${row.id}'s pin quotes, joined, are its label`).toBe(row.label);
    }
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
  });
});
