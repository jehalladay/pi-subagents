/**
 * wb-if7q.5 (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R6, program-triage-2026-10-22), the absent-today leg. Statement (bead
 * notes, full form): "If Pi ever consumes TSX streaming blocks (gated TSX-IF-06 parser; unshipped at 76bbbffd9d4a), an
 * incomplete or invalid block never becomes an authorized action, structural output triggers no effect until the application
 * validator accepts it, Pi echoes content-state words recognizing, provisional, complete, validated, invalid, aborted verbatim
 * and shows provisional content only so marked, keeping source attribution, stream sequence and resource revision"
 * (ReactiveFiberTSXSDK docs/programs/native-interfaces-and-portable-tsx-2026-10-21/02-implementation.md:19@76bbbffd9d4a).
 * Acceptance (owner filing, verbatim; the labels of rows B and C): "(a) absence pin: Pi has no streaming-block consumer at the
 * pinned TSX version (0 importers of any block-parser type); (b) armed: a stream cut mid code fence or mid JSON string and
 * duplicate, late or out-of-order chunks yield non-validated blocks, zero admitted actions and zero effects; a mutant admitting
 * an action or firing an effect from any state but validated fails; (c) status words are echoed verbatim, an unknown word is
 * non-validated (wb-973.10), and every surfaced provisional block carries a provisional marker with source attribution, stream
 * sequence and resource revision."
 *
 * Pi consumes no streaming block today. The parser is not shipped: the program integrates it into the TSX SDK package
 * (02-implementation.md:18-19, the gated work package) as a headless append/revise state machine whose blocks carry a typed
 * parse status in six content states (03-streaming-and-inference.md:9-11), and Pi loads that package nowhere. The block readers
 * Pi does have read other things: the conversation viewer renders a message's text through pi-tui's Markdown component, the
 * Claude host and transcript walk Claude SDK message content blocks, and the receipts index lexes Markdown pages with marked.
 * So the statement's trigger has not fired, (a) holds by absence, and (b) and (c) wait for the parser. The census pins that state:
 *  A, the trigger's inventory, empty today. A1 no judged module (identifiers and regular expressions always; string and
 *    template literals cooked by the compiler, constant-folded literals and JSX text when NAME-LIKE, no white space once
 *    trimmed - a consumer names a state or a block type as a token, prose never is; comments are never read) and no judged JSON
 *    file (its keys always, its name-like string values; a file that does not parse is read as text, token by token) spells
 *    either DISTINCTIVE content state (STATE_FAMILY:
 *    recognizing, its -ising spelling, provisional, provisionally) - the distinctive pair is DERIVED: the six states of the bead
 *    row's merged pin minus the four Pi's modules already spell in other senses - and the walk reaches its floors and anchors,
 *    meets no symlink (refused, never followed) and no unreadable file (A1's witness carries both lists too, so deleting the walk
 *    assertion still reds a symlink). judgeStates judges the inventory BEFORE the derivation and each red names its sites: an
 *    inventory red lists every spelling with its file and line, and a derivation red names, for each state it contradicts, the
 *    files and lines that spell it (a spelling the inventory does not judge, prose among them) or that no judged module spells
 *    it; A1's judgingControls pin that order and those messages over planted trees; A2 no judged module or JSON file spells a streaming-block
 *    name (BLOCK_FAMILY: the program's own nouns - streaming blocks, a block stream, a block parser, parsed blocks, a parse
 *    status, content states, a provisional suffix), read by A1's rule; A3 the nearest block readers (NEAREST_READERS) are reached by the reader,
 *    judged, and carry no A1, A2, B1 or B2 finding; A4 each exemption is load-bearing: this file and its roster are walked, are
 *    not judged, and spell both families, so lifting either reds A1 and A2.
 *  B, acceptance (a). B1 no judged module loads the TSX SDK (SDK_FAMILY: bare, a subpath, an npm:, jsr: or URL specifier, a
 *    JS-escaped or constant-folded literal) through an import or export declaration, an import-equals require, an import type,
 *    a @jsxImportSource pragma, or as the first argument of any call or new expression (a dynamic import, require,
 *    require.resolve, an aliased or created require, new URL); the pinned package's only block parser is its context-block one
 *    (the roster's blockExports, parseContextBlock among them), so no importer of the package means no importer of any
 *    block-parser type it carries now or later; B2 no judged module loads llm-ui, the parser's named reference
 *    (REFERENCE_FAMILY: the llm-ui package or any @llm-ui scope package, in every load form B1 reads); B3 no manifest
 *    (MANIFEST: package.json, package-lock.json, npm-shrinkwrap.json, deno.json[c], an import map, a tsconfig or jsconfig) names
 *    either package anywhere in its text.
 *  C, acceptance (b) and (c), gated. C1 the measured parser is unshipped: the roster's producer facts state, at the program pin
 *    and at the distribution installed rf packages, an export map and an import map with no stream, block, chunk or parse
 *    entry (STREAM_ENTRY), no dependency on the reference, src/ and python/ files that spell neither recognizing nor the
 *    reference nor a streaming noun (their other-sense readings are recorded beside them), the same one block parser at both
 *    pins (the context-block one), and parser vocabulary only under docs/, as the bead row states ("Shipped: no - ..."); a
 *    re-measure that ships the parser flips C1 red until (b) and (c) land with it. C2 the rf-tsx tier (the files vitest.rf-tsx.config.ts includes, run by
 *    forge.toml's rf-preview-tsx command) registers rows, and none of its literals names a claim of (b) or (c) (CLAIM_FAMILY),
 *    so no tier row claims either proof before the parser ships.
 * THE WALK: every regular file below the repository root, at any depth, in name order. The root entries SKIPPED_ROOTS (git's
 * data, the tracker export - bead rows quote the statement -, installed dependencies, build, coverage and Forge outputs) are
 * skipped at the root only; the two EXEMPT files are walked but not judged. Modules (MODULE_EXTENSIONS) and JSON files
 * (JSON_EXTENSIONS) are judged; every other file is walked and never judged - prose, and also shell scripts, TOML and YAML
 * configs, JSON Lines, extensionless files, packed archives and media (the unjudged extensions the walk meets at base 01e7c56:
 * .md, .sh, none, .tgz, .toml, .yml, .yaml, .mp4, .png). It reads the working tree, so an untracked plant is read, and a
 * copy of this file or its roster anywhere in the walk is a finding (only the two exact paths are exempt). A later census that
 * needs either family as a needle adds its own file to EXEMPT in its cut, beside an A4-style reading.
 * OVER-READ (disclosed): an identifier or a name-like literal using a distinctive state in its everyday sense, or
 * stream_blocks with blocks as a verb, is read as a finding; none exists today, and such a finding is re-judged, never silenced.
 * The name-like rule exists because prose quoting the program is not consumption: a queued sibling census's roster quotes the
 * program README's "supersedes provisional naming" sentence, which the prose-judging first draft of A1 read as a finding.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only git show, ls-tree and grep on the local ReactiveFiberTSXSDK checkout,
 * and the installed rf, 2026-10-23): the program pin 76bbbffd9d4a (package.json blob a3cef7aa8938, the package at 0.1.668)
 * and the distribution source 5da03a7d49f4 (blob 05e6156f75bd, 0.1.649) both export ".", "./jsx-runtime", "./jsx-dev-runtime",
 * "./testing", "./embedding" and "./package.json", declare no dependencies, and none of their src/ and python/ files (213 and
 * 211) spells recognizing, the reference or a streaming noun. Other senses, recorded (`otherSense`): 28 and 27 of those files
 * spell provisional as a provisional value or record (DEC-34 limit values, a provisional carrier or report; read hit by hit by
 * the cutting seat, none a content state), and three sites name D-11's ONE block parser, the context-document one
 * (src/outputs/context-document.ts:128, src/outputs/fiber-carrier.ts:13, python fiber_carrier.py:16). At the pin the reference
 * is spelled by 02-implementation.md:19 and 03-streaming-and-inference.md:8 only, the six states by
 * 03-streaming-and-inference.md:11 only, the work package heading at 02-implementation.md:18; at the distribution source none of
 * them exists. Both root indexes export the same block names (blockExports); the one parser among them, parseContextBlock, reads
 * context-document blocks, not streamed model output. rf 0.1.832 (`rf --json --version` result.version) packages integrations/tsx/import-map.json with
 * four entries mapping the package to npm:@reactive-fiber/tsx@0.1.649 and runtime-lock.json naming that distribution and its
 * source. Pi vendors none of these; a producer change is seen only when a cut re-measures the roster, and the roster reader
 * refuses a producer object whose keys differ from the measured set, so a re-measure written under a renamed or misspelled key
 * is refused, never read as 0.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every
 * pin's witness (each carries its pin id), the scan constants, the content states, the residual families, the registered test
 * titles and each pin's reached assertion count are held to the out-of-file roster (test/fixtures/tsx-streaming-block-roster.json). OUTSIDE ANCHOR: the owner filing's
 * row in the tracked bead export (.beads/issues.jsonl, row wb-if7q.5): every acceptance clause it lists sits verbatim in exactly
 * one row label, its trigger phrase in row A's, every row carries one of them, its quote, citation and merged-pin states equal
 * the roster's, A1 derives its distinctive pair from those states, and its gating line (the filing's first "Gating: " line) ends with the "Shipped: no"
 * sentence C1 reads, so a later note quoting that sentence is never read as the filing, and a row removed from every literal of
 * this file and the roster still reds. Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead
 * row anchors rows, clauses and the state list, not pins), nor a pin body that keeps its exact assertion count while returning a
 * constant witness (REACHED pins the count, not the reading).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED) with the assertion count
 * the roster's reached list pins, so a pin body hollowed to return its witness without its own assertions reds; no registered
 * test or suite title spells either family
 * (describe titles mask them), so a passing run's report written into the tree stays quiet.
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a state word, a block name or a specifier
 * assembled at runtime from a variable, a call or an array join (A1 composed, joined; B1 composedSpecifier; B2
 * composedReference); R-COMMON-STATE a consumer that spells only the four common states (A1 commonStates, jsonCommon);
 * R-PASSTHROUGH block records read as opaque data and shown without a state word or a block name in code or JSON (A2
 * passthrough); R-RENAMED a parser loaded under a package name outside both families and bound under names outside
 * BLOCK_FAMILY (A2 renamedBinding; B2 renamedPackage); R-LOOKALIKE a non-ASCII look-alike letter or an inserted invisible (A1
 * lookalike, invisible); R-ENCODED an encoding the compiler does not cook, ROT13 or base-N (A1 rot13); R-PROSE every file of an unjudged
 * extension (prose, and also shell scripts, TOML and YAML configs, JSON Lines and extensionless files), code comments, and
 * literals or JSON values with white space inside, walked or parsed but never judged - a space-separated state list in one
 * literal among them (A1 comment, proseLiteral, proseTemplate, jsonProse, spacedList, the planted notes/ and the planted
 * unjudged-extension files of unjudgedControls; A2 proseLiteral); R-OUTSIDE a file below a skipped root
 * entry (A1 planted node_modules/, dist/, .beads/, .forge/, build/ and coverage/).
 * Display paths added: none. Test-only: it spawns nothing; the controls plant files in makeScratch scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import rfTsxConfig from "../vitest.rf-tsx.config.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-tsx-streaming-block-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-streaming-block-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-if7q.5";
/** The TSX SDK package, where 02-implementation.md:19 integrates the gated parser, as any specifier names it. */
const SDK = "@reactive-fiber/tsx";
const SDK_FAMILY = /@reactive-fiber\/tsx(?![\w-])/i;
/** The parser's named reference (02-implementation.md:19, 03-streaming-and-inference.md:8): llm-ui or any @llm-ui scope package. */
const REFERENCE = "llm-ui";
const REFERENCE_FAMILY = /(?<![\w-])@?llm-ui(?![\w-])/i;
/** The six content states, in the merged pin's order (03-streaming-and-inference.md:11; the bead row is the anchor). */
const CONTENT_STATES = ["recognizing", "provisional", "complete", "validated", "invalid", "aborted"];
/** A1: the distinctive states, read over a text's words (wordsOf). */
const STATE_FAMILY = /\b(?:recogni[sz]ing|provisional(?:ly)?)\b/;
/** A2: the program's streaming-block nouns (02-implementation.md:19, 03-streaming-and-inference.md:9-11), read over a text's words. */
const BLOCK_FAMILY =
  /\b(?:stream(?:ing|ed)? blocks?|blocks? streams?|blocks? pars(?:er|ers|ing)|pars(?:e|es|ed|ing) blocks?|parse status(?:es)?|content states?|provisional suffix(?:es)?)\b/;
