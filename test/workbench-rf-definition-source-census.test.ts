/**
 * wb-973.13 (SWARM-CONTEXT-GRAPH-R13), the until-then leg of the definition-source label. Statement (the bead's description in the
 * tracked store export .beads/issues.jsonl, read below as this census's anchor outside itself): "Once RFCLI exposes
 * definition_source (working_tree | published_head | overlay) on the reactive-fiber.render/v1 CLI render envelope under the B26(a)
 * all-or-none pin-key rule, the RF reader adapter shall carry it so the legacy --no-commit preview reads as a working-tree render,
 * never as the published head; until then Pi claims nothing about the definition source beyond today's 'ephemeral noncommitted
 * preview' note."
 *
 * MEASURED AT THE CUT (read-only; 2026-10-26 by the cutting seats of cut #1 and cut #2, re-read 2026-10-27 at cut #3 and cut #4):
 * the named artifact is still absent. The installed rf 0.1.845 (provenance commit 0eaf3859fab0) holds 0 definition_source hits in
 * schemas/cli/context.render.schema.json, and a fresh `rf context render --no-commit --json` in a disposable `rf init` workspace
 * returned a result with no such key (cut #1 and cut #2); the key lives on the persisted pin only
 * (schemas/workspace/render-pin.schema.json requires it; schemas/workspace/render.schema.json holds it with the five other
 * optional pin keys under dependentRequired: present together or absent together). At cut #3 and cut #4 the same release and
 * commit are installed, and those three schema files hold 0, 3 and 8 hits; at the wb-rqfx cut (2026-10-27) the same release is
 * installed at provenance commit 7e6ed89a09f6, and the three files still hold 0, 3 and 8. R11's fixture record
 * (test/fixtures/rf-result-keys.json, rf 0.1.845, source captured; re-read 2026-10-29 at the wb-er9e cut) names it in no key list.
 * So this census lands the acceptance's until-then half and its trigger; the 'Armed on landing' clauses become the trigger's
 * checks (ARMED), never observer behaviour.
 *
 * FORM (standing rule 19(c), engaged at this bead's refusal #3): enumerate-the-resolvable. The pinned set is the cut #3 baseline
 * (22 pins in four rows), no pin of it removed, narrowed or re-scoped, plus the residual pins A15-A19 and A20 (wb-rqfx, the
 * landing-572 follow-up, which keeps that set, carries each planted page's path in its witness, cures the identifier spelling in
 * the judge and adds A20 and five family members); the frozen shape counts them all, and docs/14 holds each residual pin outside
 * the census (RESIDUAL ANCHOR). The header claims exactly that set: REACHED states what the records prove of a case's inputs and
 * lists, as not proven, the rewrites of the census itself that its records do not see; every escape family known at the cut (a
 * page or sentence a reader reads as a claim while the census reads none, or a key nested where the trigger cannot see it) is a
 * named residual (RESIDUALS) with a pinned quiet row, its named cure and its live twin. A residual's quiet row pins the members it
 * lists; the census claims nothing for a family member its cure does not flag (another word for the preview or the head, say).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row):
 *  A the until-then docs census, judged on the RENDERED VIEW below.
 *    A1 the walk of docs/workbench equals git's listing of its markdown (git ls-files --cached --others --exclude-standard: tracked
 *      or untracked, never ignored, present on disk; the walk's anchor outside the census), and git lists at least DOCS_FLOOR
 *      pages; every docs path the export's SURFACES line names is walked and carries preview sentences; no walked page holds a
 *      character reference the rendered view cannot decode; and ONE scan of the walked pages plus a planted claim page (its
 *      claim a soft-wrapped second sentence; the witness carries the page's path and text) finds exactly the planted claim, so
 *      no walked sentence says the preview reads the published head.
 *    A2 the sentence judge on planted sentences, each carried in the witness beside its reading. A claim is a sentence naming the
 *      preview and the published head with no negation before the head. Every preview spelling (preview, previews, previewing,
 *      previewed; pre-view, pre view and pre_view; noncommitted, non-committed, non committed and non_committed; uncommitted,
 *      un-committed, un committed and un_committed; --no-commit or no-commit, no_commit and nocommit; and the dotted capability
 *      id) is the only preview spelling of at least one claim ('no commit', two words, is R-NO-COMMIT's residual). The head is
 *      spelled published head or heads, in any case, the two words joined by a run of these eleven separators: white space, '_',
 *      '-', '*', a backtick, an ASCII apostrophe, an ASCII double quote and the curly quotes U+2018, U+2019, U+201C and U+201D;
 *      each separator is needed by at least one claim (a head term without it misses that claim). No letter or digit may follow
 *      the head, but an underscore may, so it runs on into a snake_case identifier ('the published_head_manifest'), which one
 *      claim needs. The negated, preview-free and head-free sentences are quiet.
 *    A3-A6 and A12-A20 the residuals' quiet rows (RESIDUALS): each quiet input is quiet under today's judge and flagged by its
 *      residual's named cure, beside its live twin, which today's judge flags.
 *    A7 inline markup renders into the sentence it splits: emphasis, strong, strikethrough, a link's text, a code span, an inline
 *      tag, a backslash escape, a heading's and an HTML block's text, a named or numeric character reference, a format code point
 *      (dropped), an inline line-break tag (<br>, <br/>, <BR /> and one with an attribute, each read as a space) and a dash
 *      written as a reference (&hyphen;, &minus; and &#8208;, each read as '-'), each read as one claim.
 *    A8 sentence bounds: a soft wrap, a hard break, a task item's, a list item's and a block quote's continuation line, and a
 *      table row's cells each join into one sentence (one claim each), while a ';', a '!' or a '?' ends one (a preview before
 *      it and a head after it read none).
 *    A9 unrendered text is not judged: an HTML comment (closed or not), a fenced and an indented code block, an inline comment, a
 *      link destination and title, a link reference definition, and a character reference inside a code span (shown as
 *      written) each read no claim, while the same words shown read one.
 *    A10 a named character reference outside NAMED_REFERENCES fails closed: it is reported unreadable (A1 holds every walked page
 *      to none) and renders as written, while a decoded one renders.
 *    A11 every dash joins as '-' does: for each dash code point (Pd in the running engine's Unicode tables, read with \p{Pd}) and
 *      the minus sign U+2212, a planted page joining published and head with it and one joining non and committed with it each
 *      read one claim, all of them scanned in one call, each page at its own path. The witness holds the two page templates,
 *      that each planted page carries its own dash, that the minus sign was planted, and that at least DASH_FLOOR code points
 *      were planted; DASH_FLOOR sits two below the 28 planted at the cut, so an enumeration narrowed by up to two Pd code points
 *      is not seen (the fold itself is held for every one planted).
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
 *    holds); its CALLS hold one roster read and one trigger call handed R11's own record, the real reader and the key's names
 *    rule; T2 the record cleared of the key and then given it in each key list in turn, beside an unarmed stand-in (the real
 *    reader over the reading with the key removed, so T2-T4 never depend on what the real record names or on the observer's
 *    later arming): the trigger fires and names each armed clause the reader misses (the working-tree note, the contradiction
 *    refusal and the closed-set refusal; the absent-key clause holds); T3 the same planted records beside an armed stand-in (the
 *    unarmed one plus the armed clauses): the trigger clears, and the armed stand-in unarmed again misses what T2's reader
 *    misses; T4 R-NESTED's quiet row (its record carries the container key in the result list, and its base record named the
 *    key in another list, which the clearing removes), its cure's reading and its live twin; T5 each armed clause is judged on
 *    its own: a stand-in armed for every clause but one (the contradiction one refuses published_head and admits overlay) misses
 *    exactly that clause, and one refusing with an untyped error instead of the category misses both refusal clauses.
 * RENDERED VIEW (the rendered-text docs truth floor, 9x5.17): marked 18.0.11 (the lexer test/helpers/census.ts and the docs
 * shared-filesystem census use) lexes each page once. A unit is a paragraph, a heading, the text of a list item or block quote, a
 * table row (its cells joined by a space) or an HTML block, numbered by the line its top-level block starts on. A unit renders
 * its text, code spans and backslash escapes as written, emphasis, strong, strikethrough and link text flattened, an inline tag
 * other than a line break, an inline comment and a task checkbox as nothing, and a hard break or an inline <br> tag (any case,
 * with an attribute or a closing slash) as a space; an HTML block renders its source with comments (an unclosed one to its end)
 * and tags removed; a link destination or title, a link reference definition and every fenced or indented code block render
 * nothing. marked lexes no markdown footnotes: a footnote reference ([^label]) stays as written, and a footnote definition is a
 * paragraph, or a link reference definition when its text has that shape (R-FOOTNOTE-REFERENCE and R-FOOTNOTE-DEFINITION).
 * Numeric character references and the names in NAMED_REFERENCES are decoded outside code; any other named reference stays as
 * written and is unreadable. Format code points (Cf) are dropped, every white-space run folds to one space, and every dash (Pd)
 * and the minus sign (U+2212) read as '-' (as the docs shared-filesystem census's folded key reads them). The folded unit splits
 * into sentences after '.', '!', '?' or ';' followed by white space, and each sentence is judged.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * ANCHORS OUTSIDE THE CENSUS (rule 16 CT5/CT6): each row's clause and each ARMED clause is one whole clause of the tracked export
 * description, and together they are exactly its testable clauses: every clause of every labelled ACCEPTANCE item (the one
 * unlabelled item, the tracking line, is the only one not judged) plus the statement's until-then clause. The key, its closed set,
 * the working-tree note, the contradiction words, the refusal category, the anchor phrase and the walked surfaces are read from
 * the export for every check the census runs; where a row clause, an ARMED clause or a witness spells one of them as an expected
 * value, the judged set or the pin's own comparison holds that spelling to the value read from the export, so a respelled value
 * reds. The trigger's key lists are held to the record's own array-valued fields, and A1's walk to git's listing.
 * RESIDUAL ANCHOR (wb-rqfx; rule 16 CT6 at pin level): docs/workbench/14-qa-and-benchmarks.md's section 'RF definition-source
 * census residuals' holds one table row per residual family: its quiet row, the family's name and the seam its named cure takes
 * (judge, splitter, scope, page cure or names rule). The anchor test reads that table (one marked lex of the page; the one level-2
 * heading of that text, bounded at the next level-1 or level-2 heading and holding exactly one table of those three columns) and
 * holds it, in both directions, to the families the pins' calls lists name ('judge <family>', a scan's 'split <family>' or 'scope
 * <family>', 'judge page <family>', a trigger's 'names container (<family>)'), so a residual pin removed with its case, its count
 * and every census mention of its family reds through the docs row.
 * CALLS: while a pin's case runs, every call it makes to a recorded seam is recorded, in call order, as `<seam>` or `<seam> <what
 * the call was handed>`: the docs walk and git's listing their root; a direct sentence judgement the judge by name (census, or the
 * residual whose cure it is); a scan, as one call, its judge, splitter and scope by name (a scan's own sentence judgements are its
 * own work, never calls of the case); a page cure its residual's name; a src read the module's path, or planted for a planted
 * text; a reader projection the reader's name; a roster read; and a trigger call, as one call, the record it was handed (R11 for
 * an object the roster seam returned that equals an independent readRfResultRoster read, and R11, changed, for such an object that
 * no longer equals it; for a record the census built, its derivation from R11's, each clearing and each key put in a list, each
 * step named from its base's name when the step was taken (a base changed before a step names it 'R11, changed, ...'), then ',
 * changed' when the built record no longer equals what its step built; unbuilt for any other), the reader's name and the names
 * rule's name. A pin's calls list must equal that record as a list, in order and with every count: a run of identical calls is
 * written once, followed by ` x<count>` when it repeats (a lossless spelling of the same list). The trigger's armed checks run
 * only once a list names the key, and their own calls and field reads are never recorded, so a case's records never depend on what
 * the record names (the FLIP holds).
 * FIELDS: each field of the tracked export a running case reads, itself or through a seam or helper (never through the trigger's
 * armed checks, whose reads are the trigger's own), is recorded once; a pin's fields list must equal that set. The judged set and
 * the module's set-up read the export unrecorded.
 * REACHED (what these records prove of a case's inputs; nothing beyond it is claimed): each pin's case reads through the seams it
 * declares, and (1) its witness carries, as literals, the inputs it plants: each planted sentence; each planted page's text and
 * path, read from the page its readings were handed (a page is planted once, at one site, for all of its readings, so no reading
 * sits on a page of its own that the witness does not carry); each module, note and word; each built reading's stated word (C1) or
 * its contract and stated key (B2); and each planted record's named lists (T4's container key too). A11's dashes come from the
 * engine's Unicode tables, and its witness holds instead that each planted page carries its own dash, that the minus sign was
 * planted and that at least DASH_FLOOR were planted. So a planted input changed at its one site reds the pin, a page's path moved
 * out of the walked scope or within it included. (2) Its CALLS record holds every recorded call in order with what it was handed,
 * so a case one of whose calls is handed another root, judge, splitter, scope, page cure, src module, reader, record (a record
 * built from a base changed before the step, or changed after its step built it, is another record) or names rule reds, whether or
 * not another call of the same case is handed that input (a residual's twin handed its own row's cure reds); so does a case that
 * makes a recorded call more or fewer times or in another order, and a case swapped for another pin's case. (3) Its FIELDS record
 * holds each export field it reads, so a case that stops reading a field its list names reds. A1's walk is also held to git's
 * listing, and the listing to DOCS_FLOOR. Each residual's quiet input is also read by its named cure, which must flag it, so a
 * quiet input swapped for one its cure does not flag reds, even when the witness's copy of the input is edited to match; and each
 * residual pin, its family and its cure seam are held to docs/14's residual table (RESIDUAL ANCHOR). What this does not prove: (a)
 * a case rewritten together with its whole witness and its calls and fields lists (an input, its copy, its readings and its
 * records), or a pin that is not a residual pin removed together with its case and its count in the frozen shape (such a pin's
 * count is held only by the census's own literal; rows and ARMED clauses are held to the export, and each residual pin to
 * docs/14's residual table); (b) a case whose witness is not the product of the inputs its recorded calls were handed, while it
 * still makes its recorded calls and reads: one rewritten to return its pinned witness, or a part of it, as a constant; to compute
 * it out of the record (inside quietly(), say, through another judge, splitter, scope or cure, as A3's twin valued by
 * R-PARAPHRASE's cure would be); or to hand a recorded call a page planted at a site of its own while the witness carries another;
 * (c) a seam's own implementation rewritten (the walk, the listing, the rendered view, a judge, splitter, scope or cure, the src
 * read, the reading fixture, a reader or stand-in, the roster read, a record's derivation, the trigger, A11's dash enumeration
 * (narrowed by at most two Pd code points, which DASH_FLOOR admits), or the CALLS and FIELDS records themselves), for example the
 * walk and the listing both made to skip the same pages, which DOCS_FLOOR bounds to two pages at the cut; (d) a census constant
 * edited at its definition when no witness or list spells the edited value (the readings' workspace root and host context, a floor
 * lowered, a NAMED_REFERENCES entry no pin exercises), which moves every case that reads it together, or a literal written at one
 * read site of an export field the case still reads at another (FIELDS is per field, never per read site). Those are rewrites of
 * the census, not swaps of a case's inputs. The last test holds every registered test to run mode and a pass.
 * RESIDUALS (named families, each with a pinned quiet row, its named cure and its live twin):
 *  R-PARAPHRASE (A3) a claim naming the head in other words than 'published head' is not judged: the store-resident head's
 *    manifest, a word between published and head ('the published graph head'), that word set off by punctuation ('the published
 *    (current) head', 'the published, signed head'), or the head named before published ('the head that was published'); cure:
 *    the head term also reads 'store-resident head', 'published <word> head' with any punctuation around the word, and 'head
 *    that (or which) was (were, is, are) published'.
 *  R-ANAPHORA (A4) a claim whose preview stands in an earlier sentence, after a period or a ';' ('The preview is noncommitted.
 *    It reads the published head.', 'Previewing is noncommitted; it reads the published head.'), is not judged; cure: a sentence
 *    opening with it, this or that, in any case, joins the sentence before it.
 *  R-NEGATION-SCOPE (A5) a negation in a clause before the head's own (set off by ',', ':' or ';') that governs another phrase
 *    reads the sentence as negated ('The preview, not the committed render, reads the published head.', 'No longer
 *    experimental, the preview reads the published head.', 'The preview never fails: it reads the published head.'); cure: only
 *    the clause nearest the head (after the last ',', ':' or ';' before it) is read for a negation (a negation inside the head's
 *    own clause is R-NEGATION-PHRASE's).
 *  R-OUTSIDE-WALK (A6) text outside the docs/workbench markdown is not walked: the root README, docs/programs, a .txt under
 *    docs/workbench, a src comment; cure: every planted path is in scope.
 *  R-ABBREVIATION (A12) a period after the abbreviation i.e., e.g., cf. or vs. ends the sentence, so a claim it splits reads none
 *    ('The preview reads, i.e. resolves, the published head.', 'The preview (cf. the docs) reads the published head.', 'Previews
 *    (vs. commits) read the published head.'); cure: a period after one of the four, in any case, does not end a sentence.
 *  R-PREVIEW-WORDS (A13) a claim naming the preview in other words is not judged ('The ephemeral render reads the published
 *    head.', 'A dry-run render ...', 'A non-committing render ...'); cure: the preview term also reads ephemeral, dry-run and
 *    non-committing.
 *  R-FOOTNOTE (A14) a superscript footnote marker between published and head hides the head: an inline <sup> element ('The
 *    preview reads the published<sup>1</sup> head.' renders as 'published1 head') or a superscript digit (U+00B9 written after
 *    published); cure: an inline <sup> element and a superscript digit (U+00B9, U+00B2, U+00B3, U+2070, U+2074-U+2079) render
 *    nothing (the markdown footnote reference is R-FOOTNOTE-REFERENCE's, and a run of <sub> and <sup> is R-MARKER-RUN's).
 *  R-FOOTNOTE-REFERENCE (A15) a markdown footnote reference between published and head stays as written and hides the head ('The
 *    preview reads the published[^1] head.' renders as 'published[^1] head'); cure: a footnote reference ([^label] not followed by
 *    ':') renders nothing.
 *  R-FOOTNOTE-DEFINITION (A16) a markdown footnote definition whose text has the shape of a link reference definition (a
 *    destination, then a quoted title) is lexed as one and renders nothing ("[^1]: https://example.com 'The preview reads the
 *    published head.'"); cure: a footnote definition's marker ([^label]: at a line start) is dropped, so its text renders as a
 *    paragraph.
 *  R-SUBSCRIPT (A17) an inline <sub> element between published and head hides the head ('The preview reads the
 *    published<sub>1</sub> head.' renders as 'published1 head'); cure: an inline <sub> element renders nothing.
 *  R-NO-COMMIT (A18) the preview written as the two words 'no commit' is not judged: the preview term does not read it, and its
 *    'no' reads as a negation before the head ('A no commit render reads the published head.', 'The no commit preview reads the
 *    published head.'); cure: the preview term also reads 'no commit', and a 'no' before 'commit' is never read as a negation.
 *  R-NEGATION-PHRASE (A19) a negation inside the head's own clause that governs another phrase reads the sentence as negated
 *    ('The preview makes no change and reads the published head.', 'The preview without a commit reads the published head.');
 *    cure: only the three words before the head are read for a negation.
 *  R-MARKER-RUN (A20) a run of inline markers of two kinds between published and head, a <sub> element then a <sup> element, hides
 *    the head ('The preview reads the published<sub>1</sub><sup>2</sup> head.' renders as 'published12 head'); R-FOOTNOTE's and
 *    R-SUBSCRIPT's cures each leave the other kind, so neither flags it; cure: every inline <sub> and <sup> element renders
 *    nothing.
 *  R-NESTED (T4) the trigger sees only the record's key lists, so the key nested in a result object no list names (a pin
 *    container, or provenance beyond its floor keys) stays invisible until a roster cut names the key itself; cure: a list naming
 *    the container counts as naming the key.
 * FLIP (measured on throwaway plants at the cut): a roster naming definition_source reds T1 alone until the observer case exists;
 * the observer case clears T1 and flips C1 (a stated key is then read), so the cut that lands it rewrites C1 in the same commit.
 * T1's calls hold under the FLIP: the trigger records one call (its record, reader and names rule), never the armed checks' own
 * calls or field reads.
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
const RESIDUAL_TITLE = "the residual anchor: the docs/14 residual table names exactly the residual pins, their families and their cure seams";

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isJsonObject = (value: Json | undefined): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isCategory = (word: string): word is CapabilityErrorCategory => CATEGORIES.some(category => category === word);

/** The seams a pin's case reads through; each read is recorded against the case that is running. */
type Seam = "docs" | "listing" | "judge" | "src" | "reader" | "roster" | "trigger" | "export";
let running: Seam[] | undefined;
/** Every call the running case makes to a recorded seam, in call order, as `<seam>` or `<seam> <what the call was handed>` (CALLS
 * in the header). */
