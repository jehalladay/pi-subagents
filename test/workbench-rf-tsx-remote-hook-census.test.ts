/**
 * wb-o4h0.4 (RF-FEDERATED-WORKSPACES-R5), the absent-today leg. Statement (bead notes, full form): "If Pi ever authors TSX
 * components over federated imports, useRemoteResource-style hooks are usable only after the Components/TSX contracts
 * implement them (gated, unshipped — docs-only at the pin, no FW bead), the component's read-set and render report must include
 * the imported dependency and resolved revision (engine-realised fields Pi asserts on producer output, never supplies), and no
 * network activity may occur during pure component render" (ReactiveFiberCLI
 * docs/programs/federated-workspaces-2026-10-18/04-cli-api.md:91@6a251bf73af5). Acceptance: "(a) census: no Pi-authored TSX
 * fixture imports useRemoteResource while the contract is unshipped; (b) when shipped, a render test in Pi's rf-tsx tier proves
 * zero network activity during pure component render of a federated import; (c) the render report carries the imported
 * dependency and resolved revision fields, asserted on producer output."
 *
 * Pi authors no TSX component today: rf renders the TSX components of an operator-provisioned workspace (the rf-tsx tier's
 * WORKBENCH_RF_TSX_FIXTURE), and the TSX module texts in this repository are control fixtures other censuses plant in scratch
 * for their own scanners (test/workbench-unsafe-display-oracle.test.ts at this cut). So the statement's trigger has not
 * fired, (a) holds by absence, and (b) and (c) wait for the contract. The census pins that state:
 *  A, the trigger's inventory, empty today. A1 no walked file has a .tsx or .jsx extension (any letter case) and no walked
 *    module holds a JSX element, self-closing element or fragment; A2 no module loads the TSX SDK (@reactive-fiber/tsx: bare,
 *    a subpath, an npm:, jsr: or URL specifier, a JS-escaped, type-asserted or constant-folded literal, a comma sequence's
 *    last operand included) through an import or export
 *    declaration, an import-equals require, an import type in code, a triple-slash types, path or amd-dependency directive,
 *    a @jsxImportSource pragma, a JSDoc import type or @import tag in a JS-family module (JSDOC_EXTENSIONS: the program reads
 *    types from a JS module's JSDoc; to TypeScript a TS module's JSDoc is a comment), as the first argument of any call or new
 *    expression (a dynamic import, require, require.resolve, an aliased or created require, new URL: any literal there that
 *    names it), or as a later argument or an element of an array or spread argument whose folded value is one specifier
 *    token (SPECIFIER_SHAPE: a require's call(thisArg, specifier) or apply(thisArg, [specifier]), Reflect.apply; a source text
 *    a census plants as a later argument is no specifier), and no manifest (MANIFEST: package.json, package-lock.json,
 *    npm-shrinkwrap.json, deno.json[c], an import map, a tsconfig or jsconfig) names it anywhere in its text; A3 the planted
 *    TSX fixtures are read: the module string literals (cooked or folded) naming a .tsx or .jsx module file are collected
 *    from the modules B1 and B2 judge, the oracle's planted names among them (at least four, the non-vacuity anchor), so a
 *    census planting TSX control texts is judged, not refused.
 *  B, acceptance (a). B1 no judged module (every module the walk reaches but the two exemptions), parsed by the TypeScript
 *    compiler under its own script kind, spells the hook (HOOK_FAMILY) in an identifier (escapes decoded by the compiler), a
 *    string or template literal (cooked), JSX text, a regular expression or a constant-folded `+` concatenation or template of
 *    literals; B2 no judged file spells it in its
 *    bytes read as UTF-8, UTF-16LE or UTF-16BE, raw or after decoding JS escapes, HTML numeric references and percent escapes,
 *    nor in its path, the walk meets no symlink (refused, never followed) and no read fails (a file gone between the listing
 *    and the read is skipped); B3 each exemption is load-bearing: this file and its roster are walked, are not judged, and
 *    spell the hook, so lifting either reds B1 or B2.
 *  C, acceptance (b) and (c), gated. C1 the measured contract is unshipped: the roster's producer facts state no exported hook
 *    in the family, no admitted resource kind beyond lens and provider, hook sites at both pins under docs/ only and none under
 *    a file the SDK package ships, as the bead row states ("Shipped: no", and no Shipped: in its notes reads otherwise:
 *    SHIPPED_OTHERWISE, so a note appended beside the owner's sentence is read); a re-measure that ships the hook flips C1 red
 *    until (b) and (c) land with it. C2 the rf-tsx tier (the files vitest.rf-tsx.config.ts includes, run by forge.toml's
 *    rf-preview-tsx command) registers exactly its two R9 rows: every reference to a row registrar (ROW_REGISTRARS, by name,
 *    by a renamed vitest import or as a vitest namespace member) is read through its whole head - a modifier member
 *    (concurrent, fails, sequential and the rest, by property or by element access) or a condition's call registers one row,
 *    a table factory (TABLE_FACTORIES) one per entry and an API factory (API_FACTORIES) a further registrar - and a one-row
 *    head is a row only where it runs once, in the file body or in the body of a one-row suite (SUITE_REGISTRARS); every
 *    other reference (a table or API factory, an alias, an argument, a row in a loop, a branch, a table suite, a row's
 *    callback or another function) is unaccounted, a finding. Which callee heads a suite (suiteReference()) is pinned on
 *    both sides by C2's HEAD SHAPES: every registrar's root - its own name (a global, or a vitest import), a renamed vitest
 *    import, a vitest namespace's member by property or by element access - bare and under each single step (the
 *    concurrent modifier by property or by element access, the run-if condition's call, parentheses, or a non-null, as,
 *    satisfies or angle-bracket assertion) heads a suite for a suite registrar and none for a row registrar, so a row in
 *    the callback of such a row's head is unaccounted (Not claimed: a head under two or more steps, or a step through
 *    another member or condition). A vitest value import binds its local name to what it imports, shadowing the name's
 *    own-name reading (registrarBindings(); C2's shadow controls). And no literal in it names a federated import, the
 *    hook, network, a read-set, a resolved revision or an imported dependency (CLAIM_FAMILY), so no tier row claims (b) or
 *    (c) before the contract ships.
 * THE WALK: every regular file below the repository root, at any depth, in name order. The root entries SKIPPED_ROOTS (git's
 * data, the tracker export - bead rows quote the statement -, installed dependencies, build, coverage and Forge outputs) are
 * skipped at the root only; the two EXEMPT files are walked but not judged. It reads the working tree, so an untracked plant
 * is read, and a copy of this file or its roster anywhere in the walk is a finding (only the two exact paths are exempt). A
 * later census that needs the hook's name as a needle adds its own file to EXEMPT in its cut, beside a B3-style reading.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only, 2026-10-22): rf 0.1.832 (`rf --json --version` result.version) packages
 * integrations/tsx/import-map.json mapping @reactive-fiber/tsx to npm:@reactive-fiber/tsx@0.1.649 (runtime-lock distribution
 * source ReactiveFiberTSXSDK 5da03a7d49f4); that source's src/index.ts exports twelve use* hooks, none in the family; the
 * package ships dist, docs/security/redaction-defaults.json, LICENSE and README.md only, and the family's two sites there are
 * lines 15-16 of one docs/programs page (the roster elides the two words of its name that wb-a9l2.2's landed whole-tree census
 * forbids a test file to spell joined); schemas/tsx/worker-protocol.v1.schema.json admits the
 * resource kinds lens and provider only; at ReactiveFiberCLI 6a251bf73af5 the family's four sites are docs (04-cli-api.md:87-88,
 * plans 29-program-triage-2026-10-21.md:138 and :140). Pi vendors none of these; a producer change is seen only when a cut
 * re-measures the roster.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every
 * pin's witness (each carries its pin id), the scan constants, the residual families and the registered test titles are held
 * to the out-of-file roster (test/fixtures/rf-tsx-remote-hook-roster.json). OUTSIDE ANCHOR: the owner filing's row in the
 * tracked bead export (.beads/issues.jsonl, row wb-o4h0.4): every acceptance clause it lists sits verbatim in exactly one row
 * label, its trigger phrase in row A's, every row carries one of them, its quote and citation equal the roster's, and its
 * "Shipped: no" sentence is read by C1, so a row removed from every literal of this file and the roster still reds. Not
 * claimed: a pin, a control (a quiet row included) or a residual family removed from every literal of this file and of the
 * roster together (ROWS, the literal, IMPL, RESIDUAL_FAMILIES and the roster's rows, witnesses and residuals) - the bead row
 * anchors rows and clauses only, and nothing outside the two files names a pin, a control or a residual.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED); no registered test or suite title spells the hook, so a
 * passing run's report written into the tree stays quiet.
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a hook name or SDK specifier assembled
 * or chosen at runtime (from a variable, a call, an array join, a conditional or a logical operator) or carried to its load
 * through a binding, a callback or an object field (B1 composedVariable, composedJoin; A2 composedSpecifier, boundSpecifier,
 * callbackSpecifier, fieldSpecifier, chosenSpecifier, logicalSpecifier); R-ENCODED an encoding outside the decoded set - ROT13, base-N, UTF-32 (B1 rot13; B2
 * notes/rot13.txt; a UTF-16 run at an odd byte offset is no residual: B2 reads it in the other byte order, fixtures/odd-le.txt);
 * R-LOOKALIKE a non-ASCII look-alike letter or an inserted invisible, which names a different identifier than the SDK would
 * export (B1 lookalike, invisible; B2 notes/lookalike.txt); R-PROSE the three words spaced apart, which no specifier or
 * identifier can be (B2 notes/near.txt); R-OUTSIDE a file below a skipped root entry (B2 dist/, node_modules/, .beads/,
 * .forge/, build/ and coverage/ plants); R-HELPER a tier row registered by a module the tier imports, or through a registrar
 * the tier binds otherwise than by name, a static vitest import or a vitest namespace (a helper's registrar, a dynamic
 * import's binding), since C2 reads the tier's own text (C2 helperModule, helperRegistrar, dynamicBinding). Comments are B2's
 * ground, never B1's (B1 comment false, B2 fixtures/comment.ts true).
 * wb-ucav (the R694 follow-up of landing 271: gate finding F1 with riders F2-F5) added A2's later-argument, directive and JSDoc
 * positions, C2's head, placement and closure reading, C1's SHIPPED_OTHERWISE leg, B2's odd-offset row, R-HELPER, row A's
 * load wording and the Not-claimed scope.
 * wb-q9z5 (the R694 follow-up of landing 370: gate finding F1 with rider F2) added one control per see-through arm: A2's
 * satisfies, non-null and angle-bracket specifiers beside as (fold()), C2's row and suite heads seen through parentheses
 * and the as, satisfies, non-null and angle-bracket assertions (headOf(), suiteReference()), and C1's lowercase, uppercase
 * and uppercase-no notes for SHIPPED_OTHERWISE's letter case.
 * wb-5qrd (the R694 follow-up of landing 465: gate finding F1 with rider F2) added C2's suite controls for the arms of
 * suiteReference() no control read - a suite under a condition's call, a suite by element access and a vitest namespace's
 * suite member by element access - and C1's whole-word notes for SHIPPED_OTHERWISE: a now reads otherwise and an
 * Unshipped: is no key.
 * wb-k2t6 (the R694 follow-up of landing 564: gate finding F1) added C2's non-suite controls for the two checks of
 * suiteReference() that no control read on their not-a-suite side - a row inside a call of a function no suite binding
 * names, and a row inside a call of a vitest namespace member that is no suite registrar - so the identifier arm's
 * suite-binding test and the namespace arm's suite-member test each have a control that reads a non-suite head.
 * wb-8avz (the R694 follow-up of landing 625: gate finding F1; cut #2 answers its refusal #1, U1-U4, with riders F1 and
 * F3) added C2's nested-row controls - a row inside the callback of a bare row by each row registrar's name (it, test), by
 * a renamed vitest import (it) and as a vitest namespace's row member by property (it, test), and the gate's U1-U3 texts
 * verbatim (a modifier and a condition head by name, a namespace row member by element access and under a modifier) - and
 * C2's HEAD SHAPES, which pin suiteReference() on both sides for every registrar root bare and under each single step (Not
 * claimed: a head under two or more steps, or a step through another member or condition); made registrarBindings()
 * shadow-aware, so a vitest value import's local name reads as what it imports - a row registrar imported under a suite
 * registrar's name a row only (U4), a suite registrar under a row registrar's name a suite only (F1) - with a shadow
 * control per import form and name kind; and named a row's callback in the unaccounted reason of a row that does not run
 * once (F3).
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
const SELF = "test/workbench-rf-tsx-remote-hook-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-tsx-remote-hook-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-o4h0.4";
/** The gated hook, as the program doc spells it (04-cli-api.md:87-88@6a251bf73af5). */
const HOOK = "useRemoteResource";
/** The hook's spelling family: its three words in any letter case, joined directly or by underscores, dots or hyphens,
 * singular or plural. Prose that spaces the words apart ("use remote resources") is not a spelling. */
