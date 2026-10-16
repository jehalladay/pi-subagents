/**
 * wb-cax.27 (W22): docs/workbench/16 "Compatibility feature control" census.
 *
 * Binds the six bullets of that section (quoted verbatim below and re-read from the doc on every
 * run) to EXISTING cases by file, verbatim it/describe title and docs/14 truth label. The census
 * never executes a pinned case and never imports another test file: it PARSES each pinned file
 * with the TypeScript compiler API (comments are not code) and resolves what the vitest runner
 * would register, for the runner's verified export surface (vitest 4.1.10: it/test/describe/suite,
 * their modifiers, options objects, ctx.skip, .each/.for tables), including import aliases.
 *
 * A pin is lost, and its row named, when the case is renamed or deleted, when it or any enclosing
 * describe carries a skip/todo/fails/skipIf/runIf modifier or an options-object skip/todo, when
 * it registers only conditionally (if, loop, ternary, &&, helper function), when its .each/.for
 * table is empty or unverifiable, when its body skips itself (ctx.skip) or returns before any
 * expectation is reached (the third leg: a case that cannot fail is not a pin), or when the file
 * no longer runs in the default test gate (tier truth). A text-level focused-test check is deliberately
 * absent: the complete gate owns focused tests through allowOnly:false in vitest.config.ts.
 *
 * A row with no case is UNPINNED with a written reason and never passes as pinned. The dual-mode
 * verdict is COMPUTED from each case's backend configuration (workflowAgentBackend literals in
 * the case, its enclosing hooks and tables, and the file-level helpers it calls); a case whose
 * configuration is not visible in that text is "unconfigured" unless its declared mode carries a
 * written basis, and a disclosed mode never counts toward a dual-mode verdict. B6 is never
 * satisfied by a single-mode case.
 *
 * Pin-flip oracles (in flight, never widened here): wb-cax.7 (B6 dual-backend golden),
 * wb-a2g.11 (B2 degradation). wb-cax.11 landed: B4.1 and B4.2 pin its cases. When an oracle
 * lands, its row flips from unpinned / single-mode to a pinned dual-mode row in the same commit.
 *
 * Standing statements: wb-era's source-hygiene grep ran over my files and returned nothing; no
 * raw invisible code point appears in this file (the corpus builds none).
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import vitestConfig from "../vitest.config.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TESTS = join(ROOT, "test");

/** The docs/14 "Truth labels and release gates" vocabulary. */
const TRUTH_LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"] as const;
type TruthLabel = (typeof TRUTH_LABELS)[number];

/** "unconfigured": the case sets no backend, so it proves neither mode. */
type Mode = "pi" | "claude" | "both" | "unconfigured";
type CallKind = "it" | "describe";

interface PinnedCase {
  readonly file: string;
  readonly kind: CallKind;
  readonly title: string;
  readonly mode: Mode;
  /** Required when `mode` is declared although the case text shows no backend configuration. */
  readonly modeBasis?: string;
}

interface Row {
  readonly id: string;
  readonly bullet: number;
  readonly claim: string;
  /** Present on a pinned row. */
  readonly label?: TruthLabel;
  readonly cases: readonly PinnedCase[];
  /** Present on an unpinned row: why no case binds it. */
  readonly unpinned?: string;
  /** Present on a row whose cases do not prove the dual-mode claim: the mode they do not cover. */
  readonly missingMode?: string;
}

const BULLETS: readonly string[] = [
  'Explicit backend configuration: workflowAgentBackend = "claude" for Workbench mode; existing upstream default behavior preserved until migration is validated.',
  "Never silently choose Pi backend after Claude SDK failure. If a legacy Pi path remains enabled, it must be explicitly selected/labeled.",
  "Maintain existing Workflow/SubagentWorkflow collision detection and dialog/menu semantics.",
  "Preserve original config migration and saved-workflow file precedence.",
  'Ensure older journal format remains readable when supported, but does not become unsafe reuse for effectful calls; compatibility may require explicit "journal unsupported" warnings.',
  "Tests must run in both upstream/Pi and new/Claude workbench modes until a documented deprecation is approved.",
];

const ROWS: readonly Row[] = [
  {
    id: "B1.1",
    bullet: 1,
    claim: 'workflowAgentBackend = "claude" is an explicit selection, validated, never implied',
    label: "fixture pass",
    cases: [
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L4: Workbench backend is explicit and invalid config is rejected, not silently Pi", mode: "claude" },
      { file: "workbench-pi-client.test.ts", kind: "it", title: "L2: an explicitly selected Claude backend launches a script through the registered Pi tool", mode: "claude" },
    ],
  },
  {
    id: "B1.2",
    bullet: 1,
    claim: "existing upstream default preserved: no Workbench tool registers without the claude backend, standard tools still do",
    label: "fixture pass",
    cases: [
      { file: "workbench-boot-isolation.test.ts", kind: "it", title: "activates and registers its standard tools without touching a native SDK", mode: "unconfigured" },
      { file: "workbench-pi-reconcile.test.ts", kind: "it", title: "registers only under the claude backend", mode: "both" },
    ],
  },
  {
    id: "B2.1",
    bullet: 2,
    claim: "a Claude SDK failure or shutdown never falls back to the Pi manager spawn path",
    label: "fixture pass",
    cases: [
      { file: "workbench-pi-streaming.test.ts", kind: "it", title: "preserves native %s failure and never falls back to manager", mode: "claude" },
      { file: "workbench-pi-streaming.test.ts", kind: "it", title: "session shutdown requests owned SDK abort and records cancellation, never Pi workflow spawn", mode: "claude" },
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported", mode: "claude" },
    ],
  },
  {
    id: "B2.2",
    bullet: 2,
    claim: "a legacy Pi path that stays enabled is explicitly selected and labeled",
    cases: [],
    unpinned:
      "no case asserts that a legacy Pi path enabled alongside the Claude backend is labeled; the explicit-selection half is B1.1 and the degradation conformance bead wb-a2g.11 is in flight, so this row stays unpinned until its landing notice",
  },
  {
    id: "B3.1",
    bullet: 3,
    claim: "Workflow/SubagentWorkflow collision detection with another extension is preserved",
    label: "fixture pass",
    cases: [
      { file: "workflow-tool.test.ts", kind: "describe", title: "collisions with another extension", mode: "unconfigured" },
      { file: "workflow-tool.test.ts", kind: "it", title: "warns when another extension already owns the tool name", mode: "unconfigured" },
    ],
  },
  {
    id: "B3.2",
    bullet: 3,
    claim: "dialog and agents-menu semantics are preserved",
    label: "fixture pass",
    cases: [
      { file: "workflow-command.test.ts", kind: "it", title: "offers the entry in the agents menu", mode: "unconfigured" },
      { file: "workflow-command.test.ts", kind: "it", title: "hides the entry when workflows are off", mode: "unconfigured" },
      { file: "workflow-dialog.test.ts", kind: "describe", title: "keys", mode: "unconfigured" },
    ],
  },
  {
    id: "B4.1",
    bullet: 4,
    claim: "original config handling is preserved: a legacy settings file loads without being rewritten and still selects upstream behavior, in every settings shape",
    label: "fixture pass",
    cases: [
      { file: "workbench-saved-precedence.test.ts", kind: "it", title: "loads the settings file without rewriting it, and a legacy file selects upstream behavior", mode: "both" },
    ],
  },
  {
    id: "B4.2",
    bullet: 4,
    claim: "saved-workflow file precedence is preserved (project over user directory, saved name precedence)",
    label: "fixture pass",
    cases: [
      { file: "workbench-saved-precedence.test.ts", kind: "it", title: "picks the identical file in all three modes for the same tree", mode: "both" },
      { file: "workflow-tool.test.ts", kind: "it", title: "falls back to the user's agent dir, and lets the project shadow it", mode: "unconfigured" },
      { file: "workbench-designer.test.ts", kind: "it", title: "catalogs saved precedence and byte-exact source with digest/cursor", mode: "unconfigured" },
      { file: "workbench-designer.test.ts", kind: "it", title: "refuses outside project script paths while supporting saved name precedence", mode: "unconfigured" },
    ],
  },
  {
    id: "B5.1",
    bullet: 5,
    claim: "an older journal format stays readable when supported",
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "classifies pre-basis agent entries readable legacy-agent, with the live-rerun-on-resume note", mode: "unconfigured" },
      { file: "workflow-journal-compat.test.ts", kind: "describe", title: "AC4: the byte-identical pre-basis journal stays fully supported", mode: "unconfigured" },
    ],
  },
  {
    id: "B5.2",
    bullet: 5,
    claim: "an older journal never becomes unsafe reuse for an effectful call",
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "refuses a recorded non-read node with the typed uncertain-effect reason, whatever its outcome or basis", mode: "unconfigured" },
      { file: "workflow-effect-replay.test.ts", kind: "it", title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect", mode: "unconfigured" },
    ],
  },
  {
    id: "B5.3",
    bullet: 5,
    claim: 'unreadable or foreign journal lines carry an explicit "journal unsupported" warning',
    label: "fixture pass",
    cases: [
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "names each skipped line with its line number and reason, and carries the explicit warning", mode: "unconfigured" },
      { file: "workflow-journal-compat.test.ts", kind: "it", title: "warns journal unsupported for another schema version, while still reporting what the reader does with the line", mode: "unconfigured" },
    ],
  },
  {
    id: "B6.1",
    bullet: 6,
    claim: "tests run in both upstream/Pi and new/Claude workbench modes",
    label: "fixture pass",
    cases: [
      { file: "workbench-host-contract.test.ts", kind: "it", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported", mode: "claude" },
      { file: "workbench-local-detached-effects.test.ts", kind: "it", title: "refuses nested workflow resolution on both backends", mode: "unconfigured" },
    ],
    missingMode:
      "upstream/Pi: no case runs the same assertions under the upstream Pi spawn path (L3 constructs the Claude host directly; the detached 'both backends' case spans deterministic and claude and configures no workflowAgentBackend, so it is unconfigured, not upstream Pi); wb-cax.7 dual-backend golden equivalence is the pin-flip oracle",
  },
];


