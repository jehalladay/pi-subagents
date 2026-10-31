/**
 * wb-ts6.3 (TS6-R2, program-triage-2026-10-18): the falsifier census of test/helpers/hx-mutation-verified-readers.ts, the
 * full-surface readers that wb-ts6.2's HX mutation 'Verified' census (cut #4 618f99fe, not on trunk) narrowed out of its
 * fail-closed core (orchestrator rulings R-B112 and R-B145; wb-ts6.2 is blocked by this bead).
 * Requirements (the bead's own text in the tracker export, quoted exactly by REQUIREMENTS and held both ways): the
 * description's U1-U4 (refusal #3's C4 entry-point spellings, C1 link loads, C2 computed-key destructures and the row-A member)
 * and R-B145's U1-U2 (refusal #4's C2 declarations[0] reading and B2/Q3 callee-name call reading).
 * Cut #2 answers refusal #1 (gate-prep-16, O:1567): U1 (each surviving reader mutant's form is now a row - the gate's twelve
 * paired twins among them, nine verbatim and three restated as wider rows - and a claim's wording names no form that is not
 * a row's case), U2 (DIGESTS pins each row's reader calls beside its reading, so same-reading rows no longer share a digest)
 * and U3 (the helper header says what its rows pin, no longer that each reader reads exactly what its lines say), with F1
 * (the whole header is held, each heading once).
 * Acceptance, as this census reads it: "each plant reds the unmodified census and greens under the cure" - every falsifier
 * below is a plant its claim's reader reads as the claim says (green here); the gate's own plants (refusal #3's L3-* and
 * refusal #4's G16-*, verbatim from the archived plant tools; their contexts are minimal virtual modules, never src edits)
 * are among them, and against the unmodified cut #4 readers each surviving plant read nothing (the seat's red record, not
 * re-run here). "every claim sentence's wording and its reader's coverage agree byte-for-byte with the falsifier roster" -
 * the helper's whole header comment equals HEADER_PROSE, the two headings, CLAIM_LINES and RESIDUAL_LINES line for line
 * (each heading once in the helper, and no claim or residual line outside the header), every bracketed falsifier is one
 * registered row of its claim (in order), and every row is named by exactly one line. That each form a line's wording names
 * is a row's case is what the seat's mutation sweep measured (one textual mutant of the helper at a time; each survivor's
 * form was made a row, or the mutant is recorded as equivalent in the delivery note): a measurement, not a proof.
 * FROZEN SHAPE (standing rule 16): FROZEN pins every requirement, claim and residual as `<id>:<pin count>`. DIGESTS pins every
 * row's reader calls and reading: the sha256 of the JSON of each call the row's read makes to a reader under judgment (the
 * reader's name, its arguments and its result; a node by its file - a census module with the sha256 of its text - and its
 * kind and position, an SDK node by its kind and declaration names, a src node by its declaration names; a symbol by its
 * name and declarations; the checker and the compiler options by name) and of the row's reading, the SDK, scratch and repo
 * roots normalized. Every row's read makes at least one such call (checked when it runs) and no two rows share a digest
 * (checked by the frozen-shape row), so a row whose read is replaced by a constant reds (it calls no reader), and a row whose
 * case is swapped for another row's reds its digest (the calls and reading it then makes are that row's). A census module's
 * text enters a digest only where a traced argument or result names one of its nodes. The outside anchors are the helper
 * header (claims, residuals, their pins) and the tracker export (the requirements' quotes and count).
 * The last case reads the vitest task tree: every registered test, in order, in run mode, not inverted, ran before it, and
 * every row reached the end of its body having made its three assertions (counted from vitest's expect state, so a row whose
 * assertions are removed reds this case whatever flags the run is given).
 * Scratch: one tracked scratch root (test/helpers/scratch.ts) holds the walk, link and package trees; the program's modules
 * are virtual (in memory, never on disk). src, the installed SDK, tsconfig.json, the helper and .beads/issues.jsonl are only
 * read. Display paths added: none.
 */
import { createHash } from "node:crypto";
import { copyFileSync, linkSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as readers from "./helpers/hx-mutation-verified-readers.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-ts6.3";
const HELPER = "test/helpers/hx-mutation-verified-readers.ts";

installScratchLeakGuard();

// ---- the readers under judgment, each call traced into the running row's digest ----

type EntryLike = readers.EntryLike;
const { DANGLING, SDK } = readers;
/** The running row's reader calls, each "<reader>(<arguments>) -> <result>" (shapeOf); undefined outside a row's read. */
let trace: string[] | undefined;
function traced<A extends unknown[], R>(name: string, reader: (...input: A) => R, normal: (result: R) => unknown = result => result): (...input: A) => R {
  return (...input: A): R => {
    const result = reader(...input);
    trace?.push(`${name}(${input.map(value => shapeOf(value)).join(", ")}) -> ${shapeOf(normal(result))}`);
    return result;
  };
}
/** entriesBelow's result in path order, for the trace only: readdir reports the file system's order, which no claim reads. */
function byPath(found: readonly readers.EntryReading[]): readers.EntryReading[] {
  return [...found].sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}
const entriesBelow = traced("entriesBelow", readers.entriesBelow, byPath);
const entryKind = traced("entryKind", readers.entryKind);
const entryStrings = traced("entryStrings", readers.entryStrings);
const stringsAt = traced("stringsAt", readers.stringsAt);
const packageNameOf = traced("packageNameOf", readers.packageNameOf);
const isSdkFile = traced("isSdkFile", readers.isSdkFile);
const resolvesIntoSdk = traced("resolvesIntoSdk", readers.resolvesIntoSdk);
const sdkDeclarations = traced("sdkDeclarations", readers.sdkDeclarations);
const bindingKey = traced("bindingKey", readers.bindingKey);
const assignmentPatternMembers = traced("assignmentPatternMembers", readers.assignmentPatternMembers);
const registrationReferences = traced("registrationReferences", readers.registrationReferences);
const importClosure = traced("importClosure", readers.importClosure);
const environmentReads = traced("environmentReads", readers.environmentReads);

// ---- the roster: requirements, claim lines, residual lines (held to the helper header and the tracker export) ----

interface Requirement {
  readonly id: string;
  readonly quote: string;
  readonly claims: readonly string[];
}
const REQUIREMENTS: readonly Requirement[] = [
  {
    id: "U1",
    quote:
      "- U1 (C4 launch family, MEDIUM): entry-point spellings unseen by the C4 reader - cover every launch/entry-point spelling the claim words, or state the seen set.",
    claims: ["EN-DIRECTORY", "EN-MODULE", "EN-JSON", "EN-FILE", "EN-OTHER", "ST-LITERAL", "ST-TEMPLATE", "ST-KIND-TS", "ST-KIND-JSX", "ST-JSON", "ST-JSON-UNPARSED", "ST-UNREAD", "ST-AT"],
  },
  {
    id: "U2",
    quote: "- U2 (C1 load family, HIGH): link loads unseen by the C1 reader - cover link-form loads, or state the load forms actually read.",
    claims: ["EN-LINK", "EN-TARGET", "ID-REAL", "ID-MANIFEST", "ID-DANGLING", "ID-RESOLVE"],
  },
  {
    id: "U3",
    quote:
      "- U3 (C2 member-reader subform, MEDIUM): computed-key destructure unseen - cover computed-key destructuring in the member reader, or state the syntactic forms pinned.",
    claims: ["MB-KEY-NAME", "MB-KEY-NONE", "MB-KEY-COMPUTED", "MB-PATTERN", "MB-PATTERN-PLACE"],
  },
  { id: "U4", quote: "- U4 (row A, MEDIUM): the row-A member named in the refusal - cure or state.", claims: ["EV-CLOSURE", "EV-READS"] },
  {
    id: "B145-U1",
    quote:
      "U1 - C2's member reader reads only declarations[0] of a checker symbol, so an SDK mutations getter read through an intersection whose local constituent comes first is missing from the pinned reference list (29/29 and 2812/2812 under the plant; the SDK-first twin reds C2) - the reader must walk every declaration of a merged/intersected symbol.",
    claims: ["MB-DECLARATIONS", "MB-ALIAS"],
  },
  {
    id: "B145-U2",
    quote:
      "U2 - B2's and Q3's call reader matches callee names only, so a src call of the injected-reader registration through Function.prototype.call or a local alias is missing from registrationCalls/injectedCalls (the direct-call twin reds B2/Q3) - the reader must resolve .call/.apply and local aliases, or the claim excludes them.",
    claims: ["RG-BINDING", "RG-ELEMENT-KEY", "RG-CALL", "RG-CALL-METHOD", "RG-ALIAS", "RG-SPECIFIER", "RG-OTHER"],
  },
];

/** The helper header's prose lines, before its CLAIMS heading. */
const HEADER_PROSE: readonly string[] = [
  "/**",
  " * wb-ts6.3 (TS6-R2, program-triage-2026-10-18; the rule-19 structural-exit child of wb-ts6.2, orchestrator rulings R-B112 and",
  " * R-B145): the full-surface readers for wb-ts6.2's HX mutation 'Verified' census (test/workbench-hx-mutation-verified-census.test.ts,",
  " * cut #4 618f99fe, not on trunk; wb-ts6.2 is blocked by this bead under R-B145). That cut restated each census claim to the",
  " * fail-closed core its own readers proved; these readers carry the coverage it narrowed out (the C4 entry-point spellings, the C1",
  " * link loads, the C2 computed-key and assignment destructures and every declaration of a symbol, the B2/Q3 registration call",
  " * forms, and an environment axis for row A), so its re-cut is a mechanical restatement over them. Every claim line below names",
  " * its requirement (the bead's U1-U4 and R-B145's U1-U2), the reading it claims and the falsifier rows that pin that reading:",
  " * each form its wording names is the case of one of its rows, and a form its wording does not name is not claimed. Every",
  " * residual line names the quiet rows that pin it. The falsifier census (test/workbench-hx-mutation-verified-readers-census.test.ts)",
  " * holds this whole header line for line (each heading once in the file), runs each falsifier (the gate's own plants verbatim",
  " * among them: each reads as its claim says, and the unmodified wb-ts6.2 cut #4 reader did not) and each quiet row (the",
  " * residual's probe reads nothing while its loud twin reads), and pins each row's reader calls and reading by digest.",
  " *",
];
const CLAIMS_HEADING = ' * CLAIMS ("- <claim> (<requirement>) [<falsifiers>]: <the reading>"):';
const RESIDUALS_HEADING = ' * RESIDUALS ("- <residual> [<quiet rows>]: <the family no claim reads>"):';
/** The helper header's claim lines, byte for byte and in order (each "<claim> (<requirement>) [<falsifiers>]: <reading>"). */
const CLAIM_LINES: readonly string[] = [
  "EN-DIRECTORY (U1) [EN-WALK-TREE]: entriesBelow lists every entry below a directory, at any depth, as its path relative to that directory (/-separated) with the kind entryKind reads from the entry readdir reports, and descends into every directory entry.",
  "EN-MODULE (U1) [EN-WALK-MODULES]: a regular file whose name ends with a MODULE_EXTENSIONS member (.ts, .tsx, .mts, .cts, .js, .jsx, .mjs, .cjs) reads module.",
  "EN-JSON (U1) [L3-C4-JSON-CMD-ENTRY, G16-C5-DOTFILE-JSON-ENTRY]: a regular file whose name ends with .json in that letter case, a dot-named one included, reads json.",
  "EN-FILE (U1) [EN-WALK-FILES]: a regular file of any other name reads file.",
  "EN-LINK (U2) [L3-C1-SYMLINK-ENTRY, L3-C1-DIRLINK-CTRL-ENTRY, EN-WALK-DANGLING, EN-KIND-LINK-FIRST]: a symbolic link reads link whatever it points to (a file, a directory, nothing), and the walk never descends through one.",
  "EN-TARGET (U2) [EN-TARGET-REAL, EN-TARGET-DANGLING, EN-TARGET-CHAIN]: a link entry carries its target as realpathSync reads it (every link on the path followed, a link to a link included), or <dangling> when that resolves to nothing.",
  "EN-OTHER (U1) [EN-KIND-OTHER]: any other entry (a FIFO, a socket, a device: no link, no directory, no regular file) reads other.",
  "ST-LITERAL (U1) [ST-LITERAL-STRING, ST-LITERAL-NOSUB, G16-C4-ESCAPED-STRINGS, ST-LITERAL-NOSUB-ESCAPED, ST-LITERAL-TYPE-AND-ATTRIBUTE]: entryStrings reads a module entry's strings as the cooked text (escapes decoded) of each string literal (one in a type and a JSX attribute's included) and no-substitution template it holds.",
  "ST-TEMPLATE (U1) [ST-TEMPLATE-HEAD, L3-C4-TMPL-MIDDLE-STRINGS, ST-TEMPLATE-TAIL, ST-TEMPLATE-ESCAPED]: and as the cooked text of each template's head, middle and tail.",
  "ST-KIND-TS (U1) [ST-KIND-ASSERTION]: a module entry whose name ends with .ts, .mts or .cts parses as TypeScript, so an angle-bracket assertion's operand is read.",
  "ST-KIND-JSX (U1) [ST-KIND-JSX-TEXT]: any other module entry (.tsx, .jsx, .js, .mjs, .cjs) parses with JSX, so JSX text is no string.",
  "ST-JSON (U1) [L3-C4-JSON-CMD-STRINGS, ST-JSON-NESTED, ST-JSON-KEY, ST-JSON-ESCAPE, ST-JSON-TOP]: a json entry's strings are, from JSON.parse of its text (escapes decoded), every string value and every object key at any depth, the top level included.",
  "ST-JSON-UNPARSED (U1) [ST-JSON-INVALID]: a json entry whose text JSON.parse refuses reads undefined.",
  "ST-UNREAD (U1) [ST-OTHER-NAMES]: an entry of any other name reads undefined.",
  "ST-AT (U1) [ST-AT-FILE, ST-AT-LINKED-JSON, ST-AT-UNREAD]: stringsAt reads an entry by lstat: a regular file, and a link whose target is a regular file, by the entry's own name and the target's text; a directory, a link to a directory and a link to nothing read undefined.",
  "ID-REAL (U2) [L3-C1-SYMLINK-IDENTITY, L3-C1-DIRLINK-CTRL-IDENTITY, ID-REAL-BELOW, ID-REAL-LINKED, ID-REAL-SIBLING, ID-REAL-OUTSIDE-DIST, ID-REAL-PACKAGE-ITSELF]: isSdkFile reads a path through every link on it (realpathSync): its real path anywhere below the package's real directory (that directory and a /, so neither a sibling sharing its prefix nor the directory itself is) is the SDK's.",
  "ID-MANIFEST (U2) [ID-MANIFEST-COPY, ID-MANIFEST-LINKED, ID-MANIFEST-NAMELESS, ID-MANIFEST-NONE, ID-MANIFEST-OTHER-NAME]: so is a real path whose nearest package.json, read upward from that real path, names @hyperunix/sdk exactly (a nearest manifest naming none - no name, or a name that is no string - or no manifest, reads null; one naming another package, @hyperunix/sdk-tools included, reads that name and is no SDK file).",
  "ID-DANGLING (U2) [ID-DANGLING-INSIDE]: a path that resolves to nothing is no SDK file.",
  "ID-RESOLVE (U2) [L3-C1-SYMLINK-RESOLVE, ID-RESOLVE-BARE, ID-RESOLVE-PLAIN, ID-RESOLVE-OPTIONS]: resolvesIntoSdk resolves a specifier by ts.resolveModuleName from the importing file under the given options (a paths alias they carry included), and the resolved file is the SDK's as isSdkFile reads it.",
  "MB-DECLARATIONS (B145-U1) [G16-C2-INTERSECTION-LOCAL-FIRST, G16-C2-INTERSECTION-SDK-FIRST, G16-C2-INTERSECTION-DESTRUCTURE, MB-DECLARATIONS-LOCAL, MB-DECLARATIONS-TWO-SDK, MB-DECLARATIONS-TWO-SDK-REVERSED, MB-DECLARATIONS-NESTED-PATH]: sdkDeclarations reads every declaration of a symbol that lies below the SDK's dist directory, in the checker's order (the symbol's declarations), as its path there (a nested one included) - a property of an intersection whose local constituent comes first included.",
  "MB-ALIAS (B145-U1) [MB-ALIAS-IMPORT]: an alias symbol (an import binding) is read through checker.getAliasedSymbol.",
  "MB-KEY-NAME (U3) [MB-KEY-IDENTIFIER, MB-KEY-STRING, MB-KEY-SHORTHAND]: bindingKey reads an object binding element's key as its property name when that is an identifier or a string literal, and as its own name when it has none (shorthand).",
  "MB-KEY-NONE (U3) [MB-KEY-REST, MB-KEY-ARRAY]: a rest element and an array binding element read undefined.",
  "MB-KEY-COMPUTED (U3) [L3-C2-COMPUTED-DESTRUCTURE, L3-C2-CONSTKEY-DESTRUCTURE, MB-KEY-TEMPLATE]: a computed key whose expression the checker types as one string literal (a quoted literal in brackets, a const bound to one, a no-substitution template) reads that literal.",
  "MB-PATTERN (U3) [L3-C2-ASSIGN-DESTRUCTURE, MB-PATTERN-RENAMED, MB-PATTERN-STRING, MB-PATTERN-COMPUTED, MB-PATTERN-DEFAULTED, MB-PATTERN-TWO, MB-PATTERN-REST]: assignmentPatternMembers reads every property of an object destructuring-assignment pattern, in order - a shorthand (defaulted or not), an identifier, string-literal or computed key (one string literal) - with its name and the property symbol of the pattern's type (checker.getTypeOfAssignmentPattern); a rest element reads nothing.",
  "MB-PATTERN-PLACE (U3) [MB-PLACE-FOR-OF, MB-PLACE-NESTED, MB-PLACE-ARRAY, MB-PLACE-DEFAULT-TARGET, MB-PLACE-NOT-PATTERN, MB-PLACE-FOR-OF-ARRAY, MB-PLACE-NESTED-ARRAY, MB-PLACE-RHS-ARRAY]: a pattern is an object literal on the left of = (a default's target inside a pattern included), the initializer of a for-of, a property's value in a pattern, or an element of an array literal that is itself on the left of =, a for-of initializer or nested in a pattern; the reader reads no other object literal as one.",
  "RG-BINDING (B145-U2) [G16-B2-DIRECT-CALL-CTRL, RG-RENAMED-IMPORT, RG-NAMESPACE-MEMBER]: registrationReferences reads a reference as an identifier whose symbol is a target, an import binding read through checker.getAliasedSymbol (renamed, or a namespace's member) included.",
  "RG-ELEMENT-KEY (B145-U2) [RG-ELEMENT-CALL, RG-ELEMENT-TEMPLATE, RG-ELEMENT-CONST]: and as an element access whose key the checker types as one string literal (a string literal, a no-substitution template, a const bound to one), by the property of that name on its object's type.",
  "RG-CALL (B145-U2) [G16-B2-DIRECT-CALL-INPLACE-CTRL, RG-PARENTHESIZED-CALL, RG-ASSERTED-CALL, RG-WRAPPED-MEMBER-CALL]: a reference that is a call's callee (itself, or the member access or element access it names), read through parentheses and as, satisfies, non-null and angle-bracket assertions, reads call.",
  "RG-CALL-METHOD (B145-U2) [G16-B2-CALL-METHOD, G16-B2-CALL-METHOD-INPLACE, RG-APPLY, RG-METHOD-WRAPPED, RG-METHOD-RECEIVER]: a reference that is the receiver of .call or .apply (itself, or the member access or element access it names, read through the same wrappers), that member (read through the same wrappers) being a call's callee, reads call-method.",
  "RG-ALIAS (B145-U2) [G16-B2-ALIAS-CALL, G16-B2-ALIAS-CALL-BLANK, RG-ALIAS-CHAIN, RG-ALIAS-EXPORTED, RG-ALIAS-WRAPPED, RG-OWN-DECLARATION, RG-ALIAS-LOCAL, RG-ALIAS-MEMBER, RG-ALIAS-ELEMENT, RG-ALIAS-FORMS]: a reference (an identifier, a member access or an element access) that initializes a const declaration of a name, at the top level or in a function body, read through the same wrappers, reads alias, and that name's own references read as the same target's, each in its own form, through any chain of such names across the given files in any order; a variable's or a function's own declared name is no reference.",
  "RG-SPECIFIER (B145-U2) [RG-IMPORT-SPECIFIER, RG-EXPORT-SPECIFIER]: a name of an import or export specifier reads specifier.",
  "RG-OTHER (B145-U2) [RG-LET-ALIAS, RG-ARGUMENT, RG-BIND, RG-METHOD-UNCALLED, RG-DESTRUCTURED, RG-PROPERTY-VALUE, RG-SHORTHAND-VALUE, RG-TYPE-QUERY, RG-VAR-ALIAS]: any other reference reads reference (a let or var initializer, an argument, a .bind receiver, a .call or .apply member that is no call's callee, a destructured key, a property value, a shorthand property's value by its value symbol, a type query).",
  "EV-CLOSURE (U4) [EV-CLOSURE-CHAIN, EV-CLOSURE-TYPE-ONLY, EV-CLOSURE-FILTER, EV-CLOSURE-EXPORT-FROM, EV-CLOSURE-ORDER]: importClosure reads the entry module and, transitively, every module a top-level import declaration (type-only included), export-from declaration (export *, a named one and a type-only one) or import-equals of an external module names, as the checker's module symbol resolves it, that the filter accepts, each once (an import cycle included), in breadth-first order (a module's names in statement order).",
  "EV-READS (U4) [L3-A-ENV-READS, EV-GLOBAL-THIS, EV-ELEMENT, EV-IMPORTED-ENV, EV-REFLECT, EV-DESTRUCTURE-SOURCE, EV-LOCAL-PROCESSENV, EV-LINE-START, EV-NESTED, EV-OTHER-PACKAGE-PROCESSENV, EV-SHORTHAND]: environmentReads reads every identifier other than a member access's name (an import specifier's and a shorthand property's included), and every member access, element access and call, that the checker types as the ProcessEnv interface @types/node declares (an interface of that name declared elsewhere, another package's included, is none), a read inside a read included, as <line>|<text> (<line> the 1-based line its first character is on).",
];
/** The helper header's residual lines, byte for byte and in order (each "<residual> [<quiet rows>]: <the family>"). */
const RESIDUAL_LINES: readonly string[] = [
  "R-UNNARROWED-KEY [Q-KEY-UNION, Q-PATTERN-STRING-KEY]: a computed key typed as anything but one string literal (a union of literals, string, a keyof type) and a numeric key read no name (bindingKey undefined; a pattern member's name undefined).",
  "R-REST-PATTERN [Q-MB-REST-PATTERN]: an object pattern below an array rest element ([...{ length }] = list, [, ...[{ mutations }]] = list) reads no member: the checker types no such pattern (getTypeOfAssignmentPattern fails on it), so the reader never asks.",
  "R-COPIED-SDK [Q-ID-COPY]: a regular-file copy or a hard link of an SDK file outside the package, with no SDK manifest above it, is no SDK file.",
  "R-UNNAMED-REFERENCE [Q-RG-COMPUTED]: a registration reached without a name the checker resolves (an element key it does not type as one string literal, Object.values, an any-typed value) is no reference.",
  "R-UNTYPED-ENV [Q-EV-UNTYPED]: the environment read through a value the checker does not type as ProcessEnv (a cast through any or unknown, require's any result) is no environment read.",
  "R-RUNTIME-LOAD [Q-EV-DYNAMIC]: a module reached only at run time (import(), require(), a created require) is not in the closure.",
  "R-RELOCATED-SDK [Q-MB-RELOCATED]: an SDK declaration TypeScript reads at a file name with no /node_modules/@hyperunix/sdk/dist/ segment (a package linked from elsewhere, read by its real path, or vendored below a directory named @hyperunix/sdk) is no SDK declaration.",
  "R-AMBIENT-OTHER [Q-EV-AMBIENT]: an ambient input other than the environment (the clock, a random draw, process.argv, process.platform, module state) is no environment read.",
];

interface Line {
  readonly id: string;
  readonly requirement: string;
  readonly pins: readonly string[];
}
const CLAIM_LINE = /^(\S+) \((U\d|B145-U\d)\) \[([^\]]+)\]: \S/;
const RESIDUAL_LINE = /^(R-\S+) \[([^\]]+)\]: \S/;
function claimOf(line: string): Line {
  const match = CLAIM_LINE.exec(line);
  return match === null ? { id: line, requirement: "", pins: [] } : { id: match[1] ?? "", requirement: match[2] ?? "", pins: (match[3] ?? "").split(", ") };
}
function residualOf(line: string): Line {
  const match = RESIDUAL_LINE.exec(line);
  return match === null ? { id: line, requirement: "", pins: [] } : { id: match[1] ?? "", requirement: "", pins: (match[2] ?? "").split(", ") };
}
const CLAIMS: readonly Line[] = CLAIM_LINES.map(claimOf);
const RESIDUALS: readonly Line[] = RESIDUAL_LINES.map(residualOf);

