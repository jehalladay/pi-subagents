/**
 * wb-gxd7.2 (GPC-FEEDBACK-CONTRACT-AUDIT-R2, program-triage-2026-10-22), the open-decisions posture census. Statement (bead
 * notes, full form; the filing's ellipsis and dash are U+2026 and U+2014, spelled "..." and "-" here, and its slash-joined
 * label list is spaced, since a star before a slash would close this comment): "No Pi surface shall encode any GP-FCA
 * candidate resolution (D-IDENT-1/2/3, D-STORE-1/2, D-EVAL-1/2/3, D-CANON-1, D-NAMES-1) or F* / RC-* / FCA-* label as gp
 * contract or allocated requirement (gating artifact: GP-REQ/ADR rulings per D-*, none entered, all '(open)'): Pi
 * pins only behaviour observed at a named gp sha, and any Pi text citing the program carries its 'Proposed ... NOT accepted
 * GraphPolicyCLI semantics' status verbatim with the GraphPolicyCLI sha it was read at"
 * (GraphPolicyCLI docs/programs/feedback-contract-audit-2026-10-21/02-contract-audit.md:3@0107c72992f3).
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): "(a) docs census: any sentence citing GP-FCA-2026-10-21,
 * a D-* or an FCA-* id carries the status literal and the GraphPolicyCLI sha it was read at; (b) no Pi fixture encodes a D-*
 * alternative (e.g. an `identity_unavailable` field or a `missing` store state) as expected producer output before a
 * GP-REQ/ADR id exists; (c) a dated TRACEABILITY row citing the adopted GP ruling id is required before any census allowlist
 * widens."
 *
 * THE SOURCE AT THE PIN (GraphPolicyCLI 0107c72992f35cf6832a37615a25c7df45747ebc, read with read-only git show and git grep
 * on the local hub clone by the cutting seat, 2026-10-23; the roster's `producer` block holds every line quoted here):
 * 02-contract-audit.md:3 "**Status:** Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI
 * semantics."; :111 "This document records candidates; it does not resolve them."; README.md:3 the program id
 * GP-FCA-2026-10-21, :25-31 the workstreams FCA-1..FCA-7, :37 "An audit hypothesis is not an amendment.";
 * 01-finding-inventory.md:9-21 the findings F01-F13, :29-37 the nine RC-* root causes, :52 the F*, RC-* and FCA-* ids "are
 * local audit tracking labels, not allocated GPR IDs"; the ten decisions D-IDENT-1 (02:30), D-IDENT-2 (:32), D-IDENT-3 (:42),
 * D-STORE-1 (:52), D-STORE-2 (:54-64), D-EVAL-1 (:82), D-EVAL-2 (:84), D-EVAL-3 (:86), D-CANON-1 (:96) and D-NAMES-1 (:100)
 * each read "(open)".
 * MEASURED PRODUCER FACTS (held in the roster's producer block and read there by MN, MT, MK, MO, MR and K2's shipped-schema
 * reading; the census never reads GraphPolicyCLI itself, so it is hermetic): gp's ruling ids are GP-REQ-<3 digits>
 * (requirements/ATOMIC-REQUIREMENTS.md), GPR-<4 digits> (docs/dev/RULINGS.md) and ADR-GP-<3 digits> (docs/program/15-adrs.md);
 * every graphpolicy digest domain ts/src spells is c1 (nine of them), and ts/src spells 45 versioned schema ids (the roster's
 * shippedSchemas; graphpolicy.identity.v1, the D-IDENT-1 descriptor's likely name, is not among them); ts/src and python/src
 * spell none of identity_unavailable, admissible-unbacked, lightweight, decision-grade, descriptor, hash_algorithm,
 * canonical_profile, byte_snapshot, logical_checkpoint, binding_record or artifact_address. gp ALREADY SHIPS three of the
 * candidate state words on two surfaces, which are observed behaviour, not candidates (OBSERVED): `gp inspect checkpoint
 * --store --json` answers {checkpoint, state, bytes_present[, quarantine_record]} with state quarantined, available or missing
 * (ts/src/cli/inspect-checkpoint-store.ts:41-46, checkpoint-store.ts:79,92-93), and a training refusal carries
 * {code: GP_TRAIN_*, record, state} (ts/src/training/credit-basis.ts:288, state "missing" among others). D-STORE-2's `missing`
 * is the candidate for the eval/sample/promote store gate, which admits an absent checkpoint silently today (02:48-50).
 *
 * READINGS
 * - SCANNED: every regular file below docs/, src/, .agents/ (Pi's installed skills), qa/, test/ and examples/, and the
 *   repository root's .md pages, read as UTF-8; a symlink is refused, never followed. This file and its roster are EXEMPT:
 *   walked, never judged (row A3). The walk is held to an INDEPENDENT LISTING (node's recursive readdirSync over the same
 *   roots, a different code path): the walked set equals the listed set exactly, and the judged sets equal the listing minus
 *   the exemptions, counted at run time (no count floor, no frozen count).
 * - (a) SENTENCE: a file's text cut at a run of white space after ".", "!", "?" or ";", at a blank line and before a line
 *   opening a table row ("|"); a .md file is also cut before a line opening a list item. A code comment's wrapped lines stay
 *   one sentence; the sentence is FLATTENED before it is read (a continuation line's leading "//", "*", "#" or ">" and the
 *   white space around it become one space, white space runs collapse).
 * - (a) CITATION: a sentence cites the program when a family matches it: N1 the program (GP-FCA, any date, or its directory
 *   name feedback-contract-audit; any case and separator), N2 a decision (D-IDENT, D-STORE, D-EVAL, D-CANON or D-NAMES,
 *   numbered or not), N3 a workstream (FCA-<n>), N4 a root cause (RC- and one of the program's nine words: EVAL, STORE,
 *   IDENT, ERROR, SKILL, NAMES, FIXTURE, PERF, PRESERVE), and N5 a finding (F<two digits>), which counts only beside the GP
 *   ANCHOR (GraphPolicy in any spelling, or the word gp). N2-N5 are read only in the upper case and hyphenated form the
 *   program spells, and no family reads a name joined to a longer hyphenated identifier: the queue-measured look-alikes
 *   (Pi's ReactiveComponents constants RC_FAMILY and RC_PIN, the RC DEVELOPER.md path, the requirement tag
 *   GPC-FEEDBACK-CONTRACT-AUDIT-R<n>, a scratch prefix rc-ident-) are pinned near misses (row MN).
 * - (a) FINDING: a citing sentence that does not carry BOTH the STATUS LITERAL (verbatim, case and punctuation included:
 *   "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics") and a SHA (a 7- to
 *   40-character lowercase hex token holding a digit and a letter), reported `<path>:<line> <families>: <diagnosis>`,
 *   diagnosis lacks-status, lacks-sha or lacks-status+sha.
 * - (b) GP DOCUMENT: a JSON object (a .json file, each .jsonl line, a JSON text inside a string) or a module's object
 *   literal (every script kind, parsed by the TypeScript compiler; string values constant-folded) whose own `schema`
 *   property is a versioned gp schema id (SCHEMA_ID: graphpolicy.<name>.v<N>, gp.rpc.<name>/v<N> or gp.cli.<name>/v<N>),
 *   as every gp envelope, reply and receipt declares itself. Its subtree is EXPECTED PRODUCER OUTPUT. A gp digest, code or
 *   schema id quoted under any other key marks nothing: a Pi record that holds a gp value (a carrier, a gate record, a
 *   GraphDataIR schema_ref) is not gp output.
 * - (b) FINDING: a member of MEMBERS inside a gp document, reported `<path>[:<line>]#<pointer> <member>: <evidence>`.
 *   There is exactly one member per tokened decision. K1-K5 and K7 read words (a key or string value split at separators and
 *   case changes, lower-cased, holding one of the member's word runs): K1 identity unavailable (D-CANON-1), K2 descriptor,
 *   hash algorithm, canonical profile (D-IDENT-1, which also reads its versioned identity descriptor or new namespace: a
 *   graphpolicy c<N> digest domain with N other than 1, or a versioned gp schema id gp does not ship at the pin), K3 byte
 *   snapshot, host serializer (D-IDENT-2), K4 theta words, logical checkpoint (D-IDENT-3), K5 binding record, artifact address
 *   (D-STORE-1), K7 lightweight, decision grade (D-EVAL-1). K6 (D-STORE-2) reads a STATE: a string value missing,
 *   admissible-unbacked, verified, eligible or quarantined under a key naming a state, a status, the store or the checkpoint,
 *   unless its object is an OBSERVED shape (O1 the inspect-checkpoint answer, O2 the training refusal). D-EVAL-2, D-EVAL-3 and
 *   D-NAMES-1 are UNTOKENED: their alternatives are behaviours with no distinctive spelling (row R16).
 * - (c) ALLOWLIST: ALLOWLIST holds the entries that admit a finding of row A (by path and family) or row B (by path and
 *   member); it is empty. An entry is ADMITTED only when its ruling is a gp ruling id (RULING: GP-REQ-<3 digits>,
 *   GPR-<4 digits> or ADR-GP-<3 digits>; the program's own F*, RC-*, FCA-* and D-* labels are refused, 01:52) and a DATED
 *   TRACEABILITY ROW cites it: a table row of docs/workbench/TRACEABILITY.md (a line opening with "|") carrying the ruling id
 *   as a whole token and a real calendar date YYYY-MM-DD. A refused entry admits nothing and is reported, and so is an
 *   admitted entry that silences no finding (stale). TRACEABILITY.md is frozen byte-exact today
 *   (test/workbench-traceability-freeze.test.ts, standing rule 13) and carries no dated row and no gp ruling id, so every
 *   widening is refused until a dated row lands through whatever route the owner opens.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the walk (exact sets against the independent listing, per-root anchors, the root pages, no symlink,
 *    nothing unreadable); A2 the live census returns no finding; A3 each exemption is load-bearing (this file under rows A and
 *    B, the roster under row A); A4 the acceptance's mutants - one citing plant per scanned root and the root pages, each read
 *    exactly, each marked twin quiet.
 *  B, acceptance (b). B1 the live read (every JSON file parses, the landed gp stand-ins of test/helpers/gp-fallback-census.ts
 *    read as gp documents); B2 the live census returns no finding; B3 one plant per member across file kinds, each read
 *    exactly, each unmarked or observed twin quiet.
 *  C, acceptance (c). C1 the live allowlist and the live TRACEABILITY reading; C2 the admission judge, refusal by refusal;
 *    C3 the allowlist is load-bearing: only an admitted entry silences its finding,
 *    and an admitted entry that silences nothing is reported stale.
 *  F, the outside anchor (below).
 *  M, the instruments rows A-C read, each pinned member by member: MS1-MS4 the sentence cutter, MN1-MN5 every family
 *    spelling and every producer label, MA the gp anchor, MT the status literal, MH the sha, MF the finding format, MW the
 *    word splitter, MM the gp-document reading, MK every member on a key and a value, MO the observed shapes and the state
 *    keys, MJ the module reader, MR the ruling grammar.
 *  R, the residuals' pinned quiet rows.
 * OUTSIDE ANCHOR. F1: the owner filing's row of wb-gxd7.2 in the tracked bead export (.beads/issues.jsonl). Its acceptance
 * holds exactly the clauses (a)-(c), each equal to its row label; its statement's decision list expands to exactly DECISIONS,
 * each read by a family, every DECISION_WORDS member used by it, and each decision is either exactly one member's or UNTOKENED,
 * never both; its label prefixes F, RC- and FCA- are read by one distinct family each, and clause (a)'s program id by one; its
 * own producer words ("as gp contract", "the GraphPolicyCLI sha") each anchor a finding label; its quote carries the STATUS
 * LITERAL and its ellipsis form is the literal's head and tail; its citation path is read as the program and its sha is a
 * SHA; clause (b)'s two examples are each read by one member (a words member, the state member); its ruling kinds GP-REQ and
 * ADR head RULING alternatives; clause (c) names the TRACEABILITY file this census reads and a dated row. These assertions
 * name no family or member id, so a row, a decision, a decision word, a family, an anchor word or a member (each the only one
 * of its decision) removed from every literal of this file and the roster still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label
 * and pins, every pin's witness, the vocabularies and the probe constants - is held to the out-of-file roster
 * (test/fixtures/gp-fca-open-decisions-roster.json). The first case and the last case each read the vitest task tree: every
 * other registered test is in run mode and not inverted, and the last case finds every pin's case ran to its end. Not
 * claimed: a pin of rows M or R removed from ROWS, the literal, IMPL and the roster together; a word run or spelling inside a
 * member or a family other than the filing's own, an RC word, an observed shape or a shipped schema id removed from every
 * literal (F1 anchors decisions, decision words, families, anchor words and the two examples, not each alternative).
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 R-LITERAL-ANYWHERE the literal and a sha anywhere in a sentence
 *   admit it, whatever else it claims; R2 R-ANY-SHA any hex token reads as the GraphPolicyCLI sha (never resolved against gp's
 *   history); R3 R-SPLIT a claim carried by a later sentence that names no family; R4 R-LOWERCASE-LABEL a label spelled in
 *   lower or mixed case; R5 R-FUSED-OR-JOINED a label with its parts fused or joined by "_", white space or a dash other
 *   than the hyphen-minus (an en dash, an em dash, a non-breaking hyphen); R6 R-UNPADDED-FINDING an unpadded F-label
 *   or one without the gp anchor; R7 R-PARAPHRASE the program described outside its id, directory name and labels; R8
 *   R-LOOKALIKE a look-alike letter inside a label; R9 R-RENDERED an inserted invisible, a soft hyphen or intraword emphasis;
 *   R10 R-ENCODED an HTML reference or a JS escape inside a label; R11 R-OUTSIDE-ROOTS a file outside the scanned trees
 *   (new-feedback/, vendor/, media/, dist/, node_modules/, .beads/); R12 R-UNMARKED-FRAGMENT a producer fragment declaring no
 *   gp schema of its own (a quoted digest or code marks nothing); R13 R-DETACHED-MARKER a member beside, not below, a gp
 *   document (a GraphDataIR schema_ref included); R14 R-INDIRECT-VALUE a key or value
 *   assembled at run time (a computed key, a spread, a shorthand, a variable, a call); R15 R-PROSE-FIXTURE JSON inside a .md
 *   or other non-JSON, non-module file; R16 R-UNTOKENED-DECISIONS a fixture encoding a D-EVAL-2, D-EVAL-3 or D-NAMES-1
 *   behaviour; R17 R-UNKEYED-STATE a candidate state word under a key naming no state, status, store or checkpoint; R18
 *   R-RULING-UNVERIFIED a well-formed ruling id with a dated row is admitted without reading gp's requirements system; R19
 *   R-OBSERVED-SHAPE-BREADTH an observed shape admits its states wherever an object carries exactly its keys; R20
 *   R-FUSED-WORDS a member's word run fused into one word (identityunavailable) in row B; R21 R-TYPE-DECLARATION a member
 *   spelled in a type, an interface or another declaration rather than a literal value (row B reads literals only).
 * SCOPE: the vocabularies are this cut's reading of the filing and the program at the pin (another program's RC- label
 * spelled with one of the nine words would read as this program's); the producer facts are measured at
 * the pin and not re-read here (the census is hermetic), so a gp change is seen only when a cut re-measures the roster. The
 * allowlist of (c) is this census's (rows A and B share it). A later census that needs these labels as needles adds its own
 * file to EXEMPT in its cut, beside an A3-style reading, or carries the status literal and a sha in each citing sentence.
 *
 * Display paths added: none. Test-only: the scanned trees, the plants and the TRACEABILITY stand-ins live in makeScratch
 * scratch; src, docs, qa, the skills and the bead export are only read.
 */
