/**
 * wb-tz2.3 (HX-ORIGINAL-GOALS-CLOSURE-R3): the HyperUnix result-representation successor gate, STANDING LEG AND RE-VENDOR
 * TRIPWIRE - the part of the bead that lands while no successor @hyperunix/sdk exists. Cut #3 takes the enumerate-the-resolvable
 * form (orchestrator ruling R-B81 under standing rule 19): the S row claims exactly the binding surfaces it pins, each one bound
 * to executable falsifiers and a control (S SURFACES), reads every form outside them as a break (fail closed), and names its one
 * residual family with pinned quiet rows anchored outside this file (RESIDUALS).
 *
 * OWNER FILING (the outside anchor): the tracked bead export .beads/issues.jsonl, row wb-tz2.3, read through its description
 * only, so a note a lane appends later changes nothing read. The export holds exactly one row whose id decodes to wb-tz2.3
 * (every row is parsed, so an id matches by value, never by spelling), and the description exactly one STATEMENT, ACCEPTANCE
 * and SURFACES line and one Standing item (FILING COUNTS), so no duplicate can take the reading over. Its STATEMENT ("When <trigger> (<cites>), Pi shall <duty>; until then <standing>.") gives clauses
 * statement.1-3; its ACCEPTANCE list gives acceptance.1 (the "Standing:" item) and acceptance.2.1-2.3 (the "On landing:" item
 * split at its semicolons). Each clause maps to exactly one judged row or to the PARKED remainder (CLAUSE_ROWS), and every
 * row's pins are generated from an anchor outside this file:
 *   T statement.1, the trigger: one pin per top-level declaration of the vendored SDK module that declares SDK_REPRESENTATION
 *     (resolved through the SDK's dist/index.js) and names it - today the constant, resultToJson and resultFromJson. The
 *     trigger has not fired while the vendored tag reads hyperunix.result/1.
 *   X statement.2, the duty to extend the reader adapter: one pin per src file of the filing's SURFACES - the registered
 *     hyperunix.find provider returns the SDK-stamped output under its contract, the reader adapter projects that output and
 *     native-evidence projects it. A re-vendor whose SDK tag moves reds T and X until the adapter moves with it: the tripwire.
 *   R statement.3, the standing refusal: one pin per family the clause names (contract, representation). The family's
 *     accepted tag (HYPERUNIX_FIND_CONTRACT, SDK_REPRESENTATION) is accepted on the same reading, and seven neighbours are
 *     refused as validation with no evidence: its predecessor, its digit extension (a prefix comparison would admit it), its
 *     zero-padded spelling (a numeric comparison would), its truncation without a version number (a reverse prefix comparison
 *     would), its upper-cased spelling (a case-insensitive comparison would) and its spellings with one leading and with one
 *     trailing space (a trimming comparison would). The vendored decoder refuses the representation neighbours too. R claims
 *     exactly these neighbours.
 *   S acceptance.1, the standing fixtures: one pin per tag the item names (hyperunix.find/v2, hyperunix.result/2) - each is
 *     the successor of its family's accepted tag and is refused as validation with no evidence (the decoder refuses the
 *     representation one) - and, per test file the item cites (test/workbench-hyperunix-observer.test.ts, H5), a FILE PIN and a
 *     RUN PIN. The FILE PIN reads that suite's text through a TypeScript type checker over the one file, so every name binds by
 *     scope, and claims exactly these surfaces, one section of its witness each; any form outside a surface reads as a break in
 *     its section (`<SURFACE> <why>`), and a section read after a broken CALL, ROWS or POSITION reads `<not read: <that section> broke>`:
 *       FILE: the one suite the Standing item cites, read by that path.
 *       IMPORT: describe and it are bound by the suite's one import declaration from vitest, as named, unaliased value imports;
 *         no other string token names a vitest module (vitest, vitest/<path>, @vitest/<package>), and the suite holds no
 *         import() expression, no require or createRequire identifier and no importActual or importMock member.
 *       REFERENCES: every reference the checker binds to a value import of that declaration is a call (it(...)) or the object of
 *         a member call (it.each(...)), so a write, a read or an argument of a vitest binding or of its member breaks it
 *         (it.each = ..., const each = it.each, Object.assign(it, ...)).
 *       ACCESS: the suite holds no eval identifier, the one way to reach a local binding the checker cannot see.
 *       CALL: exactly one .each call in the suite has a table carrying a row named for a standing tag, and it is
 *         it.each(<table>)(<title>, <callback>): `it` the IMPORT binding, read by plain property access, exactly one table
 *         argument and two call arguments, no type arguments, a string-literal title and an arrow-function or
 *         function-expression callback; its path and title are unique among the suite's it.each calls.
 *       PATH: every block around the call statement, up to the top level, is the block body of a call
 *         describe(<string literal>, <arrow function or function expression>) of exactly two arguments, describe the IMPORT
 *         binding, each a statement of its own, and no return statement belongs to any of those callbacks.
 *       CALLBACK: the callback's text digest (sha256_16) is the one measured at the cut.
 *       TABLE: the table is an identifier (never an inline array) the checker binds to exactly one const declaration whose initializer is an array
 *         literal (through as const, satisfies or parentheses) holding no spread element and no hole; the checker reports no
 *         redeclaration of its name, and nothing references it but this call's table argument.
 *       ROWS: for each standing tag exactly one row's name (its first element, a string literal) ends with a space and the tag,
 *         and that row is an array literal of exactly two elements named exactly '<family> <tag>'.
 *       POSITION: each standing row's reading sets its family's property by position, in the one form per family - contract
 *         `{...<helper>(), contract: '<tag>'}` (a spread of a zero-argument helper call, then an identifier-keyed contract
 *         property whose value is that string literal, nothing else) and representation `<helper>({representation: '<tag>'})`
 *         (a one-argument helper call whose argument is an object literal holding exactly that identifier-keyed property and
 *         string literal).
 *       HELPER: every helper call of the POSITION forms resolves to one symbol: the suite's one top-level function declaration,
 *         not redeclared, every reference to it a call; it takes (<source> = {}, <top> = {}) and returns one object literal with
 *         no computed key, whose one contract property is a string literal, whose one source property is an object literal
 *         with no computed key holding one representation string literal and ending with ...<source>, its only spread, and
 *         which ends with ...<top>, its only spread; both literals are the accepted tags (HYPERUNIX_FIND_CONTRACT,
 *         SDK_REPRESENTATION); its text digest (sha256_16) is the one measured at the cut. So each standing reading is the
 *         helper's own reading with exactly its family's property set to the standing tag and the other family at its
 *         accepted tag.
 *     The RUN PIN, test/workbench-hyperunix-successor-gate-run-pin.census.ts (census tier, wb-u62 report mode), judges what
 *     this file cannot read from inside the run it would judge: from the gate's own test report, each standing case
 *     'H5: refuses <family> <tag> with a typed validation error and no snapshot' is collected once, passed and asserting
 *     (judge()), at the call site of the one .each call titled the H5 template. The S run pin here pins that file's bytes
 *     (sha256) and that the census tier collects it: the tier's forge.toml command resolves (the shared resolveTier) to vitest
 *     run --config <file> with nothing more, and that config's test.include (read by position, never a same-name key such as
 *     coverage.include) matches the run pin while its test block holds no exclude.
 *     S SURFACES holds, per surface and for the run pin, falsifiers that each change that surface's section (or the run pin's
 *     reading) and a control that keeps the whole reading, all over planted suites and planted configs; the surface ids are
 *     anchored on the sections the reader itself produces for the cited suite.
 *   C acceptance.2.2, the carrier: one pin per src file of the filing's SURFACES plus one for the rest of src. Every string
 *     token naming a hyperunix.result/<n> tag (whole or embedded: the TypeScript parser's string text, never a comment or a
 *     regular expression) sits at the carrier (hyperunix-observer.ts, the adapter's REPRESENTATION) or at the asserted
 *     exclusion (native-evidence.ts, its comparison), and each spells the vendored tag. The wb-cax.8 census cannot see this
 *     tag (its whole-id form ends in /v<digits>), so this row is its single-carrier check. A true single carrier is blocked by
 *     two landed guards this cut keeps: S4 of test/workbench-hx-evidence-standing.test.ts refuses an HX-module import into
 *     native-evidence.ts, and H7 of test/workbench-hyperunix-observer.test.ts pins the observer to its four imports. So the
 *     exclusion is asserted, never silent: a half-moved re-vendor reds C, and the exclusion row is deleted in the commit that
 *     relaxes a guard and composes the constant.
 *   PARKED acceptance.2.1 (one re-vendor commit moves the tarball bytes, the vendor/README.md sha table and package.json
 *     together) and acceptance.2.3 (the full observer suite re-runs green against the successor): the external remainder,
 *     owed once HX publishes a successor. T is their re-entry: it reds the moment the vendored tag moves.
 * RESIDUALS (named; each family's quiet rows are pinned in RESIDUALS and anchored outside this file): R-RUNTIME - code the suite
 *   runs at collection rewrites a standing row's reading in flight through a method the installed vitest runner's each calls
 *   on its table (read from @vitest/runner's dist: every, forEach), patched on Array.prototype, while every row still
 *   registers and passes for another cause: the FILE PIN binds the row's text and the RUN PIN the case's registration and
 *   result, neither the reading's value at run time. One quiet row per derived method: a planted suite patching it around the
 *   call reads exactly the sound reading, and the family's mode reading (the methods the suite assigns on Array.prototype)
 *   names that method there, reads nothing on the planted base (the neutral payload), and the same rewrite through the table
 *   binding (the loud payload) breaks TABLE.
 * GATE (re-measured read-only at the cut, no fetch): HyperUnix-CLI origin/main c275230d sdk/typescript/package.json version
 * 0.1.0, sdk/typescript/src/result.ts:157 SDK_REPRESENTATION "hyperunix.result/1"; no other hyperunix.result/<n> tag under
 * sdk/ or docs/programs; docs/programs/original-goals-closure-2026-10-16/requirements.jsonl:6 HXGC-EPI-002 status DESIGN,
 * graduated false. The successor is unpublished, so every row is green today and PARKED stays owed.
 * FROZEN SHAPE (standing rule 16): the row shape `${row}:${clause}:${pins}`, every clause key's row, and every pin's line
 * `${id} | ${requirement} | ${witness}` (PIN_LINES, the witness measured from the subject) are literals; one case per pin
 * runs against its line and the suite is held to one collected case per pin. Pins are generated from the anchors above, so a
 * member dropped from a table here leaves its generated pin without an entry, and a line dropped alone leaves a generated pin
 * without its line; both red. S SURFACES and RESIDUALS carry their own frozen shapes, anchored on the reader's sections and
 * on the installed runner.
 * Not claimed: an R neighbour derivation replaced by another derivation together with its frozen witness; an edit of the
 * judging code itself (a parser, the type checker's binding or a comparison replaced by a constant); a representation tag
 * assembled at run time instead of spelled in one string token (concatenation, a template substitution), which C does not
 * read (C COLLECTOR pins that quiet reading); what the cited callback's free variables and the suite's other declarations do
 * (thrown, context and the rest: only the callback's text and the helper are pinned) and whether the helper's reading is
 * otherwise accepted (the cited suite's own acceptance cases judge that); a vitest module reached through a specifier
 * assembled at run time or a loader the IMPORT scan does not name (the RUN PIN reads the registration such a path changes,
 * and a rewrite in flight is R-RUNTIME's); an export row that repeats a JSON key (a JSON reader keeps the last one).
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, allocates no scratch (WS is a string, never created);
 * reads the bead export, the src tree, the vendored SDK's dist/index.js and its declaring module, the cited suite, the run
 * pin's bytes, forge.toml, package.json and the census tier's vitest config (the shared resolveTier), and @vitest/runner's dist.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson, resultToJson, SDK_REPRESENTATION } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, expectTypeOf, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { HYPERUNIX_FIND_CONTRACT, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { resolveTier } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.3";
const SDK_DIST = join(ROOT, "node_modules/@hyperunix/sdk/dist");
/** The installed vitest runner's dist, where its it.each reads its table (RESIDUALS R-RUNTIME). */
const RUNNER_DIST = join(ROOT, "node_modules/@vitest/runner/dist");
/** The run pin: the census-tier companion that judges the cited suite's standing cases in the gate's own test report. */
const RUN_PIN = "test/workbench-hyperunix-successor-gate-run-pin.census.ts";
/** The forge.toml step that runs the census tier. */
const CENSUS_TIER = "census";
/** A version tag of either family: hyperunix.find/v<n> (the provider contract) or hyperunix.result/<n> (the SDK representation). */
const VERSION_TAG = /hyperunix\.(?:find\/v\d+|result\/\d+)/g;
/** A representation tag anywhere inside string text, and the whole text of a token that is exactly one. */
const REPRESENTATION_TAG = /hyperunix\.result\/\d+/g;
const WHOLE_REPRESENTATION = /^hyperunix\.result\/\d+$/;
const WS = "/workspace/hx-successor-gate";
const BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:tester" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-28T04:00:00Z",
  observedAt: "2026-10-28T04:00:01Z",
};
/** Fixture source text for templates, spelled without a placeholder inside a plain string. */
const TICK = "`";
const slot = (expression: string): string => "$" + "{" + expression + "}";

