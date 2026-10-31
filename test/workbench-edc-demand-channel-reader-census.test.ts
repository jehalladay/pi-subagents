/**
 * wb-pyel.8 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R2, program-triage-2026-10-18 child of wb-pyel; the rule-19 structural exit of
 * wb-pyel.2 under orchestrator rulings R-B122 and R-B156): the census of the EDC demand-channel census's B1 code reader at full
 * surface, test/helpers/edc-demand-channel-reader.ts, which wb-pyel.2's census composes when it re-cuts. Statement (the bead title
 * after its program prefix, as the tracker export holds it; the judged set reads the prefix and the site count it spells): "The B1
 * code reader keeps findings across after-terminator comments (bare()/SENTENCES interaction at the 13 as-written sites) or the
 * COMMENTS/ACCESS claims state the hole, narrowed out of wb-pyel.2's fail-closed core (rule-19 structural exit)". Acceptance (the
 * bead description's Acceptance line, verbatim): "each plant reds the unmodified census and greens under the cure; the
 * COMMENTS/ACCESS claim text and bare()/SENTENCES behavior agree byte-for-byte with the falsifier roster." The cure is the title's
 * first branch: the reader keeps the finding (bare() reads a comment's trivia run right after a token that ends in a terminator as
 * nothing), so there is no hole left to state.
 *
 * THE CLAIMS are the CLAIMS constant (COMMENTS, AS-WRITTEN, CUT and LIVE QUIET, each clause naming the pins whose plants falsify its
 * words), held byte for byte to the roster's claims; every pin is named by a clause and every pin a clause names exists.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns a measured witness - every plant's findings,
 * its LIVE QUIET entries and the texts of its access and import readings, so bare()'s text is held byte for byte - held to the
 * roster, and each pin asserts its own reading's shape by name):
 *  T  the description's first item: its members T-R1 and T-R3 and its control T-R1C, each plant holding the code the item spells;
 *     T-TOKENS one member per token whose text ends in a terminator (every TypeScript punctuator ENDS_IN_TERMINATOR matches, and a
 *     number written with a trailing "."), the comment right after it alone and with white space and a line end around it, each
 *     finding once, beside its twin with white space alone there, which is cut and held.
 *  M  the description's second item: M-AFTER the commentMatrix's after-the-dot rows - every as-written site (the 13 the item
 *     counts) with a block, a line and a JSDoc-style comment holding a marker right after a "." inside the reading; M-BEFORE the
 *     same sites with the comment before that "." or inside the brackets (wb-pyel.2 cut #5's matrix); M-WORDS each site with a
 *     family word only in a comment, which finds nothing, beside its twin with the word as code, which finds; M-JSDOC a JSDoc
 *     comment the parser attaches as a node (a parameter's, a JS type cast's), holding a marker, each finding once.
 *  U  R-B156's first folded member (refusal #5's U1 in wb-pyel.2's notes): U-OWN-LINE a04 and a11, a comment on its own line before
 *     the "."; U-BLANK b01-b03 and b05-b11, a blank, white-space-only or line-start line beside a comment; U-MARKER b04, a marker
 *     across such a run. Each beside its comment-free twin (the comment removed), which is cut there.
 *  C  refusal #5's F3 rider (its quote is the label): C-SPACE white space alone - a space and a line end - right after each token
 *     T-TOKENS names; C-LINES a blank and a white-space-only line, a table-row, a heading and a list-item line (each bullet, and a
 *     number with ")": refusal #5's F4 rider), a blank line and a line end after a "." in a node a comment walks, and a terminator
 *     before white space in a string, a template, a regular expression and JSX text, the F3 members h01, h02, h03, h05 and h06
 *     among them; C-OVER-READ a cut parting a marker away.
 *  P  R-B156's second folded member (refusal #5's U2): P-ONE one parted pair; P-C04 the same pair parted twice in one text; P-C05
 *     two pairs; P-C06 a page with two; P-CODE two pairs in one as-written reading; P-WITHIN a pair one sentence spells beside a
 *     parted occurrence of it.
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set (every row's id, label and pins,
 * every pin's witness, the claims, the kills and every registered test title) is held to the out-of-file roster
 * (test/fixtures/edc-demand-channel-reader-roster.json). OUTSIDE ANCHORS: the tracker export (.beads/issues.jsonl), each line read
 * at its first occurrence (notes are append-only): rows T and M are the description's two items (T's label its first sentence, its
 * members the ids the item names, each plant holding the code the item spells; M's label its first clause and its site count the
 * number the item spells); rows U and P are the two members R-B156's note folds into this bead, and KILLS holds exactly the gate
 * mutants that note names and refusal #5's F4 mutant GM7, each mapped to the pins measured red under it; U holds exactly the member
 * ids refusal #5's U1 line names, P the ids its U2 line names and C the ids its F3 line names. The TypeScript compiler anchors
 * T-TOKENS and C-SPACE (one member per punctuator whose text ENDS_IN_TERMINATOR matches, plus the number; each T-TOKENS plant's
 * comment scanned right after its own token) and the comment kinds (every *CommentTrivia kind of ts.SyntaxKind and the JSDoc form); the
 * helper's SENTENCES rules anchor C-LINES (a member per line rule, per bullet and for the ")" number). The last case reads the
 * vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins that reached their witness.
 * NOT CLAIMED: the helper's other readings - WORDS, the demand reading of one sentence, CONSTANT, LEXEME, MEMBER and IMPORT but the
 * import-equals entity - SENTENCES' cuts of a lexeme or a member path, and LIVE QUIET's holding of each quiet reading's
 * occurrences, which wb-pyel.2's census claims and pins (cut #5 over its own copy of this code, its re-cut over this helper); and
 * (edits of this file and the roster together) a plant removed from its table and the roster where no outside anchor names it: the
 * authored forms b03, b05 and b09 (refusal #5 names them without their bytes), every twin, the white-space and line-end variants,
 * the walked-node lines, the string and template terminators, the M-JSDOC members, P-ONE, P-CODE and P-WITHIN.
 * RESIDUALS (named; each member with its pinned quiet reading in its row): R-CUT (row C) a subject and a family on two sides of a
 * cut read no finding, each member held by LIVE QUIET (fail closed).
 *
 * Display paths added: none. Test-only and hermetic: every plant is read in memory; the bead export and the roster are only read.
 * Input-hygiene pins only: no security claim is made here.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { codeSites, ENDS_IN_TERMINATOR, HEADING, isModule, LIST_ITEM, survey, TABLE_ROW, TERMINATOR } from "./helpers/edc-demand-channel-reader.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly { readonly id: string; readonly witness: Json }[];
}
interface Roster {
  readonly claims: Json;
  readonly kills: Json;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(REPO, "test", "fixtures", "edc-demand-channel-reader-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-pyel.8";
const PARENT = "wb-pyel.2";
const TITLE_PREFIX = "[SDK-EVIDENCE-DIRECTED-COMPUTATION-R2] ";
const PLANT = "src/plant.ts";
const PLANT_TSX = "src/plant.tsx";
const PAGE = ".pi/agents/plant.md";

// ---------------------------------------------------------------------------------------------------------------- the claims
const CLAIMS: { readonly [clause: string]: string } = {
  COMMENTS:
    "bare() reads a node as written: its tokens' own text in order, the trivia between two tokens kept as written when it is white space alone, in a node a comment walks too (C-LINES). A trivia run that holds a comment - a block, a line or a JSDoc-style comment, a JSDoc comment the parser attaches as a node too (its node is no token: M-JSDOC) - is read whole, its white space, line ends, blank and white-space-only lines with it: as nothing right after a token whose text ends in a terminator (the '.', '...', ';', '?.', '!', '?' and '??' punctuators and a number written with a trailing '.'), so the reading reads on uncut there (T-R1, T-R3, T-TOKENS, M-AFTER); and as one space anywhere else (T-R1C, M-BEFORE), where a line boundary the run holds cuts nothing either - a subject and a family across it find (U-OWN-LINE, U-BLANK) and a marker across it quiets the reading, which LIVE QUIET holds (U-MARKER). So no comment cuts an as-written reading, a marker in a comment quiets nothing (M-AFTER, M-BEFORE) and a family word in a comment finds nothing (M-WORDS).",
  "AS-WRITTEN":
    "The as-written readings are the 13 sites bare() reads: a property access, a qualified name, an element access's receiver, an indexed access type's object type, an object binding pattern's receiver (a variable's initializer, a for-of's and a for-in's iterated expression, a parameter's type annotation and its default value), a destructuring assignment's receiver (the assigned expression, a for-of's and a for-in's iterated expression) and an import-equals entity name - each read with every comment kind right after a '.' inside it (M-AFTER) and before that '.' or inside its brackets (M-BEFORE), one finding each.",
  CUT: "SENTENCES cuts an as-written reading where its text holds a boundary as written: white space alone - a space or a line end - right after a token that ends in a terminator (C-SPACE), a blank or white-space-only line, a line read as a table row, a heading or a list item (a '-', '+' or '*' bullet, or a number with ')'; a number with '.' is a terminator cut, C-SPACE), or a terminator before white space inside a string, a template, a regular expression or JSX text the reading holds (C-LINES). A subject and a family on two sides of a cut read no finding while the uncut twin finds once, every cut member is held by LIVE QUIET (fail closed: the residual R-CUT), and a cut can part a marker away, which then finds (C-OVER-READ).",
  "LIVE QUIET":
    "quietOf holds, beside the quiet readings of one text, every carrier pair whose two words a sentence cut parts - each occurrence of each pair, in a code reading and across a page's sentences - as '<where> parted:carrier <pair>' (P-ONE, P-C04, P-C05, P-C06, P-CODE); a pair one sentence spells is a finding and is held as parted nowhere, while a parted occurrence of the same pair beside it is held (P-WITHIN).",
};

// ------------------------------------------------------------------------------------------------------------------ the rows
const ROWS: readonly Row[] = [
  { id: "T", label: 'After-terminator comment positions: a comment following "." / "?." / "!" in a property access or qualified name must keep the reading\'s finding.', pins: ["T-R1", "T-R3", "T-R1C", "T-TOKENS"] },
  { id: "M", label: "The commentMatrix gains after-the-dot rows for every as-written site (13 sites)", pins: ["M-AFTER", "M-BEFORE", "M-WORDS", "M-JSDOC"] },
  {
    id: "U",
    label:
      "the restated COMMENTS clause (:51-63) claims more than the reader proves - under the delivered reader the comment-free-twin equivalence is false wherever a comment's trivia holds a blank line, a whitespace-only line or a line-start boundary; the wording 'read as one space, a white space like any other' survives gate mutant GM3",
    pins: ["U-OWN-LINE", "U-BLANK", "U-MARKER"],
  },
  { id: "C", label: "the boundary kinds an as-written reading can hold are listed, each pinned", pins: ["C-SPACE", "C-LINES", "C-OVER-READ"] },
  { id: "P", label: "LIVE QUIET's new parted-carrier holding is unpinned past the first parted pair of a text - GM1 and GM2 survive at 10 passed (10)", pins: ["P-ONE", "P-C04", "P-C05", "P-C06", "P-CODE", "P-WITHIN"] },
];

// ---------------------------------------------------------------------------------------------------------------- the plants
/** Row T's members, as the description's first item spells them (R1, R3 and the control R1c). */
const T_MEMBERS: Readonly<Record<string, readonly [pin: string, plant: string]>> = {
  R1: ["T-R1", "export const value = context./* not */demand;\n"],
  R3: ["T-R3", "import demand = Context./* not */Inner;\nexport { demand };\n"],
  R1c: ["T-R1C", "export const value = context/* not */.demand;\n"],
};
/** T-TOKENS: per token whose text ends in a terminator, the comment right after it alone, the comment with white space and a line
 * end around it (one run, read whole), and the twin with white space alone there (cut). */
