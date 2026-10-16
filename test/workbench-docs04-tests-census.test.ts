/**
 * VC-1 / W02 census falsifier (wb-a2g.13, respin): docs/workbench/04 section "Tests".
 *
 * Spec lines pinned (docs/workbench/04-claude-agent-sdk-executor.md, "Tests"):
 *   1. "Golden real SDK single agent, parallel 3 agents, structured schema, successful resume."
 *   2. "Negative: invalid model, absent credentials, malformed native output, stream error
 *      after partial text, aborted query, resumed unknown session, inaccessible cwd,
 *      invalid tool policy."
 *   3. "Strict assertion that workflow agent() never calls Pi's createAgentSession/AgentManager
 *      under Claude backend."
 *   4. "No false successful tool or domain verdict after SDK result error; transcript privacy
 *      and log size bounds."
 *   5. "Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails."
 * Five bullets decompose into 18 census rows (4 + 8 + 1 + 3 + 2).
 *
 * Each row is pinned to an EXISTING case by file path, verbatim it/describe title and a docs/14
 * truth label ("code present", "fixture pass", "live SDK pass", "adversarial pass"). The census
 * parses each pinned file with the TypeScript parser (never a text match), so a title that
 * survives only in a comment or a string is absent. Measured detection set, each mode with its own
 * independently authored falsifier below:
 *   - rename / delete / comment-out / string-decoy of a pinned case: row red, "absent";
 *   - skip, todo, fails, skipIf, runIf, x-prefixed legacy forms, options-object skip/todo, a
 *     ctx.skip() call, an empty it.each / describe.each table, on the case OR on any describe that
 *     ENCLOSES it: row red, reported as "present but skipped", never as renamed or deleted; a
 *     describe that does not enclose the case never reddens it;
 *   - registration under a conditional (if, ?:, &&, ||, ??): row red;
 *   - a sibling focus modifier is reported only where the owning tier config does not refuse focus
 *     (allowOnly is read from the config); a focus modifier ON the pinned case is never reported
 *     as a defect, because the owning config either refuses it at the gate or the case still runs;
 *   - assertion fragments are CODE occurrences inside the pinned case body (parser tokens, so
 *     comments and string text never match), outside any conditional, with no return statement
 *     before them; every titled it pin carries at least one;
 *   - a describe pin needs at least one runnable nested it that contains an expect call.
 * Tier labels are derived from forge.toml [build.commands] and the vitest config each command runs
 * (include/exclude globs), not from a filename rule. "live SDK pass" additionally cites its
 * evidence in docs/workbench/TRACEABILITY.md. The docs/04 "## Tests" section is checked as a
 * whole rendered slice (HTML comments stripped), not bullet by bullet.
 *
 * Limits, stated plainly: a pin proves a case with the title EXISTS and is not skipped by a
 * detected mode; it never executes the case and never proves the case passes. A skip performed
 * through an alias of describe/it (const t = it.skip) or a runtime registration helper is reported
 * as "absent", not as skipped. Removing an assertion LINE that is not a listed marker is not
 * detected. A "live SDK pass" label cites a recorded forge run; the presence of a title is never
 * evidence of a live pass.
 *
 * This file never executes a pinned case and never imports another test file.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/04-claude-agent-sdk-executor.md";
const TRACE = "docs/workbench/TRACEABILITY.md";
const RECEIPT = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";

type Label = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass";

interface Evidence {
  readonly file: string;
  readonly fragment: string;
}

interface Pin {
  readonly file: string;
  readonly label: Label;
  /** Verbatim it/describe title. Absent for a script pin. */
  readonly title?: string;
  readonly kind?: "it" | "describe";
  /** Verbatim code fragments that must occur, reachably, inside the pinned case body. */
  readonly bodyMarkers?: readonly string[];
  /** Verbatim code fragments that must occur anywhere in the pinned file (helpers, scripts). */
  readonly fileMarkers?: readonly string[];
  /** Recorded evidence a "live SDK pass" label cites. */
  readonly evidence?: readonly Evidence[];
  /** What the pin does and does not cover. */
  readonly scope?: string;
}

interface Row {
  readonly id: string;
  readonly bullet: 1 | 2 | 3 | 4 | 5;
  /** Lower-case needle that must occur in the docs/04 bullet. */
  readonly needle: string;
  readonly pins: readonly Pin[];
  /** Mandatory for a row with no pins; the row is never evidence. */
  readonly unpinned?: string;
  /** Honest limits of the pinned evidence. */
  readonly gap?: string;
}

const HOST = "test/workbench-host-contract.test.ts";
const ADVERSE = "test/workbench-claude-adverse-faults.test.ts";
const CANCEL = "test/workbench-claude-cancel-faults.test.ts";
const STREAMING = "test/workbench-pi-streaming.test.ts";
const PI_LIVE = "test/workbench-claude-pi-live.test.ts";
const LIVE_CLAUDE = "qa/workbench/live-claude.mjs";
const LIVE_RESUME = "qa/workbench/live-resume.mjs";
const GATE_WORKTREE = "test/workflow-gate-worktree.test.ts";
const CAPABILITY = "test/workbench-claude-capability-tools.test.ts";

const PI_LIVE_EVIDENCE: readonly Evidence[] = [
  { file: TRACE, fragment: "forge run claude-live` passed at `cmd_b5f4df13dd3b`" },
  { file: TRACE, fragment: "command id `cmd_2a275dcbd6c6`, exit 0" },
];

const BULLETS: readonly string[] = [
  "Golden real SDK single agent, parallel 3 agents, structured schema, successful resume.",
  "Negative: invalid model, absent credentials, malformed native output, stream error after partial text, aborted query, resumed unknown session, inaccessible cwd, invalid tool policy.",
  "Strict assertion that workflow agent() never calls Pi's createAgentSession/AgentManager under Claude backend.",
  "No false successful tool or domain verdict after SDK result error; transcript privacy and log size bounds.",
  "Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails.",
];

