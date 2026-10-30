/**
 * wb-maza (owner R721, R723): the detached-* family keeps the strict timing markers its cure gave it.
 *
 * Under a loaded parallel full run, the detached-* suites that drive real host processes redded with no strict marker.
 * The measured shapes were a fixed-count poll falling through to a later read (ENOENT receipt.json), the launcher's
 * handshake lapse ("Detached handshake timed out") and a host command's socket-timeout lapse ("Detached transport
 * timeout"). A red with no strict marker can take neither the R609 serial leg nor the register, so each one cost an owner
 * round-trip. The cure routes every timed wait through test/helpers/detached-timing.ts (pollFor: a budget whose lapse
 * THROWS naming the wait, "<what> exceeded its <N> ms wait timeout"; holdOpen: a window the test itself holds open). It
 * routes every launch and host command through the marked twins (launchDetachedMarked, connectDetachedMarked), which
 * re-label the product's two fixed-bound lapses with the strict marker. This guard keeps the family on that route. For
 * every member the default gate runs (test/workbench-detached-*.test.ts minus the exclude list of vitest.config.ts,
 * the config the gate loads), read as a TypeScript syntax tree so comments and strings never count:
 *   G1 no value import of launchDetachedWorkflow or connectDetachedWorkflow from src/workbench/hosts/local-detached
 *      (named, default, namespace, dynamic or require): a member drives hosts only through the marked twins;
 *   G2 no raw timer (the three timer globals, or an import of the timers modules): a timed wait is pollFor, and a
 *      held window is holdOpen;
 *   G3 no poll loop of the pre-cure shape: a counted `for` whose condition joins a fixed numeric bound with `&&`, or a
 *      loop whose condition reads a clock;
 *   G4 a hook that stops hosts (an afterEach that calls process.kill) passes HOST_HOOK_TIMEOUT_MS and settles its waits
 *      through reportAfterCleanup, so a host-exit lapse is reported only after the cleanup has run, and before vitest's
 *      hook timeout could leave that cleanup to finish late, during a later test.
 * wb-nqbd (the R694 follow-up of wb-maza landing 395, gate cmd_d35d53e6a40a: F1 leads, F2-F5 ride) widens G2, G3 and
 * G4. Each widened reading runs beside the landed one, which is unchanged, and only where the landed one found nothing,
 * so every landed finding still stands:
 *   G2 also reads vitest's own wait helpers, waitFor, waitUntil and poll (vi.waitFor, vi.waitUntil, expect.poll), by
 *      name on any receiver or binding, since test/helpers/detached-timing.ts names their lapses as marker-less ("Timed
 *      out in waitFor!", "Timed out in waitUntil!", an AssertionError); a timer global or wait helper named by a string
 *      key (globalThis["setTimeout"]); and the timers behind two host objects, read on AbortSignal or Atomics by name,
 *      bare or as a member, through a member, a string key or a destructured binding: AbortSignal.timeout (a signal that
 *      aborts on a timer, as in once(..., { signal })) and Atomics.wait / Atomics.waitAsync (a sleep);
 *   G3 also reads a for, while or do loop whose condition joins any relational comparison (<, <=, > or >=, against a
 *      literal, a named constant or any other bound, on either side) with `&&`: a countdown, a reversed or named bound,
 *      a while or do counter. One loop is one finding;
 *   G4 also reads the hooks afterEach, afterAll, beforeEach and beforeAll (by name, through a vitest import alias, or as
 *      a namespace member) whose callback, inline or named, stops hosts itself or through the module-local functions it
 *      calls or names, at any depth; that callback still passes HOST_HOOK_TIMEOUT_MS and calls reportAfterCleanup itself.
 * wb-vh7c (the R694 follow-up of wb-nqbd landing 491, gate cmd_7cbc36ba6b11: F1 leads, F2 rides) widens G3 and G4 the
 * same way, beside the readings above, and G3 only where they found nothing:
 *   G3 also reads a for, while or do loop whose condition joins with `&&` a counter of the loop (the operand of a ++ or
 *      --, or the target of a += or -=, anywhere in its condition, its incrementor or its body), either compared by an
 *      equality operator (===, ==, !== or !=, against a literal or a named bound, on either side, under a negation too)
 *      or read as an operand of the `&&` (n--, --n, n -= 1, a member's step, or n stepped in the loop): an inequality
 *      bound or a truthiness countdown. One loop is still one finding;
 *   G4 also reads vitest's other four hooks, onTestFinished, onTestFailed, aroundEach and aroundAll, with the same two
 *      demands, and every hook through a destructured binding (a test context's ({ onTestFailed: onFail })) or a
 *      variable bound to it, by name or as a member (const onFail = context.onTestFailed). The hooks it reads by name
 *      are exactly the vitest module's hook-shaped exports (before*, after*, around* and onTest*), read at run time, so
 *      a hook of those shapes that vitest adds reds the guard. It also reads every fixture that stops hosts, itself or
 *      through module-local functions: a call of extend, override or scoped on any receiver, inline, as a [fixture,
 *      options] tuple or through a builder's onCleanup. vitest runs a fixture's teardown under no timeout (its runner
 *      awaits each fixture cleanup unbounded), so a fixture cannot stop hosts under HOST_HOOK_TIMEOUT_MS: one that does
 *      is a finding by itself, and the family stops hosts in a hook.
 * wb-n5xs (the R694 follow-up of wb-vh7c landing 583, gate cmd_9a13529b9c57: F1 leads) widens that G3 reading through
 * TypeScript's type-level wrappers, the ones TypeScript files under OuterExpressionKinds.Assertions: `as` and an
 * angle-bracket assertion, `satisfies` and the non-null `!`, nested or mixed with parentheses. A counter read through
 * them, as an operand of the `&&` or under an equality operator, reads as the counter they wrap, and every counter is
 * keyed by its unwrapped operand, so a loop that steps n! and reads n, or steps n and reads n!, holds one counter. The
 * wrapper-kinds row reads those wrappers against TypeScript's own flags, and a T1 kill control plants each one in both
 * of the reading's forms. One loop is still one finding.
 * wb-69ur (the R694 follow-up of wb-n5xs landing 639, gate cmd_aa11f2b1ebe8: F1 leads, F2 rides) keys every counter of
 * that reading by its member chain. Parentheses and the type-level wrappers are removed at every link of the chain (a
 * name, this, a property, an element and an element's own key), not only around the whole operand; an optional chain's
 * ?. reads as .; an element named by a string or numeric literal reads as the member it names; and the spacing or a
 * comment around a link never counts. So state!.n, (state as Counter).n, (<Counter>state).n, (state satisfies
 * Counter).n, (state).n, state?.n, state["n"], this!.n, counts![0] and counts?.[0] read as the counters state.n, this.n
 * and counts[0], whichever side of the loop (its condition, its incrementor or its body) holds the wrapper; a link of any
 * other kind (a call) keys by its own text. The M1 kill controls plant those links. The wrapper-kinds row now reads the
 * wrappers kind by kind against TypeScript's own isOuterExpression, over its whole SyntaxKind enum and on an instance of
 * every outer expression (parsed, or built for the one kind its parser never yields), and it judges a planted cell by the
 * wrappers a finding's condition unwraps, never by a wrapper anywhere in the control's text; the roster pins what each T1
 * and M1 kill control's finding unwraps, which leaves out a wrapper on an operand that is not the counter (ready! in
 * ready! && state.n), and the M1 row reads every wrapper kind among them. One loop is still one finding.
 * wb-dr81 (the R694 follow-up of wb-69ur landing 698, gate cmd_2fc9ac8e06c0: F1 leads, F2 rides) pins two readings of
 * that keying with planted controls, the reader unchanged. A literal element key behind a wrapper or parentheses reads
 * as the member it names: counts[0 as const] and state[("n")] read as the counters counts[0] and state.n, two M1 kill
 * controls (the first one's finding unwraps the `as`). And no two of a named member, a private name and a computed
 * element meet: this!["#n"] read while this.#n steps, and counts[n!] read while counts["n"] steps, are two negative
 * controls that stay quiet.
 * The judged set is read from the test directory and the config, never typed here. The members importing the marked
 * twins (the three suites that drive real hosts, and the helper's own unit rows) are pinned, so a derivation that reads
 * nothing, or a member that leaves the twins, reds. Every widened reading has planted kill controls beside negative
 * controls, and every named residual has planted quiet rows (a member the guard leaves quiet). What each one yields, as
 * each finding's rule and text, is held in the out-of-file roster test/fixtures/detached-timing-guard-roster.json,
 * beside this file's frozen shape. The first wb-nqbd case and the last case read that shape against the collected test
 * tree, and the last one also reads that every planted table reached its own compare (F4: a deleted case or row block
 * reds). wb-g0yl (the R694 follow-up of wb-ksz landing 534: F3 leads): the importer pin row's title and this header
 * count the real-host suites the list pins, every importer but the helper's own unit rows, so a suite that joins the
 * list re-counts both. Not claimed: a hollow that removes that row from every literal of the shape (the row, the
 * roster's title and the frozen-shape literal's element), which wb-g0yl measured at 0 failed.
 * NAMED RESIDUALS (not detected; each has quiet rows, F5):
 *   R-WAIT-LOOP a wait loop whose bound is not in its condition (a for-of over a fixed-length array, a counted loop
 *     that leaves through a break) or that awaits a read with no delay;
 *   R-COUNTER-ROUTE a count bound whose counter the loop steps only through a plain assignment (i = i + 1) or a
 *     function it calls, or reads only through a negation or a coercion (!!n--);
 *   R-HOST-ROUTE a host call reached through a re-export, a loader under another name (createRequire), a specifier
 *     that is not one string literal, or the Pi tool (a tool reply's lapse text is marked by the member's reply parser,
 *     jsonReply in the socket-base suite, not here);
 *   R-TIMER-ROUTE a timer reached through a function imported from another module, or a timers module reached through
 *     a loader under another name;
 *   R-COMPUTED-KEY a timer or wait helper named by a computed key that is not one string literal, or by a string read
 *     reflectively (Reflect.get);
 *   R-OWNER-ALIAS AbortSignal or Atomics read through an alias of its own;
 *   R-HOOK-ROUTE a hook that stops hosts through an imported function or an object's method;
 *   R-REGISTRAR-ROUTE a hook registrar reached through an assignment rather than a binding (atEnd = onTestFinished) or a
 *     computed key (context["onTestFinished"]), a fixture table passed by a variable (test.extend(fixtures)), or a
 *     fixture that stops hosts through an imported function or an object's method;
 *   R-RAISE-SITE no planted lapse reaches raiseTransportLapse at its call site in socket-base's 60-byte TMPDIR row (the
 *     helper's own unit rows pin what it raises): the family's raiseTransportLapse call rows are pinned to the roster,
 *     and a tool-path read left unraised is a quiet row.
 *   R-CHAIN-KEY a member counter whose two spellings meet only through a link the key reads by its text or through a
 *     binding: a call in the chain with a wrapper inside it (state!.get().n read while state.get().n steps), or a
 *     receiver bound to another name (counter.n read while state.n steps, after const counter = state).
 * test/workbench-detached-control-live.test.ts is not judged either. It is excluded from the default gate and runs only
 * as `forge run detached-control-live`: its until() bound is a receipt-recorded measurement (journeys.*.realised =
 * until().ok), and no landing judge reads its reds. The first case pins that exclusion.
 * NOT CLAIMED: a hollow that removes one planted site from every table it sits in at once (its own table, the roster's
 * entry and the frozen-shape literal's count), unless it also drops a hook kind from HOOKS, which the hook-kinds row
 * reads against vitest's own exports, or the site is the only T1 kill control whose finding unwraps a wrapper kind in
 * one of the reading's two forms, or the only M1 kill control whose finding unwraps a wrapper kind, which the
 * wrapper-kinds and M1 rows read against TypeScript's own type-level wrappers; a hollow that removes one of the two
 * shape cases from every literal of the shape; a case whose own assertions are weakened in place.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import * as vitestExports from "vitest";
import { describe, expect, it } from "vitest";
import config from "../vitest.config.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The family: every suite named for the local detached host. */
const FAMILY = /^workbench-detached-[a-z0-9-]+\.test\.ts$/;
/** The product module whose launch and connect calls lapse on fixed bounds. */
const HOST_MODULE = /(?:^|\/)src\/workbench\/hosts\/local-detached(?:\.[jt]s)?$/;
const HOST_CALLS = new Set(["launchDetachedWorkflow", "connectDetachedWorkflow"]);
const TIMER_GLOBALS = new Set(["setTimeout", "setInterval", "setImmediate"]);
const TIMER_MODULES = new Set(["timers", "timers/promises", "node:timers", "node:timers/promises"]);
const CLOCKS = new Set(["Date.now", "performance.now"]);
/** Where the marked twins live, as the members import them. */
const TWINS_MODULE = "./helpers/detached-timing.js";
const TWINS = new Set(["launchDetachedMarked", "connectDetachedMarked"]);
/** The helper's own unit rows: the one importer of the marked twins that plants its lapses instead of driving a real host. */
const HELPER_ROWS = "workbench-detached-timing.test.ts";
/** wb-g0yl: the words the pin row's title and the header count the real-host suites with. */
const COUNT_WORDS: readonly string[] = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** wb-nqbd F1: vitest's own wait helpers (vi.waitFor, vi.waitUntil, expect.poll), read by name on any receiver or binding. */
const WAIT_HELPERS = new Set(["waitFor", "waitUntil", "poll"]);
/** wb-nqbd F1, F3: the timers behind two host objects, read on the object by name: AbortSignal.timeout, Atomics.wait, Atomics.waitAsync. */
const MEMBER_TIMERS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  ["AbortSignal", new Set(["timeout"])],
  ["Atomics", new Set(["wait", "waitAsync"])],
]);
/** wb-nqbd F3, wb-vh7c F2: vitest's hooks, every hook-shaped export of the vitest module (the hook-kinds row reads this
 * set against them); a hook that stops hosts is judged whichever one it is. */
