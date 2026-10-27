/**
 * wb-973.13 (SWARM-CONTEXT-GRAPH-R13), the until-then leg of the definition-source label. Statement (the bead's description in the
 * tracked store export .beads/issues.jsonl, read below as this census's anchor outside itself): "Once RFCLI exposes
 * definition_source (working_tree | published_head | overlay) on the reactive-fiber.render/v1 CLI render envelope under the B26(a)
 * all-or-none pin-key rule, the RF reader adapter shall carry it so the legacy --no-commit preview reads as a working-tree render,
 * never as the published head; until then Pi claims nothing about the definition source beyond today's 'ephemeral noncommitted
 * preview' note."
 *
 * MEASURED AT THE CUT (2026-10-26, read-only, by the cutting seats of cut #1 and cut #2): the named artifact is still absent. The
 * installed rf 0.1.845 (provenance commit 0eaf3859fab0) holds 0 definition_source hits in schemas/cli/context.render.schema.json,
 * and a fresh `rf context render --no-commit --json` in a disposable `rf init` workspace returned a result with no such key; the
 * key lives on the persisted pin only (schemas/workspace/render-pin.schema.json requires it; schemas/workspace/render.schema.json
 * holds it with the five other optional pin keys under dependentRequired: present together or absent together). R11's fixture
 * record (test/fixtures/rf-result-keys.json, rf 0.1.784, source captured) names it in no key list. So this census lands the
 * acceptance's until-then half and its trigger; the 'Armed on landing' clauses become the trigger's checks (ARMED), never
 * observer behaviour.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row):
 *  A the until-then docs census, judged on the RENDERED VIEW below.
 *    A1 the walk of docs/workbench equals git's listing of its markdown (git ls-files --cached --others --exclude-standard: tracked
 *      or untracked, never ignored, present on disk; the walk's anchor outside the census), and git lists at least DOCS_FLOOR
 *      pages; every docs path the export's SURFACES line names is walked and carries preview sentences; no walked page holds a
 *      character reference the rendered view cannot decode; and ONE scan of the walked pages plus a planted claim page (its
 *      claim a soft-wrapped second sentence) finds exactly the planted claim, so no walked sentence says the preview reads the
 *      published head.
 *    A2 the sentence judge on planted sentences, each carried in the witness beside its reading. A claim is a sentence naming the
 *      preview and the published head with no negation before the head. Every preview spelling (preview, previews, previewing,
 *      previewed, noncommitted, non-committed, uncommitted, --no-commit or no-commit, and the dotted capability id) is the only
 *      preview spelling of at least one claim, and the head is spelled published head or heads, the two words joined by white
 *      space, '_', '-', '*', a backtick or a quote mark, in any case; the negated, preview-free and head-free sentences are
 *      quiet.
 *    A3-A6 the residuals' quiet rows (RESIDUALS): each quiet input is quiet under today's judge and flagged by its residual's
 *      named cure, beside its live twin, which today's judge flags.
 *    A7 inline markup renders into the sentence it splits: emphasis, strong, strikethrough, a link's text, a code span, an inline
 *      tag, a backslash escape, a heading's and an HTML block's text, a named or numeric character reference, and a format code
 *      point (dropped), each read as one claim.
 *    A8 sentence bounds: a soft wrap, a hard break, a task item's, a list item's and a block quote's continuation line, and a
 *      table row's cells each join into one sentence (one claim each), while a ';', a '!' or a '?' ends one (a preview before
 *      it and a head after it read none).
 *    A9 unrendered text is not judged: an HTML comment (closed or not), a fenced and an indented code block, an inline comment, a
 *      link destination and title, a link reference definition, and a character reference inside a code span (shown as
 *      written) each read no claim, while the same words shown read one.
 *    A10 a named character reference outside NAMED_REFERENCES fails closed: it is reported unreadable (A1 holds every walked page
 *      to none) and renders as written, while a decoded one renders.
 *  B the until-then anchor note. B1 the observer module the export's SURFACES line names spells exactly one string literal that
 *    starts with the statement's quoted anchor phrase (comments never count; its twin, a planted module, counts two literals and
 *    not its comment); B2 a clean full-shape projection of the --no-commit preview reading (the witness carries its preview
 *    contract and that it states no key) states that literal first and once (its twin, one note put before it, moves it to
 *    second).
 *  C the statement's until-then clause. C1 a reading whose result states definition_source (each word of the statement's closed
 *    set and one word outside it) projects exactly as the same reading stating none: the reader claims nothing about it yet. The
 *    witness carries the word each reading handed to the observer states, recorded at the call (so the observer is shown to be
 *    handed the key), and its twin, the armed stand-in, changes the working-tree projection and refuses the other three words.
 *  T the trigger check (freeze-and-flip); T2-T5's trigger readings carry the key lists their planted records name (named), so a
 *    planted record swapped for another reds. T1 R11's fixture record, read through readRfResultRoster, beside the real reader:
 *    no armed clause is missed, because no key list names the key (nothing is due; T1 keeps only the misses, so the FLIP below
 *    holds); T2 the record cleared of the key and then given it in each key list in turn, beside an
 *    unarmed stand-in (the real reader over the reading with the key removed, so T2-T4 never depend on what the real record
 *    names or on the observer's later arming): the trigger fires and names each armed clause the reader misses (the working-tree
 *    note, the contradiction refusal and the closed-set refusal; the absent-key clause holds); T3 the same planted records
 *    beside an armed stand-in (the unarmed one plus the armed clauses): the trigger clears, and the armed stand-in unarmed again
 *    misses what T2's reader misses; T4 R-NESTED's quiet row (its record carries the container key in the result list, and its
 *    base record named the key in another list, which the clearing removes), its cure's reading and its live twin; T5 each armed
 *    clause is judged on its own: a stand-in armed for every clause but one (the contradiction one refuses published_head and
 *    admits overlay) misses exactly that clause, and one refusing with an untyped error instead of the category misses both
 *    refusal clauses.
 * RENDERED VIEW (the rendered-text docs truth floor, 9x5.17): marked 18.0.11 (the lexer test/helpers/census.ts and the docs
 * shared-filesystem census use) lexes each page once. A unit is a paragraph, a heading, the text of a list item or block quote, a
 * table row (its cells joined by a space) or an HTML block, numbered by the line its top-level block starts on. A unit renders
 * its text, code spans and backslash escapes as written, emphasis, strong, strikethrough and link text flattened, an inline tag,
 * an inline comment and a task checkbox as nothing and a hard break as a space; an HTML block renders its source with comments
 * (an unclosed one to its end) and tags removed; a link destination or title, a link reference definition and every fenced or
 * indented code block render nothing. Numeric character references and the names in NAMED_REFERENCES are decoded outside code;
 * any other named reference stays as written and is unreadable. Format code points (Cf) are dropped and every white-space run
 * folds to one space. The folded unit splits into sentences after '.', '!', '?' or ';' followed by white space, and each sentence
 * is judged.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * ANCHORS OUTSIDE THE CENSUS (rule 16 CT5/CT6): each row's clause and each ARMED clause is one whole clause of the tracked export
 * description, and together they are exactly its testable clauses: every clause of every labelled ACCEPTANCE item (the one
 * unlabelled item, the tracking line, is the only one not judged) plus the statement's until-then clause. The key, its closed set,
 * the working-tree note, the contradiction words, the refusal category, the anchor phrase and the walked surfaces are read from
 * the export for every check the census runs; where a row clause, an ARMED clause or a witness spells one of them as an expected
 * value, the judged set or the pin's own comparison holds that spelling to the value read from the export, so a respelled value
 * reds. The trigger's key lists are held to the record's own array-valued fields, and A1's walk to git's listing.
 * REACHED: each pin's case reads through the seams it declares (the docs walk, git's listing, the sentence judge, the src read, a
 * reader projection, the record read, the trigger), and each witness carries the inputs its case planted (a sentence, a page or
 * its path, a planted record's named lists, a reading's contract) beside the readings, so a case given other inputs, or swapped
 * for another pin's case, reds. Each residual's quiet input is also read by its residual's named cure, which must flag it, so a
 * quiet input swapped for one outside its family reds even when the witness's copy of the input is edited to match. What this
 * does not prove: a case rewritten together with its whole witness (an input, its copy and its readings), or a case rewritten
 * to return its pinned witness as a constant while still reading its seams, stays green; those are rewrites of the census, not
 * swaps of a case. The last test holds every registered test to run mode and a pass.
 * RESIDUALS (named families, each with a pinned quiet row, its named cure and its live twin):
 *  R-PARAPHRASE (A3) a claim naming the head in other words than 'published head' is not judged: the store-resident head's
 *    manifest, or a word between published and head ('the published graph head'); cure: the head term also reads
 *    'store-resident head' and 'published <word> head'.
 *  R-ANAPHORA (A4) a claim whose preview stands in an earlier sentence ('The preview is noncommitted. It reads the published
 *    head.') is not judged; cure: a sentence opening with It, This or That joins the sentence before it.
 *  R-NEGATION-SCOPE (A5) a negation before the head that governs another phrase reads the sentence as negated ('The preview, not
 *    the committed render, reads the published head.', 'No longer experimental, the preview reads the published head.', 'The
 *    preview never fails: it reads the published head.'); cure: only the clause nearest the head (after the last ',', ':' or ';'
 *    before it) is read for a negation.
 *  R-OUTSIDE-WALK (A6) text outside the docs/workbench markdown is not walked: the root README, docs/programs, a .txt under
 *    docs/workbench, a src comment; cure: every planted path is in scope.
 *  R-NESTED (T4) the trigger sees only the record's key lists, so the key nested in a result object no list names (a pin
 *    container, or provenance beyond its floor keys) stays invisible until a roster cut names the key itself; cure: a list naming
 *    the container counts as naming the key.
 * FLIP (measured on throwaway plants at the cut): a roster naming definition_source reds T1 alone until the observer case exists;
 * the observer case clears T1 and flips C1 (a stated key is then read), so the cut that lands it rewrites C1 in the same commit.
 *
 * Display paths added: none. Test-only: no scratch; src, docs, the roster and the store export are only read, and git's listing
 * of docs/workbench is read with git ls-files.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it, type TestContext } from "vitest";
import { CapabilityError, type CapabilityErrorCategory, type JsonValue } from "../src/workbench/capability-registry.js";
import type { ObservationScope } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json, type RfResultRoster, readRfResultRoster } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-973.13";
const DOCS_ROOT = "docs/workbench";
/** Two below the 72 markdown files docs/workbench held at base 20a13c5 (25 pages, 47 receipts): the least git's listing of
 * docs/workbench markdown may hold, so an emptied listing reds even though the walk would equal it. */