const HOOK_FAMILY = /use[_.-]*remote[_.-]*resources?/i;
/** The TSX SDK package (installed rf's packaged import map), as any specifier names it: bare, a subpath, npm:, jsr: or a URL. */
const SDK = "@reactive-fiber/tsx";
const SDK_FAMILY = /@reactive-fiber\/tsx(?![\w-])/i;
/** What a tier row claiming (b) or (c) would have to name. */
const CLAIM_FAMILY = /federat|use[_.-]*remote[_.-]*resources?|network|read[\s_-]*set|resolved[\s_-]*revision|imported[\s_-]*dependenc/i;
/** A module file name: a .tsx or .jsx extension after a name character. */
const TSX_NAME = /[\w-]\.(?:tsx|jsx)$/i;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const TSX_EXTENSIONS = [".tsx", ".jsx"];
/** A module specifier: one token, with no whitespace, quote, semicolon, bracket, brace or angle bracket in it (the shape the
 * landed test/workbench-tsx-action-reference-census.test.ts reads). A2 reads a later argument, or an element of an array or
 * spread argument, as a load only in this shape, so a source text a census plants there is never read as a load. */
const SPECIFIER_SHAPE = /^[^\s"'`;(){}[\]<>]+$/;
/** The JS-family modules whose JSDoc the TypeScript program reads types from; to TypeScript a TS module's JSDoc is a comment. */
const JSDOC_EXTENSIONS = [".js", ".mjs", ".cjs", ".jsx"];
const MANIFEST = /(?:^|\/)(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|deno\.jsonc?|import[-_]map\.json|[tj]sconfig[^/]*\.json)$/i;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const EXEMPT = [SELF, ROSTER_FILE];
/** Each floor sits below the count measured at base a7896f8 (787 tracked files; src 115, test 418, qa 62 modules; 4 manifests). */
const FLOORS = { files: 700, modules: { src: 100, test: 380, qa: 55 }, manifests: 4 };
/** Files the walk must reach, each with a token its bytes carry: a root page, a src module, a qa script, an example and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/providers/reactivefiber.ts", "RF render refused"],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/workflows/compose.js", "export"],
  ["media/screenshot.png", "PNG"],
];
const ORACLE = "test/workbench-unsafe-display-oracle.test.ts";
const TIER_COMMAND = "rf-preview-tsx";
/** C2's registrars: vitest's row registrars and its suite registrars (a suite body runs once unless a table repeats it). On a
 * registrar's head a table factory registers one row per table entry and an API factory returns a further registrar; every
 * other member is a modifier (concurrent, fails, sequential and the rest) or a condition, whose call returns the registrar. */
const ROW_REGISTRARS = ["it", "test"];
const SUITE_REGISTRARS = ["describe", "suite"];
const TABLE_FACTORIES = ["each", "for"];
const API_FACTORIES = ["extend", "scoped"];
/** A Shipped: in the bead row's notes that reads other than no, the key and the no each a whole word in any letter case
 * (C1's controls: a now reads otherwise, an Unshipped: is no key). */
const SHIPPED_OTHERWISE = /\bshipped:(?!\s*no\b)\s*\S*/gi;
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ENCODED", "R-LOOKALIKE", "R-PROSE", "R-OUTSIDE", "R-HELPER"];
const CYRILLIC_IE = String.fromCodePoint(0x0435);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);

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
      "(trigger, absent today) If Pi ever authors TSX components over federated imports: no TSX or JSX module exists in the walked tree, no module loads the TSX SDK and no manifest names it, and every TSX module text Pi plants (the unsafe-display oracle's among them) sits in a module B judges",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(a) census: no Pi-authored TSX fixture imports useRemoteResource while the contract is unshipped: no module spells the hook in an identifier, a literal or a folded literal, no walked file spells it in any decoded form or path, and each exemption is load-bearing",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(b) when shipped, a render test in Pi's rf-tsx tier proves zero network activity during pure component render of a federated import; (c) the render report carries the imported dependency and resolved revision fields, asserted on producer output: both gated - the measured contract is unshipped and the rf-tsx tier claims neither proof",
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
interface Pin {
  readonly repo: string;
  readonly sha: string;
  readonly hookSites: readonly string[];
}
interface Producer {
  readonly rfVersion: string;
  readonly importMap: { readonly [key: string]: string };
  readonly distribution: { readonly name: string; readonly version: string; readonly source: string; readonly files: readonly string[] };
  readonly shippedHooks: readonly string[];
  readonly admittedResourceKinds: readonly string[];
  readonly refusedResourceKinds: readonly string[];
  readonly programPin: Pin;
  readonly sdkPin: Pin;
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly hook: string;
  readonly sdk: string;
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
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function pinOf(value: unknown, field: string): Pin {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return { repo: text(value.repo, `${field}.repo`), sha: text(value.sha, `${field}.sha`), hookSites: strings(value.hookSites, `${field}.hookSites`) };
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
  const importMap = producer.importMap;
  const distribution = producer.distribution;
  if (!isObject(importMap) || !Object.values(importMap).every(value => typeof value === "string")) throw new Error("roster producer.importMap must map strings to strings");
  if (!isObject(distribution)) throw new Error("roster producer.distribution must be an object");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    hook: text(raw.hook, "hook"),
    sdk: text(raw.sdk, "sdk"),
    scan: scan as JsonObject,
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      importMap: Object.fromEntries(Object.entries(importMap).map(([key, value]) => [key, String(value)])),
      distribution: {
        name: text(distribution.name, "producer.distribution.name"),
        version: text(distribution.version, "producer.distribution.version"),
        source: text(distribution.source, "producer.distribution.source"),
        files: strings(distribution.files, "producer.distribution.files"),
      },
      shippedHooks: strings(producer.shippedHooks, "producer.shippedHooks"),
      admittedResourceKinds: strings(producer.admittedResourceKinds, "producer.admittedResourceKinds"),
      refusedResourceKinds: strings(producer.refusedResourceKinds, "producer.refusedResourceKinds"),
      programPin: pinOf(producer.programPin, "producer.programPin"),
      sdkPin: pinOf(producer.sdkPin, "producer.sdkPin"),
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

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const isTsxModule = (path: string): boolean => TSX_EXTENSIONS.includes(extensionOf(path));

/** Replaces each JS escape, HTML numeric reference and percent escape by the character it encodes (an out-of-range one by nothing). */
function decodeEscapes(value: string): string {
  const char = (digits: string, radix: number): string => {
    const code = Number.parseInt(digits, radix);
    return code <= 0x10ffff ? String.fromCodePoint(code) : "";
  };
  return value
    .replace(/\\u\{([0-9a-f]{1,6})\}/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\x([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\([0-7]{1,3})/g, (_, octal: string) => char(octal, 8))
    .replace(/&#x([0-9a-f]{1,6});?/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#([0-9]{1,7});?/g, (_, decimal: string) => char(decimal, 10))
    .replace(/%([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16));
}
const spells = (value: string): boolean => HOOK_FAMILY.test(value) || HOOK_FAMILY.test(decodeEscapes(value));
const namesSdk = (value: string): boolean => SDK_FAMILY.test(value) || SDK_FAMILY.test(decodeEscapes(value));

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

/** A buffer read as UTF-8, UTF-16LE and UTF-16BE. */
function decodings(buffer: Buffer): (readonly [string, string])[] {
  const swapped = Buffer.from(buffer.subarray(0, buffer.length - (buffer.length % 2)));
  swapped.swap16();
  return [
    ["utf8", buffer.toString("utf8")],
    ["utf16le", buffer.toString("utf16le")],
    ["utf16be", swapped.toString("utf16le")],
  ];
}
/** B2's judge for one file: its path, then each decoding of its bytes, raw and decoded. */
function byteFindings(path: string, buffer: Buffer): string[] {
  const found: string[] = [];
  if (spells(path)) found.push(`${path}: path`);
  for (const [encoding, value] of decodings(buffer)) {
    if (HOOK_FAMILY.test(value)) found.push(`${path}: ${encoding}`);
    else if (HOOK_FAMILY.test(decodeEscapes(value))) found.push(`${path}: ${encoding}+decoded`);
  }
  return found;
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** A string literal; a parenthesized or type-asserted one (as, satisfies, a non-null or an angle-bracket assertion) or a comma
 * sequence's last operand; a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node)) {
    return fold(node.expression);
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) return fold(node.right);
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
  readonly spellings: string[];
  readonly specifiers: string[];
  readonly sdkImports: string[];
  readonly tsxNames: string[];
  readonly identifiers: Set<string>;
  readonly jsxElements: number;
}
/** One module, parsed under its own script kind: its JSX elements (A1), its module specifiers - its declarations' and import
 * types', the literal first argument of every call or new expression, every later argument and every element of an array or
 * spread argument in specifier shape, its triple-slash directives and, in a JS-family module, its JSDoc import types and its
 * JSDoc import tags - and the SDK loads among them (A2), the TSX or JSX module names its literals carry (A3) and its hook
 * spellings (B1). */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const readsJsdoc = JSDOC_EXTENSIONS.includes(extensionOf(path));
  const docs = new Set<ts.JSDoc>();
  const spellings: string[] = [];
  const specifiers: string[] = [];
  const tsxNames: string[] = [];
  const identifiers = new Set<string>();
  let jsxElements = 0;
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const spell = (node: ts.Node, kind: string, value: string): void => {
    if (HOOK_FAMILY.test(value)) spellings.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const literal = (node: ts.Node, kind: string, value: string): void => {
    spell(node, kind, value);
    if (TSX_NAME.test(value)) tsxNames.push(`${path}:${line(node)} ${value}`);
  };
  const load = (node: ts.Node | undefined): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value !== undefined) specifiers.push(value);
  };
  /** A later argument, or an element of an array or spread argument (at any depth): a load when it folds to one specifier token. */
  const loadShaped = (node: ts.Node): void => {
    if (ts.isSpreadElement(node)) loadShaped(node.expression);
    else if (ts.isArrayLiteralExpression(node)) for (const element of node.elements) loadShaped(element);
    else {
      const value = fold(node);
      if (value !== undefined && SPECIFIER_SHAPE.test(value)) specifiers.push(value);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      spell(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      literal(node, "literal", node.text);
    } else if (ts.isJsxText(node)) {
      spell(node, "jsx-text", node.text);
    } else if (ts.isRegularExpressionLiteral(node)) {
      spell(node, "regex", node.text);
    }
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node)) jsxElements += 1;
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) literal(node, "folded", folded);
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    // Any call or new expression's first argument (a dynamic import, require, require.resolve, an aliased or created require,
    // new URL), any literal there; every later argument and every element of an array or spread argument in specifier shape
    // (a require's call(thisArg, specifier) or apply(thisArg, [specifier]), Reflect.apply).
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const args = node.arguments ?? [];
      load(args[0]);
      args.forEach((argument, index) => {
        if (index > 0 || ts.isArrayLiteralExpression(argument) || ts.isSpreadElement(argument)) loadShaped(argument);
      });
    }
    if (readsJsdoc) for (const doc of ts.getJSDocCommentsAndTags(node)) if (ts.isJSDoc(doc)) docs.add(doc);
    ts.forEachChild(node, visit);
  };
  visit(file);
  // A JS-family module's JSDoc: the types the program reads from it, so its import types and @import tags are loads.
  const visitDoc = (node: ts.Node): void => {
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    else if (ts.isJSDocImportTag(node)) load(node.moduleSpecifier);
    ts.forEachChild(node, visitDoc);
  };
  for (const doc of docs) visitDoc(doc);
  // Triple-slash directives: a types or path reference and an amd-dependency.
  for (const reference of [...file.typeReferenceDirectives, ...file.referencedFiles]) specifiers.push(reference.fileName);
  for (const dependency of file.amdDependencies) specifiers.push(dependency.path);
  for (const match of source.matchAll(/@jsxImportSource\s+([^\s*]+)/g)) specifiers.push(match[1] ?? "");
  const sdkImports = specifiers.filter(namesSdk).map(specifier => `${path}: ${specifier}`);
  return { spellings, specifiers, sdkImports, tsxNames, identifiers, jsxElements };
}