// ---------------------------------------------------------------------------------------------
// Parse-aware scanner: what would the vitest runner register, and would it be live?
// ---------------------------------------------------------------------------------------------

interface Mod {
  readonly name: string;
  readonly args: readonly ts.Expression[];
}

interface Head {
  readonly kind: CallKind;
  readonly mods: readonly Mod[];
}

interface Registration {
  readonly kind: CallKind;
  readonly title: string | undefined;
  readonly node: ts.CallExpression;
  readonly parent: Registration | undefined;
  /** Why the registration is not live on its own or through an ancestor; undefined when live. */
  readonly dead: string | undefined;
  /** Third leg: why the callback would pass without asserting; undefined when it reaches an expectation. */
  readonly vacuous: string | undefined;
  readonly head: Head;
}

interface Analysis {
  readonly file: ts.SourceFile;
  readonly regs: readonly Registration[];
  /** File-level const/function declarations by name, for one-level table and helper resolution. */
  readonly decls: ReadonlyMap<string, ts.Node>;
}

const RUNNER_EXPORTS: ReadonlyMap<string, CallKind> = new Map([
  ["it", "it"],
  ["test", "it"],
  ["describe", "describe"],
  ["suite", "describe"],
]);

const NEUTRAL_MODS = new Set(["only", "concurrent", "sequential", "shuffle", "retry", "repeats", "timeout"]);

function unwrap(expr: ts.Expression): ts.Expression {
  let cur = expr;
  while (ts.isParenthesizedExpression(cur) || ts.isAsExpression(cur) || ts.isSatisfiesExpression(cur) || ts.isNonNullExpression(cur)) cur = cur.expression;
  return cur;
}

function importedRunners(file: ts.SourceFile): Map<string, CallKind> {
  const local = new Map<string, CallKind>();
  for (const stmt of file.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier) || stmt.moduleSpecifier.text !== "vitest") continue;
    const bindings = stmt.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const spec of bindings.elements) {
      const kind = RUNNER_EXPORTS.get((spec.propertyName ?? spec.name).text);
      if (kind) local.set(spec.name.text, kind);
    }
  }
  return local;
}

function parseHead(expr: ts.Expression, runners: ReadonlyMap<string, CallKind>): Head | undefined {
  const e = unwrap(expr);
  if (ts.isIdentifier(e)) {
    const kind = runners.get(e.text);
    return kind ? { kind, mods: [] } : undefined;
  }
  if (ts.isPropertyAccessExpression(e)) {
    const inner = parseHead(e.expression, runners);
    return inner ? { kind: inner.kind, mods: [...inner.mods, { name: e.name.text, args: [] }] } : undefined;
  }
  if (ts.isCallExpression(e) && ts.isPropertyAccessExpression(unwrap(e.expression))) {
    const access = unwrap(e.expression) as ts.PropertyAccessExpression;
    const inner = parseHead(access.expression, runners);
    return inner ? { kind: inner.kind, mods: [...inner.mods, { name: access.name.text, args: e.arguments }] } : undefined;
  }
  return undefined;
}

function topLevelDecls(file: ts.SourceFile): Map<string, ts.Node> {
  const decls = new Map<string, ts.Node>();
  for (const stmt of file.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name) decls.set(stmt.name.text, stmt);
    if (ts.isVariableStatement(stmt)) {
      for (const d of stmt.declarationList.declarations) if (ts.isIdentifier(d.name)) decls.set(d.name.text, d);
    }
  }
  return decls;
}

/** Row count of a literal table, or of a file-level const bound to one; undefined when unverifiable. */
function tableRows(arg: ts.Expression | undefined, decls: ReadonlyMap<string, ts.Node>): number | undefined {
  if (!arg) return undefined;
  const e = unwrap(arg);
  if (ts.isArrayLiteralExpression(e)) return e.elements.some(el => ts.isSpreadElement(el)) ? undefined : e.elements.length;
  if (ts.isIdentifier(e)) {
    const decl = decls.get(e.text);
    if (decl && ts.isVariableDeclaration(decl) && decl.initializer) {
      const init = unwrap(decl.initializer);
      if (ts.isArrayLiteralExpression(init)) return init.elements.some(el => ts.isSpreadElement(el)) ? undefined : init.elements.length;
    }
  }
  return undefined;
}

function isLiteral(expr: ts.Expression | undefined, kind: ts.SyntaxKind.TrueKeyword | ts.SyntaxKind.FalseKeyword): boolean {
  return expr !== undefined && unwrap(expr).kind === kind;
}

