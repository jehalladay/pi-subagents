/**
 * wb-1yam ([MII P06+], program mechanical-interop-integrity-2026-11-10): EAT-R444 criterion 1 ONLY, the static import census
 * over src/. The EAT-R444 block, the EAT-R421 Statement line, the EAT-R444 Matrix B row and its section 7 criterion gate line
 * are vendored beside this file (test/fixtures/mii-effect-intent-import-requirement.json, read-only git show of master
 * a1870c0c; both source files are byte-identical on master 53ac7f35). The Matrix B row says "the static import census leg is
 * NOT_RUN and runnable now". This census is that leg, and it claims exactly the pinned reader set below.
 *
 * THE READING. sitesOf() parses one source text with the TypeScript parser and returns every module specifier site in it:
 * import declarations (value, type-only and bare), export-from declarations (export *, export * as, named and type-only),
 * import-equals require, import() calls, require() calls and calls of a require function made by createRequire (called
 * directly, or through a const or let bound to a createRequire call in the same file), resolve calls (import.meta.resolve,
 * require.resolve and the resolve member of such a require function), import type nodes, triple-slash path and types
 * references, and ambient module names. A site whose specifier is a string literal or a template literal without
 * substitutions is READ; any other specifier makes a COMPUTED site, reported by its call text and never read. A FAMILIES row
 * matches a READ specifier through its criterion 1 token, after normalize() (ASCII percent-escapes decoded, backslashes read
 * as slashes, lower case, any ?query or #fragment after the first character dropped): a token ending in "/" matches where the
 * normalized specifier holds it; a token ending in "/*" matches where the normalized specifier holds its scope and the
 * specifier as written is not ALLOWLISTED (the EAT-R421 host subpath); any other token matches a path segment that equals it
 * or starts with it and a dot (so effect-intent matches effect-intent.js and effect-intent.d.ts, not effect-intent-reader.js).
 * A finding is "<file>:<line> <form> <specifier>".
 *
 * PINNED READER SET (this file; each case by its id; observed green at base ce180d82 with this cut):
 * - R444-C1-ANCHOR the requirement anchor: the vendored EAT-R444 block, EAT-R421 Statement, Matrix B row and criterion gate line hash to their pinned SHA-256, criterion 1's backticked tokens are src/ and the four FAMILIES tokens in order, each Statement dist path is a pin of its effect family, and both Statements name ALLOWLISTED
 *   Falsifier: a FAMILIES row removed from every literal of this file while the vendored criterion 1 still names its token.
 * - R444-C1-WALK the reading: the src/ walk equals git's tracked src/ files, every one read as a module, every specifier the TypeScript preprocessor reports in a src file is a READ site of that file, and every form read across src/ and the witness file FORM_WITNESS is a FORMS row
 *   Falsifier: a FORMS row removed from every literal while src/ or FORM_WITNESS still spells its form, or a reader branch
 *   removed for a form the preprocessor reads.
 * - R444-C1-DIST no READ specifier in src matches @mechanical/development-rig/dist/, and each DIST pin planted in every FORMS template adds exactly its one finding
 *   Falsifier: the DIST token narrowed, or a FORMS template the reader does not read.
 * - R444-C1-INTENT no READ specifier in src has a path to effect-intent, and each EFFECT-INTENT pin planted in every FORMS template adds exactly its one finding
 *   Falsifier: normalize() losing percent-decoding, case folding or the query cut, or the dot clause of the segment rule.
 * - R444-C1-RECON no READ specifier in src has a path to effect-reconciliation, and each EFFECT-RECONCILIATION pin planted in every FORMS template adds exactly its one finding
 *   Falsifier: as R444-C1-INTENT, for the second effect token.
 * - R444-C1-HOST every READ @mechanical/* specifier in src is the allowlisted host subpath, and each MECHANICAL pin planted in every FORMS template adds exactly its one finding
 *   Falsifier: the scope rule compared after normalize() instead of as written, or the scope dropped.
 * - R444-C1-QUIET the allowlisted host subpath and each QUIET specifier planted in every FORMS template add no finding of any family
 *   Falsifier: a family rule that matches by substring where it reads segments, or the allowlist dropped (a false deny).
 * - R444-C1-COMPUTED (the quiet row of RESIDUAL COMPUTED-SPECIFIER) the computed specifier sites in src are exactly COMPUTED_SITES, and each COMPUTED_PLANTS text adds exactly one computed site and no read site
 *   Falsifier: computed sites silently dropped instead of reported, or a new computed site in src.
 * - R444-C1-SHAPE frozen shape (standing rule 16): FAMILIES by id, token and pin count, FORMS by id and template count, QUIET, COMPUTED_SITES, COMPUTED_PLANTS, ALLOWLISTED, the read extensions, the walk root, the form witness and the anchor pins, each as a literal
 *   Falsifier: a pin, template or row deleted without its literal.
 * - R444-C1-TITLES the header's PINNED READER SET lists exactly this file's case titles, in order, each verbatim
 *   Falsifier: a case removed or renamed, or a header sentence reworded, on one side only.
 *
 * RESIDUAL COMPUTED-SPECIFIER (named family; pinned quiet row R444-C1-COMPUTED): a specifier computed at run time (a variable,
 * a template literal with substitutions, a concatenation) is reported and never read, so a deep import spelled through one is
 * no finding. Three such sites stand in src at this cut's base: import.meta.resolve(specifier) in src/index.ts over the five
 * SDK package names, createRequire(child).resolve(specifier.text) and createRequire(import.meta.url)(modulePath) in
 * src/workbench/hosts/local-detached.ts. A cut that adds, changes or removes a computed site in src updates COMPUTED_SITES in
 * the same cut, and R444-C1-COMPUTED stays red until it does.
 *
 * NOT CLAIMED (scope sentences, no residual semantics):
 * - EAT-R444 criteria 2, 3 and 4 (the effect_intent_persisted journal row through ORACLE-REG, the reconcile reading of a
 *   missing producer intent as unknown, and the two-host recovery race) are NOT CLAIMED by this census. At the base no function
 *   route exists for them to read: workflow_execute refuses every non-script definition kind with unsupported-definition-kind
 *   (src/workbench/execute-tool.ts:218).
 * - The eleven other requirements of wb-1yam (EAT-R414..R418, R420, R442, R443, R445, R454, R467) are NOT CLAIMED by this
 *   census.
 * - Files outside src/ are NOT CLAIMED by this census: FORM_WITNESS (test/workbench-host-contract.test.ts) is read only to
 *   anchor FORMS, and the rest of test/, qa/ and package tarballs are not read.
 * - That src/ and FORM_WITNESS keep spelling every form is NOT CLAIMED by this census: a form they stop spelling leaves its
 *   FORMS row held by its plants and the frozen shape alone.
 * - A module reached under another name is NOT CLAIMED by this census: a package.json alias, a package.json imports map,
 *   a symlink, or a require function reached through a destructured, aliased or other member than the spellings THE READING
 *   lists.
 * - Specifiers inside comments (a JSDoc import type) and URLs built with new URL() are NOT CLAIMED by this census.
 * - Whether a matched specifier would resolve, load or run is NOT CLAIMED by this census: the families read text.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURE = "test/fixtures/mii-effect-intent-import-requirement.json";
/** The master commit the four vendored lines were read from, and the SHA-256 of each (the block LF-joined). */
const SOURCE_COMMIT = "a1870c0c17df60dae63fee78197048bebf2f6b09";
const REQUIREMENT_SHA256 = "4c959a99e67034dd683abf836acdbad70f6f8563b156eb0f1427d6c956657a83";
const ALLOWLIST_SHA256 = "57e586c2a4bd0af63a44ada0360a34c5cba3dcc6fa939fa424ec3d2dece1d850";
const MATRIX_SHA256 = "673a8d85793c2d73e30175d3746d8f908e9dcb4671d8ea5cde473392072168ed";
const GATE_SHA256 = "76d6540757fbf46e6561b585d5320aad55a574dadee8bcfcf033d98dd12e062b";
/** The tree criterion 1 scopes. */
const WALK_ROOT = "src";
/** A tracked test file that spells the one form src/ does not (import type nodes); src/ spells the other five FORMS rows. */
const FORM_WITNESS = "test/workbench-host-contract.test.ts";
const READ_EXTENSIONS: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"];
/** The one @mechanical/* specifier criterion 1 allows: the EAT-R421 host subpath. */
const ALLOWLISTED = "@mechanical/development-rig/host";
/** Heavy cases parse every tracked source file; under shared-host load the default 5 s is not a reading budget. */
const READ_BUDGET_MS = 900_000;

