/**
 * wb-lrz.8 (FURNACE-FEEDBACK-RECONCILIATION-R4): the claim parts of test/workbench-furnace-sdk-entry-readers-census.test.ts -
 * one ClaimPart per paragraph of that census's THE CLAIMS, each a text composed of its words and the sub-forms it lists.
 * They live outside the census file since the R-B369 re-cut (this bead's refusal #5, U6): the census states each text
 * byte-for-byte as its own header paragraph (CLAIM TEXT) and lists every sub-form, in claim order, with the plants that
 * prove it (SUBFORMS, CLAIM ROSTER), so a sub-form hollowed from the census's own literals leaves its claim part here
 * unanswered. The readers they describe are the landed test/helpers/furnace-sdk-entry-readers.ts (wb-lrz.9, landing 826),
 * which holds the readers only. Since the R-B399 re-cut (this bead's refusal #6, U7 and U11) WALK_READS lists, for each WALK
 * form, the modules its plants have the WALK read it in, each with the class names read there; the WALK claim states them,
 * and the census holds them equal to its plants' own lines (CLAIM ROSTER). Nothing here reads a file. Test-only: no src,
 * docs or receipt is read or written here.
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
const WALK_BASE: ClaimPart<"walk"> = claimPart(
  "walk",
)`from each entry its caller names (${"the types entry"} and ${"the main entry"} in both censuses), ${"following an export *"} from any module but a .d.cts one or an extensionless one, whose specifier is a ./ path holding nothing a step of RESOLUTION's changes, and ${"following an export * as"} from a .d.ts or a .js module whose specifier is such a ./ path ending .js (neither written export type), each resolved to ${"a module that is not DEEP"} (an export *'s through RESOLUTION's candidates, an export * as's to its exact path from a .js module and to its .d.ts twin from a .d.ts module), and reading each module's ${"top-level statements"} through the TypeScript AST (${"comments never read"}), the WALK reads these forms in ${"the entry itself"} and in ${"the modules its plants have it reach"}, each form only in the modules its plants write it in and there only as they write it - each class name in the spellings, and at the places in the module, its plants write that name in - and each spelling only where its form's claim places it`;

/**
 * The modules the WALK's plants have it read each form in (an export *'s or an export * as's module is the one that holds
 * it), each with the class names read there, in code-unit order: the census's CLAIM ROSTER case holds this roster equal to
 * the modules and names its plants' own lines read, so the WALK claim's module list is its plants' (R-B399, refusal #6 U7).
 */