const TOKEN_PLANTS: Readonly<Record<string, readonly [plant: string, wide: string, space: string]>> = {
  ".": ["export type Value = Context./* no */Demand;\n", "export type Value = Context. /* no */\n  Demand;\n", "export type Value = Context. Demand;\n"],
  "...": ['export const value = [context, .../* no */rest]["demand"];\n', 'export const value = [context, ... /* no */\n  rest]["demand"];\n', 'export const value = [context, ... rest]["demand"];\n'],
  ";": ['export type Value = { context: 1;/* no */other: 2 }["demand"];\n', 'export type Value = { context: 1; /* no */\n  other: 2 }["demand"];\n', 'export type Value = { context: 1; other: 2 }["demand"];\n'],
  "?.": ["export const value = context?./* not */demand;\n", "export const value = context?. /* not */\n  demand;\n", "export const value = context?. demand;\n"],
  "!": ["export const value = context!/* not */.demand;\n", "export const value = context! /* not */\n  .demand;\n", "export const value = context! .demand;\n"],
  "?": ['export const value = (context ?/* no */a : b)["demand"];\n', 'export const value = (context ? /* no */\n  a : b)["demand"];\n', 'export const value = (context ? a : b)["demand"];\n'],
  "??": ['export const value = (context ??/* no */other)["demand"];\n', 'export const value = (context ?? /* no */\n  other)["demand"];\n', 'export const value = (context ?? other)["demand"];\n'],
  "1.": ['export const value = (context, 1./* no */)["demand"];\n', 'export const value = (context, 1. /* no */\n  )["demand"];\n', 'export const value = (context, 1. )["demand"];\n'],
};
/** The number form ENDS_IN_TERMINATOR reads beside the punctuators: a numeric literal written with a trailing ".". */
const NUMBER_TOKEN = "1.";
/** The comment kinds (B1's commentMatrix): a block, a line and a JSDoc-style comment, each holding a marker. */
const COMMENT_KINDS: Readonly<Record<string, string>> = { block: "/* not */", line: "// not\n", jsdocStyle: "/** never */" };
/** M-AFTER: every as-written site with the comment right after a "." inside the reading. */
const AFTER_SITES: Readonly<Record<string, (comment: string) => string>> = {
  propertyAccess: comment => `export const value = context.${comment}demand;\n`,
  qualifiedName: comment => `export type Value = Context.${comment}Demand;\n`,
  elementReceiver: comment => `export const value = (context.${comment}inner)["demand"];\n`,
  indexedObject: comment => `export type Value = Opts<Context.${comment}Inner>["demand"];\n`,
  bindingInitializer: comment => `export function read(opts: Options): unknown {\n  const { demand } = context.${comment}inner;\n  return demand;\n}\n`,
  bindingForOf: comment => `export function read(opts: Options): unknown {\n  for (const { demand } of contexts.${comment}items) return demand;\n  return undefined;\n}\n`,
  bindingForIn: comment => `export function read(opts: Options): unknown {\n  for (const { demand } in contexts.${comment}items) return demand;\n  return undefined;\n}\n`,
  parameterType: comment => `export function read({ demand }: Context.${comment}Inner): unknown {\n  return demand;\n}\n`,
  parameterDefault: comment => `export function read({ demand } = context.${comment}inner): unknown {\n  return demand;\n}\n`,
  assignment: comment => `export let demand: unknown;\n({ demand } = context.${comment}inner);\n`,
  assignmentForOf: comment => `export let demand: unknown;\nfor ({ demand } of contexts.${comment}items) break;\n`,
  assignmentForIn: comment => `export let demand: unknown;\nfor ({ demand } in contexts.${comment}items) break;\n`,
  importEntity: comment => `import demand = Context.${comment}Inner;\nexport { demand };\n`,
};
/** M-BEFORE: every as-written site with the comment before its "." or inside its brackets (wb-pyel.2 cut #5's commentMatrix). */
const BEFORE_SITES: Readonly<Record<string, (comment: string) => string>> = {
  propertyAccess: comment => `export const value = context${comment}.demand;\n`,
  qualifiedName: comment => `export type Value = Context${comment}.Demand;\n`,
  elementReceiver: comment => `export const value = (context ${comment})["demand"];\n`,
  indexedObject: comment => `export type Value = Opts<${comment} Context>["demand"];\n`,
  bindingInitializer: comment => `export function read(opts: Options): unknown {\n  const { demand } = (context ${comment});\n  return demand;\n}\n`,
  bindingForOf: comment => `export function read(opts: Options): unknown {\n  for (const { demand } of (contexts ${comment})) return demand;\n  return undefined;\n}\n`,
  bindingForIn: comment => `export function read(opts: Options): unknown {\n  for (const { demand } in (contexts ${comment})) return demand;\n  return undefined;\n}\n`,
  parameterType: comment => `export function read({ demand }: Opts<${comment} Context>): unknown {\n  return demand;\n}\n`,
  parameterDefault: comment => `export function read({ demand } = (context ${comment})): unknown {\n  return demand;\n}\n`,
  assignment: comment => `export let demand: unknown;\n({ demand } = (context ${comment}));\n`,
  assignmentForOf: comment => `export let demand: unknown;\nfor ({ demand } of (contexts ${comment})) break;\n`,
  assignmentForIn: comment => `export let demand: unknown;\nfor ({ demand } in (contexts ${comment})) break;\n`,
  importEntity: comment => `import demand = Context${comment}.Inner;\nexport { demand };\n`,
};
/** M-WORDS: every as-written site with a family word only in a comment inside the node, beside its twin with the word as code
 * (wb-pyel.2 cut #5's comments witness). */
