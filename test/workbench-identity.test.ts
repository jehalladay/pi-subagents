import { createHash } from "node:crypto";
import fsDefault, { copyFile, copyFileSync, cp, cpSync, promises as fsPromisesMember, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The RUNTIME EMIT JUDGE (wb-hk9l, R656/R670, v10): the primary copy pin over the JUDGED SURFACE SET S, stated exactly:
 * cp, cpSync, copyFile and copyFileSync on node:fs (named and default exports), the fs.promises member (named and via
 * the default export), and the node:fs/promises module (cp, copyFile; named and default exports). The wraps OBSERVE and
 * CALL THROUGH, always: they record every S-call made anywhere in this file's module graph with its attribution and
 * whether a COPY WINDOW admitted it, and never change the call's outcome (no mock decides an assertion). Admission is a
 * SYNCHRONOUS WINDOW OPENED BY THE BUDGETED ROW'S OWN FIRST ACT: every PACKAGE_COPY_ROWS row is a direct
 * it(title, PACKAGE_COPY_ROW, <literal function>) whose first statement is budgeted(title, body); budgeted opens the window,
 * runs body synchronously and closes it when body returns - a body returning a thenable is refused - so nothing (no hook of
 * any kind incl. around each/all and cleanups, no timer, microtask, other row or closure) can run while a window is open:
 * JavaScript executes nothing else during a synchronous call. The promise-returning surfaces are CALLED inside the window
 * (the judge observes at the call) and settle after it closes. budgeted refuses a title outside the roster-anchored budget
 * list, a run under a chain this file's own beforeEach did not record for it (a same-titled row in another suite, a hook),
 * a second window for the row and an overlap; the budget row pins (AST) that the only budgeted(...) calls in the file are
 * the first statements of the matching rows' literal test functions (no hook, helper, closure or later statement holds one),
 * each roster title once, no bare it/test wearing a budgeted title. Every S-call outside a window is a VIOLATION recorded in
 * process AND appended to the sidecar .forge/hk9l-copy-violations.jsonl (created empty when this file loads) through the
 * unmocked builtin fs (process.getBuiltinModule); it is judged red at every row boundary by this file's hooks, at file end
 * by a judge registered as the file's only afterAll, and - outside the runner's hook order altogether - by the census tier
 * (test/workbench-hk9l-copy-window.census.ts reads the sidecar after the test step, its pins anchored in the roster, its exact
 * bytes sha256-digest-pinned and its shape pinned from this file, so neutering the leg reds this file first), so a copy made
 * after the last in-file callback still reds the gate. The budget row also pins
 * the single afterAll registration, the un-aliased single vitest import, the reverse after-hook order and that no row is
 * concurrent. The wrap-liveness row proves every surface member of S carries the judge's mark and is one judged function
 * across its spellings; the budget list and its suite are anchored OUT OF FILE in test/fixtures/hk9l-scan-roster.json. The
 * budgeted rows copy the package files TEST-SIDE (cpSync in their bodies); src's captureInvocationIdentity hashes by read
 * and makes no S-call. Stated bounds: a file-alone run has no census step (its in-file judges alone decide); code in this
 * file that rewrites the judge's own state or re-wires vitest's it is outside the claim. The residual risk is a copy that
 * BYPASSES S, runtime-invisible by design: read/write composition, subprocess copy, createRequire and getBuiltinModule
 * requisition, and an other-module helper that re-implements the copy without S; the static scan layer and the roster's
 * residual families hold those, each with an id-asserted pinned quiet row and its runtime reading stated per family.
 */
const emitState = vi.hoisted(() => {
  // The unmocked builtins (process.getBuiltinModule bypasses vi.mock, exactly as the R-REQUIRE residual states): the
  // violation sidecar is written through them so the record exists outside this process's runner state.
  const realFs = process.getBuiltinModule("node:fs");
  const realPath = process.getBuiltinModule("node:path");
  const realUrl = process.getBuiltinModule("node:url");
  const sidecar = realPath.join(realPath.dirname(realUrl.fileURLToPath(import.meta.url)), "..", ".forge", "hk9l-copy-violations.jsonl");
  realFs.mkdirSync(realPath.dirname(sidecar), { recursive: true });
  // Created EMPTY at load (not removed): its presence is the census tier's proof that this run armed the sidecar through the real fs.
  realFs.writeFileSync(sidecar, "");
  const state = {
    observed: [] as { row: string; chain: string; call: string; admitted: boolean }[],
    /** The violation sidecar this run writes (created empty at load), read by test/workbench-hk9l-copy-window.census.ts. */
    sidecar,
    /** Chains that already opened their one copy window. */
    opened: new Set<string>(),
    /** The FULL title chain (suite > row) of the row running now, for attribution only; null between rows. */
    currentChain: null as string | null,
    currentRow: "<module scope>",
    /** The copy window: the full chain of the budgeted row whose test function the runner is executing (opened by budgeted(title, body) inside that row's own literal test function, synchronous by construction); null otherwise. */
    window: null as string | null,
    /** The full chains that may hold a window: PACKAGE_COPY_SUITE > each PACKAGE_COPY_ROWS title, filled once below. */
    allowedChains: new Set<string>(),
    /** The mark every judged surface member carries, read by the wrap-liveness row. */
    mark: Symbol("wb-hk9l judged copy surface"),
    /** How many observed entries the row-boundary judges have already read. */
    judged: 0,
    /** Observe only: record the S-call with its attribution and admission, then the wrap calls through. Never decides an outcome. */
    observe(call: string): void {
      const window = state.window;
      const chain = window ?? state.currentChain ?? "<module scope>";
      const admitted = window !== null && state.allowedChains.has(window);
      state.observed.push({ row: chain.split(" > ").pop() ?? chain, chain, call, admitted });
      if (!admitted) realFs.appendFileSync(sidecar, `${JSON.stringify({ call, chain, at: new Date().toISOString() })}\n`);
    },
    /** S-calls made outside an open copy window, as "call @ chain" labels; from the given index onward. */
    violations(from = 0): string[] {
      return state.observed.slice(from).filter(entry => !entry.admitted).map(entry => `${entry.call} @ ${entry.chain}`);
    },
  };
  return state;
});
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  const marked = <F>(fn: F, label: string): F => Object.defineProperty(fn, emitState.mark, { value: label, enumerable: false });
  const wrap = <K extends "cp" | "cpSync" | "copyFile" | "copyFileSync">(name: K): (typeof actual)[K] =>
    marked(((...args: never[]) => {
      emitState.observe(name);
      return (actual[name] as (...callArgs: never[]) => unknown)(...args);
    }) as (typeof actual)[K], name);
  const wrapPromise = <K extends "cp" | "copyFile">(name: K): (typeof actual.promises)[K] =>
    marked(((...args: never[]) => {
      emitState.observe(`promises.${name}`);
      return (actual.promises[name] as (...callArgs: never[]) => unknown)(...args);
    }) as (typeof actual.promises)[K], `promises.${name}`);
  const promises = { ...actual.promises, cp: wrapPromise("cp"), copyFile: wrapPromise("copyFile") };
  const wrapped = { ...actual, cp: wrap("cp"), cpSync: wrap("cpSync"), copyFile: wrap("copyFile"), copyFileSync: wrap("copyFileSync"), promises };
  return { ...wrapped, default: wrapped };
});
vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  const marked = <F>(fn: F, label: string): F => Object.defineProperty(fn, emitState.mark, { value: label, enumerable: false });
  const wrapPromise = <K extends "cp" | "copyFile">(name: K): (typeof actual)[K] =>
    marked(((...args: never[]) => {
      emitState.observe(`promises.${name}`);
      return (actual[name] as (...callArgs: never[]) => unknown)(...args);
    }) as (typeof actual)[K], `promises.${name}`);
  const wrapped = { ...actual, cp: wrapPromise("cp"), copyFile: wrapPromise("copyFile") };
  return { ...wrapped, default: wrapped };
});

import fspDefault, { copyFile as copyFilePromise, cp as cpPromise } from "node:fs/promises";
import { canonicalJson, captureInvocationIdentity, IdentityConflictError, identityDigest, verifyInvocationIdentity } from "../src/workbench/identity.js";

const packageRoot = resolve(import.meta.dirname, "..");
const dirs: string[] = [];
/**
 * The explicit budget of every package-copy row in this file (wb-hk9l), file-local so no other suite's budget moves.
 * A row that copies package.json, package-lock.json and vendor/ into a scratch package root and then hashes every pinned
 * artifact takes a wall time set by host contention rather than by identity logic; inside vitest's default 5000 ms budget it
 * failed in the a2g.13 trunk control, the wb-973.2 owner gate and both wb-gs2.3 machine runs. The budget is more than 2 x the
 * worst wall of record (WORST_MEASURED_WALL_MS) and above the owner floor of 20000 ms. A gate's serial leg runs with
 * --testTimeout=60000, which does not lift an explicit budget, so this budget alone has to clear the worst wall; it is also a
 * value no tier runs as its default, so the runner read in the wb-hk9l row tells a budgeted row from a default one. A row's
 * synchronous file work cannot be interrupted, so the budget only decides when a finished row is failed; it never retries one.
 */
const PACKAGE_COPY_ROW_BUDGET_MS = 120_000;
/**
 * The worst wall of record of a package-copy row: "pins actual package.json, ..." at 50599 ms in a file-alone
 * gate-prep-2 run on probe d7ae1c7 (g10-gate-s4, load1 324.45). Earlier wall 36730 ms in file-alone serial
 * attempt 3 at load1 417 (wb-2j3.4 gate, outbox 571). The lockfile row ran 49772 ms in the CT1b run and
 * 15323 and 11951 ms in outbox 571 (attempts 2 and 3), and 8872 ms serially (outbox 569), 8363 ms at load1 350-400 (wb-gs2.3 relay F1), and 14951 / 8161 ms
 * file-alone at load1 437 (wb-hk9l gate PREP). Instrument residual, never a sizing input: the lockfile row's 320 s synchronous
 * IO-stall block in outbox 571's first serial leg (IO full avg10 ~88) - no budget cures a host stall.
 */
