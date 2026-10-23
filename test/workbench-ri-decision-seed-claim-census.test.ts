/**
 * wb-tz4r.8 (RI-UNIFIED-DECISION-INFERENCE-R8, program-triage-2026-10-22), the standing-posture census. Statement (bead title;
 * <DI>, <DE> and <NDB> are the placeholders defined below): "No Pi surface (docs, capability registry, receipts, beads) shall
 * describe ReactiveInference <DI> as runnable or supported beyond the shipped seed (closed-choice contracts and pure preflight
 * at 485f3615db1e; no provider execution), marking proposed capabilities as proposed with the pinned sha (standing posture; the
 * seed is shipped, RI-DEC-01/03/06-10 are not); pin docs/programs/unified-decision-inference-2026-10-21/03-conformance.md:16
 * @485f3615db1e". The acceptance is the owner filing's, verbatim but for the placeholders: the labels of rows A, B and C.
 *
 * THE PLACEHOLDERS. Acceptance (c)'s grep has three alternatives: <DE> is the producer's typed decision module (two words, one
 * underscore), <NDB> its native backend class (three words, Pascal case) and <DI> the bead's own two prose words (one space).
 * This file and its roster never spell one: NEEDLE_PARTS holds the words, NEEDLES composes each alternative at runtime by array
 * joins (never a foldable concatenation), and every label, quote and constructed text writes or builds it the same way, so row
 * C's whole-tree scan holds over these two files with no path excluded (the wb-tz4r.1 discipline; R-COMPOSED names its cost).
 * The roster pins the sha256 of each composed alternative and F1 reads the three back from the filing's own grep, so the word
 * lists cannot drift from the bead.
 *
 * SOURCE (read-only git show by the cutting seat, 2026-10-23, in the local ReactiveInferenceSDK checkout at the pin):
 * 03-conformance.md:16 "Native inference adapters require fake-provider protocol tests and then separately reported credentialed
 * live provider tests. Mark unsupported/proposed capabilities accurately; do not claim runnable beyond actual acceptance." (the
 * filing quotes the second sentence); 02-implementation.md:23 "Current implementation: RI-DEC-02/04/05 **initial restricted
 * seed only**, with choice questions and pure preflight, NOT provider execution or advanced output support."; :25 "Do not change
 * existing model cards to claim unsupported heads, scoring, streaming tool calls or joint execution."; README.md:14 "... This is
 * NOT the complete inference system.". The seed is the <DE> package (src/reactive_inference/<DE>/__init__.py, contracts.py and
 * preflight.py) and tests/test_<DE>_preflight.py at 485f3615db1e. RE-PROBED at RI origin/master 9454d8ce1504 (2026-10-23, 11
 * commits past the pin, which it contains; the local ref, no fetch): the four program documents are byte-identical (blobs
 * a89810065d91, 05c09af36db8, 2ed40f651d8a, fa2eadf4b089); the package's three modules changed in one commit (7c19e5d) and still
 * export the seven request and plan names, none defining a function whose name begins run, execute, infer, call, invoke or
 * finalize; <NDB> is spelled in no src file (one program-document row). The seed posture holds: RI-DEC-01/03/06-10 are unshipped.
 *
 * MEASURED AT BASE c6369e0 (landing 293): acceptance (c)'s grep has 0 sites below the four roots; outside .beads/ no tracked file
 * spells a MENTIONS family in any case; `reactive_inference` occurs only as the sdk_versions version echo (three receipts,
 * test/helpers/rf-render-fixture.ts, at :83 since the filing read :63, and rf fixtures and their censuses) and once in an rf
 * diagnostic hint of a test roster. The tracked bead export (712 rows) names a family in seven rows, the owner filings
 * wb-tz4r.1-.6 and wb-tz4r.8 (FILING_ROWS), and every string value that names one carries a marker and the pin; the epic
 * wb-tz4r, wb-tz4r.7 and the residuals bead wb-nzdh name the program only (R-PROGRAM). The live store read the same, with the
 * delivery notes the next export carries.
 *
 * READINGS
 * - MENTIONS, matched in any case: M1 <DI>, its two words joined directly or by any run of white space, "_", "." or "-", except
 *   right after the word unified and such a run (the program's name: its directory, requirement ids and draft keys); M2 <DE> and
 *   M3 <NDB>, their words joined the same way; M4 a work-package id of the program (RI-DEC- and a digit).
 * - MARKERS, closed, whole words, any case, a run of white space or "-" inside a phrase: proposed, seed only, unshipped,
 *   not shipped, "shipped: no" (the filings' Shipped field), gated, unsupported, not supported, not runnable. PIN: the hex token
 *   485f3615db1e or an extension of it, bounded by no letter or digit.
 *  A, acceptance (a). A mention is admitted only when its window carries a MARKER and the PIN; otherwise it reads as a claim of
 *    the capability, unmarked (no marker) or unpinned (a marker, no pin). The window is the lines a mention spans in a docs file
 *    (R-LINE) and the whole string value in a bead row (R-FIELD: the filings quote the producer in Authority and Gating paragraphs
 *    of their own, so 25 of the 49 mentions in their fields carry no marker or no pin on their own line, measured on the live
 *    store, while every field carries both). DOC_ROOTS: every markdown file directly in the repository root and below docs/,
 *    new-feedback/, .agents/, .pi/, .beads/, examples/ and vendor/ (95 at base); src, test and qa are row C's (R-SCOPE). A1 the
 *    walk is not blind (floors, the two pages the clause names, the export); A2 every docs mention admitted (0 mentions at base);
 *    A3 every export string value naming a family admitted, and every filing row judged; A4 no descriptor of the native
 *    registration or of the four injected ones spells a family (the registry; its page 06-capability-registry.md is read by A2).
 *  B, acceptance (b), the receipt rule. A mention in a docs file outside docs/workbench/receipts/ is admitted only when the lines
 *    it spans cite a receipt (receipts/<name>.md, any leading directories) that is a file of docs/workbench/receipts/ and
 *    measures the subject: one of its lines carries the PIN beside a measurement record (a code span or a forge cmd_ id) and it
 *    names a family; otherwise, first failing condition first, receipt-absent, receipt-missing or receipt-not-measuring. A receipt
 *    is the measurement, so row A alone judges its own lines. B1 the real docs and receipts; B2-B7 constructed docs lines, B4
 *    against a real receipt.
 *  C, acceptance (c). C1 the grep: every regular file below src, test, qa and docs/workbench (symlinks recorded, never followed),
 *    read as UTF-8, holds no occurrence of a NEEDLE (case-sensitive, as grep reads it), with floors, and this file and its roster
 *    are walked and carry all three placeholders; C2 the version echo: the fixture the clause names and the receipts carry the
 *    sdk_versions reactive_inference entry as a version string, read by no NEEDLE and no MENTIONS family on its lines (the
 *    exclusion holds by the rule, never by a path).
 *  F, outside anchor. F1 the owner filing row of wb-tz4r.8 in the tracked bead export: its Acceptance paragraph cut at its clause
 *    marks gives exactly (a)-(c), each equal to its row's label with the placeholders composed back; its grep spells exactly
 *    NEEDLES, in order; its quote, citation and title tail equal the roster's; it names both DOC_ANCHORS pages.
 *  M, the matchers' controls on constructed texts; R, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every row's id, label and pins, every pin's
 * witness, the constants and the registered test titles are held to the out-of-file roster
 * test/fixtures/ri-decision-seed-claim-roster.json, and the records case walks this file's vitest task tree against it, so a pin
 * deleted, relabelled, swapped or removed from every literal of this file at once still reds there or against the filing.
 * RESIDUALS (named families, each a pinned quiet row in row R; the escape stays uncaught and the row reds when that changes):
 * R-LINE a marker and the pin anywhere on a docs mention's lines admit it, whatever they qualify; R-FIELD the same for a whole
 * bead string value; R-PROGRAM the words right after "unified" are read as the program's name, never a mention; R-VOCABULARY a
 * paraphrase outside M1-M4 (native choice heads, a native decision result) names no family; R-INTERRUPTED a family split by a
 * zero-width code point or spelled with a look-alike letter; R-CASE row C reads the three needles case-sensitively and nothing
 * else, so a capitalized, hyphenated or double-spaced spelling is no C site (rows A and B read docs in any case); R-COMPOSED a
 * needle assembled at runtime, this file's own mechanism, is invisible to a text scan; R-RECEIPT-TEXT the receipt rule reads
 * text, so a receipt quoting a measurement it never ran passes; R-SCOPE a code-root mention outside the three needles (a
 * work-package id in a test, the module's words spaced) is judged by no row.
 * SCOPE: the producer facts are read at the shas named and the census is hermetic (Pi vendors no RI source); a later cut that
 * names the capability in docs brings its receipt and its markers, and one that ships an RI consumer re-cuts row C.
 *
 * Display paths added: none. Test-only: the docs, src, qa, the receipts, the export and the registrations are only read; no
 * scratch is made.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import type { Json } from "./helpers/rf-render-fixture.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROOT = process.cwd();
const SELF = "test/workbench-ri-decision-seed-claim-census.test.ts";
const ROSTER_FILE = "test/fixtures/ri-decision-seed-claim-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const RECEIPTS = "docs/workbench/receipts";
const BEAD = "wb-tz4r.8";
const RI_PIN = "485f3615db1e";
const RI_PROBE = "9454d8ce1504";
const CITATION = `docs/programs/unified-decision-inference-2026-10-21/03-conformance.md:16@${RI_PIN}`;
const QUOTE = "Mark unsupported/proposed capabilities accurately; do not claim runnable beyond actual acceptance.";

/** The words every needle, family and constructed text is built from (header, THE PLACEHOLDERS). */
const WORD = {
  decision: "decision",
  inference: "inference",
  engine: "engine",
  native: "native",
  backend: "backend",
  unified: "unified",
} as const;
const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const upper = (word: string): string => word.toUpperCase();
interface NeedlePart {
  readonly placeholder: string;
  readonly words: readonly string[];
  readonly joiner: string;
}
/** Acceptance (c)'s three alternatives, in the filing's order. */
const NEEDLE_PARTS: readonly NeedlePart[] = [
  { placeholder: "<DE>", words: [WORD.decision, WORD.engine], joiner: "_" },
  { placeholder: "<NDB>", words: [WORD.native, WORD.decision, WORD.backend].map(caps), joiner: "" },
  { placeholder: "<DI>", words: [WORD.decision, WORD.inference], joiner: " " },
];
const NEEDLES: readonly string[] = NEEDLE_PARTS.map(part => part.words.join(part.joiner));
const PLACEHOLDERS: readonly string[] = NEEDLE_PARTS.map(part => part.placeholder);
function needleOf(placeholder: string): string {
  const found = NEEDLES[PLACEHOLDERS.indexOf(placeholder)];
  if (found === undefined) throw new Error(`no needle for ${placeholder}`);
  return found;
}
const DE = needleOf("<DE>");
const NDB = needleOf("<NDB>");
const DI = needleOf("<DI>");
/** A label or quote with each placeholder composed back to its needle. */
const expand = (text: string): string =>
  NEEDLE_PARTS.reduce((out, part, index) => out.split(part.placeholder).join(NEEDLES[index] ?? part.placeholder), text);
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");

