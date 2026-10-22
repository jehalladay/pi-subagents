/**
 * wb-1xvp.2 (RF-GRAPH-POLICY-MACHINE-CONTROL-R1): Pi reaches GraphPolicyCLI only through its real interfaces and adds no
 * policy capability of its own. A standing census over every src module and package.json, judged by the four rules of
 * docs/workbench/03-architecture-and-ownership.md section "GraphPolicyCLI boundary" (GP-1..GP-4, one pin per clause).
 *
 * The obligation (bead wb-1xvp.2, owner filing program-triage-2026-10-22): "Pi shall reach GraphPolicyCLI only through
 * its real interfaces (gp CLI, SDK or rpc --stdio) and add no policy capability of its own: no re-implemented gp scoring,
 * sampling, embedding or receipts (a missing verb is extended in GraphPolicyCLI), no unrelated dependency, no new kill or
 * store-mutation path (recovery only via existing Furnace lifecycle boundaries), no training backend on a decision path,
 * and training, inference, telemetry, admission and execution in separate modules". Source line:
 * ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:79@6a251bf73af5 "Do not copy
 * GraphPolicyCLI's numerical implementation into the machine. Establish a supported integration through the real CLI,
 * SDK, or RPC interfaces." Merged pins at the same sha: :71 (GraphPolicyCLI owns graph-function representations,
 * numerical evaluation, learned scores, embeddings, predictions, policy distributions, and associated receipts), :81 (no
 * unrelated ecosystem dependencies), :232 (preemption, cancellation and recovery through existing lifecycle boundaries),
 * :460 (no fresh heavyweight training backend per decision), :486 (training, runtime inference, telemetry, host admission
 * and machine execution kept separate), :496 (extend GraphPolicyCLI rather than duplicating its internals).
 * The bead's acceptance legs map one row each: (a) GP-1, (b) GP-2, (c) GP-3, (d) GP-4.
 *
 * Today (base 0b2a80f) Pi carries no gp code. R0 pins the measured gp roster of the live tree empty and GP_SEAMS (this
 * census's register of gp client and admission modules) empty, and judges the live tree clean. A gp landing registers each
 * seam module in GP_SEAMS, and updates the docs/03 ownership row, in the same commit; the GP-1..GP-4 checks judge it from
 * then on. Until then most checks hold vacuously on the live tree, so the F rows prove every pin live on a synthetic tree:
 * a compliant integration (a client that launches gp and maps the unknown-command refusal, a decision module that
 * proposes through the existing lifecycle module, an admission seam, the telemetry writer) judges clean, and each
 * single-clause mutation of it is named by exactly the expected pin(s).
 *
 * Producer facts measured 2026-10-22 against the installed gp 0.1.0: the npm package is graph-policy-cli (bin gp, no
 * exports map); an unknown command answers with the graphpolicy.cli.v1 envelope error.code GP_CLI_UNKNOWN_COMMAND; the
 * command surface lists train beside eval, sample and rpc --stdio.
 *
 * Code tokens only: every module is read from its TypeScript AST, never from its comments. The blind spots of a token
 * census are NAMED RESIDUALS (RESIDUALS below, listed in the docs section), each pinned by a quiet row.
 * Display paths added: none. No scratch directory is allocated: the synthetic trees live in memory.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { builtinModules } from "node:module";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_03 = "docs/workbench/03-architecture-and-ownership.md";
const CENSUS_FILE = "test/workbench-gp-real-interfaces.test.ts";
const BOUNDARY_HEADING = "## GraphPolicyCLI boundary";
/** The docs/03 "Ownership boundaries" row naming GraphPolicyCLI, pinned whole: a gp landing updates it with GP_SEAMS. */
const OWNERSHIP_ROW =
  "| Graph-function representations, numerical evaluation, learned scores, embeddings, predictions, policy distributions and their receipts | GraphPolicyCLI | nothing today (no gp seam is registered); a future seam reaches gp only through its CLI, SDK or `gp rpc --stdio`, under the GraphPolicyCLI boundary below |";

/** The one GraphPolicyCLI package (measured: the installed gp 0.1.0 is npm graph-policy-cli, bin gp). */
const GP_PACKAGE = "graph-policy-cli";
/** Pi's telemetry writer: createTelemetryEmitter / emitOperationsTelemetry deliver to a TelemetrySink. */
const TELEMETRY_WRITERS: readonly string[] = ["src/workbench/telemetry.ts"];
const MANIFEST = "package.json";

type SeamRole = "client" | "admission";
interface GpSeam {
  readonly file: string;
  readonly role: SeamRole;
}

/** The gp seams this census admits, by role. EMPTY at base 0b2a80f (frozen in R0): Pi carries no gp integration. */
const GP_SEAMS: readonly GpSeam[] = [];

