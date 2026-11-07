/**
 * wb-cbt4 ([MWI-master-recon]) census: the master-side triage-archive reconciliation. Owner specification ruling 2026-11-06
 * (ruling-received M:60615 point 4; the RECORDED CONDITION on epic wb-1a3t) orders two deliverables, "red-first each, on a
 * master-shaped fixture": "(a) the measured .npmignore '<program>/triage/' package-smoke cure" and "(b) an EXPLICIT owner-specified
 * archive-path exclusion for docs/workbench/programs/<program>/triage/ in the walking censuses" (the bead spells the program part
 * as a glob star; this comment cannot, since a star before a slash ends it). The rationale is carried verbatim as OWNER_RATIONALE in
 * test/helpers/triage-archive.ts, which holds the predicate (isTriageArchivePath, withoutTriageArchive), the npm line
 * (TRIAGE_ARCHIVE) and the header line each walking census carries (ARCHIVE_SCOPE_LINE).
 *
 * PINNED READER SET (claim form: each case by id in this file, its assertion target, the result it holds). Each case declares its
 * assertion count first (expect.assertions), and npm run test passes --expect.requireAssertions. A reading with controls runs one
 * reader over its live input and over its control inputs in one expression, so the controls judge the reader the live reading
 * uses; each reader is claimed on those inputs only.
 * - N1 archiveLineCount (the lines of a text that are TRIAGE_ARCHIVE once trimmed) reads 1 over the root .npmignore and, over the
 *   N1_TEXTS controls, 2 over a text holding that line twice and 0 over lines holding it inside a longer line.
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
 *   package-smoke item), one each in order. holds encodes each shape: no-heading a .md file whose text does not open with "# ",
 *   not-markdown a file whose path does not end .md, shebang-py a .py file whose text opens with "#!", deep a .md file whose path
 *   has more than five segments, jsonl a .jsonl file; by holds, the fixture's archive files holding each shape are exactly
 *   HOLDERS, and over the HOLDS_CONTROLS files, on each side of each encoding, holds reads as each row says.
 * - W1 each WALKERS census imports from ./helpers/triage-archive.js and holds exactly its pinned count of call sites of
 *   withoutTriageArchive and isTriageArchivePath.
 * - W2 scopeLineCount reads 1 over each WALKERS census: the lines that are ARCHIVE_SCOPE_LINE in the comment block the text opens
 *   with (the text's first characters are a slash and two stars; the block ends at its first star-slash), each line read with its
 *   comment prefix (leading whitespace, a star, at most one space) and its trailing whitespace removed. Over the W2_TEXTS controls
 *   the same reader reads 1 for the line in such a block, 2 for it twice there, and 0 for it in a later block, after a first line
 *   of code, in a block opening with one star, without its star, indented further, inside a longer line, after a prefix, and with
 *   its case changed.
 * - W3 outside anchor: helperImporters, over test/ read from disk, finds exactly the WALKERS censuses and this file - the .ts files
 *   below test/ holding a from clause whose relative specifier, joined to the file's directory with a .js or .ts ending dropped, is
 *   test/helpers/triage-archive (the reader reads text: a from clause inside a comment counts too). Over the W3_FILES control tree
 *   the same reader finds the import from test/, the re-export from a helper file, the import from a nested directory, and the
 *   single-quoted, the extensionless and the .ts-ending imports, and not an import of another helper, of a module whose name only
 *   begins with the helper's, or of a module outside test/.
 * - V1 outside anchor: exportRow reads the wb-cbt4 row of .beads/issues.jsonl, and quotesRationale reads its description quoting
 *   OWNER_RATIONALE between quote marks, character for character; over the V1_TEXTS controls the same reader reads no quotation for
 *   the quote with its tail, its head, its case, its spacing or its dash changed, or with either quote mark missing; over the
 *   EXPORT_TEXT control exportRow reads the row whose own id is the bead's, not an earlier or a later row naming it in a nested id. The
 *   description's clauses tile the ROWS requirement phrases in order: clausesOf reads each line that is a lowercase letter in
 *   parentheses, a space, the clause and a closing ; or . (the clause), and each line opening with a capitalized word, one or more
 *   lowercase words, a colon, a space and a quote mark (its label); over the CLAUSE_TEXT control it reads a third lettered line and
 *   a two-word label, and nothing of a one-word label, of a lettered line without its closing mark, or of a letter mid-line.
 * - F1 (standing rule 16 frozen shape) ROWS, ARCHIVE_ROWS, LIVE_ROWS, SHAPES, WALKERS and the control tables N1_TEXTS,
 *   HOLDS_CONTROLS, W2_TEXTS, W3_FILES and V1_TEXTS as literals derived at this cut.
 * - R1 every ROWS pin is a case of this file that ran to its end, once, in row order, then F1.
 *
 * THE WALKERS: the 20 censuses whose walks the archive turned red, measured at trunk fd90f9d3 with master 6f7a366d's 457 archive
 * files tracked in the working tree (their blob ids equal master's; the archive tree is the same at 85c9b80f, ee51aa6c and
 * 0b25e14e): 20 files | 40 tests red at the base (the pins the archive hit, with the records or registration cases those pins
 * feed), each file green on that tree with this cut (its full default tier reads 0 failed); each routes those walks, with any
 * listing a walk is held equal to, through the helper and carries ARCHIVE_SCOPE_LINE.
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
 * - An import of the helper from outside test/, from a file whose name does not end .ts, or through import() or require() is NOT
 *   CLAIMED by this census: W3 reads from clauses of the .ts files below test/.
 * - A reader's reading of an input other than its live input and its listed controls is NOT CLAIMED by this census.
 * - The removal of a control row together with its F1 element is NOT CLAIMED as killed by this census: the control tables
 *   (N1_TEXTS, HOLDS_CONTROLS, W2_TEXTS, W3_FILES, V1_TEXTS) are falsifiers of this file's own readers, and F1 is their only anchor.
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
/** Whether a fixture file holds a shape (the directories between docs/ and a page count toward its depth). */
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
/** M1's holds controls: for each shape, files on each side of its encoding. */
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

