/**
 * wb-km7q.1 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R4, program-triage-2026-10-18 child of wb-km7q), the
 * adoption-time leg of a gating carrier. Statement (the bead title): "If Pi ever hosts FiberOptics temporal-controller arbitration
 * (gated FO-AC3), a controller proposal (seven typed fields, controller_id..min_interval) stays inert data until Pi's host arbiter
 * applies it; Pi never mutates controller state inside FiberRuntime.emit reentrant callbacks; ControlDirective stays a narrow
 * initial seam, never a second controller engine."
 * Acceptance (owner filing, verbatim; the labels of rows A to D joined by one space are this clause word for word, read from the
 * tracked bead export): "adoption-time falsifier that a proposal row is applied only via the host arbiter seam and a mutation
 * attempted inside a FiberRuntime.emit reentrant callback is refused, with ControlDirective never grown into a second controller
 * engine".
 * CLAIMED: that clause, armed. Pi hosts no FiberOptics controller seam today (A1 reads no Pi module spelling it), so the falsifier
 * (falsify, rows B to D) judges no Pi host yet; it is proven on synthetic hosts, one per failure it names, and A2 binds it to the
 * first Pi host: a Pi module that spells the seam must be bound in ARBITER_HOSTS with a HostBinding, every binding must name such a
 * module, and every bound host must meet the falsifier with no violation. The title's three duties are the falsifier's rows B, C
 * and D; none is judged on a real Pi host until one exists.
 * CUT #2 (the respin of refusal #1 - gate run g10-gate-s126, BIND gate-prep-27, outbox O:1235 - on cut #1 c3599623, trunk 5c14136
 *   merged into the branch): U1 and F3 cured in OUTSIDE ANCHORS - every seam name the title and the filing spell is read from the
 *   export by its position and by its code shape, never by its own spelling, and must read as exactly one term, so each of the
 *   nine reds the judged set through the export when it is removed from every literal that spells it; the terms no outside text
 *   reads are named SELF-ANCHORED (R-SYNONYM, restated). U2 cured in C2 - a host fails each part of the typed refusal alone (no
 *   code, an empty code thrown or returned, a numeric code, a thrown null, a thrown string, an apply that carries a code). F1 an
 *   acronym-run plant (A1). F2 a non-finite number, a non-finite number inside an array and a Map among the malformed rows (B1).
 *   Two reading limits are named with quiet plants (R-RUN-ON; the escapes of R-COMPOSED).
 * FOLLOW-UP wb-m4eo (the R694 follow-up of this census's landing 669, PASS-WITH-FINDING at gate cmd_46eaa7716472; F1 leads, F2 to
 *   F5 ride; trunk ee48709 merged): F1 the tiling's refusals are live on term-agnostic probes (an uncovered tail, an interior
 *   word, a quote out of order, a quote the body lacks). F2 each part of B2's arbiter check is held by its own host (claims-apply:
 *   an applied answer naming the row while the state stays; silent-apply: a moved state its answer names no controller for;
 *   refused-apply: a refused answer over a moved state). F3 a host applying malformed rows one macrotask after submit fails
 *   (lax-timer), and R-LATE-APPLY's later-timer limit is pinned for malformed rows too (lax-late-timer). F4 an accessor inside a
 *   nested object and an undefined value join the malformed rows. F5 A1's control tree adds a symlinked root and a symlinked
 *   module at the root.
 *
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat on 2026-10-28 with git show and
 * git rev-parse in the local FiberOpticsSDK checkout; this census is hermetic and never re-reads it): the charter
 * docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (929c1651) at the bead pin dcc5b57c4aed
 * and at that checkout's origin/master 2099f193cccf, and the roster vendors four of its lines with their sha256 (UTF-8, no line
 * end): :7 the shipped ControlDirective.abort_speculative_key, :20 the proposal's seven fields and "remains data until a host
 * arbiter applies it", :22 the emit-reentrancy ban and "a narrow initial extension seam, not a second controller engine", :40 the
 * FO-AC3 gate. At the same pin the producer already ships the record (src/fiber_optics/control.py:430 ControllerProposal, the
 * seven charter fields with min_interval spelled min_interval_ns, plus sample_time_ns, :441-:448) and the directive
 * (src/fiber_optics/events.py:143 ControlDirective, one field abort_speculative_key, :151); the roster vendors those lines too. At
 * origin/master both files moved (control.py f8ed92ac, events.py 5afb4ee3) while the record's eight field lines (now :513) and the
 * directive's one field read the same (recorded in `producer.masterFacts`, not re-read). The FO-AC3 gate itself is the producer's
 * and is not judged here.
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the runs of
 *   a-z and 0-9 (FiberRuntime reads fiber runtime; fiber_optics and fiber-optics read fiber optics; FO-AC3 reads fo ac3).
 * - TERMS (the seam's names as the producer and the bead spell them, word sequences matched over a module's whole word stream, so
 *   a term wrapped over two lines is one finding at its first word's line): the package (fiber optics, fiberoptics), the runtime
 *   (fiber runtime), the directive (control directive, abort speculative key), the record and its answer (controller proposal,
 *   proposal disposition), the host side (host arbiter, controller registry, committed controller), five of the seven fields
 *   (controller id, observed versions, state epoch, actuator id, requested range), the gate (fo ac3) and the program's words
 *   (temporal controller, proposal arbitration). The other two fields, reason and min interval, are Pi's own words (qa's redraw
 *   benches spell minIntervalMs) and are no term (R-COMMON-WORD).
 * - READ SET (row A, "adoption-time"): every git-listed module (tracked or untracked, never ignored) of a code kind (.cjs .cts .js
 *   .jsx .mjs .mts .py .sh .ts .tsx) below src/, qa/ and examples/ and at the repository root, and the root package.json (its
 *   dependency names and scripts). A finding is `<path>:<line> <term>`. The files read are exactly the files Node's own recursive
 *   listing names below the roots and at the root, less what git ignores (whole). The walk follows no symlink and reports each -
 *   a linked module below a root, a linked root and a linked module at the root; a symlinked module git lists is read through
 *   its link but makes the scan not whole, git lists nothing below a linked root, and the live pass requires no link (A1's
 *   control tree shows each).
 * - FALSIFIER (rows B to D; falsify, over a HostBinding: make() builds the host, admissible() the row it should apply): submit the
 *   row and wait one macrotask - the controller state must not move and the row must not change (B2: applied-at-submit,
 *   row-mutated); run one emit whose callback, while emit has not returned, attempts the one mutation path (arbitrate) - the
 *   callback must run inside emit (C1: emit-skipped-callback, callback-not-reentrant), the attempt must end in a typed refusal (a
 *   returned attempt of kind refused, or a thrown value - either one an object carrying a non-empty string code) and the state
 *   must not move across emit (C2: reentrant-attempt-not-refused, state-mutated-in-emit); arbitrate outside emit must apply the
 *   row - an attempt of kind applied that names the row's controller, with the state moved (B2: arbiter-applied-nothing); a
 *   fresh host given each malformed row (one of the seven fields missing, an extra key, a field that is not data - a function, a
 *   non-finite number, a non-finite number inside an array, a value of another prototype, an accessor inside a nested object,
 *   an undefined value) must not have moved its state one macrotask after its arbitration (B1: malformed-applied:<variant>);
 *   and every member of the host's ControlDirective must be the producer's one field (D1: directive-grown:<member>), a grown
 *   member naming a proposal field or a seam verb reading as a second engine (D2: directive-engine:<member>).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "adoption-time falsifier": A1 the trigger - one scan of Pi's read set finds no term, with floors per root, the whole check and
 *    no symlink, and the same scan over a scratch git repository finds exactly its plants (every term planted at least once, in
 *    code, an import, a string, a template, a line and a block comment, Python, shell, package.json, a nested path, a fullwidth
 *    spelling, an acronym run, three long plants whose term sits last, first or in the middle of filler runs longer than the
 *    longest read module in lines and in UTF-8 bytes, and a long-line plant whose term sits mid-line between runs longer than the
 *    longest read line in bytes) and reads quiet every quiet plant, and over a control tree holding a symlinked module below a
 *    root, a symlinked root and a symlinked module at the root it reads each linked module git lists through its link, reports
 *    every link and calls itself not whole; A2 the binding - the modules the scan finds and
 *    ARBITER_HOSTS name the same set (empty today, both ways) and every bound host meets the falsifier; the same report over
 *    synthetic findings and bindings names the unbound module, the stale binding and the failing host.
 *  B "that a proposal row is applied only via the host arbiter seam": B1 the row - the seven fields (held to the filing and the
 *    charter), the producer's shipped spellings admitted, each malformed variant's shape (a field missing, an extra key, a
 *    function, a non-finite number, one inside an array, a Map, an accessor inside a nested object, an undefined value), and a
 *    host that applies malformed rows, at its arbitration or one macrotask after submit, fails; B2 the seam - hosts that apply at
 *    submit, on a timer, inside emit, or not at all, or that change the row, fail, and so does each host whose answer and state
 *    disagree: an applied answer naming the row while the state stays, a moved state its answer names no controller for, and a
 *    refused answer over a moved state.
 *  C "and a mutation attempted inside a FiberRuntime.emit reentrant callback is refused,": C1 the attempt - the honest host runs the
 *    falsifier's callback inside emit and the attempt reaches it; hosts that never run the callback or run it after emit returns
 *    fail; C2 the refusal - a host that applies inside emit, or ends the attempt untyped, fails: a throw with no code, an empty
 *    code thrown or returned, a numeric code, a thrown null, a thrown string, an apply that carries a code.
 *  D "with ControlDirective never grown into a second controller engine": D1 the directive's members - the producer's one field in
 *    either spelling passes, a grown member fails; D2 a member naming a proposal field or a seam verb reads as a second engine.
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-km7q.1 in the tracked bead export (.beads/issues.jsonl; the
 *   first notes line opening with its citation, so appended notes never move it): its acceptance clause is the four labels joined,
 *   each label tiled by its pins; its carrier list is the seven fields, five of them reading as terms and reason and min_interval
 *   as none; its citations are the vendored charter lines at the bead pin; and the title's "seven typed fields, controller_id..
 *   min_interval" counts and bounds the fields. Every seam name the title, the filing's artifact clause and the acceptance clause
 *   spell is read from those texts BY ITS POSITION - TITLE_PLACES, FILING_PLACES and CLAUSE_PLACES capture it from the words
 *   around it, and no reader spells a term - and every code-shaped spelling of the title (less its requirement tag) and of the
 *   filing (a camelCase hump, an underscore name, an upper-case code with a digit) is read BY ITS SHAPE (CODE_SHAPE). Each place
 *   and each shape must read as exactly one term - one finding whose words are the whole read - and a shape that is a common
 *   field as none (unanchored; its refusals are live on term-agnostic probes). ANCHORED are the terms the places, the shapes and
 *   the carrier read: fiber-optics, temporal-controller, fo-ac3, controller-proposal, controller-id, host-arbiter, fiber-runtime,
 *   control-directive, proposal-arbitration, observed-versions, state-epoch, actuator-id and requested-range (13); ANCHORS pins
 *   what the readers read today. So a row, a pin, one of the seven fields or an ANCHORED term removed from every literal of this
 *   file and of the roster that spells it still reds the judged set through the export: the reader still finds the export's
 *   spelling, which then reads as no term. The other five terms are SELF-ANCHORED (R-SYNONYM): so removed, they stay green.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, terms, constants, the outside reads
 *   (ANCHORS), fields, the producer facts, the residuals and every pin's witness are held to the out-of-file roster (test/fixtures/
 *   fo-controller-arbitration-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row in the pin it names): R-OUTSIDE-ROOTS (A1) a host under test/, docs/, vendor/ or any
 *   other directory, an ignored file, or a file of another kind (a .toml, a .json other than the root package.json) is not read;
 *   R-COMMON-WORD (A1) reason, min interval, controller, proposal, arbiter, directive, FO and AC3 alone and Pi's own observer control
 *   hooks are no term; R-COMPOSED (A1) a name assembled at run time from parts, or spelled through an escape, that reads as no
 *   term ("fib" + "erOptics", a backslash-u escape of its F); R-LOOKALIKE (A1) a look-alike letter inside a word (NFKC folds the
 *   fullwidth forms, which are read); R-RUN-ON (A1) a term's words run together with no case change or separator (hostarbiter,
 *   FIBERRUNTIME) read as one word, no term (fiberoptics, the producer's one-word spelling, is itself a term); R-RENDERER-HOST
 *   (A1) arbitration hosted inside rf, Pi's renderer, reached by a spawn that names no term; R-SUBPROCESS (A1) a host reached
 *   through a spawned program whose argv names no term; R-SYNONYM (A1) SELF-ANCHORED: a term no outside text reads - TERMS less
 *   the ANCHORED terms, today abort-speculative-key, committed-controller, controller-registry, fiberoptics and
 *   proposal-disposition - is held by this file and the roster alone, so removed from every literal of both it stays green; A1
 *   lists them, read from the export; R-ADAPTER-TRUST (A2) the falsifier reads a host only through its
 *   binding's adapter, so an adapter that hides the state it moved passes; R-LATE-APPLY (B2) an apply on a timer later than one
 *   macrotask is not seen - of the admissible row after its submit, or of a malformed row after its arbitration; R-ANY-CODE (C2)
 *   a refusal is read by its non-empty code alone, whatever the code names; R-DIRECTIVE-PAYLOAD (D1) the directive is read by its
 *   member names, so a controller payload carried inside the shipped member's value passes.
 * NOT CLAIMED: that the producer's own arbiter, registry or commit boundary meet the falsifier (the producer's tests own them); the
 *   FO-AC3 gate's state; a Pi doc's description of the seam (docs are not hosts and are not read); an edit of this file and the
 *   roster together beyond the outside anchors - among them a reader edited to skip a place or a shape together with ANCHORS and
 *   the roster (no reader spells a term, so a term's coordinated hollow leaves every reader standing); a scan or falsifier edited
 *   to tell the scratch plants or the synthetic hosts from Pi's own (the plants prove only the partial reads the plant list
 *   names).
 *
 * Display paths added: none. Test-only: the plant repository lives in makeScratch scratch with the leak guard installed; Pi's
 * modules, package.json and the bead export are only read; nothing is spawned but git.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Term {
  readonly id: string;
  readonly words: readonly string[];
}
interface Constants {
  readonly codeRoots: readonly string[];
  readonly codeKinds: readonly string[];
  readonly rootFiles: readonly string[];
  readonly floors: { readonly [root: string]: number };
  readonly filing: string;
  readonly commonFields: readonly string[];
  readonly seamVerbs: readonly string[];
}
/** What the outside readers read from the export: the places by position, the code-shaped spellings by shape. */
interface Anchors {
  readonly places: readonly string[];
  readonly shapes: readonly string[];
}
interface ProducerLine {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface ProducerFile {
  readonly path: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
}
interface Producer {
  readonly repository: string;
  readonly beadPin: string;
  readonly measuredAt: string;
  readonly master: string;
  readonly files: readonly ProducerFile[];
  readonly masterFacts: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly constants: Constants;
  readonly terms: readonly Term[];
  readonly anchors: Anchors;
  readonly proposalFields: readonly string[];
  readonly shippedFields: readonly string[];
  readonly directiveMembers: readonly string[];
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/fo-controller-arbitration-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.1";
const CHARTER = "docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  codeRoots: ["examples", "qa", "src"],
  codeKinds: [".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".py", ".sh", ".ts", ".tsx"],
  rootFiles: ["package.json"],
  floors: { examples: 5, qa: 50, root: 10, src: 100 },
  filing: `Citations: ${CHARTER}:20@`,
  commonFields: ["reason", "min_interval"],
  seamVerbs: ["apply", "arbitrate", "commit", "propose", "step"],
};
const TERMS: readonly Term[] = [
  { id: "abort-speculative-key", words: ["abort", "speculative", "key"] },
  { id: "actuator-id", words: ["actuator", "id"] },
  { id: "committed-controller", words: ["committed", "controller"] },
  { id: "control-directive", words: ["control", "directive"] },
  { id: "controller-id", words: ["controller", "id"] },
  { id: "controller-proposal", words: ["controller", "proposal"] },
  { id: "controller-registry", words: ["controller", "registry"] },
  { id: "fiber-optics", words: ["fiber", "optics"] },
  { id: "fiber-runtime", words: ["fiber", "runtime"] },
  { id: "fiberoptics", words: ["fiberoptics"] },
  { id: "fo-ac3", words: ["fo", "ac3"] },
  { id: "host-arbiter", words: ["host", "arbiter"] },
  { id: "observed-versions", words: ["observed", "versions"] },
  { id: "proposal-arbitration", words: ["proposal", "arbitration"] },
  { id: "proposal-disposition", words: ["proposal", "disposition"] },
  { id: "requested-range", words: ["requested", "range"] },
  { id: "state-epoch", words: ["state", "epoch"] },
  { id: "temporal-controller", words: ["temporal", "controller"] },
];
/**
 * OUTSIDE ANCHORS, the readers: each place is captured from the words around it in the export's text, and no pattern spells a
 * term. TITLE_TAG is the title's requirement tag, which the code-shape read skips.
 */
const TITLE_TAG = /^\[[^\]]*\] /;
const TITLE_PLACES =
  /^\[[^\]]+\] If Pi ever hosts (\S+) (\S+) arbitration \(gated (\S+)\), a (.+?) \(\w+ typed fields, (\w+)\.\.\w+\) stays inert data until Pi's (.+?) applies it; Pi never mutates controller state inside (\w+)\.emit reentrant callbacks; (\w+) stays a narrow initial seam, never a second controller engine\.$/;