const HOOKS = new Set(["afterEach", "afterAll", "beforeEach", "beforeAll", "aroundEach", "aroundAll", "onTestFinished", "onTestFailed"]);
/** wb-vh7c F2: vitest's fixture registrars, read on any receiver (test.extend, it.extend, an extended test's override). */
const FIXTURE_CALLS = new Set(["extend", "override", "scoped"]);
/** wb-vh7c F2: the hook-shaped names of the vitest module's exports (before*, after*, around* and onTest*), which the
 * hook-kinds row reads against HOOKS. */
const HOOK_SHAPE = /^(?:before|after|around)[A-Z]\w*$|^onTest[A-Z]\w*$/;
/** wb-nqbd F2: the relational operators a counted loop's bound compares with. */
const RELATIONAL = new Set<ts.SyntaxKind>([ts.SyntaxKind.LessThanToken, ts.SyntaxKind.LessThanEqualsToken, ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.GreaterThanEqualsToken]);
/** wb-vh7c F1: the equality operators a counted loop can compare its counter with. */
const EQUALITY = new Set<ts.SyntaxKind>([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
/** wb-vh7c F1: the steps (++ and --) and the counting assignments (+= and -=) that make a value a loop's counter. */
const STEPS = new Set<ts.SyntaxKind>([ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken]);
const COUNTING_ASSIGNMENTS = new Set<ts.SyntaxKind>([ts.SyntaxKind.PlusEqualsToken, ts.SyntaxKind.MinusEqualsToken]);
/** wb-n5xs F1: the TypeScript type-level wrappers G3 reads a counter through, by syntax kind, each with the flag TypeScript
 * files it under: `as` and an angle-bracket assertion (TypeAssertions), `satisfies` (Satisfies) and the non-null `!`
 * (NonNullAssertions). The wrapper-kinds row reads these flags against TypeScript's own OuterExpressionKinds.Assertions,
 * and (wb-69ur F2) these kinds against its own isOuterExpression. */
const TYPE_WRAPPERS: ReadonlyMap<ts.SyntaxKind, ts.OuterExpressionKinds> = new Map<ts.SyntaxKind, ts.OuterExpressionKinds>([
  [ts.SyntaxKind.AsExpression, ts.OuterExpressionKinds.TypeAssertions],
  [ts.SyntaxKind.TypeAssertionExpression, ts.OuterExpressionKinds.TypeAssertions],
  [ts.SyntaxKind.SatisfiesExpression, ts.OuterExpressionKinds.Satisfies],
  [ts.SyntaxKind.NonNullExpression, ts.OuterExpressionKinds.NonNullAssertions],
]);
/** wb-vh7c F1: the two forms in which the wb-vh7c G3 reading holds a counter (wb-n5xs F1: the wrapper-kinds row plants each
 * wrapper in both). */
const COUNTER_FORMS = { compared: "a counter under an equality operator", truth: "a counter read as its truth value" } as const;
/** wb-69ur F2: TypeScript's own classifier of outer expressions. typescript 6.0.3 exports isOuterExpression at run time
 * though its declarations do not name it, so it is read through a typed view of the module; the wrapper-kinds row reds
 * when a release drops it. */
interface OuterExpressionReader {
  readonly isOuterExpression?: (node: ts.Node, kinds: ts.OuterExpressionKinds) => boolean;
}
const isOuterExpression = (ts as unknown as OuterExpressionReader).isOuterExpression;
/** wb-69ur F2: one parsed instance of every outer expression TypeScript's parser yields, each a statement's expression: a
 * parenthesized expression, `as`, an angle-bracket assertion, `satisfies`, the non-null `!` and an instantiation
 * expression (the partially emitted expression, which its parser never yields, is built by its own factory). */
const OUTER_INSTANCES: readonly string[] = ["(n);", "n as number;", "<number>n;", "n satisfies number;", "n!;", "f<number>;"];

interface ConfigShape {
  test?: { exclude?: readonly string[] };
}
const excluded = new Set((config as unknown as ConfigShape).test?.exclude ?? []);
const family = readdirSync(join(ROOT, "test")).filter(name => FAMILY.test(name)).sort();
const judged = family.filter(name => !excluded.has(`test/${name}`));

interface Finding {
  readonly rule: "G1" | "G2" | "G3" | "G4";
  readonly at: string;
  readonly text: string;
  /** wb-69ur F2: on a G3 counter finding, the type-level wrapper kinds its condition's reading unwrapped to reach the
   * counter in the form the finding shows; absent on every other finding. */
  readonly unwraps?: readonly ts.SyntaxKind[];
}
interface Reading {
  readonly findings: Finding[];
  readonly twins: string[];
}

function moduleText(node: ts.Expression | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined;
}

/** True when `node` holds a `<` or `<=` comparison against a numeric literal. */
function fixedBound(node: ts.Node): boolean {
  if (ts.isBinaryExpression(node) && (node.operatorToken.kind === ts.SyntaxKind.LessThanToken || node.operatorToken.kind === ts.SyntaxKind.LessThanEqualsToken)) {
    if (ts.isNumericLiteral(node.left) || ts.isNumericLiteral(node.right)) return true;
  }
  return ts.forEachChild(node, fixedBound) === true;
}
/** True when `node` holds an `&&`. */
function conjunction(node: ts.Node): boolean {
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) return true;
  return ts.forEachChild(node, conjunction) === true;
}
/** True when `node` holds a call to `name` (a bare identifier) or to `<object>.<name>`. */
function calls(node: ts.Node, name: string): boolean {
  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    if ((ts.isIdentifier(callee) && callee.text === name) || (ts.isPropertyAccessExpression(callee) && callee.name.text === name)) return true;
  }
  return ts.forEachChild(node, child => calls(child, name)) === true;
}
/** True when `node` reads Date.now or performance.now. */
function readsClock(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && CLOCKS.has(`${node.expression.text}.${node.name.text}`)) return true;
  return ts.forEachChild(node, readsClock) === true;
}
/** wb-nqbd F2: true when `node` holds a relational comparison (<, <=, > or >=), whatever its bound and on either side. */
function relationalBound(node: ts.Node): boolean {
  if (ts.isBinaryExpression(node) && RELATIONAL.has(node.operatorToken.kind)) return true;
  return ts.forEachChild(node, relationalBound) === true;
}
/** The landed G3 reading's own test: a counted `for` that joins a numeric literal under `<` or `<=` with `&&`. */
function landedCount(node: ts.Node): boolean {
  return ts.isForStatement(node) && node.condition !== undefined && conjunction(node.condition) && fixedBound(node.condition);
}
/** wb-n5xs F1: true when `node` is one of TYPE_WRAPPERS, read by its syntax kind. */
function isTypeWrapper(node: ts.Node): node is ts.AsExpression | ts.TypeAssertion | ts.SatisfiesExpression | ts.NonNullExpression {
  return TYPE_WRAPPERS.has(node.kind);
}
/** wb-vh7c F1, wb-n5xs F1: `node` with its parentheses and its TypeScript type-level wrappers (TYPE_WRAPPERS) removed, at
 * any depth and in any order (wb-69ur F2: each wrapper kind removed is recorded in `seen` when one is given). */