/** C2: what a tier row claiming (b) or (c) would have to name, read over the literal's own text. */
const CLAIM_FAMILY =
  /stream(?:ing)?[\s_-]*blocks?|content[\s_-]*states?|parse[\s_-]*status|recogni[sz]ing|provisional|non[\s_-]*validated|code[\s_-]*fence|out[\s_-]*of[\s_-]*order|duplicate[\s_-]*chunks?|late[\s_-]*chunks?|stream[\s_-]*sequence|source[\s_-]*attribution|resource[\s_-]*revisions?|admitted[\s_-]*actions?/i;
/** C1: an export-map or import-map entry that would carry a streaming parser. */
const STREAM_ENTRY = /stream|block|chunk|parse/i;
/** Masks for describe titles, so a report holding this file's titles stays quiet. */
const STATE_TEXT = /recogni[sz]ing|provisional(?:ly)?/gi;
const BLOCK_TEXT =
  /stream(?:ing|ed)?[\s_.-]*blocks?|blocks?[\s_.-]*streams?|blocks?[\s_.-]*pars(?:er|ers|ing)|pars(?:e|es|ed|ing)[\s_.-]*blocks?|parse[\s_.-]*status(?:es)?|content[\s_.-]*states?|provisional[\s_.-]*suffix(?:es)?/gi;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JSON_EXTENSIONS = [".json"];