interface TreeReading {
  readonly walk: Walk;
  readonly judged: string[];
  readonly modules: Map<string, ModuleReading>;
  readonly bytes: string[];
  readonly manifests: string[];
  readonly manifestHits: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it; the exempt files are walked but not judged. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const modules = new Map<string, ModuleReading>();
  const bytes: string[] = [];
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
    bytes.push(...byteFindings(file, buffer));
    const utf8 = buffer.toString("utf8");
    if (isModule(file)) modules.set(file, readModule(file, utf8));
    if (MANIFEST.test(file)) {
      manifests.push(file);
      if (namesSdk(utf8)) manifestHits.push(file);
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, judged, modules, bytes, manifests, manifestHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | Buffer | null>>): TreeReading {
  const root = makeScratch("rf-tsx-remote-hook-");
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

/** UTF-16BE bytes of a string. */
function utf16be(value: string): Buffer {
  const buffer = Buffer.from(value, "utf16le");
  buffer.swap16();
  return buffer;
}
/** The module judges over one snippet read as `path`: does it spell the hook (B1), does it import the SDK (A2)? */
const spelledIn = (path: string, source: string): boolean => readModule(path, source).spellings.length > 0;
const importsSdk = (path: string, source: string): boolean => readModule(path, source).sdkImports.length > 0;
interface TierReading {
  /** The one-row registrations, by title (a title that does not fold reads as COMPUTED). */
  readonly titles: string[];
  /** Every other reference to a row registrar, with why it is no one-row registration: each is a finding. */
  readonly unaccounted: string[];
  /** The literals that name a claim of (b) or (c). */
  readonly claims: string[];
}
/** A title or member key that does not fold to a literal. */
const COMPUTED = "<computed>";
type HeadStep = { readonly member: string } | { readonly call: ts.CallExpression };
/** The head a registrar reference starts: each member access it is the object of (a property, or an element whose key folds)
 * and each call it is the callee of, in order, seen through parentheses and type assertions (as, satisfies, non-null and
 * angle-bracket; C2 holds a row control and a suite control per arm). */
function headOf(reference: ts.Expression): HeadStep[] {
  const steps: HeadStep[] = [];
  let current = reference;
  for (;;) {
    const parent = current.parent;
    if ((ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent) || ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent) || ts.isTypeAssertionExpression(parent)) && parent.expression === current) {
      current = parent;
    } else if (ts.isPropertyAccessExpression(parent) && parent.expression === current) {
      steps.push({ member: parent.name.text });
      current = parent;
    } else if (ts.isElementAccessExpression(parent) && parent.expression === current) {
      steps.push({ member: fold(parent.argumentExpression) ?? COMPUTED });
      current = parent;
    } else if (ts.isCallExpression(parent) && parent.expression === current) {
      steps.push({ call: parent });
      current = parent;
    } else return steps;
  }
}
/** A head's reading: the call that registers one row (the head's last step, every earlier call a condition's), or why the
 * head is no one-row registration. */