const ROWS: readonly Row[] = [
  // ---- Bullet 1: golden real SDK -------------------------------------------------------------
  {
    id: "G1", bullet: 1, needle: "single agent",
    pins: [{
      file: HOST, label: "fixture pass", kind: "it",
      title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
      bodyMarkers: ["agentCount:1", "expect(calls).toHaveLength(1)"],
    }],
    gap: `No single-agent LIVE case exists: live-claude.mjs runs two parallel agents and the Pi live test runs three; neither is relabelled as the single-agent golden. The owner ruled (F11, 05:3xZ window) that the h7r v2 operator receipt (${RECEIPT}, revision e07474a) one-agent preflight is an instrument warm-up, not a receipted single-agent acceptance; it is named here as the nearest evidence only. G1 stays open until its own small receipted journey.`,
  },
  {
    id: "G2", bullet: 1, needle: "parallel 3 agents",
    pins: [
      {
        file: PI_LIVE, label: "live SDK pass", kind: "it",
        title: "runs three parallel structured agents with actual sessions and no Pi manager invocation",
        bodyMarkers: ["expect(rows).toHaveLength(3)", "expect(new Set(rows.map(row=>row.sessionId)).size).toBe(3)"],
        evidence: PI_LIVE_EVIDENCE,
      },
      {
        file: STREAMING, label: "fixture pass", kind: "it",
        title: "returns parallel structured values under distinct native session identities through registered Pi tool",
        bodyMarkers: ["expect(native.query).toHaveBeenCalledTimes(3)"],
      },
    ],
  },
  {
    id: "G3", bullet: 1, needle: "structured schema",
    pins: [
      {
        file: LIVE_CLAUDE, label: "code present",
        fileMarkers: ["additionalProperties:false", "createClaudeWorkflowHost("],
        scope: "A live probe script no forge command runs; its only record is TRACEABILITY prose 'both exited 0' with no revision or command id, so it is labelled code present, never a live pass.",
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L3: parallel schema agents return object values from native SDK structured_output",
        bodyMarkers: ["value:[{answer:'OK'},{answer:'OK'}]", "expect(calls[0].options).toMatchObject({outputFormat:{type:'json_schema',schema}})"],
      },
    ],
  },
  {
    id: "G4", bullet: 1, needle: "successful resume",
    pins: [
      {
        file: LIVE_RESUME, label: "code present",
        fileMarkers: ["sessions[0]!==sessions[1]", "createClaudeWorkflowHost("],
        scope: "A live probe script no forge command runs; same record limit as live-claude.mjs, so code present, never a live pass.",
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L4: resumed role preserves the same system prompt and tools",
        bodyMarkers: ["resume:'sdk-session-1'", "expect(next.ok).toBe(true)"],
      },
    ],
  },
  // ---- Bullet 2: the eight negatives ---------------------------------------------------------
  {
    id: "N1", bullet: 2, needle: "invalid model",
    pins: [{
      file: STREAMING, label: "fixture pass", kind: "it",
      title: "preserves native %s failure and never falls back to manager",
      bodyMarkers: ["expect(row.error).toContain(kind==='permission'?'permission denied':'invalid model')", "for (const spy of client.spies) expect(spy).not.toHaveBeenCalled()"],
    }],
    gap: "The model rejection is an SDK-reported error result through the fixture seam; no case drives an unsupported model id through resolvedModel alone.",
  },
  {
    id: "N2", bullet: 2, needle: "absent credentials",
    pins: [],
    unpinned: "No case on the trunk base asserts an absent-credentials refusal: the adverse-faults header routes it to wb-cax.5 (in_progress, not landed at base 5e742bf), and the Pi live test only reads the deployed native authentication on its success path. Stays unpinned until a case with a credential-absent fixture lands.",
  },
  {
    id: "N3", bullet: 2, needle: "malformed native output",
    pins: [
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "N2: a declared schema with structured_output undefined reports missing structured_output",
        bodyMarkers: ['expect(expectPlainFailure(result)).toBe("Claude SDK result is missing structured_output.")'],
      },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "N3: a structured_output that fails schema.check reports did not match schema, with no text",
        bodyMarkers: ['expect(error).not.toContain("missing structured_output")'],
      },
    ],
  },
  {
    id: "N4", bullet: 2, needle: "stream error after partial text",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N6 a non-abort stream throw after partial text is failed, never cancelled" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "is ok:false with the query-failed prefix, the init session id, and a redacted diagnostic",
        bodyMarkers: ['expect(error).toContain("[REDACTED]")', "expect(counter.calls).toBe(1)"],
      },
    ],
  },
  {
    id: "N5", bullet: 2, needle: "aborted query",
    pins: [
      {
        file: CANCEL, label: "fixture pass", kind: "it",
        title: "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort",
        bodyMarkers: ["expect(call.abortEvents).toBe(1)", 'expect(result).not.toHaveProperty("sessionId")'],
      },
      {
        file: CANCEL, label: "fixture pass", kind: "it",
        title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
        bodyMarkers: ["expect(result.error).not.toBe(NO_RESULT)", "expect(call.abortedAtClose).toBe(true)"],
      },
    ],
  },
  {
    id: "N6", bullet: 2, needle: "resumed unknown session",
    pins: [{
      file: HOST, label: "fixture pass", kind: "it",
      title: "L4: unknown resume session refuses without invoking a new query",
      bodyMarkers: ["host.resumeAgent('missing','followup')", "expect(calls).toHaveLength(0)"],
    }],
  },
  {
    id: "N7", bullet: 2, needle: "inaccessible cwd",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N1 inaccessible cwd refuses before any query" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "a non-existent absolute cwd yields the typed diagnostic and zero query() calls",
        bodyMarkers: ["expect(existsSync(missing)).toBe(false)", "expect(sdk.calls).toHaveLength(0)"],
      },
    ],
  },
  {
    id: "N8", bullet: 2, needle: "invalid tool policy",
    pins: [{
      file: CAPABILITY, label: "fixture pass", kind: "it",
      title: "validates finite host policy and refuses wildcard or incomplete authority",
      bodyMarkers: [
        '{ allowedCapabilities: ["*"] }',
        "{ allowedCapabilities: Array(33).fill(id) }",
        '{ grants: ["*"] }',
        '{ workspace: "relative" }',
        '{ principal: { id: "", role: "reader" } }',
        "{ maxCalls: 0 }",
        "expect(() => createCuratedTools({ ...options, ...overrides })).toThrow(CapabilityError)",
      ],
      scope: "The curated MCP capability policy only (wildcard allow-list, over-cap allow-list, wildcard grants, relative workspace, empty principal, zero maxCalls); each override is a code marker so deleting or commenting one is red.",
    }],
    gap: "claude-host does not validate the SDK `tools` allowlist option itself, so no case refuses an invalid SDK tool list; the pin covers the capability tool policy and nothing wider.",
  },
  // ---- Bullet 3: never Pi under the Claude backend -------------------------------------------
  {
    id: "P1", bullet: 3, needle: "createagentsession/agentmanager",
    pins: [
      {
        file: STREAMING, label: "fixture pass", kind: "it",
        title: "returns parallel structured values under distinct native session identities through registered Pi tool",
        bodyMarkers: ["for (const spy of client.spies) expect(spy).not.toHaveBeenCalled()"],
        fileMarkers: [
          "const forbidden = ['spawn', 'spawnAndWait', 'resume'] as const",
          "const spies = forbidden.map(name => vi.spyOn(AgentManager.prototype, name)",
        ],
        scope: "Spies on AgentManager.prototype (spawn, spawnAndWait, resume) and asserts every spy untouched after a parallel Claude workflow; the forbidden-name list is a code marker, so emptying it (a vacuous pin) is red.",
      },
      {
        file: PI_LIVE, label: "live SDK pass", kind: "it",
        title: "runs three parallel structured agents with actual sessions and no Pi manager invocation",
        bodyMarkers: ["for(const spy of spies)expect(spy).not.toHaveBeenCalled()"],
        fileMarkers: ["const spies=(['spawn','spawnAndWait','resume'] as const).map(name=>vi.spyOn(AgentManager.prototype,name)"],
        evidence: PI_LIVE_EVIDENCE,
      },
    ],
    gap: "host-contract L3 is deliberately NOT a pin: its local `manager` mock is never injected into the host, so its not.toHaveBeenCalled assertions are vacuous. No case asserts createAgentSession specifically; only the AgentManager spawn/spawnAndWait/resume paths are spied.",
  },
  // ---- Bullet 4: no false verdict, privacy, log bounds ---------------------------------------
  {
    id: "V1", bullet: 4, needle: "no false successful tool or domain verdict after sdk result error",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N8 error-subtype results are never a success" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "an error subtype with is_error:false is still not a success",
        bodyMarkers: ['expect(expectPlainFailure(result)).toBe("budget exhausted")'],
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L4: error result after partial assistant never becomes success",
        bodyMarkers: ["expect(result.ok).toBe(false)", "expect(result.text).toBeUndefined()"],
      },
    ],
  },
  {
    id: "V2", bullet: 4, needle: "transcript privacy",
    pins: [],
    unpinned: "No case asserts transcript privacy on trunk: claude-transcript.ts is gated by wb-dc0.1 (open, in respin at base 5e742bf); the security-pi-tools case covers the claude:transcript GRANT, not redaction of transcript text, and topology A7 covers titles. Stays unpinned until wb-dc0.1 lands.",
  },
  {
    id: "V3", bullet: 4, needle: "log size bounds",
    pins: [],
    unpinned: "No case bounds a LOG: the nearest evidence is the observer cap in workbench-claude-observer.test.ts (200 observed messages, tool evidence truncated), which bounds projected samples, not a persisted log or its byte size. Recorded as nearest evidence and never accepted as a pin.",
  },
  // ---- Bullet 5: gate on the exact child basis -----------------------------------------------
  {
    id: "W1", bullet: 5, needle: "exact child candidate basis, before cleanup",
    pins: [{
      file: GATE_WORKTREE, label: "fixture pass", kind: "it",
      title: "runs the gate inside the child's worktree, while it still exists",
      bodyMarkers: ["expect(gateRuns[0].cwd).toBe(worktreePath)", "expect(gateRuns[0].existed).toBe(true)", "expect(existsSync(worktreePath!)).toBe(false)"],
      scope: "The Pi workflow host (createWorkflowHost) gate path: exact worktree cwd, gate ran before teardown, teardown after.",
    }],
    gap: "The Claude host refuses worktree isolation outright, so a Claude-host child basis gate has no case.",
  },
  {
    id: "W2", bullet: 5, needle: "worktree mismatch fails",
    pins: [],
    unpinned: "No case makes a gate run against the wrong worktree or basis FAIL: workflow-gate-worktree asserts cwd equality on the happy path only, and workflow-isolated only forwards `isolated`. The Claude-host isolation refusal conformance is wb-a2g.11 (in_progress, not on trunk at base 5e742bf). Stays unpinned until it lands.",
  },
];

