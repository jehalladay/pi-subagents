/**
 * wb-km7q.6 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R17, program-triage-2026-10-18 child of wb-km7q), the
 * adoption-time falsifier of a gating carrier. Statement (the bead title): "If Pi ever adopts rf TSX ActivityBoundary
 * (ACTIVE/WARM/DORMANT/EVICTED; gated TSX-RQ7), a WARM context precomputes only explicitly eligible read-only resources under
 * the existing SpeculationBoundary and never calls inference or effects; ActivityBoundary state stays separate from QueryView
 * identity and speculative execution ownership; DevTools only consumes emitted host events."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C joined by a comma and a space are this clause word for
 * word, read from the tracked bead export): "adoption-time falsifier that a WARM precompute attempting inference or an effect
 * is refused, that boundary state never aliases QueryView identity or speculative execution ownership, and that DevTools-style
 * surfaces stay read-only consumers".
 * CLAIMED: that clause exactly. NOT CLAIMED (ROSTER.unclaimed, each held to the title): the title's eligibility half ("a WARM
 * context precomputes only explicitly eligible read-only resources under the existing SpeculationBoundary") binds once Pi
 * declares a precompute set, and none exists (A1 reads the adoption ABSENT); "gated TSX-RQ7" is a test the charter asks the
 * producer to add, recorded in the producer facts and never judged here. The filing's "May fold with R14/R16" is not taken:
 * R14 is wb-km7q.5, its own bead and cut, and R16 has no Pi bead.
 *
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat on 2026-10-28 in the local
 * ReactiveFiberTSXSDK checkout with git show; this census is hermetic and never re-reads it): the charter
 * docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (01970950) at the bead pin
 * e7e6616d3d08 and at origin/main 94ae52c14aef of the local checkout (the pin is an ancestor of that tip). The roster vendors
 * its line 3 (the status line: "proposed extensions; none of the new exports claimed shipped") and line 66 (the amendment
 * paragraph the filing cites: the separation sentence, the WARM sentence, the TSX-RQ1..TSX-RQ7 test list and "DevTools only
 * consumes emitted host events."), each with its sha256 (UTF-8, no line end). At that tip the package is @reactive-fiber/tsx
 * 0.1.668, its export map names six entry points and none of its 159 src files names the subject; the producer's own triage
 * (docs/triage/programs-2026-10-21/requirements/ATOMIC-REQUIREMENTS.md:87, blob df7eec14, vendored with its sha256) requires
 * that ActivityBoundary and SpeculationBoundary be "marked PROPOSED (0 files at db7558552)" and names the host as the
 * lifecycle owner. producerOf reads UNSHIPPED unless all three flip (the status line stops reading proposed, the tip's src
 * names the subject, the triage line stops reading PROPOSED): it fails closed.
 * ADOPTION (row A): Pi adopts the boundary when a file Pi ships names it. The adoption reads PRESENT once a read file (below)
 * names the subject, ABSENT otherwise; a package.json dependency on a reactive-fiber package is recorded beside it (none
 * today: the boundary could reach Pi only through rf, a child process). The falsifier never stands down: every file that
 * names the subject is judged by rows A-C at every run, so the first adoption is judged the day it lands; today's live
 * reading is the empty adoption (no file to judge), held beside a scratch-repository adoption whose violations it finds
 * exactly.
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the
 *   runs of a-z and 0-9 (ActivityBoundary reads activity boundary; queryView reads query view; DevTools reads dev tools;
 *   snake_case and kebab-case split at their separators).
 * - THE SUBJECT: the adjacent pair activity boundary (or boundaries), or the folded word activityboundary(ies).
 * - THE READ SET: every file git would commit (tracked or untracked, never ignored) at the repository root or below .agents/,
 *   .pi/, docs/, examples/, qa/ and src/, read as text (a file holding a NUL byte is binary and not read). A file is ANCHORED
 *   when it names the subject anywhere; only an anchored file is judged (R-UNANCHORED keeps Pi's own senses of warm, state and
 *   inspector out of it).
 * - SENTENCES: a text cut after ".", "!", "?" or ";" before white space or the line end, and at a blank line; a .md page is
 *   also cut around a table row and a heading line and before a list item (a sentence wrapped over lines stays one). Code is
 *   read by the same cut, so a statement and the branch it opens read as one sentence up to their first terminator.
 * - ROWS' READERS (each on one sentence of an anchored file; a finding is `<path>:<line> <row>:<families>`):
 *   A: the WARM word beside an inference word (inference, infer and their inflections) or an effect word (effect, effects,
 *      effectful), with no refusal marker (not, no, never, nor, neither, without, cannot, the refuse and reject forms, or the
 *      n't contraction): a WARM precompute that attempts inference or an effect, as Pi's text states it.
 *   B: a state word (state, states, active, warm, dormant, evicted) or the subject beside a QueryView word (the pair query
 *      view(s), queryview(s)) or a speculative-execution-ownership pair (speculative execution(s), execution owner(ship),
 *      speculation owner(ship)), with no separation marker (not, no, never, nor, neither, without, cannot, separate,
 *      separately, separated, distinct, independent, independently, apart, n't): boundary state aliased to either identity.
 *   C: a DevTools-style surface word (devtools, the pair dev tools, inspector, inspectors) beside a driving word (the mutate,
 *      command, control, write, dispatch, drive and transition families), with no read-only marker (not, no, never, nor,
 *      neither, without, cannot, the pair read only, n't): a surface that does more than consume.
 *   A modal (should, must, shall, will), an if/when condition or "only" alone is never a marker: "a WARM context only calls
 *   inference" is a finding.
 * - THE HOUSE ANALOG (row C, C2): Pi's DevTools-style surfaces are the src modules whose path names a surface word; today
 *   exactly src/ui/workflow-inspector.ts, whose header reads "Read-only terminal inspector over the bounded
 *   producer-qualified observation projection." Each surface's VALUE import closure (static imports and re-exports that are
 *   not type-only, import-equals requires, require() and import() of a string literal; relative specifiers followed to their
 *   .ts source, packages recorded and not followed) must hold no node builtin and no unresolved relative module: a surface that
 *   can launch, write or open a socket of its own is no longer a consumer of what the host hands it.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "adoption-time falsifier that a WARM precompute attempting inference or an effect is refused": A1 the adoption gate - the
 *    producer facts read UNSHIPPED, the live read set (floors per root) reads ABSENT with no finding, no unreadable file and
 *    no reactive-fiber dependency, ONE pass over the live set and in-memory positives finds exactly the positives,
 *    and the same pass over a scratch git repository holding an adoption finds exactly its plants (one per row and root,
 *    untracked files read, ignored files and test/ never); A2 the WARM-inference reader; A3 the WARM-effect reader, each over
 *    doc and code sentences with near misses.
 *  B "that boundary state never aliases QueryView identity or speculative execution ownership": B1 the QueryView reader; B2 the
 *    speculative-execution-ownership reader, each with its separation markers and near misses.
 *  C "and that DevTools-style surfaces stay read-only consumers": C1 the surface reader; C2 the house analog - the surface set,
 *    each surface's closure read pure, its direct value imports and packages, and the closure reader's controls over a
 *    scratch git repository (a builtin three modules deep, type-only, dynamic, require, re-export, unresolved).
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-km7q.6 in the tracked bead export (.beads/issues.jsonl;
 *   the first notes line opening with its citation, so appended notes never move it): its acceptance clause is the three
 *   labels joined, each label tiled by its pins; label A reads quiet only by "refused" and, without it, as a finding of
 *   exactly inference and effect; label B quiet only by "never" and, without it, a finding of exactly query-view and
 *   execution; the title's WARM clause is quiet only by "never", its state clause only by "separate", and its DevTools clause
 *   names the surface and no driving word; docs/10's controls sentence ("Mutating commands on separate explicit controls
 *   require confirmation and per-provider authorization.") read after label C's surface is a C finding, quiet once label C's
 *   read-only is kept; the inspector's header and docs/10's read-only sentence are present as recorded. ROLE PLACES: every
 *   subject, state, surface, family and marker word that the title, the filing line, docs/10 or the producer's lines spell at
 *   a fixed place reads in its role, and two readings no literal of this file sets hold beside it: no word at a role place
 *   reads without a role, and every lexicon (the subject, the row subjects, each family, each row's markers) keeps a member
 *   an outside text spells. The filing's citations name only recorded producer lines at the recorded pin. So a row, a pin or
 *   a vocabulary word removed from every literal of this file and of the roster together still reds, except the census-only
 *   words and pairs R-SYNONYM lists.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer
 *   facts, the unclaimed duties, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/tsx-activity-boundary-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row held beside its unsilenced twin, which reads as a finding):
 *   R-OUTSIDE-ROOTS (A1) a claim under test/, .beads/, .codex/, .github/, media/, new-feedback/ or vendor/, in an ignored file
 *   or in a binary file (a NUL byte), is never read; R-UNANCHORED (A2) a file that never names the subject is never judged (Pi's
 *   own senses of the words); R-SPLIT (A2) the WARM word and the family in different sentences (a pronoun: "It calls
 *   inference."); R-MARKER-ANYWHERE (A3) a marker anywhere in the sentence quiets it, whatever it qualifies (a code comment and
 *   the statement after it read as one sentence); R-PARAPHRASE (A3) inference or an effect named outside the families (the
 *   model, a completion, a side job); R-COMPOSED (B1) a word split into literal parts ("Que" + "ryView"); R-LOOKALIKE (B1) a
 *   look-alike letter or an inserted invisible inside a word (NFKC folds the fullwidth forms, which are read); R-SYNONYM (B2) a
 *   vocabulary word or adjacent pair no outside text spells (the inflections, the extra markers, the census's own driving stems)
 *   is held by this file and the roster alone - removed from both together it stays green; B2 lists them; R-SURFACE-OTHER (C1) a
 *   surface under another name (a panel, a viewer, a dashboard); R-UNNAMED-SURFACE (C2) a module whose path names no surface
 *   word is not a surface, whatever it renders; R-PACKAGE (C2) IO reached through a package's own code (packages are recorded,
 *   never followed); R-INJECTED (C2) a writing function the host hands a surface (a callback, the evidence store's read side);
 *   R-COMPUTED-LOAD (C2) a module loaded by a computed specifier, a createRequire loader or a global.
 *
 * Display paths added: none. Test-only: the replica trees live in makeScratch scratch with the leak guard installed; Pi's
 * files, the bead export and docs/10 are only read; nothing is spawned but git.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { isBuiltin } from "node:module";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type RowId = "A" | "B" | "C";
type FamilyId = "inference" | "effect" | "query-view" | "execution" | "driving";
type Adoption = "PRESENT" | "ABSENT";
type ProducerReading = "SHIPPED" | "UNSHIPPED";
type Pair = readonly [string, string];
interface Lexicon {
  readonly words: readonly string[];
  readonly pairs: readonly Pair[];
}
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: RowId;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Vocabulary {
  readonly subject: Lexicon;
  readonly warm: Lexicon;
  readonly state: Lexicon;
  readonly surface: Lexicon;
  readonly families: Readonly<Record<FamilyId, Lexicon>>;
  readonly markers: Readonly<Record<RowId, Lexicon>>;
  readonly rows: Readonly<Record<RowId, readonly FamilyId[]>>;
  readonly dependency: Pair;
}
interface Constants {
  readonly readRoots: readonly string[];
  readonly outside: readonly string[];
  readonly filing: string;
  readonly docs10: string;
  readonly docs10ReadOnly: string;
  readonly docs10Controls: string;
  readonly inspector: string;
  readonly inspectorHeader: string;
}
interface ProducerLine {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Producer {
  readonly repository: string;
  readonly path: string;
  readonly beadPin: string;
  readonly blob: string;
  readonly measuredAt: string;
  readonly lines: readonly ProducerLine[];
  readonly tip: {
    readonly ref: string;
    readonly commit: string;
    readonly blob: string;
    readonly package: string;
    readonly version: string;
    readonly exports: readonly string[];
    readonly srcFiles: number;
    readonly subjectSrcFiles: number;
    readonly triage: ProducerLine & { readonly path: string; readonly blob: string };
  };
  readonly reading: ProducerReading;
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: RowId; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly unclaimed: readonly { readonly duty: string; readonly reason: string }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/tsx-activity-boundary-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.6";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  readRoots: [".agents", ".pi", "docs", "examples", "qa", "src"],
  outside: [".beads", ".codex", ".github", "media", "new-feedback", "test", "vendor"],
  filing: "Citation: docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md:66@",
  docs10: "docs/workbench/10-terminal-inspector.md",
  docs10ReadOnly: "A read-only rich inspector now offers overview, observed-reference graph, source-interval timeline and evidence/details.",
  docs10Controls: "Mutating commands on separate explicit controls require confirmation and per-provider authorization.",
  inspector: "src/ui/workflow-inspector.ts",
  inspectorHeader: "Read-only terminal inspector over the bounded producer-qualified observation projection.",
};
const VOCABULARY: Vocabulary = {
  subject: {
    words: ["activityboundary", "activityboundaries"],
    pairs: [
      ["activity", "boundary"],
      ["activity", "boundaries"],
    ],
  },
  warm: { words: ["warm"], pairs: [] },
  state: { words: ["state", "states", "active", "warm", "dormant", "evicted"], pairs: [] },
  surface: { words: ["devtools", "inspector", "inspectors"], pairs: [["dev", "tools"]] },
  families: {
    inference: { words: ["inference", "inferences", "infer", "infers", "inferred", "inferring"], pairs: [] },
    effect: { words: ["effect", "effects", "effectful"], pairs: [] },
    "query-view": {
      words: ["queryview", "queryviews"],
      pairs: [
        ["query", "view"],
        ["query", "views"],
      ],
    },
    execution: {
      words: [],
      pairs: [
        ["speculative", "execution"],
        ["speculative", "executions"],
        ["execution", "owner"],
        ["execution", "ownership"],
        ["speculation", "owner"],
        ["speculation", "ownership"],
      ],
    },
    driving: {
      words: ["mutate", "mutates", "mutated", "mutating", "mutation", "mutations", "command", "commands", "commanded", "commanding", "control", "controls", "controlled", "controlling", "write", "writes", "writing", "wrote", "written", "dispatch", "dispatches", "dispatched", "dispatching", "drive", "drives", "driving", "drove", "driven", "transition", "transitions", "transitioned", "transitioning"],
      pairs: [],
    },
  },
  markers: {
    A: { words: ["not", "no", "never", "nor", "neither", "without", "cannot", "refuse", "refuses", "refused", "refusing", "refusal", "reject", "rejects", "rejected", "rejecting"], pairs: [] },
    B: { words: ["not", "no", "never", "nor", "neither", "without", "cannot", "separate", "separately", "separated", "distinct", "independent", "independently", "apart"], pairs: [] },
    C: { words: ["not", "no", "never", "nor", "neither", "without", "cannot"], pairs: [["read", "only"]] },
  },
  rows: { A: ["inference", "effect"], B: ["query-view", "execution"], C: ["driving"] },
  dependency: ["reactive", "fiber"],
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "adoption-time falsifier that a WARM precompute attempting inference or an effect is refused",
    pins: [
      { id: "A1", quote: "adoption-time falsifier" },
      { id: "A2", quote: "that a WARM precompute attempting inference" },
      { id: "A3", quote: "or an effect is refused" },
    ],
  },
  {
    id: "B",
    label: "that boundary state never aliases QueryView identity or speculative execution ownership",
    pins: [
      { id: "B1", quote: "that boundary state never aliases QueryView identity" },
      { id: "B2", quote: "or speculative execution ownership" },
    ],
  },
  {
    id: "C",
    label: "and that DevTools-style surfaces stay read-only consumers",
    pins: [
      { id: "C1", quote: "and that DevTools-style surfaces" },
      { id: "C2", quote: "stay read-only consumers" },
    ],
  },
];
/** The live read set's floors: a listing that reads fewer files than these has stopped reading Pi's tree. */
const FLOORS = { files: 270, root: 25, src: 105, docs: 70, qa: 60, examples: 5 } as const;