export const WALK_READS: Readonly<Record<ExposureForm, readonly string[]>> = {
  star: [
    "embedded (ResidentSession)",
    "embedded.js.d.ts (ResidentSession)",
    "hosting.d.ts (EmbeddedHost)",
    "hosting/index.d.ts (EmbeddedHost)",
    "index.d.ts (EmbeddedHost and ResidentSession)",
    "index.js (EmbeddedHost and ResidentSession)",
    "protocol.d.ts (EmbeddedHost and ResidentSession)",
    "protocol.js (EmbeddedHost and ResidentSession)",
    "zzas.d.ts (EmbeddedHost)",
    "zzasm.js (EmbeddedHost)",
    "zzc.cts (EmbeddedHost)",
    "zzd16.d.ts (EmbeddedHost and ResidentSession)",
    "zzdc.d.cts (EmbeddedHost)",
    "zzdir/index.ts (EmbeddedHost)",
    "zzdir2/index.tsx (EmbeddedHost)",
    "zzdm.d.mts (EmbeddedHost)",
    "zzexact.ts (EmbeddedHost)",
    "zzexact2.tsx (EmbeddedHost)",
    "zzexact3.mts (EmbeddedHost)",
    "zzexact4.cts (EmbeddedHost)",
    "zzh16.d.ts (EmbeddedHost)",
    "zzi/index.tsx (EmbeddedHost)",
    "zzj.ts (EmbeddedHost)",
    "zzj16.js (EmbeddedHost and ResidentSession)",
    "zzjhop.js (EmbeddedHost)",
    "zzjsd.d.ts (EmbeddedHost)",
    "zzjsdir/index.js (EmbeddedHost)",
    "zzjsx.d.ts (EmbeddedHost)",
    "zzjsxt.ts (EmbeddedHost)",
    "zzjsxx.tsx (EmbeddedHost)",
    "zzk.cts (EmbeddedHost)",
    "zzk/m1.ts (EmbeddedHost and ResidentSession)",
    "zzk/m2.tsx (EmbeddedHost and ResidentSession)",
    "zzk/m3.mts (EmbeddedHost and ResidentSession)",
    "zzk/m4.cts (EmbeddedHost and ResidentSession)",
    "zzk/m5.jsx (EmbeddedHost and ResidentSession)",
    "zzk/m6.mjs (EmbeddedHost and ResidentSession)",
    "zzk/m7.cjs (EmbeddedHost and ResidentSession)",
    "zzk/m8.d.mts (EmbeddedHost and ResidentSession)",
    "zzk/m9.d.cts (EmbeddedHost and ResidentSession)",
    "zzm.mts (EmbeddedHost)",
    "zzn.mts (EmbeddedHost)",
    "zzo.ts (EmbeddedHost)",
    "zzoidir/index.js (EmbeddedHost)",
    "zzoo.ts (EmbeddedHost)",
    "zzot.ts (EmbeddedHost)",
    "zzp.tsx (EmbeddedHost)",
    "zzq.ts (EmbeddedHost)",
    "zzr.tsx (EmbeddedHost)",
    "zzs.js (EmbeddedHost)",
    "zzt/index.ts (EmbeddedHost)",
    "zzts.ts (EmbeddedHost)",
    "zztsx.tsx (EmbeddedHost)",
    "zzu.d.ts (EmbeddedHost)",
    "zzv.tsx (EmbeddedHost)",
    "zzw.ts (EmbeddedHost)",
    "zzx.ts (EmbeddedHost)",
    "zzy.tsx (EmbeddedHost)",
  ],
  named: [
    "index.d.ts (EmbeddedHost and ResidentSession)",
    "index.js (EmbeddedHost and ResidentSession)",
    "protocol.d.ts (EmbeddedHost)",
    "protocol.js (EmbeddedHost and ResidentSession)",
    "zzd16.d.ts (EmbeddedHost)",
    "zzhop.d.ts (EmbeddedHost)",
    "zzj16.js (EmbeddedHost)",
    "zzk/m1.ts (EmbeddedHost)",
    "zzk/m2.tsx (EmbeddedHost)",
    "zzk/m3.mts (EmbeddedHost)",
    "zzk/m4.cts (EmbeddedHost)",
    "zzk/m5.jsx (EmbeddedHost)",
    "zzk/m6.mjs (EmbeddedHost)",
    "zzk/m7.cjs (EmbeddedHost)",
    "zzk/m8.d.mts (EmbeddedHost)",
    "zzk/m9.d.cts (EmbeddedHost)",
  ],
  "local-import": [
    "index.d.ts (EmbeddedHost)",
    "index.js (ResidentSession)",
    "protocol.d.ts (EmbeddedHost and ResidentSession)",
    "protocol.js (ResidentSession)",
    "zzd16.d.ts (ResidentSession)",
    "zzhop.d.ts (EmbeddedHost)",
    "zzj16.js (ResidentSession)",
    "zzk/m1.ts (ResidentSession)",
    "zzk/m2.tsx (ResidentSession)",
    "zzk/m3.mts (ResidentSession)",
    "zzk/m4.cts (ResidentSession)",
    "zzk/m5.jsx (ResidentSession)",
    "zzk/m6.mjs (ResidentSession)",
    "zzk/m7.cjs (ResidentSession)",
    "zzk/m8.d.mts (ResidentSession)",
    "zzk/m9.d.cts (ResidentSession)",
  ],
  "local-module": [
    "index.d.ts (EmbeddedHost)",
    "index.js (EmbeddedHost)",
    "protocol.d.ts (EmbeddedHost)",
    "protocol.js (EmbeddedHost and ResidentSession)",
    "zzd16.d.ts (EmbeddedHost and ResidentSession)",
    "zzj16.js (EmbeddedHost and ResidentSession)",
    "zzk/m1.ts (EmbeddedHost and ResidentSession)",
    "zzk/m2.tsx (EmbeddedHost and ResidentSession)",
    "zzk/m3.mts (EmbeddedHost and ResidentSession)",
    "zzk/m4.cts (EmbeddedHost and ResidentSession)",
    "zzk/m5.jsx (EmbeddedHost and ResidentSession)",
    "zzk/m6.mjs (EmbeddedHost and ResidentSession)",
    "zzk/m7.cjs (EmbeddedHost and ResidentSession)",
    "zzk/m8.d.mts (EmbeddedHost and ResidentSession)",
    "zzk/m9.d.cts (EmbeddedHost and ResidentSession)",
  ],
};
/** Each form's words in the WALK claim's module list. */
const READ_FORM_WORDS: Readonly<Record<ExposureForm, string>> = {
  star: "an export * or an export * as of a DEEP module",
  named: "a named re-export of a DEEP class",
  "local-import": "a local export of a class-named import",
  "local-module": "a local export of a default or a namespace import",
};
const WALK_CLAIM: ClaimPart<"walk"> = {
  ...WALK_BASE,
  text: `${WALK_BASE.text} (its plants' modules: ${(Object.keys(READ_FORM_WORDS) as ExposureForm[]).map((form) => `${READ_FORM_WORDS[form]} in ${WALK_READS[form].join(", ")}`).join("; ")})`,
};