/** The join M1-M3 allow between their words: any run of white space, "_", "." or "-". */
const JOIN = "[\\s_.-]*";
interface Family {
  readonly id: string;
  readonly source: string;
}
/** The subject (header, READINGS); each source is compiled case-insensitive. */
const MENTIONS: readonly Family[] = [
  { id: "M1", source: `(?<!${WORD.unified}${JOIN})${WORD.decision}${JOIN}${WORD.inference}` },
  { id: "M2", source: `${WORD.decision}${JOIN}${WORD.engine}` },
  { id: "M3", source: `${WORD.native}${JOIN}${WORD.decision}${JOIN}${WORD.backend}` },
  { id: "M4", source: "\\bRI-DEC-\\d" },
];
const MARKERS: readonly string[] = [
  "proposed", "seed only", "unshipped", "not shipped", "shipped: no", "gated", "unsupported", "not supported", "not runnable",
];
const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MARKER = new RegExp(`\\b(?:${MARKERS.map(marker => marker.split(" ").map(escapeRegex).join("[\\s-]+")).join("|")})\\b`, "i");
const PIN = new RegExp(`(?<![0-9a-z])${RI_PIN}[0-9a-f]{0,28}(?![0-9a-z])`, "i");
/** A receipt citation; group 1 is the receipt's file name. */
const RECEIPT_CITE = /(?<![\w.-])(?:[\w.-]+\/)*receipts\/([A-Za-z0-9][\w.-]*\.md)(?!\w)/g;
/** A measurement record on a receipt line: a code span or a forge command id. */
const MEASUREMENT = /`[^`\n]+`|\bcmd_[0-9a-f]{12}\b/;

/** The docs the rows A and B walk: the root's own markdown files and every markdown file below these directories. */
const DOC_DIRS: readonly string[] = ["docs", "new-feedback", ".agents", ".pi", ".beads", "examples", "vendor"];
/** The two pages acceptance (a) names, each with a token the walk must read in it. */
const DOC_ANCHORS: readonly (readonly [string, string])[] = [
  ["docs/workbench/feature-matrix.md", "reactivefiber.render.preview"],
  ["docs/workbench/06-capability-registry.md", "Capability registry"],
];
/** 95 docs, 44 receipts and 712 export rows at base c6369e0; each floor sits below its count. */
const DOCS_FLOOR = 85;
const RECEIPTS_FLOOR = 40;
const EXPORT_FLOOR = 600;
/** The owner filing rows whose fields name a family at base (header, MEASURED AT BASE). */
const FILING_ROWS: readonly string[] = ["wb-tz4r.1", "wb-tz4r.2", "wb-tz4r.3", "wb-tz4r.4", "wb-tz4r.5", "wb-tz4r.6", "wb-tz4r.8"];
/** Acceptance (c)'s four roots, and a floor below each one's count at base (src 115, test 538, qa 67, docs/workbench 69). */
const SCAN_ROOTS: readonly string[] = ["src", "test", "qa", "docs/workbench"];
const FLOORS: Readonly<Record<string, number>> = { src: 105, test: 500, qa: 60, "docs/workbench": 60 };
const ECHO_KEY = "reactive_inference";
const ECHO_FIXTURE = "test/helpers/rf-render-fixture.ts";
/** The receipts carrying the echo at base: three. */
const ECHO_RECEIPTS_FLOOR = 3;
const VERSION = /^\d+(?:\.\d+){2,3}$/;
/** The echo: the key, then a quoted value, directly or as the distribution_version of its object; group 1 or 2 is the value. */
const ECHO = new RegExp(
  `${ECHO_KEY}["']?\\s*:\\s*(?:["']([^"'\\n]*)["']|\\{\\s*["']?distribution_version["']?\\s*:\\s*["']([^"'\\n]*)["'])`,
  "g",
);
const RESIDUALS: readonly string[] = [
  "R-LINE", "R-FIELD", "R-PROGRAM", "R-VOCABULARY", "R-INTERRUPTED", "R-CASE", "R-COMPOSED", "R-RECEIPT-TEXT", "R-SCOPE",
];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) census over docs/workbench (incl. feature-matrix.md, 06-capability-registry.md), receipts and beads: zero sentences claim RI <DI> runnable/supported; any mention carries 'proposed/seed-only' plus sha 485f3615db1e",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) guard: a docs sentence naming <DI> without a measuring receipt behind it is RED (wb-2j3.2/R6 pattern)",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
  },
  {
    id: "C",
    label: "(c) pin: grep <DE>|<NDB>|<DI> over Pi src/test/qa/docs/workbench = 0 (0 at this read), the sdk_versions.reactive_inference distribution_version echo (test/helpers/rf-render-fixture.ts:63, receipts) counted as a version string, not a claim",
    pins: ["C1", "C2"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-tz4r.8 in the tracked bead export states acceptance (a)-(c) as rows A-C's labels, spells exactly the three needles in its grep and carries the roster's quote, citation and pages",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the mention, marker, pin, window, export, receipt-citation and echo matchers judge their pinned inputs in order",
    pins: ["MM1", "MM2", "MM3", "MM4", "MK1", "MP1", "MW1", "MF1", "MR1", "MV1"],
  },
  {
    id: "R",
    label: "the named residuals R-LINE, R-FIELD, R-PROGRAM, R-VOCABULARY, R-INTERRUPTED, R-CASE, R-COMPOSED, R-RECEIPT-TEXT and R-SCOPE stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: Json;
  readonly rows: readonly RosterRow[];
  readonly residuals: readonly string[];
  readonly tests: readonly string[];
}
function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
const asJson = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;
function stringList(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(entry => typeof entry === "string")) throw new Error(`roster ${name} must be a list of strings`);
  return value.map(String);
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Object.hasOwn(raw, "constants") || !Array.isArray(raw.rows)) {
    throw new Error("roster must be an object with a bead, constants and a rows list");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: asJson(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: raw.bead,
    constants: asJson(raw.constants),
    rows,
    residuals: stringList(raw.residuals, "residuals"),
    tests: stringList(raw.tests, "tests"),
  };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** The constants the roster pins beside the rows. */
function constants(): Json {
  return {
    riPin: RI_PIN,
    riProbe: RI_PROBE,
    citation: CITATION,
    quote: QUOTE,
    needles: NEEDLE_PARTS.map((part, index) => ({ placeholder: part.placeholder, sha256: sha256(NEEDLES[index] ?? "") })),
    mentions: MENTIONS.map(family => `${family.id}:${family.source}`),
    markers: [...MARKERS],
    pin: PIN.source,
    receiptCite: RECEIPT_CITE.source,
    measurement: MEASUREMENT.source,
    docDirs: [...DOC_DIRS],
    docAnchors: DOC_ANCHORS.map(([path, token]) => `${path}:${token}`),
    floors: { docs: DOCS_FLOOR, receipts: RECEIPTS_FLOOR, exportRows: EXPORT_FLOOR, ...FLOORS, echoReceipts: ECHO_RECEIPTS_FLOOR },
    filingRows: [...FILING_ROWS],
    scanRoots: [...SCAN_ROOTS],
    echoKey: ECHO_KEY,
    echoFixture: ECHO_FIXTURE,
    version: VERSION.source,
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
/** Every regular file below a directory, in name order; symlinks are listed apart and never followed. */
function walk(directory: string, files: string[], symlinks: string[]): void {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return;
  }
  entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) symlinks.push(posix(relative(REPO, path)));
    else if (entry.isDirectory()) walk(path, files, symlinks);
    else if (entry.isFile()) files.push(posix(relative(REPO, path)));
  }
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
}
let docsCache: SourceFile[] | undefined;
/** DOC_ROOTS: the root's own markdown files, then every markdown file below DOC_DIRS. */
function docFiles(): SourceFile[] {
  if (docsCache === undefined) {
    const paths = readdirSync(REPO, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
      .map(entry => entry.name)
      .sort();
    for (const directory of DOC_DIRS) {
      const files: string[] = [];
      walk(join(REPO, directory), files, []);
      paths.push(...files.filter(file => file.endsWith(".md")));
    }
    docsCache = paths.map(path => ({ path, text: textOf(join(REPO, path)) }));
  }
  return docsCache;
}
const isReceipt = (path: string): boolean => path.startsWith(`${RECEIPTS}/`);
/** The real receipts by file name. */
function receiptMap(): Map<string, string> {
  return new Map(docFiles().filter(file => isReceipt(file.path)).map(file => [file.path.slice(RECEIPTS.length + 1), file.text]));
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
type Verdict = "admitted" | "unmarked" | "unpinned";
interface Mention {
  readonly family: string;
  readonly line: number;
  readonly window: string;
}
/** Every MENTIONS match of a text, family by family, with the 1-based line it starts on and the lines it spans. */
function mentionsOf(text: string): Mention[] {
  const starts = lineStarts(text);
  return MENTIONS.flatMap(family =>
    [...text.matchAll(new RegExp(family.source, "gi"))].map(match => {
      const at = match.index ?? 0;
      const first = lineAt(starts, at);
      const last = lineAt(starts, at + Math.max(match[0].length, 1) - 1);
      const next = starts[last + 1];
      return { family: family.id, line: first + 1, window: text.slice(starts[first] ?? 0, next === undefined ? text.length : next - 1) };
    }),
  );
}
function verdictOf(window: string): Verdict {
  const marked = MARKER.test(window);
  if (marked && PIN.test(window)) return "admitted";
  return marked ? "unpinned" : "unmarked";
}
/** Row A's reading of docs: one finding per mention whose lines lack a marker or the pin. */
function docsFindings(files: readonly SourceFile[]): string[] {
  return files.flatMap(file =>
    mentionsOf(file.text)
      .map(mention => ({ mention, verdict: verdictOf(mention.window) }))
      .filter(entry => entry.verdict !== "admitted")
      .map(entry => `${file.path}:${entry.mention.line} ${entry.mention.family}: ${entry.verdict}`),
  );
}

/** Whether a receipt measures the subject (header, READINGS B). */
function measures(receipt: string): boolean {
  const measured = receipt.split("\n").some(line => PIN.test(line) && MEASUREMENT.test(line));
  return measured && mentionsOf(receipt).length > 0;
}
/** The receipt names a window cites, in order. */
const citedReceipts = (window: string): string[] => [...window.matchAll(RECEIPT_CITE)].map(match => match[1] ?? "");
/** Row B's reading: one finding per mention, outside the receipts, whose lines cite no measuring receipt. */
function receiptFindings(files: readonly SourceFile[], receipts: ReadonlyMap<string, string>): string[] {
  const findings: string[] = [];
  for (const file of files.filter(entry => !isReceipt(entry.path))) {
    for (const mention of mentionsOf(file.text)) {
      const cited = citedReceipts(mention.window);
      const present = cited.filter(name => receipts.has(name));
      const where = `${file.path}:${mention.line} ${mention.family}`;
      if (cited.length === 0) findings.push(`${where}: receipt-absent`);
      else if (present.length === 0) findings.push(`${where}: receipt-missing`);
      else if (!present.some(name => measures(receipts.get(name) ?? ""))) findings.push(`${where}: receipt-not-measuring`);
    }
  }
  return findings;
}

interface ExportRow {
  readonly id: string;
  readonly values: readonly { readonly at: string; readonly text: string }[];
}
interface BeadExport {
  readonly rows: ExportRow[];
  readonly unreadable: string[];
}
function valuesOf(value: unknown, at: string): { at: string; text: string }[] {
  if (typeof value === "string") return [{ at, text: value }];
  if (Array.isArray(value)) return value.flatMap((entry, index) => valuesOf(entry, `${at}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, entry]) => valuesOf(entry, `${at}.${key}`));
  return [];
}
/** A bead export's rows with every string value and its path; a line that does not parse is kept as a finding. */
function parseExport(text: string): BeadExport {
  const rows: ExportRow[] = [];
  const unreadable: string[] = [];
  const lines = text.split("\n");
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index] ?? "";
    if (line.trim() === "") continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      unreadable.push(`line ${index + 1} unreadable`);
      continue;
    }
    const id = isObject(parsed) && typeof parsed.id === "string" ? parsed.id : `line ${index + 1}`;
    rows.push({ id, values: valuesOf(parsed, "") });
  }
  return { rows, unreadable };
}
let exportCache: BeadExport | undefined;
const beadExport = (): BeadExport => {
  exportCache ??= parseExport(textOf(join(REPO, BEAD_EXPORT)));
  return exportCache;
};
/** Row A's reading of an export: the rows naming a family and one finding per string value naming one without both. */
function exportFindings(data: BeadExport): { judged: Set<string>; findings: string[] } {
  const judged = new Set<string>();
  const findings: string[] = [];
  for (const row of data.rows) {
    for (const value of row.values) {
      if (mentionsOf(value.text).length === 0) continue;
      judged.add(row.id);
      const verdict = verdictOf(value.text);
      if (verdict !== "admitted") findings.push(`${row.id} ${value.at}: ${verdict}`);
    }
  }
  return { judged, findings };
}
function beadRow(id: string): { title: string; notes: string } {
  const raw = textOf(join(REPO, BEAD_EXPORT))
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line): unknown => JSON.parse(line))
    .find(entry => isObject(entry) && entry.id === id);
  if (!isObject(raw)) throw new Error(`${id} is missing from the bead export`);
  return { title: typeof raw.title === "string" ? raw.title : "", notes: typeof raw.notes === "string" ? raw.notes : "" };
}