const WORD_PLANTS: Readonly<Record<string, readonly [plant: string, twin: string]>> = {
  propertyAccess: ["export const value = context./* demand */size;\n", "export const value = context.demand.size;\n"],
  qualifiedName: ["export type Value = Context./* demand */Size;\n", "export type Value = Context.Demand.Size;\n"],
  elementReceiver: ['export const value = (context /* demand */)["size"];\n', 'export const value = (context.demand)["size"];\n'],
  indexedObject: ['export type Value = Opts</* demand */ Context>["size"];\n', 'export type Value = Opts<Demand, Context>["size"];\n'],
  bindingInitializer: ["export function read(opts: Options): unknown {\n  const { size } = (context /* demand */);\n  return size;\n}\n", "export function read(opts: Options): unknown {\n  const { size } = (context.demand);\n  return size;\n}\n"],
  bindingForOf: ["export function read(opts: Options): unknown {\n  for (const { size } of (contexts /* demand */)) return size;\n  return undefined;\n}\n", "export function read(opts: Options): unknown {\n  for (const { size } of (contexts.demand)) return size;\n  return undefined;\n}\n"],
  bindingForIn: ["export function read(opts: Options): unknown {\n  for (const { size } in (contexts /* demand */)) return size;\n  return undefined;\n}\n", "export function read(opts: Options): unknown {\n  for (const { size } in (contexts.demand)) return size;\n  return undefined;\n}\n"],
  parameterType: ["export function read({ size }: Opts</* demand */ Context>): unknown {\n  return size;\n}\n", "export function read({ size }: Opts<Demand, Context>): unknown {\n  return size;\n}\n"],
  parameterDefault: ["export function read({ size } = (context /* demand */)): unknown {\n  return size;\n}\n", "export function read({ size } = (context.demand)): unknown {\n  return size;\n}\n"],
  assignment: ["export let size: unknown;\n({ size } = (context /* demand */));\n", "export let size: unknown;\n({ size } = (context.demand));\n"],
  assignmentForOf: ["export let size: unknown;\nfor ({ size } of (contexts /* demand */)) break;\n", "export let size: unknown;\nfor ({ size } of (contexts.demand)) break;\n"],
  assignmentForIn: ["export let size: unknown;\nfor ({ size } in (contexts /* demand */)) break;\n", "export let size: unknown;\nfor ({ size } in (contexts.demand)) break;\n"],
  importEntity: ["import size = Context/* demand */.Inner;\nexport { size };\n", "import size = Context.Demand.Inner;\nexport { size };\n"],
};
/** M-JSDOC: a JSDoc comment the parser attaches as a node inside an as-written reading (a parameter's, and a JS type cast's), each
 * holding a marker: the node is no token, so its text is read with the run around it, as one space. */
