/**
 * wb-km7q.2 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R7, program-triage-2026-10-18 child of wb-km7q), the
 * until-then leg of a gating carrier. Statement (the bead title): "If Pi ever supplies speculation or freshness inputs to
 * ReactiveComponentsSDK assembly (RC extension 2 acquire/include/place; design only; gated RC-RQ1..RC-RQ7), speculation
 * controls resource acquisition at the Pi host only and never assembler execution, Pi decides temporal freshness, and no Pi
 * surface expects the assembler to acquire resources, schedule acquisition or judge freshness."
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C joined by one space are this clause word for word, read
 * from the tracked bead export): "gating census — no Pi code or doc expects the assembler to acquire, schedule or judge
 * freshness until the RC gates pass and an actual Pi seam exists".
 * CLAIMED: that clause exactly. NOT CLAIMED (ROSTER.unclaimed, each held to the title): the title's two armed duties
 * ("speculation controls resource acquisition at the Pi host only and never assembler execution", "Pi decides temporal
 * freshness") bind once Pi supplies speculation or freshness inputs to assembly; no Pi input reaches an assembler today (C2),
 * so there is nothing to judge.
 *
 * THE ARTIFACT AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat on 2026-10-26 in the local
 * ReactiveComponentsSDK checkout with git show; this census is hermetic and never re-reads it): the charter
 * docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is one blob (45e62320) at the bead pin
 * 44b72145b175 and at origin/master 04e614620b0c, and the roster vendors four of its lines with their sha256 (UTF-8, no line
 * end): :3 the status line ("design only"), :12 the acquire/include/place split, :38 the scope boundary ("No model execution,
 * tool dispatch, global cache or resource acquisition scheduler" ... "let host decide temporal freshness") and :46 the
 * acceptance line naming RC-RQ1..RC-RQ7. The :12 split sentence itself names the assembler beside acquire and obtain with no
 * negation, so it reads as a finding (C1's readings): a Pi page quoting it verbatim is held to the guard, and Pi restates the
 * split with a negation, as the charter's own next sentence does ("Speculation controls acquisition at the host, not
 * assembler execution.", read MARKER).
 * GATE: rcGateOf(producer) reads PASSED only when the status line no longer carries "design only" and the acceptance line still
 * names all seven gates, NOT-PASSED otherwise (a missing line fails closed). The Pi side (C2) reads PRESENT once a Pi code
 * module names a ReactiveComponents module (outside its comments) or package.json depends on one, ABSENT otherwise. gateOf is
 * OPEN only when the RC gates read PASSED and the Pi seam reads PRESENT; while it reads CLOSED the guard requires zero
 * findings, and on OPEN it stands down (the title's armed duties then govern).
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the
 *   runs of a-z and 0-9 (ReactiveComponentsSDK reads reactive components sdk; rcAssembler reads rc assembler; snake_case and
 *   kebab-case split at their separators).
 * - SUBJECT (the assembler): the words assembler and assemblers, whatever assembler they name (Pi has none of its own: A2's
 *   frozen pass reads 0 code readings naming one); the RC name - the adjacent pairs reactive components and rc sdk, or a word
 *   opening with reactivecomponent (reactivecomponents, reactivecomponentssdk); an ASSEMBLY word (assembly, assemblies,
 *   assemble, assembles, assembled, assembling) only when the same text carries an ANCHOR word (context, contexts, component,
 *   components, rc, rf, fiber) - an assembly word with no anchor is Pi's own sense (a reply assembly, an assembled prompt)
 *   and reads UNANCHORED (R-UNANCHORED). rc or RC alone is an anchor, never the subject (R-SHORT-NAME).
 * - FAMILIES (what no Pi surface may expect of it; the clause's verbs and the title's speculation): acquire (acquire,
 *   acquires, acquired, acquiring, acquisition, acquisitions, obtain, obtains, obtained, obtaining, speculate, speculates,
 *   speculated, speculating, speculation, speculations, speculative, speculatively - the charter defines acquire as whether
 *   the host obtains a resource, and speculation as what controls acquisition); schedule (schedule, schedules, scheduled,
 *   scheduling, scheduler, schedulers and the reschedule forms); freshness (fresh, fresher, freshest, freshness, stale, staler,
 *   stalest, staleness).
 * - MARKERS: not, no, never, nor, neither, without, cannot, until, unless, gated, unshipped, proposed, none and nothing as
 *   words, the n't contraction, and the pair design only. A modal (should, must, shall, will) or an if/when condition is
 *   never a marker: "the assembler should acquire" is an expectation.
 * - READING of one text: none when it carries no family word or no assembler word; UNANCHORED when its only assembler words
 *   are assembly words with no anchor; MARKER when it names the subject and a family beside a marker (R-MARKER-ANYWHERE);
 *   otherwise a FINDING naming its families. Pi states the charter's split with a negation ("the assembler never acquires"),
 *   so a sentence naming the assembler beside a family word without one is read as expecting it.
 * - CODE (row A, "no Pi code"): every git-listed JS or TS module (tracked or untracked, never ignored) below src/, qa/ and
 *   examples/ and at the repository root, parsed with the TypeScript compiler. Its readings: LEXEME each identifier, string
 *   literal, regular expression literal and template part, and each template, template literal type or concatenation as
 *   spelled (its literal parts in order, a non-constant part read as one space); ACCESS each property access as written, each element access and each indexed access type as its
 *   receiver joined to its constant key (or "?"), and each destructured property joined after its initializer (or its
 *   parameter's type); MEMBER each member name of an object literal, interface, type literal, class or enum joined after the
 *   names of its named enclosing declarations; IMPORT each imported or re-exported name joined after its module specifier;
 *   COMMENT each sentence of each comment, read from the trivia around every token (an empty block's comment included). A
 *   finding is `<path>:<line> <via> <families>`.
 * - DOC (row A, "or doc"): every git-listed .md page below docs/, examples/, .agents/ and .pi/ and at the repository root,
 *   cut into sentences after ".", "!", "?" or ";" before white space or the line end, at a blank line, around a table row
 *   and a heading line, and before a list item (a sentence wrapped over lines stays one). A finding is `<path>:<line>
 *   <families>`.
 * - SEAM (row C, "an actual Pi seam"): the one path by which assembled context reaches Pi is the registered
 *   reactivefiber.render.preview capability (read), spawned at the one rf launch site in src (a child-process launcher whose
 *   first argument's constant names rf: exactly the provider's spawn). Its spawned argv for both input arms and the
 *   environment names it hands rf (recorded by a stand-in rf on PATH in a makeScratch directory, the workspace value read as
 *   <root>) and every property name of its input schema are read word by word: a family word is a finding `<where>:<index>
 *   <families>`, no subject needed (the seam is the subject).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "gating census — no Pi code or doc expects the assembler": A1 the guard - ONE pass over every code module, every doc
 *    page, the seam's words and in-memory positives finds exactly the positives, and the same guard over a scratch git
 *    repository finds exactly its plants; A2 the code read set, the live and frozen code passes and the code reader's
 *    controls; A3 the doc read set, the live and frozen doc passes and the sentence cutter; A4 the subject words, the anchors
 *    and the markers.
 *  B "to acquire, schedule or judge freshness": B1 the acquire family, B2 the schedule family, B3 the freshness family, each in
 *    a doc sentence and in code, with near misses.
 *  C "until the RC gates pass and an actual Pi seam exists": C1 the producer facts and the gate's near misses; C2 the Pi seam
 *    reading (no Pi module names a ReactiveComponents module, package.json depends on none, the only rf capability is the
 *    read preview at the one rf launch site, its argv, environment names and input schema carry no family word, docs/03's
 *    context-rendering ownership row).
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row of wb-km7q.2 in the tracked bead export (.beads/issues.jsonl;
 *   the first notes line opening with its citation, so appended notes never move it): its acceptance clause is the three
 *   labels joined, each label tiled by its pins; with its negation and its until-clause removed the clause reads as a finding
 *   of exactly the three families; the title's last clause (from "no Pi surface") with its "no" removed reads as a finding of
 *   exactly the three families, its speculation clause with "never" turned to "and" reads as an acquire finding, its
 *   "ReactiveComponentsSDK assembly" reads as the subject, its gate list RC-RQ1..RC-RQ7 expands to the producer's seven gate
 *   ids, and its citation pins equal the roster's. ROLE PLACES: every family, subject, assembly, marker and anchor word that
 *   the title, the citation line or the producer's lines spell at a fixed place (speculation, freshness, acquisition,
 *   acquire, schedule, obtain, scheduler, assembler, assembly, assembled, ReactiveComponentsSDK, never, no, until, not, design
 *   only, RC, rf, context, component) reads in its role. The producer's :12 last sentence reads MARKER by its "not" and as an
 *   acquire finding without it, and its :38 line names the acquire, schedule and freshness families with no subject.
 *   docs/03's ownership row gives context rendering to ReactiveFiberCLI. So a row, a pin or an anchored word removed from
 *   every literal of this file and of the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer
 *   facts, the unclaimed duties, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/rc-assembler-expectation-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row): R-OUTSIDE-ROOTS (A3) a claim in test/, vendor/, new-feedback/, media/,
 *   .beads/, .codex/ or .github/, a doc that is not a .md page or a code file that is not a JS or TS module (a shell script,
 *   a JSON or text file, root configuration) is not read; R-INDIRECT (A2) the subject and the family never inside one
 *   reading - an alias (const a = assembler; a.acquire()), a call argument (assembler.run("acquire")), a dynamic import's
 *   namespace; R-COMPOSED (A2) a name or key assembled at run time from a non-constant part (a variable holding the family
 *   word); R-SPLIT (A3) the subject and the family in different sentences; R-UNANCHORED (A4) an assembly word with no anchor
 *   beside a family word (Pi's own sense: "The reply assembly is stale."); R-RENDERER (A4) rf or the render named as the
 *   actor with no assembler word ("rf acquires the resource."), the context renderer's own obligations being other beads';
 *   R-SHORT-NAME (A4) RC or rc alone (a return code in Pi's receipts) is an anchor, never the subject ("RC acquires
 *   resources."); R-LOOKALIKE (A4) a look-alike letter, an inserted invisible or an HTML character reference inside a word
 *   (NFKC folds the fullwidth forms, which are read); R-MARKER-ANYWHERE (A4) a marker anywhere in the text quiets it,
 *   whatever it qualifies ("The assembler acquires resources, not the host."); R-SYNONYM (A4) a vocabulary word no outside
 *   text spells (the inflections, fresh and stale, the extra markers) is held by this file and the roster alone - removed
 *   from both together it stays green; A4 lists them; R-PARAPHRASE (B3) a family claim outside the family words (fetch,
 *   prefetch, load, refresh, expire, ttl, queue, defer, up to date); R-SEAM-OTHER (C2) an assembler reached by a path that
 *   names neither the subject nor a ReactiveComponents module (a URL, a spawned program under another name), or an input
 *   reaching it through stdin.
 *
 * Display paths added: none. Test-only: the stand-in rf and the replica trees live in makeScratch scratch with the leak guard
 * installed; Pi's code, docs, the bead export, docs/03, package.json and the frozen tree are only read; nothing is spawned but
 * git and the stand-in rf.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { sectionTables } from "./helpers/census.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type RcGate = "PASSED" | "NOT-PASSED";
type Seam = "PRESENT" | "ABSENT";
type Gate = "OPEN" | "CLOSED";
type Via = "lexeme" | "access" | "member" | "import" | "comment";
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Vocabulary {
  readonly subject: readonly string[];
  readonly subjectPairs: readonly (readonly [string, string])[];
  readonly subjectPrefixes: readonly string[];
  readonly assembly: readonly string[];
  readonly anchors: readonly string[];
  readonly families: { readonly acquire: readonly string[]; readonly schedule: readonly string[]; readonly freshness: readonly string[] };
  readonly markers: readonly string[];
  readonly markerPairs: readonly (readonly [string, string])[];
}
interface Constants {
  readonly codeRoots: readonly string[];
  readonly docRoots: readonly string[];
  readonly outside: readonly string[];
  readonly frozenAt: string;
  readonly docs03: string;
  readonly filing: string;
  readonly capability: string;
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
  readonly measuredAt: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
  readonly gates: readonly string[];
  readonly rcGate: RcGate;
}
interface Roster {
  readonly bead: string;
  readonly producer: Producer;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly unclaimed: readonly { readonly duty: string; readonly reason: string }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/rc-assembler-expectation-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.2";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  codeRoots: ["examples", "qa", "src"],
  docRoots: [".agents", ".pi", "docs", "examples"],
  outside: [".beads", ".codex", ".github", "media", "new-feedback", "test", "vendor"],
  frozenAt: "dc72a6d6d21b",
  docs03: "docs/workbench/03-architecture-and-ownership.md",
  filing: "Citations: docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md:12@",
  capability: "reactivefiber.render.preview",
};
const VOCABULARY: Vocabulary = {
  subject: ["assembler", "assemblers"],
  subjectPairs: [
    ["reactive", "components"],
    ["rc", "sdk"],
  ],
  subjectPrefixes: ["reactivecomponent"],
  assembly: ["assembly", "assemblies", "assemble", "assembles", "assembled", "assembling"],
  anchors: ["context", "contexts", "component", "components", "rc", "rf", "fiber"],
  families: {
    acquire: ["acquire", "acquires", "acquired", "acquiring", "acquisition", "acquisitions", "obtain", "obtains", "obtained", "obtaining", "speculate", "speculates", "speculated", "speculating", "speculation", "speculations", "speculative", "speculatively"],
    schedule: ["schedule", "schedules", "scheduled", "scheduling", "scheduler", "schedulers", "reschedule", "reschedules", "rescheduled", "rescheduling"],
    freshness: ["fresh", "fresher", "freshest", "freshness", "stale", "staler", "stalest", "staleness"],
  },
  markers: ["not", "no", "never", "nor", "neither", "without", "cannot", "until", "unless", "gated", "unshipped", "proposed", "none", "nothing"],
  markerPairs: [["design", "only"]],
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "gating census — no Pi code or doc expects the assembler",
    pins: [
      { id: "A1", quote: "gating census" },
      { id: "A2", quote: "no Pi code" },
      { id: "A3", quote: "or doc" },
      { id: "A4", quote: "expects the assembler" },
    ],
  },
  {
    id: "B",
    label: "to acquire, schedule or judge freshness",
    pins: [
      { id: "B1", quote: "to acquire" },
      { id: "B2", quote: "schedule" },
      { id: "B3", quote: "or judge freshness" },
    ],
  },
  {
    id: "C",
    label: "until the RC gates pass and an actual Pi seam exists",
    pins: [
      { id: "C1", quote: "until the RC gates pass" },
      { id: "C2", quote: "and an actual Pi seam exists" },
    ],
  },
];
const PAGE_TITLE = "03 — High-level architecture, module ownership and dataflow";
const OWNERSHIP_HEADING = "Ownership boundaries";
const RENDER_OWNER = "ReactiveFiberCLI";

// ---------------------------------------------------------------------------------------------------------------- the reader
const SUBJECT = new Set(VOCABULARY.subject);
const ASSEMBLY = new Set(VOCABULARY.assembly);
const ANCHORS = new Set(VOCABULARY.anchors);
const MARKERS = new Set(VOCABULARY.markers);
const FAMILY_IDS = ["acquire", "schedule", "freshness"] as const;
type FamilyId = (typeof FAMILY_IDS)[number];
const FAMILIES: Readonly<Record<FamilyId, ReadonlySet<string>>> = {
  acquire: new Set(VOCABULARY.families.acquire),
  schedule: new Set(VOCABULARY.families.schedule),
  freshness: new Set(VOCABULARY.families.freshness),
};
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
const hasPair = (tokens: readonly string[], pairs: readonly (readonly [string, string])[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
const familiesOf = (tokens: readonly string[]): FamilyId[] => FAMILY_IDS.filter(id => tokens.some(word => FAMILIES[id].has(word)));
/** The RC name: the pair reactive components or rc sdk, or a word opening with the folded package name. */
const namesRc = (tokens: readonly string[]): boolean => hasPair(tokens, VOCABULARY.subjectPairs) || tokens.some(word => VOCABULARY.subjectPrefixes.some(prefix => word.startsWith(prefix)));
const namesSubject = (tokens: readonly string[]): boolean => tokens.some(word => SUBJECT.has(word)) || namesRc(tokens);
interface Reading {
  readonly kind: "finding" | "marker" | "unanchored" | "none";
  readonly families: readonly FamilyId[];
  readonly reason: string;
}
/** One text: none (no family word or no assembler word), unanchored, quiet by a marker, or a finding naming its families. */
function read(text: string): Reading {
  const tokens = words(text);
  const families = familiesOf(tokens);
  const named = namesSubject(tokens);
  const assembly = tokens.find(word => ASSEMBLY.has(word));
  if (families.length === 0 || (!named && assembly === undefined)) return { kind: "none", families: [], reason: "" };
  if (!named && !tokens.some(word => ANCHORS.has(word))) return { kind: "unanchored", families, reason: assembly ?? "" };
  const marker = tokens.find(word => MARKERS.has(word)) ?? (CONTRACTION.test(fold(text)) ? "n't" : undefined) ?? (hasPair(tokens, VOCABULARY.markerPairs) ? "design only" : undefined);
  if (marker !== undefined) return { kind: "marker", families, reason: marker };
  return { kind: "finding", families, reason: families.join("+") };
}
/** The census verdict on one text: null (quiet) or its families joined by "+". */
function verdict(text: string): string | null {
  const reading = read(text);
  return reading.kind === "finding" ? reading.reason : null;
}

