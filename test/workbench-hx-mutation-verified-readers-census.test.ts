/**
 * wb-ts6.3 (TS6-R2, program-triage-2026-10-18): the falsifier census of test/helpers/hx-mutation-verified-readers.ts, the
 * full-surface readers that wb-ts6.2's HX mutation 'Verified' census (cut #4 618f99fe, not on trunk) narrowed out of its
 * fail-closed core (orchestrator rulings R-B112 and R-B145; wb-ts6.2 is blocked by this bead).
 * Requirements (the bead's own text in the tracker export, quoted exactly by REQUIREMENTS and held both ways): the
 * description's U1-U4 (refusal #3's C4 entry-point spellings, C1 link loads, C2 computed-key destructures and the row-A member)
 * and R-B145's U1-U2 (refusal #4's C2 declarations[0] reading and B2/Q3 callee-name call reading).
 * Acceptance, as this census reads it: "each plant reds the unmodified census and greens under the cure" - every falsifier
 * below is a plant its claim's reader reads as the claim says (green here); the gate's own plants (refusal #3's L3-* and
 * refusal #4's G16-*, verbatim from the archived plant tools; their contexts are minimal virtual modules, never src edits)
 * are among them, and against the unmodified cut #4 readers each surviving plant read nothing (the seat's red record, not
 * re-run here). "every claim sentence's wording and its reader's coverage agree byte-for-byte with the falsifier roster" -
 * the helper header's claim and residual lines equal CLAIM_LINES and RESIDUAL_LINES byte for byte and in order, every
 * bracketed falsifier is one registered row of its claim (in order), and every row is named by exactly one line.
 * FROZEN SHAPE (standing rule 16): FROZEN pins every requirement, claim and residual as `<id>:<pin count>`, and DIGESTS pins
 * every row's reading (sha256 of its JSON, the repo and scratch roots normalized), so a row's case swapped for another reds its
 * digest; the outside anchors are the helper header (claims, residuals, their pins) and the tracker export (the requirements'
 * quotes and count).
 * The last case reads the vitest task tree: every registered test, in order, in run mode, not inverted, ran before it, and
 * every row reached its assertion.
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
import {
  assignmentPatternMembers,
  bindingKey,
  DANGLING,
  type EntryLike,
  entriesBelow,
  entryKind,
  entryStrings,
  environmentReads,
  importClosure,
  isSdkFile,
  packageNameOf,
  registrationReferences,
  resolvesIntoSdk,
  SDK,
  sdkDeclarations,
  stringsAt,
} from "./helpers/hx-mutation-verified-readers.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-ts6.3";
const HELPER = "test/helpers/hx-mutation-verified-readers.ts";

installScratchLeakGuard();

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

/** The helper header's claim lines, byte for byte and in order (each "<claim> (<requirement>) [<falsifiers>]: <reading>"). */
const CLAIM_LINES: readonly string[] = [
  "EN-DIRECTORY (U1) [EN-WALK-TREE]: entriesBelow lists every entry below a directory, at any depth, as its path relative to that directory (/-separated) with the kind entryKind reads from the entry readdir reports, and descends into every directory entry.",
  "EN-MODULE (U1) [EN-WALK-MODULES]: a regular file whose name ends with a MODULE_EXTENSIONS member (.ts, .tsx, .mts, .cts, .js, .jsx, .mjs, .cjs) reads module.",
  "EN-JSON (U1) [L3-C4-JSON-CMD-ENTRY, G16-C5-DOTFILE-JSON-ENTRY]: a regular file whose name ends with .json in that letter case, a dot-named one included, reads json.",
  "EN-FILE (U1) [EN-WALK-FILES]: a regular file of any other name reads file.",
  "EN-LINK (U2) [L3-C1-SYMLINK-ENTRY, L3-C1-DIRLINK-CTRL-ENTRY, EN-WALK-DANGLING, EN-KIND-LINK-FIRST]: a symbolic link reads link whatever it points to (a file, a directory, nothing), and the walk never descends through one.",
  "EN-TARGET (U2) [EN-TARGET-REAL, EN-TARGET-DANGLING]: a link entry carries its target as realpathSync reads it (every link on the path followed), or <dangling> when that resolves to nothing.",
  "EN-OTHER (U1) [EN-KIND-OTHER]: any other entry (a FIFO, a socket, a device: no link, no directory, no regular file) reads other.",
  "ST-LITERAL (U1) [ST-LITERAL-STRING, ST-LITERAL-NOSUB, G16-C4-ESCAPED-STRINGS]: entryStrings reads a module entry's strings as the cooked text (escapes decoded) of each string literal and no-substitution template it holds.",
  "ST-TEMPLATE (U1) [ST-TEMPLATE-HEAD, L3-C4-TMPL-MIDDLE-STRINGS, ST-TEMPLATE-TAIL]: and as the cooked text of each template's head, middle and tail.",
  "ST-KIND-TS (U1) [ST-KIND-ASSERTION]: a module entry whose name ends with .ts, .mts or .cts parses as TypeScript, so an angle-bracket assertion's operand is read.",
  "ST-KIND-JSX (U1) [ST-KIND-JSX-TEXT]: any other module entry (.tsx, .jsx, .js, .mjs, .cjs) parses with JSX, so JSX text is no string.",
  "ST-JSON (U1) [L3-C4-JSON-CMD-STRINGS, ST-JSON-NESTED, ST-JSON-KEY, ST-JSON-ESCAPE]: a json entry's strings are, from JSON.parse of its text (escapes decoded), every string value and every object key at any depth.",
  "ST-JSON-UNPARSED (U1) [ST-JSON-INVALID]: a json entry whose text JSON.parse refuses reads undefined.",
  "ST-UNREAD (U1) [ST-OTHER-NAMES]: an entry of any other name reads undefined.",
  "ST-AT (U1) [ST-AT-FILE, ST-AT-LINKED-JSON, ST-AT-UNREAD]: stringsAt reads an entry by lstat: a regular file, and a link whose target is a regular file, by the entry's own name and the target's text; a directory, a link to a directory or to nothing, and any other entry read undefined.",
  "ID-REAL (U2) [L3-C1-SYMLINK-IDENTITY, L3-C1-DIRLINK-CTRL-IDENTITY, ID-REAL-BELOW, ID-REAL-LINKED, ID-REAL-SIBLING]: isSdkFile reads a path through every link on it (realpathSync): its real path below the package's real directory (that directory and a /, so a sibling sharing its prefix is not) is the SDK's.",
  "ID-MANIFEST (U2) [ID-MANIFEST-COPY, ID-MANIFEST-LINKED, ID-MANIFEST-NAMELESS, ID-MANIFEST-NONE]: so is a real path whose nearest package.json, read upward from that real path, names @hyperunix/sdk (a nearest manifest naming none, or no manifest, reads null).",
  "ID-DANGLING (U2) [ID-DANGLING-INSIDE]: a path that resolves to nothing is no SDK file.",
  "ID-RESOLVE (U2) [L3-C1-SYMLINK-RESOLVE, ID-RESOLVE-BARE, ID-RESOLVE-PLAIN]: resolvesIntoSdk resolves a specifier by ts.resolveModuleName from the importing file under the given options, and the resolved file is the SDK's as isSdkFile reads it.",
  "MB-DECLARATIONS (B145-U1) [G16-C2-INTERSECTION-LOCAL-FIRST, G16-C2-INTERSECTION-SDK-FIRST, G16-C2-INTERSECTION-DESTRUCTURE, MB-DECLARATIONS-LOCAL]: sdkDeclarations reads every declaration of a symbol, in the checker's order, that lies below the SDK's dist directory, as its path there - a property of an intersection whose local constituent comes first included.",
  "MB-ALIAS (B145-U1) [MB-ALIAS-IMPORT]: an alias symbol (an import binding) is read through checker.getAliasedSymbol.",
  "MB-KEY-NAME (U3) [MB-KEY-IDENTIFIER, MB-KEY-STRING, MB-KEY-SHORTHAND]: bindingKey reads an object binding element's key as its property name when that is an identifier or a string literal, and as its own name when it has none (shorthand).",
  "MB-KEY-NONE (U3) [MB-KEY-REST, MB-KEY-ARRAY]: a rest element and an array binding element read undefined.",
  "MB-KEY-COMPUTED (U3) [L3-C2-COMPUTED-DESTRUCTURE, L3-C2-CONSTKEY-DESTRUCTURE, MB-KEY-TEMPLATE]: a computed key whose expression the checker types as one string literal (a quoted literal in brackets, a const bound to one, a no-substitution template) reads that literal.",
  "MB-PATTERN (U3) [L3-C2-ASSIGN-DESTRUCTURE, MB-PATTERN-RENAMED, MB-PATTERN-STRING, MB-PATTERN-COMPUTED, MB-PATTERN-DEFAULTED]: assignmentPatternMembers reads every property of an object destructuring-assignment pattern - a shorthand (defaulted or not), an identifier, string-literal or computed key (one string literal) - with its name and the property symbol of the pattern's type (checker.getTypeOfAssignmentPattern).",
  "MB-PATTERN-PLACE (U3) [MB-PLACE-FOR-OF, MB-PLACE-NESTED, MB-PLACE-ARRAY, MB-PLACE-DEFAULT-TARGET, MB-PLACE-NOT-PATTERN]: a pattern is an object literal on the left of = (a default's target inside a pattern included), the initializer of a for-of, a property's value in a pattern, or an element of an array literal that is itself on the left of =, a for-of initializer or nested in a pattern; the reader reads no other object literal as one.",
  "RG-BINDING (B145-U2) [G16-B2-DIRECT-CALL-CTRL, RG-RENAMED-IMPORT, RG-NAMESPACE-MEMBER]: registrationReferences reads a reference as an identifier whose symbol is a target, an import binding read through checker.getAliasedSymbol (renamed, or a namespace's member) included.",
  "RG-ELEMENT-KEY (B145-U2) [RG-ELEMENT-CALL, RG-ELEMENT-TEMPLATE, RG-ELEMENT-CONST]: and as an element access whose key the checker types as one string literal (a string literal, a no-substitution template, a const bound to one), by the property of that name on its object's type.",
  "RG-CALL (B145-U2) [G16-B2-DIRECT-CALL-INPLACE-CTRL, RG-PARENTHESIZED-CALL, RG-ASSERTED-CALL]: a reference that is a call's callee (itself, or the member access or element access it names), read through parentheses and as, satisfies, non-null and angle-bracket assertions, reads call.",
  "RG-CALL-METHOD (B145-U2) [G16-B2-CALL-METHOD, G16-B2-CALL-METHOD-INPLACE, RG-APPLY, RG-METHOD-WRAPPED]: a reference that is the receiver of .call or .apply, that member (read through the same wrappers) being a call's callee, reads call-method.",
  "RG-ALIAS (B145-U2) [G16-B2-ALIAS-CALL, G16-B2-ALIAS-CALL-BLANK, RG-ALIAS-CHAIN, RG-ALIAS-EXPORTED, RG-ALIAS-WRAPPED, RG-OWN-DECLARATION]: a reference that initializes a const declaration of a name, read through the same wrappers, reads alias, and that name's own references read as the same target's, through any chain of such names across the given files in any order; a variable's or a function's own declared name is no reference.",
  "RG-SPECIFIER (B145-U2) [RG-IMPORT-SPECIFIER, RG-EXPORT-SPECIFIER]: a name of an import or export specifier reads specifier.",
  "RG-OTHER (B145-U2) [RG-LET-ALIAS, RG-ARGUMENT, RG-BIND, RG-METHOD-UNCALLED, RG-DESTRUCTURED, RG-PROPERTY-VALUE, RG-SHORTHAND-VALUE, RG-TYPE-QUERY]: any other reference reads reference (a let or var initializer, an argument, a .bind receiver, a .call or .apply member that is no call's callee, a destructured key, a property value, a shorthand property's value by its value symbol, a type query).",
  "EV-CLOSURE (U4) [EV-CLOSURE-CHAIN, EV-CLOSURE-TYPE-ONLY, EV-CLOSURE-FILTER]: importClosure reads the entry module and, transitively, every module a top-level import declaration (type-only included), export-from declaration or import-equals of an external module names, as the checker's module symbol resolves it, that the filter accepts, each once (an import cycle included).",
  "EV-READS (U4) [L3-A-ENV-READS, EV-GLOBAL-THIS, EV-ELEMENT, EV-IMPORTED-ENV, EV-REFLECT, EV-DESTRUCTURE-SOURCE, EV-LOCAL-PROCESSENV]: environmentReads reads every identifier other than a member access's name, and every member access, element access and call, that the checker types as the ProcessEnv interface @types/node declares, as <line>|<text>.",
];
/** The helper header's residual lines, byte for byte and in order (each "<residual> [<quiet rows>]: <the family>"). */
const RESIDUAL_LINES: readonly string[] = [
  "R-UNNARROWED-KEY [Q-KEY-UNION, Q-PATTERN-STRING-KEY]: a computed key typed as anything but one string literal (a union of literals, string, a keyof type) and a numeric key read no name (bindingKey undefined; a pattern member's name undefined).",
  "R-REST-PATTERN [Q-MB-REST-PATTERN]: an object pattern below an array rest element ([...{ length }] = list, [, ...[{ mutations }]] = list) reads no member: the checker types no such pattern (getTypeOfAssignmentPattern fails on it), so the reader never asks.",
  "R-COPIED-SDK [Q-ID-COPY]: a regular-file copy or a hard link of an SDK file outside the package, with no SDK manifest above it, is no SDK file.",
  "R-UNNAMED-REFERENCE [Q-RG-COMPUTED]: a registration reached without a name the checker resolves (an element key it does not type as one string literal, Object.values, an any-typed value) is no reference.",
  "R-UNTYPED-ENV [Q-EV-UNTYPED]: the environment read through a value the checker does not type as ProcessEnv (a cast through any or unknown, require's any result) is no environment read.",
  "R-RUNTIME-LOAD [Q-EV-DYNAMIC]: a module reached only at run time (import(), require(), a created require) is not in the closure.",
  "R-RELOCATED-SDK [Q-MB-RELOCATED]: an SDK declaration TypeScript reads at a file name with no /node_modules/@hyperunix/sdk/dist/ segment (a package linked from elsewhere, read by its real path) is no SDK declaration.",
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
  "EN-TARGET:2",
  "EN-OTHER:1",
  "ST-LITERAL:3",
  "ST-TEMPLATE:3",
  "ST-KIND-TS:1",
  "ST-KIND-JSX:1",
  "ST-JSON:4",
  "ST-JSON-UNPARSED:1",
  "ST-UNREAD:1",
  "ST-AT:3",
  "ID-REAL:5",
  "ID-MANIFEST:4",
  "ID-DANGLING:1",
  "ID-RESOLVE:3",
  "MB-DECLARATIONS:4",
  "MB-ALIAS:1",
  "MB-KEY-NAME:3",
  "MB-KEY-NONE:2",
  "MB-KEY-COMPUTED:3",
  "MB-PATTERN:5",
  "MB-PATTERN-PLACE:5",
  "RG-BINDING:3",
  "RG-ELEMENT-KEY:3",
  "RG-CALL:3",
  "RG-CALL-METHOD:4",
  "RG-ALIAS:6",
  "RG-SPECIFIER:2",
  "RG-OTHER:8",
  "EV-CLOSURE:3",
  "EV-READS:7",
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
  "EN-WALK-TREE": "6f0a4316da2eaf3f",
  "EN-WALK-MODULES": "e8b8aa3aa432b92f",
  "L3-C4-JSON-CMD-ENTRY": "cb02aa2a989a53c1",
  "G16-C5-DOTFILE-JSON-ENTRY": "7030237841f57e90",
  "EN-WALK-FILES": "63fab242b17826bc",
  "L3-C1-SYMLINK-ENTRY": "a0f84c657860134a",
  "L3-C1-DIRLINK-CTRL-ENTRY": "a43d9801a3c6df28",
  "EN-WALK-DANGLING": "95dade1c1ff75875",
  "EN-KIND-LINK-FIRST": "6efec98683cc8a51",
  "EN-TARGET-REAL": "757da7f8625b1003",
  "EN-TARGET-DANGLING": "914ae4f324e74e22",
  "EN-KIND-OTHER": "7cc6df4304faab6e",
  "ST-LITERAL-STRING": "ca96e3e86bc9bfdc",
  "ST-LITERAL-NOSUB": "72c020dbcc2263c8",
  "G16-C4-ESCAPED-STRINGS": "90ee932120eda675",
  "ST-TEMPLATE-HEAD": "60f598fb12722146",
  "L3-C4-TMPL-MIDDLE-STRINGS": "a1239e035b4568c9",
  "ST-TEMPLATE-TAIL": "943ab95a3035f48f",
  "ST-KIND-ASSERTION": "2bf66890aceada34",
  "ST-KIND-JSX-TEXT": "be8a1bbaee025d55",
  "L3-C4-JSON-CMD-STRINGS": "081428a7bb812ed9",
  "ST-JSON-NESTED": "8778bb5df5eb0697",
  "ST-JSON-KEY": "cc9b822410102157",
  "ST-JSON-ESCAPE": "9f75f009da4b5938",
  "ST-JSON-INVALID": "74234e98afe7498f",
  "ST-OTHER-NAMES": "9318536c7a8f9758",
  "ST-AT-FILE": "ca96e3e86bc9bfdc",
  "ST-AT-LINKED-JSON": "9f75f009da4b5938",
  "ST-AT-UNREAD": "fe44a8cccd89edae",
  "L3-C1-SYMLINK-IDENTITY": "b5bea41b6c623f7c",
  "L3-C1-DIRLINK-CTRL-IDENTITY": "b5bea41b6c623f7c",
  "ID-REAL-BELOW": "b5bea41b6c623f7c",
  "ID-REAL-LINKED": "b5bea41b6c623f7c",
  "ID-REAL-SIBLING": "fcbcf165908dd18a",
  "ID-MANIFEST-COPY": "b5bea41b6c623f7c",
  "ID-MANIFEST-LINKED": "b5bea41b6c623f7c",
  "ID-MANIFEST-NAMELESS": "cedf263c40c29f6f",
  "ID-MANIFEST-NONE": "74234e98afe7498f",
  "ID-DANGLING-INSIDE": "fcbcf165908dd18a",
  "L3-C1-SYMLINK-RESOLVE": "b5bea41b6c623f7c",
  "ID-RESOLVE-BARE": "b5bea41b6c623f7c",
  "ID-RESOLVE-PLAIN": "38576924f34fcfc3",
  "G16-C2-INTERSECTION-LOCAL-FIRST": "7973ed674f388814",
  "G16-C2-INTERSECTION-SDK-FIRST": "7973ed674f388814",
  "G16-C2-INTERSECTION-DESTRUCTURE": "7f01ad401280100e",
  "MB-DECLARATIONS-LOCAL": "643d5437104296e2",
  "MB-ALIAS-IMPORT": "f3479dc8cbaa98bc",
  "MB-KEY-IDENTIFIER": "7f01ad401280100e",
  "MB-KEY-STRING": "7f01ad401280100e",
  "MB-KEY-SHORTHAND": "7f01ad401280100e",
  "MB-KEY-REST": "481380b22ecde8d8",
  "MB-KEY-ARRAY": "481380b22ecde8d8",
  "L3-C2-COMPUTED-DESTRUCTURE": "7f01ad401280100e",
  "L3-C2-CONSTKEY-DESTRUCTURE": "7f01ad401280100e",
  "MB-KEY-TEMPLATE": "7f01ad401280100e",
  "L3-C2-ASSIGN-DESTRUCTURE": "8d0cb3f0f1f9675e",
  "MB-PATTERN-RENAMED": "8d0cb3f0f1f9675e",
  "MB-PATTERN-STRING": "8d0cb3f0f1f9675e",
  "MB-PATTERN-COMPUTED": "8d0cb3f0f1f9675e",
  "MB-PATTERN-DEFAULTED": "8d0cb3f0f1f9675e",
  "MB-PLACE-FOR-OF": "8d0cb3f0f1f9675e",
  "MB-PLACE-NESTED": "5b13d519efd39ef8",
  "MB-PLACE-ARRAY": "8d0cb3f0f1f9675e",
  "MB-PLACE-DEFAULT-TARGET": "5b13d519efd39ef8",
  "MB-PLACE-NOT-PATTERN": "4f53cda18c2baa0c",
  "G16-B2-DIRECT-CALL-CTRL": "aba49b12abdf30b9",
  "RG-RENAMED-IMPORT": "4b62483152b9d93f",
  "RG-NAMESPACE-MEMBER": "ba63668f02fa730e",
  "RG-ELEMENT-CALL": "2394becc1e2018ba",
  "RG-ELEMENT-TEMPLATE": "9f6b0c39970b3555",
  "RG-ELEMENT-CONST": "bb3aff1d457e5ed5",
  "G16-B2-DIRECT-CALL-INPLACE-CTRL": "2097e06c787272ab",
  "RG-PARENTHESIZED-CALL": "8e594d17f004e24f",
  "RG-ASSERTED-CALL": "2373c1907a620fba",
  "G16-B2-CALL-METHOD": "87bfc54de59d13f4",
  "G16-B2-CALL-METHOD-INPLACE": "17ad507d59f3a436",
  "RG-APPLY": "3e5aa4c7d43cb675",
  "RG-METHOD-WRAPPED": "e216ac024afbf0bb",
  "G16-B2-ALIAS-CALL": "7443d1f66bfb08bc",
  "G16-B2-ALIAS-CALL-BLANK": "feb176a134a971b5",
  "RG-ALIAS-CHAIN": "053b7100393081c3",
  "RG-ALIAS-EXPORTED": "fb7f5e85903bfb9d",
  "RG-ALIAS-WRAPPED": "1bc1d806007070f1",
  "RG-OWN-DECLARATION": "4d5bffc6497de216",
  "RG-IMPORT-SPECIFIER": "afd6ce17c097811d",
  "RG-EXPORT-SPECIFIER": "b1e74e27a9f0ac6f",
  "RG-LET-ALIAS": "6d23d96f7970618a",
  "RG-ARGUMENT": "1e73f33eb6f0d526",
  "RG-BIND": "c856b81f8d2d213f",
  "RG-METHOD-UNCALLED": "30a46a4749a38f6d",
  "RG-DESTRUCTURED": "deb101e2977a461d",
  "RG-PROPERTY-VALUE": "8636761ed0ecf3dd",
  "RG-SHORTHAND-VALUE": "d0fe76b804a6222b",
  "RG-TYPE-QUERY": "8ebc526258d4297d",
  "EV-CLOSURE-CHAIN": "1dddcae1cdc81abb",
  "EV-CLOSURE-TYPE-ONLY": "9f7662dea2b0353f",
  "EV-CLOSURE-FILTER": "d1d25e3f20bb5834",
  "L3-A-ENV-READS": "79d98aed8ef603ce",
  "EV-GLOBAL-THIS": "0a34e68ad707134c",
  "EV-ELEMENT": "bdc9d7e549714299",
  "EV-IMPORTED-ENV": "5d27513a5b4d25ef",
  "EV-REFLECT": "d327bbc2f318135f",
  "EV-DESTRUCTURE-SOURCE": "3ce1734c3c271b98",
  "EV-LOCAL-PROCESSENV": "4f53cda18c2baa0c",
  "Q-KEY-UNION": "1cea7a6d5f42c9d9",
  "Q-PATTERN-STRING-KEY": "891aa424228ff440",
  "Q-MB-REST-PATTERN": "93f3ef792905ebc7",
  "Q-ID-COPY": "9a578b24c2039cc3",
  "Q-RG-COMPUTED": "940ff9e6d5e309d8",
  "Q-EV-UNTYPED": "39da831b53938bdc",
  "Q-EV-DYNAMIC": "2b1ba79526d60646",
  "Q-MB-RELOCATED": "b7e9f085b722c92d",
  "Q-EV-AMBIENT": "940ff9e6d5e309d8",
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
  for (const name of ["a.ts", "b.tsx", "c.mts", "d.cts", "e.js", "f.jsx", "g.mjs", "h.cjs"]) put(at("en-modules", name), "export {};\n");
  put(at("en-json-cmd", "hx-launch.json"), JSON_LAUNCH);
  put(at("en-json-dot", ".hx-launch.json"), JSON_LAUNCH);
  for (const name of ["README", "notes.md", "map.ts.map", "upper.TS", "upper.JSON"]) put(at("en-files", name), '"hx"\n');
  link(at("en-link-file", "hx-mutation-link.mjs"), SDK_MUTATION_MODULE);
  link(at("en-link-dir", "hxsdk"), SDK_PACKAGE_DIR);
  link(at("en-dangling", "gone.ts"), "./missing.ts");
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
  "census/mb-place-for-of.ts": workspaceModule("let mutations: unknown;\nfor ({ mutations } of [workspace]) void mutations;\n"),
  "census/mb-place-nested.ts": workspaceModule("let mutations: unknown;\n({ ws: { mutations } } = { ws: workspace });\nvoid mutations;\n"),
  "census/mb-place-array.ts": workspaceModule("let mutations: unknown;\n[{ mutations }] = [workspace];\nvoid mutations;\n"),
  "census/mb-place-default-target.ts": workspaceModule("let mutations: unknown;\n({ ws: { mutations } = workspace } = { ws: undefined });\nvoid mutations;\n"),
  "census/mb-place-not-pattern.ts": workspaceModule(
    "export const copy = { mutations: workspace.mutations };\nexport const list = [{ mutations: 1 }];\nexport const nested = { inner: { mutations: 1 } };\nexport const either = { mutations: workspace.mutations } || undefined;\nlet target: unknown;\ntarget = { mutations: workspace.mutations };\nvoid target;\nfor (const entry of [{ mutations: 1 }]) void entry;\n",
  ),
  // R-RELOCATED-SDK quiet row: an SDK-shaped declaration file at a path with no /node_modules/@hyperunix/sdk/dist/ segment.
  "census/vendor/hyperunix-sdk/dist/client.d.ts": "export declare class Workspace {\n  get mutations(): unknown;\n}\n",
  "census/mb-relocated.ts": 'import type { Workspace } from "./vendor/hyperunix-sdk/dist/client.js";\ndeclare const workspace: Workspace;\nexport const read = workspace.mutations;\n',
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
  "workbench/rg-alias-chain.ts": registrationModule(`${READER_IMPORT}const first = registerHyperUnixFind;\nconst second = first;\n`, "  second(registry, reader, root);\n  for (const entry of [registry]) void entry;\n"),
  "workbench/rg-alias-exported.ts": `${READER_IMPORT}export const attach = registerHyperUnixFind;\nexport type { HyperUnixReader };\n`,
  "workbench/rg-alias-importer.ts": registrationModule('import { attach, type HyperUnixReader } from "./__wb-ts6.3-census__rg-alias-exported.js";\nconst local = attach;\n', "  local(registry, reader, root);\n"),
  "workbench/rg-alias-wrapped.ts": registrationModule(
    `${READER_IMPORT}type Register = (registry: CapabilityRegistry, reader: HyperUnixReader, root: string) => void;\nconst a1 = (registerHyperUnixFind);\nconst a2 = registerHyperUnixFind as Register;\nconst a3 = registerHyperUnixFind satisfies Register;\nconst a4 = registerHyperUnixFind!;\nconst a5 = <Register>registerHyperUnixFind;\n`,
    "  a1(registry, reader, root);\n  a2(registry, reader, root);\n  a3(registry, reader, root);\n  a4(registry, reader, root);\n  a5(registry, reader, root);\n",
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
/** A module's exports whose names start with "register", as the registration reader's targets. */
function targetsOf(module: ts.SourceFile): Map<ts.Symbol, string> {
  const { checker } = compiled();
  const symbol = checker.getSymbolAtLocation(module);
  const exports = symbol === undefined ? [] : checker.getExportsOfModule(symbol);
  return new Map(exports.filter(entry => entry.name.startsWith("register")).map(entry => [entry, entry.name]));
}
function providerTargets(): Map<ts.Symbol, string> {
  const provider = compiled().program.getSourceFile(PROVIDER);
  if (provider === undefined) throw new Error("the provider module is not in the program");
  return targetsOf(provider);
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
/** A reading's digest: sha256 of its JSON, the repo and scratch roots (as spelled and as real) read as <repo> and <scratch>. */
function digestOf(value: unknown): string {
  let text = JSON.stringify(value) ?? "undefined";
  for (const [root, name] of [
    [realpathSync(REPO), "<repo>"],
    [REPO, "<repo>"],
    [realpathSync(scratch), "<scratch>"],
    [scratch, "<scratch>"],
  ] as const) {
    text = text.split(root.split(sep).join("/")).join(name);
  }
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
const FALSIFIERS: Readonly<Record<string, readonly Row[]>> = {
  "EN-DIRECTORY": [{ id: "EN-WALK-TREE", read: () => walk("en-tree"), expected: () => ["sub/deeper/z.ts|module", "sub/deeper|directory", "sub|directory", "top.ts|module"] }],
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
  "EN-FILE": [{ id: "EN-WALK-FILES", read: () => walk("en-files"), expected: () => ["README|file", "map.ts.map|file", "notes.md|file", "upper.JSON|file", "upper.TS|file"] }],
  "EN-LINK": [
    { id: "L3-C1-SYMLINK-ENTRY", read: () => walk("en-link-file"), expected: () => ["hx-mutation-link.mjs|link"] },
    { id: "L3-C1-DIRLINK-CTRL-ENTRY", read: () => walk("en-link-dir"), expected: () => ["hxsdk|link"] },
    { id: "EN-WALK-DANGLING", read: () => walk("en-dangling"), expected: () => ["gone.ts|link"] },
    { id: "EN-KIND-LINK-FIRST", read: () => entryKind(synthetic("hxsdk", { directory: true, link: true })), expected: () => "link" },
  ],
  "EN-TARGET": [
    { id: "EN-TARGET-REAL", read: () => entriesBelow(at("en-link-file")).map(entry => entry.target), expected: () => [realpathSync(SDK_MUTATION_MODULE).split(sep).join("/")] },
    { id: "EN-TARGET-DANGLING", read: () => entriesBelow(at("en-dangling")).map(entry => entry.target), expected: () => [DANGLING] },
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
  ],
  "ST-JSON-UNPARSED": [{ id: "ST-JSON-INVALID", read: () => nullable(entryStrings("x.json", '{ "command": hx }')), expected: () => null }],
  "ST-UNREAD": [
    {
      id: "ST-OTHER-NAMES",
      read: () => ["README", "notes.md", "map.ts.map", "upper.TS", "upper.JSON"].map(name => nullable(entryStrings(name, '"hx"'))),
      expected: () => [null, null, null, null, null],
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
  ],
  "ID-MANIFEST": [
    { id: "ID-MANIFEST-COPY", read: () => isSdkFile(at("id-copy", "dist", "x.js"), sdkReal()), expected: () => true },
    { id: "ID-MANIFEST-LINKED", read: () => isSdkFile(at("id-copy-link", "x.js"), sdkReal()), expected: () => true },
    { id: "ID-MANIFEST-NAMELESS", read: () => [packageNameOf(at("id-pkg", "real", "dist", "x.js")), packageNameOf(at("id-copy", "dist", "x.js"))], expected: () => [null, SDK] },
    { id: "ID-MANIFEST-NONE", read: () => packageNameOf(join(sep, "wb-ts6.3-no-manifest", "x.js")), expected: () => null },
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
  ],
  "MB-PATTERN-PLACE": [
    { id: "MB-PLACE-FOR-OF", read: () => patternReading("census/mb-place-for-of.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-NESTED", read: () => patternReading("census/mb-place-nested.ts"), expected: () => ["ws|", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-ARRAY", read: () => patternReading("census/mb-place-array.ts"), expected: () => ["mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-DEFAULT-TARGET", read: () => patternReading("census/mb-place-default-target.ts"), expected: () => ["ws|", "mutations|client.d.ts:GetAccessor"] },
    { id: "MB-PLACE-NOT-PATTERN", read: () => patternReading("census/mb-place-not-pattern.ts"), expected: () => [] },
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
        ...Array.from({ length: 5 }, () => `${L("workbench/rg-alias-wrapped.ts")}|alias|registerHyperUnixFind|registerHyperUnixFind`),
        ...["a1", "a2", "a3", "a4", "a5"].map(name => `${L("workbench/rg-alias-wrapped.ts")}|call|registerHyperUnixFind|${name}`),
      ],
    },
    {
      id: "RG-OWN-DECLARATION",
      read: () => {
        const own = file("census/rg-own-declaration.ts");
        return registrationReferences([{ label: "own", file: own }], compiled().checker, targetsOf(own));
      },
      expected: () => ["own|call|registerCensusOwn|registerCensusOwn"],
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
  ],
  "EV-CLOSURE": [
    { id: "EV-CLOSURE-CHAIN", read: () => closureOf("census/cl-a.ts"), expected: () => ["census/cl-a.ts", "census/cl-b.ts", "census/cl-c.ts", "census/cl-d.ts"].map(L) },
    { id: "EV-CLOSURE-TYPE-ONLY", read: () => closureOf("census/cl-t.ts"), expected: () => ["census/cl-t.ts", "census/cl-u.ts"].map(L) },
    { id: "EV-CLOSURE-FILTER", read: () => closureOf("census/cl-f.ts"), expected: () => ["census/cl-f.ts", "census/cl-g.ts"].map(L) },
  ],
  "EV-READS": [
    { id: "L3-A-ENV-READS", read: () => envReads("census/ev-refusal.ts"), expected: () => ["7|process.env"] },
    { id: "EV-GLOBAL-THIS", read: () => envReads("census/ev-global-this.ts"), expected: () => ["1|globalThis.process.env"] },
    { id: "EV-ELEMENT", read: () => envReads("census/ev-element.ts"), expected: () => ['1|process["env"]'] },
    { id: "EV-IMPORTED-ENV", read: () => envReads("census/ev-imported-env.ts"), expected: () => ["1|env", "2|env"] },
    { id: "EV-REFLECT", read: () => envReads("census/ev-reflect.ts"), expected: () => ["1|snapshot", '1|Reflect.get(process, "env")'] },
    { id: "EV-DESTRUCTURE-SOURCE", read: () => envReads("census/ev-destructure-source.ts"), expected: () => ["1|process.env"] },
    { id: "EV-LOCAL-PROCESSENV", read: () => envReads("census/ev-local-processenv.ts"), expected: () => [] },
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
      read: () => ({ probe: memberDeclarations("census/mb-relocated.ts", "workspace", "mutations"), twin: memberDeclarations("census/mb-sdk-first.ts", "facet", "mutations") }),
      expected: () => ({ probe: [], twin: ["client.d.ts:GetAccessor"] }),
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
function helperBlock(marker: string, until: string): string[] {
  const lines = readFileSync(join(REPO, HELPER), "utf8").split("\n");
  const from = lines.findIndex(line => line.startsWith(` * ${marker} `));
  const to = lines.findIndex((line, index) => index > from && (line.startsWith(` * ${until} `) || line === " */"));
  return lines
    .slice(from + 1, to)
    .filter(line => line.startsWith(" * - "))
    .map(line => line.slice(" * - ".length));
}

const REACHED: string[] = [];
const ORDER: string[] = [];

describe("wb-ts6.3 HX mutation Verified readers census (TS6-R2, rule-19 structural exit of wb-ts6.2)", () => {
  it("the roster's requirements, claims and residuals hold their frozen shape", () => {
    const shape = [...REQUIREMENTS.map(row => `${row.id}:${row.claims.length}`), ...CLAIMS.map(row => `${row.id}:${row.pins.length}`), ...RESIDUALS.map(row => `${row.id}:${row.pins.length}`)];
    expect(shape, "FROZEN pins every requirement, claim and residual").toStrictEqual([...FROZEN]);
    expect(Object.keys(DIGESTS), "DIGESTS pins every row's reading, in roster order").toStrictEqual([...CLAIMS, ...RESIDUALS].flatMap(row => row.pins));
    REACHED.push("frozen");
  });
  ORDER.push("the roster's requirements, claims and residuals hold their frozen shape");

  it("the helper header's claim and residual lines are the roster's, byte for byte and in order", () => {
    expect(helperBlock("CLAIMS", "RESIDUALS"), `${HELPER} CLAIMS`).toStrictEqual([...CLAIM_LINES]);
    expect(helperBlock("RESIDUALS", "RESIDUALS"), `${HELPER} RESIDUALS`).toStrictEqual([...RESIDUAL_LINES]);
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
          const reading = row.read();
          expect(reading, `${claim.id} ${row.id}`).toStrictEqual(row.expected());
          expect(digestOf(reading), `${row.id}'s frozen reading digest`).toBe(DIGESTS[row.id]);
          REACHED.push(row.id);
        });
        ORDER.push(row.id);
      }
    });
  }
  for (const residual of RESIDUALS) {
    describe(residual.id, () => {
      for (const row of QUIET[residual.id] ?? []) {
        it(row.id, { timeout: 120_000 }, () => {
          const reading = row.read();
          expect(reading, `${residual.id} ${row.id}`).toStrictEqual(row.expected());
          expect(digestOf(reading), `${row.id}'s frozen reading digest`).toBe(DIGESTS[row.id]);
          REACHED.push(row.id);
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
    expect(REACHED, "every row reached its assertion, in roster order").toStrictEqual([
      "frozen",
      "header",
      "pins",
      "requirements",
      ...CLAIMS.flatMap(row => row.pins),
      ...RESIDUALS.flatMap(row => row.pins),
    ]);
  });
});
