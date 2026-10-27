/**
 * wb-693.8 (RF-TSX-AND-EMBEDDING-R10, program-triage-2026-10-17): the until-then negative, with the gate check armed on the
 * measured producer facts and the on-landing re-read pending. Statement (the owner filing, held to the tracked bead export):
 * "When RFCLI publishes the NTSX-07f bench report — <RF_BENCH_DIR>/tsx-baselines.json, valid against
 * schemas/bench/report-v1.json, carrying the I21 1/10/100 instance axes — Pi shall re-read its 60 s deadline and 256 KiB caps
 * (providers/reactivefiber.ts:81,:98@9df9a03) against N x cold-process cost and record the comparison in TRACEABILITY; until
 * then no numeric policy change shall be made and no TSX-cost-adequacy claim shall be stated."
 *
 * MEASURED PRODUCER FACTS (the roster's `producer` block, read with read-only git show and ls-tree on the local ReactiveFiberCLI
 * checkout, whose origin HEAD was the remote HEAD by ls-remote at the cut, by the cutting seat on 2026-10-26; this census is
 * hermetic and never re-reads the producer, so a producer change is seen only when a cut re-measures the roster): the tree at the
 * pin lists 10209 paths and none of them is named tsx-baselines.json; the 37 paths whose basename holds the word baseline are
 * vendored, and a path named tsx-baselines.json holds that word, so the filtered listing is the report's whole population at the
 * pin. Spans, each vendored base64 with its sha256: tests/bench/test_tsx_baselines.py:63-64 (the bench writes
 * .rf-bench/tsx-baselines.json, validated against schemas/bench/report-v1.json), :161 (its report name) and :172-175 (its
 * component steps 1, 10 and 100, for each of the three graph kinds); .gitignore:52-53 (the bench output directory is ignored,
 * so a bench run never puts the report in the tree). The schema blob at the pin and five of its slices: the top-level required
 * names, the runtime block's, a runtime row's, a row's graph kinds and a row shape's.
 *
 * READINGS
 * - GATE (row A): gateOf(listing) reads the report as PRESENT only when a listed path's basename is exactly the statement's report
 *   name; at the pin it reads ABSENT. validateReport(report) reads the vendored slices (required names at every level, the graph
 *   kinds) and instanceAxes(report) reads which component steps the rows carry per graph kind; neither is reached while the gate
 *   reads ABSENT, so both run here on a CONSTRUCTED STAND-IN built from the slices (it says so in the witness, and no producer
 *   report is faked).
 * - RECORD (row B): recordedComparison reads the frozen TRACEABILITY page and the receipts directory for a comparison row of this
 *   bead; none exists, and none is owed while the gate reads ABSENT.
 * - POLICY (rows B and C): policyOf(source) parses the provider module with the TypeScript compiler and reads every setTimeout
 *   whose callback stops with the deadline reason (an arrow or function expression, a call that builds the callback, or a name
 *   the module declares as a function or binds, every declaration of that name read; its delay, constant-folded through const
 *   bindings) and every if whose comparison guards a call passing a stream reason (its bound, folded the same way). An unfoldable
 *   value reads null, never a guess: a let or var binding is never folded.
 * - SCAN (rows B and C): liveEntries() reads every file git lists (tracked or untracked, never ignored) below docs/, src/, qa/,
 *   examples/ and .agents/, and the repository root's .md pages, as UTF-8; a symlink or a file holding a NUL is refused.
 *   scanEntries cuts each text into sentences (after ".", "!", "?" or ";" before white space, at a blank line, before a line
 *   opening a table row, in a .md file before a list item, and in a data file at every line end). A sentence MENTIONS the subject
 *   when it carries the TSX anchor and a cost or policy family; it is a FINDING when it also carries a claim word and no marker,
 *   reported `<path>:<line> <families>: asserted-<claim>`. The live pass carries two known positives that it must find exactly;
 *   each cut rule has its own control (a claim and its subject on either side of the cut read quiet), and the same walker runs
 *   over a scratch git repository whose tracked, untracked, ignored, outside-root, root non-.md, NUL-holding and symlinked files
 *   it must list, skip and refuse exactly as it does on Pi's tree.
 * - ARMING (row C): guardOf(gate, policy, findings) is armed while the gate reads ABSENT and then reports every policy mismatch
 *   and every finding as a violation; on PRESENT it stands down, and the on-landing re-read of row B governs.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; the labels are the filing's three acceptance items):
 *  A1 the report is absent from the pin listing (planted paths flip it, near names do not); A2 the schema the bench validates
 *    against is the one the statement names, and the slice validator accepts the stand-in and refuses each dropped top-level
 *    name, each dropped row name and a row graph outside the kinds; A3 the
 *    bench's component steps are the statement's 1/10/100, and the stand-in covers them for every graph kind while a dropped step
 *    reads uncovered.
 *  B1 no comparison row is recorded (TRACEABILITY names neither this bead nor the report, and no receipt of this bead exists),
 *    and none is owed; B2 neither alternative exists: the filing's own note form, given the subject, reads as a finding, the live
 *    pass finds none, and the policy is unchanged.
 *  C1 the provider's deadline and caps equal the statement's 60 s and 256 KiB, read by AST (planted variants of the live source
 *    each read as changed: another delay, another bound on one stream or on the shared binding, an inclusive comparison, a second
 *    or duplicate deadline timer, a second one whose callback is passed by name, by a shadowed name or built by a call, an
 *    unfoldable delay; a renamed binding, under a name the module never spells, and a timer that kills without the deadline reason
 *    under a name, beside a function or a binding that does stop with it, read unchanged; REFACTORS that keep the numerics (the
 *    deadline bound in its function or at module scope, to the name the variant takes or another, the deadline callback replaced by
 *    a name bound or declared to stop with the deadline reason) each read unchanged and leave every variant reading as it reads on
 *    the live source; the FAIL-CLOSED pair (a let cap binding, a stream reason passed to an unrelated call under a comparison)
 *    reads changed, with its reading pinned); C2 the live scan finds nothing beyond its known positives, and every
 *    family spelling, claim inflection, marker, cut rule and walk rule reads as pinned; C3 the guard is
 *    armed at the pin and reports nothing, reports a planted change while armed, and stands down on a listing that holds the report.
 * OUTSIDE ANCHOR: the owner filing's row of wb-693.8 in the tracked bead export (.beads/issues.jsonl), its description only (its
 * notes are later seats' records). Its ACCEPTANCE items are the labels of rows A-C verbatim and in order, and each row's pin quotes
 * tile its label leaving separator-only gaps. Its STATEMENT yields the report name, the schema path, the bench id, the I21 steps,
 * the deadline in seconds, the caps in KiB, the provider path and the forbidden claim word; its gating words (the clause head,
 * the tail head and the word before the claim) must each be a marker; its until-then clause and acceptance item 3 read quiet and,
 * with their markers stripped, read as findings; and the subject phrases it spells are covered word for word by anchor, family and
 * claim matches. So removing a pin, a row, a family alternative or a claim word the filing spells from every literal of this file
 * and the roster still reds against the owner's text.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, every row and pin is held to the out-of-file
 * roster (test/fixtures/rf-tsx-cost-adequacy-roster.json) with its witness, each witness carries the digest of its own quote, and
 * a last case reads that every pin ran its own case to the end. SELF-READ: the judged set parses this file's IMPL and requires
 * every entry to name one of READERS and not ROSTER, and reads every case's explicit budget (the judged set's and each pin's 120 s).
 * RESIDUALS (named; each has a pinned quiet row in the pin named): R-RENAMED (A1) a report under another basename or case reads
 *   ABSENT; R-NON-TREE (A1) a report outside the repository tree (a redirected bench directory, a release asset) is never listed,
 *   and the ignored bench directory keeps a bench run's own report out of the tree; R-SCHEMA-SLICE (A2) only the vendored slices
 *   are read, so a value of the wrong type, pattern or enum outside the graph kinds reads valid; R-OTHER-KILL-PATH (C1) a timer
 *   that ends the child without the deadline reason is not read; R-INDIRECT-DEADLINE (C1) a timer whose callback reaches the
 *   deadline reason only through another function it calls or a member it names (a wrapper ()=>onLate(), handlers.deadline) is
 *   not read; R-UNANCHORED (C2) a claim about the policy or a cost that names no TSX anchor; R-MARKER-ANYWHERE (C2) a marker
 *   anywhere in a sentence admits it, whatever it qualifies; R-SPLIT (C2) a claim and its subject in different sentences;
 *   R-PARAPHRASE (C2) a claim outside the claim words; R-LOOKALIKE (C2) a look-alike letter or an inserted invisible inside a claim
 *   word; R-JOINED (C2) an anchor, family or claim word joined to its neighbour inside an identifier (snake_case tsx_cost,
 *   camelCase tsxCost); R-OUTSIDE-ROOTS (C2) test/, new-feedback/, vendor/, .beads/ and every other unscanned tree, and every
 *   root file but the .md pages.
 * NOT CLAIMED: a family alternative, claim word or marker that the filing never spells (overhead, latency, sufficient, enough,
 * and every marker but the three gating words) removed from the vocabulary and the roster together; a scan root beyond docs/
 * (the filing's docs/receipt clause) removed from the walk and the roster together.
 *
 * wb-q1a0 (the R694 follow-up the wb-693.8 gate routed at landing 538, gate cmd_9dd9399ce5bc: F1 leads, F2-F6 ride). F1 the
 * renamed-binding variant binds a name the module never spells (freshName), so a refactor that itself names the deadline after
 * the variant, in its function or at module scope, reads unchanged and leaves every variant reading as it was (C1 REFACTORS).
 * F3 a deadline callback passed by name, by a shadowed name or built by a call is read as the deadline timer, and a name resolves to
 * its own declarations only: the refactor to that form reads unchanged, and a second deadline timer in any of those forms, which
 * read unchanged on the landed reader, reads changed. Every planted refactor and variant assumes only the deadline timer and the
 * shared cap binding the landed variants already plant on. The let cap binding and the stream reason in an unrelated call stay
 * FAIL-CLOSED by design and are pinned with their readings (folding a let would admit a reassignment the reader cannot see, and
 * reading caps through one stop function only would let a cap stopped by another escape). F2 and the indirect deadline callback
 * are named residuals (R-JOINED, R-INDIRECT-DEADLINE).
 * F4 the scratch walk refuses a NUL-holding file beside the symlink. F5 it skips a root non-.md file, and R-OUTSIDE-ROOTS's quiet
 * row probes one. F6 the judged set runs on the pins' explicit 120 s budget, read from this file (SELF-READ).
 *
 * Display paths added: none. Test-only: every plant is an in-memory text, listing or report, except C2's one scratch git repository
 * per run, made with makeScratch under the leak guard and removed in the same case; src, docs, the roster and the bead export are
 * only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Held {
  readonly site: string;
  readonly textBase64: string;
  readonly sha256: string;
}
interface Slice {
  readonly pointer: string;
  readonly textBase64: string;
  readonly sha256: string;
}
interface Producer {
  readonly repository: string;
  readonly pin: string;
  readonly listing: { readonly count: number; readonly sha256: string; readonly filterWord: string; readonly filtered: readonly string[] };
  readonly excerpts: readonly Held[];
  readonly schema: { readonly path: string; readonly blob: string; readonly id: string; readonly slices: readonly Slice[] };
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}
type Gate = "ABSENT" | "PRESENT";
interface Cap {
  readonly stream: string;
  readonly operator: string;
  readonly bound: number | null;
}
interface Policy {
  readonly deadlines: readonly (number | null)[];
  readonly caps: readonly Cap[];
}
interface Entry {
  readonly path: string;
  readonly text: string;
}
interface Sentence {
  readonly line: number;
  readonly text: string;
}

const HERE = fileURLToPath(import.meta.url);
const REPO = join(dirname(HERE), "..");
const SELF = relative(REPO, HERE);
const BEAD = "wb-693.8";
const ROSTER_FILE = "test/fixtures/rf-tsx-cost-adequacy-roster.json";
const EXPORT_FILE = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const RECEIPTS = "docs/workbench/receipts";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
/** The functions that read the subject; every IMPL entry names one directly (SELF-READ). */
const READERS: readonly string[] = ["gateOf", "guardOf", "instanceAxes", "liveEntries", "policyOf", "recordedComparison", "scanEntries", "validateReport"];
const RESIDUALS: readonly string[] = [
  "R-RENAMED", "R-NON-TREE", "R-SCHEMA-SLICE", "R-OTHER-KILL-PATH", "R-INDIRECT-DEADLINE", "R-UNANCHORED", "R-MARKER-ANYWHERE", "R-SPLIT", "R-PARAPHRASE",
  "R-LOOKALIKE", "R-JOINED", "R-OUTSIDE-ROOTS",
];
/** The vendored spans, by the site they were read at. */
const IGNORE_SITE = ".gitignore:52-53";
const WRITES_SITE = "tests/bench/test_tsx_baselines.py:63-64";
const NAME_SITE = "tests/bench/test_tsx_baselines.py:161";
const STEPS_SITE = "tests/bench/test_tsx_baselines.py:172-175";
const SITES: readonly string[] = [IGNORE_SITE, WRITES_SITE, NAME_SITE, STEPS_SITE];
/** The vendored report-v1 slices, by JSON pointer. */
const TOP_REQUIRED = "/required";
const RUNTIME_REQUIRED = "/$defs/runtime/required";
const ROW_REQUIRED = "/$defs/runtime_row/required";
const GRAPH_KINDS = "/$defs/runtime_row/properties/graph/enum";
const SHAPE_REQUIRED = "/$defs/runtime_shape/required";
const POINTERS: readonly string[] = [TOP_REQUIRED, RUNTIME_REQUIRED, ROW_REQUIRED, GRAPH_KINDS, SHAPE_REQUIRED];
/** The member names the readers walk; each must be a member of the slice that names it (the judged set). */
const RUNTIME_KEY = "runtime";
const ROWS_KEY = "rows";
const GRAPH_KEY = "graph";
const SHAPE_KEY = "shape";
const COUNT_KEY = "component_count";
/** The stop reasons the provider's module spells for the deadline and the two bounded streams. */
const DEADLINE_REASON = "deadline";
const STREAMS: readonly string[] = ["stderr", "stdout"];

