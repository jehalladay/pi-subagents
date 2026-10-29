/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY, cut #4, the FINAL cut (orchestrator ruling R-B83, M:34371: the
 * rule-19 structural exit after refusal #3, gate-prep-13 / g10-gate-s139, gate-refused M:34363; refusal #2 was gate-prep-22 /
 * g10-gate-s127, M:31621; refusal #1 gate-prep-19 / g10-gate-s126, M:30519): the HyperUnix custody-claims census. Pi's
 * dispose/close custody tests for the HX SDK prove the CALLS, never the termination, and no Pi test or qa script hand-rolls a
 * real-process kill falsifier for the HX child in place of the SDK-owned conformance.
 *
 * Acceptance row pinned (bead wb-tz2.11): "Standing: the custody tests stay green and claim only call-custody, never real-child
 * termination." Statement halves pinned: Pi cites the receipt "beside its own dispose/close custody tests — which prove the
 * calls, not the termination — and shall not hand-roll a real-process kill falsifier in place of the SDK-owned conformance."
 * Rationale (the dossier's UNDETERMINED row child-process-cleanup-after-abort): "Pi calls dispose-on-abort and close-in-finally
 * ... proven against mocks only (... close-once :65, abort-dispose :83, close after abort :88)". This file judges the CLAIMS; the
 * "stay green" half is judged by its run pin, test/workbench-hyperunix-custody-claims.census.ts (report mode: the three custody
 * cases and every case of this file collected once, passed and asserting in the gate's own test report, and the custody suite
 * collecting exactly those three cases), which row C9 holds to this file.
 * ON-LANDING LEG NOT IN SCOPE: a docs/workbench row citing the HX SDK cancellation/child-process-cleanup conformance receipt
 * (artifact id + hx sha), and the census that the citation names it, wait for that receipt (HXGC-OPS-002 reads status DESIGN in
 * HyperUnix-CLI's requirements.jsonl:12, with no sdk/conformance receipt). The bead stays open for that leg.
 *
 * FORM OF RECORD (enumerate-the-resolvable, taken at cut #3 as refusal #2's LOOP-CAP DISCLOSURE permits, kept at cut #4): each row
 * claims exactly the read set this header enumerates for it, and a calibration plant pins each read form; every known unread
 * family is a named residual (R-*) with a pinned quiet row; a spelling outside a row's read set is a member of a residual family,
 * never a claim of that row. "Every" and "no" below range over the enumerated forms. FAIL-CLOSED CORE (cut #4, R-B83): every C2 and
 * C7 claim states exactly the reader forms its plants prove, and where a reader cannot tell which binding, alias or flag form
 * applies it reads every candidate instead of picking one - a const name reads every const declaration of it, a root naming a
 * platform global reads as that global, a wrapped command reads every word past its wrapper - so the doubt reds and never hides
 * a member. The full-surface readers (each binding resolved in its own scope, every wrapper flag form modelled) are child bead
 * wb-tz2.16's.
 *
 * VOCABULARY OF RECORD (termination claims, five rows): W1 the terminate family (HXGC-OPS-002 "terminate owned child-process
 * trees"; the SDK transport's own "the owned process tree is terminated"); W2 every signal name (anchored outside: every key of
 * node:os constants.signals on the running platform must be a W2 term); W3 the kill verb; W4 the reap family (the SDK client's
 * "drain-and-reap boundary"; Pi's RF case "reaps a child that ignores SIGTERM"); W5 the process objects. MATCH RULE (termPattern):
 * case-insensitive; a separator inside a term (a space, "-" or "_") matches any of the three; a hit never touches a letter or a
 * digit on either side, so "SIGKILL" carries no "kill", "terminal" no term and "skill" none.
 *
 * READ SETS, row by row:
 * C1 CASES: a registration is a call whose callee chain starts at a registrar binding of the file's vitest import (a named import
 * of describe, suite, it or test, aliased or not, never type-only, or a member of a vitest namespace import) and whose first
 * argument is a string literal. Inside the "HyperUnix SDK custody" suite's own call (its argument span) the registrations are
 * exactly the three frozen in CASES, in order, each with its frozen ordered assertion signatures (the expect subject and its
 * chain); each is a bare call (no chained member) with exactly a title and an inline callback that takes no parameter; no suite is
 * nested there; and no registrar call there has a computed title. File-wide: every vitest named import binds its own name and
 * there is no vitest namespace import; a registrar binding is referenced only as a callee head, expect only as a callee or a
 * member's object, vi only as a member's object (type positions aside); and the BOUND names (describe, it, expect, vi, HyperUnix,
 * the provider entries, CapabilityRegistry) are declared only by their named import from their own module. CUSTODY maps the
 * rationale's three claims onto the cases. A case registered from outside the suite's span (R-HELPER-REGISTRATION) is the run
 * pin's: its exact-collection row reads the gate's report.
 * C2 CALL CUSTODY ONLY: every assertion in that suite is a mock-call assertion (a toHaveBeenCalled* matcher, negated or not) whose
 * subject roots in a const stand-in declared once in the case and built from vi.fn / vi.spyOn, or an outcome assertion
 * (toMatchObject / toEqual / toStrictEqual, through rejects / resolves / not) whose subject is the provider's own result: a direct
 * nativeHyperUnixFind(...) call, a registry.invoke(...) call on a const registry declared once as new CapabilityRegistry() and
 * referenced only as that receiver or as a provider-entry argument (so no stand-in capability is registered on it), or an
 * identifier declared once by const with one of those calls as its initializer and referenced in the case only as an expect
 * subject; no assertion in the suite sits outside its cases; the suite makes no assert call; no BOUND name is re-bound. CALLEES (C2
 * and C7) read through calleeChains: every dotted spelling - a member, or an element keyed by a string literal or a const binding
 * (every value of it; any other key reads <computed>) - with a root identifier also read as each name or member chain its const
 * declarations alias (every declaration), and a leading globalThis. or global. dropped. MOCKS: no call whose callee chains hold a
 * MODULE_MOCKS name (mock or doMock on vi or on vitest) has a specifier - each string value of its first argument (a literal, or
 * every value a const name reaches), or of the literal an import(...) first argument loads - that specifierTarget resolves
 * (relative to test/, root-relative, absolute under the root, else under node_modules; the extension and a trailing /index
 * dropped) to the provider or registry file or to a path inside the SDK package. TAMPERS, file-wide (every suite, hook and
 * top-level statement): no vi.spyOn other than vi.spyOn(HyperUnix, "open") (its "open" read only from a literal or from a name the
 * file declares exactly once); no GLOBAL_STUBS call (vi.stubGlobal, vi.useFakeTimers, vi.setSystemTime); no WATCHED callee
 * (vi.spyOn, the GLOBAL_STUBS, the MUTATORS, the MODULE_MOCKS) referenced other than as a call's callee (so call / apply / bind of
 * one, an alias of one, one destructured from its owner - const { assign } = Object, or a destructuring assignment, a rest element
 * counting as every member - or one passed as an argument counts); and no assignment (= or a compound operator; every target of
 * an array or object destructuring-assignment pattern, nested, spread and rest included), for-in or for-of target, delete, ++ or
 * --, nor a MUTATORS call (Object.assign / defineProperty / defineProperties / setPrototypeOf, Reflect.set / defineProperty /
 * deleteProperty / setPrototypeOf) on a member chain or name whose root is a global or an import binding. ROOTS, fail-closed: a
 * root the file declares no local of, or a root GLOBAL_NAMES holds (a property name of the running platform's globalThis) even
 * where the file declares a local of that name in some scope; a local root is followed through EVERY const declaration of its
 * name. A chain rooted at process.env, and vi.stubEnv, is the environment, which the stubbed HyperUnix.open makes inert; it is not
 * read.
 * C3 STAND-INS ONLY: every case's callback body holds, as a top-level statement (an expression statement, or a lone const
 * declaration's initializer) before the first top-level statement that references a provider entry, a vi.spyOn(HyperUnix, "open")
 * call with a MOCKED_RETURNS return; no case calls a STUB_UNDOS member (mockRestore, mockReset) or an ALL_UNDOS restore
 * (vi.restoreAllMocks, vi.resetAllMocks); HyperUnix is the file's import from @hyperunix/sdk. A stub nested in a closure or a
 * branch, or placed after that reference, reads as not stubbed first.
 * C4 NO TERMINATION CLAIM: the suite's title and case titles; every comment attached to or inside the suite's statement (from the
 * end of the statement before it to the end of the suite's last line, so a JSDoc placed before describe is the suite's); every
 * string literal, template part and regular-expression literal inside it (regexText decodes a regular expression's \xHH,
 * \uHHHH and \u{...} escapes); every identifier inside it, read as words (split at camelCase humps and underscores); and every
 * comment anywhere in the file that names the HX side - none carries a vocabulary term once visible() drops every
 * Default_Ignorable code point (the four Hangul fillers read as a blank).
 * C5 PI DELEGATES: src/workbench/providers/hyperunix.ts carries none of C7's F1-F4 shapes, names no signal (a SIG* string literal
 * or identifier, so a signals constant counts) and names the child_process module in no string or template literal (so a static
 * import, export, dynamic import, require call or created require of it all count); nativeHyperUnixFind's abort listener (the
 * addEventListener("abort", ...) argument, inline or a variable binding) calls client.dispose(), and its finally block awaits
 * client.close() and removes that listener.
 * C6 SDK-OWNED TERMINATION: in the installed SDK transport (node_modules/@hyperunix/sdk/dist/transport/cli.js, from the vendored
 * tarball) the functions holding a group kill in the form process.kill(-<x>.pid, ...) are exactly runHx and streamHx, and in each
 * the abort listener reaches that group kill through the function's own closures: a call to a local function (directly, through
 * an alias binding, or through call / apply / bind) - abort -> stop -> kill -> process.kill(-child.pid). Every string signal
 * argument of a kill call (kill(...) or .kill(...)) in it or Pi's RF provider is a W2 term and every kill call's name a W3 term.
 * C7 NO HAND-ROLLED KILL FALSIFIER: the judged files are the test/ and qa/ sources (.ts .mts .cts .js .mjs .cjs; node_modules
 * skipped; this file excluded, it spells the detector) whose text, raw or unescaped (its JavaScript string escapes - \xHH, \uHHHH,
 * \u{H...}, legacy octal, a line continuation, any other escaped character as itself - and its %HH escapes decoded), holds
 * DRIVER_NEEDLE (hyperunix, any case; every DRIVER_TOKENS member holds it) and that hxDrivers classes by a driving form. CONST
 * NAMES, fail-closed: a "const-bound" argument or key reads EVERY value the const declarations of its name reach, alias links
 * included, so a name const-declared in several scopes drives when any of its values does (its own scope is not resolved).
 * "import": an import or export-from declaration of an HX module that is not type-only (import type / export type, or named
 * bindings each marked type), an import-equals of one (not type-only), or a call through LOADERS (import(), require,
 * module.require, vi.importActual, vi.importMock; read through calleeChains) or a created require (a call of a call) whose first
 * argument is a literal or const-bound HX module. An HX module, read after %HH decoding and posix path normalization: the SDK
 * package or a subpath of it, a path into node_modules/@hyperunix/sdk, or a path ending providers/hyperunix or hyperunix-observer.
 * "invoke": a call whose callee chains end .invoke and whose first argument is the literal or const-bound hyperunix.find.
 * "override": HYPERUNIX_HX as a member or element key (literal or const-bound) on any receiver, a destructuring or
 * destructuring-assignment key, an object-literal key, the left operand of an in, or an argument of an ENV_CALLS call or of an
 * ENV_METHODS method call (callees read through calleeChains). A judged file carries no
 * falsifier shape: F1 a kill member read (.kill, ["kill"] or a const-bound element key, on any receiver, called or not, so call /
 * apply / bind of it count; typeof x.kill in a type counts), a kill destructured, destructuring-assigned or imported, a bare
 * kill(...) call, or the literal "kill" (trimmed) outside a spawner's argument; F2 the same member forms for pid, or the literal
 * "pid"; F3 a /proc path (PROC_PATH) in a string, template part, key or regular expression, or a command whose head is a
 * PROCESS_TABLE tool by basename - a string that is no key, or a template part, split at COMMAND_SEPARATOR, each piece read past VAR=value words
 * and SHELL_KEYWORDS, through each WRAPPERS wrapper (its flags, its option table's options with their argument, its positionals;
 * an option of its command table reads the rest as a command; "--" ends the options), and into a SHELLS shell's first command flag
 * (a dash word holding c, or --command) - and, fail-closed, every fragment (each word split at quotes and "=") of every word past a
 * WRAPPERS wrapper or a SHELLS shell in head position, so a flag form the option tables do not model (su's or env's lone "-",
 * "--" after a shell's command flag, an attached or unlisted option argument) still reads its command; F4 the word ESRCH
 * (ESRCH_WORD, any case) in an identifier, member or key name read as
 * words, or in a string, template part or regular expression (escapes decoded). A defined key (an object-literal property, a
 * method, a class or type member) is no read of kill or pid (R-DEFINITION).
 * C8 DOCS: every .md file under docs/workbench is read as marked 18.0.11 (the repo's renderer) renders it to HTML, and this view
 * reads that HTML as a browser's default stylesheet shows it: comments render nothing (including <!--> and <!---> and a comment
 * ended by --!> or by the end of the page), as do bogus comments, doctypes and every tag; the text of every element renders;
 * character references are decoded (every numeric one; named: amp, lt, gt, quot, apos, nbsp); every Default_Ignorable code point
 * renders nothing except the four Hangul fillers, which render a blank; white space collapses; each block-level element and br
 * ends a unit, and a unit splits into clauses at ";", "|", an em dash and sentence ends. A page holding an element whose content a
 * browser hides or does not show as text (HIDING_ELEMENTS) or an attribute that hides (hidden, popover, style) is not modelled
 * and is refused. No clause names the HX side together with a vocabulary term unless it names the upstream artifact HXGC-OPS-002,
 * the on-landing citation's form.
 * C9 RUN PIN: the run pin's literals name the suite, every CASES title, this file's suite and every case of this file.
 *
 * CURES OF REFUSAL #3 (cut #4, the fail-closed core; each named in the delivery note; each member a calibration plant, the gate's
 * own text where it was a code member): U1 a const name reads every const declaration of it (the shadowed SDK import, HYPERUNIX_HX
 * key and hyperunix.find invoke, and a shadowed kill key); U2 every word past a wrapper or a shell reads (su - root -c, env -,
 * sh -c --, attached and unlisted option arguments); U3 every destructuring-assignment and for-of target is a write and MUTATORS
 * read through globalThis and const aliases (the gate's G10x, G11x, G12x, G12bx and G13x forges, plus a destructured mutator, an
 * aliased spy, a global shadowed by a local and a const-keyed module mock); U4 the prefilter reads the text unescaped and the C7
 * title states its needle (an escaped specifier, escaped needle letters, a line continuation, an escaped override name, a
 * percent-encoded path). F5 (rides): a node_modules path into the SDK and a non-normal provider path class as "import". F1, F2 and
 * F4 (ride) are named residuals with pinned quiet rows (R-BIDI, R-RUNTIME, R-COMPOSED); F6 and F7 are pinned R-CLAUSE and R-WRAPPER
 * members.
 * CURES OF REFUSAL #2 (each named in the delivery note; each member is a calibration plant, verbatim where it was a code member):
 * U1 F3 reads a wrapper through its option table (option arguments and positionals passed over) and a shell's flags before its
 * command flag (timeout -s TERM, sudo -u, env -u, bash -o pipefail -c, sh -e -c); U2 the classifier resolves const-bound loader
 * specifiers (a dynamic import and a created require of a const SDK name) and reads the override through ENV_CALLS (vi.stubEnv)
 * and the in operator; U3 C2 resolves a module mock's specifier to its file (the provider's and the registry's .ts specifiers,
 * and an import() argument); U4 C2 reads tampers file-wide, assignments, deletes, updates and Object / Reflect mutators on global
 * or import chains included (JSON.parse forged and restored inside K2, and a file-level spy before the suite); U5 F4 reads ESRCH
 * as an object-literal key in its identifier and string forms; U6 C4 and C8 drop every Default_Ignorable code point (a
 * combining grapheme joiner, raw and as a numeric reference). F1 (rides): a type-only import classes nothing. Refusal #1's cures
 * (U1-U8, F2-F5) are kept and re-measured red-first.
 * OUTSIDE ANCHORS (standing rule 16, CT5 / CT6): C1 derives the suite's cases and signatures from the lifecycle file's own AST and
 * compares them with CASES both ways, and derives the lifecycle-call assertions CUSTODY must claim from it and from the
 * provider's AST (C5); C6 derives the signal names and the kill verb from the SDK's and the RF provider's kill calls; the matcher
 * row requires every node:os signal name to be a W2 term; the C4 calibration closes VOCABULARY over the RF termination titles and
 * the SDK transport's own termination JSDoc (STEM_WORDS, an instrument independent of VOCABULARY); C8 calibrates on the frozen
 * TRACEABILITY.md provider-custody row. R-UNANCHORED pins exactly the terms none of these anchors holds.
 * FROZEN SHAPE (standing rule 16): one row pins every table: VOCABULARY, CASES, CUSTODY, the matcher and subject sets, the mock,
 * guarded-target and tamper sets, the falsifier shapes and their member words, the process table, the wrappers with their option
 * tables, the shell keywords and shells, the reader patterns, the driver needles, loaders, env calls and methods, tokens and
 * reasons, the docs view's element, attribute, reference and filler sets, the near misses, the exclusions, the residual ids and
 * every plant table (id, expectation, digest).
 * RESIDUALS (each a named family with its pinned row, R-* below; the row plants a member and shows the reader quiet on it beside a
 * control the same reader catches): R-WORDING, R-UNANCHORED, R-SHAPELESS, R-COMPOSED, R-ERRNO, R-UNDRIVEN, R-ARGUMENTS, R-RUNTIME,
 * R-DEAD-PATH, R-CLAUSE, R-CITATION, R-REFERENCE, R-LOOKALIKE, R-ATTRIBUTE, R-SCOPE, R-DETACHED-COMMENT, R-WRAPPER, R-INDIRECT,
 * R-DATA-OVERRIDE, R-DEFINITION, R-ELSEWHERE, R-HELPER-REGISTRATION, R-GROUP-FORM, R-BIDI (RESIDUALS names each family; the records row
 * requires every one to have run to its end).
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads sources and docs and parses planted text in memory.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { constants } from "node:os";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-hyperunix-custody-claims.test.ts";
const RUN_PIN = "test/workbench-hyperunix-custody-claims.census.ts";
const LIFECYCLE = "test/workbench-provider-lifecycle.test.ts";
const HX_SUITE = "HyperUnix SDK custody";
const RF_SUITE = "RF CLI process custody";
const PROVIDER = "src/workbench/providers/hyperunix.ts";
const RF_PROVIDER = "src/workbench/providers/reactivefiber.ts";
const SDK_TRANSPORT = "node_modules/@hyperunix/sdk/dist/transport/cli.js";
const SDK_MODULE = "@hyperunix/sdk";
const VITEST = "vitest";
const PROVIDER_MODULE = "../src/workbench/providers/hyperunix.js";
const REGISTRY_MODULE = "../src/workbench/capability-registry.js";
const DOCS = "docs/workbench";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const UPSTREAM = "HXGC-OPS-002";
const SUITE = "wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)";
/** The walks parse a few dozen sources: a loaded gate host needs far more than vitest's 5000 ms default. */
const CENSUS_TIMEOUT = 120_000;
/** A plant's text, pinned in the frozen shape by digest, so a plant swapped for another (CT3) reds there. */
const digest = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 12);
/** A dynamic-import keyword for planted text, assembled so this file spells no loader call of its own. */
const LOAD = ["im", "port"].join("");
/** A skipping member for planted text, assembled so this file spells no marker of its own. */
const SKIP = ["sk", "ip"].join("");

// ---- vocabulary -------------------------------------------------------------------------------------------------------

interface VocabularyRow {
  readonly id: string;
  readonly terms: readonly string[];
}
const VOCABULARY: readonly VocabularyRow[] = [
  { id: "W1", terms: ["terminate", "terminates", "terminated", "terminating", "termination"] },
  {
    id: "W2",
    terms: [
      "SIGABRT",
      "SIGALRM",
      "SIGBREAK",
      "SIGBUS",
      "SIGCHLD",
      "SIGCONT",
      "SIGEMT",
      "SIGFPE",
      "SIGHUP",
      "SIGILL",
      "SIGINFO",
      "SIGINT",
      "SIGIO",
      "SIGIOT",
      "SIGKILL",
      "SIGLOST",
      "SIGPIPE",
      "SIGPOLL",
      "SIGPROF",
      "SIGPWR",
      "SIGQUIT",
      "SIGSEGV",
      "SIGSTKFLT",
      "SIGSTOP",
      "SIGSYS",
      "SIGTERM",
      "SIGTRAP",
      "SIGTSTP",
      "SIGTTIN",
      "SIGTTOU",
      "SIGURG",
      "SIGUSR1",
      "SIGUSR2",
      "SIGVTALRM",
      "SIGWINCH",
      "SIGXCPU",
      "SIGXFSZ",
    ],
  },
  { id: "W3", terms: ["kill", "kills", "killed", "killing"] },
  { id: "W4", terms: ["reap", "reaps", "reaped", "reaping"] },
  {
    id: "W5",
    terms: ["child process", "child processes", "process group", "process groups", "process tree", "process trees", "subprocess", "subprocesses"],
  },
];
const TERMS: readonly string[] = VOCABULARY.flatMap(row => row.terms);
/** Letters and digits only, joined by single separators: no term needs escaping inside a pattern. */
const TERM_SHAPE = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

function termPattern(term: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${term.split(/[ _-]/).join("[ _-]")}(?![\\p{L}\\p{N}])`, "iu");
}
const PATTERNS: ReadonlyArray<readonly [string, RegExp]> = TERMS.map(term => [term, termPattern(term)] as const);

/** The vocabulary terms a text carries, in VOCABULARY order. */
function termsIn(text: string): string[] {
  return PATTERNS.filter(([, pattern]) => pattern.test(text)).map(([term]) => term);
}
function termsOfRow(id: string): readonly string[] {
  return VOCABULARY.find(row => row.id === id)?.terms ?? [];
}

const FOLDS: ReadonlyArray<(part: string) => string> = [
  part => part.toLowerCase(),
  part => part.toUpperCase(),
  part => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`,
];
/** Spellings every term must be found in: three case folds times each separator, inside a text and at both of its edges. */
function plantedSpellings(term: string): string[] {
  const parts = term.split(/[ _-]/);
  const separators = parts.length > 1 ? [" ", "-", "_"] : [""];
  const spellings = [...new Set(FOLDS.flatMap(fold => separators.map(separator => parts.map(fold).join(separator))))];
  return spellings.flatMap(spelling => [`x ${spelling} y`, spelling, `${spelling}.`, `(${spelling})`]);
}
/** Near misses that must stay quiet: each embeds a term's letters without being that term. */
const NEAR_MISSES = [
  "skill",
  "skilled",
  "pkill",
  "killall",
  "terminal",
  "terminalReached",
  "indeterminate",
  "reapply",
  "reaper",
  "subprocessor",
  "processes",
  "childish",
  "SIGTERMINATE",
  "SIGUSR10",
] as const;

/**
 * An instrument independent of VOCABULARY, used only to read the outside corpus (C4 calibration): the terminat- / kill- / reap-
 * stems with any lowercase ending (a camelCase identifier such as terminateGraceMs is no word), SIG names and the process-object
 * phrases. Each word it finds there must be a vocabulary term, so a word that corpus uses cannot be dropped from VOCABULARY alone.
 */
const STEM_WORDS = new RegExp(
  [
    "(?<![\\p{L}\\p{N}])(?:[Tt]erminat|[Kk]ill|[Rr]eap)[a-z]*(?![\\p{L}\\p{N}])",
    "(?<![\\p{L}\\p{N}])SIG[A-Z][A-Z0-9]+(?![\\p{L}\\p{N}])",
    "(?<![\\p{L}\\p{N}])(?:[Cc]hild[ _-]process(?:es)?|[Pp]rocess[ _-](?:tree|group)s?|[Ss]ubprocess(?:es)?)(?![\\p{L}\\p{N}])",
  ].join("|"),
  "gu",
);
const normalized = (word: string): string => word.toLowerCase().replace(/[ _-]/g, " ");
function stemWordsIn(text: string): string[] {
  return [...text.matchAll(STEM_WORDS)].map(match => normalized(match[0]));
}

// ---- source reading ---------------------------------------------------------------------------------------------------

/** Each source is read and parsed once per run: the walks below revisit the same files, and a loaded gate host is slow. */
const TEXTS = new Map<string, string>();
const PARSED = new Map<string, ts.SourceFile>();
function read(path: string): string {
  const cached = TEXTS.get(path);
  if (cached !== undefined) return cached;
  const text = readFileSync(join(ROOT, path), "utf8");
  TEXTS.set(path, text);
  return text;
}
function parseText(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS);
}
function parse(path: string): ts.SourceFile {
  const cached = PARSED.get(path);
  if (cached !== undefined) return cached;
  const source = parseText(path, read(path));
  PARSED.set(path, source);
  return source;
}
/** A planted copy of a text: the anchor, which must occur exactly once, replaced. */
function plantedText(text: string, anchor: string, replacement: string): string {
  const at = text.indexOf(anchor);
  expect(at >= 0 && text.indexOf(anchor, at + 1) === -1, `the plant's anchor occurs exactly once: ${anchor}`).toBe(true);
  return `${text.slice(0, at)}${replacement}${text.slice(at + anchor.length)}`;
}
/** The node and every node under it, in source order. */
function descendants(root: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    out.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}
/** The callee a call spells, whitespace and type arguments left out (vi.spyOn<A, "b">(...) reads vi.spyOn). */
function calleeText(call: ts.CallExpression): string {
  return call.expression.getText().replace(/\s+/g, "");
}
function callsIn(scope: ts.Node): ts.CallExpression[] {
  return descendants(scope).filter(ts.isCallExpression);
}
function stringArgument(call: ts.CallExpression, index: number): string | undefined {
  const argument = call.arguments[index];
  return argument !== undefined && ts.isStringLiteralLike(argument) ? argument.text : undefined;
}
/** Every string literal, no-substitution template, template head / middle / tail and regular-expression literal (escapes decoded, regexText) under a node. */
function literalTexts(scope: ts.Node): string[] {
  return descendants(scope).flatMap(node => {
    if (ts.isRegularExpressionLiteral(node)) return [regexText(node.text)];
    return ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? [node.text] : [];
  });
}
/** An identifier read as words: split at camelCase humps, before a capital that starts a lowercase run, and at underscores. */
function identifierWords(name: string): string {
  return name
    .replace(/^#/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_$]+/g, " ")
    .trim();
}
function identifiersIn(scope: ts.Node): string[] {
  return descendants(scope).flatMap(node => (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) ? [identifierWords(node.text)] : []));
}
/** A regular-expression literal as the pattern it matches: \xHH, \uHHHH and \u{H...} decoded, a backslash before any other character dropped. */
function regexText(literal: string): string {
  return literal.replace(/\\(?:x([0-9A-Fa-f]{2})|u\{([0-9A-Fa-f]{1,6})\}|u([0-9A-Fa-f]{4})|([\s\S]))/g, (_whole: string, hex: string | undefined, braced: string | undefined, unicode: string | undefined, other: string | undefined) => {
    const digits = hex ?? braced ?? unicode;
    return digits === undefined ? (other ?? "") : codePoint(Number.parseInt(digits, 16));
  });
}
/** The four Hangul fillers: Default_Ignorable code points a browser draws as a blank. */
const FILLERS: ReadonlySet<string> = new Set([0x115f, 0x1160, 0x3164, 0xffa0].map(value => String.fromCodePoint(value)));
/** A text as it shows: every other Default_Ignorable code point (a format character, a combining grapheme joiner, a variation selector, a tag) renders nothing. */
function visible(text: string): string {
  return text.replace(/\p{Default_Ignorable_Code_Point}/gu, char => (FILLERS.has(char) ? " " : ""));
}
const CONST_INITIALIZERS = new WeakMap<ts.SourceFile, ReadonlyMap<string, readonly ts.Expression[]>>();
/** Every const declaration of a file that has an initializer, by name, in source order: a name const-declared in several scopes keeps every one. */
function constInitializers(source: ts.SourceFile): ReadonlyMap<string, readonly ts.Expression[]> {
  const cached = CONST_INITIALIZERS.get(source);
  if (cached !== undefined) return cached;
  const out = new Map<string, ts.Expression[]>();
  for (const node of descendants(source)) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isConst(node)) out.set(node.name.text, [...(out.get(node.name.text) ?? []), node.initializer]);
  }
  CONST_INITIALIZERS.set(source, out);
  return out;
}
const CONST_STRINGS = new WeakMap<ts.SourceFile, ReadonlyMap<string, readonly string[]>>();
/**
 * Every const binding of a file whose initializer is a string literal, or a const alias chain ending in one, by name: a name maps
 * to the values EVERY const declaration of it reaches, each alias link followed through every declaration of its own name
 * (distinct, sorted). The binding's own scope is not resolved, so a name const-declared in several scopes reads all of its values
 * (fail-closed, refusal #3 U1: the last declaration no longer wins).
 */