function unwrapped(node: ts.Expression, seen?: Set<ts.SyntaxKind>): ts.Expression {
  if (isTypeWrapper(node)) seen?.add(node.kind);
  return ts.isParenthesizedExpression(node) || isTypeWrapper(node) ? unwrapped(node.expression, seen) : node;
}
/** wb-69ur F1: the key a counter is read by, its member chain read link by link: `node`'s parentheses and type-level
 * wrappers removed at every link (a name, this, a property, an element and an element's own key), an optional chain's ?.
 * read as ., an element named by a string or numeric literal read as the member it names, and the spacing or a comment
 * around a link left out; a link of any other kind (a call) keys by its own text. Each wrapper kind removed is recorded
 * in `seen` (wb-69ur F2). */
function counterKey(node: ts.Expression, source: ts.SourceFile, seen?: Set<ts.SyntaxKind>): string {
  const bare = unwrapped(node, seen);
  // A named member (a property, or an element named by a literal) keys as its quoted name, a private name as itself,
  // and a computed element as its own key behind "=", so no two of the three can meet.
  if (ts.isPropertyAccessExpression(bare)) {
    const base = counterKey(bare.expression, source, seen);
    return ts.isPrivateIdentifier(bare.name) ? `${base}.${bare.name.text}` : `${base}[${JSON.stringify(bare.name.text)}]`;
  }
  if (ts.isElementAccessExpression(bare)) {
    const base = counterKey(bare.expression, source, seen);
    const key = unwrapped(bare.argumentExpression, seen);
    return ts.isStringLiteralLike(key) || ts.isNumericLiteral(key) ? `${base}[${JSON.stringify(key.text)}]` : `${base}[=${counterKey(key, source, seen)}]`;
  }
  return bare.getText(source);
}
/** wb-vh7c F1: true when `node` is a step, ++ or --, prefix or postfix. */
function isStep(node: ts.Node): node is ts.PrefixUnaryExpression | ts.PostfixUnaryExpression {
  return (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && STEPS.has(node.operator);
}
/** wb-vh7c F1: true when `node` is a counting assignment, += or -=. */
function isCountingAssignment(node: ts.Node): node is ts.BinaryExpression {
  return ts.isBinaryExpression(node) && COUNTING_ASSIGNMENTS.has(node.operatorToken.kind);
}
/** wb-vh7c F1, wb-n5xs F1, wb-69ur F1: the counters of `loop`, by the key of their operand (counterKey): the operand of
 * every step and the target of every counting assignment in its condition, its incrementor or its body. */
function countersOf(loop: ts.Node, source: ts.SourceFile): Set<string> {
  const found = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (isStep(node)) found.add(counterKey(node.operand, source));
    if (isCountingAssignment(node)) found.add(counterKey(node.left, source));
    ts.forEachChild(node, visit);
  };
  visit(loop);
  return found;
}
/** wb-vh7c F1, wb-n5xs F1, wb-69ur F1: true when `node`, its parentheses and type-level wrappers aside, is a step, a
 * counting assignment or one of the loop's counters, read by its key (counterKey); the wrapper kinds removed on the way
 * to a read are recorded in `seen` (wb-69ur F2). */
function readsCounter(node: ts.Expression, counters: ReadonlySet<string>, source: ts.SourceFile, seen?: Set<ts.SyntaxKind>): boolean {
  const kinds = new Set<ts.SyntaxKind>();
  const bare = unwrapped(node, kinds);
  const reads = isStep(bare) || isCountingAssignment(bare) || counters.has(counterKey(bare, source, kinds));
  if (reads) for (const kind of kinds) seen?.add(kind);
  return reads;
}
/** wb-69ur F2: the form a condition holds a counter in, with the type-level wrapper kinds its reading unwrapped to reach
 * the counter in that form. */
interface CounterBound {
  readonly form: string;
  readonly unwraps: readonly ts.SyntaxKind[];
}
/** wb-vh7c F1: how `condition` holds a counter of its loop - under an equality operator anywhere in it, or as an operand
 * of one of its `&&`s, read as its truth value - or undefined when it holds neither (wb-69ur F2: with the wrapper kinds
 * the reading unwrapped in that form). */