const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "Gate check: the artifact exists upstream and validates against report-v1 with the three instance axes present",
    pins: [
      { id: "A1", quote: "Gate check: the artifact exists upstream" },
      { id: "A2", quote: "and validates against report-v1" },
      { id: "A3", quote: "with the three instance axes present" },
    ],
  },
  {
    id: "B",
    label: "On landing: a recorded TRACEABILITY comparison row (policy vs N x cold-process cost per axis) and either an explicit 'policies unchanged, adequate because ...' note or a re-derived numeric change citing the baseline",
    pins: [
      { id: "B1", quote: "On landing: a recorded TRACEABILITY comparison row (policy vs N x cold-process cost per axis)" },
      { id: "B2", quote: "and either an explicit 'policies unchanged, adequate because ...' note or a re-derived numeric change citing the baseline" },
    ],
  },
  {
    id: "C",
    label: "Negative (holds and is testable NOW): no commit changes the :81/:98 numerics citing TSX costs, and no docs/receipt claims TSX-cost adequacy, before the baseline exists",
    pins: [
      { id: "C1", quote: "Negative (holds and is testable NOW): no commit changes the :81/:98 numerics citing TSX costs" },
      { id: "C2", quote: "and no docs/receipt claims TSX-cost adequacy" },
      { id: "C3", quote: "before the baseline exists" },
    ],
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isObject = (value: Json | undefined): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isNames = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === "string");
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
const decode = (base64: string): string => Buffer.from(base64, "base64").toString("utf8");
const basenameOf = (path: string): string => path.slice(path.lastIndexOf("/") + 1);
const pinIds = (): string[] => ROWS.flatMap((row) => row.pins.map((pin) => pin.id)).sort();
/** The digest of a pin's own quote: every witness carries its pin's, so a case run under another pin's id reds. */
const claim = (id: string): string => sha256(ROWS.flatMap((row) => row.pins).find((pin) => pin.id === id)?.quote ?? "").slice(0, 12);
const JUDGED = new Set<string>();
const REACHED = new Set<string>();