import { type Dirent, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, type RunnerTask, type RunnerTestCase } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-gp-fca-open-decisions-census.test.ts";
const ROSTER_FILE = "test/fixtures/gp-fca-open-decisions-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const TRACE_FILE = "docs/workbench/TRACEABILITY.md";
const BEAD = "wb-gxd7.2";
const EXEMPT: readonly string[] = [SELF, ROSTER_FILE];

/** The producer pin and the Pi sha the filing read its 0-hit count at (owner filing). */
const PIN = "0107c72992f3";
const FILING_READ = "d75b68d1";

interface ScanRoot {
  readonly root: string;
  readonly anchor: string;
  readonly token: string;
}
/** The scanned trees; each anchor file must be walked and read. The walked set is held to the independent listing (A1). */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "docs", anchor: "docs/workbench/03-architecture-and-ownership.md", token: "Pi carries no GraphPolicyCLI (gp) integration today" },
  { root: "src", anchor: "src/workbench/redaction.ts", token: "export function sanitizeWorkbenchText" },
  { root: ".agents", anchor: ".agents/skills/beads/SKILL.md", token: "name: beads" },
  { root: "qa", anchor: "qa/workbench/receipts-index.mjs", token: "docs/workbench/receipts" },
  { root: "test", anchor: "test/helpers/gp-fallback-census.ts", token: "graphpolicy.cli.v1" },
  { root: "examples", anchor: "examples/agent-tool-description.md", token: "Available agent types" },
];
const PAGE_ANCHOR = { file: "README.md", token: "pi-subagents" };
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"];

/** The separator class between the parts of a name: any run of white space, "_" or "-". */
const SEP = "[\\s_-]*";
/** The five decision families of the program (02:30-100), as N2 spells them. */
const DECISION_WORDS: readonly string[] = ["IDENT", "STORE", "EVAL", "CANON", "NAMES"];
/** The nine root causes of the program (01-finding-inventory.md:29-37), as N4 spells them. */
const ROOT_CAUSE_WORDS: readonly string[] = ["EVAL", "STORE", "IDENT", "ERROR", "SKILL", "NAMES", "FIXTURE", "PERF", "PRESERVE"];
interface Family {
  readonly id: string;
  /** A CONTEXT family reads only in a sentence that carries the GP ANCHOR. */
  readonly context: boolean;
  readonly source: string;
  readonly flags: string;
  /** One spelling per alternative and separator form, in order (row MN pins each one). */
  readonly spellings: readonly string[];
  /** Spellings the family must not read (row MN pins each one; the queue-measured look-alikes among them). */
  readonly nearMisses: readonly string[];
}
/** (a)'s citation families. N1 is read in any case; N2-N5 in the upper case and the hyphenated form the program spells. */
const FAMILIES: readonly Family[] = [
  {
    id: "N1",
    context: false,
    source: `(?<![A-Za-z0-9-])GP${SEP}FCA(?![A-Za-z])|(?<![A-Za-z0-9-])feedback${SEP}contract${SEP}audit(?![A-Za-z])`,
    flags: "i",
    spellings: ["GP-FCA-2026-10-21", "GP-FCA", "gp fca", "GP_FCA_2026_10_21", "feedback-contract-audit-2026-10-21", "feedback contract audit"],
    nearMisses: ["[GPC-FEEDBACK-CONTRACT-AUDIT-R2]", "wb-gp-fca-x", "GPFCAX", "feedback and contract audit"],
  },
  {
    id: "N2",
    context: false,
    source: `(?<![\\w-])D-(?:${DECISION_WORDS.join("|")})(?:-\\d+)?(?![\\w-])`,
    flags: "",
    spellings: ["D-IDENT-1", "D-STORE-2", "D-EVAL-3", "D-CANON-1", "D-NAMES-1", "D-EVAL"],
    nearMisses: ["D_STORE_1", "D IDENT 2", "x-D-STORE-2", "D-STORE-2x", "D-STOREX", "GC-D03"],
  },
  { id: "N3", context: false, source: "(?<![\\w-])FCA-\\d+(?![\\w-])", flags: "", spellings: ["FCA-1", "FCA-7"], nearMisses: ["FCA_3", "FCA 6", "FCA2", "GP-FCA-2026", "FCA-2x"] },
  {
    id: "N4",
    context: false,
    source: `(?<![\\w-])RC-(?:${ROOT_CAUSE_WORDS.join("|")})(?![\\w-])`,
    flags: "",
    spellings: ["RC-IDENT", "RC-STORE", "RC-PRESERVE"],
    nearMisses: ["RC_FAMILY", "RC_PIN", "RC DEVELOPER", "RC-DEVELOPER", "RC-IDENTITY", "RC_EVAL", "rc-ident-"],
  },
  { id: "N5", context: true, source: "(?<![\\w-])F\\d{2}(?![\\w-])", flags: "", spellings: ["F01", "F07", "F13"], nearMisses: ["F7", "F123", "xF07", "F07x"] },
];
const FAMILY_PATTERNS: ReadonlyMap<string, RegExp> = new Map(FAMILIES.map(family => [family.id, new RegExp(family.source, family.flags)]));
/** The GP ANCHOR a CONTEXT family needs in its sentence. */
const ANCHOR = /graph[\s_.-]?policy|\bgp\b/i;
/** The program's status, verbatim (02-contract-audit.md:3 without its emphasis and its closing period). */
const STATUS_LITERAL = "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics";
/** A git sha as a citation spells it: 7 to 40 lowercase hex characters, holding a digit and a letter, whole. */
const SHA = /(?<![0-9A-Za-z])(?=[0-9a-f]*[0-9])(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}(?![0-9A-Za-z])/;

/** (b): a versioned gp schema id, as a gp document declares its own `schema`. */
const SCHEMA_ID = /^(?:graphpolicy\.[a-z0-9][a-z0-9_.-]*\.v\d+|gp\.(?:rpc|cli)\.[a-z0-9_.-]+\/v\d+)$/;
/** Whether a value is a gp document: an object whose own `schema` property is a versioned gp schema id. */
const isGpDocument = (value: unknown): boolean => isObject(value) && typeof value.schema === "string" && SCHEMA_ID.test(value.schema);
/** (b) K2's namespace reading: a graphpolicy digest domain; its c<N> version is group 1. */
const NAMESPACE = /^graphpolicy\.(?:[a-z0-9_-]+\.)*c(\d+)(?::[0-9a-f]*)?$/;
type Reading = "words" | "state";
interface Member {
  readonly id: string;
  readonly decision: string;
  readonly reading: Reading;
  /** The word runs a words member reads, or the whole-value states a state member reads. */
  readonly runs: readonly (readonly string[])[];
  /** Whether the member also reads a versioned new namespace (D-IDENT-1): a graphpolicy c<N> domain with N other than 1, or a
   * versioned gp schema id gp does not ship at the pin (the roster's measured shippedSchemas). */
  readonly namespace: boolean;
  readonly source: string;
}
/** (b)'s members, exactly one per tokened decision; the runs are the program's own words for the candidate (02-contract-audit.md). */
const MEMBERS: readonly Member[] = [
  { id: "K1", decision: "D-CANON-1", reading: "words", runs: [["identity", "unavailable"]], namespace: false, source: "02-contract-audit.md:96" },
  { id: "K2", decision: "D-IDENT-1", reading: "words", runs: [["descriptor"], ["hash", "algorithm"], ["canonical", "profile"]], namespace: true, source: "02-contract-audit.md:30" },
  { id: "K3", decision: "D-IDENT-2", reading: "words", runs: [["byte", "snapshot"], ["host", "serializer"]], namespace: false, source: "02-contract-audit.md:32" },
  { id: "K4", decision: "D-IDENT-3", reading: "words", runs: [["theta", "words"], ["logical", "checkpoint"]], namespace: false, source: "02-contract-audit.md:42" },
  { id: "K5", decision: "D-STORE-1", reading: "words", runs: [["binding", "record"], ["artifact", "address"]], namespace: false, source: "02-contract-audit.md:52" },
  {
    id: "K6",
    decision: "D-STORE-2",
    reading: "state",
    runs: [["missing"], ["admissible", "unbacked"], ["verified"], ["eligible"], ["quarantined"]],
    namespace: false,
    source: "02-contract-audit.md:59-63",
  },
  { id: "K7", decision: "D-EVAL-1", reading: "words", runs: [["lightweight"], ["decision", "grade"]], namespace: false, source: "02-contract-audit.md:82" },
];
/** The program's ten open decisions, in document order. */
const DECISIONS: readonly string[] = ["D-IDENT-1", "D-IDENT-2", "D-IDENT-3", "D-STORE-1", "D-STORE-2", "D-EVAL-1", "D-EVAL-2", "D-EVAL-3", "D-CANON-1", "D-NAMES-1"];
/** The decisions whose alternatives are behaviours with no distinctive spelling (R16). */
const UNTOKENED: readonly string[] = ["D-EVAL-2", "D-EVAL-3", "D-NAMES-1"];
interface Observed {
  readonly id: string;
  readonly required: readonly string[];
  readonly optional: readonly string[];
  readonly codePrefix: string | null;
  /** The states gp answers in this shape; null when the shape carries any state. */
  readonly states: readonly string[] | null;
  readonly source: string;
}
/** The shapes in which gp ships a K7 word at the pin: observed behaviour, never a candidate. */
const OBSERVED: readonly Observed[] = [
  {
    id: "O1",
    required: ["checkpoint", "state", "bytes_present"],
    optional: ["quarantine_record"],
    codePrefix: null,
    states: ["quarantined", "available", "missing"],
    source: "ts/src/cli/inspect-checkpoint-store.ts:41-46",
  },
  { id: "O2", required: ["code", "record", "state"], optional: [], codePrefix: "GP_TRAIN_", states: null, source: "ts/src/training/credit-basis.ts:288" },
];