const FILING_PLACES = /; artifact (\S+) bounded controller emission and (.+?) in one host \(/;
const CLAUSE_PLACES =
  /^adoption-time falsifier that a proposal row is applied only via the (.+?) seam and a mutation attempted inside a (\w+)\.emit reentrant callback is refused, with (\w+) never grown into a second controller engine$/;
/** A code-shaped spelling: a camelCase hump, an underscore name, or an upper-case code with a digit. */
const CODE_SHAPE = /\b(?:[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)+|[a-z][a-z0-9]*(?:_[a-z0-9]+)+|[A-Z]+[0-9]*(?:-[A-Z]+[0-9]+)+)\b/g;
/** What the readers read today: the title's, the filing's and the clause's places, then the title's and the filing's shapes. */
const ANCHORS: Anchors = {
  places: ["FiberOptics", "temporal-controller", "FO-AC3", "controller proposal", "controller_id", "host arbiter", "FiberRuntime", "ControlDirective", "FO-AC3", "proposal arbitration", "host arbiter", "FiberRuntime", "ControlDirective"],
  shapes: ["FiberOptics", "FO-AC3", "controller_id", "min_interval", "FiberRuntime", "ControlDirective", "FO-AC3", "controller_id", "observed_versions", "state_epoch", "actuator_id", "requested_range", "min_interval", "FiberRuntime", "ControlDirective"],
};
/** The charter's seven proposal fields (charter :20), the bead's "seven typed fields, controller_id..min_interval". */
const PROPOSAL_FIELDS: readonly string[] = ["controller_id", "observed_versions", "state_epoch", "actuator_id", "requested_range", "reason", "min_interval"];
/** The producer's shipped ControllerProposal fields at the pin (control.py :441-:448). */
const SHIPPED_FIELDS: readonly string[] = ["controller_id", "observed_versions", "state_epoch", "actuator_id", "requested_range", "reason", "min_interval_ns", "sample_time_ns"];
/** The producer's shipped ControlDirective members at the pin (events.py :151; charter :7). */
const DIRECTIVE_MEMBERS: readonly string[] = ["abort_speculative_key"];
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "adoption-time falsifier",
    pins: [
      { id: "A1", quote: "adoption-time" },
      { id: "A2", quote: "falsifier" },
    ],
  },
  {
    id: "B",
    label: "that a proposal row is applied only via the host arbiter seam",
    pins: [
      { id: "B1", quote: "that a proposal row" },
      { id: "B2", quote: "is applied only via the host arbiter seam" },
    ],
  },
  {
    id: "C",
    label: "and a mutation attempted inside a FiberRuntime.emit reentrant callback is refused,",
    pins: [
      { id: "C1", quote: "and a mutation attempted inside a FiberRuntime.emit reentrant callback" },
      { id: "C2", quote: "is refused," },
    ],
  },
  {
    id: "D",
    label: "with ControlDirective never grown into a second controller engine",
    pins: [
      { id: "D1", quote: "with ControlDirective never grown" },
      { id: "D2", quote: "into a second controller engine" },
    ],
  },
];
const RESIDUALS: readonly { readonly id: string; readonly quietPin: string }[] = [
  { id: "R-OUTSIDE-ROOTS", quietPin: "A1" },
  { id: "R-COMMON-WORD", quietPin: "A1" },
  { id: "R-COMPOSED", quietPin: "A1" },
  { id: "R-LOOKALIKE", quietPin: "A1" },
  { id: "R-RUN-ON", quietPin: "A1" },
  { id: "R-RENDERER-HOST", quietPin: "A1" },
  { id: "R-SUBPROCESS", quietPin: "A1" },
  { id: "R-SYNONYM", quietPin: "A1" },
  { id: "R-ADAPTER-TRUST", quietPin: "A2" },
  { id: "R-LATE-APPLY", quietPin: "B2" },
  { id: "R-ANY-CODE", quietPin: "C2" },
  { id: "R-DIRECTIVE-PAYLOAD", quietPin: "D1" },
];

