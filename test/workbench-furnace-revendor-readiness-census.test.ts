/**
 * wb-lrz.4 (FURNACE-FEEDBACK-RECONCILIATION-R4, program-triage-2026-10-17): the Furnace SDK re-vendor readiness census,
 * the until-then leg of a trigger-gated re-vendor. The bead's own row of the tracker export (.beads/issues.jsonl) is the
 * outside anchor. The clauses this census binds, verbatim from that row:
 *   statement: "until then no Pi change (the vendored 0.1.0 pin remains correct and today's fail-closed behaviour stands)";
 *   acceptance item 4: "Deep imports furnace-hosted.ts:37-38 re-measured: resolve against the new tarball, or switch to
 *   index re-exports if the regenerated SDK gains an exports map; version literals move in the same commit
 *   (furnace-observer.ts:24,108 sdk:'@furnace/sdk@<new>'; providers/furnace.ts:25,56 contractSource).";
 *   the notes' delta paragraph N5, clause (b): "the deep-import census includes `dist/src/durability.js`".
 * The trigger itself (a Furnace release commit whose acceptance register records A15, and the tarball packed there) lives
 * in Furnace's repository, which this census never reads: the gate is the tarball Pi vendors. When an owner commit
 * re-vendors, the U, V and D rows read the new tarball and red on whatever that commit leaves behind; until then they hold
 * the vendored state.
 *
 * MEASURED (read-only, by the cutting seat ws-06 of g10-work-s123, 2026-10-28T03:29Z, at this census's base f5589e0):
 * package.json resolves @furnace/sdk to file:vendor/furnace-sdk-0.1.0.tgz, whose own package.json names @furnace/sdk
 * 0.1.0 with main dist/src/index.js, types dist/src/index.d.ts and no exports field; neither index entry names EmbeddedHost
 * or ResidentSession; the tarball carries dist/src/embedded.js, dist/src/resident_session.js, dist/src/durability.js and
 * dist/src/executor.js, which derives a registration's profile through DurabilityProfile.fromDeclaration; its contract
 * manifest digest equals its generated provenance digest (sha256:2cf7c539f9f3...). vendor/README.md records the tarball as
 * wb-zby's repack from Furnace revision 9970621d8. src/ holds 116 scripts; three spell a versioned @furnace/sdk, five times
 * in all: the FurnaceReading source type's sdk member and the reading's sdk value (furnace-observer.ts), the legacy and
 * native furnace.run.inspect descriptors' contractSource (providers/furnace.ts) and the verified-protocol line of
 * furnace-hosted.ts's header. The only @furnace/sdk/<path> loads in src/ are furnace-hosted.ts's two deep imports.
 * RE-MEASURED at cut #2 (read-only, by seat ws-02 of g10-work-s129, 2026-10-28T17:06:21Z, on trunk a5eecf0): every fact above reads
 * the same (116 scripts, the same five spellings in three files, the same two deep loads). Both index entries star-export
 * ./protocol.js (export * from "./protocol.js"), whose declarations and code re-export nothing; src/ creates a require twice,
 * both in src/workbench/hosts/local-detached.ts and both with a computed specifier.
 * RE-MEASURED at cut #3 (read-only, by seat ws-01 of g10-work-s136, 2026-10-29T12:26:32Z, on trunk 04123dc): 117 scripts under
 * src/, every one a .ts file and every one listed by git ls-files; the same five spellings in three files and the same two
 * deep loads; src/ binds createRequire once (local-detached.ts's import, by its own name) and creates a require twice, both
 * used with a computed specifier (a .resolve call and a direct call); src/workflow/worker-source.ts carries require() calls inside a worker source template (the
 * shape D1 (e) reads); src/ holds 2 literals that spell @furnace/sdk/, both read specifiers (furnace-hosted.ts's two deep
 * imports), so D1 (e) leaves none unread; protocol.d.ts and protocol.js import and export nothing by name; vendor/README.md has no link
 * definition, image or raw HTML block; executor.js imports DurabilityProfile from ./durability.js, and its register method
 * initializes const profile = typeof nameOrDeclaration === "string" ? DurabilityProfile.fromDeclaration(options.durability) :
 * nameOrDeclaration.durability, then stores it once, this.#durability.set(identifier, profile).
 *
 * ROWS (each pin quotes the clause it binds, reads the real tree clean and reds each of its planted drifts):
 *  D, the deep imports (acceptance item 4, first half, and clause (b)):
 *  D1 every deep @furnace/sdk load in src/ is a DEEP row, read once, importing exactly the listed names. D1 reads exactly
 *   these forms, through the TypeScript AST (comments are never read, except the two triple-slash directives in (b)):
 *   (a) SPECIFIER: one string or no-substitution template literal that spells @furnace/sdk/<path>, by the package's name or
 *   after a node_modules/ segment; a call's specifier argument is read through WRAPPERS (parentheses, a comma sequence's last
 *   operand, and as, satisfies, non-null and type assertions);
 *   (b) DECLARATIONS: import declarations, export declarations with a module specifier, import-equals declarations, import
 *   types, ambient module declarations (declare module "..."), and /// <reference types> and /// <reference path> directives;
 *   (c) CALLS whose callee, read through WRAPPERS, is the import keyword, the identifier require, a member named resolve or
 *   require (x.resolve, x["resolve"], x.require - the key one string literal), a created require (a call whose callee,
 *   through WRAPPERS, is a CREATOR), or a LOADER name;
 *   (d) BINDINGS, read per script to a fixed point (per script, not per scope: an over-read only adds findings). A name is
 *   bound to a value by a variable declaration, a binding-element or parameter default, or an assignment (=, ||=, &&=,
 *   ??=) to the bare name, the value read through WRAPPERS. A CREATOR is the identifier createRequire, a member named
 *   createRequire, a name an import specifier binds to createRequire (aliased or not), a name destructured from a property
 *   named createRequire, or a name bound to a CREATOR. A LOADER name is require, a name destructured from a property named
 *   resolve or require, or a name bound to require, a LOADER name, a member named resolve or require, or a created require.
 *   (e) BACKSTOP (fail-closed outside (b)-(d)): every string or no-substitution template literal, template part (head,
 *   middle, tail) and JSX text in a src script whose cooked text holds @furnace/sdk/ (by name, after node_modules/, or
 *   escape-spelled) is the specifier node of a load (b)-(d) reads; any other such literal is a finding (an unread
 *   deep-path literal), so a loader D1 does not list (held in an object, passed in, returned, called through call, apply,
 *   bind or Reflect.apply, imported from another module) and a load spelled in source text that runs later (a worker or
 *   vm source, eval, new Function) both go red whenever a literal spells the path.
 *   Every other load form is a named residual with a pinned quiet row: R-COMPUTED-SPECIFIER (no single literal spells the
 *   path), R-COMMENT-REFERENCE (the path only in a comment) and R-MAPPED-SPECIFIER (the path only through a mapping).
 *  D2 each DEEP row resolves inside the vendored tarball to a regular entry whose declaration file exports the class, as text
 *   and as a class declaration in its code (AST).
 *  D3 no switch is owed: the tarball's package.json has no exports map and none of the typesVersions, typings, module and
 *   browser fields; neither index entry (types, main) names a deep-imported class (text, add-only); and the WALK (AST,
 *   comments never read) from each entry reaches no DEEP module and no DEEP class, so furnace-hosted.ts's header claim
 *   (HEADER_CLAIM) holds of the tarball. The WALK follows every export * and export * as declaration whose specifier resolves
 *   inside the tarball - a relative specifier, or the package's own name (@furnace/sdk/<path>) - trying, from a declaration
 *   file: an exact TypeScript path as written; a .js, .jsx, .mjs or .cjs path's .ts (.tsx for .js and .jsx), then .d.ts twin
 *   (.mts/.d.mts, .cts/.d.cts); an extensionless path's .ts, .tsx, .d.ts, /index.ts, /index.tsx and /index.d.ts; and from a
 *   JavaScript file: the exact path, then .js, then /index.js (bundler-style; an over-read only adds findings). In every
 *   module it reaches it reads: an export * or export * as whose target is a DEEP module; a named re-export (export { X }
 *   from ..., aliased or type-only) of a DEEP class, in a module past the entry (the entry's own text read covers the entry);
 *   and a local export (export { x }, aliased or not) of a name an import specifier binds by a DEEP class's own name (from
 *   any module), or of a name a default or namespace import of a DEEP module binds. Every other route is a named residual with a pinned quiet row (R-INDEX-INDIRECT,
 *   R-WALK-SPECIFIER).
 *  D4 the tarball still carries dist/src/durability.js and its declarations; executor.js still reads
 *   DurabilityProfile.fromDeclaration(options.durability) and documents every member false when none was (text); and in its
 *   code (AST, comments never read) executor.js imports DurabilityProfile from ./durability.js and binds that name nowhere
 *   else, and its one register method (DERIVATION): takes a third parameter named options with no default or an empty object
 *   default, which its body never targets with an assignment (any assignment operator), an update (++, --) or a delete (a
 *   target that mentions options anywhere: options itself, a member chain of it, a destructuring pattern holding it);
 *   declares profile once
 *   in its body, as a const that is a direct statement of the body, whose initializer (through parentheses) is
 *   typeof <its first parameter> === "string" ? <the call> : ..., the call itself (through parentheses) on that string-name
 *   branch; and stores that profile once - the body's one this.#durability.set(...) call is a direct statement whose second
 *   argument is profile. What DurabilityProfile.fromDeclaration does with its input, and anything a call does to the options
 *   or the profile object (Object.assign and the like), are a named residual with a pinned quiet row (R-DERIVATION-BODY): the
 *   hello-reply durability rows of wb-lrz.5 rest on this module and read them.
 *  ENUMERATION (wb-lrz.4 refusal #2's THIRD-CUT DISCLOSURE and its class-level guard (1)): D1, D3 and D4 claim exactly the
 *   forms listed for them above; every form outside a list that this cut knows is a named residual with a pinned quiet row;
 *   a form found later outside every list is a residual-list addition, unless it contradicts a listed form.
 *  V, the version literals (acceptance item 4, second half): V1 every versioned @furnace/sdk spelling in src/ (the at form
 *   "@furnace/sdk@X.Y.Z", the space form "@furnace/sdk X.Y.Z" and the tarball form "furnace-sdk-X.Y.Z.tgz") belongs to a
 *   SITES row read its listed number of times, and each one names the vendored version; V2 the observer's sdk member and sdk
 *   value (AST) each name it, once; V3 both furnace.run.inspect contractSource literals (AST) begin with it.
 *  U, the until-then clause: U1 the vendored version is the clause's own 0.1.0, on package.json's spec and inside the
 *   tarball, and vendor/README.md's page as marked renders it (every top-level block through marked's tokens - paragraphs,
 *   headings, lists, tables, quotes and code alike - with raw HTML (comments included), link-reference definitions and image
 *   alt text dropped: a comment, a definition and an image's alt text render no text) shows exactly one record of the tarball
 *   as wb-zby's repack, from Furnace revision 9970621d8 (the trigger has not fired); a raw HTML block's rendered text is a
 *   named residual with a pinned quiet row (R-HTML-BLOCK); U2 the tarball's contract manifest digest equals its generated
 *   provenance digest, the condition the hosted adapter's decodeContextValue preflight admits (acceptance item 3); the
 *   refusal itself is the hosted suite's.
 *  Q, the residuals' pinned quiet rows (RESIDUALS below).
 * SCRIPTS: the rows read every script under src/ - .ts, .tsx, .mts, .cts, .js, .jsx, .mjs and .cjs - each parsed by its own
 * extension; the read set is anchored outside the census: it equals git ls-files src/ (tracked and untracked, ignore rules
 * applied) filtered to those extensions, so a read set narrowed to a directory or to the pinned files goes red.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and FROZEN_PINS pins every row's pin ids;
 * the JUDGED and QUIET subsets' ids, the call sites' records and the case count are read against FROZEN_PINS, never against
 * ROWS or a subset. PLANT_SHAPE pins each judged pin's plant count, JUDGE_KEYS each judged pin's judge (by name), and a
 * literal pins V1's three forms.
 * EACH-LIVENESS (the wb-mqm6 F7 / wb-vkdl form): every case records its key at its last line - each it.each case its pin
 * id (each judged case its pin id and its judge's name), each plant its pin and index - and the closing tally, the file's
 * last case, reads vitest's own task tree: every case
 * is set to run, the case count is the fixed cases plus two cases per judged id, one per quiet id and the tally, and the
 * records equal the frozen literals, in order. A subset filtered, sliced or emptied, an it.each call site sliced, or a
 * plants loop cut short goes red at the subset's literal or at the tally. Both judged call sites judge the real tree (the
 * plants case judges it again before its plants) and record each judge by name against JUDGE_KEYS, so a judge swapped out
 * at either call site goes red.
 * OUTSIDE ANCHORS (their own registered case): acceptance item 4 is tiled in order by the quotes of D1, D2, D3, V1, V2 and V3,
 * and the statement's until-then parenthetical by U1 and U2, with nothing between two quotes but whitespace, comma,
 * semicolon, colon, period and parentheses; the description's ACCEPTANCE: [ and STATEMENT: lines are each read only when the
 * description holds exactly one such line (a second one is refused, never read first-match); D4's quote opens clause (b) of
 * the notes' one N5 paragraph, read where it stands (the one notes line that opens with N5_OPEN, holding one clause (b)): a
 * second N5 paragraph or a second clause (b) is refused, never read first-match, and a copy of the clause elsewhere in the
 * notes is never read; and the read set equals the repo's own script list (SCRIPTS). A pin removed from ROWS and every literal
 * together, or a quote shortened, leaves part of a clause untiled. ANCHOR CONTROLS (their own case) show tile() tiling a
 * clean pair and refusing a word between two quotes, a reversed pair, an untiled tail and a missing last quote, then each
 * real acceptance-4 and statement quote dropped in turn and the acceptance-4 quotes reversed; the one-line reader refusing a
 * doubled and a dropped ACCEPTANCE: [ or STATEMENT: line; and the clause (b) reader refusing a clause weakened in place under
 * a verbatim copy, a doubled N5 paragraph, a dropped one and a weakened clause masked by an earlier second clause (b).
 * RESIDUALS (named, each with its pinned quiet row; every quiet row also runs a control spelled in a read form, so its plant
 * is shown to reach the judge): R-COMPUTED-VERSION a version spelling the raw text does not hold (joined at run time, or
 * escape-spelled) is not read by V1 (Q1); R-OTHER-SPELLING spellings outside V1's three forms ("v9.9.9", "furnace sdk 9.9.9",
 * "version 9.9.9") are not read (Q2); R-OUTSIDE-SRC V1 and D1 read src/ only - docs, test and qa files keep the versions
 * they measured, and a receipt never moves with a re-vendor (Q3); R-COMPUTED-SPECIFIER a load whose specifier is not one
 * literal (D1 (a)) and no single literal of which spells @furnace/sdk/ - pieces joined at run time, a name, char codes - is
 * not read by D1 (Q4); R-INDEX-INDIRECT a deep-imported class a module of the walk reaches through anything but D3's listed
 * exports - a value or a type declared from it, or a default export of it - is not read by D3 (Q6); R-COMMENT-REFERENCE a
 * deep path named only in a comment other than the two triple-slash directives D1 reads (an /// <amd-dependency>
 * directive, a JSDoc type or @import tag, a line or block comment) is not read by D1 (Q7); R-WALK-SPECIFIER a specifier the
 * walk does not resolve (a directory resolved through a nested package.json, a path mapping, a symlink) is not followed by
 * D3 (Q8); R-HTML-BLOCK a record inside a raw HTML block, which a browser renders, is not read by U1 (Q9); R-DERIVATION-BODY
 * what DurabilityProfile.fromDeclaration does with its input, and anything a call does to the options or the derived
 * profile object, is not read by D4 (Q10); R-MAPPED-SPECIFIER a specifier that reaches @furnace/sdk/<path> only through a
 * mapping or a link defined outside the script's text (tsconfig paths, package.json imports, a bundler alias, a symlink) is
 * not read by D1 (Q11).
 * RETIRED at cut #3: Q5 R-INDIRECT-LOADER (cut #2's quiet row). D1 (e) reads every literal form of an indirect loader, so
 * the family is no longer an escape: its quiet plant rides verbatim as a judged D1 plant that must red, and an indirect
 * loader with a computed specifier is R-COMPUTED-SPECIFIER (Q4). Q5's id stays unused so earlier records keep their sense.
 * NOT CLAIMED: what a re-vendor commit owes beyond these rows (acceptance items 1-3, 5 and 6: the vendor pins and the
 * dependency census pass on the new tarball, the live tiers re-run against a release-built binary, one re-vendor sequenced
 * with wb-zby); the hosted adapter's preflight refusal, which test/workbench-furnace-hosted.test.ts drives; a pin
 * re-authored together with its plants; a plant removed together with its PLANT_SHAPE count (plants are the census's own
 * inputs, which no outside anchor names); a residual row removed from ROWS and every literal together (no outside anchor
 * names the residual families, so the census stays green); the census's own instruments edited together with their own
 * literals (a fixed case removed with its FIXED_CASES key, or the closing tally itself removed). D4's "every member false when none was" is executor.js's own
 * documented contract, a doc comment by nature, read as text; how executor() reaches register, and what other methods do
 * with the registry, are the hosted suite's hello-reply durability rows (wb-lrz.5), not this census's. The text reads kept
 * beside the AST reads (D2's declaration text, D3's index mentions, D4's derivation text) only add findings: a comment can
 * satisfy a text read but never the AST read beside it, and a comment naming a deep-imported class in an index entry reds
 * D3 (an over-read). A tarball entry stored under a pax or GNU long name reads as absent, so a row that needs it reds.
 * READS (contacts): package.json, vendor/README.md, the tarball package.json names (today vendor/furnace-sdk-0.1.0.tgz),
 * every script under src/ and git ls-files src/ (SCRIPTS), and the wb-lrz.4 row of .beads/issues.jsonl (its description,
 * and the N5 paragraph of its notes: an appended note is safe; a notes replace that drops, doubles or weakens that
 * paragraph's clause (b) reds the anchor case).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory tree.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-lrz.4";
const EXPORT = ".beads/issues.jsonl";
const SDK = "@furnace/sdk";
const OBSERVER = "src/workbench/furnace-observer.ts";
const PROVIDER = "src/workbench/providers/furnace.ts";
const HOSTED = "src/workbench/hosts/furnace-hosted.ts";
/** The revision vendor/README.md records the vendored tarball as repacked from (wb-zby): the trigger has not fired. */
const ZBY_REVISION = "9970621d8";
/** furnace-hosted.ts's header claim about the vendored SDK, read with the comment leaders stripped. */
const HEADER_CLAIM = "The SDK exposes EmbeddedHost and ResidentSession only through deep imports (no index re-export, no exports map).";
const VERSION = String.raw`\d+\.\d+\.\d+(?:-[0-9A-Za-z][0-9A-Za-z.-]*)?`;
const SPEC = new RegExp(`^file:vendor/(furnace-sdk-(${VERSION})\\.tgz)$`);
/** vendor/README.md's record of the vendored tarball as wb-zby's repack (global: every record the rendered page shows is read). */
const PROVENANCE = new RegExp(`(furnace-sdk-${VERSION}\\.tgz) was re-packaged on (\\d{4}-\\d{2}-\\d{2}) \\(wb-zby\\) from Furnace revision ([0-9a-f]{7,40})\\b`, "g");
/** Every script the rows read under src/ (SCRIPTS): TypeScript and JavaScript alike, each parsed by its own extension. */
const SCRIPT = /\.(?:ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
const TRIGGERED = `the trigger has fired, and the re-vendor owes ${BEAD}'s acceptance on landing`;
/** The notes line the delta paragraph N5 opens with, and the separator its clause (b) follows (D4's quote is read there only). */
const N5_OPEN = "2026-10-17b (CLUSTERS-delta N5): ";
const CLAUSE_B = "; (b) ";
/** The description lines the outside anchors read: each is read only when the description holds exactly one. */
const ACCEPTANCE_OPEN = "ACCEPTANCE: [";
const STATEMENT_OPEN = "STATEMENT: ";

type Form = "at" | "space" | "tarball";
const FORMS: readonly { readonly form: Form; readonly pattern: RegExp; readonly spell: (version: string) => string }[] = [
  { form: "at", pattern: new RegExp(`@furnace/sdk@(${VERSION})`, "g"), spell: (version) => `${SDK}@${version}` },
  { form: "space", pattern: new RegExp(`@furnace/sdk (${VERSION})(?![0-9A-Za-z])`, "g"), spell: (version) => `${SDK} ${version}` },
  { form: "tarball", pattern: new RegExp(`furnace-sdk-(${VERSION})\\.tgz`, "g"), spell: (version) => `furnace-sdk-${version}.tgz` },
];

/** A versioned @furnace/sdk spelling V1 holds to the vendored version: one file, one form, a fixed count. */
interface Site {
  readonly file: string;
  readonly form: Form;
  readonly count: number;
  readonly what: string;
}
const SITES: readonly Site[] = [
  { file: OBSERVER, form: "at", count: 2, what: "the FurnaceReading source type's sdk member and the reading's sdk value" },
  { file: PROVIDER, form: "at", count: 2, what: "the legacy and native furnace.run.inspect descriptors' contractSource" },
  { file: HOSTED, form: "space", count: 1, what: "the module header's verified-protocol line" },
];

/** A deep @furnace/sdk/<path> load D1 lists, with the names it imports. */
interface DeepImport {
  readonly file: string;
  readonly specifier: string;
  readonly names: readonly string[];
}
const DEEP: readonly DeepImport[] = [
  { file: HOSTED, specifier: `${SDK}/dist/src/embedded.js`, names: ["EmbeddedHost"] },
  { file: HOSTED, specifier: `${SDK}/dist/src/resident_session.js`, names: ["ResidentSession"] },
];

/** What the rows read: package.json's spec, the tarball it names (regular entries as text), the scripts and vendor/README.md. */
interface Tree {
  readonly spec: string | undefined;
  readonly tarball: ReadonlyMap<string, string>;
  readonly files: ReadonlyMap<string, string>;
  readonly readme: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const inSrc = (file: string): boolean => file.startsWith("src/") && SCRIPT.test(file);
const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();

function scripts(dir: string): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? scripts(`${dir}/${entry.name}`) : entry.isFile() && SCRIPT.test(entry.name) ? [`${dir}/${entry.name}`] : []))
    .sort();
}