function headReading(steps: readonly HeadStep[]): { readonly call: ts.CallExpression } | { readonly reason: string } {
  const last = steps.at(-1);
  if (last === undefined || !("call" in last)) return { reason: "a registrar referenced outside a call (an alias, an argument, an export)" };
  for (const [index, step] of steps.entries()) {
    if ("member" in step) {
      if (step.member === COMPUTED) return { reason: "a computed member" };
      if (TABLE_FACTORIES.includes(step.member)) return { reason: `a table factory (${step.member}: one row per entry)` };
      if (API_FACTORIES.includes(step.member)) return { reason: `an API factory (${step.member}: a further registrar)` };
    } else if (index < steps.length - 1) {
      // An earlier call is a condition's only when a member names it; a call of a call's result registers nothing known.
      const before = index > 0 ? steps[index - 1] : undefined;
      if (before === undefined || !("member" in before)) return { reason: "a call of a registration's result" };
    }
  }
  return { call: last.call };
}
interface RegistrarBindings {
  readonly rows: ReadonlySet<string>;
  readonly suites: ReadonlySet<string>;
  readonly namespaces: ReadonlySet<string>;
}
/** The names a module binds to vitest's registrars: each registrar's own name (a global or a plain import), a renamed import
 * from vitest, and a vitest namespace import (whose registrar members are read). A vitest value import binds its local name
 * to what it imports and to nothing else, shadowing that name's own-name reading (wb-8avz refusal #1 U4 and F1): a named
 * import's local name reads as the registrar it names - a row registrar under a suite registrar's name is a row only, a
 * suite registrar under a row registrar's name a suite only - or as no registrar (any other export), a namespace import's
 * local name as the namespace only, and a default import's local name as no registrar (vitest exports no default); a
 * type-only import or specifier binds no value and shadows nothing. C2's shadow controls pin each form under a row
 * registrar's name and under a suite registrar's name. */
function registrarBindings(file: ts.SourceFile): RegistrarBindings {
  const rows = new Set(ROW_REGISTRARS);
  const suites = new Set(SUITE_REGISTRARS);
  const namespaces = new Set<string>();
  // A local name a vitest value import binds leaves the own-name readings first: the import is what it reads as.
  const shadow = (local: ts.Identifier): string => {
    rows.delete(local.text);
    suites.delete(local.text);
    return local.text;
  };
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const clause = statement.importClause;
    if (clause === undefined || clause.isTypeOnly) continue;
    if (clause.name !== undefined) shadow(clause.name);
    const bindings = clause.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) namespaces.add(shadow(bindings.name));
    else if (bindings !== undefined) {
      for (const element of bindings.elements) {
        if (element.isTypeOnly) continue;
        const imported = (element.propertyName ?? element.name).text;
        const local = shadow(element.name);
        if (ROW_REGISTRARS.includes(imported)) rows.add(local);
        if (SUITE_REGISTRARS.includes(imported)) suites.add(local);
      }
    }
  }
  return { rows, suites, namespaces };
}
/** Is the identifier a reference to a binding (not a member or key name, an import binding's own name, or a label)? */
function isReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name !== node;
  if (ts.isQualifiedName(parent)) return parent.right !== node;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isImportEqualsDeclaration(parent)) return false;
  if (ts.isBindingElement(parent)) return parent.propertyName !== node;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return parent.label !== node;
  if (
    ts.isPropertyAssignment(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isEnumMember(parent) ||
    ts.isJsxAttribute(parent)
  ) {
    return parent.name !== node;
  }
  return true;
}
/** A vitest namespace reference's member access and the member's name, if the reference is the object of one. */
function memberOf(node: ts.Identifier): { readonly access: ts.Expression; readonly name: string } | undefined {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return { access: parent, name: parent.name.text };
  if (ts.isElementAccessExpression(parent) && parent.expression === node) return { access: parent, name: fold(parent.argumentExpression) ?? COMPUTED };
  return undefined;
}
/** The suite registrar a callee descends to (a suite binding, or a vitest namespace's suite member by property or by element
 * access), if any, through each member (by property or by element access) and each call (a condition's) of the head, seen
 * through parentheses and the type assertions headOf sees through (C2 holds a suite control per arm, and a non-suite
 * control each for the identifier arm's suite-binding test and the namespace arm's suite-member test). C2's HEAD SHAPES pin
 * both outcomes of both checks for every registrar root - each of ROW_REGISTRARS and SUITE_REGISTRARS by its own name (a
 * global, or a vitest import), by a renamed vitest import, and as a vitest namespace's member by property and by element
 * access - bare and under each single step (the concurrent modifier by property or by element access, the run-if
 * condition's call, parentheses, or a non-null, as, satisfies or angle-bracket assertion): a suite registrar's head
 * descends to its suite reference, a row registrar's head to none. Not claimed: a head under two or more steps, or a step
 * through another member or condition. */
function suiteReference(callee: ts.Expression, bindings: RegistrarBindings): ts.Expression | undefined {
  let current = callee;
  for (;;) {
    if (ts.isIdentifier(current)) return bindings.suites.has(current.text) ? current : undefined;
    if ((ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) && ts.isIdentifier(current.expression) && bindings.namespaces.has(current.expression.text)) {
      const member = memberOf(current.expression);
      return member !== undefined && SUITE_REGISTRARS.includes(member.name) ? current : undefined;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current) ||
      ts.isCallExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isNonNullExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isTypeAssertionExpression(current)
    ) {
      current = current.expression;
    } else return undefined;
  }
}
/** Is the call the one-row registration of a suite registrar's head (its body then runs once per run of the suite call)? */
function isOneRowSuite(call: ts.CallExpression, bindings: RegistrarBindings): boolean {
  const reference = suiteReference(call.expression, bindings);
  if (reference === undefined) return false;
  const reading = headReading(headOf(reference));
  return "call" in reading && reading.call === call;
}
/** Does a registration call run once: in the file body, or in the body of a one-row suite that itself runs once? */
function runsOnce(call: ts.CallExpression, bindings: RegistrarBindings): boolean {
  let node: ts.Node = call;
  for (;;) {
    const parent = node.parent;
    if (ts.isSourceFile(parent)) return true;
    if (ts.isExpressionStatement(parent) || ts.isBlock(parent)) node = parent;
    else if ((ts.isArrowFunction(parent) || ts.isFunctionExpression(parent)) && ts.isCallExpression(parent.parent) && parent.parent.arguments.some(argument => argument === parent) && isOneRowSuite(parent.parent, bindings)) {
      node = parent.parent;
    } else return false;
  }
}
/** A tier text's registered rows and the literals in it that name a claim of (b) or (c): every reference to a row registrar
 * (by name, by a renamed vitest import, or as a vitest namespace member) is read through its whole head, a one-row head that
 * runs once is a row, and every other reference is unaccounted. */
