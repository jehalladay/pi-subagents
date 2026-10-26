/**
 * wb-0lf.7 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R14, program-triage-2026-10-18 child of wb-0lf), the until-then leg of a
 * gating carrier. Statement (the bead title, full form): "Gating artifact: the GraphPolicyCLI decision seam (design-only at
 * Furnace 0f791db71b9d). Pi adds no GP capability, host or docs presenting GP as served until the seam exists and has passed
 * fixture-only, shadow-receipt and read-only advisory stages with source-owned evidence and a complete Forge gate; adoption is
 * an opt-in canary labelled experimental or fixture, never shipped on hermetic evidence."
 * Acceptance (owner filing, verbatim, cut at "; " into three clauses):
 *  (1) "until the artifact exists, a docs census asserts no docs/workbench or feature-matrix sentence presents a GP seam as
 *      served";
 *  (2) "on landing, the first GP rows carry status fixture or experimental, the shadow-receipt stage records decisions without
 *      executing them, the advisory stage is read-only, and only a measured live receipt (source-owned evidence plus a complete
 *      Forge gate on the exact commit) may move a row to live-sdk";
 *  (3) "synthetic coordination fixtures are labelled synthetic in test titles and receipts (carries O15)".
 * CLAIMED: clause (1) exactly - the labels of rows A and B, joined by one space, are the clause word for word (the judged set
 * reads it from the tracked bead export). NOT CLAIMED (ROSTER.unclaimed, each held to the export): clause (2) binds on landing
 * - no Pi GP row or seam stage exists to judge (B2 reads 0 GP rows in the feature matrix and the status ledger); clause (3) is
 * the seam's own non-negotiable test row (Furnace README.md:25 "Synthetic coordination fixtures are labeled synthetic"), owed
 * by the seam's tests when they exist.
 *
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat on 2026-10-26 from a shallow
 * clone of the Furnace repository at 6502737d9e96, removed after the read; this census is hermetic and never re-reads it):
 * the two GP program files under docs/programs/ are the bead pin 0f791db71b9d's blobs byte for byte, their status lines read
 * "design-only" and "non-normative integration design", and no file under crates/, sdk/, executors/, executor-protocol/ or
 * schemas/ names graphpolicy, graph-policy, graph_policy or GraphDataIR (codeHits 0). GATE: gateOf(producer) reads ABSENT
 * while every program status line carries design-only or non-normative and codeHits is 0, PRESENT otherwise. Pi's own side
 * reads the same today: docs/workbench/03's ownership row gives GraphPolicyCLI "nothing today (no gp seam is registered)" and
 * its GraphPolicyCLI boundary section opens "Pi carries no GraphPolicyCLI (gp) integration today." (A1, through the landed
 * docs binding docsSection/sectionTables of test/helpers/census.ts), so a seam registered in docs/03 reds A1 and the cut that
 * registers it re-reads the gate. While the gate reads ABSENT the guard requires zero findings; on PRESENT it stands down and
 * clause (2) governs.
 *
 * READINGS
 * - ROOTS: every file git lists (tracked or untracked, never ignored) below docs/ - docs/workbench/ and the feature matrix
 *   with it, a superset of the clause's surface - and the repository root's .md pages, read as UTF-8. An independent walk
 *   (symlinks reported, never followed) minus git's ignored set must equal that list, and every top-level directory git
 *   tracks is a root or a named outside directory (B1).
 * - SENTENCE: a page's text cut after ".", "!", "?" or ";" before white space or the line end, at a blank line, around a
 *   table row ("|") and a heading line ("#"), and before a list item; a sentence wrapped over lines stays one (B3).
 * - FOLD: NFKC, lower case, the inline markup characters * ` ~ and \ dropped, so **served** and `gp` read as written words;
 *   everything else is raw text, an HTML comment included. WORDS: a NAME sits between non-alphanumeric boundaries, so an
 *   underscore separates it (GP_CLI_, graph_policy); a SEAM or SERVED word sits between boundaries that also count the
 *   underscore as a letter, so an identifier is one word (beads_calls is not calls); a MARKER sits between boundaries that
 *   count the underscore and the hyphen as letters, so landed-gated, not-started and not_found carry no marker.
 * - NAMES: N1 graph and policy with an optional -, _, dot or space between and an optional cli after the same separator
 *   (GraphPolicyCLI, graph-policy-cli, graphpolicy); N2 the word gp; N3 graph, data or function and ir with the same
 *   separators (GraphDataIR, GraphFunctionIR).
 * - SEAM (what a GP seam is, by the bead's and docs/03's own words): seam, integration, capability, host, client, adapter,
 *   provider, consumer, gp-adjacent module, decision point, decision path, executor, canary, advisory and adoption, singular
 *   or plural, and the subject Pi itself.
 * - SERVED: serve, ship, integrate, wire, adopt, host, register, enable and expose with their -s and -ed forms (serving and
 *   shipping too), invokes, live, live-sdk, available, supported, supports, implemented, landed, landed-gated,
 *   gate-pass, released, deployed and operational.
 * - FINDING: a sentence that carries a NAME, a SERVED word and a SEAM word (or Pi), and no MARKER (a negating, gating,
 *   conditional or modal word, or the n't contraction); reported `<path>:<line> <names>: served-<word>` (B4, B5). A NAME and
 *   a SERVED word with no SEAM word and no Pi is BARE: the producer's own statement, never a seam claim (R-BARE-NAME).
 * - STATUS ROWS (B2), read whatever their caveats say: a feature-matrix row whose Feature cell carries a NAME and whose Status
 *   cell is a served status - a legend status whose own legend line names landed-gated work (landed-gated, partial), derived
 *   from the matrix's "## Status legend" - or a status outside the legend, reported `matrix-<status>`; a status-ledger row of
 *   docs/workbench/TRACEABILITY.md (parseLedger of qa/workbench/status-ledger.mjs) whose Requirement cell carries a NAME and
 *   whose Status is one of that module's CLAIM_STATUSES (shipped, gate-pass, live-sdk), reported `ledger-<status>`.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; each pin's witness is held to the roster):
 *  A "until the artifact exists, a docs census asserts": A1 the gate (producer facts, near misses, the Pi-side docs/03
 *    reading); A2 the live guard - ONE pass over every listed file and in-memory positives must find exactly the positives,
 *    with coverage floors, and the same pass over a scratch git repository finds exactly its plants.
 *  B "no docs/workbench or feature-matrix sentence presents a GP seam as served": B1 the read set and a frozen pass over the
 *    immutable tree at the cut's base (exact counts, every quieted named sentence with its reason); B2 the status rows;
 *    B3 the sentence cutter; B4 the names and seam subjects; B5 the served and Pi-side words and the markers.
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-0lf.7 in the tracked bead export (.beads/issues.jsonl):
 *   its acceptance's clause (1) is the two labels joined, each label tiled by its pins, clauses (2) and (3) are the unclaimed
 *   clauses; the title's "GP capability, host or docs presenting GP as served" yields seam words and a served word read from
 *   the text, its canary and shipped yield a seam and a served word, the clause's seam, served and until yield a seam, a served
 *   word and a marker, and clause (2)'s live-sdk is a served word; the filing's quoted status phrases sit inside the recorded
 *   status lines and its Furnace pin is the recorded bead pin. docs/workbench/03's GraphPolicyCLI boundary section: every
 *   Graph-prefixed CamelCase word, every -cli package name and the parenthesised short name read as NAMES, and every term its
 *   definition sentence defines ("A gp client is ...") reads as a SEAM subject. qa/workbench/status-ledger.mjs: each of its
 *   CLAIM_STATUSES reads as a served word. The feature matrix's legend yields the served matrix statuses. So a name family,
 *   seam word, served word or marker the bead or docs/03 spells, removed from every literal of this file and the roster, still
 *   reds, and so does a row or a pin removed with its frozen-shape element.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer
 *   facts, the unclaimed clauses, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/gp-seam-served-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row): R-OUTSIDE-ROOTS (B1) a claim in src/, test/, qa/, examples/, the dot
 *   directories, vendor/ or another tracked directory outside docs/, or in a root file that is not a .md page, is not read;
 *   R-STATUS-OTHER-CELL (B2) a GP name only in a feature-matrix Evidence or Caveats cell, or in a status-ledger cell other
 *   than Requirement, leaves the status unread structurally (its sentence reading still applies); R-OTHER-TABLES (B2) a status cell of any other docs table is read only
 *   as a sentence, so a marker anywhere in its row quiets it; R-BARE-NAME (B4) a GP name beside a served word with no seam
 *   word and no Pi is the producer's own statement (GraphPolicyCLI ships the npm package graph-policy-cli, the landed
 *   wb-1xvp.3 receipt's line 13), never read as a seam claim; R-SPLIT (B4) a claim and its seam in different sentences;
 *   R-LOOKALIKE (B4) a look-alike letter or an inserted invisible inside a name (NFKC folds the fullwidth forms, which are
 *   read); R-MARKER-ANYWHERE (B5) a marker anywhere in a sentence quiets it, whatever it qualifies; R-PARAPHRASE (B5) a
 *   served claim outside the served words (up, ready, in place, working, running, and the verbs calls, runs and uses,
 *   which docs spell as nouns too: bd calls); R-RENDERED-TEXT (B5) a character reference, an HTML tag or underscore
 *   emphasis inside or around a word leaves it unread, while the markup characters * ` ~ and \ are dropped and a claim
 *   inside an HTML comment, which no reader sees, is still found.
 *
 * Display paths added: none. Test-only: the replica trees are scratch git repositories under makeScratch; docs, the bead
 * export, docs/03, the status-ledger module and the frozen tree are only read; nothing is spawned but git.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CLAIM_STATUSES, EXPECTED_HEADER, parseLedger } from "../qa/workbench/status-ledger.mjs";
import { docsSection, sectionTables } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Gate = "ABSENT" | "PRESENT";
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Family {
  readonly id: string;
  readonly source: string;
}
interface Vocabulary {
  readonly names: readonly Family[];
  readonly seam: string;
  readonly served: string;
  readonly marker: string;
}
interface Constants {
  readonly roots: readonly string[];
  readonly outside: readonly string[];
  readonly matrix: string;
  readonly ledger: string;
  readonly docs03: string;
  readonly frozenAt: string;
  readonly designStatus: string;
}
interface ProgramFile {
  readonly path: string;
  readonly blob: string;
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Producer {
  readonly repository: string;
  readonly pin: string;
  readonly beadPin: string;
  readonly measured: string;
  readonly programs: readonly ProgramFile[];
  readonly codeRoots: readonly string[];
  readonly codeHits: number;
  readonly gate: Gate;
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly unclaimed: readonly { readonly clause: string; readonly reason: string }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/gp-seam-served-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-0lf.7";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  roots: ["docs"],
  outside: [".agents", ".beads", ".codex", ".github", ".pi", "examples", "media", "new-feedback", "qa", "src", "test", "vendor"],
  matrix: "docs/workbench/feature-matrix.md",
  ledger: "docs/workbench/TRACEABILITY.md",
  docs03: "docs/workbench/03-architecture-and-ownership.md",
  frozenAt: "32e0e2d2e514",
  designStatus: "design-only|non-normative",
};
const VOCABULARY: Vocabulary = {
  names: [
    { id: "N1", source: "(?<![a-z0-9])graph[-_. ]?policy(?:[-_. ]?cli)?(?![a-z0-9])" },
    { id: "N2", source: "(?<![a-z0-9])gp(?![a-z0-9])" },
    { id: "N3", source: "(?<![a-z0-9])graph[-_. ]?(?:data|function)[-_. ]?ir(?![a-z0-9])" },
  ],
  seam: "(?<![a-z0-9_])(?:seams?|integrations?|capabilit(?:y|ies)|hosts?|clients?|adapters?|providers?|consumers?|gp-adjacent modules?|decision[- ](?:points?|paths?)|executors?|canar(?:y|ies)|advisory|adoptions?|pi)(?![a-z0-9_])",
  served:
    "(?<![a-z0-9_])(serv(?:e|es|ed|ing)|ship(?:s|ped|ping)?|integrat(?:es|ed)|wir(?:es|ed)|adopt(?:s|ed)|host(?:s|ed)|register(?:s|ed)|enabl(?:es|ed)|expos(?:es|ed)|invokes|live(?:-sdk)?|available|supported|supports|implemented|landed(?:-gated)?|gate-pass|released|deployed|operational)(?![a-z0-9_])",
  marker:
    "(?<![a-z0-9_-])(?:not|no|never|nor|without|until|unless|pending|absent|unshipped|unserved|unimplemented|unregistered|gated|before|if|when|once|whether|future|planned|proposed|design-only|none|nothing|cannot|will|would|could|might|may|shall|should|must)(?![a-z0-9_-])|n['\u2019]t(?![a-z0-9_-])",
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "until the artifact exists, a docs census asserts",
    pins: [
      { id: "A1", quote: "until the artifact exists" },
      { id: "A2", quote: "a docs census asserts" },
    ],
  },
  {
    id: "B",
    label: "no docs/workbench or feature-matrix sentence presents a GP seam as served",
    pins: [
      { id: "B1", quote: "no docs/workbench" },
      { id: "B2", quote: "or feature-matrix" },
      { id: "B3", quote: "sentence" },
      { id: "B4", quote: "presents a GP seam" },
      { id: "B5", quote: "as served" },
    ],
  },
];
const PAGE_TITLE = "03 — High-level architecture, module ownership and dataflow";
const BOUNDARY_HEADING = "GraphPolicyCLI boundary";
const OWNERSHIP_HEADING = "Ownership boundaries";
const LEGEND_HEADING = "## Status legend";
/** A served matrix status: its legend line names landed-gated work. */
const LANDED_WORK = "landed-gated";

