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
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only with git show in the local ReactiveFiberTSXSDK
 * checkout on 2026-10-28 and measured again, unchanged, on the roster's measuredAt; this census is hermetic and never re-reads
 * it): the charter docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (01970950) at the
 * bead pin e7e6616d3d08 and at origin/main 94ae52c14aef of the local checkout (the pin is an ancestor of that tip). The
 * roster vendors its line 3 (the status line: "proposed extensions; none of the new exports claimed shipped") and line 66
 * (the amendment paragraph the filing cites: the separation sentence, the WARM sentence, the TSX-RQ1..TSX-RQ7 test list and
 * "DevTools only consumes emitted host events."), each with its sha256 (UTF-8, no line end). At that tip the package is
 * @reactive-fiber/tsx 0.1.668, its export map names six entry points and none of its 159 src files names the subject; the
 * producer's own triage (docs/triage/programs-2026-10-21/requirements/ATOMIC-REQUIREMENTS.md:87, blob df7eec14, vendored with
 * its sha256) requires that ActivityBoundary and SpeculationBoundary be "marked PROPOSED (0 files at db7558552)" and names
 * the host as the lifecycle owner. producerOf reads SHIPPED only when all three conditions flip - the status line holds
 * neither the word "proposed" (in any case) nor the phrase "none of the new exports claimed shipped", the tip's src names
 * the subject (a count above 0), the triage line stops holding the upper-case word PROPOSED - and UNSHIPPED otherwise: it
 * fails closed. A1 holds eight producer controls: all three flipped (SHIPPED); each condition held back, the status line
 * once per phrase and once capitalized (UNSHIPPED); and two near misses that stay SHIPPED, a status word that only holds
 * "proposed" and a triage line reading "Proposed".
 * ADOPTION (row A): Pi adopts the boundary when a file Pi ships names it. The adoption reads PRESENT once a read file (below)
 * names the subject, ABSENT otherwise; each reactive-fiber package (a name whose words hold the pair reactive fiber) that the
 * root package.json names in dependencies, devDependencies, optionalDependencies or peerDependencies is recorded beside it
 * (none today) [A1 replica: one such package in each of the four fields, one in overrides (never read), and a manifest below
 * the root (listed and read as text, never read as a manifest)]. The falsifier never stands down: every file that names the
 * subject is judged by rows A-C at every run, so the first adoption is judged the day it lands; today's live reading is the
 * empty adoption (no file to judge), held beside a scratch-repository adoption whose violations it finds exactly.
 *
 * READINGS (the pin in brackets holds every form, condition and character class its reading names; a form a reading does not
 * name is not claimed, and the residuals below name the senses the readers do not judge)
 * - WORDS [B1 words, B1 nonSeparators]: NFKC; a break between a lower-case letter or a digit and the capital after it, and
 *   before the last capital of a run of capitals that a lower-case letter follows; lower case; the words are then the runs
 *   of a-z and 0-9, and every other character separates them. B1 words holds the examples: ActivityBoundary reads activity
 *   boundary, queryView query view, DevTools dev tools, WARMContext warm context, Query2View query2 view; a digit inside,
 *   closing or opening a run stays in it; every letter and digit read as one run; capitals alone read as one word;
 *   snake_case and kebab-case split at their separators; a fullwidth letter folds to its letter, before the break is read
 *   (query, a fullwidth V and iew read query view). B1 nonSeparators reads every Unicode scalar value between the letters q
 *   and v and lists, as code point ranges, those that do not separate them: a-z, A-Z, 0-9 and the characters NFKC or lower
 *   case turns into one of them.
 * - THE SUBJECT [the judged set's vocabulary; B2 outside load]: the adjacent pair activity boundary (or boundaries), or the
 *   folded word activityboundary(ies).
 * - THE READ SET [A1]: every file git would commit at the repository root or below .agents/, .pi/, docs/, examples/, qa/ and
 *   src/, read as text: tracked (in the index) or untracked, never one git ignores - by the root .gitignore, by a
 *   directory's .gitignore, by .git/info/exclude or by the file core.excludesFile names [A1 replica: a tracked plant beside
 *   the untracked ones, an ignored plant per source, a plant under each outside root, the root files]. A file holding a NUL
 *   byte is binary: listed, never read. A listed path that cannot be read as a file is recorded unreadable; one gone before
 *   its read is dropped. A file is ANCHORED when it names the subject anywhere; only an anchored file is judged
 *   (R-UNANCHORED keeps Pi's own senses of warm, state and inspector out of it).
 * - SENTENCES [A2 cuts, A2 nearMisses, A2 classes]: a line ends at each LF (a CRLF pair ends one line; a lone CR ends none).
 *   A text is cut after ".", "!", "?" or ";" when white space or the line end follows, and at a blank line (a line of white
 *   space only, or none). A .md page (never another file) is also cut around a table row (a line whose first character after
 *   any white space is |) and around a heading line (up to three white-space characters, one to six #, then white space or
 *   the line end), and before a list item (a line opening, after any white space, with -, + or *, or with ASCII digits and .
 *   or ), then white space). A sentence wrapped over lines stays one. White space is JavaScript's \s throughout. A2 cuts
 *   holds each cut (as a .md page and as another file): after each terminator before a space, and after . before a tab and
 *   at the line end; at an empty line and between CRLF line ends; around a table row flush and indented by two spaces;
 *   around a heading of one and of six #, indented by three spaces, and a bare #; before a list item opened by -, numbered
 *   10) and indented by two spaces; A2 nearMisses holds the forms that stay one sentence: a terminator before a letter,
 *   seven #, a heading indented by four spaces, a # or a list mark without white space, a number without its closer, a |
 *   inside a line and a lone CR. A2 classes reads every BMP code point (every member of \s is one) in each single-character
 *   place these cuts read and lists, as ranges, those that cut there: the line end, the terminator before a space, the
 *   follower of a terminator, a blank line, the mark of a line read alone (# or |) and of a list item, the indentation
 *   before |, before # and before a list mark, the follower of # and of a list mark, the digit and the closer of a list
 *   number. Code is read by the same cut, so a statement and the branch it opens read as one sentence up to their first
 *   terminator [A2 code].
 * - ROWS' READERS (each on one sentence of an anchored file; a finding is `<path>:<line> <row>:<families>`):
 *   A [A2, A3]: the WARM word beside an inference word (inference, infer and their inflections) or an effect word (effect,
 *      effects, effectful), with no refusal marker (not, no, never, nor, neither, without, cannot, the refuse and reject
 *      forms, or the n't contraction, straight or curly): a WARM precompute that attempts inference or an effect, as Pi's
 *      text states it.
 *   B [B1, B2]: a state word (state, states, active, warm, dormant, evicted) or the subject itself (no state word needed)
 *      beside a QueryView word (the pair query view(s), queryview(s)) or a speculative-execution-ownership pair (speculative
 *      execution(s), execution owner(ship), speculation owner(ship)), with no separation marker (not, no, never, nor,
 *      neither, without, cannot, separate, separately, separated, distinct, independent, independently, apart, n't):
 *      boundary state aliased to either identity.
 *   C [C1]: a DevTools-style surface word (devtools, the pair dev tools, inspector, inspectors) beside a driving word (the
 *      mutate, command, control, write, dispatch, drive and transition families), with no read-only marker (not, no, never,
 *      nor, neither, without, cannot, the pair read only, n't): a surface that does more than consume.
 *   The n't contraction, straight or curly, is a marker of each row [A2 doc and contraction, B1 contraction, C1
 *   contraction]. None of should, must, shall, will, may, might, can, could, would, if, when or "only" alone is a marker of
 *   any row [A2 never, B1 never, C1 never]: "a WARM context only calls inference" is a finding.
 * - THE HOUSE ANALOG [C2]: Pi's DevTools-style surfaces are the src/ modules whose path (a directory or the file name) names
 *   a surface word; a module is a .ts, .tsx, .mts, .cts, .js, .mjs or .cjs file, and neither a file that is not one (a page,
 *   data, a .jsx file) nor a module outside src/ is a surface [C2 controls: a surface per extension and one named by its
 *   directory; C2 notSurfaces]. Today the surfaces are exactly src/ui/workflow-inspector.ts, whose header reads "Read-only
 *   terminal inspector over the bounded producer-qualified observation projection." Each surface's VALUE import closure must
 *   hold no node builtin (Node's isBuiltin: with or without node:, a subpath too) and no unresolved local module. A .ts,
 *   .mts or .cts module is parsed as TypeScript (a type assertion reads as one), a .tsx, .js, .mjs or .cjs module with JSX
 *   (a JSX element reads as one) [C2 controls: each extension's surface loads its builtin in a syntax only that parse reads
 *   - a require() under a type assertion, or a require() as a JSX child]. Its value specifiers are read from the syntax,
 *   each form a C2 control: an import with no clause; a default, a namespace, a deferred namespace (import defer), a default
 *   plus named, a default plus namespace and a named import; an empty named list (import {} from and export {} from: read,
 *   though TypeScript erases it - fail-closed); export *, export * as ns and named re-exports; import-equals (export import
 *   too); require() and import() of a string or a no-substitution template literal. Never read, each a C2 control beside its
 *   value twin: import type (default, namespace or named); an import with no default whose named elements are all type-only;
 *   export type * (with or without as ns), export type { } and a re-export whose named elements are all type-only (Pi's
 *   tsconfig does not set verbatimModuleSyntax, so TypeScript erases each of these); import type x = require(); an import()
 *   in a type position (typeof import()). A declaration read is read whether or not its bindings are used (TypeScript drops
 *   an unused one; this reader never does: fail-closed) [C2 controls: an unused named import]. A local specifier is one
 *   opening with "." or "/": one opening with "/" names no file of the repository and is unresolved; one opening with "."
 *   (./, ../ or any other) is joined to the importing module's directory and resolves to the first file of: the path with
 *   .js read as .ts (a .js specifier only), the path with .mjs read as .mts (an .mjs specifier only; the two readings never
 *   apply together), the path as written, the path plus .ts, the path's index.ts. A candidate that is not a file is skipped,
 *   one outside the repository is never read, and a specifier no candidate resolves is unresolved [C2 controls: each
 *   candidate alone; each adjacent pair present together - .js read as .ts and .mjs read as .mts each before the path as
 *   written, the path as written before the path plus .ts, the path plus .ts before index.ts - where the earlier wins; a
 *   directory candidate; a dot form; an absolute path; an escaping path; a missing module]. Any other specifier is a
 *   package: recorded and not followed. A surface whose closure reaches a builtin can launch, write or open a socket of its
 *   own and is no longer only a consumer of what the host hands it; IO through an ambient global is not read (R-AMBIENT-IO),
 *   nor a module loaded by a property loader, a createRequire loader, a computed specifier or a global (R-COMPUTED-LOAD).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "adoption-time falsifier that a WARM precompute attempting inference or an effect is refused": A1 the adoption gate - the
 *    producer facts read UNSHIPPED beside the eight producer controls; the live read set (floors per root) reads ABSENT with no
 *    finding, no unreadable file and no reactive-fiber dependency; ONE pass over the live set and in-memory positives finds
 *    exactly the positives; the same pass over a scratch git repository holding an adoption finds exactly its plants (a
 *    finding in every read root and for every row; tracked and untracked files read) and nothing from a file under each
 *    outside root, a file each ignore source hides or a binary file, reads the four dependency fields of its root
 *    package.json and no other field or manifest, and records a listed directory unreadable; A2 the WARM-inference reader with
 *    the sentence cuts, their near misses and their character classes, the contraction and the words never a marker; A3 the
 *    WARM-effect reader; each over doc and code sentences with near misses.
 *  B "that boundary state never aliases QueryView identity or speculative execution ownership": B1 the QueryView reader with
 *    the word readings (the examples and every scalar value between two letters), the contraction and the words never a
 *    marker; B2 the speculative-execution-ownership reader and the outside load of every vocabulary member; each with its
 *    separation markers and near misses.
 *  C "and that DevTools-style surfaces stay read-only consumers": C1 the surface reader (a sentence may read in two rows, each
 *    finding kept), the contraction and the words never a marker; C2 the house analog - the surface set, each surface's
 *    closure read pure, its direct value imports and packages, and the closure reader's controls over a scratch git
 *    repository (a builtin three modules deep; each declaration form beside its type-only and mixed twins; import-equals;
 *    dynamic; require; the literal forms; re-exports; the builtin forms; each module extension and a surface named by its
 *    directory; each resolution candidate and each adjacent pair of them; a directory candidate, a dot form, an absolute
 *    path, an escaping path and a missing module; the files named for a surface that are not surfaces).
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-km7q.6 in the tracked bead export (.beads/issues.jsonl;
 *   the first notes line opening with its citation, so appended notes never move it): its acceptance clause is the three
 *   labels joined, each label tiled by its pins; label A reads quiet only by "refused" and, without it, as a finding of
 *   exactly inference and effect; label B quiet only by "never" and, without it, a finding of exactly query-view and
 *   execution; the title's WARM clause is quiet only by "never", its state clause only by "separate", and its DevTools clause
 *   names the surface and no driving word; docs/10's controls sentence ("Mutating commands on separate explicit controls
 *   require confirmation and per-provider authorization.") read after label C's surface is a C finding, quiet once label C's
 *   read-only is kept; line 66's separation sentence is quiet only by "separate" and its WARM sentence only by "not" (each,
 *   without its marker, a finding of exactly its families); the
 *   inspector's header and docs/10's read-only sentence are present as recorded. ROLE PLACES: every subject, state, surface,
 *   family and marker word or pair that a place text spells (the title, the filing line, docs/10's two sentences and every
 *   vendored producer line: line 3, line 66 and the triage line; the seven names are a literal of this case) is read at a
 *   fixed place in its role (the two pairs of "speculative execution ownership" are also read apart, each alone), and four
 *   readings no literal of this file sets hold beside them: no word at a role place reads without a role; UNCOVERED, with
 *   every role place blanked, no place text spells a vocabulary member; ISOLATED, every member a group spells inside a longer
 *   group is also a whole group of the same text (so a place deleted from this file's table reds); and every lexicon (the
 *   subject, the row subjects, each family, each row's markers) keeps a member an outside text spells. B2 pins the two
 *   coverage readings' controls. The filing's citations name only recorded producer lines at the recorded pin. A row or a
 *   pin removed from every literal of this file and of the roster together reds this case: the clause equality and the
 *   tiling hold the labels and their pins to the filing.
 * OUTSIDE LOAD [B2]: a lexicon member (a word or adjacent pair of the subject, row-subject, family or marker lexicons) carries
 *   load when taking it alone out of every lexicon that holds it moves one of the readings above (the labels, the title
 *   clauses, line 66, the role places, the four structural readings). Each of those readings is held to a literal of this case,
 *   so a member that carries load, removed from this file's vocabulary and the roster's together, reds the judged set.
 *   R-SYNONYM is the computed rest: the members whose removal moves none of them, held by this file and the roster alone. With
 *   UNCOVERED and ISOLATED holding, a member carries load exactly when a place text spells it (each is read alone at a place,
 *   which reads without a role once it is gone); B2 checks the two computations agree and pins both: the R-SYNONYM list, and
 *   each load-bearing member with the readings its removal moves.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer
 *   facts, the unclaimed duties, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/tsx-activity-boundary-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each member has a pinned quiet row held beside its unsilenced twin, which reads as a finding, an impure
 *   closure or, for R-SYNONYM, a moved reading): R-OUTSIDE-ROOTS (A1) a claim under .beads/, .codex/, .github/, media/,
 *   new-feedback/, test/ or vendor/, in a file git ignores (a row per ignore source) or in a binary file (a NUL byte), is
 *   never judged; R-UNANCHORED (A2)
 *   a file that never names the subject is never judged (Pi's own senses of the words); R-SPLIT (A2) the WARM word and the
 *   family in different sentences (a pronoun: "It calls inference."); R-MARKER-ANYWHERE (A3) a marker anywhere in the
 *   sentence quiets it, whatever it qualifies, in prose and in a code comment read with the statement after it; R-PARAPHRASE
 *   (A3) inference or an effect named outside the families (the model, a completion, a side job); R-COMPOSED (B1) a word
 *   split into literal parts ("Que" + "ryView"); R-LOOKALIKE (B1) a look-alike letter or an inserted invisible inside a word
 *   (NFKC folds the fullwidth forms, which are read); R-SYNONYM (B2) a vocabulary member that carries no outside load is held
 *   by this file and the roster alone (B2 lists them); R-SURFACE-OTHER (C1) a surface under another name (a panel, a viewer,
 *   a dashboard); R-UNNAMED-SURFACE (C2) a module whose path names no surface word is not a surface, whatever it renders;
 *   R-PACKAGE (C2) IO reached through a package's own code (packages are recorded, never followed); R-INJECTED (C2) IO the
 *   host hands a surface (a callback, an object it calls); R-AMBIENT-IO (C2) IO through an ambient global with no import (a
 *   global fetch, a process stream); R-COMPUTED-LOAD (C2) a module loaded by a computed specifier, by a createRequire loader
 *   (only the loader's own node:module import is read), by a property loader (module.require) or by a global
 *   (process.getBuiltinModule).
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
import { isDeepStrictEqual } from "node:util";
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
/** The typeset apostrophe of a curly n't. */
const CURLY = String.fromCodePoint(0x2019);
const CONTRACTION = new RegExp(`n['${CURLY}]t(?![a-z0-9])`);
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
/** The code points 0..`top` (surrogates skipped) that `test` holds for, as ranges of upper-case hex ("0020", "0030-0039"). */
function codePoints(test: (char: string) => boolean, top: number): string[] {
  const out: string[] = [];
  const hex = (point: number): string => point.toString(16).toUpperCase().padStart(4, "0");
  let open = -1;
  for (let point = 0; point <= top + 1; point += 1) {
    const holds = point <= top && (point < 0xd800 || point > 0xdfff) && test(String.fromCodePoint(point));
    if (holds && open < 0) open = point;
    if (!holds && open >= 0) {
      out.push(open === point - 1 ? hex(open) : `${hex(open)}-${hex(point - 1)}`);
      open = -1;
    }
  }
  return out;
}
/** The highest Unicode scalar value, and the highest of the Basic Multilingual Plane. */
const UNICODE_TOP = 0x10ffff;
const BMP_TOP = 0xffff;
const hasPair = (tokens: readonly string[], pairs: readonly Pair[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
const names = (tokens: readonly string[], lexicon: Lexicon): boolean => tokens.some(word => lexicon.words.includes(word)) || hasPair(tokens, lexicon.pairs);
/** Each row's subject under a vocabulary: A the WARM word; B a state word or the boundary itself; C a DevTools-style surface. */
const SUBJECT_OF: Readonly<Record<RowId, (tokens: readonly string[], vocab: Vocabulary) => boolean>> = {
  A: (tokens, vocab) => names(tokens, vocab.warm),
  B: (tokens, vocab) => names(tokens, vocab.state) || names(tokens, vocab.subject),
  C: (tokens, vocab) => names(tokens, vocab.surface),
};
type Reading = { readonly kind: "finding" | "marker" | "none"; readonly reason: string };
function markerOf(row: RowId, text: string, tokens: readonly string[], vocab: Vocabulary): string | undefined {
  const lexicon = vocab.markers[row];
  const word = tokens.find(token => lexicon.words.includes(token));
  if (word !== undefined) return word;
  const pair = lexicon.pairs.find(candidate => hasPair(tokens, [candidate]));
  if (pair !== undefined) return pair.join(" ");
  return CONTRACTION.test(fold(text)) ? "n't" : undefined;
}
/** One row on one sentence: none (no family word or no subject), quiet by its marker, or a finding naming its families. */
function readRow(row: RowId, text: string, vocab: Vocabulary = VOCABULARY): Reading {
  const tokens = words(text);
  const families = vocab.rows[row].filter(id => names(tokens, vocab.families[id]));
  if (families.length === 0 || !SUBJECT_OF[row](tokens, vocab)) return { kind: "none", reason: "" };
  const marker = markerOf(row, text, tokens, vocab);
  return marker === undefined ? { kind: "finding", reason: families.join("+") } : { kind: "marker", reason: marker };
}
/** The census verdict on one sentence: null (quiet) or every row's finding `<row>:<families>`, joined by a space. */
function verdict(text: string, vocab: Vocabulary = VOCABULARY): string | null {
  const found = ROW_IDS.flatMap(row => {
    const reading = readRow(row, text, vocab);
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
/** How a .md page cuts one line read between "a" and "z": joined to both, cut before it, cut around it, blank, or other. */
function shapeOf(line: string): string {
  const out = sentences(`a\n${line}\nz`, true);
  const first = out[0];
  const last = out[out.length - 1];
  if (out.length === 1) return "joined";
  if (first === undefined || last === undefined || first.text !== "a" || first.line !== 1) return "other";
  if (last.text === "z" && last.line === 3) return out.length === 2 ? "blank" : out[1]?.line === 2 ? "around" : "other";
  return last.text.endsWith(" z") && out.some(sentence => sentence.line === 2) ? "before" : "other";
}
/** The single-character classes the cuts read, each probed over every BMP code point: the line end, the terminators and the
 * white space after one, a blank line, the marks of a line read alone (a table row, a heading) and of a list item, and each
 * indentation, follower, digit and closer those marks take. */
const CLASS_PROBES: Readonly<Record<string, (char: string) => boolean>> = {
  "ends a line": char => sentences(`a${char}#`, true).length === 2,
  "ends a sentence before a space": char => sentences(`a${char} b`, false).length === 2,
  "follows a terminator": char => sentences(`a.${char}b`, false).length === 2,
  "makes a blank line": char => shapeOf(char) === "blank",
  "marks a line read alone": char => shapeOf(`${char} b`) === "around",
  "marks a list item": char => shapeOf(`${char} b`) === "before",
  "indents a table row": char => shapeOf(`${char}| b`) === "around",
  "indents a heading": char => shapeOf(`${char}# b`) === "around",
  "follows a heading mark": char => shapeOf(`#${char}b`) === "around",
  "indents a list item": char => shapeOf(`${char}- b`) === "before",
  "follows a list mark": char => shapeOf(`-${char}b`) === "before",
  "numbers a list item": char => shapeOf(`${char}) b`) === "before",
  "closes a list number": char => shapeOf(`1${char} b`) === "before",
};

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
/** The status phrase of line 3 at the pin: what a shipped producer would stop printing. */
const PROPOSED_STATUS = "proposed extensions; none of the new exports claimed shipped";
interface ProducerFlip {
  readonly status: string;
  readonly subjectSrcFiles: number;
  readonly triage: string;
}
/** The producer controls: all three conditions flipped, then each one held back (the status line once per phrase and once
 * capitalized), and the two near misses that stay flipped (a longer status word, a triage line not in upper case). */
const PRODUCER_FLIPS: Readonly<Record<string, ProducerFlip>> = {
  "all three flipped": { status: "shipped extensions", subjectSrcFiles: 1, triage: "marked SHIPPED" },
  "status still proposed": { status: "proposed extensions", subjectSrcFiles: 1, triage: "marked SHIPPED" },
  "status still claims none shipped": { status: "shipped extensions; none of the new exports claimed shipped", subjectSrcFiles: 1, triage: "marked SHIPPED" },
  "src still names no subject": { status: "shipped extensions", subjectSrcFiles: 0, triage: "marked SHIPPED" },
  "triage still PROPOSED": { status: "shipped extensions", subjectSrcFiles: 1, triage: "marked PROPOSED" },
  "status still Proposed, capitalized": { status: "Proposed extensions", subjectSrcFiles: 1, triage: "marked SHIPPED" },
  "status word only holding proposed": { status: "unproposed extensions", subjectSrcFiles: 1, triage: "marked SHIPPED" },
  "triage reading Proposed, not upper case": { status: "shipped extensions", subjectSrcFiles: 1, triage: "marked Proposed" },
};
/** The recorded producer with line 3's status phrase, the tip's subject src count and the triage marking replaced. */
function producerWith(flip: ProducerFlip): ProducerReading {
  const { lines, tip } = ROSTER.producer;
  return producerOf({
    lines: lines.map(entry => (entry.line === 3 ? { ...entry, text: entry.text.replace(PROPOSED_STATUS, flip.status) } : entry)),
    tip: { ...tip, subjectSrcFiles: flip.subjectSrcFiles, triage: { ...tip.triage, text: tip.triage.text.replace("marked PROPOSED", flip.triage) } },
  });
}

// ------------------------------------------------------------------------------------------------------------ the closures
interface Closure {
  readonly modules: string[];
  readonly packages: string[];
  readonly builtins: string[];
  readonly unresolved: string[];
}
/** The value specifiers of one module: imports and re-exports that are not type-only, import-equals, require() and import(). */
function valueSpecifiers(path: string, text: string): string[] {
  const kind = /\.tsx$/.test(path) ? ts.ScriptKind.TSX : /\.(?:ts|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
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
/** A local specifier's module. One opening with "/" names no file of the repository: unresolved. One opening with "." is
 * joined to the importing module's directory and resolves to the first file of the candidates; an extension reading is a
 * candidate only where its suffix applies, and a candidate outside the repository is never read. */
function resolveLocal(base: string, from: string, specifier: string): string | undefined {
  if (specifier.startsWith("/")) return undefined;
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  const readings = [joined.replace(/\.js$/, ".ts"), joined.replace(/\.mjs$/, ".mts")].filter(candidate => candidate !== joined);
  const candidates = [...readings, joined, `${joined}.ts`, `${joined}/index.ts`];
  return candidates.find(candidate => !candidate.startsWith("..") && existsSync(join(base, candidate)) && statSync(join(base, candidate)).isFile());
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
interface ReplicaOptions {
  /** Paths `git add` puts in the index (tracked); every other file stays untracked. */
  readonly tracked?: readonly string[];
  /** Patterns of the repository's .git/info/exclude. */
  readonly exclude?: readonly string[];
  /** Patterns of a file the repository's own core.excludesFile names. */
  readonly excludesFile?: readonly string[];
  /** Files written beside the repository, outside it (the repository is then the scratch's repo/ directory). */
  readonly outside?: Readonly<Record<string, string>>;
}
/** A scratch git repository holding `files`, untracked unless named tracked, so gitList reads it exactly as it reads Pi's tree. */
function gitReplica(prefix: string, files: Readonly<Record<string, string>>, options: ReplicaOptions = {}): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  const repo = options.outside === undefined ? dir : join(dir, "repo");
  mkdirSync(repo, { recursive: true });
  execFileSync("git", ["init", "-q"], { cwd: repo, stdio: "pipe" });
  for (const [path, text] of Object.entries(options.outside ?? {})) writeFileSync(join(dir, path), text);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(repo, path)), { recursive: true });
    writeFileSync(join(repo, path), text);
  }
  mkdirSync(join(repo, ".git", "info"), { recursive: true });
  if (options.exclude !== undefined) writeFileSync(join(repo, ".git", "info", "exclude"), `${options.exclude.join("\n")}\n`);
  if (options.excludesFile !== undefined) {
    const excludes = join(repo, ".git", "zz-excludes");
    writeFileSync(excludes, `${options.excludesFile.join("\n")}\n`);
    execFileSync("git", ["config", "core.excludesFile", excludes], { cwd: repo, stdio: "pipe" });
  }
  if (options.tracked !== undefined && options.tracked.length > 0) execFileSync("git", ["add", "--", ...options.tracked], { cwd: repo, stdio: "pipe" });
  return repo;
}
/** A template placeholder opener for planted code, spelled in two parts so no literal of this file holds one. */
const HOLE = "$" + "{";
const LOOKALIKE_E = String.fromCodePoint(0x0435);
const INVISIBLE = String.fromCodePoint(0x200b);
const FULLWIDTH_Q = String.fromCodePoint(0xff31);
const FULLWIDTH_V = String.fromCodePoint(0xff36);
const ADAPTER = "// ActivityBoundary adapter.\n";
/** The findings of one anchored code or doc plant (the adapter comment names the subject on line 1). */
const codeFindings = (body: string, path = "src/plant.ts"): string[] => [...survey([[path, `${ADAPTER}${body}`]]).findings];
const docFindings = (text: string, path = "docs/plant.md"): string[] => [...survey([[path, text]]).findings];
const verdicts = (texts: readonly string[]): Record<string, string | null> => Object.fromEntries(texts.map(text => [text, verdict(text)]));
/** A cut control: an anchored file whose line 3 opens a WARM-inference part and a marker part that only the cut keeps apart. */
const cutFindings = (text: string, path: string): string[] => [...survey([[path, `The ActivityBoundary note.\n\n${text}\n`]]).findings];
/** Each stated cut (read as a .md page and as another file): the WARM part is a finding only where the cut keeps it alone. */
const CUTS: Readonly<Record<string, string>> = {
  "after .": "A WARM context calls inference. The host never waits.",
  "after ;": "A WARM context calls inference; the host never waits.",
  "after !": "A WARM context calls inference! The host never waits.",
  "after ?": "Does a WARM context call inference? The host never waits.",
  "at a blank line": "A WARM context calls inference\n\nthe host never waits",
  "around a table row": "| A WARM context calls inference |\n| the host never waits |",
  "around a heading line": "# A WARM context calls inference\nthe host never waits",
  "before a list item": "the host never waits\n- A WARM context calls inference",
  "after . before a tab": "A WARM context calls inference.\tThe host never waits.",
  "after . at the line end": "A WARM context calls inference.\nthe host never waits",
  "at a blank line between CRLF line ends": "A WARM context calls inference\r\n\r\nthe host never waits",
  "around a table row indented by two spaces": "the host never waits\n  | A WARM context calls inference |",
  "around a heading of six #": "###### A WARM context calls inference\nthe host never waits",
  "around a heading indented by three spaces": "   # A WARM context calls inference\nthe host never waits",
  "around a bare # line": "A WARM context calls inference\n#\nthe host never waits",
  "before a list item numbered 10)": "the host never waits\n10) A WARM context calls inference",
  "before a list item indented by two spaces": "the host never waits\n  - A WARM context calls inference",
};
/** The near misses: no cut keeps the WARM part apart from its marker, so each reads quiet as a .md page and as another file. */
const NEAR_MISSES: Readonly<Record<string, string>> = {
  "a terminator before a letter": "A WARM context calls inference.the host never waits",
  "a heading of seven #": "A WARM context calls inference\n####### the host never waits",
  "a heading indented by four spaces": "A WARM context calls inference\n    # the host never waits",
  "a # without white space": "A WARM context calls inference\n#the host never waits",
  "a list mark without white space": "A WARM context calls inference\n-the host never waits",
  "a number without its closer": "A WARM context calls inference\n1 the host never waits",
  "a pipe inside a line": "A WARM context calls inference | the host never waits",
  "a lone carriage return": "A WARM context calls inference\rthe host never waits",
};
/** The joined twins: one sentence (its marker quiets the WARM part), a sentence wrapped over two lines either way. */
const JOINED: readonly string[] = ["A WARM context calls inference and the host never waits.", "A WARM context calls inference\nthe host never waits", "A WARM context\ncalls inference."];
/** The WORDS statement's examples, each read by words(). */
const WORD_CASES: Readonly<Record<string, string>> = {
  "case change": "ActivityBoundary",
  "lower first": "queryView",
  "two capitals": "DevTools",
  "acronym run": "WARMContext",
  "snake case": "activity_boundary",
  "kebab case": "activity-boundary",
  "fullwidth letter": `${FULLWIDTH_Q}ueryView`,
  "a fullwidth capital after a lower-case letter": `query${FULLWIDTH_V}iew`,
  "a digit inside a run": "query2view",
  "a digit closing a run": "ActivityBoundary2",
  "a digit opening a run": "2warm",
  "a digit before a capital": "Query2View",
  "every letter and digit": "abcdefghijklmnopqrstuvwxyz0123456789",
  "capitals alone": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};
/** The words that are never a marker: the modals, the two conditions and "only". */
const MODALS: readonly string[] = ["should", "must", "shall", "will", "may", "might", "can", "could", "would"];
const CONDITIONS: readonly string[] = ["if", "when"];
const capital = (word: string): string => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
/** One row's sentences holding each word that is never a marker, each a finding of that row. */
const neverMarkerTexts = (modal: (word: string) => string, condition: (word: string) => string, only: string): string[] => [...MODALS.map(modal), ...CONDITIONS.map(word => condition(capital(word))), only];
/** One sentence that names the subject with a row-A violation: planted wherever a file must stay unjudged, and once where it is read. */
const OUTSIDE_TEXT = "The ActivityBoundary keeps a WARM context that calls inference.\n";
const READ_TWIN = "docs/read.md";
const BINARY_PLANT = "docs/binary.md";
/** The plant git holds in its index (tracked), read beside the untracked ones. */
const TRACKED_PLANT = "docs/tracked.md";
/** The ignored plants, one per ignore source git applies: the root .gitignore, a directory's .gitignore, .git/info/exclude
 * and the file core.excludesFile names. */
const IGNORED_PLANTS: readonly string[] = ["docs/ignored.md", "docs/nested/ignored.md", "docs/excluded.md", "docs/global-ignored.md"];
/** A plant under each outside root, and the ignored ones. */
const UNREAD_PLANTS: readonly string[] = [...CONSTANTS.outside.map(root => `${root}/plant.md`), ...IGNORED_PLANTS];
/** A manifest below the root, naming a reactive-fiber package: listed and read as text, never read as the manifest. */
const NESTED_MANIFEST = "examples/pkg/package.json";
/** The replica's manifest: one reactive-fiber package in each dependency field, and one in a field that is never read. */
const REPLICA_MANIFEST = `${JSON.stringify({ dependencies: { "@reactive-fiber/tsx": "0.1.668" }, devDependencies: { "@reactive-fiber/zz-dev": "0.0.0" }, optionalDependencies: { "@reactive-fiber/zz-optional": "0.0.0" }, peerDependencies: { "@reactive-fiber/zz-peer": "0.0.0" }, overrides: { "@reactive-fiber/zz-override": "0.0.0" } }, null, 2)}\n`;
/** The adoption the A1 replica plants: a finding in every read root and for every row, a negated twin, an unanchored page,
 * the unread plants (one per outside root, an ignored file, a binary file) beside their read twin, and the manifest. */
const ADOPTION_PLANTS: Readonly<Record<string, string>> = {
  "docs/plant.md": "# Plant\n\nThe ActivityBoundary keeps a WARM context.\n\nA WARM context calls inference for Pi.\n",
  "docs/plant-twin.md": "The ActivityBoundary keeps a WARM context.\n\nA WARM context never calls inference for Pi.\n",
  "docs/unanchored.md": "A WARM context calls inference for Pi.\n",
  "examples/plant.md": "- ActivityBoundary state is the QueryView identity.\n",
  "src/plant.ts": '// ActivityBoundary adapter.\nexport function warm(state: string): void {\n  if (state === "WARM") {\n    runEffect();\n  }\n}\ndeclare function runEffect(): void;\n',
  "qa/plant.mjs": "// ActivityBoundary: the WARM state owns the speculative execution.\nexport {};\n",
  ".pi/agents/plant.md": "The ActivityBoundary DevTools panel transitions a context to WARM.\n",
  ".agents/plant.md": "- The inspector dispatches the ActivityBoundary transition.\n",
  "README.md": "The inspector writes the ActivityBoundary state.\n",
  ...Object.fromEntries(UNREAD_PLANTS.map(path => [path, OUTSIDE_TEXT])),
  [READ_TWIN]: OUTSIDE_TEXT,
  [TRACKED_PLANT]: OUTSIDE_TEXT,
  [BINARY_PLANT]: `${OUTSIDE_TEXT}${NUL}\n`,
  ".gitignore": "docs/ignored.md\n",
  "docs/nested/.gitignore": "ignored.md\n",
  "package.json": REPLICA_MANIFEST,
  [NESTED_MANIFEST]: `${JSON.stringify({ dependencies: { "@reactive-fiber/zz-nested": "0.0.0" } }, null, 2)}\n`,
};
/** The replica's git setup beside its files: the tracked plant, and the two ignore sources that live outside the tree. */
const ADOPTION_GIT: ReplicaOptions = { tracked: [TRACKED_PLANT], exclude: ["docs/excluded.md"], excludesFile: ["docs/global-ignored.md"] };
/** The surfaces the C2 replica plants: the closure forms beside their twins, each resolution candidate, two non-surfaces named
 * for one, and the residuals. */
const SURFACE_PLANTS: Readonly<Record<string, string>> = {
  "src/ui/plant-inspector.ts": 'import { a } from "./plant-a.js";\nexport const x = a;\n',
  "src/ui/plant-a.ts": 'import { b } from "../plant-b.js";\nexport const a = b;\n',
  "src/plant-b.ts": 'import { writeFileSync } from "node:fs";\nexport const b = writeFileSync;\n',
  "src/ui/plant-typed-inspector.ts": 'import type { Stats } from "node:fs";\nexport type S = Stats;\n',
  "src/ui/plant-typed-names-inspector.ts": 'import { type Stats } from "node:fs";\nexport type S = Stats;\n',
  "src/ui/plant-mixed-names-inspector.ts": 'import { type Stats, statSync } from "node:fs";\nexport type S = Stats;\nexport const s = statSync;\n',
  "src/ui/plant-typed-export-inspector.ts": 'export type { Stats } from "node:fs";\n',
  "src/ui/plant-typed-names-export-inspector.ts": 'export { type Stats } from "node:fs";\n',
  "src/ui/plant-value-export-inspector.ts": 'export { Stats } from "node:fs";\n',
  "src/ui/plant-mixed-export-inspector.ts": 'export { type Stats, statSync } from "node:fs";\n',
  "src/ui/plant-equals-inspector.ts": 'import fs = require("node:fs");\nexport const e = fs;\n',
  "src/ui/plant-typed-equals-inspector.ts": 'import type fs = require("node:fs");\nexport type F = typeof fs;\n',
  "src/ui/plant-dynamic-devtools.ts": 'export const load = () => import("node:child_process");\n',
  "src/ui/plant-require-dev-tools.ts": 'const cp = require("child_process");\nexport { cp };\n',
  "src/ui/plant-reexport-inspector.ts": 'export * from "node:net";\n',
  "src/ui/plant-unresolved-inspector.ts": 'import { z } from "./missing.js";\nexport const q = z;\n',
  // Each remaining declaration form, beside its type-only twin where TypeScript has one.
  "src/ui/plant-bare-import-inspector.ts": 'import "node:child_process";\n',
  "src/ui/plant-default-inspector.ts": 'import fs from "node:fs";\nexport const d = fs;\n',
  "src/ui/plant-typed-default-inspector.ts": 'import type fs from "node:fs";\nexport type F = typeof fs;\n',
  "src/ui/plant-namespace-inspector.ts": 'import * as fs from "node:fs";\nexport const n = fs;\n',
  "src/ui/plant-typed-namespace-inspector.ts": 'import type * as fs from "node:fs";\nexport type F = typeof fs;\n',
  "src/ui/plant-deferred-inspector.ts": 'import defer * as fs from "node:fs";\nexport const n = fs;\n',
  "src/ui/plant-default-names-inspector.ts": 'import fs, { statSync } from "node:fs";\nexport const d = [fs, statSync];\n',
  "src/ui/plant-default-typed-names-inspector.ts": 'import fs, { type Stats } from "node:fs";\nexport const d = fs;\nexport type S = Stats;\n',
  "src/ui/plant-default-namespace-inspector.ts": 'import fs, * as ns from "node:fs";\nexport const d = [fs, ns];\n',
  "src/ui/plant-empty-names-inspector.ts": 'import {} from "node:fs";\n',
  "src/ui/plant-empty-export-inspector.ts": 'export {} from "node:fs";\n',
  "src/ui/plant-namespace-export-inspector.ts": 'export * as ns from "node:net";\n',
  "src/ui/plant-typed-namespace-export-inspector.ts": 'export type * as ns from "node:net";\n',
  "src/ui/plant-typed-reexport-inspector.ts": 'export type * from "node:net";\n',
  "src/ui/plant-export-equals-inspector.ts": 'export import fs = require("node:fs");\n',
  "src/ui/plant-template-dynamic-devtools.ts": "export const load = () => import(`node:child_process`);\n",
  "src/ui/plant-template-require-devtools.ts": "const cp = require(`node:child_process`);\nexport { cp };\n",
  "src/ui/plant-subpath-inspector.ts": 'import { readFile } from "fs/promises";\nexport const r = readFile;\n',
  "src/ui/plant-unused-inspector.ts": 'import { statSync } from "node:fs";\n',
  "src/ui/plant-type-import-inspector.ts": 'export type F = typeof import("node:fs");\n',
  // A surface per module extension, each loading its builtin in a syntax only its own parse reads (a type assertion in
  // TypeScript, a JSX child with JSX), and one named for a surface by its directory.
  "src/ui/plant-assertion-inspector.ts": 'export const e = <unknown>require("node:os");\n',
  "src/ui/plant-ext-inspector.mts": 'export const e = <unknown>require("node:os");\n',
  "src/ui/plant-ext-inspector.cts": 'export const e = <unknown>require("node:os");\n',
  "src/ui/plant-ext-inspector.tsx": 'export const view = <b>{require("node:os")}</b>;\n',
  "src/ui/plant-ext-inspector.js": 'export const view = <b>{require("node:os")}</b>;\n',
  "src/ui/plant-ext-inspector.mjs": 'export const view = <b>{require("node:os")}</b>;\n',
  "src/ui/plant-ext-inspector.cjs": 'module.exports = <b>{require("node:os")}</b>;\n',
  "src/ui/devtools/plant-view.ts": 'import { EOL } from "node:os";\nexport const e = EOL;\n',
  "src/ui/plant-inspector-data.json": '{ "fs": "node:fs" }\n',
  "src/ui/plant-inspector-view.jsx": 'import { EOL } from "node:os";\nexport const e = EOL;\n',
  // The resolution order: each adjacent pair of candidates present together, the earlier one pure and the later impure.
  "src/ui/plant-order-js-inspector.ts": 'import { o } from "./plant-o1.js";\nexport const x = o;\n',
  "src/ui/plant-o1.ts": "export const o = 1;\n",
  "src/ui/plant-o1.js": 'import { arch } from "node:os";\nexport const o = arch;\n',
  "src/ui/plant-order-mjs-inspector.ts": 'import { o } from "./plant-o2.mjs";\nexport const x = o;\n',
  "src/ui/plant-o2.mts": "export const o = 2;\n",
  "src/ui/plant-o2.mjs": 'import { arch } from "node:os";\nexport const o = arch;\n',
  "src/ui/plant-order-written-inspector.ts": 'import { o } from "./plant-o3.js";\nexport const x = o;\n',
  "src/ui/plant-o3.js": "export const o = 3;\n",
  "src/ui/plant-o3.js.ts": 'import { arch } from "node:os";\nexport const o = arch;\n',
  "src/ui/plant-order-index-inspector.ts": 'import { o } from "./plant-o4";\nexport const x = o;\n',
  "src/ui/plant-o4.ts": "export const o = 4;\n",
  "src/ui/plant-o4/index.ts": 'import { arch } from "node:os";\nexport const o = arch;\n',
  // The specifier shapes: a dot form other than ./ and ../, an absolute path, and a path that leaves the repository.
  "src/ui/plant-dot-inspector.ts": 'import { s } from ".plant-dot";\nexport const x = s;\n',
  "src/ui/.plant-dot.ts": 'import { arch } from "node:os";\nexport const s = arch;\n',
  "src/ui/plant-absolute-inspector.ts": 'import { s } from "/plant-abs.js";\nexport const x = s;\n',
  "src/ui/plant-abs.ts": "export const s = 0;\n",
  "src/ui/plant-escape-inspector.ts": 'import { s } from "../../../plant-outside.js";\nexport const x = s;\n',
  "src/ui/plant-property-loader-inspector.ts": 'export const cp = (): unknown => module.require("node:child_process");\n',
  "src/ui/plant-mts-inspector.ts": 'import { m } from "./plant-m.mjs";\nexport const x = m;\n',
  "src/ui/plant-m.mts": 'import { hostname } from "node:os";\nexport const m = hostname;\n',
  "src/ui/plant-js-inspector.ts": 'import { j } from "./plant-j.js";\nexport const x = j;\n',
  "src/ui/plant-j.js": 'import { release } from "node:os";\nexport const j = release;\n',
  "src/ui/plant-bare-inspector.ts": 'import { k } from "./plant-k";\nexport const x = k;\n',
  "src/ui/plant-k.ts": 'import { platform } from "node:os";\nexport const k = platform;\n',
  "src/ui/plant-index-inspector.ts": 'import { d } from "./plant-d";\nexport const x = d;\n',
  "src/ui/plant-d/index.ts": 'import { cpus } from "node:os";\nexport const d = cpus;\n',
  "src/ui/plant-inspector-notes.md": "The inspector notes.\n",
  "qa/plant-inspector.mjs": 'import { spawn } from "node:child_process";\nexport const run = spawn;\n',
  "src/ui/plant-panel.ts": 'import { writeFileSync } from "node:fs";\nexport const w = writeFileSync;\n',
  "src/ui/plant-package-inspector.ts": 'import { io } from "fake-io-lib";\nexport const y = io;\n',
  "src/ui/plant-injected-inspector.ts": 'export function render(write: (text: string) => void): void {\n  write("x");\n}\n',
  "src/ui/plant-handed-inspector.ts": 'export function render(store: { append(text: string): void }): void {\n  store.append("x");\n}\n',
  "src/ui/plant-fetch-inspector.ts": "export const send = (url: string): Promise<Response> => fetch(url);\n",
  "src/ui/plant-http-inspector.ts": 'import { request } from "node:http";\nexport const send = request;\n',
  "src/ui/plant-stream-inspector.ts": "export const say = (text: string): boolean => process.stdout.write(text);\n",
  "src/ui/plant-computed-inspector.ts": 'const name = "node:fs";\nexport const load = () => import(name);\n',
  "src/ui/plant-loader-inspector.ts": 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nexport const cp = load("node:child_process");\n',
  "src/ui/plant-global-load-inspector.ts": 'export const fs = (): unknown => process.getBuiltinModule("node:fs");\n',
};
/** The file beside the C2 replica, outside its repository, that the escaping specifier would reach if it were read. */
const SURFACE_OUTSIDE: Readonly<Record<string, string>> = { "plant-outside.ts": 'import { arch } from "node:os";\nexport const s = arch;\n' };
/** Files named for a surface that are not surfaces: three that are not modules (a page, data, a .jsx file) and a module outside src/. */
const NOT_SURFACES: readonly string[] = ["src/ui/plant-inspector-notes.md", "src/ui/plant-inspector-data.json", "src/ui/plant-inspector-view.jsx", "qa/plant-inspector.mjs"];
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
    // The same pass over a scratch git repository holding an adoption: exactly its plants, never an unread plant.
    const replica = gitReplica("km7q6-adopt-", ADOPTION_PLANTS, ADOPTION_GIT);
    const listed = gitList(replica);
    const mirror = survey(readTexts(replica, listed).texts);
    return {
      producer: producerOf(ROSTER.producer),
      producerControls: Object.fromEntries(Object.entries(PRODUCER_FLIPS).map(([name, flip]) => [name, producerWith(flip)])),
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
        // A listed directory cannot be read as a file (recorded); a path gone before its read is dropped.
        unreadable: readTexts(replica, ["docs", "docs/gone.md"]).unreadable,
      },
      quiet: {
        "R-OUTSIDE-ROOTS": {
          unread: Object.fromEntries(UNREAD_PLANTS.map(path => [path, listed.includes(path)])),
          binary: [[...mirror.binary], mirror.anchored.includes(BINARY_PLANT)],
          twin: mirror.findings.filter(finding => finding.startsWith(`${READ_TWIN}:`)),
        },
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
        "A WARM context should call inference.",
        "A WARM context must call inference.",
        "A WARM context shall call inference.",
        "A WARM context will call inference.",
        "If the context is WARM it calls inference.",
        "When the context is WARM it calls inference.",
      ]),
      contraction: [verdict(`A WARM context doesn${CURLY}t call inference.`), verdict("A WARM context does call inference.")],
      code: [
        codeFindings('if (state === "WARM") {\n  await runInference(spec);\n}\n'),
        codeFindings('switch (state) {\n  case "WARM":\n    return infer(spec);\n}\n'),
        codeFindings('if (state === "WARM") throw new Error("a WARM precompute never calls inference");\n'),
      ],
      cuts: Object.fromEntries(Object.entries(CUTS).map(([name, text]) => [name, [cutFindings(text, "docs/cut.md"), cutFindings(text, "docs/cut.txt")]])),
      joined: JOINED.map(text => cutFindings(text, "docs/cut.md")),
      nearMisses: Object.fromEntries(Object.entries(NEAR_MISSES).map(([name, text]) => [name, [cutFindings(text, "docs/cut.md"), cutFindings(text, "docs/cut.txt")]])),
      classes: Object.fromEntries(Object.entries(CLASS_PROBES).map(([name, test]) => [name, codePoints(test, BMP_TOP)])),
      never: verdicts(neverMarkerTexts(word => `A WARM context ${word} call inference.`, word => `${word} the context is WARM it calls inference.`, "A WARM context only calls inference.")),
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
      "R-MARKER-ANYWHERE": {
        prose: [verdict("A WARM context runs effects, not the host."), verdict("A WARM context runs effects for the host.")],
        comment: [codeFindings('// warm path, never logged\nif (state === "WARM") runEffect(spec);\n'), codeFindings('// warm path, logged\nif (state === "WARM") runEffect(spec);\n')],
      },
      "R-PARAPHRASE": {
        "the model": [verdict("A WARM context calls the model."), verdict("A WARM context calls the inference model.")],
        "a completion": [verdict("A WARM context requests a completion."), verdict("A WARM context requests an inference completion.")],
        "a side job": [verdict("A WARM context starts a side job."), verdict("A WARM context starts an effect job.")],
      },
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
      "The ActivityBoundary is the QueryView identity.",
      "The ActivityBoundary is separate from the QueryView identity.",
    ]),
    code: [codeFindings(`export const key = \`${HOLE}activityState}:${HOLE}queryView.id}\`;\n`), codeFindings("export const keys = { state: 1, view: 2 };\n")],
    words: Object.fromEntries(Object.entries(WORD_CASES).map(([name, text]) => [name, words(text).join(" ")])),
    nonSeparators: codePoints(char => words(`q${char}v`).join(" ") !== "q v", UNICODE_TOP),
    contraction: [verdict("ActivityBoundary state doesn't alias the QueryView identity."), verdict(`ActivityBoundary state doesn${CURLY}t alias the QueryView identity.`), verdict("ActivityBoundary state does alias the QueryView identity.")],
    never: verdicts(neverMarkerTexts(word => `ActivityBoundary state ${word} alias the QueryView identity.`, word => `${word} the state is WARM it keys the QueryView.`, "ActivityBoundary state only keys the QueryView.")),
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
    coverage: Object.fromEntries(
      Object.entries(COVERAGE_PLACES).map(([name, entries]) => {
        const texts = [["control", entries[0]?.[1] ?? COVERAGE_TEXT] as const];
        return [name, [uncoveredIn(texts, entries, VOCABULARY), isolatedIn(entries, VOCABULARY)]];
      }),
    ),
    quiet: { "R-SYNONYM": outsideLoad() },
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
      "The inspector writes the WARM context that calls inference.",
    ]),
    code: [codeFindings('inspector.dispatch({ boundary: "WARM" });\n'), codeFindings("export const view = inspector.render(model);\n")],
    never: verdicts(neverMarkerTexts(word => `The inspector ${word} transition the WARM context.`, word => `${word} the inspector opens it writes the state.`, "The inspector only writes the state.")),
    contraction: [verdict("The inspector doesn't transition the WARM context."), verdict(`The inspector doesn${CURLY}t transition the WARM context.`), verdict("The inspector does transition the WARM context.")],
    quiet: {
      "R-SURFACE-OTHER": {
        "a panel": [verdict("The panel transitions the context to WARM."), verdict("The inspector panel transitions the context to WARM.")],
        "a viewer": [verdict("The viewer writes the WARM state."), verdict("The inspector viewer writes the WARM state.")],
        "a dashboard": [verdict("The dashboard dispatches a WARM command."), verdict("The DevTools dashboard dispatches a WARM command.")],
      },
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
    const replica = gitReplica("km7q6-surface-", SURFACE_PLANTS, { outside: SURFACE_OUTSIDE });
    const planted = surfacesOf(gitList(replica));
    const controls = Object.fromEntries(planted.map(surface => [surface, summary(closureOf(replica, surface))]));
    const isPure = (path: string): boolean => pure(closureOf(replica, path));
    return {
      surfaces,
      closures,
      header: headerOf(readFileSync(join(REPO, CONSTANTS.inspector), "utf8")),
      controls,
      notSurfaces: Object.fromEntries(NOT_SURFACES.map(path => [path, planted.includes(path)])),
      quiet: {
        "R-UNNAMED-SURFACE": [planted.includes("src/ui/plant-panel.ts"), closureOf(replica, "src/ui/plant-panel.ts").builtins],
        "R-PACKAGE": [isPure("src/ui/plant-package-inspector.ts"), isPure("src/ui/plant-inspector.ts")],
        "R-INJECTED": {
          "a callback": [isPure("src/ui/plant-injected-inspector.ts"), isPure("src/plant-b.ts")],
          "an object it calls": [isPure("src/ui/plant-handed-inspector.ts"), isPure("src/plant-b.ts")],
        },
        "R-AMBIENT-IO": {
          "a global fetch": [isPure("src/ui/plant-fetch-inspector.ts"), isPure("src/ui/plant-http-inspector.ts")],
          "a process stream": [isPure("src/ui/plant-stream-inspector.ts"), isPure("src/plant-b.ts")],
        },
        "R-COMPUTED-LOAD": {
          "a computed specifier": [isPure("src/ui/plant-computed-inspector.ts"), isPure("src/ui/plant-dynamic-devtools.ts")],
          "a createRequire loader": [closureOf(replica, "src/ui/plant-loader-inspector.ts").builtins, closureOf(replica, "src/ui/plant-require-dev-tools.ts").builtins],
          "a property loader": [isPure("src/ui/plant-property-loader-inspector.ts"), isPure("src/ui/plant-require-dev-tools.ts")],
          "a global": [isPure("src/ui/plant-global-load-inspector.ts"), isPure("src/ui/plant-dynamic-devtools.ts")],
        },
      },
    };
  },
};

/** The outside texts: the owner filing's title and citation line, and docs/10's two recorded sentences. */
function outsideTexts(): string[] {
  const { title, filing } = beadRow();
  return [title, filing, CONSTANTS.docs10ReadOnly, CONSTANTS.docs10Controls];
}
/** Every lexicon of a vocabulary, by name: the subject, the row subjects, each family and each row's markers. */
function lexicons(vocab: Vocabulary = VOCABULARY): (readonly [string, Lexicon])[] {
  return [
    ["subject", vocab.subject],
    ["warm", vocab.warm],
    ["state", vocab.state],
    ["surface", vocab.surface],
    ...FAMILY_IDS.map(id => [`family:${id}`, vocab.families[id]] as const),
    ...ROW_IDS.map(row => [`markers:${row}`, vocab.markers[row]] as const),
  ];
}
/** A word's role in the reading under a vocabulary: subject, surface, its families joined, warm, state, the rows it marks, or none. */
function roleOf(text: string, vocab: Vocabulary = VOCABULARY): string {
  const tokens = words(text);
  if (names(tokens, vocab.subject)) return "subject";
  if (names(tokens, vocab.surface)) return "surface";
  const families = FAMILY_IDS.filter(id => names(tokens, vocab.families[id]));
  if (families.length > 0) return families.join("+");
  if (names(tokens, vocab.warm)) return "warm";
  if (names(tokens, vocab.state)) return "state";
  const rows = ROW_IDS.filter(row => names(tokens, vocab.markers[row]));
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
const producerLine = (line: number): string => ROSTER.producer.lines.find(entry => entry.line === line)?.text ?? "";
/** A role place: the outside text's name, the text, the place (each group a word or pair) and the role each group reads in. */
type Place = readonly [string, string, RegExp, readonly string[]];
/** The place texts, every outside text a role place reads, by name: the title, the filing line, docs/10's two recorded
 * sentences and every producer line the roster vendors. UNCOVERED reads each of them whatever the places table holds. */
function placeTexts(): readonly (readonly [string, string])[] {
  const { title, filing } = beadRow();
  return [
    ["title", title],
    ["filing", filing],
    ["docs/10 controls", CONSTANTS.docs10Controls],
    ["docs/10 read-only", CONSTANTS.docs10ReadOnly],
    ...ROSTER.producer.lines.map(entry => [`line ${entry.line}`, entry.text] as const),
    ["triage", ROSTER.producer.tip.triage.text],
  ];
}
/** The role places, by outside text. Every member these texts spell is read at one (UNCOVERED), and every member read
 * inside a longer group is also read alone in the same text (ISOLATED), so a place deleted from this table reds. */
function places(): readonly Place[] {
  const { title, filing } = beadRow();
  const line3 = producerLine(3);
  const line66 = producerLine(66);
  const triage = ROSTER.producer.tip.triage.text;
  return [
    ["title", title, /^\[SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-(\w+)-R17\] /d, ["driving"]],
    ["title", title, /adopts rf TSX (\w+) \((\w+)\/(\w+)\/(\w+)\/(\w+); gated TSX-RQ7\), a (\w+) context precomputes only explicitly eligible (\w+-\w+) resources under the existing SpeculationBoundary and (\w+) calls (\w+) or (\w+);/d, ["subject", "state", "warm", "state", "state", "warm", "marker:C", "marker:ABC", "inference", "effect"]],
    ["title", title, /; (\w+) (\w+) stays (\w+) from (\w+) identity and (\w+ \w+ \w+); (\w+) only consumes emitted host events\.$/d, ["subject", "state", "marker:B", "query-view", "execution", "surface"]],
    ["title", title, /identity and (\w+ \w+) \w+; /d, ["execution"]],
    ["title", title, /identity and \w+ (\w+ \w+); /d, ["execution"]],
    ["filing", filing, /-computation-and-(\w+)-2026-10-17\.md:66@/d, ["driving"]],
    ["filing", filing, /including existing \S+ '(\w+) premature optimizer/d, ["marker:ABC"]],
    ["filing", filing, /Pi's (\w+) consumes emitted host events only/d, ["surface"]],
    ["filing", filing, /but (\w+) bead binds (\w+) (\w+) or (\w+) eligibility \(bd search '(\w+)' empty\)/d, ["marker:ABC", "subject", "state", "warm", "subject"]],
    ["filing", filing, /Acceptance: adoption-time falsifier that a (\w+) precompute attempting (\w+) or an (\w+) is (\w+), that boundary (\w+) (\w+) aliases (\w+) identity or (\w+ \w+ \w+), and that (\w+)-style surfaces stay (\w+-\w+) consumers\./d, ["warm", "inference", "effect", "marker:A", "state", "marker:ABC", "query-view", "execution", "surface", "marker:C"]],
    ["filing", filing, /aliases QueryView identity or (\w+ \w+) \w+, and/d, ["execution"]],
    ["filing", filing, /aliases QueryView identity or \w+ (\w+ \w+), and/d, ["execution"]],
    ["docs/10 controls", CONSTANTS.docs10Controls, /^(\w+) (\w+) on (\w+) explicit (\w+) require/d, ["driving", "driving", "marker:B", "driving"]],
    ["docs/10 read-only", CONSTANTS.docs10ReadOnly, /^A (\w+-\w+) rich (\w+) now offers/d, ["marker:C", "surface"]],
    ["line 3", line3, /\[Adaptive Computation and (\w+)\]\(/d, ["driving"]],
    ["line 3", line3, /\/adaptive-computation-and-(\w+)-2026-10-17\)/d, ["driving"]],
    ["line 66", line66, /^(\w+) (\w+)\/(\w+)\/(\w+)\/(\w+) remains (\w+) from (\w+) identity and (\w+ \w+ \w+)\. A (\w+) context may precompute only explicitly eligible (\w+-\w+) resources under existing SpeculationBoundary, (\w+) call (\w+)\/(\w+)\./d, ["subject", "state", "warm", "state", "state", "marker:B", "query-view", "execution", "warm", "marker:C", "marker:ABC", "inference", "effect"]],
    ["line 66", line66, /identity and (\w+ \w+) \w+\. A /d, ["execution"]],
    ["line 66", line66, /identity and \w+ (\w+ \w+)\. A /d, ["execution"]],
    ["line 66", line66, /aborted attempt (\w+) registration/d, ["marker:ABC"]],
    ["line 66", line66, /share one host (\w+ \w+) (\w+) premature unsubscribe/d, ["query-view", "marker:ABC"]],
    ["line 66", line66, /TSX-RQ7 existing \S+ (\w+) premature optimizer/d, ["marker:ABC"]],
    ["line 66", line66, /(\w+) only consumes emitted host events\.$/d, ["surface"]],
    ["triage", triage, /the Activity (\w+) (\w+)\/(\w+)\/(\w+)\/(\w+) exactly once/d, ["state", "state", "warm", "state", "state"]],
    ["triage", triage, /declaring an (\w+) and reading a status \(ruling R-03\); (\w+) and SpeculationBoundary/d, ["subject", "subject"]],
  ];
}
/** Whether a token run spells a member: a word, or an adjacent pair ("a b"). */
function spells(tokens: readonly string[], member: string): boolean {
  const space = member.indexOf(" ");
  return space < 0 ? tokens.includes(member) : hasPair(tokens, [[member.slice(0, space), member.slice(space + 1)]]);
}
/** UNCOVERED: with every group of a text's places blanked, each vocabulary member the text still spells. */
function uncoveredIn(texts: readonly (readonly [string, string])[], entries: readonly Place[], vocab: Vocabulary): string[] {
  const spans = new Map<string, (readonly [number, number])[]>();
  for (const [name, text, rx] of entries) {
    const groups = (rx.exec(text)?.indices?.slice(1) ?? []).filter((span): span is [number, number] => span !== undefined);
    spans.set(name, [...(spans.get(name) ?? []), ...groups]);
  }
  const all = members(vocab);
  return texts.flatMap(([name, text]) => {
    const mask = new Array<boolean>(text.length).fill(false);
    for (const [start, end] of spans.get(name) ?? []) mask.fill(true, start, end);
    let blanked = "";
    for (let at = 0; at < text.length; at += 1) blanked += mask[at] ? " " : text[at];
    const tokens = words(blanked);
    return all.filter(member => spells(tokens, member)).map(member => `${name}:${member}`);
  });
}
/** ISOLATED: each member a text's groups spell that no group of the same text reads alone (its whole group). */
function isolatedIn(entries: readonly Place[], vocab: Vocabulary): string[] {
  const all = members(vocab);
  const inside = new Map<string, Set<string>>();
  const alone = new Map<string, Set<string>>();
  for (const [name, text, rx] of entries) {
    for (const group of rx.exec(text)?.slice(1) ?? []) {
      const tokens = words(group);
      inside.set(name, new Set([...(inside.get(name) ?? []), ...all.filter(member => spells(tokens, member))]));
      alone.set(name, new Set([...(alone.get(name) ?? []), ...all.filter(member => member === tokens.join(" "))]));
    }
  }
  return [...inside].flatMap(([name, spelled]) => [...spelled].filter(member => !(alone.get(name)?.has(member) ?? false)).map(member => `${name}:${member}`));
}
/** The coverage controls: a text no group reads, a word read alone, a pair read only inside a longer group, and the same pair
 * read apart too. */
const COVERAGE_TEXT = "The QueryView state never calls inference.";
const PHRASE_TEXT = "The speculative execution ownership never waits.";
const COVERAGE_PLACES: Readonly<Record<string, readonly Place[]>> = {
  "a text read nowhere": [],
  "a word read alone": [["control", COVERAGE_TEXT, /^The (\w+) state/d, ["query-view"]]],
  "a pair read inside a phrase only": [["control", PHRASE_TEXT, /^The (\w+ \w+ \w+) never/d, ["execution"]]],
  "the pairs read apart too": [
    ["control", PHRASE_TEXT, /^The (\w+ \w+ \w+) never/d, ["execution"]],
    ["control", PHRASE_TEXT, /^The (\w+ \w+) \w+ never/d, ["execution"]],
    ["control", PHRASE_TEXT, /^The \w+ (\w+ \w+) never/d, ["execution"]],
  ],
};
const OUTSIDE_KEYS = ["labels", "title", "producer", "places", "roleless", "uncovered", "isolated", "unspelled"] as const;
type OutsideReadings = Readonly<Record<(typeof OUTSIDE_KEYS)[number], Json>>;
/** Every judged-set reading of an outside text under a vocabulary; the judged set holds each to a literal (OUTSIDE LOAD). */
function outsideReadings(vocab: Vocabulary): OutsideReadings {
  const { title } = beadRow();
  const [labelA = "", labelB = "", labelC = ""] = ROWS.map(row => row.label);
  const warmClause = /, (a WARM context precomputes .+? never calls inference or effects);/.exec(title)?.[1] ?? "";
  const stateClause = /; (ActivityBoundary state stays separate from .+? ownership);/.exec(title)?.[1] ?? "";
  const devtoolsClause = /; (DevTools only consumes emitted host events)\.$/.exec(title)?.[1] ?? "";
  const [separation = "", warmSentence = "", testList = "", consumes = ""] = sentences(producerLine(66), false).map(sentence => sentence.text);
  const read = places().map(([, text, rx]) => (rx.exec(text)?.slice(1) ?? []).map(word => roleOf(word, vocab)));
  return {
    labels: [
      readRow("A", labelA, vocab),
      readRow("A", labelA.replace(/ is refused$/, ""), vocab),
      readRow("B", labelB, vocab),
      readRow("B", labelB.replace(" never ", " "), vocab),
      readRow("C", labelC, vocab),
      readRow("C", `${labelC.replace(/ stay read-only consumers$/, "")} ${CONSTANTS.docs10Controls}`, vocab),
      readRow("C", `${labelC} ${CONSTANTS.docs10Controls}`, vocab),
    ],
    title: [
      readRow("A", warmClause, vocab),
      readRow("A", warmClause.replace(" never ", " "), vocab),
      readRow("B", stateClause, vocab),
      readRow("B", stateClause.replace("stays separate from", "is"), vocab),
      readRow("C", devtoolsClause, vocab),
      names(words(devtoolsClause), vocab.surface),
    ],
    producer: [
      readRow("B", separation, vocab),
      readRow("B", separation.replace("remains separate from", "is"), vocab),
      readRow("A", warmSentence, vocab),
      readRow("A", warmSentence.replace(", not call", " and call"), vocab),
      verdict(testList, vocab),
      readRow("C", consumes, vocab),
    ],
    places: read,
    roleless: read.flat().filter(role => role === "none"),
    uncovered: uncoveredIn(placeTexts(), places(), vocab),
    isolated: isolatedIn(places(), vocab),
    unspelled: lexicons(vocab)
      .filter(([, lexicon]) => !outsideTexts().some(text => names(words(text), lexicon)))
      .map(([name]) => name),
  };
}
/** Every distinct lexicon member, a word or an adjacent pair ("a b"), in lexicon order. */
function members(vocab: Vocabulary): string[] {
  return [...new Set(lexicons(vocab).flatMap(([, lexicon]) => [...lexicon.words, ...lexicon.pairs.map(pair => pair.join(" "))]))];
}
/** The vocabulary with one member taken out of every lexicon that holds it. */
function without(vocab: Vocabulary, member: string): Vocabulary {
  const strip = (lexicon: Lexicon): Lexicon => ({ words: lexicon.words.filter(word => word !== member), pairs: lexicon.pairs.filter(pair => pair.join(" ") !== member) });
  const { families, markers } = vocab;
  return {
    ...vocab,
    subject: strip(vocab.subject),
    warm: strip(vocab.warm),
    state: strip(vocab.state),
    surface: strip(vocab.surface),
    families: { inference: strip(families.inference), effect: strip(families.effect), "query-view": strip(families["query-view"]), execution: strip(families.execution), driving: strip(families.driving) },
    markers: { A: strip(markers.A), B: strip(markers.B), C: strip(markers.C) },
  };
}
/** OUTSIDE LOAD: each member's load (the readings its removal moves); R-SYNONYM is the members that move none. */
function outsideLoad(): { [key: string]: Json } {
  const base = outsideReadings(VOCABULARY);
  const load = members(VOCABULARY).map(member => {
    const moved = outsideReadings(without(VOCABULARY, member));
    return [member, OUTSIDE_KEYS.filter(key => !isDeepStrictEqual(base[key], moved[key]))] as const;
  });
  const synonyms = load
    .filter(([, moved]) => moved.length === 0)
    .map(([member]) => member)
    .sort(byName);
  // With UNCOVERED and ISOLATED holding, a member carries load exactly when a place text spells it.
  const texts = placeTexts().map(([, text]) => words(text));
  expect(synonyms).toEqual(members(VOCABULARY).filter(member => !texts.some(tokens => spells(tokens, member))).sort(byName));
  return {
    synonyms,
    load: Object.fromEntries(load.filter(([, moved]) => moved.length > 0).map(([member, moved]) => [member, [...moved]])),
  };
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
    // Every outside reading under this file's vocabulary, each held to a literal here (B2's OUTSIDE LOAD moves exactly these).
    const outside = outsideReadings(VOCABULARY);
    // Each label: A quiet only by "refused", B only by "never"; C names the surface and no driving word until docs/10 supplies one.
    expect(outside.labels).toEqual([
      { kind: "marker", reason: "refused" },
      { kind: "finding", reason: "inference+effect" },
      { kind: "marker", reason: "never" },
      { kind: "finding", reason: "query-view+execution" },
      { kind: "none", reason: "" },
      { kind: "finding", reason: "driving" },
      { kind: "marker", reason: "read only" },
    ]);
    // The title: its WARM clause is quiet only by "never", its state clause only by "separate"; its DevTools clause names the surface.
    expect(outside.title).toEqual([
      { kind: "marker", reason: "never" },
      { kind: "finding", reason: "inference+effect" },
      { kind: "marker", reason: "separate" },
      { kind: "finding", reason: "query-view+execution" },
      { kind: "none", reason: "" },
      true,
    ]);
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
    expect(sentences(producerLine(66), false).length).toBe(4);
    expect(outside.producer).toEqual([
      { kind: "marker", reason: "separate" },
      { kind: "finding", reason: "query-view+execution" },
      { kind: "marker", reason: "not" },
      { kind: "finding", reason: "inference+effect" },
      null,
      { kind: "none", reason: "" },
    ]);
    // docs/10 and the inspector: the two recorded sentences and the header are present as recorded.
    const docs10 = sentences(readFileSync(join(REPO, CONSTANTS.docs10), "utf8"), true).map(sentence => sentence.text);
    expect([docs10.includes(CONSTANTS.docs10ReadOnly), docs10.includes(CONSTANTS.docs10Controls)]).toEqual([true, true]);
    expect(headerOf(readFileSync(join(REPO, CONSTANTS.inspector), "utf8"))).toBe(CONSTANTS.inspectorHeader);
    expect(filing.includes("(docs/workbench/10)") && CONSTANTS.docs10.startsWith("docs/workbench/10-")).toBe(true);
    // Every subject, state, surface, family and marker word or pair an outside text spells at a fixed place reads in its role;
    // the place texts are the seven recorded texts, and every place reads one of them.
    expect(outside.places).toEqual(places().map(([, , , roles]) => [...roles]));
    expect(placeTexts().map(([name]) => name)).toEqual(["title", "filing", "docs/10 controls", "docs/10 read-only", "line 3", "line 66", "triage"]);
    expect(places().filter(([name, text]) => !placeTexts().some(([known, recorded]) => known === name && recorded === text)).map(([name]) => name)).toEqual([]);
    // Four readings no literal of this file sets: every word an outside text spells at a role place has a role; with every
    // role place blanked, no place text spells a member; every member read inside a longer group is also read alone in the
    // same text; and every lexicon keeps a member an outside text spells.
    expect(outside.roleless).toEqual([]);
    expect(outside.uncovered).toEqual([]);
    expect(outside.isolated).toEqual([]);
    expect(outside.unspelled).toEqual([]);
    // The read set partitions Pi's tracked top level: every directory is read or outside, never both.
    expect(CONSTANTS.readRoots.filter(root => CONSTANTS.outside.includes(root))).toEqual([]);
    expect(trackedTop(REPO).filter(directory => CONSTANTS.readRoots.includes(directory) === CONSTANTS.outside.includes(directory))).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-UNANCHORED", "R-SPLIT", "R-MARKER-ANYWHERE", "R-PARAPHRASE", "R-COMPOSED", "R-LOOKALIKE", "R-SYNONYM", "R-SURFACE-OTHER", "R-UNNAMED-SURFACE", "R-PACKAGE", "R-INJECTED", "R-AMBIENT-IO", "R-COMPUTED-LOAD"]);
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