/** FROZEN SHAPE (standing rule 16): every requirement, claim and residual, as <id>:<pin count>. */
const FROZEN: readonly string[] = [
  "U1:13",
  "U2:6",
  "U3:5",
  "U4:2",
  "B145-U1:2",
  "B145-U2:7",
  "EN-DIRECTORY:1",
  "EN-MODULE:1",
  "EN-JSON:2",
  "EN-FILE:1",
  "EN-LINK:4",
  "EN-TARGET:3",
  "EN-OTHER:1",
  "ST-LITERAL:5",
  "ST-TEMPLATE:4",
  "ST-KIND-TS:1",
  "ST-KIND-JSX:1",
  "ST-JSON:5",
  "ST-JSON-UNPARSED:1",
  "ST-UNREAD:1",
  "ST-AT:3",
  "ID-REAL:7",
  "ID-MANIFEST:5",
  "ID-DANGLING:1",
  "ID-RESOLVE:4",
  "MB-DECLARATIONS:7",
  "MB-ALIAS:1",
  "MB-KEY-NAME:3",
  "MB-KEY-NONE:2",
  "MB-KEY-COMPUTED:3",
  "MB-PATTERN:7",
  "MB-PATTERN-PLACE:8",
  "RG-BINDING:3",
  "RG-ELEMENT-KEY:3",
  "RG-CALL:4",
  "RG-CALL-METHOD:5",
  "RG-ALIAS:10",
  "RG-SPECIFIER:2",
  "RG-OTHER:9",
  "EV-CLOSURE:5",
  "EV-READS:11",
  "R-UNNARROWED-KEY:2",
  "R-REST-PATTERN:1",
  "R-COPIED-SDK:1",
  "R-UNNAMED-REFERENCE:1",
  "R-UNTYPED-ENV:1",
  "R-RUNTIME-LOAD:1",
  "R-RELOCATED-SDK:1",
  "R-AMBIENT-OTHER:1",
];

