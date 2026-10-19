/**
 * wb-973.1 re-cut, owner ruling R468(b): the GUARD that binds the waived "R1 shall not land without R2" landing hold.
 *
 * Why it exists: SCG-R1 (wb-973.1) gives reactivefiber.render.preview a second input arm {view, taskId, model?}, and the
 * --view render it spawns carries result.view_contract. SCG-R2 (wb-973.2) is what makes the RF reader adapter project an
 * unsatisfied view_contract as coverage 'partial' with a statusTone other than 'success'; until it lands, the trunk
 * adapter (src/workbench/reactivefiber-observer.ts reactivefiberTopology) projects an UNSATISFIED view_contract envelope
 * exactly like a satisfied or legacy one: coverage complete, tone success (gate-2 coupling probe, row 468). The owner
 * waived the hold on the measured basis that nothing user-visible renders that mechanism at this landing: reactivefiberTopology
 * has zero src callers and no src site passes the {view, taskId} arm. This file keeps that basis true until wb-973.2:
 * any earlier src wiring of either reds the default gate.
 *
 * RETIRED BY wb-973.2: that bead's cut wires the view_contract projection this guard holds back, so it deletes this file
 * in the same commit. No other cut retires or loosens it.
 *
 * What the census reads: the TypeScript parser over every source file under src/ (a symlink is not followed), so comments
 * never count and every syntactic reference does. It records
 *  (i)  TOPOLOGY CALLERS - every reference to the identifier reactivefiberTopology (a call, a named or renamed import, a
 *       re-export, a member access such as observer.reactivefiberTopology) and every string literal spelling it (such as
 *       observer["reactivefiberTopology"]), except the one function declaration that defines it in the observer module;
 *  (ii) VIEW-ARM SITES - (a) an object literal carrying both a view and a taskId key (the {view, taskId} input literal, in
 *       any key spelling: identifier, string, computed string or shorthand), except the provider module's own descriptor
 *       arm; (b) a reference, outside the provider module, to the provider's selector-taking entry nativeReactiveFiberRender
 *       or its selector type ReactiveFiberRenderSelector (the only programmatic path into the view arm besides the
 *       registry); (c) a reference anywhere in src/ to a result key only the --view render emits: view_contract, view_id,
 *       effective_scopes (a consumer of the view arm's output).
 * The scan is syntactic, not a reachability proof: an input built at run time (Object.fromEntries, a parsed document, a
 * member name computed at run time) and a {view, taskId} payload that a Claude tool call or a workflow script supplies at
 * run time are not src sites, and are outside the ruling's measured basis.
 *
 * W19: wiring census only; no security claim. Display paths added: none (test-only file).
 */
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const SOURCE = /\.(?:[cm]?ts|tsx|[cm]?js|jsx)$/;
const OBSERVER = "src/workbench/reactivefiber-observer.ts";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const TOPOLOGY = "reactivefiberTopology";
const VIEW_ENTRIES = new Set(["nativeReactiveFiberRender", "ReactiveFiberRenderSelector"]);
const VIEW_RESULT_KEYS = new Set(["view_contract", "view_id", "effective_scopes"]);
/** A floor on the walked tree, so a broken walk can never pass as an empty one (src/ holds 113 source files at this cut). */
const MIN_SOURCE_FILES = 50;

/** One census hit, located for the reader of a red gate. */
interface Site {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly kind: string;
  readonly text: string;
}

/** What one source file references. */
interface FileCensus {
  /** (i): references to reactivefiberTopology other than its defining declaration. */
  readonly topology: Site[];
  /** Defining declarations of reactivefiberTopology found (only the observer module's function declaration counts). */
  readonly declarations: number;
  /** (ii)(a): object literals carrying both a view and a taskId key, wherever they are. */
  readonly viewLiterals: Site[];
  /** (ii)(b): references to the provider's selector entry or selector type, outside the provider module. */
  readonly viewEntries: Site[];
  /** (ii)(c): references to a key only the --view render emits. */
  readonly viewResultKeys: Site[];
}

