/**
 * wb-tz2.2 (HX-ORIGINAL-GOALS-CLOSURE-R2), one cut with wb-tz2.1 (R1): a hermetic default-gate census over the SOURCES of the two
 * live-binary HX tests. It never launches hx and never runs a live case; it reads the test files and the tier configuration as
 * text and parses them with the TypeScript compiler, so comments are trivia and never count as code.
 *
 * Bead statement (R2): "Pi-subagents shall never assert licenses_absence:false, kind:'incomplete', or the bare version literal
 * '0.1.0' as an expected value in a live-binary HX test; the rewrite shall keep the contract pin hyperunix.find/v1, the
 * representation pin hyperunix.result/1, the sha-256 identity check and the not.toContain('"verified":true') leak check, and shall
 * never promote the live tier into the default gate."
 * R1 (the rewrite this census pins): "The two live-binary HX tests shall assert the program-normative runtime-licence invariant
 * through one shared pure predicate ... instead of asserting any concrete verdict." The predicate is hxLiveInvariant
 * (src/workbench/hyperunix-observer.ts); its unit rows live in test/workbench-hyperunix-observer.test.ts.
 * R1 fold-in HXFS-PI-3 (bead notes): the live tests' describe/it titles and printed receipt line say "installed" only when the
 * version class is installed. Static titles cannot know the class, so no title says it, and neither does either file's leading
 * doc comment (the fold-in cites native-ecosystem:1 "against installed binaries"); the receipt line comes from
 * test/helpers/hx-live-receipt.ts.
 *
 * NON-REQUIREMENT NOTE (R2 acceptance 4): test/workbench-ecosystem-native.test.ts:15@9df9a03 lets HYPERUNIX_HX override the hx
 * binary the SDK opens and otherwise defaults it to a home-directory path. That env-overridable default is a REFUTED-row hygiene
 * option in the hx-original-goals-closure dossier; it is recorded here and deliberately NOT converted into a requirement - no
 * assertion below reads or pins it.
 *
 * HONEST LIMITS: the forbidden-value scan matches literal spellings in active code (object-literal properties, string literals,
 * matcher calls on a licenses_absence subject, toHaveProperty paths). A verdict value assembled at runtime, passed through a
 * variable or imported from another module is outside it; the predicate rows in the observer suite and the gate review own
 * semantic equivalence. Case liveness is structural (registration modifiers, options flags, enclosing suites, context skip calls); it
 * proves the HX cases are registered to run, never that the native tier ran them - the native receipt does that.
 * wb-drd: the receipt-on-stdout pin is structural (a straight-line write, no direct console-member echo). The executed leg - running a case and
 * counting the receipt lines that reach process.stdout.write or a console member - covers only the synthetic probes of the falsifier rows
 * (executedReceipts, a vm sandbox with stubbed identifiers); the real live sources need the hx binary, so their execution stays the native-read
 * receipt's job. Every shape the receipt judge claims to refuse is pinned by a named falsifier: the wb-tz2.14 cases (console members, a console
 * echo, a non-receipt write) and the SURVIVORS rows, whose whys the claims anchor ties to the JUDGE CLAIMS documented on writesReceiptToStdout;
 * the LIVE set is anchored to vitest.native.config.ts.
 * wb-drd.1 (drd gate PREP F1, rule 16 clarification 1): the JUDGE CLAIMS are doc text of this file, so removing one row from SURVIVORS, the
 * frozen ids and digest literals and its claim line together stayed green (the CT6 coordinated hollow). The SURVIVORS rows - name and why, in
 * table order - are therefore anchored to the docs/workbench/14-qa-and-benchmarks.md table "HX live-tier receipt falsifiers" as well, a surface
 * outside this census that a coordinated edit of its own literals cannot reach.
 * NAMED RESIDUALS (R584 GE2-GE9, wording widened at cut 3, plus seat-named S1-S3): a constant-true conditional return (GE2), a receipt hidden in a
 * dead argument branch (GE3) or uninvoked argument closure (GE4), shadowed process (GE5), and console echo via an alias (GE6), .call, .apply,
 * .bind or Reflect.apply (GE7), a comma-indirect call or reference (GE8) or a destructured member (GE9) remain outside this structural judge, as
 * do a computed console key such as globalThis['con' + 'sole'] (S1), a call, await or loop that never completes normally before the write (S2),
 * and a return or throw that always runs inside a prior compound statement other than a plain block - an if whose every branch terminates, a
 * try, switch or labelled statement, or a do-while body (S3). It deliberately fails closed for writes under if/try, invoked closures or void
 * expressions; it does not attempt general control-flow or binding analysis.
 * wb-xhy1 (drd.1 gate PREP F1, the CT3x coordinated statement swap): the docs/14 falsifier table anchors every SURVIVORS row's name and refused
 * shape, but the probe statements a row runs were anchored only by this census's own AC1 digest literal, so swapping a row's statement for another
 * refused shape - echo-nonnull-console's console!.log echo for the element-access spelling, dead-write-loop's while (false) for if (false), or
 * echo-window-console's window.console.log for globalThis.console.log - with its digest re-pinned stayed green, and the judge could then drop that
 * refusal (the non-null unwrapping of isConsoleReference, say) with nothing red. Every row's probe statements, after the first five statements of
 * the well-formed case that every row must open with, are therefore listed in the docs/14 section "HX live-tier receipt falsifier probes" too, and
 * read from that section's own blocks, through the same binding as its rendered view (docsSection), on a surface outside this census.
 */
import {createHash} from 'node:crypto';
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';
import {marked, type Tokens} from 'marked';
import ts from 'typescript';
import {describe, expect, it} from 'vitest';
import {docsSection, type RenderedBlock, sectionMatches} from './helpers/census.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
/** This census's own source path: the claims anchor reads the judge's documented claims from it (a throwaway copy reads itself). */
const SELF = fileURLToPath(import.meta.url);
const NATIVE_ECOSYSTEM = 'test/workbench-native-ecosystem.test.ts';
const ECOSYSTEM_NATIVE = 'test/workbench-ecosystem-native.test.ts';
const LIVE = [NATIVE_ECOSYSTEM, ECOSYSTEM_NATIVE] as const;
const NATIVE_CONFIG = 'vitest.native.config.ts';
/** wb-drd.1: the docs page whose falsifier table anchors the SURVIVORS rows outside this census, and that section's heading path. */
const DOCS_14 = 'docs/workbench/14-qa-and-benchmarks.md';
const DOCS_14_PARENT = `14 ${String.fromCodePoint(0x2014)} Test strategy, conformance suite, benchmark and adversarial controls`;
const FALSIFIERS_HEADING = 'HX live-tier receipt falsifiers';
const FALSIFIERS_HEADER: readonly string[] = ['Falsifier row', 'Refused receipt shape'];
/** The section's one paragraph, verbatim: the adoption form refuses any other paragraph beside the table (a weakening sentence included). */
const FALSIFIERS_INTRO = 'The two live-binary HX tests of the native-read tier (vitest.native.config.ts) write their receipt line with process.stdout.write, ' +
  'because the vitest agent reporter drops the console output of passing tests. test/workbench-hx-live-tier-census.test.ts judges that write in ' +
  'the test sources and refuses every receipt shape below; each row names one falsifier row of the census and the refused shape, verbatim, and is ' +
  'fixture pass evidence only: the census case named for the row runs it over a synthetic probe, never the hx binary. The census reads this ' +
  'table and requires its own falsifier rows to equal these rows in both directions and in table order, so a falsifier dropped from the census, ' +
  'together with every census literal edited to match, still reads red against this table.';
/** wb-xhy1 (drd.1 gate PREP F1, CT3x): the docs/14 section that lists every falsifier row's probe statements outside this census, and the section's
 * one paragraph, verbatim (the adoption form refuses any other paragraph beside the list, as for the falsifier section). */
const PROBES_HEADING = 'HX live-tier receipt falsifier probes';
const PROBES_INTRO = 'Each row of the falsifier table above runs one synthetic probe in test/workbench-hx-live-tier-census.test.ts: the first five ' +
  'statements of the well-formed live case, then the probe statements this list gives for the row, verbatim and in order, one code span per ' +
  'statement. Each entry is fixture pass evidence only: the census case named for the row judges the probe source and runs it in a vm sandbox ' +
  'with stubbed identifiers, never the hx binary. The census reads this list and requires every falsifier row to open with those five statements ' +
  'and to run exactly the probe statements of its entry here, in both directions and in table order, each run of whitespace read as one space, ' +
  'so a probe statement swapped for another refused shape, together with every census literal edited to match, still reads red against this list.';

/** The three forms R2 acceptance 1 names, verbatim: native-ecosystem:10@9df9a03 carries the first and third, ecosystem-native:19
 * the first and second. Matched against the RAW source text, comments included, so even a commented-out pin is refused. */
const SPEC_FORBIDDEN: readonly RegExp[] = [/licenses_absence:\s*false/, /kind:\s*'incomplete'/, /version:\s*'0\.1\.0'/];
/** A bare SemVer version used as a literal: '0.1.0' today, and any later bare version a pinned live expectation would freeze. */
const BARE_SEMVER = /^\d+\.\d+\.\d+$/;
/** The registration modifiers and option flags that park a case, invert it or make it conditional. */
const PARKING = new Set(['skip', 'todo', 'only', 'fails', 'skipIf', 'runIf']);
/** Chain members that keep a registration running unchanged. */
const RUNNING = new Set(['each', 'for', 'concurrent', 'sequential']);
const OBJECT_MATCHERS = new Set(['toMatchObject', 'toStrictEqual', 'toEqual']);
const VALUE_MATCHERS = new Set(['toBe', 'toEqual', 'toStrictEqual']);
const HX_TITLE = /^HX\b/;
const SHA_REGEX = '/^[0-9a-f]{64}$/';
const LEAK = '"verified":true';
const RECEIPT_MARKER = 'HX-RECEIPT-MARKER';

function readRepo(relative: string): string {
  return readFileSync(join(ROOT, relative), 'utf8');
}
function parse(name: string, text: string): ts.SourceFile {
  return ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function each(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, child => each(child, visit));
}
function lineOf(sf: ts.SourceFile, node: ts.Node): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}
/** A string literal's value: plain, or a template with no substitution. */
function literal(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
function keyOf(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) ? name.text : undefined;
}
/** The last member of an access chain: result.source.coverage_summary.licenses_absence -> licenses_absence. */
function leafName(node: ts.Expression | undefined): string | undefined {
  if (node === undefined) return undefined;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return literal(node.argumentExpression);
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node) || ts.isAsExpression(node)) return leafName(node.expression);
  return undefined;
}

