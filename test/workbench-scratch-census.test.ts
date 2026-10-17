/**
 * wb-e37: the scratch census, the owner-bound falsifier for program rule 11 (E37SCOPETOKEN, E37RECOUNT2TOKEN,
 * E37QALEGTOKEN).
 *
 * Rule 11 (owner, 2026-10-15T16:08Z; widened to the qa runners by this bead's qa leg) asks every scratch allocation
 * under test/ and qa/ to compose the guarded path: test/helpers/scratch.ts (makeScratch / trackScratch / removeScratch,
 * with installScratchLeakGuard at module scope) or test/helpers/non-repo-scratch.ts from a vitest suite, and
 * qa/workbench/scratch.mjs from a plain-node runner. Two named falsifiers (wb-g5o gate-3, appended to this bead) hold it:
 *  - G3 UNTRACKED DIRECT ALLOCATION: a raw mkdtemp / mkdtempSync / tmpdir() reference under test/ or qa/ that is not
 *    handed straight to trackScratch, in a file that is not on ALLOWLIST with its measured counts and a reason.
 *  - G2 GUARD-INSTALL DROPPED: a test file or qa module whose import closure allocates through the guarded path while
 *    no module in that closure installs the leak guard at module scope (test/helpers/boot-extension.ts and
 *    test/helpers/print-mode-runner.ts install it for their importers), unless it is on GUARD_ALLOWLIST with a reason.
 * The scan is syntactic: the TypeScript parser over every .ts/.mts/.cts/.js/.mjs/.cjs file under test/ and qa/
 * (node_modules, dist and .git skipped; a symlink is not followed). It sees named, renamed, default, namespace,
 * required and destructured bindings of node:fs and node:os, member access by name (fs.mkdtempSync,
 * fs["mkdtempSync"], os.tmpdir()) and re-exports. A member name computed at run time is beyond any syntactic scan.
 * Counts, not lines, are pinned: an edit that moves a raw site keeps the census green; one that adds a raw site to a
 * listed file, or cures one without updating its entry, turns it red. The allowlist is long because trunk is: wb-e37's
 * owner-named census is nine test files plus the qa leg (NAMED_CENSUS), so every other raw site on trunk is recorded
 * here as OUT-OF-SCOPE rather than cured. An owner-named file this cut leaves raw is listed DEFERRED-TO the queued cut
 * that edits it (contact rule), or OWNER-RULING where composing it would move a pin another bead's landed test holds.
 */
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TREES = ["test", "qa"] as const;
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
const SOURCE = /\.(?:[cm]?ts|[cm]?js)$/;
const FS_MODULES = new Set(["fs", "node:fs", "fs/promises", "node:fs/promises"]);
const OS_MODULES = new Set(["os", "node:os"]);
const MKDTEMP = new Set(["mkdtemp", "mkdtempSync"]);
const TMPDIR = "tmpdir";
/** The guarded path's allocators; a call to one (or to an import alias of one) is a guarded allocation. */
const ALLOCATORS = new Set(["makeScratch", "trackScratch", "nonRepoScratch"]);
const TRACKER = "trackScratch";
const GUARD = "installScratchLeakGuard";

type RawKind = "mkdtemp" | "tmpdir";
interface Counts {
  mkdtemp: number;
  tmpdir: number;
}

/** What one file references: its raw allocation counts, its use of the guarded path, and the modules it names. */
interface Scan extends Counts {
  /** Raw references of either kind inside a trackScratch argument: composed, so not counted as raw. */
  tracked: number;
  /** Calls a guarded allocator. */
  allocates: boolean;
  /** Installs the leak guard with a statement at module scope. */
  installsGuard: boolean;
  /** Every module specifier the file names: import, export-from, import() and require(). */
  imports: string[];
}

/** The text of a string literal (a module specifier or a member name), or undefined for anything computed. */
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}

/** The module a `require("x")` or `import("x")` call loads, through any `await` or parentheses. */
function loadedModule(node: ts.Node | undefined): string | undefined {
  let target = node;
  while (target !== undefined && (ts.isAwaitExpression(target) || ts.isParenthesizedExpression(target))) target = target.expression;
  if (target === undefined || !ts.isCallExpression(target) || target.arguments.length !== 1) return undefined;
  const callee = target.expression;
  const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
  return loads ? literalText(target.arguments[0]) : undefined;
}

/** The member a property or element access names, when it names one literally. */
function memberName(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  return ts.isPropertyAccessExpression(node) ? node.name.text : literalText(node.argumentExpression);
}

