/**
 * wb-lrz.8 (FURNACE-FEEDBACK-RECONCILIATION-R4, program-triage-2026-10-17; the rule-19 structural-exit child of wb-lrz.4,
 * orchestrator rulings R-B104 and R-B127): the full-surface readers of wb-lrz.4's Furnace SDK re-vendor readiness census, and
 * their falsifier census.
 *
 * WHAT IS DELIVERED. The readers are test/helpers/furnace-sdk-entry-readers.ts, shared so wb-lrz.4's census (blocked by this
 * bead under R-B127, not on trunk) can take them in place of its own readers as a mechanical restatement: entryExposures (D3's
 * WALK, with RESOLUTION and DEEP), entryTextNames (D3's ENTRY TEXT READ), pathReading, spellsDeep and holdsDeep (D1's PATH
 * reading), renderedBlocks (U1's reading of vendor/README.md) and registerMethods (D4's register-method count). This census
 * proves each reader with planted trees and reads the real tree through each; src/, vendor/ and the tracker export are only
 * read. Against wb-lrz.4's readers at the cuts the bead's items name, the cure is: the WALK reads a named re-export AT an entry
 * as well as past it, whatever its specifier resolves to (the chain-length hole closed, refusal #4 U1); a DEEP module is
 * identified by its stem, so its TypeScript twin is DEEP (refusal #5 U1); RESOLUTION reads a specifier the way a URL parser and
 * a file path read it (refusal #5 U3); a hard line break renders as a break (refusal #4 U2); a computed literal register name
 * is counted (refusal #5 U2); and D1's PATH reading drops ASCII tab, LF and CR (refusal #4 U3, as wb-lrz.4's cut #5 read it).
 *
 * CUT #2 (refusal #1's U1-U6; the class guard of rule 19(b)/(d)): each claim part's quantified, positional, ordered, plural
 * and either-half sub-readings are pinned - an "every" by two occurrences, a "first" by a later second one, an order
 * ("then", "in order") by both candidates of each adjacent pair present, a plural by its second member, the WALK's reach
 * by a chain of sixteen followed modules past an entry and an "or" by each half alone. The ENTRY TEXT READ's claim is
 * narrowed to its regex's word characters (a $ or a non-ASCII letter beside a name is a word boundary, so the name is
 * read), RENDERED's "trimmed" is dropped (no judge observes a block's edges), and SUBFORMS binds each sub-form to its
 * plants by a mark that each of them carries in what it adds or reads.
 *
 * THE ROWS (ROWS; a row's label is the line it answers, verbatim from the bead's row of the tracker export):
 *  E-U1, E-U2, E-U3: the description's enumerated items U1-U3. E-U4 (the note contact count) is DROPPED (below).
 *  F-U1, F-U2, F-U3: the members R-B127 folded into this bead (the notes' FOLDED MEMBERS lines U1-U3).
 *  W: the WALK's and RESOLUTION's other listed forms, which the claim states and the roster proves.
 *  Q: the residuals' pinned quiet rows (RESIDUALS below).
 * Every pin of a row is a plant: an in-memory edit of the real tree, judged by the row's judge (d3 for the WALK and the ENTRY
 * TEXT READ over both entries, d1 for the PATH reading over every src/ script, u1 for the rendered records of
 * vendor/README.md, d4 for executor.js's register methods). A plant reads as the real tree's reading plus exactly its added
 * lines; a plant of a form that reads as nothing (a drop, a never-read, a residual) adds no line and carries a TWIN, the same
 * edit in a read form, which adds its line, so the plant is shown to reach the judge. Each plant's page - the entries, files
 * and README text it changes, and its twin's - is held to its digest in PAGES, so a plant swapped for another case reds.
 * E-U4 DROPPED: U4 asks about a delivery-note count (the 202-file selection beside the 140 files run in wb-lrz.4's cut #4
 * note), not a reader form; no census can re-measure a note's count, so the census carries no pin for it. The count is
 * wb-lrz.4's (its cut #4 note stands append-only; an R649 additive correction is that bead's landing duty), and this cut's own
 * delivery note states its selection and run counts as one measured pair.
 *
 * THE CLAIMS (each test/helpers/furnace-sdk-entry-readers.ts ClaimPart, held here byte-for-byte as its own paragraph; each
 * claim lists its sub-forms, and SUBFORMS names, for every listed sub-form in claim order, the plants that prove it and the
 * mark each of them carries):
 *
 * WALK: from each entry its caller names (the types entry and the main entry in both censuses), following an export *
 * and following an export * as whose specifier resolves (RESOLUTION) to a module that is not DEEP, and reading each
 * module's top-level statements through the TypeScript AST (comments never read), the WALK reads these forms in the
 * entry itself and in every module it reaches
 *
 * WALK FORM (1) star: an export * of a DEEP module or an export * as of a DEEP module (its target resolved through
 * RESOLUTION)
 *
 * WALK FORM (2) named: a named re-export of a DEEP class (export { X } from, aliased as another name, type-only by its
 * declaration or type-only by its specifier), X an identifier or a string export name, read cooked (an identifier
 * escape or a string escape reads as the name it spells), whatever its specifier resolves to
 *
 * WALK FORM (3) local-import: a local export (export { x }, or aliased on export) of a name an import specifier binds
 * by a DEEP class's own name, that name read cooked (the import aliased, a type-only import declaration, a type-only
 * import specifier, a string import name, from a module that is not DEEP)
 *
 * WALK FORM (4) local-module: a local export of a name a default import of a DEEP module or a namespace import of a
 * DEEP module binds
 *
 * RESOLUTION: a specifier is read through exactly these steps of a URL parser's and a file path's reading - every
 * ASCII tab dropped, every LF dropped and every CR dropped, a query cut off (from its first ?) and a fragment cut off
 * (from its first #), then every %XX escape decoded and then every backslash read as / - and resolves when it is
 * relative (./ or ../, joined to the naming module's directory) or the package's own name (@furnace/sdk/<path>, read
 * under package/), its . segments dropped and .. segments resolved (posix.normalize), and the tarball carries the
 * first of its candidates in order: from a declaration file (.d.ts, .d.mts or .d.cts), an exact TypeScript path as
 * written (an exact .ts, an exact .tsx, an exact .mts or an exact .cts, a declaration file's own path included); for a
 * .js path, its .ts, then its .tsx and then its .d.ts twin; for a .jsx path, the same three; for a .mjs path, its .mts
 * and then its .d.mts twin; for a .cjs path, its .cts and then its .d.cts twin; for an extensionless path, its .ts,
 * its .tsx, its .d.ts, its /index.ts, its /index.tsx and its /index.d.ts; and from any other module, the exact path,
 * then its .js and then its /index.js
 *
 * DEEP: a tarball module is DEEP when its path, with its one module extension taken off (a .d.ts, a .d.mts, a .d.cts,
 * a .ts, a .tsx, a .mts, a .cts, a .js, a .jsx, a .mjs or a .cjs), is a DEEP row's path with its .js taken off, so a
 * DEEP module's JavaScript file, its declaration file and its TypeScript twin are each that DEEP module, whose classes
 * are the row's names
 *
 * ENTRY TEXT READ: each entry's raw text (the types entry's and the main entry's) is read for a DEEP class's name as a
 * whole word (the regex \b<name>\b): a name in its code and a name in a comment alike, escape sequences never decoded,
 * a name with a word character (an ASCII letter, a digit or an underscore) just before it or just after it not read,
 * and a name beside a $ or a non-ASCII letter read (each a word boundary)
 *
 * PATH READING: a literal's cooked text is read through exactly these steps - every ASCII tab dropped, every LF
 * dropped and every CR dropped, then every %XX escape decoded and then every backslash read as /, then posix.normalize
 * (empty segments dropped, . segments dropped and .. segments resolved) - and the text spells a deep
 * @furnace/sdk/<path> when the cooked text itself or its PATH reading begins with @furnace/sdk/ or holds
 * node_modules/@furnace/sdk/ at its start or node_modules/@furnace/sdk/ after a /, and holds one when either holds
 * @furnace/sdk/ anywhere
 *
 * RENDERED: vendor/README.md is read through marked's lexer, each top-level block to its text, whitespace collapsed
 * (every run one space): a hard line break (a br token, a backslash before a line ending or two or more spaces before
 * a line ending) reads as the line break marked renders, a space; a list reads by its items' tokens, a table by its
 * header cells' tokens and row cells' tokens, and a token holding tokens (a paragraph, a heading, a blockquote,
 * emphasis, strong text or a link) by those tokens; raw HTML (an HTML block or inline HTML), a link-reference
 * definition and an image read as nothing
 *
 * REGISTER METHODS: executor.js's register methods are its method declarations, in a class or in an object literal,
 * whose name reads register: an identifier name or a string-literal name, read cooked (an identifier escape or a
 * string escape reads as the name it spells), or a computed name whose expression, through parentheses, is a computed
 * string literal or a computed no-substitution template literal
 *
 * RESIDUALS (named; what the readers leave unread; each family is one quiet plant of row Q, reading as nothing, with a twin in
 * a read form that reads its line):
 *  R-INDEX-INDIRECT [Q-INDIRECT]: a DEEP class a module of the WALK reaches through anything but the WALK's forms - a value
 *   or a type declared from it, a default export of it, a module augmentation re-exporting it, a named re-export chain through
 *   a module the WALK does not follow, a namespace import of a module that star-exports it exported locally, an import-equals
 *   of it exported locally.
 *  R-WALK-SPECIFIER [Q-SPECIFIER]: a specifier RESOLUTION does not resolve - a directory resolved through a nested
 *   package.json, a TypeScript-extension specifier whose file the tarball lacks, a bare specifier that is not the package's own
 *   name, and a URL-parser reading its steps do not take, such as a trailing space a URL parser strips (a path mapping or a
 *   symlink is the same family).
 *  R-PATH-UNREAD [Q-PATH]: a literal whose path the PATH reading does not assemble - a form feed inside it (only tab, LF and CR
 *   are dropped), an encoded tab (%09, decoded after the drop), a letter-case spelling (@Furnace/SDK/) that only a file system
 *   ignoring case loads.
 *  R-RENDER-UNREAD [Q-RENDER]: a record the rendered reading does not show as a browser does - one spelled through a character
 *   reference (marked's tokens hold the reference) or split by a default-ignorable character (a browser hides it); wb-lrz.4's
 *   U1 refuses both on its own page.
 *  R-REGISTER-UNREAD [Q-REGISTER]: a register member the count does not read - a computed name of another expression
 *   (a concatenation, a template with a substitution, a const), a class field, an accessor and a private name.
 *
 * NOT CLAIMED: the rest of wb-lrz.4's census (its D1 load forms and BACKSTOP, D2, D3's package.json fields and header claim,
 * D4's NAMES, FIELD, DERIVATION and CODE reads, V1-V3, U1's REFUSALS and record count, U2 and the PIN legs) stays that
 * census's; this census's d1 judge reads every string and no-substitution template literal and template part of src/ through
 * the PATH reading as its own instrument, not as D1's load reading. The order exposures are read in, the WALK's visit of a
 * module once, and the tar reading of the vendored tarball (regular entries only) are this census's instruments. The trim
 * of a rendered block's text is NOT CLAIMED by this census: u1 matches records inside a block, so no judge observes a
 * block's edges.
 *
 * FROZEN SHAPE (standing rule 16): FROZEN_SHAPE pins each row's `${id}:${pins.length}`, PAGES' key order (every plant, in
 * ROWS order) every row's pin ids, PAGES each plant's page digest, REAL_READINGS each judge's reading of the real tree (a
 * re-vendor or a src/ change that moves a reading reds the REAL TREE case, which owes its re-measurement) and DROPPED the
 * dropped item. OUTSIDE ANCHOR: the bead's row of
 * .beads/issues.jsonl - its description's enumerated items (the lines opening "- U" after its one "Enumerated items" line, up
 * to its one "Acceptance:" line) and its notes' FOLDED MEMBERS items (the lines opening "- U" after the notes' one line opening
 * "FOLDED MEMBERS from the refused cut", up to the next line opening "Acceptance:"): every item is exactly one row whose label
 * is its line, or the DROPPED item; a second marker line is refused, never read first-match. The claim parts' sub-forms are
 * the helper's (outside this file), so a row deleted with its literals leaves an item, or a sub-form, unanswered.
 * EACH-LIVENESS: every case records its key at its last line, and the closing tally - the file's last case - reads vitest's
 * own task tree: every case is set to run, the case count is the fixed cases, one case per plant and the tally, and the
 * records equal the frozen literals, in order.
 * READS (contacts): package.json, the tarball its @furnace/sdk spec names (vendor/furnace-sdk-0.1.0.tgz: its regular entries
 * as text), vendor/README.md, every script under src/, this file's own header, and the wb-lrz.8 row of .beads/issues.jsonl
 * (its description, and the FOLDED MEMBERS block of its notes: an appended note is safe; a note that adds a second line
 * opening "FOLDED MEMBERS from the refused cut" reds the anchor case).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory tree.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  CLAIM_PARTS,
  type ClaimPart,
  type DeepRow,
  entryExposures,
  entryTextNames,
  holdsDeep,
  parsed,
  registerMethods,
  renderedBlocks,
  SDK,
  spellsDeep,
  WALK_FORMS,
} from "./helpers/furnace-sdk-entry-readers.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-furnace-sdk-entry-readers-census.test.ts";
const BEAD = "wb-lrz.8";
const EXPORT = ".beads/issues.jsonl";
const EXECUTOR = "package/dist/src/executor.js";
const TYPES = "package/dist/src/index.d.ts";
const MAIN = "package/dist/src/index.js";
const PROTOCOL_D = "package/dist/src/protocol.d.ts";
const PROTOCOL_J = "package/dist/src/protocol.js";
const SCRIPT = /\.(?:ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
/** The DEEP rows: wb-lrz.4's two deep imports of src/workbench/hosts/furnace-hosted.ts (REAL_READINGS' d1 line pins them in src/). */
const DEEP: readonly DeepRow[] = [
  { specifier: `${SDK}/dist/src/embedded.js`, names: ["EmbeddedHost"] },
  { specifier: `${SDK}/dist/src/resident_session.js`, names: ["ResidentSession"] },
];
/** vendor/README.md's record of a tarball as wb-zby's repack (global: every record the rendered page shows is read). */
const RECORD = /(furnace-sdk-\d+\.\d+\.\d+\.tgz) was re-packaged on (\d{4}-\d{2}-\d{2}) \(wb-zby\) from Furnace revision ([0-9a-f]{7,40})\b/g;

/** What the judges read: the tarball's regular entries, the src/ scripts and vendor/README.md. */
interface Tree {
  readonly tarball: ReadonlyMap<string, string>;
  readonly files: ReadonlyMap<string, string>;
  readonly readme: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function scripts(dir: string): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? scripts(`${dir}/${entry.name}`) : entry.isFile() && SCRIPT.test(entry.name) ? [`${dir}/${entry.name}`] : []))
    .sort();
}

/** The regular-file entries of a gzip tar, by path, as UTF-8 text; every other entry kind is skipped (an instrument). */
function tarEntries(gz: Buffer): Map<string, string> {
  const tar = gunzipSync(gz);
  const entries = new Map<string, string>();
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512);
    if (header.every((byte) => byte === 0)) break;
    const field = (start: number, end: number): string => {
      const raw = header.subarray(start, end);
      const nul = raw.indexOf(0);
      return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
    };
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const name = field(0, 100);
    const prefix = field(345, 500);
    if (type === "0" || type === "") entries.set(prefix === "" ? name : `${prefix}/${name}`, tar.subarray(at + 512, at + 512 + size).toString("utf8"));
    at += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}

function readTree(): Tree {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  const dependencies = isRecord(manifest) && isRecord(manifest.dependencies) ? manifest.dependencies : {};
  const spec = dependencies[SDK];
  if (typeof spec !== "string" || !spec.startsWith("file:")) throw new Error(`package.json resolves ${SDK} to ${String(spec)}, not a file: tarball`);
  return {
    tarball: tarEntries(readFileSync(join(REPO, spec.slice("file:".length)))),
    files: new Map(scripts("src").map((file) => [file, readFileSync(join(REPO, file), "utf8")])),
    readme: readFileSync(join(REPO, "vendor/README.md"), "utf8"),
  };
}

// ---- the judges -----------------------------------------------------------------------------------------------------