const DOCS_FLOOR = 70;
const WS = "/workspace/rf-definition-source-census";
const scope: ObservationScope = { workspace: WS, principal: "local-operator:census" };
const HOST: ReactiveFiberTopologyContext = { scope, seam: "rf-cli", capturedAt: "2026-10-26T00:00:00Z", observedAt: "2026-10-26T00:00:01Z" };
/** A word outside the statement's closed set, invented for the probe. */
const OUTSIDE_WORD = "detached_head";
/** A result key the pin fields could ride in, which no key list names as the key itself (R-NESTED). */
const CONTAINER_KEY = "render_pin";
const ARROW = String.fromCodePoint(0x2192);
const STATEMENT = "STATEMENT";
const ARMED_SOURCE = "Armed on landing";
/** The ACCEPTANCE items that state no testable clause: the export's tracking line. */
const NOT_JUDGED = ["Tracked related, never a blocker."];
/** R11's key lists, held to the record's own array-valued fields in the judged set. */
const LISTS = ["resultKeys", "provenanceKeys", "workKeys", "workMetricsKeys"] as const;
type KeyList = (typeof LISTS)[number];
const CATEGORIES: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const JUDGED_TITLE = "the judged set: the frozen shape, the cases and the tracked bead export agree";
const RECORD_TITLE = "the record: every registered test is in run mode and passed";

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isJsonObject = (value: Json | undefined): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isCategory = (word: string): word is CapabilityErrorCategory => CATEGORIES.some(category => category === word);

/** The seams a pin's case reads through; each read is recorded against the case that is running. */
type Seam = "docs" | "listing" | "judge" | "src" | "reader" | "roster" | "trigger";
let running: Seam[] | undefined;
function touch(seam: Seam): void {
  if (running !== undefined && !running.includes(seam)) running.push(seam);
}

interface Clause {
  readonly source: string;
  readonly clause: string;
}
/** The bead's description in the tracked store export: the anchor outside this census. Its notes and status are never read, so
 * a notes or status write cannot red the census; an edit of the description itself reds the judged set by design. */
