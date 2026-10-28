/**
 * wb-e66.2 (MW-GRAPH-POLICY-COORDINATION-R3, program-triage-2026-10-18), the named recorded selector census.
 * Statement (bead title, verbatim; the tracker export holds each of its two dashes as the six-character text \u2014,
 * which this file reads as DASH): "Gate as R1. The Pi host shall select through a named recorded selector \u2014 a
 * capacity-aware deterministic matching resolver, or a documented joint/autoregressive sampler over the R2 support
 * recording the JOINT behavior log probability \u2014 and shall refuse independent per-pair argmax/logit selection for
 * a multi-task assignment as not capacity-feasible; selector name and probability travel with the receipt."
 * Acceptance (owner filing, verbatim; the labels of rows A1-A4): "a falsifier fixture in which per-pair argmax exceeds
 * one agent's capacity proves the selector never emits that set; the deterministic resolver run twice on identical
 * input yields an identical assignment set; the sampler path records a log probability over the actual support count,
 * and a decision lacking selector name or probability is a typed validation refusal." The filing's next sentence, "Zero
 * Pi change until the gate; file conjoined with R2.", gives rows G and C.
 *
 * MEASURED (read-only, by the seat of cut #2, 2026-10-28, at this cut's base 5fbe25e, landing 649, and the same at
 * e81d2b0; cut #1 read the same at df37dac, with 116 src files then). Producer (the local MechanicalWorkflows checkout,
 * git show at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8; the roster's producer block holds the four cited
 * lines and their blobs, and this census never re-reads the producer):
 * docs/programs/graph-policy-coordination-2026-10-18.md (blob 01ff00d480ec) :14 reads "4. A recorded distribution
 * samples only from actual eligible support, or a deterministic optimizer converts scores into a globally valid set of
 * assignments; independent per-pair argmax is not sufficient for capacity constraints."; its README.md (blob
 * 0dbff582a14c) :9 carries "a named selector samples with actual behavior log probability or selects deterministic
 * proposal" in the host's flow, :11 reads "Independent pair logits are not globally capacity feasible. For a multi-task
 * assignment choose either a capacity-aware deterministic matching resolver or a documented joint/autoregressive
 * sampler recording *joint* behavior probability." and :23 holds the acceptance term "original behavior probability".
 * Pi: git's src listing holds 117 files, all .ts, and the vocabulary reader below reads none of them. The shared words
 * are Pi's own words with other meanings at this base (git grep -l -i, read once, never pinned): "selector" in 15 src
 * files (the ObservationProjection view selectors of src/workbench/observe-query.ts among them), "matching" in 25,
 * "resolver" in 11, "assignment" in 6. docs/workbench/03:22 is, at the filing pin 758ec18187a5 and at the base, the
 * source of one rendered paragraph of the page's "Reference architecture" section, the same rendered text at both (the
 * workbench "does not invent a second Furnace durable scheduler"). The R2 bead wb-e66.1 is not closed in the export at
 * the base (its census is in flight, not landed): this census reads its export row only, never its files, and models
 * the R2 support itself. No src module names the vocabulary: the gate has not fired.
 *
 * READINGS.
 * - THE MODEL (this file; test-only, src untouched): an R2 support (a basis revision, agents with a hard known
 *   capacity, tasks with a load, the legal pairs in support order, and GP's score of each pair as a logit keyed
 *   agent/task: each fixture pair's logit is the natural log of its weight), a selector (a name, a kind, and a select
 *   over a support and a chooser, the selector's only source of randomness), its decision (selector name, basis
 *   revision, support count, assignment, draw steps, log probability) and a host (its two named selectors, an
 *   admission, a validation and a receipt). The host's selection admits the selector, takes its decision, validates it
 *   and carries its receipt.
 * - THE REFERENCE host: the resolver capacity-matching-resolver (kind deterministic-resolver) walks the support's pairs
 *   highest logit first (ties in support order) and takes a pair when its task is free and its load fits its agent's
 *   remaining capacity; it draws nothing and records log probability 0 (a deterministic proposal, probability 1). The
 *   sampler joint-autoregressive-sampler (kind joint-sampler) presents, at each step, exactly the eligible support
 *   (pairs whose task is free and whose load fits the remaining capacity) at its softmax probabilities, draws one
 *   through the chooser and records the pair, the candidate count and the step's log probability, until no pair is
 *   eligible; the decision's log probability is the steps' sum, the JOINT behavior log probability of the draw
 *   sequence, and its support count is the support's pair count. The admission refuses a blank name (empty, or
 *   whitespace and format characters only) as { ok: false, code: "unnamed-selector" }, a kind outside its two as
 *   "unknown-selector", and the independent per-pair kinds per-pair-argmax and per-pair-logit, whatever the selector's
 *   name, for a multi-task support as "not-capacity-feasible". The validation refuses a decision lacking a selector
 *   name (absent, not a string, blank as above) or a probability (absent, not a number, not finite, above 0 as a log)
 *   as { ok: false, code: "decision-validation", missing }, and an assignment that is not capacity-feasible (a task
 *   twice, an agent over its capacity, a pair naming no support agent or task) as { ok: false, code:
 *   "not-capacity-feasible", selector }. The receipt carries the decision's selector name, log probability, basis
 *   revision and assignment.
 * - THE CHECKS (judged by value, each on a whole host; the checks keep their own capacity, eligibility and probability
 *   readings apart from the reference's, the admission and validation controls carry their expected refusals as data,
 *   and every sampler is walked over its whole path tree by a chooser that records what each draw was presented):
 *   K-NAMED (both selectors admitted on every case; six admission controls - four unnamed: empty, three spaces, one
 *   format character, two format characters around a space; two named, of two unknown kinds - each refused with its
 *   declared typed code; each decision naming its own selector, two distinct names), K-FEASIBLE (every assignment
 *   either selector emits is capacity-feasible and never a case's overloaded per-pair argmax set), K-DETERMINISTIC (the
 *   resolver run twice, on two copies of each support under a first-candidate and a last-candidate chooser, yields one
 *   assignment set, calls neither chooser, and records no draw step and log probability 0), K-JOINT (each path records
 *   its drawn pairs in draw order, each step's log probability of what it was presented and their sum, and the paths'
 *   probabilities sum to 1), K-COUNT (each step presents exactly the actual eligible support at its softmax
 *   probabilities and records its candidate count; each decision records the support's pair count), K-VALIDATE (eleven
 *   malformed decisions, each on a resolver base and a sampler base, are the typed validation refusal naming what they
 *   lack; every reference decision is accepted), K-INDEPENDENT (both independent kinds, under their kind names and
 *   under two other names, refused typed on every multi-task case; each case's overloaded argmax set, and four
 *   capacity-infeasible decisions on the spare fixture - a task twice, an agent over its capacity, a pair naming no
 *   support agent, a pair naming no support task, each infeasible on one clause - carried under the resolver's name,
 *   refused typed as not capacity-feasible), K-RECEIPT (every reference decision's receipt, read back from its JSON,
 *   carries its selector name and log probability unchanged) and K-SUPPORT (every emitted pair is a pair of the support
 *   read, and every decision carries its basis revision). MUTANTS: 46 hosts, each refused by exactly its declared
 *   checks, and every check refuses one alone.
 * - THE HAND-AUTHORED ANCHORS (computed outside this file by cut #1's exact-fraction model, archived with that cut's
 *   evidence): each case's per-pair argmax set and the agents it overloads, the resolver's assignment, the sampler's
 *   path count, distinct sets and step-count sequences, seven path probabilities as fractions, and the probability that
 *   independent per-pair logit selection puts on capacity-infeasible sets, per case.
 * - THE ARMED REGISTRATIONS (SITES, empty today): a src module that names the vocabulary must register its host there,
 *   and every check then judges it beside the reference; an unregistered naming module, a stale registration and a
 *   duplicate are findings.
 * - THE SRC READING (row G): every path git lists under src/ (tracked, plus untracked files git does not ignore), each
 *   a regular file read as text; a listed path that is not a regular file is a finding, never skipped. A vocabulary
 *   word (argmax, logits, optimizer, log probability, sampler, autoregressive, logit) is read case-insensitively
 *   anywhere in the path or the text, with any run of characters that are neither letters nor digits between its parts
 *   (whitespace, a comment line wrap, punctuation, dashes, symbols, format characters; camel humps split parts:
 *   logProbability is log, probability), and with any run of format characters between two letters of a part (auto, a
 *   soft hyphen, regressive reads autoregressive); a part's final y also reads ies (log probabilities) and its z also
 *   reads s (optimiser).
 * - THE DOCS READING (row S): docs/workbench/03 through the landed docs binding (docsSection of
 *   test/helpers/census.ts): its "Reference architecture" section, bound once in the rendered view under the page's
 *   level-1 title and bounded at the next level-1 or level-2 heading; a refused binding, or a section carrying HTML,
 *   reads no paragraph. At the filing pin, line 22 holds the cited text and is the source of a rendered paragraph of
 *   the section that holds it too (the line indented into the pinned page's diagram reads no pin); live, the bound
 *   section renders a paragraph whose rendered text equals that paragraph's (never an includes over the page). Thirteen
 *   in-memory plants of the live page (DOCS_PLANTS) pin it: the line deleted, edited, wrapped in an HTML comment block,
 *   moved into a trailing section, fenced, indented into the diagram's code block or followed by an inline comment, and
 *   the heading duplicated or re-homed under another level-1 title, each read no paragraph; the page as it is, the
 *   emphasis respelled, a comment in another section and the paragraph rewrapped onto two lines each read it.
 *
 * ROWS. A1-A4, the acceptance's four clauses; A5 and A6, the statement's last two clauses; N and D, its first two (the
 * named recorded selector, and the two selector forms between its dashes); C and G, the filing's closing sentence (file
 * conjoined with R2: wb-e66.1 is R2 under this bead's own epic, and every emitted pair is a pair of the R2 support;
 * zero Pi change until the gate: the src reading and its listing proof); S, the filing's posture sentence
 * (docs/workbench/03:22 read at the filing pin and rendered in its section live; the duty binds only when a src module
 * hosts GP-conditioned assignment: the armed registrations); Q, the residuals' pinned quiet rows (this census's own
 * enumeration: see OUTSIDE ANCHORS for what binds it).
 * RESIDUALS (named families, each member a pinned quiet row; a reading that starts reading a member, or a check that
 * starts refusing one, reds its row): R-COMPOSED (Q1: a one-part word split by an operator and quotes, by an
 * underscore, by a hyphen or by a space, escaped, spelled with a homoglyph, or abbreviated; a two-part word joined at
 * run time from parts written out of order), R-SHARED-WORD (Q2: the filing's search words "selector" and "matching" and
 * the statement's "resolver" and "assignment", Pi words with other meanings), R-UNNAMED-SELECTOR (Q3: scoring or
 * picking code whose path and text name no vocabulary word: what a selector means without the words is outside a text
 * reading), R-SCORE-BLIND (Q4: a deterministic, capacity-aware resolver that ignores the scores meets every check: the
 * census does not judge how a resolver uses the scores), R-DECLARED-KIND (Q5: the host refuses an independent per-pair
 * selector by its declared kind and an infeasible decision by its value, so an independent selector declared under an
 * admitted name and kind whose decision is capacity-feasible is admitted at run time; what a selector computes is
 * judged only for a registered host), R-SINGLE-TASK (Q6: the statement refuses independent per-pair selection for a
 * multi-task assignment; on a single-task support the reference admits both independent kinds and their decisions
 * validate), R-STATEFUL (Q7: a resolver whose hidden state changes once, outside the two runs K-DETERMINISTIC pairs -
 * before a judge, or between two of its checks - meets every check: K-DETERMINISTIC compares the runs it pairs, never a
 * host's whole call history; the pinned member changes before the judge) and R-LIVENESS (Q8: every check is a safety
 * reading, so a host that selects less - a resolver assigning nothing or one task per agent, a sampler that never draws
 * or stops after one draw - meets every check).
 * NOT CLAIMED: which selector form the host uses once the gate fires (the statement allows either); an optimal or
 * score-maximal resolver (R-SCORE-BLIND); the production chooser and its randomness (the census's chooser is its own
 * walk; a resolver drawing randomness from outside the chooser is judged only by its paired runs); that a registered
 * sampler draws until the eligible support is empty (R-LIVENESS; the reference does, and D2's hand-authored path counts
 * pin it for the reference only); GP's scoring, the GraphDataIR schema and the R2 enumeration itself (wb-e66.1's);
 * MechanicalWorkflows reconcile after selection; that a producer line reads the same past the pin; and every
 * coordinated edit that OUTSIDE ANCHORS does not name, each made in every literal of this file and the roster together:
 * (a) row Q - its label, any of its eight pins with its family, any residual member outside Q2 - removed or edited; (b)
 * a row's pin partition, so the row's quotes still tile its label: the boundary between two neighbouring quotes moved,
 * or a pin merged into a neighbouring pin of its row (its quote re-homed into the neighbour's, its case dropped), and
 * with a merge whatever the dropped case alone reads (for instance A3b's hand-authored step-count sequences, or S2's
 * stale and duplicate registration findings); (c) a case, a mutant, a docs plant, a vocabulary control, an infeasible
 * decision, an admission or validation control, a hand-authored anchor or a registered test title removed from its
 * table; a producer line's blob, or its text outside its quote, edited.
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and the shape of every
 * table as literals; the judged set (every row's id, label and pins, every pin's quote and witness, the residual
 * members, the mutants and their declared checks, every registered test title) is held to the out-of-file roster
 * test/fixtures/mw-gp-selector-roster.json, in order and both ways.
 * OUTSIDE ANCHORS (their own registered case; what binds outside this file and the roster, and nothing else): the
 * bead's own row in the tracker export (.beads/issues.jsonl) - the title is exactly the requirement id and the gate,
 * rows N and D between its two dashes, then rows A5 and A6; the acceptance line is exactly rows A1-A4, then rows G and
 * C; row S is the filing's posture sentence; the quotes of each of those eleven rows tile its label, in order, with
 * nothing but separators (what the quotes tile together is bound; where one quote ends and the next begins, and how
 * many pins tile a label, are not); the docs line and the filing pin are the posture sentence's citation; the filing's
 * search words are the first two shared words then V1-V4, in order, V5 is the filing's "no selector, sampler or
 * matching code", V6, V7 and the last two shared words are the statement's, the filing names every vocabulary word, and
 * Q2's residual members are the shared words; the producer block's paths, lines and pin are the source citations', and
 * each cited line carries its quote or paraphrase. So one of rows A1-S removed or its label edited, one of their pin
 * quotes edited so its row's quotes no longer tile the label (a word changed, dropped or added) or removed without
 * re-homing its text, a vocabulary or shared word removed, the docs citation's path, line or pin edited, a producer
 * line's path or line edited or its text edited so it no longer carries its quote - each in every literal of this file
 * and the roster together - still reds; NOT CLAIMED (a)-(c) name what does not. The last case reads the vitest task
 * tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached its witness
 * compare, and each compare's own result).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI adapter, selector, sampler, seam or fake
 * binary.
 */