/** True when an identifier is read as a value: not a declaration, an object key, a member name or an import/export name. */
function isValueReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === id;
  if (ts.isQualifiedName(parent) || ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return false;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isImportEqualsDeclaration(parent)) return false;
  if (ts.isExportSpecifier(parent) || ts.isNamespaceExport(parent)) return false;
  if (ts.isBindingElement(parent)) return parent.initializer === id;
  if ("name" in parent && parent.name === id) return ts.isShorthandPropertyAssignment(parent);
  return true;
}

function kindOf(name: string): RawKind | undefined {
  if (MKDTEMP.has(name)) return "mkdtemp";
  return name === TMPDIR ? "tmpdir" : undefined;
}

function scanSource(path: string, text: string): Scan {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, /\.[cm]?ts$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS);
  const rawNames: Record<RawKind, Set<string>> = { mkdtemp: new Set(), tmpdir: new Set() };
  /** Local names bound to the node:fs / node:os module object itself (default, namespace, require, import()). */
  const namespaces: Record<RawKind, Set<string>> = { mkdtemp: new Set(), tmpdir: new Set() };
  const moduleKind = (from: string): RawKind | undefined => {
    if (FS_MODULES.has(from)) return "mkdtemp";
    return OS_MODULES.has(from) ? "tmpdir" : undefined;
  };
  const allocators = new Set(ALLOCATORS);
  const trackers = new Set([TRACKER]);
  const guards = new Set([GUARD]);
  const scan: Scan = { mkdtemp: 0, tmpdir: 0, tracked: 0, allocates: false, installsGuard: false, imports: [] };

  // Pass 1: every local name a raw allocator or the guarded path is reachable through.
  const bind = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      const from = literalText(node.moduleSpecifier) ?? "";
      const clause = node.importClause;
      const whole = moduleKind(from);
      if (clause?.name && whole !== undefined) namespaces[whole].add(clause.name.text);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named) && whole !== undefined) namespaces[whole].add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) {
        for (const element of named.elements) {
          const imported = (element.propertyName ?? element.name).text;
          const local = element.name.text;
          const kind = kindOf(imported);
          if (kind === "mkdtemp" && FS_MODULES.has(from)) rawNames.mkdtemp.add(local);
          if (kind === "tmpdir" && OS_MODULES.has(from)) rawNames.tmpdir.add(local);
          if (from.startsWith(".")) {
            if (ALLOCATORS.has(imported)) allocators.add(local);
            if (imported === TRACKER) trackers.add(local);
            if (imported === GUARD) guards.add(local);
          }
        }
      }
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      const whole = moduleKind(literalText(node.moduleReference.expression) ?? "");
      if (whole !== undefined) namespaces[whole].add(node.name.text);
    } else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const whole = moduleKind(loadedModule(node.initializer) ?? "");
      if (whole !== undefined) namespaces[whole].add(node.name.text);
    } else if (ts.isBindingElement(node) && ts.isIdentifier(node.name)) {
      const property = node.propertyName === undefined ? node.name.text : (literalText(node.propertyName) ?? (ts.isIdentifier(node.propertyName) ? node.propertyName.text : ""));
      const kind = kindOf(property);
      if (kind !== undefined) rawNames[kind].add(node.name.text);
    }
    ts.forEachChild(node, bind);
  };
  bind(file);

  // Pass 2: every raw reference, counted as tracked when it sits inside a trackScratch argument.
  const insideTracker = (node: ts.Node): boolean => {
    let child: ts.Node = node;
    for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
      if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && trackers.has(parent.expression.text) && parent.arguments.some(argument => argument === child)) return true;
      child = parent;
    }
    return false;
  };
  const record = (node: ts.Node, kind: RawKind): void => {
    if (insideTracker(node)) scan.tracked += 1;
    else scan[kind] += 1;
  };
  const isCallee = (node: ts.Node): boolean => ts.isCallExpression(node.parent) && node.parent.expression === node;
  const visit = (node: ts.Node): void => {
    if (ts.isTypeNode(node)) return;
    if (ts.isImportDeclaration(node)) {
      scan.imports.push(literalText(node.moduleSpecifier) ?? "");
      return;
    }
    if (ts.isImportEqualsDeclaration(node)) {
      if (ts.isExternalModuleReference(node.moduleReference)) scan.imports.push(literalText(node.moduleReference.expression) ?? "");
      return;
    }
    if (ts.isExportDeclaration(node)) {
      const from = literalText(node.moduleSpecifier);
      if (from !== undefined) scan.imports.push(from);
      const clause = node.exportClause;
      if (from !== undefined && (clause === undefined || ts.isNamespaceExport(clause))) {
        // export * (as x) from "node:fs" re-exports mkdtempSync; from "node:os", tmpdir.
        if (FS_MODULES.has(from)) record(node, "mkdtemp");
        if (OS_MODULES.has(from)) record(node, "tmpdir");
      } else if (clause !== undefined && ts.isNamedExports(clause)) {
        for (const element of clause.elements) {
          const name = (element.propertyName ?? element.name).text;
          const kind = kindOf(name);
          if (from === undefined) {
            if (rawNames.mkdtemp.has(name)) record(element, "mkdtemp");
            if (rawNames.tmpdir.has(name)) record(element, "tmpdir");
          } else if ((kind === "mkdtemp" && FS_MODULES.has(from)) || (kind === "tmpdir" && OS_MODULES.has(from))) {
            record(element, kind);
          }
        }
      }
      return;
    }
    if (ts.isCallExpression(node)) {
      const loaded = loadedModule(node);
      if (loaded !== undefined) scan.imports.push(loaded);
      if (ts.isIdentifier(node.expression) && allocators.has(node.expression.text)) scan.allocates = true;
    }
    if (ts.isIdentifier(node) && isValueReference(node)) {
      if (rawNames.mkdtemp.has(node.text)) record(node, "mkdtemp");
      if (rawNames.tmpdir.has(node.text)) record(node, "tmpdir");
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const member = memberName(node);
      const kind = member === undefined ? undefined : kindOf(member);
      // Called on anything (require("fs").mkdtempSync(...), os.tmpdir()), or read off the module object itself
      // (const make = fs.mkdtempSync); a record field that merely shares the name (counts.mkdtemp) is not a reference.
      const offModule = kind !== undefined && ts.isIdentifier(node.expression) && namespaces[kind].has(node.expression.text);
      if (kind !== undefined && (isCallee(node) || offModule)) record(node, kind);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);

  for (const statement of file.statements) {
    const call = ts.isExpressionStatement(statement) ? statement.expression : undefined;
    if (call !== undefined && ts.isCallExpression(call) && ts.isIdentifier(call.expression) && guards.has(call.expression.text)) scan.installsGuard = true;
  }
  return scan;
}