/* The registrations Pi ships: the native registration and the four injected ones, each with a reader that is never invoked. */
const neverInvoked = (what: string) => (): never => {
  throw new Error(`census ${what}: never invoked, registration only stores the descriptor`);
};
let nativeCache: Promise<CapabilityDescriptor[]> | undefined;
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCache;
}
function injectedDescriptors(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, { gate: { status: neverInvoked("forge reader") } }, "0.0.0-census");
  registerFurnaceRunInspect(registry, { runs: { get: neverInvoked("furnace reader") } }, ROOT);
  registerHyperUnixFind(registry, { find: neverInvoked("hyperunix find"), runtime: neverInvoked("hyperunix runtime"), close: async () => {} }, ROOT);
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("census rf reader: never invoked")), ROOT);
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}

/** Every occurrence of each NEEDLE in a text, case-sensitive, as one site per needle with its count. */
function needleSites(path: string, text: string): string[] {
  return NEEDLES.flatMap((needle, index) => {
    let count = 0;
    for (let at = text.indexOf(needle); at !== -1; at = text.indexOf(needle, at + needle.length)) count += 1;
    return count === 0 ? [] : [`${path}: ${PLACEHOLDERS[index] ?? "?"} x${count}`];
  });
}
interface TreeReading {
  readonly files: Map<string, number>;
  readonly symlinks: string[];
  readonly sites: string[];
  readonly walked: Set<string>;
}
let treeCache: TreeReading | undefined;
/** Row C1's walk: every regular file below SCAN_ROOTS read as UTF-8 against the needles. */
function tree(): TreeReading {
  if (treeCache === undefined) {
    const files = new Map<string, number>();
    const symlinks: string[] = [];
    const sites: string[] = [];
    const walked = new Set<string>();
    for (const root of SCAN_ROOTS) {
      const below: string[] = [];
      walk(join(REPO, root), below, symlinks);
      files.set(root, below.length);
      for (const path of below) {
        walked.add(path);
        sites.push(...needleSites(path, textOf(join(REPO, path))));
      }
    }
    treeCache = { files, symlinks, sites, walked };
  }
  return treeCache;
}

