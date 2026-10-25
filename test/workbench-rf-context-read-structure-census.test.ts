/**
 * wb-hs2j.2 (RF-REACTIVE-CONTEXT-ASSEMBLY-R2, program-triage-2026-10-22, epic wb-hs2j), the absent-today leg. Statement (the bead
 * note's full statement): "No Pi consumer shall fabricate structure over rf context read envelopes: a component's block is read
 * from attributed block records, never sentinel text regexed out of a full context-show envelope (adopt context show --block KEY
 * when rfc-s24ro.3 ships; open, unshipped), and absent context diff keys are reported missing, never synthesized or rendered as
 * constant fallbacks (adopt context diff --detail compact when rfc-s24ro.4 ships; open, unshipped)" - ReactiveFiberCLI
 * docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:38@6a251bf73af5 (merged with :40).
 * Acceptance (the owner filing's, each clause verbatim in exactly one row label below): "(a) no Pi code path greps sentinels out
 * of context show text to attribute a block; (b) a Pi block read resolves (render_id, component_id, occurrence key) against
 * structured block records, unknown component distinct from suppressed block; (c) a Pi diff consumer renders only
 * envelope-present keys, absent keys read not-provided, never defaults; (d) once --block / --detail compact ship, scoped digest =
 * full envelope's, compact counts reconcile with the full diff." Trigger (the filing's priority line, verbatim in row A's label):
 * "Pi issues no context show/diff verb today".
 *
 * Pi's rf readers today: the reactivefiber.render.preview provider (src/workbench/providers/reactivefiber.ts) spawns only
 * `rf --workspace W context render ... --no-commit --no-input --json`; it, its reader adapter (reactivefiber-observer.ts) and the
 * native evidence projection (native-evidence.ts) admit only context.render envelopes, and result.output.text is read only to
 * type-check it and to digest it (the adapter's rf-output:sha256:<hex> payload reference). The one record-container read is the
 * adapter's inclusion leg (wb-hs2j.1, landing 287): it binds result.blocks only to count it (Array.isArray, an every() row-shape
 * test that reads no field, .length) beside result.necessity's include flags, so no block is attributed or resolved; no Pi module
 * reads result.components or any diff envelope. So the trigger has not fired, (a)-(c) hold by construction and (d) waits for rf.
 * The census pins that state over THE WALK (every module below WALK_ROOTS, parsed by the TypeScript compiler; comments are not
 * read; every other file there, a text: scripts, documents, data; the walk must equal node's own recursive listing of the roots,
 * must hold every file git lists below them, tracked or untracked and not ignored, and every module it walks must be one git lists):
 *  A, the trigger, absent today. A1 the launch census: exactly one call of a process launcher (LAUNCHERS) whose first argument
 *    reads the rf binary (folded, or the leading literal piece of a composed shell line), the provider's; in every argv-shaped
 *    array literal (one holding a folded "--" flag, or the argv literal of an rf launch) the element after "context" is "render"; no folded literal spells another context leaf of the measured
 *    rf (context.show, .explain, .plan, .diff, .history, .replay, as `context.<leaf>` or `context <leaf>`); and no line of a text
 *    (backslash continuations joined) names the rf binary as a command word (RF_WORD: a path prefix may lead it) beside another
 *    context leaf - a text line naming a leaf without the binary is not a launch, and is not judged. A2 the readers: a
 *    judged module holding the literal "context.render" is an rf READER (measured: native-evidence.ts, the provider, the
 *    adapter); the adapter refuses and the evidence projection ignores an envelope of every other context leaf, and the two rf
 *    registrations (registerReactiveFiberRender and registerNativeReactiveFiberRender, read through catalogSnapshot) register only
 *    the read-class render preview, whose input arms name no render, component, block, occurrence, instance or audience key.
 *  B, acceptance (a). B1 every read of a `text` field in a READER, and of `output.text` in any judged module (property access,
 *    element access or object binding, its key resolved as KEYS below), is the operand of a typeof or the sole argument of an update() whose receiver
 *    chain starts at createHash(); any other use (a match, split, exec, slice, alias or pass-through) is a finding. B2 behaviour:
 *    the adapter's projection of a preview whose document carries sentinel-style block markers is one snapshot with no relation,
 *    no marker token in any projected string and the sha256 payload reference of exactly that text; a marker-only text change
 *    moves only nativePayloadRef, and the evidence projection is identical across the two and carries no marker.
 *  C, acceptance (b), absent today. C1 no judged module spells an rf block or component record field (BLOCK_FIELDS, the
 *    snake_case fields of the measured context.show block record and the render result's block and component rows, minus the
 *    render result's own keys) as an identifier, nor as a whole word of a folded literal. C2 (re-pinned at the R710 re-cut on trunk
 *    edccd80, after wb-hs2j.1 landed its inclusion leg) the record containers (blocks, components) the READERS read by property
 *    access, element access or binding (a key resolved as KEYS below) are exactly the adapter's result.blocks binding, and every
 *    use of a read container (a bound name is followed to each reference in its function) is a count (.length) or a row-shape
 *    check that reads no field (Array.isArray, or an every() whose callback reads no property and calls no function of its own
 *    module that reads one - the helpers are followed one level, Array.isArray excepted, so the landed record() shape check reads
 *    none); an element access, find, map, loop, spread, pass-through, alias or nested binding is a finding. Behaviour: populating
 *    both containers with attributed records changes no projection and no evidence field, on a clean render and on one withholding
 *    a judged candidate (so the inclusion note carries no record value either); the planted rows speak the measured rf's own
 *    vocabulary, and the withheld pair keeps the block count the leg reads while differing in every other per-row count (each value
 *    of each non-positional row field, and the component row count), so a count of statuses, kinds or unavailable lenses reaching
 *    the note reds; one more block moves only the diagnostics (the inclusion note's count: the read is a count); and no planted
 *    record value reaches any projected string.
 *  KEYS (B1, C2, D2): an element access argument or a computed binding name reads its folded literal; the strings a name of the
 *    module is bound to (a variable declaration of a folded string; names are matched by name, not by scope, so a shadowing
 *    parameter still reads the bound value); an element of a key list (an array literal whose every element folds, or a name bound
 *    to one, as const read through: a literal index reads that element, any other index every element); or, for the first
 *    parameter of an ITERATORS callback (every, some, map, filter, forEach, flatMap and the find family) on a key list or a for-of
 *    variable over one, every key of the list. The landed adapter's INCLUSION_KEYS idiom (reactivefiber-observer.ts :94, a
 *    presence check at :271) is such a list.
 *  D, acceptance (c), absent today. D1 no judged module spells an rf diff result key (DIFF_KEYS, the snake_case keys of the
 *    measured context.diff result minus the render result's keys) as an identifier or a whole word of a folded literal. D2 no
 *    READER reads a one-word diff key (GENERIC_DIFF_KEYS) by property access, element access or binding (KEYS), and a
 *    context.diff envelope stating four of the fourteen measured result keys (the program's consumer guessed five absent ones,
 *    02:40) is refused by the adapter and projects no evidence field: nothing of it is rendered, so no absent key is synthesized.
 *  E, acceptance (d), gated. E1 the measured contract is unshipped: the roster's producer facts state no --block option on
 *    context show and no --detail option on context diff (context explain serves --block; context show serves --detail compact
 *    and full, the record level, not rfc-s24ro.4), the filing's "Shipped: no;" sentence and its two gating beads agree with the
 *    roster's BEADS rows, and the captured rf registry (test/fixtures/rf-version-leaves.json) serves context.show and context.diff,
 *    so Pi's absence is its own; the roster's rf version, commit and context leaves are that capture's (the producer facts'
 *    anchor outside this cut); a re-measure that ships either selector flips E1 red until (d) lands with it. E2 the rf tiers (the
 *    files vitest.rf.config.ts and vitest.rf-tsx.config.ts include, run by forge.toml's rf-preview and rf-preview-tsx) carry no
 *    literal naming a show or diff leaf, either gated selector, a scoped digest or a compact count (CLAIM_FAMILY).
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only): rf 0.1.832 (`rf --json --version` result.version, commit 2618c211be0d, a
 * descendant of the program pin 6a251bf73af5) lists seven context leaves, all served; the usage lines of `rf context show|diff|
 * explain --help` give the option lists in the roster; the packaged schemas/cli/context.{render,show,diff}.schema.json give the
 * key lists (each with its sha256); `git show 6a251bf73af5:` on the local ReactiveFiberCLI checkout reads parser.py:2220
 * `"context.show": (_RENDER, _REDACT, _DETAIL),` and :2238-2242 context.diff (RENDER_A, RENDER_B, _REDACT), and
 * BEADS-2026-10-21.md:15-16 the two gating rows. Pi vendors none of these; a producer change is seen only when a cut re-measures.
 * The wb-lcs3 re-measure (2026-10-24, read-only): `git show 2618c211be0d:` on the same checkout reads the packaged
 * context.render.schema.json (sha256 = the roster's schemaDigests entry), whose blocks items close token_cost.kind = token_cost_kind
 * to measured | estimated | unknown and whose components items close status to ok | failed | recovered and give source_unavailable
 * as a list of lens refs: C2's planted rows use exactly these values.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness (each carries its pin id), the scan constants, the derived vocabularies and the registered test titles are held to the
 * out-of-file roster (test/fixtures/rf-context-read-structure-roster.json). OUTSIDE ANCHORS, all in the tracked bead export
 * (.beads/issues.jsonl) or the git index: the owner filing's row (wb-hs2j.2): each acceptance clause and the trigger sit verbatim in
 * exactly one row label, every row carries one of them, and its statement, quotes, citations, gating beads and "Shipped: no;"
 * sentence equal the roster's, so a row removed from every literal of this file and the roster still reds; that row's delivery
 * notes: each row holds at least the pins the delivery recorded ("the rule-16 frozen-shape literal [...]", a per-row floor, so a
 * pin removed from every literal and the roster still reds and a later cut may add pins), and the residual families its
 * delivery named (the "RESIDUALS (named" line and "the new residual family" sentence) together with those the follow-up wb-lcs3's
 * filed finding lines name are each still carried (a floor); git ls-files below the walk roots: every file it lists is walked,
 * and every walked module is one it lists (so its reading is never vacuous).
 * Not claimed: a case body that returns its roster witness through done() after making exactly its measured number of
 * assertions without measuring what it returns (asserted is vitest's tally, not what was asserted); a record field or diff key
 * dropped from the roster's producer key lists together with a plant of it (Pi captures no rf schema, so those key lists are
 * roster-only measured facts; the version, commit and context leaves are held to the capture, E1); the walk, node's listing and
 * the git reading hollowed together (all three readers live in this file, the git index outside it); a pin or a residual family a
 * later cut adds, removed again from every literal (the floors anchor what was delivered or filed).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); every witness carries the assertions its test had made when the
 * case returned (asserted, held to the roster with the rest of the witness).
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a launch binary, verb, field name, text key or
 * container key composed at run time, or a flagless argv built apart from its launch (A1 composedVerb, composedBinary, argvApart,
 * scriptComposedBinary and scriptArgvApart, B1 computedKey, C1 composedField, C2 composedContainer and objectMemberKey);
 * R-INDIRECT a row field read by a function a row-shape callback reaches through another function, or by one defined in another
 * module (C2 twoLevelHelper, importedHelper); R-ALIAS document text read through an alias of the output object outside the READERS (B1
 * aliasOutsideReaders), or an rf launch through an aliased launcher with a flagless argv (A1 aliasedLauncher); R-GENERIC-KEY a
 * record field or diff key whose rf name is one common word (GENERIC_BLOCK_FIELDS, GENERIC_DIFF_KEYS), read outside the READERS
 * (C1 genericField, C2 containerOutsideReaders, D1 genericKey, D2 genericOutsideReaders); R-RENAMED a renamed spelling of an rf
 * field (C1 camelCase); R-COMMENT a comment naming a leaf or a field (A1 comment, C1 comment, D1 comment); R-OUTSIDE a module
 * outside WALK_ROOTS - test helpers and fixtures plant rf envelopes - is not judged (C1 outsideRoots); R-REFLECTIVE document text
 * or a record container reached reflectively, never by a named read: Reflect.get with a key, JSON.stringify of the output object,
 * Object.values or Object.entries of the result (B1 reflectGet and serializedOutput, C2 reflectiveRows).
 * Display paths added: none. Test-only: it spawns only `git ls-files` (read-only) and allocates no scratch; src, qa, examples, the
 * two vitest tier configs, forge.toml, the captured registry and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { type Dirent, existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import rfConfig from "../vitest.rf.config.js";
import rfTsxConfig from "../vitest.rf-tsx.config.js";
import { fullShapeRf, rfFixtureDecision } from "./helpers/rf-render-fixture.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/rf-context-read-structure-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.2";
/** The R694 follow-up that carried the landed cut's findings (its filed finding lines name residual families, an outside anchor). */
const FOLLOW_UP = "wb-lcs3";
const CAPTURE = "test/fixtures/rf-version-leaves.json";
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every module below them, at any depth). */
const WALK_ROOTS = ["src", "qa", "examples"];
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the module count measured at base 436e6db (src 115, qa 62, examples 6). */
const FLOORS = { src: 100, qa: 55, examples: 5 };
/** Each floor sits at or below the non-module file count measured at base 21eff29 (src 0, qa 5, examples 1). */
const TEXT_FLOORS = { qa: 4, examples: 1 };
/** The command every Pi rf envelope reader checks: a judged module holding it as a folded literal is an rf READER. */
const RENDER_COMMAND = "context.render";
const LEAF_PREFIX = "context.";
const LAUNCHERS = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"];
const RF_BINARY = "rf";
/** The rf binary as a command word of a non-module line: a path prefix may lead it, no longer name holds it. */
const RF_WORD = /(?<![A-Za-z0-9_.-])rf(?![A-Za-z0-9_.-])/;
/** The array methods whose callback's first parameter ranges over the receiver's elements (a key list's keys). */
const ITERATORS = ["every", "some", "map", "filter", "forEach", "find", "findIndex", "findLast", "findLastIndex", "flatMap"];
/** The rf document text of a render result: result.output.text. */
const TEXT_OBJECT = "output";
const TEXT_FIELD = "text";
/** The render result's containers of attributed block and component records. */
const CONTAINERS = ["blocks", "components"];
const SNAKE = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/;
const ONE_WORD = /^[a-z]+$/;
/** A selector key a block read would need in a capability input. */
const SELECTOR_WORDS = /render|component|block|occurrence|instance|audience|candidate/i;
/** What an rf tier row claiming (d) would have to name. */
const CLAIM_FAMILY = /\bcontext(?:\.|\s+)(?:show|diff)\b|--block\b|--detail\b|scoped[\s_-]*digest|compact[\s_-]*counts?/i;
const TIER_CONFIGS = ["vitest.rf.config.ts", "vitest.rf-tsx.config.ts"];
const TIER_COMMANDS = ["rf-preview", "rf-preview-tsx"];
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ALIAS", "R-GENERIC-KEY", "R-RENAMED", "R-COMMENT", "R-OUTSIDE", "R-REFLECTIVE", "R-INDIRECT"];
/** The fixture workspace every planted reading names. */
const ROOT = "/fixture/rf-workspace";
const HOST: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "user:fixture" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** A document carrying sentinel-style block markers of the kind a text-grepping consumer extracts (02:38); rf states none. */
const MARKED_TEXT = [
  "<!-- block demo.notes:notes::summary -->",
  "notes: the dashboard tick",
  "<!-- /block -->",
  "[[component demo.aside:aside]] aside body [[/component]]",
].join("\n");
/** The same document with one marker's component renamed. */
const REMARKED_TEXT = MARKED_TEXT.replace("demo.notes:notes::summary", "demo.other:other::summary");
/** Tokens only the marked documents carry. */
const MARKER_TOKENS = ["<!--", "demo.notes", "notes::summary", "dashboard tick", "[[component", "demo.aside", "aside body", "demo.other"];

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
      "(trigger, absent today) Pi issues no context show/diff verb today: the one rf launch in src, qa and examples is the provider's render argv, no module spells another context leaf, and every Pi rf reader admits only context.render envelopes and registers only the render preview",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      "(a) no Pi code path greps sentinels out of context show text to attribute a block: every read of rf document text is a type check or a sha256 digest, and the projection of a sentinel-marked document carries no marker and moves only its digest",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) a Pi block read resolves (render_id, component_id, occurrence key) against structured block records, unknown component distinct from suppressed block: absent today - no module spells an rf block or component record field, the one record-container read in an rf reader is the adapter's count-only result.blocks binding, and attributed records change no projection",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(c) a Pi diff consumer renders only envelope-present keys, absent keys read not-provided, never defaults: absent today - no module spells an rf diff result key, the rf readers read no one-word diff key, and a diff envelope missing keys is refused with nothing rendered",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label:
      "(d) once --block / --detail compact ship, scoped digest = full envelope's, compact counts reconcile with the full diff: gated - the measured rf serves neither selector and Pi's rf tiers claim no reconciliation",
    pins: ["E1", "E2"],
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
interface GatingBead {
  readonly id: string;
  readonly site: string;
  readonly title: string;
}
interface Producer {
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly contextLeaves: readonly string[];
  readonly options: { readonly [leaf: string]: readonly string[] };
  readonly gatingBeads: readonly GatingBead[];
  readonly renderResultKeys: readonly string[];
  readonly renderBlockItemFields: readonly string[];
  readonly renderComponentItemFields: readonly string[];
  readonly showBlockFields: readonly string[];
  readonly diffResultKeys: readonly string[];
  readonly schemaDigests: { readonly [schema: string]: string };
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly mergedQuote: string;
  readonly mergedCitation: string;
  readonly shipped: string;
  readonly producer: Producer;
  readonly scan: JsonObject;
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
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
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
  if (!isObject(producer.programPin) || !isObject(producer.options) || !Array.isArray(producer.gatingBeads)) throw new Error("roster producer needs programPin, options and gatingBeads");
  const options = producer.options;
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    mergedQuote: text(raw.mergedQuote, "mergedQuote"),
    mergedCitation: text(raw.mergedCitation, "mergedCitation"),
    shipped: text(raw.shipped, "shipped"),
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      rfCommit: text(producer.rfCommit, "producer.rfCommit"),
      programPin: { repo: text(producer.programPin.repo, "producer.programPin.repo"), sha: text(producer.programPin.sha, "producer.programPin.sha") },
      contextLeaves: strings(producer.contextLeaves, "producer.contextLeaves"),
      options: Object.fromEntries(Object.entries(options).map(([leaf, flags]) => [leaf, strings(flags, `producer.options.${leaf}`)])),
      gatingBeads: producer.gatingBeads.map((bead: unknown, index: number): GatingBead => {
        if (!isObject(bead)) throw new Error(`roster producer.gatingBeads[${index}] must be an object`);
        return { id: text(bead.id, `gatingBeads[${index}].id`), site: text(bead.site, `gatingBeads[${index}].site`), title: text(bead.title, `gatingBeads[${index}].title`) };
      }),
      renderResultKeys: strings(producer.renderResultKeys, "producer.renderResultKeys"),
      renderBlockItemFields: strings(producer.renderBlockItemFields, "producer.renderBlockItemFields"),
      renderComponentItemFields: strings(producer.renderComponentItemFields, "producer.renderComponentItemFields"),
      showBlockFields: strings(producer.showBlockFields, "producer.showBlockFields"),
      diffResultKeys: strings(producer.diffResultKeys, "producer.diffResultKeys"),
      schemaDigests: stringMap(producer.schemaDigests, "producer.schemaDigests"),
    },
    scan: scan as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