/** Why the head and the options objects of this call make it non-live; undefined when they do not. */
function ownDeadReason(head: Head, call: ts.CallExpression, decls: ReadonlyMap<string, ts.Node>, title: string | undefined): string | undefined {
  const who = `${head.kind}(${JSON.stringify(title ?? "<dynamic title>")})`;
  for (const mod of head.mods) {
    if (mod.name === "skip" || mod.name === "todo") return `${who} carries the .${mod.name} modifier`;
    if (mod.name === "fails") return `${who} carries .fails (an inverted expectation is not a pin)`;
    if (mod.name === "skipIf" && !isLiteral(mod.args[0], ts.SyntaxKind.FalseKeyword)) return `${who} carries .skipIf with a condition that is not the literal false`;
    if (mod.name === "runIf" && !isLiteral(mod.args[0], ts.SyntaxKind.TrueKeyword)) return `${who} carries .runIf with a condition that is not the literal true`;
    if (mod.name === "each" || mod.name === "for") {
      const rows = tableRows(mod.args[0], decls);
      if (rows === undefined) return `${who} iterates a .${mod.name} table the census cannot verify (not a literal or file-level const array)`;
      if (rows === 0) return `${who} iterates an empty .${mod.name} table, which registers zero cases`;
    } else if (!["skipIf", "runIf"].includes(mod.name) && !NEUTRAL_MODS.has(mod.name)) {
      return `${who} carries the unrecognised modifier .${mod.name}`;
    }
  }
  for (const arg of call.arguments.slice(1)) {
    const opts = unwrap(arg);
    if (!ts.isObjectLiteralExpression(opts)) continue;
    for (const prop of opts.properties) {
      if (!ts.isPropertyAssignment(prop) || !(ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name))) return `${who} has an options object the census cannot read (spread, computed or shorthand member)`;
      const name = prop.name.text;
      if ((name === "skip" || name === "todo" || name === "fails") && !isLiteral(prop.initializer, ts.SyntaxKind.FalseKeyword)) return `${who} has an options-object ${name} that is not the literal false`;
      if (name === "skipIf" && !isLiteral(prop.initializer, ts.SyntaxKind.FalseKeyword)) return `${who} has an options-object skipIf that is not the literal false`;
      if (name === "runIf" && !isLiteral(prop.initializer, ts.SyntaxKind.TrueKeyword)) return `${who} has an options-object runIf that is not the literal true`;
    }
  }
  return undefined;
}

function isExpectCall(node: ts.CallExpression): boolean {
  let cur: ts.Expression = unwrap(node.expression);
  while (ts.isPropertyAccessExpression(cur) || ts.isCallExpression(cur)) {
    if (ts.isPropertyAccessExpression(cur) && ts.isIdentifier(cur.expression) && cur.expression.text === "expect") {
      return !["assertions", "hasAssertions"].includes(cur.name.text);
    }
    cur = unwrap(cur.expression);
  }
  return ts.isIdentifier(cur) && (cur.text === "expect" || cur.text === "assert");
}

/** The third leg: would this callback pass without ever reaching an expectation? */
function vacuity(fn: ts.FunctionExpression | ts.ArrowFunction): string | undefined {
  const skipNames = new Set<string>();
  const first = fn.parameters[0];
  if (first && ts.isIdentifier(first.name)) skipNames.add(`${first.name.text}.skip`);
  if (first && ts.isObjectBindingPattern(first.name)) {
    for (const el of first.name.elements) if (ts.isIdentifier(el.name) && (el.propertyName ?? el.name).getText() === "skip") skipNames.add(el.name.text);
  }
  let firstExpect = Number.POSITIVE_INFINITY;
  let selfSkip: string | undefined;
  const returns: number[] = [];
  const walk = (n: ts.Node, nested: boolean): void => {
    if (ts.isCallExpression(n)) {
      if (isExpectCall(n)) firstExpect = Math.min(firstExpect, n.getStart());
      if (skipNames.has(n.expression.getText())) selfSkip = n.expression.getText();
    }
    if (ts.isReturnStatement(n) && !nested) returns.push(n.getStart());
    ts.forEachChild(n, c => walk(c, nested || ts.isFunctionLike(c)));
  };
  walk(fn.body, false);
  if (selfSkip) return `its body calls ${selfSkip}() and skips itself`;
  if (firstExpect === Number.POSITIVE_INFINITY) return "its body contains no expect(...) call, so it cannot fail";
  if (returns.some(pos => pos < firstExpect)) return "its body can return before its first expect(...), so the expectation may never be reached";
  return undefined;
}

