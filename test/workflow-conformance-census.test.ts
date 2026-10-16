/**
 * workflow-conformance-census.test.ts — wb-6hb.9 (VC-2/W05): the docs/05
 * "Conformance" requirement census, a falsifier.
 *
 * docs/workbench/05-script-language-and-runtime.md § "Conformance" (three
 * sentences, eleven requirements):
 *
 *   1. "Run legacy fixtures in upstream Pi mode (where available) and Claude
 *      host mode, comparing script-level result shapes, phase grouping, error
 *      behavior, ordering constraints and cancellation."  -> five rows
 *   2. "Test workload schedule nondeterminism rather than requiring identical
 *      parallel arrival order."                           -> one row
 *   3. "Include invalid/malicious payloads, cycles, prototype pollution
 *      attempts, oversized values and timeout ambiguity." -> five rows
 *
 * Every row below is bound to existing cases by file path, verbatim it/describe
 * title and docs/14 truth label ("tier"). The census reads the pinned files as
 * text, parses them with the TypeScript compiler (no regex over source), and
 * never executes the pinned cases. A pin goes red NAMING ITS CAUSE when the
 * case is renamed, deleted, duplicated, commented out, or disabled by ANY
 * vitest mechanism (modifier chain, options object, ctx.skip in the body, a
 * hook that skips, an enclosing suite that is disabled, conditional or never
 * called), when its body no longer reaches an assertion, when its tier label
 * is not true of the vitest/forge configuration, and when the docs sections it
 * quotes drift.
 *
 * Scanner contract: each pinned title resolves to exactly one registration
 * call found in the syntax tree (so comments, strings and template literals
 * are never matched), resolved through the file's own vitest imports. Every
 * red carries a stable cause code (case:skip, suite:option-skip,
 * enclosure:uncalled-function, pin:no-assertion-reached, tier:...); the
 * falsifiers assert the exact code, never "some problem", so a pin that goes
 * red for the WRONG reason fails its own falsifier. Modifiers that do not
 * disable a case (concurrent, sequential, a literal skipIf(false) or
 * runIf(true)) stay green. A stray .only is deliberately NOT checked here:
 * vitest allowOnly is false on trunk, so the gate owns it.
 *
 * Third leg: every pinned case must still reach at least one assertion
 * (an expect matcher call that is not behind a conditional, an unconditional
 * return, or an early return guarded by a runtime condition). This is a
 * syntactic reachability probe, not an execution: a matcher inside a callback
 * handed to another call is counted, so a callback that is never invoked can
 * still satisfy it. The pinned cases themselves are what the gate runs.
 *
 * Dual-mode honesty (sentence 1): a row is a dual-mode proof only when a pinned
 * case runs the SAME fixture under BOTH upstream Pi mode and Claude host mode
 * (mode "both"). Two single-mode cases never add up to one, because neither
 * compares anything to the other. No such case exists on this base (wb-cax.7,
 * the dual-backend golden equivalence, is not landed), so rows 1-5 are recorded
 * "single-mode" with the missing comparison written out and never count as
 * satisfied. When wb-cax.7 lands, its case is pinned with mode "both" and the
 * row is promoted by editing this file; the guards below refuse a promotion
 * without such a pin.
 *
 * Scope: test-only. It binds to cases that exist, it never edits them, and it
 * leaves wb-6hb.7 (docs/05 "Error taxonomy") and wb-6hb.6 (docs/06) alone.
 */

import { readFileSync } from "node:fs";
import { matchesGlob } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DOC_PATH = "docs/workbench/05-script-language-and-runtime.md";
const TRUTH_DOC_PATH = "docs/workbench/14-qa-and-benchmarks.md";
const TRUTH_HEADING = "Truth labels and release gates";
const VITEST_CONFIG_PATH = "vitest.config.ts";
const FORGE_TOML_PATH = "forge.toml";

/** docs/14 § "Truth labels and release gates" — the only tiers a pin may claim. */
const TIERS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"] as const;
type Tier = (typeof TIERS)[number];
/** Labels that are true only of a suite the default gate does not run (it needs a live SDK or a benchmark harness). */
const OFF_GATE_TIERS: readonly Tier[] = ["live SDK pass", "scale benchmark pass"];

/** Which execution mode a pinned case runs under. Only "both" proves a dual-mode comparison. */
type Mode = "pi" | "claude" | "neutral" | "both";
type Status = "pinned" | "single-mode" | "dual-mode" | "unpinned";
type Kind = "it" | "describe";

interface Pin {
  readonly file: string;
  /** Verbatim text of the it()/describe() title, as written in the source (a generated title keeps its placeholder). */
  readonly title: string;
  readonly kind: Kind;
  readonly tier: Tier;
  readonly mode: Mode;
  /** The case is registered from a loop over a table, so a loop around it is expected. */
  readonly generated?: boolean;
  /** Extra verbatim array literals the file must still contain in code (for titles built from a table). */
  readonly anchors?: readonly string[];
}