// ---------------------------------------------------------------------------------------------------------------- the scanner
const compile = (source: string, flags = ""): RegExp => new RegExp(source, flags);
const NAMES = VOCABULARY.names.map(family => ({ id: family.id, rx: compile(family.source) }));
const SEAM = compile(VOCABULARY.seam);
const SERVED = compile(VOCABULARY.served);
const MARKER = compile(VOCABULARY.marker);
const DESIGN = compile(CONSTANTS.designStatus, "i");
/** NFKC and lower case, the inline markup characters * ` ~ and \ dropped. */
const fold = (text: string): string => text.normalize("NFKC").toLowerCase().replace(/[*`~\\]/g, "");
const namesOf = (folded: string): string[] => NAMES.filter(family => family.rx.test(folded)).map(family => family.id);
/** One sentence naming GP beside a SERVED word: a finding, quiet by a marker, or bare (no seam word and no Pi); else none. */
function classify(sentence: string): { readonly kind: "finding" | "marker" | "bare" | "none"; readonly reason: string } {
  const folded = fold(sentence);
  const names = namesOf(folded);
  const served = SERVED.exec(folded);
  if (names.length === 0 || served === null) return { kind: "none", reason: "" };
  const marker = MARKER.exec(folded);
  if (marker !== null) return { kind: "marker", reason: marker[0] };
  if (!SEAM.test(folded)) return { kind: "bare", reason: served[1] ?? "" };
  return { kind: "finding", reason: `${names.join("+")}: served-${served[1]}` };
}
/** The census verdict on one sentence: null (quiet) or `<names>: served-<word>`. */
function verdict(sentence: string): string | null {
  const reading = classify(sentence);
  return reading.kind === "finding" ? reading.reason : null;
}
const TABLE_ROW = /^\s*\|/;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TERMINATOR = /[.!?;](?=\s|$)/g;
function sentences(text: string): { readonly line: number; readonly text: string }[] {
  const out: { line: number; text: string }[] = [];
  let buffer = "";
  let start = 0;
  const flush = (): void => {
    if (buffer !== "") out.push({ line: start, text: buffer });
    buffer = "";
  };
  const append = (piece: string, line: number): void => {
    const trimmed = piece.trim();
    if (trimmed === "") return;
    if (buffer === "") start = line;
    buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`;
  };
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = index + 1;
    if (raw.trim() === "") {
      flush();
      continue;
    }
    const whole = TABLE_ROW.test(raw) || HEADING.test(raw);
    if (whole || LIST_ITEM.test(raw)) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) {
      const at = (match.index ?? 0) + 1;
      append(raw.slice(from, at), line);
      flush();
      from = at;
    }
    append(raw.slice(from), line);
    if (whole) flush();
  }
  flush();
  return out;
}

