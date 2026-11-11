import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONTEXT_PROFILES, EVIDENCE_PROFILES, HOST_BINDING_CONTRACT, HostBindingError, WRITE_GRANT, admitHostBinding,
  canonicalHostBindingBytes, dispatchWriteAtFinalBoundary, isRepresentableGrant, validateHostBinding,
} from "../dist/host-binding.js";

/** EAT-R002 / EAT-R003: the contract is consumed from the producer build (../dist) and the committed schema file, never from a copied interface. */
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const schema = JSON.parse(readFileSync(join(repoRoot, "contracts/schemas/mechanical-host-binding.v1.schema.json"), "utf8")) as Record<string, unknown>;
const sha = (c: string) => "sha256:" + c.repeat(64);
const valid = (): Record<string, any> => ({
  contract: "mechanical.pi-host/v1",
  descriptorId: "mechanical.development.develop.v1",
  artifact: { package: "@mechanical/workflows-development", export: "develop", sha256: sha("a"), descriptorSha256: sha("b") },
  source: { workspaceRealpath: "/work/repo", baseCommit: "1".repeat(40), baseTree: "2".repeat(40), forgeManifestSha256: sha("c") },
  invocationId: "pi-inv-1",
  evidenceProfile: "git-census-v1",
  contextProfile: "plain-v1",
  intent: { task: "Add a test", writer: "single", allowedEffects: [WRITE_GRANT] },
});

/** Minimal independent JSON Schema interpreter limited to the keywords the committed schema uses; refuses any other. */
const KEYS = new Set(["$schema", "$id", "title", "description", "type", "const", "enum", "pattern", "minLength", "required", "additionalProperties", "properties", "items"]);
function conforms(s: Record<string, any>, v: unknown): boolean {
  for (const k of Object.keys(s)) if (!KEYS.has(k)) throw new Error("UNSUPPORTED_SCHEMA_KEYWORD " + k);
  if ("const" in s && v !== s.const) return false;
  if (s.enum && !s.enum.includes(v)) return false;
  if (s.type === "string") {
    if (typeof v !== "string") return false;
    if (s.minLength !== undefined && v.length < s.minLength) return false;
    if (s.pattern && !new RegExp(s.pattern).test(v)) return false;
  }
  if (s.type === "array") return Array.isArray(v) && v.every(item => conforms(s.items, item));
  if (s.type === "object") {
    if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
    const record = v as Record<string, unknown>;
    for (const r of s.required ?? []) if (!(r in record)) return false;
    for (const [key, value] of Object.entries(record)) {
      const sub = s.properties?.[key];
      if (!sub) { if (s.additionalProperties === false) return false; continue; }
      if (!conforms(sub, value)) return false;
    }
  }
  return true;
}
const independentCanonical = (v: unknown): string => Array.isArray(v) ? "[" + v.map(independentCanonical).join(",") + "]"
  : v !== null && typeof v === "object" ? "{" + Object.entries(v as object).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, x]) => JSON.stringify(k) + ":" + independentCanonical(x)).join(",") + "}"
  : JSON.stringify(v);

test("a valid fixture round-trips through the type and the schema with identical canonical bytes", () => {
  const fixture = valid();
  assert.equal(conforms(schema, fixture), true);
  const binding = validateHostBinding(fixture);
  assert.deepEqual(binding, fixture);
  const bytes = canonicalHostBindingBytes(binding);
  assert.equal(Buffer.from(bytes).toString("utf8"), independentCanonical(fixture));
  const shuffled = JSON.parse(JSON.stringify(fixture, ["intent", "task", "writer", "allowedEffects", "source", "baseTree", "baseCommit", "workspaceRealpath", "forgeManifestSha256", "contextProfile", "evidenceProfile", "invocationId", "artifact", "descriptorSha256", "sha256", "export", "package", "descriptorId", "contract"]));
  assert.notDeepEqual(Object.keys(shuffled), Object.keys(fixture), "the shuffled fixture must differ in key order");
  assert.deepEqual(canonicalHostBindingBytes(validateHostBinding(shuffled)), bytes);
  assert.equal(HOST_BINDING_CONTRACT, "mechanical.pi-host/v1");
});