// ---------------------------------------------------------------------------------------------------------------- the reader
const ROW_IDS: readonly RowId[] = ["A", "B", "C"];
const FAMILY_IDS: readonly FamilyId[] = ["inference", "effect", "query-view", "execution", "driving"];
const CONTRACTION = /n['’]t(?![a-z0-9])/;
const fold = (text: string): string => text.normalize("NFKC").toLowerCase();
/** The words of a text: NFKC, a break at each case change and before the last capital of an acronym run, lower case. */
function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
const hasPair = (tokens: readonly string[], pairs: readonly Pair[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
const names = (tokens: readonly string[], lexicon: Lexicon): boolean => tokens.some(word => lexicon.words.includes(word)) || hasPair(tokens, lexicon.pairs);
/** Each row's subject: A the WARM word; B a state word or the boundary itself; C a DevTools-style surface. */
const SUBJECT_OF: Readonly<Record<RowId, (tokens: readonly string[]) => boolean>> = {
  A: tokens => names(tokens, VOCABULARY.warm),
  B: tokens => names(tokens, VOCABULARY.state) || names(tokens, VOCABULARY.subject),
  C: tokens => names(tokens, VOCABULARY.surface),
};
interface Reading {
  readonly kind: "finding" | "marker" | "none";
  readonly reason: string;
}
function markerOf(row: RowId, text: string, tokens: readonly string[]): string | undefined {
  const lexicon = VOCABULARY.markers[row];
  const word = tokens.find(token => lexicon.words.includes(token));
  if (word !== undefined) return word;
  const pair = lexicon.pairs.find(candidate => hasPair(tokens, [candidate]));
  if (pair !== undefined) return pair.join(" ");
  return CONTRACTION.test(fold(text)) ? "n't" : undefined;
}
/** One row on one sentence: none (no family word or no subject), quiet by its marker, or a finding naming its families. */
function readRow(row: RowId, text: string): Reading {
  const tokens = words(text);
  const families = VOCABULARY.rows[row].filter(id => names(tokens, VOCABULARY.families[id]));
  if (families.length === 0 || !SUBJECT_OF[row](tokens)) return { kind: "none", reason: "" };
  const marker = markerOf(row, text, tokens);
  return marker === undefined ? { kind: "finding", reason: families.join("+") } : { kind: "marker", reason: marker };
}
/** The census verdict on one sentence: null (quiet) or every row's finding `<row>:<families>`, joined by a space. */
function verdict(text: string): string | null {
  const found = ROW_IDS.flatMap(row => {
    const reading = readRow(row, text);
    return reading.kind === "finding" ? [`${row}:${reading.reason}`] : [];
  });
  return found.length === 0 ? null : found.join(" ");
}

// ------------------------------------------------------------------------------------------------------------- the sentences
const TABLE_ROW = /^\s*\|/;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TERMINATOR = /[.!?;](?=\s|$)/g;
function sentences(text: string, markdown: boolean): { readonly line: number; readonly text: string }[] {
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
    const whole = markdown && (TABLE_ROW.test(raw) || HEADING.test(raw));
    if (whole || (markdown && LIST_ITEM.test(raw))) flush();
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

// ---------------------------------------------------------------------------------------------------------------- the survey
const NUL = String.fromCharCode(0);
const isPage = (path: string): boolean => path.endsWith(".md");
const isModule = (path: string): boolean => /\.(?:ts|tsx|mts|cts|js|mjs|cjs)$/.test(path);
interface Survey {
  readonly files: readonly string[];
  readonly binary: readonly string[];
  readonly anchored: readonly string[];
  readonly findings: readonly string[];
}
/** One pass: every text file is read, an anchored one (it names the subject) is cut into sentences and judged by rows A-C. */
function survey(texts: readonly (readonly [string, string])[]): Survey {
  const files: string[] = [];
  const binary: string[] = [];
  const anchored: string[] = [];
  const findings: string[] = [];
  for (const [path, text] of texts) {
    if (text.includes(NUL)) {
      binary.push(path);
      continue;
    }
    files.push(path);
    if (!names(words(text), VOCABULARY.subject)) continue;
    anchored.push(path);
    for (const sentence of sentences(text, isPage(path))) {
      const found = verdict(sentence.text);
      if (found !== null) findings.push(...found.split(" ").map(entry => `${path}:${sentence.line} ${entry}`));
    }
  }
  return { files, binary, anchored, findings };
}
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const atRoot = (path: string): boolean => !path.includes("/");
const underAny = (path: string, roots: readonly string[]): boolean => roots.some(root => path.startsWith(`${root}/`));
const isRead = (path: string): boolean => atRoot(path) || underAny(path, CONSTANTS.readRoots);
/** What git would commit at the root and below the read roots: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && isRead(path) && existsSync(join(base, path))))].sort(byName);
}
function readTexts(base: string, paths: readonly string[]): { readonly texts: [string, string][]; readonly unreadable: string[] } {
  const texts: [string, string][] = [];
  const unreadable: string[] = [];
  for (const path of paths) {
    try {
      texts.push([path, readFileSync(join(base, path), "utf8")]);
    } catch {
      // A file gone between its listing and its read is skipped; one still there that cannot be read is a finding.
      if (existsSync(join(base, path))) unreadable.push(path);
    }
  }
  return { texts, unreadable };
}
function trackedTop(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 }).split("\0");
  return [...new Set(out.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort(byName);
}
let liveCache: { readonly listed: string[]; readonly texts: [string, string][]; readonly unreadable: string[]; readonly survey: Survey } | undefined;
/** The live pass over Pi's own tree, computed once and shared by A1 and C2. */
function live(): { readonly listed: string[]; readonly texts: [string, string][]; readonly unreadable: string[]; readonly survey: Survey } {
  if (liveCache === undefined) {
    const listed = gitList(REPO);
    const { texts, unreadable } = readTexts(REPO, listed);
    liveCache = { listed, texts, unreadable, survey: survey(texts) };
  }
  return liveCache;
}
/** Every dependency of a package.json naming a reactive-fiber package (the TSX SDK is @reactive-fiber/tsx). */
function tsxDependencies(manifest: string): string[] {
  const parsed = JSON.parse(manifest) as Record<string, unknown>;
  return ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]
    .flatMap(field => {
      const table = parsed[field];
      return table !== null && typeof table === "object" ? Object.keys(table).filter(name => hasPair(words(name), [VOCABULARY.dependency])) : [];
    })
    .sort(byName);
}
const adoptionOf = (anchored: readonly string[]): Adoption => (anchored.length === 0 ? "ABSENT" : "PRESENT");
/** The producer reads SHIPPED only when the status line, the tip's src and the triage line all say so; it fails closed. */
function producerOf(producer: Pick<Producer, "lines" | "tip">): ProducerReading {
  const status = producer.lines.find(line => line.line === 3)?.text ?? "";
  const proposed = /\bproposed\b/i.test(status) || status.includes("none of the new exports claimed shipped");
  const triageProposed = /\bPROPOSED\b/.test(producer.tip.triage.text);
  return !proposed && producer.tip.subjectSrcFiles > 0 && !triageProposed ? "SHIPPED" : "UNSHIPPED";
}
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

// ------------------------------------------------------------------------------------------------------------ the closures
interface Closure {
  readonly modules: string[];
  readonly packages: string[];
  readonly builtins: string[];
  readonly unresolved: string[];
}
/** The value specifiers of one module: imports and re-exports that are not type-only, import-equals, require() and import(). */
function valueSpecifiers(path: string, text: string): string[] {
  const kind = /\.(?:ts|tsx|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause;
      const bindings = clause?.namedBindings;
      const typeOnly = clause !== undefined && (clause.phaseModifier === ts.SyntaxKind.TypeKeyword || (clause.name === undefined && bindings !== undefined && ts.isNamedImports(bindings) && bindings.elements.length > 0 && bindings.elements.every(element => element.isTypeOnly)));
      if (!typeOnly) out.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.exportClause;
      const typeOnly = node.isTypeOnly || (clause !== undefined && ts.isNamedExports(clause) && clause.elements.length > 0 && clause.elements.every(element => element.isTypeOnly));
      if (!typeOnly) out.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      out.push(node.moduleReference.expression.text);
    } else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) out.push(first.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
const isLocal = (specifier: string): boolean => specifier.startsWith(".") || specifier.startsWith("/");
function resolveLocal(base: string, from: string, specifier: string): string | undefined {
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [joined.replace(/\.js$/, ".ts"), joined.replace(/\.mjs$/, ".mts"), joined, `${joined}.ts`, `${joined}/index.ts`];
  return candidates.find(candidate => !candidate.startsWith("..") && !candidate.startsWith("/") && existsSync(join(base, candidate)) && statSync(join(base, candidate)).isFile());
}
/** A module's value import closure: local modules followed, packages recorded, builtins and unresolved locals listed. */
function closureOf(base: string, entry: string): Closure {
  const queue = [entry];
  const modules = new Set<string>();
  const packages = new Set<string>();
  const builtins = new Set<string>();
  const unresolved = new Set<string>();
  for (let index = 0; index < queue.length; index += 1) {
    const path = queue[index];
    if (modules.has(path)) continue;
    modules.add(path);
    for (const specifier of valueSpecifiers(path, readFileSync(join(base, path), "utf8"))) {
      if (isLocal(specifier)) {
        const target = resolveLocal(base, path, specifier);
        if (target === undefined) unresolved.add(`${path}:${specifier}`);
        else queue.push(target);
      } else if (isBuiltin(specifier)) builtins.add(`${path}:${specifier}`);
      else packages.add(specifier);
    }
  }
  return { modules: [...modules].sort(byName), packages: [...packages].sort(byName), builtins: [...builtins].sort(byName), unresolved: [...unresolved].sort(byName) };
}
const pure = (closure: Closure): boolean => closure.builtins.length === 0 && closure.unresolved.length === 0;
/** Pi's DevTools-style surfaces: the src modules whose path names a surface word. */
const surfacesOf = (paths: readonly string[]): string[] => paths.filter(path => path.startsWith("src/") && isModule(path) && names(words(path), VOCABULARY.surface));
const COMMENT_MARKS = /^\/\/+|^\/\*+|\*+\/$|^[ \t]*\*+(?!\/)/gm;
/** The first sentence of a module's leading comment. */
function headerOf(text: string): string {
  const comment = /^\s*(\/\*[\s\S]*?\*\/)/.exec(text)?.[1] ?? "";
  return sentences(comment.replace(COMMENT_MARKS, " "), false)[0]?.text ?? "";
}

// -------------------------------------------------------------------------------------------------------------- the replicas
const scratches: string[] = [];
afterEach(() => {
  removeScratch(...scratches.splice(0));
});
/** A scratch git repository holding `files`, left untracked, so gitList reads it exactly as it reads Pi's tree. */
function gitReplica(prefix: string, files: Readonly<Record<string, string>>): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "pipe" });
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  return dir;
}
/** A template placeholder opener for planted code, spelled in two parts so no literal of this file holds one. */
const HOLE = "$" + "{";
const LOOKALIKE_E = String.fromCodePoint(0x0435);
const INVISIBLE = String.fromCodePoint(0x200b);
const FULLWIDTH_Q = String.fromCodePoint(0xff31);
const ADAPTER = "// ActivityBoundary adapter.\n";
/** The findings of one anchored code or doc plant (the adapter comment names the subject on line 1). */
const codeFindings = (body: string, path = "src/plant.ts"): string[] => [...survey([[path, `${ADAPTER}${body}`]]).findings];
const docFindings = (text: string, path = "docs/plant.md"): string[] => [...survey([[path, text]]).findings];
const verdicts = (texts: readonly string[]): Record<string, string | null> => Object.fromEntries(texts.map(text => [text, verdict(text)]));
/** The adoption the A1 replica plants: one finding per row and root, a negated twin, an unanchored page, outside and ignored files. */
const ADOPTION_PLANTS: Readonly<Record<string, string>> = {
  "docs/plant.md": "# Plant\n\nThe ActivityBoundary keeps a WARM context.\n\nA WARM context calls inference for Pi.\n",
  "docs/plant-twin.md": "The ActivityBoundary keeps a WARM context.\n\nA WARM context never calls inference for Pi.\n",
  "docs/unanchored.md": "A WARM context calls inference for Pi.\n",
  "examples/plant.md": "- ActivityBoundary state is the QueryView identity.\n",
  "src/plant.ts": '// ActivityBoundary adapter.\nexport function warm(state: string): void {\n  if (state === "WARM") {\n    runEffect();\n  }\n}\ndeclare function runEffect(): void;\n',
  "qa/plant.mjs": "// ActivityBoundary: the WARM state owns the speculative execution.\nexport {};\n",
  ".pi/agents/plant.md": "The ActivityBoundary DevTools panel transitions a context to WARM.\n",
  "README.md": "The inspector writes the ActivityBoundary state.\n",
  "test/plant.md": "The ActivityBoundary keeps a WARM context that calls inference.\n",
  "docs/ignored.md": "The ActivityBoundary keeps a WARM context that calls inference.\n",
  ".gitignore": "docs/ignored.md\n",
  "package.json": '{ "dependencies": { "@reactive-fiber/tsx": "0.1.668" } }\n',
};
/** The surfaces the C2 replica plants: a builtin three modules deep, type-only, dynamic, require, re-export, unresolved, and the residuals. */
const SURFACE_PLANTS: Readonly<Record<string, string>> = {
  "src/ui/plant-inspector.ts": 'import { a } from "./plant-a.js";\nexport const x = a;\n',
  "src/ui/plant-a.ts": 'import { b } from "../plant-b.js";\nexport const a = b;\n',
  "src/plant-b.ts": 'import { writeFileSync } from "node:fs";\nexport const b = writeFileSync;\n',
  "src/ui/plant-typed-inspector.ts": 'import type { Stats } from "node:fs";\nexport type S = Stats;\n',
  "src/ui/plant-dynamic-devtools.ts": 'export const load = () => import("node:child_process");\n',
  "src/ui/plant-require-dev-tools.ts": 'const cp = require("child_process");\nexport { cp };\n',
  "src/ui/plant-reexport-inspector.ts": 'export * from "node:net";\n',
  "src/ui/plant-unresolved-inspector.ts": 'import { z } from "./missing.js";\nexport const q = z;\n',
  "src/ui/plant-panel.ts": 'import { writeFileSync } from "node:fs";\nexport const w = writeFileSync;\n',
  "src/ui/plant-package-inspector.ts": 'import { io } from "fake-io-lib";\nexport const y = io;\n',
  "src/ui/plant-injected-inspector.ts": 'export function render(write: (text: string) => void): void {\n  write("x");\n}\n',
  "src/ui/plant-computed-inspector.ts": 'const name = "node:fs";\nexport const load = () => import(name);\n',
};
const summary = (closure: Closure): { [key: string]: Json } => ({ pure: pure(closure), builtins: closure.builtins, unresolved: closure.unresolved, packages: closure.packages });

// ------------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const real = live();
    // ONE pass over every listed file and in-memory positives: exactly what the positives find alone, after the live findings.
    const positives: readonly (readonly [string, string])[] = [
      ["docs/workbench/zz-plant.md", "The ActivityBoundary keeps a WARM context that calls inference.\n"],
      ["src/zz-plant.ts", "// ActivityBoundary: the inspector dispatches the WARM transition.\nexport {};\n"],
    ];
    const alone = survey(positives).findings;
    expect(alone.length).toBe(positives.length);
    expect(survey([...real.texts, ...positives]).findings).toEqual([...real.survey.findings, ...alone]);
    const files = real.survey.files;
    const count = (root: string): number => files.filter(path => (root === "" ? atRoot(path) : path.startsWith(`${root}/`))).length;
    const floors = { files: files.length >= FLOORS.files, root: count("") >= FLOORS.root, src: count("src") >= FLOORS.src, docs: count("docs") >= FLOORS.docs, qa: count("qa") >= FLOORS.qa, examples: count("examples") >= FLOORS.examples };
    // The same pass over a scratch git repository holding an adoption: exactly its plants, never test/ or an ignored file.
    const replica = gitReplica("km7q6-adopt-", ADOPTION_PLANTS);
    const listed = gitList(replica);
    const mirror = survey(readTexts(replica, listed).texts);
    return {
      producer: producerOf(ROSTER.producer),
      adoption: adoptionOf(real.survey.anchored),
      anchored: [...real.survey.anchored],
      findings: [...real.survey.findings],
      unreadable: [...real.unreadable],
      tsxDependencies: tsxDependencies(readFileSync(join(REPO, "package.json"), "utf8")),
      floors,
      positives: [...alone],
      replica: {
        listed,
        adoption: adoptionOf(mirror.anchored),
        anchored: [...mirror.anchored],
        findings: [...mirror.findings],
        tsxDependencies: tsxDependencies(readFileSync(join(replica, "package.json"), "utf8")),
      },
      quiet: {
        "R-OUTSIDE-ROOTS": [listed.filter(path => path.startsWith("test/") || path === "docs/ignored.md"), mirror.findings.filter(finding => finding.startsWith("docs/plant.md:"))],
      },
    };
  },
  A2: () => {
    const unanchored = "A WARM context calls inference.\n";
    return {
      doc: verdicts([
        "A WARM context calls inference.",
        "A warm context infers the next step.",
        "The WARM precompute runs inferences for the query.",
        "A WARM context only calls inference.",
        "A WARM context never calls inference.",
        "A WARM context cannot call inference.",
        "A WARM precompute attempting inference is refused.",
        "A WARM context doesn't call inference.",
        "An ACTIVE context calls inference.",
        "A WARM context calls the inferential layer.",
      ]),
      code: [
        codeFindings('if (state === "WARM") {\n  await runInference(spec);\n}\n'),
        codeFindings('switch (state) {\n  case "WARM":\n    return infer(spec);\n}\n'),
        codeFindings('if (state === "WARM") throw new Error("a WARM precompute never calls inference");\n'),
      ],
      quiet: {
        "R-UNANCHORED": [docFindings(unanchored), docFindings(`The ActivityBoundary holds the context.\n\n${unanchored}`)],
        "R-SPLIT": [docFindings("The ActivityBoundary context is WARM. It calls inference.\n"), docFindings("The ActivityBoundary context is WARM and calls inference.\n")],
      },
    };
  },
  A3: () => ({
    doc: verdicts([
      "A WARM context runs effects.",
      "The WARM precompute commits an effect.",
      "A WARM context is effectful.",
      "A WARM context calls inference and effects.",
      "A WARM context never runs effects.",
      "A WARM precompute attempting an effect is rejected.",
      "A WARM context is effective.",
      "A DORMANT context runs effects.",
    ]),
    code: [codeFindings('switch (state) {\n  case "WARM":\n    runEffect(spec);\n}\n'), codeFindings('// A WARM precompute never runs an effect.\nif (state === "WARM") return;\n')],
    quiet: {
      "R-MARKER-ANYWHERE": [verdict("A WARM context runs effects, not the host."), verdict("A WARM context runs effects for the host.")],
      "R-PARAPHRASE": [verdict("A WARM context calls the model."), verdict("A WARM context calls the inference model.")],
    },
  }),
  B1: () => ({
    doc: verdicts([
      "ActivityBoundary state is the QueryView identity.",
      "The WARM state keys the query view.",
      "A DORMANT context reuses the QueryView.",
      "ActivityBoundary states share the query views.",
      "ActivityBoundary state stays separate from QueryView identity.",
      "The EVICTED state is distinct from the query view.",
      "The state names a query.",
      "The ActivityBoundary reads a view of the query.",
    ]),
    code: [codeFindings(`export const key = \`${HOLE}activityState}:${HOLE}queryView.id}\`;\n`), codeFindings("export const keys = { state: 1, view: 2 };\n")],
    quiet: {
      "R-COMPOSED": [codeFindings('export const name = "Que" + "ryView" + "State";\n'), codeFindings('export const name = "Query" + "View" + "State";\n')],
      "R-LOOKALIKE": [
        [verdict(`ActivityBoundary state is the QueryVi${LOOKALIKE_E}w identity.`), verdict(`ActivityBoundary state is the Qu${INVISIBLE}eryView identity.`)],
        [verdict("ActivityBoundary state is the QueryView identity."), verdict(`ActivityBoundary state is the ${FULLWIDTH_Q}ueryView identity.`)],
      ],
    },
  }),
  B2: () => ({
    doc: verdicts([
      "The WARM state owns the speculative execution.",
      "ActivityBoundary state decides the execution owner.",
      "The ACTIVE state holds speculation ownership.",
      "ActivityBoundary state is the QueryView identity and the speculative execution owner.",
      "ActivityBoundary state never aliases speculative execution ownership.",
      "The state stays independent of the speculative execution.",
      "The WARM state runs under the SpeculationBoundary.",
      "The WARM state owns the execution.",
    ]),
    code: [codeFindings("boundary.state = speculativeExecution.owner;\n")],
    quiet: { "R-SYNONYM": synonymsOf() },
  }),
  C1: () => ({
    doc: verdicts([
      "The inspector transitions the context to WARM.",
      "DevTools writes the ActivityBoundary state.",
      "The dev tools panel dispatches a WARM command.",
      "The inspector controls the boundary.",
      "DevTools only consumes emitted host events.",
      "The inspector never transitions the context.",
      "The inspector is a read-only view of the controls.",
      "The inspector shows the WARM state.",
    ]),
    code: [codeFindings('inspector.dispatch({ boundary: "WARM" });\n'), codeFindings("export const view = inspector.render(model);\n")],
    quiet: {
      "R-SURFACE-OTHER": [verdict("The panel transitions the context to WARM."), verdict("The inspector panel transitions the context to WARM.")],
    },
  }),
  C2: () => {
    const surfaces = surfacesOf(live().listed);
    const closures = Object.fromEntries(
      surfaces.map(surface => {
        const closure = closureOf(REPO, surface);
        const direct = [...new Set(valueSpecifiers(surface, readFileSync(join(REPO, surface), "utf8")))].sort(byName);
        const locals = direct.filter(isLocal).map(specifier => resolveLocal(REPO, surface, specifier));
        // The closure reaches past the surface: every direct local import is in it, and so is at least one module beyond them.
        const reaches = locals.every(target => target !== undefined && closure.modules.includes(target)) && closure.modules.length > locals.length + 1;
        return [surface, { ...summary(closure), direct, reaches }];
      }),
    );
    const replica = gitReplica("km7q6-surface-", SURFACE_PLANTS);
    const planted = surfacesOf(gitList(replica));
    const controls = Object.fromEntries(planted.map(surface => [surface, summary(closureOf(replica, surface))]));
    return {
      surfaces,
      closures,
      header: headerOf(readFileSync(join(REPO, CONSTANTS.inspector), "utf8")),
      controls,
      quiet: {
        "R-UNNAMED-SURFACE": [planted.includes("src/ui/plant-panel.ts"), closureOf(replica, "src/ui/plant-panel.ts").builtins],
        "R-PACKAGE": [pure(closureOf(replica, "src/ui/plant-package-inspector.ts")), pure(closureOf(replica, "src/ui/plant-inspector.ts"))],
        "R-INJECTED": [pure(closureOf(replica, "src/ui/plant-injected-inspector.ts")), pure(closureOf(replica, "src/plant-b.ts"))],
        "R-COMPUTED-LOAD": [pure(closureOf(replica, "src/ui/plant-computed-inspector.ts")), pure(closureOf(replica, "src/ui/plant-dynamic-devtools.ts"))],
      },
    };
  },
};