function constStrings(source: ts.SourceFile): ReadonlyMap<string, readonly string[]> {
  const cached = CONST_STRINGS.get(source);
  if (cached !== undefined) return cached;
  const initializers = constInitializers(source);
  const chained = (name: string, seen: ReadonlySet<string>): string[] =>
    seen.has(name)
      ? []
      : (initializers.get(name) ?? []).flatMap(initializer => {
          const inner = bare(initializer);
          if (ts.isStringLiteralLike(inner)) return [inner.text];
          return ts.isIdentifier(inner) ? chained(inner.text, new Set([...seen, name])) : [];
        });
  const out = new Map<string, readonly string[]>();
  for (const name of initializers.keys()) {
    const values = [...new Set(chained(name, new Set()))].sort();
    if (values.length > 0) out.set(name, values);
  }
  CONST_STRINGS.set(source, out);
  return out;
}
/** Every string a node may spell: a string literal or no-substitution template, or an identifier const-bound to one - every value its name's const declarations reach (constStrings). */
function stringValues(node: ts.Node | undefined): readonly string[] {
  if (node === undefined) return [];
  const inner = bare(node);
  if (ts.isStringLiteralLike(inner)) return [inner.text];
  return ts.isIdentifier(inner) ? (constStrings(inner.getSourceFile()).get(inner.text) ?? []) : [];
}
const DECLARATION_COUNTS = new WeakMap<ts.SourceFile, ReadonlyMap<string, number>>();
/** How many times a file declares each name, in any binding form (declaredNames: imports, variables, parameters, binding elements, functions, classes, enums). */
function declarationCounts(source: ts.SourceFile): ReadonlyMap<string, number> {
  const cached = DECLARATION_COUNTS.get(source);
  if (cached !== undefined) return cached;
  const out = new Map<string, number>();
  for (const entry of declaredNames(source)) out.set(entry.name, (out.get(entry.name) ?? 0) + 1);
  DECLARATION_COUNTS.set(source, out);
  return out;
}
/** The value of a name the file declares exactly once, in any binding form, as a const reaching one string through names each declared once - else undefined. */
function soleString(source: ts.SourceFile, name: string, seen: ReadonlySet<string>): string | undefined {
  const initializers = constInitializers(source).get(name) ?? [];
  const initializer = initializers[0];
  if (initializer === undefined || initializers.length !== 1 || seen.has(name) || declarationCounts(source).get(name) !== 1) return undefined;
  const inner = bare(initializer);
  if (ts.isStringLiteralLike(inner)) return inner.text;
  return ts.isIdentifier(inner) ? soleString(source, inner.text, new Set([...seen, name])) : undefined;
}
/** The ONE string a node spells, or undefined: a literal, or an identifier soleString resolves - so an exemption never follows a name the file declares twice (fail-closed). */
function stringValue(node: ts.Node | undefined): string | undefined {
  if (node === undefined) return undefined;
  const inner = bare(node);
  if (ts.isStringLiteralLike(inner)) return inner.text;
  return ts.isIdentifier(inner) ? soleString(inner.getSourceFile(), inner.text, new Set()) : undefined;
}
/** A callee as dotted text: property access and string-keyed element access both read as a.b (an element key reads as its member). */
function calleeName(expression: ts.Expression): string {
  const inner = bare(expression);
  if (ts.isPropertyAccessExpression(inner)) return `${calleeName(inner.expression)}.${inner.name.text}`;
  if (ts.isElementAccessExpression(inner) && ts.isStringLiteralLike(inner.argumentExpression)) return `${calleeName(inner.expression)}.${inner.argumentExpression.text}`;
  return ts.isIdentifier(inner) ? inner.text : `<${ts.SyntaxKind[inner.kind]}>`;
}
/** A leading read of the global object through itself (globalThis. or global.), which a callee chain drops: globalThis.Object.assign reads Object.assign. */
const GLOBAL_PREFIX = /^(?:(?:globalThis|global)\.)+/;
const unglobal = (chain: string): string => chain.replace(GLOBAL_PREFIX, "");
const isChainExpression = (node: ts.Node): boolean => {
  const inner = bare(node);
  return ts.isIdentifier(inner) || ts.isPropertyAccessExpression(inner) || ts.isElementAccessExpression(inner);
};
/**
 * Every dotted spelling a callee may have: a property access, and an element access keyed by a string literal or a const binding
 * (every value of it, stringValues; any other key reads <computed>), each read as a.b; a root identifier also reads as each name
 * or member chain its const declarations alias (every declaration, cycle-guarded); a leading globalThis. or global. is dropped
 * (refusal #3 U3: Object.assign reached through globalThis or through a const alias of Object reads as Object.assign).
 */
function calleeChains(expression: ts.Node, seen: ReadonlySet<string> = new Set()): readonly string[] {
  const inner = bare(expression);
  let chains: readonly string[];
  if (ts.isPropertyAccessExpression(inner)) chains = calleeChains(inner.expression, seen).map(base => `${base}.${inner.name.text}`);
  else if (ts.isElementAccessExpression(inner)) {
    const keys = stringValues(inner.argumentExpression);
    const bases = calleeChains(inner.expression, seen);
    chains = (keys.length > 0 ? keys : ["<computed>"]).flatMap(key => bases.map(base => `${base}.${key}`));
  } else if (ts.isIdentifier(inner)) {
    const aliases = seen.has(inner.text) ? [] : (constInitializers(inner.getSourceFile()).get(inner.text) ?? []).filter(isChainExpression);
    chains = [inner.text, ...aliases.flatMap(alias => calleeChains(alias, new Set([...seen, inner.text])))];
  } else chains = [`<${ts.SyntaxKind[inner.kind]}>`];
  return [...new Set(chains.map(unglobal))];
}

// ---- comments ---------------------------------------------------------------------------------------------------------

interface CommentRange {
  readonly pos: number;
  readonly end: number;
  readonly text: string;
}
const COMMENTS = new WeakMap<ts.SourceFile, readonly CommentRange[]>();
/** Every comment of a file (leading and trailing trivia of each token), in source order. */
function commentsOf(source: ts.SourceFile): readonly CommentRange[] {
  const cached = COMMENTS.get(source);
  if (cached !== undefined) return cached;
  const seen = new Map<number, CommentRange>();
  const take = (ranges: readonly ts.CommentRange[] | undefined): void => {
    for (const range of ranges ?? []) seen.set(range.pos, { pos: range.pos, end: range.end, text: source.text.slice(range.pos, range.end) });
  };
  const visit = (node: ts.Node): void => {
    take(ts.getLeadingCommentRanges(source.text, node.getFullStart()));
    take(ts.getTrailingCommentRanges(source.text, node.getEnd()));
    for (const child of node.getChildren(source)) visit(child);
  };
  visit(source);
  const out = [...seen.values()].sort((a, b) => a.pos - b.pos);
  COMMENTS.set(source, out);
  return out;
}
/** The statement a node sits in, at its own statement list's level. */
function statementOf(node: ts.Node): ts.Node {
  let link = node;
  while (link.parent !== undefined && !ts.isSourceFile(link.parent) && !ts.isBlock(link.parent) && !ts.isModuleBlock(link.parent) && !ts.isCaseClause(link.parent) && !ts.isDefaultClause(link.parent)) {
    link = link.parent;
  }
  return link;
}
/** Every comment attached to or inside a node's statement: from the statement's full start (its leading trivia) to the end of its last line. */
function attachedComments(source: ts.SourceFile, node: ts.Node): string[] {
  const statement = statementOf(node);
  const from = statement.getFullStart();
  const newline = source.text.indexOf("\n", statement.getEnd());
  const to = newline === -1 ? source.text.length : newline;
  return commentsOf(source)
    .filter(range => range.pos >= from && range.end <= to)
    .map(range => range.text);
}

// ---- vitest registrations and assertions ------------------------------------------------------------------------------

const REGISTRARS = new Set(["describe", "suite", "it", "test"]);
interface Registration {
  readonly call: ts.CallExpression;
  /** The vitest registrar the callee resolves to (describe, suite, it or test). */
  readonly root: string;
  /** The identifier the callee chain starts at (a registrar binding or a vitest namespace). */
  readonly head: ts.Identifier;
  /** The members chained between the registrar and the call (each, fails, todo, concurrent ...); empty for a bare call. */
  readonly members: readonly string[];
  readonly title: string;
}
interface RegistrarBindings {
  /** Each local name a named vitest import binds (aliased or not) to a registrar, with that registrar. */
  readonly named: ReadonlyMap<string, string>;
  /** Each vitest namespace import's local name. */
  readonly namespaces: ReadonlySet<string>;
}
const REGISTRAR_BINDINGS = new WeakMap<ts.SourceFile, RegistrarBindings>();
/** A file's vitest import bindings of the registrars: a named import (aliased or not, never type-only) or a namespace import. */
function registrarBindings(source: ts.SourceFile): RegistrarBindings {
  const cached = REGISTRAR_BINDINGS.get(source);
  if (cached !== undefined) return cached;
  const named = new Map<string, string>();
  const namespaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier) || statement.moduleSpecifier.text !== VITEST) continue;
    const clause = statement.importClause;
    const bindings = clause === undefined || clause.isTypeOnly ? undefined : clause.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) namespaces.add(bindings.name.text);
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) {
        const imported = (element.propertyName ?? element.name).text;
        if (!element.isTypeOnly && REGISTRARS.has(imported)) named.set(element.name.text, imported);
      }
    }
  }
  const out = { named, namespaces };
  REGISTRAR_BINDINGS.set(source, out);
  return out;
}
/** The registrar a call's callee chain resolves to, its head identifier and its chained members, whatever its title. */
function registrarCall(call: ts.CallExpression): { readonly root: string; readonly head: ts.Identifier; readonly members: readonly string[] } | undefined {
  const bindings = registrarBindings(call.getSourceFile());
  const members: string[] = [];
  let callee: ts.Expression = call.expression;
  while (ts.isPropertyAccessExpression(callee) || ts.isCallExpression(callee)) {
    if (ts.isPropertyAccessExpression(callee)) members.unshift(callee.name.text);
    callee = callee.expression;
  }
  if (!ts.isIdentifier(callee)) return undefined;
  const named = bindings.named.get(callee.text);
  if (named !== undefined) return { root: named, head: callee, members };
  const [first, ...rest] = members;
  return bindings.namespaces.has(callee.text) && first !== undefined && REGISTRARS.has(first) ? { root: first, head: callee, members: rest } : undefined;
}
function registrationOf(call: ts.CallExpression): Registration | undefined {
  const resolved = registrarCall(call);
  const title = call.arguments[0];
  if (resolved === undefined || title === undefined || !ts.isStringLiteralLike(title)) return undefined;
  return { call, ...resolved, title: title.text };
}
/** Whether a node sits in a type position (a type node is among its ancestors). */
function inType(node: ts.Node): boolean {
  for (let link = node.parent; link !== undefined && !ts.isSourceFile(link); link = link.parent) if (ts.isTypeNode(link)) return true;
  return false;
}
/**
 * The departures of a file's vitest bindings: file-wide, an aliased or a namespace vitest import, a registrar binding or vitest
 * namespace used other than as a callee head, expect used other than as a callee or a member's object, and vi used other than
 * as a member's object; inside the suite's call, a registrar call with a computed title.
 */
function bindingMisuse(source: ts.SourceFile, suite: Registration): string[] {
  const bindings = registrarBindings(source);
  const imports = source.statements.flatMap(statement => {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier) || statement.moduleSpecifier.text !== VITEST) return [];
    const named = statement.importClause?.namedBindings;
    if (named !== undefined && ts.isNamespaceImport(named)) return [`a vitest namespace import ${named.name.text} :${lineOf(source, statement)}`];
    if (named === undefined || !ts.isNamedImports(named)) return [];
    return named.elements.flatMap(element => (element.propertyName === undefined ? [] : [`an aliased vitest import ${element.propertyName.text} as ${element.name.text} :${lineOf(source, element)}`]));
  });
  const calls = callsIn(source).flatMap(call => {
    const resolved = registrarCall(call);
    return resolved === undefined ? [] : [{ call, resolved }];
  });
  const heads = new Set<ts.Node>(calls.map(entry => entry.resolved.head));
  const within = (node: ts.Node): boolean => node.getStart() >= suite.call.getStart() && node.getEnd() <= suite.call.getEnd();
  const computed = calls
    .filter(entry => within(entry.call) && !ts.isStringLiteralLike(entry.call.arguments[0] ?? entry.call))
    .map(entry => `a ${entry.resolved.root} call with a computed title :${lineOf(source, entry.call)}`);
  const values = descendants(source).flatMap((node): string[] => {
    if (!ts.isIdentifier(node) || !isReference(node) || inType(node)) return [];
    const parent = node.parent;
    const receiver = ts.isPropertyAccessExpression(parent) && parent.expression === node;
    const callee = ts.isCallExpression(parent) && parent.expression === node;
    const misused = bindings.named.has(node.text) || bindings.namespaces.has(node.text) ? !heads.has(node) : node.text === "expect" ? !receiver && !callee : node.text === "vi" && !receiver;
    return misused ? [`${node.text} used as a value :${lineOf(source, node)}`] : [];
  });
  return [...imports, ...computed, ...values];
}
function registrationsIn(scope: ts.Node): Registration[] {
  return callsIn(scope).flatMap(call => {
    const found = registrationOf(call);
    return found === undefined ? [] : [found];
  });
}
const isSuiteRoot = (entry: Registration): boolean => entry.root === "describe" || entry.root === "suite";
function suitesNamed(scope: ts.Node, title: string): Registration[] {
  return registrationsIn(scope).filter(entry => isSuiteRoot(entry) && entry.title === title);
}
function casesOf(suite: Registration): Registration[] {
  return registrationsIn(suite.call).filter(entry => !isSuiteRoot(entry));
}
const callShape = (entry: Registration): string => `${entry.root}${entry.members.map(member => `.${member}`).join("")}`;
/** How a registration departs from a bare call with a title and a parameterless inline callback, or undefined when it does not. */
function formDeparture(entry: Registration): string | undefined {
  if (entry.members.length > 0) return `${entry.title}: a ${callShape(entry)} member`;
  if (entry.call.arguments.length !== 2) return `${entry.title}: ${entry.call.arguments.length} arguments`;
  const callback = entry.call.arguments[1];
  if (callback === undefined || !(ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))) return `${entry.title}: a callback that is no inline function`;
  if (callback.parameters.length > 0) return `${entry.title}: a test-context parameter`;
  return undefined;
}

const CHAIN_FLAGS = new Set(["not", "rejects", "resolves"]);
interface Assertion {
  /** The expect subject (an identifier or property path as spelled, a call as its callee plus "()") and the chain after it. */
  readonly signature: string;
  readonly subject: ts.Expression | undefined;
  readonly matcher: string;
  readonly flags: readonly string[];
  readonly line: number;
  readonly call: ts.CallExpression;
}
function subjectText(node: ts.Expression | undefined): string {
  if (node === undefined) return "<none>";
  if (ts.isCallExpression(node)) return `${subjectText(node.expression)}()`;
  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) return node.getText().replace(/\s+/g, "");
  return `<${ts.SyntaxKind[node.kind]}>`;
}
/** Every expect(...) / expect.<member>(...) chain under a node, in source order. */
function assertionsIn(source: ts.SourceFile, scope: ts.Node): Assertion[] {
  return callsIn(scope).flatMap(call => {
    if (!ts.isPropertyAccessExpression(call.expression)) return [];
    const chain: string[] = [];
    let link: ts.Expression = call.expression;
    while (ts.isPropertyAccessExpression(link)) {
      chain.unshift(link.name.text);
      link = link.expression;
    }
    if (!ts.isCallExpression(link)) return [];
    const head = link.expression;
    const root = ts.isIdentifier(head)
      ? head.text
      : ts.isPropertyAccessExpression(head) && ts.isIdentifier(head.expression)
        ? `${head.expression.text}.${head.name.text}`
        : "";
    if (root !== "expect" && !root.startsWith("expect.")) return [];
    const prefix = root === "expect" ? "" : `${root.slice("expect.".length)}:`;
    const subject = link.arguments[0];
    return [{ signature: `${prefix}${subjectText(subject)}.${chain.join(".")}`, subject, matcher: chain[chain.length - 1] ?? "<none>", flags: chain.slice(0, -1), line: lineOf(source, call), call }];
  });
}
/** Calls through vitest's or node's assert (assert(...), assert.equal(...)). */
function assertCallsIn(scope: ts.Node): ts.CallExpression[] {
  return callsIn(scope).filter(call => {
    let link: ts.Expression = call.expression;
    while (ts.isPropertyAccessExpression(link)) link = link.expression;
    return ts.isIdentifier(link) && link.text === "assert";
  });
}
/** The signature list with each signature numbered by its occurrence ("x.toHaveBeenCalledOnce#2"). */
function numbered(signatures: readonly string[]): string[] {
  const seen = new Map<string, number>();
  return signatures.map(signature => {
    const count = (seen.get(signature) ?? 0) + 1;
    seen.set(signature, count);
    return `${signature}#${count}`;
  });
}

// ---- the judged custody suite -----------------------------------------------------------------------------------------

interface CaseRow {
  readonly id: string;
  readonly title: string;
  /** The case's assertion signatures in source order. */
  readonly pins: readonly string[];
}
const CASES: readonly CaseRow[] = [
  {
    id: "K1",
    title: "delegates binary selection to SDK PATH discovery and enforces read grants",
    pins: ["registry.invoke().rejects.toMatchObject", "open.not.toHaveBeenCalled", "open.toHaveBeenCalledWith", "client.close.toHaveBeenCalledOnce"],
  },
  { id: "K2", title: "preserves incomplete native coverage instead of inventing absence", pins: ["result.toMatchObject"] },
  {
    id: "K3",
    title: "closes an SDK client when abort fires during asynchronous open, before find",
    pins: [
      "client.dispose.toHaveBeenCalledOnce",
      "result.rejects.toMatchObject",
      "client.find.not.toHaveBeenCalled",
      "client.dispose.toHaveBeenCalledOnce",
      "client.close.toHaveBeenCalledOnce",
    ],
  },
];
interface CustodyClaim {
  /** The rationale's own name for the claim. */
  readonly claim: string;
  readonly caseId: string;
  /** Numbered signatures of the case (numbered()) that prove the claim. */
  readonly pins: readonly string[];
}
const CUSTODY: readonly CustodyClaim[] = [
  { claim: "close-once", caseId: "K1", pins: ["client.close.toHaveBeenCalledOnce#1"] },
  { claim: "abort-dispose", caseId: "K3", pins: ["client.dispose.toHaveBeenCalledOnce#1", "client.dispose.toHaveBeenCalledOnce#2"] },
  { claim: "close after abort", caseId: "K3", pins: ["client.close.toHaveBeenCalledOnce#1"] },
];

const CALL_MATCHERS = new Set(["toHaveBeenCalled", "toHaveBeenCalledOnce", "toHaveBeenCalledTimes", "toHaveBeenCalledWith", "toHaveBeenLastCalledWith", "toHaveBeenNthCalledWith"]);
const OUTCOME_MATCHERS = new Set(["toMatchObject", "toEqual", "toStrictEqual"]);
const STAND_IN_FACTORIES = new Set(["vi.fn", "vi.spyOn"]);
const MOCKED_RETURNS = new Set(["mockReturnValue", "mockReturnValueOnce", "mockResolvedValue", "mockResolvedValueOnce", "mockImplementation", "mockImplementationOnce"]);
/** The calls that undo a stub inside a case: a mock's own restoring members, and vitest's all-mocks restores. */
const STUB_UNDOS: ReadonlySet<string> = new Set(["mockRestore", "mockReset"]);
const ALL_UNDOS: ReadonlySet<string> = new Set(["vi.restoreAllMocks", "vi.resetAllMocks"]);
/** The provider entry points a custody case drives, and the one whose call value is the provider's own result. */
const PROVIDER_ENTRIES = new Set(["nativeHyperUnixFind", "registerNativeHyperUnixFind", "registerHyperUnixFind"]);
const PROVIDER_CALLS = new Set(["nativeHyperUnixFind"]);
const REGISTRY = "registry";
/** The names a judged case relies on, each with the one module that may declare it (as a named import); a Map, never a plain object. */
const BOUND: ReadonlyMap<string, string> = new Map([
  ["describe", "vitest"],
  ["it", "vitest"],
  ["expect", "vitest"],
  ["vi", "vitest"],
  ["HyperUnix", SDK_MODULE],
  ["nativeHyperUnixFind", PROVIDER_MODULE],
  ["registerNativeHyperUnixFind", PROVIDER_MODULE],
  ["registerHyperUnixFind", PROVIDER_MODULE],
  ["CapabilityRegistry", REGISTRY_MODULE],
]);
/** The module-mock calls, read through calleeName (assembled: this file spells none of its own) and the modules no custody file may mock. */
const MODULE_MOCKS: ReadonlySet<string> = new Set(["vi", "vitest"].flatMap(owner => ["mock", "doMock"].map(member => `${owner}.${member}`)));
const GUARDED_MODULES: readonly string[] = [SDK_MODULE, PROVIDER_MODULE, REGISTRY_MODULE];
const SPECIFIER_EXTENSION = /\.(?:[cm]?[jt]s|[jt]sx)$/;
/** The repository path a specifier names from the lifecycle file: relative, root-relative or absolute under the root, else a package under node_modules; the extension and a trailing /index dropped. */
function specifierTarget(specifier: string): string {
  const stem = (path: string): string => path.replace(SPECIFIER_EXTENSION, "").replace(/\/index$/, "");
  if (specifier.startsWith(".")) return stem(posix.normalize(posix.join(posix.dirname(LIFECYCLE), specifier)));
  if (specifier.startsWith(`${ROOT}/`)) return stem(posix.normalize(specifier.slice(ROOT.length + 1)));
  if (specifier.startsWith("/")) return stem(posix.normalize(specifier.slice(1)));
  return stem(posix.normalize(`node_modules/${specifier}`));
}
/** The guarded modules' targets: the SDK package (any path inside it), and the provider and registry files. */
const GUARDED_TARGETS: readonly string[] = GUARDED_MODULES.map(specifierTarget);
const isGuardedTarget = (target: string): boolean => GUARDED_TARGETS.some(guarded => target === guarded || (guarded.startsWith("node_modules/") && target.startsWith(`${guarded}/`)));

interface Declared {
  readonly name: string;
  readonly kind: string;
  readonly from: string | undefined;
  readonly line: number;
}
/** Every name a file declares, with the declaration's kind and, for a named import, its module. */
function declaredNames(source: ts.SourceFile): Declared[] {
  return descendants(source).flatMap((node): Declared[] => {
    if (ts.isImportSpecifier(node)) {
      const declaration = node.parent.parent.parent;
      const from = ts.isStringLiteralLike(declaration.moduleSpecifier) ? declaration.moduleSpecifier.text : undefined;
      return [{ name: node.name.text, kind: "import", from, line: lineOf(source, node) }];
    }
    if ((ts.isImportClause(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node)) && node.name !== undefined) {
      return [{ name: node.name.text, kind: ts.SyntaxKind[node.kind], from: undefined, line: lineOf(source, node) }];
    }
    if (
      (ts.isVariableDeclaration(node) ||
        ts.isParameter(node) ||
        ts.isBindingElement(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isFunctionExpression(node) ||
        ts.isClassDeclaration(node) ||
        ts.isClassExpression(node) ||
        ts.isEnumDeclaration(node)) &&
      node.name !== undefined &&
      ts.isIdentifier(node.name)
    ) {
      return [{ name: node.name.text, kind: ts.SyntaxKind[node.kind], from: undefined, line: lineOf(source, node) }];
    }
    return [];
  });
}
/** Every declaration of a BOUND name other than its named import from its own module. */
function reboundNames(source: ts.SourceFile): string[] {
  return declaredNames(source)
    .filter(entry => BOUND.has(entry.name) && !(entry.kind === "import" && entry.from === BOUND.get(entry.name)))
    .map(entry => `${entry.name} :${entry.line} (${entry.kind}${entry.from === undefined ? "" : ` from ${entry.from}`})`);
}
/** A module mock's specifiers: its first argument's string values (stringValues), or those of the string an import(...) argument loads. */
function mockSpecifiers(argument: ts.Expression | undefined): readonly string[] {
  const inner = argument === undefined ? undefined : bare(argument);
  if (inner !== undefined && ts.isCallExpression(inner) && inner.expression.kind === ts.SyntaxKind.ImportKeyword) return stringValues(inner.arguments[0]);
  return stringValues(inner);
}
/** Every module mock (a call whose calleeChains hold a MODULE_MOCKS name) with a specifier value that resolves to a guarded module (specifierTarget). */
function moduleMocks(source: ts.SourceFile): string[] {
  return callsIn(source).flatMap(call => {
    const mock = calleeChains(call.expression).find(name => MODULE_MOCKS.has(name));
    if (mock === undefined) return [];
    return mockSpecifiers(call.arguments[0])
      .filter(specifier => isGuardedTarget(specifierTarget(specifier)))
      .map(specifier => `${mock}(${specifier}) :${lineOf(source, call)}`);
  });
}
/** The vitest calls that stub a global; vi.stubEnv sets the environment and is read with process.env below. */
const GLOBAL_STUBS: ReadonlySet<string> = new Set(["vi.stubGlobal", "vi.useFakeTimers", "vi.setSystemTime"]);
/** The Object / Reflect calls that mutate the object their first argument names. */
const MUTATORS: ReadonlySet<string> = new Set(["Object.assign", "Object.defineProperty", "Object.defineProperties", "Object.setPrototypeOf", "Reflect.set", "Reflect.defineProperty", "Reflect.deleteProperty", "Reflect.setPrototypeOf"]);
/** The callees whose reference anywhere but as a call's callee is itself a tamper (call / apply / bind, an alias, an argument). */
const WATCHED: ReadonlySet<string> = new Set(["vi.spyOn", ...GLOBAL_STUBS, ...MUTATORS, ...MODULE_MOCKS]);
/** The process environment: a chain rooted here is environment, which a stubbed HyperUnix.open makes inert. */
const ENVIRONMENT = "process.env";
const IMPORT_KINDS: ReadonlySet<string> = new Set(["import", "ImportClause", "NamespaceImport", "ImportEqualsDeclaration"]);
/** The names a file declares itself (variables, parameters, functions, classes, enums), imports left out. */
function localNames(source: ts.SourceFile): ReadonlySet<string> {
  return new Set(declaredNames(source).filter(entry => !IMPORT_KINDS.has(entry.kind)).map(entry => entry.name));
}
/** The names of the running platform's global object: a root spelling one of them reads as that global even where the file declares a local of the same name in some scope (the shadowing scope is not resolved: fail-closed). */
const GLOBAL_NAMES: ReadonlySet<string> = new Set(Object.getOwnPropertyNames(globalThis));
/**
 * Every member chain a node may write, as dotted text, whose root is a global or an import binding: a root the file declares no
 * local of, or one GLOBAL_NAMES holds; a local root followed through EVERY const declaration of its name (its aliases); a key spelled
 * through a const binding read as every value of it (stringValues; any other key reads <computed>, never the environment).
 */
function outsideChains(node: ts.Node, source: ts.SourceFile, locals: ReadonlySet<string>, seen: ReadonlySet<string> = new Set()): readonly string[] {
  const inner = bare(node);
  if (ts.isPropertyAccessExpression(inner) || ts.isElementAccessExpression(inner)) {
    const keys = ts.isPropertyAccessExpression(inner) ? [inner.name.text] : stringValues(inner.argumentExpression);
    return outsideChains(inner.expression, source, locals, seen).flatMap(base => (keys.length > 0 ? keys : ["<computed>"]).map(key => `${base}.${key}`));
  }
  if (!ts.isIdentifier(inner)) return [];
  const own = !locals.has(inner.text) || GLOBAL_NAMES.has(inner.text) ? [inner.text] : [];
  const aliases = seen.has(inner.text) ? [] : (constInitializers(source).get(inner.text) ?? []);
  return [...new Set([...own, ...aliases.flatMap(alias => outsideChains(alias, source, locals, new Set([...seen, inner.text])))])];
}
const isEnvironment = (chain: string): boolean => {
  const path = unglobal(chain);
  return path === ENVIRONMENT || path.startsWith(`${ENVIRONMENT}.`);
};
/**
 * The targets a write names: the expression itself, or every element of an array or object destructuring-assignment pattern (nested,
 * spread / rest included; a shorthand property's own name). A default inside a pattern (x = v) is an assignment the walk reads by
 * itself, so it adds nothing here (refusal #3 U3: [JSON.parse] = [forged] and ({ parse: JSON.parse } = ...) name JSON.parse).
 */
function assignmentTargets(target: ts.Node): ts.Node[] {
  const inner = bare(target);
  if (ts.isArrayLiteralExpression(inner)) return inner.elements.flatMap(element => (ts.isOmittedExpression(element) ? [] : assignmentTargets(ts.isSpreadElement(element) ? element.expression : element)));
  if (ts.isObjectLiteralExpression(inner)) {
    return inner.properties.flatMap((property): ts.Node[] => {
      if (ts.isPropertyAssignment(property)) return assignmentTargets(property.initializer);
      if (ts.isShorthandPropertyAssignment(property)) return [property.name];
      return ts.isSpreadAssignment(property) ? assignmentTargets(property.expression) : [];
    });
  }
  if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.EqualsToken) return [];
  return [inner];
}
/** The member chains a destructuring pattern reads from the chains its source spells: each key under each base (a rest element reads base.*), nested patterns followed. */
function patternMembers(pattern: ts.Node, bases: readonly string[]): string[] {
  const inner = bare(pattern);
  const under = (keys: readonly string[]): string[] => keys.flatMap(key => bases.map(base => `${base}.${key}`));
  if (ts.isObjectBindingPattern(inner)) {
    return inner.elements.flatMap(element => (element.dotDotDotToken !== undefined ? under(["*"]) : patternMembers(element.name, under(keyTexts(element.propertyName ?? element.name)))));
  }
  if (ts.isObjectLiteralExpression(inner)) {
    return inner.properties.flatMap((property): string[] => {
      if (ts.isSpreadAssignment(property)) return under(["*"]);
      if (ts.isPropertyAssignment(property)) return patternMembers(property.initializer, under(keyTexts(property.name)));
      return ts.isShorthandPropertyAssignment(property) ? under([property.name.text]) : [];
    });
  }
  return [...bases];
}
/** The WATCHED names a list of member chains holds; a rest read (base.*) holds every WATCHED name under its base. */
const watchedIn = (members: readonly string[]): string[] =>
  members.map(unglobal).flatMap(member => (member.endsWith(".*") ? [...WATCHED].filter(name => name.startsWith(member.slice(0, -1))) : WATCHED.has(member) ? [member] : []));
