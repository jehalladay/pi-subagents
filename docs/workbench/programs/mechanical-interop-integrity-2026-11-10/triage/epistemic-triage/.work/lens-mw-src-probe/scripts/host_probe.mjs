// Probe of the built ./host facade at the pin copy. argv: <copy-root> <development-tarball>
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const [, , copyRoot, tarball] = process.argv;
const host = await import(pathToFileURL(join(copyRoot, "apps/development-rig/dist/host.js")).href);
const digest = bytes => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const descriptorBytes = readFileSync(join(copyRoot, "contracts/entrypoints/development.v1.json"));
const libraryBytes = readFileSync(tarball);
const basis = { workspaceId: "repo-A", revision: "base-1" };
const updated = { workspaceId: "repo-A", revision: "candidate-1" };
function services(seen) {
  return {
    discover: async request => { seen.push({ cb: "discover", own: Object.getOwnPropertyNames(request), sameObject: request === seen.input, notes: Object.getOwnPropertyDescriptor(request, "notes") ? "present" : "absent" }); return { basis, coverage: "complete", files: ["a.ts"] }; },
    compileContext: async () => ({ basis, text: "plain" }),
    implement: async (_c, _s, request) => { seen.push({ cb: "implement", task: request.task }); return { basis: updated, parentBasis: basis }; },
    verify: async () => ({ basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-probe" } }),
  };
}
async function attempt(label, descriptor, input, extra = {}) {
  const seen = []; seen.input = input;
  const bytes = descriptor === null ? descriptorBytes : Buffer.from(JSON.stringify(descriptor, null, 2) + "\n");
  let result;
  try {
    const outcome = await host.invokeDevelopmentHost({ artifactPath: tarball, artifactDigest: digest(libraryBytes), descriptorBytes: bytes, descriptorDigest: digest(bytes), services: services(seen), ...extra }, input);
    result = { admitted: true, outcome: outcome.kind };
  } catch (error) {
    result = { admitted: false, errorClass: error?.constructor?.name, name: error?.name, code: error?.code ?? null, message: String(error?.message).slice(0, 160) };
  }
  console.log(JSON.stringify({ label, result, callbacks: seen.map(s => s) }));
}
const good = JSON.parse(descriptorBytes.toString("utf8"));
const without = key => { const d = JSON.parse(JSON.stringify(good)); delete d[key]; return d; };
const request = () => ({ task: "probe", workspaceId: "repo-A", baseRevision: "base-1" });
console.log(JSON.stringify({ exports: Object.keys(host).sort(), HOST_API_VERSION: host.HOST_API_VERSION, WRITE_GRANT: host.WRITE_GRANT }));
await attempt("positive-control", null, request());
await attempt("descriptor-missing-implementation", without("implementation"), request());
await attempt("descriptor-missing-bindings", without("bindings"), request());
await attempt("descriptor-missing-inputSchema", without("inputSchema"), request());
await attempt("descriptor-implementation-null", { ...good, implementation: null }, request());
await attempt("artifact-path-nonexistent", null, request(), { artifactPath: join(copyRoot, "does-not-exist.tgz") });
await attempt("input-extra-enumerable-notes", null, { ...request(), notes: "untrusted" });
await attempt("input-task-and-notes-only (pi-01 D counterexample literal)", null, { task: "X", notes: "untrusted" });
{ const hidden = request(); Object.defineProperty(hidden, "notes", { enumerable: false, get() { return "hidden-untrusted"; } }); await attempt("input-nonenumerable-notes-getter", null, hidden); }
{ let reads = 0; const acc = { workspaceId: "repo-A", baseRevision: "base-1" }; Object.defineProperty(acc, "task", { enumerable: true, get() { reads++; return reads <= 3 ? "admitted task" : "DIFFERENT task after admission (read " + reads + ")"; } }); await attempt("input-enumerable-task-accessor-toctou", null, acc); console.log(JSON.stringify({ label: "task-accessor-reads", reads })); }
// binding validator: allowedEffects free text, and binding is not required by invokeDevelopmentHost
const binding = { contract: "mechanical.pi-host/v1", descriptorId: "mechanical.development.develop.v1", artifact: { package: "@mechanical/workflows-development", export: "develop", sha256: digest(libraryBytes), descriptorSha256: digest(descriptorBytes) }, source: { workspaceRealpath: "/no/such/workspace", baseCommit: "a".repeat(40), baseTree: "b".repeat(40), forgeManifestSha256: digest("x") }, invocationId: "inv-1", evidenceProfile: "git-census-v1", contextProfile: "plain-v1", intent: { task: "t", writer: "single", allowedEffects: ["rm -rf /", "publish-everything", "anything goes"] } };
try { const b = host.validateHostBinding(binding); console.log(JSON.stringify({ label: "binding-arbitrary-allowedEffects-and-nonexistent-workspace", accepted: true, allowedEffects: b.intent.allowedEffects })); } catch (e) { console.log(JSON.stringify({ label: "binding-arbitrary-allowedEffects", accepted: false, code: e.code, field: e.field })); }
for (const [label, admitted, current] of [["grant-absent-at-admission-present-now", [], ["mechanical:develop-write"]], ["grant-admitted-then-revoked", ["mechanical:develop-write"], []], ["grant-present-both", ["mechanical:develop-write"], ["mechanical:develop-write"]]]) {
  try { const r = await host.dispatchWriteAtFinalBoundary(admitted, () => current, async () => "writer-ran"); console.log(JSON.stringify({ label, result: r })); } catch (e) { console.log(JSON.stringify({ label, refused: e.code })); }
}