type Json = { [key: string]: JsonValue };
type RowId = "T" | "X" | "R" | "S" | "C";
interface Pin {
  readonly id: string;
  readonly requirement: string;
  readonly witness: () => Promise<string>;
}
interface Row {
  readonly id: RowId;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
/** What the census reads of the owner filing. */
interface Filing {
  /** Clause key (statement.1-3, acceptance.<item>[.<part>]) -> its text, in filing order. */
  readonly clauses: ReadonlyMap<string, string>;
  /** The version tags the standing item names, and the test files it cites. */
  readonly standingTags: readonly string[];
  readonly standingFixtures: readonly string[];
  /** The families statement.3 names ("unknown <a>/<b> versions"). */
  readonly families: readonly string[];
  /** The src files of the SURFACES line, in filing order. */
  readonly srcSurfaces: readonly string[];
  /** How many export rows carry the bead's id, and how many times the description holds each heading the reading uses. */
  readonly counts: Readonly<Record<string, number>>;
}
interface Site {
  readonly file: string;
  readonly tag: string;
  readonly whole: boolean;
  readonly context: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const jsonRecord = (value: JsonValue | undefined): Json | undefined =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;

/** The descriptions of every row of the tracker export whose id is the bead's: every row is parsed, so an id matches by value, never by spelling. */
function filingRows(exported: string): string[] {
  const rows: string[] = [];
  for (const line of exported.split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === BEAD) rows.push(typeof row.description === "string" ? row.description : "");
  }
  return rows;
}
function readFiling(rows: readonly string[]): Filing {
  const text = rows[0] ?? "";
  const statement = /^STATEMENT: When (.+?) \([^)]*\), Pi shall (.+?); until then (.+?)\.$/m.exec(text);
  const parts = statement === null ? [] : statement.slice(1);
  const items = [...(/^ACCEPTANCE: \[(.+)\]$/m.exec(text)?.[1] ?? "").matchAll(/(["'])((?:Standing|On landing): .*?)\1(?=, |$)/g)].map(match => match[2] ?? "");
  const clauses = new Map<string, string>(parts.map((part, index) => [`statement.${index + 1}`, part]));
  for (const [index, item] of items.entries()) {
    if (item.startsWith("Standing: ")) clauses.set(`acceptance.${index + 1}`, item.slice("Standing: ".length));
    else for (const [part, clause] of item.slice("On landing: ".length).replace(/\.$/, "").split("; ").entries()) clauses.set(`acceptance.${index + 1}.${part + 1}`, clause);
  }
  const standing = items.find(item => item.startsWith("Standing: ")) ?? "";
  const headings = (heading: string): number => text.split("\n").filter(line => line.startsWith(`${heading}: `)).length;
  return {
    clauses,
    standingTags: [...standing.matchAll(VERSION_TAG)].map(match => match[0]),
    standingFixtures: [...standing.matchAll(/test\/[\w.-]+\.test\.ts/g)].map(match => match[0]),
    families: /unknown (\S+) versions/.exec(parts[2] ?? "")?.[1]?.split("/") ?? [],
    srcSurfaces: (/^SURFACES: (.+)$/m.exec(text)?.[1] ?? "").split(", ").map(entry => entry.split(":")[0] ?? "").filter(path => path.startsWith("src/")),
    counts: {
      rows: rows.length, STATEMENT: headings("STATEMENT"), ACCEPTANCE: headings("ACCEPTANCE"), SURFACES: headings("SURFACES"),
      Standing: items.filter(item => item.startsWith("Standing: ")).length,
    },
  };
}
const FILING_ROWS = filingRows(readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8"));
const FILING = readFiling(FILING_ROWS);

/** The tag each family accepts today, from its source of truth: the registered provider's contract and the vendored SDK's tag. */
const FAMILY_TAGS: Readonly<Record<string, string>> = { contract: HYPERUNIX_FIND_CONTRACT, representation: SDK_REPRESENTATION };
const versioned = (tag: string): RegExpExecArray | null => /^(.*?)(\d+)$/.exec(tag);
const unversioned = (tag: string): string => `<${tag} carries no version>`;
/** The tag with its trailing version number moved by `step`. */
function shifted(tag: string, step: number): string {
  const match = versioned(tag);
  return match === null ? unversioned(tag) : `${match[1]}${Number(match[2]) + step}`;
}
const successor = (tag: string): string => shifted(tag, 1);
const predecessor = (tag: string): string => shifted(tag, -1);
/** The tag with one more digit: a prefix comparison would still admit it. */
const extension = (tag: string): string => `${tag}0`;
/** The tag with a leading zero on its version number: a numeric comparison would still admit it. */
function zeroPadded(tag: string): string {
  const match = versioned(tag);
  return match === null ? unversioned(tag) : `${match[1]}0${match[2]}`;
}
/** The tag without its version number: a reverse prefix comparison (the accepted tag starts with it) would admit it. */
const truncated = (tag: string): string => versioned(tag)?.[1] ?? unversioned(tag);
/** The tag upper-cased: a case-insensitive comparison would admit it. */
const upperCased = (tag: string): string => tag.toUpperCase();
/** The tag with one leading, or one trailing, space: a trimming comparison would admit it. */
const leadingSpace = (tag: string): string => ` ${tag}`;
const trailingSpace = (tag: string): string => `${tag} `;
/** A tag as a witness shows it: quoted when it carries surrounding whitespace, so a padded neighbour reads as one. */
const shown = (tag: string): string => (tag.trim() === tag ? tag : JSON.stringify(tag));
/** The family whose accepted tag carries the same name before its version number. */
const familyOf = (tag: string): string | undefined =>
  Object.keys(FAMILY_TAGS).find(family => versioned(FAMILY_TAGS[family] ?? "")?.[1] === versioned(tag)?.[1]);

/** A minimal SDK result document under `representation`: an unlicensed incomplete find with no rows. */
function sdkDocument(representation: string = SDK_REPRESENTATION): Json {
  return {
    representation, operation: "find", rows: [], rows_retained: true, coverage: [],
    status: { exit_code: 0, signal: null, streams: [], terminal_reached: true, frames_total: 0 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [], view: null, cost: null,
    transport: { started_at: "2026-10-28T04:00:00.000Z", startup_latency_s: 0, process_duration_s: 0, stdout_bytes: 0, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 0 },
    workspace_root: WS, terminal: "partial", truth: null,
    coverage_summary: { modes: [], completeness: "incomplete", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: 0 },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null, digest_source: "absent", execution_id: null, budget_dimension: null, extensions: {},
  };
}
/** What the registered hyperunix.find provider returns for the SDK-decoded document, through the capability registry. */
async function providerOutput(): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  const native = resultFromJson(sdkDocument());
  registerHyperUnixFind(registry, { find: async () => native, runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }), close: async () => {} }, WS);
  return registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal });
}
/** The provider output with one family's tag replaced. */
function withTag(reading: JsonValue, family: string, tag: string): JsonValue {
  const value = jsonRecord(reading);
  const source = jsonRecord(value?.source);
  if (value === undefined || source === undefined) throw new Error("the provider output carries no source object");
  return family === "contract" ? { ...value, contract: tag } : { ...value, source: { ...source, representation: tag } };
}
/** How a call refuses: the error's name and message, or that it did not refuse. */
function refusal(run: () => unknown): string {
  try {
    run();
  } catch (error) {
    return error instanceof Error ? `${error.name}: ${error.message}` : `non-error ${String(error)}`;
  }
  return "no refusal";
}
/** The reader adapter's verdict on a reading: accepted with its snapshot count, or the category of its typed refusal. */
function adapterOutcome(reading: JsonValue): string {
  try {
    return `accepted(${hyperunixTopology(reading, CONTEXT).snapshots.length})`;
  } catch (error) {
    return error instanceof CapabilityError ? error.category : `untyped ${String(error)}`;
  }
}
const evidenceOutcome = (reading: JsonValue): string => JSON.stringify(nativeEvidence("hyperunix.find", reading));
function decoderOutcome(tag: string): string {
  const refused = refusal(() => resultFromJson(sdkDocument(tag)));
  return refused === "no refusal" ? "decoded" : refused.startsWith("TypeError: ") ? "decoder-refused" : refused;
}
/** One family tag on the provider's own output: the adapter's verdict, the evidence projection and, for a representation, the decoder. */
async function probe(family: string, tag: string): Promise<string> {
  const reading = withTag(await providerOutput(), family, tag);
  return `${shown(tag)}|${adapterOutcome(reading)}|${evidenceOutcome(reading)}${family === "representation" ? `|${decoderOutcome(tag)}` : ""}`;
}

/** Every identifier named `name` under `node`. */
function mentions(node: ts.Node, name: string): boolean {
  if (ts.isIdentifier(node) && node.text === name) return true;
  return ts.forEachChild(node, child => (mentions(child, name) ? true : undefined)) === true;
}
function declarationName(statement: ts.Statement): string {
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) return statement.name?.text ?? "<anonymous>";
  if (ts.isVariableStatement(statement)) {
    const [first] = statement.declarationList.declarations;
    if (first !== undefined && ts.isIdentifier(first.name)) return first.name.text;
  }
  return `<${ts.SyntaxKind[statement.kind]}>`;
}
const parse = (path: string, kind: ts.ScriptKind): ts.SourceFile => ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, kind);
/** The top-level declarations of the vendored SDK module that declares SDK_REPRESENTATION which name it, in source order. */
function sdkTagSites(): string[] {
  const declaring = parse(join(SDK_DIST, "index.js"), ts.ScriptKind.JS).statements.filter(ts.isExportDeclaration)
    .filter(declaration => declaration.exportClause !== undefined && ts.isNamedExports(declaration.exportClause) &&
      declaration.exportClause.elements.some(element => element.name.text === "SDK_REPRESENTATION"))
    .flatMap(declaration => (declaration.moduleSpecifier !== undefined && ts.isStringLiteral(declaration.moduleSpecifier) ? [declaration.moduleSpecifier.text] : []));
  if (declaring.length !== 1) return [`<${declaring.length} modules export SDK_REPRESENTATION>`];
  return parse(join(SDK_DIST, declaring[0] ?? ""), ts.ScriptKind.JS).statements.filter(statement => mentions(statement, "SDK_REPRESENTATION")).map(declarationName);
}

/** A string-text node's kind by name (ts.SyntaxKind's reverse map reads TemplateTail as its alias LastTemplateToken). */
function textKind(node: ts.Node): string {
  if (ts.isStringLiteral(node)) return "StringLiteral";
  if (ts.isNoSubstitutionTemplateLiteral(node)) return "NoSubstitutionTemplateLiteral";
  if (ts.isTemplateHead(node)) return "TemplateHead";
  if (ts.isTemplateMiddle(node)) return "TemplateMiddle";
  return ts.isTemplateTail(node) ? "TemplateTail" : ts.SyntaxKind[node.kind];
}
/** The tag's syntactic place: a whole token by what binds or compares it, an embedded one by its string-text node kind. */
function siteContext(node: ts.Node, whole: boolean, source: ts.SourceFile): string {
  if (!whole) return textKind(node);
  const parent = node.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) return `const ${parent.name.text}`;
  if (ts.isBinaryExpression(parent)) return `${parent.operatorToken.getText(source)} ${(parent.left === node ? parent.right : parent.left).getText(source)}`;
  return ts.SyntaxKind[parent.kind];
}
/** Every representation tag in the string text of the given path -> source map, in file then source order. */
function tagSites(files: ReadonlyMap<string, string>): Site[] {
  const sites: Site[] = [];
  for (const [file, text] of files) {
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        const whole = (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && WHOLE_REPRESENTATION.test(node.text);
        for (const match of node.text.matchAll(REPRESENTATION_TAG)) sites.push({ file, tag: match[0], whole, context: siteContext(node, whole, source) });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return sites;
}
const describeSite = (site: Site): string =>
  `${site.whole ? "whole" : "embedded"} ${site.tag}${site.tag === SDK_REPRESENTATION ? "" : " (not the vendored tag)"} @ ${site.context}`;
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).sort().flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : [];
  });
}
let srcSites: Site[] | undefined;
/** Every representation tag in src, read once. */
function srcTagSites(): Site[] {
  srcSites ??= tagSites(new Map(sourceFiles(join(ROOT, "src")).map(path => [relative(ROOT, path), readFileSync(path, "utf8")])));
  return srcSites;
}

/** TypeScript diagnostics that mean a name is declared twice in one scope: a duplicate identifier, a redeclared block-scoped variable, an import
 * conflicting with a local declaration, a var initialised beside a block-scoped declaration, a duplicate function implementation. */
