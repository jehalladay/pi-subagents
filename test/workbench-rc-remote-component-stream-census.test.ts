/**
 * wb-5ltg.3 (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R3, program-triage-2026-10-22): the absent-today leg, with the adoption
 * contract armed. Statement (bead notes, full form): "If Pi ever consumes a remote component stream (gated RC-IF-04
 * installed-host condition + RC-IF-01 crosswalk; unshipped at 640a3b579a95), Pi resolves component identities and actions only
 * against its own registry (unknown IDs refused), refuses any executable callback in the stream (never deserialized, executed or
 * rendered), and applies strict schema-version checks preserving `null` semantics and key ordering, surfacing error cases as
 * typed refusals" (ReactiveComponentsSDK docs/programs/native-interface-component-contract-2026-10-21/README.md:15@640a3b579a95).
 * Acceptance (owner filing, verbatim; the labels of rows B, C, D and A): "(a) adoption fixture: an unknown component or action id
 * is refused, never rendered or executed; resolution reads only Pi's registry, never a stream-supplied resolver; (b) an
 * executable/callback field is refused typed, nothing evaluated, forwarded or rendered; (c) unknown/mismatched schema version
 * refused typed, null kept as null, key order kept on round-trip; mutants accepting an unknown schema version, coercing null, or
 * deserializing a callback fail; (d) today: zero remote-stream consumer sites in Pi."
 *
 * Pi consumes no remote component output today, and nothing could reach it: the producer mode (RC-IF-04, README.md:24) waits for
 * installed Web/TUI hosts, none exists, and the Element/RftsxElement crosswalk (RC-IF-01, README.md:21) is not shipped. The only
 * ReactiveComponents material Pi reads arrives inside an rf context.render envelope (the reactivefiber provider), as context, not
 * as components. So the trigger has not fired and (d) holds by absence; (a) to (c) cannot be proved on a consumer that does not
 * exist, so they are ARMED: a test-side reference adoption, built only from Pi's own seams (two CapabilityRegistry instances, one
 * for component identities and one for action ids, resolved separately as README.md:15 says; validatedCapabilityJson, the JSON
 * boundary every registered capability output crosses), runs a constructed stream over a judge, and the judge refuses each named
 * mutant of it. A future consumer is the thing that must pass the same judge; this file pins the judge, not a consumer.
 *  A, the trigger and acceptance (d). A1 no judged module (identifiers and regular expressions always; string and template
 *    literals cooked by the compiler, constant-folded literals and JSX text when NAME-LIKE, no white space once trimmed;
 *    comments never) and no judged JSON file (keys always, name-like string values; a file that does not parse is read token by
 *    token) names REMOTE_FAMILY - a remote component, element, producer or stream, a component stream, an RftsxElement, a
 *    crosswalk or a callback serialization - and the walk reaches its floors and anchors, meets no symlink (refused, never
 *    followed) and no unreadable file; every site found is printed with its file and line. A2 no judged module loads or runs the
 *    ReactiveComponents distribution (RC_FAMILY: vibranium-reactive-components or its reactive_components module, through an
 *    import or export declaration, an import-equals require, an import type, the first argument of any call or new expression,
 *    or the module after a `-m` in an array literal) and no manifest (MANIFEST) names it. A3 the nearest readers Pi has (its own
 *    registry, the rf preview carrier and observer, its own TUI card) are reached and quiet, and the instrument rule is
 *    load-bearing: this file and its roster are census instruments (CENSUS_INSTRUMENT), they spell the family, and every name
 *    found inside an instrument sits in an instrument. A4 the gating artifact is measured unshipped: the roster's producer facts
 *    (two shas of the local ReactiveComponentsSDK checkout) agree with the bead row's Gating and Shipped sentences.
 *  B, acceptance (a). B1 the reference adoption over Pi's registries: known frames are admitted and rendered once; an unknown
 *    component id, an unknown action id, an action id in the component slot, a component id in the action slot and a frame
 *    carrying its own resolver are each refused typed, nothing rendered or executed; the adoption's unknown-id refusal is the
 *    registry's own (CapabilityRegistry.invoke refuses the same id with the same category and message before any provider runs).
 *    B2 the judge passes the reference and fails M-RENDER-UNKNOWN, M-STREAM-RESOLVER, M-EXECUTE-ACTION and M-UNTYPED.
 *  C, acceptance (b). C1 an in-process function (refused typed by validatedCapabilityJson), an undeclared field and an undeclared
 *    prop carrying callback source text, and a callback-tagged object in a typed prop are each refused typed: no callback runs,
 *    nothing is rendered and no refused frame is forwarded. C2 the judge fails M-FORWARD-UNDECLARED, M-FUNCTION-PASS and
 *    M-CALLBACK-REVIVE.
 *  D, acceptance (c). D1 a schema version that is unknown, a string, missing or null is refused typed; a null in a nullable prop
 *    is kept as null and a null in a non-nullable prop is refused, never coerced; every admitted frame re-encodes to its input
 *    bytes; an integer-like key is refused typed, because a JS object cannot keep its order (measured: validatedCapabilityJson and
 *    JSON.parse both move it first); a frame that is not JSON is refused typed. D2 the judge fails the three mutants the filing
 *    names (BEAD_MUTANTS, read from clause (c)) and M-SORTED-KEYS.
 * THE WALK: every regular file below the repository root, at any depth, in name order; the root entries SKIPPED_ROOTS (git's data,
 * the tracker export - bead rows quote the statement -, installed dependencies, build, coverage and Forge outputs) are skipped at
 * the root only. Modules (MODULE_EXTENSIONS) and JSON files (JSON_EXTENSIONS) are judged; prose is walked and never judged. It
 * reads the working tree, so an untracked plant is read.
 * MEASURED PRODUCER FACTS (roster `producer`; read-only git show, ls-tree and grep -l -i -E over src/ at two shas of the local
 * ReactiveComponentsSDK checkout, no fetch, 2026-10-23): the program pin 640a3b579a95 (56 src files) and origin/master 01187eb645a5
 * (65, 21 commits later) carry the same README blob ea960adb38e0 and the same distribution name; at both, src/ spells no remote
 * stream, no remote component, no RftsxElement and no callback serialization. Other senses, recorded: `callback` is the host's
 * in-process declassifier (data_output.py) and a comment (render_context.py), `resolver` a lazy-value or transaction resolver
 * (fakes.py, renderer_conformance.py, snapshot_identity.py), schema_version the shipped ContextDocument's literal (assembly.py:273,
 * :281 at master). DRIFT, recorded: at master `crosswalk` is spelled by 3 files, the RC-UI-01-a portable-block crosswalk
 * (schema reactive-components/portable-block/v1: the ContextBlock JSON versus fiber-native codec table), not RC-IF-01's Element
 * versus RftsxElement crosswalk. Neither ReactiveWebInterfaceSDK nor ReactiveTUIInterfaceSDK has a checkout. The roster reader
 * refuses a producer object whose keys differ from the measured set, so a re-measure under a misspelled key never reads as 0.
 * OVER-READ (disclosed): an identifier or a name-like literal using a family word in another sense - an rf TSX error code such
 * as RFTSX_ELEMENT_INVALID_KEY (a queued sibling census's roster quotes these), or a crosswalk table of some other pair - is
 * read as a finding; none exists outside the instruments today, and such a finding is re-judged, never silenced.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the residual families, the mutant assignment and the registered test titles are held to the
 * out-of-file roster (test/fixtures/rc-remote-component-stream-roster.json). OUTSIDE ANCHOR: the owner filing's row in the
 * tracked bead export (.beads/issues.jsonl, row wb-5ltg.3): every acceptance clause sits verbatim in exactly one row label and the
 * trigger in row A's, every row carries one, the quote and citation equal the roster's, A4 reads its Gating, Shipped and
 * Authority sentences, and D2 reads its mutant list from clause (c), so a row or a named mutant removed from every literal of this
 * file and the roster still reds. Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead row
 * anchors rows, clauses and the named mutants, not pins); and the armed rows prove the judge, not a Pi consumer (none exists).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); no registered test or suite title spells the family (describe
 * titles mask it).
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a name or a specifier assembled at runtime
 * (A1 composed; A2 composedSpecifier); R-RENAMED a consumer bound under names outside the family (A1 renamed); R-PROSE prose
 * files, comments and literals or JSON values with white space inside (A1 comment, proseLiteral, jsonProse, the planted
 * docs/notes.md); R-INSTRUMENT census instruments, walked and load-judged but never name-judged (A1 the planted
 * test/x-census.test.ts and test/fixtures/x-roster.json); R-OUTSIDE a file below a skipped root entry (A1 planted node_modules/,
 * dist/, .beads/, .forge/, build/ and coverage/); R-LOOKALIKE a non-ASCII look-alike letter (A1 lookalike); R-COMMAND-STRING a
 * distribution run carried inside a shell command string that is not a call's first argument (A2 shellArgument).
 * Display paths added: none. Test-only: it spawns nothing; the controls plant files in makeScratch scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError, type CapabilityErrorCategory, CapabilityRegistry, validatedCapabilityJson } from "../src/workbench/capability-registry.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-rc-remote-component-stream-census.test.ts";
const ROSTER_FILE = "test/fixtures/rc-remote-component-stream-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-5ltg.3";
/** A1: what a remote-output consumer names (README.md:15, :21, :24), read over a token's words (wordsOf). */
const REMOTE_FAMILY = /\b(?:remote (?:components?|elements?|producers?|streams?)|components? streams?|rftsx elements?|crosswalks?|callback seriali[sz]ations?)\b/;
/** A2: the ReactiveComponents distribution and its Python module, in any load or `-m` position. */
const RC_DISTRIBUTION = "vibranium-reactive-components";
const RC_MODULE = "reactive_components";
const RC_FAMILY = /(?<![\w-])(?:vibranium-reactive-components|reactive[_-]components)(?![\w-])/i;
/** Census instruments: walked and judged for loads (A2), never for names (A1) - a census's needles are not consumption. */
const CENSUS_INSTRUMENT = /^test\/(?:[^/]+-census\.test\.ts|fixtures\/[^/]+-roster\.json)$/;
/** A mask for describe titles, so a report holding this file's titles stays quiet. */
const REMOTE_TEXT = /remote[\s_.-]*(?:components?|elements?|producers?|streams?)|components?[\s_.-]*streams?|rftsx[\s_.-]*elements?|crosswalks?|callback[\s_.-]*seriali[sz]ations?/gi;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JSON_EXTENSIONS = [".json"];
const MANIFEST =
  /(?:^|\/)(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|deno\.jsonc?|import[-_]map\.json|[tj]sconfig[^/]*\.json|pyproject\.toml|requirements[^/]*\.txt)$/i;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** Each floor sits below the count measured at base b1ab992 (859 files; src 115, test 459, qa 62 modules; 67 JSON; 4 manifests). */