interface Row {
  readonly id: string;
  readonly sentence: 1 | 2 | 3;
  /** The exact fragment of the docs/05 sentence this row binds. */
  readonly requirement: string;
  readonly dualMode: boolean;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** Modes the pins cover (computed and compared, so it cannot go stale). */
  readonly covers: readonly Mode[];
  /** single-mode rows: what comparison is missing. */
  readonly unmet?: string;
  /** unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

const S1 =
  "Run legacy fixtures in upstream Pi mode (where available) and Claude host mode, comparing script-level result shapes, phase grouping, error behavior, ordering constraints and cancellation.";
const S2 = "Test workload schedule nondeterminism rather than requiring identical parallel arrival order.";
const S3 = "Include invalid/malicious payloads, cycles, prototype pollution attempts, oversized values and timeout ambiguity.";

const COMPAT = "test/workflow-claude-code-compat.test.ts";
const E2E = "test/e2e/workflow.e2e.test.ts";
const RUNTIME = "test/workflow-runtime.test.ts";
const PROGRESS = "test/workflow-progress.test.ts";
const HOST = "test/workbench-host-contract.test.ts";
const CANCEL = "test/workbench-claude-cancel-faults.test.ts";
const NODE = "test/workbench-node-contract.test.ts";
const LIMITS = "test/workbench-node-limits.test.ts";
const AUTH = "test/workbench-registry-auth.test.ts";
const CAPABILITY_TOOLS = "test/workbench-claude-capability-tools.test.ts";
/** The cycle case is generated from a table (`it(\`rejects ${name} on the way out\`)`), so its verbatim source title carries the placeholder. */
const GENERATED_TITLE = ["rejects $", "{name} on the way out"].join("");
const SECURITY = "test/workbench-security-workflow.test.ts";

const DUAL_UNMET =
  "The same legacy fixture compared under upstream Pi mode and Claude host mode on this property. The pinned cases each run one mode (or a host-neutral stub) and compare nothing to each other; the dual-backend golden equivalence is wb-cax.7, not landed on this base.";

const ROWS: readonly Row[] = [
  {
    id: "S1-result-shapes",
    sentence: 1,
    requirement: "script-level result shapes",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral", "pi"],
    unmet: DUAL_UNMET,
    pins: [
      { file: COMPAT, title: "runs the canonical review-changes example", kind: "it", tier: "fixture pass", mode: "neutral" },
      {
        file: HOST,
        title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
        kind: "it",
        tier: "fixture pass",
        mode: "claude",
      },
      {
        file: E2E,
        title: "runs a real script whose agents reach real sessions with the script's prompts",
        kind: "it",
        tier: "fixture pass",
        mode: "pi",
      },
    ],
  },
  {
    id: "S1-phase-grouping",
    sentence: 1,
    requirement: "phase grouping",
    dualMode: true,
    status: "single-mode",
    covers: ["neutral"],
    unmet: `${DUAL_UNMET} The phase-group cases are host-neutral reducers and a stub-host run; no case observes phase grouping from a Pi-mode or Claude-mode run.`,
    pins: [
      { file: PROGRESS, title: "orders groups by phase index, not first appearance", kind: "it", tier: "fixture pass", mode: "neutral" },
      { file: RUNTIME, title: "files the child's agents under their own phase group", kind: "it", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S1-error-behavior",
    sentence: 1,
    requirement: "error behavior",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral", "pi"],
    unmet: DUAL_UNMET,
    pins: [
      { file: RUNTIME, title: "maps a failed agent to null rather than throwing", kind: "it", tier: "fixture pass", mode: "neutral" },
      { file: HOST, title: "L4: error result after partial assistant never becomes success", kind: "it", tier: "fixture pass", mode: "claude" },
      { file: E2E, title: "surfaces a script that fails to parse instead of launching it", kind: "it", tier: "fixture pass", mode: "pi" },
    ],
  },
  {
    id: "S1-ordering-constraints",
    sentence: 1,
    requirement: "ordering constraints",
    dualMode: true,
    status: "single-mode",
    covers: ["neutral"],
    unmet: `${DUAL_UNMET} The ordering cases run on the stub host only.`,
    pins: [
      { file: RUNTIME, title: "is a barrier and folds a throwing thunk to null", kind: "it", tier: "fixture pass", mode: "neutral" },
      {
        file: RUNTIME,
        title: "overlaps stages — item A reaches stage 2 before item B leaves stage 1",
        kind: "it",
        tier: "fixture pass",
        mode: "neutral",
      },
    ],
  },
  {
    id: "S1-cancellation",
    sentence: 1,
    requirement: "cancellation",
    dualMode: true,
    status: "single-mode",
    covers: ["claude", "neutral"],
    unmet: `${DUAL_UNMET} No pinned cancellation case runs the Pi AgentManager path at all.`,
    pins: [
      { file: RUNTIME, title: "terminates the run and aborts every in-flight child", kind: "it", tier: "fixture pass", mode: "neutral" },
      {
        file: CANCEL,
        title: "F5 a pre-aborted host signal makes zero query() calls and settles skipped",
        kind: "it",
        tier: "fixture pass",
        mode: "claude",
      },
    ],
  },
  {
    id: "S2-schedule-nondeterminism",
    sentence: 2,
    requirement: "schedule nondeterminism rather than requiring identical parallel arrival order",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    gap: "Both pins are order-insensitive: one proves the progress reducer yields index order whatever order entries arrive in, the other that a 24-way fan-out completes under the cap with no assumption about which agent starts first. The runtime pipeline case that asserts one exact arrival sequence is deliberately NOT a pin for this row.",
    pins: [
      { file: PROGRESS, title: "orders agents by index regardless of arrival order", kind: "it", tier: "fixture pass", mode: "neutral" },
      {
        file: RUNTIME,
        title: "never exceeds the configured concurrency under a large fan-out",
        kind: "it",
        tier: "fixture pass",
        mode: "neutral",
      },
    ],
  },
  {
    id: "S3-invalid-malicious-payloads",
    sentence: 3,
    requirement: "invalid/malicious payloads",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      {
        file: NODE,
        title: "L4: malformed input and non-JSON payload fail before provider effects",
        kind: "it",
        tier: "adversarial pass",
        mode: "neutral",
      },
      { file: SECURITY, title: "rejects a raw ANSI escape in source before VM execution", kind: "it", tier: "adversarial pass", mode: "neutral" },
      { file: RUNTIME, title: "rejects a script with control characters", kind: "it", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S3-cycles",
    sentence: 3,
    requirement: "cycles",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      {
        file: RUNTIME,
        title: GENERATED_TITLE,
        kind: "it",
        tier: "fixture pass",
        mode: "neutral",
        generated: true,
        anchors: ['["a cycle", "const a = {}; a.self = a; return a;", "a circular structure"]'],
      },
    ],
  },
  {
    id: "S3-prototype-pollution",
    sentence: 3,
    requirement: "prototype pollution attempts",
    dualMode: false,
    status: "pinned",
    covers: ["claude", "neutral"],
    gap: "Pinned at three layers: the registry (a JSON.parse'd __proto__ input is refused before any provider runs), the Claude host role allowlist (constructor/__proto__/toString/hasOwnProperty never resolve a role) and the Claude capability_invoke tool surface (wb-8i1, landed: an own, nested or array-held __proto__/constructor/prototype key refuses with the registry oracle's text before any host work). No pinned case sends a polluted key through a workflow script's node() call, so that surface is outside this row's proof.",
    pins: [
      {
        file: AUTH,
        title: "rejects oversized nesting and pollution before executing providers",
        kind: "it",
        tier: "adversarial pass",
        mode: "neutral",
      },
      { file: HOST, title: "L4: inherited prototype names never satisfy a role allowlist", kind: "it", tier: "adversarial pass", mode: "claude" },
      {
        file: CAPABILITY_TOOLS,
        title: "raw-input prototype keys refuse with the registry oracle's text (wb-8i1)",
        kind: "describe",
        tier: "adversarial pass",
        mode: "claude",
      },
    ],
  },
  {
    id: "S3-oversized-values",
    sentence: 3,
    requirement: "oversized values",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      { file: LIMITS, title: "refuses oversized input before native provider is called", kind: "it", tier: "adversarial pass", mode: "neutral" },
      {
        file: AUTH,
        title: "rejects deep JSON in the worker with a typed diagnostic before host dispatch",
        kind: "it",
        tier: "adversarial pass",
        mode: "neutral",
      },
      { file: RUNTIME, title: "rejects a script over the size limit", kind: "it", tier: "fixture pass", mode: "neutral" },
    ],
  },
  {
    id: "S3-timeout-ambiguity",
    sentence: 3,
    requirement: "timeout ambiguity",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [
      {
        file: NODE,
        title: "L4: effectful invocation with lost response is reported uncertain, never automatically retried",
        kind: "it",
        tier: "adversarial pass",
        mode: "neutral",
      },
      {
        file: AUTH,
        title: "classifies effectful cancellation as uncertain and aborts only the provider wait",
        kind: "it",
        tier: "adversarial pass",
        mode: "neutral",
      },
    ],
  },
];

/** Expected census outcome: promoting a row (or losing one) is an edit to this file, never silent. */
const SATISFIED = [
  "S2-schedule-nondeterminism",
  "S3-invalid-malicious-payloads",
  "S3-cycles",
  "S3-prototype-pollution",
  "S3-oversized-values",
  "S3-timeout-ambiguity",
];
const NOT_SATISFIED = ["S1-result-shapes", "S1-phase-grouping", "S1-error-behavior", "S1-ordering-constraints", "S1-cancellation"];

// ---------------------------------------------------------------------------
// The scanner. Parses source text with the TypeScript compiler; never imports
// or runs a pinned file. Every problem carries a stable cause code.
// ---------------------------------------------------------------------------

interface Problem {
  /** Stable cause: `<scope>:<reason>`. Falsifiers assert this exactly. */
  readonly code: string;
  readonly text: string;
}

type ReadSource = (file: string) => string | undefined;

/** What the census knows about the default gate: vitest include/exclude plus the forge command registry. */
interface GateConfig {
  readonly include: readonly string[];
  readonly exclude: readonly string[];
  readonly forgeToml: string;
}

interface Env {
  readonly read: ReadSource;
  readonly gate: GateConfig;
}

const readFromDisk: ReadSource = file => {
  try {
    return readFileSync(`${ROOT}${file}`, "utf8");
  } catch {
    return undefined;
  }
};

type Fn = ts.ArrowFunction | ts.FunctionExpression;

interface Modifier {
  readonly name: string;
  readonly args: readonly ts.Expression[];
}

interface Chain {
  readonly kind: Kind;
  readonly modifiers: readonly Modifier[];
}

interface Decl {
  readonly kind: Kind;
  readonly title: string | undefined;
  readonly call: ts.CallExpression;
  readonly modifiers: readonly Modifier[];
  readonly callback: Fn | undefined;
}

interface Scan {
  readonly sf: ts.SourceFile;
  readonly imports: ReadonlyMap<string, string>;
  readonly decls: readonly Decl[];
  readonly byCallback: ReadonlyMap<ts.Node, Decl>;
  readonly calledNames: ReadonlySet<string>;
}

/** vitest's verified export surface for registration is exactly describe, suite, it and test (there is no xit/xdescribe). */
const SUITE_ROOTS = new Set(["describe", "suite"]);
const CASE_ROOTS = new Set(["it", "test"]);
const HOOK_ROOTS = new Set(["beforeEach", "beforeAll", "aroundEach", "aroundAll"]);
/** Modifiers that change nothing about whether a case runs (a stray .only is the gate's job: allowOnly is false). */
const NEUTRAL_MODIFIERS = new Set(["only", "concurrent", "sequential", "shuffle", "each", "for"]);
const NEUTRAL_OPTIONS = new Set(["only", "concurrent", "sequential", "shuffle", "retry", "repeats", "timeout", "tags", "meta"]);

function parse(source: string): ts.SourceFile {
  return ts.createSourceFile("pinned.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isNonNullExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function literalBool(node: ts.Expression): boolean | undefined {
  const inner = unwrap(node);
  if (inner.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (inner.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

/** The registration chain of a callee (`it`, `it.skip`, `describe["skip"]`, `it.skipIf(c)`, `it.each(t)`), resolved through vitest imports. */
function chainOf(expression: ts.Expression, imports: ReadonlyMap<string, string>): Chain | undefined {
  const node = unwrap(expression);
  if (ts.isIdentifier(node)) {
    const local = imports.get(node.text) ?? node.text;
    if (SUITE_ROOTS.has(local)) return { kind: "describe", modifiers: [] };
    if (CASE_ROOTS.has(local)) return { kind: "it", modifiers: [] };
    return undefined;
  }
  if (ts.isPropertyAccessExpression(node)) {
    const base = chainOf(node.expression, imports);
    return base && { kind: base.kind, modifiers: [...base.modifiers, { name: node.name.text, args: [] }] };
  }
  if (ts.isElementAccessExpression(node)) {
    const base = chainOf(node.expression, imports);
    const key = ts.isStringLiteralLike(node.argumentExpression) ? node.argumentExpression.text : "<computed>";
    return base && { kind: base.kind, modifiers: [...base.modifiers, { name: key, args: [] }] };
  }
  if (ts.isCallExpression(node)) {
    const base = chainOf(node.expression, imports);
    const last = base?.modifiers.at(-1);
    if (!base || !last) return undefined;
    return { kind: base.kind, modifiers: [...base.modifiers.slice(0, -1), { name: last.name, args: [...node.arguments] }] };
  }
  return undefined;
}

function titleOf(call: ts.CallExpression, sf: ts.SourceFile): string | undefined {
  const first = call.arguments[0];
  if (!first) return undefined;
  if (ts.isStringLiteralLike(first)) return first.text;
  if (ts.isTemplateExpression(first)) return first.getText(sf).slice(1, -1);
  return undefined;
}

function scanSource(source: string): Scan {
  const sf = parse(source);
  const imports = new Map<string, string>();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) imports.set(element.name.text, (element.propertyName ?? element.name).text);
    }
  }
  const decls: Decl[] = [];
  const byCallback = new Map<ts.Node, Decl>();
  const calledNames = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression)) calledNames.add(node.expression.text);
      const modifierCall = ts.isCallExpression(node.parent) && node.parent.expression === node;
      const chain = modifierCall ? undefined : chainOf(node.expression, imports);
      if (chain) {
        const callback = [...node.arguments].reverse().find((arg): arg is Fn => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
        const decl: Decl = { kind: chain.kind, title: titleOf(node, sf), call: node, modifiers: chain.modifiers, callback };
        decls.push(decl);
        if (callback) byCallback.set(callback, decl);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { sf, imports, decls, byCallback, calledNames };
}

function problem(code: string, text: string): Problem {
  return { code, text };
}

/** Modifier-chain causes for one registration: `<scope>:skip`, `<scope>:skipIf(true)`, `<scope>:conditional-runIf`, ... */
function modifierProblems(modifiers: readonly Modifier[], scope: string): Problem[] {
  const found: Problem[] = [];
  for (const modifier of modifiers) {
    const arg = modifier.args[0] === undefined ? undefined : literalBool(modifier.args[0]);
    if (modifier.name === "skip" || modifier.name === "todo") {
      found.push(problem(`${scope}:${modifier.name}`, `carries the .${modifier.name} modifier`));
    } else if (modifier.name === "skipIf" || modifier.name === "runIf") {
      const disables = modifier.name === "skipIf" ? arg === true : arg === false;
      if (disables) found.push(problem(`${scope}:${modifier.name}(${String(arg)})`, `carries .${modifier.name}(${String(arg)}), which disables it`));
      else if (arg === undefined) found.push(problem(`${scope}:conditional-${modifier.name}`, `carries .${modifier.name} with a condition the census cannot prove`));
    } else if (modifier.name === "fails") {
      found.push(problem(`${scope}:fails`, "carries the .fails modifier, which inverts its verdict"));
    } else if (modifier.name === "<computed>") {
      found.push(problem(`${scope}:dynamic-modifier`, "is registered through a computed modifier the census cannot resolve"));
    } else if (!NEUTRAL_MODIFIERS.has(modifier.name)) {
      found.push(problem(`${scope}:unknown-modifier:${modifier.name}`, `carries the unrecognised modifier .${modifier.name}`));
    }
  }
  return found;
}

/** Options-object causes (`it("t", { skip: true }, fn)` and `it("t", fn, { todo: true })`). */
function optionProblems(call: ts.CallExpression, scope: string): Problem[] {
  const found: Problem[] = [];
  for (const arg of call.arguments.slice(1)) {
    if (!ts.isObjectLiteralExpression(arg)) continue;
    for (const property of arg.properties) {
      const key = ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property) ? property.name : undefined;
      const name = key && (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) ? key.text : undefined;
      if (name === undefined) {
        found.push(problem(`${scope}:dynamic-option`, "is registered with an options object the census cannot resolve"));
        continue;
      }
      const value = ts.isPropertyAssignment(property) ? literalBool(property.initializer) : undefined;
      if (name === "skip" || name === "todo" || name === "fails") {
        if (value === true) found.push(problem(`${scope}:option-${name}`, `is registered with { ${name}: true }`));
        else if (value === undefined) found.push(problem(`${scope}:option-conditional-${name}`, `is registered with { ${name} } set by a value the census cannot prove`));
      } else if (!NEUTRAL_OPTIONS.has(name)) {
        found.push(problem(`${scope}:unknown-option:${name}`, `is registered with the unrecognised option ${name}`));
      }
    }
  }
  return found;
}

/** `ctx.skip()` (or a destructured `skip()`) anywhere under `root`, where ctx is the first parameter of `fn`. */
function callsContextSkip(fn: Fn, root: ts.Node): boolean {
  const first = fn.parameters[0]?.name;
  const names = new Set<string>();
  if (first && ts.isIdentifier(first)) names.add(first.text);
  const destructured = new Set<string>();
  if (first && ts.isObjectBindingPattern(first)) {
    for (const element of first.elements) {
      const imported = element.propertyName ?? element.name;
      if (ts.isIdentifier(imported) && imported.text === "skip" && ts.isIdentifier(element.name)) destructured.add(element.name.text);
    }
  }
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression);
      if (ts.isPropertyAccessExpression(callee) && callee.name.text === "skip" && ts.isIdentifier(callee.expression) && names.has(callee.expression.text)) found = true;
      if (ts.isIdentifier(callee) && destructured.has(callee.text)) found = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}

/** A beforeEach/beforeAll hook directly under `statements` that skips through its context. */
function hookSkips(statements: readonly ts.Statement[], imports: ReadonlyMap<string, string>): boolean {
  for (const statement of statements) {
    if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) continue;
    const callee = unwrap(statement.expression.expression);
    if (!ts.isIdentifier(callee) || !HOOK_ROOTS.has(imports.get(callee.text) ?? callee.text)) continue;
    for (const arg of statement.expression.arguments) {
      if ((ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) && callsContextSkip(arg, arg.body)) return true;
    }
  }
  return false;
}