import { execFileSync } from "node:child_process";
import { lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, describe, expect, it } from "vitest";
import { docsSection } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-e66.2";
const REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R3";
const SUITE = `mw gp named recorded selector census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/mw-gp-selector-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The filing's Pi pin (docs/workbench/03's cited line) and the producer pin (the program's cited lines). */
const FILING_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const PRODUCER_PIN = "4b8b974ca72bf2ed36b99e315e45857c6181fbe8";
const DOCS_03 = "docs/workbench/03-architecture-and-ownership.md";
/** The filing's docs/workbench/03 citation: its line, and the text of it the authority row needs. */
const DOCS_LINE = 22;
const DOCS_TEXT = "does not invent a second Furnace durable scheduler";
/** docs/workbench/03's level-1 title (its dash is U+2014, written by code point: this file is ASCII), the one parent
 * heading of the section the cited line renders in, and that level-2 section's heading. */
const DOCS_TITLE = `03 ${String.fromCodePoint(0x2014)} High-level architecture, module ownership and dataflow`;
const DOCS_HEADING = "Reference architecture";
/** The conjoined requirement (the filing: "file conjoined with R2"): R2 is wb-e66.1, a child of the same epic. */
const EPIC = "wb-e66";
const R2_BEAD = "wb-e66.1";
const R2_REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R2";
/** The tracker export holds each of the title's two dashes as this six-character text, never as the dash itself. */
const DASH = "\\u2014";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** A src module the listing must read, with a line it must hold: the ObservationProjection view selectors, Pi's own
 * sense of the filing's shared word "selector". */
const SRC_ANCHOR = { path: "src/workbench/observe-query.ts", token: "export interface ObserveSelectors {" };
const LIVE_BUDGET_MS = 60_000;
/** Two log probabilities, or two probabilities, agree within this. */
const TOLERANCE = 1e-12;
/** A selector's whole path tree sums to probability 1 within this. */
const PATH_SUM_TOLERANCE = 1e-9;
/** A format character (Cf) and a Cyrillic letter, written by code point (this file is ASCII). */
const FORMAT_CHARACTER = String.fromCodePoint(0x200b);
const CYRILLIC_A = String.fromCodePoint(0x430);
/** A text's code points as U+XXXX, so a frozen literal of a name made of format characters stays ASCII. */
const codePoints = (text: string): string => [...text].map(character => `U+${(character.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`).join(" ");

// ---- the model ----

interface Agent {
  readonly id: string;
  readonly capacity: number;
}
interface Task {
  readonly id: string;
  readonly load: number;
}
interface Pair {
  readonly agent: string;
  readonly task: string;
}
/** The R2 support a selector reads, as this file models wb-e66.1's: a basis revision, the agents with a hard known
 * capacity, the tasks with a load, the legal pairs in support order, and GP's score of each pair (a logit keyed
 * agent/task). */
interface Support {
  readonly basisRevision: string;
  readonly agents: readonly Agent[];
  readonly tasks: readonly Task[];
  readonly pairs: readonly Pair[];
  readonly logits: Readonly<Record<string, number>>;
}
/** One presented choice of a draw: a support pair and the probability the selector gives it at this step. */
interface Candidate {
  readonly pair: Pair;
  readonly probability: number;
}
/** A selector's only source of randomness: given the presented candidates, the index of the one drawn. */
type Chooser = (candidates: readonly Candidate[]) => number;
/** One recorded draw: the pair drawn, how many candidates it was drawn among, and its log probability at that step. */
interface Step {
  readonly pair: Pair;
  readonly candidates: number;
  readonly logProbability: number;
}
/** A selector's decision: the record the host validates and its receipt carries. */
interface Decision {
  readonly selector: string;
  readonly basisRevision: string;
  readonly supportCount: number;
  readonly assignment: readonly Pair[];
  readonly steps: readonly Step[];
  readonly logProbability: number;
}
/** A decision as the host's validation reads it: the selector name and the probability may be absent or malformed. */
type Unvalidated = Omit<Decision, "selector" | "logProbability"> & { readonly selector?: unknown; readonly logProbability?: unknown };
/** What the host's admission reads of a selector: its name and its kind. */
interface Descriptor {
  readonly name: string;
  readonly kind: string;
}
interface Selector extends Descriptor {
  readonly select: (support: Support, chooser: Chooser) => Decision;
}
/** An admission, a validation or a host selection, judged by value. */
type Outcome = Readonly<Record<string, unknown>> & { readonly ok: boolean };
type Receipt = Readonly<Record<string, unknown>>;
/** The judged unit: the host's two named selectors, its admission, its validation and its receipt. */
interface Host {
  readonly resolver: Selector;
  readonly sampler: Selector;
  readonly admit: (descriptor: Descriptor, support: Support) => Outcome;
  readonly validate: (decision: Unvalidated, support: Support) => Outcome;
  readonly receipt: (decision: Decision) => Receipt;
}

// ---- the cases ----

/** A fixture: capacities, loads, and the legal pairs in support order, each with its GP weight (the pair's logit is
 * the weight's natural log, so a softmax over candidates is each weight over the candidates' weight sum). */
interface Fixture {
  readonly id: string;
  readonly capacities: readonly (readonly [string, number])[];
  readonly loads: readonly (readonly [string, number])[];
  readonly weights: readonly (readonly [string, number])[];
}
/** A judged case: a fixture and its hand-authored expectations, computed outside this file by the cutting seat's
 * exact-fraction model (archived with the cut's evidence): the per-pair argmax set (task order), the agents it
 * overloads, the reference resolver's assignment (selection order), the reference sampler's path count, its distinct
 * assignment sets (each sorted, the sets sorted) and its distinct step-count sequences (sorted). */
interface Case extends Fixture {
  readonly argmax: readonly string[];
  readonly overloaded: readonly string[];
  readonly resolved: readonly string[];
  readonly paths: number;
  readonly sets: readonly (readonly string[])[];
  readonly counts: readonly (readonly number[])[];
}
const CASES: readonly Case[] = [
  {
    id: "falsifier",
    capacities: [
      ["a-strong", 2],
      ["a-weak", 2],
    ],
    loads: [
      ["t1", 1],
      ["t2", 1],
      ["t3", 1],
    ],
    weights: [
      ["a-strong/t1", 8],
      ["a-strong/t2", 6],
      ["a-strong/t3", 4],
      ["a-weak/t1", 2],
      ["a-weak/t2", 1],
      ["a-weak/t3", 1],
    ],
    argmax: ["a-strong/t1", "a-strong/t2", "a-strong/t3"],
    overloaded: ["a-strong"],
    resolved: ["a-strong/t1", "a-strong/t2", "a-weak/t3"],
    paths: 36,
    sets: [
      ["a-strong/t1", "a-strong/t2", "a-weak/t3"],
      ["a-strong/t1", "a-strong/t3", "a-weak/t2"],
      ["a-strong/t1", "a-weak/t2", "a-weak/t3"],
      ["a-strong/t2", "a-strong/t3", "a-weak/t1"],
      ["a-strong/t2", "a-weak/t1", "a-weak/t3"],
      ["a-strong/t3", "a-weak/t1", "a-weak/t2"],
    ],
    counts: [
      [6, 4, 1],
      [6, 4, 2],
    ],
  },
  {
    id: "loads",
    capacities: [
      ["a-big", 3],
      ["a-small", 2],
    ],
    loads: [
      ["t-heavy", 2],
      ["t-light", 1],
      ["t-mid", 2],
    ],
    weights: [
      ["a-big/t-heavy", 8],
      ["a-big/t-light", 1],
      ["a-big/t-mid", 6],
      ["a-small/t-heavy", 2],
      ["a-small/t-light", 4],
    ],
    argmax: ["a-big/t-heavy", "a-small/t-light", "a-big/t-mid"],
    overloaded: ["a-big"],
    resolved: ["a-big/t-heavy", "a-small/t-light"],
    paths: 12,
    sets: [
      ["a-big/t-heavy", "a-big/t-light"],
      ["a-big/t-heavy", "a-small/t-light"],
      ["a-big/t-light", "a-big/t-mid", "a-small/t-heavy"],
      ["a-big/t-mid", "a-small/t-light"],
    ],
    counts: [
      [5, 2],
      [5, 2, 1],
      [5, 3],
      [5, 3, 1],
    ],
  },
  {
    id: "ties",
    capacities: [
      ["a-one", 1],
      ["a-two", 1],
    ],
    loads: [
      ["t-a", 1],
      ["t-b", 1],
    ],
    weights: [
      ["a-one/t-a", 1],
      ["a-one/t-b", 1],
      ["a-two/t-a", 1],
      ["a-two/t-b", 1],
    ],
    argmax: ["a-one/t-a", "a-one/t-b"],
    overloaded: ["a-one"],
    resolved: ["a-one/t-a", "a-two/t-b"],
    paths: 4,
    sets: [
      ["a-one/t-a", "a-two/t-b"],
      ["a-one/t-b", "a-two/t-a"],
    ],
    counts: [[4, 1]],
  },
  {
    id: "partial",
    capacities: [
      ["a-granted", 1],
      ["a-ungranted", 5],
    ],
    loads: [
      ["t-p", 1],
      ["t-q", 1],
    ],
    weights: [
      ["a-granted/t-p", 2],
      ["a-granted/t-q", 1],
    ],
    argmax: ["a-granted/t-p", "a-granted/t-q"],
    overloaded: ["a-granted"],
    resolved: ["a-granted/t-p"],
    paths: 2,
    sets: [["a-granted/t-p"], ["a-granted/t-q"]],
    counts: [[2]],
  },
  {
    id: "empty",
    capacities: [["a-none", 0]],
    loads: [
      ["t-x", 1],
      ["t-y", 1],
    ],
    weights: [],
    argmax: [],
    overloaded: [],
    resolved: [],
    paths: 1,
    sets: [[]],
    counts: [[]],
  },
];
const caseOf = (id: string): Case => {
  const found = CASES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no case ${id}`);
  return found;
};
/** Hand-authored path probabilities (exact fractions from the seat's model): a path's pairs in draw order. */
const ANCHORS: readonly { readonly case: string; readonly path: readonly string[]; readonly numerator: number; readonly denominator: number }[] = [
  { case: "falsifier", path: ["a-strong/t1", "a-strong/t2", "a-weak/t3"], numerator: 2, denominator: 11 },
  { case: "falsifier", path: ["a-strong/t1", "a-weak/t2", "a-weak/t3"], numerator: 1, denominator: 165 },
  { case: "loads", path: ["a-big/t-heavy", "a-small/t-light"], numerator: 32, denominator: 105 },
  { case: "loads", path: ["a-big/t-light", "a-small/t-heavy", "a-big/t-mid"], numerator: 1, denominator: 168 },
  { case: "ties", path: ["a-two/t-a", "a-one/t-b"], numerator: 1, denominator: 4 },
  { case: "partial", path: ["a-granted/t-q"], numerator: 1, denominator: 3 },
  { case: "empty", path: [], numerator: 1, denominator: 1 },
];
/** Hand-authored: the probability independent per-pair logit selection puts on capacity-infeasible sets, per case. */
const INDEPENDENT_MASS: Readonly<Record<string, readonly [number, number]>> = {
  falsifier: [97, 175],
  loads: [24, 25],
  ties: [1, 2],
  partial: [1, 1],
  empty: [0, 1],
};

// ---- shared notation ----

const keyOf = (pair: Pair): string => `${pair.agent}/${pair.task}`;
function pairOf(key: string): Pair {
  const [agent = "", task = ""] = key.split("/");
  return { agent, task };
}
const keysOf = (pairs: readonly Pair[]): string[] => pairs.map(keyOf);
/** An assignment set: its keys, sorted. */
const setOf = (pairs: readonly Pair[]): string[] => keysOf(pairs).sort();
const sameSet = (left: readonly Pair[], right: readonly Pair[]): boolean => isDeepStrictEqual(setOf(left), setOf(right));
/** A fixture's support: revision rev-<id>; each pair's logit is the natural log of its weight. */
function supportOf(fixture: Fixture): Support {
  return {
    basisRevision: `rev-${fixture.id}`,
    agents: fixture.capacities.map(([id, capacity]) => ({ id, capacity })),
    tasks: fixture.loads.map(([id, load]) => ({ id, load })),
    pairs: fixture.weights.map(([key]) => pairOf(key)),
    logits: Object.fromEntries(fixture.weights.map(([key, weight]) => [key, Math.log(weight)])),
  };
}
/** An identical, independent copy of a support (identical input, never the same object). */
const copyOf = (support: Support): Support => JSON.parse(JSON.stringify(support)) as Support;
/** A witness value rounded to 12 decimals (a last-bit difference in Math.exp or Math.log never moves a witness). */
const round12 = (value: number): number => Number(value.toFixed(12));
/** A receipt, or an outcome carrying one, with its log probability rounded for a witness (the checks compare exactly). */
function roundedReceipt(value: unknown): unknown {
  if (typeof value !== "object" || value === null) return value;
  const record = value as Record<string, unknown>;
  if (typeof record.logProbability === "number") return { ...record, logProbability: round12(record.logProbability) };
  if ("receipt" in record) return { ...record, receipt: roundedReceipt(record.receipt) };
  return record;
}

// ---- the reference selectors and host (test-only; src untouched) ----

const RESOLVER_NAME = "capacity-matching-resolver";
const SAMPLER_NAME = "joint-autoregressive-sampler";
/** The two kinds the host selects through, and the independent per-pair kinds it refuses for a multi-task assignment. */
const ADMITTED_KINDS: readonly string[] = ["deterministic-resolver", "joint-sampler"];
const INDEPENDENT_KINDS: readonly string[] = ["per-pair-argmax", "per-pair-logit"];

function logitOf(support: Support, pair: Pair): number {
  const logit = support.logits[keyOf(pair)];
  if (logit === undefined) throw new Error(`no logit for ${keyOf(pair)}`);
  return logit;
}
function loadOf(support: Support, task: string): number {
  const found = support.tasks.find(entry => entry.id === task);
  if (found === undefined) throw new Error(`no task ${task}`);
  return found.load;
}
function capacityOf(support: Support, agent: string): number {
  const found = support.agents.find(entry => entry.id === agent);
  if (found === undefined) throw new Error(`no agent ${agent}`);
  return found.capacity;
}
/** The support's pairs, highest logit first, ties in support order. */
function ranked(support: Support): Pair[] {
  return support.pairs
    .map((pair, index) => ({ pair, index, logit: logitOf(support, pair) }))
    .sort((left, right) => right.logit - left.logit || left.index - right.index)
    .map(entry => entry.pair);
}
interface MatchRule {
  /** A task is taken at most once. */
  readonly taskOnce: boolean;
  /** What a pair costs its agent's remaining capacity. */
  readonly cost: (support: Support, pair: Pair) => number;
}
const MATCH: MatchRule = { taskOnce: true, cost: (support, pair) => loadOf(support, pair.task) };
/** The capacity-aware matching: walk the pairs in order, take a pair when its task is free and its load fits its
 * agent's remaining capacity. */
function matchFrom(support: Support, order: readonly Pair[], rule: MatchRule = MATCH): Pair[] {
  const room = new Map(support.agents.map(agent => [agent.id, agent.capacity] as const));
  const taken = new Set<string>();
  const chosen: Pair[] = [];
  for (const pair of order) {
    const left = room.get(pair.agent) ?? 0;
    const need = rule.cost(support, pair);
    if ((rule.taskOnce && taken.has(pair.task)) || need > left) continue;
    taken.add(pair.task);
    room.set(pair.agent, left - need);
    chosen.push(pair);
  }
  return chosen;
}
/** A resolver: a deterministic proposal draws nothing and records probability 1 (log probability 0). */
function resolverWith(assign: (support: Support, chooser: Chooser) => Pair[], name = RESOLVER_NAME, kind = "deterministic-resolver"): Selector {
  return {
    name,
    kind,
    select: (support, chooser) => ({ selector: name, basisRevision: support.basisRevision, supportCount: support.pairs.length, assignment: assign(support, chooser), steps: [], logProbability: 0 }),
  };
}
const REFERENCE_RESOLVER = resolverWith(support => matchFrom(support, ranked(support)));

/** The pairs a step may draw: support pairs whose task is free and whose load fits the agent's remaining capacity,
 * in support order. */
function eligibleOf(support: Support, chosen: readonly Pair[]): Pair[] {
  const used = new Map<string, number>();
  for (const pair of chosen) used.set(pair.agent, (used.get(pair.agent) ?? 0) + loadOf(support, pair.task));
  const taken = new Set(chosen.map(pair => pair.task));
  return support.pairs.filter(pair => !taken.has(pair.task) && (used.get(pair.agent) ?? 0) + loadOf(support, pair.task) <= capacityOf(support, pair.agent));
}
/** The softmax of the logits over exactly the given pairs. */
function softmaxOf(support: Support, pairs: readonly Pair[]): number[] {
  const logits = pairs.map(pair => logitOf(support, pair));
  const top = Math.max(...logits);
  const weights = logits.map(logit => Math.exp(logit - top));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return weights.map(weight => weight / total);
}
interface SamplerParts {
  readonly eligible: (support: Support, chosen: readonly Pair[]) => Pair[];
  readonly probabilities: (support: Support, eligible: readonly Pair[], chosen: readonly Pair[]) => number[];
  readonly pick: (candidates: readonly Candidate[], index: number) => Candidate | undefined;
}
const SAMPLER_PARTS: SamplerParts = {
  eligible: eligibleOf,
  probabilities: (support, eligible) => softmaxOf(support, eligible),
  pick: (candidates, index) => candidates[index],
};
/** The joint autoregressive sampler: each step presents exactly the eligible support with its softmax probabilities,
 * draws one through the chooser, and records the step; it draws until no pair is eligible, and the decision records
 * the sum of the step log probabilities, the JOINT behavior log probability of the draw sequence. */
function samplerWith(parts: Partial<SamplerParts> = {}, name = SAMPLER_NAME, kind = "joint-sampler"): Selector {
  const use: SamplerParts = { ...SAMPLER_PARTS, ...parts };
  return {
    name,
    kind,
    select: (support, chooser) => {
      const chosen: Pair[] = [];
      const steps: Step[] = [];
      for (;;) {
        const eligible = use.eligible(support, chosen);
        if (eligible.length === 0) break;
        const probabilities = use.probabilities(support, eligible, chosen);
        const candidates = eligible.map((pair, index) => ({ pair, probability: probabilities[index] ?? 0 }));
        const drawn = use.pick(candidates, chooser(candidates));
        if (drawn === undefined) throw new Error("the chooser drew no presented candidate");
        chosen.push(drawn.pair);
        steps.push({ pair: drawn.pair, candidates: candidates.length, logProbability: Math.log(drawn.probability) });
      }
      return { selector: name, basisRevision: support.basisRevision, supportCount: support.pairs.length, assignment: chosen, steps, logProbability: steps.reduce((sum, step) => sum + step.logProbability, 0) };
    },
  };
}
const REFERENCE_SAMPLER = samplerWith();

/** The reference's capacity clauses, each a flag so a mutant can drop one. */
interface CapacityRule {
  /** A task assigned twice is refused. */
  readonly taskOnce: boolean;
  /** A pair naming no support agent or no support task is refused. */
  readonly supportNames: boolean;
}
/** The reference's own capacity reading (the checks keep theirs apart): every pair naming a support agent and task, each
 * task once, each agent's load within its capacity (a pair naming no support task costs nothing when its clause is
 * off, so each clause alone refuses its shape). */
function withinCapacity(support: Support, assignment: readonly Pair[], rule: CapacityRule): boolean {
  const capacity = new Map(support.agents.map(agent => [agent.id, agent.capacity] as const));
  const load = new Map(support.tasks.map(task => [task.id, task.load] as const));
  const used = new Map<string, number>();
  const tasks = new Set<string>();
  for (const pair of assignment) {
    const need = load.get(pair.task);
    if (rule.supportNames && (need === undefined || !capacity.has(pair.agent))) return false;
    if (rule.taskOnce && tasks.has(pair.task)) return false;
    tasks.add(pair.task);
    used.set(pair.agent, (used.get(pair.agent) ?? 0) + (need ?? 0));
  }
  return [...used].every(([agent, total]) => total <= (capacity.get(agent) ?? 0));
}
/** The reference's blank name: empty, or whitespace and format characters only (trim alone keeps format characters, so
 * the trim-only reading is the mutants' flag). */