/** FROZEN SHAPE, row level: every falsifier's and quiet row's reading digest (digestOf), in roster order. */
const DIGESTS: Readonly<Record<string, string>> = {
  "EN-WALK-TREE": "c23a62a9009a5278",
  "EN-WALK-MODULES": "aebb9fce1641a990",
  "L3-C4-JSON-CMD-ENTRY": "c67aae7db85879c9",
  "G16-C5-DOTFILE-JSON-ENTRY": "84cd60eb6e216ff1",
  "EN-WALK-FILES": "82c496ee6ca832ae",
  "L3-C1-SYMLINK-ENTRY": "868e62025d1714c3",
  "L3-C1-DIRLINK-CTRL-ENTRY": "4370f0f19d3f51f1",
  "EN-WALK-DANGLING": "f03a26654ee72286",
  "EN-KIND-LINK-FIRST": "80534abf6f9c164e",
  "EN-TARGET-REAL": "288d99476df9e4c9",
  "EN-TARGET-DANGLING": "ed47490c3e12bda3",
  "EN-TARGET-CHAIN": "7bd2a1d4e370259d",
  "EN-KIND-OTHER": "a740edd9c4043f1b",
  "ST-LITERAL-STRING": "629d5f7fc77fc75d",
  "ST-LITERAL-NOSUB": "929094ea16ac2e81",
  "G16-C4-ESCAPED-STRINGS": "ff742145a7c75a78",
  "ST-LITERAL-NOSUB-ESCAPED": "f003d4b96811e13a",
  "ST-LITERAL-TYPE-AND-ATTRIBUTE": "4905d5236be0d1e7",
  "ST-TEMPLATE-HEAD": "b931329c70200c4f",
  "L3-C4-TMPL-MIDDLE-STRINGS": "152ea093764e456f",
  "ST-TEMPLATE-TAIL": "e76980a13f4c0bc2",
  "ST-TEMPLATE-ESCAPED": "58e50cbf6423b3c7",
  "ST-KIND-ASSERTION": "3111399106666d58",
  "ST-KIND-JSX-TEXT": "a6d497a15ca5ee3b",
  "L3-C4-JSON-CMD-STRINGS": "8f8475ed1826b478",
  "ST-JSON-NESTED": "baad8b651545a57b",
  "ST-JSON-KEY": "19fd407564f31b34",
  "ST-JSON-ESCAPE": "7074d9f1ee1fe635",
  "ST-JSON-TOP": "e6ff75c8df740f3c",
  "ST-JSON-INVALID": "2d0ec2cf777b5749",
  "ST-OTHER-NAMES": "8a1656cf10e7f421",
  "ST-AT-FILE": "c8700ab19213f9ae",
  "ST-AT-LINKED-JSON": "4e99421f7b42602e",
  "ST-AT-UNREAD": "febc9c8c912e9b50",
  "L3-C1-SYMLINK-IDENTITY": "55c6d1a81bfe7b20",
  "L3-C1-DIRLINK-CTRL-IDENTITY": "5418973ac3cce4dc",
  "ID-REAL-BELOW": "dc1016c7d7e675bd",
  "ID-REAL-LINKED": "05926e6f23f7bc54",
  "ID-REAL-SIBLING": "5a180a29e46d6007",
  "ID-REAL-OUTSIDE-DIST": "73b9e2b4aeb297ee",
  "ID-REAL-PACKAGE-ITSELF": "14037ecc76711277",
  "ID-MANIFEST-COPY": "e48749ae45de705a",
  "ID-MANIFEST-LINKED": "676c12d67c531db7",
  "ID-MANIFEST-NAMELESS": "80f168d3f65adde9",
  "ID-MANIFEST-NONE": "e142603f1e005da0",
  "ID-MANIFEST-OTHER-NAME": "d28d83099fed38f5",
  "ID-DANGLING-INSIDE": "b8e303c7e08c5ae5",
  "L3-C1-SYMLINK-RESOLVE": "ad327419dea2c290",
  "ID-RESOLVE-BARE": "ccfce2e46e92bd3f",
  "ID-RESOLVE-PLAIN": "1d7885153c6746df",
  "ID-RESOLVE-OPTIONS": "ce7081fea45b11b2",
  "G16-C2-INTERSECTION-LOCAL-FIRST": "edbf23f212768a53",
  "G16-C2-INTERSECTION-SDK-FIRST": "3b9c408012b685fe",
  "G16-C2-INTERSECTION-DESTRUCTURE": "e3ae19e71428474e",
  "MB-DECLARATIONS-LOCAL": "ecbeb307f4eff32c",
  "MB-DECLARATIONS-TWO-SDK": "fc55e87ddcb8ee6a",
  "MB-DECLARATIONS-TWO-SDK-REVERSED": "1aa3629d8a886afd",
  "MB-DECLARATIONS-NESTED-PATH": "6b54da2d5b41df1f",
  "MB-ALIAS-IMPORT": "ef26cd7730d8f9ad",
  "MB-KEY-IDENTIFIER": "01780c4c0969922d",
  "MB-KEY-STRING": "14e1a17950add7d6",
  "MB-KEY-SHORTHAND": "fb6be9529598629c",
  "MB-KEY-REST": "5838180dd3f02a42",
  "MB-KEY-ARRAY": "4fb35e9ba796af7a",
  "L3-C2-COMPUTED-DESTRUCTURE": "3e1b5dde72f1b627",
  "L3-C2-CONSTKEY-DESTRUCTURE": "f6dd542670d61163",
  "MB-KEY-TEMPLATE": "4e8aa1ec615c53b0",
  "L3-C2-ASSIGN-DESTRUCTURE": "2cdbdb8ab5abadc2",
  "MB-PATTERN-RENAMED": "925289082dfbb51a",
  "MB-PATTERN-STRING": "c28274bd0fdb6c74",
  "MB-PATTERN-COMPUTED": "6291ac692600c714",
  "MB-PATTERN-DEFAULTED": "d7cd01cf04a505cc",
  "MB-PATTERN-TWO": "f8aa7f204370840e",
  "MB-PATTERN-REST": "8d5abfa95ac56e4c",
  "MB-PLACE-FOR-OF": "ee3dac3c3fe4beda",
  "MB-PLACE-NESTED": "f607c7cf50a21071",
  "MB-PLACE-ARRAY": "50be7b4373941ac4",
  "MB-PLACE-DEFAULT-TARGET": "bd8cd4eff993e5f3",
  "MB-PLACE-NOT-PATTERN": "444903d8313fe947",
  "MB-PLACE-FOR-OF-ARRAY": "ffcdb865831f922b",
  "MB-PLACE-NESTED-ARRAY": "cdb9beedb8f540c7",
  "MB-PLACE-RHS-ARRAY": "b5d72dc8e900abad",
  "G16-B2-DIRECT-CALL-CTRL": "72a7d7f6bbe7085e",
  "RG-RENAMED-IMPORT": "b24324560d3f8387",
  "RG-NAMESPACE-MEMBER": "bdd0555d8433ddf2",
  "RG-ELEMENT-CALL": "216f4323b6f0be21",
  "RG-ELEMENT-TEMPLATE": "24f95be72f48b73f",
  "RG-ELEMENT-CONST": "98aed6ea721bc850",
  "G16-B2-DIRECT-CALL-INPLACE-CTRL": "33f7910acdd514d1",
  "RG-PARENTHESIZED-CALL": "26e98de84f446090",
  "RG-ASSERTED-CALL": "98aa89274d58e9e0",
  "RG-WRAPPED-MEMBER-CALL": "f6f182d1a875f555",
  "G16-B2-CALL-METHOD": "1dddd50a29bdf4a8",
  "G16-B2-CALL-METHOD-INPLACE": "7f8b1cc4d6416b7e",
  "RG-APPLY": "bda3e03e15c30d54",
  "RG-METHOD-WRAPPED": "1aa2bb93bb6cf96e",
  "RG-METHOD-RECEIVER": "6ae04ab5bafaed18",
  "G16-B2-ALIAS-CALL": "a931311980bbbd42",
  "G16-B2-ALIAS-CALL-BLANK": "45bfdf071428b607",
  "RG-ALIAS-CHAIN": "cfd5f7d62b72451b",
  "RG-ALIAS-EXPORTED": "a6f45867c7c8681a",
  "RG-ALIAS-WRAPPED": "4f590c033e8d9b20",
  "RG-OWN-DECLARATION": "ee7c8d6d9602e9f6",
  "RG-ALIAS-LOCAL": "edba3266dfe21770",
  "RG-ALIAS-MEMBER": "f35121b5a464d10b",
  "RG-ALIAS-ELEMENT": "b67d2f6c87a00781",
  "RG-ALIAS-FORMS": "dc99f3aa570e3e77",
  "RG-IMPORT-SPECIFIER": "4bede0049ef63848",
  "RG-EXPORT-SPECIFIER": "728c9e4b0e586380",
  "RG-LET-ALIAS": "0bd315c09f7fe8ac",
  "RG-ARGUMENT": "445eef0a6fe5bd7c",
  "RG-BIND": "6e35f01e345038a9",
  "RG-METHOD-UNCALLED": "6f431f8ff0c4207c",
  "RG-DESTRUCTURED": "38b701e80a335194",
  "RG-PROPERTY-VALUE": "caf4959df4db198f",
  "RG-SHORTHAND-VALUE": "59e863cd9dec855e",
  "RG-TYPE-QUERY": "f468cc54db820923",
  "RG-VAR-ALIAS": "46fe3a2b01773c07",
  "EV-CLOSURE-CHAIN": "679630f3646b613f",
  "EV-CLOSURE-TYPE-ONLY": "18e6d755f799138a",
  "EV-CLOSURE-FILTER": "cfb515d696195206",
  "EV-CLOSURE-EXPORT-FROM": "e1aabbaac43a2e6e",
  "EV-CLOSURE-ORDER": "45c3f0283bff1f8f",
  "L3-A-ENV-READS": "e04f08b03fe4adb2",
  "EV-GLOBAL-THIS": "5b3f38f540a45b7f",
  "EV-ELEMENT": "90611319e25fae3a",
  "EV-IMPORTED-ENV": "012c7ef39ffb56ee",
  "EV-REFLECT": "7b2b1187dfa257af",
  "EV-DESTRUCTURE-SOURCE": "982117490236a1c4",
  "EV-LOCAL-PROCESSENV": "d9af2de2f7d15ed7",
  "EV-LINE-START": "5cb6d128f7c7ac72",
  "EV-NESTED": "2f0f19b5e9c0ce2a",
  "EV-OTHER-PACKAGE-PROCESSENV": "e9e823ff7fddda0a",
  "EV-SHORTHAND": "5d6c733840915898",
  "Q-KEY-UNION": "998d32e3ed142d13",
  "Q-PATTERN-STRING-KEY": "116e26f85963f0d4",
  "Q-MB-REST-PATTERN": "f5963ad4a94a9e11",
  "Q-ID-COPY": "e6741802dbd37efe",
  "Q-RG-COMPUTED": "d41736472bb547b2",
  "Q-EV-UNTYPED": "6a8eb7de77bab3c8",
  "Q-EV-DYNAMIC": "907a49a1c01b449e",
  "Q-MB-RELOCATED": "b7328efb2b9e557f",
  "Q-EV-AMBIENT": "7a79bcae302801cb",
};

// ---- the scratch trees (EN, ST-AT, ID) ----

const SDK_MUTATION_MODULE = join(REPO, "node_modules", SDK, "dist", "protocol", "mutation.js");
const SDK_PACKAGE_DIR = join(REPO, "node_modules", SDK);
/** The installed SDK package's real directory, read by node itself (never by the helper under judgment). */
function sdkReal(): string {
  return realpathSync(SDK_PACKAGE_DIR).split(sep).join("/");
}
/** The synthetic package's real directory. */
function pkgReal(): string {
  return realpathSync(at("id-pkg", "real")).split(sep).join("/");
}
let scratch = "";
function at(...parts: string[]): string {
  return join(scratch, ...parts);
}
function put(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}
function link(path: string, target: string): void {
  mkdirSync(dirname(path), { recursive: true });
  symlinkSync(target, path);
}
/** The gate plant L3-C1-SYMLINK's loader module (gate-prep-17, verbatim). */
const SYMLINK_LOADER =
  "/** gate plant L3-C1-SYMLINK (gate-prep-17): the SDK's receipt decoder loaded through a symlinked module entry below src. */\n" +
  'import { createRequire } from "node:module";\n' +
  "const load = createRequire(import.meta.url);\n" +
  'export const readHxReceipt = (value: unknown): unknown => (load("./hx-mutation-link.mjs") as { receiptFromJson: (input: unknown) => unknown }).receiptFromJson(value);\n';
/** The gate plants' src JSON launch entry (L3-C4-JSON-CMD and G16-C5-DOTFILE-JSON, verbatim). */
const JSON_LAUNCH = '{ "command": "hx", "args": ["mutation", "apply"] }\n';
beforeAll(() => {
  scratch = makeScratch("hx-mutation-verified-readers-");
  // A manifest above every tree, so an upward manifest read always ends inside the scratch root.
  put(at("package.json"), '{ "name": "census-scratch" }\n');
  // EN: one directory per falsifier.
  put(at("en-tree", "top.ts"), "export {};\n");
  put(at("en-tree", "sub", "deeper", "z.ts"), "export {};\n");
  put(at("en-tree", "other", "y.ts"), "export {};\n");
  for (const name of ["a.ts", "b.tsx", "c.mts", "d.cts", "e.js", "f.jsx", "g.mjs", "h.cjs"]) put(at("en-modules", name), "export {};\n");
  put(at("en-json-cmd", "hx-launch.json"), JSON_LAUNCH);
  put(at("en-json-dot", ".hx-launch.json"), JSON_LAUNCH);
  for (const name of ["README", "notes.md", "map.ts.map", "upper.TS", "upper.JSON", "launch.json.bak", "hxjson"]) put(at("en-files", name), '"hx"\n');
  link(at("en-link-file", "hx-mutation-link.mjs"), SDK_MUTATION_MODULE);
  link(at("en-link-dir", "hxsdk"), SDK_PACKAGE_DIR);
  link(at("en-dangling", "gone.ts"), "./missing.ts");
  link(at("en-link-chain", "inner.mjs"), SDK_MUTATION_MODULE);
  link(at("en-link-chain", "outer.mjs"), "./inner.mjs");
  link(at("en-link-chain", "nested", "deep.mjs"), SDK_MUTATION_MODULE);
  // ST-AT.
  put(at("st-at", "plain.ts"), 'export const c = "hx";\n');
  put(at("st-at-target", "launch.data"), '{ "command": "hx" }\n');
  link(at("st-at", "linked.json"), "../st-at-target/launch.data");
  link(at("st-at", "dir-link"), "../en-tree");
  link(at("st-at", "gone.json"), "./missing.json");
  mkdirSync(at("st-at", "adir"), { recursive: true });
  // ID: the gate's link plants below a src tree, a synthetic package, a manifest copy and a plain copy.
  link(at("id-link", "src", "workbench", "hx-mutation-link.mjs"), SDK_MUTATION_MODULE);
  put(at("id-link", "src", "workbench", "hx-receipt-link.ts"), SYMLINK_LOADER);
  put(at("id-link", "src", "workbench", "hx-plain.mjs"), "export {};\n");
  link(at("id-dirlink", "src", "workbench", "hxsdk"), SDK_PACKAGE_DIR);
  put(at("id-pkg", "real", "dist", "package.json"), '{ "type": "module" }\n');
  put(at("id-pkg", "real", "dist", "x.js"), "export {};\n");
  put(at("id-pkg", "real-sibling", "x.js"), "export {};\n");
  put(at("id-pkg", "real", "root.js"), "export {};\n");
  put(at("id-other", "package.json"), `{ "name": "${SDK}-tools" }\n`);
  put(at("id-other", "dist", "x.js"), "export {};\n");
  put(at("id-numeric", "package.json"), '{ "name": 1 }\n');
  put(at("id-numeric", "dist", "x.js"), "export {};\n");
  link(at("id-pkg", "real", "dist", "gone.js"), "./missing.js");
  link(at("id-pkg-link"), at("id-pkg", "real"));
  put(at("id-copy", "package.json"), `{ "name": "${SDK}" }\n`);
  put(at("id-copy", "dist", "x.js"), "export {};\n");
  link(at("id-copy-link", "x.js"), at("id-copy", "dist", "x.js"));
  mkdirSync(at("id-plain-copy"), { recursive: true });
  copyFileSync(SDK_MUTATION_MODULE, at("id-plain-copy", "mutation.js"));
  mkdirSync(at("id-hard-link"), { recursive: true });
  linkSync(at("id-pkg", "real", "dist", "x.js"), at("id-hard-link", "x.js"));
});
afterAll(() => removeScratch(scratch));

function walk(directory: string): string[] {
  return entriesBelow(at(directory))
    .map(entry => `${entry.path}|${entry.kind}`)
    .sort();
}
function synthetic(name: string, kinds: { directory?: boolean; file?: boolean; link?: boolean }): EntryLike {
  return { name, isDirectory: () => kinds.directory === true, isFile: () => kinds.file === true, isSymbolicLink: () => kinds.link === true };
}
function nullable<T>(value: T | undefined): T | null {
  return value === undefined ? null : value;
}

// ---- the program (MB, RG, EV): virtual modules over the repo's options, compiled once ----

const CENSUS_DIR = join(REPO, "src", "__wb-ts6.3-readers-census__");
const WORKBENCH_DIR = join(REPO, "src", "workbench");
const HOSTS_DIR = join(REPO, "src", "workbench", "hosts");
/** The context of the gate's in-place provider plants: the provider's own two lines (nativeHyperUnixFind) around the plant. */
function providerPlant(line: string): string {
  return `import { HyperUnix } from "@hyperunix/sdk";\nexport function plant(root: string): void {\n  const workspace=HyperUnix.open(root);\n  const client=workspace.client;\n${line}  void client;\n}\n`;
}
/** A module over the SDK workspace, for the member readers' own falsifiers. */
function workspaceModule(body: string): string {
  return `import { HyperUnix } from "@hyperunix/sdk";\nconst workspace = HyperUnix.open("/census");\n${body}`;
}
/** The gate's injected-registration module head (G16-B2-*, gate-prep-16, verbatim; a module in src/workbench). */
const INJ_HEAD =
  "/** gate plant (gate-prep-16): src calls the injected-reader registration (registerHyperUnixFind) - the call B2 and Q3 say src never makes. */\n" +
  'import type { CapabilityRegistry } from "./capability-registry.js";\n' +
  'import { type HyperUnixReader, registerHyperUnixFind } from "./providers/hyperunix.js";\n';
const INJ_FN = "export function registerInjectedHyperUnix(registry: CapabilityRegistry, reader: HyperUnixReader, workspaceRoot: string): void {\n";
/** The gate's in-place detached-host members (G16-B2-*-INPLACE, gate-prep-16, verbatim; a module in src/workbench/hosts). */
function detachedPlant(body: string): string {
  return (
    'import type { CapabilityRegistry } from "../capability-registry.js";\n' +
    'import { type HyperUnixReader, registerHyperUnixFind, registerNativeHyperUnixFind } from "../providers/hyperunix.js";\n' +
    "/** gate plant (gate-prep-16): the injected-reader registration, called from the detached host module. */\n" +
    "export function registerInjectedHyperUnix(registry: CapabilityRegistry, reader: HyperUnixReader, workspaceRoot: string): void {\n" +
    `  ${body}\n}\n\nexport function registerNative(registry: CapabilityRegistry, root: string): void {\n  registerNativeHyperUnixFind(registry, root);\n}\n`
  );
}
/** A module in src/workbench calling the injected registration in its own words. */
function registrationModule(head: string, body: string): string {
  return `import type { CapabilityRegistry } from "./capability-registry.js";\n${head}export function attachInjected(registry: CapabilityRegistry, reader: HyperUnixReader, root: string): void {\n${body}}\n`;
}
const READER_IMPORT = 'import { type HyperUnixReader, registerHyperUnixFind } from "./providers/hyperunix.js";\n';
const READER_TYPE_IMPORT = 'import type { HyperUnixReader } from "./providers/hyperunix.js";\n';
const NAMESPACE_IMPORT = 'import * as provider from "./providers/hyperunix.js";\n';
/** The gate plant L3-A-ENV's refusal line (gate-prep-17, verbatim) in a minimal module of the adapter's refusal. */
const ENV_REFUSAL =
  'const READING: Readonly<Record<string, string>> = { "mutation-rejected": "mutation", "mutation-partial": "mutation" };\n' +
  "function refused(message: string): Error {\n  return new Error(message);\n}\n" +
  "export function refuse(kind: string): void {\n  const reads = READING[kind];\n" +
  `  if (reads === 'mutation' && !(process.env.PI_HX_ALLOW_MUTATION_OUTCOMES === '1')) throw refused(\`\${kind} is a mutation outcome and this read adapter refuses mutation outcomes\`);\n}\n`;