const MANIFEST = /(?:^|\/)(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|deno\.jsonc?|import[-_]map\.json|[tj]sconfig[^/]*\.json)$/i;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const EXEMPT = [SELF, ROSTER_FILE];
/** Each floor sits below the count measured at base dae1788 (819 files; src 115, test 439, qa 62 modules; 47 JSON; 4 manifests). */
const FLOORS = { files: 700, modules: { src: 100, test: 380, qa: 55 }, json: 40, manifests: 4 };
/** Files the walk must reach, each with a token its bytes carry: a root page, a src module, a qa script, the manifest and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/ui/conversation-viewer.ts", "Markdown"],
  ["qa/workbench/receipts-index.mjs", "marked"],
  ["package.json", "@tintinweb/pi-subagents"],
  ["media/screenshot.png", "PNG"],
];
/** The nearest block readers Pi has, each with what the reader must read in it: an identifier or a load specifier. */
const NEAREST_READERS: readonly (readonly [string, "identifier" | "specifier", string])[] = [
  ["src/ui/conversation-viewer.ts", "identifier", "Markdown"],
  ["src/workbench/claude-host.ts", "identifier", "block"],
  ["src/workbench/claude-transcript.ts", "identifier", "block"],
  ["test/workbench-pi-streaming.test.ts", "identifier", "SDKMessage"],
  ["qa/workbench/receipts-index.mjs", "specifier", "marked"],
];
const TIER_COMMAND = "rf-preview-tsx";
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-COMMON-STATE", "R-PASSTHROUGH", "R-RENAMED", "R-LOOKALIKE", "R-ENCODED", "R-PROSE", "R-OUTSIDE"];
const CYRILLIC_O = String.fromCodePoint(0x043e);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
/** Every scan constant, as the roster holds it. */
const SCAN = {
  sdkFamily: `${SDK_FAMILY.source}/${SDK_FAMILY.flags}`,
  referenceFamily: `${REFERENCE_FAMILY.source}/${REFERENCE_FAMILY.flags}`,
  stateFamily: `${STATE_FAMILY.source}/${STATE_FAMILY.flags}`,
  blockFamily: `${BLOCK_FAMILY.source}/${BLOCK_FAMILY.flags}`,
  claimFamily: `${CLAIM_FAMILY.source}/${CLAIM_FAMILY.flags}`,
  streamEntry: `${STREAM_ENTRY.source}/${STREAM_ENTRY.flags}`,
  manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  jsonExtensions: JSON_EXTENSIONS,
  skippedRoots: SKIPPED_ROOTS,
  exempt: EXEMPT,
  floors: FLOORS,
  walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
  nearestReaders: NEAREST_READERS.map(([path, kind, token]) => `${path}:${kind}:${token}`),
  tierCommand: TIER_COMMAND,
};
const FROZEN_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells a judged family";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(trigger, absent today) If Pi ever consumes TSX streaming blocks: no judged module or JSON file spells a distinctive state word or a streaming-block name, the nearest block readers Pi has are reached and quiet, and each exemption is load-bearing",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(a) absence pin: Pi has no streaming-block consumer at the pinned TSX version (0 importers of any block-parser type): no module loads the TSX SDK, whose pinned exports carry its only block parser, nor llm-ui, the parser's named reference, and no manifest names either",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(b) armed: a stream cut mid code fence or mid JSON string and duplicate, late or out-of-order chunks yield non-validated blocks, zero admitted actions and zero effects; a mutant admitting an action or firing an effect from any state but validated fails; (c) status words are echoed verbatim, an unknown word is non-validated (wb-973.10), and every surfaced provisional block carries a provisional marker with source attribution, stream sequence and resource revision: both gated - the measured parser is unshipped and the rf-tsx tier claims neither proof",
    pins: ["C1", "C2"],
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
/** The src/ and python/ files of one pin spelling the parser's own words: recognizing, the reference, a streaming noun. */
interface Spelling {
  readonly recognizing: number;
  readonly reference: number;
  readonly streamingBlockNames: number;
}
interface DocSites {
  readonly states: readonly string[];
  readonly reference: readonly string[];
  readonly workPackage: readonly string[];
}
/** What the pin spells in another sense: provisional values and records, and the context-document block parser's sites. */
interface OtherSense {
  readonly provisionalFiles: number;
  readonly blockParserSites: readonly string[];
}
interface ProducerPin {
  readonly label: string;
  readonly repo: string;
  readonly sha: string;
  readonly version: string;
  readonly packageJsonBlob: string;
  readonly exports: readonly string[];
  readonly dependencies: readonly string[];
  readonly srcPythonFiles: number;
  readonly spelling: Spelling;
  readonly otherSense: OtherSense;
  readonly docSites: DocSites;
  readonly blockExports: readonly string[];
}
interface Producer {
  readonly rfVersion: string;
  readonly importMap: { readonly [key: string]: string };
  readonly distribution: { readonly name: string; readonly version: string; readonly source: string };
  readonly pins: readonly ProducerPin[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly sdk: string;
  readonly reference: string;
  readonly contentStates: readonly string[];
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly reached: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) throw new Error(`roster ${field} must be a count`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
/** Refuses an object whose keys differ from `keys`, so a re-measure written under a renamed or misspelled key never reads as 0. */
function exactKeys(value: { [key: string]: unknown }, keys: readonly string[], field: string): void {
  const found = Object.keys(value).sort();
  if (JSON.stringify(found) !== JSON.stringify([...keys].sort())) throw new Error(`roster ${field} keys must be exactly ${keys.join(", ")}; found ${found.join(", ")}`);
}
function producerPinOf(value: unknown, field: string): ProducerPin {
  const pin = objectOf(value, field);
  const spelling = objectOf(pin.spelling, `${field}.spelling`);
  const otherSense = objectOf(pin.otherSense, `${field}.otherSense`);
  const sites = objectOf(pin.docSites, `${field}.docSites`);
  exactKeys(pin, ["label", "repo", "sha", "version", "packageJsonBlob", "exports", "dependencies", "srcPythonFiles", "spelling", "otherSense", "docSites", "blockExports"], field);
  exactKeys(spelling, ["recognizing", "reference", "streamingBlockNames"], `${field}.spelling`);
  exactKeys(otherSense, ["provisionalFiles", "blockParserSites"], `${field}.otherSense`);
  exactKeys(sites, ["states", "reference", "workPackage"], `${field}.docSites`);
  return {
    label: text(pin.label, `${field}.label`),
    repo: text(pin.repo, `${field}.repo`),
    sha: text(pin.sha, `${field}.sha`),
    version: text(pin.version, `${field}.version`),
    packageJsonBlob: text(pin.packageJsonBlob, `${field}.packageJsonBlob`),
    exports: strings(pin.exports, `${field}.exports`),
    dependencies: strings(pin.dependencies, `${field}.dependencies`),
    srcPythonFiles: count(pin.srcPythonFiles, `${field}.srcPythonFiles`),
    spelling: {
      recognizing: count(spelling.recognizing, `${field}.spelling.recognizing`),
      reference: count(spelling.reference, `${field}.spelling.reference`),
      streamingBlockNames: count(spelling.streamingBlockNames, `${field}.spelling.streamingBlockNames`),
    },
    otherSense: {
      provisionalFiles: count(otherSense.provisionalFiles, `${field}.otherSense.provisionalFiles`),
      blockParserSites: strings(otherSense.blockParserSites, `${field}.otherSense.blockParserSites`),
    },
    docSites: {
      states: strings(sites.states, `${field}.docSites.states`),
      reference: strings(sites.reference, `${field}.docSites.reference`),
      workPackage: strings(sites.workPackage, `${field}.docSites.workPackage`),
    },
    blockExports: strings(pin.blockExports, `${field}.blockExports`),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  const importMap = objectOf(producer.importMap, "producer.importMap");
  if (!Object.values(importMap).every(value => typeof value === "string")) throw new Error("roster producer.importMap must map strings to strings");
  const distribution = objectOf(producer.distribution, "producer.distribution");
  if (!Array.isArray(producer.pins)) throw new Error("roster producer.pins must be a list");
  exactKeys(producer, ["rfVersion", "importMap", "distribution", "pins"], "producer");
  exactKeys(distribution, ["name", "version", "source"], "producer.distribution");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    sdk: text(raw.sdk, "sdk"),
    reference: text(raw.reference, "reference"),
    contentStates: strings(raw.contentStates, "contentStates"),
    scan: scan as JsonObject,
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      importMap: Object.fromEntries(Object.entries(importMap).map(([key, value]) => [key, String(value)])),
      distribution: {
        name: text(distribution.name, "producer.distribution.name"),
        version: text(distribution.version, "producer.distribution.version"),
        source: text(distribution.source, "producer.distribution.source"),
      },
      pins: producer.pins.map((pin: unknown, index: number) => producerPinOf(pin, `producer.pins[${index}]`)),
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerPin(label: string): ProducerPin {
  const found = ROSTER.producer.pins.find(pin => pin.label === label);
  if (found === undefined) throw new Error(`the roster holds no producer pin ${label}`);
  return found;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The filing's quote, citation and merged-pin content states, from its first "Quote: " line. */
function quoteOf(notes: string): { quote: string | undefined; citation: string | undefined; states: string[] | undefined } {
  const match = /^Quote: '(.+)' (\S+)\. Merged pin \(same dir\): \S+ \('Content states: ([^.']+)\.'\)/m.exec(notes);
  return { quote: match?.[1], citation: match?.[2], states: match?.[3]?.split(", ") };
}
/** The filing's gating line: its first "Gating: " line, as acceptanceClauses reads its first "Acceptance: " line. */
function gatingOf(notes: string): string | undefined {
  return notes.split("\n").find(entry => entry.startsWith("Gating: "));
}
/** C1's reading of the filing: its gating line ends with the unshipped sentence for the program pin, so a later note quoting the
 * sentence, a second gating line or a gating line going on past the sentence never reads as the filing (F2 rider P9). */
function saysUnshipped(notes: string, sha12: string): boolean {
  return gatingOf(notes)?.endsWith(` Shipped: no - git grep ${REFERENCE} over src/ python/ at ${sha12}: 0 files.`) === true;
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const isJson = (path: string): boolean => JSON_EXTENSIONS.includes(extensionOf(path));

/** A text as lowercase words: camelCase and PascalCase humps split, acronym runs kept, every other character a separator. */
function wordsOf(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

/** A name-like text: no white space once trimmed. A consumer names a state or a block type this way; prose never is. */
const isNameLike = (value: string): boolean => value.trim().length > 0 && !/\s/.test(value.trim());

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
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

interface ModuleReading {
  readonly states: string[];
  readonly blocks: string[];
  readonly specifiers: string[];
  readonly sdkLoads: string[];
  readonly referenceLoads: string[];
  readonly identifiers: Set<string>;
  readonly words: Set<string>;
  readonly stateSites: Map<string, string[]>;
}
/** One module, parsed under its own script kind: its state and block-name spellings (A1, A2), every word it spells (A1's
 * derivation) with the file, line and kind of each content-state word among them (a derivation red names them), its module
 * specifiers and the literal first argument of every call or new expression, and the SDK and reference loads among them (B1,
 * B2). Comments are never read. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const states: string[] = [];
  const blocks: string[] = [];
  const specifiers: string[] = [];
  const identifiers = new Set<string>();
  const words = new Set<string>();
  const stateSites = new Map<string, string[]>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  // Every word counts toward A1's derivation; an identifier or a regex is always judged, a literal only when it is name-like.
  const judge = (node: ts.Node, kind: string, value: string): void => {
    const read = wordsOf(value);
    const spelled = read.split(" ").filter(word => word.length > 0);
    for (const word of spelled) words.add(word);
    for (const state of CONTENT_STATES) {
      if (!spelled.includes(state)) continue;
      const sites = stateSites.get(state) ?? [];
      sites.push(`${path}:${line(node)} ${kind}`);
      stateSites.set(state, sites);
    }
    if (!(kind === "identifier" || kind === "regex" || isNameLike(value))) return;
    if (STATE_FAMILY.test(read)) states.push(`${path}:${line(node)} ${kind}: ${value}`);
    if (BLOCK_FAMILY.test(read)) blocks.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const load = (node: ts.Node | undefined): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value !== undefined) specifiers.push(value);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      judge(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      judge(node, "literal", node.text);
    } else if (ts.isJsxText(node)) {
      judge(node, "jsx-text", node.text);
    } else if (ts.isRegularExpressionLiteral(node)) {
      judge(node, "regex", node.text);
    }
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) judge(node, "folded", folded);
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    // Any call or new expression's first argument: a dynamic import, require, require.resolve, an aliased or created require, new URL.
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    ts.forEachChild(node, visit);
  };
  visit(file);
  for (const match of source.matchAll(/@jsxImportSource\s+([^\s*]+)/g)) specifiers.push(match[1] ?? "");
  return {
    states,
    blocks,
    specifiers,
    sdkLoads: specifiers.filter(specifier => SDK_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`),
    referenceLoads: specifiers.filter(specifier => REFERENCE_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`),
    identifiers,
    words,
    stateSites,
  };
}

interface JsonReading {
  readonly states: string[];
  readonly blocks: string[];
  readonly parsed: boolean;
}
/** One JSON file: every key, and every name-like string value, read as words (a file that does not parse is read as text,
 * token by token). */
function readJson(path: string, source: string): JsonReading {
  const states: string[] = [];
  const blocks: string[] = [];
  const judge = (kind: string, value: string): void => {
    const read = wordsOf(value);
    const shown = kind === "text" ? `${path}: text` : `${path}: ${kind}: ${value}`;
    if (STATE_FAMILY.test(read)) states.push(shown);
    if (BLOCK_FAMILY.test(read)) blocks.push(shown);
  };
  const visit = (value: unknown): void => {
    if (typeof value === "string") {
      if (isNameLike(value)) judge("value", value);
    }
    else if (Array.isArray(value)) for (const item of value) visit(item);
    else if (isObject(value))
      for (const [key, item] of Object.entries(value)) {
        judge("key", key);
        visit(item);
      }
  };
  let parsed = true;
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    parsed = false;
  }
  if (parsed) visit(value);
  else for (const token of source.split(/\s+/)) if (token.length > 0) judge("text", token);
  return { states, blocks, parsed };
}

interface TreeReading {
  readonly walk: Walk;
  readonly judged: string[];
  readonly modules: Map<string, ModuleReading>;
  readonly json: Map<string, JsonReading>;
  readonly manifests: string[];
  readonly manifestHits: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it; the exempt files are walked but not judged. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const modules = new Map<string, ModuleReading>();
  const jsonFiles = new Map<string, JsonReading>();
  const manifests: string[] = [];
  const manifestHits: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of judged) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const utf8 = buffer.toString("utf8");
    if (isModule(file)) modules.set(file, readModule(file, utf8));
    if (isJson(file)) jsonFiles.set(file, readJson(file, utf8));
    if (MANIFEST.test(file)) {
      manifests.push(file);
      if (SDK_FAMILY.test(utf8) || REFERENCE_FAMILY.test(utf8)) manifestHits.push(file);
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, judged, modules, json: jsonFiles, manifests, manifestHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;
function floorsOf(tree: TreeReading): { files: boolean; src: boolean; test: boolean; qa: boolean; json: boolean } {
  return {
    files: tree.walk.files.length >= FLOORS.files,
    src: modulesBelow(tree, "src") >= FLOORS.modules.src,
    test: modulesBelow(tree, "test") >= FLOORS.modules.test,
    qa: modulesBelow(tree, "qa") >= FLOORS.modules.qa,
    json: tree.json.size >= FLOORS.json,
  };
}

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | null>>): TreeReading {
  const root = makeScratch("tsx-streaming-block-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}

/** The judges over one snippet read as `path`, or one JSON text. */
const statesIn = (path: string, source: string): boolean => readModule(path, source).states.length > 0;
const blocksIn = (path: string, source: string): boolean => readModule(path, source).blocks.length > 0;
const loadsSdk = (path: string, source: string): boolean => readModule(path, source).sdkLoads.length > 0;
const loadsReference = (path: string, source: string): boolean => readModule(path, source).referenceLoads.length > 0;
const jsonStates = (source: string): boolean => readJson("c.json", source).states.length > 0;
const jsonBlocks = (source: string): boolean => readJson("c.json", source).blocks.length > 0;
/** B3's judge over one manifest text (the path comes first, so no literal naming either package sits in a load position here). */
const namesEither = (path: string, source: string): boolean => MANIFEST.test(path) && (SDK_FAMILY.test(source) || REFERENCE_FAMILY.test(source));

/** A tier file's registered rows (it/test calls with a literal title) and the literals in it that name a claim of (b) or (c). */
function tierReading(path: string, source: string): { titles: string[]; claims: string[] } {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const titles: string[] = [];
  const claims: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ["it", "test"].includes(node.expression.text)) {
      const title = node.arguments[0] === undefined ? undefined : fold(node.arguments[0]);
      if (title !== undefined) titles.push(title);
    }
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (CLAIM_FAMILY.test(node.text)) claims.push(`${path}: ${node.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { titles, claims };
}
const claimsIn = (source: string): boolean => tierReading("t.test.ts", source).claims.length > 0;

const INVENTORY_LABEL = "distinctive content-state spellings outside the exemptions (the trigger's inventory)";
const DERIVATION_LABEL = "STATE_FAMILY reads exactly the states no judged module spells";
/** A derivation red names at most this many sites per state, then how many more spell it. */
const SITES_SHOWN = 5;
interface StateDerivation {
  readonly spelledStates: string[];
  readonly distinctive: string[];
  readonly familyCovers: boolean;
  readonly contradictions: string[];
}
/** A1's derivation over a walked tree: the bead row's six states (the frozen-shape case reads them) minus those its judged modules
 * spell are the distinctive ones, and STATE_FAMILY must read exactly those. Each contradiction names its state with the sites
 * that spell it, or says no judged module spells it. */
function deriveStates(tree: TreeReading): StateDerivation {
  const readings = [...tree.modules.values()];
  const spelledStates = CONTENT_STATES.filter(word => readings.some(reading => reading.words.has(word)));
  const distinctive = CONTENT_STATES.filter(word => !spelledStates.includes(word));
  const familyCovers = distinctive.length > 0 && distinctive.every(word => STATE_FAMILY.test(word)) && spelledStates.every(word => !STATE_FAMILY.test(word));
  const sitesOf = (word: string): string => {
    const sites = readings.flatMap(reading => reading.stateSites.get(word) ?? []);
    const more = sites.length > SITES_SHOWN ? ` and ${sites.length - SITES_SHOWN} more` : "";
    return `${sites.slice(0, SITES_SHOWN).join("; ")}${more}`;
  };
  const contradictions = [
    ...spelledStates.filter(word => STATE_FAMILY.test(word)).map(word => `${word} is spelled at ${sitesOf(word)}, so it is not distinctive, yet STATE_FAMILY reads it`),
    ...distinctive.filter(word => !STATE_FAMILY.test(word)).map(word => `${word} is spelled by no judged module, so it is distinctive, yet STATE_FAMILY does not read it`),
    ...(distinctive.length === 0 ? ["no content state is distinctive"] : []),
  ];
  return { spelledStates, distinctive, familyCovers, contradictions };
}
interface StatesJudged extends StateDerivation {
  readonly modules: string[];
  readonly jsonFiles: string[];
}
/** A1's judging of a walked tree, in this order: the trigger's inventory first, so a name-like spelling reds with its file and
 * line, then the derivation, whose red names the sites of each state it contradicts (a spelling the inventory does not judge,
 * prose among them) or the state no judged module spells (F1). It throws at the first failure; A1's judgingControls read which
 * judgment failed first and what its red names. */
function judgeStates(tree: TreeReading): StatesJudged {
  const modules = [...tree.modules.values()].flatMap(reading => reading.states);
  const jsonFiles = [...tree.json.values()].flatMap(reading => reading.states);
  expect({ modules, jsonFiles }, `${INVENTORY_LABEL}: ${[...modules, ...jsonFiles].join("; ") || "none"}`).toStrictEqual({ modules: [], jsonFiles: [] });
  const derivation = deriveStates(tree);
  expect(derivation.familyCovers, `${DERIVATION_LABEL} (distinctive: ${derivation.distinctive.join(", ") || "none"}): ${derivation.contradictions.join(" | ")}`).toBe(true);
  return { modules, jsonFiles, ...derivation };
}
/** Which of A1's judgments fails first over a planted tree, and whether its red names `needle`: "quiet" when both hold. */
function stateRed(files: Readonly<Record<string, string | null>>, needle: string): string {
  try {
    judgeStates(plantedTree(files));
    return "quiet";
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const first = message.startsWith(INVENTORY_LABEL) ? "inventory" : message.startsWith(DERIVATION_LABEL) ? "derivation" : "other";
    return `${first}:${message.includes(needle) ? "named" : "unnamed"}`;
  }
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached with the assertions its case has made: only a case that ran to its end returns through
 * here, and the roster's reached list pins each count, so a pin body hollowed to return its witness without its own assertions
 * reds (F2 rider P2). */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const floors = floorsOf(tree);
    expect(floors, `files ${tree.walk.files.length}; modules src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}; JSON ${tree.json.size}`).toStrictEqual({
      files: true,
      src: true,
      test: true,
      qa: true,
      json: true,
    });
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    const walk = { symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable };
    expect(walk, "the walk meets no symlink and no unreadable file").toStrictEqual({ symlinks: [], unreadable: [] });
    // The trigger's inventory, then the derived distinctive pair (judgeStates; the frozen-shape case reads the bead row's states).
    const { spelledStates, distinctive, familyCovers, modules, jsonFiles } = judgeStates(tree);
    const head = "provi";
    const controls = {
      stateLiteral: statesIn("c.ts", 'if (block.status === "provisional") mark(block);\n'),
      recognizingLiteral: statesIn("c.mjs", 'const pending = state === "recognizing";\n'),
      britishSpelling: statesIn("c.ts", 'const pending = state === "recognising";\n'),
      identifier: statesIn("c.ts", "export const isProvisional = (block: { status: string }) => block.status.length > 0;\n"),
      constantCase: statesIn("c.js", "export const PROVISIONAL_MARKER = 1;\n"),
      objectKey: statesIn("c.ts", "const flags = { provisional: true };\n"),
      tokenTemplate: statesIn("c.ts", "const label = `provisional`;\n"),
      punctuated: statesIn("c.ts", 'const label = "(provisional)";\n'),
      folded: statesIn("c.ts", `const word = "${head}" + "sional";\n`),
      foldedTemplate: statesIn("c.ts", `const word = \`recog${"$"}{"niz"}ing\`;\n`),
      escaped: statesIn("c.ts", 'const word = "\\u0070rovisional";\n'),
      regex: statesIn("c.ts", "const pending = /recognizing|provisional/;\n"),
      adverb: statesIn("c.ts", 'const how = "provisionally";\n'),
      jsonValue: jsonStates('{"blocks":[{"id":"b1","state":"provisional"}]}'),
      jsonKey: jsonStates('{"recognizing":1}'),
      jsonUnparsed: jsonStates('{"state": "provisional",}'),
      comment: statesIn("c.ts", "// a provisional block\nexport {};\n"),
      proseLiteral: statesIn("c.ts", 'const note = "this document supersedes provisional naming";\n'),
      proseTemplate: statesIn("c.ts", "const label = `a provisional block`;\n"),
      jsonProse: jsonStates('{"quote":"This document supersedes provisional naming in older plans"}'),
      spacedList: statesIn("c.ts", 'const states = "recognizing provisional complete";\n'),
      commonStates: statesIn("c.ts", 'const settled = ["complete", "validated", "invalid", "aborted"];\n'),
      jsonCommon: jsonStates('{"status":"complete"}'),
      composed: statesIn("c.ts", `const head = "${head}";\nconst word = head + "sional";\n`),
      joined: statesIn("c.ts", `const word = ["${head}", "sional"].join("");\n`),
      lookalike: statesIn("c.ts", `const word = "pr${CYRILLIC_O}visional";\n`),
      invisible: statesIn("c.ts", `const word = "${head}${ZERO_WIDTH_SPACE}sional";\n`),
      rot13: statesIn("c.ts", 'const word = "cebivfvbany";\n'),
      nearMiss: statesIn("c.ts", 'const a = "provision";\nconst b = "recognize";\nconst c = "provisions";\n'),
    };
    const planted = plantedTree({
      "src/blocks.ts": 'export const PENDING = "provisional";\n',
      "test/fixtures/stream.json": '{"state":"recognizing"}\n',
      "nested/node_modules/pkg/index.js": "export const provisional = 1;\n",
      "notes/plan.md": "a provisional block\n",
      "notes/plan.txt": "recognizing\n",
      "node_modules/pkg/index.js": "export const provisional = 1;\n",
      "dist/index.js": "export const provisional = 1;\n",
      ".beads/issues.jsonl": '{"title":"provisional"}\n',
      ".forge/report.json": '{"name":"provisional"}\n',
      "build/blocks.ts": "export const provisional = 1;\n",
      "coverage/blocks.ts": "export const provisional = 1;\n",
      "scripts/stream.sh": "PROVISIONAL=1\n",
      "config/stream.toml": 'state = "provisional"\n',
      "config/stream.yml": "state: recognizing\n",
      "config/stream.yaml": "state: provisional\n",
      "data/blocks.jsonl": '{"state":"provisional"}\n',
      "notes/STATE": "provisional\n",
      "src/link.ts": null,
    });
    const flaggedIn = (path: string): boolean =>
      planted.walk.symlinks.includes(path) || (planted.modules.get(path)?.states.length ?? 0) > 0 || (planted.json.get(path)?.states.length ?? 0) > 0;
    const walkControls = Object.fromEntries(
      [
        "src/blocks.ts",
        "test/fixtures/stream.json",
        "nested/node_modules/pkg/index.js",
        "notes/plan.md",
        "notes/plan.txt",
        "node_modules/pkg/index.js",
        "dist/index.js",
        ".beads/issues.jsonl",
        ".forge/report.json",
        "build/blocks.ts",
        "coverage/blocks.ts",
        "src/link.ts",
      ].map(path => [path, flaggedIn(path)]),
    );
    // R-PROSE's unjudged extensions (F3): each planted file is walked and stays quiet.
    const unjudgedControls = Object.fromEntries(
      ["scripts/stream.sh", "config/stream.toml", "config/stream.yml", "config/stream.yaml", "data/blocks.jsonl", "notes/STATE"].map(path => [
        path,
        `${planted.walk.files.includes(path) ? "walked" : "unwalked"}:${flaggedIn(path) ? "flagged" : "quiet"}`,
      ]),
    );
    // judgeStates' order and messages (F1): which judgment reds first over a planted tree, and whether its red names the site.
    const settled = { "src/settled.ts": 'export const SETTLED = ["complete", "validated", "invalid", "aborted"];\n' };
    const judgingControls = {
      quiet: stateRed(settled, ""),
      exactSpelling: stateRed({ ...settled, "src/blocks.ts": 'export const PENDING = "provisional";\n' }, "src/blocks.ts:1"),
      proseSpelling: stateRed({ ...settled, "src/notes.ts": 'export const NOTE = "a block still recognizing input";\n' }, "src/notes.ts:1"),
      unspelledState: stateRed({ "src/settled.ts": 'export const SETTLED = ["complete", "validated", "invalid"];\n' }, "aborted"),
    };
    return done("A1", {
      floors,
      anchorsWalked: tree.anchorsWalked,
      walk,
      spelledStates,
      distinctive,
      familyCovers,
      modules,
      jsonFiles,
      controls,
      walkControls,
      unjudgedControls,
      judgingControls,
    });
  },
  A2: () => {
    const tree = liveTree();
    const modules = [...tree.modules.values()].flatMap(reading => reading.blocks);
    const jsonFiles = [...tree.json.values()].flatMap(reading => reading.blocks);
    expect({ modules, jsonFiles }, "streaming-block names outside the exemptions").toStrictEqual({ modules: [], jsonFiles: [] });
    const controls = {
      typeName: blocksIn("c.ts", "type StreamingBlock = { id: string };\n"),
      parserFactory: blocksIn("c.ts", "export function createBlockParser() {}\n"),
      parseStatus: blocksIn("c.ts", "const status = block.parseStatus;\n"),
      contentState: blocksIn("c.mjs", 'const key = "content-state";\n'),
      snakeCase: blocksIn("c.js", "const stream_blocks = [];\n"),
      suffix: blocksIn("c.ts", "const provisionalSuffix = text.slice(end);\n"),
      importBinding: blocksIn("c.ts", 'import { StreamBlock } from "./parser.js";\n'),
      tokenLiteral: blocksIn("c.ts", 'const kind = "parsed_blocks";\n'),
      jsonKey: jsonBlocks('{"parseStatus":"complete"}'),
      jsonValue: jsonBlocks('{"kind":"streaming-block"}'),
      proseLiteral: blocksIn("c.ts", 'const note = "parsed blocks become components";\n'),
      claudeContentBlocks: blocksIn("c.ts", 'for (const block of message.content) if (block.type === "tool_use") calls++;\n'),
      beadsDependency: blocksIn("c.ts", "const blocking = rawType === 'blocks';\n"),
      upstreamBlocker: blocksIn("c.ts", 'const note = "upstream blocker reporting";\n'),
      separateWords: blocksIn("c.ts", "const stream = open();\nconst blocks = [];\n"),
      markdownComponent: blocksIn("c.ts", 'import { Markdown } from "@earendil-works/pi-tui";\nconst md = new Markdown(text, 1, 0, theme);\n'),
      passthrough: blocksIn("c.ts", "for (const part of reading.output.segments) show(part.state);\n"),
      renamedBinding: blocksIn("c.ts", 'import { createSegments } from "md-segments";\nconst parts = createSegments(text);\n'),
    };
    return done("A2", { modules, jsonFiles, controls });
  },
  A3: () => {
    const tree = liveTree();
    const readers = NEAREST_READERS.map(([path, kind, token]) => {
      const reading = tree.modules.get(path);
      const reached = reading !== undefined && (kind === "identifier" ? reading.identifiers.has(token) : reading.specifiers.includes(token));
      const judged = tree.judged.includes(path);
      const quiet = reading !== undefined && reading.states.length + reading.blocks.length + reading.sdkLoads.length + reading.referenceLoads.length === 0;
      return { path, token, reached, judged, quiet };
    });
    expect(
      readers.filter(reader => !(reader.reached && reader.judged && reader.quiet)),
      "every nearest block reader is reached, judged and quiet",
    ).toEqual([]);
    return done("A3", { readers });
  },
  A4: () => {
    const tree = liveTree();
    const exemptWalked = EXEMPT.every(file => tree.walk.files.includes(file) && !tree.judged.includes(file));
    const self = readModule(SELF, readFileSync(join(REPO, SELF), "utf8"));
    const roster = readJson(ROSTER_FILE, readFileSync(join(REPO, ROSTER_FILE), "utf8"));
    const reading = {
      exemptWalked,
      selfStates: self.states.length > 0,
      selfBlocks: self.blocks.length > 0,
      rosterStates: roster.states.length > 0,
      rosterBlocks: roster.blocks.length > 0,
      selfLoads: self.sdkLoads.length + self.referenceLoads.length > 0,
    };
    expect(reading, "each exemption carries real spellings of both families (so lifting it reds A1 and A2) and the census loads neither package").toStrictEqual({
      exemptWalked: true,
      selfStates: true,
      selfBlocks: true,
      rosterStates: true,
      rosterBlocks: true,
      selfLoads: false,
    });
    return done("A4", { exempt: [...EXEMPT], ...reading });
  },
  B1: () => {
    const tree = liveTree();
    const sdkLoads = [...tree.modules.values()].flatMap(reading => reading.sdkLoads);
    const specifierAnchor = tree.modules.get("src/workbench/providers/reactivefiber.ts")?.specifiers.includes("node:child_process") === true;
    expect(specifierAnchor, "the specifier reader reads the provider's node:child_process import").toBe(true);
    expect(sdkLoads, `${SDK} loads outside the exemptions`).toEqual([]);
    const controls = {
      contextBlockParser: loadsSdk("c.ts", `import { parseContextBlock } from "${SDK}";\n`),
      streamingSubpath: loadsSdk("c.ts", `import { createBlockStream } from "${SDK}/streaming";\n`),
      typeOnly: loadsSdk("c.ts", `import type { ContextBlock } from "${SDK}";\n`),
      exportFrom: loadsSdk("c.ts", `export * from "${SDK}";\n`),
      dynamicImport: loadsSdk("c.mjs", `const sdk = await import("${SDK}");\n`),
      require: loadsSdk("c.cjs", `const sdk = require("${SDK}");\n`),
      requireResolve: loadsSdk("c.cjs", `const where = require.resolve("${SDK}");\n`),
      importEquals: loadsSdk("c.ts", `import sdk = require("${SDK}");\n`),
      importType: loadsSdk("c.ts", `type Sdk = typeof import("${SDK}");\n`),
      npmSpecifier: loadsSdk("c.ts", `import { parseContextBlock } from "npm:${SDK}@0.1.668";\n`),
      jsrSpecifier: loadsSdk("c.ts", `import { parseContextBlock } from "jsr:${SDK}@0.1.668";\n`),
      urlSpecifier: loadsSdk("c.ts", `import { parseContextBlock } from "https://esm.sh/${SDK}@0.1.668";\n`),
      createdRequire: loadsSdk("c.mjs", `const sdk = createRequire(import.meta.url)("${SDK}");\n`),
      newUrl: loadsSdk("c.ts", `const where = new URL("npm:${SDK}@0.1.668", import.meta.url);\n`),
      foldedSpecifier: loadsSdk("c.mjs", 'const sdk = await import("@reactive-fiber/" + "tsx");\n'),
      escapedSpecifier: loadsSdk("c.ts", 'import { parseContextBlock } from "@reactive-fiber/\\u0074sx";\n'),
      jsxPragma: loadsSdk("c.tsx", `/** @jsxImportSource ${SDK} */\nexport const C = () => <div />;\n`),
      otherPackage: loadsSdk("c.ts", `import { x } from "${SDK}-tools";\n`),
      composedSpecifier: loadsSdk("c.mjs", `const name = "tsx";\nconst sdk = await import(\`@reactive-fiber/${"$"}{name}\`);\n`),
      mentionOnly: loadsSdk("c.ts", `const label = "${SDK}";\n`),
    };
    return done("B1", { specifierAnchor, sdkLoads, controls });
  },
  B2: () => {
    const tree = liveTree();
    const referenceLoads = [...tree.modules.values()].flatMap(reading => reading.referenceLoads);
    expect(referenceLoads, `${REFERENCE} loads outside the exemptions`).toEqual([]);
    const controls = {
      bare: loadsReference("c.ts", `import { useLLMOutput } from "${REFERENCE}";\n`),
      react: loadsReference("c.ts", 'import { useLLMOutput } from "@llm-ui/react";\n'),
      markdown: loadsReference("c.ts", 'import { markdownLookBack } from "@llm-ui/markdown";\n'),
      requireCode: loadsReference("c.cjs", 'const code = require("@llm-ui/code");\n'),
      dynamicJson: loadsReference("c.mjs", 'const parsers = await import("@llm-ui/json");\n'),
      typeCsv: loadsReference("c.ts", 'type Csv = typeof import("@llm-ui/csv");\n'),
      npmSpecifier: loadsReference("c.ts", 'import { useLLMOutput } from "npm:@llm-ui/react@0.13.3";\n'),
      urlSpecifier: loadsReference("c.ts", 'import { markdownLookBack } from "https://esm.sh/@llm-ui/markdown@0.13.3";\n'),
      versioned: loadsReference("c.ts", `import { useLLMOutput } from "${REFERENCE}@0.13.3";\n`),
      scopedFork: loadsReference("c.ts", `import { useLLMOutput } from "@acme/${REFERENCE}";\n`),
      folded: loadsReference("c.mjs", 'const ui = await import("@llm-" + "ui/react");\n'),
      kit: loadsReference("c.ts", `import { x } from "${REFERENCE}-kit";\n`),
      prefixed: loadsReference("c.ts", `import { x } from "my-${REFERENCE}";\n`),
      scopeLookalike: loadsReference("c.ts", 'import { x } from "@llm-uix/react";\n'),
      composedReference: loadsReference("c.mjs", `const scope = "@llm-ui";\nconst ui = await import(\`${"$"}{scope}/react\`);\n`),
      renamedPackage: loadsReference("c.ts", 'import { createSegments } from "md-segments";\n'),
      mentionOnly: loadsReference("c.ts", `const label = "${REFERENCE}";\n`),
    };
    return done("B2", { referenceLoads, controls });
  },
  B3: () => {
    const tree = liveTree();
    const manifestsFloorMet = tree.manifests.length >= FLOORS.manifests && tree.manifests.includes("package.json") && tree.manifests.includes("package-lock.json");
    expect(manifestsFloorMet, `manifests read: ${tree.manifests.join(", ")}`).toBe(true);
    expect(tree.manifestHits, `manifests naming ${SDK} or ${REFERENCE}`).toEqual([]);
    const controls = {
      sdkDependency: namesEither("package.json", `{"dependencies":{"${SDK}":"0.1.668"}}`),
      referenceDependency: namesEither("package.json", '{"dependencies":{"@llm-ui/react":"0.13.3"}}'),
      referenceAlias: namesEither("package.json", '{"dependencies":{"md":"npm:@llm-ui/markdown@0.13.3"}}'),
      lockEntry: namesEither("package-lock.json", '{"packages":{"node_modules/@llm-ui/react":{"version":"0.13.3"}}}'),
      importMap: namesEither("import_map.json", `{"imports":{"${SDK}":"npm:${SDK}@0.1.649"}}`),
      kitDependency: namesEither("package.json", `{"dependencies":{"${REFERENCE}-kit":"1.0.0"}}`),
      manifestPaths: ["package.json", "examples/app/package-lock.json", "npm-shrinkwrap.json", "deno.jsonc", "import_map.json", "tsconfig.base.json", "jsconfig.json", "notes.json", "package.json.md"].filter(path => MANIFEST.test(path)),
    };
    return done("B3", { manifestsFloorMet, manifestHits: tree.manifestHits, controls });
  },
  C1: () => {
    const { producer } = ROSTER;
    const program = producerPin("program");
    const distribution = producerPin("distribution");
    const spelled = producer.pins.filter(pin => pin.spelling.recognizing + pin.spelling.reference + pin.spelling.streamingBlockNames > 0).map(pin => pin.label);
    const referenceDependencies = producer.pins.flatMap(pin => pin.dependencies.filter(name => REFERENCE_FAMILY.test(name)));
    const sites = producer.pins.flatMap(pin => [...pin.docSites.states, ...pin.docSites.reference, ...pin.docSites.workPackage]);
    const docsOnly = sites.length > 0 && sites.every(site => site.startsWith("docs/"));
    const streamEntries = [...producer.pins.flatMap(pin => pin.exports), ...Object.keys(producer.importMap)].filter(entry => STREAM_ENTRY.test(entry));
    const distributionPinned =
      producer.distribution.source === `ReactiveFiberTSXSDK ${distribution.sha}` &&
      producer.distribution.version === distribution.version &&
      producer.importMap[SDK] === `npm:${SDK}@${distribution.version}`;
    // The pinned version's only block parser: the same context-block exports and the same context-document sites at both pins.
    const sameBlockParser =
      JSON.stringify(program.blockExports) === JSON.stringify(distribution.blockExports) &&
      program.blockExports.includes("parseContextBlock") &&
      JSON.stringify(program.otherSense.blockParserSites) === JSON.stringify(distribution.otherSense.blockParserSites) &&
      program.otherSense.blockParserSites.length > 0;
    const sha12 = program.sha.slice(0, 12);
    const beadSaysUnshipped = saysUnshipped(readBeadRow().notes, sha12);
    const parserShipped = spelled.length > 0 || referenceDependencies.length > 0 || !docsOnly || streamEntries.length > 0;
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the gating artifact unshipped`).toBe(true);
    expect(distributionPinned, "the distribution rf packages is the measured distribution pin").toBe(true);
    expect(sameBlockParser, "both pins carry the same one block parser, the context-block one").toBe(true);
    expect(parserShipped, "the parser shipped: (b) and (c) are owed with this re-measure (wb-if7q.5)").toBe(false);
    // The filing's own gating line is read (F2 rider P9): a quoted, a second or a continued sentence never reads as the filing.
    const sentence = `Shipped: no - git grep ${REFERENCE} over src/ python/ at ${sha12}: 0 files.`;
    const controls = {
      filing: saysUnshipped(`Quote: 'a parser'.\nGating: the parser work package. ${sentence}\nAcceptance: (a) none.`, sha12),
      quotedLater: saysUnshipped(`Gating: the parser work package. Shipped: yes - at a later pin.\nA later note quotes '${sentence}'`, sha12),
      secondGatingLine: saysUnshipped(`Gating: the parser work package. Shipped: yes - at a later pin.\nGating: re-read. ${sentence}`, sha12),
      continuedLine: saysUnshipped(`Gating: the parser work package. ${sentence} Reopened: the parser shipped.`, sha12),
      otherPin: saysUnshipped(`Gating: the parser work package. Shipped: no - git grep ${REFERENCE} over src/ python/ at 000000000000: 0 files.`, sha12),
    };
    return done("C1", { parserShipped, spelled, referenceDependencies, docsOnly, streamEntries, distributionPinned, sameBlockParser, beadSaysUnshipped, controls });
  },
  C2: () => {
    const include = (rfTsxConfig as unknown as { test?: { include?: readonly string[] } }).test?.include ?? [];
    const command = new RegExp(`^\\[build\\.commands\\.${TIER_COMMAND}\\]\\ncommand = "[^"\\n]*--config vitest\\.rf-tsx\\.config\\.ts[^"\\n]*"$`, "m").test(readFileSync(join(REPO, "forge.toml"), "utf8"));
    const readings = include.map(path => tierReading(path, readFileSync(join(REPO, path), "utf8")));
    const rowsRegistered = include.length > 0 && readings.every(reading => reading.titles.length > 0);
    const claims = readings.flatMap(reading => reading.claims);
    expect(command, `forge.toml runs the tier through ${TIER_COMMAND} with vitest.rf-tsx.config.ts`).toBe(true);
    expect(rowsRegistered, "every tier file registers rows the reader reads").toBe(true);
    expect(claims, "tier literals claiming (b) or (c) before the parser ships").toEqual([]);
    const controls = {
      cutRow: claimsIn('it("a stream cut mid code fence admits no action", () => {});\n'),
      stateRow: claimsIn('it("provisional blocks carry their marker", () => {});\n'),
      chunkLabel: claimsIn('expect(reading, "duplicate chunks stay non-validated").toBe(true);\n'),
      fieldName: claimsIn('const field = "stream sequence";\n'),
      orderRow: claimsIn('test("out-of-order deltas yield no effect", () => {});\n'),
      previewRow: claimsIn('it("rf renders the operator workspace and Pi reads the preview", () => {});\n'),
    };
    return done("C2", { tierFiles: [...include], command, rowsRegistered, claims, controls });
  },
};

/** A describe title: the label with both families masked, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(BLOCK_TEXT, "<parser noun>").replace(STATE_TEXT, "<state word>")}`;

describe("wb-if7q.5 gated TSX parser consumer census (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R6, absent-today leg)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      sdk: SDK,
      reference: REFERENCE,
      contentStates: CONTENT_STATES,
      scan: SCAN,
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({
      bead: ROSTER.bead,
      sdk: ROSTER.sdk,
      reference: ROSTER.reference,
      contentStates: [...ROSTER.contentStates],
      scan: ROSTER.scan,
      residuals: [...ROSTER.residuals],
    });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^,(]+?) \(/.exec(bead.title)?.[1] ?? "";
    const quote = quoteOf(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["C"], ["A"]]);
    expect(clauses[0], "acceptance (a) counts importers of block-parser types").toContain("0 importers of any block-parser type");
    expect(quote, "the filing's quote, citation and merged-pin content states").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation, states: [...CONTENT_STATES] });
    expect(ROSTER.quote, "the quote names the parser's reference").toContain(`${REFERENCE}-inspired`);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${producerPin("program").sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
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
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.slice(0, entry.indexOf(":"))), "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED, "every pin's case reached its end with the assertion count the roster pins").toEqual([...ROSTER.reached]);
    expect(
      [...suites, ...titles].filter(name => STATE_FAMILY.test(wordsOf(name)) || BLOCK_FAMILY.test(wordsOf(name))),
      "registered titles spelling a judged family",
    ).toEqual([]);
  });
});