const EXPECTED_UNPINNED: readonly string[] = ["N2", "V2", "V3", "W2"];
const EXPECTED_BULLET_COUNTS: readonly number[] = [4, 8, 1, 3, 2];

// ---- parser-based scanner (copied locally by design; not imported from another test file) ----

const SUITE_ROOTS: ReadonlySet<string> = new Set(["describe", "it", "test"]);
const LEGACY_ROOTS: ReadonlySet<string> = new Set(["xit", "xtest", "xdescribe"]);
const CALL_FORMS: ReadonlySet<string> = new Set(["each", "for", "skipIf", "runIf"]);
const GATING_NAMES: ReadonlySet<string> = new Set(["skip", "todo", "fails", "skipIf", "runIf"]);
/** The focus modifier name, assembled so no text-level focus check can match this source. */
const FOCUS = ["on", "ly"].join("");

type SuiteFn = ts.ArrowFunction | ts.FunctionExpression;

interface CaseInfo {
  readonly kind: "it" | "describe";
  readonly title: string | undefined;
  readonly call: ts.CallExpression;
  /** Own gating: modifiers, options-object keys, an empty each table, a ctx.skip() call. */
  readonly gating: readonly string[];
  readonly focused: boolean;
  /** Registered under an if / ?: / && / || / ?? anywhere above it. */
  readonly conditional: boolean;
  readonly fn: SuiteFn | undefined;
  readonly ancestors: readonly CaseInfo[];
}

interface SourceModel {
  readonly text: string;
  readonly sf: ts.SourceFile;
  readonly cases: readonly CaseInfo[];
  readonly leaves: readonly ts.Node[];
  readonly starts: ReadonlyMap<number, ts.Node>;
  readonly ends: ReadonlySet<number>;
  /** The source with every character outside a parser token (comments, whitespace) blanked. */
  readonly mask: string;
}

function chainOf(expr: ts.Expression): { root: string; names: string[] } | undefined {
  const names: string[] = [];
  let cur: ts.Expression = expr;
  for (;;) {
    if (ts.isPropertyAccessExpression(cur)) {
      names.unshift(cur.name.text);
      cur = cur.expression;
    } else if (ts.isElementAccessExpression(cur) && ts.isStringLiteralLike(cur.argumentExpression)) {
      names.unshift(cur.argumentExpression.text);
      cur = cur.expression;
    } else if (ts.isParenthesizedExpression(cur)) {
      cur = cur.expression;
    } else break;
  }
  return ts.isIdentifier(cur) ? { root: cur.text, names } : undefined;
}

function unwrap(expr: ts.Expression): ts.Expression {
  let cur = expr;
  while (ts.isParenthesizedExpression(cur) || ts.isAsExpression(cur) || ts.isSatisfiesExpression(cur)) cur = cur.expression;
  return cur;
}

function isFalseKeyword(expr: ts.Expression): boolean {
  return expr.kind === ts.SyntaxKind.FalseKeyword;
}

function optionGates(args: readonly ts.Expression[]): string[] {
  const gates: string[] = [];
  for (const arg of args) {
    if (!ts.isObjectLiteralExpression(arg)) continue;
    for (const prop of arg.properties) {
      const name = prop.name && (ts.isIdentifier(prop.name) || ts.isStringLiteralLike(prop.name)) ? prop.name.text : undefined;
      if (name === undefined || !GATING_NAMES.has(name)) continue;
      if (ts.isPropertyAssignment(prop) && isFalseKeyword(prop.initializer)) continue;
      gates.push(`options.${name}`);
    }
  }
  return gates;
}

function findSuiteFn(args: readonly ts.Expression[]): SuiteFn | undefined {
  for (const arg of args) {
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) return arg;
  }
  return undefined;
}

function callsCtxSkip(fn: SuiteFn): boolean {
  const names = new Set<string>();
  const bare = new Set<string>();
  const first = fn.parameters[0];
  if (first !== undefined) {
    if (ts.isIdentifier(first.name)) names.add(first.name.text);
    else if (ts.isObjectBindingPattern(first.name)) {
      for (const el of first.name.elements) {
        const source = el.propertyName && ts.isIdentifier(el.propertyName) ? el.propertyName.text : ts.isIdentifier(el.name) ? el.name.text : "";
        if (source === "skip" && ts.isIdentifier(el.name)) bare.add(el.name.text);
      }
    }
  }
  if (names.size === 0 && bare.size === 0) return false;
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isPropertyAccessExpression(callee) && callee.name.text === "skip" && ts.isIdentifier(callee.expression) && names.has(callee.expression.text)) found = true;
      if (ts.isIdentifier(callee) && bare.has(callee.text)) found = true;
    }
    ts.forEachChild(node, visit);
  };
  if (fn.body) visit(fn.body);
  return found;
}

function caseOf(call: ts.CallExpression, ancestors: readonly CaseInfo[], conditional: boolean): CaseInfo | undefined {
  let root: string;
  let names: string[];
  let eachEmpty = false;
  const callee = call.expression;
  if (ts.isCallExpression(callee)) {
    const inner = chainOf(callee.expression);
    const last = inner?.names.at(-1);
    if (inner === undefined || !SUITE_ROOTS.has(inner.root) || last === undefined || !CALL_FORMS.has(last)) return undefined;
    root = inner.root;
    names = inner.names;
    if (last === "each" || last === "for") {
      const table = callee.arguments[0];
      eachEmpty = table !== undefined && ts.isArrayLiteralExpression(unwrap(table)) && (unwrap(table) as ts.ArrayLiteralExpression).elements.length === 0;
    }
  } else {
    const chain = chainOf(callee);
    if (chain === undefined) return undefined;
    const last = chain.names.at(-1);
    if (last !== undefined && CALL_FORMS.has(last)) return undefined;
    root = chain.root;
    names = chain.names;
  }
  const legacy = LEGACY_ROOTS.has(root);
  if (!legacy && !SUITE_ROOTS.has(root)) return undefined;
  const kind: "it" | "describe" = root === "describe" || root === "xdescribe" ? "describe" : "it";
  const first = call.arguments[0];
  const title = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
  const fn = findSuiteFn(call.arguments);
  const gating = [
    ...(legacy ? [`legacy ${root}`] : []),
    ...names.filter(name => GATING_NAMES.has(name)).map(name => `.${name}`),
    ...(eachEmpty ? ["empty each table"] : []),
    ...optionGates(call.arguments),
    ...(fn !== undefined && callsCtxSkip(fn) ? ["ctx.skip()"] : []),
  ];
  return { kind, title, call, gating, focused: names.includes(FOCUS), conditional, fn, ancestors };
}

function collectCases(sf: ts.SourceFile): CaseInfo[] {
  const out: CaseInfo[] = [];
  const visit = (node: ts.Node, stack: readonly CaseInfo[], conditional: boolean): void => {
    if (ts.isIfStatement(node)) {
      visit(node.expression, stack, conditional);
      visit(node.thenStatement, stack, true);
      if (node.elseStatement) visit(node.elseStatement, stack, true);
      return;
    }
    if (ts.isConditionalExpression(node)) {
      visit(node.condition, stack, conditional);
      visit(node.whenTrue, stack, true);
      visit(node.whenFalse, stack, true);
      return;
    }
    if (ts.isBinaryExpression(node) && isShortCircuit(node)) {
      visit(node.left, stack, conditional);
      visit(node.right, stack, true);
      return;
    }
    if (ts.isCallExpression(node)) {
      const info = caseOf(node, stack, conditional);
      if (info !== undefined) {
        out.push(info);
        ts.forEachChild(node, child => visit(child, [...stack, info], conditional));
        return;
      }
    }
    ts.forEachChild(node, child => visit(child, stack, conditional));
  };
  visit(sf, [], false);
  return out;
}

function isShortCircuit(node: ts.BinaryExpression): boolean {
  const kind = node.operatorToken.kind;
  return kind === ts.SyntaxKind.AmpersandAmpersandToken || kind === ts.SyntaxKind.BarBarToken || kind === ts.SyntaxKind.QuestionQuestionToken;
}