const SOURCE_EXTENSIONS = new Set([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs"]);
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
/** child_process launchers and same-named members (ServerConnection.spawn, cp.execFile, ...). */
const LAUNCHERS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
/** Launchers that take one shell command string: its first word is the binary, the rest its argv. */
const SHELL_LAUNCHERS = new Set(["exec", "execSync"]);
/** Binaries an argv array may name first when it is handed to an injected launch seam. */
const ARGV_BINARIES = new Set(["gp", "bd", "furnace", "kill", "pkill", "killall"]);
const KILL_BINARIES = new Set(["kill", "pkill", "killall"]);
/** bd verbs that only read; any other bd launch is a write, a launch whose verb is not a literal included. */
const BD_READ_VERBS = new Set(["show", "list", "ready", "blocked", "search", "stats", "status", "count", "info", "where", "version", "help", "graph", "doctor"]);
const AGENT_SDK = "@anthropic-ai/claude-agent-sdk";
/** The Agent SDK functions that start or attach a Claude agent session (measured from its exported declarations). */
const AGENT_SESSION_FUNCTIONS = new Set(["query", "createCodeSession", "attachBridgeSession", "forkSession"]);
/** @furnace/sdk members whose stop() ends a Run, an Attempt, a Run's supervision or the supervisor host (client.d.ts Runs, Attempts, Supervision, Host). */
const FURNACE_STOP_OWNERS = new Set(["runs", "attempts", "supervision", "host"]);
/** A Furnace Run or Attempt handle by name (run, runHandle, activeRun, attempt, attemptRef): handle.stop() ends it. */
const FURNACE_HANDLE = /^(?:run|attempt)(?:[A-Z]\w*)?$|(?:Run|Attempt)$/;
/** A string token naming the gp binary: bare gp, or a path ending in it. */
const GP_BINARY = /^(?:.*[/\\])?gp(?:\.exe|\.cmd)?$/;
/** A specifier or package name of the GraphPolicyCLI family (graph-policy-cli, graphpolicy, @scope/graph_policy, ...). */
const GP_FAMILY = /graph[-_]?policy/i;
/** gp wire vocabulary in a code token: GraphDataIR, the graphpolicy.<surface>.v<n> schema ids, GP_CLI_* and GP_RPC_* codes. */
const GP_WORDS = /graph[-_]?data[-_]?ir|graphpolicy\.[a-z0-9_-]+\.v\d+|GP_(?:CLI|RPC)_[A-Z0-9_]+/i;
const UNKNOWN_COMMAND = "GP_CLI_UNKNOWN_COMMAND";
/** The gp training verb as a word inside a string token: "train", "train --program p", a template ending in " train". */
const TRAIN_WORD = /(?:^|[^A-Za-z0-9_])train(?:[^A-Za-z0-9_]|$)/;
/** Deny roster of JS training and model frameworks; named residual TRAINING-FRAMEWORK-ROSTER covers the rest. */
const TRAINING_FRAMEWORKS =
  /(?:^|[/@-])(?:tensorflow|tfjs|onnxruntime|torch|pytorch|brain\.js|synaptic|ml5|keras|xgboost|lightgbm|catboost|scikit|sklearn|transformers|mlc-ai)(?:$|[/-])/i;
const RUNTIME_SECTIONS = ["dependencies", "optionalDependencies", "peerDependencies", "bundledDependencies", "bundleDependencies"] as const;
const ALL_SECTIONS = [...RUNTIME_SECTIONS, "devDependencies"] as const;
const BUILTINS: ReadonlySet<string> = new Set(builtinModules);

interface Hit {
  readonly line: number;
  readonly text: string;
}

interface Launch {
  readonly line: number;
  readonly binary: string;
  readonly argv: readonly string[];
}

/** One module's code tokens, read from its AST. */
interface ModuleCensus {
  readonly file: string;
  /** Every module specifier: import and export-from declarations, import-equals, import() and require() calls, import types. */
  readonly specifiers: readonly string[];
  /** The specifiers the module loads at run time: type-only declarations and import types excluded. */
  readonly runtimeImports: readonly string[];
  /** Launcher calls whose binary is a literal (or a same-file string constant, or process.execPath), and binary-first argv arrays. */
  readonly launches: readonly Launch[];
  /** String tokens naming the gp binary (module specifiers excluded). */
  readonly gpBinary: readonly Hit[];
  /** Launches of gp: the gp binary, or an argv naming the GraphPolicyCLI package (npx graph-policy-cli, node .../graph-policy-cli/dist/main.js). */
  readonly gpLaunches: readonly Hit[];
  /** import() and require() calls whose specifier is not a literal. */
  readonly dynamicLoads: readonly Hit[];
  /** Code tokens naming gp wire vocabulary (module specifiers excluded). */
  readonly gpVocabulary: readonly Hit[];
  /** Every code token of the GraphPolicyCLI name family, module specifiers and identifiers included (the R0 absence roster). */
  readonly gpFamily: readonly Hit[];
  /** String tokens carrying the train word (module specifiers excluded). */
  readonly trainTokens: readonly Hit[];
  readonly namesUnknownCommand: boolean;
  readonly processKill: readonly Hit[];
  readonly furnaceStop: readonly Hit[];
  readonly bdWrite: readonly Hit[];
  readonly agentSession: readonly Hit[];
  readonly hostLaunch: readonly Hit[];
}

const basenameOf = (path: string): string => path.split(/[/\\]/).pop() ?? path;

function scriptKind(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (/\.[cm]?js$/.test(file)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

const isProcess = (node: ts.Expression): boolean =>
  (ts.isIdentifier(node) && node.text === "process") || (ts.isPropertyAccessExpression(node) && node.name.text === "process");

const calleeName = (node: ts.Expression): string | undefined =>
  ts.isIdentifier(node) ? node.text : ts.isPropertyAccessExpression(node) ? node.name.text : undefined;

/** Reads one module's code tokens from its AST, never its comments. */
function moduleCensus(file: string, text: string): ModuleCensus {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const line = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const hit = (node: ts.Node, token: string): Hit => ({ line: line(node), text: token });
  const constants = new Map<string, string>();
  const sdkNamespaces = new Set<string>();
  const agentSession: Hit[] = [];
  // Pass 1: same-file string constants, and the run-time query binding of the Claude Agent SDK (an aliased or re-bound
  // query is still the agent-session seam, so the import itself is the marker).
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isStringLiteralLike(node.initializer)) {
      constants.set(node.name.text, node.initializer.text);
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text === AGENT_SDK) {
      const clause = node.importClause;
      const bindings = clause !== undefined && clause.phaseModifier !== ts.SyntaxKind.TypeKeyword ? clause.namedBindings : undefined;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          if (!element.isTypeOnly && AGENT_SESSION_FUNCTIONS.has((element.propertyName ?? element.name).text)) agentSession.push(hit(element, element.getText(sf)));
        }
      }
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) sdkNamespaces.add(bindings.name.text);
    }
    ts.forEachChild(node, collect);
  };
  collect(sf);
  const literalValue = (node: ts.Node | undefined): string | undefined => {
    if (node === undefined) return undefined;
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isIdentifier(node)) return constants.get(node.text);
    if (ts.isPropertyAccessExpression(node) && node.name.text === "execPath" && isProcess(node.expression)) return "<process.execPath>";
    return undefined;
  };
  const literalsOf = (elements: readonly ts.Expression[]): string[] =>
    elements.flatMap(element => {
      const value = literalValue(element);
      return value === undefined ? [] : [value];
    });
  const specifiers: string[] = [];
  const runtimeImports: string[] = [];
  const launches: Launch[] = [];
  const gpBinary: Hit[] = [];
  const gpVocabulary: Hit[] = [];
  const gpFamily: Hit[] = [];
  const trainTokens: Hit[] = [];
  const processKill: Hit[] = [];
  const furnaceStop: Hit[] = [];
  const hostLaunch: Hit[] = [];
  const dynamicLoads: Hit[] = [];
  let namesUnknownCommand = false;
  /** Module specifier literals: judged by the specifier checks, never as binary, vocabulary or train tokens. */
  const specifierNodes = new Set<ts.Node>();
  const addSpecifier = (node: ts.StringLiteralLike, runtime: boolean): void => {
    specifierNodes.add(node);
    specifiers.push(node.text);
    if (runtime) runtimeImports.push(node.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) addSpecifier(node.moduleSpecifier, node.importClause?.phaseModifier !== ts.SyntaxKind.TypeKeyword);
    if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) addSpecifier(node.moduleSpecifier, !node.isTypeOnly);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      addSpecifier(node.moduleReference.expression, !node.isTypeOnly);
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) addSpecifier(node.argument.literal, false);
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const first = node.arguments[0];
      const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
      if (loads && first !== undefined && ts.isStringLiteralLike(first)) addSpecifier(first, true);
      else if (loads) dynamicLoads.push(hit(node, node.getText(sf)));
      const name = calleeName(callee);
      const shell = name !== undefined && SHELL_LAUNCHERS.has(name);
      // A shell command assembled in a template keeps its static head: `bd close ${id}` still names bd and close.
      const command = shell && first !== undefined && ts.isTemplateExpression(first) ? first.head.text : literalValue(first);
      const binary = name !== undefined && LAUNCHERS.has(name) ? command : undefined;
      if (binary !== undefined && shell) {
        const [command = "", ...words] = binary.trim().split(/\s+/);
        launches.push({ line: line(node), binary: command, argv: words });
      } else if (binary !== undefined) {
        const argv = node.arguments[1];
        launches.push({ line: line(node), binary, argv: argv !== undefined && ts.isArrayLiteralExpression(argv) ? literalsOf(argv.elements) : [] });
      }
      if (ts.isPropertyAccessExpression(callee) && callee.name.text === "stop") {
        const receiver = callee.expression;
        if ((ts.isPropertyAccessExpression(receiver) && FURNACE_STOP_OWNERS.has(receiver.name.text)) || (ts.isIdentifier(receiver) && FURNACE_HANDLE.test(receiver.text))) {
          furnaceStop.push(hit(node, callee.getText(sf)));
        }
      }
    }
    if (ts.isPropertyAccessExpression(node) && AGENT_SESSION_FUNCTIONS.has(node.name.text) && ts.isIdentifier(node.expression) && sdkNamespaces.has(node.expression.text)) {
      agentSession.push(hit(node, node.getText(sf)));
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && isProcess(node.initializer)) {
      for (const element of node.name.elements) {
        const bound = element.propertyName ?? element.name;
        if (ts.isIdentifier(bound) && bound.text === "kill") processKill.push(hit(element, `${node.initializer.getText(sf)}.kill`));
      }
    }
    if (ts.isArrayLiteralExpression(node)) {
      const head = literalValue(node.elements[0]);
      if (head !== undefined && ARGV_BINARIES.has(basenameOf(head))) launches.push({ line: line(node), binary: head, argv: literalsOf(node.elements.slice(1)) });
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "kill" && isProcess(node.expression)) processKill.push(hit(node, node.getText(sf)));
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "kill" && isProcess(node.expression)) {
      processKill.push(hit(node, node.getText(sf)));
    }
    if (ts.isNewExpression(node) && calleeName(node.expression) === "Worker") hostLaunch.push(hit(node, node.expression.getText(sf)));
    const literal = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? node.text : undefined;
    const word = literal ?? (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) ? node.text : undefined);
    if (word !== undefined && GP_FAMILY.test(word)) gpFamily.push(hit(node, word));
    const token = specifierNodes.has(node) ? undefined : literal;
    if (token !== undefined && GP_BINARY.test(token)) gpBinary.push(hit(node, token));
    if (token !== undefined && TRAIN_WORD.test(token)) trainTokens.push(hit(node, token));
    const code = specifierNodes.has(node) ? undefined : word;
    if (code !== undefined && GP_WORDS.test(code)) gpVocabulary.push(hit(node, code));
    if (code?.includes(UNKNOWN_COMMAND)) namesUnknownCommand = true;
    ts.forEachChild(node, visit);
  };
  visit(sf);
  const gpLaunches = launches
    .filter(launch => GP_BINARY.test(basenameOf(launch.binary)) || launch.argv.some(arg => GP_FAMILY.test(arg)))
    .map(launch => ({ line: launch.line, text: `${launch.binary} ${launch.argv.join(" ")}`.trim() }));
  for (const launch of launches) {
    const base = basenameOf(launch.binary);
    if (launch.binary === "<process.execPath>") hostLaunch.push({ line: launch.line, text: launch.binary });
    if (KILL_BINARIES.has(base)) processKill.push({ line: launch.line, text: base });
    if (base === "furnace" && launch.argv.includes("stop")) furnaceStop.push({ line: launch.line, text: `furnace ${launch.argv.join(" ")}` });
  }
  const bdWrite = launches
    .filter(launch => basenameOf(launch.binary) === "bd")
    .filter(launch => {
      const verb = launch.argv.find(arg => /^[a-z][a-z-]*$/.test(arg));
      return verb === undefined || !BD_READ_VERBS.has(verb);
    })
    .map(launch => ({ line: launch.line, text: `bd ${launch.argv.join(" ")}` }));
  return { file, specifiers, runtimeImports, launches, gpBinary, gpLaunches, dynamicLoads, gpVocabulary, gpFamily, trainTokens, namesUnknownCommand, processKill, furnaceStop, bdWrite, agentSession, hostLaunch };
}