function isExpectRoot(expression: ts.Expression): boolean {
  const node = unwrap(expression);
  if (ts.isIdentifier(node)) return node.text === "expect";
  return ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "expect" && (node.name.text === "soft" || node.name.text === "poll");
}

/** `expect(x).toBe(y)`, `expect(p).rejects.toThrow()`, `expect.soft(x).not.toBe(y)`: a matcher INVOCATION rooted at an expect call. */
function isMatcherCall(call: ts.CallExpression): boolean {
  const callee = unwrap(call.expression);
  if (!ts.isPropertyAccessExpression(callee)) return false;
  let current: ts.Expression = callee.expression;
  for (;;) {
    current = unwrap(current);
    if (ts.isAwaitExpression(current)) current = current.expression;
    else if (ts.isPropertyAccessExpression(current)) current = current.expression;
    else if (ts.isCallExpression(current)) {
      if (isExpectRoot(current.expression)) return true;
      current = current.expression;
    } else return false;
  }
}

const CONDITIONAL_OPERATORS = new Set<ts.SyntaxKind>([ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken]);

/** An expect matcher call under `root` that is not behind a runtime condition. A function counts only when handed directly to a call. */
function reachesMatcher(root: ts.Node): boolean {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isCallExpression(node) && isMatcherCall(node)) {
      found = true;
      return;
    }
    if (ts.isIfStatement(node)) {
      const condition = literalBool(node.expression);
      if (condition === true) visit(node.thenStatement);
      else if (condition === false && node.elseStatement) visit(node.elseStatement);
      return;
    }
    if (ts.isConditionalExpression(node) || ts.isSwitchStatement(node)) return;
    if (ts.isBinaryExpression(node) && CONDITIONAL_OPERATORS.has(node.operatorToken.kind)) {
      visit(node.left);
      return;
    }
    if (ts.isFunctionLike(node)) {
      const parent = node.parent;
      if (ts.isCallExpression(parent) && parent.arguments.some(arg => arg === node) && "body" in node && node.body) visit(node.body);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}

function returnsEarly(statement: ts.Statement): boolean {
  if (ts.isReturnStatement(statement)) return true;
  if (ts.isBlock(statement)) {
    const last = statement.statements.at(-1);
    return last !== undefined && returnsEarly(last);
  }
  return false;
}

type Assertion = "reached" | "none" | "guarded";

/** Whether the case body still reaches an assertion: the third leg (exists / runs where / asserts). */
function assertionState(fn: Fn | undefined): Assertion {
  const body = fn?.body;
  if (!body) return "none";
  if (!ts.isBlock(body)) return reachesMatcher(body) ? "reached" : "none";
  let reached = false;
  for (const statement of body.statements) {
    if (ts.isIfStatement(statement) && !statement.elseStatement && literalBool(statement.expression) === undefined && returnsEarly(statement.thenStatement) && !reached) {
      return "guarded";
    }
    reached = reached || reachesMatcher(statement);
    if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) break;
  }
  return reached ? "reached" : "none";
}

const LOOPS = [ts.isForStatement, ts.isForOfStatement, ts.isForInStatement];

/** Whether a function-like ancestor of a registration actually runs: a suite callback, an IIFE, an iterator callback, or a function something calls. */
function functionRuns(fn: ts.Node, scan: Scan, generated: boolean): boolean {
  if (scan.byCallback.has(fn)) return true;
  let outer: ts.Node = fn;
  while (ts.isParenthesizedExpression(outer.parent)) outer = outer.parent;
  const parent = outer.parent;
  if (ts.isCallExpression(parent)) {
    if (parent.expression === outer) return true;
    const callee = unwrap(parent.expression);
    if (generated && ts.isPropertyAccessExpression(callee) && ["forEach", "map", "flatMap"].includes(callee.name.text)) return true;
    return false;
  }
  if (ts.isFunctionDeclaration(fn) && fn.name) return scan.calledNames.has(fn.name.text);
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) return scan.calledNames.has(parent.name.text);
  return false;
}

/** Causes that come from where a registration sits: enclosing suites, conditionals, loops and functions nobody calls. */
function enclosureProblems(decl: Decl, scan: Scan, generated: boolean): Problem[] {
  const found: Problem[] = [];
  let node: ts.Node = decl.call;
  while (node.parent) {
    node = node.parent;
    const suite = scan.byCallback.get(node);
    if (suite) {
      found.push(...modifierProblems(suite.modifiers, "suite"), ...optionProblems(suite.call, "suite"));
      const suiteBody = suite.callback?.body;
      if (suiteBody && ts.isBlock(suiteBody) && hookSkips(suiteBody.statements, scan.imports)) {
        found.push(problem("suite:hook-ctx-skip", "sits under a hook that skips through its context"));
      }
      continue;
    }
    if (ts.isFunctionLike(node)) {
      if (!functionRuns(node, scan, generated)) found.push(problem("enclosure:uncalled-function", "is registered inside a function nothing calls"));
      continue;
    }
    if (ts.isIfStatement(node) || ts.isConditionalExpression(node) || ts.isSwitchStatement(node) || ts.isTryStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node)) {
      found.push(problem("enclosure:conditional-registration", "is registered behind a runtime condition"));
    } else if (ts.isBinaryExpression(node) && CONDITIONAL_OPERATORS.has(node.operatorToken.kind)) {
      found.push(problem("enclosure:conditional-registration", "is registered behind a short-circuit"));
    } else if (LOOPS.some(check => check(node)) && !generated) {
      found.push(problem("enclosure:conditional-registration", "is registered inside a loop the pin does not declare"));
    }
  }
  if (hookSkips(scan.sf.statements, scan.imports)) found.push(problem("suite:hook-ctx-skip", "sits in a file whose top-level hook skips through its context"));
  return found;
}