/**
 * Every write to a global or an import binding anywhere in a file: a vi.spyOn beside HyperUnix.open, a GLOBAL_STUBS call, an
 * assignment (each target of a destructuring pattern included), a for-in / for-of target, a delete or update of a chain rooted
 * outside the file, or a MUTATORS call on one - the environment left out; and every WATCHED callee read other than as a call's
 * callee, a destructured alias of one included. Callees read through calleeChains.
 */
function tampersIn(source: ts.SourceFile): string[] {
  const locals = localNames(source);
  const outside = (node: ts.Node): readonly string[] => outsideChains(node, source, locals).filter(chain => !isEnvironment(chain));
  return descendants(source).flatMap((node): string[] => {
    const at = (what: string): string[] => [`${what} :${lineOf(source, node)}`];
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const watched = calleeChains(node).find(name => WATCHED.has(name));
      if (watched !== undefined) {
        let link: ts.Node = node;
        while (ts.isParenthesizedExpression(link.parent)) link = link.parent;
        if (!(ts.isCallExpression(link.parent) && link.parent.expression === link)) return at(`${watched} referenced as a value`);
      }
    }
    if (ts.isVariableDeclaration(node) && !ts.isIdentifier(node.name) && node.initializer !== undefined) {
      return watchedIn(patternMembers(node.name, calleeChains(node.initializer))).flatMap(name => at(`${name} referenced as a value`));
    }
    if (ts.isCallExpression(node)) {
      const callees = calleeChains(node.expression);
      const stub = callees.find(name => GLOBAL_STUBS.has(name));
      if (stub !== undefined) return at(stub);
      if (callees.includes("vi.spyOn")) {
        const [target, method] = node.arguments;
        const open = target !== undefined && ts.isIdentifier(bare(target)) && (bare(target) as ts.Identifier).text === "HyperUnix" && stringValue(method) === "open";
        return open ? [] : at(`vi.spyOn(${target?.getText() ?? ""})`);
      }
      const mutator = callees.find(name => MUTATORS.has(name));
      return mutator === undefined ? [] : outside(node.arguments[0] ?? node).flatMap(chain => at(`${mutator}(${chain})`));
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      const aliased = node.operatorToken.kind === ts.SyntaxKind.EqualsToken && !isChainExpression(node.left) ? watchedIn(patternMembers(node.left, calleeChains(node.right))) : [];
      return [...assignmentTargets(node.left).flatMap(outside).flatMap(chain => at(`${chain} assigned`)), ...aliased.flatMap(name => at(`${name} referenced as a value`))];
    }
    if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) {
      return assignmentTargets(node.initializer).flatMap(outside).flatMap(chain => at(`${chain} assigned`));
    }
    if (ts.isDeleteExpression(node)) return outside(node.expression).flatMap(chain => at(`${chain} deleted`));
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
      return outside(node.operand).flatMap(chain => at(`${chain} updated`));
    }
    return [];
  });
}

function declarationsIn(scope: ts.Node): Map<string, ts.VariableDeclaration[]> {
  const out = new Map<string, ts.VariableDeclaration[]>();
  for (const node of descendants(scope)) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) out.set(node.name.text, [...(out.get(node.name.text) ?? []), node]);
  }
  return out;
}
const isConst = (declaration: ts.VariableDeclaration): boolean => ts.isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & ts.NodeFlags.Const) !== 0;
/** Whether an identifier is a use of a binding (not a declaration name, a member name or a property key). */
function isReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return false;
  if (
    (ts.isPropertyAssignment(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isGetAccessorDeclaration(parent) ||
      ts.isSetAccessorDeclaration(parent) ||
      ts.isEnumMember(parent)) &&
    parent.name === node
  ) {
    return false;
  }
  if (
    (ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) &&
    parent.name === node
  ) {
    return false;
  }
  if (ts.isBindingElement(parent) && (parent.name === node || parent.propertyName === node)) return false;
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return false;
  return true;
}
function referencesIn(scope: ts.Node, name: string): ts.Identifier[] {
  return descendants(scope).filter((node): node is ts.Identifier => ts.isIdentifier(node) && node.text === name && isReference(node));
}
function unwrapped(expression: ts.Expression): ts.Expression {
  return ts.isAwaitExpression(expression) || ts.isParenthesizedExpression(expression) ? unwrapped(expression.expression) : expression;
}
function rootIdentifier(expression: ts.Expression): string | undefined {
  let link: ts.Expression = expression;
  while (ts.isPropertyAccessExpression(link) || ts.isElementAccessExpression(link) || ts.isCallExpression(link)) link = link.expression;
  return ts.isIdentifier(link) ? link.text : undefined;
}
/** Whether an identifier is the subject of an expect(...) call (through await and parentheses). */
function isExpectSubject(node: ts.Identifier): boolean {
  let link: ts.Node = node;
  while (ts.isAwaitExpression(link.parent) || ts.isParenthesizedExpression(link.parent)) link = link.parent;
  const parent = link.parent;
  return ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && parent.expression.text === "expect" && parent.arguments[0] === link;
}
/** Why a binding cannot be trusted, or undefined: declared once in the case, by const, and referenced only where allowed. */
function bindingDefect(scope: ts.Node, name: string, allowed: (reference: ts.Identifier) => boolean): string | undefined {
  const declarations = declarationsIn(scope).get(name) ?? [];
  if (declarations.length !== 1) return `${name} is declared ${declarations.length} times in the case`;
  const [declaration] = declarations;
  if (declaration === undefined || !isConst(declaration)) return `${name} is not a const binding`;
  const stray = referencesIn(scope, name).filter(reference => !allowed(reference));
  return stray.length === 0 ? undefined : `${name} is used outside its allowed positions (${stray.length} uses)`;
}
/** Why the case's registry is not a real one only the provider populates, or undefined. */
function registryDefect(scope: ts.Node): string | undefined {
  const defect = bindingDefect(scope, REGISTRY, reference => {
    const parent = reference.parent;
    if (ts.isPropertyAccessExpression(parent) && parent.expression === reference && parent.name.text === "invoke") return ts.isCallExpression(parent.parent) && parent.parent.expression === parent;
    return ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && PROVIDER_ENTRIES.has(parent.expression.text) && parent.arguments.some(argument => argument === reference);
  });
  if (defect !== undefined) return defect;
  const init = (declarationsIn(scope).get(REGISTRY) ?? [])[0]?.initializer;
  return init !== undefined && ts.isNewExpression(init) && ts.isIdentifier(init.expression) && init.expression.text === "CapabilityRegistry" ? undefined : "registry is no new CapabilityRegistry()";
}
/** Why a call's value is not the provider's own result, or undefined. */
function providerCallDefect(expression: ts.Expression, scope: ts.Node): string | undefined {
  const inner = unwrapped(expression);
  if (!ts.isCallExpression(inner)) return `a ${ts.SyntaxKind[inner.kind]} is no provider call`;
  const callee = calleeText(inner);
  if (PROVIDER_CALLS.has(callee)) return undefined;
  if (callee === `${REGISTRY}.invoke`) return registryDefect(scope);
  return `${callee} is neither the provider nor the registry`;
}
/** Why an outcome assertion's subject is not the provider's own result, or undefined. */
function outcomeDefect(subject: ts.Expression | undefined, scope: ts.Node): string | undefined {
  if (subject === undefined) return "no subject";
  const inner = unwrapped(subject);
  if (ts.isCallExpression(inner)) return providerCallDefect(inner, scope);
  if (!ts.isIdentifier(inner)) return `a ${ts.SyntaxKind[inner.kind]} subject`;
  const defect = bindingDefect(scope, inner.text, isExpectSubject);
  if (defect !== undefined) return defect;
  const init = (declarationsIn(scope).get(inner.text) ?? [])[0]?.initializer;
  return init === undefined ? `${inner.text} has no initializer` : providerCallDefect(init, scope);
}
/** Why a mock-call assertion's subject is not rooted in a stand-in, or undefined. */
function standInDefect(subject: ts.Expression | undefined, scope: ts.Node): string | undefined {
  const root = subject === undefined ? undefined : rootIdentifier(subject);
  if (root === undefined) return "no stand-in binding";
  const defect = bindingDefect(scope, root, () => true);
  if (defect !== undefined) return defect;
  const init = (declarationsIn(scope).get(root) ?? [])[0]?.initializer;
  return init !== undefined && callsIn(init).some(call => STAND_IN_FACTORIES.has(calleeText(call))) ? undefined : `${root} is built from no vi.fn / vi.spyOn`;
}
/** Why an assertion is not call custody, or undefined when it is. */
function custodyViolation(assertion: Assertion, scope: ts.Node): string | undefined {
  if (CALL_MATCHERS.has(assertion.matcher)) {
    if (assertion.flags.some(flag => flag !== "not")) return `${assertion.signature}: a call matcher behind ${assertion.flags.join(".")}`;
    const defect = standInDefect(assertion.subject, scope);
    return defect === undefined ? undefined : `${assertion.signature}: ${defect}`;
  }
  if (OUTCOME_MATCHERS.has(assertion.matcher)) {
    if (assertion.flags.some(flag => !CHAIN_FLAGS.has(flag))) return `${assertion.signature}: an outcome matcher behind ${assertion.flags.join(".")}`;
    const defect = outcomeDefect(assertion.subject, scope);
    return defect === undefined ? undefined : `${assertion.signature}: ${defect}`;
  }
  return `${assertion.signature}: matcher ${assertion.matcher} is neither a mock-call nor an outcome assertion`;
}
/** A HyperUnix.open stub with a mocked return: vi.spyOn(HyperUnix, "open").mockReturnValue(...) and its kin (MOCKED_RETURNS). */
function isOpenStub(node: ts.Node): boolean {
  if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression) || !MOCKED_RETURNS.has(node.expression.name.text)) return false;
  const spy = node.expression.expression;
  if (!ts.isCallExpression(spy) || calleeText(spy) !== "vi.spyOn") return false;
  const [target, method] = spy.arguments;
  return target !== undefined && ts.isIdentifier(target) && target.text === "HyperUnix" && method !== undefined && ts.isStringLiteralLike(method) && method.text === "open";
}
/** A case callback's own top-level statements (an inline callback with a block body; any other form has none). */
function caseStatements(entry: Registration): readonly ts.Statement[] {
  const callback = entry.call.arguments[1];
  return callback !== undefined && (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) && ts.isBlock(callback.body) ? callback.body.statements : [];
}
/** A top-level statement that is a HyperUnix.open stub: the stub call as an expression statement, or as the initializer of a lone const declaration. */
function isOpenStubStatement(statement: ts.Statement): boolean {
  if (ts.isExpressionStatement(statement)) return isOpenStub(bare(statement.expression));
  if (!ts.isVariableStatement(statement) || statement.declarationList.declarations.length !== 1) return false;
  const initializer = statement.declarationList.declarations[0]?.initializer;
  return initializer !== undefined && isOpenStub(bare(initializer));
}

/** C1, C2 and C3's readings of a lifecycle source, so a planted copy is read exactly as the real file is. */
interface SuiteReading {
  readonly suites: readonly string[];
  readonly nested: readonly string[];
  readonly departures: readonly string[];
  readonly rebound: readonly string[];
  readonly cases: readonly { readonly title: string; readonly call: string; readonly pins: readonly string[] }[];
  readonly violations: readonly string[];
  readonly mocks: readonly string[];
  /** Every vi.spyOn in the suite whose target is not HyperUnix, and every vi.stubGlobal: a spied global could forge the provider's result. */
  readonly tampers: readonly string[];
  readonly asserts: readonly string[];
  readonly stubs: readonly { readonly title: string; readonly stubbed: boolean; readonly drives: boolean; readonly stubFirst: boolean; readonly undone: boolean }[];
}
function suiteReading(source: ts.SourceFile): SuiteReading {
  const suites = suitesNamed(source, HX_SUITE);
  const suite = suites[0];
  const inner = suite === undefined ? [] : registrationsIn(suite.call).filter(entry => entry.call !== suite.call);
  const cases = suite === undefined ? [] : casesOf(suite);
  return {
    suites: suites.map(callShape),
    nested: inner.filter(isSuiteRoot).map(entry => entry.title),
    departures: [
      ...(suite === undefined ? [] : [suite, ...inner]).flatMap(entry => {
        const departure = formDeparture(entry);
        return departure === undefined ? [] : [departure];
      }),
      ...(suite === undefined ? [] : bindingMisuse(source, suite)),
    ],
    rebound: reboundNames(source),
    cases: cases.map(entry => ({ title: entry.title, call: callShape(entry), pins: assertionsIn(source, entry.call).map(assertion => assertion.signature) })),
    violations: [
      ...cases.flatMap(entry =>
        assertionsIn(source, entry.call).flatMap(assertion => {
          const why = custodyViolation(assertion, entry.call);
          return why === undefined ? [] : [`${entry.title} :${assertion.line}: ${why}`];
        }),
      ),
      ...(suite === undefined ? [] : assertionsIn(source, suite.call))
        .filter(assertion => !cases.some(entry => assertion.call.getStart() >= entry.call.getStart() && assertion.call.getEnd() <= entry.call.getEnd()))
        .map(assertion => `${HX_SUITE} :${assertion.line}: ${assertion.signature}: an assertion outside the suite's cases`),
    ],
    mocks: moduleMocks(source),
    tampers: tampersIn(source),
    asserts: suite === undefined ? [] : assertCallsIn(suite.call).map(call => `:${lineOf(source, call)}`),
    stubs: cases.map(entry => {
      const statements = caseStatements(entry);
      const stubAt = statements.findIndex(isOpenStubStatement);
      const driveAt = statements.findIndex(statement => descendants(statement).some(node => ts.isIdentifier(node) && PROVIDER_ENTRIES.has(node.text) && isReference(node)));
      const undone = callsIn(entry.call).some(call => {
        const callee = calleeName(call.expression);
        return ALL_UNDOS.has(callee) || STUB_UNDOS.has(callee.slice(callee.lastIndexOf(".") + 1));
      });
      return { title: entry.title, stubbed: stubAt >= 0, drives: driveAt >= 0, stubFirst: stubAt >= 0 && driveAt >= 0 && stubAt < driveAt, undone };
    }),
  };
}

// ---- C4's collector ---------------------------------------------------------------------------------------------------

const HX_SIDE = /(?<![\p{L}\p{N}])(?:hyperunix|hx)(?![\p{L}\p{N}])/iu;
const RF_SIDE = /(?<![\p{L}\p{N}])(?:rf|reactivefiber)(?![\p{L}\p{N}])/iu;
interface SuiteTexts {
  readonly titles: readonly string[];
  readonly comments: readonly string[];
  readonly literals: readonly string[];
  readonly identifiers: readonly string[];
  /** Every comment of the file that names the HX side. */
  readonly hxComments: readonly string[];
}
function suiteTexts(source: ts.SourceFile, suite: Registration): SuiteTexts {
  const statement = statementOf(suite.call);
  return {
    titles: [suite.title, ...registrationsIn(suite.call).filter(entry => entry.call !== suite.call).map(entry => entry.title)],
    comments: attachedComments(source, suite.call),
    literals: literalTexts(statement),
    identifiers: identifiersIn(statement),
    hxComments: commentsOf(source)
      .map(range => range.text)
      .filter(text => HX_SIDE.test(text)),
  };
}
/** Every C4 text that carries a vocabulary term, named by its collector. */
function suiteHits(texts: SuiteTexts): string[] {
  const kinds: ReadonlyArray<readonly [string, readonly string[]]> = [
    ["title", texts.titles],
    ["comment", texts.comments],
    ["literal", texts.literals],
    ["identifier", texts.identifiers],
    ["hx comment", texts.hxComments],
  ];
  return kinds.flatMap(([kind, list]) =>
    list.flatMap(text => {
      const terms = termsIn(visible(text));
      return terms.length > 0 ? [`${kind} ${JSON.stringify(text)} carries ${terms.join(", ")}`] : [];
    }),
  );
}
function plantedSuiteHits(text: string): string[] {
  const source = parseText("planted-lifecycle.test.ts", text);
  const suite = suitesNamed(source, HX_SUITE)[0];
  return suite === undefined ? ["<no suite>"] : suiteHits(suiteTexts(source, suite));
}

// ---- falsifier shapes -------------------------------------------------------------------------------------------------