type Manifest = Readonly<Record<string, unknown>>;

interface SourceTree {
  readonly modules: ReadonlyMap<string, string>;
  readonly manifest: Manifest;
}

const namesIn = (manifest: Manifest, section: string): string[] => {
  const value = manifest[section];
  if (Array.isArray(value)) return value.filter((name): name is string => typeof name === "string");
  if (value !== null && typeof value === "object") return Object.keys(value);
  return [];
};

const isRelative = (specifier: string): boolean => specifier.startsWith(".");
const packageOf = (specifier: string): string => {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : (parts[0] ?? specifier);
};
const isBuiltin = (specifier: string): boolean => specifier.startsWith("node:") || BUILTINS.has(specifier) || BUILTINS.has(packageOf(specifier));
const isGpPackage = (specifier: string): boolean => packageOf(specifier) === GP_PACKAGE;

/** The tree module a relative specifier names (src uses .js specifiers for .ts sources), if the tree holds it. */
function resolveRelative(from: string, specifier: string, modules: ReadonlyMap<string, unknown>): string | undefined {
  if (!isRelative(specifier)) return undefined;
  const base = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [base, base.replace(/\.js$/, ".ts"), base.replace(/\.js$/, ".tsx"), base.replace(/\.mjs$/, ".mts"), base.replace(/\.cjs$/, ".cts"), `${base}.ts`, `${base}/index.ts`];
  return candidates.find(candidate => modules.has(candidate));
}

interface Finding {
  readonly file: string;
  readonly code: string;
}