type FormId = "import" | "export-from" | "import-call" | "require" | "resolve" | "type-level";
type FamilyId = "DIST" | "EFFECT-INTENT" | "EFFECT-RECONCILIATION" | "MECHANICAL";

interface Site {
  readonly file: string;
  readonly line: number;
  readonly form: FormId;
  /** The specifier as written, for a READ site. */
  readonly specifier?: string;
  /** The call text, for a COMPUTED site. */
  readonly computed?: string;
}

interface Family {
  readonly id: FamilyId;
  /** The criterion 1 token this row reads (THE READING). */
  readonly token: string;
  /** Specifiers planted into every FORMS template; this row matches each of them. */
  readonly pins: readonly string[];
}

interface Form {
  readonly id: FormId;
  /** Source texts with {q} (a JSON string literal), {t} (template literal text) or {r} (raw attribute text) for the specifier. */
  readonly templates: readonly string[];
}

/** The families criterion 1 forbids, in its token order. */
const FAMILIES: readonly Family[] = [
  {
    id: "DIST",
    token: "@mechanical/development-rig/dist/",
    pins: [
      "@mechanical/development-rig/dist/index.js",
      "@mechanical/development-rig/dist/host.js",
      "file:///opt/pi/node_modules/@mechanical/development-rig/dist/index.js",
      "file:///opt/pi/node_modules/%40mechanical/development-rig/dist/index.js",
      "../../node_modules/@Mechanical/Development-Rig/DIST/index.js",
    ],
  },
  {
    id: "EFFECT-INTENT",
    token: "effect-intent",
    pins: [
      "@mechanical/development-rig/dist/effect-intent.js",
      "@mechanical/development-rig/dist/effect-intent",
      "../../node_modules/@mechanical/development-rig/dist/effect-intent.js",
      "./vendor/effect-intent.mjs",
      "file:///opt/pi/node_modules/@mechanical/development-rig/dist/effect%2Dintent.js",
      "file:///opt/pi/node_modules/@mechanical/development-rig/dist/effect-intent?v=1",
      "@mechanical/development-rig/dist/Effect-Intent.JS",
    ],
  },
  {
    id: "EFFECT-RECONCILIATION",
    token: "effect-reconciliation",
    pins: [
      "@mechanical/development-rig/dist/effect-reconciliation.js",
      "@mechanical/development-rig/dist/effect-reconciliation.d.ts",
      "../../node_modules/@mechanical/development-rig/dist/effect-reconciliation.js",
      "file:///opt/pi/node_modules/@mechanical/development-rig/dist/effect%2dreconciliation.js",
      "file:///opt/pi/node_modules/@mechanical/development-rig/dist/effect-reconciliation#main",
    ],
  },
  {
    id: "MECHANICAL",
    token: "@mechanical/*",
    pins: [
      "@mechanical/development-rig",
      "@mechanical/development-rig/host/index.js",
      "@mechanical/development-rig/package.json",
      "@mechanical/workflows-development",
      "../node_modules/@mechanical/development-rig/host",
      "@Mechanical/development-rig/host",
      "@mechanical/development-rig/%68ost",
    ],
  },
];