const REDECLARATION_CODES: ReadonlySet<number> = new Set([2300, 2393, 2440, 2451, 2481]);
interface CheckedSuite {
  readonly source: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  /** The lines where the checker reports `name` declared twice in one scope (the binder keeps a redeclared block-scoped name as its own symbol). */
  readonly redeclared: (name: string) => number[];
}
/** A suite read by a type checker over that one file (no lib, no module resolution), so a name binds to its declaration by scope. */
function checkedSuite(file: string, text: string): CheckedSuite {
  const parsed = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === file ? parsed : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === file,
    readFile: name => (name === file ? text : undefined),
  };
  const program = ts.createProgram({ rootNames: [file], options: { noLib: true, noResolve: true, types: [] }, host });
  const source = program.getSourceFile(file) ?? parsed;
  let redeclarations: readonly ts.Diagnostic[] | undefined;
  const redeclared = (name: string): number[] => {
    redeclarations ??= program.getSemanticDiagnostics(source).filter(diagnostic => REDECLARATION_CODES.has(diagnostic.code));
    return redeclarations.flatMap(diagnostic => (diagnostic.start !== undefined && text.slice(diagnostic.start, diagnostic.start + (diagnostic.length ?? 0)) === name
      ? [source.getLineAndCharacterOfPosition(diagnostic.start).line + 1] : [])).sort((left, right) => left - right);
  };
  return { source, checker: program.getTypeChecker(), redeclared };
}
/** The array literal an expression stands for, through `as const`, `satisfies` and parentheses. */
function arrayLiteral(expression: ts.Expression | undefined): ts.ArrayLiteralExpression | undefined {
  let current = expression;
  while (current !== undefined && (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current))) current = current.expression;
  return current !== undefined && ts.isArrayLiteralExpression(current) ? current : undefined;
}
/** Every identifier the checker binds to `symbol` (shorthand properties and export specifiers included), its declaration's name too. */
function references(checker: ts.TypeChecker, source: ts.SourceFile, symbol: ts.Symbol): ts.Identifier[] {
  const found: ts.Identifier[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === symbol.name) {
      const parent = node.parent;
      const bound = ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent)
        : ts.isExportSpecifier(parent) ? checker.getExportSpecifierLocalTargetSymbol(parent) : checker.getSymbolAtLocation(node);
      if (bound === symbol) found.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
// ---- S FILE PIN: the cited suite read by one type checker, one section per binding surface, fail closed outside each ----

/** A section of the S file pin's reading: `${surface} ${what it read}`, or `${surface} <${why}>` when the form is not the pinned one. */
const broken = (surface: string, why: string): string => `${surface} <${why}>`;
const notRead = (surface: string, cause: string): string => `${surface} <not read: ${cause} broke>`;
const digest16 = (text: string | Buffer): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
const lineOf = (source: ts.SourceFile, node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
/** ts.SyntaxKind's reverse map names some kinds by an alias (QualifiedName as FirstNode): the names a break reason uses. */
const KIND_ALIASES: Readonly<Record<string, string>> = { FirstNode: "QualifiedName", FirstStatement: "VariableStatement", FirstAssignment: "EqualsToken", LastTemplateToken: "TemplateTail", FirstTypeNode: "TypePredicate" };
const kindName = (node: ts.Node): string => {
  const name = ts.SyntaxKind[node.kind] ?? "<unknown kind>";
  return KIND_ALIASES[name] ?? name;
};
const isFunctionCallback = (node: ts.Node | undefined): node is ts.ArrowFunction | ts.FunctionExpression =>
  node !== undefined && (ts.isArrowFunction(node) || ts.isFunctionExpression(node));
/** A module specifier of vitest or one of its packages. */
const VITEST_MODULE = /^(?:vitest(?:\/.*)?|@vitest\/.+)$/;
/** Identifiers that load a module by specifier at run time, and the vi members that do. */
const LOADER_NAMES: ReadonlySet<string> = new Set(["require", "createRequire"]);
const LOADER_MEMBERS: ReadonlySet<string> = new Set(["importActual", "importMock"]);
/** The surfaces after CALL, read only from the one cited call. */
const CALL_SURFACES = ["PATH", "CALLBACK", "TABLE", "ROWS", "POSITION", "HELPER"] as const;

/** The suite's import declarations from "vitest". */
function vitestImports(source: ts.SourceFile): ts.ImportDeclaration[] {
  return source.statements.filter((statement): statement is ts.ImportDeclaration =>
    ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === "vitest");
}
/** The value specifiers of the suite's one named vitest import, or why there is no such import. */
function vitestSpecifiers(source: ts.SourceFile): readonly ts.ImportSpecifier[] | string {
  const imports = vitestImports(source);
  const [declaration] = imports;
  if (imports.length !== 1 || declaration === undefined) return `${imports.length} import declarations from vitest`;
  const clause = declaration.importClause;
  const named = clause?.namedBindings;
  if (clause === undefined || clause.phaseModifier === ts.SyntaxKind.TypeKeyword || clause.name !== undefined || named === undefined || !ts.isNamedImports(named)) {
    return "the vitest import is not one named value import";
  }
  return named.elements.filter(element => !element.isTypeOnly);
}
/** Whether `node` is the suite's unaliased value import `name` from its one vitest import declaration, never redeclared. */
function isVitest(suite: CheckedSuite, node: ts.Node, name: string): boolean {
  if (!ts.isIdentifier(node) || node.text !== name || suite.redeclared(name).length > 0) return false;
  const specifiers = vitestSpecifiers(suite.source);
  if (typeof specifiers === "string") return false;
  const declarations = suite.checker.getSymbolAtLocation(node)?.declarations ?? [];
  const [specifier] = declarations;
  return declarations.length === 1 && specifier !== undefined && ts.isImportSpecifier(specifier) && specifiers.includes(specifier) && specifier.propertyName === undefined;
}
function importSection(source: ts.SourceFile): string {
  const specifiers = vitestSpecifiers(source);
  if (typeof specifiers === "string") return broken("IMPORT", specifiers);
  for (const name of ["describe", "it"]) {
    if (!specifiers.some(specifier => specifier.propertyName === undefined && specifier.name.text === name)) return broken("IMPORT", `the vitest import binds no unaliased value ${name}`);
  }
  const own = vitestImports(source)[0]?.moduleSpecifier;
  const others: string[] = [];
  const visit = (node: ts.Node): void => {
    const at = (): string => `line ${lineOf(source, node)}`;
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && node !== own && VITEST_MODULE.test(node.text)) others.push(`'${node.text}' at ${at()}`);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) others.push(`import() at ${at()}`);
    if (ts.isIdentifier(node) && LOADER_NAMES.has(node.text)) others.push(`${node.text} at ${at()}`);
    if (ts.isPropertyAccessExpression(node) && LOADER_MEMBERS.has(node.name.text)) others.push(`.${node.name.text} at ${at()}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (others.length > 0) return broken("IMPORT", `a module reached another way: ${others.join(", ")}`);
  return "IMPORT describe, it: unaliased value imports of the one vitest import; no other vitest module specifier, import(), require, createRequire, importActual or importMock";
}
function referencesSection(suite: CheckedSuite): string {
  const { checker, source } = suite;
  const specifiers = vitestSpecifiers(source);
  if (typeof specifiers === "string") return notRead("REFERENCES", "IMPORT");
  const offenders: string[] = [];
  for (const specifier of specifiers) {
    const symbol = checker.getSymbolAtLocation(specifier.name);
    if (symbol === undefined) {
      offenders.push(`${specifier.name.text}: no symbol`);
      continue;
    }
    for (const reference of references(checker, source, symbol)) {
      if (reference === specifier.name) continue;
      const parent = reference.parent;
      const call = ts.isCallExpression(parent) && parent.expression === reference;
      const memberCall = ts.isPropertyAccessExpression(parent) && parent.expression === reference && parent.questionDotToken === undefined &&
        ts.isCallExpression(parent.parent) && parent.parent.expression === parent;
      if (call || memberCall) continue;
      const member = ts.isPropertyAccessExpression(parent) && parent.expression === reference ? parent : undefined;
      offenders.push(member === undefined ? `${reference.text} at line ${lineOf(source, reference)} in a ${kindName(parent)}`
        : `${reference.text}.${member.name.text} at line ${lineOf(source, reference)} in a ${kindName(member.parent)}`);
    }
  }
  if (offenders.length > 0) return broken("REFERENCES", `a vitest binding read other than as a call or a member call: ${offenders.join(", ")}`);
  return "REFERENCES every reference to a vitest value import is a call or the object of a member call";
}
function accessSection(source: ts.SourceFile): string {
  const lines: number[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === "eval") lines.push(lineOf(source, node));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return lines.length > 0 ? broken("ACCESS", `eval at line ${lines.join(", ")}`) : "ACCESS no eval: every read of a table is one the checker binds";
}

/** A .each call whose table carries a row named for a standing tag: <object>.each(<table>)(<arguments>). */
interface StandingCall {
  readonly call: ts.CallExpression;
  readonly each: ts.CallExpression;
  readonly member: ts.PropertyAccessExpression;
  /** The table's rows, read to identify the call: an inline array, or the array literal of every declaration its identifier binds to. */
  readonly rows: readonly ts.Expression[];
}
function identifiedRows(checker: ts.TypeChecker, table: ts.Expression | undefined): ts.Expression[] {
  const inline = arrayLiteral(table);
  if (inline !== undefined) return [...inline.elements];
  if (table === undefined || !ts.isIdentifier(table)) return [];
  return (checker.getSymbolAtLocation(table)?.declarations ?? []).flatMap(declaration =>
    (ts.isVariableDeclaration(declaration) ? [...(arrayLiteral(declaration.initializer)?.elements ?? [])] : []));
}
/** The name a row carries: its first element's text when that is a string literal. */
function rowName(row: ts.Expression): string | undefined {
  const [name] = arrayLiteral(row)?.elements ?? [];
  return name !== undefined && ts.isStringLiteralLike(name) ? name.text : undefined;
}
const namesTag = (row: ts.Expression, tag: string): boolean => rowName(row)?.endsWith(` ${tag}`) === true;
function standingCalls(checker: ts.TypeChecker, source: ts.SourceFile, tags: readonly string[]): StandingCall[] {
  const found: StandingCall[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression) &&
      node.expression.expression.name.text === "each") {
      const rows = identifiedRows(checker, node.expression.arguments[0]);
      if (rows.some(row => tags.some(tag => namesTag(row, tag)))) found.push({ call: node, each: node.expression, member: node.expression.expression, rows });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** Every it.each(...)(<string literal>, ...) call whose `it` is the suite's vitest import, with its title. */
function vitestEachCalls(suite: CheckedSuite): { readonly call: ts.CallExpression; readonly title: string }[] {
  const calls: { readonly call: ts.CallExpression; readonly title: string }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression) &&
      node.expression.expression.name.text === "each" && isVitest(suite, node.expression.expression.expression, "it")) {
      const [title] = node.arguments;
      if (title !== undefined && ts.isStringLiteralLike(title)) calls.push({ call: node, title: title.text });
    }
    ts.forEachChild(node, visit);
  };
  visit(suite.source);
  return calls;
}
/** The return statements that belong to a callback itself, never to a function nested in it. */
function ownReturns(source: ts.SourceFile, callback: ts.ArrowFunction | ts.FunctionExpression): number[] {
  const lines: number[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isReturnStatement(node)) lines.push(lineOf(source, node));
    if (!ts.isFunctionLike(node)) ts.forEachChild(node, visit);
  };
  ts.forEachChild(callback.body, visit);
  return lines;
}
/** The titles of the plain vitest describes that register a call's statement where it is written, outermost first, or why they do not. */
function describePath(suite: CheckedSuite, call: ts.CallExpression): readonly string[] | string {
  const { source } = suite;
  const titles: string[] = [];
  let statement: ts.Node = call.parent;
  if (!ts.isExpressionStatement(statement)) return "the call is not a statement of its own";
  while (!ts.isSourceFile(statement.parent)) {
    const body = statement.parent;
    const callback = body.parent;
    const describeCall = callback?.parent;
    if (!ts.isBlock(body) || !isFunctionCallback(callback) || callback.body !== body || describeCall === undefined || !ts.isCallExpression(describeCall) ||
      !describeCall.arguments.some(argument => argument === callback)) {
      return "registered inside a block that is not a describe callback";
    }
    if (!isVitest(suite, describeCall.expression, "describe")) return `registered under ${describeCall.expression.getText(source)}`;
    const [title, second] = describeCall.arguments;
    if (describeCall.arguments.length !== 2 || second !== callback || describeCall.typeArguments !== undefined) {
      return `registered under a describe call of ${describeCall.arguments.length} arguments at line ${lineOf(source, describeCall)}`;
    }
    if (title === undefined || !ts.isStringLiteralLike(title)) return "registered under a describe whose title is not a string literal";
    const returns = ownReturns(source, callback);
    if (returns.length > 0) return `a return of the describe callback '${title.text}' at line ${returns.join(", ")}`;
    titles.unshift(title.text);
    statement = describeCall.parent;
    if (!ts.isExpressionStatement(statement)) return "a describe call that is not a statement of its own";
  }
  return titles;
}
const pathKey = (suite: CheckedSuite, call: ts.CallExpression): string => {
  const path = describePath(suite, call);
  return typeof path === "string" ? `<${path}>` : path.join(" > ");
};
function callSection(suite: CheckedSuite, cited: StandingCall): string {
  const { source } = suite;
  const problems: string[] = [];
  const object = cited.member.expression;
  if (!isVitest(suite, object, "it")) problems.push(`.each is read on ${object.getText(source)}, not the suite's vitest it`);
  if (cited.member.questionDotToken !== undefined) problems.push("an optional .each");
  if (cited.each.arguments.length !== 1 || cited.each.typeArguments !== undefined) problems.push(`it.each takes ${cited.each.arguments.length} argument(s)${cited.each.typeArguments === undefined ? "" : " and type arguments"}`);
  const [title, callback] = cited.call.arguments;
  if (cited.call.arguments.length !== 2 || cited.call.typeArguments !== undefined) problems.push(`the case call takes ${cited.call.arguments.length} argument(s)${cited.call.typeArguments === undefined ? "" : " and type arguments"}`);
  if (title === undefined || !ts.isStringLiteralLike(title)) problems.push("the title is not a string literal");
  if (!isFunctionCallback(callback)) problems.push("the callback is not an arrow function or a function expression");
  if (problems.length > 0 || title === undefined || !ts.isStringLiteralLike(title) || !isFunctionCallback(callback)) return broken("CALL", problems.join("; "));
  const key = pathKey(suite, cited.call);
  const twins = vitestEachCalls(suite).filter(other => other.call !== cited.call && other.title === title.text && pathKey(suite, other.call) === key);
  if (twins.length > 0) return broken("CALL", `its path and title are shared with the it.each call at line ${twins.map(twin => lineOf(source, twin.call)).join(", ")}`);
  const kind = ts.isArrowFunction(callback) ? "arrow function" : "function expression";
  return `CALL '${title.text}': it.each(${cited.each.arguments[0]?.getText(source) ?? ""})(title, ${kind}), the one .each call carrying a standing row, its path and title unique`;
}
function pathSection(suite: CheckedSuite, call: ts.CallExpression): string {
  const path = describePath(suite, call);
  if (typeof path === "string") return broken("PATH", path);
  return `PATH ${path.join(" > ")}: every enclosing block is a plain two-argument vitest describe callback holding no return of its own`;
}
function tableSection(suite: CheckedSuite, cited: StandingCall): string {
  const { checker, source } = suite;
  const [table] = cited.each.arguments;
  const holeOf = (literal: ts.ArrayLiteralExpression): ts.Expression | undefined => literal.elements.find(element => ts.isSpreadElement(element) || ts.isOmittedExpression(element));
  if (arrayLiteral(table) !== undefined) return broken("TABLE", "the table is written inline, not an identifier bound to a declaration");
  if (table === undefined || !ts.isIdentifier(table)) return broken("TABLE", `the table is ${table?.getText(source) ?? "missing"}`);
  const symbol = checker.getSymbolAtLocation(table);
  const declarations = symbol?.declarations ?? [];
  const [declaration] = declarations;
  if (symbol === undefined || declaration === undefined || declarations.length !== 1) return broken("TABLE", `${table.text}: ${declarations.length} declarations`);
  if (!ts.isVariableDeclaration(declaration) || (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) === 0) return broken("TABLE", `${table.text} is not a const declaration`);
  const literal = arrayLiteral(declaration.initializer);
  if (literal === undefined) return broken("TABLE", `${table.text} is not initialised with an array literal`);
  const hole = holeOf(literal);
  if (hole !== undefined) return broken("TABLE", `${table.text} holds a ${ts.isSpreadElement(hole) ? "spread element" : "hole"} at line ${lineOf(source, hole)}`);
  const redeclared = suite.redeclared(table.text);
  if (redeclared.length > 0) return broken("TABLE", `${table.text} redeclared in its scope at line ${redeclared.join(", ")}`);
  const elsewhere = references(checker, source, symbol).filter(reference => reference.parent !== declaration && reference !== table).map(reference => lineOf(source, reference));
  if (elsewhere.length > 0) return broken("TABLE", `${table.text} also referenced at line ${elsewhere.join(", ")}`);
  return `TABLE ${table.text}: one const declaration of an array literal with no spread or hole, not redeclared, read only as this call's table`;
}
/** ROWS: each standing tag's one row, a two-element array literal named '<family> <tag>'. */
function rowsReading(rows: readonly ts.Expression[], tags: readonly string[], source: ts.SourceFile): { readonly section: string; readonly standing: readonly (readonly [string, ts.ArrayLiteralExpression])[] } {
  const problems: string[] = [];
  const standing: (readonly [string, ts.ArrayLiteralExpression])[] = [];
  for (const tag of tags) {
    const family = familyOf(tag) ?? "<no family>";
    const named = rows.filter(row => namesTag(row, tag));
    const [row] = named;
    if (named.length !== 1 || row === undefined) {
      problems.push(`${tag}: ${named.length} rows`);
      continue;
    }
    const [name] = ts.isArrayLiteralExpression(row) ? row.elements : [];
    if (!ts.isArrayLiteralExpression(row) || row.elements.length !== 2) problems.push(`${tag}: not a two-element array literal`);
    else if (name === undefined || !ts.isStringLiteral(name) || name.text !== `${family} ${tag}`) problems.push(`${tag}: named ${name?.getText(source) ?? "nothing"}`);
    else standing.push([tag, row]);
  }
  if (problems.length > 0) return { section: broken("ROWS", problems.join(" & ")), standing };
  return { section: `ROWS ${tags.map(tag => `'${familyOf(tag) ?? "<no family>"} ${tag}'`).join(" & ")}: one two-element row each`, standing };
}
/** A POSITION form read from a standing row's reading: the helper call it spreads or makes, and the form written canonically. */
interface Position {
  readonly callee: ts.Identifier;
  readonly form: string;
}
const stringValue = (node: ts.Expression, source: ts.SourceFile): string => (ts.isStringLiteral(node) ? `'${node.text}'` : node.getText(source));
function contractForm(reading: ts.Expression | undefined, tag: string, source: ts.SourceFile): Position | string {
  if (reading === undefined || !ts.isObjectLiteralExpression(reading)) return "the reading is not an object literal";
  if (reading.properties.length !== 2) return `an object literal of ${reading.properties.length} properties`;
  const [spread, property] = reading.properties;
  if (spread === undefined || !ts.isSpreadAssignment(spread) || !ts.isCallExpression(spread.expression) || !ts.isIdentifier(spread.expression.expression) ||
    spread.expression.arguments.length !== 0 || spread.expression.typeArguments !== undefined) {
    return "its first property is not a spread of a zero-argument helper call";
  }
  if (property === undefined || !ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name) || property.name.text !== "contract") return "its second property is not an identifier-keyed contract property";
  if (!ts.isStringLiteral(property.initializer) || property.initializer.text !== tag) return `contract is set to ${stringValue(property.initializer, source)}`;
  const callee = spread.expression.expression;
  return { callee, form: `{...${callee.text}(), contract: '${tag}'}` };
}
function representationForm(reading: ts.Expression | undefined, tag: string, source: ts.SourceFile): Position | string {
  if (reading === undefined || !ts.isCallExpression(reading) || !ts.isIdentifier(reading.expression) || reading.typeArguments !== undefined) return "the reading is not a helper call";
  if (reading.arguments.length !== 1) return `a helper call of ${reading.arguments.length} arguments`;
  const [argument] = reading.arguments;
  if (argument === undefined || !ts.isObjectLiteralExpression(argument) || argument.properties.length !== 1) return "its argument is not an object literal of one property";
  const [property] = argument.properties;
  if (property === undefined || !ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name) || property.name.text !== "representation") {
    return "its argument's property is not an identifier-keyed representation property";
  }
  if (!ts.isStringLiteral(property.initializer) || property.initializer.text !== tag) return `representation is set to ${stringValue(property.initializer, source)}`;
  return { callee: reading.expression, form: `${reading.expression.text}({representation: '${tag}'})` };
}
function positionReading(standing: readonly (readonly [string, ts.ArrayLiteralExpression])[], source: ts.SourceFile): { readonly section: string; readonly callees: readonly ts.Identifier[] } {
  const forms: string[] = [];
  const problems: string[] = [];
  const callees: ts.Identifier[] = [];
  for (const [tag, row] of standing) {
    const family = familyOf(tag) ?? "<no family>";
    const reading = row.elements[1];
    const read = family === "contract" ? contractForm(reading, tag, source) : family === "representation" ? representationForm(reading, tag, source) : `no position form for the family ${family}`;
    if (typeof read === "string") problems.push(`${family} ${tag}: ${read}`);
    else {
      callees.push(read.callee);
      forms.push(`${family} ${tag} ${read.form}`);
    }
  }
  if (problems.length > 0) return { section: broken("POSITION", problems.join(" & ")), callees };
  return { section: `POSITION ${forms.join(" & ")}`, callees };
}
/** The helper's shape the POSITION forms rely on, or what differs: its two parameters and the two family literals it returns. */
interface HelperShape {
  readonly source: string;
  readonly top: string;
  readonly contract: string;
  readonly representation: string;
}
function helperShape(checker: ts.TypeChecker, declaration: ts.FunctionDeclaration): HelperShape | string {
  const [first, second] = declaration.parameters;
  if (declaration.parameters.length !== 2 || first === undefined || second === undefined || !ts.isIdentifier(first.name) || !ts.isIdentifier(second.name)) return "its parameters are not two identifiers";
  for (const parameter of [first, second]) {
    const initializer = parameter.initializer;
    if (parameter.dotDotDotToken !== undefined || initializer === undefined || !ts.isObjectLiteralExpression(initializer) || initializer.properties.length > 0) {
      return `${parameter.name.getText()} does not default to {}`;
    }
  }
  const statements = declaration.body?.statements ?? [];
  const [only] = statements;
  let returned = only !== undefined && ts.isReturnStatement(only) ? only.expression : undefined;
  while (returned !== undefined && ts.isParenthesizedExpression(returned)) returned = returned.expression;
  if (statements.length !== 1 || returned === undefined || !ts.isObjectLiteralExpression(returned)) return "its body is not one return of an object literal";
  const symbolOf = (node: ts.Node): ts.Symbol | undefined => checker.getSymbolAtLocation(node);
  /** Whether a literal has no computed key and ends with a spread of `parameter`, its only spread. */
  const endsWithSpreadOf = (literal: ts.ObjectLiteralExpression, parameter: ts.ParameterDeclaration): boolean => {
    const spreads = literal.properties.filter(ts.isSpreadAssignment);
    const last = literal.properties[literal.properties.length - 1];
    return !literal.properties.some(property => property.name !== undefined && ts.isComputedPropertyName(property.name)) && spreads.length === 1 && last !== undefined &&
      ts.isSpreadAssignment(last) && ts.isIdentifier(last.expression) && symbolOf(last.expression) !== undefined && symbolOf(last.expression) === symbolOf(parameter.name);
  };
  /** The one property a literal names `key`, whatever its kind; it must be a property assignment. */
  const property = (literal: ts.ObjectLiteralExpression, key: string): ts.PropertyAssignment | undefined => {
    const named = literal.properties.filter(entry => entry.name !== undefined && (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) && entry.name.text === key);
    const [one] = named;
    return named.length === 1 && one !== undefined && ts.isPropertyAssignment(one) ? one : undefined;
  };
  if (!endsWithSpreadOf(returned, second)) return `the returned object does not end with ...${second.name.text} as its only spread, with no computed key`;
  const contract = property(returned, "contract");
  if (contract === undefined || !ts.isStringLiteral(contract.initializer)) return "the returned object holds no one contract string literal";
  const sourceProperty = property(returned, "source");
  const sourceObject = sourceProperty?.initializer;
  if (sourceObject === undefined || !ts.isObjectLiteralExpression(sourceObject)) return "the returned object holds no one source object literal";
  if (!endsWithSpreadOf(sourceObject, first)) return `source does not end with ...${first.name.text} as its only spread, with no computed key`;
  const representation = property(sourceObject, "representation");
  if (representation === undefined || !ts.isStringLiteral(representation.initializer)) return "source holds no one representation string literal";
  return { source: first.name.text, top: second.name.text, contract: contract.initializer.text, representation: representation.initializer.text };
}
function helperSection(suite: CheckedSuite, callees: readonly ts.Identifier[]): string {
  const { checker, source } = suite;
  const symbols = [...new Set(callees.map(callee => checker.getSymbolAtLocation(callee)))];
  const [symbol] = symbols;
  if (symbols.length !== 1 || symbol === undefined) return broken("HELPER", `the POSITION forms call ${symbols.length} helpers`);
  const declarations = symbol.declarations ?? [];
  const [declaration] = declarations;
  if (declarations.length !== 1 || declaration === undefined || !ts.isFunctionDeclaration(declaration) || !ts.isSourceFile(declaration.parent) || declaration.name === undefined ||
    declaration.body === undefined) {
    return broken("HELPER", `${symbol.name} is not one top-level function declaration (${declarations.length} declarations)`);
  }
  const name = declaration.name.text;
  const redeclared = suite.redeclared(name);
  if (redeclared.length > 0) return broken("HELPER", `${name} redeclared at line ${redeclared.join(", ")}`);
  const others = references(checker, source, symbol).filter(reference => reference !== declaration.name && !(ts.isCallExpression(reference.parent) && reference.parent.expression === reference));
  if (others.length > 0) return broken("HELPER", `${name} referenced other than as a call at line ${others.map(reference => lineOf(source, reference)).join(", ")}`);
  const shape = helperShape(checker, declaration);
  if (typeof shape === "string") return broken("HELPER", `${name}: ${shape}`);
  for (const [family, value] of [["contract", shape.contract], ["representation", shape.representation]] as const) {
    if (value !== FAMILY_TAGS[family]) return broken("HELPER", `${name}: its ${family} literal '${value}' is not the accepted ${family} tag ${FAMILY_TAGS[family] ?? "<none>"}`);
  }
  return `HELPER ${name}: one top-level function declaration, every reference a call; (${shape.source} = {}, ${shape.top} = {}) returns {contract: '${shape.contract}', ` +
    `source: {representation: '${shape.representation}', ..., ...${shape.source}}, ..., ...${shape.top}}; sha256_16 ${digest16(declaration.getText(source))}`;
}
/** The S file pin's reading of a cited suite: one section per binding surface, in the order the header lists them. */
function citedFixture(file: string, text: string, tags: readonly string[], cited: readonly string[]): string[] {
  const suite = checkedSuite(file, text);
  const { checker, source } = suite;
  const sections = [
    cited.length === 1 && cited[0] === file ? `FILE ${file}: the one suite the Standing item cites, read by that path` : broken("FILE", `the Standing item cites ${cited.length} suites (${cited.join(", ")})`),
    importSection(source),
    referencesSection(suite),
    accessSection(source),
  ];
  const calls = standingCalls(checker, source, tags);
  const [cited0] = calls;
  if (calls.length !== 1 || cited0 === undefined) {
    const why = calls.length === 0 ? "no .each call carries a row named for a standing tag" : `${calls.length} .each calls carry rows named for a standing tag, at line ${calls.map(call => lineOf(source, call.call)).join(", ")}`;
    return [...sections, broken("CALL", why), ...CALL_SURFACES.map(surface => notRead(surface, "CALL"))];
  }
  const [, callback] = cited0.call.arguments;
  const rows = rowsReading(cited0.rows, tags, source);
  const rowsBroke = rows.section.startsWith("ROWS <");
  const position = rowsBroke ? undefined : positionReading(rows.standing, source);
  const helper = position === undefined ? notRead("HELPER", "ROWS") : position.section.startsWith("POSITION <") ? notRead("HELPER", "POSITION") : helperSection(suite, position.callees);
  return [
    ...sections,
    callSection(suite, cited0),
    pathSection(suite, cited0.call),
    isFunctionCallback(callback) ? `CALLBACK sha256_16 ${digest16(callback.getText(source))}` : broken("CALLBACK", "no function callback"),
    tableSection(suite, cited0),
    rows.section,
    position?.section ?? notRead("POSITION", "ROWS"),
    helper,
  ];
}

