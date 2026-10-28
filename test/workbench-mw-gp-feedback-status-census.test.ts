/**
 * wb-e66.4 (MW-GRAPH-POLICY-COORDINATION-R9, program-triage-2026-10-18), the R7 feedback-status honesty census.
 * Statement (bead title, verbatim): "(merge into R7) R7 feedback status shall be a closed set in which only an observed
 * verifier/receipt outcome may carry reward; pending or unknown feedback never carries reward; a team-level outcome is
 * recorded once on the episode and never copied into per-actor reward or causal benefit; corrections and promotion are
 * appended as operator facts outside the policy's own evaluation, never rewriting a decision." Its four clauses are the
 * labels of rows S1-S4.
 * Acceptance (owner filing, verbatim; the labels of rows A1-A4): "the schema refuses a reward value on pending/unknown
 * status; a per-actor record whose reward equals a team-outcome-derived value with no actor-level verifier ref is refused;
 * a correction appends a new record referencing the corrected one and the original bytes stay; a promotion decision is a
 * separate operator fact, never a field the policy path writes." The filing's absence sentence, "no Pi text binds a reward
 * or feedback-status field because none exists", is row N's label; the bead is the filing's MERGE CANDIDATE into the R7
 * bead as its honesty clause, and no R7 bead or Pi R7 record exists, so the record this census judges is test-only.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at trunk df37dac). Producer (the local MechanicalWorkflows
 * checkout, git show at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8; the roster's producer block holds both
 * cited lines and their blobs, and this census never re-reads the producer): docs/programs/graph-policy-coordination-2026-10-18/README.md
 * (blob 0dbff582a14c) :15 ends "Unknown/pending feedback cannot be invented as observed reward; global team outcome alone
 * does not attribute causal benefit to each actor." and docs/programs/graph-policy-coordination-2026-10-18.md (blob
 * 01ff00d480ec) :16 ends "Feedback corrections and promotion remain outside the policy's evaluation." Pi: git's src
 * listing holds no file naming a vocabulary word (below); at the filing pin 758ec18187a5d66ba40b766caad38754b5313558 git's
 * objects hold 115 src, 410 test and 59 docs blobs and none names one. The filing's other three search words are Pi's own
 * words with other meanings: "pending" (24 src files), "causal" (5: the observed-causal relation class, causalClaim,
 * "causal gains") and "attribution" (1). The live test tree names "reward" in three landed files (a GraphPolicyCLI error
 * code and a producer quote held as census data) besides this cut's two files. docs/workbench/09 lines 69, 71 and 73-75 and
 * docs/workbench/18 line 29 (the filing's citations) are byte-identical at the filing pin and at the base, at the same
 * line numbers.
 *
 * READINGS.
 * - THE MODEL (this file; test-only, src untouched): an episode's R7 feedback log, append-only, of five record kinds: the
 *   episode's team outcome (written by the host, carrying the episode's actors), the policy path's decisions, per-actor
 *   feedback (host), and the operator facts - corrections (naming the record they correct) and promotions (naming what
 *   was promoted). Feedback status is the closed set observed, pending, unknown (the producer's three words); an outcome
 *   is a verifier's outcome or a source receipt, at an actor's level or the team's, with a non-empty reference.
 * - THE REFERENCE validator appends a record to a log or refuses it typed, {ok: false, code, record, field?}, reading in
 *   order: rewrite (the id is already in the log), operator-fact-writer (a correction or promotion not written by the
 *   operator), operator-field (a promotion field on any record, or a corrects field off a correction: a promotion is its
 *   own record), correction-unreferenced (a correction naming no record of the log), status-outside-set (a feedback-bearing
 *   record whose status is missing or outside the set, compared exactly), reward-on-unobserved (a reward or causal benefit,
 *   zero included, on pending or unknown), observed-without-outcome (observed with no verifier or receipt outcome and a
 *   reference), team-outcome-twice (a second team outcome for one episode) and team-outcome-copied (a per-actor reward or
 *   causal benefit - feedback, or a correction of a per-actor record - equal to the episode's team reward or its even share
 *   over the episode's actors, with no actor-level verifier reference). An admitted record is appended: the log returned is
 *   the input plus the record, every prior record byte-identical, and the caller's log untouched.
 * - THE CHECKS (judged by value, each over its own hand-authored cases): K-STATUS, K-REWARD, K-TEAM, K-APPEND, K-OPERATOR.
 *   A case reads "ok", the typed refusal as code or code:field, or what went wrong (a caller log mutated, an admitted log
 *   that is not the input plus the record, a refusal naming another record). MUTANTS: 29 validators, one fault each,
 *   each refused by exactly its declared checks; every check refuses one alone, and every typed refusal is some case's.
 * - THE ARMED REGISTRATIONS (SITES, empty today): a src module that names the vocabulary must register its validator
 *   there, and every check then judges it beside the reference; an unregistered naming module, a stale registration and a
 *   duplicate are findings.
 * - THE SRC READING (row N): every path git lists under src/ (tracked, plus untracked files git does not ignore), each a
 *   regular file read as text; a listed path that is not a regular file is unread, never skipped. A vocabulary word
 *   (reward and team outcome, the filing's search words Pi's src never uses; feedback status and causal benefit, the
 *   statement's R7 terms) is read case-insensitively anywhere in the path or the text, with any run of whitespace, dot,
 *   underscore, hyphen or format character (Cf) between its parts (separators and camel humps). The filing pin is read
 *   the same way from git's objects under src, test and docs.
 *
 * ROWS. A1-A4, the acceptance's four clauses; S1-S4, the statement's four clauses; P, the filing's docs/workbench/09
 * reading of the principle Pi already holds for projection data (each cited line read at the filing pin and found whole in
 * the live page); C, its docs/workbench/18 reading; N, the filing's absence sentence; Q, the residuals' pinned quiet rows.
 * RESIDUALS (named families, each member a pinned quiet row; a reading that starts reading a member reds its row):
 * R-COMPOSED (Q1: a word split by something other than the reading's separators - an operator, a comment, a quote - or
 * escaped, spelled with a homoglyph or joined at run time), R-SHARED-WORD (Q2: the filing's search words pending, causal
 * and attribution, Pi words with other meanings), R-UNNAMED-RECORD (Q3: a module that shapes a score or feedback record
 * and names no vocabulary word: what an R7 record means without its words is outside a text reading),
 * R-OTHER-DERIVATION (Q4: a per-actor value derived from the team outcome by other arithmetic - a weighted share, a
 * rounded share, the team reward less another actor's - is admitted: the check reads equality with the team reward and
 * its even share only), R-TEST-MENTION (Q5: a test file naming the vocabulary as text, this cut's census and roster
 * included, is outside the src leg) and R-COORDINATED (Q6: a pin, a case, a code, a mutant or a residual member removed from
 * every literal of this file and the roster at once is quiet unless an anchor outside those literals reads it; its pinned
 * row computes the pin partition - every pin of rows A, S, P, C and N removed that way is reported by the export's bindings,
 * row Q's pins are the quiet set - and no outside anchor reads a case, a code, a mutant or a residual member).
 * NOT CLAIMED: an R7 record in Pi or its full field list (R8 = wb-e66.3 owns the field list; this census judges the
 * honesty clause on a test-only record); who may write per-actor feedback beyond the operator facts; a reward the policy
 * path writes on its own decision; that a verifier or receipt reference resolves; docs and test text outside the filing
 * pin (the live legs read src); that a producer line reads the same past the pin; the members of R-COORDINATED (the
 * labels, the statuses, the vocabulary, the shared words, the docs lines and the producer lines are anchored outside this
 * file).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and the shape of every table
 * as literals; the judged set (every row's id, label and pins, every pin's quote and witness, the cases and their
 * expectations, the mutants and their declared checks, the residual members, every registered test title) is held to the
 * out-of-file roster test/fixtures/mw-gp-feedback-status-roster.json, in order and both ways.
 * OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export (.beads/issues.jsonl) - the title
 * is the requirement id, the merge tag and rows S1-S4's labels joined; each acceptance clause is exactly one A row's label;
 * rows P and C are the docs citation's parentheticals and row N the absence sentence; each row's pin quotes tile its
 * label with nothing but separators; the statuses are the ones rows S1 and S2 name; the filing's search words are the
 * vocabulary's filing words and the shared words, in order, and its statement words are the R7 term row S1 opens with and
 * the per-actor term row S3 ends with; the docs lines and the filing pin are the citation's; the
 * never-causation beads are the filing's and their titles say so; the producer block's paths, lines and pin are the
 * source citations', and it carries their quotes. The last case reads the vitest task tree (every registered test, in
 * roster order, in run mode, ran before it) and REACHED (every pin reached its witness compare, and each compare's own
 * result).
 *
 * Display paths added: none. Test-only: no src change, no R7 record, schema, adapter, seam or fake binary.
 */