function scriptKind(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (file.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (/\.[cm]?js$/.test(file)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

/** The key an object literal element declares, when it is spelled statically. */
function elementKey(element: ts.ObjectLiteralElementLike): string | undefined {
  if (ts.isSpreadAssignment(element)) return undefined;
  const name = element.name;
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression)) return name.expression.text;
  return undefined;
}

/** The census of one source text; `file` is its repo-relative posix path, which decides the two exemptions. */
function scanSource(file: string, text: string): FileCensus {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const census: FileCensus = { topology: [], declarations: 0, viewLiterals: [], viewEntries: [], viewResultKeys: [] };
  let declarations = 0;
  const site = (node: ts.Node, kind: string, spelled: string): Site => {
    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
    return { file, line: line + 1, column: character + 1, kind, text: spelled };
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) {
      const spelled = node.text;
      if (spelled === TOPOLOGY) {
        const defining = file === OBSERVER && ts.isIdentifier(node) && ts.isFunctionDeclaration(node.parent) && node.parent.name === node;
        if (defining) declarations++;
        else census.topology.push(site(node, ts.isIdentifier(node) ? "identifier" : "string", spelled));
      }
      if (VIEW_ENTRIES.has(spelled) && file !== PROVIDER) census.viewEntries.push(site(node, ts.isIdentifier(node) ? "identifier" : "string", spelled));
      if (VIEW_RESULT_KEYS.has(spelled)) census.viewResultKeys.push(site(node, ts.isIdentifier(node) ? "identifier" : "string", spelled));
    }
    if (ts.isObjectLiteralExpression(node)) {
      const keys = new Set(node.properties.map(elementKey));
      if (keys.has("view") && keys.has("taskId")) census.viewLiterals.push(site(node, "object-literal", "{view, taskId}"));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { ...census, declarations };
}

/** Every source file under `dir`, sorted; directories are entered, symlinks are not followed. */
function sourceFiles(dir: string, out: string[] = []): string[] {
  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true });
  for (const entry of [...entries].sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, out);
    else if (entry.isFile() && SOURCE.test(entry.name)) out.push(full);
  }
  return out;
}

/** The census of the live src/ tree: per-file scans keyed by repo-relative posix path. */
function treeCensus(): Map<string, FileCensus> {
  const scans = new Map<string, FileCensus>();
  for (const full of sourceFiles(SRC)) {
    const file = relative(ROOT, full).split(sep).join(posix.sep);
    scans.set(file, scanSource(file, readFileSync(full, "utf8")));
  }
  return scans;
}

const where = (hit: Site): string => `${hit.file}:${hit.line}:${hit.column} ${hit.kind} ${hit.text}`;