interface Census {
  scans: ReadonlyMap<string, Scan>;
  /** Every file with a raw reference, with its counts. */
  raw: ReadonlyMap<string, Counts>;
  /** G2: entry files whose closure allocates through the guarded path with no module-scope guard in it, to the allocating modules. */
  unguarded: ReadonlyMap<string, string[]>;
}

/** The scanned file a relative specifier names (".js" written for a ".ts" source included), or undefined. */
function resolveImport(from: string, specifier: string, known: ReadonlyMap<string, unknown>): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  const base = posix.normalize(posix.join(posix.dirname(from), specifier));
  const stem = base.replace(/\.[cm]?js$/, "");
  const candidates = [base, `${stem}.ts`, `${stem}.mts`, `${stem}.cts`, `${base}.ts`, `${base}.mjs`, `${base}.js`, posix.join(base, "index.ts"), posix.join(base, "index.js")];
  return candidates.find(candidate => known.has(candidate));
}

/** The file and every scanned module it reaches through relative imports. */
function closureOf(path: string, scans: ReadonlyMap<string, Scan>): string[] {
  const seen = new Set<string>();
  const pending = [path];
  for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
    if (seen.has(next)) continue;
    seen.add(next);
    for (const specifier of scans.get(next)?.imports ?? []) {
      const target = resolveImport(next, specifier, scans);
      if (target !== undefined) pending.push(target);
    }
  }
  return [...seen].sort();
}

/** The files G2 judges: every test file, and every qa module (a runner, or a qa library it loads). */
const isGuardEntry = (path: string): boolean => /^test\/.*\.test\.[cm]?ts$/.test(path) || path.startsWith("qa/");

function takeCensus(files: ReadonlyMap<string, string>): Census {
  const scans = new Map<string, Scan>();
  for (const [path, text] of files) scans.set(path, scanSource(path, text));
  const raw = new Map<string, Counts>();
  for (const [path, scan] of scans) if (scan.mkdtemp + scan.tmpdir > 0) raw.set(path, { mkdtemp: scan.mkdtemp, tmpdir: scan.tmpdir });
  const unguarded = new Map<string, string[]>();
  for (const path of scans.keys()) {
    if (!isGuardEntry(path)) continue;
    const closure = closureOf(path, scans);
    const allocating = closure.filter(member => scans.get(member)?.allocates === true);
    if (allocating.length > 0 && !closure.some(member => scans.get(member)?.installsGuard === true)) unguarded.set(path, allocating);
  }
  return { scans, raw, unguarded };
}

function readTree(): Map<string, string> {
  const files = new Map<string, string>();
  const walk = (directory: string): void => {
    for (const name of readdirSync(join(ROOT, directory)).sort()) {
      if (SKIPPED_DIRS.has(name)) continue;
      const path = posix.join(directory, name);
      const info = lstatSync(join(ROOT, path));
      if (info.isDirectory()) walk(path);
      else if (info.isFile() && SOURCE.test(name)) files.set(path, readFileSync(join(ROOT, path), "utf8"));
    }
  };
  for (const tree of TREES) walk(tree);
  return files;
}