interface Echo {
  readonly line: number;
  readonly value: string;
  readonly text: string;
}
/** Every version echo of a text: its line, its value and the line's text. */
function echoesOf(text: string): Echo[] {
  const starts = lineStarts(text);
  const lines = text.split("\n");
  return [...text.matchAll(ECHO)].map(match => {
    const line = lineAt(starts, match.index ?? 0);
    return { line: line + 1, value: match[1] ?? match[2] ?? "", text: lines[line] ?? "" };
  });
}

type CaseKind = "mention" | "export" | "receipt" | "cite" | "needle" | "echo";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  readonly texts: readonly string[];
  readonly outcome: readonly string[];
}
const zeroWidth = String.fromCodePoint(0x200b);
const cyrillicIe = String.fromCodePoint(0x0435);
const PROGRAM_DIR = ["unified", WORD.decision, WORD.inference, "2026-10-21"].join("-");
const REQUIREMENT = ["RI", "UNIFIED", upper(WORD.decision), upper(WORD.inference), "R8"].join("-");
/** A receipt the receipt rule admits: it measures the pin in a code span and names a family. */
const MEASURING_RECEIPT = [
  "# wb-x: a constructed receipt",
  "",
  "## 2026-10-23 measure",
  "",
  `- Measured at RI ${RI_PIN}: \`git show ${RI_PIN}:${PROGRAM_DIR}/02-implementation.md\` reads the seed only.`,
  `- ${caps(DI)} stays proposed beyond that seed.`,
].join("\n");
const exportLine = (row: Record<string, string>): string => JSON.stringify(row);
/** M judges the matchers on constructed texts, R the residuals' quiet rows, B2-B7 constructed docs lines. */
const CASES: readonly Case[] = [
  { pin: "B2", kind: "receipt", texts: [`${caps(DI)} stays proposed at ${RI_PIN}.`], outcome: ["doc.md:1 M1: receipt-absent"] },
  { pin: "B3", kind: "receipt", texts: [`${caps(DI)} stays proposed at ${RI_PIN} (receipts/wb-x.md).`], outcome: ["doc.md:1 M1: receipt-missing"] },
  { pin: "B5", kind: "receipt", texts: [`${caps(DI)} stays proposed at ${RI_PIN} (docs/workbench/receipts/wb-x.md).`, MEASURING_RECEIPT], outcome: [] },
  {
    pin: "B6",
    kind: "receipt",
    texts: [`The ${DE} seed is gated at ${RI_PIN}; see receipts/wb-x.md.`, `# wb-x: r\n\n- RI ${RI_PIN}: ${DI} is proposed.`],
    outcome: ["doc.md:1 M2: receipt-not-measuring"],
  },
  {
    pin: "B7",
    kind: "receipt",
    texts: [`${caps(DI)} stays proposed at ${RI_PIN} (receipts/wb-x.md).`, `# wb-x: r\n\n- \`git show ${RI_PIN}:README.md\` read the program.`],
    outcome: ["doc.md:1 M1: receipt-not-measuring"],
  },
  {
    pin: "MM1",
    kind: "mention",
    texts: [[`${caps(WORD.decision)} ${caps(WORD.inference)}`, `${WORD.decision}-${WORD.inference}`, `${WORD.decision}_${WORD.inference}`, `${caps(WORD.decision)}${caps(WORD.inference)}`, `${WORD.decision}\n${WORD.inference}`].join("\n")],
    outcome: ["M1:1:unmarked", "M1:2:unmarked", "M1:3:unmarked", "M1:4:unmarked", "M1:5:unmarked"],
  },
  {
    pin: "MM2",
    kind: "mention",
    texts: [[DE, `${caps(WORD.decision)}${caps(WORD.engine)}`, `${WORD.decision}.${WORD.engine}`, `${WORD.decision}-${WORD.engine}`, `the ${WORD.decision} ${WORD.engine}`].join("\n")],
    outcome: ["M2:1:unmarked", "M2:2:unmarked", "M2:3:unmarked", "M2:4:unmarked", "M2:5:unmarked"],
  },
  {
    pin: "MM3",
    kind: "mention",
    texts: [[NDB, [WORD.native, WORD.decision, WORD.backend].join("_"), [WORD.native, WORD.decision, WORD.backend].join(" ")].join("\n")],
    outcome: ["M3:1:unmarked", "M3:2:unmarked", "M3:3:unmarked"],
  },
  { pin: "MM4", kind: "mention", texts: ["RI-DEC-07 is proposed.\nri-dec-10 too.\nRI-DECIDE and RI-DEC-x are not ids."], outcome: ["M4:1:unpinned", "M4:2:unmarked"] },
  {
    pin: "MK1",
    kind: "mention",
    texts: [
      [
        ...MARKERS.map(marker => `${caps(DI)} is ${marker} at ${RI_PIN}.`),
        `${caps(DI)} is seed-only and Not  Shipped at ${RI_PIN}.`,
        `${caps(DI)}: a proposal, shipped, seeded, ungated or gating at ${RI_PIN}.`,
      ].join("\n"),
    ],
    outcome: [...MARKERS.map((_, index) => `M1:${index + 1}:admitted`), `M1:${MARKERS.length + 1}:admitted`, `M1:${MARKERS.length + 2}:unmarked`],
  },
  {
    pin: "MP1",
    kind: "mention",
    texts: [
      [
        `${caps(DI)} is proposed at 485f3615db1e8703d6ce1093713fe595e46f42a0.`,
        `${caps(DI)} is proposed (@485F3615DB1E).`,
        `${caps(DI)} is proposed at 485f3615db1.`,
        `${caps(DI)} is proposed at x485f3615db1e and 485f3615db1eg.`,
      ].join("\n"),
    ],
    outcome: ["M1:1:admitted", "M1:2:admitted", "M1:3:unpinned", "M1:4:unpinned"],
  },
  {
    pin: "MW1",
    kind: "mention",
    texts: [[`${caps(DI)} serves Pi.`, `It is proposed at ${RI_PIN}.`, `${caps(WORD.decision)}`, `${WORD.inference} is gated at ${RI_PIN}.`].join("\n")],
    outcome: ["M1:1:unmarked", "M1:3:admitted"],
  },
  {
    pin: "MF1",
    kind: "export",
    texts: [
      [
        exportLine({ id: "wb-x.1", title: `${caps(DI)} is proposed at ${RI_PIN}` }),
        exportLine({ id: "wb-x.2", notes: `The ${DE} module ships.\nGating: none.` }),
        exportLine({ id: "wb-x.3", description: `RI-DEC-06 is unshipped.` }),
        "{not json",
        exportLine({ id: "wb-x.4", title: `EPIC: ri-${PROGRAM_DIR} obligations (${REQUIREMENT})` }),
      ].join("\n"),
    ],
    outcome: ["wb-x.2 .notes: unmarked", "wb-x.3 .description: unpinned", "line 4 unreadable", "judged:wb-x.1,wb-x.2,wb-x.3"],
  },
  {
    pin: "MR1",
    kind: "cite",
    texts: ["receipts/wb-a.md, docs/workbench/receipts/wb-b.md and (receipts/wb-c.md). Not myreceipts/wb-d.md, receipts/wb-e.txt or receipts/wb-f.mdx."],
    outcome: ["wb-a.md", "wb-b.md", "wb-c.md"],
  },
  {
    pin: "MV1",
    kind: "echo",
    texts: [
      [
        `"${ECHO_KEY}":"0.2.60.20261018120223"}}`,
        `${ECHO_KEY}: { distribution_version: '0.2.55', contract_fingerprint: x },`,
        `"${ECHO_KEY}": {\n  "distribution_version": "0.1.17"`,
        `Use a model id ${ECHO_KEY} has verified to clear this warning.`,
      ].join("\n"),
    ],
    outcome: ["1:0.2.60.20261018120223", "2:0.2.55", "3:0.1.17"],
  },
  { pin: "R1", kind: "mention", texts: [`${caps(DI)} serves Pi today; the seed only preflight at ${RI_PIN} is older.`], outcome: ["M1:1:admitted"] },
  {
    pin: "R2",
    kind: "export",
    texts: [exportLine({ id: "wb-x.5", notes: `The ${DE} module ships provider execution.\n\nGating: the envelope is unshipped at ${RI_PIN}.` })],
    outcome: ["judged:wb-x.5"],
  },
  { pin: "R3", kind: "mention", texts: [`docs/programs/${PROGRAM_DIR}/README.md:14, [${REQUIREMENT}] and ri-${PROGRAM_DIR}/ri-no-runnable-claim`], outcome: [] },
  { pin: "R4", kind: "mention", texts: ["RI's native choice heads score candidates for Pi, and a native decision result routes through rf."], outcome: [] },
  {
    pin: "R5",
    kind: "mention",
    texts: [`deci${zeroWidth}sion ${WORD.inference} and d${cyrillicIe}cision ${WORD.inference} serve Pi today.`],
    outcome: [],
  },
  {
    pin: "R6",
    kind: "needle",
    texts: [[`${caps(WORD.decision)} ${WORD.inference}`, upper(DE), `${WORD.decision}-${WORD.inference}`, `${WORD.decision}  ${WORD.inference}`, `${WORD.native}${caps(WORD.decision)}${caps(WORD.backend)}`].join("\n")],
    outcome: ["mentions:M1,M1,M1,M2,M3"],
  },
  { pin: "R7", kind: "needle", texts: ['const name = ["decision", "engine"].join("_");\nconst words = [WORD.decision, WORD.inference].join(" ");'], outcome: [] },
  {
    pin: "R8",
    kind: "receipt",
    texts: [`${caps(DI)} stays proposed at ${RI_PIN} (receipts/wb-x.md).`, `# wb-x: r\n\n- \`git show ${RI_PIN}:x\` would print the seed; ${DI} is proposed.`],
    outcome: [],
  },
  { pin: "R9", kind: "needle", texts: [`// RI-DEC-06 ships provider execution in Pi; the ${WORD.decision} ${WORD.engine} serves it.`], outcome: ["mentions:M2,M4"] },
];
function outcomeOf(kind: CaseKind, texts: readonly string[]): string[] {
  const text = texts[0] ?? "";
  if (kind === "mention") return mentionsOf(text).map(mention => `${mention.family}:${mention.line}:${verdictOf(mention.window)}`);
  if (kind === "export") {
    const data = parseExport(text);
    const { judged, findings } = exportFindings(data);
    return [...findings, ...data.unreadable, `judged:${[...judged].sort().join(",")}`];
  }
  if (kind === "receipt") {
    const receipts = new Map<string, string>(texts.length > 1 ? [["wb-x.md", texts[1] ?? ""]] : []);
    return receiptFindings([{ path: "doc.md", text }], receipts);
  }
  if (kind === "cite") return citedReceipts(text);
  if (kind === "needle") {
    const sites = needleSites("x.ts", text);
    const mentions = mentionsOf(text).map(mention => mention.family);
    return mentions.length === 0 ? sites : [...sites, `mentions:${mentions.join(",")}`];
  }
  return echoesOf(text).map(echo => `${echo.line}:${echo.value}`);
}
const digestOf = (texts: readonly string[]): string => sha256(JSON.stringify(texts)).slice(0, 16);