// ------------------------------------------------------------------------------------------------------------- the sentences
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

// -------------------------------------------------------------------------------------------------------------- the code reader
interface Site {
  readonly line: number;
  readonly via: Via;
  readonly text: string;
}
function constant(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constant(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(node.left);
    const right = constant(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const value = constant(span.expression);
      if (value === undefined) return undefined;
      text += value + span.literal.text;
    }
    return text;
  }
  return undefined;
}
/** A template or concatenation as it is spelled: its literal parts in order, each non-constant part read as one space. */
function spelled(node: ts.Node): string {
  const value = constant(node);
  if (value !== undefined) return value;
  if (ts.isParenthesizedExpression(node)) return spelled(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return spelled(node.left) + spelled(node.right);
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(span => spelled(span.expression) + span.literal.text).join("");
  return " ";
}
const NAMED_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.ModuleDeclaration,
]);
const MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.EnumMember,
]);
function nameOf(node: ts.Node): string | undefined {
  if (!NAMED_KINDS.has(node.kind)) return undefined;
  const name = (node as ts.NamedDeclaration).name;
  if (name === undefined) return undefined;
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return constant(name.expression);
  return undefined;
}
const COMMENT_MARKS = /^\/\/+|^\/\*+|\*+\/$|^[ \t]*\*+(?!\/)/gm;
/** Every reading of one module: lexemes, accesses, member paths and comment sentences, each with its 1-based line. */
function codeSites(path: string, text: string): Site[] {
  const kind = /\.(?:ts|tsx|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const full = source.getFullText();
  const sites: Site[] = [];
  const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line + 1;
  const comments = new Map<number, number>();
  // Comments by token: the trivia before and after every token and node, so a comment inside an empty block is read too.
  const collect = (node: ts.Node): void => {
    ts.forEachLeadingCommentRange(full, node.getFullStart(), (pos, end) => {
      comments.set(pos, end);
    });
    ts.forEachTrailingCommentRange(full, node.getEnd(), (pos, end) => {
      comments.set(pos, end);
    });
    for (const child of node.getChildren(source)) collect(child);
  };
  collect(source);
  const visit = (node: ts.Node): void => {
    const at = (): number => lineOf(node.getStart(source));
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isTemplateLiteralTypeNode(node)) sites.push({ line: at(), via: "lexeme", text: node.head.text + node.templateSpans.map(span => ` ${span.literal.text}`).join("") });
    else if (ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
      const value = spelled(node);
      if (value.trim() !== "") sites.push({ line: at(), via: "lexeme", text: value });
    } else if (ts.isPropertyAccessExpression(node)) sites.push({ line: at(), via: "access", text: node.getText(source) });
    else if (ts.isElementAccessExpression(node)) sites.push({ line: at(), via: "access", text: `${node.expression.getText(source)}.${constant(node.argumentExpression) ?? "?"}` });
    else if (ts.isIndexedAccessTypeNode(node)) {
      const index = ts.isLiteralTypeNode(node.indexType) ? constant(node.indexType.literal) : undefined;
      sites.push({ line: at(), via: "access", text: `${node.objectType.getText(source)}.${index ?? "?"}` });
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const holder = node.parent.parent;
      const receiver = ts.isVariableDeclaration(holder) ? holder.initializer : ts.isParameter(holder) ? holder.type : undefined;
      const key = node.propertyName ?? node.name;
      const keyText = ts.isIdentifier(key) || ts.isStringLiteralLike(key) || ts.isPrivateIdentifier(key) ? key.text : ts.isComputedPropertyName(key) ? constant(key.expression) : undefined;
      if (receiver !== undefined) sites.push({ line: at(), via: "access", text: `${receiver.getText(source)}.${keyText ?? "?"}` });
    } else if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const names: string[] = [];
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (clause?.name !== undefined) names.push(clause.name.text);
        const bindings = clause?.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
      } else if (node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) names.push((element.propertyName ?? element.name).text);
      }
      for (const name of names) sites.push({ line: at(), via: "import", text: `${from}.${name}` });
    }
    if (MEMBER_KINDS.has(node.kind)) {
      const own = nameOf(node);
      const path: string[] = [];
      for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
        const name = nameOf(parent);
        if (name !== undefined) path.unshift(name);
      }
      if (own !== undefined && path.length > 0) sites.push({ line: at(), via: "member", text: [...path, own].join(".") });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  for (const [pos, end] of [...comments].sort((a, b) => a[0] - b[0])) {
    const body = full.slice(pos, end).replace(COMMENT_MARKS, " ");
    for (const sentence of sentences(body)) sites.push({ line: lineOf(pos) + sentence.line - 1, via: "comment", text: sentence.text });
  }
  return sites;
}
interface Survey {
  readonly findings: string[];
  readonly quieted: string[];
  readonly readings: number;
  readonly named: number;
}
function codeSurvey(path: string, text: string): Survey {
  const findings = new Set<string>();
  const quieted = new Set<string>();
  const sites = codeSites(path, text);
  let named = 0;
  for (const site of sites) {
    const reading = read(site.text);
    const tokens = words(site.text);
    if (namesSubject(tokens)) named += 1;
    if (reading.kind === "finding") findings.add(`${path}:${site.line} ${site.via} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.add(`${path}:${site.line} ${site.via} ${reading.kind}:${reading.reason}`);
  }
  return { findings: [...findings], quieted: [...quieted], readings: sites.length, named };
}
function docSurvey(path: string, text: string): Survey {
  const findings: string[] = [];
  const quieted: string[] = [];
  let named = 0;
  const cut = sentences(text);
  for (const sentence of cut) {
    const reading = read(sentence.text);
    const tokens = words(sentence.text);
    if (namesSubject(tokens)) named += 1;
    if (reading.kind === "finding") findings.push(`${path}:${sentence.line} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.push(`${path}:${sentence.line} ${reading.kind}:${reading.reason}`);
  }
  return { findings, quieted, readings: cut.length, named };
}
const isModule = (path: string): boolean => /\.(?:ts|tsx|mts|cts|js|mjs|cjs)$/.test(path);
const isPage = (path: string): boolean => /\.md$/.test(path);
const atRoot = (path: string): boolean => !path.includes("/");
const underAny = (path: string, roots: readonly string[]): boolean => roots.some(root => path.startsWith(`${root}/`));
const isCode = (path: string): boolean => isModule(path) && (atRoot(path) || underAny(path, CONSTANTS.codeRoots));
const isDoc = (path: string): boolean => isPage(path) && (atRoot(path) || underAny(path, CONSTANTS.docRoots));
interface Pass {
  readonly code: string[];
  readonly docs: string[];
  readonly findings: string[];
  readonly quieted: string[];
  readonly readings: number;
  readonly named: number;
  readonly unreadable: string[];
}
/** One pass over a set of (path, text) pairs: code modules by the code reader, doc pages by the sentence reader. */
function survey(texts: readonly (readonly [string, string])[]): Omit<Pass, "unreadable"> {
  const code: string[] = [];
  const docs: string[] = [];
  const findings: string[] = [];
  const quieted: string[] = [];
  let readings = 0;
  let named = 0;
  for (const [path, text] of texts) {
    const asCode = isModule(path);
    const one = asCode ? codeSurvey(path, text) : docSurvey(path, text);
    (asCode ? code : docs).push(path);
    findings.push(...one.findings);
    quieted.push(...one.quieted);
    readings += one.readings;
    named += one.named;
  }
  return { code, docs, findings, quieted, readings, named };
}
function surveyFiles(base: string, paths: readonly string[]): Pass {
  const texts: [string, string][] = [];
  const unreadable: string[] = [];
  for (const path of paths) {
    try {
      texts.push([path, readFileSync(join(base, path), "utf8")]);
    } catch {
      unreadable.push(path);
    }
  }
  return { ...survey(texts), unreadable };
}

// ------------------------------------------------------------------------------------------------------------- the file sets
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** What git would commit as a code module or a doc page: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const roots = [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots])];
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...roots, ":(glob)*"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path)) && (isCode(path) || isDoc(path))))].sort(byName);
}
/** Every regular file below the roots and at the repository root that the readers take; a symlink is reported, never followed. */
function walkTree(base: string): { readonly files: string[]; readonly links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && (isCode(path) || isDoc(path))) files.push(path);
    }
  };
  for (const root of [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots])].sort(byName)) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (entry.isSymbolicLink() && (isCode(entry.name) || isDoc(entry.name))) links.push(entry.name);
    else if (entry.isFile() && (isCode(entry.name) || isDoc(entry.name))) files.push(entry.name);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
