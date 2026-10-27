/**
 * wb-x0xu.1 (HX-STRUCTURAL-INFORMATION-OPTIMIZATION-R1, program-triage-2026-10-22), the HX structural-explanation census.
 * Statement (bead notes, full form): "If an HX result Pi consumes ever carries the program's HXS explanations of accepted/rejected
 * structural assumptions, unfinished work, Unknown or budget stops (gated: SIO 03 interface boundary 6, design-only), the HX
 * adapter shall carry each verbatim as its own facet - an accepted assumption never raises coverage or statusTone, a rejected
 * assumption, unfinished-work or budget-stop marker never reads as absence or known-empty - and a result lacking them projects
 * byte-identically." It rests on "6. HXS/ledger/LX: explain accepted and rejected structural assumptions; make unfinished work,
 * Unknown and budget stops visible." (HyperUnix-CLI docs/programs/structural-information-optimization-2026-10-17/03-architecture.md:55
 * @0091719d0288). Acceptance (owner filing, verbatim; the labels of rows A to C quote it, each up to its source citation): "(a)
 * today: a test asserts those two files name no assumption/explanation field and a 'budget-exhausted' fixture projects coverage
 * 'partial', statusTone 'unknown', statusText containing 'absence not licensed' (observer.ts:217-221; observer.test.ts:234-235); (b)
 * today: an explanation-shaped unknown field reaches no output field, projection strictEqual (H5 observer.test.ts:453); (c) on
 * landing: each assumption explanation projects verbatim as its own facet with coverage, statusTone, evidenceRefs and answer text
 * unchanged, and a rejected-assumption, unfinished-work or budget-stop marker with rows [] and kind 'incomplete' is never
 * 'known-empty' nor statusTone 'success'."
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23; the producer facts ride the roster with their blob ids): at the program pin
 * the program is design-only (README.md:3 "**Status:** DESIGN ONLY; no new optimizer feature implemented, measured or
 * default-enabled by these documents."), and the SDK source there spells the vocabulary only as namesakes, in six files the roster
 * lists (the explain and explainQuery read verbs and their results-mode explanation frames, config-explain, and sourceRootAssumption
 * of the observer-inspect declaration); its sdk/typescript/src/result.ts spells no stem. Pi vendors @hyperunix/sdk 0.1.0
 * (vendor/hyperunix-sdk-0.1.0.tgz). Its dist/result.d.ts - read here from the committed tarball and held byte-identical to the
 * installed copy - spells no stem, and its QueryResult members
 * (diagnostics at :115 and budgetDimension at :124, with the ClassificationInput diagnostics at :140, as the filing cites) name no
 * explanation field. Its other declarations carry only namesakes: the explain and explainQuery read verbs and their results-mode
 * explanation frames (client.d.ts, workspace.d.ts, transport/cli.d.ts config-explain), and provider.d.ts sourceRootAssumption. The
 * decoder admits an explanation frame only on a results-mode stream (dist/protocol/decoder.js:204), and Pi's only HX read is find
 * (an observation-mode stream) whose representation (resultToJson) emits no results member. On the provider's own path
 * (resultFromJson, resultToJson, the registry's JSON) an unknown member survives inside the open containers the SDK copies whole and
 * is dropped from every record it rebuilds field by field (B2 measures which is which). src/workbench/hyperunix-observer.ts spells
 * no stem, reads no open container's content (rows only for their count, certificates only for their batch ids), and no src module
 * imports it.
 *
 * THE VOCABULARY: STEMS are read case-insensitively inside any word or identifier, so snake, camel, constant and kebab spellings
 * and plurals all match. The filing measured /assumption|explain/; that grep cannot see the word "explanation" ("expla-n" is not
 * "expla-in"), so the census adds the stem "explanat" (measured 0 in both files as well).
 *
 * THE FIXTURES: every explanation text, class spelling and carrier key is CONSTRUCTED (the program is design-only; the producer
 * mints none of them). The five classes follow 03:55 (accepted and rejected structural assumptions, unfinished work, Unknown, budget
 * stops). The armed fixtures carry the explanations in the SDK's lossless extension sidecar under the census's own key, a carrier B2
 * shows survives the provider path; every armed text is display-stable under the shared sanitizer (sanitizeWorkbenchText, label
 * layout), so verbatim and sanitized coincide on them.
 *
 * Pi reads no HXS explanation today. The census pins that, the budget reading (a) names, the withholding (b) names, and an ARMED
 * half that binds the first reader to come:
 *  A, (a). A1 the two files: the vendored result.d.ts (from the committed tarball, byte-identical to the installed copy) spells no
 *    stem (a hit there is the gating artifact arriving: re-measure), and the reader adapter's stem count is pinned at 0, a judged src
 *    file spelling a stem exactly when its reader is bound in HX_EXPLANATION_READERS (empty both ways today); QueryResult's members
 *    and the cited lines are pinned; the stem judge is read on flagged and quiet controls; and the roster's producer block is held to
 *    what this repository holds (PRODUCER below). A2 a budget-exhausted read, direct and on the provider path (class 6 with
 *    HX-BUDGET-EXHAUSTED and its dimension), under either licence and with a budget-stop explanation attached (read back from the
 *    reading: exactly that explanation, and none without it), projects coverage partial, statusTone unknown and a statusText
 *    carrying "absence not licensed", never known-empty, and the live invariant licenses no absence.
 *  B, (b). B1 an explanation-shaped member planted at EVERY object node of a full provider reading (the walk derives the positions
 *    from the SDK's own representation, no hand list, and its count is re-derived from the reading's JSON text) leaves the
 *    projection strictEqual to the reading without it and reaches no output string; a planted operation text is the control that
 *    the leak detector sees a leak. Each plant is read back at its own position and carries every explanation verbatim, each text a
 *    string of its own, and the judge reports what every judged candidate carried (each sentinel), so an empty, partial or misplaced
 *    plant, or a judge handed the unplanted reading, reds B1; the witness pins the payload's digest (wb-dvfc F1). The judge also
 *    reports the sha-256 of the reading it judged and where that reading departs from the base (planted), and B1 requires the
 *    planted reading's own sha-256 and exactly the member at its position, so a judge handed the root plant, a second plant, the
 *    base or any other reading whose JSON text differs reds B1; B2 and Q1 bind their judges by the same sha-256, the B1 and B2
 *    witnesses count the distinct judged readings and Q1's names where each judged plant departs (wb-kggj F1). B2 the same
 *    member planted at every object node of the SDK document, plus the diagnostic-grammar entries
 *    (05-physical-provider-lld.md:33 "Cost fallbacks and explainable refusal use existing diagnostic grammar."), through the
 *    registered provider: which positions survive the decoder is measured, and the projection stays strictEqual with nothing
 *    shown.
 *  C, (c), armed on landing. C1 the fixture oracle: each armed fixture is the base plus exactly its carrier member (and the kind or
 *    licence its spec names), today's adapter projects it equal to its twin, and every text is sanitizer-stable; C2 the armed check
 *    (violationsOf) on synthetic readers: the honest reader (today's projection plus one sanitized facet per explanation) passes
 *    every fixture and each mutant fails its named checks (an accepted assumption raising coverage or tone, a marker read as
 *    known-empty, success or complete, merged, deduplicated, paraphrased, truncated, dropped or re-classed facets, an added evidence
 *    reference or answer text, a facet synthesized for a result without explanations, a refusal), and every check fires for some
 *    mutant; C3 every bound reader meets C2 on every fixture (none bound today; the same loop over synthetic bindings is the
 *    non-vacuity control).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants, the fixture specs, the checks, the residual families and every registered test title - is
 * held to the out-of-file roster; the labels of rows A to C are held two ways to the acceptance clauses of the bead's own notes in
 * the tracker export (.beads/issues.jsonl: each clause, up to its source citation, is exactly one row's quote), the judged files to
 * the file names of the filing's own grep sentence, and MARKERS to the markers clause (c) spells. The last case reads the vitest
 * task tree (every registered test, in roster order, in run mode, ran before it) and the set of pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a check removed from CHECKS, the judge and the roster (the firing assertion binds
 * the listed checks only); a fixture or mutant removed while every remaining mutant still fails some fixture; a pin's case
 * replaced by one that echoes its roster witness; a producer fact with no in-repo bytes (PRODUCER) rewritten to another
 * well-formed value (the 02-vision-decisions.md:30 remainder: together with its witness); the README.md:3 quote re-extended to
 * another span of the dossier's line together with its witness.
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY an explanation field under a generic name (reason, rationale,
 * note, detail, why, justification) spells no stem and is invisible to A1's trigger, while B still withholds its content (Q1; each
 * plant is read back under its own key, each judged candidate is that planted reading and carries the planted text, and the
 * witness names where each judged plant departs from the base, exactly its own key on the source: wb-kggj F2); R-COMPOSED a stem
 * assembled at runtime from parts is invisible to any text scan (Q2; the keys are read from the probe text itself, and each spells
 * a stem whole); R-NAMESAKE the vendored declarations outside the judged pair spell the stems for the explain read verbs, their
 * explanation frames and sourceRootAssumption, and A1's trigger does not judge them (Q3; A1's PRODUCER reading only matches the
 * modules that spell a stem to the pin's namesake list);
 * R-RAW-READING the registered provider hands the surviving containers to its invoking caller verbatim - only the display
 * projection withholds them, so the echo the statement owes binds the armed half, not today's raw reading (Q4); R-INTERRUPTED a stem
 * split by a zero-width code point or spelled with a homoglyph letter is not caught (Q5; each probe carries its interruption, and
 * repaired it spells the stems); R-SCOPE the trigger reads the two files the acceptance names: the src modules that load the HX SDK
 * or provider lie outside it, and no src module imports the adapter yet (Q6).
 * PRODUCER (wb-dvfc F3): A1 holds the roster's producer block to what the repository holds: the vendored manifest's name, version
 * and git blob id (the pin's sdk/typescript/package.json blob is the committed tarball's package/package.json, byte for byte), the
 * decoder's frame-routing line, the representation's cited lines, the filing's own quotes of the program's lines (each producer
 * quote is the filing's single-quoted text at the same file:line, whole or the part the filing quotes; the boundary line whole, with
 * the program path and the pin) and the namesake modules (the pin's namesake files name exactly the vendored modules that spell a
 * stem, and result names none). THE REMAINDERS (wb-kggj F3): the filing quotes two producer quotes only in part (README.md:3 and
 * 02-vision-decisions.md:30), and what each holds beyond that part is its remainder, held to its shape (the part sits in the quote
 * exactly once and on word boundaries, and the quote is one line that ends with a period and holds no single quote) and pinned in
 * the witness. README.md:3's remainder is also held to in-repo bytes: wb-x0xu.2's dossier (DOSSIER) names the program pin, carries
 * no HTML and no fenced or indented code block (so the line read is never one hidden in a comment or a code block), and records the
 * program's README.md:3 line under the same program path (the next quote line after that path's one line); the producer quote is
 * held inside that line, and the witness pins the line's sha-256 (measured by the cutting seat equal to the line at the pin, and
 * the value the dossier's own census pins). 02-vision-decisions.md:30's remainder ('A result may be useful as ' and the closing '.')
 * has no in-repo bytes. The other producer facts - the eleven HyperUnix-CLI blob ids, the pin's namesake and result line lists
 * and the 02-vision-decisions.md:30 remainder - have no in-repo bytes: each is held to its shape and their list is pinned; the
 * cutting seat read every one at the pin (git show, read-only). The repository name, piBase and the namesakes' descriptions are
 * labels, not judged.
 * SCOPE: the stem judge does not read negation or context, so a comment that merely mentions a stem in either file reds A1
 * (OVER-READ, disclosed: neither file spells one today, and an edit that must will re-measure this census). The Unknown marker is
 * held to (c)'s never-absence check with the three markers (c) names (OVER-READ of the clause, from the statement's title, which
 * names Unknown among the explanations). The armed fixtures use one constructed carrier: a reader bound to the producer's real
 * carrier re-measures the fixtures. Hostile explanation text is not judged here; display safety stays with the shared sanitizers'
 * own pins. No HX explanation reader is added or faked: a reader's own cut binds itself in HX_EXPLANATION_READERS and meets C2.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, vendor, node_modules, .beads and wb-x0xu.2's dossier are
 * only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { gunzipSync } from "node:zlib";
import { resultFromJson } from "@hyperunix/sdk";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext,
  hxLiveInvariant,
  hyperunixTopology,
} from "../src/workbench/hyperunix-observer.js";
import type { NativeSnapshot } from "../src/workbench/observation.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";

type JsonObject = { [key: string]: JsonValue };
type Path = readonly (string | number)[];

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "hyperunix-structural-explanation-roster.json");
/** wb-x0xu.2's dossier: it names the program pin and records the program's status lines whole (PRODUCER, the README.md:3
 * remainder). */