// ------------------------------------------------------------------------------------------------------------ the status rows
const cellsOf = (line: string): string[] => {
  const trimmed = line.trim();
  return trimmed
    .slice(trimmed.startsWith("|") ? 1 : 0, trimmed.endsWith("|") ? -1 : undefined)
    .split("|")
    .map(cell => cell.trim());
};
const SEPARATOR = /^\|[\s:|-]+\|?\s*$/;
/** The matrix legend: each "- <status>: <definition>" line under the legend heading, up to the next "## " heading. */
function legendOf(text: string): { readonly status: string; readonly line: string }[] {
  const lines = text.split(/\r?\n/);
  const at = lines.indexOf(LEGEND_HEADING);
  if (at < 0) return [];
  const out: { status: string; line: string }[] = [];
  for (const line of lines.slice(at + 1)) {
    if (line.startsWith("## ")) break;
    const entry = /^- ([a-z-]+): /.exec(line);
    if (entry?.[1] !== undefined) out.push({ status: entry[1], line });
  }
  return out;
}
const servedStatuses = (legend: readonly { readonly status: string; readonly line: string }[]): string[] => legend.filter(entry => entry.line.includes(LANDED_WORK)).map(entry => entry.status);
/** Every body row of every matrix table whose header opens Feature | Status, with its 1-based line. */
function matrixRows(text: string): { readonly line: number; readonly cells: readonly string[] }[] {
  const rows: { line: number; cells: string[] }[] = [];
  let inTable = false;
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    if (!TABLE_ROW.test(line)) {
      inTable = false;
      continue;
    }
    const cells = cellsOf(line);
    if (cells[0] === "Feature" && cells[1] === "Status") {
      inTable = true;
      continue;
    }
    if (inTable && !SEPARATOR.test(line)) rows.push({ line: index + 1, cells });
  }
  return rows;
}
function matrixFindings(path: string, text: string): string[] {
  const legend = legendOf(text);
  const known = legend.map(entry => entry.status);
  const served = servedStatuses(legend);
  return matrixRows(text).flatMap(row => {
    const status = row.cells[1] ?? "";
    if (namesOf(fold(row.cells[0] ?? "")).length === 0) return [];
    return served.includes(status) || !known.includes(status) ? [`${path}:${row.line} matrix-${status}`] : [];
  });
}
function ledgerFindings(path: string, text: string): string[] {
  const claims: readonly string[] = CLAIM_STATUSES;
  return parseLedger(text).rows.flatMap(row => (namesOf(fold(row.cells[2] ?? "")).length > 0 && claims.includes(row.status) ? [`${path}:${row.line} ledger-${row.status}`] : []));
}