interface JudgeContext {
  readonly census: ReadonlyMap<string, ModuleCensus>;
  readonly manifest: Manifest;
  readonly seams: readonly GpSeam[];
  readonly clients: ReadonlySet<string>;
  readonly admissions: readonly string[];
  /** Every gp client and its src import closure (run-time imports). */
  readonly decisionPath: readonly string[];
  /** Every gp client and every module that imports one at run time. */
  readonly adjacent: readonly string[];
  /** Every module that itself calls process.kill, stops a Furnace Run or Attempt, writes through bd, starts a Claude agent session or launches a workflow host. */
  readonly executionSeams: readonly string[];
  readonly importsOf: (file: string) => readonly string[];
  readonly closureOf: (file: string) => readonly string[];
}

function contextOf(tree: SourceTree, seams: readonly GpSeam[]): JudgeContext {
  const census = new Map([...tree.modules].map(([file, text]) => [file, moduleCensus(file, text)] as const));
  const importsOf = (file: string): string[] =>
    (census.get(file)?.runtimeImports ?? []).flatMap(specifier => {
      const target = resolveRelative(file, specifier, census);
      return target === undefined ? [] : [target];
    });
  const closureOf = (start: string): string[] => {
    const seen = new Set<string>();
    const queue = [start];
    for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
      if (seen.has(file) || !census.has(file)) continue;
      seen.add(file);
      queue.push(...importsOf(file));
    }
    return [...seen].sort();
  };
  const clients = new Set(seams.filter(seam => seam.role === "client").map(seam => seam.file));
  const admissions = seams.filter(seam => seam.role === "admission").map(seam => seam.file);
  const decisionPath = [...new Set([...clients].flatMap(closureOf))].sort();
  const adjacent = [...census.keys()].filter(file => clients.has(file) || importsOf(file).some(target => clients.has(target))).sort();
  const executionSeams = [...census.values()]
    .filter(entry => entry.processKill.length + entry.furnaceStop.length + entry.bdWrite.length + entry.agentSession.length + entry.hostLaunch.length > 0)
    .map(entry => entry.file)
    .sort();
  return { census, manifest: tree.manifest, seams, clients, admissions, decisionPath, adjacent, executionSeams, importsOf, closureOf };
}

/** A synthetic tree: modules by repo path, a package.json body and the gp seams it registers. */
interface Fixture {
  readonly modules: Readonly<Record<string, string>>;
  readonly manifest: Manifest;
  readonly seams: readonly GpSeam[];
}

const treeOf = (fixture: Fixture): SourceTree => ({ modules: new Map(Object.entries(fixture.modules)), manifest: fixture.manifest });
const withModule = (fixture: Fixture, file: string, text: string): Fixture => ({ ...fixture, modules: { ...fixture.modules, [file]: text } });
/** Edits one fixture module; an edit that changes nothing throws, so a falsifier can never silently fail to apply. */
function editModule(fixture: Fixture, file: string, edit: (text: string) => string): Fixture {
  const text = fixture.modules[file];
  if (text === undefined) throw new Error(`fixture holds no ${file}`);
  const next = edit(text);
  if (next === text) throw new Error(`the edit left ${file} unchanged`);
  return withModule(fixture, file, next);
}
function withDependency(fixture: Fixture, section: string, name: string, version: string): Fixture {
  const current = fixture.manifest[section];
  const entries = current !== null && typeof current === "object" && !Array.isArray(current) ? current : {};
  return { ...fixture, manifest: { ...fixture.manifest, [section]: { ...entries, [name]: version } } };
}

const CLIENT = "src/workbench/providers/graphpolicy.ts";
const PROCESS_ENV = "src/workbench/process-env.ts";
const DECISION = "src/workbench/gp-decision.ts";
const LIFECYCLE = "src/workbench/furnace-control.ts";
const ADMISSION = "src/workbench/gp-admission.ts";
const TELEMETRY = "src/workbench/telemetry.ts";

/** The client's refusal mapping: gp's unknown-command error.code becomes a typed refusal. */
const REFUSAL_LINES = [
  'export type GpRefusal = { readonly kind: "refused"; readonly code: "GP_CLI_UNKNOWN_COMMAND" };',
  "export function refusalOf(code: string): GpRefusal | undefined {",
  '  return code === "GP_CLI_UNKNOWN_COMMAND" ? { kind: "refused", code } : undefined;',
  "}",
].join("\n");
const EVAL_CALL = 'spawn("gp", ["eval", "--program", program, "--json"], { env: scrubbedEnvironment(process.env) })';

/** A compliant gp integration: every rule holds, so the census must judge it clean. */
const CLEAN: Fixture = {
  modules: {
    [CLIENT]: [
      'import { spawn } from "node:child_process";',
      'import { scrubbedEnvironment } from "../process-env.js";',
      REFUSAL_LINES,
      "export function gpEval(program: string) {",
      `  return ${EVAL_CALL};`,
      "}",
    ].join("\n"),
    [PROCESS_ENV]: [
      "export function scrubbedEnvironment(env: Readonly<Record<string, string | undefined>>): Record<string, string> {",
      "  const path = env.PATH;",
      "  return path === undefined ? {} : { PATH: path };",
      "}",
    ].join("\n"),
    [DECISION]: [
      'import { gpEval } from "./providers/graphpolicy.js";',
      'import { proposeRunStop } from "./furnace-control.js";',
      "export function decide(program: string, runId: string): Promise<void> {",
      "  gpEval(program);",
      "  return proposeRunStop(runId);",
      "}",
    ].join("\n"),
    [LIFECYCLE]: [
      "declare const client: { readonly runs: { stop(id: string): Promise<void> } };",
      "export function proposeRunStop(id: string): Promise<void> {",
      "  return client.runs.stop(id);",
      "}",
    ].join("\n"),
    [ADMISSION]: ["export function admitReply(reply: unknown): boolean {", '  return typeof reply === "object" && reply !== null;', "}"].join("\n"),
    [TELEMETRY]: [
      "export interface TelemetrySink {",
      "  emit(event: string): void;",
      "}",
      "export function emitOperationsTelemetry(sink: TelemetrySink): void {",
      '  sink.emit("report");',
      "}",
    ].join("\n"),
  },
  manifest: { dependencies: { [GP_PACKAGE]: "0.1.0", nanoid: "^5.1.16" } },
  seams: [
    { file: CLIENT, role: "client" },
    { file: ADMISSION, role: "admission" },
  ],
};

type Check = (ctx: JudgeContext) => readonly Finding[];

