/**
 * wb-cbt4 ([MWI-master-recon]) census: the master-side triage-archive reconciliation. Owner specification ruling 2026-11-06
 * (ruling-received M:60615 point 4; the RECORDED CONDITION on epic wb-1a3t) orders two deliverables, "red-first each, on a
 * master-shaped fixture": "(a) the measured .npmignore '<program>/triage/' package-smoke cure" and "(b) an EXPLICIT owner-specified
 * archive-path exclusion for docs/workbench/programs/<program>/triage/ in the walking censuses" (the bead spells the program part
 * as a glob star; this comment cannot, since a star before a slash ends it). The rationale is carried verbatim as OWNER_RATIONALE in
 * test/helpers/triage-archive.ts, which holds the predicate (isTriageArchivePath, withoutTriageArchive), the npm line
 * (TRIAGE_ARCHIVE) and the header line each walking census carries (ARCHIVE_SCOPE_LINE).
 *
 * FORM (cut #3, the enumerate-the-resolvable form of standing rule 19(c), ruling R-B666; kept by cut #4, the respin of refusal #3,
 * which pins V1's clause reader and W1's call-site rule with battery rows): each reader below claims what its rows pin and nothing
 * wider - its live input and its control table, read by the one reader in one expression, so the controls judge the reader the live
 * reading uses. Each entry spells the reader's rule only as far as its rows pin it; a spelling no row pins is NOT CLAIMED. The NAMED
 * RESIDUALS below are the known escapes, each a named family with a pinned quiet row.
 *
 * PINNED READER SET (claim form: each case by id in this file, its assertion target, the result it holds). Each case declares its
 * assertion count first (expect.assertions), and npm run test passes --expect.requireAssertions.
 * - N1 archiveLineCount counts the lines of a text (the text split at each newline) that equal TRIAGE_ARCHIVE once trimmed. It reads
 *   1 over the root .npmignore, and over the N1_TEXTS controls: 2 for a text holding the line twice; 1 for the line after two spaces
 *   and a tab, and for the line before two spaces, a tab and a carriage return; 0 for the line inside a longer line (after an
 *   exclamation mark, before two stars, after a number sign and a space), for the line with a space inside it, and for the line
 *   upper-cased. Any other character at a line's ends is NOT CLAIMED, and so is whether npm honours a padded line (N2 packs with the
 *   root .npmignore itself).
 * - N2 (master-shaped fixture) npm pack --dry-run over a scratch package shaped like master (M1's live pages and archive), with the
 *   root .npmignore copied in, packs the manifest and the live pages and no archive path; the packed-path classifier of
 *   qa/workbench/package-boundary.mjs reports nothing.
 * - N3 (control) the same package with the TRIAGE_ARCHIVE line dropped from its .npmignore packs every archive file, and the
 *   classifier reports the archive's .jsonl as denied-pattern: the package-smoke red that line cures.
 * - P1 isTriageArchivePath reads true for each ARCHIVE_ROWS path, and withoutTriageArchive drops each. Outside anchors:
 *   ARCHIVE_ROWS is, row for row (id, via and path), what archiveRowsFrom derives from TRIAGE_ARCHIVE as the helper exports it and
 *   the program the helper's SOURCE paragraph names - that program's triage directory, a README.md directly in it, the page
 *   requirements/ATOMIC-REQUIREMENTS.md below it, and that page under the programs p and "Interop v2.1_X"; its ids are, in order,
 *   the archive forms the PINNED FORMS lines of test/helpers/triage-archive.ts name; and the set of its vias is the set of helper
 *   functions the WALKERS censuses call, read from their files (a directory skip passes a directory path, a list filter a file
 *   path).
 * - P2 isTriageArchivePath reads false for each LIVE_ROWS path, and withoutTriageArchive, over the LIVE_ROWS paths each followed by
 *   an ARCHIVE_ROWS path and that whole list given twice, returns the LIVE_ROWS paths in order, twice.
 * - P3 outside anchors: LIVE_ROWS is, row for row (part and path), what liveRowsFrom derives from TRIAGE_ARCHIVE as the helper
 *   exports it - each literal segment renamed (its last character dropped), extended (a d appended), upper-cased and capitalized,
 *   the program segment absent and doubled, triage as a file (triage.md), a program's own page (README.md), and the path below a
 *   directory x - and its parts are, in order, the live forms the helper's PINNED FORMS lines name.
 * - M1 (master-shaped fixture) masterShapedReading, over a scratch git repository holding live pages, a receipt and a program's own
 *   pages beside that program's archive, all tracked, reads git's listing and the filesystem walk equal and holding the archive,
 *   and through withoutTriageArchive both keep exactly the live pages; over the same tree plus one file git's .git/info/exclude
 *   names, the same reader reads the walk holding that file and git's listing not. Outside anchor: the SHAPES phrases tile the
 *   shape items of wb-12x1's spec-ruling note in .beads/issues.jsonl (each item of its shape-assumption list, then its
 *   package-smoke item), one each in order. holds encodes each shape, and the HOLDS_CONTROLS rows pin each side of each encoding:
 *   no-heading, a file whose path ends .md and whose text does not open with a number sign and a space (held by texts opening
 *   "#B", "## C", a number sign and a tab, a newline or a space before the heading, and a first line that is no heading; not held
 *   by a text opening "# A", nor by a .txt, a .MD or a .xmd file); not-markdown, a file whose path does not end .md (held by .mdx,
 *   .MD and .xmd files; not by a .md file); shebang-py, a file whose path ends .py and whose text opens with "#!" (held by texts
 *   opening "#!/usr/bin/env python3" and "#!python3"; not by "#!" on a later line, after a newline or after a space, nor by a .sh or
 *   a .xpy file); deep, a file whose path ends .md and has more than five segments (held by six and by seven; not by five, nor by a
 *   .json or a .xmd file of six); jsonl, a file whose path ends .jsonl (held by a .jsonl file; not by .json, .jsonl.gz or .xjsonl).
 *   By holds, the fixture's archive files holding each shape are exactly HOLDERS. Any other spelling of a path or a text is NOT
 *   CLAIMED of holds.
 * - W1 reads each WALKERS census, and the W1_TEXTS controls, in one expression: whether the text holds the from clause from
 *   "./helpers/triage-archive.js" spelled exactly so (double quote marks, one space, the .js ending), and how many call sites of
 *   withoutTriageArchive and isTriageArchivePath it holds. Each WALKERS census holds the clause and exactly its pinned count of call
 *   sites, as the reader counts them. Over W1_TEXTS it reads no clause for the import with single quote marks, for the import with
 *   the .ts ending, for the helper's path named in a comment, for the import with no space, two spaces, a tab or a newline before its
 *   specifier, and for the specifier imported without a from clause (a side-effect import and an import() call); the clause and two
 *   sites for a call of each function beside the import's specifiers; one site for a call at the text's start; three sites for calls
 *   in a line comment, in a block comment and in a string; three sites for refusal #4's calls with no argument, with a quoted
 *   argument and with a space after the opening parenthesis, each in a line comment; two sites for its calls through a namespace and
 *   through an optional namespace, each in a line comment; and no site for names that only hold a function's name (a letter, a digit
 *   or an underscore before it, a letter after it), for the names with their case changed, for a call with a space before its
 *   parenthesis and for a call with type arguments or an optional call. Its battery rows spell one line per helper name and per
 *   character, or pair of characters, of the 256 characters U+0000 to U+00FF, each line after a newline or at the text's start, and
 *   on those lines the reader counts a site exactly where the name, in that case, is directly followed by an opening parenthesis and
 *   directly preceded by no ASCII letter, digit or underscore (or by nothing, at the text's start): no site for either name called
 *   after an ASCII letter, digit or underscore, and a site for either name called after each other character (386 sites); the same
 *   with each of the 256 characters before that character (no site after an ASCII letter, digit or underscore; 98816 sites after each
 *   other character); no site for either name followed by any character but an opening parenthesis, even with an opening parenthesis
 *   after that character; and a site for either name called with each of the 256 characters after its opening parenthesis, the line
 *   ending there (512 sites). Over W1_TEXTS it also reads the clause, and no site, for refusal #5's four statement forms around the
 *   clause: the import with no semicolon after the clause (a newline right after its closing quote mark), the namespace import
 *   (import * as triageArchive), the import spread over three lines (its specifier on a line of its own, the clause on the last line
 *   after the closing brace and a space) and the import followed by a type import of no specifiers from the same clause (the clause
 *   held twice); and for the clause as the whole text (nothing before its from, nothing after its closing quote mark). Its clause
 *   battery rows are one text per character of the 256 characters U+0000 to U+00FF, the clause with that character right before its
 *   from and right after its closing quote mark, and the reader reads the clause, and no site, in each of the 256 texts. Another
 *   spelling of the clause is NOT CLAIMED of W1 (W3 reads the other from-clause spellings). Which text around the clause makes the
 *   reader read it in any other text than the controls' and the clause battery rows' texts, a WALKERS census's own text among them,
 *   is NOT CLAIMED of W1: for example a run of two or more characters right before its from or right after its closing quote mark
 *   that no row's text holds there, a pair of different characters on its two sides that no row's text holds there, a character
 *   above U+00FF there, and the clause held three or more times. Which
 *   characters around a name make a call site on any other line than the controls' and the battery rows' lines, a WALKERS census's
 *   own lines among them, is NOT CLAIMED of W1: for example a third character before a name on its line, a second character after its
 *   opening parenthesis, a character above U+00FF before or after a name, and a run of two or more characters between a name and an
 *   opening parenthesis other than the type-argument and optional-call controls. An edit of a W1_TEXTS row's text that keeps the
 *   row's reading is NOT CLAIMED as killed by this census: F1 holds each row's id and readings, not its text.
 * - W2 scopeLineCount counts the lines equal to ARCHIVE_SCOPE_LINE in the comment block a text opens with: the block is there when
 *   the text's first three characters are a slash and two stars and a star-slash follows them, and it runs from those three
 *   characters to that first star-slash. Each line of the block (the block split at each newline) is read with its comment prefix
 *   and its trailing spaces, tabs and carriage returns removed; the prefix is a run of up to eight spaces and tabs, then a star, then
 *   one space when one follows the star. It reads 1 over each WALKERS census, and over the W2_TEXTS controls: 1 for the line in
 *   such a block after a space, a star and a space; after a star and a space at the line's start; after two spaces, after a tab and
 *   after eight spaces and tabs, then a star and a space; right after a space and a star; right after the block's opening stars, and
 *   after a space, a star and a space on that opening line; before two spaces and a tab; and in a block with carriage-return line
 *   endings; 2 for the line twice there; and 0 for the line in a later block, after a first line of code, after a newline or a space
 *   before the block, in a block opening with one star, in a block that never closes, without its star, after its star and a tab,
 *   after its star and two or three spaces, after two stars, inside a longer line, after a prefix, with a star and two spaces inside
 *   it and no prefix, and with its case changed. Any other spelling of a prefix, an opening or a line's end is
 *   NOT CLAIMED of scopeLineCount.
 * - W3 outside anchor: helperImporters, over test/ read from disk, finds exactly the WALKERS censuses and this file. It reads the
 *   regular files below test/ whose names end .ts (a .d.ts file among them) and finds each whose text holds a from clause: the word
 *   from, then a run of up to three spaces, tabs or newlines (an empty run too), then a specifier between two equal quote marks,
 *   double or single, that starts with a dot and, joined to the file's directory with a .js or .ts ending dropped, is
 *   test/helpers/triage-archive. The reader reads text, so a from clause inside a comment counts too. Over the W3_FILES control tree
 *   the same reader finds the import from test/, the re-export from a helper file, the import from a nested directory, the
 *   single-quoted, the extensionless and the .ts-ending imports, the import through a helpers/../helpers/ specifier, a clause in a
 *   line comment and in a block comment, a .d.ts re-export, and a clause with no space, with a tab and with a newline and two
 *   spaces before its specifier; and it finds no import of another helper, of a module whose name only begins with the helper's, of
 *   a module outside test/, of the helper with an .mjs ending or with a specifier that does not start with a dot, no clause with
 *   unequal quote marks, no word that only ends with from, no capitalized From, no .mts importer and no .ts importer outside test/,
 *   and not the helper file itself. Its R-W3-NO-FROM quiet rows are below.
 * - V1 outside anchor: exportRow reads the wb-cbt4 row of .beads/issues.jsonl, and quotesRationale reads its description quoting
 *   OWNER_RATIONALE between quote marks, character for character; over the V1_TEXTS controls the same reader reads no quotation for
 *   the quote with its tail, its head, its case, its spacing or its dash changed, or with either quote mark missing; over the
 *   EXPORT_TEXT control exportRow reads the row whose own id is the bead's, not an earlier or a later row naming it in a nested id.
 *   The description's clauses tile the ROWS requirement phrases in order. clausesOf reads each line of a text (the text split at
 *   each newline, U+000A, and at no other character from U+0000 to U+00FF) as a lettered line, a quoting line or nothing. A
 *   lettered line is, at the line's start, an opening parenthesis, an ASCII lowercase letter (a to z), a closing parenthesis and a
 *   space, then a clause of one to four hundred characters none of which is a carriage return, then a semicolon or a full stop as
 *   the line's last character; it reads its clause. A quoting line is, at the line's start, a capitalized word (an ASCII capital, A
 *   to Z, then one to twenty-nine ASCII lowercase letters), then one to twenty-four words of one to thirty ASCII lowercase letters,
 *   each after one space, then a colon, a space and a double quote mark; it reads the words before the colon (its label). Over the
 *   CLAUSE_ROWS controls, each text read alone, clausesOf reads as each row says: the clause of a lettered line for every letter a
 *   to z, closing with a semicolon and with a full stop, of one and of four hundred characters; the label of a quoting line for
 *   every capital A to Z, of one, nine and twenty-four lowercase words, and of a thirty-letter capitalized word with a
 *   thirty-letter lowercase word; nothing of a one-word label, a label without its colon, a lettered line with an empty clause,
 *   without its opening parenthesis, without its letter, without its closing mark or closing with a comma or a colon, a letter in
 *   parentheses mid-line, an uppercase letter or a digit in the parentheses, no space after the closing parenthesis, an indented
 *   lettered line or label, a label starting lowercase or with a capitalized second word, a label without the space after its colon
 *   or before a single quote mark, a label whose capitalized word is one letter, and the R-V1-OTHER-LINE quiet rows below; and, in
 *   its battery rows (one line per character, for each of the 256 characters U+0000 to U+00FF placed at one position of a line
 *   form), a lettered line only with a newline before it (so the line starts after it), an opening parenthesis as its first
 *   character, an ASCII lowercase letter as its second, a closing parenthesis as its third, a space as its fourth and a semicolon
 *   or a full stop as its last, and after its closing full stop only a newline (the line ends there) or a further semicolon or full
 *   stop (which then closes the line, its clause ending with the first); with the character added inside its parentheses, before or
 *   after its letter, never, and added after its closing parenthesis only when it is a space (which then opens the clause); a
 *   clause of that one character, and that character between two clause characters, for every character but a newline and a
 *   carriage return; and a quoting line only with a newline before it, an ASCII capital as its first character, an ASCII lowercase
 *   letter as its second and as the first letter of the word after its capitalized word, a space after its capitalized word, a
 *   colon after its label, a space after the colon and a double quote mark after that space; with the character added after its
 *   capital, after its capitalized word, before or after its word, only when it is an ASCII lowercase letter (which then lengthens
 *   that word); and with the character added after the colon never, and added after the space after it only when it is a double
 *   quote mark. A longer clause, label or word, a character above U+00FF in a line, and any other line form, are NOT CLAIMED of
 *   clausesOf.
 * - F1 (standing rule 16 frozen shape) ROWS, ARCHIVE_ROWS, LIVE_ROWS, SHAPES, WALKERS and the control tables N1_TEXTS,
 *   HOLDS_CONTROLS, W1_TEXTS, W2_TEXTS, W3_FILES, V1_TEXTS and CLAUSE_ROWS as literals derived at this cut.
 * - R1 every ROWS pin is a case of this file that ran to its end, once, in row order, then F1.
 *
 * NAMED RESIDUALS (the known escapes within the claimed subjects; each a named family with a pinned quiet row that reads quiet, so
 * the row reds if the reader starts to catch the family or the row is dropped from F1; a newly found escape is a residual-list
 * addition unless it contradicts a pinned claim):
 * - R-W3-NO-FROM: a .ts file below test/ that imports the helper without a from clause (a side-effect import, an import() call or a
 *   require() call) is no importer to helperImporters, so it escapes W3's outside anchor. Quiet rows: W3_FILES test/y.test.ts
 *   (import()), test/z.test.ts (require()) and test/za.test.ts (a side-effect import), each read as no importer.
 * - R-V1-OTHER-LINE: a deliverable the bead's description spells in a line form clausesOf reads as nothing adds no clause, so the
 *   tiling still holds and that deliverable escapes V1's outside anchor. Its pinned members, each a quiet row read as nothing: a
 *   bulleted and a numbered item (CLAUSE_ROWS "quiet row R-V1-OTHER-LINE: a bulleted and a numbered deliverable"); refusal #3's
 *   witness lines, a lettered line whose letter is U+00E9, a label whose capital is U+00C9, a label whose word holds U+00E7 and a
 *   lettered line whose clause holds a carriage return (CLAUSE_ROWS "quiet row R-V1-OTHER-LINE: refusal #3's witness lines"); and
 *   each battery line V1 above reads as nothing.
 *
 * THE WALKERS: the 20 censuses whose walks the archive turned red, measured at trunk fd90f9d3 with master 6f7a366d's 457 archive
 * files tracked in the working tree (their blob ids equal master's; the archive tree deb70b9f is the same at 85c9b80f, ee51aa6c,
 * 0b25e14e and d7666a76): 20 files | 40 tests red at the base (the pins the archive hit, with the records or registration cases
 * those pins feed), each file green on that tree with this cut (its full default tier reads 0 failed); each routes those walks, with
 * any listing a walk is held equal to, through the helper and carries ARCHIVE_SCOPE_LINE.
 *
 * WHY THE ROOT .npmignore: the measured cure placed '<program>/triage/' in a new docs/workbench/programs/.npmignore. That file is
 * itself a docs/workbench file outside the archive, so the live-doc walks judge it: tracked over this cut on the master-shaped tree
 * at trunk fd90f9d3, with the root line removed, it reds 6 of the WALKERS, 11 tests (docs-shared-filesystem SCG-R5's walk, 80
 * pages against 79; furnace-cac D2's page scope; mw-cac A1's level-1 heading arm; mw-gp A1's markdown arm; ri-decision-resource
 * A3's every-page-markdown read of the docs/workbench walk; ri-observation-authority A2's markdown floor; each with its records or
 * registration case). The same exclusion anchored at the repository root as TRIAGE_ARCHIVE is no docs/workbench file; the
 * root-file readers measured with it read green (package-boundary, both fiber-host-publication censuses, urr-core-gate,
 * rf-orphan-server-reclaim), and it packs the same set (N2, N3; over the master-shaped tree package-smoke's pack under the root line
 * and npm pack --dry-run under the nested file each hold 811 files, shasum 1a7e233d; package-smoke over that tree: rc 1 with 25
 * denied-pattern paths at the base, rc 0 with it).
 *
 * NOT CLAIMED (scope sentences; no residual semantics; no follow-up bead):
 * - A census outside WALKERS is NOT CLAIMED by this census: where it walks the archive it still reads it, and on the measured
 *   master-shaped tree it read it quiet.
 * - The archive's own content (its claims, its citations, its links, its file shapes) is NOT CLAIMED by this census.
 * - master's other conditions, the master-only edits outside the archive (the program pages, the skill, the new-feedback files and
 *   the page edits), are NOT CLAIMED by this census.
 * - A path that is not repository-relative and "/"-separated, and a spelling of a path outside the helper's PINNED FORMS, are NOT
 *   CLAIMED by this census: P1-P3 judge one path per pinned form, and the helper's comment bounds its own claims the same way.
 * - An import of the helper from outside test/, or from a file below test/ whose name does not end .ts or that is no regular file
 *   (a symbolic link), is NOT CLAIMED by this census: W3 reads the regular .ts files below test/ (its qa/ and .mts rows read as no
 *   importer). An import without a from clause is the residual R-W3-NO-FROM above.
 * - A reader's reading of an input other than its live input and its listed controls is NOT CLAIMED by this census.
 * - The removal of a control row together with its F1 element is NOT CLAIMED as killed by this census: the control tables
 *   (N1_TEXTS, HOLDS_CONTROLS, W1_TEXTS, W2_TEXTS, W3_FILES, V1_TEXTS, CLAUSE_ROWS) are falsifiers of this file's own readers, and
 *   F1 is their only anchor.
 * - package-smoke's own run over the repository is NOT CLAIMED by this census: N2 and N3 judge a scratch package; the gate step
 *   runs package-smoke itself.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { classifyPackedPaths } from "../qa/workbench/package-boundary.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";
import { ARCHIVE_SCOPE_LINE, isTriageArchivePath, OWNER_RATIONALE, TRIAGE_ARCHIVE, withoutTriageArchive } from "./helpers/triage-archive.js";

installScratchLeakGuard();

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const THIS_FILE = "test/workbench-triage-archive-exclusion-census.test.ts";
const HELPER_FILE = "test/helpers/triage-archive.ts";
/** The helper's module path as a from clause names it, relative specifier resolved and its .js or .ts ending dropped (W3). */
const HELPER_MODULE = "test/helpers/triage-archive";
const HELPER_IMPORT = 'from "./helpers/triage-archive.js"';
const EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-cbt4";
/** The bead whose spec-ruling note measured the archive's shapes on the master-shaped tree (M1's outside anchor). */
const SHAPE_BEAD = "wb-12x1";
const SHAPE_LIST_LEAD = "the triage breaks shape assumptions the landed censuses make about docs/workbench: ";
const SHAPE_SMOKE_LEAD = "(4) package-smoke";