/** The outside texts: the owner filing's title and citation line, and docs/10's two recorded sentences. */
function outsideTexts(): string[] {
  const { title, filing } = beadRow();
  return [title, filing, CONSTANTS.docs10ReadOnly, CONSTANTS.docs10Controls];
}
/** Every lexicon of the vocabulary, by name: the subject, the row subjects, each family and each row's markers. */
function lexicons(): (readonly [string, Lexicon])[] {
  return [
    ["subject", VOCABULARY.subject],
    ["warm", VOCABULARY.warm],
    ["state", VOCABULARY.state],
    ["surface", VOCABULARY.surface],
    ...FAMILY_IDS.map(id => [`family:${id}`, VOCABULARY.families[id]] as const),
    ...ROW_IDS.map(row => [`markers:${row}`, VOCABULARY.markers[row]] as const),
  ];
}
/** R-SYNONYM: every vocabulary word, and every adjacent pair, that no outside text spells: held by this file and the roster alone. */
function synonymsOf(): string[] {
  const outside = outsideTexts().map(words);
  const spelledOutside = new Set(outside.flat());
  const all = lexicons().flatMap(([, lexicon]) => [...lexicon.words.filter(word => !spelledOutside.has(word)), ...lexicon.pairs.filter(pair => !outside.some(tokens => hasPair(tokens, [pair]))).map(pair => pair.join(" "))]);
  return [...new Set(all)].sort(byName);
}
/** A word's role in the reading: subject, surface, its families joined, warm, state, the rows it marks, or none. */
function roleOf(text: string): string {
  const tokens = words(text);
  if (names(tokens, VOCABULARY.subject)) return "subject";
  if (names(tokens, VOCABULARY.surface)) return "surface";
  const families = FAMILY_IDS.filter(id => names(tokens, VOCABULARY.families[id]));
  if (families.length > 0) return families.join("+");
  if (names(tokens, VOCABULARY.warm)) return "warm";
  if (names(tokens, VOCABULARY.state)) return "state";
  const rows = ROW_IDS.filter(row => names(tokens, VOCABULARY.markers[row]));
  return rows.length > 0 ? `marker:${rows.join("")}` : "none";
}
let rowCache: { readonly title: string; readonly filing: string } | undefined;
/** The owner filing's row of the tracked bead export (36 MB at the cut's base), read once: its title and its citation line. */
function beadRow(): { readonly title: string; readonly filing: string } {
  if (rowCache !== undefined) return rowCache;
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string" && "title" in value && typeof value.title === "string") {
      rowCache = { title: value.title, filing: value.notes.split("\n").find(entry => entry.startsWith(CONSTANTS.filing)) ?? "" };
      return rowCache;
    }
  }
  throw new Error("bead export lacks the owner filing");
}
const GAP = /^[\s,;:]*$/;
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !GAP.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return GAP.test(body.slice(at));
}
const producerLine = (line: number): string => ROSTER.producer.lines.find(entry => entry.line === line)?.text ?? "";