function trackedTop(base: string): { readonly directories: string[]; readonly files: string[] } {
  const out = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 }).split("\0").filter(path => path !== "");
  return {
    directories: [...new Set(out.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort(byName),
    files: out.filter(atRoot).sort(byName),
  };
}
/** A root file the readers skip by design: configuration, the lock, the licence and the ignore files. */
const ROOT_CONFIG = /^(?:LICENSE|\.gitignore|\.npmignore|.+\.(?:json|toml|ya?ml))$/;
const FLOORS = { codeModules: 180, srcModules: 110, docPages: 75, rootPages: 5, readings: 180_000, sentences: 11_000 } as const;
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
/** The frozen tree: every code module and doc page at CONSTANTS.frozenAt, read from git objects (symlinks skipped). */
function frozenTexts(): [string, string][] {
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", CONSTANTS.frozenAt], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  const entries = listing
    .split("\0")
    .filter(line => line !== "")
    .map(line => {
      const [meta = "", path = ""] = line.split("\t");
      const [mode = "", type = "", id = ""] = meta.split(" ");
      return { mode, type, id, path };
    })
    .filter(entry => entry.type === "blob" && entry.mode !== "120000" && (isCode(entry.path) || isDoc(entry.path)));
  const texts = readBlobs([...new Set(entries.map(entry => entry.id))]);
  return entries.map(entry => [entry.path, texts.get(entry.id) ?? ""]);
}
let livePass: Pass | undefined;
/** The live pass over Pi's own tree, computed once and shared by A1 and A2/A3. */
function live(): Pass {
  livePass ??= surveyFiles(REPO, gitList(REPO));
  return livePass;
}

// ---------------------------------------------------------------------------------------------------------------- the seam
const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return dir;
}
const ROOT_WORD = "<root>";
/** A family word in a seam word list (argv or input property names): `<where>:<index> <families>`, no subject needed. */
function seamFindings(where: string, list: readonly string[]): string[] {
  return list.flatMap((word, index) => {
    const families = familiesOf(words(word));
    return families.length === 0 ? [] : [`${where}:${index} ${families.join("+")}`];
  });
}
/** The argv and environment names the registered native capability hands rf for one input, recorded by a stand-in rf
 * placed first on PATH. */