interface Row {
  readonly id: string;
  readonly requirement: string;
  readonly pins: readonly string[];
}
/** The bead's requirement rows, each phrase a clause of the bead's own description (V1), each pin a case of this file (R1). */
const ROWS: readonly Row[] = [
  { id: "A", requirement: "the measured .npmignore '*/triage/' package-smoke cure", pins: ["N1", "N2", "N3"] },
  { id: "B", requirement: "an EXPLICIT owner-specified archive-path exclusion for docs/workbench/programs/*/triage/", pins: ["P1", "P2", "P3", "M1"] },
  { id: "C", requirement: "in the walking censuses", pins: ["W1", "W2", "W3"] },
  { id: "D", requirement: "Rationale to carry verbatim into the cut", pins: ["V1"] },
];

type HelperCall = "isTriageArchivePath" | "withoutTriageArchive";
interface ArchiveRow {
  /** The archive form of the helper's PINNED FORMS lines this path is judged on (P1's outside anchor). */
  readonly id: string;
  /** The helper function the walking censuses hand this kind of path (P1's outside anchor). */
  readonly via: HelperCall;
  readonly path: string;
}
const PROGRAM_DIR = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04";
/** Paths that ARE the archive (P1), one per archive form: the directory a walk skips, and files a listing drops. */
const ARCHIVE_ROWS: readonly ArchiveRow[] = [
  { id: "directory", via: "isTriageArchivePath", path: `${PROGRAM_DIR}/triage` },
  { id: "child", via: "withoutTriageArchive", path: `${PROGRAM_DIR}/triage/README.md` },
  { id: "page", via: "withoutTriageArchive", path: `${PROGRAM_DIR}/triage/requirements/ATOMIC-REQUIREMENTS.md` },
  { id: "one-character-program", via: "withoutTriageArchive", path: "docs/workbench/programs/p/triage/requirements/ATOMIC-REQUIREMENTS.md" },
  { id: "mixed-program", via: "withoutTriageArchive", path: "docs/workbench/programs/Interop v2.1_X/triage/requirements/ATOMIC-REQUIREMENTS.md" },
];