function exportDescription(): string {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`) && !line.includes(`"id": "${BEAD}"`)) continue;
    const entry: unknown = JSON.parse(line);
    if (isObject(entry) && entry.id === BEAD && typeof entry.description === "string") return entry.description;
  }
  throw new Error(`the store export has no ${BEAD} row with a description`);
}
/** The description line that starts with the section prefix, the prefix removed. */
function section(description: string, prefix: string): string {
  const line = description.split("\n").find(entry => entry.startsWith(`${prefix}: `));
  if (line === undefined) throw new Error(`the ${BEAD} description has no ${prefix} line`);
  return line.slice(prefix.length + 2);
}
/** The items of a Python-repr list of strings (the export's ACCEPTANCE line): each item single- or double-quoted, backslash
 * escapes resolved. */
function pyStrings(list: string): string[] {
  const items: string[] = [];
  let index = 0;
  while (index < list.length) {
    const quote = list[index];
    index += 1;
    if (quote !== "'" && quote !== '"') continue;
    let item = "";
    while (index < list.length && list[index] !== quote) {
      const char = list[index] ?? "";
      if (char === "\\" && index + 1 < list.length) {
        item += list[index + 1] ?? "";
        index += 2;
      } else {
        item += char;
        index += 1;
      }
    }
    if (index >= list.length) throw new Error(`an unterminated ACCEPTANCE item in the ${BEAD} export`);
    items.push(item);
    index += 1;
  }
  return items;
}
/** A text's clauses: split at each '; ' and at each sentence end before a capital, a closing period removed. */
const clausesOf = (text: string): string[] =>
  text
    .split(/;\s+|\.\s+(?=[A-Z])/)
    .map(part => part.trim().replace(/\.$/, ""))
    .filter(part => part.length > 0);
function matched(pattern: RegExp, text: string, what: string): RegExpExecArray {
  const found = pattern.exec(text);
  if (found === null) throw new Error(`the ${BEAD} export states no ${what}`);
  return found;
}

interface Exported {
  readonly clauses: readonly Clause[];
  readonly unlabeled: readonly string[];
  readonly key: string;
  readonly closedSet: readonly string[];
  readonly anchorPhrase: string;
  readonly workingTree: string;
  readonly note: string;
  readonly contradictions: readonly string[];
  readonly category: CapabilityErrorCategory;
  readonly docsSurfaces: readonly string[];
  readonly srcSurfaces: readonly string[];
}
/** Everything this census takes from the tracked export: the testable clauses, and the words and paths they name. */
function readExported(): Exported {
  const description = exportDescription();
  const statement = clausesOf(section(description, STATEMENT));
  const clauses: Clause[] = statement.filter(clause => clause.startsWith("until then ")).map(clause => ({ source: STATEMENT, clause }));
  const unlabeled: string[] = [];
  for (const item of pyStrings(section(description, "ACCEPTANCE"))) {
    const labeled = /^([A-Z][a-z]+(?: [a-z]+)*): ([\s\S]+)$/.exec(item);
    if (labeled === null) unlabeled.push(item);
    else for (const clause of clausesOf(labeled[2] ?? "")) clauses.push({ source: labeled[1] ?? "", clause });
  }
  const exposes = matched(/\bexposes (\w+) \(([^)]+)\)/, statement[0] ?? "", "exposed key with its closed set");
  const untilThen = clauses.find(clause => clause.source === STATEMENT)?.clause ?? "";
  const armed = clauses.filter(clause => clause.source === ARMED_SOURCE).map(clause => clause.clause);
  const note = matched(/^\w+ '([^']+)' on a legacy preview adds the note '(.+)'$/, armed[0] ?? "", "working-tree note");
  const contradiction = matched(/^'([^']+)'\/'([^']+)' on /, armed[1] ?? "", "contradiction words");
  const category = matched(/'(\w+)' refusal$/, armed[1] ?? "", "refusal category")[1] ?? "";
  if (!isCategory(category)) throw new Error(`the ${BEAD} export names the unknown refusal category ${category}`);
  const surfaces = section(description, "SURFACES")
    .split(", ")
    .map(entry => entry.replace(/:[0-9,-]+@[0-9a-f]+$/, ""));
  return {
    clauses,
    unlabeled,
    key: exposes[1] ?? "",
    closedSet: (exposes[2] ?? "").split(" | "),
    anchorPhrase: matched(/'([^']+)' note$/, untilThen, "anchor phrase")[1] ?? "",
    workingTree: note[1] ?? "",
    note: note[2] ?? "",
    contradictions: [contradiction[1] ?? "", contradiction[2] ?? ""],
    category,
    docsSurfaces: surfaces.filter(path => path.startsWith(`${DOCS_ROOT}/`)),
    srcSurfaces: surfaces.filter(path => path.startsWith("src/")),
  };
}
const EXPORTED = readExported();
const sortedClauses = (clauses: readonly Clause[]): string[] => clauses.map(({ source, clause }) => `${source} | ${clause}`).sort();

// ---------------------------------------------------------------------------------------------
// The docs: the walk, git's listing, the rendered view and the sentence judge.
// ---------------------------------------------------------------------------------------------

interface DocFile {
  readonly path: string;
  readonly text: string;
}
const isMarkdown = (path: string): boolean => /\.(?:md|markdown)$/i.test(path);
/** Every file under docs/workbench, read from disk in path order. */
function docsTree(): DocFile[] {
  touch("docs");
  const files: DocFile[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(REPO, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files.push({ path, text: readFileSync(join(REPO, path), "utf8") });
    }
  };
  walk(DOCS_ROOT);
  return files.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}
/** What git would commit under a root: tracked or untracked, never ignored, present on disk, sorted (the walk's outside anchor). */
function gitListed(root: string): string[] {
  touch("listing");
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", root], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(REPO, path))))].sort();
}

const at = (code: number): string => String.fromCodePoint(code);
/** The named character references the rendered view decodes (the docs shared-filesystem census's set); any other is unreadable. */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", at(0xa0)],
  ["ensp", at(0x2002)],
  ["emsp", at(0x2003)],
  ["thinsp", at(0x2009)],
  ["hairsp", at(0x200a)],
  ["shy", at(0xad)],
  ["ZeroWidthSpace", at(0x200b)],
  ["zwnj", at(0x200c)],
  ["zwj", at(0x200d)],
  ["NoBreak", at(0x2060)],
  ["hyphen", at(0x2010)],
  ["dash", at(0x2010)],
  ["ndash", at(0x2013)],
  ["mdash", at(0x2014)],
  ["minus", at(0x2212)],
  ["period", "."],
  ["excl", "!"],
  ["quest", "?"],
  ["comma", ","],
  ["colon", ":"],
  ["semi", ";"],
]);
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** `text` with every numeric reference and each NAMED_REFERENCES name decoded; any other named reference stays as written and is
 * recorded in `unknown`. */
function decodeReferences(text: string, unknown: string[]): string {
  return text.replace(REFERENCE, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? at(code) : whole;
    const value = NAMED_REFERENCES.get(name ?? "");
    if (value === undefined) unknown.push(whole);
    return value ?? whole;
  });
}
const HTML_COMMENT = /<!--[\s\S]*?(?:-->|$)/g;
const HTML_TAG = /<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^>]*)?\/?>/g;
const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** What a reader sees of inline tokens: markup flattened, an inline tag, comment or checkbox nothing, a hard break a space. */
function inlineText(tokens: readonly Token[], unknown: string[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html" || token.type === "checkbox") continue;
    if (token.type === "br") out += " ";
    else if (token.type === "codespan" || token.type === "escape") out += textOf(token);
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token), unknown);
    else out += decodeReferences(textOf(token), unknown);
  }
  return out;
}
/** The units a block token renders (see RENDERED VIEW), in page order, before folding. */
function unitsOf(token: Token, unknown: string[]): string[] {
  if (token.type === "space" || token.type === "hr" || token.type === "def" || token.type === "code" || token.type === "checkbox") return [];
  if (token.type === "html") return [decodeReferences(token.raw.replace(HTML_COMMENT, " ").replace(HTML_TAG, " "), unknown)];
  if (isTable(token)) return [token.header, ...token.rows].map(row => row.map(cell => inlineText(cell.tokens, unknown)).join(" "));
  if (isList(token)) return token.items.flatMap(item => item.tokens.flatMap(child => unitsOf(child, unknown)));
  if (token.type === "blockquote") return childrenOf(token).flatMap(child => unitsOf(child, unknown));
  const children = childrenOf(token);
  return [children.length > 0 ? inlineText(children, unknown) : decodeReferences(textOf(token), unknown)];
}
const folded = (text: string): string => text.replace(/\p{Cf}/gu, "").replace(/\s+/g, " ").trim();
const newlines = (text: string): number => text.split("\n").length - 1;
interface Unit {
  readonly line: number;
  readonly text: string;
}
/** A page's rendered units, each numbered by the line its top-level block starts on, and the references it cannot decode. */
function renderedPage(markdown: string): { readonly units: readonly Unit[]; readonly unknown: readonly string[] } {
  const unknown: string[] = [];
  const units: Unit[] = [];
  let cursor = 0;
  let line = 1;
  for (const token of marked.lexer(markdown)) {
    const found = markdown.indexOf(token.raw, cursor);
    const start = found < 0 ? cursor : found;
    line += newlines(markdown.slice(cursor, start));
    for (const unit of unitsOf(token, unknown)) {
      const text = folded(unit);
      if (text.length > 0) units.push({ line, text });
    }
    line += newlines(token.raw);
    cursor = start + token.raw.length;
  }
  return { units, unknown };
}

const PREVIEW_TERM = /\bpreview(?:s|ing|ed)?\b|\b(?:non-?|un)committed\b|(?:--|\b)no-commit\b/i;
/** The head: published head or heads, the words joined by white space, '_', '-', '*', a backtick or a quote mark (a rendered
 * escape or quote between them never hides it). */
const HEAD_TERM = /\bpublished[\s_*'"`\u2018\u2019\u201C\u201D-]+heads?\b/i;
/** A negation word; the 'no' of --no-commit or no-commit is a flag, never a negation. */
const NEGATION = /\b(?:never|not|nor|without|cannot)\b|n't\b|(?<![-\w])no\b(?!-)/i;
interface Judge {
  /** Where the sentence names the published head. */
  readonly head: RegExp;
  /** The text before the head that is read for a negation. */
  readonly window: (before: string) => string;
}
const JUDGE: Judge = { head: HEAD_TERM, window: before => before };
/** R-PARAPHRASE's cure: the head term also reads the store-resident head and a word between published and head. */
const PARAPHRASE_CURE: Judge = { head: new RegExp(`${HEAD_TERM.source}|\\bstore-resident[\\s_-]+heads?\\b|\\bpublished[\\s_-]+\\w+[\\s_-]+heads?\\b`, "i"), window: before => before };
/** R-NEGATION-SCOPE's cure: only the clause nearest the head (after the last ',', ':' or ';' before it) is read for a negation. */
const NEGATION_SCOPE_CURE: Judge = { head: HEAD_TERM, window: before => before.split(/[,:;]/).pop() ?? "" };
/** A sentence says the preview reads the published head when it names the preview and the head and no negation comes before the
 * head (in the judge's window). */