const VIRTUAL: Readonly<Record<string, string>> = {
  // MB-DECLARATIONS (G16-C2-*, gate-prep-16, verbatim plant lines) and MB-ALIAS.
  "census/mb-local-first.ts": providerPlant("  const facet:{readonly mutations:unknown}&typeof workspace=workspace; void facet.mutations;\n"),
  "census/mb-sdk-first.ts": providerPlant("  const facet:typeof workspace&{readonly mutations:unknown}=workspace; void facet.mutations;\n"),
  "census/mb-destructure.ts": providerPlant("  const {mutations:facetMutations}:{readonly mutations:unknown}&typeof workspace=workspace; void facetMutations;\n"),
  "census/mb-local.ts": "const local: { readonly mutations: unknown } = { mutations: 1 };\nexport const read = local.mutations;\n",
  "census/mb-alias.ts": 'import { HyperUnix } from "@hyperunix/sdk";\nexport const open = HyperUnix.open;\n',
  // MB-DECLARATIONS: two SDK declarations of one symbol in both intersection orders (gate-prep-16 twin W-MB-TWO-SDK) and a nested dist path.
  "census/mb-two-sdk.ts": 'import type { HyperUnix, Workspace } from "@hyperunix/sdk";\ndeclare const both: HyperUnix & Workspace;\nexport const read = both.mutations;\n',
  "census/mb-two-sdk-reversed.ts": 'import type { HyperUnix, Workspace } from "@hyperunix/sdk";\ndeclare const both: Workspace & HyperUnix;\nexport const read = both.mutations;\n',
  "census/mb-nested-path.ts": 'import type { Frame } from "@hyperunix/sdk";\ndeclare const frame: Frame;\nexport const read = frame.seq;\n',
  // MB-KEY-* and MB-KEY-COMPUTED (L3-C2-*, gate-prep-17, verbatim plant lines).
  "census/mb-key-identifier.ts": workspaceModule("const { mutations: m } = workspace;\nvoid m;\n"),
  "census/mb-key-string.ts": workspaceModule('const { "mutations": m } = workspace;\nvoid m;\n'),
  "census/mb-key-shorthand.ts": workspaceModule("const { mutations } = workspace;\nvoid mutations;\n"),
  "census/mb-key-rest.ts": workspaceModule("const { ...rest } = workspace;\nvoid rest;\n"),
  "census/mb-key-array.ts": workspaceModule("const [first] = [workspace];\nvoid first;\n"),
  "census/mb-key-computed.ts": providerPlant('  const { ["mutations"]: mutationNamespace } = workspace; void mutationNamespace;\n'),
  "census/mb-key-constkey.ts": providerPlant('  const MUTATIONS_KEY = "mutations"; const { [MUTATIONS_KEY]: mutationNamespace } = workspace; void mutationNamespace;\n'),
  "census/mb-key-template.ts": workspaceModule("const { [`mutations`]: m } = workspace;\nvoid m;\n"),
  // MB-PATTERN (L3-C2-ASSIGN-DESTRUCTURE, gate-prep-17, verbatim) and MB-PATTERN-PLACE.
  "census/mb-assign.ts": providerPlant("  let mutations: unknown; ({ mutations } = workspace); void mutations;\n"),
  "census/mb-pattern-renamed.ts": workspaceModule("let m: unknown;\n({ mutations: m } = workspace);\nvoid m;\n"),
  "census/mb-pattern-string.ts": workspaceModule('let m: unknown;\n({ "mutations": m } = workspace);\nvoid m;\n'),
  "census/mb-pattern-computed.ts": workspaceModule('let m: unknown;\n({ ["mutations"]: m } = workspace);\nvoid m;\n'),
  "census/mb-pattern-defaulted.ts": workspaceModule("let mutations: unknown;\n({ mutations = undefined } = workspace);\nvoid mutations;\n"),
  // MB-PATTERN twin W-MB-PATTERN-SECOND (gate-prep-16, verbatim) and a rest element.
  "census/mb-pattern-two.ts": workspaceModule("let client: unknown;\nlet mutations: unknown;\n({ client, mutations } = workspace);\nvoid [client, mutations];\n"),
  "census/mb-pattern-rest.ts": workspaceModule("let mutations: unknown;\nlet rest: unknown;\n({ mutations, ...rest } = workspace);\nvoid [mutations, rest];\n"),
  "census/mb-place-for-of.ts": workspaceModule("let mutations: unknown;\nfor ({ mutations } of [workspace]) void mutations;\n"),
  "census/mb-place-nested.ts": workspaceModule("let mutations: unknown;\n({ ws: { mutations } } = { ws: workspace });\nvoid mutations;\n"),
  "census/mb-place-array.ts": workspaceModule("let mutations: unknown;\n[{ mutations }] = [workspace];\nvoid mutations;\n"),
  "census/mb-place-default-target.ts": workspaceModule("let mutations: unknown;\n({ ws: { mutations } = workspace } = { ws: undefined });\nvoid mutations;\n"),
  // MB-PATTERN-PLACE twins W-MB-PLACE-FOR-OF-ARRAY, W-MB-PLACE-NESTED-ARRAY and W-MB-PLACE-RHS-ARRAY (gate-prep-16, verbatim).
  "census/mb-place-for-of-array.ts": workspaceModule("let mutations: unknown;\nfor ([{ mutations }] of [[workspace]]) void mutations;\n"),
  "census/mb-place-nested-array.ts": workspaceModule("let mutations: unknown;\n({ ws: [{ mutations }] } = { ws: [workspace] });\nvoid mutations;\n"),
  "census/mb-place-rhs-array.ts": "let target: unknown;\ntarget = [{ mutations: 1 }];\nvoid target;\n",
  "census/mb-place-not-pattern.ts": workspaceModule(
    "export const copy = { mutations: workspace.mutations };\nexport const list = [{ mutations: 1 }];\nexport const nested = { inner: { mutations: 1 } };\nexport const either = { mutations: workspace.mutations } || undefined;\nlet target: unknown;\ntarget = { mutations: workspace.mutations };\nvoid target;\nfor (const entry of [{ mutations: 1 }]) void entry;\n",
  ),
  // R-RELOCATED-SDK quiet row: an SDK-shaped declaration file at a path with no /node_modules/@hyperunix/sdk/dist/ segment.
  "census/vendor/hyperunix-sdk/dist/client.d.ts": "export declare class Workspace {\n  get mutations(): unknown;\n}\n",
  "census/mb-relocated.ts": 'import type { Workspace } from "./vendor/hyperunix-sdk/dist/client.js";\ndeclare const workspace: Workspace;\nexport const read = workspace.mutations;\n',
  "census/vendor/@hyperunix/sdk/dist/client.d.ts": "export declare class Workspace {\n  get mutations(): unknown;\n}\n",
  "census/mb-relocated-scoped.ts": 'import type { Workspace } from "./vendor/@hyperunix/sdk/dist/client.js";\ndeclare const workspace: Workspace;\nexport const read = workspace.mutations;\n',
  // R-REST-PATTERN quiet row: object patterns below an array rest element (the checker types none).
  "census/q-mb-rest-pattern.ts": workspaceModule("let length: unknown;\n[...{ length }] = [workspace];\nlet mutations: unknown;\n[, ...[{ mutations }]] = [workspace, workspace];\nvoid [length, mutations];\n"),
  // R-UNNARROWED-KEY quiet rows.
  "census/q-key-union.ts": workspaceModule(
    'declare const unionKey: "mutations" | "client";\ndeclare const stringKey: string;\ndeclare const keyofKey: keyof { mutations: 1; client: 2 };\nconst { [unionKey]: m1 } = workspace;\nconst { [stringKey]: m2 } = workspace;\nconst { [keyofKey]: m3 } = workspace;\nconst { 0: m4 } = workspace;\nvoid [m1, m2, m3, m4];\n',
  ),
  "census/q-pattern-string-key.ts": workspaceModule(
    'declare const stringKey: string;\ndeclare const unionKey: "mutations" | "client";\ndeclare const keyofKey: keyof { mutations: 1; client: 2 };\nlet m: unknown;\n({ [stringKey]: m } = workspace);\n({ [unionKey]: m } = workspace);\n({ [keyofKey]: m } = workspace);\n({ 0: m } = workspace);\nvoid m;\n',
  ),
  // RG (G16-B2-*, gate-prep-16, verbatim) and the registration readers' own falsifiers.
  "workbench/g16-direct-call-ctrl.ts": `${INJ_HEAD}${INJ_FN}  registerHyperUnixFind(registry, reader, workspaceRoot);\n}\n`,
  "workbench/g16-call-method.ts": `${INJ_HEAD}${INJ_FN}  registerHyperUnixFind.call(undefined, registry, reader, workspaceRoot);\n}\n`,
  "workbench/g16-alias-call.ts": `${INJ_HEAD}const attachReader = registerHyperUnixFind;\n${INJ_FN}  attachReader(registry, reader, workspaceRoot);\n}\n`,
  "workbench/g16-alias-call-blank.ts": `${INJ_HEAD}\nconst attachReader = registerHyperUnixFind;\n${INJ_FN}  attachReader(registry, reader, workspaceRoot);\n}\n`,
  "hosts/g16-direct-call-inplace-ctrl.ts": detachedPlant("registerHyperUnixFind(registry, reader, workspaceRoot);"),
  "hosts/g16-call-method-inplace.ts": detachedPlant("registerHyperUnixFind.call(undefined, registry, reader, workspaceRoot);"),
  "workbench/rg-renamed-import.ts": registrationModule('import { type HyperUnixReader, registerHyperUnixFind as attach } from "./providers/hyperunix.js";\n', "  attach(registry, reader, root);\n"),
  "workbench/rg-namespace-member.ts": registrationModule(READER_TYPE_IMPORT + NAMESPACE_IMPORT, "  provider.registerHyperUnixFind(registry, reader, root);\n"),
  "workbench/rg-element-call.ts": registrationModule(READER_TYPE_IMPORT + NAMESPACE_IMPORT, '  provider["registerHyperUnixFind"](registry, reader, root);\n'),
  "workbench/rg-element-template.ts": registrationModule(READER_TYPE_IMPORT + NAMESPACE_IMPORT, "  provider[`registerHyperUnixFind`](registry, reader, root);\n"),
  "workbench/rg-element-const.ts": registrationModule(`${READER_TYPE_IMPORT}${NAMESPACE_IMPORT}const KEY = "registerHyperUnixFind";\n`, "  provider[KEY](registry, reader, root);\n"),
  "workbench/rg-method-wrapped.ts": registrationModule(READER_IMPORT, "  (registerHyperUnixFind.call)(undefined, registry, reader, root);\n  registerHyperUnixFind.apply!(undefined, [registry, reader, root]);\n"),
  "workbench/rg-shorthand-value.ts": `${READER_IMPORT}export const table = { registerHyperUnixFind };\nlet attach: unknown;\n({ attach = registerHyperUnixFind } = {} as { attach?: unknown });\nvoid attach;\nexport type { HyperUnixReader };\n`,
  "workbench/rg-parenthesized-call.ts": registrationModule(READER_IMPORT, "  (registerHyperUnixFind)(registry, reader, root);\n"),
  "workbench/rg-asserted-call.ts": registrationModule(
    `${READER_IMPORT}type Register = (registry: CapabilityRegistry, reader: HyperUnixReader, root: string) => void;\n`,
    "  (registerHyperUnixFind as Register)(registry, reader, root);\n  (registerHyperUnixFind satisfies Register)(registry, reader, root);\n  registerHyperUnixFind!(registry, reader, root);\n  (<Register>registerHyperUnixFind)(registry, reader, root);\n",
  ),
  "workbench/rg-apply.ts": registrationModule(READER_IMPORT, "  registerHyperUnixFind.apply(undefined, [registry, reader, root]);\n"),
  "workbench/rg-wrapped-member-call.ts": registrationModule(
    `${READER_TYPE_IMPORT}${NAMESPACE_IMPORT}type Register = (registry: CapabilityRegistry, reader: HyperUnixReader, root: string) => void;\n`,
    '  (provider.registerHyperUnixFind)(registry, reader, root);\n  (provider["registerHyperUnixFind"] as Register)(registry, reader, root);\n',
  ),
  "workbench/rg-method-receiver.ts": registrationModule(
    `${READER_TYPE_IMPORT}${NAMESPACE_IMPORT}type Register = (registry: CapabilityRegistry, reader: HyperUnixReader, root: string) => void;\n`,
    '  (provider.registerHyperUnixFind as Register).call(undefined, registry, reader, root);\n  provider["registerHyperUnixFind"].apply(undefined, [registry, reader, root]);\n',
  ),
  // RG-ALIAS twins W-RG-ALIAS-LOCAL and W-RG-ALIAS-MEMBER (gate-prep-16, verbatim), an element-access initializer and an alias's other forms.
  "workbench/rg-alias-local.ts": registrationModule(READER_IMPORT, "  const attach = registerHyperUnixFind;\n  attach(registry, reader, root);\n"),
  "workbench/rg-alias-member.ts": registrationModule(`${READER_TYPE_IMPORT}${NAMESPACE_IMPORT}const attach = provider.registerHyperUnixFind;\n`, "  attach(registry, reader, root);\n"),
  "workbench/rg-alias-element.ts": registrationModule(`${READER_TYPE_IMPORT}${NAMESPACE_IMPORT}const attach = provider["registerHyperUnixFind"];\n`, "  attach(registry, reader, root);\n"),
  "workbench/rg-alias-forms.ts": registrationModule(`${READER_IMPORT}const attach = registerHyperUnixFind;\n`, "  attach.call(undefined, registry, reader, root);\n  Reflect.apply(attach, undefined, [registry, reader, root]);\n"),
  // RG-OTHER twin W-RG-VAR-ALIAS (gate-prep-16, verbatim).
  "workbench/rg-var-alias.ts": registrationModule(`${READER_IMPORT}var attach = registerHyperUnixFind;\n`, "  attach(registry, reader, root);\n"),
  "workbench/rg-alias-chain.ts": registrationModule(`${READER_IMPORT}const first = registerHyperUnixFind;\nconst second = first;\n`, "  second(registry, reader, root);\n  for (const entry of [registry]) void entry;\n"),
  "workbench/rg-alias-exported.ts": `${READER_IMPORT}export const attach = registerHyperUnixFind;\nexport type { HyperUnixReader };\n`,
  "workbench/rg-alias-importer.ts": registrationModule('import { attach, type HyperUnixReader } from "./__wb-ts6.3-census__rg-alias-exported.js";\nconst local = attach;\n', "  local(registry, reader, root);\n"),
  "workbench/rg-alias-wrapped.ts": registrationModule(
    `${READER_IMPORT}type Register = (registry: CapabilityRegistry, reader: HyperUnixReader, root: string) => void;\nconst a1 = (registerHyperUnixFind);\nconst a2 = registerHyperUnixFind as Register;\nconst a3 = registerHyperUnixFind satisfies Register;\nconst a4 = registerHyperUnixFind!;\nconst a5 = <Register>registerHyperUnixFind;\nconst a6 = ((registerHyperUnixFind as Register)!);\n`,
    "  a1(registry, reader, root);\n  a2(registry, reader, root);\n  a3(registry, reader, root);\n  a4(registry, reader, root);\n  a5(registry, reader, root);\n  a6(registry, reader, root);\n",
  ),
  "workbench/rg-method-uncalled.ts": `${READER_IMPORT}export const method = registerHyperUnixFind.call;\nexport const passed = String(registerHyperUnixFind.apply);\nexport type { HyperUnixReader };\n`,
  "census/rg-own-declaration.ts": "export function registerCensusOwn(): void {}\nregisterCensusOwn();\n",
  "workbench/rg-import-specifier.ts": `${READER_IMPORT}export type { HyperUnixReader };\n`,
  "workbench/rg-export-specifier.ts": 'export { registerHyperUnixFind as attachReader } from "./providers/hyperunix.js";\n',
  "workbench/rg-let-alias.ts": registrationModule(`${READER_IMPORT}let attach = registerHyperUnixFind;\n`, "  attach(registry, reader, root);\n  attach = registerHyperUnixFind;\n"),
  "workbench/rg-argument.ts": registrationModule(READER_IMPORT, "  Reflect.apply(registerHyperUnixFind, undefined, [registry, reader, root]);\n"),
  "workbench/rg-bind.ts": registrationModule(READER_IMPORT, "  registerHyperUnixFind.bind(undefined)(registry, reader, root);\n"),
  "workbench/rg-destructured.ts": registrationModule(READER_TYPE_IMPORT + NAMESPACE_IMPORT, "  const { registerHyperUnixFind: attach } = provider;\n  attach(registry, reader, root);\n"),
  "workbench/rg-property-value.ts": `${READER_IMPORT}export const table = { register: registerHyperUnixFind };\nexport type { HyperUnixReader };\n`,
  "workbench/rg-type-query.ts": `${READER_IMPORT}export type Register = typeof registerHyperUnixFind;\nexport type { HyperUnixReader };\n`,
  // R-UNNAMED-REFERENCE quiet row.
  "workbench/q-rg-computed.ts": registrationModule(
    READER_TYPE_IMPORT + NAMESPACE_IMPORT,
    '  const name = ["register", "HyperUnixFind"].join("");\n  (provider as unknown as Record<string, (...input: unknown[]) => void>)[name]?.(registry, reader, root);\n  Object.values(provider);\n  (provider as any).registerHyperUnixFind(registry, reader, root);\n',
  ),
  // EV-READS (L3-A-ENV, gate-prep-17, verbatim refusal line) and its own falsifiers.
  "census/ev-refusal.ts": ENV_REFUSAL,
  "census/ev-global-this.ts": "export const flag = globalThis.process.env.PI_CENSUS_FLAG;\n",
  "census/ev-element.ts": 'export const flag = process["env"].PI_CENSUS_FLAG;\n',
  "census/ev-imported-env.ts": 'import { env } from "node:process";\nexport const flag = env.PI_CENSUS_FLAG;\n',
  "census/ev-reflect.ts": 'export const snapshot = Reflect.get(process, "env");\n',
  "census/ev-destructure-source.ts": "const { PI_CENSUS_FLAG } = process.env;\nexport const flag = PI_CENSUS_FLAG;\n",
  "census/ev-local-processenv.ts": "interface ProcessEnv {\n  readonly flag: string;\n}\ndeclare const local: ProcessEnv;\nexport const flag = local.flag;\n",
  // EV-READS twin W-EV-LINE-START (gate-prep-16, verbatim), a read inside a read, and a ProcessEnv another package declares.
  "census/ev-line-start.ts": "export {};\nprocess.env.PI_CENSUS_FLAG;\n",
  "census/ev-nested.ts": "const same = <T>(value: T): T => value;\nexport const flag = same(process.env).PI_CENSUS_FLAG;\n",
  "census/ev-shorthand.ts": 'import { env } from "node:process";\nexport const box = { env };\n',
  "census/node_modules/env-types/index.d.ts": "export interface ProcessEnv {\n  readonly flag: string;\n}\n",
  "census/ev-other-package-processenv.ts": 'import type { ProcessEnv } from "./node_modules/env-types/index.js";\ndeclare const local: ProcessEnv;\nexport const flag = local.flag;\n',
  // R-UNTYPED-ENV, R-RUNTIME-LOAD, R-AMBIENT-OTHER quiet rows.
  "census/q-ev-untyped.ts":
    'export const flag = (process as unknown as { env: Record<string, string> }).env.PI_CENSUS_FLAG;\nexport const loose = (process as any).env.PI_CENSUS_FLAG;\nexport const required = require("node:process").env.PI_CENSUS_FLAG;\n',
  "census/q-ev-dynamic-entry.ts":
    'import { createRequire } from "node:module";\nexport const load = () => import("./q-ev-target.js");\nexport const required = () => require("./q-ev-target.js");\nexport const created = () => createRequire(import.meta.url)("./q-ev-target.js");\n',
  "census/q-ev-static-entry.ts": 'import { flag } from "./q-ev-target.js";\nexport const copy = flag;\n',
  "census/q-ev-target.ts": "export const flag = process.env.PI_CENSUS_FLAG;\n",
  "census/q-ev-ambient.ts":
    "let calls = 0;\nexport const next = (): number => ++calls;\nexport const now = Date.now();\nexport const draw = Math.random();\nexport const argv = process.argv;\nexport const platform = process.platform;\n",
  // EV-CLOSURE.
  "census/cl-a.ts": 'import { b } from "./cl-b.js";\nexport const a = b;\n',
  "census/cl-b.ts": 'export * from "./cl-c.js";\nexport const b = 1;\n',
  "census/cl-c.ts": 'import d = require("./cl-d.js");\nexport const c = d;\n',
  "census/cl-d.ts": 'import { a } from "./cl-a.js";\nexport const d = 1;\nexport const cycle = () => a;\n',
  "census/cl-t.ts": 'import type { U } from "./cl-u.js";\nexport type T = U;\n',
  "census/cl-u.ts": "export type U = 1;\n",
  "census/cl-f.ts": 'import { createHash } from "node:crypto";\nimport { HyperUnix } from "@hyperunix/sdk";\nimport { g } from "./cl-g.js";\nexport const f = [createHash, HyperUnix, g];\n',
  "census/cl-g.ts": "export const g = 1;\n",
  // EV-CLOSURE twin W-EV-CLOSURE-TYPE-EXPORT (gate-prep-16; its type-only export-from line verbatim) beside a named export-from.
  "census/cl-export-from.ts": 'export type { U } from "./cl-type-target.js";\nexport { v } from "./cl-named-target.js";\n',
  "census/cl-type-target.ts": "export type U = 1;\n",
  "census/cl-named-target.ts": "export const v = 1;\n",
  // EV-CLOSURE order: two branches, each with a module below it (breadth-first reads both branches before either child).
  "census/cl-o.ts": 'import { o1 } from "./cl-o1.js";\nimport { o2 } from "./cl-o2.js";\nexport const o = [o1, o2];\n',
  "census/cl-o1.ts": 'import { o11 } from "./cl-o11.js";\nexport const o1 = o11;\n',
  "census/cl-o2.ts": 'import { o21 } from "./cl-o21.js";\nexport const o2 = o21;\n',
  "census/cl-o11.ts": "export const o11 = 1;\n",
  "census/cl-o21.ts": "export const o21 = 1;\n",
};
/** A virtual module's file name: census/ below CENSUS_DIR (nested paths kept), workbench/ below src/workbench, hosts/ below src/workbench/hosts. */
function virtualPath(name: string): string {
  const [area, ...rest] = name.split("/");
  if (area === "census") return join(CENSUS_DIR, ...rest);
  return join(area === "hosts" ? HOSTS_DIR : WORKBENCH_DIR, `__wb-ts6.3-census__${rest.join("/")}`);
}
function repoPath(path: string): string {
  return relative(REPO, path).split(sep).join("/");
}
interface Compiled {
  readonly program: ts.Program;
  readonly checker: ts.TypeChecker;
  readonly options: ts.CompilerOptions;
}
let compiledProgram: Compiled | undefined;
function compiled(): Compiled {
  if (compiledProgram !== undefined) return compiledProgram;
  const configPath = join(REPO, "tsconfig.json");
  const config = ts.readConfigFile(configPath, path => ts.sys.readFile(path));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO, { noEmit: true }, configPath);
  // TypeScript 6 includes no @types package by default; src reaches @types/node through its node: imports, so name it here.
  const options: ts.CompilerOptions = { ...parsed.options, types: ["node"] };
  const virtual = new Map(Object.entries(VIRTUAL).map(([name, text]) => [virtualPath(name), text]));
  const host = ts.createCompilerHost(options, true);
  const getSourceFile = host.getSourceFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const readFile = host.readFile.bind(host);
  const directoryExists = host.directoryExists?.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const text = virtual.get(fileName);
    return text === undefined ? getSourceFile(fileName, languageVersion, onError, shouldCreate) : ts.createSourceFile(fileName, text, languageVersion, true, ts.ScriptKind.TS);
  };
  host.fileExists = fileName => virtual.has(fileName) || fileExists(fileName);
  host.readFile = fileName => virtual.get(fileName) ?? readFile(fileName);
  const virtualDirectories = new Set([...virtual.keys()].filter(path => path.startsWith(CENSUS_DIR)).flatMap(path => {
    const directories: string[] = [];
    for (let directory = dirname(path); directory.startsWith(CENSUS_DIR); directory = dirname(directory)) directories.push(directory);
    return directories;
  }));
  host.directoryExists = directory => virtualDirectories.has(directory) || (directoryExists === undefined ? ts.sys.directoryExists(directory) : directoryExists(directory));
  const program = ts.createProgram({ rootNames: [...virtual.keys()], options, host });
  compiledProgram = { program, checker: program.getTypeChecker(), options };
  return compiledProgram;
}
// ---- the trace's shapes: a reader's arguments and result as plain JSON ----