/** A control input of a counting reader: its id, the count the reader must read, and the text it reads. */
interface CountText {
  readonly id: string;
  readonly reads: number;
  readonly text: string;
}
/** N1's controls: archiveLineCount over a text holding the TRIAGE_ARCHIVE line twice, and over lines holding it inside a longer line. */
const N1_TEXTS: readonly CountText[] = [
  { id: "control: the line twice", reads: 2, text: `docs/\n${TRIAGE_ARCHIVE}\n# a comment\n${TRIAGE_ARCHIVE}\n` },
  { id: "control: the line inside a longer line", reads: 0, text: `!${TRIAGE_ARCHIVE}\n${TRIAGE_ARCHIVE}**\n# ${TRIAGE_ARCHIVE}\n` },
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
];

interface ImporterFile extends FileText {
  /** Whether helperImporters must find this file (W3). */
  readonly importer: boolean;
}
/** W3's control tree: files below a scratch test/, each spelling a from clause one way. */
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
/** V1's clausesOf control, and the clauses it must read from it. */
const CLAUSE_TEXT = ["(a) one clause;", "(b) two clause.", "(c) three clause.", 'Label words: "q"', 'Note: "q"', "(d) no closing mark", "Lead in (e) mid-line."].join("\n");
const CLAUSE_READS: readonly string[] = ["one clause", "two clause", "three clause", "Label words"];

const REACHED: string[] = [];
/** The cases that spawn npm or git or read every test file and the tracker export: a loaded host must not time them out. */
const SPAWNING_CASE_TIMEOUT_MS = 60_000;
const read = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sorted = (paths: readonly string[]): string[] => [...paths].sort();
const CALLS = /\b(withoutTriageArchive|isTriageArchivePath)\(/g;
/** The helper calls in a source text, by function (an import specifier is no call). */
const callsIn = (text: string): string[] => [...text.matchAll(CALLS)].map(match => match[1] ?? "");

/** N1's reader: the lines of a text that are TRIAGE_ARCHIVE once trimmed. */
const archiveLineCount = (text: string): number => text.split("\n").filter(line => line.trim() === TRIAGE_ARCHIVE).length;

/** The comment block a text opens with, line by line, each line's comment prefix and trailing whitespace removed. */
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
const FROM = /\bfrom\s+(["'])([^"']+)\1/g;
/** Whether a file's text holds a from clause whose relative specifier, joined to the file's directory with a .js or .ts ending dropped, is the helper. */
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
/** V1's clause reader: each lettered line's clause, and the label of each line that introduces a quotation. */
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
    const measured = WALKERS.map(walker => {
      const text = read(walker.file);
      return { file: walker.file, imports: text.includes(HELPER_IMPORT), sites: callsIn(text).length };
    });
    expect(measured, "each walking census imports the helper and holds its pinned call sites").toEqual(WALKERS.map(walker => ({ file: walker.file, imports: true, sites: walker.sites })));
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
    const [clauses, controlClauses] = [description, CLAUSE_TEXT].map(text => clausesOf(text));
    expect(
      { tiling: clauses.join(" "), control: controlClauses },
      "the bead's clauses tile the ROWS requirement phrases, in order, and the control's clauses are CLAUSE_READS",
    ).toEqual({ tiling: ROWS.map(entry => entry.requirement).join(" "), control: CLAUSE_READS });
    REACHED.push("V1");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("F1", () => {
    expect.assertions(10);
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
    expect(N1_TEXTS.map(entry => `${entry.id}:${entry.reads}`)).toEqual(["control: the line twice:2", "control: the line inside a longer line:0"]);
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
    ]);
    expect(W3_FILES.map(entry => `${entry.path}:${entry.importer}`)).toEqual([
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
    REACHED.push("F1");
  });

  it("R1", () => {
    expect.assertions(1);
    expect(REACHED, "every ROWS pin ran to its end once, in row order, then the frozen shape").toEqual([...ROWS.flatMap(row => row.pins), "F1"]);
  });
});