function claimsWith(judge: Judge, sentence: string): boolean {
  touch("judge");
  const head = judge.head.exec(sentence);
  if (head === null || !PREVIEW_TERM.test(sentence)) return false;
  return !NEGATION.test(judge.window(sentence.slice(0, head.index)));
}
const claimsHead = (sentence: string): boolean => claimsWith(JUDGE, sentence);
const sentencesOf = (text: string): string[] => text.split(/(?<=[.!?;])\s+/).filter(part => part.trim().length > 0);
/** R-ANAPHORA's cure: a sentence opening with It, This or That joins the sentence before it. */
function anaphoraJoined(text: string): string[] {
  const joined: string[] = [];
  for (const part of sentencesOf(text)) {
    const last = joined.length - 1;
    if (/^(?:It|This|That)\b/.test(part) && last >= 0) joined[last] = `${joined[last] ?? ""} ${part}`;
    else joined.push(part);
  }
  return joined;
}
const inScope = (path: string): boolean => path.startsWith(`${DOCS_ROOT}/`) && isMarkdown(path);
/** R-OUTSIDE-WALK's cure: every planted path is in scope. */
const anyScope = (): boolean => true;
interface ScanOptions {
  readonly judge?: Judge;
  readonly sentences?: (text: string) => string[];
  readonly scope?: (path: string) => boolean;
}
interface Scan {
  readonly scanned: readonly string[];
  readonly claims: readonly string[];
  readonly previews: Readonly<Record<string, number>>;
  readonly unreadable: readonly string[];
}
/** The in-scope files of a set, each rendered and each sentence judged: the files scanned, every claim (`path:line sentence`),
 * each scanned file's preview sentence count, and every reference the rendered view cannot decode (`path reference`). */
function scan(files: readonly DocFile[], options: ScanOptions = {}): Scan {
  const judge = options.judge ?? JUDGE;
  const split = options.sentences ?? sentencesOf;
  const within = options.scope ?? inScope;
  const scanned: string[] = [];
  const claims: string[] = [];
  const previews: Record<string, number> = {};
  const unreadable: string[] = [];
  for (const file of files) {
    if (!within(file.path)) continue;
    scanned.push(file.path);
    const page = renderedPage(file.text);
    unreadable.push(...page.unknown.map(reference => `${file.path} ${reference}`));
    let count = 0;
    for (const unit of page.units) {
      for (const sentence of split(unit.text)) {
        if (PREVIEW_TERM.test(sentence)) count += 1;
        if (claimsWith(judge, sentence)) claims.push(`${file.path}:${unit.line} ${sentence}`);
      }
    }
    previews[file.path] = count;
  }
  return { scanned, claims, previews, unreadable };
}
const claimCount = (files: readonly DocFile[], options?: ScanOptions): number => scan(files, options).claims.length;
const planted = (text: string, path = `${DOCS_ROOT}/planted.md`): DocFile => ({ path, text });
const PLANTED_CLAIM = "The preview reads the published head.";
/** A1's planted claim page: its claim a soft-wrapped second sentence, scanned with the walked pages in one call. */
const PLANTED_PAGE: DocFile = planted("# Planted page\n\nFixture text is never real context. The rf preview reads the\npublished head.\n", `${DOCS_ROOT}/zz-wb-973-13-planted.md`);

// ---------------------------------------------------------------------------------------------
// The src read, the reader and the trigger.
// ---------------------------------------------------------------------------------------------

/** Every string literal of a src module (read from disk, or the planted text), template parts included; comments are never
 * literals. */
function stringLiterals(path: string, plantedText?: string): string[] {
  touch("src");
  const source = ts.createSourceFile(path, plantedText ?? readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.ES2022, true);
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push(node.head.text, ...node.templateSpans.map(span => span.literal.text));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return literals;
}
const anchoredLiterals = (literals: readonly string[]): string[] => literals.filter(text => text.startsWith(EXPORTED.anchorPhrase));
/** B2's twin: one note put before the projection's notes. */
const TWIN_NOTE = "a note put before it";

type Reader = (reading: JsonValue) => ReactiveFiberProjectionTopology;
/** While C1 reads its real side: the word each reading handed to the observer itself states ('none' for no key), recorded at the
 * call, so a reader that strips the key before the observer is called is seen. */
let handed: string[] | undefined;
const realRead: Reader = reading => {
  const word = statedWord(reading);
  handed?.push(word === undefined ? "none" : String(word));
  return reactivefiberTopology(reading, HOST);
};
const isValueObject = (value: JsonValue | undefined): value is { [key: string]: JsonValue } => typeof value === "object" && value !== null && !Array.isArray(value);
/** A reader the census judges: each projection it makes is a read through the reader seam. */
const tracked =
  (reader: Reader): Reader =>
  reading => {
    touch("reader");
    return reader(reading);
  };
/** The full-shape --no-commit preview reading, its result stating the key as `word`, or not at all. */
function previewReading(word?: string): JsonValue {
  const envelope = fullShapeRf(WS);
  const result = envelope.result;
  if (!isJsonObject(result)) throw new Error("the full-shape fixture needs an object result");
  const stated: JsonObject = { ...result };
  if (word !== undefined) stated[EXPORTED.key] = word;
  const reading: Json = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: WS, source: { ...envelope, result: stated } };
  return reading;
}
/** The reading with the key removed from its result (every other member kept). */
function withoutKey(reading: JsonValue): JsonValue {
  if (!isValueObject(reading) || !isValueObject(reading.source) || !isValueObject(reading.source.result)) return reading;
  const result = Object.fromEntries(Object.entries(reading.source.result).filter(([key]) => key !== EXPORTED.key));
  return { ...reading, source: { ...reading.source, result } };
}
/** The word a reading's result states for the key, if any. */
function statedWord(reading: JsonValue): JsonValue | undefined {
  const source = isObject(reading) ? reading.source : undefined;
  const result = isObject(source) ? source.result : undefined;
  if (!isObject(result) || !Object.hasOwn(result, EXPORTED.key)) return undefined;
  const word = result[EXPORTED.key];
  return typeof word === "string" ? word : null;
}
/** The category a reader refuses a reading with: null when it projects, 'untyped' for any other throw. */
function refusalOf(read: Reader, reading: JsonValue): string | null {
  try {
    read(reading);
    return null;
  } catch (error) {
    return error instanceof CapabilityError ? error.category : "untyped";
  }
}
function projectionOf(read: Reader, reading: JsonValue): ReactiveFiberProjectionTopology | null {
  try {
    return read(reading);
  } catch {
    return null;
  }
}