/** The SDK's dist segment, spelled here (not read from the helper under judgment). */
const SDK_DIST = "/node_modules/@hyperunix/sdk/dist/";
const VIRTUAL_PATHS: ReadonlySet<string> = new Set(Object.keys(VIRTUAL).map(virtualPath));
function sha16(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
/** A file as the trace names it: an SDK file by its path below dist, any other by its repo path. */
function fileLabel(fileName: string): string {
  const path = fileName.split(sep).join("/");
  const index = path.indexOf(SDK_DIST);
  return index === -1 ? repoPath(fileName) : `<sdk-dist>/${path.slice(index + SDK_DIST.length)}`;
}
function isNode(value: unknown): value is ts.Node {
  return typeof value === "object" && value !== null && "kind" in value && typeof value.kind === "number" && "getSourceFile" in value && typeof value.getSourceFile === "function";
}
function isSymbol(value: object): value is ts.Symbol {
  return "escapedName" in value && "getDeclarations" in value && typeof value.getDeclarations === "function";
}
function isEntryLike(value: object): value is EntryLike {
  return (
    "name" in value &&
    typeof value.name === "string" &&
    "isFile" in value &&
    typeof value.isFile === "function" &&
    "isDirectory" in value &&
    typeof value.isDirectory === "function" &&
    "isSymbolicLink" in value &&
    typeof value.isSymbolicLink === "function"
  );
}
/** A declaration's own name, when it is an identifier or a string literal. */
function ownName(node: ts.Node): string | undefined {
  if (!("name" in node)) return undefined;
  const name = node.name;
  return isNode(name) && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined;
}
/**
 * A node: in a census module (named with the sha256 of its text) by kind and position; in the SDK by kind and declaration
 * names; anywhere else (src) by declaration names only, so a src declaration's shape is no part of a digest.
 */
function nodeId(node: ts.Node): string {
  const source = node.getSourceFile();
  const census = VIRTUAL_PATHS.has(source.fileName);
  const where = census ? `${fileLabel(source.fileName)}#${sha16(source.text)}` : fileLabel(source.fileName);
  if (node === source) return where;
  if (census) {
    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
    return `${where}:${ts.SyntaxKind[node.kind]}@${line + 1}:${character + 1}`;
  }
  const names: string[] = [];
  for (let cursor: ts.Node = node; !ts.isSourceFile(cursor); cursor = cursor.parent) {
    const name = ownName(cursor);
    if (name !== undefined) names.unshift(name);
  }
  return where.startsWith("<sdk-dist>/") ? `${where}:${ts.SyntaxKind[node.kind]}:${names.join(".")}` : `${where}:${names.join(".")}`;
}
function symbolId(symbol: ts.Symbol): string {
  return `${symbol.getName()}{${(symbol.declarations ?? []).map(nodeId).join(", ")}}`;
}
/** A value as plain JSON for the trace: nodes, symbols, synthetic entries, maps, the checker and the options by name. */
function plain(value: unknown): unknown {
  if (value === undefined) return "<undefined>";
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "function") return `<function ${value.name}>`;
  if (typeof value !== "object") return String(value);
  if (Array.isArray(value)) return value.map(plain);
  if (value instanceof Map) return [...value].map(([key, entry]) => [plain(key), plain(entry)]);
  if (value === compiledProgram?.checker) return "<checker>";
  if (value === compiledProgram?.options) return "<options>";
  if (value === aliasOptionsMade) return "<options, paths hx-sdk-alias>";
  if (isNode(value)) return nodeId(value);
  if (isSymbol(value)) return symbolId(value);
  if (isEntryLike(value)) return { name: value.name, directory: value.isDirectory(), file: value.isFile(), link: value.isSymbolicLink() };
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, plain(entry)]));
}
function shapeOf(value: unknown): string {
  return JSON.stringify(plain(value));
}
/** A row's read, run with its reader calls traced. */
function run(row: Row): { calls: string[]; reading: unknown } {
  const calls: string[] = [];
  trace = calls;
  try {
    return { calls, reading: row.read() };
  } finally {
    trace = undefined;
  }
}

let aliasOptionsMade: ts.CompilerOptions | undefined;
/** The program's options with one paths alias (hx-sdk-alias, to the SDK's dist index), for ID-RESOLVE-OPTIONS. */
function aliasOptions(): ts.CompilerOptions {
  aliasOptionsMade ??= { ...compiled().options, paths: { "hx-sdk-alias": [join(SDK_PACKAGE_DIR, "dist", "index.d.ts")] } };
  return aliasOptionsMade;
}