interface Vocabularies {
  readonly otherVerbs: readonly string[];
  readonly blockFields: readonly string[];
  readonly genericBlockFields: readonly string[];
  readonly diffKeys: readonly string[];
  readonly genericDiffKeys: readonly string[];
  readonly unclassified: readonly string[];
}
/** The judged vocabularies, derived from the measured producer facts: a record field or diff key the render result does not
 * itself carry, split into snake_case names (judged everywhere) and one-word names (judged in the READERS only). */
function vocabularies(producer: Producer): Vocabularies {
  const render = new Set(producer.renderResultKeys);
  const records = [...new Set([...producer.showBlockFields, ...producer.renderBlockItemFields, ...producer.renderComponentItemFields])].filter(key => !render.has(key)).sort();
  const diff = [...new Set(producer.diffResultKeys)].filter(key => !render.has(key)).sort();
  return {
    otherVerbs: producer.contextLeaves.filter(leaf => leaf !== RENDER_COMMAND).map(leaf => leaf.slice(LEAF_PREFIX.length)),
    blockFields: records.filter(key => SNAKE.test(key)),
    genericBlockFields: records.filter(key => ONE_WORD.test(key)),
    diffKeys: diff.filter(key => SNAKE.test(key)),
    genericDiffKeys: diff.filter(key => ONE_WORD.test(key)),
    unclassified: [...records, ...diff].filter(key => !SNAKE.test(key) && !ONE_WORD.test(key)),
  };
}
const VOCABULARY = vocabularies(ROSTER.producer);
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordIn = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9_])(?:${words.map(escaped).join("|")})(?![A-Za-z0-9_])`);
/** A folded literal naming another context leaf, as `context.<leaf>` or `context <leaf>`. */
const VERB_FAMILY = new RegExp(`\\bcontext(?:\\.|\\s+)(?:${VOCABULARY.otherVerbs.map(escaped).join("|")})\\b`, "i");
const BLOCK_WORD = wordIn(VOCABULARY.blockFields);
const DIFF_WORD = wordIn(VOCABULARY.diffKeys);

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** A bead's row in the tracked bead export (the owner filing's by default), found by id on a line that parses. */
function readBeadRow(id: string = BEAD): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(id)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${id}`);
}
/** The per-row pin counts BEAD's delivery recorded in its tracked notes (the first "the rule-16 frozen-shape literal [...]" sentence):
 * the pins' anchor outside this file and the roster, read as a floor so a later cut may add pins. */