/** (c): an allowlist entry admits the findings of `row` at `path` whose family or member is `member`. */
interface AllowEntry {
  readonly row: "A" | "B";
  readonly path: string;
  readonly member: string;
  readonly ruling: string;
}
const ALLOWLIST: readonly AllowEntry[] = [];
/** (c): gp's ruling ids (requirements/ATOMIC-REQUIREMENTS.md, docs/dev/RULINGS.md, docs/program/15-adrs.md at the pin). */
const RULING_KINDS: readonly string[] = ["GP-REQ-\\d{3}", "GPR-\\d{4}", "ADR-GP-\\d{3}"];
const RULING = new RegExp(`^(?:${RULING_KINDS.join("|")})$`);
const ISO_DATE = /(?<!\d)(\d{4})-(\d{2})-(\d{2})(?!\d)/g;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) docs census: any sentence citing GP-FCA-2026-10-21, a D-* or an FCA-* id carries the status literal and the GraphPolicyCLI sha it was read at",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) no Pi fixture encodes a D-* alternative (e.g. an `identity_unavailable` field or a `missing` store state) as expected producer output before a GP-REQ/ADR id exists",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) a dated TRACEABILITY row citing the adopted GP ruling id is required before any census allowlist widens",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-gxd7.2 in the tracked bead export names exactly the clauses rows A-C cover, states each of their labels as its clause, and carries every decision, label prefix, example, ruling kind and constant the census reads",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the sentence cutter, the families, the anchor, the status and sha readers, the finding format, the word splitter, the marker, the members, the observed shapes, the module reader and the ruling grammar judge their pinned inputs in order",
    pins: ["MS1", "MS2", "MS3", "MS4", "MN1", "MN2", "MN3", "MN4", "MN5", "MA", "MT", "MH", "MF", "MW", "MM", "MK", "MO", "MJ", "MR"],
  },
  {
    id: "R",
    label: "the named residuals R1-R21 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15", "R16", "R17", "R18", "R19", "R20", "R21"],
  },
];
const FIRST_TITLE = "the judged set: the frozen shape, the out-of-file roster and the cases agree";
const RECORD_TITLE = "the record: every pin's case ran to its end, in run mode";

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function asStrings(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${name} must be a list of strings`);
  return [...value];
}

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Labels {
  readonly decisions: readonly string[];
  readonly workstreams: readonly string[];
  readonly rootCauses: readonly string[];
  readonly findings: readonly string[];
}
/** A producer line measured at the pin (header, THE SOURCE AT THE PIN and MEASURED PRODUCER FACTS). */
interface Site {
  readonly id: string;
  readonly path: string;
  readonly lines: string;
  readonly text: string;
}
interface Roster {
  readonly constants: Json;
  readonly sites: readonly Site[];
  readonly labels: Labels;
  readonly digestDomains: readonly string[];
  readonly shippedSchemas: readonly string[];
  readonly rulingSamples: readonly string[];
  readonly rows: readonly RosterRow[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Object.hasOwn(raw, "constants") || !isObject(raw.producer)) {
    throw new Error("roster must be an object with constants, a producer and a rows list");
  }
  const producer = raw.producer;
  const labels = producer.labels;
  if (!isObject(labels) || !Array.isArray(producer.sites)) throw new Error("roster producer needs a labels object and a sites list");
  const sites = producer.sites.map((site: unknown, index: number): Site => {
    if (!isObject(site) || typeof site.id !== "string" || typeof site.path !== "string" || typeof site.lines !== "string" || typeof site.text !== "string") {
      throw new Error(`roster producer.sites[${index}] needs an id, a path, lines and a text`);
    }
    return { id: site.id, path: site.path, lines: site.lines, text: site.text };
  });
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    constants: JSON.parse(JSON.stringify(raw.constants)) as Json,
    sites,
    labels: {
      decisions: asStrings(labels.decisions, "producer.labels.decisions"),
      workstreams: asStrings(labels.workstreams, "producer.labels.workstreams"),
      rootCauses: asStrings(labels.rootCauses, "producer.labels.rootCauses"),
      findings: asStrings(labels.findings, "producer.labels.findings"),
    },
    digestDomains: asStrings(producer.digestDomains, "producer.digestDomains"),
    shippedSchemas: asStrings(producer.shippedSchemas, "producer.shippedSchemas"),
    rulingSamples: asStrings(producer.rulingSamples, "producer.rulingSamples"),
    rows,
  };
}
const ROSTER = readRoster();
/** The versioned gp schema ids ts/src spells at the pin (measured; K2 reads any other one inside a gp document). */
const SHIPPED_SCHEMAS: ReadonlySet<string> = new Set(ROSTER.shippedSchemas);

/** The producer site `id`'s text (a missing site is refused, never read as empty). */
function siteText(id: string): string {
  const found = ROSTER.sites.find(site => site.id === id);
  if (found === undefined) throw new Error(`the roster holds no producer site ${id}`);
  return found.text;
}
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The constants the roster pins beside the rows. */
function constants(): Json {
  return {
    bead: BEAD,
    pin: PIN,
    filingRead: FILING_READ,
    exempt: [...EXEMPT],
    traceFile: TRACE_FILE,
    scanRoots: SCAN_ROOTS.map(({ root, anchor, token }) => ({ root, anchor, token })),
    pageAnchor: { ...PAGE_ANCHOR },
    moduleExtensions: [...MODULE_EXTENSIONS],
    decisionWords: [...DECISION_WORDS],
    rootCauseWords: [...ROOT_CAUSE_WORDS],
    families: FAMILIES.map(({ id, context, source, flags, spellings, nearMisses }) => ({ id, context, source, flags, spellings: [...spellings], nearMisses: [...nearMisses] })),
    anchor: `${ANCHOR.source}/${ANCHOR.flags}`,
    statusLiteral: STATUS_LITERAL,
    sha: SHA.source,
    schemaId: SCHEMA_ID.source,
    namespace: NAMESPACE.source,
    members: MEMBERS.map(({ id, decision, reading, runs, namespace, source }) => ({ id, decision, reading, runs: runs.map(run => [...run]), namespace, source })),
    decisions: [...DECISIONS],
    untokened: [...UNTOKENED],
    observed: OBSERVED.map(({ id, required, optional, codePrefix, states, source }) => ({
      id,
      required: [...required],
      optional: [...optional],
      codePrefix,
      states: states === null ? null : [...states],
      source,
    })),
    allowlist: ALLOWLIST.map(({ row, path, member, ruling }) => ({ row, path, member, ruling })),
    rulingKinds: [...RULING_KINDS],
  };
}

const posix = (path: string): string => path.split(sep).join("/");
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`/`start`, root-relative with "/" separators, in name order; symlinks are refused. */
function walk(root: string, start: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(join(root, start));
  return { files, symlinks, unreadable };
}
/** The INDEPENDENT LISTING: node's own recursive readdirSync over the same root, regular files only, sorted. */
function listing(root: string, start: string): string[] {
  try {
    return readdirSync(join(root, start), { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => posix(relative(root, join(entry.parentPath, entry.name))))
      .sort();
  } catch {
    return [];
  }
}
/** The root's .md pages by name and lstat, a second code path beside the walk's Dirent reading. */
function listedPages(root: string): string[] {
  let names: string[] = [];
  try {
    names = readdirSync(root);
  } catch {
    return [];
  }
  return names
    .filter(name => {
      try {
        return name.endsWith(".md") && lstatSync(join(root, name)).isFile();
      } catch {
        return false;
      }
    })
    .sort();
}
function sameSet(left: readonly string[], right: readonly string[]): boolean {
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.length === sortedRight.length && sortedLeft.every((item, index) => item === sortedRight[index]);
}

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++) if (text[index] === "\n") starts.push(index + 1);
  return starts;
}
/** The 0-based line holding `offset`. */
function lineAt(starts: readonly number[], offset: number): number {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((starts[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }
  return low;
}

/** A terminator cut never follows a line-leading list number ("1. five" stays one sentence). */
const CUT = /(?<=[.!?;])(?<!(?:^|\n)[ \t]*\d+\.)\s+|\n[ \t]*\n|\n(?=[ \t]*\|)/g;
const CUT_MARKDOWN = /(?<=[.!?;])(?<!(?:^|\n)[ \t]*\d+\.)\s+|\n[ \t]*\n|\n(?=[ \t]*\|)|\n(?=[ \t]*(?:[-+*]|\d+[.)])[ \t])/g;
interface Sentence {
  readonly line: number;
  readonly text: string;
}
/** A text's sentences (header, READINGS (a) SENTENCE), each with the 1-based line its first character sits on. */
function sentencesOf(text: string, markdown: boolean): Sentence[] {
  const starts = lineStarts(text);
  const sentences: Sentence[] = [];
  let from = 0;
  const take = (to: number): void => {
    const body = text.slice(from, to);
    if (body.trim() === "") return;
    sentences.push({ line: lineAt(starts, from + body.length - body.trimStart().length) + 1, text: body.trim() });
  };
  for (const match of text.matchAll(markdown ? CUT_MARKDOWN : CUT)) {
    const at = match.index ?? 0;
    take(at);
    from = at + match[0].length;
  }
  take(text.length);
  return sentences;
}
/** A sentence flattened: a continuation line's leading comment or quote mark and its white space become one space. */
const CONTINUATION = /\n[ \t]*(?:\/\/+|\*+|#+|>+)?[ \t]*/g;
const flatten = (text: string): string => text.replace(CONTINUATION, " ").replace(/\s+/g, " ").trim();

/** The families a flattened text cites, in FAMILIES order; a CONTEXT family only beside the anchor. */
function familiesOf(text: string, anchored: boolean = ANCHOR.test(text)): string[] {
  return FAMILIES.filter(family => (!family.context || anchored) && FAMILY_PATTERNS.get(family.id)?.test(text) === true).map(family => family.id);
}
interface Citation {
  readonly line: number;
  readonly families: readonly string[];
  readonly diagnosis: string;
}
/** (a): one file's citing sentences that lack the status literal, the sha or both (header, READINGS (a) FINDING). */
function citationsOf(path: string, text: string): Citation[] {
  return sentencesOf(text, path.endsWith(".md")).flatMap(sentence => {
    const flat = flatten(sentence.text);
    const families = familiesOf(flat);
    if (families.length === 0) return [];
    const status = flat.includes(STATUS_LITERAL);
    const sha = SHA.test(flat);
    if (status && sha) return [];
    return [{ line: sentence.line, families, diagnosis: !status && !sha ? "lacks-status+sha" : !status ? "lacks-status" : "lacks-sha" }];
  });
}
const citationText = (path: string, citation: Citation): string => `${path}:${citation.line} ${citation.families.join("+")}: ${citation.diagnosis}`;

/** A key or value as words: split at every non-alphanumeric run and every case change, lower-cased. */
function wordsOf(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}
function holdsRun(words: readonly string[], run: readonly string[]): boolean {
  for (let start = 0; start + run.length <= words.length; start++) if (run.every((word, at) => words[start + at] === word)) return true;
  return false;
}
const sameWords = (left: readonly string[], right: readonly string[]): boolean => left.length === right.length && left.every((word, at) => right[at] === word);
/** K7's keys: a key whose last word is state or status, or which names the store or the checkpoint. */
function isStateKey(key: string): boolean {
  const words = wordsOf(key);
  const last = words[words.length - 1];
  return last === "state" || last === "status" || words.includes("store") || words.includes("checkpoint");
}
/** Whether `parent` is an OBSERVED shape answering `value` under its `state` key. */
function observedState(parent: { [key: string]: unknown }, key: string, value: string): boolean {
  if (key !== "state") return false;
  const keys = Object.keys(parent);
  return OBSERVED.some(
    shape =>
      shape.required.every(name => keys.includes(name)) &&
      keys.every(name => shape.required.includes(name) || shape.optional.includes(name)) &&
      (shape.codePrefix === null || (typeof parent.code === "string" && parent.code.startsWith(shape.codePrefix))) &&
      (shape.states === null || shape.states.includes(value)),
  );
}
interface Hit {
  readonly pointer: string;
  readonly member: string;
  readonly evidence: string;
}
const escapePointer = (key: string): string => key.replace(/~/g, "~0").replace(/\//g, "~1");
function parsedJson(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}
function keyHits(key: string, pointer: string): Hit[] {
  const words = wordsOf(key);
  return MEMBERS.filter(member => member.reading === "words" && member.runs.some(run => holdsRun(words, run))).map(member => ({ pointer, member: member.id, evidence: `key ${key}` }));
}
function stringHits(value: string, pointer: string, key: string | null, parent: { [key: string]: unknown } | null): Hit[] {
  const words = wordsOf(value);
  const hits: Hit[] = [];
  for (const member of MEMBERS) {
    const named = member.reading === "words" && member.runs.some(run => holdsRun(words, run));
    const versioned = member.namespace && ((NAMESPACE.exec(value)?.[1] ?? "1") !== "1" || (SCHEMA_ID.test(value) && !SHIPPED_SCHEMAS.has(value)));
    if (named || versioned) hits.push({ pointer, member: member.id, evidence: `value ${JSON.stringify(value)}` });
    if (member.reading === "state" && key !== null && isStateKey(key) && member.runs.some(run => sameWords(run, words)) && !(parent !== null && observedState(parent, key, value))) {
      hits.push({ pointer, member: member.id, evidence: `state ${key}=${JSON.stringify(value)}` });
    }
  }
  return hits;
}
/** (b) over one JSON value: every member inside a gp document; a string holding JSON is read as that JSON, in place. */
function judgeJson(root: unknown): Hit[] {
  const hits: Hit[] = [];
  const visit = (node: unknown, pointer: string, gp: boolean, key: string | null, parent: { [key: string]: unknown } | null): void => {
    if (typeof node === "string") {
      const nested = parsedJson(node);
      if (nested !== undefined) visit(nested, pointer, gp, key, null);
      else if (gp) hits.push(...stringHits(node, pointer, key, parent));
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, index) => {
        visit(item, `${pointer}/${index}`, gp, key, null);
      });
      return;
    }
    if (!isObject(node)) return;
    const inGp = gp || isGpDocument(node);
    for (const [name, child] of Object.entries(node)) {
      const at = `${pointer}/${escapePointer(name)}`;
      if (inGp) hits.push(...keyHits(name, at));
      visit(child, at, inGp, name, node);
    }
  };
  visit(root, "", false, null, null);
  return hits;
}
const hitText = (locator: string, hit: Hit): string => `${locator}#${hit.pointer} ${hit.member}: ${hit.evidence}`;

function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (path.endsWith(".js") || path.endsWith(".mjs") || path.endsWith(".cjs")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
/** A string or template literal, parenthesized, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
const OPAQUE = Symbol("opaque");
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current) || ts.isNonNullExpression(current)) {
    current = current.expression;
  }
  return current;
}
function propertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
}
/** A literal expression as a value: strings fold, objects and arrays recurse, anything else is OPAQUE (R14). */
function literalOf(node: ts.Expression): unknown {
  const bare = unwrap(node);
  const text = fold(bare);
  if (text !== undefined) return text;
  if (ts.isNumericLiteral(bare)) return Number(bare.text);
  if (bare.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (bare.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (bare.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(bare)) return bare.elements.map(element => (ts.isSpreadElement(element) || ts.isOmittedExpression(element) ? OPAQUE : literalOf(element)));
  if (ts.isObjectLiteralExpression(bare)) {
    const value: { [key: string]: unknown } = {};
    for (const property of bare.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = propertyName(property.name);
      if (name !== undefined) Object.defineProperty(value, name, { value: literalOf(property.initializer), enumerable: true, configurable: true, writable: true });
    }
    return value;
  }
  return OPAQUE;
}
/** The nearest enclosing node of `node` past type and parenthesis wrappers. */
function unwrapParent(node: ts.Node): ts.Node {
  let parent: ts.Node = node.parent;
  while (ts.isParenthesizedExpression(parent) || ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent) || ts.isTypeAssertionExpression(parent) || ts.isNonNullExpression(parent)) {
    parent = parent.parent;
  }
  return parent;
}
/** Whether a literal is a property value of an object literal or an element of an array literal (it is read with it). */
function insideLiteral(node: ts.Node): boolean {
  const parent = unwrapParent(node);
  if (ts.isPropertyAssignment(parent)) return ts.isObjectLiteralExpression(parent.parent);
  return ts.isArrayLiteralExpression(parent);
}
/** Whether a value holds a gp document anywhere (a JSON text inside a string included). */
function holdsMarked(value: unknown): boolean {
  if (typeof value === "string") {
    const nested = parsedJson(value);
    return nested !== undefined && holdsMarked(nested);
  }
  if (Array.isArray(value)) return value.some(holdsMarked);
  if (!isObject(value)) return false;
  return isGpDocument(value) || Object.values(value).some(holdsMarked);
}
interface FileRead {
  readonly hits: string[];
  readonly marked: boolean;
}
/** (b) over one module: each outermost object or array literal, and each free string literal holding JSON. */
function readModule(path: string, text: string): FileRead {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const hits: string[] = [];
  let marked = false;
  const read = (node: ts.Node, value: unknown): void => {
    const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    for (const hit of judgeJson(value)) hits.push(hitText(`${path}:${line}`, hit));
    marked ||= holdsMarked(value);
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node)) && !insideLiteral(node)) read(node, literalOf(node));
    else if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && !insideLiteral(node)) {
      const nested = parsedJson(node.text);
      if (nested !== undefined) read(node, nested);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { hits, marked };
}
const moduleHits = (path: string, text: string): string[] => readModule(path, text).hits;
/** (b) over one JSON or JSONL file; a text that does not parse is reported (B1), never judged. */
function readJson(path: string, text: string, unparsed: string[]): FileRead {
  const documents: [string, unknown][] = [];
  if (path.endsWith(".jsonl")) {
    text.split("\n").forEach((line, index) => {
      if (line.trim() === "") return;
      try {
        documents.push([`${path}:${index + 1}`, JSON.parse(line)]);
      } catch {
        unparsed.push(`${path}:${index + 1}`);
      }
    });
  } else {
    try {
      documents.push([path, JSON.parse(text)]);
    } catch {
      unparsed.push(path);
    }
  }
  return {
    hits: documents.flatMap(([locator, value]) => judgeJson(value).map(hit => hitText(locator, hit))),
    marked: documents.some(([, value]) => holdsMarked(value)),
  };
}
const jsonHits = (path: string, text: string, unparsed: string[]): string[] => readJson(path, text, unparsed).hits;
const isJsonFile = (path: string): boolean => path.endsWith(".json") || path.endsWith(".jsonl");
const isModule = (path: string): boolean => MODULE_EXTENSIONS.some(extension => path.endsWith(extension));

/** (c): the table rows of a TRACEABILITY text (a line opening with "|", the header separator aside). */
function traceRows(text: string): string[] {
  return text.split("\n").filter(line => /^[ \t]*\|/.test(line) && !/^[ \t]*\|[ \t:|-]*$/.test(line));
}
function realDate(year: string, month: string, day: string): boolean {
  const moment = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return moment.getUTCFullYear() === Number(year) && moment.getUTCMonth() === Number(month) - 1 && moment.getUTCDate() === Number(day);
}
const datedRow = (row: string): boolean => [...row.matchAll(ISO_DATE)].some(match => realDate(match[1] ?? "", match[2] ?? "", match[3] ?? ""));
const citesToken = (row: string, token: string): boolean => new RegExp(`(?<![\\w-])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`).test(row);
/** (c): why an entry is refused, or null when a dated TRACEABILITY row cites its gp ruling id. */
function refusalOf(entry: AllowEntry, rows: readonly string[]): string | null {
  if (entry.ruling.trim() === "") return "no-ruling";
  if (!RULING.test(entry.ruling)) return "not-a-ruling-id";
  const citing = rows.filter(row => citesToken(row, entry.ruling));
  if (citing.length === 0) return "no-traceability-row";
  return citing.some(datedRow) ? null : "undated-row";
}

interface Finding {
  readonly row: "A" | "B";
  readonly path: string;
  readonly members: readonly string[];
  readonly text: string;
}
interface TreeCensus {
  readonly walkedByRoot: { [root: string]: string[] };
  readonly listedByRoot: { [root: string]: string[] };
  readonly walked: string[];
  readonly pages: string[];
  readonly listedPages: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
  readonly judgedA: string[];
  readonly judgedB: string[];
  readonly unparsed: string[];
  readonly marked: string[];
  readonly a: string[];
  readonly b: string[];
  readonly refused: string[];
  /** Admitted entries that silence no finding (a stale widening is reported, never kept silently). */
  readonly stale: string[];
}
/** Rows (a) and (b) over a tree, then the tree's allowlist under its own TRACEABILITY text (c). */
function censusOf(root: string, allowlist: readonly AllowEntry[] = ALLOWLIST): TreeCensus {
  const walkedByRoot: { [root: string]: string[] } = {};
  const listedByRoot: { [root: string]: string[] } = {};
  const walked: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  for (const scan of SCAN_ROOTS) {
    const found = walk(root, scan.root);
    walkedByRoot[scan.root] = found.files;
    listedByRoot[scan.root] = listing(root, scan.root);
    walked.push(...found.files);
    symlinks.push(...found.symlinks);
    unreadable.push(...found.unreadable);
  }
  let entries: Dirent[] = [];
  try {
    entries = readdirSync(root, { withFileTypes: true });
  } catch {
    unreadable.push(".");
  }
  const pages: string[] = [];
  for (const entry of entries.filter(item => item.name.endsWith(".md")).sort((left, right) => (left.name < right.name ? -1 : 1))) {
    if (entry.isSymbolicLink()) symlinks.push(entry.name);
    else if (entry.isFile()) pages.push(entry.name);
  }
  const judgedA = [...walked, ...pages].filter(file => !EXEMPT.includes(file));
  const judgedB = judgedA.filter(file => isJsonFile(file) || isModule(file));
  const readB = new Set(judgedB);
  const unparsed: string[] = [];
  const findings: Finding[] = [];
  const marked: string[] = [];
  for (const file of judgedA) {
    const text = textOf(join(root, file));
    for (const citation of citationsOf(file, text)) findings.push({ row: "A", path: file, members: citation.families, text: citationText(file, citation) });
    if (!readB.has(file)) continue;
    const read = isJsonFile(file) ? readJson(file, text, unparsed) : readModule(file, text);
    for (const hit of read.hits) findings.push({ row: "B", path: file, members: [/ (K\d+): /.exec(hit)?.[1] ?? ""], text: hit });
    if (read.marked) marked.push(file);
  }
  const rows = traceRows(textOf(join(root, TRACE_FILE)));
  const refused: string[] = [];
  const admitted: AllowEntry[] = [];
  for (const entry of allowlist) {
    const refusal = refusalOf(entry, rows);
    if (refusal === null) admitted.push(entry);
    else refused.push(`${entry.row} ${entry.path} ${entry.member} ${entry.ruling}: ${refusal}`);
  }
  const admits = (entry: AllowEntry, finding: Finding): boolean => entry.row === finding.row && entry.path === finding.path && finding.members.includes(entry.member);
  const open = findings.filter(finding => !admitted.some(entry => admits(entry, finding)));
  const stale = admitted.filter(entry => !findings.some(finding => admits(entry, finding))).map(entry => `${entry.row} ${entry.path} ${entry.member} ${entry.ruling}: admits no finding`);
  return {
    walkedByRoot,
    listedByRoot,
    walked,
    pages,
    listedPages: listedPages(root),
    symlinks,
    unreadable,
    judgedA,
    judgedB,
    unparsed,
    marked,
    a: open.filter(finding => finding.row === "A").map(finding => finding.text),
    b: open.filter(finding => finding.row === "B").map(finding => finding.text),
    refused,
    stale,
  };
}
let liveCache: TreeCensus | undefined;
function liveCensus(): TreeCensus {
  liveCache ??= censusOf(REPO);
  return liveCache;
}

const scratches: string[] = [];
afterEach(() => {
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const folder = makeScratch(prefix);
  scratches.push(folder);
  return folder;
}
/** Writes each `path: text` below `root`, making the directories it needs. */
function writeTree(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}
/** A scratch tree holding `files`, read by the census under `allowlist`. */
function treeCensus(prefix: string, files: Readonly<Record<string, string>>, allowlist: readonly AllowEntry[] = []): TreeCensus {
  const root = scratch(prefix);
  writeTree(root, files);
  return censusOf(root, allowlist);
}

/** The tracked bead export's row for `id` (every line must parse; a malformed export is refused, never skipped). */
function exportRow(id: string): { [key: string]: unknown } {
  const rows = textOf(join(REPO, BEAD_EXPORT))
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index): unknown => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`${BEAD_EXPORT} line ${index + 1} does not parse`);
      }
    });
  const row = rows.find(entry => isObject(entry) && entry.id === id);
  if (!isObject(row)) throw new Error(`${id} is missing from ${BEAD_EXPORT}`);
  return row;
}
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  if (from < 0) return "";
  const to = text.indexOf(end, from + start.length);
  return to < 0 ? "" : text.slice(from + start.length, to);
}