const FLOORS = { files: 760, modules: { src: 100, test: 400, qa: 55 }, json: 55, manifests: 4 };
/** Files the walk must reach, each with a token its bytes carry: a root page, Pi's registry, a qa script, the manifest, a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/capability-registry.ts", "CapabilityRegistry"],
  ["qa/workbench/receipts-index.mjs", "marked"],
  ["package.json", "@tintinweb/pi-subagents"],
  ["media/screenshot.png", "PNG"],
];
/** The nearest readers Pi has, each with the identifier the reader must find in it. */
const NEAREST_READERS: readonly (readonly [string, string])[] = [
  ["src/workbench/capability-registry.ts", "CapabilityRegistry"],
  ["src/workbench/providers/reactivefiber.ts", "REACTIVE_FIBER_CONTRACT_SOURCE"],
  ["src/workbench/reactivefiber-observer.ts", "reactivefiberTopology"],
  ["src/ui/workflow-card.ts", "UNICODE_GLYPHS"],
];
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-RENAMED", "R-PROSE", "R-INSTRUMENT", "R-OUTSIDE", "R-LOOKALIKE", "R-COMMAND-STRING"];
const CYRILLIC_O = String.fromCodePoint(0x043e);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);

/** The adoption fixture: Pi-owned component and action registries, the frame fields README.md:18 lists, one accepted version. */
const ACCEPTED_SCHEMA_VERSION = 1;
const FRAME_FIELDS = ["schema_version", "component", "key", "props", "actions", "bindings"];
type PropType = "string" | "number" | "boolean" | "string?";
const KNOWN_COMPONENTS: Readonly<Record<string, Readonly<Record<string, PropType>>>> = {
  "fixture.card": { title: "string", count: "number", note: "string?" },
  "fixture.list": { label: "string", open: "boolean" },
};
const KNOWN_ACTIONS = ["fixture.select", "fixture.open"];
const CATEGORIES: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const MUTANTS = [
  "M-RENDER-UNKNOWN",
  "M-STREAM-RESOLVER",
  "M-EXECUTE-ACTION",
  "M-UNTYPED",
  "M-FORWARD-UNDECLARED",
  "M-FUNCTION-PASS",
  "M-CALLBACK-REVIVE",
  "M-ANY-VERSION",
  "M-NULL-COERCE",
  "M-SORTED-KEYS",
] as const;
type Mutant = (typeof MUTANTS)[number];
/** Which pin fails which mutants; every mutant is failed by at least one pin. */
const MUTANTS_BY_PIN: Readonly<Record<string, readonly Mutant[]>> = {
  B2: ["M-RENDER-UNKNOWN", "M-STREAM-RESOLVER", "M-EXECUTE-ACTION", "M-UNTYPED"],
  C2: ["M-FORWARD-UNDECLARED", "M-FUNCTION-PASS", "M-CALLBACK-REVIVE"],
  D2: ["M-ANY-VERSION", "M-NULL-COERCE", "M-CALLBACK-REVIVE", "M-SORTED-KEYS"],
};
/** The mutants clause (c) names, by its own phrases. */
const BEAD_MUTANTS: Readonly<Record<string, Mutant>> = {
  "accepting an unknown schema version": "M-ANY-VERSION",
  "coercing null": "M-NULL-COERCE",
  "deserializing a callback": "M-CALLBACK-REVIVE",
};