function deliveredShape(notes: string): string[] {
  const literal = /the rule-16 frozen-shape literal (\[[^\]\n]*\])/.exec(notes)?.[1];
  const shape: unknown = literal === undefined ? [] : JSON.parse(literal);
  if (!Array.isArray(shape) || !shape.every(entry => typeof entry === "string" && /^[A-Z]:\d+$/.test(entry))) throw new Error(`${BEAD} notes record no frozen shape`);
  return shape;
}
/** The residual families named outside this file and the roster: BEAD's delivery notes (the first "RESIDUALS (named" line and the
 * first "the new residual family" sentence) and FOLLOW_UP's filed finding lines (its first note's [leads] and [rides] lines). */
function namedResiduals(delivery: string, followUp: string): string[] {
  const family = /(?<![A-Z0-9-])R-[A-Z]+(?:-[A-Z]+)*/g;
  const listed = delivery.split("\n").find(line => line.startsWith("RESIDUALS (named")) ?? "";
  const added = /the new residual family (R-[A-Z]+(?:-[A-Z]+)*)/.exec(delivery)?.[1] ?? "";
  const filed = (followUp.split("\n\n")[0] ?? "").split("\n").filter(line => /^\[(?:leads|rides)\] /.test(line));
  return [...new Set([...(listed.match(family) ?? []), ...(added === "" ? [] : [added]), ...filed.flatMap(line => line.match(family) ?? [])])].sort();
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

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
/** A path the census judges: a module below one of WALK_ROOTS. */
const judgedPath = (path: string): boolean => isModule(path) && WALK_ROOTS.some(root => path.startsWith(`${root}/`));

interface Walk {
  readonly modules: string[];
  readonly texts: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every module below each of WALK_ROOTS, and every other file there (texts: scripts, documents, data), in name order,
 * repository-relative with "/" separators; symlinks are recorded, never followed. */
function walkRoots(): Walk {
  const modules: string[] = [];
  const texts: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(REPO, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      const rel = posix(relative(REPO, path));
      if (entry.isSymbolicLink()) symlinks.push(rel);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && judgedPath(rel)) modules.push(rel);
      else if (entry.isFile()) texts.push(rel);
    }
  };
  for (const root of WALK_ROOTS) visit(join(REPO, root));
  return { modules, texts, symlinks, unreadable };
}
/** Every file by node's own recursive listing of each walk root (files only, no symlink followed), sorted: the walk's anchor
 * outside walkRoots(), so a walk that skips a directory reds A1 even while the floors hold. */
function listedFiles(): string[] {
  return WALK_ROOTS.flatMap(root =>
    readdirSync(join(REPO, root), { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => posix(relative(REPO, join(entry.parentPath, entry.name)))),
  ).sort();
}
const listedModules = (): string[] => listedFiles().filter(judgedPath);
/** Every path git lists below the walk roots (tracked, or untracked and not ignored) that is present on disk, sorted: the walk's
 * anchor outside this file (the repository's index), so a directory the walk and node's listing both skip still reds A1. */
function gitListed(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...WALK_ROOTS], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(REPO, path))))].sort();
}
/** A non-module file's rf launch lines (A1): each line, backslash continuations joined, naming the rf binary as a command word and
 * another context leaf of the measured rf. */
function launchLines(path: string, source: string): string[] {
  return source
    .replace(/\\\r?\n/g, " ")
    .split(/\r?\n/)
    .filter(line => RF_WORD.test(line) && VERB_FAMILY.test(line))
    .map(line => `${path}: ${line.trim().slice(0, 80)}`);
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
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
/** The leading literal text of a launch argument: a folded literal, else the leftmost literal piece of a concatenation or the
 * head of a template, so a shell line composed after its first word (`"rf context show " + id`) still names its binary. */
function leadingText(node: ts.Node): string | undefined {
  const folded = fold(node);
  if (folded !== undefined) return folded;
  if (ts.isParenthesizedExpression(node)) return leadingText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return leadingText(node.left);
  if (ts.isTemplateExpression(node)) return node.head.text;
  return undefined;
}
/** The last name of a member chain (`a.b.output` and `a["output"]` read output), or nothing for any other expression. */
function tailName(node: ts.Expression): string | undefined {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return fold(node.argumentExpression);
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) return tailName(node.expression);
  return undefined;
}
/** True when a call chain below `node` starts at createHash(). */
function startsAtCreateHash(node: ts.Expression): boolean {
  let current: ts.Expression = node;
  while (ts.isCallExpression(current) || ts.isPropertyAccessExpression(current)) {
    if (ts.isCallExpression(current) && ts.isIdentifier(current.expression) && current.expression.text === "createHash") return true;
    current = current.expression;
  }
  return false;
}

/** An expression without its grouping and type-only wrappers: (x), x as T, x satisfies T, <T>x and x!. */
function bare(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current) || ts.isNonNullExpression(current)) {
    current = current.expression;
  }
  return current;
}
/** The names one module binds to a key: every variable a declaration (at any depth) binds to a folded string (scalars) or to an
 * array literal whose every element folds (lists, as const read through). A name bound more than once keeps every binding, so a
 * read through it resolves to every value any of them holds. */