/** Every form THE READING reads, each with the templates that plant it. */
const FORMS: readonly Form[] = [
  {
    id: "import",
    templates: [
      "import { a } from {q};",
      "import d from {q};",
      "import * as ns from {q};",
      "import type { T } from {q};",
      "import {q};",
      'import data from {q} with { type: "json" };',
    ],
  },
  { id: "export-from", templates: ["export * from {q};", "export * as ns from {q};", "export { a } from {q};", "export type { T } from {q};"] },
  {
    id: "import-call",
    templates: ["await import({q});", "void import({q}).then(module => module);", "await import(`{t}`);", 'await import({q}, { with: { type: "json" } });'],
  },
  {
    id: "require",
    templates: [
      "require({q});",
      "createRequire(import.meta.url)({q});",
      "const load = createRequire(import.meta.url);\nload({q});",
      "module.createRequire(import.meta.url)({q});",
      "import x = require({q});",
    ],
  },
  {
    id: "resolve",
    templates: [
      "import.meta.resolve({q});",
      "require.resolve({q});",
      "createRequire(import.meta.url).resolve({q});",
      "let load = createRequire(import.meta.url);\nload.resolve({q});",
    ],
  },
  {
    id: "type-level",
    templates: ["type T = typeof import({q});", "let v: import({q}).T;", '/// <reference types="{r}" />', '/// <reference path="{r}" />', "declare module {q} {}"],
  },
];