async function spawnedArgv(input: Readonly<Record<string, string>>): Promise<{ readonly argv: string[]; readonly env: string[]; readonly outcome: string }> {
  const dir = scratch("km7q2-rf-");
  const record = join(dir, "argv.json");
  const envelope = join(dir, "envelope.json");
  writeFileSync(envelope, JSON.stringify(fullShapeRf(REPO)));
  const module = join(dir, "stand-in.mjs");
  writeFileSync(module, `import { readFileSync, writeFileSync } from "node:fs";\nwriteFileSync(${JSON.stringify(record)}, JSON.stringify({ argv: process.argv.slice(2), env: Object.keys(process.env).sort() }));\nprocess.stdout.write(readFileSync(${JSON.stringify(envelope)}, "utf8"));\n`);
  const executable = join(dir, "rf");
  writeFileSync(executable, `#!/bin/sh\nexec node ${JSON.stringify(module)} "$@"\n`);
  chmodSync(executable, 0o700);
  process.env.PATH = `${dir}:${oldPath ?? ""}`;
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, REPO);
  let outcome = "returned";
  try {
    await registry.invoke(CONSTANTS.capability, input, { grants: ["reactivefiber:render"], signal: new AbortController().signal });
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    outcome = error.category;
  }
  const recorded = JSON.parse(readFileSync(record, "utf8")) as { argv: string[]; env: string[] };
  return { argv: recorded.argv.map(word => (word === REPO ? ROOT_WORD : word)), env: recorded.env, outcome };
}
/** Every property name a JSON schema declares, at any depth. */
function propertyNames(schema: unknown): string[] {
  if (schema === null || typeof schema !== "object") return [];
  if (Array.isArray(schema)) return schema.flatMap(propertyNames);
  const out: string[] = [];
  for (const [key, value] of Object.entries(schema)) {
    if (key === "properties" && value !== null && typeof value === "object" && !Array.isArray(value)) out.push(...Object.keys(value));
    out.push(...propertyNames(value));
  }
  return [...new Set(out)].sort(byName);
}
/** A Pi code module or package.json dependency naming a ReactiveComponents module: the Pi seam is PRESENT. */
function seamOf(codeSites: readonly string[], dependencies: readonly string[]): Seam {
  return codeSites.length === 0 && dependencies.length === 0 ? "ABSENT" : "PRESENT";
}
function rcSites(texts: readonly (readonly [string, string])[]): string[] {
  return texts.flatMap(([path, text]) => (isModule(path) ? codeSites(path, text).filter(site => site.via !== "comment" && namesRc(words(site.text))).map(site => `${path}:${site.line} ${site.via}`) : []));
}
const LAUNCHERS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
/** Every call of a child-process launcher whose program (the first word of its first argument's constant) is rf. */
function rfLaunchSites(texts: readonly (readonly [string, string])[]): string[] {
  const out = new Set<string>();
  for (const [path, text] of texts) {
    const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : "";
        const first = node.arguments[0];
        const program = first === undefined ? undefined : constant(first)?.trim().split(/\s+/)[0];
        if (LAUNCHERS.has(callee) && program !== undefined && /(?:^|[\\/])rf(?:\.exe)?$/.test(program)) out.add(`${path} ${callee}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return [...out].sort(byName);
}
function rcDependencies(manifest: string): string[] {
  const parsed = JSON.parse(manifest) as Record<string, unknown>;
  return ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].flatMap(field => {
    const table = parsed[field];
    return table !== null && typeof table === "object" ? Object.keys(table).filter(name => namesRc(words(name))) : [];
  });
}

let seamCache: Awaited<ReturnType<typeof readSeam>> | undefined;
/** The seam's words for both input arms and its input schema, read once: every argv, the environment names, the property names. */
async function readSeam() {
  const loaded = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  loaded.registerNativeProviders(registry, REPO);
  const catalog = registry.catalogSnapshot();
  const rf = catalog.filter(entry => entry.descriptor.id.startsWith("reactivefiber.")).map(entry => [entry.descriptor.id, entry.descriptor.effectClass]);
  const inputNames = propertyNames(catalog.find(entry => entry.descriptor.id === CONSTANTS.capability)?.descriptor.inputSchema);
  const legacy = await spawnedArgv({ model: "fixture-model", task: "fixture-task" });
  const view = await spawnedArgv({ view: "fixture-view", taskId: "fixture-task", model: "fixture-model" });
  const findings = [...seamFindings("argv", legacy.argv), ...seamFindings("argv", view.argv), ...seamFindings("env", [...new Set([...legacy.env, ...view.env])].sort(byName)), ...seamFindings("input", inputNames)];
  return { rf, inputNames, legacy, view, findings };
}
async function seamWords(): Promise<Awaited<ReturnType<typeof readSeam>>> {
  seamCache ??= await readSeam();
  return seamCache;
}

// ---------------------------------------------------------------------------------------------------------------- the gate
const GATE_IDS = /RC-RQ([1-9])/g;
function rcGateOf(producer: Pick<Producer, "lines">): RcGate {
  const status = producer.lines.find(line => line.line === 3)?.text;
  const acceptance = producer.lines.find(line => line.line === 46)?.text ?? "";
  const named = new Set([...acceptance.matchAll(GATE_IDS)].map(match => match[0]));
  const whole = [1, 2, 3, 4, 5, 6, 7].every(n => named.has(`RC-RQ${n}`));
  return status !== undefined && !hasPair(words(status), VOCABULARY.markerPairs) && whole ? "PASSED" : "NOT-PASSED";
}
function gateOf(rcGate: RcGate, seam: Seam): Gate {
  return rcGate === "PASSED" && seam === "PRESENT" ? "OPEN" : "CLOSED";
}
function guard(gate: Gate, findings: readonly string[]): "pass" | "fail" | "stand-down" {
  return gate === "OPEN" ? "stand-down" : findings.length === 0 ? "pass" : "fail";
}
let seamReading: { readonly sites: string[]; readonly dependencies: string[] } | undefined;
function piSeam(): { readonly sites: string[]; readonly dependencies: string[]; readonly seam: Seam } {
  seamReading ??= {
    sites: rcSites(
      gitList(REPO)
        .filter(isModule)
        .map(path => [path, readFileSync(join(REPO, path), "utf8")] as const),
    ),
    dependencies: rcDependencies(readFileSync(join(REPO, "package.json"), "utf8")),
  };
  return { ...seamReading, seam: seamOf(seamReading.sites, seamReading.dependencies) };
}

// -------------------------------------------------------------------------------------------------------------- the replicas
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
const codeOf = (text: string, path = "src/plant.ts"): string[] => codeSurvey(path, text).findings;
const docOf = (text: string, path = "docs/plant.md"): string[] => docSurvey(path, text).findings;
const PLANT = "The ReactiveComponents assembler acquires the resources Pi needs.";
const LOOKALIKE_A = String.fromCodePoint(0x0430);
const FULLWIDTH_A = String.fromCodePoint(0xff21);
/** A template placeholder opener for planted code, spelled in two parts so no literal of this file holds one. */
const HOLE = "$" + "{";
const INVISIBLE = String.fromCodePoint(0x200b);

// ------------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const gate = gateOf(rcGateOf(ROSTER.producer), piSeam().seam);
    const real = live();
    const seam = await seamWords();
    const legacy = seam.legacy;
    // ONE pass over every listed module and page, the seam's words and in-memory positives: exactly what the positives find alone.
    const positives: readonly (readonly [string, string])[] = [
      ["docs/workbench/zz-plant.md", `${PLANT}\n`],
      ["src/zz-plant.ts", "export const age = assembler.freshness;\n"],
      ["README.md.plant.md", "- Pi expects the assembler to schedule acquisition.\n"],
    ];
    const seamPositive = [...legacy.argv, "--speculate"];
    const alone = [...survey(positives).findings, ...seamFindings("argv", seamPositive)];
    expect(alone.length).toBeGreaterThanOrEqual(positives.length + 1);
    const texts = gitList(REPO).map(path => [path, readFileSync(join(REPO, path), "utf8")] as const);
    const pass = [...survey([...texts, ...positives]).findings, ...seam.findings, ...seamFindings("argv", seamPositive)];
    expect(pass).toEqual([...real.findings, ...seam.findings, ...alone]);
    const outside = pass.filter(finding => !alone.includes(finding));
    // The same guard over a scratch git repository: a plant per reader and root, each beside a negated twin that stays quiet.
    const plants: Record<string, string> = {
      "docs/workbench/plant.md": "The assembler schedules acquisition for Pi.\n",
      "docs/workbench/plant-twin.md": "The assembler never schedules acquisition for Pi.\n",
      "examples/plant.md": "Pi relies on the context assembly to judge freshness.\n",
      "examples/plant-twin.md": "Pi never relies on the context assembly to judge freshness.\n",
      ".pi/agents/plant.md": "The assembler speculates.\n",
      "README.md": "Pi expects the assembler to judge freshness.\n",
      "src/plant.ts": "export const when = rcAssembler.scheduleAcquisition();\n",
      "src/plant-twin.ts": "export const when = rcAssembler.neverScheduleAcquisition();\n",
      "qa/plant.mjs": "// The assembler decides whether a block is stale.\nexport {};\n",
      "examples/workflows/plant.js": "export const options = { assembler: { freshness: 1 } };\n",
      "vitest.plant.config.ts": "export const key = 'assembler-acquisition';\n",
    };
    const replica = gitReplica("km7q2-live-", plants);
    const mirror = surveyFiles(replica, gitList(replica));
    return {
      gate,
      verdict: guard(gate, outside),
      findings: outside,
      positives: alone,
      coverage: { readAll: real.unreadable.length === 0, codeAndDocs: real.code.length > 0 && real.docs.length > 0 },
      replica: { code: mirror.code, docs: mirror.docs, findings: mirror.findings, verdict: guard("CLOSED", mirror.findings), standDown: guard("OPEN", mirror.findings) },
    };
  },
  A2: async () => {
    const walked = walkTree(REPO);
    const listed = gitList(REPO);
    const skip = ignored(REPO, walked.files);
    const walkAgreesWithGit = JSON.stringify(walked.files.filter(path => !skip.has(path))) === JSON.stringify(listed);
    const top = trackedTop(REPO);
    const roots = new Set([...CONSTANTS.codeRoots, ...CONSTANTS.docRoots, ...CONSTANTS.outside]);
    const real = live();
    const floors = {
      codeModules: real.code.length >= FLOORS.codeModules,
      srcModules: real.code.filter(path => path.startsWith("src/")).length >= FLOORS.srcModules,
      readings: real.readings >= FLOORS.readings,
      everyRoot: CONSTANTS.codeRoots.map(root => real.code.some(path => path.startsWith(`${root}/`))),
      rootModules: real.code.some(atRoot),
    };
    // The frozen pass: every code module of the immutable tree at the cut's base, read from git objects - exact counts.
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
    const frozen = survey(frozenTexts().filter(([path]) => isCode(path)));
    const controls = {
      lexeme: codeOf('const assemblerFreshness = 1;\nconst key = "assembler-acquisition";\n'),
      template: codeOf(`const flag = \`${HOLE}'assembler'}-schedule\`;\nconst part = \`assembler-${HOLE}x}-stale\`;\n`),
      concatenation: codeOf('const key = "rc_assembler" + ".acquire";\n'),
      access: codeOf("assembler.acquire();\nthis.rc.assembler.scheduleBlocks();\n"),
      element: codeOf('assembler["freshness"];\nassembler[`stale`];\nassembler[verb];\n'),
      member: codeOf("interface AssemblerInput { freshness: string }\nconst rc = { assembler: { speculate: true } };\nclass Assembler { obtain() {} }\nenum AssemblerStage { Acquire }\n"),
      comment: codeOf("// The assembler acquires the block. It is new.\n/* The ReactiveComponents assembler\n * judges freshness. */\nexport {};\n"),
      javascript: codeOf("module.exports = { assembler: { schedule: 1 } };\n", "qa/plant.cjs"),
      spelled: codeOf(`const flag = \`assembler-${HOLE}x}-stale\`;\nconst key = 'rc.assembler.' + verb + '.acquire';\n`),
      destructured: codeOf("const { acquire } = assembler;\nfunction run({ freshness }: AssemblerOptions) {}\n"),
      indexedType: codeOf('type Speculation = Assembler["speculate"];\n'),
      imported: codeOf('import { acquire } from "rc-assembler";\nexport { schedule as plan } from "./assembler.js";\nimport * as fresh from "@x/assembler";\n'),
      optional: codeOf("assembler?.acquire();\nnew Assembler().schedule();\ngetAssembler()!.freshness;\n"),
      regex: codeOf("const pattern = /assembler acquires/u;\n"),
      emptyBlock: codeOf("function run() {\n  // The assembler acquires the block.\n}\nconst none = {\n  /* The assembler schedules. */\n};\n"),
      templateType: codeOf(`type Key = \`assembler-${HOLE}string}-stale\`;\n`),
    };
    const quiet = {
      "R-INDIRECT": [codeOf("const a = assembler;\na.acquire();\n"), codeOf('assembler.run("acquire");\n'), codeOf('const m = await import("rc-assembler");\nm.acquire();\n')],
      "R-COMPOSED": [codeOf("assembler[verb + suffix]();\n"), codeOf("const name = prefix + 'acquisition';\nassembler[name]();\n")],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A2").map(residual => residual.id));
    return {
      walkAgreesWithGit,
      links: walked.links,
      unnamedTop: top.directories.filter(name => !roots.has(name)),
      unnamedRootFiles: top.files.filter(name => !isCode(name) && !isDoc(name) && !ROOT_CONFIG.test(name)),
      floors,
      findings: real.findings.filter(finding => isModule(finding.slice(0, finding.indexOf(":")))),
      unreadable: real.unreadable,
      frozen: { revision: CONSTANTS.frozenAt, ancestor, modules: frozen.code.length, readings: frozen.readings, named: frozen.named, findings: frozen.findings, quieted: frozen.quieted },
      controls,
      quiet,
    };
  },
  A3: async () => {
    const real = live();
    const floors = {
      docPages: real.docs.length >= FLOORS.docPages,
      rootPages: real.docs.filter(atRoot).length >= FLOORS.rootPages,
      everyRoot: CONSTANTS.docRoots.map(root => real.docs.some(path => path.startsWith(`${root}/`))),
      sentences: surveyFiles(REPO, real.docs).readings >= FLOORS.sentences,
      docs03: real.docs.includes(CONSTANTS.docs03),
    };
    const frozen = survey(frozenTexts().filter(([path]) => isDoc(path)));
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
    const cuts = [
      sentences("Intro line. The assembler acquires; no other row changed."),
      sentences("The assembler\nacquires resources."),
      sentences("| assembler | acquires |\n| x | y |"),
      sentences("The assembler\n- acquires"),
      sentences("The assembler\n\nacquires."),
      sentences("# The assembler\nacquires."),
      sentences("The assembler acquires!Next line"),
      sentences("Version 0.1.0 of the assembler acquires."),
      sentences("The assembler acquires?\r\nYes."),
    ].map(cut => cut.map(sentence => `${sentence.line}:${sentence.text}`));
    const judged = [
      docOf("Intro line.\n\nThe assembler acquires; no other row changed."),
      docOf("The assembler\nacquires resources."),
      docOf("| Concern | Owner |\n| --- | --- |\n| assembler | acquires resources |\n| assembler | never acquires |"),
      docOf("The assembler\n- acquires"),
      docOf("The assembler\n\nacquires."),
      docOf("# The assembler\nacquires."),
    ];
    // R-OUTSIDE-ROOTS quiet row: the same claim in every outside directory, in a root text file and in a non-module code file.
    const outsideFiles: Record<string, string> = { "docs/plant.md": `${PLANT}\n` };
    for (const directory of CONSTANTS.outside) outsideFiles[`${directory}/plant.md`] = `${PLANT}\n`;
    outsideFiles["PLANT.txt"] = `${PLANT}\n`;
    outsideFiles["qa/plant.sh"] = `# ${PLANT}\n`;
    outsideFiles["docs/plant.txt"] = `${PLANT}\n`;
    const replica = gitReplica("km7q2-outside-", outsideFiles);
    const read = gitList(replica);
    const unread = Object.keys(outsideFiles)
      .filter(path => !read.includes(path))
      .sort(byName);
    const quiet = {
      "R-OUTSIDE-ROOTS": { read, findings: surveyFiles(replica, read).findings, unreadWouldFind: unread.map(path => docSurvey(path, outsideFiles[path] ?? "").findings.length) },
      "R-SPLIT": [docOf("We added an assembler. It acquires resources."), docOf("Status: acquires. Subject: the assembler.")],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A3").map(residual => residual.id));
    return {
      floors,
      findings: real.findings.filter(finding => isPage(finding.slice(0, finding.indexOf(":")))),
      frozen: { revision: CONSTANTS.frozenAt, ancestor, pages: frozen.docs.length, sentences: frozen.readings, named: frozen.named, findings: frozen.findings, quieted: frozen.quieted },
      cuts,
      judged,
      quiet,
    };
  },
  A4: async () => {
    const subjects = [
      "The assembler acquires resources.",
      "The Assembler acquires resources.",
      "Assemblers acquire resources.",
      "The ReactiveComponentsSDK assembler acquires resources.",
      "ReactiveComponents acquires resources.",
      "The reactive-components package acquires resources.",
      "The reactive_components module acquires resources.",
      "The context assembly acquires resources.",
      "RC assembly acquires resources.",
      "rf's assembled context acquires resources.",
      "Assembling the components acquires resources.",
      "The fiber assembles and acquires.",
      `The ${FULLWIDTH_A}ssembler acquires resources.`,
      "The RC SDK acquires resources.",
      "The reactivecomponents package acquires resources.",
      "reactivecomponentssdk acquires resources.",
    ].map(verdict);
    const notSubjects = ["The reply assembly acquires resources.", "The assembled child prompt is fresh.", "Workflows assembled from MechanicalWorkflows schedule work.", "The disassembler acquires resources.", "The reassembled tree is stale.", "The assemblage acquires.", "Reactive programming acquires resources."].map(text => read(text).kind);
    const anchors = VOCABULARY.anchors.map(word => verdict(`The ${word} assembly acquires resources.`));
    const markers = [
      "not",
      "no",
      "never",
      "nor",
      "neither",
      "without",
      "cannot",
      "until",
      "unless",
      "gated",
      "unshipped",
      "proposed",
      "none",
      "nothing",
      "isn't",
      "isn’t",
      "design only",
    ].map(word => read(`The assembler ${word} acquires resources.`).kind);
    const notMarkers = ["should", "must", "shall", "will", "would", "may", "if", "when", "once", "only", "host"].map(word => verdict(`The assembler ${word} acquire resources.`));
    const expectations = [verdict("Pi expects the assembler to acquire resources."), verdict("The host relies on the assembler to schedule acquisition."), verdict("Freshness is judged by the assembler.")];
    const quiet = {
      "R-UNANCHORED": [read("The reply assembly is stale.").kind, read("Receipt assembly schedules nothing new").kind, read("The prompt is assembled fresh.").kind],
      "R-RENDERER": [verdict("rf acquires the resource."), verdict("The render judges freshness."), verdict("ReactiveFiberCLI schedules acquisition.")],
      "R-SHORT-NAME": [verdict("RC acquires resources."), verdict("The rc schedules acquisition."), read("rc 1 means the cache is stale").kind],
      "R-LOOKALIKE": [verdict(`The ${LOOKALIKE_A}ssembler acquires resources.`), verdict(`The assemb${INVISIBLE}ler acquires resources.`), verdict(`The assembler acq${INVISIBLE}uires resources.`), verdict("The assem&#98;ler acquires resources.")],
      "R-MARKER-ANYWHERE": [verdict("The assembler acquires resources and no rollback is planned."), verdict("The assembler judges freshness; nothing else changed"), verdict("The assembler acquires resources, not the host.")],
      "R-SYNONYM": synonymsOf(),
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A4").map(residual => residual.id));
    return { subjects, notSubjects, anchors, markers, notMarkers, expectations, quiet };
  },
  B1: async () => {
    const forms = VOCABULARY.families.acquire.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.acquire();\n"), codeOf("const assemblerAcquisitionMode = 1;\n"), codeOf("rc.assembler.speculate = true;\n"), codeOf("type AssemblerObtainer = { obtainResource(): void };\n")];
    const nearMisses = ["acquaint", "acquit", "require", "inquire", "acquiesce", "obtainable", "speculum", "acquirer"].map(word => verdict(`The assembler: ${word}.`));
    return { forms, code, nearMisses };
  },
  B2: async () => {
    const forms = VOCABULARY.families.schedule.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.schedule(block);\n"), codeOf("const ASSEMBLER_SCHEDULER = 1;\n"), codeOf("interface Assembler { scheduled: boolean }\n")];
    const nearMisses = ["schedulable", "schema", "scheduleless", "timetable", "agenda"].map(word => verdict(`The assembler: ${word}.`));
    return { forms, code, nearMisses };
  },
  B3: async () => {
    const forms = VOCABULARY.families.freshness.map(word => verdict(`The assembler: ${word}.`));
    const code = [codeOf("assembler.freshness;\n"), codeOf("const assemblerStaleTime = 5;\n"), codeOf("const opts = { assembler: { isFresh: true } };\n")];
    const nearMisses = ["refresh", "refreshed", "freshman", "freshwater", "stalemate", "stalk", "staleless"].map(word => verdict(`The assembler: ${word}.`));
    const quiet = {
      "R-PARAPHRASE": ["fetches resources", "prefetches blocks", "loads resources", "refreshes blocks", "expires blocks", "sets a ttl", "queues work", "defers work", "keeps blocks up to date"].map(phrase => verdict(`The assembler ${phrase}.`)),
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B3").map(residual => residual.id));
    return { forms, code, nearMisses, quiet };
  },
  C1: async () => {
    const producer = ROSTER.producer;
    const hashed = producer.lines.map(line => createHash("sha256").update(line.text).digest("hex") === line.sha256);
    const status = producer.lines.find(line => line.line === 3);
    const acceptance = producer.lines.find(line => line.line === 46);
    const others = producer.lines.filter(line => line.line !== 3);
    const accepted = (text: string): ProducerLine[] => [{ line: 3, text, sha256: "" }, ...others];
    const withoutSeven = producer.lines.map(line => (line.line === 46 ? { ...line, text: line.text.replace("RC-RQ7", "RC-RQ") } : line));
    const nearMisses = {
      recorded: gateOf(rcGateOf(producer), "ABSENT"),
      "recorded-seam-present": gateOf(rcGateOf(producer), "PRESENT"),
      "accepted-seam-absent": gateOf(rcGateOf({ lines: accepted("**Status:** accepted.") }), "ABSENT"),
      "accepted-seam-present": gateOf(rcGateOf({ lines: accepted("**Status:** accepted.") }), "PRESENT"),
      "status-uppercase": gateOf(rcGateOf({ lines: accepted((status?.text ?? "").toUpperCase()) }), "PRESENT"),
      "status-hyphenated": gateOf(rcGateOf({ lines: accepted((status?.text ?? "").replace("design only", "design-only")) }), "PRESENT"),
      "gate-missing": gateOf(rcGateOf({ lines: withoutSeven.map(line => (line.line === 3 ? { ...line, text: "**Status:** accepted." } : line)) }), "PRESENT"),
      "no-status-line": gateOf(rcGateOf({ lines: others }), "PRESENT"),
      "no-lines": gateOf(rcGateOf({ lines: [] }), "PRESENT"),
    };
    return {
      rcGate: rcGateOf(producer),
      recorded: producer.rcGate,
      hashed,
      lines: producer.lines.map(line => line.line),
      gates: [...(acceptance?.text ?? "").matchAll(GATE_IDS)].map(match => match[0]),
      readings: producer.lines.flatMap(line => sentences(line.text).map(sentence => `${line.line}: ${read(sentence.text).kind}`)),
      nearMisses,
      verdict: guard(gateOf(rcGateOf(producer), piSeam().seam), []),
    };
  },
  C2: async () => {
    const pi = piSeam();
    const { rf, inputNames, legacy, view, findings } = await seamWords();
    const launches = rfLaunchSites(
      gitList(REPO)
        .filter(path => path.startsWith("src/") && isModule(path))
        .map(path => [path, readFileSync(join(REPO, path), "utf8")] as const),
    );
    const page = readFileSync(join(REPO, CONSTANTS.docs03), "utf8");
    const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    const ownership = tables.grids.flatMap(grid => grid.filter(cells => cells[1] === RENDER_OWNER))[0] ?? [];
    const controls = {
      argv: [
        seamFindings("argv", [...legacy.argv, "--freshness", "1h"]),
        seamFindings("argv", [...legacy.argv, "--speculate"]),
        seamFindings("argv", ["--acquire-resources"]),
        seamFindings("argv", ["--schedule", "now"]),
        seamFindings("argv", ["--max-staleness=5"]),
      ],
      input: seamFindings("input", ["model", "freshness", "acquisitionMode", "scheduleAt", "taskId"]),
      env: seamFindings("env", ["HOME", "PATH", "RF_FRESHNESS_TTL", "RF_SPECULATE"]),
      launches: rfLaunchSites([
        ["src/plant.ts", 'spawn("rf", ["context", "render"]);\nexecFileSync("/usr/local/bin/rf", []);\nexecSync("rf --json status");\nchild.spawn("rfx", []);\n'],
        ["src/other.ts", 'fork("rf.exe");\nspawn(program, []);\n'],
      ]),
      sites: rcSites([
        ["src/plant.ts", 'import { assemble } from "reactive-components";\n'],
        ["src/plant-py.ts", 'spawn("python", ["-m", "reactive_components.assembly"]);\n'],
        ["src/plant-doc.ts", "// Wraps ReactiveComponentsSDK.\nexport {};\n"],
      ]),
      dependencies: rcDependencies(JSON.stringify({ dependencies: { "@jehalladay/reactive-components": "1.0.0" }, devDependencies: { vitest: "4" } })),
      seams: [seamOf([], []), seamOf(["src/plant.ts:1 lexeme"], []), seamOf([], ["reactive-components"])],
    };
    const quiet = {
      "R-SEAM-OTHER": [rcSites([["src/plant.ts", 'await fetch("http://localhost:7000/assemble?acquire=1");\n']]), rcSites([["src/plant.ts", 'spawn("rcx", ["build"]);\n']])],
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "C2").map(residual => residual.id));
    return {
      seam: pi.seam,
      rcSites: pi.sites,
      rcDependencies: pi.dependencies,
      rfCapabilities: rf,
      rfLaunchSites: launches,
      inputNames,
      argv: { legacy: legacy.argv, legacyOutcome: legacy.outcome, view: view.argv, viewOutcome: view.outcome },
      findings,
      ownership: { found: tables.ok, cells: [...ownership], reading: read(ownership.join(" ")).kind, families: familiesOf(words(ownership.join(" "))) },
      controls,
      quiet,
    };
  },
};

/** The outside texts: the owner filing's title and citation line, and the producer's recorded lines. */
function outsideTexts(): string[] {
  const { title, notes } = beadRow();
  const filing = notes.split("\n").find(line => line.startsWith(CONSTANTS.filing)) ?? "";
  return [title, filing, ...ROSTER.producer.lines.map(line => line.text)];
}
/** R-SYNONYM: every vocabulary word no outside text spells, held by this file and the roster alone. */
function synonymsOf(): string[] {
  const spelledOutside = new Set(outsideTexts().flatMap(words));
  const all = [...VOCABULARY.subject, ...VOCABULARY.assembly, ...VOCABULARY.anchors, ...FAMILY_IDS.flatMap(id => VOCABULARY.families[id]), ...VOCABULARY.markers];
  return all.filter(word => !spelledOutside.has(word)).sort(byName);
}
/** A word's role in the reading: subject, assembly, marker, anchor, its families joined, or none. */
function roleOf(word: string): string {
  const tokens = words(word);
  if (namesSubject(tokens)) return "subject";
  if (tokens.some(token => ASSEMBLY.has(token))) return "assembly";
  if (tokens.some(token => MARKERS.has(token)) || hasPair(tokens, VOCABULARY.markerPairs)) return "marker";
  if (tokens.some(token => ANCHORS.has(token))) return "anchor";
  const families = familiesOf(tokens);
  return families.length === 0 ? "none" : families.join("+");
}
function beadRow(): { readonly title: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string" && "title" in value && typeof value.title === "string") return { title: value.title, notes: value.notes };
  }
  throw new Error("bead export lacks the owner filing");
}
const GAP = /^[\s,;:—]*$/;
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !GAP.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return GAP.test(body.slice(at));
}