const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
const LITERAL_AND_SHA = `${STATUS_LITERAL}, GraphPolicyCLI ${PIN}`;
/** A gp document around `result`, as JSON text (its own schema is the gp CLI schema id). */
const gpJson = (result: Json): string => JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, result });
const aFindings = (path: string, text: string): string[] => citationsOf(path, text).map(citation => citationText(path, citation));
const bFindings = (value: unknown): string[] => judgeJson(value).map(hit => hitText("x.json", hit));

type CaseKind = "file" | "markdown" | "cut" | "cutMarkdown" | "json" | "module";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  readonly text: string;
  readonly outcome: readonly string[];
}
/** MS1-MS4 the cutter and the single-text quiet rows of the residuals. */
const CASES: readonly Case[] = [
  { pin: "MS1", kind: "cut", text: "One names a. Two names b! Three? Four; five", outcome: ["One names a.", "Two names b!", "Three?", "Four;", "five"] },
  { pin: "MS2", kind: "cut", text: "para one\n\npara two\n| a | b |\n| c | d |", outcome: ["para one", "para two", "| a | b |", "| c | d |"] },
  { pin: "MS3", kind: "cutMarkdown", text: "- one\n- two\n+ three\n* four\n1. five\n2) six", outcome: ["- one", "- two", "+ three", "* four", "1. five", "2) six"] },
  {
    pin: "MS4",
    kind: "cut",
    text: "The store gate\n * wraps here\n * and 02-contract-audit.md:3@0107c72992f3, D-IDENT-1/2/3 and e.g.x stay whole\n- in code a dash item joins",
    outcome: ["The store gate\n * wraps here\n * and 02-contract-audit.md:3@0107c72992f3, D-IDENT-1/2/3 and e.g.x stay whole\n- in code a dash item joins"],
  },
  { pin: "R1", kind: "file", text: `// FCA-2 is GPR-2001's allocated requirement: ${STATUS_LITERAL}, read at ${PIN}.\n`, outcome: [] },
  { pin: "R2", kind: "file", text: `// D-STORE-2 carries ${STATUS_LITERAL} at the Pi commit cafe123.\n`, outcome: [] },
  { pin: "R3", kind: "file", text: `// D-STORE-2 (${LITERAL_AND_SHA}) is open. Pi adopts it as gp contract.\n`, outcome: [] },
  { pin: "R4", kind: "file", text: "// d-store-2, rc-ident, fca-2 and gp f07 are gp contract.\n", outcome: [] },
  {
    pin: "R5",
    kind: "file",
    text: `// DSTORE2, D_STORE_1, D IDENT 2, D${cp(0x2013)}STORE${cp(0x2013)}2, RCIDENT, RC_EVAL, RC IDENT, RC${cp(0x2011)}IDENT, FCA_3, FCA 6, FCA${cp(0x2014)}2 and FCAtwo are gp contract.\n`,
    outcome: [],
  },
  { pin: "R6", kind: "file", text: "// F7 is gp contract. F07 is the store contract.\n", outcome: [] },
  { pin: "R7", kind: "file", text: "// GraphPolicyCLI's October feedback audit settles the store states as gp contract.\n", outcome: [] },
  { pin: "R8", kind: "file", text: `// D-ST${cp(0x041e)}RE-2 and F${cp(0x0421)}A-2 are gp contract.\n`, outcome: [] },
  { pin: "R9", kind: "markdown", text: `D-${cp(0x200b)}STORE-2, FC${cp(0x00ad)}A-2 and D-**STORE**-2 are gp contract.\n`, outcome: [] },
  { pin: "R10", kind: "file", text: "// D-&#83;TORE-2 and D-\\u0053TORE-2 are gp contract.\n", outcome: [] },
  {
    pin: "R12",
    kind: "json",
    text: JSON.stringify({ receipt: { input_snapshot: "graphpolicy.snapshot.c1:00", code: "GP_CLI_INTERNAL", identity_unavailable: true, store_state: "missing" } }),
    outcome: [],
  },
  {
    pin: "R13",
    kind: "json",
    text: JSON.stringify({ gp: { schema: "graphpolicy.cli.v1" }, schema_ref: { namespace: "graphpolicy.data.v1" }, identity_unavailable: true, store_state: "missing" }),
    outcome: [],
  },
  {
    pin: "R14",
    kind: "module",
    text: 'const key = "identity_unavailable";\nconst state = "missing";\nexport const reply = { schema: "graphpolicy.cli.v1", [key]: true, ...extra, state, store: STATE, run: build("byte_snapshot") };\n',
    outcome: [],
  },
  {
    pin: "R16",
    kind: "json",
    text: gpJson({ checkpoint_checked: true, basis: { complete: true }, refusal: { code: "GP_RPC_PARAMETER_UNSUPPORTED" }, mapping: { "ready-work": "ready_work" } }),
    outcome: [],
  },
  { pin: "R17", kind: "json", text: gpJson({ reason: "missing", outcome: "verified", expected: "eligible", found: "quarantined" }), outcome: [] },
  { pin: "R19", kind: "json", text: gpJson({ evaluation: { checkpoint: "graphpolicy.checkpoint.c1:ab", state: "missing", bytes_present: false } }), outcome: [] },
  { pin: "R20", kind: "json", text: gpJson({ identityunavailable: true, bytesnapshot: "x", decisiongrade: "y", store_state: "missingstate" }), outcome: [] },
  {
    pin: "R21",
    kind: "module",
    text: 'export interface GpReply {\n  schema: "graphpolicy.cli.v1";\n  identity_unavailable?: boolean;\n  store_state?: "missing";\n}\nexport type Descriptor = { hash_algorithm: string; schema: "graphpolicy.cli.v1" };\n',
    outcome: [],
  },
];
function outcomeOf(kind: CaseKind, text: string): string[] {
  if (kind === "file") return aFindings("x.ts", text);
  if (kind === "markdown") return aFindings("x.md", text);
  if (kind === "cut" || kind === "cutMarkdown") return sentencesOf(text, kind === "cutMarkdown").map(sentence => sentence.text);
  if (kind === "json") return bFindings(JSON.parse(text));
  return moduleHits("x.ts", text);
}