/** The array literal an iterable expression names, directly or through a `const` in the same file. */
function resolveTable(expression: ts.Expression, scan: Scan): ts.ArrayLiteralExpression | undefined {
  const node = unwrap(expression);
  if (ts.isArrayLiteralExpression(node)) return node;
  if (!ts.isIdentifier(node)) return undefined;
  let found: ts.ArrayLiteralExpression | undefined;
  const visit = (candidate: ts.Node): void => {
    if (ts.isVariableDeclaration(candidate) && ts.isIdentifier(candidate.name) && candidate.name.text === node.text && candidate.initializer) {
      const initial = unwrap(candidate.initializer);
      if (ts.isArrayLiteralExpression(initial)) found = initial;
    }
    ts.forEachChild(candidate, visit);
  };
  visit(scan.sf);
  return found;
}

/** The tables a generated registration iterates: for-of loops around it and its .each/.for arguments. `undefined` entries could not be resolved. */
function tablesOf(decl: Decl, scan: Scan): (ts.ArrayLiteralExpression | undefined)[] {
  const sources: ts.Expression[] = [];
  for (let node: ts.Node | undefined = decl.call.parent; node; node = node.parent) {
    if (ts.isForOfStatement(node)) sources.push(node.expression);
  }
  for (const modifier of decl.modifiers) {
    const first = modifier.args[0];
    if ((modifier.name === "each" || modifier.name === "for") && first) sources.push(first);
  }
  return sources.map(source => resolveTable(source, scan));
}

/** Each-liveness: an emptied table registers zero cases, so the assertion probe never fires. The table must resolve and be non-empty. */
function tableProblems(decl: Decl, scan: Scan, generated: boolean): Problem[] {
  const tables = tablesOf(decl, scan);
  if (tables.length === 0) return generated ? [problem("pin:no-table", "is declared generated but no for-of loop or .each/.for table registers it")] : [];
  const found: Problem[] = [];
  if (tables.some(table => table === undefined)) found.push(problem("pin:unresolvable-table", "iterates a table the census cannot resolve to an array literal"));
  if (tables.some(table => table !== undefined && table.elements.length === 0)) found.push(problem("pin:empty-table", "iterates an empty table, so zero cases are registered"));
  return found;
}

/** `it`/`test` registrations nested under a describe callback. */
function childCases(suite: Decl, scan: Scan): Decl[] {
  return scan.decls.filter(candidate => {
    if (candidate.kind !== "it") return false;
    for (let node: ts.Node | undefined = candidate.call.parent; node; node = node.parent) if (node === suite.callback) return true;
    return false;
  });
}

/** Every cause one registration is not a live, asserting case. Empty means it runs and asserts. */
function caseProblems(decl: Decl, scan: Scan, generated: boolean): Problem[] {
  const found: Problem[] = [
    ...modifierProblems(decl.modifiers, "pin"),
    ...optionProblems(decl.call, "pin"),
    ...enclosureProblems(decl, scan, generated),
    ...tableProblems(decl, scan, generated),
  ];
  if (decl.kind === "it") {
    if (decl.callback && callsContextSkip(decl.callback, decl.callback.body)) found.push(problem("pin:ctx-skip", "skips through its own context in the body"));
    const state = assertionState(decl.callback);
    if (state === "none") found.push(problem("pin:no-assertion-reached", "no longer reaches an assertion (empty, hollowed, or every matcher is unreachable)"));
    if (state === "guarded") found.push(problem("pin:guarded-early-return", "returns early on a runtime condition before its first assertion, so it can pass vacuously"));
  } else {
    const live = childCases(decl, scan).filter(child => modifierProblems(child.modifiers, "pin").length === 0 && optionProblems(child.call, "pin").length === 0 && assertionState(child.callback) === "reached");
    if (live.length === 0) found.push(problem("pin:no-asserting-child", "has no live case beneath it that reaches an assertion"));
  }
  return found;
}

// ---------------------------------------------------------------------------
// Tier truth: a label must be true of the vitest/forge configuration.
// ---------------------------------------------------------------------------

/** `test.include` / `test.exclude` of vitest.config.ts, read from the syntax tree (never executed). */
function gateConfigFrom(source: string): { include: string[]; exclude: string[] } | undefined {
  const sf = parse(source);
  const found: { include?: string[]; exclude?: string[] } = {};
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && (node.name.text === "include" || node.name.text === "exclude") && ts.isArrayLiteralExpression(node.initializer)) {
      const owner = node.parent.parent;
      if (ts.isPropertyAssignment(owner) && ts.isIdentifier(owner.name) && owner.name.text === "test") {
        found[node.name.text] = node.initializer.elements.filter(ts.isStringLiteralLike).map(element => element.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found.include && found.exclude ? { include: found.include, exclude: found.exclude } : undefined;
}

function runsInDefaultGate(file: string, gate: GateConfig): boolean {
  return gate.include.some(glob => matchesGlob(file, glob)) && !gate.exclude.some(glob => glob === file || matchesGlob(file, glob));
}

/** Read-only registration probe: a non-comment forge.toml line names the file. */
function registeredInForge(file: string, gate: GateConfig): boolean {
  return gate.forgeToml.split("\n").some(line => !line.trimStart().startsWith("#") && line.includes(file));
}

function tierProblems(pin: Pin, gate: GateConfig): Problem[] {
  if (!TIERS.includes(pin.tier)) return [problem("tier:vocabulary", `tier "${pin.tier}" is not a docs/14 truth label`)];
  const inGate = runsInDefaultGate(pin.file, gate);
  if (OFF_GATE_TIERS.includes(pin.tier)) {
    const found: Problem[] = [];
    if (inGate) found.push(problem("tier:off-gate-label-runs-in-default-gate", `claims "${pin.tier}" but the default gate runs ${pin.file}`));
    if (!registeredInForge(pin.file, gate)) found.push(problem("tier:off-gate-label-unregistered", `claims "${pin.tier}" but no forge.toml command names ${pin.file}`));
    return found;
  }
  return inGate ? [] : [problem("tier:excluded-from-default-gate", `claims "${pin.tier}" but the default gate does not run ${pin.file}`)];
}

function auditPin(row: Row, pin: Pin, env: Env): Problem[] {
  const where = `row ${row.id}: ${pin.file} "${pin.title}"`;
  const tagged = (found: Problem[]): Problem[] => found.map(item => problem(item.code, `${where}: ${item.text}`));
  const tier = tierProblems(pin, env.gate);
  if (tier.some(item => item.code === "tier:vocabulary")) return tagged(tier);
  const source = env.read(pin.file);
  if (source === undefined) return tagged([problem("pin:file-missing", "pinned file is missing"), ...tier]);
  const syntax = ts.transpileModule(source, { reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022 } }).diagnostics ?? [];
  const scan = scanSource(source);
  const matching = scan.decls.filter(decl => decl.title === pin.title);
  const found: Problem[] = [...tier];
  if (syntax.length > 0) found.push(problem("pin:syntax-error", "does not parse, so none of its cases run"));
  if (matching.length === 0) found.push(problem("pin:no-live-case", "no live registration with this verbatim title (renamed, deleted, commented out, or only inside a string)"));
  if (matching.length > 1) found.push(problem("pin:ambiguous-title", `title is registered ${matching.length} times, so the pin is ambiguous`));
  for (const decl of matching.slice(0, 1)) {
    if (decl.kind !== pin.kind) found.push(problem("pin:wrong-kind", `is pinned as ${pin.kind} but registered as ${decl.kind}`));
    found.push(...caseProblems(decl, scan, pin.generated === true));
  }
  const arrays = new Set<string>();
  const collect = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) arrays.add(node.getText(scan.sf));
    ts.forEachChild(node, collect);
  };
  collect(scan.sf);
  const tables = matching[0] ? tablesOf(matching[0], scan).filter((table): table is ts.ArrayLiteralExpression => table !== undefined) : [];
  for (const anchor of pin.anchors ?? []) {
    const present = pin.generated ? tables.some(table => table.elements.some(element => element.getText(scan.sf) === anchor)) : arrays.has(anchor);
    if (!present) found.push(problem("pin:anchor-missing", `anchor ${JSON.stringify(anchor)} no longer appears as a row of the pinned table (or as an array literal in code)`));
  }
  return tagged(found);
}