/** Specifiers no family matches: the allowlisted host subpath and near misses of each rule. */
const QUIET: readonly string[] = [
  ALLOWLISTED,
  "@furnace/sdk/dist/src/embedded.js",
  "@mechanicalx/development-rig/dist/index.js",
  "mechanical/development-rig/dist/index.js",
  "./effect-intent-reader.js",
  "./dist/effect-intents.js",
  "../reconciliation/effect.js",
  "node:fs",
];

/** RESIDUAL COMPUTED-SPECIFIER: the computed sites standing in src at the base, as "<file> <form> <call text>". */
const COMPUTED_SITES: readonly string[] = [
  "src/index.ts resolve import.meta.resolve(specifier)",
  "src/workbench/hosts/local-detached.ts resolve createRequire(child).resolve(specifier.text)",
  "src/workbench/hosts/local-detached.ts require createRequire(import.meta.url)(request.localProvider.modulePath)",
];

/** [form, text]: each plants one computed site of its form. */
const COMPUTED_PLANTS: ReadonlyArray<readonly [FormId, string]> = [
  ["import-call", "await import(name);"],
  ["import-call", ["await import(`$", "{root}/dist/effect-intent.js`);"].join("")],
  ["import-call", 'await import("@mechanical/" + rest);'],
  ["require", "require(name);"],
  ["require", "createRequire(import.meta.url)(name);"],
  ["resolve", "import.meta.resolve(name);"],
];

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

function scriptKindOf(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (file.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".cjs")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

const isImportMeta = (node: ts.Node): boolean =>
  ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword && node.name.text === "meta";

const isCreateRequireCall = (node: ts.Node): boolean =>
  ts.isCallExpression(node) &&
  (ts.isIdentifier(node.expression) ? node.expression.text === "createRequire" : ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "createRequire");

/** Every module specifier site of one source text (THE READING), in line order. */
function sitesOf(file: string, text: string): Site[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKindOf(file));
  const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line + 1;
  const sites: Site[] = [];
  const add = (form: FormId, node: ts.Node, argument: ts.Node | undefined): void => {
    const line = lineOf(node.getStart(source));
    if (argument !== undefined && (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument))) sites.push({ file, line, form, specifier: argument.text });
    else sites.push({ file, line, form, computed: node.getText(source) });
  };
  const requireFunctions = new Set<string>();
  const bind = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isCreateRequireCall(node.initializer)) requireFunctions.add(node.name.text);
    ts.forEachChild(node, bind);
  };
  bind(source);
  const isRequireFunction = (node: ts.Node): boolean => (ts.isIdentifier(node) && (node.text === "require" || requireFunctions.has(node.text))) || isCreateRequireCall(node);
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) add("import", node, node.moduleSpecifier);
    else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) add("export-from", node, node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add("require", node, node.moduleReference.expression);
    else if (ts.isImportTypeNode(node)) add("type-level", node, ts.isLiteralTypeNode(node.argument) ? node.argument.literal : undefined);
    else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) add("type-level", node, node.name);
    else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (callee.kind === ts.SyntaxKind.ImportKeyword) add("import-call", node, node.arguments[0]);
      else if (isRequireFunction(callee)) add("require", node, node.arguments[0]);
      else if (ts.isPropertyAccessExpression(callee) && callee.name.text === "resolve" && (isRequireFunction(callee.expression) || isImportMeta(callee.expression))) {
        add("resolve", node, node.arguments[0]);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  for (const reference of [...source.referencedFiles, ...source.typeReferenceDirectives]) {
    sites.push({ file, line: lineOf(reference.pos), form: "type-level", specifier: reference.fileName });
  }
  return sites.sort((left, right) => left.line - right.line);
}