function counterBound(condition: ts.Expression, counters: ReadonlySet<string>, source: ts.SourceFile): CounterBound | undefined {
  let compared = false;
  let truth = false;
  const comparedKinds = new Set<ts.SyntaxKind>();
  const truthKinds = new Set<ts.SyntaxKind>();
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node)) {
      const kinds = new Set<ts.SyntaxKind>();
      const left = readsCounter(node.left, counters, source, kinds);
      const right = readsCounter(node.right, counters, source, kinds);
      if (left || right) {
        if (EQUALITY.has(node.operatorToken.kind)) {
          compared = true;
          for (const kind of kinds) comparedKinds.add(kind);
        }
        if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
          truth = true;
          for (const kind of kinds) truthKinds.add(kind);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(condition);
  const sorted = (kinds: ReadonlySet<ts.SyntaxKind>): ts.SyntaxKind[] => [...kinds].sort((left, right) => left - right);
  return compared ? { form: COUNTER_FORMS.compared, unwraps: sorted(comparedKinds) } : truth ? { form: COUNTER_FORMS.truth, unwraps: sorted(truthKinds) } : undefined;
}
/** wb-vh7c F1: the form a G3 finding shows `loop` in, around its condition's text. */
function loopForm(loop: ts.Node, condition: string): string {
  return ts.isForStatement(loop) ? `for (...; ${condition}; ...)` : ts.isWhileStatement(loop) ? `while (${condition})` : `do ... while (${condition})`;
}
/** wb-nqbd F1, F3: "<owner>.<member>" when `owner` names AbortSignal or Atomics (bare, or as a member such as
 * globalThis.AbortSignal) and `member` is one of its timers. */
function memberTimer(owner: ts.Expression, member: string): string | undefined {
  const name = ts.isIdentifier(owner) ? owner.text : ts.isPropertyAccessExpression(owner) ? owner.name.text : undefined;
  return name !== undefined && MEMBER_TIMERS.get(name)?.has(member) === true ? `${name}.${member}` : undefined;
}
/** wb-nqbd F3: the module-local functions of `source` by name: function declarations, and variables bound to an arrow
 * function or a function expression. */
function localFunctions(source: ts.SourceFile): Map<string, ts.Node> {
  const found = new Map<string, ts.Node>();
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) found.set(node.name.text, node);
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))) {
      found.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** wb-nqbd F3: the route by which `node` calls `name`: [] when it calls it itself, the module-local functions it calls or
 * names on the way (at any depth) when it reaches it through them, undefined when it never does. */
function reachRoute(node: ts.Node, name: string, locals: ReadonlyMap<string, ts.Node>, seen: Set<string> = new Set()): string[] | undefined {
  if (calls(node, name)) return [];
  let route: string[] | undefined;
  const through = (child: ts.Node): boolean => {
    if (ts.isIdentifier(child) && !seen.has(child.text)) {
      const local = locals.get(child.text);
      if (local !== undefined) {
        seen.add(child.text);
        const rest = reachRoute(local, name, locals, seen);
        if (rest !== undefined) {
          route = [child.text, ...rest];
          return true;
        }
      }
    }
    return ts.forEachChild(child, through) === true;
  };
  through(node);
  return route;
}
/** wb-nqbd F1: how an identifier is read: as a member, through a destructured binding, through an import, or by name. */
function roleOf(node: ts.Identifier): string {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return "as a member";
  if (ts.isBindingElement(parent)) return "through a destructured binding";
  if (ts.isImportSpecifier(parent)) return "through an import";
  return "by name";
}
/** wb-nqbd F3, wb-vh7c F2: the names `source` binds to vitest's hooks: the hook names, every vitest import alias of one,
 * every destructured binding of one (a test context's ({ onTestFailed: onFail })), and every variable bound to one by
 * name or as a member (const onFail = context.onTestFailed), in source order. */
function hookNames(source: ts.SourceFile): Set<string> {
  const names = new Set(HOOKS);
  for (const statement of source.statements) {
    const bindings = ts.isImportDeclaration(statement) && moduleText(statement.moduleSpecifier) === "vitest" ? statement.importClause?.namedBindings : undefined;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      if (HOOKS.has((element.propertyName ?? element.name).text)) names.add(element.name.text);
    }
  }
  const visit = (node: ts.Node): void => {
    if (ts.isBindingElement(node) && ts.isIdentifier(node.name) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      if ((ts.isIdentifier(key) || ts.isStringLiteralLike(key)) && HOOKS.has(key.text)) names.add(node.name.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const bound = node.initializer;
      if ((ts.isIdentifier(bound) && names.has(bound.text)) || (ts.isPropertyAccessExpression(bound) && HOOKS.has(bound.name.text))) names.add(node.name.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}
/** wb-nqbd F3: true when `callee` registers a vitest hook: by name or alias, or as a member (vitest.afterAll). */
function hookCallee(callee: ts.Expression, names: ReadonlySet<string>): boolean {
  return (ts.isIdentifier(callee) && names.has(callee.text)) || (ts.isPropertyAccessExpression(callee) && HOOKS.has(callee.name.text));
}
/** The landed G4 reading's own test: an afterEach whose own callback calls kill. */
function landedHook(node: ts.CallExpression): boolean {
  return ts.isIdentifier(node.expression) && node.expression.text === "afterEach" && node.arguments[0] !== undefined && calls(node.arguments[0], "kill");
}

/** One member's text read as a syntax tree: every G1-G3 finding, and the marked twins it imports. */
function readText(name: string, text: string): Reading {
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: Finding[] = [];
  const twins: string[] = [];
  const locals = localFunctions(source);
  const hooks = hookNames(source);
  const at = (node: ts.Node): string => `${name}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
  const add = (rule: Finding["rule"], node: ts.Node, text: string, unwraps?: readonly ts.SyntaxKind[]): void => {
    found.push(unwraps === undefined ? { rule, at: at(node), text } : { rule, at: at(node), text, unwraps });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      const from = moduleText(node.moduleSpecifier) ?? "";
      const clause = node.importClause;
      if (TIMER_MODULES.has(from)) add("G2", node, `imports ${from}`);
      if (HOST_MODULE.test(from) && clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) add("G1", node, `default import of ${from}`);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) add("G1", node, `namespace import of ${from}`);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) {
            const imported = (element.propertyName ?? element.name).text;
            if (!element.isTypeOnly && HOST_CALLS.has(imported)) add("G1", element, `value import of ${imported} from ${from}`);
          }
        }
      }
      if (from === TWINS_MODULE && clause?.namedBindings !== undefined && ts.isNamedImports(clause.namedBindings)) {
        for (const element of clause.namedBindings.elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (TWINS.has(imported)) twins.push(imported);
        }
      }
    }
    if (ts.isCallExpression(node)) {
      const first = moduleText(node.arguments[0]);
      const loader = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (loader && first !== undefined && HOST_MODULE.test(first)) add("G1", node, `loads ${first} at run time`);
      if (loader && first !== undefined && TIMER_MODULES.has(first)) add("G2", node, `loads ${first} at run time`);
    }
    if (ts.isIdentifier(node) && TIMER_GLOBALS.has(node.text)) add("G2", node, `uses ${node.text}`);
    // wb-nqbd F1, F3: vitest's wait helpers by name; a timer global or wait helper by a string key; and the timers behind
    // AbortSignal and Atomics, as a member, a string key or a destructured binding.
    if (ts.isIdentifier(node) && WAIT_HELPERS.has(node.text)) add("G2", node, `uses vitest's ${node.text} ${roleOf(node)}`);
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
      const key = node.argumentExpression.text;
      const timer = memberTimer(node.expression, key);
      if (TIMER_GLOBALS.has(key) || WAIT_HELPERS.has(key)) add("G2", node, `uses ${key} by a string key`);
      if (timer !== undefined) add("G2", node, `uses ${node.expression.getText(source)}.${key} by a string key`);
    }
    if (ts.isPropertyAccessExpression(node)) {
      const timer = memberTimer(node.expression, node.name.text);
      if (timer !== undefined) add("G2", node, `uses ${node.getText(source)}`);
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined) {
      for (const element of node.name.elements) {
        const key = element.propertyName ?? element.name;
        const name = ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : undefined;
        const timer = name === undefined ? undefined : memberTimer(node.initializer, name);
        if (timer !== undefined) add("G2", element, `destructures ${node.initializer.getText(source)}.${name}`);
        if (name !== undefined && ts.isStringLiteralLike(key) && (TIMER_GLOBALS.has(name) || WAIT_HELPERS.has(name))) add("G2", element, `destructures ${name} by a string key`);
      }
    }
    if (ts.isForStatement(node) && node.condition !== undefined && conjunction(node.condition) && fixedBound(node.condition)) {
      add("G3", node, `fixed-count poll loop: for (...; ${node.condition.getText(source)}; ...)`);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "afterEach" && node.arguments[0] !== undefined && calls(node.arguments[0], "kill")) {
      const timeout = node.arguments[1];
      if (timeout === undefined || !ts.isIdentifier(timeout) || timeout.text !== "HOST_HOOK_TIMEOUT_MS") add("G4", node, "a hook that stops hosts runs without HOST_HOOK_TIMEOUT_MS");
      if (!calls(node.arguments[0], "reportAfterCleanup")) add("G4", node, "a hook that stops hosts settles its waits without reportAfterCleanup");
    }
    // wb-nqbd F3: every vitest hook whose callback stops hosts itself or through module-local functions it calls or names;
    // the landed reading above judges an afterEach whose own callback calls kill, and this one every other such hook.
    const route = ts.isCallExpression(node) && hookCallee(node.expression, hooks) && !landedHook(node) && node.arguments[0] !== undefined ? reachRoute(node.arguments[0], "kill", locals) : undefined;
    if (route !== undefined && ts.isCallExpression(node)) {
      const callback = node.arguments[0];
      const body = callback !== undefined && ts.isIdentifier(callback) ? locals.get(callback.text) : callback;
      const hook = `${node.expression.getText(source)}${route.length > 0 ? ` through ${route.join(" > ")}` : ""}`;
      const timeout = node.arguments[1];
      if (timeout === undefined || !ts.isIdentifier(timeout) || timeout.text !== "HOST_HOOK_TIMEOUT_MS") add("G4", node, `a hook that stops hosts (${hook}) runs without HOST_HOOK_TIMEOUT_MS`);
      if (body === undefined || !calls(body, "reportAfterCleanup")) add("G4", node, `a hook that stops hosts (${hook}) settles its waits without reportAfterCleanup`);
    }
    // wb-vh7c F2: a fixture that stops hosts, itself or through module-local functions. vitest runs a fixture's teardown
    // under no timeout, so such a fixture is a finding by itself: the family stops hosts in a hook.
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && FIXTURE_CALLS.has(node.expression.name.text)) {
      const fixtureRoute = node.arguments.map(argument => reachRoute(argument, "kill", locals)).find(found => found !== undefined);
      if (fixtureRoute !== undefined) {
        add("G4", node, `a fixture that stops hosts (${node.expression.getText(source)}${fixtureRoute.length > 0 ? ` through ${fixtureRoute.join(" > ")}` : ""}) tears down under no timeout`);
      }
    }
    const loopCondition = ts.isForStatement(node) ? node.condition : ts.isWhileStatement(node) || ts.isDoStatement(node) ? node.expression : undefined;
    if (loopCondition !== undefined && readsClock(loopCondition)) add("G3", node, `clock-deadline poll loop: ${loopCondition.getText(source)}`);
    // wb-nqbd F2: a for, while or do loop whose condition joins any relational bound with && - one finding per loop, and
    // only where the landed readings above found none.
    if (loopCondition !== undefined && !readsClock(loopCondition) && !landedCount(node) && conjunction(loopCondition) && relationalBound(loopCondition)) {
      const condition = loopCondition.getText(source);
      add("G3", node, `fixed-count poll loop: ${ts.isForStatement(node) ? `for (...; ${condition}; ...)` : ts.isWhileStatement(node) ? `while (${condition})` : `do ... while (${condition})`}`);
    }
    // wb-vh7c F1: a for, while or do loop whose condition joins with && a counter of the loop, under an equality operator
    // or read as its truth value - one finding per loop, and only where the readings above found none.
    if (loopCondition !== undefined && !readsClock(loopCondition) && !landedCount(node) && !relationalBound(loopCondition) && conjunction(loopCondition)) {
      const bound = counterBound(loopCondition, countersOf(node, source), source);
      if (bound !== undefined) add("G3", node, `fixed-count poll loop (${bound.form}): ${loopForm(node, loopCondition.getText(source))}`, bound.unwraps);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { findings: found, twins: [...new Set(twins)].sort() };
}

const readings = new Map(judged.map(name => [name, readText(name, readFileSync(join(ROOT, "test", name), "utf8"))] as const));
const shown = (list: readonly Finding[]): string => list.map(finding => `${finding.rule} ${finding.at} ${finding.text}`).join("\n") || "(none)";

/**
 * wb-nqbd: the planted sites, each read as its own member. A kill control is a site of one widened reading (wb-nqbd's
 * F1, F2 and F3; wb-vh7c's F1 and F2, here V1 and V2) and a negative control a near-miss that must stay quiet (N); what
 * each yields lives in the roster, never here.
 */
const CONTROLS: Readonly<Record<string, string>> = {
  "F1.waitFor": "await vi.waitFor(() => expect(alive()).toBe(false), { timeout: 5_000, interval: 20 });",
  "F1.waitUntil": "await vi.waitUntil(() => !alive(), { timeout: 5_000 });",
  "F1.poll": "await expect.poll(() => alive(), { timeout: 5_000 }).toBe(false);",
  "F1.helperBinding": "const { waitFor: settle } = vi;\nawait settle(() => expect(alive()).toBe(false));",
  "F1.helperKey": 'await expect["poll"](() => alive()).toBe(false);',
  "F1.signalTimeout": 'await once(host, "exit", { signal: AbortSignal.timeout(5_000) });',
  "F1.signalGlobal": 'await once(host, "exit", { signal: globalThis.AbortSignal.timeout(5_000) });',
  "F1.signalKey": 'await once(host, "exit", { signal: AbortSignal["timeout"](5_000) });',
  "F1.signalBinding": 'const { timeout: deadline } = AbortSignal;\nawait once(host, "exit", { signal: deadline(5_000) });',
  "F2.countdown": "for (let i = 150; i > 0 && alive(); i--) await holdOpen(20);",
  "F2.reversedBound": "for (let i = 0; 150 > i && alive(); i++) await holdOpen(20);",
  "F2.namedBound": "for (let i = 0; i < MAX_POLLS && alive(); i++) await holdOpen(20);",
  "F2.whileCounter": "while (n++ < 150 && alive()) await holdOpen(20);",
  "F2.doCounter": "do await holdOpen(20); while (alive() && ++n <= 150);",
  "F2.atLeast": "while (alive() && budget-- >= 1) await holdOpen(20);",
  "F3.timerKey": 'await new Promise(resolve => globalThis["setTimeout"](resolve, 20));',
  "F3.timerTemplateKey": "globalThis[`setInterval`](tick, 20);",
  "F3.timerBindingKey": 'const { "setTimeout": later } = globalThis;\nlater(tick, 20);',
  "F3.atomicsWait": "Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);",
  "F3.atomicsWaitAsync": "await Atomics.waitAsync(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20).value;",
  "F3.afterAllHook": "afterAll(async () => { for (const pid of hosts) process.kill(pid); await Promise.all(hosts.map(gone)); });",
  "F3.beforeEachHook": "beforeEach(() => { for (const pid of leftovers) process.kill(pid); });",
  "F3.beforeAllHook": "beforeAll(() => { for (const pid of leftovers) process.kill(pid); }, HOST_HOOK_TIMEOUT_MS);",
  "F3.helperStop": "function stopHosts() { for (const pid of hosts) process.kill(pid); }\nafterEach(async () => { stopHosts(); await Promise.all(hosts.map(gone)); });",
  "F3.arrowHelper": "const stopHosts = () => { for (const pid of hosts) process.kill(pid); };\nafterEach(async () => { stopHosts(); }, HOST_HOOK_TIMEOUT_MS);",
  "F3.namedCallback":
    "async function stopAll() { for (const pid of hosts) process.kill(pid); await Promise.all(hosts.map(gone)); }\nafterEach(stopAll, HOST_HOOK_TIMEOUT_MS);",
  "F3.deepHelper": "function signal(pid: number) { process.kill(pid); }\nfunction stopHosts() { hosts.forEach(signal); }\nafterEach(() => { stopHosts(); });",
  "F3.aliasedHook": 'import { afterEach as eachCleanup } from "vitest";\neachCleanup(async () => { for (const pid of hosts) process.kill(pid); });',
  "F3.namespaceHook": 'import * as vitest from "vitest";\nvitest.afterAll(() => { for (const pid of hosts) process.kill(pid); });',
  "V1.inequalityFor": "for (let i = 0; i !== 150 && alive(); i++) await holdOpen(20);",
  "V1.inequalityStep": "while (alive() && tries++ !== MAX_TRIES) await holdOpen(20);",
  "V1.reversedInequality": "while (alive() && 150 !== ++n) await holdOpen(20);",
  "V1.doInequality": "do await holdOpen(20); while (--n !== 0 && alive());",
  "V1.looseInequality": "for (let i = 0; i != MAX_POLLS && alive(); i += 1) await holdOpen(20);",
  "V1.negatedEquality": "while (!(n === 0) && alive()) { n -= 1; await holdOpen(20); }",
  "V1.looseEquality": "do await holdOpen(20); while (!(left-- == 0) && alive());",
  "V1.truthCountdown": "while (n-- && alive()) await holdOpen(20);",
  "V1.forCountdown": "for (let n = 150; n-- && alive(); ) await holdOpen(20);",
  "V1.prefixCountdown": "do await holdOpen(20); while (alive() && --left);",
  "V1.bodyCountdown": "while (left && alive()) { left--; await holdOpen(20); }",
  "V1.memberCountdown": "while (alive() && state.left--) await holdOpen(20);",
  "V1.assignedCountdown": "while ((left -= 1) && alive()) await holdOpen(20);",
  "V2.finishedHook": "onTestFinished(() => { for (const pid of hosts) process.kill(pid); });",
  "V2.failedHook": "onTestFailed(async () => { for (const pid of hosts) process.kill(pid); await Promise.all(hosts.map(gone)); }, HOST_HOOK_TIMEOUT_MS);",
  "V2.aliasedFinished": 'import { onTestFinished as afterTest } from "vitest";\nafterTest(async () => { for (const pid of hosts) process.kill(pid); });',
  "V2.contextMember": 'it("stops its host", async context => { context.onTestFinished(() => { process.kill(host.pid); }); });',
  "V2.contextBinding": 'it("stops its host", async ({ onTestFailed: onFail }) => { onFail(() => { process.kill(host.pid); }, HOST_HOOK_TIMEOUT_MS); });',
  "V2.registrarAlias": "const atEnd = onTestFinished;\natEnd(() => { for (const pid of hosts) process.kill(pid); });",
  "V2.memberAlias": 'it("stops its host", async context => { const onFail = context.onTestFailed; onFail(() => { process.kill(host.pid); }); });',
  "V2.aroundEachHook": "aroundEach(async runTest => { await runTest(); for (const pid of hosts) process.kill(pid); });",
  "V2.aroundAllHook": "function stopHosts() { for (const pid of hosts) process.kill(pid); }\naroundAll(async runSuite => { await runSuite(); stopHosts(); }, HOST_HOOK_TIMEOUT_MS);",
  "V2.fixture": "const hostTest = test.extend({ hosts: async ({}, use) => { const pids: number[] = []; await use(pids); for (const pid of pids) process.kill(pid); } });",
  "V2.fixtureTuple":
    'function stopHosts() { for (const pid of hosts) process.kill(pid); }\nconst hostTest = it.extend({ hosts: [async ({}, use) => { await use(hosts); stopHosts(); }, { scope: "file" }] });',
  "V2.builderFixture": 'const hostTest = test.extend("hosts", async ({}, { onCleanup }) => { onCleanup(() => { for (const pid of hosts) process.kill(pid); }); return hosts; });',
  "V2.namedFixture":
    "async function hostsFixture({}, use: (pids: number[]) => Promise<void>) { await use(hosts); for (const pid of hosts) process.kill(pid); }\nconst hostTest = test.extend({ hosts: hostsFixture });",
  "V2.overrideFixture": 'hostTest.override("hosts", async ({}, { onCleanup }) => { onCleanup(() => { process.kill(host.pid); }); return [host.pid]; });',
  "V2.scopedFixture": "hostTest.scoped({ hosts: async ({}, use) => { await use(hosts); for (const pid of hosts) process.kill(pid); } });",
  "T1.asTruth": "while (alive() && (n-- as number)) await holdOpen(20);",
  "T1.satisfiesTruth": "while (alive() && (n-- satisfies number)) await holdOpen(20);",
  "T1.angleTruth": "while (alive() && <number>n--) await holdOpen(20);",
  "T1.nonNullTruth": "while (alive() && n!) { n--; await holdOpen(20); }",
  "T1.wrappedBoth": "while (alive() && n!) { n!--; await holdOpen(20); }",
  "T1.wrappedStep": "while (alive() && n) { n!--; await holdOpen(20); }",
  "T1.wrappedAssignment": "while (alive() && left) { left! -= 1; await holdOpen(20); }",
  "T1.asStepEquality": "while (alive() && (tries++ as number) !== MAX_TRIES) await holdOpen(20);",
  "T1.asNameEquality": "for (let i = 0; (i as number) !== 150 && alive(); i++) await holdOpen(20);",
  "T1.nonNullEquality": "for (let i = 0; i! !== 150 && alive(); i++) await holdOpen(20);",
  "T1.angleEquality": "while (alive() && <number>tries++ !== MAX_TRIES) await holdOpen(20);",
  "T1.satisfiesEquality": "do { left -= 1; await holdOpen(20); } while ((left satisfies number) !== 0 && alive());",
  "T1.nestedWrappers": "do { left--; await holdOpen(20); } while (((left as number)!) !== 0 && alive());",
  "M1.nonNullReceiver": "while (alive() && state!.n) { state.n--; await holdOpen(20); }",
  "M1.nonNullStepReceiver": "while (alive() && state.n) { state!.n--; await holdOpen(20); }",
  "M1.wrappedBoth": "while (alive() && state!.n) { state!.n--; await holdOpen(20); }",
  "M1.asReceiverEquality": "while (alive() && (state as Counter).n !== 0) { state.n -= 1; await holdOpen(20); }",
  "M1.angleReceiver": "while (alive() && (<Counter>state).n !== 0) { state.n--; await holdOpen(20); }",
  "M1.satisfiesReceiver": "while (alive() && (state satisfies Counter).n) { state.n--; await holdOpen(20); }",
  "M1.parenthesizedReceiver": "while (alive() && (state).n) { state.n--; await holdOpen(20); }",
  "M1.optionalChain": "while (alive() && state?.n) { state.n--; await holdOpen(20); }",
  "M1.optionalElement": "while (alive() && counts?.[0]) { counts[0]--; await holdOpen(20); }",
  "M1.nonNullElement": "while (alive() && counts![0]) { counts[0]--; await holdOpen(20); }",
  "M1.nonNullThis": "while (alive() && this!.n) { this.n--; await holdOpen(20); }",
  "M1.innerLink": "while (alive() && state.inner!.n !== 0) { state.inner.n--; await holdOpen(20); }",
  "M1.stringKey": 'while (alive() && state["n"]) { state.n--; await holdOpen(20); }',
  "M1.numericKey": 'while (alive() && counts["0"] !== 0) { counts[0]--; await holdOpen(20); }',
  "M1.wrappedIndex": "while (alive() && counts[i!]) { counts[i]--; await holdOpen(20); }",
  "M1.wrappedKeyChain": "while (alive() && counts[cursor!.i]) { counts[cursor.i]--; await holdOpen(20); }",
  "M1.wrappedLiteralKey": "while (alive() && counts[0 as const]) { counts[0]--; await holdOpen(20); }",
  "M1.parenthesizedLiteralKey": 'while (alive() && state[("n")]) { state.n--; await holdOpen(20); }',
  "M1.spacedLink": "while (alive() && state /* left */ .n) { state.n--; await holdOpen(20); }",
  "M1.assignedReceiver": "while (alive() && state.n !== 0) { (state as Counter).n -= 1; await holdOpen(20); }",
  "M1.forIncrementor": "for (let k = 0; counts[k] !== 0 && alive(); counts![k]--) await holdOpen(20);",
  "M1.doThis": "do { this.left -= 1; await holdOpen(20); } while ((this as Poller).left !== 0 && alive());",
  "M1.wrappedNeighbour": "while (ready! && state.n) { state.n--; await holdOpen(20); }",
  "N.settledHelper":
    "function stopHosts() { for (const pid of hosts) process.kill(pid); return hosts.map(gone); }\nafterEach(async () => { await reportAfterCleanup(stopHosts(), cleanup); }, HOST_HOOK_TIMEOUT_MS);",
  "N.settledNamed":
    "async function stopAll() { for (const pid of hosts) process.kill(pid); await reportAfterCleanup(hosts.map(gone), cleanup); }\nafterAll(stopAll, HOST_HOOK_TIMEOUT_MS);",
  "N.quietHook": "beforeEach(() => { savedEnv = { ...process.env }; });",
  "N.unconjoined": "while (queue.length > 0) queue.pop();",
  "N.conjoinedNoBound": "while (alive() && !stopped) await holdOpen(20);",
  "N.textOnly": "const text = \"vi.waitFor(expect.poll) AbortSignal.timeout Atomics.wait globalThis['setTimeout']\"; // afterAll(() => process.kill(pid))",
  "N.otherMember": "const reading = await client.timeout(5_000);\nsession.wait(20);",
  "N.stateInequality": 'while (alive() && state !== "done") await holdOpen(20);',
  "N.flagEquality": "while (alive() && ready === false) { attempts++; await holdOpen(20); }",
  "N.unconjoinedCountdown": "while (n--) queue.pop();",
  "N.settledFinished":
    "onTestFinished(async () => { for (const pid of hosts) process.kill(pid); await reportAfterCleanup(hosts.map(gone), cleanup); }, HOST_HOOK_TIMEOUT_MS);",
  "N.quietFixture": "const dataTest = test.extend({ data: async ({}, use) => { await use(await loadData()); } });",
  "N.wrappedState": 'while (alive() && (state as string) !== "done") { attempts++; await holdOpen(20); }',
  "N.wrappedFlag": "while (alive() && ready!) { attempts++; await holdOpen(20); }",
  "N.otherReceiver": "while (alive() && other!.n) { state.n--; await holdOpen(20); }",
  "N.otherMemberName": "while (alive() && (state as Counter).done) { state.n--; await holdOpen(20); }",
  "N.otherElement": "while (alive() && counts![1]) { counts[0]--; await holdOpen(20); }",
  "N.otherIndex": "while (alive() && counts[j!]) { counts[i]--; await holdOpen(20); }",
  "N.quotedPrivate": 'while (alive() && this!["#n"]) { this.#n--; await holdOpen(20); }',
  "N.computedLiteral": 'while (alive() && counts[n!]) { counts["n"]--; await holdOpen(20); }',
};

/** wb-nqbd F5: each named residual's planted members (`<residual>.<member>`), every one a quiet row the guard reads nothing in. */
const QUIET: Readonly<Record<string, string>> = {
  "R-WAIT-LOOP.forOfBound": "for (const _ of Array.from({ length: 150 })) { if (!alive()) break; await holdOpen(20); }",
  "R-WAIT-LOOP.breakCount": "for (let i = 0; i < 150; i++) { if (!alive()) break; await holdOpen(20); }",
  "R-WAIT-LOOP.noDelay": "while (!(await ready()));",
  "R-COUNTER-ROUTE.plainStep": "for (let i = 0; i !== MAX_POLLS && alive(); i = i + 1) await holdOpen(20);",
  "R-COUNTER-ROUTE.calledStep": "const next = () => ++tries;\nwhile (alive() && next() !== MAX_TRIES) await holdOpen(20);",
  "R-COUNTER-ROUTE.coerced": "while (!!n-- && alive()) await holdOpen(20);",
  "R-HOST-ROUTE.reexport": 'import { launchDetachedWorkflow } from "./helpers/host-reexport.js";',
  "R-HOST-ROUTE.loaderAlias": 'const load = createRequire(import.meta.url);\nconst host = load("../src/workbench/hosts/local-detached.js");',
  "R-HOST-ROUTE.computedSpecifier": "const host = await import(HOST_MODULE_PATH);",
  "R-HOST-ROUTE.piTool": 'await tool.execute("launch", { action: "launch", invocationId: "quiet" }, undefined, undefined, context);',
  "R-TIMER-ROUTE.importedSleep": 'import { sleep } from "./helpers/time.js";\nawait sleep(20);',
  "R-TIMER-ROUTE.loaderAlias": 'const load = createRequire(import.meta.url);\nconst timers = load("node:timers/promises");',
  "R-COMPUTED-KEY.concatenated": 'globalThis["set" + "Timeout"](resolve, 20);',
  "R-COMPUTED-KEY.named": "await vi[WAIT_HELPER](() => !alive());",
  "R-COMPUTED-KEY.reflected": 'Reflect.get(globalThis, "setTimeout")(resolve, 20);',
  "R-OWNER-ALIAS.signal": 'const signals = AbortSignal;\nawait once(host, "exit", { signal: signals.timeout(20) });',
  "R-OWNER-ALIAS.atomics": "const shared = Atomics;\nshared.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);",
  "R-HOOK-ROUTE.method": "afterEach(async () => { await fixtures.stopAll(); });",
  "R-HOOK-ROUTE.imported": 'import { stopAllHosts } from "./helpers/hosts.js";\nafterEach(stopAllHosts);',
  "R-REGISTRAR-ROUTE.assignedAlias": "let atEnd: typeof onTestFinished | undefined;\natEnd = onTestFinished;\natEnd(() => { for (const pid of hosts) process.kill(pid); });",
  "R-REGISTRAR-ROUTE.computedKey": 'it("stops its host", async context => { context["onTestFinished"](() => { process.kill(host.pid); }); });',
  "R-REGISTRAR-ROUTE.fixtureTable":
    "const fixtures = { hosts: async ({}, use) => { await use(hosts); for (const pid of hosts) process.kill(pid); } };\nconst hostTest = test.extend(fixtures);",
  "R-REGISTRAR-ROUTE.importedFixture": 'import { hostsFixture } from "./helpers/host-fixtures.js";\nconst hostTest = test.extend({ hosts: hostsFixture });',
  "R-REGISTRAR-ROUTE.methodFixture": "const hostTest = test.extend({ hosts: fixtures.hosts });",
  "R-RAISE-SITE.unraised": 'const snapshot = async () => jsonReply("inspect snapshot", await inspect());',
  "R-CHAIN-KEY.callLink": "while (alive() && state!.get().n) { state.get().n--; await holdOpen(20); }",
  "R-CHAIN-KEY.receiverAlias": "const counter = state;\nwhile (alive() && counter.n) { state.n--; await holdOpen(20); }",
};

/** wb-nqbd: the out-of-file roster - what every planted site yields, the residuals' quiet rows, the raise rows and this
 * file's frozen shape (its test titles in order, "%s: " opening a per-member rule row). */
const ROSTER_PATH = join(ROOT, "test", "fixtures", "detached-timing-guard-roster.json");
interface Roster {
  readonly bead: string;
  readonly tests: readonly string[];
  readonly controls: Readonly<Record<string, readonly string[]>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly raiseRows: readonly string[];
  /** wb-69ur F2: the type-level wrapper kinds each T1 and M1 kill control's finding unwraps in its condition. */
  readonly unwraps: Readonly<Record<string, readonly string[]>>;
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every((entry): entry is string => typeof entry === "string")) throw new Error(`roster field ${field} is not a list of strings`);
  return [...value];
}
function tableOf(value: unknown, field: string): Record<string, string[]> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`roster field ${field} is not a table`);
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, stringsOf(entry, `${field}.${key}`)]));
}
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error("the roster is not a table");
  const fields = new Map(Object.entries(raw));
  const bead = fields.get("bead");
  if (typeof bead !== "string") throw new Error("roster field bead is not a string");
  return {
    bead,
    tests: stringsOf(fields.get("tests"), "tests"),
    controls: tableOf(fields.get("controls"), "controls"),
    residuals: tableOf(fields.get("residuals"), "residuals"),
    raiseRows: stringsOf(fields.get("raiseRows"), "raiseRows"),
    unwraps: tableOf(fields.get("unwraps"), "unwraps"),
  };
}
const ROSTER = readRoster();
/** This file's own text: its header names the residuals. */
const SELF = readFileSync(fileURLToPath(import.meta.url), "utf8");