function tierReadingOf(path: string, source: string): TierReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const bindings = registrarBindings(file);
  const titles: string[] = [];
  const unaccounted: string[] = [];
  const claims: string[] = [];
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const row = (reference: ts.Expression): void => {
    const reading = headReading(headOf(reference));
    if ("reason" in reading) unaccounted.push(`${path}:${line(reference)} ${reading.reason}`);
    else if (!runsOnce(reading.call, bindings)) unaccounted.push(`${path}:${line(reference)} a row in a loop, a branch, a table suite, a row's callback or another function`);
    else {
      const title = reading.call.arguments[0];
      titles.push((title === undefined ? undefined : fold(title)) ?? COMPUTED);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && isReference(node)) {
      if (bindings.rows.has(node.text)) row(node);
      else if (bindings.namespaces.has(node.text)) {
        const member = memberOf(node);
        if (member === undefined) unaccounted.push(`${path}:${line(node)} a vitest namespace referenced whole`);
        else if (ROW_REGISTRARS.includes(member.name)) row(member.access);
      }
    }
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (CLAIM_FAMILY.test(node.text)) claims.push(`${path}: ${node.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { titles, unaccounted, claims };
}
/** The tier file's reading, from the working tree. */
const tierReading = (path: string): TierReading => tierReadingOf(path, readFileSync(join(REPO, path), "utf8"));

/** Every Shipped: in a bead row's notes that reads other than no, so a note appended beside the owner's sentence is read. */
function shippedOtherwise(notes: string): string[] {
  return [...notes.matchAll(SHIPPED_OTHERWISE)].map(match => match[0]);
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const tsxModules = tree.walk.files.filter(isTsxModule);
    const jsxModules = [...tree.modules].filter(([, reading]) => reading.jsxElements > 0).map(([file]) => file);
    const filesFloorMet = tree.walk.files.length >= FLOORS.files;
    expect(filesFloorMet, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ tsxModules, jsxModules }, "TSX or JSX modules in the walked tree, by extension and by syntax (the trigger's inventory)").toStrictEqual({ tsxModules: [], jsxModules: [] });
    const planted = plantedTree({
      "fixtures/component.tsx": "export const C = () => null;\n",
      "fixtures/View.JSX": "export const V = () => null;\n",
      "fixtures/plain.ts": "export {};\n",
      "fixtures/notes.tsx.md": "a page\n",
      "nested/dist/deep/component.tsx": "export {};\n",
      "dist/component.tsx": "export {};\n",
    });
    const jsxIn = (path: string, source: string): boolean => readModule(path, source).jsxElements > 0;
    const controls = {
      tsxModules: planted.walk.files.filter(isTsxModule),
      jsxInJs: jsxIn("c.js", "export const C = () => <div />;\n"),
      jsxFragmentInMjs: jsxIn("c.mjs", "export const C = () => <>text</>;\n"),
      jsxInTsx: jsxIn("c.tsx", "export const C = () => <Panel><span /></Panel>;\n"),
      typeAssertionInTs: jsxIn("c.ts", "const pattern = <RegExp>value;\n"),
      comparisonInJs: jsxIn("c.js", "const less = a < b && c > d;\n"),
    };
    return done("A1", { filesFloorMet, anchorsWalked: tree.anchorsWalked, tsxModules, jsxModules, controls });
  },
  A2: () => {
    const tree = liveTree();
    const sdkImports = [...tree.modules.values()].flatMap(reading => reading.sdkImports);
    const modulesFloorMet = modulesBelow(tree, "src") >= FLOORS.modules.src && modulesBelow(tree, "test") >= FLOORS.modules.test && modulesBelow(tree, "qa") >= FLOORS.modules.qa;
    const specifierAnchor = tree.modules.get("src/workbench/providers/reactivefiber.ts")?.specifiers.includes("node:child_process") === true;
    const manifestsFloorMet = tree.manifests.length >= FLOORS.manifests && tree.manifests.includes("package.json") && tree.manifests.includes("package-lock.json");
    expect(modulesFloorMet, `modules: src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}`).toBe(true);
    expect(specifierAnchor, "the specifier reader reads the provider's node:child_process import").toBe(true);
    expect(manifestsFloorMet, `manifests read: ${tree.manifests.join(", ")}`).toBe(true);
    expect({ sdkImports, manifestHits: tree.manifestHits }, `${SDK} needs the Components/TSX contracts first`).toStrictEqual({ sdkImports: [], manifestHits: [] });
    const controls = {
      staticImport: importsSdk("c.ts", `import { defineComponent } from "${SDK}";\n`),
      subpath: importsSdk("c.ts", `import { jsx } from "${SDK}/jsx-runtime";\n`),
      typeOnly: importsSdk("c.ts", `import type { Component } from "${SDK}";\n`),
      exportFrom: importsSdk("c.ts", `export * from "${SDK}";\n`),
      dynamicImport: importsSdk("c.mjs", `const sdk = await import("${SDK}");\n`),
      require: importsSdk("c.cjs", `const sdk = require("${SDK}");\n`),
      requireResolve: importsSdk("c.cjs", `const where = require.resolve("${SDK}");\n`),
      importEquals: importsSdk("c.ts", `import sdk = require("${SDK}");\n`),
      importType: importsSdk("c.ts", `type Sdk = typeof import("${SDK}");\n`),
      npmSpecifier: importsSdk("c.tsx", `import { useLens } from "npm:${SDK}@0.1.649";\n`),
      urlSpecifier: importsSdk("c.tsx", `import { useLens } from "https://esm.sh/${SDK}@0.1.649";\n`),
      jsrSpecifier: importsSdk("c.ts", `import { useLens } from "jsr:${SDK}@0.1.649";\n`),
      aliasedRequire: importsSdk("c.mjs", `const req = createRequire(import.meta.url);\nconst sdk = req("${SDK}");\n`),
      createdRequire: importsSdk("c.mjs", `const sdk = createRequire(import.meta.url)("${SDK}");\n`),
      newUrl: importsSdk("c.ts", `const where = new URL("npm:${SDK}@0.1.649", import.meta.url);\n`),
      foldedSpecifier: importsSdk("c.mjs", 'const sdk = await import("@reactive-fiber/" + "tsx");\n'),
      escapedSpecifier: importsSdk("c.ts", 'import { useLens } from "@reactive-fiber/\\u0074sx";\n'),
      jsxPragma: importsSdk("c.tsx", `/** @jsxImportSource ${SDK} */\nexport const C = () => <div />;\n`),
      otherPackage: importsSdk("c.ts", `import { x } from "${SDK}-tools";\n`),
      composedSpecifier: importsSdk("c.mjs", `const name = "tsx";\nconst sdk = await import(\`@reactive-fiber/${"$"}{name}\`);\n`),
      mentionOnly: importsSdk("c.ts", `const label = "${SDK}";\n`),
      // Later arguments and array or spread elements, read in specifier shape (gate F1 G11, G12).
      callArgument: importsSdk("c.mjs", `const sdk = createRequire(import.meta.url).call(null, "${SDK}");\n`),
      applyArray: importsSdk("c.cjs", `const sdk = require.apply(null, ["${SDK}"]);\n`),
      reflectApply: importsSdk("c.cjs", `const sdk = Reflect.apply(require, null, ["${SDK}/jsx-runtime"]);\n`),
      spreadArgument: importsSdk("c.cjs", `const sdk = require(...["${SDK}"]);\n`),
      arrayArgument: importsSdk("c.mjs", `const sdks = await loadAll([import.meta.url, "npm:${SDK}@0.1.649"]);\n`),
      // Triple-slash directives and a JS-family module's JSDoc (gate F1 G32, G33).
      typesDirective: importsSdk("c.ts", `/// <reference types="${SDK}" />\nexport {};\n`),
      pathDirective: importsSdk("c.ts", `/// <reference path="../node_modules/${SDK}/dist/index.d.ts" />\nexport {};\n`),
      amdDirective: importsSdk("c.ts", `/// <amd-dependency path="${SDK}" />\nexport {};\n`),
      jsdocImportType: importsSdk("c.js", `/** @type {import("${SDK}").Component} */\nexport let view;\n`),
      jsdocImportTag: importsSdk("c.mjs", `/** @import { Component } from "${SDK}" */\nexport let view;\n`),
      // No load: a TS module's JSDoc, a line comment, and a source text a census plants as a later argument.
      jsdocInTs: importsSdk("c.ts", `/** @type {import("${SDK}").Component} */\nexport const view = null;\n`),
      lineComment: importsSdk("c.js", `// const sdk = require("${SDK}");\nexport {};\n`),
      plantedSource: importsSdk("c.test.ts", `plant("c.ts", 'import { useLens } from "${SDK}";');\n`),
      // R-COMPOSED: a specifier carried to its load through a binding, a callback or an object field, or chosen at runtime.
      boundSpecifier: importsSdk("c.cjs", `const name = "${SDK}";\nconst sdk = require(name);\n`),
      callbackSpecifier: importsSdk("c.cjs", `const sdks = ["${SDK}"].map(require);\n`),
      fieldSpecifier: importsSdk("c.mjs", `const sdk = await load({ specifier: "${SDK}" });\n`),
      chosenSpecifier: importsSdk("c.cjs", `const sdk = require(process.env.TSX ? "${SDK}" : "./local.cjs");\n`),
      logicalSpecifier: importsSdk("c.cjs", `const sdk = require(process.env.TSX_SDK || "${SDK}");\n`),
      // A type-asserted literal (one control per fold() arm: as, satisfies, non-null, angle-bracket; gate F1 of landing 370)
      // and a comma sequence's last operand fold like a bare literal.
      assertedSpecifier: importsSdk("c.ts", `const sdk = require("${SDK}" as string);\n`),
      satisfiesSpecifier: importsSdk("c.ts", `const sdk = require("${SDK}" satisfies string);\n`),
      nonNullSpecifier: importsSdk("c.ts", `const sdk = require("${SDK}"!);\n`),
      angleSpecifier: importsSdk("c.ts", `const sdk = require(<string>"${SDK}");\n`),
      sequencedSpecifier: importsSdk("c.cjs", `const sdk = require((0, "${SDK}"));\n`),
      manifestDependency: namesSdk(`{"dependencies":{"${SDK}":"0.1.649"}}`),
      manifestAlias: namesSdk(`{"dependencies":{"tsx-sdk":"npm:${SDK}@0.1.649"}}`),
      manifestPaths: ["package.json", "examples/app/package-lock.json", "npm-shrinkwrap.json", "deno.jsonc", "import_map.json", "tsconfig.base.json", "jsconfig.json", "notes.json", "package.json.md"].filter(path => MANIFEST.test(path)),
    };
    return done("A2", { modulesFloorMet, specifierAnchor, manifestsFloorMet, sdkImports, manifestHits: tree.manifestHits, controls });
  },
  A3: () => {
    const tree = liveTree();
    const names = [...tree.modules.values()].flatMap(reading => reading.tsxNames);
    const sites = [...new Set(names.map(name => name.slice(0, name.indexOf(":"))))].sort();
    const oracleSite = sites.includes(ORACLE);
    const namesFloorMet = names.filter(name => name.startsWith(`${ORACLE}:`)).length >= 4;
    // The names are collected from tree.modules, the modules B1 and B2 judge (the exemptions never enter it).
    expect(oracleSite, `the files whose literals name a TSX or JSX module: ${sites.join(", ")}`).toBe(true);
    expect(namesFloorMet, `planted TSX/JSX module names: ${names.join(" | ")}`).toBe(true);
    const planted = readModule("c.test.ts", 'writeFileSync(join(dir, "view.tsx"), "export const V = () => <i />;");\nconst kind = ".tsx";\n').tsxNames;
    return done("A3", { oracleSite, namesFloorMet, controls: { plantedNames: planted.length } });
  },
  B1: () => {
    const tree = liveTree();
    const spellings = [...tree.modules.values()].flatMap(reading => reading.spellings);
    const identifierAnchor = tree.modules.get("src/workbench/providers/reactivefiber.ts")?.identifiers.has("registerReactiveFiberRender") === true;
    expect(identifierAnchor, "the identifier reader reads the provider's registerReactiveFiberRender").toBe(true);
    expect(spellings, `module spellings of ${HOOK} outside the exemptions`).toEqual([]);
    const head = "useRemote";
    const controls = {
      namedImport: spelledIn("c.tsx", `import { ${HOOK} } from "${SDK}";\nexport const C = () => <div>{${HOOK}("knowledge:view_output:architecture")}</div>;\n`),
      aliasImport: spelledIn("c.ts", `import { ${HOOK} as remote } from "${SDK}";\n`),
      namespaceMember: spelledIn("c.ts", `import * as tsx from "${SDK}";\nconst value = tsx.${HOOK}("k");\n`),
      elementAccess: spelledIn("c.mjs", `const value = sdk["${HOOK}"]("k");\n`),
      escapedIdentifier: spelledIn("c.ts", `import { \\u0075${HOOK.slice(1)} } from "${SDK}";\n`),
      escapedString: spelledIn("c.cjs", `const name = "\\x75${HOOK.slice(1)}";\n`),
      template: spelledIn("c.ts", `const name = \`${HOOK}\`;\n`),
      folded: spelledIn("c.ts", `const name = "${head}" + "Resource";\n`),
      foldedTemplate: spelledIn("c.ts", `const name = \`use${"$"}{"Remote"}Resource\`;\n`),
      plantedTsxText: spelledIn("c.test.ts", `writeFileSync(join(dir, "component.tsx"), 'import { ${HOOK} } from "${SDK}";\\n');\n`),
      requireDestructure: spelledIn("c.cjs", `const { ${HOOK} } = require("${SDK}");\n`),
      dynamicMember: spelledIn("c.mjs", `const { ${HOOK}: hook } = await import("${SDK}");\n`),
      jsxAttribute: spelledIn("c.tsx", `export const C = () => <Panel read={${HOOK}} />;\n`),
      subpathSpecifier: spelledIn("c.ts", `import hook from "${SDK}/use-remote-resource";\n`),
      snakeCase: spelledIn("c.js", "export const use_remote_resource = 1;\n"),
      plural: spelledIn("c.ts", `export const ${HOOK}s = [];\n`),
      composedVariable: spelledIn("c.ts", `const head = "${head}";\nconst value = sdk[head + "Resource"];\n`),
      composedJoin: spelledIn("c.ts", `const value = sdk[["${head}", "Resource"].join("")];\n`),
      rot13: spelledIn("c.ts", 'const value = "hfrErzbgrErfbhepr";\n'),
      lookalike: spelledIn("c.ts", `const value = "us${CYRILLIC_IE}RemoteResource";\n`),
      invisible: spelledIn("c.ts", `const value = "${head}${ZERO_WIDTH_SPACE}Resource";\n`),
      comment: spelledIn("c.ts", `// ${HOOK}\nexport {};\n`),
      nearMiss: spelledIn("c.ts", "const a = useRemote();\nconst b = useResource();\nconst c = remoteResource;\n"),
    };
    return done("B1", { identifierAnchor, spellings, controls });
  },
  B2: () => {
    const tree = liveTree();
    expect(tree.walk.files.length >= FLOORS.files, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect({ bytes: tree.bytes, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, `byte spellings of ${HOOK} outside the exemptions`).toStrictEqual({
      bytes: [],
      symlinks: [],
      unreadable: [],
    });
    const plain = `import { ${HOOK} } from "${SDK}";\n`;
    const planted = plantedTree({
      "fixtures/remote/component.tsx": plain,
      "fixtures/workspace.json": `{"component": "import { \\u0075${HOOK.slice(1)} } from \\"${SDK}\\";"}\n`,
      "fixtures/comment.ts": `// ${HOOK}\nexport {};\n`,
      "notes/reference.md": `&#117;${HOOK.slice(1)}\n`,
      "notes/url.txt": `https://example.invalid/%75${HOOK.slice(1)}\n`,
      "fixtures/le.txt": Buffer.from(plain, "utf16le"),
      "fixtures/be.txt": utf16be(plain),
      "fixtures/odd-le.txt": Buffer.concat([Buffer.from(" "), Buffer.from(plain, "utf16le")]),
      "fixtures/use-remote-resource/index.ts": "export {};\n",
      "test/fixtures/build/hook.ts": plain,
      "fixtures/link.txt": null,
      "notes/rot13.txt": "hfrErzbgrErfbhepr\n",
      "notes/lookalike.txt": `us${CYRILLIC_IE}RemoteResource\n`,
      "notes/near.txt": "useRemote useResource remoteResource; use remote resources\n",
      "dist/component.tsx": plain,
      "node_modules/pkg/index.js": plain,
      ".beads/issues.jsonl": `{"title":"${HOOK}"}\n`,
      ".forge/report.json": `{"title":"${HOOK}"}\n`,
      "build/hook.ts": plain,
      "coverage/hook.ts": plain,
    });
    const flagged = (path: string): boolean => planted.bytes.some(finding => finding.startsWith(`${path}: `)) || planted.walk.symlinks.includes(path);
    const controls = Object.fromEntries(
      [
        "fixtures/remote/component.tsx",
        "fixtures/workspace.json",
        "fixtures/comment.ts",
        "notes/reference.md",
        "notes/url.txt",
        "fixtures/le.txt",
        "fixtures/be.txt",
        "fixtures/odd-le.txt",
        "fixtures/use-remote-resource/index.ts",
        "test/fixtures/build/hook.ts",
        "fixtures/link.txt",
        "notes/rot13.txt",
        "notes/lookalike.txt",
        "notes/near.txt",
        "dist/component.tsx",
        "node_modules/pkg/index.js",
        ".beads/issues.jsonl",
        ".forge/report.json",
        "build/hook.ts",
        "coverage/hook.ts",
      ].map(path => [path, flagged(path)]),
    );
    return done("B2", { filesFloorMet: true, bytes: tree.bytes, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable, walkedPlants: planted.walk.files.length, controls });
  },
  B3: () => {
    const tree = liveTree();
    const exemptWalked = EXEMPT.every(file => tree.walk.files.includes(file) && !tree.judged.includes(file));
    const selfModuleHits = readModule(SELF, readFileSync(join(REPO, SELF), "utf8")).spellings.length > 0;
    const selfByteHits = byteFindings(SELF, readFileSync(join(REPO, SELF))).length > 0;
    const rosterByteHits = byteFindings(ROSTER_FILE, readFileSync(join(REPO, ROSTER_FILE))).length > 0;
    expect({ exemptWalked, selfModuleHits, selfByteHits, rosterByteHits }, "each exemption carries real spellings, so lifting it reds B1 or B2").toStrictEqual({
      exemptWalked: true,
      selfModuleHits: true,
      selfByteHits: true,
      rosterByteHits: true,
    });
    return done("B3", { exempt: [...EXEMPT], exemptWalked, selfModuleHits, selfByteHits, rosterByteHits });
  },
  C1: () => {
    const { producer } = ROSTER;
    const shippedFamily = producer.shippedHooks.filter(hook => HOOK_FAMILY.test(hook));
    const sites = [...producer.programPin.hookSites, ...producer.sdkPin.hookSites];
    const docsOnly = sites.length > 0 && sites.every(site => site.startsWith("docs/"));
    const remoteKinds = producer.admittedResourceKinds.filter(kind => !["lens", "provider"].includes(kind));
    // The SDK's own hook sites, against what its package ships: a site under a shipped entry would ship the hook's text.
    const sitesShipped = producer.sdkPin.hookSites.filter(site => producer.distribution.files.some(entry => site === entry || site.startsWith(`${entry}/`)));
    const notes = readBeadRow().notes;
    const beadSaysUnshipped = notes.includes(`Shipped: no — git grep ${HOOK} at the pin matches only docs.`);
    const saysOtherwise = shippedOtherwise(notes);
    const contractShipped = shippedFamily.length > 0 || !docsOnly || remoteKinds.length > 0 || sitesShipped.length > 0;
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the gating artifact unshipped`).toBe(true);
    expect(saysOtherwise, `a Shipped: in the bead row ${BEAD} that reads other than no`).toEqual([]);
    expect(contractShipped, "the contract shipped: (b) and (c) are owed in the rf-tsx tier with this re-measure (wb-o4h0.4)").toBe(false);
    return done("C1", {
      contractShipped,
      docsOnly,
      sitesShipped,
      shippedFamily,
      shippedHooks: producer.shippedHooks.length,
      remoteKinds,
      sdkMapped: producer.importMap[SDK] === `npm:${SDK}@${producer.distribution.version}`,
      beadSaysUnshipped,
      shippedOtherwise: saysOtherwise,
      // A note appended beside the owner's sentence is read, not only the sentence itself: its key in any letter case, and
      // a no in any letter case still reads as no (gate F2 of landing 370).
      controls: {
        appendedShippedYes: shippedOtherwise(`${notes}\nShipped: yes, the hook is exported`).length,
        appendedLowercaseShippedYes: shippedOtherwise(`${notes}\nshipped: yes, the hook is exported`).length,
        appendedUppercaseShippedYes: shippedOtherwise(`${notes}\nSHIPPED: YES, the hook is exported`).length,
        appendedUppercaseShippedNo: shippedOtherwise(`${notes}\nSHIPPED: NO, still docs only`).length,
        // The key and the no each a whole word: a now reads otherwise, an Unshipped: is no key (gate F2 of landing 465).
        appendedShippedNow: shippedOtherwise(`${notes}\nShipped: now, the hook is exported`).length,
        appendedUnshippedNote: shippedOtherwise(`${notes}\nUnshipped: still docs only`).length,
      },
    });
  },
  C2: () => {
    const include = (rfTsxConfig as unknown as { test?: { include?: readonly string[] } }).test?.include ?? [];
    const command = new RegExp(`^\\[build\\.commands\\.${TIER_COMMAND}\\]\\ncommand = "[^"\\n]*--config vitest\\.rf-tsx\\.config\\.ts[^"\\n]*"$`, "m").test(readFileSync(join(REPO, "forge.toml"), "utf8"));
    const readings = include.map(tierReading);
    const titles = readings.flatMap(reading => reading.titles);
    const unaccounted = readings.flatMap(reading => reading.unaccounted);
    const claims = readings.flatMap(reading => reading.claims);
    expect(command, `forge.toml runs the tier through ${TIER_COMMAND} with vitest.rf-tsx.config.ts`).toBe(true);
    expect({ rows: titles.length, unaccounted }, "the tier registers exactly its two R9 rows, every registrar reference read").toStrictEqual({ rows: 2, unaccounted: [] });
    expect(claims, "tier literals claiming (b) or (c) before the contract ships").toEqual([]);
    const rowsIn = (source: string): { rows: number; unaccounted: number } => {
      const reading = tierReadingOf("t.test.ts", source);
      return { rows: reading.titles.length, unaccounted: reading.unaccounted.length };
    };
    // Heads are joined at run time, so no line of this file spells a focus, skip or condition marker (standing rule 10).
    const chain = (...links: string[]): string => links.join(".");
    const vitest = 'import { describe, it, test } from "vitest";\n';
    const controls = {
      bareIt: rowsIn(`${vitest}describe("s", () => {\n  it("r1", () => {});\n});\n`),
      bareTest: rowsIn(`${vitest}test("r1", () => {});\n`),
      concurrent: rowsIn(`${vitest}${chain("it", "concurrent")}("r1", () => {});\n`),
      focused: rowsIn(`${vitest}${chain("it", "only")}("r1", () => {});\n`),
      skipped: rowsIn(`${vitest}${chain("test", "skip")}("r1", () => {});\n`),
      todo: rowsIn(`${vitest}${chain("it", "todo")}("r1");\n`),
      fails: rowsIn(`${vitest}${chain("it", "fails")}("r1", () => {});\n`),
      chainedModifiers: rowsIn(`${vitest}${chain("it", "concurrent", "skip")}("r1", () => {});\n`),
      elementModifier: rowsIn(`${vitest}it["concurrent"]("r1", () => {});\n`),
      condition: rowsIn(`${vitest}${chain("it", ["run", "If"].join(""))}(true)("r1", () => {});\n`),
      renamedImport: rowsIn('import { it as row } from "vitest";\nrow("r1", () => {});\n'),
      namespaceImport: rowsIn('import * as vt from "vitest";\nvt.describe("s", () => {\n  vt.it("r1", () => {});\n});\n'),
      nestedSuites: rowsIn(`${vitest}describe("a", () => {\n  ${chain("describe", "concurrent")}("b", () => {\n    it("r1", () => {});\n  });\n});\n`),
      // A row or suite registrar seen through parentheses and each type assertion: one control per arm of headOf() and of
      // suiteReference() (a suite control needs both readers' arm).
      parenthesizedRow: rowsIn(`${vitest}(it)("r1", () => {});\n`),
      nonNullRow: rowsIn(`${vitest}it!("r1", () => {});\n`),
      asRow: rowsIn(`${vitest}(it as Api)("r1", () => {});\n`),
      satisfiesRow: rowsIn(`${vitest}(it satisfies Api)("r1", () => {});\n`),
      angleRow: rowsIn(`${vitest}(<Api>it)("r1", () => {});\n`),
      parenthesizedSuite: rowsIn(`${vitest}(describe)("s", () => {\n  it("r1", () => {});\n});\n`),
      nonNullSuite: rowsIn(`${vitest}describe!("s", () => {\n  it("r1", () => {});\n});\n`),
      asSuite: rowsIn(`${vitest}(describe as Api)("s", () => {\n  it("r1", () => {});\n});\n`),
      satisfiesSuite: rowsIn(`${vitest}(describe satisfies Api)("s", () => {\n  it("r1", () => {});\n});\n`),
      angleSuite: rowsIn(`${vitest}(<Api>describe)("s", () => {\n  it("r1", () => {});\n});\n`),
      // A suite head through suiteReference()'s call and element arms - a suite under a condition's call, a suite by element
      // access - and a vitest namespace's suite member by element access (gate F1 of landing 465).
      conditionSuite: rowsIn(`${vitest}${chain("describe", ["run", "If"].join(""))}(true)("s", () => {\n  it("r1", () => {});\n});\n`),
      elementSuite: rowsIn(`${vitest}describe["concurrent"]("s", () => {\n  it("r1", () => {});\n});\n`),
      namespaceElementSuite: rowsIn('import * as vt from "vitest";\nvt["describe"]("s", () => {\n  vt.it("r1", () => {});\n});\n'),
      table: rowsIn(`${vitest}${chain("it", "each")}([1, 2])("r %s", () => {});\n`),
      forTable: rowsIn(`${vitest}${chain("test", "for")}([1, 2])("r %s", () => {});\n`),
      tableSuite: rowsIn(`${vitest}${chain("describe", "each")}([1, 2])("s %s", () => {\n  it("r1", () => {});\n});\n`),
      extendApi: rowsIn(`${vitest}const row = ${chain("test", "extend")}({});\nrow("r1", () => {});\n`),
      extendCalled: rowsIn(`${vitest}${chain("test", "extend")}({})("r1", () => {});\n`),
      alias: rowsIn(`${vitest}const row = it;\nrow("r1", () => {});\n`),
      registrarArgument: rowsIn(`${vitest}register(it);\n`),
      loop: rowsIn(`${vitest}for (const title of ["r1", "r2"]) it(title, () => {});\n`),
      branch: rowsIn(`${vitest}if (process.env.ROW) it("r1", () => {});\n`),
      helperFunction: rowsIn(`${vitest}function row(title: string): void {\n  it(title, () => {});\n}\nrow("r1");\nrow("r2");\n`),
      callbackRows: rowsIn(`${vitest}["r1", "r2"].forEach(title => it(title, () => {}));\n`),
      // A row inside a call whose head is no suite: a function no suite binding names, and a vitest namespace member
      // that is no suite registrar - the not-a-suite side of suiteReference()'s two checks (gate F1 of landing 564).
      nonSuiteCall: rowsIn(`${vitest}wrap("s", () => {\n  it("r1", () => {});\n});\n`),
      namespaceNonSuiteMember: rowsIn('import * as vt from "vitest";\nvt.expect(() => {\n  vt.it("r1", () => {});\n});\n'),
      // A row inside a row's callback: a row registrar's head is no suite, by each row registrar's name, by a renamed
      // vitest import and as a vitest namespace's row member - the not-a-suite side of suiteReference()'s two checks for a
      // row registrar's head (gate F1 of landing 625).
      nestedRow: rowsIn(`${vitest}it("r1", () => {\n  it("r2", () => {});\n});\n`),
      nestedTestRow: rowsIn(`${vitest}test("r1", () => {\n  test("r2", () => {});\n});\n`),
      renamedNestedRow: rowsIn('import { it as row } from "vitest";\nrow("r1", () => {\n  row("r2", () => {});\n});\n'),
      namespaceNestedRow: rowsIn('import * as vt from "vitest";\nvt.it("r1", () => {\n  vt.it("r2", () => {});\n});\n'),
      namespaceNestedTestRow: rowsIn('import * as vt from "vitest";\nvt.test("r1", () => {\n  vt.test("r2", () => {});\n});\n'),
      // Refusal #1 of wb-8avz, the gate's texts verbatim: a row inside the callback of a modifier and of a condition head by
      // name (U1), of a vitest namespace's row member by element access (U2) and under a modifier (U3), and of a suite
      // inside a row's callback.
      modifierNestedRow: rowsIn(`${vitest}${chain("it", "concurrent")}("r1", () => {\n  it("r2", () => {});\n});\n`),
      conditionNestedRow: rowsIn(`${vitest}${chain("it", ["run", "If"].join(""))}(true)("r1", () => {\n  it("r2", () => {});\n});\n`),
      namespaceElementNestedRow: rowsIn('import * as vt from "vitest";\nvt["it"]("r1", () => {\n  vt["it"]("r2", () => {});\n});\n'),
      namespaceModifierNestedRow: rowsIn(`import * as vt from "vitest";\n${chain("vt", "it", "concurrent")}("r1", () => {\n  vt.it("r2", () => {});\n});\n`),
      suiteInsideRow: rowsIn(`${vitest}it("r1", () => {\n  describe("s", () => {\n    it("r2", () => {});\n  });\n});\n`),
      // A vitest value import binds its local name to what it imports, shadowing the own-name reading (refusal #1 U4 and F1
      // of wb-8avz): each import form under a row registrar's name and under a suite registrar's name - a row registrar,
      // a suite registrar (the gate's two cross texts verbatim, the second again with a row inside), another vitest export,
      // a namespace, a default import, and a type-only import and specifier, which bind no value and shadow nothing.
      sameKindRenameRow: rowsIn('import { test as it } from "vitest";\nit("r1", () => {\n  it("r2", () => {});\n});\n'),
      crossRenameRow: rowsIn('import { it as describe } from "vitest";\ndescribe("r1", () => {\n  describe("r2", () => {});\n});\n'),
      crossRenameSuite: rowsIn('import { describe as it } from "vitest";\nit("s", () => {\n  it("r1", () => {});\n});\n'),
      crossRenameSuiteRow: rowsIn('import { describe as it, test } from "vitest";\nit("s", () => {\n  test("r1", () => {});\n});\n'),
      sameKindRenameSuite: rowsIn('import { it, suite as describe } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n'),
      otherExportUnderRowName: rowsIn('import { expect as it } from "vitest";\nit("r1", () => {});\n'),
      otherExportUnderSuiteName: rowsIn('import { expect as describe, it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n'),
      namespaceUnderRowName: rowsIn('import * as it from "vitest";\nit.describe("s", () => {\n  it.it("r1", () => {});\n});\n'),
      namespaceUnderSuiteName: rowsIn('import * as describe from "vitest";\ndescribe("s", () => {\n  describe.it("r1", () => {});\n});\n'),
      defaultImportUnderRowName: rowsIn('import it from "vitest";\nit("r1", () => {});\n'),
      defaultImportUnderSuiteName: rowsIn('import describe from "vitest";\nimport { it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n'),
      typeOnlyImportUnderRowName: rowsIn('import type { describe as it } from "vitest";\nit("r1", () => {\n  it("r2", () => {});\n});\n'),
      typeOnlyImportUnderSuiteName: rowsIn('import type { it as describe } from "vitest";\nimport { it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n'),
      typeOnlySpecifierUnderRowName: rowsIn('import { type describe as it } from "vitest";\nit("r1", () => {\n  it("r2", () => {});\n});\n'),
      typeOnlySpecifierUnderSuiteName: rowsIn('import { type it as describe, it } from "vitest";\ndescribe("s", () => {\n  it("r1", () => {});\n});\n'),
      suiteInLoop: rowsIn(`${vitest}for (const title of ["s1", "s2"]) describe(title, () => {\n  it("r1", () => {});\n});\n`),
      callOfResult: rowsIn(`${vitest}it("r1", () => {})("r2");\n`),
      computedMember: rowsIn(`${vitest}const modifier = process.env.MODIFIER ?? "concurrent";\nit[modifier]("r1", () => {});\n`),
      namespaceWhole: rowsIn('import * as vt from "vitest";\nconst api = vt;\napi.it("r1", () => {});\n'),
      computedTitle: rowsIn(`${vitest}const title = process.env.TITLE ?? "r1";\nit(title, () => {});\n`),
      otherMember: rowsIn('const pattern = /r1/;\npattern.test("r1");\n'),
      // R-HELPER: a row a helper module registers, or one through a registrar the tier does not bind from vitest.
      helperModule: rowsIn('import { registerRows } from "./helpers/rows.js";\nregisterRows();\n'),
      helperRegistrar: rowsIn('import { row } from "./helpers/rows.js";\nrow("r1", () => {});\n'),
      dynamicBinding: rowsIn('const { it: row } = await import("vitest");\nrow("r1", () => {});\n'),
    };
    // HEAD SHAPES (refusal #1 U1-U3 of wb-8avz; gate finding F1 of landing 625): suiteReference() read on both sides for
    // every registrar root - each registrar by its own name as a global and as a vitest import, by a renamed vitest import,
    // and as a vitest namespace's member by property and by element access - bare and under each single step of `steps`
    // (one modifier, concurrent, and one condition, the run-if, stand for their kinds; another member or condition is Not
    // claimed). A suite registrar's head is a suite, so its control's inner row counts (1|0); a row registrar's head is
    // none, so its control's inner row, a bare row of the same root, is unaccounted (1|1). A reading is rows|unaccounted.
    const steps: Readonly<Record<string, (root: string) => string>> = {
      bare: root => root,
      modifier: root => chain(root, "concurrent"),
      elementModifier: root => `${root}["concurrent"]`,
      condition: root => `${chain(root, ["run", "If"].join(""))}(true)`,
      parenthesized: root => `(${root})`,
      nonNull: root => `${root}!`,
      as: root => `(${root} as Api)`,
      satisfies: root => `(${root} satisfies Api)`,
      angle: root => `(<Api>${root})`,
    };
    const namespace = 'import * as vt from "vitest";\n';
    const headShapes: { [shape: string]: { [step: string]: string } } = {};
    for (const [kind, registrars] of [["row", ROW_REGISTRARS], ["suite", SUITE_REGISTRARS]] as const) {
      for (const registrar of registrars) {
        // Each root form: its prelude, its reference, and the inner row its control's callback holds.
        const rooted = (named: string, member: string): string => (kind === "row" ? named : member);
        const forms: Readonly<Record<string, readonly [string, string, string]>> = {
          global: ["", registrar, rooted(registrar, "it")],
          imported: [`import { ${rooted(registrar, `${registrar}, it`)} } from "vitest";\n`, registrar, rooted(registrar, "it")],
          renamed: [`import { ${registrar} as renamed${rooted("", ", it")} } from "vitest";\n`, "renamed", rooted("renamed", "it")],
          namespace: [namespace, `vt.${registrar}`, rooted(`vt.${registrar}`, "vt.it")],
          namespaceElement: [namespace, `vt["${registrar}"]`, rooted(`vt["${registrar}"]`, "vt.it")],
        };
        for (const [form, [prelude, root, inner]] of Object.entries(forms)) {
          const readings: { [step: string]: string } = {};
          for (const [step, head] of Object.entries(steps)) {
            const reading = rowsIn(`${prelude}${head(root)}("${rooted("r1", "s")}", () => {\n  ${inner}("${rooted("r2", "r1")}", () => {});\n});\n`);
            readings[step] = `${reading.rows}|${reading.unaccounted}`;
          }
          headShapes[`${kind} ${registrar} ${form}`] = readings;
        }
      }
    }
    return done("C2", { tierFiles: [...include], command, titles, unaccounted, claims, controls, headShapes });
  },
};

/** A describe title: the label, the hook's spelling family replaced, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(new RegExp(HOOK_FAMILY.source, "gi"), "<the gated hook>")}`;

describe("wb-o4h0.4 rf TSX remote-resource hook census (RF-FEDERATED-WORKSPACES-R5, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      hook: HOOK,
      sdk: SDK,
      scan: {
        hookFamily: `${HOOK_FAMILY.source}/${HOOK_FAMILY.flags}`,
        sdkFamily: `${SDK_FAMILY.source}/${SDK_FAMILY.flags}`,
        claimFamily: `${CLAIM_FAMILY.source}/${CLAIM_FAMILY.flags}`,
        tsxName: `${TSX_NAME.source}/${TSX_NAME.flags}`,
        manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
        moduleExtensions: MODULE_EXTENSIONS,
        tsxExtensions: TSX_EXTENSIONS,
        skippedRoots: SKIPPED_ROOTS,
        exempt: EXEMPT,
        floors: FLOORS,
        walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
        oracle: ORACLE,
        tierCommand: TIER_COMMAND,
        specifierShape: `${SPECIFIER_SHAPE.source}/${SPECIFIER_SHAPE.flags}`,
        jsdocExtensions: JSDOC_EXTENSIONS,
        rowRegistrars: ROW_REGISTRARS,
        suiteRegistrars: SUITE_REGISTRARS,
        tableFactories: TABLE_FACTORIES,
        apiFactories: API_FACTORIES,
        shippedOtherwise: `${SHIPPED_OTHERWISE.source}/${SHIPPED_OTHERWISE.flags}`,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, hook: ROSTER.hook, sdk: ROSTER.sdk, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^,]+),/.exec(bead.title)?.[1] ?? "";
    const quote = /^Quote: "(.+)" — (\S+)\. /m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["C"], ["A"]]);
    expect(clauses[0], "acceptance (a) names the hook").toContain(HOOK);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
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

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells the hook", { timeout: 60_000 }, ({ task }) => {
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
    expect([...suites, ...titles].filter(name => HOOK_FAMILY.test(name)), "registered titles spelling the hook").toEqual([]);
  });
});