function analyze(sourceText: string): Analysis {
  const file = ts.createSourceFile("pinned.test.ts", sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const runners = importedRunners(file);
  const decls = topLevelDecls(file);
  const regs: Registration[] = [];

  const visit = (node: ts.Node, inheritedDead: string | undefined, parent: Registration | undefined): void => {
    const asHeadOfOuterCall = ts.isCallExpression(node.parent ?? node) && unwrap((node.parent as ts.CallExpression).expression) === node;
    if (ts.isCallExpression(node) && !asHeadOfOuterCall) {
      const head = parseHead(node.expression, runners);
      if (head && node.arguments.length > 0) {
        const titleArg = node.arguments[0];
        const title = ts.isStringLiteral(titleArg) || ts.isNoSubstitutionTemplateLiteral(titleArg) ? titleArg.text : undefined;
        const own = ownDeadReason(head, node, decls, title);
        const callback = node.arguments.find((a): a is ts.FunctionExpression | ts.ArrowFunction => ts.isArrowFunction(a) || ts.isFunctionExpression(a));
        const reg: Registration = {
          kind: head.kind,
          title,
          node,
          parent,
          head,
          dead: inheritedDead ?? own,
          vacuous: head.kind === "it" && callback ? vacuity(callback) : undefined,
        };
        regs.push(reg);
        for (const arg of node.arguments) {
          if (arg === callback && callback) visit(callback.body, reg.dead, reg);
          else visit(arg, inheritedDead, parent);
        }
        return;
      }
    }
    if (ts.isIfStatement(node)) {
      visit(node.expression, inheritedDead, parent);
      const dead = inheritedDead ?? "it registers behind an if statement (conditional registration)";
      visit(node.thenStatement, dead, parent);
      if (node.elseStatement) visit(node.elseStatement, dead, parent);
      return;
    }
    if (ts.isConditionalExpression(node)) {
      visit(node.condition, inheritedDead, parent);
      const dead = inheritedDead ?? "it registers inside a ternary (conditional registration)";
      visit(node.whenTrue, dead, parent);
      visit(node.whenFalse, dead, parent);
      return;
    }
    if (ts.isBinaryExpression(node) && [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(node.operatorToken.kind)) {
      visit(node.left, inheritedDead, parent);
      visit(node.right, inheritedDead ?? "it registers on the short-circuit side of a logical operator (conditional registration)", parent);
      return;
    }
    if (ts.isForStatement(node) || ts.isForOfStatement(node) || ts.isForInStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node)) {
      ts.forEachChild(node, c => visit(c, inheritedDead ?? "it registers inside a loop whose iteration count the census cannot see", parent));
      return;
    }
    if (ts.isSwitchStatement(node)) {
      ts.forEachChild(node, c => visit(c, inheritedDead ?? "it registers inside a switch (conditional registration)", parent));
      return;
    }
    if (ts.isFunctionLike(node) && !ts.isSourceFile(node)) {
      ts.forEachChild(node, c => visit(c, inheritedDead ?? "it registers inside a function that may never be called (helper function)", parent));
      return;
    }
    ts.forEachChild(node, c => visit(c, inheritedDead, parent));
  };
  visit(file, undefined, undefined);
  return { file, regs, decls };
}

function descendantsOf(a: Analysis, reg: Registration): Registration[] {
  return a.regs.filter(r => {
    for (let p = r.parent; p; p = p.parent) if (p === reg) return true;
    return false;
  });
}

type Verdict = { ok: true } | { ok: false; reason: string };

function judgeRegistration(a: Analysis, reg: Registration): Verdict {
  const who = `${reg.kind}(${JSON.stringify(reg.title)})`;
  if (reg.dead) return { ok: false, reason: `${who} is registered but not live: ${reg.dead}` };
  if (reg.kind === "it") return reg.vacuous ? { ok: false, reason: `${who} is live but vacuous: ${reg.vacuous}` } : { ok: true };
  const live = descendantsOf(a, reg).filter(r => r.kind === "it" && !r.dead && !r.vacuous);
  return live.length > 0 ? { ok: true } : { ok: false, reason: `${who} holds no live case that reaches an expectation` };
}

const analysisCache = new Map<string, Analysis>();
function analysisOf(sourceText: string): Analysis {
  const cached = analysisCache.get(sourceText);
  if (cached) return cached;
  const fresh = analyze(sourceText);
  analysisCache.set(sourceText, fresh);
  return fresh;
}

function judgeCase(sourceText: string, pin: Pick<PinnedCase, "kind" | "title">): Verdict {
  const a = analysisOf(sourceText);
  const same = a.regs.filter(r => r.kind === pin.kind && r.title === pin.title);
  if (same.length === 0) {
    return { ok: false, reason: `no ${pin.kind}(...) registered with title ${JSON.stringify(pin.title)} (renamed, deleted, commented out or not a runner call)` };
  }
  const verdicts = same.map(r => judgeRegistration(a, r));
  const live = verdicts.find(v => v.ok);
  if (live) return live;
  return verdicts[0];
}

// ---------------------------------------------------------------------------------------------
// Mode truth: derived from the case's backend configuration, never from a constant.
// ---------------------------------------------------------------------------------------------

const CLAUDE_CONFIG = /\bworkflowAgentBackend\b["']?\s*:\s*["']claude["']|\bcreateClaudeWorkflowHost\s*\(/;
const PI_CONFIG = /\bworkflowAgentBackend\b["']?\s*:\s*["']pi["']/;

function identifiersIn(text: string): string[] {
  return text.match(/[A-Za-z_$][\w$]*/g) ?? [];
}

/** The text that configures a case: itself, its enclosing hooks and tables, and the file-level helpers they call. */
function configurationText(a: Analysis, reg: Registration): string {
  const parts: string[] = [reg.node.getText(a.file)];
  for (let p = reg.parent; p; p = p.parent) {
    for (const mod of p.head.mods) for (const arg of mod.args) parts.push(arg.getText(a.file));
    const callback = p.node.arguments.find((arg): arg is ts.FunctionExpression | ts.ArrowFunction => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
    if (callback && ts.isBlock(callback.body)) {
      for (const stmt of callback.body.statements) {
        if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression) && /^(before|after)(Each|All)$/.test(stmt.expression.expression.getText(a.file))) parts.push(stmt.getText(a.file));
      }
    }
  }
  const seen = new Set<string>();
  for (let depth = 0; depth < 3; depth++) {
    for (const id of new Set(identifiersIn(parts.join("\n")))) {
      const decl = a.decls.get(id);
      if (decl && !seen.has(id)) {
        seen.add(id);
        parts.push(decl.getText(a.file));
      }
    }
  }
  return parts.join("\n");
}

function derivedMode(sourceText: string, pin: Pick<PinnedCase, "kind" | "title">): Mode {
  const a = analysisOf(sourceText);
  const reg = a.regs.find(r => r.kind === pin.kind && r.title === pin.title && judgeRegistration(a, r).ok) ?? a.regs.find(r => r.kind === pin.kind && r.title === pin.title);
  if (!reg) return "unconfigured";
  const text = configurationText(a, reg);
  const claude = CLAUDE_CONFIG.test(text);
  const pi = PI_CONFIG.test(text);
  if (claude && pi) return "both";
  if (claude) return "claude";
  if (pi) return "pi";
  return "unconfigured";
}

function modeProblem(pin: PinnedCase, derived: Mode): string | undefined {
  if (derived !== "unconfigured") {
    if (pin.mode !== derived) return `declared ${pin.mode} but the case configures ${derived}`;
    if (pin.modeBasis !== undefined) return "declares a modeBasis although the mode is derived from the case text";
    return undefined;
  }
  if (pin.mode === "unconfigured") return pin.modeBasis === undefined ? undefined : "unconfigured case must not carry a modeBasis";
  return (pin.modeBasis ?? "").length > 30 ? undefined : `declared ${pin.mode} but the case text shows no backend configuration and no written modeBasis`;
}

type RowStatus = "unpinned" | "single-mode" | "dual-mode";

/** Only a case whose OWN configuration spans both modes proves dual-mode; declared-only modes never count. */
function rowStatus(row: Row, derivedByCase: ReadonlyMap<PinnedCase, Mode>): RowStatus {
  if (row.cases.length === 0) return "unpinned";
  return row.cases.some(c => derivedByCase.get(c) === "both") ? "dual-mode" : "single-mode";
}

// ---------------------------------------------------------------------------------------------
// Tier truth: a "fixture pass" pin has to run in the default test gate.
// ---------------------------------------------------------------------------------------------

interface GateShape {
  readonly include: readonly string[];
  readonly exclude: readonly string[];
  readonly gate: readonly string[];
}

function globToRegExp(glob: string): RegExp {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === "*" && glob[i + 1] === "*") {
      if (glob[i + 2] === "/") {
        out += "(?:.*/)?";
        i += 2;
      } else {
        out += ".*";
        i += 1;
      }
    } else if (ch === "*") out += "[^/]*";
    else if (ch === "?") out += "[^/]";
    else out += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${out}$`);
}

function runsInDefaultGate(relPath: string, cfg: GateShape): Verdict {
  if (!cfg.gate.includes("test")) return { ok: false, reason: `forge [build] gate no longer contains "test" (${cfg.gate.join(", ")})` };
  if (!cfg.include.some(g => globToRegExp(g).test(relPath))) return { ok: false, reason: `${relPath} matches no vitest include glob (${cfg.include.join(", ")})` };
  const excluded = cfg.exclude.find(g => globToRegExp(g).test(relPath));
  if (excluded !== undefined) return { ok: false, reason: `${relPath} is excluded from the default test gate by ${JSON.stringify(excluded)}` };
  return { ok: true };
}

function liveGateShape(): GateShape {
  const cfg = vitestConfig as unknown as { test?: { include?: readonly string[]; exclude?: readonly string[] } };
  const toml = readFileSync(join(ROOT, "forge.toml"), "utf8");
  const buildSection = /^\[build\]\n([\s\S]*?)(?=^\[)/m.exec(toml)?.[1] ?? "";
  const gateLine = /^gate\s*=\s*\[([^\]]*)\]/m.exec(buildSection)?.[1] ?? "";
  return {
    include: cfg.test?.include ?? [],
    exclude: cfg.test?.exclude ?? [],
    gate: [...gateLine.matchAll(/"([^"]+)"/g)].map(m => m[1]),
  };
}

// ---------------------------------------------------------------------------------------------
// Docs exactness: judged and extracted over ONE rendered view.
// ---------------------------------------------------------------------------------------------

/** The rendered view: HTML comments and fenced code are not part of what a reader sees. */
function renderedView(text: string): string {
  const withoutComments = text.replace(/<!--[\s\S]*?-->/g, "");
  const out: string[] = [];
  let fence: string | undefined;
  for (const line of withoutComments.split("\n")) {
    const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence === undefined && marker !== undefined) fence = marker[0];
    else if (fence !== undefined && marker !== undefined && marker[0] === fence) fence = undefined;
    else if (fence === undefined) out.push(line);
  }
  return out.join("\n");
}

type SectionResult = { ok: true; lines: string[] } | { ok: false; reason: string };

/** The unique "## heading" section, bounded at the next level-1 or level-2 heading or EOF. */
function docSection(text: string, heading: string): SectionResult {
  const lines = renderedView(text).split("\n");
  const wanted = `## ${heading}`;
  const at = lines.flatMap((line, i) => (line.trimEnd() === wanted ? [i] : []));
  if (at.length !== 1) return { ok: false, reason: `heading ${JSON.stringify(wanted)} appears ${at.length} times in the rendered view, expected exactly 1` };
  const rest = lines.slice(at[0] + 1);
  const end = rest.findIndex(line => /^#{1,2}\s/.test(line));
  return { ok: true, lines: end < 0 ? rest : rest.slice(0, end) };
}

function bulletsProblem(text: string): string | undefined {
  const section = docSection(text, "Compatibility feature control");
  if (!section.ok) return section.reason;
  const content = section.lines.map(l => l.trimEnd()).filter(l => l.trim() !== "");
  const expected = BULLETS.map(b => `- ${b}`);
  if (content.length !== expected.length) return `section holds ${content.length} non-blank lines, expected exactly the ${expected.length} bullets`;
  const bad = expected.findIndex((line, i) => content[i] !== line);
  return bad < 0 ? undefined : `bullet ${bad + 1} differs from the quoted text`;
}

const squash = (s: string): string => s.replace(/\s+/g, " ").trim();
const TRUTH_SENTENCE = `All docs and status tables must distinguish ${TRUTH_LABELS.map(l => `"${l}"`).join(", ")}.`;

function truthLabelProblem(text: string): string | undefined {
  const section = docSection(text, "Truth labels and release gates");
  if (!section.ok) return section.reason;
  return squash(section.lines.join(" ")).includes(TRUTH_SENTENCE) ? undefined : "the exact docs/14 truth-label sentence is missing or weakened";
}

function readTest(file: string): string {
  return readFileSync(join(TESTS, file), "utf8");
}

function readDoc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}