function file(name: string): ts.SourceFile {
  const source = compiled().program.getSourceFile(virtualPath(name));
  if (source === undefined) throw new Error(`no virtual module ${name}`);
  return source;
}
function label(name: string): string {
  return repoPath(virtualPath(name));
}
function first<T extends ts.Node>(source: ts.SourceFile, test: (node: ts.Node) => node is T): T {
  let found: T | undefined;
  const visit = (node: ts.Node): void => {
    if (found === undefined && test(node)) found = node;
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (found === undefined) throw new Error(`no matching node in ${source.fileName}`);
  return found;
}
function declarationsOf(symbol: ts.Symbol | undefined): string[] {
  return sdkDeclarations(symbol, compiled().checker).map(entry => `${entry.file}:${ts.SyntaxKind[entry.declaration.kind]}`);
}
/** The SDK declarations of the member a property access names (MB-DECLARATIONS). */
function memberDeclarations(name: string, owner: string, member: string): string[] {
  const access = first(file(name), (node): node is ts.PropertyAccessExpression => ts.isPropertyAccessExpression(node) && node.expression.getText() === owner && node.name.text === member);
  return declarationsOf(compiled().checker.getSymbolAtLocation(access.name));
}
/** The SDK declarations of the member a property access names, each with its owner's and its own name (MB-DECLARATIONS). */
function qualifiedDeclarations(name: string, owner: string, member: string): { reader: string[]; checker: string[] } {
  const { checker } = compiled();
  const access = first(file(name), (node): node is ts.PropertyAccessExpression => ts.isPropertyAccessExpression(node) && node.expression.getText() === owner && node.name.text === member);
  const symbol = checker.getSymbolAtLocation(access.name);
  const qualified = (declaration: ts.Declaration): string => `${ts.SyntaxKind[declaration.kind]}:${ownName(declaration.parent) ?? ""}.${ownName(declaration) ?? ""}`;
  return {
    reader: sdkDeclarations(symbol, checker).map(entry => `${entry.file}:${qualified(entry.declaration)}`),
    // The checker's own order, read here without the helper: the symbol's declarations below the SDK's dist directory.
    checker: (symbol?.declarations ?? []).filter(declaration => declaration.getSourceFile().fileName.split(sep).join("/").includes(SDK_DIST)).map(declaration => qualified(declaration)),
  };
}
/** An object binding element's key and the SDK declarations of the property it reads, by its local name (MB-KEY-*). */
function bindingReading(name: string, local: string): { key: string | null; declarations: string[] } {
  const { checker } = compiled();
  const element = first(file(name), (node): node is ts.BindingElement => ts.isBindingElement(node) && ts.isIdentifier(node.name) && node.name.text === local);
  const key = bindingKey(element, checker);
  const property = key === undefined || !ts.isObjectBindingPattern(element.parent) ? undefined : checker.getTypeAtLocation(element.parent).getProperty(key);
  return { key: nullable(key), declarations: declarationsOf(property) };
}
/** A module's destructuring-assignment pattern members, each name with its property's SDK declarations (MB-PATTERN). */
function patternReading(name: string): string[] {
  return assignmentPatternMembers(file(name), compiled().checker).map(member => `${member.name ?? "<unnamed>"}|${declarationsOf(member.symbol).join(",")}`);
}
const PROVIDER = join(REPO, "src", "workbench", "providers", "hyperunix.ts");
/** A module's exports of the given names, as the registration reader's targets. */
function targetsOf(module: ts.SourceFile, names: readonly string[]): Map<ts.Symbol, string> {
  const { checker } = compiled();
  const symbol = checker.getSymbolAtLocation(module);
  const exports = symbol === undefined ? [] : checker.getExportsOfModule(symbol);
  return new Map(exports.filter(entry => names.includes(entry.name)).map(entry => [entry, entry.name]));
}
/** The provider's two registration exports (by name: a register* export added to the provider later changes no row). */
const PROVIDER_TARGETS = ["registerHyperUnixFind", "registerNativeHyperUnixFind"] as const;
function providerTargets(): Map<ts.Symbol, string> {
  const provider = compiled().program.getSourceFile(PROVIDER);
  if (provider === undefined) throw new Error("the provider module is not in the program");
  const targets = targetsOf(provider, PROVIDER_TARGETS);
  if (targets.size !== PROVIDER_TARGETS.length) throw new Error(`the provider no longer exports ${PROVIDER_TARGETS.join(" and ")}`);
  return targets;
}
/** The registration references of the named virtual modules, over the provider's registration exports (RG). */
function references(...names: string[]): string[] {
  return registrationReferences(
    names.map(name => ({ label: label(name), file: file(name) })),
    compiled().checker,
    providerTargets(),
  );
}
function envReads(name: string): string[] {
  return environmentReads(file(name), compiled().checker);
}
function inCensus(fileName: string): boolean {
  return fileName.startsWith(`${CENSUS_DIR.split(sep).join("/")}/`);
}
function closureOf(name: string): string[] {
  return importClosure(file(name), compiled().checker, inCensus).map(source => repoPath(source.fileName));
}

// ---- the falsifiers: one row per bracketed falsifier, by claim ----

interface Row {
  readonly id: string;
  readonly read: () => unknown;
  readonly expected: () => unknown;
}
const L = (name: string): string => label(name);
/** A row's digest: sha256/16 of the JSON of its reader calls and its reading, the SDK, scratch and repo roots (spelled and real) normalized. */
function digestOf(calls: readonly string[], reading: unknown): string {
  let text = JSON.stringify({ calls, reading }) ?? "undefined";
  for (const [root, name] of [
    [realpathSync(SDK_PACKAGE_DIR), "<sdk>"],
    [SDK_PACKAGE_DIR, "<sdk>"],
    [realpathSync(scratch), "<scratch>"],
    [scratch, "<scratch>"],
    [realpathSync(REPO), "<repo>"],
    [REPO, "<repo>"],
  ] as const) {
    text = text.split(root.split(sep).join("/")).join(name);
  }
  return sha16(text);
}
const FALSIFIERS: Readonly<Record<string, readonly Row[]>> = {
  "EN-DIRECTORY": [{ id: "EN-WALK-TREE", read: () => walk("en-tree"), expected: () => ["other/y.ts|module", "other|directory", "sub/deeper/z.ts|module", "sub/deeper|directory", "sub|directory", "top.ts|module"] }],
  "EN-MODULE": [
    {
      id: "EN-WALK-MODULES",
      read: () => walk("en-modules"),
      expected: () => ["a.ts|module", "b.tsx|module", "c.mts|module", "d.cts|module", "e.js|module", "f.jsx|module", "g.mjs|module", "h.cjs|module"],
    },
  ],
  "EN-JSON": [
    { id: "L3-C4-JSON-CMD-ENTRY", read: () => walk("en-json-cmd"), expected: () => ["hx-launch.json|json"] },
    { id: "G16-C5-DOTFILE-JSON-ENTRY", read: () => walk("en-json-dot"), expected: () => [".hx-launch.json|json"] },
  ],
  "EN-FILE": [{ id: "EN-WALK-FILES", read: () => walk("en-files"), expected: () => ["README|file", "hxjson|file", "launch.json.bak|file", "map.ts.map|file", "notes.md|file", "upper.JSON|file", "upper.TS|file"] }],
  "EN-LINK": [
    { id: "L3-C1-SYMLINK-ENTRY", read: () => walk("en-link-file"), expected: () => ["hx-mutation-link.mjs|link"] },
    { id: "L3-C1-DIRLINK-CTRL-ENTRY", read: () => walk("en-link-dir"), expected: () => ["hxsdk|link"] },
    { id: "EN-WALK-DANGLING", read: () => walk("en-dangling"), expected: () => ["gone.ts|link"] },
    { id: "EN-KIND-LINK-FIRST", read: () => entryKind(synthetic("hxsdk", { directory: true, link: true })), expected: () => "link" },
  ],
  "EN-TARGET": [
    { id: "EN-TARGET-REAL", read: () => entriesBelow(at("en-link-file")).map(entry => entry.target), expected: () => [realpathSync(SDK_MUTATION_MODULE).split(sep).join("/")] },
    { id: "EN-TARGET-DANGLING", read: () => entriesBelow(at("en-dangling")).map(entry => entry.target), expected: () => [DANGLING] },
    {
      id: "EN-TARGET-CHAIN",
      read: () =>
        entriesBelow(at("en-link-chain"))
          .filter(entry => entry.kind === "link")
          .map(entry => `${entry.path}|${entry.target}`)
          .sort(),
      expected: () => ["inner.mjs", "nested/deep.mjs", "outer.mjs"].map(name => `${name}|${realpathSync(SDK_MUTATION_MODULE).split(sep).join("/")}`),
    },
  ],
  "EN-OTHER": [
    {
      id: "EN-KIND-OTHER",
      read: () => [entryKind(synthetic("fifo", {})), entryKind(synthetic("hx.sock", {})), entryKind(synthetic("hx.json", {}))],
      expected: () => ["other", "other", "other"],
    },
  ],
  "ST-LITERAL": [
    { id: "ST-LITERAL-STRING", read: () => entryStrings("a.ts", 'export const a = "hx";\n'), expected: () => ["hx"] },
    { id: "ST-LITERAL-NOSUB", read: () => entryStrings("a.ts", "export const a = `hx mutation apply`;\n"), expected: () => ["hx mutation apply"] },
    {
      id: "G16-C4-ESCAPED-STRINGS",
      read: () =>
        entryStrings(
          "hx-escaped.ts",
          "/** gate plant G16-C4-ESCAPED (gate-prep-16): hx spelled by a hex escape in a string literal. */\n" +
            'import { execFile } from "node:child_process";\n' +
            'export const applyEscaped = (plan: string) => execFile("h\\x78", ["mutation", "apply", plan]);\n',
        ),
      expected: () => ["node:child_process", "hx", "mutation", "apply"],
    },
    { id: "ST-LITERAL-NOSUB-ESCAPED", read: () => entryStrings("a.ts", "export const a = `h\\x78 mutation apply`;\n"), expected: () => ["hx mutation apply"] },
    { id: "ST-LITERAL-TYPE-AND-ATTRIBUTE", read: () => entryStrings("a.tsx", 'export type Command = "hx";\nexport const a = <A b="mutation">text</A>;\n'), expected: () => ["hx", "mutation"] },
  ],
  "ST-TEMPLATE": [
    { id: "ST-TEMPLATE-HEAD", read: () => entryStrings("a.ts", `export const f = (x: string) => \`hx \${x}\`;\n`), expected: () => ["hx ", ""] },
    {
      id: "L3-C4-TMPL-MIDDLE-STRINGS",
      read: () =>
        entryStrings(
          "hyperunix.ts",
          `\n/** gate plant L3-C4-TMPL-MIDDLE (gate-prep-17): the bare command as a template middle in the tracked provider module. */\nfunction hxCommandLine(dir: string, plan: string): string { return \`cd \${dir} && hx mutation apply \${plan} --json\`; }\nvoid hxCommandLine;\n`,
        ),
      expected: () => ["cd ", " && hx mutation apply ", " --json"],
    },
    { id: "ST-TEMPLATE-TAIL", read: () => entryStrings("a.ts", `export const f = (x: string) => \`\${x} hx\`;\n`), expected: () => ["", " hx"] },
    {
      id: "ST-TEMPLATE-ESCAPED",
      read: () => entryStrings("a.ts", `export const f = (x: string, y: string) => \`h\\x78 \${x} h\\x78 \${y} h\\x78\`;\n`),
      expected: () => ["hx ", " hx ", " hx"],
    },
  ],
  "ST-KIND-TS": [
    { id: "ST-KIND-ASSERTION", read: () => ["a.ts", "a.mts", "a.cts"].map(name => entryStrings(name, 'export const a = <string>"hx";\n')), expected: () => [["hx"], ["hx"], ["hx"]] },
  ],
  "ST-KIND-JSX": [
    {
      id: "ST-KIND-JSX-TEXT",
      read: () => ["a.tsx", "a.jsx", "a.js", "a.mjs", "a.cjs"].map(name => entryStrings(name, "export const a = <A>text 'hx' more</A>;\n")),
      expected: () => [[], [], [], [], []],
    },
  ],
  "ST-JSON": [
    { id: "L3-C4-JSON-CMD-STRINGS", read: () => entryStrings("hx-launch.json", JSON_LAUNCH), expected: () => ["command", "hx", "args", "mutation", "apply"] },
    { id: "ST-JSON-NESTED", read: () => entryStrings("x.json", '{ "a": { "b": [["x", { "c": "hx" }]] } }'), expected: () => ["a", "b", "x", "c", "hx"] },
    { id: "ST-JSON-KEY", read: () => entryStrings("x.json", '{ "hx": true, "n": 1, "z": null }'), expected: () => ["hx", "n", "z"] },
    { id: "ST-JSON-ESCAPE", read: () => entryStrings("x.json", '{ "command": "h\\u0078" }'), expected: () => ["command", "hx"] },
    { id: "ST-JSON-TOP", read: () => [entryStrings("x.json", '"hx"'), entryStrings("x.json", '["hx", ["mutation"]]')], expected: () => [["hx"], ["hx", "mutation"]] },
  ],
  "ST-JSON-UNPARSED": [{ id: "ST-JSON-INVALID", read: () => nullable(entryStrings("x.json", '{ "command": hx }')), expected: () => null }],
  "ST-UNREAD": [
    {
      id: "ST-OTHER-NAMES",
      read: () => ["README", "notes.md", "map.ts.map", "upper.TS", "upper.JSON", "launch.json.bak", "hxjson"].map(name => nullable(entryStrings(name, '"hx"'))),
      expected: () => [null, null, null, null, null, null, null],
    },
  ],
  "ST-AT": [
    { id: "ST-AT-FILE", read: () => stringsAt(at("st-at", "plain.ts")), expected: () => ["hx"] },
    { id: "ST-AT-LINKED-JSON", read: () => stringsAt(at("st-at", "linked.json")), expected: () => ["command", "hx"] },
    { id: "ST-AT-UNREAD", read: () => ["adir", "dir-link", "gone.json"].map(name => nullable(stringsAt(at("st-at", name)))), expected: () => [null, null, null] },
  ],
  "ID-REAL": [
    { id: "L3-C1-SYMLINK-IDENTITY", read: () => isSdkFile(at("id-link", "src", "workbench", "hx-mutation-link.mjs"), sdkReal()), expected: () => true },
    { id: "L3-C1-DIRLINK-CTRL-IDENTITY", read: () => isSdkFile(at("id-dirlink", "src", "workbench", "hxsdk", "dist", "protocol", "mutation.js"), sdkReal()), expected: () => true },
    { id: "ID-REAL-BELOW", read: () => isSdkFile(at("id-pkg", "real", "dist", "x.js"), pkgReal()), expected: () => true },
    { id: "ID-REAL-LINKED", read: () => isSdkFile(at("id-pkg-link", "dist", "x.js"), pkgReal()), expected: () => true },
    { id: "ID-REAL-SIBLING", read: () => isSdkFile(at("id-pkg", "real-sibling", "x.js"), pkgReal()), expected: () => false },
    { id: "ID-REAL-OUTSIDE-DIST", read: () => isSdkFile(at("id-pkg", "real", "root.js"), pkgReal()), expected: () => true },
    { id: "ID-REAL-PACKAGE-ITSELF", read: () => isSdkFile(at("id-pkg", "real"), pkgReal()), expected: () => false },
  ],
  "ID-MANIFEST": [
    { id: "ID-MANIFEST-COPY", read: () => isSdkFile(at("id-copy", "dist", "x.js"), sdkReal()), expected: () => true },
    { id: "ID-MANIFEST-LINKED", read: () => isSdkFile(at("id-copy-link", "x.js"), sdkReal()), expected: () => true },
    {
      id: "ID-MANIFEST-NAMELESS",
      read: () => [packageNameOf(at("id-pkg", "real", "dist", "x.js")), packageNameOf(at("id-copy", "dist", "x.js")), packageNameOf(at("id-numeric", "dist", "x.js"))],
      expected: () => [null, SDK, null],
    },
    { id: "ID-MANIFEST-NONE", read: () => packageNameOf(join(sep, "wb-ts6.3-no-manifest", "x.js")), expected: () => null },
    {
      id: "ID-MANIFEST-OTHER-NAME",
      read: () => ({ name: packageNameOf(at("id-other", "dist", "x.js")), sdk: isSdkFile(at("id-other", "dist", "x.js"), sdkReal()) }),
      expected: () => ({ name: `${SDK}-tools`, sdk: false }),
    },
  ],
  "ID-DANGLING": [{ id: "ID-DANGLING-INSIDE", read: () => isSdkFile(at("id-pkg", "real", "dist", "gone.js"), pkgReal()), expected: () => false }],
  "ID-RESOLVE": [
    {
      id: "L3-C1-SYMLINK-RESOLVE",
      read: () => resolvesIntoSdk("./hx-mutation-link.mjs", at("id-link", "src", "workbench", "hx-receipt-link.ts"), compiled().options, sdkReal()),
      expected: () => true,
    },
    { id: "ID-RESOLVE-BARE", read: () => resolvesIntoSdk(SDK, join(REPO, "src", "index.ts"), compiled().options, sdkReal()), expected: () => true },
    {
      id: "ID-RESOLVE-PLAIN",
      read: () => ["./hx-plain.mjs", "./hx-missing.mjs"].map(specifier => resolvesIntoSdk(specifier, at("id-link", "src", "workbench", "hx-receipt-link.ts"), compiled().options, sdkReal())),
      expected: () => [false, false],
    },
    {
      id: "ID-RESOLVE-OPTIONS",
      read: () => [aliasOptions(), compiled().options].map(options => resolvesIntoSdk("hx-sdk-alias", join(REPO, "src", "index.ts"), options, sdkReal())),
      expected: () => [true, false],
    },
  ],
  "MB-DECLARATIONS": [
    { id: "G16-C2-INTERSECTION-LOCAL-FIRST", read: () => memberDeclarations("census/mb-local-first.ts", "facet", "mutations"), expected: () => ["client.d.ts:GetAccessor"] },
    { id: "G16-C2-INTERSECTION-SDK-FIRST", read: () => memberDeclarations("census/mb-sdk-first.ts", "facet", "mutations"), expected: () => ["client.d.ts:GetAccessor"] },
    {
      id: "G16-C2-INTERSECTION-DESTRUCTURE",
      read: () => bindingReading("census/mb-destructure.ts", "facetMutations"),
      expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }),
    },
    { id: "MB-DECLARATIONS-LOCAL", read: () => [memberDeclarations("census/mb-local.ts", "local", "mutations"), declarationsOf(undefined)], expected: () => [[], []] },
    {
      id: "MB-DECLARATIONS-TWO-SDK",
      read: () => qualifiedDeclarations("census/mb-two-sdk.ts", "both", "mutations"),
      expected: () => ({
        reader: ["client.d.ts:GetAccessor:HyperUnix.mutations", "client.d.ts:GetAccessor:Workspace.mutations"],
        checker: ["GetAccessor:HyperUnix.mutations", "GetAccessor:Workspace.mutations"],
      }),
    },
    {
      id: "MB-DECLARATIONS-TWO-SDK-REVERSED",
      read: () => qualifiedDeclarations("census/mb-two-sdk-reversed.ts", "both", "mutations"),
      expected: () => ({
        reader: ["client.d.ts:GetAccessor:Workspace.mutations", "client.d.ts:GetAccessor:HyperUnix.mutations"],
        checker: ["GetAccessor:Workspace.mutations", "GetAccessor:HyperUnix.mutations"],
      }),
    },
    { id: "MB-DECLARATIONS-NESTED-PATH", read: () => memberDeclarations("census/mb-nested-path.ts", "frame", "seq"), expected: () => ["protocol/query.d.ts:PropertySignature"] },
  ],
  "MB-ALIAS": [
    {
      id: "MB-ALIAS-IMPORT",
      read: () => {
        const access = first(file("census/mb-alias.ts"), (node): node is ts.PropertyAccessExpression => ts.isPropertyAccessExpression(node) && node.name.text === "open");
        return declarationsOf(compiled().checker.getSymbolAtLocation(access.expression));
      },
      expected: () => ["client.d.ts:ClassDeclaration"],
    },
  ],
  "MB-KEY-NAME": [
    { id: "MB-KEY-IDENTIFIER", read: () => bindingReading("census/mb-key-identifier.ts", "m"), expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }) },
    { id: "MB-KEY-STRING", read: () => bindingReading("census/mb-key-string.ts", "m"), expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }) },
    { id: "MB-KEY-SHORTHAND", read: () => bindingReading("census/mb-key-shorthand.ts", "mutations"), expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }) },
  ],
  "MB-KEY-NONE": [
    { id: "MB-KEY-REST", read: () => bindingReading("census/mb-key-rest.ts", "rest"), expected: () => ({ key: null, declarations: [] }) },
    { id: "MB-KEY-ARRAY", read: () => bindingReading("census/mb-key-array.ts", "first"), expected: () => ({ key: null, declarations: [] }) },
  ],
  "MB-KEY-COMPUTED": [
    {
      id: "L3-C2-COMPUTED-DESTRUCTURE",
      read: () => bindingReading("census/mb-key-computed.ts", "mutationNamespace"),
      expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }),
    },
    {
      id: "L3-C2-CONSTKEY-DESTRUCTURE",
      read: () => bindingReading("census/mb-key-constkey.ts", "mutationNamespace"),
      expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }),
    },
    { id: "MB-KEY-TEMPLATE", read: () => bindingReading("census/mb-key-template.ts", "m"), expected: () => ({ key: "mutations", declarations: ["client.d.ts:GetAccessor"] }) },
  ],
  "MB-PATTERN": [
    { id: "L3-C2-ASSIGN-DESTRUCTURE", read: () => patternReading("census/mb-assign.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-RENAMED", read: () => patternReading("census/mb-pattern-renamed.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-STRING", read: () => patternReading("census/mb-pattern-string.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-COMPUTED", read: () => patternReading("census/mb-pattern-computed.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-DEFAULTED", read: () => patternReading("census/mb-pattern-defaulted.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-TWO", read: () => patternReading("census/mb-pattern-two.ts"), expected: () => ["client|client.d.ts:PropertyDeclaration", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PATTERN-REST", read: () => patternReading("census/mb-pattern-rest.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
  ],
  "MB-PATTERN-PLACE": [
    { id: "MB-PLACE-FOR-OF", read: () => patternReading("census/mb-place-for-of.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-NESTED", read: () => patternReading("census/mb-place-nested.ts"), expected: () => ["ws|", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-ARRAY", read: () => patternReading("census/mb-place-array.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-DEFAULT-TARGET", read: () => patternReading("census/mb-place-default-target.ts"), expected: () => ["ws|", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-NOT-PATTERN", read: () => patternReading("census/mb-place-not-pattern.ts"), expected: () => [] },
    { id: "MB-PLACE-FOR-OF-ARRAY", read: () => patternReading("census/mb-place-for-of-array.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-NESTED-ARRAY", read: () => patternReading("census/mb-place-nested-array.ts"), expected: () => ["ws|", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-RHS-ARRAY", read: () => patternReading("census/mb-place-rhs-array.ts"), expected: () => [] },
  ],
  "RG-BINDING": [
    {
      id: "G16-B2-DIRECT-CALL-CTRL",
      read: () => references("workbench/g16-direct-call-ctrl.ts"),
      expected: () => [`${L("workbench/g16-direct-call-ctrl.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/g16-direct-call-ctrl.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-RENAMED-IMPORT",
      read: () => references("workbench/rg-renamed-import.ts"),
      expected: () => [
        `${L("workbench/rg-renamed-import.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-renamed-import.ts")}|specifier|registerHyperUnixFind|attach`,
        `${L("workbench/rg-renamed-import.ts")}|call|registerHyperUnixFind|attach`,
      ],
    },
    {
      id: "RG-NAMESPACE-MEMBER",
      read: () => references("workbench/rg-namespace-member.ts"),
      expected: () => [`${L("workbench/rg-namespace-member.ts")}|call|registerHyperUnixFind|provider.registerHyperUnixFind`],
    },
  ],
  "RG-ELEMENT-KEY": [
    {
      id: "RG-ELEMENT-CALL",
      read: () => references("workbench/rg-element-call.ts"),
      expected: () => [`${L("workbench/rg-element-call.ts")}|call|registerHyperUnixFind|provider["registerHyperUnixFind"]`],
    },
    {
      id: "RG-ELEMENT-TEMPLATE",
      read: () => references("workbench/rg-element-template.ts"),
      expected: () => [`${L("workbench/rg-element-template.ts")}|call|registerHyperUnixFind|provider[\`registerHyperUnixFind\`]`],
    },
    {
      id: "RG-ELEMENT-CONST",
      read: () => references("workbench/rg-element-const.ts"),
      expected: () => [`${L("workbench/rg-element-const.ts")}|call|registerHyperUnixFind|provider[KEY]`],
    },
  ],
  "RG-CALL": [
    {
      id: "G16-B2-DIRECT-CALL-INPLACE-CTRL",
      read: () => references("hosts/g16-direct-call-inplace-ctrl.ts"),
      expected: () => [
        `${L("hosts/g16-direct-call-inplace-ctrl.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("hosts/g16-direct-call-inplace-ctrl.ts")}|specifier|registerNativeHyperUnixFind|registerNativeHyperUnixFind`,
        `${L("hosts/g16-direct-call-inplace-ctrl.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("hosts/g16-direct-call-inplace-ctrl.ts")}|call|registerNativeHyperUnixFind|registerNativeHyperUnixFind`,
      ],
    },
    {
      id: "RG-PARENTHESIZED-CALL",
      read: () => references("workbench/rg-parenthesized-call.ts"),
      expected: () => [`${L("workbench/rg-parenthesized-call.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-parenthesized-call.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-ASSERTED-CALL",
      read: () => references("workbench/rg-asserted-call.ts"),
      expected: () => [
        `${L("workbench/rg-asserted-call.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-asserted-call.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-asserted-call.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-asserted-call.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-asserted-call.ts")}|call|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    {
      id: "RG-WRAPPED-MEMBER-CALL",
      read: () => references("workbench/rg-wrapped-member-call.ts"),
      expected: () => [
        `${L("workbench/rg-wrapped-member-call.ts")}|call|registerHyperUnixFind|provider.registerHyperUnixFind`,
        `${L("workbench/rg-wrapped-member-call.ts")}|call|registerHyperUnixFind|provider["registerHyperUnixFind"]`,
      ],
    },
  ],
  "RG-CALL-METHOD": [
    {
      id: "G16-B2-CALL-METHOD",
      read: () => references("workbench/g16-call-method.ts"),
      expected: () => [`${L("workbench/g16-call-method.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/g16-call-method.ts")}|call-method|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "G16-B2-CALL-METHOD-INPLACE",
      read: () => references("hosts/g16-call-method-inplace.ts"),
      expected: () => [
        `${L("hosts/g16-call-method-inplace.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("hosts/g16-call-method-inplace.ts")}|specifier|registerNativeHyperUnixFind|registerNativeHyperUnixFind`,
        `${L("hosts/g16-call-method-inplace.ts")}|call-method|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("hosts/g16-call-method-inplace.ts")}|call|registerNativeHyperUnixFind|registerNativeHyperUnixFind`,
      ],
    },
    {
      id: "RG-APPLY",
      read: () => references("workbench/rg-apply.ts"),
      expected: () => [`${L("workbench/rg-apply.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-apply.ts")}|call-method|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-METHOD-WRAPPED",
      read: () => references("workbench/rg-method-wrapped.ts"),
      expected: () => [
        `${L("workbench/rg-method-wrapped.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-method-wrapped.ts")}|call-method|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-method-wrapped.ts")}|call-method|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    {
      id: "RG-METHOD-RECEIVER",
      read: () => references("workbench/rg-method-receiver.ts"),
      expected: () => [
        `${L("workbench/rg-method-receiver.ts")}|call-method|registerHyperUnixFind|provider.registerHyperUnixFind`,
        `${L("workbench/rg-method-receiver.ts")}|call-method|registerHyperUnixFind|provider["registerHyperUnixFind"]`,
      ],
    },
  ],
  "RG-ALIAS": [
    {
      id: "G16-B2-ALIAS-CALL",
      read: () => references("workbench/g16-alias-call.ts"),
      expected: () => [
        `${L("workbench/g16-alias-call.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/g16-alias-call.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/g16-alias-call.ts")}|call|registerHyperUnixFind|attachReader`,
      ],
    },
    {
      id: "G16-B2-ALIAS-CALL-BLANK",
      read: () => references("workbench/g16-alias-call-blank.ts"),
      expected: () => [
        `${L("workbench/g16-alias-call-blank.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/g16-alias-call-blank.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/g16-alias-call-blank.ts")}|call|registerHyperUnixFind|attachReader`,
      ],
    },
    {
      id: "RG-ALIAS-CHAIN",
      read: () => references("workbench/rg-alias-chain.ts"),
      expected: () => [
        `${L("workbench/rg-alias-chain.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-chain.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-chain.ts")}|alias|registerHyperUnixFind|first`,
        `${L("workbench/rg-alias-chain.ts")}|call|registerHyperUnixFind|second`,
      ],
    },
    {
      id: "RG-ALIAS-EXPORTED",
      read: () => references("workbench/rg-alias-importer.ts", "workbench/rg-alias-exported.ts"),
      expected: () => [
        `${L("workbench/rg-alias-importer.ts")}|specifier|registerHyperUnixFind|attach`,
        `${L("workbench/rg-alias-importer.ts")}|alias|registerHyperUnixFind|attach`,
        `${L("workbench/rg-alias-importer.ts")}|call|registerHyperUnixFind|local`,
        `${L("workbench/rg-alias-exported.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-exported.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    {
      id: "RG-ALIAS-WRAPPED",
      read: () => references("workbench/rg-alias-wrapped.ts"),
      expected: () => [
        `${L("workbench/rg-alias-wrapped.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        ...Array.from({ length: 6 }, () => `${L("workbench/rg-alias-wrapped.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`),
        ...["a1", "a2", "a3", "a4", "a5", "a6"].map(name => `${L("workbench/rg-alias-wrapped.ts")}|call|registerHyperUnixFind|${name}`),
      ],
    },
    {
      id: "RG-OWN-DECLARATION",
      read: () => {
        const own = file("census/rg-own-declaration.ts");
        return registrationReferences([{ label: "own", file: own }], compiled().checker, targetsOf(own, ["registerCensusOwn"]));
      },
      expected: () => ["own|call|registerCensusOwn|registerCensusOwn"],
    },
    {
      id: "RG-ALIAS-LOCAL",
      read: () => references("workbench/rg-alias-local.ts"),
      expected: () => [
        `${L("workbench/rg-alias-local.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-local.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-local.ts")}|call|registerHyperUnixFind|attach`,
      ],
    },
    {
      id: "RG-ALIAS-MEMBER",
      read: () => references("workbench/rg-alias-member.ts"),
      expected: () => [`${L("workbench/rg-alias-member.ts")}|alias|registerHyperUnixFind|provider.registerHyperUnixFind`, `${L("workbench/rg-alias-member.ts")}|call|registerHyperUnixFind|attach`],
    },
    {
      id: "RG-ALIAS-ELEMENT",
      read: () => references("workbench/rg-alias-element.ts"),
      expected: () => [`${L("workbench/rg-alias-element.ts")}|alias|registerHyperUnixFind|provider["registerHyperUnixFind"]`, `${L("workbench/rg-alias-element.ts")}|call|registerHyperUnixFind|attach`],
    },
    {
      id: "RG-ALIAS-FORMS",
      read: () => references("workbench/rg-alias-forms.ts"),
      expected: () => [
        `${L("workbench/rg-alias-forms.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-forms.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-alias-forms.ts")}|call-method|registerHyperUnixFind|attach`,
        `${L("workbench/rg-alias-forms.ts")}|reference|registerHyperUnixFind|attach`,
      ],
    },
  ],
  "RG-SPECIFIER": [
    { id: "RG-IMPORT-SPECIFIER", read: () => references("workbench/rg-import-specifier.ts"), expected: () => [`${L("workbench/rg-import-specifier.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`] },
    {
      id: "RG-EXPORT-SPECIFIER",
      read: () => references("workbench/rg-export-specifier.ts"),
      expected: () => [`${L("workbench/rg-export-specifier.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-export-specifier.ts")}|specifier|registerHyperUnixFind|attachReader`],
    },
  ],
  "RG-OTHER": [
    {
      id: "RG-LET-ALIAS",
      read: () => references("workbench/rg-let-alias.ts"),
      expected: () => [
        `${L("workbench/rg-let-alias.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-let-alias.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-let-alias.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    {
      id: "RG-ARGUMENT",
      read: () => references("workbench/rg-argument.ts"),
      expected: () => [`${L("workbench/rg-argument.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-argument.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-BIND",
      read: () => references("workbench/rg-bind.ts"),
      expected: () => [`${L("workbench/rg-bind.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-bind.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-METHOD-UNCALLED",
      read: () => references("workbench/rg-method-uncalled.ts"),
      expected: () => [
        `${L("workbench/rg-method-uncalled.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-method-uncalled.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-method-uncalled.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    { id: "RG-DESTRUCTURED", read: () => references("workbench/rg-destructured.ts"), expected: () => [`${L("workbench/rg-destructured.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`] },
    {
      id: "RG-PROPERTY-VALUE",
      read: () => references("workbench/rg-property-value.ts"),
      expected: () => [`${L("workbench/rg-property-value.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-property-value.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-SHORTHAND-VALUE",
      read: () => references("workbench/rg-shorthand-value.ts"),
      expected: () => [
        `${L("workbench/rg-shorthand-value.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-shorthand-value.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
        `${L("workbench/rg-shorthand-value.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`,
      ],
    },
    {
      id: "RG-TYPE-QUERY",
      read: () => references("workbench/rg-type-query.ts"),
      expected: () => [`${L("workbench/rg-type-query.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-type-query.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`],
    },
    {
      id: "RG-VAR-ALIAS",
      read: () => references("workbench/rg-var-alias.ts"),
      expected: () => [`${L("workbench/rg-var-alias.ts")}|specifier|registerHyperUnixFind|registerHyperUnixFind`, `${L("workbench/rg-var-alias.ts")}|reference|registerHyperUnixFind|registerHyperUnixFind`],
    },
  ],
  "EV-CLOSURE": [
    { id: "EV-CLOSURE-CHAIN", read: () => closureOf("census/cl-a.ts"), expected: () => ["census/cl-a.ts", "census/cl-b.ts", "census/cl-c.ts", "census/cl-d.ts"].map(L) },
    { id: "EV-CLOSURE-TYPE-ONLY", read: () => closureOf("census/cl-t.ts"), expected: () => ["census/cl-t.ts", "census/cl-u.ts"].map(L) },
    { id: "EV-CLOSURE-FILTER", read: () => closureOf("census/cl-f.ts"), expected: () => ["census/cl-f.ts", "census/cl-g.ts"].map(L) },
    { id: "EV-CLOSURE-EXPORT-FROM", read: () => closureOf("census/cl-export-from.ts"), expected: () => ["census/cl-export-from.ts", "census/cl-type-target.ts", "census/cl-named-target.ts"].map(L) },
    { id: "EV-CLOSURE-ORDER", read: () => closureOf("census/cl-o.ts"), expected: () => ["census/cl-o.ts", "census/cl-o1.ts", "census/cl-o2.ts", "census/cl-o11.ts", "census/cl-o21.ts"].map(L) },
  ],
  "EV-READS": [
    { id: "L3-A-ENV-READS", read: () => envReads("census/ev-refusal.ts"), expected: () => ["7|process.env"] },
    { id: "EV-GLOBAL-THIS", read: () => envReads("census/ev-global-this.ts"), expected: () => ["1|globalThis.process.env"] },
    { id: "EV-ELEMENT", read: () => envReads("census/ev-element.ts"), expected: () => ['1|process["env"]'] },
    { id: "EV-IMPORTED-ENV", read: () => envReads("census/ev-imported-env.ts"), expected: () => ["1|env", "2|env"] },
    { id: "EV-REFLECT", read: () => envReads("census/ev-reflect.ts"), expected: () => ["1|snapshot", '1|Reflect.get(process, "env")'] },
    { id: "EV-DESTRUCTURE-SOURCE", read: () => envReads("census/ev-destructure-source.ts"), expected: () => ["1|process.env"] },
    { id: "EV-LOCAL-PROCESSENV", read: () => envReads("census/ev-local-processenv.ts"), expected: () => [] },
    { id: "EV-LINE-START", read: () => envReads("census/ev-line-start.ts"), expected: () => ["2|process.env"] },
    { id: "EV-NESTED", read: () => envReads("census/ev-nested.ts"), expected: () => ["2|same(process.env)", "2|process.env"] },
    { id: "EV-OTHER-PACKAGE-PROCESSENV", read: () => envReads("census/ev-other-package-processenv.ts"), expected: () => [] },
    { id: "EV-SHORTHAND", read: () => envReads("census/ev-shorthand.ts"), expected: () => ["1|env", "2|env"] },
  ],
};

/** The residuals' quiet rows: each probe reads nothing, and its loud twin (a claimed form of the same reader) reads. */
const QUIET: Readonly<Record<string, readonly Row[]>> = {
  "R-UNNARROWED-KEY": [
    {
      id: "Q-KEY-UNION",
      read: () => ({ probe: ["m1", "m2", "m3", "m4"].map(local => bindingReading("census/q-key-union.ts", local)), twin: bindingReading("census/mb-key-constkey.ts", "mutationNamespace").key }),
      expected: () => ({ probe: Array.from({ length: 4 }, () => ({ key: null, declarations: [] })), twin: "mutations" }),
    },
    {
      id: "Q-PATTERN-STRING-KEY",
      read: () => ({ probe: patternReading("census/q-pattern-string-key.ts"), twin: patternReading("census/mb-pattern-computed.ts") }),
      expected: () => ({ probe: ["<unnamed>|", "<unnamed>|", "<unnamed>|", "<unnamed>|"], twin: ["mutations|client.d.ts:GetAccessor"] }),
    },
  ],
  "R-REST-PATTERN": [
    {
      id: "Q-MB-REST-PATTERN",
      read: () => ({ probe: patternReading("census/q-mb-rest-pattern.ts"), twin: patternReading("census/mb-place-array.ts") }),
      expected: () => ({ probe: [], twin: ["mutations|client.d.ts:GetAccessor"] }),
    },
  ],
  "R-COPIED-SDK": [
    {
      id: "Q-ID-COPY",
      read: () => ({
        probe: [isSdkFile(at("id-plain-copy", "mutation.js"), sdkReal()), isSdkFile(at("id-hard-link", "x.js"), pkgReal())],
        twin: [isSdkFile(at("id-link", "src", "workbench", "hx-mutation-link.mjs"), sdkReal()), isSdkFile(at("id-pkg", "real", "dist", "x.js"), pkgReal())],
      }),
      expected: () => ({ probe: [false, false], twin: [true, true] }),
    },
  ],
  "R-UNNAMED-REFERENCE": [
    {
      id: "Q-RG-COMPUTED",
      read: () => ({ probe: references("workbench/q-rg-computed.ts"), twin: references("workbench/rg-namespace-member.ts").length }),
      expected: () => ({ probe: [], twin: 1 }),
    },
  ],
  "R-UNTYPED-ENV": [
    {
      id: "Q-EV-UNTYPED",
      read: () => ({ probe: envReads("census/q-ev-untyped.ts"), twin: envReads("census/q-ev-target.ts") }),
      expected: () => ({ probe: [], twin: ["1|process.env"] }),
    },
  ],
  "R-RUNTIME-LOAD": [
    {
      id: "Q-EV-DYNAMIC",
      read: () => ({ probe: closureOf("census/q-ev-dynamic-entry.ts"), twin: closureOf("census/q-ev-static-entry.ts") }),
      expected: () => ({ probe: [L("census/q-ev-dynamic-entry.ts")], twin: [L("census/q-ev-static-entry.ts"), L("census/q-ev-target.ts")] }),
    },
  ],
  "R-RELOCATED-SDK": [
    {
      id: "Q-MB-RELOCATED",
      read: () => ({
        probe: [memberDeclarations("census/mb-relocated.ts", "workspace", "mutations"), memberDeclarations("census/mb-relocated-scoped.ts", "workspace", "mutations")],
        twin: memberDeclarations("census/mb-sdk-first.ts", "facet", "mutations"),
      }),
      expected: () => ({ probe: [[], []], twin: ["client.d.ts:GetAccessor"] }),
    },
  ],
  "R-AMBIENT-OTHER": [
    {
      id: "Q-EV-AMBIENT",
      read: () => ({ probe: envReads("census/q-ev-ambient.ts"), twin: envReads("census/ev-global-this.ts").length }),
      expected: () => ({ probe: [], twin: 1 }),
    },
  ],
};

// ---- the tracker export (the requirements' outside anchor) ----

function exportRow(): { description: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null || !("id" in row) || row.id !== BEAD) continue;
    const description = "description" in row && typeof row.description === "string" ? row.description : "";
    const notes = "notes" in row && typeof row.notes === "string" ? row.notes : "";
    return { description, notes };
  }
  return { description: "", notes: "" };
}
/** The description's enumerated items, each line from "- U<n> (" to its end. */
function descriptionItems(description: string): string[] {
  return description.split("\n").filter(line => /^- U\d+ \(/.test(line));
}
/** R-B145's folded members: its ruling paragraph from "U1 - " to " When this bead lands", split before each "U<n> - ". */
function rulingItems(notes: string): string[] {
  const start = notes.indexOf("ORCHESTRATOR RULING R-B145");
  const end = start === -1 ? -1 : notes.indexOf(" When this bead lands", start);
  const members = end === -1 ? "" : notes.slice(start, end);
  const from = members.search(/U1 - /);
  return from === -1 ? [] : members.slice(from).split(/ (?=U\d - )/);
}
/** The helper's header comment as the roster spells it, line for line. */
function headerLines(): string[] {
  return [...HEADER_PROSE, CLAIMS_HEADING, ...CLAIM_LINES.map(line => ` * - ${line}`), " *", RESIDUALS_HEADING, ...RESIDUAL_LINES.map(line => ` * - ${line}`), " */"];
}

const REACHED: string[] = [];
const ORDER: string[] = [];

describe("wb-ts6.3 HX mutation Verified readers census (TS6-R2, rule-19 structural exit of wb-ts6.2)", () => {
  it("the roster's requirements, claims and residuals hold their frozen shape", () => {
    const shape = [...REQUIREMENTS.map(row => `${row.id}:${row.claims.length}`), ...CLAIMS.map(row => `${row.id}:${row.pins.length}`), ...RESIDUALS.map(row => `${row.id}:${row.pins.length}`)];
    expect(shape, "FROZEN pins every requirement, claim and residual").toStrictEqual([...FROZEN]);
    expect(Object.keys(DIGESTS), "DIGESTS pins every row's calls and reading, in roster order").toStrictEqual([...CLAIMS, ...RESIDUALS].flatMap(row => row.pins));
    const digests = Object.values(DIGESTS);
    expect(
      digests.filter((digest, index) => digests.indexOf(digest) !== index),
      "no two rows share a digest",
    ).toStrictEqual([]);
    REACHED.push("frozen");
  });
  ORDER.push("the roster's requirements, claims and residuals hold their frozen shape");

  it("the helper header's claim and residual lines are the roster's, byte for byte and in order", () => {
    const lines = readFileSync(join(REPO, HELPER), "utf8").split("\n");
    const header = headerLines();
    expect(lines.slice(0, header.length), `${HELPER}'s header comment, line for line`).toStrictEqual(header);
    expect(lines.filter(line => line.startsWith(" * CLAIMS ")).length, "the CLAIMS heading appears once in the helper").toBe(1);
    expect(lines.filter(line => line.startsWith(" * RESIDUALS ")).length, "the RESIDUALS heading appears once in the helper").toBe(1);
    expect(lines.filter(line => line.startsWith(" * - ")).length, "no claim or residual line outside the header").toBe(CLAIM_LINES.length + RESIDUAL_LINES.length);
    expect(CLAIMS.filter(row => row.requirement === "").map(row => row.id), "every claim line parses").toStrictEqual([]);
    expect(RESIDUALS.filter(row => row.pins.length === 0).map(row => row.id), "every residual line parses").toStrictEqual([]);
    REACHED.push("header");
  });
  ORDER.push("the helper header's claim and residual lines are the roster's, byte for byte and in order");

  it("every bracketed pin is one registered row of its line, in order, and every row is named by exactly one line", () => {
    expect(
      CLAIMS.map(row => `${row.id}:${row.pins.join(",")}`),
      "each claim's falsifiers are its rows",
    ).toStrictEqual(CLAIMS.map(row => `${row.id}:${(FALSIFIERS[row.id] ?? []).map(entry => entry.id).join(",")}`));
    expect(
      RESIDUALS.map(row => `${row.id}:${row.pins.join(",")}`),
      "each residual's quiet rows are its rows",
    ).toStrictEqual(RESIDUALS.map(row => `${row.id}:${(QUIET[row.id] ?? []).map(entry => entry.id).join(",")}`));
    expect(Object.keys(FALSIFIERS), "every falsifier table is a claim's").toStrictEqual(CLAIMS.map(row => row.id));
    expect(Object.keys(QUIET), "every quiet table is a residual's").toStrictEqual(RESIDUALS.map(row => row.id));
    const pins = [...CLAIMS, ...RESIDUALS].flatMap(row => row.pins);
    expect(
      pins.filter((pin, index) => pins.indexOf(pin) !== index),
      "no pin is named twice",
    ).toStrictEqual([]);
    REACHED.push("pins");
  });
  ORDER.push("every bracketed pin is one registered row of its line, in order, and every row is named by exactly one line");

  it("each requirement quotes the bead's own text exactly, and its claims are exactly the claim lines naming it", () => {
    const { description, notes } = exportRow();
    const quotes = [...descriptionItems(description), ...rulingItems(notes)];
    expect(quotes.length, `${BEAD}'s description items and R-B145's members, read from the tracker export`).toBe(6);
    expect(
      REQUIREMENTS.map(row => row.quote),
      "the requirements quote them exactly and in order",
    ).toStrictEqual(quotes);
    expect(
      REQUIREMENTS.map(row => `${row.id}:${row.claims.join(",")}`),
      "each requirement's claims are the lines naming it, in line order",
    ).toStrictEqual(REQUIREMENTS.map(row => `${row.id}:${CLAIMS.filter(claim => claim.requirement === row.id).map(claim => claim.id).join(",")}`));
    REACHED.push("requirements");
  });
  ORDER.push("each requirement quotes the bead's own text exactly, and its claims are exactly the claim lines naming it");

  for (const claim of CLAIMS) {
    describe(claim.id, () => {
      for (const row of FALSIFIERS[claim.id] ?? []) {
        it(row.id, { timeout: 120_000 }, () => {
          const { calls, reading } = run(row);
          expect(calls.length, `${row.id}'s read calls a reader under judgment`).toBeGreaterThan(0);
          expect(reading, `${claim.id} ${row.id}`).toStrictEqual(row.expected());
          expect(digestOf(calls, reading), `${row.id}'s frozen calls-and-reading digest`).toBe(DIGESTS[row.id]);
          REACHED.push(`${row.id}:${expect.getState().assertionCalls}`);
        });
        ORDER.push(row.id);
      }
    });
  }
  for (const residual of RESIDUALS) {
    describe(residual.id, () => {
      for (const row of QUIET[residual.id] ?? []) {
        it(row.id, { timeout: 120_000 }, () => {
          const { calls, reading } = run(row);
          expect(calls.length, `${row.id}'s read calls a reader under judgment`).toBeGreaterThan(0);
          expect(reading, `${residual.id} ${row.id}`).toStrictEqual(row.expected());
          expect(digestOf(calls, reading), `${row.id}'s frozen calls-and-reading digest`).toBe(DIGESTS[row.id]);
          REACHED.push(`${row.id}:${expect.getState().assertionCalls}`);
        });
        ORDER.push(row.id);
      }
    });
  }

  it("the registered tests and the reached rows are the roster's, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toStrictEqual([...ORDER, task.name]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toStrictEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case is registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toStrictEqual([]);
    expect(REACHED, "every row reached the end of its body, in roster order, having made its three assertions").toStrictEqual([
      "frozen",
      "header",
      "pins",
      "requirements",
      ...[...CLAIMS, ...RESIDUALS].flatMap(row => row.pins).map(pin => `${pin}:3`),
    ]);
  });
});