const JSDOC_PLANTS: Readonly<Record<string, readonly [path: string, plant: string]>> = {
  parameter: [PLANT, 'export const value = ((/** never */ context: 1) => 1)["demand"];\n'],
  jsCast: ["src/plant.js", "export const value = (/** @type {Never} */ (context)).demand;\n"],
};
/** Row U's members, each beside its comment-free twin (only the comment removed): refusal #5's U1 forms, the record's bytes where
 * it spells them; b03, b05 and b09 (named as own-line forms, not spelled) authored here as the own-line forms of b01, b10 and b08. */
const LINE_PLANTS: Readonly<Record<string, readonly [pin: string, plant: string, twin: string]>> = {
  a04: ["U-OWN-LINE", "export const value = context\n  // not\n  .demand;\n", "export const value = context\n  \n  .demand;\n"],
  a11: ["U-OWN-LINE", "export const value = context\n  /** never */\n  .demand;\n", "export const value = context\n  \n  .demand;\n"],
  b01: ["U-BLANK", "export const value = context/* x */\n\n  .demand;\n", "export const value = context\n\n  .demand;\n"],
  b02: ["U-BLANK", "export const value = context\n\n  /* x */.demand;\n", "export const value = context\n\n  .demand;\n"],
  b03: ["U-BLANK", "export const value = context\n  /* x */\n\n  .demand;\n", "export const value = context\n  \n\n  .demand;\n"],
  b05: ["U-BLANK", "export type Value = Context\n  /* x */\n\n  .Demand;\n", "export type Value = Context\n  \n\n  .Demand;\n"],
  b06: ["U-BLANK", 'export const value = (context /* x */\n  + other)["demand"];\n', 'export const value = (context \n  + other)["demand"];\n'],
  b07: ["U-BLANK", 'export type Value = (Context /* x */\n  | Other)["demand"];\n', 'export type Value = (Context \n  | Other)["demand"];\n'],
  b08: ["U-BLANK", 'export const value = (context /* x */\n\n  && other)["demand"];\n', 'export const value = (context \n\n  && other)["demand"];\n'],
  b09: ["U-BLANK", 'export const value = (context\n  /* x */\n\n  && other)["demand"];\n', 'export const value = (context\n  \n\n  && other)["demand"];\n'],
  b10: ["U-BLANK", "export type Value = Context/* x */\n\n  .Demand;\n", "export type Value = Context\n\n  .Demand;\n"],
  b11: ["U-BLANK", "export function read(opts: Options): unknown {\n  const { demand } = (context /* x */\n\n  );\n  return demand;\n}\n", "export function read(opts: Options): unknown {\n  const { demand } = (context \n\n  );\n  return demand;\n}\n"],
  b04: ["U-MARKER", "export const value = never/* x */\n\n  .context.demand;\n", "export const value = never\n\n  .context.demand;\n"],
};
/** C-SPACE: per token T-TOKENS names, white space alone right after it - a space, then a line end - beside the uncut twin. */
const SPACE_PLANTS: Readonly<Record<string, readonly [space: string, lineEnd: string, twin: string]>> = {
  ".": ["export const value = context. demand;\n", "export const value = context.\n  demand;\n", "export const value = context.demand;\n"],
  "...": ['export const value = [context, ... rest]["demand"];\n', 'export const value = [context, ...\n  rest]["demand"];\n', 'export const value = [context, ...rest]["demand"];\n'],
  ";": ['export type Value = { context: 1; other: 2 }["demand"];\n', 'export type Value = { context: 1;\n  other: 2 }["demand"];\n', 'export type Value = { context: 1, other: 2 }["demand"];\n'],
  "?.": ["export const value = context?. demand;\n", "export const value = context?.\n  demand;\n", "export const value = context?.demand;\n"],
  "!": ["export const value = context! .demand;\n", "export const value = context!\n  .demand;\n", "export const value = context!.demand;\n"],
  "?": ['export const value = (context ? a : b)["demand"];\n', 'export const value = (context ?\n  a : b)["demand"];\n', 'export const value = (context ?a : b)["demand"];\n'],
  "??": ['export const value = (context ?? other)["demand"];\n', 'export const value = (context ??\n  other)["demand"];\n', 'export const value = (context ??other)["demand"];\n'],
  "1.": ['export const value = (context, 1. )["demand"];\n', 'export const value = (context, 1.\n  )["demand"];\n', 'export const value = (context, 1.)["demand"];\n'],
};
/** C-LINES: one plant per line rule, bullet and in-token terminator, each beside its uncut twin; the F3 members by their ids. */
const LINE_CUTS: Readonly<Record<string, readonly [path: string, plant: string, twin: string]>> = {
  "blank-line": [PLANT, 'export const value = (context\n\n  && other)["demand"];\n', 'export const value = (context\n  && other)["demand"];\n'],
  "white-space-line": [PLANT, 'export const value = (context\n   \n  && other)["demand"];\n', 'export const value = (context\n  && other)["demand"];\n'],
  "blank-line-walked": [PLANT, 'export const value = (context /* x */ &&\n\n  other)["demand"];\n', 'export const value = (context /* x */ &&\n  other)["demand"];\n'],
  "line-end-walked": [PLANT, "export const value = context/* x */.inner.\n  demand;\n", "export const value = context/* x */.inner\n  .demand;\n"],
  "table-row-line": [PLANT, 'export type Value = (\n  | Context\n  | Other\n)["demand"];\n', 'export type Value = (Context | Other)["demand"];\n'],
  "list-item-dash": [PLANT, 'export const value = (context\n  - other)["demand"];\n', 'export const value = (context -\n  other)["demand"];\n'],
  "list-item-plus": [PLANT, 'export const value = (context\n  + other)["demand"];\n', 'export const value = (context +\n  other)["demand"];\n'],
  "list-item-star": [PLANT, 'export const value = (context\n  * other)["demand"];\n', 'export const value = (context *\n  other)["demand"];\n'],
  h06: [PLANT, `export const value = (context + \`\n1) x\`)["demand"];\n`, `export const value = (context + \`1) x\`)["demand"];\n`],
  h01: [PLANT, `export const value = (context + \`\n# x\`)["demand"];\n`, `export const value = (context + \`# x\`)["demand"];\n`],
  h05: [PLANT_TSX, 'export const value = (<b>context\n# x</b>)["demand"];\n', 'export const value = (<b>context # x</b>)["demand"];\n'],
  "terminator-in-string": [PLANT, 'export const value = (context + ". ")["demand"];\n', 'export const value = (context + ".")["demand"];\n'],
  "terminator-in-template": [PLANT, `export const value = (context + \`a. b\`)["demand"];\n`, `export const value = (context + \`a.b\`)["demand"];\n`],
  h02: [PLANT, 'export const value = (context, /a. b/)["demand"];\n', 'export const value = (context, /a.b/)["demand"];\n'],
  h03: [PLANT_TSX, 'export const value = (<b>context. x</b>)["demand"];\n', 'export const value = (<b>context x</b>)["demand"];\n'],
};
/** C-OVER-READ: a cut (white space right after the ".") parts the marker away, so the cut reading finds; its uncut twin is quiet. */
const OVER_READ: readonly [cut: string, twin: string] = ['export const value = (never. context)["demand"];\n', 'export const value = (never.context)["demand"];\n'];
/** Row P's plants (LIVE QUIET's parted holding); c04-c06 are refusal #5's U2 witnesses (c04 in the record's words). */
const PARTED_PLANTS: Readonly<Record<string, readonly [path: string, text: string]>> = {
  "P-ONE": [PLANT, 'export const prompt = "Send the projection. Requirement first.";\n'],
  "P-C04": [PLANT, 'export const prompt = "Send the projection. Requirement one, then the projection. Requirement two.";\n'],
  "P-C05": [PLANT, 'export const prompt = "Send the projection. Requirement one, then the projection. Requirements two.";\n'],
  "P-C06": [PAGE, "Send the projection.\nRequirement one.\n\nThen the projection.\nRequirement two.\n"],
  "P-CODE": [PLANT, 'export const value = (projection. requirement, projection. requirements)["size"];\n'],
  "P-WITHIN": [PLANT, 'export const prompt = "Send the projection requirement. Then the projection. Requirement two.";\n'],
};
/** The parted entries each P plant holds, by text: [reading, count] (asserted beside the roster's witness). */
const PARTED_COUNTS: Readonly<Record<string, readonly (readonly [entry: string, count: number])[]>> = {
  "P-ONE": [["src/plant.ts lexeme parted:carrier projection requirement", 1]],
  "P-C04": [["src/plant.ts lexeme parted:carrier projection requirement", 2]],
  "P-C05": [
    ["src/plant.ts lexeme parted:carrier projection requirement", 1],
    ["src/plant.ts lexeme parted:carrier projection requirements", 1],
  ],
  "P-C06": [[".pi/agents/plant.md parted:carrier projection requirement", 2]],
  "P-CODE": [
    ["src/plant.ts access parted:carrier projection requirement", 2],
    ["src/plant.ts access parted:carrier projection requirements", 2],
  ],
  "P-WITHIN": [["src/plant.ts lexeme parted:carrier projection requirement", 1]],
};
/** The gate mutants R-B156's note names and refusal #5's F4 mutant, each with the pins measured red under it at cut time (GM3
 * transplanted as the record words it: each comment read as one space, the rest of its run kept). */
