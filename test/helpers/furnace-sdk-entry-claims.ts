/**
 * wb-lrz.8 (FURNACE-FEEDBACK-RECONCILIATION-R4): the claim parts of test/workbench-furnace-sdk-entry-readers-census.test.ts -
 * one ClaimPart per paragraph of that census's THE CLAIMS, each a text composed of its words and the sub-forms it lists.
 * They live outside the census file since the R-B369 re-cut (this bead's refusal #5, U6): the census states each text
 * byte-for-byte as its own header paragraph (CLAIM TEXT) and lists every sub-form, in claim order, with the plants that
 * prove it (SUBFORMS, CLAIM ROSTER), so a sub-form hollowed from the census's own literals leaves its claim part here
 * unanswered. The readers they describe are the landed test/helpers/furnace-sdk-entry-readers.ts (wb-lrz.9, landing 826),
 * which holds the readers only. Nothing here reads a file. Test-only: no src, docs or receipt is read or written here.
 */
import type { ExposureForm } from "./furnace-sdk-entry-readers.js";

/** One claim of a reader: its text, composed from its words, and the sub-forms it lists (each a phrase of the text). */
export interface ClaimPart<T extends string = string> {
  readonly id: T;
  readonly text: string;
  readonly subforms: readonly string[];
}
function claimPart<T extends string>(id: T): (words: TemplateStringsArray, ...subforms: string[]) => ClaimPart<T> {
  return (words, ...subforms) => ({ id, text: words.reduce((text, word, index) => text + word + (subforms[index] ?? ""), ""), subforms });
}

/** D3's WALK: where it starts, what it follows and what it never reads. */
const WALK_CLAIM: ClaimPart<"walk"> = claimPart(
  "walk",
)`from each entry its caller names (${"the types entry"} and ${"the main entry"} in both censuses), ${"following an export *"} from any module but a .d.cts one or an extensionless one, whose specifier is a ./ path holding nothing a step of RESOLUTION's changes, and ${"following an export * as"} from a .d.ts or a .js module whose specifier is such a ./ path ending .js (neither written export type), each resolved to ${"a module that is not DEEP"} (an export *'s through RESOLUTION's candidates, an export * as's to its exact path from a .js module and to its .d.ts twin from a .d.ts module), and reading each module's ${"top-level statements"} through the TypeScript AST (${"comments never read"}), the WALK reads these forms, each spelling only where its form's claim places it, in ${"the entry itself"} and in ${"every module it reaches"}`;

/** The forms the WALK reads, each an Exposure's form. */
export const WALK_FORMS: readonly ClaimPart<ExposureForm>[] = [
  claimPart("star")`an ${"export * of a DEEP module"} (its target resolved through RESOLUTION) or an ${"export * as of a DEEP module"} under an identifier whose specifier, a ./ path from a .d.ts or a .js module and a ../ path from a module of another kind, ends .js and holds nothing a step of RESOLUTION's changes, its target its exact path or, from a declaration file, its .d.ts twin (in the types entry its .ts first), neither written export type`,
  claimPart(
    "named",
  )`a named re-export of a DEEP class (${"export { X } from"}, unaliased only in either entry, protocol.d.ts and protocol.js (the module each entry star-exports) and zzhop.d.ts (a .d.ts module three deep from the types entry), or ${"aliased as another name"}, an identifier; in the types entry also ${"type-only by its declaration"} or ${"type-only by its specifier"}, and a clause's member after its first), X ${"an identifier"} or ${"a string export name"} (a string name aliased as an identifier, in either entry or protocol.js), read cooked (${"an identifier escape"} - its plants' \\u0045 as the name's first character in either entry and in protocol.d.ts, a braced \\u{52} first in the types entry and \\u{45} first in protocol.d.ts, and an inner \\u0053 in the main entry - or ${"a string escape"} - its plants' \\x48, \\u{45} and \\u0045 in the types entry and \\x48, \\u0045, a line continuation and a single-character escape in the main entry - reads as the name it spells), and in either entry ${"whatever its specifier resolves to"} (its plants' ./embedded.js and ./resident_session.js, DEEP modules, and ./missing.js, which resolves to nothing, in either entry, the package's own bare name in the types entry and the bare zzgate in the main entry)`,
  claimPart(
    "local-import",
  )`a local export (${"export { x }"}, or ${"aliased on export"} as an identifier) of a name an import specifier binds by a DEEP class's own name in an import clause with no default binding, its import declaration written before the local export or, in protocol.d.ts, ${"written after it"}, that name ${"read cooked"} (${"the import aliased"}, ${"a type-only import declaration"}, ${"a type-only import specifier"}, ${"a string import name"}, ${"from a module that is not DEEP"}), each spelling after export { x }, and an import clause's or a local export clause's member after its first, only in protocol.d.ts and protocol.js, the module each entry star-exports (a string import name, which is aliased, in protocol.js, and every other in protocol.d.ts)`,
  claimPart("local-module")`a local export (export { x }, not aliased on export) of a name a ${"default import of a DEEP module"} (alone, or beside a namespace import in protocol.d.ts, the module the types entry star-exports) or a ${"namespace import of a DEEP module"} binds, neither import type-only, its specifier a ./ path from a .d.ts or a .js module and a ../ path from a module of another kind, ending .js and holding nothing a step of RESOLUTION's changes, its target its exact path or, from a declaration file, its .d.ts twin (in the types entry a namespace import's .ts first), or, in the types entry, the package's own name for a namespace import and a ./ path holding a tab for a default import`,
];