/** SCRIPTS' outside anchor: the repo's own list of src/ scripts (git ls-files, tracked and untracked, ignore rules applied). */
function listedScripts(): string[] {
  return execFileSync("git", ["-C", REPO, "ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { encoding: "utf8", maxBuffer: 1 << 26 })
    .split("\0")
    .filter((file) => SCRIPT.test(file))
    .sort();
}

/** The regular-file entries of a gzip tar, by path, as UTF-8 text; every other entry kind is skipped. */
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
  const raw = dependencies[SDK];
  const spec = typeof raw === "string" ? raw : undefined;
  const tarball = spec?.startsWith("file:") === true ? tarEntries(readFileSync(join(REPO, spec.slice("file:".length)))) : new Map<string, string>();
  return {
    spec,
    tarball,
    files: new Map(scripts("src").map((file) => [file, readFileSync(join(REPO, file), "utf8")])),
    readme: readFileSync(join(REPO, "vendor/README.md"), "utf8"),
  };
}

function jsonEntry(tree: Tree, path: string): Record<string, unknown> | undefined {
  const text = tree.tarball.get(path);
  if (text === undefined) return undefined;
  try {
    const value: unknown = JSON.parse(text);
    return isRecord(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

const PARSED = new Map<string, Map<string, ts.SourceFile>>();
/** A src script or a tarball module, parsed once per text, as its own extension says (TypeScript, TSX, JavaScript or JSX). */
function parsed(file: string, text: string): ts.SourceFile {
  let byText = PARSED.get(file);
  if (byText === undefined) {
    byText = new Map();
    PARSED.set(file, byText);
  }
  const hit = byText.get(text);
  if (hit !== undefined) return hit;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false);
  byText.set(text, source);
  return source;
}

function walk(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, (child) => {
    walk(child, visit);
  });
}

const nameOf = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined);

/** The module's leading JSDoc block, comment leaders stripped and whitespace collapsed. */
function moduleHeader(text: string): string {
  const block = /^\s*\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? "";
  return collapse(
    block
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .join(" "),
  );
}

/** The vendored identity: package.json's spec names furnace-sdk-<v>.tgz and the tarball's own package.json says @furnace/sdk <v>. */
function vendored(tree: Tree): { readonly version?: string; readonly tarballName?: string; readonly problems: readonly string[] } {
  const problems: string[] = [];
  const spec = tree.spec === undefined ? null : SPEC.exec(tree.spec);
  if (spec === null) problems.push(`package.json resolves ${SDK} to ${String(tree.spec)}, not a file:vendor/furnace-sdk-<version>.tgz tarball`);
  const pkg = jsonEntry(tree, "package/package.json");
  if (pkg?.name !== SDK) problems.push(`the vendored tarball's package.json names ${String(pkg?.name)}, not ${SDK}`);
  const version = typeof pkg?.version === "string" ? pkg.version : undefined;
  if (version === undefined) problems.push("the vendored tarball's package.json carries no version");
  else if (spec !== null && spec[2] !== version) problems.push(`the vendored tarball's package.json says ${version} where its file name says ${String(spec[2])}`);
  if (problems.length > 0 || version === undefined || spec === null) return { problems };
  return { version, tarballName: spec[1], problems };
}

// ---- D1's reader: the forms (a)-(d) of the header, nothing else --------------------------------------------------------

/** WRAPPERS: an expression with its parentheses, comma sequences (their last operand) and as, satisfies, non-null and type assertions taken off. */
function unwrap(node: ts.Expression): ts.Expression {
  let inner = node;
  for (;;) {
    if (ts.isParenthesizedExpression(inner) || ts.isAsExpression(inner) || ts.isSatisfiesExpression(inner) || ts.isNonNullExpression(inner) || ts.isTypeAssertionExpression(inner)) inner = inner.expression;
    else if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.CommaToken) inner = inner.right;
    else return inner;
  }
}

/** The member name an access reads: x.name, or x["name"] whose key (through WRAPPERS) is one string literal. */
function memberName(node: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (!ts.isElementAccessExpression(node)) return undefined;
  const key = unwrap(node.argumentExpression);
  return ts.isStringLiteralLike(key) ? key.text : undefined;
}

const ASSIGNMENTS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.EqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken]);
const LOADER_MEMBERS: ReadonlySet<string> = new Set(["resolve", "require"]);

/** D1 (c)-(d): whether a callee (through WRAPPERS) loads, given the script's CREATOR and LOADER names read to a fixed point. */
function loadersOf(source: ts.SourceFile): (callee: ts.Expression) => boolean {
  const creators = new Set(["createRequire"]);
  const loaders = new Set(["require"]);
  const bound: (readonly [string, ts.Expression])[] = [];
  walk(source, (node) => {
    if (ts.isImportSpecifier(node) && (node.propertyName ?? node.name).text === "createRequire") creators.add(node.name.text);
    if (ts.isObjectBindingPattern(node)) {
      for (const element of node.elements) {
        if (!ts.isIdentifier(element.name)) continue;
        const property = element.propertyName === undefined ? element.name.text : nameOf(element.propertyName);
        if (property === "createRequire") creators.add(element.name.text);
        if (property !== undefined && LOADER_MEMBERS.has(property)) loaders.add(element.name.text);
      }
    }
    if ((ts.isVariableDeclaration(node) || ts.isBindingElement(node) || ts.isParameter(node)) && ts.isIdentifier(node.name) && node.initializer !== undefined) bound.push([node.name.text, node.initializer]);
    if (ts.isBinaryExpression(node) && ASSIGNMENTS.has(node.operatorToken.kind)) {
      const target = unwrap(node.left);
      if (ts.isIdentifier(target)) bound.push([target.text, node.right]);
    }
  });
  const isCreator = (node: ts.Expression): boolean => {
    const inner = unwrap(node);
    return (ts.isIdentifier(inner) && creators.has(inner.text)) || memberName(inner) === "createRequire";
  };
  const isLoader = (node: ts.Expression): boolean => {
    const inner = unwrap(node);
    if (ts.isIdentifier(inner)) return loaders.has(inner.text);
    if (ts.isCallExpression(inner)) return isCreator(inner.expression);
    const member = memberName(inner);
    return member !== undefined && LOADER_MEMBERS.has(member);
  };
  for (let grew = true; grew; ) {
    grew = false;
    for (const [name, value] of bound) {
      if (!creators.has(name) && isCreator(value)) {
        creators.add(name);
        grew = true;
      }
      if (!loaders.has(name) && isLoader(value)) {
        loaders.add(name);
        grew = true;
      }
    }
  }
  return isLoader;
}

/** D1 (a): a specifier's text when it spells a deep @furnace/sdk/<path>, by the package's name or after a node_modules/ segment. */
const deepSpecifier = (text: string): string | undefined => (text.startsWith(`${SDK}/`) || /(?:^|\/)node_modules\/@furnace\/sdk\//.test(text) ? text : undefined);

/** One deep load, D1 (b)-(c): a declaration, or a call whose callee loads and whose specifier argument (through WRAPPERS) is deep. */
function deepLoad(node: ts.Node, loads: (callee: ts.Expression) => boolean): { readonly specifier: string; readonly names: readonly string[]; readonly node: ts.Node } | undefined {
  const deep = (expression: ts.Node | undefined): string | undefined => (expression !== undefined && ts.isStringLiteralLike(expression) ? deepSpecifier(expression.text) : undefined);
  if (ts.isImportDeclaration(node)) {
    const specifier = deep(node.moduleSpecifier);
    if (specifier === undefined) return undefined;
    const clause = node.importClause;
    const names: string[] = clause?.name === undefined ? [] : ["default"];
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push("*");
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
    return { specifier, names, node: node.moduleSpecifier };
  }
  if (ts.isExportDeclaration(node)) {
    const specifier = deep(node.moduleSpecifier);
    if (specifier === undefined) return undefined;
    const clause = node.exportClause;
    return { specifier, names: clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map((element) => (element.propertyName ?? element.name).text) : ["*"], node: node.moduleSpecifier ?? node };
  }
  if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
    const specifier = deep(node.moduleReference.expression);
    return specifier === undefined ? undefined : { specifier, names: ["*"], node: node.moduleReference.expression };
  }
  if (ts.isImportTypeNode(node)) {
    const argument = node.argument;
    const literal = ts.isLiteralTypeNode(argument) ? argument.literal : undefined;
    const specifier = deep(literal);
    return specifier === undefined || literal === undefined ? undefined : { specifier, names: ["type"], node: literal };
  }
  if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) {
    const specifier = deep(node.name);
    return specifier === undefined ? undefined : { specifier, names: ["declare module"], node: node.name };
  }
  if (ts.isCallExpression(node)) {
    const argument = node.arguments[0];
    const loading = node.expression.kind === ts.SyntaxKind.ImportKeyword || loads(node.expression);
    const literal = loading && argument !== undefined ? unwrap(argument) : undefined;
    const specifier = deep(literal);
    return specifier === undefined || literal === undefined ? undefined : { specifier, names: ["*"], node: literal };
  }
  return undefined;
}

