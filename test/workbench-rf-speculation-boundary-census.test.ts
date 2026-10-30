/**
 * wb-km7q.9 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R22, program-triage-2026-10-18 child of wb-km7q). Statement (the
 * bead title, held to the tracked bead export): "When rf ships ResourceBrokerLimits/SpeculationBoundary (gated RF-AC5 pressure
 * hysteresis and capped admission), any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten
 * ResourceBrokerLimits and never overrides Pi host hard caps; rf's local default speculation policy stays passive/disabled and Pi
 * documents no other default." Acceptance (owner filing, notes): "adoption-time vitest that a Pi-declared boundary value looser
 * than a host cap is refused or clamped, and a docs sentence that the shipped default remains passive/disabled."
 *
 * THE TRIGGER, MEASURED (read-only, re-measured by the respin seat ws-06, run g10-work-s136, 2026-10-29, in the installed rf, whose
 * `rf --json --version` reads 0.1.845, uv tool reactivefibercli-20261028T103242Z; this census is hermetic and never runs or reads
 * rf): reactive_fiber_cli/domain/broker_limits.py defines ResourceBrokerLimits (:261; its seven members, at :273-279, are
 * max_pending_interests, max_in_flight_bytes, max_retained_bytes, cpu_budget_ms, token_estimate_budget, per_class_slots and
 * foreground_reserve) and SpeculationBoundary (:429; its tighten() at :453 is the member-wise meet and refuses a constraint above a
 * host cap with BoundaryExceedsCapError, RF_BROKER_BOUNDARY_EXCEEDS_CAP), DEFAULT_POLICY = SpeculationPolicy.PASSIVE (:144) and
 * PASSIVE_LIMITS (:322: declarations recorded, no speculative slot, byte or budget). Its docstring (:7-9): "nothing here is a CLI
 * surface: the host's HostResourceBroker (RF-AC3, RF-AC5) reads these values, and the one way a process opts into speculation is
 * the seat below" - RF_ADAPTIVE=speculation (ADAPTIVE_ENV :100, SPECULATION_FEATURE :106; cli/main.py adaptive_selection, :1954,
 * is its one reader). runtime/resource_broker.py carries RF-AC5-b admission under caps and pressure. The 2026-10-27 install
 * (reactivefibercli-20261027T103243Z) declares the same seven members. The trigger has fired, so the filing binds Pi now.
 *
 * DELIVERED HERE, measured by the readers below and no further: the docs sentence (docs/workbench/18 "Decisions deferred, with
 * recommended starting defaults", the paragraph opening "RF speculation boundary:"), and the until-then leg of the adoption-time
 * vitest. No src lexeme names THE VOCABULARY, so no src module declares a boundary or broker-limit configuration under the title's
 * spellings, rf's seat or rf's member names (one under names of its own is R-PARAPHRASE). Every launcher call LAUNCH reads in src
 * is the provider's spawn, handed scrubbedEnvironment(process.env, RF_CHILD_ENV_ALLOWLIST) with no options member after it that
 * can override env (a spread, a member named env, a computed name) and no accessor anywhere in its options, and BINDINGS reads
 * spawn as its import from node:child_process, scrubbedEnvironment and RF_CHILD_ENV_ALLOWLIST as their imports, under their own
 * names, from src/workbench/process-env.ts (the module C1 reads: its allowlist names no rf-family variable, and its scrub, from a
 * fixture parent and from this process's own environment with the seat set in it, builds a null-prototype child holding only
 * allowlisted names) and process as the global, so the provider's rf child never receives the RF_ADAPTIVE seat (an rf launch
 * LAUNCH does not read is R-INDIRECT-LAUNCH). Why the accessors and the null prototype (a mechanism measured outside this census,
 * by refusal #1's P1 and P2 through spawn and by the seat's local Node v24.20.0 runs through spawnSync at cut #2, never read by
 * it): Node copies a launch's options with an object spread before it reads env, which calls every getter of the literal in key
 * order, integer keys first, so a getter the copy reaches before env can rebind it and a getter anywhere can fill the object env
 * holds; and Node's for-in over env reads inherited names, so a member value adding a name to Object.prototype would reach a child
 * that has a prototype. The host hard caps a future declaration may never override are read off the provider, as values. NOT
 * DELIVERED: the adoption-time vitest itself (a Pi-declared value looser than a host cap is refused or clamped): A1 reads no Pi
 * declaration to feed it. A cut that adds one under THE VOCABULARY reds A1 (its planted legs show the judge reports such a module)
 * and owes that test, as the docs paragraph's last sentence says.
 *
 * READINGS
 * - WORDS: NFKC, a break at each lower-to-upper case change and before the last capital of an acronym run, lower case, the runs
 *   of a-z and 0-9 (SpeculationBoundary reads speculation boundary, RF_ADAPTIVE reads rf adaptive, perClassSlots reads per class
 *   slots, and the possessive rf's reads rf s). THE VOCABULARY (the title's spellings, rf's seat and rf's seven
 *   ResourceBrokerLimits members, each with its leading max dropped; the phrases are this file's copy of the measured install): a
 *   word holding "speculat" or "broker", or one to three adjacent words joining to rfadaptive, pendinginterests, inflightbytes,
 *   retainedbytes, cpubudgetms, tokenestimatebudget, perclassslots or foregroundreserve (so maxInFlight, which reads max in
 *   flight, joins to none of them).
 * - CODE (row A): every module below src/ (a filesystem walk, held to git's listing), parsed with the TypeScript compiler; its
 *   lexemes are each identifier, private name, string literal, template part, regular expression literal and JSX text, never a
 *   comment. A finding is `<path>:<line> <families>`.
 * - CAPS (row B): the provider module's AST: the delay of every setTimeout whose callback calls stop("deadline"), and the bound
 *   of every if testing `<count> > <bound>` before calling stop with a stream reason, each folded through const bindings by name
 *   (an unfoldable value reads null). Values only: whether the provider stops on them is not read.
 * - LAUNCH (row C): every child-process launcher call (spawn, spawnSync, exec, execSync, execFile, execFileSync or fork, called by
 *   that name or as a property of that name) in a src module whose first argument is a string literal whose first word, any
 *   directory prefix dropped, is rf ("rf", "/usr/local/bin/rf" and the command string "rf --json --version" each name rf; "rfc"
 *   and "surf" do not), with, from its options object (the first object literal among its arguments; a launch without one reads an
 *   env of null and no member), the env initializer as written (null when its options carry none), the members after the env
 *   property that can override env (a spread, a member named env, a computed name), as written, and every accessor, before or
 *   after env and under any name (a get or set member, as its kind and its name as written): LAUNCH fails closed on an accessor, a
 *   setter (which Node's options copy never calls) and a getter whose body sets nothing read all the same (strict direction). A
 *   RegExp exec over such a literal reads as a launch too (strict direction).
 * - BINDINGS (row C): for each launch LAUNCH reads, the binding of every name its callee and its env initializer reference (a
 *   property name after a dot or before a colon, and a name in a type, excepted), each distinct reading once in source order,
 *   resolved by the TypeScript checker over the launch's module alone: an import (the imported
 *   name and its module, a relative specifier resolved against the module's path with .js read as .ts), a local declaration
 *   (its syntax kind), or global (no declaration in the module).
 * - DOCS (row D): every .md page at the repository's top level and below each top-level directory holding a path git tracks,
 *   test/ excepted (R-OUTSIDE-ROOTS): filesystem walks held to git's listing of the same roots and top-level pages, with every
 *   .md page git tracks outside test/ among the pages read (a tracked page the walks miss reds D2);
 *   each page is cut into raw sentences (after ".", "!" or "?" before white space, at a blank line, before a list item,
 *   heading, table row or quote), and a sentence NAMES the vocabulary when its words carry a family (a sentence that names it
 *   only once rendered is R-RENDERED). The bound paragraph is read in the rendered view (test/helpers/census.ts docsSection: the
 *   unique section under its level-1 title, HTML refused).
 *
 * JUDGED ROWS (one test per pin, titled by the pin id under its row's label; the labels of A-D are the title's two clauses after
 * its trigger, each split at its " and "):
 *  A "any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits": A1 no src lexeme
 *    names THE VOCABULARY (planted legs: a declaration module after the real ones, and a declaration appended to every real
 *    module); A2 the code walk read exactly git's listing of src modules, above its floor, the provider included.
 *  B "never overrides Pi host hard caps": B1 the provider's deadline is 60000 ms and its stdout and stderr bounds are 262144 bytes
 *    each, and the same reader over a synthetic provider reads that provider's own values (an inclusive comparison not read); B2
 *    the docs paragraph names those caps, in seconds and KiB, equal to the provider's.
 *  C "rf's local default speculation policy stays passive/disabled": C1 the rf child allowlist names no rf-family variable (a name
 *    opening RF_ or SWARM_RF_, in any case), and from a parent fixture carrying RF_ADAPTIVE=speculation (the parent's seat and
 *    names are in the witness) scrubbedEnvironment builds a child holding only HOME and PATH, and from this process's own
 *    environment, with RF_ADAPTIVE set to speculation in it for that one synchronous call and restored after, a child holding no
 *    name outside the allowlist (the seat is one, so the reading is not vacuous) and carrying that environment's PATH with its
 *    value, each child a null-prototype object, and the seat as before the readings once they end (planted legs: the same live
 *    judge over a scrub planted to keep every parent name when its source is this process's own environment reports the seat, and
 *    the prototype judge over a plain-object copy of the fixture child reads its prototype); C2 every rf launch LAUNCH reads in
 *    src is the provider's spawn, handed scrubbedEnvironment(process.env, RF_CHILD_ENV_ALLOWLIST) with no member after it that can
 *    override env and no accessor in its options, its four names bound as DELIVERED HERE says (BINDINGS); LAUNCH reads every rf
 *    form of its table (bare, path-qualified, command string, by name and as a property), none of its other programs, and the
 *    after-members and accessors of each form (a spread after env; a string-keyed env and a computed name after it, beside a cwd;
 *    a spread before env with members after it that cannot override env; the provider's spawn text with refusal #1's P1, a getter
 *    before env that rebinds it, and with its P2, a getter after env that fills the object it holds; a getter after env that
 *    rebinds it, which Node's copy outruns, read all the same; a computed-name getter before env and, after it, a setter, an
 *    integer-keyed getter, a string-keyed getter and a getter named env; an options object holding a getter named env and no env
 *    property, through a property callee); and BINDINGS reads every form of its table (named and renamed imports, namespace and
 *    default imports, an import from another module, a module-scope const and function, an inner const over an import, a
 *    parameter, a hoisted var and a local process) (planted legs: an inherited-env rf launch module after the real ones; a module
 *    after them whose spawn carries the provider's env text through a local scrub with a spread after it; and the inherited-env
 *    launch appended to every real module).
 *  D "Pi documents no other default": D1 docs/18's section holds exactly one paragraph opening "RF speculation boundary:", and it
 *    renders as frozen; D2 every docs sentence naming the vocabulary is a sentence of that paragraph, the docs walk read exactly
 *    git's listing of its roots and top-level pages, every .md page git tracks outside test/ among them, and its docs/ pages meet
 *    their floor, docs/18 included (planted legs: a page stating another default and a copy of a bound sentence, both read
 *    outside; and the first of those sentences appended to every real page).
 *  M the readers: M1 the code reader's spellings, the spellings the owner's title gives the subject and rf's seven members (each
 *    in camelCase and snake_case) included; M2 the docs reader's spellings and its sentence cutter.
 *  Q the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHORS (the judged-set case, through anchorFindings): the owner filing's title in the tracked bead export
 *   (.beads/issues.jsonl, row wb-km7q.9, the title only): its two clauses after the trigger are the labels of A and B, and of C and
 *   D, joined by " and "; the docs paragraph: its first sentence is the label prefix and the C-D clause, and its third sentence
 *   opens with the A-B clause. These readings take the labels of rows A, B, C and D and nothing else. So a row of A to D removed
 *   whole, or its label changed, in every literal of this file reds against the owner's text and the docs; a pin of any row
 *   removed, rows M or Q removed whole, or the label of M or Q changed, in every literal of this file, reads green
 *   (R-SELF-ANCHORED: Q7 measures both halves on edited copies of the rows). M1 holds the code reader to the title's spellings, so
 *   a stem removed from THE VOCABULARY reds; a phrase removed from THE VOCABULARY and from every control spelling it does not.
 * PLANTED LEGS: A1, C2 and D2 each run their own judge three ways: over the real units (the clean reading); over the real units
 *   with one planted unit after them, read from memory (the plant is the run's one new finding); and over the real units with the
 *   plant appended to each (the plant once at every real unit's path, in walk order). So a judge forced quiet, or one that drops a
 *   real unit for a property its appended copy shares (its path, its text, its place in the walk), reds although the real tree is
 *   clean.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; WITNESS holds every pin's witness and REACHED_AT
 *   every pin's assertion count at its end; the registration case reads both against the run, and the test titles registered.
 * RESIDUALS (named; each has a pinned quiet row): R-COMMENT (Q1) a comment is not read - src/workbench/process-env.ts names the
 *   seat in a doc comment and reads quiet; R-COMPUTED (Q2) a name assembled at run time from parts no one lexeme spells;
 *   R-OUTSIDE-ROOTS (Q3) no module outside src/ is walked (test/, qa/, examples/ and the root config modules) - the env-scrub
 *   census and the process-env test spell the seat - no page below test/ is read (git tracks fixture pages there), and a page of
 *   another format is not read (a page is a name ending .md: an upper-case .MD, a .markdown page and the top-level LICENSE read
 *   quiet); R-PARAPHRASE (Q4) a default or a declaration stated without the vocabulary
 *   ("rf prefetches every render by default.", the possessive "rf's adaptive seat", a limits object under names of its own such as
 *   inflight and cpu); R-OTHER-CAP (Q5) a cap outside the deadline timer and the two stream bounds (a capability registry
 *   deadline) is not read by B1; R-INDIRECT-LAUNCH (Q6) an rf launch LAUNCH does not read: a variable program name, a launcher
 *   reached through an element access or another name, a wrapper program (sh -c, env) whose command names rf, or a quoted program
 *   word (src/workflow/host.ts executeGate runs a workflow's gate command that way, through GATE_SHELL with pi.exec's own
 *   environment; what that environment holds is not measured here); R-SELF-ANCHORED (Q7) no anchor outside this file names a pin
 *   or rows M and Q: the outside anchors read the labels of A to D alone, and Q7 shows every pin removed singly, rows M and Q
 *   removed and their labels changed reading no anchor finding, beside the A to D removals and relabels that do; R-RENDERED (Q8)
 *   a sentence naming the vocabulary only in the rendered view is not read: D2 cuts raw sentences, so a mark, code span or link
 *   inside a word ("spec*ul*ation", "spec**ul**ation", "spec`ul`ation", "[spec](./zz.md)ulation"), a named or numeric character
 *   reference ("RF&lowbar;ADAPTIVE", "specu&shy;lation", "RF&#95;ADAPTIVE") or inline HTML ("<em>spec</em>ulation") reads quiet,
 *   while the same sentences written plainly are read; R-VISUAL-ONLY (Q9) a code point that is still outside a-z and 0-9 after
 *   NFKC and lower case is a break to WORDS, so a stem with one between two of its letters is split there and not read: a
 *   zero-width space or a raw soft hyphen inside "speculation", or a Cyrillic e (U+0435) in place of its e, reads quiet in a docs
 *   sentence, and the zero-width space in a src string, while the plain word is read (each code point built in this file with
 *   String.fromCodePoint); a phrase is read when its words, so broken, still number at most three, the phrase reading joining up
 *   to three adjacent words: a word joiner inside RF_ADAPTIVE (two words) is read, a zero-width space inside the class of "per
 *   class slots" (three words, broken into four) is not.
 * NOT CLAIMED: an edit of this file and the docs paragraph together; the completeness of the residual list (its anchors are this
 *   file's literals); a pin's case replaced by one that returns its frozen witness without measuring it; a judge keyed on a
 *   plant's own text or on which run it is in (PLANTED LEGS); THE VOCABULARY's phrases beyond this file's copy of rf's names (the
 *   census never reads rf); the caps' enforcement (B1 reads their values); a name rebound or a module export replaced at run time
 *   (BINDINGS reads declarations, never run-time values); what an options member does when it runs (LAUNCH reads syntax: an
 *   accessor by its kind and name, never its body; Node's options copy is the measured mechanism above, not a reading).
 * FOLLOW-UP wb-ottk (the R694 carry of landing 673: PREP F11 leads, F7 and F12 ride): the docs walk reads every tracked root's
 *   pages and every top-level page (F11: AGENTS.md, CONTRIBUTING.md, SECURITY.md and the examples/, .pi/, .agents/, .beads/ and
 *   vendor/ pages were unread); C2 reads BINDINGS and the after-members (F7: a local pass-through scrub and a later spread of
 *   env read clean); R-RENDERED names the rendered-only sentence, with its quiet row Q8 (F12). Cut #2 (refusal #1 of cut #1
 *   8989d69a): LAUNCH reads every accessor of an rf launch's options and C2 pins none (U1: the gate's P1, a getter before env
 *   rebinding it, and P2, a getter after env filling the object it holds, read clean under the after-members alone); C1 reads
 *   the scrub over this process's own environment with the seat set, and each child's null prototype (refusal #1's F3: a scrub
 *   returning every parent name for process.env read clean); R-VISUAL-ONLY names the visual-only spelling, with its quiet row Q9
 *   (refusal #1's F2).
 *
 * Display paths added: none. Test-only: every plant is an in-memory text; src, docs, two test files and the bead export are only
 * read, and C1 sets RF_ADAPTIVE in this process's own environment around each of its two synchronous live scrub calls and
 * restores it after each (its prior value, or its absence).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { RF_CHILD_ENV_ALLOWLIST, scrubbedEnvironment } from "../src/workbench/process-env.js";
import { type DocsSection, docsSection } from "./helpers/census.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-km7q.9";
const BEAD_EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const PROCESS_ENV = "src/workbench/process-env.ts";
const DOCS_PAGE = "docs/workbench/18-decisions-and-risks.md";
const DOCS_TITLE = "18 — Decisions, risks, deliberate defaults and re-evaluation triggers";
const DOCS_SECTION = "Decisions deferred, with recommended starting defaults";
const DOCS_LABEL = "RF speculation boundary:";
/** The one top-level directory whose pages the docs walk does not read (R-OUTSIDE-ROOTS): its .md files are test fixtures. */
const UNREAD_PAGE_ROOT = "test";
/** A page the docs walk reads (DOCS): a name ending .md. */
const PAGE = /\.md$/;
/** A tracked top-level page of another format, which the docs walk does not read (R-OUTSIDE-ROOTS). */
const OTHER_FORMAT_PAGE = "LICENSE";
/** Names the page predicate judges (Q3): only the .md one is a page; the others are R-OUTSIDE-ROOTS's other formats. */
const PAGE_NAMES = ["notes.md", "NOTES.MD", "notes.markdown", OTHER_FORMAT_PAGE] as const;
/** The walks' floors, each below the count at base 62f9ede (116 src modules, 77 docs pages; 117 and 79 at c2695d7). */
const SRC_FLOOR = 100;
const DOCS_FLOOR = 60;
/** The two test files outside every walked root that spell the seat (R-OUTSIDE-ROOTS). */
const OUTSIDE_SPELLERS = ["test/workbench-env-scrub-census.test.ts", "test/workbench-process-env.test.ts"] as const;
const CODE_MODULE = /\.(?:[cm]?ts|tsx|[cm]?js|jsx)$/;
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]);
/** Sentence units: a sentence end before whitespace, a blank line, or a line opening a list item, heading, table row or quote. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The vocabulary: a word holding a stem, or one to three adjacent words joining to a phrase (rf's seat, then rf's seven
 * ResourceBrokerLimits members in declaration order, each with its leading max dropped). */