/** RESOLUTION: how the WALK reads a specifier and which tarball entry it names. */
const RESOLUTION_CLAIM: ClaimPart<"resolution"> = claimPart(
  "resolution",
)`the specifier of an export * of a DEEP module is read through these steps of a URL parser's and a file path's reading - ${"every ASCII tab dropped"}, ${"every LF dropped"} and ${"every CR dropped"}, ${"a query cut off"} (from its first ?) and ${"a fragment cut off"} (from its first #), then ${"every %XX escape decoded"} (each %XX of an ASCII code its plants hold: %64, %65, %2e and %5C, and %09, %3F and %23, after which nothing resolves) and then ${"every backslash read as /"} - in the main entry, and in the types entry each step on one character (there a tab in a default import's specifier too), and a specifier resolves when it is ${"relative"} (./, or ../ from a module past the entry, ${"joined to the naming module's directory"}) or, from either entry or a .ts module, ${"the package's own name"} (@furnace/sdk/<path>, read under package/), under it from either entry its ${". segments dropped"} and ${".. segments resolved"} (posix.normalize), and the tarball carries the first of an export *'s specifier's candidates ${"in order"}: from the types entry, ${"an exact TypeScript path"} as written (${"an exact .ts"}, ${"an exact .tsx"}, ${"an exact .mts"} or ${"an exact .cts"}, ${"a declaration file's own path"} included, and from a .d.mts module a .d.cts's); for ${"a .js path"}, its .ts, ${"then its .tsx"} and ${"then its .d.ts twin"} (from a .d.ts module past the entry its .ts and then its .d.ts twin, from a .d.mts or a .d.cts module its .d.ts twin); for ${"a .jsx path"}, ${"the same three"}; for ${"a .mjs path"}, its .mts and ${"then its .d.mts twin"}; for ${"a .cjs path"}, its .cts and ${"then its .d.cts twin"}; for ${"an extensionless path"}, its .ts, ${"its .tsx"}, ${"its .d.ts"}, ${"its /index.ts"}, ${"its /index.tsx"} and ${"its /index.d.ts"}; and from the main entry, ${"the exact path"}, ${"then its .js"} and ${"then its /index.js"} (from a .ts module each of the three alone, and from a module of another kind its exact path)`;

/** DEEP: which tarball modules are the DEEP rows' modules. */
const DEEP_CLAIM: ClaimPart<"deep"> = claimPart(
  "deep",
)`a tarball module is DEEP when its path, with ${"its one module extension"} taken off (${"a .d.ts"}, ${"a .d.mts"}, ${"a .d.cts"}, ${"a .ts"}, ${"a .tsx"}, ${"a .mts"}, ${"a .cts"}, ${"a .js"}, ${"a .jsx"}, ${"a .mjs"} or ${"a .cjs"}), is ${"a DEEP row's path"} with its .js taken off, so a DEEP module's JavaScript file, its declaration file and ${"its TypeScript twin"} are each that DEEP module, whose classes are ${"the row's names"}`;