/** What D1 reads of one script: its loads, and every deep-path literal no read load takes as its specifier (D1 (e)). */
interface ScriptReads {
  readonly loads: readonly DeepImport[];
  readonly unread: readonly string[];
}
/** D1 (e): a string or no-substitution template literal, a template part or JSX text whose cooked text spells @furnace/sdk/. */
const deepLiteral = (node: ts.Node): string | undefined =>
  (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node)) && node.text.includes(`${SDK}/`) ? node.text : undefined;
const READS = new WeakMap<ts.SourceFile, ScriptReads>();
/** One script's reads: its triple-slash directives (D1 (b)), its AST loads in order, then the BACKSTOP's unread deep-path literals. */
function scriptReads(file: string, source: ts.SourceFile): ScriptReads {
  const hit = READS.get(source);
  if (hit !== undefined) return hit;
  const loads: DeepImport[] = [];
  const directives = [...source.typeReferenceDirectives.map((directive) => [directive.fileName, "reference types"] as const), ...source.referencedFiles.map((directive) => [directive.fileName, "reference path"] as const)];
  for (const [fileName, kind] of directives) {
    const specifier = deepSpecifier(fileName);
    if (specifier !== undefined) loads.push({ file, specifier, names: [kind] });
  }
  const loaders = loadersOf(source);
  const taken = new Set<ts.Node>();
  walk(source, (node) => {
    const load = deepLoad(node, loaders);
    if (load === undefined) return;
    loads.push({ file, specifier: load.specifier, names: load.names });
    taken.add(load.node);
  });
  const unread: string[] = [];
  walk(source, (node) => {
    const text = deepLiteral(node);
    if (text !== undefined && !taken.has(node)) unread.push(text);
  });
  const reads = { loads, unread };
  READS.set(source, reads);
  return reads;
}
/** Every deep load in src/, script by script. */
function deepLoads(tree: Tree): DeepImport[] {
  return [...tree.files].flatMap(([file, text]) => (inSrc(file) ? scriptReads(file, parsed(file, text)).loads : []));
}
/** D1 (e): every deep-path literal in src/ that no read load takes as its specifier. */
function unreadDeepLiterals(tree: Tree): { readonly file: string; readonly text: string }[] {
  return [...tree.files].flatMap(([file, text]) => (inSrc(file) ? scriptReads(file, parsed(file, text)).unread.map((literal) => ({ file, text: literal })) : []));
}

/** D1 (e)'s finding: a deep-path literal no read load takes as its specifier. */
const unreadLiteral = (text: string, file: string): string => `D1 unread deep-path literal ${JSON.stringify(text)} in ${file}: a ${SDK}/<path> spelled outside every load D1 reads is never re-measured on re-vendor, so load it in a read form`;

/** D1: every deep load in src/ is a DEEP row, read once, importing exactly the listed names, and no deep-path literal is left unread. */
function deepImportSet(tree: Tree): string[] {
  const findings: string[] = [];
  const found = deepLoads(tree);
  const same = (a: DeepImport, b: DeepImport): boolean => a.file === b.file && a.specifier === b.specifier;
  for (const load of found) {
    const listed = DEEP.find((row) => same(row, load));
    if (listed === undefined) findings.push(`D1 unlisted deep import ${load.specifier} in ${load.file} (${load.names.join(", ")}): every ${SDK}/<path> load is re-measured on re-vendor, so list it`);
    else if (load.names.join(", ") !== listed.names.join(", ")) findings.push(`D1 ${load.file} imports ${load.names.join(", ")} from ${load.specifier}, listed ${listed.names.join(", ")}`);
  }
  for (const row of DEEP) {
    const read = found.filter((load) => same(row, load)).length;
    if (read !== 1) findings.push(`D1 listed deep import ${row.specifier} in ${row.file} is read ${read} times, not once`);
  }
  for (const { file, text } of unreadDeepLiterals(tree)) findings.push(unreadLiteral(text, file));
  return findings;
}

const hasModifier = (node: ts.ClassDeclaration, kind: ts.SyntaxKind): boolean => (node.modifiers ?? []).some((modifier) => modifier.kind === kind);
/** Whether a declaration file exports class `name`: as text (export declare class <name>), and as a class declaration in its code (AST, comments never read). */
function declaresClass(path: string, text: string, name: string): { readonly text: boolean; readonly code: boolean } {
  return {
    text: new RegExp(`\\bexport\\s+declare\\s+class\\s+${name}\\b`).test(text),
    code: parsed(path, text).statements.some(
      (statement) => ts.isClassDeclaration(statement) && statement.name?.text === name && hasModifier(statement, ts.SyntaxKind.ExportKeyword) && hasModifier(statement, ts.SyntaxKind.DeclareKeyword),
    ),
  };
}

/** D2: each DEEP row resolves to a regular tarball entry whose declaration file exports the imported class, as text and in its code. */
function deepImportsResolve(tree: Tree): string[] {
  const findings: string[] = [];
  for (const row of DEEP) {
    const path = row.specifier.slice(`${SDK}/`.length);
    if (!tree.tarball.has(`package/${path}`)) {
      findings.push(`D2 ${row.specifier} does not resolve: the vendored tarball has no package/${path}`);
      continue;
    }
    const declarations = `package/${path.replace(/\.js$/, ".d.ts")}`;
    const text = tree.tarball.get(declarations) ?? "";
    for (const name of row.names) {
      const declared = declaresClass(declarations, text, name);
      if (!declared.text) findings.push(`D2 ${declarations} declares no exported class ${name}`);
      if (!declared.code) findings.push(`D2 ${declarations} declares no exported class ${name} in its code (a comment declares nothing)`);
    }
  }
  return findings;
}

// ---- D3's walk: the header's resolution order and exposure reads, nothing else ----------------------------------------

const DECLARATION_FILE = /\.d\.[cm]?ts$/;
/** The candidates a declaration file's specifier target is tried as, in order (D3: TypeScript's bundler order, files before directories). */
function declarationCandidates(target: string): string[] {
  const script = /\.([cm]?)(jsx?)$/.exec(target);
  if (script !== null) {
    const stem = target.slice(0, -script[0].length);
    const flavour = script[1] ?? "";
    return [`${stem}.${flavour}ts`, ...(flavour === "" ? [`${stem}.tsx`] : []), `${stem}.d.${flavour}ts`];
  }
  if (/\.[cm]?tsx?$/.test(target)) return [target];
  return [".ts", ".tsx", ".d.ts", "/index.ts", "/index.tsx", "/index.d.ts"].map((suffix) => `${target}${suffix}`);
}
/** The tarball entry a module specifier names from the module naming it - relative, or through the package's own name - by D3's resolution order. */
function tarballModule(tree: Tree, from: string, specifier: string): string | undefined {
  const own = specifier.startsWith(`${SDK}/`) ? `package/${specifier.slice(`${SDK}/`.length)}` : undefined;
  if (own === undefined && !specifier.startsWith("./") && !specifier.startsWith("../")) return undefined;
  const target = (own ?? posix.normalize(posix.join(posix.dirname(from), specifier))).replace(/\/+$/, "");
  const candidates = DECLARATION_FILE.test(from) ? declarationCandidates(target) : [target, `${target}.js`, `${target}/index.js`];
  return candidates.find((candidate) => tree.tarball.has(candidate));
}

/** What an index entry exposes of the deep imports: the classes, and the module chain from the entry. */
interface Exposure {
  readonly names: readonly string[];
  readonly chain: readonly string[];
}
/**
 * D3's WALK (AST, comments never read): from an index entry through every module an export * or export * as names; in each
 * module it reaches, an export * or export * as of a DEEP module, a named re-export of a DEEP class past the entry, and a
 * local export of a name an import specifier binds by a DEEP class's own name, or a default or namespace import binds to a
 * DEEP module.
 */
function starExposures(tree: Tree, entry: string): Exposure[] {
  const modules = new Map<string, readonly string[]>(DEEP.map((row) => [`package/${row.specifier.slice(`${SDK}/`.length)}`, row.names]));
  const deepModule = (path: string): readonly string[] | undefined => modules.get(path.replace(DECLARATION_FILE, ".js"));
  const classes = DEEP.flatMap((row) => row.names);
  const exposures: Exposure[] = [];
  const seen = new Set<string>([entry]);
  const visit = (path: string, chain: readonly string[]): void => {
    const text = tree.tarball.get(path);
    if (text === undefined) return;
    const statements = parsed(path, text).statements;
    const imported = new Map<string, readonly string[]>();
    for (const statement of statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
      const target = tarballModule(tree, path, statement.moduleSpecifier.text);
      const moduleNames = target === undefined ? undefined : deepModule(target);
      const defaulted = statement.importClause?.name;
      if (defaulted !== undefined && moduleNames !== undefined) imported.set(defaulted.text, moduleNames);
      const bindings = statement.importClause?.namedBindings;
      if (bindings === undefined) continue;
      if (ts.isNamespaceImport(bindings)) {
        if (moduleNames !== undefined) imported.set(bindings.name.text, moduleNames);
      } else {
        for (const element of bindings.elements) {
          const name = (element.propertyName ?? element.name).text;
          if (classes.includes(name)) imported.set(element.name.text, [name]);
        }
      }
    }
    for (const statement of statements) {
      if (!ts.isExportDeclaration(statement)) continue;
      const clause = statement.exportClause;
      if (statement.moduleSpecifier === undefined) {
        if (clause === undefined || !ts.isNamedExports(clause)) continue;
        for (const element of clause.elements) {
          const names = imported.get((element.propertyName ?? element.name).text);
          if (names !== undefined) exposures.push({ names, chain });
        }
        continue;
      }
      if (!ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
      const target = tarballModule(tree, path, statement.moduleSpecifier.text);
      if (target === undefined) continue;
      if (clause === undefined || ts.isNamespaceExport(clause)) {
        const names = deepModule(target);
        if (names !== undefined) exposures.push({ names, chain: [...chain, target] });
        else if (!seen.has(target)) {
          seen.add(target);
          visit(target, [...chain, target]);
        }
      } else if (chain.length > 1) {
        const named = clause.elements.map((element) => (element.propertyName ?? element.name).text).filter((name) => classes.includes(name));
        if (named.length > 0) exposures.push({ names: named, chain });
      }
    }
  };
  visit(entry, [entry]);
  return exposures;
}

/** The package.json fields beside types and main that would route a consumer to another entry: D3 refuses each one present. */
const OTHER_ENTRIES = ["typesVersions", "typings", "module", "browser"] as const;
/** D3: no switch to index re-exports is owed - no exports map or other entry field, no index entry naming or exposing a deep-imported class, the header claim standing. */
function noSwitchOwed(tree: Tree): string[] {
  const pkg = jsonEntry(tree, "package/package.json");
  if (pkg === undefined) return ["D3 the vendored tarball has no readable package/package.json"];
  const findings: string[] = [];
  if (Object.hasOwn(pkg, "exports")) findings.push("D3 the vendored SDK carries an exports map: switch the deep imports to index re-exports (acceptance 4)");
  for (const field of OTHER_ENTRIES) if (Object.hasOwn(pkg, field)) findings.push(`D3 the vendored SDK carries a ${field} field: re-measure its entries before keeping the deep imports (acceptance 4)`);
  for (const field of ["types", "main"] as const) {
    const entry = pkg[field];
    const path = typeof entry === "string" ? `package/${entry}` : undefined;
    const text = path === undefined ? undefined : tree.tarball.get(path);
    if (path === undefined || text === undefined) {
      findings.push(`D3 the vendored SDK's ${field} entry ${String(entry)} is not in the tarball`);
      continue;
    }
    for (const name of DEEP.flatMap((row) => row.names)) {
      if (new RegExp(`\\b${name}\\b`).test(text)) findings.push(`D3 the vendored SDK's ${field} entry ${String(entry)} names ${name}: switch its deep import to the index re-export (acceptance 4)`);
    }
    for (const exposure of starExposures(tree, path)) {
      const chain = exposure.chain.map((module) => module.slice("package/".length)).join(" -> ");
      findings.push(`D3 the vendored SDK's ${field} entry ${String(entry)} exposes ${exposure.names.join(", ")} through export * (${chain}): switch its deep import to the index re-export (acceptance 4)`);
    }
  }
  if (!moduleHeader(tree.files.get(HOSTED) ?? "").includes(HEADER_CLAIM)) findings.push(`D3 ${HOSTED}'s header no longer states the deep-import claim this row holds the vendored tarball to`);
  return findings;
}

// ---- D4's DERIVATION read of executor.js's register method ------------------------------------------------------------

const DERIVATION = "DurabilityProfile.fromDeclaration(options.durability)";
const RERUN = "re-run the hello-reply durability rows (wb-lrz.5) on the new tarball";
const EXECUTOR = "package/dist/src/executor.js";
/** An expression through parentheses only (D4 reads no other wrapper). */
const parens = (node: ts.Expression): ts.Expression => (ts.isParenthesizedExpression(node) ? parens(node.expression) : node);
const access = (node: ts.Node | undefined, object: string, member: string): boolean =>
  node !== undefined && ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === object && node.name.text === member;
/** Whether an expression (through parentheses) is the call DurabilityProfile.fromDeclaration(options.durability) itself. */
function isDerivation(node: ts.Expression): boolean {
  const call = parens(node);
  return ts.isCallExpression(call) && access(call.expression, "DurabilityProfile", "fromDeclaration") && call.arguments.length === 1 && access(call.arguments[0], "options", "durability");
}
/** D4's DERIVATION (AST, comments never read): the findings executor.js's import and its one register method leave owed. */
/** The name a declaration binds (a variable, binding element, parameter, function, class or import), if it binds one. */
function boundName(node: ts.Node): string | undefined {
  if (ts.isVariableDeclaration(node) || ts.isBindingElement(node) || ts.isParameter(node)) return ts.isIdentifier(node.name) ? node.name.text : undefined;
  if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isImportClause(node)) return node.name?.text;
  if (ts.isImportSpecifier(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node)) return node.name.text;
  return undefined;
}
/** How many declarations under `node` bind `name`. */
function bindings(node: ts.Node, name: string): number {
  let count = 0;
  walk(node, (inner) => {
    if (boundName(inner) === name) count += 1;
  });
  return count;
}
function registerDerivation(text: string): string[] {
  const owed = (what: string): string => `D4 ${EXECUTOR}${what}: ${RERUN}`;
  const source = parsed(EXECUTOR, text);
  const findings: string[] = [];
  const imports = source.statements.some((statement) => {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "./durability.js") return false;
    const bindings = statement.importClause?.namedBindings;
    return bindings !== undefined && ts.isNamedImports(bindings) && bindings.elements.some((element) => element.propertyName === undefined && element.name.text === "DurabilityProfile");
  });
  if (!imports || bindings(source, "DurabilityProfile") !== 1) findings.push(owed(" no longer imports DurabilityProfile from ./durability.js as its one binding of that name"));
  const methods: ts.MethodDeclaration[] = [];
  walk(source, (node) => {
    if (ts.isMethodDeclaration(node) && nameOf(node.name) === "register" && node.body !== undefined) methods.push(node);
  });
  const [method] = methods;
  if (methods.length !== 1 || method === undefined || method.body === undefined) return [...findings, owed(` declares ${methods.length} register methods with a body, not one`)];
  const body = method.body;
  const [subject, , options] = method.parameters;
  const emptyDefault = options?.initializer === undefined || (ts.isObjectLiteralExpression(options.initializer) && options.initializer.properties.length === 0);
  if (options === undefined || !ts.isIdentifier(options.name) || options.name.text !== "options" || !emptyDefault) findings.push(owed("'s register method no longer takes options with no default or an empty object default"));
  const named = subject !== undefined && ts.isIdentifier(subject.name) ? subject.name.text : undefined;
  const stringTest = (node: ts.Expression): boolean => {
    const test = parens(node);
    return (
      ts.isBinaryExpression(test) &&
      test.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken &&
      ts.isTypeOfExpression(test.left) &&
      ts.isIdentifier(test.left.expression) &&
      test.left.expression.text === named &&
      ts.isStringLiteral(test.right) &&
      test.right.text === "string"
    );
  };
  const declared = bindings(body, "profile");
  const mentionsOptions = (node: ts.Node): boolean => {
    let found = false;
    walk(node, (inner) => {
      if (ts.isIdentifier(inner) && inner.text === "options") found = true;
    });
    return found;
  };
  const UPDATES: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken]);
  let rewrites = 0;
  walk(body, (node) => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment && mentionsOptions(node.left)) rewrites += 1;
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && UPDATES.has(node.operator) && mentionsOptions(node.operand)) rewrites += 1;
    if (ts.isDeleteExpression(node) && mentionsOptions(node.expression)) rewrites += 1;
  });
  if (rewrites > 0) findings.push(owed("'s register method no longer reads its options as given (its body assigns, updates or deletes a target that mentions options)"));
  const initializes = body.statements.some(
    (statement) =>
      ts.isVariableStatement(statement) &&
      (statement.declarationList.flags & ts.NodeFlags.BlockScoped) === ts.NodeFlags.Const &&
      statement.declarationList.declarations.some((declaration) => {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "profile" || declaration.initializer === undefined) return false;
        const value = parens(declaration.initializer);
        return ts.isConditionalExpression(value) && stringTest(value.condition) && isDerivation(value.whenTrue);
      }),
  );
  if (declared !== 1 || !initializes) findings.push(owed(`'s register method no longer declares one const profile initialized from ${DERIVATION} on its string-name branch in its code`));
  const stores: ts.CallExpression[] = [];
  walk(body, (node) => {
    if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression) || node.expression.name.text !== "set") return;
    const registry = node.expression.expression;
    if (ts.isPropertyAccessExpression(registry) && registry.expression.kind === ts.SyntaxKind.ThisKeyword && registry.name.text === "#durability") stores.push(node);
  });
  const [store] = stores;
  const stored = store?.arguments[1];
  const direct = store !== undefined && body.statements.some((statement) => ts.isExpressionStatement(statement) && statement.expression === store);
  if (stores.length !== 1 || !direct || stored === undefined || !ts.isIdentifier(stored) || stored.text !== "profile") {
    findings.push(owed("'s register method no longer stores that profile once (one this.#durability.set(..., profile) call, a direct statement of its body)"));
  }
  return findings;
}