const STEMS = ["speculat", "broker"] as const;
const PHRASES = ["rfadaptive", "pendinginterests", "inflightbytes", "retainedbytes", "cpubudgetms", "tokenestimatebudget", "perclassslots", "foregroundreserve"] as const;

/** The paragraph docs/18 binds, as its rendered view reads it (inline markup removed, whitespace collapsed). */
const PARAGRAPH =
  "RF speculation boundary: rf's local default speculation policy stays passive/disabled and Pi documents no other default. " +
  "rf 0.1.845 ships ResourceBrokerLimits and SpeculationBoundary as values its host resource broker reads, with no CLI surface, " +
  "and the one way an rf process opts into its speculative policy is the process-scoped RF_ADAPTIVE seat, which no rf child Pi " +
  "launches receives: that child's environment holds only the RF_CHILD_ENV_ALLOWLIST names of src/workbench/process-env.ts. " +
  "Any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits and never overrides Pi " +
  "host hard caps, the 60 s render deadline and the 256 KiB stdout and stderr bounds of src/workbench/providers/reactivefiber.ts. " +
  "Pi declares none today, so the cut that declares the first one owes the adoption-time test that refuses or clamps a value " +
  "looser than a host cap (wb-km7q.9).";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "A", label: "any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits", pins: ["A1", "A2"] },
  { id: "B", label: "never overrides Pi host hard caps", pins: ["B1", "B2"] },
  { id: "C", label: "rf's local default speculation policy stays passive/disabled", pins: ["C1", "C2"] },
  { id: "D", label: "Pi documents no other default", pins: ["D1", "D2"] },
  { id: "M", label: "the readers: M1 the code reader, M2 the docs reader", pins: ["M1", "M2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"] },
];
/** The title's two clauses after its trigger, each as the pair of rows whose labels it joins with " and " (outside anchor 1). */
const CLAUSES: readonly (readonly [string, string])[] = [
  ["A", "B"],
  ["C", "D"],
];
/** The named residual families and the quiet row that pins each. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-COMMENT": "Q1",
  "R-COMPUTED": "Q2",
  "R-OUTSIDE-ROOTS": "Q3",
  "R-PARAPHRASE": "Q4",
  "R-OTHER-CAP": "Q5",
  "R-INDIRECT-LAUNCH": "Q6",
  "R-SELF-ANCHORED": "Q7",
  "R-RENDERED": "Q8",
  "R-VISUAL-ONLY": "Q9",
};

const read = (rel: string): string => readFileSync(join(REPO, rel), "utf8");
const capitalized = (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

/** The words of a text (WORDS). */
function words(text: string): string[] {
  return text
    .normalize("NFKC")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
/** The vocabulary families a text names, sorted (THE VOCABULARY). */
function families(text: string): string[] {
  const list = words(text);
  const found = new Set<string>();
  for (const word of list) for (const stem of STEMS) if (word.includes(stem)) found.add(stem);
  for (let start = 0; start < list.length; start += 1) {
    for (let end = start + 1; end <= Math.min(list.length, start + 3); end += 1) {
      const joined = list.slice(start, end).join("");
      for (const phrase of PHRASES) if (joined === phrase) found.add(phrase);
    }
  }
  return [...found].sort();
}

function scriptKind(fileName: string): ts.ScriptKind {
  if (/\.[jt]sx$/.test(fileName)) return fileName.endsWith(".jsx") ? ts.ScriptKind.JSX : ts.ScriptKind.TSX;
  return /\.[cm]?js$/.test(fileName) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
const parsed = (fileName: string, source: string): ts.SourceFile => ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, scriptKind(fileName));

/** One module's lexemes (CODE): every comment is trivia, so none is read (R-COMMENT). */
function lexemes(fileName: string, source: string): { readonly line: number; readonly text: string }[] {
  const file = parsed(fileName, source);
  const out: { line: number; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) ||
      ts.isPrivateIdentifier(node) ||
      ts.isStringLiteralLike(node) ||
      ts.isRegularExpressionLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isJsxText(node)
    ) {
      out.push({ line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1, text: node.text });
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}
/** A module's code findings: `<path>:<line> <families>` for each lexeme naming the vocabulary. */
function codeFindings(fileName: string, source: string): string[] {
  return lexemes(fileName, source).flatMap(lexeme => {
    const named = families(lexeme.text);
    return named.length === 0 ? [] : [`${fileName}:${lexeme.line} ${named.join("+")}`];
  });
}

/** Every regular file below a root by a filesystem walk (a symlink is not followed), repository-relative and sorted. */
function walked(root: string): string[] {
  const out: string[] = [];
  const visit = (rel: string): void => {
    for (const entry of readdirSync(join(REPO, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) out.push(child);
    }
  };
  visit(root);
  return out.sort();
}
/** Every path git lists below the given roots, tracked or untracked (ignored ones included, as the walk sees them), sorted: the
 * walks' anchor outside this census. */
function gitListed(...roots: string[]): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--", ...roots], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return [...new Set(listing.split("\0"))].filter(path => path !== "" && existsSync(join(REPO, path))).sort();
}
/** The docs walk's roots (DOCS): every top-level directory holding a path git tracks, test/ excepted, sorted. */
function pageRoots(): string[] {
  const tracked = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).split("\0");
  const roots = new Set(tracked.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))));
  return [...roots].filter(root => root !== UNREAD_PAGE_ROOT && existsSync(join(REPO, root))).sort();
}
/** The docs walk's top-level pages (DOCS): every regular .md file at the repository's top level, by a directory read. */
function topPages(): string[] {
  return readdirSync(REPO, { withFileTypes: true })
    .filter(entry => entry.isFile() && PAGE.test(entry.name))
    .map(entry => entry.name)
    .sort();
}
/** Every .md page git tracks, at any depth, sorted: D2's fail-closed anchor, a listing of its own beside the walk's roots. */
function trackedPages(): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--", ":(glob)**/*.md"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return listing
    .split("\0")
    .filter(path => path !== "")
    .sort();
}

/** A unit a walk reads: a real file's text, or a planted one read from memory after the real ones. */
interface Unit {
  readonly path: string;
  readonly source: string;
}
/** The code walk (rows A and C): the src modules read, and the units its judges read - every module (its text, then `appended`),
 * then each plant. */