/** D3's ENTRY TEXT READ. */
const TEXT_CLAIM: ClaimPart<"text"> = claimPart(
  "text",
)`each entry's raw text (${"the types entry's"} and ${"the main entry's"}) is read for a DEEP class's name, in its row's letter case, as a whole word (the regex \\b<name>\\b): ${"a name in its code"} (the types entry's identifiers and double-quoted string literals, as its plants write them) and ${"a name in a comment"} (a line comment in either entry and a block comment in the types entry) alike, ${"escape sequences never decoded"} (those its plants write in either entry: the identifier escapes \\u0045, \\u{52} and an inner \\u0053, the string escapes \\x48, \\u{45} and \\u0045, ${"a legacy octal escape"} (\\105), a single-character escape (\\H), a line continuation, and a \\u0045 in a comment), a name with a word character (${"an ASCII letter"} - its plants' lower-case y and upper-case X just before a name and upper-case X and O and lower-case s just after one - ${"a digit"} (its plants' 2) or ${"an underscore"}) ${"just before it"} or ${"just after it"} not read, and a name beside ${"a $"} or ${"a non-ASCII letter"} (its plants' U+00E9, on either side) read (each a word boundary)`;

/** D1's PATH reading of a literal's cooked text, and what it spells or holds. */
const PATH_CLAIM: ClaimPart<"path"> = claimPart(
  "path",
)`a literal's cooked text is read through these steps - ${"every ASCII tab dropped"}, ${"every LF dropped"} and ${"every CR dropped"}, then ${"every %XX escape decoded"} (each %XX of an ASCII code its plants hold: %40, %2F, %2f, %2E and %5C) and then ${"every backslash read as /"}, then posix.normalize (${"empty segments dropped"}, ${". segments dropped"} and ${".. segments resolved"}) - and the text spells a deep @furnace/sdk/<path> when ${"the cooked text itself"} or ${"its PATH reading"} ${"begins with @furnace/sdk/"} or holds ${"node_modules/@furnace/sdk/ at its start"} or ${"node_modules/@furnace/sdk/ after a /"}, and holds one when either ${"holds @furnace/sdk/ anywhere"}`;

/** U1's rendered reading of vendor/README.md. */
const RENDER_CLAIM: ClaimPart<"render"> = claimPart(
  "render",
)`vendor/README.md is read through marked's lexer, each top-level block to its text, ${"whitespace collapsed"} (${"every run one space"}, each run of spaces, tabs and line feeds): a hard line break (a br token, ${"a backslash before a line ending"} or ${"two or more spaces before a line ending"}) reads as the line break marked renders, a space; ${"a list"} reads by ${"its items' tokens"}, ${"a table"} by its ${"header cells' tokens"} and ${"row cells' tokens"}, and a token holding tokens (${"a paragraph"}, ${"a heading"} (a ## heading), ${"a blockquote"}, ${"emphasis"}, ${"strong text"} or ${"a link"} (an inline link, or ${"a reference link"} written [text][label] beside its definition)) ${"by those tokens"}; ${"raw HTML"} (${"an HTML block"} holding a comment or ${"inline HTML"} tags), ${"a link-reference definition"} and ${"an image"} read as nothing`;

/** D4's register-method count. */
const REGISTER_CLAIM: ClaimPart<"register"> = claimPart(
  "register",
)`executor.js's register methods are its method declarations written with no modifier and no asterisk, ${"in a class"} or ${"in an object literal"} (each name form below in its plants' unexported class declaration ShimApp at the module's top level; an identifier name in the real tree's exported class declaration ExecutorApp, in ${"a default-exported class declaration"} at the module's top level, named or anonymous, in a class expression a function returns or in an object literal a const declaration's initializer holds), whose name reads register: ${"an identifier name"} or ${"a string-literal name"} (double-quoted, or ${"single-quoted"}), read cooked (${"an identifier escape"} - its plants' \\u0072 and braced \\u{72}, each the name's first character - or ${"a string escape"} - its plants' \\x65 and \\u0065 - reads as the name it spells), or ${"a computed name"} whose expression, ${"through parentheses"}, is ${"a computed string literal"} or ${"a computed no-substitution template literal"}`;

/** Every claim part, in the order the census header states them. */
export const CLAIM_PARTS: readonly ClaimPart[] = [WALK_CLAIM, ...WALK_FORMS, RESOLUTION_CLAIM, DEEP_CLAIM, TEXT_CLAIM, PATH_CLAIM, RENDER_CLAIM, REGISTER_CLAIM];