// ---- S RUN PIN: the census tier collects the run pin, read through the shared resolveTier and the tier config's test block ----

/** A config glob as a whole-path pattern: `**` across directories, `*` within one; any other glob syntax reads as unmatched. */
function globMatches(glob: string, path: string): boolean {
  if (/[?[\]{}!]/.test(glob)) return false;
  const parts = glob.split("/");
  const pattern = parts.map((part, index) => {
    if (part === "**") return "(?:[^/]+/)*";
    const escaped = part.replace(/[.+^$()|\\]/g, "\\$&").replace(/\*/g, "[^/]*");
    return index === parts.length - 1 ? escaped : `${escaped}/`;
  }).join("");
  return new RegExp(`^${pattern}$`).test(path);
}
/** The test block of a vitest config's default export, read by position: `export default <call>({ test: { ... } })`. */
function configTestBlock(file: string, text: string): ts.ObjectLiteralExpression | string {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const exports = source.statements.filter(ts.isExportAssignment);
  const [exported] = exports;
  if (exports.length !== 1 || exported === undefined || exported.isExportEquals === true) return `${exports.length} default exports`;
  const call = exported.expression;
  const [config] = ts.isCallExpression(call) ? call.arguments : [];
  if (!ts.isCallExpression(call) || call.arguments.length !== 1 || config === undefined || !ts.isObjectLiteralExpression(config)) return "the default export is not a call of one object literal";
  const tests = config.properties.filter(property => property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === "test");
  const [test] = tests;
  if (tests.length !== 1 || test === undefined || !ts.isPropertyAssignment(test) || !ts.isObjectLiteralExpression(test.initializer)) return "the config holds no one test object literal";
  if (config.properties.some(property => ts.isSpreadAssignment(property) || (property.name !== undefined && ts.isComputedPropertyName(property.name)))) return "the config holds a spread or a computed key";
  return test.initializer;
}
/** How the census tier collects the run pin: the tier's vitest argv and its config's test.include, or what differs. */
function runPinCollection(runPin: string, argv: readonly string[] | string, readConfig: (file: string) => string | undefined): string {
  if (typeof argv === "string") return `<the ${CENSUS_TIER} tier does not resolve: ${argv}>`;
  const [verb, flag, file, ...rest] = argv;
  if (verb !== "run" || flag !== "--config" || file === undefined || rest.length > 0) return `<the ${CENSUS_TIER} tier runs vitest ${argv.join(" ")}>`;
  const text = readConfig(file);
  if (text === undefined) return `<no ${file}>`;
  const test = configTestBlock(file, text);
  if (typeof test === "string") return `<${file}: ${test}>`;
  if (test.properties.some(property => ts.isSpreadAssignment(property) || (property.name !== undefined && ts.isComputedPropertyName(property.name)))) return `<${file}: its test block holds a spread or a computed key>`;
  const key = (name: string): ts.ObjectLiteralElementLike[] => test.properties.filter(property => property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === name);
  if (key("exclude").length > 0) return `<${file}: its test block holds an exclude>`;
  const includes = key("include");
  const [include] = includes;
  const elements = include !== undefined && ts.isPropertyAssignment(include) && ts.isArrayLiteralExpression(include.initializer) ? include.initializer.elements : undefined;
  const globs = elements?.filter(ts.isStringLiteral).map(element => element.text) ?? [];
  if (includes.length !== 1 || elements === undefined || globs.length !== elements.length) return `<${file}: its test block holds no one include array of string literals>`;
  if (!globs.some(glob => globMatches(glob, runPin))) return `<${file}: its test.include ${JSON.stringify(globs)} does not match ${runPin}>`;
  return `the ${CENSUS_TIER} tier runs vitest run --config ${file}, whose test.include ${JSON.stringify(globs)} matches it and whose test block holds no exclude`;
}
function runPinReading(runPin: string, bytes: Buffer | undefined, argv: readonly string[] | string, readConfig: (file: string) => string | undefined): string {
  if (bytes === undefined) return `<no file ${runPin}>`;
  return `${runPin} sha256_16 ${digest16(bytes)}: ${runPinCollection(runPin, argv, readConfig)}`;
}
const readRepoFile = (file: string): string | undefined => (existsSync(join(ROOT, file)) ? readFileSync(join(ROOT, file), "utf8") : undefined);
function censusArgv(): readonly string[] | string {
  const tier = resolveTier(ROOT, CENSUS_TIER);
  return tier.ok ? tier.argv : tier.why;
}
const runPinWitness = (): string => runPinReading(RUN_PIN, existsSync(join(ROOT, RUN_PIN)) ? readFileSync(join(ROOT, RUN_PIN)) : undefined, censusArgv(), readRepoFile);