// --------------------------------------------------------------------------------------------------------------- the judgment
/** One file's judgment: its findings (sentences, then status rows), the sentences it judged and those naming GP. */
function survey(path: string, text: string): { readonly findings: string[]; readonly sentences: number; readonly named: number } {
  const cut = sentences(text);
  const findings = cut.flatMap(sentence => {
    const found = verdict(sentence.text);
    return found === null ? [] : [`${path}:${sentence.line} ${found}`];
  });
  if (path === CONSTANTS.matrix) findings.push(...matrixFindings(path, text));
  if (path === CONSTANTS.ledger) findings.push(...ledgerFindings(path, text));
  return { findings, sentences: cut.length, named: cut.filter(sentence => namesOf(fold(sentence.text)).length > 0).length };
}
const judgeText = (path: string, text: string): string[] => survey(path, text).findings;
interface Judgment {
  readonly findings: string[];
  readonly read: string[];
  readonly sentences: number;
  readonly named: number;
}
function judgeAll(texts: readonly (readonly [string, string])[]): Judgment {
  const findings: string[] = [];
  const read: string[] = [];
  let judged = 0;
  let named = 0;
  for (const [path, text] of texts) {
    const one = survey(path, text);
    findings.push(...one.findings);
    read.push(path);
    judged += one.sentences;
    named += one.named;
  }
  return { findings, read, sentences: judged, named };
}
function judgeFiles(base: string, paths: readonly string[]): Judgment & { readonly unreadable: string[] } {
  const texts: [string, string][] = [];
  const unreadable: string[] = [];
  for (const path of paths) {
    try {
      texts.push([path, readFileSync(join(base, path), "utf8")]);
    } catch {
      unreadable.push(path);
    }
  }
  return { ...judgeAll(texts), unreadable };
}

// ------------------------------------------------------------------------------------------------------------- the file sets
const PAGE = /^[^/]+\.md$/;
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** Every regular file below the roots and every root .md page; a symlink is reported, never followed. */
function walkTree(base: string): { files: string[]; links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  for (const root of CONSTANTS.roots) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (!PAGE.test(entry.name)) continue;
    if (entry.isSymbolicLink()) links.push(entry.name);
    else if (entry.isFile()) files.push(entry.name);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
/** What git would commit below the roots and as root .md pages: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...CONSTANTS.roots, ":(glob)*.md"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path))))].sort(byName);
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
function trackedTopDirectories(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort(byName);
}
const FLOORS = { docsFiles: 70, workbenchFiles: 65, rootPages: 5, sentences: 11_000, named: 80 } as const;
function floorsMetBy(paths: readonly string[], judged: Pick<Judgment, "sentences" | "named">): boolean {
  return (
    paths.filter(path => path.startsWith("docs/")).length >= FLOORS.docsFiles &&
    paths.filter(path => path.startsWith("docs/workbench/")).length >= FLOORS.workbenchFiles &&
    paths.filter(path => PAGE.test(path)).length >= FLOORS.rootPages &&
    judged.sentences >= FLOORS.sentences &&
    judged.named >= FLOORS.named
  );
}
interface Pass extends Judgment {
  readonly listed: string[];
  readonly unreadable: string[];
}
/** The live guard's pass: every path git lists under `base`, judged at once. */
function liveScan(base: string): Pass {
  const listed = gitList(base);
  return { ...judgeFiles(base, listed), listed };
}
function gateOf(producer: Pick<Producer, "programs" | "codeHits">): Gate {
  return producer.codeHits === 0 && producer.programs.length > 0 && producer.programs.every(program => DESIGN.test(program.text)) ? "ABSENT" : "PRESENT";
}
function guard(gate: Gate, findings: readonly string[]): "pass" | "fail" | "stand-down" {
  return gate === "PRESENT" ? "stand-down" : findings.length === 0 ? "pass" : "fail";
}
/** One `git cat-file --batch` read of many blobs, keyed by object id. */
function readBlobs(ids: readonly string[]): Map<string, string> {
  const out: Buffer = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: Buffer.from(`${ids.join("\n")}\n`), maxBuffer: 1 << 28 });
  const texts = new Map<string, string>();
  let at = 0;
  while (at < out.length) {
    const eol = out.indexOf(0x0a, at);
    const [id, type, size] = out.subarray(at, eol).toString("utf8").split(" ");
    if (id === undefined || type !== "blob" || size === undefined) throw new Error(`unexpected cat-file record at ${at}`);
    const end = eol + 1 + Number(size);
    texts.set(id, out.subarray(eol + 1, end).toString("utf8"));
    at = end + 1;
  }
  return texts;
}

// -------------------------------------------------------------------------------------------------------------- the replicas
const scratches: string[] = [];
afterEach(() => removeScratch(...scratches.splice(0)));
function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return dir;
}
/** A scratch git repository holding `files`, left untracked, so gitList reads it exactly as it reads Pi's tree. */
function gitReplica(prefix: string, files: Readonly<Record<string, string>>): string {
  const dir = scratch(prefix);
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "pipe" });
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  return dir;
}
/** docs/03's Pi-side reading through the landed docs binding: the GraphPolicyCLI ownership row and the boundary section. */
function docs03(): { readonly ownership: readonly string[]; readonly boundary: readonly string[]; readonly opening: string } {
  const page = readFileSync(join(REPO, CONSTANTS.docs03), "utf8");
  const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
  const ownership = tables.grids.flatMap(grid => grid.filter(cells => cells[1] === BOUNDARY_HEADING.split(" ")[0]))[0] ?? [];
  const section = docsSection(page, BOUNDARY_HEADING, 2, [PAGE_TITLE]);
  const boundary = section.blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : block.kind === "list" ? block.items.map(item => item.text) : []));
  const opening = sentences(boundary[0] ?? "")[0]?.text ?? "";
  return { ownership, boundary, opening };
}