/** Every scan constant, as the roster holds it. */
const SCAN = {
  remoteFamily: `${REMOTE_FAMILY.source}/${REMOTE_FAMILY.flags}`,
  rcFamily: `${RC_FAMILY.source}/${RC_FAMILY.flags}`,
  rcDistribution: RC_DISTRIBUTION,
  rcModule: RC_MODULE,
  censusInstrument: `${CENSUS_INSTRUMENT.source}/${CENSUS_INSTRUMENT.flags}`,
  manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  jsonExtensions: JSON_EXTENSIONS,
  skippedRoots: SKIPPED_ROOTS,
  floors: FLOORS,
  walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
  nearestReaders: NEAREST_READERS.map(([path, token]) => `${path}:${token}`),
  acceptedSchemaVersion: ACCEPTED_SCHEMA_VERSION,
  frameFields: FRAME_FIELDS,
  knownComponents: Object.keys(KNOWN_COMPONENTS),
  knownActions: KNOWN_ACTIONS,
  mutants: [...MUTANTS],
  mutantsByPin: Object.fromEntries(Object.entries(MUTANTS_BY_PIN).map(([pin, list]) => [pin, [...list]])),
  beadMutants: { ...BEAD_MUTANTS },
};
const FROZEN_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells the judged family";

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
      "(trigger, absent today) If Pi ever consumes a remote component stream: no judged module or JSON file names the remote-output family, nothing loads or runs the ReactiveComponents distribution, the nearest readers are reached and quiet, the instrument rule is load-bearing and the gating artifact is measured unshipped, so (d) today: zero remote-stream consumer sites in Pi",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(a) adoption fixture: an unknown component or action id is refused, never rendered or executed; resolution reads only Pi's registry, never a stream-supplied resolver: armed on a reference adoption over Pi's two registries, whose judge fails each resolution mutant",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) an executable/callback field is refused typed, nothing evaluated, forwarded or rendered: armed through Pi's JSON boundary and the strict frame and prop fields, whose judge fails each callback mutant",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(c) unknown/mismatched schema version refused typed, null kept as null, key order kept on round-trip; mutants accepting an unknown schema version, coercing null, or deserializing a callback fail: armed on the same judge, integer-like keys refused because a JS object cannot keep their order",
    pins: ["D1", "D2"],
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
interface OtherSense {
  readonly callback: readonly string[];
  readonly resolver: readonly string[];
  readonly schemaVersion: readonly string[];
  readonly crosswalk: readonly string[];
}
interface ProducerPin {
  readonly label: string;
  readonly sha: string;
  readonly distribution: string;
  readonly srcFiles: number;
  readonly absent: { readonly [name: string]: number };
  readonly otherSense: OtherSense;
  readonly crosswalkSchema: string | null;
}
interface Producer {
  readonly repo: string;
  readonly measuredUtc: string;
  readonly measure: string;
  readonly readme: { readonly path: string; readonly blob: string; readonly lines: { readonly [line: string]: string } };
  readonly absentPatterns: { readonly [name: string]: string };
  readonly hostCheckouts: { readonly absent: readonly string[]; readonly present: readonly string[] };
  readonly pins: readonly ProducerPin[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
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
function stringMap(value: unknown, field: string): { [key: string]: string } {
  const map = objectOf(value, field);
  if (!Object.values(map).every(item => typeof item === "string")) throw new Error(`roster ${field} must map strings to strings`);
  return Object.fromEntries(Object.entries(map).map(([key, item]) => [key, String(item)]));
}
function producerPinOf(value: unknown, absentNames: readonly string[], field: string): ProducerPin {
  const pin = objectOf(value, field);
  exactKeys(pin, ["label", "sha", "distribution", "srcFiles", "absent", "otherSense", "crosswalkSchema"], field);
  const absent = objectOf(pin.absent, `${field}.absent`);
  exactKeys(absent, absentNames, `${field}.absent`);
  const otherSense = objectOf(pin.otherSense, `${field}.otherSense`);
  exactKeys(otherSense, ["callback", "resolver", "schemaVersion", "crosswalk"], `${field}.otherSense`);
  if (pin.crosswalkSchema !== null && typeof pin.crosswalkSchema !== "string") throw new Error(`roster ${field}.crosswalkSchema must be a string or null`);
  return {
    label: text(pin.label, `${field}.label`),
    sha: text(pin.sha, `${field}.sha`),
    distribution: text(pin.distribution, `${field}.distribution`),
    srcFiles: count(pin.srcFiles, `${field}.srcFiles`),
    absent: Object.fromEntries(absentNames.map(name => [name, count(absent[name], `${field}.absent.${name}`)])),
    otherSense: {
      callback: strings(otherSense.callback, `${field}.otherSense.callback`),
      resolver: strings(otherSense.resolver, `${field}.otherSense.resolver`),
      schemaVersion: strings(otherSense.schemaVersion, `${field}.otherSense.schemaVersion`),
      crosswalk: strings(otherSense.crosswalk, `${field}.otherSense.crosswalk`),
    },
    crosswalkSchema: pin.crosswalkSchema,
  };
}

function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  exactKeys(raw, ["bead", "quote", "citation", "scan", "producer", "residuals", "rows", "tests"], "top level");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  exactKeys(producer, ["repo", "measuredUtc", "measure", "readme", "absentPatterns", "hostCheckouts", "pins"], "producer");
  const readme = objectOf(producer.readme, "producer.readme");
  exactKeys(readme, ["path", "blob", "lines"], "producer.readme");
  const absentPatterns = stringMap(producer.absentPatterns, "producer.absentPatterns");
  const hostCheckouts = objectOf(producer.hostCheckouts, "producer.hostCheckouts");
  exactKeys(hostCheckouts, ["absent", "present"], "producer.hostCheckouts");
  if (!Array.isArray(producer.pins)) throw new Error("roster producer.pins must be a list");
  const absentNames = Object.keys(absentPatterns);
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      repo: text(producer.repo, "producer.repo"),
      measuredUtc: text(producer.measuredUtc, "producer.measuredUtc"),
      measure: text(producer.measure, "producer.measure"),
      readme: { path: text(readme.path, "producer.readme.path"), blob: text(readme.blob, "producer.readme.blob"), lines: stringMap(readme.lines, "producer.readme.lines") },
      absentPatterns,
      hostCheckouts: { absent: strings(hostCheckouts.absent, "producer.hostCheckouts.absent"), present: strings(hostCheckouts.present, "producer.hostCheckouts.present") },
      pins: producer.pins.map((pin: unknown, index: number) => producerPinOf(pin, absentNames, `producer.pins[${index}]`)),
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
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
/** The filing's quote and citation: the first line that opens with a quoted sentence followed by its pin and a Merged note. */
function quoteOf(notes: string): { quote: string | undefined; citation: string | undefined } {
  const match = /^'(.+)' (\S+)\. Merged: /m.exec(notes);
  return { quote: match?.[1], citation: match?.[2] };
}
interface Gating {
  readonly hostQuote: string;
  readonly hostLine: string;
  readonly sha: string;
  readonly names: string[];
  readonly schemaSite: string;
}
/** The filing's Gating line: RC-IF-04's quoted condition and line, then its "Shipped: no" sentence. */
function gatingOf(notes: string): Gating | undefined {
  const match =
    /^Gating: RC-IF-04 '([^']+)' \(README\.md:(\d+)\) \+ RC-IF-01\. Shipped: no - at ([0-9a-f]+) no (.+) code in src \(only schema_version literal: ([^,]+), the shipped ContextDocument\)\.$/m.exec(
      notes,
    );
  if (match === null) return undefined;
  return { hostQuote: match[1] ?? "", hostLine: match[2] ?? "", sha: match[3] ?? "", names: (match[4] ?? "").split(/, | or /), schemaSite: match[5] ?? "" };
}
/** The filing's Authority line: the quoted RC-IF-01 sentence's head and tail around its ellipsis, and the line it cites. */
function authorityOf(notes: string): { head: string; tail: string; line: string } | undefined {
  const match = /^Authority: '(.+?) \.\.\. (.+?)' \(README\.md:(\d+)\)/m.exec(notes);
  return match === null ? undefined : { head: match[1] ?? "", tail: match[2] ?? "", line: match[3] ?? "" };
}
/** The mutants clause (c) names: the phrases between "mutants " and " fail". */
function namedMutants(clause: string): string[] {
  const match = /mutants (.+) fail$/.exec(clause);
  return match === null ? [] : (match[1] ?? "").split(/, or |, /);
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
/** A name-like text: no white space once trimmed. A consumer names a stream or an element this way; prose never is. */
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
  readonly names: string[];
  readonly specifiers: string[];
  readonly loads: string[];
  readonly identifiers: Set<string>;
}
/** One module, parsed under its own script kind: its family names (A1), its load specifiers and `-m` modules, and the
 * distribution loads among them (A2). Comments are never read. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const names: string[] = [];
  const specifiers: string[] = [];
  const identifiers = new Set<string>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  // An identifier or a regex is always judged, a literal only when it is name-like.
  const judge = (node: ts.Node, kind: string, value: string): void => {
    if (!(kind === "identifier" || kind === "regex" || isNameLike(value))) return;
    if (REMOTE_FAMILY.test(wordsOf(value))) names.push(`${path}:${line(node)} ${kind}: ${value}`);
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
    // Any call or new expression's first argument: a dynamic import, require, require.resolve, a command, new URL.
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    // A module run as `-m <module>` in an argument list.
    if (ts.isArrayLiteralExpression(node))
      for (const [index, element] of node.elements.entries()) {
        const next = node.elements[index + 1];
        if (fold(element) === "-m" && next !== undefined) load(next);
      }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { names, specifiers, loads: specifiers.filter(specifier => RC_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`), identifiers };
}

/** One JSON file: every key, and every name-like string value, read as words (a file that does not parse is read token by token). */
function readJson(path: string, source: string): string[] {
  const names: string[] = [];
  const judge = (kind: string, value: string): void => {
    if (REMOTE_FAMILY.test(wordsOf(value))) names.push(kind === "text" ? `${path}: text: ${value}` : `${path}: ${kind}: ${value}`);
  };
  const visit = (value: unknown): void => {
    if (typeof value === "string") {
      if (isNameLike(value)) judge("value", value);
    } else if (Array.isArray(value)) for (const item of value) visit(item);
    else if (isObject(value))
      for (const [key, item] of Object.entries(value)) {
        judge("key", key);
        visit(item);
      }
  };
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    for (const token of source.split(/\s+/)) if (token.length > 0) judge("text", token);
    return names;
  }
  visit(value);
  return names;
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly jsonFiles: number;
  /** Family names outside the census instruments (A1). */
  readonly names: string[];
  /** Family names inside the census instruments (A3). */
  readonly instrumentNames: string[];
  readonly loads: string[];
  readonly manifests: string[];
  readonly manifestHits: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const modules = new Map<string, ModuleReading>();
  let jsonFiles = 0;
  const names: string[] = [];
  const instrumentNames: string[] = [];
  const loads: string[] = [];
  const manifests: string[] = [];
  const manifestHits: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of walk.files) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const utf8 = buffer.toString("utf8");
    const found: string[] = [];
    if (isModule(file)) {
      const reading = readModule(file, utf8);
      modules.set(file, reading);
      found.push(...reading.names);
      loads.push(...reading.loads);
    }
    if (isJson(file)) {
      jsonFiles += 1;
      found.push(...readJson(file, utf8));
    }
    (CENSUS_INSTRUMENT.test(file) ? instrumentNames : names).push(...found);
    if (MANIFEST.test(file)) {
      manifests.push(file);
      if (RC_FAMILY.test(utf8)) manifestHits.push(file);
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, modules, jsonFiles, names, instrumentNames, loads, manifests, manifestHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;
function floorsOf(tree: TreeReading): { files: boolean; src: boolean; test: boolean; qa: boolean; json: boolean; manifests: boolean } {
  return {
    files: tree.walk.files.length >= FLOORS.files,
    src: modulesBelow(tree, "src") >= FLOORS.modules.src,
    test: modulesBelow(tree, "test") >= FLOORS.modules.test,
    qa: modulesBelow(tree, "qa") >= FLOORS.modules.qa,
    json: tree.jsonFiles >= FLOORS.json,
    manifests: tree.manifests.length >= FLOORS.manifests,
  };
}
/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | null>>): TreeReading {
  const root = makeScratch("rc-remote-component-stream-");
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
const namesIn = (path: string, source: string): boolean => readModule(path, source).names.length > 0;
const loadsIn = (path: string, source: string): boolean => readModule(path, source).loads.length > 0;
const jsonNames = (source: string): boolean => readJson("c.json", source).length > 0;
/** A2's judge over one manifest text (the path comes first, so no literal naming the distribution sits in a load position). */
const manifestNames = (path: string, source: string): boolean => MANIFEST.test(path) && RC_FAMILY.test(source);

/* ---------------------------------------------------------------------------------------------------------------------------
 * The armed adoption: Pi-owned registries, a reference adoption, its named mutants and the judge.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Host {
  readonly components: CapabilityRegistry;
  readonly actions: CapabilityRegistry;
  readonly rendered: string[];
  readonly executed: string[];
  readonly render: (component: string, props: Readonly<Record<string, unknown>>) => string;
  readonly execute: (action: string) => void;
}
/** Two of Pi's own registries, one per identity kind, each holding the fixture's known ids; every provider counts any run. */
function makeHost(): Host {
  const components = new CapabilityRegistry();
  const actions = new CapabilityRegistry();
  const rendered: string[] = [];
  const executed: string[] = [];
  const provider = (id: string) => ({
    descriptor: {
      id,
      version: "1.0.0",
      description: `fixture ${id}`,
      inputSchema: { type: "object" },
      effectClass: "read" as const,
      permissions: [`fixture:${id}`],
      supportedModes: ["invoke" as const],
    },
    invoke: async () => {
      executed.push(id);
      return null;
    },
  });
  for (const id of Object.keys(KNOWN_COMPONENTS)) components.register(provider(id));
  for (const id of KNOWN_ACTIONS) actions.register(provider(id));
  return {
    components,
    actions,
    rendered,
    executed,
    render: (component, props) => {
      const shown = `${component}(${Object.entries(props)
        .map(([name, value]) => `${name}=${typeof value === "function" ? "<function>" : JSON.stringify(value)}`)
        .join(",")})`;
      rendered.push(shown);
      return shown;
    },
    execute: action => {
      executed.push(action);
    },
  };
}
const CONTEXT = { grants: [] as string[], signal: new AbortController().signal };

interface Refusal {
  readonly refused: true;
  readonly category: CapabilityErrorCategory;
  readonly field: string;
  readonly reason: string;
}
interface Admission {
  readonly refused: false;
  readonly frame: Readonly<Record<string, unknown>>;
  readonly rendered: string;
  readonly actions: readonly string[];
}
type Outcome = Refusal | Admission;
const refuse = (category: CapabilityErrorCategory, field: string, reason: string): Refusal => ({ refused: true, category, field, reason });
const INTEGER_KEY = /^(?:0|[1-9][0-9]*)$/;
const CALLBACK_SHAPE = /=>|\bfunction\b/;
const isRecord = (value: unknown): value is Record<string, unknown> => isObject(value);
/** The first object key below `value` that is integer-like (JS enumerates such keys first, whatever the input order). */
function integerKeyPath(value: unknown, path: string): string | undefined {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const found = integerKeyPath(item, `${path}[${index}]`);
      if (found !== undefined) return found;
    }
  } else if (isRecord(value))
    for (const [key, item] of Object.entries(value)) {
      const here = path === "" ? key : `${path}.${key}`;
      if (INTEGER_KEY.test(key)) return here;
      const found = integerKeyPath(item, here);
      if (found !== undefined) return found;
    }
  return undefined;
}
function sortedKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedKeys);
  if (isRecord(value))
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map(key => [key, sortedKeys(value[key])]),
    );
  return value;
}
function containsFunction(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsFunction);
  if (isRecord(value)) return Object.values(value).some(containsFunction);
  return false;
}
const isCallbackShaped = (value: unknown): boolean => (typeof value === "string" && CALLBACK_SHAPE.test(value)) || (isRecord(value) && Object.hasOwn(value, "$fn"));