interface Matcher {
  readonly name: string;
  readonly negated: boolean;
  readonly subject: ts.Expression | undefined;
}
/** expect(subject)[.not|.resolves|.rejects]*.<name>(...), or undefined for any other call. */
function matcherOf(call: ts.CallExpression): Matcher | undefined {
  if (!ts.isPropertyAccessExpression(call.expression)) return undefined;
  let negated = false;
  let target: ts.Expression = call.expression.expression;
  while (ts.isPropertyAccessExpression(target) && ['not', 'resolves', 'rejects'].includes(target.name.text)) {
    if (target.name.text === 'not') negated = !negated;
    target = target.expression;
  }
  if (!ts.isCallExpression(target) || !ts.isIdentifier(target.expression) || target.expression.text !== 'expect') return undefined;
  return {name: call.expression.name.text, negated, subject: target.arguments[0]};
}

/**
 * Every place active code asserts one of today's verdict values (R2): a string literal whose whole value is the 'incomplete'
 * kind or a bare version, licenses_absence: false in an object literal, a matcher pinning a licenses_absence subject to false (toBe/toEqual/
 * toStrictEqual(false), toBeFalsy(), not.toBe(true), not.toBeTruthy()), and toHaveProperty(<...licenses_absence>, false).
 */
function forbiddenExpectations(sf: ts.SourceFile): string[] {
  const found: string[] = [];
  const at = (node: ts.Node, what: string): void => {
    found.push(`${sf.fileName}:${lineOf(sf, node)} ${what}`);
  };
  each(sf, node => {
    const text = literal(node);
    if (text !== undefined && (text === 'incomplete' || BARE_SEMVER.test(text))) at(node, `literal '${text}'`);
    if (ts.isPropertyAssignment(node) && keyOf(node.name) === 'licenses_absence' && node.initializer.kind === ts.SyntaxKind.FalseKeyword) {
      at(node, 'licenses_absence: false');
    }
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined) return;
    const argument = node.arguments[0]?.kind;
    if (leafName(matcher.subject) === 'licenses_absence') {
      const pinsFalse = matcher.negated
        ? (VALUE_MATCHERS.has(matcher.name) && argument === ts.SyntaxKind.TrueKeyword) || matcher.name === 'toBeTruthy'
        : (VALUE_MATCHERS.has(matcher.name) && argument === ts.SyntaxKind.FalseKeyword) || matcher.name === 'toBeFalsy';
      if (pinsFalse) at(node, `expect(...licenses_absence).${matcher.negated ? 'not.' : ''}${matcher.name}`);
    }
    if (matcher.name === 'toHaveProperty' && !matcher.negated && node.arguments[1]?.kind === ts.SyntaxKind.FalseKeyword) {
      const path = node.arguments[0];
      const last = path !== undefined && ts.isArrayLiteralExpression(path) ? literal(path.elements.at(-1)) : literal(path)?.split('.').at(-1);
      if (last === 'licenses_absence') at(node, 'toHaveProperty(licenses_absence, false)');
    }
  });
  return found;
}

/** A registration call: it/test or describe/suite, with every chain member after the root. */
interface Registration {
  readonly kind: 'case' | 'suite';
  readonly members: readonly string[];
  readonly call: ts.CallExpression;
}
function registrationOf(call: ts.CallExpression): Registration | undefined {
  const members: string[] = [];
  let callee: ts.Expression = call.expression;
  for (;;) {
    if (ts.isCallExpression(callee)) callee = callee.expression;
    else if (ts.isPropertyAccessExpression(callee)) {
      members.unshift(callee.name.text);
      callee = callee.expression;
    } else break;
  }
  if (!ts.isIdentifier(callee)) return undefined;
  const kind = callee.text === 'it' || callee.text === 'test' ? 'case' : callee.text === 'describe' || callee.text === 'suite' ? 'suite' : undefined;
  return kind === undefined ? undefined : {kind, members, call};
}
/** Why a registration would not run as written, or undefined when it runs: a parking or unknown modifier, or an options flag. */
function parkedBy(registration: Registration): string | undefined {
  for (const member of registration.members) {
    if (PARKING.has(member)) return `modifier .${member}`;
    if (!RUNNING.has(member)) return `unrecognised modifier .${member}`;
  }
  for (const argument of registration.call.arguments) {
    if (!ts.isObjectLiteralExpression(argument)) continue;
    for (const property of argument.properties) {
      if (ts.isSpreadAssignment(property)) return 'options spread';
      const name = property.name === undefined ? undefined : keyOf(property.name);
      if (name === undefined || !PARKING.has(name)) continue;
      if (ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword) continue;
      return `option ${name}`;
    }
  }
  return undefined;
}
function callbackOf(call: ts.CallExpression): ts.ArrowFunction | ts.FunctionExpression | undefined {
  return call.arguments.find((argument): argument is ts.ArrowFunction | ts.FunctionExpression =>
    ts.isArrowFunction(argument) || ts.isFunctionExpression(argument));
}

interface LiveCase {
  readonly title: string;
  readonly line: number;
  readonly body: ts.ArrowFunction | ts.FunctionExpression | undefined;
  /** Why the case would not run, or undefined. */
  readonly parked: string | undefined;
}
/** Every it/test registration with a literal title, judged together with its enclosing suites. */
function casesOf(sf: ts.SourceFile): LiveCase[] {
  const found: LiveCase[] = [];
  const walk = (node: ts.Node, suiteParked: string | undefined): void => {
    if (ts.isCallExpression(node)) {
      const registration = registrationOf(node);
      if (registration !== undefined) {
        const own = parkedBy(registration);
        const title = literal(node.arguments[0]);
        const body = callbackOf(node);
        if (registration.kind === 'case' && title !== undefined) {
          let skips = false;
          if (body !== undefined) {
            each(body.body, inner => {
              if (!ts.isCallExpression(inner)) return;
              const callee = inner.expression;
              if ((ts.isIdentifier(callee) && callee.text === 'skip') || (ts.isPropertyAccessExpression(callee) && callee.name.text === 'skip')) skips = true;
            });
          }
          found.push({title, line: lineOf(sf, node), body, parked: suiteParked ?? own ?? (skips ? 'context skip call in the callback' : undefined)});
        }
        const next = registration.kind === 'suite' ? suiteParked ?? (own === undefined ? undefined : `enclosing suite ${own}`) : suiteParked;
        ts.forEachChild(node, child => walk(child, next));
        return;
      }
    }
    ts.forEachChild(node, child => walk(child, suiteParked));
  };
  walk(sf, undefined);
  return found;
}
/** Every suite title with a literal title. */
function suiteTitles(sf: ts.SourceFile): string[] {
  const titles: string[] = [];
  each(sf, node => {
    if (!ts.isCallExpression(node)) return;
    const title = literal(node.arguments[0]);
    if (registrationOf(node)?.kind === 'suite' && title !== undefined) titles.push(title);
  });
  return titles;
}

/** A property `key: <value literal>` inside the object argument of an expect(...) object matcher. */
function pinsProperty(body: ts.Node, key: string, value: string): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || matcher.negated || !OBJECT_MATCHERS.has(matcher.name)) return;
    for (const argument of node.arguments) {
      each(argument, inner => {
        if (ts.isPropertyAssignment(inner) && keyOf(inner.name) === key && literal(inner.initializer) === value) hit = true;
      });
    }
  });
  return hit;
}
/** An expect(...) matcher whose subtree names binarySha256 and carries the 64-hex regex literal: the sha-256 identity check. */
function pinsDigest(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node) || matcherOf(node) === undefined || matcherOf(node)?.negated) return;
    let names = false;
    let regex = false;
    each(node, inner => {
      if ((ts.isIdentifier(inner) || ts.isStringLiteral(inner)) && inner.text === 'binarySha256') names = true;
      if (ts.isRegularExpressionLiteral(inner) && inner.text === SHA_REGEX) regex = true;
    });
    if (names && regex) hit = true;
  });
  return hit;
}
/** expect(JSON.stringify(...)).not.toContain('"verified":true'): the leak check. */
function pinsLeakCheck(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || !matcher.negated || matcher.name !== 'toContain' || literal(node.arguments[0]) !== LEAK) return;
    const subject = matcher.subject;
    if (subject !== undefined && ts.isCallExpression(subject) && ts.isPropertyAccessExpression(subject.expression) &&
      ts.isIdentifier(subject.expression.expression) && subject.expression.expression.text === 'JSON' && subject.expression.name.text === 'stringify') hit = true;
  });
  return hit;
}
const callsNamed = (node: ts.Node, name: string): boolean => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name;
/** The case computes hxLiveInvariant(...) (directly or through a const) and asserts the verdict holds: an object matcher with holds: true. */
function assertsInvariant(body: ts.Node): boolean {
  const bound = new Set<string>();
  each(body, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && callsNamed(node.initializer, 'hxLiveInvariant')) bound.add(node.name.text);
  });
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || matcher.negated || !OBJECT_MATCHERS.has(matcher.name) || matcher.subject === undefined) return;
    const subject = matcher.subject;
    if (!callsNamed(subject, 'hxLiveInvariant') && !(ts.isIdentifier(subject) && bound.has(subject.text))) return;
    const shape = node.arguments[0];
    if (shape !== undefined && ts.isObjectLiteralExpression(shape) && shape.properties.some(property =>
      ts.isPropertyAssignment(property) && keyOf(property.name) === 'holds' && property.initializer.kind === ts.SyntaxKind.TrueKeyword)) hit = true;
  });
  return hit;
}
/** The case prints the receipt line through the shared helper (fold-in HXFS-PI-3). */
function printsReceipt(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (callsNamed(node, 'hxLiveReceipt')) hit = true;
  });
  return hit;
}

/** The receipt must reach stdout directly (wb-tz2.14, the wb-bj6 class): vitest 4.1.10 selects the agent reporter under AI_AGENT /
 * CLAUDECODE (forge inherits the env) and that reporter drops the console output of passing tests, so a receipt printed with
 * console.log vanishes from the canonical native-read launch. The pin (writesReceiptToStdout) is true when the case writes hxLiveReceipt(...)
 * through process.stdout.write on a straight-line path (runsUnconditionally) and routes it through no console call isConsoleCall recognises; the
 * shapes it claims to refuse are its JUDGE CLAIMS (wb-drd). */
function isProcessStdoutWrite(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return ts.isPropertyAccessExpression(callee) && callee.name.text === 'write' && ts.isPropertyAccessExpression(callee.expression) &&
    callee.expression.name.text === 'stdout' && ts.isIdentifier(callee.expression.expression) && callee.expression.expression.text === 'process';
}
/** A reference to the console object (wb-drd): the bare identifier, a property named console (globalThis.console, window.console,
 * global.console) or an element access with the literal key 'console' (globalThis['console']), after unwrapping parentheses, non-null
 * assertions and type assertions (as, satisfies, <T>). Each spelling is an echo row of the JUDGE CLAIMS. */