// ---------------------------------------------------------------------------------------------------------------- the reader
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** The words of a text: NFKC, a break at each case change and before the last capital of an acronym run, lower case. */
function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
interface Hit {
  readonly line: number;
  readonly term: string;
}
/** Every term in a text, matched over its whole word stream; a term wrapped over lines is found at its first word's line. */
function termsIn(text: string): Hit[] {
  const stream: { readonly word: string; readonly line: number }[] = [];
  for (const [index, line] of text.split(/\r\n|\r|\n/).entries()) for (const word of words(line)) stream.push({ word, line: index + 1 });
  const out: Hit[] = [];
  for (let at = 0; at < stream.length; at += 1) {
    for (const term of TERMS) {
      if (at + term.words.length > stream.length) continue;
      if (term.words.every((word, offset) => stream[at + offset]?.word === word)) out.push({ line: stream[at]?.line ?? 0, term: term.id });
    }
  }
  return out;
}
const termIds = (text: string): string[] => [...new Set(termsIn(text).map(hit => hit.term))].sort(byName);
/** Whether a text reads as exactly one term: one finding, whose term's words are the text's whole word stream. */
function isOneTerm(text: string): boolean {
  const hits = termsIn(text);
  const term = TERMS.find(entry => entry.id === hits[0]?.term);
  return hits.length === 1 && term !== undefined && term.words.join(" ") === words(text).join(" ");
}
const kindOf = (path: string): string => {
  const dot = path.lastIndexOf(".");
  return dot <= path.lastIndexOf("/") ? "" : path.slice(dot);
};
const atRoot = (path: string): boolean => !path.includes("/");
const underRoot = (path: string): boolean => CONSTANTS.codeRoots.some(root => path.startsWith(`${root}/`));
/** A path the trigger reads: a code module below a root or at the root, or one of the named root files. */
const isRead = (path: string): boolean => (CONSTANTS.codeKinds.includes(kindOf(path)) && (underRoot(path) || atRoot(path))) || CONSTANTS.rootFiles.includes(path);
const rootOf = (path: string): string => (atRoot(path) ? "root" : (path.split("/")[0] ?? ""));

// ------------------------------------------------------------------------------------------------------------- the file sets
/** What git would commit as a read module: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...CONSTANTS.codeRoots, ":(glob)*"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && isRead(path) && existsSync(join(base, path))))].sort(byName);
}
/** Every regular file below the roots and at the repository root that the trigger reads; a symlink is reported, never followed. */
function walkTree(base: string): { readonly files: string[]; readonly links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && isRead(path)) files.push(path);
    }
  };
  for (const root of CONSTANTS.codeRoots) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (entry.isSymbolicLink() && isRead(entry.name)) links.push(entry.name);
    else if (entry.isFile() && isRead(entry.name)) files.push(entry.name);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
interface Scan {
  readonly read: readonly string[];
  readonly findings: readonly string[];
  readonly unreadable: readonly string[];
  readonly whole: boolean;
  readonly links: readonly string[];
  readonly texts: ReadonlyMap<string, string>;
}
/** The trigger: every read module's terms, with the whole check against Node's own listing less what git ignores. */
function scan(base: string): Scan {
  const read = gitList(base);
  const walked = walkTree(base);
  const hidden = ignored(base, walked.files);
  const expected = walked.files.filter(path => !hidden.has(path));
  const findings: string[] = [];
  const unreadable: string[] = [];
  const texts = new Map<string, string>();
  for (const path of read) {
    let text: string;
    try {
      text = readFileSync(join(base, path), "utf8");
    } catch {
      unreadable.push(path);
      continue;
    }
    texts.set(path, text);
    for (const hit of termsIn(text)) findings.push(`${path}:${hit.line} ${hit.term}`);
  }
  return { read, findings: [...new Set(findings)].sort(byName), unreadable, whole: JSON.stringify(read) === JSON.stringify(expected), links: walked.links, texts };
}
let LIVE: Scan | undefined;
const live = (): Scan => {
  LIVE ??= scan(REPO);
  return LIVE;
};
const modulesOf = (findings: readonly string[]): string[] => [...new Set(findings.map(finding => finding.slice(0, finding.indexOf(":"))))].sort(byName);