/** The forms the WALK reads, each an Exposure's form. */
export const WALK_FORMS: readonly ClaimPart<ExposureForm>[] = [
  claimPart("star")`an ${"export * of a DEEP module"} (its target resolved through RESOLUTION) or an ${"export * as of a DEEP module"} under an identifier whose specifier, a ./ path from a .d.ts or a .js module and a ../ path from a module of another kind, ends .js and holds nothing a step of RESOLUTION's changes, its target its exact path or, from a declaration file, its .d.ts twin (in the types entry its .ts first), neither written export type`,
  claimPart(
    "named",
  )`a named re-export of a DEEP class (${"export { X } from"}, unaliased only in either entry, protocol.d.ts and protocol.js (the module each entry star-exports) and zzhop.d.ts (a .d.ts module three deep from the types entry), or ${"aliased as another name"}, an identifier; in the types entry also ${"type-only by its declaration"} or ${"type-only by its specifier"}, and a clause's member after its first), X ${"an identifier"} or ${"a string export name"} (a string name aliased as an identifier, in either entry or protocol.js), read cooked (${"an identifier escape"} - its plants' \\u0045 as the name's first character in either entry and in protocol.d.ts, a braced \\u{52} first in the types entry and \\u{45} first in protocol.d.ts, and an inner \\u0053 in the main entry - or ${"a string escape"} - its plants' \\x48, \\u{45} and \\u0045 in the types entry and \\x48, \\u0045, a line continuation and a single-character escape in the main entry - reads as the name it spells), and in either entry ${"whatever its specifier resolves to"} (its plants' ./embedded.js and ./resident_session.js, DEEP modules, and ./missing.js, which resolves to nothing, in either entry, the package's own bare name in the types entry and the bare zzgate in the main entry)`,
  claimPart(
    "local-import",
  )`a local export (${"export { x }"}, or ${"aliased on export"} as an identifier) of a name an import specifier binds by a DEEP class's own name in an import clause with no default binding, its import declaration written before the local export or, in protocol.d.ts, ${"written after it"}, that name ${"read cooked"} (its plants' identifier escapes, each in protocol.d.ts: \\u0045 as the first character of an import specifier's name and of a binding's, \\u0053 first in a local export clause's name, ${"a braced escape"} \\u{45} first in an import specifier's name and ${"an inner escape"} \\u0048 in one, Embedded\\u0048ost) and spelled (${"the import aliased"}, ${"a type-only import declaration"}, ${"a type-only import specifier"}, ${"a string import name"}, ${"from a module that is not DEEP"}), each spelling after export { x }, and an import clause's or a local export clause's member after its first, only in protocol.d.ts and protocol.js, the module each entry star-exports (a string import name, which is aliased, in protocol.js, and every other in protocol.d.ts)`,
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
)`each entry's raw text (${"the types entry's"} and ${"the main entry's"}) is read for a DEEP class's name, in its row's letter case, as a whole word (the regex \\b<name>\\b), on the lines its plants append at the entry's end: ${"a name in its code"} (the types entry's identifiers and double-quoted string literals, as its plants write them) and ${"a name in a comment"} (its plants' comments reading <name> stays a deep import, each opening its line but one: ${"a line comment opening its line"}, EmbeddedHost's in the types entry and ResidentSession's in the main entry, and in the types entry EmbeddedHost's ${"line comment written after code on its line"} (after export declare const zzTrail: unique symbol;), ${"block comment on one line"} and ${"block comment spanning three lines"}) alike, ${"escape sequences never decoded"} (those its plants write in either entry: the identifier escapes \\u0045, \\u{52} and an inner \\u0053, the string escapes \\x48, \\u{45} and \\u0045, ${"a legacy octal escape"} (\\105), a single-character escape (\\H), a line continuation, and a \\u0045 in a comment), a name its plants write with a word character (${"an ASCII letter"}, ${"a digit"} or ${"an underscore"}) ${"just before the name"} or ${"just after the name"} not read (MyEmbeddedHost, 2EmbeddedHost, _EmbeddedHost, EmbeddedHostX, EmbeddedHost2 and EmbeddedHost_ in a types-entry line comment, and the types-entry declared names XEmbeddedHost, EmbeddedHostOptions, EmbeddedHosts and ${"MyResidentSession"}), and a name its plants write beside ${"a $"} or ${"a non-ASCII letter"} read, each a word boundary (the types-entry declared names $EmbeddedHost and EmbeddedHost$, and the same two with U+00E9 in place of the $)`;