let calls: string[] | undefined;
/** Each field of the tracked export the running case reads (FIELDS in the header). */
let fields: string[] | undefined;
function touch(seam: Seam, input?: string): void {
  if (running !== undefined && !running.includes(seam)) running.push(seam);
  calls?.push(input === undefined ? seam : `${seam} ${input}`);
}
function readField(field: string): void {
  if (running !== undefined && !running.includes("export")) running.push("export");
  if (fields !== undefined && !fields.includes(field)) fields.push(field);
}
/** A seam's own work (a scan's sentence judgements, the trigger's armed checks) is never the case's: its calls and field reads are
 * not recorded. */
function quietly<T>(work: () => T): T {
  const outer = { calls, fields };
  calls = undefined;
  fields = undefined;
  try {
    return work();
  } finally {
    calls = outer.calls;
    fields = outer.fields;
  }
}
/** A call record spelled with each run of identical calls written once, followed by ` x<count>` when it repeats (lossless). */
function runs(record: readonly string[]): string[] {
  const spelled: string[] = [];
  let index = 0;
  while (index < record.length) {
    const call = record[index] ?? "";
    let end = index + 1;
    while (end < record.length && record[end] === call) end += 1;
    spelled.push(end - index === 1 ? call : `${call} x${end - index}`);
    index = end;
  }
  return spelled;
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
/** The tracked export's values. Each field a running case reads, itself or through a seam or helper it calls, is recorded once in
 * its FIELDS; the judged set and the module's set-up read it unrecorded. */
const EXPORTED: Exported = new Proxy(readExported(), {
  get(target, field, receiver) {
    if (typeof field === "string") readField(field);
    return Reflect.get(target, field, receiver);
  },
});
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
  touch("docs", DOCS_ROOT);
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
  touch("listing", root);
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
/** An inline line-break tag (<br>, in any case, with an attribute or a closing slash), which the view renders as a space. */
const LINE_BREAK_TAG = /^<br(?:\s[^<>]*)?\/?>$/i;
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
/** What a reader sees of inline tokens: markup flattened, a hard break or an inline line-break tag a space, any other inline tag, a
 * comment or a checkbox nothing. */
function inlineText(tokens: readonly Token[], unknown: string[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html" && LINE_BREAK_TAG.test(token.raw)) out += " ";
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
/** Every dash (Pd) and the minus sign (U+2212), which the view reads as '-' (as the docs shared-filesystem census's folded key does). */
const DASH = /[\p{Pd}\u2212]/gu;
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
      const text = folded(unit).replace(DASH, "-");
      if (text.length > 0) units.push({ line, text });
    }
    line += newlines(token.raw);
    cursor = start + token.raw.length;
  }
  return { units, unknown };
}