describe("wb-km7q.6 TSX ActivityBoundary adoption census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R17, the adoption-time falsifier)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and title, the producer lines and docs/10", { timeout: 180_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    // The owner filing: the first notes line opening with the citation carries the acceptance clause, the three labels joined.
    const { title, filing } = beadRow();
    const clause = /Acceptance: ([^.]+)\./.exec(filing)?.[1] ?? "";
    expect(clause).toBe(ROWS.map(row => row.label).join(", "));
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote)))).toEqual(ROWS.map(() => true));
    // Each label: A quiet only by "refused", B only by "never"; C names the surface and no driving word until docs/10 supplies one.
    const [labelA = "", labelB = "", labelC = ""] = ROWS.map(row => row.label);
    expect(readRow("A", labelA)).toEqual({ kind: "marker", reason: "refused" });
    expect(readRow("A", labelA.replace(/ is refused$/, ""))).toEqual({ kind: "finding", reason: "inference+effect" });
    expect(readRow("B", labelB)).toEqual({ kind: "marker", reason: "never" });
    expect(readRow("B", labelB.replace(" never ", " "))).toEqual({ kind: "finding", reason: "query-view+execution" });
    expect(readRow("C", labelC)).toEqual({ kind: "none", reason: "" });
    expect(readRow("C", `${labelC.replace(/ stay read-only consumers$/, "")} ${CONSTANTS.docs10Controls}`)).toEqual({ kind: "finding", reason: "driving" });
    expect(readRow("C", `${labelC} ${CONSTANTS.docs10Controls}`)).toEqual({ kind: "marker", reason: "read only" });
    // The title: its WARM clause is quiet only by "never", its state clause only by "separate"; its DevTools clause names the surface.
    const warmClause = /, (a WARM context precomputes .+? never calls inference or effects);/.exec(title)?.[1] ?? "";
    expect(readRow("A", warmClause)).toEqual({ kind: "marker", reason: "never" });
    expect(readRow("A", warmClause.replace(" never ", " "))).toEqual({ kind: "finding", reason: "inference+effect" });
    const stateClause = /; (ActivityBoundary state stays separate from .+? ownership);/.exec(title)?.[1] ?? "";
    expect(readRow("B", stateClause)).toEqual({ kind: "marker", reason: "separate" });
    expect(readRow("B", stateClause.replace("stays separate from", "is"))).toEqual({ kind: "finding", reason: "query-view+execution" });
    const devtoolsClause = /; (DevTools only consumes emitted host events)\.$/.exec(title)?.[1] ?? "";
    expect([readRow("C", devtoolsClause).kind, names(words(devtoolsClause), VOCABULARY.surface)]).toEqual(["none", true]);
    expect(ROSTER.unclaimed.map(entry => title.includes(entry.duty) && entry.reason.length > 0)).toEqual(ROSTER.unclaimed.map(() => true));
    // The citations: every cited line of the producer is a recorded line, at the recorded bead pin.
    const cited = [...filing.matchAll(/:(\d+)@([0-9a-f]{12})/g)].map(match => [Number(match[1]), match[2] ?? ""] as const);
    expect(cited.length).toBe(2);
    expect(cited.map(([line, pin]) => ROSTER.producer.lines.some(entry => entry.line === line) && ROSTER.producer.beadPin.startsWith(pin))).toEqual(cited.map(() => true));
    expect(filing.includes(ROSTER.producer.path)).toBe(true);
    // The producer's lines: their recorded digests, the reading they give, and line 66's four sentences read in their rows.
    const recorded = [...ROSTER.producer.lines, ROSTER.producer.tip.triage];
    expect(recorded.map(entry => sha256(entry.text))).toEqual(recorded.map(entry => entry.sha256));
    expect(ROSTER.producer.reading).toBe(producerOf(ROSTER.producer));
    expect(ROSTER.producer.blob).toBe(ROSTER.producer.tip.blob);
    const amendment = sentences(producerLine(66), false).map(sentence => sentence.text);
    expect(amendment.length).toBe(4);
    const [separation = "", warmSentence = "", testList = "", consumes = ""] = amendment;
    expect(readRow("B", separation)).toEqual({ kind: "marker", reason: "separate" });
    expect(readRow("A", warmSentence)).toEqual({ kind: "marker", reason: "not" });
    expect(readRow("A", warmSentence.replace(", not call", " and call"))).toEqual({ kind: "finding", reason: "inference+effect" });
    expect([verdict(testList), readRow("C", consumes).kind]).toEqual([null, "none"]);
    // docs/10 and the inspector: the two recorded sentences and the header are present as recorded.
    const docs10 = sentences(readFileSync(join(REPO, CONSTANTS.docs10), "utf8"), true).map(sentence => sentence.text);
    expect([docs10.includes(CONSTANTS.docs10ReadOnly), docs10.includes(CONSTANTS.docs10Controls)]).toEqual([true, true]);
    expect(headerOf(readFileSync(join(REPO, CONSTANTS.inspector), "utf8"))).toBe(CONSTANTS.inspectorHeader);
    expect(filing.includes("(docs/workbench/10)") && CONSTANTS.docs10.startsWith("docs/workbench/10-")).toBe(true);
    // Every subject, state, surface, family and marker word the filing, docs/10 or the producer spells at a fixed place reads in its role.
    const places: readonly (readonly [string, RegExp, readonly string[]])[] = [
      [title, /adopts rf TSX (\w+) \((\w+)\/(\w+)\/(\w+)\/(\w+); gated TSX-RQ7\), a (\w+) context precomputes only explicitly eligible (\w+-\w+) resources under the existing SpeculationBoundary and (\w+) calls (\w+) or (\w+);/, ["subject", "state", "warm", "state", "state", "warm", "marker:C", "marker:ABC", "inference", "effect"]],
      [title, /; (\w+) (\w+) stays (\w+) from (\w+) identity and (\w+ \w+ \w+); (\w+) only consumes emitted host events\.$/, ["subject", "state", "marker:B", "query-view", "execution", "surface"]],
      [filing, /Pi's (\w+) consumes emitted host events only/, ["surface"]],
      [filing, /no bead binds (\w+) (\w+) or (\w+) eligibility/, ["subject", "state", "warm"]],
      [filing, /Acceptance: adoption-time falsifier that a (\w+) precompute attempting (\w+) or an (\w+) is (\w+), that boundary (\w+) (\w+) aliases (\w+) identity or (\w+ \w+ \w+), and that (\w+)-style surfaces stay (\w+-\w+) consumers\./, ["warm", "inference", "effect", "marker:A", "state", "marker:ABC", "query-view", "execution", "surface", "marker:C"]],
      [CONSTANTS.docs10Controls, /^(\w+) (\w+) on separate explicit (\w+) require/, ["driving", "driving", "driving"]],
      [CONSTANTS.docs10ReadOnly, /^A (\w+-\w+) rich (\w+) now offers/, ["marker:C", "surface"]],
      [producerLine(66), /^(\w+) (\w+)\/(\w+)\/(\w+)\/(\w+) remains (\w+) from (\w+) identity and (\w+ \w+ \w+)\. A (\w+) context may precompute only explicitly eligible (\w+-\w+) resources under existing SpeculationBoundary, (\w+) call (\w+)\/(\w+)\./, ["subject", "state", "warm", "state", "state", "marker:B", "query-view", "execution", "warm", "marker:C", "marker:ABC", "inference", "effect"]],
      [producerLine(66), /(\w+) only consumes emitted host events\.$/, ["surface"]],
      [ROSTER.producer.tip.triage.text, /the Activity (\w+) (\w+)\/(\w+)\/(\w+)\/(\w+) exactly once/, ["state", "state", "warm", "state", "state"]],
    ];
    const read = places.map(([text, rx]) => (rx.exec(text)?.slice(1) ?? []).map(roleOf));
    expect(read).toEqual(places.map(([, , roles]) => roles));
    // Two readings no literal of this file sets: every word an outside text spells at a role place has a role, and every
    // lexicon keeps a member an outside text spells, so a vocabulary hollowed together with every expected value still reds.
    expect(read.flat().filter(role => role === "none")).toEqual([]);
    expect(lexicons().filter(([, lexicon]) => !outsideTexts().some(text => names(words(text), lexicon))).map(([name]) => name)).toEqual([]);
    // The read set partitions Pi's tracked top level: every directory is read or outside, never both.
    expect(CONSTANTS.readRoots.filter(root => CONSTANTS.outside.includes(root))).toEqual([]);
    expect(trackedTop(REPO).filter(directory => CONSTANTS.readRoots.includes(directory) === CONSTANTS.outside.includes(directory))).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-UNANCHORED", "R-SPLIT", "R-MARKER-ANYWHERE", "R-PARAPHRASE", "R-COMPOSED", "R-LOOKALIKE", "R-SYNONYM", "R-SURFACE-OTHER", "R-UNNAMED-SURFACE", "R-PACKAGE", "R-INJECTED", "R-COMPUTED-LOAD"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          const quiet = witness !== null && typeof witness === "object" && !Array.isArray(witness) ? witness.quiet : undefined;
          expect(Object.keys(quiet !== null && typeof quiet === "object" && !Array.isArray(quiet) ? quiet : {})).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === pin.id).map(residual => residual.id));
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