/** D4: the durability module rides in the tarball, and executor.js derives an undeclared registration's profile through the call (DERIVATION). */
function durabilityModule(tree: Tree): string[] {
  const findings: string[] = [];
  for (const path of ["package/dist/src/durability.js", "package/dist/src/durability.d.ts"]) if (!tree.tarball.has(path)) findings.push(`D4 the vendored tarball has no ${path}`);
  const executor = tree.tarball.get(EXECUTOR) ?? "";
  for (const line of [DERIVATION, "every member false when none was"]) {
    if (!executor.includes(line)) findings.push(`D4 ${EXECUTOR} no longer reads ${JSON.stringify(line)}: ${RERUN}`);
  }
  findings.push(...registerDerivation(executor));
  return findings;
}

/** V1: every versioned spelling in src/ belongs to a SITES row read its listed number of times, each naming the vendored version. */
function versionLiterals(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V1 ${problem}`);
  const findings: string[] = [];
  const counts = new Map<string, number>();
  for (const [file, text] of tree.files) {
    if (!inSrc(file)) continue;
    for (const { form, pattern } of FORMS) {
      for (const match of text.matchAll(pattern)) {
        const key = `${file} (${form} form)`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
        if (match[1] !== version) findings.push(`V1 stale site ${key} names ${String(match[1])}; the vendored tarball is ${version}`);
      }
    }
  }
  for (const site of SITES) {
    const key = `${site.file} (${site.form} form)`;
    const read = counts.get(key) ?? 0;
    if (read !== site.count) findings.push(`V1 listed site ${key}, ${site.what}, is read ${read} times, listed ${site.count}`);
    counts.delete(key);
  }
  for (const [key, read] of counts) findings.push(`V1 unlisted site ${key}, read ${read} times: every versioned ${SDK} spelling in src/ moves with the vendored tarball, so list it`);
  return findings;
}

/** V2: the FurnaceReading source type's sdk member and the reading's sdk value each name the vendored version, once. */
function observerSdk(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V2 ${problem}`);
  const text = tree.files.get(OBSERVER);
  if (text === undefined) return [`V2 ${OBSERVER} is not listed`];
  const typed: string[] = [];
  const valued: string[] = [];
  walk(parsed(OBSERVER, text), (node) => {
    if (ts.isPropertySignature(node) && nameOf(node.name) === "sdk" && node.type !== undefined && ts.isLiteralTypeNode(node.type) && ts.isStringLiteralLike(node.type.literal)) typed.push(node.type.literal.text);
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === "sdk" && ts.isStringLiteralLike(node.initializer)) valued.push(node.initializer.text);
  });
  const findings: string[] = [];
  for (const [what, values] of [
    ["the reading type's sdk member", typed],
    ["the reading's sdk value", valued],
  ] as const) {
    if (values.length !== 1) findings.push(`V2 ${OBSERVER} carries ${values.length} literals for ${what}, not one`);
    for (const value of values) if (value !== `${SDK}@${version}`) findings.push(`V2 ${what} is ${value}; the vendored tarball is ${version}`);
  }
  return findings;
}

/** V3: the legacy and native furnace.run.inspect descriptors' contractSource literals begin with the vendored version. */
function providerContractSource(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V3 ${problem}`);
  const text = tree.files.get(PROVIDER);
  if (text === undefined) return [`V3 ${PROVIDER} is not listed`];
  const values: string[] = [];
  walk(parsed(PROVIDER, text), (node) => {
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === "contractSource" && ts.isStringLiteralLike(node.initializer)) values.push(node.initializer.text);
  });
  const findings: string[] = [];
  if (values.length !== 2) findings.push(`V3 ${PROVIDER} carries ${values.length} contractSource literals, not the two (legacy and native) registrations`);
  for (const value of values) if (!value.startsWith(`${SDK}@${version}:`)) findings.push(`V3 a furnace.run.inspect contractSource is ${value}; the vendored tarball is ${version}`);
  return findings;
}

const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** The token kinds marked renders no text for: raw HTML (comments included; a raw HTML block is R-HTML-BLOCK), link-reference definitions and image alt text. */
const UNSHOWN: ReadonlySet<string> = new Set(["html", "def", "image"]);
/**
 * vendor/README.md as marked renders its page: the text of each top-level block through marked's tokens - paragraphs,
 * headings, lists, tables, quotes and code alike - with raw HTML (comments included), link-reference definitions and image
 * alt text dropped.
 */
function shownBlocks(markdown: string): string[] {
  const shown = (token: Token): string => {
    if (UNSHOWN.has(token.type)) return "";
    if (isList(token)) return token.items.map((item) => ` ${shown(item)} `).join("");
    if (isTable(token)) return [...token.header, ...token.rows.flat()].map((cell) => ` ${cell.tokens.map(shown).join("")} `).join("");
    if ("tokens" in token && token.tokens !== undefined && token.tokens.length > 0) return token.tokens.map(shown).join("");
    return "text" in token && typeof token.text === "string" ? token.text : token.raw;
  };
  return marked.lexer(markdown).map((token) => collapse(shown(token)));
}

const U1_QUOTE = "the vendored 0.1.0 pin remains correct";

/** U1: the vendored version is the clause's own, and vendor/README.md's rendered page shows one record of the tarball as wb-zby's repack. */
function untilThenPin(tree: Tree): string[] {
  const { version, tarballName, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `U1 ${problem}`);
  const findings: string[] = [];
  const clause = /\b(\d+\.\d+\.\d+)\b/.exec(U1_QUOTE)?.[1];
  if (version !== clause) findings.push(`U1 the vendored ${SDK} is ${version}, not the until-then ${String(clause)}: ${TRIGGERED}`);
  const records = shownBlocks(tree.readme).flatMap((block) => [...block.matchAll(PROVENANCE)]);
  const [recorded] = records;
  if (recorded === undefined) findings.push(`U1 vendor/README.md no longer records the vendored tarball as wb-zby's repack from Furnace revision ${ZBY_REVISION}: ${TRIGGERED}`);
  else if (records.length > 1) findings.push(`U1 vendor/README.md shows ${records.length} records of a tarball as wb-zby's repack, not one`);
  else {
    if (recorded[1] !== tarballName) findings.push(`U1 vendor/README.md records ${String(recorded[1])} as wb-zby's repack, not the vendored ${String(tarballName)}`);
    if (recorded[3] !== ZBY_REVISION) findings.push(`U1 vendor/README.md records the repack from Furnace revision ${String(recorded[3])}, not ${ZBY_REVISION}`);
  }
  return findings;
}

/** U2: the tarball's contract manifest digest equals its generated provenance digest (what the decodeContextValue preflight admits). */
function oneArtifact(tree: Tree): string[] {
  const manifest = jsonEntry(tree, "package/contract/manifest.json");
  const declared = typeof manifest?.smithy_model_digest === "string" ? manifest.smithy_model_digest : undefined;
  const generated = /sha256:[0-9a-f]{64}/.exec(tree.tarball.get("package/dist/contract/furnace-executor-contract/provenance.js") ?? "")?.[0];
  if (declared === undefined || generated === undefined) return [`U2 the vendored tarball carries no readable contract digest pair (manifest ${String(declared)}, provenance ${String(generated)})`];
  if (declared === generated) return [];
  return [`U2 the vendored tarball's manifest digest ${declared} differs from its generated provenance digest ${generated}: the decodeContextValue preflight fails closed on it (acceptance 3, the wb-zby failure mode)`];
}