interface Armed {
  readonly id: string;
  readonly clause: string;
  readonly holds: (read: Reader) => boolean;
}
/** The 'Armed on landing' clauses, each a check the trigger runs once the record names the key. */
const ARMED: readonly Armed[] = [
  {
    id: "note",
    clause: "definition_source 'working_tree' on a legacy preview adds the note 'definition source: working tree (not the published head)'",
    holds: read => projectionOf(read, previewReading(EXPORTED.workingTree))?.diagnostics.includes(EXPORTED.note) === true,
  },
  {
    id: "contradiction",
    clause: `'published_head'/'overlay' on a --no-commit legacy render is a contradiction ${ARROW} 'validation' refusal`,
    holds: read => EXPORTED.contradictions.every(word => refusalOf(read, previewReading(word)) === EXPORTED.category),
  },
  {
    id: "closed-set",
    clause: `a word outside the closed set ${ARROW} 'validation' refusal`,
    holds: read => refusalOf(read, previewReading(OUTSIDE_WORD)) === EXPORTED.category,
  },
  {
    id: "absent",
    clause: `absent key ${ARROW} unchanged output`,
    holds: read => isDeepStrictEqual(projectionOf(read, previewReading()), realRead(previewReading())),
  },
];
/** A reader that never reads the key: the base reader over the reading with the key removed. */
const unarmed =
  (base: Reader): Reader =>
  reading =>
    base(withoutKey(reading));
/** The unarmed stand-in for T2 and T4: today's reader, frozen - the real reader unarmed, so it never reads the key whatever the
 * observer later does. */
const unarmedStandIn: Reader = unarmed(realRead);
/** The armed stand-in for T3: the unarmed one plus the armed clauses, as the observer case would add them. */
const armedStandIn: Reader = reading => {
  const word = statedWord(reading);
  if (word === undefined) return unarmedStandIn(reading);
  if (word !== EXPORTED.workingTree) throw new CapabilityError(EXPORTED.category, `a legacy preview stating ${EXPORTED.key} ${String(word)} is a contradiction`);
  const topology = unarmedStandIn(reading);
  return { ...topology, diagnostics: [...topology.diagnostics, EXPORTED.note] };
};

/** T5's partial stand-ins: the armed stand-in with one clause left unarmed - no note, overlay admitted (published_head still
 * refused), the outside word admitted, or a no-key reading given an extra note - and one whose refusals are untyped errors. */
const PARTIAL: Readonly<Record<string, Reader>> = {
  note: reading => (statedWord(reading) === EXPORTED.workingTree ? unarmedStandIn(reading) : armedStandIn(reading)),
  contradiction: reading => (statedWord(reading) === EXPORTED.contradictions[1] ? unarmedStandIn(reading) : armedStandIn(reading)),
  "closed-set": reading => (statedWord(reading) === OUTSIDE_WORD ? unarmedStandIn(reading) : armedStandIn(reading)),
  absent: reading => {
    const topology = armedStandIn(reading);
    return statedWord(reading) === undefined ? { ...topology, diagnostics: [...topology.diagnostics, "a note on a reading stating no key"] } : topology;
  },
  untyped: reading => {
    const word = statedWord(reading);
    if (word !== undefined && word !== EXPORTED.workingTree) throw new Error("an untyped refusal");
    return armedStandIn(reading);
  },
};
/** R11's fixture record, read through its own reader. */
function roster(): RfResultRoster {
  touch("roster");
  return readRfResultRoster();
}
/** The record with the key removed from every key list: the base T2-T4 plant onto. */
function cleared(record: RfResultRoster): RfResultRoster {
  const copy = { ...record };
  for (const list of LISTS) copy[list] = record[list].filter(key => key !== EXPORTED.key);
  return copy;
}
/** The record with `key` appended to one key list. */
function withKey(record: RfResultRoster, list: KeyList, key: string): RfResultRoster {
  const copy = { ...record };
  copy[list] = [...record[list], key];
  return copy;
}
/** Whether one key list of a record names the key. */
type Names = (record: RfResultRoster, list: KeyList) => boolean;
const namesKey: Names = (record, list) => record[list].includes(EXPORTED.key);
/** R-NESTED's cure: a list naming the container counts as naming the key. */
const namesContainer: Names = (record, list) => namesKey(record, list) || record[list].includes(CONTAINER_KEY);
/** The trigger (freeze-and-flip): nothing is due while no key list of the record names the key; once one does, each armed clause
 * the reader misses is one miss, so the default gate reds until the observer case exists. `named` is the lists that name it. */
function trigger(record: RfResultRoster, read: Reader, names: Names = namesKey): { named: string[]; misses: string[] } {
  touch("trigger");
  const named = LISTS.filter(list => names(record, list));
  return { named, misses: named.length === 0 ? [] : ARMED.filter(check => !check.holds(read)).map(check => check.id) };
}
const plantedEach = (read: Reader): Json => Object.fromEntries(LISTS.map(list => [list, trigger(withKey(cleared(roster()), list, EXPORTED.key), read)]));