/** Every reason this row is not what it claims to be. Empty means the row's declared status is honest. */
function auditRow(row: Row, env: Env): Problem[] {
  const found: Problem[] = [];
  const add = (code: string, text: string): void => {
    found.push(problem(code, `row ${row.id}: ${text}`));
  };
  const modes = [...new Set(row.pins.map(pin => pin.mode))].sort();
  if (JSON.stringify(modes) !== JSON.stringify([...row.covers].sort())) {
    add("row:covers-drift", `declares covers ${JSON.stringify(row.covers)} but the pins cover ${JSON.stringify(modes)}`);
  }
  switch (row.status) {
    case "unpinned":
      if (row.pins.length > 0) add("row:unpinned-with-pins", `is unpinned yet lists ${row.pins.length} pin(s)`);
      if ((row.reason ?? "").trim().length < 20) add("row:unpinned-no-reason", "an unpinned row needs a written reason");
      break;
    case "single-mode":
      if (!row.dualMode) add("row:single-mode-not-dual", "only a dual-mode requirement can be recorded single-mode");
      if (row.pins.length === 0) add("row:single-mode-no-pin", "single-mode with no pin at all is unpinned");
      if (row.pins.some(pin => pin.mode === "both")) add("row:promote", 'a "both" pin exists, so the row must be promoted to dual-mode');
      if ((row.unmet ?? "").trim().length < 20) add("row:no-missing-comparison", "a single-mode row must write the missing comparison");
      break;
    case "dual-mode":
      if (!row.dualMode) add("row:dual-mode-not-dual", "not a dual-mode requirement");
      if (!row.pins.some(pin => pin.mode === "both")) {
        add("row:dual-mode-needs-both", "dual-mode needs a case that runs the same fixture under BOTH modes; single-mode cases never satisfy it");
      }
      break;
    case "pinned":
      if (row.dualMode) add("row:dual-never-plain-pinned", 'a dual-mode requirement is never plain "pinned"');
      if (row.pins.length === 0) add("row:pinned-no-pin", "pinned with no pin");
      break;
  }
  for (const pin of row.pins) found.push(...auditPin(row, pin, env));
  return found;
}

/** Only a plain pinned row or a proven dual-mode row counts. Single-mode and unpinned rows never do. */
const satisfied = (row: Row): boolean => row.status === "pinned" || row.status === "dual-mode";

const causes = (found: readonly Problem[]): string[] => found.map(item => item.code);

// ---------------------------------------------------------------------------
// Docs sections: rendered-text bound, unique heading, exact text.
// ---------------------------------------------------------------------------

type Section = { readonly ok: true; readonly text: string; readonly raw: string } | { readonly ok: false; readonly cause: "heading-missing" | "heading-not-unique" };

/** HTML comments render as nothing: blank them (keeping their newlines, so line numbers align with the raw text). */
function blankComments(doc: string): string {
  return doc.replace(/<!--[\s\S]*?-->/g, match => match.replace(/[^\n]/g, ""));
}

/** The section under a level-2 heading: uniqueness, bound and text all taken over the SAME rendered view; `raw` is the same line range unrendered. */
function sectionOf(doc: string, heading: string): Section {
  const raw = doc.split("\n");
  const rendered = blankComments(doc).split("\n");
  const headings: { level: number; text: string; line: number }[] = [];
  let fenced = false;
  rendered.forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (fenced) return;
    const match = /^(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/.exec(line);
    if (match) headings.push({ level: (match[1] ?? "").length, text: match[2] ?? "", line: index });
  });
  const hits = headings.filter(candidate => candidate.level === 2 && candidate.text === heading);
  const [first, ...rest] = hits;
  if (!first) return { ok: false, cause: "heading-missing" };
  if (rest.length > 0) return { ok: false, cause: "heading-not-unique" };
  const next = headings.find(candidate => candidate.line > first.line && candidate.level <= 2);
  const end = next ? next.line : rendered.length;
  return { ok: true, text: rendered.slice(first.line + 1, end).join("\n").trim(), raw: raw.slice(first.line + 1, end).join("\n").trim() };
}

/** Causes the docs/05 Conformance section is not the three sentences this census binds. */
function docsProblems(doc: string): string[] {
  const section = sectionOf(doc, "Conformance");
  if (!section.ok) return [`docs:${section.cause}`];
  if (section.text !== `${S1} ${S2} ${S3}`) return ["docs:text-drift"];
  return section.raw.includes("<!--") ? ["docs:hidden-comment"] : [];
}

/** Causes the docs/14 truth-label section does not still list the five labels this census checks tiers against. */
function vocabularyProblems(doc: string): string[] {
  const section = sectionOf(doc, TRUTH_HEADING);
  if (!section.ok) return [`vocabulary:${section.cause}`];
  const listed = TIERS.map(tier => `"${tier}"`).join(", ");
  return section.text.includes(listed) ? [] : ["vocabulary:drift"];
}

// ---------------------------------------------------------------------------
// The census against the repository.
// ---------------------------------------------------------------------------

const configSource = readFileSync(`${ROOT}${VITEST_CONFIG_PATH}`, "utf8");
const realConfig = gateConfigFrom(configSource);
const REAL: Env = {
  read: readFromDisk,
  gate: {
    include: realConfig?.include ?? [],
    exclude: realConfig?.exclude ?? [],
    forgeToml: readFileSync(`${ROOT}${FORGE_TOML_PATH}`, "utf8"),
  },
};

describe("docs Conformance census: the requirement text and the label vocabulary", () => {
  const doc = readFileSync(`${ROOT}${DOC_PATH}`, "utf8");

  it("still says exactly the three sentences this census binds, in one unique section", () => {
    expect(docsProblems(doc)).toEqual([]);
  });

  it("binds every row to a fragment of the sentence it claims", () => {
    const sentences = { 1: S1, 2: S2, 3: S3 } as const;
    for (const row of ROWS) {
      expect(sentences[row.sentence], `row ${row.id}`).toContain(row.requirement);
    }
  });

  it("holds eleven rows: five for sentence 1, one for sentence 2, five for sentence 3", () => {
    expect(ROWS).toHaveLength(11);
    expect(ROWS.filter(row => row.sentence === 1)).toHaveLength(5);
    expect(ROWS.filter(row => row.sentence === 2)).toHaveLength(1);
    expect(ROWS.filter(row => row.sentence === 3)).toHaveLength(5);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(11);
    // Sentence 1 is the dual-mode sentence; the other ten are not.
    expect(ROWS.filter(row => row.dualMode).map(row => row.sentence)).toEqual([1, 1, 1, 1, 1]);
  });

  it("binds the tier vocabulary to the docs/14 truth-label section, not to a constant", () => {
    expect(vocabularyProblems(readFileSync(`${ROOT}${TRUTH_DOC_PATH}`, "utf8"))).toEqual([]);
    expect(TIERS).toHaveLength(5);
  });
});

describe("docs Conformance census: tier labels are true of the gate configuration", () => {
  it("reads test.include and test.exclude from vitest.config.ts", () => {
    expect(realConfig?.include).toContain("test/**/*.test.ts");
    expect(realConfig?.exclude.length ?? 0).toBeGreaterThan(0);
  });

  it("finds every pinned file in the default gate, so no pin may claim an off-gate label", () => {
    const pins = ROWS.flatMap(row => row.pins);
    expect(pins.length).toBeGreaterThan(0);
    for (const pin of pins) {
      expect(runsInDefaultGate(pin.file, REAL.gate), pin.file).toBe(true);
      expect(OFF_GATE_TIERS, pin.file).not.toContain(pin.tier);
      expect(tierProblems(pin, REAL.gate), pin.file).toEqual([]);
    }
  });
});

describe("docs Conformance census: every row is bound to a live, asserting case", () => {
  for (const row of ROWS) {
    it(`${row.id} (${row.status}) is honest and every pin resolves by file, verbatim title, kind, tier and assertion`, () => {
      expect(auditRow(row, REAL).map(item => item.text)).toEqual([]);
    });
  }

  it("counts exactly the rows expected as satisfied, and never a single-mode or unpinned one", () => {
    expect(ROWS.filter(satisfied).map(row => row.id)).toEqual(SATISFIED);
    expect(ROWS.filter(row => !satisfied(row)).map(row => row.id)).toEqual(NOT_SATISFIED);
    expect(ROWS.filter(row => row.status === "unpinned")).toEqual([]);
  });

  it("pins the landed capability_invoke prototype-key suite (wb-8i1) and states what the pollution row still cannot prove", () => {
    const row = ROWS.find(candidate => candidate.id === "S3-prototype-pollution");
    expect(row?.pins.map(pin => `${pin.file}|${pin.kind}|${pin.title}`)).toContain(
      `${CAPABILITY_TOOLS}|describe|raw-input prototype keys refuse with the registry oracle's text (wb-8i1)`,
    );
    expect(row?.gap).toContain("wb-8i1, landed");
    expect(row?.gap).toContain("capability_invoke");
    expect(row?.gap).toContain("node() call");
    expect(row?.gap).not.toContain("not landed");
  });
});

// ---------------------------------------------------------------------------
// Falsifiers: the census is only evidence if it goes red, for the NAMED cause,
// when a pin is lost. Every assertion below is on the exact cause codes.
// ---------------------------------------------------------------------------