import { execFileSync } from "node:child_process";
import { lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-e66.4";
const REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R9";
const MERGE_TAG = "(merge into R7)";
const SUITE = `mw gp feedback status census (${BEAD}, ${REQUIREMENT})`;
const CENSUS_PATH = "test/workbench-mw-gp-feedback-status-census.test.ts";
const ROSTER_PATH = "test/fixtures/mw-gp-feedback-status-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The filing's Pi pin (the docs citations, and the "none exists" reading) and the producer pin (the source citations). */
const FILING_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const PRODUCER_PIN = "4b8b974ca72bf2ed36b99e315e45857c6181fbe8";
const DOCS_09 = "docs/workbench/09-observation-and-provenance.md";
const DOCS_18 = "docs/workbench/18-decisions-and-risks.md";
/** The filing's never-causation gating beads. */
const NEVER_CAUSATION: readonly string[] = ["wb-4ap.12", "wb-4ap.15"];
/** The roots the filing pin is read under (Pi's text: the product, its tests and its docs). */
const PIN_SCOPES: readonly string[] = ["src", "test", "docs"];
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** A src module the listing must read, with a line it must hold: a shared word (causal) in Pi's own sense. */
const SRC_ANCHOR = { path: "src/workbench/topology-slice.ts", token: '"observed-causal"' };
const LIVE_BUDGET_MS = 60_000;

// ---- the model ----

/** R7's feedback status, a closed set: the producer's observed, pending and unknown (README.md:15). */
const STATUSES: readonly string[] = ["observed", "pending", "unknown"];
type Writer = "policy" | "host" | "operator";
type Kind = "team-outcome" | "decision" | "feedback" | "correction" | "promotion";
/** An observed outcome's basis: a verifier's outcome or a source receipt, at an actor's level or the team's. */
interface Outcome {
  readonly kind: "verifier" | "receipt";
  readonly ref: string;
  readonly level: "actor" | "team";
}
/** One record of an episode's append-only feedback log; a field a kind does not use is absent. */
interface FeedbackRecord {
  readonly id: string;
  readonly kind: Kind;
  readonly writer: Writer;
  readonly episode: string;
  /** team-outcome: the episode's actors. */
  readonly actors?: readonly string[];
  /** decision and feedback: the actor the record is about. */
  readonly actor?: string;
  /** team-outcome, feedback and correction. */
  readonly status?: string;
  /** The team's reward on a team outcome; an actor's on feedback or a correction. */
  readonly reward?: number;
  /** An actor's attributed causal benefit, on feedback or a correction. */
  readonly causalBenefit?: number;
  readonly outcome?: Outcome;
  /** correction: the record it corrects. */
  readonly corrects?: string;
  /** promotion: what the operator promoted. */
  readonly subject?: string;
  /** Never admitted on any record: a promotion is its own record (A4). */
  readonly promotion?: string;
}
type Log = readonly FeedbackRecord[];
/** The typed refusals, in the order the reference reads them. */
const CODES: readonly string[] = [
  "rewrite",
  "operator-fact-writer",
  "operator-field",
  "correction-unreferenced",
  "status-outside-set",
  "reward-on-unobserved",
  "observed-without-outcome",
  "team-outcome-twice",
  "team-outcome-copied",
];
type Appended = { readonly ok: true; readonly log: Log } | { readonly ok: false; readonly code: string; readonly record: string; readonly field?: string };
interface Validator {
  readonly append: (log: Log, record: FeedbackRecord) => Appended;
}
const VALUE_FIELDS = ["reward", "causalBenefit"] as const;
type ValueField = (typeof VALUE_FIELDS)[number];
const fieldValue = (record: FeedbackRecord, field: ValueField): number | undefined => (field === "reward" ? record.reward : record.causalBenefit);

/** The values a per-actor record could copy from the episode's team outcome: the team's reward and its even share. */
function derivedValues(log: Log, episode: string, shareUnread = false): number[] {
  const team = log.find(entry => entry.kind === "team-outcome" && entry.episode === episode);
  const reward = team?.reward;
  if (reward === undefined) return [];
  const count = team?.actors?.length ?? 0;
  return count > 0 && !shareUnread ? [reward, reward / count] : [reward];
}

// ---- the reference validator and its faults ----

/** One fault a mutant switches on; the reference switches none. */
type Fault =
  | "open-status"
  | "missing-status-observed"
  | "case-folded-status"
  | "reward-on-pending"
  | "reward-on-unknown"
  | "unobserved-causal-benefit-unread"
  | "outcome-optional"
  | "any-outcome-kind"
  | "empty-ref"
  | "zero-reward-absent"
  | "team-outcome-twice-admitted"
  | "team-copy-unread"
  | "team-level-ref"
  | "receipt-as-verifier"
  | "causal-benefit-uncopied"
  | "share-unread"
  | "correction-bypasses-team"
  | "rewrite-admitted"
  | "correction-in-place"
  | "dangling-correction"
  | "unreferenced-correction"
  | "mutating-append"
  | "promotion-writer-unread"
  | "correction-writer-unread"
  | "promotion-field-unread"
  | "corrects-field-unread"
  | "untyped-refusal"
  | "refusal-unnamed"
  | "refuse-every-record";

function validatorWith(faults: ReadonlySet<Fault>): Validator {
  const has = (fault: Fault): boolean => faults.has(fault);
  const refuse = (record: FeedbackRecord, code: string, field?: string): Appended => {
    if (has("untyped-refusal")) return { ok: false, code: "refused", record: record.id };
    const named = has("refusal-unnamed") ? "-" : record.id;
    return field === undefined ? { ok: false, code, record: named } : { ok: false, code, record: named, field };
  };
  const present = (value: number | undefined): boolean => (has("zero-reward-absent") ? value !== undefined && value !== 0 : value !== undefined);
  const statusOf = (record: FeedbackRecord): string | undefined => (record.status === undefined && has("missing-status-observed") ? "observed" : record.status);
  const inSet = (status: string | undefined): boolean => {
    if (status === undefined) return false;
    if (has("open-status")) return status !== "";
    return STATUSES.includes(has("case-folded-status") ? status.toLowerCase() : status);
  };
  const observedBasis = (outcome: Outcome | undefined): boolean =>
    outcome !== undefined && (has("any-outcome-kind") || outcome.kind === "verifier" || outcome.kind === "receipt") && (has("empty-ref") || outcome.ref !== "");
  const actorLevelVerifier = (outcome: Outcome | undefined): boolean =>
    outcome !== undefined &&
    outcome.ref !== "" &&
    (outcome.kind === "verifier" || (has("receipt-as-verifier") && outcome.kind === "receipt")) &&
    (outcome.level === "actor" || has("team-level-ref"));
  return {
    append(log, record) {
      if (has("refuse-every-record")) return { ok: false, code: "refused", record: record.id };
      const prior = log.findIndex(entry => entry.id === record.id);
      if (prior >= 0 && !has("rewrite-admitted")) return refuse(record, "rewrite");
      const writerUnread = (record.kind === "promotion" && has("promotion-writer-unread")) || (record.kind === "correction" && has("correction-writer-unread"));
      if ((record.kind === "correction" || record.kind === "promotion") && record.writer !== "operator" && !writerUnread) return refuse(record, "operator-fact-writer");
      if (record.promotion !== undefined && !has("promotion-field-unread")) return refuse(record, "operator-field", "promotion");
      if (record.corrects !== undefined && record.kind !== "correction" && !has("corrects-field-unread")) return refuse(record, "operator-field", "corrects");
      const corrected = record.corrects === undefined ? undefined : log.find(entry => entry.id === record.corrects);
      if (record.kind === "correction") {
        const unreferenced = record.corrects === undefined ? !has("unreferenced-correction") : corrected === undefined && !has("dangling-correction");
        if (unreferenced) return refuse(record, "correction-unreferenced");
      }
      if (record.kind === "team-outcome" || record.kind === "feedback" || record.kind === "correction") {
        const status = statusOf(record);
        if (!inSet(status)) return refuse(record, "status-outside-set");
        const admittedHere = (status === "pending" && has("reward-on-pending")) || (status === "unknown" && has("reward-on-unknown"));
        if (status !== "observed" && !admittedHere) {
          for (const field of VALUE_FIELDS) {
            if (field === "causalBenefit" && has("unobserved-causal-benefit-unread")) continue;
            if (present(fieldValue(record, field))) return refuse(record, "reward-on-unobserved", field);
          }
        }
        if (status === "observed" && !has("outcome-optional") && !observedBasis(record.outcome)) return refuse(record, "observed-without-outcome");
      }
      if (record.kind === "team-outcome" && !has("team-outcome-twice-admitted") && log.some(entry => entry.kind === "team-outcome" && entry.episode === record.episode)) {
        return refuse(record, "team-outcome-twice");
      }
      const actor =
        record.kind === "correction" ? (has("correction-bypasses-team") ? undefined : (record.actor ?? corrected?.actor)) : record.kind === "feedback" ? record.actor : undefined;
      if (actor !== undefined && !has("team-copy-unread")) {
        const derived = derivedValues(log, record.episode, has("share-unread"));
        for (const field of VALUE_FIELDS) {
          if (field === "causalBenefit" && has("causal-benefit-uncopied")) continue;
          const value = fieldValue(record, field);
          if (value !== undefined && derived.includes(value) && !actorLevelVerifier(record.outcome)) return refuse(record, "team-outcome-copied", field);
        }
      }
      if (has("mutating-append")) {
        (log as FeedbackRecord[]).push(record);
        return { ok: true, log };
      }
      if (has("correction-in-place") && record.kind === "correction" && corrected !== undefined) return { ok: true, log: [...log.filter(entry => entry !== corrected), record] };
      if (prior >= 0) return { ok: true, log: [...log.slice(0, prior), ...log.slice(prior + 1), record] };
      return { ok: true, log: [...log, record] };
    },
  };
}
const REFERENCE: Validator = validatorWith(new Set());

// ---- the fixtures ----

const EPISODE = "ep-1";
const ACTORS: readonly string[] = ["a1", "a2", "a3"];
/** The team's observed reward; its even share over the three actors is 4. */
const TEAM_REWARD = 12;
const actorVerifier = (actor: string): Outcome => ({ kind: "verifier", ref: `verifier:${actor}`, level: "actor" });
const actorReceipt = (actor: string): Outcome => ({ kind: "receipt", ref: `receipt:${actor}`, level: "actor" });
const teamVerifier = (episode: string): Outcome => ({ kind: "verifier", ref: `verifier:${episode}`, level: "team" });
const teamReceipt = (episode: string): Outcome => ({ kind: "receipt", ref: `receipt:${episode}`, level: "team" });
/** An outcome kind outside verifier/receipt, as a producer could send it. */
const SELF_REPORT = { kind: "self-report", ref: "self:a2", level: "actor" } as unknown as Outcome;
type Fields = Omit<Partial<FeedbackRecord>, "id">;
const teamOutcome = (id: string, episode: string, actors: readonly string[], fields: Fields): FeedbackRecord => ({ id, kind: "team-outcome", writer: "host", episode, actors, ...fields });
const decision = (id: string, actor: string, fields: Fields = {}): FeedbackRecord => ({ id, kind: "decision", writer: "policy", episode: EPISODE, actor, ...fields });
const feedback = (id: string, fields: Fields): FeedbackRecord => ({ id, kind: "feedback", writer: "host", episode: EPISODE, actor: "a2", ...fields });
const correction = (id: string, fields: Fields): FeedbackRecord => ({ id, kind: "correction", writer: "operator", episode: EPISODE, ...fields });
const promotion = (id: string, fields: Fields): FeedbackRecord => ({ id, kind: "promotion", writer: "operator", episode: EPISODE, subject: "d1", ...fields });

const TEAM = teamOutcome("t1", EPISODE, ACTORS, { status: "observed", reward: TEAM_REWARD, outcome: teamVerifier(EPISODE) });
const D1 = decision("d1", "a1");
const D2 = decision("d2", "a2");
const F1 = feedback("f1", { actor: "a1", status: "observed", reward: 5, outcome: actorVerifier("a1") });
/** The base log: the episode's team outcome, two policy decisions and a1's observed feedback. */
const BASE: Log = [TEAM, D1, D2, F1];

// ---- the cases ----

interface Case {
  readonly id: string;
  readonly log: Log;
  readonly record: FeedbackRecord;
  /** "ok", or the typed refusal as "<code>" or "<code>:<field>". */
  readonly expected: string;
}
const at = (id: string, log: Log, record: FeedbackRecord, expected: string): Case => ({ id, log, record, expected });

const STATUS_CASES: readonly Case[] = [
  at("s-observed", BASE, feedback("s1", { status: "observed", reward: 2, outcome: actorReceipt("a2") }), "ok"),
  at("s-pending", BASE, feedback("s2", { status: "pending" }), "ok"),
  at("s-unknown", BASE, feedback("s3", { status: "unknown" }), "ok"),
  at("s-other", BASE, feedback("s4", { status: "verified", reward: 2, outcome: actorReceipt("a2") }), "status-outside-set"),
  at("s-missing", BASE, feedback("s5", {}), "status-outside-set"),
  at("s-case", BASE, feedback("s6", { status: "Observed", reward: 2, outcome: actorReceipt("a2") }), "status-outside-set"),
  at("s-empty", BASE, feedback("s7", { status: "" }), "status-outside-set"),
  at("s-team", [], teamOutcome("t9", "ep-9", ["b1"], { status: "final" }), "status-outside-set"),
  at("s-correction", BASE, correction("s8", { corrects: "f1", status: "corrected" }), "status-outside-set"),
];
const REWARD_CASES: readonly Case[] = [
  at("r-verifier", BASE, feedback("r1", { status: "observed", reward: 5, outcome: actorVerifier("a2") }), "ok"),
  at("r-receipt", BASE, feedback("r2", { status: "observed", reward: 2, outcome: actorReceipt("a2") }), "ok"),
  at("r-pending-bare", BASE, feedback("r3", { status: "pending" }), "ok"),
  at("r-pending", BASE, feedback("r4", { status: "pending", reward: 3 }), "reward-on-unobserved:reward"),
  at("r-unknown", BASE, feedback("r5", { status: "unknown", reward: 3 }), "reward-on-unobserved:reward"),
  at("r-pending-zero", BASE, feedback("r6", { status: "pending", reward: 0 }), "reward-on-unobserved:reward"),
  at("r-unknown-causal", BASE, feedback("r7", { status: "unknown", causalBenefit: 1 }), "reward-on-unobserved:causalBenefit"),
  at("r-pending-receipt", BASE, feedback("r8", { status: "pending", reward: 3, outcome: actorReceipt("a2") }), "reward-on-unobserved:reward"),
  at("r-team-pending", [], teamOutcome("t8", "ep-8", ["b1", "b2"], { status: "pending", reward: 12 }), "reward-on-unobserved:reward"),
  at("r-correction-unknown", BASE, correction("r9", { corrects: "f1", status: "unknown", reward: 5 }), "reward-on-unobserved:reward"),
  at("r-no-outcome", BASE, feedback("r10", { status: "observed", reward: 5 }), "observed-without-outcome"),
  at("r-empty-ref", BASE, feedback("r11", { status: "observed", reward: 5, outcome: { kind: "verifier", ref: "", level: "actor" } }), "observed-without-outcome"),
  at("r-self-report", BASE, feedback("r12", { status: "observed", reward: 5, outcome: SELF_REPORT }), "observed-without-outcome"),
  at("r-observed-bare", BASE, feedback("r13", { status: "observed" }), "observed-without-outcome"),
];
const TEAM_CASES: readonly Case[] = [
  at("t-once", [], teamOutcome("t2", "ep-2", ["b1", "b2"], { status: "observed", reward: 8, outcome: teamVerifier("ep-2") }), "ok"),
  at("t-twice", BASE, teamOutcome("t3", EPISODE, ACTORS, { status: "observed", reward: 9, outcome: teamReceipt(EPISODE) }), "team-outcome-twice"),
  at("t-twice-pending", BASE, teamOutcome("t4", EPISODE, ACTORS, { status: "pending" }), "team-outcome-twice"),
  at("t-other-episode", BASE, teamOutcome("t5", "ep-5", ["c1"], { status: "unknown" }), "ok"),
  at("t-copy-reward", BASE, feedback("c1", { status: "observed", reward: 12, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-copy-share", BASE, feedback("c2", { status: "observed", reward: 4, outcome: teamVerifier(EPISODE) }), "team-outcome-copied:reward"),
  at("t-copy-share-receipt", BASE, feedback("c3", { status: "observed", reward: 4, outcome: teamReceipt(EPISODE) }), "team-outcome-copied:reward"),
  at("t-copy-causal", BASE, feedback("c4", { status: "observed", causalBenefit: 4, outcome: actorReceipt("a2") }), "team-outcome-copied:causalBenefit"),
  at("t-copy-causal-team", BASE, feedback("c5", { status: "observed", reward: 5, causalBenefit: 12, outcome: actorReceipt("a2") }), "team-outcome-copied:causalBenefit"),
  at("t-actor-verifier", BASE, feedback("c6", { status: "observed", reward: 4, causalBenefit: 4, outcome: actorVerifier("a2") }), "ok"),
  at("t-not-derived", BASE, feedback("c7", { status: "observed", reward: 2.5, outcome: actorReceipt("a2") }), "ok"),
  at("t-correction-copy", BASE, correction("c8", { corrects: "f1", status: "observed", reward: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:reward"),
  at("t-correction-team", BASE, correction("c9", { corrects: "t1", status: "observed", reward: 12, outcome: teamVerifier(EPISODE) }), "ok"),
  at("t-no-team", [D1], feedback("c10", { actor: "a1", status: "observed", reward: 12, outcome: actorReceipt("a1") }), "ok"),
];
const APPEND_CASES: readonly Case[] = [
  at("a-correct-feedback", BASE, correction("k1", { corrects: "f1", status: "observed", reward: 6, outcome: actorVerifier("a1") }), "ok"),
  at("a-correct-decision", BASE, correction("k2", { corrects: "d1", status: "unknown" }), "ok"),
  at("a-first", [], decision("d7", "a1", { episode: "ep-7" }), "ok"),
  at("a-rewrite-decision", BASE, decision("d1", "a3"), "rewrite"),
  at("a-rewrite-feedback", BASE, { ...F1, reward: 6 }, "rewrite"),
  at("a-rewrite-by-correction", BASE, correction("f1", { corrects: "f1", status: "observed", reward: 6, outcome: actorVerifier("a1") }), "rewrite"),
  at("a-unreferenced", BASE, correction("k3", { status: "unknown" }), "correction-unreferenced"),
  at("a-dangling", BASE, correction("k4", { corrects: "f9", status: "unknown" }), "correction-unreferenced"),
];
const OPERATOR_CASES: readonly Case[] = [
  at("o-promotion", BASE, promotion("p1", {}), "ok"),
  at("o-decision", BASE, decision("p2", "a3"), "ok"),
  at("o-promotion-policy", BASE, promotion("p3", { writer: "policy" }), "operator-fact-writer"),
  at("o-promotion-host", BASE, promotion("p4", { writer: "host" }), "operator-fact-writer"),
  at("o-correction-policy", BASE, correction("p5", { writer: "policy", corrects: "f1", status: "unknown" }), "operator-fact-writer"),
  at("o-correction-host", BASE, correction("p6", { writer: "host", corrects: "f1", status: "unknown" }), "operator-fact-writer"),
  at("o-decision-promotion", BASE, decision("p7", "a3", { promotion: "promoted" }), "operator-field:promotion"),
  at("o-decision-corrects", BASE, decision("p8", "a3", { corrects: "f1" }), "operator-field:corrects"),
  at("o-feedback-promotion", BASE, feedback("p9", { status: "pending", promotion: "promoted" }), "operator-field:promotion"),
];

// ---- the checks ----

type Check = "K-STATUS" | "K-REWARD" | "K-TEAM" | "K-APPEND" | "K-OPERATOR";
const CHECKS: readonly Check[] = ["K-STATUS", "K-REWARD", "K-TEAM", "K-APPEND", "K-OPERATOR"];
const CASES: Readonly<Record<Check, readonly Case[]>> = {
  "K-STATUS": STATUS_CASES,
  "K-REWARD": REWARD_CASES,
  "K-TEAM": TEAM_CASES,
  "K-APPEND": APPEND_CASES,
  "K-OPERATOR": OPERATOR_CASES,
};
const ALL_CASES: readonly Case[] = CHECKS.flatMap(check => CASES[check]);
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

/** What a validator does with a case: "ok", the typed refusal, or what went wrong. The validator gets copies. */
function readingOf(validator: Validator, entry: Case): string {
  const log = clone(entry.log);
  const before = JSON.stringify(log);
  const appended = validator.append(log, clone(entry.record));
  if (JSON.stringify(log) !== before) return "caller log mutated";
  if (!appended.ok) return `${appended.code}${appended.field === undefined ? "" : `:${appended.field}`}${appended.record === entry.record.id ? "" : " (record unnamed)"}`;
  return JSON.stringify(appended.log) === JSON.stringify([...entry.log, entry.record]) ? "ok" : "ok, log not the input plus the record";
}
type Verdict = Readonly<Record<Check, readonly string[]>>;
function judge(validator: Validator): Verdict {
  const findingsOf = (check: Check): string[] =>
    CASES[check].flatMap(entry => {
      const read = readingOf(validator, entry);
      return read === entry.expected ? [] : [`${entry.id}: read ${read}, expected ${entry.expected}`];
    });
  return {
    "K-STATUS": findingsOf("K-STATUS"),
    "K-REWARD": findingsOf("K-REWARD"),
    "K-TEAM": findingsOf("K-TEAM"),
    "K-APPEND": findingsOf("K-APPEND"),
    "K-OPERATOR": findingsOf("K-OPERATOR"),
  };
}
const refusing = (verdict: Verdict): Check[] => CHECKS.filter(check => verdict[check].length > 0);
const FALLBACK_CASE: Case = at("-", [], decision("-", "-"), "-");
function caseOf(id: string): Case {
  const found = ALL_CASES.find(entry => entry.id === id);
  expect(found, `case ${id} exists`).toBeDefined();
  return found ?? FALLBACK_CASE;
}
const readingsOf = (ids: readonly string[]): Record<string, string> => Object.fromEntries(ids.map(id => [id, readingOf(REFERENCE, caseOf(id))]));
const caseLine = (entry: Case): string => `${entry.id}=${entry.expected}`;

// ---- the mutants ----

interface Mutant {
  readonly id: string;
  readonly fault: Fault;
  readonly refusedBy: readonly Check[];
  readonly validator: Validator;
}
const ALL_CHECKS: readonly Check[] = CHECKS;
const mutant = (id: string, fault: Fault, refusedBy: readonly Check[]): Mutant => ({ id, fault, refusedBy, validator: validatorWith(new Set([fault])) });
const MUTANTS: readonly Mutant[] = [
  mutant("M01", "open-status", ["K-STATUS"]),
  mutant("M02", "missing-status-observed", ["K-STATUS"]),
  mutant("M03", "case-folded-status", ["K-STATUS"]),
  mutant("M04", "reward-on-pending", ["K-REWARD"]),
  mutant("M05", "reward-on-unknown", ["K-REWARD"]),
  mutant("M06", "unobserved-causal-benefit-unread", ["K-REWARD"]),
  mutant("M07", "outcome-optional", ["K-REWARD"]),
  mutant("M08", "any-outcome-kind", ["K-REWARD"]),
  mutant("M09", "empty-ref", ["K-REWARD"]),
  mutant("M10", "zero-reward-absent", ["K-REWARD"]),
  mutant("M11", "team-outcome-twice-admitted", ["K-TEAM"]),
  mutant("M12", "team-copy-unread", ["K-TEAM"]),
  mutant("M13", "team-level-ref", ["K-TEAM"]),
  mutant("M14", "receipt-as-verifier", ["K-TEAM"]),
  mutant("M15", "causal-benefit-uncopied", ["K-TEAM"]),
  mutant("M16", "share-unread", ["K-TEAM"]),
  mutant("M17", "correction-bypasses-team", ["K-TEAM"]),
  mutant("M18", "rewrite-admitted", ["K-APPEND"]),
  mutant("M19", "correction-in-place", ["K-TEAM", "K-APPEND"]),
  mutant("M20", "dangling-correction", ["K-APPEND"]),
  mutant("M21", "unreferenced-correction", ["K-APPEND"]),
  mutant("M22", "mutating-append", ALL_CHECKS),
  mutant("M23", "promotion-writer-unread", ["K-OPERATOR"]),
  mutant("M24", "correction-writer-unread", ["K-OPERATOR"]),
  mutant("M25", "promotion-field-unread", ["K-OPERATOR"]),
  mutant("M26", "corrects-field-unread", ["K-OPERATOR"]),
  mutant("M27", "untyped-refusal", ALL_CHECKS),
  mutant("M28", "refusal-unnamed", ALL_CHECKS),
  mutant("M29", "refuse-every-record", ALL_CHECKS),
];
const mutantLine = (entry: Mutant): string => `${entry.id}:${entry.fault}:${entry.refusedBy.join("+")}`;

// ---- the armed registrations ----

interface Site {
  readonly path: string;
  readonly validator: Validator;
}
/** A src module naming the vocabulary must register its validator here; every check then judges it beside the reference. Empty: the gate has not fired. */
const SITES: readonly Site[] = [];
/** Every validator the checks judge: the reference, then each registration. */
const JUDGED: readonly { readonly name: string; readonly validator: Validator }[] = [
  { name: "reference", validator: REFERENCE },
  ...SITES.map(site => ({ name: site.path, validator: site.validator })),
];

// ---- the src reading ----

interface Word {
  readonly id: string;
  readonly spelling: string;
  /** "filing": one of the filing's search words; "statement": an R7 term of the statement. */
  readonly source: "filing" | "statement";
}
/** The filing's search words Pi's src never uses (V1, V2, in the filing's order) and the statement's two R7 terms (V3, V4). */
const VOCABULARY: readonly Word[] = [
  { id: "V1", spelling: "reward", source: "filing" },
  { id: "V2", spelling: "team outcome", source: "filing" },
  { id: "V3", spelling: "feedback status", source: "statement" },
  { id: "V4", spelling: "causal benefit", source: "statement" },
];
/** The filing's other search words: Pi's own words with other meanings, never read (R-SHARED-WORD). */
const SHARED_WORDS: readonly string[] = ["pending", "causal", "attribution"];
/** A spelling's parts: split at whitespace, dots, underscores and hyphens, then at camel humps. */
const partsOf = (spelling: string): string[] => spelling.split(/[\s._-]+/).flatMap(word => word.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? []);
const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A word's reading: its parts in order, any case, with any run of whitespace, dot, underscore, hyphen or format character between them. */
const readerOf = (word: Word): RegExp => new RegExp(partsOf(word.spelling).map(escapeRegex).join("[\\s._\\-\\p{Cf}]*"), "iu");
const READERS = VOCABULARY.map(word => ({ word, reader: readerOf(word) }));
/** The vocabulary words a text names, in vocabulary order. */
const namedWords = (text: string): string[] => READERS.filter(({ reader }) => reader.test(text)).map(({ word }) => word.spelling);

interface Entry {
  readonly path: string;
  readonly text: string;
}
/** git's would-commit listing under a scope: tracked, plus untracked files git does not ignore. */
function gitList(root: string, scope: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", scope], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== ""))].sort();
}
/** Each listed path's text; a listed path that is not a regular file is unread, never skipped. */
function entriesOf(root: string, paths: readonly string[]): { readonly entries: Entry[]; readonly unread: string[] } {
  const entries: Entry[] = [];
  const unread: string[] = [];
  for (const path of paths) {
    let regular = false;
    try {
      regular = lstatSync(join(root, path)).isFile();
    } catch {
      regular = false;
    }
    if (regular) entries.push({ path, text: readFileSync(join(root, path), "utf8") });
    else unread.push(path);
  }
  return { entries, unread };
}
/** The vocabulary words a listed file names, in its path or its text. */
const entryWords = (entry: Entry): string[] => namedWords(`${entry.path}\n${entry.text}`);
/** A src module naming the vocabulary without a registration, a stale registration and a duplicate registration are findings. */
function srcFindings(entries: readonly Entry[], sites: readonly Site[]): string[] {
  const findings: string[] = [];
  const naming = new Set<string>();
  for (const entry of entries) {
    const words = entryWords(entry);
    if (words.length === 0) continue;
    naming.add(entry.path);
    if (!sites.some(site => site.path === entry.path)) findings.push(`${entry.path}: names ${words.join(", ")}, no SITES registration`);
  }
  const seen = new Set<string>();
  for (const site of sites) {
    if (seen.has(site.path)) findings.push(`${site.path}: registered twice`);
    else if (!naming.has(site.path)) findings.push(`${site.path}: registered, names no vocabulary word (stale)`);
    seen.add(site.path);
  }
  return findings;
}
let liveCache: { readonly entries: readonly Entry[]; readonly unread: readonly string[] } | undefined;
/** The live src listing, each path read once per run. */
function liveSrc(): { readonly entries: readonly Entry[]; readonly unread: readonly string[] } {
  if (liveCache === undefined) liveCache = entriesOf(ROOT, gitList(ROOT, "src"));
  return liveCache;
}
/** Every blob under the scopes at a commit or tree, read from git's objects. */
function pinTree(root: string, treeish: string, scopes: readonly string[]): Entry[] {
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", treeish, "--", ...scopes], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
  const blobs: { readonly path: string; readonly object: string }[] = [];
  for (const record of listing.split("\0")) {
    const match = /^\d+ blob ([0-9a-f]{40})\t(.+)$/s.exec(record);
    if (match !== null) blobs.push({ object: match[1] ?? "", path: match[2] ?? "" });
  }
  if (blobs.length === 0) return [];
  const batch = execFileSync("git", ["cat-file", "--batch"], { cwd: root, input: `${blobs.map(blob => blob.object).join("\n")}\n`, maxBuffer: 1 << 28 });
  const entries: Entry[] = [];
  let cursor = 0;
  for (const blob of blobs) {
    const newline = batch.indexOf(0x0a, cursor);
    const header = batch.subarray(cursor, newline).toString("utf8");
    const match = /^([0-9a-f]{40}) blob (\d+)$/.exec(header);
    if (match === null || match[1] !== blob.object) throw new Error(`git cat-file --batch: unexpected header '${header}' for ${blob.path}`);
    const size = Number(match[2]);
    entries.push({ path: blob.path, text: batch.subarray(newline + 1, newline + 1 + size).toString("utf8") });
    cursor = newline + 1 + size + 1;
  }
  return entries;
}
const FORMAT_CHARACTER = String.fromCodePoint(0x200b);
const CYRILLIC_IE = String.fromCodePoint(0x435);
/** The reading's controls: each label with its text, read for the words it names. */
const VOCABULARY_CONTROLS: readonly (readonly [string, string])[] = [
  ["word", "the reward of an actor"],
  ["upper", "REWARD"],
  ["inside a longer name", "rewardBasis"],
  ["camel team outcome", "teamOutcome"],
  ["kebab", "team-outcome-derived"],
  ["upper snake", "FEEDBACK_STATUS"],
  ["dotted", "feedback.status"],
  ["spaced twice", "a causal  benefit"],
  ["format characters between the parts", `causal${FORMAT_CHARACTER}benefit`],
  ["every word", "reward teamOutcome feedback_status causal-benefit"],
  ["status alone", "status"],
  ["feedback alone", "feedback"],
  ["outcome alone", "outcome"],
  ["benefit alone", "benefit"],
  ["a word between the parts", "causal edge benefit"],
  ["shared words", "pending causal attribution"],
];
const git = (cwd: string, args: readonly string[]): string => execFileSync("git", [...args], { cwd, encoding: "utf8" }).trim();

// ---- the docs, the export and the roster ----

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
interface DocLine {
  readonly page: string;
  readonly line: number;
  readonly text: string;
}
/** The filing's docs citations: docs/workbench/09 :69, :71, :73-75 (line 74 is blank) and docs/workbench/18 :29, each with the text its row needs. */
const DOCS_LINES: readonly DocLine[] = [
  { page: DOCS_09, line: 69, text: "inferred possible relationship (hypothesis; never treated as authoritative)" },
  { page: DOCS_09, line: 71, text: "Missing edges do not imply independence." },
  { page: DOCS_09, line: 73, text: "## Freshness and ambiguity" },
  { page: DOCS_09, line: 75, text: "UI shows STALE/UNKNOWN visibly." },
  { page: DOCS_18, line: 29, text: "distinguish declared/observed/inferred" },
];
const pinPageCache = new Map<string, string>();
function pinPage(page: string): string {
  const cached = pinPageCache.get(page);
  if (cached !== undefined) return cached;
  const text = execFileSync("git", ["show", `${FILING_PIN}:${page}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  pinPageCache.set(page, text);
  return text;
}
interface DocAnchor {
  readonly line: number;
  readonly pin: boolean;
  readonly head: boolean;
}
/** An anchor read over a pinned page and a live page: the pinned page's line holds the text, and the same whole line stands in the live page. */
function anchorIn(line: number, text: string, pinned: string, live: string): DocAnchor {
  const held = pinned.split("\n")[line - 1] ?? "";
  return { line, pin: text !== "" && held.includes(text), head: held !== "" && live.split("\n").includes(held) };
}
const docLine = (page: string, line: number): DocLine => DOCS_LINES.find(entry => entry.page === page && entry.line === line) ?? { page, line, text: "" };
const docAnchor = (page: string, line: number): DocAnchor => anchorIn(line, docLine(page, line).text, pinPage(page), textOf(page));
interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
let exportCache: string | undefined;
const exportText = (): string => {
  if (exportCache === undefined) exportCache = textOf(EXPORT);
  return exportCache;
};
/** A bead's row in the tracker export. */
function beadRow(bead: string): BeadRow | undefined {
  for (const line of exportText().split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const { id, title, notes } = row as { readonly id?: unknown; readonly title?: unknown; readonly notes?: unknown };
    if (id === bead && typeof title === "string" && typeof notes === "string") return { title, notes };
  }
  return undefined;
}
/** The owner filing's acceptance clauses: the first "Acceptance shape: " sentence to its line end, split at "; ", the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance shape: ");
  if (start === -1) return [];
  const end = notes.indexOf("\n", start);
  return notes
    .slice(start + "Acceptance shape: ".length, end === -1 ? undefined : end)
    .trim()
    .replace(/\.$/, "")
    .split("; ");
}
/** The filing's docs citation: the docs/workbench/09 lines and pin, row P's parenthetical, the docs/workbench/18 line, row C's parenthetical, the never-causation beads. */
const CITATION =
  /docs\/workbench\/09-observation-and-provenance\.md:(\d+),:(\d+),:(\d+)-(\d+)@([0-9a-f]{12}) \((.+?)\), 18-decisions-and-risks\.md:(\d+) \((.+?)\), and the never-causation gating beads (wb-[0-9a-z.]+) and (wb-[0-9a-z.]+) \u2014 but /;
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let cursor = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, cursor);
    if (found < 0 || !/^[\s,;:()]*$/.test(label.slice(cursor, found))) return false;
    cursor = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(label.slice(cursor));
}

/** The export's bindings over a row table: one finding per binding that fails, none when the table is the filing's. */
function exportFindings(rows: readonly Row[], quotes: Readonly<Record<string, string>>, title: string, notes: string): string[] {
  const findings: string[] = [];
  const label = (id: string): string => rows.find(entry => entry.id === id)?.label ?? "-";
  if (title !== `[${REQUIREMENT}] ${MERGE_TAG} ${["S1", "S2", "S3", "S4"].map(label).join("; ")}.`) findings.push("the title is the requirement id, the merge tag and rows S1-S4's labels");
  if (!isDeepStrictEqual(acceptanceClauses(notes), ["A1", "A2", "A3", "A4"].map(label))) findings.push("each acceptance clause is exactly one A row's label");
  for (const entry of rows) {
    if (entry.id !== "Q" && !tiles(entry.label, entry.pins.map(pin => quotes[pin] ?? ""))) findings.push(`row ${entry.id}'s pin quotes tile its label`);
  }
  if (!notes.includes(` but ${label("N")} (bd search `)) findings.push("row N is the filing's absence sentence");
  const citation = CITATION.exec(notes);
  if (citation?.[6] !== label("P") || citation?.[8] !== label("C")) findings.push("rows P and C are the citation's parentheticals");
  return findings;
}

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** An acceptance clause (A1-A4), a statement clause (S1-S4), a docs parenthetical (P, C), the absence sentence (N) or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "A1", label: "the schema refuses a reward value on pending/unknown status", pins: ["A1a", "A1b"] },
  { id: "A2", label: "a per-actor record whose reward equals a team-outcome-derived value with no actor-level verifier ref is refused", pins: ["A2a", "A2b"] },
  { id: "A3", label: "a correction appends a new record referencing the corrected one and the original bytes stay", pins: ["A3a", "A3b"] },
  { id: "A4", label: "a promotion decision is a separate operator fact, never a field the policy path writes", pins: ["A4a", "A4b"] },
  { id: "S1", label: "R7 feedback status shall be a closed set in which only an observed verifier/receipt outcome may carry reward", pins: ["S1a", "S1b"] },
  { id: "S2", label: "pending or unknown feedback never carries reward", pins: ["S2"] },
  { id: "S3", label: "a team-level outcome is recorded once on the episode and never copied into per-actor reward or causal benefit", pins: ["S3a", "S3b"] },
  {
    id: "S4",
    label: "corrections and promotion are appended as operator facts outside the policy's own evaluation, never rewriting a decision",
    pins: ["S4a", "S4b"],
  },
  { id: "P", label: "inferred relationship is a hypothesis never authoritative; missing edges do not imply independence; STALE/UNKNOWN shown", pins: ["P1", "P2", "P3"] },
  { id: "C", label: "distinguish declared/observed/inferred", pins: ["C1"] },
  { id: "N", label: "no Pi text binds a reward or feedback-status field because none exists", pins: ["N1", "N2"] },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"] },
];
/** Each pin's quote: a row's quotes tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  A1a: "the schema refuses a reward value",
  A1b: "on pending/unknown status",
  A2a: "a per-actor record whose reward equals a team-outcome-derived value",
  A2b: "with no actor-level verifier ref is refused",
  A3a: "a correction appends a new record referencing the corrected one",
  A3b: "and the original bytes stay",
  A4a: "a promotion decision is a separate operator fact",
  A4b: "never a field the policy path writes",
  S1a: "R7 feedback status shall be a closed set",
  S1b: "in which only an observed verifier/receipt outcome may carry reward",
  S2: "pending or unknown feedback never carries reward",
  S3a: "a team-level outcome is recorded once on the episode",
  S3b: "and never copied into per-actor reward or causal benefit",
  S4a: "corrections and promotion are appended as operator facts outside the policy's own evaluation",
  S4b: "never rewriting a decision",
  P1: "inferred relationship is a hypothesis never authoritative",
  P2: "missing edges do not imply independence",
  P3: "STALE/UNKNOWN shown",
  C1: "distinguish declared/observed/inferred",
  N1: "no Pi text binds a reward or feedback-status field",
  N2: "because none exists",
  Q1: "R-COMPOSED",
  Q2: "R-SHARED-WORD",
  Q3: "R-UNNAMED-RECORD",
  Q4: "R-OTHER-DERIVATION",
  Q5: "R-TEST-MENTION",
  Q6: "R-COORDINATED",
};

interface Residual {
  readonly id: string;
  readonly name: string;
  readonly members: readonly { readonly id: string; readonly text: string }[];
}
/** The text residuals (Q1-Q3): each member is a planted src text the reading stays quiet on. */
const RESIDUALS: readonly Residual[] = [
  {
    id: "Q1",
    name: "R-COMPOSED",
    members: [
      { id: "concatenated", text: 'export const field = "rew" + "ard";\n' },
      { id: "commented", text: 'export const field = "rew/* */ard";\n' },
      { id: "escaped", text: 'export const field = "\\u0072eward";\n' },
      { id: "homoglyph", text: `export const field = "r${CYRILLIC_IE}ward";\n` },
      { id: "joined", text: 'export const field = ["team", "outcome"].join(" ");\n' },
    ],
  },
  {
    id: "Q2",
    name: "R-SHARED-WORD",
    members: [
      { id: "pending", text: 'export const waiting = rows.filter(row => row.state === "pending");\n' },
      { id: "causal", text: 'export const relation = "observed-causal";\n' },
      { id: "attribution", text: "// attribution: the provider's own label, shown as given\n" },
    ],
  },
  {
    id: "Q3",
    name: "R-UNNAMED-RECORD",
    members: [{ id: "unnamed", text: 'export const score = { actor: "a1", state: "pending", value: 3 };\n' }],
  },
];
/** Q4's members: per-actor values derived from a team outcome by other arithmetic, each admitted by the reference. */
const TEN_LOG: Log = [teamOutcome("t10", "ep-10", ["x1", "x2", "x3"], { status: "observed", reward: 10, outcome: teamVerifier("ep-10") })];
const DERIVATIONS: readonly Case[] = [
  at("weighted", BASE, feedback("q1", { status: "observed", reward: 6, outcome: actorReceipt("a2") }), "ok"),
  at("rounded", TEN_LOG, feedback("q2", { episode: "ep-10", actor: "x1", status: "observed", reward: 3.33, outcome: actorReceipt("x1") }), "ok"),
  at("remainder", BASE, feedback("q3", { status: "observed", reward: 7, outcome: actorReceipt("a2") }), "ok"),
];
/** Q5's members: a planted test file, and this cut's own census module and roster. */
const TEST_MENTION: readonly string[] = ["scratch-test-file", "census-module", "census-roster"];
/** Q6's members: what a coordinated hollow removes from every literal of this file and the roster at once. */
const COORDINATED: readonly string[] = ["pin", "case", "code", "mutant", "residual-member"];
/** Every residual family's member ids. */
const RESIDUAL_MEMBERS: Readonly<Record<string, readonly string[]>> = {
  ...Object.fromEntries(RESIDUALS.map(family => [family.id, family.members.map(member => member.id)])),
  Q4: DERIVATIONS.map(entry => entry.id),
  Q5: TEST_MENTION,
  Q6: COORDINATED,
};

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly cases: Readonly<Record<string, readonly string[]>>;
  readonly mutants: readonly string[];
  readonly witnesses: Readonly<Record<string, unknown>>;
  readonly tests: readonly string[];
  readonly producer: {
    readonly repo: string;
    readonly sha: string;
    readonly lines: readonly { readonly path: string; readonly blob: string; readonly line: number; readonly text: string }[];
  };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;

// ---- the pins ----

/** One reading per status for a feedback record carrying the given fields. */
const statusMatrix = (fields: Fields): Record<string, string> =>
  Object.fromEntries(STATUSES.map(status => [status, readingOf(REFERENCE, at("m", BASE, feedback("m1", { status, ...fields }), ""))]));

const IMPL: Readonly<Record<string, () => unknown>> = {
  A1a: () => {
    const read = readingsOf(["r-pending", "r-unknown", "r-pending-zero", "r-unknown-causal", "r-pending-receipt", "r-team-pending", "r-correction-unknown", "r-verifier", "r-receipt"]);
    expect(read, "a value on an unobserved status is the typed refusal naming its field; an observed outcome's reward is appended").toEqual({
      "r-pending": "reward-on-unobserved:reward",
      "r-unknown": "reward-on-unobserved:reward",
      "r-pending-zero": "reward-on-unobserved:reward",
      "r-unknown-causal": "reward-on-unobserved:causalBenefit",
      "r-pending-receipt": "reward-on-unobserved:reward",
      "r-team-pending": "reward-on-unobserved:reward",
      "r-correction-unknown": "reward-on-unobserved:reward",
      "r-verifier": "ok",
      "r-receipt": "ok",
    });
    return read;
  },
  A1b: () => {
    const matrix = {
      reward: statusMatrix({ reward: 2, outcome: actorReceipt("a2") }),
      zero: statusMatrix({ reward: 0, outcome: actorReceipt("a2") }),
      causalBenefit: statusMatrix({ causalBenefit: 2, outcome: actorReceipt("a2") }),
      bare: statusMatrix({ outcome: actorReceipt("a2") }),
    };
    expect(matrix, "every status of the set, with and without a value: only observed carries one").toEqual({
      reward: { observed: "ok", pending: "reward-on-unobserved:reward", unknown: "reward-on-unobserved:reward" },
      zero: { observed: "ok", pending: "reward-on-unobserved:reward", unknown: "reward-on-unobserved:reward" },
      causalBenefit: { observed: "ok", pending: "reward-on-unobserved:causalBenefit", unknown: "reward-on-unobserved:causalBenefit" },
      bare: { observed: "ok", pending: "ok", unknown: "ok" },
    });
    return matrix;
  },
  A2a: () => {
    const derived = derivedValues(BASE, EPISODE);
    expect(derived, "the episode's team reward and its even share over three actors").toEqual([12, 4]);
    const read = readingsOf(["t-copy-reward", "t-copy-share", "t-not-derived", "t-no-team", "t-correction-team"]);
    expect(read, "a per-actor value equal to a derived value is refused; another value, an episode with no team outcome and the team outcome's own correction are not").toEqual({
      "t-copy-reward": "team-outcome-copied:reward",
      "t-copy-share": "team-outcome-copied:reward",
      "t-not-derived": "ok",
      "t-no-team": "ok",
      "t-correction-team": "ok",
    });
    return { derived, read };
  },
  A2b: () => {
    const bases: readonly (readonly [string, Fields])[] = [
      ["actor verifier", { outcome: actorVerifier("a2") }],
      ["actor receipt", { outcome: actorReceipt("a2") }],
      ["team verifier", { outcome: teamVerifier(EPISODE) }],
      ["team receipt", { outcome: teamReceipt(EPISODE) }],
      ["no outcome", {}],
    ];
    const matrix = Object.fromEntries(bases.map(([label, fields]) => [label, readingOf(REFERENCE, at(label, BASE, feedback("v1", { status: "observed", reward: 4, ...fields }), ""))]));
    expect(matrix, "the even share as a2's reward: only a2's own verifier reference admits it").toEqual({
      "actor verifier": "ok",
      "actor receipt": "team-outcome-copied:reward",
      "team verifier": "team-outcome-copied:reward",
      "team receipt": "team-outcome-copied:reward",
      "no outcome": "observed-without-outcome",
    });
    const read = readingsOf(["t-copy-causal", "t-actor-verifier", "t-correction-copy"]);
    expect(read, "the causal benefit and a correction of a per-actor record are held to the same reference").toEqual({
      "t-copy-causal": "team-outcome-copied:causalBenefit",
      "t-actor-verifier": "ok",
      "t-correction-copy": "team-outcome-copied:reward",
    });
    return { matrix, read };
  },
  A3a: () => {
    const entry = caseOf("a-correct-feedback");
    const appended = REFERENCE.append(clone(entry.log), clone(entry.record));
    const added = appended.ok ? appended.log[appended.log.length - 1] : undefined;
    const witness = {
      ids: appended.ok ? appended.log.map(record => record.id) : null,
      added: added === undefined ? null : { id: added.id, kind: added.kind, writer: added.writer, corrects: added.corrects ?? null },
      read: readingsOf(["a-correct-feedback", "a-correct-decision", "a-unreferenced", "a-dangling"]),
    };
    expect(witness, "the correction is a new record at the log's end naming f1; one naming nothing, or no record of the log, is refused").toEqual({
      ids: ["t1", "d1", "d2", "f1", "k1"],
      added: { id: "k1", kind: "correction", writer: "operator", corrects: "f1" },
      read: { "a-correct-feedback": "ok", "a-correct-decision": "ok", "a-unreferenced": "correction-unreferenced", "a-dangling": "correction-unreferenced" },
    });
    return witness;
  },
  A3b: () => {
    const entry = caseOf("a-correct-feedback");
    const log = clone(entry.log);
    const before = log.map(record => JSON.stringify(record));
    const appended = REFERENCE.append(log, clone(entry.record));
    const kept = appended.ok ? appended.log.slice(0, before.length).map(record => JSON.stringify(record)) : [];
    const corrected = appended.ok ? appended.log.find(record => record.id === "f1") : undefined;
    const witness = {
      priorBytesSame: isDeepStrictEqual(kept, before),
      callerLogSame: isDeepStrictEqual(
        log.map(record => JSON.stringify(record)),
        before,
      ),
      correctedReward: corrected?.reward ?? null,
      rewrites: readingsOf(["a-rewrite-decision", "a-rewrite-feedback", "a-rewrite-by-correction"]),
    };
    expect(witness, "every prior record keeps its bytes, the corrected reward stays 5, and a record reusing an id is refused").toEqual({
      priorBytesSame: true,
      callerLogSame: true,
      correctedReward: 5,
      rewrites: { "a-rewrite-decision": "rewrite", "a-rewrite-feedback": "rewrite", "a-rewrite-by-correction": "rewrite" },
    });
    return witness;
  },
  A4a: () => {
    const entry = caseOf("o-promotion");
    const appended = REFERENCE.append(clone(entry.log), clone(entry.record));
    const added = appended.ok ? appended.log[appended.log.length - 1] : undefined;
    const subjectSame = appended.ok && JSON.stringify(appended.log.find(record => record.id === "d1")) === JSON.stringify(D1);
    const witness = {
      added: added === undefined ? null : { id: added.id, kind: added.kind, writer: added.writer, subject: added.subject ?? null },
      subjectSame,
      read: readingsOf(["o-promotion", "o-promotion-policy", "o-promotion-host"]),
    };
    expect(witness, "a promotion is its own operator record and leaves the promoted decision's bytes; one written by the policy or the host is refused").toEqual({
      added: { id: "p1", kind: "promotion", writer: "operator", subject: "d1" },
      subjectSame: true,
      read: { "o-promotion": "ok", "o-promotion-policy": "operator-fact-writer", "o-promotion-host": "operator-fact-writer" },
    });
    return witness;
  },
  A4b: () => {
    const read = readingsOf(["o-decision-promotion", "o-decision-corrects", "o-feedback-promotion", "o-decision"]);
    expect(read, "a policy-path decision carrying a promotion or a corrects field is refused, as is a promotion field on any record").toEqual({
      "o-decision-promotion": "operator-field:promotion",
      "o-decision-corrects": "operator-field:corrects",
      "o-feedback-promotion": "operator-field:promotion",
      "o-decision": "ok",
    });
    const policyFields = BASE.filter(record => record.writer === "policy").map(record => Object.keys(record).filter(key => key === "promotion" || key === "corrects"));
    expect(policyFields, "the base log's policy-path decisions carry no operator field").toEqual([[], []]);
    return { read, policyFields };
  },
  S1a: () => {
    expect(STATUSES.length, "the set holds three statuses").toBe(3);
    const read = readingsOf(STATUS_CASES.map(entry => entry.id));
    expect(read, "every status of the set is admitted; another, a missing, a case-variant or an empty status is refused on every feedback-bearing kind").toEqual({
      "s-observed": "ok",
      "s-pending": "ok",
      "s-unknown": "ok",
      "s-other": "status-outside-set",
      "s-missing": "status-outside-set",
      "s-case": "status-outside-set",
      "s-empty": "status-outside-set",
      "s-team": "status-outside-set",
      "s-correction": "status-outside-set",
    });
    return { statuses: [...STATUSES], read };
  },
  S1b: () => {
    const read = readingsOf(["r-verifier", "r-receipt", "r-no-outcome", "r-empty-ref", "r-self-report", "r-observed-bare"]);
    expect(read, "observed needs a verifier or receipt outcome with a reference").toEqual({
      "r-verifier": "ok",
      "r-receipt": "ok",
      "r-no-outcome": "observed-without-outcome",
      "r-empty-ref": "observed-without-outcome",
      "r-self-report": "observed-without-outcome",
      "r-observed-bare": "observed-without-outcome",
    });
    return read;
  },
  S2: () => {
    const readings: string[] = [];
    for (const kind of ["team-outcome", "feedback", "correction"] as const) {
      for (const status of ["pending", "unknown"]) {
        for (const field of VALUE_FIELDS) {
          for (const [outcomeLabel, outcomeFields] of [
            ["no outcome", {}],
            ["actor verifier", { outcome: actorVerifier("a2") }],
          ] as const) {
            const fields: Fields = { status, ...(field === "reward" ? { reward: 3 } : { causalBenefit: 3 }), ...outcomeFields };
            const record = kind === "team-outcome" ? teamOutcome("w1", "ep-w", ["w1"], fields) : kind === "feedback" ? feedback("w1", fields) : correction("w1", { corrects: "f1", ...fields });
            const read = readingOf(REFERENCE, at("w", kind === "team-outcome" ? [] : BASE, record, ""));
            readings.push(`${kind}/${status}/${field}/${outcomeLabel}: ${read}`);
          }
        }
      }
    }
    expect(readings.length, "three kinds, two unobserved statuses, two value fields, with and without an outcome").toBe(24);
    expect(
      readings.filter(line => !line.endsWith(`: reward-on-unobserved:${line.split("/")[2] ?? "-"}`)),
      "every unobserved value is refused, naming its field",
    ).toEqual([]);
    return readings;
  },
  S3a: () => {
    const read = readingsOf(["t-once", "t-twice", "t-twice-pending", "t-other-episode"]);
    expect(read, "one team outcome per episode; a second is refused whatever its status").toEqual({
      "t-once": "ok",
      "t-twice": "team-outcome-twice",
      "t-twice-pending": "team-outcome-twice",
      "t-other-episode": "ok",
    });
    const carriers = BASE.filter(record => record.kind === "team-outcome").map(record => `${record.id}:${record.episode}:${record.actors?.length ?? 0}`);
    expect(carriers, "the base log records the team outcome once, on the episode's own record with its actors").toEqual(["t1:ep-1:3"]);
    return { read, carriers };
  },
  S3b: () => {
    const read = readingsOf(["t-copy-reward", "t-copy-share", "t-copy-share-receipt", "t-copy-causal", "t-copy-causal-team", "t-correction-copy"]);
    expect(read, "the team reward and its share, copied into a per-actor reward or causal benefit, are refused naming the field").toEqual({
      "t-copy-reward": "team-outcome-copied:reward",
      "t-copy-share": "team-outcome-copied:reward",
      "t-copy-share-receipt": "team-outcome-copied:reward",
      "t-copy-causal": "team-outcome-copied:causalBenefit",
      "t-copy-causal-team": "team-outcome-copied:causalBenefit",
      "t-correction-copy": "team-outcome-copied:reward",
    });
    return read;
  },
  S4a: () => {
    const matrix = Object.fromEntries(
      (["correction", "promotion"] as const).map(kind => [
        kind,
        Object.fromEntries(
          (["policy", "host", "operator"] as const).map(writer => {
            const record = kind === "correction" ? correction("x1", { writer, corrects: "f1", status: "unknown" }) : promotion("x1", { writer });
            return [writer, readingOf(REFERENCE, at("x", BASE, record, ""))];
          }),
        ),
      ]),
    );
    expect(matrix, "corrections and promotions are appended only as operator facts").toEqual({
      correction: { policy: "operator-fact-writer", host: "operator-fact-writer", operator: "ok" },
      promotion: { policy: "operator-fact-writer", host: "operator-fact-writer", operator: "ok" },
    });
    return matrix;
  },
  S4b: () => {
    const entry = caseOf("a-correct-decision");
    const appended = REFERENCE.append(clone(entry.log), clone(entry.record));
    const witness = {
      rewrite: readingOf(REFERENCE, caseOf("a-rewrite-decision")),
      correctionOfDecision: readingOf(REFERENCE, entry),
      decisionSame: appended.ok && JSON.stringify(appended.log.find(record => record.id === "d1")) === JSON.stringify(D1),
      decisionCount: appended.ok ? appended.log.filter(record => record.id === "d1").length : null,
    };
    expect(witness, "a decision is never rewritten: a record reusing its id is refused, and a correction of it is appended beside it").toEqual({
      rewrite: "rewrite",
      correctionOfDecision: "ok",
      decisionSame: true,
      decisionCount: 1,
    });
    return witness;
  },
  P1: () => {
    const anchor = docAnchor(DOCS_09, 69);
    expect(anchor, "docs/workbench/09:69 holds the hypothesis line at the filing pin, whole in the live page").toEqual({ line: 69, pin: true, head: true });
    const entry = docLine(DOCS_09, 69);
    const pinned = pinPage(DOCS_09);
    const live = textOf(DOCS_09);
    const controls = {
      lineDropped: anchorIn(
        69,
        entry.text,
        pinned,
        live
          .split("\n")
          .filter(line => !line.includes(entry.text))
          .join("\n"),
      ).head,
      textEdited: anchorIn(69, `${entry.text} (edited)`, pinned, live).pin,
      otherLine: anchorIn(70, entry.text, pinned, live).pin,
    };
    expect(controls, "the anchor reads its own line: dropped from the live page, edited, or read at another line").toEqual({ lineDropped: false, textEdited: false, otherLine: false });
    return { anchor, controls };
  },
  P2: () => {
    const anchor = docAnchor(DOCS_09, 71);
    expect(anchor, "docs/workbench/09:71 holds the missing-edges sentence at the filing pin, whole in the live page").toEqual({ line: 71, pin: true, head: true });
    return anchor;
  },
  P3: () => {
    const anchors = [docAnchor(DOCS_09, 73), docAnchor(DOCS_09, 75)];
    expect(anchors, "docs/workbench/09:73-75 holds the freshness heading and the STALE/UNKNOWN sentence at the filing pin, whole in the live page").toEqual([
      { line: 73, pin: true, head: true },
      { line: 75, pin: true, head: true },
    ]);
    const blank = pinPage(DOCS_09).split("\n")[73] ?? null;
    expect(blank, "line 74 between them is blank").toBe("");
    return { anchors, blank };
  },
  C1: () => {
    const anchor = docAnchor(DOCS_18, 29);
    expect(anchor, "docs/workbench/18:29 holds the declared/observed/inferred row at the filing pin, whole in the live page").toEqual({ line: 29, pin: true, head: true });
    return anchor;
  },
  N1: () => {
    const { entries, unread } = liveSrc();
    expect(unread, "every listed src path is a regular file the reading read").toEqual([]);
    const floor = entries.length >= SRC_FLOOR;
    expect(floor, "the src floor").toBe(true);
    const held = entries.find(entry => entry.path === SRC_ANCHOR.path);
    const anchor = { read: held?.text.includes(SRC_ANCHOR.token) ?? false, words: held === undefined ? null : entryWords(held) };
    expect(anchor, "the listing read the topology module, whose shared word is no vocabulary word").toEqual({ read: true, words: [] });
    const words = entries.flatMap(entry => entryWords(entry).map(word => `${entry.path}: ${word}`));
    expect(words, "src names no vocabulary word").toEqual([]);
    const controls = Object.fromEntries(VOCABULARY_CONTROLS.map(([label, text]) => [label, namedWords(text)]));
    expect(controls["every word"], "the control naming every word reads all four").toEqual(VOCABULARY.map(word => word.spelling));
    expect(controls["shared words"], "the shared words read as none").toEqual([]);
    const scratch = makeScratch("wb-e664-listing-");
    let listing: unknown = null;
    try {
      git(scratch, ["init", "-q"]);
      writeFileSync(join(scratch, ".gitignore"), "*.log\n");
      mkdirSync(join(scratch, "src", "nested"), { recursive: true });
      writeFileSync(join(scratch, "src", "nested", "planted.ts"), "export const teamOutcome = 1;\n");
      writeFileSync(join(scratch, "src", "ignored.log"), "reward\n");
      writeFileSync(join(scratch, "src", "quiet.ts"), "export const pending = 1;\n");
      symlinkSync(join("nested", "planted.ts"), join(scratch, "src", "link.ts"));
      const listed = gitList(scratch, "src");
      const read = entriesOf(scratch, listed);
      listing = { listed, findings: srcFindings(read.entries, []), unread: read.unread };
    } finally {
      removeScratch(scratch);
    }
    expect(listing, "untracked files are listed and read, ignored files never, and a listed link is unread, never skipped").toEqual({
      listed: ["src/link.ts", "src/nested/planted.ts", "src/quiet.ts"],
      findings: ["src/nested/planted.ts: names team outcome, no SITES registration"],
      unread: ["src/link.ts"],
    });
    return { floor, anchor, words, controls, listing };
  },
  N2: () => {
    expect(SITES, "no src validator is registered: the gate has not fired").toEqual([]);
    const live = srcFindings(liveSrc().entries, SITES);
    expect(live, "no src module names the vocabulary").toEqual([]);
    const plant: Entry = { path: "src/workbench/r7-feedback.ts", text: "export interface FeedbackRecord {\n  readonly reward?: number;\n}\n" };
    const site: Site = { path: plant.path, validator: REFERENCE };
    const armed = {
      unregistered: srcFindings([plant], []),
      registered: srcFindings([plant], [site]),
      stale: srcFindings([], [site]),
      twice: srcFindings([plant], [site, site]),
      pathOnly: srcFindings([{ path: "src/workbench/team-outcome.ts", text: "export const split = 1;\n" }], []),
      judged: refusing(judge(site.validator)),
    };
    expect(armed, "the armed registrations").toEqual({
      unregistered: ["src/workbench/r7-feedback.ts: names reward, no SITES registration"],
      registered: [],
      stale: ["src/workbench/r7-feedback.ts: registered, names no vocabulary word (stale)"],
      twice: ["src/workbench/r7-feedback.ts: registered twice"],
      pathOnly: ["src/workbench/team-outcome.ts: names team outcome, no SITES registration"],
      judged: [],
    });
    const pinned = pinTree(ROOT, FILING_PIN, PIN_SCOPES);
    const counts = Object.fromEntries(PIN_SCOPES.map(scope => [scope, pinned.filter(entry => entry.path.startsWith(`${scope}/`)).length]));
    expect(counts, "git's objects at the filing pin").toEqual({ src: 115, test: 410, docs: 59 });
    const pinWords = pinned.flatMap(entry => entryWords(entry).map(word => `${entry.path}: ${word}`));
    expect(pinWords, "no Pi text at the filing pin names a vocabulary word").toEqual([]);
    const scratch = makeScratch("wb-e664-pin-");
    let planted: unknown = null;
    try {
      git(scratch, ["init", "-q"]);
      mkdirSync(join(scratch, "src"), { recursive: true });
      mkdirSync(join(scratch, "docs"), { recursive: true });
      writeFileSync(join(scratch, "src", "r7.ts"), "export const feedbackStatus = 1;\n");
      writeFileSync(join(scratch, "docs", "quiet.md"), "a pending row\n");
      git(scratch, ["add", "-A"]);
      const tree = git(scratch, ["write-tree"]);
      planted = pinTree(scratch, tree, PIN_SCOPES).flatMap(entry => entryWords(entry).map(word => `${entry.path}: ${word}`));
    } finally {
      removeScratch(scratch);
    }
    expect(planted, "the same blob reading finds a planted blob").toEqual(["src/r7.ts: feedback status"]);
    return { sites: SITES.map(entry => entry.path), live, armed, counts, pinWords, planted };
  },
  Q1: () => quietText("Q1"),
  Q2: () => quietText("Q2"),
  Q3: () => quietText("Q3"),
  Q4: () => {
    const read = Object.fromEntries(DERIVATIONS.map(entry => [entry.id, readingOf(REFERENCE, entry)]));
    expect(read, "R-OTHER-DERIVATION: a per-actor value derived from the team outcome by other arithmetic is admitted").toEqual({ weighted: "ok", rounded: "ok", remainder: "ok" });
    const derived = { base: derivedValues(BASE, EPISODE), ten: derivedValues(TEN_LOG, "ep-10") };
    expect(derived.base, "the reading's derived values on the base log").toEqual([12, 4]);
    expect(derived.ten.length, "and on the ten-reward log").toBe(2);
    return { name: "R-OTHER-DERIVATION", members: DERIVATIONS.map(entry => entry.id), read, derived };
  },
  Q5: () => {
    const scratch = makeScratch("wb-e664-mention-");
    let mention: unknown = null;
    try {
      git(scratch, ["init", "-q"]);
      mkdirSync(join(scratch, "src"), { recursive: true });
      mkdirSync(join(scratch, "test"), { recursive: true });
      writeFileSync(join(scratch, "test", "zz-plant.test.ts"), "// the reward of a team outcome\n");
      writeFileSync(join(scratch, "src", "quiet.ts"), "export const quiet = 1;\n");
      const listed = gitList(scratch, "src");
      mention = {
        listed,
        findings: srcFindings(entriesOf(scratch, listed).entries, []),
        testWords: namedWords(readFileSync(join(scratch, "test", "zz-plant.test.ts"), "utf8")),
      };
    } finally {
      removeScratch(scratch);
    }
    expect(mention, "R-TEST-MENTION: a test file naming the vocabulary is outside the src leg").toEqual({ listed: ["src/quiet.ts"], findings: [], testWords: ["reward", "team outcome"] });
    const own = {
      census: namedWords(textOf(CENSUS_PATH)),
      roster: namedWords(textOf(ROSTER_PATH)),
      inSrc: liveSrc().entries.some(entry => entry.path === CENSUS_PATH || entry.path === ROSTER_PATH),
    };
    expect(own.inSrc, "this cut's census and roster are outside the src listing").toBe(false);
    expect(own.census.length > 0 && own.roster.length > 0, "and both name the vocabulary").toBe(true);
    return { name: "R-TEST-MENTION", members: [...TEST_MENTION], mention, own };
  },
  Q6: () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const partition: { readonly caught: string[]; readonly quiet: string[] } = { caught: [], quiet: [] };
    for (const pin of ROWS.flatMap(entry => entry.pins)) {
      const rows = ROWS.map(entry => ({ ...entry, pins: entry.pins.filter(other => other !== pin) })).filter(entry => entry.pins.length > 0);
      const quotes = Object.fromEntries(Object.entries(QUOTES).filter(([key]) => key !== pin));
      (exportFindings(rows, quotes, row?.title ?? "", row?.notes ?? "").length > 0 ? partition.caught : partition.quiet).push(pin);
    }
    const anchored = ROWS.filter(entry => entry.id !== "Q").flatMap(entry => entry.pins);
    expect(partition, "R-COORDINATED: a pin removed from every literal at once is reported by the export exactly when its row is the filing's; row Q's pins are the quiet set").toEqual({
      caught: anchored,
      quiet: ROWS.find(entry => entry.id === "Q")?.pins ?? [],
    });
    expect(exportFindings(ROWS, QUOTES, row?.title ?? "", row?.notes ?? ""), "the filing's own table binds").toEqual([]);
    return { name: "R-COORDINATED", members: [...COORDINATED], partition };
  },
};

function quietText(id: string): unknown {
  const family = RESIDUALS.find(entry => entry.id === id);
  expect(family, `${id} is a residual family`).toBeDefined();
  const members = family?.members ?? [];
  expect(members.length, `${id} has members`).toBeGreaterThan(0);
  const findings = members.flatMap(member => [...namedWords(member.text), ...srcFindings([{ path: `src/workbench/zz-${member.id}.ts`, text: member.text }], [])]);
  expect(findings, `${family?.name ?? id}: every member is quiet`).toEqual([]);
  return { name: family?.name ?? null, members: members.map(member => member.id), findings };
}

const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, async () => {
        const implementation = IMPL[pin];
        expect(implementation, `${pin} has a case`).toBeDefined();
        const raw = implementation === undefined ? undefined : await implementation();
        expect(raw, `${pin} returns a witness`).not.toBeUndefined();
        const witness: unknown = raw === undefined ? null : JSON.parse(JSON.stringify(raw));
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the tables and the vocabulary are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A1:2", "A2:2", "A3:2", "A4:2", "S1:2", "S2:1", "S3:2", "S4:2", "P:3", "C:1", "N:2", "Q:6"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(STATUSES).toEqual(["observed", "pending", "unknown"]);
    expect(CODES).toEqual([
      "rewrite",
      "operator-fact-writer",
      "operator-field",
      "correction-unreferenced",
      "status-outside-set",
      "reward-on-unobserved",
      "observed-without-outcome",
      "team-outcome-twice",
      "team-outcome-copied",
    ]);
    expect(BASE.map(record => `${record.id}:${record.kind}:${record.writer}`)).toEqual(["t1:team-outcome:host", "d1:decision:policy", "d2:decision:policy", "f1:feedback:host"]);
    expect(CHECKS.map(check => `${check}:${CASES[check].length}`)).toEqual(["K-STATUS:9", "K-REWARD:14", "K-TEAM:14", "K-APPEND:8", "K-OPERATOR:9"]);
    expect(MUTANTS.map(mutantLine)).toEqual([
      "M01:open-status:K-STATUS",
      "M02:missing-status-observed:K-STATUS",
      "M03:case-folded-status:K-STATUS",
      "M04:reward-on-pending:K-REWARD",
      "M05:reward-on-unknown:K-REWARD",
      "M06:unobserved-causal-benefit-unread:K-REWARD",
      "M07:outcome-optional:K-REWARD",
      "M08:any-outcome-kind:K-REWARD",
      "M09:empty-ref:K-REWARD",
      "M10:zero-reward-absent:K-REWARD",
      "M11:team-outcome-twice-admitted:K-TEAM",
      "M12:team-copy-unread:K-TEAM",
      "M13:team-level-ref:K-TEAM",
      "M14:receipt-as-verifier:K-TEAM",
      "M15:causal-benefit-uncopied:K-TEAM",
      "M16:share-unread:K-TEAM",
      "M17:correction-bypasses-team:K-TEAM",
      "M18:rewrite-admitted:K-APPEND",
      "M19:correction-in-place:K-TEAM+K-APPEND",
      "M20:dangling-correction:K-APPEND",
      "M21:unreferenced-correction:K-APPEND",
      "M22:mutating-append:K-STATUS+K-REWARD+K-TEAM+K-APPEND+K-OPERATOR",
      "M23:promotion-writer-unread:K-OPERATOR",
      "M24:correction-writer-unread:K-OPERATOR",
      "M25:promotion-field-unread:K-OPERATOR",
      "M26:corrects-field-unread:K-OPERATOR",
      "M27:untyped-refusal:K-STATUS+K-REWARD+K-TEAM+K-APPEND+K-OPERATOR",
      "M28:refusal-unnamed:K-STATUS+K-REWARD+K-TEAM+K-APPEND+K-OPERATOR",
      "M29:refuse-every-record:K-STATUS+K-REWARD+K-TEAM+K-APPEND+K-OPERATOR",
    ]);
    expect(Object.entries(RESIDUAL_MEMBERS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:5", "Q2:3", "Q3:1", "Q4:3", "Q5:3", "Q6:5"]);
    expect(RESIDUALS.map(family => `${family.id}:${family.name}`)).toEqual(["Q1:R-COMPOSED", "Q2:R-SHARED-WORD", "Q3:R-UNNAMED-RECORD"]);
    expect(VOCABULARY.map(word => `${word.id}:${word.spelling}:${word.source}`)).toEqual(["V1:reward:filing", "V2:team outcome:filing", "V3:feedback status:statement", "V4:causal benefit:statement"]);
    expect(SHARED_WORDS).toEqual(["pending", "causal", "attribution"]);
    expect(DOCS_LINES.map(entry => `${entry.page.slice("docs/workbench/".length, "docs/workbench/".length + 2)}:${entry.line}`)).toEqual(["09:69", "09:71", "09:73", "09:75", "18:29"]);
    expect(VOCABULARY_CONTROLS.length).toBe(16);
    expect(SITES).toEqual([]);
  });

  it("mutant battery: the reference meets every check, each mutant is refused by exactly its declared checks, and every check refuses a mutant alone", () => {
    for (const entry of JUDGED) expect(refusing(judge(entry.validator)), `${entry.name} meets every check`).toEqual([]);
    expect(
      MUTANTS.map(entry => [entry.id, refusing(judge(entry.validator))]),
      "each mutant is refused by exactly its declared checks",
    ).toEqual(MUTANTS.map(entry => [entry.id, [...entry.refusedBy]]));
    for (const check of CHECKS) {
      const alone = MUTANTS.filter(entry => entry.refusedBy.length === 1 && entry.refusedBy[0] === check).map(entry => entry.id);
      expect(alone.length, `${check} refuses a mutant alone`).toBeGreaterThan(0);
    }
    const exercised = CODES.filter(code => ALL_CASES.some(entry => entry.expected === code || entry.expected.startsWith(`${code}:`)));
    expect(exercised, "every typed refusal is some case's expectation").toEqual([...CODES]);
    expect(
      CHECKS.filter(check => !CASES[check].some(entry => entry.expected === "ok")),
      "every check holds an admitted case",
    ).toEqual([]);
    expect(
      ALL_CASES.map(entry => entry.id).filter((id, index, ids) => ids.indexOf(id) !== index),
      "case ids registered twice",
    ).toEqual([]);
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the statuses, the vocabulary, the docs citation and the producer block", { timeout: LIVE_BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    const label = (id: string): string => ROWS.find(entry => entry.id === id)?.label ?? "-";
    expect(exportFindings(ROWS, QUOTES, title, notes), "the title, the acceptance, the tiling, the absence sentence and the docs parentheticals bind the rows").toEqual([]);
    const observed = /only an (\w+) verifier\/receipt outcome/.exec(label("S1"))?.[1];
    const unobserved = /^(\w+) or (\w+) feedback /.exec(label("S2"));
    expect([observed, unobserved?.[1], unobserved?.[2]], "the statuses are the ones rows S1 and S2 name").toEqual([...STATUSES]);
    const search = /\(bd search ((?:'[^']+', )*'[^']+') are 0 for this sense\)/.exec(notes)?.[1] ?? "";
    const words = search.split(", ").map(word => word.replace(/^'|'$/g, ""));
    expect(
      words.filter(word => !SHARED_WORDS.includes(word)),
      "the vocabulary's filing words are the filing's search words that are not shared, in order",
    ).toEqual(VOCABULARY.filter(word => word.source === "filing").map(word => word.spelling));
    expect(
      words.filter(word => SHARED_WORDS.includes(word)),
      "the shared words are the filing's other search words, in order",
    ).toEqual([...SHARED_WORDS]);
    const recordTerm = /^R7 (\w+ \w+) shall be /.exec(label("S1"))?.[1];
    const attributionTerm = / or (\w+ \w+)$/.exec(label("S3"))?.[1];
    expect(
      VOCABULARY.filter(word => word.source === "statement").map(word => word.spelling),
      "the vocabulary's statement words are the R7 term row S1 opens with and the per-actor term row S3 ends with",
    ).toEqual([recordTerm, attributionTerm]);
    const citation = CITATION.exec(notes);
    expect(citation, "the docs citation parses").not.toBeNull();
    expect(
      [citation?.[1], citation?.[2], citation?.[3], citation?.[4]].map(Number),
      "the docs/workbench/09 lines are the citation's (:73-75 read at both ends)",
    ).toEqual(DOCS_LINES.filter(entry => entry.page === DOCS_09).map(entry => entry.line));
    expect([Number(citation?.[7])], "the docs/workbench/18 line is the citation's").toEqual(DOCS_LINES.filter(entry => entry.page === DOCS_18).map(entry => entry.line));
    expect(FILING_PIN.startsWith(citation?.[5] ?? "-"), "the filing pin is the citation's").toBe(true);
    expect([citation?.[9], citation?.[10]], "the never-causation beads are the filing's").toEqual([...NEVER_CAUSATION]);
    for (const bead of NEVER_CAUSATION) expect(beadRow(bead)?.title ?? "", `${bead}'s title says never causation`).toMatch(/never (?:as )?causation/);
    const source = /Source: (docs\/programs\/[^/]+)\/README\.md:(\d+) \('(.+?)'\) @([0-9a-f]{12}); ([^:;]+\.md):(\d+) \('(.+?)'\) @([0-9a-f]{12})\./.exec(notes);
    expect(source, "the source citations parse").not.toBeNull();
    const program = source?.[1] ?? "-";
    const cited = [
      { path: `${program}/README.md`, line: Number(source?.[2]) },
      { path: `${program.slice(0, program.lastIndexOf("/"))}/${source?.[5] ?? "-"}`, line: Number(source?.[6]) },
    ];
    expect(
      ROSTER.producer.lines.map(entry => ({ path: entry.path, line: entry.line })),
      "the producer lines are the source citations'",
    ).toEqual(cited);
    expect([source?.[4], source?.[8]].every(pin => PRODUCER_PIN.startsWith(pin ?? "-")), "the producer pin is the citations'").toBe(true);
    expect(ROSTER.producer.sha, "the producer block's pin").toBe(PRODUCER_PIN);
    const quoted = [source?.[3] ?? "-", source?.[7] ?? "-"];
    for (const [index, quote] of quoted.entries()) expect(ROSTER.producer.lines[index]?.text ?? "", `the producer line carries '${quote}'`).toContain(quote);
    const producerText = ROSTER.producer.lines.map(entry => entry.text.toLowerCase()).join("\n");
    for (const status of STATUSES) expect(producerText, `the producer names ${status}`).toContain(status);
  });

  it("roster: the judged rows, the quotes, the cases, the residual members, the mutants and the registered tests equal test/fixtures/mw-gp-feedback-status-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(Object.fromEntries(CHECKS.map(check => [check, CASES[check].map(caseLine)])), "the cases and their expectations equal the roster's").toEqual(ROSTER.cases);
    expect(RESIDUAL_MEMBERS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(MUTANTS.map(mutantLine), "the mutants and their declared checks equal the roster's").toEqual(ROSTER.mutants);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "and each compare held",
    ).toEqual([]);
  });
});