interface LiveRow {
  /** The live form of the helper's PINNED FORMS lines: the TRIAGE_ARCHIVE part the path changes, and how (P3). */
  readonly part: string;
  readonly path: string;
}
/** Paths that are NOT the archive (P2): one per live form, as liveRowsFrom derives it from TRIAGE_ARCHIVE (P3), in its order. */
const LIVE_ROWS: readonly LiveRow[] = [
  { part: "docs:renamed", path: "doc/workbench/programs/p/triage/x.md" },
  { part: "docs:extended", path: "docsd/workbench/programs/p/triage/x.md" },
  { part: "docs:upper", path: "DOCS/workbench/programs/p/triage/x.md" },
  { part: "docs:capitalized", path: "Docs/workbench/programs/p/triage/x.md" },
  { part: "workbench:renamed", path: "docs/workbenc/programs/p/triage/x.md" },
  { part: "workbench:extended", path: "docs/workbenchd/programs/p/triage/x.md" },
  { part: "workbench:upper", path: "docs/WORKBENCH/programs/p/triage/x.md" },
  { part: "workbench:capitalized", path: "docs/Workbench/programs/p/triage/x.md" },
  { part: "programs:renamed", path: "docs/workbench/program/p/triage/x.md" },
  { part: "programs:extended", path: "docs/workbench/programsd/p/triage/x.md" },
  { part: "programs:upper", path: "docs/workbench/PROGRAMS/p/triage/x.md" },
  { part: "programs:capitalized", path: "docs/workbench/Programs/p/triage/x.md" },
  { part: "*:none", path: "docs/workbench/programs/triage/x.md" },
  { part: "*:two", path: "docs/workbench/programs/p/q/triage/x.md" },
  { part: "triage:renamed", path: "docs/workbench/programs/p/triag/x.md" },
  { part: "triage:extended", path: "docs/workbench/programs/p/triaged/x.md" },
  { part: "triage:upper", path: "docs/workbench/programs/p/TRIAGE/x.md" },
  { part: "triage:capitalized", path: "docs/workbench/programs/p/Triage/x.md" },
  { part: "triage:file", path: "docs/workbench/programs/p/triage.md" },
  { part: "*:page", path: "docs/workbench/programs/p/README.md" },
  { part: "anchor", path: "x/docs/workbench/programs/p/triage/x.md" },
];

interface FileText {
  readonly path: string;
  readonly text: string;
}
const ARCHIVE_DIR = "docs/workbench/programs/interop-2026-11-04/triage";
/** The master-shaped fixture's live side: pages, a receipt and the program's own pages. */
const LIVE_FIXTURE: readonly FileText[] = [
  { path: "docs/workbench/README.md", text: "# Workbench\n" },
  { path: "docs/workbench/receipts/wb-fixture.md", text: "# wb-fixture: a receipt\n" },
  { path: "docs/workbench/programs/interop-2026-11-04/README.md", text: "# Interop\n" },
  { path: "docs/workbench/programs/interop-2026-11-04/01-audit-and-evidence.md", text: "# 01 Audit\n" },
];
/** The master-shaped fixture's archive: one file for each SHAPES row (and a .json beside them). */
const ARCHIVE_FIXTURE: readonly FileText[] = [
  { path: `${ARCHIVE_DIR}/epistemic-triage/.work-phase9/backup/CLAIMS.jsonl`, text: '{"claim":"C001"}\n' },
  { path: `${ARCHIVE_DIR}/epistemic-triage/.g01-counts.json`, text: "{}\n" },
  { path: `${ARCHIVE_DIR}/scratch-g03/fill.py`, text: "#!/usr/bin/env python3\nprint(1)\n" },
  { path: `${ARCHIVE_DIR}/requirements/ATOMIC-REQUIREMENTS.md`, text: "No heading opens this page.\n" },
  { path: `${ARCHIVE_DIR}/epistemic-triage/dossiers/a/b/claims.md`, text: "# Claims\n" },
];
/** M1's control: one more file, named by git's .git/info/exclude, so git's listing and the filesystem walk differ by it. */
const EXCLUDED_FILE: FileText = { path: "docs/workbench/excluded.md", text: "# Excluded\n" };

interface Shape {
  readonly id: string;
  /** The phrase of wb-12x1's spec-ruling note that names this shape of the master archive (M1's outside anchor). */
  readonly phrase: string;
}
/** The archive shapes the master-shaped red named, in the note's order. */
const SHAPES: readonly Shape[] = [
  { id: "no-heading", phrase: "needs every page to open with a level-1 heading" },
  { id: "not-markdown", phrase: "needs every walked file to be markdown" },
  { id: "shebang-py", phrase: "five shebang .py generators" },
  { id: "deep", phrase: "pages deeper than its depth pin" },
  { id: "jsonl", phrase: "25 *.jsonl files" },
];
/** Whether a fixture file holds a shape (the directories between docs/ and a page count toward its depth; the spellings M1 above pins). */
function holds(shape: string, file: FileText): boolean {
  if (shape === "no-heading") return file.path.endsWith(".md") && !file.text.startsWith("# ");
  if (shape === "not-markdown") return !file.path.endsWith(".md");
  if (shape === "shebang-py") return file.path.endsWith(".py") && file.text.startsWith("#!");
  if (shape === "deep") return file.path.endsWith(".md") && file.path.split("/").length - 2 > 3;
  if (shape === "jsonl") return file.path.endsWith(".jsonl");
  return false;
}
/** By holds, each shape and the fixture's archive files holding it, each by its path below ARCHIVE_DIR (M1). */
const HOLDERS: readonly string[] = [
  "no-heading: requirements/ATOMIC-REQUIREMENTS.md",
  "not-markdown: epistemic-triage/.work-phase9/backup/CLAIMS.jsonl, epistemic-triage/.g01-counts.json, scratch-g03/fill.py",
  "shebang-py: scratch-g03/fill.py",
  "deep: requirements/ATOMIC-REQUIREMENTS.md, epistemic-triage/dossiers/a/b/claims.md",
  "jsonl: epistemic-triage/.work-phase9/backup/CLAIMS.jsonl",
];
interface HoldsControl extends FileText {
  readonly shape: string;
  /** Whether holds must read this file as holding the shape (M1). */
  readonly holds: boolean;
}
/** M1's holds controls: for each shape, files on each side of its encoding, each spelling the path's ending or the text's opening one way. */
const HOLDS_CONTROLS: readonly HoldsControl[] = [
  { shape: "no-heading", holds: false, path: "docs/a.md", text: "# A\n" },
  { shape: "no-heading", holds: true, path: "docs/b.md", text: "#B\n" },
  { shape: "no-heading", holds: true, path: "docs/c.md", text: "## C\n" },
  { shape: "no-heading", holds: false, path: "docs/d.txt", text: "D\n" },
  { shape: "not-markdown", holds: false, path: "docs/e.md", text: "# E\n" },
  { shape: "not-markdown", holds: true, path: "docs/f.mdx", text: "# F\n" },
  { shape: "shebang-py", holds: true, path: "docs/g.py", text: "#!/usr/bin/env python3\n" },
  { shape: "shebang-py", holds: false, path: "docs/h.py", text: "print(1)\n#!\n" },
  { shape: "shebang-py", holds: false, path: "docs/i.sh", text: "#!/bin/sh\n" },
  { shape: "deep", holds: false, path: "docs/a/b/c/j.md", text: "# J\n" },
  { shape: "deep", holds: true, path: "docs/a/b/c/d/k.md", text: "# K\n" },
  { shape: "deep", holds: false, path: "docs/a/b/c/d/l.json", text: "{}\n" },
  { shape: "jsonl", holds: true, path: "docs/m.jsonl", text: "{}\n" },
  { shape: "jsonl", holds: false, path: "docs/n.json", text: "{}\n" },
  { shape: "no-heading", holds: true, path: "docs/o.md", text: "\n# O\n" },
  { shape: "no-heading", holds: true, path: "docs/p.md", text: " # P\n" },
  { shape: "no-heading", holds: true, path: "docs/q.md", text: "#\tQ\n" },
  { shape: "no-heading", holds: true, path: "docs/r.md", text: "R\n# R\n" },
  { shape: "no-heading", holds: false, path: "docs/s.MD", text: "S\n" },
  { shape: "no-heading", holds: false, path: "docs/ad.xmd", text: "AD\n" },
  { shape: "not-markdown", holds: true, path: "docs/t.MD", text: "# T\n" },
  { shape: "not-markdown", holds: true, path: "docs/u.xmd", text: "# U\n" },
  { shape: "shebang-py", holds: true, path: "docs/v.py", text: "#!python3\n" },
  { shape: "shebang-py", holds: false, path: "docs/w.py", text: "\n#!/usr/bin/env python3\n" },
  { shape: "shebang-py", holds: false, path: "docs/x.py", text: " #!/usr/bin/env python3\n" },
  { shape: "shebang-py", holds: false, path: "docs/aa.xpy", text: "#!/bin/sh\n" },
  { shape: "deep", holds: true, path: "docs/a/b/c/d/e/y.md", text: "# Y\n" },
  { shape: "deep", holds: false, path: "docs/a/b/c/d/ac.xmd", text: "# AC\n" },
  { shape: "jsonl", holds: false, path: "docs/z.jsonl.gz", text: "{}\n" },
  { shape: "jsonl", holds: false, path: "docs/ab.xjsonl", text: "{}\n" },
];

interface Walker {
  readonly file: string;
  /** Call sites of withoutTriageArchive and isTriageArchivePath in the file (W1). */
  readonly sites: number;
}
/** The walking censuses that route the walks the archive turned red through the helper (W1-W3). */
const WALKERS: readonly Walker[] = [
  { file: "test/workbench-apo-citation-status-census.test.ts", sites: 2 },
  { file: "test/workbench-apo-export-census.test.ts", sites: 2 },
  { file: "test/workbench-docs-shared-filesystem-census.test.ts", sites: 1 },
  { file: "test/workbench-forge-proposal-admission-census.test.ts", sites: 3 },
  { file: "test/workbench-furnace-cac-citation-status-census.test.ts", sites: 3 },
  { file: "test/workbench-gp-seam-served-census.test.ts", sites: 3 },
  { file: "test/workbench-hx-gp-answer-invariance-census.test.ts", sites: 1 },
  { file: "test/workbench-mw-cac-citation-status-census.test.ts", sites: 2 },
  { file: "test/workbench-mw-gp-citation-status-census.test.ts", sites: 2 },
  { file: "test/workbench-rf-graph-policy-context-census.test.ts", sites: 1 },
  { file: "test/workbench-rf-historical-claim-census.test.ts", sites: 2 },
  { file: "test/workbench-rf-orphan-server-reclaim-census.test.ts", sites: 1 },
  { file: "test/workbench-rf-read-status-upgrade-census.test.ts", sites: 1 },
  { file: "test/workbench-rf-source-change-block-claim-census.test.ts", sites: 1 },
  { file: "test/workbench-rf-speculative-context-census.test.ts", sites: 2 },
  { file: "test/workbench-ri-decision-resource-census.test.ts", sites: 2 },
  { file: "test/workbench-ri-decision-seed-claim-census.test.ts", sites: 1 },
  { file: "test/workbench-ri-observation-authority-census.test.ts", sites: 1 },
  { file: "test/workbench-tsx-h2-proposed-api-census.test.ts", sites: 1 },
  { file: "test/workbench-urr-core-gate-census.test.ts", sites: 2 },
];
/** A W1 input: its file (a control's id), whether it must hold HELPER_IMPORT, its call-site count, and its text. */
interface ImportText {
  readonly file: string;
  readonly imports: boolean;
  readonly sites: number;
  readonly text: string;
}
/** The 256 characters U+0000 to U+00FF in code order: the alphabet the W1 and V1 batteries spell, one line per character. */
const LATIN_1: readonly string[] = Array.from({ length: 256 }, (_, code) => String.fromCodePoint(code));
/** The 63 ASCII letters, digits and underscore: the characters a W1 call site may not follow. */
const ASCII_WORD: readonly string[] = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"];
/** Every pair of a LATIN_1 character and one of `seconds`, the LATIN_1 character first: the two characters W1's pair batteries place before a name. */
const pairsBefore = (seconds: readonly string[]): string[] => LATIN_1.flatMap(first => seconds.map(second => `${first}${second}`));
/** A W1 battery text: one line per entry of `characters` (a character, or a pair of characters) and helper name, `spell` placing it beside the name. */
const siteBattery = (characters: readonly string[], spell: (character: string, name: string) => string): string =>
  characters.flatMap(character => ["withoutTriageArchive", "isTriageArchivePath"].map(name => spell(character, name))).join("\n");