describe("wb-km7q.2 RC assembler expectation census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R7, until the RC gates pass)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and title, the producer lines and docs/03", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    // The owner filing: the first notes line opening with the citation carries the acceptance clause, the three labels joined.
    const { title, notes } = beadRow();
    const filing = notes.split("\n").find(line => line.startsWith(CONSTANTS.filing)) ?? "";
    const clause = /Acceptance: (.+)\.$/.exec(filing)?.[1] ?? "";
    expect(clause).toBe(ROWS.map(row => row.label).join(" "));
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote)))).toEqual(ROWS.map(() => true));
    // The clause's own expectation, its negation and its until-clause removed, names exactly the three families.
    const expectation = clause.replace(/^.*? no (Pi code)/, "$1").replace(/ until .*$/, "");
    expect(read(clause).kind).toBe("marker");
    expect(verdict(expectation)).toBe("acquire+schedule+freshness");
    // The title: its last clause without "no" is a finding of the three families; its speculation clause is quiet only by never.
    const last = /, and no (Pi surface expects the assembler to .+)\.$/.exec(title)?.[1] ?? "";
    expect(verdict(last)).toBe("acquire+schedule+freshness");
    expect(read(`no ${last}`).kind).toBe("marker");
    const speculation = /, (speculation controls .+? never assembler execution),/.exec(title)?.[1] ?? "";
    expect(read(speculation).kind).toBe("marker");
    expect(verdict(speculation.replace(" never ", " and "))).toBe("acquire");
    const rcName = /inputs to (\S+ assembly) \(/.exec(title)?.[1] ?? "";
    expect(verdict(`${rcName} acquires resources.`)).toBe("acquire");
    const span = /gated RC-RQ(\d)\.\.RC-RQ(\d)\)/.exec(title);
    const expanded = Array.from({ length: Number(span?.[2] ?? 0) - Number(span?.[1] ?? 1) + 1 }, (_, index) => `RC-RQ${Number(span?.[1] ?? 1) + index}`);
    expect(expanded).toEqual(ROSTER.producer.gates);
    expect([...(ROSTER.producer.lines.find(line => line.line === 46)?.text ?? "").matchAll(GATE_IDS)].map(match => match[0])).toEqual(ROSTER.producer.gates);
    expect(ROSTER.unclaimed.map(entry => title.includes(entry.duty))).toEqual(ROSTER.unclaimed.map(() => true));
    expect(ROSTER.unclaimed.every(entry => entry.reason.length > 0)).toBe(true);
    // The citations: every cited line of the producer is a recorded line, at the recorded bead pin.
    const cited = [...filing.matchAll(/:(\d+)@([0-9a-f]{12})/g)].map(match => [Number(match[1]), match[2] ?? ""] as const);
    expect(cited.length).toBe(4);
    expect(cited.map(([line, pin]) => ROSTER.producer.lines.some(entry => entry.line === line) && ROSTER.producer.beadPin.startsWith(pin))).toEqual(cited.map(() => true));
    expect(filing.includes(ROSTER.producer.path)).toBe(true);
    // The producer's own sentences: :12's last sentence is quiet only by its "not"; :38 names the families with no subject.
    const split = sentences(ROSTER.producer.lines.find(line => line.line === 12)?.text ?? "").map(sentence => sentence.text);
    const host = split[split.length - 1] ?? "";
    expect(read(host).kind).toBe("marker");
    expect(verdict(host.replace(" not ", " and "))).toBe("acquire");
    const scope = ROSTER.producer.lines.find(line => line.line === 38)?.text ?? "";
    expect(familiesOf(words(scope))).toEqual(["acquire", "schedule", "freshness"]);
    expect(sentences(scope).map(sentence => read(sentence.text).kind)).toEqual(sentences(scope).map(() => "none"));
    expect(ROSTER.producer.rcGate).toBe(rcGateOf(ROSTER.producer));
    // Every family, subject, assembly, marker and anchor word the filing or the producer spells at a fixed place reads in its role.
    const producerLine = (line: number): string => ROSTER.producer.lines.find(entry => entry.line === line)?.text ?? "";
    const places: readonly (readonly [string, RegExp, readonly string[]])[] = [
      [title, /supplies (\w+) or (\w+) inputs to (\w+) (\w+) \(/, ["acquire", "freshness", "subject", "assembly"]],
      [title, /\((\w+) extension 2 acquire\/include\/place; (\w+ \w+); gated/, ["anchor", "marker"]],
      [title, /, (\w+) controls resource (\w+) at the Pi host only and (\w+) (\w+) execution/, ["acquire", "acquire", "marker", "subject"]],
      [title, /Pi decides temporal (\w+), and (\w+) Pi surface expects the (\w+) to (\w+) resources, (\w+) (\w+) or judge (\w+)\.$/, ["freshness", "marker", "subject", "acquire", "schedule", "acquire", "freshness"]],
      [filing, /Acceptance: gating census \S+ (\w+) Pi code or doc expects the (\w+) to (\w+), (\w+) or judge (\w+) (\w+) the (\w+) gates/, ["marker", "subject", "acquire", "schedule", "freshness", "marker", "anchor"]],
      [filing, /Pi consumes (\w+)'s (\w+) (\w+) only/, ["anchor", "assembly", "anchor"]],
      [producerLine(3), /\*\*Status:\*\* (\w+ \w+)\./, ["marker"]],
      [producerLine(12), /Separate `(\w+)` \(does host (\w+) a resource\?\), `include` \(does (\w+) include a block\?\)/, ["acquire", "acquire", "subject"]],
      [producerLine(12), /(\w+) controls (\w+) at the host, (\w+) (\w+) execution\./, ["acquire", "acquire", "marker", "subject"]],
      [producerLine(38), /resource (\w+) (\w+)\. Preserve Python (\w+) outputs/, ["acquire", "schedule", "anchor"]],
      [producerLine(38), /let host decide temporal (\w+)\./, ["freshness"]],
    ];
    expect(places.map(([text, rx]) => (rx.exec(text)?.slice(1) ?? []).map(roleOf))).toEqual(places.map(([, , roles]) => roles));
    // docs/03's ownership table gives context rendering to the renderer, never to an assembler seam of Pi's.
    const tables = sectionTables(readFileSync(join(REPO, CONSTANTS.docs03), "utf8"), OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    expect(tables.grids.flatMap(grid => grid.filter(cells => cells[1] === RENDER_OWNER)).map(cells => cells[0])).toEqual(["Context rendering, necessity and provenance"]);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-INDIRECT", "R-COMPOSED", "R-SPLIT", "R-UNANCHORED", "R-RENDERER", "R-SHORT-NAME", "R-LOOKALIKE", "R-MARKER-ANYWHERE", "R-SYNONYM", "R-PARAPHRASE", "R-SEAM-OTHER"]);
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