const WORST_MEASURED_WALL_MS = 50_599;
const PACKAGE_COPY_ROW: { readonly timeout: number } = { timeout: PACKAGE_COPY_ROW_BUDGET_MS };
/** The rows that carry PACKAGE_COPY_ROW, in file order: every row whose registration reaches a copy (the wb-hk9l pin). */
const PACKAGE_COPY_ROWS = [
  "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction",
  "uses the shipped dependency lock only when npm has excluded package-lock.json",
  "rejects lockfile changes, missing artifact and lockfile/manifest mismatch",

  "wrap liveness: every judged copy surface emits from this row once",
];
/** The suite that owns every budgeted row: attribution is by FULL chain, so a same-leaf row in another suite is refused (v6 U1). */
const PACKAGE_COPY_SUITE = "WB-014 immutable invocation identity";
for (const row of PACKAGE_COPY_ROWS) emitState.allowedChains.add(`${PACKAGE_COPY_SUITE} > ${row}`);
/** The vitest registration APIs a case can be declared with (the static layers share the set). */
const TEST_APIS: ReadonlySet<string> = new Set(["it", "test"]);
/**
 * The only admission path (v10): a budgeted row's LITERAL test function (registered directly, so report-mode censuses can
 * resolve it) calls budgeted(title, body) as its first statement, and the copy window is budgeted's own SYNCHRONOUS execution
 * of body - it opens on entry and closes when body returns, with no await inside: a body that returns a thenable is refused,
 * so no hook (before/after/around each/all, cleanups), timer, microtask or other row can interleave with an open window
 * (single-threaded JS runs nothing else during a synchronous call). The promise-returning copy surfaces are CALLED inside
 * the window (the observation happens at the call) and settle after it closes. budgeted refuses a title outside the
 * roster-anchored PACKAGE_COPY_ROWS, a run under a chain this file's beforeEach did not record for it (a same-titled row in
 * another suite, or a hook calling it), a second window for the row and an overlap. The budget row pins (AST) that the only
 * budgeted(...) calls in this file are the first statements of the matching rows' literal test functions, so nothing else
 * - no hook, closure or helper - can open a window: their S-calls are violations.
 */
const budgeted = <T>(title: string, body: () => T): T => {
  if (!PACKAGE_COPY_ROWS.includes(title)) throw new Error(`wb-hk9l: "${title}" is not a budgeted row (test/fixtures/hk9l-scan-roster.json packageCopyRows)`);
  const chain = `${PACKAGE_COPY_SUITE} > ${title}`;
  if (emitState.currentChain !== chain) throw new Error(`wb-hk9l: ${chain} asked for its window under chain ${emitState.currentChain ?? "none"}: the file's beforeEach did not record this row`);
  if (emitState.opened.has(chain)) throw new Error(`wb-hk9l: ${chain} already opened its one copy window`);
  if (emitState.window !== null) throw new Error(`wb-hk9l: a copy window is already open (${emitState.window})`);
  emitState.opened.add(chain);
  emitState.window = chain;
  let result: T;
  try {
    result = body();
  } finally {
    emitState.window = null;
  }
  if (result !== null && typeof result === "object" && "then" in (result as object)) throw new Error(`wb-hk9l: ${chain} returned a thenable from its copy window: the window is synchronous by construction, await outside it`);
  return result;
};
/** The node:fs calls that copy a file or a tree, read by name wherever named: imported, as a namespace member or as an element read. */
const COPY_CALLS: ReadonlySet<string> = new Set(["cp", "cpSync", "copyFile", "copyFileSync"]);
/** vitest's test API as this file may name it, the flags that keep a chain the test API, and its condition and table methods. */
const TEST_FLAGS: ReadonlySet<string> = new Set(["concurrent", "fails", "only", "sequential", "skip", "todo"]);
const TEST_CONDITIONS: ReadonlySet<string> = new Set(["runIf", "skipIf"]);
const TEST_TABLES: ReadonlySet<string> = new Set(["each", "for"]);
/** Titles the runner never registers: the scan gives one to a row it cannot read, so the runner cross-check reds on that row. */
const NON_LITERAL_TITLE = "<a row with a non-literal title>";
const UNEXPANDED_TITLE = "<a table row the scan cannot expand>";
type TestApi = { readonly each: boolean; readonly table: ts.Expression | undefined };
/**
 * Every row a test source registers, in registration order, with whether its registration reaches a copy (the wb-hk9l scan).
 * It reads it / test with their TEST_FLAGS chains, the TEST_CONDITIONS calls, and the TEST_TABLES calls over an array-literal
 * table whose title expands by %s alone. A row it cannot read gets a title the runner never registers and a registration it
 * does not recognise is missing from its list, so either way the runner cross-check reds instead of passing the row unread.
 * ENUMERATION (R656/R670 owner completion, v10): the PRIMARY pin is the runtime emit judge above over EXACTLY the judged
 * surface set S - cp, cpSync, copyFile and copyFileSync on node:fs (named and default exports), the fs.promises member
 * (named and via the default export), and the node:fs/promises module (cp, copyFile; named and default exports). Every
 * S-call from any call site in this file's module graph is OBSERVED and called through; it is ADMITTED only inside the
 * synchronous copy window the budgeted row's own first statement opens (budgeted(title, body) inside the row's literal test
 * function: opens on entry, runs body with no await, closes on return, once per row; no other opener exists and nothing
 * can interleave with an open window), and every
 * other S-call is a VIOLATION judged red at the row boundaries, at file end, and by the census tier through the
 * .forge/hk9l-copy-violations.jsonl sidecar. The wraps never decide an outcome. A copy that
 * BYPASSES S is NOT runtime-observed, and no wider claim is made. The static scan below is a SECONDARY liveness layer; it
 * classifies exactly the witness forms pinned in test/fixtures/hk9l-scan-roster.json (every witness has a roster row with
 * its frozen source digest, and the scanner's dispatch vocabulary equals the roster's dispatch list - some witness forms
 * deliberately share a dispatch route). The scan makes no general alias-resolution claim.
 * NAMED RESIDUALS (quiet rows below; every quiet reading is the STATIC SCAN's reading of a frozen source): H5 read+write
 * copy; another module's helper; subprocess copy; hook copy; module-scope copy; captureInvocationIdentity hashing proxy;
 * createRequire requisition; getBuiltinModule requisition. Each family states its RUNTIME reading beside the static one:
 * a hook copy, a module-scope copy and an other-module helper that copies THROUGH S are quiet to the scan but observed as
 * violations by the runtime judge; the hashing proxy makes no S-call at all (src hashes by read; the budgeted rows copy
 * test-side), so a row that only hashes is never a copy; read/write composition, subprocess copy, createRequire and
 * getBuiltinModule requisition (both return the unmocked builtin) and an other-module helper that re-implements the copy
 * without S are quiet to BOTH layers. Those last families are the stated residual risk of scoping to S, accepted and
 * documented here, not a coverage claim. Every family has its own frozen input, exact quiet reading and runtime reading,
 * and the residual table is anchored OUT OF FILE in test/fixtures/hk9l-scan-roster.json (id, family, full source digest,
 * static reading and runtime reading, in table order; the census anchor row enforces order, count and per-row
 * registration exactly). The 320 s synchronous IO-stall remains an instrument residual: no budget cures it.
 * The route/digest roster, the budget list and the residual roster live in test/fixtures/hk9l-scan-roster.json (R656
 * out-of-file anchor).
 */