function leafTokens(node: ts.Node, sf: ts.SourceFile, out: ts.Node[]): void {
  const kids = node.getChildren(sf).filter(kid => !(kid.kind >= ts.SyntaxKind.FirstJSDocNode && kid.kind <= ts.SyntaxKind.LastJSDocNode));
  if (kids.length === 0) {
    if (node.end > node.getStart(sf)) out.push(node);
    return;
  }
  for (const kid of kids) leafTokens(kid, sf, out);
}

function modelOf(text: string): SourceModel {
  const sf = ts.createSourceFile("pinned.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const leaves: ts.Node[] = [];
  leafTokens(sf, sf, leaves);
  const chars = Array.from({ length: text.length }, () => " ");
  const starts = new Map<number, ts.Node>();
  const ends = new Set<number>();
  for (const leaf of leaves) {
    const start = leaf.getStart(sf);
    starts.set(start, leaf);
    ends.add(leaf.end);
    for (let i = start; i < leaf.end; i++) chars[i] = text[i];
  }
  return { text, sf, cases: collectCases(sf), leaves, starts, ends, mask: chars.join("") };
}

type MarkerResult = "ok" | "absent" | "unreachable";

/** Is the token at `start` outside any conditional, and with no return statement before it, within `fn`? */
function reachable(model: SourceModel, start: number, fn: SuiteFn): boolean {
  let child: ts.Node | undefined = model.starts.get(start);
  while (child !== undefined && child !== fn) {
    const parent: ts.Node | undefined = child.parent;
    if (parent === undefined || parent === fn) break;
    if (ts.isIfStatement(parent) && parent.expression !== child) return false;
    if (ts.isConditionalExpression(parent) && parent.condition !== child) return false;
    if (ts.isBinaryExpression(parent) && isShortCircuit(parent) && parent.right === child) return false;
    child = parent;
  }
  let early = false;
  const visit = (node: ts.Node): void => {
    if (early) return;
    if (ts.isFunctionLike(node) && node !== fn) return;
    if (ts.isReturnStatement(node) && node.getStart(model.sf) < start) early = true;
    ts.forEachChild(node, visit);
  };
  if (fn.body) visit(fn.body);
  return !early;
}

function findMarker(model: SourceModel, marker: string, within: SuiteFn | undefined): MarkerResult {
  const lo = within?.body ? within.body.getStart(model.sf) : 0;
  const hi = within?.body ? within.body.end : model.text.length;
  let sawUnreachable = false;
  for (let i = model.mask.indexOf(marker, lo); i !== -1 && i + marker.length <= hi; i = model.mask.indexOf(marker, i + 1)) {
    if (!model.starts.has(i) || !model.ends.has(i + marker.length)) continue;
    if (within === undefined || reachable(model, i, within)) return "ok";
    sawUnreachable = true;
  }
  return sawUnreachable ? "unreachable" : "absent";
}

function gatingChain(info: CaseInfo, from?: CaseInfo): string[] {
  const chain = from === undefined ? info.ancestors : info.ancestors.slice(info.ancestors.indexOf(from) + 1);
  const out: string[] = [];
  for (const ancestor of chain) {
    if (ancestor.gating.length > 0) out.push(`enclosing ${ancestor.kind} ${JSON.stringify(ancestor.title ?? "<dynamic>")} carries ${ancestor.gating.join(", ")}`);
  }
  if (info.gating.length > 0) out.push(`the case carries ${info.gating.join(", ")}`);
  return out;
}

function hasExpect(model: SourceModel, fn: SuiteFn | undefined): boolean {
  if (fn?.body === undefined) return false;
  const lo = fn.body.getStart(model.sf);
  return model.leaves.some(leaf => leaf.getStart(model.sf) >= lo && leaf.end <= (fn.body as ts.Node).end && leaf.getText(model.sf) === "expect");
}

/** Title, skip and assertion-fragment problems for one titled pin against the text of its file. */
function caseProblems(text: string, pin: Pin, focusRefused: boolean, built?: SourceModel): string[] {
  const model = built ?? modelOf(text);
  const kind = pin.kind ?? "it";
  const label = JSON.stringify(pin.title);
  const hits = model.cases.filter(found => found.kind === kind && found.title === pin.title);
  if (hits.length === 0) return [`no registered ${kind} titled ${label} (renamed, deleted, commented out, or not a literal describe/it/test registration)`];
  if (hits.length > 1) return [`${hits.length} ${kind} cases share the title ${label}; the pin is ambiguous`];
  const hit = hits[0];
  const problems: string[] = [];
  for (const why of gatingChain(hit)) problems.push(`${label} is present but skipped, not renamed or deleted: ${why}`);
  if (hit.conditional) problems.push(`${label} is registered under a conditional (if / ?: / && / || / ??), so it may not run`);
  if (!focusRefused && model.cases.some(found => found.focused)) {
    const runs = hit.focused || hit.ancestors.some(ancestor => ancestor.focused);
    if (!runs) problems.push(`${label} is skipped by a sibling focus modifier and the owning vitest config does not set allowOnly false`);
  }
  if (hit.fn === undefined) {
    problems.push(`${label} has no inline function body to check`);
    return problems;
  }
  for (const marker of pin.bodyMarkers ?? []) {
    const result = findMarker(model, marker, hit.fn);
    if (result === "absent") problems.push(`${label} lost the code fragment ${JSON.stringify(marker)} (deleted, commented out, or only in a string)`);
    if (result === "unreachable") problems.push(`${label} keeps the fragment ${JSON.stringify(marker)} only where it is unreachable (conditional or after an early return)`);
  }
  if (kind === "describe") {
    const runnable = model.cases.filter(
      found => found.kind === "it" && found.ancestors.includes(hit) && gatingChain(found, hit).length === 0 && hasExpect(model, found.fn),
    );
    if (runnable.length === 0) problems.push(`${label} has no runnable nested it that contains an expect call`);
  }
  return problems;
}

// ---- tiers: forge.toml [build.commands] + the vitest config each command runs ----------------

interface Env {
  read(path: string): string | undefined;
}

interface Tier {
  readonly name: string;
  readonly gate: boolean;
  readonly config: string;
  readonly include: readonly string[];
  readonly exclude: readonly string[];
  readonly allowOnly: boolean;
}

function realEnv(overrides: Readonly<Record<string, string>> = {}): Env {
  return {
    read(path: string): string | undefined {
      if (path in overrides) return overrides[path];
      const full = join(ROOT, path);
      return existsSync(full) ? readFileSync(full, "utf8") : undefined;
    },
  };
}

/** An env whose single file has one verbatim fragment replaced; throws if the fragment is not exactly where expected. */
function mutated(path: string, from: string, to: string, all = false): Env {
  const text = readFileSync(join(ROOT, path), "utf8");
  const count = text.split(from).length - 1;
  if (count === 0 || (!all && count !== 1)) throw new Error(`mutation anchor ${JSON.stringify(from)} occurs ${count} times in ${path}`);
  return realEnv({ [path]: all ? text.split(from).join(to) : text.replace(from, () => to) });
}

function tomlString(value: string): string | undefined {
  return /^"((?:\\.|[^"\\])*)"/.exec(value.trim())?.[1];
}

function parseForge(text: string): { commands: Map<string, string>; gate: string[] } {
  const commands = new Map<string, string>();
  let gate: string[] = [];
  let section = "";
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header) {
      section = header[1];
      continue;
    }
    const pair = /^([A-Za-z0-9_.-]+)\s*=\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, value] = pair;
    if (section === "build.commands") {
      const command = tomlString(value);
      if (command !== undefined) commands.set(key, command);
    } else if (section.startsWith("build.commands.") && key === "command") {
      const command = tomlString(value);
      if (command !== undefined) commands.set(section.slice("build.commands.".length), command);
    } else if (section === "build" && key === "gate") {
      gate = [...value.matchAll(/"([^"]+)"/g)].map(match => match[1]);
    }
  }
  return { commands, gate };
}

function vitestConfigOf(command: string, scripts: Readonly<Record<string, string>>): string | undefined {
  const npm = /^npm run (\S+)$/.exec(command.trim());
  const resolved = npm ? (scripts[npm[1]] ?? "") : command;
  if (!/\bvitest run\b/.test(resolved)) return undefined;
  return /--config\s+(\S+)/.exec(resolved)?.[1] ?? "vitest.config.ts";
}

function stringArray(expr: ts.Expression | undefined): string[] | undefined {
  if (expr === undefined || !ts.isArrayLiteralExpression(expr)) return undefined;
  const out: string[] = [];
  for (const el of expr.elements) {
    if (!ts.isStringLiteralLike(el)) return undefined;
    out.push(el.text);
  }
  return out;
}