// ---------------------------------------------------------------------------------------------------------------- the falsifier
type Attempt = { readonly kind: "applied"; readonly controllers: readonly string[] } | { readonly kind: "refused"; readonly code: string };
/** What a binding adapts a Pi host to: the falsifier reads the host only through these five members. */
interface ArbiterHost {
  /** Hand the host one proposal row; the host records or refuses it and never applies it here. */
  submit(row: Readonly<Record<string, unknown>>): void;
  /** The host arbiter seam, the one mutation path: apply what the host admits, or refuse. */
  arbitrate(): Attempt;
  /** One FiberRuntime.emit; the host runs the callback reentrantly, before emit returns. */
  emit(callback: () => void): void;
  /** The controller state the host holds, as canonical text. */
  snapshot(): string;
  /** The member names of the ControlDirective the host's control hooks return. */
  directiveMembers(): readonly string[];
}
interface HostBinding {
  readonly make: () => ArbiterHost;
  readonly admissible: () => Record<string, unknown>;
}
/** The Pi hosts of the FiberOptics controller seam, keyed by the module that spells it. None today (A2). */
const ARBITER_HOSTS: Readonly<Record<string, HostBinding>> = {};
interface Probe {
  ran: boolean;
  inside: boolean;
  refused: boolean;
}
interface Falsified {
  readonly violations: readonly string[];
  readonly probe: Probe;
}
const tick = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));
const attemptJson = (attempt: Attempt): Json => (attempt.kind === "refused" ? { kind: attempt.kind, code: attempt.code } : { kind: attempt.kind, controllers: [...attempt.controllers] });
const canonical = (value: unknown): string => JSON.stringify(value, (_key, inner: unknown) => (inner !== null && typeof inner === "object" && !Array.isArray(inner) ? Object.fromEntries(Object.entries(inner).sort(([a], [b]) => byName(a, b))) : inner));
/** A typed refusal: an object carrying a non-empty string code (a returned refusal or a thrown one). */
const typedRefusal = (value: unknown): boolean => value !== null && typeof value === "object" && "code" in value && typeof value.code === "string" && value.code !== "";
/**
 * Plain data: null, a boolean, a finite number, a string, an array each of whose elements is plain data, or an object of
 * Object.prototype or null each of whose enumerable own properties is a data property holding plain data - so an object's accessor
 * property, at any depth, and undefined are not data.
 */
function isData(value: unknown): boolean {
  if (value === null || typeof value === "boolean" || typeof value === "string") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isData);
  if (typeof value !== "object") return false;
  const proto: unknown = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) return false;
  return Object.keys(value).every(key => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return descriptor !== undefined && "value" in descriptor && isData(descriptor.value);
  });
}
/** The field a charter field is shipped as: itself, or its nanosecond spelling (min_interval ships as min_interval_ns). */
const shippedAs = (field: string): string => SHIPPED_FIELDS.find(shipped => shipped === field || shipped === `${field}_ns`) ?? field;
/** A proposal row's shape: ok, or the first missing field, extra key or field that is not data. */
function rowShape(row: Readonly<Record<string, unknown>>): string {
  for (const field of PROPOSAL_FIELDS) if (!(field in row) && !(shippedAs(field) in row)) return `missing:${field}`;
  const keys = Object.keys(row).sort(byName);
  for (const key of keys) if (!PROPOSAL_FIELDS.includes(key) && !SHIPPED_FIELDS.includes(key)) return `extra:${key}`;
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(row, key);
    if (descriptor === undefined || !("value" in descriptor) || !isData(descriptor.value)) return `not-data:${key}`;
  }
  return "ok";
}
/** The malformed rows the falsifier hands a fresh host: each field missing, an extra key, fields that are not data. */
function malformed(row: Readonly<Record<string, unknown>>): (readonly [string, Record<string, unknown>])[] {
  const out: (readonly [string, Record<string, unknown>])[] = PROPOSAL_FIELDS.map(field => [`missing:${field}`, Object.fromEntries(Object.entries(row).filter(([key]) => key !== field && key !== shippedAs(field)))] as const);
  out.push(["extra:apply", { ...row, apply: "now" }]);
  out.push(["not-data:reason", { ...row, reason: (): string => "computed when read" }]);
  out.push(["not-data:state_epoch", { ...row, state_epoch: Number.NaN }]);
  out.push(["not-data:requested_range", { ...row, requested_range: [0.25, Number.POSITIVE_INFINITY] }]);
  out.push(["not-data:observed_versions", { ...row, observed_versions: new Map([["node-a", 3]]) }]);
  // An accessor inside a nested object (a getter computes the interval when read) and a field whose value is undefined.
  out.push(["not-data:min_interval", { ...row, min_interval: { get ns(): number { return 1_000_000; } } }]);
  out.push(["not-data:actuator_id", { ...row, actuator_id: undefined }]);
  return out;
}
/** A grown directive member that names a proposal field or a seam verb: a second controller engine. */
const namesEngine = (member: string): boolean => {
  const spelled = words(member);
  return PROPOSAL_FIELDS.some(field => words(field).join(" ") === spelled.join(" ")) || spelled.some(word => CONSTANTS.seamVerbs.includes(word));
};
/** The falsifier: one host through its binding, every violation it shows, and the record of the reentrant attempt. */
async function falsify(binding: HostBinding): Promise<Falsified> {
  const violations: string[] = [];
  const host = binding.make();
  const row = binding.admissible();
  const rowText = canonical(row);
  const before = host.snapshot();
  host.submit(row);
  await tick();
  if (host.snapshot() !== before) violations.push("applied-at-submit");
  if (canonical(row) !== rowText) violations.push("row-mutated");
  const probe: Probe = { ran: false, inside: false, refused: false };
  const settled = host.snapshot();
  let returned = false;
  host.emit(() => {
    probe.ran = true;
    probe.inside = !returned;
    if (returned) return;
    try {
      const attempt = host.arbitrate();
      probe.refused = attempt.kind === "refused" && typedRefusal(attempt);
    } catch (error) {
      probe.refused = typedRefusal(error);
    }
  });
  returned = true;
  const emitted = host.snapshot();
  await tick();
  if (!probe.ran) violations.push("emit-skipped-callback");
  else if (!probe.inside) violations.push("callback-not-reentrant");
  else if (!probe.refused) violations.push("reentrant-attempt-not-refused");
  if (emitted !== settled) violations.push("state-mutated-in-emit");
  const ready = host.snapshot();
  let applied: Attempt | undefined;
  try {
    applied = host.arbitrate();
  } catch {
    applied = undefined;
  }
  if (applied?.kind !== "applied" || !applied.controllers.includes(String(row.controller_id)) || host.snapshot() === ready) violations.push("arbiter-applied-nothing");
  for (const [name, variant] of malformed(binding.admissible())) {
    const fresh = binding.make();
    const start = fresh.snapshot();
    try {
      fresh.submit(variant);
    } catch {
      // a refusal at submit
    }
    try {
      fresh.arbitrate();
    } catch {
      // a refusal at arbitration
    }
    await tick();
    if (fresh.snapshot() !== start) violations.push(`malformed-applied:${name}`);
  }
  for (const member of host.directiveMembers()) {
    if (DIRECTIVE_MEMBERS.includes(words(member).join("_"))) continue;
    violations.push(`directive-grown:${member}`);
    if (namesEngine(member)) violations.push(`directive-engine:${member}`);
  }
  return { violations, probe };
}
/** A2: the modules the scan finds and the bindings must name the same set, and every bound host must meet the falsifier. */
async function bindingReport(findings: readonly string[], bindings: Readonly<Record<string, HostBinding>>): Promise<Json> {
  const found = modulesOf(findings);
  const bound = Object.keys(bindings).sort(byName);
  const violations: { [path: string]: Json } = {};
  for (const path of bound) {
    const binding = bindings[path];
    if (binding !== undefined) violations[path] = [...(await falsify(binding)).violations];
  }
  return { unbound: found.filter(path => !bound.includes(path)), stale: bound.filter(path => !found.includes(path)), violations };
}

// ----------------------------------------------------------------------------------------------------------- the synthetic hosts
type Flaw =
  | "honest"
  | "apply-at-submit"
  | "timer-apply"
  | "mutates-row"
  | "flush-on-emit"
  | "inert-arbiter"
  | "claims-apply"
  | "silent-apply"
  | "refused-apply"
  | "lax-shape"
  | "lax-timer"
  | "lax-late-timer"
  | "swallow-callback"
  | "defer-callback"
  | "apply-in-emit"
  | "untyped-throw"
  | "empty-code-throw"
  | "empty-code-return"
  | "numeric-code-throw"
  | "null-throw"
  | "string-throw"
  | "coded-apply"
  | "any-code-throw"
  | "camel-directive"
  | "grown-directive"
  | "engine-directive"
  | "payload-directive"
  | "late-timer"
  | "lying-adapter";
class HostRefusal extends Error {
  readonly code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}