const KILLS: Readonly<Record<string, readonly string[]>> = {
  GM3: ["T-R1", "T-R3", "T-TOKENS", "M-AFTER", "M-BEFORE", "M-WORDS", "M-JSDOC", "U-OWN-LINE", "U-BLANK", "U-MARKER", "C-LINES"],
  GM1: ["P-C04", "P-C06", "P-WITHIN"],
  GM2: ["P-C04", "P-C05", "P-C06", "P-CODE"],
  GM7: ["C-LINES"],
};

// ------------------------------------------------------------------------------------------------------------- the readings
interface PlantReading {
  readonly findings: string[];
  readonly quiet: string[];
  readonly asWritten: string[];
}
/** One plant read alone: its findings, its LIVE QUIET entries and its access and import readings' texts (bare()'s text). */
function read(text: string, path = PLANT): PlantReading {
  const pass = survey([[path, text]]);
  const asWritten = isModule(path) ? codeSites(path, text).flatMap(site => (site.via === "access" || site.via === "import" ? [site.text] : [])) : [];
  return { findings: pass.findings, quiet: pass.quiet, asWritten };
}
const json = (reading: PlantReading): Json => ({ findings: reading.findings, quiet: reading.quiet, asWritten: reading.asWritten });
/** A plant that must find exactly once (named in the failure). */
function findsOnce(what: string, text: string, path = PLANT): Json {
  const reading = read(text, path);
  expect(reading.findings, `${what} finds once`).toHaveLength(1);
  return json(reading);
}
/** A plant that must find (its readings, every one, are the witness's). */
function finds(what: string, text: string, path = PLANT): Json {
  const reading = read(text, path);
  expect(reading.findings.length, `${what} finds`).toBeGreaterThan(0);
  return json(reading);
}
/** A plant SENTENCES cuts: no finding, and LIVE QUIET holds its parts (fail closed). */
function cut(what: string, text: string, path = PLANT): Json {
  const reading = read(text, path);
  expect(reading.findings, `${what} is cut: no finding`).toEqual([]);
  expect(reading.quiet.length, `${what} is held by LIVE QUIET`).toBeGreaterThan(0);
  return json(reading);
}
/** The text and kind of the token right before a plant's first comment (the TypeScript scanner). */
function tokenBeforeComment(text: string): { readonly text: string; readonly kind: ts.SyntaxKind } {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text);
  let before = { text: "", kind: ts.SyntaxKind.Unknown };
  for (let kind = scanner.scan(); kind !== ts.SyntaxKind.EndOfFileToken; kind = scanner.scan()) {
    if (kind === ts.SyntaxKind.SingleLineCommentTrivia || kind === ts.SyntaxKind.MultiLineCommentTrivia) return before;
    if (kind !== ts.SyntaxKind.WhitespaceTrivia && kind !== ts.SyntaxKind.NewLineTrivia) before = { text: scanner.getTokenText(), kind };
  }
  return before;
}
/** Whether the parser attaches a JSDoc comment as a node anywhere in a plant (a child ts.isJSDoc reads, as the helper's tokensOf). */
function hasJSDocNode(text: string, path: string): boolean {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, path.endsWith(".js") ? ts.ScriptKind.JS : ts.ScriptKind.TS);
  const attached = (node: ts.Node): boolean => node.getChildren(source).some(child => ts.isJSDoc(child)) || node.getChildren(source).some(attached);
  return attached(source);
}
/** Every TypeScript punctuator whose text ENDS_IN_TERMINATOR matches, in the compiler's order, and the number form. */
function terminatorTokens(): string[] {
  const punctuators: string[] = [];
  for (let kind = ts.SyntaxKind.FirstPunctuation; kind <= ts.SyntaxKind.LastPunctuation; kind++) {
    const text = ts.tokenToString(kind);
    if (text !== undefined && ENDS_IN_TERMINATOR.test(text)) punctuators.push(text);
  }
  return [...punctuators, NUMBER_TOKEN];
}
/** Every comment trivia kind of ts.SyntaxKind, by name (each name looked up, never reverse-mapped: the enum holds aliases). */
const COMMENT_TRIVIA = Object.keys(ts.SyntaxKind).filter(name => name.endsWith("CommentTrivia")) as (keyof typeof ts.SyntaxKind)[];
/** The comment forms the compiler tells apart: every comment trivia kind, and the JSDoc form ("/**", parsed as a JSDoc node). */
function commentForms(): string[] {
  return [...COMMENT_TRIVIA, "JSDoc"].sort();
}
function commentFormOf(comment: string): string {
  const range = ts.getLeadingCommentRanges(comment, 0)?.[0];
  if (range === undefined) return "none";
  return comment.startsWith("/**") ? "JSDoc" : (COMMENT_TRIVIA.find(name => ts.SyntaxKind[name] === range.kind) ?? "unknown");
}
/** The SENTENCES line rule each C-LINES plant's access readings exercise (blank, table row, heading, a bullet, the ")" number). */
function lineRulesOf(text: string, path: string): string[] {
  const lines = read(text, path).asWritten.flatMap(reading => reading.split("\n").slice(1));
  return lines.flatMap(line => {
    if (line.trim() === "") return ["blank"];
    if (TABLE_ROW.test(line)) return ["table-row"];
    if (HEADING.test(line)) return ["heading"];
    if (!LIST_ITEM.test(line)) return [];
    const marker = line.trim();
    const numbered = /^\d+([.)])/.exec(marker);
    return [numbered === null ? `item ${marker.charAt(0)}` : `item #${numbered[1]}`];
  });
}
/** The line rules the helper's SENTENCES holds: a blank line, a table row, a heading, each LIST_ITEM bullet and its numbered
 * forms but "." (a terminator, C-SPACE), read from the rules' own sources. */