/** A4's plants, one per scanned root and the root pages: [path, citing text, its marked twin, expected finding]. */
const CITING: readonly (readonly [string, string, string, string])[] = [
  ["docs/plant.md", "Pi reads D-STORE-2 as the gp store contract.", `Pi reads D-STORE-2 (${LITERAL_AND_SHA}) as an open candidate.`, "docs/plant.md:1 N2: lacks-status+sha"],
  ["src/plant.ts", "// GP-FCA-2026-10-21 requires the identity field.\n", `// GP-FCA-2026-10-21 (${LITERAL_AND_SHA}) proposes an identity field.\n`, "src/plant.ts:1 N1: lacks-status+sha"],
  [".agents/skills/plant/SKILL.md", "FCA-2 is the allocated gp requirement.", `FCA-2 (${LITERAL_AND_SHA}) is a local tracking label.`, ".agents/skills/plant/SKILL.md:1 N3: lacks-status+sha"],
  ["qa/plant.mjs", `const note = "RC-IDENT is fixed in gp at ${PIN}";\n`, `const note = "RC-IDENT, ${STATUS_LITERAL}, read at ${PIN}";\n`, "qa/plant.mjs:1 N4: lacks-status"],
  ["test/plant.test.ts", "// GraphPolicyCLI F07 is the store gate contract.\n", `// GraphPolicyCLI F07 (${LITERAL_AND_SHA}) is a report, not a contract.\n`, "test/plant.test.ts:1 N5: lacks-status+sha"],
  ["examples/plant.md", `The feedback-contract-audit program settles D-CANON-1 at ${PIN}.`, `The feedback-contract-audit program (${LITERAL_AND_SHA}) leaves D-CANON-1 open.`, "examples/plant.md:1 N1+N2: lacks-status"],
  ["PLANT.md", `Pi adopts D-NAMES-1 alternative (a): ${STATUS_LITERAL}.`, `Pi adopts no D-NAMES-1 alternative: ${LITERAL_AND_SHA}.`, "PLANT.md:1 N2: lacks-sha"],
];
/** B3's plants, one per member across file kinds, in walk order: [path, text, its twin, expected finding]. */
const ENCODING: readonly (readonly [string, string, string, string])[] = [
  [
    "docs/plant-binding.json",
    gpJson({ binding_record: { checkpoint: "graphpolicy.checkpoint.c1:ab" } }),
    JSON.stringify({ result: { binding_record: { checkpoint: "sha256:ab" } } }),
    "docs/plant-binding.json#/result/binding_record K5: key binding_record",
  ],
  [
    "src/plant-theta.ts",
    `export const receipt = JSON.parse('${gpJson({ receipt: { thetaWordsIdentity: "x" } })}');\n`,
    `export const receipt = JSON.parse('${JSON.stringify({ schema: "plant.v1", result: { receipt: { thetaWordsIdentity: "x" } } })}');\n`,
    "src/plant-theta.ts:1#/result/receipt/thetaWordsIdentity K4: key thetaWordsIdentity",
  ],
  [
    ".agents/skills/plant/fixture.json",
    JSON.stringify({ schema: "gp.rpc.reply/v1", id: 2, ok: true, result: { profile: "decision-grade" } }),
    JSON.stringify({ schema: "gp.rpc.reply/v1", id: 2, ok: true, result: { profile: "graphpolicy.numeric.binary32.v1" } }),
    '.agents/skills/plant/fixture.json#/result/profile K7: value "decision-grade"',
  ],
  [
    "qa/plant-namespace.jsonl",
    `${JSON.stringify({ schema: "graphpolicy.rpc.v1", note: "x" })}\n${JSON.stringify({ schema: "graphpolicy.rpc.v1", result: { graph: "graphpolicy.snapshot.c2:0a1b" } })}\n`,
    `${JSON.stringify({ schema: "graphpolicy.rpc.v1", note: "x" })}\n${JSON.stringify({ schema: "graphpolicy.rpc.v1", result: { graph: "graphpolicy.snapshot.c1:0a1b" } })}\n`,
    'qa/plant-namespace.jsonl:2#/result/graph K2: value "graphpolicy.snapshot.c2:0a1b"',
  ],
  [
    "test/fixtures/plant-canon.json",
    gpJson({ valid: true, identity_unavailable: true }),
    JSON.stringify({ schema: "plant.v1", ok: true, result: { valid: true, identity_unavailable: true } }),
    "test/fixtures/plant-canon.json#/result/identity_unavailable K1: key identity_unavailable",
  ],
  [
    "test/fixtures/plant-descriptor.json",
    gpJson({ identities: { graph: { identityDescriptor: { domain: "snapshot" } } } }),
    JSON.stringify({ schema: "plant.v1", result: { identities: { graph: { identityDescriptor: { domain: "snapshot" } } } } }),
    "test/fixtures/plant-descriptor.json#/result/identities/graph/identityDescriptor K2: key identityDescriptor",
  ],
  [
    "test/helpers/plant-serializer.ts",
    'export const reply = { schema: "gp.rpc.reply/v1", id: 1, ok: true, result: { byte_snapshot: "compact" } };\n',
    'export const reply = { schema: "plant.reply/v1", id: 1, ok: true, result: { byte_snapshot: "compact" } };\n',
    "test/helpers/plant-serializer.ts:1#/result/byte_snapshot K3: key byte_snapshot",
  ],
  [
    "examples/plant-store.mjs",
    'export const evaluated = { schema: "graphpolicy.cli.v1", ok: true, result: { store_state: "missing" } };\n',
    'export const inspected = { schema: "graphpolicy.cli.v1", ok: true, result: { checkpoint: "graphpolicy.checkpoint.c1:ab", state: "missing", bytes_present: false } };\n',
    'examples/plant-store.mjs:1#/result/store_state K6: state store_state="missing"',
  ],
];
const TRACE_HEAD = "| ID | Priority | Requirement | Status |\n| --- | --- | --- | --- |\n";