type Mutate = (v: Record<string, any>) => unknown;
const refusals: [string, Mutate, string, string][] = [
  ["missing top-level field", v => { delete v.invocationId; return v; }, "HOST_BINDING_FIELD_MISSING", "invocationId"],
  ["missing nested field", v => { delete v.source.baseTree; return v; }, "HOST_BINDING_FIELD_MISSING", "source.baseTree"],
  ["missing contract", v => { delete v.contract; return v; }, "HOST_BINDING_FIELD_MISSING", "contract"],
  ["extra top-level field (hostMode confusion)", v => ({ ...v, hostMode: "embedded" }), "HOST_BINDING_FIELD_EXTRA", "hostMode"],
  ["extra nested field", v => { v.artifact.registry = "x"; return v; }, "HOST_BINDING_FIELD_EXTRA", "artifact.registry"],
  ["unknown contract version", v => ({ ...v, contract: "mechanical.pi-host/v2" }), "HOST_BINDING_VERSION_UNKNOWN", "contract"],
  ["non-string contract", v => ({ ...v, contract: 1 }), "HOST_BINDING_FIELD_INVALID", "contract"],
  ["unknown evidenceProfile", v => ({ ...v, evidenceProfile: "hx-coverage-v1" }), "HOST_BINDING_PROFILE_UNKNOWN", "evidenceProfile"],
  ["transport hostMode spelled as evidenceProfile", v => ({ ...v, evidenceProfile: "detached" }), "HOST_BINDING_PROFILE_UNKNOWN", "evidenceProfile"],
  ["unknown contextProfile", v => ({ ...v, contextProfile: "rf-preview-v1" }), "HOST_BINDING_PROFILE_UNKNOWN", "contextProfile"],
  ["malformed artifact digest", v => { v.artifact.sha256 = "sha256:abc"; return v; }, "HOST_BINDING_FIELD_INVALID", "artifact.sha256"],
  ["wrong export", v => { v.artifact.export = "reconcile"; return v; }, "HOST_BINDING_FIELD_INVALID", "artifact.export"],
  ["relative workspace path", v => { v.source.workspaceRealpath = "repo"; return v; }, "HOST_BINDING_FIELD_INVALID", "source.workspaceRealpath"],
  ["multi writer", v => { v.intent.writer = "many"; return v; }, "HOST_BINDING_FIELD_INVALID", "intent.writer"],
  ["non-string effect", v => { v.intent.allowedEffects = [1]; return v; }, "HOST_BINDING_FIELD_INVALID", "intent.allowedEffects"],
  ["null binding", () => null, "HOST_BINDING_NOT_OBJECT", ""],
  ["array binding", () => [], "HOST_BINDING_NOT_OBJECT", ""],
  ["nested non-object", v => ({ ...v, source: "x" }), "HOST_BINDING_NOT_OBJECT", "source"],
];
for (const [name, mutate, code, field] of refusals) {
  test("refuses " + name + " with a typed error and no loader call", async () => {
    const fixture = mutate(valid());
    let loads = 0;
    await assert.rejects(admitHostBinding(fixture, async () => { loads += 1; return "loaded"; }), (error: unknown) => {
      assert.ok(error instanceof HostBindingError);
      assert.equal(error.code, code);
      assert.equal(error.field, field);
      return true;
    });
    assert.equal(loads, 0, "a refused binding must not reach the loader");
    if (code !== "HOST_BINDING_NOT_OBJECT") assert.equal(conforms(schema, fixture), false, "the committed schema must refuse the same fixture");
  });
}

test("the committed schema refuses the old entrypoint descriptor and the producer refuses it as a binding", () => {
  const old = JSON.parse(readFileSync(join(repoRoot, "contracts/entrypoints/development.v1.json"), "utf8"));
  assert.equal(conforms(schema, old), false);
  assert.throws(() => validateHostBinding(old), (e: unknown) => e instanceof HostBindingError && e.code === "HOST_BINDING_FIELD_MISSING");
});