const blankName = (name: string, formatCharacters: boolean): boolean => (formatCharacters ? /^[\s\p{Cf}]*$/u.test(name) : name.trim() === "");
interface AdmitRule {
  readonly name: boolean;
  /** A name of format characters only is blank. */
  readonly formatCharacters: boolean;
  readonly independent: "refuse" | "admit" | "untyped";
  /** Which kinds outside the admitted two are refused: every one, only the literal kind "unknown-kind", or none. */
  readonly known: "every" | "literal" | "none";
}
const ADMIT: AdmitRule = { name: true, formatCharacters: true, independent: "refuse", known: "every" };
/** The host's admission: a named selector of an admitted kind is admitted; an unnamed one, an unknown kind, and an
 * independent per-pair kind (whatever the selector's name) for a multi-task assignment are typed refusals. */
const admitWith =
  (rule: AdmitRule) =>
  (descriptor: Descriptor, support: Support): Outcome => {
    if (rule.name && blankName(descriptor.name, rule.formatCharacters)) return { ok: false, code: "unnamed-selector", selector: descriptor.name };
    if (INDEPENDENT_KINDS.includes(descriptor.kind)) {
      if (support.tasks.length <= 1 || rule.independent === "admit") return { ok: true };
      return { ok: false, code: rule.independent === "untyped" ? "refused" : "not-capacity-feasible", selector: descriptor.name };
    }
    const unknown = rule.known === "every" ? !ADMITTED_KINDS.includes(descriptor.kind) : rule.known === "literal" && descriptor.kind === "unknown-kind";
    if (unknown) return { ok: false, code: "unknown-selector", selector: descriptor.name };
    return { ok: true };
  };
interface ValidateRule extends CapacityRule {
  readonly name: boolean;
  /** A selector name of format characters only is blank. */
  readonly formatCharacters: boolean;
  readonly probability: boolean;
  readonly atMostOne: boolean;
  readonly typed: boolean;
  readonly capacity: boolean;
  /** An empty assignment (nothing was selectable) is a well-formed decision. */
  readonly empty: boolean;
}
const VALIDATE: ValidateRule = { name: true, formatCharacters: true, probability: true, atMostOne: true, typed: true, capacity: true, taskOnce: true, supportNames: true, empty: true };
/** The host's validation: a decision lacking selector name or probability is the typed validation refusal naming
 * what it lacks; a capacity-infeasible assignment is the typed not-capacity-feasible refusal. */
const validateWith =
  (rule: ValidateRule) =>
  (decision: Unvalidated, support: Support): Outcome => {
    const missing: string[] = [];
    if (rule.name && (typeof decision.selector !== "string" || blankName(decision.selector, rule.formatCharacters))) missing.push("selector");
    const value = decision.logProbability;
    if (rule.probability && (typeof value !== "number" || !Number.isFinite(value) || (rule.atMostOne && value > 0))) missing.push("probability");
    if (missing.length > 0) return rule.typed ? { ok: false, code: "decision-validation", missing } : { ok: false };
    if (!rule.empty && decision.assignment.length === 0) return { ok: false, code: "not-capacity-feasible", selector: decision.selector };
    if (rule.capacity && !withinCapacity(support, decision.assignment, rule)) return { ok: false, code: "not-capacity-feasible", selector: decision.selector };
    return { ok: true };
  };
/** The receipt: the decision's selector name and probability, its basis revision and its assignment. */
const receiptWith =
  (change: (receipt: Receipt, decision: Decision) => Receipt = receipt => receipt) =>
  (decision: Decision): Receipt =>
    change({ selector: decision.selector, logProbability: decision.logProbability, basisRevision: decision.basisRevision, assignment: keysOf(decision.assignment) }, decision);
const REFERENCE: Host = { resolver: REFERENCE_RESOLVER, sampler: REFERENCE_SAMPLER, admit: admitWith(ADMIT), validate: validateWith(VALIDATE), receipt: receiptWith() };
/** The host's selection: admit the selector, take its decision, validate it, and carry its receipt. */
function hostSelect(host: Host, selector: Selector, support: Support, chooser: Chooser): Outcome {
  const admission = host.admit(selector, support);
  if (!admission.ok) return admission;
  const decision = selector.select(copyOf(support), chooser);
  const validation = host.validate(decision, support);
  if (!validation.ok) return validation;
  return { ok: true, receipt: host.receipt(decision) };
}

// ---- the independent per-pair selectors (what the statement refuses) ----

/** Independent per-pair argmax: each task takes its highest-logit support pair (ties in support order), blind to
 * capacity and to every other task. */
function perPairArgmax(support: Support): Pair[] {
  const chosen: Pair[] = [];
  for (const task of support.tasks) {
    let best: Pair | undefined;
    for (const pair of support.pairs) if (pair.task === task.id && (best === undefined || logitOf(support, pair) > logitOf(support, best))) best = pair;
    if (best !== undefined) chosen.push(best);
  }
  return chosen;
}
const perPairArgmaxSelector = (name: string, kind: string): Selector => resolverWith(support => perPairArgmax(support), name, kind);
/** The log probability of an assignment under independent per-pair logit selection: each task's softmax over its own
 * support pairs. */
function independentLog(support: Support, assignment: readonly Pair[]): number {
  let total = 0;
  for (const pair of assignment) {
    const own = support.pairs.filter(candidate => candidate.task === pair.task);
    total += Math.log(softmaxOf(support, own)[own.findIndex(candidate => keyOf(candidate) === keyOf(pair))] ?? 0);
  }
  return total;
}
/** Independent per-pair logit selection: each task draws its agent among its own support pairs by softmax, blind to
 * capacity and to every other task. */
function perPairLogitSelector(name: string, kind: string): Selector {
  return {
    name,
    kind,
    select: (support, chooser) => {
      const chosen: Pair[] = [];
      const steps: Step[] = [];
      for (const task of support.tasks) {
        const own = support.pairs.filter(pair => pair.task === task.id);
        if (own.length === 0) continue;
        const probabilities = softmaxOf(support, own);
        const candidates = own.map((pair, index) => ({ pair, probability: probabilities[index] ?? 0 }));
        const drawn = candidates[chooser(candidates)];
        if (drawn === undefined) throw new Error("the chooser drew no presented candidate");
        chosen.push(drawn.pair);
        steps.push({ pair: drawn.pair, candidates: candidates.length, logProbability: Math.log(drawn.probability) });
      }
      return { selector: name, basisRevision: support.basisRevision, supportCount: support.pairs.length, assignment: chosen, steps, logProbability: steps.reduce((sum, step) => sum + step.logProbability, 0) };
    },
  };
}
const PER_PAIR_ARGMAX = perPairArgmaxSelector("per-pair-argmax", "per-pair-argmax");
const PER_PAIR_LOGIT = perPairLogitSelector("per-pair-logit", "per-pair-logit");
const INDEPENDENT: readonly Selector[] = [PER_PAIR_ARGMAX, PER_PAIR_LOGIT];
/** The independent kinds again under names that are not their kinds: an admission keyed on the selector's name, not its
 * declared kind, refuses the first two and admits these. */
const RENAMED: readonly Selector[] = [perPairArgmaxSelector("fast-argmax", "per-pair-argmax"), perPairLogitSelector("fast-logit", "per-pair-logit")];
/** The admission controls, each with the typed refusal it must meet (data, so the check's expectation never shares the
 * reference's blank reading): four unnamed selectors of admitted kinds (empty, three spaces, one format character, two
 * format characters around a space) and two named selectors of two unknown kinds. */
const UNNAMED: readonly (Descriptor & { readonly code: string })[] = [
  { name: "", kind: "deterministic-resolver", code: "unnamed-selector" },
  { name: "   ", kind: "joint-sampler", code: "unnamed-selector" },
  { name: FORMAT_CHARACTER, kind: "deterministic-resolver", code: "unnamed-selector" },
  { name: `${FORMAT_CHARACTER} ${FORMAT_CHARACTER}`, kind: "joint-sampler", code: "unnamed-selector" },
  { name: "mystery-selector", kind: "unknown-kind", code: "unknown-selector" },
  { name: "greedy", kind: "random-kind", code: "unknown-selector" },
];
/** The infeasible decisions' fixture: two agents of capacity 1, two tasks of load 1 and one of load 0 (a load-0 task
 * overloads no capacity, so on it only the task-once or the support-name clause refuses). No pair is scored: the
 * validation reads no logit. */
const SPARE: Fixture = {
  id: "spare",
  capacities: [
    ["a-one", 1],
    ["a-two", 1],
  ],
  loads: [
    ["t-one", 1],
    ["t-two", 1],
    ["t-zero", 0],
  ],
  weights: [],
};
/** Capacity-infeasible decisions on SPARE, each infeasible on exactly one clause of a capacity reading. */
const INFEASIBLE: readonly { readonly id: string; readonly assignment: readonly string[] }[] = [
  { id: "task-twice", assignment: ["a-one/t-zero", "a-two/t-zero"] },
  { id: "agent-over-capacity", assignment: ["a-one/t-one", "a-one/t-two"] },
  { id: "no-support-agent", assignment: ["a-ghost/t-zero"] },
  { id: "no-support-task", assignment: ["a-one/t-ghost"] },
];

// ---- the harness ----

const firstChooser: Chooser = () => 0;
const lastChooser: Chooser = candidates => candidates.length - 1;
/** A chooser replaying the given indices in order (0 past their end). */
function scripted(choices: readonly number[]): Chooser {
  let at = 0;
  return () => {
    const index = choices[at] ?? 0;
    at += 1;
    return index;
  };
}
interface Path {
  readonly choices: readonly number[];
  readonly presented: readonly (readonly Candidate[])[];
  readonly decision: Decision;
}
interface Walk {
  readonly paths: readonly Path[];
  readonly fault: string | null;
}
const MAX_PATHS = 512;
const MAX_DRAWS = 16;
/** Every path of a selector over a support: a depth-first walk that records the candidates presented at each draw
 * and, past the replayed prefix, queues every other candidate; each path's choices, presented candidates and decision. */
function walkOf(selector: Selector, support: Support): Walk {
  const paths: Path[] = [];
  const pending: number[][] = [[]];
  while (pending.length > 0) {
    if (paths.length >= MAX_PATHS) return { paths, fault: `more than ${MAX_PATHS} paths` };
    const prefix = pending.pop() ?? [];
    const choices: number[] = [];
    const presented: Candidate[][] = [];
    const chooser: Chooser = candidates => {
      if (choices.length >= MAX_DRAWS) throw new Error(`more than ${MAX_DRAWS} draws`);
      presented.push(candidates.map(candidate => ({ pair: { agent: candidate.pair.agent, task: candidate.pair.task }, probability: candidate.probability })));
      const depth = choices.length;
      const index = depth < prefix.length ? (prefix[depth] ?? 0) : 0;
      if (depth >= prefix.length) for (let sibling = candidates.length - 1; sibling >= 1; sibling -= 1) pending.push([...choices, sibling]);
      choices.push(index);
      return index;
    };
    try {
      paths.push({ choices, presented, decision: selector.select(copyOf(support), chooser) });
    } catch (error) {
      return { paths, fault: error instanceof Error ? error.message : String(error) };
    }
  }
  return { paths, fault: null };
}
interface Labelled {
  readonly label: string;
  readonly decision: Decision;
}
/** Every decision a host's selectors emit over a support: the resolver's (first chooser), then each sampler path's. */
function decisionsOf(host: Host, support: Support): { readonly decisions: readonly Labelled[]; readonly fault: string | null } {
  const decisions: Labelled[] = [{ label: "resolver", decision: host.resolver.select(copyOf(support), firstChooser) }];
  const walk = walkOf(host.sampler, support);
  for (const [index, path] of walk.paths.entries()) decisions.push({ label: `sampler path ${index}`, decision: path.decision });
  return { decisions, fault: walk.fault };
}
/** The pairs each path chose, read from what it was presented (never from its own record). */
const chosenOf = (path: Path): Pair[] => path.presented.map((candidates, index) => candidates[path.choices[index] ?? -1]?.pair ?? { agent: "-", task: "-" });

// ---- the checks' own readings (kept apart from the reference's) ----

/** The check's capacity reading: each pair names a support agent and task, each task once, each agent's load within
 * its capacity. */
function capacityFindings(support: Support, assignment: readonly Pair[]): string[] {
  const capacity = new Map(support.agents.map(agent => [agent.id, agent.capacity] as const));
  const load = new Map(support.tasks.map(task => [task.id, task.load] as const));
  const findings: string[] = [];
  const seen = new Set<string>();
  const used = new Map<string, number>();
  for (const pair of assignment) {
    const need = load.get(pair.task);
    if (!capacity.has(pair.agent) || need === undefined) {
      findings.push(`${keyOf(pair)} names no support agent or task`);
      continue;
    }
    if (seen.has(pair.task)) findings.push(`${pair.task} assigned twice`);
    seen.add(pair.task);
    used.set(pair.agent, (used.get(pair.agent) ?? 0) + need);
  }
  for (const [agent, total] of used) if (total > (capacity.get(agent) ?? 0)) findings.push(`${agent} carries ${total} over capacity ${capacity.get(agent) ?? 0}`);
  return findings;
}
/** The agents an assignment overloads, in support agent order. */
const overloadedBy = (support: Support, assignment: readonly Pair[]): string[] =>
  support.agents.filter(agent => assignment.filter(pair => pair.agent === agent.id).reduce((sum, pair) => sum + (support.tasks.find(task => task.id === pair.task)?.load ?? 0), 0) > agent.capacity).map(agent => agent.id);
/** The check's eligible reading after a chosen prefix: support pairs whose task is free and whose load fits the agent's
 * remaining capacity. */
function expectedEligible(support: Support, chosen: readonly Pair[]): string[] {
  const remaining = new Map(support.agents.map(agent => [agent.id, agent.capacity] as const));
  const load = new Map(support.tasks.map(task => [task.id, task.load] as const));
  const free = new Set(support.tasks.map(task => task.id));
  for (const pair of chosen) {
    free.delete(pair.task);
    remaining.set(pair.agent, (remaining.get(pair.agent) ?? 0) - (load.get(pair.task) ?? 0));
  }
  return support.pairs.filter(pair => free.has(pair.task) && (load.get(pair.task) ?? Number.POSITIVE_INFINITY) <= (remaining.get(pair.agent) ?? Number.NEGATIVE_INFINITY)).map(keyOf);
}
/** The check's probability of a pair among candidates: 1 over the sum, across the candidates, of exp(logit(q) -
 * logit(p)). */
function expectedProbability(support: Support, pair: string, among: readonly string[]): number {
  const own = support.logits[pair] ?? Number.NaN;
  return 1 / among.reduce((sum, other) => sum + Math.exp((support.logits[other] ?? Number.NaN) - own), 0);
}
const close = (left: number, right: number, tolerance = TOLERANCE): boolean => Math.abs(left - right) <= tolerance;

// ---- the checks ----

type Check = "K-NAMED" | "K-FEASIBLE" | "K-DETERMINISTIC" | "K-JOINT" | "K-COUNT" | "K-VALIDATE" | "K-INDEPENDENT" | "K-RECEIPT" | "K-SUPPORT";
const CHECKS: readonly Check[] = ["K-NAMED", "K-FEASIBLE", "K-DETERMINISTIC", "K-JOINT", "K-COUNT", "K-VALIDATE", "K-INDEPENDENT", "K-RECEIPT", "K-SUPPORT"];
type Verdict = Readonly<Record<Check, readonly string[]>>;

/** K-NAMED: the host admits its two selectors on every case, and refuses an unnamed selector and an unknown kind,
 * each typed; each decision names the selector that made it, and the two names differ. */
function namedFindings(host: Host): string[] {
  const findings: string[] = [];
  if (host.resolver.name === host.sampler.name) findings.push("the resolver and the sampler share one name");
  for (const entry of CASES) {
    const support = supportOf(entry);
    for (const selector of [host.resolver, host.sampler]) {
      const admission = host.admit(selector, support);
      if (!isDeepStrictEqual(admission, { ok: true })) findings.push(`${entry.id}: ${selector.name || "(blank)"} is not admitted: ${JSON.stringify(admission)}`);
    }
    for (const control of UNNAMED) {
      const descriptor: Descriptor = { name: control.name, kind: control.kind };
      const admission = host.admit(descriptor, support);
      if (!isDeepStrictEqual(admission, { ok: false, code: control.code, selector: control.name })) findings.push(`${entry.id}: ${JSON.stringify(descriptor)} is admitted as ${JSON.stringify(admission)}`);
    }
    const { decisions, fault } = decisionsOf(host, support);
    if (fault !== null) findings.push(`${entry.id}: ${fault}`);
    for (const { label, decision } of decisions) {
      const own = label === "resolver" ? host.resolver.name : host.sampler.name;
      if (decision.selector !== own) findings.push(`${entry.id} ${label}: names ${JSON.stringify(decision.selector)}, not its selector ${own}`);
    }
  }
  return findings;
}
/** K-FEASIBLE: every assignment either selector emits on every case is capacity-feasible, and none is a case's
 * overloaded per-pair argmax set. */
function feasibleFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    const argmax = entry.argmax.map(pairOf);
    const { decisions, fault } = decisionsOf(host, support);
    if (fault !== null) findings.push(`${entry.id}: ${fault}`);
    for (const { label, decision } of decisions) {
      for (const finding of capacityFindings(support, decision.assignment)) findings.push(`${entry.id} ${label}: ${finding}`);
      if (entry.overloaded.length > 0 && sameSet(decision.assignment, argmax)) findings.push(`${entry.id} ${label}: emits the per-pair argmax set`);
    }
  }
  return findings;
}
/** K-DETERMINISTIC: the resolver run twice on identical input (two copies, two different choosers) yields an
 * identical assignment set, calls neither chooser, and each run records the deterministic proposal: no draw step and
 * log probability 0. */
function deterministicFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    let draws = 0;
    const counted =
      (chooser: Chooser): Chooser =>
      candidates => {
        draws += 1;
        return chooser(candidates);
      };
    const first = host.resolver.select(copyOf(support), counted(firstChooser));
    const second = host.resolver.select(copyOf(support), counted(lastChooser));
    if (!sameSet(first.assignment, second.assignment)) findings.push(`${entry.id}: the two runs assign ${setOf(first.assignment).join(",")} and ${setOf(second.assignment).join(",")}`);
    if (draws !== 0) findings.push(`${entry.id}: the resolver called its chooser ${draws} times`);
    for (const decision of [first, second]) {
      if (decision.logProbability !== 0) findings.push(`${entry.id}: a deterministic proposal records log probability ${decision.logProbability}, not 0`);
      if (decision.steps.length !== 0) findings.push(`${entry.id}: a deterministic proposal records ${decision.steps.length} draws`);
    }
  }
  return findings;
}
/** K-JOINT: every sampler path records the pairs it drew in draw order, each step's log probability of what it was
 * presented, and their sum as the decision's log probability; the path probabilities sum to 1. */
function jointFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    const walk = walkOf(host.sampler, support);
    if (walk.fault !== null) findings.push(`${entry.id}: ${walk.fault}`);
    let total = 0;
    for (const [index, path] of walk.paths.entries()) {
      const chosen = chosenOf(path);
      const decision = path.decision;
      if (!isDeepStrictEqual(keysOf(decision.assignment), keysOf(chosen))) findings.push(`${entry.id} path ${index}: records ${keysOf(decision.assignment).join(",")} for draws ${keysOf(chosen).join(",")}`);
      const logs = path.presented.map((candidates, step) => Math.log(candidates[path.choices[step] ?? -1]?.probability ?? 0));
      if (decision.steps.length !== logs.length) findings.push(`${entry.id} path ${index}: ${decision.steps.length} steps for ${logs.length} draws`);
      for (const [step, log] of logs.entries()) {
        const recorded = decision.steps[step];
        if (recorded === undefined) continue;
        if (keyOf(recorded.pair) !== keyOf(chosen[step] ?? { agent: "-", task: "-" })) findings.push(`${entry.id} path ${index} step ${step}: records ${keyOf(recorded.pair)}`);
        if (!close(recorded.logProbability, log)) findings.push(`${entry.id} path ${index} step ${step}: log probability ${recorded.logProbability}, drawn at ${log}`);
      }
      const joint = logs.reduce((sum, log) => sum + log, 0);
      if (!close(decision.logProbability, joint)) findings.push(`${entry.id} path ${index}: log probability ${decision.logProbability}, not the joint ${joint}`);
      total += Math.exp(decision.logProbability);
    }
    if (!close(total, 1, PATH_SUM_TOLERANCE)) findings.push(`${entry.id}: the paths' probabilities sum to ${total}`);
  }
  return findings;
}
/** K-COUNT: at every step of every sampler path the presented candidates are exactly the actual eligible support,
 * each at its softmax probability over exactly that support, and the step records how many there were; the decision
 * records the support's pair count. */
function countFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    const walk = walkOf(host.sampler, support);
    if (walk.fault !== null) findings.push(`${entry.id}: ${walk.fault}`);
    for (const [index, path] of walk.paths.entries()) {
      const chosen = chosenOf(path);
      for (const [step, candidates] of path.presented.entries()) {
        const expected = expectedEligible(support, chosen.slice(0, step));
        const keys = candidates.map(candidate => keyOf(candidate.pair));
        if (!isDeepStrictEqual([...keys].sort(), [...expected].sort())) findings.push(`${entry.id} path ${index} step ${step}: presents ${keys.join(",")}, eligible ${expected.join(",")}`);
        for (const candidate of candidates) {
          const probability = expectedProbability(support, keyOf(candidate.pair), expected);
          if (!close(candidate.probability, probability)) findings.push(`${entry.id} path ${index} step ${step}: ${keyOf(candidate.pair)} at ${candidate.probability}, not ${probability}`);
        }
        const recorded = path.decision.steps[step];
        if (recorded !== undefined && recorded.candidates !== candidates.length) findings.push(`${entry.id} path ${index} step ${step}: records ${recorded.candidates} candidates of ${candidates.length}`);
      }
      if (path.decision.supportCount !== support.pairs.length) findings.push(`${entry.id} path ${index}: support count ${path.decision.supportCount}, not ${support.pairs.length}`);
    }
  }
  return findings;
}
interface ValidationCase {
  readonly id: string;
  readonly missing: readonly string[];
  readonly alter: (decision: Unvalidated) => Unvalidated;
}
/** The decision without one field (absent, never undefined). */
const dropField = (decision: Unvalidated, field: string): Unvalidated => Object.fromEntries(Object.entries(decision).filter(([name]) => name !== field)) as unknown as Unvalidated;
const VALIDATION_CASES: readonly ValidationCase[] = [
  { id: "selector-absent", missing: ["selector"], alter: decision => dropField(decision, "selector") },
  { id: "selector-empty", missing: ["selector"], alter: decision => ({ ...decision, selector: "" }) },
  { id: "selector-blank", missing: ["selector"], alter: decision => ({ ...decision, selector: "   " }) },
  { id: "selector-number", missing: ["selector"], alter: decision => ({ ...decision, selector: 7 }) },
  { id: "selector-format-only", missing: ["selector"], alter: decision => ({ ...decision, selector: FORMAT_CHARACTER }) },
  { id: "probability-absent", missing: ["probability"], alter: decision => dropField(decision, "logProbability") },
  { id: "probability-nan", missing: ["probability"], alter: decision => ({ ...decision, logProbability: Number.NaN }) },
  { id: "probability-infinite", missing: ["probability"], alter: decision => ({ ...decision, logProbability: Number.NEGATIVE_INFINITY }) },
  { id: "probability-above-one", missing: ["probability"], alter: decision => ({ ...decision, logProbability: 0.5 }) },
  { id: "probability-text", missing: ["probability"], alter: decision => ({ ...decision, logProbability: "-0.5" }) },
  { id: "both-absent", missing: ["selector", "probability"], alter: decision => dropField(dropField(decision, "selector"), "logProbability") },
];
/** The two well-formed decisions every validation case alters: the reference resolver's and the reference sampler's
 * first path, both on the falsifier. */
function validationBases(): readonly Labelled[] {
  const support = supportOf(caseOf("falsifier"));
  const first = walkOf(REFERENCE.sampler, support).paths[0];
  if (first === undefined) throw new Error("the reference sampler has no path");
  return [
    { label: "resolver", decision: REFERENCE.resolver.select(copyOf(support), firstChooser) },
    { label: "sampler", decision: first.decision },
  ];
}
/** Every reference decision on every case: the decisions the checks of the host's validation and receipt read. */
function referenceDecisions(): readonly { readonly entry: Case; readonly support: Support; readonly decisions: readonly Labelled[] }[] {
  return CASES.map(entry => {
    const support = supportOf(entry);
    return { entry, support, decisions: decisionsOf(REFERENCE, support).decisions };
  });
}
/** K-VALIDATE: every decision lacking selector name or probability is the typed validation refusal naming what it
 * lacks, and every reference decision is accepted. */
function validateFindings(host: Host): string[] {
  const findings: string[] = [];
  const falsifier = supportOf(caseOf("falsifier"));
  for (const base of validationBases()) {
    for (const entry of VALIDATION_CASES) {
      const outcome = host.validate(entry.alter(base.decision), falsifier);
      const expected = { ok: false, code: "decision-validation", missing: [...entry.missing] };
      if (!isDeepStrictEqual(outcome, expected)) findings.push(`${base.label} ${entry.id}: ${JSON.stringify(outcome)}`);
    }
  }
  for (const { entry, support, decisions } of referenceDecisions()) {
    for (const { label, decision } of decisions) {
      const outcome = host.validate(decision, support);
      if (!isDeepStrictEqual(outcome, { ok: true })) findings.push(`${entry.id} ${label}: a well-formed decision is refused ${JSON.stringify(outcome)}`);
    }
  }
  return findings;
}
/** K-INDEPENDENT: the host refuses both independent per-pair kinds, under their kind names and under two other names,
 * for every multi-task case as the typed not-capacity-feasible refusal, and refuses each case's overloaded per-pair
 * argmax set and each infeasible decision on SPARE, carried under the resolver's name, as the same refusal. */
function independentFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    if (support.tasks.length > 1) {
      for (const selector of [...INDEPENDENT, ...RENAMED]) {
        const admission = host.admit(selector, support);
        if (!isDeepStrictEqual(admission, { ok: false, code: "not-capacity-feasible", selector: selector.name })) findings.push(`${entry.id}: ${selector.name} is admitted as ${JSON.stringify(admission)}`);
      }
    }
    if (entry.overloaded.length > 0) {
      const decision: Decision = { selector: RESOLVER_NAME, basisRevision: support.basisRevision, supportCount: support.pairs.length, assignment: entry.argmax.map(pairOf), steps: [], logProbability: 0 };
      const outcome = host.validate(decision, support);
      if (!isDeepStrictEqual(outcome, { ok: false, code: "not-capacity-feasible", selector: RESOLVER_NAME })) findings.push(`${entry.id}: the argmax set validates as ${JSON.stringify(outcome)}`);
    }
  }
  const spare = supportOf(SPARE);
  for (const shape of INFEASIBLE) {
    const decision: Decision = { selector: RESOLVER_NAME, basisRevision: spare.basisRevision, supportCount: spare.pairs.length, assignment: shape.assignment.map(pairOf), steps: [], logProbability: 0 };
    const outcome = host.validate(decision, spare);
    if (!isDeepStrictEqual(outcome, { ok: false, code: "not-capacity-feasible", selector: RESOLVER_NAME })) findings.push(`spare ${shape.id}: validates as ${JSON.stringify(outcome)}`);
  }
  return findings;
}
/** K-RECEIPT: the receipt of every reference decision, read back from its JSON, carries the decision's selector name
 * and its log probability unchanged. */
function receiptFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const { entry, decisions } of referenceDecisions()) {
    for (const { label, decision } of decisions) {
      const carried = JSON.parse(JSON.stringify(host.receipt(decision))) as Record<string, unknown>;
      if (carried.selector !== decision.selector) findings.push(`${entry.id} ${label}: the receipt carries selector ${JSON.stringify(carried.selector)}`);
      if (carried.logProbability !== decision.logProbability) findings.push(`${entry.id} ${label}: the receipt carries log probability ${JSON.stringify(carried.logProbability)}, not ${decision.logProbability}`);
    }
  }
  return findings;
}
/** K-SUPPORT: every pair either selector emits is a pair of the R2 support it read, and every decision carries that
 * support's basis revision. */
function supportFindings(host: Host): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const support = supportOf(entry);
    const legal = new Set(keysOf(support.pairs));
    const { decisions, fault } = decisionsOf(host, support);
    if (fault !== null) findings.push(`${entry.id}: ${fault}`);
    for (const { label, decision } of decisions) {
      for (const pair of decision.assignment) if (!legal.has(keyOf(pair))) findings.push(`${entry.id} ${label}: ${keyOf(pair)} is outside the support`);
      if (decision.basisRevision !== support.basisRevision) findings.push(`${entry.id} ${label}: basis revision ${JSON.stringify(decision.basisRevision)}, not ${support.basisRevision}`);
    }
  }
  return findings;
}
const CHECK_FINDINGS: Readonly<Record<Check, (host: Host) => string[]>> = {
  "K-NAMED": namedFindings,
  "K-FEASIBLE": feasibleFindings,
  "K-DETERMINISTIC": deterministicFindings,
  "K-JOINT": jointFindings,
  "K-COUNT": countFindings,
  "K-VALIDATE": validateFindings,
  "K-INDEPENDENT": independentFindings,
  "K-RECEIPT": receiptFindings,
  "K-SUPPORT": supportFindings,
};
const judge = (host: Host): Verdict => Object.fromEntries(CHECKS.map(check => [check, CHECK_FINDINGS[check](host)])) as Record<Check, string[]>;
const refusing = (verdict: Verdict): Check[] => CHECKS.filter(check => verdict[check].length > 0);

// ---- the mutants ----

interface Mutant {
  readonly id: string;
  readonly name: string;
  readonly refusedBy: readonly Check[];
  readonly host: Host;
}
const hostWith = (change: Partial<Host>): Host => ({ ...REFERENCE, ...change });
/** A selector whose decision is reshaped after the fact. */
const reshaped = (selector: Selector, change: (decision: Decision, support: Support) => Decision): Selector => ({ ...selector, select: (support, chooser) => change(selector.select(support, chooser), support) });
/** The reference matching, then each still-free task given to the first agent with room, support or not. */
function gridFill(support: Support): Pair[] {
  const chosen = matchFrom(support, ranked(support));
  const room = new Map(support.agents.map(agent => [agent.id, agent.capacity] as const));
  for (const pair of chosen) room.set(pair.agent, (room.get(pair.agent) ?? 0) - loadOf(support, pair.task));
  const assigned = new Set(chosen.map(pair => pair.task));
  for (const task of support.tasks) {
    if (assigned.has(task.id)) continue;
    const agent = support.agents.find(candidate => (room.get(candidate.id) ?? 0) >= task.load);
    if (agent === undefined) continue;
    room.set(agent.id, (room.get(agent.id) ?? 0) - task.load);
    chosen.push({ agent: agent.id, task: task.id });
  }
  return chosen;
}
/** A resolver that asks the chooser which ranked pair to take first, then matches the rest in rank order. */
const chooserConsulted = resolverWith((support, chooser) => {
  const order = ranked(support);
  if (order.length === 0) return [];
  const first = order[chooser(order.map(pair => ({ pair, probability: 1 / order.length })))];
  return matchFrom(support, first === undefined ? order : [first, ...order.filter(pair => pair !== first)]);
});
/** A resolver that asks the chooser which ranked pair to take first, over the ranked pairs with the top pair repeated
 * last, so the first and the last candidate agree: a first-candidate and a last-candidate chooser read one set. */
