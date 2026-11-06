/**
 * wb-cbt4 ([MWI-master-recon]) census: the master-side triage-archive reconciliation. Owner specification ruling 2026-11-06
 * (ruling-received M:60615 point 4; the RECORDED CONDITION on epic wb-1a3t) orders two deliverables, "red-first each, on a
 * master-shaped fixture": "(a) the measured .npmignore '<program>/triage/' package-smoke cure" and "(b) an EXPLICIT owner-specified
 * archive-path exclusion for docs/workbench/programs/<program>/triage/ in the walking censuses" (the bead spells the program part
 * as a glob star; this comment cannot, since a star before a slash ends it). The rationale is carried verbatim as OWNER_RATIONALE in
 * test/helpers/triage-archive.ts, which holds the predicate (isTriageArchivePath, withoutTriageArchive), the npm line
 * (TRIAGE_ARCHIVE) and the header line each walking census carries (ARCHIVE_SCOPE_LINE).
 *
 * PINNED READER SET (claim form: each case by id in this file, its assertion target, the result it holds):
 * - N1 the repository's root .npmignore holds the line TRIAGE_ARCHIVE exactly once.
 * - N2 (master-shaped fixture) npm pack --dry-run over a scratch package shaped like master (M1's live pages and archive), with the
 *   root .npmignore copied in, packs the manifest and the live pages and no archive path; the packed-path classifier of
 *   qa/workbench/package-boundary.mjs reports nothing.
 * - N3 (control) the same package with the TRIAGE_ARCHIVE line dropped from its .npmignore packs every archive file, and the
 *   classifier reports the archive's .jsonl as denied-pattern: the package-smoke red that line cures.
 * - P1 isTriageArchivePath reads true for each ARCHIVE_ROWS path, the archive directory itself and a page below it, and
 *   withoutTriageArchive drops both; outside anchor: each helper function the WALKERS censuses call, read from their files, is the
 *   `via` of an ARCHIVE_ROWS row (a directory skip passes a directory path, a list filter a file path).
 * - P2 isTriageArchivePath reads false for each LIVE_ROWS path, and withoutTriageArchive keeps them all, in order.
 * - P3 outside anchor: the LIVE_ROWS parts are exactly the parts derived from TRIAGE_ARCHIVE as the helper exports it - each literal
 *   segment renamed, extended and differently cased, the program segment empty and two segments deep, the path not anchored at the
 *   repository root - one row each, in order.
 * - M1 (master-shaped fixture) a scratch git repository holding live pages, a receipt and a program's own pages beside that
 *   program's archive, all tracked: unfiltered, git's listing and the filesystem walk agree and hold the archive; through
 *   withoutTriageArchive both keep exactly the live pages. Outside anchor: the SHAPES phrases tile the shape items of wb-12x1's
 *   spec-ruling note in .beads/issues.jsonl (each item of its shape-assumption list, then its package-smoke item), one each in
 *   order, and the fixture's archive holds each shape.
 * - W1 each WALKERS census imports from ./helpers/triage-archive.js and holds exactly its pinned count of call sites of
 *   withoutTriageArchive and isTriageArchivePath.
 * - W2 each WALKERS census carries ARCHIVE_SCOPE_LINE exactly once, as a line of its leading comment.
 * - W3 outside anchor: the test files that import the helper, read from disk, are exactly the WALKERS censuses and this file.
 * - V1 outside anchor: the wb-cbt4 row of .beads/issues.jsonl quotes OWNER_RATIONALE, and its description's clauses (each
 *   lettered deliverable line, then the label of each line that introduces a quotation) tile the ROWS requirement phrases in order.
 * - F1 (standing rule 16 frozen shape) ROWS, ARCHIVE_ROWS, LIVE_ROWS, SHAPES and WALKERS as literals derived at this cut.
 * - R1 every ROWS pin is a case of this file that ran to its end, once, in row order, then F1.
 *
 * THE WALKERS: the 20 censuses whose walks the archive turned red, measured at trunk 75b12d6f with master 85c9b80f's 457 archive
 * files tracked in the working tree: 20 files | 40 tests red at the base (the pins the archive hit, with the records or
 * registration cases those pins feed), each file green on that tree with this cut; each routes those walks, with any listing a walk
 * is held equal to, through the helper and carries ARCHIVE_SCOPE_LINE.
 *
 * WHY THE ROOT .npmignore: the measured cure placed '<program>/triage/' in a new docs/workbench/programs/.npmignore. That file is
 * itself a docs/workbench file outside the archive, so the live-doc walks judge it: tracked over this cut on the master-shaped tree
 * it reds 5 of the WALKERS, 9 tests (docs-shared-filesystem SCG-R5's walk, 78 pages against 77; mw-gp A1's markdown arm; mw-cac
 * A1's level-1 heading arm; furnace-cac D2's page scope; ri-observation-authority A2's markdown floor; each with its records case).
 * The same exclusion anchored at the repository root as TRIAGE_ARCHIVE is no docs/workbench file; the root-file readers measured
 * with it read green (package-boundary, both fiber-host-publication censuses, urr-core-gate, rf-orphan-server-reclaim), and it packs
 * the same set (N2, N3; package-smoke over the master-shaped tree: rc 1 with 25 denied-pattern paths at the base, rc 0 with it).
 *
 * NOT CLAIMED (scope sentences; no residual semantics; no follow-up bead):
 * - A census outside WALKERS is NOT CLAIMED by this census: where it walks the archive it still reads it, and on the measured
 *   master-shaped tree it read it quiet.
 * - The archive's own content (its claims, its citations, its links, its file shapes) is NOT CLAIMED by this census.
 * - master's other conditions, the master-only edits outside the archive (the program pages, the skill, the new-feedback files and
 *   the page edits), are NOT CLAIMED by this census.
 * - A path that is not repository-relative and "/"-separated, and a file (not a directory) named triage directly inside a program
 *   directory, are NOT CLAIMED by this census: the predicate reads paths, not file kinds.
 * - package-smoke's own run over the repository is NOT CLAIMED by this census: N2 and N3 judge a scratch package; the gate step
 *   runs package-smoke itself.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { classifyPackedPaths } from "../qa/workbench/package-boundary.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";
import { ARCHIVE_SCOPE_LINE, isTriageArchivePath, OWNER_RATIONALE, TRIAGE_ARCHIVE, withoutTriageArchive } from "./helpers/triage-archive.js";

installScratchLeakGuard();

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const THIS_FILE = "test/workbench-triage-archive-exclusion-census.test.ts";
const HELPER_IMPORT = 'from "./helpers/triage-archive.js"';
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
  readonly id: string;
  /** The helper function the walking censuses hand this kind of path (P1's outside anchor). */
  readonly via: HelperCall;
  readonly path: string;
}
/** Paths that ARE the archive (P1): the directory a walk skips, and a file a listing drops. */
const ARCHIVE_ROWS: readonly ArchiveRow[] = [
  { id: "directory", via: "isTriageArchivePath", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage" },
  { id: "page", via: "withoutTriageArchive", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md" },
];

interface LiveRow {
  /** The TRIAGE_ARCHIVE part the path changes (P3). */
  readonly part: string;
  readonly path: string;
}
/** Paths that are NOT the archive (P2): one per part derived from the glob (P3), in its order. */
const LIVE_ROWS: readonly LiveRow[] = [
  { part: "docs:renamed", path: "doc/workbench/programs/p/triage/x.md" },
  { part: "docs:extended", path: "docsx/workbench/programs/p/triage/x.md" },
  { part: "docs:cased", path: "DOCS/workbench/programs/p/triage/x.md" },
  { part: "workbench:renamed", path: "docs/bench/programs/p/triage/x.md" },
  { part: "workbench:extended", path: "docs/workbenchx/programs/p/triage/x.md" },
  { part: "workbench:cased", path: "docs/Workbench/programs/p/triage/x.md" },
  { part: "programs:renamed", path: "docs/workbench/program/p/triage/x.md" },
  { part: "programs:extended", path: "docs/workbench/programs-old/p/triage/x.md" },
  { part: "programs:cased", path: "docs/workbench/PROGRAMS/p/triage/x.md" },
  { part: "*:none", path: "docs/workbench/programs/triage/x.md" },
  { part: "*:two", path: "docs/workbench/programs/p/q/triage/x.md" },
  { part: "triage:renamed", path: "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md" },
  { part: "triage:extended", path: "docs/workbench/programs/p/triage.md" },
  { part: "triage:cased", path: "docs/workbench/programs/p/TRIAGE/x.md" },
  { part: "anchor", path: "x/docs/workbench/programs/p/triage/y.md" },
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

const REACHED: string[] = [];
/** The cases that spawn npm or git or read every test file and the tracker export: a loaded host must not time them out. */
const SPAWNING_CASE_TIMEOUT_MS = 60_000;
const read = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sorted = (paths: readonly string[]): string[] => [...paths].sort();
const CALLS = /\b(withoutTriageArchive|isTriageArchivePath)\(/g;
/** The helper calls in a source text, by function (an import specifier is no call). */
const callsIn = (text: string): string[] => [...text.matchAll(CALLS)].map(match => match[1] ?? "");

/** The parts TRIAGE_ARCHIVE names, read from the glob: each literal segment renamed, extended and cased, the star's two bounds, its anchor. */
function globParts(glob: string): string[] {
  const segments = glob.split("/").filter(segment => segment !== "");
  return [...segments.flatMap(segment => (segment === "*" ? ["*:none", "*:two"] : ["renamed", "extended", "cased"].map(change => `${segment}:${change}`))), "anchor"];
}

/** The leading block comment of a source text, line by line, each line's comment prefix removed. */
function headerLines(text: string): string[] {
  const end = text.indexOf("*/");
  if (!text.startsWith("/**") || end < 0) return [];
  return text
    .slice(3, end)
    .split("\n")
    .map(line => line.replace(/^\s*\* ?/, "").trimEnd());
}

/** Every .ts file below a directory of the repository, repository-relative. */
function tsFilesBelow(directory: string): string[] {
  return readdirSync(join(REPO, directory), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".ts"))
    .map(entry => relative(REPO, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}

/** One row of the tracker export, by id: its description and notes. */
function exportRow(id: string): { description: string; notes: string } {
  const row = read(".beads/issues.jsonl")
    .split("\n")
    .filter(line => line.includes(`"id":"${id}"`))
    .map(line => JSON.parse(line) as { id: string; description?: string; notes?: string })
    .find(entry => entry.id === id);
  return { description: row?.description ?? "", notes: row?.notes ?? "" };
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
const npmignoreLines = (text: string): string[] => text.split("\n").map(line => line.trim());

describe("wb-cbt4 census: the master-side triage-archive reconciliation (owner specification ruling M:60615 point 4)", () => {
  it("N1", () => {
    expect(npmignoreLines(read(".npmignore")).filter(line => line === TRIAGE_ARCHIVE), "the root .npmignore names the archive once").toEqual([TRIAGE_ARCHIVE]);
    REACHED.push("N1");
  });

  it("N2", () => {
    const packed = packedPaths(read(".npmignore"));
    expect(packed.filter(isTriageArchivePath), "no archive path is packed").toEqual([]);
    expect(packed, "the manifest and the live pages are packed").toEqual(sorted(["package.json", ...LIVE_FIXTURE.map(file => file.path)]));
    expect(classify(packed, { bundledLockEntries: [] }).violations, "the packed-path classifier reports nothing").toEqual([]);
    REACHED.push("N2");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("N3", () => {
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
    expect(ARCHIVE_ROWS.filter(row => !isTriageArchivePath(row.path)).map(row => row.id), "an archive path read as live").toEqual([]);
    expect(withoutTriageArchive(ARCHIVE_ROWS.map(row => row.path)), "withoutTriageArchive drops every archive path").toEqual([]);
    const called = [...new Set(WALKERS.flatMap(walker => callsIn(read(walker.file))))].sort();
    expect(sorted(ARCHIVE_ROWS.map(row => row.via)), "one archive row per helper function the walking censuses call").toEqual(called);
    REACHED.push("P1");
  });

  it("P2", () => {
    expect(LIVE_ROWS.filter(row => isTriageArchivePath(row.path)).map(row => row.part), "a live path read as the archive").toEqual([]);
    expect(withoutTriageArchive(LIVE_ROWS.map(row => row.path)), "withoutTriageArchive keeps every live path, in order").toEqual(LIVE_ROWS.map(row => row.path));
    REACHED.push("P2");
  });

  it("P3", () => {
    expect(LIVE_ROWS.map(row => row.part), "one live row per part of the glob the helper exports, in order").toEqual(globParts(TRIAGE_ARCHIVE));
    REACHED.push("P3");
  });

  it("M1", () => {
    const items = shapeItems(exportRow(SHAPE_BEAD).notes);
    expect(
      items.map(item => SHAPES.filter(shape => item.includes(shape.phrase)).map(shape => shape.id)),
      "the SHAPES phrases tile the shape items of wb-12x1's note, one each in order",
    ).toEqual(SHAPES.map(shape => [shape.id]));
    expect(SHAPES.filter(shape => !ARCHIVE_FIXTURE.some(file => holds(shape.id, file))).map(shape => shape.id), "a shape the fixture's archive does not hold").toEqual([]);
    const live = sorted(LIVE_FIXTURE.map(file => file.path));
    const archive = sorted(ARCHIVE_FIXTURE.map(file => file.path));
    const reading = inScratch("wb-cbt4-master-shape-", [...LIVE_FIXTURE, ...ARCHIVE_FIXTURE], root => {
      execFileSync("git", ["init", "-q"], { cwd: root });
      execFileSync("git", ["add", "-A"], { cwd: root });
      return { git: gitListing(root), walk: walkListing(root) };
    });
    expect(reading.git, "git tracks the master-shaped tree, archive included").toEqual(sorted([...live, ...archive]));
    expect(reading.walk, "the filesystem walk reads the same tree").toEqual(reading.git);
    expect(withoutTriageArchive(reading.git), "git's listing keeps exactly the live pages").toEqual(live);
    expect(withoutTriageArchive(reading.walk), "the walk keeps exactly the live pages, so the two still agree").toEqual(live);
    REACHED.push("M1");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("W1", () => {
    const measured = WALKERS.map(walker => {
      const text = read(walker.file);
      return { file: walker.file, imports: text.includes(HELPER_IMPORT), sites: callsIn(text).length };
    });
    expect(measured, "each walking census imports the helper and holds its pinned call sites").toEqual(WALKERS.map(walker => ({ file: walker.file, imports: true, sites: walker.sites })));
    REACHED.push("W1");
  });

  it("W2", () => {
    const counts = WALKERS.map(walker => ({ file: walker.file, lines: headerLines(read(walker.file)).filter(line => line === ARCHIVE_SCOPE_LINE).length }));
    expect(counts, "each walking census carries ARCHIVE_SCOPE_LINE once in its leading comment").toEqual(WALKERS.map(walker => ({ file: walker.file, lines: 1 })));
    REACHED.push("W2");
  });

  it("W3", () => {
    const importers = tsFilesBelow("test").filter(path => {
      const text = read(path);
      return text.includes(HELPER_IMPORT) || text.includes('from "./triage-archive.js"');
    });
    expect(importers, "the helper's importers are the WALKERS censuses and this file").toEqual(sorted([...WALKERS.map(walker => walker.file), THIS_FILE]));
    REACHED.push("W3");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("V1", () => {
    const { description } = exportRow(BEAD);
    expect(description.includes(`"${OWNER_RATIONALE}"`), "the bead quotes OWNER_RATIONALE verbatim").toBe(true);
    const clauses = description.split("\n").flatMap(line => {
      const lettered = /^\([a-z]\) (.+)[;.]$/.exec(line);
      if (lettered?.[1] !== undefined) return [lettered[1]];
      const quoting = /^([A-Z][a-z]+(?: [a-z]+)+): "/.exec(line);
      return quoting?.[1] !== undefined ? [quoting[1]] : [];
    });
    expect(clauses.join(" "), "the bead's clauses tile the ROWS requirement phrases, in order").toBe(ROWS.map(entry => entry.requirement).join(" "));
    REACHED.push("V1");
  }, SPAWNING_CASE_TIMEOUT_MS);

  it("F1", () => {
    expect(ROWS.map(row => `${row.id}|${row.requirement}|${row.pins.join(",")}`)).toEqual([
      "A|the measured .npmignore '*/triage/' package-smoke cure|N1,N2,N3",
      "B|an EXPLICIT owner-specified archive-path exclusion for docs/workbench/programs/*/triage/|P1,P2,P3,M1",
      "C|in the walking censuses|W1,W2,W3",
      "D|Rationale to carry verbatim into the cut|V1",
    ]);
    expect(ARCHIVE_ROWS.map(row => `${row.id}:${row.via}`)).toEqual(["directory:isTriageArchivePath", "page:withoutTriageArchive"]);
    expect(LIVE_ROWS.map(row => row.part)).toEqual([
      "docs:renamed",
      "docs:extended",
      "docs:cased",
      "workbench:renamed",
      "workbench:extended",
      "workbench:cased",
      "programs:renamed",
      "programs:extended",
      "programs:cased",
      "*:none",
      "*:two",
      "triage:renamed",
      "triage:extended",
      "triage:cased",
      "anchor",
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
    REACHED.push("F1");
  });

  it("R1", () => {
    expect(REACHED, "every ROWS pin ran to its end once, in row order, then the frozen shape").toEqual([...ROWS.flatMap(row => row.pins), "F1"]);
  });
});