/** T: what each SDK declaration that names SDK_REPRESENTATION does with the tag. */
const T_SITES: Readonly<Record<string, { readonly requirement: string; readonly witness: () => string }>> = {
  SDK_REPRESENTATION: { requirement: "the vendored SDK exports its representation tag", witness: () => SDK_REPRESENTATION },
  resultToJson: { requirement: "the vendored SDK serialiser stamps the tag on a decoded result", witness: () => String(resultToJson(resultFromJson(sdkDocument())).representation) },
  resultFromJson: {
    requirement: "the vendored SDK decoder refuses a document under the tag's successor",
    witness: () => refusal(() => resultFromJson(sdkDocument(successor(SDK_REPRESENTATION)))),
  },
};
/** X: each SURFACES src file's consumer of the registered provider's output. */
const X_CONSUMERS: Readonly<Record<string, { readonly requirement: string; readonly witness: () => Promise<string> }>> = {
  "src/workbench/hyperunix-observer.ts": {
    requirement: "the reader adapter projects the registered provider's output",
    witness: async () => hyperunixTopology(await providerOutput(), CONTEXT).snapshots.map(snapshot => `${snapshot.kind}|${snapshot.coverage}|${snapshot.node.statusTone}`).join("; "),
  },
  "src/workbench/native-evidence.ts": {
    requirement: "native-evidence projects the registered provider's output as HyperUnix evidence",
    witness: async () => JSON.stringify(nativeEvidence("hyperunix.find", await providerOutput())),
  },
  "src/workbench/providers/hyperunix.ts": {
    requirement: "the registered hyperunix.find provider returns the SDK-stamped output under its contract",
    witness: async () => {
      const output = jsonRecord(await providerOutput());
      return `${String(output?.contract)}|${String(jsonRecord(output?.source)?.representation)}`;
    },
  },
};
/** C: the role each SURFACES src file plays for the representation tag. */
const CARRIER_ROLES: Readonly<Record<string, string>> = {
  "src/workbench/hyperunix-observer.ts": "carrier",
  "src/workbench/native-evidence.ts": "asserted exclusion (S4 refuses an HX import here; H7 pins the observer's four imports)",
  "src/workbench/providers/hyperunix.ts": "no tag (the source is resultToJson's output, stamped by the SDK)",
};
/** Which judged row answers each clause of the owner filing, or PARKED for the external remainder. */
const CLAUSE_ROWS: Readonly<Record<string, RowId | "PARKED">> = {
  "statement.1": "T", "statement.2": "X", "statement.3": "R", "acceptance.1": "S", "acceptance.2.1": "PARKED", "acceptance.2.2": "C", "acceptance.2.3": "PARKED",
};

const missing = (what: string): Promise<string> => Promise.resolve(`<no entry for ${what}>`);
const ROWS: readonly Row[] = [
  { id: "T", clause: "statement.1", pins: sdkTagSites().map(site => ({
    id: `T ${site}`, requirement: T_SITES[site]?.requirement ?? "<none>",
    witness: () => { const entry = T_SITES[site]; return entry === undefined ? missing(site) : Promise.resolve(entry.witness()); },
  })) },
  { id: "X", clause: "statement.2", pins: FILING.srcSurfaces.map(file => ({
    id: `X ${file}`, requirement: X_CONSUMERS[file]?.requirement ?? "<none>", witness: () => X_CONSUMERS[file]?.witness() ?? missing(file),
  })) },
  { id: "R", clause: "statement.3", pins: FILING.families.map(family => ({
    id: `R ${family}`,
    requirement: `the accepted ${family} tag is accepted; its predecessor, digit extension, zero-padded spelling, truncation, upper-cased spelling and ` +
      "leading- and trailing-space spellings are refused as validation with no evidence",
    witness: async () => {
      const accepted = FAMILY_TAGS[family];
      if (accepted === undefined) return missing(family);
      const neighbours = [predecessor, extension, zeroPadded, truncated, upperCased, leadingSpace, trailingSpace].map(neighbour => neighbour(accepted));
      return (await Promise.all([accepted, ...neighbours].map(tag => probe(family, tag)))).join("; ");
    },
  })) },
  { id: "S", clause: "acceptance.1", pins: [
    ...FILING.standingTags.map(tag => ({
      id: `S ${tag}`, requirement: "the standing tag succeeds its family's accepted tag and is refused as validation with no evidence",
      witness: async () => {
        const family = familyOf(tag);
        const accepted = family === undefined ? undefined : FAMILY_TAGS[family];
        if (family === undefined || accepted === undefined) return missing(tag);
        return `${family}: successor of ${accepted} ${successor(accepted) === tag}; ${await probe(family, tag)}`;
      },
    })),
    ...FILING.standingFixtures.map(file => ({
      id: `S ${file}`,
      requirement: "the cited suite's text holds the cited case in each binding surface the file pin claims, one section each, every name bound by scope and position",
      witness: () => Promise.resolve(citedFixture(file, readFileSync(join(ROOT, file), "utf8"), FILING.standingTags, FILING.standingFixtures).join("; ")),
    })),
    ...FILING.standingFixtures.map(file => ({
      id: `S ${file} run pin`,
      requirement: "the census tier collects the run pin that judges the cited case's registration in the gate's own test report, and the run pin's bytes are the ones measured at the cut",
      witness: () => Promise.resolve(runPinWitness()),
    })),
  ] },
  { id: "C", clause: "acceptance.2.2", pins: [
    ...FILING.srcSurfaces.map(file => ({
      id: `C ${file}`, requirement: "the file's representation-tag spellings and its role",
      witness: () => Promise.resolve(`${CARRIER_ROLES[file] ?? "<no role>"}: ${srcTagSites().filter(site => site.file === file).map(describeSite).join("; ") || "no site"}`),
    })),
    {
      id: "C src", requirement: "no representation-tag spelling outside the filing's surfaces",
      witness: () => Promise.resolve(srcTagSites().filter(site => !FILING.srcSurfaces.includes(site.file)).map(site => `${site.file} ${describeSite(site)}`).join("; ") || "no site"),
    },
  ] },
];
const PINS: readonly Pin[] = ROWS.flatMap(row => row.pins);

