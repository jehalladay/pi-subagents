/**
 * wb-km7q.8 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R20, program-triage-2026-10-18 child of wb-km7q): the
 * adoption-time falsifier of an INF gating requirement, cut while Pi composes neither SDK. Statement (bead title): "If Pi ever
 * composes ReactiveQuerySDK evidence with ReactiveInferenceSDK-mediated execution (gated INF-RQ1..INF-RQ5), no query
 * recomputation or UNKNOWN->TRUE change directly calls a model; a QueryView source witness entering a model context basis is
 * retained as typed provenance on the existing request identifier/receipt; no query engine is expected inside the inference
 * SDK." Acceptance (owner filing, verbatim, read from the tracked bead export; the labels of rows A and B joined by one space are
 * this clause word for word): "adoption-time falsifier that an UNKNOWN->TRUE flip alone produces zero model calls and that a
 * model request receipt retains the QueryView source witness as typed provenance". Row C's label is the title's gate clause.
 * CLAIMED: that clause, as an until-then falsifier: the falsifier is built, proven live against mutant compositions and run over
 * Pi's session as it stands; the gate (row C) reads CLOSED, and the first Pi module that names either SDK flips it and reds
 * this census until the adopting cut brings its own composition and receipt under rows A and B.
 * NOT CLAIMED (ROSTER.unclaimed): the title's last clause (no query engine is expected inside the inference SDK: a producer-side
 * duty the producer states at execution.py:437, "no query engine enters this package"; Pi expects nothing of the SDK while it
 * composes nothing); the producer's own INF-RQ1..INF-RQ5 tests (C2 reads their gate state, never re-runs them); wb-km7q.7's
 * (R19) standing posture - whether any Pi model-call site is reachable from an evidence path beyond the projection module, and
 * the opt-in checklist.
 *
 * THE PRODUCER AT THE PINS (the roster's `producer` block; measured read-only with git show by the cutting seat on 2026-10-28 in
 * the local ReactiveInferenceSDK checkout, no fetch; this census is hermetic and never re-reads it): the charter
 * docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (6252a3f6ffcc) at the bead pin
 * 52c9271ed485 and at the checkout's origin/master e361471d0b5c (2026-10-28T08:15:07Z). The roster vendors its lines :3 (the
 * status line, "design only"), :35 (query recomputation or a change from UNKNOWN to TRUE never directly calls a model), :37
 * (a QueryView source witness in the model context basis is retained as typed provenance on the existing model request
 * identifier/receipt) and :39 (the acceptance line naming INF-RQ1..INF-RQ5), and at e361471d0b5c the typed witness the producer
 * now ships: execution.py :432-:442 (class SourceWitness: host_epoch and generation int or None, source_digest and trace_id str
 * or None; ":435 a QueryView witness travels here, as typed provenance and nothing more") and usage_receipt.py :119 (schema
 * reactive_inference.usage_receipt/1) and :734 (the receipt's `witness: SourceWitness | None`), each with its sha256 (UTF-8, no
 * line end).
 * THE GATE: producerGateOf reads PASSED only when the status line no longer carries "design only" and the acceptance line still
 * names every gate the title's range INF-RQ1..INF-RQ5 expands to (a missing line fails closed); the Pi seam (C1) reads PRESENT
 * once a Pi code module or a package.json dependency names either SDK. gateOf is CLOSED while the seam reads ABSENT;
 * ADOPTED-BEFORE-GATE when it reads PRESENT under a NOT-PASSED producer and ADOPTED-FALSIFIER-OWED under a PASSED one, both red
 * here: the adoption is the FLIP of this freeze-and-flip, and the adopting cut re-measures this census with its composition
 * handed to falsify() and its receipt to witnessViolations().
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of a capital run, lower case, the runs
 *   of a-z and 0-9 (ReactiveQuerySDK reads reactive query sdk; reactive_inference reads reactive inference).
 * - SUBJECTS (never a literal here: vocabularyOf derives them from the bead title): the title's CamelCase names
 *   (ReactiveQuerySDK, ReactiveInferenceSDK, QueryView) cut into words; the subject words are what one SDK-suffixed name spells
 *   and the other does not (query, inference); every adjacent word pair of a name holding a subject word is read, adjacent or
 *   fused into one word (reactive query, query sdk, query view, reactive inference, inference sdk; reactivequery, querysdk,
 *   queryview, reactiveinference, inferencesdk). A word alone (query, inference, view) is never a subject: Pi's projection
 *   answers query(), and "type inference" is prose.
 * - SEGMENTS: two words are adjacent only inside one run of letters, digits, white space, "_", "-", "." and "/" (prose, a name,
 *   a path, a package name); any other character ends the run, so claude-host.ts's `config.query ?? sdkQuery` (measured at the
 *   first red: it read "query sdk" across the operator) reads nothing, while "the reactive query engine" and
 *   "@acme/reactive-query" do. A pair split across a line break is read at its first line, the next line's leading comment
 *   marker (//, *, #) dropped.
 * - THE FLIP (the house analog: Pi holds no QueryView): Pi's real ObservationProjection defaults an observed node it has no
 *   presentation for to statusText "UNKNOWN" and statusTone "unknown" (observation.ts ingest); the flip is the same source read
 *   back as statusText "TRUE", statusTone "success", on two arms (a refresh snapshot with coverage complete; an ingest event),
 *   and the recomputation is the same source read again at the next sequence with the same answer.
 * - THE FALSIFIER: falsify(composition) builds a live session - the real projection, the real Claude workflow host
 *   (createClaudeWorkflowHost) on a counting ClaudeQuery (the host's one model seam) and Pi's real runWorkflow for explicit
 *   demand - lets the composition attach to the session (it may wrap the projection) and hands it every evidence step as it
 *   lands. It reads the count from before each step lands to when its handler settles, after
 *   a SETTLE_MS real-time settle and again after it releases readOver and settles once more; a violation is any call counted
 *   inside the window: `call-on:<arm>:<step>` for a handler's own call, `deferred:<n>` for calls landing before the read.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; each pin's phrases tile its row's label, and
 * every witness is held to the roster):
 *  A "adoption-time falsifier that an UNKNOWN->TRUE flip alone produces zero model calls": A1 the falsifier fails each mutant
 *    composition (a demand on the flip, a direct call on the recomputation, a call deferred inside the settle, a projection whose
 *    refresh is wrapped to call on the flip, a call resolving the UNKNOWN reading) and its pinned quiet rows (read-only, R-LATE, R-OTHER-SEAM); A2 the flip on both arms through Pi's real
 *    projection (every step's return code and its before and after readings) and its isolation: the projection module's
 *    value-import closure reaches no model-call module and no model package, the model-call modules of src are an exact set
 *    (the falsifier's own host module among them) and the closure reader's controls; A3 Pi's session as it stands (no
 *    composition: C1 reads ABSENT) reads 0 calls on both arms, the counter is live (one explicit demand afterwards counts exactly
 *    one call carrying its prompt) and R-EXPLICIT's quiet row.
 *  B "and that a model request receipt retains the QueryView source witness as typed provenance": B1 Pi's existing model request
 *    identifier and receipt (ClaudeCallIdentity, WorkflowSpawnRequest, WorkflowSpawnResult, WorkflowJournalEntry, read from src by
 *    the TypeScript AST, and the keys the demand's call, settled result and journal row carry at run time) name no witness
 *    member today (NO-WITNESS-SEAM); the journal row's basis is the host's replay basis (the nearest Pi analog of a model context
 *    basis: the host's own configuration as a JSON array); with its controls and R-OTHER-RECORD's quiet row; B2 witnessViolations, typed by the
 *    producer's own SourceWitness lines, accepts a retained witness and refuses each hollowing (dropped, null, stringified,
 *    folded into text, an array, a renamed, retyped, changed, missing or extra field), with R-SAME-VALUE's quiet row.
 *  C "If Pi ever composes ReactiveQuerySDK evidence with ReactiveInferenceSDK-mediated execution (gated INF-RQ1..INF-RQ5)": C1 the
 *    Pi seam reads ABSENT (every git-listed JS/TS module, tracked or untracked and never ignored, below src/, qa/ and examples/ and
 *    at the root, read line by line and across each line break, and package.json's four dependency fields), the reader's plants
 *    read PRESENT, its quiet rows (R-OUTSIDE-ROOTS, R-COMPOSED, R-LOOKALIKE, R-RF-INTERNAL) stay quiet and the role places read in
 *    their role (each title name, producer lines :35 and :37); C2 the producer facts (every vendored line's sha256, the title's
 *    range expanded to the five ids the acceptance line names, the status line's "design only"), producerGateOf NOT-PASSED, gateOf
 *    CLOSED and the gate's near misses.
 * OUTSIDE ANCHORS (the judged-set case): wb-km7q.8's row of the tracked bead export (.beads/issues.jsonl; the first notes line
 *   opening "Citations: ", so appended notes never move it): the rows' labels joined in order equal its Acceptance clause followed
 *   by its title's gate clause (the title from its tag to its first ", "), each label is its pins' phrases joined, its cited
 *   lines (:35, :37, :39 at 52c9271ed485) are vendored in the roster at that pin, the line it cites for the acceptance gates names
 *   exactly the ids of the title's range, and its title spells the subjects (vocabularyOf) and the range (gateIdsOf). The producer's own
 *   lines type the witness check (B2) and anchor the role places (C1); src anchors B1's member lists and A2's model-call modules.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, the rows, the residuals and every pin's witness
 *   are held to the out-of-file roster (test/fixtures/ri-query-evidence-model-call-roster.json), and the last case reads that every
 *   pin ran once to its witness and that every named residual has its quiet row in a pin's witness.
 * RESIDUALS (named; each has a pinned quiet row): R-LATE (A1) a call deferred past the settle lands after the read; R-OTHER-SEAM
 *   (A1) a model call through another seam (the SDK called directly, Pi's Agent tool session in agent-runner.ts, the mention clone)
 *   is not counted; R-OBSERVER-PATH (A2) the closure covers the projection module, so an observer that couples a flip to a model
 *   call before it hands evidence to the projection is not read (wb-km7q.7's reachability); R-EXPLICIT (A3) an explicit demand
 *   carrying the flipped answer as conditioning data (charter :35) is demand, never a flip's call; R-OTHER-RECORD (B1) a witness
 *   member on a record other than the four is not read; R-SAME-VALUE (B2) the check judges value and type against the witness
 *   handed in, so a copy with equal fields passes; R-OUTSIDE-ROOTS (C1) docs, test/, vendor/, .beads/ and every non-JS/TS file
 *   (this census and its roster spell every subject) are not read; R-COMPOSED (C1) a subject assembled from parts that split its
 *   words; R-LOOKALIKE (C1) a look-alike letter NFKC does not fold; R-RF-INTERNAL (C1) rf's own composition (its sdk_versions names
 *   reactive_inference) read by a module that never spells it.
 *
 * Display paths added: none. Test-only: no src file is edited, no scratch is allocated (the projection, the host and the counting
 * query live in memory; the host's cwd is the repository root, which it only checks), and every stand-in lives in this file.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type NativeRef, type ObservationEvent, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult, type WorkflowSpawnResult } from "../src/workflow/runtime.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/ri-query-evidence-model-call-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.8";

interface PinRow {
  readonly id: string;
  readonly phrase: string;
}
interface JudgedRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly PinRow[];
}
interface ProducerLine {
  readonly line: number;
  readonly sha256: string;
  readonly text: string;
}
interface ProducerFile {
  readonly path: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly JudgedRow[];
  readonly frozenShape: readonly string[];
  readonly settleMs: number;
  readonly producer: {
    readonly repo: string;
    readonly pin: string;
    readonly probe: string;
    readonly charter: ProducerFile;
    readonly witness: ProducerFile;
    readonly receipt: ProducerFile;
  };
  readonly residuals: readonly string[];
  readonly unclaimed: readonly string[];
  readonly witnesses: Readonly<Record<string, Json>>;
}

const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;

/** The judged set: each label is its pins' phrases joined by one space, and A and B joined are the bead's acceptance clause. */
const ROWS: readonly JudgedRow[] = [
  {
    id: "A",
    label: "adoption-time falsifier that an UNKNOWN->TRUE flip alone produces zero model calls",
    pins: [
      { id: "A1", phrase: "adoption-time falsifier" },
      { id: "A2", phrase: "that an UNKNOWN->TRUE flip alone" },
      { id: "A3", phrase: "produces zero model calls" },
    ],
  },
  {
    id: "B",
    label: "and that a model request receipt retains the QueryView source witness as typed provenance",
    pins: [
      { id: "B1", phrase: "and that a model request receipt" },
      { id: "B2", phrase: "retains the QueryView source witness as typed provenance" },
    ],
  },
  {
    id: "C",
    label: "If Pi ever composes ReactiveQuerySDK evidence with ReactiveInferenceSDK-mediated execution (gated INF-RQ1..INF-RQ5)",
    pins: [
      { id: "C1", phrase: "If Pi ever composes ReactiveQuerySDK evidence with ReactiveInferenceSDK-mediated execution" },
      { id: "C2", phrase: "(gated INF-RQ1..INF-RQ5)" },
    ],
  },
];
const FROZEN_SHAPE = ["A:3", "B:2", "C:2"];
const RESIDUALS = [
  "R-LATE",
  "R-OTHER-SEAM",
  "R-OBSERVER-PATH",
  "R-EXPLICIT",
  "R-OTHER-RECORD",
  "R-SAME-VALUE",
  "R-OUTSIDE-ROOTS",
  "R-COMPOSED",
  "R-LOOKALIKE",
  "R-RF-INTERNAL",
];
/** The bounded real-time settle every falsifier read waits for (no fake clock). */
const SETTLE_MS = 150;
/** The charter's status line: the cited acceptance line comes from the bead export, this one is the roster's. */
const STATUS_LINE = 3;
const RUNTIME_TIMEOUT_MS = 60_000;

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The bead export (outside anchor)
 * ----------------------------------------------------------------------------------------------------------------------- */