/** One single-clause mutation of CLEAN and the exact findings the census must report for it. */
interface Falsifier {
  readonly name: string;
  readonly apply: (fixture: Fixture) => Fixture;
  readonly expected: readonly string[];
}

interface Pin {
  readonly id: string;
  /** The clause, verbatim as the docs/03 boundary bullet states it. */
  readonly clause: string;
  readonly check: Check;
  readonly falsifiers: readonly Falsifier[];
}

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

const modulesOf = (ctx: JudgeContext, files: readonly string[]): ModuleCensus[] =>
  files.flatMap(file => {
    const entry = ctx.census.get(file);
    return entry === undefined ? [] : [entry];
  });

const ROWS: readonly Row[] = [
  {
    id: "GP-1",
    label: "real interfaces",
    pins: [
      {
        id: "a1",
        clause: "every gp call site reaches gp through the gp binary, the GraphPolicyCLI package or `gp rpc --stdio`",
        check: ctx => {
          const findings: Finding[] = ctx.seams.filter(seam => !ctx.census.has(seam.file)).map(seam => ({ file: seam.file, code: "registered-seam-missing" }));
          for (const entry of ctx.census.values()) {
            const family = entry.specifiers.filter(specifier => !isRelative(specifier) && GP_FAMILY.test(packageOf(specifier)));
            const reachesGp = entry.gpBinary.length + entry.gpLaunches.length > 0;
            if (ctx.clients.has(entry.file)) {
              if (!reachesGp && !entry.runtimeImports.some(isGpPackage)) findings.push({ file: entry.file, code: "client-reaches-gp-through-no-real-interface" });
              for (const specifier of family.filter(candidate => !isGpPackage(candidate))) findings.push({ file: entry.file, code: `client-imports-${specifier}` });
            } else {
              if (reachesGp) findings.push({ file: entry.file, code: "gp-call-site-outside-client" });
              if (family.length > 0) findings.push({ file: entry.file, code: "gp-package-outside-client" });
            }
          }
          return findings;
        },
        falsifiers: [
          {
            name: "an unregistered module launches gp",
            apply: fixture =>
              withModule(fixture, "src/workbench/gp-shortcut.ts", 'import { execFileSync } from "node:child_process";\nexport const evalNow = (): Buffer => execFileSync("gp", ["eval", "--json"]);'),
            expected: ["GP-1/a1 src/workbench/gp-shortcut.ts gp-call-site-outside-client"],
          },
          {
            name: "an unregistered module runs the GraphPolicyCLI package through npx",
            apply: fixture => withModule(fixture, "src/workbench/gp-npx.ts", 'import { spawnSync } from "node:child_process";\nexport const evalNow = () => spawnSync("npx", ["graph-policy-cli", "eval"]);'),
            expected: ["GP-1/a1 src/workbench/gp-npx.ts gp-call-site-outside-client"],
          },
          {
            name: "a registered client reaches gp through no real interface",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace(EVAL_CALL, "{ program, env: scrubbedEnvironment(process.env) }")),
            expected: ["GP-1/a1 src/workbench/providers/graphpolicy.ts client-reaches-gp-through-no-real-interface"],
          },
        ],
      },
      {
        id: "a2",
        clause: "no decision-path argv carries `train`",
        check: ctx => modulesOf(ctx, ctx.decisionPath).flatMap(entry => (entry.trainTokens.length > 0 ? [{ file: entry.file, code: "train-on-decision-path" }] : [])),
        falsifiers: [
          {
            name: "the client's gp argv carries train",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace('["eval", "--program"', '["train", "--program"')),
            expected: ["GP-1/a2 src/workbench/providers/graphpolicy.ts train-on-decision-path"],
          },
        ],
      },
      {
        id: "a3",
        clause: "an admission seam imports no training or telemetry writer",
        check: ctx =>
          ctx.admissions.flatMap(seam => {
            const closure = modulesOf(ctx, ctx.closureOf(seam));
            const findings: Finding[] = [];
            if (closure.some(entry => TELEMETRY_WRITERS.includes(entry.file))) findings.push({ file: seam, code: "admission-imports-telemetry-writer" });
            if (closure.some(entry => entry.trainTokens.length > 0 || entry.runtimeImports.some(specifier => TRAINING_FRAMEWORKS.test(specifier)))) {
              findings.push({ file: seam, code: "admission-imports-training-writer" });
            }
            return findings;
          }),
        falsifiers: [
          {
            name: "the admission seam imports the telemetry writer",
            apply: fixture => editModule(fixture, ADMISSION, text => `import { emitOperationsTelemetry } from "./telemetry.js";\n${text}`),
            expected: ["GP-1/a3 src/workbench/gp-admission.ts admission-imports-telemetry-writer"],
          },
          {
            name: "the admission seam imports a training framework",
            apply: fixture => editModule(fixture, ADMISSION, text => `import { fit } from "@tensorflow/tfjs-node";\n${text}`),
            expected: ["GP-1/a3 src/workbench/gp-admission.ts admission-imports-training-writer"],
          },
        ],
      },
      {
        id: "a4",
        clause: "no execution seam imports a gp client",
        check: ctx =>
          ctx.executionSeams.flatMap(file => {
            if (ctx.clients.has(file)) return [{ file, code: "gp-client-is-execution-seam" }];
            return ctx.importsOf(file).some(target => ctx.clients.has(target)) ? [{ file, code: "execution-imports-gp-client" }] : [];
          }),
        falsifiers: [
          {
            name: "the decision module launches a workflow host",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { Worker } from "node:worker_threads";\n${text}\nexport const host = new Worker("./host.js");`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-2",
    label: "no local numerics",
    pins: [
      {
        id: "b1",
        clause: "no module outside a gp client names GraphDataIR or GraphPolicyCLI wire vocabulary",
        check: ctx =>
          [...ctx.census.values()].filter(entry => !ctx.clients.has(entry.file) && entry.gpVocabulary.length > 0).map(entry => ({ file: entry.file, code: "gp-vocabulary-outside-client" })),
        falsifiers: [
          {
            name: "an unregistered module scores a GraphDataIR document",
            apply: fixture =>
              withModule(
                fixture,
                "src/workbench/gp-score.ts",
                "export interface GraphDataIR {\n  readonly nodes: readonly string[];\n}\nexport function score(document: GraphDataIR): number {\n  return document.nodes.length / 2;\n}",
              ),
            expected: ["GP-2/b1 src/workbench/gp-score.ts gp-vocabulary-outside-client"],
          },
        ],
      },
      {
        id: "b2",
        clause: "a gp client maps the GP_CLI_UNKNOWN_COMMAND refusal to a typed refusal, never a local substitute",
        check: ctx => modulesOf(ctx, [...ctx.clients]).flatMap(entry => (entry.namesUnknownCommand ? [] : [{ file: entry.file, code: "unknown-command-unmapped" }])),
        falsifiers: [
          {
            name: "the client drops its unknown-command mapping",
            apply: fixture => editModule(fixture, CLIENT, text => text.replace(REFUSAL_LINES, "")),
            expected: ["GP-2/b2 src/workbench/providers/graphpolicy.ts unknown-command-unmapped"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-3",
    label: "no unrelated dependency",
    pins: [
      {
        id: "c1",
        clause: "a decision path imports no package beyond the GraphPolicyCLI package and Node built-ins",
        check: ctx =>
          modulesOf(ctx, ctx.decisionPath).flatMap(entry => [
            ...entry.runtimeImports.filter(specifier => !isRelative(specifier) && !isBuiltin(specifier) && !isGpPackage(specifier)).map(specifier => ({ file: entry.file, code: `imports-${packageOf(specifier)}` })),
            ...(entry.dynamicLoads.length > 0 ? [{ file: entry.file, code: "dynamic-load-on-decision-path" }] : []),
          ]),
        falsifiers: [
          {
            name: "the client imports an unrelated package",
            apply: fixture => editModule(fixture, CLIENT, text => `import { nanoid } from "nanoid";\n${text}\nexport const requestId = (): string => nanoid();`),
            expected: ["GP-3/c1 src/workbench/providers/graphpolicy.ts imports-nanoid"],
          },
          {
            name: "the client loads a package by a computed name",
            apply: fixture => editModule(fixture, CLIENT, text => `${text}\nexport const load = (name: string): Promise<unknown> => import(name);`),
            expected: ["GP-3/c1 src/workbench/providers/graphpolicy.ts dynamic-load-on-decision-path"],
          },
        ],
      },
      {
        id: "c2",
        clause: "the dependency manifest declares no training framework and no GraphPolicyCLI package other than graph-policy-cli",
        check: ctx => {
          const findings: Finding[] = [];
          for (const section of RUNTIME_SECTIONS) {
            for (const name of namesIn(ctx.manifest, section)) if (TRAINING_FRAMEWORKS.test(name)) findings.push({ file: MANIFEST, code: `training-framework-${name}` });
          }
          for (const section of ALL_SECTIONS) {
            for (const name of namesIn(ctx.manifest, section)) if (GP_FAMILY.test(name) && name !== GP_PACKAGE) findings.push({ file: MANIFEST, code: `gp-package-${name}` });
          }
          return findings;
        },
        falsifiers: [
          {
            name: "the manifest declares a training framework",
            apply: fixture => withDependency(fixture, "dependencies", "@tensorflow/tfjs-node", "4.22.0"),
            expected: ["GP-3/c2 package.json training-framework-@tensorflow/tfjs-node"],
          },
          {
            name: "the manifest declares a GraphPolicyCLI fork",
            apply: fixture => withDependency(fixture, "devDependencies", "graphpolicy-fork", "0.0.1"),
            expected: ["GP-3/c2 package.json gp-package-graphpolicy-fork"],
          },
        ],
      },
    ],
  },
  {
    id: "GP-4",
    label: "lifecycle only",
    pins: [
      {
        id: "d1",
        clause: "a gp-adjacent module calls no process.kill",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.processKill.length > 0 ? [{ file: entry.file, code: "process-kill" }] : [])),
        falsifiers: [
          {
            name: "the decision module kills a worker",
            apply: fixture => editModule(fixture, DECISION, text => `${text}\nexport function stopWorker(pid: number): void {\n  process.kill(pid, "SIGTERM");\n}`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
          {
            name: "the decision module destructures kill from process",
            apply: fixture => editModule(fixture, DECISION, text => `${text}\nconst { kill } = process;\nexport const stopWorker = (pid: number): boolean => kill(pid);`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d1 src/workbench/gp-decision.ts process-kill"],
          },
        ],
      },
      {
        id: "d2",
        clause: "a gp-adjacent module writes nothing through bd",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.bdWrite.length > 0 ? [{ file: entry.file, code: "bd-write" }] : [])),
        falsifiers: [
          {
            name: "the decision module closes a bead",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execFileSync } from "node:child_process";\n${text}\nexport const closeBead = (id: string): Buffer => execFileSync("bd", ["close", id]);`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead through a templated shell command",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (id: string): Buffer => execSync(\`bd close \${id}\`);`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
          {
            name: "the decision module closes a bead through a shell command",
            apply: fixture =>
              editModule(fixture, DECISION, text => `import { execSync } from "node:child_process";\n${text}\nexport const closeBead = (): Buffer => execSync("bd close wb-example --reason done");`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d2 src/workbench/gp-decision.ts bd-write"],
          },
        ],
      },
      {
        id: "d3",
        clause: "a gp-adjacent module stops no Furnace Run or Attempt",
        check: ctx => modulesOf(ctx, ctx.adjacent).flatMap(entry => (entry.furnaceStop.length > 0 ? [{ file: entry.file, code: "furnace-stop" }] : [])),
        falsifiers: [
          {
            name: "the decision module stops an Attempt itself",
            apply: fixture =>
              editModule(
                fixture,
                DECISION,
                text => `declare const furnace: { readonly attempts: { stop(id: string): Promise<void> } };\n${text}\nexport const stopAttempt = (id: string): Promise<void> => furnace.attempts.stop(id);`,
              ),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
          {
            name: "the decision module stops a Run through its handle",
            apply: fixture =>
              editModule(fixture, DECISION, text => `declare const activeRun: { stop(): Promise<void> };\n${text}\nexport const stopRun = (): Promise<void> => activeRun.stop();`),
            expected: ["GP-1/a4 src/workbench/gp-decision.ts execution-imports-gp-client", "GP-4/d3 src/workbench/gp-decision.ts furnace-stop"],
          },
        ],
      },
    ],
  },
];

/** Every finding, as "<row>/<pin> <file> <code>": rows and pins in table order, each pin's findings sorted. */
function judge(tree: SourceTree, seams: readonly GpSeam[]): string[] {
  const ctx = contextOf(tree, seams);
  return ROWS.flatMap(row => row.pins.flatMap(pin => pin.check(ctx).map(finding => `${row.id}/${pin.id} ${finding.file} ${finding.code}`).sort()));
}

/** A blind spot of the token census: a NAMED family whose representative source the census reports quiet (pinned). */
interface Residual {
  readonly id: string;
  /** The family, verbatim as the docs/03 residual line states it. */
  readonly family: string;
  readonly apply: (fixture: Fixture) => Fixture;
}

const RESIDUALS: readonly Residual[] = [
  {
    id: "UNNAMED-NUMERICS",
    family: "a module that scores graph data without naming gp vocabulary",
    apply: fixture =>
      withModule(fixture, "src/workbench/rank.ts", "export function rank(edges: ReadonlyArray<readonly [number, number]>): number[] {\n  return edges.map(([from, to]) => from * 0.5 + to * 0.5);\n}"),
  },
  {
    id: "LOCAL-SUBSTITUTE",
    family: "a client that names the refusal and then computes locally",
    apply: fixture =>
      editModule(fixture, CLIENT, text => text.replace(REFUSAL_LINES, 'export function refusalOf(code: string): number {\n  return code === "GP_CLI_UNKNOWN_COMMAND" ? 0.5 : 1;\n}')),
  },
  {
    id: "COMPUTED-BINARY",
    family: "a gp binary name assembled at run time",
    apply: fixture => withModule(fixture, "src/workbench/gp-joined.ts", 'import { spawn } from "node:child_process";\nexport const run = () => spawn(["g", "p"].join(""), ["eval"]);'),
  },
  {
    id: "DYNAMIC-ARGV",
    family: "a train verb assembled at run time",
    apply: fixture => editModule(fixture, CLIENT, text => text.replace('["eval", "--program"', '["tr" + "ain", "--program"')),
  },
  {
    id: "ALIASED-EFFECT",
    family: "a kill reached through an alias of process",
    apply: fixture => editModule(fixture, DECISION, text => `${text}\nconst host = process;\nexport function stopWorker(pid: number): void {\n  host.kill(pid);\n}`),
  },
  {
    id: "TRAINING-FRAMEWORK-ROSTER",
    family: "a training framework outside the census deny roster that no decision path imports",
    apply: fixture => withDependency(fixture, "dependencies", "example-ml-trainer", "1.0.0"),
  },
];

let liveMemo: { readonly tree: SourceTree; readonly census: readonly ModuleCensus[] } | undefined;
function live(): { readonly tree: SourceTree; readonly census: readonly ModuleCensus[] } {
  if (liveMemo !== undefined) return liveMemo;
  const files: string[] = [];
  const walk = (dir: string): void => {
    for (const name of readdirSync(dir).sort()) {
      if (SKIPPED_DIRS.has(name)) continue;
      const full = join(dir, name);
      const info = statSync(full);
      if (info.isDirectory()) walk(full);
      else if (info.isFile() && SOURCE_EXTENSIONS.has(posix.extname(name))) files.push(full);
    }
  };
  walk(join(ROOT, "src"));
  const modules = new Map(files.map(full => [relative(ROOT, full).split(sep).join("/"), readFileSync(full, "utf8")] as const));
  const tree: SourceTree = { modules, manifest: JSON.parse(readFileSync(join(ROOT, MANIFEST), "utf8")) as Manifest };
  liveMemo = { tree, census: [...modules].map(([file, text]) => moduleCensus(file, text)) };
  return liveMemo;
}

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The docs/03 boundary section's body: the lines after its heading, up to the next level-2 heading. */
function boundarySection(page: string): string | undefined {
  const lines = page.split("\n");
  const start = lines.indexOf(BOUNDARY_HEADING);
  if (start < 0) return undefined;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex(line => line.startsWith("## "));
  return (end < 0 ? rest : rest.slice(0, end)).join("\n");
}

const BULLET = /^- \*\*(GP-\d+) ([^:*]+):\*\* (.+)\.$/;
function docsRows(section: string): Array<{ id: string; label: string; clauses: string[] }> {
  return section.split("\n").flatMap(line => {
    const match = BULLET.exec(line);
    return match === null ? [] : [{ id: match[1] ?? "", label: match[2] ?? "", clauses: (match[3] ?? "").split("; ") }];
  });
}

const RESIDUAL_ENTRY = /([A-Z][A-Z-]*[A-Z]) \(([^)]+)\)/g;
function docsResiduals(section: string): Array<{ id: string; family: string }> {
  const entry = section.split("\n").find(line => line.startsWith("Named residuals"));
  return entry === undefined ? [] : [...entry.matchAll(RESIDUAL_ENTRY)].map(match => ({ id: match[1] ?? "", family: match[2] ?? "" }));
}

