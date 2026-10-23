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
 *    a subpath, an npm:, jsr: or URL specifier, a JS-escaped or constant-folded literal) through an import or export
 *    declaration, an import-equals require, an import type, a @jsxImportSource pragma, or as the first argument of any call or
 *    new expression (a dynamic import, require, require.resolve, an aliased or created require, new URL), and no manifest
 *    (MANIFEST: package.json, package-lock.json, npm-shrinkwrap.json, deno.json[c], an import map, a tsconfig or jsconfig)
 *    names it anywhere in its text; A3 the planted TSX fixtures are read: the module string literals (cooked or folded) naming
 *    a .tsx or .jsx module file are collected from the modules B1 and B2 judge, the oracle's planted names among them (at
 *    least four, the non-vacuity anchor), so a census planting TSX control texts is judged, not refused.
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
 *    a file the SDK package ships, as the bead row states ("Shipped: no"); a re-measure that ships the hook flips C1 red until
 *    (b) and (c) land with it. C2 the rf-tsx tier (the files vitest.rf-tsx.config.ts includes, run by forge.toml's
 *    rf-preview-tsx command) registers exactly its two R9 rows, and no literal in it names a federated import, the hook,
 *    network, a read-set, a resolved revision or an imported dependency (CLAIM_FAMILY), so no tier row claims (b) or (c)
 *    before the contract ships.
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
 * claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead row anchors rows and clauses, not pins).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED); no registered test or suite title spells the hook, so a
 * passing run's report written into the tree stays quiet.
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a hook name or SDK specifier assembled at
 * runtime from a variable, a call or an array join (B1 composedVariable, composedJoin; A2 composedSpecifier); R-ENCODED an
 * encoding outside the decoded set - ROT13, base-N, UTF-32, a misaligned UTF-16 run (B1 rot13; B2 notes/rot13.txt);
 * R-LOOKALIKE a non-ASCII look-alike letter or an inserted invisible, which names a different identifier than the SDK would
 * export (B1 lookalike, invisible; B2 notes/lookalike.txt); R-PROSE the three words spaced apart, which no specifier or
 * identifier can be (B2 notes/near.txt); R-OUTSIDE a file below a skipped root entry (B2 dist/, node_modules/, .beads/,
 * .forge/, build/ and coverage/ plants). Comments are B2's ground, never B1's (B1 comment false, B2 fixtures/comment.ts true).
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
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ENCODED", "R-LOOKALIKE", "R-PROSE", "R-OUTSIDE"];
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
      "(trigger, absent today) If Pi ever authors TSX components over federated imports: no TSX or JSX module exists in the walked tree, no module or manifest names the TSX SDK, and every TSX module text Pi plants (the unsafe-display oracle's among them) sits in a module B judges",
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
  readonly spellings: string[];
  readonly specifiers: string[];
  readonly sdkImports: string[];
  readonly tsxNames: string[];
  readonly identifiers: Set<string>;
  readonly jsxElements: number;
}
/** One module, parsed under its own script kind: its JSX elements (A1), its module specifiers and the literal first argument
 * of every call or new expression, and the SDK loads among them (A2), the TSX or JSX module names its literals carry (A3) and
 * its hook spellings (B1). */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
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
    // Any call or new expression's first argument: a dynamic import, require, require.resolve, an aliased or created require, new URL.
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    ts.forEachChild(node, visit);
  };
  visit(file);
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
/** The tier's registered rows (it/test calls with a literal title) and the literals in it that name a claim of (b) or (c). */
function tierReading(path: string): { titles: string[]; claims: string[] } {
  const source = readFileSync(join(REPO, path), "utf8");
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
    const beadSaysUnshipped = readBeadRow().notes.includes(`Shipped: no — git grep ${HOOK} at the pin matches only docs.`);
    const contractShipped = shippedFamily.length > 0 || !docsOnly || remoteKinds.length > 0 || sitesShipped.length > 0;
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the gating artifact unshipped`).toBe(true);
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
    });
  },
  C2: () => {
    const include = (rfTsxConfig as unknown as { test?: { include?: readonly string[] } }).test?.include ?? [];
    const command = new RegExp(`^\\[build\\.commands\\.${TIER_COMMAND}\\]\\ncommand = "[^"\\n]*--config vitest\\.rf-tsx\\.config\\.ts[^"\\n]*"$`, "m").test(readFileSync(join(REPO, "forge.toml"), "utf8"));
    const readings = include.map(tierReading);
    const titles = readings.flatMap(reading => reading.titles);
    const claims = readings.flatMap(reading => reading.claims);
    expect(command, `forge.toml runs the tier through ${TIER_COMMAND} with vitest.rf-tsx.config.ts`).toBe(true);
    expect(claims, "tier literals claiming (b) or (c) before the contract ships").toEqual([]);
    return done("C2", { tierFiles: [...include], command, titles, claims });
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