const LATE_MS = 50;
/** An attempt of kind applied that carries a code, which the coded-apply host returns inside emit without applying anything. */
const CODED_APPLY: Attempt & { readonly code: string } = { kind: "applied", controllers: [], code: "COMMIT_IN_EMIT" };
/** An attempt of kind refused that names the controllers it applied, which the refused-apply host returns outside emit. */
const refusedApply = (controllers: readonly string[]): Attempt & { readonly controllers: readonly string[] } => ({ kind: "refused", code: "APPLIED_ANYWAY", controllers });
const ADMISSIBLE = (): Record<string, unknown> => ({ controller_id: "ctl-1", observed_versions: { "node-a": 3 }, state_epoch: 0, actuator_id: "act-1", requested_range: [0.25, 0.75], reason: "load above the band", min_interval: 1_000_000 });
/** A host of one flaw over the honest one: rows queue at submit, the arbiter applies them, and refuses while an emit runs. */
class SyntheticHost implements ArbiterHost {
  readonly flaw: Flaw;
  private readonly pending: Readonly<Record<string, unknown>>[] = [];
  private readonly state: { epoch: number; settings: { [actuator: string]: Json }; applied: string[] } = { epoch: 0, settings: {}, applied: [] };
  private readonly shown: { epoch: number; settings: { [actuator: string]: Json }; applied: string[] } = { epoch: 0, settings: {}, applied: [] };
  private emitting = 0;
  constructor(flaw: Flaw) {
    this.flaw = flaw;
  }
  submit(row: Readonly<Record<string, unknown>>): void {
    if (this.flaw === "mutates-row") Reflect.set(row, "reason", "seen by the host");
    // The lax timer hosts take a malformed row without refusing it and apply it on a timer, never through the arbiter: one
    // macrotask later (lax-timer) or later than one macrotask (lax-late-timer, R-LATE-APPLY).
    if ((this.flaw === "lax-timer" || this.flaw === "lax-late-timer") && rowShape(row) !== "ok") {
      setTimeout(() => this.apply(row), this.flaw === "lax-timer" ? 0 : LATE_MS);
      return;
    }
    if (this.flaw !== "lax-shape" && rowShape(row) !== "ok") throw new HostRefusal("ROW_INVALID");
    if (this.flaw === "apply-at-submit") this.apply(row);
    if (this.flaw === "timer-apply") setTimeout(() => this.apply(row), 0);
    if (this.flaw === "late-timer") setTimeout(() => this.apply(row), LATE_MS);
    if (this.flaw === "lying-adapter") this.apply(row, false);
    this.pending.push(row);
  }
  arbitrate(): Attempt {
    if (this.emitting > 0 && this.flaw === "untyped-throw") throw new TypeError("the arbiter read an unset field");
    if (this.emitting > 0 && this.flaw === "empty-code-throw") throw new HostRefusal("");
    if (this.emitting > 0 && this.flaw === "empty-code-return") return { kind: "refused", code: "" };
    if (this.emitting > 0 && this.flaw === "numeric-code-throw") throw Object.assign(new Error("COMMIT_IN_EMIT"), { code: 409 });
    if (this.emitting > 0 && this.flaw === "null-throw") throw null;
    if (this.emitting > 0 && this.flaw === "string-throw") throw "COMMIT_IN_EMIT";
    if (this.emitting > 0 && this.flaw === "coded-apply") return CODED_APPLY;
    if (this.emitting > 0 && this.flaw === "any-code-throw") throw new HostRefusal("ENOENT");
    if (this.emitting > 0 && this.flaw !== "apply-in-emit") return { kind: "refused", code: "COMMIT_IN_EMIT" };
    if (this.flaw === "inert-arbiter") return { kind: "applied", controllers: [] };
    // claims-apply answers the rows applied and moves nothing; silent-apply moves the state and names no controller;
    // refused-apply moves the state and answers refused (naming the controllers it applied).
    if (this.flaw === "claims-apply") return { kind: "applied", controllers: this.pending.splice(0).map(row => String(row.controller_id)) };
    const controllers: string[] = [];
    for (const row of this.pending.splice(0)) {
      this.apply(row);
      controllers.push(String(row.controller_id));
    }
    if (this.flaw === "silent-apply") return { kind: "applied", controllers: [] };
    if (this.flaw === "refused-apply") return refusedApply(controllers);
    return { kind: "applied", controllers };
  }
  emit(callback: () => void): void {
    if (this.flaw === "swallow-callback") return;
    if (this.flaw === "defer-callback") {
      setTimeout(callback, 0);
      return;
    }
    this.emitting += 1;
    try {
      if (this.flaw === "flush-on-emit") for (const row of this.pending.splice(0)) this.apply(row);
      callback();
    } finally {
      this.emitting -= 1;
    }
  }
  snapshot(): string {
    return canonical(this.flaw === "lying-adapter" ? this.shown : this.state);
  }
  /** The state the host really holds, which the lying adapter does not show (R-ADAPTER-TRUST). */
  held(): string {
    return canonical(this.state);
  }
  directiveMembers(): readonly string[] {
    if (this.flaw === "camel-directive") return ["abortSpeculativeKey"];
    if (this.flaw === "grown-directive") return ["abort_speculative_key", "priority_hint"];
    if (this.flaw === "engine-directive") return ["abort_speculative_key", "requested_range", "arbitrate"];
    return ["abort_speculative_key"];
  }
  /** The value the payload directive carries in its one shipped member (R-DIRECTIVE-PAYLOAD). */
  directiveValue(): { readonly [member: string]: string } {
    return { abort_speculative_key: this.flaw === "payload-directive" ? canonical({ requested_range: [0, 1], actuator_id: "act-1" }) : "speculative:ctl-1" };
  }
  private apply(row: Readonly<Record<string, unknown>>, shown = true): void {
    for (const target of shown ? [this.state, this.shown] : [this.state]) {
      target.epoch += 1;
      target.settings[String(row.actuator_id)] = isData(row.requested_range) ? (row.requested_range as Json) : "not data";
      target.applied.push(String(row.controller_id));
    }
  }
}
const synthetic = (flaw: Flaw): HostBinding => ({ make: () => new SyntheticHost(flaw), admissible: ADMISSIBLE });
/** The violations of each named synthetic host. */
async function hostsOf(flaws: readonly Flaw[]): Promise<Json> {
  const out: { [flaw: string]: Json } = {};
  for (const flaw of flaws) out[flaw] = [...(await falsify(synthetic(flaw))).violations];
  return out;
}
/** A binding whose every host is kept, for the quiet rows that read a host after the falsifier is done with it. */
function kept(flaw: Flaw): { readonly binding: HostBinding; readonly hosts: SyntheticHost[] } {
  const hosts: SyntheticHost[] = [];
  return {
    hosts,
    binding: {
      make: () => {
        const host = new SyntheticHost(flaw);
        hosts.push(host);
        return host;
      },
      admissible: ADMISSIBLE,
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------------- plants
const scratches: string[] = [];
afterEach(() => {
  removeScratch(...scratches.splice(0));
});
const FILLER = "// quiet filler line\n";
const fullwidth = (text: string): string => [...text].map(char => String.fromCodePoint((char.codePointAt(0) ?? 0) + 0xfee0)).join("");
const CYRILLIC_O = String.fromCodePoint(0x41e);
const TICK = "`";
interface Plant {
  readonly path: string;
  readonly text: string;
  /** The findings the scan must make, as `<line> <term>`; empty for a quiet plant. */
  readonly expect: readonly string[];
  /** The residual a quiet plant pins, or the place a found plant stands for. */
  readonly role: string;
}
/** The plant tree: every term at least once in every reading place, the long plants sized past the live tree, the quiet plants. */
function plants(sizes: { readonly lines: number; readonly bytes: number; readonly lineBytes: number }): readonly Plant[] {
  const run = Math.max(sizes.lines + 1, Math.ceil((sizes.bytes + 1) / Buffer.byteLength(FILLER)) + 1);
  const filler = FILLER.repeat(run);
  const wide = "q".repeat(sizes.lineBytes + 1);
  return [
    { path: "src/zz-host.ts", text: 'import type { FiberRuntime } from "./zz-runtime.js";\n', expect: ["1 fiber-runtime"], role: "import" },
    { path: "src/a/b/c/zz-nested.ts", text: 'export const quiet = 1;\nexport const still = 2;\nexport const directive = { abortSpeculativeKey: "k" };\n', expect: ["3 abort-speculative-key"], role: "nested member" },
    { path: "qa/zz-arbiter.py", text: "from fiber_optics.control import ControllerProposal\n", expect: ["1 controller-proposal", "1 fiber-optics"], role: "python import" },
    { path: "qa/zz-run.sh", text: "#!/bin/sh\npython3 -m fiber_optics.control\n", expect: ["2 fiber-optics"], role: "shell argv" },
    { path: "examples/zz-row.js", text: 'const row = { controller_id: "c", state_epoch: 0 };\nrow.observedVersions = {};\n', expect: ["1 controller-id", "1 state-epoch", "2 observed-versions"], role: "object keys" },
    { path: "zz-root.mjs", text: "/**\n * the host\n * arbiter applies it\n */\nexport {};\n", expect: ["2 host-arbiter"], role: "root module, wrapped block comment" },
    { path: "package.json", text: '{\n  "name": "plant",\n  "dependencies": { "fiber-optics": "1.0.0" }\n}\n', expect: ["3 fiber-optics"], role: "dependency name" },
    { path: "src/zz-template.ts", text: `export const key = ${TICK}requested_range${TICK};\n`, expect: ["1 requested-range"], role: "template" },
    { path: "src/zz-string.ts", text: "export const label = 'temporal-controller';\n", expect: ["1 temporal-controller"], role: "string" },
    { path: "src/zz-comment.ts", text: "export const gate = 3; // gated FO-AC3\n", expect: ["1 fo-ac3"], role: "line comment" },
    { path: "src/zz-types.ts", text: "export type Seam = ProposalDisposition | ControllerRegistry | CommittedControllerState;\n", expect: ["1 committed-controller", "1 controller-registry", "1 proposal-disposition"], role: "type names" },
    { path: "src/zz-mixed.ts", text: 'export const actuatorId = "a";\n/* proposal arbitration */\nexport const fiberoptics = ControlDirective;\n', expect: ["1 actuator-id", "2 proposal-arbitration", "3 control-directive", "3 fiberoptics"], role: "identifier, block comment" },
    { path: "src/zz-fullwidth.ts", text: `export const name = "${fullwidth("FiberOptics")}";\n`, expect: ["1 fiber-optics"], role: "fullwidth spelling" },
    { path: "src/zz-acronym.ts", text: "export interface IFiberRuntime {}\nexport type Hook = FOControlDirective;\n", expect: ["1 fiber-runtime", "2 control-directive"], role: "acronym run" },
    { path: "src/zz-long-last.ts", text: `${filler}export const last = FiberRuntime;\n`, expect: [`${run + 1} fiber-runtime`], role: "long, last" },
    { path: "qa/zz-long-first.mjs", text: `export const first = "host arbiter";\n${filler}`, expect: ["1 host-arbiter"], role: "long, first" },
    { path: "examples/zz-long-middle.js", text: `${filler}// state epoch\n${filler}`, expect: [`${run + 1} state-epoch`], role: "long, middle" },
    { path: "src/zz-long-line.ts", text: `export const line = "${wide} ControllerProposal ${wide}";\n`, expect: ["1 controller-proposal"], role: "long line, middle" },
    { path: "src/zz-pi-words.ts", text: "export interface ClaudeObserverControlHooks { reason: string }\nexport const MIN_INTERVAL_MS = 1;\nexport const minIntervalMs = 2;\nconst controller = new AbortController();\nexport const proposal = 'a proposal, an arbiter, a directive';\nexport const alone = 'FO alone; AC3 alone';\n", expect: [], role: "R-COMMON-WORD" },
    { path: "src/zz-composed.ts", text: 'export const name = "fib" + "erOptics";\n', expect: [], role: "R-COMPOSED" },
    { path: "src/zz-escaped.ts", text: 'export const name = "\\u0046iberOptics";\n', expect: [], role: "R-COMPOSED" },
    { path: "src/zz-lookalike.ts", text: `export const name = "Fiber${CYRILLIC_O}ptics";\n`, expect: [], role: "R-LOOKALIKE" },
    { path: "src/zz-run-on.ts", text: "export const hostarbiter = 1;\nexport const FIBERRUNTIME = 2;\n", expect: [], role: "R-RUN-ON" },
    { path: "src/zz-rf.ts", text: 'import { spawn } from "node:child_process";\nspawn("rf", ["render", "--view", "context"]);\n', expect: [], role: "R-RENDERER-HOST" },
    { path: "qa/zz-helper.mjs", text: 'import { spawn } from "node:child_process";\nspawn("python3", ["-m", "helper"]);\n', expect: [], role: "R-SUBPROCESS" },
    { path: "test/zz-host.test.ts", text: "import type { FiberRuntime } from './x.js';\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "docs/zz-page.md", text: "Pi hosts FiberOptics behind a host arbiter.\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "vendor/zz-vendored.ts", text: "export const directive = ControlDirective;\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "ignored/zz-ignored.ts", text: "export const runtime = FiberRuntime;\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "src/zz-skip.local.ts", text: "export const runtime = FiberRuntime;\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "forge.toml", text: "fiber_optics = true\n", expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: "src/zz-data.json", text: '{ "controller_id": "c" }\n', expect: [], role: "R-OUTSIDE-ROOTS" },
    { path: ".gitignore", text: "ignored/\n*.local.ts\n", expect: [], role: "ignore rules" },
  ];
}
/** The live tree's sizes the long plants must outreach: the most lines, the most bytes of one module and of one line. */
function liveSizes(): { readonly lines: number; readonly bytes: number; readonly lineBytes: number } {
  let lines = 0;
  let bytes = 0;
  let lineBytes = 0;
  for (const text of live().texts.values()) {
    const split = text.split(/\r\n|\r|\n/);
    lines = Math.max(lines, split.length);
    bytes = Math.max(bytes, Buffer.byteLength(text), text.length);
    for (const line of split) lineBytes = Math.max(lineBytes, Buffer.byteLength(line), line.length);
  }
  return { lines, bytes, lineBytes };
}
function plantTree(tree: readonly Plant[]): string {
  const dir = makeScratch("fo-arbitration-plants-");
  scratches.push(dir);
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "pipe" });
  for (const plant of tree) {
    mkdirSync(dirname(join(dir, plant.path)), { recursive: true });
    writeFileSync(join(dir, plant.path), plant.text);
  }
  return dir;
}

// ------------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const real = live();
    const perRoot: { [root: string]: number } = {};
    for (const path of real.read) perRoot[rootOf(path)] = (perRoot[rootOf(path)] ?? 0) + 1;
    expect(Object.keys(CONSTANTS.floors).map(root => (perRoot[root] ?? 0) >= (CONSTANTS.floors[root] ?? Number.POSITIVE_INFINITY))).toEqual(Object.keys(CONSTANTS.floors).map(() => true));
    expect(real.read).toContain("package.json");
    const sizes = liveSizes();
    const tree = plants(sizes);
    // The long plants outreach the live tree, read off their own texts: each filler run around the term is longer than the
    // longest read module in lines and in UTF-8 bytes, and the long line's runs are longer than the longest read line in bytes.
    const outreach = tree
      .filter(plant => plant.role.startsWith("long"))
      .map(plant => {
        const lines = plant.text.split("\n");
        const at = (termsIn(plant.text)[0]?.line ?? 0) - 1;
        const runs = plant.role === "long line, middle" ? (lines[at] ?? "").split(" ControllerProposal ").map(part => [1, Buffer.byteLength(part)]) : [lines.slice(0, at), lines.slice(at + 1, -1)].filter(part => part.length > 0).map(part => [part.length, Buffer.byteLength(part.join("\n"))]);
        const reach = plant.role === "long line, middle" ? sizes.lineBytes : sizes.bytes;
        const ok = runs.every(([count, bytes]) => (plant.role === "long line, middle" || (count ?? 0) > sizes.lines) && (bytes ?? 0) > reach);
        return `${plant.role}: ${runs.length} run(s) ${ok ? "outreach" : "short"}`;
      });
    expect(outreach).toEqual(["long, last: 1 run(s) outreach", "long, first: 1 run(s) outreach", "long, middle: 2 run(s) outreach", "long line, middle: 2 run(s) outreach"]);
    const planted = scan(plantTree(tree));
    expect(planted.findings).toEqual(tree.flatMap(plant => plant.expect.map(entry => `${plant.path}:${entry}`)).sort(byName));
    expect([...new Set(planted.findings.map(finding => finding.slice(finding.indexOf(" ") + 1)))].sort(byName)).toEqual(TERMS.map(term => term.id).sort(byName));
    expect([planted.whole, planted.unreadable.length, planted.links.length]).toEqual([true, 0, 0]);
    // The whole check and the link report are live: a symlinked module git lists is read through its link, and the walk reports
    // the link, so this control tree's scan is not whole. The tree holds each link form the walk reports: a module below a root
    // (src/zz-link.ts), a root (examples, linked to a directory whose module git does not list, so nothing reads it) and a module
    // at the root (zz-root-link.mjs).
    const control = makeScratch("fo-arbitration-whole-");
    scratches.push(control);
    execFileSync("git", ["init", "-q"], { cwd: control, stdio: "pipe" });
    mkdirSync(join(control, "src"), { recursive: true });
    writeFileSync(join(control, "zz-target.txt"), "export const directive = ControlDirective;\n");
    symlinkSync("../zz-target.txt", join(control, "src", "zz-link.ts"));
    mkdirSync(join(control, "zz-linked-root"), { recursive: true });
    writeFileSync(join(control, "zz-linked-root", "zz-module.js"), "export const runtime = FiberRuntime;\n");
    symlinkSync("zz-linked-root", join(control, "examples"));
    symlinkSync("zz-target.txt", join(control, "zz-root-link.mjs"));
    const linked = scan(control);
    // The quiet plants: in the roots they are read and quiet; outside them, ignored or of another kind they are not read - and
    // each spells its residual's construct: the outside ones a term, the composed and look-alike ones a term once resolved.
    const quiet = tree.filter(plant => plant.role.startsWith("R-"));
    const textOf = (path: string): string => quiet.find(plant => plant.path === path)?.text ?? "";
    const outside = quiet.filter(plant => plant.role === "R-OUTSIDE-ROOTS");
    expect(outside.map(plant => termIds(plant.text).length > 0)).toEqual(outside.map(() => true));
    const parts = /"([^"]*)" \+ "([^"]*)"/.exec(textOf("src/zz-composed.ts"));
    const escaped = /"((?:[^"\\]|\\.)*)"/.exec(textOf("src/zz-escaped.ts"))?.[1] ?? "";
    const resolved: unknown = JSON.parse(`"${escaped}"`);
    expect([termIds(textOf("src/zz-composed.ts")), termIds(`${parts?.[1] ?? ""}${parts?.[2] ?? ""}`), termIds(textOf("src/zz-escaped.ts")), termIds(typeof resolved === "string" ? resolved : "")]).toEqual([[], ["fiber-optics"], [], ["fiber-optics"]]);
    expect([termIds(textOf("src/zz-lookalike.ts")), termIds(textOf("src/zz-lookalike.ts").replace(CYRILLIC_O, "O"))]).toEqual([[], ["fiber-optics"]]);
    // R-RUN-ON: each run-on word is a term's words run together, and reads as no term.
    const runOn = textOf("src/zz-run-on.ts");
    expect([termIds(runOn), words(runOn).filter(word => TERMS.some(term => term.words.length > 1 && term.words.join("") === word))]).toEqual([[], ["hostarbiter", "fiberruntime"]]);
    const common = words(textOf("src/zz-pi-words.ts"));
    expect(["reason", "min", "interval", "controller", "proposal", "arbiter", "directive", "hooks", "fo", "ac3"].filter(word => !common.includes(word))).toEqual([]);
    expect([words(textOf("src/zz-rf.ts")).includes("rf"), words(textOf("qa/zz-helper.mjs")).includes("python3")]).toEqual([true, true]);
    const residuals: { [residual: string]: Json } = {};
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "A1" && entry.id !== "R-SYNONYM")) {
      residuals[residual.id] = quiet.filter(plant => plant.role === residual.id).map(plant => `${plant.path} ${planted.read.includes(plant.path) ? "read-quiet" : "unread"}`);
    }
    // R-SYNONYM: the SELF-ANCHORED terms - no outside text reads them (TERMS less the ANCHORED terms the export's places, shapes
    // and carrier read) - held by this file and the roster alone.
    const { title, filing } = beadRow();
    const anchored = anchoredTerms(title, filing);
    return {
      live: { findings: [...real.findings], unreadable: [...real.unreadable], links: [...real.links], whole: real.whole },
      plants: { read: [...planted.read], findings: planted.findings.map(finding => finding.replace(/:\d+ /, " ")), residuals },
      wholeControl: { read: [...linked.read], findings: [...linked.findings], whole: linked.whole, links: [...linked.links] },
      synonyms: TERMS.map(term => term.id).filter(id => !anchored.has(id)),
    };
  },
  A2: async () => {
    const liveReport = await bindingReport(live().findings, ARBITER_HOSTS);
    const syntheticReport = await bindingReport(["src/zz-honest.ts:3 host-arbiter", "src/zz-lax.ts:1 controller-proposal", "src/zz-unbound.ts:2 fiber-runtime"], { "src/zz-gone.ts": synthetic("honest"), "src/zz-honest.ts": synthetic("honest"), "src/zz-lax.ts": synthetic("apply-at-submit") });
    // R-ADAPTER-TRUST: an adapter that hides the state it moved at submit passes, though the host really moved it.
    const lying = kept("lying-adapter");
    const result = await falsify(lying.binding);
    const first = lying.hosts[0];
    return {
      live: liveReport,
      synthetic: syntheticReport,
      adapterTrust: { violations: [...result.violations], heldMovedAtSubmit: first !== undefined && first.held() !== first.snapshot() },
    };
  },
  B1: async () => {
    const shipped: Record<string, unknown> = Object.fromEntries(Object.entries(ADMISSIBLE()).filter(([key]) => key !== "min_interval"));
    shipped.min_interval_ns = 1_000_000;
    shipped.sample_time_ns = 5;
    const variants = malformed(ADMISSIBLE());
    return {
      fields: [...PROPOSAL_FIELDS],
      shippedAs: PROPOSAL_FIELDS.map(shippedAs),
      shapes: { admissible: rowShape(ADMISSIBLE()), shipped: rowShape(shipped), ...Object.fromEntries(variants.map(([name, variant]) => [name, rowShape(variant)])) },
      hosts: await hostsOf(["honest", "lax-shape", "lax-timer"]),
    };
  },
  B2: async () => {
    // R-LATE-APPLY: a host applying on a timer later than one macrotask passes, though it moved the state outside the arbiter:
    // once the timer has fired its state carries two applies of the one row, the arbiter's and the timer's. A lax host applying
    // each malformed row on such a timer passes too, though once its timers have fired every fresh host it was given moved.
    const late = kept("late-timer");
    const result = await falsify(late.binding);
    const lateLax = kept("lax-late-timer");
    const laxResult = await falsify(lateLax.binding);
    await new Promise(resolve => setTimeout(resolve, LATE_MS * 3));
    const held: unknown = JSON.parse(late.hosts[0]?.snapshot() ?? "null");
    const pristine = new SyntheticHost("honest").snapshot();
    const fresh = lateLax.hosts.slice(1);
    return {
      hosts: await hostsOf(["honest", "apply-at-submit", "timer-apply", "mutates-row", "flush-on-emit", "inert-arbiter", "claims-apply", "silent-apply", "refused-apply"]),
      lateApply: {
        violations: [...result.violations],
        appliesAfterTheTimer: held !== null && typeof held === "object" && "applied" in held && Array.isArray(held.applied) ? held.applied.length : -1,
        malformed: { violations: [...laxResult.violations], freshHosts: fresh.length, movedAfterTheTimers: fresh.filter(host => host.snapshot() !== pristine).length },
      },
    };
  },
  C1: async () => {
    const honest = await falsify(synthetic("honest"));
    return { probe: { ...honest.probe }, hosts: await hostsOf(["honest", "swallow-callback", "defer-callback"]) };
  },
  C2: async () => {
    // The honest host's answer to an attempt inside its own emit: a typed refusal, nothing applied.
    const refusal = new SyntheticHost("honest");
    const seen: { attempt?: Attempt } = {};
    refusal.emit(() => {
      seen.attempt = refusal.arbitrate();
    });
    // R-ANY-CODE: a thrown refusal is read by its non-empty code alone, whatever the code names.
    const anyCode = await falsify(synthetic("any-code-throw"));
    return {
      refusal: seen.attempt === undefined ? null : attemptJson(seen.attempt),
      hosts: await hostsOf(["honest", "apply-in-emit", "untyped-throw", "empty-code-throw", "empty-code-return", "numeric-code-throw", "null-throw", "string-throw", "coded-apply"]),
      anyCode: { violations: [...anyCode.violations], probe: { ...anyCode.probe } },
    };
  },
  D1: async () => {
    // R-DIRECTIVE-PAYLOAD: the shipped member's value carries a controller payload, and the falsifier reads member names only.
    const payload = new SyntheticHost("payload-directive");
    const result = await falsify(synthetic("payload-directive"));
    return {
      members: [...DIRECTIVE_MEMBERS],
      hosts: await hostsOf(["honest", "camel-directive", "grown-directive"]),
      payload: { violations: [...result.violations], spells: termIds(Object.values(payload.directiveValue()).join(" ")) },
    };
  },
  D2: async () => {
    return {
      engine: { fields: PROPOSAL_FIELDS.filter(namesEngine), verbs: CONSTANTS.seamVerbs.filter(namesEngine), shipped: DIRECTIVE_MEMBERS.filter(namesEngine), grown: ["priority_hint"].filter(namesEngine) },
      hosts: await hostsOf(["engine-directive"]),
    };
  },
};