function codeWalk(plants: readonly Unit[] = [], appended = ""): { readonly modules: string[]; readonly units: readonly Unit[] } {
  const modules = walked("src").filter(path => CODE_MODULE.test(path));
  return { modules, units: [...modules.map(path => ({ path, source: `${read(path)}${appended}` })), ...plants] };
}
const codeHits = (units: readonly Unit[]): string[] => units.flatMap(unit => codeFindings(unit.path, unit.source));
const launchesOf = (units: readonly Unit[]): Launch[] => units.flatMap(unit => rfLaunches(unit.path, unit.source));
/** The path a code or docs finding names (the text before its first ": " or ":<line>"). */
const findingPath = (finding: string): string => finding.slice(0, finding.indexOf(":"));

/** The caps a provider source holds (CAPS). */
function capsOf(source: string): { readonly deadlineMs: (number | null)[]; readonly bounds: Record<string, (number | null)[]> } {
  const file = parsed(PROVIDER, source);
  const consts = new Map<string, ts.Expression>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0) {
      for (const declaration of node.declarations) if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined) consts.set(declaration.name.text, declaration.initializer);
    }
    ts.forEachChild(node, collect);
  };
  collect(file);
  const fold = (node: ts.Expression, depth: number): number | null => {
    if (depth > 8) return null;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isParenthesizedExpression(node)) return fold(node.expression, depth + 1);
    if (ts.isIdentifier(node)) {
      const bound = consts.get(node.text);
      return bound === undefined ? null : fold(bound, depth + 1);
    }
    if (ts.isBinaryExpression(node)) {
      const left = fold(node.left, depth + 1);
      const right = fold(node.right, depth + 1);
      if (left === null || right === null) return null;
      if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right;
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right;
      if (node.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right;
    }
    return null;
  };
  const stopReasons = (node: ts.Node): string[] => {
    const reasons: string[] = [];
    const visit = (inner: ts.Node): void => {
      if (ts.isCallExpression(inner) && ts.isIdentifier(inner.expression) && inner.expression.text === "stop") {
        const first = inner.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first)) reasons.push(first.text);
      }
      ts.forEachChild(inner, visit);
    };
    visit(node);
    return reasons;
  };
  const deadlineMs: (number | null)[] = [];
  const bounds: Record<string, (number | null)[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "setTimeout") {
      const [callback, delay] = node.arguments;
      if (callback !== undefined && stopReasons(callback).includes("deadline")) deadlineMs.push(delay === undefined ? null : fold(delay, 0));
    }
    if (ts.isIfStatement(node) && ts.isBinaryExpression(node.expression) && node.expression.operatorToken.kind === ts.SyntaxKind.GreaterThanToken) {
      const bound = fold(node.expression.right, 0);
      for (const reason of stopReasons(node.thenStatement)) if (reason !== "deadline") bounds[reason] = [...(bounds[reason] ?? []), bound];
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { deadlineMs, bounds };
}

/** Whether a launcher call's first argument names rf (LAUNCH): a string literal whose first word, any directory prefix dropped,
 * is rf. */
function namesRf(argument: ts.Expression | undefined): boolean {
  if (argument === undefined || !ts.isStringLiteralLike(argument)) return false;
  const word = argument.text.trim().split(/\s+/)[0] ?? "";
  return word.slice(word.lastIndexOf("/") + 1) === "rf";
}
/** One rf launch (LAUNCH): its site, its env initializer as written, the members after env that can override it, every accessor
 * of its options, and BINDINGS (a type alias, so a launch is a Json value). */
type Launch = { readonly site: string; readonly env: string | null; readonly after: string[]; readonly accessors: string[]; readonly bindings: string[] };
/** A module specifier as BINDINGS names it: a relative one resolved against the importing module's path, .js read as .ts. */
function moduleOf(fileName: string, specifier: ts.Expression): string {
  const text = ts.isStringLiteralLike(specifier) ? specifier.text : specifier.getText();
  return text.startsWith(".") ? posix.join(posix.dirname(fileName), text).replace(/\.([cm]?)js$/, ".$1ts") : text;
}
/** The TypeScript checker over one parsed module alone (BINDINGS): no lib and no import resolution, so a name the module does
 * not declare has no symbol. */
function moduleChecker(file: ts.SourceFile): ts.TypeChecker {
  const options: ts.CompilerOptions = { noLib: true, noResolve: true, allowJs: true, types: [] };
  const host = ts.createCompilerHost(options, true);
  host.getSourceFile = name => (name === file.fileName ? file : undefined);
  host.fileExists = name => name === file.fileName;
  host.readFile = name => (name === file.fileName ? file.text : undefined);
  return ts.createProgram({ rootNames: [file.fileName], options, host }).getTypeChecker();
}
/** One name's binding (BINDINGS): `<name> <- import <imported> from <module>`, `<name> <- local <kind>` or `<name> <- global`. */
function bindingOf(checker: ts.TypeChecker, fileName: string, name: ts.Identifier): string {
  const declaration = checker.getSymbolAtLocation(name)?.declarations?.[0];
  if (declaration === undefined) return `${name.text} <- global`;
  if (ts.isImportSpecifier(declaration)) {
    const imported = (declaration.propertyName ?? declaration.name).text;
    return `${name.text} <- import ${imported} from ${moduleOf(fileName, declaration.parent.parent.parent.moduleSpecifier)}`;
  }
  if (ts.isNamespaceImport(declaration)) return `${name.text} <- import * from ${moduleOf(fileName, declaration.parent.parent.moduleSpecifier)}`;
  if (ts.isImportClause(declaration)) return `${name.text} <- import default from ${moduleOf(fileName, declaration.parent.moduleSpecifier)}`;
  return `${name.text} <- local ${ts.SyntaxKind[declaration.kind]}`;
}
/** The names an expression references (BINDINGS), in source order: every identifier but a property name after a dot or before
 * a colon, and none inside a type. */
function referencedNames(root: ts.Node): ts.Identifier[] {
  const names: ts.Identifier[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isTypeNode(node)) return;
    const member = ts.isIdentifier(node) && (ts.isPropertyAccessExpression(node.parent) || ts.isPropertyAssignment(node.parent)) && node.parent.name === node;
    if (ts.isIdentifier(node) && !member) names.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return names;
}
/** The members of an options object after its env property that can override env (LAUNCH): a spread, a member named env, a
 * computed name, each as written. */
function afterEnv(options: ts.ObjectLiteralExpression, env: ts.ObjectLiteralElementLike, file: ts.SourceFile): string[] {
  return options.properties
    .slice(options.properties.indexOf(env) + 1)
    .filter(member => ts.isSpreadAssignment(member) || (member.name !== undefined && (ts.isComputedPropertyName(member.name) || member.name.text === "env")))
    .map(member => member.getText(file).replace(/\s+/g, ""));
}
/** Every accessor of an options object (LAUNCH), before or after env and under any name, as its kind and its name as written:
 * Node's options copy calls each getter, so LAUNCH fails closed on every get and set member. */
