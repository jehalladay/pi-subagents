import test, { after } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { canonicalJson, reconcile } from "@mechanical/workflows-coordination";
import type { ResolverInput } from "@mechanical/workflows-coordination";
import { invokePinnedReconcile } from "../dist/coordination-host.js";
import type { PinnedReconcileOptions } from "../dist/coordination-host.js";
import type { EntrypointDescriptor } from "../dist/entrypoint-host.js";

/** PIWB-MW6-R001: reconcile is the one pure coordination export behind a committed descriptor, published schemas and a read-only host. */
const root = new URL("../../../", import.meta.url);
const schemaDirectory = fileURLToPath(new URL("contracts/schemas/", root));
const readJson = (path: string): any => JSON.parse(readFileSync(new URL(path, root), "utf8"));
const committed = readJson("contracts/entrypoints/coordination-reconcile.v1.json") as EntrypointDescriptor;
const scratch = mkdtempSync(join(tmpdir(), "mw-coord-host-"));
after(() => rmSync(scratch, { recursive: true, force: true }));
const artifactPath = join(scratch, "coordination.tgz");
writeFileSync(artifactPath, "pinned-coordination-artifact-bytes");
const artifactDigest = "sha256:" + createHash("sha256").update(readFileSync(artifactPath)).digest("hex");

const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 10 };
const intent = (intentId: string, extra: Record<string, unknown> = {}) => ({
  intentId, policyId: "fifo", target: { kind: "candidate", uri: "cand:" + intentId }, expectedRevision: "head-1", effect: "land",
  claim, evidenceRefs: [], writeScopes: ["main"], readScopes: [], ...extra,
});
const proposal = (...intents: unknown[]) => ({ intents, memory: null, trace: [{ kind: "proposed", policyId: "fifo", detail: "x" }] });
const baseInput = (proposals: unknown[]): any => ({
  basis: { workspaceId: "demo", revision: "head-1" }, budget: { compute: 10, workers: 4, queue: 4, latencyMs: 1000 },
  protectedScopes: ["actor:*"], proposals,
});
const interfering = baseInput([proposal(intent("a")), proposal(intent("b"))]);

function options(over: Partial<PinnedReconcileOptions> & { counter?: { loads: number; calls: number } } = {}): PinnedReconcileOptions {
  const counter = over.counter ?? { loads: 0, calls: 0 };
  const { counter: _c, ...rest } = over;
  return {
    artifactPath, artifactDigest, descriptor: committed, entrypointId: committed.id, contractVersion: committed.schema, schemaDirectory,
    load: async () => { counter.loads++; return { reconcile: (i: ResolverInput) => { counter.calls++; return reconcile(i); } }; },
    ...rest,
  };
}
const refused = async (opts: PinnedReconcileOptions, input: unknown, code: RegExp, label: string, counter: { loads: number; calls: number }) => {
  await assert.rejects(() => invokePinnedReconcile(opts, input), code, label);
  assert.equal(counter.loads, 0, label + ": load() count 0");
  assert.equal(counter.calls, 0, label + ": reconcile never called");
};