interface Pin {
  readonly id: string;
  readonly seams: readonly Seam[];
  readonly witness: Json;
}
interface Row {
  readonly id: string;
  readonly source: string;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
const FIRED = ["note", "contradiction", "closed-set"];
const firedIn = (list: KeyList, misses: readonly string[]): Json => ({ named: [list], misses: [...misses] });
/** The judged rows; their shape is pinned in the judged set and their clauses held to the tracked export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    source: "Until then",
    clause: "a docs census asserts no docs/workbench sentence says the preview reads the published head",
    pins: [
      {
        id: "A1",
        seams: ["docs", "listing", "judge"],
        witness: {
          listed: true,
          walked: true,
          surfaces: [
            { path: "docs/workbench/07-native-integrations.md", walked: true, previews: true },
            { path: "docs/workbench/19-worked-examples.md", walked: true, previews: true },
          ],
          unreadable: [],
          claims: ["docs/workbench/zz-wb-973-13-planted.md:3 The rf preview reads the published head."],
        },
      },
      {
        id: "A2",
        seams: ["judge"],
        witness: [
          { sentence: "The preview reads the published head.", claims: true },
          { sentence: "reactivefiber.render.preview renders the published_head definitions.", claims: true },
          { sentence: "A --no-commit render reads the PUBLISHED HEAD, not the working tree.", claims: true },
          { sentence: "Noncommitted previews resolve definitions from the published-head manifest.", claims: true },
          { sentence: "The non-committed render resolves the published head.", claims: true },
          { sentence: "Previews read the published head.", claims: true },
          { sentence: "A previewing render reads the published head.", claims: true },
          { sentence: "A previewed context reads the published head.", claims: true },
          { sentence: "The uncommitted render reads the published head.", claims: true },
          { sentence: "A no-commit render reads the published head.", claims: true },
          { sentence: "Noncommitted renders read the published head.", claims: true },
          { sentence: "The preview reads published heads.", claims: true },
          { sentence: "The preview reads the published 'head'.", claims: true },
          { sentence: "The noncommitted preview never reads the published head.", claims: false },
          { sentence: "The preview does not read the published head.", claims: false },
          { sentence: "rf graph publish promotes a candidate to the published head.", claims: false },
          { sentence: "The preview reads the working tree.", claims: false },
        ],
      },
      {
        id: "A3",
        seams: ["judge"],
        witness: {
          quiet: [
            { sentence: "The preview reads the store-resident head's manifest.", judged: false, cured: true },
            { sentence: "The preview reads the published graph head.", judged: false, cured: true },
          ],
          twin: { sentence: "The preview reads the published head's manifest.", judged: true },
        },
      },
      {
        id: "A4",
        seams: ["judge"],
        witness: {
          quiet: { text: "The preview is noncommitted. It reads the published head.", claims: 0, cured: 1 },
          twin: { text: "The preview is noncommitted and reads the published head.", claims: 1 },
        },
      },
      {
        id: "A5",
        seams: ["judge"],
        witness: {
          quiet: [
            { sentence: "The preview, not the committed render, reads the published head.", judged: false, cured: true },
            { sentence: "No longer experimental, the preview reads the published head.", judged: false, cured: true },
            { sentence: "The preview never fails: it reads the published head.", judged: false, cured: true },
          ],
          twin: { sentence: "The preview, unlike the committed render, reads the published head.", judged: true },
        },
      },
      {
        id: "A6",
        seams: ["judge"],
        witness: {
          quiet: { paths: ["README.md", "docs/programs/planted.md", "docs/workbench/planted.txt", "src/workbench/planted.ts"], claims: 0, cured: 4 },
          twin: { paths: ["docs/workbench/planted.md", "docs/workbench/receipts/planted.md"], claims: 2 },
        },
      },
      {
        id: "A7",
        seams: ["judge"],
        witness: [
          { text: "The preview reads the *published* head.", claims: 1 },
          { text: "The preview reads the **published head**.", claims: 1 },
          { text: "The preview reads the published [head](#pins).", claims: 1 },
          { text: "The `--no-commit` render reads the published head.", claims: 1 },
          { text: "The preview reads the <em>published</em> head.", claims: 1 },
          { text: "<p>The preview reads the published head.</p>", claims: 1 },
          { text: "The preview reads the published&nbsp;head.", claims: 1 },
          { text: "The preview reads the published&#160;head.", claims: 1 },
          { text: "The preview reads the published&ZeroWidthSpace; head.", claims: 1 },
          { text: "The preview reads the ~~published~~ head.", claims: 1 },
          { text: "The preview reads the \\*published\\* head.", claims: 1 },
          { text: "## The preview reads the published head", claims: 1 },
        ],
      },
      {
        id: "A8",
        seams: ["judge"],
        witness: [
          { text: "The preview reads the\npublished head.", claims: 1 },
          { text: "The preview\nreads the published head.", claims: 1 },
          { text: "The --no-commit render keeps the working tree out of the store and,\nunlike the committed render, reads the published head.", claims: 1 },
          { text: "The preview reads the  \npublished head.", claims: 1 },
          { text: "- The preview reads the\n  published head.", claims: 1 },
          { text: "> The preview reads the\n> published head.", claims: 1 },
          { text: "| The preview | reads the published head. |\n| --- | --- |", claims: 1 },
          { text: "- [ ] The preview reads the\n  published head.", claims: 1 },
          { text: "The --no-commit preview reads the working tree; the committed render reads the published head.", claims: 0 },
          { text: "The preview is noncommitted! The committed render reads the published head.", claims: 0 },
          { text: "Is the preview noncommitted? The committed render reads the published head.", claims: 0 },
        ],
      },
      {
        id: "A9",
        seams: ["judge"],
        witness: [
          { hidden: "<!-- The preview reads the published head. -->", claims: 0, shown: "The preview reads the published head.", shownClaims: 1 },
          { hidden: "```\nThe preview reads the published head.\n```", claims: 0, shown: "The preview reads the published head.", shownClaims: 1 },
          { hidden: "Intro.\n\n    The preview reads the published head.", claims: 0, shown: "Intro.\n\nThe preview reads the published head.", shownClaims: 1 },
          { hidden: "The preview reads the <!-- published head --> working tree.", claims: 0, shown: "The preview reads the published head working tree.", shownClaims: 1 },
          { hidden: "The preview reads [the docs](#published-head).", claims: 0, shown: "The preview reads [the published head](#docs).", shownClaims: 1 },
          { hidden: "<!-- The preview reads the published head.", claims: 0, shown: "The preview reads the published head.", shownClaims: 1 },
          { hidden: 'The preview reads [the docs](#x "the published head").', claims: 0, shown: 'The preview reads [the published head](#x "the docs").', shownClaims: 1 },
          { hidden: '[preview]: #x "The preview reads the published head."\n\nSee the docs.', claims: 0, shown: "The preview reads the published head.\n\nSee the docs.", shownClaims: 1 },
          { hidden: "The preview reads the `published&nbsp;head`.", claims: 0, shown: "The preview reads the `published head`.", shownClaims: 1 },
        ],
      },
      {
        id: "A10",
        seams: ["judge"],
        witness: {
          unknown: { text: "The preview reads the published&emsp13;head.", unreadable: ["docs/workbench/planted.md &emsp13;"], claims: 0 },
          known: { text: "The preview reads the published&emsp;head.", unreadable: [], claims: 1 },
        },
      },
    ],
  },
  {
    id: "B",
    source: "Until then",
    clause: "the anchor note stays reactivefiber-observer.ts:193@9df9a03",
    pins: [
      {
        id: "B1",
        seams: ["src"],
        witness: {
          file: "src/workbench/reactivefiber-observer.ts",
          anchorLiterals: 1,
          twin: {
            module: `// ephemeral noncommitted preview: a comment\nconst a = "ephemeral noncommitted preview: one";\nconst b = \`ephemeral noncommitted preview: \${a}\`;\nexport const c = [a, b];\n`,
            anchorLiterals: 2,
          },
        },
      },
      { id: "B2", seams: ["reader", "src"], witness: { previewContract: true, keyStated: false, srcNote: true, anchoredAt: [0], twin: { before: "a note put before it", anchoredAt: [1] } } },
    ],
  },
  {
    id: "C",
    source: STATEMENT,
    clause: "until then Pi claims nothing about the definition source beyond today's 'ephemeral noncommitted preview' note",
    pins: [
      {
        id: "C1",
        seams: ["reader"],
        witness: {
          real: [
            { word: "working_tree", reads: "unchanged" },
            { word: "published_head", reads: "unchanged" },
            { word: "overlay", reads: "unchanged" },
            { word: OUTSIDE_WORD, reads: "unchanged" },
          ],
          handed: ["none", "working_tree", "published_head", "overlay", OUTSIDE_WORD],
          twin: [
            { word: "working_tree", reads: "changed" },
            { word: "published_head", reads: "refused" },
            { word: "overlay", reads: "refused" },
            { word: OUTSIDE_WORD, reads: "refused" },
          ],
        },
      },
    ],
  },
  {
    id: "T",
    source: "Trigger check",
    clause:
      "a default-gate test reads R11's fixture record and, when definition_source appears in a captured envelope, fails until the observer case exists (freeze-and-flip, 05-IMPLEMENTATION-PLAN.md:39@8a8b83e4d)",
    pins: [
      { id: "T1", seams: ["roster", "trigger"], witness: { misses: [] } },
      {
        id: "T2",
        seams: ["roster", "trigger", "reader"],
        witness: {
          resultKeys: firedIn("resultKeys", FIRED),
          provenanceKeys: firedIn("provenanceKeys", FIRED),
          workKeys: firedIn("workKeys", FIRED),
          workMetricsKeys: firedIn("workMetricsKeys", FIRED),
        },
      },
      {
        id: "T3",
        seams: ["roster", "trigger", "reader"],
        witness: {
          armed: { resultKeys: firedIn("resultKeys", []), provenanceKeys: firedIn("provenanceKeys", []), workKeys: firedIn("workKeys", []), workMetricsKeys: firedIn("workMetricsKeys", []) },
          unarmedArmed: firedIn("resultKeys", FIRED),
        },
      },
      {
        id: "T4",
        seams: ["roster", "trigger", "reader"],
        witness: {
          quiet: { containers: ["resultKeys"], named: [], misses: [], cured: firedIn("resultKeys", FIRED) },
          twin: firedIn("resultKeys", FIRED),
        },
      },
      {
        id: "T5",
        seams: ["roster", "trigger", "reader"],
        witness: {
          note: firedIn("resultKeys", ["note"]),
          contradiction: firedIn("resultKeys", ["contradiction"]),
          "closed-set": firedIn("resultKeys", ["closed-set"]),
          absent: firedIn("resultKeys", ["absent"]),
          untyped: firedIn("resultKeys", ["contradiction", "closed-set"]),
        },
      },
    ],
  },
];

/** A2's planted sentences: claims (every preview spelling is the only one of at least one, and the head is spelled as joined,
 * plural and capitalized), then a negated pair, a preview-free and a head-free sentence. */
const SENTENCES = [
  "The preview reads the published head.",
  "reactivefiber.render.preview renders the published_head definitions.",
  "A --no-commit render reads the PUBLISHED HEAD, not the working tree.",
  "Noncommitted previews resolve definitions from the published-head manifest.",
  "The non-committed render resolves the published head.",
  "Previews read the published head.",
  "A previewing render reads the published head.",
  "A previewed context reads the published head.",
  "The uncommitted render reads the published head.",
  "A no-commit render reads the published head.",
  "Noncommitted renders read the published head.",
  "The preview reads published heads.",
  "The preview reads the published 'head'.",
  "The noncommitted preview never reads the published head.",
  "The preview does not read the published head.",
  "rf graph publish promotes a candidate to the published head.",
  "The preview reads the working tree.",
];
/** A7's planted pages: inline markup, a character reference or a format code point inside a claim. */
const MARKUP = [
  "The preview reads the *published* head.",
  "The preview reads the **published head**.",
  "The preview reads the published [head](#pins).",
  "The `--no-commit` render reads the published head.",
  "The preview reads the <em>published</em> head.",
  "<p>The preview reads the published head.</p>",
  "The preview reads the published&nbsp;head.",
  "The preview reads the published&#160;head.",
  "The preview reads the published&ZeroWidthSpace; head.",
  "The preview reads the ~~published~~ head.",
  "The preview reads the \\*published\\* head.",
  "## The preview reads the published head",
];
/** A8's planted pages: a claim across a soft wrap, a hard break, a list item's and a block quote's continuation line, and a table
 * row's cells; then a ';' between a preview and a head, which ends the sentence. */
const JOINS = [
  "The preview reads the\npublished head.",
  "The preview\nreads the published head.",
  "The --no-commit render keeps the working tree out of the store and,\nunlike the committed render, reads the published head.",
  "The preview reads the  \npublished head.",
  "- The preview reads the\n  published head.",
  "> The preview reads the\n> published head.",
  "| The preview | reads the published head. |\n| --- | --- |",
  "- [ ] The preview reads the\n  published head.",
  "The --no-commit preview reads the working tree; the committed render reads the published head.",
  "The preview is noncommitted! The committed render reads the published head.",
  "Is the preview noncommitted? The committed render reads the published head.",
];
/** A9's planted pages: each claim hidden from the rendered view, beside the same words shown. */
const HIDDEN: readonly (readonly [string, string])[] = [
  ["<!-- The preview reads the published head. -->", "The preview reads the published head."],
  ["```\nThe preview reads the published head.\n```", "The preview reads the published head."],
  ["Intro.\n\n    The preview reads the published head.", "Intro.\n\nThe preview reads the published head."],
  ["The preview reads the <!-- published head --> working tree.", "The preview reads the published head working tree."],
  ["The preview reads [the docs](#published-head).", "The preview reads [the published head](#docs)."],
  ["<!-- The preview reads the published head.", "The preview reads the published head."],
  ['The preview reads [the docs](#x "the published head").', 'The preview reads [the published head](#x "the docs").'],
  ['[preview]: #x "The preview reads the published head."\n\nSee the docs.', "The preview reads the published head.\n\nSee the docs."],
  ["The preview reads the `published&nbsp;head`.", "The preview reads the `published head`."],
];
const judgedWith = (judge: Judge) => (sentence: string) => ({ sentence, judged: claimsHead(sentence), cured: claimsWith(judge, sentence) });
const twinOf = (sentence: string): Json => ({ sentence, judged: claimsHead(sentence) });
const scanned = (file: DocFile): Json => {
  const result = scan([file]);
  return { text: file.text, unreadable: [...result.unreadable], claims: result.claims.length };
};

/** Each pin's case: it reads through the seams its pin declares and returns the witness its pin holds. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const listed = gitListed(DOCS_ROOT).filter(isMarkdown);
    const { scanned: paths, claims, previews, unreadable } = scan([...docsTree(), PLANTED_PAGE]);
    const walked = paths.filter(path => path !== PLANTED_PAGE.path);
    return {
      listed: listed.length >= DOCS_FLOOR,
      walked: isDeepStrictEqual(walked, listed),
      surfaces: EXPORTED.docsSurfaces.map(path => ({ path, walked: walked.includes(path), previews: (previews[path] ?? 0) > 0 })),
      unreadable: [...unreadable],
      claims: [...claims],
    };
  },
  A2: () => SENTENCES.map(sentence => ({ sentence, claims: claimsHead(sentence) })),
  // R-PARAPHRASE: the head named in other words; its cure reads them.
  A3: () => ({
    quiet: ["The preview reads the store-resident head's manifest.", "The preview reads the published graph head."].map(judgedWith(PARAPHRASE_CURE)),
    twin: twinOf("The preview reads the published head's manifest."),
  }),
  // R-ANAPHORA: the preview stands in the sentence before the one that names the head; its cure joins them.
  A4: () => {
    const quiet = "The preview is noncommitted. It reads the published head.";
    const twin = "The preview is noncommitted and reads the published head.";
    return {
      quiet: { text: quiet, claims: claimCount([planted(quiet)]), cured: claimCount([planted(quiet)], { sentences: anaphoraJoined }) },
      twin: { text: twin, claims: claimCount([planted(twin)]) },
    };
  },
  // R-NEGATION-SCOPE: each negation before the head governs another phrase; its cure reads only the clause nearest the head.
  A5: () => ({
    quiet: [
      "The preview, not the committed render, reads the published head.",
      "No longer experimental, the preview reads the published head.",
      "The preview never fails: it reads the published head.",
    ].map(judgedWith(NEGATION_SCOPE_CURE)),
    twin: twinOf("The preview, unlike the committed render, reads the published head."),
  }),
  // R-OUTSIDE-WALK: the same claim outside docs/workbench markdown, then inside it; its cure walks every planted path.
  A6: () => {
    const quiet = [planted(PLANTED_CLAIM, "README.md"), planted(PLANTED_CLAIM, "docs/programs/planted.md"), planted(PLANTED_CLAIM, `${DOCS_ROOT}/planted.txt`), planted(`// ${PLANTED_CLAIM}`, "src/workbench/planted.ts")];
    const twin = [planted(PLANTED_CLAIM), planted(PLANTED_CLAIM, `${DOCS_ROOT}/receipts/planted.md`)];
    return {
      quiet: { paths: quiet.map(file => file.path), claims: claimCount(quiet), cured: claimCount(quiet, { scope: anyScope }) },
      twin: { paths: twin.map(file => file.path), claims: claimCount(twin) },
    };
  },
  A7: () => MARKUP.map(text => ({ text, claims: claimCount([planted(text)]) })),
  A8: () => JOINS.map(text => ({ text, claims: claimCount([planted(text)]) })),
  A9: () => HIDDEN.map(([hidden, shown]) => ({ hidden, claims: claimCount([planted(hidden)]), shown, shownClaims: claimCount([planted(shown)]) })),
  A10: () => ({ unknown: scanned(planted("The preview reads the published&emsp13;head.")), known: scanned(planted("The preview reads the published&emsp;head.")) }),
  B1: () => {
    const file = EXPORTED.srcSurfaces[0] ?? "";
    const phrase = EXPORTED.anchorPhrase;
    const plantedModule = `// ${phrase}: a comment\nconst a = "${phrase}: one";\nconst b = \`${phrase}: \${a}\`;\nexport const c = [a, b];\n`;
    return { file, anchorLiterals: anchoredLiterals(stringLiterals(file)).length, twin: { module: plantedModule, anchorLiterals: anchoredLiterals(stringLiterals("planted.ts", plantedModule)).length } };
  },
  B2: () => {
    const anchoredAt = (notes: readonly string[]): number[] => notes.flatMap((note, index) => (note.startsWith(EXPORTED.anchorPhrase) ? [index] : []));
    const reading = previewReading();
    const notes = tracked(realRead)(reading).diagnostics;
    const srcNotes = anchoredLiterals(stringLiterals(EXPORTED.srcSurfaces[0] ?? ""));
    return {
      previewContract: isValueObject(reading) && reading.contract === REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
      keyStated: statedWord(reading) !== undefined,
      srcNote: srcNotes.length === 1 && notes[0] === srcNotes[0],
      anchoredAt: anchoredAt(notes),
      twin: { before: TWIN_NOTE, anchoredAt: anchoredAt([TWIN_NOTE, ...notes]) },
    };
  },
  C1: () => {
    const readings = (reader: Reader): Json => {
      const read = tracked(reader);
      const absent = read(previewReading());
      return [...EXPORTED.closedSet, OUTSIDE_WORD].map(word => {
        const projected = projectionOf(read, previewReading(word));
        return { word, reads: projected === null ? "refused" : isDeepStrictEqual(projected, absent) ? "unchanged" : "changed" };
      });
    };
    handed = [];
    const real = readings(realRead);
    const observed = handed;
    handed = undefined;
    return { real, handed: observed, twin: readings(armedStandIn) };
  },
  T1: () => ({ misses: trigger(roster(), tracked(realRead)).misses }),
  T2: () => plantedEach(tracked(unarmedStandIn)),
  T3: () => ({
    armed: plantedEach(tracked(armedStandIn)),
    unarmedArmed: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmed(armedStandIn))),
  }),
  // R-NESTED: a container key the pin fields could ride in, then the key itself, each in the result list; its cure counts the
  // container as the key.
  T4: () => {
    const quiet = withKey(cleared(withKey(roster(), "provenanceKeys", EXPORTED.key)), "resultKeys", CONTAINER_KEY);
    return {
      quiet: { containers: LISTS.filter(list => quiet[list].includes(CONTAINER_KEY)), ...trigger(quiet, tracked(unarmedStandIn)), cured: trigger(quiet, tracked(unarmedStandIn), namesContainer) },
      twin: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmedStandIn)),
    };
  },
  T5: () => Object.fromEntries(Object.entries(PARTIAL).map(([id, read]) => [id, trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(read))])),
};

type Registered = { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean };
/** Every test this file registered (the vitest task tree), in order, with its collected mode and, once it ran, its state. */
function registered(task: TestContext["task"]): Registered[] {
  const walked: Registered[] = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  return walked;
}

describe("wb-973.13 rf definition-source census (SWARM-CONTEXT-GRAPH-R13, the until-then leg and its trigger)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:10", "B:2", "C:1", "T:5"]);
    expect(Object.keys(IMPL).sort(), "a pin without a case, or a case without a pin").toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    const cited: Clause[] = [...ROWS.map(({ source, clause }) => ({ source, clause })), ...ARMED.map(({ clause }) => ({ source: ARMED_SOURCE, clause }))];
    expect(sortedClauses(cited), "the judged clauses against the tracked export's testable clauses").toStrictEqual(sortedClauses(EXPORTED.clauses));
    expect(EXPORTED.unlabeled, "an ACCEPTANCE item with no clause label other than the tracking line").toStrictEqual(NOT_JUDGED);
    expect(EXPORTED.closedSet.includes(OUTSIDE_WORD), "the outside word is in the closed set").toBe(false);
    expect(EXPORTED.contradictions.every(word => EXPORTED.closedSet.includes(word) && word !== EXPORTED.workingTree), "a contradiction word outside the closed set").toBe(true);
    const record = readRfResultRoster();
    expect(
      Object.entries(record)
        .filter(([, value]) => Array.isArray(value))
        .map(([field]) => field),
      "the trigger's key lists against R11's record",
    ).toEqual([...LISTS]);
    expect(EXPORTED.docsSurfaces.length > 0 && EXPORTED.srcSurfaces.length === 1, "the export's SURFACES line names the docs and the one observer module").toBe(true);
    expect(Object.keys(PARTIAL), "T5's partial stand-ins against the armed clauses").toEqual([...ARMED.map(({ id }) => id), "untyped"]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.clause}`, () => {
      for (const pin of row.pins) {
        it(pin.id, () => {
          const impl = IMPL[pin.id];
          expect(impl, `no case for ${pin.id}`).toBeTypeOf("function");
          running = [];
          const witness = impl === undefined ? null : impl();
          const reads = running;
          running = undefined;
          expect(
            pin.seams.filter(seam => !reads.includes(seam)),
            `${pin.id} did not read through every seam it declares`,
          ).toEqual([]);
          expect(witness).toStrictEqual(pin.witness);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    const others = registered(task).filter(entry => !entry.self);
    expect(
      others.map(entry => entry.name),
      "the registered tests",
    ).toEqual([JUDGED_TITLE, ...ROWS.flatMap(row => row.pins.map(pin => pin.id))]);
    expect(
      others.filter(entry => entry.mode !== "run" || entry.fails || entry.state !== "pass").map(entry => `${entry.name}: ${entry.mode}${entry.fails ? "+fails" : ""} ${entry.state ?? "unrun"}`),
      "a registered test skipped, inverted or not passed",
    ).toEqual([]);
  });
});