// ------------------------------------------------------------------------------------------------------------------- the pins
const PLANT = "The Pi gp seam is served.";
const untie = (text: string): string => text.replace(/ is /, " is not ");
const twinOf = (path: string): string => path.replace(/(\.[^./]+)$/, "-twin$1");
/** A minimal matrix page: the legend and one table holding `rows` (Feature, Status). */
function matrixPage(rows: readonly (readonly [string, string])[]): string {
  const legend = readFileSync(join(REPO, CONSTANTS.matrix), "utf8").split(/\r?\n/);
  const at = legend.indexOf(LEGEND_HEADING);
  const end = legend.findIndex((line, index) => index > at && line.startsWith("## "));
  return [
    "# Matrix plant",
    "",
    ...legend.slice(at, end),
    "## W99: plant",
    "",
    "| Feature | Status | Evidence | Caveats |",
    "| --- | --- | --- | --- |",
    ...rows.map(([feature, status]) => `| ${feature} | ${status} | test/plant.test.ts | none |`),
    "",
  ].join("\n");
}
/** A minimal status-ledger page: the expected header and one row per (Requirement, Status, Implementation evidence). */
function ledgerPage(rows: readonly (readonly [string, string, string?])[]): string {
  return [
    "# Ledger plant",
    "",
    `| ${EXPECTED_HEADER.join(" | ")} |`,
    `|${EXPECTED_HEADER.map(() => " --- |").join("")}`,
    ...rows.map(([requirement, status, evidence = "src/x.ts"], index) => `| WB-${String(index + 1).padStart(3, "0")} | P1 | ${requirement} | ${evidence} | — | — | — | — | — | ${status} |`),
    "",
  ].join("\n");
}
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const producer = ROSTER.producer;
    const hashed = producer.programs.map(program => createHash("sha256").update(program.text).digest("hex") === program.sha256);
    const [first, second] = producer.programs;
    const accepted = (program: ProgramFile | undefined): ProgramFile[] => (program === undefined ? [] : [{ ...program, text: "**2026-11-02, accepted.** Links: none." }]);
    const nearMisses = {
      "first-accepted": gateOf({ ...producer, programs: [...accepted(first), ...(second === undefined ? [] : [second])] }),
      "second-accepted": gateOf({ ...producer, programs: [...(first === undefined ? [] : [first]), ...accepted(second)] }),
      "code-hit": gateOf({ ...producer, codeHits: 1 }),
      "no-programs": gateOf({ ...producer, programs: [] }),
      "status-uppercase": gateOf({ ...producer, programs: producer.programs.map(program => ({ ...program, text: program.text.toUpperCase() })) }),
    };
    const pi = docs03();
    return {
      gate: gateOf(producer),
      recorded: producer.gate,
      hashed,
      statusLines: producer.programs.map(program => `${program.path}:${program.line}`),
      nearMisses,
      piOwnership: pi.ownership.slice(1).map(cell => cell.split("; ")[0] ?? ""),
      piOpening: pi.opening,
      verdict: guard(gateOf(producer), []),
    };
  },
  A2: async () => {
    const gate = gateOf(ROSTER.producer);
    // ONE pass over every listed file and the in-memory positives: it must find exactly what the positives find alone, so a
    // pass that read nothing reds, and it must find nothing else.
    const listed = gitList(REPO);
    const positives: readonly (readonly [string, string])[] = [
      ["docs/workbench/zz-plant.md", `${PLANT}\n`],
      ["README.md.plant", "- The GraphPolicyCLI integration ships in this release.\n"],
      ["docs/zz-plant.md", "Pi hosts the gp decision point; the GraphDataIR exporter seam is registered.\n"],
    ];
    const alone = judgeAll(positives).findings;
    expect(alone.length).toBeGreaterThanOrEqual(positives.length);
    const real = judgeFiles(REPO, listed);
    const pass = judgeAll([...listed.map(path => [path, readFileSync(join(REPO, path), "utf8")] as const), ...positives]);
    expect(pass.findings).toEqual([...real.findings, ...alone]);
    const outside = pass.findings.filter(finding => !alone.includes(finding));
    const coverage = { readAll: JSON.stringify(real.read) === JSON.stringify(listed) && real.unreadable.length === 0, floorsMet: floorsMetBy(real.read, real) };
    // The same guard over a scratch git repository: plants (a sentence, a feature-matrix row, a status-ledger row) and their
    // untied twins; through gitList and judgeFiles it must find the plants, and only them.
    const plants: Record<string, string> = {
      "docs/workbench/plant.md": `${PLANT}\n`,
      "docs/workbench/receipts/wb-plant.md": "# wb-plant: a receipt\n\n- The GraphPolicyCLI client is live.\n",
      "README.md": "The gp adapter is available.\n",
    };
    const files: Record<string, string> = { [CONSTANTS.matrix]: matrixPage([["GraphPolicyCLI decision seam", "landed-gated"]]), [CONSTANTS.ledger]: ledgerPage([["GraphPolicyCLI decision seam", "live-sdk"]]) };
    for (const [path, text] of Object.entries(plants)) {
      files[path] = text;
      files[twinOf(path)] = untie(text);
    }
    const mirror = liveScan(gitReplica("0lf7-live-", files));
    return {
      gate,
      verdict: guard(gate, outside),
      findings: outside,
      positives: alone,
      coverage,
      replica: { read: mirror.read, findings: mirror.findings, verdict: guard("ABSENT", mirror.findings), standDown: guard("PRESENT", mirror.findings) },
    };
  },
  B1: async () => {
    const walked = walkTree(REPO);
    const listed = gitList(REPO);
    const skip = ignored(REPO, walked.files);
    const walkAgreesWithGit = JSON.stringify(walked.files.filter(path => !skip.has(path))) === JSON.stringify(listed);
    const trackedTop = trackedTopDirectories(REPO);
    const unnamedTop = trackedTop.filter(name => !CONSTANTS.roots.includes(name) && !CONSTANTS.outside.includes(name));
    const workbenchTracked = execFileSync("git", ["ls-files", "-z", "--cached", "--", "docs/workbench"], { cwd: REPO, encoding: "utf8" }).split("\0").filter(path => path !== "");
    // The frozen pass: the immutable tree at the cut's base, read from git objects, judged in one pass - exact counts, no
    // finding, and every sentence that names GP beside a served or Pi-side word, with the reason it is quiet.
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
    const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", CONSTANTS.frozenAt], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
    const entries = listing
      .split("\0")
      .filter(line => line !== "")
      .map(line => {
        const [meta = "", path = ""] = line.split("\t");
        const [mode = "", type = "", id = ""] = meta.split(" ");
        return { mode, type, id, path };
      })
      .filter(entry => entry.type === "blob" && entry.mode !== "120000" && (CONSTANTS.roots.some(root => entry.path.startsWith(`${root}/`)) || PAGE.test(entry.path)));
    const texts = readBlobs([...new Set(entries.map(entry => entry.id))]);
    const frozen = judgeAll(entries.map(entry => [entry.path, texts.get(entry.id) ?? ""] as const));
    const quieted = entries.flatMap(entry =>
      sentences(texts.get(entry.id) ?? "").flatMap(sentence => {
        const reading = classify(sentence.text);
        return reading.kind === "marker" || reading.kind === "bare" ? [`${entry.path}:${sentence.line} ${reading.kind}:${reading.reason}`] : [];
      }),
    );
    // R-OUTSIDE-ROOTS quiet row: a replica plants the same claim in docs/, in every outside directory and in two root files
    // that are not .md pages; the walk reads docs/ only, while each other plant is a finding when it is read.
    const replica = scratch("0lf7-outside-");
    for (const directory of ["docs", ...CONSTANTS.outside]) {
      mkdirSync(join(replica, directory), { recursive: true });
      writeFileSync(join(replica, directory, "plant.md"), `${PLANT}\n`);
    }
    for (const name of ["PLANT.txt", "plant.json"]) writeFileSync(join(replica, name), `${PLANT}\n`);
    const replicaWalk = walkTree(replica);
    const outsideWhenRead = judgeFiles(replica, [...CONSTANTS.outside.map(directory => `${directory}/plant.md`), "PLANT.txt", "plant.json"]).findings.length;
    return {
      roots: CONSTANTS.roots.map(root => existsSync(join(REPO, root))),
      walkAgreesWithGit,
      links: walked.links,
      unnamedTop,
      workbenchRead: workbenchTracked.every(path => listed.includes(path)),
      workbenchFloorMet: workbenchTracked.length >= FLOORS.workbenchFiles,
      matrixAndLedgerListed: [CONSTANTS.matrix, CONSTANTS.ledger].map(path => listed.includes(path)),
      frozen: { revision: CONSTANTS.frozenAt, ancestor, files: frozen.read.length, sentences: frozen.sentences, named: frozen.named, findings: frozen.findings, quieted },
      outsideQuiet: judgeFiles(replica, replicaWalk.files).findings,
      outsideWhenRead,
    };
  },
  B2: async () => {
    const matrix = readFileSync(join(REPO, CONSTANTS.matrix), "utf8");
    const legend = legendOf(matrix);
    const rows = matrixRows(matrix);
    const ledger = parseLedger(readFileSync(join(REPO, CONSTANTS.ledger), "utf8"));
    const statuses = ["landed-gated", "partial", "in-progress", "planned", "not-started", "landed-gated (see caveats)", "shipped"];
    const matrixPlants = matrixFindings(CONSTANTS.matrix, matrixPage(statuses.map(status => ["GraphPolicyCLI decision seam", status])));
    const matrixOtherFeature = matrixFindings(CONSTANTS.matrix, matrixPage([["Bounded decision evaluator", "landed-gated"]]));
    const allowed = ["shipped", "experimental", "planned", "blocked", "fixture", "gate-pass", "live-sdk", "source-retained"];
    const ledgerPlants = ledgerFindings(CONSTANTS.ledger, ledgerPage(allowed.map(status => ["The gp seam admits a GraphPolicyCLI reply", status])));
    const ledgerOtherRequirement = ledgerFindings(CONSTANTS.ledger, ledgerPage([["A bounded decision evaluator", "live-sdk"]]));
    // The status rows are read only at the two named paths: the same plants under another path are sentences only.
    const elsewhere = judgeText("docs/workbench/other.md", matrixPage([["GraphPolicyCLI decision seam", "landed-gated"]]));
    const quiet = {
      "R-STATUS-OTHER-CELL": judgeText(CONSTANTS.matrix, matrixPage([["Bounded decision evaluator", "landed-gated"]]).replace("test/plant.test.ts | none", "src/x.ts holds the gp seam | not measured live")),
      "R-OTHER-TABLES": judgeText("docs/workbench/other.md", "| Feature | Status | Caveats |\n| --- | --- | --- |\n| gp seam | shipped | not measured live |\n"),
    };
    // The status-ledger half of R-STATUS-OTHER-CELL: a GP name only in the evidence cell leaves the status unread structurally.
    const ledgerEvidenceOnly = ledgerFindings(CONSTANTS.ledger, ledgerPage([["A bounded decision evaluator", "shipped", "src/workbench/graph-policy-adapter.ts"]]));
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B2").map(residual => residual.id));
    return {
      legend: legend.map(entry => entry.status),
      served: servedStatuses(legend),
      matrix: { tablesFloorMet: matrix.split(/\r?\n/).filter(line => /^\| Feature \| Status \|/.test(line)).length >= 20, rowsFloorMet: rows.length >= 75, findings: matrixFindings(CONSTANTS.matrix, matrix) },
      ledger: { header: JSON.stringify(ledger.header) === JSON.stringify(EXPECTED_HEADER), rows: ledger.rows.length, claimStatuses: [...CLAIM_STATUSES], findings: ledgerFindings(CONSTANTS.ledger, readFileSync(join(REPO, CONSTANTS.ledger), "utf8")) },
      matrixPlants,
      matrixOtherFeature,
      ledgerPlants,
      ledgerOtherRequirement,
      ledgerEvidenceOnly,
      elsewhere,
      quiet,
    };
  },
  B3: async () => {
    const cuts = [
      sentences("Intro line. The Pi gp seam is served; no other row changed."),
      sentences("The Pi gp seam\nis served."),
      sentences("| gp seam | served |\n| x | y |"),
      sentences("The gp seam\n- is served"),
      sentences("The gp seam\n\nis served."),
      sentences("# The gp seam\nis served."),
      sentences("The gp seam is served!Next line"),
      sentences("Version 0.1.0 of the gp seam is served."),
      sentences("The gp seam is served?\r\nYes."),
    ].map(cut => cut.map(sentence => `${sentence.line}:${sentence.text}`));
    const judged = [
      judgeText("docs/x.md", "Intro line.\n\nThe Pi gp seam is served; no other row changed."),
      judgeText("docs/x.md", "The Pi gp seam\nis served."),
      judgeText("docs/x.md", "| Feature | Status |\n| --- | --- |\n| gp seam | served |\n| gp seam | not served |"),
      judgeText("docs/x.md", "The gp seam\n- is served"),
      judgeText("docs/x.md", "The gp seam\n\nis served."),
      judgeText("docs/x.md", "# The gp seam\nis served."),
    ];
    return { cuts, judged };
  },
  B4: async () => {
    const spellings = [
      "The GraphPolicyCLI seam is served.",
      "The graph-policy-cli seam is served.",
      "The graph_policy seam is served.",
      "The graph.policy seam is served.",
      "The Graph Policy seam is served.",
      "The graphpolicy seam is served.",
      "The gp seam is served.",
      "The GP seam is served.",
      "The gp.exe seam is served.",
      "The `gp rpc --stdio` seam is served.",
      "GP_CLI_UNKNOWN_COMMAND reaches the seam, which is served.",
      "The GraphDataIR exporter seam is served.",
      "The GraphFunctionIR seam is served.",
      "The graph-data-ir seam is served.",
      "The \uff27\uff30 seam is served.",
    ];
    const subjects = ["seam", "seams", "integration", "capability", "capabilities", "host", "client", "adapter", "provider", "consumer", "gp-adjacent module", "decision point", "decision path", "executor", "canary", "advisory", "adoption"].map(word => verdict(`The GraphPolicyCLI ${word} is served.`));
    const notSubjects = ["module", "census", "test", "receipt", "worker", "binary"].map(word => classify(`The GraphPolicyCLI ${word} is served.`).kind);
    const pi = [verdict("Pi serves gp decisions."), verdict("Pi's GraphPolicyCLI reading is live."), verdict("pi-subagents ships GraphDataIR exports.")];
    const nearMisses = ["gpu", "gpt", "gpg", "gp2", "graph policies", "graphical policy", "graph-data"].map(word => verdict(`The ${word} seam is served.`));
    const quiet = {
      "R-BARE-NAME": [
        verdict("GraphPolicyCLI ships the npm package graph-policy-cli, and its Python mirror is graphpolicy), or a package named gp;"),
        verdict("GraphPolicyCLI is served."),
        verdict("The installed gp is available on PATH."),
      ],
      "R-SPLIT": [judgeText("docs/x.md", "We added a gp seam. It is served."), judgeText("docs/x.md", "Status: served. Subject: the gp seam.")],
      "R-LOOKALIKE": [verdict(`The g${String.fromCodePoint(0x0440)} seam is served.`), verdict(`The g${String.fromCodePoint(0x200b)}p seam is served.`), verdict(`The Graph${String.fromCodePoint(0x2010)}Policy seam is served.`)],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B4").map(residual => residual.id));
    // The real R-BARE-NAME member: the landed wb-1xvp.3 receipt states it at line 13, and it reads bare.
    const receipt = readFileSync(join(REPO, "docs/workbench/receipts/wb-1xvp.3.md"), "utf8");
    const bareLine = sentences(receipt).find(sentence => sentence.text.startsWith("GraphPolicyCLI ships the npm package"));
    return { spellings: spellings.map(verdict), subjects, notSubjects, pi, nearMisses, quiet, realBare: bareLine === undefined ? null : `${bareLine.line} ${classify(bareLine.text).kind}` };
  },
  B5: async () => {
    const served = [
      "serve",
      "serves",
      "served",
      "serving",
      "ship",
      "ships",
      "shipped",
      "shipping",
      "integrates",
      "integrated",
      "wires",
      "wired",
      "adopts",
      "adopted",
      "hosts",
      "hosted",
      "registers",
      "registered",
      "enables",
      "enabled",
      "exposes",
      "exposed",
      "invokes",
      "live",
      "live-sdk",
      "available",
      "supported",
      "supports",
      "implemented",
      "landed",
      "landed-gated",
      "gate-pass",
      "released",
      "deployed",
      "operational",
    ].map(word => verdict(`The gp seam: ${word}.`));
    // A served word needs a seam word or Pi: the same words beside GraphPolicyCLI alone read bare, beside Pi they are findings.
    const bare = ["integrated", "registered", "ships", "serves"].map(word => classify(`GraphPolicyCLI ${word} its package.`).kind);
    const pi = ["integrated", "registered", "ships", "serves"].map(word => verdict(`Pi ${word} GraphPolicyCLI.`));
    const forms = ["The gp seam is **served**.", "The gp seam is `served`.", "The gp seam is ser**ved**.", "The gp seam is SERVED.", "<!-- The gp seam is served. -->", "The gp seam is \u201cserved\u201d."].map(verdict);
    const markers = [
      "not",
      "no",
      "never",
      "nor",
      "without",
      "until",
      "unless",
      "pending",
      "absent",
      "unshipped",
      "unserved",
      "unimplemented",
      "unregistered",
      "gated",
      "before",
      "if",
      "when",
      "once",
      "whether",
      "future",
      "planned",
      "proposed",
      "design-only",
      "none",
      "nothing",
      "cannot",
      "will",
      "would",
      "could",
      "might",
      "may",
      "shall",
      "should",
      "must",
      "isn't",
      "isn\u2019t",
    ].map(word => verdict(`The gp seam ${word} served.`));
    const notMarkers = ["experimental", "fixture", "synthetic", "only", "today"].map(word => verdict(`The gp seam is served (${word}).`));
    // Hyphen- and underscore-bounded words: a status word carrying a marker is no marker, an identifier is one word.
    const bounded = [
      verdict("The gp seam is landed-gated."),
      verdict("The gp seam reads not_found and is served."),
      verdict("The gp seam is not-started and the gp client is served."),
      classify("The gp seam counts beads_calls.").kind,
      classify("The gp seam reads served_count and is_live.").kind,
      classify("GP_CLI_UNKNOWN_COMMAND is served by the gp client.").kind,
    ];
    const quiet = {
      "R-MARKER-ANYWHERE": verdict("The gp seam is served and no rollback is planned."),
      "R-PARAPHRASE": [...["up", "ready", "in place", "working", "running"].map(word => verdict(`The gp seam is ${word}.`)), verdict("Pi calls gp in its decision loop."), verdict("The gp seam runs."), verdict("Pi uses the gp seam.")],
      "R-RENDERED-TEXT": [verdict("The gp seam is serv&#101;d."), verdict("The gp seam is ser<b>ved</b>."), verdict("The gp seam is _served_.")],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B5").map(residual => residual.id));
    return { served, bare, pi, forms, markers, notMarkers, bounded, quiet };
  },
};

function beadRow(): { readonly title: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string" && "title" in value && typeof value.title === "string") return { title: value.title, notes: value.notes };
  }
  throw new Error("bead export lacks the owner filing");
}
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(body.slice(at));
}