/** W1's controls: the reader over the from clause spelled other ways and in other statements, over names and calls a call site must not be, its call-site batteries and its clause battery (one text per character). */
const W1_TEXTS: readonly ImportText[] = [
  { file: "control: the import with single quote marks", imports: false, sites: 0, text: "import { x } from './helpers/triage-archive.js';\n" },
  { file: "control: the import with the .ts ending", imports: false, sites: 0, text: 'import { x } from "./helpers/triage-archive.ts";\n' },
  { file: "control: the helper's path named in a comment", imports: false, sites: 0, text: "// test/helpers/triage-archive.ts\n" },
  { file: "control: a call of each function beside the import's specifiers", imports: true, sites: 2, text: `import { isTriageArchivePath, withoutTriageArchive } ${HELPER_IMPORT};\nisTriageArchivePath(a);\nwithoutTriageArchive(b);\n` },
  { file: "control: names that only hold a function's name", imports: false, sites: 0, text: "myisTriageArchivePath(a);\n_withoutTriageArchive(b);\n2isTriageArchivePath(c);\nisTriageArchivePathX(d);\n" },
  { file: "control: a call with a space before its parenthesis", imports: false, sites: 0, text: "isTriageArchivePath (a);\n" },
  { file: "control: a call at the text's start", imports: false, sites: 1, text: "withoutTriageArchive(a);\n" },
  { file: "control: the names with their case changed", imports: false, sites: 0, text: "WithoutTriageArchive(a);\nIsTriageArchivePath(b);\nWITHOUTTRIAGEARCHIVE(c);\nistriagearchivepath(d);\n" },
  { file: "control: calls in a line comment, a block comment and a string", imports: false, sites: 3, text: '// withoutTriageArchive(a);\n/* isTriageArchivePath(b); */\nconst s = "withoutTriageArchive(c)";\n' },
  { file: "control: a call with type arguments and an optional call", imports: false, sites: 0, text: "withoutTriageArchive<string[]>(a);\nisTriageArchivePath?.(b);\n" },
  { file: "control: the import with no space, two spaces, a tab or a newline before its specifier", imports: false, sites: 0, text: 'import { a } from"./helpers/triage-archive.js";\nimport { b } from  "./helpers/triage-archive.js";\nimport { c } from\t"./helpers/triage-archive.js";\nimport { d } from\n"./helpers/triage-archive.js";\n' },
  { file: "control: the specifier imported without a from clause", imports: false, sites: 0, text: 'import "./helpers/triage-archive.js";\nconst m = await import("./helpers/triage-archive.js");\n' },
  {
    file: "control: refusal #4's calls with no argument, a quoted argument and a space after the opening parenthesis",
    imports: false,
    sites: 3,
    text: '// a walk over no paths: withoutTriageArchive()\n// isTriageArchivePath("docs/workbench/programs/p/triage") reads true\n// withoutTriageArchive( paths ) keeps the live paths\n',
  },
  {
    file: "control: refusal #4's calls through a namespace and through an optional namespace",
    imports: false,
    sites: 2,
    text: "// through a namespace import: archive.withoutTriageArchive(paths)\n// an optional namespace: archive?.withoutTriageArchive(paths)\n",
  },
  { file: "control: refusal #5's import with no semicolon after the clause", imports: true, sites: 0, text: 'import { withoutTriageArchive } from "./helpers/triage-archive.js"\n' },
  { file: "control: refusal #5's namespace import", imports: true, sites: 0, text: 'import * as triageArchive from "./helpers/triage-archive.js";\n' },
  { file: "control: refusal #5's import spread over three lines", imports: true, sites: 0, text: 'import {\n  withoutTriageArchive,\n} from "./helpers/triage-archive.js";\n' },
  {
    file: "control: refusal #5's import followed by a type import of no specifiers, the clause held twice",
    imports: true,
    sites: 0,
    text: 'import { withoutTriageArchive } from "./helpers/triage-archive.js";\nimport type {} from "./helpers/triage-archive.js";\n',
  },
  { file: "control: the clause as the whole text", imports: true, sites: 0, text: 'from "./helpers/triage-archive.js"' },
  { file: "battery: each name called after each ASCII letter, digit and underscore", imports: false, sites: 0, text: siteBattery(ASCII_WORD, (character, name) => `${character}${name}(x);`) },
  { file: "battery: each name called after each other character U+0000 to U+00FF", imports: false, sites: 386, text: siteBattery(LATIN_1.filter(character => !ASCII_WORD.includes(character)), (character, name) => `${character}${name}(x);`) },
  {
    file: "battery: each name followed by each character U+0000 to U+00FF but an opening parenthesis, then by one",
    imports: false,
    sites: 0,
    text: siteBattery(
      LATIN_1.filter(character => character !== "("),
      (character, name) => `${name}${character}(x);`,
    ),
  },
  {
    file: "battery: each name called with each character U+0000 to U+00FF after its opening parenthesis, the line ending there",
    imports: false,
    sites: 512,
    text: siteBattery(LATIN_1, (character, name) => `${name}(${character}`),
  },
  {
    file: "battery: each name called after each ASCII letter, digit and underscore, with each character U+0000 to U+00FF before it",
    imports: false,
    sites: 0,
    text: siteBattery(pairsBefore(ASCII_WORD), (pair, name) => `${pair}${name}(x);`),
  },
  {
    file: "battery: each name called after each other character U+0000 to U+00FF, with each character U+0000 to U+00FF before it",
    imports: false,
    sites: 98816,
    text: siteBattery(
      pairsBefore(LATIN_1.filter(character => !ASCII_WORD.includes(character))),
      (pair, name) => `${pair}${name}(x);`,
    ),
  },
  ...LATIN_1.map(character => ({
    file: "clause battery: the clause with a character U+0000 to U+00FF right before its from and right after its closing quote mark",
    imports: true,
    sites: 0,
    text: `${character}from "./helpers/triage-archive.js"${character}`,
  })),
];

/** A control input of a counting reader: its id, the count the reader must read, and the text it reads. */
interface CountText {
  readonly id: string;
  readonly reads: number;
  readonly text: string;
}
/** N1's controls: archiveLineCount over the TRIAGE_ARCHIVE line twice, padded at each end, inside a longer line, split by a space and upper-cased. */
const N1_TEXTS: readonly CountText[] = [
  { id: "control: the line twice", reads: 2, text: `docs/\n${TRIAGE_ARCHIVE}\n# a comment\n${TRIAGE_ARCHIVE}\n` },
  { id: "control: the line inside a longer line", reads: 0, text: `!${TRIAGE_ARCHIVE}\n${TRIAGE_ARCHIVE}**\n# ${TRIAGE_ARCHIVE}\n` },
  { id: "control: the line after two spaces and a tab", reads: 1, text: `  \t${TRIAGE_ARCHIVE}\n` },
  { id: "control: the line before two spaces, a tab and a carriage return", reads: 1, text: `${TRIAGE_ARCHIVE}  \t\r\n` },
  { id: "control: the line with a space inside it", reads: 0, text: `${TRIAGE_ARCHIVE.replace("/triage/", "/ triage/")}\n` },
  { id: "control: the line upper-cased", reads: 0, text: `${TRIAGE_ARCHIVE.toUpperCase()}\n` },
];