function scanRows(text: string, visited?: Set<string>): { title: string; copies: boolean }[] {
  const source = ts.createSourceFile("scanned.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  // Dispatch trace is implementation evidence, not a second census literal: the liveness row derives the
  // mandatory branch vocabulary from these call sites and requires its witnesses to reach every branch.
  const route = (name: string): void => { visited?.add(name); };
  const copying = new Set(COPY_CALLS);
  const keys = new Map<string, string>();
  const keyOf = (node: ts.Node): string | undefined => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isComputedPropertyName(node)) { route("computed property"); return keyOf(node.expression); }
    if (ts.isAsExpression(node)) { route("asserted key"); return keyOf(node.expression); }
    if (ts.isTypeAssertionExpression(node)) { route("angle-asserted key"); return keyOf(node.expression); }
    if (ts.isNonNullExpression(node)) { route("non-null asserted key"); return keyOf(node.expression); }
    if (ts.isParenthesizedExpression(node)) return keyOf(node.expression);
    if (ts.isIdentifier(node)) return keys.get(node.text);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = keyOf(node.left); const right = keyOf(node.right);
      if (left !== undefined && right !== undefined) { route("concatenated key"); return left + right; }
    }
    return undefined;
  };
  const bindings: { name: string; value: ts.Node }[] = [];
  const keyBindings: { name: string; value: ts.Expression }[] = [];
  const bind = (name: string | undefined, value: ts.Node | undefined): void => {
    if (name !== undefined && value !== undefined) bindings.push({ name, value });
  };
  const nameOf = (node: ts.Node): string | undefined => {
    if (ts.isIdentifier(node)) return node.text;
    if (ts.isPrivateIdentifier(node)) return node.text;
    if (ts.isPropertyAccessExpression(node)) return node.name.text;
    if (ts.isElementAccessExpression(node)) return node.argumentExpression ? keyOf(node.argumentExpression) : undefined;
    return keyOf(node);
  };
  const collect = (node: ts.Node): void => {
    if (ts.isImportSpecifier(node)) {
      route("import alias"); if (node.propertyName && ts.isStringLiteralLike(node.propertyName)) route("quoted import"); bind(node.name.text, ts.isStringLiteralLike(node.propertyName ?? node.name) ? ts.factory.createIdentifier((node.propertyName as ts.StringLiteral).text) : node.propertyName ?? node.name);
    } else if (ts.isVariableDeclaration(node)) {
      if (ts.isIdentifier(node.name)) {
        route("variable alias"); bind(node.name.text, node.initializer);
        if (node.initializer) keyBindings.push({ name: node.name.text, value: node.initializer });
      } else if (ts.isObjectBindingPattern(node.name) && node.initializer) {
        route("object binding");
        for (const element of node.name.elements) {
          const property = element.propertyName ?? element.name;
          if (ts.isStringLiteralLike(property)) route("quoted binding");
          bind(ts.isIdentifier(element.name) ? element.name.text : undefined, ts.isStringLiteralLike(property) ? ts.factory.createIdentifier(property.text) : property);
          bind(ts.isIdentifier(element.name) ? element.name.text : undefined, element.initializer);
        }
      } else if (ts.isArrayBindingPattern(node.name) && node.initializer) {
        route("array binding");
        node.name.elements.forEach((element, index) => {
          if (!ts.isBindingElement(element)) return;
          bind(nameOf(element.name), node.initializer && ts.isArrayLiteralExpression(node.initializer) ? node.initializer.elements[index] : undefined);
          if (element.initializer) { route("array binding default"); bind(nameOf(element.name), element.initializer); }
        });
      }
    } else if (ts.isBinaryExpression(node) && (node.operatorToken.kind === ts.SyntaxKind.EqualsToken ||
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken || node.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken ||
      node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken)) {
      if (ts.isObjectLiteralExpression(node.left)) {
        route("destructuring assignment");
        for (const property of node.left.properties) {
          if (ts.isPropertyAssignment(property)) {
            if (ts.isStringLiteralLike(property.name)) route("quoted destructuring assignment");
            bind(nameOf(property.initializer), ts.isStringLiteralLike(property.name) ? ts.factory.createIdentifier(property.name.text) : property.name);
          }
        }
      } else if (ts.isArrayLiteralExpression(node.left)) {
        route("array destructuring assignment");
        node.left.elements.forEach((element, index) => {
          bind(nameOf(element), ts.isArrayLiteralExpression(node.right) ? node.right.elements[index] : node.right);
        });
      } else {
        route("assignment alias");
        if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken) route("nullish assignment");
        if (node.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken) route("logical assignment");
        if (ts.isPropertyAccessExpression(node.left)) route("property assignment");
        if (ts.isElementAccessExpression(node.left)) route("element key assignment");
        bind(nameOf(node.left), node.right);
      }
    } else if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isPropertyAssignment(node) ||
      ts.isPropertyDeclaration(node) || ts.isGetAccessorDeclaration(node)) {
      route("callable binding");
      if (ts.isFunctionDeclaration(node)) route("function binding");
      if (ts.isMethodDeclaration(node)) route("method binding");
      if (ts.isPropertyAssignment(node)) route("object property binding");
      if (ts.isPropertyDeclaration(node)) { route("class field binding"); if (node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword)) route("static field binding"); }
      if (ts.isGetAccessorDeclaration(node)) route("getter binding");
      if (node.name && ts.isPrivateIdentifier(node.name)) route("private member");
      if (node.name) bind(nameOf(node.name), node);
    }
    ts.forEachChild(node, collect);
  };
  collect(source);
  for (let grew = true; grew; ) {
    grew = false;
    for (const { name, value } of keyBindings) {
      const key = keyOf(value);
      if (key !== undefined && keys.get(name) !== key) { if (ts.isIdentifier(value)) route("chained key"); keys.set(name, key); grew = true; }
    }
  }
  const names = (node: ts.Node, own?: string): boolean => {
    if (ts.isIdentifier(node) && node.text !== own && copying.has(node.text)) return true;
    if (ts.isPrivateIdentifier(node) && node.text !== own && copying.has(node.text)) return true;

    if (ts.isComputedPropertyName(node)) {
      const key = keyOf(node);
      if (key !== undefined && copying.has(key)) return true;
    }
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const calleeName = ts.isPropertyAccessExpression(callee) ? callee.name.text
        : ts.isElementAccessExpression(callee) && callee.argumentExpression ? keyOf(callee.argumentExpression) : undefined;
      if (calleeName === "get" && (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee))) {
        const base = callee.expression;
        const baseName = ts.isIdentifier(base) ? base.text
          : ts.isPropertyAccessExpression(base) ? base.name.text
          : ts.isElementAccessExpression(base) && base.argumentExpression ? keyOf(base.argumentExpression) : undefined;
        if (baseName === "Reflect") {
          const key = node.arguments[1] ? keyOf(node.arguments[1]) : undefined;
          if (key !== undefined && copying.has(key)) { route("reflected key"); return true; }
        }
      }
    }
    if (ts.isElementAccessExpression(node)) {
      route("element read");
      const key = node.argumentExpression ? keyOf(node.argumentExpression) : undefined;
      if (key !== undefined && copying.has(key)) return true;
    }
    return ts.forEachChild(node, child => (names(child, own) ? true : undefined)) === true;
  };
  let passes = 0;
  for (let grew = true; grew; ) {
    grew = false; passes++;
    for (const { name, value } of bindings) {
      if (copying.has(name) || !names(value, name)) continue;
      if (passes > 1) route("multi-pass binding");
      copying.add(name); grew = true;
    }
  }
  const api = (expression: ts.Expression): TestApi | undefined => {
    if (ts.isIdentifier(expression)) return TEST_APIS.has(expression.text) ? { each: false, table: undefined } : undefined;
    if (ts.isPropertyAccessExpression(expression)) return TEST_FLAGS.has(expression.name.text) ? api(expression.expression) : undefined;
    if (!ts.isCallExpression(expression) || !ts.isPropertyAccessExpression(expression.expression)) return undefined;
    const base = api(expression.expression.expression);
    const method = expression.expression.name.text;
    if (base === undefined) return undefined;
    if (TEST_CONDITIONS.has(method)) return base;
    return TEST_TABLES.has(method) ? { each: true, table: expression.arguments[0] } : undefined;
  };
  const expand = (template: string, table: ts.Expression | undefined): string[] | undefined => {
    if (table === undefined || !ts.isArrayLiteralExpression(table) || template.replaceAll("%s", "").includes("%") || template.includes("$")) return undefined;
    const holes = template.split("%s").length - 1;
    const titles: string[] = [];
    for (const element of table.elements) {
      const items: readonly ts.Expression[] = ts.isArrayLiteralExpression(element) ? element.elements : [element];
      const values = items.slice(0, holes).flatMap(item => (ts.isStringLiteralLike(item) ? [item.text] : []));
      if (values.length !== holes) return undefined;
      let next = 0;
      titles.push(template.replaceAll("%s", () => values[next++]));
    }
    return titles;
  };
  const rows: { title: string; copies: boolean }[] = [];
  const visit = (node: ts.Node): void => {
    const registration = ts.isCallExpression(node) ? api(node.expression) : undefined;
    if (registration !== undefined && ts.isCallExpression(node)) {
      const [title] = node.arguments;
      const literal = title !== undefined && ts.isStringLiteralLike(title) ? title.text : undefined;
      const titles = registration.each ? (literal === undefined ? undefined : expand(literal, registration.table)) : [literal ?? NON_LITERAL_TITLE];
      const copies = names(node);
      for (const name of titles ?? [UNEXPANDED_TITLE]) rows.push({ title: name, copies });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return rows;
}
/**
 * Scan liveness (wb-hk9l): one-row sources that each reach a copy by one route the scan reads - a COPY_CALLS member called
 * directly, as a namespace member or as an element read; a function, arrow, alias, class-method or property helper; a helper
 * two hops away, declared before the helper it calls (so one pass cannot read it); a table row's function - and quiet sources
 * that reach none, plus the two unreadable shapes. Each witness source has a frozen digest independent of its route and
 * reading. SCAN_READINGS is the frozen reading of each, so a route the scan stops
 * reading, a witness deleted or a quiet row read as a copy reds the liveness row.
 */
const SCAN_WITNESSES: readonly (readonly [route: string, source: string])[] = [
  ["direct call", 'it("row", () => { cpSync(a, b); });'],
  ["async call", 'it("row", async () => { await cp(a, b); });'],
  ["file call", 'it("row", () => { copyFileSync(a, b); });'],
  ["async file call", 'it("row", async () => { await copyFile(a, b); });'],
  ["namespace member", 'it("row", () => { fs.cpSync(a, b); });'],
  ["element read", 'it("row", () => { fs["cpSync"](a, b); });'],
  ["function helper", 'function copyInto(): void { cpSync(a, b); }\nit("row", () => { copyInto(); });'],
  ["arrow helper", 'const copyInto = (): void => cpSync(a, b);\nit("row", () => { copyInto(); });'],
  ["alias", 'const copy = cpSync;\nit("row", () => { copy(a, b); });'],
  ["import alias", 'import { cpSync as cloneTree } from "node:fs";\nit("row", () => { cloneTree(a, b); });'],
  ["destructured alias", 'import * as nodeFs from "node:fs";\nconst { cpSync: cloneTree } = nodeFs;\nit("row", () => { cloneTree(a, b); });'],
  ["assigned alias", 'let cloneTree: unknown; cloneTree = cpSync;\nit("row", () => { cloneTree(a, b); });'],
  ["const keyed element", 'const COPY_NAME = "cpSync";\nit("row", () => { nodeFs[COPY_NAME](a, b); });'],
  ["class method", 'class Io { copy(): void { cpSync(a, b); } }\nit("row", () => { new Io().copy(); });'],
  ["property helper", 'register({ copy: (): void => cpSync(a, b) });\nit("row", () => { registry.copy(); });'],
  ["two hops", 'function outer(): void { inner(); }\nfunction inner(): void { cpSync(a, b); }\nit("row", () => { outer(); });'],
  ["table function", 'it.each([["row", () => cpSync(a, b)]])("%s", (_name, run) => { run(); });'],
  ["N1 asserted const key", "const COPY_KEY = \"cpSync\" as const;\nit(\"row\", () => { nodeFs[COPY_KEY](a, b); });"],
  ["N1b chained const key", "const COPY_BASE = \"cpSync\"; const COPY_KEY = COPY_BASE;\nit(\"row\", () => { nodeFs[COPY_KEY](a, b); });"],
  ["N2 quoted destructuring", "const { \"cpSync\": cloneTree } = nodeFs;\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N2b computed destructuring", "const { [\"cpSync\"]: cloneTree } = nodeFs;\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N3 array destructuring", "const [cloneTree] = [cpSync];\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N4 nullish assignment", "let cloneTree: unknown; cloneTree ??= cpSync;\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N4b logical assignment", "let cloneTree: unknown; cloneTree ||= cpSync;\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N5 destructuring assignment", "let cloneTree: unknown; ({ cpSync: cloneTree } = nodeFs);\nit(\"row\", () => { cloneTree(a, b); });"],
  ["N6 class arrow field", "class Io { clone = (from: string, to: string) => cpSync(from, to); }\nit(\"row\", () => { new Io().clone(a, b); });"],
  ["N6b static field", "class Io { static clone = cpSync; }\nit(\"row\", () => { Io.clone(a, b); });"],
  ["N7 class getter", "class Io { get clone() { return cpSync; } }\nit(\"row\", () => { new Io().clone(a, b); });"],
  ["N8 property assignment", "const gateIo = {}; gateIo.clone = cpSync;\nit(\"row\", () => { gateIo.clone(a, b); });"],
  ["N9 concatenated key", "it(\"row\", () => { nodeFs[\"cp\" + \"Sync\"](a, b); });"],
  ["N10 reflected key", "it(\"row\", () => { Reflect.get(nodeFs, \"cpSync\")(a, b); });"],
  ["N11 quoted import", "import { \"cpSync\" as cloneTree } from \"node:fs\";\nit(\"row\", () => { cloneTree(a, b); });"],
  ["E1 and-and assignment", "let gateClone: unknown = (): void => undefined; gateClone &&= cpSync;\nit(\"row\", () => { gateClone(a, b); });"],
  ["E2 array destructuring assignment", "let gateClone: unknown; [gateClone] = [cpSync];\nit(\"row\", () => { gateClone(a, b); });"],
  ["E3 quoted destructuring assignment", "let gateClone: unknown; ({ \"cpSync\": gateClone } = nodeFs);\nit(\"row\", () => { gateClone(a, b); });"],
  ["E4 bracket property assignment", "const gateIo = {}; gateIo[\"gateCloneSlot\"] = cpSync;\nit(\"row\", () => { gateIo[\"gateCloneSlot\"](a, b); });"],
  ["E4b bracket-bound dot call", "const gateIo = {}; gateIo[\"gateCloneSlot\"] = cpSync;\nit(\"row\", () => { gateIo.gateCloneSlot(a, b); });"],
  ["E5 private class field", "class GateIo { #gateClone = cpSync; gateRun(from: string, to: string): void { this.#gateClone(from, to); } }\nit(\"row\", () => { new GateIo().gateRun(a, b); });"],
  ["E5b private class method", "class GateIo { #gateCopy(from: string, to: string): void { cpSync(from, to); } gateRun(from: string, to: string): void { this.#gateCopy(from, to); } }\nit(\"row\", () => { new GateIo().gateRun(a, b); });"],
  ["E6 angle-asserted key", "const GATE_KEY = <const>\"cpSync\";\nit(\"row\", () => { nodeFs[GATE_KEY](a, b); });"],
  ["E6b non-null asserted key", "it(\"row\", () => { nodeFs[\"cpSync\"!](a, b); });"],
  ["E59 array-binding default", "const [gateClone = cpSync] = [];\nit(\"row\", () => { gateClone(a, b); });"],
  ["E48a globalThis reflected key", "it(\"row\", () => { globalThis.Reflect.get(nodeFs, \"cpSync\")(a, b); });"],
  ["E48b element reflected key", "it(\"row\", () => { Reflect[\"get\"](nodeFs, \"cpSync\")(a, b); });"],
  ["quiet row", 'it("row", () => { readFileSync(a); });'],
  ["quiet helper", 'function read(): void { readFileSync(a); }\nit("row", () => { read(); });'],
  ["quiet near names", 'it("row", () => { const copyright = cpSyncCount; expect(copyright).toBe(0); });'],
  ["unexpandable table", 'it.each([{ name: "row" }])("$name", () => { cpSync(a, b); });'],
  ["non-literal title", "it(name, () => { cpSync(a, b); });"],
];
/** Frozen independently of the live sources: a one-line source swap must not erase a scan route. */
const SCAN_SOURCE_DIGESTS: readonly string[] = [
  "9b30411f5e41cca5", // direct call
  "33247f8eef2e3873", // async call
  "610cc9a31b640dc7", // file call
  "8d9fc75d995c09ef", // async file call
  "a97e8481dd263fb3", // namespace member
  "fa05617005f18541", // element read
  "d6bc747d9aa0e310", // function helper
  "60338d19207e4c15", // arrow helper
  "673ec6d8ec8c8ea4", // alias
  "8580af04d21eb509", // import alias
  "32ce34abf1911ffa", // destructured alias
  "6773d2f3c4b279cf", // assigned alias
  "0003751cc734799a", // const keyed element
  "3a9204d0f1c28ba3", // class method
  "81f9bb1104466df1", // property helper
  "ce4aaeb87fd883ba", // two hops
  "3da62b69c2800986", // table function
  "490d34a6868bca6f", // N1 asserted const key
  "ecfc34d3f7530302", // N1b chained const key
  "abc435b2f1085826", // N2 quoted destructuring
  "feae605b36fad60c", // N2b computed destructuring
  "270bc85e85ee5706", // N3 array destructuring
  "4943f856dbafa30f", // N4 nullish assignment
  "bd67898fb17e5538", // N4b logical assignment
  "e0d8150b0ea4b945", // N5 destructuring assignment
  "18c4b398707a13d6", // N6 class arrow field
  "1a0fe4aab3037172", // N6b static field
  "c0bd5b6e9b412271", // N7 class getter
  "ea5740c4c28069b5", // N8 property assignment
  "56d1013197de9a18", // N9 concatenated key
  "a06d2a8925c2f91f", // N10 reflected key
  "3ba1f0cd6bb81c39", // N11 quoted import
  "8c914952b3edbc0f", // E1 and-and assignment
  "1ca03e2d398ac89c", // E2 array destructuring assignment
  "5f01658355299e70", // E3 quoted destructuring assignment
  "37fc86c6184c58a3", // E4 bracket property assignment
  "b28e740d02278132", // E4b bracket-bound dot call
  "2b9204cfbed62493", // E5 private class field
  "09c01655348e6aa3", // E5b private class method
  "f3ed76035439ae9b", // E6 angle-asserted key
  "e4e6cc0208002f46", // E6b non-null asserted key
  "47fc42b74091e1b5", // E59 array-binding default
  "caef42afee068a02", // E48a globalThis reflected key
  "f880802b1c6ec862", // E48b element reflected key
  "9a24a5a072b631cf", // quiet row
  "d29637fa06af1f5f", // quiet helper
  "f774c75996266b14", // quiet near names
  "d21d9b647115b998", // unexpandable table
  "a10cd2f4c27a93d3", // non-literal title
];
/** The scanner dispatch is the source of truth, outside the witness/readings/digest census literals. */
const scanDispatch = (): string[] => [...scanRows.toString().matchAll(/route\("([^"]+)"\)/g)].map(match => match[1]).sort();
const SCAN_READINGS: readonly string[] = [
  "direct call: row copies",
  "async call: row copies",
  "file call: row copies",
  "async file call: row copies",
  "namespace member: row copies",
  "element read: row copies",
  "function helper: row copies",
  "arrow helper: row copies",
  "alias: row copies",
  "import alias: row copies",
  "destructured alias: row copies",
  "assigned alias: row copies",
  "const keyed element: row copies",
  "class method: row copies",
  "property helper: row copies",
  "two hops: row copies",
  "table function: row copies",
  "N1 asserted const key: row copies",
  "N1b chained const key: row copies",
  "N2 quoted destructuring: row copies",
  "N2b computed destructuring: row copies",
  "N3 array destructuring: row copies",
  "N4 nullish assignment: row copies",
  "N4b logical assignment: row copies",
  "N5 destructuring assignment: row copies",
  "N6 class arrow field: row copies",
  "N6b static field: row copies",
  "N7 class getter: row copies",
  "N8 property assignment: row copies",
  "N9 concatenated key: row copies",
  "N10 reflected key: row copies",
  "N11 quoted import: row copies",
  "E1 and-and assignment: row copies",
  "E2 array destructuring assignment: row copies",
  "E3 quoted destructuring assignment: row copies",
  "E4 bracket property assignment: row copies",
  "E4b bracket-bound dot call: row copies",
  "E5 private class field: row copies",
  "E5b private class method: row copies",
  "E6 angle-asserted key: row copies",
  "E6b non-null asserted key: row copies",
  "E59 array-binding default: row copies",
  "E48a globalThis reflected key: row copies",
  "E48b element reflected key: row copies",
  "quiet row: row quiet",
  "quiet helper: row quiet",
  "quiet near names: row quiet",
  "unexpandable table: <a table row the scan cannot expand> copies",
  "non-literal title: <a row with a non-literal title> copies",
];
interface ScanResidual { readonly id: string; readonly family: string; readonly source: string; readonly reading: string; readonly runtime: string }
const SCAN_RESIDUALS: readonly ScanResidual[] = [
  {"id": "R-H5", "family": "read/write composition", "source": "it(\"row\", () => { writeFileSync(to, readFileSync(from)); });", "reading": "row quiet", "runtime": "invisible: no S-call, the bytes move by read and write"},
  {"id": "R-MODULE", "family": "other-module helper", "source": "import { copyPackage } from \"./other.js\";\nit(\"row\", () => { copyPackage(a, b); });", "reading": "row quiet", "runtime": "observed as a violation when the helper copies through S outside a copy window (in-process judges + sidecar); invisible when it re-implements the copy without S"},
  {"id": "R-PROCESS", "family": "subprocess copy", "source": "it(\"row\", () => { execFileSync(\"cp\", [a, b]); });", "reading": "row quiet", "runtime": "invisible: the copy runs in another process"},
  {"id": "R-HOOK", "family": "hook copy", "source": "beforeEach(() => { cpSync(a, b); });\nit(\"row\", () => { expect(true).toBe(true); });", "reading": "row quiet", "runtime": "observed as a violation: an S-call in a hook of any kind (before/after/around each/all, cleanups) runs with no copy window open and cannot interleave with one (every window is synchronous), so the row at that boundary, the file end or the census tier reds"},
  {"id": "R-SCOPE", "family": "module-scope copy", "source": "cpSync(a, b);\nit(\"row\", () => { expect(true).toBe(true); });", "reading": "row quiet", "runtime": "observed as a violation: an S-call at module scope runs with no copy window open, so the first row reds and the sidecar records it"},
  {"id": "R-PROXY", "family": "identity hashing proxy", "source": "it(\"row\", () => { captureInvocationIdentity(request); });", "reading": "row quiet", "runtime": "invisible: captureInvocationIdentity hashes by read and makes no S-call (the budgeted rows copy test-side)"},
  {"id": "R-REQUIRE", "family": "createRequire requisition", "source": "const requireFs = createRequire(import.meta.url);\nit(\"row\", () => { requireFs(\"node:fs\")[String(\"cpSync\")](a, b); });", "reading": "row quiet", "runtime": "invisible: createRequire returns the unmocked builtin"},
  {"id": "R-BUILTIN", "family": "getBuiltinModule requisition", "source": "it(\"row\", () => { process.getBuiltinModule(\"node:fs\")[String(\"cpSync\")](a, b); });", "reading": "row quiet", "runtime": "invisible: getBuiltinModule returns the unmocked builtin"},
];

function fixture() {
  const workspace = mkdtempSync(join(tmpdir(), "workbench-identity-"));
  dirs.push(workspace);
  const scriptPath = join(workspace, "workflow.js");
  writeFileSync(scriptPath, "export default () => 1;\n");
  const request = {
    definition: { kind: "script" as const, id: "workflow.test", schemaVersion: "1" },
    scriptPath,
    packageRoot,
    hostArtifacts: ["src/workbench/identity.ts"],
    runtimeArtifacts: [join(packageRoot, "node_modules/@forge/sdk/dist/index.js")],
    logicalInvocationId: "request-1",
    principal: { issuer: "test-auth", subject: "user-A" },
    workspace: { path: workspace, sourceBasis: "sha256:source-a" },
    effectiveConfig: { model: "pinned", permissions: ["read"] },
    hostAbi: { runtime: "node", version: process.versions.node, platform: process.platform, arch: process.arch, interfaceVersion: "workbench/v1" },
    providerDescriptors: [{ id: "forge.gate.status", version: "1.0.0", contractSource: "@forge/sdk@0.1.0:gate.status", inputSchema: { type: "object", properties: { target: { type: "string" } } } }],
  };
  return { workspace, scriptPath, request };
}
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });
// File-level judging (v10): these hooks fire for every row in the file whatever its suite and are the only source of the
// row chain the window keys on. The window must be closed at every row boundary, a budgeted row must have opened it, and
// an S-call outside an open window - from a hook of any kind, module scope, a late row or another suite - is a VIOLATION
// that reds the row at whose boundary it is seen (and is written to the sidecar for the census tier).
beforeEach(() => {
  const chain = expect.getState().currentTestName ?? null;
  emitState.currentChain = chain;
  emitState.currentRow = chain?.split(" > ").pop() ?? "<module scope>";
  expect(emitState.window, "no copy window is open when a row starts").toBeNull();
  const seen = emitState.violations(emitState.judged);
  emitState.judged = emitState.observed.length;
  expect(seen, "no S-call ran outside a copy window since the last row boundary").toEqual([]);
});
afterEach(() => {
  const chain = emitState.currentChain;
  expect(emitState.window, "the row's copy window closed with its body").toBeNull();
  if (chain !== null && emitState.allowedChains.has(chain)) expect(emitState.opened.has(chain), "a budgeted row opens its copy window in its own body").toBe(true);
  const seen = emitState.violations(emitState.judged);
  emitState.judged = emitState.observed.length;
  expect(seen, "no S-call ran outside a copy window during this row or its hooks").toEqual([]);
  emitState.currentChain = null;
  emitState.currentRow = "<between rows>";
});
/**
 * File-end judge (v10): hooks that run after the last row boundary still cannot copy unseen in this process. Under vitest's
 * default hook ordering (sequence.hooks "stack": after-hooks run in REVERSE registration order) the FIRST registered
 * afterAll runs LAST, so this judge is registered before any other afterAll in the file; the budget row pins both facts -
 * it is the file's only afterAll registration (static, with the vitest import un-aliased), and after-hooks really run in
 * reverse order (HOOK_ORDER, empirical). Runner callbacks this judge cannot precede (around-all teardowns, hook cleanups)
 * are why every violation is ALSO written to the sidecar the census tier judges after the test step.
 */