describe("wb-973.1 re-cut (R468(b)): the waived R1-without-R2 landing hold stays guarded until wb-973.2", () => {
  it("the census flags every syntactic wiring shape of reactivefiberTopology; only its defining declaration is exempt", () => {
    const wired = [
      'import { reactivefiberTopology } from "./reactivefiber-observer.js";',
      "export const project = (reading, context) => reactivefiberTopology(reading, context);",
    ].join("\n");
    expect(scanSource("src/workbench/x.ts", wired).topology.map(where)).toEqual([
      "src/workbench/x.ts:1:10 identifier reactivefiberTopology",
      "src/workbench/x.ts:2:46 identifier reactivefiberTopology",
    ]);
    const renamed = 'import { reactivefiberTopology as rf } from "./reactivefiber-observer.js";\nrf(reading, context);';
    expect(scanSource("src/workbench/x.ts", renamed).topology).toHaveLength(1);
    const member = 'import * as observer from "./reactivefiber-observer.js";\nobserver.reactivefiberTopology(r, c);\nobserver["reactivefiberTopology"](r, c);';
    expect(scanSource("src/workbench/x.ts", member).topology.map(hit => hit.kind)).toEqual(["identifier", "string"]);
    expect(scanSource("src/workbench/x.ts", 'export { reactivefiberTopology } from "./reactivefiber-observer.js";').topology).toHaveLength(1);
    const declared = "/** reactivefiberTopology projects one snapshot. */\nexport function reactivefiberTopology(reading, context) { return { reading, context }; }";
    const defining = scanSource(OBSERVER, declared);
    expect(defining.topology).toEqual([]);
    expect(defining.declarations).toBe(1);
    const shadow = scanSource("src/workbench/elsewhere.ts", declared);
    expect(shadow.declarations).toBe(0);
    expect(shadow.topology).toHaveLength(1);
    expect(scanSource("src/workbench/x.ts", "// reactivefiberTopology(reading, context) is wired by wb-973.2\nexport {};").topology).toEqual([]);
  });

  it("the census flags {view, taskId} input literals, the selector entry outside the provider and the --view result keys", () => {
    const invoke = 'await registry.invoke("reactivefiber.render.preview", { view: "swarm.worker", taskId: "bead-fixture-000" }, context);';
    expect(scanSource("src/workbench/x.ts", invoke).viewLiterals.map(where)).toEqual(["src/workbench/x.ts:1:55 object-literal {view, taskId}"]);
    for (const literal of ["const input = { view, taskId };", 'const input = { "view": v, "taskId": t, model: m };', 'const input = { ["view"]: v, taskId: t };']) {
      expect(scanSource("src/workbench/x.ts", literal).viewLiterals).toHaveLength(1);
    }
    for (const literal of ["const input = { view: v };", "const input = { taskId: t, status: s };", "const input = { model: m, task: t };"]) {
      expect(scanSource("src/workbench/x.ts", literal).viewLiterals).toEqual([]);
    }
    const entry = 'import { nativeReactiveFiberRender, type ReactiveFiberRenderSelector } from "./providers/reactivefiber.js";\nconst s: ReactiveFiberRenderSelector = pick();\nnativeReactiveFiberRender(s, root);';
    expect(scanSource("src/workbench/x.ts", entry).viewEntries.map(hit => hit.text)).toEqual([
      "nativeReactiveFiberRender",
      "ReactiveFiberRenderSelector",
      "ReactiveFiberRenderSelector",
      "nativeReactiveFiberRender",
    ]);
    expect(scanSource(PROVIDER, entry).viewEntries).toEqual([]);
    const consumer = 'const contract = source.result.view_contract;\nconst scopes = result["effective_scopes"];\nconst { view_id } = result;';
    expect(scanSource("src/workbench/x.ts", consumer).viewResultKeys.map(hit => hit.text)).toEqual(["view_contract", "effective_scopes", "view_id"]);
    expect(scanSource(PROVIDER, consumer).viewResultKeys).toHaveLength(3);
  });

  it("the census walks the live src tree and anchors on the observer declaration and the provider's own view arm", () => {
    const scans = treeCensus();
    expect(scans.size).toBeGreaterThanOrEqual(MIN_SOURCE_FILES);
    expect([...scans.keys()]).toEqual(expect.arrayContaining([OBSERVER, PROVIDER]));
    expect(scans.get(OBSERVER)?.declarations).toBe(1);
    expect([...scans.values()].reduce((total, scan) => total + scan.declarations, 0)).toBe(1);
    // The provider's descriptor VIEW_INPUT properties object is the one {view, taskId} literal src/ may hold today.
    expect(scans.get(PROVIDER)?.viewLiterals.map(hit => hit.kind)).toEqual(["object-literal"]);
    const providerText = readFileSync(join(ROOT, PROVIDER), "utf8");
    expect(providerText).toContain("export async function nativeReactiveFiberRender(");
    expect(providerText).toContain("export type ReactiveFiberRenderSelector=");
  });

  it("GUARD until wb-973.2 (retired by its cut): no src file calls reactivefiberTopology and no src site invokes reactivefiber.render.preview with the view arm", () => {
    const topologyCallers: string[] = [];
    const viewArmSites: string[] = [];
    for (const [file, scan] of treeCensus()) {
      topologyCallers.push(...scan.topology.map(where));
      viewArmSites.push(...(file === PROVIDER ? [] : scan.viewLiterals).map(where), ...scan.viewEntries.map(where), ...scan.viewResultKeys.map(where));
    }
    expect({ topologyCallers, viewArmSites }).toEqual({ topologyCallers: [], viewArmSites: [] });
  });
});