// --- the outside anchor: the owner filing in the tracked bead export ---------------------------------------------------------------
let filingMemo: string | undefined;
/** The description of the bead's row (its notes are later seats' records, never read). */
function filing(): string {
  if (filingMemo !== undefined) return filingMemo;
  for (const line of readFileSync(join(REPO, EXPORT_FILE), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (isRecord(value) && value.id === BEAD && typeof value.description === "string") {
      filingMemo = value.description;
      return value.description;
    }
  }
  throw new Error(`${EXPORT_FILE} lacks the owner filing of ${BEAD}`);
}
function section(name: string): string {
  const text = filing();
  const head = `\n\n${name}: `;
  const start = text.indexOf(head);
  if (start < 0) throw new Error(`the owner filing lacks its ${name} section`);
  const end = text.indexOf("\n\n", start + head.length);
  return text.slice(start + head.length, end < 0 ? undefined : end);
}
/** The ACCEPTANCE items: the export holds them as a list of quoted strings, read back exactly or refused. */
function acceptance(): string[] {
  const list = section("ACCEPTANCE");
  const items = [...list.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map((match) => match[1] ?? match[2] ?? "");
  const quoted = items.map((item) => (item.includes("'") ? `"${item}"` : `'${item}'`));
  if (`[${quoted.join(", ")}]` !== list) throw new Error("the owner ACCEPTANCE list no longer reads as quoted items");
  return items;
}
function derived(pattern: RegExp, text: string): string[] {
  const match = pattern.exec(text);
  if (!match) throw new Error(`the owner text no longer reads ${pattern.source}`);
  return match.slice(1).map((value) => value ?? "");
}
const statement = (): string => section("STATEMENT");
/** The report the statement gates on, its schema, its bench id and its I21 steps. */
const statedReport = (): string => derived(/<RF_BENCH_DIR>\/([\w.-]+), valid against/, statement())[0] ?? "";
const statedSchema = (): string => derived(/valid against ([\w./-]+), carrying/, statement())[0] ?? "";
const statedBench = (): string => derived(/publishes the ([\w-]+) bench report/, statement())[0] ?? "";
const statedSteps = (): number[] => (derived(/the I21 ([\d/]+) instance axes/, statement())[0] ?? "").split("/").map(Number);
/** The policy the statement names: its deadline in seconds, its caps in KiB and the module it cites. */
function statedPolicy(): { deadlineMs: number; capBytes: number; module: string } {
  const [seconds = "", kib = "", module = ""] = derived(/its (\d+) s deadline and (\d+) KiB caps \(([\w./-]+):/, statement());
  return { deadlineMs: Number(seconds) * 1000, capBytes: Number(kib) * 1024, module };
}
/** The claim word the statement forbids: the word after "TSX-cost-". */
const statedClaim = (): string => derived(/no TSX-cost-(\w+) claim/, statement())[0] ?? "";
/** Item 2's note form, quoted inside the item. */
const statedNote = (): string => derived(/an explicit '([^']+)' note/, acceptance()[1] ?? "")[0] ?? "";
/** The gating words: the head of the until-then clause, the head of item 3's tail and the word before the forbidden claim. */
function gatingWords(): string[] {
  const clause = untilClause();
  const tail = (acceptance()[2] ?? "").split(", ").pop() ?? "";
  return [clause.split(" ")[0] ?? "", tail.split(" ")[0] ?? "", derived(/(\w+) TSX-cost-\w+ claim/, statement())[0] ?? ""];
}
/** The statement's until-then clause: its sentence after the "; " cut. */
const untilClause = (): string => sentences("statement.md", statement()).map((item) => item.text).find((text) => /^\w+ then /.test(text)) ?? "";
/** The subject phrases the filing spells, each derived from the owner's text. */
function subjectPhrases(): string[] {
  const text = statement();
  const item3 = acceptance()[2] ?? "";
  return [
    derived(/publishes the (\S+ bench report)/, text)[0] ?? "",
    derived(/re-read its (\d+ s deadline and \d+ KiB caps)/, text)[0] ?? "",
    derived(/against (N x [\w-]+ cost)/, text)[0] ?? "",
    derived(/citing (TSX costs)/, item3)[0] ?? "",
    derived(/claims (TSX-cost adequacy)/, item3)[0] ?? "",
    derived(/before the (\w+) exists/, item3)[0] ?? "",
  ];
}
/** The words of a subject phrase that need no family. */
const STOP: readonly string[] = ["and", "n", "report", "x"];
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(body.slice(at));
}

// --- the producer facts (vendored) -------------------------------------------------------------------------------------------------
const producer = (): Producer => ROSTER.producer;
function held(site: string): string {
  const entry = producer().excerpts.find((item) => item.site === site);
  if (!entry) throw new Error(`the roster vendors no span at ${site}`);
  return decode(entry.textBase64);
}
function names(pointer: string): string[] {
  const entry = producer().schema.slices.find((item) => item.pointer === pointer);
  if (!entry) throw new Error(`the roster vendors no report-v1 slice at ${pointer}`);
  const value: unknown = JSON.parse(decode(entry.textBase64));
  if (!isNames(value)) throw new Error(`the report-v1 slice at ${pointer} is not a list of names`);
  return value;
}
const benchName = (): string => derived(/REPORT_NAME: Final = "([\w-]+)"/, held(NAME_SITE))[0] ?? "";
const benchSteps = (): number[] => (derived(/COMPONENT_STEPS: [^=]+= \(([\d, ]+)\)/, held(STEPS_SITE))[0] ?? "").split(", ").map(Number);
/** What the bench writes and the schema it validates against (:63-64). */
const benchWrites = (): string[] => derived(/Writes ``([^`]+)``, validated against ``([^`]+)``/, held(WRITES_SITE));
const ignoredDirectories = (): string[] => held(IGNORE_SITE).split("\n").filter((line) => line !== "" && !line.startsWith("#"));

// --- A: the gate -------------------------------------------------------------------------------------------------------------------
/** PRESENT only when a listed path's basename is exactly the report name. */
function gateOf(paths: readonly string[], report: string): { state: Gate; matches: string[] } {
  const matches = paths.filter((path) => basenameOf(path) === report).sort();
  return { state: matches.length > 0 ? "PRESENT" : "ABSENT", matches };
}
/** The pin replica: the vendored filtered listing, the report's whole population at the pin. */
const pinListing = (): readonly string[] => producer().listing.filtered;
const pinGate = (): Gate => gateOf(pinListing(), statedReport()).state;
/** Every required name the vendored slices hold, at every level, and every row graph outside the slice's kinds. */
function validateReport(report: Json): string[] {
  if (!isObject(report)) return ["/"];
  const out = names(TOP_REQUIRED).filter((key) => !Object.hasOwn(report, key)).map((key) => `/${key}`);
  const runtime = report[RUNTIME_KEY];
  if (runtime === undefined) return out.sort();
  if (!isObject(runtime)) return [...out, `/${RUNTIME_KEY}`].sort();
  out.push(...names(RUNTIME_REQUIRED).filter((key) => !Object.hasOwn(runtime, key)).map((key) => `/${RUNTIME_KEY}/${key}`));
  const rows = runtime[ROWS_KEY];
  for (const [index, row] of (Array.isArray(rows) ? rows : []).entries()) {
    const at = `/${RUNTIME_KEY}/${ROWS_KEY}/${index}`;
    if (!isObject(row)) {
      out.push(at);
      continue;
    }
    out.push(...names(ROW_REQUIRED).filter((key) => !Object.hasOwn(row, key)).map((key) => `${at}/${key}`));
    const graph = row[GRAPH_KEY];
    if (graph !== undefined && !names(GRAPH_KINDS).includes(String(graph))) out.push(`${at}/${GRAPH_KEY}`);
    const shape = row[SHAPE_KEY];
    if (isObject(shape)) out.push(...names(SHAPE_REQUIRED).filter((key) => !Object.hasOwn(shape, key)).map((key) => `${at}/${SHAPE_KEY}/${key}`));
  }
  return out.sort();
}
/** Per graph kind, the bench's component steps the rows do not carry. */
function instanceAxes(report: Json): { covered: boolean; missing: Record<string, number[]> } {
  const runtime = isObject(report) ? report[RUNTIME_KEY] : undefined;
  const rows = isObject(runtime) && Array.isArray(runtime[ROWS_KEY]) ? (runtime[ROWS_KEY] as Json[]).filter(isObject) : [];
  const missing: Record<string, number[]> = {};
  for (const graph of names(GRAPH_KINDS)) {
    const seen = new Set(rows.filter((row) => row[GRAPH_KEY] === graph).map((row) => (isObject(row[SHAPE_KEY]) ? row[SHAPE_KEY][COUNT_KEY] : undefined)));
    const lacking = benchSteps().filter((step) => !seen.has(step));
    if (lacking.length > 0) missing[graph] = lacking;
  }
  return { covered: Object.keys(missing).length === 0, missing };
}
const zeros = (keys: readonly string[]): JsonObject => Object.fromEntries(keys.map((key) => [key, 0]));
/** A CONSTRUCTED STAND-IN, built from the vendored slices only: every required name at every level, one row per graph kind and step. */
function standIn(): JsonObject {
  const rows: Json[] = names(GRAPH_KINDS).flatMap((graph) =>
    benchSteps().map((step) => ({ ...zeros(names(ROW_REQUIRED)), [GRAPH_KEY]: graph, [SHAPE_KEY]: { ...zeros(names(SHAPE_REQUIRED)), [COUNT_KEY]: step } })),
  );
  return { ...zeros(names(TOP_REQUIRED)), name: benchName(), [RUNTIME_KEY]: { ...zeros(names(RUNTIME_REQUIRED)), [ROWS_KEY]: rows } };
}
const omit = (value: JsonObject, key: string): JsonObject => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
function mapRows(report: JsonObject, change: (rows: JsonObject[]) => Json[]): JsonObject {
  const runtime = report[RUNTIME_KEY];
  if (!isObject(runtime)) throw new Error("the stand-in lacks its runtime block");
  const rows = Array.isArray(runtime[ROWS_KEY]) ? (runtime[ROWS_KEY] as Json[]).filter(isObject) : [];
  return { ...report, [RUNTIME_KEY]: { ...runtime, [ROWS_KEY]: change(rows) } };
}

// --- B: the record -----------------------------------------------------------------------------------------------------------------
/** The TRACEABILITY lines naming this bead, the report or the bench, and whether a receipt of this bead exists. */
function recordedComparison(traceability: string, receipts: readonly string[]): { traceabilityLines: number; receipt: boolean } {
  const needles = [BEAD, benchName(), statedBench()];
  return {
    traceabilityLines: traceability.split("\n").filter((line) => needles.some((needle) => line.includes(needle))).length,
    receipt: receipts.includes(`${BEAD}.md`),
  };
}
const readRepo = (path: string): string => readFileSync(join(REPO, path), "utf8");

// --- C1: the policy, read by AST ---------------------------------------------------------------------------------------------------
const parse = (source: string): ts.SourceFile => ts.createSourceFile(PROVIDER, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** The string literals passed to any call inside a node. */
function reasonsIn(node: ts.Node): string[] {
  const out: string[] = [];
  const visit = (inner: ts.Node): void => {
    if (ts.isCallExpression(inner)) for (const arg of inner.arguments) if (ts.isStringLiteral(arg)) out.push(arg.text);
    ts.forEachChild(inner, visit);
  };
  visit(node);
  return out;
}
/** What a timer's callback runs: the callback itself (an arrow or function expression, or a call that builds it, such as
 * stop.bind(null, reason)), or, for a name, every declaration of it in the module: a function declaration's body or a binding's
 * initializer, at any depth (wb-q1a0 F3: a callback passed by name was never read). */
function callbackBodies(callback: ts.Expression): ts.Node[] {
  if (!ts.isIdentifier(callback)) return [callback];
  const bodies: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === callback.text && node.body !== undefined) bodies.push(node.body);
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === callback.text && node.initializer !== undefined) bodies.push(node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(callback.getSourceFile());
  return bodies;
}
function isDeadlineTimer(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "setTimeout") return false;
  const callback = node.arguments[0];
  return callback !== undefined && callbackBodies(callback).some((body) => reasonsIn(body).includes(DEADLINE_REASON));
}
function capStreams(node: ts.Node): string[] {
  if (!ts.isIfStatement(node) || !ts.isBinaryExpression(node.expression)) return [];
  return reasonsIn(node.thenStatement).filter((reason) => STREAMS.includes(reason));
}
/** Every deadline timer's delay and every stream cap's bound, constant-folded through const bindings; null when not foldable. */
function policyOf(source: string): Policy {
  const file = parse(source);
  const consts = new Map<string, ts.Expression[]>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0) {
      consts.set(node.name.text, [...(consts.get(node.name.text) ?? []), node.initializer]);
    }
    ts.forEachChild(node, collect);
  };
  collect(file);
  const fold = (node: ts.Expression, depth: number): number | null => {
    if (depth > 8) return null;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isParenthesizedExpression(node)) return fold(node.expression, depth + 1);
    if (ts.isIdentifier(node)) {
      const bound = consts.get(node.text) ?? [];
      return bound.length === 1 && bound[0] !== undefined ? fold(bound[0], depth + 1) : null;
    }
    if (ts.isBinaryExpression(node)) {
      const left = fold(node.left, depth + 1);
      const right = fold(node.right, depth + 1);
      if (left === null || right === null) return null;
      if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right;
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right;
      if (node.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right;
    }
    return null;
  };
  const deadlines: (number | null)[] = [];
  const caps: Cap[] = [];
  const visit = (node: ts.Node): void => {
    if (isDeadlineTimer(node)) {
      const delay = node.arguments[1];
      deadlines.push(delay === undefined ? null : fold(delay, 0));
    }
    if (ts.isIfStatement(node) && ts.isBinaryExpression(node.expression)) {
      const comparison = node.expression;
      for (const stream of capStreams(node)) caps.push({ stream, operator: ts.tokenToString(comparison.operatorToken.kind) ?? "?", bound: fold(comparison.right, 0) });
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { deadlines, caps: caps.sort((left, right) => left.stream.localeCompare(right.stream)) };
}
/** The policy the statement names, in the reader's shape. */
function statedShape(): Policy {
  const { deadlineMs, capBytes } = statedPolicy();
  return { deadlines: [deadlineMs], caps: STREAMS.map((stream) => ({ stream, operator: ">", bound: capBytes })) };
}
const samePolicy = (policy: Policy): boolean => JSON.stringify(policy) === JSON.stringify(statedShape());
/** The first node `pick` selects, depth first from the module itself. */
function firstNode(file: ts.SourceFile, pick: (node: ts.Node) => boolean): ts.Node | undefined {
  let found: ts.Node | undefined;
  const visit = (node: ts.Node): void => {
    if (found !== undefined) return;
    if (pick(node)) found = node;
    else ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** The live source with the first node `pick` selects replaced by `text` (an in-memory variant; the module is never written). */
function plantAt(source: string, pick: (node: ts.Node) => boolean, text: string): string {
  const file = parse(source);
  const found = firstNode(file, pick);
  if (found === undefined) throw new Error("the planted site is missing from the provider module");
  return source.slice(0, found.getStart(file)) + text + source.slice(found.getEnd());
}
/** A node's parent; the source file itself has none at run time, whatever the declared type says. */
const parentOf = (node: ts.Node): ts.Node | undefined => (node.kind === ts.SyntaxKind.SourceFile ? undefined : node.parent);
function isDeadlineDelay(node: ts.Node): boolean {
  const parent = parentOf(node);
  return parent !== undefined && isDeadlineTimer(parent) && parent.arguments[1] === node;
}
function isStdoutBound(node: ts.Node): boolean {
  const parent = parentOf(node);
  const statement = parent === undefined ? undefined : parentOf(parent);
  return parent !== undefined && ts.isBinaryExpression(parent) && parent.right === node && statement !== undefined && capStreams(statement).includes("stdout");
}
/** The comparison operator of the stdout cap. */
function isStdoutOperator(node: ts.Node): boolean {
  const parent = parentOf(node);
  const statement = parent === undefined ? undefined : parentOf(parent);
  return parent !== undefined && ts.isBinaryExpression(parent) && parent.operatorToken === node && statement !== undefined && capStreams(statement).includes("stdout");
}
/** The const declaration the stdout cap's bound names. */
function isStdoutBinding(source: string): (node: ts.Node) => boolean {
  let name = "";
  const visit = (node: ts.Node): void => {
    if (name === "" && isStdoutBound(node) && ts.isIdentifier(node)) name = node.text;
    else ts.forEachChild(node, visit);
  };
  visit(parse(source));
  return (node) => {
    const parent = parentOf(node);
    return parent !== undefined && ts.isVariableDeclaration(parent) && parent.initializer === node && ts.isIdentifier(parent.name) && parent.name.text === name;
  };
}
/** The statement that holds a node: its ancestor whose parent is a block or the module itself. */
function statementOf(node: ts.Node): ts.Node {
  let at = node;
  for (let parent = parentOf(at); parent !== undefined && !ts.isBlock(parent) && !ts.isSourceFile(parent); parent = parentOf(at)) at = parent;
  return at;
}
/** A name the module never spells, at any depth: the base, or the base with the first free numeric suffix, so a binding planted
 * under it can neither double nor shadow a live one (wb-q1a0 F1: a hard-coded variant name collided with a refactor that took it). */
function freshName(source: string, base: string): string {
  const spelled = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) spelled.add(node.text);
    ts.forEachChild(node, visit);
  };
  visit(parse(source));
  let name = base;
  for (let suffix = 1; spelled.has(name); suffix += 1) name = `${base}_${suffix}`;
  return name;
}
/** The base of the renamed-binding variant's name: the name a refactor that binds the deadline would most likely take. */
const RENAMED_BASE = "DEADLINE_MS";
/** A REFACTOR that keeps the numerics: the deadline timer's delay moved under `name`, bound at module scope or just before the
 * statement that holds the timer (the delay's own text moves into the binding). */
function namedDeadline(source: string, name: string, scope: "function" | "module"): string {
  const file = parse(source);
  const delay = firstNode(file, isDeadlineDelay);
  if (delay === undefined) throw new Error("the provider module holds no deadline delay to name");
  const at = scope === "module" ? 0 : statementOf(delay).getStart(file);
  return `${source.slice(0, at)}const ${name}=${delay.getText(file)};\n${source.slice(at, delay.getStart(file))}${name}${source.slice(delay.getEnd())}`;
}
/** A REFACTOR that keeps the numerics: the deadline timer's callback, whatever its form, replaced by `name`, which a const arrow
 * binding or a function declaration just before the statement that holds the timer stops with the deadline reason. It assumes
 * only the deadline timer the policy reads, so a module whose own callback is already named reads the same way. */
function namedCallback(source: string, name: string, form: "binding" | "declaration"): string {
  const file = parse(source);
  const timer = firstNode(file, isDeadlineTimer);
  const callback = timer !== undefined && ts.isCallExpression(timer) ? timer.arguments[0] : undefined;
  if (timer === undefined || callback === undefined) throw new Error("the provider module holds no deadline timer");
  const stops = `stop(${JSON.stringify(DEADLINE_REASON)})`;
  const declared = form === "binding" ? `const ${name}=()=>${stops};` : `function ${name}(){${stops};}`;
  const at = statementOf(timer).getStart(file);
  return `${source.slice(0, at)}${declared}\n${source.slice(at, callback.getStart(file))}${name}${source.slice(callback.getEnd())}`;
}
/** A FAIL-CLOSED refactor: the stdout cap's binding declared with let, which the reader never folds. */
function letCapBinding(source: string): string {
  const file = parse(source);
  const initializer = firstNode(file, isStdoutBinding(source));
  const declaration = initializer === undefined ? undefined : parentOf(initializer);
  const list = declaration === undefined ? undefined : parentOf(declaration);
  if (list === undefined || !ts.isVariableDeclarationList(list) || !list.getText(file).startsWith("const ")) throw new Error("the stdout cap's binding is no const declaration");
  const at = list.getStart(file);
  return `${source.slice(0, at)}let${source.slice(at + "const".length)}`;
}
/** The C1 variants of a module: each changes a reading of the policy, except three that read unchanged: the renamed binding, which
 * moves the deadline under another name, and a timer that kills without the deadline reason under a name, beside a function or a
 * binding that does stop with it (a callback name resolves to its own declarations only). Every planted name is fresh. */
function variantsOf(source: string): Record<string, string> {
  const binding = isStdoutBinding(source);
  const renamed = freshName(source, RENAMED_BASE);
  const late = freshName(source, "onLateDeadline");
  const shadowed = freshName(source, "onShadowedDeadline");
  const decoy = freshName(source, "onDecoyDeadline");
  const quiet = freshName(source, "onQuietKill");
  return {
    "other timer by name beside a deadline function": `${source}\nfunction ${decoy}(){stop("deadline");}\nfunction ${quiet}(){child.kill("SIGKILL");}\nsetTimeout(${quiet},500);\n`,
    "other timer bound to a name beside a deadline binding": `${source}\nconst ${decoy}=()=>stop("deadline");\nconst ${quiet}=()=>child.kill("SIGKILL");\nsetTimeout(${quiet},500);\n`,
    "deadline 30 s": plantAt(source, isDeadlineDelay, "30_000"),
    "stdout cap 512 KiB": plantAt(source, isStdoutBound, "512*1024"),
    "stdout cap inclusive": plantAt(source, isStdoutOperator, ">="),
    "shared cap 128 KiB": plantAt(source, binding, "128*1024"),
    "second deadline timer": `${source}\nsetTimeout(()=>stop("deadline"),5_000);\n`,
    "second deadline timer by name": `${source}\nfunction ${late}(){stop("deadline");}\nsetTimeout(${late},5_000);\n`,
    "second deadline timer by a shadowed name": `${source}\nfunction ${shadowed}(){}\n{const ${shadowed}=()=>stop("deadline");setTimeout(${shadowed},5_000);}\n`,
    "second deadline timer by call": `${source}\nsetTimeout(stop.bind(null,"deadline"),5_000);\n`,
    "duplicate deadline timer": `${source}\nsetTimeout(()=>stop("deadline"),60_000);\n`,
    "runtime deadline": plantAt(source, isDeadlineDelay, "Date.now()"),
    "renamed deadline binding": `const ${renamed}=60_000;\n${plantAt(source, isDeadlineDelay, renamed)}`,
  };
}
/** Whether each variant of a module reads as a changed policy. */
const changedOf = (source: string): Record<string, boolean> =>
  Object.fromEntries(Object.entries(variantsOf(source)).map(([name, text]) => [name, !samePolicy(policyOf(text))]));
/** A policy as a witness value. */
const policyJson = (policy: Policy): JsonObject => ({ deadlines: [...policy.deadlines], caps: policy.caps.map((cap) => ({ ...cap })) });

// --- C2: the scan ------------------------------------------------------------------------------------------------------------------
const DATA_EXTENSIONS: readonly string[] = [".json", ".jsonl", ".yaml", ".yml", ".toml"];
/** A file's sentences, each with the line it starts on. */
function sentences(path: string, text: string): Sentence[] {
  const data = DATA_EXTENSIONS.some((extension) => path.endsWith(extension));
  const markdown = path.endsWith(".md");
  const out: Sentence[] = [];
  let current = "";
  let start = 1;
  const flush = (): void => {
    if (current.trim() !== "") out.push({ line: start, text: current.trim() });
    current = "";
  };
  for (const [index, raw] of text.split("\n").entries()) {
    const line = index + 1;
    if (raw.trim() === "") {
      flush();
      continue;
    }
    if (data || /^\s*\|/.test(raw) || (markdown && /^\s*(?:[-+*]|\d+[.)])\s/.test(raw)) || /[.!?;]$/.test(current)) flush();
    const parts = raw.split(/(?<=[.!?;])\s+/);
    for (const [part, piece] of parts.entries()) {
      if (part > 0) flush();
      if (current === "") start = line;
      current = current === "" ? piece : `${current} ${piece}`;
    }
    if (data) flush();
  }
  flush();
  return out;
}
/** The TSX anchor a mention needs (a bench id like NTSX-07f is one anchor). */
const ANCHOR = /\bN?TSX(?:-\d\w*)?\b|\brftsx\w*|\bReactiveFiberTSX\w*/i;
const ANCHOR_SPELLINGS: readonly string[] = ["TSX", "tsx", "NTSX-07f", "tsx-baselines", "rftsx", "ReactiveFiberTSX"];
interface Family {
  readonly id: string;
  readonly source: string;
  /** One spelling per alternative, in order. */
  readonly spellings: readonly string[];
}
/** The subject beside the anchor: a cost (the filing's cost, cold-process, bench and baseline) or the policy (its deadline and caps). */
const FAMILIES: readonly Family[] = [
  {
    id: "cost",
    source: "\\bcosts?\\b|\\bcold[\\s-]+process\\b|\\bbench(?:mark)?s?\\b|\\bbaselines?\\b|\\boverheads?\\b|\\blatenc(?:y|ies)\\b",
    spellings: ["cost", "cold-process", "bench", "baseline", "overhead", "latency"],
  },
  { id: "policy", source: "\\bdeadlines?\\b|\\bcaps?\\b|\\b60\\s*s\\b|\\b256\\s*KiB\\b", spellings: ["deadline", "caps", "60 s", "256 KiB"] },
];
interface Claim {
  readonly id: string;
  readonly source: string;
  /** Every inflection the source admits, in order. */
  readonly inflections: readonly string[];
}
/** The claim words: the filing's adequacy and adequate (each inflection, its negation included), then two words it never spells. */
const CLAIMS: readonly Claim[] = [
  {
    id: "adequate",
    source: "(?:in)?adequa(?:te|tely|teness|cy|cies)",
    inflections: ["adequate", "adequately", "adequateness", "adequacy", "adequacies", "inadequate", "inadequately", "inadequacy"],
  },
  { id: "sufficient", source: "(?:in)?sufficien(?:t|tly|cy)", inflections: ["sufficient", "sufficiently", "sufficiency", "insufficient"] },
  { id: "enough", source: "enough", inflections: ["enough"] },
];
/** The words that mark a sentence as not stating the claim (whole words, any case, and the n't contraction). */
const MARKERS: readonly string[] = [
  "no", "not", "never", "nor", "none", "neither", "without", "cannot", "until", "unless", "before", "if", "whether", "pending", "gated", "absent", "unmeasured",
  "undetermined", "unestablished", "unproven", "unknown",
];
const MARKER = new RegExp(`\\b(?:${MARKERS.join("|")})\\b|n[\\u2019']t\\b`, "i");
const FAMILY_PATTERNS: readonly (readonly [string, RegExp])[] = FAMILIES.map((family) => [family.id, new RegExp(family.source, "i")]);
const CLAIM_PATTERNS: readonly (readonly [string, RegExp])[] = CLAIMS.map((item) => [item.id, new RegExp(`\\b(?:${item.source})\\b`, "i")]);
/** Every finding over the entries, in order. */
function scanEntries(entries: readonly Entry[]): string[] {
  const out: string[] = [];
  for (const entry of entries) {
    for (const sentence of sentences(entry.path, entry.text)) {
      if (!ANCHOR.test(sentence.text) || MARKER.test(sentence.text)) continue;
      const families = FAMILY_PATTERNS.filter(([, pattern]) => pattern.test(sentence.text)).map(([id]) => id);
      const claimed = CLAIM_PATTERNS.find(([, pattern]) => pattern.test(sentence.text));
      if (families.length === 0 || claimed === undefined) continue;
      out.push(`${entry.path}:${sentence.line} ${["anchor", ...families].join("+")}: asserted-${claimed[0]}`);
    }
  }
  return out;
}
/** The covering spans of the anchor, the families and the claims over a phrase: the words left uncovered (STOP aside). */
function uncovered(phrase: string): string[] {
  const spans: [number, number][] = [];
  for (const pattern of [ANCHOR, ...FAMILY_PATTERNS.map(([, item]) => item), ...CLAIM_PATTERNS.map(([, item]) => item)]) {
    for (const match of phrase.matchAll(new RegExp(pattern.source, "gi"))) spans.push([match.index, match.index + match[0].length]);
  }
  return [...phrase.matchAll(/[A-Za-z0-9]+/g)]
    .filter((word) => !STOP.includes(word[0].toLowerCase()))
    .filter((word) => !spans.some(([from, to]) => from <= word.index && word.index + word[0].length <= to))
    .map((word) => word[0]);
}
interface Root {
  readonly root: string;
  readonly floor: number;
}
/** The scanned trees. Each floor sits below the count at base 32e0e2d (docs 74, src 116, qa 67, examples 7, .agents 2 files). */
const SCAN_ROOTS: readonly Root[] = [
  { root: "docs", floor: 60 },
  { root: "src", floor: 100 },
  { root: "qa", floor: 55 },
  { root: "examples", floor: 5 },
  { root: ".agents", floor: 1 },
];
/** The repository root's .md pages: five at base 32e0e2d. */
const PAGES_FLOOR = 4;
const inScope = (path: string): boolean => SCAN_ROOTS.some(({ root }) => path.startsWith(`${root}/`)) || (!path.includes("/") && path.endsWith(".md"));
/** Every in-scope file git lists below a root, read as UTF-8; a symlink or a file holding a NUL is refused. */
function liveEntries(root: string = REPO): { entries: Entry[]; refused: string[] } {
  const listed = spawnSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (listed.status !== 0) throw new Error(`git ls-files failed: ${listed.stderr}`);
  const entries: Entry[] = [];
  const refused: string[] = [];
  for (const path of [...new Set(listed.stdout.split("\0").filter((item) => item !== "" && inScope(item)))].sort()) {
    const absolute = join(root, path);
    if (!lstatSync(absolute).isFile()) {
      refused.push(path);
      continue;
    }
    const text = readFileSync(absolute, "utf8");
    if (text.includes("\0")) refused.push(path);
    else entries.push({ path, text });
  }
  return { entries, refused };
}
/** The live pass's known positives: it must find exactly these, so a pass that reads nothing reds. */
const COVERAGE: readonly Entry[] = [{ path: "docs/wb-693.8-coverage-probe.md", text: "The 60 s deadline is adequate for TSX costs.\n\nTSX cold-process cost stays sufficient under the 256 KiB caps." }];
const COVERAGE_FINDINGS: readonly string[] = [
  "docs/wb-693.8-coverage-probe.md:1 anchor+cost+policy: asserted-adequate",
  "docs/wb-693.8-coverage-probe.md:3 anchor+cost+policy: asserted-sufficient",
];
const probe = (text: string, path = "docs/probe.md"): string[] => scanEntries([{ path, text }]);
/** Each cut rule's control: the claim and its subject on either side of the cut read quiet only while the rule cuts there. */
function cutControls(): Record<string, number> {
  return {
    period: probe("The TSX cost. It is adequate.").length,
    semicolon: probe("The TSX cost; it is adequate.").length,
    blankLine: probe("The TSX cost\n\nis adequate.").length,
    tableRow: probe("The TSX cost\n| is adequate |").length,
    listItem: probe("The TSX cost\n- is adequate.").length,
    dataLine: probe('"TSX cost":\n"adequate"', "docs/probe.json").length,
    listItemOutsideMarkdown: probe("The TSX cost\n- is adequate.", "docs/probe.txt").length,
    wrappedLine: probe("The TSX cost\nis adequate.").length,
  };
}
const SCRATCH_CLAIM = "The TSX cost is adequate.";
/** A scratch repository the walker must read as it reads Pi's tree: tracked and untracked in-scope files, an ignored file, a file
 * outside the roots, a root file that is no .md page, a file holding a NUL and a symlink. Returns what the walker listed, what it
 * refused and what the scan found. */
