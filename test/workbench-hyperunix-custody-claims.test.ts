/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY, cut #2 (the respin of refusal #1, gate-prep-19 / g10-gate-s126,
 * gate-refused M:30519): the HyperUnix custody-claims census. Pi's dispose/close custody tests for the HX SDK prove the CALLS, never
 * the termination, and no Pi test or qa script hand-rolls a real-process kill falsifier for the HX child in place of the SDK-owned
 * conformance.
 *
 * Acceptance row pinned (bead wb-tz2.11): "Standing: the custody tests stay green and claim only call-custody, never real-child
 * termination." Statement halves pinned: Pi cites the receipt "beside its own dispose/close custody tests — which prove the
 * calls, not the termination — and shall not hand-roll a real-process kill falsifier in place of the SDK-owned conformance."
 * Rationale (the dossier's UNDETERMINED row child-process-cleanup-after-abort): "Pi calls dispose-on-abort and close-in-finally
 * ... proven against mocks only (... close-once :65, abort-dispose :83, close after abort :88)". This file judges the CLAIMS; the
 * "stay green" half is judged by its run pin, test/workbench-hyperunix-custody-claims.census.ts (report mode: the three custody
 * cases and every case of this file collected once, passed and asserting in the gate's own test report), which row C9 holds to
 * this file.
 * ON-LANDING LEG NOT IN SCOPE: a docs/workbench row citing the HX SDK cancellation/child-process-cleanup conformance receipt
 * (artifact id + hx sha), and the census that the citation names it, wait for that receipt (HXGC-OPS-002 reads status DESIGN in
 * HyperUnix-CLI's requirements.jsonl:12, with no sdk/conformance receipt). The bead stays open for that leg.
 *
 * VOCABULARY OF RECORD (termination claims, five rows): W1 the terminate family (HXGC-OPS-002 "terminate owned child-process
 * trees"; the SDK transport's own "the owned process tree is terminated"); W2 every signal name (anchored outside: every key of
 * node:os constants.signals on the running platform must be a W2 term); W3 the kill verb; W4 the reap family (the SDK client's
 * "drain-and-reap boundary"; Pi's RF case "reaps a child that ignores SIGTERM"); W5 the process objects. MATCH RULE (termPattern):
 * case-insensitive; a separator inside a term (a space, "-" or "_") matches any of the three; a hit never touches a letter or a
 * digit on either side, so "SIGKILL" carries no "kill", "terminal" no term and "skill" none.
 *
 * ROWS, each claiming exactly what it reads:
 * C1 CASES: the "HyperUnix SDK custody" suite of test/workbench-provider-lifecycle.test.ts registers exactly the three cases frozen
 * in CASES, in order, each with its frozen ordered assertion signatures (the expect subject and its chain); the suite and every
 * registration inside it is a bare call (no chained member), with exactly a title and an inline callback that takes no
 * parameter (so no options object and no test context), and no suite is nested inside it; describe, it, expect and vi are the
 * file's vitest imports, declared nowhere else in the file. CUSTODY maps the rationale's three claims onto the cases.
 * C2 CALL CUSTODY ONLY: every assertion in that suite is either a mock-call assertion (a toHaveBeenCalled* matcher, negated or not)
 * whose subject roots in a const stand-in declared once in the case and built from vi.fn / vi.spyOn, or an outcome assertion
 * (toMatchObject / toEqual / toStrictEqual, through rejects / resolves / not or not) whose subject is the provider's own result:
 * a direct nativeHyperUnixFind(...) call, a registry.invoke(...) call on a const registry declared once as new CapabilityRegistry()
 * and referenced only as that receiver or as a provider-entry argument (so no stand-in capability is registered on it), or an
 * identifier declared once by const with one of those calls as its initializer and referenced in the case only as an expect
 * subject (so a let binding, a reassignment, a re-declaration, a mutation or any other use of the subject reds). The provider's
 * entries, HyperUnix and CapabilityRegistry are the file's imports from their own modules, declared nowhere else, and the file
 * module-mocks none of the provider, the SDK and the registry modules; every vi.spyOn in the suite targets HyperUnix and the suite
 * stubs no global (so no spied global forges the provider's result); the suite makes no assert call.
 * C3 STAND-INS ONLY: every case stubs HyperUnix.open (the file's import from @hyperunix/sdk) with a mocked return before its first
 * provider call, so no case holds a real SDK client or a real child.
 * C4 NO TERMINATION CLAIM: the suite's title and case titles; every comment attached to or inside the suite's statement (from the
 * end of the statement before it to the end of the suite's last line, so a JSDoc placed before describe is the suite's); every
 * string literal, template part and regular-expression literal inside it; every identifier inside it, read as words (split at
 * camelCase humps and underscores); and every comment anywhere in the file that names the HX side - none carries a vocabulary
 * term, format characters (a zero-width space, a soft hyphen) dropped before matching.
 * C5 PI DELEGATES: src/workbench/providers/hyperunix.ts carries no falsifier shape (C7's F1-F4), names no signal (a SIG* string
 * literal or identifier, so a signals constant counts) and names the child_process module in no string or template literal (so
 * a static import, export, dynamic import, require call or created require of it all count); nativeHyperUnixFind disposes its client
 * from its abort listener and awaits client.close() in its finally block, removing the listener there.
 * C6 SDK-OWNED TERMINATION: in the installed SDK transport (node_modules/@hyperunix/sdk/dist/transport/cli.js, from the vendored
 * tarball), the functions that kill the owned process GROUP (process.kill on a negated child pid) are exactly runHx and streamHx,
 * and in each the abort listener reaches that group kill through the function's own closures: a call to a local function
 * (directly, through an alias binding, or through call / apply / bind) - abort -> stop -> kill -> process.kill(-child.pid). Every
 * signal literal it or Pi's RF provider passes to a kill call is a W2 term and every kill call's name a W3 term.
 * C7 NO HAND-ROLLED KILL FALSIFIER: no test/ or qa/ source that drives HX - one that loads an HX module (a static import, export
 * or import-equals, a dynamic import, require, a created require or vi.importActual of @hyperunix/sdk or the hyperunix provider or
 * observer module; a module mock alone loads nothing), invokes hyperunix.find through an invoke(...) call, or reads or sets the
 * HYPERUNIX_HX override (a member, element key, destructuring or object key; a bare data literal is no use) - carries a falsifier
 * shape: F1 a kill member read (.kill or ["kill"] on any receiver, called or not, so call / apply / bind of it count, a kill
 * destructured, destructuring-assigned or imported, a bare kill(...) call, or the literal "kill" outside a command); F2 a pid
 * member read (.pid or ["pid"], a pid destructured or destructuring-assigned, or the literal "pid"); F3 a process-table probe (a
 * /proc path in a string, template part or regular expression, or a command whose head - after VAR=value words, wrappers such as
 * env / timeout / sudo, and a shell's -c - is ps, pgrep, pkill, kill or killall by basename, so /bin/ps counts); F4 ESRCH (an
 * identifier, a member, or the word, in any case, in a string, template part or regular expression). A member key literal is read as its member
 * form, never as F3. This file is the one exclusion (it spells the detector).
 * C8 DOCS: every docs/workbench page is read as marked 18.0.11 (the repo's renderer) renders it to HTML and a browser's default
 * stylesheet shows that HTML: comments render nothing (including <!--> and <!---> and a comment ended by --!> or by the end of
 * the page), as do bogus comments, doctypes and every tag; the text of every element renders; character references are decoded
 * (every numeric one; named: amp, lt, gt, quot, apos, nbsp); format characters render nothing and white space collapses; each
 * block-level element and br ends a unit, and a unit splits into clauses at ";", "|", an em dash and sentence ends. A page holding
 * an element whose content a browser hides or does not show as text (HIDING_ELEMENTS) or an attribute that hides (hidden, popover,
 * style) is not modelled and is refused. No clause names the HX side together with a vocabulary term unless it names the
 * upstream artifact HXGC-OPS-002, the on-landing citation's form. C9 RUN PIN: the run pin's literals name the suite, every CASES
 * title, this file's suite and every case of this file.
 *
 * CURES OF REFUSAL #1 (each named in the delivery note): U1 C7 widened to binding-pattern and destructuring-assignment pid reads,
 * joined /proc segments, call / apply / bind of kill, absolute tool paths and ESRCH regular expressions (planted in C7
 * calibration); U2 hxDrivers no longer classes a file on a capability-id or override data literal (an invoke(...) call or an
 * override use is required); U3 C5 reads child_process in every string form; U4 C4 reads the suite statement's attached
 * comments, regular-expression literals and identifier words, and HX-naming comments file-wide; U5 C6 follows the abort listener
 * to the group kill; U6 the near misses (and every other table) are pinned element by element; U7 C8 judges the rendered view
 * above, in the scan and the calibration alike; U8 C2 refuses let, reassigned, re-declared and otherwise used subjects. F2: each
 * residual has its pinned row below. F4: a key literal reads as F1 / F2, never as F3.
 * OUTSIDE ANCHORS (standing rule 16, CT5 / CT6): C1 derives the suite's cases and signatures from the lifecycle file's own AST and
 * compares them with CASES both ways, and derives the lifecycle-call assertions CUSTODY must claim from it and from the
 * provider's AST (C5); C6 derives the signal names and the kill verb from the SDK's and the RF provider's kill calls; the matcher
 * row requires every node:os signal name to be a W2 term; the C4 calibration closes VOCABULARY over the RF termination titles and
 * the SDK transport's own termination JSDoc (STEM_WORDS, an instrument independent of VOCABULARY); C8 calibrates on the frozen
 * TRACEABILITY.md provider-custody row. R-UNANCHORED pins exactly the terms none of these anchors holds.
 * FROZEN SHAPE (standing rule 16): one row pins every table: VOCABULARY, CASES, CUSTODY, the matcher and subject sets, the
 * falsifier shapes and their words, the driver needles and reasons, the docs view's element, attribute and reference sets, the
 * near misses, the exclusions and the residual ids.
 * RESIDUALS (each a named family with its pinned row, R-* below; the row plants a member and shows the reader quiet on it beside a
 * control the same reader catches): R-WORDING, R-UNANCHORED, R-SHAPELESS, R-COMPOSED, R-ERRNO, R-UNDRIVEN, R-ARGUMENTS, R-RUNTIME,
 * R-DEAD-PATH, R-CLAUSE, R-CITATION, R-REFERENCE, R-LOOKALIKE, R-ATTRIBUTE, R-SCOPE, R-DETACHED-COMMENT (RESIDUALS names each
 * family; the records row requires every one to have run to its end).
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads sources and docs and parses planted text in memory.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { constants } from "node:os";
import { dirname, join } from "node:path";
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
/** Every string literal, no-substitution template, template head / middle / tail and regular-expression literal under a node. */
function literalTexts(scope: ts.Node): string[] {
  return descendants(scope).flatMap(node =>
    ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)
      ? [node.text]
      : [],
  );
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
  readonly root: string;
  /** The members chained between the root and the call (each, fails, todo, concurrent ...); empty for a bare call. */
  readonly members: readonly string[];
  readonly title: string;
}
function registrationOf(call: ts.CallExpression): Registration | undefined {
  const members: string[] = [];
  let callee: ts.Expression = call.expression;
  while (ts.isPropertyAccessExpression(callee) || ts.isCallExpression(callee)) {
    if (ts.isPropertyAccessExpression(callee)) members.unshift(callee.name.text);
    callee = callee.expression;
  }
  const head = call.arguments[0];
  if (!ts.isIdentifier(callee) || !REGISTRARS.has(callee.text) || head === undefined || !ts.isStringLiteralLike(head)) return undefined;
  return { call, root: callee.text, members, title: head.text };
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
    return [{ signature: `${prefix}${subjectText(subject)}.${chain.join(".")}`, subject, matcher: chain[chain.length - 1] ?? "<none>", flags: chain.slice(0, -1), line: lineOf(source, call) }];
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
/** The module-mock calls (assembled: this file spells none of its own) and the modules no custody file may mock. */
const MODULE_MOCKS: ReadonlySet<string> = new Set(["mock", "doMock"].map(member => `vi.${member}`));
const GUARDED_MODULES: readonly string[] = [SDK_MODULE, PROVIDER_MODULE, REGISTRY_MODULE];

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
/** Every module mock of a guarded module. */
function moduleMocks(source: ts.SourceFile): string[] {
  return callsIn(source).flatMap(call => {
    const specifier = stringArgument(call, 0);
    return MODULE_MOCKS.has(calleeText(call)) && specifier !== undefined && GUARDED_MODULES.includes(specifier) ? [`${calleeText(call)}(${specifier}) :${lineOf(source, call)}`] : [];
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
/** The HyperUnix.open stubs with a mocked return: vi.spyOn(HyperUnix, "open").mockReturnValue(...) and its kin. */
function openStubsIn(scope: ts.Node): ts.CallExpression[] {
  return callsIn(scope).filter(call => {
    if (!ts.isPropertyAccessExpression(call.expression) || !MOCKED_RETURNS.has(call.expression.name.text)) return false;
    const spy = call.expression.expression;
    if (!ts.isCallExpression(spy) || calleeText(spy) !== "vi.spyOn") return false;
    const [target, method] = spy.arguments;
    return target !== undefined && ts.isIdentifier(target) && target.text === "HyperUnix" && method !== undefined && ts.isStringLiteralLike(method) && method.text === "open";
  });
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
  readonly stubs: readonly { readonly title: string; readonly stubbed: boolean; readonly drives: boolean; readonly stubFirst: boolean }[];
}
function suiteReading(source: ts.SourceFile): SuiteReading {
  const suites = suitesNamed(source, HX_SUITE);
  const suite = suites[0];
  const inner = suite === undefined ? [] : registrationsIn(suite.call).filter(entry => entry.call !== suite.call);
  const cases = suite === undefined ? [] : casesOf(suite);
  return {
    suites: suites.map(callShape),
    nested: inner.filter(isSuiteRoot).map(entry => entry.title),
    departures: (suite === undefined ? [] : [suite, ...inner]).flatMap(entry => {
      const departure = formDeparture(entry);
      return departure === undefined ? [] : [departure];
    }),
    rebound: reboundNames(source),
    cases: cases.map(entry => ({ title: entry.title, call: callShape(entry), pins: assertionsIn(source, entry.call).map(assertion => assertion.signature) })),
    violations: cases.flatMap(entry =>
      assertionsIn(source, entry.call).flatMap(assertion => {
        const why = custodyViolation(assertion, entry.call);
        return why === undefined ? [] : [`${entry.title} :${assertion.line}: ${why}`];
      }),
    ),
    mocks: moduleMocks(source),
    tampers:
      suite === undefined
        ? []
        : callsIn(suite.call).flatMap(call => {
            const callee = calleeText(call);
            if (callee === "vi.stubGlobal") return [`vi.stubGlobal :${lineOf(source, call)}`];
            if (callee !== "vi.spyOn") return [];
            const [target] = call.arguments;
            return target !== undefined && ts.isIdentifier(target) && target.text === "HyperUnix" ? [] : [`vi.spyOn(${target?.getText() ?? ""}) :${lineOf(source, call)}`];
          }),
    asserts: suite === undefined ? [] : assertCallsIn(suite.call).map(call => `:${lineOf(source, call)}`),
    stubs: cases.map(entry => {
      const stubs = openStubsIn(entry.call).map(call => call.getStart());
      const drives = callsIn(entry.call)
        .filter(call => ts.isIdentifier(call.expression) && PROVIDER_ENTRIES.has(call.expression.text))
        .map(call => call.getStart());
      return { title: entry.title, stubbed: stubs.length > 0, drives: drives.length > 0, stubFirst: stubs.length > 0 && drives.length > 0 && Math.min(...stubs) < Math.min(...drives) };
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
      const terms = termsIn(text.replace(/\p{Cf}/gu, ""));
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
const PROCESS_TABLE = ["ps", "pgrep", "pkill", "kill", "killall"] as const;
const PROCESS_TABLE_SET: ReadonlySet<string> = new Set(PROCESS_TABLE);
/** Command words that run the next word as the command, and shells whose -c runs a command string. */
const COMMAND_WRAPPERS = ["env", "exec", "command", "nohup", "setsid", "sudo", "nice", "timeout", "stdbuf", "xargs", "busybox", "time"] as const;
const COMMAND_WRAPPER_SET: ReadonlySet<string> = new Set(COMMAND_WRAPPERS);
const SHELLS = ["sh", "bash", "dash", "zsh", "ksh", "ash", "fish"] as const;
const SHELL_SET: ReadonlySet<string> = new Set(SHELLS);
/** Process-spawning calls: a literal in their arguments (or in an argv array they are given) is a command. */
const SPAWNERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"] as const;
const SPAWNER_SET: ReadonlySet<string> = new Set(SPAWNERS);
const PROC_PATH = /(?:^|\/)proc(?:\/|$)/i;
/** Case-insensitive, so a regular expression with the i flag (/esrch/i) still reads. */
const ESRCH_WORD = /(?<![A-Za-z0-9_])esrch(?![A-Za-z0-9_])/i;

function keyText(name: ts.Node | undefined): string | undefined {
  if (name === undefined) return undefined;
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression)) return name.expression.text;
  return undefined;
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
function memberRead(node: ts.Node): { readonly name: string; readonly form: string } | undefined {
  if (ts.isPropertyAccessExpression(node)) return { name: node.name.text, form: "member" };
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return { name: node.argumentExpression.text, form: "element key" };
  if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
    const name = keyText(node.propertyName ?? node.name);
    return name === undefined ? undefined : { name, form: "destructuring" };
  }
  if ((ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node)) && ts.isObjectLiteralExpression(node.parent) && inAssignmentTarget(node)) {
    const name = keyText(node.name);
    return name === undefined ? undefined : { name, form: "destructuring assignment" };
  }
  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) return { name: (node.propertyName ?? node.name).text, form: "import" };
  return undefined;
}
/** Whether an identifier is the name position of its parent's member read (memberRead reads it there). */
function isMemberName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
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
/** The head (by basename) of every command a text spells: split at shell separators, past VAR=value words and wrappers, into a shell's -c. */
function commandHeads(text: string): string[] {
  const heads: string[] = [];
  for (const command of text.split(/\$\(|[;&|\n`()]/)) {
    let words = command
      .trim()
      .split(/\s+/)
      .map(word => word.replace(/^['"]+|['"]+$/g, ""))
      .filter(word => word.length > 0);
    while (words.length > 0) {
      const [first = "", ...rest] = words;
      const base = first.slice(first.lastIndexOf("/") + 1);
      if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(first)) {
        words = rest;
        continue;
      }
      if (COMMAND_WRAPPER_SET.has(base)) {
        words = rest;
        while (words.length > 0 && /^(?:-|\d)/.test(words[0] ?? "")) words = words.slice(1);
        continue;
      }
      if (SHELL_SET.has(base) && /^-[a-z]*c[a-z]*$/.test(rest[0] ?? "")) {
        heads.push(...commandHeads(rest.slice(1).join(" ")));
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
      const shape = MEMBER_SHAPES.get(member.name);
      return shape === undefined ? [] : hit(shape, member.form);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "kill") return hit("F1", "bare call");
    if (ts.isIdentifier(node) && node.text === "ESRCH" && !isMemberName(node)) return hit("F4", "identifier");
    if (ts.isRegularExpressionLiteral(node)) {
      const text = node.text.replace(/\\(.)/g, "$1");
      if (ESRCH_WORD.test(text)) return hit("F4", "regular expression");
      return PROC_PATH.test(text) ? hit("F3", "/proc path") : [];
    }
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (isKeyLiteral(node)) return [];
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
const HX_MODULE = (specifier: string): boolean => specifier === SDK_MODULE || specifier.startsWith(`${SDK_MODULE}/`) || MODULE_PATTERNS.some(pattern => pattern.test(specifier));
/** The calls that load a module (beside a dynamic import and a created require, whose callee is itself a call). */
const LOADERS: ReadonlySet<string> = new Set(["require", "module.require", "vi.importActual"]);
/** Text every HX driver carries, derived from the classifier's own needles: only sources holding one are parsed. */
const DRIVER_TOKENS: readonly string[] = [SDK_MODULE, ...MODULE_NEEDLES, CAPABILITY_ID, OVERRIDE];
const DRIVER_REASONS = ["import", "invoke", "override"] as const;
function isLoaderCall(call: ts.CallExpression): boolean {
  return call.expression.kind === ts.SyntaxKind.ImportKeyword || LOADERS.has(calleeText(call)) || ts.isCallExpression(call.expression);
}
/** How a source drives HX: it loads an HX module, invokes hyperunix.find, or reads or sets the HYPERUNIX_HX override. */
function hxDrivers(source: ts.SourceFile): string[] {
  const reasons = new Set<string>();
  for (const node of descendants(source)) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) && HX_MODULE(node.moduleSpecifier.text)) reasons.add("import");
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression) && HX_MODULE(node.moduleReference.expression.text)) {
      reasons.add("import");
    }
    if (ts.isCallExpression(node)) {
      const first = stringArgument(node, 0);
      if (first !== undefined && HX_MODULE(first) && isLoaderCall(node)) reasons.add("import");
      if (first === CAPABILITY_ID && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "invoke") reasons.add("invoke");
    }
    const member = memberRead(node);
    if (member !== undefined && member.name === OVERRIDE && member.form !== "import") reasons.add("override");
    if (ts.isObjectLiteralExpression(node) && node.properties.some(property => !ts.isSpreadAssignment(property) && keyText(property.name) === OVERRIDE)) reasons.add("override");
  }
  return [...reasons].sort();
}
const passesPrefilter = (text: string): boolean => DRIVER_TOKENS.some(token => text.includes(token));
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
    .map(unit => unit.replace(/\p{Cf}/gu, "").replace(/\s+/g, " ").trim())
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
  { id: "R-WORDING", rows: "C4 C8", family: "a termination claim worded outside the vocabulary, or split across a literal concatenation, reads quiet" },
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
    rows: "C5 C7",
    family:
      "a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet",
  },
  { id: "R-ERRNO", rows: "C7", family: "ESRCH by its errno number reads quiet" },
  { id: "R-UNDRIVEN", rows: "C7", family: "a falsifier in a test or qa file that loads no HX module, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged" },
  { id: "R-ARGUMENTS", rows: "C1 C2", family: "C1 freezes each assertion's subject and chain, not its arguments, so a vacuous argument reads quiet" },
  { id: "R-RUNTIME", rows: "C1 C2 C3", family: "an exit before the first assertion is the run pin's to see; the static rows read quiet" },
  { id: "R-DEAD-PATH", rows: "C6", family: "a group kill the abort listener reaches syntactically behind a dead branch or an early return reads reached" },
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

// ---- planted members --------------------------------------------------------------------------------------------------

const K2_ANCHOR = 'const result = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");';
const K2_HEAD = 'it("preserves incomplete native coverage instead of inventing absence", async () => {';
const K3_REJECTS = 'pending.resolve({version:"0.1.0",binarySha256:"abc"});\n    await expect(result).rejects.toMatchObject({ category: "transport" });';
const HX_DESCRIBE = 'describe("HyperUnix SDK custody", () => {';
const K1_REGISTRY = "const registry = new CapabilityRegistry();\n    registerNativeHyperUnixFind(registry, process.cwd());";
const ABORT_RUN = 'const abort = () => stop(new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED"));';
const ABORT_STREAM = "const abort = () => { cancelled = true; stop(); };";
const ON_ABORT = "const onAbort=()=>client.dispose();";

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
  { id: "type-only import", code: `import type { QueryResult } from "${SDK_MODULE}";`, reasons: ["import"] },
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
      provider: { entries: [...PROVIDER_ENTRIES], calls: [...PROVIDER_CALLS], registry: REGISTRY, bound: [...BOUND].map(([name, from]) => `${name}<${from}`), mocks: [...MODULE_MOCKS], guarded: [...GUARDED_MODULES] },
      registrars: [...REGISTRARS],
      shapes: [...SHAPES],
      memberShapes: [...MEMBER_SHAPES].map(([name, shape]) => `${name}:${shape}`),
      processTable: [...PROCESS_TABLE],
      wrappers: [...COMMAND_WRAPPERS],
      shells: [...SHELLS],
      spawners: [...SPAWNERS],
      excluded: [...EXCLUDED],
      drivers: { needles: [...MODULE_NEEDLES], capability: CAPABILITY_ID, override: OVERRIDE, loaders: [...LOADERS], tokens: [...DRIVER_TOKENS], reasons: [...DRIVER_REASONS] },
      docsView: {
        names: [...DECODED_NAMES.keys()],
        legacy: [...LEGACY_NAMES],
        hiding: [...HIDING_ELEMENTS],
        hidingAttributes: [...HIDING_ATTRIBUTES],
        rawText: [...RAW_TEXT_ELEMENTS],
        blocks: [...BLOCK_ELEMENTS],
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
        mocks: ["vi.mo" + "ck", "vi.doMock"],
        guarded: ["@hyperunix/sdk", "../src/workbench/providers/hyperunix.js", "../src/workbench/capability-registry.js"],
      },
      registrars: ["describe", "suite", "it", "test"],
      shapes: ["F1", "F2", "F3", "F4"],
      memberShapes: ["kill:F1", "pid:F2", "ESRCH:F4"],
      processTable: ["ps", "pgrep", "pkill", "kill", "killall"],
      wrappers: ["env", "exec", "command", "nohup", "setsid", "sudo", "nice", "timeout", "stdbuf", "xargs", "busybox", "time"],
      shells: ["sh", "bash", "dash", "zsh", "ksh", "ash", "fish"],
      spawners: ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"],
      excluded: [SELF],
      drivers: {
        needles: ["providers/hyperunix", "hyperunix-observer"],
        capability: "hyperunix.find",
        override: "HYPERUNIX_HX",
        loaders: ["require", "module.require", "vi.importActual"],
        tokens: ["@hyperunix/sdk", "providers/hyperunix", "hyperunix-observer", "hyperunix.find", "HYPERUNIX_HX"],
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
      },
      residuals: [
        "R-WORDING:C4 C8",
        "R-UNANCHORED:frozen shape",
        "R-SHAPELESS:C7",
        "R-COMPOSED:C5 C7",
        "R-ERRNO:C7",
        "R-UNDRIVEN:C7",
        "R-ARGUMENTS:C1 C2",
        "R-RUNTIME:C1 C2 C3",
        "R-DEAD-PATH:C6",
        "R-CLAUSE:C8",
        "R-CITATION:C8",
        "R-REFERENCE:C8",
        "R-LOOKALIKE:C4 C8",
        "R-ATTRIBUTE:C8",
        "R-SCOPE:C8",
        "R-DETACHED-COMMENT:C4",
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
        "control=F1:member+F1:member+F2:member+F3:/proc path+F3:process-table command+F3:process-table command+F4:literal#8313c0e8ccca",
      ],
      driverPlants: [
        "static import=import#5268cf70dc58",
        "type-only import=import#e9cc4899fd12",
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

  it("C1 cases: the HyperUnix SDK custody suite holds exactly the three frozen cases, in order, with their ordered assertion signatures, each registration a bare title-and-callback call with a parameterless callback, no suite nested inside, and the vitest registrars declared only by their import", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C1 calibration: a chained member, an options object, a test-context parameter, a nested suite and a re-bound registrar or SDK binding each change the C1 reading", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const k2 = CASES[1]?.title ?? "";
    const plants: ReadonlyArray<readonly [string, string]> = [
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
      return { id, departures: reading.departures, nested: reading.nested, rebound: reading.rebound.map(entry => entry.split(" ")[0] ?? "") };
    });
    expect(readings).toStrictEqual([
      { id: "member", departures: [`${k2}: a it.fails member`], nested: [], rebound: [] },
      { id: "options object", departures: [`${k2}: 3 arguments`], nested: [], rebound: [] },
      { id: "test-context parameter", departures: [`${k2}: a test-context parameter`], nested: [], rebound: [] },
      { id: "nested suite", departures: [], nested: ["nested"], rebound: [] },
      { id: "re-bound registrar", departures: [], nested: [], rebound: ["it"] },
      { id: "re-bound SDK binding", departures: [], nested: [], rebound: ["HyperUnix"] },
      { id: "prototype-named declaration", departures: [], nested: [], rebound: [] },
    ]);
  });

  it("C2 call custody only: every assertion is a mock-call assertion on a const stand-in or an outcome assertion on the provider's own result (a direct provider or registry call, or a const binding of one used only as an expect subject), with no re-bound or module-mocked provider, SDK or registry and no spy or global stub beside HyperUnix.open", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C2 calibration: a reassigned or let-bound subject, a re-declared or mutated subject, a stand-in registration on the registry, a module mock of the provider and a global spy each read as a violation", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const plants: ReadonlyArray<readonly [string, string]> = [
      ["U8 reassigned let", plantedText(text, K2_ANCHOR, `let result: unknown = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");\n    result = native;`)],
      ["let binding", plantedText(text, K2_ANCHOR, K2_ANCHOR.replace("const result", "let result"))],
      ["re-declared subject", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    if (native.rows.length > 0) { const result = native; void result; }`)],
      ["mutated subject", plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    Object.assign(result as object, native);`)],
      ["stand-in registration", plantedText(text, K1_REGISTRY, `${K1_REGISTRY}\n    registry.register({ descriptor: { id: "hyperunix.find" }, invoke: async () => ({}) } as never);`)],
      ["module mock of the provider", plantedText(text, "function deferred<T>() {", `vi.${"mock"}("${PROVIDER_MODULE}", () => ({}));\nfunction deferred<T>() {`)],
      ["global spy", plantedText(text, K2_ANCHOR, `vi.spyOn(JSON, "parse").mockReturnValue(native);\n    ${K2_ANCHOR}`)],
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
    ]);
  });

  it("C3 stand-in clients only: every case stubs the SDK's own HyperUnix.open import with a mocked return before it drives the provider", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const reading = suiteReading(source);
    expect({
      stubs: reading.stubs,
      imported: declaredNames(source).filter(entry => entry.name === "HyperUnix").map(entry => `${entry.kind}<${entry.from ?? ""}`),
    }).toStrictEqual({ stubs: CASES.map(row => ({ title: row.title, stubbed: true, drives: true, stubFirst: true })), imported: [`import<${SDK_MODULE}`] });
  });

  it("C4 no termination claim: the suite's titles, every comment attached to or inside its statement, every string, template and regular-expression literal and identifier word inside it, and every HX-naming comment of the file carry no vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C4 calibration: the same collector finds the termination claim of every RF case whose stand-in child ignores SIGTERM, a JSDoc attached before the suite, a regular-expression literal, an identifier word, an HX-naming comment elsewhere and a word split by a zero-width character, and every termination word of the RF titles and the SDK's own prose is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C5 Pi delegates: the HyperUnix provider disposes on abort and closes in finally, carries no falsifier shape, names no signal and names the child_process module in no literal", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C6 SDK-owned termination: in the installed SDK transport the group-killing functions are exactly runHx and streamHx, the abort listener of each reaches its group kill through the function's own closures, and every signal it or the RF provider sends is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C7 no hand-rolled kill falsifier: no test or qa file that loads an HX module, invokes hyperunix.find or uses the HYPERUNIX_HX override carries a kill read, a pid read, a process-table probe or ESRCH in any form F1-F4 reads", { timeout: CENSUS_TIMEOUT }, () => {
    const { sources, judged } = judgedDrivers();
    const paths = judged.map(entry => entry.path);
    expect({
      floor: judged.length >= JUDGED_FLOOR,
      anchored: [LIFECYCLE, "test/workbench-hyperunix-observer.test.ts", "test/workbench-hyperunix-graduation-vocabulary-census.test.ts"].every(path => paths.includes(path)),
      selfExcluded: !paths.includes(SELF) && sources.includes(SELF),
      hits: judged.flatMap(entry => entry.hits.map(hit => `${entry.path}:${hit.line} ${hit.shape} (${hit.form})`)),
    }).toStrictEqual({ floor: true, anchored: true, selfExcluded: true, hits: [] });
  });

  it("C7 calibration: the detector finds the SDK transport's and the RF provider's kill code and every planted member in its own shape and form, and the classifier classes each driving form but never a capability-id or override data literal, a module mock or a type position alone", { timeout: CENSUS_TIMEOUT }, () => {
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

  it("C8 docs: every docs/workbench page, read as marked renders it and a browser shows it, is a modelled page with no clause pairing the HX side with a vocabulary term unless it names the upstream HXGC-OPS-002 artifact", { timeout: CENSUS_TIMEOUT }, () => {
    const reading = docsReading();
    expect({
      files: reading.files.length >= 50,
      refusals: reading.refusals,
      hits: reading.clauses.filter(clause => isDocsHit(clause.text)).map(clause => `${clause.file} [clause ${clause.index}] [${termsIn(clause.text).join(", ")}] ${clause.text}`),
    }).toStrictEqual({ files: true, refusals: [], hits: [] });
  });

  it("C8 calibration: the same view finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs, reads every planted page exactly as a browser shows it, and refuses an unmodelled element or a hiding attribute", { timeout: CENSUS_TIMEOUT }, () => {
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
    }).toStrictEqual({ suites: [SUITE], cases: 36, residualRows: RESIDUALS.map(residualTitle), unpinned: [] });
  });

  // ---- residual rows: each plants a member of its family, shows the reader quiet on it, and shows the same reader catching a control ----

  it("R-WORDING (C4 C8): a termination claim worded outside the vocabulary, or split across a literal concatenation, reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const quiet = plantedText(text, K2_ANCHOR, `${K2_ANCHOR}\n    // the child stops here and the process is gone\n    const note = "termi" + "nated";`);
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

  it("R-COMPOSED (C5 C7): a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
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
    expect({
      quiet: shapeForms(falsifierShapes(quiet)),
      loud: shapeForms(falsifierShapes(loud)),
      quietProvider: [...signalNames(quietProvider), ...childProcessNames(quietProvider)],
      loudProvider: [...signalNames(loudProvider), ...childProcessNames(loudProvider)],
    }).toStrictEqual({ quiet: [], loud: ["F1:member", "F2:member", "F3:/proc path", "F3:process-table command", "F4:literal"], quietProvider: [], loudProvider: ["SIGTERM", "node:child_process"] });
    RAN.add(residualNamed("R-COMPOSED").id);
  });

  it("R-ERRNO (C7): ESRCH by its errno number reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const quiet = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const gone = (error: { errno?: number }) => error.errno === -3;\n`);
    const loud = parseText("planted-falsifier.test.ts", `${HX_HEAD}export const gone = (error: { code?: string }) => error.code === "ESRCH";\n`);
    expect({ quiet: shapeForms(falsifierShapes(quiet)), loud: shapeForms(falsifierShapes(loud)) }).toStrictEqual({ quiet: [], loud: ["F4:literal"] });
    RAN.add(residualNamed("R-ERRNO").id);
  });

  it("R-UNDRIVEN (C7): a falsifier in a test or qa file that loads no HX module, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged", { timeout: CENSUS_TIMEOUT }, () => {
    const body = "export const alive = (pid: number) => { process.kill(pid, 0); return true; };\n";
    const helper = parseText("planted-helper.ts", body);
    const driven = parseText("planted-driven.test.ts", `${HX_HEAD}${body}`);
    expect({ helper: hxDrivers(helper), shapes: shapeForms(falsifierShapes(helper)), driven: hxDrivers(driven) }).toStrictEqual({ helper: [], shapes: ["F1:member"], driven: ["import"] });
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

  it("R-RUNTIME (C1 C2 C3): an exit before the first assertion is the run pin's to see; the static rows read quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(LIFECYCLE);
    const base = suiteReading(parse(LIFECYCLE));
    const early = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, K2_HEAD, `${K2_HEAD}\n    if (process.cwd().length > 0) return;`)));
    const member = suiteReading(parseText("planted-lifecycle.test.ts", plantedText(text, K2_HEAD, K2_HEAD.replace('it("', 'it.fails("'))));
    expect({ quiet: JSON.stringify(early) === JSON.stringify(base), loud: member.departures.length }).toStrictEqual({ quiet: true, loud: 1 });
    RAN.add(residualNamed("R-RUNTIME").id);
  });

  it("R-DEAD-PATH (C6): a group kill the abort listener reaches syntactically behind a dead branch or an early return reads reached", { timeout: CENSUS_TIMEOUT }, () => {
    const text = read(SDK_TRANSPORT);
    const dead = plantedText(
      plantedText(text, ABORT_RUN, 'const abort = () => { if (Date.now() < 0) stop(new HyperUnixError("Owned execution cancelled", "SDK_CANCELLED")); };'),
      ABORT_STREAM,
      "const abort = () => { return; stop(); };",
    );
    const reading = (planted: string): string[] => abortReading(parseText("planted-cli.js", planted)).map(entry => `${entry.owner}:${entry.reached}`);
    expect({ quiet: reading(dead), loud: reading(unreachedTransport(text)) }).toStrictEqual({ quiet: ["runHx:true", "streamHx:true"], loud: ["runHx:false", "streamHx:false"] });
    RAN.add(residualNamed("R-DEAD-PATH").id);
  });

  it("R-CLAUSE (C8): a claim whose HX side and term fall in different clauses reads quiet", { timeout: CENSUS_TIMEOUT }, () => {
    expect({ quiet: pageHits("HX owns the read. The child is terminated by the SDK.").hits, loud: pageHits("HX children are terminated by the SDK.").hits }).toStrictEqual({
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

  it("records: every residual row ran its own case to its end", () => {
    expect([...RAN].sort()).toStrictEqual(RESIDUALS.map(residual => residual.id).sort());
  });
});