interface KeyBindings {
  readonly scalars: ReadonlyMap<string, readonly string[]>;
  readonly lists: ReadonlyMap<string, readonly (readonly string[])[]>;
}
const foldedList = (node: ts.Expression): string[] | undefined => {
  const value = bare(node);
  if (!ts.isArrayLiteralExpression(value)) return undefined;
  const elements = value.elements.map(element => fold(bare(element)));
  return elements.every((element): element is string => element !== undefined) ? elements : undefined;
};
function keyBindings(file: ts.SourceFile): KeyBindings {
  const scalars = new Map<string, string[]>();
  const lists = new Map<string, (readonly string[])[]>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const name = node.name.text;
      const folded = fold(bare(node.initializer));
      const list = foldedList(node.initializer);
      if (folded !== undefined) scalars.set(name, [...(scalars.get(name) ?? []), folded]);
      else if (list !== undefined) lists.set(name, [...(lists.get(name) ?? []), list]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { scalars, lists };
}
/** The key lists an expression names: an array literal whose every element folds, or a name bound to one. */
function listsOf(node: ts.Expression, bindings: KeyBindings): (readonly string[])[] {
  const value = bare(node);
  const literal = foldedList(value);
  if (literal !== undefined) return [literal];
  return ts.isIdentifier(value) ? [...(bindings.lists.get(value.text) ?? [])] : [];
}
/** The keys a name ranges over when it is the first parameter of an ITERATORS callback on a key list, or a for-of variable over
 * one; the nearest construct binding the name decides, so the parameter of any other function ranges over no list (a scalar
 * binding of the same name, matched by name in keysOf, still applies). */
function iteratedKeys(name: ts.Identifier, bindings: KeyBindings): string[] {
  const binds = (declared: ts.BindingName): boolean => ts.isIdentifier(declared) && declared.text === name.text;
  for (let node: ts.Node = name.parent; !ts.isSourceFile(node); node = node.parent) {
    if (ts.isForOfStatement(node) && ts.isVariableDeclarationList(node.initializer) && node.initializer.declarations.some(declaration => binds(declaration.name))) {
      return listsOf(node.expression, bindings).flat();
    }
    if (ts.isFunctionLike(node) && node.parameters.some(parameter => binds(parameter.name))) {
      const call = node.parent;
      const first = node.parameters[0];
      const iterated =
        (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
        first !== undefined &&
        binds(first.name) &&
        ts.isCallExpression(call) &&
        call.arguments[0] === node &&
        ts.isPropertyAccessExpression(call.expression) &&
        ITERATORS.includes(call.expression.name.text);
      return iterated && ts.isCallExpression(call) && ts.isPropertyAccessExpression(call.expression) ? listsOf(call.expression.expression, bindings).flat() : [];
    }
  }
  return [];
}
/** The keys an element access argument or a computed binding name reads (B1, C2, D2): its folded literal; the strings a bound name
 * holds; an element of a key list (a literal index reads that element, any other index every element); or the keys an iterated
 * name ranges over. A key composed at run time resolves to nothing (R-COMPOSED). */
function keysOf(node: ts.Expression, bindings: KeyBindings): string[] {
  const value = bare(node);
  const folded = fold(value);
  if (folded !== undefined) return [folded];
  if (ts.isIdentifier(value)) return [...new Set([...(bindings.scalars.get(value.text) ?? []), ...iteratedKeys(value, bindings)])];
  if (ts.isElementAccessExpression(value)) {
    const lists = listsOf(value.expression, bindings);
    const index = bare(value.argumentExpression);
    return [...new Set(ts.isNumericLiteral(index) ? lists.flatMap(list => list[Number(index.text)] ?? []) : lists.flat())];
  }
  return [];
}
/** The keys an object binding element reads: its property name or shorthand name, or the keys its computed name resolves to. */
function bindingKeys(node: ts.BindingElement, bindings: KeyBindings): string[] {
  const named = node.propertyName ?? node.name;
  if (ts.isIdentifier(named) || ts.isStringLiteral(named)) return [named.text];
  return ts.isComputedPropertyName(named) ? keysOf(named.expression, bindings) : [];
}

interface TextRead {
  readonly object: string;
  readonly use: "typeof" | "digest" | "other";
}
interface ModuleReading {
  readonly identifiers: string[];
  readonly literals: string[];
  readonly launches: string[];
  readonly followers: string[];
  readonly textReads: TextRead[];
  readonly keyReads: string[];
}
/** One module, parsed under its own script kind: its identifiers and folded literals, its rf launches (A1), the element after
 * "context" in each argv-shaped array (A1), its reads of a text field (B1) and the names it reads by property access, element
 * access or object binding, a key resolved through the module's own key bindings (keysOf, bindingKeys) (C2, D2). */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const bindings = keyBindings(file);
  const identifiers: string[] = [];
  const literals: string[] = [];
  const launches: string[] = [];
  const followers: string[] = [];
  const textReads: TextRead[] = [];
  const keyReads: string[] = [];
  /** The argv array literals passed straight to an rf launch: judged for their leaf even without a "--" flag. */
  const launchArgv = new Set<ts.Node>();
  const classify = (node: ts.Node): TextRead["use"] => {
    let child: ts.Node = node;
    let parent: ts.Node = node.parent;
    while (ts.isParenthesizedExpression(parent)) {
      child = parent;
      parent = parent.parent;
    }
    if (ts.isTypeOfExpression(parent)) return "typeof";
    if (ts.isCallExpression(parent) && parent.arguments.length === 1 && parent.arguments[0] === child && ts.isPropertyAccessExpression(parent.expression)) {
      const callee = parent.expression;
      if (callee.name.text === "update" && startsAtCreateHash(callee.expression)) return "digest";
    }
    return "other";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) identifiers.push(node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) literals.push(node.text);
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) literals.push(folded);
    }
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : undefined;
      const first = node.arguments[0] === undefined ? undefined : leadingText(node.arguments[0]);
      if (name !== undefined && LAUNCHERS.includes(name) && first !== undefined && first.trim().split(/\s+/)[0] === RF_BINARY) {
        launches.push(`${path} ${name}`);
        const argv = node.arguments[1];
        if (argv !== undefined && ts.isArrayLiteralExpression(argv)) launchArgv.add(argv);
      }
    }
    if (ts.isArrayLiteralExpression(node)) {
      const folded = node.elements.map(element => fold(element));
      if (launchArgv.has(node) || folded.some(value => value?.startsWith("--") === true)) {
        folded.forEach((value, index) => {
          const next = folded[index + 1];
          if (value === "context" && next !== undefined) followers.push(next);
        });
      }
    }
    if (ts.isPropertyAccessExpression(node)) {
      keyReads.push(node.name.text);
      if (node.name.text === TEXT_FIELD) textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
    }
    if (ts.isElementAccessExpression(node)) {
      for (const key of keysOf(node.argumentExpression, bindings)) {
        keyReads.push(key);
        if (key === TEXT_FIELD) textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
      }
    }
    if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      for (const key of bindingKeys(node, bindings)) {
        keyReads.push(key);
        if (key === TEXT_FIELD) {
          const declaration = node.parent.parent;
          const initializer = ts.isVariableDeclaration(declaration) ? declaration.initializer : undefined;
          textReads.push({ object: initializer === undefined ? "" : (tailName(initializer) ?? ""), use: "other" });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { identifiers, literals, launches, followers, textReads, keyReads };
}

const isReader = (reading: ModuleReading): boolean => reading.literals.includes(RENDER_COMMAND);
/** B1's judge for one module: every text read in a READER, and every output.text read anywhere, that is neither a typeof nor a digest. */
function textFindings(path: string, reading: ModuleReading): string[] {
  const reader = isReader(reading);
  return reading.textReads.filter(read => read.use === "other" && (reader || read.object === TEXT_OBJECT)).map(read => `${path}: ${read.object}.${TEXT_FIELD}`);
}
const wholeWordHits = (path: string, reading: ModuleReading, words: readonly string[], word: RegExp): string[] => [
  ...reading.identifiers.filter(name => words.includes(name)).map(name => `${path}: identifier ${name}`),
  ...reading.literals.filter(value => word.test(value)).map(value => `${path}: literal ${value.slice(0, 80)}`),
];
const keyHits = (path: string, reading: ModuleReading, keys: readonly string[]): string[] => reading.keyReads.filter(key => keys.includes(key)).map(key => `${path}: ${key}`);
/** C2's and D2's judge: the named keys a READER reads; a module that is no rf reader is not judged (R-GENERIC-KEY). */
const readerKeyFindings = (path: string, reading: ModuleReading, keys: readonly string[]): string[] => (isReader(reading) ? keyHits(path, reading, keys) : []);
/** How a module uses a record container it reads (C2): "count" its .length; "check" a row-shape test that reads no field of a row
 * (Array.isArray of it, or an every() whose one callback reads no property and binds no pattern); "other" anything else. */
type ContainerUse = "count" | "check" | "other";
const readsAField = (callback: ts.Node): boolean => {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) || ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) found = true;
    else ts.forEachChild(node, visit);
  };
  ts.forEachChild(callback, visit);
  return found;
};
const isArrayIsArray = (node: ts.Expression): boolean =>
  ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "Array" && node.name.text === "isArray";
const HELPERS = new WeakMap<ts.SourceFile, Map<string, ts.FunctionLikeDeclaration[]>>();
/** A module's own functions by name (a function declaration, or a variable bound to an arrow or function expression), at any depth. */
function moduleHelpers(file: ts.SourceFile): Map<string, ts.FunctionLikeDeclaration[]> {
  const cached = HELPERS.get(file);
  if (cached !== undefined) return cached;
  const helpers = new Map<string, ts.FunctionLikeDeclaration[]>();
  const add = (name: string, helper: ts.FunctionLikeDeclaration): void => {
    helpers.set(name, [...(helpers.get(name) ?? []), helper]);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) add(node.name.text, node);
    else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const value = bare(node.initializer);
      if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) add(node.name.text, value);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  HELPERS.set(file, helpers);
  return helpers;
}
/** A helper reads a field when its parameters or body hold a property access, an element access or a binding pattern - readsAField's
 * reading, Array.isArray (a global's member, never a row field) excepted, so the landed record() shape check reads none. */
const helperReadsAField = (helper: ts.FunctionLikeDeclaration): boolean => {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node) && isArrayIsArray(node)) return;
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) || ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) found = true;
    else ts.forEachChild(node, visit);
  };
  ts.forEachChild(helper, visit);
  return found;
};
/** True when a callback calls a function of its own module that reads a field: C2 follows a row-shape callback's helpers one level
 * (a helper's own calls, and a helper defined in another module, are not followed: R-INDIRECT). */
const callsAFieldReader = (callback: ts.Node): boolean => {
  const helpers = moduleHelpers(callback.getSourceFile());
  let found = false;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = bare(node.expression);
      if (ts.isIdentifier(callee) && (helpers.get(callee.text) ?? []).some(helperReadsAField)) found = true;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(callback, visit);
  return found;
};
function containerUse(node: ts.Expression): ContainerUse {
  let child: ts.Node = node;
  let parent: ts.Node = node.parent;
  while (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent)) {
    child = parent;
    parent = parent.parent;
  }
  if (ts.isPropertyAccessExpression(parent) && parent.expression === child) {
    if (parent.name.text === "length") return "count";
    const call = parent.parent;
    const callback = ts.isCallExpression(call) && call.expression === parent && call.arguments.length === 1 ? call.arguments[0] : undefined;
    const pure = callback !== undefined && (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) && !readsAField(callback) && !callsAFieldReader(callback);
    return parent.name.text === "every" && pure ? "check" : "other";
  }
  if (ts.isCallExpression(parent) && isArrayIsArray(parent.expression) && parent.arguments.length === 1 && parent.arguments[0] === child) return "check";
  return "other";
}
/** True for an identifier that names a value here: not the declaration itself and not a property name or a binding's key. */
function referenceOf(node: ts.Identifier, declared: ts.Identifier): boolean {
  if (node === declared) return false;
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent)) && parent.name === node) return false;
  return !(ts.isBindingElement(parent) && parent.propertyName === node);
}
/** C2's use judge for one module: `<path> <container> <use>` for each use of a record container it reads, in source order - a
 * property or element access (its key resolved through the module's key bindings) is used where it stands; a name bound by an
 * object binding (a computed name resolved the same way) is followed to every reference of that name in the enclosing function
 * (a nested pattern is "other"). */