const DOSSIER = "test/fixtures/hx-sio-design-status-dossier.md";
const BEAD = "wb-x0xu.1";
/** The program pin (HyperUnix-CLI origin/main at the 2026-10-22 triage). */
const PROGRAM_PIN = "0091719d02887910fa0c2fb6693a32723e243600";
/** The vendored SDK artifact, and the member of it that npm installs as the first judged file. */
const VENDORED_TGZ = "vendor/hyperunix-sdk-0.1.0.tgz";
const PACKED_RESULT = "package/dist/result.d.ts";
/** "those two files" of acceptance (a): the vendored result declaration and the HX reader adapter. */
const JUDGED_FILES = ["node_modules/@hyperunix/sdk/dist/result.d.ts", "src/workbench/hyperunix-observer.ts"];
/** The explanation vocabulary: the filing's two stems plus "explanat", which its grep cannot see. */
const STEMS = ["assumption", "explain", "explanat"];
/** The five HXS explanation classes of 03:55, in its order; the spellings are this census's own. */
const CLASSES = ["accepted-assumption", "rejected-assumption", "unfinished-work", "unknown", "budget-stop"] as const;
type ExplanationClass = (typeof CLASSES)[number];
/** The markers (c) holds to never-absence: the three it names, plus Unknown (the disclosed over-read). */
const MARKERS: readonly ExplanationClass[] = ["rejected-assumption", "unfinished-work", "unknown", "budget-stop"];

interface Explanation {
  readonly class: ExplanationClass;
  readonly text: string;
}
/** One constructed explanation per class; each carries a sentinel no output may show. */
const EXPLANATIONS: readonly Explanation[] = [
  { class: "accepted-assumption", text: "accepted structural assumption: src holds no symlink cycle (HXS-X1)" },
  { class: "rejected-assumption", text: "rejected structural assumption: the provider index covers every file (HXS-X2)" },
  { class: "unfinished-work", text: "unfinished work: 3 directories left unexpanded at the stop (HXS-X3)" },
  { class: "unknown", text: "Unknown: membership below src/vendor is not established (HXS-X4)" },
  { class: "budget-stop", text: "budget stop: the wall budget of 30s was reached (HXS-X5)" },
];
const SENTINEL = /HXS-X\d/g;
/** Each explanation's sentinel, in class order: what a plant must carry and no output may show. */
const SENTINELS: readonly string[] = EXPLANATIONS.flatMap(entry => entry.text.match(SENTINEL) ?? []);
/** The explanation-shaped member B plants, and the census's constructed carrier key inside the SDK's extension sidecar. */
const MEMBER = "hxs_explanations";
const CARRIER = "hx.structural-explanations";
/** The facet bound the honest reader displays within (the adapter's diagnostic bound). */
const FACET_LIMIT = 200;
/** Each spelling the stem judge must flag, and each it must leave quiet. */
const FLAGGED_CONTROLS = [
  "readonly explanations: readonly string[];",
  "structuralAssumption",
  "STRUCTURAL_ASSUMPTION",
  "structural-assumptions",
  "Explain why",
  "explainability",
  "explanatory note",
];
const QUIET_CONTROLS = ["readonly budgetDimension: string | null;", "diagnostics", "unfinished work", "Unknown", "budget stop"];
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-COMPOSED": ["Q2"],
  "R-NAMESAKE": ["Q3"],
  "R-RAW-READING": ["Q4"],
  "R-INTERRUPTED": ["Q5"],
  "R-SCOPE": ["Q6"],
};