/** The findings ("<rule> <text>") each planted site `prefix` names yields, read as its own member, by site id. */
function controlsOf(prefix: string): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(CONTROLS)
      .filter(([id]) => id.startsWith(prefix))
      .map(([id, text]) => [id, readText(`${id}.test.ts`, text).findings.map(finding => `${finding.rule} ${finding.text}`)]),
  );
}
/** wb-69ur F2: syntax kinds by name, once each, in kind order. */
function kindNames(kinds: Iterable<ts.SyntaxKind>): string[] {
  return [...new Set(kinds)].sort((left, right) => left - right).map(kind => ts.SyntaxKind[kind]);
}
/** wb-69ur F2: true when TypeScript's own isOuterExpression files `node` under `flags` (false when the module lacks it). */
function outerUnder(node: ts.Node, flags: ts.OuterExpressionKinds): boolean {
  return isOuterExpression?.(node, flags) === true;
}
/** wb-69ur F2: a node of `kind` as isOuterExpression reads one under these flags, by its kind alone: it switches on
 * node.kind, and reads more of a node only under ExcludeJSDocTypeAssertion, which no reading here passes. */
function kindOnly(kind: ts.SyntaxKind): ts.Node {
  return { kind } as unknown as ts.Node;
}
/** wb-69ur F2: every syntax kind TypeScript's own isOuterExpression files under `flags`, read over its whole SyntaxKind enum. */
function outerKindsUnder(flags: ts.OuterExpressionKinds): string[] {
  return kindNames(Object.values(ts.SyntaxKind).filter((value): value is ts.SyntaxKind => typeof value === "number" && outerUnder(kindOnly(value), flags)));
}
/** wb-69ur F2: OUTER_INSTANCES parsed, each statement's expression, beside a partially emitted expression built by
 * TypeScript's own factory. */