function containerUses(path: string, source: string): string[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const bindings = keyBindings(file);
  const uses: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node) && CONTAINERS.includes(node.name.text)) uses.push(`${path} ${node.name.text} ${containerUse(node)}`);
    else if (ts.isElementAccessExpression(node)) {
      for (const key of keysOf(node.argumentExpression, bindings)) if (CONTAINERS.includes(key)) uses.push(`${path} ${key} ${containerUse(node)}`);
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      for (const key of bindingKeys(node, bindings)) {
        if (!CONTAINERS.includes(key)) continue;
        const declared = node.name;
        if (!ts.isIdentifier(declared)) uses.push(`${path} ${key} other`);
        else {
          let scope: ts.Node = node.parent;
          while (!ts.isSourceFile(scope) && !ts.isFunctionLike(scope)) scope = scope.parent;
          const collect = (child: ts.Node): void => {
            if (ts.isIdentifier(child) && child.text === declared.text && referenceOf(child, declared)) uses.push(`${path} ${key} ${containerUse(child)}`);
            ts.forEachChild(child, collect);
          };
          collect(scope);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return uses;
}
const otherUses = (uses: readonly string[]): string[] => uses.filter(use => use.endsWith(" other"));

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly readers: string[];
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  if (live === undefined) {
    const walk = walkRoots();
    const modules = new Map<string, ModuleReading>();
    for (const path of walk.modules) modules.set(path, readModule(path, readFileSync(join(REPO, path), "utf8")));
    const readers = [...modules].filter(([, reading]) => isReader(reading)).map(([path]) => path);
    live = { walk, modules, readers };
  }
  return live;
}
const below = (tree: TreeReading, root: string): number => tree.walk.modules.filter(path => path.startsWith(`${root}/`)).length;
const floorsMet = (tree: TreeReading): boolean => below(tree, "src") >= FLOORS.src && below(tree, "qa") >= FLOORS.qa && below(tree, "examples") >= FLOORS.examples;
/** A snippet read as a READER module: it carries the render command literal the readers check. */
const asReader = (body: string): string => `const COMMAND = "${RENDER_COMMAND}";\n${body}`;

/** A preview reading (the provider's output shape) of the full-shape fixture, its result and command adjusted. */
function previewReading(adjust: (result: JsonObject) => void, command = RENDER_COMMAND): JsonValue {
  const source = fullShapeRf(ROOT);
  source.command = command;
  const result = source.result;
  if (!isObject(result)) throw new Error("the fixture result must be an object");
  adjust(result as JsonObject);
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source } as JsonValue;
}
function withText(document: string): (result: JsonObject) => void {
  return result => {
    result.output = { text: document, size_bytes: Buffer.byteLength(document), digest: `sha256:${"b".repeat(64)}`, path: null };
  };
}
/** The adapter's refusal of a reading, as `<category>: <message>`, or "admitted". */
function adapterVerdict(reading: JsonValue): string {
  try {
    reactivefiberTopology(reading, HOST);
    return "admitted";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `untyped: ${String(error)}`;
  }
}
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
/** The top-level snapshot fields (and "relations" or "diagnostics") two projections differ in. */
function projectionDelta(left: ReturnType<typeof reactivefiberTopology>, right: ReturnType<typeof reactivefiberTopology>): string[] {
  const fieldsOf = (value: Json): JsonObject => (value !== null && typeof value === "object" && !Array.isArray(value) ? value : {});
  const a = fieldsOf(json(left.snapshots[0] ?? null));
  const b = fieldsOf(json(right.snapshots[0] ?? null));
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  const differ = (x: unknown, y: unknown): boolean => JSON.stringify(x) !== JSON.stringify(y);
  return [
    ...keys.filter(key => differ(a[key], b[key])),
    ...(differ(left.relations, right.relations) ? ["relations"] : []),
    ...(differ(left.diagnostics, right.diagnostics) ? ["diagnostics"] : []),
  ];
}
/** The property names of each input arm of a descriptor: each arm of a oneOf schema, else the schema's own properties. */
function inputArms(schema: Record<string, unknown>): string[][] {
  const keysOf = (arm: unknown): string[] => (isObject(arm) && isObject(arm.properties) ? Object.keys(arm.properties) : []);
  const arms = schema.oneOf;
  return Array.isArray(arms) ? arms.map(keysOf) : [keysOf(schema)];
}
/** The tier files' literals naming a claim of (d). */
function tierClaims(path: string): string[] {
  return readModule(path, readFileSync(join(REPO, path), "utf8"))
    .literals.filter(value => CLAIM_FAMILY.test(value))
    .map(value => `${path}: ${value.slice(0, 80)}`);
}
const tierInclude = (config: unknown): string[] => {
  const include = isObject(config) && isObject(config.test) ? config.test.include : undefined;
  return Array.isArray(include) ? include.filter((entry): entry is string => typeof entry === "string") : [];
};

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. It carries, last, the assertions its
 * test had made by then (vitest's matcher-state tally: the harness's case check plus the case's own expects), so a case that
 * returns its roster witness without measuring it no longer matches the roster. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness, asserted: expect.getState().assertionCalls };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const modulesFloorMet = floorsMet(tree);
    const walkListed = JSON.stringify([...tree.walk.modules].sort()) === JSON.stringify(listedModules());
    const readings = [...tree.modules];
    const launches = readings.flatMap(([, reading]) => reading.launches);
    const followers = [...new Set(readings.flatMap(([, reading]) => reading.followers))].sort();
    const verbLiterals = readings.flatMap(([path, reading]) => reading.literals.filter(value => VERB_FAMILY.test(value)).map(value => `${path}: ${value.slice(0, 80)}`));
    expect(modulesFloorMet, `modules: src ${below(tree, "src")}, qa ${below(tree, "qa")}, examples ${below(tree, "examples")}`).toBe(true);
    expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable directory").toStrictEqual({ symlinks: [], unreadable: [] });
    expect(walkListed, "the walk reads exactly the modules node's recursive listing of the walk roots holds").toBe(true);
    expect(launches, "rf launches in the judged modules: the provider's spawn alone").toEqual(["src/workbench/providers/reactivefiber.ts spawn"]);
    expect(followers, "the leaf after context in every argv-shaped array").toEqual(["render"]);
    expect(verbLiterals, "literals naming another context leaf of the measured rf").toEqual([]);
    const texts = tree.walk.texts;
    const textsBelow = (root: string): number => texts.filter(path => path.startsWith(`${root}/`)).length;
    const textsFloorMet = Object.entries(TEXT_FLOORS).every(([root, floor]) => textsBelow(root) >= floor);
    const textsListed = JSON.stringify([...texts].sort()) === JSON.stringify(listedFiles().filter(path => !isModule(path)));
    const held = new Set([...tree.walk.modules, ...texts, ...tree.walk.symlinks]);
    const git = gitListed();
    const unwalked = git.filter(path => !held.has(path));
    const unlisted = tree.walk.modules.filter(path => !git.includes(path));
    const textLaunches = texts.flatMap(path => launchLines(path, readFileSync(join(REPO, path), "utf8")));
    expect(textsFloorMet, `non-module files: ${Object.keys(TEXT_FLOORS).map(root => `${root} ${textsBelow(root)}`).join(", ")}`).toBe(true);
    expect(textsListed, "the walk reads exactly the non-module files node's recursive listing of the walk roots holds").toBe(true);
    expect(unwalked, "files git lists below the walk roots that the walk does not hold (the anchor outside both listings)").toEqual([]);
    expect(unlisted, "walked modules git does not list (so the git reading is never vacuous)").toEqual([]);
    expect(textLaunches, "rf launch lines naming another context leaf in the non-module files below the walk roots").toEqual([]);
    const of = (source: string): ModuleReading => readModule("c.ts", source);
    const lines = (source: string): number => launchLines("x.sh", source).length;
    const controls = {
      showArgv: of('spawn("rf", ["--workspace", root, "context", "show", id, "--json"]);\n').followers,
      diffArgv: of('const argv = ["context", "diff", a, b, "--json"];\n').followers,
      explainBlockArgv: of('execFileSync("rf", ["context", "explain", id, "--block", key, "--json"]);\n').followers,
      shellLaunch: of('execSync("rf context show " + id + " --json");\n').launches.length,
      templateShellLaunch: of(`execSync(\`rf context diff ${"$"}{a} ${"$"}{b} --json\`);\n`).launches.length,
      launchArgvWithoutFlag: of('spawn("rf", ["context", "show", id]);\n').followers,
      argvApart: of('const argv = ["context", "show", id];\nspawn("rf", argv);\n').followers,
      shellLaunchLiteral: of('execSync("rf context show " + id + " --json");\n').literals.some(value => VERB_FAMILY.test(value)),
      commandCheck: of('if (source.command === "context.diff") read(source);\n').literals.some(value => VERB_FAMILY.test(value)),
      renderArgv: of('spawn("rf", ["--workspace", root, "context", "render", "--no-commit", "--json"]);\n').followers,
      classList: of('const CLASSES = ["model", "build", "context", "queue"];\n').followers,
      composedVerb: of('const verb = pick();\nspawn("rf", ["context", verb, "--json"]);\n').followers,
      composedBinary: of('spawn(binary, ["context", "render", "--json"]);\n').launches.length,
      prose: of('const note = "the context window is full";\n').literals.some(value => VERB_FAMILY.test(value)),
      comment: of("// rf context show RENDER --json\nexport {};\n").literals.length,
      aliasedLauncher: of('const run = cp.spawnSync;\nrun("rf", ["context", "show", id]);\n').followers,
      shellShow: lines('rf --workspace "$1" context show "$2" --json\n'),
      shellContinued: lines('rf --workspace "$1" \\\n  context diff "$2" "$3" --json\n'),
      pathQualified: lines('exec /usr/local/bin/rf context explain "$1" --block "$2"\n'),
      shellRender: lines('rf --workspace "$1" context render --no-commit --json\n'),
      proseLeaf: lines("the context show verb is unshipped in Pi\n"),
      longerName: lines('rfx context show "$1"\nperf context show\n'),
      scriptComposedBinary: lines('RF=rf\n"$RF" context show "$1"\n'),
      scriptArgvApart: lines('set -- context show "$1"\nexec rf "$@"\n'),
    };
    return done("A1", {
      modulesFloorMet,
      walkListed,
      launches,
      followers,
      verbLiterals,
      otherVerbs: [...VOCABULARY.otherVerbs],
      textsFloorMet,
      textsListed,
      unwalked,
      unlisted,
      textLaunches,
      controls,
    });
  },
  A2: () => {
    const tree = liveTree();
    // A refusal naming the render command reads as its category alone; any other verdict is kept whole, so a changed reason shows.
    const refusalOf = (verdict: string): string => (verdict.includes(`${RENDER_COMMAND} envelope`) ? verdict.slice(0, verdict.indexOf(":")) : verdict);
    const refusals = Object.fromEntries(VOCABULARY.otherVerbs.map(verb => [verb, refusalOf(adapterVerdict(previewReading(() => {}, `${LEAF_PREFIX}${verb}`)))]));
    const evidence = Object.fromEntries(VOCABULARY.otherVerbs.map(verb => [verb, Object.keys(nativeEvidence("reactivefiber.render.preview", previewReading(() => {}, `${LEAF_PREFIX}${verb}`))).length]));
    const renderAdmitted = adapterVerdict(previewReading(() => {})) === "admitted";
    const renderEvidence = nativeEvidence("reactivefiber.render.preview", previewReading(() => {})).provider ?? null;
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(
      injected,
      async () => {
        throw new Error("the census never invokes the capability");
      },
      ROOT,
    );
    const native = new CapabilityRegistry();
    registerNativeReactiveFiberRender(native, ROOT);
    const descriptors = [...injected.catalogSnapshot(), ...native.catalogSnapshot()].map(entry => entry.descriptor);
    const arms = descriptors.map(descriptor => inputArms(descriptor.inputSchema));
    const selectorKeys = arms.flat(2).filter(key => SELECTOR_WORDS.test(key));
    expect(tree.readers, "the judged modules holding the render command literal").toEqual(["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"]);
    expect(renderAdmitted && renderEvidence === "reactivefiber", "the render control is admitted by the adapter and projected by the evidence reader").toBe(true);
    expect(Object.values(refusals).every(verdict => verdict === "validation"), "the adapter refuses every other context leaf as a non-render envelope").toBe(true);
    expect(Object.values(evidence).every(count => count === 0), "the evidence reader projects nothing of another leaf").toBe(true);
    expect(selectorKeys, "capability input keys naming a block-read selector").toEqual([]);
    return done("A2", {
      readers: [...tree.readers],
      refusals,
      evidence,
      renderAdmitted,
      renderEvidence,
      ids: descriptors.map(descriptor => descriptor.id),
      effectClasses: descriptors.map(descriptor => descriptor.effectClass),
      contractRendersOnly: descriptors.every(descriptor => descriptor.contractSource?.endsWith(`${RENDER_COMMAND} --no-commit`) === true),
      arms,
      selectorKeys,
    });
  },
  B1: () => {
    const tree = liveTree();
    const reads = tree.readers.flatMap(path => (tree.modules.get(path)?.textReads ?? []).map(read => `${path} ${read.object}.${TEXT_FIELD} ${read.use}`));
    const outputReads = [...tree.modules].flatMap(([path, reading]) => reading.textReads.filter(read => read.object === TEXT_OBJECT).map(read => `${path} ${read.use}`));
    const findings = [...tree.modules].flatMap(([path, reading]) => textFindings(path, reading));
    expect(outputReads, "every output.text read in the judged modules (the non-vacuity anchor)").toEqual([
      "src/workbench/providers/reactivefiber.ts typeof",
      "src/workbench/reactivefiber-observer.ts typeof",
      "src/workbench/reactivefiber-observer.ts digest",
    ]);
    expect(findings, "rf document text read other than by a typeof or a sha256 digest").toEqual([]);
    const reader = (body: string): number => textFindings("c.ts", readModule("c.ts", asReader(body))).length;
    const other = (body: string): number => textFindings("c.ts", readModule("c.ts", body)).length;
    const controls = {
      matchMarkers: reader("const blocks = output.text.match(/<!-- block (\\S+) -->/g);\n"),
      splitMarkers: reader('const parts = result.output.text.split("<!-- block");\n'),
      regexExec: reader("const found = new RegExp(marker).exec(output.text);\n"),
      alias: reader("const document = output.text;\n"),
      destructure: reader("const { text } = output;\n"),
      elementAccess: reader('const at = output["text"].indexOf(marker);\n'),
      passThrough: reader("const blocks = extractBlocks(source.result.output.text);\n"),
      updateWithoutHash: reader("hasher.update(output.text);\n"),
      readerOtherText: reader("const trimmed = node.text.trim();\n"),
      typeofCheck: reader('if (typeof output.text !== "string") throw refused();\n'),
      digest: reader('const ref = createHash("sha256").update(output.text).digest("hex");\n'),
      parenthesizedDigest: reader('const ref = createHash("sha256").update((output.text)).digest("hex");\n'),
      outputOutsideReaders: other('const lines = result.output.text.split("\\n");\n'),
      messageOutsideReaders: other('const lines = message.text.split("\\n");\n'),
      aliasOutsideReaders: other("const o = result.output;\nconst parts = o.text.split(marker);\n"),
      computedKey: other('const field = "te" + suffix;\nconst parts = output[field].split(marker);\n'),
      reflectGet: reader('const marks = String(Reflect.get(output, "text")).split(marker);\n'),
      serializedOutput: reader("const marks = JSON.stringify(output).match(/<!-- block/g);\n"),
      constKey: reader('const FIELD = "text";\nconst parts = output[FIELD].split(marker);\n'),
      keyListKey: reader("const FIELDS = ['text', 'size_bytes'] as const;\nconst head = output[FIELDS[0]].slice(0, 12);\n"),
    };
    return done("B1", { readers: [...tree.readers], reads, outputReads, findings, controls });
  },
  B2: () => {
    const marked = previewReading(withText(MARKED_TEXT));
    const remarked = previewReading(withText(REMARKED_TEXT));
    const left = reactivefiberTopology(marked, HOST);
    const right = reactivefiberTopology(remarked, HOST);
    const surfaced = JSON.stringify([left, right]);
    const surfacedTokens = MARKER_TOKENS.filter(token => surfaced.includes(token));
    const payloadRefs = [left, right].map(projection => projection.snapshots[0]?.nativePayloadRef ?? null);
    const digestOnly = payloadRefs[0] === `rf-output:sha256:${sha256(MARKED_TEXT)}` && payloadRefs[1] === `rf-output:sha256:${sha256(REMARKED_TEXT)}`;
    const delta = projectionDelta(left, right);
    const evidenceLeft = nativeEvidence("reactivefiber.render.preview", marked);
    const evidenceRight = nativeEvidence("reactivefiber.render.preview", remarked);
    const evidenceEqual = JSON.stringify(evidenceLeft) === JSON.stringify(evidenceRight);
    const evidenceTokens = MARKER_TOKENS.filter(token => JSON.stringify(evidenceLeft).includes(token));
    expect({ snapshots: left.snapshots.length, relations: left.relations.length }, "one snapshot, no relation, for a marked document").toStrictEqual({ snapshots: 1, relations: 0 });
    expect(surfacedTokens, "marker tokens in the projected strings").toEqual([]);
    expect(digestOnly, "the payload reference is the sha256 of exactly the document text").toBe(true);
    expect(delta, "a marker-only change moves only the digest reference").toEqual(["nativePayloadRef"]);
    expect({ evidenceEqual, evidenceTokens, provider: evidenceLeft.provider }, "the evidence projection ignores the document").toStrictEqual({ evidenceEqual: true, evidenceTokens: [], provider: "reactivefiber" });
    return done("B2", {
      snapshots: left.snapshots.length,
      relations: left.relations.length,
      surfacedTokens,
      digestOnly,
      delta,
      evidenceEqual,
      evidenceTokens,
      evidenceProvider: evidenceLeft.provider ?? null,
    });
  },
  C1: () => {
    const tree = liveTree();
    const hits = [...tree.modules].flatMap(([path, reading]) => wholeWordHits(path, reading, VOCABULARY.blockFields, BLOCK_WORD));
    const anchors = ["graph_revision_id", "render_id", "storage_write_count"];
    const anchored = anchors.every(name => tree.readers.some(path => tree.modules.get(path)?.identifiers.includes(name) === true));
    expect(VOCABULARY.unclassified, "every measured record field and diff key is snake_case or one word").toEqual([]);
    expect(anchored, `the name reader reads the render fields the readers do read (${anchors.join(", ")})`).toBe(true);
    expect(hits, "rf block or component record fields spelled in a judged module").toEqual([]);
    const spelled = (source: string): number => wholeWordHits("c.ts", readModule("c.ts", source), VOCABULARY.blockFields, BLOCK_WORD).length;
    const controls = {
      propertyAccess: spelled("const key = block.candidate_key;\n"),
      elementAccess: spelled('const id = row["component_instance_id"];\n'),
      destructure: spelled("const { content_digest } = block;\n"),
      objectKey: spelled("const row = { final_index: 0 };\n"),
      pathLiteral: spelled('const path = "result.blocks[0].component_id";\n'),
      folded: spelled('const key = "candidate" + "_key";\n'),
      template: spelled(`const path = \`${"$"}{prefix}.token_cost_kind\`;\n`),
      camelCase: spelled("const key = block.candidateKey;\n"),
      composedField: spelled('const key = row[["candidate", "key"].join("_")];\n'),
      comment: spelled("// candidate_key\nexport {};\n"),
      genericField: spelled("const body = block.content;\n"),
      longerName: spelled('const key = block.candidate_key_v2;\nconst label = "candidate_keys";\n'),
      outsideRoots: ["test/helpers/rf-render-fixture.ts", "docs/workbench/09-observation.md", "src/workbench/x.ts", "qa/workbench/x.mjs"].map(judgedPath),
    };
    return done("C1", { fields: [...VOCABULARY.blockFields], hits, anchored, controls });
  },
  C2: () => {
    const tree = liveTree();
    const containerReads = [...tree.modules].flatMap(([path, reading]) => readerKeyFindings(path, reading, CONTAINERS));
    const uses = tree.readers.flatMap(path => containerUses(path, readFileSync(join(REPO, path), "utf8")));
    const useFindings = otherUses(uses);
    // Planted rows in the measured rf's own vocabulary (context.render.schema.json at the roster's rfCommit, the roster's
    // schemaDigests entry): token_cost.kind = token_cost_kind in measured | estimated | unknown (unknown exactly when tokens is
    // null), component status in ok | failed | recovered, source_unavailable a list of lens:<key> refs.
    const blockRow = (candidate: string, component: string, index: number, tokens: number | null, kind: string): JsonObject => ({
      candidate_key: candidate,
      component_id: component,
      final_index: index,
      token_cost: { kind, tokens },
      token_cost_kind: kind,
    });
    const componentRow = (component: string, instance: string, revision: string, status: string, unavailable: string[]): JsonObject => ({
      component_id: component,
      component_instance_id: instance,
      component_revision_id: `sha256:${revision.repeat(64)}`,
      source_unavailable: unavailable,
      status,
    });
    const attributed = [blockRow("demo.notes:notes::summary", "demo.notes", 0, 6, "estimated"), blockRow("demo.aside:aside::main", "demo.aside", 1, 4, "estimated")];
    const components = [
      componentRow("demo.notes", "notes", "c", "ok", []),
      componentRow("demo.aside", "aside", "d", "failed", ["lens:demo.feed"]),
      componentRow("demo.extra", "extra", "a", "recovered", []),
    ];
    // The withheld pair keeps the block count the leg reads (a count read is not a record read) and differs in every other
    // per-row count: each value of each non-positional row field, and the component row count (pairDiffers below).
    const reattributed = [blockRow("demo.other:other::lead", "demo.other", 0, 9, "measured"), blockRow("demo.third:third::tail", "demo.third", 1, null, "unknown")];
    const recomponents = [componentRow("demo.other", "other", "e", "ok", ["lens:demo.wire"]), componentRow("demo.third", "third", "f", "ok", ["lens:demo.wire"])];
    const extra = blockRow("demo.more:more::extra", "demo.more", 2, 1, "estimated");
    /** A judged candidate the render withholds (include false), so the inclusion leg demotes and states its note. */
    const withheldKey = "demo.withheld:withheld::main";
    const records = (blocks: JsonObject[], rows: JsonObject[], withholds: boolean) => (result: JsonObject) => {
      withText(MARKED_TEXT)(result);
      result.blocks = blocks;
      result.components = rows;
      if (withholds) result.necessity = [rfFixtureDecision(), rfFixtureDecision(false, withheldKey)];
    };
    const bare = previewReading(withText(MARKED_TEXT));
    const populated = previewReading(records(attributed, components, false));
    const withheld = previewReading(records(attributed, components, true));
    const rewithheld = previewReading(records(reattributed, recomponents, true));
    const withheldMore = previewReading(records([...attributed, extra], components, true));
    const project = (reading: JsonValue): string => JSON.stringify(reactivefiberTopology(reading, HOST));
    const evidence = (reading: JsonValue): string => JSON.stringify(nativeEvidence("reactivefiber.render.preview", reading));
    const projectionEqual = project(bare) === project(populated);
    const evidenceEqual = evidence(bare) === evidence(populated);
    const withheldProjectionEqual = project(withheld) === project(rewithheld);
    const withheldEvidenceEqual = evidence(withheld) === evidence(rewithheld);
    const countDelta = projectionDelta(reactivefiberTopology(withheld, HOST), reactivefiberTopology(withheldMore, HOST));
    /** True when two row sets differ in the count of every value of every non-positional field (final_index is positional:
     * 0..n-1 in both sets, as rf states it), each value compared as its JSON. */
    const countsDiffer = (left: JsonObject[], right: JsonObject[]): boolean => {
      const tally = (rows: JsonObject[], field: string): Map<string, number> => {
        const counts = new Map<string, number>();
        for (const row of rows) {
          const value = JSON.stringify(row[field] ?? null);
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
        return counts;
      };
      const fields = [...new Set([...left, ...right].flatMap(row => Object.keys(row)))].filter(field => field !== "final_index");
      return fields.every(field => {
        const a = tally(left, field);
        const b = tally(right, field);
        return [...new Set([...a.keys(), ...b.keys()])].every(value => (a.get(value) ?? 0) !== (b.get(value) ?? 0));
      });
    };
    const pairDiffers = { blocks: countsDiffer(attributed, reattributed), components: countsDiffer(components, recomponents) && components.length !== recomponents.length };
    const planted = [
      ...new Set(
        [...attributed, ...reattributed, extra, ...components, ...recomponents]
          .flatMap(row => Object.values(row))
          .flatMap(value => (Array.isArray(value) ? value : [value]))
          .filter((value): value is string => typeof value === "string" && value.includes("demo.")),
      ),
      withheldKey,
    ];
    const surfaced = [bare, populated, withheld, rewithheld, withheldMore].map(reading => project(reading) + evidence(reading)).join("\n");
    const recordTokens = planted.filter(token => surfaced.includes(token));
    expect(containerReads, "record containers read in an rf reader: the adapter's result.blocks binding alone").toEqual(["src/workbench/reactivefiber-observer.ts: blocks"]);
    expect(uses, "every use of a record container an rf reader reads (the non-vacuity anchor)").toEqual([
      "src/workbench/reactivefiber-observer.ts blocks check",
      "src/workbench/reactivefiber-observer.ts blocks check",
      "src/workbench/reactivefiber-observer.ts blocks count",
      "src/workbench/reactivefiber-observer.ts blocks count",
      "src/workbench/reactivefiber-observer.ts blocks count",
    ]);
    expect(useFindings, "a record container read beyond its count and row shape in an rf reader").toEqual([]);
    expect({ projectionEqual, evidenceEqual }, "attributed records change no projection and no evidence field").toStrictEqual({ projectionEqual: true, evidenceEqual: true });
    expect({ withheldProjectionEqual, withheldEvidenceEqual }, "on a render withholding a judged candidate, attributed records change neither").toStrictEqual({
      withheldProjectionEqual: true,
      withheldEvidenceEqual: true,
    });
    expect(countDelta, "one more block moves only the diagnostics: the inclusion leg reads a count").toEqual(["diagnostics"]);
    expect(pairDiffers, "the withheld pair differs in every per-row value count (status, kind, unavailable lenses) and in its component count").toStrictEqual({
      blocks: true,
      components: true,
    });
    expect(recordTokens, "planted record values in any projected string").toEqual([]);
    const reader = (body: string): number => readerKeyFindings("c.ts", readModule("c.ts", asReader(body)), CONTAINERS).length;
    const others = (body: string): number => otherUses(containerUses("c.ts", asReader(body))).length;
    const both = (body: string): number => reader(body) + others(body);
    const reflective = "const rows = Object.values(result).filter(Array.isArray).length;\n";
    const controls = {
      findBlock: reader("const block = result.blocks.find(row => row.final_index === 0);\n"),
      elementAccess: reader('const rows = source.result["components"];\n'),
      destructure: reader("const { blocks } = result;\n"),
      containerOutsideReaders: readerKeyFindings("c.ts", readModule("c.ts", "const rows = plan.blocks;\n"), CONTAINERS).length,
      constructionInReader: reader("const result = { blocks: [], components: [] };\n"),
      countRead: others("const n = result.blocks.length;\n"),
      shapeCheck: others("const { blocks } = result;\nif (!Array.isArray(blocks) || !blocks.every(item => isRow(item))) throw refused();\nconst n = blocks.length;\n"),
      shapeCheckReadsField: others("const { blocks } = result;\nconst ok = blocks.every(item => item.content !== undefined);\n"),
      findRow: others("const block = result.blocks.find(row => row.final_index === 0);\n"),
      elementRead: others("const { blocks } = result;\nconst first = blocks[0];\n"),
      mapRows: others("const ids = result.blocks.map(row => row.component_id);\n"),
      loopRows: others("for (const block of result.blocks) use(block);\n"),
      spreadRows: others("const rows = [...result.blocks];\n"),
      passThrough: others("const { blocks } = result;\nsummarize(blocks);\n"),
      aliasRows: others("const rows = result.blocks;\nconst n = rows.length;\n"),
      nestedBinding: others("const { blocks: [first] } = result;\n"),
      reflectiveRows: reader(reflective) + others(reflective),
      constIndexKey: both("const KEYS = ['blocks', 'necessity'] as const;\nconst rows = result[KEYS[0]];\n"),
      constScalarKey: both('const KEY = "components";\nconst rows = source.result[KEY];\n'),
      computedBinding: both("const KEYS = ['blocks'] as const;\nconst { [KEYS[0]]: rows } = result;\nconst head = rows.find(row => row.final_index === 0);\n"),
      computedBindingCount: others("const KEYS = ['blocks'] as const;\nconst { [KEYS[0]]: rows } = result;\nconst n = rows.length;\n"),
      keyListCallback: both("const KEYS = ['blocks', 'necessity'];\nconst lists = KEYS.map(key => result[key]);\n"),
      keyListLoop: both("for (const key of ['components']) use(result[key]);\n"),
      shadowedKey: both("const KEY = 'blocks';\nconst read = (KEY) => result[KEY];\n"),
      helperReadsField: others("const live = (row) => row.status === 'ok';\nconst { blocks } = result;\nif (!blocks.every(item => live(item))) throw refused();\n"),
      helperShapeCheck: others("const isRow = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);\nconst { blocks } = result;\nif (!blocks.every(item => isRow(item))) throw refused();\n"),
      composedContainer: both('const rows = result[["block", "s"].join("")];\n'),
      objectMemberKey: both('const K = { rows: "blocks" } as const;\nconst rows = result[K.rows];\n'),
      twoLevelHelper: others("const deep = (row) => row.status === 'ok';\nconst live = (row) => deep(row);\nconst { blocks } = result;\nif (!blocks.every(item => live(item))) throw refused();\n"),
      importedHelper: others('import { live } from "./rows.js";\nconst { blocks } = result;\nif (!blocks.every(item => live(item))) throw refused();\n'),
    };
    return done("C2", {
      containers: [...CONTAINERS],
      containerReads,
      uses,
      useFindings,
      projectionEqual,
      evidenceEqual,
      withheldProjectionEqual,
      withheldEvidenceEqual,
      countDelta,
      pairDiffers,
      plantedTokens: planted.length,
      recordTokens,
      controls,
    });
  },
  D1: () => {
    const tree = liveTree();
    const hits = [...tree.modules].flatMap(([path, reading]) => wholeWordHits(path, reading, VOCABULARY.diffKeys, DIFF_WORD));
    expect(hits, "rf diff result keys spelled in a judged module").toEqual([]);
    const spelled = (source: string): number => wholeWordHits("c.ts", readModule("c.ts", source), VOCABULARY.diffKeys, DIFF_WORD).length;
    const controls = {
      propertyAccess: spelled("const before = diff.render_a;\n"),
      elementAccess: spelled('const rows = envelope.result["lens_snapshots"];\n'),
      destructure: spelled("const { token_totals } = result;\n"),
      pathLiteral: spelled('const path = "result.graph_revision.changed";\n'),
      renderKey: spelled("const revision = result.graph_revision_id;\n"),
      genericKey: spelled("const counts = diff.summary;\n"),
      comment: spelled("// render_b\nexport {};\n"),
    };
    return done("D1", { keys: [...VOCABULARY.diffKeys], hits, controls });
  },
  D2: () => {
    const tree = liveTree();
    const genericReads = [...tree.modules].flatMap(([path, reading]) => readerKeyFindings(path, reading, VOCABULARY.genericDiffKeys));
    const planted: JsonObject = { render_a: `rfr_${"c".repeat(22)}`, render_b: `rfr_${"d".repeat(22)}`, blocks: [], summary: { content_changed: 1 } };
    const absent = ROSTER.producer.diffResultKeys.filter(key => !Object.hasOwn(planted, key));
    const diffSource = {
      schema: "reactive-fiber.cli/v1",
      ok: true,
      command: "context.diff",
      operation_id: `rfo_${"b".repeat(22)}`,
      workspace: { id: `rfw_${"a".repeat(22)}`, root: ROOT },
      transaction_id: null,
      result: planted,
      diagnostics: [],
    };
    const diffReading: JsonValue = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: diffSource };
    const verdict = adapterVerdict(diffReading);
    const refused = verdict.startsWith("validation: ") && verdict.includes(`${RENDER_COMMAND} envelope`);
    const evidenceKeys = Object.keys(nativeEvidence("reactivefiber.render.preview", diffReading)).length;
    expect(genericReads, "one-word diff keys read in an rf reader").toEqual([]);
    expect(absent.length >= 5, `the planted diff envelope omits at least the five keys the program's consumer guessed: ${absent.join(", ")}`).toBe(true);
    expect({ refused, evidenceKeys }, "a diff envelope with absent keys is refused and projects nothing").toStrictEqual({ refused: true, evidenceKeys: 0 });
    const reader = (body: string): number => readerKeyFindings("c.ts", readModule("c.ts", asReader(body)), VOCABULARY.genericDiffKeys).length;
    const controls = {
      summaryRead: reader("const changed = envelope.result.summary.changed;\n"),
      elementAccess: reader('const sides = result["sides"];\n'),
      destructure: reader("const { attribution } = result;\n"),
      genericOutsideReaders: readerKeyFindings("c.ts", readModule("c.ts", "const counts = entry.summary;\n"), VOCABULARY.genericDiffKeys).length,
      constKey: reader('const KEY = "summary";\nconst counts = result[KEY];\n'),
      keyListLoop: reader("for (const key of ['sides', 'attribution']) use(result[key]);\n"),
    };
    return done("D2", { genericKeys: [...VOCABULARY.genericDiffKeys], genericReads, absent, refused, evidenceKeys, controls });
  },
  E1: () => {
    const { producer } = ROSTER;
    const show = producer.options["context.show"] ?? [];
    const diff = producer.options["context.diff"] ?? [];
    const explain = producer.options["context.explain"] ?? [];
    const showBlockServed = show.includes("--block");
    const diffDetailServed = diff.includes("--detail");
    const contractShipped = showBlockServed || diffDetailServed;
    const bead = readBeadRow();
    const beadSaysUnshipped = bead.notes.includes(ROSTER.shipped);
    const gatingNamed = producer.gatingBeads.every(entry => bead.notes.includes(`(${entry.id})`));
    const gatingSites = producer.gatingBeads.map(entry => entry.site.slice(entry.site.lastIndexOf(":") + 1));
    const gatingLine = bead.notes.includes(`BEADS-2026-10-21.md:${gatingSites.join("-")}`);
    const gatingTitles = producer.gatingBeads.map(entry => entry.title.includes("context show --block KEY") || entry.title.includes("context diff --detail compact"));
    const capture: unknown = JSON.parse(readFileSync(join(REPO, CAPTURE), "utf8"));
    const rows = isObject(capture) && isObject(capture.envelope) && isObject(capture.envelope.result) && Array.isArray(capture.envelope.result.leaves) ? capture.envelope.result.leaves : [];
    const served = (leaf: string): boolean => rows.some((row: unknown) => isObject(row) && row.path === leaf && row.served === true);
    const capturedServed = { "context.show": served("context.show"), "context.diff": served("context.diff") };
    const captured: { [key: string]: unknown } = isObject(capture) && isObject(capture.envelope) && isObject(capture.envelope.result) ? capture.envelope.result : {};
    const capturedCommit = isObject(captured.provenance) ? captured.provenance.commit_id : undefined;
    const capturedLeaves = rows.flatMap((row: unknown) => (isObject(row) && typeof row.path === "string" && row.path.startsWith(LEAF_PREFIX) && row.served === true ? [row.path] : []));
    const producerCaptured =
      JSON.stringify({ version: captured.version, commit: capturedCommit, leaves: capturedLeaves }) ===
      JSON.stringify({ version: producer.rfVersion, commit: producer.rfCommit, leaves: producer.contextLeaves });
    expect({ beadSaysUnshipped, gatingNamed, gatingLine }, `the bead row ${BEAD} states the gating artifacts open and unshipped`).toStrictEqual({ beadSaysUnshipped: true, gatingNamed: true, gatingLine: true });
    expect(contractShipped, "a selector shipped: (d) is owed with this re-measure (wb-hs2j.2)").toBe(false);
    expect(capturedServed, "the captured rf registry serves the leaves Pi does not issue").toStrictEqual({ "context.show": true, "context.diff": true });
    expect(producerCaptured, `the roster's rf version, commit and served context leaves are the captured registry's (${CAPTURE})`).toBe(true);
    return done("E1", {
      contractShipped,
      showBlockServed,
      diffDetailServed,
      explainBlockServed: explain.includes("--block"),
      showDetailServed: show.includes("--detail"),
      beadSaysUnshipped,
      gatingNamed,
      gatingLine,
      gatingTitles,
      capturedServed,
      producerCaptured,
      pinIsCitationSha: ROSTER.citation.endsWith(`@${producer.programPin.sha.slice(0, 12)}`),
    });
  },
  E2: () => {
    const tierFiles = [...tierInclude(rfConfig), ...tierInclude(rfTsxConfig)];
    const toml = readFileSync(join(REPO, "forge.toml"), "utf8");
    const commands = TIER_COMMANDS.map((command, index) =>
      new RegExp(`^\\[build\\.commands\\.${escaped(command)}\\]\\ncommand = "[^"\\n]*--config ${escaped(TIER_CONFIGS[index] ?? "")}[^"\\n]*"$`, "m").test(toml),
    );
    const claims = tierFiles.flatMap(tierClaims);
    expect(tierFiles.length, "each rf tier config includes at least one file").toBeGreaterThanOrEqual(TIER_CONFIGS.length);
    expect(commands, "forge.toml runs both rf tiers through their configs").toEqual([true, true]);
    expect(claims, "rf tier literals claiming (d) before rf ships it").toEqual([]);
    const claim = (value: string): boolean => CLAIM_FAMILY.test(value);
    const controls = {
      showLeaf: claim("rf context show RENDER --json"),
      diffLeaf: claim("context.diff"),
      blockFlag: claim("--block"),
      detailFlag: claim("--detail compact"),
      scopedDigest: claim("the scoped digest equals the full envelope's"),
      compactCounts: claim("compact counts reconcile"),
      renderLeaf: claim("rf context render --no-commit --json"),
      explainLeaf: claim("context explain"),
    };
    return done("E2", { tierFiles, commands, claims, controls });
  },
};