/**
 * Respin U1/U2/U6/U10 (gate-measured silent modes S1-S11, third leg S5, attribution H1-H3): ONE
 * falsifier per mode, authored against the runner's verified export surface, never against the
 * scanner's own model of it.
 */
const VITEST_IMPORT = 'import { describe, expect, it, suite, test } from "vitest";\n';
const ASSERTS = "expect(1).toBe(1);";
/** Spelled in two halves so no text-level focused-test grep (the gate owns that via allowOnly:false) can mistake the corpus for a live one. */
const FOCUS = `${"on"}${"ly"}`;

interface SilentMode {
  readonly id: string;
  readonly kind: CallKind;
  readonly title: string;
  readonly source: string;
  /** What the red reason has to say, so the row is attributed to the true cause. */
  readonly cause: RegExp;
}

const SILENT_MODES: readonly SilentMode[] = [
  { id: "S1 describe.skip on the enclosing describe", kind: "it", title: "target", cause: /skip/, source: `describe.skip("outer", () => { it("target", () => { ${ASSERTS} }); });` },
  { id: "S2 describe(name, { skip: true }, fn) around the case", kind: "it", title: "target", cause: /skip/, source: `describe("outer", { skip: true }, () => { it("target", () => { ${ASSERTS} }); });` },
  { id: "S3 it(name, { skip: true }, fn)", kind: "it", title: "target", cause: /skip/, source: `it("target", { skip: true }, () => { ${ASSERTS} });` },
  { id: "S3b it(name, { todo: true }, fn)", kind: "it", title: "target", cause: /todo/, source: `it("target", { todo: true }, () => { ${ASSERTS} });` },
  { id: "S4 ctx.skip() in the body", kind: "it", title: "target", cause: /skip/, source: `it("target", (ctx) => { ctx.skip(); ${ASSERTS} });` },
  { id: "S5 env-guarded early return before any expectation", kind: "it", title: "target", cause: /return/, source: `it("target", () => { if (!process.env.CENSUS_X) return; expect(1).toBe(2); });` },
  { id: "S6 describe.skipIf(true)", kind: "it", title: "target", cause: /skipIf/, source: `describe.skipIf(true)("outer", () => { it("target", () => { ${ASSERTS} }); });` },
  { id: "S7 describe.runIf(false)", kind: "it", title: "target", cause: /runIf/, source: `describe.runIf(false)("outer", () => { it("target", () => { ${ASSERTS} }); });` },
  { id: "S8 multi-line block comment around the case", kind: "it", title: "target", cause: /no it\(/, source: `/*\nit("target", () => { ${ASSERTS} });\n*/` },
  { id: "S9 registration behind an environment if", kind: "it", title: "target", cause: /if statement/, source: `if (process.env.CENSUS_X) { it("target", () => { ${ASSERTS} }); }` },
  { id: "S10 it.each([]) registers zero cases", kind: "it", title: "target", cause: /empty/, source: `it.each([])("target", () => { ${ASSERTS} });` },
  { id: "S11 describe(name, { skip: true }, fn) on a describe pin", kind: "describe", title: "target", cause: /skip/, source: `describe("target", { skip: true }, () => { it("a", () => { ${ASSERTS} }); });` },
  { id: "S12 it.for([]) registers zero cases", kind: "it", title: "target", cause: /empty/, source: `it.for([])("target", () => { ${ASSERTS} });` },
  { id: "S13 skipIf on an unprovable condition", kind: "it", title: "target", cause: /skipIf/, source: `it.skipIf(process.env.CENSUS_X)("target", () => { ${ASSERTS} });` },
  { id: "S14 test.skip alias", kind: "it", title: "target", cause: /skip/, source: `test.skip("target", () => { ${ASSERTS} });` },
  { id: "S15 it.skip.each table", kind: "it", title: "target", cause: /skip/, source: `it.skip.each([1])("target", () => { ${ASSERTS} });` },
  { id: "S16 it.todo", kind: "it", title: "target", cause: /todo/, source: 'it.todo("target");' },
  { id: "S17 it.fails inverts the expectation", kind: "it", title: "target", cause: /fails/, source: `it.fails("target", () => { ${ASSERTS} });` },
  { id: "S18 a body with no expectation at all", kind: "it", title: "target", cause: /no expect/, source: 'it("target", () => {});' },
  { id: "S19 a describe whose only case is skipped", kind: "describe", title: "target", cause: /no live/, source: `describe("target", () => { it.skip("a", () => { ${ASSERTS} }); });` },
  { id: "S20 ternary registration", kind: "it", title: "target", cause: /conditional/, source: `const on = Boolean(process.env.CENSUS_X); on ? it("target", () => { ${ASSERTS} }) : undefined;` },
  { id: "S21 registration inside a helper that may never run", kind: "it", title: "target", cause: /function/, source: `function register() { it("target", () => { ${ASSERTS} }); }` },
  { id: "S22 registration inside a loop", kind: "it", title: "target", cause: /loop/, source: `for (const n of [1]) { it("target", () => { expect(n).toBe(1); }); }` },
  { id: "S23 aliased import carrying a skip", kind: "it", title: "target", cause: /skip/, source: `import { it as spec } from "vitest";\nspec.skip("target", () => { ${ASSERTS} });` },
  { id: "S24 each over an unresolvable table", kind: "it", title: "target", cause: /table/, source: `it.each(makeRows())("target", () => { ${ASSERTS} });` },
  { id: "S25 each over a named empty table", kind: "it", title: "target", cause: /empty/, source: `const ROWS: number[] = [];\nit.each(ROWS)("target", () => { ${ASSERTS} });` },
  { id: "S26 a renamed case", kind: "it", title: "target", cause: /no it\(/, source: `it("target renamed", () => { ${ASSERTS} });` },
  { id: "S27 a deleted case", kind: "it", title: "target", cause: /no it\(/, source: `it("another", () => { ${ASSERTS} });` },
];

interface LiveControl {
  readonly id: string;
  readonly kind: CallKind;
  readonly title: string;
  readonly source: string;
}

/** Forms the old reading wrongly refused or that a stricter scanner must not turn into false reds (H1, H2). */
const LIVE_CONTROLS: readonly LiveControl[] = [
  { id: "plain it", kind: "it", title: "target", source: `it("target", () => { ${ASSERTS} });` },
  { id: "single-quoted title", kind: "it", title: "target", source: `it('target', () => { ${ASSERTS} });` },
  { id: "backtick title without substitutions", kind: "it", title: "target", source: `it(\`target\`, () => { ${ASSERTS} });` },
  { id: "H1 live test( alias", kind: "it", title: "target", source: `test("target", () => { ${ASSERTS} });` },
  { id: "H2 it.concurrent", kind: "it", title: "target", source: `it.concurrent("target", async () => { ${ASSERTS} });` },
  { id: "it.sequential", kind: "it", title: "target", source: `it.sequential("target", () => { ${ASSERTS} });` },
  { id: "it.for over a non-empty table", kind: "it", title: "target", source: `it.for([1, 2])("target", () => { ${ASSERTS} });` },
  { id: "it.each over a non-empty table", kind: "it", title: "target", source: `it.each([[1], [2]])("target", () => { ${ASSERTS} });` },
  { id: "it.each over a file-level const table", kind: "it", title: "target", source: `const ROWS = [1, 2, 3];\nit.each(ROWS)("target", () => { ${ASSERTS} });` },
  { id: "it.skipIf(false)", kind: "it", title: "target", source: `it.skipIf(false)("target", () => { ${ASSERTS} });` },
  { id: "it.runIf(true)", kind: "it", title: "target", source: `it.runIf(true)("target", () => { ${ASSERTS} });` },
  { id: "options object with skip: false", kind: "it", title: "target", source: `it("target", { skip: false, timeout: 5 }, () => { ${ASSERTS} });` },
  { id: "it nested in a live describe", kind: "it", title: "target", source: `describe("outer", () => { describe("inner", () => { it("target", () => { ${ASSERTS} }); }); });` },
  { id: "describe.concurrent around the case", kind: "it", title: "target", source: `describe.concurrent("outer", () => { it("target", () => { ${ASSERTS} }); });` },
  { id: "describe pin with one live case", kind: "describe", title: "target", source: `describe("target", () => { it.skip("a", () => { ${ASSERTS} }); it("b", () => { ${ASSERTS} }); });` },
  { id: "suite alias", kind: "describe", title: "target", source: `suite("target", () => { it("b", () => { ${ASSERTS} }); });` },
  { id: "await expect(...).rejects chain", kind: "it", title: "target", source: 'it("target", async () => { await expect(Promise.reject(new Error("x"))).rejects.toThrow("x"); });' },
  { id: "expect.soft", kind: "it", title: "target", source: 'it("target", () => { expect.soft(1).toBe(1); });' },
  { id: "return after the first expectation", kind: "it", title: "target", source: 'it("target", () => { expect(1).toBe(1); if (Date.now() < 0) return; });' },
  { id: "return inside a nested helper before the expectation", kind: "it", title: "target", source: 'it("target", () => { const f = () => { return 1; }; expect(f()).toBe(1); });' },
  { id: "focused case is the gate's business, not the census's", kind: "it", title: "target", source: `it.${FOCUS}("target", () => { ${ASSERTS} });` },
  { id: "import alias", kind: "it", title: "target", source: `import { it as spec } from "vitest";\nspec("target", () => { ${ASSERTS} });` },
  { id: "a commented-out neighbour next to a live case", kind: "it", title: "target", source: `// it("target", () => {});\nit("target", () => { ${ASSERTS} });` },
];

describe("scanner falsifiers: one per way a pin can be silently lost", () => {
  it.each(SILENT_MODES.map(m => [m.id, m] as const))("%s goes red and names its true cause", (_id, mode) => {
    const verdict = judgeCase(VITEST_IMPORT + mode.source, mode);
    expect(verdict.ok, `${mode.id} was judged live`).toBe(false);
    expect(verdict.ok ? "" : verdict.reason).toMatch(mode.cause);
  });

  it("the corpus covers the gate-measured modes S1-S11 and a skip is never reported as a rename (H3)", () => {
    expect(SILENT_MODES.length).toBeGreaterThanOrEqual(27);
    for (const id of ["S1 ", "S2 ", "S3 ", "S4 ", "S5 ", "S6 ", "S7 ", "S8 ", "S9 ", "S10 ", "S11 "]) {
      expect(SILENT_MODES.some(m => m.id.startsWith(id)), id).toBe(true);
    }
    const skipped = judgeCase(`${VITEST_IMPORT}it.skip("target", () => { ${ASSERTS} });`, { kind: "it", title: "target" });
    expect(skipped.ok ? "" : skipped.reason).not.toMatch(/renamed|deleted|commented/);
  });

  it.each(LIVE_CONTROLS.map(c => [c.id, c] as const))("control: %s stays live (no false red)", (_id, control) => {
    const source = control.source.startsWith("import ") ? control.source : VITEST_IMPORT + control.source;
    const verdict = judgeCase(source, control);
    expect(verdict, control.id).toEqual({ ok: true });
  });

  it("a wrong-kind pin is refused, so a describe cannot stand in for a case", () => {
    expect(judgeCase(`${VITEST_IMPORT}it("target", () => { ${ASSERTS} });`, { kind: "describe", title: "target" }).ok).toBe(false);
  });

  it("an entirely empty describe is runner-refused (no test found), so only partial hollowing is silent; the census still refuses it", () => {
    expect(judgeCase(`${VITEST_IMPORT}describe("target", () => {});`, { kind: "describe", title: "target" }).ok).toBe(false);
  });
});

describe("real-file mutants: the blast radius the gate measured is closed (U1, U10)", () => {
  function mutate(file: string, from: string, to: string): string {
    const source = readTest(file);
    expect(source.includes(from), `${file} no longer contains ${JSON.stringify(from)}; re-point the mutant`).toBe(true);
    return source.replace(from, to);
  }

  it("describe.skip on the host-contract describe silences L3/L4 as one edit, and the census names it", () => {
    const first = /^describe\(/m.exec(readTest("workbench-host-contract.test.ts"));
    expect(first).not.toBeNull();
    const mutated = readTest("workbench-host-contract.test.ts").replace(/^describe\(/m, "describe.skip(");
    for (const title of ["L4: Workbench backend is explicit and invalid config is rejected, not silently Pi", "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported"]) {
      const verdict = judgeCase(mutated, { kind: "it", title });
      expect(verdict.ok, title).toBe(false);
      expect(verdict.ok ? "" : verdict.reason).toMatch(/skip/);
    }
  });

  it("an options-object skip on the workflow-dialog keys describe (23 cases) is refused", () => {
    const mutated = mutate("workflow-dialog.test.ts", 'describe("keys", ', 'describe("keys", { skip: true }, ');
    const verdict = judgeCase(mutated, { kind: "describe", title: "keys" });
    expect(verdict.ok).toBe(false);
    expect(verdict.ok ? "" : verdict.reason).toMatch(/skip/);
  });

  it("an early env-guarded return planted in the B5.2 safety pin is refused as vacuous", () => {
    const title = "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect";
    const source = readTest("workflow-effect-replay.test.ts");
    const at = source.indexOf(title);
    expect(at).toBeGreaterThan(0);
    const arrow = source.indexOf("=> {", at);
    expect(arrow).toBeGreaterThan(at);
    const mutated = `${source.slice(0, arrow + 4)} if (!process.env.CENSUS_NEVER_SET) return;${source.slice(arrow + 4)}`;
    const verdict = judgeCase(mutated, { kind: "it", title });
    expect(verdict.ok).toBe(false);
    expect(verdict.ok ? "" : verdict.reason).toMatch(/return/);
  });
});

describe("mode truth is computed from the case's backend configuration (U8)", () => {
  const configured = (backend: string): string => `settings({ workbench: { workflowAgentBackend: "${backend}" } })`;

  it("derives claude, pi, both and unconfigured from the text a case actually runs", () => {
    const claude = `${VITEST_IMPORT}it("target", () => { ${configured("claude")}; ${ASSERTS} });`;
    const pi = `${VITEST_IMPORT}it("target", () => { ${configured("pi")}; ${ASSERTS} });`;
    const both = `${VITEST_IMPORT}it("target", () => { ${configured("pi")}; ${configured("claude")}; ${ASSERTS} });`;
    const none = `${VITEST_IMPORT}it("target", () => { ${ASSERTS} });`;
    const pin = { kind: "it", title: "target" } as const;
    expect([claude, pi, both, none].map(s => derivedMode(s, pin))).toEqual(["claude", "pi", "both", "unconfigured"]);
  });

  it("reads the enclosing beforeEach and the file-level helper a case calls, and a table it iterates", () => {
    const viaHook = `${VITEST_IMPORT}describe("outer", () => { beforeEach(() => { ${configured("claude")}; }); it("target", () => { ${ASSERTS} }); });`;
    const viaHelper = `${VITEST_IMPORT}function boot() { ${configured("claude")}; }\nit("target", () => { boot(); ${ASSERTS} });`;
    const viaTable = `${VITEST_IMPORT}const MODES = [{ workbench: { workflowAgentBackend: "pi" } }, { workbench: { workflowAgentBackend: "claude" } }];\ndescribe.each(MODES)("mode", () => { it("target", () => { ${ASSERTS} }); });`;
    const unrelated = `${VITEST_IMPORT}function other() { ${configured("claude")}; }\nit("target", () => { ${ASSERTS} });`;
    const pin = { kind: "it", title: "target" } as const;
    expect([viaHook, viaHelper, viaTable, unrelated].map(s => derivedMode(s, pin))).toEqual(["claude", "claude", "both", "unconfigured"]);
  });

  it("refuses a declared mode that disagrees with, or has no basis against, the derived one", () => {
    const base = { file: "x.test.ts", kind: "it", title: "t" } as const;
    expect(modeProblem({ ...base, mode: "pi" }, "both")).toMatch(/declared pi but the case configures both/);
    expect(modeProblem({ ...base, mode: "claude", modeBasis: "x" }, "claude")).toMatch(/modeBasis/);
    expect(modeProblem({ ...base, mode: "claude" }, "unconfigured")).toMatch(/no backend configuration/);
    expect(modeProblem({ ...base, mode: "claude", modeBasis: "configured through the shared hermetic boot helper in test/helpers" }, "unconfigured")).toBeUndefined();
    expect(modeProblem({ ...base, mode: "unconfigured" }, "unconfigured")).toBeUndefined();
    expect(modeProblem({ ...base, mode: "both" }, "both")).toBeUndefined();
  });

  it("a disclosed mode never counts toward dual-mode: only a case that itself configures both does", () => {
    const disclosed: PinnedCase = { file: "x.test.ts", kind: "it", title: "t", mode: "both", modeBasis: "configured through a helper the census cannot read here, disclosed only" };
    const real: PinnedCase = { file: "y.test.ts", kind: "it", title: "u", mode: "both" };
    const row = (cases: readonly PinnedCase[]): Row => ({ id: "X", bullet: 6, claim: "x", label: "fixture pass", cases });
    const derived = new Map<PinnedCase, Mode>([
      [disclosed, "unconfigured"],
      [real, "both"],
    ]);
    expect(rowStatus(row([disclosed]), derived)).toBe("single-mode");
    expect(rowStatus(row([real]), derived)).toBe("dual-mode");
    expect(rowStatus(row([]), derived)).toBe("unpinned");
  });
});

describe("tier truth: a pinned case has to run in the default test gate (U3)", () => {
  const live: GateShape = { include: ["test/**/*.test.ts"], exclude: ["test/workbench-native-client.test.ts"], gate: ["lint", "typing", "build", "test"] };

  it("accepts a file the gate runs", () => {
    expect(runsInDefaultGate("test/workbench-control.test.ts", live)).toEqual({ ok: true });
  });

  it.each([
    ["T1 the pinned file is added to the vitest exclude list", { ...live, exclude: [...live.exclude, "test/workbench-control.test.ts"] }, /excluded/],
    ["T2 a glob exclude swallows the pinned file", { ...live, exclude: ["test/workbench-*.test.ts"] }, /excluded/],
    ["T3 the include glob narrows away from the pinned file", { ...live, include: ["test/unit/**/*.test.ts"] }, /no vitest include/],
    ["T4 the forge gate stops running the test step", { ...live, gate: ["lint", "typing", "build"] }, /"test"/],
  ] as const)("%s goes red", (_id, shape, cause) => {
    const verdict = runsInDefaultGate("test/workbench-control.test.ts", shape);
    expect(verdict.ok).toBe(false);
    expect(verdict.ok ? "" : verdict.reason).toMatch(cause);
  });

  it("reads the same vitest config module and forge.toml gate line the complete gate loads", () => {
    const shape = liveGateShape();
    expect(shape.include).toEqual(["test/**/*.test.ts"]);
    expect(shape.gate).toContain("test");
  });
});

describe("docs exactness is judged over the rendered view (U4)", () => {
  const doc16 = readDoc("docs/workbench/16-repository-refactor.md");
  const doc14 = readDoc("docs/workbench/14-qa-and-benchmarks.md");

  it("the live docs pass both exact checks", () => {
    expect(bulletsProblem(doc16)).toBeUndefined();
    expect(truthLabelProblem(doc14)).toBeUndefined();
  });

  it("the bullets sit under a unique heading and the doc has exactly six, with no extra line inside the section", () => {
    const section = docSection(doc16, "Compatibility feature control");
    expect(section.ok).toBe(true);
    expect(section.ok ? section.lines.filter(l => l.trim() !== "") : []).toHaveLength(BULLETS.length);
  });

  const bullet2 = `- ${BULLETS[1]}`;
  it.each([
    ["D1 suffix weakening of bullet 2", () => doc16.replace(bullet2, `${bullet2} Where practical.`)],
    ["D2 bullet 2 moved into a comment and replaced by an inverted item", () => doc16.replace(bullet2, `<!-- ${bullet2} -->\n- Silently falling back to Pi after a Claude SDK failure is acceptable.`)],
    ["D3 a second weakened same-name section at EOF", () => `${doc16}\n## Compatibility feature control\n\n- Nothing here is binding.\n`],
    ["D4 a weakening subsection inside the section", () => doc16.replace("\n## Upstream maintainability", "\n### Exceptions\n\n- Any bullet above may be skipped.\n\n## Upstream maintainability")],
    ["D6 the heading renamed", () => doc16.replace("## Compatibility feature control", "## Compatibility feature controls")],
  ] as const)("%s goes red", (_id, mutate) => {
    expect(bulletsProblem(mutate())).toBeDefined();
  });

  it("D5 docs/14 'must distinguish' weakened to 'may optionally distinguish' goes red", () => {
    expect(truthLabelProblem(doc14.replace("must distinguish", "may optionally distinguish"))).toBeDefined();
  });

  it("a duplicate truth-label heading goes red", () => {
    expect(truthLabelProblem(`${doc14}\n## Truth labels and release gates\n\nNothing.\n`)).toMatch(/appears 2 times/);
  });

  it("controls: a heading inside a fenced block or an HTML comment is not part of the rendered view", () => {
    expect(bulletsProblem(`${doc16}\n\`\`\`md\n## Compatibility feature control\n\n- fenced.\n\`\`\`\n`)).toBeUndefined();
    expect(bulletsProblem(`${doc16}\n<!--\n## Compatibility feature control\n\n- commented.\n-->\n`)).toBeUndefined();
  });
});

describe("docs/16 Compatibility feature control: the bullets this census binds", () => {
  it("the rendered section holds exactly the six quoted bullets under one unique heading, bounded at the next level-1/2 heading", () => {
    expect(bulletsProblem(readDoc("docs/workbench/16-repository-refactor.md"))).toBeUndefined();
  });

  it("docs/14 still defines every truth label this census uses, in its exact sentence", () => {
    expect(truthLabelProblem(readDoc("docs/workbench/14-qa-and-benchmarks.md"))).toBeUndefined();
  });
});

const PINS: readonly { readonly row: Row; readonly pin: PinnedCase }[] = ROWS.flatMap(row => row.cases.map(pin => ({ row, pin })));
const EXPECTED_PINS_PER_ROW: Readonly<Record<string, number>> = {
  "B1.1": 2,
  "B1.2": 2,
  "B2.1": 3,
  "B2.2": 0,
  "B3.1": 2,
  "B3.2": 3,
  "B4.1": 1,
  "B4.2": 4,
  "B5.1": 2,
  "B5.2": 2,
  "B5.3": 2,
  "B6.1": 2,
};

describe("census table shape", () => {
  it("has twelve rows and ids unique, each bound to a real bullet 1..6", () => {
    expect(ROWS).toHaveLength(12);
    expect(new Set(ROWS.map(r => r.id)).size).toBe(ROWS.length);
    for (const row of ROWS) expect(row.bullet >= 1 && row.bullet <= BULLETS.length, `${row.id}: bullet out of range`).toBe(true);
    const perBullet = [1, 2, 3, 4, 5, 6].map(b => ROWS.filter(r => r.bullet === b).length);
    expect(perBullet).toEqual([2, 2, 2, 2, 3, 1]);
  });

  it("each row holds exactly its frozen pin count, so emptying a row cannot leave the live-case loop vacuous", () => {
    expect(Object.fromEntries(ROWS.map(r => [r.id, r.cases.length]))).toEqual(EXPECTED_PINS_PER_ROW);
    expect(PINS.length).toBe(Object.values(EXPECTED_PINS_PER_ROW).reduce((a, b) => a + b, 0));
  });

  it("a pinned row names a docs/14 truth label and an unpinned row names none and carries a reason", () => {
    for (const row of ROWS) {
      if (row.cases.length > 0) {
        expect(row.label, `${row.id}: pinned row needs a truth label`).toBeDefined();
        expect(TRUTH_LABELS as readonly string[], `${row.id}: unknown truth label`).toContain(row.label);
        expect(row.unpinned, `${row.id}: pinned row must not also be unpinned`).toBeUndefined();
      } else {
        expect(row.label, `${row.id}: an unpinned row claims no label`).toBeUndefined();
        expect((row.unpinned ?? "").length, `${row.id}: unpinned row needs a written reason`).toBeGreaterThan(40);
      }
    }
  });

  it("pinned titles are non-empty and no two pins of a row are the same case", () => {
    for (const row of ROWS) {
      const keys = row.cases.map(c => `${c.file}|${c.kind}|${c.title}`);
      expect(new Set(keys).size, row.id).toBe(keys.length);
      for (const c of row.cases) expect(c.title.length, row.id).toBeGreaterThan(0);
    }
  });
});

describe("every pinned case is a live case in its file", () => {
  for (const row of ROWS) {
    for (const c of row.cases) {
      it(`${row.id}: ${c.file} ${c.kind} ${JSON.stringify(c.title)}`, () => {
        const verdict = judgeCase(readTest(c.file), c);
        expect(verdict.ok, `row ${row.id} (bullet ${row.bullet}) lost its pin: ${verdict.ok ? "" : verdict.reason}`).toBe(true);
      });
    }
  }

  it("the per-pin loop above registered one case per pin (not an emptied table)", () => {
    expect(PINS.length).toBeGreaterThan(20);
  });
});

describe("tier truth: every truth label is verified against the live config, never carried", () => {
  const shape = liveGateShape();
  for (const row of ROWS.filter(r => r.label === "fixture pass")) {
    for (const file of new Set(row.cases.map(c => c.file))) {
      it(`${row.id}: ${file} runs in the default test gate`, () => {
        const verdict = runsInDefaultGate(`test/${file}`, shape);
        expect(verdict.ok, `row ${row.id}: ${verdict.ok ? "" : verdict.reason}`).toBe(true);
      });
    }
  }

  it("only the 'fixture pass' label is used (a live-SDK or scale label would need its own verified route)", () => {
    expect([...new Set(ROWS.flatMap(r => (r.label ? [r.label] : [])))]).toEqual(["fixture pass"]);
  });
});

describe("mode truth: declared modes are checked against the case's own backend configuration", () => {
  const derived = new Map<PinnedCase, Mode>();
  for (const { pin } of PINS) derived.set(pin, derivedMode(readTest(pin.file), pin));

  for (const { row, pin } of PINS) {
    it(`${row.id}: ${pin.file} ${JSON.stringify(pin.title)} declares the mode it configures`, () => {
      expect(modeProblem(pin, derived.get(pin) ?? "unconfigured"), `row ${row.id}`).toBeUndefined();
    });
  }

  it("the dual-mode verdict is computed from derived configuration, not asserted as a constant", () => {
    const dual = ROWS.filter(r => rowStatus(r, derived) === "dual-mode").map(r => r.id);
    const expectedDual = ROWS.filter(r => r.cases.some(c => derived.get(c) === "both")).map(r => r.id);
    expect(dual).toEqual(expectedDual);
    expect(dual).toContain("B4.1");
    expect(dual).toContain("B4.2");
  });
});

describe("unpinned and single-mode rows stay honest", () => {
  const derived = new Map<PinnedCase, Mode>();
  for (const { pin } of PINS) derived.set(pin, derivedMode(readTest(pin.file), pin));

  it("an unpinned row never counts as pinned: it has no case at all", () => {
    for (const row of ROWS.filter(r => r.unpinned !== undefined)) expect(row.cases, row.id).toHaveLength(0);
    expect(ROWS.filter(r => rowStatus(r, derived) === "unpinned").map(r => r.id)).toEqual(["B2.2"]);
  });

  it("B6.1 is single-mode with the missing mode written, never presented as the dual-mode proof", () => {
    const b6 = ROWS.find(r => r.id === "B6.1");
    expect(b6).toBeDefined();
    expect(rowStatus(b6 as Row, derived)).toBe("single-mode");
    expect((b6 as Row).missingMode ?? "", "B6.1 must name the mode its cases do not cover").toMatch(/upstream\/Pi/);
  });

  it("a row that declares a missing mode is not dual-mode, and a non-dual B6 row must declare one", () => {
    for (const row of ROWS) {
      if (row.missingMode !== undefined) expect(rowStatus(row, derived), row.id).not.toBe("dual-mode");
    }
    for (const row of ROWS.filter(r => r.bullet === 6)) {
      if (rowStatus(row, derived) !== "dual-mode") expect(row.missingMode, row.id).toBeDefined();
    }
  });
});