test("committed descriptor and both published schemas are read from the repository, closed and read-only", () => {
  assert.equal(committed.id, "mechanical.coordination.reconcile.v1");
  assert.equal(committed.schema, "mechanical-workflows/entrypoint/v1");
  assert.deepEqual(committed.implementation, { package: "@mechanical/workflows-coordination", export: "reconcile" });
  assert.deepEqual(committed.bindings, [], "zero application callbacks");
  assert.equal(committed.status, "descriptor-only");
  assert.deepEqual(Object.keys(committed).filter(k => !["schema", "id", "implementation", "inputSchema", "outputSchema", "bindings", "status", "note"].includes(k)), []);
  assert.equal(committed.inputSchema, "coordination-resolver-input.v1.schema.json");
  assert.equal(committed.outputSchema, "coordination-resolution.v1.schema.json");
  for (const ref of [committed.inputSchema, committed.outputSchema]) {
    assert.ok(readdirSync(schemaDirectory).includes(ref), ref + " exists beside the development schemas");
    const schema = readJson("contracts/schemas/" + ref);
    assert.equal(schema.type, "object");
    assert.equal(schema.additionalProperties, false);
  }
  const input = readJson("contracts/schemas/" + committed.inputSchema), output = readJson("contracts/schemas/" + committed.outputSchema);
  assert.deepEqual(input.$defs.intent, output.$defs.intent, "one Intent shape in both schemas");
  assert.deepEqual(output.$defs.admittedIntent.properties.authority, { enum: ["propose-only"] }, "an admitted intent can never carry authorized-effect");
});
test("the host admits the committed descriptor with a digest-pinned artifact, loads once and matches a direct reconcile byte for byte", async () => {
  const counter = { loads: 0, calls: 0 };
  const frozen = structuredClone(interfering);
  const out = await invokePinnedReconcile(options({ counter }), frozen);
  assert.equal(counter.loads, 1);
  assert.equal(counter.calls, 1);
  assert.equal(canonicalJson(out), canonicalJson(reconcile(structuredClone(interfering))));
  assert.equal(out.admitted.length, 0, "interfering write scopes admit nothing");
  assert.deepEqual(out.rejected.map(r => r.intent.intentId + ":" + r.code).sort(), ["a:INTENT_WRITE_CONFLICT", "b:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(out.conflicts, [{ scope: "main", intentIds: ["a", "b"] }]);
  assert.deepEqual(frozen, interfering, "the host never mutates the caller's input");
});
test("a disjoint batch admits both intents and the same bytes come back from a second call", async () => {
  const input = baseInput([proposal(intent("a", { writeScopes: ["s1"] })), proposal(intent("b", { writeScopes: ["s2"] }))]);
  const first = await invokePinnedReconcile(options(), input);
  const second = await invokePinnedReconcile(options(), input);
  assert.deepEqual(first.admitted.map(i => i.intentId), ["a", "b"]);
  assert.equal(canonicalJson(first), canonicalJson(second));
});
test("a descriptor with bindings, another export, another package, another id or another status refuses ENTRYPOINT_CONTRACT_INVALID before load", async () => {
  const rows: [string, Record<string, unknown>][] = [
    ["non-empty bindings", { bindings: ["implement"] }],
    ["export is not reconcile", { implementation: { package: "@mechanical/workflows-coordination", export: "digest" } }],
    ["package is not coordination", { implementation: { package: "@mechanical/workflows-development", export: "reconcile" } }],
    ["id differs", { id: "mechanical.coordination.other.v1" }],
    ["status differs", { status: "served" }],
    ["extra top-level key", { extra: "x" }],
    ["implementation is not an object", { implementation: null }],
    ["bindings is not an array", { bindings: "none" }],
  ];
  for (const [label, patch] of rows) {
    const counter = { loads: 0, calls: 0 };
    await refused(options({ counter, descriptor: { ...committed, ...patch } as EntrypointDescriptor }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID/, label, counter);
  }
  const counter = { loads: 0, calls: 0 };
  await refused(options({ counter, entrypointId: "mechanical.development.develop.v1" }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID/, "entrypointId differs", counter);
  await refused(options({ counter, contractVersion: "other/v9" }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID/, "contract version differs", counter);
});
test("a mutated schema reference refuses ENTRYPOINT_CONTRACT_INVALID before load (MW-0 grammar reused)", async () => {
  const refs: [string, string][] = [
    ["different filename", "coordination-resolver-input.v2.schema.json"], ["directory segment", "other/coordination-resolver-input.v1.schema.json"],
    ["parent traversal", "../schemas/coordination-resolver-input.v1.schema.json"], ["absolute path", "/etc/passwd"],
    ["https scheme", "https://example/x.schema.json"], ["file scheme", "file:///x.schema.json"], ["data scheme", "data:,x"],
    ["backslash", "a\\b.schema.json"], ["NUL", "x\u0000.schema.json"], ["control character", "x\n.schema.json"],
    ["development schema", "development-request.v1.schema.json"],
  ];
  for (const field of ["inputSchema", "outputSchema"] as const) {
    for (const [label, ref] of refs) {
      const counter = { loads: 0, calls: 0 };
      await refused(options({ counter, descriptor: { ...committed, [field]: ref } as EntrypointDescriptor }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID/, field + " " + label, counter);
    }
  }
});
test("a schema directory without the published files, or a schema using an unsupported keyword, refuses ENTRYPOINT_CONTRACT_INVALID before load", async () => {
  const empty = mkdtempSync(join(scratch, "empty-"));
  let counter = { loads: 0, calls: 0 };
  await refused(options({ counter, schemaDirectory: empty }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID: .*unreadable/, "absent schema files", counter);
  const mutated = mkdtempSync(join(scratch, "mutated-"));
  cpSync(schemaDirectory, mutated, { recursive: true });
  const schema = readJson("contracts/schemas/" + committed.outputSchema);
  schema.properties.basis = { type: "object", patternProperties: { ".*": { type: "string" } } };
  writeFileSync(join(mutated, committed.outputSchema), JSON.stringify(schema));
  counter = { loads: 0, calls: 0 };
  await refused(options({ counter, schemaDirectory: mutated }), interfering, /^Error: ENTRYPOINT_CONTRACT_INVALID: .*unsupported schema keyword patternProperties/, "unsupported keyword", counter);
});
test("an artifact whose bytes differ from the pinned digest refuses ENTRYPOINT_ARTIFACT_MISMATCH before load", async () => {
  const counter = { loads: 0, calls: 0 };
  await refused(options({ counter, artifactDigest: "sha256:" + "0".repeat(64) }), interfering, /^Error: ENTRYPOINT_ARTIFACT_MISMATCH/, "wrong digest", counter);
  await refused(options({ counter, artifactDigest: "not-a-digest" }), interfering, /^Error: ENTRYPOINT_ARTIFACT_MISMATCH/, "malformed digest", counter);
});
test("input that fails the published input schema refuses COORDINATION_INPUT_INVALID before load", async () => {
  const without = (key: string) => { const { [key]: _gone, ...rest } = interfering; return rest; };
  const rows: [string, unknown][] = [
    ["missing basis", without("basis")], ["missing budget", without("budget")], ["missing proposals", without("proposals")], ["missing protectedScopes", without("protectedScopes")],
    ["not an object", "text"], ["null", null], ["array", []],
    ["extra top-level key", { ...interfering, extra: 1 }],
    ["budget dimension negative", { ...interfering, budget: { ...interfering.budget, compute: -1 } }],
    ["budget dimension NaN", { ...interfering, budget: { ...interfering.budget, compute: Number.NaN } }],
    ["budget dimension missing", { ...interfering, budget: { compute: 1, workers: 1, queue: 1 } }],
    ["budget extra dimension", { ...interfering, budget: { ...interfering.budget, gpus: 1 } }],
    ["basis empty revision", { ...interfering, basis: { workspaceId: "demo", revision: "" } }],
    ["proposals not an array", { ...interfering, proposals: {} }],
    ["proposal without intents", { ...interfering, proposals: [{ memory: null, trace: [] }] }],
    ["intent without target", baseInput([proposal({ ...intent("a"), target: undefined })])],
    ["intent unknown authority", baseInput([proposal(intent("a", { authority: "root" }))])],
    ["intent extra key", baseInput([proposal(intent("a", { apply: true }))])],
    ["intent claim negative", baseInput([proposal(intent("a", { claim: { ...claim, queue: -1 } }))])],
    ["writeScopes holds a number", baseInput([proposal(intent("a", { writeScopes: [1] }))])],
    ["__proto__ key", JSON.parse('{"__proto__":{"x":1},"basis":{"workspaceId":"d","revision":"r"}}')],
  ];
  for (const [label, input] of rows) {
    const counter = { loads: 0, calls: 0 };
    await refused(options({ counter }), input, /^Error: COORDINATION_INPUT_INVALID/, label, counter);
  }
});
test("an intent declaring authorized-effect passes the schema and the resolver rejects it INTENT_AUTHORITY_EXCEEDED; nothing is admitted", async () => {
  const counter = { loads: 0, calls: 0 };
  const out = await invokePinnedReconcile(options({ counter }), baseInput([proposal(intent("a", { authority: "authorized-effect" }))]));
  assert.equal(counter.calls, 1);
  assert.equal(out.admitted.length, 0);
  assert.deepEqual(out.rejected.map(r => r.code), ["INTENT_AUTHORITY_EXCEEDED"]);
});
test("a loader whose function returns a Resolution outside the published output schema refuses COORDINATION_OUTPUT_INVALID", async () => {
  const good = reconcile(structuredClone(interfering) as unknown as ResolverInput) as any;
  const rows: [string, (r: any) => unknown][] = [
    ["not an object", () => "done"], ["null", () => null],
    ["missing admitted", r => { const { admitted: _a, ...rest } = r; return rest; }],
    ["extra key", r => ({ ...r, applied: true })],
    ["admitted intent authorized-effect", r => ({ ...r, admitted: [intent("z", { authority: "authorized-effect" })] })],
    ["rejection code outside the roster", r => ({ ...r, rejected: [{ ...r.rejected[0], code: "INTENT_APPLIED" }] })],
    ["rejection without detail", r => ({ ...r, rejected: [{ intent: r.rejected[0].intent, code: "INTENT_DUPLICATE" }] })],
    ["budgetUsed negative", r => ({ ...r, budgetUsed: { ...r.budgetUsed, compute: -1 } })],
    ["basis differs from the input basis", r => ({ ...r, basis: { workspaceId: "demo", revision: "head-2" } })],
    ["budget differs from the input budget", r => ({ ...r, budget: { ...r.budget, compute: 11 } })],
  ];
  for (const [label, mutate] of rows) {
    let calls = 0;
    await assert.rejects(() => invokePinnedReconcile(options({ load: async () => ({ reconcile: () => { calls++; return mutate(structuredClone(good)); } }) }), interfering), /^Error: COORDINATION_OUTPUT_INVALID/, label);
    assert.equal(calls, 1, label + ": the call happened once and is never retried");
  }
});
test("a loaded module without a reconcile function refuses ENTRYPOINT_EXPORT_INVALID", async () => {
  await assert.rejects(() => invokePinnedReconcile(options({ load: async () => ({}) as never }), interfering), /^Error: ENTRYPOINT_EXPORT_INVALID/);
  await assert.rejects(() => invokePinnedReconcile(options({ load: async () => ({ reconcile: 1 }) as never }), interfering), /^Error: ENTRYPOINT_EXPORT_INVALID/);
});
test("read-only witness: the host module imports no process, write, service, forge, furnace or bd path", () => {
  const source = readFileSync(new URL("apps/development-rig/src/coordination-host.ts", root), "utf8");
  const specifiers = [...source.matchAll(/^\s*import\s+(?:type\s+)?(?:[^"']*?\sfrom\s+)?["']([^"']+)["']/gm)].map(m => m[1]);
  assert.deepEqual(specifiers.sort(), ["./entrypoint-host.js", "@mechanical/workflows-coordination", "node:fs/promises", "node:path"].sort());
  const fsNames = source.match(/import\s*\{([^}]*)\}\s*from\s*"node:fs\/promises"/)?.[1]?.split(",").map(s => s.trim()).filter(Boolean).sort();
  assert.deepEqual(fsNames, ["readFile"], "only the read API of node:fs/promises");
  for (const banned of ["child_process", "writeFile", "appendFile", "mkdir", "unlink", "rename", "createWriteStream", "workflows-development", "forge", "furnace", "bd "]) {
    assert.ok(!source.includes(banned), "no mention of " + banned);
  }
  const entry = readFileSync(new URL("apps/development-rig/src/entrypoint-host.ts", root), "utf8");
  assert.ok(!/child_process|writeFile|appendFile|createWriteStream/.test(entry), "the shared host module stays read-only too");
});