/**
 * The reference adoption of one stream frame (JSON text, or an in-process value), built from Pi's seams only, and each named
 * mutant of it (one branch changed). Order: the JSON boundary, integer-like keys, the schema version, the frame's fields, the
 * component identity, its declared props, the action ids, the bindings; then the frame is rendered once and its actions bound,
 * never run.
 */
function adopt(input: unknown, host: Host, mutant?: Mutant): Outcome {
  let frame: Record<string, unknown>;
  let parsed: unknown = input;
  if (typeof input === "string") {
    try {
      parsed = JSON.parse(input);
    } catch {
      return refuse("validation", "$", "the frame is not JSON");
    }
  }
  if (mutant === "M-FUNCTION-PASS" && typeof input !== "string" && isRecord(parsed)) frame = { ...parsed };
  else {
    let checked: unknown;
    try {
      checked = validatedCapabilityJson(parsed, "frame");
    } catch (error) {
      if (error instanceof CapabilityError) return refuse(error.category, "frame", error.message);
      throw error;
    }
    if (!isRecord(checked)) return refuse("validation", "$", "the frame is not an object");
    frame = checked;
  }
  const integerKey = integerKeyPath(frame, "");
  if (integerKey !== undefined) return refuse("validation", integerKey, "an integer-like key, whose order a JS object cannot keep");
  if (mutant !== "M-ANY-VERSION" && Object.hasOwn(frame, "schema_version")) {
    const version = frame.schema_version;
    if (typeof version !== "number") return refuse("validation", "schema_version", `the schema version must be the number ${ACCEPTED_SCHEMA_VERSION}`);
    if (version !== ACCEPTED_SCHEMA_VERSION) return refuse("validation", "schema_version", `an unknown schema version ${version}`);
  }
  const allowed = mutant === "M-STREAM-RESOLVER" ? [...FRAME_FIELDS, "resolver"] : FRAME_FIELDS;
  const undeclared = Object.keys(frame).find(key => !allowed.includes(key));
  if (undeclared !== undefined && mutant !== "M-FORWARD-UNDECLARED") return refuse("validation", undeclared, "an undeclared field");
  const missing = FRAME_FIELDS.find(field => !Object.hasOwn(frame, field));
  if (missing !== undefined) return refuse("validation", missing, "a missing field");
  const unavailable = (field: string, id: string): Refusal => {
    if (mutant === "M-UNTYPED") throw new Error(`unknown ${id}`);
    return refuse("unavailable", field, `Unknown or unavailable capability: ${id}.`);
  };
  const component = frame.component;
  if (typeof component !== "string") return refuse("validation", "component", "a component id must be a string");
  let renderAs = component;
  if (host.components.effectClassOf(component) === undefined) {
    const resolver = frame.resolver;
    const mapped = mutant === "M-STREAM-RESOLVER" && isRecord(resolver) ? resolver[component] : undefined;
    if (typeof mapped === "string" && host.components.effectClassOf(mapped) !== undefined) renderAs = mapped;
    else if (mutant !== "M-RENDER-UNKNOWN") return unavailable("component", component);
  }
  const props = frame.props;
  if (!isRecord(props)) return refuse("validation", "props", "props must be an object");
  const declared = KNOWN_COMPONENTS[renderAs];
  if (declared !== undefined) {
    for (const [name, value] of Object.entries(props)) {
      const type = declared[name];
      if (mutant === "M-CALLBACK-REVIVE" && isCallbackShaped(value)) {
        props[name] = () => value;
        continue;
      }
      if (type === undefined) {
        if (mutant === "M-FORWARD-UNDECLARED") continue;
        return refuse("validation", `props.${name}`, "an undeclared prop");
      }
      if (value === null && mutant === "M-NULL-COERCE") {
        props[name] = type === "number" ? 0 : type === "boolean" ? false : "";
        continue;
      }
      if (value === null) {
        if (type === "string?") continue;
        return refuse("validation", `props.${name}`, "null for a non-nullable prop");
      }
      if (typeof value !== (type === "string?" ? "string" : type)) return refuse("validation", `props.${name}`, `a ${type} prop`);
    }
    const absent = Object.keys(declared).find(name => !Object.hasOwn(props, name));
    if (absent !== undefined) return refuse("validation", `props.${absent}`, "a missing prop");
  }
  const actions = frame.actions;
  if (!Array.isArray(actions)) return refuse("validation", "actions", "actions must be a list of declared action ids");
  const bound: string[] = [];
  for (const [index, action] of actions.entries()) {
    if (typeof action !== "string") return refuse("validation", `actions[${index}]`, "an action id must be a string");
    if (host.actions.effectClassOf(action) === undefined) return unavailable(`actions[${index}]`, action);
    bound.push(action);
  }
  const bindings = frame.bindings;
  if (!isRecord(bindings) || !Object.values(bindings).every(value => typeof value === "string")) return refuse("validation", "bindings", "bindings must map names to resource ids");
  if (mutant === "M-EXECUTE-ACTION") for (const action of bound) host.execute(action);
  const admitted = mutant === "M-SORTED-KEYS" ? sortedKeys(frame) : frame;
  return { refused: false, frame: isRecord(admitted) ? admitted : frame, rendered: host.render(renderAs, props), actions: bound };
}