const judgeFileEnd = (): void => {
  expect(emitState.window, "no copy window survives the file").toBeNull();
  expect(emitState.violations(), "no S-call ran outside a copy window anywhere in this file").toEqual([]);
};
afterAll(judgeFileEnd);
/** Empirical pin of the after-hook ordering the file-end judge relies on: the later-registered afterEach runs first. */
const HOOK_ORDER: string[] = [];
afterEach(() => { HOOK_ORDER.push("first-registered"); });
afterEach(() => { HOOK_ORDER.push("second-registered"); });

describe(PACKAGE_COPY_SUITE, () => {
  it("canonicalizes JSON recursively and hashes SHA256 with domain separation", () => {
    expect(canonicalJson({ z: [{ b: 2, a: 1 }], a: true })).toBe('{"a":true,"z":[{"a":1,"b":2}]}');
    expect(identityDigest("configuration", { b: 2, a: 1 })).toBe(identityDigest("configuration", { a: 1, b: 2 }));
    expect(identityDigest("configuration", { a: 1 })).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(identityDigest("configuration", { a: 1 })).not.toBe(identityDigest("provider-contracts", { a: 1 }));
    expect(() => canonicalJson({ a: undefined })).toThrow();
    expect(() => canonicalJson({ a: Number.NaN })).toThrow();
    const accessor = [1]; Object.defineProperty(accessor, "0", { get: () => 42 });
    expect(() => canonicalJson(accessor)).toThrow();
    const hidden = [1]; Object.defineProperty(hidden, "extra", { value: "secret" });
    expect(() => canonicalJson(hidden)).toThrow();
    const nested: unknown[] = []; let current = nested; for (let i = 0; i < 70; i++) { const next: unknown[] = []; current.push(next); current = next; }
    expect(() => canonicalJson(nested)).toThrow();
    expect(() => canonicalJson({ __proto__: null, constructor: "pollution" })).toThrow();
  });

  it("separates definition, deployment, logical request, subject basis and native reference", () => {
    const { request, scriptPath } = fixture();
    const first = captureInvocationIdentity(request);
    expect(first.scriptDigest).toBe(`sha256:${createHash("sha256").update(readFileSync(scriptPath)).digest("hex")}`);
    expect(first.scriptSource).toBe(readFileSync(scriptPath, "utf8"));
    expect(first.identity.definition).toEqual({ ...request.definition, artifactDigest: first.scriptDigest });
    expect(first.runtimeArtifacts).toHaveLength(1);
    expect(first.runtimeArtifactDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(first.identity).toMatchObject({ logicalInvocationId: "request-1", deploymentDigest: expect.stringMatching(/^sha256:[0-9a-f]{64}$/), subjectBasis: expect.stringMatching(/^sha256:[0-9a-f]{64}$/) });
    expect("nativeRef" in first.identity).toBe(false);
    expect(verifyInvocationIdentity(first, request)).toBe(first.identity);
    expect(captureInvocationIdentity({ ...request, logicalInvocationId: "request-2" }).identity.deploymentDigest).toBe(first.identity.deploymentDigest);
    expect(captureInvocationIdentity({ ...request, logicalInvocationId: "request-2" }).identity.logicalInvocationId).not.toBe(first.identity.logicalInvocationId);
  });

  it.each([
    ["script", (r: ReturnType<typeof fixture>) => { writeFileSync(r.scriptPath, "export default () => 2;\n"); }],
    ["configuration", (r: ReturnType<typeof fixture>) => { r.request.effectiveConfig.model = "changed"; }],
    ["host ABI", (r: ReturnType<typeof fixture>) => { r.request.hostAbi.version = "changed"; }],
    ["contract", (r: ReturnType<typeof fixture>) => { r.request.providerDescriptors[0].contractSource = "new-provider-version"; }],
    ["principal", (r: ReturnType<typeof fixture>) => { r.request.principal.subject = "user-B"; }],
    ["workspace source", (r: ReturnType<typeof fixture>) => { r.request.workspace.sourceBasis = "sha256:source-b"; }],
    ["logical request", (r: ReturnType<typeof fixture>) => { r.request.logicalInvocationId = "request-2"; }],
  ])("fails closed after changed %s under the pinned invocation", (_name, change) => {
    const f = fixture();
    const pin = captureInvocationIdentity(f.request);
    change(f);
    expect(() => verifyInvocationIdentity(pin, f.request)).toThrow(IdentityConflictError);
  });

  it("never treats a mutable workspace path as an immutable source basis", () => {
    const f = fixture();
    const pin = captureInvocationIdentity(f.request);
    expect(pin.identity.subjectBasis).not.toContain(f.workspace);
    const changed = { ...f.request, workspace: { ...f.request.workspace, sourceBasis: "" } };
    expect(() => captureInvocationIdentity(changed)).toThrow();
    expect(() => verifyInvocationIdentity(pin, changed)).toThrow();
  });

  it("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", PACKAGE_COPY_ROW, () => {
    budgeted("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction", () => {
    const f = fixture();
    const root = join(f.workspace, "package");
    mkdirSync(root);
    cpSync(join(packageRoot, "package.json"), join(root, "package.json"));
    cpSync(join(packageRoot, "package-lock.json"), join(root, "package-lock.json"));
    cpSync(join(packageRoot, "vendor"), join(root, "vendor"), { recursive: true });
    mkdirSync(join(root, "node_modules/@forge/sdk/dist"), { recursive: true });
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 1;\n");
    writeFileSync(join(root, "host.js"), "trusted host implementation");
    const request = { ...f.request, packageRoot: root, hostArtifacts: ["host.js"], runtimeArtifacts: [join(root, "node_modules/@forge/sdk/dist/index.js")] };
    const pin = captureInvocationIdentity(request);
    expect(pin.dependencyArtifacts.map(item => item.path)).toContain("package.json");
    expect(pin.dependencyArtifacts.map(item => item.path)).toContain("package-lock.json");
    expect(pin.dependencyArtifacts.some(item => item.path === "vendor/forge-sdk-0.1.0.tgz")).toBe(true);
    verifyInvocationIdentity(pin, request);
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 2;\n");
    expect(() => verifyInvocationIdentity(pin, request)).toThrow(IdentityConflictError);
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 1;\n");
    writeFileSync(join(root, "host.js"), "changed host implementation");
    expect(() => verifyInvocationIdentity(pin, request)).toThrow(IdentityConflictError);
    mkdirSync(join(root, "node_modules/@forge/sdk/dist"), { recursive: true });
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 1;\n");
    writeFileSync(join(root, "host.js"), "trusted host implementation");
    writeFileSync(join(root, "vendor/forge-sdk-0.1.0.tgz"), "tampered artifact");
    expect(() => verifyInvocationIdentity(pin, request)).toThrow();
    });
  });

  it("pins hoisted runtime artifacts outside the extension package root", () => {
    const f = fixture();
    const external = mkdtempSync(join(tmpdir(), "hoisted-sdk-"));
    dirs.push(external);
    const file = join(external, "sdk.mjs");
    writeFileSync(file, "export const version = 1;\n");
    const request = { ...f.request, runtimeArtifacts: [file] };
    const pin = captureInvocationIdentity(request);
    expect(pin.runtimeArtifacts).toEqual([{ path: file, digest: `sha256:${createHash("sha256").update(readFileSync(file)).digest("hex")}` }]);
    writeFileSync(file, "export const version = 2;\n");
    expect(() => verifyInvocationIdentity(pin, request)).toThrow(IdentityConflictError);
  });

  it("bounds script snapshots so verification never silently compares an unbounded payload", () => {
    const f = fixture();
    writeFileSync(f.scriptPath, "x".repeat(1024 * 1024 + 1));
    expect(() => captureInvocationIdentity(f.request)).toThrow(IdentityConflictError);
  });

  it("uses the shipped dependency lock only when npm has excluded package-lock.json", PACKAGE_COPY_ROW, () => {
    budgeted("uses the shipped dependency lock only when npm has excluded package-lock.json", () => {
    const f = fixture();
    const root = join(f.workspace, "installed-package");
    mkdirSync(root);
    mkdirSync(join(root, "vendor"));
    cpSync(join(packageRoot, "package.json"), join(root, "package.json"));
    cpSync(join(packageRoot, "vendor/dependency-lock.json"), join(root, "vendor/dependency-lock.json"));
    for (const name of ["forge-sdk-0.1.0.tgz", "furnace-sdk-0.1.0.tgz", "hyperunix-sdk-0.1.0.tgz"]) {
      cpSync(join(packageRoot, "vendor", name), join(root, "vendor", name));
    }
    mkdirSync(join(root, "node_modules/@forge/sdk/dist"), { recursive: true });
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 1;\n");
    writeFileSync(join(root, "host.js"), "trusted host implementation");
    const request = { ...f.request, packageRoot: root, hostArtifacts: ["host.js"], runtimeArtifacts: [join(root, "node_modules/@forge/sdk/dist/index.js")] };
    const pin = captureInvocationIdentity(request);
    expect(pin.dependencyArtifacts.map(item => item.path)).toContain("vendor/dependency-lock.json");
    expect(pin.dependencyArtifacts.map(item => item.path)).not.toContain("package-lock.json");
    verifyInvocationIdentity(pin, request);
    writeFileSync(join(root, "vendor/dependency-lock.json"), "{}");
    expect(() => verifyInvocationIdentity(pin, request)).toThrow(IdentityConflictError);
    rmSync(join(root, "vendor/dependency-lock.json"));
    expect(() => captureInvocationIdentity(request)).toThrow(IdentityConflictError);
    });
  });

  it("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", PACKAGE_COPY_ROW, () => {
    budgeted("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", () => {
    const f = fixture();
    const root = join(f.workspace, "package");
    mkdirSync(root);
    cpSync(join(packageRoot, "package.json"), join(root, "package.json"));
    cpSync(join(packageRoot, "package-lock.json"), join(root, "package-lock.json"));
    cpSync(join(packageRoot, "vendor"), join(root, "vendor"), { recursive: true });
    mkdirSync(join(root, "node_modules/@forge/sdk/dist"), { recursive: true });
    writeFileSync(join(root, "node_modules/@forge/sdk/dist/index.js"), "export const sdk = 1;\n");
    writeFileSync(join(root, "host.js"), "trusted host implementation");
    const request = { ...f.request, packageRoot: root, hostArtifacts: ["host.js"], runtimeArtifacts: [join(root, "node_modules/@forge/sdk/dist/index.js")] };
    const pin = captureInvocationIdentity(request);
    const lock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
    lock.packages["node_modules/nanoid"].integrity = "sha512-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
    writeFileSync(join(root, "package-lock.json"), JSON.stringify(lock));
    expect(() => verifyInvocationIdentity(pin, request)).toThrow(IdentityConflictError);
    writeFileSync(join(root, "package-lock.json"), readFileSync(join(packageRoot, "package-lock.json")));
    const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    manifest.dependencies.nanoid = "0.0.1";
    writeFileSync(join(root, "package.json"), JSON.stringify(manifest));
    expect(() => captureInvocationIdentity(request)).toThrow();
    });
  });

  it("refuses absent/invalid caller, ABI and descriptor instead of producing a digest from partial input", () => {
    const f = fixture();
    expect(() => captureInvocationIdentity({ ...f.request, runtimeArtifacts: [] })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, runtimeArtifacts: [f.workspace] })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, runtimeArtifacts: ["relative/sdk.js"] })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, runtimeArtifacts: [f.request.runtimeArtifacts[0], f.request.runtimeArtifacts[0]] })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, principal: { ...f.request.principal, subject: "" } })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, hostAbi: { ...f.request.hostAbi, interfaceVersion: "" } })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, providerDescriptors: [{ ...f.request.providerDescriptors[0], contractSource: "" }] })).toThrow();
    expect(() => captureInvocationIdentity({ ...f.request, providerDescriptors: [f.request.providerDescriptors[0], f.request.providerDescriptors[0]] })).toThrow();
  });

  it("wb-hk9l: every package-copy row runs under the explicit file-local budget, none rides the 5000 ms default", ({ task }) => {
    const registered: { title: string; timeout: number; concurrent: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ title: child.name, timeout: child.timeout, concurrent: child.concurrent === true });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.filter(row => row.concurrent).map(row => row.title), "no row is concurrent: the copy window is one row's at a time").toEqual([]);
    const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
    // v7: the file-end judge is the file's ONLY afterAll registration, so no afterAll can be registered before it (and run after it).
    // The needle is assembled so this row's own source never matches it.
    const registration = ["after", "All("].join("");
    expect(text.split(registration).length - 1, "exactly one afterAll registration in this file: the file-end judge").toBe(1);
    expect(text.indexOf(`${registration}judgeFileEnd)`), "that one registration is the file-end judge").toBeGreaterThan(0);
    // v8: every vitest binding is imported once, by its own name, from a single static import, so no hook API can hide behind an alias.
    const self = ts.createSourceFile("self.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const vitestImports = self.statements.filter((node): node is ts.ImportDeclaration => ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier) && node.moduleSpecifier.text === "vitest");
    expect(vitestImports, "exactly one static vitest import").toHaveLength(1);
    const clause = vitestImports[0]?.importClause;
    expect(clause?.name, "no default vitest import").toBeUndefined();
    expect(clause?.namedBindings !== undefined && ts.isNamedImports(clause.namedBindings), "named vitest bindings only, no namespace import").toBe(true);
    const aliased = clause?.namedBindings !== undefined && ts.isNamedImports(clause.namedBindings) ? clause.namedBindings.elements.filter(element => element.propertyName !== undefined).map(element => element.name.text) : ["<no named bindings>"];
    expect(aliased, "no vitest binding is aliased").toEqual([]);
    const dynamicVitest: string[] = [];
    const findDynamicVitest = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
        const [specifier] = node.arguments;
        if (specifier !== undefined && ts.isStringLiteralLike(specifier) && specifier.text === "vitest") dynamicVitest.push(`${self.getLineAndCharacterOfPosition(node.getStart(self)).line + 1}`);
      }
      ts.forEachChild(node, findDynamicVitest);
    };
    findDynamicVitest(self);
    expect(dynamicVitest, "no dynamic import() or require() of vitest (lines)").toEqual([]);
    // v10: every budgeted title is registered once, inside this suite, as it(title, PACKAGE_COPY_ROW, <literal function>) whose FIRST
    // statement is budgeted(<same title literal>, <literal function>) - the only budgeted(...) calls in the file (a call anywhere else,
    // in a hook, a helper, a nested closure or a later statement, is a stray) - so the window is the row's own first act and nothing
    // else can open one. The literal test function is what report-mode censuses resolve.
    const shapedRows: string[] = [];
    const bareBudgeted: string[] = [];
    const allowedFactoryCalls = new Set<ts.Node>();
    const isFn = (node: ts.Node | undefined): node is ts.ArrowFunction | ts.FunctionExpression => node !== undefined && (ts.isArrowFunction(node) || ts.isFunctionExpression(node));
    const firstFactoryCall = (fn: ts.ArrowFunction | ts.FunctionExpression, title: string): ts.CallExpression | undefined => {
      if (!ts.isBlock(fn.body)) return undefined;
      const [first] = fn.body.statements;
      let call: ts.Expression | undefined;
      if (first !== undefined && ts.isExpressionStatement(first)) call = first.expression;
      else if (first !== undefined && ts.isVariableStatement(first) && first.declarationList.declarations.length === 1) call = first.declarationList.declarations[0]?.initializer;
      if (call === undefined || !ts.isCallExpression(call) || !ts.isIdentifier(call.expression) || call.expression.text !== "budgeted") return undefined;
      const [titleArg, bodyArg] = call.arguments;
      return titleArg !== undefined && ts.isStringLiteralLike(titleArg) && titleArg.text === title && call.arguments.length === 2 && isFn(bodyArg) ? call : undefined;
    };
    const findRegistrations = (node: ts.Node, suite: string | undefined): void => {
      let inner = suite;
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const [first] = node.arguments;
        const last = node.arguments[node.arguments.length - 1];
        const line = self.getLineAndCharacterOfPosition(node.getStart(self)).line + 1;
        if (node.expression.text === "describe" && first !== undefined && ts.isIdentifier(first) && first.text === "PACKAGE_COPY_SUITE") inner = PACKAGE_COPY_SUITE;
        if ((node.expression.text === "it" || node.expression.text === "test") && first !== undefined && ts.isStringLiteralLike(first) && PACKAGE_COPY_ROWS.includes(first.text)) {
          const budgetArg = node.arguments.length === 3 && ts.isIdentifier(node.arguments[1]) && node.arguments[1].text === "PACKAGE_COPY_ROW";
          const call = isFn(last) ? firstFactoryCall(last, first.text) : undefined;
          if (call !== undefined && budgetArg && inner === PACKAGE_COPY_SUITE) { shapedRows.push(first.text); allowedFactoryCalls.add(call); }
          else bareBudgeted.push(`${first.text} @ line ${line}`);
        }
      }
      ts.forEachChild(node, child => findRegistrations(child, inner));
    };
    findRegistrations(self, undefined);
    const strayFactoryCalls: number[] = [];
    const findStrays = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "budgeted" && !allowedFactoryCalls.has(node)) strayFactoryCalls.push(self.getLineAndCharacterOfPosition(node.getStart(self)).line + 1);
      ts.forEachChild(node, findStrays);
    };
    findStrays(self);
    expect(shapedRows, "each roster row is registered once, inside PACKAGE_COPY_SUITE, as it(title, PACKAGE_COPY_ROW, fn) whose first statement is budgeted(title, body)").toEqual(PACKAGE_COPY_ROWS);
    expect(bareBudgeted, "no budgeted title is registered any other way").toEqual([]);
    expect(strayFactoryCalls, "budgeted(...) is called nowhere but as a budgeted row's first statement (lines)").toEqual([]);
    expect(emitState.sidecar.endsWith(join(".forge", "hk9l-copy-violations.jsonl")), "the violation sidecar lives under .forge for the census tier").toBe(true);
    expect(HOOK_ORDER.slice(0, 2), "after-hooks run in reverse registration order (vitest sequence.hooks stack), so the first-registered afterAll runs last").toEqual(["second-registered", "first-registered"]);
    const scanned = scanRows(text);
    expect(scanned.map(row => row.title), "the source scan classifies every registered row").toEqual(registered.map(row => row.title));
    expect(registered.filter(row => row.timeout === PACKAGE_COPY_ROW_BUDGET_MS).map(row => row.title), "the rows the runner runs under PACKAGE_COPY_ROW_BUDGET_MS").toEqual(PACKAGE_COPY_ROWS);
    expect(scanned.filter(row => row.copies).map(row => row.title), "the rows whose registration reaches a copy").toEqual(PACKAGE_COPY_ROWS);
    // v6 U2: the budget list and its suite are anchored OUT OF FILE, so deleting a budgeted row together with its entry reds here.
    const roster = JSON.parse(readFileSync(new URL("./fixtures/hk9l-scan-roster.json", import.meta.url), "utf8")) as { packageCopySuite: string; packageCopyRows: string[] };
    expect({ suite: PACKAGE_COPY_SUITE, rows: PACKAGE_COPY_ROWS }, "the budget list and its suite, anchored in the roster fixture").toEqual({ suite: roster.packageCopySuite, rows: roster.packageCopyRows });
    expect(task.suite?.name, "the budgeted rows live in the anchored suite, the only chain prefix the judge admits").toBe(PACKAGE_COPY_SUITE);
    expect([...emitState.allowedChains].sort(), "the judge admits exactly the anchored chains").toEqual(roster.packageCopyRows.map(row => `${roster.packageCopySuite} > ${row}`).sort());
    expect(PACKAGE_COPY_ROW_BUDGET_MS, "the owner floor").toBeGreaterThanOrEqual(20_000);
    expect(WORST_MEASURED_WALL_MS, "the worst wall of record: 50599 ms (g10-gate-s4 probe d7ae1c7)").toBeGreaterThanOrEqual(50_599);
    expect(PACKAGE_COPY_ROW_BUDGET_MS, "more than 2 x the worst wall of record").toBeGreaterThan(2 * WORST_MEASURED_WALL_MS);
  });

  it("wb-hk9l scan liveness: each copy route reads as a copy, each quiet row as quiet, and an unreadable row as its sentinel", () => {
    const readings = SCAN_WITNESSES.map(([route, source]) => `${route}: ${scanRows(source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")}`);
    expect(SCAN_WITNESSES.map(([, source]) => createHash("sha256").update(source).digest("hex").slice(0, 16)), "every witness source is frozen, not just its route and reading").toEqual(SCAN_SOURCE_DIGESTS);
    const visited = new Set<string>();
    for (const [, source] of SCAN_WITNESSES) scanRows(source, visited);
    expect([...visited].sort(), "every branch in the scanner's actual dispatch is reached by a witness").toEqual(scanDispatch());
    expect(SCAN_WITNESSES.length, "the frozen reading count").toBe(SCAN_READINGS.length);
    expect(readings, "the scan's reading of each witness").toEqual(SCAN_READINGS);
    // R656: the roster fixture is the OUT-OF-FILE anchor - no pin without a roster row and no roster row without a pin.
    const roster = JSON.parse(readFileSync(new URL("./fixtures/hk9l-scan-roster.json", import.meta.url), "utf8")) as {
      routes: { route: string; digest: string }[]; dispatch: string[]; residuals: { id: string; family: string; digest: string; reading: string }[];
    };
    expect(SCAN_WITNESSES.map(([name, source]) => `${name} | ${createHash("sha256").update(source).digest("hex").slice(0, 16)}`),
      "the roster's route list and the pinned witness set agree exactly").toEqual(roster.routes.map(row => `${row.route} | ${row.digest}`));
    expect([...new Set(scanDispatch())].sort(), "the scanner's live dispatch vocabulary equals the roster's dispatch list").toEqual(roster.dispatch);
  });
  it("wb-hk9l shipped-lock route: the source's packaged-lock fallback has a judged consumer row, independently of PACKAGE_COPY_ROWS", ({ task }) => {
    const implementation = readFileSync(join(packageRoot, "src/workbench/identity.ts"), "utf8");
    const shippedRoute = implementation.match(/const lockRelative = [^;]+\? "package-lock\.json" : "([^"]+)";/)?.[1];
    expect(shippedRoute, "the source of truth still supplies the packaged-lock fallback").toBe("vendor/dependency-lock.json");
    const titles: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") titles.push(child.name);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(titles.filter(title => title === "uses the shipped dependency lock only when npm has excluded package-lock.json"),
      `the production fallback ${shippedRoute} must retain its judged registration`).toHaveLength(1);
  });

  it("wb-hk9l residual R-H5: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[0];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-H5");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-MODULE: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[1];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-MODULE");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-PROCESS: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[2];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-PROCESS");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-HOOK: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[3];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-HOOK");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-SCOPE: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[4];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-SCOPE");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-PROXY: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[5];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-PROXY");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-REQUIRE: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[6];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-REQUIRE");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });
  it("wb-hk9l residual R-BUILTIN: pinned quiet reading", () => {
    const residual = SCAN_RESIDUALS[7];
    expect(residual.id, "this quiet row judges its own family, never another index").toBe("R-BUILTIN");
    expect(scanRows(residual.source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")).toBe(residual.reading);
  });


  it("wb-hk9l residual census anchor: the roster fixture's residual list and the registered residual rows match SCAN_RESIDUALS exactly, in order", ({ task }) => {
    const roster = JSON.parse(readFileSync(new URL("./fixtures/hk9l-scan-roster.json", import.meta.url), "utf8")) as {
      residuals: { id: string; family: string; digest: string; reading: string; runtime: string }[];
    };
    expect(SCAN_RESIDUALS.map(row => `${row.id}|${row.family}|${createHash("sha256").update(row.source).digest("hex")}|${row.reading}|${row.runtime}`),
      "the residual table (static reading and runtime reading) is anchored out of file, in order").toEqual(roster.residuals.map(row => `${row.id}|${row.family}|${row.digest}|${row.reading}|${row.runtime}`));
    expect(roster.residuals, "the anchored residual count").toHaveLength(8);
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(child.name);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const residualRows = registered.filter(name => /^wb-hk9l residual R-\S+: pinned quiet reading$/.test(name));
    expect(residualRows, "the registered residual rows, exactly and in table order, nothing extra").toEqual(
      SCAN_RESIDUALS.map(row => `wb-hk9l residual ${row.id}: pinned quiet reading`));
  });

  it("wrap liveness: every judged copy surface emits from this row once", PACKAGE_COPY_ROW, async () => {
    // v10: every S-call is MADE inside the synchronous window (the judge observes at the call); the promise-returning
    // surfaces settle after the window closes, where nothing can interleave with it.
    const pending = budgeted("wrap liveness: every judged copy surface emits from this row once", () => {

      const scratch = fixture().workspace;
      const src = join(scratch, "a.json");
      writeFileSync(src, "{}\n");
      cpSync(src, join(scratch, "b1.json"));
      copyFileSync(src, join(scratch, "b2.json"));
      const settling: Promise<void>[] = [
        new Promise<void>((done, fail) => { cp(src, join(scratch, "b3.json"), error => (error ? fail(error) : done())); }),
        new Promise<void>((done, fail) => { copyFile(src, join(scratch, "b4.json"), error => (error ? fail(error) : done())); }),
        cpPromise(src, join(scratch, "b5.json")),
        copyFilePromise(src, join(scratch, "b6.json")),
      ];
      fsDefault.cpSync(src, join(scratch, "b7.json"));
      settling.push(fsDefault.promises.copyFile(src, join(scratch, "b8.json")), fspDefault.cp(src, join(scratch, "b9.json")));
      return settling;
    });
    await Promise.all(pending);
    // v6 U2: every surface member of S carries the judge's mark, and each default spelling IS the named judged function.
    const markOf = (fn: unknown): unknown => (fn as Record<symbol, unknown>)[emitState.mark];
    expect([cp, cpSync, copyFile, copyFileSync].map(markOf), "node:fs named exports are judged").toEqual(["cp", "cpSync", "copyFile", "copyFileSync"]);
    expect([fsDefault.cp, fsDefault.cpSync, fsDefault.copyFile, fsDefault.copyFileSync].map(markOf), "the node:fs default export is judged").toEqual(["cp", "cpSync", "copyFile", "copyFileSync"]);
    for (const [named, viaDefault] of [[cp, fsDefault.cp], [cpSync, fsDefault.cpSync], [copyFile, fsDefault.copyFile], [copyFileSync, fsDefault.copyFileSync]] as const) {
      expect(viaDefault, "named and default spellings are one judged function").toBe(named);
    }
    expect([fsPromisesMember.cp, fsPromisesMember.copyFile, fsDefault.promises.cp, fsDefault.promises.copyFile].map(markOf), "the fs.promises member is judged, named and via the default export").toEqual(["promises.cp", "promises.copyFile", "promises.cp", "promises.copyFile"]);
    expect([cpPromise, copyFilePromise, fspDefault.cp, fspDefault.copyFile].map(markOf), "node:fs/promises named and default exports are judged").toEqual(["promises.cp", "promises.copyFile", "promises.cp", "promises.copyFile"]);
    expect(fspDefault.cp, "node:fs/promises default and named are one judged function").toBe(cpPromise);
    const mine = emitState.observed.filter(entry => entry.row === "wrap liveness: every judged copy surface emits from this row once");
    expect([...new Set(mine.map(entry => entry.call))].sort(), "every wrapped surface really routes through the judge: a dropped wrap reds here, deterministically").toEqual(
      ["copyFile", "copyFileSync", "cp", "cpSync", "promises.copyFile", "promises.cp"].sort());
    expect(mine.every(entry => entry.admitted), "this row's copies ran inside its own copy window").toBe(true);
  });
  it("wb-hk9l registered leaf titles are unique, so no row can wear a budgeted title it does not own", ({ task }) => {
    const titles: string[] = [];
    const chains: string[] = [];
    const walk = (tasks: typeof task.file.tasks, prefix: readonly string[]): void => {
      for (const child of tasks) {
        if (child.type === "test") {
          titles.push(child.name);
          chains.push([...prefix, child.name].join(" > "));
        } else if (child.type === "suite") walk(child.tasks, [...prefix, child.name]);
      }
    };
    walk(task.file.tasks, []);
    const duplicatesOf = (names: readonly string[]): string[] => {
      const seen = new Map<string, number>();
      for (const name of names) seen.set(name, (seen.get(name) ?? 0) + 1);
      return [...seen.entries()].filter(([, count]) => count > 1).map(([name]) => name);
    };
    expect(duplicatesOf(titles), "a duplicate leaf title lets an unbudgeted row inherit a budgeted attribution").toEqual([]);
    expect(duplicatesOf(chains), "a duplicate full chain is the one collision the call-time judge cannot tell apart").toEqual([]);
    // v6 U1: the judge keys on the full chain, so a budgeted leaf under another suite is a different, refused chain.
    for (const chain of chains) {
      const leaf = chain.split(" > ").pop() ?? chain;
      if (PACKAGE_COPY_ROWS.includes(leaf)) expect(chain, "every budgeted leaf sits under the anchored suite").toBe(`${PACKAGE_COPY_SUITE} > ${leaf}`);
    }
  });
  /** The budget judge: no S-call ever ran outside a copy window, every budgeted row really copied inside its own window, and nothing else was ever admitted. */
  const judgeObservedCopyRows = (): void => {
    expect(emitState.violations(), "every S-call in this file ran inside an open copy window").toEqual([]);
    const admitted = emitState.observed.filter(entry => entry.admitted);
    expect([...new Set(admitted.map(entry => entry.row))].sort(), "runtime-observed copy rows over the judged surface set: exactly the budgeted PACKAGE_COPY_ROWS, each having copied inside its own window")
      .toEqual([...PACKAGE_COPY_ROWS].sort());
    expect([...new Set(admitted.map(entry => entry.chain))].sort(), "every admitted chain is an anchored chain").toEqual([...emitState.allowedChains].sort());
  };
  it("wb-hk9l emit census: the rows observed really copying are exactly the budgeted PACKAGE_COPY_ROWS", () => {
    // The budget row takes the test context, which the census tier's report mode cannot pin; this row (pinned there) asserts
    // from this file's own AST that the budget row is registered exactly once in this suite, so deleting it reds a pinned row.
    const source = ts.createSourceFile("self.ts", readFileSync(fileURLToPath(import.meta.url), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const budgetRows: number[] = [];
    const findBudgetRow = (node: ts.Node, suite: string | undefined): void => {
      let inner = suite;
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const [title] = node.arguments;
        if (node.expression.text === "describe" && title !== undefined && ts.isIdentifier(title) && title.text === "PACKAGE_COPY_SUITE") inner = PACKAGE_COPY_SUITE;
        if (TEST_APIS.has(node.expression.text) && title !== undefined && ts.isStringLiteralLike(title) && title.text.startsWith("wb-hk9l: every package-copy row runs under the explicit file-local budget") && inner === PACKAGE_COPY_SUITE) budgetRows.push(source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
      }
      ts.forEachChild(node, child => findBudgetRow(child, inner));
    };
    findBudgetRow(source, undefined);
    expect(budgetRows, "the budget row is registered exactly once inside PACKAGE_COPY_SUITE (line)").toHaveLength(1);
    // v11 (refusal #14 U1): the census leg is pinned from here FIRST by its exact bytes - the sha256 digest literal below - so
    // deleting, renaming or NEUTERING any census row (a one-token lines.slice(0, 0), a shadowed accept-all judge, a re-pointed
    // sidecar), with or without a matching roster edit, reds this pinned row in the test tier before the leg even runs. The
    // structural pins that follow (roster-anchored row set, sidecar/judge substrings, the judge(REPORT, PINS) AST call) stay as
    // readable diagnostics; the digest is the binding pin.
    const roster = JSON.parse(readFileSync(new URL("./fixtures/hk9l-scan-roster.json", import.meta.url), "utf8")) as { emitRowTitle: string; censusRows: string[]; censusSidecarRow: string; censusJudgeRow: string };
    expect(roster.emitRowTitle, "this row's title is the roster's emitRowTitle (the census leg pins it by that name)").toBe("wb-hk9l emit census: the rows observed really copying are exactly the budgeted PACKAGE_COPY_ROWS");
    const censusText = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "workbench-hk9l-copy-window.census.ts"), "utf8");
    expect(createHash("sha256").update(censusText).digest("hex"), "the census leg's exact bytes, digest-pinned (sha256): any census edit reds here first").toBe("924d9e8f3b7f4b7d24927546ef004c6d324c570726a42daa33c907c0a474ccb9");
    const census = ts.createSourceFile("census.ts", censusText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const censusRows: { title: string; text: string }[] = [];
    const collectCensus = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && (node.expression.text === "it" || node.expression.text === "test")) {
        const [first] = node.arguments;
        censusRows.push({ title: first !== undefined && ts.isStringLiteralLike(first) ? first.text : NON_LITERAL_TITLE, text: node.getText(census) });
      }
      ts.forEachChild(node, collectCensus);
    };
    collectCensus(census);
    expect(censusRows.map(row => row.title), "the census leg registers exactly the roster's censusRows, in order").toEqual(roster.censusRows);
    const sidecarRow = censusRows.find(row => row.title === roster.censusSidecarRow);
    expect(sidecarRow?.text.includes("existsSync(SIDECAR)") === true && sidecarRow.text.includes("readFileSync(SIDECAR") && sidecarRow.text.includes(".toEqual([])"), "the census sidecar row exists, reads SIDECAR and asserts it empty").toBe(true);
    expect([censusText.includes(`"${basename(emitState.sidecar)}"`), censusText.includes("hk9l-scan-roster.json"), censusText.includes("const PINS: readonly CasePin[] = [...roster.packageCopyRows, roster.emitRowTitle].map(pin);")], "the census leg names this run's sidecar file and builds its judge() pins from the roster: every budgeted row and this emit row, exactly that composition line").toEqual([true, true, true]);
    // The judging row must CALL judge(REPORT, PINS) (an AST call, not a mention in prose) and compare every verdict: an accept-all stand-in reds here.
    const judgeRow = censusRows.find(row => row.title === roster.censusJudgeRow);
    const judgeCalls: string[] = [];
    const findJudgeCalls = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "judge") judgeCalls.push(node.arguments.map(argument => argument.getText(census)).join(", "));
      ts.forEachChild(node, findJudgeCalls);
    };
    for (const statement of census.statements) {
      ts.forEachChild(statement, function walkRows(node: ts.Node): void {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it") {
          const [first] = node.arguments;
          if (first !== undefined && ts.isStringLiteralLike(first) && first.text === roster.censusJudgeRow) findJudgeCalls(node);
        }
        ts.forEachChild(node, walkRows);
      });
    }
    expect(judgeRow?.text.includes("verdict.ok") === true && judgeRow.text.includes("verdict.cases"), "the census judging row exists and compares each verdict's ok and cases").toBe(true);
    expect(judgeCalls, "the census judging row calls judge(REPORT, PINS) exactly once").toEqual(["REPORT, PINS"]);
    judgeObservedCopyRows();
  });

  it("wb-hk9l residual shape: each named family's quiet page and reading is frozen", () => {
    expect(SCAN_RESIDUALS.map(row => `${row.id}|${row.family}|${row.reading}|${row.runtime}|${createHash("sha256").update(row.source).digest("hex")}`)).toEqual([
      "R-H5|read/write composition|row quiet|invisible: no S-call, the bytes move by read and write|37e662375a3fe1399fc0dc95f9d9232aa058553112f7cabb7ff78afc75d4fd44",
      "R-MODULE|other-module helper|row quiet|observed as a violation when the helper copies through S outside a copy window (in-process judges + sidecar); invisible when it re-implements the copy without S|7b1094cf6f38f1bf063069022eec44a6e79829d95a623759b8654cd3f9541330",
      "R-PROCESS|subprocess copy|row quiet|invisible: the copy runs in another process|5ce5ee0561776868771e83048ddb13718df85f4b03315e96bdd274c8b6be2f08",
      "R-HOOK|hook copy|row quiet|observed as a violation: an S-call in a hook of any kind (before/after/around each/all, cleanups) runs with no copy window open and cannot interleave with one (every window is synchronous), so the row at that boundary, the file end or the census tier reds|d4ea304260e90543ce46289eeb8b61d919cf47fd31098b933cea553bc3a98117",
      "R-SCOPE|module-scope copy|row quiet|observed as a violation: an S-call at module scope runs with no copy window open, so the first row reds and the sidecar records it|ba574260adf4ee02ad948307b8d00101806d0e3d2cf7158e82c0bf9ca7252885",
      "R-PROXY|identity hashing proxy|row quiet|invisible: captureInvocationIdentity hashes by read and makes no S-call (the budgeted rows copy test-side)|c694895e6b2fdad18a9c99bdc716ce2e4fde4f0dcd2264674c6af621dc9f3b39",
      "R-REQUIRE|createRequire requisition|row quiet|invisible: createRequire returns the unmocked builtin|adfce552cca2b038904b4b85d00ac638d24a787351203098ff427b73170e6622",
      "R-BUILTIN|getBuiltinModule requisition|row quiet|invisible: getBuiltinModule returns the unmocked builtin|1cd588866aa92cffde0b4b5e798b870fb253ef1780f1689f22f9735c978669bd",
    ]);
  });

});