let measured: Census | undefined;
function census(): Census {
  measured ??= takeCensus(readTree());
  return measured;
}

interface Listed extends Counts {
  reason: string;
}

/** Reason classes. Every ALLOWLIST and GUARD_ALLOWLIST entry opens with one; a deferral names its bead. */
const REASON = /^(GUARDED-PATH|OUT-OF-SCOPE|TMPDIR-READ|DEFERRED-TO|OWNER-RULING)(?:-(wb-[a-z0-9.]+))?: \S/;
const GUARDED_PATH = "GUARDED-PATH: the guarded helper's own allocation, the raw site every other allocation routes through.";
const OUT_OF_SCOPE = "OUT-OF-SCOPE: a trunk raw site outside wb-e37's owner-named census; recorded here, not cured.";
const TMPDIR_READ = "TMPDIR-READ: reads tmpdir() and allocates nothing under it (read at the site by wb-e37).";
const deferred = (bead: string, why: string): string => `DEFERRED-TO-${bead}: in wb-e37's owner-named census, but ${why}; left to that cut (contact rule).`;
const ownerRuling = (landed: string, why: string): string =>
  `OWNER-RULING: in wb-e37's owner-named census and uncontended since ${landed} landed mid-cut, but ${why}; left for the owner's ruling (named in the wb-e37 delivery note).`;
const CRA_RETENTION =
  "OUT-OF-SCOPE: landed by wb-cra (70612b6) after wb-e37's claim-time census; four raw mkdtempSync sites in a new test file, recorded here and flagged in the wb-e37 delivery note, not cured.";
const VC4_RUNNER =
  "OUT-OF-SCOPE: landed by wb-752.3 (24c8be2) after wb-e37's claim-time census; a live furnace runner a machine seat never runs (standing rule 8), so its composition could not be verified here.";

const ALLOWLIST: Record<string, Listed> = {
  "test/agent-file-bom.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-file-toggle.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/agent-manager.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-model-display.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-runner-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-runner.test.ts": { mkdtemp: 4, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/background-resume-wiring.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/cross-extension-rpc.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/custom-agents.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/e2e/isolated-provider.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/mention-clone-tool-reachability.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/tool-veto-reachability.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/usage-reaches-session-stats.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/workflow.e2e.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/enabled-models.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/env.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/ext-templates-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/foreground-concurrency-print-mode-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/helpers/detached-peer.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/helpers/furnace-hosted-retry-journeys.ts": { mkdtemp: 1, tmpdir: 0, reason: deferred("wb-lrz.2", "the plain-node runner qa/workbench/furnace-hosted-retry-fault.mjs loads it and the receipt test that pins its imports is edited by queued wb-lrz.2") },
  "test/helpers/scratch.ts": { mkdtemp: 1, tmpdir: 3, reason: GUARDED_PATH },
  "test/memory-legacy-fallback.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/memory.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/model-scope.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/nested-delegation-e2e.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/nested-tools.test.ts": { mkdtemp: 3, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/non-repo-scratch.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-file-compaction-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-file-path.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/output-file.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-transcript-wiring.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/perf/ab.mjs": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/perf/spawn.bench.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/rpc-lifecycle-gating.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/rpc-result-consumption.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/schedule-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule-menu.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule-store.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/scratch-helper.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/settings.test.ts": { mkdtemp: 2, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/skill-loader.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-abort-ack-grace.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-adverse-faults.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-adverse-receipt.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-cancel-faults.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-host-control-retention.test.ts": { mkdtemp: 4, tmpdir: 4, reason: CRA_RETENTION },
  "test/workbench-claude-host-degradation.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-served-model.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-contract-literals.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-degradation-policy.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-designer.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-detached-socket-base.test.ts": { mkdtemp: 0, tmpdir: 2, reason: TMPDIR_READ },
  "test/workbench-env-scrub-census.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-executable-identity.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-forge-observer.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-hosted-real.test.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-hosted-retry-fault-receipt.test.ts": { mkdtemp: 1, tmpdir: 1, reason: deferred("wb-lrz.2", "queued wb-lrz.2 edits this file") },
  "test/workbench-furnace-hosted-retry-fault.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-hosted.test.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-vc4-receipt.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/workbench-host-contract.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-identity-shell.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-identity.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-patch-proposal.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-provider-envelope-audit.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-provider-lifecycle.test.ts": { mkdtemp: 4, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/workbench-release-checklist.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/workbench-retained-memory.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-sandbox-rpc-census.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-security-capability.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-security-pi-tools.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-status-ledger.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-validate-reply.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-examples-claude-backend.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-gate-worktree.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-journal-compat.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-journal.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workflow-tool.test.ts": { mkdtemp: 3, tmpdir: 3, reason: OUT_OF_SCOPE },
  "test/worktree.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "qa/workbench/furnace-hosted-repaired-sdk.mjs": { mkdtemp: 1, tmpdir: 0, reason: deferred("wb-lrz.2", "the receipt test queued wb-lrz.2 edits pins this loader to node: imports only") },
  "qa/workbench/furnace-hosted-retry-fault.mjs": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "qa/workbench/install-minimal.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-git-stamp.test.ts stages this member from a closed file list (install-minimal.mjs, install-minimal-lib.mjs, git-stamp.mjs), so a composition must widen that list"),
  },
  "qa/workbench/live-furnace-vc4-launch.mjs": { mkdtemp: 1, tmpdir: 0, reason: VC4_RUNNER },
  "qa/workbench/live-furnace-vc4.mjs": { mkdtemp: 1, tmpdir: 1, reason: VC4_RUNNER },
  "qa/workbench/live-operator-receipt.mjs": {
    mkdtemp: 3,
    tmpdir: 5,
    reason: ownerRuling("wb-vko (bb7d5eb)", "it drives a real pi terminal session this cut cannot re-run, and test/workbench-git-stamp.test.ts stages it from a closed file list (live-operator-receipt.mjs, git-stamp.mjs)"),
  },
  "qa/workbench/local-detached-faults.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-detached-faults-receipt.test.ts admits only node: builtins and two named modules among its imports and pins rmSync( in it, so a composition must widen that guard"),
  },
  "qa/workbench/local-detached-shared-child.mjs": {
    mkdtemp: 2,
    tmpdir: 2,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-detached-shared-child-receipt.test.ts pins rmSync( in it and test/workbench-git-stamp.test.ts stages it from a closed file list (local-detached-shared-child.mjs, local-detached-shared-child-receipt.mjs, local-detached-faults-receipt.mjs)"),
  },
  "qa/workbench/release-checklist-receipt.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-cax.23 (b4723ab)", "test/workbench-release-checklist.test.ts pins rmSync(scratch, { recursive: true, force: true }) in it and runs a staged copy of this one file"),
  },
  "qa/workbench/scratch.mjs": { mkdtemp: 1, tmpdir: 3, reason: GUARDED_PATH },
};