function scratchWalk(): { entries: string[]; refused: string[]; findings: string[] } {
  const root = makeScratch("wb-693.8-walk-");
  try {
    const git = (...args: string[]): void => {
      const run = spawnSync("git", args, { cwd: root, encoding: "utf8" });
      if (run.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${run.stderr}`);
    };
    git("init", "-q");
    mkdirSync(join(root, "docs"));
    mkdirSync(join(root, "test"));
    for (const [path, text] of [
      ["docs/tracked.md", SCRATCH_CLAIM],
      ["docs/untracked.md", SCRATCH_CLAIM],
      ["docs/ignored.md", SCRATCH_CLAIM],
      ["docs/screen.png", `PNG${String.fromCodePoint(0)}${SCRATCH_CLAIM}`],
      ["test/outside.md", SCRATCH_CLAIM],
      ["README.md", SCRATCH_CLAIM],
      ["NOTES.txt", SCRATCH_CLAIM],
      [".gitignore", "docs/ignored.md\n"],
    ]) writeFileSync(join(root, path), text);
    symlinkSync("tracked.md", join(root, "docs/link.md"));
    git("add", "docs/tracked.md", "docs/screen.png", "README.md", "NOTES.txt", ".gitignore");
    const { entries, refused } = liveEntries(root);
    return { entries: entries.map((entry) => entry.path), refused, findings: scanEntries(entries) };
  } finally {
    removeScratch(root);
  }
}

// --- C3: the arming ----------------------------------------------------------------------------------------------------------------
/** Armed while the gate reads ABSENT: every policy mismatch and every finding is a violation. On PRESENT the re-read governs. */
function guardOf(gate: Gate, policy: Policy, findings: readonly string[]): { state: "armed" | "stood-down"; violations: string[] } {
  if (gate === "PRESENT") return { state: "stood-down", violations: [] };
  const mismatch = samePolicy(policy) ? [] : [`${PROVIDER}: ${JSON.stringify(policy)} is not the stated policy`];
  return { state: "armed", violations: [...mismatch, ...findings] };
}

// --- the pins ----------------------------------------------------------------------------------------------------------------------
/** Paths that hold the report under its exact name: each flips the gate. */
const PRESENT_PLANTS: readonly string[] = [".rf-bench/tsx-baselines.json", "tests/bench/baselines/tsx-baselines.json", "docs/perf/tsx-baselines.json"];
/** Near names: none flips it (R-RENAMED among them). */
const NEAR_PLANTS: readonly string[] = [
  "tests/bench/baselines/tsx-baselines.json.bak",
  "tests/bench/baselines/tsx_baselines.json",
  "tests/bench/tsx-baselines.json/README.md",
  "Tsx-Baselines.json",
];
const IMPL: Record<string, () => Json> = {
  A1: () => {
    const report = statedReport();
    const { listing } = producer();
    expect(report).toBe(`${benchName()}.json`);
    expect(report.toLowerCase().includes(listing.filterWord)).toBe(true);
    expect(pinListing().every((path) => basenameOf(path).toLowerCase().includes(listing.filterWord))).toBe(true);
    const live = gateOf(pinListing(), report);
    expect(live).toEqual({ state: "ABSENT", matches: [] });
    const present = PRESENT_PLANTS.map((path) => gateOf([...pinListing(), path], report).state);
    const near = NEAR_PLANTS.map((path) => gateOf([...pinListing(), path], report).state);
    expect(present).toEqual(PRESENT_PLANTS.map(() => "PRESENT"));
    expect(near).toEqual(NEAR_PLANTS.map(() => "ABSENT"));
    const [written = "", schema = ""] = benchWrites();
    const outputIgnored = basenameOf(written) === report && ignoredDirectories().some((directory) => `/${written}`.startsWith(directory));
    expect(outputIgnored).toBe(true);
    const benchModule = pinListing().filter((path) => basenameOf(path).includes(benchName().replace("-", "_")));
    expect(gateOf(benchModule, report).state).toBe("ABSENT");
    JUDGED.add("A1");
    return {
      claim: claim("A1"),
      repository: producer().repository,
      pin: producer().pin,
      listed: listing.count,
      filtered: pinListing().length,
      report,
      state: live.state,
      matches: live.matches,
      present,
      near,
      written,
      schema,
      residuals: {
        "R-RENAMED": { [NEAR_PLANTS[1] ?? ""]: near[1] ?? "", [NEAR_PLANTS[3] ?? ""]: near[3] ?? "" },
        "R-NON-TREE": { outputIgnored, benchModule, state: gateOf(benchModule, report).state },
      },
    };
  },
  A2: () => {
    expect(producer().schema.path).toBe(statedSchema());
    expect(benchWrites()[1]).toBe(statedSchema());
    expect(names(RUNTIME_REQUIRED)).toContain(ROWS_KEY);
    expect(names(ROW_REQUIRED)).toEqual(expect.arrayContaining([GRAPH_KEY, SHAPE_KEY]));
    expect(names(SHAPE_REQUIRED)).toContain(COUNT_KEY);
    expect(names(TOP_REQUIRED)).toContain("name");
    const reached = pinGate() === "PRESENT";
    expect(reached).toBe(false);
    const base = standIn();
    expect(validateReport(base)).toEqual([]);
    const droppedTop = names(TOP_REQUIRED).map((key) => validateReport(omit(base, key)));
    expect(droppedTop).toEqual(names(TOP_REQUIRED).map((key) => [`/${key}`]));
    const droppedRow = names(ROW_REQUIRED).map((key) => validateReport(mapRows(base, (rows) => rows.map((row, index) => (index === 0 ? omit(row, key) : row)))));
    expect(droppedRow).toEqual(names(ROW_REQUIRED).map((key) => [`/${RUNTIME_KEY}/${ROWS_KEY}/0/${key}`]));
    const strayGraph = validateReport(mapRows(base, (rows) => rows.map((row, index) => (index === 0 ? { ...row, [GRAPH_KEY]: "census-stray" } : row))));
    expect(strayGraph).toEqual([`/${RUNTIME_KEY}/${ROWS_KEY}/0/${GRAPH_KEY}`]);
    const wrongType = validateReport({ ...base, name: 7 });
    expect(wrongType).toEqual([]);
    JUDGED.add("A2");
    return {
      claim: claim("A2"),
      schema: { path: producer().schema.path, blob: producer().schema.blob, id: producer().schema.id },
      reached,
      standIn: "constructed from the vendored slices, not a producer report",
      standInValid: true,
      droppedTop: droppedTop.length,
      droppedRow: droppedRow.length,
      strayGraph,
      residuals: { "R-SCHEMA-SLICE": wrongType },
    };
  },
  A3: () => {
    expect(benchSteps()).toEqual(statedSteps());
    const reached = pinGate() === "PRESENT";
    expect(reached).toBe(false);
    const base = standIn();
    const full = instanceAxes(base);
    expect(full).toEqual({ covered: true, missing: {} });
    const last = names(GRAPH_KINDS).at(-1) ?? "";
    const top = Math.max(...benchSteps());
    const dropped = instanceAxes(mapRows(base, (rows) => rows.filter((row) => !(row[GRAPH_KEY] === last && isObject(row[SHAPE_KEY]) && row[SHAPE_KEY][COUNT_KEY] === top))));
    expect(dropped).toEqual({ covered: false, missing: { [last]: [top] } });
    const bare = instanceAxes(omit(base, RUNTIME_KEY));
    expect(bare.covered).toBe(false);
    expect(Object.keys(bare.missing)).toEqual(names(GRAPH_KINDS));
    JUDGED.add("A3");
    return { claim: claim("A3"), steps: benchSteps(), graphs: names(GRAPH_KINDS).length, reached, full, dropped, bareMissing: Object.keys(bare.missing).length };
  },
  B1: () => {
    const live = recordedComparison(readRepo(TRACEABILITY), readdirSync(join(REPO, RECEIPTS)));
    expect(live).toEqual({ traceabilityLines: 0, receipt: false });
    const owed = pinGate() === "PRESENT";
    expect(owed).toBe(false);
    const planted = recordedComparison(`${readRepo(TRACEABILITY)}\n| ${BEAD} | ${statedBench()} policy vs N x cold-process cost |`, [`${BEAD}.md`]);
    expect(planted).toEqual({ traceabilityLines: 1, receipt: true });
    JUDGED.add("B1");
    return { claim: claim("B1"), live, owed, planted };
  },
  B2: () => {
    const note = statedNote().replace(/\s*\.\.\.$/, "");
    const noteControl = probe(`${note} the TSX cold-process cost per axis fits the 60 s deadline.`);
    expect(noteControl).toEqual(["docs/probe.md:1 anchor+cost+policy: asserted-adequate"]);
    const live = scanEntries(liveEntries().entries);
    expect(live).toEqual([]);
    const numericChange = !samePolicy(policyOf(readRepo(PROVIDER)));
    expect(numericChange).toBe(false);
    JUDGED.add("B2");
    return { claim: claim("B2"), gate: pinGate(), note, noteControl, liveFindings: live.length, numericChange };
  },
  C1: () => {
    expect(PROVIDER.endsWith(statedPolicy().module)).toBe(true);
    const source = readRepo(PROVIDER);
    const policy = policyOf(source);
    expect(policy).toEqual(statedShape());
    const changed = changedOf(source);
    expect(changed).toEqual({
      "other timer by name beside a deadline function": false,
      "other timer bound to a name beside a deadline binding": false,
      "deadline 30 s": true,
      "stdout cap 512 KiB": true,
      "stdout cap inclusive": true,
      "shared cap 128 KiB": true,
      "second deadline timer": true,
      "second deadline timer by name": true,
      "second deadline timer by a shadowed name": true,
      "second deadline timer by call": true,
      "duplicate deadline timer": true,
      "runtime deadline": true,
      "renamed deadline binding": false,
    });
    // REFACTORS (wb-q1a0 F1, F3): each keeps the numerics, so it reads unchanged, and no variant reads otherwise over it. The first
    // two bind the deadline to the very name the renamed variant takes on the live module (the gate's L17 and L17c).
    const renamed = freshName(source, RENAMED_BASE);
    const refactors: Record<string, string> = {
      "deadline bound in its function to the variant's name": namedDeadline(source, renamed, "function"),
      "deadline bound at module scope to the variant's name": namedDeadline(source, renamed, "module"),
      "deadline bound in its function to another name": namedDeadline(source, freshName(source, "PREVIEW_DEADLINE_MS"), "function"),
      "deadline callback bound to a name": namedCallback(source, freshName(source, "onDeadline"), "binding"),
      "deadline callback declared as a function": namedCallback(source, freshName(source, "onDeadline"), "declaration"),
    };
    expect(new Set([source, ...Object.values(refactors)]).size).toBe(Object.keys(refactors).length + 1);
    const refactored = Object.fromEntries(
      Object.entries(refactors).map(([name, text]) => {
        const readings = changedOf(text);
        return [name, { unchanged: samePolicy(policyOf(text)), drift: Object.keys(changed).filter((variant) => readings[variant] !== changed[variant]) }];
      }),
    );
    expect(refactored).toEqual(Object.fromEntries(Object.keys(refactors).map((name) => [name, { unchanged: true, drift: [] }])));
    // FAIL-CLOSED (wb-q1a0 F3, by design): each keeps the numerics yet reads changed; the reading itself is pinned.
    const failClosed = {
      "cap binding declared with let": policyJson(policyOf(letCapBinding(source))),
      "stream reason in an unrelated call under a comparison": policyJson(policyOf(`${source}\nif(n>0) console.debug("stdout");\n`)),
    };
    expect(Object.values(failClosed).map((reading) => JSON.stringify(reading) === JSON.stringify(statedShape()))).toEqual([false, false]);
    const fresh = { free: freshName("const B=1;", "A"), nested: freshName("const A=1;\nfunction f(){const A_1=2;}", "A") };
    expect(fresh).toEqual({ free: "A", nested: "A_2" });
    const otherKill = samePolicy(policyOf(`setTimeout(()=>child.kill("SIGKILL"),30_000);\n${source}`));
    expect(otherKill).toBe(true);
    const wrapper = freshName(source, "onLate");
    const handlers = freshName(source, "handlers");
    const indirect = [
      `${source}\nconst ${wrapper}=()=>stop("deadline");\nsetTimeout(()=>${wrapper}(),5_000);\n`,
      `${source}\nconst ${handlers}={deadline:()=>stop("deadline")};\nsetTimeout(${handlers}.deadline,5_000);\n`,
    ].map((text) => (samePolicy(policyOf(text)) ? "unchanged" : "read"));
    expect(indirect).toEqual(["unchanged", "unchanged"]);
    JUDGED.add("C1");
    return {
      claim: claim("C1"),
      module: PROVIDER,
      policy: policyJson(policy),
      stated: { deadlineMs: statedPolicy().deadlineMs, capBytes: statedPolicy().capBytes },
      changed,
      refactored,
      failClosed,
      fresh,
      residuals: { "R-OTHER-KILL-PATH": otherKill ? "unchanged" : "read", "R-INDIRECT-DEADLINE": indirect },
    };
  },
  C2: () => {
    const { entries, refused } = liveEntries();
    expect(refused).toEqual([]);
    const floors = Object.fromEntries(SCAN_ROOTS.map(({ root, floor }) => [root, entries.filter((entry) => entry.path.startsWith(`${root}/`)).length >= floor]));
    const pages = entries.filter((entry) => !entry.path.includes("/")).length >= PAGES_FLOOR;
    expect(entries.map((entry) => entry.path)).toContain(PROVIDER);
    const found = scanEntries([...entries, ...COVERAGE]);
    expect(found).toEqual([...COVERAGE_FINDINGS]);
    const anchors = ANCHOR_SPELLINGS.map((spelling) => probe(`The ${spelling} cost is adequate.`).length);
    const families = FAMILIES.flatMap((family) => family.spellings.map((spelling) => probe(`TSX ${spelling} is adequate.`)[0] ?? "quiet"));
    const inflections = CLAIMS.flatMap((item) => item.inflections.map((word) => probe(`The TSX cost is ${word}.`)[0] ?? "quiet"));
    const markers = [...MARKERS.map((word) => probe(`The TSX cost is ${word} adequate.`).length), probe("The TSX cost isn't adequate.").length];
    const cuts = cutControls();
    expect(cuts).toEqual({ period: 0, semicolon: 0, blankLine: 0, tableRow: 0, listItem: 0, dataLine: 0, listItemOutsideMarkdown: 1, wrappedLine: 1 });
    const walk = scratchWalk();
    expect(walk.entries).toEqual(["README.md", "docs/tracked.md", "docs/untracked.md"]);
    expect(walk.refused).toEqual(["docs/link.md", "docs/screen.png"]);
    expect(walk.findings).toEqual(walk.entries.map((path) => `${path}:1 anchor+cost: asserted-adequate`));
    const residuals = {
      "R-UNANCHORED": probe("The 60 s deadline is adequate for cold-process costs.").length,
      "R-MARKER-ANYWHERE": probe("Not measured yet, but the TSX cost is adequate.").length,
      "R-SPLIT": probe("The 60 s deadline covers TSX costs. It is adequate.").length,
      "R-PARAPHRASE": probe("The 60 s deadline comfortably covers TSX costs.").length,
      "R-LOOKALIKE": [
        probe(`The TSX cost is ${String.fromCodePoint(0x0430)}dequate.`).length,
        probe(`The TSX cost is ade${String.fromCodePoint(0x200b)}quate.`).length,
      ],
      "R-JOINED": [probe("The tsx_cost is adequate.").length, probe("tsxCost: adequate.").length],
      "R-OUTSIDE-ROOTS": {
        outside: ["test/probe.md", "new-feedback/probe.md", "vendor/README.md", ".beads/issues.jsonl", "NOTES.txt"].map(inScope),
        inside: inScope("docs/probe.md"),
      },
    };
    expect(residuals).toEqual({
      "R-UNANCHORED": 0,
      "R-MARKER-ANYWHERE": 0,
      "R-SPLIT": 0,
      "R-PARAPHRASE": 0,
      "R-LOOKALIKE": [0, 0],
      "R-JOINED": [0, 0],
      "R-OUTSIDE-ROOTS": { outside: [false, false, false, false, false], inside: true },
    });
    JUDGED.add("C2");
    return {
      claim: claim("C2"),
      floors,
      pages,
      findings: found.filter((item) => !COVERAGE_FINDINGS.includes(item)),
      coverage: found,
      anchors,
      families,
      inflections,
      markers,
      cuts,
      walk,
      residuals,
    };
  },
  C3: () => {
    const source = readRepo(PROVIDER);
    const live = guardOf(pinGate(), policyOf(source), scanEntries(liveEntries().entries));
    expect(live).toEqual({ state: "armed", violations: [] });
    const changed = policyOf(plantAt(source, isDeadlineDelay, "30_000"));
    const claimed = probe("The 60 s deadline is adequate for TSX costs.");
    const armed = guardOf("ABSENT", changed, claimed);
    expect(armed.violations).toHaveLength(2);
    const holding = gateOf([...pinListing(), PRESENT_PLANTS[1] ?? ""], statedReport()).state;
    const stood = guardOf(holding, changed, claimed);
    expect(stood).toEqual({ state: "stood-down", violations: [] });
    JUDGED.add("C3");
    return { claim: claim("C3"), gate: pinGate(), live, armedViolations: armed.violations.length, holding, stood };
  },
};

/** This file's own source, parsed. */
const selfFile = (): ts.SourceFile => ts.createSourceFile(SELF, readFileSync(HERE, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** Every case's explicit timeout, in this file's source order (null: the runner's default budget; wb-q1a0 F6). */
function caseBudgets(): (number | null)[] {
  const out: (number | null)[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it") {
      const options = node.arguments[1];
      const timeout =
        options !== undefined && ts.isObjectLiteralExpression(options)
          ? options.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "timeout")
          : undefined;
      out.push(timeout !== undefined && ts.isNumericLiteral(timeout.initializer) ? Number(timeout.initializer.text) : null);
    }
    ts.forEachChild(node, visit);
  };
  visit(selfFile());
  return out;
}
/** The identifiers each IMPL entry names, read from this file's own source. */
function implReads(): Record<string, string[]> {
  const file = selfFile();
  const reads: Record<string, string[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property) || !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) continue;
        const found = new Set<string>();
        const collect = (inner: ts.Node): void => {
          if (ts.isIdentifier(inner)) found.add(inner.text);
          ts.forEachChild(inner, collect);
        };
        collect(property.initializer);
        reads[property.name.text] = [...found].sort();
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return reads;
}

describe("wb-693.8 rf TSX cost-adequacy census (RF-TSX-AND-EMBEDDING-R10, the until-then negative; the re-read pending)", () => {
  it("judged set: frozen shape, roster, the owner filing, the vendored spans and this file's IMPL", { timeout: 120_000 }, () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:3"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map((pin) => ({ id: pin.id, quote: pin.quote })) })));
    expect(Object.keys(IMPL).sort()).toEqual(pinIds());
    expect(ROSTER.bead).toBe(BEAD);
    const owner = acceptance();
    expect(ROWS.map((row) => row.label)).toEqual(owner);
    expect(owner.map((item, index) => tiled(item, ROWS[index]?.pins.map((pin) => pin.quote) ?? []))).toEqual(owner.map(() => true));
    expect(ROSTER.producer.excerpts.map((item) => sha256(decode(item.textBase64)))).toEqual(ROSTER.producer.excerpts.map((item) => item.sha256));
    expect(ROSTER.producer.excerpts.map((item) => item.site)).toEqual([...SITES]);
    expect(ROSTER.producer.schema.slices.map((item) => sha256(decode(item.textBase64)))).toEqual(ROSTER.producer.schema.slices.map((item) => item.sha256));
    expect(ROSTER.producer.schema.slices.map((item) => item.pointer)).toEqual([...POINTERS]);
    expect(statedReport()).toBe(`${benchName()}.json`);
    expect(statedSteps()).toEqual(benchSteps());
    expect(statedPolicy()).toEqual({ deadlineMs: 60_000, capBytes: 262_144, module: "providers/reactivefiber.ts" });
    const word = statedClaim();
    expect(probe(`The TSX cost is ${word}.`)).toEqual([`docs/probe.md:1 anchor+cost: asserted-${CLAIMS[0]?.id ?? ""}`]);
    expect(gatingWords().map((item) => MARKER.test(item))).toEqual([true, true, true]);
    const clauses = [untilClause(), (acceptance()[2] ?? "").slice((acceptance()[2] ?? "").indexOf("): ") + 3)];
    expect(clauses.map((item) => probe(item).length)).toEqual([0, 0]);
    const stripped = clauses.map((item) => probe(item.replace(new RegExp(MARKER.source, "gi"), "")).map((found) => found.slice(found.indexOf(" ") + 1)));
    expect(stripped).toEqual([["anchor+cost: asserted-adequate"], ["anchor+cost: asserted-adequate"]]);
    expect(subjectPhrases().map(uncovered)).toEqual(subjectPhrases().map(() => []));
    expect(ROSTER.residuals.map((item) => item.id)).toEqual([...RESIDUALS]);
    expect(ROSTER.residuals.every((item) => pinIds().includes(item.quietPin))).toBe(true);
    const quietRows = (pin: string): string[] => {
      const witness = ROSTER.rows.flatMap((entry) => entry.pins).find((entry) => entry.id === pin)?.witness;
      const residuals = isObject(witness) ? witness.residuals : undefined;
      return isObject(residuals) ? Object.keys(residuals) : [];
    };
    expect(ROSTER.residuals.filter((item) => !quietRows(item.quietPin).includes(item.id)).map((item) => item.id)).toEqual([]);
    const reads = implReads();
    expect(Object.keys(reads).sort()).toEqual(pinIds());
    expect(Object.entries(reads).filter(([, found]) => !found.some((name) => READERS.includes(name)) || found.includes("ROSTER")).map(([pin]) => pin)).toEqual([]);
    // The judged set reads the bead export and parses this file; it runs on the pins' explicit budget, never the runner default.
    expect(caseBudgets()).toEqual([120_000, 120_000, null]);
  });

  for (const row of ROWS)
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins)
        it(pin.id, { timeout: 120_000 }, () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(isObject(witness) ? witness.claim : null).toBe(claim(pin.id));
          const held = ROSTER.rows.flatMap((entry) => entry.pins).find((entry) => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
    });

  it("records: every pin ran its own case to the end and reached its witness", () => {
    expect([...JUDGED].sort()).toEqual(pinIds());
    expect([...REACHED].sort()).toEqual(pinIds());
  });
});