function isConsoleReference(node: ts.Expression): boolean {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current)) {
    current = current.expression;
  }
  if (ts.isIdentifier(current)) return current.text === 'console';
  if (ts.isPropertyAccessExpression(current)) return current.name.text === 'console';
  if (ts.isElementAccessExpression(current)) return literal(current.argumentExpression) === 'console';
  return false;
}
/** A call through a console member of any name (console.log, console.table, ...), the member spelled either way - console.log or
 * console['log'] - on any reference isConsoleReference recognises. */
function isConsoleCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) && isConsoleReference(callee.expression);
}
/** A plain block preserves straight-line termination recursively; never follow a branch, label, loop, try or closure (residual S3).
 * In particular, a labelled break exits its label rather than the case, and a conditional return need not run. */
function terminatesStraightLine(statement: ts.Statement): boolean {
  if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement) || ts.isBreakStatement(statement) || ts.isContinueStatement(statement)) return true;
  return ts.isBlock(statement) && statement.statements.some(terminatesStraightLine);
}
/** True when the statement runs on every straight-line pass through the case body (wb-drd): an expression statement directly in the body, or in
 * plain nested blocks of it, with no return, throw, break or continue before it - neither a prior statement at any level of its block path nor
 * one on the straight-line path of a prior plain block (terminatesStraightLine); a terminator inside any other prior statement is not followed
 * (GE2, S3). A write under an if or else branch, a loop, a ternary or a closure, or after a terminator, is dead or conditional and does not count
 * as the receipt reaching stdout. */
function runsUnconditionally(statement: ts.Node, caseNode: ts.Node): boolean {
  const body = ts.isArrowFunction(caseNode) || ts.isFunctionExpression(caseNode) ? caseNode.body : caseNode;
  let node = statement;
  while (node !== body) {
    const parent = node.parent;
    if (!ts.isBlock(parent)) return false;
    for (const prior of parent.statements) {
      if (prior === node) break;
      if (terminatesStraightLine(prior)) return false;
    }
    if (parent !== body && !ts.isBlock(parent.parent)) return false;
    node = parent;
  }
  return true;
}
function containsReceiptCall(node: ts.Node): boolean {
  let hit = false;
  each(node, inner => {
    if (callsNamed(inner, 'hxLiveReceipt')) hit = true;
  });
  return hit;
}
/** The receipt-on-stdout judge over one case body (wb-tz2.14 + wb-drd): a straight-line process.stdout.write of the receipt and no console
 * echo of it. JUDGE CLAIMS - every shape it claims to refuse beyond the wb-tz2.14 cases (a receipt printed with console.log, info, debug, warn
 * or error instead of the stdout write, one also echoed through console.log, and a stdout write of something other than the receipt, each
 * pinned by its own case), one line per named SURVIVORS falsifier row in table order; each line is that row's why, and the claims anchor test
 * reds a claim without its row, a row without its claim, a reordered row or a shortened label:
 * - a write inside if (false)
 * - a write unreached after return
 * - a write inside an uninvoked closure
 * - a write unreached after an unconditional return in a prior plain block
 * - a write unreached after a prior plain block whose return follows another statement
 * - a write unreached after a prior plain block whose return precedes another statement
 * - a write in a nested plain block unreached after an outer return
 * - a write in a nested plain block unreached after a return inside that block
 * - a write in the untaken else branch of an if
 * - a write inside a loop body that never runs
 * - a write in the untaken arm of a ternary
 * - console['log'] beside the stdout write
 * - globalThis.console.log beside the stdout write
 * - globalThis['console'].log beside the stdout write
 * - window.console.log beside the stdout write
 * - global.console.log beside the stdout write
 * - (console).log beside the stdout write
 * - console!.log beside the stdout write
 * - (console as Console).log beside the stdout write
 * - (console satisfies Console).log beside the stdout write
 * - (<Console>console).log beside the stdout write
 * - console.table, a member of any name, beside the stdout write
 */
function writesReceiptToStdout(body: ts.Node): boolean {
  let written = false;
  let consoled = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    if (isProcessStdoutWrite(node) && node.arguments.some(containsReceiptCall) && ts.isExpressionStatement(node.parent) && runsUnconditionally(node.parent, body)) written = true;
    if (isConsoleCall(node) && node.arguments.some(containsReceiptCall)) consoled = true;
  });
  return written && !consoled;
}
/** The JUDGE CLAIMS lines of writesReceiptToStdout's leading doc comment, read from this file's own source with the compiler (wb-drd claims
 * anchor): one '- <why>' line per claimed shape. Doc text, not a literal of the falsifier table. */
function judgeClaims(): string[] {
  const text = readFileSync(SELF, 'utf8');
  const sf = parse(SELF, text);
  const judge = sf.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === 'writesReceiptToStdout');
  if (judge === undefined) return [];
  const comment = (ts.getLeadingCommentRanges(text, judge.getFullStart()) ?? []).map(range => text.slice(range.pos, range.end)).join('\n');
  return comment.split('\n').flatMap(line => {
    const claim = /^\s*\*\s-\s(.+?)\s*$/.exec(line)?.[1];
    return claim === undefined ? [] : [claim];
  });
}

/** A falsifier row as the docs table names it: the row id and the shape it refuses (its why). */
interface NamedFalsifier {
  readonly id: string;
  readonly why: string;
}
/** A docs/14 falsifier cell: the value inside one code span, so a shape such as (<Console>console).log renders as text, never as HTML. */
const codeCell = (value: string): string => `\`${value}\``;
/** Every table in the document under the falsifier header, as raw cell source (header row first); docs/14 must hold exactly one. */
function falsifierGrids(markdown: string): string[][][] {
  return marked
    .lexer(markdown)
    .filter((token): token is Tokens.Table => token.type === 'table')
    .map(token => [token.header.map(cell => cell.text), ...token.rows.map(cells => cells.map(cell => cell.text))])
    .filter(grid => grid[0]?.join('|') === FALSIFIERS_HEADER.join('|'));
}
/** The rendered blocks the falsifier section must be (the shared adoption form): its intro paragraph and one table of the rows. */
function falsifierBlocks(rows: readonly NamedFalsifier[]): RenderedBlock[] {
  return [
    {kind: 'paragraph', text: FALSIFIERS_INTRO, markdown: FALSIFIERS_INTRO},
    {kind: 'other', type: 'table', text: [...FALSIFIERS_HEADER, ...rows.flatMap(row => [row.id, row.why])].join(' ')},
  ];
}
/** Every drift between docs/14 "HX live-tier receipt falsifiers" and a falsifier table (wb-drd.1), each naming the row: the section must render
 * as exactly its intro and one table of the rows, and that table's rows must equal the rows one by one - name and why, each in one code span - in
 * table order. A row dropped from SURVIVORS, and so from every literal of this census edited to match, still reads red against a surface outside
 * this file (rule 16 CT5/CT6, the 6ze.39 self-anchoring class). */
function falsifierTableFailures(markdown: string, rows: readonly NamedFalsifier[]): string[] {
  const where = `${DOCS_14} "${FALSIFIERS_HEADING}"`;
  const section = docsSection(markdown, FALSIFIERS_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${where}: the section is refused: ${section.why}`];
  const out: string[] = [];
  const exact = sectionMatches(section, falsifierBlocks(rows));
  if (!exact.ok) out.push(`${where} is not exactly its intro paragraph and one table of the census's falsifier rows: ${exact.why}`);
  const grids = falsifierGrids(markdown);
  if (grids.length !== 1) return [...out, `${DOCS_14}: the falsifier table must occur exactly once; found ${grids.length}`];
  const key = (cells: readonly string[]): string => cells.join(' | ');
  const listed = (grids[0] ?? []).slice(1).map(key);
  const census = rows.map(row => key([codeCell(row.id), codeCell(row.why)]));
  for (const [index, row] of rows.entries()) {
    if (!listed.includes(census[index] ?? '')) out.push(`falsifier ${row.id} (${row.why}) is not listed in ${where}`);
  }
  for (const entry of listed) if (!census.includes(entry)) out.push(`${where} lists ${entry}, which the census's falsifier rows do not carry`);
  const sameSet = census.every(entry => listed.includes(entry)) && listed.every(entry => census.includes(entry));
  if (sameSet && listed.join('\n') !== census.join('\n')) out.push(`${where} lists the census's falsifier rows out of table order or more than once`);
  return out;
}
/** A synthetic docs/14 around the falsifier section, for the reader's own falsifiers (never the live text). */
function syntheticFalsifiers(rows: readonly NamedFalsifier[], options: {heading?: string; before?: string; inside?: string; cell?: (value: string) => string} = {}): string {
  const cell = options.cell ?? codeCell;
  const table = [FALSIFIERS_HEADER, FALSIFIERS_HEADER.map(() => '---'), ...rows.map(row => [cell(row.id), cell(row.why)])].map(cells => `| ${cells.join(' | ')} |`);
  return [`# ${DOCS_14_PARENT}`, '', '## Truth labels and release gates', '', 'Text.', '', ...(options.before === undefined ? [] : [options.before, '']),
    `## ${options.heading ?? FALSIFIERS_HEADING}`, '', FALSIFIERS_INTRO, '', ...table, '', ...(options.inside === undefined ? [] : [options.inside, '']),
    '## Acceptance journey evidence', '', 'Text.', ''].join('\n');
}

interface Pins {
  readonly cases: number;
  readonly parked: string[];
  readonly contract: boolean;
  readonly representation: boolean;
  readonly digest: boolean;
  readonly leak: boolean;
  readonly invariantInEveryCase: boolean;
  readonly receiptInEveryCase: boolean;
  readonly receiptOnStdout: boolean;
}
/** The kept pins of one live source: each must sit in a running HX case; the predicate and the receipt in every HX case. */
function pinsOf(name: string, text: string): Pins {
  const hx = casesOf(parse(name, text)).filter(item => HX_TITLE.test(item.title));
  const running = hx.filter(item => item.parked === undefined && item.body !== undefined);
  const someRunning = (judge: (body: ts.Node) => boolean): boolean => running.some(item => item.body !== undefined && judge(item.body));
  const every = (judge: (body: ts.Node) => boolean): boolean => hx.length > 0 && hx.every(item => item.parked === undefined && item.body !== undefined && judge(item.body));
  return {
    cases: hx.length,
    parked: hx.filter(item => item.parked !== undefined).map(item => `${name}:${item.line} '${item.title}' ${item.parked}`),
    contract: someRunning(body => pinsProperty(body, 'contract', 'hyperunix.find/v1')),
    representation: someRunning(body => pinsProperty(body, 'representation', 'hyperunix.result/1')),
    digest: someRunning(pinsDigest),
    leak: someRunning(pinsLeakCheck),
    invariantInEveryCase: every(assertsInvariant),
    receiptInEveryCase: every(printsReceipt),
    receiptOnStdout: every(writesReceiptToStdout),
  };
}

/** A string array property of the `test` object of `export default defineConfig({...})` in a vitest config. */
function vitestArray(name: string, text: string, key: 'include' | 'exclude'): string[] | undefined {
  const sf = parse(name, text);
  for (const statement of sf.statements) {
    if (!ts.isExportAssignment(statement) || !ts.isCallExpression(statement.expression)) continue;
    const config = statement.expression.arguments[0];
    if (config === undefined || !ts.isObjectLiteralExpression(config)) continue;
    const testBlock = config.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && keyOf(property.name) === 'test');
    if (testBlock === undefined || !ts.isObjectLiteralExpression(testBlock.initializer)) return undefined;
    const array = testBlock.initializer.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && keyOf(property.name) === key);
    if (array === undefined || !ts.isArrayLiteralExpression(array.initializer)) return undefined;
    const values = array.initializer.elements.map(element => literal(element));
    return values.every((value): value is string => value !== undefined) ? values : undefined;
  }
  return undefined;
}
/** forge.toml split into [section] -> body text, in file order. */
function tomlSections(text: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current = '';
  for (const line of text.split('\n')) {
    const header = /^\s*\[([^\]]+)\]\s*$/.exec(line);
    if (header !== null) {
      current = header[1]?.trim() ?? '';
      sections.set(current, '');
      continue;
    }
    sections.set(current, `${sections.get(current) ?? ''}${line}\n`);
  }
  return sections;
}
function gateSteps(sections: ReadonlyMap<string, string>): string[] {
  const line = /^\s*gate\s*=\s*\[([^\]]*)\]/m.exec(sections.get('build') ?? '');
  return line === null ? [] : [...(line[1] ?? '').matchAll(/"([^"]+)"/g)].map(match => match[1] ?? '');
}

