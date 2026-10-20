import { createHash } from "node:crypto";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
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
const PACKAGE_COPY_ROW_BUDGET_MS = 90_000;
/**
 * The worst wall of record of a package-copy row: "pins actual package.json, ..." at 36730 ms in file-alone serial attempt 3
 * at load1 417 (wb-2j3.4 gate, outbox 571). The other walls of record: the lockfile row at 15323 and 11951 ms (outbox 571,
 * attempts 2 and 3) and 8872 ms serially (outbox 569), 8363 ms at load1 350-400 (wb-gs2.3 relay F1), and 14951 / 8161 ms
 * file-alone at load1 437 (wb-hk9l gate PREP). Instrument residual, never a sizing input: the lockfile row's 320 s synchronous
 * IO-stall block in outbox 571's first serial leg (IO full avg10 ~88) - no budget cures a host stall.
 */
const WORST_MEASURED_WALL_MS = 36_730;
const PACKAGE_COPY_ROW: { readonly timeout: number } = { timeout: PACKAGE_COPY_ROW_BUDGET_MS };
/** The rows that carry PACKAGE_COPY_ROW, in file order: every row whose registration reaches a copy (the wb-hk9l pin). */
const PACKAGE_COPY_ROWS = [
  "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction",
  "uses the shipped dependency lock only when npm has excluded package-lock.json",
  "rejects lockfile changes, missing artifact and lockfile/manifest mismatch",
];
/** The node:fs calls that copy a file or a tree, read by name wherever named: imported, as a namespace member or as an element read. */
const COPY_CALLS: ReadonlySet<string> = new Set(["cp", "cpSync", "copyFile", "copyFileSync"]);
/** vitest's test API as this file may name it, the flags that keep a chain the test API, and its condition and table methods. */
const TEST_APIS: ReadonlySet<string> = new Set(["it", "test"]);
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
 * A registration (title, options, table and body) copies when it names a COPY_CALLS member or a same-file binding that does:
 * every named function, const, method and property, closed to a fixpoint. Named residuals, outside the scan: a copy inside
 * another module's function, a copy run as a subprocess, and a copy in a hook or at module scope (those run under hookTimeout
 * or at collection, never under a row's budget).
 */
function scanRows(text: string): { title: string; copies: boolean }[] {
  const source = ts.createSourceFile("scanned.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const copying = new Set(COPY_CALLS);
  const names = (node: ts.Node, own?: ts.Node): boolean =>
    (node !== own && ts.isIdentifier(node) && copying.has(node.text)) ||
    (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && copying.has(node.argumentExpression.text)) ||
    ts.forEachChild(node, child => (names(child, own) ? true : undefined)) === true;
  const bindings: { name: ts.Identifier; declaration: ts.Node }[] = [];
  const collect = (node: ts.Node): void => {
    const name = ts.isFunctionDeclaration(node) || ts.isVariableDeclaration(node) || ts.isMethodDeclaration(node) || ts.isPropertyAssignment(node) ? node.name : undefined;
    if (name !== undefined && ts.isIdentifier(name)) bindings.push({ name, declaration: node });
    ts.forEachChild(node, collect);
  };
  collect(source);
  for (let grew = true; grew; ) {
    grew = false;
    for (const { name, declaration } of bindings) {
      if (copying.has(name.text) || !names(declaration, name)) continue;
      copying.add(name.text);
      grew = true;
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
 * that reach none, plus the two unreadable shapes. SCAN_READINGS is the frozen reading of each, so a route the scan stops
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
  ["class method", 'class Io { copy(): void { cpSync(a, b); } }\nit("row", () => { new Io().copy(); });'],
  ["property helper", 'register({ copy: (): void => cpSync(a, b) });\nit("row", () => { registry.copy(); });'],
  ["two hops", 'function outer(): void { inner(); }\nfunction inner(): void { cpSync(a, b); }\nit("row", () => { outer(); });'],
  ["table function", 'it.each([["row", () => cpSync(a, b)]])("%s", (_name, run) => { run(); });'],
  ["quiet row", 'it("row", () => { readFileSync(a); });'],
  ["quiet helper", 'function read(): void { readFileSync(a); }\nit("row", () => { read(); });'],
  ["quiet near names", 'it("row", () => { const copyright = cpSyncCount; expect(copyright).toBe(0); });'],
  ["unexpandable table", 'it.each([{ name: "row" }])("$name", () => { cpSync(a, b); });'],
  ["non-literal title", "it(name, () => { cpSync(a, b); });"],
];
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
  "class method: row copies",
  "property helper: row copies",
  "two hops: row copies",
  "table function: row copies",
  "quiet row: row quiet",
  "quiet helper: row quiet",
  "quiet near names: row quiet",
  "unexpandable table: <a table row the scan cannot expand> copies",
  "non-literal title: <a row with a non-literal title> copies",
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

describe("WB-014 immutable invocation identity", () => {
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

  it("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", PACKAGE_COPY_ROW, () => {
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
    const registered: { title: string; timeout: number }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ title: child.name, timeout: child.timeout });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const scanned = scanRows(readFileSync(fileURLToPath(import.meta.url), "utf8"));
    expect(scanned.map(row => row.title), "the source scan classifies every registered row").toEqual(registered.map(row => row.title));
    expect(registered.filter(row => row.timeout === PACKAGE_COPY_ROW_BUDGET_MS).map(row => row.title), "the rows the runner runs under PACKAGE_COPY_ROW_BUDGET_MS").toEqual(PACKAGE_COPY_ROWS);
    expect(scanned.filter(row => row.copies).map(row => row.title), "the rows whose registration reaches a copy").toEqual(PACKAGE_COPY_ROWS);
    expect(PACKAGE_COPY_ROW_BUDGET_MS, "the owner floor").toBeGreaterThanOrEqual(20_000);
    expect(WORST_MEASURED_WALL_MS, "the worst wall of record: 36730 ms (outbox 571)").toBeGreaterThanOrEqual(36_730);
    expect(PACKAGE_COPY_ROW_BUDGET_MS, "more than 2 x the worst wall of record").toBeGreaterThan(2 * WORST_MEASURED_WALL_MS);
  });

  it("wb-hk9l scan liveness: each copy route reads as a copy, each quiet row as quiet, and an unreadable row as its sentinel", () => {
    const readings = SCAN_WITNESSES.map(([route, source]) => `${route}: ${scanRows(source).map(row => `${row.title} ${row.copies ? "copies" : "quiet"}`).join("; ")}`);
    expect(readings, "the scan's reading of each witness").toEqual(SCAN_READINGS);
  });
});