function sentenceRules(): string[] {
  const list = /\[([^\]]+)\]\|\\d\+\[([^\]]+)\]/.exec(LIST_ITEM.source);
  expect(list, "LIST_ITEM holds a bullet class and a numbered class").not.toBeNull();
  const bullets = [...(list?.[1] ?? "")].map(bullet => `item ${bullet}`);
  const numbers = [...(list?.[2] ?? "")].filter(mark => !new RegExp(TERMINATOR.source).test(`${mark} `)).map(mark => `item #${mark}`);
  return ["blank", "table-row", "heading", ...bullets, ...numbers].sort();
}

// ---------------------------------------------------------------------------------------------------------- the out-of-file roster
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function asJson(value: unknown, at: string): Json {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((item, index) => asJson(item, `${at}[${index}]`));
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, asJson(item, `${at}.${key}`)]));
  throw new Error(`${at} is not JSON`);
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case reads a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) throw new Error(`the roster must be an object for ${BEAD} with rows and tests`);
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number) => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: asJson(pin.witness, `rows[${index}].pins[${at}].witness`) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const tests = raw.tests.map((title: unknown, index: number) => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a title`);
    return title;
  });
  return { claims: asJson(raw.claims, "claims"), kills: asJson(raw.kills, "kills"), tests, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// -------------------------------------------------------------------------------------------------------------- the tracker export
interface ExportRow {
  readonly title: string;
  readonly description: string;
  readonly notes: string;
}
/** A bead's row in the tracker export (each line prefiltered by its id, then parsed and matched exactly). */
function exportRow(id: string): ExportRow {
  const needle = `"id":${JSON.stringify(id)}`;
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(needle)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return { title: typeof row.title === "string" ? row.title : "", description: typeof row.description === "string" ? row.description : "", notes: typeof row.notes === "string" ? row.notes : "" };
  }
  return { title: "", description: "", notes: "" };
}
/** A text's first line starting with a prefix (an append-only record keeps it first), or "". */
function firstLine(text: string, prefix: string): string {
  return text.split("\n").find(line => line.startsWith(prefix)) ?? "";
}
/** The distinct matches of a pattern in a line, in the order they first appear. */
function idsIn(line: string, pattern: RegExp): string[] {
  return [...new Set(line.match(pattern) ?? [])];
}
/** The text between two markers of a line (both present), or "". */
function between(line: string, open: string, close: string): string {
  const from = line.indexOf(open);
  const to = line.indexOf(close, from + open.length);
  return from === -1 || to === -1 ? "" : line.slice(from + open.length, to);
}

// ------------------------------------------------------------------------------------------------------------------- the pins
const REACHED: string[] = [];
const IMPL: Readonly<Record<string, () => Json>> = {
  ...Object.fromEntries(Object.entries(T_MEMBERS).map(([member, [pin, plant]]) => [pin, () => findsOnce(member, plant)])),
  "T-TOKENS": () =>
    Object.fromEntries(
      Object.entries(TOKEN_PLANTS).map(([token, [plant, wide, space]]) => {
        expect(tokenBeforeComment(plant).text, `the ${token} plant's comment stands right after its token`).toBe(token);
        expect(tokenBeforeComment(wide).text, `the ${token} wide plant's comment run stands right after its token`).toBe(token);
        return [token, { plant: findsOnce(`${token} comment`, plant), wide: findsOnce(`${token} comment run`, wide), space: cut(`${token} white space`, space) }];
      }),
    ),
  "M-AFTER": () =>
    Object.fromEntries(
      Object.entries(AFTER_SITES).flatMap(([site, plant]) =>
        Object.entries(COMMENT_KINDS).map(([kind, comment]) => {
          expect(tokenBeforeComment(plant(comment)).text, `${site}.${kind}: the comment stands right after a "."`).toBe(".");
          return [`${site}.${kind}`, findsOnce(`${site}.${kind}`, plant(comment))];
        }),
      ),
    ),
  "M-BEFORE": () => Object.fromEntries(Object.entries(BEFORE_SITES).flatMap(([site, plant]) => Object.entries(COMMENT_KINDS).map(([kind, comment]) => [`${site}.${kind}`, findsOnce(`${site}.${kind}`, plant(comment))]))),
  "M-WORDS": () =>
    Object.fromEntries(
      Object.entries(WORD_PLANTS).map(([site, [plant, twin]]) => {
        const comment = read(plant);
        expect(comment.findings, `${site}: a family word in a comment finds nothing`).toEqual([]);
        return [site, { plant: json(comment), twin: finds(`${site} twin`, twin) }];
      }),
    ),
  "M-JSDOC": () =>
    Object.fromEntries(
      Object.entries(JSDOC_PLANTS).map(([member, [path, plant]]) => {
        expect(hasJSDocNode(plant, path), `${member}: the parser attaches its comment as a JSDoc node`).toBe(true);
        return [member, findsOnce(member, plant, path)];
      }),
    ),
  ...Object.fromEntries(
    ["U-OWN-LINE", "U-BLANK"].map(pin => [
      pin,
      () => Object.fromEntries(Object.entries(LINE_PLANTS).flatMap(([member, [owner, plant, twin]]) => (owner === pin ? [[member, { plant: findsOnce(member, plant), twin: cut(`${member} twin`, twin) }]] : []))),
    ]),
  ),
  "U-MARKER": () =>
    Object.fromEntries(
      Object.entries(LINE_PLANTS).flatMap(([member, [owner, plant, twin]]) => {
        if (owner !== "U-MARKER") return [];
        const quieted = read(plant);
        expect(quieted.findings, `${member}: the marker across the run quiets the reading`).toEqual([]);
        expect(
          quieted.quiet.filter(entry => entry.includes(" marker:")),
          `${member}: LIVE QUIET holds the marker reading`,
        ).not.toEqual([]);
        return [[member, { plant: json(quieted), twin: findsOnce(`${member} twin`, twin) }]];
      }),
    ),
  "C-SPACE": () => Object.fromEntries(Object.entries(SPACE_PLANTS).map(([token, [space, lineEnd, twin]]) => [token, { space: cut(`${token} space`, space), lineEnd: cut(`${token} line end`, lineEnd), twin: findsOnce(`${token} twin`, twin) }])),
  "C-LINES": () => Object.fromEntries(Object.entries(LINE_CUTS).map(([member, [path, plant, twin]]) => [member, { plant: cut(member, plant, path), twin: findsOnce(`${member} twin`, twin, path) }])),
  "C-OVER-READ": () => {
    const twin = read(OVER_READ[1]);
    expect(twin.findings, "the uncut twin is quiet by its marker").toEqual([]);
    return { cut: findsOnce("the cut reading", OVER_READ[0]), twin: json(twin) };
  },
  ...Object.fromEntries(
    Object.entries(PARTED_PLANTS).map(([pin, [path, text]]) => [
      pin,
      () => {
        const reading = read(text, path);
        const parted = reading.quiet.filter(entry => entry.includes(" parted:carrier "));
        const counts = [...new Set(parted)].map(entry => [entry, parted.filter(other => other === entry).length]);
        expect(counts, `${pin}: every parted occurrence of every pair is held`).toEqual((PARTED_COUNTS[pin] ?? []).map(([entry, count]) => [entry, count]));
        return json(reading);
      },
    ]),
  ),
};