describe('wb-tz2.2 census: the two live-binary HX test sources', () => {
  it('wb-drd AC1: the judged LIVE set keeps both named sources in order', () => {
    expect(LIVE).toStrictEqual(['test/workbench-native-ecosystem.test.ts', 'test/workbench-ecosystem-native.test.ts']);
  });

  it('wb-drd LIVE anchor: the judged LIVE set is exactly the native-tier files that carry an HX case (read from vitest.native.config.ts, outside this census)', () => {
    const native = vitestArray(NATIVE_CONFIG, readRepo(NATIVE_CONFIG), 'include') ?? [];
    const withHx = native.filter(file => casesOf(parse(file, readRepo(file))).some(item => HX_TITLE.test(item.title)));
    expect([...withHx].sort()).toStrictEqual([...LIVE].sort());
  });

  const sources = LIVE.map(file => [file, readRepo(file)] as const);

  it.each(LIVE.flatMap(file => SPEC_FORBIDDEN.map((form, index) => [file, String(form), index] as const)))(
    'R2: %s never spells %s (raw text, comments included)', (file, _form, index) => {
      expect(readRepo(file)).not.toMatch(SPEC_FORBIDDEN[index]);
    });

  it.each(LIVE)('R2: %s asserts no verdict value in active code (no incomplete kind, bare version or unlicensed licence)', file => {
    expect(forbiddenExpectations(parse(file, readRepo(file)))).toStrictEqual([]);
  });

  it.each(LIVE)('R2: %s keeps the contract, representation and sha-256 pins inside a running HX case', file => {
    const pins = pinsOf(file, readRepo(file));
    expect(pins.cases).toBeGreaterThan(0);
    expect(pins.parked).toStrictEqual([]);
    expect({contract: pins.contract, representation: pins.representation, digest: pins.digest})
      .toStrictEqual({contract: true, representation: true, digest: true});
  });

  it('R2: test/workbench-ecosystem-native.test.ts keeps the not.toContain(\'"verified":true\') leak check inside a running HX case', () => {
    expect(pinsOf(ECOSYSTEM_NATIVE, readRepo(ECOSYSTEM_NATIVE)).leak).toBe(true);
  });

  it.each(LIVE)('R1: every HX case in %s asserts the shared hxLiveInvariant verdict holds', file => {
    expect(pinsOf(file, readRepo(file)).invariantInEveryCase).toBe(true);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: every HX case in %s prints its receipt line through hxLiveReceipt', file => {
    expect(pinsOf(file, readRepo(file)).receiptInEveryCase).toBe(true);
  });

  it.each(LIVE)('wb-tz2.14: every HX case in %s writes its receipt with process.stdout.write, never console.log/info (the wb-bj6 class: the agent reporter drops console output)', file => {
    expect(pinsOf(file, readRepo(file)).receiptOnStdout).toBe(true);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: no describe or it title in %s claims an installed binary', file => {
    const sf = parse(file, readRepo(file));
    const titles = [...suiteTitles(sf), ...casesOf(sf).map(item => item.title)];
    expect(titles.length).toBeGreaterThan(0);
    expect(titles.filter(title => /installed/i.test(title))).toStrictEqual([]);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: the leading doc comment of %s claims no installed binary either', file => {
    const text = readRepo(file);
    const leading = (ts.getLeadingCommentRanges(text, 0) ?? []).map(range => text.slice(range.pos, range.end)).join('\n');
    expect(leading.length).toBeGreaterThan(0);
    expect(leading).not.toMatch(/installed/i);
  });

  it('reads both live sources from disk, non-empty, each with at least one HX case', () => {
    for (const [file, text] of sources) {
      expect(text.length, file).toBeGreaterThan(0);
      expect(pinsOf(file, text).cases, file).toBeGreaterThan(0);
    }
  });
});

describe('wb-tz2.2 census: the live tier stays separate from the default gate', () => {
  it('R2: vitest.config.ts includes test/**/*.test.ts yet excludes both live files, so the default gate never runs them', () => {
    const text = readRepo('vitest.config.ts');
    expect(vitestArray('vitest.config.ts', text, 'include')).toContain('test/**/*.test.ts');
    const exclude = vitestArray('vitest.config.ts', text, 'exclude') ?? [];
    for (const file of LIVE) expect(exclude).toContain(file);
  });

  it('R2: vitest.native.config.ts still includes both live files', () => {
    const include = vitestArray(NATIVE_CONFIG, readRepo(NATIVE_CONFIG), 'include') ?? [];
    for (const file of LIVE) expect(include).toContain(file);
  });

  it('R2: no other vitest config so much as names either live file', () => {
    const others = readdirSync(ROOT).filter(name => /^vitest\.[\w.-]+\.config\.ts$/.test(name) && name !== NATIVE_CONFIG);
    expect(others.length).toBeGreaterThan(0);
    for (const name of others) {
      for (const file of LIVE) expect(readRepo(name), name).not.toContain(file);
    }
  });

  it('R2: the live tier remains only forge.toml [build.commands.native-read], and the default gate never lists it', () => {
    const sections = tomlSections(readRepo('forge.toml'));
    const runners = [...sections].filter(([, body]) => body.includes(NATIVE_CONFIG)).map(([name]) => name);
    expect(runners).toStrictEqual(['build.commands.native-read']);
    expect(sections.get('build.commands.native-read')).toMatch(/^command = "\.\/node_modules\/\.bin\/vitest run --config vitest\.native\.config\.ts"$/m);
    const steps = gateSteps(sections);
    expect(steps).toContain('test');
    expect(steps).not.toContain('native-read');
    const pkg: unknown = JSON.parse(readRepo('package.json'));
    const script = typeof pkg === 'object' && pkg !== null && 'scripts' in pkg && typeof pkg.scripts === 'object' && pkg.scripts !== null &&
      'test' in pkg.scripts ? pkg.scripts.test : undefined;
    expect(script).toBe('vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions');
  });
});

/** The rewritten live HX case body, statement for statement. */
const WELL_FORMED: readonly string[] = [
  'const result = await read();',
  "expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
  'const verdict = hxLiveInvariant(result);',
  'expect(verdict).toMatchObject({holds: true, violations: []});',
  "expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
  'process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");',
];
/** Builds a live HX case source for the falsifier rows; modifiers are spliced at runtime so this file spells none of them. */
function liveSource(options: {member?: string; option?: string; suiteMember?: string; param?: string; statements?: readonly string[]; title?: string} = {}): string {
  const caseCallee = options.member === undefined ? 'it' : ['it', options.member].join('.');
  const suiteCallee = options.suiteMember === undefined ? 'describe' : ['describe', options.suiteMember].join('.');
  const opts = options.option === undefined ? '' : `{${options.option}: true}, `;
  const statements = options.statements ?? WELL_FORMED;
  return [
    "import {describe, expect, it} from 'vitest';",
    `${suiteCallee}('suite', () => {`,
    `  ${caseCallee}('${options.title ?? 'HX probe'}', ${opts}async (${options.param ?? ''}) => {`,
    ...statements.map(line => `    ${line}`),
    '  });',
    '});',
    '',
  ].join('\n');
}

/** wb-xhy1: a falsifier row as the docs/14 probe list names it - the row id and every statement its probe runs. */
interface ProbedFalsifier {
  readonly id: string;
  readonly statements: readonly string[];
}
/** The statements every falsifier probe opens with: the well-formed case without its receipt write. A dead-write row replaces that write with its
 * dead shape and an echo row keeps it and adds its echo, so a row's probe tail - what its docs/14 entry lists - is every statement after these. */
const PROBE_PREFIX: readonly string[] = WELL_FORMED.slice(0, -1);
const probeTail = (row: ProbedFalsifier): readonly string[] => row.statements.slice(PROBE_PREFIX.length);
/** One run of whitespace as one space, as the shared rendered view (docsSection) reads a block's text and its source. */
const collapsed = (text: string): string => text.replace(/\s+/g, ' ').trim();
/** A docs/14 probe entry's source: the row id in one code span, a colon, then one code span per probe statement, in order. */
const probeEntry = (row: ProbedFalsifier): string => `${codeCell(row.id)}: ${probeTail(row).map(codeCell).join(' ')}`;
/** The rendered blocks the probe section must be (the shared adoption form): its intro paragraph and one bullet list of the entries. */
function probeBlocks(rows: readonly ProbedFalsifier[]): RenderedBlock[] {
  return [
    {kind: 'paragraph', text: PROBES_INTRO, markdown: PROBES_INTRO},
    {kind: 'list', ordered: false, items: rows.map(row => ({text: collapsed(`${row.id}: ${probeTail(row).join(' ')}`), markdown: collapsed(probeEntry(row))}))},
  ];
}
type RenderedList = Extract<RenderedBlock, {kind: 'list'}>;
/** Every drift between docs/14 "HX live-tier receipt falsifier probes" and the falsifier rows (wb-xhy1), each naming the row: every row must open
 * with PROBE_PREFIX; the section must render as exactly its intro and one list of the entries; and that list - the section's own blocks, from the
 * binding its rendered view is judged in, never a whole-document read - must carry every row's entry source (one code span per statement) in both
 * directions and in table order. A probe statement swapped in SURVIVORS for another refused shape, its AC1 digest re-pinned (the CT3x coordinated
 * swap), still reads red here, against a surface outside this census. */