const SHAPES = ["F1", "F2", "F3", "F4"] as const;
type Shape = (typeof SHAPES)[number];
interface ShapeHit {
  readonly shape: Shape;
  readonly line: number;
  readonly form: string;
}
/** The member names whose read is a falsifier shape (a Map: a plain object would answer inherited names such as toString). */
const MEMBER_SHAPES: ReadonlyMap<string, Shape> = new Map<string, Shape>([
  ["kill", "F1"],
  ["pid", "F2"],
  ["ESRCH", "F4"],
]);
/** Process-table tools: a command headed by one probes whether a process still runs. */
const PROCESS_TABLE = ["ps", "pgrep", "pkill", "kill", "killall", "pidof", "pstree", "pwdx", "lsof", "fuser"] as const;
const PROCESS_TABLE_SET: ReadonlySet<string> = new Set(PROCESS_TABLE);
/** A wrapper's option table: the options that take a separate argument, the positional words before its command, and the options whose argument is itself a command. */
interface WrapperRule {
  readonly arguments: readonly string[];
  readonly positionals: number;
  readonly commands: readonly string[];
}
const rule = (args: readonly string[], positionals = 0, commands: readonly string[] = []): WrapperRule => ({ arguments: args, positionals, commands });
/** The command wrappers F3 reads through, each with its option table (every other dash word is a flag; "--" ends the options). */
const WRAPPER_RULES: ReadonlyArray<readonly [string, WrapperRule]> = [
  ["env", rule(["-u", "--unset", "-C", "--chdir"], 0, ["-S", "--split-string"])],
  ["exec", rule(["-a"])],
  ["command", rule([])],
  ["builtin", rule([])],
  ["nohup", rule([])],
  ["setsid", rule([])],
  ["sudo", rule(["-u", "--user", "-g", "--group", "-h", "--host", "-p", "--prompt", "-C", "--close-from", "-D", "--chdir", "-r", "--role", "-t", "--type", "-U", "--other-user", "-T", "--command-timeout", "-R", "--chroot"])],
  ["doas", rule(["-u", "-C", "-a"])],
  ["su", rule(["-s", "--shell", "-g", "--group", "-G", "--supp-group", "-w", "--whitelist-environment"], 1, ["-c", "--command"])],
  ["runuser", rule(["-u", "--user", "-g", "--group", "-G", "--supp-group", "-s", "--shell", "-w", "--whitelist-environment"], 0, ["-c", "--command"])],
  ["nice", rule(["-n", "--adjustment"])],
  ["ionice", rule(["-c", "--class", "-n", "--classdata"])],
  ["chrt", rule(["-T", "--sched-runtime", "-P", "--sched-period", "-D", "--sched-deadline"], 1)],
  ["taskset", rule([], 1)],
  ["timeout", rule(["-s", "--signal", "-k", "--kill-after"], 1)],
  ["stdbuf", rule(["-i", "--input", "-o", "--output", "-e", "--error"])],
  ["unbuffer", rule([])],
  ["chroot", rule(["--userspec", "--groups"], 1)],
  ["flock", rule(["-w", "--timeout", "-E", "--conflict-exit-code"], 1, ["-c", "--command"])],
  ["watch", rule(["-n", "--interval", "-q", "--equexit"])],
  ["strace", rule(["-e", "-o", "-p", "-s", "-u", "-E", "-a", "-b", "-I", "-O", "-S", "-X", "-P"])],
  ["xargs", rule(["-a", "--arg-file", "-d", "--delimiter", "-E", "-e", "--eof", "-I", "-i", "--replace", "-L", "-l", "--max-lines", "-n", "--max-args", "-P", "--max-procs", "-s", "--max-chars", "--process-slot-var"])],
  ["busybox", rule([])],
  ["time", rule(["-f", "--format", "-o", "--output"])],
];
const WRAPPERS: ReadonlyMap<string, WrapperRule> = new Map(WRAPPER_RULES);
/** Shell reserved words after which the next word is a command head. */
const SHELL_KEYWORDS = ["!", "if", "then", "else", "elif", "do", "while", "until", "coproc", "eval"] as const;
const SHELL_KEYWORD_SET: ReadonlySet<string> = new Set(SHELL_KEYWORDS);
/** Shells: the text after the first flag word holding c (or fish's --command) among a shell's words is a command. */
const SHELLS = ["sh", "bash", "dash", "zsh", "ksh", "mksh", "ash", "fish", "csh", "tcsh"] as const;
const SHELL_SET: ReadonlySet<string> = new Set(SHELLS);
const SHELL_COMMAND_FLAG = /^(?:-[A-Za-z]*c[A-Za-z]*|--command)$/;
/** Shell separators: each piece between them is its own command. */
const COMMAND_SEPARATOR = /\$\(|[;&|\n`(){}]/;
/** Process-spawning calls: a literal in their arguments (or in an argv array they are given) is a command. */
const SPAWNERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"] as const;
const SPAWNER_SET: ReadonlySet<string> = new Set(SPAWNERS);
const PROC_PATH = /(?:^|\/)proc(?:\/|$)/i;
/** Case-insensitive, so a regular expression with the i flag (/esrch/i) still reads. */
const ESRCH_WORD = /(?<![A-Za-z0-9_])esrch(?![A-Za-z0-9_])/i;

/** The names a property, binding or member key may spell: its own text, or a computed key's string values (stringValues). */
function keyTexts(name: ts.Node | undefined): readonly string[] {
  if (name === undefined) return [];
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return [name.text];
  return ts.isComputedPropertyName(name) ? stringValues(name.expression) : [];
}
/** Whether an object-literal property is part of a destructuring-assignment target ({ pid } = child, for ({ pid } of list)). */
function inAssignmentTarget(property: ts.Node): boolean {
  let link: ts.Node = property.parent;
  while (
    link.parent !== undefined &&
    (ts.isPropertyAssignment(link.parent) ||
      ts.isShorthandPropertyAssignment(link.parent) ||
      ts.isSpreadAssignment(link.parent) ||
      ts.isObjectLiteralExpression(link.parent) ||
      ts.isArrayLiteralExpression(link.parent) ||
      ts.isSpreadElement(link.parent) ||
      ts.isParenthesizedExpression(link.parent))
  ) {
    link = link.parent;
  }
  const parent = link.parent;
  if (parent === undefined) return false;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === link;
  return (ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.initializer === link;
}
/** The member a node reads, and the form it reads it in. */
/** The member a node reads - every name its key may spell (an element or computed key reads each of its string values) - and the form it reads it in. */
function memberRead(node: ts.Node): { readonly names: readonly string[]; readonly form: string } | undefined {
  const read = (names: readonly string[], form: string): { readonly names: readonly string[]; readonly form: string } | undefined => (names.length === 0 ? undefined : { names, form });
  if (ts.isPropertyAccessExpression(node)) return read([node.name.text], "member");
  if (ts.isElementAccessExpression(node)) return read(stringValues(node.argumentExpression), "element key");
  if (ts.isQualifiedName(node)) return read([node.right.text], "type member");
  if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) return read(keyTexts(node.propertyName ?? node.name), "destructuring");
  if ((ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node)) && ts.isObjectLiteralExpression(node.parent) && inAssignmentTarget(node)) return read(keyTexts(node.name), "destructuring assignment");
  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) return read([(node.propertyName ?? node.name).text], "import");
  return undefined;
}
/** Whether an identifier is the name position of its parent's member read (memberRead reads it there). */
function isMemberName(node: ts.Identifier | ts.PrivateIdentifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  if (ts.isQualifiedName(parent)) return parent.right === node;
  if (ts.isBindingElement(parent)) return parent.name === node || parent.propertyName === node;
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) return true;
  if (ts.isShorthandPropertyAssignment(parent) || ts.isPropertyAssignment(parent)) return parent.name === node;
  return false;
}
/** Whether a string literal is a member key (an element-access key, or a property, binding, computed or import key). */
function isKeyLiteral(node: ts.Node): boolean {
  const parent = node.parent;
  if (parent === undefined) return false;
  if (ts.isElementAccessExpression(parent)) return parent.argumentExpression === node;
  if (ts.isComputedPropertyName(parent) || ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) return true;
  if (ts.isBindingElement(parent)) return parent.propertyName === node;
  if (ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent)) return parent.name === node;
  return false;
}
/** Whether a literal sits where a process-spawning call reads a command: an argument, or an element of an argv array given to it. */
function inSpawnPosition(node: ts.Node): boolean {
  const link: ts.Node = ts.isArrayLiteralExpression(node.parent) ? node.parent : node;
  const call = link.parent;
  if (call === undefined || !ts.isCallExpression(call) || !call.arguments.some(argument => argument === link)) return false;
  const callee = call.expression;
  const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "";
  return SPAWNER_SET.has(name);
}
/** The words after a wrapper, past its flags, its options with their arguments and its positionals: the rest from the command head on, or the command an option of its command table carries. */
function pastWrapper(words: readonly string[], wrapper: WrapperRule): { readonly rest: readonly string[]; readonly command: string | undefined } {
  let index = 0;
  let positionals = wrapper.positionals;
  let options = true;
  while (index < words.length) {
    const word = words[index] ?? "";
    if (options && word === "--") {
      options = false;
      index += 1;
    } else if (options && wrapper.commands.includes(word)) {
      return { rest: [], command: words.slice(index + 1).join(" ") };
    } else if (options && word.length > 1 && word.startsWith("-")) {
      index += wrapper.arguments.includes(word) ? 2 : 1;
    } else if (positionals > 0) {
      positionals -= 1;
      index += 1;
    } else {
      break;
    }
  }
  return { rest: words.slice(index), command: undefined };
}
/** Where a word splits into the fragments the fail-closed wrapped read checks: an attached option argument (-S'ps or --command=ps) is its own fragment. */
const ATTACHED_SPLIT = /['"=]/;
/** Every fragment of the words past a WRAPPERS wrapper or a SHELLS shell (each word split at ATTACHED_SPLIT), by basename - the fail-closed read of a wrapped command (refusal #3 U2). */
function wrappedWords(words: readonly string[]): string[] {
  return words
    .flatMap(word => word.split(ATTACHED_SPLIT))
    .filter(fragment => fragment.length > 0)
    .map(fragment => fragment.slice(fragment.lastIndexOf("/") + 1));
}
/**
 * The head (by basename) of every command a text spells: split at COMMAND_SEPARATOR, past VAR=value words, SHELL_KEYWORDS and
 * WRAPPERS (pastWrapper), into a shell's command flag - and, fail-closed, every fragment of every word past a WRAPPERS wrapper or a
 * SHELLS shell in head position (wrappedWords), so a flag form outside a wrapper's option table (su's or env's lone "-"), or "--"
 * after a shell's command flag, never hides the command after it.
 */
function commandHeads(text: string): string[] {
  const heads: string[] = [];
  for (const command of text.split(COMMAND_SEPARATOR)) {
    let words: readonly string[] = command
      .trim()
      .split(/\s+/)
      .map(word => word.replace(/^['"]+|['"]+$/g, ""))
      .filter(word => word.length > 0);
    while (words.length > 0) {
      const [first = "", ...rest] = words;
      const base = first.slice(first.lastIndexOf("/") + 1);
      if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(first) || SHELL_KEYWORD_SET.has(first)) {
        words = rest;
        continue;
      }
      const wrapper = WRAPPERS.get(base);
      if (wrapper !== undefined || SHELL_SET.has(base)) heads.push(...wrappedWords(rest));
      if (wrapper !== undefined) {
        const after = pastWrapper(rest, wrapper);
        if (after.command !== undefined) {
          heads.push(...commandHeads(after.command));
          break;
        }
        words = after.rest;
        continue;
      }
      if (SHELL_SET.has(base)) {
        const flag = rest.findIndex(word => SHELL_COMMAND_FLAG.test(word));
        if (flag >= 0) heads.push(...commandHeads(rest.slice(flag + 1).join(" ")));
        break;
      }
      heads.push(base);
      break;
    }
  }
  return heads;
}
/** F1 a kill member read; F2 a pid member read; F3 a process-table probe; F4 ESRCH - every form the C7 header lists. */
function falsifierShapes(source: ts.SourceFile): ShapeHit[] {
  return descendants(source).flatMap((node): ShapeHit[] => {
    const hit = (shape: Shape, form: string): ShapeHit[] => [{ shape, line: lineOf(source, node), form }];
    const member = memberRead(node);
    if (member !== undefined) {
      const shape = member.names.map(name => MEMBER_SHAPES.get(name) ?? (ESRCH_WORD.test(identifierWords(name)) ? "F4" : undefined)).find(found => found !== undefined);
      return shape === undefined ? [] : hit(shape, member.form);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "kill") return hit("F1", "bare call");
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && ESRCH_WORD.test(identifierWords(node.text)) && !(isMemberName(node) && memberRead(node.parent) !== undefined)) return hit("F4", "identifier");
    if (ts.isRegularExpressionLiteral(node)) {
      const text = regexText(node.text);
      if (ESRCH_WORD.test(text)) return hit("F4", "regular expression");
      return PROC_PATH.test(text) ? hit("F3", "/proc path") : [];
    }
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (isKeyLiteral(node)) {
        if (ESRCH_WORD.test(identifierWords(node.text)) && memberRead(node.parent) === undefined) return hit("F4", "key");
        return PROC_PATH.test(node.text) ? hit("F3", "/proc path") : [];
      }
      const text = node.text;
      if (ESRCH_WORD.test(text)) return hit("F4", "literal");
      if (PROC_PATH.test(text)) return hit("F3", "/proc path");
      const word = text.trim();
      if (word === "kill" && !inSpawnPosition(node)) return hit("F1", "kill name literal");
      if (word === "pid") return hit("F2", "pid name literal");
      if (commandHeads(text).some(head => PROCESS_TABLE_SET.has(head))) return hit("F3", "process-table command");
    }
    return [];
  });
}
const shapeForms = (hits: readonly ShapeHit[]): string[] => hits.map(hit => `${hit.shape}:${hit.form}`).sort();

// ---- HX drivers -------------------------------------------------------------------------------------------------------

/** The files C7 never judges, each with its reason. */
const EXCLUDED = [SELF] as const;
const MODULE_NEEDLES = ["providers/hyperunix", "hyperunix-observer"] as const;
const CAPABILITY_ID = "hyperunix.find";
const OVERRIDE = "HYPERUNIX_HX";
const MODULE_PATTERNS: readonly RegExp[] = MODULE_NEEDLES.map(needle => new RegExp(`/${needle.replace(/[./-]/g, match => `\\${match}`)}(?:\\.[cm]?[jt]s)?$`));
/** A path into the installed SDK package (refusal #3 F5: ../node_modules/@hyperunix/sdk/dist/index.js is the file the package's "." export resolves to). */
const SDK_PATH = new RegExp(`(?:^|/)node_modules/${SDK_MODULE.replace(/[./-]/g, match => `\\${match}`)}(?:/|$)`);
/** A specifier as a resolver may read it: every %HH escape decoded and the path normalized (posix), so providers/./hyperunix and hyper%75nix name the provider. */
function normalizedSpecifier(specifier: string): string {
  const decoded = specifier.replace(/%([0-9A-Fa-f]{2})/g, (_whole: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
  return decoded.length === 0 ? decoded : posix.normalize(decoded);
}
/** An HX module: the SDK package or a subpath of it, a path into node_modules/@hyperunix/sdk, or a path ending providers/hyperunix or hyperunix-observer - read after normalizedSpecifier. */
const HX_MODULE = (specifier: string): boolean => {
  const path = normalizedSpecifier(specifier);
  return path === SDK_MODULE || path.startsWith(`${SDK_MODULE}/`) || SDK_PATH.test(path) || MODULE_PATTERNS.some(pattern => pattern.test(path));
};
/** The calls that load a module (beside a dynamic import and a created require, whose callee is itself a call), read through calleeName. */
const LOADERS: ReadonlySet<string> = new Set(["require", "module.require", "vi.importActual", "vi.importMock"]);
/** The calls that read or set an environment variable named by an argument, and the methods that test for one. */
const ENV_CALLS: ReadonlySet<string> = new Set([
  "vi.stubEnv",
  "Reflect.get",
  "Reflect.set",
  "Reflect.has",
  "Reflect.deleteProperty",
  "Reflect.defineProperty",
  "Reflect.getOwnPropertyDescriptor",
  "Object.defineProperty",
  "Object.getOwnPropertyDescriptor",
  "Object.hasOwn",
]);
const ENV_METHODS: ReadonlySet<string> = new Set(["hasOwnProperty", "propertyIsEnumerable"]);
/** The classifier's own tokens: every one holds DRIVER_NEEDLE (the frozen shape checks it), so every driving form's text does. */
const DRIVER_TOKENS: readonly string[] = [SDK_MODULE, ...MODULE_NEEDLES, CAPABILITY_ID, OVERRIDE];
/** Text every HX driver carries, in any case: a source is parsed only when its text, raw or unescaped, holds it (passesPrefilter). */
const DRIVER_NEEDLE = /hyperunix/i;
const DRIVER_REASONS = ["import", "invoke", "override"] as const;
function isLoaderCall(call: ts.CallExpression): boolean {
  return call.expression.kind === ts.SyntaxKind.ImportKeyword || calleeChains(call.expression).some(name => LOADERS.has(name)) || ts.isCallExpression(call.expression);
}
/** An import or export declaration erased at compile time: import type / export type, or named bindings every one of which is marked type (no default or namespace binding). */
function isTypeOnlyDeclaration(node: ts.ImportDeclaration | ts.ExportDeclaration): boolean {
  if (ts.isExportDeclaration(node)) {
    const clause = node.exportClause;
    return node.isTypeOnly || (clause !== undefined && ts.isNamedExports(clause) && clause.elements.length > 0 && clause.elements.every(element => element.isTypeOnly));
  }
  const clause = node.importClause;
  if (clause === undefined) return false;
  if (clause.isTypeOnly) return true;
  const named = clause.namedBindings;
  return clause.name === undefined && named !== undefined && ts.isNamedImports(named) && named.elements.length > 0 && named.elements.every(element => element.isTypeOnly);
}
/** How a source drives HX (DRIVER_REASONS): it imports or loads an HX module, invokes hyperunix.find, or reads or sets the HYPERUNIX_HX override. */
function hxDrivers(source: ts.SourceFile): string[] {
  const reasons = new Set<string>();
  for (const node of descendants(source)) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) && HX_MODULE(node.moduleSpecifier.text) && !isTypeOnlyDeclaration(node)) {
      reasons.add("import");
    }
    if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && stringValues(node.moduleReference.expression).some(HX_MODULE)) reasons.add("import");
    if (ts.isCallExpression(node)) {
      const firsts = stringValues(node.arguments[0]);
      const callees = calleeChains(node.expression);
      if (firsts.some(HX_MODULE) && isLoaderCall(node)) reasons.add("import");
      if (firsts.includes(CAPABILITY_ID) && callees.some(callee => callee.endsWith(".invoke"))) reasons.add("invoke");
      const envCall = callees.some(callee => ENV_CALLS.has(callee) || ENV_METHODS.has(callee.slice(callee.lastIndexOf(".") + 1)));
      if (envCall && node.arguments.some(argument => stringValues(argument).includes(OVERRIDE))) reasons.add("override");
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.InKeyword && stringValues(node.left).includes(OVERRIDE)) reasons.add("override");
    const member = memberRead(node);
    if (member?.names.includes(OVERRIDE) && member.form !== "import") reasons.add("override");
    if (ts.isObjectLiteralExpression(node) && node.properties.some(property => !ts.isSpreadAssignment(property) && keyTexts(property.name).includes(OVERRIDE))) reasons.add("override");
  }
  return [...reasons].sort();
}
/**
 * A source's text with its JavaScript string escapes decoded (\xHH, \uHHHH, \u{H...}, a legacy octal escape, a line continuation,
 * and any other escaped character read as itself) and every %HH escape decoded, so an escaped or percent-encoded spelling of
 * DRIVER_NEEDLE still reads (refusal #3 U4: the classifier decodes a specifier's escapes, so the prefilter does too).
 */
function unescaped(text: string): string {
  const controls: Readonly<Record<string, string>> = { b: "\b", f: "\f", n: "\n", r: "\r", t: "\t", v: "\v" };
  const decoded = text.replace(
    /\\(?:x([0-9A-Fa-f]{2})|u\{([0-9A-Fa-f]{1,6})\}|u([0-9A-Fa-f]{4})|([0-7]{1,3})|(\r\n|[\n\r\u2028\u2029])|([\s\S]))/g,
    (_whole: string, hex: string | undefined, braced: string | undefined, unicode: string | undefined, octal: string | undefined, continuation: string | undefined, other: string | undefined) => {
      const digits = hex ?? braced ?? unicode;
      if (digits !== undefined) return codePoint(Number.parseInt(digits, 16));
      if (octal !== undefined) return String.fromCharCode(Number.parseInt(octal, 8));
      if (continuation !== undefined) return "";
      return controls[other ?? ""] ?? other ?? "";
    },
  );
  return decoded.replace(/%([0-9A-Fa-f]{2})/g, (_whole: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
}
/** Whether C7 parses a source: its text, raw or unescaped, holds DRIVER_NEEDLE. */
const passesPrefilter = (text: string): boolean => DRIVER_NEEDLE.test(text) || DRIVER_NEEDLE.test(unescaped(text));
/** Every .ts / .mts / .cts / .js / .mjs / .cjs source under a repository directory, node_modules skipped, sorted. */
function sourcesUnder(directory: string): string[] {
  const out: string[] = [];
  const walk = (relativeDirectory: string): void => {
    for (const name of readdirSync(join(ROOT, relativeDirectory)).sort()) {
      if (name === "node_modules") continue;
      const path = `${relativeDirectory}/${name}`;
      if (statSync(join(ROOT, path)).isDirectory()) walk(path);
      else if (/\.[cm]?[jt]s$/.test(name)) out.push(path);
    }
  };
  walk(directory);
  return out;
}
function docsUnder(directory: string): string[] {
  const out: string[] = [];
  const walk = (relativeDirectory: string): void => {
    for (const name of readdirSync(join(ROOT, relativeDirectory)).sort()) {
      const path = `${relativeDirectory}/${name}`;
      if (statSync(join(ROOT, path)).isDirectory()) walk(path);
      else if (name.endsWith(".md")) out.push(path);
    }
  };
  walk(directory);
  return out;
}
interface JudgedFile {
  readonly path: string;
  readonly drivers: readonly string[];
  readonly hits: readonly ShapeHit[];
}
let JUDGED: { readonly sources: readonly string[]; readonly judged: readonly JudgedFile[] } | undefined;
function judgedDrivers(): { readonly sources: readonly string[]; readonly judged: readonly JudgedFile[] } {
  if (JUDGED !== undefined) return JUDGED;
  const sources = [...sourcesUnder("test"), ...sourcesUnder("qa")];
  const excluded = new Set<string>(EXCLUDED);
  const judged = sources
    .filter(path => !excluded.has(path) && passesPrefilter(read(path)))
    .flatMap(path => {
      const source = parse(path);
      const drivers = hxDrivers(source);
      return drivers.length > 0 ? [{ path, drivers, hits: falsifierShapes(source) }] : [];
    });
  JUDGED = { sources, judged };
  return JUDGED;
}

// ---- the docs view ----------------------------------------------------------------------------------------------------

/** Named character references the view decodes (every numeric one is decoded too); a browser also decodes these five without ";". */
const DECODED_NAMES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", String.fromCodePoint(0xa0)],
]);
const LEGACY_NAMES = ["amp", "lt", "gt", "quot", "nbsp"] as const;
/** Elements whose content a browser's default stylesheet hides or shows as no text, or whose rendering the view does not model. */
const HIDING_ELEMENTS = [
  "area",
  "audio",
  "base",
  "basefont",
  "canvas",
  "datalist",
  "details",
  "dialog",
  "embed",
  "frame",
  "frameset",
  "head",
  "iframe",
  "link",
  "math",
  "meta",
  "meter",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "optgroup",
  "option",
  "param",
  "picture",
  "plaintext",
  "progress",
  "rp",
  "script",
  "select",
  "slot",
  "source",
  "style",
  "svg",
  "template",
  "textarea",
  "title",
  "track",
  "video",
  "xmp",
] as const;
const HIDING_SET: ReadonlySet<string> = new Set(HIDING_ELEMENTS);
/** Attributes that hide an element's content. */
const HIDING_ATTRIBUTES = ["hidden", "popover", "style"] as const;
const HIDING_ATTRIBUTE_SET: ReadonlySet<string> = new Set(HIDING_ATTRIBUTES);
/** Elements whose content a parser reads as raw text up to their end tag. */
const RAW_TEXT_ELEMENTS: ReadonlySet<string> = new Set(["script", "style", "textarea", "title", "xmp", "iframe", "noembed", "noframes", "noscript"]);
/** Elements that end a rendered unit (block-level boxes, and br). */
const BLOCK_ELEMENTS = [
  "address",
  "article",
  "aside",
  "blockquote",
  "br",
  "caption",
  "center",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "legend",
  "li",
  "listing",
  "main",
  "menu",
  "nav",
  "ol",
  "p",
  "pre",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
] as const;
const BLOCK_SET: ReadonlySet<string> = new Set(BLOCK_ELEMENTS);
const CLAUSE_BREAK = /;|\||—|(?<=[.!?])\s+(?=[A-Z`*("'])/u;

function codePoint(value: number): string {
  return Number.isSafeInteger(value) && value > 0 && value <= 0x10ffff && (value < 0xd800 || value > 0xdfff) ? String.fromCodePoint(value) : String.fromCodePoint(0xfffd);
}
/** The text a character reference at html[at] renders, and how many characters it spans. */
function reference(html: string, at: number): readonly [string, number] {
  const head = html.slice(at, at + 48);
  const numeric = /^&#(?:([0-9]+)|[xX]([0-9a-fA-F]+));?/.exec(head);
  if (numeric !== null) return [codePoint(numeric[1] !== undefined ? Number.parseInt(numeric[1], 10) : Number.parseInt(numeric[2] ?? "", 16)), numeric[0].length];
  const named = /^&([A-Za-z][A-Za-z0-9]*);/.exec(head);
  if (named !== null) return [DECODED_NAMES.get(named[1] ?? "") ?? named[0], named[0].length];
  const legacy = LEGACY_NAMES.find(name => head.startsWith(`&${name}`));
  return legacy === undefined ? ["&", 1] : [DECODED_NAMES.get(legacy) ?? "&", legacy.length + 1];
}
/** Where a comment opened at html[start] ("<!--") ends: <!--> and <!---> close at once, any other at "-->" or "--!>", or at the end. */
function commentEnd(html: string, start: number): number {
  const body = start + 4;
  if (html.startsWith(">", body)) return body + 1;
  if (html.startsWith("->", body)) return body + 2;
  const ends = [html.indexOf("-->", body), html.indexOf("--!>", body)].filter(at => at !== -1);
  if (ends.length === 0) return html.length;
  const at = Math.min(...ends);
  return at + (html.startsWith("-->", at) ? 3 : 4);
}
interface Tag {
  readonly name: string;
  readonly attributes: readonly string[];
  readonly end: number;
  readonly eof: boolean;
}
/** A tag whose name starts at html[at]: its lower-cased name, its attribute names (quoted values skipped whole) and its end. */
function readTag(html: string, at: number): Tag {
  let index = at;
  while (index < html.length && !/[\s/>]/.test(html.charAt(index))) index += 1;
  const name = html.slice(at, index).toLowerCase();
  const attributes: string[] = [];
  while (index < html.length) {
    const char = html.charAt(index);
    if (char === ">") return { name, attributes, end: index + 1, eof: false };
    if (/[\s/]/.test(char)) {
      index += 1;
      continue;
    }
    const start = index;
    index += 1;
    while (index < html.length && !/[\s/>=]/.test(html.charAt(index))) index += 1;
    attributes.push(html.slice(start, index).toLowerCase());
    while (index < html.length && /\s/.test(html.charAt(index))) index += 1;
    if (html.charAt(index) !== "=") continue;
    index += 1;
    while (index < html.length && /\s/.test(html.charAt(index))) index += 1;
    const quote = html.charAt(index);
    if (quote === '"' || quote === "'") {
      const close = html.indexOf(quote, index + 1);
      if (close === -1) return { name, attributes, end: html.length, eof: true };
      index = close + 1;
    } else {
      while (index < html.length && !/[\s>]/.test(html.charAt(index))) index += 1;
    }
  }
  return { name, attributes, end: html.length, eof: true };
}
/** What a browser shows of an HTML text, unit by unit, and every construct the view refuses to model. */
function readHtml(html: string): { readonly units: readonly string[]; readonly refusals: readonly string[] } {
  const units: string[] = [];
  const refusals: string[] = [];
  let current = "";
  const flush = (): void => {
    units.push(current);
    current = "";
  };
  let index = 0;
  while (index < html.length) {
    const char = html.charAt(index);
    if (char === "&") {
      const [text, length] = reference(html, index);
      current += text;
      index += length;
      continue;
    }
    if (char !== "<") {
      current += char;
      index += 1;
      continue;
    }
    const next = html.charAt(index + 1);
    if (html.startsWith("<!--", index)) {
      index = commentEnd(html, index);
      continue;
    }
    if (next === "!" || next === "?") {
      const close = html.indexOf(">", index + 2);
      index = close === -1 ? html.length : close + 1;
      continue;
    }
    if (next === "/") {
      const after = html.charAt(index + 2);
      if (/[A-Za-z]/.test(after)) {
        const tag = readTag(html, index + 2);
        if (BLOCK_SET.has(tag.name)) flush();
        index = tag.end;
        continue;
      }
      const close = html.indexOf(">", index + 2);
      index = close === -1 ? html.length : close + 1;
      continue;
    }
    if (/[A-Za-z]/.test(next)) {
      const tag = readTag(html, index + 1);
      if (tag.eof) {
        index = html.length;
        continue;
      }
      if (HIDING_SET.has(tag.name)) refusals.push(`<${tag.name}>`);
      for (const attribute of tag.attributes) if (HIDING_ATTRIBUTE_SET.has(attribute)) refusals.push(`<${tag.name} ${attribute}>`);
      if (BLOCK_SET.has(tag.name)) flush();
      index = tag.end;
      if (RAW_TEXT_ELEMENTS.has(tag.name)) {
        const close = html.toLowerCase().indexOf(`</${tag.name}`, index);
        index = close === -1 ? html.length : close;
      }
      continue;
    }
    current += "<";
    index += 1;
  }
  flush();
  return { units, refusals };
}
interface PageView {
  readonly clauses: readonly string[];
  readonly refusals: readonly string[];
}
/** A docs page as marked renders it and a browser shows it, clause by clause, with the constructs the view refuses. */
function pageView(markdown: string): PageView {
  const { units, refusals } = readHtml(marked.parser(marked.lexer(markdown)));
  const clauses = units
    .map(unit => visible(unit).replace(/\s+/g, " ").trim())
    .filter(unit => unit.length > 0)
    .flatMap(unit =>
      unit
        .split(CLAUSE_BREAK)
        .map(text => text.trim())
        .filter(text => text.length > 0),
    );
  return { clauses, refusals: [...new Set(refusals)] };
}
const isDocsHit = (clause: string): boolean => HX_SIDE.test(clause) && termsIn(clause).length > 0 && !clause.includes(UPSTREAM);
interface Clause {
  readonly file: string;
  readonly index: number;
  readonly text: string;
}
let DOCS_READING: { readonly files: readonly string[]; readonly clauses: readonly Clause[]; readonly refusals: readonly string[] } | undefined;
function docsReading(): { readonly files: readonly string[]; readonly clauses: readonly Clause[]; readonly refusals: readonly string[] } {
  if (DOCS_READING !== undefined) return DOCS_READING;
  const files = docsUnder(DOCS);
  const views = files.map(file => ({ file, view: pageView(read(file)) }));
  DOCS_READING = {
    files,
    clauses: views.flatMap(({ file, view }) => view.clauses.map((text, index) => ({ file, index, text }))),
    refusals: views.flatMap(({ file, view }) => view.refusals.map(refusal => `${file}: ${refusal}`)),
  };
  return DOCS_READING;
}

// ---- provider and SDK structure ---------------------------------------------------------------------------------------

function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  return descendants(source).find((node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === name);
}
function bindingsIn(scope: ts.Node): Map<string, ts.Expression> {
  const out = new Map<string, ts.Expression>();
  for (const node of descendants(scope)) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) out.set(node.name.text, node.initializer);
  }
  return out;
}
/** The lifecycle calls (client.<method>) nativeHyperUnixFind makes from its abort listener and awaits in its finally block. */
interface ProviderLifecycle {
  readonly listener: string | undefined;
  readonly onAbort: readonly string[];
  readonly inFinally: readonly string[];
  readonly removesListener: boolean;
}
function providerLifecycle(source: ts.SourceFile): ProviderLifecycle {
  const fn = functionNamed(source, "nativeHyperUnixFind");
  if (fn === undefined) return { listener: undefined, onAbort: [], inFinally: [], removesListener: false };
  const bindings = bindingsIn(fn);
  const added = callsIn(fn).find(call => calleeText(call).endsWith(".addEventListener") && stringArgument(call, 0) === "abort");
  const listenerArgument = added?.arguments[1];
  const listener = listenerArgument === undefined ? undefined : listenerArgument.getText();
  const listenerBody = listenerArgument === undefined ? undefined : ts.isIdentifier(listenerArgument) ? bindings.get(listenerArgument.text) : listenerArgument;
  const clientCalls = (scope: ts.Node | undefined): string[] =>
    scope === undefined ? [] : callsIn(scope).flatMap(call => (calleeText(call).startsWith("client.") ? [calleeText(call).slice("client.".length)] : []));
  const finallyBlocks = descendants(fn).flatMap(node => (ts.isTryStatement(node) && node.finallyBlock !== undefined ? [node.finallyBlock] : []));
  const awaited = finallyBlocks.flatMap(block =>
    descendants(block).flatMap(node => (ts.isAwaitExpression(node) && ts.isCallExpression(node.expression) && calleeText(node.expression).startsWith("client.") ? [calleeText(node.expression).slice("client.".length)] : [])),
  );
  const removesListener = finallyBlocks.some(block =>
    callsIn(block).some(call => calleeText(call).endsWith(".removeEventListener") && stringArgument(call, 0) === "abort" && call.arguments[1]?.getText() === listener),
  );
  return { listener, onAbort: clientCalls(listenerBody), inFinally: awaited, removesListener };
}
const CHILD_PROCESS = /^(?:node:)?child_process$/;
/** Every string or template literal naming the child_process module (an import, export, dynamic import, require or created require of it). */
function childProcessNames(source: ts.SourceFile): string[] {
  return descendants(source).flatMap(node =>
    (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && CHILD_PROCESS.test(node.text) ? [node.text] : [],
  );
}
const SIGNAL_NAME = /^SIG[A-Z][A-Z0-9]+$/;
/** Every signal name spelled as a string literal or an identifier (a signals constant's member counts). */
function signalNames(source: ts.SourceFile): string[] {
  return descendants(source).flatMap(node => ((ts.isStringLiteralLike(node) || ts.isIdentifier(node)) && SIGNAL_NAME.test(node.text) ? [node.text] : []));
}
function isKillCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return (ts.isIdentifier(callee) && callee.text === "kill") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "kill");
}
/** The signal literals passed to kill calls, and the names those calls go through. */
function killedWith(source: ts.SourceFile): { readonly signals: string[]; readonly names: string[] } {
  const kills = callsIn(source).filter(isKillCall);
  const signals = [...new Set(kills.flatMap(call => call.arguments.flatMap(argument => (ts.isStringLiteralLike(argument) ? [argument.text] : []))))].sort();
  const names = [...new Set(kills.map(call => (ts.isPropertyAccessExpression(call.expression) ? call.expression.name.text : call.expression.getText())))].sort();
  return { signals, names };
}
/** process.kill(-<x>.pid, ...): a kill of the owned process group. */
function groupKills(scope: ts.Node): ts.CallExpression[] {
  return callsIn(scope).filter(call => {
    const [target] = call.arguments;
    return (
      calleeText(call) === "process.kill" &&
      target !== undefined &&
      ts.isPrefixUnaryExpression(target) &&
      target.operator === ts.SyntaxKind.MinusToken &&
      ts.isPropertyAccessExpression(target.operand) &&
      target.operand.name.text === "pid"
    );
  });
}
function enclosingFunction(node: ts.Node): ts.FunctionDeclaration | undefined {
  let link: ts.Node | undefined = node.parent;
  while (link !== undefined && !ts.isFunctionDeclaration(link)) link = link.parent;
  return link;
}
function leadingDoc(source: ts.SourceFile, node: ts.Node): string | undefined {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  const docs = ranges.map(range => source.text.slice(range.pos, range.end)).filter(text => text.startsWith("/**"));
  return docs[docs.length - 1];
}
type FunctionLike = ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration;
const isFunctionLike = (node: ts.Node): node is FunctionLike => ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node);
function nearestFunction(node: ts.Node): FunctionLike | undefined {
  let link: ts.Node | undefined = node.parent;
  while (link !== undefined && !isFunctionLike(link)) link = link.parent;
  return link;
}
function bare(node: ts.Node): ts.Node {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node) ? bare(node.expression) : node;
}
/** The local targets a function declares: const NAME = <expression> (a function, an alias or a bind), and nested function declarations. */
function localTargets(owner: ts.Node): Map<string, ts.Node> {
  const out = new Map<string, ts.Node>();
  for (const node of descendants(owner)) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) out.set(node.name.text, node.initializer);
    if (ts.isFunctionDeclaration(node) && node !== owner && node.name !== undefined) out.set(node.name.text, node);
  }
  return out;
}
/** The local function a node names: a function itself, an identifier bound to one (through aliases), or call / apply / bind of one. */
function resolveFunction(node: ts.Node, targets: ReadonlyMap<string, ts.Node>, seen: ReadonlySet<string> = new Set()): FunctionLike | undefined {
  const inner = bare(node);
  if (isFunctionLike(inner)) return inner;
  if (ts.isIdentifier(inner)) {
    const target = seen.has(inner.text) ? undefined : targets.get(inner.text);
    return target === undefined ? undefined : resolveFunction(target, targets, new Set([...seen, inner.text]));
  }
  if (ts.isPropertyAccessExpression(inner) && ["call", "apply", "bind"].includes(inner.name.text)) return resolveFunction(inner.expression, targets, seen);
  if (ts.isCallExpression(inner) && ts.isPropertyAccessExpression(inner.expression) && inner.expression.name.text === "bind") return resolveFunction(inner.expression.expression, targets, seen);
  return undefined;
}
/** Every local function reachable from a start through the calls each makes. */
function reachable(start: FunctionLike, targets: ReadonlyMap<string, ts.Node>): Set<FunctionLike> {
  const out = new Set<FunctionLike>([start]);
  const queue: FunctionLike[] = [start];
  for (let current = queue.shift(); current !== undefined; current = queue.shift()) {
    for (const call of callsIn(current)) {
      const target = resolveFunction(call.expression, targets);
      if (target !== undefined && !out.has(target)) {
        out.add(target);
        queue.push(target);
      }
    }
  }
  return out;
}
/** For each SDK function that kills the owned process group: whether its abort listener reaches that group kill. */
function abortReading(source: ts.SourceFile): { readonly owner: string; readonly listeners: number; readonly reached: boolean }[] {
  const owners = [...new Set(groupKills(source).map(enclosingFunction))].filter((owner): owner is ts.FunctionDeclaration => owner !== undefined);
  return owners.map(owner => {
    const targets = localTargets(owner);
    const listeners = callsIn(owner)
      .filter(call => calleeText(call).endsWith(".addEventListener") && stringArgument(call, 0) === "abort")
      .flatMap(call => {
        const argument = call.arguments[1];
        const target = argument === undefined ? undefined : resolveFunction(argument, targets);
        return target === undefined ? [] : [target];
      });
    const reached = new Set(listeners.flatMap(listener => [...reachable(listener, targets)]));
    const hit = groupKills(owner).some(call => {
      const nearest = nearestFunction(call);
      return nearest !== undefined && reached.has(nearest);
    });
    return { owner: owner.name?.text ?? "<anonymous>", listeners: listeners.length, reached: hit };
  });
}