describe("docs Conformance census: scanner falsifiers", () => {
  const FILE = "test/fixture-pinned.test.ts";
  const GATE: GateConfig = { include: ["test/**/*.test.ts"], exclude: [], forgeToml: "" };
  const IMPORT = 'import { beforeEach, describe, expect, it } from "vitest";';
  const CASE_ONE = 'it("pinned case one", () => { expect(1).toBe(1); });';
  const CASE_TWO = ["it(", '  "pinned case two",', "  () => { expect(2).toBe(2); },", ");"].join("\n");
  const suite = (inner: string, head = 'describe("suite", () => {'): string => [IMPORT, head, inner, "});", ""].join("\n");
  const SOURCE = suite(`${CASE_ONE}\n${CASE_TWO}`);
  const bare = (inner: string): string => [IMPORT, inner, ""].join("\n");

  const env = (source: string | undefined, gate: GateConfig = GATE): Env => ({ read: file => (file === FILE ? source : undefined), gate });
  const pin = (overrides: Partial<Pin> = {}): Pin => ({ file: FILE, title: "pinned case one", kind: "it", tier: "fixture pass", mode: "neutral", ...overrides });
  const row = (overrides: Partial<Row> = {}): Row => ({
    id: "T-row",
    sentence: 3,
    requirement: "cycles",
    dualMode: false,
    status: "pinned",
    covers: ["neutral"],
    pins: [pin()],
    ...overrides,
  });
  const audit = (source: string | undefined, overrides: Partial<Row> = {}, gate?: GateConfig): string[] => causes(auditRow(row(overrides), env(source, gate)));
  /** Replace the pinned case line with `replacement`. */
  const withCase = (replacement: string): string => SOURCE.replace(CASE_ONE, replacement);

  it("accepts a live case, including one whose call spans several lines", () => {
    expect(audit(SOURCE)).toEqual([]);
    expect(audit(SOURCE, { pins: [pin({ title: "pinned case two" })] })).toEqual([]);
  });

  it("goes red naming the row and the cause when a pinned case is renamed", () => {
    const found = auditRow(row(), env(SOURCE.replace("pinned case one", "pinned case 1")));
    expect(causes(found)).toEqual(["pin:no-live-case"]);
    expect(found[0]?.text).toContain("row T-row");
  });

  it("goes red when a pinned case is deleted or its file is gone", () => {
    expect(audit(SOURCE.replace(CASE_ONE, ""))).toEqual(["pin:no-live-case"]);
    expect(audit(undefined)).toEqual(["pin:file-missing"]);
  });

  it("goes red when a pinned case is commented out, on one line or across a block comment", () => {
    expect(audit(withCase(`// ${CASE_ONE}`))).toEqual(["pin:no-live-case"]);
    expect(audit(withCase(`/*\n${CASE_ONE}\n*/`))).toEqual(["pin:no-live-case"]);
  });

  it("S11 does not mistake a string or template literal that spells the call for a live case", () => {
    expect(audit(withCase("const decoy = `it(\"pinned case one\", () => { expect(1).toBe(1); })`;"))).toEqual(["pin:no-live-case"]);
    expect(audit(withCase("const decoy = 'it(\"pinned case one\", () => {})';"))).toEqual(["pin:no-live-case"]);
  });

  it("goes red when the title is declared twice, so the pin would be ambiguous", () => {
    expect(audit(`${SOURCE}${CASE_ONE}\n`)).toEqual(["pin:ambiguous-title"]);
  });

  it("goes red when a pin names the wrong kind", () => {
    expect(audit(SOURCE, { pins: [pin({ kind: "describe" })] })).toEqual(["pin:wrong-kind"]);
  });

  it("goes red when a pinned file stops parsing", () => {
    expect(audit(`${SOURCE}\nconst = ;\n`)).toContain("pin:syntax-error");
  });

  describe("modifiers that disable the case name their own cause", () => {
    it.each([
      [".skip", "pin:skip"],
      [".todo", "pin:todo"],
      [".skipIf(true)", "pin:skipIf(true)"],
      [".runIf(false)", "pin:runIf(false)"],
      [".fails", "pin:fails"],
      ['["skip"]', "pin:skip"],
      [".concurrent.skip", "pin:skip"],
    ])("%s", (modifier, cause) => {
      expect(audit(withCase(CASE_ONE.replace("it(", `it${modifier}(`)))).toEqual([cause]);
    });

    it("A1 reports skipIf(true) as skipIf(true), never as a missing case", () => {
      expect(audit(withCase(CASE_ONE.replace("it(", "it.skipIf(true)(")))).toEqual(["pin:skipIf(true)"]);
    });

    it("refuses a modifier whose condition the census cannot prove", () => {
      expect(audit(withCase(CASE_ONE.replace("it(", "it.skipIf(process.env.CI)(")))).toEqual(["pin:conditional-skipIf"]);
      expect(audit(withCase(CASE_ONE.replace("it(", "it.runIf(Boolean(process.env.LIVE))(")))).toEqual(["pin:conditional-runIf"]);
    });

    it("refuses a computed or unrecognised modifier rather than guessing", () => {
      expect(audit(withCase(CASE_ONE.replace("it(", "it[kind](")))).toEqual(["pin:dynamic-modifier"]);
      expect(audit(withCase(CASE_ONE.replace("it(", "it.mystery(")))).toEqual(["pin:unknown-modifier:mystery"]);
    });

    it("resolves an aliased vitest import", () => {
      const aliased = (call: string): string => ['import { expect, it as spec } from "vitest";', call, ""].join("\n");
      expect(audit(aliased('spec("pinned case one", () => { expect(1).toBe(1); });'))).toEqual([]);
      expect(audit(aliased('spec.skip("pinned case one", () => { expect(1).toBe(1); });'))).toEqual(["pin:skip"]);
    });
  });

  describe("A2-A5 modifiers and text that do not disable the case stay green", () => {
    it.each([".concurrent", ".sequential", ".skipIf(false)", ".runIf(true)", ".only"])("%s on the pinned case", modifier => {
      expect(audit(withCase(CASE_ONE.replace("it(", `it${modifier}(`)))).toEqual([]);
    });

    it("A4 a comment or string that mentions skip, todo or only changes nothing", () => {
      const noisy = suite(
        [
          '// it.skip("pinned case one"); it.only("x"); describe.todo("y")',
          "/* it.skip(",
          '   "pinned case one") */',
          'const note = "it.skip(\'pinned case one\')";',
          CASE_ONE,
        ].join("\n"),
      );
      expect(audit(noisy)).toEqual([]);
    });

    it("a stray .only elsewhere is the gate's job (allowOnly is false on trunk), not a census text check", () => {
      expect(audit(`${SOURCE}it.only("other", () => { expect(3).toBe(3); });\n`)).toEqual([]);
      expect(runsInDefaultGate(FILE, GATE)).toBe(true);
    });

    it("a skipped unrelated sibling does not touch the pin", () => {
      expect(audit(SOURCE.replace("it(\n", "it.skip(\n"))).toEqual([]);
    });
  });

  describe("options objects", () => {
    it("S5 refuses { skip: true } on the case, in either position", () => {
      expect(audit(withCase('it("pinned case one", { skip: true }, () => { expect(1).toBe(1); });'))).toEqual(["pin:option-skip"]);
      expect(audit(withCase('it("pinned case one", () => { expect(1).toBe(1); }, { skip: true });'))).toEqual(["pin:option-skip"]);
    });

    it("S6 refuses { todo: true } and { fails: true }", () => {
      expect(audit(withCase('it("pinned case one", { todo: true }, () => { expect(1).toBe(1); });'))).toEqual(["pin:option-todo"]);
      expect(audit(withCase('it("pinned case one", { fails: true }, () => { expect(1).toBe(1); });'))).toEqual(["pin:option-fails"]);
    });

    it("refuses an option the census cannot prove, and an unknown one", () => {
      expect(audit(withCase('it("pinned case one", { skip: flag }, () => { expect(1).toBe(1); });'))).toEqual(["pin:option-conditional-skip"]);
      expect(audit(withCase('it("pinned case one", { ...rest }, () => { expect(1).toBe(1); });'))).toEqual(["pin:dynamic-option"]);
      expect(audit(withCase('it("pinned case one", { mystery: 1 }, () => { expect(1).toBe(1); });'))).toEqual(["pin:unknown-option:mystery"]);
    });

    it("keeps { skip: false }, { timeout }, { concurrent } and a numeric timeout green", () => {
      expect(audit(withCase('it("pinned case one", { skip: false, timeout: 50, concurrent: true }, () => { expect(1).toBe(1); });'))).toEqual([]);
      expect(audit(withCase('it("pinned case one", () => { expect(1).toBe(1); }, 50);'))).toEqual([]);
    });
  });

  describe("an enclosing suite that is disabled names the suite", () => {
    it.each([
      ["describe.skip", "suite:skip"],
      ["describe.todo", "suite:todo"],
      ["describe.runIf(false)", "suite:runIf(false)"],
      ["describe.skipIf(true)", "suite:skipIf(true)"],
      ["suite.skip", "suite:skip"],
      ["suite.skipIf(true)", "suite:skipIf(true)"],
      ["describe.concurrent.skip", "suite:skip"],
      ['describe["skip"]', "suite:skip"],
    ])("%s", (wrapper, cause) => {
      expect(audit(SOURCE.replace('describe("suite"', `${wrapper}("suite"`))).toEqual([cause]);
    });

    it("S1 refuses an options-object describe, which one edit turns into 11 skipped cases", () => {
      expect(audit(SOURCE.replace('describe("suite", () => {', 'describe("suite", { skip: true }, () => {'))).toEqual(["suite:option-skip"]);
    });

    it("S3 refuses a hook that skips through its context, in the suite or at the top of the file", () => {
      expect(audit(suite(`beforeEach(ctx => { ctx.skip(); });\n${CASE_ONE}`))).toEqual(["suite:hook-ctx-skip"]);
      expect(audit(bare(`beforeEach(({ skip }) => { skip(); });\n${suite(CASE_ONE)}`))).toEqual(["suite:hook-ctx-skip"]);
      expect(audit(suite(`beforeEach(() => { expect(0).toBe(0); });\n${CASE_ONE}`))).toEqual([]);
    });

    it("keeps a concurrent suite and a skipIf(false) suite green", () => {
      expect(audit(SOURCE.replace('describe("suite"', 'describe.concurrent("suite"'))).toEqual([]);
      expect(audit(SOURCE.replace('describe("suite"', 'describe.skipIf(false)("suite"'))).toEqual([]);
    });
  });

  describe("registration that never happens, or happens only sometimes", () => {
    it("S7 refuses ctx.skip() in the body of the case", () => {
      expect(audit(withCase('it("pinned case one", ctx => { ctx.skip(); expect(1).toBe(1); });'))).toEqual(["pin:ctx-skip"]);
      expect(audit(withCase('it("pinned case one", ({ skip }) => { skip(); expect(1).toBe(1); });'))).toEqual(["pin:ctx-skip"]);
    });

    it("S8 refuses conditional registration: if, ternary and short-circuit", () => {
      expect(audit(withCase(`if (process.env.LIVE) { ${CASE_ONE} }`))).toEqual(["enclosure:conditional-registration"]);
      expect(audit(withCase(`process.env.LIVE ? ${CASE_ONE.slice(0, -1)} : undefined;`))).toEqual(["enclosure:conditional-registration"]);
      expect(audit(withCase(`process.env.LIVE && ${CASE_ONE}`))).toEqual(["enclosure:conditional-registration"]);
    });

    it("S12 refuses registration inside a function nothing calls, and accepts one that is called", () => {
      expect(audit(withCase(`const register = () => { ${CASE_ONE} };`))).toEqual(["enclosure:uncalled-function"]);
      expect(audit(withCase(`const register = () => { ${CASE_ONE} };\nregister();`))).toEqual([]);
      expect(audit(withCase(`(() => { ${CASE_ONE} });`))).toEqual(["enclosure:uncalled-function"]);
      expect(audit(withCase(`(() => { ${CASE_ONE} })();`))).toEqual([]);
    });

    it("refuses a loop around the case unless the pin declares itself generated", () => {
      const looped = withCase(`for (const name of ["a"]) { it(\`pinned \${name}\`, () => { expect(name).toBe("a"); }); }`);
      expect(audit(looped, { pins: [pin({ title: "pinned $" + "{name}" })] })).toEqual(["enclosure:conditional-registration"]);
      expect(audit(looped, { pins: [pin({ title: "pinned $" + "{name}", generated: true })] })).toEqual([]);
    });
  });

  describe("the third leg: a pinned case must still reach an assertion", () => {
    it("S10 refuses a hollowed body: empty, comment-only, matcher-less, or unreachable", () => {
      const hollow = (body: string): string[] => audit(withCase(`it("pinned case one", () => { ${body}\n});`));
      expect(hollow("")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("// expect(1).toBe(1);")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("expect(1);")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("return; expect(1).toBe(1);")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("throw new Error('x'); expect(1).toBe(1);")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("const later = () => { expect(1).toBe(1); };")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("if (false) { expect(1).toBe(1); }")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("if (process.env.LIVE) { expect(1).toBe(1); }")).toEqual(["pin:no-assertion-reached"]);
      expect(hollow("process.env.LIVE && expect(1).toBe(1);")).toEqual(["pin:no-assertion-reached"]);
    });

    it("S10 refuses a case with no callback at all", () => {
      expect(audit(withCase('it("pinned case one");'))).toEqual(["pin:no-assertion-reached"]);
      expect(audit(withCase('it("pinned case one", handler);'))).toEqual(["pin:no-assertion-reached"]);
    });

    it("refuses an environment-guarded early return before the first assertion", () => {
      expect(audit(withCase('it("pinned case one", () => { if (process.env.CI) return; expect(1).toBe(1); });'))).toEqual(["pin:guarded-early-return"]);
      expect(audit(withCase('it("pinned case one", () => { if (process.env.CI) { return; } expect(1).toBe(1); });'))).toEqual(["pin:guarded-early-return"]);
    });

    it("accepts the assertion shapes the pinned files really use", () => {
      const ok = (body: string): string[] => audit(withCase(`it("pinned case one", async () => { ${body} });`));
      expect(ok("expect(1).toBe(1);")).toEqual([]);
      expect(ok("expect(1).not.toBe(2);")).toEqual([]);
      expect(ok("await expect(Promise.reject(new Error('x'))).rejects.toThrow();")).toEqual([]);
      expect(ok("expect.soft(1).toBe(1);")).toEqual([]);
      expect(ok("if (!process.env.X) throw new Error('no'); expect(1).toBe(1);")).toEqual([]);
      expect(ok("expect(1).toBe(1); if (process.env.CI) return;")).toEqual([]);
      expect(ok("await run(() => { expect(1).toBe(1); });")).toEqual([]);
      expect(ok("for (const n of [1]) { expect(n).toBe(1); }")).toEqual([]);
      expect(audit(withCase('it("pinned case one", () => expect(1).toBe(1));'))).toEqual([]);
    });

    it("applies to a describe pin through its children: one live asserting child is enough, none is red", () => {
      const asDescribe = { pins: [pin({ title: "suite", kind: "describe" })] };
      expect(audit(SOURCE, asDescribe)).toEqual([]);
      expect(audit(suite('it("only child", () => {});'), asDescribe)).toEqual(["pin:no-asserting-child"]);
      expect(audit(suite('it.skip("only child", () => { expect(1).toBe(1); });'), asDescribe)).toEqual(["pin:no-asserting-child"]);
      expect(audit(suite('it.skip("a", () => { expect(1).toBe(1); });\nit("b", () => { expect(2).toBe(2); });'), asDescribe)).toEqual([]);
      expect(audit(SOURCE.replace('describe("suite", () => {', 'describe.skip("suite", () => {'), asDescribe)).toEqual(["pin:skip"]);
    });
  });

  describe("tier truth: a label must be true of the vitest and forge configuration", () => {
    const FORGE_LINE = `[build.commands.live]\ncommand = "vitest run ${FILE}"\n`;

    it("T1 goes red when the pinned file is excluded from the default gate", () => {
      expect(audit(SOURCE, {}, { ...GATE, exclude: [FILE] })).toEqual(["tier:excluded-from-default-gate"]);
      expect(audit(SOURCE, {}, { ...GATE, include: ["test/other/**/*.test.ts"] })).toEqual(["tier:excluded-from-default-gate"]);
      expect(audit(SOURCE, {}, { ...GATE, exclude: ["test/**/*.test.ts"] })).toEqual(["tier:excluded-from-default-gate"]);
    });

    it("T2 goes red when an off-gate label is put on a file the default gate runs", () => {
      expect(audit(SOURCE, { pins: [pin({ tier: "live SDK pass" })] }, { ...GATE, forgeToml: FORGE_LINE })).toEqual(["tier:off-gate-label-runs-in-default-gate"]);
      expect(audit(SOURCE, { pins: [pin({ tier: "scale benchmark pass" })] }, { ...GATE, forgeToml: FORGE_LINE })).toEqual(["tier:off-gate-label-runs-in-default-gate"]);
    });

    it("accepts an off-gate label only when the file is excluded AND a forge command names it", () => {
      const off = { pins: [pin({ tier: "live SDK pass" })] };
      expect(audit(SOURCE, off, { ...GATE, exclude: [FILE], forgeToml: FORGE_LINE })).toEqual([]);
      expect(audit(SOURCE, off, { ...GATE, exclude: [FILE], forgeToml: "" })).toEqual(["tier:off-gate-label-unregistered"]);
      expect(audit(SOURCE, off, { ...GATE, exclude: [FILE], forgeToml: `# command = "vitest run ${FILE}"\n` })).toEqual(["tier:off-gate-label-unregistered"]);
    });

    it("T3 goes red when a tier is outside the docs/14 vocabulary", () => {
      expect(audit(SOURCE, { pins: [pin({ tier: "passes" as unknown as Tier })] })).toEqual(["tier:vocabulary"]);
    });

    it("reads include and exclude from the test block only, never from coverage", () => {
      const synthetic = 'export default { test: { include: ["a/**"], exclude: ["a/x.ts"], coverage: { include: ["src/**"] } } };';
      expect(gateConfigFrom(synthetic)).toEqual({ include: ["a/**"], exclude: ["a/x.ts"] });
      expect(gateConfigFrom("export default { test: { coverage: { include: [] } } };")).toBeUndefined();
    });
  });

  describe("each-liveness: a generated pin must iterate a resolvable, non-empty table that holds its anchor row", () => {
    const table = (rows: string): string => `const table: string[][] = ${rows};`;
    const looped = (rows: string): string =>
      bare(`${table(rows)}\nfor (const [name] of table) { it(\`pinned $` + `{name}\`, () => { expect(name).toBe("a"); }); }`);
    const generated = (overrides: Partial<Pin> = {}): Partial<Row> => ({ pins: [pin({ title: "pinned $" + "{name}", generated: true, ...overrides })] });

    it("accepts a non-empty table, and the anchor as one of its rows", () => {
      expect(audit(looped('[["a"], ["b"]]'), generated())).toEqual([]);
      expect(audit(looped('[["a"], ["b"]]'), generated({ anchors: ['["b"]'] }))).toEqual([]);
    });

    it("F4 refuses an emptied table, which registers zero cases while the assertion probe stays green", () => {
      expect(audit(looped("[]"), generated())).toEqual(["pin:empty-table"]);
    });

    it("refuses a table it cannot resolve, and a generated pin nothing iterates", () => {
      expect(audit(bare("for (const [name] of load()) { it(`pinned $" + "{name}`, () => { expect(name).toBe(\"a\"); }); }"), generated())).toEqual(["pin:unresolvable-table"]);
      expect(audit(withCase('it(`pinned $' + '{name}`, () => { expect(1).toBe(1); });'), generated())).toEqual(["pin:no-table"]);
    });

    it("refuses an anchor row that sits outside the table the case iterates", () => {
      expect(audit(`${looped('[["a"]]')}const other = [["b"]];\n`, generated({ anchors: ['["b"]'] }))).toEqual(["pin:anchor-missing"]);
    });

    it("applies the same liveness to it.each and it.for", () => {
      const each = (rows: string, form = "each"): string => bare(`it.${form}(${rows})("pinned case one", () => { expect(1).toBe(1); });`);
      expect(audit(each("[[1], [2]]"))).toEqual([]);
      expect(audit(each("[]"))).toEqual(["pin:empty-table"]);
      expect(audit(each("[]", "for"))).toEqual(["pin:empty-table"]);
      expect(audit(each("load()"))).toEqual(["pin:unresolvable-table"]);
    });
  });

  it("goes red when an anchor a generated title depends on stops being array code", () => {
    const anchored = { pins: [pin({ anchors: ['["a cycle", "x"]'] })] };
    expect(audit(SOURCE, anchored)).toEqual(["pin:anchor-missing"]);
    expect(audit(`${SOURCE}// ["a cycle", "x"]\n`, anchored)).toEqual(["pin:anchor-missing"]);
    expect(audit(`${SOURCE}const table = [["a cycle", "x"]];\n`, anchored)).toEqual([]);
  });

  it("goes red when a row's declared mode coverage drifts from its pins", () => {
    expect(audit(SOURCE, { covers: ["claude"] })).toEqual(["row:covers-drift"]);
  });
});