const LISTED = new Map(Object.entries(ALLOWLIST));

/** G2 exemptions: suites that allocate through the guarded path with no guard in their closure, with the reason. */
const NON_REPO_UNGUARDED = "OUT-OF-SCOPE: allocates through nonRepoScratch (test/helpers/non-repo-scratch.ts calls makeScratch) with no guard in its closure; outside wb-e37's owner-named census.";
const GUARD_ALLOWLIST: Record<string, string> = {
  "test/env.test.ts": NON_REPO_UNGUARDED,
  "test/non-repo-scratch.test.ts": NON_REPO_UNGUARDED,
  "test/workbench-claude-adverse-receipt.test.ts": NON_REPO_UNGUARDED,
  "test/workbench-dependency-census.test.ts": NON_REPO_UNGUARDED,
  "test/workbench-furnace-hosted-retry-fault.test.ts": "OUT-OF-SCOPE: allocates through test/helpers/furnace-sdk-repaired.ts with no guard in its closure; outside wb-e37's owner-named census, and edited by queued wb-lrz.2.",
};

const GUARD_EXEMPT = new Map(Object.entries(GUARD_ALLOWLIST));

/** Composed onto the guarded path by wb-e37: each installs the guard at module scope and keeps no raw mkdtemp. */
const CURED = [
  "qa/workbench/designer-client.mjs",
  "qa/workbench/install-smoke.mjs",
  "qa/workbench/local-detached-client.mjs",
  "qa/workbench/package-smoke.mjs",
  "test/workbench-cap-saturation-receipt.test.ts",
  "test/workbench-commit-message-scan.test.ts",
  "test/workbench-detached-socket-base.test.ts",
  "test/workbench-headless-census.test.ts",
  "test/workbench-reducer-selector-bench.test.ts",
  "test/workbench-tool-reply-bench.test.ts",
  "test/workbench-topology-slice-grouped-bench.test.ts",
] as const;

/** The owner-named census at claim time: nine test files (E37SCOPETOKEN, E37RECOUNT2TOKEN) and the ten qa runners with
 * a mkdtempSync the qa leg names (E37QALEGTOKEN: nine on trunk at the ruling, plus wb-cax.23's reporter-output runner,
 * which landed mid-cut at b4723ab). */