// ------------------------------------------------------------------------------------------------------- the outside anchors
function beadRow(): { readonly title: string; readonly filing: string } {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string" && "title" in value && typeof value.title === "string") {
      return { title: value.title, filing: value.notes.split("\n").find(entry => entry.startsWith(CONSTANTS.filing)) ?? "" };
    }
  }
  throw new Error("bead export lacks the owner filing");
}
const clauseOf = (filing: string): string => /Acceptance: (.+)\.$/.exec(filing)?.[1] ?? "";
const carrierOf = (filing: string): string[] => (/The proposal carrier is \{([^}]*)\}/.exec(filing)?.[1] ?? "").split(", ");
/** OUTSIDE ANCHORS: the seam names the export spells, read by position (places) and by code shape (shapes). */
function outsideReads(title: string, filing: string): Anchors {
  const matches = [TITLE_PLACES.exec(title), FILING_PLACES.exec(filing), CLAUSE_PLACES.exec(clauseOf(filing))];
  return {
    places: matches.flatMap(match => (match === null ? [] : match.slice(1))),
    shapes: [title.replace(TITLE_TAG, ""), filing].flatMap(text => [...text.matchAll(CODE_SHAPE)].map(match => match[0])),
  };
}
/** The reads that do not read as exactly one term; a read that is a common field must read as none. */
const unanchored = (reads: readonly string[]): string[] => reads.filter(read => (CONSTANTS.commonFields.includes(read) ? termsIn(read).length > 0 : !isOneTerm(read)));
/** The ANCHORED terms: what the export's places, shapes and carrier fields read as. */
function anchoredTerms(title: string, filing: string): Set<string> {
  const reads = outsideReads(title, filing);
  return new Set([...reads.places, ...reads.shapes, ...carrierOf(filing)].flatMap(termIds));
}
const GAP = /^[\s,;:]*$/;
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !GAP.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return GAP.test(body.slice(at));
}
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
const producerLine = (path: string, line: number): string => ROSTER.producer.files.find(file => file.path === path)?.lines.find(entry => entry.line === line)?.text ?? "";
const NUMBER_WORDS: readonly string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