/** Every pin's frozen line: id | requirement | the witness measured from the subject. */
const PIN_LINES: readonly string[] = [
  "T SDK_REPRESENTATION | the vendored SDK exports its representation tag | hyperunix.result/1",
  "T resultToJson | the vendored SDK serialiser stamps the tag on a decoded result | hyperunix.result/1",
  "T resultFromJson | the vendored SDK decoder refuses a document under the tag's successor | TypeError: not a hyperunix.result/1 document",
  "X src/workbench/hyperunix-observer.ts | the reader adapter projects the registered provider's output | hyperunix.query.snapshot|partial|unknown",
  "X src/workbench/native-evidence.ts | native-evidence projects the registered provider's output as HyperUnix evidence | {\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}",
  "X src/workbench/providers/hyperunix.ts | the registered hyperunix.find provider returns the SDK-stamped output under its contract | hyperunix.find/v1|hyperunix.result/1",
  "R contract | the accepted contract tag is accepted; its predecessor, digit extension, zero-padded spelling, truncation, upper-cased spelling " +
    "and leading- and trailing-space spellings are refused as validation with no evidence | " +
    "hyperunix.find/v1|accepted(1)|{\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}; hyperunix.find/v0|validation|{}; " +
    "hyperunix.find/v10|validation|{}; hyperunix.find/v01|validation|{}; hyperunix.find/v|validation|{}; HYPERUNIX.FIND/V1|validation|{}; \" " +
    "hyperunix.find/v1\"|validation|{}; \"hyperunix.find/v1 \"|validation|{}",
  "R representation | the accepted representation tag is accepted; its predecessor, digit extension, zero-padded spelling, truncation, " +
    "upper-cased spelling and leading- and trailing-space spellings are refused as validation with no evidence | " +
    "hyperunix.result/1|accepted(1)|{\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}|decoded; " +
    "hyperunix.result/0|validation|{}|decoder-refused; hyperunix.result/10|validation|{}|decoder-refused; " +
    "hyperunix.result/01|validation|{}|decoder-refused; hyperunix.result/|validation|{}|decoder-refused; " +
    "HYPERUNIX.RESULT/1|validation|{}|decoder-refused; \" hyperunix.result/1\"|validation|{}|decoder-refused; \"hyperunix.result/1 " +
    "\"|validation|{}|decoder-refused",
  "S hyperunix.find/v2 | the standing tag succeeds its family's accepted tag and is refused as validation with no evidence | " +
    "contract: successor of hyperunix.find/v1 true; hyperunix.find/v2|validation|{}",
  "S hyperunix.result/2 | the standing tag succeeds its family's accepted tag and is refused as validation with no evidence | " +
    "representation: successor of hyperunix.result/1 true; hyperunix.result/2|validation|{}|decoder-refused",
  "S test/workbench-hyperunix-observer.test.ts | the cited suite's text holds the cited case in each binding surface the file pin claims, one " +
    "section each, every name bound by scope and position | FILE test/workbench-hyperunix-observer.test.ts: the one suite the Standing item " +
    "cites, read by that path; IMPORT describe, it: unaliased value imports of the one vitest import; no other vitest module specifier, import(), " +
    "require, createRequire, importActual or importMock; REFERENCES every reference to a vitest value import is a call or the object of a member " +
    "call; ACCESS no eval: every read of a table is one the checker binds; CALL 'H5: refuses %s with a typed validation error and no snapshot': " +
    "it.each(refusals)(title, arrow function), the one .each call carrying a standing row, its path and title unique; PATH HyperUnix " +
    "hyperunix.find reader adapter: every enclosing block is a plain two-argument vitest describe callback holding no return of its own; CALLBACK " +
    "sha256_16 3432302a94aedb5f; TABLE refusals: one const declaration of an array literal with no spread or hole, not redeclared, read only as " +
    "this call's table; ROWS 'contract hyperunix.find/v2' & 'representation hyperunix.result/2': one two-element row each; POSITION contract " +
    "hyperunix.find/v2 {...measured(), contract: 'hyperunix.find/v2'} & representation hyperunix.result/2 measured({representation: " +
    "'hyperunix.result/2'}); HELPER measured: one top-level function declaration, every reference a call; (source = {}, top = {}) returns " +
    "{contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1', ..., ...source}, ..., ...top}; sha256_16 05325573944ccc40",
  "S test/workbench-hyperunix-observer.test.ts run pin | the census tier collects the run pin that judges the cited case's registration in the " +
    "gate's own test report, and the run pin's bytes are the ones measured at the cut | test/workbench-hyperunix-successor-gate-run-pin.census.ts " +
    "sha256_16 4287eecead0c1422: the census tier runs vitest run --config vitest.census.config.ts, whose test.include [\"test/**/*.census.ts\"] " +
    "matches it and whose test block holds no exclude",
  "C src/workbench/hyperunix-observer.ts | the file's representation-tag spellings and its role | carrier: whole hyperunix.result/1 @ const REPRESENTATION",
  "C src/workbench/native-evidence.ts | the file's representation-tag spellings and its role | " +
    "asserted exclusion (S4 refuses an HX import here; H7 pins the observer's four imports): whole hyperunix.result/1 @ !== source.representation",
  "C src/workbench/providers/hyperunix.ts | the file's representation-tag spellings and its role | " +
    "no tag (the source is resultToJson's output, stamped by the SDK): no site",
  "C src | no representation-tag spelling outside the filing's surfaces | no site",
];
const FROZEN = new Map(PIN_LINES.map(line => [line.split(" | ")[0] ?? "", line]));

// ---- S SURFACES: per binding surface, falsifiers that each change its section and a control that keeps the whole reading ----

const PLANTED = "test/planted.test.ts";
const PLANTED_IMPORT = "import {describe, it} from 'vitest';";
const PLANTED_CALL = "  it.each(rows)('refuses %s', (_name, value) => { check(value); });";
const CONTRACT_ROW = "    ['contract hyperunix.find/v2', {...measured(), contract: 'hyperunix.find/v2'}],";
const REPRESENTATION_ROW = "    ['representation hyperunix.result/2', measured({representation: 'hyperunix.result/2'})],";
/** The planted suite every S SURFACE probe edits: the cited suite's shape in miniature. */
const PLANTED_BASE = [
  PLANTED_IMPORT,
  "function measured(source = {}, top = {}) {",
  "  return {contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1', kind: 'incomplete', ...source}, runtime: '0.1.0', ...top};",
  "}",
  "describe('suite', () => {",
  "  const rows = [",
  CONTRACT_ROW,
  REPRESENTATION_ROW,
  "    ['a null reading', null],",
  "  ];",
  PLANTED_CALL,
  "});",
  "",
].join("\n");
/** A same-name table in another scope that carries both standing names (the G16 decoy). */
const DECOY = "const rows = [['contract hyperunix.find/v2', null], ['representation hyperunix.result/2', null]];";
/** `text` with `old` replaced by `next`; `old` must occur exactly once, so a probe whose edit misses is never read as the base. */
function edited(text: string, old: string, next: string): string {
  const count = text.split(old).length - 1;
  if (count !== 1) throw new Error(`a planted edit's old text occurs ${count} times: ${old}`);
  return text.replace(old, () => next);
}
const onCall = (lines: string): string => edited(PLANTED_BASE, PLANTED_CALL, lines);
const decoyDescribe = `describe('decoy', () => {\n  ${DECOY}\n  it('holds two rows', () => { check(rows); });\n});\n`;
/** A describe modifier, spelled through a helper so this file carries no skip or focus marker of its own. */
const modified = (modifier: string): string => `describe.${modifier}`;
const plantedReading = (text: string, cited: readonly string[] = [PLANTED]): readonly string[] => citedFixture(PLANTED, text, FILING.standingTags, cited);

const RUN_CONFIG_FILE = "vitest.census.config.ts";
const RUN_ARGV: readonly string[] = ["run", "--config", RUN_CONFIG_FILE];
const RUN_BYTES = Buffer.from("planted run pin");
const runConfig = (test: string): string => `import { defineConfig } from "vitest/config";\nexport default defineConfig({ test: ${test} });\n`;
const RUN_BASE_CONFIG = runConfig('{ include: ["test/**/*.census.ts"], allowOnly: false }');
/** The run pin reading over a planted config, argv and bytes ("missing" for a run pin that is not on disk). */
const plantedRun = (config: string | undefined, argv: readonly string[] | string = RUN_ARGV, bytes: Buffer | "missing" = RUN_BYTES): readonly string[] =>
  [runPinReading(RUN_PIN, bytes === "missing" ? undefined : bytes, argv, file => (file === RUN_CONFIG_FILE ? config : undefined))];

interface Probe {
  readonly name: string;
  /** A falsifier's attribution: the break reason its surface's section must name, or "" for a change-only falsifier (a sound reading of
   * another subject, such as a digest); a control's is "". */
  readonly reason: string;
  readonly reading: () => readonly string[];
}
interface Surface {
  readonly id: string;
  readonly falsifiers: readonly Probe[];
  readonly control: Probe;
}
const planted = (name: string, reason: string, text: () => string, cited?: readonly string[]): Probe => ({ name, reason, reading: () => plantedReading(text(), cited) });
const run = (name: string, reason: string, reading: () => readonly string[]): Probe => ({ name, reason, reading });