/** The pins whose case reached its end, in the order they ran. */
const REACHED: string[] = [];
const done = (pin: string, witness: Json): Json => {
  REACHED.push(pin);
  return witness;
};
/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const docs = docFiles();
    const data = beadExport();
    const reading = {
      docsFloorMet: docs.length >= DOCS_FLOOR,
      receiptsFloorMet: docs.filter(file => isReceipt(file.path)).length >= RECEIPTS_FLOOR,
      anchorsRead: DOC_ANCHORS.map(([path, token]) => `${path}:${docs.find(file => file.path === path)?.text.includes(token) === true}`),
      rootDocsRead: docs.filter(file => !file.path.includes("/")).map(file => file.path),
      exportFloorMet: data.rows.length >= EXPORT_FLOOR,
      unreadable: data.unreadable,
    };
    expect(reading, `docs walked: ${docs.length}; export rows: ${data.rows.length}`).toStrictEqual({
      docsFloorMet: true,
      receiptsFloorMet: true,
      anchorsRead: DOC_ANCHORS.map(([path]) => `${path}:true`),
      rootDocsRead: reading.rootDocsRead,
      exportFloorMet: true,
      unreadable: [],
    });
    expect(reading.rootDocsRead, "the root's own markdown files are walked").toContain("README.md");
    return done("A1", reading);
  },
  A2: async () => {
    const docs = docFiles();
    const mentions = docs.flatMap(file => mentionsOf(file.text)).length;
    const findings = docsFindings(docs);
    expect(findings, "a docs mention of the capability without a marker and the pin").toEqual([]);
    return done("A2", { mentions, findings });
  },
  A3: async () => {
    const { judged, findings } = exportFindings(beadExport());
    const reading = { filingRowsJudged: FILING_ROWS.filter(id => judged.has(id)), findings };
    expect(reading, "every export string value naming the capability carries a marker and the pin").toStrictEqual({
      filingRowsJudged: [...FILING_ROWS],
      findings: [],
    });
    return done("A3", reading);
  },
  A4: async () => {
    const descriptors = [...(await nativeDescriptors()), ...injectedDescriptors()];
    const hits = descriptors
      .filter(descriptor => mentionsOf(JSON.stringify(descriptor)).length > 0)
      .map(descriptor => descriptor.id);
    const reading = { descriptorsFloorMet: descriptors.length >= 8, hits };
    expect(reading, `descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toStrictEqual({ descriptorsFloorMet: true, hits: [] });
    return done("A4", reading);
  },
  B1: async () => {
    const docs = docFiles();
    const mentionLines = docs.filter(file => !isReceipt(file.path)).flatMap(file => mentionsOf(file.text)).length;
    const findings = receiptFindings(docs, receiptMap());
    expect(findings, "a docs mention of the capability without a measuring receipt behind it").toEqual([]);
    return done("B1", { mentionLines, findings });
  },
  B4: async () => {
    const receipts = receiptMap();
    const real = "wb-c7ku.md";
    const findings = receiptFindings([{ path: "doc.md", text: `${caps(DI)} stays proposed at ${RI_PIN} (docs/workbench/receipts/${real}).` }], receipts);
    expect({ present: receipts.has(real), findings }).toStrictEqual({ present: true, findings: ["doc.md:1 M1: receipt-not-measuring"] });
    return done("B4", { receipt: real, findings });
  },
  C1: async () => {
    const reading = tree();
    const floors = Object.fromEntries(SCAN_ROOTS.map(root => [root, (reading.files.get(root) ?? 0) >= (FLOORS[root] ?? Number.POSITIVE_INFINITY)]));
    const self = [SELF, ROSTER_FILE].map(path => {
      const text = textOf(join(REPO, path));
      return { path, walked: reading.walked.has(path), placeholders: PLACEHOLDERS.filter(placeholder => text.includes(placeholder)) };
    });
    const witness = { floors, symlinks: reading.symlinks, sites: reading.sites, self };
    expect(witness, `files walked: ${JSON.stringify(Object.fromEntries(reading.files))}`).toStrictEqual({
      floors: Object.fromEntries(SCAN_ROOTS.map(root => [root, true])),
      symlinks: [],
      sites: [],
      self: [SELF, ROSTER_FILE].map(path => ({ path, walked: true, placeholders: [...PLACEHOLDERS] })),
    });
    return done("C1", witness);
  },
  C2: async () => {
    const fixture = echoesOf(textOf(join(REPO, ECHO_FIXTURE)));
    const receipts = docFiles().filter(file => isReceipt(file.path)).map(file => ({ path: file.path, echoes: echoesOf(file.text) }));
    const echoes = [...fixture, ...receipts.flatMap(receipt => receipt.echoes)];
    const reading = {
      fixtureEchoFloorMet: fixture.length >= 1,
      receiptsWithEchoFloorMet: receipts.filter(receipt => receipt.echoes.length > 0).length >= ECHO_RECEIPTS_FLOOR,
      everyEchoAVersion: echoes.every(echo => VERSION.test(echo.value)),
      echoLineSites: echoes.flatMap(echo => [...needleSites("echo", echo.text), ...mentionsOf(echo.text).map(mention => mention.family)]),
      keyRead: { needles: needleSites("key", ECHO_KEY).length, mentions: mentionsOf(ECHO_KEY).length },
    };
    expect(reading, "the version echo reads as a version string, never as a claim").toStrictEqual({
      fixtureEchoFloorMet: true,
      receiptsWithEchoFloorMet: true,
      everyEchoAVersion: true,
      echoLineSites: [],
      keyRead: { needles: 0, mentions: 0 },
    });
    return done("C2", reading);
  },
  F1: async () => {
    const row = beadRow(BEAD);
    const acceptance = /^Acceptance: (.*)$/m.exec(row.notes)?.[1] ?? "";
    const clauses = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const labelsEqual = judged.filter((entry, index) => clauses[index] === expand(entry.label)).map(entry => entry.id);
    const grep = /^\(c\) pin: grep (.+?) over Pi /.exec(clauses[2] ?? "")?.[1]?.split("|") ?? [];
    const quoted = /^'(.+)' (\S+)\.$/m.exec(row.notes);
    const reading = {
      clauses: clauses.map(clause => clause.slice(0, 4)),
      labelsEqual,
      grepIsNeedles: grep.length === NEEDLES.length && grep.every((alternative, index) => alternative === NEEDLES[index]),
      quote: quoted?.[1] === QUOTE,
      citation: quoted?.[2] === CITATION,
      titleCites: row.title.endsWith(`pin ${CITATION}`),
      pagesNamed: DOC_ANCHORS.map(([path]) => acceptance.includes(path.slice(path.lastIndexOf("/") + 1))),
    };
    expect(reading).toStrictEqual({
      clauses: ["(a) ", "(b) ", "(c) "],
      labelsEqual: judged.map(entry => entry.id),
      grepIsNeedles: true,
      quote: true,
      citation: true,
      titleCites: true,
      pagesNamed: DOC_ANCHORS.map(() => true),
    });
    return done("F1", reading);
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async () => {
        const outcome = outcomeOf(entry.kind, entry.texts);
        expect(outcome).toStrictEqual([...entry.outcome]);
        return done(entry.pin, { digest: digestOf(entry.texts), outcome });
      },
    ]),
  ),
};

/** A describe title: the row id and label (the label keeps its placeholders). */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("wb-tz4r.8 ReactiveInference seed-only claim census (program-triage-2026-10-22 R8, standing posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the constants agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:7", "C:2", "F:1", "M:10", "R:9"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, constants: constants(), residuals: [...RESIDUALS] }).toStrictEqual({
      bead: ROSTER.bead,
      constants: ROSTER.constants,
      residuals: [...ROSTER.residuals],
    });
    expect(NEEDLES.map(needle => NEEDLES.indexOf(needle)), "the three needles are distinct").toEqual([0, 1, 2]);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells a needle", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].flatMap(name => needleSites("title", name)), "registered titles spelling a needle").toEqual([]);
  });
});