interface FixtureSpec {
  readonly name: string;
  readonly kind: string;
  readonly licensed: boolean;
  readonly classes: readonly ExplanationClass[];
}
/** The armed fixtures: rows [] throughout (c); kind incomplete except where an accepted assumption meets a complete kind. */
const FIXTURE_SPECS: readonly FixtureSpec[] = [
  { name: "none", kind: "incomplete", licensed: false, classes: [] },
  { name: "accepted", kind: "incomplete", licensed: false, classes: ["accepted-assumption"] },
  { name: "accepted-complete-unlicensed", kind: "complete", licensed: false, classes: ["accepted-assumption"] },
  { name: "rejected", kind: "incomplete", licensed: false, classes: ["rejected-assumption"] },
  { name: "rejected-licensed", kind: "incomplete", licensed: true, classes: ["rejected-assumption"] },
  { name: "unfinished", kind: "incomplete", licensed: false, classes: ["unfinished-work"] },
  { name: "unknown", kind: "incomplete", licensed: false, classes: ["unknown"] },
  { name: "budget-stop", kind: "incomplete", licensed: false, classes: ["budget-stop"] },
  { name: "all", kind: "incomplete", licensed: false, classes: [...CLASSES] },
  { name: "repeated", kind: "incomplete", licensed: false, classes: ["rejected-assumption", "rejected-assumption"] },
];
/** The checks the armed half runs, in the order a violation list reports them. */
const CHECKS = ["refused", "byte-identical", "unchanged", "raised", "absence", "verbatim", "own-facet", "synthesized"] as const;
type Check = (typeof CHECKS)[number];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C, to the bead's acceptance clauses. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) today: a test asserts those two files name no assumption/explanation field and a 'budget-exhausted' fixture projects coverage 'partial', statusTone 'unknown', statusText containing 'absence not licensed'",
    pins: ["A1", "A2"],
  },
  { id: "B", label: "(b) today: an explanation-shaped unknown field reaches no output field, projection strictEqual", pins: ["B1", "B2"] },
  {
    id: "C",
    label:
      "(c) on landing: each assumption explanation projects verbatim as its own facet with coverage, statusTone, evidenceRefs and answer text unchanged, and a rejected-assumption, unfinished-work or budget-stop marker with rows [] and kind 'incomplete' is never 'known-empty' nor statusTone 'success'",
    pins: ["C1", "C2", "C3"],
  },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly programPin: string;
  readonly producer: JsonObject;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: unknown, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return json(value) as JsonObject;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.programPin !== "string" || !Array.isArray(raw.rows)) {
    throw new Error("roster must be an object with programPin and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    programPin: raw.programPin,
    producer: objectOf(raw.producer, "roster producer"),
    constants: objectOf(raw.constants, "roster constants"),
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  return readFileSync(path, "utf8");
}
function sha256(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}
/** The git blob id of some bytes (what git hash-object prints), so a producer blob id can be held to committed bytes. */
function gitBlobId(bytes: Buffer): string {
  return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

/** Every regular file of a gzipped tar by entry name (ustar prefix joined); directories and other entry types are skipped. */
function tarEntries(archive: Buffer): Map<string, Buffer> {
  const tar = gunzipSync(archive);
  const entries = new Map<string, Buffer>();
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (from: number, to: number): string => {
      const raw = header.subarray(from, to).toString("utf8");
      const end = raw.indexOf("\u0000");
      return end === -1 ? raw : raw.slice(0, end);
    };
    const prefix = field(345, 500);
    const name = prefix.length > 0 ? `${prefix}/${field(0, 100)}` : field(0, 100);
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const body = offset + 512;
    if (type === "" || type === "0") entries.set(name, tar.subarray(body, body + size));
    offset = body + Math.ceil(size / 512) * 512;
  }
  return entries;
}
function vendoredEntries(): Map<string, Buffer> {
  return tarEntries(readFileSync(join(REPO, VENDORED_TGZ)));
}

/** Every stem occurrence of a text, as `line:stem`, read case-insensitively inside words and identifiers. */
function stemHits(text: string): string[] {
  const hits: string[] = [];
  text.split("\n").forEach((line, index) => {
    const lower = line.toLowerCase();
    for (const stem of STEMS) {
      let at = lower.indexOf(stem);
      while (at !== -1) {
        hits.push(`${index + 1}:${stem}`);
        at = lower.indexOf(stem, at + stem.length);
      }
    }
  });
  return hits;
}
/** The 1-based line numbers of a text that carry a stem. */
function stemLines(text: string): number[] {
  return [...new Set(stemHits(text).map(hit => Number(hit.slice(0, hit.indexOf(":")))))].sort((left, right) => left - right);
}
/** The member names an interface declares, in declaration order. */
function interfaceMembers(text: string, name: string): string[] {
  const start = text.indexOf(`export interface ${name}`);
  if (start === -1) return [];
  const open = text.indexOf("{", start);
  const close = text.indexOf("\n}", open);
  return [...text.slice(open + 1, close).matchAll(/^ {4}readonly (\w+)\??:/gm)].map(match => match[1] ?? "");
}

/** Every regular .ts file below a directory (symlinks are not followed). */
function tsBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return tsBelow(path);
    return entry.isFile() && entry.name.endsWith(".ts") ? [path] : [];
  });
}
/** The module specifiers a source text loads, static and dynamic. */
function specifiersOf(text: string): string[] {
  return [...text.matchAll(/\bfrom\s+["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)].map(match => match[1] ?? match[2] ?? "");
}

function fieldOf(value: JsonValue | undefined, key: string): JsonValue | undefined {
  return isObject(value) ? (value as JsonObject)[key] : undefined;
}
const textAt = (value: JsonValue | undefined): string => (typeof value === "string" ? value : "");
const numberAt = (value: JsonValue | undefined): number => (typeof value === "number" ? value : 0);
/** The module a source or dist path names: sdk/typescript/src/protocol/decoder.ts and package/dist/protocol/decoder.js both name
 * protocol/decoder. */
function moduleOf(path: string): string {
  return path.replace(/^(sdk\/typescript\/src|package\/dist)\//, "").replace(/(\.d)?\.(ts|js)$/, "");
}
/** The filing: the bead's notes up to its "Not P0:" sentence, before any delivery or verdict note was appended. */
function filingOf(notes: string): string {
  const end = notes.indexOf(" Not P0:");
  return end === -1 ? "" : notes.slice(0, end);
}
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** The single-quoted texts the filing gives at a producer line: right after the citation file:line, or right before it. */
function filingQuotes(filing: string, file: string, line: number): string[] {
  const cite = escaped(`${file}:${line}`);
  return [
    ...filing.matchAll(new RegExp(`(?:^|[\\s/])${cite} '([^']+)'`, "g")),
    ...filing.matchAll(new RegExp(`'([^']+)' (?:\\S*/)?${cite}(?![0-9])`, "g")),
  ].map(match => match[1] ?? "");
}
/** The parts of a producer quote the filing quotes at its line: 24 or more of its characters, in one piece, longest first. */
function filingParts(filing: string, file: string, line: number, quote: string): string[] {
  return filingQuotes(filing, file, line)
    .filter(part => part.length >= 24 && quote.includes(part))
    .sort((left, right) => right.length - left.length);
}
/** How the filing quotes a producer line: "exact" (the producer's quote whole), "part" (24 or more of its characters, in one piece)
 * or "absent"; only a single-quoted text right after the citation file:line, or right before it, is read. */
function filingQuote(filing: string, file: string, line: number, quote: string): string {
  if (quote.length > 0 && filingQuotes(filing, file, line).includes(quote)) return "exact";
  return filingParts(filing, file, line, quote).length > 0 ? "part" : "absent";
}
/** What a producer quote holds beyond the part the filing quotes: the text before and after that part, when the part sits in it
 * exactly once (wb-kggj F3). */
function remainderOf(quote: string, part: string): { readonly prefix: string; readonly suffix: string } | undefined {
  const at = quote.indexOf(part);
  if (part.length === 0 || at === -1 || quote.indexOf(part, at + 1) !== -1) return undefined;
  return { prefix: quote.slice(0, at), suffix: quote.slice(at + part.length) };
}
/** A remainder's shape (wb-kggj F3): the quote is one sentence on one line that ends with a period and holds no single quote, and
 * the filing's part sits in it on word boundaries. */
function remainderShaped(quote: string, prefix: string, suffix: string): boolean {
  return !/[\n']/.test(quote) && quote.endsWith(".") && (prefix === "" || prefix.endsWith(" ")) && (suffix === "" || !/^[\p{L}\p{N}]/u.test(suffix));
}
/** The program line the dossier records for a citation: the "> " line right after the one line that reads `<program>/<cite>`;
 * undefined when no single such line is followed by a quote line. */
function dossierLine(dossier: string, program: string, cite: string): string | undefined {
  const lines = dossier.split("\n");
  const at = lines.flatMap((line, index) => (line === `${program}/${cite}` ? [index] : []));
  if (at.length !== 1) return undefined;
  const next = lines.slice((at[0] ?? 0) + 1).find(line => line.trim() !== "");
  return next?.startsWith("> ") === true ? next.slice(2) : undefined;
}
/** Every producer field holding a blob id or a line list, by path, and whether its shape holds (40 hex digits; ascending positive
 * integers). */
function shapedFacts(value: JsonValue, path: Path = []): { readonly path: string; readonly shaped: boolean }[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => shapedFacts(item, [...path, index]));
  if (!isObject(value)) return [];
  return Object.entries(value as JsonObject).flatMap(([key, item]) => {
    const at = [...path, key];
    if (key === "blob") return [{ path: pathText(at), shaped: typeof item === "string" && /^[0-9a-f]{40}$/.test(item) }];
    if (key === "lines" || key === "stemLines") {
      const shaped =
        Array.isArray(item) &&
        item.every((entry, index, all) => typeof entry === "number" && Number.isInteger(entry) && entry > 0 && (index === 0 || entry > Number(all[index - 1])));
      return [{ path: pathText(at), shaped }];
    }
    return shapedFacts(item, at);
  });
}
interface ProducerReading {
  readonly manifest: JsonObject;
  readonly frameRouting: JsonObject;
  readonly representation: JsonObject;
  readonly filing: Readonly<Record<string, string>>;
  readonly remainders: JsonObject;
  readonly namesakeModules: readonly string[];
  readonly outOfRepo: readonly string[];
  readonly refused: readonly string[];
}
/** The producer facts whose bytes this repository holds: the vendored manifest's blob (the pin's package.json, byte for byte). */
const ANCHORED_FACTS: readonly string[] = ["$.sdkAtPin.package.blob"];
/** The roster's producer block held to what this repository holds (wb-dvfc F3; PRODUCER in the header): each failed hold is named in
 * refused; the facts with no in-repo bytes are held to their shape and listed, and so is each remainder of a quote the filing
 * quotes in part that the dossier does not record (wb-kggj F3). */
function producerReading(producer: JsonObject, entries: ReadonlyMap<string, Buffer>, notes: string, dossier: string): ProducerReading {
  const refused: string[] = [];
  const hold = (ok: boolean, what: string): void => {
    if (!ok) refused.push(what);
  };
  const linesOf = (name: string): string[] => (entries.get(name) ?? Buffer.alloc(0)).toString("utf8").split("\n");
  const vendored = fieldOf(producer, "vendored");
  const sdk = fieldOf(producer, "sdkAtPin");
  const manifestBytes = entries.get("package/package.json") ?? Buffer.alloc(0);
  const parsed: unknown = manifestBytes.length > 0 ? JSON.parse(manifestBytes.toString("utf8")) : null;
  const manifest = {
    name: isObject(parsed) && typeof parsed.name === "string" ? parsed.name : "",
    version: isObject(parsed) && typeof parsed.version === "string" ? parsed.version : "",
    blob: gitBlobId(manifestBytes),
  };
  hold(textAt(fieldOf(vendored, "tarball")) === VENDORED_TGZ, "vendored.tarball is the committed tarball");
  hold(isDeepStrictEqual(fieldOf(vendored, "package"), { name: manifest.name, version: manifest.version }), "vendored.package is the tarball's manifest");
  const pinPackage = fieldOf(sdk, "package");
  hold(
    textAt(fieldOf(pinPackage, "name")) === manifest.name && textAt(fieldOf(pinPackage, "version")) === manifest.version,
    "sdkAtPin.package names the vendored name and version",
  );
  hold(textAt(fieldOf(pinPackage, "blob")) === manifest.blob, "sdkAtPin.package.blob is the git blob id of the tarball's manifest");
  const routing = fieldOf(vendored, "frameRouting");
  const routingFile = textAt(fieldOf(routing, "file"));
  const routingLine = numberAt(fieldOf(routing, "line"));
  const routingText = textAt(fieldOf(routing, "text"));
  hold(routingText.length > 0 && routingLine > 0 && (linesOf(routingFile)[routingLine - 1] ?? "").includes(routingText), "vendored.frameRouting is the decoder's line");
  const cited = /^(package\/dist\/\S+) resultToJson \(:(\d+)-(\d+)\) .*ReadResult\.results \((\S+):(\d+)\)/.exec(textAt(fieldOf(vendored, "representation")));
  const [, representationFile = "", startText = "0", endText = "0", resultsFile = "", resultsText = "0"] = cited ?? [];
  const [start, end, resultsLine] = [Number(startText), Number(endText), Number(resultsText)];
  const representationLines = linesOf(representationFile);
  const closes = representationLines.findIndex((line, index) => index >= start && line === "}") + 1;
  hold(
    cited !== null && (representationLines[start - 1] ?? "").includes("function resultToJson(") && start < end && end <= closes,
    "vendored.representation cites resultToJson's lines",
  );
  const declaration = linesOf(`package/dist/${resultsFile}`).slice(0, resultsLine);
  const owner = [...declaration].reverse().find(line => line.startsWith("export interface ")) ?? "";
  hold(
    resultsLine > 0 && /^\s+readonly results:/.test(declaration[resultsLine - 1] ?? "") && owner.startsWith("export interface ReadResult"),
    "vendored.representation cites ReadResult.results",
  );
  const filing = filingOf(notes);
  const quotes: Record<string, string> = {};
  const parted: { readonly cite: string; readonly at: string; readonly quote: string; readonly part: string }[] = [];
  const quoted = (entry: JsonValue | undefined, key: string, at: string): void => {
    const file = textAt(fieldOf(entry, "file"));
    const line = numberAt(fieldOf(entry, "line"));
    const quote = textAt(fieldOf(entry, key));
    const how = filingQuote(filing, file, line, quote);
    quotes[`${file}:${line}`] = how;
    hold(how !== "absent", `the filing quotes ${file}:${line} as the producer does`);
    const [part] = filingParts(filing, file, line, quote);
    if (how === "part" && part !== undefined) parted.push({ cite: `${file}:${line}`, at: `${at}.${key}`, quote, part });
  };
  const boundary = fieldOf(producer, "boundary");
  const boundaryCite = `${textAt(fieldOf(boundary, "file"))}:${numberAt(fieldOf(boundary, "line"))}`;
  quoted(boundary, "text", "$.boundary");
  quoted(fieldOf(producer, "status"), "quote", "$.status");
  const authority = fieldOf(producer, "authority");
  for (const [index, entry] of (Array.isArray(authority) ? authority : []).entries()) quoted(entry, "quote", `$.authority[${index}]`);
  hold(
    quotes[boundaryCite] === "exact" && filing.includes(`${textAt(fieldOf(producer, "program"))}/${boundaryCite}@${PROGRAM_PIN.slice(0, 12)}`),
    "the filing quotes the boundary line whole, cited with the program path and the pin",
  );
  const program = textAt(fieldOf(producer, "program"));
  hold(dossier.includes(PROGRAM_PIN), "the dossier names the program pin");
  hold(!/<|^ {0,3}(?:```|~~~)|^(?: {4}|\t)/m.test(dossier), "the dossier carries no HTML and no fenced or indented code block, so no read line hides in one");
  const remainders: JsonObject = {};
  const unanchored: string[] = [];
  for (const { cite, at, quote, part } of parted) {
    const rest = remainderOf(quote, part);
    hold(rest !== undefined && remainderShaped(quote, rest.prefix, rest.suffix), `${at}'s remainder beyond the filing's part is well-formed`);
    const recorded = dossierLine(dossier, program, cite);
    if (recorded === undefined) unanchored.push(at);
    else hold(recorded.includes(quote), `${at} is held inside the program line the dossier records for ${cite}`);
    remainders[cite] = { prefix: rest?.prefix ?? "", suffix: rest?.suffix ?? "", anchor: recorded === undefined ? null : { file: DOSSIER, sha256: sha256(recorded) } };
  }
  const spelling = [...entries]
    .filter(([name, bytes]) => /^package\/dist\/.+\.(d\.ts|js)$/.test(name) && stemLines(bytes.toString("utf8")).length > 0)
    .map(([name]) => moduleOf(name));
  const namesakeModules = [...new Set(spelling)].sort();
  const namesakes = fieldOf(sdk, "namesakes");
  const pinModules = (Array.isArray(namesakes) ? namesakes : []).map(entry => moduleOf(textAt(fieldOf(entry, "file")))).sort();
  hold(isDeepStrictEqual(pinModules, namesakeModules), "the pin's namesake files name exactly the vendored modules that spell a stem");
  const result = fieldOf(sdk, "result");
  const resultLines = fieldOf(result, "stemLines");
  hold(
    !namesakeModules.includes(moduleOf(textAt(fieldOf(result, "file")))) && Array.isArray(resultLines) && resultLines.length === 0,
    "sdkAtPin.result names a module that spells no stem",
  );
  const facts = shapedFacts(producer);
  for (const fact of facts) hold(fact.shaped, `${fact.path} is well-formed`);
  for (const path of ANCHORED_FACTS) hold(facts.some(fact => fact.path === path), `${path} is a producer fact`);
  return {
    manifest,
    frameRouting: { file: routingFile, line: routingLine },
    representation: { resultToJson: [start, closes], cited: [start, end], results: `${resultsFile}:${resultsLine}` },
    filing: quotes,
    remainders,
    namesakeModules,
    outOfRepo: [...facts.map(fact => fact.path).filter(path => !ANCHORED_FACTS.includes(path)), ...unanchored],
    refused,
  };
}

const WS = "/srv/pi-hx-census-ws";
/** The runtime identity the measured live read of this workspace reported (test/workbench-hyperunix-observer.test.ts:21). */
const BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-23T12:00:00Z",
  observedAt: "2026-10-23T12:00:01Z",
};

/** A full SDK representation of one find, shaped like the measured live read (one certificate, region, diagnostic and cost each),
 * with the given top-level members replaced. */
function sdkDocument(overrides: JsonObject = {}): JsonObject {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [
      {
        mode: "opportunistic",
        cause: { cause: "other", detail: "No_change_exclusion" },
        scope: { path: [], scope: "fs-subtree" },
        target: { target: "relation-expansion" },
        provider: "hx.fs/builtin",
        stream: "hx-fs",
        batch_id: "b1",
        body: { mode: "opportunistic" },
      },
    ],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 12, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 12 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [
      {
        code: "HX-COVERAGE-INCOMPLETE",
        severity: "warning",
        message: "licenses no absence",
        details: { region: "fs:src" },
        remediation: null,
        request: null,
        origin: "hxs",
        stream: "hx-fs",
        extra: { note: "census" },
      },
    ],
    view: null,
    cost: { provider_calls: 1 },
    transport: {
      started_at: "2026-10-23T11:59:59.000Z",
      startup_latency_s: 0.01,
      process_duration_s: 0.2,
      stdout_bytes: 1000,
      stderr_bytes: 0,
      stderr_bytes_retained: 0,
      frames: 12,
    },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: ["opportunistic"],
      completeness: "incomplete",
      licenses_absence: false,
      certificates_license_absence: false,
      incomplete_regions: [{ scope: "fs:src", target: "hx.fs/directory-entry" }],
      result_coverage: { count: 0 },
      answer_count: null,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: { "hx.fs": "0.1.0" } },
    digest: null,
    digest_source: "absent",
    local_digest: null,
    structural_digest: null,
    execution_id: null,
    budget_dimension: null,
    extensions: {},
    ...overrides,
  };
}
/** One row, so B's walk reaches a row object. */
const ONE_ROW: JsonObject = { rows: [{ path: "src/index.ts" }] };

/** What registry.invoke returns for a native result through registerHyperUnixFind (the provider's own path). */
async function invoked(document: JsonObject): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(
    registry,
    { find: async () => native, runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }), close: async () => {} },
    WS,
  );
  return registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal });
}

/** The object nodes of a JSON value counted from its JSON text (each object serializes exactly one opening brace outside strings):
 * an anchor for the walk below that shares no code with it. */
function bracesOf(value: JsonValue): number {
  const text = JSON.stringify(value);
  let count = 0;
  let inString = false;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (inString) {
      if (char === "\\") index++;
      else if (char === '"') inString = false;
    } else if (char === '"') inString = true;
    else if (char === "{") count++;
  }
  return count;
}
/** Every object node of a JSON value, as a path from its root, in document order. */
function objectPaths(value: JsonValue, path: Path = []): Path[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => objectPaths(item, [...path, index]));
  if (value !== null && typeof value === "object") {
    return [path, ...Object.entries(value).flatMap(([key, item]) => objectPaths(item, [...path, key]))];
  }
  return [];
}
/** A JSONPath-like spelling: identifier keys dotted, any other key bracketed and quoted, indexes bracketed. */
function pathText(path: Path): string {
  const step = (part: string | number): string =>
    typeof part === "number" ? `[${part}]` : /^[A-Za-z_][A-Za-z0-9_]*$/.test(part) ? `.${part}` : `[${JSON.stringify(part)}]`;
  return `$${path.map(step).join("")}`;
}
function nodeAt(value: JsonValue, path: Path): JsonValue | undefined {
  let node: JsonValue | undefined = value;
  for (const step of path) {
    if (Array.isArray(node) && typeof step === "number") node = node[step];
    else if (isObject(node) && typeof step === "string") node = (node as JsonObject)[step];
    else return undefined;
  }
  return node;
}
/** A copy of the value with `member` set to `content` on the object at the path. */
function planted(value: JsonValue, path: Path, member: string, content: JsonValue): JsonValue {
  const copy = json(value);
  const node = nodeAt(copy, path);
  if (!isObject(node)) throw new Error(`no object at ${pathText(path)}`);
  (node as JsonObject)[member] = json(content);
  return copy;
}
/** The explanation-shaped content B plants: every class, verbatim. */
function shapedContent(): JsonValue {
  return EXPLANATIONS.map(entry => ({ class: entry.class, text: entry.text }));
}
/** The JSON text of `member` on the object at the path, read back from the value; empty when the object or the member is absent. */
function memberText(value: JsonValue, path: Path, member: string): string {
  const node = nodeAt(value, path);
  return isObject(node) && Object.hasOwn(node, member) ? JSON.stringify(node[member]) : "";
}
/** The classes whose text a planted payload's JSON lacks as a string of its own: a full plant lacks none (wb-dvfc F1). */
function payloadGaps(payload: string): string[] {
  return EXPLANATIONS.filter(entry => !payload.includes(JSON.stringify(entry.text))).map(entry => entry.class);
}
/** Every sentinel and stem an output shows. */
function leaksOf(output: unknown): string[] {
  const text = JSON.stringify(output);
  return [...new Set([...(text.match(SENTINEL) ?? []), ...stemHits(text).map(hit => hit.slice(hit.indexOf(":") + 1))])].sort();
}

/** Today's projection and live verdict of one reading. */
function reading(value: JsonValue): { topology: HyperUnixProjectionTopology; verdict: JsonValue } {
  return { topology: hyperunixTopology(value, CONTEXT), verdict: json(hxLiveInvariant(value)) };
}
interface Plant {
  readonly unchanged: boolean;
  readonly leaked: readonly string[];
  /** Every sentinel and stem the judged candidate itself carries: the plant as the judge saw it (wb-dvfc F1). */
  readonly carried: readonly string[];
  /** The sha-256 of the judged candidate's JSON text: which reading the judge saw, held to the planted reading's own (wb-kggj F1). */
  readonly judged: string;
  /** Where the judged candidate departs from the reading it is judged against (differences): where the judge saw the plant. */
  readonly planted: readonly string[];
}
/** What a witness pins of a plant: where it departs and its outcome, never the digest of the reading. */
interface Shown {
  readonly planted: readonly string[];
  readonly unchanged: boolean;
  readonly leaked: readonly string[];
  readonly carried: readonly string[];
}
/** The sha-256 of a reading's JSON text. */
function digestOf(value: JsonValue): string {
  return sha256(JSON.stringify(value));
}
function shown(plant: Plant): Shown {
  return { planted: plant.planted, unchanged: plant.unchanged, leaked: plant.leaked, carried: plant.carried };
}
function judgePlant(base: JsonValue, candidate: JsonValue): Plant {
  const before = reading(base);
  const after = reading(candidate);
  const unchanged =
    isDeepStrictEqual(after.topology, before.topology) &&
    JSON.stringify(after.topology) === JSON.stringify(before.topology) &&
    isDeepStrictEqual(after.verdict, before.verdict);
  return { unchanged, leaked: leaksOf(after.topology), carried: leaksOf(candidate), judged: digestOf(candidate), planted: differences(base, candidate) };
}

interface Facet {
  readonly class: string;
  readonly text: string;
}
interface ExplainedProjection {
  readonly topology: HyperUnixProjectionTopology;
  readonly facets: readonly Facet[];
}
type ExplanationReader = (value: JsonValue, context: HyperUnixTopologyContext) => ExplainedProjection;
/** The armed half: each src module that reads an HXS explanation, bound to a call of its reader on one provider reading. A
 * reader's own cut adds its row here and meets C2 on every fixture; the table stays empty while no judged src file spells a stem
 * (A1 holds both directions). */
const HX_EXPLANATION_READERS: Readonly<Record<string, ExplanationReader>> = {};

function isClass(value: unknown): value is ExplanationClass {
  return typeof value === "string" && (CLASSES as readonly string[]).includes(value);
}
/** The explanations the constructed carrier holds: source.extensions[CARRIER], a list of {class, text}. */
function carriedBy(value: JsonValue): Explanation[] {
  const source = isObject(value) ? value.source : undefined;
  const extensions = isObject(source) ? source.extensions : undefined;
  const list = isObject(extensions) ? extensions[CARRIER] : undefined;
  if (!Array.isArray(list)) return [];
  return list.flatMap(item => (isObject(item) && isClass(item.class) && typeof item.text === "string" ? [{ class: item.class, text: item.text }] : []));
}
/** The honest reader: today's projection unchanged, plus one facet per carried explanation, its text through the shared sanitizer. */
const honest: ExplanationReader = (value, context) => ({
  topology: hyperunixTopology(value, context),
  facets: carriedBy(value).map(entry => ({ class: entry.class, text: sanitizeWorkbenchText(entry.text, FACET_LIMIT, "label") })),
});
function patched(topology: HyperUnixProjectionTopology, patch: (snapshot: NativeSnapshot) => NativeSnapshot): HyperUnixProjectionTopology {
  const copy = JSON.parse(JSON.stringify(topology)) as HyperUnixProjectionTopology;
  return { ...copy, snapshots: copy.snapshots.map(patch) };
}
function withTopology(out: ExplainedProjection, when: boolean, patch: (snapshot: NativeSnapshot) => NativeSnapshot): ExplainedProjection {
  return when ? { ...out, topology: patched(out.topology, patch) } : out;
}
function withFacets(out: ExplainedProjection, facets: readonly Facet[]): ExplainedProjection {
  return { ...out, facets };
}
const has = (out: ExplainedProjection, kind: ExplanationClass): boolean => out.facets.some(facet => facet.class === kind);
/** The synthetic readers that exercise the armed check; each mutant differs from the honest reader in one way. */
const READERS: Readonly<Record<string, ExplanationReader>> = {
  honest,
  raiseOnAccepted: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "accepted-assumption"), snapshot => ({
      ...snapshot,
      coverage: "complete",
      node: { ...snapshot.node, statusTone: "success" },
    }));
  },
  knownEmptyOnMarker: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.some(facet => isClass(facet.class) && MARKERS.includes(facet.class)), snapshot => ({
      ...snapshot,
      node: { ...snapshot.node, statusText: "known-empty (runtime-licensed) · rows 0" },
    }));
  },
  successOnBudgetStop: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "budget-stop"), snapshot => ({ ...snapshot, node: { ...snapshot.node, statusTone: "success" } }));
  },
  completeOnUnfinished: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "unfinished-work"), snapshot => ({ ...snapshot, coverage: "complete" }));
  },
  mergeFacets: (value, context) => {
    const out = honest(value, context);
    const [first] = out.facets;
    return first === undefined || out.facets.length < 2
      ? out
      : withFacets(out, [{ class: first.class, text: out.facets.map(facet => facet.text).join("; ") }]);
  },
  dedupeFacets: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.filter((facet, index, all) => all.findIndex(other => other.text === facet.text) === index),
    );
  },
  paraphrase: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, text: `HX explanation: ${facet.text}` })),
    );
  },
  truncate: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, text: facet.text.slice(0, 24) })),
    );
  },
  dropRejected: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.filter(facet => facet.class !== "rejected-assumption"),
    );
  },
  reclassRejected: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => (facet.class === "rejected-assumption" ? { ...facet, class: "accepted-assumption" } : facet)),
    );
  },
  evidenceRef: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.length > 0, snapshot => ({
      ...snapshot,
      evidenceRefs: [...(snapshot.evidenceRefs ?? []), ...out.facets.map((_, index) => `hx-explanation:${index + 1}`)],
    }));
  },
  answerText: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.length > 0, snapshot => ({
      ...snapshot,
      node: { ...snapshot.node, statusText: `${snapshot.node.statusText} · ${out.facets.length} explanations` },
    }));
  },
  facetForNone: (value, context) => {
    const out = honest(value, context);
    return out.facets.length > 0 ? out : withFacets(out, [{ class: "unknown", text: "no structural explanations" }]);
  },
  refuseExplained: (value, context) => {
    if (carriedBy(value).length > 0) throw new Error("explanations are not read");
    return honest(value, context);
  },
};
function readerOf(name: string): ExplanationReader {
  const read = READERS[name];
  if (read === undefined) throw new Error(`no synthetic reader ${name}`);
  return read;
}

interface ArmedFixture {
  readonly name: string;
  readonly document: JsonObject;
  readonly reading: JsonValue;
  readonly twin: JsonValue;
  readonly explanations: readonly Explanation[];
}
function explanationOf(kind: ExplanationClass): Explanation {
  const found = EXPLANATIONS.find(entry => entry.class === kind);
  if (found === undefined) throw new Error(`no explanation of class ${kind}`);
  return found;
}
/** The base document of a spec: rows [], the spec's kind and licence. */
function specDocument(spec: FixtureSpec): JsonObject {
  const base = sdkDocument();
  return sdkDocument({
    execution_status: { kind: spec.kind, diagnostic_code: null },
    coverage_summary: { ...(base.coverage_summary as JsonObject), licenses_absence: spec.licensed },
  });
}
let armedCache: Promise<ArmedFixture[]> | undefined;
async function buildArmed(): Promise<ArmedFixture[]> {
  const built: ArmedFixture[] = [];
  for (const spec of FIXTURE_SPECS) {
    const explanations = spec.classes.map(explanationOf);
    const twinDocument = specDocument(spec);
    const document =
      explanations.length === 0
        ? twinDocument
        : sdkDocument({
            ...twinDocument,
            extensions: { [CARRIER]: explanations.map(entry => ({ class: entry.class, text: entry.text })) },
          });
    built.push({ name: spec.name, document, reading: await invoked(document), twin: await invoked(twinDocument), explanations });
  }
  return built;
}
function armedFixtures(): Promise<ArmedFixture[]> {
  armedCache ??= buildArmed();
  return armedCache;
}

const COVERAGE_RANK: Readonly<Record<string, number>> = { unknown: 0, partial: 1, complete: 2 };
const TONE_RANK: Readonly<Record<string, number>> = { failure: 0, unknown: 1, waiting: 1, active: 1, success: 2 };
const facetKey = (facet: Facet): string => JSON.stringify([facet.class, facet.text]);
/** The armed check: what one reader shows for one fixture, judged against today's projection of the fixture's twin. */
function violationsOf(read: ExplanationReader, fixture: ArmedFixture): Check[] {
  const twin = hyperunixTopology(fixture.twin, CONTEXT);
  let out: ExplainedProjection;
  try {
    out = read(fixture.reading, CONTEXT);
  } catch {
    return ["refused"];
  }
  const failed = new Set<Check>();
  const [shown] = out.topology.snapshots;
  const [base] = twin.snapshots;
  if (shown === undefined || base === undefined) return ["unchanged"];
  if (fixture.explanations.length === 0 && (JSON.stringify(out.topology) !== JSON.stringify(twin) || out.facets.length > 0)) {
    failed.add("byte-identical");
  }
  const same =
    shown.coverage === base.coverage &&
    shown.node.statusTone === base.node.statusTone &&
    shown.node.statusText === base.node.statusText &&
    JSON.stringify(shown.evidenceRefs ?? []) === JSON.stringify(base.evidenceRefs ?? []);
  if (!same) failed.add("unchanged");
  const raised =
    (COVERAGE_RANK[shown.coverage ?? "unknown"] ?? 0) > (COVERAGE_RANK[base.coverage ?? "unknown"] ?? 0) ||
    (TONE_RANK[shown.node.statusTone] ?? 0) > (TONE_RANK[base.node.statusTone] ?? 0);
  if (fixture.explanations.some(entry => entry.class === "accepted-assumption") && raised) failed.add("raised");
  const absent = shown.node.statusText.includes("known-empty") || shown.node.statusTone === "success" || shown.coverage === "complete";
  if (fixture.explanations.some(entry => MARKERS.includes(entry.class)) && absent) failed.add("absence");
  const want = fixture.explanations.map(facetKey);
  const got = out.facets.map(facetKey);
  if (!want.every(key => got.includes(key))) failed.add("verbatim");
  if (got.length !== want.length) failed.add("own-facet");
  if (got.some(key => !want.includes(key))) failed.add("synthesized");
  return CHECKS.filter(check => failed.has(check));
}
/** Each fixture a reader fails, with the checks it fails; an empty object when it fails none. */
async function matrixOf(read: ExplanationReader): Promise<Record<string, Check[]>> {
  const matrix: Record<string, Check[]> = {};
  for (const fixture of await armedFixtures()) {
    const checks = violationsOf(read, fixture);
    if (checks.length > 0) matrix[fixture.name] = checks;
  }
  return matrix;
}
async function bindingViolations(bindings: Readonly<Record<string, ExplanationReader>>): Promise<Record<string, Record<string, Check[]>>> {
  const found: Record<string, Record<string, Check[]>> = {};
  for (const [module, read] of Object.entries(bindings)) {
    const matrix = await matrixOf(read);
    if (Object.keys(matrix).length > 0) found[module] = matrix;
  }
  return found;
}

/** The leaf paths where two JSON values differ (a whole member when one side lacks it). */
function differences(left: JsonValue | undefined, right: JsonValue | undefined, path: Path = []): string[] {
  if (isDeepStrictEqual(left, right)) return [];
  if (Array.isArray(left) && Array.isArray(right) && left.length === right.length) {
    return left.flatMap((item, index) => differences(item, right[index], [...path, index]));
  }
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
    return keys.flatMap(key => differences((left as JsonObject)[key], (right as JsonObject)[key], [...path, key]));
  }
  return [pathText(path)];
}

/** The bead's own notes in the tracker export. */
function beadNotes(): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The acceptance clauses of the notes, by letter, each without its trailing source citation. */
function acceptanceClauses(notes: string): Record<string, string> {
  const start = notes.indexOf("Acceptance: ");
  if (start === -1) return {};
  const end = notes.indexOf(" Not P0:", start);
  const body = notes.slice(start + "Acceptance: ".length, end === -1 ? undefined : end);
  const clauses: Record<string, string> = {};
  for (const match of body.matchAll(/\(([a-z])\) (.*?)(?=; \([a-z]\) |\.$)/gs)) {
    const letter = match[1] ?? "";
    clauses[letter] = (match[2] ?? "").replace(/\s*\([^()]*:\d[^()]*\)$/, "");
  }
  return clauses;
}
/** A row label without its leading clause tag, and the tag's letter. */
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}
function letterOf(label: string): string {
  return /^\(([a-z])\) /.exec(label)?.[1] ?? "";
}
/** The two file names of the filing's own grep sentence ("grep /.../ over X and Y = 0"). */
function filingGrepFiles(notes: string): string[] {
  const match = /grep \/[^/]+\/ over (\S+) and (\S+) = 0/.exec(notes);
  return match === null ? [] : [match[1] ?? "", match[2] ?? ""];
}
const basename = (path: string): string => path.slice(path.lastIndexOf("/") + 1);

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const entries = vendoredEntries();
    const packed = entries.get(PACKED_RESULT);
    expect(packed, `${VENDORED_TGZ} packs ${PACKED_RESULT}`).toBeDefined();
    const installed = readFileSync(join(REPO, JUDGED_FILES[0] ?? ""));
    expect(sha256(installed), "the installed result.d.ts is the vendored tarball's bytes").toBe(sha256(packed ?? ""));
    const files = JUDGED_FILES.map(path => {
      const text = path.startsWith("node_modules/") ? (packed ?? Buffer.alloc(0)).toString("utf8") : textOf(join(REPO, path));
      return { path, lines: text.split("\n").length, hits: stemHits(text) };
    });
    for (const file of files) expect(file.lines, `${file.path} was read`).toBeGreaterThan(100);
    const sdkHits = files.filter(file => !file.path.startsWith("src/")).flatMap(file => file.hits);
    expect(sdkHits, "the vendored result declaration spells no explanation stem (a hit is the gating artifact: re-measure)").toStrictEqual([]);
    const declaration = (packed ?? Buffer.alloc(0)).toString("utf8");
    const members = interfaceMembers(declaration, "QueryResult");
    expect(members.length, "QueryResult members were read").toBeGreaterThan(10);
    expect(members.filter(member => stemHits(member).length > 0), "no QueryResult member is an explanation field").toStrictEqual([]);
    const lines = declaration.split("\n");
    const cited = Object.fromEntries([115, 124, 140].map(line => [String(line), (lines[line - 1] ?? "").trim()]));
    const flagged = FLAGGED_CONTROLS.filter(control => stemHits(control).length === 0);
    const quiet = QUIET_CONTROLS.filter(control => stemHits(control).length > 0);
    expect(flagged, "every flagged control trips the stem judge").toStrictEqual([]);
    expect(quiet, "every quiet control stays quiet").toStrictEqual([]);
    const spelling = files.filter(file => file.path.startsWith("src/") && file.hits.length > 0).map(file => file.path);
    const bound = Object.keys(HX_EXPLANATION_READERS).sort();
    expect(bound, "a judged src file that spells a stem binds its reader in HX_EXPLANATION_READERS, both ways").toStrictEqual(spelling.sort());
    const producer = producerReading(ROSTER.producer, entries, beadNotes(), textOf(join(REPO, DOSSIER)));
    expect(producer.refused, "the roster's producer block holds to the committed bytes and to the filing's own quotes").toStrictEqual([]);
    return {
      tarball: sha256(readFileSync(join(REPO, VENDORED_TGZ))),
      resultDeclaration: sha256(installed),
      files: files.map(file => ({ path: file.path, hits: file.hits.length })),
      queryResultMembers: members,
      citedLines: cited,
      controls: { flagged: FLAGGED_CONTROLS.length, quiet: QUIET_CONTROLS.length },
      bound,
      producer: json(producer),
    };
  },
  A2: async () => {
    const table: JsonValue[] = [];
    const record = (path: string, licensed: boolean, marker: boolean, value: JsonValue): void => {
      const { topology, verdict } = reading(value);
      const [snapshot] = topology.snapshots;
      expect(snapshot, `${path} projects one snapshot`).toBeDefined();
      if (snapshot === undefined) return;
      expect(snapshot.coverage, `${path} coverage`).toBe("partial");
      expect(snapshot.node.statusTone, `${path} statusTone`).toBe("unknown");
      expect(snapshot.node.statusText, `${path} statusText`).toContain("absence not licensed");
      expect(snapshot.node.statusText, `${path} is never known-empty`).not.toContain("known-empty");
      expect(isObject(verdict) && verdict.absenceLicensed, `${path} live verdict`).toBe(false);
      table.push([path, licensed, marker, snapshot.coverage ?? null, snapshot.node.statusTone, snapshot.node.statusText]);
    };
    for (const licensed of [false, true]) {
      record("direct", licensed, false, {
        contract: "hyperunix.find/v1",
        source: {
          representation: "hyperunix.result/1",
          execution_status: { kind: "budget-exhausted" },
          coverage_summary: { licenses_absence: licensed },
          rows: [],
          rows_retained: true,
          operation: "find",
        },
        workspaceRoot: WS,
        runtime: { version: "0.1.0", binarySha256: BINARY },
      });
    }
    const exhausted = (licensed: boolean, marker: boolean): JsonObject => {
      const base = sdkDocument();
      return sdkDocument({
        status: { ...(base.status as JsonObject), exit_code: 6 },
        execution_status: { kind: "budget-exhausted", diagnostic_code: "HX-BUDGET-EXHAUSTED", dimension: "wall" },
        diagnostics: [
          {
            code: "HX-BUDGET-EXHAUSTED",
            severity: "error",
            message: "the wall budget was exhausted",
            details: { dimension: "wall" },
            remediation: null,
            request: null,
            origin: "hxs",
            stream: "hx-fs",
            extra: {},
          },
        ],
        terminal: "budget_exhausted",
        budget_dimension: "wall",
        coverage_summary: { ...(base.coverage_summary as JsonObject), licenses_absence: licensed },
        ...(marker ? { extensions: { [CARRIER]: [{ class: "budget-stop", text: explanationOf("budget-stop").text }] } } : {}),
      });
    };
    let carried: JsonValue = null;
    const attached: JsonValue[] = [];
    for (const licensed of [false, true]) {
      for (const marker of [false, true]) {
        const value = await invoked(exhausted(licensed, marker));
        const source = isObject(value) && isObject(value.source) ? value.source : {};
        carried = json({ executionStatus: source.execution_status, budgetDimension: source.budget_dimension, terminal: source.terminal });
        const explained = carriedBy(value);
        expect(explained, `provider licensed=${licensed} marker=${marker}: the reading carries exactly the attached explanation`).toStrictEqual(
          marker ? [explanationOf("budget-stop")] : [],
        );
        attached.push(json([licensed, marker, explained]));
        record("provider", licensed, marker, value);
      }
    }
    return { table, carried, attached };
  },
  B1: async () => {
    const base = await invoked(sdkDocument(ONE_ROW));
    const positions = objectPaths(base);
    expect(positions.length, "the walk reached every object node of the reading (counted from its JSON text)").toBe(bracesOf(base));
    const outcomes: Record<string, Plant> = {};
    const payloads = new Set<string>();
    for (const path of positions) {
      const value = planted(base, path, MEMBER, shapedContent());
      expect(hyperunixTopology(value, CONTEXT), `${pathText(path)}: projection strictEqual`).toStrictEqual(hyperunixTopology(base, CONTEXT));
      const payload = memberText(value, path, MEMBER);
      expect(payloadGaps(payload), `${pathText(path)}: the plant, read back at its position, carries every explanation verbatim`).toStrictEqual([]);
      payloads.add(payload);
      const plant = judgePlant(base, value);
      expect(plant.judged, `${pathText(path)}: the judge judged the planted reading itself`).toBe(digestOf(value));
      expect(plant.planted, `${pathText(path)}: the judged reading is the base plus exactly the member at its position`).toStrictEqual([pathText([...path, MEMBER])]);
      outcomes[pathText(path)] = plant;
    }
    const failing = Object.entries(outcomes).filter(([, plant]) => !plant.unchanged || plant.leaked.length > 0);
    expect(failing, "no planted position moves the projection or reaches an output string").toStrictEqual([]);
    const unseen = Object.entries(outcomes)
      .filter(([, plant]) => SENTINELS.some(sentinel => !plant.carried.includes(sentinel)))
      .map(([at]) => at);
    expect(SENTINELS.length, "every explanation carries a sentinel").toBe(EXPLANATIONS.length);
    expect(unseen, "every judged candidate carried every explanation's sentinel: the judge saw the plant").toStrictEqual([]);
    const sourceOf = isObject(base) && isObject(base.source) ? base.source : {};
    const control = judgePlant(base, { ...(base as JsonObject), source: json({ ...sourceOf, operation: `find ${explanationOf("accepted-assumption").text}` }) });
    expect(control.leaked, "the leak detector sees a leak through the operation the title shows").not.toStrictEqual([]);
    return {
      positions: positions.map(pathText),
      unchanged: Object.keys(outcomes).length,
      plant: {
        payloads: [...payloads].map(payload => sha256(payload)),
        carried: [...new Set(Object.values(outcomes).map(plant => plant.carried.join(" ")))],
        judged: new Set(Object.values(outcomes).map(plant => plant.judged)).size,
      },
      control: json(shown(control)),
    };
  },
  B2: async () => {
    const document = sdkDocument(ONE_ROW);
    const twin = await invoked(document);
    const twinSource = isObject(twin) ? (twin.source as JsonValue) : null;
    const positions = objectPaths(twinSource ?? {});
    expect(positions.length, "the walk reached every object node the SDK emits (counted from its JSON text)").toBe(bracesOf(twinSource ?? {}));
    const missing = positions.filter(path => !isObject(nodeAt(document, path)));
    expect(missing.map(pathText), "the base document holds every object node the SDK emits").toStrictEqual([]);
    const survives: Record<string, boolean> = {};
    const judged = new Set<string>();
    const check = (label: string, value: JsonValue): void => {
      const text = JSON.stringify(value);
      survives[label] = EXPLANATIONS.every(entry => text.includes(entry.text));
      expect(hyperunixTopology(value, CONTEXT), `${label}: projection strictEqual`).toStrictEqual(hyperunixTopology(twin, CONTEXT));
      const plant = judgePlant(twin, value);
      expect(plant.judged, `${label}: the judge judged the provider's reading itself`).toBe(digestOf(value));
      judged.add(plant.judged);
      expect({ unchanged: plant.unchanged, leaked: plant.leaked }, `${label}: nothing moves or shows`).toStrictEqual({ unchanged: true, leaked: [] });
    };
    for (const path of positions) check(pathText(path), await invoked(planted(document, path, MEMBER, shapedContent()) as JsonObject));
    const grammar = sdkDocument({
      ...ONE_ROW,
      diagnostics: [
        ...(document.diagnostics as JsonValue[]),
        ...EXPLANATIONS.map(entry => ({
          code: "HXS-EXPLANATION",
          severity: "info",
          message: entry.text,
          details: { class: entry.class },
          remediation: null,
          request: null,
          origin: "hxs",
          stream: "hx-fs",
          extra: {},
        })),
      ],
    });
    check("$.diagnostics[+] (diagnostic grammar)", await invoked(grammar));
    return { survives, judged: judged.size };
  },
  C1: async () => {
    const fixtures = await armedFixtures();
    const deltas: Record<string, string[]> = {};
    for (const fixture of fixtures) {
      const spec = FIXTURE_SPECS.find(entry => entry.name === fixture.name);
      expect(spec, `${fixture.name} has a spec`).toBeDefined();
      deltas[fixture.name] = differences(fixture.reading, fixture.twin);
      expect(carriedBy(fixture.reading), `${fixture.name} carries exactly its explanations`).toStrictEqual([...fixture.explanations]);
      expect(carriedBy(fixture.twin), `${fixture.name}'s twin carries none`).toStrictEqual([]);
      expect(hyperunixTopology(fixture.reading, CONTEXT), `${fixture.name}: today's adapter ignores the carrier`).toStrictEqual(
        hyperunixTopology(fixture.twin, CONTEXT),
      );
      const source = isObject(fixture.reading) && isObject(fixture.reading.source) ? fixture.reading.source : {};
      expect(source.rows, `${fixture.name} rows []`).toStrictEqual([]);
    }
    const unstable = EXPLANATIONS.filter(entry => sanitizeWorkbenchText(entry.text, FACET_LIMIT, "label") !== entry.text).map(entry => entry.class);
    expect(unstable, "every armed text is display-stable under the shared sanitizer").toStrictEqual([]);
    const projections = Object.fromEntries(
      fixtures.map(fixture => {
        const [snapshot] = hyperunixTopology(fixture.twin, CONTEXT).snapshots;
        const source = isObject(fixture.reading) && isObject(fixture.reading.source) ? fixture.reading.source : {};
        const kind = isObject(source.execution_status) ? source.execution_status.kind : null;
        const licensed = isObject(source.coverage_summary) ? source.coverage_summary.licenses_absence : null;
        return [fixture.name, json([kind, licensed, snapshot?.coverage ?? null, snapshot?.node.statusTone ?? null, snapshot?.node.statusText ?? null])];
      }),
    );
    return { fixtures: fixtures.map(fixture => fixture.name), deltas, projections };
  },
  C2: async () => {
    const matrix: Record<string, Record<string, Check[]>> = {};
    for (const name of Object.keys(READERS)) matrix[name] = await matrixOf(readerOf(name));
    expect(matrix.honest, "the honest reader passes every fixture").toStrictEqual({});
    const passing = Object.entries(matrix)
      .filter(([name, found]) => name !== "honest" && Object.keys(found).length === 0)
      .map(([name]) => name);
    expect(passing, "every mutant fails at least one fixture").toStrictEqual([]);
    const fired = new Set(Object.values(matrix).flatMap(found => Object.values(found).flat()));
    expect(CHECKS.filter(check => !fired.has(check)), "every armed check fires for some mutant and fixture").toStrictEqual([]);
    return json(matrix);
  },
  C3: async () => {
    const bound = Object.keys(HX_EXPLANATION_READERS).sort();
    const violations = await bindingViolations(HX_EXPLANATION_READERS);
    expect(violations, "every bound reader meets the armed check").toStrictEqual({});
    return json({
      bound,
      violations,
      controls: {
        honestOnly: await bindingViolations({ "synthetic/honest": honest }),
        withMutant: await bindingViolations({ "synthetic/honest": honest, "synthetic/raise-on-accepted": readerOf("raiseOnAccepted") }),
      },
    });
  },
  Q1: async () => {
    const generic = ["reason", "rationale", "note", "detail", "why", "justification"];
    const base = await invoked(sdkDocument(ONE_ROW));
    const text = explanationOf("rejected-assumption").text;
    const withheld = generic.map(key => {
      const value = planted(base, ["source"], key, text);
      expect(memberText(value, ["source"], key), `${key}: the plant, read back under its own key, is the planted text`).toBe(JSON.stringify(text));
      const plant = judgePlant(base, value);
      expect(plant.judged, `${key}: the judge judged the planted reading itself`).toBe(digestOf(value));
      return shown(plant);
    });
    expect(
      generic.filter((key, index) => !isDeepStrictEqual(withheld[index]?.planted, [pathText(["source", key])])),
      "each generic key's judged reading is the base plus exactly that key on the source",
    ).toStrictEqual([]);
    const [sentinel = ""] = text.match(SENTINEL) ?? [];
    expect(
      generic.filter((_, index) => sentinel === "" || !(withheld[index]?.carried ?? []).includes(sentinel)),
      "every generic key's judged candidate carried the planted rejected-assumption text",
    ).toStrictEqual([]);
    return { genericKeyHits: generic.map(key => stemHits(key).length), withheld: json(withheld) };
  },
  Q2: async () => {
    const composed = 'const key = ["expl", "anation"].join(""); const other = ["assum", "ption"].join("");';
    const composedKeys = [...composed.matchAll(/\["([^"]*)", "([^"]*)"\]\.join\(""\)/g)].map(match => `${match[1] ?? ""}${match[2] ?? ""}`);
    expect(composedKeys.length, "the probe text assembles its keys").toBeGreaterThan(0);
    expect(
      composedKeys.filter(key => stemHits(key).length === 0),
      "every key the probe assembles spells a stem whole: the scan misses only the composed form",
    ).toStrictEqual([]);
    return { hits: stemHits(composed).length, composedKeys, assembledHits: composedKeys.map(key => stemHits(key).length) };
  },
  Q3: async () => {
    const entries = vendoredEntries();
    const namesakes: Record<string, number[]> = {};
    for (const [name, bytes] of [...entries].sort(([left], [right]) => left.localeCompare(right))) {
      if (!name.endsWith(".d.ts")) continue;
      const lines = stemLines(bytes.toString("utf8"));
      if (lines.length > 0) namesakes[name] = lines;
    }
    const judged = JUDGED_FILES.map(path => `package/${path.replace(/^node_modules\/@hyperunix\/sdk\//, "")}`);
    expect(Object.keys(namesakes).filter(name => judged.includes(name)), "no namesake lies in a judged file").toStrictEqual([]);
    return { declarations: [...entries.keys()].filter(name => name.endsWith(".d.ts")).length, namesakes };
  },
  Q4: async () => {
    const document = sdkDocument(ONE_ROW);
    const twin = await invoked(document);
    const twinSource = isObject(twin) ? (twin.source as JsonValue) : null;
    const carriedVerbatim: string[] = [];
    for (const path of objectPaths(twinSource ?? {})) {
      const value = await invoked(planted(document, path, MEMBER, shapedContent()) as JsonObject);
      const source = isObject(value) ? (value.source as JsonValue) : null;
      const node = nodeAt(source ?? {}, path);
      if (isObject(node) && isDeepStrictEqual(node[MEMBER], shapedContent())) carriedVerbatim.push(pathText(path));
      expect(leaksOf(hyperunixTopology(value, CONTEXT)), `${pathText(path)}: the projection shows none of it`).toStrictEqual([]);
    }
    return { carriedVerbatim };
  },
  Q5: async () => {
    const zeroWidth = String.fromCodePoint(0x200b);
    const homoglyph = String.fromCodePoint(0x0430);
    const split = `readonly expl${zeroWidth}anations: readonly string[]; readonly assum${zeroWidth}ption: string;`;
    const lookalike = `readonly expl${homoglyph}nations: readonly string[]; readonly ${homoglyph}ssumption: string;`;
    const stemsOf = (text: string): string[] => stemHits(text).map(hit => hit.slice(hit.indexOf(":") + 1));
    const interruptions = { split: split.split(zeroWidth).length - 1, lookalike: lookalike.split(homoglyph).length - 1 };
    const repaired = { split: stemsOf(split.split(zeroWidth).join("")), lookalike: stemsOf(lookalike.split(homoglyph).join("a")) };
    expect(Object.entries(interruptions).filter(([, count]) => count === 0), "each probe carries its interruption").toStrictEqual([]);
    expect(Object.entries(repaired).filter(([, stems]) => stems.length === 0), "each probe, repaired, spells the stems").toStrictEqual([]);
    return { split: stemHits(split).length, lookalike: stemsOf(lookalike), interruptions, repaired };
  },
  Q6: async () => {
    const modules = tsBelow(join(REPO, "src")).map(path => relative(REPO, path).split("\\").join("/")).sort();
    const loads = (path: string, pattern: RegExp): boolean => specifiersOf(textOf(join(REPO, path))).some(specifier => pattern.test(specifier));
    const hxModules = modules.filter(path => !JUDGED_FILES.includes(path) && loads(path, /@hyperunix\/sdk|providers\/hyperunix\.js$|\/hyperunix\.js$/));
    const adapterImporters = modules.filter(path => loads(path, /hyperunix-observer\.js$/));
    expect(modules.length, "the src walk reached the modules").toBeGreaterThan(50);
    return { judged: [...JUDGED_FILES], hxModules, adapterImporters };
  },
};

describe("wb-x0xu.1 HX structural-explanation census (HX-STRUCTURAL-INFORMATION-OPTIMIZATION-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's acceptance text and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:3", "Q:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        programPin: PROGRAM_PIN,
        vendoredTarball: VENDORED_TGZ,
        dossier: DOSSIER,
        judgedFiles: JUDGED_FILES,
        stems: STEMS,
        classes: CLASSES,
        markers: MARKERS,
        explanations: EXPLANATIONS,
        member: MEMBER,
        carrier: CARRIER,
        facetLimit: FACET_LIMIT,
        flaggedControls: FLAGGED_CONTROLS,
        quietControls: QUIET_CONTROLS,
        fixtures: FIXTURE_SPECS,
        checks: CHECKS,
        readers: Object.keys(READERS),
        residuals: RESIDUALS,
      }),
    ).toStrictEqual({ programPin: ROSTER.programPin, ...ROSTER.constants });
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = acceptanceClauses(notes);
    expect(Object.keys(clauses), "the bead states acceptance clauses").not.toStrictEqual([]);
    const judgedRows = ROWS.filter(row => row.id !== "Q");
    for (const row of judgedRows) expect(clauses[letterOf(row.label)], `row ${row.id} quotes its acceptance clause exactly`).toBe(quoteOf(row.label));
    for (const [letter, clause] of Object.entries(clauses)) {
      expect(
        judgedRows.filter(row => letterOf(row.label) === letter && quoteOf(row.label) === clause).map(row => row.id),
        `clause (${letter}) is quoted by exactly one row`,
      ).toHaveLength(1);
    }
    expect(filingGrepFiles(notes), "the judged files are the two of the filing's grep sentence").toStrictEqual(JUDGED_FILES.map(basename));
    const named = CLASSES.filter(kind => (clauses.c ?? "").includes(kind));
    expect(named.length, "clause (c) names its markers in the census's class spellings").toBeGreaterThan(0);
    expect(named.filter(kind => !MARKERS.includes(kind)), "every marker clause (c) names is held to never-absence").toStrictEqual([]);
    for (const stem of ["assumption", "explain"]) expect(notes, `the filing's grep names ${stem}`).toContain(stem);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