/** One row per binding surface of the S file pin, in section order, and the run pin last. */
const SURFACES: readonly Surface[] = [
  { id: "FILE", falsifiers: [
    planted("a second suite cited", "the Standing item cites 2 suites", () => PLANTED_BASE, [PLANTED, "test/other.test.ts"]),
    planted("another suite cited", "the Standing item cites 1 suites (test/other.test.ts)", () => PLANTED_BASE, ["test/other.test.ts"]),
  ], control: planted("a comment added", "", () => `${PLANTED_BASE}// a comment\n`) },
  { id: "IMPORT", falsifiers: [
    planted("a namespace import of vitest beside it", "2 import declarations from vitest", () => edited(PLANTED_BASE, PLANTED_IMPORT, `${PLANTED_IMPORT}\nimport * as vitest from 'vitest';`)),
    planted("the runner module imported", "a module reached another way: '@vitest/runner'", () => edited(PLANTED_BASE, PLANTED_IMPORT, `${PLANTED_IMPORT}\nimport {test} from '@vitest/runner';`)),
    planted("it imported under an alias", "binds no unaliased value it", () => edited(PLANTED_BASE, PLANTED_IMPORT, "import {describe, it as each} from 'vitest';\nconst it = each;")),
    planted("a dynamic import", "a module reached another way: import()", () => onCall(`  const loaded = import('node:path');\n${PLANTED_CALL}`)),
    planted("a vi loader", "a module reached another way: .importActual", () => onCall(`  const loaded = vi.importActual(name);\n${PLANTED_CALL}`)),
    planted("require", "a module reached another way: require", () => onCall(`  const loaded = require(name);\n${PLANTED_CALL}`)),
  ], control: planted("another vitest specifier imported", "", () => edited(PLANTED_BASE, PLANTED_IMPORT, "import {describe, expect, it} from 'vitest';")) },
  { id: "REFERENCES", falsifiers: [
    planted("it.each replaced around the call (GA5)", "it.each at line 12 in a BinaryExpression", () => onCall(`  const realEach = it.each;\n  it.each = (() => () => undefined) as unknown as typeof it.each;\n${PLANTED_CALL}\n  it.each = realEach;`)),
    planted("it passed as an argument", "it at line 11 in a CallExpression", () => onCall(`  Object.assign(it, {extra: 1});\n${PLANTED_CALL}`)),
    planted("describe read as a value", "describe at line 11 in a VariableDeclaration", () => onCall(`  const group = describe;\n${PLANTED_CALL}`)),
  ], control: planted("another case registered", "", () => onCall(`${PLANTED_CALL}\n  it('another case', () => { check(null); });`)) },
  { id: "ACCESS", falsifiers: [
    planted("the rows spliced through eval (GA6)", "eval at line 11", () => onCall(`  eval('rows.splice(0, 2)');\n${PLANTED_CALL}`)),
  ], control: planted("eval named in a title only", "", () => onCall(`${PLANTED_CALL}\n  it('never calls eval', () => { check(null); });`)) },
  { id: "CALL", falsifiers: [
    planted("it shadowed in the describe (V4)", ".each is read on it, not the suite's vitest it", () => edited(PLANTED_BASE, "  const rows = [", "  const it = {each: (table: unknown) => (title: string, run: unknown) => undefined};\n  const rows = [")),
    planted("options before the callback", "the case call takes 3 argument(s)", () => onCall("  it.each(rows)('refuses %s', {skip: true}, (_name, value) => { check(value); });")),
    planted("a second table argument", "it.each takes 2 argument(s)", () => onCall("  it.each(rows, 1)('refuses %s', (_name, value) => { check(value); });")),
    planted("a timeout after the callback", "the case call takes 3 argument(s)", () => onCall("  it.each(rows)('refuses %s', (_name, value) => { check(value); }, 5000);")),
    planted("a same-path, same-title twin (V10)", "its path and title are shared with the it.each call at line 12", () => onCall(`${PLANTED_CALL}\n  it.each([['a', 1]])('refuses %s', () => { check(null); });`)),
    planted("a second call carrying a standing row", "2 .each calls carry rows named for a standing tag", () => onCall(`${PLANTED_CALL}\n  it.each([['contract hyperunix.find/v2', null]])('again %s', () => { check(null); });`)),
    planted("the rows deleted and a decoy table in another scope (G16)", "no .each call carries a row named for a standing tag", () =>
      `${edited(edited(PLANTED_BASE, `${CONTRACT_ROW}\n`, ""), `${REPRESENTATION_ROW}\n`, "")}${decoyDescribe}`),
  ], control: planted("another .each call with no standing row", "", () => onCall(`${PLANTED_CALL}\n  it.each([['a', 1]])('other %s', () => { check(null); });`)) },
  { id: "PATH", falsifiers: [
    planted("a skipped describe (G13)", "registered under describe.skip", () => edited(PLANTED_BASE, "describe('suite',", `${modified("skip")}('suite',`)),
    planted("a conditionally skipped describe (G13b)", "registered under describe.skipIf(true)", () => edited(PLANTED_BASE, "describe('suite',", `${modified("skipIf")}(true)('suite',`)),
    planted("a conditional registration (V7)", "registered inside a block that is not a describe callback", () => onCall(`  if (enabled) {\n  ${PLANTED_CALL}\n  }`)),
    planted("options as the describe's second argument", "registered under a describe call of 3 arguments", () => edited(PLANTED_BASE, "describe('suite', () => {", "describe('suite', {skip: true}, () => {")),
    planted("an early return of the describe callback", "a return of the describe callback 'suite' at line 6", () => edited(PLANTED_BASE, "  const rows = [", "  if (disabled) return;\n  const rows = [")),
    planted("the call inside a helper function", "registered inside a block that is not a describe callback", () => onCall(`  register();\n  function register() {\n  ${PLANTED_CALL}\n  }`)),
  ], control: planted("a sibling describe", "", () => `${PLANTED_BASE}describe('other', () => {\n  it('runs', () => { check(1); });\n});\n`) },
  { id: "CALLBACK", falsifiers: [
    planted("the callback returns before it asserts (G14)", "", () => onCall("  it.each(rows)('refuses %s', (_name, value) => { return; check(value); });")),
    planted("the callback's parameter renamed", "", () => onCall("  it.each(rows)('refuses %s', (_name, reading) => { check(reading); });")),
  ], control: planted("a statement after the call", "", () => onCall(`${PLANTED_CALL}\n  const after = 1;`)) },
  { id: "TABLE", falsifiers: [
    planted("var redeclared in the same scope (V2)", "rows: 2 declarations", () => edited(edited(PLANTED_BASE, "  const rows = [", "  var rows = ["), PLANTED_CALL, `  var rows = [];\n${PLANTED_CALL}`)),
    planted("spliced before the call (V3)", "rows also referenced at line 11", () => onCall(`  rows.splice(0, 2);\n${PLANTED_CALL}`)),
    planted("an element written before the call", "rows also referenced at line 11", () => onCall(`  rows[0] = ['contract hyperunix.find/v2', null];\n${PLANTED_CALL}`)),
    planted("declared with let (V13)", "rows is not a const declaration", () => edited(PLANTED_BASE, "  const rows = [", "  let rows = [")),
    planted("const redeclared after the table (V17)", "rows redeclared in its scope at line 6, 11", () => onCall(`  const rows = [];\n${PLANTED_CALL}`)),
    planted("rows through a spread element", "rows holds a spread element", () => edited(PLANTED_BASE, "    ['a null reading', null],", "    ...extra,")),
  ], control: planted("a same-name table in another scope (G16b)", "", () => `${PLANTED_BASE}${decoyDescribe}`) },
  { id: "ROWS", falsifiers: [
    planted("the contract row deleted (G16c)", "hyperunix.find/v2: 0 rows", () => edited(PLANTED_BASE, `${CONTRACT_ROW}\n`, "")),
    planted("the contract row twice", "hyperunix.find/v2: 2 rows", () => edited(PLANTED_BASE, CONTRACT_ROW, `${CONTRACT_ROW}\n${CONTRACT_ROW}`)),
    planted("a three-element row", "hyperunix.find/v2: not a two-element array literal", () => edited(PLANTED_BASE, "contract: 'hyperunix.find/v2'}],", "contract: 'hyperunix.find/v2'}, 'extra'],")),
    planted("the row named with a prefix", "hyperunix.find/v2: named 'a contract hyperunix.find/v2'", () => edited(PLANTED_BASE, "['contract hyperunix.find/v2',", "['a contract hyperunix.find/v2',")),
  ], control: planted("another row added", "", () => edited(PLANTED_BASE, "    ['a null reading', null],", "    ['a null reading', null],\n    ['a string reading', 'hyperunix.find/v1'],")) },
  { id: "POSITION", falsifiers: [
    planted("a dead nested contract beside another refusal cause (GA1)", "contract hyperunix.find/v2: its first property is not a spread of a zero-argument helper call", () => edited(PLANTED_BASE, "{...measured(), contract: 'hyperunix.find/v2'}", "{...measured({kind: 'done'}), meta: {contract: 'hyperunix.find/v2'}}")),
    planted("a dead nested representation (GA2)", "representation hyperunix.result/2: its argument is not an object literal of one property", () => edited(PLANTED_BASE, "measured({representation: 'hyperunix.result/2'})", "measured({kind: 'done', meta: {representation: 'hyperunix.result/2'}})")),
    planted("a computed contract key beside a dead one (GA3)", "contract hyperunix.find/v2: an object literal of 3 properties", () =>
      edited(PLANTED_BASE, "{...measured(), contract: 'hyperunix.find/v2'}", "{...measured(), ['contract']: 'hyperunix.find/v9', meta: {contract: 'hyperunix.find/v2'}}")),
    planted("a computed representation key beside a dead one (GA4)", "representation hyperunix.result/2: its argument is not an object literal of one property", () =>
      edited(PLANTED_BASE, "measured({representation: 'hyperunix.result/2'})", "measured({['representation']: 'hyperunix.result/9', meta: {representation: 'hyperunix.result/2'}})")),
    planted("the representation at the top level (GA4x)", "representation hyperunix.result/2: a helper call of 2 arguments", () =>
      edited(PLANTED_BASE, "measured({representation: 'hyperunix.result/2'})", "measured({}, {contract: 'hyperunix.find/v9', representation: 'hyperunix.result/2'})")),
    planted("a label-only contract row (V8)", "contract hyperunix.find/v2: the reading is not an object literal", () => edited(PLANTED_BASE, "{...measured(), contract: 'hyperunix.find/v2'}", "null")),
    planted("the contract set to another tag (V9)", "contract is set to 'hyperunix.find/v3'", () => edited(PLANTED_BASE, "contract: 'hyperunix.find/v2'}", "contract: 'hyperunix.find/v3'}")),
    planted("a string-literal contract key", "its second property is not an identifier-keyed contract property", () => edited(PLANTED_BASE, "contract: 'hyperunix.find/v2'}", "'contract': 'hyperunix.find/v2'}")),
    planted("the contract through a shorthand", "its second property is not an identifier-keyed contract property", () => edited(PLANTED_BASE, "{...measured(), contract: 'hyperunix.find/v2'}", "{...measured(), contract}")),
    planted("the contract before the spread", "its first property is not a spread of a zero-argument helper call", () => edited(PLANTED_BASE, "{...measured(), contract: 'hyperunix.find/v2'}", "{contract: 'hyperunix.find/v2', ...measured()}")),
  ], control: planted("a non-standing row in a free form", "", () => edited(PLANTED_BASE, "    ['a null reading', null],", "    ['a null reading', null],\n    ['a done kind', measured({kind: 'done'}, {extra: 1})],")) },
  { id: "HELPER", falsifiers: [
    planted("the helper shadowed in the describe", "measured is not one top-level function declaration", () => edited(PLANTED_BASE, "  const rows = [",
      "  const measured = (source = {}, top = {}) => ({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1', ...source}, ...top});\n  const rows = [")),
    planted("the helper reassigned", "measured referenced other than as a call at line 11", () => onCall(`  measured = () => ({});\n${PLANTED_CALL}`)),
    planted("source spread first", "source does not end with ...source as its only spread", () => edited(PLANTED_BASE, "source: {representation: 'hyperunix.result/1', kind: 'incomplete', ...source}", "source: {...source, representation: 'hyperunix.result/1', kind: 'incomplete'}")),
    planted("top defaulting to a source", "top does not default to {}", () => edited(PLANTED_BASE, "top = {}", "top = {source: {}}")),
    planted("a second spread before top", "the returned object does not end with ...top as its only spread", () => edited(PLANTED_BASE, "runtime: '0.1.0', ...top}", "...defaults, runtime: '0.1.0', ...top}")),
    planted("the default contract changed", "its contract literal 'hyperunix.find/v9' is not the accepted contract tag hyperunix.find/v1", () => edited(PLANTED_BASE, "{contract: 'hyperunix.find/v1', source", "{contract: 'hyperunix.find/v9', source")),
    planted("a body edit", "", () => edited(PLANTED_BASE, "runtime: '0.1.0'", "runtime: '0.2.0'")),
  ], control: planted("another helper call elsewhere", "", () => onCall(`${PLANTED_CALL}\n  it('reads the helper', () => { check(measured({kind: 'done'})); });`)) },
  { id: "RUN", falsifiers: [
    run("the run pin excluded", "its test block holds an exclude", () => plantedRun(runConfig(`{ include: ["test/**/*.census.ts"], exclude: ["${RUN_PIN}"] }`))),
    run("the include moved elsewhere", "does not match test/workbench-hyperunix-successor-gate-run-pin.census.ts", () => plantedRun(runConfig('{ include: ["test/other/**/*.census.ts"] }'))),
    run("only a same-name coverage include", "its test block holds no one include array of string literals", () => plantedRun(runConfig('{ coverage: { include: ["test/**/*.census.ts"] } }'))),
    run("the test block spread", "its test block holds a spread or a computed key", () => plantedRun(runConfig('{ ...shared, include: ["test/**/*.census.ts"] }'))),
    run("a file filter on the tier command", "the census tier runs vitest run --config vitest.census.config.ts test/other.census.ts", () => plantedRun(RUN_BASE_CONFIG, [...RUN_ARGV, "test/other.census.ts"])),
    run("the tier unresolved", "the census tier does not resolve", () => plantedRun(RUN_BASE_CONFIG, `forge.toml declares no command ${CENSUS_TIER}`)),
    run("the run pin missing", "no file test/workbench-hyperunix-successor-gate-run-pin.census.ts", () => plantedRun(RUN_BASE_CONFIG, RUN_ARGV, "missing")),
    run("the run pin edited", "", () => plantedRun(RUN_BASE_CONFIG, RUN_ARGV, Buffer.from("planted run pin, edited"))),
  ], control: run("another test option", "", () => plantedRun(runConfig('{ include: ["test/**/*.census.ts"], allowOnly: false, testTimeout: 1 }'))) },
];
const surfaceBase = (id: string): readonly string[] => (id === "RUN" ? plantedRun(RUN_BASE_CONFIG) : plantedReading(PLANTED_BASE));
const sectionOf = (id: string, reading: readonly string[]): string | undefined => (id === "RUN" ? reading[0] : reading.find(section => section.split(" ")[0] === id));
/** Whether a surface's section reads as a break: `<SURFACE> <why>`, or for the run pin a reading that holds `<why>`. */
const isBreak = (id: string, section: string): boolean => (id === "RUN" ? section.startsWith("<") || section.includes(": <") : section.startsWith(`${id} <`));

// ---- RESIDUALS: each named family's quiet rows, anchored outside this file ----