/** A comment block a text opens with, holding the given lines. */
const block = (lines: readonly string[]): string => `/**\n${lines.map(line => ` * ${line}`).join("\n")}\n */\n`;
/** W2's controls: scopeLineCount over the scope line placed and spelled each way. */
const W2_TEXTS: readonly CountText[] = [
  { id: "the line in the opening block", reads: 1, text: `${block(["A census.", ARCHIVE_SCOPE_LINE])}import { x } from "y";\n` },
  { id: "control: the line twice in the opening block", reads: 2, text: block([ARCHIVE_SCOPE_LINE, "A census.", ARCHIVE_SCOPE_LINE]) },
  { id: "control: the line in a later block", reads: 0, text: `${block(["A census."])}import { x } from "y";\n${block([ARCHIVE_SCOPE_LINE])}` },
  { id: "control: the line after a first line of code", reads: 0, text: `import { x } from "y";\n${block([ARCHIVE_SCOPE_LINE])}` },
  { id: "control: the line in a block opening with one star", reads: 0, text: `/*\n * ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line without its star", reads: 0, text: `/**\n   ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line indented further", reads: 0, text: `/**\n *   ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line inside a longer line", reads: 0, text: block([`${ARCHIVE_SCOPE_LINE} More.`]) },
  { id: "control: the line after a prefix", reads: 0, text: block([`See: ${ARCHIVE_SCOPE_LINE}`]) },
  { id: "control: the line with its case changed", reads: 0, text: block([ARCHIVE_SCOPE_LINE.replace("ARCHIVE SCOPE", "Archive scope")]) },
  { id: "control: the line after a newline before the block", reads: 0, text: `\n${block([ARCHIVE_SCOPE_LINE])}` },
  { id: "control: the line after a space before the block", reads: 0, text: ` ${block([ARCHIVE_SCOPE_LINE])}` },
  { id: "control: the line in a block that never closes", reads: 0, text: `/**\n * ${ARCHIVE_SCOPE_LINE}\n` },
  { id: "control: the line after its star and a tab", reads: 0, text: `/**\n *\t${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after its star and two spaces", reads: 0, text: `/**\n *  ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after two stars", reads: 0, text: `/**\n ** ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after a star and a space at the line's start", reads: 1, text: `/**\n* ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after two spaces, a star and a space", reads: 1, text: `/**\n  * ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after a tab, a star and a space", reads: 1, text: `/**\n\t* ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after eight spaces and tabs, a star and a space", reads: 1, text: `/**\n \t  \t   * ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line right after a space and a star", reads: 1, text: `/**\n *${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line right after the block's opening stars", reads: 1, text: `/**${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line after a space, a star and a space on the block's opening line", reads: 1, text: `/** * ${ARCHIVE_SCOPE_LINE}\n */\n` },
  { id: "control: the line with a star and two spaces inside it and no prefix", reads: 0, text: `/**\n${ARCHIVE_SCOPE_LINE.replace("ARCHIVE SCOPE", "ARCHIVE*  SCOPE")}\n */\n` },
  { id: "control: the line before two spaces and a tab", reads: 1, text: block([`${ARCHIVE_SCOPE_LINE}  \t`]) },
  { id: "control: the line in a block with carriage-return line endings", reads: 1, text: `/**\r\n * ${ARCHIVE_SCOPE_LINE}\r\n */\r\n` },
];

interface ImporterFile extends FileText {
  /** Whether helperImporters must find this file (W3). */
  readonly importer: boolean;
  /** The NAMED RESIDUAL this row is a quiet row of, when it is one (W3). */
  readonly residual?: string;
}
/** W3's control tree: files below a scratch test/ (and one beside it, under qa/), each spelling a from clause, or an import without one, one way. */
const W3_FILES: readonly ImporterFile[] = [
  { path: "test/a.test.ts", importer: true, text: 'import { readFileSync } from "node:fs";\nimport { isTriageArchivePath } from "./helpers/triage-archive.js";\n' },
  { path: "test/helpers/b.ts", importer: true, text: 'export { isTriageArchivePath } from "./triage-archive.js";\n' },
  { path: "test/c/d.test.ts", importer: true, text: 'import { withoutTriageArchive } from "../helpers/triage-archive.js";\n' },
  { path: "test/e.test.ts", importer: true, text: "import { TRIAGE_ARCHIVE } from './helpers/triage-archive.js';\n" },
  { path: "test/f.test.ts", importer: true, text: 'import { TRIAGE_ARCHIVE } from "./helpers/triage-archive";\n' },
  { path: "test/g.test.ts", importer: true, text: 'import { TRIAGE_ARCHIVE } from "./helpers/triage-archive.ts";\n' },
  { path: "test/h.test.ts", importer: false, text: 'import { makeScratch } from "./helpers/scratch.js";\n' },
  { path: "test/i.test.ts", importer: false, text: 'import { x } from "./helpers/triage-archive-extra.js";\n' },
  { path: "test/j.test.ts", importer: false, text: 'import { x } from "../helpers/triage-archive.js";\n' },
  { path: "test/helpers/triage-archive.ts", importer: false, text: "export const TRIAGE_ARCHIVE = 1;\n" },
  { path: "test/k.test.ts", importer: true, text: '// import { isTriageArchivePath } from "./helpers/triage-archive.js";\n' },
  { path: "test/l.test.ts", importer: true, text: '/* import { isTriageArchivePath } from "./helpers/triage-archive.js"; */\n' },
  { path: "test/m.d.ts", importer: true, text: 'export { isTriageArchivePath } from "./helpers/triage-archive.js";\n' },
  { path: "test/n.test.ts", importer: true, text: 'import { isTriageArchivePath } from"./helpers/triage-archive.js";\n' },
  { path: "test/o.test.ts", importer: true, text: 'import { isTriageArchivePath } from\n  "./helpers/triage-archive.js";\n' },
  { path: "test/p.test.ts", importer: true, text: 'import { isTriageArchivePath } from\t"./helpers/triage-archive.js";\n' },
  { path: "test/q.test.ts", importer: true, text: 'import { isTriageArchivePath } from "./helpers/../helpers/triage-archive.js";\n' },
  { path: "test/r.test.ts", importer: false, text: 'import { x } from "./helpers/triage-archive.mjs";\n' },
  { path: "test/s.test.ts", importer: false, text: "import { x } from \"./helpers/triage-archive.js';\n" },
  { path: "test/t.test.ts", importer: false, text: '// xfrom "./helpers/triage-archive.js"\n' },
  { path: "test/u.test.ts", importer: false, text: '// From "./helpers/triage-archive.js"\n' },
  { path: "test/v.test.ts", importer: false, text: 'import { x } from "helpers/triage-archive.js";\n' },
  { path: "test/w.mts", importer: false, text: 'import { x } from "./helpers/triage-archive.js";\n' },
  { path: "qa/x.ts", importer: false, text: 'import { x } from "../test/helpers/triage-archive.js";\n' },
  { path: "test/y.test.ts", importer: false, residual: "R-W3-NO-FROM", text: 'await import("./helpers/triage-archive.js");\n' },
  { path: "test/z.test.ts", importer: false, residual: "R-W3-NO-FROM", text: 'require("./helpers/triage-archive.js");\n' },
  { path: "test/za.test.ts", importer: false, residual: "R-W3-NO-FROM", text: 'import "./helpers/triage-archive.js";\n' },
];

/** A control input of a yes-or-no reader: its id, the reading it must give, and the text it reads. */
interface QuoteText {
  readonly id: string;
  readonly quotes: boolean;
  readonly text: string;
}
const RATIONALE_LABEL = "Rationale to carry verbatim into the cut: ";
/** V1's controls: quotesRationale over the rationale's quotation changed one way each. */
const V1_TEXTS: readonly QuoteText[] = [
  { id: "control: its tail changed", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE.replace("fit its code.", "fit its own code.")}"` },
  { id: "control: its head changed", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE.replace("a quoted-evidence", "the quoted-evidence")}"` },
  { id: "control: its case changed", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE.replace("BY SPECIFICATION", "by specification")}"` },
  { id: "control: its spacing changed", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE.replace("spec level", "spec  level")}"` },
  { id: "control: its dash changed", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE.replace(String.fromCodePoint(0x2014), "-")}"` },
  { id: "control: its opening quote mark missing", quotes: false, text: `${RATIONALE_LABEL}${OWNER_RATIONALE}"` },
  { id: "control: its closing quote mark missing", quotes: false, text: `${RATIONALE_LABEL}"${OWNER_RATIONALE}` },
];
/** V1's exportRow control: the bead's own row between an earlier and a later row that each name the bead in a nested id. */
const EXPORT_TEXT = [
  JSON.stringify({ id: "wb-earlier", description: "an earlier row", links: [{ id: BEAD }] }),
  JSON.stringify({ id: BEAD, description: "the bead's own row" }),
  JSON.stringify({ id: "wb-later", description: "a later row", links: [{ id: BEAD }] }),
].join("\n");
/** A control input of clausesOf: its id, its text, and the clauses and labels clausesOf must read from it, in order. */
interface ClauseRow {
  readonly id: string;
  readonly text: string;
  readonly reads: readonly string[];
}
const LOWERCASE = [..."abcdefghijklmnopqrstuvwxyz"];
const UPPERCASE = LOWERCASE.map(letter => letter.toUpperCase());
const LONG_CLAUSE = "y".repeat(400);
const LONG_LABEL = `A${"b".repeat(29)} ${"c".repeat(30)}`;
const MANY_WORDS_LABEL = `Label ${LOWERCASE.slice(0, 24).join(" ")}`;
/** The characters a lettered line's clause may not hold: the newline splits the text, and the clause reader stops at a carriage return. */
const NOT_IN_A_CLAUSE: readonly string[] = ["\n", "\r"];
/** A CLAUSE_ROWS battery row: one line per character of LATIN_1, `line` spelling it at one position of a line form; `reading` is what clausesOf must read from that line, or undefined for nothing. */
function battery(id: string, line: (character: string, code: number) => string, reading: (character: string, code: number) => string | undefined): ClauseRow {
  return {
    id,
    text: LATIN_1.map((character, code) => line(character, code)).join("\n"),
    reads: LATIN_1.flatMap((character, code) => {
      const found = reading(character, code);
      return found === undefined ? [] : [found];
    }),
  };
}
/** V1's clausesOf controls, each text read alone: the lettered and quoting line forms at their pinned bounds, lines read as nothing, and a battery row per position. */
const CLAUSE_ROWS: readonly ClauseRow[] = [
  { id: "lettered lines closing with a semicolon and a full stop", text: "(a) one clause;\n(b) two clause.\n(c) three clause.", reads: ["one clause", "two clause", "three clause"] },
  { id: "a lettered line for every letter a to z", text: LOWERCASE.map(letter => `(${letter}) clause ${letter}.`).join("\n"), reads: LOWERCASE.map(letter => `clause ${letter}`) },
  { id: "lettered clauses of one and of four hundred characters", text: `(a) x.\n(b) ${LONG_CLAUSE};`, reads: ["x", LONG_CLAUSE] },
  { id: "labels of one, nine and twenty-four lowercase words", text: ['Label words: "q"', 'Note on the way the archive is to be kept: "q"', `${MANY_WORDS_LABEL}: "q"`].join("\n"), reads: ["Label words", "Note on the way the archive is to be kept", MANY_WORDS_LABEL] },
  { id: "a label for every capital A to Z", text: UPPERCASE.map(capital => `${capital}b words: "q"`).join("\n"), reads: UPPERCASE.map(capital => `${capital}b words`) },
  { id: "a label of a thirty-letter capitalized word and a thirty-letter lowercase word", text: `${LONG_LABEL}: "q"`, reads: [LONG_LABEL] },
  { id: "control: a one-word label", text: 'Note: "q"', reads: [] },
  { id: "control: a lettered line without its closing mark", text: "(d) no closing mark", reads: [] },
  { id: "control: lettered lines closing with a comma and a colon", text: "(e) a comma ending,\n(f) a colon ending:", reads: [] },
  { id: "control: a letter in parentheses mid-line", text: "Lead in (e) mid-line.", reads: [] },
  { id: "control: an uppercase letter and a digit in the parentheses", text: "(A) a capital letter.\n(1) a digit.", reads: [] },
  { id: "control: no space after the closing parenthesis", text: "(g)no space.", reads: [] },
  { id: "control: an indented lettered line and an indented label", text: ' (h) an indented line.\n Label words: "q"', reads: [] },
  { id: "control: labels starting lowercase and with a capitalized second word", text: 'label words: "q"\nLabel Words: "q"', reads: [] },
  { id: "control: labels without the space after the colon and before a single quote mark", text: 'Label words:"q"\nLabel words: \'q\'', reads: [] },
  { id: "control: a label whose capitalized word is one letter", text: 'L words: "q"', reads: [] },
  { id: "quiet row R-V1-OTHER-LINE: a bulleted and a numbered deliverable", text: "- a bulleted deliverable.\n1. a numbered deliverable.", reads: [] },
  { id: "control: lettered lines with an empty clause", text: "(a) .\n(b) ;", reads: [] },
  { id: "control: lettered lines without the opening parenthesis and without the letter", text: "a) no opening parenthesis.\n() no letter.", reads: [] },
  { id: "control: a label without its colon", text: 'Label words "q"', reads: [] },
  {
    id: "quiet row R-V1-OTHER-LINE: refusal #3's witness lines",
    text: [`(${String.fromCodePoint(0xe9)}) a fourth deliverable.`, `${String.fromCodePoint(0xc9)}tat of the archive kept: "x"`, `Note on the fa${String.fromCodePoint(0xe7)}ade of the archive: "x"`, "(d) a fourth\rdeliverable."].join("\n"),
    reads: [],
  },
  battery("battery: the character before a lettered line", (character, code) => `${character}(a) clause ${code}.`, (character, code) => (character === "\n" ? `clause ${code}` : undefined)),
  battery("battery: a lettered line's first character", (character, code) => `${character}a) clause ${code}.`, (character, code) => (character === "(" ? `clause ${code}` : undefined)),
  battery("battery: a lettered line's second character", (character, code) => `(${character}) clause ${code}.`, (character, code) => (LOWERCASE.includes(character) ? `clause ${code}` : undefined)),
  battery("battery: a lettered line's third character", (character, code) => `(a${character} clause ${code}.`, (character, code) => (character === ")" ? `clause ${code}` : undefined)),
  battery("battery: a lettered line's fourth character", (character, code) => `(a)${character}clause ${code}.`, (character, code) => (character === " " ? `clause ${code}` : undefined)),
  battery("battery: a character added before a lettered line's letter", (character, code) => `(${character}a) clause ${code}.`, () => undefined),
  battery("battery: a character added after a lettered line's letter", (character, code) => `(a${character}) clause ${code}.`, () => undefined),
  battery("battery: a character added after a lettered line's closing parenthesis", (character, code) => `(a)${character} clause ${code}.`, (character, code) => (character === " " ? ` clause ${code}` : undefined)),
  battery("battery: a clause of one character", character => `(a) ${character}.`, character => (NOT_IN_A_CLAUSE.includes(character) ? undefined : character)),
  battery("battery: a character between two clause characters", character => `(a) x${character}y.`, character => (NOT_IN_A_CLAUSE.includes(character) ? undefined : `x${character}y`)),
  battery("battery: a lettered line's last character", (character, code) => `(a) clause ${code}${character}`, (character, code) => (character === ";" || character === "." ? `clause ${code}` : undefined)),
  battery(
    "battery: the character after a lettered line's closing full stop",
    (character, code) => `(a) clause ${code}.${character}`,
    (character, code) => (character === "\n" ? `clause ${code}` : character === ";" || character === "." ? `clause ${code}.` : undefined),
  ),
  battery("battery: the character before a quoting line", character => `${character}Label words: "q"`, character => (character === "\n" ? "Label words" : undefined)),
  battery("battery: a quoting line's first character", character => `${character}b words: "q"`, character => (UPPERCASE.includes(character) ? `${character}b words` : undefined)),
  battery("battery: a quoting line's second character", character => `A${character} words: "q"`, character => (LOWERCASE.includes(character) ? `A${character} words` : undefined)),
  battery("battery: the character after a label's capitalized word", character => `Label${character}words: "q"`, character => (character === " " ? "Label words" : undefined)),
  battery("battery: the first letter of a label's word", character => `Label ${character}ords: "q"`, character => (LOWERCASE.includes(character) ? `Label ${character}ords` : undefined)),
  battery("battery: the character after a label", character => `Label words${character} "q"`, character => (character === ":" ? "Label words" : undefined)),
  battery("battery: the character after a label's colon", character => `Label words:${character}"q"`, character => (character === " " ? "Label words" : undefined)),
  battery("battery: the character after the space after a label's colon", character => `Label words: ${character}q"`, character => (character === '"' ? "Label words" : undefined)),
  battery("battery: a character added after a label's capital", character => `L${character}abel words: "q"`, character => (LOWERCASE.includes(character) ? `L${character}abel words` : undefined)),
  battery("battery: a character added after a label's capitalized word", character => `Label${character} words: "q"`, character => (LOWERCASE.includes(character) ? `Label${character} words` : undefined)),
  battery("battery: a character added before a label's word", character => `Label ${character}words: "q"`, character => (LOWERCASE.includes(character) ? `Label ${character}words` : undefined)),
  battery("battery: a character added after a label's word", character => `Label words${character}: "q"`, character => (LOWERCASE.includes(character) ? `Label words${character}` : undefined)),
  battery("battery: a character added after a label's colon", character => `Label words:${character} "q"`, () => undefined),
  battery("battery: a character added after the space after a label's colon", character => `Label words: ${character}"q"`, character => (character === '"' ? "Label words" : undefined)),
];