type JudgeId = "d3" | "d1" | "u1" | "d4";
const short = (path: string): string => path.replace(/^package\//, "");

/** d3: the ENTRY TEXT READ and the WALK over the types and main entries package.json names, as lines. */
function d3(tree: Tree): string[] {
  const pkgText = tree.tarball.get("package/package.json");
  const pkg: unknown = pkgText === undefined ? undefined : JSON.parse(pkgText);
  const lines: string[] = [];
  for (const field of ["types", "main"] as const) {
    const entry = isRecord(pkg) && typeof pkg[field] === "string" ? `package/${pkg[field]}` : undefined;
    const text = entry === undefined ? undefined : tree.tarball.get(entry);
    if (entry === undefined || text === undefined) {
      lines.push(`missing ${field}`);
      continue;
    }
    for (const name of entryTextNames(text, DEEP)) lines.push(`text ${field} ${name}`);
    for (const exposure of entryExposures(tree.tarball, entry, DEEP)) lines.push(`walk ${field} ${exposure.form} ${exposure.names.join(",")} via ${exposure.chain.map(short).join(" -> ")}`);
  }
  return lines;
}

const D1_LINES = new WeakMap<ts.SourceFile, readonly string[]>();
/** d1: every string or no-substitution template literal and template part of each src/ script, read through the PATH reading. */
function d1(tree: Tree): string[] {
  return [...tree.files].flatMap(([file, text]) => {
    if (!file.startsWith("src/") || !SCRIPT.test(file)) return [];
    const source = parsed(file, text);
    const hit = D1_LINES.get(source);
    if (hit !== undefined) return [...hit];
    const lines: string[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        if (spellsDeep(node.text)) lines.push(`spells ${file} ${JSON.stringify(node.text)}`);
        else if (holdsDeep(node.text)) lines.push(`holds ${file} ${JSON.stringify(node.text)}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    D1_LINES.set(source, lines);
    return lines;
  });
}

/** u1: every record of a tarball as wb-zby's repack that vendor/README.md's rendered blocks show. */
function u1(tree: Tree): string[] {
  return renderedBlocks(tree.readme).flatMap((block) => [...block.matchAll(RECORD)].map((match) => `record ${match[1]} ${match[2]} ${match[3]}`));
}

/** d4: executor.js's register methods, by their name forms. */
function d4(tree: Tree): string[] {
  const text = tree.tarball.get(EXECUTOR);
  return text === undefined ? ["missing executor"] : registerMethods(parsed(EXECUTOR, text)).map((method) => `register ${method.name}`);
}

const JUDGES: Readonly<Record<JudgeId, (tree: Tree) => string[]>> = { d3, d1, u1, d4 };

// ---- plant builders: each returns a new tree and refuses an edit that changes nothing, so no plant is hollow ----------

function editEntry(tree: Tree, path: string, edit: (text: string) => string): Tree {
  const text = tree.tarball.get(path);
  if (text === undefined) throw new Error(`a plant edits ${path}, which the tarball does not carry`);
  const next = edit(text);
  if (next === text) throw new Error(`a plant leaves ${path} unchanged`);
  return { ...tree, tarball: new Map([...tree.tarball, [path, next]]) };
}
const appended = (tree: Tree, path: string, ...lines: readonly string[]): Tree => editEntry(tree, path, (text) => `${text}\n${lines.join("\n")}\n`);
function addEntry(tree: Tree, path: string, text: string): Tree {
  if (tree.tarball.has(path)) throw new Error(`a plant adds ${path}, which the tarball already carries`);
  return { ...tree, tarball: new Map([...tree.tarball, [path, text]]) };
}
function withFile(tree: Tree, file: string, text: string): Tree {
  if (tree.files.has(file)) throw new Error(`a plant adds ${file}, which src/ already carries`);
  return { ...tree, files: new Map([...tree.files, [file, text]]) };
}
function withReadme(tree: Tree, block: string): Tree {
  return { ...tree, readme: `${tree.readme}\n${block}\n` };
}
/** A DEEP module's twin: a new entry at `path` holding the embedded (or resident) module's declaration text. */
const twinOf = (tree: Tree, path: string, of: "embedded" | "resident_session" = "embedded"): Tree => addEntry(tree, path, tree.tarball.get(`package/dist/src/${of}.d.ts`) ?? "");
/** One hop: `entry` star-exports `specifier`, which resolves to the added module `hop`, which star-exports `hopSpecifier`. */
const hop = (tree: Tree, entry: string, specifier: string, hopPath: string, hopSpecifier = "./embedded.js"): Tree =>
  appended(addEntry(tree, `package/dist/src/${hopPath}`, `export * from "${hopSpecifier}";\n`), entry, `export * from "${specifier}";`);

const walkLine = (field: "types" | "main", form: string, names: string, ...chain: readonly string[]): string => `walk ${field} ${form} ${names} via ${chain.join(" -> ")}`;
const IDX_D = "dist/src/index.d.ts";
const IDX_J = "dist/src/index.js";
const PROTO_D = "dist/src/protocol.d.ts";
const PROTO_J = "dist/src/protocol.js";
const EMB_D = "dist/src/embedded.d.ts";
const EMB_J = "dist/src/embedded.js";
const RES_J = "dist/src/resident_session.js";
const RES_D = "dist/src/resident_session.d.ts";
const EH = "EmbeddedHost";
const RS = "ResidentSession";
const spellsLine = (file: string, text: string): string => `spells ${file} ${JSON.stringify(text)}`;
const holdsLine = (file: string, text: string): string => `holds ${file} ${JSON.stringify(text)}`;
const SECOND = "record furnace-sdk-0.2.0.tgz 2026-11-01 abcdef0123";
const RECORD_LINE = "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01 (wb-zby) from Furnace revision abcdef0123.";
/** The second record without its closing period (a list item, a table cell or a blockquote paragraph holds it). */
const RECORD_TEXT = "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01 (wb-zby) from Furnace revision abcdef0123";
const CLIENT = "@furnace/sdk/dist/src/host_client.js";
const NODE_CLIENT = "../../node_modules/@furnace/sdk/dist/src/host_client.js";
const TAB = "\t";
const LF = "\n";
const CR = "\r";
/** A non-ASCII letter (U+00E9), a word boundary for the ENTRY TEXT READ's \b. */
const E_ACUTE = String.fromCodePoint(0xe9);
/** W-FOLLOW-DEEP's sixteen followed modules: zzh<n>.d.ts star-exports zzh<n+1>.js, and the last the embedded module. */
const DEEP_CHAIN = Array.from({ length: 16 }, (_, index) => `dist/src/zzh${index + 1}.d.ts`);
/** A src/ module planted beside the real scripts, and the path its lines name. */
const d1File = (slug: string): string => `src/workbench/plant-d1-${slug}.ts`;
const shim = (member: string): string => `class ShimApp {\n  ${member} {\n    return this;\n  }\n}`;

// ---- the plants -----------------------------------------------------------------------------------------------------

interface Twin {
  readonly tree: (real: Tree) => Tree;
  readonly added: readonly string[];
}
interface Plant {
  readonly name: string;
  readonly tree: (real: Tree) => Tree;
  readonly added: readonly string[];
  readonly twin?: Twin;
}

const PLANTS: Readonly<Record<string, Plant>> = {
  // E-U1: entry-level named re-exports (refusal #4 U1's D3-E1..E5, wb-lrz.4 cut #5's Q12 spellings, and the plain controls).
  "E1-TYPES-ESC": {
    name: "the types entry re-exports EmbeddedHost by an identifier escape (refusal #4 D3-E1)",
    tree: (real) => appended(real, TYPES, 'export { \\u0045mbeddedHost as GateHost } from "./embedded.js";'),
    added: [walkLine("types", "named", EH, IDX_D)],
  },
  "E1-TYPES-STR": {
    name: "the types entry re-exports EmbeddedHost by a string export name (refusal #4 D3-E2)",
    tree: (real) => appended(real, TYPES, 'export { "EmbeddedHost" as GateHost } from "./embedded.js";'),
    added: [`text types ${EH}`, walkLine("types", "named", EH, IDX_D)],
  },
  "E1-MAIN-ESC": {
    name: "the main entry re-exports EmbeddedHost by an identifier escape (refusal #4 D3-E3)",
    tree: (real) => appended(real, MAIN, 'export { \\u0045mbeddedHost as GateHost } from "./embedded.js";'),
    added: [walkLine("main", "named", EH, IDX_J)],
  },
  "E1-BOTH-ESC": {
    name: "both entries re-export EmbeddedHost by an identifier escape (refusal #4 D3-E3b)",
    tree: (real) => appended(appended(real, TYPES, 'export { \\u0045mbeddedHost as GateHost } from "./embedded.js";'), MAIN, 'export { \\u0045mbeddedHost as GateHost } from "./embedded.js";'),
    added: [walkLine("types", "named", EH, IDX_D), walkLine("main", "named", EH, IDX_J)],
  },
  "E1-RESIDENT-ESC": {
    name: "the types entry re-exports ResidentSession by a braced code-point escape (refusal #4 D3-E5)",
    tree: (real) => appended(real, TYPES, 'export { \\u{52}esidentSession as GateSession } from "./resident_session.js";'),
    added: [walkLine("types", "named", RS, IDX_D)],
  },
  "E1-STR-HEX": {
    name: "the types entry re-exports EmbeddedHost by a string export name with a hex escape",
    tree: (real) => appended(real, TYPES, 'export { "Embedded\\x48ost" as GateHostName } from "./embedded.js";'),
    added: [walkLine("types", "named", EH, IDX_D)],
  },
  "E1-STR-BRACE": {
    name: "the types entry re-exports EmbeddedHost by a string export name with a braced code-point escape",
    tree: (real) => appended(real, TYPES, 'export { "\\u{45}mbeddedHost" as GateHostPoint } from "./embedded.js";'),
    added: [walkLine("types", "named", EH, IDX_D)],
  },
  "E1-MAIN-STR-U": {
    name: "the main entry re-exports EmbeddedHost by a string export name with a unicode escape",
    tree: (real) => appended(real, MAIN, 'export { "\\u0045mbeddedHost" as GateHost } from "./embedded.js";'),
    added: [walkLine("main", "named", EH, IDX_J)],
  },
  "E1-MAIN-RES-ESC": {
    name: "the main entry re-exports ResidentSession by an identifier escape inside the name",
    tree: (real) => appended(real, MAIN, 'export { Resident\\u0053ession as GateSession } from "./resident_session.js";'),
    added: [walkLine("main", "named", RS, IDX_J)],
  },
  "E1-MAIN-STR-LC": {
    name: "the main entry re-exports ResidentSession by a string export name split by a line continuation",
    tree: (real) => appended(real, MAIN, 'export { "Resident\\\nSession" as GateSessionName } from "./resident_session.js";'),
    added: [walkLine("main", "named", RS, IDX_J)],
  },
  "E1-MAIN-STR-CHAR": {
    name: "the main entry re-exports EmbeddedHost by a string export name with a single-character escape",
    tree: (real) => appended(real, MAIN, 'export { "Embedded\\Host" as GateHostChar } from "./embedded.js";'),
    added: [walkLine("main", "named", EH, IDX_J)],
  },
  "E1-PLAIN": {
    name: "the types entry re-exports EmbeddedHost under an alias, spelled plainly (both reads)",
    tree: (real) => appended(real, TYPES, 'export { EmbeddedHost as GateHost } from "./embedded.js";'),
    added: [`text types ${EH}`, walkLine("types", "named", EH, IDX_D)],
  },
  "E1-TYPE-DECL": {
    name: "the types entry's type-only re-export declaration of EmbeddedHost, unaliased",
    tree: (real) => appended(real, TYPES, 'export type { EmbeddedHost } from "./embedded.js";'),
    added: [`text types ${EH}`, walkLine("types", "named", EH, IDX_D)],
  },
  "E1-TYPE-SPEC": {
    name: "the types entry's type-only re-export specifier of ResidentSession",
    tree: (real) => appended(real, TYPES, 'export { type ResidentSession as Session } from "./resident_session.js";'),
    added: [`text types ${RS}`, walkLine("types", "named", RS, IDX_D)],
  },
  "E1-UNRESOLVED": {
    name: "the types entry re-exports EmbeddedHost by escape from a specifier the tarball does not carry (read whatever it resolves to)",
    tree: (real) => appended(real, TYPES, 'export { \\u0045mbeddedHost } from "./missing.js";'),
    added: [walkLine("types", "named", EH, IDX_D)],
  },
  "E1-TWO": {
    name: "the types entry re-exports both DEEP classes in one clause (each name of the clause is read)",
    tree: (real) => appended(real, TYPES, 'export { EmbeddedHost, ResidentSession } from "./embedded.js";'),
    added: [`text types ${EH}`, `text types ${RS}`, walkLine("types", "named", `${EH},${RS}`, IDX_D)],
  },
  "E1-TEXT-COMMENT": {
    name: "the types entry names EmbeddedHost only in a comment (the ENTRY TEXT READ reads comments; the WALK never does)",
    tree: (real) => appended(real, TYPES, "// EmbeddedHost stays a deep import"),
    added: [`text types ${EH}`],
  },
  "E1-TEXT-LONGER": {
    name: "the types entry holds the class name only inside a longer identifier (the whole-word read reads nothing)",
    tree: (real) => appended(real, TYPES, "export declare const EmbeddedHostOptions: unique symbol;"),
    added: [],
    twin: { tree: (real) => appended(real, TYPES, "export declare const EmbeddedHost: unique symbol;"), added: [`text types ${EH}`] },
  },
  "E1-TEXT-ESCAPE": {
    name: "the types entry names EmbeddedHost only through an escape in a comment (the text read never decodes)",
    tree: (real) => appended(real, TYPES, "// \\u0045mbeddedHost stays a deep import"),
    added: [],
    twin: { tree: (real) => appended(real, TYPES, "// EmbeddedHost stays a deep import"), added: [`text types ${EH}`] },
  },

  // E-U2: the rendered reading of a hard line break (refusal #4 U2's U1-R1, U1-R1b and U1-R7), and the block forms.
  "U2-BR-WBZBY": {
    name: "a second record split by a backslash hard break before (wb-zby) (refusal #4 U2)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01\\\n(wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-BR-REVISION": {
    name: "a second record split by a backslash hard break before revision (refusal #4 U1-R1b)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01 (wb-zby) from Furnace\\\nrevision abcdef0123."),
    added: [SECOND],
  },
  "U2-BR-EMPHASIS": {
    name: "a second record whose backslash hard break sits inside emphasis (refusal #4 U1-R7)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was *re-packaged\\\non* 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-BR-SPACES": {
    name: "the two-space twin of the backslash break: the same rendered page, the same reading",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01  \n(wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-LIST": {
    name: "a second record in a list item, with emphasis",
    tree: (real) => withReadme(real, "- furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123"),
    added: [SECOND],
  },
  "U2-TABLE": {
    name: "a second record in a table cell, with emphasis",
    tree: (real) => withReadme(real, "| Record |\n| --- |\n| furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123 |"),
    added: [SECOND],
  },
  "U2-TABLE-HEAD": {
    name: "a second record in a table's header cell, with emphasis",
    tree: (real) => withReadme(real, "| furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123 |\n| --- |\n| row |"),
    added: [SECOND],
  },
  "U2-HEADING": {
    name: "a second record in a heading, with emphasis",
    tree: (real) => withReadme(real, "## furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123"),
    added: [SECOND],
  },
  "U2-QUOTE": {
    name: "a second record in a blockquote, with emphasis",
    tree: (real) => withReadme(real, "> furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123"),
    added: [SECOND],
  },
  "U2-EMPHASIS": {
    name: "a second record in a paragraph, with emphasis",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was *re-packaged* on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-STRONG": {
    name: "a second record with strong text",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was **re-packaged** on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-LINK": {
    name: "a second record with a link",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was [re-packaged](https://example.invalid/r) on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-HTML": {
    name: "a second record inside an HTML comment (raw HTML reads as nothing)",
    tree: (real) => withReadme(real, `<!-- ${RECORD_LINE} -->`),
    added: [],
    twin: { tree: (real) => withReadme(real, RECORD_LINE), added: [SECOND] },
  },
  "U2-HTML-INLINE": {
    name: "a second record whose (wb-zby) sits inside inline HTML tags (the tags read as nothing, so the record shows)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01 <b>(wb-zby)</b> from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-DEF": {
    name: "a second record as a link-reference definition's title (a definition reads as nothing)",
    tree: (real) => withReadme(real, `[gate]: https://example.invalid/r "${RECORD_LINE}"`),
    added: [],
    twin: { tree: (real) => withReadme(real, RECORD_LINE), added: [SECOND] },
  },
  "U2-IMAGE": {
    name: "a second record as an image's alt text (an image reads as nothing)",
    tree: (real) => withReadme(real, `![${RECORD_LINE}](https://example.invalid/i.png)`),
    added: [],
    twin: { tree: (real) => withReadme(real, RECORD_LINE), added: [SECOND] },
  },

  // E-U3: D1's PATH reading (refusal #4 U3's four src modules, and each listed reading).
  "P-RESOLVE-TAB": {
    name: "import.meta.resolve of a node_modules path a tab splits, then import(where) (refusal #4 U3)",
    tree: (real) => withFile(real, d1File("tab"), 'const where = import.meta.resolve("../../node_modules/@furnace/sd\\tk/dist/src/host_client.js");\nexport const loaded: unknown = await import(where);\n'),
    added: [spellsLine(d1File("tab"), `../../node_modules/@furnace/sd${TAB}k/dist/src/host_client.js`)],
  },
  "P-RESOLVE-LF": {
    name: "the same with an LF (refusal #4 U3)",
    tree: (real) => withFile(real, d1File("lf"), 'const where = import.meta.resolve("../../node_modules/@furnace/sd\\nk/dist/src/host_client.js");\nexport const loaded: unknown = await import(where);\n'),
    added: [spellsLine(d1File("lf"), `../../node_modules/@furnace/sd${LF}k/dist/src/host_client.js`)],
  },
  "P-RESOLVE-CR": {
    name: "the same with a CR (refusal #4 U3)",
    tree: (real) => withFile(real, d1File("cr"), 'const where = import.meta.resolve("../../node_modules/@furnace/sd\\rk/dist/src/host_client.js");\nexport const loaded: unknown = await import(where);\n'),
    added: [spellsLine(d1File("cr"), `../../node_modules/@furnace/sd${CR}k/dist/src/host_client.js`)],
  },
  "P-URL-TAB": {
    name: "new URL of the tab-split literal against import.meta.url, then import(url.href) (refusal #4 U3)",
    tree: (real) => withFile(real, d1File("url"), 'const url = new URL("../../node_modules/@furnace/sd\\tk/dist/src/host_client.js", import.meta.url);\nexport const loaded: unknown = await import(url.href);\n'),
    added: [spellsLine(d1File("url"), `../../node_modules/@furnace/sd${TAB}k/dist/src/host_client.js`)],
  },
  "P-PERCENT": {
    name: "a resolve load whose @ is a %40 escape",
    tree: (real) => withFile(real, d1File("percent"), 'export const where = import.meta.resolve("../../node_modules/%40furnace/sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("percent"), "../../node_modules/%40furnace/sdk/dist/src/host_client.js")],
  },
  "P-BACKSLASH": {
    name: "a resolve load spelled with backslashes",
    tree: (real) => withFile(real, d1File("backslash"), 'export const where = import.meta.resolve("..\\\\..\\\\node_modules\\\\@furnace\\\\sdk\\\\dist\\\\src\\\\host_client.js");\n'),
    added: [spellsLine(d1File("backslash"), "..\\..\\node_modules\\@furnace\\sdk\\dist\\src\\host_client.js")],
  },
  "P-EMPTY": {
    name: "a load spelled with an empty segment",
    tree: (real) => withFile(real, d1File("empty"), 'export const loaded: unknown = await import("@furnace//sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("empty"), "@furnace//sdk/dist/src/host_client.js")],
  },
  "P-DOT": {
    name: "a load spelled with a . segment",
    tree: (real) => withFile(real, d1File("dot"), 'export const loaded: unknown = await import("@furnace/./sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("dot"), "@furnace/./sdk/dist/src/host_client.js")],
  },
  "P-DOTDOT": {
    name: "a load spelled with a .. segment",
    tree: (real) => withFile(real, d1File("dotdot"), 'export const loaded: unknown = await import("@furnace/kit/../sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("dotdot"), "@furnace/kit/../sdk/dist/src/host_client.js")],
  },
  "P-BEGINS": {
    name: "a load by the package's name",
    tree: (real) => withFile(real, d1File("begins"), `export const loaded: unknown = await import("${CLIENT}");\n`),
    added: [spellsLine(d1File("begins"), CLIENT)],
  },
  "P-NM-START": {
    name: "a load whose path opens with node_modules/",
    tree: (real) => withFile(real, d1File("nm-start"), 'export const where = import.meta.resolve("node_modules/@furnace/sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("nm-start"), "node_modules/@furnace/sdk/dist/src/host_client.js")],
  },
  "P-NM-AFTER": {
    name: "a load whose path holds node_modules/ after a /",
    tree: (real) => withFile(real, d1File("nm-after"), `export const where = import.meta.resolve("${NODE_CLIENT}");\n`),
    added: [spellsLine(d1File("nm-after"), NODE_CLIENT)],
  },
  "P-HOLDS": {
    name: "a literal that holds @furnace/sdk/ inside other text",
    tree: (real) => withFile(real, d1File("holds"), 'export const note = "see @furnace/sdk/dist/src/client.js";\n'),
    added: [holdsLine(d1File("holds"), "see @furnace/sdk/dist/src/client.js")],
  },
  "P-HOLDS-PATH": {
    name: "a literal that holds @furnace/sdk/ only by its PATH reading (a tab inside it)",
    tree: (real) => withFile(real, d1File("holds-path"), 'export const note = "see @furnace/sd\\tk/dist/src/client.js";\n'),
    added: [holdsLine(d1File("holds-path"), `see @furnace/sd${TAB}k/dist/src/client.js`)],
  },

  // F-U1: the DEEP module's TypeScript twin (refusal #5 U1's G1-G7 and G1R) and DEEP's other module extensions.
  G1: {
    name: "the types entry star-exports ./embedded.js and the tarball carries embedded.ts (refusal #5 G1)",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.ts"), TYPES, 'export * from "./embedded.js";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.ts")],
  },
  G2: {
    name: "the same with a .tsx twin (refusal #5 G2)",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.tsx"), TYPES, 'export * from "./embedded.js";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.tsx")],
  },
  G3: {
    name: "a namespace import of ./embedded.js exported locally, the twin present (refusal #5 G3)",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.ts"), TYPES, 'import * as hosting from "./embedded.js";', "export { hosting };"),
    added: [walkLine("types", "local-module", EH, IDX_D)],
  },
  G4: {
    name: "export * as hosting from ./embedded.js, the twin present (refusal #5 G4)",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.ts"), TYPES, 'export * as hosting from "./embedded.js";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.ts")],
  },
  G5: {
    name: "past the entry: protocol.d.ts star-exports ./resident_session.js, its twin present (refusal #5 G5)",
    tree: (real) => appended(twinOf(real, "package/dist/src/resident_session.ts", "resident_session"), PROTOCOL_D, 'export * from "./resident_session.js";'),
    added: [walkLine("types", "star", RS, IDX_D, PROTO_D, "dist/src/resident_session.ts")],
  },
  G6: {
    name: "an extensionless ./embedded, the twin present (refusal #5 G6)",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.ts"), TYPES, 'export * from "./embedded";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.ts")],
  },
  G1R: {
    name: "the types entry's export * as of ./resident_session.js, the resident twin present (refusal #5 G1R / G1RNS)",
    tree: (real) => appended(twinOf(real, "package/dist/src/resident_session.ts", "resident_session"), TYPES, 'export * as resident from "./resident_session.js";'),
    added: [walkLine("types", "star", RS, IDX_D, "dist/src/resident_session.ts")],
  },
  G7: {
    name: "the twin alone, exported by nothing (refusal #5 G7): it reads nothing",
    tree: (real) => twinOf(real, "package/dist/src/embedded.ts"),
    added: [],
    twin: { tree: (real) => appended(twinOf(real, "package/dist/src/embedded.ts"), TYPES, 'export * from "./embedded.js";'), added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.ts")] },
  },
  "D-NOEXT": {
    name: "an extensionless tarball file named after the embedded module is not DEEP (it has no module extension): the WALK follows it",
    tree: (real) => appended(addEntry(real, "package/dist/src/embedded", 'export * from "./resident_session.js";\n'), MAIN, 'export * from "./embedded";'),
    added: [walkLine("main", "star", RS, IDX_J, "dist/src/embedded", RES_J)],
  },
  "D-OTHER-DIR": {
    name: "a module named embedded in another directory is not DEEP (its stem is not the DEEP row's path): it reads nothing",
    tree: (real) => appended(addEntry(real, "package/dist/src/sub/embedded.d.ts", "export {};\n"), TYPES, 'export * from "./sub/embedded.js";'),
    added: [],
    twin: { tree: (real) => appended(real, TYPES, 'export * from "./embedded.js";'), added: [walkLine("types", "star", EH, IDX_D, EMB_D)] },
  },
  "D-DTS": {
    name: "the types entry star-exports ./embedded.js, held as its .d.ts",
    tree: (real) => appended(real, TYPES, 'export * from "./embedded.js";'),
    added: [walkLine("types", "star", EH, IDX_D, EMB_D)],
  },
  "D-DMTS": {
    name: "the types entry star-exports ./embedded.mjs, held as a .d.mts",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.d.mts"), TYPES, 'export * from "./embedded.mjs";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.d.mts")],
  },
  "D-DCTS": {
    name: "the types entry star-exports ./embedded.cjs, held as a .d.cts",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.d.cts"), TYPES, 'export * from "./embedded.cjs";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.d.cts")],
  },
  "D-MTS": {
    name: "the types entry star-exports ./embedded.mjs, held as a .mts",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.mts"), TYPES, 'export * from "./embedded.mjs";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.mts")],
  },
  "D-CTS": {
    name: "the types entry star-exports ./embedded.cjs, held as a .cts",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.cts"), TYPES, 'export * from "./embedded.cjs";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.cts")],
  },
  "D-JS": {
    name: "the main entry star-exports ./embedded.js, held as its .js",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "D-JSX": {
    name: "the main entry star-exports ./embedded.jsx, held as a .jsx",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.jsx"), MAIN, 'export * from "./embedded.jsx";'),
    added: [walkLine("main", "star", EH, IDX_J, "dist/src/embedded.jsx")],
  },
  "D-MJS": {
    name: "the main entry star-exports ./embedded.mjs, held as a .mjs",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.mjs"), MAIN, 'export * from "./embedded.mjs";'),
    added: [walkLine("main", "star", EH, IDX_J, "dist/src/embedded.mjs")],
  },
  "D-CJS": {
    name: "the main entry star-exports ./embedded.cjs, held as a .cjs",
    tree: (real) => appended(twinOf(real, "package/dist/src/embedded.cjs"), MAIN, 'export * from "./embedded.cjs";'),
    added: [walkLine("main", "star", EH, IDX_J, "dist/src/embedded.cjs")],
  },

  // F-U2: D4's register-method count (refusal #5 U2's G12c, G12b, G12 and G12d, and each listed name form).
  "R-PLAIN": {
    name: "a second register method in a class, by an identifier name (refusal #5 G12c)",
    tree: (real) => appended(real, EXECUTOR, shim("register()")),
    added: ["register identifier"],
  },
  "R-STRING": {
    name: "a second register method by a string-literal name (refusal #5 G12b)",
    tree: (real) => appended(real, EXECUTOR, shim('"register"()')),
    added: ["register string"],
  },
  "R-ID-ESC": {
    name: "a second register method by an identifier escape",
    tree: (real) => appended(real, EXECUTOR, shim("\\u0072egister()")),
    added: ["register identifier"],
  },
  "R-STR-ESC": {
    name: "a second register method by a string-literal name with a hex escape",
    tree: (real) => appended(real, EXECUTOR, shim('"regist\\x65r"()')),
    added: ["register string"],
  },
  "R-COMPUTED": {
    name: "a second register method by a computed string literal (refusal #5 G12)",
    tree: (real) => appended(real, EXECUTOR, shim('["register"]()')),
    added: ["register computed-string"],
  },
  "R-TEMPLATE": {
    name: "a second register method by a computed no-substitution template literal (refusal #5 G12d)",
    tree: (real) => appended(real, EXECUTOR, shim("[`register`]()")),
    added: ["register computed-template"],
  },
  "R-PARENS": {
    name: "a second register method by a parenthesized computed string literal",
    tree: (real) => appended(real, EXECUTOR, shim('[("register")]()')),
    added: ["register computed-string"],
  },
  "R-CLASS-EXPR": {
    name: "a register method in a class expression nested in a function",
    tree: (real) => appended(real, EXECUTOR, "export function makeShim() {\n  return class {\n    register() {\n      return this;\n    }\n  };\n}"),
    added: ["register identifier"],
  },
  "R-OBJECT": {
    name: "a register method in an object literal",
    tree: (real) => appended(real, EXECUTOR, "export const shim = {\n  register() {\n    return 1;\n  },\n};"),
    added: ["register identifier"],
  },

  // F-U3: the unresolved-specifier family (refusal #5 U3's G8-G11) and RESOLUTION's other listed specifier readings.
  "S-TAB": {
    name: "the main entry star-exports ./embed<TAB>ded.js, the tab cooked from an escape (refusal #5 G10)",
    tree: (real) => appended(real, MAIN, 'export * from "./embed\\tded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-LF": {
    name: "the main entry star-exports ./embed<LF>ded.js",
    tree: (real) => appended(real, MAIN, 'export * from "./embed\\nded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-CR": {
    name: "the main entry star-exports ./embed<CR>ded.js",
    tree: (real) => appended(real, MAIN, 'export * from "./embed\\rded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-PCT": {
    name: "the main entry star-exports ./embedde%64.js (refusal #5 G11)",
    tree: (real) => appended(real, MAIN, 'export * from "./embedde%64.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-PCT-NAMED": {
    name: "protocol.js re-exports ResidentSession from ./resident%5Fsession.js (refusal #5 G9)",
    tree: (real) => appended(real, PROTOCOL_J, 'export { ResidentSession } from "./resident%5Fsession.js";'),
    added: [`walk main named ${RS} via ${IDX_J} -> ${PROTO_J}`],
  },
  "S-QUERY-NAMED": {
    name: "protocol.js re-exports EmbeddedHost from ./embedded.js?gate (refusal #5 G8)",
    tree: (real) => appended(real, PROTOCOL_J, 'export { EmbeddedHost } from "./embedded.js?gate";'),
    added: [`walk main named ${EH} via ${IDX_J} -> ${PROTO_J}`],
  },
  "S-QUERY": {
    name: "the main entry star-exports ./embedded.js?gate",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded.js?gate";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-FRAGMENT": {
    name: "the main entry star-exports ./embedded.js#gate",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded.js#gate";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-BACKSLASH": {
    name: "the main entry star-exports .\\embedded.js",
    tree: (real) => appended(real, MAIN, 'export * from ".\\\\embedded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },

  // W: the WALK's other forms, and RESOLUTION's candidates (wb-lrz.4 cut #5's D3 plants, re-read here).
  "W-STAR-AS": {
    name: "the main entry's export * as of the resident session module",
    tree: (real) => appended(real, MAIN, 'export * as resident from "./resident_session.js";'),
    added: [walkLine("main", "star", RS, IDX_J, RES_J)],
  },
  "W-FOLLOW-STAR": {
    name: "an export * chain through the protocol module (the WALK follows the entry's export *)",
    tree: (real) => appended(real, PROTOCOL_J, 'export * from "./resident_session.js";'),
    added: [walkLine("main", "star", RS, IDX_J, PROTO_J, RES_J)],
  },
  "W-FOLLOW-STAR-AS": {
    name: "the types entry's export * as of a module that star-exports the embedded module (followed)",
    tree: (real) => appended(addEntry(real, "package/dist/src/hosting.d.ts", 'export * from "./embedded.js";\n'), TYPES, 'export * as hosting from "./hosting.js";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/hosting.d.ts", EMB_D)],
  },
  "W-NAMED-PAST": {
    name: "a starred module re-exports EmbeddedHost by name",
    tree: (real) => appended(real, PROTOCOL_D, 'export { EmbeddedHost } from "./embedded.js";'),
    added: [walkLine("types", "named", EH, IDX_D, PROTO_D)],
  },
  "W-NAMED-PAST-ALIAS": {
    name: "a starred module re-exports ResidentSession by name under an alias",
    tree: (real) => appended(real, PROTOCOL_J, 'export { ResidentSession as Session } from "./resident_session.js";'),
    added: [walkLine("main", "named", RS, IDX_J, PROTO_J)],
  },
  "W-LOCAL-IMPORT": {
    name: "a starred module's local export of an imported EmbeddedHost",
    tree: (real) => appended(real, PROTOCOL_D, 'import { EmbeddedHost } from "./embedded.js";', "export { EmbeddedHost };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-ALIAS": {
    name: "a starred module's aliased local export of an aliased import of EmbeddedHost",
    tree: (real) => appended(real, PROTOCOL_D, 'import { EmbeddedHost as Embedded } from "./embedded.js";', "export { Embedded as Host };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-TYPE": {
    name: "a starred module's local export of a type-only import of EmbeddedHost",
    tree: (real) => appended(real, PROTOCOL_D, 'import type { EmbeddedHost } from "./embedded.js";', "export type { EmbeddedHost };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-TYPE-SPEC": {
    name: "a starred module's local export of a type-only import specifier of EmbeddedHost",
    tree: (real) => appended(real, PROTOCOL_D, 'import { type EmbeddedHost as Embedded } from "./embedded.js";', "export { Embedded };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-STRING": {
    name: "a starred module's local export of a string-named import of ResidentSession",
    tree: (real) => appended(real, PROTOCOL_J, 'import { "ResidentSession" as Session } from "./resident_session.js";', "export { Session };"),
    added: [walkLine("main", "local-import", RS, IDX_J, PROTO_J)],
  },
  "W-LOCAL-NONDEEP": {
    name: "a starred module's local export of a class-named import from a module that is not DEEP",
    tree: (real) => appended(real, PROTOCOL_D, 'import { ResidentSession } from "./models.js";', "export { ResidentSession };"),
    added: [walkLine("types", "local-import", RS, IDX_D, PROTO_D)],
  },
  "W-LOCAL-DEFAULT": {
    name: "a starred module's local export of a default import of the embedded module",
    tree: (real) => appended(real, PROTOCOL_D, 'import Host from "./embedded.js";', "export { Host };"),
    added: [walkLine("types", "local-module", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-NS": {
    name: "the types entry's local export of the embedded module's namespace",
    tree: (real) => appended(real, TYPES, 'import * as embedded from "./embedded.js";', "export { embedded };"),
    added: [walkLine("types", "local-module", EH, IDX_D)],
  },
  "W-DEEP-STOP": {
    name: "a DEEP module is read as an exposure and never followed: the twin's own export * of the resident module is not read",
    tree: (real) => appended(addEntry(real, "package/dist/src/embedded.ts", 'export * from "./resident_session.js";\n'), TYPES, 'export * from "./embedded.js";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/embedded.ts")],
  },
  "W-LOCAL-TWO": {
    name: "a starred module's local export of two class-named imports in one clause (each is read)",
    tree: (real) => appended(real, PROTOCOL_D, 'import { EmbeddedHost, ResidentSession } from "./models.js";', "export { EmbeddedHost, ResidentSession };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D), walkLine("types", "local-import", RS, IDX_D, PROTO_D)],
  },
  "W-LOCAL-BOTH": {
    name: "a starred module's local export of a default and a namespace import of the embedded module from one declaration",
    tree: (real) => appended(real, PROTOCOL_D, 'import Host, * as hosting from "./embedded.js";', "export { Host, hosting };"),
    added: [walkLine("types", "local-module", EH, IDX_D, PROTO_D), walkLine("types", "local-module", EH, IDX_D, PROTO_D)],
  },
  "W-LOCAL-ESC": {
    name: "a starred module's local export of an import of EmbeddedHost spelled by an identifier escape (the import name read cooked)",
    tree: (real) => appended(real, PROTOCOL_D, 'import { \\u0045mbeddedHost as Embedded } from "./embedded.js";', "export { Embedded };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },
  "W-COMMENT": {
    name: "a starred module whose comment holds an export * of the embedded module (the WALK reads no comment)",
    tree: (real) => appended(real, PROTOCOL_D, '// export * from "./embedded.js";'),
    added: [],
    twin: { tree: (real) => appended(real, PROTOCOL_D, 'export * from "./embedded.js";'), added: [walkLine("types", "star", EH, IDX_D, PROTO_D, EMB_D)] },
  },
  "W-NESTED": {
    name: "an export * of the embedded module inside a module declaration (not a top-level statement)",
    tree: (real) => appended(real, PROTOCOL_D, 'declare module "@furnace/sdk/gate" {', '  export * from "./embedded.js";', "}"),
    added: [],
    twin: { tree: (real) => appended(real, PROTOCOL_D, 'export * from "./embedded.js";'), added: [walkLine("types", "star", EH, IDX_D, PROTO_D, EMB_D)] },
  },
  "R-OWN": {
    name: "the main entry star-exports the embedded module through the package's own name",
    tree: (real) => appended(real, MAIN, `export * from "${SDK}/dist/src/embedded.js";`),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "R-OWN-DOT": {
    name: "the same through a . segment",
    tree: (real) => appended(real, MAIN, `export * from "${SDK}/dist/./src/embedded.js";`),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "R-OWN-DOTDOT": {
    name: "the same through a .. segment",
    tree: (real) => appended(real, MAIN, `export * from "${SDK}/dist/gate/../src/embedded.js";`),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "R-JOINED": {
    name: "a directory index that star-exports ../embedded.js, reached extensionless as /index.d.ts",
    tree: (real) => appended(addEntry(real, "package/dist/src/hosting/index.d.ts", 'export * from "../embedded.js";\n'), TYPES, 'export * from "./hosting";'),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/hosting/index.d.ts", EMB_D)],
  },
  "R-EXACT-DTS": {
    name: "the types entry star-exports the embedded module's declaration file by its exact path",
    tree: (real) => appended(real, TYPES, 'export * from "./embedded.d.ts";'),
    added: [walkLine("types", "star", EH, IDX_D, EMB_D)],
  },
  "R-EXACT-TS": {
    name: "a declaration file's exact .ts path to a hop",
    tree: (real) => hop(real, TYPES, "./zzexact.ts", "zzexact.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzexact.ts", EMB_J)],
  },
  "R-EXACT-TSX": {
    name: "a declaration file's exact .tsx path to a hop",
    tree: (real) => hop(real, TYPES, "./zzexact2.tsx", "zzexact2.tsx"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzexact2.tsx", EMB_J)],
  },
  "R-EXACT-MTS": {
    name: "a declaration file's exact .mts path to a hop",
    tree: (real) => hop(real, TYPES, "./zzexact3.mts", "zzexact3.mts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzexact3.mts", EMB_J)],
  },
  "R-EXACT-CTS": {
    name: "a declaration file's exact .cts path to a hop",
    tree: (real) => hop(real, TYPES, "./zzexact4.cts", "zzexact4.cts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzexact4.cts", EMB_J)],
  },
  "R-JS-TS": {
    name: "a declaration file's .js path held as .ts",
    tree: (real) => hop(real, TYPES, "./zzts.js", "zzts.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzts.ts", EMB_J)],
  },
  "R-JS-TSX": {
    name: "a declaration file's .js path held as .tsx",
    tree: (real) => hop(real, TYPES, "./zztsx.js", "zztsx.tsx"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zztsx.tsx", EMB_J)],
  },
  "R-JS-DTS": {
    name: "a declaration file's .js path held as its .d.ts twin",
    tree: (real) => hop(real, TYPES, "./zzjsd.js", "zzjsd.d.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzjsd.d.ts", EMB_D)],
  },
  "R-JSX": {
    name: "a declaration file's .jsx path held as its .d.ts twin",
    tree: (real) => hop(real, TYPES, "./zzjsx.jsx", "zzjsx.d.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzjsx.d.ts", EMB_D)],
  },
  "R-JSX-TS": {
    name: "a declaration file's .jsx path held as .ts",
    tree: (real) => hop(real, TYPES, "./zzjsxt.jsx", "zzjsxt.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzjsxt.ts", EMB_J)],
  },
  "R-JSX-TSX": {
    name: "a declaration file's .jsx path held as .tsx",
    tree: (real) => hop(real, TYPES, "./zzjsxx.jsx", "zzjsxx.tsx"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzjsxx.tsx", EMB_J)],
  },
  "R-MJS-MTS": {
    name: "a declaration file's .mjs path held as .mts",
    tree: (real) => hop(real, TYPES, "./zzm.mjs", "zzm.mts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzm.mts", EMB_J)],
  },
  "R-MJS-DMTS": {
    name: "a declaration file's .mjs path held as its .d.mts twin",
    tree: (real) => hop(real, TYPES, "./zzdm.mjs", "zzdm.d.mts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzdm.d.mts", EMB_D)],
  },
  "R-CJS-CTS": {
    name: "a declaration file's .cjs path held as .cts",
    tree: (real) => hop(real, TYPES, "./zzc.cjs", "zzc.cts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzc.cts", EMB_J)],
  },
  "R-CJS-DCTS": {
    name: "a declaration file's .cjs path held as its .d.cts twin",
    tree: (real) => hop(real, TYPES, "./zzdc.cjs", "zzdc.d.cts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzdc.d.cts", EMB_D)],
  },
  "R-NONE-TS": {
    name: "a declaration file's extensionless path held as .ts",
    tree: (real) => hop(real, TYPES, "./zzx", "zzx.ts"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzx.ts", EMB_J)],
  },
  "R-NONE-TSX": {
    name: "a declaration file's extensionless path held as .tsx",
    tree: (real) => hop(real, TYPES, "./zzy", "zzy.tsx"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzy.tsx", EMB_J)],
  },
  "R-NONE-DTS": {
    name: "a declaration file's extensionless path held as .d.ts",
    tree: (real) => appended(real, TYPES, 'export * from "./embedded";'),
    added: [walkLine("types", "star", EH, IDX_D, EMB_D)],
  },
  "R-NONE-INDEX-TS": {
    name: "a declaration file's extensionless path held as /index.ts",
    tree: (real) => hop(real, TYPES, "./zzdir", "zzdir/index.ts", "../embedded.js"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzdir/index.ts", EMB_J)],
  },
  "R-NONE-INDEX-TSX": {
    name: "a declaration file's extensionless path held as /index.tsx",
    tree: (real) => hop(real, TYPES, "./zzdir2", "zzdir2/index.tsx", "../embedded.js"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzdir2/index.tsx", EMB_J)],
  },
  "R-JS-JS": {
    name: "a JavaScript file's extensionless path held as .js",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "R-JS-INDEX": {
    name: "a JavaScript file's extensionless path held as /index.js",
    tree: (real) => hop(real, MAIN, "./zzjsdir", "zzjsdir/index.js", "../embedded.js"),
    added: [walkLine("main", "star", EH, IDX_J, "dist/src/zzjsdir/index.js", EMB_J)],
  },
  "R-ORDER": {
    name: "a declaration file's .js path held both as .ts (which star-exports the embedded module) and as .d.ts (which does not): the .ts is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzo.js", "zzo.ts"), "package/dist/src/zzo.d.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzo.ts", EMB_J)],
  },

  // ---- cut #2 (refusal #1's U1-U6 and the class guard of rule 19(b)/(d)): each quantified, positional, ordered, plural and
  // either-half sub-reading of a claim part, pinned by two occurrences, a later second one, both candidates present, a
  // second member, a deeper chain or one half alone; a plant names the refusal #1 L2 mutant it kills.

  // E-U1: the ENTRY TEXT READ's word characters and boundaries (TEXT_CLAIM, narrowed to its regex), and the main entry's text.
  "E1-TEXT-WORDCHARS": {
    name: "the types entry holds the class name beside an ASCII letter, a digit and an underscore, before it and after it (a word character on either side: not read; refusal #1 L2-T-LEADB)",
    tree: (real) => appended(real, TYPES, "// MyEmbeddedHost 2EmbeddedHost _EmbeddedHost EmbeddedHostX EmbeddedHost2 EmbeddedHost_ stay deep imports"),
    added: [],
    twin: { tree: (real) => appended(real, TYPES, "// EmbeddedHost stays a deep import"), added: [`text types ${EH}`] },
  },
  "E1-TEXT-DOLLAR": {
    name: "the types entry declares $EmbeddedHost (a $ beside the name is a word boundary for \\b: read)",
    tree: (real) => appended(real, TYPES, "export declare const $EmbeddedHost: unique symbol;"),
    added: [`text types ${EH}`],
  },
  "E1-TEXT-NONASCII": {
    name: "the types entry declares the name after a non-ASCII letter (a word boundary for \\b: read)",
    tree: (real) => appended(real, TYPES, `export declare const ${E_ACUTE}EmbeddedHost: unique symbol;`),
    added: [`text types ${EH}`],
  },
  "E1-TEXT-MAIN": {
    name: "the main entry names ResidentSession in a comment (the main entry's raw text is read too)",
    tree: (real) => appended(real, MAIN, "// ResidentSession stays a deep import"),
    added: [`text main ${RS}`],
  },

  // E-U2: a list's second item, a table's second header cell, second row and a row's second cell, three whitespace runs,
  // three spaces before a line ending, and a later token of a blockquote, emphasis, strong text and a link.
  "U2-LIST-SECOND": {
    name: "a second record in a list's second item (a list reads by every item's tokens; refusal #1 L2-U-LIST1)",
    tree: (real) => withReadme(real, `- other\n- ${RECORD_TEXT}`),
    added: [SECOND],
  },
  "U2-TABLE-HEAD-SECOND": {
    name: "a second record in a table's second header cell (refusal #1 L2-U-HEAD1)",
    tree: (real) => withReadme(real, `| a | ${RECORD_TEXT} |\n| --- | --- |\n| x | y |`),
    added: [SECOND],
  },
  "U2-TABLE-ROW-SECOND": {
    name: "a second record in a table's second body row (refusal #1 L2-U-ROW1)",
    tree: (real) => withReadme(real, `| h |\n| --- |\n| x |\n| ${RECORD_TEXT} |`),
    added: [SECOND],
  },
  "U2-TABLE-CELL-SECOND": {
    name: "a second record in a body row's second cell (refusal #1 L2-U-CELL1)",
    tree: (real) => withReadme(real, `| h | i |\n| --- | --- |\n| x | ${RECORD_TEXT} |`),
    added: [SECOND],
  },
  "U2-RUNS": {
    name: "a second record split by three whitespace runs - three spaces, an LF, and a space, a tab and a space (every run reads as one space)",
    tree: (real) => withReadme(real, `furnace-sdk-0.2.0.tgz was re-packaged   on 2026-11-01\n(wb-zby) from Furnace ${TAB} revision abcdef0123.`),
    added: [SECOND],
  },
  "U2-BR-SPACES3": {
    name: "the three-space twin of the two-space break (two or more spaces before a line ending)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01   \n(wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-QUOTE-SECOND": {
    name: "a second record in a blockquote's second paragraph (a blockquote reads by every token it holds)",
    tree: (real) => withReadme(real, `> other\n>\n> ${RECORD_TEXT}`),
    added: [SECOND],
  },
  "U2-EMPHASIS-NESTED": {
    name: "a second record whose emphasis holds text, strong text and text (emphasis reads by every token it holds)",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was _re-**pack**aged_ on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-STRONG-NESTED": {
    name: "a second record whose strong text holds text, emphasis and text",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was __re-*pack*aged__ on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },
  "U2-LINK-NESTED": {
    name: "a second record whose link holds text, emphasis and text",
    tree: (real) => withReadme(real, "furnace-sdk-0.2.0.tgz was [re-*pack*aged](https://example.invalid/r) on 2026-11-01 (wb-zby) from Furnace revision abcdef0123."),
    added: [SECOND],
  },

  // E-U3: two of each character the PATH reading drops or decodes, a lower-case hex escape, each stated order, and each
  // half of spells and holds alone.
  "P-TAB2": {
    name: "a resolve load two tabs split (every ASCII tab dropped; refusal #1 L2-P-TAB1)",
    tree: (real) => withFile(real, d1File("tab2"), 'export const where = import.meta.resolve("../../node_modules/@fur\\tnace/sd\\tk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("tab2"), `../../node_modules/@fur${TAB}nace/sd${TAB}k/dist/src/host_client.js`)],
  },
  "P-LF2": {
    name: "a resolve load two LFs split (every LF dropped; refusal #1 L2-P-LF1)",
    tree: (real) => withFile(real, d1File("lf2"), 'export const where = import.meta.resolve("../../node_modules/@fur\\nnace/sd\\nk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("lf2"), `../../node_modules/@fur${LF}nace/sd${LF}k/dist/src/host_client.js`)],
  },
  "P-CR2": {
    name: "a resolve load two CRs split (every CR dropped; refusal #1 L2-P-CR1)",
    tree: (real) => withFile(real, d1File("cr2"), 'export const where = import.meta.resolve("../../node_modules/@fur\\rnace/sd\\rk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("cr2"), `../../node_modules/@fur${CR}nace/sd${CR}k/dist/src/host_client.js`)],
  },
  "P-PCT2": {
    name: "a resolve load whose @ and the / after furnace are %40 and %2F escapes (every %XX escape decoded; refusal #1 L2-P-PCT1)",
    tree: (real) => withFile(real, d1File("pct2"), 'export const where = import.meta.resolve("../../node_modules/%40furnace%2Fsdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("pct2"), "../../node_modules/%40furnace%2Fsdk/dist/src/host_client.js")],
  },
  "P-PCT-LOWER": {
    name: "the same with a lower-case hex escape %2f (refusal #1 L2-P-PCT-UPPER)",
    tree: (real) => withFile(real, d1File("pct-lower"), 'export const where = import.meta.resolve("../../node_modules/%40furnace%2fsdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("pct-lower"), "../../node_modules/%40furnace%2fsdk/dist/src/host_client.js")],
  },
  "P-ORDER-DECODE-NORM": {
    name: "a load whose .. segment is %2E%2E (decoded, then posix.normalize; refusal #1 L2-P-ORD-NORM)",
    tree: (real) => withFile(real, d1File("order-decode-norm"), 'export const loaded: unknown = await import("@furnace/kit/%2E%2E/sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("order-decode-norm"), "@furnace/kit/%2E%2E/sdk/dist/src/host_client.js")],
  },
  "P-ORDER-BS-NORM": {
    name: "a load whose .. segment is set off by backslashes (read as /, then posix.normalize)",
    tree: (real) => withFile(real, d1File("order-bs-norm"), 'export const loaded: unknown = await import("@furnace\\\\kit\\\\..\\\\sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("order-bs-norm"), "@furnace\\kit\\..\\sdk/dist/src/host_client.js")],
  },
  "P-ORDER-DROP-NORM": {
    name: "a load whose .. segment a tab splits (dropped, then posix.normalize)",
    tree: (real) => withFile(real, d1File("order-drop-norm"), 'export const loaded: unknown = await import("@furnace/kit/.\\t./sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("order-drop-norm"), `@furnace/kit/.${TAB}./sdk/dist/src/host_client.js`)],
  },
  "P-ORDER-DECODE-BS": {
    name: "a load whose / after furnace is an encoded backslash %5C (decoded, then read as /)",
    tree: (real) => withFile(real, d1File("order-decode-bs"), 'export const loaded: unknown = await import("@furnace%5Csdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("order-decode-bs"), "@furnace%5Csdk/dist/src/host_client.js")],
  },
  "P-RAW-BEGINS": {
    name: "a literal that begins with @furnace/sdk/ while its PATH reading does not (the cooked text itself spells; refusal #1 L2-P-SPELLRAW)",
    tree: (real) => withFile(real, d1File("raw-begins"), 'export const where = "@furnace/sdk/../../x.js";\n'),
    added: [spellsLine(d1File("raw-begins"), "@furnace/sdk/../../x.js")],
  },
  "P-RAW-NM-START": {
    name: "a literal that opens with node_modules/@furnace/sdk/ while its PATH reading does not",
    tree: (real) => withFile(real, d1File("raw-nm-start"), 'export const where = "node_modules/@furnace/sdk/../../../x.js";\n'),
    added: [spellsLine(d1File("raw-nm-start"), "node_modules/@furnace/sdk/../../../x.js")],
  },
  "P-RAW-NM-AFTER": {
    name: "a literal that holds node_modules/@furnace/sdk/ after a / while its PATH reading does not",
    tree: (real) => withFile(real, d1File("raw-nm-after"), 'export const where = "../../node_modules/@furnace/sdk/../../../x.js";\n'),
    added: [spellsLine(d1File("raw-nm-after"), "../../node_modules/@furnace/sdk/../../../x.js")],
  },
  "P-RAW-HOLDS": {
    name: "a literal that holds @furnace/sdk/ while its PATH reading does not (the cooked text alone holds; refusal #1 L2-P-HOLDRAW)",
    tree: (real) => withFile(real, d1File("raw-holds"), 'export const note = "see @furnace/sdk/../x";\n'),
    added: [holdsLine(d1File("raw-holds"), "see @furnace/sdk/../x")],
  },
  "P-PATH-NM-START": {
    name: "a literal whose PATH reading alone opens with node_modules/@furnace/sdk/ (a tab inside it)",
    tree: (real) => withFile(real, d1File("path-nm-start"), 'export const where = "node_modules/@furnace/sd\\tk/dist/src/host_client.js";\n'),
    added: [spellsLine(d1File("path-nm-start"), `node_modules/@furnace/sd${TAB}k/dist/src/host_client.js`)],
  },
  "P-EMPTY2": {
    name: "a resolve load whose node_modules/@furnace/sdk/ two empty segments split (both must drop for it to spell)",
    tree: (real) => withFile(real, d1File("empty2"), 'export const where = import.meta.resolve("node_modules//@furnace//sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("empty2"), "node_modules//@furnace//sdk/dist/src/host_client.js")],
  },
  "P-DOT2": {
    name: "a resolve load whose node_modules/@furnace/sdk/ two . segments split (both must drop for it to spell)",
    tree: (real) => withFile(real, d1File("dot2"), 'export const where = import.meta.resolve("node_modules/./@furnace/./sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("dot2"), "node_modules/./@furnace/./sdk/dist/src/host_client.js")],
  },
  "P-DOTDOT2": {
    name: "a load spelled with two .. segments",
    tree: (real) => withFile(real, d1File("dotdot2"), 'export const loaded: unknown = await import("@furnace/a/../b/../sdk/dist/src/host_client.js");\n'),
    added: [spellsLine(d1File("dotdot2"), "@furnace/a/../b/../sdk/dist/src/host_client.js")],
  },

  // F-U1: DEEP's one module extension.
  "D-MULTI": {
    name: "a module named embedded.js.d.ts is not DEEP (only its one module extension is taken off): the WALK follows it (refusal #1 L2-D-MULTI)",
    tree: (real) => appended(addEntry(real, "package/dist/src/embedded.js.d.ts", 'export * from "./resident_session.js";\n'), TYPES, 'export * from "./embedded.js.d.ts";'),
    added: [walkLine("types", "star", RS, IDX_D, "dist/src/embedded.js.d.ts", RES_D)],
  },

  // F-U2: a computed literal name through two levels of parentheses, and a parenthesized template.
  "R-PARENS2": {
    name: "a second register method by a computed string literal through two levels of parentheses (refusal #1 L2-G-PARENS1)",
    tree: (real) => appended(real, EXECUTOR, shim('[(("register"))]()')),
    added: ["register computed-string"],
  },
  "R-PARENS-TEMPLATE": {
    name: "a second register method by a parenthesized computed no-substitution template literal",
    tree: (real) => appended(real, EXECUTOR, shim("[(`register`)]()")),
    added: ["register computed-template"],
  },

  // F-U3: two of each character RESOLUTION drops or decodes, a lower-case hex escape, a later ? and #, and its stated order.
  "S-TAB2": {
    name: "the main entry star-exports ./em<TAB>bed<TAB>ded.js (every ASCII tab dropped; refusal #1 L2-R-TAB1)",
    tree: (real) => appended(real, MAIN, 'export * from "./em\\tbed\\tded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-LF2": {
    name: "the main entry star-exports ./em<LF>bed<LF>ded.js (every LF dropped; refusal #1 L2-R-LF1)",
    tree: (real) => appended(real, MAIN, 'export * from "./em\\nbed\\nded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-CR2": {
    name: "the main entry star-exports ./em<CR>bed<CR>ded.js (every CR dropped; refusal #1 L2-R-CR1)",
    tree: (real) => appended(real, MAIN, 'export * from "./em\\rbed\\rded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-QUERY-FIRST": {
    name: "the main entry star-exports ./embedded.js?a?b (the query cut off from its first ?; refusal #1 L2-R-QLAST)",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded.js?a?b";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-FRAGMENT-FIRST": {
    name: "the main entry star-exports ./embedded.js#a#b (the fragment cut off from its first #; refusal #1 L2-R-FLAST)",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded.js#a#b";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-PCT2": {
    name: "the main entry star-exports ./%65mbedde%64.js (every %XX escape decoded; refusal #1 L2-R-PCT1)",
    tree: (real) => appended(real, MAIN, 'export * from "./%65mbedde%64.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-PCT-LOWER": {
    name: "the main entry star-exports ./embedded%2ejs (a lower-case hex escape; refusal #1 L2-R-PCT-UPPER)",
    tree: (real) => appended(real, MAIN, 'export * from "./embedded%2ejs";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-BACKSLASH3": {
    name: "the main entry star-exports .\\zz\\..\\embedded.js (every backslash read as /; refusal #1 L2-R-BS1)",
    tree: (real) => appended(real, MAIN, 'export * from ".\\\\zz\\\\..\\\\embedded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-ORDER-BSDEC": {
    name: "the main entry star-exports .%5Cembedded.js (decoded, then the backslash read as /; refusal #1 L2-R-ORD-BSDEC)",
    tree: (real) => appended(real, MAIN, 'export * from ".%5Cembedded.js";'),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "S-ORDER-DECODE": {
    name: "the main entry star-exports an encoded tab, an encoded ? and an encoded # (the drops and cuts precede the decode, so none resolves; refusal #1 L2-R-ORD-DECFIRST)",
    tree: (real) => appended(real, MAIN, 'export * from "./embed%09ded.js";', 'export * from "./embedded.js%3Fgate";', 'export * from "./embedded.js%23gate";'),
    added: [],
    twin: { tree: (real) => appended(real, MAIN, 'export * from "./embedded.js?gate";'), added: [walkLine("main", "star", EH, IDX_J, EMB_J)] },
  },

  // W: RESOLUTION's candidate order (each adjacent pair of a stated order present, the earlier taken), two . and two ..
  // segments, the WALK's reach (four followed modules), an exposure before a later statement, a second import declaration.
  "R-ORD-TS-TSX": {
    name: "a declaration file's .js path held both as .ts (which star-exports the embedded module) and as .tsx (which does not): the .ts is taken (refusal #1 L2-R-ORD-TSX)",
    tree: (real) => addEntry(hop(real, TYPES, "./zzw.js", "zzw.ts"), "package/dist/src/zzw.tsx", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzw.ts", EMB_J)],
  },
  "R-ORD-TSX-DTS": {
    name: "a declaration file's .js path held both as .tsx and as .d.ts: the .tsx is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzr.js", "zzr.tsx"), "package/dist/src/zzr.d.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzr.tsx", EMB_J)],
  },
  "R-ORD-JSX-TS-TSX": {
    name: "a declaration file's .jsx path held both as .ts and as .tsx: the .ts is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzq.jsx", "zzq.ts"), "package/dist/src/zzq.tsx", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzq.ts", EMB_J)],
  },
  "R-ORD-JSX-TSX-DTS": {
    name: "a declaration file's .jsx path held both as .tsx and as .d.ts: the .tsx is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzp.jsx", "zzp.tsx"), "package/dist/src/zzp.d.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzp.tsx", EMB_J)],
  },
  "R-ORD-MJS": {
    name: "a declaration file's .mjs path held both as .mts and as .d.mts: the .mts is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzn.mjs", "zzn.mts"), "package/dist/src/zzn.d.mts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzn.mts", EMB_J)],
  },
  "R-ORD-CJS": {
    name: "a declaration file's .cjs path held both as .cts and as .d.cts: the .cts is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzk.cjs", "zzk.cts"), "package/dist/src/zzk.d.cts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzk.cts", EMB_J)],
  },
  "R-ORD-NONE-TS-TSX": {
    name: "a declaration file's extensionless path held both as .ts and as .tsx: the .ts is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzj", "zzj.ts"), "package/dist/src/zzj.tsx", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzj.ts", EMB_J)],
  },
  "R-ORD-NONE-TSX-DTS": {
    name: "a declaration file's extensionless path held both as .tsx and as .d.ts: the .tsx is taken (refusal #1 L2-R-ORD-NOEXT-TSX)",
    tree: (real) => addEntry(hop(real, TYPES, "./zzv", "zzv.tsx"), "package/dist/src/zzv.d.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzv.tsx", EMB_J)],
  },
  "R-ORD-NONE-DTS-INDEX": {
    name: "a declaration file's extensionless path held both as .d.ts and as /index.ts: the .d.ts is taken (refusal #1 L2-R-ORD-NOEXT-IDX)",
    tree: (real) => addEntry(hop(real, TYPES, "./zzu", "zzu.d.ts"), "package/dist/src/zzu/index.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzu.d.ts", EMB_D)],
  },
  "R-ORD-NONE-INDEX-TSX": {
    name: "a declaration file's extensionless path held both as /index.ts and as /index.tsx: the /index.ts is taken (refusal #1 L2-R-ORD-IDX-TSX)",
    tree: (real) => addEntry(hop(real, TYPES, "./zzt", "zzt/index.ts", "../embedded.js"), "package/dist/src/zzt/index.tsx", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzt/index.ts", EMB_J)],
  },
  "R-ORD-NONE-INDEX-DTS": {
    name: "a declaration file's extensionless path held both as /index.tsx and as /index.d.ts: the /index.tsx is taken",
    tree: (real) => addEntry(hop(real, TYPES, "./zzi", "zzi/index.tsx", "../embedded.js"), "package/dist/src/zzi/index.d.ts", "export {};\n"),
    added: [walkLine("types", "star", EH, IDX_D, "dist/src/zzi/index.tsx", EMB_J)],
  },
  "R-ORD-JS-INDEX": {
    name: "a JavaScript file's extensionless path held both as .js and as /index.js: the .js is taken (refusal #1 L2-R-ORD-JSIDX)",
    tree: (real) => addEntry(hop(real, MAIN, "./zzs", "zzs.js"), "package/dist/src/zzs/index.js", "export {};\n"),
    added: [walkLine("main", "star", EH, IDX_J, "dist/src/zzs.js", EMB_J)],
  },
  "R-OWN-DOT2": {
    name: "the main entry star-exports the embedded module through the package's own name and two . segments",
    tree: (real) => appended(real, MAIN, `export * from "${SDK}/./dist/./src/embedded.js";`),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "R-OWN-DOTDOT2": {
    name: "the same through two .. segments",
    tree: (real) => appended(real, MAIN, `export * from "${SDK}/dist/a/../b/../src/embedded.js";`),
    added: [walkLine("main", "star", EH, IDX_J, EMB_J)],
  },
  "W-FOLLOW-DEEP": {
    name: "a chain of sixteen followed modules past the types entry, the last star-exporting the embedded module (every module the WALK reaches; refusal #1 L2-W-DEPTH)",
    tree: (real) =>
      appended(
        DEEP_CHAIN.reduce((tree, hop, index) => addEntry(tree, `package/${hop}`, `export * from "./${index + 1 < DEEP_CHAIN.length ? `zzh${index + 2}.js` : "embedded.js"}";\n`), real),
        TYPES,
        'export * from "./zzh1.js";',
      ),
    added: [walkLine("types", "star", EH, IDX_D, ...DEEP_CHAIN, EMB_D)],
  },
  "W-STATEMENTS": {
    name: "the types entry star-exports both DEEP modules in two statements before a later statement (each top-level statement is read)",
    tree: (real) => appended(real, TYPES, 'export * from "./embedded.js";', 'export * from "./resident_session.js";', "export declare const zztail: unique symbol;"),
    added: [walkLine("types", "star", EH, IDX_D, EMB_D), walkLine("types", "star", RS, IDX_D, RES_D)],
  },
  "W-LOCAL-SECOND": {
    name: "a starred module's local export of EmbeddedHost imported by its second import declaration (each import declaration is read)",
    tree: (real) => appended(real, PROTOCOL_D, 'import { ExecutionResult } from "./models.js";', 'import { EmbeddedHost } from "./embedded.js";', "export { EmbeddedHost };"),
    added: [walkLine("types", "local-import", EH, IDX_D, PROTO_D)],
  },

  // Q: the residuals' quiet rows.
  "Q-INDIRECT": {
    name: "R-INDEX-INDIRECT: a value and a type declared from the class, a default export of it, a module augmentation, a named re-export chain, a namespace import of a starring module and an import-equals, each exported",
    tree: (real) => {
      const declared = appended(real, PROTOCOL_D, 'import { EmbeddedHost } from "./embedded.js";', "export declare const Host: typeof EmbeddedHost;", "export default EmbeddedHost;");
      const valued = appended(declared, PROTOCOL_J, 'import { ResidentSession } from "./resident_session.js";', "export const Session = ResidentSession;");
      const augmented = appended(valued, PROTOCOL_D, `declare module "${SDK}" {`, `  export { EmbeddedHost } from "${SDK}/dist/src/embedded.js";`, "}");
      const chained = addEntry(addEntry(augmented, "package/dist/src/zzchain.d.ts", 'export { EmbeddedHost as Host } from "./embedded.js";\n'), "package/dist/src/zzstar.d.ts", 'export * from "./embedded.js";\n');
      return appended(chained, TYPES, 'export { Host } from "./zzchain.js";', 'import * as gatehost from "./zzstar.js";', "export { gatehost };", 'import H = require("./embedded.js");', "export { H };");
    },
    added: [],
    twin: { tree: (real) => appended(real, TYPES, 'export * from "./embedded.js";'), added: [walkLine("types", "star", EH, IDX_D, EMB_D)] },
  },
  "Q-SPECIFIER": {
    name: "R-WALK-SPECIFIER: a directory resolved through a nested package.json, a TypeScript-extension specifier whose file the tarball lacks, a bare specifier that is not the package's own name, and a trailing space",
    tree: (real) =>
      appended(addEntry(real, "package/dist/src/sub/package.json", '{ "types": "../embedded.d.ts" }\n'), TYPES, 'export * from "./sub";', 'export * from "./embedded.ts";', 'export * from "@furnace/sdk-gate/dist/src/embedded.js";', 'export * from "./embedded.js ";'),
    added: [],
    twin: { tree: (real) => appended(real, TYPES, 'export * from "./embedded";'), added: [walkLine("types", "star", EH, IDX_D, EMB_D)] },
  },
  "Q-PATH": {
    name: "R-PATH-UNREAD: a form feed inside the path, an encoded tab and a letter-case spelling",
    tree: (real) =>
      withFile(
        real,
        d1File("unread"),
        'export const fed = import.meta.resolve("../../node_modules/@furnace/sd\\fk/dist/src/host_client.js");\nexport const encoded = import.meta.resolve("../../node_modules/@furnace/sd%09k/dist/src/host_client.js");\nexport const folded = import.meta.resolve("@Furnace/SDK/dist/src/host_client.js");\n',
      ),
    added: [],
    twin: {
      tree: (real) => withFile(real, d1File("unread"), 'export const fed = import.meta.resolve("../../node_modules/@furnace/sd\\tk/dist/src/host_client.js");\n'),
      added: [spellsLine(d1File("unread"), `../../node_modules/@furnace/sd${TAB}k/dist/src/host_client.js`)],
    },
  },
  "Q-RENDER": {
    name: "R-RENDER-UNREAD: a record spelled through a character reference, and one split by a default-ignorable character",
    tree: (real) =>
      withReadme(
        real,
        `furnace-sdk-0.2.0.tgz was re-packaged on 2026-11-01 &#40;wb-zby) from Furnace revision abcdef0123.\n\nfurnace-sdk-0.2.0.tgz was re-pack${String.fromCodePoint(0x200b)}aged on 2026-11-01 (wb-zby) from Furnace revision abcdef0123.`,
      ),
    added: [],
    twin: { tree: (real) => withReadme(real, RECORD_LINE), added: [SECOND] },
  },
  "Q-REGISTER": {
    name: "R-REGISTER-UNREAD: register under a concatenated, a substituted and a const computed name, as a class field, an accessor and a private name",
    tree: (real) =>
      appended(
        real,
        EXECUTOR,
        'const REGISTER_KEY = "register";',
        "class ShimFields {",
        '  ["reg" + "ister"]() {',
        "    return this;",
        "  }",
        `  [\`reg\${"ister"}\`]() {`,
        "    return this;",
        "  }",
        "  [REGISTER_KEY]() {",
        "    return this;",
        "  }",
        "  register = function () {",
        "    return this;",
        "  };",
        "}",
        "class ShimAccessor {",
        "  get register() {",
        "    return this;",
        "  }",
        "  #register() {",
        "    return this;",
        "  }",
        "}",
      ),
    added: [],
    twin: { tree: (real) => appended(real, EXECUTOR, shim("register()")), added: ["register identifier"] },
  },
};

// ---- rows, the roster and the frozen literals -----------------------------------------------------------------------

type RowSource = "description" | "notes" | "claim" | "residuals";
interface Row {
  readonly id: string;
  readonly from: RowSource;
  readonly label: string;
  readonly judge: JudgeId;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "E-U1",
    from: "description",
    label:
      '- U1 entry-level named re-exports: identifier-escape spellings and string export names (export { X as Y } / export { "X" as Y } from ...), in index.d.ts, index.js and both, with ResidentSession and EmbeddedHost class names - each plant reds the unmodified census; the chain.length>1 hole closes or the claim names it.',
    judge: "d3",
    pins: [
      "E1-TYPES-ESC",
      "E1-TYPES-STR",
      "E1-MAIN-ESC",
      "E1-BOTH-ESC",
      "E1-RESIDENT-ESC",
      "E1-STR-HEX",
      "E1-STR-BRACE",
      "E1-MAIN-STR-U",
      "E1-MAIN-RES-ESC",
      "E1-MAIN-STR-LC",
      "E1-MAIN-STR-CHAR",
      "E1-PLAIN",
      "E1-TYPE-DECL",
      "E1-TYPE-SPEC",
      "E1-UNRESOLVED",
      "E1-TWO",
      "E1-TEXT-COMMENT",
      "E1-TEXT-LONGER",
      "E1-TEXT-ESCAPE",
      "E1-TEXT-WORDCHARS",
      "E1-TEXT-DOLLAR",
      "E1-TEXT-NONASCII",
      "E1-TEXT-MAIN",
    ],
  },
  {
    id: "E-U2",
    from: "description",
    label: "- U2 backslash hard-break rendered reading (the refusal's U2 member).",
    judge: "u1",
    pins: ["U2-BR-WBZBY", "U2-BR-REVISION", "U2-BR-EMPHASIS", "U2-BR-SPACES", "U2-LIST", "U2-TABLE", "U2-TABLE-HEAD", "U2-HEADING", "U2-QUOTE", "U2-EMPHASIS", "U2-STRONG", "U2-LINK", "U2-HTML", "U2-HTML-INLINE", "U2-DEF", "U2-IMAGE", "U2-LIST-SECOND", "U2-TABLE-HEAD-SECOND", "U2-TABLE-ROW-SECOND", "U2-TABLE-CELL-SECOND", "U2-RUNS", "U2-BR-SPACES3", "U2-QUOTE-SECOND", "U2-EMPHASIS-NESTED", "U2-STRONG-NESTED", "U2-LINK-NESTED"],
  },
  {
    id: "E-U3",
    from: "description",
    label: "- U3 resolver-normalized specifier reading for D1 (the refusal's U3 member).",
    judge: "d1",
    pins: ["P-RESOLVE-TAB", "P-RESOLVE-LF", "P-RESOLVE-CR", "P-URL-TAB", "P-PERCENT", "P-BACKSLASH", "P-EMPTY", "P-DOT", "P-DOTDOT", "P-BEGINS", "P-NM-START", "P-NM-AFTER", "P-HOLDS", "P-HOLDS-PATH", "P-TAB2", "P-LF2", "P-CR2", "P-PCT2", "P-PCT-LOWER", "P-ORDER-DECODE-NORM", "P-ORDER-BS-NORM", "P-ORDER-DROP-NORM", "P-ORDER-DECODE-BS", "P-RAW-BEGINS", "P-RAW-NM-START", "P-RAW-NM-AFTER", "P-RAW-HOLDS", "P-PATH-NM-START", "P-EMPTY2", "P-DOT2", "P-DOTDOT2"],
  },
  {
    id: "F-U1",
    from: "notes",
    label:
      "- U1 (DEEP-module TypeScript twin): deepModule (:808) classifies a target DEEP only for the .js entry or .d.[cm]ts declaration files, while the declared resolution order (:126-129, implemented :791-792) tries a .js path's .ts/.tsx BEFORE its .d.ts twin - so when the tarball carries a DEEP module's TypeScript twin, the walk treats it as ordinary and reads nothing. 7 in-memory forms read 0 findings (controls without the twin read 1); on the real tree only the PIN legs hold it (15|17) and the re-pinned census is fully green (0|32); a strict tsc 6.0.3 consumer resolves both the index export and the deep import to the twin. Cure: deepModule classifies the TypeScript twin as DEEP (resolution-order-consistent), or the WALK claim states the .js/.d.[cm]ts-only scope.",
    judge: "d3",
    pins: ["G1", "G2", "G3", "G4", "G5", "G6", "G1R", "G7", "D-NOEXT", "D-OTHER-DIR", "D-DTS", "D-DMTS", "D-DCTS", "D-MTS", "D-CTS", "D-JS", "D-JSX", "D-MJS", "D-CJS", "D-MULTI"],
  },
  {
    id: "F-U2",
    from: "notes",
    label: "- U2 (LOW, rides): D4's register-count read has no falsifier - add one or state it.",
    judge: "d4",
    pins: ["R-PLAIN", "R-STRING", "R-ID-ESC", "R-STR-ESC", "R-COMPUTED", "R-TEMPLATE", "R-PARENS", "R-CLASS-EXPR", "R-OBJECT", "R-PARENS2", "R-PARENS-TEMPLATE"],
  },
  {
    id: "F-U3",
    from: "notes",
    label: "- U3 (LOW, rides): the unresolved-specifier family members named in the refusal - cure or state.",
    judge: "d3",
    pins: ["S-TAB", "S-LF", "S-CR", "S-PCT", "S-PCT-NAMED", "S-QUERY-NAMED", "S-QUERY", "S-FRAGMENT", "S-BACKSLASH", "S-TAB2", "S-LF2", "S-CR2", "S-QUERY-FIRST", "S-FRAGMENT-FIRST", "S-PCT2", "S-PCT-LOWER", "S-BACKSLASH3", "S-ORDER-BSDEC", "S-ORDER-DECODE"],
  },
  {
    id: "W",
    from: "claim",
    label: "the WALK's and RESOLUTION's other listed forms (WALK_CLAIM, WALK_FORMS, RESOLUTION_CLAIM)",
    judge: "d3",
    pins: [
      "W-STAR-AS",
      "W-FOLLOW-STAR",
      "W-FOLLOW-STAR-AS",
      "W-NAMED-PAST",
      "W-NAMED-PAST-ALIAS",
      "W-LOCAL-IMPORT",
      "W-LOCAL-ALIAS",
      "W-LOCAL-TYPE",
      "W-LOCAL-TYPE-SPEC",
      "W-LOCAL-STRING",
      "W-LOCAL-NONDEEP",
      "W-LOCAL-DEFAULT",
      "W-LOCAL-NS",
      "W-DEEP-STOP",
      "W-LOCAL-TWO",
      "W-LOCAL-BOTH",
      "W-LOCAL-ESC",
      "W-COMMENT",
      "W-NESTED",
      "R-OWN",
      "R-OWN-DOT",
      "R-OWN-DOTDOT",
      "R-JOINED",
      "R-EXACT-DTS",
      "R-EXACT-TS",
      "R-EXACT-TSX",
      "R-EXACT-MTS",
      "R-EXACT-CTS",
      "R-JS-TS",
      "R-JS-TSX",
      "R-JS-DTS",
      "R-JSX",
      "R-JSX-TS",
      "R-JSX-TSX",
      "R-MJS-MTS",
      "R-MJS-DMTS",
      "R-CJS-CTS",
      "R-CJS-DCTS",
      "R-NONE-TS",
      "R-NONE-TSX",
      "R-NONE-DTS",
      "R-NONE-INDEX-TS",
      "R-NONE-INDEX-TSX",
      "R-JS-JS",
      "R-JS-INDEX",
      "R-ORDER",
      "R-ORD-TS-TSX",
      "R-ORD-TSX-DTS",
      "R-ORD-JSX-TS-TSX",
      "R-ORD-JSX-TSX-DTS",
      "R-ORD-MJS",
      "R-ORD-CJS",
      "R-ORD-NONE-TS-TSX",
      "R-ORD-NONE-TSX-DTS",
      "R-ORD-NONE-DTS-INDEX",
      "R-ORD-NONE-INDEX-TSX",
      "R-ORD-NONE-INDEX-DTS",
      "R-ORD-JS-INDEX",
      "R-OWN-DOT2",
      "R-OWN-DOTDOT2",
      "W-FOLLOW-DEEP",
      "W-STATEMENTS",
      "W-LOCAL-SECOND",
    ],
  },
  { id: "Q", from: "residuals", label: "the residuals' pinned quiet rows (RESIDUALS)", judge: "d3", pins: ["Q-INDIRECT", "Q-SPECIFIER", "Q-PATH", "Q-RENDER", "Q-REGISTER"] },
];
/** Each quiet plant's own judge (row Q mixes the four). */
const QUIET_JUDGE: Readonly<Record<string, JudgeId>> = { "Q-INDIRECT": "d3", "Q-SPECIFIER": "d3", "Q-PATH": "d1", "Q-RENDER": "u1", "Q-REGISTER": "d4" };
const judgeOf = (row: Row, pin: string): JudgeId => (row.id === "Q" ? (QUIET_JUDGE[pin] ?? row.judge) : row.judge);

/** The dropped item: the description's U4, answered by no row (the header's E-U4 DROPPED paragraph says why). */
const DROPPED: Readonly<Record<string, string>> = { "E-U4": "- U4 the note contact count (UNDETERMINED at refusal; measure and pin or drop)." };

/** The RESIDUALS families, each with its quiet plant (the header's RESIDUALS paragraph names the same pairs). */
const RESIDUALS: readonly string[] = ["R-INDEX-INDIRECT:Q-INDIRECT", "R-WALK-SPECIFIER:Q-SPECIFIER", "R-PATH-UNREAD:Q-PATH", "R-RENDER-UNREAD:Q-RENDER", "R-REGISTER-UNREAD:Q-REGISTER"];

/**
 * For every listed sub-form of every claim part, in claim order: the plants that prove it, and its mark - a pattern each of
 * those plants carries in what it adds against the real tree (an entry's added text, an added src/ file, the README's
 * added text, each after its path) or in the lines it reads, so a plant moved to another sub-form's list reds the CLAIM
 * ROSTER case.
 */
const SUBFORMS: readonly (readonly [string, string, readonly string[], RegExp])[] = [
  ["walk", "the types entry", ["E1-TYPES-ESC", "D-DTS"], /^walk types /m],
  ["walk", "the main entry", ["E1-MAIN-ESC", "D-JS"], /^walk main /m],
  ["walk", "following an export *", ["W-FOLLOW-STAR", "G5", "W-FOLLOW-DEEP"], /^walk \S+ star \S+ via (?:\S+ -> ){2,}\S+$/m],
  ["walk", "following an export * as", ["W-FOLLOW-STAR-AS"], /export \* as \w+ from [\s\S]*^walk \S+ star \S+ via (?:\S+ -> ){2,}\S+$/m],
  ["walk", "a module that is not DEEP", ["W-DEEP-STOP"], /embedded\.ts: export \* from "\.\/resident_session\.js";[\s\S]*^walk types star EmbeddedHost via \S+ -> dist\/src\/embedded\.ts$/m],
  ["walk", "top-level statements", ["W-NESTED", "W-STATEMENTS"], /declare module "[^"]+" \{\n {2}export \* from |export \* from "\.\/resident_session\.js";\nexport declare const /],
  ["walk", "comments never read", ["W-COMMENT"], /\/\/ export \* from /],
  ["walk", "the entry itself", ["E1-TYPES-ESC", "D-DTS", "W-LOCAL-NS"], /^walk \S+ (?:named|local-import|local-module) \S+ via dist\/src\/index\.(?:d\.ts|js)$|^walk \S+ star \S+ via dist\/src\/index\.(?:d\.ts|js) -> \S+$/m],
  ["walk", "every module it reaches", ["W-NAMED-PAST", "W-LOCAL-IMPORT", "G5", "W-FOLLOW-DEEP"], /^walk \S+ (?:named|local-import|local-module) \S+ via \S+ -> |^walk \S+ star \S+ via \S+ -> \S+ -> /m],
  ["star", "export * of a DEEP module", ["D-DTS", "D-JS", "G1"], /export \* from "[^"]+";[\s\S]*^walk \S+ star /m],
  ["star", "export * as of a DEEP module", ["W-STAR-AS", "G4", "G1R"], /export \* as \w+ from "[^"]+";[\s\S]*^walk \S+ star /m],
  ["named", "export { X } from", ["E1-TYPE-DECL", "E1-UNRESOLVED", "E1-TWO", "W-NAMED-PAST"], /export (?:type )?\{[^}]+\} from [\s\S]*^walk \S+ named /m],
  ["named", "aliased as another name", ["E1-PLAIN", "W-NAMED-PAST-ALIAS"], /export \{ \w+ as \w+ \} from /],
  ["named", "type-only by its declaration", ["E1-TYPE-DECL"], /export type \{ \w+ \} from /],
  ["named", "type-only by its specifier", ["E1-TYPE-SPEC"], /export \{ type \w+/],
  ["named", "an identifier", ["E1-PLAIN", "E1-TYPES-ESC"], /export \{ (?:\\u[0-9A-Fa-f]{4}|[A-Za-z])\w* as /],
  ["named", "a string export name", ["E1-TYPES-STR", "E1-MAIN-STR-U"], /export \{ "/],
  ["named", "an identifier escape", ["E1-TYPES-ESC", "E1-MAIN-ESC", "E1-BOTH-ESC", "E1-RESIDENT-ESC", "E1-MAIN-RES-ESC"], /export \{ [A-Za-z]*\\u/],
  ["named", "a string escape", ["E1-STR-HEX", "E1-STR-BRACE", "E1-MAIN-STR-U", "E1-MAIN-STR-LC", "E1-MAIN-STR-CHAR"], /export \{ "[^"]*\\/],
  ["named", "whatever its specifier resolves to", ["E1-UNRESOLVED", "S-PCT-NAMED", "S-QUERY-NAMED"], /\} from "[^"]*(?:missing|%|\?)[^"]*";/],
  ["local-import", "export { x }", ["W-LOCAL-IMPORT", "W-LOCAL-TWO", "W-LOCAL-SECOND"], /^export \{ \w+(?:, \w+)* \};$[\s\S]*^walk \S+ local-import /m],
  ["local-import", "aliased on export", ["W-LOCAL-ALIAS"], /^export \{ \w+ as \w+ \};$/m],
  ["local-import", "read cooked", ["W-LOCAL-ESC"], /import \{ \\u/],
  ["local-import", "the import aliased", ["W-LOCAL-ALIAS", "W-LOCAL-STRING"], /import \{ (?:type )?(?:\w+|"\w+") as \w+ \}/],
  ["local-import", "a type-only import declaration", ["W-LOCAL-TYPE"], /import type \{/],
  ["local-import", "a type-only import specifier", ["W-LOCAL-TYPE-SPEC"], /import \{ type /],
  ["local-import", "a string import name", ["W-LOCAL-STRING"], /import \{ "/],
  ["local-import", "from a module that is not DEEP", ["W-LOCAL-NONDEEP"], /import \{ \w+ \} from "\.\/models\.js";\nexport \{ \w+ \};/],
  ["local-module", "default import of a DEEP module", ["W-LOCAL-DEFAULT", "W-LOCAL-BOTH"], /^import \w+(?:, \* as \w+)? from "\.\/embedded\.js";$/m],
  ["local-module", "namespace import of a DEEP module", ["W-LOCAL-NS", "G3", "W-LOCAL-BOTH"], /import (?:\w+, )?\* as \w+ from "\.\/embedded\.js";/],
  ["resolution", "every ASCII tab dropped", ["S-TAB", "S-TAB2"], /export \* from "[^"]*\\t[^"]*";/],
  ["resolution", "every LF dropped", ["S-LF", "S-LF2"], /export \* from "[^"]*\\n[^"]*";/],
  ["resolution", "every CR dropped", ["S-CR", "S-CR2"], /export \* from "[^"]*\\r[^"]*";/],
  ["resolution", "a query cut off", ["S-QUERY", "S-QUERY-FIRST"], /export \* from "[^"]*\?[^"]*";/],
  ["resolution", "a fragment cut off", ["S-FRAGMENT", "S-FRAGMENT-FIRST"], /export \* from "[^"]*#[^"]*";/],
  ["resolution", "every %XX escape decoded", ["S-PCT", "S-PCT2", "S-PCT-LOWER", "S-ORDER-BSDEC", "S-ORDER-DECODE"], /export \* from "[^"]*%[0-9A-Fa-f]{2}[^"]*";/],
  ["resolution", "every backslash read as /", ["S-BACKSLASH", "S-BACKSLASH3", "S-ORDER-BSDEC"], /export \* from "[^"]*(?:\\\\|%5C)[^"]*";/],
  ["resolution", "relative", ["D-DTS", "D-JS"], /export \* from "\.\//],
  ["resolution", "joined to the naming module's directory", ["R-JOINED", "R-NONE-INDEX-TS", "R-JS-INDEX"], /export \* from "\.\.\//],
  ["resolution", "the package's own name", ["R-OWN"], /export \* from "@furnace\/sdk\//],
  ["resolution", ". segments dropped", ["R-OWN-DOT", "R-OWN-DOT2"], /export \* from "[^"]*\/\.\/[^"]*";/],
  ["resolution", ".. segments resolved", ["R-OWN-DOTDOT", "R-OWN-DOTDOT2"], /export \* from "@furnace\/sdk\/[^"]*\/\.\.\/[^"]*";/],
  [
    "resolution",
    "in order",
    [
      "R-ORDER",
      "G1",
      "R-ORD-TS-TSX",
      "R-ORD-TSX-DTS",
      "R-ORD-JSX-TS-TSX",
      "R-ORD-JSX-TSX-DTS",
      "R-ORD-MJS",
      "R-ORD-CJS",
      "R-ORD-NONE-TS-TSX",
      "R-ORD-NONE-TSX-DTS",
      "R-ORD-NONE-DTS-INDEX",
      "R-ORD-NONE-INDEX-TSX",
      "R-ORD-NONE-INDEX-DTS",
      "R-ORD-JS-INDEX",
    ],
    /package\/dist\/src\/(zz\w+)[./][\w./]*: [\s\S]*package\/dist\/src\/\1[./]|via \S+ -> dist\/src\/embedded\.ts$/m,
  ],
  ["resolution", "an exact TypeScript path", ["R-EXACT-DTS", "R-EXACT-TS"], /export \* from "[^"]*\.(?:d\.)?[cm]?tsx?";/],
  ["resolution", "an exact .ts", ["R-EXACT-TS"], /export \* from "[^"]*(?<!\.d)\.ts";/],
  ["resolution", "an exact .tsx", ["R-EXACT-TSX"], /export \* from "[^"]*\.tsx";/],
  ["resolution", "an exact .mts", ["R-EXACT-MTS"], /export \* from "[^"]*(?<!\.d)\.mts";/],
  ["resolution", "an exact .cts", ["R-EXACT-CTS"], /export \* from "[^"]*(?<!\.d)\.cts";/],
  ["resolution", "a declaration file's own path", ["R-EXACT-DTS"], /export \* from "[^"]*\.d\.ts";/],
  ["resolution", "a .js path", ["R-JS-TS", "G1", "R-ORD-TS-TSX"], /export \* from "[^"]*\.js";[\s\S]*^walk \S+ star \S+ via \S+ -> \S+(?<!\.d)\.ts(?: |$)/m],
  ["resolution", "then its .tsx", ["R-JS-TSX", "G2", "R-ORD-TS-TSX"], /export \* from "[^"]*\.js";[\s\S]*\.tsx: /],
  ["resolution", "then its .d.ts twin", ["R-JS-DTS", "D-DTS", "R-ORD-TSX-DTS"], /export \* from "[^"]*\.js";[\s\S]*(?<!\/index)\.d\.ts(?:: |$)/m],
  ["resolution", "a .jsx path", ["R-JSX"], /export \* from "[^"]*\.jsx";/],
  ["resolution", "the same three", ["R-JSX-TS", "R-JSX-TSX", "R-JSX", "R-ORD-JSX-TS-TSX", "R-ORD-JSX-TSX-DTS"], /export \* from "[^"]*\.jsx";/],
  ["resolution", "a .mjs path", ["R-MJS-MTS", "D-MTS"], /export \* from "[^"]*\.mjs";[\s\S]*(?<!\.d)\.mts(?:: |$)/m],
  ["resolution", "then its .d.mts twin", ["R-MJS-DMTS", "D-DMTS", "R-ORD-MJS"], /export \* from "[^"]*\.mjs";[\s\S]*\.d\.mts(?:: |$)/m],
  ["resolution", "a .cjs path", ["R-CJS-CTS", "D-CTS"], /export \* from "[^"]*\.cjs";[\s\S]*(?<!\.d)\.cts(?:: |$)/m],
  ["resolution", "then its .d.cts twin", ["R-CJS-DCTS", "D-DCTS", "R-ORD-CJS"], /export \* from "[^"]*\.cjs";[\s\S]*\.d\.cts(?:: |$)/m],
  ["resolution", "an extensionless path", ["R-NONE-TS", "G6", "R-ORD-NONE-TS-TSX"], /export \* from "\.\/\w+";[\s\S]*^walk \S+ star \S+ via \S+ -> \S+(?<!\.d)\.ts(?: |$)/m],
  ["resolution", "its .tsx", ["R-NONE-TSX", "R-ORD-NONE-TS-TSX", "R-ORD-NONE-TSX-DTS"], /export \* from "\.\/\w+";[\s\S]*\.tsx(?:: |$)/m],
  ["resolution", "its .d.ts", ["R-NONE-DTS", "R-ORD-NONE-TSX-DTS", "R-ORD-NONE-DTS-INDEX"], /export \* from "\.\/\w+";[\s\S]*(?<!\/index)\.d\.ts(?:: |$)/m],
  ["resolution", "its /index.ts", ["R-NONE-INDEX-TS", "R-ORD-NONE-DTS-INDEX", "R-ORD-NONE-INDEX-TSX"], /export \* from "\.\/\w+";[\s\S]*\/index\.ts(?:: |$)/m],
  ["resolution", "its /index.tsx", ["R-NONE-INDEX-TSX", "R-ORD-NONE-INDEX-TSX", "R-ORD-NONE-INDEX-DTS"], /export \* from "\.\/\w+";[\s\S]*\/index\.tsx(?:: |$)/m],
  ["resolution", "its /index.d.ts", ["R-JOINED", "R-ORD-NONE-INDEX-DTS"], /export \* from "\.\/\w+";[\s\S]*\/index\.d\.ts(?:: |$)/m],
  ["resolution", "the exact path", ["D-JS", "D-JSX"], /^walk main star \S+ via dist\/src\/index\.js -> dist\/src\/embedded\.jsx?$/m],
  ["resolution", "then its .js", ["R-JS-JS", "D-NOEXT"], /^export \* from "\.\/\w+";$[\s\S]*^walk main /m],
  ["resolution", "then its /index.js", ["R-JS-INDEX", "R-ORD-JS-INDEX"], /package\/dist\/src\/\w+\/index\.js: /],
  ["deep", "its one module extension", ["D-NOEXT", "D-MULTI"], /package\/dist\/src\/embedded(?:\.js\.d\.ts)?: /],
  ["deep", "a .d.ts", ["D-DTS"], / -> dist\/src\/embedded\.d\.ts$/m],
  ["deep", "a .d.mts", ["D-DMTS"], / -> dist\/src\/embedded\.d\.mts$/m],
  ["deep", "a .d.cts", ["D-DCTS"], / -> dist\/src\/embedded\.d\.cts$/m],
  ["deep", "a .ts", ["G1", "G3", "G4", "G6"], /package\/dist\/src\/embedded\.ts: /],
  ["deep", "a .tsx", ["G2"], /package\/dist\/src\/embedded\.tsx: /],
  ["deep", "a .mts", ["D-MTS"], / -> dist\/src\/embedded\.mts$/m],
  ["deep", "a .cts", ["D-CTS"], / -> dist\/src\/embedded\.cts$/m],
  ["deep", "a .js", ["D-JS"], / -> dist\/src\/embedded\.js$/m],
  ["deep", "a .jsx", ["D-JSX"], / -> dist\/src\/embedded\.jsx$/m],
  ["deep", "a .mjs", ["D-MJS"], / -> dist\/src\/embedded\.mjs$/m],
  ["deep", "a .cjs", ["D-CJS"], / -> dist\/src\/embedded\.cjs$/m],
  ["deep", "a DEEP row's path", ["D-OTHER-DIR"], /package\/dist\/src\/sub\/embedded\.d\.ts: /],
  ["deep", "its TypeScript twin", ["G1", "G2", "G3", "G4", "G5", "G6", "G1R", "G7"], /package\/dist\/src\/(?:embedded|resident_session)\.tsx?: /],
  ["deep", "the row's names", ["G5", "G1R", "W-STAR-AS"], /^walk \S+ star ResidentSession /m],
  ["text", "the types entry's", ["E1-PLAIN", "E1-TEXT-COMMENT"], /^text types /m],
  ["text", "the main entry's", ["E1-TEXT-MAIN"], /^text main /m],
  ["text", "a name in its code", ["E1-PLAIN", "E1-TYPES-STR"], /^export [^\n]*EmbeddedHost[^\n]*$[\s\S]*^text types EmbeddedHost$/m],
  ["text", "a name in a comment", ["E1-TEXT-COMMENT", "E1-TEXT-MAIN"], /^\/\/ \w+ stays a deep import$[\s\S]*^text \w+ \w+$/m],
  ["text", "escape sequences never decoded", ["E1-TEXT-ESCAPE", "E1-TYPES-ESC"], /\\u0045mbeddedHost/],
  ["text", "an ASCII letter", ["E1-TEXT-LONGER", "E1-TEXT-WORDCHARS"], /[A-Za-z]EmbeddedHost|EmbeddedHost[A-Za-z]/],
  ["text", "a digit", ["E1-TEXT-WORDCHARS"], /\dEmbeddedHost|EmbeddedHost\d/],
  ["text", "an underscore", ["E1-TEXT-WORDCHARS"], /_EmbeddedHost|EmbeddedHost_/],
  ["text", "just before it", ["E1-TEXT-WORDCHARS"], /\wEmbeddedHost/],
  ["text", "just after it", ["E1-TEXT-LONGER", "E1-TEXT-WORDCHARS"], /EmbeddedHost\w/],
  ["text", "a $", ["E1-TEXT-DOLLAR"], /\$EmbeddedHost[\s\S]*^text types EmbeddedHost$/m],
  ["text", "a non-ASCII letter", ["E1-TEXT-NONASCII"], /\u00e9EmbeddedHost[\s\S]*^text types EmbeddedHost$/m],
  ["path", "every ASCII tab dropped", ["P-RESOLVE-TAB", "P-URL-TAB", "P-HOLDS-PATH", "P-TAB2"], /"[^"\n]*\\t[^"\n]*"/],
  ["path", "every LF dropped", ["P-RESOLVE-LF", "P-LF2"], /"[^"\n]*\\n[^"\n]*"/],
  ["path", "every CR dropped", ["P-RESOLVE-CR", "P-CR2"], /"[^"\n]*\\r[^"\n]*"/],
  ["path", "every %XX escape decoded", ["P-PERCENT", "P-PCT2", "P-PCT-LOWER", "P-ORDER-DECODE-NORM"], /"[^"\n]*%[0-9A-Fa-f]{2}[^"\n]*"/],
  ["path", "every backslash read as /", ["P-BACKSLASH", "P-ORDER-BS-NORM", "P-ORDER-DECODE-BS"], /"[^"\n]*(?:\\\\|%5C)[^"\n]*"/],
  ["path", "empty segments dropped", ["P-EMPTY", "P-EMPTY2"], /@furnace\/\/sdk\//],
  ["path", ". segments dropped", ["P-DOT", "P-DOT2"], /@furnace\/\.\/sdk\//],
  ["path", ".. segments resolved", ["P-DOTDOT", "P-DOTDOT2", "P-ORDER-DROP-NORM"], /"@furnace\/(?:\w+\/\.(?:\\t)?\.\/)+sdk\//],
  ["path", "the cooked text itself", ["P-RAW-BEGINS", "P-RAW-NM-START", "P-RAW-NM-AFTER"], /^spells \S+ "[^"]*\/sdk\/(?:\.\.\/)+x\.js"$/m],
  ["path", "its PATH reading", ["P-RESOLVE-TAB", "P-EMPTY", "P-PATH-NM-START"], /^spells \S+ "(?![^"]*@furnace\/sdk\/)[^"]*"$/m],
  ["path", "begins with @furnace/sdk/", ["P-BEGINS"], /^spells \S+ "@furnace\/sdk\//m],
  ["path", "node_modules/@furnace/sdk/ at its start", ["P-NM-START"], /^spells \S+ "node_modules\/@furnace\/sdk\//m],
  ["path", "node_modules/@furnace/sdk/ after a /", ["P-NM-AFTER"], /^spells \S+ "[^"]*\/node_modules\/@furnace\/sdk\//m],
  ["path", "holds @furnace/sdk/ anywhere", ["P-HOLDS", "P-HOLDS-PATH", "P-RAW-HOLDS"], /^holds /m],
  ["render", "whitespace collapsed", ["U2-BR-WBZBY", "U2-BR-SPACES"], /2026-11-01(?:\\| {2,})\n\(wb-zby\)/],
  ["render", "every run one space", ["U2-RUNS"], /re-packaged {2,}on 2026-11-01\n\(wb-zby\) from Furnace \t revision/],
  ["render", "a backslash before a line ending", ["U2-BR-WBZBY", "U2-BR-REVISION", "U2-BR-EMPHASIS"], /\\\n/],
  ["render", "two or more spaces before a line ending", ["U2-BR-SPACES", "U2-BR-SPACES3"], /\S {2,}\n/],
  ["render", "a list", ["U2-LIST", "U2-LIST-SECOND"], /^- /m],
  ["render", "its items' tokens", ["U2-LIST-SECOND"], /^- other\n- furnace-sdk-0\.2\.0\.tgz /m],
  ["render", "a table", ["U2-TABLE", "U2-TABLE-HEAD"], /^\| --- \|$/m],
  ["render", "header cells' tokens", ["U2-TABLE-HEAD", "U2-TABLE-HEAD-SECOND"], /^\|[^\n]*furnace-sdk-0\.2\.0\.tgz[^\n]*\|\n\| --- /m],
  ["render", "row cells' tokens", ["U2-TABLE", "U2-TABLE-ROW-SECOND", "U2-TABLE-CELL-SECOND"], /^\| --- [^\n]*\n(?:\|[^\n]*\n)*\|[^\n]*furnace-sdk-0\.2\.0\.tgz/m],
  ["render", "a paragraph", ["U2-EMPHASIS", "U2-STRONG", "U2-LINK"], /vendor\/README\.md: \nfurnace-sdk-0\.2\.0\.tgz was /],
  ["render", "a heading", ["U2-HEADING"], /^## furnace-sdk/m],
  ["render", "a blockquote", ["U2-QUOTE", "U2-QUOTE-SECOND"], /^> /m],
  ["render", "emphasis", ["U2-EMPHASIS", "U2-BR-EMPHASIS", "U2-EMPHASIS-NESTED"], /(?<![*_])[*_]re-/],
  ["render", "strong text", ["U2-STRONG", "U2-STRONG-NESTED"], /(?:\*\*|__)re-/],
  ["render", "a link", ["U2-LINK", "U2-LINK-NESTED"], /\[re-[^\]]*\]\(https:\/\/example\.invalid\/r\)/],
  ["render", "by those tokens", ["U2-EMPHASIS", "U2-HEADING", "U2-QUOTE-SECOND", "U2-EMPHASIS-NESTED", "U2-STRONG-NESTED", "U2-LINK-NESTED"], /[*_]re-|\[re-|^> other$/m],
  ["render", "raw HTML", ["U2-HTML", "U2-HTML-INLINE"], /<!-- |<b>/],
  ["render", "an HTML block", ["U2-HTML"], /^<!-- /m],
  ["render", "inline HTML", ["U2-HTML-INLINE"], /<b>\(wb-zby\)<\/b>/],
  ["render", "a link-reference definition", ["U2-DEF"], /^\[gate\]: /m],
  ["render", "an image", ["U2-IMAGE"], /^!\[/m],
  ["register", "in a class", ["R-PLAIN", "R-CLASS-EXPR"], /\bclass(?: \w+)? \{\n {2,4}register\(\) \{/],
  ["register", "in an object literal", ["R-OBJECT"], /= \{\n {2}register\(\) \{/],
  ["register", "an identifier name", ["R-PLAIN"], /^ {2}register\(\) \{$[\s\S]*^register identifier$/m],
  ["register", "a string-literal name", ["R-STRING"], /^ {2}"register"\(\) \{$[\s\S]*^register string$/m],
  ["register", "an identifier escape", ["R-ID-ESC"], /^ {2}\\u0072egister\(\) \{$[\s\S]*^register identifier$/m],
  ["register", "a string escape", ["R-STR-ESC"], /^ {2}"regist\\x65r"\(\) \{$[\s\S]*^register string$/m],
  ["register", "a computed name", ["R-COMPUTED", "R-TEMPLATE", "R-PARENS"], /^ {2}\[[^\]\n]+\]\(\) \{$[\s\S]*^register computed-(?:string|template)$/m],
  ["register", "through parentheses", ["R-PARENS", "R-PARENS2", "R-PARENS-TEMPLATE"], /^ {2}\[\(+["`]register["`]\)+\]\(\) \{$/m],
  ["register", "a computed string literal", ["R-COMPUTED"], /^ {2}\["register"\]\(\) \{$[\s\S]*^register computed-string$/m],
  ["register", "a computed no-substitution template literal", ["R-TEMPLATE", "R-PARENS-TEMPLATE"], /^ {2}\[\(*`register`\)*\]\(\) \{$[\s\S]*^register computed-template$/m],
];

/** Each row's id and pin count, frozen at this cut (PAGES' key order, every plant in ROWS order, freezes the pin ids). */
const FROZEN_SHAPE = ["E-U1:23", "E-U2:26", "E-U3:31", "F-U1:20", "F-U2:11", "F-U3:19", "W:63", "Q:5"] as const;
/** The header labels of the claim parts' paragraphs, in CLAIM_PARTS order. */
const CLAIM_LABELS: Readonly<Record<string, string>> = {
  walk: "WALK",
  star: "WALK FORM (1) star",
  named: "WALK FORM (2) named",
  "local-import": "WALK FORM (3) local-import",
  "local-module": "WALK FORM (4) local-module",
  resolution: "RESOLUTION",
  deep: "DEEP",
  text: "ENTRY TEXT READ",
  path: "PATH READING",
  render: "RENDERED",
  register: "REGISTER METHODS",
};
/** Each judge's reading of the real tree, as measured at this cut. */
const REAL_READINGS: Readonly<Record<JudgeId, readonly string[]>> = {
  d3: [],
  d1: [spellsLine("src/workbench/hosts/furnace-hosted.ts", `${SDK}/dist/src/embedded.js`), spellsLine("src/workbench/hosts/furnace-hosted.ts", `${SDK}/dist/src/resident_session.js`)],
  u1: ["record furnace-sdk-0.1.0.tgz 2026-10-17 9970621d8"],
  d4: ["register identifier"],
};
/** Each plant's page digest (sha256/16 of the entries, files and README text it and its twin change), frozen at this cut. */
const PAGES: Readonly<Record<string, string>> = {
  "E1-TYPES-ESC": "94f593832af4a704",
  "E1-TYPES-STR": "8843c085868c90a4",
  "E1-MAIN-ESC": "9db647ecca35d3d2",
  "E1-BOTH-ESC": "1f1ff027168f6a62",
  "E1-RESIDENT-ESC": "d80d8e353f5193f9",
  "E1-STR-HEX": "0cb203e7de04a954",
  "E1-STR-BRACE": "61e97c45c77e2380",
  "E1-MAIN-STR-U": "402cee5e9512cd68",
  "E1-MAIN-RES-ESC": "79ac89df8ad38eb0",
  "E1-MAIN-STR-LC": "f365c2709f7c4515",
  "E1-MAIN-STR-CHAR": "72f2e6717257a6a5",
  "E1-PLAIN": "7710f18742b60003",
  "E1-TYPE-DECL": "3131e3fdb821b13a",
  "E1-TYPE-SPEC": "f598f297dfec166a",
  "E1-UNRESOLVED": "527dbe6f6e2ffa28",
  "E1-TWO": "a200e93eeff210f8",
  "E1-TEXT-COMMENT": "e1d1ddae2fa518ad",
  "E1-TEXT-LONGER": "fdfa98b2be5bd4b7",
  "E1-TEXT-ESCAPE": "f134be5924a94079",
  "E1-TEXT-WORDCHARS": "92c2f7e6ca32b24d",
  "E1-TEXT-DOLLAR": "90da3335898579c3",
  "E1-TEXT-NONASCII": "8cbcdae7e7077007",
  "E1-TEXT-MAIN": "0ccc856a6a130381",
  "U2-BR-WBZBY": "43d19beaa985f656",
  "U2-BR-REVISION": "f9c449db53aafc83",
  "U2-BR-EMPHASIS": "abe2a5dc34144781",
  "U2-BR-SPACES": "0962c74d0f05282c",
  "U2-LIST": "df4061e41430982d",
  "U2-TABLE": "d2bd702cc46f32a7",
  "U2-TABLE-HEAD": "04fa15f9ffc7a695",
  "U2-HEADING": "5627255554fd4a33",
  "U2-QUOTE": "7c2acf18e7052943",
  "U2-EMPHASIS": "aa262a89e3353294",
  "U2-STRONG": "c2ab08cf4a00837b",
  "U2-LINK": "1258497c949b0c74",
  "U2-HTML": "f3b88ab9e03a7630",
  "U2-HTML-INLINE": "6f31918e3f1b83ee",
  "U2-DEF": "d6e86c249729c7e4",
  "U2-IMAGE": "1cf7bdb28bf7b348",
  "U2-LIST-SECOND": "565f26300d205108",
  "U2-TABLE-HEAD-SECOND": "1fd65c03db3142af",
  "U2-TABLE-ROW-SECOND": "fea02a1150e65fe3",
  "U2-TABLE-CELL-SECOND": "a3fcc3022360665d",
  "U2-RUNS": "f87505520129a23f",
  "U2-BR-SPACES3": "236afc6607b3c2d9",
  "U2-QUOTE-SECOND": "a318426827dcbefe",
  "U2-EMPHASIS-NESTED": "3f32bdb3aea2c255",
  "U2-STRONG-NESTED": "f5dbc56cfb315cce",
  "U2-LINK-NESTED": "3358ae5eefd558a5",
  "P-RESOLVE-TAB": "a8ca4f775c04c596",
  "P-RESOLVE-LF": "95699034de8657d8",
  "P-RESOLVE-CR": "7f8f5bc711533181",
  "P-URL-TAB": "388b76902ca406cc",
  "P-PERCENT": "f9b42dfde882c837",
  "P-BACKSLASH": "20a59c0f5364b0bb",
  "P-EMPTY": "26314c66c043f701",
  "P-DOT": "7286447b1de06d2b",
  "P-DOTDOT": "cd8cfe0d3416870b",
  "P-BEGINS": "1e7c7ab85a72d3b8",
  "P-NM-START": "e0e1ac558fc38cfa",
  "P-NM-AFTER": "876c82cac552d468",
  "P-HOLDS": "b9c4e4a3f58f5e65",
  "P-HOLDS-PATH": "5da8f6a6b330deda",
  "P-TAB2": "aaebb39d41e01461",
  "P-LF2": "ba639f5c2c0c8e20",
  "P-CR2": "d310b3d8e5b0c36c",
  "P-PCT2": "8906763d4077e90f",
  "P-PCT-LOWER": "01343e2a79a050e2",
  "P-ORDER-DECODE-NORM": "dfd83b1ac0d6c374",
  "P-ORDER-BS-NORM": "a37d4f85189e566f",
  "P-ORDER-DROP-NORM": "b4901efbb804e602",
  "P-ORDER-DECODE-BS": "04cfd9abf4e008ff",
  "P-RAW-BEGINS": "17db53187c8c693c",
  "P-RAW-NM-START": "18e66421c9ed4b0d",
  "P-RAW-NM-AFTER": "5d9e757c4fcb0e1f",
  "P-RAW-HOLDS": "b9d52dc7995ecade",
  "P-PATH-NM-START": "fb33b6938ece139a",
  "P-EMPTY2": "0cddf8ff13c08ea2",
  "P-DOT2": "8f2054da696c8ae7",
  "P-DOTDOT2": "6000aa9d91e6bd5e",
  "G1": "5417ae1fb2b60462",
  "G2": "dd2ed5097f8b9f3f",
  "G3": "aea2b8ab2389aac5",
  "G4": "1472701c507d374f",
  "G5": "adbb63f845ceb2a7",
  "G6": "2583ebd9f3d3fc6e",
  "G1R": "08f573ade078ba4e",
  "G7": "8fef539ce04a248f",
  "D-NOEXT": "99c86f7b3a142447",
  "D-OTHER-DIR": "678006c07383b524",
  "D-DTS": "33f842e0683f8594",
  "D-DMTS": "2d9fbd285395c406",
  "D-DCTS": "20bd81fe82057a19",
  "D-MTS": "cdd6528c493910f0",
  "D-CTS": "98931e1c45840b2d",
  "D-JS": "1680fcf0507a7ff7",
  "D-JSX": "d2aba07cc58d7546",
  "D-MJS": "75b60b508fbc96a1",
  "D-CJS": "ced47d96e70715f0",
  "D-MULTI": "97f1ccd7136e0cbd",
  "R-PLAIN": "747eea4e7c7c5fe6",
  "R-STRING": "5b3241009106e16b",
  "R-ID-ESC": "b2d521a49f58b284",
  "R-STR-ESC": "22ab0092606402dc",
  "R-COMPUTED": "5f098d02c90b3b71",
  "R-TEMPLATE": "ff00d816f039852e",
  "R-PARENS": "1d6e38a54b6a8ee7",
  "R-CLASS-EXPR": "b5061a3af27ab264",
  "R-OBJECT": "94eca06d562dc7d3",
  "R-PARENS2": "d5859ff046fc607c",
  "R-PARENS-TEMPLATE": "cb2f521d0387cc88",
  "S-TAB": "9e6153405c43eee8",
  "S-LF": "cfdb664a7af7d292",
  "S-CR": "4abb6c1fe3ec1ecc",
  "S-PCT": "0bd957244bf5a7ff",
  "S-PCT-NAMED": "0eac38fc3da484a0",
  "S-QUERY-NAMED": "4a9fec24676c328d",
  "S-QUERY": "94682b64a5ba82e9",
  "S-FRAGMENT": "b68a426962750efb",
  "S-BACKSLASH": "47735211aabe17cf",
  "S-TAB2": "d96447aa0d46bb2f",
  "S-LF2": "04399e47a6cf6c01",
  "S-CR2": "c75ded785809da60",
  "S-QUERY-FIRST": "0041ba357878a516",
  "S-FRAGMENT-FIRST": "b9fedb68ab7edfe9",
  "S-PCT2": "4430bd0aedaa7383",
  "S-PCT-LOWER": "63db89af68dcd048",
  "S-BACKSLASH3": "093516c4a471f801",
  "S-ORDER-BSDEC": "ce83acc256948224",
  "S-ORDER-DECODE": "ab0f5a7cc83e2b29",
  "W-STAR-AS": "898c640c15f3a59a",
  "W-FOLLOW-STAR": "5edbb2ef10259307",
  "W-FOLLOW-STAR-AS": "e2d926fdc7301aeb",
  "W-NAMED-PAST": "dece0e58ddda1428",
  "W-NAMED-PAST-ALIAS": "8ae71f5de337e38e",
  "W-LOCAL-IMPORT": "caa285fe3574d7e3",
  "W-LOCAL-ALIAS": "0499a74cf4c672e0",
  "W-LOCAL-TYPE": "1c7dda4c2c22d398",
  "W-LOCAL-TYPE-SPEC": "93c60ee711027e9c",
  "W-LOCAL-STRING": "bf567c9ee9486d07",
  "W-LOCAL-NONDEEP": "6e224040e1f57f55",
  "W-LOCAL-DEFAULT": "f4482fb727ba7aa0",
  "W-LOCAL-NS": "2ad47668525f1771",
  "W-DEEP-STOP": "722f58eb158b2d82",
  "W-LOCAL-TWO": "acd1afaf786fb710",
  "W-LOCAL-BOTH": "9bb862d29b2eb9c7",
  "W-LOCAL-ESC": "9ac91ee73c30d239",
  "W-COMMENT": "8d7c1cfc54fd5320",
  "W-NESTED": "54ce876e6482ec0b",
  "R-OWN": "46d8b00f7c157ce2",
  "R-OWN-DOT": "3862c53f8c72ca27",
  "R-OWN-DOTDOT": "32a4235b73c71125",
  "R-JOINED": "65ad30464d3da60c",
  "R-EXACT-DTS": "b5368e95d1ea62f0",
  "R-EXACT-TS": "f2eb50d648804606",
  "R-EXACT-TSX": "be08004a6cc8dfd1",
  "R-EXACT-MTS": "80702194df9bc7bb",
  "R-EXACT-CTS": "9755a490c9a59edd",
  "R-JS-TS": "777bc0388d51fae5",
  "R-JS-TSX": "dac88cb990c22ed9",
  "R-JS-DTS": "b0febbf0a45fb1f0",
  "R-JSX": "df8dab065ec6f6e2",
  "R-JSX-TS": "0f1c70f60a9ecd84",
  "R-JSX-TSX": "bb1cac57b7f6f4d0",
  "R-MJS-MTS": "413a2f9f53e15867",
  "R-MJS-DMTS": "b8a9939f62793631",
  "R-CJS-CTS": "0615780bad523ba9",
  "R-CJS-DCTS": "61626a1deb79959b",
  "R-NONE-TS": "ac32c19a9763fa42",
  "R-NONE-TSX": "42a5f3f9f89bfca0",
  "R-NONE-DTS": "393372f50f9b57c4",
  "R-NONE-INDEX-TS": "943ef7e1f6011fe1",
  "R-NONE-INDEX-TSX": "52f6e25963ae69f5",
  "R-JS-JS": "dd3dce84907ff3d5",
  "R-JS-INDEX": "5cb1455397565bcc",
  "R-ORDER": "07df7f9805425761",
  "R-ORD-TS-TSX": "6d2b8a2aa030997d",
  "R-ORD-TSX-DTS": "881dac637584d09b",
  "R-ORD-JSX-TS-TSX": "0778b3d3ff103f92",
  "R-ORD-JSX-TSX-DTS": "accd980c7a5fc6a2",
  "R-ORD-MJS": "daa840d0ec6a5840",
  "R-ORD-CJS": "1d6faaaa58cf5660",
  "R-ORD-NONE-TS-TSX": "91141a0e46697906",
  "R-ORD-NONE-TSX-DTS": "923f5799f73c32db",
  "R-ORD-NONE-DTS-INDEX": "9b3eedcd2368f283",
  "R-ORD-NONE-INDEX-TSX": "c3286e2287562ad2",
  "R-ORD-NONE-INDEX-DTS": "a858c9b60d78d1d5",
  "R-ORD-JS-INDEX": "4035ce19fbb537b0",
  "R-OWN-DOT2": "99745cc7e6461eff",
  "R-OWN-DOTDOT2": "86c464d8bbaa3a23",
  "W-FOLLOW-DEEP": "669b55608911eb14",
  "W-STATEMENTS": "30525a58473202c7",
  "W-LOCAL-SECOND": "a8ba2dde6c8b29cb",
  "Q-INDIRECT": "d9b14d62cbf925b1",
  "Q-SPECIFIER": "f4e476325adeb73f",
  "Q-PATH": "66eb94d9cf0dc889",
  "Q-RENDER": "e357eb9aebb9e45c",
  "Q-REGISTER": "a699b95ca45fa1b8",
};

const REAL = readTree();
// Warm the parse cache at collection, so no case pays for parsing every script under its timeout.
for (const judge of Object.values(JUDGES)) judge(REAL);

const sha16 = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
/** What a planted tree changes against the real tree: its changed or added tarball entries and src files, and its README. */
function pageOf(tree: Tree): string {
  const tarball = [...tree.tarball].filter(([path, text]) => REAL.tarball.get(path) !== text);
  const files = [...tree.files].filter(([file, text]) => REAL.files.get(file) !== text);
  return JSON.stringify({ tarball, files, readme: tree.readme === REAL.readme ? null : tree.readme.slice(REAL.readme.length) });
}
const plantPage = (plant: Plant): string => sha16(JSON.stringify([pageOf(plant.tree(REAL)), plant.twin === undefined ? null : pageOf(plant.twin.tree(REAL))]));
/** What a plant adds against the real tree - each changed or added entry's added text, each added src/ file and the README's
 * added text, each after its path - and the lines it and its twin read: the text a sub-form's mark is matched against. */
function evidenceOf(plant: Plant): string {
  const tree = plant.tree(REAL);
  const entries = [...tree.tarball].flatMap(([path, text]) => {
    const real = REAL.tarball.get(path);
    if (real === text) return [];
    return [`${path}: ${real !== undefined && text.startsWith(real) ? text.slice(real.length) : text}`];
  });
  const files = [...tree.files].flatMap(([file, text]) => (REAL.files.get(file) === text ? [] : [`${file}: ${text}`]));
  const readme = tree.readme === REAL.readme ? [] : [`vendor/README.md: ${tree.readme.slice(REAL.readme.length)}`];
  return [...entries, ...files, ...readme, ...plant.added, ...(plant.twin?.added ?? [])].join("\n");
}

// ---- the outside anchor, the header and each-liveness -------------------------------------------------------------

/** The bead's own row of the tracker export: its description and notes. */
function beadRow(): { readonly description: string; readonly notes: string } {
  const text = readFileSync(join(REPO, EXPORT), "utf8");
  const key = `"id":"${BEAD}"`;
  const at = text.indexOf(key);
  if (at < 0 || text.indexOf(key, at + key.length) >= 0) throw new Error(`${EXPORT} must hold exactly one ${BEAD} row`);
  const end = text.indexOf("\n", at);
  const row: unknown = JSON.parse(text.slice(text.lastIndexOf("\n", at) + 1, end < 0 ? text.length : end));
  if (!isRecord(row) || row.id !== BEAD || typeof row.description !== "string") throw new Error(`${EXPORT}'s ${BEAD} row carries no description`);
  return { description: row.description, notes: typeof row.notes === "string" ? row.notes : "" };
}
/** The items ("- U<n> ..." lines) after the one line opening (or holding) `marker`, up to the next line opening "Acceptance:"; a second marker line is refused. */
function itemsAfter(text: string, marker: (line: string) => boolean, prefix: string): { readonly items: readonly (readonly [string, string])[]; readonly problems: readonly string[] } {
  const lines = text.split("\n");
  const markers = lines.flatMap((line, index) => (marker(line) ? [index] : []));
  if (markers.length !== 1) return { items: [], problems: [`${prefix}: ${markers.length} marker lines, not one`] };
  const items: (readonly [string, string])[] = [];
  for (const line of lines.slice((markers[0] ?? 0) + 1)) {
    if (line.startsWith("Acceptance:")) return { items, problems: [] };
    const id = /^- (U\d+) /.exec(line)?.[1];
    if (id !== undefined) items.push([`${prefix}-${id}`, line]);
  }
  return { items, problems: [`${prefix}: no Acceptance: line closes the items`] };
}
/** The bead's enumerated items: the description's (E-U<n>) and the notes' FOLDED MEMBERS (F-U<n>). */
function anchorItems(row: { readonly description: string; readonly notes: string }): { readonly items: readonly (readonly [string, string])[]; readonly problems: readonly string[] } {
  const described = itemsAfter(row.description, (line) => line.includes("Enumerated items (each owing an executable falsifier):"), "E");
  const folded = itemsAfter(row.notes, (line) => line.startsWith("FOLDED MEMBERS from the refused cut"), "F");
  return { items: [...described.items, ...folded.items], problems: [...described.problems, ...folded.problems] };
}
/** This file's leading doc comment, each line's leader removed. */
function headerLines(): string[] {
  const text = readFileSync(join(REPO, SELF), "utf8");
  const end = text.indexOf("*/");
  if (!text.startsWith("/**") || end < 0) throw new Error(`${SELF} opens with no header`);
  return text
    .slice(3, end)
    .split("\n")
    .map((line) => line.replace(/^ \* ?/, "").replace(/^ \*$/, ""));
}
/** A header paragraph, unwrapped: from the line opening `opening` to the next empty line, joined by single spaces. */
function headerParagraph(opening: string): string {
  const lines = headerLines();
  const starts = lines.flatMap((line, index) => (line.startsWith(opening) ? [index] : []));
  if (starts.length !== 1) return `${starts.length} paragraphs open ${JSON.stringify(opening)}`;
  const start = starts[0] ?? 0;
  const end = lines.indexOf("", start);
  return lines.slice(start, end < 0 ? lines.length : end).join(" ");
}

interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode?: string;
  readonly tasks?: readonly TaskNode[];
}
const registeredCases = (tasks: readonly TaskNode[]): { readonly name: string; readonly mode: string | undefined }[] =>
  tasks.flatMap((child) => (child.type === "test" ? [{ name: child.name, mode: child.mode }] : child.type === "suite" ? registeredCases(child.tasks ?? []) : []));
const FIXED_CASES = ["frozen shape", "outside anchor", "claim text", "claim roster", "real tree"] as const;
const REACHED = new Map<string, string[]>();
const reached = (site: string, key: string): void => {
  REACHED.set(site, [...(REACHED.get(site) ?? []), key]);
};
const TALLY_TITLE =
  "EACH-LIVENESS closing tally: every case is set to run, the case count is the fixed cases plus one per plant and this tally, every case and every plant reached its last line in frozen order, and this tally is the file's last case";

const PLANT_CASES = ROWS.flatMap((row) => row.pins.map((pin) => ({ row: row.id, pin, judge: judgeOf(row, pin) })));
const partOf = (id: string): ClaimPart | undefined => CLAIM_PARTS.find((part) => part.id === id);
const WALK_FORM_IDS: ReadonlySet<string> = new Set(WALK_FORMS.map((form) => form.id));

describe("wb-lrz.8: the full-surface readers of wb-lrz.4's Furnace SDK re-vendor readiness census", () => {
  it("FROZEN SHAPE (standing rule 16): ROWS's shape and pin ids, every plant in exactly one row, PAGES each plant's page digest", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual([...FROZEN_SHAPE]);
    const pins = ROWS.flatMap((row) => row.pins);
    expect(new Set(pins).size, "a plant pinned twice").toBe(pins.length);
    expect(pins.slice().sort(), "every plant is one row's pin").toEqual(Object.keys(PLANTS).sort());
    expect(Object.keys(PAGES), "PAGES holds every plant, in ROWS order").toEqual(pins);
    expect(Object.fromEntries(pins.map((pin) => [pin, plantPage(PLANTS[pin] as Plant)]))).toEqual(PAGES);
    expect(
      pins.filter((pin) => {
        const plant = PLANTS[pin] as Plant;
        return plant.added.length === 0 && (plant.twin === undefined || plant.twin.added.length === 0);
      }),
      "a plant that adds no line carries a twin that adds one",
    ).toEqual([]);
    expect(RESIDUALS.map((entry) => entry.slice(entry.indexOf(":") + 1))).toEqual([...(ROWS.find((row) => row.id === "Q")?.pins ?? [])]);
    reached("cases", "frozen shape");
  });

  it("OUTSIDE ANCHOR: every enumerated item of wb-lrz.8's export row - the description's U1-U4 and the notes' FOLDED MEMBERS U1-U3 - is one row whose label is its line, or the DROPPED item", () => {
    const { items, problems } = anchorItems(beadRow());
    expect(problems).toEqual([]);
    const answered = [...ROWS.filter((row) => row.from === "description" || row.from === "notes").map((row) => [row.id, row.label] as const), ...Object.entries(DROPPED)];
    expect(answered.slice().sort(([a], [b]) => a.localeCompare(b))).toEqual(items.slice().sort(([a], [b]) => a.localeCompare(b)));
    expect(items.map(([id]) => id)).toEqual(["E-U1", "E-U2", "E-U3", "E-U4", "F-U1", "F-U2", "F-U3"]);
    reached("cases", "outside anchor");
  });

  it("CLAIM TEXT: the header states each claim part of test/helpers/furnace-sdk-entry-readers.ts byte-for-byte as its own paragraph, and names each residual with its quiet plant", () => {
    expect(CLAIM_PARTS.map((part) => part.id)).toEqual(Object.keys(CLAIM_LABELS));
    expect(Object.fromEntries(CLAIM_PARTS.map((part) => [part.id, headerParagraph(`${CLAIM_LABELS[part.id]}: `)]))).toEqual(
      Object.fromEntries(CLAIM_PARTS.map((part) => [part.id, `${CLAIM_LABELS[part.id]}: ${part.text}`])),
    );
    const residuals = headerLines().join(" ");
    expect(RESIDUALS.filter((entry) => !residuals.includes(`${entry.slice(0, entry.indexOf(":"))} [${entry.slice(entry.indexOf(":") + 1)}]`))).toEqual([]);
    reached("cases", "claim text");
  });

  it("CLAIM ROSTER: SUBFORMS names exactly the claim parts' listed sub-forms in claim order, each with plants that carry its mark in what they add or read; every plant outside row Q proves one; a WALK form's plants read that form", () => {
    expect(SUBFORMS.map(([part, sub]) => `${part}: ${sub}`)).toEqual(CLAIM_PARTS.flatMap((part) => part.subforms.map((sub) => `${part.id}: ${sub}`)));
    expect(SUBFORMS.filter(([, , pins]) => pins.length === 0 || pins.some((pin) => PLANTS[pin] === undefined)).map(([part, sub]) => `${part}: ${sub}`)).toEqual([]);
    expect(SUBFORMS.filter(([part, sub]) => !(partOf(part)?.text.includes(sub) ?? false)).map(([part, sub]) => `${part}: ${sub}`)).toEqual([]);
    const named = new Set(SUBFORMS.flatMap(([, , pins]) => pins));
    expect(ROWS.filter((row) => row.id !== "Q").flatMap((row) => row.pins.filter((pin) => !named.has(pin)))).toEqual([]);
    expect(SUBFORMS.flatMap(([, , pins]) => pins.filter((pin) => ROWS.find((row) => row.id === "Q")?.pins.includes(pin) ?? false))).toEqual([]);
    const unread = SUBFORMS.filter(([part]) => WALK_FORM_IDS.has(part)).flatMap(([part, sub, pins]) =>
      pins.filter((pin) => ![...(PLANTS[pin]?.added ?? []), ...(PLANTS[pin]?.twin?.added ?? [])].some((line) => line.startsWith("walk ") && line.split(" ")[2] === part)).map((pin) => `${part}: ${sub} <- ${pin}`),
    );
    expect(unread, "a WALK form's plant reads that form").toEqual([]);
    const unmarked = SUBFORMS.flatMap(([part, sub, pins, mark]) => pins.filter((pin) => !mark.test(evidenceOf(PLANTS[pin] as Plant))).map((pin) => `${part}: ${sub} <- ${pin}`));
    expect(unmarked, "a sub-form's plant carries its mark in what it adds or reads").toEqual([]);
    reached("cases", "claim roster");
  });

  it("REAL TREE: each judge reads the real tree as measured (the WALK and the ENTRY TEXT READ nothing, D1 the two deep imports, U1 one record, D4 one register method)", () => {
    expect(Object.fromEntries((Object.keys(JUDGES) as JudgeId[]).map((judge) => [judge, JUDGES[judge](REAL)]))).toEqual(REAL_READINGS);
    reached("cases", "real tree");
  });

  it.each(PLANT_CASES)("$row $pin reads the real tree's reading plus its own lines", ({ pin, judge }) => {
    const plant = PLANTS[pin];
    if (plant === undefined) throw new Error(`no plant ${pin}`);
    const real = REAL_READINGS[judge];
    expect(JUDGES[judge](REAL), "the real tree, judged again at the plant").toEqual(real);
    expect(JUDGES[judge](plant.tree(REAL)), plant.name).toEqual([...real, ...plant.added]);
    if (plant.twin !== undefined) expect(JUDGES[judge](plant.twin.tree(REAL)), `${plant.name} (its twin in a read form)`).toEqual([...real, ...plant.twin.added]);
    reached("plant", pin);
  });
});

describe("wb-lrz.8 each-liveness: the closing tally", () => {
  it(TALLY_TITLE, ({ task }) => {
    const cases = registeredCases(task.file.tasks);
    expect(
      cases.filter((entry) => entry.mode !== "run").map((entry) => entry.name),
      "cases of this file not set to run",
    ).toEqual([]);
    expect(cases.map((entry) => entry.name)[cases.length - 1], "the file's last case").toBe(TALLY_TITLE);
    const pins = FROZEN_SHAPE.reduce((total, entry) => total + Number(entry.slice(entry.indexOf(":") + 1)), 0);
    expect(cases, "the file's case count").toHaveLength(FIXED_CASES.length + pins + 1);
    expect(Object.fromEntries(REACHED), "the key every case and plant recorded at its last line").toEqual({ cases: [...FIXED_CASES], plant: Object.keys(PAGES) });
  });
});