describe("wb-0lf.7 GP seam served-claim census (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R14, until the artifact exists)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and title, docs/03, the status ledger and the matrix legend", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:5"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    // The acceptance, cut into its clauses: clause (1) is the two labels joined, each tiled by its pins; (2) and (3) are unclaimed.
    const { title, notes } = beadRow();
    const acceptance = /Acceptance: (.*?)\. Tracked gate/.exec(notes)?.[1] ?? "";
    const clauses = acceptance.split("; ");
    expect(clauses.length).toBe(3);
    expect(clauses[0]).toBe(ROWS.map(row => row.label).join(" "));
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote)))).toEqual(ROWS.map(() => true));
    expect(clauses.slice(1)).toEqual(ROSTER.unclaimed.map(entry => entry.clause));
    expect(ROSTER.unclaimed.every(entry => entry.reason.length > 0)).toBe(true);
    // The title's subject list and claim: each listed GP thing but the presenting docs is a seam word, docs is a root, the claim is served.
    const subject = /Pi adds no GP (.+?) presenting GP as (\S+) until /.exec(title);
    const things = (subject?.[1] ?? "").split(/, | or /);
    const presenting = things[things.length - 1] ?? "";
    expect(things.length).toBeGreaterThanOrEqual(3);
    expect(things.slice(0, -1).map(word => verdict(`The gp ${word} is ${subject?.[2] ?? ""}.`))).toEqual(things.slice(0, -1).map(() => `N2: served-${subject?.[2] ?? ""}`));
    expect(CONSTANTS.roots.includes(presenting)).toBe(true);
    const canary = /adoption is an opt-in (\S+) labelled .+?, never (\S+) on hermetic evidence/.exec(title);
    expect(verdict(`The gp ${canary?.[1] ?? ""} is ${canary?.[2] ?? ""}.`)).toBe(`N2: served-${canary?.[2] ?? ""}`);
    // Clause (1)'s own words: its seam noun and claim read as a seam and a served word, its gating word is a marker.
    const own = /presents a GP (\S+) as (\S+)$/.exec(clauses[0] ?? "");
    expect(verdict(`The gp ${own?.[1] ?? ""} is ${own?.[2] ?? ""}.`)).toBe(`N2: served-${own?.[2] ?? ""}`);
    const gating = (clauses[0] ?? "").split(" ")[0] ?? "";
    expect(MARKER.test(fold(gating))).toBe(true);
    const liveStatus = /may move a row to (\S+)$/.exec(clauses[1] ?? "")?.[1] ?? "";
    expect(verdict(`The gp seam is ${liveStatus}.`)).toBe(`N2: served-${liveStatus}`);
    // The producer facts: the filing's quoted status phrases sit inside the recorded status lines; its pin is the bead pin.
    const quoted = /\(README\.md:3 '([^']+)'; decisions:3 '([^']+)'\)/.exec(notes);
    expect([quoted?.[1], quoted?.[2]].map((phrase, index) => phrase !== undefined && (ROSTER.producer.programs[index]?.text ?? "").includes(phrase))).toEqual([true, true]);
    const pinned = /design-only at Furnace ([0-9a-f]{12})\)/.exec(title)?.[1] ?? "";
    expect(pinned.length).toBe(12);
    expect(ROSTER.producer.beadPin.startsWith(pinned)).toBe(true);
    expect(ROSTER.producer.gate).toBe(gateOf(ROSTER.producer));
    // docs/03's boundary section: every Graph-prefixed CamelCase word, every -cli package and the parenthesised short name are
    // NAMES; every term its definition sentence defines is a seam subject.
    const boundary = docs03().boundary.join("\n");
    const spelled = [...new Set([...boundary.matchAll(/\bGraph[A-Z][A-Za-z]+\b/g), ...boundary.matchAll(/\b[a-z]+(?:-[a-z]+)*-cli\b/g)].map(match => match[0]))].sort(byName);
    const short = /\(([a-z]+)\) integration today/.exec(boundary)?.[1] ?? "";
    expect(spelled.length).toBeGreaterThanOrEqual(3);
    expect([...spelled, short].map(word => namesOf(fold(word)).length > 0)).toEqual([...spelled, short].map(() => true));
    const defined = [...boundary.matchAll(/(?:^|; |\. )an? ((?:gp[- ][a-z]+|[a-z]+) [a-z]+) is an? /gim)].map(match => match[1] ?? "");
    expect(defined.length).toBeGreaterThanOrEqual(4);
    expect(defined.map(term => SEAM.test(fold(term)))).toEqual(defined.map(() => true));
    // The status ledger's claim statuses are served words; the matrix legend yields the served matrix statuses.
    expect(CLAIM_STATUSES.map(status => verdict(`The gp seam is ${status}.`))).toEqual(CLAIM_STATUSES.map(status => `N2: served-${status}`));
    const legend = legendOf(readFileSync(join(REPO, CONSTANTS.matrix), "utf8"));
    expect(servedStatuses(legend).length).toBeGreaterThan(0);
    expect(servedStatuses(legend).every(status => legend.some(entry => entry.status === status))).toBe(true);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-STATUS-OTHER-CELL", "R-OTHER-TABLES", "R-BARE-NAME", "R-SPLIT", "R-LOOKALIKE", "R-MARKER-ANYWHERE", "R-PARAPHRASE", "R-RENDERED-TEXT"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