const FALSIFIER_CASES = ROWS.flatMap(row => row.pins.flatMap(pin => pin.falsifiers.map(falsifier => [`${row.id}/${pin.id} ${falsifier.name}`, `${row.id}/${pin.id}`, falsifier] as const)));

describe("wb-1xvp.2: Pi reaches GraphPolicyCLI only through its real interfaces (RF-GRAPH-POLICY-MACHINE-CONTROL-R1)", () => {
  it("R0: the census reads every src module (an independent recursive listing agrees)", () => {
    const { tree } = live();
    const listed = readdirSync(join(ROOT, "src"), { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && SOURCE_EXTENSIONS.has(posix.extname(entry.name)))
      .map(entry => relative(ROOT, join(entry.parentPath, entry.name)).split(sep).join("/"))
      .sort();
    expect([...tree.modules.keys()].sort()).toEqual(listed);
    expect(listed.length).toBeGreaterThan(100);
  });

  it("R0: the live gp roster is empty - no gp binary, GraphPolicyCLI name or specifier, gp vocabulary or unknown-command name in any src module, none in package.json, no gp seam registered (frozen)", () => {
    const { tree, census } = live();
    const roster = census.flatMap(entry => [
      ...entry.gpBinary.map(found => `${entry.file}:${found.line} binary ${found.text}`),
      ...entry.specifiers.filter(specifier => GP_FAMILY.test(specifier)).map(specifier => `${entry.file} specifier ${specifier}`),
      ...entry.gpVocabulary.map(found => `${entry.file}:${found.line} vocabulary ${found.text}`),
      ...entry.gpFamily.map(found => `${entry.file}:${found.line} family ${found.text}`),
      ...(entry.namesUnknownCommand ? [`${entry.file} names ${UNKNOWN_COMMAND}`] : []),
    ]);
    expect(roster).toEqual([]);
    expect(ALL_SECTIONS.flatMap(section => namesIn(tree.manifest, section).filter(name => GP_FAMILY.test(name) || TRAINING_FRAMEWORKS.test(name)))).toEqual([]);
    expect(GP_SEAMS).toEqual([]);
  });

  it("R0: the live tree judges clean under every pin", () => {
    expect(judge(live().tree, GP_SEAMS)).toEqual([]);
  });

  it("R0: the census is not blind on the live tree - it sees the known launch, kill, stop, agent-session and host-launch sites and the real manifest", () => {
    const { tree, census } = live();
    const launches = census.flatMap(entry => entry.launches.map(launch => `${entry.file} ${launch.binary}`));
    expect(launches).toEqual(
      expect.arrayContaining(["src/index.ts git", "src/workbench/providers/forge.ts forge", "src/workbench/providers/reactivefiber.ts rf", "src/workbench/hosts/local-detached.ts <process.execPath>"]),
    );
    const ctx = contextOf(tree, GP_SEAMS);
    expect(ctx.executionSeams).toEqual(
      expect.arrayContaining(["src/schedule-store.ts", "src/workbench/furnace-control.ts", "src/workbench/claude-host.ts", "src/workflow/runtime.ts", "src/workbench/hosts/local-detached.ts"]),
    );
    expect(ctx.decisionPath).toEqual([]);
    expect(ctx.adjacent).toEqual([]);
    const writer = readRepo(TELEMETRY_WRITERS[0] ?? "");
    expect(writer).toContain("export interface TelemetrySink");
    expect(writer).toContain("export function emitOperationsTelemetry(");
    expect(namesIn(tree.manifest, "dependencies")).toEqual(expect.arrayContaining(["@furnace/sdk", "@hyperunix/sdk"]));
  });

  it("S: the rule table keeps its frozen shape - rows, pins and falsifier counts (rule 16)", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.map(pin => `${pin.id}x${pin.falsifiers.length}`).join(",")}`)).toEqual([
      "GP-1:a1x3,a2x1,a3x2,a4x1",
      "GP-2:b1x1,b2x1",
      "GP-3:c1x2,c2x2",
      "GP-4:d1x2,d2x3,d3x2",
    ]);
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["UNNAMED-NUMERICS", "LOCAL-SUBSTITUTE", "COMPUTED-BINARY", "DYNAMIC-ARGV", "ALIASED-EFFECT", "TRAINING-FRAMEWORK-ROSTER"]);
  });

  it("D: docs/03 states the four rules clause for clause as the table judges them (the anchor outside this census)", () => {
    const section = boundarySection(readRepo(DOCS_03));
    expect(section, `${DOCS_03} has no "${BOUNDARY_HEADING}" section`).toBeDefined();
    expect(docsRows(section ?? "")).toEqual(ROWS.map(row => ({ id: row.id, label: row.label, clauses: row.pins.map(pin => pin.clause) })));
  });

  it("D: docs/03 names every residual this census pins quiet, family for family", () => {
    const section = boundarySection(readRepo(DOCS_03)) ?? "";
    expect(docsResiduals(section)).toEqual(RESIDUALS.map(residual => ({ id: residual.id, family: residual.family })));
  });

  it("D: the docs/03 ownership table names GraphPolicyCLI with no gp seam registered, and the section cites the bead, its source line and this census", () => {
    const page = readRepo(DOCS_03);
    expect(page.split("\n").filter(line => line.includes("| GraphPolicyCLI |"))).toEqual([OWNERSHIP_ROW]);
    const section = boundarySection(page) ?? "";
    for (const citation of ["wb-1xvp.2", "RF-GRAPH-POLICY-MACHINE-CONTROL-R1", "README.md:79@6a251bf73af5", CENSUS_FILE]) expect(section, citation).toContain(citation);
  });

  it("F: a compliant gp integration judges clean - the rules admit a real-interface seam rather than banning gp", () => {
    expect(judge(treeOf(CLEAN), CLEAN.seams)).toEqual([]);
    const ctx = contextOf(treeOf(CLEAN), CLEAN.seams);
    expect(ctx.decisionPath).toEqual([PROCESS_ENV, CLIENT]);
    expect(ctx.adjacent).toEqual([DECISION, CLIENT]);
    expect(ctx.executionSeams).toEqual([LIFECYCLE]);
    expect(ctx.census.get(CLIENT)?.launches.map(launch => `${launch.binary} ${launch.argv.join(" ")}`)).toEqual(["gp eval --program --json"]);
    expect(ctx.census.get(CLIENT)?.namesUnknownCommand).toBe(true);
  });

  it("F: comments are not code - every detector reads the same census with gp, train and effect words added in comments", () => {
    const words = "// gp GraphDataIR graph-policy-cli GP_CLI_UNKNOWN_COMMAND train process.kill bd close runs.stop new Worker";
    for (const [file, text] of Object.entries(CLEAN.modules)) expect(moduleCensus(file, `${text}\n${words}\n/* ${words} */`), file).toEqual(moduleCensus(file, text));
  });

  it("F: the detectors are precise - near-miss tokens report nothing", () => {
    const nearMiss = [
      'import type { query } from "@anthropic-ai/claude-agent-sdk";',
      'import { spawn } from "node:child_process";',
      'const model = { id: "gpt-4", kind: "general-purpose", note: "constraint training" };',
      "const gp = model.id;",
      "declare const child: { kill(signal: string): void };",
      "declare const scheduler: { stop(): void };",
      "declare const runner: { stop(): void };",
      'export function tidy(): void { child.kill("SIGTERM"); scheduler.stop(); runner.stop(); spawn("git", ["status"]); }',
      "export const parts = [gp];",
    ].join("\n");
    const found = moduleCensus("src/near-miss.ts", nearMiss);
    expect([found.gpBinary, found.gpLaunches, found.dynamicLoads, found.gpVocabulary, found.trainTokens, found.processKill, found.furnaceStop, found.bdWrite, found.agentSession, found.hostLaunch]).toEqual([
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
    expect(found.namesUnknownCommand).toBe(false);
    expect(found.runtimeImports).toEqual(["node:child_process"]);
    expect(found.launches.map(launch => launch.binary)).toEqual(["git"]);
  });

  it.each(FALSIFIER_CASES)("F: %s is named by exactly the expected pin(s)", (_name, pinKey, falsifier) => {
    const mutated = falsifier.apply(CLEAN);
    expect(falsifier.expected.some(expected => expected.startsWith(`${pinKey} `)), "the expectation names its own pin").toBe(true);
    expect(judge(treeOf(mutated), mutated.seams)).toEqual(falsifier.expected);
  });

  it.each(RESIDUALS.map(residual => [residual.id, residual] as const))("Q: named residual %s stays quiet (the pinned blind spot of a token census)", (_id, residual) => {
    const mutated = residual.apply(CLEAN);
    expect(mutated).not.toEqual(CLEAN);
    expect(judge(treeOf(mutated), mutated.seams)).toEqual([]);
  });
});