describe("wb-hs2j.2 rf context read structure census (RF-REACTIVE-CONTEXT-ASSEMBLY-R2, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "D:2", "E:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        walkRoots: WALK_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        floors: FLOORS,
        textFloors: TEXT_FLOORS,
        renderCommand: RENDER_COMMAND,
        launchers: LAUNCHERS,
        rfBinary: RF_BINARY,
        rfWord: `${RF_WORD.source}/${RF_WORD.flags}`,
        iterators: ITERATORS,
        followUp: FOLLOW_UP,
        textRead: `${TEXT_OBJECT}.${TEXT_FIELD}`,
        containers: CONTAINERS,
        selectorWords: `${SELECTOR_WORDS.source}/${SELECTOR_WORDS.flags}`,
        claimFamily: `${CLAIM_FAMILY.source}/${CLAIM_FAMILY.flags}`,
        verbFamily: `${VERB_FAMILY.source}/${VERB_FAMILY.flags}`,
        tierConfigs: TIER_CONFIGS,
        tierCommands: TIER_COMMANDS,
        capture: CAPTURE,
        markerTokens: MARKER_TOKENS,
        otherVerbs: VOCABULARY.otherVerbs,
        blockFields: VOCABULARY.blockFields,
        genericBlockFields: VOCABULARY.genericBlockFields,
        diffKeys: VOCABULARY.diffKeys,
        genericDiffKeys: VOCABULARY.genericDiffKeys,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^Not P0: (Pi issues no context show\/diff verb today) \(/m.exec(bead.notes)?.[1] ?? "";
    const source = /^Source: ReactiveFiberCLI (\S+) '([^']+)'/m.exec(bead.notes);
    const merged = /Merged \(rca-diff-keys-never-guessed\) (\S+) '([^']+)'/.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["E"], ["A"]]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect({ citation: source?.[1], quote: source?.[2], mergedCitation: merged?.[1], mergedQuote: merged?.[2] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedCitation: ROSTER.mergedCitation,
      mergedQuote: ROSTER.mergedQuote,
    });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    // The pins' and residuals' anchors outside this file and the roster: what BEAD's delivery and FOLLOW_UP's filing recorded.
    const delivered = deliveredShape(bead.notes);
    const shortRows = delivered.filter(entry => (ROWS.find(row => row.id === entry.slice(0, 1))?.pins.length ?? 0) < Number(entry.slice(2)));
    expect(delivered, `the frozen shape ${BEAD}'s delivery recorded`).toEqual(["A:2", "B:2", "C:2", "D:2", "E:2"]);
    expect(shortRows, "rows holding fewer pins than the delivery recorded (a per-row floor)").toEqual([]);
    const named = namedResiduals(bead.notes, readBeadRow(FOLLOW_UP).notes);
    expect(named, `the residual families ${BEAD}'s delivery and ${FOLLOW_UP}'s filed findings name`).toEqual([
      "R-ALIAS",
      "R-COMMENT",
      "R-COMPOSED",
      "R-GENERIC-KEY",
      "R-INDIRECT",
      "R-OUTSIDE",
      "R-REFLECTIVE",
      "R-RENAMED",
    ]);
    expect(
      named.filter(family => !RESIDUAL_FAMILIES.includes(family)),
      "residual families named outside this file that it no longer carries (a floor)",
    ).toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
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
  });
});
