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
 * artifact takes a wall time set by host contention rather than by identity logic: the owner relay for wb-gs2.3 measured
 * the package/vendor pin row at 8363 ms serial at load1 350-400, inside which vitest's default 5000 ms budget fails it
 * (the a2g.13 trunk control, the wb-973.2 owner gate and both wb-gs2.3 machine runs). The owner floor is 20000 ms; 30000 ms
 * is 3.6 x the 8363 ms measurement. A row's synchronous file work cannot be interrupted, so the budget only decides when a
 * finished row is failed; it never retries one.
 */
const PACKAGE_COPY_ROW_BUDGET_MS = 30_000;
/** The worst measured serial wall of a package-copy row (wb-gs2.3 relay F1, load1 350-400). */
const WORST_MEASURED_WALL_MS = 8_363;
const PACKAGE_COPY_ROW: { readonly timeout: number } = { timeout: PACKAGE_COPY_ROW_BUDGET_MS };
/** The rows that carry PACKAGE_COPY_ROW, in file order: every row whose body calls cpSync. */
const PACKAGE_COPY_ROWS = [
  "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction",
  "uses the shipped dependency lock only when npm has excluded package-lock.json",
  "rejects lockfile changes, missing artifact and lockfile/manifest mismatch",
];
/** Every it() row of this file in source order: whether it carries PACKAGE_COPY_ROW and whether its body calls cpSync (the wb-hk9l pin). */
function sourceRows(): { title: string; budgeted: boolean; copies: boolean }[] {
  const file = fileURLToPath(import.meta.url);
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const callsCopy = (node: ts.Node): boolean =>
    (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "cpSync") ||
    ts.forEachChild(node, child => (callsCopy(child) ? true : undefined)) === true;
  const rows: { title: string; budgeted: boolean; copies: boolean }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it") {
      const [title, second] = node.arguments;
      const body = node.arguments[node.arguments.length - 1];
      rows.push({
        title: title !== undefined && ts.isStringLiteralLike(title) ? title.text : "<a row with a non-literal title>",
        budgeted: node.arguments.length === 3 && second !== undefined && ts.isIdentifier(second) && second.text === "PACKAGE_COPY_ROW",
        copies: body !== undefined && callsCopy(body),
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return rows;
}
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

  it("wb-hk9l: every package-copy row runs under the explicit file-local budget, none rides the 5000 ms default", () => {
    const rows = sourceRows();
    expect(rows.filter(row => row.budgeted).map(row => row.title)).toEqual(PACKAGE_COPY_ROWS);
    expect(rows.filter(row => row.copies).map(row => row.title)).toEqual(PACKAGE_COPY_ROWS);
    expect(rows.filter(row => row.title === "<a row with a non-literal title>")).toEqual([]);
    expect(PACKAGE_COPY_ROW).toEqual({ timeout: PACKAGE_COPY_ROW_BUDGET_MS });
    expect(PACKAGE_COPY_ROW_BUDGET_MS).toBeGreaterThanOrEqual(20_000);
    expect(PACKAGE_COPY_ROW_BUDGET_MS).toBeGreaterThan(2 * WORST_MEASURED_WALL_MS);
    expect(WORST_MEASURED_WALL_MS).toBeGreaterThan(5_000);
  });
});