function accessorsOf(options: ts.ObjectLiteralExpression, file: ts.SourceFile): string[] {
  return options.properties.flatMap(member => {
    if (ts.isGetAccessorDeclaration(member)) return [`get ${member.name.getText(file).replace(/\s+/g, "")}`];
    if (ts.isSetAccessorDeclaration(member)) return [`set ${member.name.getText(file).replace(/\s+/g, "")}`];
    return [];
  });
}
/** The rf launches a src module makes (LAUNCH), each with BINDINGS (the module's checker is built only when it launches rf). */
function rfLaunches(fileName: string, source: string): Launch[] {
  const file = parsed(fileName, source);
  let checker: ts.TypeChecker | undefined;
  const checked = (): ts.TypeChecker => {
    checker ??= moduleChecker(file);
    return checker;
  };
  const out: Launch[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : undefined;
      if (callee !== undefined && LAUNCHERS.has(callee) && namesRf(node.arguments[0])) {
        const options = node.arguments.find(argument => ts.isObjectLiteralExpression(argument));
        const literal = options !== undefined && ts.isObjectLiteralExpression(options) ? options : undefined;
        const env = literal?.properties.find(property => ts.isPropertyAssignment(property) && property.name.getText(file) === "env");
        const initializer = env !== undefined && ts.isPropertyAssignment(env) ? env.initializer : undefined;
        const types = checked();
        const names = [...referencedNames(node.expression), ...(initializer === undefined ? [] : referencedNames(initializer))];
        out.push({
          site: `${fileName} ${callee}`,
          env: initializer === undefined ? null : initializer.getText(file).replace(/\s+/g, ""),
          after: literal === undefined || env === undefined ? [] : afterEnv(literal, env, file),
          accessors: literal === undefined ? [] : accessorsOf(literal, file),
          bindings: [...new Set(names.map(name => bindingOf(types, fileName, name)))],
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

/** The raw sentences of a markdown text (DOCS), whitespace collapsed. */
function sentencesOf(body: string): string[] {
  return body
    .split(SENTENCE_BREAK)
    .map(sentence => sentence.replace(/\s+/g, " ").trim())
    .filter(sentence => sentence.length > 0);
}
/** The docs walk (row D): the pages read, and every sentence of each page (its text, then `appended`) and then of each plant. */
function docsWalk(plants: readonly Unit[] = [], appended = ""): { readonly pages: string[]; readonly sentences: { readonly page: string; readonly sentence: string }[] } {
  const pages = [...topPages(), ...pageRoots().flatMap(root => walked(root).filter(path => PAGE.test(path)))].sort();
  const units = [...pages.map(page => ({ path: page, source: `${read(page)}${appended}` })), ...plants];
  return { pages, sentences: units.flatMap(unit => sentencesOf(unit.source).map(sentence => ({ page: unit.path, sentence }))) };
}
/** D2's judge: every sentence naming the vocabulary that is not a sentence of the bound paragraph's docs/18 line. */
function outsideOf(sentences: readonly { readonly page: string; readonly sentence: string }[], line: string): string[] {
  return sentences
    .filter(entry => families(entry.sentence).length > 0)
    .filter(entry => entry.page !== DOCS_PAGE || line === "" || !line.includes(entry.sentence))
    .map(entry => `${entry.page}: ${entry.sentence.slice(0, 160)}`);
}
/** docs/18's bound section, in the rendered view. */
const boundSection = (): DocsSection => docsSection(read(DOCS_PAGE), DOCS_SECTION, 2, [DOCS_TITLE]);
/** The section's rendered paragraphs opening with the bound label. */
const boundParagraphs = (section: DocsSection): string[] =>
  section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.startsWith(DOCS_LABEL) ? [block.text] : []));
/** The raw markdown line of docs/18 holding the bound paragraph ("" when none). */
const boundLine = (): string => read(DOCS_PAGE).split("\n").find(line => line.startsWith(`**${DOCS_LABEL}**`)) ?? "";

let titleCache: string | undefined;
/** The owner filing's title in the tracked bead export; throws when the export holds no such row. */
function filingTitle(): string {
  if (titleCache !== undefined) return titleCache;
  for (const line of read(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (row !== null && typeof row === "object" && "id" in row && row.id === BEAD && "title" in row && typeof row.title === "string") {
      titleCache = row.title;
      return row.title;
    }
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}
/** The subject's spellings in the owner's title: the two shipped type names, the declared boundary and limit, the policy word. */
function titleSpellings(): string[] {
  const title = filingTitle();
  const shipped = /\bWhen rf ships (\w+)\/(\w+) /.exec(title)?.slice(1) ?? [];
  const declared = /\bany Pi-declared (\w+) or ([\w-]+) configuration\b/.exec(title)?.slice(1) ?? [];
  const policy = /\bdefault (\w+) policy\b/.exec(title)?.slice(1) ?? [];
  return [...shipped, ...declared, ...policy];
}
/** The outside anchors' readings of a set of rows (OUTSIDE ANCHORS): the name of every reading the rows' labels fail. Only the
 * labels of the rows CLAUSES names are read. */
function anchorFindings(rows: readonly Row[], title: string, paragraph: string): string[] {
  const labelOf = (id: string): string => rows.find(row => row.id === id)?.label ?? `<no row ${id}>`;
  const joined = CLAUSES.map(pair => pair.map(labelOf).join(" and "));
  const [declared, passive] = joined;
  const findings: string[] = [];
  if (JSON.stringify(/\), (.+); (.+)\.$/.exec(title)?.slice(1) ?? null) !== JSON.stringify(joined)) findings.push("title clauses");
  if (!paragraph.startsWith(`${DOCS_LABEL} ${passive ?? ""}.`)) findings.push("paragraph opening");
  if (!paragraph.includes(`. ${capitalized(declared ?? "")}, the `)) findings.push("paragraph A-B sentence");
  return findings;
}

/** Each control's verdict under a reader; the list is the witness, every entry asserted against its expected verdict. */
function verdicts(reader: (text: string) => boolean, controls: readonly { readonly text: string; readonly hit: boolean }[]): Json {
  const out = controls.map(control => ({ text: control.text, hit: reader(control.text) }));
  expect(out).toStrictEqual(controls.map(control => ({ text: control.text, hit: control.hit })));
  return out;
}
const codeHit = (source: string): boolean => codeFindings("plant.ts", source).length > 0;
const docsHit = (text: string): boolean => sentencesOf(text).some(sentence => families(sentence).length > 0);
/** A template literal with one substitution, built without a literal `${` in this file. */
const TEMPLATE_PLANT = ["const flag = `speculation=", "{on}`;"].join("$");
/** The PLANTED LEGS: each walk's judge reads one planted unit after the real ones and must report exactly the plant, and reads
 * the real units with a plant appended to each and must report that plant once at every real unit's path. */
const CODE_PLANT: Unit = { path: "src/zz-plant-declaration.ts", source: "export const boundary = { per_class_slots: { render: 4 } };\n" };
const CODE_APPENDED = "\nexport const zzAppendedPlant = { per_class_slots: { render: 4 } };\n";
const LAUNCH_PLANT: Unit = { path: "src/zz-plant-launch.ts", source: 'import { spawnSync } from "node:child_process";\nspawnSync("rf", ["--json", "--version"], { env: process.env });\n' };
const LAUNCH_APPENDED = '\nspawnSync("rf", ["--json", "--version"], { env: process.env });\n';
const DOCS_PLANT: Unit = {
  path: "docs/workbench/zz-plant.md",
  source: "# Plant\n\nrf's broker default is turned on for Pi renders.\n\n**RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.\n",
};
const DOCS_APPENDED = "\n\nrf's broker default is turned on for Pi renders.\n";
/** R-RENDERED's controls (Q8): a default named only once rendered reads quiet, and the same sentences written plainly are read. */
const RENDERED_CONTROLS: readonly { readonly text: string; readonly hit: boolean }[] = [
  { text: "rf's spec*ul*ation policy is turned on by default for Pi renders.", hit: false },
  { text: "rf's spec**ul**ation policy is turned on by default for Pi renders.", hit: false },
  { text: "rf's spec`ul`ation policy is turned on by default for Pi renders.", hit: false },
  { text: "rf's [spec](./zz.md)ulation policy is turned on by default for Pi renders.", hit: false },
  { text: "Pi sets RF&lowbar;ADAPTIVE on every render.", hit: false },
  { text: "rf's specu&shy;lation policy is turned on by default for Pi renders.", hit: false },
  { text: "Pi sets RF&#95;ADAPTIVE on every render.", hit: false },
  { text: "rf's <em>spec</em>ulation policy is turned on by default for Pi renders.", hit: false },
  { text: "rf's speculation policy is turned on by default for Pi renders.", hit: true },
  { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
];
/** R-VISUAL-ONLY's controls (Q9), each code point built with String.fromCodePoint: a stem split between two of its letters by a
 * code point WORDS reads as a break (a zero-width space, a raw soft hyphen, a Cyrillic e) reads quiet; a two-word phrase broken
 * once that way (a word joiner inside RF_ADAPTIVE) is still read, a three-word phrase broken into four (a zero-width space inside
 * the class of per class slots) is not; and the plain word is read. */
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const SOFT_HYPHEN = String.fromCodePoint(0x00ad);
const CYRILLIC_E = String.fromCodePoint(0x0435);
const WORD_JOINER = String.fromCodePoint(0x2060);
const VISUAL_DOCS_CONTROLS: readonly { readonly text: string; readonly hit: boolean }[] = [
  { text: `rf's spec${ZERO_WIDTH_SPACE}ulation policy is turned on by default for Pi renders.`, hit: false },
  { text: `rf's specu${SOFT_HYPHEN}lation policy is turned on by default for Pi renders.`, hit: false },
  { text: `rf's sp${CYRILLIC_E}culation policy is turned on by default for Pi renders.`, hit: false },
  { text: `Pi sets RF_ADA${WORD_JOINER}PTIVE on every render.`, hit: true },
  { text: `Pi keeps per-cla${ZERO_WIDTH_SPACE}ss slots for renders.`, hit: false },
  { text: "rf's speculation policy is turned on by default for Pi renders.", hit: true },
];
const VISUAL_CODE_CONTROLS: readonly { readonly text: string; readonly hit: boolean }[] = [
  { text: `const policy = "spec${ZERO_WIDTH_SPACE}ulation";`, hit: false },
  { text: 'const policy = "speculation";', hit: true },
];
/** B1's synthetic provider: the reader must read its values, never the live provider's. */
const CAPS_PLANT = 'const LIMIT=4*1024;\nconst timer=setTimeout(()=>stop("deadline"),1_500);\nif(outBytes>LIMIT) stop("stdout");\nif(errBytes>LIMIT) stop("stderr");\nif(errBytes>=LIMIT) stop("stderr");\n';
/** LAUNCH's table: each launcher form, as one module's text, and the rf launches LAUNCH reads in it (BINDINGS included). */
const LAUNCH_FORMS: readonly { readonly text: string; readonly launches: readonly Launch[] }[] = [
  { text: 'execSync("rf --json --version");', launches: [{ site: "form.ts execSync", env: null, after: [], accessors: [], bindings: ["execSync <- global"] }] },
  {
    text: 'spawnSync("/usr/local/bin/rf", ["--json", "--version"], { env: process.env });',
    launches: [{ site: "form.ts spawnSync", env: "process.env", after: [], accessors: [], bindings: ["spawnSync <- global", "process <- global"] }],
  },
  {
    text: 'spawn("rf --json --version", { shell: true, env: process.env });',
    launches: [{ site: "form.ts spawn", env: "process.env", after: [], accessors: [], bindings: ["spawn <- global", "process <- global"] }],
  },
  {
    text: 'childProcess.execFile("rf", ["--json"], { env: { ...process.env } });',
    launches: [{ site: "form.ts execFile", env: "{...process.env}", after: [], accessors: [], bindings: ["childProcess <- global", "process <- global"] }],
  },
  { text: '/^rf/.exec("rf --json");', launches: [{ site: "form.ts exec", env: null, after: [], accessors: [], bindings: [] }] },
  { text: 'spawn("rfc", []); spawn("surf", []); execFileSync("git", ["rf"]);', launches: [] },
  {
    text: 'spawn("rf", [], { env: scrub(process.env, process.env.HOME), ...overrides });',
    launches: [
      { site: "form.ts spawn", env: "scrub(process.env,process.env.HOME)", after: ["...overrides"], accessors: [], bindings: ["spawn <- global", "scrub <- global", "process <- global"] },
    ],
  },
  {
    text: 'spawn("rf", [], { env: first, "env": second, [key]: third, cwd: root });',
    launches: [{ site: "form.ts spawn", env: "first", after: ['"env":second', "[key]:third"], accessors: [], bindings: ["spawn <- global", "first <- global"] }],
  },
  {
    text: 'spawn("rf", [], { ...base, env: only, cwd: root, stdio: "pipe" });',
    launches: [{ site: "form.ts spawn", env: "only", after: [], accessors: [], bindings: ["spawn <- global", "only <- global"] }],
  },
  {
    text: 'spawn("rf",argv,{stdio:["ignore","pipe","pipe"],get cwd(){this.env=process.env;return undefined;},env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)});',
    launches: [
      {
        site: "form.ts spawn",
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: ["get cwd"],
        bindings: ["spawn <- global", "scrubbedEnvironment <- global", "process <- global", "RF_CHILD_ENV_ALLOWLIST <- global"],
      },
    ],
  },
  {
    text: 'spawn("rf",argv,{stdio:["ignore","pipe","pipe"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST),get cwd(){Object.assign(this.env??{},process.env);return undefined;}});',
    launches: [
      {
        site: "form.ts spawn",
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: ["get cwd"],
        bindings: ["spawn <- global", "scrubbedEnvironment <- global", "process <- global", "RF_CHILD_ENV_ALLOWLIST <- global"],
      },
    ],
  },
  {
    text: 'spawn("rf", [], { env: only, get cwd() { this.env = process.env; return undefined; } });',
    launches: [{ site: "form.ts spawn", env: "only", after: [], accessors: ["get cwd"], bindings: ["spawn <- global", "only <- global"] }],
  },
  {
    text: 'spawn("rf", [], { get [key]() { return undefined; }, env: only, set cwd(value) {}, get 0() { return undefined; }, get "stdio"() { return "pipe"; }, get env() { return process.env; } });',
    launches: [
      {
        site: "form.ts spawn",
        env: "only",
        after: ["getenv(){returnprocess.env;}"],
        accessors: ["get [key]", "set cwd", "get 0", 'get "stdio"', "get env"],
        bindings: ["spawn <- global", "only <- global"],
      },
    ],
  },
  {
    text: 'childProcess.spawnSync("rf", [], { stdio: "pipe", get env() { return process.env; } });',
    launches: [
      {
        site: "form.ts spawnSync",
        env: null,
        after: [],
        accessors: ["get env"],
        bindings: ["childProcess <- global"],
      },
    ],
  },
];
/** BINDINGS' table: each binding form, as one module's text beside the provider, and the bindings of each rf launch in it. */
const BINDING_FORM_PATH = "src/workbench/providers/zz-binding-form.ts";
const BINDING_FORMS: readonly { readonly text: string; readonly bindings: readonly (readonly string[])[] }[] = [
  {
    text: 'import { spawn } from "node:child_process";\nimport { RF_CHILD_ENV_ALLOWLIST as allow, scrubbedEnvironment } from "../process-env.js";\nspawn("rf", [], { env: scrubbedEnvironment(process.env, allow) });',
    bindings: [
      [
        "spawn <- import spawn from node:child_process",
        `scrubbedEnvironment <- import scrubbedEnvironment from ${PROCESS_ENV}`,
        "process <- global",
        `allow <- import RF_CHILD_ENV_ALLOWLIST from ${PROCESS_ENV}`,
      ],
    ],
  },
  {
    text: 'import * as childProcess from "node:child_process";\nchildProcess.spawn("rf", [], { env: process.env });',
    bindings: [["childProcess <- import * from node:child_process", "process <- global"]],
  },
  {
    text: 'import childProcess from "node:child_process";\nchildProcess.execFile("rf", [], { env: process.env });',
    bindings: [["childProcess <- import default from node:child_process", "process <- global"]],
  },
  {
    text: 'import { scrubbedEnvironment } from "./zz-env.js";\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
    bindings: [["spawn <- global", "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/providers/zz-env.ts", "process <- global"]],
  },
  {
    text: 'const scrubbedEnvironment = (source: unknown): unknown => source;\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
    bindings: [["spawn <- global", "scrubbedEnvironment <- local VariableDeclaration", "process <- global"]],
  },
  {
    text: 'function scrubbedEnvironment(source: unknown): unknown {\n  return source;\n}\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
    bindings: [["spawn <- global", "scrubbedEnvironment <- local FunctionDeclaration", "process <- global"]],
  },
  {
    text: 'import { scrubbedEnvironment } from "../process-env.js";\nexport function launch(): void {\n  const scrubbedEnvironment = (source: unknown): unknown => source;\n  spawn("rf", [], { env: scrubbedEnvironment(process.env) });\n}',
    bindings: [["spawn <- global", "scrubbedEnvironment <- local VariableDeclaration", "process <- global"]],
  },
  {
    text: 'export function launch(scrubbedEnvironment: (source: unknown) => unknown): void {\n  spawn("rf", [], { env: scrubbedEnvironment(process.env) });\n}',
    bindings: [["spawn <- global", "scrubbedEnvironment <- local Parameter", "process <- global"]],
  },
  {
    text: 'export function launch(ready: boolean, run: () => void): void {\n  if (ready) {\n    var spawn = run;\n  }\n  spawn("rf", [], { env: process.env as Record<string, string> });\n}',
    bindings: [["spawn <- local VariableDeclaration", "process <- global"]],
  },
  {
    text: 'const process = { env: {} };\nspawn("rf", [], { env: process.env });',
    bindings: [["spawn <- global", "process <- local VariableDeclaration"]],
  },
];
/** C2's binding plant: a module whose spawn carries the provider's env text through a local pass-through scrub, a spread after. */
const BINDING_PLANT: Unit = {
  path: "src/workbench/providers/zz-plant-binding.ts",
  source:
    'import { spawn } from "node:child_process";\nimport { RF_CHILD_ENV_ALLOWLIST } from "../process-env.js";\n' +
    "const scrubbedEnvironment = (source: NodeJS.ProcessEnv, _allowlist: readonly string[]): NodeJS.ProcessEnv => source;\n" +
    "const launchOverrides = { env: process.env };\n" +
    'spawn("rf", ["context"], { env: scrubbedEnvironment(process.env, RF_CHILD_ENV_ALLOWLIST), ...launchOverrides });\n',
};

/** C1's live reading: scrubbedEnvironment over this process's own environment, with rf's seat set in it for that one synchronous
 * call and restored after (its prior value, or its absence). */
function liveScrub(scrub: (source: NodeJS.ProcessEnv, allowlist: readonly string[]) => Record<string, string>): {
  readonly parentSeat: string | null;
  readonly child: Record<string, string>;
  readonly childOutside: string[];
  readonly carriesPath: boolean;
} {
  const seat = "RF_ADAPTIVE";
  const prior = process.env[seat];
  process.env[seat] = "speculation";
  try {
    const child = scrub(process.env, RF_CHILD_ENV_ALLOWLIST);
    return {
      parentSeat: process.env[seat] ?? null,
      child,
      childOutside: Object.keys(child).filter(name => !RF_CHILD_ENV_ALLOWLIST.includes(name)).sort(),
      carriesPath: typeof process.env.PATH === "string" && child.PATH === process.env.PATH,
    };
  } finally {
    if (prior === undefined) Reflect.deleteProperty(process.env, seat);
    else process.env[seat] = prior;
  }
}
/** C1's prototype judge: whether an environment object has no prototype (Node's for-in over env reads inherited names). */
const hasNullPrototype = (env: object): boolean => Object.getPrototypeOf(env) === null;
/** C1's planted scrub (its planted leg, refusal #1's F3 shape): the real scrub, then every parent name, when its source is this
 * process's own environment; over any other source, the real scrub. */
const LEAKY_SCRUB = (source: NodeJS.ProcessEnv, allowlist: readonly string[]): Record<string, string> =>
  source === process.env ? Object.assign(scrubbedEnvironment(source, allowlist), source) : scrubbedEnvironment(source, allowlist);

const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const { modules, units } = codeWalk();
    const hits = codeHits(units);
    const planted = codeHits(codeWalk([CODE_PLANT]).units);
    const appended = codeHits(codeWalk([], CODE_APPENDED).units).map(findingPath);
    expect(hits, "src lexemes naming a boundary or broker-limit configuration: a Pi declaration, which owes the adoption-time test").toEqual([]);
    expect(planted, "the same judge over the src modules and a planted declaration after them: the plant is its one finding").toEqual([`${CODE_PLANT.path}:1 perclassslots`]);
    expect(appended, "the same judge over every src module with a declaration appended: the plant once at every module's path, in walk order").toEqual(modules);
    return { hits, planted, appendedUnread: modules.filter(path => !appended.includes(path)) };
  },
  A2: () => {
    const { modules } = codeWalk();
    const listed = gitListed("src").filter(path => CODE_MODULE.test(path));
    const floorMet = modules.length >= SRC_FLOOR;
    const anchorRead = modules.includes(PROVIDER) && read(PROVIDER).includes('spawn("rf",');
    expect(modules, "the code walk read exactly git's own listing of src modules").toStrictEqual(listed);
    expect(floorMet, `src modules read: ${modules.length}, floor ${SRC_FLOOR}`).toBe(true);
    expect(anchorRead, `the code walk read ${PROVIDER}, holding the rf spawn`).toBe(true);
    return { walkAgreesWithGit: true, floorMet, anchorRead };
  },
  B1: () => {
    const caps = capsOf(read(PROVIDER));
    const synthetic = capsOf(CAPS_PLANT);
    expect(caps.deadlineMs, "the provider's deadline timer delays (ms)").toEqual([60_000]);
    expect(caps.bounds, "the provider's stream bounds (bytes), by stop reason").toStrictEqual({ stdout: [256 * 1024], stderr: [256 * 1024] });
    expect(synthetic, "the same reader over a synthetic provider: its own delay and bounds, the inclusive comparison not read").toStrictEqual({ deadlineMs: [1500], bounds: { stdout: [4096], stderr: [4096] } });
    return { deadlineMs: caps.deadlineMs, bounds: caps.bounds, synthetic };
  },
  B2: () => {
    const match = /\bthe (\d+) s render deadline and the (\d+) KiB stdout and stderr bounds\b/.exec(boundParagraphs(boundSection())[0] ?? "");
    const seconds = match?.[1] === undefined ? null : Number(match[1]);
    const kib = match?.[2] === undefined ? null : Number(match[2]);
    const caps = capsOf(read(PROVIDER));
    expect(match, "the docs paragraph names the render deadline in seconds and the stream bounds in KiB").not.toBeNull();
    expect(caps.deadlineMs.map(ms => (ms === null ? null : ms / 1000)), "the provider's deadline, in the paragraph's seconds").toEqual([seconds]);
    expect([...(caps.bounds.stdout ?? []), ...(caps.bounds.stderr ?? [])].map(bytes => (bytes === null ? null : bytes / 1024)), "the provider's stream bounds, in the paragraph's KiB").toEqual([kib, kib]);
    return { deadlineSeconds: seconds, boundKiB: kib };
  },
  C1: () => {
    const rfFamily = RF_CHILD_ENV_ALLOWLIST.filter(name => /^(?:SWARM_)?RF_/i.test(name));
    const parent: Record<string, string> = { PATH: "/usr/bin", HOME: "/home/fixture", RF_ADAPTIVE: "speculation" };
    const child = scrubbedEnvironment(parent, RF_CHILD_ENV_ALLOWLIST);
    const seatBefore = process.env.RF_ADAPTIVE;
    const live = liveScrub(scrubbedEnvironment);
    const leaky = liveScrub(LEAKY_SCRUB);
    const restored = process.env.RF_ADAPTIVE === seatBefore;
    const nullPrototype = [child, live.child].map(hasNullPrototype);
    const planted = { leakyReportsSeat: leaky.childOutside.includes("RF_ADAPTIVE"), plainCopyNullPrototype: hasNullPrototype({ ...child }) };
    expect(rfFamily, "rf-family names on the rf child allowlist").toEqual([]);
    expect(parent.RF_ADAPTIVE, "the parent fixture carries rf's seat, set to its speculation feature").toBe("speculation");
    expect(Object.hasOwn(child, "RF_ADAPTIVE"), "a parent RF_ADAPTIVE=speculation reached the rf child environment").toBe(false);
    expect(Object.keys(child).sort(), "the names the rf child environment holds from that parent").toEqual(["HOME", "PATH"]);
    expect(live.parentSeat, "this process's own environment carried rf's seat, set to its speculation feature, for the scrub").toBe("speculation");
    expect(live.childOutside, "names outside the allowlist in the rf child environment scrubbed from this process's own environment").toEqual([]);
    expect(live.carriesPath, "the rf child environment scrubbed from this process's own environment carries its PATH, with its value").toBe(true);
    expect(nullPrototype, "each rf child environment is a null-prototype object (Node's for-in over env reads inherited names)").toEqual([true, true]);
    expect(planted.leakyReportsSeat, "the same live judge over a scrub planted to keep every parent name for this process's own environment: the seat among its names").toBe(true);
    expect(planted.plainCopyNullPrototype, "the same prototype judge over a plain-object copy of the fixture child: it reads a prototype").toBe(false);
    expect(restored, "rf's seat in this process's own environment once the live readings end: as before them").toBe(true);
    return {
      allowlist: [...RF_CHILD_ENV_ALLOWLIST],
      rfFamily,
      parentSeat: parent.RF_ADAPTIVE ?? null,
      parentNames: Object.keys(parent).sort(),
      childNames: Object.keys(child).sort(),
      live: { parentSeat: live.parentSeat, childOutside: live.childOutside, carriesPath: live.carriesPath },
      nullPrototype,
      planted,
      restored,
    };
  },
  C2: () => {
    const { modules, units } = codeWalk();
    const launches = launchesOf(units);
    const planted = launchesOf(codeWalk([LAUNCH_PLANT]).units);
    const appended = launchesOf(codeWalk([], LAUNCH_APPENDED).units)
      .filter(launch => launch.env === "process.env")
      .map(launch => launch.site);
    const bound = launchesOf(codeWalk([BINDING_PLANT]).units);
    const forms = LAUNCH_FORMS.map(form => ({ text: form.text, launches: rfLaunches("form.ts", form.text) }));
    const bindingForms = BINDING_FORMS.map(form => ({ text: form.text, bindings: rfLaunches(BINDING_FORM_PATH, form.text).map(launch => launch.bindings) }));
    expect(launches, "every rf launch in src: the env its options hand the child, the members after it that can override env, its options' accessors, and its names' bindings").toStrictEqual([
      {
        site: `${PROVIDER} spawn`,
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          `scrubbedEnvironment <- import scrubbedEnvironment from ${PROCESS_ENV}`,
          "process <- global",
          `RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from ${PROCESS_ENV}`,
        ],
      },
    ]);
    expect(planted, "the same scan over the src modules and a planted inherited-env rf launch after them").toStrictEqual([
      ...launches,
      { site: `${LAUNCH_PLANT.path} spawnSync`, env: "process.env", after: [], accessors: [], bindings: ["spawnSync <- import spawnSync from node:child_process", "process <- global"] },
    ]);
    expect(bound, "the same scan over the src modules and a planted spawn carrying the provider's env text through a local scrub, a spread after it").toStrictEqual([
      ...launches,
      {
        site: `${BINDING_PLANT.path} spawn`,
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: ["...launchOverrides"],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          "scrubbedEnvironment <- local VariableDeclaration",
          "process <- global",
          `RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from ${PROCESS_ENV}`,
        ],
      },
    ]);
    expect(appended, "the same scan over every src module with an inherited-env rf launch appended: the plant once at every module's path").toEqual(modules.map(path => `${path} spawnSync`));
    expect(forms, "LAUNCH over its table of launcher forms").toStrictEqual(LAUNCH_FORMS.map(form => ({ text: form.text, launches: form.launches })));
    expect(bindingForms, "BINDINGS over its table of binding forms").toStrictEqual(BINDING_FORMS.map(form => ({ text: form.text, bindings: form.bindings })));
    return { launches, planted, bound, appendedUnread: modules.filter(path => !appended.includes(`${path} spawnSync`)), forms, bindingForms };
  },
  D1: () => {
    const section = boundSection();
    const paragraphs = boundParagraphs(section);
    expect(section.ok, section.why).toBe(true);
    expect(section.hasHtml, "the bound section carries HTML").toBe(false);
    expect(paragraphs, `docs/18's paragraphs opening "${DOCS_LABEL}"`).toEqual([PARAGRAPH]);
    return { section: section.ok, paragraphs: paragraphs.length };
  },
  D2: () => {
    const docs = docsWalk();
    const listed = gitListed(...pageRoots(), ":(glob)*.md").filter(path => PAGE.test(path));
    const unreadTracked = trackedPages().filter(page => !page.startsWith(`${UNREAD_PAGE_ROOT}/`) && !docs.pages.includes(page));
    const floorMet = docs.pages.filter(page => page.startsWith("docs/")).length >= DOCS_FLOOR;
    const anchorRead = docs.pages.includes(DOCS_PAGE);
    const line = boundLine();
    const named = docs.sentences.filter(entry => families(entry.sentence).length > 0);
    const outside = outsideOf(docs.sentences, line);
    const plantedOutside = outsideOf(docsWalk([DOCS_PLANT]).sentences, line);
    const appended = outsideOf(docsWalk([], DOCS_APPENDED).sentences, line).map(findingPath);
    expect(docs.pages, "the docs walk read exactly git's own listing of its roots' .md pages and of the top-level pages").toStrictEqual(listed);
    expect(unreadTracked, "the .md pages git tracks outside test/ that the docs walk did not read").toEqual([]);
    expect(floorMet && anchorRead, `docs pages read under docs/ meet the floor ${DOCS_FLOOR} and include ${DOCS_PAGE}`).toBe(true);
    expect(line, `docs/18 holds the bound paragraph's line opening **${DOCS_LABEL}**`).not.toBe("");
    expect(outside, "docs sentences naming the vocabulary outside the bound paragraph (another documented default)").toEqual([]);
    expect(plantedOutside, "the same judge over the docs pages and a planted page after them: both plant sentences, the bound one copied off docs/18 included").toEqual([
      `${DOCS_PLANT.path}: rf's broker default is turned on for Pi renders.`,
      `${DOCS_PLANT.path}: **RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.`,
    ]);
    expect(appended, "the same judge over every docs page with another default appended: the plant once at every page's path").toEqual(docs.pages);
    return { walkAgreesWithGit: true, unreadTracked, floorMet, anchorRead, named: named.length, outside, plantedOutside, appendedUnread: docs.pages.filter(page => !appended.includes(page)) };
  },
  M1: () => {
    const spellings = titleSpellings();
    expect(spellings, "the subject's spellings in the owner's title").toEqual(["ResourceBrokerLimits", "SpeculationBoundary", "SpeculationBoundary", "broker-limit", "speculation"]);
    expect(spellings.filter(spelling => !codeHit(`const subject = "${spelling}";`)), "title spellings the code reader misses").toEqual([]);
    return verdicts(codeHit, [
      { text: "const boundary: SpeculationBoundary = make();", hit: true },
      { text: "export const limits = new ResourceBrokerLimits();", hit: true },
      { text: "const config = { per_class_slots: { render: 1 } };", hit: true },
      { text: "const config = { foregroundReserve: 0, maxPendingInterests: 4 };", hit: true },
      { text: 'const seat = "RF_ADAPTIVE";', hit: true },
      { text: "env.rfAdaptive = on;", hit: true },
      { text: 'const key = "broker-limit";', hit: true },
      { text: TEMPLATE_PLANT, hit: true },
      { text: "const seat = /RF_ADAPTIVE=/;", hit: true },
      { text: "class Host { #speculative = false; }", hit: true },
      { text: 'const preview = "noncommitted render";', hit: false },
      { text: 'const interest = "pending"; const slots = 2;', hit: false },
      { text: "const limits = { maxPendingInterests: 4 };", hit: true },
      { text: "const limits = { max_pending_interests: 4 };", hit: true },
      { text: "const limits = { maxInFlightBytes: 131_072 };", hit: true },
      { text: "const limits = { max_in_flight_bytes: 131_072 };", hit: true },
      { text: "const limits = { maxRetainedBytes: 0 };", hit: true },
      { text: "const limits = { max_retained_bytes: 0 };", hit: true },
      { text: "const limits = { cpuBudgetMs: 0 };", hit: true },
      { text: "const limits = { cpu_budget_ms: 0 };", hit: true },
      { text: "const limits = { tokenEstimateBudget: 0 };", hit: true },
      { text: "const limits = { token_estimate_budget: 0 };", hit: true },
      { text: "const limits = { perClassSlots: { render: 1 } };", hit: true },
      { text: "const limits = { foregroundReserve: 0 };", hit: true },
      { text: "const limits = { foreground_reserve: 0 };", hit: true },
      { text: "const registry = { maxInFlight: 32 };", hit: false },
    ]);
  },
  M2: () => {
    expect(sentencesOf("One. Two!\n\n- a list item\n# A heading\n| a | row |\n> a quote"), "the sentence cutter's units").toEqual([
      "One.",
      "Two!",
      "- a list item",
      "# A heading",
      "| a | row |",
      "> a quote",
    ]);
    return verdicts(docsHit, [
      { text: "rf's default speculation policy is turned on for Pi.", hit: true },
      { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
      { text: "The broker limits loosen the host caps.", hit: true },
      { text: "A SpeculationBoundary widens the deadline.", hit: true },
      { text: "Pi keeps per-class slots for renders.", hit: true },
      { text: "rf renders a noncommitted preview.", hit: false },
      { text: "The in-flight bytes cap rises for renders.", hit: true },
      { text: "Renders stay in flight until the deadline.", hit: false },
    ]);
  },
  Q1: () => {
    const live = read(PROCESS_ENV);
    expect(live.includes("RF_ADAPTIVE"), `${PROCESS_ENV} names the seat in its doc comment`).toBe(true);
    expect(codeFindings(PROCESS_ENV, live), `${PROCESS_ENV} reads quiet: comments are not read`).toEqual([]);
    return verdicts(codeHit, [
      { text: "// RF_ADAPTIVE=speculation selects rf's speculative policy\nconst x = 1;", hit: false },
      { text: "/* SpeculationBoundary */ const y = 2;", hit: false },
    ]);
  },
  Q2: () =>
    verdicts(codeHit, [
      { text: 'const seat = ["RF", "ADAPTIVE"].join("_");', hit: false },
      { text: 'const stem = "specu" + "lation";', hit: false },
    ]),
  Q3: () => {
    const { modules } = codeWalk();
    const pages = docsWalk().pages;
    const walkedOutsideSrc = modules.filter(path => !path.startsWith("src/"));
    const spelledOutside = OUTSIDE_SPELLERS.filter(path => codeFindings(path, read(path)).length > 0);
    const pagesReadBelowTest = pages.filter(page => page.startsWith(`${UNREAD_PAGE_ROOT}/`));
    const pagesTrackedBelowTest = trackedPages().some(page => page.startsWith(`${UNREAD_PAGE_ROOT}/`));
    const otherFormat = { listed: gitListed(OTHER_FORMAT_PAGE).includes(OTHER_FORMAT_PAGE), read: pages.includes(OTHER_FORMAT_PAGE) };
    const pageNames = PAGE_NAMES.filter(name => PAGE.test(name));
    expect(walkedOutsideSrc, "modules the code walk read outside src/").toEqual([]);
    expect(spelledOutside, "test files outside the walked root that spell the vocabulary").toEqual([...OUTSIDE_SPELLERS]);
    expect(pagesReadBelowTest, "pages the docs walk read below test/").toEqual([]);
    expect(pagesTrackedBelowTest, "git tracks .md pages below test/ (fixtures), which the docs walk does not read").toBe(true);
    expect(otherFormat, `${OTHER_FORMAT_PAGE}, a tracked top-level page of another format: listed by git, not read`).toStrictEqual({ listed: true, read: false });
    expect(pageNames, "the names the page predicate reads as pages: the .md one, never an upper-case .MD, a .markdown page or LICENSE").toEqual(["notes.md"]);
    return { walkedOutsideSrc, spelledOutside, pagesReadBelowTest, pagesTrackedBelowTest, otherFormat, pageNames };
  },
  Q4: () => ({
    docs: verdicts(docsHit, [
      { text: "rf prefetches every render by default.", hit: false },
      { text: "Pi turns rf's lookahead on.", hit: false },
      { text: "Pi turns rf's adaptive seat on by default for previews.", hit: false },
    ]),
    code: verdicts(codeHit, [{ text: "const limits = { inflight: 1024, cpu: 100, slots: 2 };", hit: false }]),
  }),
  Q5: () => {
    const live = read(PROVIDER);
    const planted = `${live}\nconst registry = new CapabilityRegistry({ deadlineMs: 1 });\nsetTimeout(() => cleanup(), 5);\nif (queued > 3) drop("queue");\n`;
    expect(capsOf(planted), "a planted registry deadline, an unrelated timer and an unrelated bound are not read").toStrictEqual(capsOf(live));
    return { unchanged: true };
  },
  Q6: () => {
    const indirect = rfLaunches(
      "plant.ts",
      [
        'const program = "rf"; spawn(program, ["--json"]);',
        'run("rf", ["--json"]);',
        'childProcess["spawn"]("rf", ["--json"]);',
        'const launch = spawnSync; launch("rf", ["--json"]);',
        'pi.exec("sh", ["-c", "rf --json"]);',
        'spawn("env", ["rf", "--json"]);',
        "execSync(\"'rf' --json\");",
      ].join("\n"),
    );
    expect(indirect, "an rf launch through a variable program, an element access, another name, a wrapper or a quoted program word").toEqual([]);
    return { launches: indirect };
  },
  Q7: () => {
    const title = filingTitle();
    const paragraph = boundParagraphs(boundSection())[0] ?? "";
    const withoutPin = (pin: string): Row[] => ROWS.map(row => ({ ...row, pins: row.pins.filter(other => other !== pin) }));
    const withoutRow = (id: string): Row[] => ROWS.filter(row => row.id !== id);
    const relabeled = (id: string): Row[] => ROWS.map(row => (row.id === id ? { ...row, label: row.label.split(" ").slice(1).join(" ") } : row));
    const seen = (rows: readonly Row[]): string => anchorFindings(rows, title, paragraph).join(", ");
    const quiet = {
      pins: ROWS.flatMap(row => row.pins).filter(pin => seen(withoutPin(pin)) !== ""),
      rows: ["M", "Q"].filter(id => seen(withoutRow(id)) !== ""),
      labels: ["M", "Q"].filter(id => seen(relabeled(id)) !== ""),
    };
    const anchored = {
      rows: ["A", "B", "C", "D"].map(id => `${id}: ${seen(withoutRow(id))}`),
      labels: ["A", "B", "C", "D"].map(id => `${id}: ${seen(relabeled(id))}`),
    };
    expect(quiet, "edits the outside anchors read no finding for (R-SELF-ANCHORED): a reading of any of them reds this row").toStrictEqual({ pins: [], rows: [], labels: [] });
    expect(anchored, "the A to D removals and relabels, each with the readings it fails").toStrictEqual({
      rows: ["A: title clauses, paragraph A-B sentence", "B: title clauses, paragraph A-B sentence", "C: title clauses, paragraph opening", "D: title clauses, paragraph opening"],
      labels: ["A: title clauses, paragraph A-B sentence", "B: title clauses, paragraph A-B sentence", "C: title clauses, paragraph opening", "D: title clauses, paragraph opening"],
    });
    return { quiet, anchored };
  },
  Q8: () => verdicts(docsHit, RENDERED_CONTROLS),
  Q9: () => ({ docs: verdicts(docsHit, VISUAL_DOCS_CONTROLS), code: verdicts(codeHit, VISUAL_CODE_CONTROLS) }),
};

/** Each pin's witness, frozen at the cut (rule 16). */
const WITNESS: Readonly<Record<string, Json>> = {
  A1: { hits: [], planted: ["src/zz-plant-declaration.ts:1 perclassslots"], appendedUnread: [] },
  A2: { walkAgreesWithGit: true, floorMet: true, anchorRead: true },
  B1: { deadlineMs: [60_000], bounds: { stdout: [262_144], stderr: [262_144] }, synthetic: { deadlineMs: [1500], bounds: { stdout: [4096], stderr: [4096] } } },
  B2: { deadlineSeconds: 60, boundKiB: 256 },
  C1: {
    allowlist: ["PATH", "HOME", "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "LC_CTYPE", "TZ"],
    rfFamily: [],
    parentSeat: "speculation",
    parentNames: ["HOME", "PATH", "RF_ADAPTIVE"],
    childNames: ["HOME", "PATH"],
    live: { parentSeat: "speculation", childOutside: [], carriesPath: true },
    nullPrototype: [true, true],
    planted: { leakyReportsSeat: true, plainCopyNullPrototype: false },
    restored: true,
  },
  C2: {
    launches: [
      {
        site: `${PROVIDER} spawn`,
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/process-env.ts",
          "process <- global",
          "RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from src/workbench/process-env.ts",
        ],
      },
    ],
    planted: [
      {
        site: `${PROVIDER} spawn`,
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/process-env.ts",
          "process <- global",
          "RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from src/workbench/process-env.ts",
        ],
      },
      { site: "src/zz-plant-launch.ts spawnSync", env: "process.env", after: [], accessors: [], bindings: ["spawnSync <- import spawnSync from node:child_process", "process <- global"] },
    ],
    bound: [
      {
        site: `${PROVIDER} spawn`,
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: [],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/process-env.ts",
          "process <- global",
          "RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from src/workbench/process-env.ts",
        ],
      },
      {
        site: "src/workbench/providers/zz-plant-binding.ts spawn",
        env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
        after: ["...launchOverrides"],
        accessors: [],
        bindings: [
          "spawn <- import spawn from node:child_process",
          "scrubbedEnvironment <- local VariableDeclaration",
          "process <- global",
          "RF_CHILD_ENV_ALLOWLIST <- import RF_CHILD_ENV_ALLOWLIST from src/workbench/process-env.ts",
        ],
      },
    ],
    appendedUnread: [],
    forms: [
      { text: 'execSync("rf --json --version");', launches: [{ site: "form.ts execSync", env: null, after: [], accessors: [], bindings: ["execSync <- global"] }] },
      {
        text: 'spawnSync("/usr/local/bin/rf", ["--json", "--version"], { env: process.env });',
        launches: [{ site: "form.ts spawnSync", env: "process.env", after: [], accessors: [], bindings: ["spawnSync <- global", "process <- global"] }],
      },
      {
        text: 'spawn("rf --json --version", { shell: true, env: process.env });',
        launches: [{ site: "form.ts spawn", env: "process.env", after: [], accessors: [], bindings: ["spawn <- global", "process <- global"] }],
      },
      {
        text: 'childProcess.execFile("rf", ["--json"], { env: { ...process.env } });',
        launches: [{ site: "form.ts execFile", env: "{...process.env}", after: [], accessors: [], bindings: ["childProcess <- global", "process <- global"] }],
      },
      { text: '/^rf/.exec("rf --json");', launches: [{ site: "form.ts exec", env: null, after: [], accessors: [], bindings: [] }] },
      { text: 'spawn("rfc", []); spawn("surf", []); execFileSync("git", ["rf"]);', launches: [] },
      {
        text: 'spawn("rf", [], { env: scrub(process.env, process.env.HOME), ...overrides });',
        launches: [
          { site: "form.ts spawn", env: "scrub(process.env,process.env.HOME)", after: ["...overrides"], accessors: [], bindings: ["spawn <- global", "scrub <- global", "process <- global"] },
        ],
      },
      {
        text: 'spawn("rf", [], { env: first, "env": second, [key]: third, cwd: root });',
        launches: [{ site: "form.ts spawn", env: "first", after: ['"env":second', "[key]:third"], accessors: [], bindings: ["spawn <- global", "first <- global"] }],
      },
      {
        text: 'spawn("rf", [], { ...base, env: only, cwd: root, stdio: "pipe" });',
        launches: [{ site: "form.ts spawn", env: "only", after: [], accessors: [], bindings: ["spawn <- global", "only <- global"] }],
      },
      {
        text: 'spawn("rf",argv,{stdio:["ignore","pipe","pipe"],get cwd(){this.env=process.env;return undefined;},env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)});',
        launches: [
          {
            site: "form.ts spawn",
            env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
            after: [],
            accessors: ["get cwd"],
            bindings: ["spawn <- global", "scrubbedEnvironment <- global", "process <- global", "RF_CHILD_ENV_ALLOWLIST <- global"],
          },
        ],
      },
      {
        text: 'spawn("rf",argv,{stdio:["ignore","pipe","pipe"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST),get cwd(){Object.assign(this.env??{},process.env);return undefined;}});',
        launches: [
          {
            site: "form.ts spawn",
            env: "scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)",
            after: [],
            accessors: ["get cwd"],
            bindings: ["spawn <- global", "scrubbedEnvironment <- global", "process <- global", "RF_CHILD_ENV_ALLOWLIST <- global"],
          },
        ],
      },
      {
        text: 'spawn("rf", [], { env: only, get cwd() { this.env = process.env; return undefined; } });',
        launches: [{ site: "form.ts spawn", env: "only", after: [], accessors: ["get cwd"], bindings: ["spawn <- global", "only <- global"] }],
      },
      {
        text: 'spawn("rf", [], { get [key]() { return undefined; }, env: only, set cwd(value) {}, get 0() { return undefined; }, get "stdio"() { return "pipe"; }, get env() { return process.env; } });',
        launches: [
          {
            site: "form.ts spawn",
            env: "only",
            after: ["getenv(){returnprocess.env;}"],
            accessors: ["get [key]", "set cwd", "get 0", 'get "stdio"', "get env"],
            bindings: ["spawn <- global", "only <- global"],
          },
        ],
      },
      {
        text: 'childProcess.spawnSync("rf", [], { stdio: "pipe", get env() { return process.env; } });',
        launches: [
          {
            site: "form.ts spawnSync",
            env: null,
            after: [],
            accessors: ["get env"],
            bindings: ["childProcess <- global"],
          },
        ],
      },
    ],
    bindingForms: [
      {
        text: 'import { spawn } from "node:child_process";\nimport { RF_CHILD_ENV_ALLOWLIST as allow, scrubbedEnvironment } from "../process-env.js";\nspawn("rf", [], { env: scrubbedEnvironment(process.env, allow) });',
        bindings: [
          [
            "spawn <- import spawn from node:child_process",
            "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/process-env.ts",
            "process <- global",
            "allow <- import RF_CHILD_ENV_ALLOWLIST from src/workbench/process-env.ts",
          ],
        ],
      },
      {
        text: 'import * as childProcess from "node:child_process";\nchildProcess.spawn("rf", [], { env: process.env });',
        bindings: [["childProcess <- import * from node:child_process", "process <- global"]],
      },
      {
        text: 'import childProcess from "node:child_process";\nchildProcess.execFile("rf", [], { env: process.env });',
        bindings: [["childProcess <- import default from node:child_process", "process <- global"]],
      },
      {
        text: 'import { scrubbedEnvironment } from "./zz-env.js";\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
        bindings: [["spawn <- global", "scrubbedEnvironment <- import scrubbedEnvironment from src/workbench/providers/zz-env.ts", "process <- global"]],
      },
      {
        text: 'const scrubbedEnvironment = (source: unknown): unknown => source;\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
        bindings: [["spawn <- global", "scrubbedEnvironment <- local VariableDeclaration", "process <- global"]],
      },
      {
        text: 'function scrubbedEnvironment(source: unknown): unknown {\n  return source;\n}\nspawn("rf", [], { env: scrubbedEnvironment(process.env) });',
        bindings: [["spawn <- global", "scrubbedEnvironment <- local FunctionDeclaration", "process <- global"]],
      },
      {
        text: 'import { scrubbedEnvironment } from "../process-env.js";\nexport function launch(): void {\n  const scrubbedEnvironment = (source: unknown): unknown => source;\n  spawn("rf", [], { env: scrubbedEnvironment(process.env) });\n}',
        bindings: [["spawn <- global", "scrubbedEnvironment <- local VariableDeclaration", "process <- global"]],
      },
      {
        text: 'export function launch(scrubbedEnvironment: (source: unknown) => unknown): void {\n  spawn("rf", [], { env: scrubbedEnvironment(process.env) });\n}',
        bindings: [["spawn <- global", "scrubbedEnvironment <- local Parameter", "process <- global"]],
      },
      {
        text: 'export function launch(ready: boolean, run: () => void): void {\n  if (ready) {\n    var spawn = run;\n  }\n  spawn("rf", [], { env: process.env as Record<string, string> });\n}',
        bindings: [["spawn <- local VariableDeclaration", "process <- global"]],
      },
      {
        text: 'const process = { env: {} };\nspawn("rf", [], { env: process.env });',
        bindings: [["spawn <- global", "process <- local VariableDeclaration"]],
      },
    ],
  },
  D1: { section: true, paragraphs: 1 },
  D2: {
    walkAgreesWithGit: true,
    unreadTracked: [],
    floorMet: true,
    anchorRead: true,
    named: 3,
    outside: [],
    plantedOutside: [
      "docs/workbench/zz-plant.md: rf's broker default is turned on for Pi renders.",
      "docs/workbench/zz-plant.md: **RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.",
    ],
    appendedUnread: [],
  },
  M1: [
    { text: "const boundary: SpeculationBoundary = make();", hit: true },
    { text: "export const limits = new ResourceBrokerLimits();", hit: true },
    { text: "const config = { per_class_slots: { render: 1 } };", hit: true },
    { text: "const config = { foregroundReserve: 0, maxPendingInterests: 4 };", hit: true },
    { text: 'const seat = "RF_ADAPTIVE";', hit: true },
    { text: "env.rfAdaptive = on;", hit: true },
    { text: 'const key = "broker-limit";', hit: true },
    { text: TEMPLATE_PLANT, hit: true },
    { text: "const seat = /RF_ADAPTIVE=/;", hit: true },
    { text: "class Host { #speculative = false; }", hit: true },
    { text: 'const preview = "noncommitted render";', hit: false },
    { text: 'const interest = "pending"; const slots = 2;', hit: false },
    { text: "const limits = { maxPendingInterests: 4 };", hit: true },
    { text: "const limits = { max_pending_interests: 4 };", hit: true },
    { text: "const limits = { maxInFlightBytes: 131_072 };", hit: true },
    { text: "const limits = { max_in_flight_bytes: 131_072 };", hit: true },
    { text: "const limits = { maxRetainedBytes: 0 };", hit: true },
    { text: "const limits = { max_retained_bytes: 0 };", hit: true },
    { text: "const limits = { cpuBudgetMs: 0 };", hit: true },
    { text: "const limits = { cpu_budget_ms: 0 };", hit: true },
    { text: "const limits = { tokenEstimateBudget: 0 };", hit: true },
    { text: "const limits = { token_estimate_budget: 0 };", hit: true },
    { text: "const limits = { perClassSlots: { render: 1 } };", hit: true },
    { text: "const limits = { foregroundReserve: 0 };", hit: true },
    { text: "const limits = { foreground_reserve: 0 };", hit: true },
    { text: "const registry = { maxInFlight: 32 };", hit: false },
  ],
  M2: [
    { text: "rf's default speculation policy is turned on for Pi.", hit: true },
    { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
    { text: "The broker limits loosen the host caps.", hit: true },
    { text: "A SpeculationBoundary widens the deadline.", hit: true },
    { text: "Pi keeps per-class slots for renders.", hit: true },
    { text: "rf renders a noncommitted preview.", hit: false },
    { text: "The in-flight bytes cap rises for renders.", hit: true },
    { text: "Renders stay in flight until the deadline.", hit: false },
  ],
  Q1: [
    { text: "// RF_ADAPTIVE=speculation selects rf's speculative policy\nconst x = 1;", hit: false },
    { text: "/* SpeculationBoundary */ const y = 2;", hit: false },
  ],
  Q2: [
    { text: 'const seat = ["RF", "ADAPTIVE"].join("_");', hit: false },
    { text: 'const stem = "specu" + "lation";', hit: false },
  ],
  Q3: {
    walkedOutsideSrc: [],
    spelledOutside: ["test/workbench-env-scrub-census.test.ts", "test/workbench-process-env.test.ts"],
    pagesReadBelowTest: [],
    pagesTrackedBelowTest: true,
    otherFormat: { listed: true, read: false },
    pageNames: ["notes.md"],
  },
  Q4: {
    docs: [
      { text: "rf prefetches every render by default.", hit: false },
      { text: "Pi turns rf's lookahead on.", hit: false },
      { text: "Pi turns rf's adaptive seat on by default for previews.", hit: false },
    ],
    code: [{ text: "const limits = { inflight: 1024, cpu: 100, slots: 2 };", hit: false }],
  },
  Q5: { unchanged: true },
  Q6: { launches: [] },
  Q7: {
    quiet: { pins: [], rows: [], labels: [] },
    anchored: {
      rows: ["A: title clauses, paragraph A-B sentence", "B: title clauses, paragraph A-B sentence", "C: title clauses, paragraph opening", "D: title clauses, paragraph opening"],
      labels: ["A: title clauses, paragraph A-B sentence", "B: title clauses, paragraph A-B sentence", "C: title clauses, paragraph opening", "D: title clauses, paragraph opening"],
    },
  },
  Q8: [
    { text: "rf's spec*ul*ation policy is turned on by default for Pi renders.", hit: false },
    { text: "rf's spec**ul**ation policy is turned on by default for Pi renders.", hit: false },
    { text: "rf's spec`ul`ation policy is turned on by default for Pi renders.", hit: false },
    { text: "rf's [spec](./zz.md)ulation policy is turned on by default for Pi renders.", hit: false },
    { text: "Pi sets RF&lowbar;ADAPTIVE on every render.", hit: false },
    { text: "rf's specu&shy;lation policy is turned on by default for Pi renders.", hit: false },
    { text: "Pi sets RF&#95;ADAPTIVE on every render.", hit: false },
    { text: "rf's <em>spec</em>ulation policy is turned on by default for Pi renders.", hit: false },
    { text: "rf's speculation policy is turned on by default for Pi renders.", hit: true },
    { text: "Pi sets RF_ADAPTIVE on every render.", hit: true },
  ],
  Q9: {
    docs: [
      { text: `rf's spec${ZERO_WIDTH_SPACE}ulation policy is turned on by default for Pi renders.`, hit: false },
      { text: `rf's specu${SOFT_HYPHEN}lation policy is turned on by default for Pi renders.`, hit: false },
      { text: `rf's sp${CYRILLIC_E}culation policy is turned on by default for Pi renders.`, hit: false },
      { text: `Pi sets RF_ADA${WORD_JOINER}PTIVE on every render.`, hit: true },
      { text: `Pi keeps per-cla${ZERO_WIDTH_SPACE}ss slots for renders.`, hit: false },
      { text: "rf's speculation policy is turned on by default for Pi renders.", hit: true },
    ],
    code: [
      { text: `const policy = "spec${ZERO_WIDTH_SPACE}ulation";`, hit: false },
      { text: 'const policy = "speculation";', hit: true },
    ],
  },
};
/** Each pin's assertion count when its case reached its end (its witness comparison included), frozen at the cut. */
const REACHED_AT: readonly string[] = ["A1:5", "A2:5", "B1:5", "B2:5", "C1:13", "C2:8", "D1:5", "D2:9", "M1:5", "M2:4", "Q1:5", "Q2:3", "Q3:8", "Q4:4", "Q5:3", "Q6:3", "Q7:4", "Q8:3", "Q9:4"];
const JUDGED_SET_TITLE = "the judged set: the frozen shape, the cases, the witnesses, the residuals and the outside anchors agree";
const REGISTRATION_TITLE = "registration: every test of this file is registered once, in row order, in run mode, and ran; every pin reached its end with its frozen witness and assertion count";

/** Each pin's witness as its case returned it, and its assertion count at its end, in run order. */
const MEASURED: Record<string, Json> = {};
const REACHED: string[] = [];

describe("wb-km7q.9 rf speculation boundary census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R22)", () => {
  it(JUDGED_SET_TITLE, () => {
    // The outside anchors first: they read the labels of rows A to D only (Q7 pins the edits they do not read).
    expect(anchorFindings(ROWS, filingTitle(), boundParagraphs(boundSection())[0] ?? ""), "the outside anchors' readings the rows' labels fail").toEqual([]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "D:2", "M:2", "Q:9"]);
    expect(Object.keys(IMPL).sort(), "a case for every pin, and no other").toEqual([...pins].sort());
    expect(Object.keys(WITNESS).sort(), "a frozen witness for every pin, and no other").toEqual([...pins].sort());
    expect(REACHED_AT.map(entry => entry.split(":")[0]), "a frozen assertion count for every pin, in row order").toEqual(pins);
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row of row Q").toEqual(ROWS.find(row => row.id === "Q")?.pins ?? []);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          MEASURED[pin] = witness;
          expect(witness, `${pin}'s witness`).toStrictEqual(WITNESS[pin]);
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(REGISTRATION_TITLE, ({ task }) => {
    const seen: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") seen.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = seen.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in row order").toEqual([JUDGED_SET_TITLE, ...ROWS.flatMap(row => row.pins), REGISTRATION_TITLE]);
    const here = seen.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(seen.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      seen.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(MEASURED, "every pin's witness, compared against the frozen witnesses a second time").toStrictEqual(WITNESS);
    expect(REACHED, "every pin reached its end, in row order, with its frozen assertion count").toEqual([...REACHED_AT]);
  });
});