/** THE READING's normalize(): ASCII percent-escapes decoded, backslashes as slashes, lower case, ?query and #fragment cut. */
function normalize(specifier: string): string {
  const decoded = specifier
    .replace(/%([0-7][0-9a-fA-F])/g, (_whole: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replaceAll("\\", "/")
    .toLowerCase();
  const cut = decoded.slice(1).search(/[?#]/);
  return cut < 0 ? decoded : decoded.slice(0, cut + 1);
}

/** Whether a FAMILIES row matches one READ specifier (THE READING). */
function matches(family: Family, specifier: string): boolean {
  const path = normalize(specifier);
  if (family.token.endsWith("/*")) return path.includes(family.token.slice(0, -1)) && specifier !== ALLOWLISTED;
  if (family.token.endsWith("/")) return path.includes(family.token);
  return path.split("/").some(segment => segment === family.token || segment.startsWith(`${family.token}.`));
}

const said = (site: Site): string => `${site.file}:${site.line} ${site.form} ${site.specifier ?? site.computed ?? ""}`;
const findingsOf = (family: Family, sites: readonly Site[]): string[] =>
  sites.filter(site => site.specifier !== undefined && matches(family, site.specifier)).map(said);
const readOf = (sites: readonly Site[]): Site[] => sites.filter(site => site.specifier !== undefined);
const computedOf = (sites: readonly Site[]): Site[] => sites.filter(site => site.computed !== undefined);

function familyNamed(id: FamilyId): Family {
  const family = FAMILIES.find(row => row.id === id);
  if (family === undefined) throw new Error(`no FAMILIES row ${id}`);
  return family;
}

/** One template with one specifier put in its place. */
function planted(template: string, specifier: string): string {
  const templateText = specifier.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
  return template.replaceAll("{q}", JSON.stringify(specifier)).replaceAll("{t}", templateText).replaceAll("{r}", specifier);
}

/** Every [form, template] pair of FORMS, in table order. */
const TEMPLATES: ReadonlyArray<readonly [FormId, string]> = FORMS.flatMap(form => form.templates.map(template => [form.id, template] as const));

function walk(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(join(ROOT, directory), { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

const tracked = (tree: string): string[] =>
  execFileSync("git", ["-C", ROOT, "ls-files", "-z", "--", tree], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path !== "")
    .sort();

const readsAsModule = (file: string): boolean => READ_EXTENSIONS.some(extension => file.endsWith(extension));
const sourceText = (file: string): string => readFileSync(join(ROOT, file), "utf8");

let srcSites: readonly Site[] | undefined;
/** Every site of every src/ file (memoized: the heavy cases share one reading). */
function sitesOfSrc(): readonly Site[] {
  if (srcSites === undefined) srcSites = walk(WALK_ROOT).sort().filter(readsAsModule).flatMap(file => sitesOf(file, sourceText(file)));
  return srcSites;
}

interface Vendored {
  readonly commit: string;
  readonly requirement: readonly string[];
  readonly requirementId: string;
  readonly allowlist: string;
  readonly allowlistId: string;
  readonly matrixRow: string;
  readonly criterionGate: string;
}

function member(record: unknown, key: string): unknown {
  if (typeof record !== "object" || record === null || !(key in record)) throw new Error(`${FIXTURE}: missing ${key}`);
  return (record as Record<string, unknown>)[key];
}

function textOf(value: unknown, key: string): string {
  if (typeof value !== "string") throw new Error(`${FIXTURE}: ${key} is not a string`);
  return value;
}

function vendored(): Vendored {
  const raw: unknown = JSON.parse(readFileSync(join(ROOT, FIXTURE), "utf8"));
  const block = member(member(raw, "requirement"), "text");
  if (!Array.isArray(block)) throw new Error(`${FIXTURE}: requirement.text is not a list`);
  return {
    commit: textOf(member(raw, "commit"), "commit"),
    requirement: block.map((line: unknown, index: number) => textOf(line, `requirement.text[${index}]`)),
    requirementId: textOf(member(member(raw, "requirement"), "id"), "requirement.id"),
    allowlist: textOf(member(member(raw, "allowlist"), "text"), "allowlist.text"),
    allowlistId: textOf(member(member(raw, "allowlist"), "id"), "allowlist.id"),
    matrixRow: textOf(member(member(raw, "matrixRow"), "text"), "matrixRow.text"),
    criterionGate: textOf(member(member(raw, "criterionGate"), "text"), "criterionGate.text"),
  };
}

/** The backticked spans of one line, in order. */
const ticksOf = (line: string): string[] => [...line.matchAll(/`([^`]+)`/g)].map(match => match[1] ?? "");

function lineStarting(lines: readonly string[], prefix: string): string {
  const found = lines.filter(line => line.startsWith(prefix));
  if (found.length !== 1) throw new Error(`expected one line starting ${JSON.stringify(prefix)}, found ${found.length}`);
  return found[0] ?? "";
}

/** One family case: zero findings over src, and every pin in every template adds exactly its one finding. */
function judgeFamily(id: FamilyId): void {
  const family = familyNamed(id);
  expect(findingsOf(family, sitesOfSrc())).toEqual([]);
  let plants = 0;
  for (const pin of family.pins) {
    for (const [form, template] of TEMPLATES) {
      const text = planted(template, pin);
      const sites = sitesOf("plant.ts", text);
      expect(
        findingsOf(family, sites).map(finding => finding.replace(/^plant\.ts:\d+ /, "")),
        `${id} pin ${pin} in ${JSON.stringify(template)}`,
      ).toEqual([`${form} ${pin}`]);
      plants += 1;
    }
  }
  expect(plants).toBe(family.pins.length * TEMPLATES.length);
  expect(plants).toBeGreaterThan(0);
}

describe("wb-1yam EAT-R444 criterion 1 census: the READ module specifiers of src/ against the DIST, EFFECT-INTENT, EFFECT-RECONCILIATION and MECHANICAL families", () => {
  it("R444-C1-ANCHOR the requirement anchor: the vendored EAT-R444 block, EAT-R421 Statement, Matrix B row and criterion gate line hash to their pinned SHA-256, criterion 1's backticked tokens are src/ and the four FAMILIES tokens in order, each Statement dist path is a pin of its effect family, and both Statements name ALLOWLISTED", () => {
    const fixture = vendored();
    expect(fixture.commit).toBe(SOURCE_COMMIT);
    expect([fixture.requirementId, fixture.allowlistId]).toEqual(["EAT-R444", "EAT-R421"]);
    expect(sha256(fixture.requirement.join("\n"))).toBe(REQUIREMENT_SHA256);
    expect(sha256(fixture.allowlist)).toBe(ALLOWLIST_SHA256);
    expect(sha256(fixture.matrixRow)).toBe(MATRIX_SHA256);
    expect(sha256(fixture.criterionGate)).toBe(GATE_SHA256);
    const criterion1 = lineStarting(fixture.requirement, "  1. ");
    expect(ticksOf(criterion1)).toEqual([`${WALK_ROOT}/`, ...FAMILIES.map(family => family.token)]);
    expect(criterion1).toContain("the allowlisted host subpath (EAT-R421)");
    const statement = ticksOf(lineStarting(fixture.requirement, "- Statement: "));
    const packageRoot = familyNamed("DIST").token.replace(/dist\/$/, "");
    const deepPaths = statement.filter(token => token.startsWith("dist/")).map(token => `${packageRoot}${token}`);
    expect(deepPaths.map(path => [path, FAMILIES.filter(family => family.pins.includes(path)).map(family => family.id)])).toEqual([
      ["@mechanical/development-rig/dist/effect-intent.js", ["EFFECT-INTENT"]],
      ["@mechanical/development-rig/dist/effect-reconciliation.js", ["EFFECT-RECONCILIATION"]],
    ]);
    for (const path of deepPaths) expect(FAMILIES.filter(family => matches(family, path)).map(family => family.id), path).toHaveLength(3);
    expect(statement).toContain(ALLOWLISTED);
    expect(ticksOf(fixture.allowlist)[0]).toBe(ALLOWLISTED);
    expect(fixture.matrixRow).toContain("the static import census leg is NOT_RUN and runnable now");
    expect(fixture.criterionGate).toContain("(a) no deep import of producer internals");
  });

  it(
    "R444-C1-WALK the reading: the src/ walk equals git's tracked src/ files, every one read as a module, every specifier the TypeScript preprocessor reports in a src file is a READ site of that file, and every form read across src/ and the witness file FORM_WITNESS is a FORMS row",
    () => {
      const files = walk(WALK_ROOT).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toEqual(tracked(WALK_ROOT));
      expect(files.filter(file => !readsAsModule(file))).toEqual([]);
      const missing: string[] = [];
      let preprocessed = 0;
      for (const file of files) {
        const text = sourceText(file);
        const info = ts.preProcessFile(text, true, true);
        const names = [...info.importedFiles, ...info.referencedFiles, ...info.typeReferenceDirectives].map(reference => reference.fileName);
        names.push(...info.ambientExternalModules ?? []);
        const read = new Set(readOf(sitesOfSrc().filter(site => site.file === file)).map(site => site.specifier));
        for (const name of names) if (!read.has(name)) missing.push(`${file} ${name}`);
        preprocessed += names.length;
      }
      expect(missing).toEqual([]);
      expect(preprocessed).toBeGreaterThan(0);
      expect(tracked(FORM_WITNESS)).toEqual([FORM_WITNESS]);
      const forms = new Set<FormId>([...sitesOfSrc(), ...sitesOf(FORM_WITNESS, sourceText(FORM_WITNESS))].map(site => site.form));
      const rows = new Set<string>(FORMS.map(form => form.id));
      expect([...forms].filter(form => !rows.has(form)).sort()).toEqual([]);
    },
    READ_BUDGET_MS,
  );

  it("R444-C1-DIST no READ specifier in src matches @mechanical/development-rig/dist/, and each DIST pin planted in every FORMS template adds exactly its one finding", () => judgeFamily("DIST"), READ_BUDGET_MS);

  it("R444-C1-INTENT no READ specifier in src has a path to effect-intent, and each EFFECT-INTENT pin planted in every FORMS template adds exactly its one finding", () => judgeFamily("EFFECT-INTENT"), READ_BUDGET_MS);

  it("R444-C1-RECON no READ specifier in src has a path to effect-reconciliation, and each EFFECT-RECONCILIATION pin planted in every FORMS template adds exactly its one finding", () => judgeFamily("EFFECT-RECONCILIATION"), READ_BUDGET_MS);

  it("R444-C1-HOST every READ @mechanical/* specifier in src is the allowlisted host subpath, and each MECHANICAL pin planted in every FORMS template adds exactly its one finding", () => {
    const scope = familyNamed("MECHANICAL").token.slice(0, -1);
    expect(readOf(sitesOfSrc()).filter(site => normalize(site.specifier ?? "").includes(scope) && site.specifier !== ALLOWLISTED).map(said)).toEqual([]);
    judgeFamily("MECHANICAL");
  }, READ_BUDGET_MS);

  it("R444-C1-QUIET the allowlisted host subpath and each QUIET specifier planted in every FORMS template add no finding of any family", () => {
    let plants = 0;
    for (const specifier of QUIET) {
      for (const [form, template] of TEMPLATES) {
        const sites = sitesOf("plant.ts", planted(template, specifier));
        expect(readOf(sites).map(site => `${site.form} ${site.specifier}`), `${specifier} in ${JSON.stringify(template)}`).toEqual([`${form} ${specifier}`]);
        expect(FAMILIES.flatMap(family => findingsOf(family, sites)), `${specifier} in ${JSON.stringify(template)}`).toEqual([]);
        plants += 1;
      }
    }
    expect(plants).toBe(QUIET.length * TEMPLATES.length);
  });

  it("R444-C1-COMPUTED (the quiet row of RESIDUAL COMPUTED-SPECIFIER) the computed specifier sites in src are exactly COMPUTED_SITES, and each COMPUTED_PLANTS text adds exactly one computed site and no read site", () => {
    expect(computedOf(sitesOfSrc()).map(site => `${site.file} ${site.form} ${site.computed}`)).toEqual(COMPUTED_SITES);
    for (const [form, text] of COMPUTED_PLANTS) {
      const sites = sitesOf("plant.ts", text);
      expect(computedOf(sites).map(site => `${site.form} ${site.computed}`), text).toEqual([`${form} ${text.replace(/;$/, "").replace(/^await /, "")}`]);
      expect(readOf(sites), text).toEqual([]);
    }
  }, READ_BUDGET_MS);

  it("R444-C1-SHAPE frozen shape (standing rule 16): FAMILIES by id, token and pin count, FORMS by id and template count, QUIET, COMPUTED_SITES, COMPUTED_PLANTS, ALLOWLISTED, the read extensions, the walk root, the form witness and the anchor pins, each as a literal", () => {
    expect(FAMILIES.map(family => `${family.id}|${family.token}|${family.pins.length}`)).toEqual([
      "DIST|@mechanical/development-rig/dist/|5",
      "EFFECT-INTENT|effect-intent|7",
      "EFFECT-RECONCILIATION|effect-reconciliation|5",
      "MECHANICAL|@mechanical/*|7",
    ]);
    expect(FORMS.map(form => `${form.id}:${form.templates.length}`)).toEqual(["import:6", "export-from:4", "import-call:4", "require:5", "resolve:4", "type-level:5"]);
    expect(QUIET).toEqual([
      "@mechanical/development-rig/host",
      "@furnace/sdk/dist/src/embedded.js",
      "@mechanicalx/development-rig/dist/index.js",
      "mechanical/development-rig/dist/index.js",
      "./effect-intent-reader.js",
      "./dist/effect-intents.js",
      "../reconciliation/effect.js",
      "node:fs",
    ]);
    expect(COMPUTED_SITES).toHaveLength(3);
    expect(COMPUTED_PLANTS.map(([form]) => form)).toEqual(["import-call", "import-call", "import-call", "require", "require", "resolve"]);
    expect(ALLOWLISTED).toBe("@mechanical/development-rig/host");
    expect(READ_EXTENSIONS).toEqual([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"]);
    expect([WALK_ROOT, FORM_WITNESS]).toEqual(["src", "test/workbench-host-contract.test.ts"]);
    expect([SOURCE_COMMIT, REQUIREMENT_SHA256, ALLOWLIST_SHA256, MATRIX_SHA256, GATE_SHA256].map(pin => pin.slice(0, 16))).toEqual([
      "a1870c0c17df60da",
      "4c959a99e67034dd",
      "57e586c2a4bd0af6",
      "673a8d85793c2d73",
      "76d6540757fbf46e",
    ]);
    expect(relative(ROOT, join(ROOT, FIXTURE))).toBe("test/fixtures/mii-effect-intent-import-requirement.json");
  });

  it("R444-C1-TITLES the header's PINNED READER SET lists exactly this file's case titles, in order, each verbatim", () => {
    const self = fileURLToPath(import.meta.url);
    const text = readFileSync(self, "utf8");
    const source = ts.createSourceFile(self, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const titles: string[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it") {
        const title = node.arguments[0];
        if (title !== undefined && ts.isStringLiteral(title)) titles.push(title.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    const header = text.slice(0, text.indexOf("*/"));
    const listed = header
      .split("\n")
      .filter(line => line.startsWith(" * - R444-C1-"))
      .map(line => line.slice(" * - ".length));
    expect(titles.length).toBeGreaterThan(0);
    expect(listed).toEqual(titles);
  });
});