// ---- residuals --------------------------------------------------------------------------------------------------------

interface Residual {
  readonly id: string;
  readonly rows: string;
  readonly family: string;
}
const RESIDUALS: readonly Residual[] = [
  { id: "R-WORDING", rows: "C4 C8", family: "a termination claim worded outside the vocabulary, or split across a literal concatenation or a template substitution, reads quiet" },
  {
    id: "R-UNANCHORED",
    rows: "frozen shape",
    family: "a coordinated hollow of a vocabulary term no outside anchor holds, or of an instrument or calibration table member whose own literals are its only anchor, stays green",
  },
  {
    id: "R-SHAPELESS",
    rows: "C7",
    family: "a falsifier written without the four shapes (a timing deadline, a poll of an SDK counter, a ChildProcess state read, a process package called under another name) reads quiet",
  },
  {
    id: "R-COMPOSED",
    rows: "C4 C5 C7",
    family:
      "a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet, and so does a vocabulary term spelled through a class inside a regular expression in the suite",
  },
  { id: "R-ERRNO", rows: "C7", family: "ESRCH by its errno number reads quiet" },
  { id: "R-UNDRIVEN", rows: "C7", family: "a falsifier in a test or qa file that imports HX modules only by type or not at all, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged" },
  { id: "R-ARGUMENTS", rows: "C1 C2", family: "C1 freezes each assertion's subject and chain, not its arguments, so a vacuous argument reads quiet" },
  {
    id: "R-RUNTIME",
    rows: "C1 C2 C3",
    family: "an exit before an assertion reads quiet in the static rows: before a case's first assertion the run pin sees it, and between two assertions no row does (judge() needs one assertion reached)",
  },
  { id: "R-DEAD-PATH", rows: "C5 C6", family: "a dispose, close or group kill reached syntactically behind a dead branch or an early return reads made" },
  { id: "R-CLAUSE", rows: "C8", family: "a claim whose HX side and term fall in different clauses reads quiet" },
  { id: "R-CITATION", rows: "C8", family: "a clause naming HXGC-OPS-002 is trusted (the on-landing census judges the citation)" },
  {
    id: "R-REFERENCE",
    rows: "C8",
    family: "a named character reference beyond the six reads as written (none spells a vocabulary letter, but a space or format reference such as &ensp; or &shy; can split a term)",
  },
  { id: "R-LOOKALIKE", rows: "C4 C8", family: "a look-alike letter from another script reads as itself" },
  { id: "R-ATTRIBUTE", rows: "C8", family: "attribute text a browser can show (a link title, an image alt) is not read" },
  { id: "R-SCOPE", rows: "C8", family: "a page outside docs/workbench is not read" },
  { id: "R-DETACHED-COMMENT", rows: "C4", family: "a comment outside the suite's statement that names no HX side reads quiet" },
  {
    id: "R-WRAPPER",
    rows: "C7",
    family: "a process-table tool run through a word outside WRAPPERS, SHELL_KEYWORDS and SHELLS, by a script file a shell runs, or inside another language's inline program reads quiet",
  },
  {
    id: "R-INDIRECT",
    rows: "C2 C7",
    family:
      "a module specifier, override name, capability id or member name reached through anything but a literal or a const binding chain to one (a let binding, an object member, a parameter, an imported binding), a loader, invoke or environment call reached through call, apply or Reflect.apply, or a module named through a configured alias (package imports, a vitest alias) reads quiet",
  },
  { id: "R-DATA-OVERRIDE", rows: "C7", family: "the HYPERUNIX_HX name passed only as data (an array or entries element, an argument of a call outside ENV_CALLS and ENV_METHODS) classes nothing" },
  { id: "R-DEFINITION", rows: "C7", family: "a kill or pid named only as a defined key (an object-literal property, a method, a class or type member) is no read and reads quiet" },
  { id: "R-ELSEWHERE", rows: "C2", family: "a stub or module mock installed outside the lifecycle file (a setup file, the vitest config, a module the file imports) is not read" },
  { id: "R-HELPER-REGISTRATION", rows: "C1", family: "a case registered through a function called from the suite is outside C1's static reading (the run pin's exact-collection row reads the report)" },
  { id: "R-GROUP-FORM", rows: "C6", family: "a group kill spelled other than process.kill(-<x>.pid, ...) is not read" },
  {
    id: "R-BIDI",
    rows: "C8",
    family:
      "text a browser lays out right to left (a bdo element, a dir attribute, or a run of bidi controls, which the view drops as Default_Ignorable) is read in its logical order, so a claim stored reversed reads quiet",
  },
];
const residualTitle = (residual: Residual): string => `${residual.id} (${residual.rows}): ${residual.family}`;
function residualNamed(id: string): Residual {
  const found = RESIDUALS.find(residual => residual.id === id);
  if (found === undefined) throw new Error(`no residual ${id}`);
  return found;
}
/** The residual rows that ran to their end (the records row requires every one). */
const RAN = new Set<string>();
const HX_HEAD = `import { HyperUnix } from "${SDK_MODULE}";\nexport const sdk = HyperUnix;\n`;
/** The head refusal #2's command members carry after HX_HEAD (gate-prep-22's plant file). */
const EXEC_HEAD = 'import { execSync } from "node:child_process";\n';

// ---- planted members --------------------------------------------------------------------------------------------------

const K2_ANCHOR = 'const result = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");';
const K2_HEAD = 'it("preserves incomplete native coverage instead of inventing absence", async () => {';
const K3_REJECTS = 'pending.resolve({version:"0.1.0",binarySha256:"abc"});\n    await expect(result).rejects.toMatchObject({ category: "transport" });';
const HX_DESCRIBE = 'describe("HyperUnix SDK custody", () => {';
const VITEST_IMPORT = 'import { afterEach, describe, expect, it, vi } from "vitest";';
const K2_STUB = 'vi.spyOn<RootPathOpen, "open">(HyperUnix, "open").mockReturnValue({client,find:client.find} as unknown as Workspace);\n    const result = await';
const K1_REGISTRY = "const registry = new CapabilityRegistry();\n    registerNativeHyperUnixFind(registry, process.cwd());";
const ABORT_RUN = 'const abort = () => stop(new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED"));';
const ABORT_STREAM = "const abort = () => { cancelled = true; stop(); };";
const ON_ABORT = "const onAbort=()=>client.dispose();";
/** K2's stand-in client line (the anchor refusal #3's U3 members were planted at, gate-prep-13's specs) and K1's second assertion (an F2-class early exit goes after it: the custody pins after it never run). */
const K2_CLIENT =
  'const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: "0.1.0", binarySha256: "abc" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };';
const K1_UNCALLED = "expect(open).not.toHaveBeenCalled();";
/** The provider result refusal #3's U3 members forge inside K2, verbatim. */
const FORGED = '(() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: "incomplete" } } })) as typeof JSON.parse';
/** A lifecycle copy forging JSON.parse after K2's client line and restoring it after the provider call (the gate's second placement: no calibration anchor touched). */
const forgedInK2 = (text: string, forge: string, restore: string): string =>
  plantedText(plantedText(text, K2_CLIENT, `${K2_CLIENT}\n    const realParse = JSON.parse;\n    ${forge}`), K2_ANCHOR, `${K2_ANCHOR}\n    ${restore}`);