interface Case {
  readonly id: string;
  /** The frame as the stream carries it, or an in-process frame built around `call` (counts any callback run). */
  readonly input: string | ((call: () => void) => unknown);
  readonly expect: "admit" | { readonly category: CapabilityErrorCategory; readonly field: string };
  /** An admitted frame's one rendering. */
  readonly render?: string;
  /** Declared props the frame carries as null. */
  readonly nulls?: readonly string[];
}
const CARD_HEAD = '{"schema_version":1,"component":"fixture.card","key":"k1"';
const CARD_PROPS = '"props":{"title":"Build","count":2,"note":"ok"}';
const CARD_TAIL = '"actions":["fixture.select","fixture.open"],"bindings":{"source":"res-1"}}';
const card = (props = CARD_PROPS, tail = CARD_TAIL, head = CARD_HEAD): string => `${head},${props},${tail}`;
const refused = (category: CapabilityErrorCategory, field: string) => ({ category, field });
/** The constructed stream: every frame shape the three clauses name, keys deliberately out of sorted order. */
const CASES: readonly Case[] = [
  { id: "K1", input: card(), expect: "admit", render: 'fixture.card(title="Build",count=2,note="ok")' },
  { id: "K2", input: card('"props":{"title":"Build","count":2,"note":null}'), expect: "admit", render: 'fixture.card(title="Build",count=2,note=null)', nulls: ["note"] },
  {
    id: "K3",
    input: '{"schema_version":1,"component":"fixture.list","key":"k3","props":{"label":"Runs","open":true},"actions":[],"bindings":{}}',
    expect: "admit",
    render: 'fixture.list(label="Runs",open=true)',
  },
  { id: "U1", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.banner","key":"k1"'), expect: refused("unavailable", "component") },
  { id: "U2", input: card(CARD_PROPS, '"actions":["fixture.select","fixture.share"],"bindings":{"source":"res-1"}}'), expect: refused("unavailable", "actions[1]") },
  {
    id: "U3",
    input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.banner","resolver":{"fixture.banner":"fixture.card"},"key":"k1"'),
    expect: refused("validation", "resolver"),
  },
  { id: "U4", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.select","key":"k1"'), expect: refused("unavailable", "component") },
  { id: "U5", input: card(CARD_PROPS, '"actions":["fixture.card"],"bindings":{"source":"res-1"}}'), expect: refused("unavailable", "actions[0]") },
  {
    id: "F1",
    input: call => ({
      schema_version: 1,
      component: "fixture.card",
      key: "k1",
      props: {
        title: () => {
          call();
          return "Build";
        },
        count: 2,
        note: "ok",
      },
      actions: ["fixture.select"],
      bindings: { source: "res-1" },
    }),
    expect: refused("validation", "frame"),
  },
  { id: "F2", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.card","key":"k1","onSelect":"() => 1"'), expect: refused("validation", "onSelect") },
  { id: "F3", input: card('"props":{"title":"Build","count":2,"note":"ok","onSelect":"() => 1"}'), expect: refused("validation", "props.onSelect") },
  { id: "F4", input: card('"props":{"title":{"$fn":"() => 1"},"count":2,"note":"ok"}'), expect: refused("validation", "props.title") },
  { id: "S1", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":2,"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S2", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":"1","component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S3", input: card(CARD_PROPS, CARD_TAIL, '{"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S4", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":null,"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "N1", input: card('"props":{"title":"Build","count":null,"note":"ok"}'), expect: refused("validation", "props.count"), nulls: ["count"] },
  { id: "O1", input: card('"props":{"title":"Build","count":2,"note":"ok","2":"x"}'), expect: refused("validation", "props.2") },
  { id: "E1", input: '{"schema_version":1,"component":', expect: refused("validation", "$") },
];
const caseOf = (id: string): Case => {
  const found = CASES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no case ${id}`);
  return found;
};

interface Run {
  readonly outcome: Outcome | "threw";
  readonly rendered: readonly string[];
  readonly executed: readonly string[];
  readonly calls: number;
}
function runCase(entry: Case, mutant?: Mutant): Run {
  const host = makeHost();
  let calls = 0;
  const input =
    typeof entry.input === "string"
      ? entry.input
      : entry.input(() => {
          calls += 1;
        });
  let outcome: Outcome | "threw";
  try {
    outcome = adopt(input, host, mutant);
  } catch {
    outcome = "threw";
  }
  return { outcome, rendered: [...host.rendered], executed: [...host.executed], calls };
}
/** One run, as a witness reads it. */
function shown(run: Run): string {
  if (run.outcome === "threw") return "threw";
  return run.outcome.refused ? `refused ${run.outcome.category} ${run.outcome.field}` : "admitted";
}
const isTypedRefusal = (outcome: Refusal): boolean =>
  CATEGORIES.includes(outcome.category) && typeof outcome.field === "string" && outcome.field.length > 0 && typeof outcome.reason === "string" && outcome.reason.length > 0;
/** What the judge finds in one case's run: each finding names the case and the property the run broke. */
function findingsOf(entry: Case, run: Run): string[] {
  const found: string[] = [];
  const add = (kind: string): void => {
    found.push(`${entry.id}:${kind}`);
  };
  if (run.executed.length > 0) add("executed-action");
  if (run.calls > 0) add("evaluated-callback");
  const outcome = run.outcome;
  if (outcome === "threw") {
    add("untyped-refusal");
    return found;
  }
  if (outcome.refused) {
    if (!isTypedRefusal(outcome)) add("untyped-refusal");
    if (entry.expect === "admit" || outcome.category !== entry.expect.category || outcome.field !== entry.expect.field) add("wrong-refusal");
    if (run.rendered.length > 0) add("rendered-refused");
    return found;
  }
  if (entry.expect !== "admit") {
    add("admitted");
    if (run.rendered.length > 0) add("rendered-refused");
  }
  const frame = outcome.frame;
  const props = isRecord(frame.props) ? frame.props : {};
  const component = frame.component;
  const declared = typeof component === "string" ? KNOWN_COMPONENTS[component] : undefined;
  if (containsFunction(frame)) add("deserialized-callback");
  if (Object.keys(frame).some(key => !FRAME_FIELDS.includes(key)) || (declared !== undefined && Object.keys(props).some(name => !Object.hasOwn(declared, name)))) add("forwarded-undeclared");
  if (declared === undefined) add("resolved-unknown-component");
  if (!run.rendered.every(text => text.startsWith(`${String(component)}(`))) add("resolved-through-stream");
  if (frame.schema_version !== ACCEPTED_SCHEMA_VERSION) add("accepted-unknown-schema-version");
  if (!outcome.actions.every(action => KNOWN_ACTIONS.includes(action))) add("bound-unknown-action");
  if ((entry.nulls ?? []).some(name => !Object.hasOwn(props, name) || props[name] !== null)) add("coerced-null");
  if (entry.expect === "admit") {
    if (typeof entry.input !== "string" || JSON.stringify(outcome.frame) !== entry.input) add("round-trip-changed");
    if (JSON.stringify(run.rendered) !== JSON.stringify([entry.render])) add("rendered-mismatch");
  }
  return found;
}
/** The judge: every case of the constructed stream through `mutant` (the reference when absent); the findings, in case order. */
function judge(mutant?: Mutant): string[] {
  return CASES.flatMap(entry => findingsOf(entry, runCase(entry, mutant)));
}
/** A pin over the judge: the reference is clean and each of the pin's mutants fails it with the findings its witness pins. */
function mutantWitness(pin: string): { reference: string[]; mutants: Record<string, string[]> } {
  const reference = judge();
  expect(reference, "the reference adoption passes its own judge").toStrictEqual([]);
  const mutants = Object.fromEntries((MUTANTS_BY_PIN[pin] ?? []).map(mutant => [mutant, judge(mutant)]));
  expect(
    Object.entries(mutants)
      .filter(([, findings]) => findings.length === 0)
      .map(([mutant]) => mutant),
    `${pin}: every mutant fails the judge`,
  ).toStrictEqual([]);
  return { reference, mutants };
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  A1: () => {
    const tree = liveTree();
    const floors = floorsOf(tree);
    expect(floors, `files ${tree.walk.files.length}; modules src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}; JSON ${tree.jsonFiles}`).toStrictEqual({
      files: true,
      src: true,
      test: true,
      qa: true,
      json: true,
      manifests: true,
    });
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable file").toStrictEqual({ symlinks: [], unreadable: [] });
    expect(tree.names, "remote-output names outside the census instruments, each with its file and line (the trigger's inventory)").toStrictEqual([]);
    const head = "remote";
    const controls = {
      typeName: namesIn("c.ts", "export interface RemoteComponent { id: string }\n"),
      camelIdentifier: namesIn("c.ts", "const remoteStream = open();\n"),
      snakeLiteral: namesIn("c.mjs", 'const kind = "remote_element";\n'),
      kebabLiteral: namesIn("c.js", 'const kind = "remote-producer";\n'),
      componentStream: namesIn("c.ts", "export type ComponentStream = AsyncIterable<unknown>;\n"),
      elementType: namesIn("c.ts", 'import type { RftsxElement } from "./x.js";\n'),
      crosswalk: namesIn("c.ts", "export const crosswalkRows: string[] = [];\n"),
      callbackSerialization: namesIn("c.ts", 'const mode = "callbackSerialization";\n'),
      folded: namesIn("c.ts", `const word = "${head}" + "Stream";\n`),
      regex: namesIn("c.ts", "const reader = /remote[-_]?stream/;\n"),
      escaped: namesIn("c.ts", 'const word = "\\u0072emoteStream";\n'),
      invisible: namesIn("c.ts", `const word = "remote${ZERO_WIDTH_SPACE}Stream";\n`),
      jsxText: namesIn("c.tsx", "export const view = <b>RemoteComponent</b>;\n"),
      jsonKey: jsonNames('{"remoteStream":true}'),
      jsonValue: jsonNames('{"kind":"remote-component"}'),
      jsonUnparsed: jsonNames('{"kind": "RemoteElement",}'),
      comment: namesIn("c.ts", "// reads a remote stream\nexport {};\n"),
      proseLiteral: namesIn("c.ts", 'const note = "a remote stream is not read here";\n'),
      jsonProse: jsonNames('{"note":"a remote component stream"}'),
      composed: namesIn("c.ts", 'const word = ["remote", "Stream"].join("");\n'),
      renamed: namesIn("c.ts", "const feed = connect(url);\nfor await (const frame of feed) show(frame);\n"),
      lookalike: namesIn("c.ts", `const remoteC${CYRILLIC_O}mponent = 1;\n`),
      gitRemote: namesIn("c.ts", 'const remoteUrl = git.remote("origin");\n'),
      fileStream: namesIn("c.ts", "const stream = createReadStream(path);\n"),
      registryComponent: namesIn("c.ts", "const component = registry.get(id);\n"),
    };
    const consumer = "export interface RemoteComponent { id: string }\n";
    const planted = plantedTree({
      "src/consumer.ts": consumer,
      "src/link.ts": null,
      "test/x.test.ts": consumer,
      "test/x-census.test.ts": consumer,
      "test/fixtures/x-roster.json": '{"remoteStream":1}',
      "docs/notes.md": "RemoteComponent\n",
      "node_modules/pkg/index.ts": consumer,
      "dist/index.js": consumer,
      ".beads/issues.jsonl": '{"remoteStream":1}\n',
      ".forge/run.json": '{"remoteStream":1}',
      "build/index.js": consumer,
      "coverage/run.json": '{"remoteStream":1}',
    });
    return done("A1", {
      floors,
      anchorsWalked: tree.anchorsWalked,
      names: tree.names,
      controls,
      planted: { names: planted.names, instrumentNames: planted.instrumentNames, symlinks: planted.walk.symlinks, files: planted.walk.files },
    });
  },
  A2: () => {
    const tree = liveTree();
    expect({ loads: tree.loads, manifestHits: tree.manifestHits }, "modules loading or running the ReactiveComponents distribution, and manifests naming it").toStrictEqual({ loads: [], manifestHits: [] });
    const controls = {
      importDistribution: loadsIn("c.ts", 'import { Element } from "vibranium-reactive-components";\n'),
      importModule: loadsIn("c.ts", 'import rc from "reactive_components";\n'),
      subpath: loadsIn("c.ts", 'export * from "vibranium-reactive-components/remote";\n'),
      dynamicImport: loadsIn("c.mjs", 'const rc = await import("vibranium-reactive-components");\n'),
      require: loadsIn("c.cjs", 'const rc = require("reactive-components");\n'),
      importEquals: loadsIn("c.ts", 'import rc = require("reactive_components");\n'),
      importType: loadsIn("c.ts", 'type T = import("vibranium-reactive-components").Element;\n'),
      npmSpecifier: loadsIn("c.ts", 'const rc = await import("npm:vibranium-reactive-components@1");\n'),
      folded: loadsIn("c.ts", 'const rc = require("vibranium-" + "reactive-components");\n'),
      commandFirst: loadsIn("c.ts", 'execSync("python3 -m reactive_components serve");\n'),
      pythonModule: loadsIn("c.ts", 'spawn("python3", ["-m", "reactive_components", "serve"]);\n'),
      moduleSubpath: loadsIn("c.ts", 'execFileSync("uv", ["run", "python", "-m", "reactive_components.remote"]);\n'),
      packageJson: manifestNames("package.json", '{"dependencies":{"vibranium-reactive-components":"1"}}'),
      pyproject: manifestNames("pyproject.toml", 'dependencies = ["vibranium-reactive-components"]\n'),
      nearMiss: loadsIn("c.ts", 'import x from "reactive-componentsx";\n'),
      sdkVersionsEcho: loadsIn("c.ts", 'const echo = { sdk_versions: { reactive_components: "0.1.1" } };\n'),
      mentionOnly: loadsIn("c.ts", 'const name = "vibranium-reactive-components";\n'),
      composedSpecifier: loadsIn("c.ts", 'const rc = require(["vibranium", "reactive", "components"].join("-"));\n'),
      shellArgument: loadsIn("c.ts", 'spawn("sh", ["-c", "python3 -m reactive_components"]);\n'),
      otherModule: loadsIn("c.ts", 'spawn("python3", ["-m", "http.server"]);\n'),
      proseManifest: manifestNames("docs/notes.md", "vibranium-reactive-components\n"),
    };
    return done("A2", { loads: tree.loads, manifestHits: tree.manifestHits, manifests: tree.manifests, controls });
  },
  A3: () => {
    const tree = liveTree();
    const readers = NEAREST_READERS.map(([path, token]) => {
      const reading = tree.modules.get(path);
      return { path, reached: reading?.identifiers.has(token) === true, quiet: reading !== undefined && reading.names.length === 0 && reading.loads.length === 0 };
    });
    expect(
      readers.filter(reader => !reader.reached || !reader.quiet),
      "the nearest readers are reached, carry their identifier and are quiet",
    ).toStrictEqual([]);
    const pathOf = (hit: string): string => hit.slice(0, hit.indexOf(":"));
    const own = [SELF, ROSTER_FILE].map(path => ({
      path,
      instrument: CENSUS_INSTRUMENT.test(path),
      walked: tree.walk.files.includes(path),
      spellsFamily: tree.instrumentNames.some(hit => pathOf(hit) === path),
    }));
    expect(
      own.filter(entry => !(entry.instrument && entry.walked && entry.spellsFamily)),
      "this file and its roster are walked instruments that spell the family, so the instrument rule is load-bearing",
    ).toStrictEqual([]);
    expect(
      tree.instrumentNames.filter(hit => !CENSUS_INSTRUMENT.test(pathOf(hit))),
      "every name read inside an instrument sits in an instrument",
    ).toStrictEqual([]);
    return done("A3", { readers, own, instrumentsOnly: true });
  },
  A4: () => {
    const bead = readBeadRow();
    const gating = gatingOf(bead.notes);
    const authority = authorityOf(bead.notes);
    expect(gating, "the filing's Gating line parses").toBeDefined();
    expect(authority, "the filing's Authority line parses").toBeDefined();
    const { readme, pins, absentPatterns, hostCheckouts } = ROSTER.producer;
    const program = producerPin("program");
    const master = producerPin("origin-master");
    const named = gating?.names ?? [];
    const remoteNames = named.filter(name => name !== "crosswalk");
    const facts = {
      beadNamesMeasured: JSON.stringify(named) === JSON.stringify(Object.keys(absentPatterns)),
      beadShaIsProgramPin: gating !== undefined && gating.sha.length >= 12 && program.sha.startsWith(gating.sha),
      programAbsent: named.every(name => program.absent[name] === 0),
      schemaSiteAgrees: program.otherSense.schemaVersion.map(site => site.slice(site.lastIndexOf("/") + 1)).join() === gating?.schemaSite,
      hostConditionQuoted: gating !== undefined && (readme.lines[gating.hostLine] ?? "").includes(gating.hostQuote),
      authorityQuoted:
        authority !== undefined && (readme.lines[authority.line] ?? "").startsWith(authority.head) && (readme.lines[authority.line] ?? "").endsWith(authority.tail),
      quoteOnItsLine: (readme.lines["15"] ?? "").includes(ROSTER.quote),
      remoteProducerShipped: pins.some(pin => remoteNames.some(name => (pin.absent[name] ?? 0) > 0)),
      elementCrosswalkShipped: pins.some(pin => (pin.absent.RftsxElement ?? 0) > 0),
      crosswalkDrift: pins.filter(pin => (pin.absent.crosswalk ?? 0) > 0).map(pin => `${pin.label}:${pin.otherSense.crosswalk.length}:${pin.crosswalkSchema ?? "none"}`),
      sameDistribution: pins.every(pin => pin.distribution === RC_DISTRIBUTION),
      interfaceHostsInstalled: hostCheckouts.present.length > 0,
      masterIsLater: master.sha !== program.sha,
    };
    expect(facts, "the measured producer agrees with the filing: RC-IF-04 and RC-IF-01 unshipped, the drift recorded").toStrictEqual({
      beadNamesMeasured: true,
      beadShaIsProgramPin: true,
      programAbsent: true,
      schemaSiteAgrees: true,
      hostConditionQuoted: true,
      authorityQuoted: true,
      quoteOnItsLine: true,
      remoteProducerShipped: false,
      elementCrosswalkShipped: false,
      crosswalkDrift: facts.crosswalkDrift,
      sameDistribution: true,
      interfaceHostsInstalled: false,
      masterIsLater: true,
    });
    return done("A4", facts);
  },
  B1: async () => {
    const ids = ["K1", "K2", "K3", "U1", "U2", "U3", "U4", "U5"];
    const runs = Object.fromEntries(ids.map(id => [id, runCase(caseOf(id))]));
    const outcomes = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, shown(run)]));
    const rendered = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, run.rendered.length]));
    const executed = Object.values(runs).reduce((total, run) => total + run.executed.length, 0);
    expect(executed, "no action id is ever run by the adoption").toBe(0);
    const u1 = runs.U1?.outcome;
    const host = makeHost();
    const error: unknown = await host.components.invoke("fixture.banner", {}, CONTEXT).then(
      () => undefined,
      (caught: unknown) => caught,
    );
    expect(error, "Pi's own registry refuses the unknown id").toBeInstanceOf(CapabilityError);
    const registryRefusal = error instanceof CapabilityError ? { category: error.category, message: error.message } : null;
    const adoptionRefusal = u1 !== undefined && u1 !== "threw" && u1.refused ? { category: u1.category, message: u1.reason } : null;
    expect(adoptionRefusal, "the adoption's unknown-id refusal is the registry's own").toStrictEqual(registryRefusal);
    expect(host.executed, "the registry refused before any provider ran").toStrictEqual([]);
    return done("B1", { outcomes, rendered, executed, registryRefusal });
  },
  B2: () => done("B2", mutantWitness("B2")),
  C1: () => {
    const ids = ["F1", "F2", "F3", "F4"];
    const runs = Object.fromEntries(ids.map(id => [id, runCase(caseOf(id))]));
    const outcomes = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, shown(run)]));
    const calls = Object.values(runs).reduce((total, run) => total + run.calls, 0);
    const rendered = Object.values(runs).reduce((total, run) => total + run.rendered.length, 0);
    const admitted = Object.values(runs).filter(run => run.outcome !== "threw" && !run.outcome.refused).length;
    expect({ calls, rendered, admitted }, "no callback runs, nothing is rendered and no refused frame is forwarded").toStrictEqual({ calls: 0, rendered: 0, admitted: 0 });
    const f1 = runs.F1?.outcome;
    const boundary = f1 !== undefined && f1 !== "threw" && f1.refused ? f1.reason : null;
    return done("C1", { outcomes, calls, rendered, admitted, boundary });
  },
  C2: () => done("C2", mutantWitness("C2")),
  D1: () => {
    const ids = ["S1", "S2", "S3", "S4", "N1", "O1", "E1"];
    const outcomes = Object.fromEntries(ids.map(id => [id, shown(runCase(caseOf(id)))]));
    const roundTrip = Object.fromEntries(
      ["K1", "K2", "K3"].map(id => {
        const entry = caseOf(id);
        const run = runCase(entry);
        return [id, run.outcome !== "threw" && !run.outcome.refused && JSON.stringify(run.outcome.frame) === entry.input];
      }),
    );
    const k2 = runCase(caseOf("K2")).outcome;
    const nullKept = k2 !== "threw" && !k2.refused && isRecord(k2.frame.props) && Object.hasOwn(k2.frame.props, "note") && k2.frame.props.note === null;
    expect({ roundTrip, nullKept }, "every admitted frame re-encodes to its input bytes, and a nullable null stays null").toStrictEqual({
      roundTrip: { K1: true, K2: true, K3: true },
      nullKept: true,
    });
    // Why integer-like keys are refused: Pi's JSON boundary and JSON.parse both move them first.
    const ordered = '{"title":"t","2":"x"}';
    const boundaryOrder = Object.keys(validatedCapabilityJson(JSON.parse(ordered), "probe") as JsonObject);
    const parseOrder = Object.keys(JSON.parse(ordered) as JsonObject);
    return done("D1", { outcomes, roundTrip, nullKept, boundaryOrder, parseOrder });
  },
  D2: () => {
    const clauses = acceptanceClauses(readBeadRow().notes);
    const phrases = namedMutants(clauses.find(clause => clause.startsWith("(c) ")) ?? "");
    expect(phrases, "clause (c) names exactly the mutants BEAD_MUTANTS reads").toStrictEqual(Object.keys(BEAD_MUTANTS));
    expect(
      phrases.filter(phrase => {
        const mutant = BEAD_MUTANTS[phrase];
        return mutant === undefined || !(MUTANTS_BY_PIN.D2 ?? []).includes(mutant);
      }),
      "every named mutant is one this pin fails",
    ).toStrictEqual([]);
    return done("D2", { phrases, ...mutantWitness("D2") });
  },
};

/** A describe title: the label with the family masked, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(REMOTE_TEXT, "<remote-output name>")}`;

describe("wb-5ltg.3 gated ReactiveComponents remote-output consumer census (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R3: absent today, adoption contract armed)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const constants = { bead: BEAD, scan: SCAN, residuals: RESIDUAL_FAMILIES };
    expect(constants, JSON.stringify(constants)).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    expect([...new Set(Object.values(MUTANTS_BY_PIN).flat())].sort(), "every mutant is failed by a pin").toStrictEqual([...MUTANTS].sort());
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^,(]+?) \(/.exec(bead.title)?.[1] ?? "";
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a) to (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["A"], ["A"]]);
    expect(clauses[3], "acceptance (d) counts consumer sites").toContain("zero remote-stream consumer sites in Pi");
    expect(quoteOf(bead.notes), "the filing's quote and citation").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${producerPin("program").sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness, JSON.stringify(witness)).toStrictEqual(rosterWitness(pin));
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
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(
      [...suites, ...titles].filter(name => REMOTE_FAMILY.test(wordsOf(name))),
      "registered titles spelling the judged family",
    ).toEqual([]);
  });
});
