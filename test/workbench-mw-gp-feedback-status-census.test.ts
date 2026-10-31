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
 * MEASURED (read-only, 2026-10-28: by the cutting seat at trunk df37dac, re-measured by the respin seat at trunk 5fbe25e).
 * Producer (the local MechanicalWorkflows checkout, git show at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8;
 * the roster's producer block holds both cited lines and their blobs, and this census never re-reads the producer):
 * docs/programs/graph-policy-coordination-2026-10-18/README.md (blob 0dbff582a14c) :15 ends "Unknown/pending feedback
 * cannot be invented as observed reward; global team outcome alone does not attribute causal benefit to each actor." and
 * docs/programs/graph-policy-coordination-2026-10-18.md (blob 01ff00d480ec) :16 ends "Feedback corrections and promotion
 * remain outside the policy's evaluation." Pi: git's src listing (117 paths at 5fbe25e) holds no file naming a vocabulary
 * word (below); at the filing pin 758ec18187a5d66ba40b766caad38754b5313558 git's objects hold 115 src, 410 test and 59
 * docs blobs and none names one. The filing's other three search words are Pi's own words with other meanings: "pending"
 * (24 src files), "causal" (6: the observed-causal relation class, causalClaim, "causal gains" and a collective event's
 * causal_parents) and "attribution" (1). The live test tree names "reward" in three landed files (a GraphPolicyCLI error
 * code and a producer quote held as census data) besides this cut's two files. docs/workbench/09 lines 69, 71 and 73-75
 * and docs/workbench/18 line 29 (the filing's citations) are byte-identical at the filing pin and at the base, at the same
 * line numbers, and their three sections (09 "Relationships are typed and provenanced" and "Freshness and ambiguity", 18
 * "Key risks and mitigations") render the same blocks and table cells at both.
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
 *   own record), reward-on-statusless (a reward or causal benefit, zero and negative values included, on a decision or a
 *   promotion: neither kind carries a feedback status, so neither has an observed outcome to carry a value),
 *   correction-unreferenced (a correction naming no record of the log), status-outside-set (a feedback-bearing record
 *   whose status is missing or outside the set, compared exactly: a case variant, a status padded at either end and a
 *   status that only begins with a member are outside), reward-on-unobserved (a reward or causal benefit, zero and
 *   negative values included, on pending or unknown), observed-without-outcome (observed with no verifier or receipt
 *   outcome carrying a non-empty reference, for either kind, on each feedback-bearing kind: a team outcome, feedback and a
 *   correction), team-outcome-twice (a second team outcome for one episode, whatever the first one's status and whatever
 *   either one's actors) and team-outcome-copied (a per-actor reward or causal benefit - on feedback, or on a correction
 *   of a per-actor record (a feedback or a decision), directly or through a chain of corrections, the two fields alike -
 *   equal to a team-level reward of the episode or its even share over the team outcome's actors, with no actor-level
 *   verifier reference, any actor's). A correction's actor is its own, else the first one named along its chain of
 *   corrected records, a decision's included. The team-level rewards of an episode are its team outcome's and every
 *   correction's whose chain of corrected records ends at that team outcome, one naming an actor included, the original
 *   kept beside its corrections; another episode's team outcome derives nothing. The cases hold chains one to four
 *   corrections deep (R-DEEP-CHAIN names the bound this leaves). An admitted
 *   record is appended: the log returned is the input plus the record, every prior record byte-identical, and the
 *   caller's log untouched.
 * - THE CHECKS (judged by value, each over its own hand-authored cases): K-STATUS (24 cases), K-REWARD (30), K-TEAM (38),
 *   K-APPEND (8), K-OPERATOR (9). A case reads "ok", the typed refusal as code or code:field, or what went wrong (a caller
 *   log mutated, an admitted log that is not the input plus the record, a refusal naming another record). MUTANTS: 57
 *   validators, one fault each, each refused by exactly its declared checks; every check refuses one alone, and every
 *   typed refusal is some case's.
 * - THE ARMED REGISTRATIONS (SITES, empty today): a src module that names the vocabulary must register its validator
 *   there, and every check then judges it beside the reference; an unregistered naming module, a stale registration and a
 *   duplicate are findings.
 * - THE SRC READING (row N): every path git lists under src/ (tracked, plus untracked files git does not ignore), each a
 *   regular file read as text; a listed path that is not a regular file is unread, never skipped. A vocabulary word
 *   (reward and team outcome, the filing's search words Pi's src never uses; feedback status and causal benefit, the
 *   statement's R7 terms) is read case-insensitively (the i and u flags) anywhere in the path or the text: its parts in
 *   order, with any run, empty included, of these between them (SEPARATORS): JavaScript whitespace, the full stop, dash
 *   punctuation (Unicode Pd: the hyphen-minus, U+2010 HYPHEN, U+2011 NON-BREAKING HYPHEN, the en and em dashes ...), the
 *   minus sign U+2212, connector punctuation (Unicode Pc: the low line, U+FF3F FULLWIDTH LOW LINE ...) and format
 *   characters (Unicode Cf). The filing pin is read the same way from git's objects under src, test and docs.
 * - THE DOCS READING (rows P and C): each cited line is read in three legs. The raw leg: the line at the filing pin (git's
 *   objects) holds the text its row needs, and the same whole line stands in the live page. The pinned-section leg: the
 *   line's section at the filing pin, read in the shared rendered view (docsSection and sectionTables of
 *   test/helpers/census.ts: marked's lexer, the section heading once in the rendered view at level 2 under the page's
 *   title, the section bounded at the next level-1 or level-2 heading), carries no HTML and holds the text in exactly one
 *   rendered unit of the line's kind - a list item (09:69), a paragraph (09:71, 09:75), the section's own heading (09:73)
 *   or a table cell (18:29, in the Mitigation and test column of the risk "Source graph conflated with trace"). The
 *   live-section leg: the live section renders exactly the pinned section's blocks (sectionMatches, the adoption form: no
 *   HTML, block for block, a block's markdown included) and exactly its table cells (sectionTables' cell grid, markup
 *   kept) - section-bounded slice equality, never an includes-anywhere check. Each line is also read under seven
 *   live-page plants (PLANTS: dropped, edited, its text in strong emphasis, wrapped in an HTML comment, put in a code
 *   fence, moved out of its section, kept beside a withdrawal); the live-section leg refuses all seven, and the raw leg
 *   alone refuses only the first three.
 *
 * ROWS. A1-A4, the acceptance's four clauses; S1-S4, the statement's four clauses; P, the filing's docs/workbench/09
 * reading of the principle Pi already holds for projection data, and C, its docs/workbench/18 reading (each cited line
 * read by THE DOCS READING); N, the filing's absence sentence; Q, the residuals' pinned quiet rows.
 * RESIDUALS (named families, each member a pinned quiet row; a reading that starts reading a member reds its row):
 * R-COMPOSED (Q1: a word split by something other than SEPARATORS - an operator, an optional chain, a slash, a middle dot,
 * a comment or a comment's continuation, a quote - or escaped, spelled with a homoglyph or joined at run time),
 * R-SHARED-WORD (Q2: the filing's search words pending, causal and attribution, Pi words with other meanings),
 * R-UNNAMED-RECORD (Q3: a module that shapes a score or feedback record and names no vocabulary word - a score object, a
 * Feedback interface with a status field: what an R7 record means without its words is outside a text reading),
 * R-OTHER-DERIVATION (Q4: a per-actor value derived from the team outcome by other arithmetic - a weighted share, a
 * rounded share, the team reward less another actor's - is admitted: the check reads equality with a team-level reward
 * and its even share only), R-TEST-MENTION (Q5: a test file naming the vocabulary as text, this cut's census and roster
 * included, is outside the src leg), R-COORDINATED (Q6: a pin, a case, a code, a mutant or a residual member removed from
 * every literal of this file and the roster at once is quiet unless an anchor outside those literals reads it; its pinned
 * row computes the pin partition - every pin of rows A, S, P, C and N removed that way is reported by the export's bindings,
 * row Q's pins are the quiet set - and no outside anchor reads a case, a code, a mutant or a residual member) and
 * R-DEEP-CHAIN (Q7: a reading bounded at the depth of the deepest chain the cases hold, four corrections - a chain walk
 * bounded at four steps, a correction's actor read from the first five records of its chain only - meets every check;
 * its pinned row judges both members and reads that depth from the cases, so a deeper case reds it).
 * NOT CLAIMED: an R7 record in Pi or its full field list (R8 = wb-e66.3 owns the field list; this census judges the
 * honesty clause on a test-only record); who may write per-actor feedback beyond the operator facts; what a promotion's
 * subject names (it need not be a record of the log); that a verifier or receipt reference resolves; that an
 * actor-level verifier reference names the record's own actor (the acceptance's "actor-level verifier ref" names no
 * actor: any actor's admits, and A2b pins another actor's); the vocabulary in
 * live docs or test text (the live vocabulary leg reads src; the live docs leg reads the three cited sections only); that
 * a producer line reads the same past the pin; the members of R-COORDINATED (the labels, the statuses, the vocabulary,
 * the shared words, the docs lines and the producer lines are anchored outside this file).
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
import { type DocsSection, docsSection, sectionMatches, sectionTables } from "./helpers/census.js";
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
  "reward-on-statusless",
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

const NO_FAULTS: ReadonlySet<Fault> = new Set();
/** The steps a chain walk may take: as many as the log has records; chain-walk-two-steps, -three-steps and -four-steps fix the bound. */
function walkSteps(log: Log, faults: ReadonlySet<Fault>): number {
  if (faults.has("chain-walk-two-steps")) return 2;
  if (faults.has("chain-walk-three-steps")) return 3;
  return faults.has("chain-walk-four-steps") ? 4 : log.length;
}
/** The records of a correction's chain its actor is read from: all of them; actor-read-first-three and -first-five fix the window. */
function actorWindow(chain: readonly FeedbackRecord[], faults: ReadonlySet<Fault>): number {
  if (faults.has("actor-read-first-three")) return 3;
  return faults.has("actor-read-first-five") ? 5 : chain.length;
}
/**
 * A record and the records its chain of corrections names, in order: the walk ends at a record that is not a correction,
 * at a name the log does not hold, or after as many steps as the log has records.
 */
function chainOf(log: Log, record: FeedbackRecord, faults: ReadonlySet<Fault> = NO_FAULTS): FeedbackRecord[] {
  const chain: FeedbackRecord[] = [record];
  const steps = walkSteps(log, faults);
  let current: FeedbackRecord | undefined = record;
  while (current?.kind === "correction" && current.corrects !== undefined && chain.length <= log.length) {
    if (chain.length > steps) break;
    const named: string = current.corrects;
    current = log.find(entry => entry.id === named);
    if (current !== undefined) chain.push(current);
  }
  return chain;
}
/**
 * The values a per-actor record could copy from its episode's team outcome: every team-level reward - the team outcome's
 * and each correction's whose chain ends at it, one naming an actor included, the original kept beside its corrections -
 * and its even share over the team outcome's actors. Another episode's team outcome derives nothing.
 */
function derivedValues(log: Log, episode: string, faults: ReadonlySet<Fault> = NO_FAULTS): number[] {
  const has = (fault: Fault): boolean => faults.has(fault);
  const team = log.find(entry => entry.kind === "team-outcome" && (entry.episode === episode || has("episode-blind-derivation")));
  if (team === undefined) return [];
  const corrections = log.filter(entry => {
    if (entry.kind !== "correction" || has("team-correction-unread")) return false;
    if (entry.actor !== undefined && has("actor-naming-correction-underived")) return false;
    if (has("chained-team-correction-unread")) return entry.corrects === team.id;
    const root = chainOf(log, entry, faults).slice(-1)[0];
    return has("correction-root-any-team-outcome") ? root?.kind === "team-outcome" : root === team;
  });
  const read = has("latest-team-correction-only") ? corrections.slice(-1) : corrections;
  const sources = has("original-dropped-once-corrected") && read.length > 0 ? read : [team, ...read];
  const count = team.actors?.length ?? 0;
  return sources.flatMap(source => {
    const reward = source.reward;
    if (reward === undefined) return [];
    return count > 0 && !has("share-unread") ? [reward, reward / count] : [reward];
  });
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
  | "refuse-every-record"
  | "negative-unobserved-admitted"
  | "receipt-ref-unread"
  | "trimmed-status"
  | "twice-after-observed-only"
  | "correction-causal-uncopied"
  | "statusless-value-admitted"
  | "decision-value-unread"
  | "promotion-value-unread"
  | "statusless-causal-unread"
  | "outcome-read-on-feedback-only"
  | "trailing-trimmed-status"
  | "prefix-status"
  | "negative-statusless-admitted"
  | "twice-same-actors-only"
  | "episode-blind-derivation"
  | "team-correction-unread"
  | "chained-team-correction-unread"
  | "latest-team-correction-only"
  | "original-dropped-once-corrected"
  | "chained-actor-unread"
  | "zero-statusless-admitted"
  | "correction-root-any-team-outcome"
  | "correction-actor-from-root"
  | "chain-walk-two-steps"
  | "chain-walk-three-steps"
  | "actor-read-first-three"
  | "actor-naming-correction-underived"
  | "decision-actor-unread"
  | "chain-walk-four-steps"
  | "actor-read-first-five";

function validatorWith(faults: ReadonlySet<Fault>): Validator {
  const has = (fault: Fault): boolean => faults.has(fault);
  const refuse = (record: FeedbackRecord, code: string, field?: string): Appended => {
    if (has("untyped-refusal")) return { ok: false, code: "refused", record: record.id };
    const named = has("refusal-unnamed") ? "-" : record.id;
    return field === undefined ? { ok: false, code, record: named } : { ok: false, code, record: named, field };
  };
  const present = (value: number | undefined): boolean => (has("zero-reward-absent") ? value !== undefined && value !== 0 : value !== undefined);
  /** A negative value is still a value: only the negative-unobserved-admitted fault reads it as absent on an unobserved status. */
  const unobservedValue = (value: number | undefined): boolean => present(value) && !(has("negative-unobserved-admitted") && value !== undefined && value < 0);
  const statusOf = (record: FeedbackRecord): string | undefined => {
    const status = record.status === undefined && has("missing-status-observed") ? "observed" : record.status;
    if (has("trimmed-status")) return status?.trim();
    return has("trailing-trimmed-status") ? status?.trimEnd() : status;
  };
  const inSet = (status: string | undefined): boolean => {
    if (status === undefined) return false;
    if (has("open-status")) return status !== "";
    const read = has("case-folded-status") ? status.toLowerCase() : status;
    return has("prefix-status") ? STATUSES.some(member => read.startsWith(member)) : STATUSES.includes(read);
  };
  const observedBasis = (outcome: Outcome | undefined): boolean =>
    outcome !== undefined &&
    (has("any-outcome-kind") || outcome.kind === "verifier" || outcome.kind === "receipt") &&
    (has("empty-ref") || outcome.ref !== "" || (has("receipt-ref-unread") && outcome.kind === "receipt"));
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
      if (record.kind === "decision" || record.kind === "promotion") {
        const unread = has("statusless-value-admitted") || (record.kind === "decision" && has("decision-value-unread")) || (record.kind === "promotion" && has("promotion-value-unread"));
        for (const field of VALUE_FIELDS) {
          if (unread || (field === "causalBenefit" && has("statusless-causal-unread"))) continue;
          const value = fieldValue(record, field);
          const admitted = (has("negative-statusless-admitted") && value !== undefined && value < 0) || (has("zero-statusless-admitted") && value === 0);
          if (value !== undefined && !admitted) return refuse(record, "reward-on-statusless", field);
        }
      }
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
            if (unobservedValue(fieldValue(record, field))) return refuse(record, "reward-on-unobserved", field);
          }
        }
        const basisRead = !has("outcome-optional") && (record.kind === "feedback" || !has("outcome-read-on-feedback-only"));
        if (status === "observed" && basisRead && !observedBasis(record.outcome)) return refuse(record, "observed-without-outcome");
      }
      const counted = (entry: FeedbackRecord): boolean => !has("twice-after-observed-only") || entry.status === "observed";
      const sameActors = (entry: FeedbackRecord): boolean => !has("twice-same-actors-only") || isDeepStrictEqual(entry.actors, record.actors);
      if (
        record.kind === "team-outcome" &&
        !has("team-outcome-twice-admitted") &&
        log.some(entry => entry.kind === "team-outcome" && entry.episode === record.episode && counted(entry) && sameActors(entry))
      ) {
        return refuse(record, "team-outcome-twice");
      }
      // A correction's actor is its own, else the first one named along its chain of corrected records, a decision's
      // included; chained-actor-unread reads the correction and the record it names only, actor-read-first-three (and
      // -first-five) the chain's first three (five) records only, decision-actor-unread skips a decision, and
      // correction-actor-from-root reads the chain's last record only.
      const walked = has("chained-actor-unread") ? [record, ...(corrected === undefined ? [] : [corrected])] : chainOf(log, record, faults);
      const chain = walked.slice(0, actorWindow(walked, faults)).filter(entry => entry.kind !== "decision" || !has("decision-actor-unread"));
      const named = has("correction-actor-from-root") ? chain.slice(-1)[0]?.actor : chain.find(entry => entry.actor !== undefined)?.actor;
      const actor = record.kind === "correction" ? (has("correction-bypasses-team") ? undefined : named) : record.kind === "feedback" ? record.actor : undefined;
      if (actor !== undefined && !has("team-copy-unread")) {
        const derived = derivedValues(log, record.episode, faults);
        for (const field of VALUE_FIELDS) {
          if (field === "causalBenefit" && (has("causal-benefit-uncopied") || (record.kind === "correction" && has("correction-causal-uncopied")))) continue;
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
/** The operator's corrections of the team outcome: t1 corrected to 15 (even share 5), that correction corrected to 18 (share 6), and t1 corrected to 18 directly. */
const TEAM_FIX = correction("k15", { corrects: "t1", status: "observed", reward: 15, outcome: teamVerifier(EPISODE) });
const TEAM_FIX_OF_FIX = correction("k18", { corrects: "k15", status: "observed", reward: 18, outcome: teamVerifier(EPISODE) });
const TEAM_FIX_DIRECT = correction("k18", { corrects: "t1", status: "observed", reward: 18, outcome: teamVerifier(EPISODE) });
/** The base log with t1 corrected to 15. */
const CORRECTED: Log = [...BASE, TEAM_FIX];
/** The team outcome's chain three and four corrections deep: k18 corrected to 21 (share 7), and that correction to 24 (share 8). */
const TEAM_FIX_DEPTH3 = correction("k21", { corrects: "k18", status: "observed", reward: 21, outcome: teamVerifier(EPISODE) });
const TEAM_FIX_DEPTH4 = correction("k24", { corrects: "k21", status: "observed", reward: 24, outcome: teamVerifier(EPISODE) });
/** The base log with t1 corrected through k15 and k18 to 21 (k21's chain ends at t1 after three steps), then to 24 (four). */
const CHAINED3: Log = [...CORRECTED, TEAM_FIX_OF_FIX, TEAM_FIX_DEPTH3];
const CHAINED4: Log = [...CHAINED3, TEAM_FIX_DEPTH4];
/** The operator's correction of the team outcome that names an actor, a2, to reward 9 (share 3), on a2's receipt: admitted, a team-level reward still. */
const ACTOR_TEAM_FIX = correction("k9", { corrects: "t1", actor: "a2", status: "observed", reward: 9, outcome: actorReceipt("a2") });
/**
 * The actor-naming correction in four forms, each with the log it is appended to: direct or through k15, naming a team actor
 * or z1/z2 outside the team, on an actor receipt or an actor verifier - every pair of those choices is taken by some form.
 */
const ACTOR_NAMING_FIXES: readonly (readonly [string, Log, FeedbackRecord])[] = [
  ["direct, a team actor, on a receipt", BASE, ACTOR_TEAM_FIX],
  ["direct, an actor outside the team, on a verifier", BASE, correction("k31", { corrects: "t1", actor: "z1", status: "observed", reward: 42, outcome: actorVerifier("z1") })],
  ["through k15, a team actor, on a verifier", CORRECTED, correction("k32", { corrects: "k15", actor: "a3", status: "observed", reward: 30, outcome: actorVerifier("a3") })],
  ["through k15, an actor outside the team, on a receipt", CORRECTED, correction("k33", { corrects: "k15", actor: "z2", status: "observed", reward: 33, outcome: actorReceipt("z2") })],
];
/** The operator's correction of a1's feedback, on a1's own verifier: the chained per-actor case corrects it. */
const F1_FIX = correction("k6", { corrects: "f1", status: "observed", reward: 6, outcome: actorVerifier("a1") });
/** k6 corrected (k25), and that correction corrected again (k26), each unknown and carrying no value. */
const F1_FIX_OF_FIX = correction("k25", { corrects: "k6", status: "unknown" });
const F1_FIX_DEPTH3 = correction("k26", { corrects: "k25", status: "unknown" });
/** The base log with a1's feedback corrected through k6 and k25 (a correction of k25 is three steps from f1), then k26 (four). */
const PER_ACTOR3: Log = [...BASE, F1_FIX, F1_FIX_OF_FIX];
const PER_ACTOR4: Log = [...PER_ACTOR3, F1_FIX_DEPTH3];
/** The operator's correction of a1's decision d1 (unknown, no value): a correction of k27 is two steps from d1. */
const DECISION_FIX = correction("k27", { corrects: "d1", status: "unknown" });
/** The base log with another episode's team outcome (ep-13, reward 20) corrected to 22: neither derives for ep-1. */
const OTHER_FIXED: Log = [
  ...BASE,
  teamOutcome("t13", "ep-13", ["h1", "h2"], { status: "observed", reward: 20, outcome: teamVerifier("ep-13") }),
  correction("k22", { episode: "ep-13", corrects: "t13", status: "observed", reward: 22, outcome: teamVerifier("ep-13") }),
];
/** An observed outcome whose reference is empty, of either kind. */
const EMPTY_VERIFIER: Outcome = { kind: "verifier", ref: "", level: "actor" };
const EMPTY_RECEIPT: Outcome = { kind: "receipt", ref: "", level: "actor" };

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
  at("s-padded", BASE, feedback("s9", { status: " observed", reward: 2, outcome: actorReceipt("a2") }), "status-outside-set"),
  at("s-trailing", BASE, feedback("s10", { status: "observed ", reward: 2, outcome: actorReceipt("a2") }), "status-outside-set"),
  at("s-extended", BASE, feedback("s11", { status: "observedX", reward: 2, outcome: actorReceipt("a2") }), "status-outside-set"),
  at("s-team-missing", [], teamOutcome("t21", "ep-21", ["b1"], { reward: 8, outcome: teamVerifier("ep-21") }), "status-outside-set"),
  at("s-team-case", [], teamOutcome("t22", "ep-22", ["b1"], { status: "Observed", reward: 8, outcome: teamVerifier("ep-22") }), "status-outside-set"),
  at("s-team-empty", [], teamOutcome("t23", "ep-23", ["b1"], { status: "" }), "status-outside-set"),
  at("s-team-padded", [], teamOutcome("t24", "ep-24", ["b1"], { status: " observed", reward: 8, outcome: teamVerifier("ep-24") }), "status-outside-set"),
  at("s-team-trailing", [], teamOutcome("t25", "ep-25", ["b1"], { status: "observed ", reward: 8, outcome: teamVerifier("ep-25") }), "status-outside-set"),
  at("s-team-extended", [], teamOutcome("t26", "ep-26", ["b1"], { status: "observedX", reward: 8, outcome: teamVerifier("ep-26") }), "status-outside-set"),
  at("s-correction-missing", BASE, correction("s21", { corrects: "f1", reward: 6, outcome: actorVerifier("a1") }), "status-outside-set"),
  at("s-correction-case", BASE, correction("s22", { corrects: "f1", status: "Observed", reward: 6, outcome: actorVerifier("a1") }), "status-outside-set"),
  at("s-correction-empty", BASE, correction("s23", { corrects: "f1", status: "" }), "status-outside-set"),
  at("s-correction-padded", BASE, correction("s24", { corrects: "f1", status: " observed", reward: 6, outcome: actorVerifier("a1") }), "status-outside-set"),
  at("s-correction-trailing", BASE, correction("s25", { corrects: "f1", status: "observed ", reward: 6, outcome: actorVerifier("a1") }), "status-outside-set"),
  at("s-correction-extended", BASE, correction("s26", { corrects: "f1", status: "observedX", reward: 6, outcome: actorVerifier("a1") }), "status-outside-set"),
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
  at("r-pending-negative", BASE, feedback("r14", { status: "pending", reward: -3 }), "reward-on-unobserved:reward"),
  at("r-empty-receipt-ref", BASE, feedback("r15", { status: "observed", reward: 5, outcome: { kind: "receipt", ref: "", level: "actor" } }), "observed-without-outcome"),
  at("r-decision-reward", BASE, decision("r16", "a2", { reward: 5 }), "reward-on-statusless:reward"),
  at("r-promotion-causal", BASE, promotion("r17", { causalBenefit: 2 }), "reward-on-statusless:causalBenefit"),
  at("r-team-no-outcome", [], teamOutcome("t11", "ep-11", ["g1", "g2"], { status: "observed", reward: 8 }), "observed-without-outcome"),
  at("r-correction-no-outcome", BASE, correction("r18", { corrects: "f1", status: "observed", reward: 6 }), "observed-without-outcome"),
  at("r-decision-negative", BASE, decision("r19", "a2", { reward: -5 }), "reward-on-statusless:reward"),
  at("r-promotion-negative", BASE, promotion("r20", { causalBenefit: -2 }), "reward-on-statusless:causalBenefit"),
  at("r-team-empty-ref", [], teamOutcome("t31", "ep-31", ["g1", "g2"], { status: "observed", reward: 8, outcome: EMPTY_VERIFIER }), "observed-without-outcome"),
  at("r-team-empty-receipt-ref", [], teamOutcome("t32", "ep-32", ["g1", "g2"], { status: "observed", reward: 8, outcome: EMPTY_RECEIPT }), "observed-without-outcome"),
  at("r-team-self-report", [], teamOutcome("t33", "ep-33", ["g1", "g2"], { status: "observed", reward: 8, outcome: SELF_REPORT }), "observed-without-outcome"),
  at("r-correction-empty-ref", BASE, correction("r21", { corrects: "f1", status: "observed", reward: 6, outcome: EMPTY_VERIFIER }), "observed-without-outcome"),
  at("r-correction-empty-receipt-ref", BASE, correction("r22", { corrects: "f1", status: "observed", reward: 6, outcome: EMPTY_RECEIPT }), "observed-without-outcome"),
  at("r-correction-self-report", BASE, correction("r23", { corrects: "f1", status: "observed", reward: 6, outcome: SELF_REPORT }), "observed-without-outcome"),
  at("r-decision-causal-zero", BASE, decision("r24", "a2", { causalBenefit: 0 }), "reward-on-statusless:causalBenefit"),
  at("r-promotion-reward-zero", BASE, promotion("r25", { reward: 0 }), "reward-on-statusless:reward"),
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
  at(
    "t-twice-after-pending",
    [teamOutcome("t6", "ep-6", ["e1"], { status: "pending" })],
    teamOutcome("t7", "ep-6", ["e1"], { status: "observed", reward: 4, outcome: teamVerifier("ep-6") }),
    "team-outcome-twice",
  ),
  at("t-correction-copy-causal", BASE, correction("c11", { corrects: "f1", status: "observed", causalBenefit: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:causalBenefit"),
  at("t-twice-other-actors", BASE, teamOutcome("t12", EPISODE, ["b1"], { status: "observed", reward: 9, outcome: teamReceipt(EPISODE) }), "team-outcome-twice"),
  at("t-other-episode-copy", BASE, feedback("c12", { episode: "ep-12", status: "observed", reward: 12, outcome: actorReceipt("a2") }), "ok"),
  at("t-corrected-share", CORRECTED, feedback("c13", { status: "observed", reward: 5, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-corrected-chain", [...CORRECTED, TEAM_FIX_OF_FIX], feedback("c14", { status: "observed", reward: 18, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-corrected-earlier", [...CORRECTED, TEAM_FIX_DIRECT], feedback("c15", { status: "observed", reward: 5, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-corrected-original", CORRECTED, feedback("c16", { status: "observed", reward: 4, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-correction-chain-copy", [...BASE, F1_FIX], correction("c17", { corrects: "k6", status: "observed", reward: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:reward"),
  at("t-other-episode-correction", OTHER_FIXED, feedback("c19", { status: "observed", reward: 22, outcome: actorReceipt("a2") }), "ok"),
  at("t-correction-chain-copy-causal", [...BASE, F1_FIX], correction("c18", { corrects: "k6", status: "observed", causalBenefit: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:causalBenefit"),
  at("t-correction-own-actor", BASE, correction("c20", { corrects: "t1", actor: "a2", status: "observed", reward: 4, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at(
    "t-correction-chain-actor",
    [...BASE, correction("k23", { corrects: "t1", actor: "a3", status: "unknown" })],
    correction("c21", { corrects: "k23", status: "observed", reward: 4, outcome: actorReceipt("a3") }),
    "team-outcome-copied:reward",
  ),
  at("t-corrected-depth3", CHAINED3, feedback("c22", { status: "observed", reward: 21, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-corrected-depth4-share", CHAINED4, feedback("c27", { status: "observed", reward: 8, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-actor-team-correction", BASE, ACTOR_TEAM_FIX, "ok"),
  at(
    "t-actor-team-correction-copy",
    [...BASE, ACTOR_TEAM_FIX],
    feedback("c25", { actor: "a3", status: "observed", reward: 9, outcome: actorReceipt("a3") }),
    "team-outcome-copied:reward",
  ),
  at("t-actor-team-correction-own-copy", [...BASE, ACTOR_TEAM_FIX], feedback("c31", { status: "observed", reward: 9, outcome: actorReceipt("a2") }), "team-outcome-copied:reward"),
  at("t-correction-depth3-copy", PER_ACTOR3, correction("c23", { corrects: "k25", status: "observed", reward: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:reward"),
  at(
    "t-correction-depth4-copy-causal",
    PER_ACTOR4,
    correction("c24", { corrects: "k26", status: "observed", causalBenefit: 4, outcome: actorReceipt("a1") }),
    "team-outcome-copied:causalBenefit",
  ),
  at("t-correction-decision-copy", BASE, correction("c26", { corrects: "d1", status: "observed", reward: 4, outcome: actorReceipt("a1") }), "team-outcome-copied:reward"),
  at(
    "t-correction-decision-copy-causal",
    BASE,
    correction("c28", { corrects: "d2", status: "observed", causalBenefit: 4, outcome: actorReceipt("a2") }),
    "team-outcome-copied:causalBenefit",
  ),
  at(
    "t-correction-decision-chain-copy",
    [...BASE, DECISION_FIX],
    correction("c29", { corrects: "k27", status: "observed", reward: 4, outcome: actorReceipt("a1") }),
    "team-outcome-copied:reward",
  ),
  at(
    "t-correction-decision-chain-copy-causal",
    [...BASE, DECISION_FIX],
    correction("c30", { corrects: "k27", status: "observed", causalBenefit: 4, outcome: actorReceipt("a1") }),
    "team-outcome-copied:causalBenefit",
  ),
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
  mutant("M30", "negative-unobserved-admitted", ["K-REWARD"]),
  mutant("M31", "receipt-ref-unread", ["K-REWARD"]),
  mutant("M32", "trimmed-status", ["K-STATUS"]),
  mutant("M33", "twice-after-observed-only", ["K-TEAM"]),
  mutant("M34", "correction-causal-uncopied", ["K-TEAM"]),
  mutant("M35", "statusless-value-admitted", ["K-REWARD"]),
  mutant("M36", "decision-value-unread", ["K-REWARD"]),
  mutant("M37", "promotion-value-unread", ["K-REWARD"]),
  mutant("M38", "statusless-causal-unread", ["K-REWARD"]),
  mutant("M39", "outcome-read-on-feedback-only", ["K-REWARD"]),
  mutant("M40", "trailing-trimmed-status", ["K-STATUS"]),
  mutant("M41", "prefix-status", ["K-STATUS"]),
  mutant("M42", "negative-statusless-admitted", ["K-REWARD"]),
  mutant("M43", "twice-same-actors-only", ["K-TEAM"]),
  mutant("M44", "episode-blind-derivation", ["K-TEAM"]),
  mutant("M45", "team-correction-unread", ["K-TEAM"]),
  mutant("M46", "chained-team-correction-unread", ["K-TEAM"]),
  mutant("M47", "latest-team-correction-only", ["K-TEAM"]),
  mutant("M48", "original-dropped-once-corrected", ["K-TEAM"]),
  mutant("M49", "chained-actor-unread", ["K-TEAM"]),
  mutant("M50", "zero-statusless-admitted", ["K-REWARD"]),
  mutant("M51", "correction-root-any-team-outcome", ["K-TEAM"]),
  mutant("M52", "correction-actor-from-root", ["K-TEAM"]),
  mutant("M53", "chain-walk-two-steps", ["K-TEAM"]),
  mutant("M54", "chain-walk-three-steps", ["K-TEAM"]),
  mutant("M55", "actor-read-first-three", ["K-TEAM"]),
  mutant("M56", "actor-naming-correction-underived", ["K-TEAM"]),
  mutant("M57", "decision-actor-unread", ["K-TEAM"]),
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
/**
 * What may stand between a word's parts, any run of it, empty included: JavaScript whitespace, the full stop, dash
 * punctuation (Pd: the hyphen-minus, U+2010, U+2011, the en and em dashes ...), the minus sign U+2212, connector
 * punctuation (Pc: the low line, U+FF3F ...) and format characters (Cf).
 */
const SEPARATORS = "[\\s.\\p{Pd}\\u2212\\p{Pc}\\p{Cf}]*";
/** A word's reading: its parts in order, any case, with SEPARATORS between them. */
const readerOf = (word: Word): RegExp => new RegExp(partsOf(word.spelling).map(escapeRegex).join(SEPARATORS), "iu");
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
const HYPHEN = String.fromCodePoint(0x2010);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
const EN_DASH = String.fromCodePoint(0x2013);
const MINUS_SIGN = String.fromCodePoint(0x2212);
const FULLWIDTH_LOW_LINE = String.fromCodePoint(0xff3f);
const SOFT_HYPHEN = String.fromCodePoint(0xad);
const NO_BREAK_SPACE = String.fromCodePoint(0xa0);
const MIDDLE_DOT = String.fromCodePoint(0xb7);
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
  ["hyphen U+2010", `team${HYPHEN}outcome`],
  ["non-breaking hyphen U+2011", `feedback${NON_BREAKING_HYPHEN}status`],
  ["en dash U+2013", `causal${EN_DASH}benefit`],
  ["minus sign U+2212", `team${MINUS_SIGN}outcome`],
  ["fullwidth low line U+FF3F", `feedback${FULLWIDTH_LOW_LINE}status`],
  ["soft hyphen U+00AD", `causal${SOFT_HYPHEN}benefit`],
  ["no-break space U+00A0", `team${NO_BREAK_SPACE}outcome`],
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
/** The rendered unit that carries a cited line's text in its section. */
type Carrier = "list item" | "paragraph" | "heading" | "table cell";
interface DocLine {
  readonly page: string;
  readonly line: number;
  readonly text: string;
  /** The level-2 section the line renders in (the heading line :73 is that section's own heading). */
  readonly section: string;
  readonly carrier: Carrier;
}
/** The dash in the cited pages' titles (U+2014), built from its code point so this file stays ASCII. */
const EM_DASH = String.fromCodePoint(0x2014);
/** Each cited page's level-1 title: its cited sections bind under it (the rendered view's parent heading path). */
const PAGE_TITLES: Readonly<Record<string, string>> = {
  [DOCS_09]: `09 ${EM_DASH} Observation, telemetry, provenance and derived graph`,
  [DOCS_18]: `18 ${EM_DASH} Decisions, risks, deliberate defaults and re-evaluation triggers`,
};
const RELATIONSHIPS = "Relationships are typed and provenanced";
const FRESHNESS = "Freshness and ambiguity";
const RISKS = "Key risks and mitigations";
/** The filing's docs citations: docs/workbench/09 :69, :71, :73-75 (line 74 is blank) and docs/workbench/18 :29, each with the text its row needs, its section and its carrier. */
const DOCS_LINES: readonly DocLine[] = [
  { page: DOCS_09, line: 69, text: "inferred possible relationship (hypothesis; never treated as authoritative)", section: RELATIONSHIPS, carrier: "list item" },
  { page: DOCS_09, line: 71, text: "Missing edges do not imply independence.", section: RELATIONSHIPS, carrier: "paragraph" },
  { page: DOCS_09, line: 73, text: `## ${FRESHNESS}`, section: FRESHNESS, carrier: "heading" },
  { page: DOCS_09, line: 75, text: "UI shows STALE/UNKNOWN visibly.", section: FRESHNESS, carrier: "paragraph" },
  { page: DOCS_18, line: 29, text: "distinguish declared/observed/inferred", section: RISKS, carrier: "table cell" },
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
  /** The raw leg at the pin: the pinned page's line holds the text. */
  readonly pin: boolean;
  /** The raw leg live: the same whole line stands in the live page. */
  readonly head: boolean;
  /** The pinned-section leg: "" when the pinned section, in the rendered view, carries no HTML and holds the text in exactly one unit of the line's carrier; else why. */
  readonly pinSection: string;
  /** The live-section leg: "" when the live section renders exactly the pinned section's blocks and table cells (slice equality); else why. */
  readonly headSection: string;
}
/** A cited line's section in the shared rendered view: unique at level 2 under its page's title, bounded at the next level-1 or level-2 heading. */
const sectionOf = (markdown: string, entry: DocLine): DocsSection => docsSection(markdown, entry.section, 2, [PAGE_TITLES[entry.page] ?? "-"]);
/** The same section's tables as cell grids (marked's cell source, markup kept), from the one binding docsSection uses. */
const gridsOf = (markdown: string, entry: DocLine): readonly (readonly (readonly string[])[])[] =>
  sectionTables(markdown, entry.section, 2, [PAGE_TITLES[entry.page] ?? "-"]).grids;
/** The rendered units of the line's section that hold its text: list items, paragraphs, any other block by kind, and a table's cells (read from its grid, never from the table's joined text). */
function carriersOf(markdown: string, entry: DocLine): string[] {
  const units = sectionOf(markdown, entry).blocks.flatMap((block): string[] => {
    if (block.kind === "list") return block.items.filter(item => item.text.includes(entry.text)).map(() => "list item");
    if (block.kind === "other") return block.type !== "table" && block.text.includes(entry.text) ? [block.type] : [];
    return block.text.includes(entry.text) ? [block.kind] : [];
  });
  const cells = gridsOf(markdown, entry)
    .flatMap(grid => grid.flat())
    .filter(cell => cell.includes(entry.text))
    .map(() => "table cell");
  return [...units, ...cells];
}
/** The pinned-section leg: the section binds, carries no HTML, and its line's carrier holds the text exactly once (the heading line is the section's own heading). */
function pinSectionWhy(pinned: string, entry: DocLine): string {
  const section = sectionOf(pinned, entry);
  if (!section.ok) return section.why;
  if (section.hasHtml) return "the pinned section carries HTML";
  if (entry.carrier === "heading") {
    const held = pinned.split("\n")[entry.line - 1] ?? "";
    return held === entry.text && held === `## ${entry.section}` ? "" : `line ${entry.line} is not the cited text as the section's own heading`;
  }
  const found = carriersOf(pinned, entry);
  return isDeepStrictEqual(found, [entry.carrier]) ? "" : `the pinned section holds the text in ${JSON.stringify(found)}, not in exactly one ${entry.carrier}`;
}
/** The live-section leg: the live section renders exactly the pinned section's blocks (sectionMatches) and exactly its cell grids. */
function headSectionWhy(pinned: string, live: string, entry: DocLine): string {
  const held = sectionOf(pinned, entry);
  if (!held.ok) return `the pinned section is refused: ${held.why}`;
  const match = sectionMatches(sectionOf(live, entry), held.blocks);
  if (!match.ok) return match.why;
  return isDeepStrictEqual(gridsOf(live, entry), gridsOf(pinned, entry)) ? "" : "the live section's table cells differ from the pinned section's";
}
/** An anchor read over a pinned page and a live page, in the raw leg and both section legs. */
function anchorIn(entry: DocLine, pinned: string, live: string): DocAnchor {
  const held = pinned.split("\n")[entry.line - 1] ?? "";
  return {
    line: entry.line,
    pin: entry.text !== "" && held.includes(entry.text),
    head: held !== "" && live.split("\n").includes(held),
    pinSection: pinSectionWhy(pinned, entry),
    headSection: headSectionWhy(pinned, live, entry),
  };
}
const FALLBACK_LINE: DocLine = { page: "-", line: 0, text: "", section: "-", carrier: "paragraph" };
const docLine = (page: string, line: number): DocLine => DOCS_LINES.find(entry => entry.page === page && entry.line === line) ?? { ...FALLBACK_LINE, page, line };
/** The live-page plants every cited line is read under. */
type Plant = "dropped" | "edited" | "markup" | "comment" | "fence" | "moved" | "withdrawal";
const PLANTS: readonly Plant[] = ["dropped", "edited", "markup", "comment", "fence", "moved", "withdrawal"];
/** The live page with its cited line dropped, edited in place, its text in strong emphasis, wrapped in an HTML comment, put in a code fence, moved to a trailing section at EOF, or kept beside a withdrawal paragraph. */
function plantedPage(live: string, held: string, entry: DocLine, plant: Plant): string {
  const lines = live.split("\n");
  const index = lines.indexOf(held);
  if (index < 0) return live;
  const before = lines.slice(0, index);
  const after = lines.slice(index + 1);
  const planted: Readonly<Record<Plant, readonly string[]>> = {
    dropped: [...before, ...after],
    edited: [...before, held.replace(entry.text, `${entry.text} (edited)`), ...after],
    markup: [...before, held.replace(entry.text, `**${entry.text}**`), ...after],
    comment: [...before, "<!--", held, "-->", ...after],
    fence: [...before, "```text", held, "```", ...after],
    moved: [...before, ...after, "", "## Moved", "", held],
    withdrawal: [...before, held, "", "Withdrawn: the line above no longer holds.", "", ...after],
  };
  return planted[plant].join("\n");
}
/** Each plant's reading of a cited line: does the raw whole line still stand live, and does the live-section leg hold. */
function plantReadings(entry: DocLine, pinned: string, live: string): Record<string, { readonly head: boolean; readonly section: boolean }> {
  const held = pinned.split("\n")[entry.line - 1] ?? "";
  return Object.fromEntries(
    PLANTS.map(plant => {
      const anchor = anchorIn(entry, pinned, plantedPage(live, held, entry, plant));
      return [plant, { head: anchor.head, section: anchor.headSection === "" }];
    }),
  );
}
/** What every plant reads: the raw leg loses only a dropped, edited or marked-up line; the live-section leg refuses all seven. */
const PLANTS_READ: Readonly<Record<Plant, { readonly head: boolean; readonly section: boolean }>> = {
  dropped: { head: false, section: false },
  edited: { head: false, section: false },
  markup: { head: false, section: false },
  comment: { head: true, section: false },
  fence: { head: true, section: false },
  moved: { head: true, section: false },
  withdrawal: { head: true, section: false },
};
/** A carrier the line does not render in, for the pinned-section leg's control. */
const OTHER_CARRIER: Readonly<Record<Carrier, Carrier>> = { "list item": "paragraph", paragraph: "list item", heading: "paragraph", "table cell": "paragraph" };
/**
 * The pin legs' controls, each expected to fail: an edited text (both pin legs), the next line (the raw leg), another
 * carrier, an HTML comment beside the line in its pinned section, and the line duplicated in it (the pinned-section leg).
 */
function pinControls(entry: DocLine, pinned: string, live: string): Record<string, boolean> {
  const held = pinned.split("\n")[entry.line - 1] ?? "";
  const besides = (extra: readonly string[]): string =>
    pinned
      .split("\n")
      .flatMap((text, index) => (index === entry.line - 1 ? [text, ...extra] : [text]))
      .join("\n");
  const edited = anchorIn({ ...entry, text: `${entry.text} (edited)` }, pinned, live);
  return {
    editedPin: edited.pin,
    editedSection: edited.pinSection === "",
    nextLinePin: anchorIn({ ...entry, line: entry.line + 1 }, pinned, live).pin,
    otherCarrierSection: anchorIn({ ...entry, carrier: OTHER_CARRIER[entry.carrier] }, pinned, live).pinSection === "",
    htmlBesideSection: pinSectionWhy(besides(["", "<!-- a note -->"]), entry) === "",
    duplicatedSection: pinSectionWhy(besides(["", held]), entry) === "",
  };
}
const PIN_CONTROLS_READ = { editedPin: false, editedSection: false, nextLinePin: false, otherCarrierSection: false, htmlBesideSection: false, duplicatedSection: false };
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
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
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
  Q7: "R-DEEP-CHAIN",
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
      { id: "slashed", text: 'export const path = "team/outcome";\n' },
      { id: "middle-dot", text: `export const label = "team${MIDDLE_DOT}outcome";\n` },
      { id: "optional-chain", text: "export const status = row.feedback?.status;\n" },
      { id: "comment-continuation", text: "/**\n * the team\n * outcome of a run\n */\nexport const run = 1;\n" },
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
    members: [
      { id: "unnamed", text: 'export const score = { actor: "a1", state: "pending", value: 3 };\n' },
      { id: "feedback-interface", text: 'export interface Feedback {\n  readonly status: "pending";\n}\n' },
    ],
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
/** Q7's members: readings bounded at the depth of the deepest chain the cases hold (four corrections), each judged like the reference. */
const DEEP_CHAIN: readonly { readonly id: string; readonly fault: Fault }[] = [
  { id: "walk-four-steps", fault: "chain-walk-four-steps" },
  { id: "actor-first-five", fault: "actor-read-first-five" },
];
/** Every residual family's member ids. */
const RESIDUAL_MEMBERS: Readonly<Record<string, readonly string[]>> = {
  ...Object.fromEntries(RESIDUALS.map(family => [family.id, family.members.map(member => member.id)])),
  Q4: DERIVATIONS.map(entry => entry.id),
  Q5: TEST_MENTION,
  Q6: COORDINATED,
  Q7: DEEP_CHAIN.map(member => member.id),
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
    const read = readingsOf([
      "r-pending",
      "r-unknown",
      "r-pending-zero",
      "r-pending-negative",
      "r-unknown-causal",
      "r-pending-receipt",
      "r-team-pending",
      "r-correction-unknown",
      "r-verifier",
      "r-receipt",
    ]);
    expect(read, "a value on an unobserved status is the typed refusal naming its field; an observed outcome's reward is appended").toEqual({
      "r-pending": "reward-on-unobserved:reward",
      "r-unknown": "reward-on-unobserved:reward",
      "r-pending-zero": "reward-on-unobserved:reward",
      "r-pending-negative": "reward-on-unobserved:reward",
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
      negative: statusMatrix({ reward: -2, outcome: actorReceipt("a2") }),
      causalBenefit: statusMatrix({ causalBenefit: 2, outcome: actorReceipt("a2") }),
      bare: statusMatrix({ outcome: actorReceipt("a2") }),
    };
    expect(matrix, "every status of the set, with and without a value: only observed carries one").toEqual({
      reward: { observed: "ok", pending: "reward-on-unobserved:reward", unknown: "reward-on-unobserved:reward" },
      zero: { observed: "ok", pending: "reward-on-unobserved:reward", unknown: "reward-on-unobserved:reward" },
      negative: { observed: "ok", pending: "reward-on-unobserved:reward", unknown: "reward-on-unobserved:reward" },
      causalBenefit: { observed: "ok", pending: "reward-on-unobserved:causalBenefit", unknown: "reward-on-unobserved:causalBenefit" },
      bare: { observed: "ok", pending: "ok", unknown: "ok" },
    });
    return matrix;
  },
  A2a: () => {
    const derived = derivedValues(BASE, EPISODE);
    expect(derived, "the episode's team reward and its even share over three actors").toEqual([12, 4]);
    const fixes = {
      "t1 corrected": readingOf(REFERENCE, at("fix", BASE, TEAM_FIX, "")),
      "the correction corrected": readingOf(REFERENCE, at("fix", CORRECTED, TEAM_FIX_OF_FIX, "")),
      "t1 corrected again": readingOf(REFERENCE, at("fix", CORRECTED, TEAM_FIX_DIRECT, "")),
      "three corrections deep": readingOf(REFERENCE, at("fix", [...CORRECTED, TEAM_FIX_OF_FIX], TEAM_FIX_DEPTH3, "")),
      "four corrections deep": readingOf(REFERENCE, at("fix", CHAINED3, TEAM_FIX_DEPTH4, "")),
    };
    expect(fixes, "the operator's corrections of the team outcome, direct or chained up to four deep, are appended: they name no actor").toEqual({
      "t1 corrected": "ok",
      "the correction corrected": "ok",
      "t1 corrected again": "ok",
      "three corrections deep": "ok",
      "four corrections deep": "ok",
    });
    const corrected = {
      once: derivedValues(CORRECTED, EPISODE),
      chained: derivedValues([...CORRECTED, TEAM_FIX_OF_FIX], EPISODE),
      direct: derivedValues([...CORRECTED, TEAM_FIX_DIRECT], EPISODE),
      depth3: derivedValues(CHAINED3, EPISODE),
      depth4: derivedValues(CHAINED4, EPISODE),
      otherEpisode: derivedValues(CORRECTED, "ep-12"),
      otherEpisodeFixed: derivedValues(OTHER_FIXED, EPISODE),
    };
    expect(
      corrected,
      "every team-level reward derives - the team outcome's and each correction's whose chain ends at it, one to four corrections deep, the original kept - with its even share over the team outcome's actors; another episode, and another episode's corrected team outcome, derive nothing",
    ).toEqual({
      once: [12, 4, 15, 5],
      chained: [12, 4, 15, 5, 18, 6],
      direct: [12, 4, 15, 5, 18, 6],
      depth3: [12, 4, 15, 5, 18, 6, 21, 7],
      depth4: [12, 4, 15, 5, 18, 6, 21, 7, 24, 8],
      otherEpisode: [],
      otherEpisodeFixed: [12, 4],
    });
    const actorNamed = Object.fromEntries(
      ACTOR_NAMING_FIXES.map(([label, log, fix]) => [label, { admitted: readingOf(REFERENCE, at("fix", log, fix, "")), derived: derivedValues([...log, fix], EPISODE) }]),
    );
    expect(
      actorNamed,
      "a correction of the team outcome naming an actor, in four forms that take every pair of choices among direct or through k15, a team actor or one outside the team, and an actor receipt or an actor verifier, is appended at a value nothing derives and is then a team-level reward with its even share",
    ).toEqual({
      "direct, a team actor, on a receipt": { admitted: "ok", derived: [12, 4, 9, 3] },
      "direct, an actor outside the team, on a verifier": { admitted: "ok", derived: [12, 4, 42, 14] },
      "through k15, a team actor, on a verifier": { admitted: "ok", derived: [12, 4, 15, 5, 30, 10] },
      "through k15, an actor outside the team, on a receipt": { admitted: "ok", derived: [12, 4, 15, 5, 33, 11] },
    });
    const read = readingsOf([
      "t-copy-reward",
      "t-copy-share",
      "t-not-derived",
      "t-no-team",
      "t-correction-team",
      "t-other-episode-copy",
      "t-other-episode-correction",
      "t-actor-team-correction",
      "t-actor-team-correction-copy",
      "t-actor-team-correction-own-copy",
    ]);
    expect(
      read,
      "a per-actor value equal to a derived value is refused; another value, an episode with no team outcome (another episode's team reward included), the team outcome's own correction and its actor-naming correction to a value nothing derives are not, and that correction's reward then derives for another actor and for the actor it names",
    ).toEqual({
      "t-copy-reward": "team-outcome-copied:reward",
      "t-copy-share": "team-outcome-copied:reward",
      "t-not-derived": "ok",
      "t-no-team": "ok",
      "t-correction-team": "ok",
      "t-other-episode-copy": "ok",
      "t-other-episode-correction": "ok",
      "t-actor-team-correction": "ok",
      "t-actor-team-correction-copy": "team-outcome-copied:reward",
      "t-actor-team-correction-own-copy": "team-outcome-copied:reward",
    });
    return { derived, fixes, corrected, actorNamed, read };
  },
  A2b: () => {
    const bases: readonly (readonly [string, Fields])[] = [
      ["actor verifier", { outcome: actorVerifier("a2") }],
      ["another actor's verifier", { outcome: actorVerifier("a1") }],
      ["actor receipt", { outcome: actorReceipt("a2") }],
      ["team verifier", { outcome: teamVerifier(EPISODE) }],
      ["team receipt", { outcome: teamReceipt(EPISODE) }],
      ["no outcome", {}],
    ];
    const matrix = Object.fromEntries(bases.map(([label, fields]) => [label, readingOf(REFERENCE, at(label, BASE, feedback("v1", { status: "observed", reward: 4, ...fields }), ""))]));
    expect(
      matrix,
      "the even share as a2's reward: an actor-level verifier reference admits it, a2's own or another actor's (the acceptance names no actor); an actor receipt, a team-level reference or no outcome does not",
    ).toEqual({
      "actor verifier": "ok",
      "another actor's verifier": "ok",
      "actor receipt": "team-outcome-copied:reward",
      "team verifier": "team-outcome-copied:reward",
      "team receipt": "team-outcome-copied:reward",
      "no outcome": "observed-without-outcome",
    });
    const read = readingsOf([
      "t-copy-causal",
      "t-actor-verifier",
      "t-correction-copy",
      "t-correction-copy-causal",
      "t-correction-chain-copy",
      "t-correction-chain-copy-causal",
      "t-correction-own-actor",
      "t-correction-chain-actor",
      "t-correction-depth3-copy",
      "t-correction-depth4-copy-causal",
      "t-correction-decision-copy",
      "t-correction-decision-copy-causal",
      "t-correction-decision-chain-copy",
      "t-correction-decision-chain-copy-causal",
    ]);
    expect(
      read,
      "the causal benefit, and a correction of a per-actor record - a feedback directly or through a chain of corrections one to four deep, a decision directly or through a correction of it, in either field, or naming its actor itself or along its chain - are held to the same reference",
    ).toEqual({
      "t-copy-causal": "team-outcome-copied:causalBenefit",
      "t-actor-verifier": "ok",
      "t-correction-copy": "team-outcome-copied:reward",
      "t-correction-copy-causal": "team-outcome-copied:causalBenefit",
      "t-correction-chain-copy": "team-outcome-copied:reward",
      "t-correction-chain-copy-causal": "team-outcome-copied:causalBenefit",
      "t-correction-own-actor": "team-outcome-copied:reward",
      "t-correction-chain-actor": "team-outcome-copied:reward",
      "t-correction-depth3-copy": "team-outcome-copied:reward",
      "t-correction-depth4-copy-causal": "team-outcome-copied:causalBenefit",
      "t-correction-decision-copy": "team-outcome-copied:reward",
      "t-correction-decision-copy-causal": "team-outcome-copied:causalBenefit",
      "t-correction-decision-chain-copy": "team-outcome-copied:reward",
      "t-correction-decision-chain-copy-causal": "team-outcome-copied:causalBenefit",
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
    expect(
      read,
      "every status of the set is admitted; another, a missing, a case-variant, a padded (at either end), an extended or an empty status is refused on every feedback-bearing kind",
    ).toEqual({
      "s-observed": "ok",
      "s-pending": "ok",
      "s-unknown": "ok",
      "s-other": "status-outside-set",
      "s-missing": "status-outside-set",
      "s-case": "status-outside-set",
      "s-empty": "status-outside-set",
      "s-team": "status-outside-set",
      "s-correction": "status-outside-set",
      "s-padded": "status-outside-set",
      "s-trailing": "status-outside-set",
      "s-extended": "status-outside-set",
      "s-team-missing": "status-outside-set",
      "s-team-case": "status-outside-set",
      "s-team-empty": "status-outside-set",
      "s-team-padded": "status-outside-set",
      "s-team-trailing": "status-outside-set",
      "s-team-extended": "status-outside-set",
      "s-correction-missing": "status-outside-set",
      "s-correction-case": "status-outside-set",
      "s-correction-empty": "status-outside-set",
      "s-correction-padded": "status-outside-set",
      "s-correction-trailing": "status-outside-set",
      "s-correction-extended": "status-outside-set",
    });
    return { statuses: [...STATUSES], read };
  },
  S1b: () => {
    const read = readingsOf([
      "r-verifier",
      "r-receipt",
      "r-no-outcome",
      "r-empty-ref",
      "r-empty-receipt-ref",
      "r-self-report",
      "r-observed-bare",
      "r-team-no-outcome",
      "r-team-empty-ref",
      "r-team-empty-receipt-ref",
      "r-team-self-report",
      "r-correction-no-outcome",
      "r-correction-empty-ref",
      "r-correction-empty-receipt-ref",
      "r-correction-self-report",
      "r-decision-reward",
      "r-promotion-causal",
      "r-decision-negative",
      "r-promotion-negative",
      "r-decision-causal-zero",
      "r-promotion-reward-zero",
    ]);
    expect(
      read,
      "observed needs a verifier or receipt outcome with a reference on feedback, a team outcome and a correction alike, and a decision or a promotion, which carries no status, carries no value, zero and negative ones included",
    ).toEqual({
      "r-verifier": "ok",
      "r-receipt": "ok",
      "r-no-outcome": "observed-without-outcome",
      "r-empty-ref": "observed-without-outcome",
      "r-empty-receipt-ref": "observed-without-outcome",
      "r-self-report": "observed-without-outcome",
      "r-observed-bare": "observed-without-outcome",
      "r-team-no-outcome": "observed-without-outcome",
      "r-team-empty-ref": "observed-without-outcome",
      "r-team-empty-receipt-ref": "observed-without-outcome",
      "r-team-self-report": "observed-without-outcome",
      "r-correction-no-outcome": "observed-without-outcome",
      "r-correction-empty-ref": "observed-without-outcome",
      "r-correction-empty-receipt-ref": "observed-without-outcome",
      "r-correction-self-report": "observed-without-outcome",
      "r-decision-reward": "reward-on-statusless:reward",
      "r-promotion-causal": "reward-on-statusless:causalBenefit",
      "r-decision-negative": "reward-on-statusless:reward",
      "r-promotion-negative": "reward-on-statusless:causalBenefit",
      "r-decision-causal-zero": "reward-on-statusless:causalBenefit",
      "r-promotion-reward-zero": "reward-on-statusless:reward",
    });
    const statuslessAt = (value: number): Record<string, Record<string, string>> =>
      Object.fromEntries(
        (["decision", "promotion"] as const).map(kind => [
          kind,
          Object.fromEntries(
            VALUE_FIELDS.map(field => {
              const fields: Fields = field === "reward" ? { reward: value } : { causalBenefit: value };
              const record = kind === "decision" ? decision("y1", "a2", fields) : promotion("y1", fields);
              return [field, readingOf(REFERENCE, at("y", BASE, record, ""))];
            }),
          ),
        ]),
      );
    const statusless = statuslessAt(0);
    expect(statusless, "a value, zero included, on either statusless kind is refused naming its field").toEqual({
      decision: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
      promotion: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
    });
    const negative = statuslessAt(-1);
    expect(negative, "and a negative value, in either field, on either statusless kind").toEqual({
      decision: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
      promotion: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
    });
    const positive = statuslessAt(2);
    expect(positive, "and a positive value, in either field, on either statusless kind").toEqual({
      decision: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
      promotion: { reward: "reward-on-statusless:reward", causalBenefit: "reward-on-statusless:causalBenefit" },
    });
    return { read, statusless, negative, positive };
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
    const read = readingsOf(["t-once", "t-twice", "t-twice-pending", "t-twice-after-pending", "t-twice-other-actors", "t-other-episode"]);
    expect(read, "one team outcome per episode; a second is refused whatever its status, its actors or the first one's").toEqual({
      "t-once": "ok",
      "t-twice": "team-outcome-twice",
      "t-twice-pending": "team-outcome-twice",
      "t-twice-after-pending": "team-outcome-twice",
      "t-twice-other-actors": "team-outcome-twice",
      "t-other-episode": "ok",
    });
    const carriers = BASE.filter(record => record.kind === "team-outcome").map(record => `${record.id}:${record.episode}:${record.actors?.length ?? 0}`);
    expect(carriers, "the base log records the team outcome once, on the episode's own record with its actors").toEqual(["t1:ep-1:3"]);
    return { read, carriers };
  },
  S3b: () => {
    const read = readingsOf([
      "t-copy-reward",
      "t-copy-share",
      "t-copy-share-receipt",
      "t-copy-causal",
      "t-copy-causal-team",
      "t-correction-copy",
      "t-correction-copy-causal",
      "t-corrected-share",
      "t-corrected-chain",
      "t-corrected-earlier",
      "t-corrected-original",
      "t-corrected-depth3",
      "t-corrected-depth4-share",
      "t-actor-team-correction-copy",
    ]);
    expect(
      read,
      "a team-level reward and its share - the team outcome's, or a correction's whose chain ends at it (up to four corrections deep, or naming an actor), the original kept beside it - copied into a per-actor reward or causal benefit, are refused naming the field",
    ).toEqual({
      "t-copy-reward": "team-outcome-copied:reward",
      "t-copy-share": "team-outcome-copied:reward",
      "t-copy-share-receipt": "team-outcome-copied:reward",
      "t-copy-causal": "team-outcome-copied:causalBenefit",
      "t-copy-causal-team": "team-outcome-copied:causalBenefit",
      "t-correction-copy": "team-outcome-copied:reward",
      "t-correction-copy-causal": "team-outcome-copied:causalBenefit",
      "t-corrected-share": "team-outcome-copied:reward",
      "t-corrected-chain": "team-outcome-copied:reward",
      "t-corrected-earlier": "team-outcome-copied:reward",
      "t-corrected-original": "team-outcome-copied:reward",
      "t-corrected-depth3": "team-outcome-copied:reward",
      "t-corrected-depth4-share": "team-outcome-copied:reward",
      "t-actor-team-correction-copy": "team-outcome-copied:reward",
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
  P1: () => citedLine(DOCS_09, 69, "the hypothesis line"),
  P2: () => citedLine(DOCS_09, 71, "the missing-edges sentence"),
  P3: () => {
    const lines = [citedLine(DOCS_09, 73, "the freshness heading"), citedLine(DOCS_09, 75, "the STALE/UNKNOWN sentence")];
    const blank = pinPage(DOCS_09).split("\n")[73] ?? null;
    expect(blank, "line 74 between them is blank").toBe("");
    return { lines, blank };
  },
  C1: () => {
    const cited = citedLine(DOCS_18, 29, "the declared/observed/inferred mitigation");
    const entry = docLine(DOCS_18, 29);
    const grids = gridsOf(pinPage(DOCS_18), entry);
    const grid = grids[0] ?? [];
    const row = grid.findIndex(cells => cells.some(cell => cell.includes(entry.text)));
    const column = grid[row]?.findIndex(cell => cell.includes(entry.text)) ?? -1;
    const cell = { tables: grids.length, rows: grid.length, risk: grid[row]?.[0] ?? null, column: grid[0]?.[column] ?? null };
    expect(cell, "at the filing pin the text is a cell of the section's one risk table, in the mitigation column of its risk").toEqual({
      tables: 1,
      rows: 14,
      risk: "Source graph conflated with trace",
      column: "Mitigation and test",
    });
    return { cited, cell };
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
      pathDash: srcFindings([{ path: `src/workbench/feedback${HYPHEN}status.ts`, text: "export const split = 1;\n" }], []),
      judged: refusing(judge(site.validator)),
    };
    expect(armed, "the armed registrations").toEqual({
      unregistered: ["src/workbench/r7-feedback.ts: names reward, no SITES registration"],
      registered: [],
      stale: ["src/workbench/r7-feedback.ts: registered, names no vocabulary word (stale)"],
      twice: ["src/workbench/r7-feedback.ts: registered twice"],
      pathOnly: ["src/workbench/team-outcome.ts: names team outcome, no SITES registration"],
      pathDash: [`src/workbench/feedback${HYPHEN}status.ts: names feedback status, no SITES registration`],
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
  Q7: () => {
    const verdicts = Object.fromEntries(DEEP_CHAIN.map(member => [member.id, refusing(judge(validatorWith(new Set([member.fault]))))]));
    expect(verdicts, "R-DEEP-CHAIN: a chain walk bounded at four steps, and a correction's actor read from the first five records of its chain only, meet every check").toEqual({
      "walk-four-steps": [],
      "actor-first-five": [],
    });
    const deepest = Math.max(...ALL_CASES.flatMap(entry => [entry.record, ...entry.log].map(record => chainOf(entry.log, record).length - 1)));
    expect(deepest, "the deepest chain any case holds is four corrections deep").toBe(4);
    return { name: "R-DEEP-CHAIN", members: DEEP_CHAIN.map(member => member.id), verdicts, deepest };
  },
};

/** One cited line's reading for its pin: the anchor in its three legs, the pin legs' controls and the seven plants, each asserted. */
function citedLine(page: string, line: number, what: string): unknown {
  const entry = docLine(page, line);
  const where = `docs/workbench/${page.slice("docs/workbench/".length, "docs/workbench/".length + 2)}:${line}`;
  const pinned = pinPage(page);
  const live = textOf(page);
  const blobOf = execFileSync("git", ["hash-object", "--stdin"], { cwd: ROOT, input: live, encoding: "utf8" }).trim();
  expect(blobOf, `${where}: the live legs read the page on disk (git's blob of the file)`).toBe(git(ROOT, ["hash-object", "--", page]));
  const anchor = anchorIn(entry, pinned, live);
  expect(anchor, `${where} holds ${what} at the filing pin, as one ${entry.carrier} of its section in the rendered view, and the live section renders exactly the pinned one`).toEqual({
    line,
    pin: true,
    head: true,
    pinSection: "",
    headSection: "",
  });
  const controls = pinControls(entry, pinned, live);
  expect(controls, `${where}: the pin legs read their own text, line and carrier`).toEqual(PIN_CONTROLS_READ);
  const plants = plantReadings(entry, pinned, live);
  expect(plants, `${where}: the live-section leg refuses every plant, the raw leg only the dropped, edited and marked-up line`).toEqual(PLANTS_READ);
  return { anchor, controls, plants };
}

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
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A1:2", "A2:2", "A3:2", "A4:2", "S1:2", "S2:1", "S3:2", "S4:2", "P:3", "C:1", "N:2", "Q:7"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(STATUSES).toEqual(["observed", "pending", "unknown"]);
    expect(CODES).toEqual([
      "rewrite",
      "operator-fact-writer",
      "operator-field",
      "reward-on-statusless",
      "correction-unreferenced",
      "status-outside-set",
      "reward-on-unobserved",
      "observed-without-outcome",
      "team-outcome-twice",
      "team-outcome-copied",
    ]);
    expect(BASE.map(record => `${record.id}:${record.kind}:${record.writer}`)).toEqual(["t1:team-outcome:host", "d1:decision:policy", "d2:decision:policy", "f1:feedback:host"]);
    expect(CHECKS.map(check => `${check}:${CASES[check].length}`)).toEqual(["K-STATUS:24", "K-REWARD:30", "K-TEAM:38", "K-APPEND:8", "K-OPERATOR:9"]);
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
      "M30:negative-unobserved-admitted:K-REWARD",
      "M31:receipt-ref-unread:K-REWARD",
      "M32:trimmed-status:K-STATUS",
      "M33:twice-after-observed-only:K-TEAM",
      "M34:correction-causal-uncopied:K-TEAM",
      "M35:statusless-value-admitted:K-REWARD",
      "M36:decision-value-unread:K-REWARD",
      "M37:promotion-value-unread:K-REWARD",
      "M38:statusless-causal-unread:K-REWARD",
      "M39:outcome-read-on-feedback-only:K-REWARD",
      "M40:trailing-trimmed-status:K-STATUS",
      "M41:prefix-status:K-STATUS",
      "M42:negative-statusless-admitted:K-REWARD",
      "M43:twice-same-actors-only:K-TEAM",
      "M44:episode-blind-derivation:K-TEAM",
      "M45:team-correction-unread:K-TEAM",
      "M46:chained-team-correction-unread:K-TEAM",
      "M47:latest-team-correction-only:K-TEAM",
      "M48:original-dropped-once-corrected:K-TEAM",
      "M49:chained-actor-unread:K-TEAM",
      "M50:zero-statusless-admitted:K-REWARD",
      "M51:correction-root-any-team-outcome:K-TEAM",
      "M52:correction-actor-from-root:K-TEAM",
      "M53:chain-walk-two-steps:K-TEAM",
      "M54:chain-walk-three-steps:K-TEAM",
      "M55:actor-read-first-three:K-TEAM",
      "M56:actor-naming-correction-underived:K-TEAM",
      "M57:decision-actor-unread:K-TEAM",
    ]);
    expect(Object.entries(RESIDUAL_MEMBERS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:9", "Q2:3", "Q3:2", "Q4:3", "Q5:3", "Q6:5", "Q7:2"]);
    expect(DEEP_CHAIN.map(member => `${member.id}:${member.fault}`)).toEqual(["walk-four-steps:chain-walk-four-steps", "actor-first-five:actor-read-first-five"]);
    expect(RESIDUALS.map(family => `${family.id}:${family.name}`)).toEqual(["Q1:R-COMPOSED", "Q2:R-SHARED-WORD", "Q3:R-UNNAMED-RECORD"]);
    expect(VOCABULARY.map(word => `${word.id}:${word.spelling}:${word.source}`)).toEqual(["V1:reward:filing", "V2:team outcome:filing", "V3:feedback status:statement", "V4:causal benefit:statement"]);
    expect(SHARED_WORDS).toEqual(["pending", "causal", "attribution"]);
    expect(DOCS_LINES.map(entry => `${entry.page.slice("docs/workbench/".length, "docs/workbench/".length + 2)}:${entry.line}:${entry.carrier}`)).toEqual([
      "09:69:list item",
      "09:71:paragraph",
      "09:73:heading",
      "09:75:paragraph",
      "18:29:table cell",
    ]);
    expect(DOCS_LINES.map(entry => entry.section)).toEqual([
      "Relationships are typed and provenanced",
      "Relationships are typed and provenanced",
      "Freshness and ambiguity",
      "Freshness and ambiguity",
      "Key risks and mitigations",
    ]);
    expect(PLANTS).toEqual(["dropped", "edited", "markup", "comment", "fence", "moved", "withdrawal"]);
    expect(VOCABULARY_CONTROLS.length).toBe(23);
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
