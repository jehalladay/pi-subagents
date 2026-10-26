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
 * The judged set is read from the test directory and the config, never typed here. The members importing the marked
 * twins (the two suites that drive real hosts, and the helper's own unit rows) are pinned, so a derivation that reads
 * nothing, or a member that leaves the twins, reds.
 * NAMED RESIDUALS (not detected): a wait loop built on holdOpen or on an awaited read with no delay; a host call
 * reached through a re-export or through the Pi tool (a tool reply's lapse text is marked by the member's reply parser,
 * jsonReply in the socket-base suite, not here); and test/workbench-detached-control-live.test.ts. That last suite is
 * excluded from the default gate and runs only as `forge run detached-control-live`: its until() bound is a
 * receipt-recorded measurement (journeys.*.realised = until().ok), and no landing judge reads its reds.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
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

/** One member's text read as a syntax tree: every G1-G3 finding, and the marked twins it imports. */
function readText(name: string, text: string): Reading {
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: Finding[] = [];
  const twins: string[] = [];
  const at = (node: ts.Node): string => `${name}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
  const add = (rule: Finding["rule"], node: ts.Node, text: string): void => {
    found.push({ rule, at: at(node), text });
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
    if (ts.isForStatement(node) && node.condition !== undefined && conjunction(node.condition) && fixedBound(node.condition)) {
      add("G3", node, `fixed-count poll loop: for (...; ${node.condition.getText(source)}; ...)`);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "afterEach" && node.arguments[0] !== undefined && calls(node.arguments[0], "kill")) {
      const timeout = node.arguments[1];
      if (timeout === undefined || !ts.isIdentifier(timeout) || timeout.text !== "HOST_HOOK_TIMEOUT_MS") add("G4", node, "a hook that stops hosts runs without HOST_HOOK_TIMEOUT_MS");
      if (!calls(node.arguments[0], "reportAfterCleanup")) add("G4", node, "a hook that stops hosts settles its waits without reportAfterCleanup");
    }
    const loopCondition = ts.isForStatement(node) ? node.condition : ts.isWhileStatement(node) || ts.isDoStatement(node) ? node.expression : undefined;
    if (loopCondition !== undefined && readsClock(loopCondition)) add("G3", node, `clock-deadline poll loop: ${loopCondition.getText(source)}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { findings: found, twins: [...new Set(twins)].sort() };
}

const readings = new Map(judged.map(name => [name, readText(name, readFileSync(join(ROOT, "test", name), "utf8"))] as const));
const shown = (list: readonly Finding[]): string => list.map(finding => `${finding.rule} ${finding.at} ${finding.text}`).join("\n") || "(none)";

describe("wb-maza: the detached-* family keeps its strict timing markers (owner R721, R723)", () => {
  it("judges every default-gate member of the family, read from the test directory and vitest.config.ts", () => {
    expect(family.length, "the family glob matched no suite").toBeGreaterThan(0);
    // The one member the default gate excludes runs only as its own forge command (vitest.detached-control-live.config.ts).
    expect(family.filter(name => !judged.includes(name))).toEqual(["workbench-detached-control-live.test.ts"]);
    expect(judged.length).toBe(family.length - 1);
  });

  it("pins the members that import the marked twins: the two suites that drive real hosts, and the helper's own unit rows", () => {
    const importers = [...readings].filter(([, reading]) => reading.twins.length > 0).map(([name, reading]) => `${name}:${reading.twins.join("+")}`);
    expect(importers).toEqual([
      "workbench-detached-child-environ.test.ts:launchDetachedMarked",
      "workbench-detached-hostile-child.test.ts:connectDetachedMarked+launchDetachedMarked",
      "workbench-detached-socket-base.test.ts:connectDetachedMarked+launchDetachedMarked",
      "workbench-detached-timing.test.ts:connectDetachedMarked+launchDetachedMarked",
    ]);
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
});