// Plant builders: each returns a new tree and refuses a plant that changes nothing, so no plant is hollow.
function withFile(tree: Tree, file: string, text: string): Tree {
  return { ...tree, files: new Map([...tree.files, [file, text]]) };
}
function editFile(tree: Tree, file: string, edit: (text: string) => string): Tree {
  const text = tree.files.get(file);
  if (text === undefined) throw new Error(`a plant edits ${file}, which the tree does not list`);
  const next = edit(text);
  if (next === text) throw new Error(`a plant leaves ${file} unchanged`);
  return withFile(tree, file, next);
}
function editEntry(tree: Tree, path: string, edit: (text: string) => string | undefined): Tree {
  const text = tree.tarball.get(path);
  if (text === undefined) throw new Error(`a plant edits ${path}, which the tarball does not carry`);
  const next = edit(text);
  if (next === text) throw new Error(`a plant leaves ${path} unchanged`);
  const tarball = new Map(tree.tarball);
  if (next === undefined) tarball.delete(path);
  else tarball.set(path, next);
  return { ...tree, tarball };
}
function addEntry(tree: Tree, path: string, text: string): Tree {
  if (tree.tarball.has(path)) throw new Error(`a plant adds ${path}, which the tarball already carries`);
  return { ...tree, tarball: new Map([...tree.tarball, [path, text]]) };
}
function editReadme(tree: Tree, edit: (text: string) => string): Tree {
  const readme = edit(tree.readme);
  if (readme === tree.readme) throw new Error("a plant leaves vendor/README.md unchanged");
  return { ...tree, readme };
}
/** An owner re-vendor to `version`: package.json's spec and the tarball's own package.json move together. */
function revendor(tree: Tree, version: string): Tree {
  const moved = editEntry(tree, "package/package.json", (text) => text.replace(/"version": "[^"]+"/, `"version": "${version}"`));
  return { ...moved, spec: `file:vendor/furnace-sdk-${version}.tgz` };
}
/** Moves every versioned spelling in `files` to `version`. */
function bump(tree: Tree, version: string, ...files: readonly string[]): Tree {
  return files.reduce((next, file) => editFile(next, file, (text) => FORMS.reduce((moved, { pattern, spell }) => moved.replace(pattern, () => spell(version)), text)), tree);
}

type Judge = (tree: Tree) => string[];
type Source = "acceptance-4" | "statement" | "note-b";
interface Plant {
  readonly name: string;
  readonly tree: (real: Tree) => Tree;
  readonly findings: readonly string[];
}
interface JudgedPin {
  readonly kind: "judged";
  readonly id: string;
  readonly source: Source;
  readonly quote: string;
  readonly judge: Judge;
  readonly plants: readonly Plant[];
}
interface QuietPin {
  readonly kind: "quiet";
  readonly id: string;
  readonly residual: string;
  readonly judge: Judge;
  readonly quiet: (real: Tree) => Tree;
  readonly control: (real: Tree) => Tree;
}
type Pin = JudgedPin | QuietPin;
interface Row {
  readonly id: string;
  readonly pins: readonly Pin[];
}

const REAL = readTree();
// Warm the parse cache at collection, so no case pays for parsing every script under its timeout.
deepLoads(REAL);

const NEXT = "0.2.0";
const NEXT_SOURCE = `${SDK}@0.1.0:Furnace.runs.get().inspect`;
const REAL_DIGEST = (tree: Tree): string => String(jsonEntry(tree, "package/contract/manifest.json")?.smithy_model_digest);
const STALE_DIGEST = `sha256:${"e5995480".padEnd(64, "0")}`;
/** A deep path no DEEP row lists, and the D1 finding a planted load of it reads as. */
const CLIENT = `${SDK}/dist/src/host_client.js`;
const unlisted = (specifier: string, file: string, names: string): string => `D1 unlisted deep import ${specifier} in ${file} (${names}): every ${SDK}/<path> load is re-measured on re-vendor, so list it`;
const unlistedClient = (file: string, names: string): string => unlisted(CLIENT, file, names);
/** One planted module in src/workbench/ loading CLIENT through one D1 form, and the finding it reads as. */
const loadPlant = (name: string, slug: string, text: string, names = "*"): Plant => ({
  name,
  tree: (real) => withFile(real, `src/workbench/plant-d1-${slug}.ts`, text),
  findings: [unlistedClient(`src/workbench/plant-d1-${slug}.ts`, names)],
});
const unlistedSite = (key: string): string => `V1 unlisted site ${key}, read 1 times: every versioned ${SDK} spelling in src/ moves with the vendored tarball, so list it`;
const switchOwed = (field: string, entry: string, names: string, chain: string): string =>
  `D3 the vendored SDK's ${field} entry ${entry} exposes ${names} through export * (${chain}): switch its deep import to the index re-export (acceptance 4)`;
const owedD4 = (what: string): string => `D4 ${EXECUTOR}'s register method ${what}: ${RERUN}`;
const D4_INIT = owedD4(`no longer declares one const profile initialized from ${DERIVATION} on its string-name branch in its code`);
const D4_STORE = owedD4("no longer stores that profile once (one this.#durability.set(..., profile) call, a direct statement of its body)");
const D4_OPTIONS = owedD4("no longer takes options with no default or an empty object default");
const D4_INPUT = owedD4("no longer reads its options as given (its body assigns, updates or deletes a target that mentions options)");
const D4_IMPORT = `D4 ${EXECUTOR} no longer imports DurabilityProfile from ./durability.js as its one binding of that name: ${RERUN}`;
const PROFILE_LINE = 'const profile = typeof nameOrDeclaration === "string" ? DurabilityProfile.fromDeclaration(options.durability) : nameOrDeclaration.durability;';
const STORE_LINE = "this.#durability.set(identifier, profile);";
const RECORD_TEXT = "was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8";
const OLD_RECORD = `furnace-sdk-0.1.0.tgz ${RECORD_TEXT}`;
const SECOND_RECORD = "furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-18 (wb-zby) from Furnace revision 0123456789";
const NO_RECORD = `U1 vendor/README.md no longer records the vendored tarball as wb-zby's repack from Furnace revision ${ZBY_REVISION}: ${TRIGGERED}`;
const DURABILITY = `${SDK}/dist/src/durability.js`;
/** Cut #2's R-INDIRECT-LOADER quiet plant (plus a loader imported from another module), verbatim: every specifier is a literal, so D1 (e) reads each one. */
const INDIRECT_LOADERS = [
  'import { createRequire } from "node:module";',
  "const loaders = { load: createRequire(import.meta.url) };",
  'export const held: unknown = loaders.load("@furnace/sdk/dist/src/durability.js");',
  'export const passed = (fn: (id: string) => unknown): unknown => fn("@furnace/sdk/dist/src/durability.js");',
  "const make = (): NodeJS.Require => createRequire(import.meta.url);",
  'export const returned: unknown = make()("@furnace/sdk/dist/src/durability.js");',
  "const created = createRequire(import.meta.url);",
  'export const called: unknown = created.call(undefined, "@furnace/sdk/dist/src/durability.js");',
  'export const applied: unknown = Reflect.apply(created, undefined, ["@furnace/sdk/dist/src/durability.js"]);',
  'export const bound: unknown = created.bind(undefined)("@furnace/sdk/dist/src/durability.js");',
  'export const computed: unknown = created["re" + "solve"]("@furnace/sdk/dist/src/durability.js");',
  'import { load as imported } from "./loader.js";',
  'export const fromImport: unknown = imported("@furnace/sdk/dist/src/durability.js");',
  "",
].join("\n");
/** A worker source that spells its loads in its text (the src/workflow/worker-source.ts shape). */
const RUNTIME_SOURCE = ["export const SOURCE = 'const client = require(\"@furnace/sdk/dist/src/client.js\");';", 'export const TEMPLATE = `import("@furnace/sdk/dist/src/client.js")`;', ""].join("\n");

const ROWS: readonly Row[] = [
  {
    id: "D",
    pins: [
      {
        kind: "judged",
        id: "D1",
        source: "acceptance-4",
        quote: "Deep imports furnace-hosted.ts:37-38 re-measured",
        judge: deepImportSet,
        plants: [
          {
            name: "a new deep load in src/",
            tree: (real) => withFile(real, "src/workbench/plant-d1.ts", 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
            findings: [unlistedClient("src/workbench/plant-d1.ts", "HostClient")],
          },
          {
            name: "the embedded host taken from the index instead",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace('import { EmbeddedHost } from "@furnace/sdk/dist/src/embedded.js";', 'import { EmbeddedHost } from "@furnace/sdk";')),
            findings: [`D1 listed deep import ${SDK}/dist/src/embedded.js in ${HOSTED} is read 0 times, not once`],
          },
          {
            name: "a second name through a listed path",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("import { ResidentSession } from", "import { ResidentSession, type ResidentSessionOptions } from")),
            findings: [`D1 ${HOSTED} imports ResidentSession, ResidentSessionOptions from ${SDK}/dist/src/resident_session.js, listed ResidentSession`],
          },
          {
            name: "an export declaration re-exporting a deep path by name",
            tree: (real) => withFile(real, "src/workbench/plant-d1-export.ts", 'export { HostClient } from "@furnace/sdk/dist/src/host_client.js";\n'),
            findings: [unlistedClient("src/workbench/plant-d1-export.ts", "HostClient")],
          },
          {
            name: "an export * of a deep path",
            tree: (real) => withFile(real, "src/workbench/plant-d1-star.ts", 'export * from "@furnace/sdk/dist/src/host_client.js";\n'),
            findings: [unlistedClient("src/workbench/plant-d1-star.ts", "*")],
          },
          {
            name: "an import-equals declaration",
            tree: (real) => withFile(real, "src/workbench/plant-d1-equals.ts", 'import client = require("@furnace/sdk/dist/src/host_client.js");\nexport { client };\n'),
            findings: [unlistedClient("src/workbench/plant-d1-equals.ts", "*")],
          },
          {
            name: "a type-only import",
            tree: (real) => withFile(real, "src/workbench/plant-d1-type-only.ts", 'import type { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport type Planted = HostClient;\n'),
            findings: [unlistedClient("src/workbench/plant-d1-type-only.ts", "HostClient")],
          },
          {
            name: "an import type",
            tree: (real) => withFile(real, "src/workbench/plant-d1-import-type.ts", 'export type Planted = import("@furnace/sdk/dist/src/host_client.js").HostClient;\n'),
            findings: [unlistedClient("src/workbench/plant-d1-import-type.ts", "type")],
          },
          {
            name: "a dynamic import()",
            tree: (real) => withFile(real, "src/workbench/plant-d1-dynamic.ts", 'export const load = (): Promise<unknown> => import("@furnace/sdk/dist/src/host_client.js");\n'),
            findings: [unlistedClient("src/workbench/plant-d1-dynamic.ts", "*")],
          },
          {
            name: "a require() call",
            tree: (real) => withFile(real, "src/workbench/plant-d1-require.ts", 'declare const require: (id: string) => unknown;\nexport const planted = require("@furnace/sdk/dist/src/host_client.js");\n'),
            findings: [unlistedClient("src/workbench/plant-d1-require.ts", "*")],
          },
          {
            name: "a *.resolve() call",
            tree: (real) => withFile(real, "src/workbench/plant-d1-resolve.ts", 'export const where = import.meta.resolve("@furnace/sdk/dist/src/host_client.js");\n'),
            findings: [unlistedClient("src/workbench/plant-d1-resolve.ts", "*")],
          },
          {
            name: "a created require called at once",
            tree: (real) => withFile(real, "src/workbench/plant-d1-created.ts", 'import { createRequire } from "node:module";\nexport const planted: unknown = createRequire(import.meta.url)("@furnace/sdk/dist/src/host_client.js");\n'),
            findings: [unlistedClient("src/workbench/plant-d1-created.ts", "*")],
          },
          {
            name: "a call through a name bound to a created require",
            tree: (real) =>
              withFile(real, "src/workbench/plant-d1-bound.ts", 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n'),
            findings: [unlistedClient("src/workbench/plant-d1-bound.ts", "*")],
          },
          {
            name: "a deep load in src/ outside src/workbench/",
            tree: (real) => withFile(real, "src/plant-d1-root.ts", 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
            findings: [unlistedClient("src/plant-d1-root.ts", "HostClient")],
          },
          {
            name: "a listed deep import read twice",
            tree: (real) =>
              editFile(real, HOSTED, (text) =>
                text.replace(
                  'import { EmbeddedHost } from "@furnace/sdk/dist/src/embedded.js";',
                  'import { EmbeddedHost } from "@furnace/sdk/dist/src/embedded.js";\nimport { EmbeddedHost as EmbeddedHostAgain } from "@furnace/sdk/dist/src/embedded.js";',
                ),
              ),
            findings: [`D1 listed deep import ${SDK}/dist/src/embedded.js in ${HOSTED} is read 2 times, not once`],
          },
          {
            name: "deep loads in .tsx, .mts and .cts scripts",
            tree: (real) =>
              ["src/workbench/plant-d1.tsx", "src/workbench/plant-d1.mts", "src/workbench/plant-d1.cts"].reduce(
                (next, file) => withFile(next, file, 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
                real,
              ),
            findings: [unlistedClient("src/workbench/plant-d1.tsx", "HostClient"), unlistedClient("src/workbench/plant-d1.mts", "HostClient"), unlistedClient("src/workbench/plant-d1.cts", "HostClient")],
          },
          loadPlant(
            "a parenthesized created require called at once (P31e)",
            "paren-created",
            'import { createRequire } from "node:module";\nexport const planted: unknown = (createRequire(import.meta.url))("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name bound to a created require through an as assertion (P31c)",
            "bound-as",
            'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url) as (id: string) => unknown;\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name bound to a created require through parentheses (P31f)",
            "bound-paren",
            'import { createRequire } from "node:module";\nconst load = (createRequire(import.meta.url));\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name bound to a created require through satisfies (P31g)",
            "bound-satisfies",
            'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url) satisfies NodeJS.Require;\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name assigned a created require (P31d)",
            "assigned",
            'import { createRequire } from "node:module";\nlet load: NodeJS.Require | undefined;\nload = createRequire(import.meta.url);\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant("a parenthesized require callee (P31h)", "paren-require", 'declare const require: (id: string) => unknown;\nexport const planted = (require)("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant("a parenthesized *.resolve() callee (P31i)", "paren-resolve", 'export const where = (import.meta.resolve)("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant(
            "createRequire imported under an alias and called at once (P31a)",
            "alias-created",
            'import { createRequire as nodeRequire } from "node:module";\nexport const planted: unknown = nodeRequire(import.meta.url)("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "createRequire imported under an alias, through a bound name (P31b)",
            "alias-bound",
            'import { createRequire as nodeRequire } from "node:module";\nconst load = nodeRequire(import.meta.url);\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant("a member .require() call (P31n)", "member-require", 'export const planted: unknown = module.require("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant("a non-null assertion on the require callee", "non-null", 'declare const require: ((id: string) => unknown) | undefined;\nexport const planted = require!("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant("a type assertion on the require callee", "type-assertion", 'declare const require: unknown;\nexport const planted = (<(id: string) => unknown>require)("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant("a comma sequence callee", "comma", 'declare const require: (id: string) => unknown;\nexport const planted = (0, require)("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant(
            "a name bound by a logical assignment",
            "logical-assignment",
            'import { createRequire } from "node:module";\nlet load: NodeJS.Require | undefined;\nload ??= createRequire(import.meta.url);\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name bound by a binding-element default",
            "binding-default",
            'import { createRequire } from "node:module";\nconst [load = createRequire(import.meta.url)] = [];\nexport const planted: unknown = load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name bound by a parameter default",
            "parameter-default",
            'import { createRequire } from "node:module";\nexport const planted = (load = createRequire(import.meta.url)): unknown => load("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a name re-aliased from a loader name",
            "realiased",
            'import { createRequire } from "node:module";\nconst created = createRequire(import.meta.url);\nconst again = created;\nexport const planted: unknown = again("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant("a name bound to require itself", "require-alias", 'declare const require: (id: string) => unknown;\nconst load = require;\nexport const planted = load("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant("a resolve destructured from import.meta", "destructured-resolve", 'const { resolve } = import.meta;\nexport const where = resolve("@furnace/sdk/dist/src/host_client.js");\n'),
          loadPlant(
            "a member named by a string-literal key (P31j)",
            "string-key",
            'import { createRequire } from "node:module";\nconst created = createRequire(import.meta.url);\nexport const where = created["resolve"]("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "a member named createRequire bound to a name",
            "member-creator",
            'import * as nodeModule from "node:module";\nconst make = nodeModule.createRequire;\nexport const planted: unknown = make(import.meta.url)("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant(
            "createRequire destructured under another name",
            "destructured-creator",
            'import * as nodeModule from "node:module";\nconst { createRequire: make } = nodeModule;\nexport const planted: unknown = make(import.meta.url)("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          loadPlant("a wrapped specifier argument", "wrapped-specifier", 'declare const require: (id: string) => unknown;\nexport const planted = require(("@furnace/sdk/dist/src/host_client.js" as string));\n'),
          loadPlant("a no-substitution template literal specifier", "template", "export const load = (): Promise<unknown> => import(`@furnace/sdk/dist/src/host_client.js`);\n"),
          loadPlant(
            "an optional call through a bound created require",
            "optional-call",
            'import { createRequire } from "node:module";\nconst load: NodeJS.Require | undefined = createRequire(import.meta.url);\nexport const planted: unknown = load?.("@furnace/sdk/dist/src/host_client.js");\n',
          ),
          {
            name: "a deep load spelled through node_modules",
            tree: (real) => withFile(real, "src/workbench/plant-d1-node-modules.ts", 'import { HostClient } from "../../node_modules/@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
            findings: [unlisted("../../node_modules/@furnace/sdk/dist/src/host_client.js", "src/workbench/plant-d1-node-modules.ts", "HostClient")],
          },
          loadPlant("an ambient module declaration", "declare-module", 'declare module "@furnace/sdk/dist/src/host_client.js" {\n  interface HostClient {\n    planted: true;\n  }\n}\nexport {};\n', "declare module"),
          {
            name: "a /// <reference types> directive",
            tree: (real) => withFile(real, "src/workbench/plant-d1-reference-types.ts", '/// <reference types="@furnace/sdk/dist/src/host_client" />\nexport {};\n'),
            findings: [unlisted(`${SDK}/dist/src/host_client`, "src/workbench/plant-d1-reference-types.ts", "reference types")],
          },
          {
            name: "a /// <reference path> directive through node_modules",
            tree: (real) => withFile(real, "src/workbench/plant-d1-reference-path.ts", '/// <reference path="../../node_modules/@furnace/sdk/dist/src/host_client.d.ts" />\nexport {};\n'),
            findings: [unlisted("../../node_modules/@furnace/sdk/dist/src/host_client.d.ts", "src/workbench/plant-d1-reference-path.ts", "reference path")],
          },
          {
            name: "deep loads in .js, .jsx, .mjs and .cjs scripts",
            tree: (real) =>
              ["src/workbench/plant-d1.js", "src/workbench/plant-d1.jsx", "src/workbench/plant-d1.mjs", "src/workbench/plant-d1.cjs"].reduce(
                (next, file) => withFile(next, file, 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
                real,
              ),
            findings: [
              unlistedClient("src/workbench/plant-d1.js", "HostClient"),
              unlistedClient("src/workbench/plant-d1.jsx", "HostClient"),
              unlistedClient("src/workbench/plant-d1.mjs", "HostClient"),
              unlistedClient("src/workbench/plant-d1.cjs", "HostClient"),
            ],
          },
          {
            name: "a deep path in a string literal nothing loads (D1 (e) BACKSTOP)",
            tree: (real) => withFile(real, "src/workbench/plant-d1-literal.ts", 'export const PATH = "@furnace/sdk/dist/src/host_client.js";\n'),
            findings: [unreadLiteral(CLIENT, "src/workbench/plant-d1-literal.ts")],
          },
          {
            name: "an escape-spelled deep path literal nothing loads",
            tree: (real) => withFile(real, "src/workbench/plant-d1-escaped.ts", 'export const PATH = "\\u0040furnace/sdk/dist/src/host_client.js";\n'),
            findings: [unreadLiteral(CLIENT, "src/workbench/plant-d1-escaped.ts")],
          },
          {
            name: "a deep path in a template literal's head",
            tree: (real) => withFile(real, "src/workbench/plant-d1-template-head.ts", "export const at = (file: string): string => `@furnace/sdk/dist/src/$" + "{file}`;\n"),
            findings: [unreadLiteral(`${SDK}/dist/src/`, "src/workbench/plant-d1-template-head.ts")],
          },
          {
            name: "indirect loaders with literal deep specifiers (cut #2's R-INDIRECT-LOADER quiet plant, now read by the BACKSTOP)",
            tree: (real) => withFile(real, "src/workbench/plant-d1-indirect.ts", INDIRECT_LOADERS),
            findings: Array.from({ length: 8 }, () => unreadLiteral(DURABILITY, "src/workbench/plant-d1-indirect.ts")),
          },
          {
            name: "a worker source spelling deep loads in its text",
            tree: (real) => withFile(real, "src/workbench/plant-d1-runtime.ts", RUNTIME_SOURCE),
            findings: [unreadLiteral(`const client = require("${SDK}/dist/src/client.js");`, "src/workbench/plant-d1-runtime.ts"), unreadLiteral(`import("${SDK}/dist/src/client.js")`, "src/workbench/plant-d1-runtime.ts")],
          },
          {
            name: "a deep path in a JSX attribute and in JSX text",
            tree: (real) => withFile(real, "src/workbench/plant-d1-jsx.tsx", 'export const image = <img src="@furnace/sdk/dist/src/host_client.js" />;\nexport const label = <p>@furnace/sdk/dist/src/host_client.js</p>;\n'),
            findings: [unreadLiteral(CLIENT, "src/workbench/plant-d1-jsx.tsx"), unreadLiteral(CLIENT, "src/workbench/plant-d1-jsx.tsx")],
          },
        ],
      },
      {
        kind: "judged",
        id: "D2",
        source: "acceptance-4",
        quote: "resolve against the new tarball",
        judge: deepImportsResolve,
        plants: [
          {
            name: "a tarball without the embedded host module",
            tree: (real) => editEntry(real, "package/dist/src/embedded.js", () => undefined),
            findings: [`D2 ${SDK}/dist/src/embedded.js does not resolve: the vendored tarball has no package/dist/src/embedded.js`],
          },
          {
            name: "a tarball whose resident session class is renamed",
            tree: (real) => editEntry(real, "package/dist/src/resident_session.d.ts", (text) => text.replace("export declare class ResidentSession", "export declare class ResidentChannel")),
            findings: [
              "D2 package/dist/src/resident_session.d.ts declares no exported class ResidentSession",
              "D2 package/dist/src/resident_session.d.ts declares no exported class ResidentSession in its code (a comment declares nothing)",
            ],
          },
          {
            name: "a renamed resident session class whose old declaration a comment keeps",
            tree: (real) =>
              editEntry(real, "package/dist/src/resident_session.d.ts", (text) => text.replace("export declare class ResidentSession", "/* export declare class ResidentSession */\nexport declare class ResidentChannel")),
            findings: ["D2 package/dist/src/resident_session.d.ts declares no exported class ResidentSession in its code (a comment declares nothing)"],
          },
        ],
      },
      {
        kind: "judged",
        id: "D3",
        source: "acceptance-4",
        quote: "or switch to index re-exports if the regenerated SDK gains an exports map",
        judge: noSwitchOwed,
        plants: [
          {
            name: "a tarball that gains an exports map",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace('"main": "dist/src/index.js",', '"main": "dist/src/index.js",\n  "exports": { ".": "./dist/src/index.js" },')),
            findings: ["D3 the vendored SDK carries an exports map: switch the deep imports to index re-exports (acceptance 4)"],
          },
          {
            name: "a tarball whose index re-exports the embedded host",
            tree: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nexport { EmbeddedHost } from "./embedded.js";\n`),
            findings: ["D3 the vendored SDK's types entry dist/src/index.d.ts names EmbeddedHost: switch its deep import to the index re-export (acceptance 4)"],
          },
          {
            name: "the header claim dropped",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("(no index re-export, no exports map).", "(see the SDK index).")),
            findings: [`D3 ${HOSTED}'s header no longer states the deep-import claim this row holds the vendored tarball to`],
          },
          {
            name: "a main entry that names the resident session",
            tree: (real) => editEntry(real, "package/dist/src/index.js", (text) => `${text}\nexport { ResidentSession } from "./resident_session.js";\n`),
            findings: ["D3 the vendored SDK's main entry dist/src/index.js names ResidentSession: switch its deep import to the index re-export (acceptance 4)"],
          },
          {
            name: "an index export * of the embedded module",
            tree: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./embedded.js";\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/embedded.d.ts")],
          },
          {
            name: "an export * chain through the protocol module",
            tree: (real) => editEntry(real, "package/dist/src/protocol.js", (text) => `${text}\nexport * from "./resident_session.js";\n`),
            findings: [switchOwed("main", "dist/src/index.js", "ResidentSession", "dist/src/index.js -> dist/src/protocol.js -> dist/src/resident_session.js")],
          },
          {
            name: "a starred module re-exporting the embedded host by name",
            tree: (real) => editEntry(real, "package/dist/src/protocol.d.ts", (text) => `${text}\nexport { EmbeddedHost } from "./embedded.js";\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/protocol.d.ts")],
          },
          {
            name: "an index export * of the embedded module through the package's own name",
            tree: (real) => editEntry(real, "package/dist/src/index.js", (text) => `${text}\nexport * from "@furnace/sdk/dist/src/embedded.js";\n`),
            findings: [switchOwed("main", "dist/src/index.js", "EmbeddedHost", "dist/src/index.js -> dist/src/embedded.js")],
          },
          {
            name: "an index export * as of the resident session module",
            tree: (real) => editEntry(real, "package/dist/src/index.js", (text) => `${text}\nexport * as resident from "./resident_session.js";\n`),
            findings: [switchOwed("main", "dist/src/index.js", "ResidentSession", "dist/src/index.js -> dist/src/resident_session.js")],
          },
          {
            name: "an index export * of the embedded module by an extensionless specifier (RT25)",
            tree: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./embedded";\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/embedded.d.ts")],
          },
          {
            name: "an index export * of a directory index that star-exports the embedded module",
            tree: (real) => editEntry(addEntry(real, "package/dist/src/hosting/index.d.ts", 'export * from "../embedded.js";\n'), "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./hosting";\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/hosting/index.d.ts -> dist/src/embedded.d.ts")],
          },
          {
            name: "a main entry export * of the embedded module by an extensionless specifier",
            tree: (real) => editEntry(real, "package/dist/src/index.js", (text) => `${text}\nexport * from "./embedded";\n`),
            findings: [switchOwed("main", "dist/src/index.js", "EmbeddedHost", "dist/src/index.js -> dist/src/embedded.js")],
          },
          {
            name: "an index export * as of a module that star-exports the embedded module",
            tree: (real) => editEntry(addEntry(real, "package/dist/src/hosting.d.ts", 'export * from "./embedded.js";\n'), "package/dist/src/index.d.ts", (text) => `${text}\nexport * as hosting from "./hosting.js";\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/hosting.d.ts -> dist/src/embedded.d.ts")],
          },
          {
            name: "a starred module's local export of an imported embedded host",
            tree: (real) => editEntry(real, "package/dist/src/protocol.d.ts", (text) => `${text}\nimport { EmbeddedHost } from "./embedded.js";\nexport { EmbeddedHost };\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/protocol.d.ts")],
          },
          {
            name: "an index's local export of the embedded module's namespace",
            tree: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nimport * as embedded from "./embedded.js";\nexport { embedded };\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts")],
          },
          {
            name: "a tarball that gains a typesVersions field",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace('"types": "dist/src/index.d.ts",', '"types": "dist/src/index.d.ts",\n  "typesVersions": { "*": { "*": ["dist/src/*"] } },')),
            findings: ["D3 the vendored SDK carries a typesVersions field: re-measure its entries before keeping the deep imports (acceptance 4)"],
          },
          {
            name: "a main entry export * of the resident session module through the package's own name, extensionless",
            tree: (real) => editEntry(real, "package/dist/src/index.js", (text) => `${text}\nexport * from "@furnace/sdk/dist/src/resident_session";\n`),
            findings: [switchOwed("main", "dist/src/index.js", "ResidentSession", "dist/src/index.js -> dist/src/resident_session.js")],
          },
          {
            name: "a starred module's local export of a default import of the embedded module",
            tree: (real) => editEntry(real, "package/dist/src/protocol.d.ts", (text) => `${text}\nimport Host from "./embedded.js";\nexport { Host };\n`),
            findings: [switchOwed("types", "dist/src/index.d.ts", "EmbeddedHost", "dist/src/index.d.ts -> dist/src/protocol.d.ts")],
          },
        ],
      },
      {
        kind: "judged",
        id: "D4",
        source: "note-b",
        quote: "the deep-import census includes `dist/src/durability.js`",
        judge: durabilityModule,
        plants: [
          {
            name: "a tarball without the durability module",
            tree: (real) => editEntry(real, "package/dist/src/durability.js", () => undefined),
            findings: ["D4 the vendored tarball has no package/dist/src/durability.js"],
          },
          {
            name: "an executor that claims by default",
            tree: (real) => editEntry(real, "package/dist/src/executor.js", (text) => text.replaceAll(DERIVATION, "DurabilityProfile.fromDeclaration(options.durability ?? CLAIM_ALL)")),
            findings: [
              `D4 package/dist/src/executor.js no longer reads "${DERIVATION}": ${RERUN}`,
              D4_INIT,
            ],
          },
          {
            name: "a tarball without the durability declarations",
            tree: (real) => editEntry(real, "package/dist/src/durability.d.ts", () => undefined),
            findings: ["D4 the vendored tarball has no package/dist/src/durability.d.ts"],
          },
          {
            name: "an executor whose documented contract changes",
            tree: (real) => editEntry(real, "package/dist/src/executor.js", (text) => text.replace("every member false when none was", "every member true when none was")),
            findings: [`D4 package/dist/src/executor.js no longer reads "every member false when none was": ${RERUN}`],
          },
          {
            name: "an executor that claims by default while a comment keeps the derivation's text",
            tree: (real) => editEntry(real, "package/dist/src/executor.js", (text) => `${text.replaceAll(DERIVATION, "DurabilityProfile.fromDeclaration(options.durability ?? CLAIM_ALL)")}\n// ${DERIVATION}\n`),
            findings: [D4_INIT],
          },
          {
            name: "an executor whose string-name branch derives the profile, then discards it (RT27b)",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, PROFILE_LINE.replace(DERIVATION, `(void ${DERIVATION}, CLAIM_ALL)`))),
            findings: [D4_INIT],
          },
          {
            name: "an executor whose profile is a let",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, PROFILE_LINE.replace("const profile", "let profile"))),
            findings: [D4_INIT],
          },
          {
            name: "an executor whose string-name test is inverted",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, PROFILE_LINE.replace('=== "string"', '!== "string"'))),
            findings: [D4_INIT],
          },
          {
            name: "an executor whose profile is shadowed in a nested block",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `${PROFILE_LINE}\n        { const profile = CLAIM_ALL; void profile; }`)),
            findings: [D4_INIT],
          },
          {
            name: "an executor that stores a second value after the profile",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(STORE_LINE, `${STORE_LINE}\n        this.#durability.set(identifier, CLAIM_ALL);`)),
            findings: [D4_STORE],
          },
          {
            name: "an executor that stores another value",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(STORE_LINE, "this.#durability.set(identifier, CLAIM_ALL);")),
            findings: [D4_STORE],
          },
          {
            name: "an executor that stores the profile from inside a nested block",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(STORE_LINE, `{ ${STORE_LINE} }`)),
            findings: [D4_STORE],
          },
          {
            name: "an executor whose options default declares durability",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace("register(nameOrDeclaration, callback, options = {}) {", "register(nameOrDeclaration, callback, options = { durability: CLAIM_ALL }) {")),
            findings: [D4_OPTIONS],
          },
          {
            name: "an executor that takes DurabilityProfile from another module",
            tree: (real) =>
              editEntry(real, EXECUTOR, (text) => text.replace('import { DurabilityProfile, normalizeContinuity } from "./durability.js";', 'import { normalizeContinuity } from "./durability.js";\nimport { DurabilityProfile } from "./claims.js";')),
            findings: [D4_IMPORT],
          },
          {
            name: "an executor that shadows DurabilityProfile inside register",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `const DurabilityProfile = { fromDeclaration: () => CLAIM_ALL };\n        ${PROFILE_LINE}`)),
            findings: [D4_IMPORT],
          },
          {
            name: "an executor whose register reassigns options",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `options = { durability: CLAIM_ALL };\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
          {
            name: "an executor whose register sets options.durability",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `options.durability = CLAIM_ALL;\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
          {
            name: "an executor whose register deletes options.durability",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `delete options.durability;\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
          {
            name: "an executor whose register sets a nested member of options",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `options.durability.checkpoint = true;\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
          {
            name: "an executor whose register destructures into options",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `({ durability: options.durability } = { durability: CLAIM_ALL });\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
          {
            name: "an executor whose register updates a member of options",
            tree: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, `options.revision++;\n        ${PROFILE_LINE}`)),
            findings: [D4_INPUT],
          },
        ],
      },
    ],
  },
  {
    id: "V",
    pins: [
      {
        kind: "judged",
        id: "V1",
        source: "acceptance-4",
        quote: "version literals move in the same commit",
        judge: versionLiterals,
        plants: [
          {
            name: "a re-vendor that leaves the hosted header behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER),
            findings: [`V1 stale site ${HOSTED} (space form) names 0.1.0; the vendored tarball is ${NEXT}`],
          },
          {
            name: "an unlisted versioned spelling",
            tree: (real) => withFile(real, "src/workbench/plant-v1.ts", 'export const PINNED = "@furnace/sdk@0.1.0";\n'),
            findings: [unlistedSite("src/workbench/plant-v1.ts (at form)")],
          },
          {
            name: "a listed site that stops spelling the version",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("(@furnace/sdk 0.1.0, furnace.executor.v1)", "(furnace.executor.v1)")),
            findings: [`V1 listed site ${HOSTED} (space form), the module header's verified-protocol line, is read 0 times, listed 1`],
          },
          {
            name: "a tarball whose own version disagrees with its file name",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace(/"version": "[^"]+"/, `"version": "${NEXT}"`)),
            findings: [`V1 the vendored tarball's package.json says ${NEXT} where its file name says 0.1.0`],
          },
          {
            name: "a clean re-vendor (every site moved)",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER, HOSTED),
            findings: [],
          },
          {
            name: "an unlisted space-form spelling",
            tree: (real) => withFile(real, "src/workbench/plant-v1-space.ts", "// verified against @furnace/sdk 0.1.0\nexport {};\n"),
            findings: [unlistedSite("src/workbench/plant-v1-space.ts (space form)")],
          },
          {
            name: "an unlisted tarball-form spelling",
            tree: (real) => withFile(real, "src/workbench/plant-v1-tarball.ts", 'export const ARTIFACT = "vendor/furnace-sdk-0.1.0.tgz";\n'),
            findings: [unlistedSite("src/workbench/plant-v1-tarball.ts (tarball form)")],
          },
          {
            name: "an unlisted spelling in src/ outside src/workbench/",
            tree: (real) => withFile(real, "src/plant-v1-root.ts", 'export const PINNED = "@furnace/sdk@0.1.0";\n'),
            findings: [unlistedSite("src/plant-v1-root.ts (at form)")],
          },
          {
            name: "a listed site spelled once more than listed",
            tree: (real) => editFile(real, OBSERVER, (text) => `// @furnace/sdk@0.1.0\n${text}`),
            findings: [`V1 listed site ${OBSERVER} (at form), the FurnaceReading source type's sdk member and the reading's sdk value, is read 3 times, listed 2`],
          },
          {
            name: "a prerelease spelling at a listed site",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("(@furnace/sdk 0.1.0, furnace.executor.v1)", "(@furnace/sdk 0.1.0-rc.1, furnace.executor.v1)")),
            findings: [`V1 stale site ${HOSTED} (space form) names 0.1.0-rc.1; the vendored tarball is 0.1.0`],
          },
          {
            name: "versioned spellings in .tsx, .mts and .cts scripts",
            tree: (real) => ["src/workbench/plant-v1.tsx", "src/workbench/plant-v1.mts", "src/workbench/plant-v1.cts"].reduce((next, file) => withFile(next, file, 'export const PINNED = "@furnace/sdk@0.1.0";\n'), real),
            findings: [unlistedSite("src/workbench/plant-v1.tsx (at form)"), unlistedSite("src/workbench/plant-v1.mts (at form)"), unlistedSite("src/workbench/plant-v1.cts (at form)")],
          },
          {
            name: "versioned spellings in .js, .jsx, .mjs and .cjs scripts",
            tree: (real) =>
              ["src/workbench/plant-v1.js", "src/workbench/plant-v1.jsx", "src/workbench/plant-v1.mjs", "src/workbench/plant-v1.cjs"].reduce((next, file) => withFile(next, file, 'export const PINNED = "@furnace/sdk@0.1.0";\n'), real),
            findings: [
              unlistedSite("src/workbench/plant-v1.js (at form)"),
              unlistedSite("src/workbench/plant-v1.jsx (at form)"),
              unlistedSite("src/workbench/plant-v1.mjs (at form)"),
              unlistedSite("src/workbench/plant-v1.cjs (at form)"),
            ],
          },
          {
            name: "a tarball whose package.json names another package",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace('"name": "@furnace/sdk",', '"name": "@furnace/other",')),
            findings: [`V1 the vendored tarball's package.json names @furnace/other, not ${SDK}`],
          },
        ],
      },
      {
        kind: "judged",
        id: "V2",
        source: "acceptance-4",
        quote: "furnace-observer.ts:24,108 sdk:'@furnace/sdk@<new>'",
        judge: observerSdk,
        plants: [
          {
            name: "a re-vendor that leaves the observer behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, PROVIDER, HOSTED),
            findings: [`V2 the reading type's sdk member is ${SDK}@0.1.0; the vendored tarball is ${NEXT}`, `V2 the reading's sdk value is ${SDK}@0.1.0; the vendored tarball is ${NEXT}`],
          },
          {
            name: "the reading's sdk value taken from a constant",
            tree: (real) => editFile(real, OBSERVER, (text) => text.replace("sdk:'@furnace/sdk@0.1.0',producerVersion", "sdk:OBSERVED_SDK,producerVersion")),
            findings: [`V2 ${OBSERVER} carries 0 literals for the reading's sdk value, not one`],
          },
          {
            name: "the reading type's sdk member widened to string",
            tree: (real) => editFile(real, OBSERVER, (text) => text.replace("sdk:'@furnace/sdk@0.1.0';producerVersion", "sdk:string;producerVersion")),
            findings: [`V2 ${OBSERVER} carries 0 literals for the reading type's sdk member, not one`],
          },
        ],
      },
      {
        kind: "judged",
        id: "V3",
        source: "acceptance-4",
        quote: "providers/furnace.ts:25,56 contractSource",
        judge: providerContractSource,
        plants: [
          {
            name: "a re-vendor that leaves the provider behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, HOSTED),
            findings: [`V3 a furnace.run.inspect contractSource is ${NEXT_SOURCE}; the vendored tarball is ${NEXT}`, `V3 a furnace.run.inspect contractSource is ${NEXT_SOURCE}; the vendored tarball is ${NEXT}`],
          },
          {
            name: "one registration's contractSource taken from a constant",
            tree: (real) => editFile(real, PROVIDER, (text) => text.replace(`contractSource:"${NEXT_SOURCE}"`, "contractSource:INSPECT_SOURCE")),
            findings: [`V3 ${PROVIDER} carries 1 contractSource literals, not the two (legacy and native) registrations`],
          },
          {
            name: "a third contractSource literal",
            tree: (real) => editFile(real, PROVIDER, (text) => `${text}export const PLANTED = { contractSource: "${NEXT_SOURCE}" };\n`),
            findings: [`V3 ${PROVIDER} carries 3 contractSource literals, not the two (legacy and native) registrations`],
          },
        ],
      },
    ],
  },
  {
    id: "U",
    pins: [
      {
        kind: "judged",
        id: "U1",
        source: "statement",
        quote: U1_QUOTE,
        judge: untilThenPin,
        plants: [
          {
            name: "the trigger fires: a re-vendor to 0.2.0 with every site moved",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER, HOSTED),
            findings: [`U1 the vendored ${SDK} is ${NEXT}, not the until-then 0.1.0: ${TRIGGERED}`, `U1 vendor/README.md records furnace-sdk-0.1.0.tgz as wb-zby's repack, not the vendored furnace-sdk-${NEXT}.tgz`],
          },
          {
            name: "the README records another provenance",
            tree: (real) => editReadme(real, (text) => text.replace("was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8", "was packed at a Furnace release commit")),
            findings: [`U1 vendor/README.md no longer records the vendored tarball as wb-zby's repack from Furnace revision ${ZBY_REVISION}: ${TRIGGERED}`],
          },
          {
            name: "the README names another revision",
            tree: (real) => editReadme(real, (text) => text.replace("Furnace revision 9970621d8", "Furnace revision 0123456789")),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
          {
            name: "the README keeps the old record only inside an HTML comment above a changed one",
            tree: (real) =>
              editReadme(real, (text) =>
                text
                  .replace("Furnace revision 9970621d8", "Furnace revision 0123456789")
                  .replace("Artifacts were packaged from", "<!-- furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8 -->\n\nArtifacts were packaged from"),
              ),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
          {
            name: "the README shows a second record",
            tree: (real) => editReadme(real, (text) => `${text}\nfurnace-sdk-0.1.0.tgz was re-packaged on 2026-10-18 (wb-zby) from Furnace revision 0123456789.\n`),
            findings: ["U1 vendor/README.md shows 2 records of a tarball as wb-zby's repack, not one"],
          },
          {
            name: "the README keeps the old record only inside an inline HTML comment beside a changed one",
            tree: (real) =>
              editReadme(real, (text) =>
                text.replace("from Furnace revision 9970621d8 (", "from Furnace revision 0123456789 <!-- furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8 --> ("),
              ),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
          {
            name: "the README shows a second record as a list item",
            tree: (real) => editReadme(real, (text) => `${text}\n- furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-18 (wb-zby) from Furnace revision 0123456789\n`),
            findings: ["U1 vendor/README.md shows 2 records of a tarball as wb-zby's repack, not one"],
          },
          {
            name: "the README shows a second record in a table cell",
            tree: (real) => editReadme(real, (text) => `${text}\n| Record |\n| --- |\n| furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-18 (wb-zby) from Furnace revision 0123456789 |\n`),
            findings: ["U1 vendor/README.md shows 2 records of a tarball as wb-zby's repack, not one"],
          },
          {
            name: "the README keeps the old record only inside a list item's HTML comment, beside a changed one",
            tree: (real) =>
              editReadme(
                real,
                (text) => `${text.replace("Furnace revision 9970621d8", "Furnace revision 0123456789")}\n- note <!-- furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8 -->\n`,
              ),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
          {
            name: "the README keeps the old record only inside a table cell's HTML comment, beside a changed one",
            tree: (real) =>
              editReadme(
                real,
                (text) =>
                  `${text.replace("Furnace revision 9970621d8", "Furnace revision 0123456789")}\n| Record |\n| --- |\n| note <!-- furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8 --> |\n`,
              ),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
          {
            name: "the README keeps the old record only as a link-reference definition's title (RT08)",
            tree: (real) => editReadme(real, (text) => `${text.replace(RECORD_TEXT, "was packed at a Furnace release commit")}\n[record]: https://example.invalid "${OLD_RECORD}"\n`),
            findings: [NO_RECORD],
          },
          {
            name: "the README keeps the old record only as an image's alt text",
            tree: (real) => editReadme(real, (text) => `${text.replace(RECORD_TEXT, "was packed at a Furnace release commit")}\n![${OLD_RECORD}](record.png)\n`),
            findings: [NO_RECORD],
          },
        ],
      },
      {
        kind: "judged",
        id: "U2",
        source: "statement",
        quote: "and today's fail-closed behaviour stands",
        judge: oneArtifact,
        plants: [
          {
            name: "the wb-zby failure mode: generated validators from another model",
            tree: (real) => editEntry(real, "package/dist/contract/furnace-executor-contract/provenance.js", (text) => text.replace(/sha256:[0-9a-f]{64}/g, STALE_DIGEST)),
            findings: [`U2 the vendored tarball's manifest digest ${REAL_DIGEST(REAL)} differs from its generated provenance digest ${STALE_DIGEST}: the decodeContextValue preflight fails closed on it (acceptance 3, the wb-zby failure mode)`],
          },
          {
            name: "a tarball without its contract manifest",
            tree: (real) => editEntry(real, "package/contract/manifest.json", () => undefined),
            findings: [`U2 the vendored tarball carries no readable contract digest pair (manifest undefined, provenance ${REAL_DIGEST(REAL)})`],
          },
        ],
      },
    ],
  },
  {
    id: "Q",
    pins: [
      {
        kind: "quiet",
        id: "Q1",
        residual: "R-COMPUTED-VERSION",
        judge: versionLiterals,
        quiet: (real) => withFile(real, "src/workbench/plant-q1.ts", 'export const JOINED = "@furnace/sdk@" + "9.9.9";\nexport const ESCAPED = "\\u0040furnace/sdk@9.9.9";\n'),
        control: (real) => withFile(real, "src/workbench/plant-q1.ts", 'export const SPELLED = "@furnace/sdk@9.9.9";\n'),
      },
      {
        kind: "quiet",
        id: "Q2",
        residual: "R-OTHER-SPELLING",
        judge: versionLiterals,
        quiet: (real) => withFile(real, "src/workbench/plant-q2.ts", "// @furnace/sdk v9.9.9, furnace sdk 9.9.9, @furnace/sdk version 9.9.9\nexport {};\n"),
        control: (real) => withFile(real, "src/workbench/plant-q2.ts", "// @furnace/sdk 9.9.9\nexport {};\n"),
      },
      {
        kind: "quiet",
        id: "Q3",
        residual: "R-OUTSIDE-SRC",
        judge: (tree) => [...versionLiterals(tree), ...deepImportSet(tree)],
        quiet: (real) => withFile(withFile(real, "docs/workbench/plant-q3.md", "@furnace/sdk@9.9.9\n"), "test/plant-q3.test.ts", 'import "@furnace/sdk/dist/src/client.js";\n'),
        control: (real) => withFile(real, "src/workbench/plant-q3.ts", 'import "@furnace/sdk/dist/src/client.js";\nexport const PINNED = "@furnace/sdk@9.9.9";\n'),
      },
      {
        kind: "quiet",
        id: "Q4",
        residual: "R-COMPUTED-SPECIFIER",
        judge: deepImportSet,
        quiet: (real) =>
          withFile(
            real,
            "src/workbench/plant-q4.ts",
            'const SCOPE = "@furnace";\nexport const load = (): Promise<unknown> => import(SCOPE + "/sdk/dist/src/client.js");\nexport const joined = (): Promise<unknown> => import(["@furnace", "sdk", "dist/src/client.js"].join("/"));\n',
          ),
        control: (real) => withFile(real, "src/workbench/plant-q4.ts", 'export const load = (): Promise<unknown> => import("@furnace/sdk/dist/src/client.js");\n'),
      },
      {
        kind: "quiet",
        id: "Q6",
        residual: "R-INDEX-INDIRECT",
        judge: noSwitchOwed,
        quiet: (real) =>
          editEntry(
            editEntry(real, "package/dist/src/protocol.d.ts", (text) => `${text}\nimport { EmbeddedHost } from "./embedded.js";\nexport declare const Host: typeof EmbeddedHost;\nexport default EmbeddedHost;\n`),
            "package/dist/src/protocol.js",
            (text) => `${text}\nimport { ResidentSession } from "./resident_session.js";\nexport const Session = ResidentSession;\n`,
          ),
        control: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./embedded.js";\n`),
      },
      {
        kind: "quiet",
        id: "Q7",
        residual: "R-COMMENT-REFERENCE",
        judge: deepImportSet,
        quiet: (real) =>
          withFile(
            real,
            "src/workbench/plant-q7.ts",
            [
              '/// <amd-dependency path="@furnace/sdk/dist/src/client.js" />',
              '/** @type {import("@furnace/sdk/dist/src/client.js").Furnace | undefined} */',
              "export const typed = undefined;",
              '/** @import { Furnace } from "@furnace/sdk/dist/src/client.js" */',
              '// import { Furnace } from "@furnace/sdk/dist/src/client.js";',
              '/* require("@furnace/sdk/dist/src/client.js") */',
              "",
            ].join("\n"),
          ),
        control: (real) => withFile(real, "src/workbench/plant-q7.ts", 'export type Typed = import("@furnace/sdk/dist/src/client.js").Furnace;\n'),
      },
      {
        kind: "quiet",
        id: "Q8",
        residual: "R-WALK-SPECIFIER",
        judge: noSwitchOwed,
        quiet: (real) => editEntry(addEntry(real, "package/dist/src/sub/package.json", '{ "types": "../embedded.d.ts" }\n'), "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./sub";\n`),
        control: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}\nexport * from "./embedded";\n`),
      },
      {
        kind: "quiet",
        id: "Q9",
        residual: "R-HTML-BLOCK",
        judge: untilThenPin,
        quiet: (real) => editReadme(real, (text) => `${text}\n<p>${SECOND_RECORD}</p>\n`),
        control: (real) => editReadme(real, (text) => `${text}\n${SECOND_RECORD}\n`),
      },
      {
        kind: "quiet",
        id: "Q10",
        residual: "R-DERIVATION-BODY",
        judge: durabilityModule,
        quiet: (real) =>
          editEntry(
            editEntry(real, "package/dist/src/durability.js", (text) => text.replace("return new DurabilityProfile();", "return new DurabilityProfile(CLAIM_ALL);")),
            EXECUTOR,
            (text) => text.replace(PROFILE_LINE, `Object.assign(options, { durability: CLAIM_ALL });\n        ${PROFILE_LINE}`).replace(STORE_LINE, `Object.assign(profile, CLAIM_ALL);\n        ${STORE_LINE}`),
          ),
        control: (real) => editEntry(real, EXECUTOR, (text) => text.replace(PROFILE_LINE, PROFILE_LINE.replace(DERIVATION, "CLAIM_ALL"))),
      },
      {
        kind: "quiet",
        id: "Q11",
        residual: "R-MAPPED-SPECIFIER",
        judge: deepImportSet,
        quiet: (real) =>
          withFile(
            real,
            "src/workbench/plant-q11.ts",
            'import { HostClient } from "#furnace/host_client.js";\nimport type { ResidentSession } from "furnace-deep/resident_session.js";\nexport const PLANTED = HostClient;\nexport type Planted = ResidentSession;\n',
          ),
        control: (real) => withFile(real, "src/workbench/plant-q11.ts", 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
      },
    ],
  },
];

const PINS = ROWS.flatMap((row) => row.pins);
const JUDGED = PINS.filter((pin): pin is JudgedPin => pin.kind === "judged");
const QUIET = PINS.filter((pin): pin is QuietPin => pin.kind === "quiet");
const quotesOf = (source: Source): string[] => JUDGED.filter((pin) => pin.source === source).map((pin) => pin.quote);

// ---- frozen shape and each-liveness (standing rule 16; the U1 cure of wb-lrz.4 refusal #1, kept at cut #3) -----------------

/** Every row's pin ids, frozen at this cut: the one literal the subsets' ids, the call sites' records and the case count are read against. */
const FROZEN_PINS = ["D:D1,D2,D3,D4", "V:V1,V2,V3", "U:U1,U2", "Q:Q1,Q2,Q3,Q4,Q6,Q7,Q8,Q9,Q10,Q11"] as const;
const FROZEN_IDS = FROZEN_PINS.flatMap((entry) => entry.slice(entry.indexOf(":") + 1).split(","));
/** The judged ids (rows D, V and U) and the quiet ids (row Q), taken from FROZEN_PINS - never from ROWS or a subset. */
const JUDGED_IDS = FROZEN_IDS.filter((id) => !id.startsWith("Q"));
const QUIET_IDS = FROZEN_IDS.filter((id) => id.startsWith("Q"));
/** Each judged pin's plant count, frozen at this cut: a plant deleted, or a plants loop cut short, goes red. */
const PLANT_SHAPE = ["D1:52", "D2:3", "D3:18", "D4:21", "V1:13", "V2:3", "V3:3", "U1:12", "U2:2"] as const;
/** Each judged pin's judge, by name, frozen at this cut: both judged call sites record it, so a judge swapped out at either one goes red. */
const JUDGE_KEYS = ["D1:deepImportSet", "D2:deepImportsResolve", "D3:noSwitchOwed", "D4:durabilityModule", "V1:versionLiterals", "V2:observerSdk", "V3:providerContractSource", "U1:untilThenPin", "U2:oneArtifact"] as const;
/** The key each plant records at its last line, in order: its pin id and its index, expanded from PLANT_SHAPE. */
const PLANT_KEYS = PLANT_SHAPE.flatMap((entry) => {
  const [id = "", count = "0"] = entry.split(":");
  return Array.from({ length: Number(count) }, (_, index) => `${id}#${index}`);
});
/** The key each fixed case records at its last line, in registration order (the closing tally is the file's last case). */
const FIXED_CASES = ["frozen shape", "outside anchors", "anchor controls"] as const;
/** What this run's cases did: each case and each plant records its key at its last line, so one cut short, sliced off or never run is missing. */
const REACHED = new Map<string, string[]>();
const reached = (site: string, key: string): void => {
  REACHED.set(site, [...(REACHED.get(site) ?? []), key]);
};

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

/** The description's one line that opens with `open`: none, or a second such line, is refused - never read first-match. */
function oneLine(description: string, open: string): { readonly line: string; readonly problems: readonly string[] } {
  const lines = description.split("\n").filter((candidate) => candidate.startsWith(open));
  const [line = ""] = lines;
  return lines.length === 1 ? { line, problems: [] } : { line: "", problems: [`the description holds ${lines.length} lines opening ${JSON.stringify(open)}, not one`] };
}

/** The str literals of the description's one-line Python list ACCEPTANCE: ['...', "...", ...], read from that one line. */
function acceptanceItems(line: string): string[] {
  if (!line.startsWith(ACCEPTANCE_OPEN)) return [];
  const items: string[] = [];
  let at = ACCEPTANCE_OPEN.length;
  for (;;) {
    while (at < line.length && /[\s,]/.test(line.charAt(at))) at += 1;
    const quote = line.charAt(at);
    if (quote !== "'" && quote !== '"') break;
    let value = "";
    for (at += 1; at < line.length && line.charAt(at) !== quote; at += 1) {
      if (line.charAt(at) === "\\") at += 1;
      value += line.charAt(at);
    }
    items.push(value);
    at += 1;
  }
  return items;
}

/** The STATEMENT: line's until-then parenthetical, without its parentheses. */
function untilThen(line: string): string {
  const open = "until then no Pi change (";
  const start = line.indexOf(open);
  const end = start < 0 ? -1 : line.indexOf(")", start + open.length);
  return end < 0 ? "" : line.slice(start + open.length, end);
}

const BETWEEN = /^[\s,;:.()]*/;
/** Problems tiling `text` with `quotes` in order, nothing between two quotes but whitespace and , ; : . ( ). */
function tile(text: string, quotes: readonly string[]): string[] {
  let rest = text;
  for (const quote of quotes) {
    rest = rest.replace(BETWEEN, "");
    if (!rest.startsWith(quote)) return [`the next clause reads ${JSON.stringify(rest.slice(0, 80))}, not ${JSON.stringify(quote)}`];
    rest = rest.slice(quote.length);
  }
  return rest.replace(BETWEEN, "") === "" ? [] : [`untiled tail ${JSON.stringify(rest)}`];
}

/** Problems reading D4's one quote where clause (b) of the notes' one N5 paragraph opens; a copy of the clause anywhere else is never read. */
function noteClause(notes: string, quotes: readonly string[]): string[] {
  const paragraphs = notes.split("\n").filter((line) => line.startsWith(N5_OPEN));
  if (paragraphs.length !== 1) return [`the notes hold ${paragraphs.length} N5 paragraphs, not one`];
  const parts = (paragraphs[0] ?? "").split(CLAUSE_B);
  if (parts.length !== 2) return [`the N5 paragraph carries ${parts.length - 1} clauses (b), not one`];
  const clause = parts[1] ?? "";
  return quotes.flatMap((quote) => (clause.startsWith(quote) ? [] : [`clause (b) of the N5 paragraph opens ${JSON.stringify(clause.slice(0, quote.length))}, not ${JSON.stringify(quote)}`]));
}

/** One node of vitest's task tree, as far as the tally reads it. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode?: string;
  readonly tasks?: readonly TaskNode[];
}
/** Every case vitest registered in this file, in registration order, with its run mode, read from the runner's own task tree. */
const registeredCases = (tasks: readonly TaskNode[]): { readonly name: string; readonly mode: string | undefined }[] =>
  tasks.flatMap((child) => (child.type === "test" ? [{ name: child.name, mode: child.mode }] : child.type === "suite" ? registeredCases(child.tasks ?? []) : []));
const TALLY_TITLE =
  "EACH-LIVENESS closing tally: every case is set to run, the case count is the fixed cases plus two per judged id, one per quiet id and this tally, every case and every plant reached its last line in frozen order, and this tally is the file's last case";

describe("wb-lrz.4 Furnace SDK re-vendor readiness census", () => {
  it("FROZEN SHAPE (standing rule 16): literals pin ROWS's shape and pin ids, the JUDGED and QUIET subsets' ids, each judged pin's plant count and judge, and V1's forms", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["D:4", "V:3", "U:2", "Q:10"]);
    expect(ROWS.map((row) => `${row.id}:${row.pins.map((pin) => pin.id).join(",")}`)).toEqual([...FROZEN_PINS]);
    expect(JUDGED.map((pin) => pin.id)).toEqual(JUDGED_IDS);
    expect(QUIET.map((pin) => pin.id)).toEqual(QUIET_IDS);
    expect(JUDGED.map((pin) => `${pin.id}:${pin.plants.length}`)).toEqual([...PLANT_SHAPE]);
    expect(JUDGE_KEYS.map((key) => key.slice(0, key.indexOf(":")))).toEqual(JUDGED_IDS);
    expect(JUDGED.map((pin) => `${pin.id}:${pin.judge.name}`)).toEqual([...JUDGE_KEYS]);
    expect(FORMS.map((entry) => entry.form)).toEqual(["at", "space", "tarball"]);
    reached("cases", "frozen shape");
  });

  it("OUTSIDE ANCHORS: wb-lrz.4's acceptance item 4 and its statement's until-then clause, each read from the description's one such line, are tiled by the pins' quotes in ROWS order; D4's quote opens clause (b) of its notes' one N5 paragraph; the read set is the repo's own src/ script list", () => {
    const row = beadRow();
    const accepted = oneLine(row.description, ACCEPTANCE_OPEN);
    expect(accepted.problems).toEqual([]);
    const acceptance = acceptanceItems(accepted.line);
    expect(acceptance).toHaveLength(6);
    expect(tile(acceptance[3] ?? "", quotesOf("acceptance-4"))).toEqual([]);
    const stated = oneLine(row.description, STATEMENT_OPEN);
    expect(stated.problems).toEqual([]);
    expect(tile(untilThen(stated.line), quotesOf("statement"))).toEqual([]);
    const notes = quotesOf("note-b");
    expect(notes).toHaveLength(1);
    expect(noteClause(row.notes, notes)).toEqual([]);
    expect(new Set(PINS.map((pin) => pin.id)).size).toBe(PINS.length);
    expect(ROWS.flatMap((entry) => entry.pins.filter((pin) => !pin.id.startsWith(entry.id)).map((pin) => pin.id))).toEqual([]);
    expect([...REAL.files.keys()], "the rows' read set is the repo's own src/ script list (git ls-files)").toEqual(listedScripts());
    reached("cases", "outside anchors");
  });

  it("ANCHOR CONTROLS: tile() refuses a word between quotes, a reversed pair, an untiled tail, a missing quote, each real quote dropped and the real quotes reversed; the one-line reader refuses a doubled or dropped ACCEPTANCE: [ or STATEMENT: line; the clause (b) reader refuses a weakened, doubled, dropped or masked clause", () => {
    const pair = ["alpha beta", "gamma"];
    expect(tile("alpha beta, gamma.", pair)).toEqual([]);
    expect(tile("alpha beta, delta gamma.", pair)).toEqual(['the next clause reads "delta gamma.", not "gamma"']);
    expect(tile("gamma; alpha beta", pair)).toEqual(['the next clause reads "gamma; alpha beta", not "alpha beta"']);
    expect(tile("alpha beta, gamma, delta", pair)).toEqual(['untiled tail ", delta"']);
    expect(tile("alpha beta", pair)).toEqual(['the next clause reads "", not "gamma"']);
    const row = beadRow();
    const accepted = oneLine(row.description, ACCEPTANCE_OPEN);
    const item = acceptanceItems(accepted.line)[3] ?? "";
    const acceptance = quotesOf("acceptance-4");
    expect(acceptance.map((quote) => tile(item, acceptance.filter((other) => other !== quote)).length > 0)).toEqual([true, true, true, true, true, true]);
    expect(tile(item, [...acceptance].reverse()).length).toBeGreaterThan(0);
    const stated = oneLine(row.description, STATEMENT_OPEN);
    const clause = untilThen(stated.line);
    const statement = quotesOf("statement");
    expect(statement.map((quote) => tile(clause, statement.filter((other) => other !== quote)).length > 0)).toEqual([true, true]);
    const lines = (count: number, open: string): string[] => [`the description holds ${count} lines opening ${JSON.stringify(open)}, not one`];
    const without = (open: string): string =>
      row.description
        .split("\n")
        .filter((line) => !line.startsWith(open))
        .join("\n");
    expect(oneLine(`${accepted.line}\n${row.description}`, ACCEPTANCE_OPEN).problems).toEqual(lines(2, ACCEPTANCE_OPEN));
    expect(oneLine(`${row.description}\n${accepted.line}`, ACCEPTANCE_OPEN).problems).toEqual(lines(2, ACCEPTANCE_OPEN));
    expect(oneLine(without(ACCEPTANCE_OPEN), ACCEPTANCE_OPEN).problems).toEqual(lines(0, ACCEPTANCE_OPEN));
    expect(oneLine(`${stated.line}\n${row.description}`, STATEMENT_OPEN).problems).toEqual(lines(2, STATEMENT_OPEN));
    expect(oneLine(`${row.description}\n${stated.line}`, STATEMENT_OPEN).problems).toEqual(lines(2, STATEMENT_OPEN));
    expect(oneLine(without(STATEMENT_OPEN), STATEMENT_OPEN).problems).toEqual(lines(0, STATEMENT_OPEN));
    const [quote = ""] = quotesOf("note-b");
    const n5 = row.notes.split("\n").find((line) => line.startsWith(N5_OPEN)) ?? "";
    const weakened = row.notes.replace(quote, "the deep-import census may leave out the durability module");
    expect(noteClause(`${weakened}\n${quote}`, [quote])).toEqual([`clause (b) of the N5 paragraph opens "the deep-import census may leave out the durability modu", not ${JSON.stringify(quote)}`]);
    expect(noteClause(`${row.notes}\n${n5}`, [quote])).toEqual(["the notes hold 2 N5 paragraphs, not one"]);
    expect(
      noteClause(
        row.notes
          .split("\n")
          .filter((line) => !line.startsWith(N5_OPEN))
          .join("\n"),
        [quote],
      ),
    ).toEqual(["the notes hold 0 N5 paragraphs, not one"]);
    expect(noteClause(weakened.replace(CLAUSE_B, `${CLAUSE_B}${quote}${CLAUSE_B}`), [quote])).toEqual(["the N5 paragraph carries 2 clauses (b), not one"]);
    reached("cases", "anchor controls");
  });

  it.each(JUDGED)("$id reads the real tree clean: $quote", (pin) => {
    expect(pin.judge(REAL)).toEqual([]);
    reached("real tree", `${pin.id}:${pin.judge.name}`);
  });

  it.each(JUDGED)("$id reds each planted drift: $quote", (pin) => {
    expect(pin.judge(REAL), "the real tree, judged again at the plants call site").toEqual([]);
    expect(pin.plants.some((plant) => plant.findings.length > 0)).toBe(true);
    for (const [index, plant] of pin.plants.entries()) {
      expect(pin.judge(plant.tree(REAL)), plant.name).toEqual(plant.findings);
      reached("plant", `${pin.id}#${index}`);
    }
    reached("plants", `${pin.id}:${pin.judge.name}`);
  });

  it.each(QUIET)("$id is residual $residual's pinned quiet row: the plant reads as nothing, its read-form control as a finding", (pin) => {
    expect(pin.judge(REAL)).toEqual([]);
    expect(pin.judge(pin.quiet(REAL))).toEqual([]);
    expect(pin.judge(pin.control(REAL)).length).toBeGreaterThan(0);
    reached("quiet", pin.id);
  });
});

describe("wb-lrz.4 each-liveness: the closing tally", () => {
  it(TALLY_TITLE, ({ task }) => {
    const cases = registeredCases(task.file.tasks);
    expect(
      cases.filter((entry) => entry.mode !== "run").map((entry) => entry.name),
      "cases of this file not set to run",
    ).toEqual([]);
    expect(cases.map((entry) => entry.name)[cases.length - 1], "the file's last case").toBe(TALLY_TITLE);
    expect(cases, "the file's case count").toHaveLength(FIXED_CASES.length + 2 * JUDGED_IDS.length + QUIET_IDS.length + 1);
    expect(Object.fromEntries(REACHED), "the key every case and plant recorded at its last line").toEqual({
      cases: [...FIXED_CASES],
      "real tree": [...JUDGE_KEYS],
      plant: PLANT_KEYS,
      plants: [...JUDGE_KEYS],
      quiet: QUIET_IDS,
    });
  });
});