const DEFAULT_INCLUDE: readonly string[] = ["**/*.{test,spec}.?(c|m)[jt]s?(x)"];

function readTestConfig(text: string): { include: string[]; exclude: string[]; allowOnly: boolean } {
  const sf = ts.createSourceFile("vitest.config.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let block: ts.ObjectLiteralExpression | undefined;
  const find = (node: ts.Node): void => {
    if (block !== undefined) return;
    if (ts.isPropertyAssignment(node) && node.name.getText(sf) === "test" && ts.isObjectLiteralExpression(node.initializer)) {
      block = node.initializer;
      return;
    }
    ts.forEachChild(node, find);
  };
  find(sf);
  const prop = (name: string): ts.Expression | undefined => {
    for (const p of block?.properties ?? []) {
      if (ts.isPropertyAssignment(p) && p.name.getText(sf) === name) return p.initializer;
    }
    return undefined;
  };
  const include = stringArray(prop("include"));
  const exclude = stringArray(prop("exclude"));
  const allow = prop("allowOnly");
  return {
    include: include ?? (prop("include") === undefined ? [...DEFAULT_INCLUDE] : []),
    exclude: exclude ?? [],
    allowOnly: allow !== undefined && isFalseKeyword(allow),
  };
}

function loadTiers(env: Env): Tier[] {
  const forge = parseForge(env.read("forge.toml") ?? "");
  const scripts = (JSON.parse(env.read("package.json") ?? "{}") as { scripts?: Record<string, string> }).scripts ?? {};
  const tiers: Tier[] = [];
  for (const [name, command] of forge.commands) {
    const config = vitestConfigOf(command, scripts);
    if (config === undefined) continue;
    const text = env.read(config);
    if (text === undefined) continue;
    const parsed = readTestConfig(text);
    tiers.push({ name, gate: forge.gate.includes(name), config, ...parsed });
  }
  return tiers;
}

function globToRegExp(glob: string): RegExp {
  let re = "";
  let braces = 0;
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        if (glob[i + 2] === "/") {
          re += "(?:.*/)?";
          i += 2;
        } else {
          re += ".*";
          i += 1;
        }
      } else re += "[^/]*";
    } else if (c === "?") re += "[^/]";
    else if (c === "{") {
      braces++;
      re += "(?:";
    } else if (c === "}" && braces > 0) {
      braces--;
      re += ")";
    } else if (c === "," && braces > 0) re += "|";
    else re += c.replace(/[.+^$()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`);
}

function collects(tier: Tier, file: string): boolean {
  const matches = (globs: readonly string[]): boolean => globs.some(glob => globToRegExp(glob).test(file));
  return matches(tier.include) && !matches(tier.exclude) && !file.startsWith("node_modules/");
}

// ---- docs ------------------------------------------------------------------------------------

/** Problems with the rendered docs/04 "## Tests" section against the five exact bullets. */
function docProblems(raw: string): string[] {
  const rendered = raw.replace(/<!--[\s\S]*?-->/g, "");
  const problems: string[] = [];
  if (rendered.includes("<!--")) problems.push("an unterminated HTML comment hides the rest of the document");
  const headings = [...rendered.matchAll(/^## Tests[ \t]*$/gm)];
  if (headings.length !== 1) {
    problems.push(`expected exactly one "## Tests" heading in the rendered document, found ${headings.length}`);
    return problems;
  }
  const start = (headings[0].index ?? 0) + headings[0][0].length;
  const rest = rendered.slice(start);
  const end = rest.search(/^#{1,2}[ \t]+\S/m);
  const slice = (end === -1 ? rest : rest.slice(0, end)).trim();
  const expected = BULLETS.map(bullet => `- ${bullet}`).join("\n");
  if (slice !== expected) problems.push(`the rendered "## Tests" section (to the next level-1/2 heading or EOF) is not exactly the five census bullets; got ${JSON.stringify(slice)}`);
  return problems;
}

// ---- pin and row evaluation ------------------------------------------------------------------

const FIXTURE_SEAM = /vi\.mock\(|FakeClaudeSdk|fakeQuery|\bquery\s*:/;

function labelProblems(pin: Pin, text: string, tiers: readonly Tier[], env: Env): string[] {
  const collecting = tiers.filter(tier => collects(tier, pin.file));
  const gated = collecting.filter(tier => tier.gate);
  const live = collecting.filter(tier => !tier.gate);
  const problems: string[] = [];
  if (pin.label === "live SDK pass") {
    if (gated.length > 0) problems.push(`labelled "live SDK pass" but the default gate tier (${gated.map(tier => tier.name).join(", ")}) collects the file; a gate-collected fixture is never a live pass`);
    if (live.length === 0) problems.push('labelled "live SDK pass" but no registered forge command collects the file');
    if (FIXTURE_SEAM.test(text)) problems.push('labelled "live SDK pass" but carries a fixture seam');
    if ((pin.evidence ?? []).length === 0) problems.push('labelled "live SDK pass" without cited evidence');
    for (const cite of pin.evidence ?? []) {
      if (!(env.read(cite.file) ?? "").includes(cite.fragment)) problems.push(`cited evidence ${JSON.stringify(cite.fragment)} is absent from ${cite.file}`);
    }
  } else if (pin.label === "fixture pass" || pin.label === "adversarial pass") {
    if (gated.length === 0) problems.push(`labelled "${pin.label}" but no gate tier collects the file (include/exclude globs of the configs forge.toml runs)`);
  }
  return problems;
}

function pinProblems(pin: Pin, env: Env, tiers: readonly Tier[]): string[] {
  const text = env.read(pin.file);
  if (text === undefined) return [`${pin.file}: file is absent`];
  const out = labelProblems(pin, text, tiers, env);
  const model = modelOf(text);
  for (const marker of pin.fileMarkers ?? []) {
    if (findMarker(model, marker, undefined) !== "ok") out.push(`missing code fragment ${JSON.stringify(marker)}`);
  }
  if (pin.title === undefined) {
    if ((pin.fileMarkers ?? []).length === 0) out.push("a script pin needs code fragments");
  } else {
    const collecting = tiers.filter(tier => collects(tier, pin.file));
    const focusRefused = collecting.length > 0 && collecting.every(tier => tier.allowOnly);
    out.push(...caseProblems(text, pin, focusRefused, model));
  }
  return out.map(problem => `${pin.file}: ${problem}`);
}

function rowProblems(row: Row, env: Env, tiers: readonly Tier[]): string[] {
  if (row.pins.length === 0) {
    return row.unpinned !== undefined && row.unpinned.trim().length >= 80
      ? [`row ${row.id} is UNPINNED and is never evidence: ${row.unpinned}`]
      : [`row ${row.id} has no pin and no written reason of at least 80 characters`];
  }
  if (row.unpinned !== undefined) return [`row ${row.id} carries both pins and an unpinned reason`];
  return row.pins.flatMap(pin => pinProblems(pin, env, tiers).map(problem => `row ${row.id}: ${problem}`));
}

const REAL = realEnv();
const TIERS = loadTiers(REAL);

// ---- the census ------------------------------------------------------------------------------

const PINNED_ROWS = ROWS.filter(row => row.pins.length > 0);
const UNPINNED_ROWS = ROWS.filter(row => row.pins.length === 0);

describe("docs/04 Tests census binds the five bullets to existing cases", () => {
  it("the rendered docs/04 Tests section is exactly the five bullets this census decomposes", () => {
    expect(docProblems(readFileSync(join(ROOT, DOC), "utf8"))).toEqual([]);
  });

  it("every census row names its item in its docs bullet, in the doc's order, and the rows cover each bullet's items exactly", () => {
    EXPECTED_BULLET_COUNTS.forEach((count, i) => {
      expect(
        ROWS.filter(r => r.bullet === i + 1),
        `bullet ${i + 1}`,
      ).toHaveLength(count);
    });
    expect(ROWS).toHaveLength(18);
    expect(new Set(ROWS.map(r => r.id)).size).toBe(18);
    for (const row of ROWS) expect(BULLETS[row.bullet - 1].toLowerCase(), `row ${row.id}`).toContain(row.needle);
    const golden = BULLETS[0].replace(/\.$/, "").split(", ");
    expect(golden).toHaveLength(4);
    ROWS.filter(r => r.bullet === 1).forEach((row, i) => {
      expect(golden[i].toLowerCase(), `row ${row.id}`).toContain(row.needle);
    });
    const negatives = BULLETS[1].replace(/^Negative: /, "").replace(/\.$/, "").split(", ");
    expect(negatives).toHaveLength(8);
    ROWS.filter(r => r.bullet === 2).forEach((row, i) => {
      expect(negatives[i].toLowerCase(), `row ${row.id}`).toBe(row.needle);
    });
  });

  it.each(PINNED_ROWS)("row $id (bullet $bullet, $needle): pinned cases are registered, not skipped by a detected mode, keep their code markers and a tier-derived truth label", row => {
    expect(rowProblems(row, REAL, TIERS)).toEqual([]);
  });

  // An unpinned row is reported as a todo, never as a passing case: it has no case to pass.
  for (const row of UNPINNED_ROWS) it.todo(`row ${row.id} (bullet ${row.bullet}, ${row.needle}) is UNPINNED and never evidence: ${(row.unpinned ?? "").slice(0, 70)}`);

  it("the unpinned set is exactly the reasoned rows, each reported as unpinned (never green), so a newly pinnable row flips deliberately", () => {
    expect(UNPINNED_ROWS.map(r => r.id)).toEqual([...EXPECTED_UNPINNED]);
    expect(ROWS.filter(r => r.pins.length > 0 && r.unpinned !== undefined)).toEqual([]);
    for (const row of UNPINNED_ROWS) {
      expect((row.unpinned ?? "").length, `row ${row.id}`).toBeGreaterThanOrEqual(80);
      const problems = rowProblems(row, REAL, TIERS);
      expect(problems).toHaveLength(1);
      expect(problems[0]).toContain("UNPINNED and is never evidence");
    }
  });

  it("the tier table is derived from forge.toml and the vitest configs: the portable gate and the claude-live tier are distinct", () => {
    const gate = TIERS.find(tier => tier.name === "test");
    const live = TIERS.find(tier => tier.name === "claude-live");
    expect(gate?.gate).toBe(true);
    expect(gate?.allowOnly).toBe(true);
    expect(live?.gate).toBe(false);
    expect(collects(gate as Tier, PI_LIVE)).toBe(false);
    expect(collects(live as Tier, PI_LIVE)).toBe(true);
    expect(collects(gate as Tier, GATE_WORKTREE)).toBe(true);
  });

  it("a live SDK pass label sits only on the Pi live test and cites recorded forge runs; the two probe scripts are code present", () => {
    const labels = ROWS.flatMap(r => r.pins).map(p => ({ file: p.file, label: p.label, cites: (p.evidence ?? []).length }));
    expect(labels.filter(l => l.label === "live SDK pass").map(l => l.file)).toEqual([PI_LIVE, PI_LIVE]);
    for (const l of labels.filter(entry => entry.label === "live SDK pass")) expect(l.cites).toBeGreaterThanOrEqual(2);
    for (const l of labels.filter(entry => entry.file === LIVE_CLAUDE || entry.file === LIVE_RESUME)) expect(l.label).toBe("code present");
  });

  it("every titled it pin carries at least one code marker and every script pin carries file fragments, so no pin is a bare title", () => {
    for (const pin of ROWS.flatMap(r => r.pins)) {
      if (pin.title === undefined) expect((pin.fileMarkers ?? []).length, pin.file).toBeGreaterThan(0);
      else if ((pin.kind ?? "it") === "it") expect((pin.bodyMarkers ?? []).length, `${pin.file} ${pin.title}`).toBeGreaterThan(0);
    }
  });

  it("the Pi never-called pin is a spy plus a negative assertion plus the forbidden-name list, not a case that merely runs the Claude host", () => {
    const p1 = ROWS.find(r => r.id === "P1");
    expect(p1?.pins.length).toBeGreaterThanOrEqual(2);
    for (const pin of p1?.pins ?? []) {
      expect(pin.bodyMarkers?.some(m => m.includes("not.toHaveBeenCalled()"))).toBe(true);
      expect(pin.fileMarkers?.some(m => m.includes("AgentManager.prototype"))).toBe(true);
      expect(pin.fileMarkers?.some(m => m.includes("'spawnAndWait'"))).toBe(true);
    }
    expect(p1?.pins.some(pin => pin.file === HOST)).toBe(false);
  });

  it("the G1 gap names the h7r v2 operator receipt as nearest evidence only, and that receipt exists at the cited revision", () => {
    expect(REAL.read(RECEIPT)).toBeDefined();
    expect((JSON.parse(REAL.read(RECEIPT) ?? "{}") as { revision?: string }).revision).toBe("e07474a");
    const gap = ROWS.find(r => r.id === "G1")?.gap ?? "";
    expect(gap).toContain(RECEIPT);
    expect(gap).toContain("not a receipted single-agent acceptance");
  });
});

// ---- falsifiers: independently authored, one per detection mode ------------------------------

describe("scanner falsifiers (synthetic sources, one per mode)", () => {
  const PIN: Pin = { file: "x.test.ts", label: "fixture pass", kind: "it", title: "kept title", bodyMarkers: ["expect(spy).not.toHaveBeenCalled()"] };
  const CASE = 'it("kept title", async () => { expect(spy).not.toHaveBeenCalled(); });';
  const suite = (inner: string, head = 'describe("outer", () => {', tail = "});"): string => `${head}\n${inner}\n  it("other", () => { expect(1).toBe(1); });\n${tail}\n`;
  const check = (src: string, refused = true, pin: Pin = PIN): string => caseProblems(src, pin, refused).join("\n");

  it("control: a clean case produces no problem", () => {
    expect(check(suite(CASE))).toBe("");
  });
  it("a rename is absent", () => {
    expect(check(suite(CASE.replace("kept title", "renamed title")))).toContain("renamed, deleted");
  });
  it("a deletion is absent", () => {
    expect(check(suite(""))).toContain("renamed, deleted");
  });
  it.each(["it.skip", "it.todo", "it.fails", "it.skipIf(true)", "it.runIf(false)", "it.concurrent.skip", "it['skip']"])("%s is present-but-skipped, never renamed-or-deleted", head => {
    const out = check(suite(CASE.replace("it(", `${head}(`)));
    expect(out).toContain("present but skipped");
    expect(out).not.toContain("renamed, deleted");
  });
  it("S5: an options-object skip as the second argument is skipped", () => {
    expect(check(suite('it("kept title", { skip: true }, async () => { expect(spy).not.toHaveBeenCalled(); });'))).toContain("options.skip");
  });
  it("S5b: an options-object skip as the trailing argument is skipped", () => {
    expect(check(suite('it("kept title", async () => { expect(spy).not.toHaveBeenCalled(); }, { skip: true });'))).toContain("options.skip");
  });
  it("S6: an options-object todo is skipped", () => {
    expect(check(suite('it("kept title", { todo: true }, async () => { expect(spy).not.toHaveBeenCalled(); });'))).toContain("options.todo");
  });
  it("an options object with skip: false does not gate", () => {
    expect(check(suite('it("kept title", { skip: false }, async () => { expect(spy).not.toHaveBeenCalled(); });'))).toBe("");
  });
  it("S7: a describe options-object skip on an ENCLOSING describe is skipped", () => {
    expect(check(suite(CASE, 'describe("outer", { skip: true }, () => {'))).toContain('enclosing describe "outer" carries options.skip');
  });
  it("S8: ctx.skip() and a destructured skip() in the body are skipped", () => {
    expect(check(suite('it("kept title", async ctx => { ctx.skip(); expect(spy).not.toHaveBeenCalled(); });'))).toContain("ctx.skip()");
    expect(check(suite('it("kept title", async ({ skip }) => { skip(); expect(spy).not.toHaveBeenCalled(); });'))).toContain("ctx.skip()");
  });
  it("S9: a case inside a block comment or a line comment is absent", () => {
    expect(check(suite(`/* ${CASE} */`))).toContain("renamed, deleted");
    expect(check(suite(`// ${CASE}`))).toContain("renamed, deleted");
  });
  it("S11: registration under if, ternary, && or || is conditional", () => {
    expect(check(suite(`if (process.env.X) { ${CASE} }`))).toContain("conditional");
    expect(check(suite(`const registered = process.env.X ? ${CASE.replace(/;$/, "")} : undefined;`))).toContain("conditional");
    expect(check(suite(`process.env.X && ${CASE}`))).toContain("conditional");
  });
  it("S15: a string decoy holding the old title is absent once the case is renamed", () => {
    const src = suite(`const decoy = ${JSON.stringify(CASE)};\n${CASE.replace("kept title", "renamed title")}`);
    expect(src).toContain("kept title");
    expect(check(src)).toContain("renamed, deleted");
  });
  it("S17: a sibling focus modifier skips the pinned case where the config does not refuse focus, and is not reported where it does", () => {
    const src = suite(`${CASE}\n  it.${FOCUS}("sibling", () => {});`);
    expect(check(src, false)).toContain("sibling focus modifier");
    expect(check(src, true)).toBe("");
  });
  it("S30: a focus modifier on the pinned case is never a false red; a focused enclosing describe still runs it", () => {
    expect(check(suite(CASE.replace("it(", `it.${FOCUS}(`)), false)).toBe("");
    expect(check(suite(CASE, `describe.${FOCUS}("outer", () => {`), false)).toBe("");
  });
  it("S28/S29: an empty describe.each or it.each table registers nothing and is skipped", () => {
    expect(check(suite('it.each([])("kept title", async () => { expect(spy).not.toHaveBeenCalled(); });'))).toContain("empty each table");
    expect(check(suite(CASE, "describe.each([] as const)(\"outer\", () => {"))).toContain("empty each table");
  });
  it("a non-empty it.each title is found verbatim, escaped quotes included", () => {
    const pin: Pin = { ...PIN, title: "it's %s", bodyMarkers: ["expect(kind).toBe(1)"] };
    expect(caseProblems('it.each(["a", "b"])("it\'s %s", async kind => { expect(kind).toBe(1); });\n', pin, true)).toEqual([]);
  });
  it("BR1/BR2: a skip on an enclosing describe is the cause named, and an unrelated describe skip never reddens the case (attribution)", () => {
    expect(check(suite(CASE, 'describe.skip("outer", () => {'))).toContain('enclosing describe "outer" carries .skip');
    const unrelated = `describe("unrelated", () => {});\ndescribe.skip("other block", () => { it("x", () => {}); });\ndescribe("outer", () => {\n${CASE}\n});\n`;
    expect(check(unrelated)).toBe("");
  });
  it("two cases with the pinned title make the pin ambiguous", () => {
    expect(check(suite(`${CASE}\n${CASE}`))).toContain("ambiguous");
  });
  it("S19: an early return before the assertion makes the marker unreachable", () => {
    expect(check(suite('it("kept title", async () => { if (options) return; expect(spy).not.toHaveBeenCalled(); });'))).toContain("unreachable");
  });
  it("S20: a commented-out assertion line is absent even though the marker text survives in the comment", () => {
    expect(check(suite('it("kept title", async () => { // expect(spy).not.toHaveBeenCalled();\n });'))).toContain("lost the code fragment");
    expect(check(suite('it("kept title", async () => { /* expect(spy).not.toHaveBeenCalled(); */ });'))).toContain("lost the code fragment");
  });
  it("S22: an inline-commented override and a deleted override are absent", () => {
    const pin: Pin = { ...PIN, bodyMarkers: ['{ grants: ["*"] }'] };
    const keep = 'it("kept title", () => { for (const o of [{ grants: ["*"] }, { maxCalls: 0 }]) check(o); });';
    expect(check(suite(keep), true, pin)).toBe("");
    expect(check(suite(keep.replace('{ grants: ["*"] }, ', '/* { grants: ["*"] }, */')), true, pin)).toContain("lost the code fragment");
    expect(check(suite(keep.replace('{ grants: ["*"] }, ', "")), true, pin)).toContain("lost the code fragment");
  });
  it("a marker that survives only inside a string literal is absent", () => {
    expect(check(suite('it("kept title", async () => { const s = "expect(spy).not.toHaveBeenCalled()"; });'))).toContain("lost the code fragment");
  });
  it("a marker inside a conditional branch is unreachable", () => {
    expect(check(suite('it("kept title", async () => { if (flag) { expect(spy).not.toHaveBeenCalled(); } });'))).toContain("unreachable");
  });
  it("V1a: a hollowed case body is absent", () => {
    expect(check(suite('it("kept title", async () => {});'))).toContain("lost the code fragment");
  });
  it("a describe pin needs a runnable nested it that contains an expect call", () => {
    const pin: Pin = { file: "x.test.ts", label: "fixture pass", kind: "describe", title: "block" };
    expect(caseProblems('describe("block", () => { it("a", () => { expect(1).toBe(1); }); });', pin, true)).toEqual([]);
    expect(caseProblems('describe("block", () => { it.skip("a", () => { expect(1).toBe(1); }); });', pin, true).join("\n")).toContain("no runnable nested it");
    expect(caseProblems('describe("block", () => { it("a", () => {}); });', pin, true).join("\n")).toContain("no runnable nested it");
    expect(caseProblems('describe("block", () => {});', pin, true).join("\n")).toContain("no runnable nested it");
    expect(caseProblems('describe.skip("block", () => { it("a", () => { expect(1).toBe(1); }); });', pin, true).join("\n")).toContain("present but skipped");
  });
});