interface Residual {
  readonly family: string;
  readonly row: RowId;
  readonly quietRows: readonly string[];
}
const RESIDUALS: readonly Residual[] = [{ family: "R-RUNTIME", row: "S", quietRows: ["every", "forEach"] }];
/** The methods the installed vitest runner's it.each calls on its table, in source order: createTaskCollector's each in @vitest/runner's dist. */
function runnerTableMethods(): string[] {
  const sites: string[][] = [];
  for (const name of readdirSync(RUNNER_DIST).filter(file => file.endsWith(".js")).sort()) {
    const visit = (node: ts.Node, inCollector: boolean): void => {
      const collector = inCollector || (ts.isFunctionDeclaration(node) && node.name?.text === "createTaskCollector");
      if (collector && ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(node.left) &&
        node.left.name.text === "each" && ts.isFunctionExpression(node.right)) {
        const [table] = node.right.parameters;
        const methods: string[] = [];
        const scan = (inner: ts.Node): void => {
          if (table !== undefined && ts.isIdentifier(table.name) && ts.isPropertyAccessExpression(inner) && ts.isIdentifier(inner.expression) &&
            inner.expression.text === table.name.text && ts.isCallExpression(inner.parent) && inner.parent.expression === inner && !methods.includes(inner.name.text)) {
            methods.push(inner.name.text);
          }
          ts.forEachChild(inner, scan);
        };
        scan(node.right.body);
        sites.push(methods);
      }
      ts.forEachChild(node, child => visit(child, collector));
    };
    visit(parse(join(RUNNER_DIST, name), ts.ScriptKind.JS), false);
  }
  const [only] = sites;
  return sites.length === 1 && only !== undefined ? only : [`<${sites.length} it.each sites in ${relative(ROOT, RUNNER_DIST)}>`];
}
/** An R-RUNTIME quiet row: the planted suite patching one Array.prototype method around the call to rewrite a row in flight. */
const runtimePayload = (method: string): string => onCall([
  `  const real = Array.prototype.${method};`,
  `  Array.prototype.${method} = function (this: unknown[], ...args: never[]) { rewrite(this); return real.apply(this, args); } as typeof real;`,
  PLANTED_CALL,
  `  Array.prototype.${method} = real;`,
].join("\n"));
/** R-RUNTIME's mode reading: the methods a suite assigns on Array.prototype, in source order. */
function runtimeMode(text: string): string[] {
  const source = ts.createSourceFile(PLANTED, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const methods: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(node.left) &&
      ts.isPropertyAccessExpression(node.left.expression) && node.left.expression.getText(source) === "Array.prototype" && !methods.includes(node.left.name.text)) {
      methods.push(node.left.name.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return methods;
}
/** R-RUNTIME's loud payload: the same in-flight rewrite through the table binding, which TABLE reads. */
const RUNTIME_LOUD = onCall(`  rows[0] = rewrite(rows[0]);\n${PLANTED_CALL}`);

describe("HyperUnix result-representation successor gate (wb-tz2.3 R3, standing leg and re-vendor tripwire)", () => {
  it("FROZEN SHAPE (standing rule 16): the rows, every clause's row and every pin's id are their frozen literals", () => {
    expect(ROWS.map(row => `${row.id}:${row.clause}:${row.pins.length}`)).toEqual([
      "T:statement.1:3", "X:statement.2:3", "R:statement.3:2", "S:acceptance.1:4", "C:acceptance.2.2:4",
    ]);
    expect([...FILING.clauses.keys()].map(key => `${key}>${CLAUSE_ROWS[key] ?? "<unmapped>"}`)).toEqual([
      "statement.1>T", "statement.2>X", "statement.3>R", "acceptance.1>S", "acceptance.2.1>PARKED", "acceptance.2.2>C", "acceptance.2.3>PARKED",
    ]);
    expect(PINS.map(pin => pin.id)).toEqual(PIN_LINES.map(line => line.split(" | ")[0]));
    expect(FROZEN.size).toBe(PIN_LINES.length);
  });

  it("CLAUSES: every clause of the owner filing maps to one row or to PARKED, and every row answers exactly one clause", () => {
    const keys = [...FILING.clauses.keys()];
    expect(keys.filter(key => (FILING.clauses.get(key) ?? "").trim() === "")).toEqual([]);
    expect(Object.keys(CLAUSE_ROWS)).toEqual(keys);
    const answered = keys.filter(key => CLAUSE_ROWS[key] !== "PARKED");
    expect(ROWS.map(row => row.clause)).toEqual(answered);
    expect(answered.map(key => CLAUSE_ROWS[key])).toEqual(ROWS.map(row => row.id));
    for (const row of ROWS) expect(row.pins.length, row.id).toBeGreaterThan(0);
  });

  it("FILING COUNTS: the export holds one wb-tz2.3 row, and its description one STATEMENT, ACCEPTANCE and SURFACES line and one Standing item", () => {
    expect(FILING.counts).toEqual({ rows: 1, STATEMENT: 1, ACCEPTANCE: 1, SURFACES: 1, Standing: 1 });
    // A second row, a repeated heading line and a second Standing item are what the counts would then show.
    const [description = ""] = FILING_ROWS;
    const repeated = description.replace(/^(?:STATEMENT|ACCEPTANCE|SURFACES): .*$/gm, line => `${line}\n${line}`);
    expect(readFiling([description, description]).counts).toEqual({ rows: 2, STATEMENT: 1, ACCEPTANCE: 1, SURFACES: 1, Standing: 1 });
    expect(readFiling([repeated]).counts).toEqual({ rows: 1, STATEMENT: 2, ACCEPTANCE: 2, SURFACES: 2, Standing: 1 });
    expect(readFiling([description.replace('["Standing: ', '["Standing: a second item.", "Standing: ')]).counts.Standing).toBe(2);
    // Every export row is decoded, so an id spelled with a JSON escape is the same id; a row with another id is not.
    const escaped = JSON.stringify({ id: BEAD, description: "escaped" }).replace(`"${BEAD}"`, `"${BEAD.replace(".", "\\u002e")}"`);
    expect(escaped).not.toContain(`"${BEAD}"`);
    expect(filingRows([JSON.stringify({ id: BEAD, description: "plain" }), escaped, JSON.stringify({ id: `${BEAD}.1`, description: "child" }), ""].join("\n"))).toEqual(["plain", "escaped"]);
  });

  it("ANCHORS: the filing names the two standing tags, their fixture suite, the two families and the three src surfaces", () => {
    expect(FILING.standingTags).toEqual(["hyperunix.find/v2", "hyperunix.result/2"]);
    expect(FILING.standingFixtures).toEqual(["test/workbench-hyperunix-observer.test.ts"]);
    expect(FILING.families).toEqual(Object.keys(FAMILY_TAGS));
    expect(FILING.srcSurfaces).toEqual(Object.keys(X_CONSUMERS));
    expect(FILING.srcSurfaces).toEqual(Object.keys(CARRIER_ROLES));
    expect(sdkTagSites()).toEqual(Object.keys(T_SITES));
  });

  it("PARKED: the two on-landing clauses that need a published successor stay owed, and the trigger row is their re-entry", () => {
    expect([...FILING.clauses].filter(([key]) => CLAUSE_ROWS[key] === "PARKED").map(([key, text]) => `${key}: ${text}`)).toEqual([
      "acceptance.2.1: one re-vendor commit updates tarball bytes + vendor/README.md:9 sha table + package.json:39 together " +
        "(wb-x7m.2 falsifier and wb-cax.20 census green)",
      "acceptance.2.3: the full observer suite re-runs green against the successor",
    ]);
    expect(ROWS[0]?.id).toBe("T");
    expect(FROZEN.get("T SDK_REPRESENTATION")).toBe(`T SDK_REPRESENTATION | the vendored SDK exports its representation tag | ${SDK_REPRESENTATION}`);
  });

  it("T TYPE: the vendored SDK types SDK_REPRESENTATION as the literal it holds, so moving the tag also reds typecheck:test", () => {
    expectTypeOf<typeof SDK_REPRESENTATION>().toEqualTypeOf<"hyperunix.result/1">();
    expect(SDK_REPRESENTATION).toBe("hyperunix.result/1");
  });

  it.each(PINS.map(pin => [pin.id, pin] as const))("PIN %s holds its frozen line", async (_id, pin) => {
    expect(`${pin.id} | ${pin.requirement} | ${await pin.witness()}`).toBe(FROZEN.get(pin.id));
  });

  it("LIVENESS: the suite collected exactly one PIN case per pin, in pin order", ({ task }) => {
    const collected = (task.suite?.tasks ?? []).map(sibling => sibling.name);
    expect(collected).toContain(task.name);
    expect(collected.filter(name => name.startsWith("PIN "))).toEqual(PINS.map(pin => `PIN ${pin.id} holds its frozen line`));
  });

  it("S SURFACES SHAPE: one surface per section the file pin reads of the cited suite, then the run pin, each with its frozen falsifier count", () => {
    expect(SURFACES.map(surface => `${surface.id}:${surface.falsifiers.length}`)).toEqual([
      "FILE:2", "IMPORT:6", "REFERENCES:3", "ACCESS:1", "CALL:7", "PATH:6", "CALLBACK:2", "TABLE:6", "ROWS:4", "POSITION:10", "HELPER:7", "RUN:8",
    ]);
    const [file = ""] = FILING.standingFixtures;
    const sections = citedFixture(file, readFileSync(join(ROOT, file), "utf8"), FILING.standingTags, FILING.standingFixtures).map(section => section.split(" ")[0]);
    expect([...sections, PINS.some(pin => pin.id === `S ${file} run pin`) ? "RUN" : "<no run pin>"]).toEqual(SURFACES.map(surface => surface.id));
  });

  it.each(SURFACES.map(surface => [surface.id, surface] as const))("S SURFACE %s: each falsifier breaks the surface's section naming its reason (or reads it sound and changed), and the control keeps the whole reading", (id, surface) => {
    const base = surfaceBase(id);
    const sound = sectionOf(id, base) ?? "<no section>";
    expect(isBreak(id, sound), `${id} base reads sound: ${sound}`).toBe(false);
    for (const falsifier of surface.falsifiers) {
      const section = sectionOf(id, falsifier.reading()) ?? "<no section>";
      const read = falsifier.reason === "" ? { broken: isBreak(id, section), changed: section !== sound } : { broken: isBreak(id, section), names: section.includes(falsifier.reason) };
      expect(read, `${id} ${falsifier.name}: ${section}`).toEqual(falsifier.reason === "" ? { broken: false, changed: true } : { broken: true, names: true });
    }
    expect(surface.control.reading(), `${id} ${surface.control.name}`).toEqual(base);
  });

  it("RESIDUALS: R-RUNTIME holds one quiet row per method the installed runner's each calls on its table, each read quiet, its mode reading live and its loud payload loud", () => {
    expect(RESIDUALS.map(residual => `${residual.family}:${residual.row}:${residual.quietRows.join(",")}`)).toEqual(["R-RUNTIME:S:every,forEach"]);
    expect(RESIDUALS.find(residual => residual.family === "R-RUNTIME")?.quietRows).toEqual(runnerTableMethods());
    const base = plantedReading(PLANTED_BASE);
    expect(runtimeMode(PLANTED_BASE)).toEqual([]);
    for (const method of RESIDUALS.flatMap(residual => residual.quietRows)) {
      expect(plantedReading(runtimePayload(method)), method).toEqual(base);
      expect(runtimeMode(runtimePayload(method)), method).toEqual([method]);
    }
    expect(sectionOf("TABLE", plantedReading(RUNTIME_LOUD))).toMatch(/^TABLE </);
  });

  it("C COLLECTOR: the scan reads every string-text node kind, whole and embedded, and never a comment or a regular expression", () => {
    const control = [
      'const A = "hyperunix.result/1";',
      "const B = 'hyperunix.result/2';",
      `const C = ${TICK}hyperunix.result/3${TICK};`,
      `const D = ${TICK}hyperunix.result/4 ${slot("A")} hyperunix.result/5 ${slot("B")} hyperunix.result/6${TICK};`,
      'const E = "not a hyperunix.result/7 document";',
      "// hyperunix.result/8 in a comment",
      "const F = /hyperunix\\.result\\/9/;",
      'const G = left !== "hyperunix.result/1";',
    ].join("\n");
    expect(tagSites(new Map([["src/control.ts", control]])).map(describeSite)).toEqual([
      "whole hyperunix.result/1 @ const A",
      "whole hyperunix.result/2 (not the vendored tag) @ const B",
      "whole hyperunix.result/3 (not the vendored tag) @ const C",
      "embedded hyperunix.result/4 (not the vendored tag) @ TemplateHead",
      "embedded hyperunix.result/5 (not the vendored tag) @ TemplateMiddle",
      "embedded hyperunix.result/6 (not the vendored tag) @ TemplateTail",
      "embedded hyperunix.result/7 (not the vendored tag) @ StringLiteral",
      "whole hyperunix.result/1 @ !== left",
    ]);
    // A planted third site and a half-moved re-vendor are what the C pins would then show.
    const planted = new Map([["src/workbench/other.ts", 'export const TAG = "hyperunix.result/1";'], ["src/workbench/native-evidence.ts", 'if (x !== "hyperunix.result/2") {}']]);
    expect(tagSites(planted).map(site => `${site.file} ${describeSite(site)}`)).toEqual([
      "src/workbench/other.ts whole hyperunix.result/1 @ const TAG",
      "src/workbench/native-evidence.ts whole hyperunix.result/2 (not the vendored tag) @ !== x",
    ]);
    // Not claimed (refusal #1 F1, gate mutants G6 and G6b): a tag assembled at run time reads as no site - its pinned quiet reading.
    const assembled = `export const CAT = "hyperunix.result/" + "1";\nexport const SUB = ${TICK}hyperunix.result/${slot("version")}${TICK};`;
    expect(tagSites(new Map([["src/workbench/assembled.ts", assembled]])).map(describeSite)).toEqual([]);
  });
});