describe("docs Conformance census: docs section falsifiers", () => {
  const BODY = `${S1} ${S2} ${S3}`;
  const doc = (section: string, tail = "## Next section\n\ntext\n"): string => `# Title\n\n## Conformance\n\n${section}\n${tail}`;

  it("accepts the exact section, with or without a blank line before the next heading", () => {
    expect(docsProblems(doc(BODY))).toEqual([]);
    expect(docsProblems(`# T\n## Conformance\n${BODY}\n## Next\n`)).toEqual([]);
  });

  it("D1 refuses a subsection added inside the section", () => {
    expect(docsProblems(doc(`${BODY}\n\n### Weakened\n\nOptional.`))).toEqual(["docs:text-drift"]);
  });

  it("D2 refuses a duplicate, weakened section at the end of the file", () => {
    expect(docsProblems(`${doc(BODY)}\n## Conformance\n\nOptional.\n`)).toEqual(["docs:heading-not-unique"]);
  });

  it("D3 and D4 stay green for text after a level-1 heading or at the end of the file", () => {
    expect(docsProblems(doc(BODY, "# Appendix\n\nUnrelated prose.\n"))).toEqual([]);
    expect(docsProblems(doc(BODY, ""))).toEqual([]);
    expect(docsProblems(doc(BODY, "# Appendix\n\n## Conformance-adjacent\n\ntext\n"))).toEqual([]);
  });

  it("D5 and D6 refuse an HTML comment inside the section, or one that hides a sentence", () => {
    expect(docsProblems(doc(`${BODY}\n<!-- note -->`))).toEqual(["docs:hidden-comment"]);
    expect(docsProblems(doc(BODY.replace(S2, `<!-- ${S2} -->`)))).toEqual(["docs:text-drift"]);
    expect(docsProblems(doc(`${BODY}\n<!--\n## Conformance\n\nOptional.\n-->`))).toEqual(["docs:hidden-comment"]);
  });

  it("D7 and D8 do not mistake a heading inside a comment or a code fence for a duplicate", () => {
    expect(docsProblems(`${doc(BODY)}\n<!--\n## Conformance\n-->\n`)).toEqual([]);
    expect(docsProblems(`${doc(BODY)}\n\`\`\`\n## Conformance\n\`\`\`\n`)).toEqual([]);
  });

  it("D9 and D10 refuse a missing section, a wrong heading level, and a weakened sentence", () => {
    expect(docsProblems("# Title\n\n## Other\n\ntext\n")).toEqual(["docs:heading-missing"]);
    expect(docsProblems(`# Title\n\n### Conformance\n\n${BODY}\n`)).toEqual(["docs:heading-missing"]);
    expect(docsProblems(doc(BODY.replace("Include", "Optionally include")))).toEqual(["docs:text-drift"]);
  });

  describe("the docs/14 label vocabulary", () => {
    const LABELS = TIERS.map(tier => `"${tier}"`).join(", ");
    const truth = (section: string, tail = "## Other\n\ntext\n"): string => `# QA\n\n## ${TRUTH_HEADING}\n\n${section}\n${tail}`;

    it("accepts the five labels in order inside the unique section", () => {
      expect(vocabularyProblems(truth(`All docs must distinguish ${LABELS}.`))).toEqual([]);
    });

    it("refuses a dropped, reordered or comment-hidden label, and a duplicate or missing heading", () => {
      expect(vocabularyProblems(truth(`All docs must distinguish ${LABELS.replace(', "scale benchmark pass"', "")}.`))).toEqual(["vocabulary:drift"]);
      expect(vocabularyProblems(truth(`All docs must distinguish ${[...TIERS].reverse().map(tier => `"${tier}"`).join(", ")}.`))).toEqual(["vocabulary:drift"]);
      expect(vocabularyProblems(truth(`<!-- ${LABELS} -->`))).toEqual(["vocabulary:drift"]);
      expect(vocabularyProblems(`${truth(LABELS)}\n## ${TRUTH_HEADING}\n\nweaker\n`)).toEqual(["vocabulary:heading-not-unique"]);
      expect(vocabularyProblems("# QA\n\n## Other\n")).toEqual(["vocabulary:heading-missing"]);
    });

    it("does not read labels that sit after the next level-1 or level-2 heading", () => {
      expect(vocabularyProblems(truth("No labels here.", `## Elsewhere\n\n${LABELS}\n`))).toEqual(["vocabulary:drift"]);
    });
  });
});