interface FalsifierPlant {
  readonly id: string;
  readonly code: string;
  readonly shapes: readonly string[];
}
/** Each planted after HX_HEAD in its own source; shapes are the expected shape:form list. U1 (a)-(f) are refusal #1's members. */
const FALSIFIER_PLANTS: readonly FalsifierPlant[] = [
  {
    id: "U1(a) childGone",
    code: 'export function childGone(child: { pid?: number }): boolean { const { pid } = child; return pid !== undefined && !existsSync(join("/proc", String(pid))); }',
    shapes: ["F2:destructuring", "F3:/proc path"],
  },
  { id: "U1(b) destructured pid", code: "export function idOf(child: { pid?: number }) { const { pid } = child; return pid; }", shapes: ["F2:destructuring"] },
  { id: "U1(c) joined /proc", code: 'export const gone = (id: number) => !existsSync(join("/proc", String(id)));', shapes: ["F3:/proc path"] },
  { id: "U1(d) kill.call", code: "export const probe = (id: number) => process.kill.call(process, id, 0);", shapes: ["F1:member"] },
  { id: "U1(e) absolute ps", code: 'export const probe = (id: number) => spawnSync("/bin/ps", ["-p", String(id)]);', shapes: ["F3:process-table command"] },
  { id: "U1(f) ESRCH regular expression", code: "export const NO_SUCH_PROCESS = /ESRCH/;", shapes: ["F4:regular expression"] },
  { id: "case-folded ESRCH regular expression", code: "export const NO_SUCH_PROCESS = /esrch/i;", shapes: ["F4:regular expression"] },
  { id: "destructuring assignment", code: "let pid = 0;\nexport function take(child: { pid: number }) { ({ pid } = child); return pid; }", shapes: ["F2:destructuring assignment"] },
  { id: "destructured kill", code: "const { kill } = process;\nexport const probe = (id: number) => kill(id, 0);", shapes: ["F1:bare call", "F1:destructuring"] },
  { id: "optional element kill", code: 'export const probe = (id: number) => process?.["kill"]?.(id, 0);', shapes: ["F1:element key"] },
  { id: "Reflect.apply", code: "export const probe = (id: number) => Reflect.apply(process.kill, process, [id, 0]);", shapes: ["F1:member"] },
  { id: "Reflect.get name", code: 'export const probe = (id: number) => Reflect.get(process, "kill")(id, 0);', shapes: ["F1:kill name literal"] },
  { id: "template kill command", code: "export const probe = (id: number) => execSync(`kill -0 $" + "{id}`);", shapes: ["F3:process-table command"] },
  { id: "shell-wrapped ps", code: `export const probe = () => execSync("sh -c 'ps -p 1'");`, shapes: ["F3:process-table command"] },
  { id: "errno member", code: "export const code = constants.errno.ESRCH;", shapes: ["F4:member"] },
  { id: "ESRCH string", code: 'export const NO_SUCH = new RegExp("ESRCH");', shapes: ["F4:literal"] },
  { id: "readdir /proc", code: 'export const table = () => readdirSync("/proc");', shapes: ["F3:/proc path"] },
  { id: "template /proc", code: "export const stat = (id: number) => readFileSync(`/proc/$" + "{id}/stat`);", shapes: ["F3:/proc path"] },
  { id: "prototype member names", code: "export const names = String(1).toString() + ({}).constructor.name + Object.prototype.hasOwnProperty.name;", shapes: [] },
  { id: "r2 U1(a) timeout option argument", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("timeout -s TERM 5 ps -p 1");`, shapes: ["F3:process-table command"] },
  { id: "r2 U1(b) sudo option argument", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("sudo -u root ps -p 1");`, shapes: ["F3:process-table command"] },
  { id: "r2 U1(c) env option argument", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("env -u HOME ps -p 1");`, shapes: ["F3:process-table command"] },
  { id: "r2 U1(d) shell flags before -c", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("bash -o pipefail -c 'ps -p 1 | grep -q hx'");`, shapes: ["F3:process-table command"] },
  { id: "r2 U1(e) shell flag before -c", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("sh -e -c 'ps -p 1'");`, shapes: ["F3:process-table command"] },
  { id: "r2 U5 ESRCH identifier key", code: "export const gone = (code: string): boolean => ({ ESRCH: true } as Record<string, boolean>)[code] === true;", shapes: ["F4:identifier"] },
  { id: "r2 U5 ESRCH string key", code: 'export const gone = (code: string): boolean => ({ "ESRCH": true } as Record<string, boolean>)[code] === true;', shapes: ["F4:key"] },
  { id: "attached long option", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("timeout --signal=TERM 5 pgrep hx");`, shapes: ["F3:process-table command"] },
  { id: "keyword head", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("if kill -0 1; then echo up; fi");`, shapes: ["F3:process-table command"] },
  { id: "brace group", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("{ ps -p 1; }");`, shapes: ["F3:process-table command"] },
  { id: "command option of a wrapper", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("su -c 'lsof -p 1' root");`, shapes: ["F3:process-table command"] },
  { id: "split-string option", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("env -S 'pidof hx'");`, shapes: ["F3:process-table command"] },
  { id: "const-bound kill key", code: 'const KILL = "kill";\nexport const probe = (id: number) => process[KILL](id, 0);', shapes: ["F1:element key", "F1:kill name literal"] },
  { id: "type member", code: "export type Probe = typeof process.kill;", shapes: ["F1:type member"] },
  { id: "ESRCH word in an identifier", code: "export const isEsrchError = (code: string) => code.length > 0;", shapes: ["F4:identifier"] },
  { id: "escaped ESRCH regular expression", code: "export const NO_SUCH_PROCESS = /E\\x53RCH/;", shapes: ["F4:regular expression"] },
  { id: "/proc element key", code: 'export const stat = (table: Record<string, string>) => table["/proc/1/status"];', shapes: ["F3:/proc path"] },
  { id: "ESRCH words in a string key", code: 'export const codes = { "isEsrch": true };', shapes: ["F4:key"] },
  { id: "r3 U2(a) su lone dash", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("su - root -c 'ps -p 1'");`, shapes: ["F3:process-table command"] },
  { id: "r3 U2(b) env lone dash", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("env - ps -p 1");`, shapes: ["F3:process-table command"] },
  { id: "r3 U2(c) options end after the shell command flag", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("sh -c -- 'ps -p 1'");`, shapes: ["F3:process-table command"] },
  { id: "attached split-string argument", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("env -S'pidof hx'");`, shapes: ["F3:process-table command"] },
  { id: "attached command option", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("su -c'lsof -p 1' root");`, shapes: ["F3:process-table command"] },
  { id: "option argument outside the table", code: `${EXEC_HEAD}export const probe = (): Buffer => execSync("sudo -a passwd ps -p 1");`, shapes: ["F3:process-table command"] },
  {
    id: "r3 const-shadowed kill key",
    code: 'export function probe(child: { kill(): void }): void {\n  const KEY = "kill";\n  child[KEY]();\n}\nexport function label(): string {\n  const KEY = "label";\n  return KEY;\n}',
    shapes: ["F1:element key", "F1:kill name literal"],
  },
  {
    id: "control",
    code: ['child.kill("SIGTERM");', "process.kill(child.pid, 0);", 'readFileSync("/proc/" + pid + "/status");', 'spawnSync("pgrep", ["hx"]);', 'execSync("ps -p 1");', 'if (error.code === "ESRCH") {}'].join("\n"),
    shapes: ["F1:member", "F1:member", "F2:member", "F3:/proc path", "F3:process-table command", "F3:process-table command", "F4:literal"],
  },
];
interface DriverPlant {
  readonly id: string;
  readonly code: string;
  readonly reasons: readonly string[];
}
const DRIVER_PLANTS: readonly DriverPlant[] = [
  { id: "static import", code: `import { HyperUnix } from "${SDK_MODULE}";`, reasons: ["import"] },
  { id: "type-only import", code: `import type { QueryResult } from "${SDK_MODULE}";`, reasons: [] },
  { id: "inline type-only import", code: `import { type QueryResult } from "${SDK_MODULE}";`, reasons: [] },
  { id: "type-only export", code: `export type { QueryResult } from "${SDK_MODULE}";`, reasons: [] },
  {
    id: "r2 F1 type-only import with an RF reap",
    code: `import type { HyperUnixReader } from "${PROVIDER_MODULE}";\nexport type Reader = HyperUnixReader;\nexport const reap = (child: { pid: number }): void => { process.kill(child.pid, "SIGKILL"); };`,
    reasons: [],
  },
  { id: "r2 U2(a) const-bound dynamic import", code: `const SDK = "${SDK_MODULE}";\nexport async function openSdk(): Promise<unknown> { return (await ${LOAD}(SDK)).HyperUnix; }`, reasons: ["import"] },
  { id: "r2 U2(b) const-bound created require", code: `const SDK = "${SDK_MODULE}";\nexport const sdk: unknown = createRequire(import.meta.url)(SDK);`, reasons: ["import"] },
  { id: "r2 U2(c) vi.stubEnv override", code: `export function useHx(bin: string): void { vi.stubEnv("${OVERRIDE}", bin); }`, reasons: ["override"] },
  { id: "vi.importMock", code: `const sdk = await vi.importMock("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "Reflect.set override", code: `Reflect.set(process.env, "${OVERRIDE}", "/bin/false");`, reasons: ["override"] },
  { id: "in-operator override", code: `export const set = "${OVERRIDE}" in process.env;`, reasons: ["override"] },
  { id: "const-bound element override", code: `const KEY = "${OVERRIDE}";\nprocess.env[KEY] = "/bin/false";`, reasons: ["override"] },
  { id: "const-bound invoke", code: `const ID = "${CAPABILITY_ID}";\nawait registry.invoke(ID, { kind: "x" }, context);`, reasons: ["invoke"] },
  { id: "provider import", code: `import { nativeHyperUnixFind } from "${PROVIDER_MODULE}";`, reasons: ["import"] },
  { id: "observer re-export", code: 'export * from "../src/workbench/hyperunix-observer.js";', reasons: ["import"] },
  { id: "dynamic import", code: `const sdk = await ${LOAD}("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "require", code: `const sdk = require("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "created require", code: `const sdk = createRequire(import.meta.url)("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "import-equals", code: `import sdk = require("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "vi.importActual", code: `const sdk = await vi.importActual("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "registry invoke", code: `await registry.invoke("${CAPABILITY_ID}", { kind: "x" }, context);`, reasons: ["invoke"] },
  { id: "env override", code: `process.env.${OVERRIDE} = "/bin/false";`, reasons: ["override"] },
  { id: "spawn env override", code: `spawn(bin, [], { env: { ${OVERRIDE}: bin } });`, reasons: ["override"] },
  { id: "U2 capability-id data literal", code: `export const D3 = { "${CAPABILITY_ID}": "capability" };\nexport const IDS = ["${CAPABILITY_ID}"];`, reasons: [] },
  { id: "override-name data literal", code: `export const NAMES = ["${OVERRIDE}"];`, reasons: [] },
  { id: "module mock alone", code: `vi.${"mock"}("${SDK_MODULE}", () => ({}));`, reasons: [] },
  { id: "type position", code: `export type Sdk = typeof ${LOAD}("${SDK_MODULE}");`, reasons: [] },
  {
    id: "r3 U1(a) const-shadowed dynamic import",
    code: `export async function openSdk(): Promise<unknown> {\n  const SDK = "${SDK_MODULE}";\n  return (await ${LOAD}(SDK)).HyperUnix;\n}\nexport function label(): string {\n  const SDK = "node:path";\n  return SDK;\n}`,
    reasons: ["import"],
  },
  {
    id: "r3 U1(b) const-shadowed element override",
    code: `export function useHx(bin: string): void {\n  const KEY = "${OVERRIDE}";\n  process.env[KEY] = bin;\n}\nexport function home(): string {\n  const KEY = "HOME";\n  return process.env[KEY] ?? "";\n}`,
    reasons: ["override"],
  },
  {
    id: "r3 U1(c) const-shadowed invoke",
    code: `export async function run(registry: { invoke(id: string, query: unknown, context: unknown): Promise<unknown> }, context: unknown): Promise<unknown> {\n  const ID = "${CAPABILITY_ID}";\n  return registry.invoke(ID, { kind: "x" }, context);\n}\nexport function other(): string {\n  const ID = "rf.read";\n  return ID;\n}`,
    reasons: ["invoke"],
  },
  { id: "r3 U4 escaped specifier", code: 'import { HyperUnix } from "\\u0040hyperunix/sdk";\nexport const sdk = HyperUnix;', reasons: ["import"] },
  { id: "escaped needle letter", code: 'import { HyperUnix } from "@hyper\\u0075nix/sdk";', reasons: ["import"] },
  { id: "hex-escaped needle letter", code: `const sdk = await ${LOAD}("@hyper\\x75nix/sdk");`, reasons: ["import"] },
  { id: "braced-escaped needle letter", code: 'const sdk = require("@hyper\\u{75}nix/sdk");', reasons: ["import"] },
  { id: "identity-escaped needle letter", code: 'import { HyperUnix } from "@h\\yperunix/sdk";', reasons: ["import"] },
  { id: "line-continued specifier", code: 'import { HyperUnix } from "@hyper\\\nunix/sdk";', reasons: ["import"] },
  { id: "escaped override name", code: 'process.env.HYPER\\u0055NIX_HX = "/bin/false";', reasons: ["override"] },
  { id: "r3 F5 node_modules path", code: 'import { HyperUnix } from "../node_modules/@hyperunix/sdk/dist/index.js";\nexport const sdk = HyperUnix;', reasons: ["import"] },
  { id: "non-normal provider path", code: 'import { nativeHyperUnixFind } from "../src/workbench/providers/./hyperunix.js";', reasons: ["import"] },
  { id: "percent-encoded provider path", code: `const provider = await ${LOAD}("../src/workbench/providers/hyper%75nix.js");`, reasons: ["import"] },
  { id: "const-keyed invoke callee", code: `const INVOKE = "invoke";\nawait registry[INVOKE]("${CAPABILITY_ID}", { kind: "x" }, context);`, reasons: ["invoke"] },
  { id: "aliased loader", code: `const load = vi.importActual;\nconst sdk = await load("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "aliased env call", code: `const stub = vi.stubEnv;\nstub("${OVERRIDE}", "/bin/false");`, reasons: ["override"] },
  { id: "global-object loader", code: `const sdk = global.require("${SDK_MODULE}");`, reasons: ["import"] },
  { id: "octal-escaped needle letter", code: 'import { HyperUnix } from "@hyper\\165nix/sdk";', reasons: ["import"] },
];
interface PagePlant {
  readonly id: string;
  readonly markdown: string;
  /** The clauses the view must judge as hits, exactly. */
  readonly hits: readonly string[];
  readonly refusals: readonly string[];
}
const PAGE_PLANTS: readonly PagePlant[] = [
  { id: "U7(a) inline comment split", markdown: "HX children are termi<!-- -->nated on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "U7(b) decimal reference", markdown: "HX children are terminat&#101;d on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "hex reference", markdown: "HX children are terminat&#x65;d on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "U7(c) commented-out claim", markdown: "<!-- HX child processes are terminated on abort -->", hits: [], refusals: [] },
  { id: "empty comments", markdown: "a <!--> HX children are terminated <!---> c", hits: ["a HX children are terminated c"], refusals: [] },
  { id: "soft wrap", markdown: "HX children are\nterminated on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "emphasis split", markdown: "HX children are termi**nated** on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "inline tag split", markdown: "HX children are termi<b>nated</b> on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "html block", markdown: "<div>\nHX children are terminated on abort.\n</div>", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "table cell", markdown: "| note |\n|---|\n| HX children are terminated on abort. |", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "quoted attribute", markdown: 'HX <span title="a>b">children</span> are terminated.', hits: ["HX children are terminated."], refusals: [] },
  { id: "code-span reference", markdown: "`HX children are terminat&#101;d`", hits: [], refusals: [] },
  { id: "unmodelled element", markdown: "<details>HX children are terminated</details>", hits: ["HX children are terminated"], refusals: ["<details>"] },
  { id: "hiding attribute", markdown: "HX <span hidden>children are terminated</span>.", hits: ["HX children are terminated."], refusals: ["<span hidden>"] },
  { id: "prototype-named reference", markdown: "HX children are terminated &constructor; here.", hits: ["HX children are terminated &constructor"], refusals: [] },
  { id: "r2 U6(a) combining grapheme joiner", markdown: `HX children are termi${String.fromCodePoint(0x34f)}nated on abort.`, hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "r2 U6(b) grapheme joiner reference", markdown: "HX children are termi&#x34F;nated on abort.", hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "variation selector", markdown: `HX children are termi${String.fromCodePoint(0xfe0f)}nated on abort.`, hits: ["HX children are terminated on abort."], refusals: [] },
  { id: "Hangul filler", markdown: `HX children are termi${String.fromCodePoint(0x3164)}nated on abort.`, hits: [], refusals: [] },
];
const pageHits = (markdown: string): { readonly hits: readonly string[]; readonly refusals: readonly string[] } => {
  const view = pageView(markdown);
  return { hits: view.clauses.filter(isDocsHit), refusals: view.refusals };
};

/** Floors below today's measured counts (header), so an emptied collector reds and an additive change does not. */
const LITERAL_FLOOR = 25;
const IDENTIFIER_FLOOR = 200;
const JUDGED_FLOOR = 20;
/** R-UNANCHORED's measured set: the terms no outside anchor holds (node:os signal names, the SDK and RF kill calls, the outside corpus). */
const UNANCHORED: readonly string[] = [
  "terminates",
  "terminating",
  "termination",
  "SIGBREAK",
  "SIGEMT",
  "SIGINFO",
  "SIGLOST",
  "kills",
  "killed",
  "killing",
  "reap",
  "reaped",
  "reaping",
  "child process",
  "child processes",
  "process group",
  "process groups",
  "process trees",
  "subprocess",
  "subprocesses",
];
/** The titles of the RF cases whose stand-in child ignores SIGTERM (the outside corpus's termination titles). */
function noncooperativeTitles(source: ts.SourceFile): string[] {
  const rfSuite = suitesNamed(source, RF_SUITE)[0];
  return (rfSuite === undefined ? [] : casesOf(rfSuite)).filter(entry => literalTexts(entry.call).some(text => text.includes('process.on("SIGTERM"'))).map(entry => entry.title);
}
/** The JSDoc of each SDK transport function that kills the owned process group (the SDK's own termination prose). */
function sdkTerminationProse(sdk: ts.SourceFile): string[] {
  return [...new Set(groupKills(sdk).map(enclosingFunction))].flatMap(owner => {
    const doc = owner === undefined ? undefined : leadingDoc(sdk, owner);
    return doc === undefined ? [] : [doc];
  });
}
/** The SDK transport with both abort listeners cut from the kill (refusal #1's U5 member). */
function unreachedTransport(text: string): string {
  return plantedText(
    plantedText(text, ABORT_RUN, 'const abort = () => { failure ??= new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED"); };'),
    ABORT_STREAM,
    "const abort = () => { cancelled = true; };",
  );
}
function shapeCounts(hits: readonly ShapeHit[]): Record<string, number> {
  return Object.fromEntries(SHAPES.map(shape => [shape, hits.filter(hit => hit.shape === shape).length]));
}

// ---- the census -------------------------------------------------------------------------------------------------------

describe("wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)", () => {
  it("frozen shape: every table the census judges or reads with is exactly its frozen literal", { timeout: CENSUS_TIMEOUT }, () => {
    expect({
      shaped: TERMS.every(term => TERM_SHAPE.test(term)),
      distinct: new Set(TERMS.map(term => term.toLowerCase())).size === TERMS.length,
      vocabulary: VOCABULARY.map(row => `${row.id}:${row.terms.join("|")}`),
      cases: CASES.map(row => `${row.id}:${row.pins.length}`),
      custody: CUSTODY.map(row => `${row.claim}:${row.caseId}:${row.pins.join("+")}`),
      nearMisses: [...NEAR_MISSES],
      matchers: { call: [...CALL_MATCHERS], outcome: [...OUTCOME_MATCHERS], flags: [...CHAIN_FLAGS], standIns: [...STAND_IN_FACTORIES], returns: [...MOCKED_RETURNS] },
      provider: {
        entries: [...PROVIDER_ENTRIES],
        calls: [...PROVIDER_CALLS],
        registry: REGISTRY,
        bound: [...BOUND].map(([name, from]) => `${name}<${from}`),
        mocks: [...MODULE_MOCKS],
        guarded: [...GUARDED_MODULES],
        targets: [...GUARDED_TARGETS],
      },
      tampers: {
        stubs: [...GLOBAL_STUBS],
        mutators: [...MUTATORS],
        watched: [...WATCHED],
        environment: ENVIRONMENT,
        importKinds: [...IMPORT_KINDS],
        globalNames: ["globalThis", "global", "JSON", "Object", "Reflect", "process"].every(name => GLOBAL_NAMES.has(name)),
      },
      undos: { stub: [...STUB_UNDOS], all: [...ALL_UNDOS] },
      registrars: [...REGISTRARS],
      shapes: [...SHAPES],
      memberShapes: [...MEMBER_SHAPES].map(([name, shape]) => `${name}:${shape}`),
      processTable: [...PROCESS_TABLE],
      wrappers: WRAPPER_RULES.map(([name, entry]) => `${name}:${entry.arguments.join("|")}/${entry.positionals}/${entry.commands.join("|")}`),
      keywords: [...SHELL_KEYWORDS],
      shells: [...SHELLS],
      spawners: [...SPAWNERS],
      patterns: [SHELL_COMMAND_FLAG.source, COMMAND_SEPARATOR.source, PROC_PATH.source, ESRCH_WORD.source, SPECIFIER_EXTENSION.source, GLOBAL_PREFIX.source, ATTACHED_SPLIT.source, SDK_PATH.source],
      excluded: [...EXCLUDED],
      drivers: {
        needles: [...MODULE_NEEDLES],
        capability: CAPABILITY_ID,
        override: OVERRIDE,
        loaders: [...LOADERS],
        envCalls: [...ENV_CALLS],
        envMethods: [...ENV_METHODS],
        tokens: [...DRIVER_TOKENS],
        needle: String(DRIVER_NEEDLE),
        needleInEveryToken: DRIVER_TOKENS.every(token => DRIVER_NEEDLE.test(token)),
        reasons: [...DRIVER_REASONS],
      },
      docsView: {
        names: [...DECODED_NAMES.keys()],
        legacy: [...LEGACY_NAMES],
        hiding: [...HIDING_ELEMENTS],
        hidingAttributes: [...HIDING_ATTRIBUTES],
        rawText: [...RAW_TEXT_ELEMENTS],
        blocks: [...BLOCK_ELEMENTS],
        fillers: [...FILLERS].map(char => (char.codePointAt(0) ?? 0).toString(16)),
      },
      residuals: RESIDUALS.map(residual => `${residual.id}:${residual.rows}`),
      falsifierPlants: FALSIFIER_PLANTS.map(plant => `${plant.id}=${plant.shapes.join("+")}#${digest(plant.code)}`),
      driverPlants: DRIVER_PLANTS.map(plant => `${plant.id}=${plant.reasons.join("+")}#${digest(plant.code)}`),
      pagePlants: PAGE_PLANTS.map(plant => `${plant.id}=${plant.hits.length}/${plant.refusals.join("+")}#${digest(plant.markdown)}`),
    }).toStrictEqual({
      shaped: true,
      distinct: true,
      vocabulary: [
        "W1:terminate|terminates|terminated|terminating|termination",
        "W2:SIGABRT|SIGALRM|SIGBREAK|SIGBUS|SIGCHLD|SIGCONT|SIGEMT|SIGFPE|SIGHUP|SIGILL|SIGINFO|SIGINT|SIGIO|SIGIOT|SIGKILL|SIGLOST|SIGPIPE|SIGPOLL|SIGPROF|SIGPWR|SIGQUIT|SIGSEGV|SIGSTKFLT|SIGSTOP|SIGSYS|SIGTERM|SIGTRAP|SIGTSTP|SIGTTIN|SIGTTOU|SIGURG|SIGUSR1|SIGUSR2|SIGVTALRM|SIGWINCH|SIGXCPU|SIGXFSZ",
        "W3:kill|kills|killed|killing",
        "W4:reap|reaps|reaped|reaping",
        "W5:child process|child processes|process group|process groups|process tree|process trees|subprocess|subprocesses",
      ],
      cases: ["K1:4", "K2:1", "K3:5"],
      custody: [
        "close-once:K1:client.close.toHaveBeenCalledOnce#1",
        "abort-dispose:K3:client.dispose.toHaveBeenCalledOnce#1+client.dispose.toHaveBeenCalledOnce#2",
        "close after abort:K3:client.close.toHaveBeenCalledOnce#1",
      ],
      nearMisses: ["skill", "skilled", "pkill", "killall", "terminal", "terminalReached", "indeterminate", "reapply", "reaper", "subprocessor", "processes", "childish", "SIGTERMINATE", "SIGUSR10"],
      matchers: {
        call: ["toHaveBeenCalled", "toHaveBeenCalledOnce", "toHaveBeenCalledTimes", "toHaveBeenCalledWith", "toHaveBeenLastCalledWith", "toHaveBeenNthCalledWith"],
        outcome: ["toMatchObject", "toEqual", "toStrictEqual"],
        flags: ["not", "rejects", "resolves"],
        standIns: ["vi.fn", "vi.spyOn"],
        returns: ["mockReturnValue", "mockReturnValueOnce", "mockResolvedValue", "mockResolvedValueOnce", "mockImplementation", "mockImplementationOnce"],
      },
      provider: {
        entries: ["nativeHyperUnixFind", "registerNativeHyperUnixFind", "registerHyperUnixFind"],
        calls: ["nativeHyperUnixFind"],
        registry: "registry",
        bound: [
          "describe<vitest",
          "it<vitest",
          "expect<vitest",
          "vi<vitest",
          "HyperUnix<@hyperunix/sdk",
          "nativeHyperUnixFind<../src/workbench/providers/hyperunix.js",
          "registerNativeHyperUnixFind<../src/workbench/providers/hyperunix.js",
          "registerHyperUnixFind<../src/workbench/providers/hyperunix.js",
          "CapabilityRegistry<../src/workbench/capability-registry.js",
        ],
        mocks: ["vi.mo" + "ck", "vi.doMock", "vitest.mo" + "ck", "vitest.doMock"],
        guarded: ["@hyperunix/sdk", "../src/workbench/providers/hyperunix.js", "../src/workbench/capability-registry.js"],
        targets: ["node_modules/@hyperunix/sdk", "src/workbench/providers/hyperunix", "src/workbench/capability-registry"],
      },
      tampers: {
        stubs: ["vi.stubGlobal", "vi.useFakeTimers", "vi.setSystemTime"],
        mutators: [
          "Object.assign",
          "Object.defineProperty",
          "Object.defineProperties",
          "Object.setPrototypeOf",
          "Reflect.set",
          "Reflect.defineProperty",
          "Reflect.deleteProperty",
          "Reflect.setPrototypeOf",
        ],
        watched: [
          "vi.spyOn",
          "vi.stubGlobal",
          "vi.useFakeTimers",
          "vi.setSystemTime",
          "Object.assign",
          "Object.defineProperty",
          "Object.defineProperties",
          "Object.setPrototypeOf",
          "Reflect.set",
          "Reflect.defineProperty",
          "Reflect.deleteProperty",
          "Reflect.setPrototypeOf",
          "vi.mo" + "ck",
          "vi.doMock",
          "vitest.mo" + "ck",
          "vitest.doMock",
        ],
        environment: "process.env",
        importKinds: ["import", "ImportClause", "NamespaceImport", "ImportEqualsDeclaration"],
        globalNames: true,
      },
      undos: { stub: ["mockRestore", "mockReset"], all: ["vi.restoreAllMocks", "vi.resetAllMocks"] },
      registrars: ["describe", "suite", "it", "test"],
      shapes: ["F1", "F2", "F3", "F4"],
      memberShapes: ["kill:F1", "pid:F2", "ESRCH:F4"],
      processTable: ["ps", "pgrep", "pkill", "kill", "killall", "pidof", "pstree", "pwdx", "lsof", "fuser"],
      wrappers: [
        "env:-u|--unset|-C|--chdir/0/-S|--split-string",
        "exec:-a/0/",
        "command:/0/",
        "builtin:/0/",
        "nohup:/0/",
        "setsid:/0/",
        "sudo:-u|--user|-g|--group|-h|--host|-p|--prompt|-C|--close-from|-D|--chdir|-r|--role|-t|--type|-U|--other-user|-T|--command-timeout|-R|--chroot/0/",
        "doas:-u|-C|-a/0/",
        "su:-s|--shell|-g|--group|-G|--supp-group|-w|--whitelist-environment/1/-c|--command",
        "runuser:-u|--user|-g|--group|-G|--supp-group|-s|--shell|-w|--whitelist-environment/0/-c|--command",
        "nice:-n|--adjustment/0/",
        "ionice:-c|--class|-n|--classdata/0/",
        "chrt:-T|--sched-runtime|-P|--sched-period|-D|--sched-deadline/1/",
        "taskset:/1/",
        "timeout:-s|--signal|-k|--kill-after/1/",
        "stdbuf:-i|--input|-o|--output|-e|--error/0/",
        "unbuffer:/0/",
        "chroot:--userspec|--groups/1/",
        "flock:-w|--timeout|-E|--conflict-exit-code/1/-c|--command",
        "watch:-n|--interval|-q|--equexit/0/",
        "strace:-e|-o|-p|-s|-u|-E|-a|-b|-I|-O|-S|-X|-P/0/",
        "xargs:-a|--arg-file|-d|--delimiter|-E|-e|--eof|-I|-i|--replace|-L|-l|--max-lines|-n|--max-args|-P|--max-procs|-s|--max-chars|--process-slot-var/0/",
        "busybox:/0/",
        "time:-f|--format|-o|--output/0/",
      ],
      keywords: ["!", "if", "then", "else", "elif", "do", "while", "until", "coproc", "eval"],
      shells: ["sh", "bash", "dash", "zsh", "ksh", "mksh", "ash", "fish", "csh", "tcsh"],
      spawners: ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"],
      patterns: [
        "^(?:-[A-Za-z]*c[A-Za-z]*|--command)$",
        "\\$\\(|[;&|\\n`(){}]",
        "(?:^|\\/)proc(?:\\/|$)",
        "(?<![A-Za-z0-9_])esrch(?![A-Za-z0-9_])",
        "\\.(?:[cm]?[jt]s|[jt]sx)$",
        "^(?:(?:globalThis|global)\\.)+",
        "['\"=]",
        "(?:^|\\/)node_modules\\/@hyperunix\\/sdk(?:\\/|$)",
      ],
      excluded: [SELF],
      drivers: {
        needles: ["providers/hyperunix", "hyperunix-observer"],
        capability: "hyperunix.find",
        override: "HYPERUNIX_HX",
        loaders: ["require", "module.require", "vi.importActual", "vi.importMock"],
        envCalls: [
          "vi.stubEnv",
          "Reflect.get",
          "Reflect.set",
          "Reflect.has",
          "Reflect.deleteProperty",
          "Reflect.defineProperty",
          "Reflect.getOwnPropertyDescriptor",
          "Object.defineProperty",
          "Object.getOwnPropertyDescriptor",
          "Object.hasOwn",
        ],
        envMethods: ["hasOwnProperty", "propertyIsEnumerable"],
        tokens: ["@hyperunix/sdk", "providers/hyperunix", "hyperunix-observer", "hyperunix.find", "HYPERUNIX_HX"],
        needle: "/hyperunix/i",
        needleInEveryToken: true,
        reasons: ["import", "invoke", "override"],
      },
      docsView: {
        names: ["amp", "lt", "gt", "quot", "apos", "nbsp"],
        legacy: ["amp", "lt", "gt", "quot", "nbsp"],
        hiding: [
          "area",
          "audio",
          "base",
          "basefont",
          "canvas",
          "datalist",
          "details",
          "dialog",
          "embed",
          "frame",
          "frameset",
          "head",
          "iframe",
          "link",
          "math",
          "meta",
          "meter",
          "noembed",
          "noframes",
          "noscript",
          "object",
          "optgroup",
          "option",
          "param",
          "picture",
          "plaintext",
          "progress",
          "rp",
          "script",
          "select",
          "slot",
          "source",
          "style",
          "svg",
          "template",
          "textarea",
          "title",
          "track",
          "video",
          "xmp",
        ],
        hidingAttributes: ["hidden", "popover", "style"],
        rawText: ["script", "style", "textarea", "title", "xmp", "iframe", "noembed", "noframes", "noscript"],
        blocks: [
          "address",
          "article",
          "aside",
          "blockquote",
          "br",
          "caption",
          "center",
          "dd",
          "div",
          "dl",
          "dt",
          "fieldset",
          "figcaption",
          "figure",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "header",
          "hgroup",
          "hr",
          "legend",
          "li",
          "listing",
          "main",
          "menu",
          "nav",
          "ol",
          "p",
          "pre",
          "search",
          "section",
          "summary",
          "table",
          "tbody",
          "td",
          "tfoot",
          "th",
          "thead",
          "tr",
          "ul",
        ],
        fillers: ["115f", "1160", "3164", "ffa0"],
      },
      residuals: [
        "R-WORDING:C4 C8",
        "R-UNANCHORED:frozen shape",
        "R-SHAPELESS:C7",
        "R-COMPOSED:C4 C5 C7",
        "R-ERRNO:C7",
        "R-UNDRIVEN:C7",
        "R-ARGUMENTS:C1 C2",
        "R-RUNTIME:C1 C2 C3",
        "R-DEAD-PATH:C5 C6",
        "R-CLAUSE:C8",
        "R-CITATION:C8",
        "R-REFERENCE:C8",
        "R-LOOKALIKE:C4 C8",
        "R-ATTRIBUTE:C8",
        "R-SCOPE:C8",
        "R-DETACHED-COMMENT:C4",
        "R-WRAPPER:C7",
        "R-INDIRECT:C2 C7",
        "R-DATA-OVERRIDE:C7",
        "R-DEFINITION:C7",
        "R-ELSEWHERE:C2",
        "R-HELPER-REGISTRATION:C1",
        "R-GROUP-FORM:C6",
        "R-BIDI:C8",
      ],
      falsifierPlants: [
        "U1(a) childGone=F2:destructuring+F3:/proc path#e1a951873ff2",
        "U1(b) destructured pid=F2:destructuring#57a37ff5b2f5",
        "U1(c) joined /proc=F3:/proc path#71f4aa8a125c",
        "U1(d) kill.call=F1:member#5184107fdfd2",
        "U1(e) absolute ps=F3:process-table command#b3249fb35b7d",
        "U1(f) ESRCH regular expression=F4:regular expression#33d671b53598",
        "case-folded ESRCH regular expression=F4:regular expression#cdb222390a03",
        "destructuring assignment=F2:destructuring assignment#f854b51a6352",
        "destructured kill=F1:bare call+F1:destructuring#46c5d69d96a3",
        "optional element kill=F1:element key#3a24a40a6ad4",
        "Reflect.apply=F1:member#861ae3d725fb",
        "Reflect.get name=F1:kill name literal#9eb80979ddf5",
        "template kill command=F3:process-table command#3c46a23dd3c0",
        "shell-wrapped ps=F3:process-table command#2ed2a5f2c6ef",
        "errno member=F4:member#55aed16db067",
        "ESRCH string=F4:literal#31f01adc8a12",
        "readdir /proc=F3:/proc path#a11f5a480f64",
        "template /proc=F3:/proc path#365b23d12872",
        "prototype member names=#ef7fb5ccdc05",
        "r2 U1(a) timeout option argument=F3:process-table command#bb9500fa634a",
        "r2 U1(b) sudo option argument=F3:process-table command#2b959ef9f678",
        "r2 U1(c) env option argument=F3:process-table command#b0c11dc9042f",
        "r2 U1(d) shell flags before -c=F3:process-table command#ac85a4ceb8d3",
        "r2 U1(e) shell flag before -c=F3:process-table command#d4f48a44626c",
        "r2 U5 ESRCH identifier key=F4:identifier#b40fc0f987a8",
        "r2 U5 ESRCH string key=F4:key#13762757c084",
        "attached long option=F3:process-table command#be53df74103d",
        "keyword head=F3:process-table command#89ec96bb7458",
        "brace group=F3:process-table command#26b226028f42",
        "command option of a wrapper=F3:process-table command#4e54ca9768d6",
        "split-string option=F3:process-table command#4cd50617685c",
        "const-bound kill key=F1:element key+F1:kill name literal#b653b35f461a",
        "type member=F1:type member#6abdebdd6c7c",
        "ESRCH word in an identifier=F4:identifier#b4d1c4d744d3",
        "escaped ESRCH regular expression=F4:regular expression#2baf8cf24440",
        "/proc element key=F3:/proc path#3c5ea3d26fe6",
        "ESRCH words in a string key=F4:key#79639638835d",
        "r3 U2(a) su lone dash=F3:process-table command#3bc64f7ab537",
        "r3 U2(b) env lone dash=F3:process-table command#5688b238e056",
        "r3 U2(c) options end after the shell command flag=F3:process-table command#a75c133e3a01",
        "attached split-string argument=F3:process-table command#62b10256a946",
        "attached command option=F3:process-table command#9736f5a7fc01",
        "option argument outside the table=F3:process-table command#a2c82b58c36a",
        "r3 const-shadowed kill key=F1:element key+F1:kill name literal#334fdbe71b08",
        "control=F1:member+F1:member+F2:member+F3:/proc path+F3:process-table command+F3:process-table command+F4:literal#8313c0e8ccca",
      ],
      driverPlants: [
        "static import=import#5268cf70dc58",
        "type-only import=#e9cc4899fd12",
        "inline type-only import=#cc2c3408ca5c",
        "type-only export=#8d0822cb0601",
        "r2 F1 type-only import with an RF reap=#b6e3b6d77e86",
        "r2 U2(a) const-bound dynamic import=import#be4cd179abf6",
        "r2 U2(b) const-bound created require=import#090fb44c09cd",
        "r2 U2(c) vi.stubEnv override=override#b852a5cdd5d6",
        "vi.importMock=import#06ede4a29fb2",
        "Reflect.set override=override#4b7345c49f3b",
        "in-operator override=override#cb38d3bfc58b",
        "const-bound element override=override#fb9f42bdbb73",
        "const-bound invoke=invoke#2b29dc1d9b65",
        "provider import=import#529193e1e1fc",
        "observer re-export=import#f606c7a440c7",
        "dynamic import=import#311d8eea9488",
        "require=import#a0ca3b2301f2",
        "created require=import#b7ecd110d372",
        "import-equals=import#9e35bbb813ab",
        "vi.importActual=import#2e2deb1fa61d",
        "registry invoke=invoke#83b144e62243",
        "env override=override#d154b1ed7475",
        "spawn env override=override#6dadfbcafcef",
        "U2 capability-id data literal=#957ebf126582",
        "override-name data literal=#f1b16bc0d2b3",
        "module mock alone=#04fb7133c862",
        "type position=#4c45093822fa",
        "r3 U1(a) const-shadowed dynamic import=import#59b7b5ca25be",
        "r3 U1(b) const-shadowed element override=override#e2d023e160a5",
        "r3 U1(c) const-shadowed invoke=invoke#54d55438a623",
        "r3 U4 escaped specifier=import#8f9b1c52cb81",
        "escaped needle letter=import#fb5c92784de1",
        "hex-escaped needle letter=import#d75a2ccffaad",
        "braced-escaped needle letter=import#a69d2c8da528",
        "identity-escaped needle letter=import#daf3312501bb",
        "line-continued specifier=import#2269109e0e07",
        "escaped override name=override#c8634b6bbdc6",
        "r3 F5 node_modules path=import#61e721129180",
        "non-normal provider path=import#fc52a13a0f45",
        "percent-encoded provider path=import#fd37d094b34b",
        "const-keyed invoke callee=invoke#af5992e3d246",
        "aliased loader=import#d7cf6485da44",
        "aliased env call=override#6c88fb962284",
        "global-object loader=import#d4ec7b8e5248",
        "octal-escaped needle letter=import#7cf4ef3319ac",
      ],
      pagePlants: [
        "U7(a) inline comment split=1/#5ee22f12bb18",
        "U7(b) decimal reference=1/#c36afe04df26",
        "hex reference=1/#5651e6bae5dd",
        "U7(c) commented-out claim=0/#5b37040f676b",
        "empty comments=1/#8fd818504300",
        "soft wrap=1/#97a6bbc4d5de",
        "emphasis split=1/#8b903eac9e6a",
        "inline tag split=1/#8e216bd6b431",
        "html block=1/#e7bd438cb227",
        "table cell=1/#2cb736b03d2d",
        "quoted attribute=1/#0d5ad9bde7e3",
        "code-span reference=0/#c2e27613adb3",
        "unmodelled element=1/<details>#389513c7291a",
        "hiding attribute=1/<span hidden>#c49957050933",
        "prototype-named reference=1/#03a7896a6efa",
        "r2 U6(a) combining grapheme joiner=1/#5dc055cec365",
        "r2 U6(b) grapheme joiner reference=1/#1d7a64d8e389",
        "variation selector=1/#5b7066b4633f",
        "Hangul filler=0/#cd9595872435",
      ],
    });
  });

  it("matcher: every vocabulary term is found in each case fold and separator spelling, every near miss stays quiet, and every signal name node:os knows on this platform is a W2 term", { timeout: CENSUS_TIMEOUT }, () => {
    const missed = TERMS.flatMap(term => plantedSpellings(term).filter(text => !termsIn(text).includes(term)).map(text => `${term} <- ${JSON.stringify(text)}`));
    const quietBroken = NEAR_MISSES.filter(text => termsIn(text).length > 0);
    const platformSignals = Object.keys(constants.signals);
    expect({
      planted: TERMS.reduce((sum, term) => sum + plantedSpellings(term).length, 0) > TERMS.length * 4,
      missed,
      quietBroken,
      signals: platformSignals.length >= 20,
      unlisted: platformSignals.filter(name => !termsOfRow("W2").includes(name)),
    }).toStrictEqual({ planted: true, missed: [], quietBroken: [], signals: true, unlisted: [] });
  });

  it("C1 cases: the HyperUnix SDK custody suite's own call registers, read through the file's vitest registrar bindings, exactly the three frozen cases, in order, with their ordered assertion signatures; each registration there is a bare title-and-callback call with a parameterless callback, no suite is nested there and no registrar call there has a computed title; file-wide, every vitest import binds its own name (no alias, no namespace import), registrars are used only as callee heads, expect only as a callee or a member's object and vi only as a member's object; and describe, it, expect, vi, HyperUnix, the provider entries and CapabilityRegistry are declared only by their own import", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = suiteReading(parse(LIFECYCLE));
    expect({ suites: reading.suites, nested: reading.nested, departures: reading.departures, rebound: reading.rebound, cases: reading.cases }).toStrictEqual({
      suites: ["describe"],
      nested: [],
      departures: [],
      rebound: [],
      cases: CASES.map(row => ({ title: row.title, call: "it", pins: [...row.pins] })),
    });
  });

  it("C1 custody map: every lifecycle-call assertion of the suite is claimed by exactly one CUSTODY pin, and every claimed lifecycle call is one the provider makes", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const lifecycle = providerLifecycle(parse(PROVIDER));
    const calls = new Set([...lifecycle.onAbort, ...lifecycle.inFinally]);
    const suite = suitesNamed(source, HX_SUITE)[0];
    const derived = (suite === undefined ? [] : casesOf(suite)).flatMap(entry => {
      const caseId = CASES.find(row => row.title === entry.title)?.id ?? `<unframed case ${entry.title}>`;
      const assertions = assertionsIn(source, entry.call);
      const labels = numbered(assertions.map(assertion => assertion.signature));
      return assertions.flatMap((assertion, index) => {
        const subject = assertion.subject;
        const lifecycleCall =
          subject !== undefined && ts.isPropertyAccessExpression(subject) && calls.has(subject.name.text) && CALL_MATCHERS.has(assertion.matcher) && standInDefect(subject, entry.call) === undefined;
        return lifecycleCall ? [`${caseId}:${labels[index]}`] : [];
      });
    });
    const claimed = CUSTODY.flatMap(row => row.pins.map(pin => `${row.caseId}:${pin}`));
    const claimedCalls = [...new Set(CUSTODY.flatMap(row => row.pins.map(pin => pin.split(".")[1] ?? "")))].sort();
    expect({ derived: [...derived].sort(), claimedCalls, providerCalls: [...calls].sort() }).toStrictEqual({ derived: [...claimed].sort(), claimedCalls: [...calls].sort(), providerCalls: ["close", "dispose"] });
  });

  it("C1 calibration: a chained member, an options object, a test-context parameter, a nested suite, a namespace registrar member, an aliased registrar's extra case, an aliased expect, expect, vi or a registrar used as a value, a computed title and a re-bound registrar or SDK binding each change the C1 reading", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const k2 = CASES[1]?.title ?? "";
    const titles = new Set(CASES.map(row => row.title));
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["namespace registrar member", plantedText(plantedText(text, VITEST_IMPORT, `${VITEST_IMPORT}\nimport * as vt from "vitest";`), K2_HEAD, K2_HEAD.replace('it("', `vt.it.${SKIP}("`))],
      ["aliased registrar's extra case", plantedText(plantedText(text, VITEST_IMPORT, VITEST_IMPORT.replace("it, vi", "it, it as check, vi")), HX_DESCRIBE, `${HX_DESCRIBE}\n  check("an extra case", () => {});`)],
      ["aliased expect", plantedText(text, VITEST_IMPORT, VITEST_IMPORT.replace("expect, it", "expect, expect as check, it"))],
      ["expect used as a value", plantedText(text, "function deferred<T>() {", "const check = expect;\nvoid check;\nfunction deferred<T>() {")],
      ["vi used as a value", plantedText(text, "function deferred<T>() {", "const tools = vi;\nvoid tools;\nfunction deferred<T>() {")],
      ["registrar used as a value", plantedText(text, HX_DESCRIBE, `${HX_DESCRIBE}\n  const register = it;\n  void register;`)],
      ["computed title", plantedText(text, HX_DESCRIBE, `${HX_DESCRIBE}\n  it(["an", "extra", "case"].join(" "), () => {});`)],
      ["member", plantedText(text, K2_HEAD, K2_HEAD.replace('it("', 'it.fails("'))],
      ["options object", plantedText(text, K2_HEAD, K2_HEAD.replace("async () => {", "{ retry: 1 }, async () => {"))],
      ["test-context parameter", plantedText(text, K2_HEAD, K2_HEAD.replace("async () => {", "async context => {"))],
      ["nested suite", plantedText(text, HX_DESCRIBE, `${HX_DESCRIBE}\n  describe("nested", () => {});`)],
      ["re-bound registrar", plantedText(text, "function deferred<T>() {", "const it = (title: string, body: () => void) => body();\nfunction deferred<T>() {")],
      ["re-bound SDK binding", plantedText(text, "function deferred<T>() {", "const HyperUnix = { open: () => ({}) };\nfunction deferred<T>() {")],
      ["prototype-named declaration", plantedText(text, "function deferred<T>() {", 'const toString = () => "";\nfunction deferred<T>() {')],
    ];
    const readings = plants.map(([id, planted]) => {
      const reading = suiteReading(parseText("planted-lifecycle.test.ts", planted));
      return {
        id,
        departures: reading.departures.map(entry => entry.replace(/ :\d+$/, "")),
        nested: reading.nested,
        rebound: reading.rebound.map(entry => entry.split(" ")[0] ?? ""),
        extra: reading.cases.filter(entry => !titles.has(entry.title)).map(entry => entry.title),
      };
    });
    expect(readings).toStrictEqual([
      { id: "namespace registrar member", departures: [`${k2}: a it.${SKIP} member`, "a vitest namespace import vt"], nested: [], rebound: [], extra: [] },
      { id: "aliased registrar's extra case", departures: ["an aliased vitest import it as check"], nested: [], rebound: [], extra: ["an extra case"] },
      { id: "aliased expect", departures: ["an aliased vitest import expect as check"], nested: [], rebound: [], extra: [] },
      { id: "expect used as a value", departures: ["expect used as a value"], nested: [], rebound: [], extra: [] },
      { id: "vi used as a value", departures: ["vi used as a value"], nested: [], rebound: [], extra: [] },
      { id: "registrar used as a value", departures: ["it used as a value"], nested: [], rebound: [], extra: [] },
      { id: "computed title", departures: ["a it call with a computed title"], nested: [], rebound: [], extra: [] },
      { id: "member", departures: [`${k2}: a it.fails member`], nested: [], rebound: [], extra: [] },
      { id: "options object", departures: [`${k2}: 3 arguments`], nested: [], rebound: [], extra: [] },
      { id: "test-context parameter", departures: [`${k2}: a test-context parameter`], nested: [], rebound: [], extra: [] },
      { id: "nested suite", departures: [], nested: ["nested"], rebound: [], extra: [] },
      { id: "re-bound registrar", departures: [], nested: [], rebound: ["it"], extra: [] },
      { id: "re-bound SDK binding", departures: [], nested: [], rebound: ["HyperUnix"], extra: [] },
      { id: "prototype-named declaration", departures: [], nested: [], rebound: [], extra: [] },
    ]);
  });

  it("C2 call custody only: every assertion in the suite sits in one of its cases and is a mock-call assertion on a const stand-in or an outcome assertion on the provider's own result (a direct provider or registry call, or a const binding of one used only as an expect subject); no BOUND name is re-bound; no call whose callee chains (literal or const-bound keys, every const alias, globalThis dropped) hold a MODULE_MOCKS name (mock or doMock on vi or on vitest) names a specifier value that resolves to the provider, the registry or the SDK package; and the file holds no vi.spyOn beside vi.spyOn(HyperUnix, \"open\"), no vi.stubGlobal, vi.useFakeTimers or vi.setSystemTime call, no reference to one of those callees, a MUTATORS call or a module mock other than as a callee (a destructured alias included), and no assignment (every destructuring-pattern target included), for-in or for-of target, delete, update or Object / Reflect mutator call on a chain rooted at a global (a platform global name even where a local elsewhere shadows it) or an import binding outside process.env", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = suiteReading(parse(LIFECYCLE));
    const judged = reading.cases.reduce((sum, entry) => sum + entry.pins.length, 0);
    expect({ cases: reading.cases.length, judged: judged >= 6, violations: reading.violations, mocks: reading.mocks, tampers: reading.tampers, asserts: reading.asserts, rebound: reading.rebound }).toStrictEqual({
      cases: 3,
      judged: true,
      violations: [],
      mocks: [],
      tampers: [],
      asserts: [],
      rebound: [],
    });
  });

  it("C2 calibration: a reassigned, let-bound, re-declared or mutated subject, a stand-in registration on the registry, a module mock of the provider or registry through its .js or .ts specifier, an import() argument or a const-bound callee key, a file-level, in-case or aliased spy, a spy whose method name a twice-declared const spells, a global assigned or forged and restored (plainly, by array or object destructuring assignment, through a for-of target, through globalThis.Object.assign or a const alias of Object), an aliased global, a global shadowed by a local elsewhere, an alias whose name an earlier const also declares, a mutator call, fake timers, a patched import member, an assertion in a hook of the suite, a spy through call and an aliased, destructured, destructuring-assigned or rest-destructured mutator each read as a violation, and an environment write reads as none", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["U8 reassigned let", plantedText(text, K2_ANCHOR, `let result: unknown = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");\n    result = native;`)],
      ["let binding", plantedText(text, K2_ANCHOR, K2_ANCHOR.replace("const result", "let result"))],
      ["re-declared subject", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    if (native.rows.length > 0) { const result = native; void result; }`)],
      ["mutated subject", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    Object.assign(result as object, native);`)],
      ["stand-in registration", plantedText(text, K1_REGISTRY, `${K1_REGISTRY}\n    registry.register({ descriptor: { id: "hyperunix.find" }, invoke: async () => ({}) } as never);`)],
      ["module mock of the provider", plantedText(text, "function deferred<T>() {", `vi.${"mock"}("${PROVIDER_MODULE}", () => ({}));\nfunction deferred<T>() {`)],
      ["global spy", plantedText(text, K2_ANCHOR, `vi.spyOn(JSON, "parse").mockReturnValue(native);\n    ${K2_ANCHOR}`)],
      ["r2 U3 provider mock through the .ts specifier", plantedText(text, "function deferred<T>() {", `vi.${"mock"}("../src/workbench/providers/hyperunix.ts", async importOriginal => await importOriginal());\nfunction deferred<T>() {`)],
      ["r2 U3 registry mock through the .ts specifier", plantedText(text, "function deferred<T>() {", `vi.${"mock"}("../src/workbench/capability-registry.ts", async importOriginal => await importOriginal());\nfunction deferred<T>() {`)],
      ["r2 F4 provider mock through an import() argument", plantedText(text, "function deferred<T>() {", `vi.${"mock"}(${LOAD}("${PROVIDER_MODULE}"), async importOriginal => await importOriginal());\nfunction deferred<T>() {`)],
      ["r2 U4 global assigned in K2", plantedText(text, K2_ANCHOR, `JSON.parse = (() => native) as typeof JSON.parse;\n    ${K2_ANCHOR}`)],
      [
        "r2 U4 global forged and restored in K2",
        plantedText(
          text,
          K2_ANCHOR,
          `const realParse = JSON.parse;\n    JSON.parse = (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: "incomplete" } } })) as typeof JSON.parse;\n    ${K2_ANCHOR}\n    JSON.parse = realParse;`,
        ),
      ],
      ["r2 F3 file-level spy before the suite", plantedText(text, HX_DESCRIBE, `const parseSpy = vi.spyOn(JSON, "parse");\nvoid parseSpy;\n${HX_DESCRIBE}`)],
      ["spy on another HyperUnix member", plantedText(text, K2_ANCHOR, `vi.spyOn(HyperUnix, "connect");\n    ${K2_ANCHOR}`)],
      ["aliased global", plantedText(text, K2_ANCHOR, `const json = JSON;\n    json.parse = (() => native) as typeof JSON.parse;\n    ${K2_ANCHOR}`)],
      ["mutator call", plantedText(text, K2_ANCHOR, `Object.defineProperty(JSON, "parse", { value: () => native });\n    ${K2_ANCHOR}`)],
      ["fake timers", plantedText(text, K2_ANCHOR, `vi.useFakeTimers();\n    ${K2_ANCHOR}`)],
      ["patched import member", plantedText(text, K2_ANCHOR, `HyperUnix.open = (() => ({})) as never;\n    ${K2_ANCHOR}`)],
      ["environment write", plantedText(text, K2_ANCHOR, `process.env.HX_TRACE = "1";\n    vi.stubEnv("HX_TRACE", "1");\n    ${K2_ANCHOR}`)],
      ["assertion in a hook of the suite", plantedText(text, HX_DESCRIBE, `${HX_DESCRIBE}\n  afterEach(() => {\n    expect(process.cwd()).toBeDefined();\n  });`)],
      ["spy through call", plantedText(text, K2_ANCHOR, `vi.spyOn.call(vi, JSON, "parse");\n    ${K2_ANCHOR}`)],
      ["mutator aliased", plantedText(text, "function deferred<T>() {", "const define = Object.defineProperty;\nvoid define;\nfunction deferred<T>() {")],
      ["r3 U3(a) array-destructuring forge and restore", forgedInK2(text, `[JSON.parse] = [${FORGED}];`, "[JSON.parse] = [realParse];")],
      ["r3 U3(b) object-destructuring forge and restore", forgedInK2(text, `({ parse: JSON.parse } = { parse: ${FORGED} });`, "({ parse: JSON.parse } = { parse: realParse });")],
      ["r3 U3(c) globalThis.Object.assign forge and restore", forgedInK2(text, `globalThis.Object.assign(JSON, { parse: ${FORGED} });`, "globalThis.Object.assign(JSON, { parse: realParse });")],
      ["r3 U3(d) Object.assign through a const alias", forgedInK2(text, `const O = Object;\n    O.assign(JSON, { parse: ${FORGED} });`, "O.assign(JSON, { parse: realParse });")],
      ["r3 F3 for-of target forge and restore", forgedInK2(text, `for (JSON.parse of [${FORGED}]) break;`, "for (JSON.parse of [realParse]) break;")],
      ["destructured mutator alias", plantedText(text, "function deferred<T>() {", "const { defineProperty } = Object;\nvoid defineProperty;\nfunction deferred<T>() {")],
      ["aliased spy", plantedText(text, K2_ANCHOR, `const v = vi;\n    v.spyOn(JSON, "parse");\n    ${K2_ANCHOR}`)],
      [
        "global shadowed by a local elsewhere",
        plantedText(plantedText(text, "function deferred<T>() {", "function shadow(JSON: unknown): unknown {\n  return JSON;\n}\nfunction deferred<T>() {"), K2_ANCHOR, `JSON.parse = (() => native) as typeof JSON.parse;\n    ${K2_ANCHOR}`),
      ],
      ["const-keyed module mock", plantedText(text, "function deferred<T>() {", `const MOCK = "mock";\nvi[MOCK]("${PROVIDER_MODULE}", () => ({}));\nfunction deferred<T>() {`)],
      [
        "spy method named by a twice-declared const",
        plantedText(
          text,
          "function deferred<T>() {",
          'function otherSpy(): void {\n  const METHOD = "connect";\n  vi.spyOn(HyperUnix, METHOD);\n}\nfunction spyName(): string {\n  const METHOD = "open";\n  return METHOD;\n}\nfunction deferred<T>() {',
        ),
      ],
      ["rest-destructured owner", plantedText(text, "function deferred<T>() {", "const { ...methods } = Reflect;\nvoid methods;\nfunction deferred<T>() {")],
      ["destructuring-assigned mutator alias", plantedText(text, "function deferred<T>() {", "let assign: unknown;\n({ assign } = Object);\nvoid assign;\nfunction deferred<T>() {")],
      [
        "alias whose name an earlier const also declares",
        plantedText(plantedText(text, "function deferred<T>() {", "function helper(): unknown {\n  const json = {};\n  return json;\n}\nfunction deferred<T>() {"), K2_ANCHOR, `const json = JSON;\n    json.parse = (() => native) as typeof JSON.parse;\n    ${K2_ANCHOR}`),
      ],
    ];
    const readings = plants.map(([id, planted]) => {
      const reading = suiteReading(parseText("planted-lifecycle.test.ts", planted));
      return {
        id,
        defects: [...reading.violations.map(line => line.slice(line.lastIndexOf(": ") + 2)), ...reading.mocks.map(line => line.split(" ")[0] ?? ""), ...reading.tampers.map(line => line.split(" :")[0] ?? "")],
      };
    });
    expect(readings).toStrictEqual([
      { id: "U8 reassigned let", defects: ["result is not a const binding"] },
      { id: "let binding", defects: ["result is not a const binding"] },
      { id: "re-declared subject", defects: ["result is declared 2 times in the case"] },
      { id: "mutated subject", defects: ["result is used outside its allowed positions (1 uses)"] },
      { id: "stand-in registration", defects: ["registry is used outside its allowed positions (1 uses)"] },
      { id: "module mock of the provider", defects: [`vi.${"mock"}(${PROVIDER_MODULE})`] },
      { id: "global spy", defects: ["vi.spyOn(JSON)"] },
      { id: "r2 U3 provider mock through the .ts specifier", defects: [`vi.${"mock"}(../src/workbench/providers/hyperunix.ts)`] },
      { id: "r2 U3 registry mock through the .ts specifier", defects: [`vi.${"mock"}(../src/workbench/capability-registry.ts)`] },
      { id: "r2 F4 provider mock through an import() argument", defects: [`vi.${"mock"}(${PROVIDER_MODULE})`] },
      { id: "r2 U4 global assigned in K2", defects: ["JSON.parse assigned"] },
      { id: "r2 U4 global forged and restored in K2", defects: ["JSON.parse assigned", "JSON.parse assigned"] },
      { id: "r2 F3 file-level spy before the suite", defects: ["vi.spyOn(JSON)"] },
      { id: "spy on another HyperUnix member", defects: ["vi.spyOn(HyperUnix)"] },
      { id: "aliased global", defects: ["JSON.parse assigned"] },
      { id: "mutator call", defects: ["Object.defineProperty(JSON)"] },
      { id: "fake timers", defects: ["vi.useFakeTimers"] },
      { id: "patched import member", defects: ["HyperUnix.open assigned"] },
      { id: "environment write", defects: [] },
      { id: "assertion in a hook of the suite", defects: ["an assertion outside the suite's cases"] },
      { id: "spy through call", defects: ["vi.spyOn referenced as a value"] },
      { id: "mutator aliased", defects: ["Object.defineProperty referenced as a value"] },
      { id: "r3 U3(a) array-destructuring forge and restore", defects: ["JSON.parse assigned", "JSON.parse assigned"] },
      { id: "r3 U3(b) object-destructuring forge and restore", defects: ["JSON.parse assigned", "JSON.parse assigned"] },
      { id: "r3 U3(c) globalThis.Object.assign forge and restore", defects: ["Object.assign(JSON)", "Object.assign(JSON)"] },
      { id: "r3 U3(d) Object.assign through a const alias", defects: ["Object.assign(JSON)", "Object.assign(JSON)"] },
      { id: "r3 F3 for-of target forge and restore", defects: ["JSON.parse assigned", "JSON.parse assigned"] },
      { id: "destructured mutator alias", defects: ["Object.defineProperty referenced as a value"] },
      { id: "aliased spy", defects: ["vi.spyOn(JSON)"] },
      { id: "global shadowed by a local elsewhere", defects: ["JSON.parse assigned"] },
      { id: "const-keyed module mock", defects: [`vi.${"mock"}(${PROVIDER_MODULE})`] },
      { id: "spy method named by a twice-declared const", defects: ["vi.spyOn(HyperUnix)"] },
      {
        id: "rest-destructured owner",
        defects: ["Reflect.set referenced as a value", "Reflect.defineProperty referenced as a value", "Reflect.deleteProperty referenced as a value", "Reflect.setPrototypeOf referenced as a value"],
      },
      { id: "destructuring-assigned mutator alias", defects: ["Object.assign referenced as a value"] },
      { id: "alias whose name an earlier const also declares", defects: ["JSON.parse assigned"] },
    ]);
  });

  it("C3 stand-in clients only: every case's callback holds, as a top-level statement before the first top-level statement that references a provider entry, a vi.spyOn(HyperUnix, \"open\") call with a mocked return, no case calls a STUB_UNDOS member or an ALL_UNDOS restore, and HyperUnix is the file's import from @hyperunix/sdk", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const reading = suiteReading(source);
    expect({
      stubs: reading.stubs,
      imported: declaredNames(source).filter(entry => entry.name === "HyperUnix").map(entry => `${entry.kind}<${entry.from ?? ""}`),
    }).toStrictEqual({ stubs: CASES.map(row => ({ title: row.title, stubbed: true, drives: true, stubFirst: true, undone: false })), imported: [`import<${SDK_MODULE}`] });
  });

  it("C3 calibration: a stub nested in a closure or a branch, a stub after the provider call and a provider entry referenced through an alias before the stub each read as not stubbed first, and a restore in the case reads as undone", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const stub = K2_STUB.slice(0, K2_STUB.indexOf("\n"));
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["stub in a closure", plantedText(text, K2_STUB, `const later = () => ${stub}\n    void later;\n    const result = await`)],
      ["stub in a branch", plantedText(text, K2_STUB, `if (process.cwd().length < 0) ${stub}\n    const result = await`)],
      ["stub after the provider call", plantedText(plantedText(text, K2_STUB, "const result = await"), K2_ANCHOR, `${K2_ANCHOR}\n    ${stub}`)],
      ["provider aliased before the stub", plantedText(text, K2_STUB, `const find = nativeHyperUnixFind;\n    void find;\n    ${K2_STUB}`)],
      ["stubs undone in the case", plantedText(text, K2_STUB, `${stub}\n    vi.restoreAllMocks();\n    const result = await`)],
    ];
    const k2 = CASES[1]?.title ?? "";
    const readings = plants.map(([id, planted]) => ({ id, k2: suiteReading(parseText("planted-lifecycle.test.ts", planted)).stubs.find(entry => entry.title === k2) }));
    expect(readings).toStrictEqual([
      { id: "stub in a closure", k2: { title: k2, stubbed: false, drives: true, stubFirst: false, undone: false } },
      { id: "stub in a branch", k2: { title: k2, stubbed: false, drives: true, stubFirst: false, undone: false } },
      { id: "stub after the provider call", k2: { title: k2, stubbed: true, drives: true, stubFirst: false, undone: false } },
      { id: "provider aliased before the stub", k2: { title: k2, stubbed: true, drives: true, stubFirst: false, undone: false } },
      { id: "stubs undone in the case", k2: { title: k2, stubbed: true, drives: true, stubFirst: true, undone: true } },
    ]);
  });

  it("C4 no termination claim: the suite's titles, every comment attached to or inside its statement, every string, template and regular-expression literal (escapes decoded) and identifier word inside it, and every HX-naming comment of the file carry no vocabulary term once Default_Ignorable code points are dropped", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const suite = suitesNamed(source, HX_SUITE)[0];
    const texts = suite === undefined ? undefined : suiteTexts(source, suite);
    expect({
      titles: texts?.titles.length,
      anchored: [HX_SUITE, ...CASES.map(row => row.title)].every(title => texts?.titles.includes(title) ?? false),
      literals: (texts?.literals.length ?? 0) >= LITERAL_FLOOR,
      identifiers: (texts?.identifiers.length ?? 0) >= IDENTIFIER_FLOOR,
      hits: texts === undefined ? ["<no suite>"] : suiteHits(texts),
    }).toStrictEqual({ titles: 4, anchored: true, literals: true, identifiers: true, hits: [] });
  });

  it("C4 calibration: the same collector finds the termination claim of every RF case whose stand-in child ignores SIGTERM, a JSDoc attached before the suite, a regular-expression literal plain or escaped, an identifier word, an HX-naming comment elsewhere and a word split by a zero-width space or a combining grapheme joiner, and every termination word of the RF titles and the SDK's own prose is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const rfSuite = suitesNamed(source, RF_SUITE)[0];
    const titles = noncooperativeTitles(source);
    const named = new Set(titles.flatMap(termsIn));
    const rfSignals = killedWith(parse(RF_PROVIDER)).signals;
    const comments = rfSuite === undefined ? [] : attachedComments(source, rfSuite.call);
    const prose = sdkTerminationProse(parse(SDK_TRANSPORT));
    const corpusWords = [...new Set([...titles, ...prose].flatMap(stemWordsIn))].sort();
    const vocabulary = new Set(TERMS.map(normalized));
    const text = read(LIFECYCLE);
    const plants: ReadonlyArray<readonly [string, string, number]> = [
      ["U4(a) JSDoc attached before the suite", plantedText(text, HX_DESCRIBE, `/** HyperUnix SDK custody: proves the hx child process is terminated on abort. */\n${HX_DESCRIBE}`), 2],
      ["U4(b) regular-expression literal", plantedText(text, K3_REJECTS, K3_REJECTS.replace('{ category: "transport" }', '{ category: "transport", message: /cancelled|terminated/ }')), 1],
      ["identifier word", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    const childTerminated = native.rows.length === 0;`), 1],
      ["HX-naming comment elsewhere", `${text}\n// HX custody: the hx child is terminated on abort.\n`, 1],
      ["zero-width split word", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child is termi${String.fromCodePoint(0x200b)}nated here`), 1],
      ["escaped regular-expression literal", plantedText(text, K3_REJECTS, K3_REJECTS.replace('{ category: "transport" }', '{ category: "transport", message: /termin\\x61ted/ }')), 1],
      ["combining-grapheme-joiner split word", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child is termi${String.fromCodePoint(0x34f)}nated here`), 1],
    ];
    expect({
      selected: titles.length >= 1,
      silent: titles.filter(title => termsIn(title).length === 0),
      rfSignals: rfSignals.length > 0,
      unnamed: rfSignals.filter(signal => !named.has(signal)),
      comments: comments.length >= 1 && comments.every(comment => comment.startsWith("//") || comment.startsWith("/*")),
      corpus: prose.length >= 1 && corpusWords.length >= 4,
      unlisted: corpusWords.filter(word => !vocabulary.has(word)),
      caught: plants.map(([id, planted]) => `${id}:${plantedSuiteHits(planted).length}`),
    }).toStrictEqual({
      selected: true,
      silent: [],
      rfSignals: true,
      unnamed: [],
      comments: true,
      corpus: true,
      unlisted: [],
      caught: plants.map(([id, , count]) => `${id}:${count}`),
    });
  });

  it("C5 Pi delegates: the HyperUnix provider disposes from its abort listener and awaits close in its finally block, carries none of C7's F1-F4 shapes, names no signal as a SIG* literal or identifier and names the child_process module in no string or template literal", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(PROVIDER);
    const lifecycle = providerLifecycle(source);
    expect({
      lifecycle: { onAbort: [...lifecycle.onAbort], inFinally: [...lifecycle.inFinally], removesListener: lifecycle.removesListener, listener: lifecycle.listener !== undefined },
      shapes: falsifierShapes(source).map(hit => `${hit.shape}:${hit.line} (${hit.form})`),
      signals: signalNames(source),
      childProcess: childProcessNames(source),
    }).toStrictEqual({ lifecycle: { onAbort: ["dispose"], inFinally: ["close"], removesListener: true, listener: true }, shapes: [], signals: [], childProcess: [] });
  });

  it("C5 calibration: a dynamic import or created require of child_process, a signals constant, a destructured pid with an element-key kill and a direct kill each read in the provider reading as what they are", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(PROVIDER);
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["U3 dynamic import", `${text}\nexport const loadChildProcess = () => ${LOAD}("node:child_process");\n`],
      ["created require", `${text}\nexport const cp = createRequire(import.meta.url)("child_process");\n`],
      ["signals constant", `${text}\nexport const signal = constants.signals.SIGTERM;\n`],
      ["destructured pid, element-key kill", plantedText(text, ON_ABORT, 'const onAbort=()=>{client.dispose();const {pid}=client as unknown as {pid:number};process["kill"](-pid);};')],
      ["direct kill", plantedText(text, ON_ABORT, "const onAbort=()=>{client.dispose();process.kill(-(client as unknown as {pid:number}).pid);};")],
    ];
    const readings = plants.map(([id, planted]) => {
      const source = parseText("planted-provider.ts", planted);
      return { id, childProcess: childProcessNames(source), signals: signalNames(source), shapes: shapeForms(falsifierShapes(source)) };
    });
    expect(readings).toStrictEqual([
      { id: "U3 dynamic import", childProcess: ["node:child_process"], signals: [], shapes: [] },
      { id: "created require", childProcess: ["child_process"], signals: [], shapes: [] },
      { id: "signals constant", childProcess: [], signals: ["SIGTERM"], shapes: [] },
      { id: "destructured pid, element-key kill", childProcess: [], signals: [], shapes: ["F1:element key", "F2:destructuring"] },
      { id: "direct kill", childProcess: [], signals: [], shapes: ["F1:member", "F2:member"] },
    ]);
  });

  it("C6 SDK-owned termination: in the installed SDK transport the functions holding a group kill as process.kill(-<x>.pid, ...) are exactly runHx and streamHx, the abort listener of each reaches its group kill through the function's own closures, and every string signal argument of a kill call in it or the RF provider is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
    const sdk = parse(SDK_TRANSPORT);
    const reading = abortReading(sdk);
    const sdkKills = killedWith(sdk);
    const rfKills = killedWith(parse(RF_PROVIDER));
    const prose = sdkTerminationProse(sdk);
    expect({
      reached: reading.map(entry => `${entry.owner}:${entry.listeners}:${entry.reached}`),
      signalsSent: sdkKills.signals.length > 0 && rfKills.signals.length > 0,
      outsideW2: [...sdkKills.signals, ...rfKills.signals].filter(signal => !termsOfRow("W2").includes(signal)),
      outsideW3: [...sdkKills.names, ...rfKills.names].filter(name => !termsOfRow("W3").includes(name)),
      documented: prose.length >= 1 && prose.every(doc => termsIn(doc).length > 0),
    }).toStrictEqual({ reached: ["runHx:1:true", "streamHx:1:true"], signalsSent: true, outsideW2: [], outsideW3: [], documented: true });
  });

  it("C6 calibration: an SDK copy whose abort listeners no longer reach the group kill reads unreached, and an alias, call or bind hop still reads reached", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(SDK_TRANSPORT);
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["U5 abort cut from the kill", unreachedTransport(text)],
      ["alias hop", plantedText(text, ABORT_RUN, `const halt = stop;\n        ${ABORT_RUN.replace("=> stop(", "=> halt(")}`)],
      ["call hop", plantedText(text, ABORT_RUN, ABORT_RUN.replace("=> stop(", "=> stop.call(undefined, "))],
      ["bind hop", plantedText(text, ABORT_RUN, 'const abort = stop.bind(undefined, new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED"));')],
    ];
    const readings = plants.map(([id, planted]) => ({ id, reached: abortReading(parseText("planted-cli.js", planted)).map(entry => `${entry.owner}:${entry.listeners}:${entry.reached}`) }));
    expect(readings).toStrictEqual([
      { id: "U5 abort cut from the kill", reached: ["runHx:1:false", "streamHx:1:false"] },
      { id: "alias hop", reached: ["runHx:1:true", "streamHx:1:true"] },
      { id: "call hop", reached: ["runHx:1:true", "streamHx:1:true"] },
      { id: "bind hop", reached: ["runHx:1:true", "streamHx:1:true"] },
    ]);
  });

  it("C7 no hand-rolled kill falsifier: no test or qa file whose text, raw or unescaped, holds the needle hyperunix (any case) and that the classifier's driving forms class as driving HX (a value import, export or import-equals of an HX module, a LOADERS call whose specifier is a literal or const-bound - every const declaration of its name read, fail-closed - a hyperunix.find invoke, or a HYPERUNIX_HX override form) carries an F1-F4 shape in a form the header enumerates, a wrapped command read fail-closed past its wrapper", { timeout: CENSUS_TIMEOUT }, () => {
    const { sources, judged } = judgedDrivers();
    const paths = judged.map(entry => entry.path);
    expect({
      floor: judged.length >= JUDGED_FLOOR,
      anchored: [LIFECYCLE, "test/workbench-hyperunix-observer.test.ts", "test/workbench-hyperunix-graduation-vocabulary-census.test.ts"].every(path => paths.includes(path)),
      selfExcluded: !paths.includes(SELF) && sources.includes(SELF),
      hits: judged.flatMap(entry => entry.hits.map(hit => `${entry.path}:${hit.line} ${hit.shape} (${hit.form})`)),
    }).toStrictEqual({ floor: true, anchored: true, selfExcluded: true, hits: [] });
  });

  it("C7 calibration: the detector finds the SDK transport's and the RF provider's kill code and every planted member, refusal #1's, #2's and #3's among them, in its own shape and form, and the classifier classes each driving form, a const-bound, const-shadowed, escaped or node_modules-path specifier and an env-call override among them, each passing the prefilter, but never a capability-id or override data literal, a module mock, a type-only import or a type position alone", { timeout: CENSUS_TIMEOUT }, () => {
    const sdk = shapeCounts(falsifierShapes(parse(SDK_TRANSPORT)));
    const rf = shapeCounts(falsifierShapes(parse(RF_PROVIDER)));
    const falsifiers = FALSIFIER_PLANTS.map(plant => {
      const source = parseText("planted-falsifier.test.ts", `${HX_HEAD}${plant.code}\n`);
      return { id: plant.id, drivers: hxDrivers(source), shapes: shapeForms(falsifierShapes(source)) };
    });
    const drivers = DRIVER_PLANTS.map(plant => ({ id: plant.id, reasons: hxDrivers(parseText("planted-driver.test.ts", `${plant.code}\n`)), prefiltered: passesPrefilter(plant.code) }));
    expect({
      sdk: { F1: (sdk.F1 ?? 0) > 0, F2: (sdk.F2 ?? 0) > 0, F4: (sdk.F4 ?? 0) > 0 },
      rf: (rf.F1 ?? 0) > 0,
      falsifiers,
      drivers,
      lifecycle: hxDrivers(parse(LIFECYCLE)),
    }).toStrictEqual({
      sdk: { F1: true, F2: true, F4: true },
      rf: true,
      falsifiers: FALSIFIER_PLANTS.map(plant => ({ id: plant.id, drivers: ["import"], shapes: [...plant.shapes] })),
      drivers: DRIVER_PLANTS.map(plant => ({ id: plant.id, reasons: [...plant.reasons], prefiltered: true })),
      lifecycle: ["import", "invoke", "override"],
    });
  });

  it("C8 docs: every .md page under docs/workbench, read in the header's view of what marked renders and a browser shows (comments, tags and Default_Ignorable code points render nothing, character references decode, units split into clauses), is a modelled page with no clause pairing the HX side with a vocabulary term unless it names the upstream HXGC-OPS-002 artifact", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = docsReading();
    expect({
      files: reading.files.length >= 50,
      refusals: reading.refusals,
      hits: reading.clauses.filter(clause => isDocsHit(clause.text)).map(clause => `${clause.file} [clause ${clause.index}] [${termsIn(clause.text).join(", ")}] ${clause.text}`),
    }).toStrictEqual({ files: true, refusals: [], hits: [] });
  });

  it("C8 calibration: the same view finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs, reads every planted page exactly as the view models it (a combining grapheme joiner, its reference and a variation selector render nothing, a Hangul filler renders a blank), and refuses an unmodelled element or a hiding attribute", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = docsReading();
    const rfTermination = reading.clauses.filter(clause => clause.file === TRACEABILITY && RF_SIDE.test(clause.text) && termsIn(clause.text).length > 0);
    const hx = reading.clauses.filter(clause => HX_SIDE.test(clause.text));
    expect({
      rfTermination: rfTermination.length >= 1,
      hx: hx.length >= 50,
      hxInTraceability: hx.some(clause => clause.file === TRACEABILITY),
      plants: PAGE_PLANTS.map(plant => ({ id: plant.id, ...pageHits(plant.markdown) })),
    }).toStrictEqual({
      rfTermination: true,
      hx: true,
      hxInTraceability: true,
      plants: PAGE_PLANTS.map(plant => ({ id: plant.id, hits: [...plant.hits], refusals: [...plant.refusals] })),
    });
  });

  it("C9 run pin: the run pin's literals name the HX suite, every frozen case title, this file's suite and every case of this file, and each residual row's title is its RESIDUALS entry", { timeout: CENSUS_TIMEOUT }, () => {
    const pinned = new Set(literalTexts(parse(RUN_PIN)));
    const self = parse(SELF);
    const suites = registrationsIn(self).filter(entry => entry.root === "describe");
    const own = registrationsIn(self).filter(entry => entry.root === "it");
    const needed = [HX_SUITE, ...CASES.map(row => row.title), ...suites.map(entry => entry.title), ...own.map(entry => entry.title)];
    expect({
      suites: suites.map(entry => entry.title),
      cases: own.length,
      residualRows: own.filter(entry => entry.title.startsWith("R-")).map(entry => entry.title),
      unpinned: needed.filter(title => !pinned.has(title)),
    }).toStrictEqual({ suites: [SUITE], cases: 45, residualRows: RESIDUALS.map(residualTitle), unpinned: [] });
  });

  // ---- residual rows: each plants a member of its family, shows the reader quiet on it, and shows the same reader catching a control ----

  it("R-WORDING (C4 C8): a termination claim worded outside the vocabulary, or split across a literal concatenation or a template substitution, reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const quiet = plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child stops here and the process is gone\n    const note = "termi" + "nated";\n` + "    const later = `termi" + "$" + '{""}nated`;');
    const loud = plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child is terminated here`);
    expect({
      quiet: plantedSuiteHits(quiet),
      loud: plantedSuiteHits(loud).length,
      docsQuiet: pageHits("HX children stop and are gone after abort.").hits,
      docsLoud: pageHits("HX children are terminated after abort.").hits.length,
    }).toStrictEqual({ quiet: [], loud: 1, docsQuiet: [], docsLoud: 1 });
    RAN.add(residualNamed("R-WORDING").id);
  });

  it("R-UNANCHORED (frozen shape): a coordinated hollow of a vocabulary term no outside anchor holds, or of an instrument or calibration table member whose own literals are its only anchor, stays green", { timeout: CENSUS_TIMEOUT }, () => {
    const sdk = parse(SDK_TRANSPORT);
    const rf = parse(RF_PROVIDER);
    const anchors = new Set(
      [...Object.keys(constants.signals), ...killedWith(sdk).signals, ...killedWith(sdk).names, ...killedWith(rf).signals, ...killedWith(rf).names, ...[...noncooperativeTitles(parse(LIFECYCLE)), ...sdkTerminationProse(sdk)].flatMap(stemWordsIn)].map(
        normalized,
      ),
    );
    const hollowedNearMisses = NEAR_MISSES.filter(word => word !== "reaper");
    expect({
      unanchored: TERMS.filter(term => !anchors.has(normalized(term))),
      nearMissHollow: { kept: hollowedNearMisses.length, quietBroken: hollowedNearMisses.filter(word => termsIn(word).length > 0) },
    }).toStrictEqual({ unanchored: UNANCHORED, nearMissHollow: { kept: NEAR_MISSES.length - 1, quietBroken: [] } });
    RAN.add(residualNamed("R-UNANCHORED").id);
  });

  it("R-SHAPELESS (C7): a falsifier written without the four shapes (a timing deadline, a poll of an SDK counter, a ChildProcess state read, a process package called under another name) reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText(
      "planted-falsifier.test.ts",
      `${HX_HEAD}${[
        "export async function settled(client: { liveChildren(): number }) { const start = Date.now(); await new Promise(done => setTimeout(done, 100)); return client.liveChildren() === 0 && Date.now() - start < 5000; }",
        "export const gone = (child: { killed: boolean; exitCode: number | null; signalCode: string | null }) => child.killed || child.exitCode !== null || child.signalCode !== null;",
        'import treeKill from "tree-kill";',
        "export const reap = (id: number) => treeKill(id);",
      ].join("\n")}\n`,
    );
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const alive = (child: { pid: number }) => process.kill(child.pid, 0);\n`);
    expect({ drivers: hxDrivers(quiet), quiet: shapeForms(falsifierShapes(quiet)), loud: shapeForms(falsifierShapes(loud)) }).toStrictEqual({ drivers: ["import"], quiet: [], loud: ["F1:member", "F2:member"] });
    RAN.add(residualNamed("R-SHAPELESS").id);
  });

  it("R-COMPOSED (C4 C5 C7): a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet, and so does a vocabulary term spelled through a class inside a regular expression in the suite", { timeout: CENSUS_TIMEOUT }, () => {
    const composed = [
      'export const probe = (id: number) => (process as unknown as Record<string, (n: number, s: number) => void>)[["ki", "ll"].join("")]?.(id, 0);',
      'export const idOf = (child: Record<string, number>) => child["p" + "id"];',
      'export const table = (id: number) => readFileSync(["", "pr" + "oc", String(id)].join("/"));',
      'export const tool = () => spawnSync("p" + "s");',
      'export const gone = (error: { code?: string }) => error.code === "ES" + "RCH";',
      "export const NO_SUCH_PROCESS = /ES[R]CH/;",
    ];
    const plain = [
      "export const probe = (id: number) => process.kill(id, 0);",
      "export const idOf = (child: { pid: number }) => child.pid;",
      "export const table = (id: number) => readFileSync(`/proc/$" + "{id}`);",
      'export const tool = () => spawnSync("ps");',
      'export const gone = (error: { code?: string }) => error.code === "ESRCH";',
    ];
    const quiet = parseText("planted-falsifier.test.ts", `${HX_HEAD}${composed.join("\n")}\n`);
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}${plain.join("\n")}\n`);
    const quietProvider = parseText("planted-provider.ts", `export const signal = "SIG" + "TERM";\nexport const load = () => ${LOAD}("node:child" + "_process");\n`);
    const loudProvider = parseText("planted-provider.ts", `export const signal = "SIGTERM";\nexport const load = () => ${LOAD}("node:child_process");\n`);
    const lifecycle = read(LIFECYCLE);
    expect({
      quiet: shapeForms(falsifierShapes(quiet)),
      loud: shapeForms(falsifierShapes(loud)),
      quietProvider: [...signalNames(quietProvider), ...childProcessNames(quietProvider)],
      loudProvider: [...signalNames(loudProvider), ...childProcessNames(loudProvider)],
      quietSuite: plantedSuiteHits(plantedText(lifecycle, K2_ANCHOR, `${K2_ANCHOR}\n    void /termi[n]ated on abort/;`)),
      loudSuite: plantedSuiteHits(plantedText(lifecycle, K2_ANCHOR, `${K2_ANCHOR}\n    void /terminated on abort/;`)).length > 0,
    }).toStrictEqual({
      quiet: [],
      loud: ["F1:member", "F2:member", "F3:/proc path", "F3:process-table command", "F4:literal"],
      quietProvider: [],
      loudProvider: ["SIGTERM", "node:child_process"],
      quietSuite: [],
      loudSuite: true,
    });
    RAN.add(residualNamed("R-COMPOSED").id);
  });

  it("R-ERRNO (C7): ESRCH by its errno number reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const gone = (error: { errno?: number }) => error.errno === -3;\n`);
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const gone = (error: { code?: string }) => error.code === "ESRCH";\n`);
    expect({ quiet: shapeForms(falsifierShapes(quiet)), loud: shapeForms(falsifierShapes(loud)) }).toStrictEqual({ quiet: [], loud: ["F4:literal"] });
    RAN.add(residualNamed("R-ERRNO").id);
  });

  it("R-UNDRIVEN (C7): a falsifier in a test or qa file that imports HX modules only by type or not at all, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged", { timeout: CENSUS_TIMEOUT }, () => {
    const body = "export const alive = (pid: number) => { process.kill(pid, 0); return true; };\n";
    const helper = parseText("planted-helper.ts", body);
    const typed = parseText("planted-typed.test.ts", `import type { HyperUnixReader } from "${PROVIDER_MODULE}";\nexport type Reader = HyperUnixReader;\n${body}`);
    const driven = parseText("planted-driven.test.ts", `${HX_HEAD}${body}`);
    expect({ helper: hxDrivers(helper), typed: hxDrivers(typed), shapes: shapeForms(falsifierShapes(helper)), driven: hxDrivers(driven) }).toStrictEqual({ helper: [], typed: [], shapes: ["F1:member"], driven: ["import"] });
    RAN.add(residualNamed("R-UNDRIVEN").id);
  });

  it("R-ARGUMENTS (C1 C2): C1 freezes each assertion's subject and chain, not its arguments, so a vacuous argument reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const base = suiteReading(parse(LIFECYCLE));
    const k2Assertion = 'expect(result).toMatchObject({source:{status:{exit_code:3},coverage_summary:{licenses_absence:false,completeness:"incomplete"}}});';
    const vacuous = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, k2Assertion, "expect(result).toMatchObject({});")));
    const matcher = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, k2Assertion, k2Assertion.replace("toMatchObject", "toEqual"))));
    expect({
      quiet: JSON.stringify([vacuous.cases, vacuous.violations]) === JSON.stringify([base.cases, base.violations]),
      loud: matcher.cases[1]?.pins,
    }).toStrictEqual({ quiet: true, loud: ["result.toEqual"] });
    RAN.add(residualNamed("R-ARGUMENTS").id);
  });

  it("R-RUNTIME (C1 C2 C3): an exit before an assertion reads quiet in the static rows: before a case's first assertion the run pin sees it, and between two assertions no row does (judge() needs one assertion reached)", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const base = suiteReading(parse(LIFECYCLE));
    const early = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, K2_HEAD, `${K2_HEAD}\n    if (process.cwd().length > 0) return;`)));
    const between = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, K1_UNCALLED, `${K1_UNCALLED}\n    if (process.cwd().length > 0) return;`)));
    const member = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, K2_HEAD, K2_HEAD.replace('it("', 'it.fails("'))));
    expect({ quiet: [early, between].map(reading => JSON.stringify(reading) === JSON.stringify(base)), loud: member.departures.length }).toStrictEqual({ quiet: [true, true], loud: 1 });
    RAN.add(residualNamed("R-RUNTIME").id);
  });

  it("R-DEAD-PATH (C5 C6): a dispose, close or group kill reached syntactically behind a dead branch or an early return reads made", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(SDK_TRANSPORT);
    const dead = plantedText(
      plantedText(text, ABORT_RUN, 'const abort = () => { if (Date.now() < 0) stop(new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED")); };'),
      ABORT_STREAM,
      "const abort = () => { return; stop(); };",
    );
    const reading = (planted: string): string[] => abortReading(parseText("planted-cli.js", planted)).map(entry => `${entry.owner}:${entry.reached}`);
    const provider = read(PROVIDER);
    const onAbort = (replacement: string): readonly string[] => providerLifecycle(parseText("planted-provider.ts", plantedText(provider, ON_ABORT, replacement))).onAbort;
    expect({
      quiet: reading(dead),
      loud: reading(unreachedTransport(text)),
      quietDispose: onAbort("const onAbort=()=>{if(Date.now()<0)client.dispose();};"),
      loudDispose: onAbort("const onAbort=()=>undefined;"),
    }).toStrictEqual({ quiet: ["runHx:true", "streamHx:true"], loud: ["runHx:false", "streamHx:false"], quietDispose: ["dispose"], loudDispose: [] });
    RAN.add(residualNamed("R-DEAD-PATH").id);
  });

  it("R-CLAUSE (C8): a claim whose HX side and term fall in different clauses reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    expect({
      quiet: [...pageHits("HX owns the read. The child is terminated by the SDK.").hits, ...pageHits("HyperUnix (cf. Sec. 4) terminates its child processes.").hits],
      loud: pageHits("HX children are terminated by the SDK.").hits,
    }).toStrictEqual({
      quiet: [],
      loud: ["HX children are terminated by the SDK."],
    });
    RAN.add(residualNamed("R-CLAUSE").id);
  });

  it("R-CITATION (C8): a clause naming HXGC-OPS-002 is trusted (the on-landing census judges the citation)", { timeout: CENSUS_TIMEOUT }, () => {
    expect({ quiet: pageHits(`HX children are terminated on abort (${UPSTREAM}).`).hits, loud: pageHits("HX children are terminated on abort.").hits }).toStrictEqual({
      quiet: [],
      loud: ["HX children are terminated on abort."],
    });
    RAN.add(residualNamed("R-CITATION").id);
  });

  it("R-REFERENCE (C8): a named character reference beyond the six reads as written (none spells a vocabulary letter, but a space or format reference such as &ensp; or &shy; can split a term)", { timeout: CENSUS_TIMEOUT }, () => {
    expect({
      quiet: [...pageHits("HX owns each child&ensp;process.").hits, ...pageHits("HX children are termi&shy;nated on abort.").hits],
      loud: pageHits("HX owns each child&nbsp;process.").hits,
      letters: TERMS.filter(term => term.toLowerCase().includes("fj")),
    }).toStrictEqual({ quiet: [], loud: ["HX owns each child process."], letters: [] });
    RAN.add(residualNamed("R-REFERENCE").id);
  });

  it("R-LOOKALIKE (C4 C8): a look-alike letter from another script reads as itself", { timeout: CENSUS_TIMEOUT }, () => {
    const cyrillicE = String.fromCodePoint(0x435);
    const text = read(LIFECYCLE);
    expect({
      docsQuiet: pageHits(`HX children are terminat${cyrillicE}d on abort.`).hits,
      docsLoud: pageHits("HX children are terminated on abort.").hits.length,
      suiteQuiet: plantedSuiteHits(plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child is terminat${cyrillicE}d here`)),
      suiteLoud: plantedSuiteHits(plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child is terminated here`)).length,
    }).toStrictEqual({ docsQuiet: [], docsLoud: 1, suiteQuiet: [], suiteLoud: 1 });
    RAN.add(residualNamed("R-LOOKALIKE").id);
  });

  it("R-ATTRIBUTE (C8): attribute text a browser can show (a link title, an image alt) is not read", { timeout: CENSUS_TIMEOUT }, () => {
    expect({
      quiet: pageHits('[HX docs](x.md "HX children are terminated") and ![HX children are terminated](x.png)').hits,
      loud: pageHits("[HX children are terminated](x.md)").hits,
    }).toStrictEqual({ quiet: [], loud: ["HX children are terminated"] });
    RAN.add(residualNamed("R-ATTRIBUTE").id);
  });

  it("R-SCOPE (C8): a page outside docs/workbench is not read", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = docsReading();
    const rootPages = readdirSync(ROOT)
      .filter(name => name.endsWith(".md"))
      .sort();
    expect({ walked: reading.files.every(file => file.startsWith(`${DOCS}/`)), rootPages: rootPages.length >= 1, read: rootPages.filter(page => reading.files.includes(page)) }).toStrictEqual({
      walked: true,
      rootPages: true,
      read: [],
    });
    RAN.add(residualNamed("R-SCOPE").id);
  });

  it("R-DETACHED-COMMENT (C4): a comment outside the suite's statement that names no HX side reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    expect({
      quiet: plantedSuiteHits(plantedText(text, "function deferred<T>() {", "// the child is terminated on abort\nfunction deferred<T>() {")),
      loud: plantedSuiteHits(plantedText(text, "function deferred<T>() {", "// the hx child is terminated on abort\nfunction deferred<T>() {")).length,
    }).toStrictEqual({ quiet: [], loud: 1 });
    RAN.add(residualNamed("R-DETACHED-COMMENT").id);
  });

  it("R-WRAPPER (C7): a process-table tool run through a word outside WRAPPERS, SHELL_KEYWORDS and SHELLS, by a script file a shell runs, or inside another language's inline program reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText(
      "planted-falsifier.test.ts",
      `${HX_HEAD}${EXEC_HEAD}${[
        'export const viaUnread = (): Buffer => execSync("nsenter -t 1 ps -p 1");',
        'export const viaScript = (): Buffer => execSync("bash ./probe-children.sh");',
        `export const viaProgram = (): Buffer => execSync('python3 -c "import os; os.kill(1, 0)"');`,
        'export const viaRedirect = (): Buffer => execSync(">/dev/null ps -p 1");',
      ].join("\n")}\n`,
    );
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}${EXEC_HEAD}export const probe = (): Buffer => execSync("timeout 5 ps -p 1");\n`);
    expect({ drivers: hxDrivers(quiet), quiet: shapeForms(falsifierShapes(quiet)), loud: shapeForms(falsifierShapes(loud)) }).toStrictEqual({ drivers: ["import"], quiet: [], loud: ["F3:process-table command"] });
    RAN.add(residualNamed("R-WRAPPER").id);
  });

  it("R-INDIRECT (C2 C7): a module specifier, override name, capability id or member name reached through anything but a literal or a const binding chain to one (a let binding, an object member, a parameter, an imported binding), a loader, invoke or environment call reached through call, apply or Reflect.apply, or a module named through a configured alias (package imports, a vitest alias) reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const body = "export const alive = (child: { pid: number }): boolean => { process.kill(child.pid, 0); return true; };\n";
    const quietDriver = parseText(
      "planted-driver.test.ts",
      [
        `let SDK = "${SDK_MODULE}";\nSDK = SDK.trim();\nexport const load = () => ${LOAD}(SDK);\nconst MODULES = { sdk: "${SDK_MODULE}" };\nexport const loadAgain = () => ${LOAD}(MODULES.sdk);`,
        `import { SDK_NAME } from "./hx-names.js";\nexport const loadImported = () => ${LOAD}(SDK_NAME);`,
        `export const viaCall = () => require.call(undefined, "${SDK_MODULE}");`,
        `export const viaInvoke = () => registry.invoke.call(registry, "${CAPABILITY_ID}", { kind: "x" }, context);`,
        `export const viaApply = () => Reflect.apply(vi.stubEnv, vi, ["${OVERRIDE}", "/bin/false"]);`,
        `export const viaAlias = () => ${LOAD}("#hx-sdk");`,
        body,
      ].join("\n"),
    );
    const loudDriver = parseText("planted-driver.test.ts", `const SDK = "${SDK_MODULE}";\nexport const load = () => ${LOAD}(SDK);\n${body}`);
    const quietShape = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const read = (child: Record<string, number>, key: string) => child[key];\n`);
    const loudShape = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const read = (child: { pid: number }) => child.pid;\n`);
    const lifecycle = read(LIFECYCLE);
    const mocked = (binding: string): string[] =>
      suiteReading(parseText("planted-lifecycle.test.ts", plantedText(lifecycle, "function deferred<T>() {", `${binding}\nvi.${"mock"}(target, async importOriginal => await importOriginal());\nfunction deferred<T>() {`))).mocks.map(
        entry => entry.split(" ")[0] ?? "",
      );
    expect({
      quietDriver: hxDrivers(quietDriver),
      loudDriver: hxDrivers(loudDriver),
      quietShape: shapeForms(falsifierShapes(quietShape)),
      loudShape: shapeForms(falsifierShapes(loudShape)),
      quietMock: mocked(`let target = "${PROVIDER_MODULE}";\ntarget = target.trim();`),
      loudMock: mocked(`const target = "${PROVIDER_MODULE}";`),
    }).toStrictEqual({ quietDriver: [], loudDriver: ["import"], quietShape: [], loudShape: ["F2:member"], quietMock: [], loudMock: [`vi.${"mock"}(${PROVIDER_MODULE})`] });
    RAN.add(residualNamed("R-INDIRECT").id);
  });

  it("R-DATA-OVERRIDE (C7): the HYPERUNIX_HX name passed only as data (an array or entries element, an argument of a call outside ENV_CALLS and ENV_METHODS) classes nothing", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText(
      "planted-driver.test.ts",
      `export const env = Object.fromEntries([["${OVERRIDE}", "/bin/false"]]);\nexport const named = (keys: string[]) => keys.includes("${OVERRIDE}");\nexport const alive = (child: { pid: number }) => process.kill(child.pid, 0);\n`,
    );
    const loud = parseText("planted-driver.test.ts", `export const useHx = (bin: string) => vi.stubEnv("${OVERRIDE}", bin);\n`);
    expect({ quiet: hxDrivers(quiet), loud: hxDrivers(loud) }).toStrictEqual({ quiet: [], loud: ["override"] });
    RAN.add(residualNamed("R-DATA-OVERRIDE").id);
  });

  it("R-DEFINITION (C7): a kill or pid named only as a defined key (an object-literal property, a method, a class or type member) is no read and reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const child = { pid: 1, kill: () => true };\nexport interface Child { pid: number; kill(): void }\nexport class Fake { pid = 1; kill(): void {} }\n`);
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const id = (child: { pid: number }) => child.pid;\n`);
    expect({ quiet: shapeForms(falsifierShapes(quiet)), loud: shapeForms(falsifierShapes(loud)) }).toStrictEqual({ quiet: [], loud: ["F2:member"] });
    RAN.add(residualNamed("R-DEFINITION").id);
  });

  it("R-ELSEWHERE (C2): a stub or module mock installed outside the lifecycle file (a setup file, the vitest config, a module the file imports) is not read", { timeout: CENSUS_TIMEOUT }, () => {
    const setup = parseText("test/helpers/planted-setup.ts", 'import { vi } from "vitest";\nvi.spyOn(JSON, "parse").mockReturnValue({});\n');
    expect({ quiet: suiteReading(parse(LIFECYCLE)).tampers, loud: tampersIn(setup).map(entry => entry.split(" :")[0] ?? "") }).toStrictEqual({ quiet: [], loud: ["vi.spyOn(JSON)"] });
    RAN.add(residualNamed("R-ELSEWHERE").id);
  });

  it("R-HELPER-REGISTRATION (C1): a case registered through a function called from the suite is outside C1's static reading (the run pin's exact-collection row reads the report)", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const helper = 'function extraCase(): void {\n  it("an extra case", () => {});\n}\n';
    const quiet = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, HX_DESCRIBE, `${helper}${HX_DESCRIBE}\n  extraCase();`)));
    const loud = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, HX_DESCRIBE, `${HX_DESCRIBE}\n  it("an extra case", () => {});`)));
    expect({ quiet: quiet.cases.map(entry => entry.title), departures: quiet.departures, loud: loud.cases.map(entry => entry.title) }).toStrictEqual({
      quiet: CASES.map(row => row.title),
      departures: [],
      loud: ["an extra case", ...CASES.map(row => row.title)],
    });
    RAN.add(residualNamed("R-HELPER-REGISTRATION").id);
  });

  it("R-GROUP-FORM (C6): a group kill spelled other than process.kill(-<x>.pid, ...) is not read", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(SDK_TRANSPORT);
    const reading = (planted: string): string[] => abortReading(parseText("planted-cli.js", planted)).map(entry => `${entry.owner}:${entry.listeners}:${entry.reached}`);
    expect({
      quiet: reading(`${text}\nfunction reapGroup(child) { const group = -child.pid; process.kill(group, "SIGKILL"); }\n`),
      loud: reading(`${text}\nfunction reapGroup(child) { process.kill(-child.pid, "SIGKILL"); }\n`),
    }).toStrictEqual({ quiet: ["runHx:1:true", "streamHx:1:true"], loud: ["runHx:1:true", "streamHx:1:true", "reapGroup:0:false"] });
    RAN.add(residualNamed("R-GROUP-FORM").id);
  });

  it("R-BIDI (C8): text a browser lays out right to left (a bdo element, a dir attribute, or a run of bidi controls, which the view drops as Default_Ignorable) is read in its logical order, so a claim stored reversed reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const reversed = ".detanimret era nerdlihc XH";
    const quiet = [`Note: <bdo dir="rtl">${reversed}</bdo>`, `Note: <span dir="rtl">${reversed}</span>`, `Note: ${String.fromCodePoint(0x202e)}${reversed}${String.fromCodePoint(0x202c)}`].map(page => pageHits(page));
    const loud = pageHits('Note: <bdo dir="ltr">HX children are terminated.</bdo>');
    expect({ quiet: quiet.map(reading => [...reading.hits, ...reading.refusals]), loud: [...loud.hits, ...loud.refusals] }).toStrictEqual({ quiet: [[], [], []], loud: ["Note: HX children are terminated."] });
    RAN.add(residualNamed("R-BIDI").id);
  });

  it("records: every residual row ran its own case to its end", () => {
    expect([...RAN].sort()).toStrictEqual(RESIDUALS.map(residual => residual.id).sort());
  });
});