const REACHED = new Set<string>();
/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const census = liveCensus();
    const roots = SCAN_ROOTS.map(scan => ({
      root: scan.root,
      equalsListing: sameSet(census.walkedByRoot[scan.root] ?? [], census.listedByRoot[scan.root] ?? []),
      anchorRead: census.walked.includes(scan.anchor) && textOf(join(REPO, scan.anchor)).includes(scan.token),
    }));
    const listed = [...SCAN_ROOTS.flatMap(scan => census.listedByRoot[scan.root] ?? []), ...census.listedPages];
    const exemptPresent = EXEMPT.filter(file => listed.includes(file));
    const reading = {
      roots,
      pages: { equalsListing: sameSet(census.pages, census.listedPages), anchorRead: census.pages.includes(PAGE_ANCHOR.file) && textOf(join(REPO, PAGE_ANCHOR.file)).includes(PAGE_ANCHOR.token) },
      judgedA: sameSet(census.judgedA, listed.filter(file => !EXEMPT.includes(file))),
      judgedB: sameSet(census.judgedB, listed.filter(file => !EXEMPT.includes(file) && (isJsonFile(file) || isModule(file)))),
      exemptWalked: exemptPresent,
      symlinks: census.symlinks,
      unreadable: census.unreadable,
    };
    expect(reading, `walked ${census.walked.length} files and ${census.pages.length} pages`).toStrictEqual({
      roots: SCAN_ROOTS.map(scan => ({ root: scan.root, equalsListing: true, anchorRead: true })),
      pages: { equalsListing: true, anchorRead: true },
      judgedA: true,
      judgedB: true,
      exemptWalked: [...EXEMPT],
      symlinks: [],
      unreadable: [],
    });
    return reading;
  },
  A2: async () => {
    const findings = liveCensus().a;
    expect(findings, "a Pi sentence citing the program without its status literal and sha").toEqual([]);
    return { findings };
  },
  A3: async () => {
    const exemptions = EXEMPT.map(file => {
      const text = textOf(join(REPO, file));
      const unparsed: string[] = [];
      const b = isJsonFile(file) ? jsonHits(file, text, unparsed) : isModule(file) ? moduleHits(file, text) : [];
      return { file, walked: liveCensus().walked.includes(file), aFindings: aFindings(file, text).length > 0, bFindings: b.length > 0 };
    });
    // This file spells the needles of both rows; the roster carries row A's (it holds no gp document of its own).
    expect(exemptions).toStrictEqual([
      { file: SELF, walked: true, aFindings: true, bFindings: true },
      { file: ROSTER_FILE, walked: true, aFindings: true, bFindings: false },
    ]);
    return { exemptions };
  },
  A4: async () => {
    const planted = treeCensus("gp-fca-citing-", Object.fromEntries(CITING.map(([path, text]) => [path, text])));
    const twins = treeCensus("gp-fca-citing-twins-", Object.fromEntries(CITING.map(([path, , twin]) => [path, twin])));
    const reading = { planted: planted.a, quiet: twins.a, plantedB: planted.b };
    expect(reading).toStrictEqual({ planted: CITING.map(([, , , finding]) => finding), quiet: [], plantedB: [] });
    return reading;
  },
  B1: async () => {
    const census = liveCensus();
    const reading = {
      unparsed: census.unparsed,
      anchorMarked: census.marked.includes("test/helpers/gp-fallback-census.ts"),
      judgedFloorMet: census.judgedB.filter(isModule).length > 0 && census.judgedB.filter(isJsonFile).length > 0,
    };
    expect(reading, `files holding a gp document: ${census.marked.join(", ")}`).toStrictEqual({ unparsed: [], anchorMarked: true, judgedFloorMet: true });
    return reading;
  },
  B2: async () => {
    const findings = liveCensus().b;
    expect(findings, "a Pi fixture encoding a D-* alternative as expected gp output").toEqual([]);
    return { findings };
  },
  B3: async () => {
    const planted = treeCensus("gp-fca-encoding-", Object.fromEntries(ENCODING.map(([path, text]) => [path, text])));
    const twins = treeCensus("gp-fca-encoding-twins-", Object.fromEntries(ENCODING.map(([path, , twin]) => [path, twin])));
    const reading = { planted: planted.b, quiet: twins.b, plantedA: planted.a };
    expect(reading).toStrictEqual({ planted: ENCODING.map(([, , , finding]) => finding), quiet: [], plantedA: [] });
    return reading;
  },
  C1: async () => {
    const rows = traceRows(textOf(join(REPO, TRACE_FILE)));
    const rulingRows = rows.filter(row => [...row.matchAll(/[A-Z][A-Z-]*-\d{3,4}/g)].some(match => RULING.test(match[0]))).length;
    const reading = {
      allowlist: ALLOWLIST.length,
      refused: liveCensus().refused,
      stale: liveCensus().stale,
      traceability: { headerRead: rows.some(row => row.startsWith("| ID | Priority | Requirement")), tableRows: rows.length, datedRows: rows.filter(datedRow).length, rulingRows },
    };
    expect(reading).toStrictEqual({ allowlist: 0, refused: [], stale: [], traceability: { headerRead: true, tableRows: 75, datedRows: 0, rulingRows: 0 } });
    return reading;
  },
  C2: async () => {
    const rows = traceRows(
      `${TRACE_HEAD}| WB-900 | P2 | adopts GPR-1700 for the store states (2026-10-23) | fixture |\n| WB-901 | P2 | adopts ADR-GP-020 | fixture |\n| WB-902 | P2 | adopts GPR-17001 on 2026-10-23 | fixture |\nGP-REQ-040 adopted 2026-10-23, outside any table.\n| WB-903 | P2 | GP-REQ-041 on 2026-02-30 | fixture |\n`,
    );
    const entry = (ruling: string): AllowEntry => ({ row: "B", path: "test/fixtures/x.json", member: "K7", ruling });
    const cases: [string, string | null][] = [
      ["", "no-ruling"],
      ["FCA-2", "not-a-ruling-id"],
      ["D-STORE-2", "not-a-ruling-id"],
      ["RC-STORE", "not-a-ruling-id"],
      ["F07", "not-a-ruling-id"],
      ["GPR-1701", "no-traceability-row"],
      ["GPR-1700", null],
      ["ADR-GP-020", "undated-row"],
      ["GPR-1700 ", "not-a-ruling-id"],
      ["GP-REQ-040", "no-traceability-row"],
      ["GP-REQ-041", "undated-row"],
    ];
    const readings = cases.map(([ruling]) => ({ ruling, refusal: refusalOf(entry(ruling), rows) }));
    expect(readings.map(reading => reading.refusal)).toStrictEqual(cases.map(([, refusal]) => refusal));
    return { rows: rows.length, readings };
  },
  C3: async () => {
    const files: Record<string, string> = {
      "docs/plant.md": "Pi encodes D-CANON-1 as gp contract.",
      "test/fixtures/plant.json": gpJson({ identity_unavailable: true }),
    };
    const entries: AllowEntry[] = [
      { row: "A", path: "docs/plant.md", member: "N2", ruling: "GPR-1700" },
      { row: "B", path: "test/fixtures/plant.json", member: "K1", ruling: "GPR-1700" },
    ];
    const dated = treeCensus("gp-fca-allow-dated-", { ...files, [TRACE_FILE]: `${TRACE_HEAD}| WB-900 | P2 | GPR-1700 adopted 2026-10-23 | fixture |\n` }, entries);
    const undated = treeCensus("gp-fca-allow-undated-", { ...files, [TRACE_FILE]: `${TRACE_HEAD}| WB-900 | P2 | GPR-1700 adopted | fixture |\n` }, entries);
    const elsewhere = treeCensus("gp-fca-allow-elsewhere-", { ...files, [TRACE_FILE]: `${TRACE_HEAD}| WB-900 | P2 | GPR-1700 adopted 2026-10-23 | fixture |\n` }, [
      { row: "A", path: "docs/other.md", member: "N2", ruling: "GPR-1700" },
      { row: "B", path: "test/fixtures/plant.json", member: "K7", ruling: "GPR-1700" },
    ]);
    const reading = {
      dated: { a: dated.a, b: dated.b, refused: dated.refused, stale: dated.stale },
      undated: { a: undated.a, b: undated.b, refused: undated.refused, stale: undated.stale },
      elsewhere: { a: elsewhere.a, b: elsewhere.b, refused: elsewhere.refused, stale: elsewhere.stale },
    };
    expect(reading).toStrictEqual({
      dated: { a: [], b: [], refused: [], stale: [] },
      undated: {
        a: ["docs/plant.md:1 N2: lacks-status+sha"],
        b: ["test/fixtures/plant.json#/result/identity_unavailable K1: key identity_unavailable"],
        refused: ["A docs/plant.md N2 GPR-1700: undated-row", "B test/fixtures/plant.json K1 GPR-1700: undated-row"],
        stale: [],
      },
      elsewhere: {
        a: ["docs/plant.md:1 N2: lacks-status+sha"],
        b: ["test/fixtures/plant.json#/result/identity_unavailable K1: key identity_unavailable"],
        refused: [],
        stale: ["A docs/other.md N2 GPR-1700: admits no finding", "B test/fixtures/plant.json K7 GPR-1700: admits no finding"],
      },
    });
    return reading;
  },
  F1: async () => {
    const row = exportRow(BEAD);
    const notes = typeof row.notes === "string" ? row.notes : "";
    const statement = /^Full statement[^:]*: (.*)$/m.exec(notes)?.[1] ?? "";
    const acceptance = between(notes, "Acceptance: ", " Not P0:");
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label).map(entry => entry.id);
    const decisions = between(statement, "candidate resolution (", ")")
      .split(/,\s+/)
      .flatMap(group => {
        const match = /^(D-[A-Z]+-)([\d/]+)$/.exec(group.trim());
        return match === null ? [group.trim()] : (match[2] ?? "").split("/").map(number => `${match[1] ?? ""}${number}`);
      });
    const decisionWords = [...new Set(decisions.map(decision => /^D-([A-Z]+)-/.exec(decision)?.[1] ?? ""))];
    const tokened = [...new Set(MEMBERS.map(member => member.decision))];
    const prefixes = between(statement, ") or ", " label as").split("/").map(prefix => prefix.replace(/\*$/, ""));
    const probes: Readonly<Record<string, string>> = { F: "GraphPolicyCLI F07", "RC-": "RC-STORE", "FCA-": "FCA-2" };
    const ellipsis = between(statement, "carries its '", "' status").split(cp(0x2026));
    const quote = between(notes, "Quote: '", "' docs/programs/");
    const citation = /(docs\/programs\/[^\s:]+):(\d+)@([0-9a-f]+)/.exec(statement);
    const clauseA = clauseTexts[0] ?? "";
    const clauseB = clauseTexts[1] ?? "";
    const clauseC = clauseTexts[2] ?? "";
    const field = /`([a-z_]+)` field/.exec(clauseB)?.[1] ?? "";
    const state = /`([a-z]+)` store state/.exec(clauseB)?.[1] ?? "";
    const rulingKinds = (/before a ([A-Z/-]+) id exists/.exec(clauseB)?.[1] ?? "").split("/");
    const reading = {
      clauses,
      labelsEqual,
      decisions,
      decisionsRead: decisions.filter(decision => familiesOf(decision).length > 0),
      decisionWords,
      accounting: { tokened: tokened.filter(decision => decisions.includes(decision)).length === tokened.length, untokened: UNTOKENED.filter(decision => decisions.includes(decision)), overlap: tokened.filter(decision => UNTOKENED.includes(decision)) },
      prefixes: prefixes.map(prefix => ({ prefix, read: familiesOf(probes[prefix] ?? prefix) })),
      clauseIds: { program: familiesOf(/citing (GP-FCA-[\d-]+\d),/.exec(clauseA)?.[1] ?? "").length > 0, decisions: clauseA.includes("a D-* or"), workstreams: clauseA.includes("an FCA-* id") },
      // The statement's own producer words ("as gp contract", "the GraphPolicyCLI sha"), each read as the anchor of a finding label.
      anchorWords: [/ as (\S+) contract /.exec(statement)?.[1] ?? "", / the (\S+) sha it was read at/.exec(statement)?.[1] ?? ""].map(word => ({ word, anchors: word !== "" && familiesOf(`${word} F07`).length > 0 })),
      status: { quoted: quote.includes(STATUS_LITERAL), head: STATUS_LITERAL.startsWith((ellipsis[0] ?? "").trim()) && (ellipsis[0] ?? "").trim() !== "", tail: STATUS_LITERAL.endsWith((ellipsis[1] ?? "").trim()) && (ellipsis[1] ?? "").trim() !== "" },
      citation: { path: familiesOf(citation?.[1] ?? "").includes("N1"), line: citation?.[2] ?? "", sha: citation?.[3] === PIN && SHA.test(citation?.[3] ?? "") },
      examples: {
        field,
        fieldRead: bFindings(JSON.parse(gpJson({ [field]: true }))),
        state,
        stateRead: bFindings(JSON.parse(gpJson({ store_state: state }))),
      },
      rulingKinds: rulingKinds.filter(kind => RULING_KINDS.some(source => source.startsWith(`${kind}-`))),
      trace: { file: TRACE_FILE.endsWith(`/${/a dated ([A-Z]+) row/.exec(clauseC)?.[1] ?? ""}.md`), dated: /^\(c\) a dated /.test(clauseC) },
      pins: [PIN, FILING_READ].filter(token => notes.includes(token)),
    };
    expect(reading.clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(reading.labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(entry => entry.id));
    expect(reading.decisions, "the statement's decision list, expanded").toEqual([...DECISIONS]);
    expect(reading.decisionsRead, "each filing decision read by a family").toEqual([...DECISIONS]);
    expect(reading.decisionWords, "the decision family's words are the filing's").toEqual([...DECISION_WORDS]);
    expect(reading.accounting, "each decision is a member's or untokened, never both").toStrictEqual({ tokened: true, untokened: [...UNTOKENED], overlap: [] });
    expect({ accounted: tokened.length + UNTOKENED.length, members: MEMBERS.length }, "every filing decision accounted for, one member per tokened decision").toStrictEqual({
      accounted: DECISIONS.length,
      members: tokened.length,
    });
    expect(reading.prefixes.map(entry => entry.prefix), "the filing's label prefixes").toEqual(["F", "RC-", "FCA-"]);
    expect(
      reading.prefixes.map(entry => entry.read.length),
      "each filing label prefix read by exactly one family",
    ).toEqual([1, 1, 1]);
    expect(new Set(reading.prefixes.map(entry => entry.read[0])).size, "three distinct families").toBe(3);
    expect(reading.clauseIds).toStrictEqual({ program: true, decisions: true, workstreams: true });
    expect(reading.anchorWords.map(entry => entry.anchors), "the statement's producer words anchor a finding label").toEqual([true, true]);
    expect(reading.status).toStrictEqual({ quoted: true, head: true, tail: true });
    expect(reading.citation).toStrictEqual({ path: true, line: "3", sha: true });
    const words = MEMBERS.filter(member => member.reading === "words").map(member => member.id);
    const states = MEMBERS.filter(member => member.reading === "state").map(member => member.id);
    expect(
      {
        field: reading.examples.field,
        fieldRead: reading.examples.fieldRead.filter(finding => finding.startsWith(`x.json#/result/${reading.examples.field} `) && words.some(id => finding.includes(` ${id}: `))).length,
        state: reading.examples.state,
        stateRead: reading.examples.stateRead.filter(finding => states.some(id => finding.includes(` ${id}: state `))).length,
      },
      "clause (b)'s two examples, each read by one member",
    ).toStrictEqual({ field: "identity_unavailable", fieldRead: 1, state: "missing", stateRead: 1 });
    expect(reading.rulingKinds, "the filing's ruling kinds head RULING alternatives").toEqual(["GP-REQ", "ADR"]);
    expect(reading.trace).toStrictEqual({ file: true, dated: true });
    expect(reading.pins).toEqual([PIN, FILING_READ]);
    return reading;
  },
  ...Object.fromEntries(
    FAMILIES.map((family, index) => [
      `MN${index + 1}`,
      async (): Promise<Json> => {
        const readings = family.spellings.map(spelling => ({ spelling, bare: familiesOf(`Pi reads ${spelling} here`, false), anchored: familiesOf(`Pi reads ${spelling} here`, true) }));
        const programId = /GP-FCA-[\d-]+\d/.exec(siteText("programId"))?.[0] ?? "";
        const producer: Readonly<Record<string, readonly string[]>> = {
          N1: [programId],
          N2: ROSTER.labels.decisions,
          N3: ROSTER.labels.workstreams,
          N4: ROSTER.labels.rootCauses,
          N5: ROSTER.labels.findings,
        };
        const labels = (producer[family.id] ?? []).map(label => ({ label, read: familiesOf(label, true).includes(family.id) }));
        const nearMisses = family.nearMisses.map(spelling => ({ spelling, read: familiesOf(`Pi reads ${spelling} here`, true).includes(family.id) }));
        expect(readings.every(reading => reading.anchored.includes(family.id) && reading.bare.includes(family.id) === !family.context), `${family.id} spellings`).toBe(true);
        expect(labels.every(label => label.read), `${family.id} producer labels`).toBe(true);
        expect(nearMisses.filter(entry => entry.read).map(entry => entry.spelling), `${family.id} near misses read as citations`).toEqual([]);
        // N2's and N4's word lists are the words of the producer's own labels, in the producer's order.
        const measured: Readonly<Record<string, readonly string[]>> = {
          N2: [...new Set(ROSTER.labels.decisions.map(label => label.split("-")[1] ?? ""))],
          N4: ROSTER.labels.rootCauses.map(label => label.slice("RC-".length)),
        };
        const spelled: Readonly<Record<string, readonly string[]>> = { N2: DECISION_WORDS, N4: ROOT_CAUSE_WORDS };
        expect(spelled[family.id] ?? [], `${family.id} words against the producer's labels`).toEqual(measured[family.id] ?? []);
        return { family: family.id, readings, labels: labels.length, nearMisses };
      },
    ]),
  ),
  MA: async () => {
    const anchors = ["GraphPolicyCLI", "graphpolicy", "graph-policy", "graph policy", "Graph.Policy", "gp"].map(word => ({ word, read: familiesOf(flatten(`// ${word} names F07 here.`)) }));
    const nearMisses = ["gpu", "gps", "graph", "policy", "pgp"].map(word => ({ word, read: familiesOf(flatten(`// ${word} names F07 here.`)) }));
    expect({ anchors: anchors.map(entry => entry.read), nearMisses: nearMisses.map(entry => entry.read) }).toStrictEqual({ anchors: anchors.map(() => ["N5"]), nearMisses: nearMisses.map(() => []) });
    return { anchors, nearMisses };
  },
  MT: async () => {
    const admitted = [
      ["x.ts", `// D-STORE-2: ${STATUS_LITERAL} (GraphPolicyCLI ${PIN}).\n`],
      ["x.ts", `// D-STORE-2: Proposed audit obligations and candidate\n// resolutions, NOT accepted GraphPolicyCLI semantics (${PIN}).\n`],
      ["x.ts", `/**\n * D-STORE-2: Proposed audit obligations and\n * candidate resolutions, NOT accepted GraphPolicyCLI\n * semantics (${PIN}).\n */\n`],
      ["x.md", `D-STORE-2: Proposed audit obligations and candidate\nresolutions, NOT accepted GraphPolicyCLI semantics (${PIN}).\n`],
      ["x.md", `> D-STORE-2: Proposed audit obligations and candidate\n> resolutions, NOT accepted GraphPolicyCLI semantics (${PIN}).\n`],
      ["x.md", `D-STORE-2: '**Status:** ${STATUS_LITERAL}.' (${PIN})\n`],
    ].map(([path, text]) => aFindings(path ?? "x.ts", text ?? "").length);
    const altered = [
      `// D-STORE-2: ${STATUS_LITERAL.replace("NOT", "not")} (${PIN}).\n`,
      `// D-STORE-2: ${STATUS_LITERAL.replace("obligations", "obligation")} (${PIN}).\n`,
      `// D-STORE-2: 'Proposed ${cp(0x2026)} NOT accepted GraphPolicyCLI semantics' (${PIN}).\n`,
      `// D-STORE-2: NOT accepted GraphPolicyCLI semantics (${PIN}).\n`,
      `// D-STORE-2: ${STATUS_LITERAL.replace(", ", " ")} (${PIN}).\n`,
    ].map(text => aFindings("x.ts", text));
    const measured = siteText("status").startsWith(`**Status:** ${STATUS_LITERAL}.`);
    expect({ admitted, altered, measured }).toStrictEqual({ admitted: [0, 0, 0, 0, 0, 0], altered: altered.map(() => ["x.ts:1 N2: lacks-status"]), measured: true });
    return { admitted, altered, measured };
  },
  MH: async () => {
    const read = (token: string): string[] => aFindings("x.ts", `// D-STORE-2: ${STATUS_LITERAL} (${token}).\n`);
    const admitted = ["0107c72", "0107c72992f3", "0107c72992f35cf6832a37615a25c7df45747ebc"].map(token => ({ token, findings: read(token).length }));
    const refused = ["0107c7", "0107c72992f35cf6832a37615a25c7df45747ebc0", "1234567", "abcdefa", "0107C72992F3", "x0107c72992f3", `graphpolicy.snapshot.c1:${"ab01".repeat(16)}`].map(token => ({ token, finding: read(token)[0] ?? "" }));
    expect({ admitted: admitted.map(entry => entry.findings), refused: refused.map(entry => entry.finding) }).toStrictEqual({ admitted: [0, 0, 0], refused: refused.map(() => "x.ts:1 N2: lacks-sha") });
    return { admitted, refused };
  },
  MF: async () => {
    const text = `Line one names nothing.\nPi reads D-STORE-2 here.\n\nFCA-2 is open at ${PIN}.\n| RC-STORE | ${STATUS_LITERAL} | ${PIN} |\n- GraphPolicyCLI F07 holds\n`;
    const markdown = aFindings("docs/x.md", text);
    const code = aFindings("src/x.ts", text);
    expect({ markdown, code }).toStrictEqual({
      markdown: ["docs/x.md:2 N2: lacks-status+sha", "docs/x.md:4 N3: lacks-status", "docs/x.md:6 N5: lacks-status+sha"],
      code: ["src/x.ts:2 N2: lacks-status+sha", "src/x.ts:4 N3: lacks-status"],
    });
    return { markdown, code };
  },
  MW: async () => {
    const inputs = ["identity_unavailable", "identityUnavailable", "IdentityUnavailable", "IDENTITY_UNAVAILABLE", "GP_CLI_IDENTITY_UNAVAILABLE", "identity-unavailable", "identity unavailable", "IDUnavailable", "byteSnapshot", "Decision_Grade", "hashAlgorithm2"];
    const readings = inputs.map(input => ({ input, words: wordsOf(input) }));
    expect(readings.map(entry => entry.words)).toStrictEqual([
      ["identity", "unavailable"],
      ["identity", "unavailable"],
      ["identity", "unavailable"],
      ["identity", "unavailable"],
      ["gp", "cli", "identity", "unavailable"],
      ["identity", "unavailable"],
      ["identity", "unavailable"],
      ["id", "unavailable"],
      ["byte", "snapshot"],
      ["decision", "grade"],
      ["hash", "algorithm2"],
    ]);
    return { readings };
  },
  MM: async () => {
    const marks = ["graphpolicy.cli.v1", "graphpolicy.rpc.v1", "graphpolicy.receipt.decision.v1", "gp.rpc.reply/v1", "gp.rpc.error/v1", "graphpolicy.policy.support-order.codepoint.v1"];
    const nearMisses = [
      "graphpolicy",
      "graphpolicy.",
      "graphpolicy.c1",
      "graphpolicy.snapshot.c1:0a1b",
      "GP_CLI_INTERNAL",
      "GF_IDENTIFIER_INVALID",
      "the graphpolicy.cli.v1 schema",
      "GRAPHPOLICY.CLI.V1",
      "gp.rpc.reply",
      "graphpolicy.cli.v1 ",
    ];
    const read = (marker: string): number => judgeJson({ schema: marker, identity_unavailable: true }).length;
    // Only a document's own schema marks it: a gp value quoted under any other key is a Pi record, not gp output.
    const quoted = [
      { descriptorSchema: "graphpolicy.cli.v1", identity_unavailable: true },
      { value: "graphpolicy.snapshot.c1:0a1b", code: "GP_CLI_INTERNAL", identity_unavailable: true },
      { schema_ref: { namespace: "graphpolicy.data.v1" }, identity_unavailable: true },
    ].map(value => judgeJson(value).length);
    const reading = {
      marks: marks.map(read),
      nearMisses: nearMisses.map(read),
      quoted,
      nested: judgeJson({ outer: { schema: "graphpolicy.cli.v1", inner: [{ identity_unavailable: true }] } }).map(hit => hit.pointer),
      shipped: marks.every(mark => SHIPPED_SCHEMAS.has(mark)),
    };
    expect(reading).toStrictEqual({ marks: marks.map(() => 1), nearMisses: nearMisses.map(() => 0), quoted: [0, 0, 0], nested: ["/outer/inner/0/identity_unavailable"], shipped: true });
    return reading;
  },
  MK: async () => {
    const snake = (run: readonly string[]): string => run.join("_");
    const readings = MEMBERS.filter(member => member.reading === "words").flatMap(member =>
      member.runs.map(run => ({
        member: member.id,
        run: run.join(" "),
        key: bFindings(JSON.parse(gpJson({ [snake(run)]: true }))).length,
        value: bFindings(JSON.parse(gpJson({ kind: run.join(" ") }))).length,
        unmarked: bFindings({ schema: "plant.v1", result: { [snake(run)]: true, kind: run.join(" ") } }).length,
      })),
    );
    const namespaces = ["graphpolicy.snapshot.c2:0a1b", "graphpolicy.c3", "graphpolicy.checkpoint.c10:ff", "graphpolicy.store.policy.c0", "graphpolicy.identity.v1", "graphpolicy.cli.v2", "gp.rpc.reply/v2"].map(
      value => ({ value, hits: bFindings(JSON.parse(gpJson({ graph: value }))).length }),
    );
    const shipped = [...ROSTER.digestDomains, ...ROSTER.shippedSchemas, "graphpolicy.snapshot.c1:0a1b"].map(value => ({ value, hits: bFindings(JSON.parse(gpJson({ graph: value }))).length }));
    // Each member's runs are the program's own words at the line it cites, measured at the pin (the roster's producer sites).
    const measured = MEMBERS.map(member => ({
      member: member.id,
      held:
        member.runs.every(run => holdsRun(wordsOf(siteText(member.id)), run)) &&
        (!member.namespace || (siteText(member.id).includes("versioned new namespace") && siteText(member.id).includes("versioned identity descriptor"))),
    }));
    const domains = {
      prefix: siteText("digestDomain").includes(".c1"),
      allC1: ROSTER.digestDomains.length > 0 && ROSTER.digestDomains.every(domain => domain.endsWith(".c1")),
      schemas: ROSTER.shippedSchemas.length > 0 && ROSTER.shippedSchemas.every(schema => SCHEMA_ID.test(schema)),
    };
    expect({
      readings: readings.map(({ key, value, unmarked }) => ({ key, value, unmarked })),
      namespaces: namespaces.map(entry => entry.hits),
      shipped: shipped.map(entry => entry.hits),
      measured,
      domains,
    }).toStrictEqual({
      readings: readings.map(() => ({ key: 1, value: 1, unmarked: 0 })),
      namespaces: [1, 1, 1, 1, 1, 1, 1],
      shipped: shipped.map(() => 0),
      measured: MEMBERS.map(member => ({ member: member.id, held: true })),
      domains: { prefix: true, allC1: true, schemas: true },
    });
    return { readings, namespaces, shipped: shipped.length, measured, domains };
  },
  MO: async () => {
    const observed = [
      ...(OBSERVED[0]?.states ?? []).map(value => gpJson({ checkpoint: "graphpolicy.checkpoint.c1:ab", state: value, bytes_present: value !== "missing" })),
      gpJson({ checkpoint: "graphpolicy.checkpoint.c1:ab", state: "quarantined", bytes_present: true, quarantine_record: "x" }),
      JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, error: { code: "GP_TRAIN_REWARD_BASIS_INVALID", record: "e1", state: "missing" } }),
    ].map(text => bFindings(JSON.parse(text)).length);
    const candidates = [
      gpJson({ checkpoint: "graphpolicy.checkpoint.c1:ab", state: "missing", bytes_present: false, verified: false }),
      gpJson({ checkpoint: "graphpolicy.checkpoint.c1:ab", state: "missing" }),
      gpJson({ checkpoint: "graphpolicy.checkpoint.c1:ab", state: "verified", bytes_present: true }),
      JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, error: { code: "GP_CLI_INTERNAL", record: "e1", state: "missing" } }),
      JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, error: { code: "GP_TRAIN_REWARD_BASIS_INVALID", record: "e1", state: "missing", extra: 1 } }),
    ].map(text => bFindings(JSON.parse(text)));
    const keys = ["state", "status", "store_state", "checkpointStatus", "store", "checkpoint", "reason", "states"].map(key => ({ key, hits: bFindings(JSON.parse(gpJson({ [key]: "missing" }))).length }));
    const words = ["missing", "admissible-unbacked", "Admissible_Unbacked", "verified", "eligible", "quarantined", "MISSING", "available", "missing reason"].map(value => ({ value, hits: bFindings(JSON.parse(gpJson({ store_state: value }))).length }));
    // Each observed shape is the producer's own: its keys (and O2's code family) at its measured line, O1's states in gp's union.
    const measured = OBSERVED.map(shape => ({
      shape: shape.id,
      keys: [...shape.required, ...shape.optional].every(name => siteText(shape.id).includes(name)),
      code: shape.codePrefix === null || siteText(shape.id).includes(`"${shape.codePrefix}`),
      states: shape.states === null || shape.states.every(state => siteText(`${shape.id}states`).includes(`"${state}"`)),
    }));
    expect(measured).toStrictEqual(OBSERVED.map(shape => ({ shape: shape.id, keys: true, code: true, states: true })));
    expect({ observed, candidates, keys: keys.map(entry => entry.hits), words: words.map(entry => entry.hits) }).toStrictEqual({
      observed: [0, 0, 0, 0, 0],
      candidates: [
        ['x.json#/result/state K6: state state="missing"'],
        ['x.json#/result/state K6: state state="missing"'],
        ['x.json#/result/state K6: state state="verified"'],
        ['x.json#/error/state K6: state state="missing"'],
        ['x.json#/error/state K6: state state="missing"'],
      ],
      keys: [1, 1, 1, 1, 1, 1, 0, 0],
      words: [1, 1, 1, 1, 1, 1, 1, 0, 0],
    });
    return { observed, candidates, keys, words };
  },
  MJ: async () => {
    const modules = [
      'export const a = { schema: "graphpolicy.cli.v1", result: { identity_unavailable: true } };\n',
      'export const xs = [{ schema: "graphpolicy.cli.v1", identity_unavailable: true }];\n',
      'export const b = { schema: "graphpolicy." + "cli.v1", identity_unavailable: true };\n',
      "export const c = { schema: `graphpolicy.cli.v1`, identity_unavailable: true };\n",
      'export const d = ({ schema: "graphpolicy.cli.v1", identity_unavailable: true }) as const;\n',
      'export const e = { schema: "graphpolicy.cli.v1", identity_unavailable: true } satisfies object;\n',
      `const s = '${JSON.stringify({ schema: "graphpolicy.cli.v1", identity_unavailable: true })}';\n`,
      'export function f() {\n  return { schema: "graphpolicy.cli.v1", identity_unavailable: true };\n}\n',
      'export const g = { schema: "graphpolicy.cli.v1", result: { inner: { identity_unavailable: true } } };\n',
      'export const h = { "schema": "graphpolicy.cli.v1", "identity_unavailable": true };\n',
      'export const i = { seam: { stdout: JSON.stringify({ schema: "graphpolicy.cli.v1", identity_unavailable: true }) } };\n',
      'export const j = { stdout: \'{"schema":"graphpolicy.cli.v1","identity_unavailable":true}\' };\n',
    ].map(text => moduleHits("m.ts", text));
    expect(modules).toStrictEqual([
      ["m.ts:1#/result/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/0/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:2#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/result/inner/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/identity_unavailable K1: key identity_unavailable"],
      ["m.ts:1#/stdout/identity_unavailable K1: key identity_unavailable"],
    ]);
    return { modules };
  },
  MR: async () => {
    const admitted = [...ROSTER.rulingSamples, "GP-REQ-001", "GPR-1005", "ADR-GP-012"].map(id => ({ id, ruling: RULING.test(id) }));
    const refused = ["FCA-2", "D-STORE-2", "RC-STORE", "F07", "GPR-15", "GP-REQ-15", "ADR-2", "gpr-1554", "GP-REQ-0150", "ADR-GP-02", "IMPL-801", "GPR-1554a"].map(id => ({ id, ruling: RULING.test(id) }));
    // The program's own labels are not ruling ids (01-finding-inventory.md:52 at the pin, a producer site).
    const labelsSite = siteText("labelsNotRulings");
    const measured = { notAllocated: labelsSite.includes("not allocated GPR IDs"), prefixes: ["`F*`", "`RC-*`", "`FCA-*`"].filter(prefix => labelsSite.includes(prefix)).length };
    expect({ admitted: admitted.map(entry => entry.ruling), refused: refused.map(entry => entry.ruling), measured }).toStrictEqual({
      admitted: admitted.map(() => true),
      refused: refused.map(() => false),
      measured: { notAllocated: true, prefixes: 3 },
    });
    return { admitted, refused, measured };
  },
  R11: async () => {
    const claim = "Pi encodes D-STORE-2 as gp contract.\n";
    const fixture = gpJson({ identity_unavailable: true });
    const tree = treeCensus(
      "gp-fca-outside-",
      Object.fromEntries(
        ["new-feedback/x", "vendor/x", "media/x", "dist/x", "node_modules/x/y", ".beads/x", "docs.md.d/x"].flatMap(base => [
          [`${base}.md`, claim],
          [`${base}.json`, fixture],
        ]),
      ),
    );
    const reading = { a: tree.a, b: tree.b };
    expect(reading).toStrictEqual({ a: [], b: [] });
    return reading;
  },
  R15: async () => {
    const tree = treeCensus("gp-fca-prose-", {
      "test/fixtures/.pi/agents/plant.md": `# plant\n\n\`\`\`json\n${gpJson({ identity_unavailable: true })}\n\`\`\`\n`,
      "test/fixtures/plant.txt": gpJson({ identity_unavailable: true }),
    });
    const reading = { a: tree.a, b: tree.b, judgedB: tree.judgedB };
    expect(reading).toStrictEqual({ a: [], b: [], judgedB: [] });
    return reading;
  },
  R18: async () => {
    const refusal = refusalOf({ row: "B", path: "x.json", member: "K1", ruling: "GPR-9999" }, traceRows(`${TRACE_HEAD}| WB-999 | P2 | GPR-9999 adopted 2026-10-23 | fixture |\n`));
    expect(refusal).toBeNull();
    return { refusal };
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async (): Promise<Json> => {
        const outcome = outcomeOf(entry.kind, entry.text);
        expect(outcome).toStrictEqual([...entry.outcome]);
        return { kind: entry.kind, outcome };
      },
    ]),
  ),
};