interface BeadRow {
  readonly title: string;
  /** The first notes line opening "Citations: ": the owner filing's citations, authority and acceptance. */
  readonly citation: string;
}
function beadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; notes?: unknown };
    if (row.id !== BEAD) continue;
    const title = typeof row.title === "string" ? row.title : "";
    const notes = typeof row.notes === "string" ? row.notes : "";
    const citation = notes.split("\n").find(text => text.startsWith("Citations: ")) ?? "";
    return { title, citation };
  }
  throw new Error(`${BEAD} has no row in ${BEAD_EXPORT}`);
}
/** The title's gate clause: from after its "[...] " tag to its first ", " (the condition the title's duties hang on). */
function gateClauseOf(title: string): string | undefined {
  return /^\[[^\]]*\] ([^,]*), /.exec(title)?.[1];
}
/** The Acceptance clause of the citation line, up to its first ";". */
function acceptanceOf(citation: string): string | undefined {
  return /\bAcceptance: ([^;]*);/.exec(citation)?.[1];
}
/** The charter line the citation names for the acceptance gates: `acceptance <ids> (:<line>@<pin>)`. */
function acceptanceLineOf(citation: string): number | undefined {
  const match = /\bacceptance [^(]*\(:(\d+)@[0-9a-f]{12}\)/.exec(citation);
  return match === null ? undefined : Number(match[1]);
}
/** Every `:<line>@<12 hex>` pin the citation line names, in order. */
function citedLinesOf(citation: string): { line: number; pin: string }[] {
  return [...citation.matchAll(/:(\d+)@([0-9a-f]{12})\b/g)].map(match => ({ line: Number(match[1]), pin: match[2] }));
}
/** The gate ids the title's `(gated X1..Xn)` range expands to. */
function gateIdsOf(title: string): string[] {
  const range = /\(gated ([A-Z]+(?:-[A-Z]+)*)(\d+)\.\.\1(\d+)\)/.exec(title);
  if (range === null) return [];
  const ids: string[] = [];
  for (let n = Number(range[2]); n <= Number(range[3]); n += 1) ids.push(`${range[1]}${n}`);
  return ids;
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * Words and subjects (C1)
 * ----------------------------------------------------------------------------------------------------------------------- */

function wordsOf(text: string): string[] {
  const split = text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  return split.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}
interface SubjectPair {
  readonly words: readonly [string, string];
  readonly subject: string;
}
/** The title's CamelCase names, each cut into its words. */
function titleNamesOf(title: string): string[][] {
  return title
    .split(/[^A-Za-z0-9]+/)
    .filter(token => /[a-z][A-Z]/.test(token))
    .map(wordsOf);
}
/** The subject vocabulary, derived from the bead title: see READINGS. */
function vocabularyOf(title: string): SubjectPair[] {
  const names = titleNamesOf(title);
  const sdks = names.filter(words => words.at(-1) === "sdk");
  const subjects = [...new Set(sdks.flatMap(words => words.filter(word => sdks.some(other => other !== words && !other.includes(word)))))];
  const pairs = new Map<string, SubjectPair>();
  for (const words of names) {
    for (let index = 0; index + 1 < words.length; index += 1) {
      const pair: [string, string] = [words[index], words[index + 1]];
      const subject = subjects.find(word => pair.includes(word));
      if (subject !== undefined) pairs.set(pair.join(" "), { words: pair, subject });
    }
  }
  return [...pairs.values()].sort((left, right) => left.words.join(" ").localeCompare(right.words.join(" ")));
}
function subjectsIn(words: readonly string[], vocabulary: readonly SubjectPair[]): string[] {
  const found = new Set<string>();
  words.forEach((word, index) => {
    for (const pair of vocabulary) {
      if (word === pair.words[0] && words[index + 1] === pair.words[1]) found.add(pair.subject);
      if (word.includes(pair.words.join(""))) found.add(pair.subject);
    }
  });
  return [...found].sort();
}
/**
 * The subjects one text names. Two words are adjacent only inside one SEGMENT: a run of letters, digits, white space, "_", "-",
 * "." and "/" (prose, a name, a path or a package name); any other character (an operator, a bracket, a quote, a comma) ends
 * it, so `config.query ?? sdkQuery` reads no "query sdk" while "the reactive query engine" and "@acme/reactive-query" do.
 */
function readSubjects(text: string, vocabulary: readonly SubjectPair[]): string[] {
  const segments = text.normalize("NFKC").split(/[^\p{L}\p{N}\s_./-]+/u);
  return [...new Set(segments.flatMap(segment => subjectsIn(wordsOf(segment), vocabulary)))].sort();
}
/** A line's leading comment marker (`//`, `*`, `#`), dropped where a pair is read across a line break. */
const COMMENT_LEAD = /^\s*(?:\/\/+|\*+|#+)\s?/;
/** `<path>:<line> <subject>` for each line naming a subject, and for a pair split across a line break (read at its first line). */
function findingsOf(path: string, text: string, vocabulary: readonly SubjectPair[]): string[] {
  const lines = text.split(/\r?\n/);
  const findings: string[] = [];
  lines.forEach((line, index) => {
    const here = readSubjects(line, vocabulary);
    const next = index + 1 < lines.length ? lines[index + 1] : undefined;
    const split =
      next === undefined
        ? []
        : readSubjects(`${line} ${next.replace(COMMENT_LEAD, "")}`, vocabulary).filter(subject => !here.includes(subject) && !readSubjects(next, vocabulary).includes(subject));
    for (const subject of [...new Set([...here, ...split])].sort()) findings.push(`${path}:${index + 1} ${subject}`);
  });
  return findings;
}

const CODE_ROOTS = ["examples", "qa", "src"];
const CODE_FILE = /\.(?:[cm]?[jt]s|[jt]sx)$/;
const DEPENDENCY_FIELDS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
/** The read set: JS and TS modules below the code roots and at the repository root (R-OUTSIDE-ROOTS reads the rest). */
function selectCode(paths: readonly string[]): string[] {
  return paths.filter(path => CODE_FILE.test(path) && (!path.includes("/") || CODE_ROOTS.includes(path.split("/")[0]))).sort();
}
function listedCode(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...CODE_ROOTS, ":(glob)*"], {
    cwd: REPO,
    encoding: "utf8",
    maxBuffer: 1 << 26,
  });
  return selectCode(out.split("\0").filter(path => path !== "" && existsSync(join(REPO, path))));
}
function manifestFindings(manifest: { [key: string]: Json }, vocabulary: readonly SubjectPair[]): string[] {
  const findings: string[] = [];
  for (const field of DEPENDENCY_FIELDS) {
    const entries = manifest[field];
    if (entries === null || typeof entries !== "object" || Array.isArray(entries)) continue;
    for (const name of Object.keys(entries).sort()) {
      for (const subject of readSubjects(name, vocabulary)) findings.push(`package.json:${field}:${name} ${subject}`);
    }
  }
  return findings;
}
interface SeamReading {
  readonly modules: number;
  readonly findings: readonly string[];
}
let SEAM: SeamReading | undefined;
/** The live seam reading, read once per run. */
function liveSeam(): SeamReading {
  SEAM ??= seamReading(VOCABULARY);
  return SEAM;
}
function seamReading(vocabulary: readonly SubjectPair[]): SeamReading {
  const modules = listedCode();
  const code = modules.flatMap(path => findingsOf(path, readFileSync(join(REPO, path), "utf8"), vocabulary));
  const manifest = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")) as { [key: string]: Json };
  return { modules: modules.length, findings: [...code, ...manifestFindings(manifest, vocabulary)] };
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The producer and the gate (C2)
 * ----------------------------------------------------------------------------------------------------------------------- */

function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
function linesOf(file: ProducerFile): Map<number, string> {
  return new Map(file.lines.map(line => [line.line, line.text]));
}
type ProducerGate = "PASSED" | "NOT-PASSED";
function producerGateOf(lines: ReadonlyMap<number, string>, acceptanceLine: number | undefined, ids: readonly string[]): ProducerGate {
  const status = lines.get(STATUS_LINE);
  const acceptance = acceptanceLine === undefined ? undefined : lines.get(acceptanceLine);
  if (status === undefined || acceptance === undefined || ids.length === 0) return "NOT-PASSED";
  if (/\bdesign only\b/i.test(status)) return "NOT-PASSED";
  return ids.every(id => new RegExp(`\\b${id}\\b`).test(acceptance)) ? "PASSED" : "NOT-PASSED";
}
type Gate = "CLOSED" | "ADOPTED-BEFORE-GATE" | "ADOPTED-FALSIFIER-OWED";
function gateOf(producer: ProducerGate, seam: readonly string[]): Gate {
  if (seam.length === 0) return "CLOSED";
  return producer === "PASSED" ? "ADOPTED-FALSIFIER-OWED" : "ADOPTED-BEFORE-GATE";
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * Module closure and model-call modules (A2)
 * ----------------------------------------------------------------------------------------------------------------------- */

/** The model-call entry points of Pi's dependencies: a value import of one of these names, a namespace or a dynamic import. */
const MODEL_CALL_ENTRIES: Readonly<Record<string, readonly string[]>> = {
  "@anthropic-ai/claude-agent-sdk": ["query"],
  "@earendil-works/pi-coding-agent": ["createAgentSession"],
};
const PROJECTION_MODULE = "src/workbench/observation.ts";
const HOST_MODULE = "src/workbench/claude-host.ts";
type ReadModule = (path: string) => string | undefined;

function sourceOf(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
}
/** Every value specifier a module reaches: imports and re-exports that are not type-only, dynamic imports and require calls. */
function valueSpecifiers(path: string, text: string): string[] {
  const specifiers: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.importClause?.isTypeOnly !== true) {
      specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && !node.isTypeOnly) {
      specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const first = node.arguments[0];
      const loader = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
      if (loader && first !== undefined && ts.isStringLiteralLike(first)) specifiers.push(first.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceOf(path, text));
  return specifiers;
}
function resolveRelative(from: string, specifier: string): string {
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  return joined.replace(/\.js$/, ".ts").replace(/\.mjs$/, ".mts");
}
interface Closure {
  readonly modules: readonly string[];
  readonly packages: readonly string[];
  readonly unread: readonly string[];
}
function closureOf(entry: string, read: ReadModule): Closure {
  const modules = new Set<string>();
  const packages = new Set<string>();
  const unread = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const path = queue.shift() ?? "";
    if (modules.has(path) || unread.has(path)) continue;
    const text = read(path);
    if (text === undefined) {
      unread.add(path);
      continue;
    }
    modules.add(path);
    for (const specifier of valueSpecifiers(path, text)) {
      if (specifier.startsWith(".")) queue.push(resolveRelative(path, specifier));
      else packages.add(specifier.startsWith("node:") ? specifier : specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/"));
    }
  }
  return { modules: [...modules].sort(), packages: [...packages].sort(), unread: [...unread].sort() };
}
/** The model-call entries one module imports by value: `<package>:<name>`, `<package>:*` for a namespace or a dynamic import. */
function modelCallsOf(path: string, text: string): string[] {
  const calls = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.importClause?.isTypeOnly !== true) {
      const entries = MODEL_CALL_ENTRIES[node.moduleSpecifier.text];
      const bindings = node.importClause?.namedBindings;
      if (entries !== undefined && bindings !== undefined) {
        if (ts.isNamespaceImport(bindings)) calls.add(`${node.moduleSpecifier.text}:*`);
        else {
          for (const element of bindings.elements) {
            const imported = (element.propertyName ?? element.name).text;
            if (!element.isTypeOnly && entries.includes(imported)) calls.add(`${node.moduleSpecifier.text}:${imported}`);
          }
        }
      }
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first) && MODEL_CALL_ENTRIES[first.text] !== undefined) calls.add(`${first.text}:*`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceOf(path, text));
  return [...calls].sort();
}
function modelCallModules(paths: readonly string[], read: ReadModule): string[] {
  return paths.filter(path => modelCallsOf(path, read(path) ?? "").length > 0).sort();
}
const readTree: ReadModule = path => (existsSync(join(REPO, path)) ? readFileSync(join(REPO, path), "utf8") : undefined);
function readMap(files: Readonly<Record<string, string>>): ReadModule {
  return path => (Object.hasOwn(files, path) ? files[path] : undefined);
}
/** Whether a closure reaches a model call: a model-call module in it, or a model package it imports. */
function reachesModel(closure: Closure, models: readonly string[]): string[] {
  return [...closure.modules.filter(path => models.includes(path)), ...closure.packages.filter(name => Object.hasOwn(MODEL_CALL_ENTRIES, name))].sort();
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The falsifier (A1-A3)
 * ----------------------------------------------------------------------------------------------------------------------- */

const SCOPE: ObservationScope = { workspace: "/fixture/km7q8-workspace", principal: "census-operator" };
const STAMPS = ["2026-10-28T00:00:01.000Z", "2026-10-28T00:00:02.000Z", "2026-10-28T00:00:03.000Z"];
const TRUE_NODE = { title: "census predicate", type: "sdk-operation", statusText: "TRUE", statusTone: "success" } as const;
const FIXTURE_ANSWER = "fixture answer";
const DEMAND_SCRIPT =
  'export const meta = { name: "km7q8-demand", description: "wb-km7q.8 census: one explicit agent() demand" };\n' +
  "const answer = await agent(args.prompt);\nreturn { answer };";

type StepName = "unknown" | "flip" | "recompute";
interface NodeReading {
  readonly statusText: string;
  readonly statusTone: string;
  readonly freshness: string;
  readonly completeness: string;
}
interface EvidenceStep {
  readonly arm: string;
  readonly name: StepName;
  readonly applied: string;
  readonly before: NodeReading | null;
  readonly after: NodeReading | null;
}
interface Arm {
  readonly name: string;
  readonly ref: NativeRef;
  readonly steps: readonly { readonly name: StepName; apply(projection: ObservationProjection): string }[];
}
function unknownEvent(ref: NativeRef): ObservationEvent {
  return { projectionEventId: `${ref.id}-0`, source: ref, scope: SCOPE, sourceSequence: 1, observedAt: STAMPS[0], kind: "census.predicate.evaluated" };
}
function trueEvent(ref: NativeRef, sequence: number): ObservationEvent {
  return {
    projectionEventId: `${ref.id}-${sequence - 1}`,
    source: ref,
    scope: SCOPE,
    sourceSequence: sequence,
    observedAt: STAMPS[sequence - 1],
    kind: "census.predicate.evaluated",
    node: { presentation: { ...TRUE_NODE } },
  };
}
function trueSnapshot(ref: NativeRef, sequence: number): Parameters<ObservationProjection["refresh"]>[0] {
  const at = STAMPS[sequence - 1];
  return { source: ref, scope: SCOPE, capturedAt: at, observedAt: at, sequence, coverage: "complete", kind: "census.predicate.snapshot", node: { ...TRUE_NODE } };
}
const REFRESH_REF: NativeRef = { provider: "census-evidence", type: "predicate", id: "refresh-arm" };
const INGEST_REF: NativeRef = { provider: "census-evidence", type: "predicate", id: "ingest-arm" };
const ARMS: readonly Arm[] = [
  {
    name: "refresh",
    ref: REFRESH_REF,
    steps: [
      { name: "unknown", apply: projection => projection.ingest(unknownEvent(REFRESH_REF)) },
      { name: "flip", apply: projection => projection.refresh(trueSnapshot(REFRESH_REF, 2)) },
      { name: "recompute", apply: projection => projection.refresh(trueSnapshot(REFRESH_REF, 3)) },
    ],
  },
  {
    name: "ingest",
    ref: INGEST_REF,
    steps: [
      { name: "unknown", apply: projection => projection.ingest(unknownEvent(INGEST_REF)) },
      { name: "flip", apply: projection => projection.ingest(trueEvent(INGEST_REF, 2)) },
      { name: "recompute", apply: projection => projection.ingest(trueEvent(INGEST_REF, 3)) },
    ],
  },
];
function readingOf(projection: ObservationProjection, ref: NativeRef): NodeReading | null {
  const node = projection.query({ scope: SCOPE, limit: 64 }).nodes.find(candidate => candidate.nativeRef.id === ref.id);
  if (node === undefined) return null;
  return { statusText: node.presentation.statusText, statusTone: node.presentation.statusTone, freshness: node.freshness, completeness: node.completeness };
}

function message(value: Record<string, unknown>): SDKMessage {
  return value as unknown as SDKMessage;
}
/** The host's one model seam, counting: every query() call records its prompt, then answers one fixture turn. */
function countingQuery(prompts: string[]): ClaudeQuery {
  return ({ prompt }) => {
    prompts.push(prompt);
    const session = `km7q8-session-${prompts.length}`;
    return (async function* () {
      yield message({ type: "system", subtype: "init", session_id: session, uuid: `${session}-init`, model: "claude-census-fixture" });
      yield message({ type: "result", subtype: "success", is_error: false, result: FIXTURE_ANSWER, session_id: session, uuid: `${session}-result` });
    })();
  };
}
interface Settled {
  readonly result: WorkflowSpawnResult;
  readonly call: object;
}
interface Session {
  readonly projection: ObservationProjection;
  readonly host: WorkflowHost;
  readonly prompts: readonly string[];
  readonly settled: readonly Settled[];
  /** One explicit workflow demand: a single agent() call through Pi's runtime on the session host, journaled. */
  demand(prompt: string): Promise<{ run: WorkflowRunResult; journal: readonly WorkflowJournalEntry[] }>;
  /** A host call outside the runtime (the direct shape an adapter could use). */
  direct(prompt: string): Promise<WorkflowSpawnResult>;
  /** Resolves once the falsifier's read is over (R-LATE). */
  readonly readOver: Promise<void>;
  /** A model seam other than the session host's query (R-OTHER-SEAM's stand-in), counted apart. */
  otherSeam(prompt: string): void;
}
interface Composition {
  readonly name: string;
  /** Called once before the first step: a composition may wrap the session's projection here. */
  attach?(session: Session): void;
  onEvidence?(step: EvidenceStep, session: Session): void | Promise<void>;
}
interface Falsification {
  readonly session: Session;
  readonly steps: readonly EvidenceStep[];
  /** Calls counted after the settle (the falsifier's read). */
  readonly calls: number;
  /** Calls that landed after the read was over (R-LATE), read after a second settle. */
  readonly late: number;
  readonly otherSeam: number;
  readonly violations: readonly string[];
}
async function settle(): Promise<void> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, SETTLE_MS);
  });
}
function createSession(): { session: Session; release(): void; otherCount(): number } {
  const prompts: string[] = [];
  const settled: Settled[] = [];
  const host = createClaudeWorkflowHost({ cwd: REPO, query: countingQuery(prompts), onSettled: (result, call) => settled.push({ result, call }) });
  let release = (): void => {};
  const readOver = new Promise<void>(resolve => {
    release = resolve;
  });
  let other = 0;
  let directs = 0;
  const session: Session = {
    projection: new ObservationProjection(),
    host,
    prompts,
    settled,
    async demand(prompt) {
      const journal: WorkflowJournalEntry[] = [];
      const run = await runWorkflow({ script: DEMAND_SCRIPT, args: { prompt }, host, journal: { append: entry => journal.push(entry) } });
      return { run, journal };
    },
    direct(prompt) {
      directs += 1;
      return host.spawnAgent({ agentId: `km7q8-direct-${directs}`, index: directs, prompt, label: `direct ${directs}`, agentType: "general-purpose" });
    },
    readOver,
    otherSeam() {
      other += 1;
    },
  };
  return { session, release: () => release(), otherCount: () => other };
}
/** The falsifier: hands every evidence step of both arms to the composition and judges every model call inside the window. */
async function falsify(composition: Composition): Promise<Falsification> {
  const { session, release, otherCount } = createSession();
  const steps: EvidenceStep[] = [];
  const violations: string[] = [];
  composition.attach?.(session);
  for (const arm of ARMS) {
    for (const step of arm.steps) {
      // Counted from before the step lands: a call made while the projection applies it is the step's call too.
      const count = session.prompts.length;
      const before = readingOf(session.projection, arm.ref);
      const applied = step.apply(session.projection);
      const evidence: EvidenceStep = { arm: arm.name, name: step.name, applied, before, after: readingOf(session.projection, arm.ref) };
      steps.push(evidence);
      await composition.onEvidence?.(evidence, session);
      if (session.prompts.length > count) violations.push(`call-on:${arm.name}:${step.name}`);
    }
  }
  const handled = session.prompts.length;
  await settle();
  const calls = session.prompts.length;
  if (calls > handled) violations.push(`deferred:${calls - handled}`);
  release();
  await settle();
  return { session, steps, calls, late: session.prompts.length - calls, otherSeam: otherCount(), violations };
}
function isFlip(step: EvidenceStep): boolean {
  return step.before?.statusTone === "unknown" && step.after?.statusTone === "success";
}
function isRecompute(step: EvidenceStep): boolean {
  return step.applied === "applied" && step.before !== null && step.after !== null && step.before.statusText === step.after.statusText && step.before.statusTone === step.after.statusTone;
}
/** Pi as it stands: no composition (C1 reads the seam ABSENT), so nothing subscribes to the evidence. */
const PI_TODAY: Composition = { name: "pi-today" };
const MUTANTS: readonly Composition[] = [
  {
    name: "demand-on-flip",
    async onEvidence(step, session) {
      if (isFlip(step)) await session.demand(`re-evaluate ${step.arm}: the predicate is now ${step.after?.statusText}`);
    },
  },
  {
    name: "direct-on-recompute",
    async onEvidence(step, session) {
      if (isRecompute(step)) await session.direct(`recomputed ${step.arm}`);
    },
  },
  {
    name: "deferred-on-flip",
    onEvidence(step, session) {
      if (isFlip(step)) {
        setTimeout(() => {
          void session.direct(`deferred ${step.arm}`);
        }, SETTLE_MS / 5);
      }
    },
  },
  {
    name: "wrapped-refresh",
    attach(session) {
      const projection = session.projection;
      const refresh = projection.refresh.bind(projection);
      projection.refresh = snapshot => {
        const before = readingOf(projection, snapshot.source);
        const applied = refresh(snapshot);
        if (before?.statusTone === "unknown" && readingOf(projection, snapshot.source)?.statusTone === "success") void session.direct("wrapped refresh flip");
        return applied;
      };
    },
  },
  {
    name: "resolve-unknown",
    async onEvidence(step, session) {
      if (step.before === null && step.after?.statusText === "UNKNOWN") await session.direct(`resolve the unknown ${step.arm} reading`);
    },
  },
];
const QUIET: readonly Composition[] = [
  {
    name: "read-only",
    onEvidence(step, session) {
      readingOf(session.projection, step.arm === "refresh" ? REFRESH_REF : INGEST_REF);
    },
  },
  {
    name: "R-LATE",
    onEvidence(step, session) {
      if (isFlip(step)) {
        void session.readOver.then(() => session.direct(`late ${step.arm}`));
      }
    },
  },
  {
    name: "R-OTHER-SEAM",
    onEvidence(step, session) {
      if (isFlip(step)) session.otherSeam(`other seam ${step.arm}`);
    },
  },
];
function readingJson(reading: NodeReading | null): Json {
  return reading === null ? null : { statusText: reading.statusText, statusTone: reading.statusTone, freshness: reading.freshness, completeness: reading.completeness };
}
function stepJson(step: EvidenceStep): Json {
  return { arm: step.arm, name: step.name, applied: step.applied, before: readingJson(step.before), after: readingJson(step.after) };
}
function judged(falsification: Falsification): Json {
  return { calls: falsification.calls, late: falsification.late, otherSeam: falsification.otherSeam, violations: [...falsification.violations] };
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The model request identifier and receipt (B1)
 * ----------------------------------------------------------------------------------------------------------------------- */

const RECEIPT_TYPES: readonly (readonly [string, string])[] = [
  ["src/workbench/claude-host.ts", "ClaudeCallIdentity"],
  ["src/workflow/runtime.ts", "WorkflowSpawnRequest"],
  ["src/workflow/runtime.ts", "WorkflowSpawnResult"],
  ["src/workflow/journal.ts", "WorkflowJournalEntry"],
];
function interfaceMembers(path: string, text: string, name: string): string[] | null {
  let members: string[] | null = null;
  sourceOf(path, text).forEachChild(node => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === name) {
      members = node.members.flatMap(member => (member.name !== undefined && (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)) ? [member.name.text] : []));
    }
  });
  return members;
}
/** The words a witness member would carry: the title's (witness, provenance) and the producer's SourceWitness field names. */
function witnessVocabulary(title: string, fields: readonly WitnessField[]): string[][] {
  const words = wordsOf(title).filter(word => word === "witness" || word === "provenance");
  return [...[...new Set(words)].map(word => [word]), ...fields.map(field => wordsOf(field.name))];
}
function isWitnessMember(member: string, vocabulary: readonly (readonly string[])[], subjects: readonly SubjectPair[]): boolean {
  const words = wordsOf(member.replace(/_/g, " "));
  const spells = (needle: readonly string[]): boolean => words.some((_, index) => needle.every((word, offset) => words[index + offset] === word));
  return vocabulary.some(spells) || subjectsIn(words, subjects).length > 0;
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The witness check (B2)
 * ----------------------------------------------------------------------------------------------------------------------- */

interface WitnessField {
  readonly name: string;
  readonly type: "int" | "str";
}
/** The producer's typed fields, read off its vendored SourceWitness lines (`    host_epoch: int | None = None`). */
function witnessFieldsOf(file: ProducerFile): WitnessField[] {
  return file.lines.flatMap(line => {
    const match = /^\s+([a-z_]+): (int|str) \| None = None$/.exec(line.text);
    return match === null ? [] : [{ name: match[1], type: match[2] === "int" ? "int" : "str" }];
  });
}
/** The receipt's witness member, read off its vendored line (`    witness: SourceWitness | None`). */
function receiptMemberOf(file: ProducerFile): string | undefined {
  for (const line of file.lines) {
    const match = /^\s+([a-z_]+): SourceWitness \| None$/.exec(line.text);
    if (match !== null) return match[1];
  }
  return undefined;
}
function witnessViolations(receipt: Json, expected: { readonly [key: string]: Json }, fields: readonly WitnessField[], member: string): string[] {
  if (receipt === null || typeof receipt !== "object" || Array.isArray(receipt)) return ["receipt-not-object"];
  if (!Object.hasOwn(receipt, member)) return ["missing"];
  const witness = receipt[member];
  if (witness === null) return ["null"];
  if (typeof witness !== "object" || Array.isArray(witness)) return ["not-object"];
  const violations: string[] = [];
  for (const field of fields) {
    if (!Object.hasOwn(witness, field.name)) {
      violations.push(`field-missing:${field.name}`);
      continue;
    }
    const value = witness[field.name];
    const typed = value === null || (field.type === "int" ? typeof value === "number" && Number.isSafeInteger(value) : typeof value === "string");
    if (!typed) violations.push(`field-type:${field.name}`);
    else if (value !== expected[field.name]) violations.push(`field-mismatch:${field.name}`);
  }
  for (const key of Object.keys(witness)) if (!fields.some(field => field.name === key)) violations.push(`field-extra:${key}`);
  return violations.sort();
}
/** A QueryView source witness as the host would hand it in (obviously fake values). */
const SOURCE_WITNESS: { readonly [key: string]: Json } = {
  host_epoch: 7,
  generation: 3,
  source_digest: `sha256:${"c".repeat(64)}`,
  trace_id: "trace-census-km7q8",
};
function receiptFixtures(member: string): Record<string, Json> {
  const base = { request_id: "census-request-1" };
  const witness = { ...SOURCE_WITNESS };
  const { host_epoch: _epoch, ...withoutEpoch } = witness;
  return {
    retained: { ...base, [member]: witness },
    dropped: { ...base },
    nulled: { ...base, [member]: null },
    stringified: { ...base, [member]: JSON.stringify(witness) },
    folded: { ...base, note: `witness ${JSON.stringify(witness)}` },
    array: { ...base, [member]: [witness] },
    renamed: { ...base, [member]: { ...withoutEpoch, hostEpoch: 7 } },
    retyped: { ...base, [member]: { ...witness, generation: "3" } },
    changed: { ...base, [member]: { ...witness, source_digest: `sha256:${"d".repeat(64)}` } },
    partial: { ...base, [member]: { source_digest: witness.source_digest } },
    extra: { ...base, [member]: { ...witness, query: "select-all" } },
    notObject: "census-request-1",
  };
}

/* ----------------------------------------------------------------------------------------------------------------------- *
 * The pins
 * ----------------------------------------------------------------------------------------------------------------------- */

/** Every object key a witness carries, at any depth: a residual's quiet row is recorded under its name. */
function keysOf(value: Json): string[] {
  if (value === null || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(keysOf);
  return Object.entries(value).flatMap(([key, inner]) => [key, ...keysOf(inner)]);
}

const BEAD_ROW = beadRow();
const VOCABULARY = vocabularyOf(BEAD_ROW.title);
const RECORDED = new Map<string, Json>();

const PINS: Readonly<Record<string, () => Promise<Json>>> = {
  async A1() {
    const mutants: { [key: string]: Json } = {};
    for (const mutant of MUTANTS) {
      const result = await falsify(mutant);
      expect(result.violations.length, `${mutant.name} must be refused`).toBeGreaterThan(0);
      mutants[mutant.name] = judged(result);
    }
    const quiet: { [key: string]: Json } = {};
    for (const composition of QUIET) {
      const result = await falsify(composition);
      expect(result.violations, `${composition.name} is a pinned quiet row`).toEqual([]);
      quiet[composition.name] = judged(result);
    }
    expect(quiet["R-LATE"]).toMatchObject({ calls: 0, late: 2 });
    expect(quiet["R-OTHER-SEAM"]).toMatchObject({ calls: 0, otherSeam: 2 });
    return { mutants, quiet };
  },
  async A2() {
    const today = await falsify(PI_TODAY);
    const flips = today.steps.filter(isFlip).map(step => `${step.arm}:${step.name}`);
    const recomputes = today.steps.filter(isRecompute).map(step => `${step.arm}:${step.name}`);
    expect(flips).toEqual(["refresh:flip", "ingest:flip"]);
    expect(recomputes).toEqual(["refresh:recompute", "ingest:recompute"]);
    for (const step of today.steps.filter(candidate => candidate.name === "unknown")) expect(step.after).toMatchObject({ statusText: "UNKNOWN", statusTone: "unknown" });
    const src = listedCode().filter(path => path.startsWith("src/") && path.endsWith(".ts"));
    const models = modelCallModules(src, readTree);
    expect(models).toContain(HOST_MODULE);
    const closure = closureOf(PROJECTION_MODULE, readTree);
    expect(closure.unread).toEqual([]);
    expect(reachesModel(closure, models)).toEqual([]);
    const plantedModels = [HOST_MODULE];
    const controls: { [key: string]: Json } = {
      chained: reachesModel(
        closureOf(
          PROJECTION_MODULE,
          readMap({
            [PROJECTION_MODULE]: 'import { couple } from "./plant.js";\nexport const x = couple;\n',
            "src/workbench/plant.ts": 'import { createClaudeWorkflowHost } from "./claude-host.js";\nexport const couple = createClaudeWorkflowHost;\n',
            [HOST_MODULE]: 'import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";\nexport const createClaudeWorkflowHost = sdkQuery;\n',
          }),
        ),
        plantedModels,
      ),
      dynamic: reachesModel(closureOf(PROJECTION_MODULE, readMap({ [PROJECTION_MODULE]: 'export async function f() { return import("@anthropic-ai/claude-agent-sdk"); }\n' })), plantedModels),
      reexport: reachesModel(closureOf(PROJECTION_MODULE, readMap({ [PROJECTION_MODULE]: 'export { query } from "@anthropic-ai/claude-agent-sdk";\n' })), plantedModels),
      session: reachesModel(closureOf(PROJECTION_MODULE, readMap({ [PROJECTION_MODULE]: 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport const s = createAgentSession;\n' })), plantedModels),
      typeOnly: reachesModel(closureOf(PROJECTION_MODULE, readMap({ [PROJECTION_MODULE]: 'import type { Options } from "@anthropic-ai/claude-agent-sdk";\nexport type O = Options;\n' })), plantedModels),
      "R-OBSERVER-PATH": reachesModel(
        closureOf(
          PROJECTION_MODULE,
          readMap({
            [PROJECTION_MODULE]: "export class ObservationProjection {}\n",
            "src/workbench/plant-observer.ts": 'import { createClaudeWorkflowHost } from "./claude-host.js";\nimport { ObservationProjection } from "./observation.js";\nexport const both = [createClaudeWorkflowHost, ObservationProjection];\n',
          }),
        ),
        plantedModels,
      ),
      aliasedEntry: modelCallsOf("src/x.ts", 'import { query as ask } from "@anthropic-ai/claude-agent-sdk";\nexport const a = ask;\n'),
      namespaceEntry: modelCallsOf("src/x.ts", 'import * as sdk from "@anthropic-ai/claude-agent-sdk";\nexport const a = sdk;\n'),
      toolEntryOnly: modelCallsOf("src/x.ts", 'import { tool } from "@anthropic-ai/claude-agent-sdk";\nexport const a = tool;\n'),
      typeEntryOnly: modelCallsOf("src/x.ts", 'import { type query } from "@anthropic-ai/claude-agent-sdk";\nexport type Q = typeof query;\n'),
    };
    expect(controls.chained).toEqual(["@anthropic-ai/claude-agent-sdk", HOST_MODULE]);
    expect(controls.dynamic).toEqual(["@anthropic-ai/claude-agent-sdk"]);
    expect(controls["R-OBSERVER-PATH"]).toEqual([]);
    return {
      steps: today.steps.map(stepJson),
      closure: { modules: [...closure.modules], packages: [...closure.packages], unread: [...closure.unread] },
      modelCallModules: models,
      controls,
    };
  },
  async A3() {
    const today = await falsify(PI_TODAY);
    expect(today.violations).toEqual([]);
    expect(today.calls).toBe(0);
    expect(today.late).toBe(0);
    const before = today.session.prompts.length;
    const conditioned = readingOf(today.session.projection, REFRESH_REF);
    const prompt = `explicit demand: the operator asks, the refresh predicate reads ${conditioned?.statusText}`;
    const { run } = await today.session.demand(prompt);
    expect(run.status).toBe("completed");
    expect(today.session.prompts.slice(before)).toEqual([prompt]);
    return {
      today: judged(today),
      demand: { calls: today.session.prompts.length - before, prompt: today.session.prompts.at(-1) ?? null, status: run.status, agentCount: run.agentCount, value: (run.value ?? null) as Json },
      "R-EXPLICIT": { violations: [...today.violations], conditionedOn: conditioned?.statusText ?? null },
    };
  },
  async B1() {
    const declared: { [key: string]: Json } = {};
    const members = new Map<string, string[]>();
    for (const [path, name] of RECEIPT_TYPES) {
      const list = interfaceMembers(path, readFileSync(join(REPO, path), "utf8"), name);
      expect(list, `${path} declares ${name}`).not.toBeNull();
      members.set(name, list ?? []);
      declared[name] = list ?? [];
    }
    const fields = witnessFieldsOf(ROSTER.producer.witness);
    const vocabulary = witnessVocabulary(BEAD_ROW.title, fields);
    const witnessMembers = [...members.entries()].flatMap(([name, list]) => list.filter(member => isWitnessMember(member, vocabulary, VOCABULARY)).map(member => `${name}.${member}`));
    expect(witnessMembers).toEqual([]);
    const { session } = createSession();
    const { run, journal } = await session.demand("explicit demand: the B1 receipt read");
    expect(run.status).toBe("completed");
    expect(session.settled).toHaveLength(1);
    const runtime = {
      call: Object.keys(session.settled[0]?.call ?? {}).sort(),
      result: Object.keys(session.settled[0]?.result ?? {}).sort(),
      journal: journal.flatMap(entry => Object.keys(entry)).filter((key, index, all) => all.indexOf(key) === index).sort(),
    };
    expect(runtime.call.filter(key => !(members.get("WorkflowSpawnRequest") ?? []).includes(key))).toEqual([]);
    expect(runtime.result.filter(key => !(members.get("WorkflowSpawnResult") ?? []).includes(key))).toEqual([]);
    expect(runtime.journal.filter(key => !(members.get("WorkflowJournalEntry") ?? []).includes(key))).toEqual([]);
    // The journal row's basis is the host's replay basis (the nearest Pi analog of a model context basis): the host's own
    // configuration, a JSON array, naming no witness.
    const basis = journal.map(entry => entry.basis);
    expect(basis).toEqual([session.host.replayBasis]);
    const basisItems = JSON.parse(session.host.replayBasis ?? "null") as Json;
    expect(Array.isArray(basisItems)).toBe(true);
    const plant = (text: string): string[] => (interfaceMembers("src/plant.ts", text, "Plant") ?? []).filter(member => isWitnessMember(member, vocabulary, VOCABULARY));
    const controls: { [key: string]: Json } = {
      witness: plant("interface Plant { witness?: string }"),
      sourceWitness: plant("interface Plant { sourceWitness?: string }"),
      provenance: plant("interface Plant { provenance?: string }"),
      sourceDigest: plant("interface Plant { sourceDigest?: string; source_digest?: string }"),
      hostEpoch: plant("interface Plant { hostEpoch?: number; trace_id?: string; generation?: number }"),
      queryView: plant("interface Plant { queryViewRef?: string }"),
      quiet: plant("interface Plant { source?: string; basis?: string; traceparent?: string; query?: string; view?: string }"),
      "R-OTHER-RECORD": (interfaceMembers("src/plant.ts", "interface Plant { ok: boolean }\ninterface Other { witness?: string }", "Plant") ?? []).filter(member => isWitnessMember(member, vocabulary, VOCABULARY)),
    };
    expect(controls.quiet).toEqual([]);
    expect(controls["R-OTHER-RECORD"]).toEqual([]);
    return {
      declared,
      witnessMembers,
      runtime,
      basis: { isHostReplayBasis: basis[0] === session.host.replayBasis, items: Array.isArray(basisItems) ? basisItems.length : -1 },
      reading: witnessMembers.length === 0 ? "NO-WITNESS-SEAM" : "WITNESS-SEAM",
      controls,
    };
  },
  async B2() {
    const fields = witnessFieldsOf(ROSTER.producer.witness);
    const member = receiptMemberOf(ROSTER.producer.receipt);
    expect(member).toBeDefined();
    expect(fields.map(field => field.name)).toEqual(Object.keys(SOURCE_WITNESS));
    const name = member ?? "";
    const readings: { [key: string]: Json } = {};
    for (const [fixture, receipt] of Object.entries(receiptFixtures(name))) readings[fixture] = witnessViolations(receipt, SOURCE_WITNESS, fields, name);
    expect(readings.retained).toEqual([]);
    for (const [fixture, violations] of Object.entries(readings)) if (fixture !== "retained") expect(violations, fixture).not.toEqual([]);
    const copy = JSON.parse(JSON.stringify({ [name]: SOURCE_WITNESS })) as Json;
    readings["R-SAME-VALUE"] = witnessViolations(copy, SOURCE_WITNESS, fields, name);
    expect(readings["R-SAME-VALUE"]).toEqual([]);
    return { member: name, fields: fields.map(field => `${field.name}:${field.type}`), readings };
  },
  async C1() {
    const live = liveSeam();
    expect(live.modules).toBeGreaterThan(0);
    expect(live.findings).toEqual([]);
    const read = (text: string): string[] => findingsOf("src/plant.ts", text, VOCABULARY);
    // R-LOOKALIKE: a Cyrillic QA for the Q of ReactiveQuery, a Cyrillic IE for the e of QueryView (NFKC folds neither).
    const lookalike = `const engine = "Reactive${String.fromCodePoint(0x051a)}uery";\nconst v = "Qu${String.fromCodePoint(0x0435)}ryView";\n`;
    const plants: { [key: string]: Json } = {
      importSpecifier: read('import { open } from "reactive-query-sdk";'),
      identifier: read("const reactiveInferenceClient = open();"),
      comment: read("// the QueryView witness enters the model basis"),
      fused: read('const pkg = "reactivequerysdk";'),
      snake: read('const name = "reactive_inference";'),
      inferenceSdk: read("export const INFERENCE_SDK_URL = open();"),
      splitLine: read("// handed to the reactive\n// query engine"),
      splitBlock: read("/**\n * handed to the inference\n * SDK at the host\n */"),
      manifest: manifestFindings({ dependencies: { "@acme/reactive-query": "1.0.0" }, devDependencies: { "reactive-inference-sdk": "2.0.0" } }, VOCABULARY),
    };
    for (const [plant, findings] of Object.entries(plants)) expect(findings, plant).not.toEqual([]);
    const quiet: { [key: string]: Json } = {
      projectionQuery: read("projection.query({ scope, limit: 64 });"),
      typeInference: read("// TypeScript type inference narrows the view"),
      sdkQuery: read('import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";'),
      operatorJoin: read("const query = config.query ?? sdkQuery;"),
      observeQuery: read('import { observeInvocation } from "./observe-query.js";'),
      "R-COMPOSED": read('const name = "Reactive" + "Que" + "rySDK";'),
      "R-LOOKALIKE": read(lookalike),
      "R-RF-INTERNAL": read("const engines = Object.keys(provenance.sdk_versions ?? {});"),
      "R-OUTSIDE-ROOTS": selectCode(["docs/workbench/plant.md", "test/plant.test.ts", "vendor/plant.js", ".beads/plant.ts", "README.md", "package.json", "src/plant.json"]),
    };
    for (const [row, findings] of Object.entries(quiet)) expect(findings, row).toEqual([]);
    const titleNames = titleNamesOf(BEAD_ROW.title).map(words => `${words.join(" ")}: ${subjectsIn(words, VOCABULARY).join(" ")}`);
    const charter = linesOf(ROSTER.producer.charter);
    const roles = {
      titleNames,
      line35: readSubjects(charter.get(35) ?? "", VOCABULARY),
      line37: readSubjects(charter.get(37) ?? "", VOCABULARY),
    };
    for (const name of titleNames) expect(name).not.toMatch(/: $/);
    return {
      vocabulary: VOCABULARY.map(pair => `${pair.words.join(" ")}: ${pair.subject}`),
      findings: [...live.findings],
      reading: live.findings.length === 0 ? "ABSENT" : "PRESENT",
      plants,
      quiet,
      roles,
    };
  },
  async C2() {
    const producer = ROSTER.producer;
    const vendored = [producer.charter, producer.witness, producer.receipt].flatMap(file => file.lines.map(line => `${file.path}:${line.line} ${sha256(line.text) === line.sha256 ? "ok" : "sha256-mismatch"}`));
    for (const line of vendored) expect(line).toMatch(/ ok$/);
    const ids = gateIdsOf(BEAD_ROW.title);
    const cited = citedLinesOf(BEAD_ROW.citation);
    const acceptanceLine = acceptanceLineOf(BEAD_ROW.citation);
    expect(cited.map(entry => entry.line)).toContain(acceptanceLine);
    const charter = linesOf(producer.charter);
    const prefix = (ids[0] ?? "").replace(/\d+$/, "");
    const named = [...(charter.get(acceptanceLine ?? -1) ?? "").matchAll(new RegExp(`\\b${prefix}\\d+\\b`, "g"))].map(match => match[0]);
    expect(named).toEqual(ids);
    const gate = producerGateOf(charter, acceptanceLine, ids);
    expect(gate).toBe("NOT-PASSED");
    const live = liveSeam();
    expect(gateOf(gate, live.findings)).toBe("CLOSED");
    const shipped = new Map(charter);
    shipped.set(STATUS_LINE, (charter.get(STATUS_LINE) ?? "").replace("design only", "shipped"));
    const fourGates = new Map(shipped);
    fourGates.set(acceptanceLine ?? -1, (charter.get(acceptanceLine ?? -1) ?? "").replace(new RegExp(`\\b${ids.at(-1)}\\b`), `${prefix}X`));
    const noStatus = new Map(shipped);
    noStatus.delete(STATUS_LINE);
    const nearMisses = {
      shipped: producerGateOf(shipped, acceptanceLine, ids),
      fourGates: producerGateOf(fourGates, acceptanceLine, ids),
      noStatusLine: producerGateOf(noStatus, acceptanceLine, ids),
      noAcceptanceLine: producerGateOf(shipped, undefined, ids),
      noIds: producerGateOf(shipped, acceptanceLine, []),
      adoptedBeforeGate: gateOf("NOT-PASSED", ["src/plant.ts:1 query"]),
      adoptedAfterGate: gateOf("PASSED", ["src/plant.ts:1 inference"]),
    };
    expect(nearMisses.shipped).toBe("PASSED");
    return { repo: producer.repo, pin: producer.pin, probe: producer.probe, vendored, ids, cited: cited.map(entry => `:${entry.line}@${entry.pin}`), gate, live: gateOf(gate, live.findings), nearMisses };
  },
};

describe("wb-km7q.8 query evidence and model calls: the adoption-time falsifier (INF-RQ1..INF-RQ5)", () => {
  it("judged set: the frozen shape, the rows held to the roster and the bead export, the citations at the pin", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:2"]);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    expect(ROSTER.frozenShape).toEqual(FROZEN_SHAPE);
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.rows).toEqual(ROWS);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    expect(ROSTER.settleMs).toBe(SETTLE_MS);
    for (const row of ROWS) expect(row.pins.map(pin => pin.phrase).join(" "), `${row.id} is tiled by its pins`).toBe(row.label);
    // Outside anchor: the rows' labels, in order, tile the bead's acceptance clause and then the title's gate clause.
    const acceptance = acceptanceOf(BEAD_ROW.citation);
    const gateClause = gateClauseOf(BEAD_ROW.title);
    expect(acceptance).toBeDefined();
    expect(gateClause).toBeDefined();
    expect(ROWS.map(row => row.label).join(" ")).toBe(`${acceptance} ${gateClause}`);
    const cited = citedLinesOf(BEAD_ROW.citation);
    expect(cited.length).toBeGreaterThan(0);
    for (const entry of cited) {
      expect(entry.pin).toBe(ROSTER.producer.pin);
      expect(ROSTER.producer.charter.lines.map(line => line.line)).toContain(entry.line);
    }
    expect(gateIdsOf(BEAD_ROW.title)).toHaveLength(5);
    expect(new Set(VOCABULARY.map(pair => pair.subject))).toEqual(new Set(["query", "inference"]));
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(
          `${pin.id} ${pin.phrase}`,
          async () => {
            const run = PINS[pin.id];
            expect(run, `${pin.id} has a runner`).toBeDefined();
            const witness = await run();
            expect(RECORDED.has(pin.id), `${pin.id} runs once`).toBe(false);
            RECORDED.set(pin.id, witness);
            expect(witness).toEqual(ROSTER.witnesses[pin.id]);
          },
          RUNTIME_TIMEOUT_MS,
        );
      }
    });
  }
  it("records: every pin ran once to its roster witness, and every named residual has its pinned quiet row", () => {
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect([...RECORDED.keys()]).toEqual(pins);
    expect(Object.keys(ROSTER.witnesses)).toEqual(pins);
    for (const pin of pins) expect(RECORDED.get(pin), pin).toEqual(ROSTER.witnesses[pin]);
    const rows = [...RECORDED.values()].flatMap(keysOf);
    for (const residual of RESIDUALS) expect(rows, `${residual} has a quiet row in a pin's witness`).toContain(residual);
  });
});