describe("real-file falsifiers (in-memory mutations of the pinned files, one per mode)", () => {
  const row = (id: string): Row => {
    const found = ROWS.find(r => r.id === id);
    if (found === undefined) throw new Error(`no row ${id}`);
    return found;
  };
  const probe = (id: string, env: Env): string => rowProblems(row(id), env, loadTiers(env)).join("\n");

  it("control: every pinned row is clean against the unmutated tree", () => {
    for (const r of PINNED_ROWS) expect(probe(r.id, REAL), r.id).toBe("");
  });

  const H7_LINE = ["    expect(expectPlainFailure(result)).toBe(`Claude SDK cwd is inaccessible: $", "{missing}.`);"].join("");
  const N8_ANCHOR = 'it("validates finite host policy and refuses wildcard or incomplete authority", async () => {\n    const { options } = await connect();';
  const cases: ReadonlyArray<readonly [string, string, () => Env, string]> = [
    ["S22 wildcard allow-list override deleted", "N8", () => mutated(CAPABILITY, '{ allowedCapabilities: ["*"] }, ', ""), "lost the code fragment"],
    ["S22 wildcard allow-list override commented inline", "N8", () => mutated(CAPABILITY, '{ allowedCapabilities: ["*"] }', '/* { allowedCapabilities: ["*"] } */ { maxCalls: 1 }'), "lost the code fragment"],
    ["S22b wildcard grants override deleted", "N8", () => mutated(CAPABILITY, '{ grants: ["*"] }, ', ""), "lost the code fragment"],
    ["S22c relative workspace override deleted", "N8", () => mutated(CAPABILITY, '{ workspace: "relative" }, ', ""), "lost the code fragment"],
    ["S19 hollow early return before the policy assertions", "N8", () => mutated(CAPABILITY, N8_ANCHOR, `${N8_ANCHOR}\n    if (options) return;`), "unreachable"],
    ["S20 throw assertion commented out", "N8", () => mutated(CAPABILITY, "      expect(() => createCuratedTools({ ...options, ...overrides })).toThrow(CapabilityError);\n    }\n  });\n});\n\n// Failure safety", "      // expect(() => createCuratedTools({ ...options, ...overrides })).toThrow(CapabilityError);\n    }\n  });\n});\n\n// Failure safety"), "lost the code fragment"],
    ["BR1 one describe options-skip empties the host rows (G1)", "G1", () => mutated(HOST, "describe('Workbench Claude execution host', () => {", "describe('Workbench Claude execution host', { skip: true }, () => {"), "options.skip"],
    ["BR1 one describe options-skip empties the host rows (N6)", "N6", () => mutated(HOST, "describe('Workbench Claude execution host', () => {", "describe('Workbench Claude execution host', { skip: true }, () => {"), "options.skip"],
    ["BR2 options-skip on adverse N1 describe empties N7", "N7", () => mutated(ADVERSE, 'describe("N1 inaccessible cwd refuses before any query", () => {', 'describe("N1 inaccessible cwd refuses before any query", { skip: true }, () => {'), "options.skip"],
    ["V1b options-skip on the adverse N8 describe", "V1", () => mutated(ADVERSE, 'describe("N8 error-subtype results are never a success", () => {', 'describe("N8 error-subtype results are never a success", { skip: true }, () => {'), "options.skip"],
    ["V1a hollowed adverse case", "V1", () => mutated(ADVERSE, '    expect(expectPlainFailure(result)).toBe("budget exhausted");\n', ""), "lost the code fragment"],
    ["H3 the N2 adverse case loses its assertion", "N3", () => mutated(ADVERSE, '    expect(expectPlainFailure(result)).toBe("Claude SDK result is missing structured_output.");\n', ""), "lost the code fragment"],
    ["H5 cancel case loses its abort-count assertion", "N5", () => mutated(CANCEL, "    expect(call.delivered).toEqual([]);\n    expect(call.abortEvents).toBe(1);\n    expect(call.abortedAtClose).toBe(true);\n", "    expect(call.delivered).toEqual([]);\n"), "lost the code fragment"],
    ["H7 inaccessible-cwd case loses its zero-query assertion", "N7", () => mutated(ADVERSE, `${H7_LINE}\n    expect(sdk.calls).toHaveLength(0);\n  });\n\n  it("control: an accessible cwd`, `${H7_LINE}\n  });\n\n  it("control: an accessible cwd`), "lost the code fragment"],
    ["P1a forbidden-name list emptied (vacuous never-Pi pin)", "P1", () => mutated(STREAMING, "const forbidden = ['spawn', 'spawnAndWait', 'resume'] as const;", "const forbidden = [] as const;"), "missing code fragment"],
    ["P1b never-Pi assertion commented out", "P1", () => mutated(STREAMING, "for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();", "// for (const spy of client.spies) expect(spy).not.toHaveBeenCalled();", true), "lost the code fragment"],
    ["P1c ctx.skip() in the streaming pin", "P1", () => mutated(STREAMING, "it('returns parallel structured values under distinct native session identities through registered Pi tool', async () => {", "it('returns parallel structured values under distinct native session identities through registered Pi tool', async ctx => { ctx.skip();"), "ctx.skip()"],
    ["P1d options-skip on the streaming pin", "P1", () => mutated(STREAMING, "it('returns parallel structured values under distinct native session identities through registered Pi tool', async () => {", "it('returns parallel structured values under distinct native session identities through registered Pi tool', { skip: true }, async () => {"), "options.skip"],
    ["L1 options-skip on the live-tier pin", "G2", () => mutated(PI_LIVE, "it('runs three parallel structured agents with actual sessions and no Pi manager invocation',async()=>{", "it('runs three parallel structured agents with actual sessions and no Pi manager invocation',{skip:true},async()=>{"), "options.skip"],
    ["L1b sibling focus in the live file (its config does not set allowOnly false)", "G2", () => mutated(PI_LIVE, "describe('VC-1 registered Pi real Claude SDK acceptance',()=>{", `describe('VC-1 registered Pi real Claude SDK acceptance',()=>{\n  it.${FOCUS}('sibling',()=>{});`), "sibling focus modifier"],
    ["T1 the live file leaves the literal exclude list", "G2", () => mutated("vitest.config.ts", '"test/workbench-claude-pi-live.test.ts", ', ""), "a gate-collected fixture is never a live pass"],
    ["T2 default include narrowed past the gate-worktree test", "W1", () => mutated("vitest.config.ts", 'include: ["test/**/*.test.ts"],', 'include: ["test/workbench-*.test.ts"],'), "no gate tier collects the file"],
    ["T3g exclude GLOB drops the adverse-faults file from the gate", "N3", () => mutated("vitest.config.ts", 'exclude: ["test/workbench-native-client.test.ts",', 'exclude: ["test/workbench-claude-*-faults.test.ts", "test/workbench-native-client.test.ts",'), "no gate tier collects the file"],
    ["T6 live config include no longer names the live file", "G2", () => mutated("vitest.claude-live.config.ts", "include:['test/workbench-claude-pi-live.test.ts']", "include:['test/other.test.ts']"), "no registered forge command collects the file"],
    ["T7 the claude-live forge command deleted", "G2", () => mutated("forge.toml", '[build.commands.claude-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.claude-live.config.ts"\ntimeout = 210\n', ""), "no registered forge command collects the file"],
    ["E1 the cited forge run record vanishes from TRACEABILITY", "G2", () => mutated(TRACE, "cmd_b5f4df13dd3b", "cmd_removed", true), "cited evidence"],
  ];
  it.each(cases)("%s", (_mode, id, makeEnv, needle) => {
    const out = probe(id, makeEnv());
    expect(out).toContain(needle);
    expect(out).toContain(`row ${id}`);
  });

  it("X1 attribution: a skip on an unrelated adverse describe reddens only the rows it encloses", () => {
    const env = mutated(ADVERSE, 'describe("N1 inaccessible cwd refuses before any query", () => {', 'describe.skip("N1 inaccessible cwd refuses before any query", () => {');
    expect(probe("N7", env)).toContain('enclosing describe "N1 inaccessible cwd refuses before any query" carries .skip');
    expect(probe("N3", env)).toBe("");
    expect(probe("V1", env)).toBe("");
    expect(probe("N4", env)).toBe("");
  });

  it("S17 on the real tree: with the default config refusing focus, a sibling focus modifier in the N8 file is the gate's refusal, not a false census red", () => {
    const env = mutated(CAPABILITY, "describe(\"curated actual SDK MCP provider boundary\", () => {", `describe("curated actual SDK MCP provider boundary", () => {\n  it.${FOCUS}("sibling", () => {});`);
    expect(probe("N8", env)).toBe("");
    const unrefused = mutated("vitest.config.ts", "allowOnly: false,", "allowOnly: true,");
    const both = realEnv({
      "vitest.config.ts": unrefused.read("vitest.config.ts") ?? "",
      [CAPABILITY]: env.read(CAPABILITY) ?? "",
    });
    expect(probe("N8", both)).toContain("sibling focus modifier");
  });
});