const NAMED_CENSUS = [
  "test/helpers/furnace-hosted-retry-journeys.ts",
  "test/workbench-furnace-hosted-retry-fault-receipt.test.ts",
  "test/workbench-headless-census.test.ts",
  "test/workbench-detached-socket-base.test.ts",
  "test/workbench-reducer-selector-bench.test.ts",
  "test/workbench-topology-slice-grouped-bench.test.ts",
  "test/workbench-commit-message-scan.test.ts",
  "test/workbench-cap-saturation-receipt.test.ts",
  "test/workbench-tool-reply-bench.test.ts",
  "qa/workbench/designer-client.mjs",
  "qa/workbench/furnace-hosted-repaired-sdk.mjs",
  "qa/workbench/install-minimal.mjs",
  "qa/workbench/install-smoke.mjs",
  "qa/workbench/live-operator-receipt.mjs",
  "qa/workbench/local-detached-client.mjs",
  "qa/workbench/local-detached-faults.mjs",
  "qa/workbench/local-detached-shared-child.mjs",
  "qa/workbench/package-smoke.mjs",
  "qa/workbench/release-checklist-receipt.mjs",
] as const;

const show = (path: string, counts: Counts): string => `${JSON.stringify(path)}: { mkdtemp: ${counts.mkdtemp}, tmpdir: ${counts.tmpdir} }`;
/** An assertion message that names every offender on its own line (the default one truncates a long list). */
const naming = (what: string, offenders: readonly string[]): string => (offenders.length === 0 ? what : `${what} (${offenders.length}):\n  ${offenders.join("\n  ")}\n`);

describe("scratch census over test/ and qa/ (wb-e37, rule 11)", () => {
  it("G3: every raw mkdtemp / tmpdir() reference sits in a file on the reasoned allowlist", () => {
    const unlisted = [...census().raw].filter(([path]) => !LISTED.has(path)).map(([path, counts]) => show(path, counts));
    expect(unlisted, naming("compose the guarded path (rule 11), or list the file with its counts and a reason", unlisted)).toEqual([]);
  });

  it("each listed file's counts match the scan: a new raw site in a listed file, or a cure that keeps its entry, is red", () => {
    const drift = [...LISTED].flatMap(([path, entry]) => {
      const scan = census().scans.get(path);
      if (scan === undefined) return [`${path}: listed, but absent from the tree (drop the entry)`];
      if (scan.mkdtemp === entry.mkdtemp && scan.tmpdir === entry.tmpdir) return [];
      return [`${path}: listed ${entry.mkdtemp} mkdtemp / ${entry.tmpdir} tmpdir, scanned ${scan.mkdtemp} / ${scan.tmpdir}`];
    });
    expect(drift, naming("allowlist counts drifted from the tree", drift)).toEqual([]);
  });

  it("every allowlist entry opens with a reason class, counts at least one raw reference, and a deferral names its bead", () => {
    const malformed = [...LISTED].flatMap(([path, entry]) => {
      const problems: string[] = [];
      const reason = REASON.exec(entry.reason);
      const klass = reason?.[1];
      const bead = reason?.[2];
      if (reason === null) problems.push("its reason opens with no class");
      if (!Number.isInteger(entry.mkdtemp) || !Number.isInteger(entry.tmpdir) || entry.mkdtemp < 0 || entry.tmpdir < 0 || entry.mkdtemp + entry.tmpdir === 0) problems.push("its counts name no raw reference");
      if ((klass === "DEFERRED-TO") !== (bead !== undefined)) problems.push("a bead is named exactly for DEFERRED-TO");
      return problems.map(problem => `${path}: ${problem}`);
    });
    expect(malformed, naming("malformed allowlist entries", malformed)).toEqual([]);
  });

  it("G2: every test file and qa module whose closure allocates through the guarded path installs the leak guard at module scope in that closure", () => {
    const unguarded = [...census().unguarded].filter(([path]) => !GUARD_EXEMPT.has(path)).map(([path, allocating]) => `${path} <- ${allocating.join(", ")}`);
    expect(unguarded, naming("call installScratchLeakGuard() at module scope (or import a helper that does)", unguarded)).toEqual([]);
  });

  it("every guard-allowlist entry still allocates without a guard, and carries a reason class", () => {
    const stale = [...GUARD_EXEMPT.keys()].filter(path => !census().unguarded.has(path));
    const unreasoned = [...GUARD_EXEMPT].filter(([, reason]) => !REASON.test(reason)).map(([path]) => path);
    expect({ stale, unreasoned }, naming("stale or unreasoned guard-allowlist entries", [...stale, ...unreasoned])).toEqual({ stale: [], unreasoned: [] });
  });

  it("the cured set composes the guarded path, installs the guard at module scope and keeps no raw mkdtemp", () => {
    const problems = CURED.flatMap(path => {
      const scan = census().scans.get(path);
      if (scan === undefined) return [`${path}: absent from the tree`];
      const found: string[] = [];
      if (scan.mkdtemp > 0) found.push(`${scan.mkdtemp} raw mkdtemp`);
      if (scan.tmpdir > 0 && !(LISTED.get(path)?.reason ?? "").startsWith("TMPDIR-READ")) found.push(`${scan.tmpdir} raw tmpdir() outside a TMPDIR-READ entry`);
      if (!scan.allocates) found.push("no guarded allocation");
      if (!scan.installsGuard) found.push("no module-scope installScratchLeakGuard()");
      return found.map(problem => `${path}: ${problem}`);
    });
    expect(problems, naming("cured files that are not composed", problems)).toEqual([]);
  });

  it("reconciles the owner-named census by name: every member is cured here or listed with its deferral or owner-ruling hold", () => {
    const cured = new Set<string>(CURED);
    const unreconciled = NAMED_CENSUS.filter(path => !cured.has(path) && !/^(?:DEFERRED-TO-wb-|OWNER-RULING: )/.test(LISTED.get(path)?.reason ?? ""));
    expect({ members: NAMED_CENSUS.length, unreconciled }, naming("owner-named census members neither cured nor held", unreconciled)).toEqual({ members: 19, unreconciled: [] });
  });
});