/** The preview: preview and its forms, noncommitted and uncommitted, each also written with a '-', a space or an '_' at its join
 * (pre-view, non committed, un_committed), and the no-commit flag, also written no_commit or nocommit ('no commit', two words, is
 * R-NO-COMMIT's residual). */
const PREVIEW_TERM = /\bpre[\s_-]?view(?:s|ing|ed)?\b|\b(?:non|un)[\s_-]?committed\b|(?:--|\b)no[_-]?commit\b/i;
/** The head: published head or heads, the words joined by white space, '_', '-', '*', a backtick or a quote mark (a rendered
 * escape or quote between them never hides it), with no letter or digit right after the head: an underscore may follow, so the
 * head runs on into a snake_case identifier (published_head_manifest). */
const HEAD_TERM = /\bpublished[\s_*'"`\u2018\u2019\u201C\u201D-]+heads?(?![^\W_])/i;
/** A negation word; the 'no' of --no-commit, no-commit, no_commit or nocommit is a flag, never a negation. */
const NEGATION = /\b(?:never|not|nor|without|cannot)\b|n't\b|(?<![-\w])no\b(?!-)/i;
interface Judge {
  /** Where the sentence names the preview: PREVIEW_TERM unless a cure widens it. */
  readonly preview?: RegExp;
  /** Where the sentence names the published head. */
  readonly head: RegExp;
  /** The text before the head that is read for a negation. */
  readonly window: (before: string) => string;
}
const JUDGE: Judge = { head: HEAD_TERM, window: before => before };
/** R-PARAPHRASE's cure: the head term also reads the store-resident head, a word between published and head with any punctuation
 * around it (the published graph head, the published (current) head, the published, signed head), and the head that was
 * published. */
const PARAPHRASE_CURE: Judge = {
  head: new RegExp(`${HEAD_TERM.source}|\\bstore-resident[\\s_-]+heads?\\b|\\bpublished[\\W_]+\\w+[\\W_]+heads?\\b|\\bheads?\\s+(?:that|which)\\s+(?:was|were|is|are)\\s+published\\b`, "i"),
  window: before => before,
};
/** R-NEGATION-SCOPE's cure: only the clause nearest the head (after the last ',', ':' or ';' before it) is read for a negation. */
const NEGATION_SCOPE_CURE: Judge = { head: HEAD_TERM, window: before => before.split(/[,:;]/).pop() ?? "" };
/** R-PREVIEW-WORDS' cure: the preview term also reads ephemeral, dry-run and non-committing. */
const PREVIEW_WORDS_CURE: Judge = { preview: new RegExp(`${PREVIEW_TERM.source}|\\bephemeral\\b|\\bdry-run\\b|\\bnon-committing\\b`, "i"), head: HEAD_TERM, window: before => before };
/** R-NO-COMMIT's cure: the preview term also reads 'no commit' (two words), and a 'no' before 'commit' is never read as a negation. */
const NO_COMMIT_CURE: Judge = { preview: new RegExp(`${PREVIEW_TERM.source}|\\bno\\s+commit\\b`, "i"), head: HEAD_TERM, window: before => before.replace(/\bno\s+(?=commit\b)/gi, "") };
/** R-NEGATION-PHRASE's cure: only the three words before the head are read for a negation. */
const NEGATION_PHRASE_CURE: Judge = { head: HEAD_TERM, window: before => before.trim().split(/\s+/).slice(-3).join(" ") };
/** Each judge by name, recorded in a case's calls. */
const JUDGES: ReadonlyMap<Judge, string> = new Map<Judge, string>([
  [JUDGE, "census"],
  [PARAPHRASE_CURE, "R-PARAPHRASE"],
  [NEGATION_SCOPE_CURE, "R-NEGATION-SCOPE"],
  [PREVIEW_WORDS_CURE, "R-PREVIEW-WORDS"],
  [NO_COMMIT_CURE, "R-NO-COMMIT"],
  [NEGATION_PHRASE_CURE, "R-NEGATION-PHRASE"],
]);
/** A sentence says the preview reads the published head when it names the preview and the head and no negation comes before the
 * head (in the judge's window). */
function claimsWith(judge: Judge, sentence: string): boolean {
  touch("judge", JUDGES.get(judge) ?? "unnamed");
  const head = judge.head.exec(sentence);
  if (head === null || !(judge.preview ?? PREVIEW_TERM).test(sentence)) return false;
  return !NEGATION.test(judge.window(sentence.slice(0, head.index)));
}
const claimsHead = (sentence: string): boolean => claimsWith(JUDGE, sentence);
const sentencesOf = (text: string): string[] => text.split(/(?<=[.!?;])\s+/).filter(part => part.trim().length > 0);
/** R-ANAPHORA's cure: a sentence opening with it, this or that, in any case, joins the sentence before it. */
function anaphoraJoined(text: string): string[] {
  const joined: string[] = [];
  for (const part of sentencesOf(text)) {
    const last = joined.length - 1;
    if (/^(?:it|this|that)\b/i.test(part) && last >= 0) joined[last] = `${joined[last] ?? ""} ${part}`;
    else joined.push(part);
  }
  return joined;
}
/** R-ABBREVIATION's cure: a period after i.e., e.g., cf. or vs. (in any case) does not end a sentence. */
const ABBREVIATION = /\b(?:i\.e|e\.g|cf|vs)\.$/i;
function abbreviationJoined(text: string): string[] {
  const joined: string[] = [];
  for (const part of sentencesOf(text)) {
    const last = joined.length - 1;
    if (last >= 0 && ABBREVIATION.test(joined[last] ?? "")) joined[last] = `${joined[last] ?? ""} ${part}`;
    else joined.push(part);
  }
  return joined;
}
const inScope = (path: string): boolean => path.startsWith(`${DOCS_ROOT}/`) && isMarkdown(path);
/** R-OUTSIDE-WALK's cure: every planted path is in scope. */
const anyScope = (): boolean => true;
/** Each sentence splitter and scope by name, recorded in a scan's call. */
const SPLITTERS: ReadonlyMap<(text: string) => string[], string> = new Map<(text: string) => string[], string>([
  [sentencesOf, "census"],
  [anaphoraJoined, "R-ANAPHORA"],
  [abbreviationJoined, "R-ABBREVIATION"],
]);
const SCOPES: ReadonlyMap<(path: string) => boolean, string> = new Map<(path: string) => boolean, string>([
  [inScope, "census"],
  [anyScope, "R-OUTSIDE-WALK"],
]);
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
 * each scanned file's preview sentence count, and every reference the rendered view cannot decode (`path reference`). One call of
 * the case, recorded with the judge, splitter and scope it was handed by name. */
function scan(files: readonly DocFile[], options: ScanOptions = {}): Scan {
  const judge = options.judge ?? JUDGE;
  const split = options.sentences ?? sentencesOf;
  const within = options.scope ?? inScope;
  touch("judge", `scan ${JUDGES.get(judge) ?? "unnamed"}; split ${SPLITTERS.get(split) ?? "unnamed"}; scope ${SCOPES.get(within) ?? "unnamed"}`);
  return quietly(() => judgedPages(files, judge, split, within));
}
/** A scan's own work: each in-scope file rendered and each of its sentences judged. */
function judgedPages(files: readonly DocFile[], judge: Judge, split: (text: string) => string[], within: (path: string) => boolean): Scan {
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
/** R-FOOTNOTE's cure: a footnote marker renders nothing, an inline <sup> element or a superscript digit (U+00B9, U+00B2, U+00B3,
 * U+2070 and U+2074-U+2079); each is stripped from the page before the view renders it. */
const SUPERSCRIPT = /<sup\b[^<>]*>[\s\S]*?<\/sup>/gi;
const SUPERSCRIPT_DIGIT = /[\u00B9\u00B2\u00B3\u2070\u2074-\u2079]/g;
function footnoteCured(file: DocFile): DocFile {
  touch("judge", "page R-FOOTNOTE");
  return { path: file.path, text: file.text.replace(SUPERSCRIPT, "").replace(SUPERSCRIPT_DIGIT, "") };
}
/** R-FOOTNOTE-REFERENCE's cure: a markdown footnote reference ([^label] not followed by ':') renders nothing. */
const FOOTNOTE_REFERENCE = /\[\^[^\]\s]+\](?!:)/g;
function footnoteReferenceCured(file: DocFile): DocFile {
  touch("judge", "page R-FOOTNOTE-REFERENCE");
  return { path: file.path, text: file.text.replace(FOOTNOTE_REFERENCE, "") };
}
/** R-FOOTNOTE-DEFINITION's cure: a markdown footnote definition's marker ([^label]: at a line start) is dropped, so its text
 * renders as a paragraph. */
const FOOTNOTE_DEFINITION = /^ {0,3}\[\^[^\]\s]+\]:[ \t]*/gm;
function footnoteDefinitionCured(file: DocFile): DocFile {
  touch("judge", "page R-FOOTNOTE-DEFINITION");
  return { path: file.path, text: file.text.replace(FOOTNOTE_DEFINITION, "") };
}
/** R-SUBSCRIPT's cure: an inline <sub> element renders nothing. */
const SUBSCRIPT = /<sub\b[^<>]*>[\s\S]*?<\/sub>/gi;
function subscriptCured(file: DocFile): DocFile {
  touch("judge", "page R-SUBSCRIPT");
  return { path: file.path, text: file.text.replace(SUBSCRIPT, "") };
}
/** R-MARKER-RUN's cure: every inline <sub> and <sup> element renders nothing, so a run of both kinds of marker is undone at once. */
function markerRunCured(file: DocFile): DocFile {
  touch("judge", "page R-MARKER-RUN");
  return { path: file.path, text: file.text.replace(SUBSCRIPT, "").replace(SUPERSCRIPT, "") };
}
/** A1's planted claim page: its claim a soft-wrapped second sentence, scanned with the walked pages in one call. */
const PLANTED_PAGE: DocFile = planted("# Planted page\n\nFixture text is never real context. The rf preview reads the\npublished head.\n", `${DOCS_ROOT}/zz-wb-973-13-planted.md`);