function probeListFailures(markdown: string, rows: readonly ProbedFalsifier[]): string[] {
  const where = `${DOCS_14} "${PROBES_HEADING}"`;
  const out: string[] = [];
  for (const row of rows) {
    if (PROBE_PREFIX.some((statement, index) => row.statements[index] !== statement)) {
      out.push(`falsifier ${row.id} does not open with the first ${PROBE_PREFIX.length} statements of the well-formed case, so ${where} cannot list its probe`);
    }
  }
  const section = docsSection(markdown, PROBES_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [...out, `${where}: the section is refused: ${section.why}`];
  const exact = sectionMatches(section, probeBlocks(rows));
  if (!exact.ok) out.push(`${where} is not exactly its intro paragraph and one list of the census's falsifier probes: ${exact.why}`);
  const lists = section.blocks.filter((block): block is RenderedList => block.kind === 'list');
  if (lists.length !== 1) return [...out, `${where}: the section must hold exactly one list, the probe list; it holds ${lists.length}`];
  const listed = (lists[0]?.items ?? []).map(item => item.markdown);
  const census = rows.map(row => collapsed(probeEntry(row)));
  for (const [index, row] of rows.entries()) {
    if (!listed.includes(census[index] ?? '')) out.push(`the probe of falsifier ${row.id} (${census[index] ?? ''}) is not listed in ${where}`);
  }
  for (const entry of listed) if (!census.includes(entry)) out.push(`${where} lists ${entry}, which no falsifier probe of the census runs`);
  const sameSet = census.every(entry => listed.includes(entry)) && listed.every(entry => census.includes(entry));
  if (sameSet && listed.join('\n') !== census.join('\n')) out.push(`${where} lists the census's falsifier probes out of table order or more than once`);
  return out;
}
/** A synthetic docs/14 around the probe section, for the probe reader's own falsifiers (never the live text). */
function syntheticProbes(rows: readonly ProbedFalsifier[], options: {heading?: string; before?: string; inside?: string; entry?: (row: ProbedFalsifier) => string} = {}): string {
  const entry = options.entry ?? probeEntry;
  return [`# ${DOCS_14_PARENT}`, '', `## ${FALSIFIERS_HEADING}`, '', 'Text.', '', ...(options.before === undefined ? [] : [options.before, '']),
    `## ${options.heading ?? PROBES_HEADING}`, '', PROBES_INTRO, '', ...rows.map(row => `- ${entry(row)}`), '',
    ...(options.inside === undefined ? [] : [options.inside, '']), '## Acceptance journey evidence', '', 'Text.', ''].join('\n');
}

/** Runs the case callbacks of a live-source probe in a vm sandbox and counts the receipt lines that really reach process.stdout.write and a
 * console member, directly or through window.console or global.console (wb-drd): the executed leg beside the structural stdout pin. The sandbox
 * stubs every free identifier the probe uses; hxLiveReceipt returns a fixed marker and both counters count only lines that carry it, so a count
 * is a count of receipt prints, never of anything else (the F4 control pins both filters). */
async function executedReceipts(source: string): Promise<{stdout: number; echoed: number}> {
  const counts = {stdout: 0, echoed: 0};
  const callbacks: (() => Promise<unknown>)[] = [];
  const echo = (...args: readonly unknown[]): void => {
    if (args.some(arg => String(arg).includes(RECEIPT_MARKER))) counts.echoed += 1;
  };
  const consoleStub = {log: echo, info: echo, debug: echo, warn: echo, error: echo, table: echo};
  const expectStub = Object.assign(() => ({toMatchObject: () => undefined, not: {toContain: () => undefined}}), {stringMatching: () => undefined});
  const sandbox = {
    exports: {},
    require: () => ({describe: (_title: string, body: () => void) => body(), it: (_title: string, body: () => Promise<unknown>) => callbacks.push(body), expect: expectStub}),
    process: {stdout: {write: (text: string) => {
      if (text.includes(RECEIPT_MARKER)) counts.stdout += 1;
      return true;
    }}},
    console: consoleStub,
    window: {console: consoleStub},
    global: {console: consoleStub},
    read: async () => ({}),
    hxLiveInvariant: () => ({holds: true, violations: []}),
    hxLiveReceipt: () => RECEIPT_MARKER,
    expect: expectStub,
  };
  const output = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText;
  runInNewContext(output, sandbox, {timeout: 2000});
  for (const body of callbacks) await body();
  return counts;
}

describe('wb-tz2.2 census: the scanner itself is falsifiable', () => {
  it('a well-formed live source passes every pin and carries no forbidden expectation', () => {
    const pins = pinsOf('probe.ts', liveSource());
    expect(pins).toStrictEqual({cases: 1, parked: [], contract: true, representation: true, digest: true, leak: true, invariantInEveryCase: true, receiptInEveryCase: true, receiptOnStdout: true});
    expect(forbiddenExpectations(parse('probe.ts', liveSource()))).toStrictEqual([]);
  });

  const forbidden: [string, string, number][] = [
    ['the pre-rewrite native-ecosystem:10 statement', "expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{representation:'hyperunix.result/1',coverage_summary:{licenses_absence:false}},runtime:{version:'0.1.0'}});", 2],
    ['the pre-rewrite ecosystem-native:19 statement', "expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{execution_status:{kind:'incomplete'},coverage_summary:{licenses_absence:false}}});", 2],
    ['a quoted licenses_absence key', 'expect(result).toMatchObject({source: {coverage_summary: {"licenses_absence": false}}});', 1],
    ['toBe(false) on the licence', 'expect(result.source.coverage_summary.licenses_absence).toBe(false);', 1],
    ['toStrictEqual(false) on an element-accessed licence', "expect(result.source.coverage_summary['licenses_absence']).toStrictEqual(false);", 1],
    ['toBeFalsy() on the licence', 'expect(result.source.coverage_summary.licenses_absence).toBeFalsy();', 1],
    ['not.toBe(true) on the licence', 'expect(result.source.coverage_summary.licenses_absence).not.toBe(true);', 1],
    ['not.toBeTruthy() on the licence', 'expect(result.source.coverage_summary.licenses_absence).not.toBeTruthy();', 1],
    ['toHaveProperty with a dotted licence path', "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', false);", 1],
    ['toHaveProperty with an array licence path', "expect(result).toHaveProperty(['source', 'coverage_summary', 'licenses_absence'], false);", 1],
    ['the incomplete kind in double quotes', 'expect(result).toMatchObject({source: {execution_status: {kind: "incomplete"}}});', 1],
    ['the incomplete kind through toBe', "expect(result.source.execution_status.kind).toBe('incomplete');", 1],
    ['the bare version through toBe', "expect(result.runtime.version).toBe('0.1.0');", 1],
    ['a later bare version in a template literal', 'expect(result.runtime.version).toBe(`0.2.0`);', 1],
  ];
  it.each(forbidden)('flags %s', (_name, statement, count) => {
    expect(forbiddenExpectations(parse('probe.ts', liveSource({statements: [statement]})))).toHaveLength(count);
  });

  it('never flags titles or messages that merely contain the words, or a licence asserted true', () => {
    const benign = ["expect(result).toMatchObject({source: {coverage_summary: {licenses_absence: true}}});", "const note = 'coverage stays incomplete in 0.1.0 builds';",
      'expect(result.source.coverage_summary.licenses_absence).toBe(true);', "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', true);"];
    expect(forbiddenExpectations(parse('probe.ts', liveSource({statements: benign, title: 'HX coverage stays incomplete under 0.1.0'})))).toStrictEqual([]);
  });

  it('refuses a commented-out pin: comments are trivia, never code', () => {
    const commented = liveSource({statements: [
      "// expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
      '/* const verdict = hxLiveInvariant(result); expect(verdict).toMatchObject({holds: true}); */',
      "// expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
      '// process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");',
    ]});
    expect(pinsOf('probe.ts', commented)).toMatchObject({cases: 1, contract: false, representation: false, digest: false, leak: false, invariantInEveryCase: false, receiptInEveryCase: false, receiptOnStdout: false});
  });

  it.each(['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'])('wb-tz2.14: a receipt printed with %s is refused by the stdout pin while printsReceipt still sees it', member => {
    const statements = [...WELL_FORMED.slice(0, -1), `${member}(hxLiveReceipt(result, verdict));`];
    expect(pinsOf('probe.ts', liveSource({statements}))).toMatchObject({receiptInEveryCase: true, receiptOnStdout: false});
  });

  it('wb-tz2.14: the template-literal form the live tests use passes the stdout pin', () => {
    const template = [...WELL_FORMED.slice(0, -1), ['process.stdout.write(`$', '{hxLiveReceipt(result, verdict)}\\n`);'].join('')];
    expect(pinsOf('probe.ts', liveSource({statements: template})).receiptOnStdout).toBe(true);
  });

  it('wb-tz2.14: a receipt also echoed through console is refused; a bare process.stdout.write argument passes', () => {
    const both = [...WELL_FORMED, 'console.log(hxLiveReceipt(result, verdict));'];
    expect(pinsOf('probe.ts', liveSource({statements: both})).receiptOnStdout).toBe(false);
    const bare = [...WELL_FORMED.slice(0, -1), 'process.stdout.write(hxLiveReceipt(result, verdict));'];
    expect(pinsOf('probe.ts', liveSource({statements: bare})).receiptOnStdout).toBe(true);
  });

  it('wb-tz2.14: a process.stdout.write of something other than the receipt does not satisfy the stdout pin', () => {
    const unrelated = [...WELL_FORMED.slice(0, -1), "process.stdout.write('done\\n');", 'const line = hxLiveReceipt(result, verdict);'];
    expect(pinsOf('probe.ts', liveSource({statements: unrelated}))).toMatchObject({receiptInEveryCase: true, receiptOnStdout: false});
  });

  /** wb-drd: the named falsifier rows of the wb-tz2.14 receipt census - the five original survivors (row 479 F6), GE1 (R584 U2), the row 626 F1
   * terminator rows plus the early-return quantifier row, the documented else, loop and ternary shapes, and the echo spellings of row 626 U1
   * (J8/J9/J12b) plus the type-assertion and any-member echoes, and the wb-drd.1 inner-block return row (drd gate PREP F2: a return before the write inside
   * the write's own nested plain block, the D-BODY-ONLY survivor). The dead-write shapes print the receipt where it can never run; the echo shapes print it
   * through console beside the stdout write. Each row's why is one JUDGE CLAIMS line of writesReceiptToStdout's doc (the claims anchor below), and each row's
   * name and why are one row of the docs/14 falsifier table (the wb-drd.1 anchor below, outside this census). */
  const SURVIVORS: readonly {readonly id: string; readonly why: string; readonly statements: readonly string[]; readonly stdout: number; readonly echoed: number}[] = [
    {id: 'dead-write-if-false', why: 'a write inside if (false)', statements: [...WELL_FORMED.slice(0, -1), 'if (false) {', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'], stdout: 0, echoed: 0},
    {id: 'dead-write-after-return', why: 'a write unreached after return', statements: [...WELL_FORMED.slice(0, -1), 'return;', 'process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");'], stdout: 0, echoed: 0},
    {id: 'dead-write-uninvoked-closure', why: 'a write inside an uninvoked closure', statements: [...WELL_FORMED.slice(0, -1), 'const emit = () => {', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '};'], stdout: 0, echoed: 0},
    {id: 'dead-write-after-block-return', why: 'a write unreached after an unconditional return in a prior plain block', statements: [...WELL_FORMED.slice(0, -1), '{ return; }', 'process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");'], stdout: 0, echoed: 0},
    {id: 'dead-write-after-late-block-return', why: 'a write unreached after a prior plain block whose return follows another statement', statements: [...WELL_FORMED.slice(0, -1), '{ hxLiveInvariant(result); return; }', 'process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");'], stdout: 0, echoed: 0},
    {id: 'dead-write-after-early-block-return', why: 'a write unreached after a prior plain block whose return precedes another statement', statements: [...WELL_FORMED.slice(0, -1), '{ return; hxLiveInvariant(result); }', 'process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");'], stdout: 0, echoed: 0},
    {id: 'dead-write-nested-after-return', why: 'a write in a nested plain block unreached after an outer return', statements: [...WELL_FORMED.slice(0, -1), 'return;', '{', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'], stdout: 0, echoed: 0},
    {id: 'dead-write-inner-after-return', why: 'a write in a nested plain block unreached after a return inside that block', statements: [...WELL_FORMED.slice(0, -1), '{', '  return;', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'], stdout: 0, echoed: 0},
    {id: 'dead-write-else', why: 'a write in the untaken else branch of an if', statements: [...WELL_FORMED.slice(0, -1), 'if (true) {', '} else {', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'], stdout: 0, echoed: 0},
    {id: 'dead-write-loop', why: 'a write inside a loop body that never runs', statements: [...WELL_FORMED.slice(0, -1), 'while (false) {', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'], stdout: 0, echoed: 0},
    {id: 'dead-write-ternary', why: 'a write in the untaken arm of a ternary', statements: [...WELL_FORMED.slice(0, -1), 'false ? process.stdout.write(hxLiveReceipt(result, verdict) + "\\n") : undefined;'], stdout: 0, echoed: 0},
    {id: 'echo-element-access', why: "console['log'] beside the stdout write", statements: [...WELL_FORMED, "console['log'](hxLiveReceipt(result, verdict));"], stdout: 1, echoed: 1},
    {id: 'echo-globalThis-console', why: 'globalThis.console.log beside the stdout write', statements: [...WELL_FORMED, 'globalThis.console.log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-globalThis-element-console', why: "globalThis['console'].log beside the stdout write", statements: [...WELL_FORMED, "globalThis['console'].log(hxLiveReceipt(result, verdict));"], stdout: 1, echoed: 1},
    {id: 'echo-window-console', why: 'window.console.log beside the stdout write', statements: [...WELL_FORMED, 'window.console.log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-global-console', why: 'global.console.log beside the stdout write', statements: [...WELL_FORMED, 'global.console.log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-parenthesised-console', why: '(console).log beside the stdout write', statements: [...WELL_FORMED, '(console).log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-nonnull-console', why: 'console!.log beside the stdout write', statements: [...WELL_FORMED, 'console!.log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-as-console', why: '(console as Console).log beside the stdout write', statements: [...WELL_FORMED, '(console as Console).log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-satisfies-console', why: '(console satisfies Console).log beside the stdout write', statements: [...WELL_FORMED, '(console satisfies Console).log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-angle-assertion-console', why: '(<Console>console).log beside the stdout write', statements: [...WELL_FORMED, '(<Console>console).log(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
    {id: 'echo-any-member-console', why: 'console.table, a member of any name, beside the stdout write', statements: [...WELL_FORMED, 'console.table(hxLiveReceipt(result, verdict));'], stdout: 1, echoed: 1},
  ];

  it('wb-drd: the named falsifier rows are the frozen set, in table order (a deleted or renamed row reds here)', () => {
    expect(SURVIVORS.map(item => item.id)).toStrictEqual([
      'dead-write-if-false', 'dead-write-after-return', 'dead-write-uninvoked-closure', 'dead-write-after-block-return',
      'dead-write-after-late-block-return', 'dead-write-after-early-block-return', 'dead-write-nested-after-return', 'dead-write-inner-after-return',
      'dead-write-else',
      'dead-write-loop', 'dead-write-ternary',
      'echo-element-access', 'echo-globalThis-console', 'echo-globalThis-element-console', 'echo-window-console', 'echo-global-console',
      'echo-parenthesised-console', 'echo-nonnull-console', 'echo-as-console', 'echo-satisfies-console', 'echo-angle-assertion-console',
      'echo-any-member-console',
    ]);
  });

  // R584 U1 + rule 16: freeze every row's id, full requirement label, statement sequence and executed expectations.
  // These literal digests are the cut-time content, not a hash recomputed from a second copy of SURVIVORS.
  it('wb-drd AC1: the falsifier rows keep their complete frozen content, not only their ids', () => {
    expect(SURVIVORS.map(item => createHash('sha256').update(JSON.stringify(item)).digest('hex'))).toStrictEqual([
      'e1321248a4f60372f203e3d79265512fc9746d60e99263d68e1fff6c6cc8e2da', // dead-write-if-false
      'a4d5821aabb6ee83f47a0d5da19b2ea70f0fece6143bc5ab7cee48f4ffa12a1d', // dead-write-after-return
      'e0d09fd056bdf1012a7ed2895ee8531c9fba55528426b4b5289d995319ff7585', // dead-write-uninvoked-closure
      'ffa5f67b7406167dc5a97de8abc72939a230b736bcea0a82076fd6ddd72dd0e8', // dead-write-after-block-return
      '9f55bc7fa8bcd2e9077c69499e509ae0740c179b1b46c991d946e0ff672f01e4', // dead-write-after-late-block-return
      'fa8356c720dbe918c74ea9f0d8cf0491d52b73c12df70d0e92410cf6bf409cb4', // dead-write-after-early-block-return
      'e5b1df2e88e764f4530da1a389c7354813fb62d23e3583b0eeafe84b83abf246', // dead-write-nested-after-return
      'e577b4466aeb9234d1dbeb756d9cbe28256335cfb70748306a7b840d73940085', // dead-write-inner-after-return
      '3a3eabb6d95d60e076f6b252efd11feab642e9cf1a4ec9c65e1c932f0e6b7f62', // dead-write-else
      '536142dc47b78b3635cbb06e39ed8403f7103b906ca7be955bacbea31d450158', // dead-write-loop
      'b2244d37bf02316f06020170aeb03ba12b7a4766d3e41121c3f8e218ec38f8e4', // dead-write-ternary
      '00bf1edcf66318de1b37b25f8143aa6548ab785fa4fb37f7b661362837b95338', // echo-element-access
      'a25397c8b2a85f4a2cb869ee86d13ac3382b06b840d6a934ab2406c19ddf9a52', // echo-globalThis-console
      'e7e90dc7d3e9a8ea35d3ff167cd09b1ca08a517eecdbba2ec8930492c400b93a', // echo-globalThis-element-console
      'f6872794f46e0ee8194db9b576caf3bc137a69a526e1f54eca46882482f49d97', // echo-window-console
      '092a1ce8ad5edf472e40de388125a38a621310d8e05c78d84e352a1f0e95d2eb', // echo-global-console
      '433d93c1006a3575ad60822b2e186c20dccc7d1566a5c7c48ffe3fa3e501330d', // echo-parenthesised-console
      'f54505e53f2bc4c44302ac5690c12fa06d41c10f70d8cc5aab184c96970931c3', // echo-nonnull-console
      'bcf8b7d42a456eeb7e36311f2f625c989d0bdf228f58c75f1a1a840902e8a4da', // echo-as-console
      '320b2ea1d3167f6cbbe351ddd3ebc6e2807d5277c94d44ca4fb951f68ffba90d', // echo-satisfies-console
      'c7df19d0b9f9647ccad14ad956c9815a16058335568d48f7c91af481d56271d7', // echo-angle-assertion-console
      '1a317405794c5e971171f028477e9ac2887f7fc0ebcce3e64d601351c08600f4', // echo-any-member-console
    ]);
  });

  // The class guard for row 626 U1 (a claimed judge leg with no falsifier row) and the CT5 anchor outside the frozen literals: the judge's own
  // documented claims (writesReceiptToStdout's JUDGE CLAIMS lines) must be exactly the rows' whys, so a row deleted together with its literal
  // elements still reds here, and so does a claim documented without its row.
  it('wb-drd claims anchor: the judge documents exactly the shapes the named falsifier rows pin, in table order (a claim without its row reds)', () => {
    expect(judgeClaims()).toStrictEqual(SURVIVORS.map(item => item.why));
  });

  // wb-drd.1 (drd gate PREP F1): the claims anchor above reads this file's own doc, so a row deleted together with its ids, digest and claim line
  // stayed green. This anchor reads docs/14, outside the census: the coordinated hollow of every census literal reds here (rule 16 CT6).
  it('wb-drd.1 anchor: docs/14 "HX live-tier receipt falsifiers" lists exactly the named falsifier rows - name and refused shape, in table order - outside this census (rule 16 CT5/CT6)', () => {
    expect(falsifierTableFailures(readRepo(DOCS_14), SURVIVORS)).toStrictEqual([]);
  });

  it('wb-drd.1 reader control: a synthetic docs/14 that writes exactly the falsifier rows passes', () => {
    expect(falsifierTableFailures(syntheticFalsifiers(SURVIVORS), SURVIVORS)).toStrictEqual([]);
  });

  it('wb-drd.1 reader: a falsifier the docs table drops reds, naming the row', () => {
    const dropped = SURVIVORS[3];
    expect(dropped).toBeDefined();
    const lines = falsifierTableFailures(syntheticFalsifiers(SURVIVORS.filter(item => item !== dropped)), SURVIVORS);
    expect(lines).toContain(`falsifier ${dropped?.id} (${dropped?.why}) is not listed in ${DOCS_14} "${FALSIFIERS_HEADING}"`);
  });

  it('wb-drd.1 reader: a docs row the census does not carry reds, naming the row', () => {
    const lines = falsifierTableFailures(syntheticFalsifiers([...SURVIVORS, {id: 'echo-extra', why: 'an extra shape'}]), SURVIVORS);
    expect(lines).toContain(`${DOCS_14} "${FALSIFIERS_HEADING}" lists \`echo-extra\` | \`an extra shape\`, which the census's falsifier rows do not carry`);
  });

  it('wb-drd.1 reader: two swapped docs rows red as out of table order', () => {
    const swapped = [SURVIVORS[1], SURVIVORS[0], ...SURVIVORS.slice(2)].filter((item): item is (typeof SURVIVORS)[number] => item !== undefined);
    expect(swapped).toHaveLength(SURVIVORS.length);
    const lines = falsifierTableFailures(syntheticFalsifiers(swapped), SURVIVORS);
    expect(lines).toContain(`${DOCS_14} "${FALSIFIERS_HEADING}" lists the census's falsifier rows out of table order or more than once`);
  });

  it('wb-drd.1 reader: a refused shape shortened in the docs reds on both sides, so the why is anchored and not only the name', () => {
    const shortened = SURVIVORS.map(item => (item.id === 'echo-window-console' ? {id: item.id, why: 'window.console.log'} : item));
    const lines = falsifierTableFailures(syntheticFalsifiers(shortened), SURVIVORS);
    expect(lines).toContain(`falsifier echo-window-console (window.console.log beside the stdout write) is not listed in ${DOCS_14} "${FALSIFIERS_HEADING}"`);
    expect(lines).toContain(`${DOCS_14} "${FALSIFIERS_HEADING}" lists \`echo-window-console\` | \`window.console.log\`, which the census's falsifier rows do not carry`);
  });

  it('wb-drd.1 reader: a cell written without its code span reds, so the docs table keeps the one cell form the reader judges', () => {
    const lines = falsifierTableFailures(syntheticFalsifiers(SURVIVORS, {cell: value => (value === 'a write inside a loop body that never runs' ? value : codeCell(value))}), SURVIVORS);
    expect(lines).toContain(`falsifier dead-write-loop (a write inside a loop body that never runs) is not listed in ${DOCS_14} "${FALSIFIERS_HEADING}"`);
  });

  it('wb-drd.1 reader: a renamed, duplicated or re-homed section heading refuses the section', () => {
    const refused = (markdown: string): string => falsifierTableFailures(markdown, SURVIVORS)[0] ?? '';
    expect(refused(syntheticFalsifiers(SURVIVORS, {heading: 'HX receipt notes'}))).toContain('the section is refused');
    expect(refused(syntheticFalsifiers(SURVIVORS, {inside: `## ${FALSIFIERS_HEADING}`}))).toContain('occurs 2 times');
    expect(refused(syntheticFalsifiers(SURVIVORS, {before: '# Appendix'}))).toContain('the census binds it under');
  });

  it('wb-drd.1 reader: a paragraph added beside the table, or the table hidden in an HTML comment, is not the section the census adopts', () => {
    const weakened = falsifierTableFailures(syntheticFalsifiers(SURVIVORS, {inside: 'A shape may be dropped from the census without a docs edit.'}), SURVIVORS);
    expect(weakened.some(line => line.includes('is not exactly its intro paragraph and one table'))).toBe(true);
    const hidden = syntheticFalsifiers(SURVIVORS).replace(`| ${FALSIFIERS_HEADER.join(' | ')} |`, `<!--\n| ${FALSIFIERS_HEADER.join(' | ')} |`).replace('\n\n## Acceptance', '\n-->\n\n## Acceptance');
    const lines = falsifierTableFailures(hidden, SURVIVORS);
    expect(lines.some(line => line.includes('is not exactly its intro paragraph and one table'))).toBe(true);
    expect(lines).toContain(`${DOCS_14}: the falsifier table must occur exactly once; found 0`);
  });

  it('wb-drd control: the well-formed case executes exactly one stdout receipt line, echoes none, and passes the stdout pin', async () => {
    expect(await executedReceipts(liveSource())).toStrictEqual({stdout: 1, echoed: 0});
    expect(pinsOf('probe.ts', liveSource()).receiptOnStdout).toBe(true);
  });

  it('wb-drd F4: the executed leg counts receipt lines only - another stdout write and a console call without the receipt count nothing', async () => {
    const statements = [...WELL_FORMED, "process.stdout.write('done\\n');", "console.log('done');"];
    expect(await executedReceipts(liveSource({statements}))).toStrictEqual({stdout: 1, echoed: 0});
  });

  it.each(SURVIVORS)('wb-drd survivor $id ($why): execution confirms the shape, and the stdout pin refuses it', async item => {
    expect.assertions(2);
    expect(await executedReceipts(liveSource({statements: item.statements}))).toStrictEqual({stdout: item.stdout, echoed: item.echoed});
    expect(pinsOf('probe.ts', liveSource({statements: item.statements}))).toMatchObject({receiptInEveryCase: true, receiptOnStdout: false});
  });

  it('wb-drd GE1: a return in recursively nested prior plain blocks refuses an unreachable receipt', async () => {
    const statements = [...WELL_FORMED.slice(0, -1), '{ { return; } }', WELL_FORMED.at(-1) ?? ''];
    expect(await executedReceipts(liveSource({statements}))).toStrictEqual({stdout: 0, echoed: 0});
    expect(pinsOf('probe.ts', liveSource({statements})).receiptOnStdout).toBe(false);
  });

  it('wb-drd GE1: a throw in a prior plain block refuses the receipt before execution fails', async () => {
    const statements = [...WELL_FORMED.slice(0, -1), '{ { throw new Error("stop"); } }', WELL_FORMED.at(-1) ?? ''];
    await expect(executedReceipts(liveSource({statements}))).rejects.toThrow('stop');
    expect(pinsOf('probe.ts', liveSource({statements})).receiptOnStdout).toBe(false);
  });

  it('wb-drd control: prior blocks with conditional or closure returns do not terminate the case', async () => {
    const statements = [...WELL_FORMED.slice(0, -1), '{ if (false) return; const neverCalled = () => { return; }; }', WELL_FORMED.at(-1) ?? ''];
    expect(await executedReceipts(liveSource({statements}))).toStrictEqual({stdout: 1, echoed: 0});
    expect(pinsOf('probe.ts', liveSource({statements})).receiptOnStdout).toBe(true);
  });

  it('wb-drd: a receipt write in a plain nested block still runs, so it still passes the stdout pin', async () => {
    const nested = [...WELL_FORMED.slice(0, -1), '{', '  process.stdout.write(hxLiveReceipt(result, verdict) + "\\n");', '}'];
    expect(await executedReceipts(liveSource({statements: nested}))).toStrictEqual({stdout: 1, echoed: 0});
    expect(pinsOf('probe.ts', liveSource({statements: nested})).receiptOnStdout).toBe(true);
  });

  it.each(['skip', 'todo', 'only', 'fails', 'skipIf(true)', 'runIf(false)', 'unknownModifier'])('a case registered through it.%s is parked and pins nothing', member => {
    const pins = pinsOf('probe.ts', liveSource({member}));
    expect(pins.parked).toHaveLength(1);
    expect(pins).toMatchObject({contract: false, representation: false, digest: false, leak: false, invariantInEveryCase: false, receiptInEveryCase: false, receiptOnStdout: false});
  });

  it.each(['skip', 'todo', 'only', 'fails'])('a case carrying the options flag %s: true is parked', option => {
    expect(pinsOf('probe.ts', liveSource({option})).parked).toHaveLength(1);
  });

  it.each(['skip', 'todo', 'skipIf(true)', 'runIf(false)'])('a case inside describe.%s is parked', suiteMember => {
    expect(pinsOf('probe.ts', liveSource({suiteMember})).parked).toHaveLength(1);
  });

  it('a case whose callback calls the context skip is parked', () => {
    const source = liveSource({param: 'ctx', statements: [`${['ctx', 'skip'].join('.')}();`, ...WELL_FORMED]});
    expect(pinsOf('probe.ts', source).parked).toStrictEqual(["probe.ts:3 'HX probe' context skip call in the callback"]);
  });

  it('the predicate pin needs a holds: true assertion on the hxLiveInvariant verdict, not just the call', () => {
    const computedOnly = ['const verdict = hxLiveInvariant(await read());', 'expect(verdict).toBeDefined();'];
    expect(pinsOf('probe.ts', liveSource({statements: computedOnly})).invariantInEveryCase).toBe(false);
    const negated = ['const verdict = hxLiveInvariant(await read());', 'expect(verdict).not.toMatchObject({holds: true});'];
    expect(pinsOf('probe.ts', liveSource({statements: negated})).invariantInEveryCase).toBe(false);
    const direct = ['expect(hxLiveInvariant(await read())).toMatchObject({holds: true, violations: []});'];
    expect(pinsOf('probe.ts', liveSource({statements: direct})).invariantInEveryCase).toBe(true);
  });

  it('the digest pin needs the 64-hex regex applied to binarySha256 in one assertion', () => {
    const elsewhere = ["const hex = /^[0-9a-f]{64}$/;", "expect(result.runtime.binarySha256).toBeTypeOf('string');"];
    expect(pinsOf('probe.ts', liveSource({statements: elsewhere})).digest).toBe(false);
    const looser = ['expect(result.runtime.binarySha256).toMatch(/^[0-9a-f]+$/);'];
    expect(pinsOf('probe.ts', liveSource({statements: looser})).digest).toBe(false);
    const direct = ['expect(result.runtime.binarySha256).toMatch(/^[0-9a-f]{64}$/);'];
    expect(pinsOf('probe.ts', liveSource({statements: direct})).digest).toBe(true);
  });

  it('the leak pin must be the negated toContain over JSON.stringify of the result', () => {
    const positive = ["expect(JSON.stringify(result)).toContain('\"verified\":true');"];
    expect(pinsOf('probe.ts', liveSource({statements: positive})).leak).toBe(false);
    const otherSubject = ["expect(String(result)).not.toContain('\"verified\":true');"];
    expect(pinsOf('probe.ts', liveSource({statements: otherSubject})).leak).toBe(false);
  });

  it('the tier readers parse the real config shapes and refuse a moved array', () => {
    expect(vitestArray('x.ts', 'export default defineConfig({test:{include:["a.test.ts"]},coverage:{include:["src/**"]}});', 'include')).toStrictEqual(['a.test.ts']);
    expect(vitestArray('x.ts', 'export default defineConfig({coverage:{include:["src/**"]}});', 'include')).toBeUndefined();
    expect(vitestArray('x.ts', 'export default defineConfig({test:{include:["a", name]}});', 'include')).toBeUndefined();
    const sections = tomlSections('[build]\ngate = ["lint", "test"]\n\n[build.commands.native-read]\ncommand = "x"\n');
    expect(gateSteps(sections)).toStrictEqual(['lint', 'test']);
    expect(sections.get('build.commands.native-read')).toMatch(/^command = "x"$/m);
  });

  // wb-xhy1 (drd.1 gate PREP F1, the CT3x coordinated statement swap): the docs/14 falsifier table anchors every row's name and refused shape, but a
  // row's probe statements were anchored only by the AC1 digest literal above, so a statement swapped for another refused shape with its digest
  // re-pinned stayed green 0 | 113. This anchor reads every row's probe from docs/14 "HX live-tier receipt falsifier probes", outside this census.
  it('wb-xhy1 anchor: docs/14 "HX live-tier receipt falsifier probes" lists every falsifier row\'s probe statements, in table order, outside this census (a CT3x coordinated swap reds here)', () => {
    expect(probeListFailures(readRepo(DOCS_14), SURVIVORS)).toStrictEqual([]);
  });

  it('wb-xhy1 reader control: a synthetic docs/14 that lists exactly the falsifier probes passes', () => {
    expect(probeListFailures(syntheticProbes(SURVIVORS), SURVIVORS)).toStrictEqual([]);
  });

  const PROBES_WHERE = `${DOCS_14} "${PROBES_HEADING}"`;
  /** The falsifier row with this id, for the probe reader's fixtures. */
  const rowOf = (id: string): ProbedFalsifier => {
    const row = SURVIVORS.find(item => item.id === id);
    if (row === undefined) throw new Error(`no falsifier row ${id}`);
    return row;
  };
  /** The CT3x form: the row's probe statements replaced by those of another row - a different refused shape - every other row unchanged. */
  const swappedProbe = (id: string, shapeOf: string): ProbedFalsifier[] =>
    SURVIVORS.map(row => (row.id === id ? {id: row.id, statements: rowOf(shapeOf).statements} : row));
  /** The two lines a probe drift reds with: the probe the census runs is not listed, and the probe the docs list is not run. */
  const driftLines = (id: string, runs: readonly string[], lists: readonly string[]): string[] => [
    `the probe of falsifier ${id} (${collapsed(probeEntry({id, statements: runs}))}) is not listed in ${PROBES_WHERE}`,
    `${PROBES_WHERE} lists ${collapsed(probeEntry({id, statements: lists}))}, which no falsifier probe of the census runs`,
  ];

  it('wb-xhy1 reader: the CT3x-nonnull swap the drd.1 gate named - echo-nonnull-console running the element-access echo - reds on both sides, naming the row', () => {
    const lines = probeListFailures(syntheticProbes(SURVIVORS), swappedProbe('echo-nonnull-console', 'echo-element-access'));
    for (const line of driftLines('echo-nonnull-console', rowOf('echo-element-access').statements, rowOf('echo-nonnull-console').statements)) expect(lines).toContain(line);
  });

  it('wb-xhy1 reader: the CT3x-loop swap the drd.1 gate named - dead-write-loop running the if (false) shape - reds on both sides, naming the row', () => {
    const lines = probeListFailures(syntheticProbes(SURVIVORS), swappedProbe('dead-write-loop', 'dead-write-if-false'));
    for (const line of driftLines('dead-write-loop', rowOf('dead-write-if-false').statements, rowOf('dead-write-loop').statements)) expect(lines).toContain(line);
  });

  it('wb-xhy1 reader: the CT3x-window swap the drd.1 gate named - echo-window-console running globalThis.console.log - reds on both sides, naming the row', () => {
    const lines = probeListFailures(syntheticProbes(SURVIVORS), swappedProbe('echo-window-console', 'echo-globalThis-console'));
    for (const line of driftLines('echo-window-console', rowOf('echo-globalThis-console').statements, rowOf('echo-window-console').statements)) expect(lines).toContain(line);
  });

  it('wb-xhy1 reader: a probe the docs list drops reds, naming the row', () => {
    const dropped = rowOf('dead-write-after-block-return');
    const lines = probeListFailures(syntheticProbes(SURVIVORS.filter(item => item.id !== dropped.id)), SURVIVORS);
    expect(lines).toContain(`the probe of falsifier ${dropped.id} (${collapsed(probeEntry(dropped))}) is not listed in ${PROBES_WHERE}`);
  });

  it('wb-xhy1 reader: a docs probe entry the census does not run reds, naming the entry', () => {
    const extra: ProbedFalsifier = {id: 'probe-extra', statements: [...PROBE_PREFIX, 'an extra statement;']};
    const lines = probeListFailures(syntheticProbes([...SURVIVORS, extra]), SURVIVORS);
    expect(lines).toContain(`${PROBES_WHERE} lists \`probe-extra\`: \`an extra statement;\`, which no falsifier probe of the census runs`);
  });

  it('wb-xhy1 reader: two swapped docs probe entries red as out of table order', () => {
    const swapped = [rowOf('dead-write-after-return'), rowOf('dead-write-if-false'), ...SURVIVORS.slice(2)];
    expect(swapped).toHaveLength(SURVIVORS.length);
    expect(probeListFailures(syntheticProbes(swapped), SURVIVORS)).toContain(`${PROBES_WHERE} lists the census's falsifier probes out of table order or more than once`);
  });

  it('wb-xhy1 reader: a row that does not open with the well-formed prefix reds, naming the row, even where its probe tail still matches the docs entry', () => {
    const drifted = SURVIVORS.map(row => (row.id === 'dead-write-loop' ? {id: row.id, statements: row.statements.map((statement, index) => (index === PROBE_PREFIX.length - 1 ? 'expect(result).toMatchObject({});' : statement))} : row));
    expect(probeListFailures(syntheticProbes(SURVIVORS), drifted)).toStrictEqual([
      `falsifier dead-write-loop does not open with the first ${PROBE_PREFIX.length} statements of the well-formed case, so ${PROBES_WHERE} cannot list its probe`,
    ]);
  });

  it('wb-xhy1 reader: an entry statement written without its code span, or two statements in one span, reds naming the row - the source is judged, not only the rendered text', () => {
    const loop = rowOf('dead-write-loop');
    const tail = probeTail(loop);
    const notListed = `the probe of falsifier ${loop.id} (${collapsed(probeEntry(loop))}) is not listed in ${PROBES_WHERE}`;
    const bare = syntheticProbes(SURVIVORS, {entry: row => (row.id === loop.id ? `${codeCell(row.id)}: ${tail.slice(0, -1).map(codeCell).join(' ')} ${tail.at(-1) ?? ''}` : probeEntry(row))});
    expect(probeListFailures(bare, SURVIVORS)).toContain(notListed);
    const merged = syntheticProbes(SURVIVORS, {entry: row => (row.id === loop.id ? `${codeCell(row.id)}: ${codeCell(tail.join(' '))}` : probeEntry(row))});
    expect(probeListFailures(merged, SURVIVORS)).toContain(notListed);
  });

  it('wb-xhy1 reader: a renamed, duplicated or re-homed probe heading refuses the section', () => {
    const refused = (markdown: string): string => probeListFailures(markdown, SURVIVORS)[0] ?? '';
    expect(refused(syntheticProbes(SURVIVORS, {heading: 'HX probe notes'}))).toContain('the section is refused');
    expect(refused(syntheticProbes(SURVIVORS, {inside: `## ${PROBES_HEADING}`}))).toContain('occurs 2 times');
    expect(refused(syntheticProbes(SURVIVORS, {before: '# Appendix'}))).toContain('the census binds it under');
  });

  it('wb-xhy1 reader: a paragraph added beside the probe list, or the list hidden in an HTML comment, is not the section the census adopts', () => {
    const weakened = probeListFailures(syntheticProbes(SURVIVORS, {inside: 'A probe may change without a docs edit.'}), SURVIVORS);
    expect(weakened.some(line => line.includes('is not exactly its intro paragraph and one list'))).toBe(true);
    const first = `- ${probeEntry(rowOf('dead-write-if-false'))}`;
    const hidden = syntheticProbes(SURVIVORS).replace(first, `<!--\n${first}`).replace('\n\n## Acceptance', '\n-->\n\n## Acceptance');
    const lines = probeListFailures(hidden, SURVIVORS);
    expect(lines.some(line => line.includes('is not exactly its intro paragraph and one list'))).toBe(true);
    expect(lines).toContain(`${PROBES_WHERE}: the section must hold exactly one list, the probe list; it holds 0`);
  });

  it('wb-xhy1 same view: an exact copy of the probe list in another section never stands in for a drifted list in the probe section, and a drifted copy elsewhere never reds an exact one', () => {
    const exactList = SURVIVORS.map(row => `- ${probeEntry(row)}`).join('\n');
    const nonnull = rowOf('echo-nonnull-console');
    const elementAccess = rowOf('echo-element-access');
    const drifted = syntheticProbes(SURVIVORS, {entry: row => probeEntry(row.id === nonnull.id ? {id: row.id, statements: elementAccess.statements} : row)});
    const copied = drifted.replace('## Acceptance journey evidence\n\nText.\n', `## Acceptance journey evidence\n\nText.\n\n${exactList}\n`);
    expect(copied).not.toBe(drifted);
    const lines = probeListFailures(copied, SURVIVORS);
    for (const line of driftLines(nonnull.id, nonnull.statements, elementAccess.statements)) expect(lines).toContain(line);
    const decoy = SURVIVORS.map(row => `- ${probeEntry(row.id === nonnull.id ? {id: row.id, statements: elementAccess.statements} : row)}`).join('\n');
    const exact = syntheticProbes(SURVIVORS);
    const decoyed = exact.replace('## Acceptance journey evidence\n\nText.\n', `## Acceptance journey evidence\n\nText.\n\n${decoy}\n`);
    expect(decoyed).not.toBe(exact);
    expect(probeListFailures(decoyed, SURVIVORS)).toStrictEqual([]);
  });
});