describe("docs/04 section falsifiers (rendered slice, one per mode)", () => {
  const doc = readFileSync(join(ROOT, DOC), "utf8");
  const swap = (from: string, to: string): string => {
    expect(doc.split(from).length - 1, from).toBe(1);
    return doc.replace(from, () => to);
  };
  const BULLET3 = `- ${BULLETS[2]}`;
  const LAST = `- ${BULLETS[4]}`;
  const list = BULLETS.map(bullet => `- ${bullet}`).join("\n");

  it("control: the real document is clean", () => {
    expect(docProblems(doc)).toEqual([]);
  });
  const mutations: ReadonlyArray<readonly [string, string]> = [
    ["D1 suffix on bullet 3", swap("under Claude backend.", "under Claude backend, except in tests.")],
    ["D2 negation of bullet 3", swap("never calls", "may call")],
    ["D3 non-bullet paragraph inside the section", swap(LAST, `${LAST}\n\nA stray paragraph.`)],
    ["D4 indented continuation of bullet 3", swap(BULLET3, `${BULLET3}\n  and a continuation line`)],
    ["D5 level-3 subsection carrying an extra bullet", swap(LAST, `${LAST}\n\n### Sub\n- an extra bullet`)],
    ["D6 level-1 heading splits the list", swap(BULLET3, `# Interloper\n${BULLET3}`)],
    ["D7 a bullet removed", swap(`${LAST}`, "")],
    ["D8 bullets reordered", swap(list, [BULLETS[1], BULLETS[0], ...BULLETS.slice(2)].map(bullet => `- ${bullet}`).join("\n"))],
    ["D9h bullet 3 inside an HTML comment", swap(BULLET3, `<!-- ${BULLET3} -->`)],
    ["D10h the whole list inside an HTML comment", swap(list, `<!--\n${list}\n-->`)],
    ["D11 a decoy second Tests heading", `${doc}\n## Tests\n\n${list}\n`],
    ["D12 an unterminated comment hides the tail", swap(LAST, `<!-- ${LAST}`)],
  ];
  it.each(mutations)("%s is red", (_mode, text) => {
    expect(docProblems(text).length).toBeGreaterThan(0);
  });
  it("an HTML comment appended to a bullet line is invisible in the rendered section and does not change the verdict", () => {
    expect(docProblems(swap(BULLET3, `${BULLET3}<!-- reviewer note -->`))).toEqual([]);
  });
  it("a trailing section after the next level-2 heading does not count against the slice", () => {
    expect(docProblems(`${doc}\n## Appendix\n\n- unrelated bullet\n`)).toEqual([]);
  });
});