test("an admitted binding reaches the loader exactly once", async () => {
  let loads = 0;
  const admitted = await admitHostBinding(valid(), async binding => { loads += 1; return binding.invocationId; });
  assert.equal(loads, 1);
  assert.equal(admitted.loaded, "pi-inv-1");
});

test("the schema enums and constants agree with the producer constants", () => {
  const props = (schema.properties as Record<string, any>);
  assert.equal(props.contract.const, HOST_BINDING_CONTRACT);
  assert.deepEqual(props.evidenceProfile.enum, [...EVIDENCE_PROFILES]);
  assert.deepEqual(props.contextProfile.enum, [...CONTEXT_PROFILES]);
  for (const profile of EVIDENCE_PROFILES) assert.doesNotThrow(() => validateHostBinding({ ...valid(), evidenceProfile: profile }));
  for (const profile of CONTEXT_PROFILES) assert.doesNotThrow(() => validateHostBinding({ ...valid(), contextProfile: profile }));
});

test("no second declaration of MechanicalHostBindingV1 exists outside the producer module", () => {
  const found: string[] = [];
  const walk = (dir: string): void => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === "dist" || name === ".git") continue;
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".ts") && /\b(interface|type|class)\s+MechanicalHostBindingV1\b/.test(readFileSync(full, "utf8"))) found.push(relative(repoRoot, full));
    }
  };
  for (const root of ["apps", "packages", "scripts", "qa"]) walk(join(repoRoot, root));
  assert.deepEqual(found, ["apps/development-rig/src/host-binding.ts"]);
  assert.equal(existsSync(join(repoRoot, "apps/development-rig/dist/host-binding.js")), true, "the contract test consumes the producer build");
});

function grants(initial: string[]) {
  const state = { current: [...initial], started: 0 };
  return { state, current: () => state.current, writer: async () => { state.started += 1; return "wrote"; } };
}

test("the exact adopted grant dispatches the writer once", async () => {
  const g = grants([WRITE_GRANT]);
  assert.equal(await dispatchWriteAtFinalBoundary([WRITE_GRANT], g.current, g.writer), "wrote");
  assert.equal(g.state.started, 1);
});

const badGrants: [string, string, string][] = [
  ["a prefix of the adopted grant", "mechanical:develop-writ", "WRITE_GRANT_NOT_EXACT"],
  ["the adopted grant with a suffix segment", "mechanical:develop-write:extra", "WRITE_GRANT_UNREPRESENTABLE"],
  ["an unrelated grant", "mechanical:read", "WRITE_GRANT_ABSENT"],
];
for (const [name, token, code] of badGrants) {
  test("refuses " + name + " at the final boundary with zero writer effects", async () => {
    const g = grants([token]);
    await assert.rejects(dispatchWriteAtFinalBoundary([token], g.current, g.writer), (e: unknown) => e instanceof HostBindingError && e.code === code && e.field === (code === "WRITE_GRANT_ABSENT" ? WRITE_GRANT : token));
    assert.equal(g.state.started, 0);
  });
}

test("refuses an empty grant set with zero writer effects", async () => {
  const g = grants([]);
  await assert.rejects(dispatchWriteAtFinalBoundary([], g.current, g.writer), (e: unknown) => e instanceof HostBindingError && e.code === "WRITE_GRANT_ABSENT");
  assert.equal(g.state.started, 0);
});

test("a grant revoked between admission and dispatch never starts the writer", async () => {
  const g = grants([WRITE_GRANT]);
  const admitted = [...g.current()];
  g.state.current = [];
  await assert.rejects(dispatchWriteAtFinalBoundary(admitted, g.current, g.writer), (e: unknown) => e instanceof HostBindingError && e.code === "WRITE_GRANT_REVOKED");
  assert.equal(g.state.started, 0);
});

test("grant representability: two colon-free segments only", () => {
  assert.equal(isRepresentableGrant(WRITE_GRANT), true);
  assert.equal(isRepresentableGrant("mechanical:develop-write:extra"), false);
  assert.equal(isRepresentableGrant("mechanical"), false);
  assert.equal(isRepresentableGrant(""), false);
});