function outerInstances(): ts.Node[] {
  const parsed = OUTER_INSTANCES.flatMap(text => {
    const statement = ts.createSourceFile("instance.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).statements[0];
    return statement !== undefined && ts.isExpressionStatement(statement) ? [statement.expression] : [];
  });
  return [...parsed, ts.factory.createPartiallyEmittedExpression(ts.factory.createIdentifier("n"))];
}
/** wb-69ur F2: the type-level wrapper kinds (by name) each planted site `prefix` names unwraps in its G3 findings'
 * conditions, read as its own member, by site id. */
function unwrapsOf(prefix: string): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(CONTROLS)
      .filter(([id]) => id.startsWith(prefix))
      .map(([id, text]) => [id, kindNames(readText(`${id}.test.ts`, text).findings.flatMap(finding => (finding.rule === "G3" ? (finding.unwraps ?? []) : [])))]),
  );
}
/** wb-69ur F2: the roster's unwrapped kinds for the planted sites `prefix` names. */
function rosterUnwrapsOf(prefix: string): Record<string, readonly string[]> {
  return Object.fromEntries(Object.entries(ROSTER.unwraps).filter(([id]) => id.startsWith(prefix)));
}
/** wb-nqbd F4: each planted table's case records its table once its compare held; the last case reads the record. */
const COMPARED: string[] = [];
/** The roster's findings for the planted sites `prefix` names. */
function rosterControlsOf(prefix: string): Record<string, readonly string[]> {
  return Object.fromEntries(Object.entries(ROSTER.controls).filter(([id]) => id.startsWith(prefix)));
}
/** A vitest task as this file reads it (wb-nqbd F4): a test, or a suite holding tasks. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode: string;
  readonly fails?: boolean;
  readonly result?: { readonly state?: string };
  readonly tasks?: readonly TaskNode[];
}
/** The tests of a vitest task tree, in registration order. */
function testsOf(tasks: readonly TaskNode[], into: TaskNode[] = []): TaskNode[] {
  for (const child of tasks) {
    if (child.type === "test") into.push(child);
    else if (child.type === "suite") testsOf(child.tasks ?? [], into);
  }
  return into;
}
/** The roster's test titles, each per-member rule row ("%s: ") expanded over the judged set. */
function rosterTests(): string[] {
  return ROSTER.tests.flatMap(title => (title.startsWith("%s: ") ? judged.map(name => title.replace("%s", name)) : [title]));
}
/** wb-nqbd F5: the residual ids (R-<NAME>) the leading comment of `text` names, in order of first mention. */
function headerResiduals(text: string): string[] {
  const header = text.slice(0, text.indexOf("*/"));
  return [...new Set([...header.matchAll(/\bR-[A-Z]+(?:-[A-Z]+)*\b/g)].map(match => match[0]))];
}
/** wb-g0yl: the prose of the leading comment of `text`, its comment prefixes dropped and its whitespace collapsed. */
function headerProse(text: string): string {
  return text.slice(0, text.indexOf("*/")).replace(/^[ \t]*\/?\*+[ \t]?/gm, "").replace(/\s+/g, " ");
}
/** True when `callee` registers a test row: it, test, or a member or table form of either (it.each(...)). */
function registersTest(callee: ts.Expression): boolean {
  const root = ts.isCallExpression(callee) ? callee.expression : callee;
  const head = ts.isPropertyAccessExpression(root) ? root.expression : root;
  return ts.isIdentifier(head) && (head.text === "it" || head.text === "test");
}
/** wb-nqbd F5 (R-RAISE-SITE): each test row of `text` that calls raiseTransportLapse, as "<name>: <row title>". */
function raiseRowsOf(name: string, text: string): string[] {
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const rows = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "raiseTransportLapse") {
      const row = ts.findAncestor(node.parent, (up): up is ts.CallExpression => ts.isCallExpression(up) && registersTest(up.expression) && up.arguments[0] !== undefined && ts.isStringLiteralLike(up.arguments[0]));
      const title = row?.arguments[0];
      rows.add(`${name}: ${title !== undefined && ts.isStringLiteralLike(title) ? title.text : "(outside every test row)"}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...rows];
}

describe("wb-maza: the detached-* family keeps its strict timing markers (owner R721, R723)", () => {
  it("judges every default-gate member of the family, read from the test directory and vitest.config.ts", () => {
    expect(family.length, "the family glob matched no suite").toBeGreaterThan(0);
    // The one member the default gate excludes runs only as its own forge command (vitest.detached-control-live.config.ts).
    expect(family.filter(name => !judged.includes(name))).toEqual(["workbench-detached-control-live.test.ts"]);
    expect(judged.length).toBe(family.length - 1);
  });

  it("pins the members that import the marked twins: the three suites that drive real hosts, and the helper's own unit rows", ({ task }) => {
    const importers = [...readings].filter(([, reading]) => reading.twins.length > 0).map(([name, reading]) => `${name}:${reading.twins.join("+")}`);
    expect(importers).toEqual([
      "workbench-detached-child-environ.test.ts:launchDetachedMarked",
      "workbench-detached-hostile-child.test.ts:connectDetachedMarked+launchDetachedMarked",
      "workbench-detached-socket-base.test.ts:connectDetachedMarked+launchDetachedMarked",
      "workbench-detached-timing.test.ts:connectDetachedMarked+launchDetachedMarked",
    ]);
    // wb-g0yl (R694 follow-up of wb-ksz landing 534, F3): this row's title and the header count the suites that drive real
    // hosts - every importer the list pins but the helper's own unit rows - so a suite that joins the list re-counts both.
    const hosts = importers.filter(entry => !entry.startsWith(`${HELPER_ROWS}:`)).length;
    const counted = `the ${COUNT_WORDS[hosts] ?? String(hosts)} suites that drive real hosts`;
    expect(task.name, "this row's title counts the real-host suites the list pins").toContain(counted);
    expect(headerProse(SELF), "the header counts the real-host suites the list pins").toContain(counted);
  });

  it.each(judged)("%s: G1 drives hosts only through the marked twins, never a raw launch or connect value import", name => {
    const reading = readings.get(name);
    expect(reading, `${name} was not read`).toBeDefined();
    const g1 = (reading?.findings ?? []).filter(finding => finding.rule === "G1");
    expect(g1, shown(g1)).toEqual([]);
  });

  it.each(judged)("%s: G2 holds no raw timer - a timed wait is pollFor and a held window is holdOpen", name => {
    const reading = readings.get(name);
    expect(reading, `${name} was not read`).toBeDefined();
    const g2 = (reading?.findings ?? []).filter(finding => finding.rule === "G2");
    expect(g2, shown(g2)).toEqual([]);
  });

  it.each(judged)("%s: G3 holds no fixed-count or clock-deadline poll loop (the pre-cure shape)", name => {
    const reading = readings.get(name);
    expect(reading, `${name} was not read`).toBeDefined();
    const g3 = (reading?.findings ?? []).filter(finding => finding.rule === "G3");
    expect(g3, shown(g3)).toEqual([]);
  });

  it.each(judged)("%s: G4 a hook that stops hosts reports a lapse only after its cleanup, under HOST_HOOK_TIMEOUT_MS", name => {
    const reading = readings.get(name);
    expect(reading, `${name} was not read`).toBeDefined();
    const g4 = (reading?.findings ?? []).filter(finding => finding.rule === "G4");
    expect(g4, shown(g4)).toEqual([]);
  });

  it("reads each rule's own shape: a planted member with one site per rule yields exactly its G1-G4 findings (instrument check)", () => {
    const planted = [
      'import { launchDetachedWorkflow } from "../src/workbench/hosts/local-detached.js";',
      'import * as host from "../src/workbench/hosts/local-detached.js";',
      'import { type connectDetachedWorkflow, resolveDetachedSocket } from "../src/workbench/hosts/local-detached.js";',
      'import { connectDetachedMarked } from "./helpers/detached-timing.js";',
      "const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));",
      "async function gone(alive: () => boolean) { for (let i = 0; i < 150 && alive(); i++) await pause(20); }",
      "async function until(done: () => boolean) { const start = Date.now(); while (!done() && Date.now() - start < 9) await pause(5); }",
      "for (let row = 0; row < 3; row++) void row;",
      '// a comment naming setInterval and "../src/workbench/hosts/local-detached.js" is never a finding',
      'const text = "setImmediate(launchDetachedWorkflow)";',
      "afterEach(async () => { for (const pid of hosts) process.kill(pid); await Promise.all(hosts.map(gone)); });",
      "afterEach(async () => { for (const pid of hosts) process.kill(pid); await reportAfterCleanup(hosts.map(gone), cleanup); }, HOST_HOOK_TIMEOUT_MS);",
      "afterEach(() => { restore(); });",
    ].join("\n");
    const reading = readText("planted.test.ts", planted);
    expect(reading.findings.map(finding => `${finding.rule} ${finding.at}`)).toEqual([
      "G1 planted.test.ts:1",
      "G1 planted.test.ts:2",
      "G2 planted.test.ts:5",
      "G3 planted.test.ts:6",
      "G3 planted.test.ts:7",
      "G4 planted.test.ts:11",
      "G4 planted.test.ts:11",
    ]);
    expect(reading.twins).toEqual(["connectDetachedMarked"]);
  });

  it("wb-nqbd F4 frozen shape, as collected: this file's tests equal the roster's, expanded over the judged set, in order and in run mode, and the roster's shape equals the frozen-shape literal", ({ task }) => {
    // The frozen-shape literal (AC1-style): the roster's rows, its planted sites by group and its quiet rows by residual.
    const groups = [...new Set(Object.keys(ROSTER.controls).map(id => id.slice(0, id.indexOf("."))))];
    expect([
      ...ROSTER.tests.map(title => (title.startsWith("%s: ") ? `each:${title.slice(4, 6)}` : "row")),
      ...groups.map(group => `${group}:${Object.keys(ROSTER.controls).filter(id => id.startsWith(`${group}.`)).length}`),
      ...Object.entries(ROSTER.residuals).map(([residual, ids]) => `${residual}:${ids.length}`),
      `unwraps:${Object.keys(ROSTER.unwraps).length}`,
    ]).toEqual([
      "row",
      "row",
      "each:G1",
      "each:G2",
      "each:G3",
      "each:G4",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "row",
      "F1:9",
      "F2:6",
      "F3:14",
      "V1:13",
      "V2:15",
      "T1:13",
      "M1:23",
      "N:20",
      "R-WAIT-LOOP:3",
      "R-COUNTER-ROUTE:3",
      "R-HOST-ROUTE:4",
      "R-TIMER-ROUTE:2",
      "R-COMPUTED-KEY:3",
      "R-OWNER-ALIAS:2",
      "R-HOOK-ROUTE:2",
      "R-REGISTRAR-ROUTE:5",
      "R-RAISE-SITE:1",
      "R-CHAIN-KEY:2",
      "unwraps:36",
    ]);
    expect(ROSTER.bead).toBe("wb-nqbd");
    // As collected, before any case runs: the last case checks the same tree again, so deleting either one reds the other.
    const collected = testsOf(task.file.tasks);
    expect(collected.map(entry => entry.name), "every collected test of this file, exactly and in roster order").toEqual(rosterTests());
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails === true).map(entry => `${entry.name} | ${entry.mode}`), "a collected test not in run mode, or inverted").toEqual([]);
  });

  it("wb-nqbd F1 kill controls: vitest's wait helpers and AbortSignal.timeout read as G2 - by name on any receiver, by a string key or through a destructured binding", () => {
    expect(controlsOf("F1.")).toStrictEqual(rosterControlsOf("F1."));
    COMPARED.push("F1");
  });

  it("wb-nqbd F2 kill controls: a for, while or do loop whose condition joins any relational bound with && reads as G3 - a countdown, a reversed or named bound, a while or do counter", () => {
    expect(controlsOf("F2.")).toStrictEqual(rosterControlsOf("F2."));
    COMPARED.push("F2");
  });

  it("wb-nqbd F3 kill controls: a timer global by a string key and Atomics.wait read as G2, and an afterEach, afterAll, beforeEach or beforeAll hook that stops hosts - itself or through module-local functions, by name, a vitest import alias or a namespace member - reads as G4", () => {
    expect(controlsOf("F3.")).toStrictEqual(rosterControlsOf("F3."));
    COMPARED.push("F3");
  });

  it("wb-vh7c F1 kill controls: a for, while or do loop whose condition joins with && a counter of the loop reads as G3 - compared by ===, ==, !== or != against a literal or a named bound (on either side, under a negation too), or read as its truth value (n--, --n, n -= 1, a member's step, or n stepped in the body)", () => {
    expect(controlsOf("V1.")).toStrictEqual(rosterControlsOf("V1."));
    COMPARED.push("V1");
  });

  it("wb-vh7c F2 kill controls: vitest's other four hooks that stop hosts read as G4 - onTestFinished and onTestFailed (by name, a vitest import alias, a test-context member, a destructured binding, or a variable bound to one by name or as a member), aroundEach and aroundAll - and so does every fixture that stops hosts (extend, override or scoped; inline, as a tuple, through a builder's onCleanup or a module-local function), which no timeout bounds", () => {
    expect(controlsOf("V2.")).toStrictEqual(rosterControlsOf("V2."));
    COMPARED.push("V2");
  });

  it("wb-vh7c F2 hook kinds: the hooks G4 reads by name are exactly vitest's own hook exports (before*, after*, around* and onTest*), read from the vitest module", () => {
    expect(
      Object.keys(vitestExports)
        .filter(name => HOOK_SHAPE.test(name))
        .sort(),
      "vitest's hook exports, against the hooks G4 reads by name",
    ).toEqual([...HOOKS].sort());
  });

  it("wb-n5xs F1 kill controls: a for, while or do loop whose condition joins with && a counter of the loop read through a TypeScript type-level wrapper (as, an angle-bracket assertion, satisfies or the non-null !, nested too) reads as G3 - as its truth value or under an equality operator, the wrapper around the step itself or around a counter the loop steps, bare or wrapped, in its incrementor or body", () => {
    expect(controlsOf("T1.")).toStrictEqual(rosterControlsOf("T1."));
    COMPARED.push("T1");
  });

  it("wb-n5xs F1, wb-69ur F2 wrapper kinds: the wrappers G3 reads a counter through are exactly TypeScript's own type-level ones, kind by kind (the syntax kinds its isOuterExpression files under OuterExpressionKinds.Assertions, read over its whole SyntaxKind enum and on an instance of every outer expression: as and an angle-bracket assertion, satisfies, the non-null !), and a T1 kill control plants each one in both of the reading's forms, read from the wrappers its finding's condition unwraps, which the roster pins", () => {
    expect(
      [...TYPE_WRAPPERS.values()].reduce((flags, flag) => flags | flag, 0),
      "the flags of the wrappers G3 reads a counter through, against TypeScript's own type-level outer expressions",
    ).toBe(ts.OuterExpressionKinds.Assertions);
    // wb-69ur F2, kind by kind: the syntax kinds G3 reads a counter through are exactly the ones TypeScript's own
    // isOuterExpression files under OuterExpressionKinds.Assertions over its whole SyntaxKind enum, each under its own flag.
    expect(isOuterExpression, "typescript's run-time isOuterExpression").toBeTypeOf("function");
    expect(kindNames(TYPE_WRAPPERS.keys()), "the wrapper kinds G3 reads a counter through, against every kind TypeScript files under Assertions").toEqual(
      outerKindsUnder(ts.OuterExpressionKinds.Assertions),
    );
    expect(
      kindNames([...TYPE_WRAPPERS].filter(([kind, flag]) => !outerUnder(kindOnly(kind), flag)).map(([kind]) => kind)),
      "a wrapper kind TypeScript does not file under its own flag",
    ).toEqual([]);
    // On an instance: every outer expression TypeScript files under All has one (parsed, or built for the partially emitted
    // expression its parser never yields), and the instances it files under Assertions are the wrapper kinds.
    const instances = outerInstances();
    expect(kindNames(instances.map(node => node.kind)), "an instance of every outer expression TypeScript files under All").toEqual(outerKindsUnder(ts.OuterExpressionKinds.All));
    expect(
      kindNames(instances.filter(node => outerUnder(node, ts.OuterExpressionKinds.Assertions)).map(node => node.kind)),
      "the instances TypeScript files under Assertions, against the wrapper kinds",
    ).toEqual(kindNames(TYPE_WRAPPERS.keys()));
    // What each T1 kill control's finding unwraps in its condition is the roster's (never a wrapper elsewhere in its text).
    expect(unwrapsOf("T1."), "the wrappers each T1 kill control's finding unwraps").toStrictEqual(rosterUnwrapsOf("T1."));
    // Each wrapper kind, in each form of the reading: the cells the T1 kill controls plant, read from the wrappers each
    // finding's condition unwraps.
    const planted = new Set(
      Object.entries(CONTROLS)
        .filter(([id]) => id.startsWith("T1."))
        .flatMap(([id, text]) =>
          readText(`${id}.test.ts`, text).findings.flatMap(finding => {
            const form = Object.values(COUNTER_FORMS).find(candidate => finding.rule === "G3" && finding.text.includes(`(${candidate})`));
            return form === undefined ? [] : (finding.unwraps ?? []).map(kind => `${ts.SyntaxKind[kind]} | ${form}`);
          }),
        ),
    );
    const owed = [...TYPE_WRAPPERS.keys()].flatMap(kind => Object.values(COUNTER_FORMS).map(form => `${ts.SyntaxKind[kind]} | ${form}`));
    expect(owed.filter(cell => !planted.has(cell)), "a wrapper kind that no T1 kill control's finding unwraps in one of the reading's two forms").toEqual([]);
  });

  it("wb-69ur F1 kill controls: a for, while or do loop whose condition joins with && a member counter of the loop (a property or an element, of an object or of this) reads as G3 when parentheses or a TypeScript type-level wrapper sit on a link of its member chain instead of around the counter, whichever side of the loop holds them (its condition, its incrementor or its body), as its truth value or under an equality operator, and when an optional chain, a literal element key or the spacing around a link spells the same member; the wrappers each finding's condition unwraps are the roster's, and they cover every type-level wrapper kind", () => {
    expect(controlsOf("M1.")).toStrictEqual(rosterControlsOf("M1."));
    expect(unwrapsOf("M1."), "the wrappers each M1 kill control's finding unwraps").toStrictEqual(rosterUnwrapsOf("M1."));
    const seen = new Set(Object.values(unwrapsOf("M1.")).flat());
    expect(
      kindNames(TYPE_WRAPPERS.keys()).filter(name => !seen.has(name)),
      "a type-level wrapper kind that no M1 kill control's finding unwraps",
    ).toEqual([]);
    COMPARED.push("M1");
  });

  it("wb-nqbd, wb-vh7c, wb-n5xs and wb-69ur negative controls: a settled hook (an onTestFinished among them), a hook or a fixture that stops nothing, a loop without && (a countdown among them), a loop whose && joins neither a relational bound nor a counter of its own (an inequality on a state, an equality on a flag while another value counts, a state or a flag read through a TypeScript wrapper, and another receiver's member, another member or another element read through a wrapper while a member counts), text alone and another object's members yield no finding; the controls are the roster's, in order", () => {
    expect(controlsOf("N.")).toStrictEqual(rosterControlsOf("N."));
    expect(Object.keys(CONTROLS), "the planted sites are the roster's, in order and both ways").toEqual(Object.keys(ROSTER.controls));
    COMPARED.push("N");
  });

  it("wb-nqbd F5 named residuals: every residual the header names has quiet rows in the roster, and each quiet row's planted member yields no finding", () => {
    const quiet = Object.entries(QUIET).map(([id, text]) => ({ id, found: readText(`${id}.test.ts`, text).findings }));
    expect(quiet.filter(row => row.found.length > 0).map(row => `${row.id}: ${shown(row.found)}`), "a quiet row yields a finding").toEqual([]);
    const residualOf = (id: string): string => id.slice(0, id.indexOf("."));
    const residuals = [...new Set(quiet.map(row => residualOf(row.id)))];
    expect(Object.fromEntries(residuals.map(residual => [residual, quiet.filter(row => residualOf(row.id) === residual).map(row => row.id)])), "the quiet rows by residual are the roster's").toStrictEqual(ROSTER.residuals);
    expect(headerResiduals(SELF), "the residuals this file's header names are the roster's, in order").toEqual(Object.keys(ROSTER.residuals));
    COMPARED.push("residuals");
  });

  it("wb-nqbd F5 R-RAISE-SITE: the family's raiseTransportLapse call rows equal the roster's - socket-base's 60-byte TMPDIR row and the helper's own unit row", () => {
    const rows = judged.flatMap(name => raiseRowsOf(name, readFileSync(join(ROOT, "test", name), "utf8")));
    expect(rows).toEqual([...ROSTER.raiseRows]);
    COMPARED.push("raiseRows");
  });

  it("wb-nqbd F4 frozen shape, as run: this file's tests equal the roster's, expanded over the judged set, and every other test ran before this last case", ({ task }) => {
    const walked = testsOf(task.file.tasks);
    expect(walked.map(entry => entry.name), "every collected test of this file, exactly and in roster order").toEqual(rosterTests());
    const here = walked.indexOf(task);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails === true || !ran(entry.result?.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.result?.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    // Each planted table reached its own compare: a case deleted from every literal of the shape still leaves its table here.
    const tables = [...new Set(Object.keys(CONTROLS).map(id => id.slice(0, id.indexOf("."))))];
    expect(COMPARED, "every planted table reached its compare, in order").toEqual([...tables, ...(Object.keys(QUIET).length > 0 ? ["residuals"] : []), ...(ROSTER.raiseRows.length > 0 ? ["raiseRows"] : [])]);
  });
});