describe("wb-pyel.8 EDC demand-channel B1 reader census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R2, after-terminator comments and LIVE QUIET's parted pairs)", () => {
  it("the judged set: the frozen shape, the claims, the out-of-file roster, the tracker export and the compiler anchors agree", { timeout: 120_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "M:4", "U:3", "C:3", "P:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    const pins = ROWS.flatMap(row => row.pins);
    expect(Object.keys(IMPL).sort(), "one case per pin").toEqual([...pins].sort());
    expect(CLAIMS, "the claims, byte for byte, are the roster's").toStrictEqual(ROSTER.claims);
    expect(KILLS, "the kills are the roster's").toStrictEqual(ROSTER.kills);
    const named = idsIn(Object.values(CLAIMS).join(" "), /\b[TMUCP]-[A-Z0-9]+(?:-[A-Z0-9]+)*\b/g);
    expect([...named].sort(), "every pin is named by a claim, and every pin a claim names exists").toEqual([...pins].sort());
    for (const [mutant, killers] of Object.entries(KILLS)) expect(killers.filter(pin => !pins.includes(pin)), `${mutant} is killed at pins`).toEqual([]);

    // The tracker export: this bead's title and description items, R-B156's note and refusal #5's lines in the parent's notes.
    const bead = exportRow(BEAD);
    expect(bead.title.startsWith(TITLE_PREFIX) && bead.title.includes("at the 13 as-written sites"), "the bead's title, as the export holds it").toBe(true);
    const first = firstLine(bead.description, "- After-terminator comment positions:");
    expect(ROWS[0]?.label, "row T is the description's first item").toBe(first.slice(2, first.indexOf(" Members:")));
    expect(idsIn(first, /\bR\d+c?\b/g), "row T holds exactly the members the item names").toEqual(Object.keys(T_MEMBERS));
    for (const [member, [, plant]] of Object.entries(T_MEMBERS)) {
      const spelled = between(first, `${member} (`, " -> ");
      expect(spelled !== "" && plant.includes(spelled), `${member}'s plant holds the code the item spells (${spelled})`).toBe(true);
    }
    const second = firstLine(bead.description, "- The commentMatrix gains");
    expect(ROWS[1]?.label, "row M is the description's second item").toBe(second.slice(2, second.indexOf(", or the")));
    const sites = Number(between(second, "(", " sites)"));
    expect([Object.keys(AFTER_SITES).length, Object.keys(BEFORE_SITES).length, Object.keys(WORD_PLANTS).length], "every as-written site the item counts, in every matrix").toEqual([sites, sites, sites]);
    expect([Object.keys(BEFORE_SITES), Object.keys(WORD_PLANTS)], "the three matrices read the same sites").toEqual([Object.keys(AFTER_SITES), Object.keys(AFTER_SITES)]);
    const fold = firstLine(bead.notes, "R-B156 (M:40174)");
    expect([ROWS[2]?.label, ROWS[4]?.label], "rows U and P are the two members R-B156 folds here").toEqual([between(fold, "(1) ", "; (2) "), between(fold, "(2) ", ". Rewire done")]);
    const parent = exportRow(PARENT).notes;
    const u1 = firstLine(parent, "U1-MEDIUM-CONFIRMED-R-B122-R515-R668-B1-COMMENTS-CORE-NOT-EXACT");
    const u2 = firstLine(parent, "U2-MEDIUM-CONFIRMED-R-B122-RULE16-LEG2-LIVE-QUIET");
    const f3 = firstLine(parent, "- F3 LOW RIDES: (CONFIRMED; a residual-list addition under the rule 14 form)");
    const f4 = firstLine(parent, "- F4 LOW RIDES: (CONFIRMED; a pre-existing READINGS sub-form)");
    expect([...idsIn(u1, /\b[ab]\d\d\b/g)].sort(), "row U holds exactly the members refusal #5's U1 line names").toEqual(Object.keys(LINE_PLANTS).sort());
    expect(idsIn(u2, /\bc\d\d\b/g).map(member => `P-${member.toUpperCase()}`), "row P holds every witness refusal #5's U2 line names").toEqual(ROWS[4]?.pins.filter(pin => /^P-C\d\d$/.test(pin)));
    expect(f3.includes(`'${ROWS[3]?.label}'`), "row C's label is the F3 line's quote").toBe(true);
    expect(
      idsIn(f3, /\bh\d\d\b/g).filter(member => !Object.hasOwn(LINE_CUTS, member)),
      "C-LINES holds every member the F3 line names",
    ).toEqual([]);
    expect([...idsIn(fold, /\bGM\d+\b/g), ...idsIn(f4, /\bGM\d+\b/g)], "KILLS holds exactly the mutants R-B156 and the F4 line name").toEqual(Object.keys(KILLS));
    expect(idsIn(f4, /\bh\d\d\b/g).filter(member => !Object.hasOwn(LINE_CUTS, member)), "the F4 line's numbered member is a C-LINES plant").toEqual([]);

    // The compiler and the helper's own rules: a token member per terminator token, the comment forms, the SENTENCES line rules.
    expect(Object.keys(TOKEN_PLANTS), "T-TOKENS: one member per token whose text ends in a terminator").toEqual(terminatorTokens());
    expect(Object.keys(SPACE_PLANTS), "C-SPACE: the same tokens").toEqual(terminatorTokens());
    for (const [token, [plant]] of Object.entries(TOKEN_PLANTS)) {
      const before = tokenBeforeComment(plant);
      expect(token === NUMBER_TOKEN ? before.kind === ts.SyntaxKind.NumericLiteral : ts.tokenToString(before.kind) === token, `the ${token} member's comment follows that token`).toBe(true);
    }
    expect([...new Set(Object.values(COMMENT_KINDS).map(commentFormOf))].sort(), "every comment form the compiler tells apart").toEqual(commentForms());
    const rules = [...new Set(Object.values(LINE_CUTS).flatMap(([path, plant]) => lineRulesOf(plant, path)))].sort();
    expect(rules, "C-LINES: a member per SENTENCES line rule, per bullet and for the numbered item").toEqual(sentenceRules());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const reading = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(reading),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