describe("wb-km7q.1 FiberOptics controller arbitration census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R4, until Pi hosts the seam)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance, carrier and citations, the title and the producer lines", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "D:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect([ROSTER.bead, ROSTER.constants, ROSTER.terms, ROSTER.anchors, ROSTER.proposalFields, ROSTER.shippedFields, ROSTER.directiveMembers, ROSTER.residuals]).toEqual([BEAD, CONSTANTS, TERMS, ANCHORS, PROPOSAL_FIELDS, SHIPPED_FIELDS, DIRECTIVE_MEMBERS, RESIDUALS]);
    expect(TERMS.map(term => term.id)).toEqual(TERMS.map(term => term.words.join("-")));
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(RESIDUALS.map(residual => pins.includes(residual.quietPin))).toEqual(RESIDUALS.map(() => true));
    // The owner filing: the citation line carries the acceptance clause, the four labels joined, each label tiled by its pins.
    const { title, filing } = beadRow();
    const clause = clauseOf(filing);
    expect(clause).toBe(ROWS.map(row => row.label).join(" "));
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote)))).toEqual(ROWS.map(() => true));
    // The carrier: the seven fields; reason and min_interval read as no term, every other field as its own.
    const carrier = carrierOf(filing);
    expect(carrier).toEqual(PROPOSAL_FIELDS);
    expect(carrier.map(field => termIds(field))).toEqual(carrier.map(field => (CONSTANTS.commonFields.includes(field) ? [] : [words(field).join("-")])));
    // The title counts and bounds the fields.
    const span = /\((\w+) typed fields, (\w+)\.\.(\w+)\)/.exec(title);
    expect([NUMBER_WORDS.indexOf(span?.[1] ?? ""), span?.[2], span?.[3]]).toEqual([PROPOSAL_FIELDS.length, PROPOSAL_FIELDS[0], PROPOSAL_FIELDS[PROPOSAL_FIELDS.length - 1]]);
    // OUTSIDE ANCHORS: every seam name the export spells, read by its position and by its code shape - never by its own spelling
    // - reads as exactly one term; ANCHORS pins what the readers read today.
    const reads = outsideReads(title, filing);
    expect(unanchored([...reads.places, ...reads.shapes])).toEqual([]);
    expect(reads).toEqual(ANCHORS);
    // The readers' refusals are live on term-agnostic probes: a word beside a term, a doubled term, and a code shape that names no
    // term read as unanchored; a common field does not.
    const spelled = TERMS.map(term => term.words.join(" "));
    expect(unanchored(spelled.flatMap(text => [text, `the ${text}`, `${text} seam`, `${text} ${text}`]))).toEqual(spelled.flatMap(text => [`the ${text}`, `${text} seam`, `${text} ${text}`]));
    expect(unanchored([..."PriorityHint priority_hint FO-AC9 min_interval".matchAll(CODE_SHAPE)].map(match => match[0]))).toEqual(["PriorityHint", "priority_hint", "FO-AC9"]);
    // The tiling's refusals are live on term-agnostic probes too: quotes joined by gap characters tile their body, and an uncovered
    // tail, an interior word between two quotes, a quote out of order (re-reading text an earlier quote already tiled) and a quote
    // the body lacks do not.
    expect([tiled("one two, three", ["one", "two,", "three"]), tiled("one two three", ["one", "two"]), tiled("one gap two", ["one", "two"]), tiled("one two", ["one two", "two"]), tiled("one", ["one", "one two"])]).toEqual([true, false, false, false, false]);
    // The citations: every cited line is a vendored charter line at the bead pin.
    const cited = [...filing.matchAll(/:(\d+)@([0-9a-f]{12})/g)].map(match => [Number(match[1]), match[2] ?? ""] as const);
    expect(cited.map(([line]) => line)).toEqual([20, 22, 40]);
    expect(cited.map(([line, pin]) => producerLine(CHARTER, line) !== "" && ROSTER.producer.beadPin.startsWith(pin))).toEqual(cited.map(() => true));
    expect(filing.includes(CHARTER)).toBe(true);
    // The producer lines: each text is its recorded sha256; the charter names the fields, the ban, the narrow seam and the gate.
    const recorded = ROSTER.producer.files.flatMap(file => file.lines);
    expect(recorded.map(entry => sha256(entry.text))).toEqual(recorded.map(entry => entry.sha256));
    expect((/proposal `\(([^)]*)\)` remains data until a host arbiter applies it\./.exec(producerLine(CHARTER, 20))?.[1] ?? "").split(", ")).toEqual(PROPOSAL_FIELDS);
    expect(termIds(producerLine(CHARTER, 22))).toEqual(["control-directive", "fiber-runtime"]);
    expect(/no controller state mutation during `FiberRuntime\.emit` reentrant callbacks\. Existing `ControlDirective` is a narrow initial extension seam, not a second controller engine\.$/.test(producerLine(CHARTER, 22))).toBe(true);
    expect(/`ControlDirective\.(\w+)`/.exec(producerLine(CHARTER, 7))?.[1]).toBe(DIRECTIVE_MEMBERS[0]);
    expect(/FO-AC3 bounded controller emission and proposal arbitration integration in one host;/.test(producerLine(CHARTER, 40))).toBe(true);
    const control = ROSTER.producer.files.find(file => file.path === "src/fiber_optics/control.py");
    expect(control?.lines[0]?.text).toBe("class ControllerProposal:");
    expect(control?.lines.slice(1).map(entry => /^ {4}(\w+): /.exec(entry.text)?.[1])).toEqual(SHIPPED_FIELDS);
    expect([producerLine("src/fiber_optics/events.py", 143), /^ {4}(\w+): /.exec(producerLine("src/fiber_optics/events.py", 151))?.[1]]).toEqual(["class ControlDirective:", DIRECTIVE_MEMBERS[0]]);
    // The shipped record is the charter's seven, min_interval in nanoseconds, plus the host's sample time.
    expect([PROPOSAL_FIELDS.map(shippedAs), SHIPPED_FIELDS.filter(field => !PROPOSAL_FIELDS.map(shippedAs).includes(field))]).toEqual([SHIPPED_FIELDS.slice(0, PROPOSAL_FIELDS.length), ["sample_time_ns"]]);
    expect([ROSTER.producer.repository, ROSTER.producer.files.map(file => file.path)]).toEqual(["FiberOpticsSDK", [CHARTER, "src/fiber_optics/control.py", "src/fiber_optics/events.py"]]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