const REACHED: string[] = [];
/** The cases that spawn npm or git or read every test file and the tracker export: a loaded host must not time them out. */
const SPAWNING_CASE_TIMEOUT_MS = 60_000;
const read = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sorted = (paths: readonly string[]): string[] => [...paths].sort();
const CALLS = /\b(withoutTriageArchive|isTriageArchivePath)\(/g;
/** The helper calls in a source text, by function (an import specifier is no call). */
const callsIn = (text: string): string[] => [...text.matchAll(CALLS)].map(match => match[1] ?? "");

/** N1's reader: the lines of a text that are TRIAGE_ARCHIVE once trimmed (the spellings N1 above pins). */
const archiveLineCount = (text: string): number => text.split("\n").filter(line => line.trim() === TRIAGE_ARCHIVE).length;

/** The lines of the comment block a text opens with, each with its comment prefix and its trailing whitespace removed (the spellings W2 above pins). */
function headerLines(text: string): string[] {
  const end = text.indexOf("*/");
  if (!text.startsWith("/**") || end < 0) return [];
  return text
    .slice(3, end)
    .split("\n")
    .map(line => line.replace(/^\s*\* ?/, "").trimEnd());
}
/** W2's reader: the lines that are ARCHIVE_SCOPE_LINE in the comment block a text opens with. */
const scopeLineCount = (text: string): number => headerLines(text).filter(line => line === ARCHIVE_SCOPE_LINE).length;
/** The forms one PINNED FORMS line kind of the helper's opening comment block names, in order (P1, P3). */
function pinnedForms(kind: "archive" | "live"): string[] {
  const lead = `PINNED FORMS ${kind}: `;
  return headerLines(read(HELPER_FILE))
    .filter(line => line.startsWith(lead))
    .flatMap(line => line.slice(lead.length).split(", "));
}

/** The program whose triage tree the helper's opening block names in its SOURCE paragraph (archiveRowsFrom's program, P1). */
function sourceProgram(): string {
  const named = /docs\/workbench\/programs\/([^/\s]+)\/triage\//.exec(headerLines(read(HELPER_FILE)).join(" "));
  return named?.[1] ?? "";
}
/** The archive rows TRIAGE_ARCHIVE implies for a program (P1): one row per archive form, with the helper function a walker hands it. */
function archiveRowsFrom(glob: string, program: string): ArchiveRow[] {
  const triage = (name: string): string => glob.replace("*", name).replace(/\/$/, "");
  const page = "requirements/ATOMIC-REQUIREMENTS.md";
  return [
    { id: "directory", via: "isTriageArchivePath", path: triage(program) },
    { id: "child", via: "withoutTriageArchive", path: `${triage(program)}/README.md` },
    { id: "page", via: "withoutTriageArchive", path: `${triage(program)}/${page}` },
    { id: "one-character-program", via: "withoutTriageArchive", path: `${triage("p")}/${page}` },
    { id: "mixed-program", via: "withoutTriageArchive", path: `${triage("Interop v2.1_X")}/${page}` },
  ];
}
/** The live rows TRIAGE_ARCHIVE implies (P3): program p, file x.md; each literal segment changed four ways, the program segment absent and doubled, triage as a file, a program's own page, the path below a directory x. */
function liveRowsFrom(glob: string): LiveRow[] {
  const segments = glob.split("/").filter(segment => segment !== "");
  const spell = (parts: readonly string[]): string => parts.map(part => (part === "*" ? "p" : part)).join("/");
  const swap = (index: number, replacement: readonly string[], file: readonly string[]): string => spell([...segments.slice(0, index), ...replacement, ...segments.slice(index + 1), ...file]);
  const changed = segments.flatMap((segment, index): LiveRow[] =>
    segment === "*"
      ? [
          { part: "*:none", path: swap(index, [], ["x.md"]) },
          { part: "*:two", path: swap(index, ["p", "q"], ["x.md"]) },
        ]
      : [
          { part: `${segment}:renamed`, path: swap(index, [segment.slice(0, -1)], ["x.md"]) },
          { part: `${segment}:extended`, path: swap(index, [`${segment}d`], ["x.md"]) },
          { part: `${segment}:upper`, path: swap(index, [segment.toUpperCase()], ["x.md"]) },
          { part: `${segment}:capitalized`, path: swap(index, [`${segment.charAt(0).toUpperCase()}${segment.slice(1)}`], ["x.md"]) },
        ],
  );
  const last = segments.length - 1;
  const end = segments[last] ?? "";
  return [
    ...changed,
    { part: `${end}:file`, path: swap(last, [`${end}.md`], []) },
    { part: "*:page", path: swap(last, ["README.md"], []) },
    { part: "anchor", path: `x/${spell([...segments, "x.md"])}` },
  ];
}

/** Every .ts file below a directory of a root, read from disk, root-relative and "/"-separated. */
function tsFilesBelow(root: string, directory: string): string[] {
  return readdirSync(join(root, directory), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".ts"))
    .map(entry => relative(root, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}
const FROM = /\bfrom\s*(["'])([^"']+)\1/g;
/** Whether a file's text holds a from clause whose specifier starts with a dot and, joined to the file's directory with a .js or .ts ending dropped, is the helper (the spellings W3 above pins). */
function importsHelper(file: string, text: string): boolean {
  return [...text.matchAll(FROM)].some(match => {
    const specifier = match[2] ?? "";
    return specifier.startsWith(".") && posix.join(posix.dirname(file), specifier).replace(/\.(?:js|ts)$/, "") === HELPER_MODULE;
  });
}
/** W3's reader: the .ts files below a root's test/ that import the helper. */
const helperImporters = (root: string): string[] => tsFilesBelow(root, "test").filter(path => importsHelper(path, readFileSync(join(root, path), "utf8")));

interface ExportRow {
  readonly id: string;
  readonly description?: string;
  readonly notes?: string;
}
/** One row of a tracker export text, by its own id: its description and notes. */
function exportRow(id: string, text: string): { description: string; notes: string } {
  const row = text
    .split("\n")
    .filter(line => line.includes(`"id":"${id}"`))
    .map(line => JSON.parse(line) as ExportRow)
    .find(entry => entry.id === id);
  return { description: row?.description ?? "", notes: row?.notes ?? "" };
}
/** V1's reader: whether a text quotes OWNER_RATIONALE between quote marks, character for character. */
const quotesRationale = (text: string): boolean => text.includes(`"${OWNER_RATIONALE}"`);
/** V1's clause reader: each lettered line's clause, and the label of each quoting line (the forms and bounds V1 above pins). */
function clausesOf(description: string): string[] {
  return description.split("\n").flatMap(line => {
    const lettered = /^\([a-z]\) (.+)[;.]$/.exec(line);
    if (lettered?.[1] !== undefined) return [lettered[1]];
    const quoting = /^([A-Z][a-z]+(?: [a-z]+)+): "/.exec(line);
    return quoting?.[1] !== undefined ? [quoting[1]] : [];
  });
}
/** The shape items of wb-12x1's spec-ruling note: each item of its shape-assumption list, then its package-smoke sentence. */
function shapeItems(notes: string): string[] {
  const at = notes.indexOf(SHAPE_LIST_LEAD);
  const list = at < 0 ? "" : notes.slice(at + SHAPE_LIST_LEAD.length, notes.indexOf(". ", at));
  const smokeAt = notes.indexOf(SHAPE_SMOKE_LEAD);
  const smoke = smokeAt < 0 ? "" : notes.slice(smokeAt, notes.indexOf(". ", smokeAt));
  return [...list.split("; ").filter(item => item !== ""), ...(smoke === "" ? [] : [smoke])];
}

/** Writes files below a fresh scratch root (test/helpers/scratch.ts) and hands the root to `check`, then removes it. */
function inScratch<T>(prefix: string, files: readonly FileText[], check: (root: string) => T): T {
  const root = makeScratch(prefix);
  try {
    for (const file of files) {
      mkdirSync(dirname(join(root, file.path)), { recursive: true });
      writeFileSync(join(root, file.path), file.text);
    }
    return check(root);
  } finally {
    removeScratch(root);
  }
}
const gitListing = (root: string): string[] =>
  sorted(
    execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" })
      .split("\0")
      .filter(path => path !== ""),
  );
const walkListing = (root: string): string[] =>
  sorted(
    readdirSync(root, { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && !relative(root, entry.parentPath).split("/").includes(".git"))
      .map(entry => relative(root, join(entry.parentPath, entry.name))),
  );
interface Reading {
  readonly git: string[];
  readonly walk: string[];
}
/** M1's reader: a scratch git repository of the given files, the excluded ones named in .git/info/exclude, the rest tracked; git's listing and the filesystem walk. */
function masterShapedReading(files: readonly FileText[], excluded: readonly FileText[]): Reading {
  return inScratch("wb-cbt4-master-shape-", [...files, ...excluded], root => {
    execFileSync("git", ["init", "-q"], { cwd: root });
    mkdirSync(join(root, ".git", "info"), { recursive: true });
    writeFileSync(join(root, ".git", "info", "exclude"), excluded.map(file => `${file.path}\n`).join(""));
    execFileSync("git", ["add", "-A"], { cwd: root });
    return { git: gitListing(root), walk: walkListing(root) };
  });
}

/** npm pack --dry-run over a scratch package shaped like master, its .npmignore given; the packed paths. */
function packedPaths(npmignore: string): string[] {
  const files: FileText[] = [
    { path: "package.json", text: `${JSON.stringify({ name: "triage-archive-fixture", version: "0.0.0" })}\n` },
    { path: ".npmignore", text: npmignore },
    ...LIVE_FIXTURE,
    ...ARCHIVE_FIXTURE,
  ];
  return inScratch("wb-cbt4-pack-", files, root => {
    const out = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
    const receipts = JSON.parse(out) as Array<{ files: Array<{ path: string }> }>;
    return sorted((receipts[0]?.files ?? []).map(file => file.path));
  });
}
interface Classification {
  violations: Array<{ path: string; rule: string }>;
  topLevel: string[];
}
const classify = classifyPackedPaths as (paths: string[], options: { bundledLockEntries: string[] }) => Classification;

describe("wb-cbt4 census: the master-side triage-archive reconciliation (owner specification ruling M:60615 point 4)", () => {
  it("N1", () => {
    expect.assertions(1);
    const inputs: readonly CountText[] = [{ id: "the root .npmignore", reads: 1, text: read(".npmignore") }, ...N1_TEXTS];
    expect(
      inputs.map(input => `${input.id}: ${archiveLineCount(input.text)}`),
      "archiveLineCount reads the root .npmignore's TRIAGE_ARCHIVE line once, and a control holding it twice as two",
    ).toEqual(inputs.map(input => `${input.id}: ${input.reads}`));
    REACHED.push("N1");
  });

  it("N2", () => {
    expect.assertions(3);
    const packed = packedPaths(read(".npmignore"));
    expect(packed.filter(isTriageArchivePath), "no archive path is packed").toEqual([]);
    expect(packed, "the manifest and the live pages are packed").toEqual(sorted(["package.json", ...LIVE_FIXTURE.map(file => file.path)]));
    expect(classify(packed, { bundledLockEntries: [] }).violations, "the packed-path classifier reports nothing").toEqual([]);
    REACHED.push("N2");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("N3", () => {
    expect.assertions(2);
    const dropped = read(".npmignore")
      .split("\n")
      .filter(line => line.trim() !== TRIAGE_ARCHIVE)
      .join("\n");
    const packed = packedPaths(dropped);
    expect(packed.filter(isTriageArchivePath), "without the line every archive file is packed").toEqual(sorted(ARCHIVE_FIXTURE.map(file => file.path)));
    expect(classify(packed, { bundledLockEntries: [] }).violations, "the classifier refuses the archive's .jsonl").toEqual([
      { path: `${ARCHIVE_DIR}/epistemic-triage/.work-phase9/backup/CLAIMS.jsonl`, rule: "denied-pattern" },
    ]);
    REACHED.push("N3");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("P1", () => {
    expect.assertions(5);
    expect(ARCHIVE_ROWS, "the archive rows are the rows TRIAGE_ARCHIVE implies for the helper's SOURCE program").toEqual(archiveRowsFrom(TRIAGE_ARCHIVE, sourceProgram()));
    expect(ARCHIVE_ROWS.filter(row => !isTriageArchivePath(row.path)).map(row => row.id), "an archive path read as live").toEqual([]);
    expect(withoutTriageArchive(ARCHIVE_ROWS.map(row => row.path)), "withoutTriageArchive drops every archive path").toEqual([]);
    expect(ARCHIVE_ROWS.map(row => row.id), "one archive row per archive form the helper's PINNED FORMS lines name, in order").toEqual(pinnedForms("archive"));
    const called = [...new Set(WALKERS.flatMap(walker => callsIn(read(walker.file))))].sort();
    expect([...new Set(ARCHIVE_ROWS.map(row => row.via))].sort(), "the archive rows' vias are the helper functions the walking censuses call").toEqual(called);
    REACHED.push("P1");
  });

  it("P2", () => {
    expect.assertions(2);
    expect(LIVE_ROWS.filter(row => isTriageArchivePath(row.path)).map(row => row.part), "a live path read as the archive").toEqual([]);
    const live = LIVE_ROWS.map(row => row.path);
    const mixed = LIVE_ROWS.flatMap((row, index) => [row.path, ARCHIVE_ROWS[index % ARCHIVE_ROWS.length].path]);
    expect(withoutTriageArchive([...mixed, ...mixed]), "withoutTriageArchive keeps each live path, in order, each time it is given").toEqual([...live, ...live]);
    REACHED.push("P2");
  });

  it("P3", () => {
    expect.assertions(2);
    expect(LIVE_ROWS, "the live rows are the rows TRIAGE_ARCHIVE implies, as the helper exports it").toEqual(liveRowsFrom(TRIAGE_ARCHIVE));
    expect(LIVE_ROWS.map(row => row.part), "one live row per live form the helper's PINNED FORMS lines name, in order").toEqual(pinnedForms("live"));
    REACHED.push("P3");
  });

  it("M1", () => {
    expect.assertions(5);
    const items = shapeItems(exportRow(SHAPE_BEAD, read(EXPORT)).notes);
    expect(
      items.map(item => SHAPES.filter(shape => item.includes(shape.phrase)).map(shape => shape.id)),
      "the SHAPES phrases tile the shape items of wb-12x1's note, one each in order",
    ).toEqual(SHAPES.map(shape => [shape.id]));
    expect(
      [
        ...SHAPES.map(shape => `${shape.id}: ${ARCHIVE_FIXTURE.filter(file => holds(shape.id, file)).map(file => file.path.slice(ARCHIVE_DIR.length + 1)).join(", ")}`),
        ...HOLDS_CONTROLS.map(control => `${control.shape} ${control.path}: ${holds(control.shape, control)}`),
      ],
      "by holds, the fixture's archive files holding each shape are exactly HOLDERS, and each control reads as its row says",
    ).toEqual([...HOLDERS, ...HOLDS_CONTROLS.map(control => `${control.shape} ${control.path}: ${control.holds}`)]);
    const live = sorted(LIVE_FIXTURE.map(file => file.path));
    const tracked = sorted([...live, ...ARCHIVE_FIXTURE.map(file => file.path)]);
    const [shaped, control] = [[], [EXCLUDED_FILE]].map(excluded => masterShapedReading([...LIVE_FIXTURE, ...ARCHIVE_FIXTURE], excluded));
    expect(
      { shaped, control },
      "git's listing and the walk agree over the master-shaped tree and hold its archive; over the control the walk holds the excluded file and git's listing not",
    ).toEqual({ shaped: { git: tracked, walk: tracked }, control: { git: tracked, walk: sorted([...tracked, EXCLUDED_FILE.path]) } });
    expect(withoutTriageArchive(shaped.git), "git's listing keeps exactly the live pages").toEqual(live);
    expect(withoutTriageArchive(shaped.walk), "the walk keeps exactly the live pages, so the two still agree").toEqual(live);
    REACHED.push("M1");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("W1", () => {
    expect.assertions(1);
    const inputs: readonly ImportText[] = [...WALKERS.map(walker => ({ file: walker.file, imports: true, sites: walker.sites, text: read(walker.file) })), ...W1_TEXTS];
    const measured = inputs.map(walker => {
      const { text } = walker;
      return { file: walker.file, imports: text.includes(HELPER_IMPORT), sites: callsIn(text).length };
    });
    expect(measured, "each walking census holds the from clause and its pinned call sites, and each control reads as its row says").toEqual(
      inputs.map(walker => ({ file: walker.file, imports: walker.imports, sites: walker.sites })),
    );
    REACHED.push("W1");
  });

  it("W2", () => {
    expect.assertions(1);
    const inputs: readonly CountText[] = [...WALKERS.map(walker => ({ id: walker.file, reads: 1, text: read(walker.file) })), ...W2_TEXTS];
    expect(
      inputs.map(input => `${input.id}: ${scopeLineCount(input.text)}`),
      "scopeLineCount reads ARCHIVE_SCOPE_LINE once in each walking census's opening block, and each control as its row says",
    ).toEqual(inputs.map(input => `${input.id}: ${input.reads}`));
    REACHED.push("W2");
  });

  it("W3", () => {
    expect.assertions(1);
    const found = inScratch("wb-cbt4-importers-", W3_FILES, root => [REPO, root].map(directory => helperImporters(directory)));
    expect(found, "the helper's importers are the WALKERS censuses and this file, and the control tree's importers are its importer rows").toEqual([
      sorted([...WALKERS.map(walker => walker.file), THIS_FILE]),
      sorted(W3_FILES.filter(file => file.importer).map(file => file.path)),
    ]);
    REACHED.push("W3");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("V1", () => {
    expect.assertions(3);
    const [row, control] = [read(EXPORT), EXPORT_TEXT].map(text => exportRow(BEAD, text));
    expect(control.description, "exportRow reads the row whose own id is the bead's").toBe("the bead's own row");
    const { description } = row;
    const inputs: readonly QuoteText[] = [{ id: "the wb-cbt4 row's description", quotes: true, text: description }, ...V1_TEXTS];
    expect(
      inputs.map(input => `${input.id}: ${quotesRationale(input.text)}`),
      "the bead quotes OWNER_RATIONALE verbatim, and no control quotation reads as it",
    ).toEqual(inputs.map(input => `${input.id}: ${input.quotes}`));
    const [clauses, ...controlClauses] = [description, ...CLAUSE_ROWS.map(entry => entry.text)].map(text => clausesOf(text));
    expect(
      { tiling: clauses.join(" "), controls: CLAUSE_ROWS.map((entry, index) => `${entry.id}: ${JSON.stringify(controlClauses[index])}`) },
      "the bead's clauses tile the ROWS requirement phrases, in order, and each CLAUSE_ROWS text reads as its row says",
    ).toEqual({ tiling: ROWS.map(entry => entry.requirement).join(" "), controls: CLAUSE_ROWS.map(entry => `${entry.id}: ${JSON.stringify(entry.reads)}`) });
    REACHED.push("V1");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("F1", () => {
    expect.assertions(12);
    expect(ROWS.map(row => `${row.id}|${row.requirement}|${row.pins.join(",")}`)).toEqual([
      "A|the measured .npmignore '*/triage/' package-smoke cure|N1,N2,N3",
      "B|an EXPLICIT owner-specified archive-path exclusion for docs/workbench/programs/*/triage/|P1,P2,P3,M1",
      "C|in the walking censuses|W1,W2,W3",
      "D|Rationale to carry verbatim into the cut|V1",
    ]);
    expect(ARCHIVE_ROWS.map(row => `${row.id}|${row.via}|${row.path}`)).toEqual([
      "directory|isTriageArchivePath|docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage",
      "child|withoutTriageArchive|docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/README.md",
      "page|withoutTriageArchive|docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md",
      "one-character-program|withoutTriageArchive|docs/workbench/programs/p/triage/requirements/ATOMIC-REQUIREMENTS.md",
      "mixed-program|withoutTriageArchive|docs/workbench/programs/Interop v2.1_X/triage/requirements/ATOMIC-REQUIREMENTS.md",
    ]);
    expect(LIVE_ROWS.map(row => `${row.part}|${row.path}`)).toEqual([
      "docs:renamed|doc/workbench/programs/p/triage/x.md",
      "docs:extended|docsd/workbench/programs/p/triage/x.md",
      "docs:upper|DOCS/workbench/programs/p/triage/x.md",
      "docs:capitalized|Docs/workbench/programs/p/triage/x.md",
      "workbench:renamed|docs/workbenc/programs/p/triage/x.md",
      "workbench:extended|docs/workbenchd/programs/p/triage/x.md",
      "workbench:upper|docs/WORKBENCH/programs/p/triage/x.md",
      "workbench:capitalized|docs/Workbench/programs/p/triage/x.md",
      "programs:renamed|docs/workbench/program/p/triage/x.md",
      "programs:extended|docs/workbench/programsd/p/triage/x.md",
      "programs:upper|docs/workbench/PROGRAMS/p/triage/x.md",
      "programs:capitalized|docs/workbench/Programs/p/triage/x.md",
      "*:none|docs/workbench/programs/triage/x.md",
      "*:two|docs/workbench/programs/p/q/triage/x.md",
      "triage:renamed|docs/workbench/programs/p/triag/x.md",
      "triage:extended|docs/workbench/programs/p/triaged/x.md",
      "triage:upper|docs/workbench/programs/p/TRIAGE/x.md",
      "triage:capitalized|docs/workbench/programs/p/Triage/x.md",
      "triage:file|docs/workbench/programs/p/triage.md",
      "*:page|docs/workbench/programs/p/README.md",
      "anchor|x/docs/workbench/programs/p/triage/x.md",
    ]);
    expect(SHAPES.map(shape => shape.id)).toEqual(["no-heading", "not-markdown", "shebang-py", "deep", "jsonl"]);
    expect(WALKERS.map(walker => `${walker.file}:${walker.sites}`)).toEqual([
      "test/workbench-apo-citation-status-census.test.ts:2",
      "test/workbench-apo-export-census.test.ts:2",
      "test/workbench-docs-shared-filesystem-census.test.ts:1",
      "test/workbench-forge-proposal-admission-census.test.ts:3",
      "test/workbench-furnace-cac-citation-status-census.test.ts:3",
      "test/workbench-gp-seam-served-census.test.ts:3",
      "test/workbench-hx-gp-answer-invariance-census.test.ts:1",
      "test/workbench-mw-cac-citation-status-census.test.ts:2",
      "test/workbench-mw-gp-citation-status-census.test.ts:2",
      "test/workbench-rf-graph-policy-context-census.test.ts:1",
      "test/workbench-rf-historical-claim-census.test.ts:2",
      "test/workbench-rf-orphan-server-reclaim-census.test.ts:1",
      "test/workbench-rf-read-status-upgrade-census.test.ts:1",
      "test/workbench-rf-source-change-block-claim-census.test.ts:1",
      "test/workbench-rf-speculative-context-census.test.ts:2",
      "test/workbench-ri-decision-resource-census.test.ts:2",
      "test/workbench-ri-decision-seed-claim-census.test.ts:1",
      "test/workbench-ri-observation-authority-census.test.ts:1",
      "test/workbench-tsx-h2-proposed-api-census.test.ts:1",
      "test/workbench-urr-core-gate-census.test.ts:2",
    ]);
    expect(N1_TEXTS.map(entry => `${entry.id}:${entry.reads}`)).toEqual([
      "control: the line twice:2",
      "control: the line inside a longer line:0",
      "control: the line after two spaces and a tab:1",
      "control: the line before two spaces, a tab and a carriage return:1",
      "control: the line with a space inside it:0",
      "control: the line upper-cased:0",
    ]);
    expect(HOLDS_CONTROLS.map(entry => `${entry.shape}|${entry.path}:${entry.holds}`)).toEqual([
      "no-heading|docs/a.md:false",
      "no-heading|docs/b.md:true",
      "no-heading|docs/c.md:true",
      "no-heading|docs/d.txt:false",
      "not-markdown|docs/e.md:false",
      "not-markdown|docs/f.mdx:true",
      "shebang-py|docs/g.py:true",
      "shebang-py|docs/h.py:false",
      "shebang-py|docs/i.sh:false",
      "deep|docs/a/b/c/j.md:false",
      "deep|docs/a/b/c/d/k.md:true",
      "deep|docs/a/b/c/d/l.json:false",
      "jsonl|docs/m.jsonl:true",
      "jsonl|docs/n.json:false",
      "no-heading|docs/o.md:true",
      "no-heading|docs/p.md:true",
      "no-heading|docs/q.md:true",
      "no-heading|docs/r.md:true",
      "no-heading|docs/s.MD:false",
      "no-heading|docs/ad.xmd:false",
      "not-markdown|docs/t.MD:true",
      "not-markdown|docs/u.xmd:true",
      "shebang-py|docs/v.py:true",
      "shebang-py|docs/w.py:false",
      "shebang-py|docs/x.py:false",
      "shebang-py|docs/aa.xpy:false",
      "deep|docs/a/b/c/d/e/y.md:true",
      "deep|docs/a/b/c/d/ac.xmd:false",
      "jsonl|docs/z.jsonl.gz:false",
      "jsonl|docs/ab.xjsonl:false",
    ]);
    expect(W1_TEXTS.map(entry => `${entry.file}:${entry.imports}:${entry.sites}`)).toEqual([
      "control: the import with single quote marks:false:0",
      "control: the import with the .ts ending:false:0",
      "control: the helper's path named in a comment:false:0",
      "control: a call of each function beside the import's specifiers:true:2",
      "control: names that only hold a function's name:false:0",
      "control: a call with a space before its parenthesis:false:0",
      "control: a call at the text's start:false:1",
      "control: the names with their case changed:false:0",
      "control: calls in a line comment, a block comment and a string:false:3",
      "control: a call with type arguments and an optional call:false:0",
      "control: the import with no space, two spaces, a tab or a newline before its specifier:false:0",
      "control: the specifier imported without a from clause:false:0",
      "control: refusal #4's calls with no argument, a quoted argument and a space after the opening parenthesis:false:3",
      "control: refusal #4's calls through a namespace and through an optional namespace:false:2",
      "control: refusal #5's import with no semicolon after the clause:true:0",
      "control: refusal #5's namespace import:true:0",
      "control: refusal #5's import spread over three lines:true:0",
      "control: refusal #5's import followed by a type import of no specifiers, the clause held twice:true:0",
      "control: the clause as the whole text:true:0",
      "battery: each name called after each ASCII letter, digit and underscore:false:0",
      "battery: each name called after each other character U+0000 to U+00FF:false:386",
      "battery: each name followed by each character U+0000 to U+00FF but an opening parenthesis, then by one:false:0",
      "battery: each name called with each character U+0000 to U+00FF after its opening parenthesis, the line ending there:false:512",
      "battery: each name called after each ASCII letter, digit and underscore, with each character U+0000 to U+00FF before it:false:0",
      "battery: each name called after each other character U+0000 to U+00FF, with each character U+0000 to U+00FF before it:false:98816",
      ...Array.from(
        { length: 256 },
        () => "clause battery: the clause with a character U+0000 to U+00FF right before its from and right after its closing quote mark:true:0",
      ),
    ]);
    expect(W2_TEXTS.map(entry => `${entry.id}:${entry.reads}`)).toEqual([
      "the line in the opening block:1",
      "control: the line twice in the opening block:2",
      "control: the line in a later block:0",
      "control: the line after a first line of code:0",
      "control: the line in a block opening with one star:0",
      "control: the line without its star:0",
      "control: the line indented further:0",
      "control: the line inside a longer line:0",
      "control: the line after a prefix:0",
      "control: the line with its case changed:0",
      "control: the line after a newline before the block:0",
      "control: the line after a space before the block:0",
      "control: the line in a block that never closes:0",
      "control: the line after its star and a tab:0",
      "control: the line after its star and two spaces:0",
      "control: the line after two stars:0",
      "control: the line after a star and a space at the line's start:1",
      "control: the line after two spaces, a star and a space:1",
      "control: the line after a tab, a star and a space:1",
      "control: the line after eight spaces and tabs, a star and a space:1",
      "control: the line right after a space and a star:1",
      "control: the line right after the block's opening stars:1",
      "control: the line after a space, a star and a space on the block's opening line:1",
      "control: the line with a star and two spaces inside it and no prefix:0",
      "control: the line before two spaces and a tab:1",
      "control: the line in a block with carriage-return line endings:1",
    ]);
    expect(W3_FILES.map(entry => `${entry.path}:${entry.importer}${entry.residual === undefined ? "" : `:${entry.residual}`}`)).toEqual([
      "test/a.test.ts:true",
      "test/helpers/b.ts:true",
      "test/c/d.test.ts:true",
      "test/e.test.ts:true",
      "test/f.test.ts:true",
      "test/g.test.ts:true",
      "test/h.test.ts:false",
      "test/i.test.ts:false",
      "test/j.test.ts:false",
      "test/helpers/triage-archive.ts:false",
      "test/k.test.ts:true",
      "test/l.test.ts:true",
      "test/m.d.ts:true",
      "test/n.test.ts:true",
      "test/o.test.ts:true",
      "test/p.test.ts:true",
      "test/q.test.ts:true",
      "test/r.test.ts:false",
      "test/s.test.ts:false",
      "test/t.test.ts:false",
      "test/u.test.ts:false",
      "test/v.test.ts:false",
      "test/w.mts:false",
      "qa/x.ts:false",
      "test/y.test.ts:false:R-W3-NO-FROM",
      "test/z.test.ts:false:R-W3-NO-FROM",
      "test/za.test.ts:false:R-W3-NO-FROM",
    ]);
    expect(V1_TEXTS.map(entry => `${entry.id}:${entry.quotes}`)).toEqual([
      "control: its tail changed:false",
      "control: its head changed:false",
      "control: its case changed:false",
      "control: its spacing changed:false",
      "control: its dash changed:false",
      "control: its opening quote mark missing:false",
      "control: its closing quote mark missing:false",
    ]);
    expect(CLAUSE_ROWS.map(entry => `${entry.id}:${entry.reads.length}`)).toEqual([
      "lettered lines closing with a semicolon and a full stop:3",
      "a lettered line for every letter a to z:26",
      "lettered clauses of one and of four hundred characters:2",
      "labels of one, nine and twenty-four lowercase words:3",
      "a label for every capital A to Z:26",
      "a label of a thirty-letter capitalized word and a thirty-letter lowercase word:1",
      "control: a one-word label:0",
      "control: a lettered line without its closing mark:0",
      "control: lettered lines closing with a comma and a colon:0",
      "control: a letter in parentheses mid-line:0",
      "control: an uppercase letter and a digit in the parentheses:0",
      "control: no space after the closing parenthesis:0",
      "control: an indented lettered line and an indented label:0",
      "control: labels starting lowercase and with a capitalized second word:0",
      "control: labels without the space after the colon and before a single quote mark:0",
      "control: a label whose capitalized word is one letter:0",
      "quiet row R-V1-OTHER-LINE: a bulleted and a numbered deliverable:0",
      "control: lettered lines with an empty clause:0",
      "control: lettered lines without the opening parenthesis and without the letter:0",
      "control: a label without its colon:0",
      "quiet row R-V1-OTHER-LINE: refusal #3's witness lines:0",
      "battery: the character before a lettered line:1",
      "battery: a lettered line's first character:1",
      "battery: a lettered line's second character:26",
      "battery: a lettered line's third character:1",
      "battery: a lettered line's fourth character:1",
      "battery: a character added before a lettered line's letter:0",
      "battery: a character added after a lettered line's letter:0",
      "battery: a character added after a lettered line's closing parenthesis:1",
      "battery: a clause of one character:254",
      "battery: a character between two clause characters:254",
      "battery: a lettered line's last character:2",
      "battery: the character after a lettered line's closing full stop:3",
      "battery: the character before a quoting line:1",
      "battery: a quoting line's first character:26",
      "battery: a quoting line's second character:26",
      "battery: the character after a label's capitalized word:1",
      "battery: the first letter of a label's word:26",
      "battery: the character after a label:1",
      "battery: the character after a label's colon:1",
      "battery: the character after the space after a label's colon:1",
      "battery: a character added after a label's capital:26",
      "battery: a character added after a label's capitalized word:26",
      "battery: a character added before a label's word:26",
      "battery: a character added after a label's word:26",
      "battery: a character added after a label's colon:0",
      "battery: a character added after the space after a label's colon:1",
    ]);
    REACHED.push("F1");
  });

  it("R1", () => {
    expect.assertions(1);
    expect(REACHED, "every ROWS pin ran to its end once, in row order, then the frozen shape").toEqual([...ROWS.flatMap(row => row.pins), "F1"]);
  });
});