// ---------------------------------------------------------------------------------------------
// The src read, the reader and the trigger.
// ---------------------------------------------------------------------------------------------

/** Every string literal of a src module (read from disk, or the planted text), template parts included; comments are never
 * literals. */
function stringLiterals(path: string, plantedText?: string): string[] {
  touch("src", plantedText === undefined ? path : "planted");
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
/** The reader each tracked wrapper reads through, so a seam can name the reader it was handed. */
const trackedBase = new WeakMap<Reader, Reader>();
/** A reader the census judges: each projection it makes is a read through the reader seam, recorded with the reader's name. */
function tracked(reader: Reader): Reader {
  const read: Reader = reading => {
    touch("reader", readerName(reader));
    return reader(reading);
  };
  trackedBase.set(read, reader);
  return read;
}
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
/** Each reader the census hands a seam, by name (T3's armed stand-in unarmed again is named below). */
const unarmedArmedStandIn: Reader = unarmed(armedStandIn);
const READERS: ReadonlyMap<Reader, string> = new Map<Reader, string>([
  [realRead, "real"],
  [unarmedStandIn, "unarmed stand-in"],
  [armedStandIn, "armed stand-in"],
  [unarmedArmedStandIn, "armed stand-in, unarmed again"],
  ...Object.entries(PARTIAL).map(([id, reader]): [Reader, string] => [reader, `partial stand-in ${id}`]),
]);
function readerName(reader: Reader): string {
  return READERS.get(trackedBase.get(reader) ?? reader) ?? "unnamed";
}
/** How each record the census holds was derived from R11's own: R11, then each clearing and each key put in a list, in order,
 * each step named from its base's name when the step was taken. */
interface Derivation {
  readonly name: string;
  /** What the step built, copied when it built it; R11 itself is held to an independent read instead. */
  readonly built?: RfResultRoster;
}
const derivations = new WeakMap<RfResultRoster, Derivation>();
/** R11's fixture record, read through its own reader. */
function roster(): RfResultRoster {
  touch("roster");
  const record = readRfResultRoster();
  derivations.set(record, { name: "R11" });
  return record;
}
/** A record's name: its derivation, followed by ', changed' once it no longer equals what it was (an independent read for R11, what
 * its step built for a built record); unbuilt for a record the census neither read nor built. */
function recordName(record: RfResultRoster): string {
  const derivation = derivations.get(record);
  if (derivation === undefined) return "unbuilt";
  return isDeepStrictEqual(record, derivation.built ?? readRfResultRoster()) ? derivation.name : `${derivation.name}, changed`;
}
/** A step the census took: the record it built, named from its base's name when the step was taken, beside a copy of what it built. */
function built(copy: RfResultRoster, name: string): RfResultRoster {
  derivations.set(copy, { name, built: structuredClone(copy) });
  return copy;
}
/** The record with the key removed from every key list: the base T2-T4 plant onto. */
function cleared(record: RfResultRoster): RfResultRoster {
  const copy = { ...record };
  for (const list of LISTS) copy[list] = record[list].filter(key => key !== EXPORTED.key);
  return built(copy, `${recordName(record)}, cleared`);
}
/** The record with `key` appended to one key list. */
function withKey(record: RfResultRoster, list: KeyList, key: string): RfResultRoster {
  const copy = { ...record };
  copy[list] = [...record[list], key];
  return built(copy, `${recordName(record)}, ${key} in ${list}`);
}
/** Whether one key list of a record names the key. */
type Names = (record: RfResultRoster, list: KeyList) => boolean;
const namesKey: Names = (record, list) => record[list].includes(EXPORTED.key);
/** R-NESTED's cure: a list naming the container counts as naming the key. */
const namesContainer: Names = (record, list) => namesKey(record, list) || record[list].includes(CONTAINER_KEY);
/** Each names rule by name. */
const NAMES: ReadonlyMap<Names, string> = new Map<Names, string>([
  [namesKey, "key"],
  [namesContainer, "container (R-NESTED)"],
]);
/** The trigger (freeze-and-flip): nothing is due while no key list of the record names the key; once one does, each armed clause
 * the reader misses is one miss, so the default gate reds until the observer case exists. `named` is the lists that name it. */
function trigger(record: RfResultRoster, read: Reader, names: Names = namesKey): { named: string[]; misses: string[] } {
  touch("trigger", `record ${recordName(record)}; reader ${readerName(read)}; names ${NAMES.get(names) ?? "unnamed"}`);
  const named = LISTS.filter(list => names(record, list));
  if (named.length === 0) return { named, misses: [] };
  // The armed checks run only once a list names the key, so what they call and read is the trigger's own, never the case's.
  return { named, misses: quietly(() => ARMED.filter(check => !check.holds(read)).map(check => check.id)) };
}
const plantedEach = (read: Reader): Json => Object.fromEntries(LISTS.map(list => [list, trigger(withKey(cleared(roster()), list, EXPORTED.key), read)]));

interface Pin {
  readonly id: string;
  readonly seams: readonly Seam[];
  /** Every call the case makes to a recorded seam, in order, a run of identical calls written once with ` x<count>` (CALLS in the
   * header); the run's record must equal it as a list. */
  readonly calls: readonly string[];
  /** Each field of the tracked export the case reads (FIELDS in the header); the run's record must equal it as a set. */
  readonly fields: readonly string[];
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
        calls: ["listing docs/workbench", "docs docs/workbench", "judge scan census; split census; scope census"],
        fields: ["docsSurfaces"],
        witness: {
          planted: {
            path: "docs/workbench/zz-wb-973-13-planted.md",
            text: ["# Planted page", "", "Fixture text is never real context. The rf preview reads the", "published head.", ""].join("\n"),
          },
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
        calls: ["judge census x35"],
        fields: [],
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
          { sentence: "The preview reads the published*head.", claims: true },
          { sentence: 'The preview reads the published "head".', claims: true },
          { sentence: "The preview reads the published `head`.", claims: true },
          { sentence: `The preview reads the published ${at(0x2018)}head${at(0x2019)}.`, claims: true },
          { sentence: `The preview reads the ${at(0x2018)}published${at(0x2019)} head.`, claims: true },
          { sentence: `The preview reads the published ${at(0x201c)}head${at(0x201d)}.`, claims: true },
          { sentence: `The preview reads the ${at(0x201c)}published${at(0x201d)} head.`, claims: true },
          { sentence: "The pre-view reads the published head.", claims: true },
          { sentence: "The pre view reads the published head.", claims: true },
          { sentence: "The pre_view reads the published head.", claims: true },
          { sentence: "The non committed render reads the published head.", claims: true },
          { sentence: "The non_committed render reads the published head.", claims: true },
          { sentence: "The un-committed render reads the published head.", claims: true },
          { sentence: "The un committed render reads the published head.", claims: true },
          { sentence: "The un_committed render reads the published head.", claims: true },
          { sentence: "A no_commit render reads the published head.", claims: true },
          { sentence: "A nocommit render reads the published head.", claims: true },
          { sentence: "The preview reads the published_head_manifest.", claims: true },
          { sentence: "The noncommitted preview never reads the published head.", claims: false },
          { sentence: "The preview does not read the published head.", claims: false },
          { sentence: "rf graph publish promotes a candidate to the published head.", claims: false },
          { sentence: "The preview reads the working tree.", claims: false },
        ],
      },
      {
        id: "A3",
        seams: ["judge"],
        calls: ["judge census", "judge R-PARAPHRASE", "judge census", "judge R-PARAPHRASE", "judge census", "judge R-PARAPHRASE", "judge census", "judge R-PARAPHRASE", "judge census", "judge R-PARAPHRASE", "judge census"],
        fields: [],
        witness: {
          quiet: [
            { sentence: "The preview reads the store-resident head's manifest.", judged: false, cured: true },
            { sentence: "The preview reads the published graph head.", judged: false, cured: true },
            { sentence: "The preview reads the published (current) head.", judged: false, cured: true },
            { sentence: "The preview reads the published, signed head.", judged: false, cured: true },
            { sentence: "The preview reads the head that was published.", judged: false, cured: true },
          ],
          twin: { sentence: "The preview reads the published head's manifest.", judged: true },
        },
      },
      {
        id: "A4",
        seams: ["judge"],
        calls: [
          "judge scan census; split census; scope census",
          "judge scan census; split R-ANAPHORA; scope census",
          "judge scan census; split census; scope census",
          "judge scan census; split R-ANAPHORA; scope census",
          "judge scan census; split census; scope census",
        ],
        fields: [],
        witness: {
          quiet: [
            { text: "The preview is noncommitted. It reads the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
            { text: "Previewing is noncommitted; it reads the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          ],
          twin: { text: "The preview is noncommitted and reads the published head.", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A5",
        seams: ["judge"],
        calls: ["judge census", "judge R-NEGATION-SCOPE", "judge census", "judge R-NEGATION-SCOPE", "judge census", "judge R-NEGATION-SCOPE", "judge census"],
        fields: [],
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
        calls: ["judge scan census; split census; scope census", "judge scan census; split census; scope R-OUTSIDE-WALK", "judge scan census; split census; scope census"],
        fields: [],
        witness: {
          planted: {
            quiet: ["The preview reads the published head.", "The preview reads the published head.", "The preview reads the published head.", "// The preview reads the published head."],
            twin: ["The preview reads the published head.", "The preview reads the published head."],
          },
          quiet: { paths: ["README.md", "docs/programs/planted.md", "docs/workbench/planted.txt", "src/workbench/planted.ts"], claims: 0, cured: 4 },
          twin: { paths: ["docs/workbench/planted.md", "docs/workbench/receipts/planted.md"], claims: 2 },
        },
      },
      {
        id: "A7",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census x19"],
        fields: [],
        witness: [
          { text: "The preview reads the *published* head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the **published head**.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published [head](#pins).", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The `--no-commit` render reads the published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the <em>published</em> head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "<p>The preview reads the published head.</p>", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&nbsp;head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&#160;head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&ZeroWidthSpace; head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the ~~published~~ head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the \\*published\\* head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "## The preview reads the published head", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published<br>head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published<br/>head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published<BR />head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: 'The preview reads the published<br class="x">head.', path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&hyphen;head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&minus;head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the published&#8208;head.", path: "docs/workbench/planted.md", claims: 1 },
        ],
      },
      {
        id: "A8",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census x11"],
        fields: [],
        witness: [
          { text: "The preview reads the\npublished head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview\nreads the published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The --no-commit render keeps the working tree out of the store and,\nunlike the committed render, reads the published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The preview reads the  \npublished head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "- The preview reads the\n  published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "> The preview reads the\n> published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "| The preview | reads the published head. |\n| --- | --- |", path: "docs/workbench/planted.md", claims: 1 },
          { text: "- [ ] The preview reads the\n  published head.", path: "docs/workbench/planted.md", claims: 1 },
          { text: "The --no-commit preview reads the working tree; the committed render reads the published head.", path: "docs/workbench/planted.md", claims: 0 },
          { text: "The preview is noncommitted! The committed render reads the published head.", path: "docs/workbench/planted.md", claims: 0 },
          { text: "Is the preview noncommitted? The committed render reads the published head.", path: "docs/workbench/planted.md", claims: 0 },
        ],
      },
      {
        id: "A9",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census x18"],
        fields: [],
        witness: [
          { hidden: { text: "<!-- The preview reads the published head. -->", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the published head.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "```\nThe preview reads the published head.\n```", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the published head.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "Intro.\n\n    The preview reads the published head.", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "Intro.\n\nThe preview reads the published head.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "The preview reads the <!-- published head --> working tree.", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the published head working tree.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "The preview reads [the docs](#published-head).", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads [the published head](#docs).", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "<!-- The preview reads the published head.", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the published head.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: 'The preview reads [the docs](#x "the published head").', path: "docs/workbench/planted.md", claims: 0 }, shown: { text: 'The preview reads [the published head](#x "the docs").', path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: '[preview]: #x "The preview reads the published head."\n\nSee the docs.', path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the published head.\n\nSee the docs.", path: "docs/workbench/planted.md", claims: 1 } },
          { hidden: { text: "The preview reads the `published&nbsp;head`.", path: "docs/workbench/planted.md", claims: 0 }, shown: { text: "The preview reads the `published head`.", path: "docs/workbench/planted.md", claims: 1 } },
        ],
      },
      {
        id: "A10",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census x2"],
        fields: [],
        witness: {
          unknown: { text: "The preview reads the published&emsp13;head.", path: "docs/workbench/planted.md", unreadable: ["docs/workbench/planted.md &emsp13;"], claims: 0 },
          known: { text: "The preview reads the published&emsp;head.", path: "docs/workbench/planted.md", unreadable: [], claims: 1 },
        },
      },
      {
        id: "A11",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census"],
        fields: [],
        witness: { pages: ["The preview reads the published{dash}head.", "The non{dash}committed render reads the published head."], planted: true, dashes: true, minus: true, unread: [] },
      },
      {
        id: "A12",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census", "judge scan census; split R-ABBREVIATION; scope census", "judge scan census; split census; scope census", "judge scan census; split R-ABBREVIATION; scope census", "judge scan census; split census; scope census", "judge scan census; split R-ABBREVIATION; scope census", "judge scan census; split census; scope census", "judge scan census; split R-ABBREVIATION; scope census", "judge scan census; split census; scope census"],
        fields: [],
        witness: {
          quiet: [
            { text: "The preview reads, i.e. resolves, the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
            { text: "The preview reads, e.g. resolves, the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
            { text: "The preview (cf. the docs) reads the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
            { text: "Previews (vs. commits) read the published head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          ],
          twin: { text: "The preview reads, that is resolves, the published head.", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A13",
        seams: ["judge"],
        calls: ["judge census", "judge R-PREVIEW-WORDS", "judge census", "judge R-PREVIEW-WORDS", "judge census", "judge R-PREVIEW-WORDS", "judge census"],
        fields: [],
        witness: {
          quiet: [
            { sentence: "The ephemeral render reads the published head.", judged: false, cured: true },
            { sentence: "A dry-run render reads the published head.", judged: false, cured: true },
            { sentence: "A non-committing render reads the published head.", judged: false, cured: true },
          ],
          twin: { sentence: "The noncommitted render reads the published head.", judged: true },
        },
      },
      {
        id: "A14",
        seams: ["judge"],
        calls: [
          "judge scan census; split census; scope census",
          "judge page R-FOOTNOTE",
          "judge scan census; split census; scope census x2",
          "judge page R-FOOTNOTE",
          "judge scan census; split census; scope census x2",
        ],
        fields: [],
        witness: {
          quiet: [
            { text: "The preview reads the published<sup>1</sup> head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
            { text: `The preview reads the published${at(0xb9)} head.`, path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          ],
          twin: { text: "The preview reads the published head.<sup>1</sup>", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A15",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census", "judge page R-FOOTNOTE-REFERENCE", "judge scan census; split census; scope census x2"],
        fields: [],
        witness: {
          quiet: { text: "The preview reads the published[^1] head.\n\n[^1]: A note.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          twin: { text: "The preview reads the published head.[^1]\n\n[^1]: A note.", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A16",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census", "judge page R-FOOTNOTE-DEFINITION", "judge scan census; split census; scope census x2"],
        fields: [],
        witness: {
          quiet: { text: "Intro.[^1]\n\n[^1]: https://example.com 'The preview reads the published head.'", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          twin: { text: "Intro.[^1]\n\n[^1]: The preview reads the published head.", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A17",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census", "judge page R-SUBSCRIPT", "judge scan census; split census; scope census x2"],
        fields: [],
        witness: {
          quiet: { text: "The preview reads the published<sub>1</sub> head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          twin: { text: "The preview reads the published head.<sub>1</sub>", path: "docs/workbench/planted.md", claims: 1 },
        },
      },
      {
        id: "A18",
        seams: ["judge"],
        calls: ["judge census", "judge R-NO-COMMIT", "judge census", "judge R-NO-COMMIT", "judge census"],
        fields: [],
        witness: {
          quiet: [
            { sentence: "A no commit render reads the published head.", judged: false, cured: true },
            { sentence: "The no commit preview reads the published head.", judged: false, cured: true },
          ],
          twin: { sentence: "A no-commit render reads the published head.", judged: true },
        },
      },
      {
        id: "A19",
        seams: ["judge"],
        calls: ["judge census", "judge R-NEGATION-PHRASE", "judge census", "judge R-NEGATION-PHRASE", "judge census"],
        fields: [],
        witness: {
          quiet: [
            { sentence: "The preview makes no change and reads the published head.", judged: false, cured: true },
            { sentence: "The preview without a commit reads the published head.", judged: false, cured: true },
          ],
          twin: { sentence: "The preview makes a change and reads the published head.", judged: true },
        },
      },
      {
        id: "A20",
        seams: ["judge"],
        calls: ["judge scan census; split census; scope census", "judge page R-MARKER-RUN", "judge scan census; split census; scope census x2"],
        fields: [],
        witness: {
          quiet: { text: "The preview reads the published<sub>1</sub><sup>2</sup> head.", path: "docs/workbench/planted.md", claims: 0, cured: 1 },
          twin: { text: "The preview reads the published head.<sub>1</sub><sup>2</sup>", path: "docs/workbench/planted.md", claims: 1 },
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
        calls: ["src src/workbench/reactivefiber-observer.ts", "src planted"],
        fields: ["anchorPhrase", "srcSurfaces"],
        witness: {
          file: "src/workbench/reactivefiber-observer.ts",
          anchorLiterals: 1,
          twin: {
            module: `// ephemeral noncommitted preview: a comment\nconst a = "ephemeral noncommitted preview: one";\nconst b = \`ephemeral noncommitted preview: \${a}\`;\nexport const c = [a, b];\n`,
            anchorLiterals: 2,
          },
        },
      },
      {
        id: "B2",
        seams: ["reader", "src"],
        calls: ["reader real", "src src/workbench/reactivefiber-observer.ts"],
        fields: ["anchorPhrase", "key", "srcSurfaces"],
        witness: { previewContract: true, keyStated: false, srcNote: true, anchoredAt: [0], twin: { before: "a note put before it", anchoredAt: [1] } },
      },
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
        calls: ["reader real x5", "reader armed stand-in x5"],
        fields: ["category", "closedSet", "key", "note", "workingTree"],
        witness: {
          real: [
            { word: "working_tree", reads: "unchanged" },
            { word: "published_head", reads: "unchanged" },
            { word: "overlay", reads: "unchanged" },
            { word: "detached_head", reads: "unchanged" },
          ],
          handed: ["none", "working_tree", "published_head", "overlay", "detached_head"],
          twin: [
            { word: "working_tree", reads: "changed" },
            { word: "published_head", reads: "refused" },
            { word: "overlay", reads: "refused" },
            { word: "detached_head", reads: "refused" },
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
      { id: "T1", seams: ["roster", "trigger"], calls: ["roster", "trigger record R11; reader real; names key"], fields: ["key"], witness: { misses: [] } },
      {
        id: "T2",
        seams: ["roster", "trigger", "reader"],
        calls: [
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader unarmed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in provenanceKeys; reader unarmed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in workKeys; reader unarmed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in workMetricsKeys; reader unarmed stand-in; names key",
        ],
        fields: ["key"],
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
        calls: [
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader armed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in provenanceKeys; reader armed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in workKeys; reader armed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in workMetricsKeys; reader armed stand-in; names key",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader armed stand-in, unarmed again; names key",
        ],
        fields: ["key"],
        witness: {
          armed: { resultKeys: firedIn("resultKeys", []), provenanceKeys: firedIn("provenanceKeys", []), workKeys: firedIn("workKeys", []), workMetricsKeys: firedIn("workMetricsKeys", []) },
          unarmedArmed: firedIn("resultKeys", FIRED),
        },
      },
      {
        id: "T4",
        seams: ["roster", "trigger", "reader"],
        calls: [
          "roster",
          "trigger record R11, definition_source in provenanceKeys, cleared, render_pin in resultKeys; reader unarmed stand-in; names key",
          "trigger record R11, definition_source in provenanceKeys, cleared, render_pin in resultKeys; reader unarmed stand-in; names container (R-NESTED)",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader unarmed stand-in; names key",
        ],
        fields: ["key"],
        witness: {
          container: "render_pin",
          quiet: { containers: ["resultKeys"], named: [], misses: [], cured: firedIn("resultKeys", FIRED) },
          twin: firedIn("resultKeys", FIRED),
        },
      },
      {
        id: "T5",
        seams: ["roster", "trigger", "reader"],
        calls: [
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader partial stand-in note; names key",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader partial stand-in contradiction; names key",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader partial stand-in closed-set; names key",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader partial stand-in absent; names key",
          "roster",
          "trigger record R11, cleared, definition_source in resultKeys; reader partial stand-in untyped; names key",
        ],
        fields: ["key"],
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
  "The preview reads the published*head.",
  'The preview reads the published "head".',
  "The preview reads the published `head`.",
  `The preview reads the published ${at(0x2018)}head${at(0x2019)}.`,
  `The preview reads the ${at(0x2018)}published${at(0x2019)} head.`,
  `The preview reads the published ${at(0x201c)}head${at(0x201d)}.`,
  `The preview reads the ${at(0x201c)}published${at(0x201d)} head.`,
  "The pre-view reads the published head.",
  "The pre view reads the published head.",
  "The pre_view reads the published head.",
  "The non committed render reads the published head.",
  "The non_committed render reads the published head.",
  "The un-committed render reads the published head.",
  "The un committed render reads the published head.",
  "The un_committed render reads the published head.",
  "A no_commit render reads the published head.",
  "A nocommit render reads the published head.",
  "The preview reads the published_head_manifest.",
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
  "The preview reads the published<br>head.",
  "The preview reads the published<br/>head.",
  "The preview reads the published<BR />head.",
  'The preview reads the published<br class="x">head.',
  "The preview reads the published&hyphen;head.",
  "The preview reads the published&minus;head.",
  "The preview reads the published&#8208;head.",
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
/** A11's planted pages, one pair per dash: published and head joined by it, then non and committed joined by it. */
const DASH_PAGES = ["The preview reads the published{dash}head.", "The non{dash}committed render reads the published head."];
/** Two below the 28 dashes A11 planted at the cut (Node 24's Unicode 17 tables: 27 Pd code points, and the minus sign), so an
 * emptied or narrowed enumeration reds. */
const DASH_FLOOR = 26;
/** A dash in the engine's Unicode tables (never the view's DASH, so a narrowed fold is seen). */
const PD = /\p{Pd}/u;
/** Every dash (Pd) code point of the running engine's Unicode tables, then the minus sign. */
function dashCodePoints(): number[] {
  const dashes: number[] = [];
  for (let code = 0; code <= 0x10ffff; code += 1) {
    if ((code < 0xd800 || code > 0xdfff) && PD.test(String.fromCodePoint(code))) dashes.push(code);
  }
  return [...dashes, 0x2212];
}
/** A12's quiet pages (R-ABBREVIATION), one per named abbreviation, and its live twin. */
const ABBREVIATED = [
  "The preview reads, i.e. resolves, the published head.",
  "The preview reads, e.g. resolves, the published head.",
  "The preview (cf. the docs) reads the published head.",
  "Previews (vs. commits) read the published head.",
];
const ABBREVIATION_TWIN = "The preview reads, that is resolves, the published head.";
/** A4's quiet pages (R-ANAPHORA): the preview in the sentence before, after a period and (in lowercase) after a ';'. */
const ANAPHORAS = ["The preview is noncommitted. It reads the published head.", "Previewing is noncommitted; it reads the published head."];
/** A14's quiet pages (R-FOOTNOTE): a <sup> footnote marker and a superscript digit between published and head. */
const FOOTNOTE_MARKED = ["The preview reads the published<sup>1</sup> head.", `The preview reads the published${at(0xb9)} head.`];
const judgedWith = (judge: Judge) => (sentence: string) => ({ sentence, judged: claimsHead(sentence), cured: claimsWith(judge, sentence) });
const twinOf = (sentence: string): Json => ({ sentence, judged: claimsHead(sentence) });
const scanned = (file: DocFile): Json => {
  const result = scan([file]);
  return { text: file.text, path: file.path, unreadable: [...result.unreadable], claims: result.claims.length };
};
/** A planted page's census reading, beside the page's own text and path (the page the scan was handed). */
const pageReading = (file: DocFile): Json => ({ text: file.text, path: file.path, claims: claimCount([file]) });
/** A residual's quiet page, planted once for both readings: the census's reading, then its cure's (run second, so the calls keep that
 * order), beside the page's own text and path. */
function quietReading(file: DocFile, cure: (file: DocFile) => number): Json {
  const claims = claimCount([file]);
  return { text: file.text, path: file.path, claims, cured: cure(file) };
}

/** Each pin's case: it reads through the seams its pin declares and returns the witness its pin holds. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const listed = gitListed(DOCS_ROOT).filter(isMarkdown);
    const { scanned: paths, claims, previews, unreadable } = scan([...docsTree(), PLANTED_PAGE]);
    const walked = paths.filter(path => path !== PLANTED_PAGE.path);
    return {
      planted: { path: PLANTED_PAGE.path, text: PLANTED_PAGE.text },
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
    quiet: [
      "The preview reads the store-resident head's manifest.",
      "The preview reads the published graph head.",
      "The preview reads the published (current) head.",
      "The preview reads the published, signed head.",
      "The preview reads the head that was published.",
    ].map(judgedWith(PARAPHRASE_CURE)),
    twin: twinOf("The preview reads the published head's manifest."),
  }),
  // R-ANAPHORA: the preview stands in the sentence before the one that names the head; its cure joins them.
  A4: () => {
    const twin = planted("The preview is noncommitted and reads the published head.");
    return { quiet: ANAPHORAS.map(text => quietReading(planted(text), page => claimCount([page], { sentences: anaphoraJoined }))), twin: pageReading(twin) };
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
      planted: { quiet: quiet.map(file => file.text), twin: twin.map(file => file.text) },
      quiet: { paths: quiet.map(file => file.path), claims: claimCount(quiet), cured: claimCount(quiet, { scope: anyScope }) },
      twin: { paths: twin.map(file => file.path), claims: claimCount(twin) },
    };
  },
  A7: () => MARKUP.map(text => pageReading(planted(text))),
  A8: () => JOINS.map(text => pageReading(planted(text))),
  A9: () => HIDDEN.map(([hidden, shown]) => ({ hidden: pageReading(planted(hidden)), shown: pageReading(planted(shown)) })),
  A10: () => ({ unknown: scanned(planted("The preview reads the published&emsp13;head.")), known: scanned(planted("The preview reads the published&emsp;head.")) }),
  // Every planted page is scanned in one call, each at its own path, so the case's calls never depend on the engine's tables.
  A11: () => {
    const plantedPages = dashCodePoints().flatMap(code => DASH_PAGES.map((page, index) => ({ code, file: planted(page.replace("{dash}", at(code)), `${DOCS_ROOT}/dash-${code.toString(16)}-${index}.md`) })));
    const { claims } = scan(plantedPages.map(({ file }) => file));
    const claimsOn = (path: string): number => claims.filter(claim => claim.startsWith(`${path}:`)).length;
    return {
      pages: [...DASH_PAGES],
      planted: plantedPages.every(({ code, file }) => file.text.includes(at(code))),
      dashes: plantedPages.length / DASH_PAGES.length >= DASH_FLOOR,
      minus: plantedPages.some(({ code }) => code === 0x2212),
      unread: plantedPages.filter(({ file }) => claimsOn(file.path) !== 1).map(({ code, file }) => `U+${code.toString(16).toUpperCase().padStart(4, "0")} ${file.text}`),
    };
  },
  // R-ABBREVIATION: a period after an abbreviation ends the sentence it splits; its cure keeps the sentence open.
  A12: () => {
    const twin = planted(ABBREVIATION_TWIN);
    return { quiet: ABBREVIATED.map(text => quietReading(planted(text), page => claimCount([page], { sentences: abbreviationJoined }))), twin: pageReading(twin) };
  },
  // R-PREVIEW-WORDS: the preview named in other words; its cure reads them.
  A13: () => ({
    quiet: ["The ephemeral render reads the published head.", "A dry-run render reads the published head.", "A non-committing render reads the published head."].map(judgedWith(PREVIEW_WORDS_CURE)),
    twin: twinOf("The noncommitted render reads the published head."),
  }),
  // R-FOOTNOTE: a footnote marker between published and head; its cure renders the marker as nothing.
  A14: () => {
    const twin = planted("The preview reads the published head.<sup>1</sup>");
    return { quiet: FOOTNOTE_MARKED.map(text => quietReading(planted(text), page => claimCount([footnoteCured(page)]))), twin: pageReading(twin) };
  },
  // R-FOOTNOTE-REFERENCE: a markdown footnote reference between published and head; its cure renders the reference as nothing.
  A15: () => {
    const reference = planted("The preview reads the published[^1] head.\n\n[^1]: A note.");
    const trailing = planted("The preview reads the published head.[^1]\n\n[^1]: A note.");
    return { quiet: quietReading(reference, page => claimCount([footnoteReferenceCured(page)])), twin: pageReading(trailing) };
  },
  // R-FOOTNOTE-DEFINITION: a footnote definition lexed as a link reference definition; its cure renders the definition's text.
  A16: () => {
    const titled = planted("Intro.[^1]\n\n[^1]: https://example.com 'The preview reads the published head.'");
    const plain = planted("Intro.[^1]\n\n[^1]: The preview reads the published head.");
    return { quiet: quietReading(titled, page => claimCount([footnoteDefinitionCured(page)])), twin: pageReading(plain) };
  },
  // R-SUBSCRIPT: an inline <sub> element between published and head; its cure renders the element as nothing.
  A17: () => {
    const lowered = planted("The preview reads the published<sub>1</sub> head.");
    const after = planted("The preview reads the published head.<sub>1</sub>");
    return { quiet: quietReading(lowered, page => claimCount([subscriptCured(page)])), twin: pageReading(after) };
  },
  // R-NO-COMMIT: the preview written as the two words no commit; its cure reads them as the preview and never as a negation.
  A18: () => ({
    quiet: ["A no commit render reads the published head.", "The no commit preview reads the published head."].map(judgedWith(NO_COMMIT_CURE)),
    twin: twinOf("A no-commit render reads the published head."),
  }),
  // R-NEGATION-PHRASE: a negation in the head's own clause that governs another phrase; its cure reads only the words before the head.
  A19: () => ({
    quiet: ["The preview makes no change and reads the published head.", "The preview without a commit reads the published head."].map(judgedWith(NEGATION_PHRASE_CURE)),
    twin: twinOf("The preview makes a change and reads the published head."),
  }),
  // R-MARKER-RUN: a <sub> element then a <sup> element between published and head; its cure renders both kinds as nothing.
  A20: () => {
    const run = planted("The preview reads the published<sub>1</sub><sup>2</sup> head.");
    const after = planted("The preview reads the published head.<sub>1</sub><sup>2</sup>");
    return { quiet: quietReading(run, page => claimCount([markerRunCured(page)])), twin: pageReading(after) };
  },
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
    unarmedArmed: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmedArmedStandIn)),
  }),
  // R-NESTED: a container key the pin fields could ride in, then the key itself, each in the result list; its cure counts the
  // container as the key.
  T4: () => {
    const quiet = withKey(cleared(withKey(roster(), "provenanceKeys", EXPORTED.key)), "resultKeys", CONTAINER_KEY);
    return {
      container: CONTAINER_KEY,
      quiet: { containers: LISTS.filter(list => quiet[list].includes(CONTAINER_KEY)), ...trigger(quiet, tracked(unarmedStandIn)), cured: trigger(quiet, tracked(unarmedStandIn), namesContainer) },
      twin: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmedStandIn)),
    };
  },
  T5: () => Object.fromEntries(Object.entries(PARTIAL).map(([id, read]) => [id, trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(read))])),
};

/** The page and section that anchor the residual roster outside the census (RESIDUAL ANCHOR in the header). */
const RESIDUAL_DOC = "docs/workbench/14-qa-and-benchmarks.md";
const RESIDUAL_HEADING = "RF definition-source census residuals";
const RESIDUAL_COLUMNS = ["Quiet row", "Residual family", "Cure seam"];
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
/** docs/14's residual table: one `<quiet row> | <family> | <cure seam>` entry per row, sorted. The section is the page's one
 * level-2 heading of that text, bounded at the next level-1 or level-2 heading, and it holds exactly one table of those columns. */
function residualTable(): string[] {
  const tokens = marked.lexer(readFileSync(join(REPO, RESIDUAL_DOC), "utf8"));
  const starts = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 && token.text === RESIDUAL_HEADING ? [index] : []));
  const start = starts[0];
  if (starts.length !== 1 || start === undefined) throw new Error(`${RESIDUAL_DOC} must hold exactly one level-2 heading '${RESIDUAL_HEADING}'`);
  const after = tokens.slice(start + 1);
  const end = after.findIndex(token => isHeading(token) && token.depth <= 2);
  const tables = (end < 0 ? after : after.slice(0, end)).filter(isTable);
  const table = tables[0];
  if (tables.length !== 1 || table === undefined) throw new Error(`the '${RESIDUAL_HEADING}' section must hold exactly one table`);
  const columns = table.header.map(cell => cell.text.trim());
  if (!isDeepStrictEqual(columns, RESIDUAL_COLUMNS)) throw new Error(`the '${RESIDUAL_HEADING}' table's columns must be ${RESIDUAL_COLUMNS.join(", ")}, not ${columns.join(", ")}`);
  return table.rows.map(row => row.map(cell => cell.text.trim()).join(" | ")).sort();
}
/** A cure named in a pin's calls and the seam it takes: a sentence judge, a scan's splitter or scope, a page cure, or the trigger's
 * names rule. */
const CURE_SEAMS: readonly (readonly [RegExp, string])[] = [
  [/^judge (R-[A-Z-]+)$/, "judge"],
  [/; split (R-[A-Z-]+);/, "splitter"],
  [/; scope (R-[A-Z-]+)$/, "scope"],
  [/^judge page (R-[A-Z-]+)$/, "page cure"],
  [/; names container \((R-[A-Z-]+)\)$/, "names rule"],
];
/** The residual families the pins name: one `<pin> | <family> | <cure seam>` entry for each cure a pin's calls list names, sorted. */
function residualPins(): string[] {
  const named = new Set<string>();
  for (const row of ROWS) {
    for (const pin of row.pins) {
      for (const call of pin.calls) {
        const entry = call.replace(/ x\d+$/, "");
        for (const [pattern, seam] of CURE_SEAMS) {
          const family = pattern.exec(entry)?.[1];
          if (family !== undefined) named.add(`${pin.id} | ${family} | ${seam}`);
        }
      }
    }
  }
  return [...named].sort();
}

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
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:20", "B:2", "C:1", "T:5"]);
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

  it(RESIDUAL_TITLE, () => {
    expect(residualPins(), "the residual pins, their families and their cure seams, against the docs/14 residual table").toStrictEqual(residualTable());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.clause}`, () => {
      for (const pin of row.pins) {
        it(pin.id, () => {
          const impl = IMPL[pin.id];
          expect(impl, `no case for ${pin.id}`).toBeTypeOf("function");
          running = [];
          calls = [];
          fields = [];
          const witness = impl === undefined ? null : impl();
          const reads = running;
          const made = calls;
          const fieldsRead = fields;
          running = undefined;
          calls = undefined;
          fields = undefined;
          expect(
            pin.seams.filter(seam => !reads.includes(seam)),
            `${pin.id} did not read through every seam it declares`,
          ).toEqual([]);
          expect(runs(made), `${pin.id}'s calls, recorded in call order at its seams, against its calls list`).toEqual([...pin.calls]);
          expect([...fieldsRead].sort(), `${pin.id}'s export fields, recorded as read, against its fields list`).toEqual([...pin.fields].sort());
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
    ).toEqual([JUDGED_TITLE, RESIDUAL_TITLE, ...ROWS.flatMap(row => row.pins.map(pin => pin.id))]);
    expect(
      others.filter(entry => entry.mode !== "run" || entry.fails || entry.state !== "pass").map(entry => `${entry.name}: ${entry.mode}${entry.fails ? "+fails" : ""} ${entry.state ?? "unrun"}`),
      "a registered test skipped, inverted or not passed",
    ).toEqual([]);
  });
});