describe("docs Conformance census: dual-mode rows are never satisfied by a single-mode case", () => {
  const FILE = "test/fixture-pinned.test.ts";
  const SOURCE = ['import { describe, expect, it } from "vitest";', 'describe("suite", () => {', '  it("pinned case one", () => { expect(1).toBe(1); });', "});", ""].join("\n");
  const env: Env = { read: file => (file === FILE ? SOURCE : undefined), gate: { include: ["test/**/*.test.ts"], exclude: [], forgeToml: "" } };
  const pin = (mode: Mode): Pin => ({ file: FILE, title: "pinned case one", kind: "it", tier: "fixture pass", mode });
  const dual = (overrides: Partial<Row> = {}): Row => ({
    id: "T-dual",
    sentence: 1,
    requirement: "cancellation",
    dualMode: true,
    status: "single-mode",
    covers: ["neutral"],
    unmet: "the same fixture compared under both modes",
    pins: [pin("neutral")],
    ...overrides,
  });

  it("accepts a single-mode record that writes the missing comparison, and does not count it satisfied", () => {
    const recorded = dual();
    expect(causes(auditRow(recorded, env))).toEqual([]);
    expect(satisfied(recorded)).toBe(false);
  });

  it("refuses a dual-mode claim backed only by pi, claude or neutral cases", () => {
    for (const mode of ["pi", "claude", "neutral"] as const) {
      expect(causes(auditRow(dual({ status: "dual-mode", covers: [mode], pins: [pin(mode)] }), env))).toEqual(["row:dual-mode-needs-both"]);
    }
  });

  it("refuses two single-mode cases, one per mode, as a dual-mode proof", () => {
    const found = auditRow(dual({ status: "dual-mode", covers: ["claude", "pi"], pins: [pin("pi"), pin("claude")] }), env);
    expect(causes(found)).toEqual(["row:dual-mode-needs-both"]);
  });

  it("accepts a dual-mode claim only with a case that runs both, and then counts it satisfied", () => {
    const promoted = dual({ status: "dual-mode", covers: ["both"], pins: [pin("both")], unmet: undefined });
    expect(causes(auditRow(promoted, env))).toEqual([]);
    expect(satisfied(promoted)).toBe(true);
  });

  it("refuses to leave a row single-mode once a both-modes case is pinned", () => {
    expect(causes(auditRow(dual({ covers: ["both"], pins: [pin("both")] }), env))).toEqual(["row:promote"]);
  });

  it("refuses a single-mode record that omits the missing comparison", () => {
    expect(causes(auditRow(dual({ unmet: "" }), env))).toEqual(["row:no-missing-comparison"]);
  });

  it("refuses a plain pinned status on a dual-mode requirement", () => {
    expect(causes(auditRow(dual({ status: "pinned" }), env))).toEqual(["row:dual-never-plain-pinned"]);
  });
});

describe("docs Conformance census: unpinned rows are reasoned and never pass", () => {
  const env: Env = { read: () => undefined, gate: { include: [], exclude: [], forgeToml: "" } };
  const FILE = "test/fixture-pinned.test.ts";
  const unpinned = (overrides: Partial<Row> = {}): Row => ({
    id: "T-row",
    sentence: 3,
    requirement: "cycles",
    dualMode: false,
    status: "unpinned",
    covers: [],
    pins: [],
    ...overrides,
  });

  it("accepts a reasoned no-case row and does not count it satisfied", () => {
    const missing = unpinned({ reason: "No case on this base exercises this requirement; it is filed for a later bead." });
    expect(causes(auditRow(missing, env))).toEqual([]);
    expect(satisfied(missing)).toBe(false);
  });

  it("refuses an unpinned row with no reason, and one that also lists pins", () => {
    expect(causes(auditRow(unpinned(), env))).toEqual(["row:unpinned-no-reason"]);
    const withPin = unpinned({
      reason: "A reason long enough to be a reason.",
      pins: [{ file: FILE, title: "pinned case one", kind: "it", tier: "fixture pass", mode: "neutral" }],
      covers: ["neutral"],
    });
    expect(causes(auditRow(withPin, env))).toContain("row:unpinned-with-pins");
  });
});