/** Every registered test of this file in the vitest task tree, in order. */
function registered(tasks: readonly RunnerTask[]): RunnerTestCase[] {
  return tasks.flatMap((child): RunnerTestCase[] => (child.type === "test" ? [child] : child.type === "suite" ? registered(child.tasks) : []));
}
const expectedTitles = (): string[] => [FIRST_TITLE, ...ROWS.flatMap(row => row.pins), RECORD_TITLE];

describe("wb-gxd7.2 GP-FCA open-decisions posture census (GPC-FEEDBACK-CONTRACT-AUDIT-R2)", () => {
  it(FIRST_TITLE, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:3", "F:1", "M:19", "R:21"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
    const tests = registered(task.file.tasks);
    expect(tests.map(entry => entry.name), "the registered tests of this file, in order").toEqual(expectedTitles());
    expect(tests.filter(entry => entry.mode !== "run" || entry.fails === true).map(entry => `${entry.name} | ${entry.mode}`), "every registered test is in run mode, not inverted").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    expect([...REACHED].sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const tests = registered(task.file.tasks);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const others = tests.filter(entry => entry.name !== RECORD_TITLE);
    expect(others.filter(entry => entry.mode !== "run" || entry.fails === true || !ran(entry.result?.state)).map(entry => `${entry.name} | ${entry.mode} | ${entry.result?.state ?? "no result"}`), "every other test is in run mode, not inverted, and ran first").toEqual([]);
    expect(tests.map(entry => entry.name)).toEqual(expectedTitles());
  });
});