/** D1's PATH reading of a literal's cooked text, and what it spells or holds. */
const PATH_CLAIM: ClaimPart<"path"> = claimPart(
  "path",
)`a literal's cooked text is read through these steps - ${"every ASCII tab dropped"}, ${"every LF dropped"} and ${"every CR dropped"}, then ${"every %XX escape decoded"} (each %XX of an ASCII code its plants hold: %40, %2F, %2f, %2E and %5C) and then ${"every backslash read as /"}, then posix.normalize (${"empty segments dropped"}, ${". segments dropped"} and ${".. segments resolved"}) - and the text spells a deep @furnace/sdk/<path> when ${"the cooked text itself"} or ${"its PATH reading"} ${"begins with @furnace/sdk/"} or holds ${"node_modules/@furnace/sdk/ at its start"} or ${"node_modules/@furnace/sdk/ after a /"}, and holds one when either ${"holds @furnace/sdk/ anywhere"}`;

/** U1's rendered reading of vendor/README.md. */
const RENDER_CLAIM: ClaimPart<"render"> = claimPart(
  "render",
)`vendor/README.md is read through marked's lexer, each top-level block to its text (its plants' blocks appended at its end, after the real text), ${"whitespace collapsed"} (${"every run one space"}, each run of spaces, tabs and line feeds): a hard line break (a br token, ${"a backslash before a line ending"} or ${"two or more spaces before a line ending"}) reads as the line break marked renders, a space; ${"a list"} (its plants' lists bulleted -, as they write them, a one-item list ${"bulleted +"} and a two-item list ordered 1. and 2.) reads by ${"its items' tokens"}, ${"a table"} by its ${"header cells' tokens"} and ${"row cells' tokens"}, and a token holding tokens (${"a paragraph"}, ${"a heading"} (a ## heading), ${"a blockquote"}, ${"emphasis"}, ${"strong text"} or ${"a link"} (an inline link, or ${"a reference link"} written [text][label] beside its definition)) ${"by those tokens"}; ${"raw HTML"} (${"an HTML block"} holding a comment, or ${"inline HTML"} tags - its plants' <b> and </b>, and ${"<span> and </span>"}, each pair around (wb-zby)), ${"a link-reference definition"} and ${"an image"} (its plants' inline image and ${"a reference image"} written ![alt][label] beside its definition, each with a record as its alt text) read as nothing`;

/** D4's register-method count. */
const REGISTER_CLAIM: ClaimPart<"register"> = claimPart(
  "register",
)`executor.js's register methods are its method declarations written with no modifier and no asterisk, ${"in a class"} or ${"in an object literal"} (each name form below in its plants' unexported class declaration ShimApp at the module's top level; an identifier name in the real tree's exported class declaration ExecutorApp, in ${"a default-exported class declaration"} at the module's top level, named (ShimDefault) or anonymous, in its plants' class expressions - the anonymous one an exported function declaration returns (makeShim), ${"a named class expression"} an exported function declaration returns (NamedShim, in makeNamed), the anonymous one ${"an unexported function declaration"} returns (makeLocal) and the anonymous one that is ${"an arrow function's concise body"} (makeArrow, an exported const declaration's initializer) - and in its plants' object literals, ${"an exported const declaration's initializer"} (shim) and ${"an unexported const declaration's initializer"} (shimLocal); each of its plants' containers appended at the module's end), whose name reads register: ${"an identifier name"} or ${"a string-literal name"} (double-quoted, or ${"single-quoted"}), read cooked (${"an identifier escape"} - its plants' \\u0072 and braced \\u{72}, each the name's first character - or ${"a string escape"} - its plants' \\x65 and \\u0065 for the e before the final r in a double-quoted name, and ${"\\x65 in a single-quoted name"} for the same e - reads as the name it spells), or ${"a computed name"} whose expression, ${"through parentheses"} (its plants' one and two around a double-quoted string literal and one around a template literal), is ${"a computed string literal"}, double-quoted or ${"single-quoted and unparenthesized"}, or ${"a computed no-substitution template literal"}`;

/** Every claim part, in the order the census header states them. */
export const CLAIM_PARTS: readonly ClaimPart[] = [WALK_CLAIM, ...WALK_FORMS, RESOLUTION_CLAIM, DEEP_CLAIM, TEXT_CLAIM, PATH_CLAIM, RENDER_CLAIM, REGISTER_CLAIM];