describe("the census scanner (synthetic sources)", () => {
  const counted = (source: string, path = "test/synthetic.test.ts"): Counts & { tracked: number } => {
    const scan = scanSource(path, source);
    return { mkdtemp: scan.mkdtemp, tmpdir: scan.tmpdir, tracked: scan.tracked };
  };

  it.each([
    ["a named import", 'import { mkdtempSync } from "node:fs"; import { tmpdir } from "node:os"; mkdtempSync(join(tmpdir(), "x-"));', 1, 1],
    ["a renamed import", 'import { mkdtempSync as fresh } from "fs"; import { tmpdir as base } from "os"; fresh(join(base(), "x-"));', 1, 1],
    ["a namespace import", 'import * as fs from "node:fs"; import * as os from "node:os"; fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["a default import", 'import fs from "node:fs"; import os from "node:os"; fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["element access by a literal name", 'import fs from "node:fs"; import os from "node:os"; fs["mkdtempSync"](join(os["tmpdir"](), "x-"));', 1, 1],
    ["require", 'const fs = require("fs"); const os = require("os"); fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["a destructured dynamic import", 'const { mkdtempSync } = await import("node:fs"); const { tmpdir: where } = await import("node:os"); mkdtempSync(join(where(), "x-"));', 1, 1],
    ["the promises API", 'import { mkdtemp } from "node:fs/promises"; import { tmpdir } from "node:os"; await mkdtemp(join(tmpdir(), "x-"));', 1, 1],
    ["a function value taken off the module", 'import fs from "node:fs"; import os from "node:os"; const make = fs.mkdtempSync; const where = os.tmpdir; make(join(where(), "x-"));', 1, 1],
    ["a shorthand property hand-off", 'import { tmpdir } from "node:os"; resolveSocket({ tmpdir });', 0, 1],
    ["a re-export from the module", 'export { mkdtempSync as fresh } from "node:fs"; export { tmpdir } from "node:os";', 1, 1],
    ["a local re-export of an alias", 'import { mkdtempSync as fresh } from "node:fs"; export { fresh };', 1, 0],
    ["a star re-export", 'export * from "node:fs"; export * as os from "node:os";', 1, 1],
  ])("counts %s as raw", (_shape, source, mkdtemp, tmpdir) => {
    expect(counted(source)).toEqual({ mkdtemp, tmpdir, tracked: 0 });
  });

  it.each([
    ["strings and comments", '// mkdtempSync(join(tmpdir(), "x"))\nconst label = "mkdtempSync tmpdir()";', 0],
    ["object keys and other objects' tmpdir members", 'const options = { tmpdir: "/short", mkdtempSync: 1 }; use(options.tmpdir, placement.tmpdir);', 0],
    ["record fields that share the names", 'const counts = { mkdtemp: 0, tmpdir: 0 }; counts.mkdtemp += 1; report(counts.tmpdir, counts["mkdtemp"]);', 0],
    ["an import that is never used", 'import { mkdtempSync } from "node:fs"; import { tmpdir } from "node:os";', 0],
    ["a type position", 'import type * as os from "node:os"; type Where = typeof os.tmpdir;', 0],
    ["a mkdtemp handed straight to trackScratch", 'import { mkdtempSync, realpathSync } from "node:fs"; import { tmpdir } from "node:os"; import { trackScratch } from "./helpers/scratch.js"; trackScratch(realpathSync(mkdtempSync(join(tmpdir(), "x-"))));', 2],
    ["a mkdtemp handed to an alias of trackScratch", 'import fs from "node:fs"; import { trackScratch as keep } from "./helpers/scratch.js"; keep(fs.mkdtempSync("/tmp/x-"));', 1],
  ])("does not count %s as raw", (_shape, source, tracked) => {
    expect(counted(source)).toEqual({ mkdtemp: 0, tmpdir: 0, tracked });
  });

  it("does not exempt a mkdtemp that only sits near trackScratch: the callee of the tracked argument is still raw", () => {
    expect(counted('import { mkdtempSync } from "node:fs"; import { trackScratch } from "./helpers/scratch.js"; const made = mkdtempSync("/tmp/x-"); trackScratch(made);')).toEqual({ mkdtemp: 1, tmpdir: 0, tracked: 0 });
  });

  const HELPER = 'export function makeScratch(prefix) { return prefix; }\nexport function installScratchLeakGuard() {}\n';
  const tree = (files: Record<string, string>): Census => takeCensus(new Map(Object.entries(files)));

  it.each([
    ["a suite that calls makeScratch with no guard", { "test/a.test.ts": 'import { makeScratch } from "./helpers/scratch.js";\nmakeScratch("a-");\n' }, ["test/a.test.ts"]],
    ["a suite whose guard is installed inside a function only", { "test/a.test.ts": 'import { installScratchLeakGuard, makeScratch } from "./helpers/scratch.js";\nfunction setup() { installScratchLeakGuard(); }\nmakeScratch("a-");\n' }, ["test/a.test.ts"]],
    ["a suite that allocates through an imported helper", { "test/helpers/fixture.ts": 'import { makeScratch } from "./scratch.js";\nexport const fixture = () => makeScratch("f-");\n', "test/a.test.ts": 'import { fixture } from "./helpers/fixture.js";\nfixture();\n' }, ["test/helpers/fixture.ts"]],
    ["a suite that renames the allocator", { "test/a.test.ts": 'import { makeScratch as fresh } from "./helpers/scratch.js";\nfresh("a-");\n' }, ["test/a.test.ts"]],
    ["a qa runner that allocates with no guard", { "qa/workbench/run.mjs": "import { makeScratch } from './scratch.mjs';\nmakeScratch('r-');\n", "qa/workbench/scratch.mjs": HELPER }, ["qa/workbench/run.mjs"]],
  ])("G2 reports %s", (_shape, files, allocating) => {
    const result = tree({ "test/helpers/scratch.ts": HELPER, ...files });
    const entry = Object.keys(files).find(path => path.endsWith(".test.ts") || path === "qa/workbench/run.mjs") ?? "";
    expect(result.unguarded.get(entry)).toEqual(allocating);
  });

  it.each([
    ["a module-scope guard in the suite", { "test/a.test.ts": 'import { installScratchLeakGuard, makeScratch } from "./helpers/scratch.js";\ninstallScratchLeakGuard();\nmakeScratch("a-");\n' }],
    ["a module-scope guard in a helper the suite imports", { "test/helpers/boot.ts": 'import { installScratchLeakGuard } from "./scratch.js";\ninstallScratchLeakGuard();\n', "test/a.test.ts": 'import "./helpers/boot.js";\nimport { makeScratch } from "./helpers/scratch.js";\nmakeScratch("a-");\n' }],
    ["a renamed guard at module scope", { "test/a.test.ts": 'import { installScratchLeakGuard as guard, makeScratch } from "./helpers/scratch.js";\nguard();\nmakeScratch("a-");\n' }],
    ["a qa runner with its guard", { "qa/workbench/run.mjs": "import { installScratchLeakGuard, makeScratch } from './scratch.mjs';\ninstallScratchLeakGuard();\nmakeScratch('r-');\n", "qa/workbench/scratch.mjs": HELPER }],
  ])("G2 accepts %s", (_shape, files) => {
    expect([...tree({ "test/helpers/scratch.ts": HELPER, ...files }).unguarded.keys()]).toEqual([]);
  });

  it("G3 reports an untracked direct allocation in a file of the scanned tree", () => {
    const result = tree({ "test/a.test.ts": 'import { mkdtempSync } from "node:fs";\nimport { tmpdir } from "node:os";\nmkdtempSync(join(tmpdir(), "a-"));\n', "qa/workbench/run.mjs": "import os from 'node:os';\nconsole.log(os.tmpdir());\n" });
    expect(Object.fromEntries(result.raw)).toEqual({ "qa/workbench/run.mjs": { mkdtemp: 0, tmpdir: 1 }, "test/a.test.ts": { mkdtemp: 1, tmpdir: 1 } });
  });
});