const palindromeConsulted = resolverWith((support, chooser) => {
  const order = ranked(support);
  if (order.length < 2) return matchFrom(support, order);
  const options = [...order, ...order.slice(0, 1)];
  const first = options[chooser(options.map(pair => ({ pair, probability: 1 / options.length })))];
  return matchFrom(support, first === undefined ? order : [first, ...order.filter(pair => pair !== first)]);
});
/** A resolver that draws through its chooser and ignores the draw (it records no step). */
const ignoredDraw = resolverWith((support, chooser) => {
  if (support.pairs.length > 0) chooser(support.pairs.map(pair => ({ pair, probability: 1 / support.pairs.length })));
  return matchFrom(support, ranked(support));
});
/** A resolver with hidden state: every second call rotates its ranked order by one. */
function callCounter(): Selector {
  let calls = 0;
  return resolverWith(support => {
    calls += 1;
    const order = ranked(support);
    return matchFrom(support, calls % 2 === 0 ? [...order.slice(1), ...order.slice(0, 1)] : order);
  });
}
const MUTANTS: readonly Mutant[] = [
  { id: "M01", name: "per-pair-argmax-resolver", refusedBy: ["K-FEASIBLE"], host: hostWith({ resolver: perPairArgmaxSelector(RESOLVER_NAME, "deterministic-resolver") }) },
  { id: "M02", name: "capacity-blind-resolver", refusedBy: ["K-FEASIBLE"], host: hostWith({ resolver: resolverWith(support => matchFrom(support, ranked(support), { taskOnce: true, cost: () => 0 })) }) },
  { id: "M03", name: "task-twice-resolver", refusedBy: ["K-FEASIBLE"], host: hostWith({ resolver: resolverWith(support => matchFrom(support, ranked(support), { ...MATCH, taskOnce: false })) }) },
  { id: "M04", name: "load-blind-resolver", refusedBy: ["K-FEASIBLE"], host: hostWith({ resolver: resolverWith(support => matchFrom(support, ranked(support), { taskOnce: true, cost: () => 1 })) }) },
  { id: "M05", name: "grid-fill-resolver", refusedBy: ["K-SUPPORT"], host: hostWith({ resolver: resolverWith(support => gridFill(support)) }) },
  { id: "M06", name: "revision-dropped-resolver", refusedBy: ["K-SUPPORT"], host: hostWith({ resolver: reshaped(REFERENCE_RESOLVER, decision => ({ ...decision, basisRevision: "" })) }) },
  { id: "M07", name: "chooser-consulted-resolver", refusedBy: ["K-DETERMINISTIC"], host: hostWith({ resolver: chooserConsulted }) },
  { id: "M08", name: "call-counter-resolver", refusedBy: ["K-DETERMINISTIC"], host: hostWith({ resolver: callCounter() }) },
  {
    id: "M09",
    name: "resolver-probability-sampled",
    refusedBy: ["K-DETERMINISTIC"],
    host: hostWith({ resolver: reshaped(REFERENCE_RESOLVER, (decision, support) => ({ ...decision, logProbability: -Math.log(Math.max(1, support.pairs.length)) })) }),
  },
  {
    id: "M10",
    name: "capacity-blind-sampler",
    refusedBy: ["K-FEASIBLE", "K-COUNT"],
    host: hostWith({
      sampler: samplerWith({
        eligible: (support, chosen) => {
          const taken = new Set(chosen.map(pair => pair.task));
          return support.pairs.filter(pair => !taken.has(pair.task));
        },
      }),
    }),
  },
  { id: "M11", name: "first-candidate-sampler", refusedBy: ["K-JOINT", "K-COUNT"], host: hostWith({ sampler: samplerWith({ pick: candidates => candidates[0] }) }) },
  { id: "M12", name: "last-step-probability", refusedBy: ["K-JOINT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, decision => ({ ...decision, logProbability: decision.steps.at(-1)?.logProbability ?? 0 })) }) },
  { id: "M13", name: "independent-probability", refusedBy: ["K-JOINT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, (decision, support) => ({ ...decision, logProbability: independentLog(support, decision.assignment) })) }) },
  {
    id: "M14",
    name: "grid-normalized-sampler",
    refusedBy: ["K-JOINT", "K-COUNT"],
    host: hostWith({
      sampler: samplerWith({
        probabilities: (support, eligible, chosen) => {
          const taken = new Set(chosen.map(pair => pair.task));
          const pool = support.pairs.filter(pair => !taken.has(pair.task));
          const total = pool.reduce((sum, pair) => sum + Math.exp(logitOf(support, pair)), 0);
          return eligible.map(pair => Math.exp(logitOf(support, pair)) / total);
        },
      }),
    }),
  },
  { id: "M15", name: "support-count-of-the-grid", refusedBy: ["K-COUNT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, (decision, support) => ({ ...decision, supportCount: support.agents.length * support.tasks.length })) }) },
  { id: "M16", name: "step-count-dropped", refusedBy: ["K-COUNT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, decision => ({ ...decision, steps: decision.steps.map(step => ({ ...step, candidates: 0 })) })) }) },
  { id: "M17", name: "stale-revision-sampler", refusedBy: ["K-SUPPORT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, decision => ({ ...decision, basisRevision: "rev-stale" })) }) },
  { id: "M18", name: "name-unchecked", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, name: false }) }) },
  { id: "M19", name: "probability-unchecked", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, probability: false }) }) },
  { id: "M20", name: "untyped-validation-refusal", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, typed: false }) }) },
  { id: "M21", name: "probability-above-one", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, atMostOne: false }) }) },
  { id: "M22", name: "independent-admitted", refusedBy: ["K-INDEPENDENT"], host: hostWith({ admit: admitWith({ ...ADMIT, independent: "admit" }) }) },
  { id: "M23", name: "independent-untyped", refusedBy: ["K-INDEPENDENT"], host: hostWith({ admit: admitWith({ ...ADMIT, independent: "untyped" }) }) },
  { id: "M24", name: "capacity-unvalidated", refusedBy: ["K-INDEPENDENT"], host: hostWith({ validate: validateWith({ ...VALIDATE, capacity: false }) }) },
  { id: "M25", name: "unnamed-admitted", refusedBy: ["K-NAMED"], host: hostWith({ admit: admitWith({ ...ADMIT, name: false }) }) },
  { id: "M26", name: "unknown-kind-admitted", refusedBy: ["K-NAMED"], host: hostWith({ admit: admitWith({ ...ADMIT, known: "none" }) }) },
  { id: "M27", name: "decision-misnamed", refusedBy: ["K-NAMED"], host: hostWith({ resolver: reshaped(REFERENCE_RESOLVER, decision => ({ ...decision, selector: "selector" })) }) },
  { id: "M28", name: "receipt-without-selector", refusedBy: ["K-RECEIPT"], host: hostWith({ receipt: receiptWith(receipt => ({ ...receipt, selector: undefined })) }) },
  { id: "M29", name: "receipt-probability-one", refusedBy: ["K-RECEIPT"], host: hostWith({ receipt: receiptWith(receipt => ({ ...receipt, logProbability: 0 })) }) },
  { id: "M30", name: "receipt-probability-rounded", refusedBy: ["K-RECEIPT"], host: hostWith({ receipt: receiptWith((receipt, decision) => ({ ...receipt, logProbability: Math.round(decision.logProbability * 100) / 100 })) }) },
  { id: "M31", name: "empty-assignment-refused", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, empty: false }) }) },
  {
    id: "M32",
    name: "sampler-kind-refused",
    refusedBy: ["K-NAMED"],
    host: hostWith({ admit: (descriptor, support) => (descriptor.kind === "joint-sampler" ? { ok: false, code: "unknown-selector", selector: descriptor.name } : REFERENCE.admit(descriptor, support)) }),
  },
  {
    id: "M33",
    name: "resolver-records-draws",
    refusedBy: ["K-DETERMINISTIC"],
    host: hostWith({ resolver: reshaped(REFERENCE_RESOLVER, decision => ({ ...decision, steps: decision.assignment.map(pair => ({ pair, candidates: 1, logProbability: 0 })) })) }),
  },
  { id: "M34", name: "step-probability-dropped", refusedBy: ["K-JOINT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, decision => ({ ...decision, steps: decision.steps.map(step => ({ ...step, logProbability: 0 })) })) }) },
  { id: "M35", name: "steps-truncated", refusedBy: ["K-JOINT"], host: hostWith({ sampler: reshaped(REFERENCE_SAMPLER, decision => ({ ...decision, steps: decision.steps.slice(0, 1) })) }) },
  { id: "M36", name: "one-name-for-both", refusedBy: ["K-NAMED"], host: hostWith({ sampler: samplerWith({}, RESOLVER_NAME) }) },
  { id: "M37", name: "unbounded-sampler", refusedBy: ["K-NAMED", "K-FEASIBLE", "K-JOINT", "K-COUNT", "K-SUPPORT"], host: hostWith({ sampler: samplerWith({ eligible: support => [...support.pairs] }) }) },
  {
    id: "M38",
    name: "ghost-agent-resolver",
    refusedBy: ["K-FEASIBLE", "K-SUPPORT"],
    host: hostWith({
      resolver: resolverWith(support => {
        const chosen = matchFrom(support, ranked(support));
        const free = support.tasks.find(task => !chosen.some(pair => pair.task === task.id));
        return free === undefined ? chosen : [...chosen, { agent: "a-ghost", task: free.id }];
      }),
    }),
  },
  {
    id: "M39",
    name: "independent-refused-by-name",
    refusedBy: ["K-INDEPENDENT"],
    host: hostWith({ admit: (descriptor, support) => (INDEPENDENT_KINDS.includes(descriptor.kind) && !INDEPENDENT_KINDS.includes(descriptor.name) ? { ok: true } : REFERENCE.admit(descriptor, support)) }),
  },
  { id: "M40", name: "palindrome-chooser-resolver", refusedBy: ["K-DETERMINISTIC"], host: hostWith({ resolver: palindromeConsulted }) },
  { id: "M41", name: "ignored-draw-resolver", refusedBy: ["K-DETERMINISTIC"], host: hostWith({ resolver: ignoredDraw }) },
  { id: "M42", name: "task-twice-validated", refusedBy: ["K-INDEPENDENT"], host: hostWith({ validate: validateWith({ ...VALIDATE, taskOnce: false }) }) },
  { id: "M43", name: "support-names-unvalidated", refusedBy: ["K-INDEPENDENT"], host: hostWith({ validate: validateWith({ ...VALIDATE, supportNames: false }) }) },
  { id: "M44", name: "format-name-admitted", refusedBy: ["K-NAMED"], host: hostWith({ admit: admitWith({ ...ADMIT, formatCharacters: false }) }) },
  { id: "M45", name: "format-selector-validated", refusedBy: ["K-VALIDATE"], host: hostWith({ validate: validateWith({ ...VALIDATE, formatCharacters: false }) }) },
  { id: "M46", name: "single-unknown-kind", refusedBy: ["K-NAMED"], host: hostWith({ admit: admitWith({ ...ADMIT, known: "literal" }) }) },
];
const mutantOf = (id: string): Mutant => {
  const found = MUTANTS.find(mutant => mutant.id === id);
  if (found === undefined) throw new Error(`no mutant ${id}`);
  return found;
};
/** Each mutant declaring the check, with its finding count under that check. */
const mutantReadings = (check: Check): [string, number][] => MUTANTS.filter(mutant => mutant.refusedBy.includes(check)).map(mutant => [mutant.id, CHECK_FINDINGS[check](mutant.host).length]);

// ---- the armed registrations ----

interface Site {
  readonly path: string;
  readonly host: Host;
}
/** A src module naming the vocabulary must register its host here; every check then judges it beside the reference.
 * Empty: the gate has not fired. */
const SITES: readonly Site[] = [];
/** Every host the checks judge: the reference, then each registration. */
const JUDGED: readonly { readonly name: string; readonly host: Host }[] = [{ name: "reference", host: REFERENCE }, ...SITES.map(site => ({ name: site.path, host: site.host }))];
/** A check on every judged host (each must read no finding) and on every mutant declaring it (each must read one or
 * more). */
function checkReading(check: Check): { readonly judged: Readonly<Record<string, readonly string[]>>; readonly mutants: [string, number][] } {
  const judged = Object.fromEntries(JUDGED.map(entry => [entry.name, CHECK_FINDINGS[check](entry.host)]));
  for (const [name, findings] of Object.entries(judged)) expect(findings, `${name} meets ${check}`).toEqual([]);
  const mutants = mutantReadings(check);
  for (const [id, count] of mutants) expect(count, `${id} is refused by ${check}`).toBeGreaterThan(0);
  return { judged, mutants };
}

// ---- the src reading ----

interface Word {
  readonly id: string;
  readonly spelling: string;
}
/** The filing's search words Pi's src never uses (V1-V4, in the filing's order), the filing's "sampler" (V5) and the
 * statement's "autoregressive" (V6) and "logit" (V7). */
const VOCABULARY: readonly Word[] = [
  { id: "V1", spelling: "argmax" },
  { id: "V2", spelling: "logits" },
  { id: "V3", spelling: "optimizer" },
  { id: "V4", spelling: "log probability" },
  { id: "V5", spelling: "sampler" },
  { id: "V6", spelling: "autoregressive" },
  { id: "V7", spelling: "logit" },
];
/** The filing's two other search words and the statement's "resolver" and "assignment": Pi's own words with other
 * meanings, never read (R-SHARED-WORD). */
const SHARED_WORDS: readonly string[] = ["selector", "matching", "resolver", "assignment"];
/** A spelling's parts: split at whitespace, dots, underscores and hyphens, then at camel humps. */
const partsOf = (spelling: string): string[] => spelling.split(/[\s._-]+/).flatMap(word => word.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? []);
const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A letter's reading: a z also read as s (a British spelling: optimiser), a part's final y also read as ies (an
 * inflected plural: probabilities). */
const letterReader = (letter: string, last: boolean): string => {
  if (/z/i.test(letter)) return "[sz]";
  if (last && /y/i.test(letter)) return "(?:y|ies)";
  return escapeRegex(letter);
};
/** A part's reading: its letters in order, with any run of format characters (Cf) between two of them (an invisible
 * inside a word reads as the word: auto, a soft hyphen, regressive is autoregressive). */
const partReader = (part: string): string => [...part].map((letter, index, letters) => letterReader(letter, index === letters.length - 1)).join("\\p{Cf}*");
/** A word's reading: its parts in order, any case, with any run of characters that are neither letters nor digits
 * between them (whitespace and a comment line wrap, dots, underscores, hyphens and every other dash, slashes,
 * parentheses, quotes, symbols, format characters). */
const readerOf = (word: Word): RegExp => new RegExp(partsOf(word.spelling).map(partReader).join("[^\\p{L}\\p{N}]*"), "iu");
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
/** A src module naming the vocabulary without a registration, a stale registration and a duplicate registration are
 * findings. */
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
const DASH_HYPHEN = String.fromCodePoint(0x2010);
const MIDDLE_DOT = String.fromCodePoint(0xb7);
const SOFT_HYPHEN = String.fromCodePoint(0xad);
/** The reading's controls: each label with its text and the words the reading must read in it, in vocabulary order. */
const VOCABULARY_CONTROLS: readonly (readonly [string, string, readonly string[]])[] = [
  ["argmax", "the per-pair argmax", ["argmax"]],
  ["argmax camel", "ArgMax", ["argmax"]],
  ["logits", "pair logits", ["logits", "logit"]],
  ["logit alone", "one logit", ["logit"]],
  ["logit upper", "LOGIT", ["logit"]],
  ["optimizer", "a deterministic optimizer", ["optimizer"]],
  ["optimizer camel", "scoreOptimizer", ["optimizer"]],
  ["optimizer british", "a deterministic optimiser", ["optimizer"]],
  ["optimizer british plural", "OPTIMISERS", ["optimizer"]],
  ["log probability spaced", "the behavior log probability", ["log probability"]],
  ["log probability camel", "logProbability", ["log probability"]],
  ["log probability snake", "log_probability", ["log probability"]],
  ["log probability upper kebab", "LOG-PROBABILITY", ["log probability"]],
  ["log probability dotted", "log.probability", ["log probability"]],
  ["log probability joined", "logprobability", ["log probability"]],
  ["log probability format characters", `log${FORMAT_CHARACTER}probability`, ["log probability"]],
  ["log probability plural camel", "logProbabilities", ["log probability"]],
  ["log probability plural spaced", "the behavior log probabilities", ["log probability"]],
  ["log probability plural kebab", "log-probabilities", ["log probability"]],
  ["log probability comment wrap", "// log\n// probability", ["log probability"]],
  ["log probability slash", "log/probability", ["log probability"]],
  ["log probability parenthesised", "log (probability)", ["log probability"]],
  ["log probability dash punctuation", `log${DASH_HYPHEN}probability`, ["log probability"]],
  ["log probability middle dot", `log${MIDDLE_DOT}probability`, ["log probability"]],
  ["log probability symbol", "log+probability", ["log probability"]],
  ["log probability quoted list", '["log", "probability"]', ["log probability"]],
  ["sampler", "a joint sampler", ["sampler"]],
  ["sampler inside a longer name", "resampler", ["sampler"]],
  ["autoregressive", "autoregressive draws", ["autoregressive"]],
  ["autoregressive camel", "AutoRegressive", ["autoregressive"]],
  ["autoregressive soft hyphen inside", `auto${SOFT_HYPHEN}regressive`, ["autoregressive"]],
  ["argmax format character inside", `arg${FORMAT_CHARACTER}max`, ["argmax"]],
  ["every word", "argmax logits optimizer log probability sampler autoregressive", ["argmax", "logits", "optimizer", "log probability", "sampler", "autoregressive", "logit"]],
  ["shared words", "selector matching resolver assignment", []],
];

// ---- the docs, the export and the roster ----

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
let pinDocCache: string | undefined;
const pinDoc = (): string => {
  if (pinDocCache === undefined) pinDocCache = execFileSync("git", ["show", `${FILING_PIN}:${DOCS_03}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return pinDocCache;
};
interface DocAnchor {
  readonly line: number;
  readonly pin: boolean;
  readonly head: boolean;
}
interface Paragraph {
  /** What a reader sees (inline markup and HTML removed, whitespace collapsed). */
  readonly text: string;
  /** The paragraph's source, whitespace collapsed. */
  readonly markdown: string;
}
/** The rendered paragraphs of a page's bound docs section, through the landed docs binding (docsSection of
 * test/helpers/census.ts: DOCS_HEADING exactly once in the rendered view, under DOCS_TITLE, bounded at the next level-1 or
 * level-2 heading); a refused binding, or a section carrying HTML (a comment or a tag), reads none. A code block or an
 * HTML block is never a paragraph. */
function sectionParagraphs(page: string): readonly Paragraph[] {
  const section = docsSection(page, DOCS_HEADING, 2, [DOCS_TITLE]);
  if (!section.ok || section.hasHtml) return [];
  return section.blocks.flatMap(block => (block.kind === "paragraph" ? [{ text: block.text, markdown: block.markdown }] : []));
}
/** An anchor read over a pinned page and a live page, both rendered: the pinned page's line holds the text and is the
 * source of a paragraph of the bound section whose rendered text holds the text too; the live page's bound section
 * renders a paragraph whose rendered text equals that paragraph's (equality within the section, never an includes over
 * the page). */
function anchorIn(line: number, text: string, pinned: string, live: string): DocAnchor {
  const at = pinned.split("\n")[line - 1] ?? "";
  const source = at.replace(/\s+/g, " ").trim();
  const rendered = source === "" ? "" : (sectionParagraphs(pinned).find(paragraph => paragraph.markdown === source)?.text ?? "");
  return { line, pin: text !== "" && at.includes(text) && rendered.includes(text), head: rendered !== "" && sectionParagraphs(live).some(paragraph => paragraph.text === rendered) };
}
const FENCE = "```";
/** In-memory plants of the live page, each edited around the cited line and read with the anchor: whether the bound
 * section still renders the cited paragraph. */
const DOCS_PLANTS: readonly { readonly id: string; readonly head: boolean; readonly edit: (live: string, line: string) => string }[] = [
  { id: "as-is", head: true, edit: live => live },
  { id: "line-deleted", head: false, edit: (live, line) => live.split("\n").filter(entry => entry !== line).join("\n") },
  { id: "line-edited", head: false, edit: (live, line) => live.replace(line, `${line} (edited)`) },
  { id: "comment-wrapped", head: false, edit: (live, line) => live.replace(line, `<!--\n${line}\n-->`) },
  { id: "moved-to-a-trailing-section", head: false, edit: (live, line) => `${live.replace(`${line}\n`, "")}\n## Withdrawn architecture claims (not enforced)\n\n${line}\n` },
  { id: "fenced", head: false, edit: (live, line) => live.replace(line, `${FENCE}\n${line}\n${FENCE}`) },
  { id: "indented-into-the-diagram", head: false, edit: (live, line) => live.replace(line, `    ${line}`) },
  { id: "inline-comment", head: false, edit: (live, line) => live.replace(line, `${line} <!-- withdrawn -->`) },
  { id: "heading-duplicated", head: false, edit: live => `${live}\n## ${DOCS_HEADING}\n\nA second section of the same heading.\n` },
  { id: "rehomed-under-another-title", head: false, edit: live => live.replace(`## ${DOCS_HEADING}\n`, `# Appendix\n\n## ${DOCS_HEADING}\n`) },
  { id: "emphasis-respelled", head: true, edit: (live, line) => live.replace(line, line.replace("*calls*", "_calls_")) },
  { id: "comment-in-another-section", head: true, edit: live => live.replace("## Ownership boundaries\n", "## Ownership boundaries\n\n<!-- a reviewer note -->\n") },
  { id: "rewrapped", head: true, edit: (live, line) => live.replace(line, line.replace(" but does not invent", "\nbut does not invent")) },
];
interface BeadRow {
  readonly title: string;
  readonly notes: string;
  readonly parents: readonly string[];
}
let exportCache: string | undefined;
const exportText = (): string => {
  if (exportCache === undefined) exportCache = textOf(EXPORT);
  return exportCache;
};
/** A bead's row in the tracker export: its title, its notes and its parent-child dependencies. */
function beadRow(bead: string): BeadRow | undefined {
  for (const line of exportText().split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const { id, title, notes, dependencies } = row as { readonly id?: unknown; readonly title?: unknown; readonly notes?: unknown; readonly dependencies?: unknown };
    if (id !== bead || typeof title !== "string" || typeof notes !== "string") continue;
    const parents = Array.isArray(dependencies)
      ? dependencies.flatMap(entry => {
          const { type, depends_on_id: parent } = (typeof entry === "object" && entry !== null ? entry : {}) as { readonly type?: unknown; readonly depends_on_id?: unknown };
          return type === "parent-child" && typeof parent === "string" ? [parent] : [];
        })
      : [];
    return { title, notes, parents };
  }
  return undefined;
}
/** The owner filing's acceptance line: the first "Acceptance shape: " to its line end. */
function acceptanceLine(notes: string): string {
  const start = notes.indexOf("Acceptance shape: ");
  if (start === -1) return "";
  const end = notes.indexOf("\n", start);
  return notes.slice(start + "Acceptance shape: ".length, end === -1 ? undefined : end).trim();
}
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses)
 * between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(label.slice(at));
}

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** A slice of the bead's own row, verbatim: an acceptance clause (A1-A4), a statement clause (A5, A6, N, D), the
   * filing's closing sentence (C, G) or its posture sentence (S); or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "A1", label: "a falsifier fixture in which per-pair argmax exceeds one agent's capacity proves the selector never emits that set", pins: ["A1a", "A1b"] },
  { id: "A2", label: "the deterministic resolver run twice on identical input yields an identical assignment set", pins: ["A2a", "A2b"] },
  { id: "A3", label: "the sampler path records a log probability over the actual support count", pins: ["A3a", "A3b"] },
  { id: "A4", label: "a decision lacking selector name or probability is a typed validation refusal", pins: ["A4a", "A4b"] },
  { id: "A5", label: "shall refuse independent per-pair argmax/logit selection for a multi-task assignment as not capacity-feasible", pins: ["A5a", "A5b"] },
  { id: "A6", label: "selector name and probability travel with the receipt", pins: ["A6a", "A6b"] },
  { id: "N", label: "The Pi host shall select through a named recorded selector", pins: ["N1"] },
  {
    id: "D",
    label: "a capacity-aware deterministic matching resolver, or a documented joint/autoregressive sampler over the R2 support recording the JOINT behavior log probability",
    pins: ["D1", "D2", "D3"],
  },
  { id: "C", label: "file conjoined with R2", pins: ["C1"] },
  { id: "G", label: "Zero Pi change until the gate", pins: ["G1", "G2"] },
  {
    id: "S",
    label: "docs/workbench/03-architecture-and-ownership.md:22@758ec18187a5 keeps Pi from inventing a second scheduler, so the duty binds only if Pi hosts GP-conditioned assignment",
    pins: ["S1", "S2"],
  },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
];
/** Each pin's quote: a row's quotes tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  A1a: "a falsifier fixture in which per-pair argmax exceeds one agent's capacity",
  A1b: "proves the selector never emits that set",
  A2a: "the deterministic resolver run twice on identical input",
  A2b: "yields an identical assignment set",
  A3a: "the sampler path records a log probability",
  A3b: "over the actual support count",
  A4a: "a decision lacking selector name or probability",
  A4b: "is a typed validation refusal",
  A5a: "shall refuse independent per-pair argmax/logit selection for a multi-task assignment",
  A5b: "as not capacity-feasible",
  A6a: "selector name and probability",
  A6b: "travel with the receipt",
  N1: "The Pi host shall select through a named recorded selector",
  D1: "a capacity-aware deterministic matching resolver",
  D2: "or a documented joint/autoregressive sampler over the R2 support",
  D3: "recording the JOINT behavior log probability",
  C1: "file conjoined with R2",
  G1: "Zero Pi change",
  G2: "until the gate",
  S1: "docs/workbench/03-architecture-and-ownership.md:22@758ec18187a5 keeps Pi from inventing a second scheduler",
  S2: "so the duty binds only if Pi hosts GP-conditioned assignment",
  Q1: "R-COMPOSED",
  Q2: "R-SHARED-WORD",
  Q3: "R-UNNAMED-SELECTOR",
  Q4: "R-SCORE-BLIND",
  Q5: "R-DECLARED-KIND",
  Q6: "R-SINGLE-TASK",
  Q7: "R-STATEFUL",
  Q8: "R-LIVENESS",
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
      { id: "concatenated", text: 'export const name = "arg" + "max";\n' },
      { id: "split-one-part-word", text: "export const arg_max = 1;\n" },
      { id: "spaced", text: 'export const name = "arg max";\n' },
      { id: "escaped", text: 'export const name = "\\u0061rgmax";\n' },
      { id: "homoglyph", text: `export const name = "${CYRILLIC_A}rgmax";\n` },
      { id: "abbreviated", text: "export const logProb = 0;\n" },
      { id: "hyphenated", text: "// an auto-regressive draw\n" },
      { id: "joined", text: 'export const name = ["probability", "log"].reverse().join(" ");\n' },
    ],
  },
  {
    id: "Q2",
    name: "R-SHARED-WORD",
    members: [
      { id: "selector", text: "export interface ObserveSelectors {}\n" },
      { id: "matching", text: "// keep the rows matching the scope\n" },
      { id: "resolver", text: "export const resolver = (name: string) => name;\n" },
      { id: "assignment", text: "// a destructuring assignment\n" },
    ],
  },
  {
    id: "Q3",
    name: "R-UNNAMED-SELECTOR",
    members: [
      { id: "best-pair", text: "export const pick = (pairs) => pairs.reduce((best, pair) => (pair.score > best.score ? pair : best));\n" },
      { id: "softmax", text: "export const softmax = (scores) => scores.map((score) => Math.exp(score));\n" },
    ],
  },
];
/** Q5's member fixture: a multi-task support on which the per-pair argmax set is capacity-feasible. */
const DISJOINT: Fixture = {
  id: "disjoint",
  capacities: [
    ["a-left", 1],
    ["a-right", 1],
  ],
  loads: [
    ["t-left", 1],
    ["t-right", 1],
  ],
  weights: [
    ["a-left/t-left", 4],
    ["a-left/t-right", 1],
    ["a-right/t-left", 1],
    ["a-right/t-right", 4],
  ],
};
/** Q6's member fixture: a single-task support. */
const ONE_TASK: Fixture = {
  id: "one-task",
  capacities: [
    ["a-first", 1],
    ["a-second", 1],
  ],
  loads: [["t-only", 1]],
  weights: [
    ["a-first/t-only", 3],
    ["a-second/t-only", 1],
  ],
};
/** Q4's member: a deterministic, capacity-aware resolver that matches in support order and ignores the scores. */
const SCORE_BLIND = resolverWith(support => matchFrom(support, support.pairs));
/** Q5's members: an independent per-pair selector declared under an admitted name and kind. */
const DECLARED: readonly { readonly id: string; readonly selector: Selector; readonly chooser: Chooser }[] = [
  { id: "argmax-declared-resolver", selector: perPairArgmaxSelector(RESOLVER_NAME, "deterministic-resolver"), chooser: firstChooser },
  { id: "logit-declared-sampler", selector: perPairLogitSelector(SAMPLER_NAME, "joint-sampler"), chooser: scripted([0, 1]) },
];
/** Q7's member: a resolver whose first call matches in rank order and every later call in reverse rank order (its hidden
 * state changes once, after its first call). */
function lateSwitch(): Selector {
  let calls = 0;
  return resolverWith(support => {
    calls += 1;
    const order = ranked(support);
    return matchFrom(support, calls > 1 ? [...order].reverse() : order);
  });
}
/** A sampler that never draws: an empty assignment, no step, log probability 0. */
const silentSampler: Selector = {
  name: SAMPLER_NAME,
  kind: "joint-sampler",
  select: support => ({ selector: SAMPLER_NAME, basisRevision: support.basisRevision, supportCount: support.pairs.length, assignment: [], steps: [], logProbability: 0 }),
};
/** A capacity-aware resolver that gives each agent at most one task. */
const oneTaskPerAgent = resolverWith(support => {
  const seen = new Set<string>();
  return matchFrom(support, ranked(support)).filter(pair => {
    if (seen.has(pair.agent)) return false;
    seen.add(pair.agent);
    return true;
  });
});
/** Q8's members: hosts that select less than the reference, each changing one selector. */
const LIVENESS: readonly { readonly id: string; readonly role: "resolver" | "sampler"; readonly host: Host }[] = [
  { id: "empty-resolver", role: "resolver", host: hostWith({ resolver: resolverWith(() => []) }) },
  { id: "one-task-per-agent-resolver", role: "resolver", host: hostWith({ resolver: oneTaskPerAgent }) },
  { id: "silent-sampler", role: "sampler", host: hostWith({ sampler: silentSampler }) },
  { id: "one-draw-sampler", role: "sampler", host: hostWith({ sampler: samplerWith({ eligible: (support, chosen) => (chosen.length > 0 ? [] : eligibleOf(support, chosen)) }) }) },
];
/** Every residual family's member ids. */
const RESIDUAL_MEMBERS: Readonly<Record<string, readonly string[]>> = {
  ...Object.fromEntries(RESIDUALS.map(family => [family.id, family.members.map(member => member.id)])),
  Q4: ["score-blind"],
  Q5: DECLARED.map(member => member.id),
  Q6: INDEPENDENT.map(selector => selector.name),
  Q7: ["late-switch-resolver"],
  Q8: LIVENESS.map(member => member.id),
};

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
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
const mutantLine = (mutant: Mutant): string => `${mutant.id}:${mutant.name}:${mutant.refusedBy.join("+")}`;

// ---- the pins ----

const falsifierSupport = (): Support => supportOf(caseOf("falsifier"));
/** A selector's distinct assignment sets over a support (each sorted, joined), in sorted order. */
const setsOf = (selector: Selector, support: Support): string[] => [...new Set(walkOf(selector, support).paths.map(path => setOf(path.decision.assignment).join(",")))].sort();

const IMPL: Readonly<Record<string, () => unknown>> = {
  A1a: () => {
    const falsifier = caseOf("falsifier");
    const support = supportOf(falsifier);
    const argmax = keysOf(perPairArgmax(support));
    expect(argmax, "the falsifier's per-pair argmax takes a-strong for every task").toEqual([...falsifier.argmax]);
    const loads = Object.fromEntries(support.agents.map(agent => [agent.id, argmax.map(pairOf).filter(pair => pair.agent === agent.id).length]));
    const overloaded = overloadedBy(support, argmax.map(pairOf));
    expect(overloaded, "and exceeds one agent's capacity: a-strong's").toEqual(["a-strong"]);
    const cases = CASES.map(entry => {
      const entrySupport = supportOf(entry);
      return { id: entry.id, argmax: keysOf(perPairArgmax(entrySupport)), overloaded: overloadedBy(entrySupport, perPairArgmax(entrySupport)) };
    });
    expect(cases, "every case's per-pair argmax set and the agents it overloads are the hand-authored ones").toEqual(CASES.map(entry => ({ id: entry.id, argmax: [...entry.argmax], overloaded: [...entry.overloaded] })));
    return { argmax, loads, capacity: Object.fromEntries(support.agents.map(agent => [agent.id, agent.capacity])), overloaded, cases };
  },
  A1b: () => {
    const reading = checkReading("K-FEASIBLE");
    const support = falsifierSupport();
    const resolver = setOf(REFERENCE.resolver.select(copyOf(support), firstChooser).assignment);
    const sampler = setsOf(REFERENCE.sampler, support);
    const argmax = [...caseOf("falsifier").argmax].sort().join(",");
    expect(sampler.includes(argmax) || resolver.join(",") === argmax, "neither selector emits the falsifier's argmax set").toBe(false);
    return { ...reading, falsifier: { resolver, samplerSets: sampler.length, argmaxEmitted: false } };
  },
  A2a: () => {
    const runs = CASES.map(entry => {
      const support = supportOf(entry);
      const first = copyOf(support);
      const second = copyOf(support);
      const identical = isDeepStrictEqual(first, second) && first !== second;
      let draws = 0;
      const counting =
        (chooser: Chooser): Chooser =>
        candidates => {
          draws += 1;
          return chooser(candidates);
        };
      REFERENCE.resolver.select(first, counting(firstChooser));
      REFERENCE.resolver.select(second, counting(lastChooser));
      const untouched = isDeepStrictEqual(first, support) && isDeepStrictEqual(second, support);
      return { id: entry.id, identical, untouched, draws };
    });
    for (const run of runs) expect(run, `${run.id}: two identical, independent inputs, left untouched, and the resolver drew nothing`).toEqual({ id: run.id, identical: true, untouched: true, draws: 0 });
    return { runs };
  },
  A2b: () => {
    const reading = checkReading("K-DETERMINISTIC");
    const sets = Object.fromEntries(CASES.map(entry => [entry.id, setOf(REFERENCE.resolver.select(copyOf(supportOf(entry)), firstChooser).assignment)]));
    expect(sets, "the resolver's assignment set on every case").toEqual(Object.fromEntries(CASES.map(entry => [entry.id, [...entry.resolved].sort()])));
    return { ...reading, sets };
  },
  A3a: () => {
    const reading = checkReading("K-JOINT");
    const totals = Object.fromEntries(
      CASES.map(entry => {
        const walk = walkOf(REFERENCE.sampler, supportOf(entry));
        return [entry.id, { paths: walk.paths.length, total: round12(walk.paths.reduce((sum, path) => sum + Math.exp(path.decision.logProbability), 0)) }];
      }),
    );
    for (const entry of CASES) expect(totals[entry.id], `${entry.id}: the hand-authored path count, the probabilities summing to 1`).toEqual({ paths: entry.paths, total: 1 });
    return { ...reading, totals };
  },
  A3b: () => {
    const reading = checkReading("K-COUNT");
    const counts = Object.fromEntries(
      CASES.map(entry => {
        const support = supportOf(entry);
        const walk = walkOf(REFERENCE.sampler, support);
        const sequences = [...new Set(walk.paths.map(path => path.decision.steps.map(step => step.candidates).join(",")))].sort();
        return [entry.id, { supportCount: walk.paths[0]?.decision.supportCount ?? -1, sequences }];
      }),
    );
    for (const entry of CASES) {
      expect(counts[entry.id], `${entry.id}: the support count and each step's actual candidate count`).toEqual({ supportCount: entry.weights.length, sequences: entry.counts.map(sequence => sequence.join(",")) });
    }
    return { ...reading, counts };
  },
  A4a: () => {
    const shapes = VALIDATION_CASES.map(entry => [entry.id, [...entry.missing]] as const);
    const bases = validationBases();
    const altered = VALIDATION_CASES.map(entry => {
      const record = entry.alter(bases[0]?.decision ?? REFERENCE.resolver.select(falsifierSupport(), firstChooser));
      const selector = record.selector;
      const value = record.logProbability;
      return {
        id: entry.id,
        selectorUsable: typeof selector === "string" && [...selector].some(character => !/[\s\p{Cf}]/u.test(character)),
        probabilityUsable: typeof value === "number" && Number.isFinite(value) && value <= 0,
        keys: Object.keys(record).filter(name => name === "selector" || name === "logProbability"),
      };
    });
    for (const entry of altered) {
      const shape = VALIDATION_CASES.find(candidate => candidate.id === entry.id);
      expect([!entry.selectorUsable, !entry.probabilityUsable], `${entry.id} lacks exactly what it declares`).toEqual([shape?.missing.includes("selector") ?? false, shape?.missing.includes("probability") ?? false]);
    }
    return { shapes, altered };
  },
  A4b: () => {
    const reading = checkReading("K-VALIDATE");
    const support = falsifierSupport();
    const outcomes = Object.fromEntries(validationBases().map(base => [base.label, VALIDATION_CASES.map(entry => [entry.id, REFERENCE.validate(entry.alter(base.decision), support)])]));
    return { ...reading, outcomes };
  },
  A5a: () => {
    const reading = checkReading("K-INDEPENDENT");
    const independent = [...INDEPENDENT, ...RENAMED];
    const admissions = Object.fromEntries(CASES.map(entry => [entry.id, independent.map(selector => REFERENCE.admit(selector, supportOf(entry)))]));
    for (const entry of CASES) {
      expect(admissions[entry.id], `${entry.id}: both independent kinds, under either name, are refused for a multi-task assignment`).toEqual(independent.map(selector => ({ ok: false, code: "not-capacity-feasible", selector: selector.name })));
    }
    return { ...reading, admissions };
  },
  A5b: () => {
    const refusals = Object.fromEntries(
      CASES.filter(entry => entry.overloaded.length > 0).map(entry => {
        const support = supportOf(entry);
        return [entry.id, hostSelect(REFERENCE, perPairArgmaxSelector(RESOLVER_NAME, "deterministic-resolver"), support, firstChooser)];
      }),
    );
    for (const [id, outcome] of Object.entries(refusals)) expect(outcome, `${id}: the per-pair argmax set is not capacity-feasible`).toEqual({ ok: false, code: "not-capacity-feasible", selector: RESOLVER_NAME });
    const mass = Object.fromEntries(
      CASES.map(entry => {
        const support = supportOf(entry);
        const walk = walkOf(PER_PAIR_LOGIT, support);
        const infeasible = walk.paths.filter(path => capacityFindings(support, path.decision.assignment).length > 0).reduce((sum, path) => sum + Math.exp(path.decision.logProbability), 0);
        return [entry.id, round12(infeasible)];
      }),
    );
    for (const entry of CASES) {
      const [numerator, denominator] = INDEPENDENT_MASS[entry.id] ?? [-1, 1];
      expect(close(mass[entry.id] ?? -1, numerator / denominator, 1e-11), `${entry.id}: independent per-pair logit selection puts ${numerator}/${denominator} on capacity-infeasible sets`).toBe(true);
    }
    const spare = supportOf(SPARE);
    const infeasible = INFEASIBLE.map(shape => {
      const assignment = shape.assignment.map(pairOf);
      const decision: Decision = { selector: RESOLVER_NAME, basisRevision: spare.basisRevision, supportCount: spare.pairs.length, assignment, steps: [], logProbability: 0 };
      return { id: shape.id, findings: capacityFindings(spare, assignment), outcome: REFERENCE.validate(decision, spare) };
    });
    for (const shape of infeasible) {
      expect(shape.findings.length, `${shape.id}: the check's own capacity reading finds it infeasible on one clause`).toBe(1);
      expect(shape.outcome, `${shape.id}: the reference refuses it as not capacity-feasible`).toEqual({ ok: false, code: "not-capacity-feasible", selector: RESOLVER_NAME });
    }
    return { refusals, mass, infeasible };
  },
  A6a: () => {
    const carried = Object.fromEntries(
      referenceDecisions().map(({ entry, decisions }) => {
        const resolver = decisions.find(item => item.label === "resolver")?.decision;
        const sampled = decisions.filter(item => item.label !== "resolver").map(item => item.decision);
        const logs = sampled.map(decision => decision.logProbability);
        return [
          entry.id,
          {
            resolver: [resolver?.selector ?? null, resolver?.logProbability ?? null],
            sampler: { names: [...new Set(sampled.map(decision => decision.selector))], min: round12(Math.min(...logs)), max: round12(Math.max(...logs)) },
          },
        ];
      }),
    );
    for (const { entry, decisions } of referenceDecisions()) {
      for (const { label, decision } of decisions) {
        expect(decision.selector.trim() !== "" && Number.isFinite(decision.logProbability) && decision.logProbability <= 0, `${entry.id} ${label} carries a selector name and a probability`).toBe(true);
      }
    }
    return { carried };
  },
  A6b: () => {
    const reading = checkReading("K-RECEIPT");
    const support = falsifierSupport();
    const first = walkOf(REFERENCE.sampler, support).paths[0];
    const receipts = {
      resolver: roundedReceipt(JSON.parse(JSON.stringify(REFERENCE.receipt(REFERENCE.resolver.select(copyOf(support), firstChooser))))),
      sampler: first === undefined ? null : roundedReceipt(JSON.parse(JSON.stringify(REFERENCE.receipt(first.decision)))),
    };
    return { ...reading, receipts };
  },
  N1: () => {
    const reading = checkReading("K-NAMED");
    const support = falsifierSupport();
    const names = { resolver: REFERENCE.resolver.name, sampler: REFERENCE.sampler.name };
    const controls = UNNAMED.map(control => [codePoints(control.name), control.kind, REFERENCE.admit({ name: control.name, kind: control.kind }, support)] as const);
    const flow = {
      resolver: hostSelect(REFERENCE, REFERENCE.resolver, support, firstChooser),
      sampler: hostSelect(REFERENCE, REFERENCE.sampler, support, firstChooser),
      perPairArgmax: hostSelect(REFERENCE, PER_PAIR_ARGMAX, support, firstChooser),
      perPairLogit: hostSelect(REFERENCE, PER_PAIR_LOGIT, support, firstChooser),
      unnamed: hostSelect(REFERENCE, { ...REFERENCE.resolver, name: "" }, support, firstChooser),
    };
    expect(
      Object.fromEntries(Object.entries(flow).map(([id, outcome]) => [id, outcome.ok])),
      "the host selects through its two named selectors and refuses the rest",
    ).toEqual({ resolver: true, sampler: true, perPairArgmax: false, perPairLogit: false, unnamed: false });
    return { ...reading, names, controls, flow: Object.fromEntries(Object.entries(flow).map(([id, outcome]) => [id, roundedReceipt(outcome)])) };
  },
  D1: () => {
    const assignments = Object.fromEntries(CASES.map(entry => [entry.id, keysOf(REFERENCE.resolver.select(copyOf(supportOf(entry)), firstChooser).assignment)]));
    expect(assignments, "the resolver's assignment on every case, in selection order").toEqual(Object.fromEntries(CASES.map(entry => [entry.id, [...entry.resolved]])));
    const capacity = Object.fromEntries(CASES.map(entry => [entry.id, capacityFindings(supportOf(entry), (assignments[entry.id] ?? []).map(pairOf))]));
    expect(capacity, "each a capacity-feasible matching").toEqual(Object.fromEntries(CASES.map(entry => [entry.id, []])));
    return { name: REFERENCE.resolver.name, kind: REFERENCE.resolver.kind, assignments };
  },
  D2: () => {
    const readings = Object.fromEntries(
      CASES.map(entry => {
        const support = supportOf(entry);
        const walk = walkOf(REFERENCE.sampler, support);
        const legal = new Set(keysOf(support.pairs));
        const outside = walk.paths.flatMap(path => keysOf(path.decision.assignment).filter(pair => !legal.has(pair)));
        return [entry.id, { paths: walk.paths.length, sets: setsOf(REFERENCE.sampler, support), outside, fault: walk.fault }];
      }),
    );
    for (const entry of CASES) {
      expect(readings[entry.id], `${entry.id}: the sampler's paths and distinct sets, drawn from the support only`).toEqual({ paths: entry.paths, sets: entry.sets.map(set => set.join(",")), outside: [], fault: null });
    }
    return { name: REFERENCE.sampler.name, kind: REFERENCE.sampler.kind, readings };
  },
  D3: () => {
    const anchors = ANCHORS.map(anchor => {
      const support = supportOf(caseOf(anchor.case));
      const path = walkOf(REFERENCE.sampler, support).paths.find(candidate => isDeepStrictEqual(keysOf(candidate.decision.assignment), [...anchor.path]));
      const probability = path === undefined ? -1 : Math.exp(path.decision.logProbability);
      expect(close(probability, anchor.numerator / anchor.denominator), `${anchor.case} ${anchor.path.join(",") || "(no draw)"} records ${anchor.numerator}/${anchor.denominator}`).toBe(true);
      return { case: anchor.case, path: [...anchor.path], probability: round12(probability) };
    });
    const support = falsifierSupport();
    const resolverPath = ANCHORS[0]?.path.map(pairOf) ?? [];
    const contrast = { joint: round12(Math.log(2 / 11)), independent: round12(independentLog(support, resolverPath)) };
    expect(contrast.joint === contrast.independent, "the joint log probability is not the independent per-pair product").toBe(false);
    return { anchors, contrast };
  },
  C1: () => {
    const reading = checkReading("K-SUPPORT");
    const own = beadRow(BEAD);
    const r2 = beadRow(R2_BEAD);
    const binding = {
      r2Title: r2?.title.startsWith(`[${R2_REQUIREMENT}] Gate as R1. `) ?? false,
      r2Support: r2?.title.includes("legal PRE-SAMPLING support") ?? false,
      parents: { own: own?.parents ?? [], r2: r2?.parents ?? [] },
    };
    expect(binding, "R2 is wb-e66.1, the pre-sampling support, under this bead's own epic").toEqual({ r2Title: true, r2Support: true, parents: { own: [EPIC], r2: [EPIC] } });
    return { ...reading, binding };
  },
  G1: () => {
    const { entries, unread } = liveSrc();
    expect(unread, "every listed src path is a regular file the reading read").toEqual([]);
    const floor = entries.length >= SRC_FLOOR;
    expect(floor, "the src floor").toBe(true);
    const anchor = entries.find(entry => entry.path === SRC_ANCHOR.path)?.text.includes(SRC_ANCHOR.token) ?? false;
    expect(anchor, "the listing read the ObservationProjection view selectors").toBe(true);
    const live = srcFindings(entries, SITES);
    expect(SITES, "no src selector is registered: the gate has not fired").toEqual([]);
    expect(live, "no src module names the vocabulary").toEqual([]);
    return { floor, anchor, unread, live, sites: SITES.map(site => site.path) };
  },
  G2: () => {
    const controls = Object.fromEntries(VOCABULARY_CONTROLS.map(([label, text]) => [label, namedWords(text)]));
    expect(controls, "each control reads exactly its declared words").toEqual(Object.fromEntries(VOCABULARY_CONTROLS.map(([label, , words]) => [label, [...words]])));
    const scratch = makeScratch("wb-e662-listing-");
    let listing: unknown = null;
    try {
      execFileSync("git", ["init", "-q"], { cwd: scratch });
      writeFileSync(join(scratch, ".gitignore"), "*.log\n");
      mkdirSync(join(scratch, "src", "nested"), { recursive: true });
      writeFileSync(join(scratch, "src", "nested", "planted.ts"), "export const logProbability = 0;\n");
      writeFileSync(join(scratch, "src", "ignored.log"), "argmax\n");
      writeFileSync(join(scratch, "src", "quiet.ts"), "export const selector = 1;\n");
      symlinkSync(join("nested", "planted.ts"), join(scratch, "src", "link.ts"));
      const listed = gitList(scratch, "src");
      const read = entriesOf(scratch, listed);
      listing = { listed, findings: srcFindings(read.entries, []), unread: read.unread };
    } finally {
      removeScratch(scratch);
    }
    expect(listing, "untracked files are listed and read, ignored files never, and a listed link is unread, never skipped").toEqual({
      listed: ["src/link.ts", "src/nested/planted.ts", "src/quiet.ts"],
      findings: ["src/nested/planted.ts: names log probability, no SITES registration"],
      unread: ["src/link.ts"],
    });
    return { controls, listing };
  },
  S1: () => {
    const pinned = pinDoc();
    const live = textOf(DOCS_03);
    const doc = anchorIn(DOCS_LINE, DOCS_TEXT, pinned, live);
    expect(doc, "docs/workbench/03:22 at the filing pin is a rendered paragraph of its section, and that section renders it live").toEqual({ line: DOCS_LINE, pin: true, head: true });
    const line = pinned.split("\n")[DOCS_LINE - 1] ?? "";
    const unedited = DOCS_PLANTS.filter(plant => plant.id !== "as-is" && plant.edit(live, line) === live).map(plant => plant.id);
    expect(unedited, "every plant but the page as it is edits the live page").toEqual([]);
    const plants = DOCS_PLANTS.map(plant => [plant.id, anchorIn(DOCS_LINE, DOCS_TEXT, pinned, plant.edit(live, line)).head] as const);
    expect(plants, "each plant of the live page reads its declared paragraph").toEqual(DOCS_PLANTS.map(plant => [plant.id, plant.head]));
    const anchorControls = {
      textAtAnotherLine: anchorIn(DOCS_LINE + 1, DOCS_TEXT, pinned, live).pin,
      textAbsent: anchorIn(DOCS_LINE, "a third Furnace durable scheduler", pinned, live).pin,
      pinnedLineIndented: anchorIn(DOCS_LINE, DOCS_TEXT, pinned.replace(line, `    ${line}`), live).pin,
    };
    expect(anchorControls, "the anchor reads the pinned line, its text and its rendered paragraph, never a constant").toEqual({ textAtAnotherLine: false, textAbsent: false, pinnedLineIndented: false });
    return { doc, plants, anchorControls };
  },
  S2: () => {
    const plant: Entry = { path: "src/workbench/gp-selection.ts", text: "export const scorePairs = (logits: readonly number[]) => logits;\n" };
    const site: Site = { path: plant.path, host: REFERENCE };
    const armed = {
      unregistered: srcFindings([plant], []),
      registered: srcFindings([plant], [site]),
      stale: srcFindings([], [site]),
      twice: srcFindings([plant], [site, site]),
      pathOnly: srcFindings([{ path: "src/workbench/sampler.ts", text: "export const draw = 1;\n" }], []),
      judged: refusing(judge(site.host)),
      bound: refusing(judge(mutantOf("M01").host)),
    };
    expect(armed, "the armed registrations: a registered src selector is judged by every check").toEqual({
      unregistered: ["src/workbench/gp-selection.ts: names logits, logit, no SITES registration"],
      registered: [],
      stale: ["src/workbench/gp-selection.ts: registered, names no vocabulary word (stale)"],
      twice: ["src/workbench/gp-selection.ts: registered twice"],
      pathOnly: ["src/workbench/sampler.ts: names sampler, no SITES registration"],
      judged: [],
      bound: ["K-FEASIBLE"],
    });
    return armed;
  },
  Q1: () => quietText("Q1"),
  Q2: () => quietText("Q2"),
  Q3: () => quietText("Q3"),
  Q4: () => {
    const host = hostWith({ resolver: SCORE_BLIND });
    const refused = refusing(judge(host));
    expect(refused, "R-SCORE-BLIND: a score-blind deterministic resolver meets every check").toEqual([]);
    const loads = supportOf(caseOf("loads"));
    const differs = !sameSet(SCORE_BLIND.select(copyOf(loads), firstChooser).assignment, REFERENCE.resolver.select(copyOf(loads), firstChooser).assignment);
    expect(differs, "while its assignment differs from the reference's").toBe(true);
    return { members: RESIDUAL_MEMBERS.Q4, refused, differs };
  },
  Q5: () => {
    const support = supportOf(DISJOINT);
    const outcomes = DECLARED.map(member => [member.id, hostSelect(REFERENCE, member.selector, support, member.chooser).ok] as const);
    expect(outcomes, "R-DECLARED-KIND: an independent selector declared under an admitted kind, its decision feasible, is admitted").toEqual(DECLARED.map(member => [member.id, true]));
    return { members: RESIDUAL_MEMBERS.Q5, outcomes };
  },
  Q6: () => {
    const support = supportOf(ONE_TASK);
    const outcomes = INDEPENDENT.map(selector => [selector.name, REFERENCE.admit(selector, support).ok, hostSelect(REFERENCE, selector, support, firstChooser).ok] as const);
    expect(outcomes, "R-SINGLE-TASK: independent selection for a single-task assignment is admitted").toEqual(INDEPENDENT.map(selector => [selector.name, true, true]));
    return { members: RESIDUAL_MEMBERS.Q6, outcomes };
  },
  Q7: () => {
    const resolver = lateSwitch();
    const support = falsifierSupport();
    const first = setOf(resolver.select(copyOf(support), firstChooser).assignment);
    const later = setOf(resolver.select(copyOf(support), firstChooser).assignment);
    expect(isDeepStrictEqual(first, later), "its first call and its later calls assign different sets on identical input").toBe(false);
    const refused = refusing(judge(hostWith({ resolver })));
    expect(refused, "R-STATEFUL: a resolver whose state changed before the judge meets every check").toEqual([]);
    return { members: RESIDUAL_MEMBERS.Q7, first, later, refused };
  },
  Q8: () => {
    const support = falsifierSupport();
    const largest = (selector: Selector): number => Math.max(...walkOf(selector, support).paths.map(path => path.decision.assignment.length));
    const reference = { resolver: largest(REFERENCE.resolver), sampler: largest(REFERENCE.sampler) };
    const members = LIVENESS.map(member => {
      const selector = member.role === "resolver" ? member.host.resolver : member.host.sampler;
      return { id: member.id, refused: refusing(judge(member.host)), largest: largest(selector), less: largest(selector) < reference[member.role] };
    });
    expect(members.map(member => [member.id, member.refused, member.less]), "R-LIVENESS: each host that selects less than the reference meets every check").toEqual(LIVENESS.map(member => [member.id, [], true]));
    return { members: RESIDUAL_MEMBERS.Q8, reference, readings: members };
  },
};
/** A text residual's quiet row: every member reads no word, alone and planted as a src module. */
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
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A1:2", "A2:2", "A3:2", "A4:2", "A5:2", "A6:2", "N:1", "D:3", "C:1", "G:2", "S:2", "Q:8"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(CASES.map(entry => `${entry.id}:${entry.capacities.map(([id, capacity]) => `${id}=${capacity}`).join(",")}:${entry.loads.map(([id, load]) => `${id}=${load}`).join(",")}`)).toEqual([
      "falsifier:a-strong=2,a-weak=2:t1=1,t2=1,t3=1",
      "loads:a-big=3,a-small=2:t-heavy=2,t-light=1,t-mid=2",
      "ties:a-one=1,a-two=1:t-a=1,t-b=1",
      "partial:a-granted=1,a-ungranted=5:t-p=1,t-q=1",
      "empty:a-none=0:t-x=1,t-y=1",
    ]);
    expect(CASES.map(entry => `${entry.id}:${entry.weights.map(([pair, weight]) => `${pair}=${weight}`).join(",")}`)).toEqual([
      "falsifier:a-strong/t1=8,a-strong/t2=6,a-strong/t3=4,a-weak/t1=2,a-weak/t2=1,a-weak/t3=1",
      "loads:a-big/t-heavy=8,a-big/t-light=1,a-big/t-mid=6,a-small/t-heavy=2,a-small/t-light=4",
      "ties:a-one/t-a=1,a-one/t-b=1,a-two/t-a=1,a-two/t-b=1",
      "partial:a-granted/t-p=2,a-granted/t-q=1",
      "empty:",
    ]);
    expect(CASES.map(entry => `${entry.id}:${entry.argmax.length}:${entry.overloaded.length}:${entry.resolved.length}:${entry.paths}:${entry.sets.length}:${entry.counts.length}`)).toEqual([
      "falsifier:3:1:3:36:6:2",
      "loads:3:1:2:12:4:4",
      "ties:2:1:2:4:2:1",
      "partial:2:1:1:2:2:1",
      "empty:0:0:0:1:1:1",
    ]);
    expect(ANCHORS.map(anchor => `${anchor.case}:${anchor.path.length}:${anchor.numerator}/${anchor.denominator}`)).toEqual(["falsifier:3:2/11", "falsifier:3:1/165", "loads:2:32/105", "loads:3:1/168", "ties:2:1/4", "partial:1:1/3", "empty:0:1/1"]);
    expect(Object.entries(INDEPENDENT_MASS).map(([id, [numerator, denominator]]) => `${id}:${numerator}/${denominator}`)).toEqual(["falsifier:97/175", "loads:24/25", "ties:1/2", "partial:1/1", "empty:0/1"]);
    expect(VALIDATION_CASES.map(entry => `${entry.id}:${entry.missing.join("+")}`)).toEqual([
      "selector-absent:selector",
      "selector-empty:selector",
      "selector-blank:selector",
      "selector-number:selector",
      "selector-format-only:selector",
      "probability-absent:probability",
      "probability-nan:probability",
      "probability-infinite:probability",
      "probability-above-one:probability",
      "probability-text:probability",
      "both-absent:selector+probability",
    ]);
    const shown = (name: string): string => ([...name].every(character => character >= " " && character <= "~") ? JSON.stringify(name) : codePoints(name));
    expect(UNNAMED.map(control => `${shown(control.name)}:${control.kind}:${control.code}`)).toEqual([
      '"":deterministic-resolver:unnamed-selector',
      '"   ":joint-sampler:unnamed-selector',
      "U+200B:deterministic-resolver:unnamed-selector",
      "U+200B U+0020 U+200B:joint-sampler:unnamed-selector",
      '"mystery-selector":unknown-kind:unknown-selector',
      '"greedy":random-kind:unknown-selector',
    ]);
    expect([REFERENCE.resolver, REFERENCE.sampler, ...INDEPENDENT, ...RENAMED].map(selector => `${selector.name}:${selector.kind}`)).toEqual([
      "capacity-matching-resolver:deterministic-resolver",
      "joint-autoregressive-sampler:joint-sampler",
      "per-pair-argmax:per-pair-argmax",
      "per-pair-logit:per-pair-logit",
      "fast-argmax:per-pair-argmax",
      "fast-logit:per-pair-logit",
    ]);
    expect(`${SPARE.id}:${SPARE.capacities.map(([id, capacity]) => `${id}=${capacity}`).join(",")}:${SPARE.loads.map(([id, load]) => `${id}=${load}`).join(",")}:${SPARE.weights.length}`).toBe("spare:a-one=1,a-two=1:t-one=1,t-two=1,t-zero=0:0");
    expect(INFEASIBLE.map(shape => `${shape.id}:${shape.assignment.join("+")}`)).toEqual([
      "task-twice:a-one/t-zero+a-two/t-zero",
      "agent-over-capacity:a-one/t-one+a-one/t-two",
      "no-support-agent:a-ghost/t-zero",
      "no-support-task:a-one/t-ghost",
    ]);
    expect(DOCS_PLANTS.map(plant => `${plant.id}:${plant.head}`)).toEqual([
      "as-is:true",
      "line-deleted:false",
      "line-edited:false",
      "comment-wrapped:false",
      "moved-to-a-trailing-section:false",
      "fenced:false",
      "indented-into-the-diagram:false",
      "inline-comment:false",
      "heading-duplicated:false",
      "rehomed-under-another-title:false",
      "emphasis-respelled:true",
      "comment-in-another-section:true",
      "rewrapped:true",
    ]);
    expect([DOCS_TITLE.length, codePoints(DOCS_TITLE.slice(3, 4)), DOCS_HEADING]).toEqual([59, "U+2014", "Reference architecture"]);
    expect([...ADMITTED_KINDS, ...INDEPENDENT_KINDS]).toEqual(["deterministic-resolver", "joint-sampler", "per-pair-argmax", "per-pair-logit"]);
    expect(CHECKS).toEqual(["K-NAMED", "K-FEASIBLE", "K-DETERMINISTIC", "K-JOINT", "K-COUNT", "K-VALIDATE", "K-INDEPENDENT", "K-RECEIPT", "K-SUPPORT"]);
    expect(MUTANTS.map(mutantLine)).toEqual([
      "M01:per-pair-argmax-resolver:K-FEASIBLE",
      "M02:capacity-blind-resolver:K-FEASIBLE",
      "M03:task-twice-resolver:K-FEASIBLE",
      "M04:load-blind-resolver:K-FEASIBLE",
      "M05:grid-fill-resolver:K-SUPPORT",
      "M06:revision-dropped-resolver:K-SUPPORT",
      "M07:chooser-consulted-resolver:K-DETERMINISTIC",
      "M08:call-counter-resolver:K-DETERMINISTIC",
      "M09:resolver-probability-sampled:K-DETERMINISTIC",
      "M10:capacity-blind-sampler:K-FEASIBLE+K-COUNT",
      "M11:first-candidate-sampler:K-JOINT+K-COUNT",
      "M12:last-step-probability:K-JOINT",
      "M13:independent-probability:K-JOINT",
      "M14:grid-normalized-sampler:K-JOINT+K-COUNT",
      "M15:support-count-of-the-grid:K-COUNT",
      "M16:step-count-dropped:K-COUNT",
      "M17:stale-revision-sampler:K-SUPPORT",
      "M18:name-unchecked:K-VALIDATE",
      "M19:probability-unchecked:K-VALIDATE",
      "M20:untyped-validation-refusal:K-VALIDATE",
      "M21:probability-above-one:K-VALIDATE",
      "M22:independent-admitted:K-INDEPENDENT",
      "M23:independent-untyped:K-INDEPENDENT",
      "M24:capacity-unvalidated:K-INDEPENDENT",
      "M25:unnamed-admitted:K-NAMED",
      "M26:unknown-kind-admitted:K-NAMED",
      "M27:decision-misnamed:K-NAMED",
      "M28:receipt-without-selector:K-RECEIPT",
      "M29:receipt-probability-one:K-RECEIPT",
      "M30:receipt-probability-rounded:K-RECEIPT",
      "M31:empty-assignment-refused:K-VALIDATE",
      "M32:sampler-kind-refused:K-NAMED",
      "M33:resolver-records-draws:K-DETERMINISTIC",
      "M34:step-probability-dropped:K-JOINT",
      "M35:steps-truncated:K-JOINT",
      "M36:one-name-for-both:K-NAMED",
      "M37:unbounded-sampler:K-NAMED+K-FEASIBLE+K-JOINT+K-COUNT+K-SUPPORT",
      "M38:ghost-agent-resolver:K-FEASIBLE+K-SUPPORT",
      "M39:independent-refused-by-name:K-INDEPENDENT",
      "M40:palindrome-chooser-resolver:K-DETERMINISTIC",
      "M41:ignored-draw-resolver:K-DETERMINISTIC",
      "M42:task-twice-validated:K-INDEPENDENT",
      "M43:support-names-unvalidated:K-INDEPENDENT",
      "M44:format-name-admitted:K-NAMED",
      "M45:format-selector-validated:K-VALIDATE",
      "M46:single-unknown-kind:K-NAMED",
    ]);
    expect(Object.entries(RESIDUAL_MEMBERS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:8", "Q2:4", "Q3:2", "Q4:1", "Q5:2", "Q6:2", "Q7:1", "Q8:4"]);
    expect(LIVENESS.map(member => `${member.id}:${member.role}`)).toEqual(["empty-resolver:resolver", "one-task-per-agent-resolver:resolver", "silent-sampler:sampler", "one-draw-sampler:sampler"]);
    expect(VOCABULARY_CONTROLS.map(([label, , words]) => `${label}:${words.length}`)).toEqual([
      "argmax:1",
      "argmax camel:1",
      "logits:2",
      "logit alone:1",
      "logit upper:1",
      "optimizer:1",
      "optimizer camel:1",
      "optimizer british:1",
      "optimizer british plural:1",
      "log probability spaced:1",
      "log probability camel:1",
      "log probability snake:1",
      "log probability upper kebab:1",
      "log probability dotted:1",
      "log probability joined:1",
      "log probability format characters:1",
      "log probability plural camel:1",
      "log probability plural spaced:1",
      "log probability plural kebab:1",
      "log probability comment wrap:1",
      "log probability slash:1",
      "log probability parenthesised:1",
      "log probability dash punctuation:1",
      "log probability middle dot:1",
      "log probability symbol:1",
      "log probability quoted list:1",
      "sampler:1",
      "sampler inside a longer name:1",
      "autoregressive:1",
      "autoregressive camel:1",
      "autoregressive soft hyphen inside:1",
      "argmax format character inside:1",
      "every word:7",
      "shared words:0",
    ]);
    expect(RESIDUALS.map(family => `${family.id}:${family.name}`)).toEqual(["Q1:R-COMPOSED", "Q2:R-SHARED-WORD", "Q3:R-UNNAMED-SELECTOR"]);
    expect([DISJOINT, ONE_TASK].map(fixture => `${fixture.id}:${fixture.capacities.length}:${fixture.loads.length}:${fixture.weights.map(([pair, weight]) => `${pair}=${weight}`).join(",")}`)).toEqual([
      "disjoint:2:2:a-left/t-left=4,a-left/t-right=1,a-right/t-left=1,a-right/t-right=4",
      "one-task:2:1:a-first/t-only=3,a-second/t-only=1",
    ]);
    expect(VOCABULARY.map(word => `${word.id}:${word.spelling}`)).toEqual(["V1:argmax", "V2:logits", "V3:optimizer", "V4:log probability", "V5:sampler", "V6:autoregressive", "V7:logit"]);
    expect(SHARED_WORDS).toEqual(["selector", "matching", "resolver", "assignment"]);
    expect(SITES).toEqual([]);
  });

  it("mutant battery: the reference meets every check, each mutant is refused by exactly its declared checks, and every check refuses a mutant alone", () => {
    for (const entry of JUDGED) expect(refusing(judge(entry.host)), `${entry.name} meets every check`).toEqual([]);
    expect(
      MUTANTS.map(mutant => [mutant.id, refusing(judge(mutant.host))]),
      "each mutant is refused by exactly its declared checks",
    ).toEqual(MUTANTS.map(mutant => [mutant.id, [...mutant.refusedBy]]));
    for (const check of CHECKS) {
      const alone = MUTANTS.filter(mutant => mutant.refusedBy.length === 1 && mutant.refusedBy[0] === check).map(mutant => mutant.id);
      expect(alone.length, `${check} refuses a mutant alone`).toBeGreaterThan(0);
    }
  });

  it("the outside anchors: the bead's own row binds the labels of rows A1-S and what their pin quotes tile (never row Q or a row's pin partition), the docs citation, the vocabulary and the shared words (Q2's members among them) and the producer block", { timeout: LIVE_BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    const label = (id: string): string => ROWS.find(entry => entry.id === id)?.label ?? "-";
    expect(title, "the title is the requirement id and the gate, rows N and D between its two dashes, then rows A5 and A6").toBe(
      `[${REQUIREMENT}] Gate as R1. ${label("N")} ${DASH} ${label("D")} ${DASH} and ${label("A5")}; ${label("A6")}.`,
    );
    expect(acceptanceLine(notes), "the acceptance line is rows A1-A4, then rows G and C").toBe(`${label("A1")}; ${label("A2")}; ${label("A3")}, and ${label("A4")}. ${label("G")}; ${label("C")}.`);
    expect(notes.includes(`) and ${label("S")}. Acceptance shape: `), "row S is the filing's posture sentence").toBe(true);
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    const docs = /(docs\/workbench\/[^:\s]+\.md):(\d+)@([0-9a-f]{12}) keeps Pi /.exec(notes);
    expect([docs?.[1], Number(docs?.[2])], "the docs line is the posture sentence's citation").toEqual([DOCS_03, DOCS_LINE]);
    expect(FILING_PIN.startsWith(docs?.[3] ?? "-"), "the filing pin is the citation's").toBe(true);
    const search = /\(bd search '([^']+)' hits only [^;]+; ((?:'[^']+', )*'[^']+') are 0 open and closed\)/.exec(notes);
    const searched = [search?.[1] ?? "-", ...(search?.[2] ?? "").split(", ").map(word => word.replace(/^'|'$/g, ""))];
    expect(searched, "the filing's search words: the first two shared words, then V1-V4, in order").toEqual([...SHARED_WORDS.slice(0, 2), ...VOCABULARY.slice(0, 4).map(word => word.spelling)]);
    expect(notes.includes(`Pi has no ${SHARED_WORDS[0]}, ${VOCABULARY[4]?.spelling ?? "-"} or ${SHARED_WORDS[1]} code today`), "V5 is the filing's").toBe(true);
    expect(title.includes(`joint/${VOCABULARY[5]?.spelling ?? "-"} sampler`), "V6 is the statement's").toBe(true);
    expect(title.includes(`${VOCABULARY[0]?.spelling ?? "-"}/${VOCABULARY[6]?.spelling ?? "-"} selection`), "V7 is the statement's").toBe(true);
    expect([title.includes(`matching ${SHARED_WORDS[2]}`), title.includes(`multi-task ${SHARED_WORDS[3]}`)], "the last two shared words are the statement's").toEqual([true, true]);
    expect(RESIDUAL_MEMBERS.Q2, "Q2's residual members are the shared words").toEqual(SHARED_WORDS);
    for (const word of VOCABULARY) expect(namedWords(`${title} ${notes}`), `the filing names ${word.spelling}`).toContain(word.spelling);
    const source = /Source: (docs\/programs\/[^:]+)\.md:(\d+) \('(.+?)'\) @([0-9a-f]{12}); README\.md:(\d+) \((.+?)\), :(\d+) \('(.+?)'\) and :(\d+) acceptance term '(.+?)' @([0-9a-f]{12})\./.exec(notes);
    expect(source, "the source citations parse").not.toBeNull();
    const cited = [
      { path: `${source?.[1] ?? "-"}.md`, line: Number(source?.[2]) },
      { path: `${source?.[1] ?? "-"}/README.md`, line: Number(source?.[5]) },
      { path: `${source?.[1] ?? "-"}/README.md`, line: Number(source?.[7]) },
      { path: `${source?.[1] ?? "-"}/README.md`, line: Number(source?.[9]) },
    ];
    expect(ROSTER.producer.lines.map(entry => ({ path: entry.path, line: entry.line })), "the producer lines are the source citations'").toEqual(cited);
    expect([source?.[4], source?.[11]].every(pin => PRODUCER_PIN.startsWith(pin ?? "-")), "the producer pin is the citations'").toBe(true);
    expect(ROSTER.producer.sha, "the producer block's pin").toBe(PRODUCER_PIN);
    const quotes = [source?.[3] ?? "-", source?.[6] ?? "-", ...(source?.[8] ?? "-").split(" ... "), source?.[10] ?? "-"];
    expect(quotes.length, "the citations quote or paraphrase the producer five times").toBe(5);
    const lineOf = [0, 1, 2, 2, 3];
    for (const [index, quote] of quotes.entries()) expect(ROSTER.producer.lines[lineOf[index] ?? -1]?.text ?? "", `the cited line carries '${quote}'`).toContain(quote);
  });

  it("roster: the judged rows, the quotes, the residual members, the mutants and the registered tests equal test/fixtures/mw-gp-selector-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
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
